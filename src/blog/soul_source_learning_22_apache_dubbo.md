---
title: Soul Gateway Learning Apache Dubbo Plugin
author: nuo-promise
date: 2021-03-23
tag:
  - Soul
cover: /assets/img/blog8/08.jpg
head:
  - - meta
    - name: Blog
---

## Aim

- Introduction to the Apache Dubbo Plugin
  - Introduction to metadata
- Apache Dubbo Plugin Configuration
  - Bootstrap POM configuration
  - Soul-admin Configuration
  - Dubbo service POM configuration
- Introduction to Apache Dubbo Generalization Calls
  - Using Generalization Calls via the API
  - Using generalized calls with spring
  - Generalization call implementation flow
- Soul Dubbo Plugin Call Resolution
  - ApachDubboPlugin Generalization Call Preparation
  - ApacheDubboProxySerivce
  - DubboResponsePlugin
  - Web FluxResultUtils returns results
- Introduction to Dubbo Generalization Calls
- Sum up
- Reference

### Introduction to the Apache Dubbo Plugin

Apache Dubbo is a high-performance and lightweight open source Java service framework, which mainly provides six core capabilities: high-performance RPC invocation for interface agents, intelligent fault tolerance and load balancing, automatic service registration and discovery, high scalability, run-time traffic scheduling, and visual service governance and operation and maintenance. The Dubbo plug-in in the gateway is mainly used to convert `Http requests` to `Dubbo protocol`, and it is also the key for the gateway to implement Dubbo generalization calls. Dubbo plug-ins need to cooperate `metadata` to implement Dubbo calls.

#### Introduction to metadata

The function of metadata is to get the real request `path` and `methodName` `parameterTypes` prepare for the generalization call during the protocol conversion.

![](/assets/img/blog8/01.png)

- In the database, we have a separate table to store Dubbo meta information. Through the data synchronization scheme, the data of this table will be synchronized to the JVM memory of the gateway
- The table is structured as follows

```sql
CREATE TABLE  IF NOT EXISTS `meta_data` (
`id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'id',
`app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Application Name',
`path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Path, should be unique',
`path_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Path description',
`rpc_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'RPC type',
`service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Service Name',
`method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Method Name',
`parameter_types` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Parameter Types, comma-separated',
`rpc_ext` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'RPC extension information in JSON format',
`date_created` datetime(0) NOT NULL COMMENT 'Creation Time',
`date_updated` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT 'Update Time',
`enabled` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Enable State',
PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
```

- The `path` field is mainly used to match a piece of data according to your `path` field when requesting the gateway, and then carry out the subsequent processing process.
- `rpc_ext` Field If the proxy interface is a `Dubbo` service interface of type and the field is set `group` `version`, the information will be stored `rpc_ext` in
- Each `Dubbo` interface method will deal with a piece of metadata. Compared with Spring Cloud and HTTP, only one piece of/contextPath/\ \*\* is stored and none is stored respectively.

### Apache Dubbo Plugin Configuration

#### Soul-bootstrap POM configuration

```java
<dependency>
 <groupId>org.dromara</groupId>
 <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
 <version>${project.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.dubbo</groupId>
 <artifactId>dubbo</artifactId>
 <version>2.7.5</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-client</artifactId>
 <version>${curator.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-framework</artifactId>
 <version>${curator.version}</version>
</dependency>
<dependency>
 <groupId>org.apache.curator</groupId>
 <artifactId>curator-recipes</artifactId>
 <version>${curator.version}</version>
</dependency>
```

#### Soul-admin Configuration

![](/assets/img/blog8/02.png)

> Log in to soul-admin background, open the switch of Dubbo configuration option on the plug-in management page, and fill in the connection address of the registry.

#### Dubbo service POM configuration

```java
<dependency>
 <groupId>org.dromara</groupId>
 <artifactId>soul-spring-boot-starter-client-apache-dubbo</artifactId>
 <version>${soul.version}</version>
</dependency>
```

```java
@SoulDubboClient(path = "/insert", desc = "Insert a row of data")
public DubboTest insert(final DubboTest dubboTest) {
    dubboTest.setName("hello world Soul Apache Dubbo: " + dubboTest.getName());
    return dubboTest;
}
```

> The proxied service uses the `soul-spring-boot-starter-client-apache-dubbo` provided client dependencies and `@SoulDubboClient` annotations to register the interface name, parameter type, and parameter content to the `soul-admin` end at startup, and then the backend `admin` synchronizes the data to the `bootstrap` end.

### Introduction to Apache Dubbo Generalization Calls

The generalized interface calling mode is mainly used when the client does not have an API interface and a model class element. All POJOs in the parameters and return values are represented by `Map`. It is usually used for framework integration and can be implemented by calling all services through GenericS.

#### Using generalized calls through the API (the way the gateway is currently used)

```java
ReferenceConfig<GenericService> reference = new ReferenceConfig<>();
reference.setGeneric(true);
reference.setApplication(applicationConfig);
reference.setRegistry(registryConfig);
reference.setInterface(metaData.getServiceName());
reference.setProtocol("dubbo");
```

> The gateway uses the generic call through API declaration and registration.

#### Using Generalization Calls with Spring

```java
<dubbo:reference id="barService" interface="com.foo.BarService" generic="true" />
```

#### Generalization call implementation flow

```java
+-------------------------------------------+               +-------------------------------------------+
|  consumer 端                               |               | provider 端                                |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                    +------------------+   |               |       +--------------+                    |
|                    |GenericImplFilter |   |  Invocation   |       |GenericFilter |                    |
|             +----> |                  +-------------------------> |              |                    |
|             |      +------------------+   |               |       +--------------+                    |
| +-----------+                             |               |                      |    +-----------+   |
| |           |                             |               |                      |    |           |   |
| |Client     |                             |               |                      +--> | Service   |   |
| |           |                             |               |                           |           |   |
| +-----------+                             |               |                           +-------+---+   |
|                                           |               |                                   |       |
|      ^             +------------------+   |               |       +--------------+            |       |
|      |             |GenericImplFilter |   |               |       |GenericFilter | <----------+       |
|      +-------------+                  | <-------------------------+              |                    |
|                    +------------------+   |               |       +--------------+                    |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
|                                           |               |                                           |
+-------------------------------------------+               +-------------------------------------------+
```

> `GenericService` This interface is very similar to Java's reflection call. You only need to provide the name of the method called, the type of the parameter, and the value of the parameter to call the corresponding method directly.
>
> - Generic Filter: responsible for the conversion of provider-side parameters
>   - Converts the parameters of the hashMap structure to the corresponding Pojo when called
>   - The return result is to convert Pojo to hashMap.
>
> ![](/assets/img/blog8/03.png)
>
> - GenericImpl Filter: It is responsible for the conversion of consumer side parameters and converting Pojo to hashMap interface.
>
> ![](/assets/img/blog8/04.png)

```java
/**
 * Generic service interface
 *
 * @export
 */
public interface GenericService {

    /**
     * Generic invocation
     *
     * @param method         Method name, e.g., findPerson. If there are overloaded methods, include the parameter list, e.g., findPerson(java.lang.String)
     * @param parameterTypes Parameter types
     * @param args           Parameter list
     * @return invocation result
     * @throws GenericException Exception thrown by the method
     */
    Object $invoke(String method, String[] parameterTypes, Object[] args) throws GenericException;

    default CompletableFuture<Object> $invokeAsync(String method, String[] parameterTypes, Object[] args) throws GenericException {
        Object object = $invoke(method, parameterTypes, args);
        if (object instanceof CompletableFuture) {
            return (CompletableFuture<Object>) object;
        }
        return CompletableFuture.completedFuture(object);
    }

}
```

### Soul Dubbo Plugin Call Resolution

When a service request is initiated, the method of the `Handle` class is entered `SoulWebHandler` first (as to why it becomes the request entry to query by itself, this article will not explain). The following is the `plugins` plug-in chain call from `DefaultSoulPluginChain` the class.

```java
@Override
    public Mono<Void> handle(@NonNull final ServerWebExchange exchange) {
        return new DefaultSoulPluginChain(plugins).execute(exchange).subscribeOn(scheduler);
    }
```

```java
@Override
public Mono<Void> execute(final ServerWebExchange exchange) {
    // Reactive programming
    return Mono.defer(() -> {
        // Check if the current index is less than the number of plugins
        if (this.index < plugins.size()) {
            // Get a plugin from plugins one by one
            SoulPlugin plugin = plugins.get(this.index++);
            // Check if this plugin should be skipped
            Boolean skip = plugin.skip(exchange);
            if (skip) {
                return this.execute(exchange);
            }
            return plugin.execute(exchange, this);
        }
        return Mono.empty();
    });
}
```

> This chapter focuses only on Apache Dubbo, so we'll focus on the invocation of the Dubbo plug-in.
> ![](/assets/img/blog8/05.png)
> Through the Debug gateway program, we know that it is actually judged and called one by one according to the above order. Let's focus on `ApacheDubboPlugin`

#### ApachDubboPlugin Generalization Call Preparation

```java
@Override
    protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain, final SelectorData selector, final RuleData rule) {
        // Get dubbo_params data
        String body = exchange.getAttribute(Constants.DUBBO_PARAMS);
        // Get attribute value from exchange context
        SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
        assert soulContext != null;
        // Get attribute value from exchange metaData
        MetaData metaData = exchange.getAttribute(Constants.META_DATA);
        // Check if metaData is incorrect, if so, return an error response
        if (!checkMetaData(metaData)) {
            assert metaData != null;
            log.error(" path is :{}, meta data have error.... {}", soulContext.getPath(), metaData.toString());
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = SoulResultWrap.error(SoulResultEnum.META_DATA_ERROR.getCode(), SoulResultEnum.META_DATA_ERROR.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // Check if parameterTypes and body in metaData are empty, if so, return a body error response
        if (StringUtils.isNoneBlank(metaData.getParameterTypes()) && StringUtils.isBlank(body)) {
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            Object error = SoulResultWrap.error(SoulResultEnum.DUBBO_HAVE_BODY_PARAM.getCode(), SoulResultEnum.DUBBO_HAVE_BODY_PARAM.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        // Perform asynchronous call to Dubbo GenericsService with exchange, body, and metaData
        final Mono<Object> result = dubboProxyService.genericInvoker(body, metaData, exchange);
        return result.then(chain.execute(exchange));
    }
```

> First, check the parameters required by the generalization call.

#### ApacheDubboProxyService

```java
public Mono<Object> genericInvoker(final String body, final MetaData metaData, final ServerWebExchange exchange) throws SoulException {
    // issue(https://github.com/dromara/soul/issues/471), add dubbo tag route
    String dubboTagRouteFromHttpHeaders = exchange.getRequest().getHeaders().getFirst(Constants.DUBBO_TAG_ROUTE);
    if (StringUtils.isNotBlank(dubboTagRouteFromHttpHeaders)) {
        RpcContext.getContext().setAttachment(CommonConstants.TAG_KEY, dubboTagRouteFromHttpHeaders);
    }
    // Get reference based on metaData path
    ReferenceConfig<GenericService> reference = ApplicationConfigCache.getInstance().get(metaData.getPath());
    if (Objects.isNull(reference) || StringUtils.isEmpty(reference.getInterface())) {
        ApplicationConfigCache.getInstance().invalidate(metaData.getPath());
        reference = ApplicationConfigCache.getInstance().initRef(metaData);
    }
    // et the instance of GenericService for generic invocation based on reference
    GenericService genericService = reference.get();
    Pair<String[], Object[]> pair;
    if (ParamCheckUtils.dubboBodyIsEmpty(body)) {
        pair = new ImmutablePair<>(new String[]{}, new Object[]{});
    } else {
        // Organize parameter types and values for Dubbo generic invocation based on body and parameterTypes
        pair = dubboParamResolveService.buildParameter(body, metaData.getParameterTypes());
    }
    // Perform asynchronous call using the default $invokeAsync method of GenericService
    CompletableFuture<Object> future = genericService.$invokeAsync(metaData.getMethodName(), pair.getLeft(), pair.getRight());
    return Mono.fromFuture(future.thenApply(ret -> {
        if (Objects.isNull(ret)) {
            ret = Constants.DUBBO_RPC_RESULT_EMPTY;
        }
        // After successful invocation, copy the result and type to attributes of the exchange
        exchange.getAttributes().put(Constants.DUBBO_RPC_RESULT, ret);
        exchange.getAttributes().put(Constants.CLIENT_RESPONSE_RESULT_TYPE, ResultEnum.SUCCESS.getName());
        return ret;
    })).onErrorMap(exception -> exception instanceof GenericException ? new SoulException(((GenericException) exception).getExceptionMessage()) : new SoulException(exception));
}
```

#### DubboResponsePlugin

```java
@Override
public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
    return chain.execute(exchange).then(Mono.defer(() -> {
        final Object result = exchange.getAttribute(Constants.DUBBO_RPC_RESULT);
        if (Objects.isNull(result)) {
            Object error = SoulResultWrap.error(SoulResultEnum.SERVICE_RESULT_ERROR.getCode(), SoulResultEnum.SERVICE_RESULT_ERROR.getMsg(), null);
            return WebFluxResultUtils.result(exchange, error);
        }
        Object success = SoulResultWrap.success(SoulResultEnum.SUCCESS.getCode(), SoulResultEnum.SUCCESS.getMsg(), JsonUtils.removeClass(result));
        return WebFluxResultUtils.result(exchange, success);
    }));
}
```

#### ![](/assets/img/blog8/06.png)

#### Web FluxResultUtils returns results

![](/assets/img/blog8/07.png)

### Introduction to Dubbo Generalization Calls

Dubbo generalized invocation is mainly divided into two parts, namely, how to use `GenericImplFilter` the consumer side to intercept the generalized invocation, and how to use `GenericFilter` the service provider side to serialize the generalized parameters after intercepting the request and then request the specific service.

#### How does the service consumer org. Apache. Dubbo. RPC. Filter. GenericImplFilter intercept generalized calls?

```java
@Activate(group = CommonConstants.CONSUMER, value = GENERIC_KEY, order = 20000)
public class GenericImplFilter implements Filter, Filter.Listener {
@Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        // ... Omitted non-core code
        //  Check if it's a generic call
        if (isMakingGenericCall(generic, invocation)) {
            // Get the generic parameters
            Object[] args = (Object[]) invocation.getArguments()[2];
            // If it's nativeJava mode
            if (ProtocolUtils.isJavaGenericSerialization(generic)) {
                for (Object arg : args) {
                    if (!(byte[].class == arg.getClass())) {
                        error(generic, byte[].class.getName(), arg.getClass().getName());
                    }
                }
                // If it's bean mode
            } else if (ProtocolUtils.isBeanGenericSerialization(generic)) {
                for (Object arg : args) {
                    if (!(arg instanceof JavaBeanDescriptor)) {
                        error(generic, JavaBeanDescriptor.class.getName(), arg.getClass().getName());
                    }
                }
            }

            // Set attachment for server-side invocation
            invocation.setAttachment(
                    GENERIC_KEY, invoker.getUrl().getParameter(GENERIC_KEY));
        }
        // Perform remote invocation
        return invoker.invoke(invocation);
    }
    private boolean isMakingGenericCall(String generic, Invocation invocation) {
        return (invocation.getMethodName().equals($INVOKE) || invocation.getMethodName().equals($INVOKE_ASYNC))
                && invocation.getArguments() != null
                && invocation.getArguments().length == 3
                && ProtocolUtils.isGeneric(generic);
    }
}
```

> GenericImpl Filter implements the interface Filter (I will not introduce the Filter in Dubbo) and then executes the Invoke method. The invoke method mainly does the following things:
>
> - Parameter validation to check whether the call is a generalized call
> - Get the generalization parameters
> - Determine the generalization calling mode: traverse each parameter, and then determine whether the generalization mode of the parameter is native Java or bean in turn
> - Initiates a remote call

#### The service provider intercepts the generalization request through Generic Filter.

```java
@Activate(group = CommonConstants.PROVIDER, order = -20000)
public class GenericFilter implements Filter, Filter.Listener {
    @Override
    public Result invoke(Invoker<?> invoker, Invocation inv) throws RpcException {
        // Parameter validation
        if ((inv.getMethodName().equals($INVOKE) || inv.getMethodName().equals($INVOKE_ASYNC))
                && inv.getArguments() != null
                && inv.getArguments().length == 3
                && !GenericService.class.isAssignableFrom(invoker.getInterface())) {
            // Get parameter name, type, and value
            String name = ((String) inv.getArguments()[0]).trim();
            String[] types = (String[]) inv.getArguments()[1];
            Object[] args = (Object[]) inv.getArguments()[2];
            try {
                // Get the called method using reflection
                Method method = ReflectUtils.findMethodByMethodSignature(invoker.getInterface(), name, types);
                Class<?>[] params = method.getParameterTypes();
                if (args == null) {
                    args = new Object[params.length];
                }
                // Get the generic type used for the generic reference, true or bean or nativejava
                String generic = inv.getAttachment(GENERIC_KEY);
                if (StringUtils.isBlank(generic)) {
                    generic = RpcContext.getContext().getAttachment(GENERIC_KEY);
                }
                // If generic=true, deserialize parameters using the true method
                if (StringUtils.isEmpty(generic)
                        || ProtocolUtils.isDefaultGenericSerialization(generic)
                        || ProtocolUtils.isGenericReturnRawResult(generic)) {
                    args = PojoUtils.realize(args, params, method.getGenericParameterTypes());
                    // If generic=nativejava, deserialize parameters using the nativejava method
                } else if (ProtocolUtils.isJavaGenericSerialization(generic)) {
                    for (int i = 0; i < args.length; i++) {
                        if (byte[].class == args[i].getClass()) {
                            try (UnsafeByteArrayInputStream is = new UnsafeByteArrayInputStream((byte[]) args[i])) {
                                args[i] = ExtensionLoader.getExtensionLoader(Serialization.class)
                                        .getExtension(GENERIC_SERIALIZATION_NATIVE_JAVA)
                                        .deserialize(null, is).readObject();
                            } catch (Exception e) {
                                throw new RpcException("Deserialize argument [" + (i + 1) + "] failed.", e);
                            }
                        } else {
                            throw new RpcException(...);
                        }
                    }
                    // If generic=bean, deserialize parameters using the bean method
                } else if (ProtocolUtils.isBeanGenericSerialization(generic)) {
                    for (int i = 0; i < args.length; i++) {
                        if (args[i] instanceof JavaBeanDescriptor) {
                            args[i] = JavaBeanSerializeUtil.deserialize((JavaBeanDescriptor) args[i]);
                        } else {
                            throw new RpcException(...);
                        }
                    }
                } ...
                // Pass the current request to the next Filter in the FilterChain and return the result
                RpcInvocation rpcInvocation = new RpcInvocation(method, invoker.getInterface().getName(), args, inv.getAttachments(), inv.getAttributes());
                rpcInvocation.setInvoker(inv.getInvoker());
                rpcInvocation.setTargetServiceUniqueName(inv.getTargetServiceUniqueName());

                return invoker.invoke(rpcInvocation);
            } catch (NoSuchMethodException e) {
                throw new RpcException(e.getMessage(), e);
            } catch (ClassNotFoundException e) {
                throw new RpcException(e.getMessage(), e);
            }
        }
        // If it's not a generic call, pass the request directly to the next Filter in the FilterChain
        return invoker.invoke(inv);
    }
}
```

> The above is the general process of how the Dubbo service provider intercepts the generalization request and processes it:
>
> - Parameter check to determine whether the request is a generalized call
> - Get the parameter name, parameter type, parameter value,
> - Use reflection to get the method called, and the generalization used `true` or or
> - Deserialize the generalization parameters based on the generalization method
> - Pass the request, including the called method, parameters and context information, to the next Filter in the FilterChain, and return the Result
> - According to the generalization method, deserialize the Result and return it to the service consumer

### Sum up

The above is the analysis of how to configure the Dubbo plug-in to the entire call process, and then respectively introduce the details of how the service consumer and service provider intercept the generalized call process and serialize the parameters. I hope it will be helpful to you.

### Reference

[https://my.oschina.net/u/4564034/blog/4409382](https://my.oschina.net/u/4564034/blog/4409382)

[https://qsli.github.io/2018/05/02/dubbo-generic-invoke/](https://qsli.github.io/2018/05/02/dubbo-generic-invoke/)
