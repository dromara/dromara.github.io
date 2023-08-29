---
title: Soul Gateway Learns Zookeeper Data Synchronization 02
author: liquan
date: 2021-01-21
tag:
  - Soul
cover: '/assets/img/architecture/soul-framework.png'
head:
  - - meta
    - name: Blog
---

#### Start the admin? And Gateway. Admin operation, using zookeeper to synchronize data to the gateway

The soul-admin [previous article](https://dromara.org/blog/soul_source_learning_13_zookeeper_01) startup process is the entry. After analyzing the soul-admin startup, the gateway data rule, metaData, selector, plugin, etc. Will be synchronized to the zookeeper.

The data change will publish the DataChangedEvent event, and the listening event will synchronize the data to the zookeeper. This article follows the previous article to continue to track the source code and analyze the principle of zookeeper synchronizing data to the gateway:

- Soul-admin changes the gateway data and tracks the data synchronization process.
- How soul-bootstrap gets zookeeper data and how it senses changes in gateway data.

###### 1. Soul-admin changes the gateway data and tracks the data synchronization process

1. Try to change the status of the divide plug-in in the background of the gateway, debug tracking.

![pic](/assets/img/blog5/zk7.png)

2. After the plug-in is updated, a Data ChangedEvent event will be issued.

![pic](/assets/img/blog5/zk8.png)

3. Org. Dromara. Soul. Admin. Listener. DataChangedEventDispatcher -- > onApplicationEvent () is responsible for listening to events.

![pic](/assets/img/blog5/zk9.png)

4. The org. Dromara. Soul. Admin. Listener. Zookeeper. ZookeeperData ChangedListener is responsible for synchronizing data to zookeeper.

![pic](/assets/img/blog5/zk10.png)

###### 2. How does soul-bootstrap get zookeeper data and how does it perceive changes in gateway data.

1. Soul-bootstrap dependency

```xml
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
    <version>${project.version}</version>
</dependency>
```

2. Soul-bootstrap will automatically inject org. Dromara. Soul. Spring. Boot. Sync. Data. Zookeeper. ZookeeperSyncData Configuration after startup.

Inject ZkClient into the container by reading the Zookeeper configuration.

The SyncData Service injects the data synchronization service bean into the container and obtains the ZkClient (zookeeper client) from the Spring container. Plugin Subscriber, metaSubscribers, authSubscribers.

```java
public class ZookeeperSyncDataConfiguration {
    /**
     * Sync data service sync data service.
     * @param zkClient          the zk client
     * @param pluginSubscriber the plugin subscriber
     * @param metaSubscribers   the meta subscribers
     * @param authSubscribers   the auth subscribers
     * @return the sync data service
     */
    @Bean
    public SyncDataService syncDataService(final ObjectProvider<ZkClient> zkClient, final ObjectProvider<PluginDataSubscriber> pluginSubscriber,
                                           final ObjectProvider<List<MetaDataSubscriber>> metaSubscribers, final ObjectProvider<List<AuthDataSubscriber>> authSubscribers) {
        log.info("you use zookeeper sync soul data.......");
        return new ZookeeperSyncDataService(zkClient.getIfAvailable(), pluginSubscriber.getIfAvailable(),
                metaSubscribers.getIfAvailable(Collections::emptyList), authSubscribers.getIfAvailable(Collections::emptyList));
    }
    /**
     * register zkClient in spring ioc.
     * @param zookeeperConfig the zookeeper configuration
     * @return ZkClient {@linkplain ZkClient}
     */
    @Bean
    public ZkClient zkClient(final ZookeeperConfig zookeeperConfig) {
        return new ZkClient(zookeeperConfig.getUrl(), zookeeperConfig.getSessionTimeout(), zookeeperConfig.getConnectionTimeout());
    }
}
```

3. Initialize the org. Dromara. Soul. Sync. Data. Zookeeper. ZookeeperSyncData Service, that is, after the soul-bootstrap is started, the data will be obtained from the zookeeper and synchronized to the memory.

- watcherData()--> watcherAll() --> watcherPlugin() --> cachePluginData()。
- The zkClient. SubscribeData Changes () monitors the modification and deletion of the contents of the current node and its child nodes.

```java
public class ZookeeperSyncDataService implements SyncDataService, AutoCloseable {
    private final ZkClient zkClient;
    private final PluginDataSubscriber pluginDataSubscriber;
    private final List<MetaDataSubscriber> metaDataSubscribers;
    private final List<AuthDataSubscriber> authDataSubscribers;
    /**
     * Instantiates a new Zookeeper cache manager.
     * @param zkClient             the zk client
     * @param pluginDataSubscriber the plugin data subscriber
     * @param metaDataSubscribers  the meta data subscribers
     * @param authDataSubscribers  the auth data subscribers
     */
    public ZookeeperSyncDataService(final ZkClient zkClient, final PluginDataSubscriber pluginDataSubscriber,
                                    final List<MetaDataSubscriber> metaDataSubscribers, final List<AuthDataSubscriber> authDataSubscribers) {
        this.zkClient = zkClient;
        this.pluginDataSubscriber = pluginDataSubscriber;
        this.metaDataSubscribers = metaDataSubscribers;
        this.authDataSubscribers = authDataSubscribers;
        watcherData();
        watchAppAuth();
        watchMetaData();
    }
    ......
	private void watcherData() {
	    final String pluginParent = ZkPathConstants.PLUGIN_PARENT;
	    List<String> pluginZKs = zkClientGetChildren(pluginParent);
	    for (String pluginName : pluginZKs) {
	        watcherAll(pluginName);
	    }
	    zkClient.subscribeChildChanges(pluginParent, (parentPath, currentChildren) -> {
	        if (CollectionUtils.isNotEmpty(currentChildren)) {
	            for (String pluginName : currentChildren) {
	                watcherAll(pluginName);
	            }
	        }
	    });
	}
    ......
	private void watcherPlugin(final String pluginName) {
	    String pluginPath = ZkPathConstants.buildPluginPath(pluginName);
	    if (!zkClient.exists(pluginPath)) {
	        zkClient.createPersistent(pluginPath, true);
	    }
	    cachePluginData(zkClient.readData(pluginPath));
	    subscribePluginDataChanges(pluginPath, pluginName);
	}
}
```

4. The debug process

![pic](/assets/img/blog5/zk11.png)

###### 3. How does soul-bootstrap sense changes in gateway data

1. Put a breakpoint on the org. Dromara. Soul. Sync. Data. Zookeeper. ZookeeperSyncData ServicecacheRuleData method, update the plug-in rule, and observe whether the breakpoint is entered.

```java
private void cacheRuleData(final RuleData ruleData) {
    Optional.ofNullable(ruleData)
            .ifPresent(data -> Optional.ofNullable(pluginDataSubscriber).ifPresent(e -> e.onRuleSubscribe(data)));
}
```

2. Soul-admin operates in the background to change the divide plug-in rules. First, soul-admin will publish the event and listen to the event to update the data synchronously to zookeeper.

![pic](/assets/img/blog5/zk12.png)

3. Soul-bootstrap has indeed received an update of the plug-in data. According to the "zookeeper synchronization principle" introduced by Soul's official website, it mainly relies on the watch mechanism of zookeeper.

Org. Dromara. Soul. Sync. Data. Zookeeper. ZookeeperSyncData Service:

The zkClient. SubscribeData Changes () monitors the modification and deletion of the contents of the current node and its child nodes.

```java
zkClient.subscribeChildChanges(groupParentPath, (parentPath, currentChildren) -> {
    if (CollectionUtils.isNotEmpty(currentChildren)) {
        List<String> addSubscribePath = addSubscribePath(childrenList, currentChildren);
        // Get the newly added node data and subscribe to that node
        addSubscribePath.stream().map(addPath -> {
            String realPath = buildRealPath(parentPath, addPath);
            cacheRuleData(zkClient.readData(realPath));
            return realPath;
        }).forEach(this::subscribeRuleDataChanges);
    }
});
private void subscribeRuleDataChanges(final String path) {
    zkClient.subscribeDataChanges(path, new IZkDataListener() {
        @Override
        public void handleDataChange(final String dataPath, final Object data) {
            cacheRuleData((RuleData) data);
        }
        @Override
        public void handleDataDeleted(final String dataPath) {
            unCacheRuleData(dataPath);
        }
    });
}
```

![pic](/assets/img/blog5/zk13.png)

###### IV. Summary

![pic](/assets/img/blog5/zk14.png)
