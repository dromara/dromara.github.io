---
title: Soul Gateway Learns Http Long Polling Analysis 01
author: zhuming
date: 2021-01-25
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: Blog
---

## Data synchronization between background and gateway (Http long polling)

### Configuration

** Background information mode switching **

In the previous analysis of Zookeeper synchronization ([ Soul Gateway Source Code Analysis-Issue 11 ](https://blog.csdn.net/zm469568595/article/details/113065463)), we switched through the DataSyncConfiguration configuration class. This time, we have experience and paste the configuration directly.

```yml
soul:
  sync:
    websocket:
      enabled: false
    http:
      enabled: true
```

** Gateway information mode switching **

After the background mode switching is completed, the next step is the gateway. Continue to find the parameter settings on the key configuration class. The gateway configuration is also directly posted here.

```yml
soul:
  sync:
#		 websocket:
#			 urls: ws://localhost:9095/websocket
  http:
  	url: http://localhost:9095
```

### Data ChangedListener system

Background data initialization Data SyncConfiguration configures key beans. Take a look at the Http long polling Bean here.

```java
@Configuration
public class DataSyncConfiguration {

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
}
```

Http LongPollingData ChangedListener inherit from AbstractData ChangedListener, which are implemented from the interface DataChangedListener.

We should be very familiar with the DataChangedListener interface, which provides many methods of different data type changes for the DataChangedEventDispatcher to call, and this class is an "old friend" as a transit station. Diligent ** Handle event classification and distribution for data synchronization **

```java
public class DataChangedEventDispatcher implements ApplicationListener<DataChangedEvent>, InitializingBean {
  // Hold the DataChangedListener collection
  private List<DataChangedListener> listeners;

  // Method to notify the DataChangedListener of different event types when an event changes
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
}
```

```java
public interface DataChangedListener {

  default void onAppAuthChanged(List<AppAuthData> changed, DataEventTypeEnum eventType) {}

  default void onPluginChanged(List<PluginData> changed, DataEventTypeEnum eventType) {}

  default void onSelectorChanged(List<SelectorData> changed, DataEventTypeEnum eventType) {}

  default void onMetaDataChanged(List<MetaData> changed, DataEventTypeEnum eventType) {}

  default void onRuleChanged(List<RuleData> changed, DataEventTypeEnum eventType) {}
}
```

After understanding the functions of these two, what does AbstractData ChangedListener do? Take an example of onPluginChanged ():

```java
public abstract class AbstractDataChangedListener implements DataChangedListener, InitializingBean {

  protected static final ConcurrentMap<String, ConfigDataCache> CACHE = new ConcurrentHashMap<>();

	@Override
  public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    if (CollectionUtils.isEmpty(changed)) {
      return;
    }
    this.updatePluginCache();
    this.afterPluginChanged(changed, eventType);
  }

  // Modify cache (overwritable)
  protected void updatePluginCache() {
    this.updateCache(ConfigGroupEnum.PLUGIN, pluginService.listAll());
  }

  protected <T> void updateCache(final ConfigGroupEnum group, final List<T> data) {
    String json = GsonUtils.getInstance().toJson(data);
    ConfigDataCache newVal = new ConfigDataCache(group.name(), json, Md5Utils.md5(json), System.currentTimeMillis());
    ConfigDataCache oldVal = CACHE.put(newVal.getGroup(), newVal);
    log.info("update config cache[{}], old: {}, updated: {}", group, oldVal, newVal);
  }

  // Hook, customize what to do after ending data changes (rewritable)
  protected void afterPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
  }
}
```

For a plug-in data change method (onPluginChanged), AbstractDataChangedListener actually defines a template, so that the subclass can work according to the specified steps, and the details of each step can be implemented by the subclass itself.

Second, if you do not override its cache updates, it is maintained by the class in CACHE.

### What are the other synchronization strategies doing at this time?

After the DataChange dEventDispatcher calls onPluginChanged (), how does the long polling module work? ** Think about what other synchronization methods are doing at this point. **

The web socket pattern, for example, rewrites onPluginChanged () itself to send the websocket information to the holding session, which has a gateway.

```java
public class WebsocketDataChangedListener implements DataChangedListener {

	@Override
  public void onPluginChanged(final List<PluginData> pluginDataList, final DataEventTypeEnum eventType) {
    WebsocketData<PluginData> websocketData =
      new WebsocketData<>(ConfigGroupEnum.PLUGIN.name(), eventType.name(), pluginDataList);
    WebsocketCollector.send(GsonUtils.getInstance().toJson(websocketData), eventType);
  }
}
```

Looking at the zookeeper pattern, it also rewrites onPluginChanged () to modify the node information on the zookeeper so that the gateway side will hear their node changes.

```java
public class ZookeeperDataChangedListener implements DataChangedListener {

	@Override
  public void onPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    for (PluginData data : changed) {
      String pluginPath = ZkPathConstants.buildPluginPath(data.getName());
      // delete
      if (eventType == DataEventTypeEnum.DELETE) {
        deleteZkPathRecursive(pluginPath);
        String selectorParentPath = ZkPathConstants.buildSelectorParentPath(data.getName());
        deleteZkPathRecursive(selectorParentPath);
        String ruleParentPath = ZkPathConstants.buildRuleParentPath(data.getName());
        deleteZkPathRecursive(ruleParentPath);
        continue;
      }
      //create or update
      insertZkNode(pluginPath, data);
    }
  }
}
```

As you can see, at this juncture, other synchronization strategies are already busy notifying gateways, so Http long polling must also do this.

These two strategies are also different in the way of notification, websocket is a good person to do to the end, directly find the session session to send the information in person. After the zookeeper changes the node information, the gateway monitors the change and then synchronizes.

So how does our Http long polling now notify the gateway? Keep looking..

### Thinking on the Implementation of Long Polling

First think about how I can design long polling by myself?

Normal long polling implementation should be actively requested by the gateway. The background receives the request and holds it. If there is an update, it will return directly. If not, it will be blocked for a certain period of time. And the background is to do a good job of updating the data, hold the time to check whether the data has changed.

There are three points involved here:

1. How do you know if the data has changed? Do you set a last update time and compare it with the request time of the gateway to see if there is any data modification?
2. After holding, how does the background know whether the data is updated, repeated traversal or blocked waiting?
3. Where is the data used for updating? In the case of caching, consider how the background cache interacts with the database.

### Http LongPollingData ChangedListener Long Polling Implementation

Around our thinking, look at how Http LongPollingData ChangedListener is achieved. Let's take a look at the implementation of the parent onPluginChanged ().

```java
public class HttpLongPollingDataChangedListener extends AbstractDataChangedListener {

  private final ScheduledExecutorService scheduler;

  @Override
  protected void afterPluginChanged(final List<PluginData> changed, final DataEventTypeEnum eventType) {
    scheduler.execute(new DataChangeTask(ConfigGroupEnum.PLUGIN));
  }
}
```

Http long polling does not directly override onPluginChanged (), but directly uses its parent class, which means that its CACHE is used. In the end, our information acquisition must also be analyzed. Put it aside for the time being.

The following logic will call the afterPluginChanged () method of our implementation, where a timed thread pool is used to run a Runnable task DataChangeTask.

```java
class DataChangeTask implements Runnable {

  @Override
  public void run() {
    // Iterate through clients
    for (Iterator<LongPollingClient> iter = clients.iterator(); iter.hasNext();) {
      LongPollingClient client = iter.next();
      iter.remove();
      // Description Complete response The response is complete
      client.sendResponse(Collections.singletonList(groupKey));
      log.info("send response with the changed group,ip={}, group={}, changeTime={}", client.ip, groupKey, changeTime);
    }
  }
}
```

After the data is changed, the thread pool is used to call this method, take all `clients` the elements while traversing, and call the method sendResponse (), like marking that the response has been completed.

Let me guess what it does. `clients` It's likely that the request is held by the gateway, and send response () is likely to actually add response information to the request context. Another key action is to end the hold, allowing the gateway to receive the response and remove the request from the collection.

We now trace the following `client` generation, which is a BlockingQueue blocking queue in the HttpLongPollingData ChangedListener, which is periodically detected in the LongPolling Client.

```java
class LongPollingClient implements Runnable {

  @Override
  public void run() {
    this.asyncTimeoutFuture = scheduler.schedule(() -> {
      clients.remove(LongPollingClient.this);
      List<ConfigGroupEnum> changedGroups = compareChangedGroup((HttpServletRequest) asyncContext.getRequest());
      sendResponse(changedGroups);
    }, timeoutTime, TimeUnit.MILLISECONDS);
    // Here is the key, indicating the source
    clients.add(this);
  }
}
```

Instead of analyzing the detection code block of remove (), you can see the add () in the last sentence, which is `clients` the source of the data.

Find where LongPollingClient is called. HttpLongPollingData ChangedListener # doLongPolling

```java
public void doLongPolling(final HttpServletRequest request, final HttpServletResponse response) {

  // ...

  // listen for configuration changed.
  // Enable synchronous blocking requests
  final AsyncContext asyncContext = request.startAsync();

  // AsyncContext.settimeout() does not timeout properly, so you have to control it yourself
  asyncContext.setTimeout(0L);

  // block client's thread.
  // The thread pool calls LongPollingClient#run
  scheduler.execute(new LongPollingClient(asyncContext, clientIp, HttpConstants.SERVER_MAX_HOLD_TIMEOUT));
}
```

The last sentence here will be called and added `client`, and there is a key line of code that blocks the request:

```java
final AsyncContext asyncContext = request.startAsync();
```

In the LongPolling Client # sendResponse, it has just been analyzed that, in addition to wrapping the injected response information, the held request will also be released.

```java
class LongPollingClient implements Runnable {

	void sendResponse(final List<ConfigGroupEnum> changedGroups) {
    // cancel scheduler
    if (null != asyncTimeoutFuture) {
      asyncTimeoutFuture.cancel(false);
    }
    generateResponse((HttpServletResponse) asyncContext.getResponse(), changedGroups);
    // The synchronization is complete
    asyncContext.complete();
  }
}
```

After this analysis, we go back to doLongPolling (), where the thread pool calls another key point.

```java
scheduler.execute(new LongPollingClient(asyncContext, clientIp, HttpConstants.SERVER_MAX_HOLD_TIMEOUT));
```

The timeout time of 60s is passed to the LongPolling Client here. What is it used for? Remember that piece of code we skipped over at LongPolling Client # run?

```java
class LongPollingClient implements Runnable {

  @Override
  public void run() {
    // Start time. The delay time is based on timeoutTime
    this.asyncTimeoutFuture = scheduler.schedule(() -> {
      // Remove the managed connection
      clients.remove(LongPollingClient.this);
      List<ConfigGroupEnum> changedGroups = compareChangedGroup((HttpServletRequest) asyncContext.getRequest());
      // This method releases the blocked request
      sendResponse(changedGroups);
    }, timeoutTime, TimeUnit.MILLISECONDS);

    clients.add(this);
  }
}
```

Here we have understood the implementation of the long polling process in the background. Finally, we will see how doLongPolling () is called and find the calling class ConfigController.

```java
@ConditionalOnBean(HttpLongPollingDataChangedListener.class)
@RestController
@RequestMapping("/configs")
@Slf4j
public class ConfigController {

  @PostMapping(value = "/listener")
  public void listener(final HttpServletRequest request, final HttpServletResponse response) {
    longPollingListener.doLongPolling(request, response);
  }
}
```

It is also basically clear that the background exposes the HTTP path through this Controller for the gateway to call and listen to data changes.

### Sum up

- The background exposes the API to the gateway through the Controller layer. When the gateway requests the background, the background does not immediately return a response (whether the data has changed), but holds the request for a maximum of 60 seconds. These held requests are added to the blocking queue as an in-memory cache.
- If there is any data change in these 60 seconds, it will be distributed to our HttpLongPollingData ChangedListener through the DataChangedEventDispatcher. All held requests are traversed ** Invoke the thread pool immediately ** in the blocking queue, stuffed with response information and released.
- If there is still no data change after 60 seconds, the held request will be released and the corresponding request object of the blocking queue will be removed.

At this point, we have sorted out its most basic long polling logic, then corresponding to the next beginning of thinking, see what conclusions or doubts.

> 1. How do you know if the data has changed? Do you set a last update time and compare it with the request time of the gateway to see if there is any data modification?
> 2. After holding, how does the background know whether the data is updated, repeated traversal or blocked waiting?
> 3. Where is the data used for updating? In the case of caching, consider how the background cache interacts with the database.

In response to point 1, how do we know that the data has changed?

- At present, the data change source of our analysis is DataChangedEventDispatcher, which not only informs us when the data changes, but also calls it immediately every time we manually click the background synchronization.

  Then there must be something like new and old data comparison. Otherwise, every call will directly release the blocking request of the gateway. This is not possible. White IO consumption is certainly not a good design.

For the second point, we now know that the mode is blocking and waiting, which is `AsyncContext` used in this way. I have not understood this part, and I will discuss it in an extra chapter.

For the third point, we know that the background configuration must be modified to the database, so the interaction between this cache and the database is also a point worth analyzing. I will continue to analyze these questions in the next chapter.
