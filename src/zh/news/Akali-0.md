---
title: Dromara社区新晋开源项目-Akali(阿卡丽)，轻量化的热点&降级处理框架！
author: 铂赛东
date: 2023-11-17
cover: /assets/img/news/Akali-0-0.png
head:
  - - meta
    - name: 新闻
---

![](/assets/img/news/Akali-0-0.png)

## 前言

Dromara 社区再添一个成员项目！

今天为大家介绍的是——Akali。

它轻量小巧，来无影去无踪，不足 500 行代码，却能解决高流量场景中主要的问题：热点处理和降级处理。

## 介绍

Akali（阿卡丽）是一个轻量级本地化热点检测/降级框架，适用于大流量场景，可轻松解决业务中超高流量的并发查询等场景。并且接入和使用极其简单，10 秒钟即可接入使用！

Akali 框架的理念就是小巧，实用，丝血团战，满血退场，所到之处，皆为虚无。

Gitee：https://gitee.com/dromara/Akali

Github：https://github.com/bryan31/Akali

官方网站：https://akali.yomahub.com/

## 使用

引入依赖：

<dependency>  
  <groupId>com.yomahub</groupId>  
  <artifactId>akali</artifactId>  
  <version>1.0.1</version>  
</dependency>

## 对任意方法进行热点处理

只需要加上`@AkaliHot`这个标注，任意方法均可以获得热点检测，并在热点期间用热点数据进行返回，在热点过后，又会自动调用原本业务逻辑。

举例：比如有一个商品查询的业务，传入 SkuCode，返回商品信息。当某个商品进行促销时，访问的量就会增加，但是对于相同的 SkuCode 而言，其短时间窗口内返回的 SkuInfo 是一致的，我们的目标是当某个商品 sku 被大量查询时，框架能够在短时间内把这个商品 sku 提为热点数据，并通过对其进行缓存返回来降低对下游业务的压力。而当热点值过后，框架又能够自动摘除这个热点值，使其按照原有方式进行查询。

其本质相当于实时的监测了热点，并对其热点数据做了一个短时间内的缓存。

以下示例代表了：当相同的 skuCode 在 5 秒内超过 50 次调用时，会自动把这个 skuCode 的值提为热点，并用最后一次的返回值直接返回。当调用低于 5 秒 50 次调用时，框架会自动的摘除掉这个热点。使其正常的调用你原有代码进行逻辑计算并返回。这一切都是自动的。

@AkaliHot(grade = FlowGradeEnum.FLOW_GRADE_QPS, count = 50, duration = 5)  
public SkuInfo getSkuInfo(String skuCode){  
 //do your biz and return sku info  
}

其中`grade`参数除了有以`QPS`作为维度统计，还有以`Thread`个数作为维度统计。比如：

@AkaliHot(grade = FlowGradeEnum.FLOW_GRADE_THREAD, count = 50, duration = 5)  
public SkuInfo getSkuInfo(String skuCode){  
 //do your biz and return sku info  
}

这就代表了，如果某个 skuCode 在 5 秒之内有超过 50 个线程正在运行，那么就提为热点，并用热点数据直接返回。

对开源项目比较熟悉的同学看到这肯定想到了京东的框架-`hotkey`，`Akali`不同于`hotkey`，完全是本地运行的，不依赖于服务端，而且接入比`hotkey` 方便多了。性能完全相当于`hotkey`。

## 对任意方法进行降级

只需要加上`@AkaliFallback`注解。任意方法均可获得降级功能。

举例：某一个方法需要调用外部的接口，但是外部的接口性能不佳，耗时高。当并发一高时，线程池就会吃满，线程池队列也会逐渐堆积从而导致超时，或者丢弃，严重时会拖垮整个系统。

这时，我们只要对这个方法加上`@AkaliFallback`标注，即可解决。

@AkaliFallback(grade = FlowGradeEnum.FLOW_GRADE_THREAD, count = 100)  
public String sayHi(String name){  
 return "hi,"+name;  
}

public String sayHiFallback(String name){  
 return "fallback str";  
}

以上注解表示了，当这个方法的同时运行的线程超过 100 个时，触发降级，降级会自动调用`原方法名+Fallback`方法名(并且参数要一致)，当降级触发后会直接返回`fallback str`，当线程数小于 100 时，框架也会自动摘除降级，还是输出`hi,xxxx`。

如果你的类中没有定义 fallback 方法，那么触发降级时会报错，当然你可以在降级方法中去抛错，来让上游系统知道你这个方法已经达到了瓶颈。

## 注意事项

Akali 只针对于 Springboot，Spring 环境，并且所有标注了`@AkaliHot`或者`@AkaliFallback`的类一定得注册到 spring 上下文中。

Akali 在 springboot 中会自动扫描所有标注的类，您无需做任何配置，在 spring 中，你需要配置：

<bean class="com.yomahub.akali.strategy.FallbackStrategy"/>  
<bean class="com.yomahub.akali.strategy.MethodHotspotStrategy"/>  
<bean class="com.yomahub.akali.spring.AkaliScanner"/>

## 最后

如果大家感兴趣的话，请在 Gitee 上为 Akali 点上小星星哦。

Gitee：https://gitee.com/dromara/Akali
