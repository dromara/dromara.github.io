---
title: Hmily：高性能异步分布式事务TCC框架
author: xiaoyu
date: 2018-09-25
tag:
  - hmily
  - TCC
cover: /assets/img/architecture/hmily-framework.png
head:
  - - meta
    - name: 博客
---

# Hmily 框架特性[https://github.com/yu199195/hmily]

- 无缝集成 Spring,Spring boot start。

- 无缝集成 Dubbo,SpringCloud,Motan 等 rpc 框架。

- 多种事务日志的存储方式（redis，mongdb,mysql 等）。

- 多种不同日志序列化方式（Kryo,protostuff,hession）。

- 事务自动恢复。

- 支持内嵌事务的依赖传递。

- 代码零侵入,配置简单灵活。

# Hmily 为什么这么高性能？

### 1.采用 disruptor 进行事务日志的异步读写（disruptor 是一个无锁，无 GC 的并发编程框架）

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

- 在这里 bufferSize 的默认值是 4094 \* 4,用户可以根据自行的情况进行配置。

```java

   HmilyConsumerDataHandler[] consumers = new HmilyConsumerDataHandler[threadSize];
        for (int i = 0; i < threadSize; i++) {
            consumers[i] = new HmilyConsumerDataHandler(executor, coordinatorService);
        }
        disruptor.handleEventsWithWorkerPool(consumers);
```

- 这里是采用多个消费者去处理队列里面的任务。

### 2.异步执行 confrim,cancel 方法。

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

- 当 try 方法的 AOP 切面有异常的时候，采用线程池异步去执行 cancel，无异常的时候去执行 confrim 方法。

### 这里有人可能会问：那么 cancel 方法异常，或者 confrim 方法异常怎么办呢？

答：首先这种情况是非常罕见的，因为你上一面才刚刚执行完 try。其次如果出现这种情况，在 try 阶段会保存好日志，Hmily 有内置的调度线程池来进行恢复，不用担心。

### 有人又会问：这里如果日志保存异常了怎么办？

答：首先这又是一个牛角尖问题，首先日志配置的参数，在框架启动的时候，会要求你配置的。其次，就算在运行过程中日志保存异常，这时候框架会取缓存中的，并不会影响程序正确执行。最后，万一日志保存异常了，系统又在很极端的情况下 down 机了，恭喜你，你可以去买彩票了，最好的解决办法就是不去解决它。

### 3.ThreadLocal 缓存的使用。

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

- 首先要理解，threadLocal 保存的发起者一方法的事务信息。这个很重要，不要会有点懵逼。rpc 的调用，会形成调用链，进行保存。

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

### 4.GuavaCache 的使用

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

- 在参与者中，我们使用了 ThreadLocal，而在参与者中，我们为什么不使用呢？
  其实原因有二点：首先.因为 try，和 confrim 会不在一个线程里，会造成 ThreadLocal 失效。当考虑到 RPC 集群的时候，可能会负载到不同的机器上。这里有一个细节就是：

```java
   private static TccTransaction cacheTccTransaction(final String key) {
        return Optional.ofNullable(coordinatorService.findByTransId(key)).orElse(new TccTransaction());
    }
```

当 GuavaCache 里面没有的时候，会去查询日志返回，这样就保证了对集群环境的支持。

### 以上 4 点造就了 Hmily 是一个异步的高性能分布式事务 TCC 框架的原因。

### Hmily 如何使用？（https://github.com/yu199195/hmily/tree/master/hmily-tcc-demo）

首先因为之前的包命名问题，框架包并没有上传到 maven 中心仓库，固需要使用者自己拉取代码，编译 deploy 到自己的私服。

### 1.dubbo 用户

- 在你的 Api 接口项目引入

```xml

  <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-annotation</artifactId>
          <version>{you version}</version>
      </dependency>
```

- 在你的服务提供者项目引入

```xml
 <dependency>
            <groupId>com.hmily.tcc</groupId>
            <artifactId>hmily-tcc-dubbo</artifactId>
            <version>{you version}</version>
        </dependency>
```

- 配置启动 bean

```xml

<!-- Aspect 切面配置，是否开启AOP切面-->
  <aop:aspectj-autoproxy expose-proxy="true"/>
  <!--扫描框架的包-->
  <context:component-scan base-package="com.hmily.tcc.*"/>
  <!--启动类属性配置-->
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

- 当然配置属性很多，这里我只给出了 demo，具体可以参考这个类：

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

### SpringCloud 用户

```xml
     <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-springcloud</artifactId>
          <version>{you version}</version>
      </dependency>
```

### Motan 用户

```xml
     <dependency>
          <groupId>com.hmily.tcc</groupId>
          <artifactId>hmily-tcc-motan</artifactId>
          <version>{you version}</version>
      </dependency>
```

### hmily-spring-boot-start 那这个就更容易了，只需要根据你的 RPC 框架去引入不同的 jar 包。

- 如果你是 dubbo 用户，那么引入

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-dubbo</artifactId>
     <version>${your version}</version>
 </dependency>
```

- 如果你是 SpringCloud 用户，那么引入

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-springcloud</artifactId>
     <version>${your version}</version>
 </dependency>
```

- 如果你是 Motan 用户，那么引入:

```xml
<dependency>
     <groupId>com.hmily.tcc</groupId>
     <artifactId>hmily-tcc-spring-boot-starter-motan</artifactId>
     <version>${your version}</version>
 </dependency>
```

- 然后在你的 yml 里面进行如下配置：

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

- 就这么简单，然后就可以在接口方法上加上@Tcc 注解，进行愉快的使用了。

- 当然因为篇幅问题，很多东西只是简单的描述，尤其是逻辑方面的。

- 如果你感兴趣，可以在 github 上进行 star 和 fork，也可以加微信和 QQ 群进行交流。

- 下面是 github 地址：https://github.com/yu199195/hmily
- 最后再次感谢大家，如果有兴趣的朋友，可以提供你的优秀牛逼轰轰的 PR。。。。
