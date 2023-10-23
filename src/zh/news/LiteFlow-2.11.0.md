---
title: 新的面貌！LiteFlow发布大版本v2.11.0，五大新特性，国内新一代的规则引擎！
author: LiteFlow
tag:
  - LiteFlow
date: 2023-09-01
cover: /assets/img/news/LiteFlow-2.11.0-cover.png
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

## v2.11.0 介绍

v2.11.0 是一个大版本，LiteFlow 提供了 5 个大的新特性，以及 3 个加强，2 个 bug 修复。

LiteFlow 同时更换了新的项目 Logo 和启动了新的域名。

LF 在这个版本改头换面，以全新的姿态继续向前冲~

## 新的项目 LOGO

![](/assets/img/news/LiteFlow-2.11.0-1.png)

感谢设计师`Evan Lou`的帮助，为 LiteFlow 带来了全新的 Logo。🤙

新 Logo 寓意：

1.整体是一片树叶形状，树叶既代表了轻量，也象征着 LiteFlow 会一直像树叶那样进行光合作用，释放氧气。

2.叶子里的叶脉是一个 L 和 F 的交错变体，象征着 LiteFlow 的缩写。

3.叶脉简单且延展开，象征流程的分叉。

4.整个叶子被叶脉分隔成 4 部分，象征着编排，4 个不同的部分组成了一片完美的叶子。

## 启用全新域名

LiteFlow 在 v2.11.0 启用了全新的域名：https://liteflow.cc。简单且好记。

同时老的域名也是可以访问的，会自动重定向到新的域名上。

## 新的 Slogan

LiteFlow 会从 2.11.0 这个版本开始，为每一个版本都设计一句 Slogan。

这个版本的 Slogan 为：`Keep on the light side`。

中文寓意为：`逐光而行`。

这句 Slogan 一语双关，其中`light`谐音`lite`，表示我们会一直坚持 LiteFlow 的开源迭代。

逐光而行，我希望我自己可以践行，人总要需要一道光来照亮生命，我们疲惫且努力的追逐那道光，远离黑暗。

## 特性 1：能够用 Java 原生语言来写脚本

丰富的脚本语言支持是 LiteFlow 的一大特色，脚本语言轻巧，能否被即时刷新的特点受到了很多开发者的喜爱。

LiteFlow 之前支持了挺多的脚本语言，分别是：Groovy，Javascript，Python，QLExpress，Lua，Aviator。

但是不同的语言有不同的语法结构，很多不熟悉的这些语言写法的同学可能还要花点时间去学习该如何写。

这次版本 LiteFlow 支持了原生 Java 脚本语言的写法，这意味着你可以无学习成本的直接在脚本里用 Java 来书写逻辑。

![](/assets/img/news/LiteFlow-2.11.0-2.png)

关于 Java 脚本语言的详细文档请参照官网中`脚本组件->脚本语言种类->Java脚本引擎`。

## 特性 2：支持了 Redis 中存储规则和脚本

LiteFlow 支持丰富的存储插件，所有的关系型数据库以及各种注册中心。

这次我们新增了 Redis 插件，用 Redis 来存储规则以及脚本。Redis 在各大企业中用的比较多。为了保证使用的多样性。我们甚至开发了 2 种模式：`轮询拉取模式`和`订阅模式`，各有特点。

其中轮询拉取模式，我们做了非常多的优化，我们对每一个脚本和规则生成了指纹，只比对指纹，而非拉取整个数据，消耗极小。

订阅模式非常实时，但是需要你用`Redission`框架来操作 Redis，算有一定的使用限制。具体选用哪种模式，交由开发者来决定。

关于 redis 插件的详细文档请参照官网中`规则文件->Redis配置源`。

## 特性 3：全方位的超时控制

在以前的 LiteFlow 版本中，超时控制只能针对`WHEN`表达式，且是全局配置。

在新版本中，我们支持了全方位的超时控制体系，一个`maxWaitSeconds`关键字可对任意的组件、表达式、流程进行超时控制。

对任意表达式的控制：

```
<chain name="chain1">
    THEN(a,b).maxWaitSeconds(5);
</chain>
<chain name="chain1">
    FOR(2).DO(a).maxWaitSeconds(3);
</chain>
```

对组件的超时控制

```
<chain name="chain1">
    WHEN(
        a.maxWaitSeconds(2),
        b.maxWaitSeconds(3)
    );
</chain>
```

对子流程的超时控制

```
<chain name="testChain">
    THEN(b)
</chain>
<chain name="chain">
    testChain.maxWaitSeconds(3);
</chain>
```

关于这块的详细文档请参考官网文档中的`高级特性->超时控制`。

## 特性 4：异步循环模式

经常群里的小伙伴会反映：LiteFLow 的循环体系只支持同步，如果能支持异步就好了。

这个版本我们支持了！对三种循环模式都予以了异步支持。

```
<chain name="chain1">
   FOR(2).parallel(true).DO(THEN(a,b,c));
</chain>
<chain name="chain2">
    WHILE(x).parallel(true).DO(THEN(a,b,c));
</chain>
<chain name="chain3">
    ITERATOR(x).parallel(true).DO(THEN(a,b,c));
</chain>
```

一个`parallel`关键字搞定。是不是很简单？

关于异步循环的详细文档请参考官网文档中的`高级特性->异步循环模式`。

## 特性 5：组件回滚

这也就是所谓的逆操作。LiteFlow 从这个版本开始有逆向操作了！LiteFlow 会自动帮你记录执行的顺序，当某个组件抛出异常时，会自动按实际执行的顺序进行逆操作。

这一切的前提只需要你在组件中实现`rollback`方法。

在自动执行完回滚操作后，LiteFlow 的日志还会把回滚的步骤都打出来，让你一目了然。

```
@LiteflowComponent("a")
public class ACmp extends NodeComponent {

    @Override
    public void process() {
        //do your biz
    }

    @Override
    public void rollback() throws Exception {
        //do your biz
    }
}
```

关于组件回滚的详细文档请参考官网文档中的`高级特性->组件回滚`。

## 测试用例增加到 1200 个左右

我相信，一个开源框架的上限是看这个框架所解决的问题和这个框架提供的特性和设计。而下限则是这个开源框架的测试用例的完备性。

我们不仅要开疆拓土，提供新特性和新的探索，也要守疆土，确保整体稳定性和质量。

我们这次将测试用例数量提高到近 1200 个，几乎覆盖到了所有的地方。

大家可以放心用。我们也有完备的社区和组织，社区目前拥有 3500 人左右。

## PPT 更新

官网提供的 PPT 同步更新到 v2.11.0 这个版本。

获取 PPT 的方式请参考：https://liteflow.cc/pages/8d6666/

## 完整更新列表

```
更新列表

特性 #I7V6VB 建议增加Janino插件，支持java脚本的书写

https://gitee.com/dromara/liteFlow/issues/I7V6VB

特性 #I7T53A 增加Redis存储规则的支持

https://gitee.com/dromara/liteFlow/issues/I7T53A

特性 #I7I3LL 允许对EL中的每⼀个组件设置超时时间控制

https://gitee.com/dromara/liteFlow/issues/I7I3LL

特性 #I7HJFX 循环表达式中支持异步模式

https://gitee.com/dromara/liteFlow/issues/I7HJFX

特性 #I590JT 对于回滚流程的支持

https://gitee.com/dromara/liteFlow/issues/I590JT

增强 #I7QC8V SQL插件格式化加入CDATA

https://gitee.com/dromara/liteFlow/issues/I7QC8V

增强 #I7Q8BX 部分代码有NPE风险

https://gitee.com/dromara/liteFlow/issues/I7Q8BX

增强 #I7Q4BN 默认主线程池的名称拼写

https://gitee.com/dromara/liteFlow/issues/I7Q4BN

修复 #I7WNDA SQLException: 使用druid+oracle会报出关闭的语句错误

https://gitee.com/dromara/liteFlow/issues/I7WNDA

修复 #I7TYS3 当组件出现Exception的时候，afterProcess获取不到

https://gitee.com/dromara/liteFlow/issues/I7TYS3
```

## 支持和赞助 LiteFlow

开源一个项目并坚持 2 年并不容易，如果各位对 LiteFlow 这个项目有信心并且愿意支持的话，可以在官网首先点击 `给LiteFlow发电` 按钮。

但不管你是否选择赞助，我仍然会在社区里尽可能的解决你们的问题。

社区里的问题太多，如果没回答上，请多艾特我几遍。

## 如何加群

LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。

关于加群的方式，请参考：https://liteflow.cc/pages/73c2c3/

你也可以直接以下这个码来加入新群：

<img src="/assets/img/news/LiteFlow-2.11.0-3.png" height="340">
