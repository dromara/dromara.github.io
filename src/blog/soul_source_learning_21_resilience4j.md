---
title: Soul Gateway Learning Resilience4j Plugin
author: yanbing
tag:
  - Soul
date: 2021-03-22
cover: /assets/img/blog6/03.jpg
head:
  - - meta
    - name: Blog
---

## Aim

- What is Resilience4J?
- Resilience 4j experience with soul
  - Current-limiting
  - Fuse
- Interpretation of Resilience4J Plug-in Source Code

## What is Resilience4j?

- Resilience4J is the recommended fault tolerance scheme of Spring Cloud Gateway. It is a lightweight fault tolerance library.
- It borrows from Hystrix and uses JDK8 functional programming, namely lambda expressions.
- In contrast, Netflix Hystrix has a compilation dependency on Archaius. Resilience4j You don't need to reference all the dependencies. You can reference the relevant modules according to the functions you need. Hystrix will not be updated. Spring offers an alternative to Netflix Hystrix, namely Resilence4J
- Resilience4J provides a range of usability features that enhance microservices:

  - Circuit Breaker
  - Rate Limiter
  - Isolation based on semaphore
  - Cache
  - Time limiter
  - Request to restart Retry

- Official Dependency Package

```Java
    <dependency>
           <groupId>io.github.resilience4j</groupId>
           <artifactId>resilience4j-circuitbreaker</artifactId>
           <version>${resilience.version}</version>
    </dependency>
```

## Resilience 4j experience with soul

- First, open Resilience4j ![](https://img-blog.csdnimg.cn/20210321112151395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODY5MjQz,size_16,color_FFFFFF,t_70) in the soul-admin console plug-in management.

- Add dependency in soul gateway

```Java
      <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>soul-spring-boot-starter-plugin-ratelimiter</artifactId>
           <version>${project.version}</version>
       </dependency>
```

- Start three services, a soul-admin, a soul-bootstrap, and a soul-examples-http

- Find Resilience4j in the plug-in list on the soul-admin console and customize the configuration, as shown in the following figure. ![](https://img-blog.csdnimg.cn/20210321112202189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODY5MjQz,size_16,color_FFFFFF,t_70)

- [ Introduction to the configuration of soul official website ](https://dromara.org/zh/projects/soul/resilience4j-plugin/)

```
* Resilience4j Processing in Detail:

	* timeoutDurationRate：Timeout for waiting to acquire tokens, in milliseconds, default value: 5000.

	* limitRefreshPeriod：Time interval for refreshing tokens, in milliseconds, default value: 500.

	* limitForPeriod：Number of tokens refreshed each time, default value: 50.

	* circuitEnable：Whether to enable circuit breaker, 0: off, 1: on, default value: 0.

	* timeoutDuration：Timeout for circuit breaker, in milliseconds, default value: 30000.

	* fallbackUri：URI for fallback handling.

	* slidingWindowSize：Size of the sliding window, default value: 100.

	* slidingWindowType：Type of the sliding window, 0: based on count, 1: based on time, default value: 0.

	* minimumNumberOfCalls：Minimum number of requests to trigger circuit breaker, circuit breaker statistics will be calculated only if this threshold is exceeded, default value: 100.

	* waitIntervalFunctionInOpenState：Duration for which the circuit breaker remains open, in milliseconds, default value: 10.

	* permittedNumberOfCallsInHalfOpenState：Size of the circular buffer in the half-open state, circuit breaker calculation will be performed only if this number is reached, default value: 10.

	* failureRateThreshold：Percentage of error rate, circuit breaker will only open if this threshold is reached, default value: 50.

	* automaticTransitionFromOpenToHalfOpenEnabled：Whether to automatically transition from open state to half-open state, true: yes, false: no, default value: false.
```

### Current-limiting

- The parameter configuration is checked as follows. If the parameter value is less than the default value, the default value will be directly assigned, so it is convenient to directly modify the configuration of the source code for testing the effect: the number of tokens refreshed each time is 2, the time interval for refreshing tokens is 1 s, and the timeout time is 1 s.

```java
    /**
     * check filed default value.
     *
     * @param resilience4JHandle {@linkplain Resilience4JHandle}
     * @return {@linkplain Resilience4JHandle}
     */
    public Resilience4JHandle checkData(final Resilience4JHandle resilience4JHandle) {
        resilience4JHandle.setTimeoutDurationRate(Math.max(resilience4JHandle.getTimeoutDurationRate(), Constants.TIMEOUT_DURATION_RATE));
		   //resilience4JHandle.setLimitRefreshPeriod(Math.max(resilience4JHandle.getLimitRefreshPeriod(), Constants.LIMIT_REFRESH_PERIOD));
		   //resilience4JHandle.setLimitForPeriod(Math.max(resilience4JHandle.getLimitForPeriod(), Constants.LIMIT_FOR_PERIOD));
        // Set the number of tokens refreshed each time to 2, and the time interval for refreshing tokens to 1 second
        resilience4JHandle.setLimitRefreshPeriod(1000);
        resilience4JHandle.setLimitForPeriod(2);
        resilience4JHandle.setTimeoutDuration(1000);
        resilience4JHandle.setCircuitEnable(Math.max(resilience4JHandle.getCircuitEnable(), Constants.CIRCUIT_ENABLE));
		   //resilience4JHandle.setTimeoutDuration(Math.max(resilience4JHandle.getTimeoutDuration(), Constants.TIMEOUT_DURATION));
        resilience4JHandle.setFallbackUri(!"0".equals(resilience4JHandle.getFallbackUri()) ? resilience4JHandle.getFallbackUri() : "");
        resilience4JHandle.setSlidingWindowSize(Math.max(resilience4JHandle.getSlidingWindowSize(), Constants.SLIDING_WINDOW_SIZE));
        resilience4JHandle.setSlidingWindowType(Math.max(resilience4JHandle.getSlidingWindowType(), Constants.SLIDING_WINDOW_TYPE));
        resilience4JHandle.setMinimumNumberOfCalls(Math.max(resilience4JHandle.getMinimumNumberOfCalls(), Constants.MINIMUM_NUMBER_OF_CALLS));
        resilience4JHandle.setWaitIntervalFunctionInOpenState(Math.max(resilience4JHandle.getWaitIntervalFunctionInOpenState(), Constants.WAIT_INTERVAL_FUNCTION_IN_OPEN_STATE));
        resilience4JHandle.setPermittedNumberOfCallsInHalfOpenState(Math.max(resilience4JHandle.getPermittedNumberOfCallsInHalfOpenState(), Constants.PERMITTED_NUMBER_OF_CALLS_IN_HALF_OPEN_STATE));
        resilience4JHandle.setFailureRateThreshold(Math.max(resilience4JHandle.getFailureRateThreshold(), Constants.FAILURE_RATE_THRESHOLD));
        return resilience4JHandle;
    }
```

- Use SuperBenchmarker tool, 4 threads, execute 10s

```java
C:\Users\v-yanb07>sb -u http://localhost:9195/http/test/findByUserId?userId=1 -c 4 -N 10
Starting at 2021-03-14 15:46:28
[Press C to stop the test]
23      (RPS: 1)
---------------Finished!----------------
Finished at 2021-03-14 15:46:51 (took 00:00:23.0477097)
24      (RPS: 1)                        Status 200:    25

RPS: 2.2 (requests/second)
Max: 2020ms
Min: 472ms
Avg: 1677ms

  50%   below 1994ms
  60%   below 1997ms
  70%   below 1999ms
  80%   below 1999ms
  90%   below 2001ms
  95%   below 2019ms
  98%   below 2020ms
  99%   below 2020ms
99.9%   below 2020ms
```

- Output log

```java
2021-03-14 12:16:35.252  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:36.249  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:36.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:37.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:37.250  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:38.250  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:38.250  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:39.252  INFO 379336 --- [ctor-http-nio-7] o.d.s.e.h.controller.HttpTestController  : Current limiting test
2021-03-14 12:16:39.252  INFO 379336 --- [ctor-http-nio-4] o.d.s.e.h.controller.HttpTestController  : Current limiting test
```

The console log outputs two lines per second to verify that the throttling is in effect

### Fuse

- From the configuration information, we know that the fuse is off by default, and we need to open it.
- Soul-examples-http Add sleep time at call interface

```java
    @GetMapping("/findByUserId")
    public UserDTO findByUserId(@RequestParam("userId") final String userId) throws Exception{
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userId);
        userDTO.setUserName("hello world");
       log.info("Current limiting test");

        int i = RandomUtils.nextInt(1,3);
        if(i %2==0){
		//throw new Exception("Exception thrown");
        Thread.currentThread().sleep(2000);
        }
        return userDTO;
    }
```

- Resilience4JHandle # checkData Manually set the timeout to 1s

```java
    resilience4JHandle.setTimeoutDuration(1000);
```

- The pos interface calls
  > http://localhost:9195/http/test/findByUserId?userId=1

In case of multiple requests, some requests return normal data, and some requests return the following data, indicating that the timeout fuse is effective.

```java
{
  "code": 500,
  "message": "Internal Server Error",
  "data": "404 NOT_FOUND"
}
```

## Interpretation of Resilience4J Plug-in Source Code

The soul gateway Resilience4j plug-in source code uses a [reactive programming](https://developer.ibm.com/zh/languages/java/articles/j-cn-with-reactor-response-encode/) lot of methods. First, you need to understand responsive programming.

- Resilience4J Plug-in Directory Structure

```
└─resilience4j
    │  Resilience4JPlugin.java                   // Plugin processing, core class
    │
    ├─build
    │      Resilience4JBuilder.java         	 // Build Resilience4JConf object
    │
    ├─conf
    │      Resilience4JConf.java
    │
    ├─executor
    │      CombinedExecutor.java      		 	 // Limiter and circuit breaker executor
    │      Executor.java
    │      RateLimiterExecutor.java    	 		 // Limiter executor
    │
    ├─factory
    │      Resilience4JRegistryFactory.java    	 // Build limiter and circuit breaker objects
    │
    └─handler
            Resilience4JHandler.java
```

- Resilience4JPlugn # doExecuteResilience4JPlugn inherits AbstractSoulPlugin like other soul plug-ins. As long as it is enabled, it will go to the core method doExecute through the chain mechanism.

```java
    @Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // Get configuration information object
        Resilience4JHandle resilience4JHandle = GsonUtils.getGson().fromJson(rule.getHandle(), Resilience4JHandle.class);
        // Check configuration information, assign default values if they're less than defaults
        resilience4JHandle = resilience4JHandle.checkData(resilience4JHandle);
        // circuitEnable configuration: 1 enables circuit breaker component, otherwise use limiter component
        if (resilience4JHandle.getCircuitEnable() == 1) {
            return combined(exchange, chain, rule);
        }

        return rateLimiter(exchange, chain, rule);
    }
```

- Current Limiting Resilience4JPlugin # rateLimiter

```java
    private Mono<Void> rateLimiter(final ServerWebExchange exchange, final SoulPluginChain chain, final RuleData rule) {
    return ratelimiterExecutor.run(
            // chain.execute(exchange) calls subsequent plugins
            chain.execute(exchange), fallback(ratelimiterExecutor, exchange, null), Resilience4JBuilder.build(rule))
            .onErrorResume(throwable -> ratelimiterExecutor.withoutFallback(exchange, throwable))


    // Called by ratelimiterExecutor.run
    @Override
public <T> Mono<T> run(final Mono<T> toRun, final Function<Throwable, Mono<T>> fallback, final Resilience4JConf conf) {
    // Limiter component
    RateLimiter rateLimiter = Resilience4JRegistryFactory.rateLimiter(conf.getId(), conf.getRateLimiterConfig());
    // Limiting execution
    Mono<T> to = toRun.transformDeferred(RateLimiterOperator.of(rateLimiter));
    if (fallback != null) {
    // Execute fallback
        return to.onErrorResume(fallback);
    }
    return to;
}


    // to.onErrorResume(fallback);
    default Mono<Void> fallback(ServerWebExchange exchange, String uri, Throwable t) {
    if (StringUtils.isBlank(uri)) {
        return withoutFallback(exchange, t);
    }
    DispatcherHandler dispatcherHandler = SpringBeanUtils.getInstance().getBean(DispatcherHandler.class);
    ServerHttpRequest request = exchange.getRequest().mutate().uri(Objects.requireNonNull(UriUtils.createUri(uri))).build();
    ServerWebExchange mutated = exchange.mutate().request(request).build();
    // Execute the fallback
    return dispatcherHandler.handle(mutated);
}
```

- Fuse Resilience 4JPlugin # combined

```java
    private Mono<Void> combined(final ServerWebExchange exchange, final SoulPluginChain chain, final RuleData rule) {
        Resilience4JConf conf = Resilience4JBuilder.build(rule);
        return combinedExecutor.run(
                chain.execute(exchange).doOnSuccess(v -> {
                    HttpStatus status = exchange.getResponse().getStatusCode();
                    if (status == null || !status.is2xxSuccessful()) {
                        exchange.getResponse().setStatusCode(null);
                        throw new CircuitBreakerStatusCodeException(status == null ? HttpStatus.INTERNAL_SERVER_ERROR : status);
                    }
                }), fallback(combinedExecutor, exchange, conf.getFallBackUri()), conf);
    }


   // Executed in combinedExecutor#run
    public <T> Mono<T> run(final Mono<T> run, final Function<Throwable, Mono<T>> fallback, final Resilience4JConf resilience4JConf) {
        RateLimiter rateLimiter = Resilience4JRegistryFactory.rateLimiter(resilience4JConf.getId(), resilience4JConf.getRateLimiterConfig());
        CircuitBreaker circuitBreaker = Resilience4JRegistryFactory.circuitBreaker(resilience4JConf.getId(), resilience4JConf.getCircuitBreakerConfig());
                     //Circuit breaker operation
        Mono<T> to = run.transformDeferred(CircuitBreakerOperator.of(circuitBreaker))
                // Limiting operation
                .transformDeferred(RateLimiterOperator.of(rateLimiter))
                // Set timeout
                .timeout(resilience4JConf.getTimeLimiterConfig().getTimeoutDuration())
                // Throw timeout exception if timeout occurs
                .doOnError(TimeoutException.class, t -> circuitBreaker.onError(
                        resilience4JConf.getTimeLimiterConfig().getTimeoutDuration().toMillis(),
                        TimeUnit.MILLISECONDS,
                        t));
        if (fallback != null) {
            to = to.onErrorResume(fallback);
        }
        return to;
    }
```

## Sum up

- The soul gateway provides current limiting and fusing, and the fusing is off by default
- If the parameter value is less than the default value, the default value will be used directly
