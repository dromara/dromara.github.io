---
title: LiteFlow v2.11.1发布！一个高速迭代，社区活跃的新一代规则引擎
author: LiteFlow
tag:
  - LiteFlow
date: 2023-10-16
cover: /assets/img/news/LiteFlow-cover.png
head:
  - - meta
    - name: 新闻
---

## LiteFlow 介绍

**LiteFlow 是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达 6 种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。**

LiteFlow 是 Gitee 的高 star 项目，过去一年来保持了非常快的增长趋势。

同时 LiteFlow 也是国内优秀的社区驱动型开源项目，开源将近 3 年，目前已经被各大公司应用在核心系统上。特性以及支持度都非常好。社区人数超过 3500 人。测试用例 1500 个，质量有保障。

如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：

```
项目官网:
https://liteflow.cc

gitee 托管仓库：
https://gitee.com/dromara/liteFlow

github 托管仓库：
https://github.com/dromara/liteflow
```

## 前言

上一个版本是 9 月 1 日发布的，经过了一个半月，LiteFlow 新的 v2.11.1 和大家见面了。

这个版本总共带来了 7 个大特性，3 个增强，2 个修复。总计 12 个 issue 的更新。

其实这已经比上一个大版本已经有过之而无不及了。

这一切归功于 LiteFlow 的团队小伙伴们，他们贡献了这个版本中的诸多的特性，感谢他们。尤其这个版本又有 2 位新成员加入团队，目前团队成员一共有 11 位，接下来的迭代将会变的更加迅速。

我们在确保新特性推出的同时，项目质量也同样出色。LiteFlow 截止到新版本，一共有 1515 个测试用例，每一个特性的提交，我们每一个成员都会全部通过测试用例，这也是我们每一次发版的底气，测试用例我们是认真的。并且我们的测试用例代码行覆盖率达到了非常高的 90%覆盖率。

![](/assets/img/news/LiteFlow-2.11.1-1.png)

其实不吹不黑，在拥有 1500 个测试用例以上的开源项目中，90%的行覆盖率算得上是一个优秀的程度了。

## SQL 插件支持轮询自动更新模式

LiteFlow 支持把规则和脚本存入任意的关系型数据库，由于关系型数据库不像注册中心会进行推送变更，所以一直以来，规则和脚本在数据库中发生改变，是需要开发者自己手动的去刷新的。并且需要每个应用实例都进行刷新。这对开发者来说，是繁琐了点。

所以我们在 v2.11.1 中推出了数据库自动轮询更新模式。这一切只需要在你原来的配置中加入：

```
liteflow:
  rule-source-ext-data-map:
    ...
    #是否开启SQL数据轮询自动刷新机制 默认不开启    pollingEnabled: true
    ...
```

默认 LiteFlow 会每 1 分钟去进行 SHA 值的对比，由此来判断是否需要更新。

具体使用方式请参考`规则文件->SQL 数据库配置源`。

## WHEN 增加 must 语法

之前 `WHEN` 推出过 `any` 语法，意思是任意一个完成即继续，而忽略其他。但是在社区里有小伙伴碰到真实的场景，需要异步并行中对指定的节点先完成就忽略其他。

为此这次新版本中推出了全新的 `must` 语法，提供在并行编排中更多的多样性。

```
<chain name="chain1">
    THEN(
          a,
          WHEN(b, c, d).must(b, c),
          f
      );
</chain>
```

也可以指定一个或多个表达式：

```
<chain name="chain1">
    THEN(
          a,
          WHEN(b, THEN(c, d).id("t1"), e).must(b, "t1"),
          f
      );
</chain>
```

具体使用方式请参考`EL规则的写法->并行编排->指定任意节点先执行完则忽略其他`

## 推出 EL 表达式的动态组装 API

之前 LiteFlow 推出过动态构建 chain 的 API，类似于这样：

```
LiteFlowChainELBuilder.createChain().setChainName("chain1").setEL(
    "THEN(a, b, WHEN(c, d))"
).build();
```

但是 EL 表达式还是需要你自己以字符串的方式填入，这并不能算真正意义上动态。

这次我们推出了全新的 EL 表达式的动态组装 API，对于上面的 EL，你可以如下进行动态构建：

```
ThenELWrapper el = ELBus.then(
      "a","b",ELBus.when("c", "d")
);LiteFlowChainELBuilder.createChain().setChainName("chain1").setEL(el.toEL()).build();
```

值得一说的是，用 java 语言构建 EL 表达式，几乎和 EL 的写法完全一致。如果你已经熟悉了 LiteFlow 的规则语法，应该是零成本上手的。

目前 API 支持了所有的 EL 语法。具体使用方式请参考`用代码构造规则->构造EL`

## 链路继承

LiteFlow 每一个 chain 独立，之前的版本不存在继承关系。但在这个新版本中，我们推出了链路继承这个特性。

如同类的继承一样，链路可以继承，那么对于拥有复杂链路的业务系统，可以对链路进行抽象，得到一个非常优雅的表现方式。

我们定义的继承也非常容易看懂：

```
<chain id="base">
    THEN(a, b, {0}, {1});
</chain>

<chain id="implA" extends="base">
    {0}=IF(c, d, e);
    {1}=SWITCH(f).to(j,k);
</chain>
```

还可以多级继承：

```
<chain id="base">
    THEN(a, b, {0}, {1});
</chain>

<chain id="base2" extends="base">
  {0}=THEN(a,b,{3});
  {1}=SWITCH(f).to({4},k);
</chain>

<chain id="implB" extends="base2">
  {3}=THEN(a,b);
  {4}=j;
</chain>
```

如果你有此方面的场景，不妨尝试下继承特性。

具体使用方式请参考高级特性->链路继承。

## 组件降级

LiteFlow 之前的`替补组件`全面升级成`组件降级`特性。

组件降级允许你定义各个类型组件的降级组件。新版本提供了`@FallbackCmp`注解用于定义。

在 EL 规则中，如果你用 `node` 关键字包裹组件，便开启了降级特性：

```
<chain id="chain1">
    THEN(node("a"), b, c);
</chain>
```

当 a 组件不存在时，便会走到用`@FallbackCmp` 注解定义的降级组件中去。

具体用法请参考`高级特定->组件降级`

## 支持绝对路径的模糊匹配

LiteFlow 对项目内的规则文件的模糊匹配是早就支持的。但是之前的版本一直不支持绝对路径的模糊匹配。

这个版本，我们予以了支持。

你可以使用\*或者\*\*来模糊匹配多层级的任意名字的文件：

```
liteflow.rule-source=/data/lf/**/*Rule.xml
```

如果开启了文件监听功能，还能对模糊路径匹配到的每一个文件进行监听。当文件改变的时候，实现自动刷新功能。是不是很酷。

具体用法请参考` 规则文件->本地规则文件配置`和`高级功能->本地文件监听 `

## WHEN 线程池隔离

LiteFlow 在 v2.11.1 版本中新推出了一个配置，在执行 WHEN 中的并行组件时，每一个 when 的线程池隔离，在运行复杂的嵌套 WHEN 链路时，这个特性非常有用。可以有效提高运行速度并且避免死锁问题。

你只需要开启这个配置即可，默认是关闭的。

```
liteflow.when-thread-pool-isolate=true
```

具体用法请参考 `EL规则的写法->并行编排->开启WHEN线程池隔离`

## 完整的更新列表

```
特性 #I7Y0Y1 SQL插件支持轮询模式

https://gitee.com/dromara/liteFlow/issues/I7Y0Y1

特性 #I7XAIB WHEN增加must语法

https://gitee.com/dromara/liteFlow/issues/I7XAIB

特性 #I878WV EL表达式动态组装

https://gitee.com/dromara/liteFlow/issues/I878WV

特性 #I7SVZF 支持chain的继承关系特性

https://gitee.com/dromara/liteFlow/issues/I7SVZF

特性 #I7YYLF 组件降级特性

https://gitee.com/dromara/liteFlow/issues/I7YYLF

特性 #I7ZJRH 支持绝对路径的模糊匹配

https://gitee.com/dromara/liteFlow/issues/I7ZJRH

特性 #I883LB when线程池隔离支持

https://gitee.com/dromara/liteFlow/issues/I883LB

增强 #I821F1 检测链路的循环依赖问题

https://gitee.com/dromara/liteFlow/issues/I821F1

增强 #I7G6BB 自定义异步线程池初始化存在并发问题

https://gitee.com/dromara/liteFlow/issues/I7G6BB

增强 #I855YM sql 插件重构

https://gitee.com/dromara/liteFlow/issues/I855YM

修复 #I82M4G 回滚组件无法获得tag的问题

https://gitee.com/dromara/liteFlow/issues/I82M4G

修复 #I7ZMVM 普通组件isContinueOnError和isEnd为true时，process直接抛异常会导致isEnd失效

https://gitee.com/dromara/liteFlow/issues/I7ZMVM
```

## 如何加群

LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。

关于加群的方式，请参考：https://liteflow.cc/pages/73c2c3/

你也可以直接以下这个码来加入新群：

![](/assets/img/news/LiteFlow-2.11.1-2.png)
