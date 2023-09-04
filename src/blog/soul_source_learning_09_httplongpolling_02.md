---
title: Soul Gateway Learns Http Long Polling Analysis 02
author: zhuming
date: 2021-01-27
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: Blog
---

## Data synchronization between background and gateway (Http long polling)

The last chapter of long polling analysis summarizes the implementation of long polling on the gateway side and the way of data flow.

The overall process of long polling at the gateway end is also divided into two modules: one is pulling at startup, and the other is polling to monitor changes.

## Pull data on gateway startup

After the gateway is started, it will call the interface provided by the background to pull data and send the data to the data processing class of each plug-in

The following shows the processing flow for the gateway to start pulling data: ![01](/assets/img/blog1/01.png)

These several processing steps are dispersed into the method collaborations of the following classes:

![02](/assets/img/blog1/02.png)

HttpS yncData Service # start: When the gateway is started, the HttpS yncData Service initialization will call `start()` a method, which will call the background to pull data and start multiple threads for polling and monitoring (this part will be analyzed in the next module)

```java
public class HttpSyncDataService implements SyncDataService, AutoCloseable {

  private void start() {
    // Prevents the CAS operation from being invoked twice
    if (RUNNING.compareAndSet(false, true)) {
      // Here is the focus of the process, calling the method to pull data
      this.fetchGroupConfig(ConfigGroupEnum.values());
      int threadSize = serverList.size();
      // This will be analyzed in the next module, which will enable thread polling listening according to the background cluster
      this.executor = new ThreadPoolExecutor(threadSize, threadSize, 60L, TimeUnit.SECONDS,
                                             new LinkedBlockingQueue<>(),
                                             SoulThreadFactory.create("http-long-polling", true));
      this.serverList.forEach(server -> this.executor.execute(new HttpLongPollingTask(server)));
    } else {
      log.info("soul http long polling was started, executor=[{}]", executor);
    }
  }
}
```

HttpS yncData Service # fetchGroup Config: It is only used to repeatedly call the pull data method according to the data type (for the same background, it will be requested many times, and the information of a certain data type will be pulled each time). The data type here refers to plugin, rule, selector, and so on

```java
private void fetchGroupConfig(final ConfigGroupEnum... groups) throws SoulException {
  for (int index = 0; index < this.serverList.size(); index++) {
    String server = serverList.get(index);
    try {
			// Call the pull data method multiple times according to the passed data type enumeration
      this.doFetchGroupConfig(server, groups);
      break;
    } catch (SoulException e) {
      if (index >= serverList.size() - 1) {
        throw e;
      }
      log.warn("fetch config fail, try another one: {}", serverList.get(index + 1));
    }
  }
}
```

HttpS yncData Service # doFetchGroup Config: Request the `/configs/fetch` background interface, get a certain type of data, and update the cache. Before updating the cache, it will check whether it has changed, and if it has changed, it will end. \*\* \*\* (Since it is the first time to start, the cache will definitely be updated when the data is empty, so it will end directly.)

```java
private void doFetchGroupConfig(final String server, final ConfigGroupEnum... groups) {
  StringBuilder params = new StringBuilder();
  for (ConfigGroupEnum groupKey : groups) {
    params.append("groupKeys").append("=").append(groupKey.name()).append("&");
  }
  // Construct the specific request path to fetch background data
  String url = server + "/configs/fetch?" + StringUtils.removeEnd(params.toString(), "&");
  log.info("request configs: [{}]", url);
  String json = null;
  try {
    json = this.httpClient.getForObject(url, String.class);
  } catch (RestClientException e) {
    String message = String.format("fetch config fail from server[%s], %s", url, e.getMessage());
    log.warn(message);
    throw new SoulException(message, e);
  }
  // Update cache information
  boolean updated = this.updateCacheWithJson(json);
  // If there are updates, end the process
  if (updated) {
    log.info("get latest configs: [{}]", json);
    return;
  }
  log.info("The config of the server[{}] has not been updated or is out of date. Wait for 30s to listen for changes again.", server);
  ThreadUtils.sleep(TimeUnit.SECONDS, 30);
}
```

HttpS yncData Service # update Cache WithJson: Take out the changed data information from `data` the response information and send it to the DataRefresh Factory

```java
private DataRefreshFactory factory;

public HttpSyncDataService(...){
  this.factory = new DataRefreshFactory(pluginDataSubscriber, metaDataSubscribers, authDataSubscribers);
}

private boolean updateCacheWithJson(final String json) {
  JsonObject jsonObject = GSON.fromJson(json, JsonObject.class);
  JsonObject data = jsonObject.getAsJsonObject("data");
  return factory.executor(data);
}
```

DataRefreshFactory # executor: Send the data to all kinds of data refresh classes (the information type is not distinguished here, but all data refresh classes are notified, and optimization can be considered)

```java
public final class DataRefreshFactory {

  private static final EnumMap<ConfigGroupEnum, DataRefresh> ENUM_MAP = new EnumMap<>(ConfigGroupEnum.class);

  public DataRefreshFactory(final PluginDataSubscriber pluginDataSubscriber,
                              final List<MetaDataSubscriber> metaDataSubscribers,
                              final List<AuthDataSubscriber> authDataSubscribers) {
    // 注入各类型订阅器到 MAP 中
    ENUM_MAP.put(ConfigGroupEnum.PLUGIN, new PluginDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.SELECTOR, new SelectorDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.RULE, new RuleDataRefresh(pluginDataSubscriber));
    ENUM_MAP.put(ConfigGroupEnum.APP_AUTH, new AppAuthDataRefresh(authDataSubscribers));
    ENUM_MAP.put(ConfigGroupEnum.META_DATA, new MetaDataRefresh(metaDataSubscribers));
  }

  public boolean executor(final JsonObject data) {
    final boolean[] success = {false};
    // Tureen: 所有数据类型的 DataRefresh 全调用
    ENUM_MAP.values().parallelStream().forEach(dataRefresh -> success[0] = dataRefresh.refresh(data));
    return success[0];
  }
}
```

AbstractData Refresh # refresh: Determine whether to update the cache, and if so, call the method of each type `refresh()`

```java
@Override
public Boolean refresh(final JsonObject data) {
  boolean updated = false;
  JsonObject jsonObject = convert(data);
  if (null != jsonObject) {
    ConfigData<T> result = fromJson(jsonObject);
    if (this.updateCacheIfNeed(result)) {
      updated = true;
      // Turren: 调用 refresh
      refresh(result.getData());
    }
  }
  return updated;
}
```

PluginData Refresh # refresh: Invokes the plugin's subscriber, which in turn notifies all extension related events of the change

```java
@Override
protected void refresh(final List<PluginData> data) {
  if (CollectionUtils.isEmpty(data)) {
    log.info("clear all plugin data cache");
    pluginDataSubscriber.refreshPluginDataAll();
  } else {
    pluginDataSubscriber.refreshPluginDataAll();
    // Turren: HTTP synchronization is used, calling the plugin data subscriber
    data.forEach(pluginDataSubscriber::onSubscribe);
  }
}
```

## The gateway polls to listen for changes

When the gateway is started, the thread is also started to make a background monitoring request. The monitoring request makes a while endless loop to poll, and the request will be hijacked on the background side. This is specifically analyzed in the background summary ([后台与网关数据同步 (Http 长轮询篇 <二>)](https://blog.csdn.net/zm469568595/article/details/113207367)).

The following shows the overall process of monitoring data changes by the gateway:

![03](/assets/img/blog1/03.png)

The corresponding actual code implementation is as follows:

![04](/assets/img/blog1/04.png)

The monitoring process on the ** gateway side is implemented in the HttpSyncDataService class, and will be `doFetchGroupConfig()` passed to various subscribers at the end. The following process is the same ** as that at startup

HttpS yncData Service # start: Start the thread to execute the Http LongPollingTask Runnable

Http LongPolling Task # run: Turn on cyclic call to poll method.

```java
@Override
public void run() {
  while (RUNNING.get()) {
    for (int time = 1; time <= retryTimes; time++) {
      try {
        doLongPolling(server);
      } catch (Exception e) {
        if (time < retryTimes) {
          log.warn("Long polling failed, tried {} times, {} times left, will be suspended for a while! {}",
                   time, retryTimes - time, e.getMessage());
          ThreadUtils.sleep(TimeUnit.SECONDS, 5);
          continue;
        }
        log.error("Long polling failed, try again after 5 minutes!", e);
        ThreadUtils.sleep(TimeUnit.MINUTES, 5);
      }
    }
  }
}
```

Http LongPolling Task # doLongPolling: Get the response result of the listening request. If there is a changed type in the return value, call the data pulling method.

```java
private void doLongPolling(final String server) {
  // Retrieve data from the cache
  MultiValueMap<String, String> params = new LinkedMultiValueMap<>(8);
  for (ConfigGroupEnum group : ConfigGroupEnum.values()) {
    ConfigData<?> cacheConfig = factory.cacheConfigData(group);
    String value = String.join(",", cacheConfig.getMd5(), String.valueOf(cacheConfig.getLastModifyTime()));
    params.put(group.name(), Lists.newArrayList(value));
  }
  // Build the HTTP request information
  HttpHeaders headers = new HttpHeaders();
  headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
  HttpEntity httpEntity = new HttpEntity(params, headers);
  String listenerUrl = server + "/configs/listener";
  log.debug("request listener configs: [{}]", listenerUrl);
  JsonArray groupJson = null;
  try {
    String json = this.httpClient.postForEntity(listenerUrl, httpEntity, String.class).getBody();
    groupJson = GSON.fromJson(json, JsonObject.class).getAsJsonArray("data");
  } catch (RestClientException e) {
    String message = String.format("listener configs fail, server:[%s], %s", server, e.getMessage());
    throw new SoulException(message, e);
  }
  // Obtain the changed types
  if (groupJson != null) {
    ConfigGroupEnum[] changedGroups = GSON.fromJson(groupJson, ConfigGroupEnum[].class);
    if (ArrayUtils.isNotEmpty(changedGroups)) {
      log.info("Group config changed: {}", Arrays.toString(changedGroups));
      // Retrieve data of corresponding types from the background
      this.doFetchGroupConfig(server, changedGroups);
    }
  }
}
```

LongPollingClient#doFetchGroupConfig:

This piece of code was analyzed in the previous startup, and the biggest difference between it and the startup is that \*\* \*\*..

What do you mean? If the gateway goes to `fetch` the background data and takes it back for comparison, it is found that it has been cheated! There is no change. Just wait for 30s to start the next monitoring. During this period, if there is a data change in the background, there is no way to notify the gateway.

Why is the gateway doing this? Naturally, in order to prevent a large number of useless pull cycles, if there is a problem in the background and the data is constantly notified to change, but there is no actual change, then the gateway will generate a large number of useless network IO and data exchange with the background without delay.
