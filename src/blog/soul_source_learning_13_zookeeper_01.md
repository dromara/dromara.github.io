---
title: Soul Gateway Learns Zookeeper Data Synchronization 01
author: liquan
date: 2021-01-20
tag:
  - Soul
cover: '/assets/img/architecture/soul-framework.png'
head:
  - - meta
    - name: Blog
---

#### Start soul-admin and soul-bootstrap, and use zookeeper to synchronize data to the gateway

###### I. Configuration environment

1. For soul-admin service configuration, restart the service.

soul-admin/src/main/resources/application.yml

```yaml
soul:
  sync:
    zookeeper:
      url: localhost:2181
      sessionTimeout: 5000
      connectionTimeout: 2000
```

2. Soul-bootstrap gateway service configuration needs to be restarted

soul-bootstrap/pom.xml

```xml
<!--soul data sync start use zookeeper-->
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
    <version>${project.version}</version>
</dependency>
```

soul-bootstrap/src/main/resources/application-local.yml

```yaml
soul:
  sync:
    zookeeper:
      url: localhost:2181
      sessionTimeout: 5000
      connectionTimeout: 2000
```

###### II. Startup Service

1. Start zookeeper

```
zookeeper ./bin/zkServer.sh start
/usr/bin/java
ZooKeeper JMX enabled by default
Using config: /Documents/soft/zookeeper/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

2. The soul-admin gateway background service is started. After the service is started, you can see the ZooKeeper request call.

```

2021-01-20 17:34:48.752  INFO 64500 --- [-localhost:2181] org.I0Itec.zkclient.ZkEventThread        : Starting ZkClient event thread.
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:zookeeper.version=3.5.6-c11b7e26bc554b8523dc929761dd28808913f091, built on 10/08/2019 20:18 GMT
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:host.name=10.7.254.31
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.version=1.8.0_261
2021-01-20 17:34:48.761  INFO 64500 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:java.vendor=Oracle Corporation
......
2021-01-20 17:34:48.806  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Opening socket connection to server localhost/0:0:0:0:0:0:0:1:2181. Will not attempt to authenticate using SASL (unknown error)
2021-01-20 17:34:48.826  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Socket connection established, initiating session, client: /0:0:0:0:0:0:0:1:58214, server: localhost/0:0:0:0:0:0:0:1:2181
2021-01-20 17:34:48.857  INFO 64500 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server localhost/0:0:0:0:0:0:0:1:2181, sessionid = 0x1000b5e22f50001, negotiated timeout = 5000
2021-01-20 17:34:48.861  INFO 64500 --- [ain-EventThread] org.I0Itec.zkclient.ZkClient             : zookeeper state changed (SyncConnected)
```

3. The soul-bootstrap gateway service is started. After the service is started, you can see the ZooKeeper request call.

```
2021-01-20 17:35:58.996  INFO 64583 --- [           main] s.b.s.d.z.ZookeeperSyncDataConfiguration : you use zookeeper sync soul data.......
2021-01-20 17:35:59.003  INFO 64583 --- [-localhost:2181] org.I0Itec.zkclient.ZkEventThread        : Starting ZkClient event thread.
......

2021-01-20 17:35:59.012  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:user.home=/Users/liquan
2021-01-20 17:35:59.012  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Client environment:os.memory.total=310MB
2021-01-20 17:35:59.018  INFO 64583 --- [           main] org.apache.zookeeper.ZooKeeper           : Initiating client connection, connectString=localhost:2181 sessionTimeout=5000 watcher=org.I0Itec.zkclient.ZkClient@114a5e0
2021-01-20 17:35:59.121  INFO 64583 --- [localhost:2181)] org.apache.zookeeper.ClientCnxn          : Session establishment complete on server localhost/127.0.0.1:2181, sessionid = 0x1000b5e22f50002, negotiated timeout = 5000
2021-01-20 17:35:59.126  INFO 64583 --- [ain-EventThread] org.I0Itec.zkclient.ZkClient             : zookeeper state changed (SyncConnected)
```

4. View the registration information ![在这里插入图片描述](/assets/img/blog5/zk1.png) of soul gateway synchronization on zookeeper

###### III. Analysis of data synchronization principle of Soul gateway Zookeeper

After the soul-admin is started, the zkclient. ZkClient org.I0Itec. Is seen in the console, which is used as an entry point for tracing and debugging.

1. Function of ZookeeperConfiguration: Register zkClient to the Spring container.

```java
// EnableConfigurationProperties Purpose: Enables classes annotated with @ConfigurationProperties. If a configuration class is only annotated with @ConfigurationProperties and not with @Component, then the bean converted from the properties configuration file cannot be obtained in the IOC container. @EnableConfigurationProperties is equivalent to injecting classes that use @ConfigurationProperties.
// @ConditionalOnMissingBean If the specified class is missing in the container, perform injection. Opposite of @ConditionalOnBean.
/**
 * ZookeeperConfiguration .
 * @author xiaoyu(Myth)
 */
@EnableConfigurationProperties(ZookeeperProperties.class)
public class ZookeeperConfiguration {
    /**
     * register zkClient in spring ioc.
     *
     * @param zookeeperProp the zookeeper configuration
     * @return ZkClient {@linkplain ZkClient}
     */
    @Bean
    @ConditionalOnMissingBean(ZkClient.class)
    public ZkClient zkClient(final ZookeeperProperties zookeeperProp) {
        return new ZkClient(zookeeperProp.getUrl(), zookeeperProp.getSessionTimeout(), zookeeperProp.getConnectionTimeout());
    }
}
```

After the soul-admin is started, it will read the zookeeper configuration information and inject zkClient into the container to establish a connection with the zookeeper. ![pic](/assets/img/blog5/zk2.png)

![pic](/assets/img/blog5/zk3.png)

2. The afterPropertiesSet method of DataChangedEventDispatcher will be called in the call stack of the instantiated ZkClient.

The org. Dromara. Soul. Admin. Listener. DataChangedEventDispatcher acts as an event router, which forwards changed events to each ConfigEventListener.

This class implements the InitializingBean. During the DataChangedEventDispatcher initialization, the afterPropertiesSet method is executed.

The After PropertiesSet method looks for beans in the container whose type is the DataChangedListener. Class.

```java
@Component
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {
    private ApplicationContext applicationContext;
    private List<DataChangedListener> listeners;
    public DataChangedEventDispatcher(final ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
@Override
@SuppressWarnings("unchecked")
public void onApplicationEvent(final DataChangedEvent event) {
    for (DataChangedListener listener : listeners) {
        switch (event.getGroupKey()) {
            case APP_AUTH:
                listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());
                break;
            .......
            default:
                throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
        }
    }
     ......
    @Override
    public void afterPropertiesSet() {
        Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
        this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
    }
}
```

3. The execution of the afterPropertiesSet method will find the instantiation of DataChangedListener. Class related classes.

Role of org. Dromara. Soul. Admin. Config. Data SyncConfiguration: Data synchronization configuration class.

ZookeeperData ChangedListener Data Change Listener, which is used to listen to metadata changes and then synchronize to zookeeper.

ZookeeperDataInit zookeeper data initialization. Function: Synchronize initialization data to zookeeper.

```java
/**
 * The type Zookeeper listener.
 */
@Configuration
@ConditionalOnProperty(prefix = "soul.sync.zookeeper", name = "url")
@Import(ZookeeperConfiguration.class)
static class ZookeeperListener {
    /**
     * Config event listener data changed listener.
     * @param zkClient the zk client
     * @return the data changed listener
     */
    @Bean
    @ConditionalOnMissingBean(ZookeeperDataChangedListener.class)
    public DataChangedListener zookeeperDataChangedListener(final ZkClient zkClient) {
        return new ZookeeperDataChangedListener(zkClient);
    }
    /**
     * Zookeeper data init zookeeper data init
     * @param zkClient        the zk client
     * @param syncDataService the sync data service
     * @return the zookeeper data init
     */
    @Bean
    @ConditionalOnMissingBean(ZookeeperDataInit.class)
    public ZookeeperDataInit zookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
        return new ZookeeperDataInit(zkClient, syncDataService);
    }
}
```

4. Role of org. Dromara. Soul. Admin. Listener. Zookeeper. ZookeeperDataInit: responsible for synchronizing initialization data to zookeeper. This class implements the CommandLine Runner.

CommandLine Runner: Function: SpringBoot will traverse all entity classes that implement CommandLineRunner and execute the run method after the project is started. If it needs to be executed in a certain order, Then you need to use a @ Order annotation on the entity class (or implement the Order interface) to indicate the order.

The run method calls the syncData Service. SyncAll method.

```java
public class ZookeeperDataInit implements CommandLineRunner {
    private final ZkClient zkClient;
    private final SyncDataService syncDataService;
    /**
     * Instantiates a new Zookeeper data init.
     * @param zkClient        the zk client
     * @param syncDataService the sync data service
     */
    public ZookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
        this.zkClient = zkClient;
        this.syncDataService = syncDataService;
    }
    @Override
    public void run(final String... args) {
        String pluginPath = ZkPathConstants.PLUGIN_PARENT;
        String authPath = ZkPathConstants.APP_AUTH_PARENT;
        String metaDataPath = ZkPathConstants.META_DATA;
        if (!zkClient.exists(pluginPath) && !zkClient.exists(authPath) && !zkClient.exists(metaDataPath)) {
            syncDataService.syncAll(DataEventTypeEnum.REFRESH);
        }
    }
}
```

5、org.dromara.soul.admin.service.sync.SyncDataServiceImpl

The syncAll method invokes the event publisher to publish an event of DataEventTypeEnum. REFRESH.

```java
/**
 * The type sync data service.
 * @author xiaoyu(Myth)
 */
@Service("syncDataService")
public class SyncDataServiceImpl implements SyncDataService {
    // Publishes events, informing all listeners related to this event.
    private final ApplicationEventPublisher eventPublisher;
    ......
    @Override
    public boolean syncAll(final DataEventTypeEnum type) {
        appAuthService.syncData();
        List<PluginData> pluginDataList = pluginService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, type, pluginDataList));
        List<SelectorData> selectorDataList = selectorService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, type, selectorDataList));
        List<RuleData> ruleDataList = ruleService.listAll();
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.RULE, type, ruleDataList));
        metaDataService.syncData();
        return true;
    }
    ......
}
```

![pic](/assets/img/blog5//zk4.png)

6. After the event is published, the onApplicationEvent method of the org. Dromara. Soul. Admin. Listener. DataChangedEventDispatcher class will listen to the change of the event and traverse all listeners to synchronize the data. The listener implementation class here is ZookeeperData ChangedListener, which synchronizes data to zookeeper through zkClient according to the corresponding event type.

![pic](/assets/img/blog5//zk5.png)

7. Soul-admin initialization to data to zookeeper mind map

![pic](/assets/img/blog5//zk6.png)

###### IV. Summary

When the soul-admin is started, it will synchronize the gateway data rule, metaData, selector, plugin, etc. To the zookeeper. The data change will publish the DataChangedEvent event, and the listening event will synchronize the data to the zookeeper.

[ Soul gateway data synchronization principle ](https://dromara.org/projects/soul/data-sync/)
