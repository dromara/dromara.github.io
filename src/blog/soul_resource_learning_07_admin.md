---
title: Soul Gateway Learning Admin Source Code Analysis
author: zenglinhui
date: 2021-01-20
tag:
  - Soul
cover: /img/architecture/soul-framework.png
head:
  - - meta
    - name: Blog
---

# Source Code Analysis

## Page Operation Source Code Analysis

Before analyzing the source code, let's take a look at the image below. The plugin list displayed on the page corresponds to requests made to the backend. Based on these backend requests, the corresponding controller class is identified.

![Insert Image Description Here](https://img-blog.csdnimg.cn/20210117034006267.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

Then, we find the corresponding method. In the image above, it can be seen that here, we access the mapping that is empty by default in the "plugin". We pass in pagination-related parameters and then query the corresponding plugin records in the database.

![Insert Image Description Here](https://img-blog.csdnimg.cn/20210117034215738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

The corresponding table in the database is shown in the image below. The "divide" status is enabled. In the previous article, this plugin was used to test the gateway.

![Insert Image Description Here](https://img-blog.csdnimg.cn/20210117035235400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

At the same time, a selector is also requested. The requested controller can be seen in the image below. In the previous demonstration, we directly perform CRUD operations on the conditions in the selector on the page. These changes can be reflected in the gateway in real time without the need to restart the gateway. Therefore, in addition to the "query" method, the "create", "delete", and "update" methods have been added. After saving to the database, a "publishEvent" method is triggered. This event allows users to configure rules directly in the Soul backend, achieving real-time effectiveness.

![Insert Image Description Here](https://img-blog.csdnimg.cn/20210117040000892.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

```
public int createOrUpdate(final SelectorDTO selectorDTO) {
        int selectorCount;
        SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
        List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
        if (StringUtils.isEmpty(selectorDTO.getId())) {
            selectorCount = selectorMapper.insertSelective(selectorDO);
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                selectorConditionMapper.insertSelective(SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO));
            });
        } else {
            selectorCount = selectorMapper.updateSelective(selectorDO);
            //delete rule condition then add
            selectorConditionMapper.deleteByQuery(new SelectorConditionQuery(selectorDO.getId()));
            selectorConditionDTOs.forEach(selectorConditionDTO -> {
                selectorConditionDTO.setSelectorId(selectorDO.getId());
                SelectorConditionDO selectorConditionDO = SelectorConditionDO.buildSelectorConditionDO(selectorConditionDTO);
                selectorConditionMapper.insertSelective(selectorConditionDO);
            });
        }
        publishEvent(selectorDO, selectorConditionDTOs);
        return selectorCount;
    }
```

2. **Synchronization with soul-bootstrap (WebSocket) Source Code Analysis**

Previously, it was explained how data is saved to the database after performing operations on the admin page. Spring's built-in reactive programming is used to synchronize the data with the bootstrap project, achieving dynamic refreshing of gateway rules and plugins without requiring a restart.
When soul-bootstrap starts, the following log entry is displayed:

```
2021-01-21 00:33:39.620  INFO 14276 --- [0.0-9095-exec-5] o.d.s.a.l.websocket.WebsocketCollector   : websocket on open successful....
```

The question is, which entity is it connecting to using WebSockets and how does the connection happen? By examining the code that generates this log entry, we can gain insights. Here's where the log entry is generated:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121004835890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
First, let's analyze this code:

- Get the requested address from the websocketConfig configuration, which is of course configured in the location shown in the following figure.
- After obtaining this configuration address, a timed thread pool is created with a size of urls.length, and a daemon thread with a thread name prefix of "websocket-connect" is created. Why use daemon threads? Because this is just to ensure that the websocket connections of bootstrap and admin are constantly maintained, similar to the function of a heartbeat, so a daemon thread is the best choice.
- According to the created client, one by one, go to the address configured in the configuration file, and then print the previously found logs.
- Finally, start a thread to check if the client is closed. If it is closed, it will reconnect (the initial interval is 10 seconds, and then it will check every 30 seconds, so if you see multiple connection success logs printed in the console, it means that reconnection has occurred).
  ![Insert picture description here](https://img-blog.csdnimg.cn/20210121005138940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
- Next, let's take a look at how the data operated in the admin background is synchronized to bootstrap. Previously, it was mentioned that after saving or updating data in the background, the publishEvent method is called. This is a method of spring's built-in reactive programming. Since it is reactive, it is event-based, and therefore requires a listener.
  ![Insert picture description here](https://img-blog.csdnimg.cn/20210121011826544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

Sure enough, the red box in the above picture is familiar, it is a listener related to websocket. If you still don't understand the connection between the listener and the previous publishEvent, then put breakpoints in the listener's code and debug it. For convenience, I clicked on this synchronization of all data here.
![Insert picture description here](https://img-blog.csdnimg.cn/20210121012123937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
This enters the DataChangedEventDispatcher class, calls the event-related methods, and in the lower left corner, you can see familiar methods. Yes, it is the aforementioned publishEvent.

- Then it will jump to the WebsocketDataChangedListener class. Here, pay attention to the send method in the debugging method.
  ![Insert picture description here](https://img-blog.csdnimg.cn/2021012101272614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
- Use the send method to send the updated data to bootstrap. At this point, how admin synchronizes data to bootstrap is revealed.
  ![Insert picture description here](https://img-blog.csdnimg.cn/20210121013002688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

3. **Soul-bootstrap data synchronization (zookeeper) source code analysis**

Without further ado, let's first look at the picture. Comment out the websocket configuration, open the zookeeper configuration, and start the local or remote zookeeper service. Then start soul-admin.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121152407500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
First, enter the run method of the ZookeeperDataInit class. After this method is executed, the strange thing is that it jumps to the WebsocketDataChangedListener class.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121233759520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
I don't understand this point. After the onPluginChanged method in this class is executed, it returns to the ZookeeperDataChangedListener class.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234036652.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
If it is not deleted, the zkNode node data will be updated.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234326495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
Method for updating zk node.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121234628900.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
Moreover, the onSelectorChanged, onMetaDataChanged, and onRuleChanged methods will all first go to the corresponding methods in the WebsocketDataChangedListener class, and then enter the methods in the ZookeeperDataChangedListener class. If the plugin data is changed, it will go through the above steps again.
The problem of entering two Listener classes for synchronous data has not been solved yet. Suddenly, I thought that there was a dependency on websocket in the pom file, because the websocket configuration in the application.yml file had been commented out (not enable=false), so I commented out this dependency first and then compiled the code. I found that the code did not pass the compilation. Another way is to change websocket to disabled. After the modification, I found that it would not jump to the websocket-related class again.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122000547192.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70) 4. **Analysis of soul-bootstrap data synchronization (http) source code**

As usual, modify the configuration in the yml file, and then set a breakpoint in the corresponding listener class. If http is used here, the websocket-related class will still be accessed, so it cannot be commented out directly.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122005803207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

Let's take a look at the code inside:
There is a constructor here, which instantiates a clients array blocking queue with a size of 1024. A timed task thread pool with a thread number of 1 and a name prefix of "long-polling" background daemon thread (as can be seen from the name, this is used for long polling). A related property configuration
In the initialization method, a timed thread is started. After 5 minutes, the refreshLocalCache method for refreshing the local cache is executed every 5 minutes.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122004153175.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)

```
    private void refreshLocalCache() {
        this.updateAppAuthCache();
        this.updatePluginCache();
        this.updateRuleCache();
        this.updateSelectorCache();
        this.updateMetaDataCache();
    }
```

If the data is manually synchronized, the following related methods will be executed, and they will also be executed through the timed thread pool, but they will be executed immediately.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210122010007881.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1dGFuYm8xMjM=,size_16,color_FFFFFF,t_70)
Five minutes later, execute the corresponding refresh method, and print the log.

```
2021-01-22 01:00:19.007  INFO 20800 --- [-long-polling-2] a.l.h.HttpLongPollingDataChangedListener : http sync strategy refresh config start.
2021-01-22 01:00:19.010  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[APP_AUTH], old: {group='APP_AUTH', md5='d751713988987e9331980363e24189ce', lastModifyTime=1611248118794}, updated: {group='APP_AUTH', md5='d751713988987e9331980363e24189ce', lastModifyTime=1611248419010}
2021-01-22 01:00:19.012  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[PLUGIN], old: {group='PLUGIN', md5='70b269257d47f0f6404ae7b7e976d8f1', lastModifyTime=1611248295740}, updated: {group='PLUGIN', md5='70b269257d47f0f6404ae7b7e976d8f1', lastModifyTime=1611248419012}
2021-01-22 01:00:19.069  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[RULE], old: {group='RULE', md5='5811b56257e31109621976d39fc226aa', lastModifyTime=1611248301607}, updated: {group='RULE', md5='5811b56257e31109621976d39fc226aa', lastModifyTime=1611248419069}
2021-01-22 01:00:19.075  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[SELECTOR], old: {group='SELECTOR', md5='70bad5ebb1cf6e3fc55278eef2df42f3', lastModifyTime=1611248299419}, updated: {group='SELECTOR', md5='70bad5ebb1cf6e3fc55278eef2df42f3', lastModifyTime=1611248419075}
2021-01-22 01:00:19.077  INFO 20800 --- [-long-polling-2] o.d.s.a.l.AbstractDataChangedListener    : update config cache[META_DATA], old: {group='META_DATA', md5='5f79d821e3b601330631a2d53294fb34', lastModifyTime=1611248302571}, updated: {group='META_DATA', md5='5f79d821e3b601330631a2d53294fb34', lastModifyTime=1611248419077}
2021-01-22 01:00:19.077  INFO 20800 --- [-long-polling-2] a.l.h.HttpLongPollingDataChangedListener : http sync strategy refresh config success.
```

5. There are other methods for synchronizing data in soul, which will be analyzed later if there is energy. This is the end of the analysis of the soul-admin source code. If further analysis is conducted, another article will be written separately.

# Summary

There are still many features in soul-admin that have not been used yet, and there are many interesting things. This article will be continuously updated, and the source code inside will be analyzed in detail when it is used.

1. On January 20, 2021, analyzed how soul-admin synchronizes data to soul-bootstrap using websocket.
2. On January 21, 2021, analyzed how soul-admin synchronizes data to soul-bootstrap using zookeeper.
3. On January 21, 2021, analyzed how soul-admin synchronizes data to soul-bootstrap using http.
