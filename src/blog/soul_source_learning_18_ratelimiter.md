---
title: Soul Gateway Learning RateLimiter Plugin
author: baiyu
date: 2021-01-30
tag:
  - Soul
cover: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9434447ebc674f58b65c26b65f855181~tplv-k3u1fbpfcp-watermark.image
head:
  - - meta
    - name: Blog
---

## Review

In the previous article on HTTP requests, the processing flow of Soul plug-ins was generally combed, and the specific functions of DividePlugin, GlobalPlugin, WebClientPlugin and WebCilent ResponsePlugin plug-ins were also learned. In the process of sorting out, it is found that there ** Order of precedence ** are Soul plug-ins, and many pre-plug-in operations have been done before the DividePlugin plug-in, which includes the topics ** Rate LimiterPlugin ** we analyzed in this chapter (one of them).

## Learn to use

### Read the official documents to have a general understanding of it.

<a href="https://dromara.org/zh/projects/soul/rate-limiter-plugin/">The rate Limiter plug-in</a>

Through the reading of official documents, we know the ** RateLimiterPlugin ** two core points ** Speed, capacity **.

The following explanation comes from the official document.

- Capacity: is the maximum number of requests a user is allowed to execute in one second. This is the number of tokens the token bucket can hold.
- Rate: This is how many requests per second you allow the user to execute and any requests that are dropped. This is the fill rate of the token bucket.

It can be seen that ** RateLimiterPlugin ** the core of current limiting lies in ** Token bucket algorithm ** its implementation.

PS: There are four common implementations ** Token bucket algorithm ** of the current limiting algorithm, ** Funnel algorithm **, ** Counter (fixed window) algorithm **, ** Sliding window algorithm **. See the corresponding <a href="https://blog.csdn.net/weixin_41846320/article/details/95941361"> blog introduction for details.</a>

### Initial use

#### Enable the corresponding plug-in

At the Soul gateway ** System Management-Plug-in Management **, change the status to the enabled status. Note that redis related configuration needs to be filled in here. The Soul token bucket is based on redis.

Why is Soul's token bucket algorithm based on redis?

In the case of cluster deployment, the token bucket algorithm of a single machine can not meet the current limiting function in the cluster state.

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e25dd524c294b4f9c227e3f2127757f~tplv-k3u1fbpfcp-watermark.image)

#### Add current limit selectors, rules,

At the Soul Gateway ** List of plug-ins **, select rate \_ limiter to add the rule and selector configuration. If you don't know how to add it, you can read <a href="https://juejin.cn/post/6922431625230417928"> the matching logic </a> of the selector \ rule first. ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cbbc63ed6214aeda8c70f8e34d7c19c~tplv-k3u1fbpfcp-watermark.image)![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25e67268dd5e4aa9a081a51963a03da8~tplv-k3u1fbpfcp-watermark.image) The capacity and rate added here are both 1, mainly to verify whether the plug-in is enabled.

#### Interface corresponding access

Call *http://127.0.0.1:9195/http/test/findByUserId?userId=10* to access. When the rate is higher than 1, the following interface returns the result, which means the plug-in is successfully used.

```json
{
  "code": 429,
  "message": "You have been restricted, please try again later!",
  "data": null
}
```

### Source Code Reading Read the source code with questions

#### How to ensure that the redis configuration takes effect immediately after the page is modified, and the corresponding redis connection in the background is changed immediately.

The answer is that natural data synchronization is closely related.

When modifying the configuration of the plug-in, an event notification of plug-in data change is also issued. When combing <a href="https://juejin.cn/post/6920609782349086727"> the overall process </a> of Soul Gateway synchronization data, it has been known that the modified plug-in data not only changes the data in the JVM cache, but also distributes the corresponding plug-in. As shown in the following figure ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9434447ebc674f58b65c26b65f855181~tplv-k3u1fbpfcp-watermark.image), for ** RateLimiterPlugin ** the interface that is mainly implemented ** handlePlugin **, what exactly does this corresponding implementation do?

The specific method is as follows ** Rate LimiterPluginData Handler handlerPlugin **.

```java
public void handlerPlugin(final PluginData pluginData) {
        if (Objects.nonNull(pluginData) && pluginData.getEnabled()) {
            // Load rate limiting plugin configuration
            RateLimiterConfig rateLimiterConfig = GsonUtils.getInstance().fromJson(pluginData.getConfig(), RateLimiterConfig.class);
            // Check if Redis connection value needs to be reloaded
            if (Objects.isNull(Singleton.INST.get(ReactiveRedisTemplate.class))
                    || Objects.isNull(Singleton.INST.get(RateLimiterConfig.class))
                    || !rateLimiterConfig.equals(Singleton.INST.get(RateLimiterConfig.class))) {
                LettuceConnectionFactory lettuceConnectionFactory = createLettuceConnectionFactory(rateLimiterConfig);
                lettuceConnectionFactory.afterPropertiesSet();
                RedisSerializer<String> serializer = new StringRedisSerializer();
                RedisSerializationContext<String, String> serializationContext =
                        RedisSerializationContext.<String, String>newSerializationContext().key(serializer).value(serializer).hashKey(serializer).hashValue(serializer).build();
                ReactiveRedisTemplate<String, String> reactiveRedisTemplate = new ReactiveRedisTemplate<>(lettuceConnectionFactory, serializationContext);
                Singleton.INST.single(ReactiveRedisTemplate.class, reactiveRedisTemplate);
                Singleton.INST.single(RateLimiterConfig.class, rateLimiterConfig);
            }
        }
    }
```

There are several key points in the above code:

In the above code, the configuration of the current limiting plug-in and the corresponding redisTemplate instance are put into the corresponding map of the Singleton. INST.

When the plug-in data is received, judging whether a redis connection instance and a current limiting configuration instance exist, judging whether the current current limiting configuration instance is consistent with the transmitted current limiting instance, if not, considering that the configuration is changed, and re-initializing the current limiting instance and the connection pool instance to be put into the map of the Singleton. INST, Hot deployment of changes to the redis configuration is thus guaranteed.

The code in the if judgment is encapsulated into a corresponding redis connection pool based on SpringDataRedis.

The PS: Singleton. INST is a singleton pattern implemented by enumeration.

### How is the current limiting plug-in implemented at the bottom?

#### Debug call chain

** RateLimiterPlugin ** Because of the need to limit the flow of specific rules, it is still implemented ** AbstractSoulPlugin **, and the methods and functions that have been ** An excute of AbstractSoulPlugin ** combed before are still used, so I will not repeat the explanation here. You can watch <a href="https://juejin.cn/post/6921685390982119438"> the Http call process </a>. Deepen the impression of this class.

The focus of this section is to see what specific ** doexcute ** methods have done.

```java
   protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
       final String handle = rule.getHandle();
       final RateLimiterHandle limiterHandle = GsonUtils.getInstance().fromJson(handle, RateLimiterHandle.class);
       return redisRateLimiter.isAllowed(rule.getId(), limiterHandle.getReplenishRate(), limiterHandle.getBurstCapacity())
               .flatMap(response -> {
                   if (!response.isAllowed()) {
                       // Return error message with 429 error code
                       exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                       Object error = SoulResultWrap.error(SoulResultEnum.TOO_MANY_REQUESTS.getCode(), SoulResultEnum.TOO_MANY_REQUESTS.getMsg(), null);
                       return WebFluxResultUtils.result(exchange, error);
                   }
                   return chain.execute(exchange);
               });
   }
```

In the above code, it can be seen that whether the token is successfully obtained is judged by ** redisRateLimiter.isAllowed **. The method is as follows

```java
   public Mono<RateLimiterResponse> isAllowed(final String id, final double replenishRate, final double burstCapacity) {
       if (!this.initialized.get()) {
           throw new IllegalStateException("RedisRateLimiter is not initialized");
       }
       // Get the Redis key
       List<String> keys = getKeys(id);
       //The parameters required for encapsulating the execution of a Lua script. The first parameter is the rate, the second parameter is the capacity, the third parameter is the current 10-digit timestamp, and the fourth parameter is a fixed value of 1, which represents the number of tokens requested.
       List<String> scriptArgs = Arrays.asList(replenishRate + "", burstCapacity + "", Instant.now().getEpochSecond() + "", "1");
       //Execute the Lua script
       Flux<List<Long>> resultFlux = Singleton.INST.get(ReactiveRedisTemplate.class).execute(this.script, keys, scriptArgs);
       return resultFlux.onErrorResume(throwable -> Flux.just(Arrays.asList(1L, -1L)))
               .reduce(new ArrayList<Long>(), (longs, l) -> {
                   longs.addAll(l);
                   return longs;
               }).map(results -> {
                   //'allowed' indicates the execution result (1 for success)
                   boolean allowed = results.get(0) == 1L;
                   Long tokensLeft = results.get(1);
                   RateLimiterResponse rateLimiterResponse = new RateLimiterResponse(allowed, tokensLeft);
                   log.info("RateLimiter response:{}", rateLimiterResponse.toString());
                   return rateLimiterResponse;
               }).doOnError(throwable -> log.error("Error determining if user allowed from redis:{}", throwable.getMessage()));
   }
```

#### Method get Keys (ID)

This method is to obtain the keys that redis needs to operate. Two types of keys are obtained in the following format:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55ce72f4e044405fbd3b1461905072f2~tplv-k3u1fbpfcp-watermark.image)

The particularly long number in the middle is ** Rule ID **, because the smallest granularity of the current limit is the rule.

The first timestamp record I ** Timestamp of the last call **

The second token records that ** The number of tokens remaining after the last call was completed **

#### execute(this.script, keys, scriptArgs）

Executing the Lua script keys passes the return value of getKeys (ID), and scriptArgs passes the required parameters

By reading the above code, we know that the specific implementation of the current limit rule is handed over to the specific Lua script.

PS: It needs to be reminded here that the current limiting algorithm is a token bucket algorithm. There are two general implementations of the token bucket algorithm. One is that a thread continuously generates tokens. When a request comes in, it first obtains tokens from the corresponding queue. However, this token generation method will consume a lot of performance when the threshold is set to be particularly large. Therefore, there is a second token bucket algorithm, The number of tokens is calculated in real time as they are acquired, and soul is based on the second implementation.

#### Analysis of Lua Current Limiting Algorithm

```lua
-- Key to store the remaining token count for the current rule
local tokens_key = KEYS[1]
-- Key for the timestamp of the last call for the current rule
local timestamp_key = KEYS[2]

-- Rate
local rate = tonumber(ARGV[1])
-- Capacity
local capacity = tonumber(ARGV[2])
-- Current timestamp
local now = tonumber(ARGV[3])
-- Value is 1
local requested = tonumber(ARGV[4])
-- Calculate fill time by dividing capacity by rate
local fill_time = capacity/rate
-- Calculate TTL by rounding down fill time * 2
local ttl = math.floor(fill_time*2)

-- Get the current token count
local last_tokens = tonumber(redis.call("get", tokens_key))
if last_tokens == nil then
-- Set token count to the configured capacity if it's not present
 last_tokens = capacity
end
-- Get the timestamp of the last call
local last_refreshed = tonumber(redis.call("get", timestamp_key))
if last_refreshed == nil then
 last_refreshed = 0
end
-- Calculate the time difference between the last call and the current call
local delta = math.max(0, now-last_refreshed)
-- Calculate the current remaining token count
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
--  Check if there are enough tokens (at least 1) available
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens
local allowed_num = 0
if allowed then
 -- Consume one token
 new_tokens = filled_tokens - requested
 allowed_num = 1
end

-- Use setex to set the key's TTL and new value
redis.call("setex", tokens_key, ttl, new_tokens)
redis.call("setex", timestamp_key, ttl, now)

return { allowed_num, new_tokens }
```

It is recommended to understand the role <a href="https://www.cnblogs.com/liuyu7177/p/10918250.html"> of Lua ** KEYS ARGS ** and the understanding </a> of keys [1] and argv [1] in redis Lua.

The overall logic of the Lua code is still very clear, and I can't explain it in detail here. The code comments have been completed.

I have two doubts here.

- Is the calculation of the ** ttl ** parameter multiplied by 2 for fear that it is not an integer? , so the \ \* 2 take the minimum operation?
- Is last _ tokens + (\* Rate), where the delta parameter is the subtraction of two ten-bit timestamps, but the rate is generated in seconds, shouldn't it be last _ tokens + ( (delta/1000)? \* deltarate) the core code for the calculation of ** filled_tokens ** parameters?
