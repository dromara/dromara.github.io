---
title: Soul Gateway Learning Sentinel Plugin
author: luoxiaolong
date: 2021-03-19
tag:
  - Soul
cover: /assets/img/blog6/02.jpg
head:
  - - meta
    - name: Blog
---

# Overview

Fuse and flow control are very necessary functions in the service gateway. The soul uses different mature components to implement this part of the function, and users can choose according to their preferences. This article will introduce how to use the Sentinel component of Ali to realize the fuse and flow control functions in soul. This article will first introduce the scenario and significance of fuse and flow control. It then describes how to configure the use of the sentinel plug-in for flow control and fusing on the soul. Finally, it briefly analyzes how soul uses the Sentinel component from the source code level.

# Fuse and flow control

## Scene description

As the entrance of the traffic, the service gateway has the responsibility to protect the subsequent services. The following two scenarios that are seriously harmful to services are often encountered in production, and they are also issues that business gateways must pay attention to. One situation is that during large-scale promotions such as Double 11 or Double 12, the request volume of the interface is several times higher than usual. If the capacity is not well evaluated, this surge of requests can easily lead to the complete unavailability of the entire service. This kind of downtime is often caused not by loopholes in business logic, but by too many requests and insufficient resources. Another situation is that there are some core services in the whole service system, and multiple business processes depend on this service. However, all services have unstable processing or service damage, resulting in long request processing time or frequent exceptions. Excluding the case of business BUG, it may be a sudden and very random block. Generally, it will be automatically repaired if the request volume is slowed down, but if it is not protected, there will be a domino effect that causes the entire service to be unavailable. This scenario is slightly different from the first scenario, in which the actual traffic does have an unmanageable peak, while the second scenario mainly considers the chain reaction caused by the inevitable and unpredictable jitter of the service itself.

## Flow control

For the first scenario, our usual practice is to carry out flow control. The core idea is that the service gateway ensures that the number of requests to the back is the amount that the service can bear. The redundant requests are directly rejected or added to the waiting queue to ensure that the service will not be suspended, and most of the requests can still be processed normally. When considering the strategy of flow control, we should mainly consider the following questions:

1. By what angle is the flow controlled?
2. What is the threshold?
3. What is the flow control strategy?

For the first problem, the normal idea is to monitor traffic through QPS, that is, flow control when the number of requests per second exceeds a certain limit. But in fact, there is another way to monitor traffic from the number of concurrency. This control scenario is also very meaningful. For example, when the downstream application causes service instability and response delay increase for some reason, it means that the throughput of the gateway decreases and more threads are occupied. In extreme cases, it even leads to the exhaustion of the thread pool. In a sense, flow control through concurrency can protect the gateway service itself to a certain extent. For the second question, the threshold is easy to understand, which is the boundary of triggering flow control. If we consider from QPS, it is how many times per second to start flow control. If we consider from the number of concurrency, it is how many times the number of threads requesting context exceeds. For the third problem, we generally have the following three solutions:

1. Reject directly. This strategy is well understood as rejecting the service directly when the QPS is above the threshold without transmitting the request to a subsequent service.
2. This strategy is aimed at the scenario that when the system is in a low water level for a long time, there may be a sudden increase in flow, and directly pulling the system to a high water level may instantly crush the system. The way to start preheating is to slowly increase the threshold, gradually increase the threshold within a certain period of time until it reaches the setting, and give the cold system a preheating time to avoid the cold system being crushed. Requests that exceed the threshold are also rejected.
3. Queuing at a constant speed. The core idea of this strategy is to let requests pass at fixed intervals. When a request comes, if the time interval between the current request and the last passed request is not less than a preset value, the current request is passed; Otherwise, the expected passing time of the current request is calculated. If the expected passing time of the request is less than the timeout time preset by the rule, the request will wait until the preset time comes (queuing for processing). If the expected passage time exceeds the maximum queuing time, the request will be rejected directly.

## Fuse

For the second scenario, the usual way to deal with it is to set the service fuse. Simply put, when a service we detect is abnormal, we will not access it so as not to cause more pressure on it by more requests. After a period of time, if the service is detected to be restored, the traffic will be sent back. We first need to determine whether the service is unstable or jittery. Then think about what we should do if we find a service that is shaking. How to judge whether the service is back to normal. We can generally judge whether the service is unstable in the following three ways.

1. Slow call proportion: when the number of requests in the unit statistical time is greater than the set minimum number of requests, and the request exceeding the maximum tolerance time is greater than the threshold, it is judged that the service is abnormal, and the fuse is triggered;
2. Abnormal proportion: when the proportion of abnormal requests in the unit statistical time is greater than the threshold, we determine that the service is abnormal and trigger the fuse;
3. Abnormal number: when the number of abnormal requests in unit time reaches the threshold, it is determined that the service is abnormal, and the fuse is triggered;

When we judge that the service is abnormal through the above three indicators and fuse the service, we can choose to report an error directly for the request within a certain period of time (within the fuse duration), without blocking the upstream service, and let the requester decide how to deal with it. Or directly trigger service degradation. Service degradation can be roughly understood as requesting a simplified version of this business, which omits many non-core processes and only ultimately ensures that the process is processed (ultimately consistent). Like a real circuit breaker, a service circuit breaker will automatically recover. Generally, after the fuse is triggered, the service is in the fuse state for a period of time and does not provide services, and then it enters the half-open state. If the following small number of requests do not report errors and the response time is reasonable, the service is restored. If it is still abnormal, it continues to fuse.

# Sentinel plugin in soul

Sentinel is Alibaba's open source traffic control component for distributed service architecture, which mainly takes traffic as the starting point to help you ensure the stability of microservices from multiple dimensions such as traffic control, fuse degradation, and system adaptive protection. Soul, as an excellent open source gateway in China, integrates Sentinel into its own system as a plug-in, so that users can use the flow control and service fuse functions provided by Sentinel through simple configuration. The following is a brief description of how to configure the use of the sentinel plug-in in soul.

First, log in to the soul management platform and configure the plug-in in the "plug-in list" -- > "sentinel". The configuration of "Selector" is not the focus of this article and will not be introduced. Click "Add Rules" to make specific settings, as shown in the following figure.

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-02.png)

In this configuration page, "Name", "Matching Mode", "Condition", "Log Printing", and "Whether to Enable" and "Execution Order" are general configurations of the soul plug-in and will not be described here. What we need to focus on is the configuration items in "processing". These configuration items can be divided into two groups. The first four options are about fuse configuration, and the last four options are about flow control configuration. In soul, we can set the flow control and fuse policy for a group of requests at the same time. Next, we will focus on how to use each configuration item.

## Fuse

First of all, let's look at the configuration related to the fuse. It has four configuration items: "fuse threshold", "whether to open the fuse", "fuse window size" and the unnamed service exception judgment method. Fuse switch indicates whether to open the fuse (1 open \ 0 not open). The fuse window size refers to the number of seconds after triggering the fuse to enter the half-open state. In the half-open state, if the request is normal, it will enter the normal state. If the request is still abnormal, it will continue to fuse. The fusing judgment mode and fusing threshold need to be combined. In soul, three service exception determination methods of sentinel are used. They are:

1. Slow call percentage. In this mode, the threshold is the number of milliseconds that are determined to be slow calls. The ratio of slow call is 1 by default and cannot be changed, that is, the fuse will be triggered if the threshold is exceeded within the unit statistical time. This mode is the default mode for sentinel.
2. Exception proportion, in this mode, the threshold refers to the upper limit of the proportion of exception requests in the unit statistical time, and a number of [0.0, 1.0] needs to be filled in, indicating 0% -100%
3. Exception number policy. In this mode, the threshold refers to the upper limit of the number of exception requests per unit of statistical time.

It should be noted that soul uses the default parameters of sentinel for the unit statistics duration (statIntervalMs) and the minimum number of fusing requests (minRequestAmount). One second and five times respectively. The unit duration specifies the exception judgment, with 1 second as the statistical range, and the next second starts counting again. The minimum number of requests means that if the number of requests is less than 5 in 1 second, the fuse will not be triggered even if the threshold is reached.

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-03.png)

The configuration as shown in the figure above means that the fuse configuration is turned on. If 5 requests of this service are abnormal within 1 second, the fuse will be turned on for 10 seconds. After 10 seconds, the service will enter the half-open state. If the requests are normal, the service will become normal. If the requests are still abnormal, the fuse will continue to be turned on. If the service is requested during the fuse period, the soul gateway will directly return the request error, and the protection back-end service will not receive the request again.

## Flow control

There are five configurations related to flow control, which are "flow control effect", "current limit threshold", "flow control switch" and "current limit threshold type" from top to bottom and from left to right. The first is the type of throttling. We can choose "QPS" or "Number of concurrent threads". This parameter specifies from which angle we set the threshold of throttling. The threshold is the upper limit of the QPS or the number of threads, and the throttling policy is initiated when this threshold is reached. The specific current limiting strategy is configured in "flow control effect". In the flow control strategy, we can select "direct rejection", "warm up", "uniform queuing" and "warm up + uniform queuing". Direct rejection is better understood, that is, after the number of QPS or threads reaches the threshold, redundant requests are returned directly with errors. Warm-up means that the threshold gradually increases to the specified threshold within 10 seconds, that is, the threshold for the first 2-3 seconds is lower than the set threshold, but the threshold is gradually increased and reaches the specified threshold after 10 seconds, so that the system can have a warm-up process. If the request exceeds the threshold, the soul gateway will report an error and return directly. The uniform queue mode will strictly control the time interval of each request. If the flow control type is QPS and the threshold is 10, soul will control to transmit one request to the back-end service every 100ms. The extra requests will enter the waiting queue first, and each request will wait for 500ms at most. If the estimated waiting time of the request exceeds 500ms, it will report an error and return directly. It should be noted that if the flow limit type is the number of concurrent threads, then the flow control effect can only be "direct rejection". As shown in the figure below, this configuration indicates that the soul gateway will ensure that the QPS of this service does not exceed 10, and redundant requests will report errors directly.

![](https://rfc2616.oss-cn-beijing.aliyuncs.com/blog/soul16-04.png)

It should be noted that the Sentinel component runs independently in each gateway of the soul. If the gateway is a cluster, the amount actually transmitted to the following services needs to be multiplied by the number of soul gateway services during flow control. That is, if our soul gateway deploys three nodes, all requests are evenly distributed to each node through nginx. The flow control configured for one interface is 10 qps, so the actual QPS to be processed by the backward service is 10 \ \* 3. Fuse also needs to consider this situation, only when a service on three nodes triggers a fuse, then the service will not receive any more requests.

# Sentinel Plugin Source Code Reading

The source code of Sentinel plug-in in soul mainly includes three parts, "Sentinel Rule Handle" is responsible for processing the processing logic when the Sentinel rule is synchronized from the management node, and "Sentine lPlugin" the processing logic of the plug-in ". "SentinelFallback Handler" for the processing logic that triggered the flow control or fuse. ". Let me take a look at them one by one. First is "Sentine lRuleHandle" ", the source code is as follows:

```java
public class SentinelRuleHandle implements PluginDataHandler {

    @Override
    public void handlerRule(final RuleData ruleData) {
        // Process new sentinel configuration
        SentinelHandle sentinelHandle = GsonUtils.getInstance().fromJson(ruleData.getHandle(), SentinelHandle.class);
        sentinelHandle.checkData(sentinelHandle);
        // Get all existing flow control configurations and delete configurations with the same resourceName as the new configuration
        List<FlowRule> flowRules = FlowRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList());
        if (sentinelHandle.getFlowRuleEnable() == Constants.SENTINEL_ENABLE_FLOW_RULE) {
            // If flow control is enabled
            // Set sentinel flow control rules based on the configuration
            FlowRule rule = new FlowRule(getResourceName(ruleData));
            // Set threshold
            rule.setCount(sentinelHandle.getFlowRuleCount());
            // Flow control mode: QPS or thread
            rule.setGrade(sentinelHandle.getFlowRuleGrade());
            // Flow control behavior: 0. default(reject directly), 1. warm up, 2. rate limiter, 3. warm up + rate limiter
            rule.setControlBehavior(sentinelHandle.getFlowRuleControlBehavior());
            flowRules.add(rule);
        }
        // Update all flow control configurations
        FlowRuleManager.loadRules(flowRules);
        // Get all existing circuit breaker configurations and delete configurations with the same resourceName as the new configuration
        List<DegradeRule> degradeRules = DegradeRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList());
        if (sentinelHandle.getDegradeRuleEnable() == Constants.SENTINEL_ENABLE_DEGRADE_RULE) {
            // If circuit breaker is enabled
            // Set sentinel circuit breaker rules based on the configuration
            DegradeRule rule = new DegradeRule(getResourceName(ruleData));
            // Set circuit breaker threshold
            rule.setCount(sentinelHandle.getDegradeRuleCount());
            // Basis for circuit breaker judgment 0: average RT, 1: exception ratio, 2: exception count
            rule.setGrade(sentinelHandle.getDegradeRuleGrade());
            // Circuit breaker time window
            rule.setTimeWindow(sentinelHandle.getDegradeRuleTimeWindow());
            degradeRules.add(rule);
        }
        // Update all circuit breaker configurations
        DegradeRuleManager.loadRules(degradeRules);
    }

    @Override
    public void removeRule(final RuleData ruleData) {
        // Remove specified rule
        FlowRuleManager.loadRules(FlowRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList()));
        DegradeRuleManager.loadRules(DegradeRuleManager.getRules()
                .stream()
                .filter(r -> !r.getResource().equals(getResourceName(ruleData)))
                .collect(Collectors.toList()));
    }

    @Override
    public String pluginNamed() {
        return PluginEnum.SENTINEL.getName();
    }

    /**
     * return sentinel resource name.
     *
     * @param ruleData ruleData
     * @return string string
     */
    public static String getResourceName(final RuleData ruleData) {
        return ruleData.getSelectorId() + "_" + ruleData.getName();
    }

}
```

The Sentine lPlugin "of the plug-in execution logic code is as follow

```java
public class SentinelPlugin extends AbstractSoulPlugin {
    // Handler for exception handling
    private final SentinelFallbackHandler sentinelFallbackHandler;

    public SentinelPlugin(final SentinelFallbackHandler sentinelFallbackHandler) {
        this.sentinelFallbackHandler = sentinelFallbackHandler;
    }

    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // Generate sentinel resource name from plugin configuration, which corresponds to one flow control or circuit breaker strategy
        String resourceName = SentinelRuleHandle.getResourceName(rule);
        // Verify sentinel plugin's configuration information
        SentinelHandle sentinelHandle = GsonUtils.getInstance().fromJson(rule.getHandle(), SentinelHandle.class);
        sentinelHandle.checkData(sentinelHandle);
        // Introduce Sentinel's official Transformer and delegate the request to Sentinel for handling
        return chain.execute(exchange).transform(new SentinelReactorTransformer<>(resourceName))
                .doOnSuccess(v -> {
                    HttpStatus status = exchange.getResponse().getStatusCode();
                    if (status == null || !status.is2xxSuccessful()) {
                        exchange.getResponse().setStatusCode(null);
                        throw new SentinelFallbackException(status == null ? HttpStatus.INTERNAL_SERVER_ERROR : status);
                    }
                })
                //If Sentinel triggers flow control or circuit breaker and causes an error, call sentinelFallbackHandler to return an error message
                .onErrorResume(throwable -> sentinelFallbackHandler.fallback(exchange, UriUtils.createUri(sentinelHandle.getFallbackUri()), throwable));
    }
    // Plugin name: sentinel
    @Override
    public String named() {
        return PluginEnum.SENTINEL.getName();
    }
    // Order: 45
    @Override
    public int getOrder() {
        return PluginEnum.SENTINEL.getCode();
    }

    public static class SentinelFallbackException extends HttpStatusCodeException {
        public SentinelFallbackException(final HttpStatus statusCode) {
            super(statusCode);
        }
    }
}
```

Exception handling is Sentine lFallbackHandler ". In the soul, whether it is the processing of the request after the fuse or the request under flow control, the soul will directly return an error

```java
public class SentinelFallbackHandler implements FallbackHandler {

    @Override
    public Mono<Void> generateError(final ServerWebExchange exchange, final Throwable throwable) {
        Object error;

        if (throwable instanceof DegradeException) {
            // Circuit breaker triggered
            // Set HTTP status to 500
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            // Set request body
            error = SoulResultWrap.error(SoulResultEnum.SERVICE_RESULT_ERROR.getCode(), SoulResultEnum.SERVICE_RESULT_ERROR.getMsg(), null);
        } else if (throwable instanceof FlowException) {
            // Flow control error, indicating that the client should retry
            //  Set HTTP status to 429
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            // Set request body
            error = SoulResultWrap.error(SoulResultEnum.TOO_MANY_REQUESTS.getCode(), SoulResultEnum.TOO_MANY_REQUESTS.getMsg(), null);
        } else if (throwable instanceof BlockException) {
            // Parent class of FlowException, indicating that the service is blocked
            // Set HTTP status to 429
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            // Set request body
            error = SoulResultWrap.error(SoulResultEnum.SENTINEL_BLOCK_ERROR.getCode(), SoulResultEnum.SENTINEL_BLOCK_ERROR.getMsg(), null);
        } else {
            return Mono.error(throwable);
        }
        return WebFluxResultUtils.result(exchange, error);
    }
}
```

# Sum up

The soul gateway encapsulates an excellent flow control component, sentinel, which provides users with easy-to-use flow control and fuse functions. It should be noted that when soul uses sentinel, some parameters are configured by default. If there is a need to modify, you need to adjust the source code by yourself. Secondly, the soul gateway can be deployed in a distributed manner, but distributed flow control is not used when sentinel is used, and the flow control of each soul gateway node for the same resource is independent but identical.
