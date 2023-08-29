---
title: Soul Gateway Learns WebSocket Data Synchronization Analysis
author: fanjinpeng,zhuming
date: 2021-01-22
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: Blog
---

> Fan Jinpeng

# 1.Previously on

In Part 4, we analyzed that after the HTTP user service system accesses the Soul gateway, it will call the registration interface of soul-admin, register all the interface information that needs to be proxied by the gateway to soul-admin, and finally, it will connect through the web socket. Synchronize the interface information received by soul-admin to Soul Gateway (soul-bootstrap). Today, we will continue to analyze how the data is synchronized to soul-bootstrap.

If you don't know the process, you can go out and turn left to see the fourth article.

# 2.Soul-admin and soul-bootstrap data synchronization

In order to verify the data synchronization process, there is no need to start the business system. You can just start the soul-admin and soul-bootstrap systems. You can open or close the plug-in on the page to see how this process is implemented.

Link to the official website of data synchronization strategy

## 2.1 Start 2 systems

They are all started by default according to the project, and no configuration files need to be modified.

## 2.2. Page operation search interface

Start the divide plug-in here, F12, and see which interface soul-admin will be called in the foreground.

![ open_divide_plugin ](/assets/img/blog3/open_divide_plugin.png)

You can see that the foreground sends a PUT request to the background: http://localhost:9095/plugin/5.

## 2.3 Background interface

Search for this interface in the project

```java
// PluginController.java
@RestController
@RequestMapping("/plugin")
public class PluginController {

...

    /**
     * update plugin.
     *
     * @param id        primary key.
     * @param pluginDTO plugin.
     * @return {@linkplain SoulAdminResult}
     */
    @PutMapping("/{id}")
    public SoulAdminResult updatePlugin(@PathVariable("id") final String id, @RequestBody final PluginDTO pluginDTO) {
        Objects.requireNonNull(pluginDTO);
        pluginDTO.setId(id);
        final String result = pluginService.createOrUpdate(pluginDTO);
        if (StringUtils.isNoneBlank(result)) {
            return SoulAdminResult.error(result);
        }
        return SoulAdminResult.success(SoulResultMessage.UPDATE_SUCCESS);
    }

...

}
```

Into the implementation class.

```java
// PluginServiceImpl.java
/**
     * create or update plugin.
     *
     * @param pluginDTO {@linkplain PluginDTO}
     * @return rows
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public String createOrUpdate(final PluginDTO pluginDTO) {
        final String msg = checkData(pluginDTO);
        if (StringUtils.isNoneBlank(msg)) {
            return msg;
        }
        PluginDO pluginDO = PluginDO.buildPluginDO(pluginDTO);
        DataEventTypeEnum eventType = DataEventTypeEnum.CREATE;
        if (StringUtils.isBlank(pluginDTO.getId())) {
            pluginMapper.insertSelective(pluginDO);
        } else {
            eventType = DataEventTypeEnum.UPDATE;
            pluginMapper.updateSelective(pluginDO);
        }

        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.PLUGIN, eventType,
                Collections.singletonList(PluginTransfer.INSTANCE.mapToData(pluginDO))));
        return StringUtils.EMPTY;
    }
```

It can be seen here that the first half is to operate the database and persist the relevant information; the second half is to publish an event.

## 2.4 Publish the event

The event published here is encapsulated by DataChangedEvent, and there is an enumeration in it. There are many types here:

```java
/**
 * configuration group.
 *
 * @author huangxiaofeng
 */
public enum ConfigGroupEnum {

    APP_AUTH,

    PLUGIN,

    RULE,

    SELECTOR,

    META_DATA;

...

}
```

Seeing these types, if you still have an impression of the fourth article, you can see that the types of events sent at that time were SELECTOR and RULE, and now it is PLUGIN. Although the types are different, it does not affect us to continue to analyze the logic behind. Let's continue.

Another eventType is also an enumeration. There are five types: DELETE, CREATE, UPDATE, REFRESH, and MYSELF. In this case, it is UPDATE.

```java
/**
 * The enum Data event type.
 *
 * @author xiaoyu
 */
public enum DataEventTypeEnum {
    /**
     * delete event.
     */
    DELETE,
    /**
     * insert event.
     */
    CREATE,
    /**
     * update event.
     */
    UPDATE,
    /**
     * REFRESH data event type enum.
     */
    REFRESH,
    /**
     * Myself data event type enum.
     */
    MYSELF;

...

}
```

## 2.5 Listen for events

Locate the code that listens for events:

```java
// DataChangedEventDispatcher.java
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
                case PLUGIN:
                    listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());
                    break;
                case RULE:
                    listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                    break;
                case SELECTOR:
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                    break;
                case META_DATA:
                    listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
                    break;
                default:
                    throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }

    @Override
    public void afterPropertiesSet() {
        Collection<DataChangedListener> listenerBeans = applicationContext.getBeansOfType(DataChangedListener.class).values();
        this.listeners = Collections.unmodifiableList(new ArrayList<>(listenerBeans));
    }
}
```

### 2.5.1 Listener injection

You can see that the DataChangedEventDispatcher implements the InitializingBean interface, overrides the afterPropertiesSet method, and uses @ Component when Spring starts. This override method is called after the container is loaded. In the After PropertiesSet method, all the beans of the DataChangedListener type are obtained and placed in the class property listeners.

So the question is, when are these listeners injected into the container?

First look at the definition of the Data ChangedListener interface:

```java
/**
 * Event listener, used to send notification of event changes,
 * used to support HTTP, websocket, zookeeper and other event notifications.
 *
 * @author huangxiaofeng
 * @author xiaoyu
 */
public interface DataChangedListener {

    /**
     * invoke this method when AppAuth was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onAppAuthChanged(List<AppAuthData> changed, DataEventTypeEnum eventType) {
    }

    /**
     * invoke this method when Plugin was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onPluginChanged(List<PluginData> changed, DataEventTypeEnum eventType) {
    }

    /**
     * invoke this method when Selector was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onSelectorChanged(List<SelectorData> changed, DataEventTypeEnum eventType) {
    }

    /**
     * On meta data changed.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onMetaDataChanged(List<MetaData> changed, DataEventTypeEnum eventType) {

    }

    /**
     * invoke this method when Rule was received.
     *
     * @param changed   the changed
     * @param eventType the event type
     */
    default void onRuleChanged(List<RuleData> changed, DataEventTypeEnum eventType) {
    }

}
```

It can be seen that there are five methods defined in the interface, which respectively deal with the corresponding processing methods when the data changes of appAuth, plugin, selector, metaData and rule are monitored.

Its inheritance relationship:

![ DataChangedListener ](/assets/img/blog3/DataChangedListener.png)

Because the websocket is used by default, the listener here corresponds to the Web socketData ChangedListener, Alt + F7, and the place where this class is instantiated is the following configuration class:

```java
// DataSyncConfiguration.java
@Configuration
public class DataSyncConfiguration {

    /**
     * http long polling.
     */
    @Configuration
    @ConditionalOnProperty(name = "soul.sync.http.enabled", havingValue = "true")
    @EnableConfigurationProperties(HttpSyncProperties.class)
    static class HttpLongPollingListener {
        @Bean
        @ConditionalOnMissingBean(HttpLongPollingDataChangedListener.class)
        public HttpLongPollingDataChangedListener httpLongPollingDataChangedListener(final HttpSyncProperties httpSyncProperties) {
            return new HttpLongPollingDataChangedListener(httpSyncProperties);
        }
    }

    /**
     * The type Zookeeper listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "soul.sync.zookeeper", name = "url")
    @Import(ZookeeperConfiguration.class)
    static class ZookeeperListener {
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataChangedListener.class)
        public DataChangedListener zookeeperDataChangedListener(final ZkClient zkClient) {
            return new ZookeeperDataChangedListener(zkClient);
        }
        @Bean
        @ConditionalOnMissingBean(ZookeeperDataInit.class)
        public ZookeeperDataInit zookeeperDataInit(final ZkClient zkClient, final SyncDataService syncDataService) {
            return new ZookeeperDataInit(zkClient, syncDataService);
        }
    }

    /**
     * The type Nacos listener.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "soul.sync.nacos", name = "url")
    @Import(NacosConfiguration.class)
    static class NacosListener {
        @Bean
        @ConditionalOnMissingBean(NacosDataChangedListener.class)
        public DataChangedListener nacosDataChangedListener(final ConfigService configService) {
            return new NacosDataChangedListener(configService);
        }
    }

    /**
     * The WebsocketListener(default strategy).
     */
    @Configuration
    @ConditionalOnProperty(name = "soul.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
    @EnableConfigurationProperties(WebsocketSyncProperties.class)
    static class WebsocketListener {
        @Bean
        @ConditionalOnMissingBean(WebsocketDataChangedListener.class)
        public DataChangedListener websocketDataChangedListener() {
            return new WebsocketDataChangedListener();
        }
        @Bean
        @ConditionalOnMissingBean(WebsocketCollector.class)
        public WebsocketCollector websocketCollector() {
            return new WebsocketCollector();
        }
        @Bean
        @ConditionalOnMissingBean(ServerEndpointExporter.class)
        public ServerEndpointExporter serverEndpointExporter() {
            return new ServerEndpointExporter();
        }
    }
}
```

There are four data synchronization strategies: HTTP long polling, zookeeper, nacos, and websocket (default strategy).

See the web socket annotation @ ConditionalOnProperty (name = "soul. Sync. Web socket. Enabled", having Value = "true", Match (IfMissing = true), find the following configuration in the configuration file:

```yaml
soul:
  sync:
    websocket:
      enabled: true
```

This is where the truth comes out.

If you do not want to use the default synchronization policy of the web socket, you can write the corresponding configuration in the configuration file.

### 2.5.2 Listening event processing logic

In order to prevent you from turning back and looking at it, which is inconvenient, I will post the processing logic code here:

```java
// DataChangedEventDispatcher.java
@Override
    @SuppressWarnings("unchecked")
    public void onApplicationEvent(final DataChangedEvent event) {
        for (DataChangedListener listener : listeners) {
            switch (event.getGroupKey()) {
                case APP_AUTH:
                    listener.onAppAuthChanged((List<AppAuthData>) event.getSource(), event.getEventType());
                    break;
                case PLUGIN:
                    listener.onPluginChanged((List<PluginData>) event.getSource(), event.getEventType());
                    break;
                case RULE:
                    listener.onRuleChanged((List<RuleData>) event.getSource(), event.getEventType());
                    break;
                case SELECTOR:
                    listener.onSelectorChanged((List<SelectorData>) event.getSource(), event.getEventType());
                    break;
                case META_DATA:
                    listener.onMetaDataChanged((List<MetaData>) event.getSource(), event.getEventType());
                    break;
                default:
                    throw new IllegalStateException("Unexpected value: " + event.getGroupKey());
            }
        }
    }
```

All listeners are traversed here. For the current web socket, there is only one listener, and it is not known when the other multiple cases will appear. It is doubtful here, and we will come back to add (//TODO) when we encounter related cases later.

Different logics are used according to the type of the published event. The types here correspond to the methods defined in the DataChangedListener interface.

The listener here is an instance of the Web socketData ChangedListener, which will enter the corresponding method in the class:

```java
// WebsocketDataChangedListener.java
public class WebsocketDataChangedListener implements DataChangedListener {

    @Override
    public void onPluginChanged(final List<PluginData> pluginDataList, final DataEventTypeEnum eventType) {
        WebsocketData<PluginData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.PLUGIN.name(), eventType.name(), pluginDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }

    @Override
    public void onSelectorChanged(final List<SelectorData> selectorDataList, final DataEventTypeEnum eventType) {
        WebsocketData<SelectorData> websocketData =
                new WebsocketData<>(ConfigGroupEnum.SELECTOR.name(), eventType.name(), selectorDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
    }

    @Override
    public void onRuleChanged(final List<RuleData> ruleDataList, final DataEventTypeEnum eventType) {
        WebsocketData<RuleData> configData =
                new WebsocketData<>(ConfigGroupEnum.RULE.name(), eventType.name(), ruleDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }

    @Override
    public void onAppAuthChanged(final List<AppAuthData> appAuthDataList, final DataEventTypeEnum eventType) {
        WebsocketData<AppAuthData> configData =
                new WebsocketData<>(ConfigGroupEnum.APP_AUTH.name(), eventType.name(), appAuthDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }

    @Override
    public void onMetaDataChanged(final List<MetaData> metaDataList, final DataEventTypeEnum eventType) {
        WebsocketData<MetaData> configData =
                new WebsocketData<>(ConfigGroupEnum.META_DATA.name(), eventType.name(), metaDataList);
        WebsocketCollector.send(GsonUtils.getInstance().toJson(configData), eventType);
    }

}
```

As you can see in the code, the data is encapsulated as Web socketData and sent using the WebsocketController. Send method.

## 2.6 Synchronize data to soul-bootstrap

```java
// WebsocketCollector.java
@Slf4j
@ServerEndpoint("/websocket")
public class WebsocketCollector {

    private static final Set<Session> SESSION_SET = new CopyOnWriteArraySet<>();

    private static final String SESSION_KEY = "sessionKey";

    /**
     * On open.
     *
     * @param session the session
     */
    @OnOpen
    public void onOpen(final Session session) {
        log.info("websocket on open successful....");
        SESSION_SET.add(session);
    }

    /**
     * On message.
     *
     * @param message the message
     * @param session the session
     */
    @OnMessage
    public void onMessage(final String message, final Session session) {
        if (message.equals(DataEventTypeEnum.MYSELF.name())) {
            try {
                ThreadLocalUtil.put(SESSION_KEY, session);
                SpringBeanUtils.getInstance().getBean(SyncDataService.class).syncAll(DataEventTypeEnum.MYSELF);
            } finally {
                ThreadLocalUtil.clear();
            }
        }
    }

    /**
     * On close.
     *
     * @param session the session
     */
    @OnClose
    public void onClose(final Session session) {
        SESSION_SET.remove(session);
        ThreadLocalUtil.clear();
    }

    /**
     * On error.
     *
     * @param session the session
     * @param error   the error
     */
    @OnError
    public void onError(final Session session, final Throwable error) {
        SESSION_SET.remove(session);
        ThreadLocalUtil.clear();
        log.error("websocket collection error: ", error);
    }

    /**
     * Send.
     *
     * @param message the message
     * @param type    the type
     */
    public static void send(final String message, final DataEventTypeEnum type) {
        if (StringUtils.isNotBlank(message)) {
            if (DataEventTypeEnum.MYSELF == type) {
                try {
                    Session session = (Session) ThreadLocalUtil.get(SESSION_KEY);
                    if (session != null) {
                        session.getBasicRemote().sendText(message);
                    }
                } catch (IOException e) {
                    log.error("websocket send result is exception: ", e);
                }
                return;
            }
            for (Session session : SESSION_SET) {
                try {
                    session.getBasicRemote().sendText(message);
                } catch (IOException e) {
                    log.error("websocket send result is exception: ", e);
                }
            }
        }
    }
}
```

The Web socketController uses the @ ServerEndpoint ( "/web socket") annotation, opens a web socket service interface, and waits for a connection.

After the soul-bootstrap is started, the web socket will be connected, and the onOpen method will be triggered to store the Session of this connection information in the Set set of the SESSION \_ SET.

In the send method, it will first determine whether the DataEventTypeEnum type is MYSELF. This type can be traced back to 2.3-2.4. This time it is UPDATE. As for when it is MYSELF, it needs to be added later. It is doubtful here (//TODO).

The following for loop iterates through all the web socket connection sessions to send the change data.

At this point, the default web socket synchronization data strategy is clear.

> Zhu Ming

## Data synchronization between background and gateway (Web socket)

### How to establish Web socket? In the background?

![05](/assets/img/blog1/05.png) Data SyncConfiguration: As the configuration factory of Spring Bean, various listeners can be constructed according to the configuration information. Including HTTP long polling mode, Zookeeper mode, Nacos mode, Web socket method.

```java
@Configuration
public class DataSyncConfiguration {

  // In the configuration of the soul-admin project, use soul.sync.websocket.enabled to enable or disable WebSocket.
  @Configuration
  @ConditionalOnProperty(name = "soul.sync.websocket.enabled", havingValue = "true", matchIfMissing = true)
  @EnableConfigurationProperties(WebsocketSyncProperties.class)
  static class WebsocketListener {

    @Bean
    @ConditionalOnMissingBean(WebsocketCollector.class)
    public WebsocketCollector websocketCollector() {
      return new WebsocketCollector();
    }
  }
}
```

Web socketListener: As `DataSyncConfiguration` the internal class of, it is responsible for the initialization of the web socket listener. Web socket Collector: It monitors the websocket connection and receives information. Maintain all session sessions connected to the background, and provide `send()` methods to notify session information.

### How does the gateway set up a Web socket?

![06](/assets/img/blog1/06.png)

Web socket SyncData Configuration: As the configuration factory of Spring Bean, it is the gateway's entrance to build Websocket communication. (An independent startup project `soul-spring-boot-starter-sync-data-websocket` is provided for the gateway to choose freely.)

```java
@Configuration
@ConditionalOnClass(WebsocketSyncDataService.class)
@ConditionalOnProperty(prefix = "soul.sync.websocket", name = "urls")
@Slf4j
public class WebsocketSyncDataConfiguration {

  // Collect all subscribers registered as Beans, such as PluginDataSubscriber, MetaDataSubscriber, AuthDataSubscriber
  @Bean
  public SyncDataService websocketSyncDataService(final ObjectProvider<WebsocketConfig> websocketConfig, final ObjectProvider<PluginDataSubscriber> pluginSubscriber, final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
    log.info("you use websocket sync soul data.......");
    return new WebsocketSyncDataService(websocketConfig.getIfAvailable(WebsocketConfig::new), pluginSubscriber.getIfAvailable(), metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
  }

  // In the configuration of the soul-bootstrap project, use soul.sync.websocket to configure the backend path for establishing connections
  @Bean
  @ConfigurationProperties(prefix = "soul.sync.websocket")
  public WebsocketConfig websocketConfig() {
    return new WebsocketConfig();
  }
}
```

Web socket SyncData Service: Get all the registered beans `WebsocketConfig` and the various `DataSubscriber` subscribers, and build an implemented `WebsocketClient` `SoulWebsocketClient` list

SoulWeb socket Client: `Websocket` The communication class monitors the websocket connection and receives information. After receiving the information from the background, it will notify each subscriber.

```java
public final class SoulWebsocketClient extends WebSocketClient {

  private final WebsocketDataHandler websocketDataHandler;

	private void handleResult(final String result) {
    WebsocketData websocketData = GsonUtils.getInstance().fromJson(result, WebsocketData.class);
    ConfigGroupEnum groupEnum = ConfigGroupEnum.acquireByName(websocketData.getGroupType());
    // Determine the event type of data changes based on the incoming information, such as refresh, update, delete, etc.
    String eventType = websocketData.getEventType();
    String json = GsonUtils.getInstance().toJson(websocketData.getData());
    websocketDataHandler.executor(groupEnum, json, eventType);
  }
}
```

Web socketData Handler: Construct the data processing classes of various implementations `AbstractDataHandler` and cache them during initialization.

```java
public class WebsocketDataHandler {

  // Cache all DataHandler data change handling classes
  private static final EnumMap<ConfigGroupEnum, DataHandler> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

  public WebsocketDataHandler(final PluginDataSubscriber pluginDataSubscriber,
                              final List<MetaDataSubscriber> metaDataSubscribers,
                              final List<AuthDataSubscriber> authDataSubscribers) {
    ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataHandler(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AuthDataHandler(authDataSubscribers));
    ENUM_MAP.put(ConfigGroupEnum.META_DATA, new MetaDataHandler(metaDataSubscribers));
  }

  public void executor(final ConfigGroupEnum type, final String json, final String eventType) {
    // Call the corresponding DataHandler data processing class based on the data change event type
    ENUM_MAP.get(type).handle(json, eventType);
  }
}
```

### Gateway data change call chain

After the entry class `SoulWebsocketClient` that implements Websocket communication receives the background communication, the `executor()` method called `WebsocketDataHandler` matches the information type, and calls the corresponding `DataHandler` `handler()` to process the information.

![07](/assets/img/blog1/07.png)

AbstractDataHandler: The implementation `handler()` method calls the corresponding event abstract method according to the type of the event (such as refresh, update, create, delete, etc.).

```java
public abstract class AbstractDataHandler<T> implements DataHandler {

  // Distribute to respective methods based on the data event type (eventType), these methods are implemented by subclasses since different types of metadata handlers have different ways of processing
  @Override
  public void handle(final String json, final String eventType) {
    List<T> dataList = convert(json);
    if (CollectionUtils.isNotEmpty(dataList)) {
      DataEventTypeEnum eventTypeEnum = DataEventTypeEnum.acquireByName(eventType);
      switch (eventTypeEnum) {
        case REFRESH:
        case MYSELF:
          doRefresh(dataList);
          break;
        case UPDATE:
        case CREATE:
          doUpdate(dataList);
          break;
        case DELETE:
          doDelete(dataList);
          break;
        default:
          break;
      }
    }
  }
}
```

XXX DataHandler: This refers to each implementation class `AbstractDataHandler` of (such as `PluginDataHandler`), whose main function is to call its subscriber.

Different `DataHandler` calls have different subscription methods:

- Notification of plug-in metadata changes `PluginDataHandler` is called `onSubscribe()`
- The notification selector is `SelectorDataHandler` called `onSelectorSubscribe()` to change the metadata
- Notification rule metadata change `RuleDataHandler` is invoked `onRuleSubscribe()`

```java
@RequiredArgsConstructor
public class PluginDataHandler extends AbstractDataHandler<PluginData> {

  private final PluginDataSubscriber pluginDataSubscriber;

  @Override
  protected void doUpdate(final List<PluginData> dataList) {
    // Call onSubscribe() of the subscriber, sending the PluginData data object
    dataList.forEach(pluginDataSubscriber::onSubscribe);
  }

  // ...
}
```

CommonPluginData Subscriber: The `onSubscribe()` method of the subscriber notifies all classes injected as beans `PluginDataHandler` (not to be confused with the previous class of the same name, which is `soul-plugin-base` the interface under. Its implementation classes are in the respective pluggable plug-in packages.

![ image-20210122172333111 ](/assets/img/blog1/image-20210122172333111.png)

```java
public class CommonPluginDataSubscriber implements PluginDataSubscriber {

  // Collect and cache all registered data handlers, such as DividePluginDataHandler under the HTTP plugin divide
  private final Map<String, PluginDataHandler> handlerMap;

  // Called for plugin metadata changes
  @Override
  public void onSubscribe(final PluginData pluginData) {
    BaseDataCache.getInstance().cachePluginData(pluginData);
    Optional.ofNullable(handlerMap.get(pluginData.getName())).ifPresent(handler -> handler.handlerPlugin(pluginData));
  }

  // Called for selector metadata changes
  @Override
  public void onSelectorSubscribe(final SelectorData selectorData) {
    BaseDataCache.getInstance().cacheSelectData(selectorData);
    Optional.ofNullable(handlerMap.get(selectorData.getPluginName())).ifPresent(handler -> handler.handlerSelector(selectorData));
  }

  // Called for rule metadata changes
  @Override
  public void onRuleSubscribe(final RuleData ruleData) {
    BaseDataCache.getInstance().cacheRuleData(ruleData);
    Optional.ofNullable(handlerMap.get(ruleData.getPluginName())).ifPresent(handler -> handler.handlerRule(ruleData));
  }
}
```

### TIPS

There are two classes PluginDataHandler with the same name under the whole project. One `soul-sync-data-websocket` of them is under the project, which is used to notify the plug-in metadata change, and the other is under the `soul-plugin-base` project, which is used to define the metadata update of each type of plug-in.

To summarize the naming meaning of these two classes, ** `soul-sync-data-websocket` the "plugin" in the lower class name means that the type of metadata is a plug-in class, and `soul-plugin-base` the "plugin" in the lower class name means that the subclass that inherits it comes from each pluggable plug-in. Such as divide, dubbo plugins, etc. **
