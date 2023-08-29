---
title: Hmily:High-Performance Asynchronous Distributed Transaction TCC Framework
author: xiaoyu
date: 2018-09-25
tag:
  - hmily
  - TCC
cover: /assets/img/architecture/hmily-framework.png
head:
  - - meta
    - name: Blog
---

# Hmily Framework Features [https://github.com/yu199195/hmily]

- Seamlessly integrates with Spring and Spring Boot.

- Seamlessly integrates with Dubbo, Spring Cloud, Motan, and other RPC frameworks.

- Supports various transaction log storage methods (Redis, MongoDB, MySQL, etc.).

- Offers multiple serialization methods for different types of logs (Kryo, Protostuff, Hessian).

- Provides automatic transaction recovery.

- Supports embedded transaction dependency propagation.

- Zero-intrusion code and flexible configuration.

# Why is Hmily So High-Performance?

### 1. Asynchronous Read/Write of Transaction Logs Using Disruptor (Disruptor is a Lock-Free, GC-Free Concurrency Framework)

```java
package com.hmily.tcc.core.disruptor.publisher;

import com.hmily.tcc.common.bean.entity.TccTransaction;
import com.hmily.tcc.common.enums.EventTypeEnum;
import com.hmily.tcc.core.concurrent.threadpool.HmilyThreadFactory;
import com.hmily.tcc.core.coordinator.CoordinatorService;
import com.hmily.tcc.core.disruptor.event.HmilyTransactionEvent;
import com.hmily.tcc.core.disruptor.factory.HmilyTransactionEventFactory;
import com.hmily.tcc.core.disruptor.handler.HmilyConsumerDataHandler;
import com.hmily.tcc.core.disruptor.translator.HmilyTransactionEventTranslator;
import com.lmax.disruptor.BlockingWaitStrategy;
import com.lmax.disruptor.IgnoreExceptionHandler;
import com.lmax.disruptor.RingBuffer;
import com.lmax.disruptor.dsl.Disruptor;
import com.lmax.disruptor.dsl.ProducerType;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * event publisher.
 *
 * @author xiaoyu(Myth)
 */
@Component
public class HmilyTransactionEventPublisher implements DisposableBean {

    private Disruptor<HmilyTransactionEvent> disruptor;

    private final CoordinatorService coordinatorService;

    @Autowired
    public HmilyTransactionEventPublisher(final CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    /**
     * disruptor start.
     *
     * @param bufferSize this is disruptor buffer size.
     * @param threadSize this is disruptor consumer thread size.
     */
    public void start(final int bufferSize, final int threadSize) {
        disruptor = new Disruptor<>(new HmilyTransactionEventFactory(), bufferSize, r -> {
            AtomicInteger index = new AtomicInteger(1);
            return new Thread(null, r, "disruptor-thread-" + index.getAndIncrement());
        }, ProducerType.MULTI, new BlockingWaitStrategy());

        final Executor executor = new ThreadPoolExecutor(threadSize, threadSize, 0, TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<>(),
                HmilyThreadFactory.create("hmily-log-disruptor", false),
                new ThreadPoolExecutor.AbortPolicy());

        HmilyConsumerDataHandler[] consumers = new HmilyConsumerDataHandler[threadSize];
        for (int i = 0; i < threadSize; i++) {
            consumers[i] = new HmilyConsumerDataHandler(executor, coordinatorService);
        }
        disruptor.handleEventsWithWorkerPool(consumers);
        disruptor.setDefaultExceptionHandler(new IgnoreExceptionHandler());
        disruptor.start();
    }

    /**
     * publish disruptor event.
     *
     * @param tccTransaction {@linkplain com.hmily.tcc.common.bean.entity.TccTransaction }
     * @param type           {@linkplain EventTypeEnum}
     */
    public void publishEvent(final TccTransaction tccTransaction, final int type) {
        final RingBuffer<HmilyTransactionEvent> ringBuffer = disruptor.getRingBuffer();
        ringBuffer.publishEvent(new HmilyTransactionEventTranslator(type), tccTransaction);
    }

    @Override
    public void destroy() {
        disruptor.shutdown();
    }
}
```

- The default value of bufferSize here is 4094 \* 4, which can be configured based on the user's requirements.

```java

   HmilyConsumerDataHandler[] consumers = new HmilyConsumerDataHandler[threadSize];
        for (int i = 0; i < threadSize; i++) {
            consumers[i] = new HmilyConsumerDataHandler(executor, coordinatorService);
        }
        disruptor.handleEventsWithWorkerPool(consumers);
```

- Multiple consumers are employed here to process tasks in the queue.

### 2.Asynchronous Execution of Confirm and Cancel Methods

```java
package com.hmily.tcc.core.service.handler;

import com.hmily.tcc.common.bean.context.TccTransactionContext;
import com.hmily.tcc.common.bean.entity.TccTransaction;
import com.hmily.tcc.common.enums.TccActionEnum;
import com.hmily.tcc.core.concurrent.threadpool.HmilyThreadFactory;
import com.hmily.tcc.core.service.HmilyTransactionHandler;
import com.hmily.tcc.core.service.executor.HmilyTransactionExecutor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * this is transaction starter.
 *
 * @author xiaoyu
 */
@Component
public class StarterHmilyTransactionHandler implements HmilyTransactionHandler {

    private static final int MAX_THREAD = Runtime.getRuntime().availableProcessors() << 1;

    private final HmilyTransactionExecutor hmilyTransactionExecutor;

    private final Executor executor = new ThreadPoolExecutor(MAX_THREAD, MAX_THREAD, 0, TimeUnit.MILLISECONDS,
            new LinkedBlockingQueue<>(),
            HmilyThreadFactory.create("hmily-execute", false),
            new ThreadPoolExecutor.AbortPolicy());

    @Autowired
    public StarterHmilyTransactionHandler(final HmilyTransactionExecutor hmilyTransactionExecutor) {
        this.hmilyTransactionExecutor = hmilyTransactionExecutor;
    }

    @Override
    public Object handler(final ProceedingJoinPoint point, final TccTransactionContext context)
            throws Throwable {
        Object returnValue;
        try {
            TccTransaction tccTransaction = hmilyTransactionExecutor.begin(point);
            try {
                //execute try
                returnValue = point.proceed();
                tccTransaction.setStatus(TccActionEnum.TRYING.getCode());
                hmilyTransactionExecutor.updateStatus(tccTransaction);
            } catch (Throwable throwable) {
                //if exception ,execute cancel
                final TccTransaction currentTransaction = hmilyTransactionExecutor.getCurrentTransaction();
                executor.execute(() -> hmilyTransactionExecutor
                        .cancel(currentTransaction));
                throw throwable;
            }
            //execute confirm
            final TccTransaction currentTransaction = hmilyTransactionExecutor.getCurrentTransaction();
            executor.execute(() -> hmilyTransactionExecutor.confirm(currentTransaction));
        } finally {
            hmilyTransactionExecutor.remove();
        }
        return returnValue;
    }
}
```

- When an exception occurs in the try method's AOP aspect, the cancel method is executed asynchronously using a thread pool. If there is no exception, the confirm method is executed.

### A question might arise: What if the cancel or confirm methods themselves throw exceptions?

Answer: This scenario is quite rare because you've just finished executing the try phase moments ago. Moreover, if such an exception arises, the framework has a built-in scheduling thread pool for recovery, so there's no need to worry.

### Another question might arise: What if there's an exception during log storage?

Answer: First, this is an edge case; second, the log configuration parameters are required during framework startup. Even if log storage fails during runtime, the framework will utilize cached logs, ensuring correct program execution. Lastly, if log storage fails and the system crashes under extremely rare circumstances, well, congratulations, you can consider buying a lottery ticket. The best solution is to not overly concern yourself with such a scenario.

### 3.Use of ThreadLocal Cache

```java
  /**
     * transaction begin.
     *
     * @param point cut point.
     * @return TccTransaction
     */
    public TccTransaction begin(final ProceedingJoinPoint point) {
        LogUtil.debug(LOGGER, () -> "......hmily transaction！start....");
        //build tccTransaction
        final TccTransaction tccTransaction = buildTccTransaction(point, TccRoleEnum.START.getCode(), null);
        //save tccTransaction in threadLocal
        CURRENT.set(tccTransaction);
        //publishEvent
        hmilyTransactionEventPublisher.publishEvent(tccTransaction, EventTypeEnum.SAVE.getCode());
        //set TccTransactionContext this context transfer remote
        TccTransactionContext context = new TccTransactionContext();
        //set action is try
        context.setAction(TccActionEnum.TRYING.getCode());
        context.setTransId(tccTransaction.getTransId());
        context.setRole(TccRoleEnum.START.getCode());
        TransactionContextLocal.getInstance().set(context);
        return tccTransaction;
    }
```

- It's important to understand that the ThreadLocal cache holds transaction information for the initiator method. RPC calls form a chain of invocation, ensuring proper storage.

```java

/**
    * add participant.
    *
    * @param participant {@linkplain Participant}
    */
   public void enlistParticipant(final Participant participant) {
       if (Objects.isNull(participant)) {
           return;
       }
       Optional.ofNullable(getCurrentTransaction())
               .ifPresent(c -> {
                   c.registerParticipant(participant);
                   updateParticipant(c);
               });
   }
```

### 4.Usage of Guava Cache

```java
package com.hmily.tcc.core.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.Weigher;
import com.hmily.tcc.common.bean.entity.TccTransaction;
import com.hmily.tcc.core.coordinator.CoordinatorService;
import com.hmily.tcc.core.helper.SpringBeanUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

/**
 * use google guava cache.
 * @author xiaoyu
 */
public final class TccTransactionCacheManager {

    private static final int MAX_COUNT = 10000;

    private static final LoadingCache<String, TccTransaction> LOADING_CACHE =
            CacheBuilder.newBuilder().maximumWeight(MAX_COUNT)
                    .weigher((Weigher<String, TccTransaction>) (string, tccTransaction) -> getSize())
                    .build(new CacheLoader<String, TccTransaction>() {
                        @Override
                        public TccTransaction load(final String key) {
                            return cacheTccTransaction(key);
                        }
                    });

    private static CoordinatorService coordinatorService = SpringBeanUtils.getInstance().getBean(CoordinatorService.class);

    private static final TccTransactionCacheManager TCC_TRANSACTION_CACHE_MANAGER = new TccTransactionCacheManager();

    private TccTransactionCacheManager() {

    }

    /**
     * TccTransactionCacheManager.
     *
     * @return TccTransactionCacheManager
     */
    public static TccTransactionCacheManager getInstance() {
        return TCC_TRANSACTION_CACHE_MANAGER;
    }

    private static int getSize() {
        return (int) LOADING_CACHE.size();
    }

    private static TccTransaction cacheTccTransaction(final String key) {
        return Optional.ofNullable(coordinatorService.findByTransId(key)).orElse(new TccTransaction());
    }

    /**
     * cache tccTransaction.
     *
     * @param tccTransaction {@linkplain TccTransaction}
     */
    public void cacheTccTransaction(final TccTransaction tccTransaction) {
        LOADING_CACHE.put(tccTransaction.getTransId(), tccTransaction);
    }

    /**
     * acquire TccTransaction.
     *
     * @param key this guava key.
     * @return {@linkplain TccTransaction}
     */
    public TccTransaction getTccTransaction(final String key) {
        try {
            return LOADING_CACHE.get(key);
        } catch (ExecutionException e) {
            return new TccTransaction();
        }
    }

    /**
     * remove guava cache by key.
     * @param key guava cache key.
     */
    public void removeByKey(final String key) {
        if (StringUtils.isNotEmpty(key)) {
            LOADING_CACHE.invalidate(key);
        }
    }

}
```

- Among the participants, we used ThreadLocal, but why don't we use it among the participants?
  There are actually two reasons: First, because try and confirm will not be in the same thread, which will cause ThreadLocal to fail. When considering RPC clusters, it may be load balanced to different machines. Here is a detail:

```java
   private static TccTransaction cacheTccTransaction(final String key) {
        return Optional.ofNullable(coordinatorService.findByTransId(key)).orElse(new TccTransaction());
    }
```

When the Guava Cache doesn't have a particular entry, it queries the log for that entry, ensuring support for clustered environments.

### These four aspects collectively make Hmily an asynchronous, high-performance distributed TCC framework.

### How to Use Hmily?（https://github.com/yu199195/hmily/tree/master/hmily-tcc-demo）

Due to package naming issues, the framework package hasn't been uploaded to the Maven Central Repository. Therefore, users need to clone the code, compile it, and deploy it to their private repository.

### 1.For Dubbo Users

- Include in your API project:

```xml

  <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-annotation</artifactId>
          <version>{you version}</version>
      </dependency>
```

- Include in your service provider project:

```xml
 <dependency>
            <groupId>com.hmily.tcc</groupId>
            <artifactId>hmily-tcc-dubbo</artifactId>
            <version>{you version}</version>
        </dependency>
```

- Configure the startup bean in your XML configuration.

```xml

<!-- Aspect configuration, whether to enable AOP aspect-->
  <aop:aspectj-autoproxy expose-proxy="true"/>
  <!--Scan the framework's packages-->
  <context:component-scan base-package="com.hmily.tcc.*"/>
  <!--Startup class attribute configuration-->
   <bean id="hmilyTransactionBootstrap" class="com.hmily.tcc.core.bootstrap.HmilyTransactionBootstrap">
        <property name="serializer" value="kryo"/>
        <property name="recoverDelayTime" value="120"/>
        <property name="retryMax" value="3"/>
        <property name="scheduledDelay" value="120"/>
        <property name="scheduledThreadMax" value="4"/>
        <property name="repositorySupport" value="db"/>
        <property name="tccDbConfig">
            <bean class="com.hmily.tcc.common.config.TccDbConfig">
                <property name="url"
                          value="jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </bean>
        </property>
    </bean>
```

- Of course there are many configuration properties, here I only gave a demo. For details, you can refer to this class:

```java
package com.hmily.tcc.common.config;

import com.hmily.tcc.common.enums.RepositorySupportEnum;
import lombok.Data;

/**
 * hmily config.
 *
 * @author xiaoyu
 */
@Data
public class TccConfig {


    /**
     * Resource suffix this parameter please fill in about is the transaction store path.
     * If it's a table store this is a table suffix, it's stored the same way.
     * If this parameter is not filled in, the applicationName of the application is retrieved by default
     */
    private String repositorySuffix;

    /**
     * log serializer.
     * {@linkplain com.hmily.tcc.common.enums.SerializeEnum}
     */
    private String serializer = "kryo";

    /**
     * scheduledPool Thread size.
     */
    private int scheduledThreadMax = Runtime.getRuntime().availableProcessors() << 1;

    /**
     * scheduledPool scheduledDelay unit SECONDS.
     */
    private int scheduledDelay = 60;

    /**
     * retry max.
     */
    private int retryMax = 3;

    /**
     * recoverDelayTime Unit seconds
     * (note that this time represents how many seconds after the local transaction was created before execution).
     */
    private int recoverDelayTime = 60;

    /**
     * Parameters when participants perform their own recovery.
     * 1.such as RPC calls time out
     * 2.such as the starter down machine
     */
    private int loadFactor = 2;

    /**
     * repositorySupport.
     * {@linkplain RepositorySupportEnum}
     */
    private String repositorySupport = "db";

    /**
     * disruptor bufferSize.
     */
    private int bufferSize = 4096 * 2 * 2;

    /**
     * this is disruptor consumerThreads.
     */
    private int consumerThreads = Runtime.getRuntime().availableProcessors() << 1;

    /**
     * db config.
     */
    private TccDbConfig tccDbConfig;

    /**
     * mongo config.
     */
    private TccMongoConfig tccMongoConfig;

    /**
     * redis config.
     */
    private TccRedisConfig tccRedisConfig;

    /**
     * zookeeper config.
     */
    private TccZookeeperConfig tccZookeeperConfig;

    /**
     * file config.
     */
    private TccFileConfig tccFileConfig;

}
```

### SpringCloud Users

```xml
     <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-springcloud</artifactId>
          <version>{you version}</version>
      </dependency>
```

### Motan Users

```xml
     <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-motan</artifactId>
          <version>{you version}</version>
      </dependency>
```

### hmily-spring-boot-start - this makes it even easier, you just need to import different jar packages according to your RPC framework.

- For Dubbo users, add:

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-dubbo</artifactId>
     <version>${your version}</version>
 </dependency>
```

- For Spring Cloud users, add:

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-springcloud</artifactId>
     <version>${your version}</version>
 </dependency>
```

- For Motan users, add:

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-motan</artifactId>
     <version>${your version}</version>
 </dependency>
```

- Next, configure the settings in your YML file:

```yml
hmily:
  tcc:
    serializer: kryo
    recoverDelayTime: 128
    retryMax: 3
    scheduledDelay: 128
    scheduledThreadMax: 10
    repositorySupport: db
    tccDbConfig:
      driverClassName: com.mysql.jdbc.Driver
      url: jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8
      username: root
      password: 123456

    #repositorySupport : redis
    #tccRedisConfig:
    #masterName: mymaster
    #sentinel : true
    #sentinelUrl : 192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379
    #password  : foobaredbbexONE123

    # repositorySupport : zookeeper
    #         host      : 92.168.1.73:2181
    #         sessionTimeOut      :  100000
    #         rootPath  : /tcc

    # repositorySupport : mongodb
    #       mongoDbUrl  : 192.168.1.68:27017
    #       mongoDbName  :  happylife
    #       mongoUserName  : xiaoyu
    #       mongoUserPwd   : 123456

    # repositorySupport : file
    #         path      : /account
    #         prefix    :  account
```

- Using Hmily is simple. Just annotate your interface methods with @Tcc, and you're good to go.

- Please note that due to space constraints, some intricate details have been summarized. For those interested, you can star and fork the project on GitHub and join the WeChat group or QQ group for discussions.

- GitHub repository: https://github.com/yu199195/hmily

- Thank you once again! If you're interested, you're welcome to provide any valuable PR contributions."
