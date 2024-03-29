---
title: LiteFlow v2.10.6发布！一款社区驱动型优秀的规则引擎框架
author: 铂赛东
tag:
  - LiteFlow
date: 2023-07-24
cover: /assets/img/news/LiteFlow-2.10.6-cover.jpg
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

## 前言

v2.10.6 版本是一个进行诸多增强的版本。总计有 11 个 issue 的增强，3 个 issue 的修复。

## 全面支持 JDK17

其实 LiteFlow 在 2.10.0 的时候，已经支持了 JDK17。但是项目并未对 JDK17 进行完整的测试。导致很多小伙伴实际在 JDK17 环境中跑起来，出现了一些问题。

这是由于 LiteFlow 的 900 多个测试用例全部都是针对于 JDK8 来跑的。并未在 JDK17 下进行完整的测试。

而 2.10.6 这个版本，我们系统的针对 JDK17 进行了完整的测试。通过了全部的测试用例。所以大家可以放心的使用。

当然，LiteFlow 也是支持 Springboot3 的。

有的同学可能会问，JDK20 支持不支持？其实连作者自己也不知道是否支持 JDK20，因为没有进行系统的测试过。这版本太新了。

## 支持 SQL 插件使用自己定义的数据源

LiteFlow 支持将 EL 表达式，脚本存放在所有的关系型数据库中。但是之前的版本，LiteFlow 有自己的一套数据库连接配置，这就导致了往往使用者同一套数据库配置要配置 2 遍，还有一些使用者在实际的环境中，可能数据源是加密的，或者数据源是从外部获取的。这就没法使用 LiteFlow 提供的数据源配置了。

所以，这次我们支持了让 SQL 插件能够使用项目内的数据源来获取数据。更加优雅和方便。

甚至于我们还考虑到了多数据源的场景，让 LiteFlow 能够智能的挑选正确的数据源。

## LiteFlow 的测试用例全面转向 Junit5

这也许和使用者没啥太大关系。

LiteFlow 这个框架功能点非常多，使用人数也非常庞大。所以每一次发版，我都需要补很多测试用例。测试用例是 LiteFlow 整个框架质量的命脉。甚至于测试用例成为了和核心代码一样重要的存在。所以 LiteFlow 目前有将近 1000 个测试用例。

在 2.10.6 版本的源代码中，所有的测试用例从原先的 Junit4 全部转向了 Junit5。更加稳定。更加有保障。

## 对脚本和 Java 的联动进行加强

主要加强点在`@ScriptBean`这个注解，这个是脚本和 Java 联动的关键注解，在社区群里，有同学报出这个注解有时无法正常的工作，导致脚本拿不到 Java 的对象。对这个问题，我进行了深入研究。在 2.10.6 版本中，对这个注解进行了很多的优化，应该能彻底解决之前的问题。

## 对声明式组件增加了组件名称的设定

在 2.10.6 版本中，声明式组件支持了声明`nodeName` 这个属性了。

## 错误事件通知的改造

原先错误事件回调通知是这样定义的：

```
public void onError() throws Exception;
```

这样定义导致有些同学不知道如何取`Exception`，为了使 api 更加友好，这次这个回调方法改成了如下形式：

```
public void onError(Exception e) throws Exception;
```

## 全局拦截器的改造

原先全局拦截器的定义如下：

```
@Component
public class CmpAspect implements ICmpAroundAspect {
    @Override
    public void beforeProcess(String nodeId, Slot slot) {
        YourContextBean context = slot.getContextBean(YourContextBean.class);
        //before business
    }

    @Override
    public void afterProcess(String nodeId, Slot slot) {
        YourContextBean context = slot.getContextBean(YourContextBean.class);
        //after business
    }
}
```

这种方式无法直观的拿到很多信息，为了 api 更加友好，这次我们改造了这个接口的实现参数：

```
@Component
public class CmpAspect implements ICmpAroundAspect {
    @Override
    public void beforeProcess(NodeComponent cmp) {
        YourContextBean context = cmp.getContextBean(YourContextBean.class);
        //before business
    }

    @Override
    public void afterProcess(NodeComponent cmp) {
        YourContextBean context = cmp.getContextBean(YourContextBean.class);
        //after business
    }
}
```

## 布尔表达式中`OR`的短路判断

在社区中有同学反应，如果有以下 EL 语句：

```
IF(OR(a,b,c), x);
```

如果 a 返回 true，那其实 b 和 c 应该不用执行，而事实情况是 LiteFlow 把 a,b,c 都执行了。

所以这次我们也收到了贡献者的 PR，把这个问题给优化了。

## 同一个组件复用时 Step 的记录问题

`LiteflowResponse`的 step 可以用来回溯整个链路的实际执行情况。但是在相同组件复用的情况下，这个 step 的记录在之前版本中有些问题。此次我们也修复了这个问题。

## 日志方面的增强

在 2.10.6 版本中，系统默认会以 info 级别打出所有的节点的耗时信息。

如果觉得日志太多的话，可以通过设置`liteflow.print-execution-log=false`来进行关闭整个 LiteFlow 框架的系统日志。

## 完整更新列表

```
增强 #I7KR2F 测试用例全面更新为junit5

https://gitee.com/dromara/liteFlow/issues/I7KR2F

增强 #I7J59V java17下进行完整的测试用例测试

https://gitee.com/dromara/liteFlow/issues/I7J59V

增强 #I7KZCZ 希望可以使用配置文件中已经配置的数据源

https://gitee.com/dromara/liteFlow/issues/I7KZCZ

增强 #I7KY2N 非操作符的短路控制优化

https://gitee.com/dromara/liteFlow/issues/I7KY2N

增强 #I7HPAN onError方法增加Exception入参

https://gitee.com/dromara/liteFlow/issues/I7HPAN

增强 #I7KOPV 声明组件增加nodeName的定义

https://gitee.com/dromara/liteFlow/issues/I7KOPV

增强 #I7KHE5 关于注解声明式使用场景LiteFlowMethodEnum增加getDisplayName

https://gitee.com/dromara/liteFlow/issues/I7KHE5

增强 #I7K3T1 自带AOP拦截需要增强获取tag等信息

https://gitee.com/dromara/liteFlow/issues/I7K3T1

增强 #I7JZ4D 希望框架有与或非表达式的相关日志

https://gitee.com/dromara/liteFlow/issues/I7JZ4D

增强 #I7J1VJ 希望针对节点执行耗时的打印日志支持控制

https://gitee.com/dromara/liteFlow/issues/I7J1VJ

增强 #I7LGZR 忘记填写 chainName 的错误提示

https://gitee.com/dromara/liteFlow/issues/I7LGZR

修复 #I7L5DX 2.10.5版本中ScriptBean注解注入bean失败

https://gitee.com/dromara/liteFlow/issues/I7L5DX

修复 #I7HTR4 同一组件不同tag，取step时候存在问题

https://gitee.com/dromara/liteFlow/issues/I7HTR4

修复 #I7GMTS 本地文件监听异常会导致监听线程停止

https://gitee.com/dromara/liteFlow/issues/I7GMTS
```

## LiteFlow 发展路线

有可能 2.10.6 版本是 2.10.X 系列的最后一个版本了。

接下去就是 v2.11.0 了，v2.11.0 会带来超多的新增特性。v2.11.X 系列的主旋律将围绕着元数据增强进行展开。也为后续的管理平台系列打下一个基础。

回答个大家最想问的问题，问题省略，答案如下：2.11.0 版本没有 UI，UI 没有那么快。计划今年推出，需要开发的。作者也有工作，需要投入大量业余时间的。但是既然我上次已经调查过了，自然会用心去做这个规划。

## 支持和赞助 LiteFlow

开源一个项目并坚持 2 年并不容易，如果各位对 LiteFlow 这个项目有信心并且愿意支持的话，可以在官网首先点 `给LiteFlow发电` 按钮。

但不管你是否选择赞助，我仍然会在社区里尽可能的解决你们的问题。

社区里的问题太多，如果没回答上，请多艾特我几遍。

## 如何加群

LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。

关于加群的方式，请参考：https://liteflow.yomahub.com/pages/73c2c3/
