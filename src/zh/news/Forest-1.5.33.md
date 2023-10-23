---
title: Forest v1.5.33 发布，增强了自定义注解组合
author: 公子骏
date: 2023-08-30
cover: /assets/img/news/Forest-1.5.33-cover.png
head:
  - - meta
    - name: 新闻
---

## Forest 介绍

Forest 是一个开源的 Java HTTP 客户端框架，它能够将 HTTP 的所有请求信息（包括 URL、Header 以及 Body 等信息）绑定到您自定义的 Interface 方法上，能够通过调用本地接口方法的方式发送 HTTP 请求

### 获得奖项

- 2021 年度 OSC 中国开源项目评选「最受欢迎项目」
- 2022 年度 OSC 中国开源项目评选「最火热中国开源项目社区」

### 简单的栗子

- **声明式接口**

创建一个 interface，并用`@Get`注解修饰接口方法。

```
public interface MyClient {
    @Get("http://localhost:8080/hello")
    String hello();
}
```

通过`@Get`注解，将上面的 MyClient 接口中的`simpleRequest()`方法绑定了一个 HTTP 请求， 其 URL 为`http://localhost:8080/hello`，并默认使用 GET 方式，且将请求响应的数据以 String 的方式返回给调用者

- **编程式接口**

```
Forest.get("http://localhost:8080/hello").execute();
```

编程式接口则更为简单直接

## v1.5.33 新增特性

- 增强自定义注解组合
- 支持 Socks 代理

### 增强自定义注解组合

组合注解是 Forest 提供的自定义注解的一种方式，这种方式只需定义注解自身，已经绑定上需要组合的注解即可，相比通过需要自定义注解声明周期的方式，要方便快捷不少

```
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
// 组合Header注解
@Headers("Content-Type: application/json")
// 组合Address注解
@Address(host = "127.0.0.1", port = 80)
public @interface MySite {
   // 自定义的 @MySite 注解
}
```

此时使用自定义的`@MySite`的注解，就相当于加上了`Content-Type: application/json`头和`host = "127.0.0.1", port = 80`的根地址

```
// @MySite 等价于
// @Header("Content-Type: application/json") + @Address(host = "127.0.0.1", port = 80)
@MySite
public interface MyClient {
   // ... ...
}
```

如果你想更灵活一点，想为`@MySite`注解添加`host`和`port`属性，并覆盖`@Address`注解的`host`和`port`属性，这在以前版本是做不到的，而 v1.5.33 版本可以

```
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
// 加上 @RequestAttributes 注解才能解析注解中定义的属性
@RequestAttributes
// 组合Header注解
@Headers("Content-Type: application/json")
// 组合Address注解
@Address
public @interface MySite {

    // 重写 @Address 注解的 host 属性
    @OverrideAttribute
    String host();

    // 重写 @Address 注解的 port 属性
    @OverrideAttribute
    int port();
}
```

此时就可以通过`@MySite`注解的`host`和`port`属性从外部传入根地址信息了

```
@MySite(host = "127.0.0.1", port = 80)
public interface MyClient {
   // ... ...
}
```

### Socks 协议代理

在以前版本也可以实现 Socks 代理功能，但需要自定义后端的 OkHttpClient 对象或 Apache 的 HttpClient 对象，然后还要后端 HTTP 框架的 Client 对象绑定自定义的 Socket Connection 部分代码，非常的麻烦。如果再加上 SSL 和用户验证的需求，那更是烦上加烦

而此次 Forest 直接支持了 Socks 协议代理，分别为声明式接口和编程式接口提供了友好的 Api，让事情变成原本就该有的简单

#### 声明式 Socks 代理

只要加上`@SocksProxy`注解，并填上`host`和`port`就能轻松实现 Socks 代理

```
@Post("http://localhost:8080/hello")
@SocksProxy(host = "127.0.0.1", port = "1089")
String simplePostWithSocksProxy();
```

加上用户密码验证也十分简单

```
@Post("http://localhost:8080/hello")
@SocksProxy(host = "127.0.0.1", port = "1089", username = "root", password = "xxxxxx")
String simplePostWithSocksProxy();
```

#### 编程式 Socks 代理

通过静态方法`ForestProxy.socks`即可快速构建 Socks 协议代理

```
ForestProxy proxy = ForestProxy.socks("127.0.0.1", 3128);
```

加上用户密码验证

```
ForestProxy proxy = ForestProxy.socks("127.0.0.1", 3128)
        .username("foo")  // 验证用户名
        .password("bar"); // 验证密码
```

## 官网和仓库地址

> #### 官网地址:
>
> http://forest.dtflyx.com
>
> #### Gitee 仓库地址:
>
> https://gitee.com/dromara/forest
>
> #### Github 仓库地址:
>
> https://github.com/dromara/forest

## 本次更新内容

> - feat: #I6MLMD 支持 socks 代理
> - feat: 组合注解支持属性重写
> - fix: #I7UPBR @Body 注解的数组参数无法正常解析为 JSON 数组
> - fix: #I7F3F0 Content-Type 为 application/xml 的情况下，发送 byte 数组数据错误
> - fix: #I7QLTS @JSONBody Collectioncodes 报错
> - add: SocksProxy 注解
> - add: OverrideAttribute 注解
> - opt: 优化 URL 更新方式
> - update: forest-solon-plugin 升级 solon 为：2.4.0

![](/assets/img/news/Forest-1.5.33-1.png)
