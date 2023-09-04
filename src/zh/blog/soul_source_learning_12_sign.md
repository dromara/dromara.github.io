---
title: Soul网关学习Sign插件
author: 唐甜
date: 2021-01-29
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: 博客
---

## 介绍

sign 插件用来对请求进行签名认证的插件

## AK/SK 介绍

AK/SK（Access Key ID/Secret Access Key）即访问密钥，包含访问密钥 ID（AK）和秘密访问密钥（SK）两部分，主要用于对用户的调用行为进行鉴权和认证。

## 插件使用-以（/dubbo/findAll）为例

### 在 SoulBootstrap 的 pom.xml 文件中添加  `sign`  的支持

```xml
  <!-- soul sign plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-sign</artifactId>
     <version>${last.version}</version>
  </dependency>
  <!-- soul sign plugin end-->
```

### 新增 appKey，secretKey

![image.png](/assets/img/blog4/01.png)
![image.png](/assets/img/blog4/02.png)
![image.png](/assets/img/blog4/03.png)
![image.png](/assets/img/blog4/04.png)

## 配置选择器和规则器

添加选择器
![image.png](/assets/img/blog4/05.png)
添加规则器
![image.png](/assets/img/blog4/06.png)

### 增加获取鉴权服务

在自己服务中增加一个对外访问的方法

```java
    @GetMapping("/authUrl")
    public String authUrl() {
        Map<String, String> map = Maps.newHashMapWithExpectedSize(2);
        //timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli())
        String timetamp = String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli()) ;
        System.out.println(timetamp);
        map.put("timestamp",timetamp);  //值应该为毫秒数的字符串形式
        map.put("path", "/dubbo/findAll");
        map.put("version", "1.0.0");
        List<String> storedKeys = Arrays.stream(map.keySet()
                .toArray(new String[]{}))
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
        final String sign = storedKeys.stream()
                .map(key -> String.join("", key, map.get(key)))
                .collect(Collectors.joining()).trim()
                .concat("D19CF79F647A465AB9C5C66F430CAD28");//SECRETkey
        return DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase();
    }

```

下面需要注意的
![image.png](/assets/img/blog4/07.png)

### 在网关中增加鉴权头信息

![image.png](/assets/img/blog4/08.png)

### 请求的结果演示

通过的返回
![image.png](/assets/img/blog4/09.png)
5min 超时的返回
![image.png](/assets/img/blog4/10.png)
appKey 填写错误的返回
![image.png](/assets/img/blog4/11.png)
签名错误的返回
![image.png](/assets/img/blog4/12.png)
禁用 sign 插件的返回
![image.png](/assets/img/blog4/13.png)

## sign 插件的实现分析

### java 中 Pair

简单的说就是 pair 保存的是一对 key value，而 map 可以保存多对 key value。
SignPlugin 插件调用 DefaultSignService 中 signVerify 方法
判断 sign 插件是否可用，如果可用获取在 global 插件存入的 soulContext 并调用 verify 方法

```java
if (signData != null && signData.getEnabled()) {
  final SoulContext soulContext = exchange.getAttribute(Constants.CONTEXT);
  assert soulContext != null;
  return verify(soulContext, exchange);
}
```

verify 方法中
判断请求头信息是否正确
如果不正确就抛出  log.error("sign parameters are incomplete,{}", soulContext)异常

```java
if (StringUtils.isBlank(soulContext.getAppKey())
    || StringUtils.isBlank(soulContext.getSign())
    || StringUtils.isBlank(soulContext.getTimestamp())) {
  log.error("sign parameters are incomplete,{}", soulContext);
  return Pair.of(Boolean.FALSE, Constants.SIGN_PARAMS_ERROR);
}
```

判断请求时间是否超时

```java
    if (between > delay) {
            return Pair.of(Boolean.FALSE, String.format(SoulResultEnum.SING_TIME_IS_TIMEOUT.getMsg(), delay));
        }
```

没有超时继续调用 sign 方法
获取认证数据，这个数据在 soulAdmin 中配置

```java
AppAuthData appAuthData = SignAuthDataCache.getInstance().obtainAuthData(soulContext.getAppKey());
```

后面对 appAuthData 数据进行判断，数据有错误就不通过
对获取的参数再次签名，判断传入的和再次签名的是否一样

```java
String sigKey = SignUtils.generateSign(appAuthData.getAppSecret(), buildParamsMap(soulContext));
```

如果都校验都通过就完成认证 访问请求。
