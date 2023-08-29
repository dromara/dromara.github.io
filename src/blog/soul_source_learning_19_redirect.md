---
title: Soul Gateway Learning Redirect Plugin
author: axing
date: 2021-03-16
tag:
  - Soul
cover: /assets/img/blog6/01.jpg
head:
  - - meta
    - name: Blog
---

# Introduction

When the `Soul` gateway makes a proxy call to the target service, it can use `redirect` the plug-in to redirect the request. There are two scenarios: one is to `redirectUrl` configure it as a third-party URL address and directly use `308` it to forward and jump, and the other is `redirectUrl` to forward the configuration beginning with `/` to the gateway itself.

## Plug-in configuration

- In `soul-admin` – > Plug-in Management – > `redirect`, set to on.
- Dependencies added `redirect` `maven` in `soul-bootstrap` the project's `pom.xml` files.
- Set the selector rule in the `soul- admin` background. Only the matching request will be forwarded and redirected. Please see for details: [Selector and Rule Configuration](https://dromara.org/zh/projects/soul/selector-and-rule).

## Maven dependency

Add the plug-in dependency in the `soul-bootstrap` project `pom.xml` file.

```xml
<dependency>
  <groupId>org.dromara</groupId>
  <artifactId>soul-spring-boot-starter-plugin-redirect</artifactId>
  <version>${last.version}</version>
</dependency>
```

## Scenes

> As the name implies, `redirect` a plug-in is `uri` a redirection and redirection of.

### Redirect

- When we `Rule` configure the custom path, it should be a reachable service path.
- When the request is matched, the service jump will be performed `308` according to the user-defined path `Soul gateway`.

![Redirect configuration](https://dromara.org/img/soul/plugin/redirect/redirect-01.png)

### Gateway self-interface forwarding

- When the matching rules are met, the service internally forwards using `DispatcherHandler` the internal interface.
- To realize the gateway's own interface forwarding, we need to start with the prefix in the configuration path `/`. The specific configuration is shown in the following figure.

![Self-interface forwarding](https://dromara.org/img/soul/plugin/redirect/redirect-02.png)

## Source Code Parsing

Before parsing `redirect` the redirect source code, it's important to understand that the Soul Gateway is based on the SpringBoot WebFlux implementation, where `WebFlux` requests are handled by default `DispatcherHandler` if nothing is configured by default. This is the responsive `MVC` processing core. Take a look at the initialization:

```java
protected void initStrategies(ApplicationContext context) {
  Map<String, HandlerMapping> mappingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerMapping.class, true, false);
  ArrayList<HandlerMapping> mappings = new ArrayList(mappingBeans.values());
  AnnotationAwareOrderComparator.sort(mappings);
  // handlerMapping related
  this.handlerMappings = Collections.unmodifiableList(mappings);
  Map<String, HandlerAdapter> adapterBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerAdapter.class, true, false);
  // handlerAdapter related
  this.handlerAdapters = new ArrayList(adapterBeans.values());
  AnnotationAwareOrderComparator.sort(this.handlerAdapters);
  Map<String, HandlerResultHandler> beans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerResultHandler.class, true, false);
  // resultHandler related
  this.resultHandlers = new ArrayList(beans.values());
  AnnotationAwareOrderComparator.sort(this.resultHandlers);
}
```

After that, we are familiar with the `MVC` core processing `DispatcherHandler#handle` method.

```java
public Mono<Void> handle(ServerWebExchange exchange) {
    return this.handlerMappings == null ? this.createNotFoundError() : Flux.fromIterable(this.handlerMappings).concatMap((mapping) -> {
        return mapping.getHandler(exchange);
    }).next().switchIfEmpty(this.createNotFoundError()).flatMap((handler) -> {
        return this.invokeHandler(exchange, handler);
    }).flatMap((result) -> {
        return this.handleResult(exchange, result);
    });
}
```

To figure out how to handle it by default `DispatcherHandler`, let's talk about Soul Gateway, `SoulWebHandler` which implements the `WebHandler` interface. And then `BeanName` replace that previously `DispatcherHandler` registered default proces `handler` with the declaration `webHandler`.

```java
@Bean("webHandler")
public SoulWebHandler soulWebHandler(final ObjectProvider<List<SoulPlugin>> plugins) {
  List<SoulPlugin> pluginList = plugins.getIfAvailable(Collections::emptyList);
  List<SoulPlugin> soulPlugins = pluginList.stream()
    .sorted(Comparator.comparingInt(SoulPlugin::getOrder)).collect(Collectors.toList());
  soulPlugins.forEach(soulPlugin -> log.info("load plugin:[{}] [{}]", soulPlugin.named(), soulPlugin.getClass().getName()));
  return new SoulWebHandler(soulPlugins);
}
```

So far, we understand that the default request has been `SoulWebHandler#handle` processed. What if we need to forward it to the gateway itself `MVC`? The following is `DispatcherHandler` injected during initialization `RedirectPlugin`, and then `DispatcherHandler` distributed according to the specific request. The specific core code is as follows:

```java
@Override
protected Mono<Void> doExecute(final ServerWebExchange exchange, final SoulPluginChain chain,
                               final SelectorData selector, final RuleData rule) {
  final String handle = rule.getHandle();
  final RedirectHandle redirectHandle = GsonUtils.getInstance().fromJson(handle, RedirectHandle.class);
  if (Objects.isNull(redirectHandle) || StringUtils.isBlank(redirectHandle.getRedirectURI())) {
    log.error("uri redirect rule can not configuration: {}", handle);
    return chain.execute(exchange);
  }
  // Handle self-forwarding paths starting with "/"
  if (redirectHandle.getRedirectURI().startsWith(ROOT_PATH_PREFIX)) {
    ServerHttpRequest request = exchange.getRequest().mutate()
      .uri(Objects.requireNonNull(UriUtils.createUri(redirectHandle.getRedirectURI()))).build();
    ServerWebExchange mutated = exchange.mutate().request(request).build();
    return dispatcherHandler.handle(mutated);
  } else {
    // Perform a 308 redirect
    ServerHttpResponse response = exchange.getResponse();
    response.setStatusCode(HttpStatus.PERMANENT_REDIRECT);
    response.getHeaders().add(HttpHeaders.LOCATION, redirectHandle.getRedirectURI());
    return response.setComplete();
  }
}
```

### Reference link:

- [ Design of Spring Web Flux and Analysis of Its Operation Principle ](https://learnku.com/articles/30263#replies)
- [ Spring Web Flux operation principle ](https://www.processon.com/view/link/5d0763ede4b039f39f3b5a8a)
