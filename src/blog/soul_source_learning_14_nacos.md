---
title: Soul Gateway Learns Nacos Data Synchronization
author: liquan
date: 2021-01-26
tag:
  - Soul
cover: '/assets/img/blog5/ns15.png'
head:
  - - meta
    - name: Blog
---

This article analyzes the principle of Nacos data synchronization.

1. Configure the environment first

- soul-adminsoul-admin/src/main/resources/application.yml

```yaml
soul:
  sync:
    nacos:
      url: localhost:8848
      namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
  #      acm:
  #        enabled: false
  #        endpoint: acm.aliyun.com
  #        namespace:
  #        accessKey:
  #        secretKey:
```

Soul-admin/POM. XML, where the default configuration is available

```xml
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>${nacos-client.version}</version>
</dependency>
```

- soul-bootstrapsoul-bootstrap/src/main/resources/application-local.yml

```yaml
soul:
  sync:
    nacos:
      url: localhost:8848
      namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
#          acm:
#            enabled: false
#            endpoint: acm.aliyun.com
#            namespace:
#            accessKey:
#            secretKey:
```

Soul-bootstrap/POM. XML. The following configuration is not available by default and needs to be added manually

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-nacos</artifactId>
    <version>${project.version}</version>
</dependency>
```

- Start the service

```
1、Start nacos
2、Start soul-admin
3、Start soul-bootstrap
```

2. The above looks quite smooth. This process has encountered a pit. The soul-bootstrap cannot be started and the null pointer exception is reported. The following is a detailed record. First of all, soul-admin will not actively synchronize the gateway data to nacos after it is started. It needs to be synchronized manually, which is not mentioned on the official website. This problem has been bothering me for a long time. Finally, I saw other students in the group encounter the same problem and refer to their articles to solve it. Here is a record of the solution process.

1) Soul-bootstrap encountered the following error, NullPointerException, when starting.

When the soul-bootstrap is started, it will go to nacos to get the gateway data, see the breakpoint below, and get the empty data.

```
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2021-01-25 16:49:06.052 ERROR 5273 --- [           main] o.s.boot.SpringApplication               : Application run failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'nacosSyncDataService' defined in class path resource [org/dromara/soul/springboot/starter/sync/data/nacos/NacosSyncDataConfiguration.class]: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.dromara.soul.sync.data.api.SyncDataService]: Factory method 'nacosSyncDataService' threw exception; nested exception is java.lang.NullPointerException
......
	at org.dromara.soul.bootstrap.SoulBootstrapApplication.main(SoulBootstrapApplication.java:37) [classes/:na]
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.dromara.soul.sync.data.api.SyncDataService]: Factory method 'nacosSyncDataService' threw exception; nested exception is java.lang.NullPointerException
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:185) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:651) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	... 19 common frames omitted
Caused by: java.lang.NullPointerException: null
	at org.dromara.soul.sync.data.nacos.handler.NacosCacheHandler.updateMetaDataMap(NacosCacheHandler.java:128) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.handler.NacosCacheHandler.watcherData(NacosCacheHandler.java:167) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.NacosSyncDataService.start(NacosSyncDataService.java:59) ~[classes/:na]
	at org.dromara.soul.sync.data.nacos.NacosSyncDataService.<init>(NacosSyncDataService.java:49) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration.nacosSyncDataService(NacosSyncDataConfiguration.java:66) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7.CGLIB$nacosSyncDataService$0(<generated>) ~[classes/:na]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7$$FastClassBySpringCGLIB$$3830e886.invoke(<generated>) ~[classes/:na]
	at org.springframework.cglib.proxy.MethodProxy.invokeSuper(MethodProxy.java:244) ~[spring-core-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.springframework.context.annotation.ConfigurationClassEnhancer$BeanMethodInterceptor.intercept(ConfigurationClassEnhancer.java:363) ~[spring-context-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	at org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration$$EnhancerBySpringCGLIB$$cce084b7.nacosSyncDataService(<generated>) ~[classes/:na]
......
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:154) ~[spring-beans-5.2.2.RELEASE.jar:5.2.2.RELEASE]
	... 20 common frames omitted
```

![pic](/assets/img/blog5/ns1.png)

2. Go to nacos to check whether there is gateway data. According to the configured "namespace: 1c10d748-af86-43b9-8265-75f487d20c6c", there is nothing.

![pic](/assets/img/blog5/ns2.png)

![pic](/assets/img/blog5/ns3.png)

3. Try to go to soul-admin for manual synchronization, but nacos cannot see the data. You must manually create the namespace "1c10d748-af86-43b9-8265-75f487d20c6c", as shown in the following figure.

![pic](/assets/img/blog5/ns4.png)

4. Go to soul-admin to manually synchronize the data, and you will see the configuration information of the gateway on nacos. At this time, soul-bootstrap still cannot be started, because there is still a lack of metadata information. Only dubbo and spring cloud services have metadata, while HTTP does not have metadata, so we have to start the dubbo service. Then synchronize the metadata in soul-admin.

![pic](/assets/img/blog5/ns5.png)

Soul-admin Click Synchronize Data to synchronize the metadata to nacos

![pic](/assets/img/blog5/ns6.png)

Soul-admin Click Synchronize Data to synchronize the authentication data to nacos

![pic](/assets/img/blog5/ns7.png)

At this point, nacos has seen all the gateway data

![pic](/assets/img/blog5/ns8.png)

5. Start the soul-bootstrap again, and finally start it successfully.

```
2021-01-25 17:56:54.798  INFO 10051 --- [           main] o.d.s.w.configuration.SoulConfiguration  : load plugin:[monitor] [org.dromara.soul.plugin.monitor.MonitorPlugin]
2021-01-25 17:56:54.798  INFO 10051 --- [           main] o.d.s.w.configuration.SoulConfiguration  : load plugin:[response] [org.dromara.soul.plugin.httpclient.response.WebClientResponsePlugin]
2021-01-25 17:56:54.990  INFO 10051 --- [           main] d.s.s.s.s.d.n.NacosSyncDataConfiguration : you use nacos sync soul data.......
2021-01-25 17:56:58.890  INFO 10051 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 2 endpoint(s) beneath base path '/actuator'
2021-01-25 17:56:59.758  INFO 10051 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port(s): 9195
2021-01-25 17:56:59.764  INFO 10051 --- [           main] o.d.s.b.SoulBootstrapApplication         : Started SoulBootstrapApplication in 8.401 seconds (JVM running for 9.95)
```

6. Summary:

After configuration, I feel that using nacos to synchronize data is not very friendly. There are many pitfalls in the configuration process. First of all, soul-admin will not actively synchronize gateway data to nacos, and manual synchronization is required. Soul-bootstrap must rely on all of the gateway configuration data soul. Plugin, soul. Selector, soul. Selector, soul. Meta, and soul. Auth. If the gateway only proxies the HTTP service (no metadata), the soul-bootstrap cannot be started. There is no detailed explanation on the official website, which is not very friendly to Xiaobai.

We know that soul-admin will not automatically synchronize data to nacos after startup, and manual operation is required.

Let's analyze the data synchronization process of soul-admin, nacos, and soul-bootstrap.

##### How does soul-admin synchronize gateway data?

1. After the plug-in information is updated, a DataChangedEvent event will be released.

```java
/**
 * create or update plugin
 * @param pluginDTO {@linkplain PluginDTO}
 * @return rows
 */
@Override
@Transactional(rollbackFor = Exception.class)
public String createOrUpdate(final PluginDTO pluginDTO) {
    ......
    // publish change event.
    eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, eventType,
            Collections.singletonList(PluginTransfer.INSTANCE.mapToData(pluginDO))));
    return StringUtils.EMPTY;
}
```

2. The listening event processing class DataChangedEventDispatcher is responsible for calling the specific listening implementation class to process the DataChangedEvent event. The specific implementation class here is NacosData ChangedListener.

> org.dromara.soul.admin.listener.DataChangedEventDispatcher

> After the DataChangedEventDispatcher is initialized, it will execute afterPropertiesSet () to obtain all beans with DataChangedListener. Class in the container

```java

@Override
public void afterPropertiesSet() {
    Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
    this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
}
```

> > After the DataChangedEventDispatcher monitors the change event, it will execute onApplicationEvent to traverse all listening classes to process the listening event. Here is NacosDataChangedListener, as shown in the following debug figure.

```java

@Override
@SuppressWarnings("unchecked")
public void onApplicationEvent(final DataChangedEvent event) {
    for (DataChangedListener listener : listeners) {
        switch (event.getGroupKey()) {
            ......
            case RULE:
                listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                break;
            ......
            default:
                throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
        }
    }
}
```

![pic](/assets/img/blog5/ns9.png)

3. NacosData ChangedListener will execute onRuleChanged, and updateRuleMap will first synchronize the gateway data to the memory, and then synchronize to nacos through publishConfig.

> org.dromara.soul.admin.listener.nacos.NacosDataChangedListener

```java
// Execute the listening event
@Override
public void onRuleChanged(final List<RuleData> changed, final DataEventTypeEnum eventType) {
    updateRuleMap(getConfig(RULE_DATA_ID));
    switch (eventType) {
        ......
        default:
            changed.forEach(rule -> {
                List<RuleData> ls = RULE_MAP
                        .getOrDefault(rule.getSelectorId(), new ArrayList<>())
                        .stream()
                        .filter(s -> !s.getId().equals(rule.getSelectorId()))
                        .sorted(RULE_DATA_COMPARATOR)
                        .collect(Collectors.toList());
                ls.add(rule);
                RULE_MAP.put(rule.getSelectorId(), ls);
            });
            break;
    }
    publishConfig(RULE_DATA_ID, RULE_MAP);
}
// Synchronize to memory
private void updateRuleMap(final String configInfo) {
    JsonObject jo = GsonUtils.getInstance().fromJson(configInfo, JsonObject.class);
    Set<String> set = new HashSet<>(RULE_MAP.keySet());
    ......
    RULE_MAP.keySet().removeAll(set);
}
// Synchronize to Nacos
@SneakyThrows
private void publishConfig(final String dataId, final Object data) {
    configService.publishConfig(dataId, GROUP, GsonUtils.getInstance().toJson(data));
}
```

![pic](/assets/img/blog5/ns10.png)

4. DataChangedEventDispatcher and NacosData ChangedListener Class Inheritance Relationship

![pic](/assets/img/blog5/ns11.png)

![pic](/assets/img/blog5/ns12.png)

5. Summary

> 1. For example, soul-admin updates the gateway data and publishes a DataChangedEvent event, and the eventPublisher. PublishEvent (new DataChangedEvent ()).
> 2. The DataChange dEventDispatcher -- > onApplicationEvent () method listens to events and determines that the listening class is NacosData ChangedListener.
> 3. NacosData ChangedListener -- > onRuleChanged () handles the event
> 4. Synchronize to memory update RuleMap (RULE _ DATA _ ID)
> 5. Sync to nacos publishConfig (RULE _ DATA _ ID, RULE \_ MAP)

##### How does soul-bootstrap synchronize gateway data?

1. Soul-bootstrap adds nacos dependency soul-spring-boot-starter-sync-data-nacos, which will automatically inject NacosSyncDataConfiguration after the service is started.

> org.dromara.soul.springboot.starter.sync.data.nacos.NacosSyncDataConfiguration
>
> > The NacosSyncData Service is responsible for reading and synchronizing the nacos gateway data

```java
@Configuration
@ConditionalOnClass(NacosSyncDataService.class)
@ConditionalOnProperty(prefix = "soul.sync.nacos", name = "url")
@Slf4j
public class NacosSyncDataConfiguration {
    // Inject the Nacos data synchronization service
    @Bean
    public SyncDataService nacosSyncDataService(final ObjectProvider<ConfigService> configService, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        log.info("you use nacos sync soul data.......");
        return new NacosSyncDataService(configService.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }
    // Inject Nacos client configuration service
    @Bean
    public ConfigService nacosConfigService(final NacosConfig nacosConfig) throws Exception {
        Properties properties = new Properties();
        ......
        return NacosFactory.createConfigService(properties);
    }
    // Inject Nacos configuration
    @Bean
    @ConfigurationProperties(prefix = "soul.sync.nacos")
    public NacosConfig nacosConfig() {
        return new NacosConfig();
    }
}
```

2、org.dromara.soul.sync.data.nacos.NacosSyncDataService

> Initialization executes start
>
> > The watcherData is responsible for listening to the nacos gateway data
> >
> > > UpdatePluginMap synchronize gateway data to memory

```java
public void start() {
    ......
    watcherData(RULE_DATA_ID, this::updateRuleMap);
    ......
}
@SneakyThrows
private String getConfigAndSignListener(final String dataId, final Listener listener) {
    return configService.getConfigAndSignListener(dataId, GROUP, 6000, listener);
}
protected void watcherData(final String dataId, final OnChange oc) {
    Listener listener = new Listener() {
        @Override
        public void receiveConfigInfo(final String configInfo) {
            oc.change(configInfo);
        }
        ......
    };
    oc.change(getConfigAndSignListener(dataId, listener));
    LISTENERS.getOrDefault(dataId, new ArrayList<>()).add(listener);
}
```

![pic](/assets/img/blog5/ns13.png)

3. NacosSyncData Service Class Diagram

![pic](/assets/img/blog5/ns14.png)

4. Summary

> 1. Soul-bootstrap starts to automatically inject NacosSyncDataConfiguration into the container
> 2. The NacosSyncDataConfiguration class will inject the NacosSyncData Service into the container.
> 3. NacosSyncData Service -- > start () -- > watcherData () listens to nacos and synchronizes gateway data to memory
>    4、watcherData() --> updatePluginMap()

##### Sum up

![pic](/assets/img/blog5/ns15.png)
