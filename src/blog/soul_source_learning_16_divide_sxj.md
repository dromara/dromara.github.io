---
title: Soul Gateway Learning Divide Plugin Source Code Interpretation
author: shenxiangjun
tag:
  - Soul
date: 2021-02-01
cover: /assets/img/activite/soul-xmind.png
head:
  - - meta
    - name: Blog
---

## Plug-in overview

** Plug-in positioning **

The divide plug-in is an HTTP forward proxy plug-in, and all HTTP requests are load balanced by the plug-in (the specific load balancing policy is specified in the rule).

** Effective time **

When the rpcType of the request header is HTTP and the plug-in is enabled, it will match the rules according to the request parameters, and finally be handed over to the downstream plug-in for responsive proxy invocation.

## Plug-in processing flow

1. First, review the general process of the request processing plug-in (AbstractSoulPlugin # execute):

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
    // Get plugin data
  	String pluginName = named();
    final PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
    if (pluginData != null && pluginData.getEnabled()) {
        // Obtain selector data
      	final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
        ...
        // Match selector
        final SelectorData selectorData = matchSelector(exchange, selectors);
        ...
        // Obtain rule data
        final List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
        ...
        // Match rule
        RuleData rule;
        if (selectorData.getType() == SelectorTypeEnum.FULL_FLOW.getCode()) {
            //get last
            rule = rules.get(rules.size() - 1);
        } else {
            rule = matchRule(exchange, rules);
        }
        ...
        // Execute custom processing
        return doExecute(exchange, chain, selectorData, rule);
    }
  	// Continue executing plugin chain processing
    return chain.execute(exchange);
}
```

The AbstractSoulPlugin first matches the corresponding selector and rule, and then executes the custom processing of the plug-in if the match is passed.

2. Take a look at the custom processing flow of the divide plug-in (DividePlugin # doExecute):

```java
protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
    ...
  	// Prepare rule handling object (internally holds: load balancing algorithm name, retry count, and timeout)
    final DivideRuleHandle ruleHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), DivideRuleHandle.class);
  	// Get the list of available services for the selector
    final List<DivideUpstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
    ...
    // Select the specific service instance IP to be distributed (load balancing)
    final String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
    DivideUpstream divideUpstream = LoadBalanceUtils.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
    ...
    //Set HTTP URL, timeout, and retry count
    String domain = buildDomain(divideUpstream);
    String realURL = buildRealURL(domain, soulContext, exchange);
    exchange.getAttributes().put(Constants.HTTP_URL, realURL);
    exchange.getAttributes().put(Constants.HTTP_TIME_OUT, ruleHandle.getTimeout());
    exchange.getAttributes().put(Constants.HTTP_RETRY, ruleHandle.getRetry());
  	// Continue executing downstream of the plugin chain
    return chain.execute(exchange);
}
```

The DividePlugin first obtains the list of available services corresponding to the selector, then performs load balancing to select the target server instance IP to be distributed, and finally sets the final URL, timeout time, and retry times for the downstream of the plug-in chain to process.

** Notice **

The divide plug-in itself is only responsible for selecting the server instance to be distributed according to the selector, rules, and load balancing strategy, and does not directly initiate an HTTP request to the back-end service.

## Host probe

As mentioned above, divide needs to obtain the list of services. Take a look at the obtained implementation (UpstreamCacheManager # findUpstreamListBySelectorId):

```java
public List<DivideUpstream> findUpstreamListBySelectorId(final String selectorId) {
    return UPSTREAM_MAP_TEMP.get(selectorId);
}
```

The list of surviving services is obtained internally through the UPSTREAM _ MAP _ TEMP.

Two hash tables are maintained within the Upstream Cache Manager:

- UPSTREAM_MAP：

  The full service hash table is responsible for storing full upstream service information, where key is the selector ID, and value is the list of services using the same selector.

- UPSTREAM_MAP_TEMP：

  The temporary service hash table is responsible for storing the upstream service information of the activity, the key is the selector ID, and the value is the service list using the same selector.

In the previous chapters, we mentioned that the submit method updates the UPSTREAM _ MAP and UPSTREAM _ MAP _ TEMP at the same time during data synchronization, but how to maintain the UPSTREAM _ MAP \_ TEMP when the subsequent service is offline? Everything has to start with IP exploration.

#### 3.1 Opportunity of exploration

The time to explore is from the initialization of the Upstream Cache Manager:

```java
private UpstreamCacheManager() {
    // Health check switch check
  	boolean check = Boolean.parseBoolean(System.getProperty("soul.upstream.check", "false"));
    if (check) {
      	// Start scheduled health check task
        new ScheduledThreadPoolExecutor(1, SoulThreadFactory.create("scheduled-upstream-task", false))
                .scheduleWithFixedDelay(this::scheduled,
                        30, Integer.parseInt(System.getProperty("soul.upstream.scheduledTime", "30")), TimeUnit.SECONDS);
    }
}
```

When the Upstream Cache Manager is initialized, if the probe switch is turned on, the timed probe task will be created. Here, it is executed once every 30 seconds by default.

There are two configuration parameters involved here:

- Soul. Upstream. Check detection switch: default value is true, and if set to false, it means no detection
- Soul. Upstream. ScheduledTime detection interval, 10 seconds by default

#### 3.2. Exploration mission

1. Next, let's look at the implementation of the probe task (Upstream Cache Manager # scheduled):

```java
private void scheduled() {
    if (UPSTREAM_MAP.size() > 0) {
        UPSTREAM_MAP.forEach((k, v) -> {
          	// Perform health check
            List<DivideUpstream> result = check(v);
            if (result.size() > 0) {
                UPSTREAM_MAP_TEMP.put(k, result);
            } else {
                UPSTREAM_MAP_TEMP.remove(k);
            }
        });
    }
}
```

The task is responsible for traversing and registering the full service hash table one by one and checking the service activity:

- If the survival number is greater than 0, the survival service hash table is updated
- Otherwise, removing the corresponding content of the survival service hash table

2. Continue to see the service list liveness check process (Upstream Cache Manager # check):

```java
private List<DivideUpstream> check(final List<DivideUpstream> upstreamList) {
    List<DivideUpstream> resultList = Lists.newArrayListWithCapacity(upstreamList.size());
    for (DivideUpstream divideUpstream : upstreamList) {
        // Check service liveness
      	final boolean pass = UpstreamCheckUtils.checkUrl(divideUpstream.getUpstreamUrl());
        if (pass) {
          	// Update service status
            if (!divideUpstream.isStatus()) {
                divideUpstream.setTimestamp(System.currentTimeMillis());
                divideUpstream.setStatus(true);
                ...
            }
          	// Record surviving services
            resultList.add(divideUpstream);
        } else {
          	// Update service status
            divideUpstream.setStatus(false);
            ...
        }
    }
    return resultList;
}
```

It is responsible for traversing the service list, checking the activity of each service according to the URL and registering the surviving services.

#### 3.3 Activity check

1. Service liveness check implementation (Upstream CheckUtils # checkUrl):

```java
public static boolean checkUrl(final String url) {
    ...
    // Check if the URL is in IP + port format
    if (checkIP(url)) {
      	// Process IP and port
        String[] hostPort;
        if (url.startsWith(HTTP)) {
            final String[] http = StringUtils.split(url, "\\/\\/");
            hostPort = StringUtils.split(http[1], Constants.COLONS);
        } else {
            hostPort = StringUtils.split(url, Constants.COLONS);
        }
      	// Test if the host can be connected
        return isHostConnector(hostPort[0], Integer.parseInt(hostPort[1]));
    } else {
      	// Test if the host is reachable
        return isHostReachable(url);
    }
}
```

Check if the URL is in IP + port format:

- If it is in IP + port format, test whether the host can be connected
- Otherwise, test whether the host is reachable

2. Test whether the host is connectable (Upstream CheckUtils # isHostConnector):

```java
private static boolean isHostConnector(final String host, final int port) {
    try (Socket socket = new Socket()) {
        socket.connect(new InetSocketAddress(host, port));
    } catch (IOException e) {
        return false;
    }
    return true;
}
```

Test IP connectivity through socket connection.

3. Test whether the host is reachable (UpstreamCheckUtils # isHostReachable):

```java
private static boolean isHostReachable(final String host) {
    try {
        return InetAddress.getByName(host).isReachable(1000);
    } catch (IOException ignored) {
    }
    return false;
}
```

Non IP + port format URL Try to use domain name format to test if the host is reachable.

On the whole, the server information that the divide plug-in gets from the cache comes from data synchronization and is updated regularly and actively by the probe task.

## Load balancing

As mentioned above, divide selects the service IP for final distribution through the load balancing algorithm. Let's take a look at the implementation of load balancing (LoadBalan ceUtils # selector):

```java
public static DivideUpstream selector(final List<DivideUpstream> upstreamList, final String algorithm, final String ip) {
    LoadBalance loadBalance = ExtensionLoader.getExtensionLoader(LoadBalance.class).getJoin(algorithm);
    return loadBalance.select(upstreamList, ip);
}
```

Internally, the Extension Loader is used to implement the SPI mechanism, and then the corresponding load balancing algorithm is loaded through the algorithm name to execute the load balancing calculation and finally distribute to the service IP.

The soul gateway supports three load balancing strategies by default

- HASH (needs to be calculated, and there may be imbalance)
- RANDOM (simplest and fastest, almost average under a large number of requests)
- ROUND \_ ROBIN (need to record the status, which has a certain impact, and there is not much difference in the results between random and polling under large data volume)

The default is RANDOM random algorithm, and the algorithm processing is as follows (RandomLoadBalance # doSelect):

```java
public DivideUpstream doSelect(final List<DivideUpstream> upstreamList, final String ip) {
    int totalWeight = calculateTotalWeight(upstreamList);
    boolean sameWeight = isAllUpStreamSameWeight(upstreamList);
  	// If weights are inconsistent, randomize based on total weight
    if (totalWeight > 0 && !sameWeight) {
        return random(totalWeight, upstreamList);
    }
  	// Randomize based on the number of services
    return random(upstreamList);
}
```

Judging whether the weights of the services in the service list are consistent:

- If the weights are not consistent, they will be randomized according to the total weight
- Otherwise, random by number of services

Randomize details by total weight (RandomLoadBalance # random):

```java
private DivideUpstream random(final int totalWeight, final List<DivideUpstream> upstreamList) {
    // Generate a random number based on the total weight
    int offset = RANDOM.nextInt(totalWeight);
    // Determine which segment the random value falls into
    for (DivideUpstream divideUpstream : upstreamList) {
        offset -= getWeight(divideUpstream);
        if (offset < 0) {
            return divideUpstream;
        }
    }
    return upstreamList.get(0);
}
```

## Sum up

Processing flow of divide plug-in:

- Get a list of available services

  - The list of services originally came from `soul-admin` data synchronization
  - By default, the list of available services is actively updated every 30 seconds.

- Load balancing
  - Load balancing algorithm for loading target by extension loader
  - Execute a specific balancing strategy
  - Returns a final selection of service information
- Set the URL information of the final service
- To be processed downstream of the plug-in chain
