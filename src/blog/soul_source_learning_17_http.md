---
title: Soul Gateway Learning Http Request Adventure
author: baiyu
date: 2021-01-26
tag:
  - Soul
cover: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d89a3b45058846be94aa0b8935ec1868~tplv-k3u1fbpfcp-watermark.image
head:
  - - meta
    - name: Blog
---

# Review

In the Soul Request Processing Overview article, we learned that Soul handles requests in ** Excute of Default SoulPluginChain ** a library, where it executes a plug-in chain pattern to complete the request processing.

We have generally combed the injected ** plugins ** plug-ins, but even so, we still can't see the whole picture. For this reason, we have specially combed the classes involved in the soul plug-ins. The overall results are shown in the following figure.

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d9c8e69429e4cb1bcc5bd54ad4f6112~tplv-k3u1fbpfcp-watermark.image)

As you can see in the teasing article, the core classes are ** SoulPlugin、PluginEnum、PluginDataHandler、MetaDataSubscriber **. In the teasing request related article, we only need to focus on the SoulPlugin and PluginEnum classes at present.

Now that we have some understanding of the SoulPlugin class, what is the main purpose of the PluginEnum enumeration class?

PluginEnum: An enumeration class for plug-ins

| Property | Action                                                                 |
| -------- | ---------------------------------------------------------------------- |
| code     | The smaller the order of plug-in execution, the earlier the execution. |
| role     | The role has not found a physical reference address at this time       |
| name     | Plug-in name                                                           |

In fact, it is not difficult to find that the current ** Plugins for Default SoulPluginChain ** plug-in has a fixed order of execution, so where is the order of execution of this plug-in defined?

Finally, it can be traced back to the ** SoulConfiguration ** class.

```java
    public SoulWebHandler soulWebHandler(final ObjectProvider<List<SoulPlugin>> plugins) {
        // ...
        final List<SoulPlugin> soulPlugins = pluginList.stream()
               .sorted(Comparator.comparingInt(SoulPlugin::getOrder)).collect(Collectors.toList());
        return new SoulWebHandler(soulPlugins);
    }
```

Sort out the related references of the entire PluginEnum class, and sort out the following table. It is not difficult to see the order relationship ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d89a3b45058846be94aa0b8935ec1868~tplv-k3u1fbpfcp-watermark.image) between plug-ins.

| Level         | Action                                                                               |
| ------------- | ------------------------------------------------------------------------------------ |
| Level 1       | Only GlobalPlugin Global Plugin                                                      |
| Level 2 to 8  | It can be understood as a pre-processing plug-in before the request is initiated     |
| Level 9 to 11 | It can be understood as different call processing for the way of the caller.         |
| Level 12      | Only MonitorPlugin monitor plug-in                                                   |
| Level 13      | It is a response-related plug-in for processing the results returned by each caller. |

In the previous review, we have already understood the general process of soul processing requests.

- 1.GloBalPlugin performs global initialization
- 2.Some plug-ins process the request according to rules such as authentication, current limiting, and fusing
- 3.Select the calling mode suitable for you to assemble the parameters and initiate the call.
- 4.Monitor
- 5.Process the result of the call

# Request process sorting

> The following demo code screenshot is from the HTTP demo under soul-examples, and the interface address called is the http://127.0.0.1:9195/http/test/findByUserId?userId=10.

Bury the point in the ** Excute of Default SoulPluginChain ** method to see what classes an HTTP request call goes through?

```java
public Mono<Void> execute(final ServerWebExchange exchange) {
            return Mono.defer(() -> {
                if (this.index < plugins.size()) {
                    SoulPlugin plugin = plugins.get(this.index++);
                    Boolean skip = plugin.skip(exchange);
                    if (skip) {
                        System.out.println("Skipped plugin: "+plugin.getClass().getName().replace("org.dromara.soul.plugin.",""));
                        return this.execute(exchange);
                    }
                    System.out.println("Not skipped plugin: "+plugin.getClass().getName().replace("org.dromara.soul.plugin.",""));
                    return plugin.execute(exchange, this);
                }
                return Mono.empty();
            });
        }
```

The unskipped plug-ins for the final output are as follows:

Plug-ins that are not skipped are global. Global Plugin. <br>
Plug-ins that are not skipped are sign. SignPlugin. <br>
Plug-ins that are not skipped are WAF. WafPlugin. <br>
Plug-ins that are not skipped are ratelimiter. Rate LimiterPlugin. <br>
Plug-ins that are not skipped are hystrix. Hystrix Plugin. <br>
The plug-in that was not skipped was resilience4j.Resilience4JPlugin <br>
Plug-ins that are not skipped are divide. DividePlugin. <br>
Plug-ins that are not skipped are HTTP client. Web ClientPlugin. <br>
Plug-ins that are not skipped are Alibaba. Dubbo. Param. Body ParamPlugin. <br>
Plug-ins that are not skipped are monitor. MonitorPlugin. <br>
Plug-ins that are not skipped are HTTP client. Response. Web ClientResponsePlugin. <br>

> Here is a little puzzle, why this Alibaba. Dubbo. Param. BodyParamPlugin plug-in will be executed, temporarily ignored, and tracked later.

We found that the general flow of the plug-in executed by a gateway call for an HTTP request was consistent with our guess. <br>
For now, let's just pick the key points, namely ** GlobalPlugin、DividePlugin、WebClientPlugin、WebClientResponsePlugin **.

Initiate a Debug call to track the actions of each of the four plug-ins in turn.

## Global Plugin SoulContext Object Wrapper

The plug-in's excute method for GlobalPlugin looks like this

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
        final ServerHttpRequest request = exchange.getRequest();
        final HttpHeaders headers = request.getHeaders();
        final String upgrade = headers.getFirst("Upgrade");
        SoulContext soulContext;
        if (StringUtils.isBlank(upgrade) || !"websocket".equals(upgrade)) {
            soulContext = builder.build(exchange);
        } else {
            final MultiValueMap<String, String> queryParams = request.getQueryParams();
            soulContext = transformMap(queryParams);
        }
        exchange.getAttributes().put(Constants.CONTEXT, soulContext);
        return chain.execute(exchange);
    }
```

It is not difficult to see that the main purpose of the excute method of GlobalPlugin is to encapsulate an ** The SoulContext object ** exchange object and put it into the exchange (the exchange object is a shared object on the entire plug-in chain, and after a plug-in is executed, it is passed to the next plug-in. I understand it as a ThreadLocal-like object.

So what are the properties of the SoulContext object?

| property      | Meaning                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| module        | Each RPCType has a different value for the preceding address of the gateway call when HTTP is called.                                     |
| method        | Method name after cutting (when RpcType is HTTP)                                                                                          |
| rpcType       | RPC call types include Http, dubbo, sofa, and so on                                                                                       |
| httpMethod    | Http calls currently only support get, post,                                                                                              |
| sign          | Currently, we do not know the specific function of the authentication related attributes, which may be related to the SignPlugin plug-in. |
| timestamp     | Timestamp                                                                                                                                 |
| appKey        | Currently, we do not know the specific function of the authentication related attributes, which may be related to the SignPlugin plug-in. |
| path          | Path refers to the full path of the call to the soul Gateway (when RpcType is HTTP)                                                       |
| contextPath   | Consistent with module value (when RPCType is HTTP)                                                                                       |
| realUrl       | Consistent with the value of method (when RpcType is HTTP)                                                                                |
| dubboParams   | Parameters for dubbo?                                                                                                                     |
| startDateTime | The start time is suspected to be combined with the monitoring plug-in and the statistical indicator module.                              |

After executing the Global Plugin, the final encapsulated SoulContext object looks like this. ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d34d9e900a1e4448b8f15302db36a5bb~tplv-k3u1fbpfcp-watermark.image)

The parameter encapsulation of SoulContext of other RPCTypes can be traced by viewing the ** DefaultSoulContext Builder build ** method. Since this article mainly traces HTTP calls, it is not redundant to discuss here.

## DividePlugin Routing Plugin

After the GlobalPlugin plug-in is executed, it is finally packaged into one ** The SoulContext object ** and placed in ** ServerWebExchange ** for use by the downstream call chain.

Next, let's take a look ** Divide Plugin ** at what kind of role it plays in the whole chain call process?

### AbstractSoulPlugin

By tracing back to the source code ** The DividePlugin plug-in inherits from the AbstractSoulPlugin class, which implements the SoulPlugin interface **.

So ** AbstractSoulPlugin ** what extensions have been made? Let's tease out the methods of this class.

| method               | Action                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| excute               | Implemented in the SoulPlugin interface, plays a role ** The role of the template approach ** in AbstractSoulPlugin |
| doexcute             | Implemented ** Abstract method ** by various subclasses                                                             |
| matchSelector        | Match selector                                                                                                      |
| filterSelector       | Filter selector                                                                                                     |
| matchRule            | Matching rules                                                                                                      |
| filterRule           | Filter rules                                                                                                        |
| handleSelectorIsNull | Handle null selector case                                                                                           |
| handleRuleIsNull     | Handle null rule case                                                                                               |
| selectorLog          | Selector log printing                                                                                               |
| ruleLog              | Rule log printing                                                                                                   |

Look at ** excute ** the specific function of the method.

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
        String pluginName = named();
        // Obtain corresponding plugin
        final PluginData pluginData = BaseDataCache.getInstance().obtainPluginData(pluginName);
        // Check if the plugin is enabled
        if (pluginData != null && pluginData.getEnabled()) {
            // Obtain all selectors under the plugin
            final Collection<SelectorData> selectors = BaseDataCache.getInstance().obtainSelectorData(pluginName);
            if (CollectionUtils.isEmpty(selectors)) {
                return handleSelectorIsNull(pluginName, exchange, chain);
            }
            // Match selector
            final SelectorData selectorData = matchSelector(exchange, selectors);
            if (Objects.isNull(selectorData)) {
                return handleSelectorIsNull(pluginName, exchange, chain);
            }
            // Log selector
            selectorLog(selectorData, pluginName);
            final List<RuleData> rules = BaseDataCache.getInstance().obtainRuleData(selectorData.getId());
            if (CollectionUtils.isEmpty(rules)) {
                return handleRuleIsNull(pluginName, exchange, chain);
            }
            RuleData rule;
            if (selectorData.getType() == SelectorTypeEnum.FULL_FLOW.getCode()) {
                rule = rules.get(rules.size() - 1);
            } else {
                // Match rule
                rule = matchRule(exchange, rules);
            }
            if (Objects.isNull(rule)) {
                return handleRu![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f523f655f0014d288b7a4502cc6a08d1~tplv-k3u1fbpfcp-watermark.image)leIsNull(pluginName, exchange, chain);
            }
            // Log rule
            ruleLog(rule, pluginName);
            // Execute subclass-specific implementation
            return doExecute(exchange, chain, selectorData, rule);
        }
        return chain.execute(exchange);
    }
```

The final flow chart is as follows: ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1ec8bd02d6546c79a96d67535049aae~tplv-k3u1fbpfcp-watermark.image)

PS: In the above flow chart, there is no specific method-level processing.

However, there are still several points that need to be explained:

- 1.The plug-in data, selector data, and rule data are all obtained from ** BaseDataCache **. This class is the class that will be affected in the data synchronization process.
- 2.Selector type. When the SpringMvc project is used to register an interface, an isFull option will be set to true to represent the global proxy. In the global proxy mode, only one selector \ rule (referring to all interfaces of the proxy) will be registered, so the corresponding processing here is rule. Size () -1.
- 3.For the selection of selector and rule, the actual processing is much more complicated. Considering that it is to introduce the general logic of a request process, it will not be elaborated here. If you are interested, you can check it ** Match Strategy, AbstractMatchStrategy and their related implementation classes ** (a separate article will be explained later). The corresponding page here is as follows: ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f624b13f205a44e29b2799718433e0c9~tplv-k3u1fbpfcp-watermark.image)![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f590c2cf336442f08a52b864c81d41a8~tplv-k3u1fbpfcp-watermark.image)

To sort out ** Exeute method of AbstractSoulPlugin ** the function, after the guidance of the above flow chart, we already know that the function of this method is to select the plug-in -- > select the selector -- > select the rule, and finally hand over to the method of the ** doexcute ** subclass.

Next, let's take a ** The doexcute of DividePlugin ** look at what the method does.

### DividePlugin

```java
protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // Obtain rule handling data
        final DivideRuleHandle ruleHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), DivideRuleHandle.class);
        // Obtain injected addresses under this selector
        final List<DivideUpstream> upstreamList = UpstreamCacheManager.getInstance().findUpstreamListBySelectorId(selector.getId());
        if (CollectionUtils.isEmpty(upstreamList)) {
            log.error("divide upstream configuration error： {}", rule.toString());
            Object error = SoulResultWrap.error(SoulResultEnum.CANNOT_FIND_URL.getCode(), SoulResultEnum.CANNOT_FIND_URL.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        final String ip = Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress();
        // Choose an address based on the load balancing strategy corresponding to the rule
        DivideUpstream divideUpstream = LoadBalanceUtils.selector(upstreamList, ruleHandle.getLoadBalance(), ip);
        if (Objects.isNull(divideUpstream)) {
            log.error("divide has no upstream");
            Object error = SoulResultWrap.error(SoulResultEnum.CANNOT_FIND_URL.getCode(), SoulResultEnum.CANNOT_FIND_URL.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // set the http url
        String domain = buildDomain(divideUpstream);
        // Assemble the real calling address
        String realURL = buildRealURL(domain, soulContext, exchange);
        exchange.getAttributes().put(Constants.HTTP_URL, realURL);
        // Set timeout and retry count
        exchange.getAttributes().put(Constants.HTTP_TIME_OUT, ruleHandle.getTimeout());
        exchange.getAttributes().put(Constants.HTTP_RETRY, ruleHandle.getRetry());
        return chain.execute(exchange);
    }
```

After the above code is sorted out, the general logic is as follows:

- 1.Obtain the registration address corresponding to the selector, and the corresponding page data is as follows ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bea039b5c98040ee80433f785dac85aa~tplv-k3u1fbpfcp-watermark.image)
- 2.Obtain the load balancing policy according to the handle field of the rule, and select the real call address (** LoadBalanceUtils **), retry times and timeout time. The corresponding page data is as follows. ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07db1f8f76fc43b2aec61ee0f9ca4c05~tplv-k3u1fbpfcp-watermark.image)
- 3.The real call address, timeout, and number of retries are passed to ** ServerWebExchange ** for use by the downstream call chain. Demo of debug: ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aa5f7d95f2942169b33029f074f1712~tplv-k3u1fbpfcp-watermark.image) PS: We don't see where the parameters are in the above theme logic? Where is this parameter encapsulated? The answer ** In the build RealURL method ** is obtained from ** exchange ** the context.

## Web ClientPlugin Http request calling plug-in

Next, let's look at how Soul initiates the request call.

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // Obtain the real address
        String urlPath = exchange.getAttribute(Constants.HTTP_URL);
        if (StringUtils.isEmpty(urlPath)) {
            Object error = SoulResultWrap.error(SoulResultEnum.CANNOT_FIND_URL.getCode(), SoulResultEnum.CANNOT_FIND_URL.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // Obtain the timeout period
        long timeout = (long) Optional.ofNullable(exchange.getAttribute(Constants.HTTP_TIME_OUT)).orElse(3000L);
        // Obtain the retry count
        int retryTimes = (int) Optional.ofNullable(exchange.getAttribute(Constants.HTTP_RETRY)).orElse(0);
        log.info("The request urlPath is {}, retryTimes is {}", urlPath, retryTimes);
        HttpMethod method = HttpMethod.valueOf(exchange.getRequest().getMethodValue());
        WebClient.RequestBodySpec requestBodySpec = webClient.method(method).uri(urlPath);
        return handleRequestBody(requestBodySpec, exchange, timeout, retryTimes, chain);
    }
```

In the web Client ** excute ** method, three things are done

- 1.Take out the properties you put into exchange from the Divide plugin. ** Real address of the call, timeout, number of retries **.
- 2.Encapsulates an ** RequestBodySpec ** object (something that doesn't recognize responsive programming)
- 3.A ** handleRequestBody ** method was called

Know ** handleRequestBody ** the method first

```java
private Mono<Void> handleRequestBody(final WebClient.RequestBodySpec requestBodySpec,
                                         final ServerWebExchange exchange,
                                         final long timeout,
                                         final int retryTimes,
                                         final SoulPluginChain chain) {
        return requestBodySpec.headers(httpHeaders -> {
            httpHeaders.addAll(exchange.getRequest().getHeaders());
            httpHeaders.remove(HttpHeaders.HOST);
        })
                .contentType(buildMediaType(exchange))
                .body(BodyInserters.fromDataBuffers(exchange.getRequest().getBody()))
                .exchange()
                // Log on failure
                .doOnError(e -> log.error(e.getMessage()))
                // Set timeout
                .timeout(Duration.ofMillis(timeout))
                // Set request retry strategy
                .retryWhen(Retry.onlyIf(x -> x.exception() instanceof ConnectTimeoutException)
                    .retryMax(retryTimes)
                    .backoff(Backoff.exponential(Duration.ofMillis(200), Duration.ofSeconds(20), 2, true)))
                // Handle after request completes
                .flatMap(e -> doNext(e, exchange, chain));

    }
```

In this method, it can be generally understood as

- The request header from exchange is placed in the request header for this call.
- Set the contentType
- Set the timeout
- Set the failure response
- Set the retry scenario and retry times
- Processing of final results. Need to see another one ** The doNext method ** in the process

The general logic is to determine whether the request is successful or not, and put the result of the request into exchange for the downstream plug-in to process.

```java
private Mono<Void> doNext(final ClientResponse res, final ServerWebExchange exchange, final SoulPluginChain chain) {
        if (res.statusCode().is2xxSuccessful()) {
            exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
        } else {
            exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.ERROR.getName());
        }
        exchange.getAttributes().put(Constants.CLIENT_RESPONSE_ATTR, res);
        return chain.execute(exchange);
    }
```

PS: Although we don't understand responsive programming, it doesn't affect us to read the code.

## Web ClientResponsePlugin Http Result Processing Plug-in

The excute method of this implementation has no core logic, which is to judge the status code of the request and return different data formats to the front end according to the status code.

```java
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
        return chain.execute(exchange).then(Mono.defer(() -> {
            ServerHttpResponse response = exchange.getResponse();
            ClientResponse clientResponse = exchange.getAttribute(Constants.CLIENT_RESPONSE_ATTR);
            if (Objects.isNull(clientResponse)
                    || response.getStatusCode() == HttpStatus.BAD_GATEWAY
                    || response.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
                Object error = SoulResultWrap.error(SoulResultEnum.SERVICE_RESULT_ERROR.getCode(), SoulResultEnum.SERVICE_RESULT_ERROR.getMsg(), null);
                return WebFluxResultUtils.result(exchange, error);
            }
            if (response.getStatusCode() == HttpStatus.GATEWAY_TIMEOUT) {
                Object error = SoulResultWrap.error(SoulResultEnum.SERVICE_TIMEOUT.getCode(), SoulResultEnum.SERVICE_TIMEOUT.getMsg(), null);
                return WebFluxResultUtils.result(exchange, error);
            }
            response.setStatusCode(clientResponse.statusCode());
            response.getCookies().putAll(clientResponse.cookies());
            response.getHeaders().putAll(clientResponse.headers().asHttpHeaders());
            return response.writeWith(clientResponse.body(BodyExtractors.toDataBuffers()));
        }));
    }
```

# Sum up

At this point, an Http request call based on the Soul gateway is largely over.

Combing HTTP request call flow

- Global Plugin encapsulates the Soul Context object
- The front plug-in handles operations such as fusing and current-limiting authentication.
- The Divide plug-in selects the real address of the corresponding call, the number of retries, and the timeout period.
- The Web Client plug-in makes the actual Http call
- The Web ClientResponse plug-in processes the corresponding result and returns to the foreground.

Based on the general flow of Http calls, we can roughly guess that the flow based on other RPC calls is to replace the plug-in that initiates the request and the plug-in that returns the result processing.

In the above, we also mentioned the selection ** LoadBalanceUtils ** of routing rules, selectors and the processing ** MatchStrategy ** of rules.

After that, a new chapter will be opened to unveil the mystery of RPC generalization call, routing, selector and rule matching step by step.
