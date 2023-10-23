---
title: LiteFlow v2.10.5发布，这个强大的规则引擎值得一用
author: 铂赛东
tag:
  - LiteFlow
date: 2023-06-26
cover: /assets/img/news/LiteFlow-2.10.5-1.png
head:
  - - meta
    - name: 新闻
---

## LiteFlow 介绍

**LiteFlow 是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达 6 种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。**

LiteFlow 也是 Gitee 的高 star 项目，过去一年来保持了非常快的增长趋势。

同时 LiteFlow 也是国内优秀的社区驱动型开源项目，开源将近 3 年，目前已经被各大公司应用在核心系统上。特性以及支持度都非常好。社区人数超过 3000 人。

如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：

> 项目官网:
>
> https://liteflow.yomahub.com
>
> gitee 托管仓库：
>
> https://gitee.com/dromara/liteFlow
>
> github 托管仓库：
>
> https://github.com/dromara/liteflow

## LiteFlow v2.10.5

v2.10.5 版本主要就是对日志从底层进行架构改造。增加了支持传入自定义的请求 ID。

以及修复了一些循环表达式中的 Bug。

我们对日志进行了大幅度的改造，支持了自定义的 RequestId 传入，这个特性可以很方便的和你自己系统的 traceId 进行集成。

你可以调用如下方法来传入一个已有的 requestId：

```
LiteflowResponse response = flowExecutor.execute2RespWithRid("chain1", arg, "T001234", YourContext.class);
```

那么，这个链路中所有的框架日志都会带有\[T001234\]这个传入的 ID 前缀了。

另外新版本的 LiteFlow 还提供了一个日志包装类。只要你在组件中把 slf4j 的日志声明换成如下形式，那么你在组件中自己打出的日志也会带有请求 ID 前缀。

```
private final LFLog logger = LFLoggerManager.getLogger(FlowExecutor.class);
```

其中`LFLog`这个类是继承自 slf4j 的`Logger`类的，所以它的使用方式和`Logger`是完全一致的。

你只需要把定义换一下就 ok 了。

如果在一个链路中相同请求的日志都拥有同一个请求 ID，那么对于定位问题来说，会很方便。推荐大家使用此特性。

## 循环场景中的一些 bug 的修复

看来大家对循环特性使用的还是比较多的。在使用的过程中，社区内也给出了很多反馈意见。

可能是之前对循环定义的测试用例有些少了，所以对于一些场景没覆盖到。这次修复了社区内提供的 2 个 Bug。

同时也补全了测试用例。

## 完整更新列表

```
增强 #I7F567 增加对业务自定义requestId传入的支持

https://gitee.com/dromara/liteFlow/issues/I7F567

修复 #I7EKS8 在isAccess中进行setIsEnd(true)流程没有结束的问题

https://gitee.com/dromara/liteFlow/issues/I7EKS8

修复 #I7EKP3 同一个线程里分别调用2个Chain，currObj没有隔离的情况

https://gitee.com/dromara/liteFlow/issues/I7EKP3

修复 #I7E8RN 次数循环组件 下标获取问题

https://gitee.com/dromara/liteFlow/issues/I7E8RN
```

## 支持和赞助 LiteFlow

开源一个项目并坚持 2 年并不容易，如果各位对 LiteFlow 这个项目有信心并且愿意支持的话，可以在官网首先点击\*`给LiteFlow发电`\*按钮。

但不管你是否选择赞助，我仍然会在社区里尽可能的解决你们的问题。

社区里的问题太多，如果没回答上，请多艾特我几遍。

## 如何加群

LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。

关于加群的方式，请参考：https://liteflow.yomahub.com/pages/73c2c3/
