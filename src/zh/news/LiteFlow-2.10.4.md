---
title: LiteFlow v2.10.4发布，规则引擎之路进行到底
author: 铂赛东
tag:
  - LiteFlow
date: 2023-06-13
cover: /assets/img/news/LiteFlow-2.10.4.png
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

## LiteFlow v2.10.4

本次新版本主要为增强版本。修复了一些使用中碰到的 Bug。部分代码作了一些增强。

本次更新总共为 4 个 issue。

感谢社区里那么多的使用者给我提出很多宝贵的意见。

本次更新列表：

```
增强 #I6XPN4 组件上添加 @RefreshScope 初始化就失败了

https://gitee.com/dromara/liteFlow/issues/I6XPN4

修复 #I7C6VR ELIF表达式中目前无法加入AND OR NOT表达式

https://gitee.com/dromara/liteFlow/issues/I7C6VR

修复 #I7CCAB 2.10.0中CatchCondition会把ChainEndException也捕获

https://gitee.com/dromara/liteFlow/issues/I7CCAB

修复 #I7COX4 SWITCH跳转到设置tag的chain上，存在问题

https://gitee.com/dromara/liteFlow/issues/I7COX4
```

## 低头砍树，抬头看路

距离上次发版已经有一个多月了。

很明显，我放慢了发版的速度。以前一个礼拜一个版本的速度让我觉得过于快了，有时候抬起头去看看方向也是非常重要的。

在之前的迭代版本中，LiteFlow 大体上经历了 4 个阶段：

1.从标签式流程全面转向 EL 表达式流程，这个阶段奠定了 LiteFlow 的核心语法结构。

2.语法构造阶段，重写了所有的语法底层解析。使得底层更加坚固。

3.插件化扩展阶段，设计了除了核心之外所有一切均可为插件的架构，并在插件架构上逐渐推出了 6 种脚本插件和 5 种存储插件。

4.语义扩展阶段，增加了非常多的新的语法，使得在语义方面更加完善。

而在以后，LiteFlow 在之前打下的基础上，会往以下几个方向进行深度拓展：

1.推出更加高级的语法装配 API

2.开放自定义语法的扩展 API

3.丰富元数据，开放元数据的分析 API

4.重做监控，推出基于 Prometheus 的 Grafana 大盘，能监控到每一个节点的各项指标数据

5.提供规则和脚本版本概念，加入回滚，覆盖，多版本本并行等特性。

6.基于语法装配 API，提供后台管理动态生成规则。并可对规则进行全方位的界面式管理

所以，LiteFlow 会一直是一个长期维护，并不断进化的国产开源规则引擎。正如我在官网中写的那样：我希望可以把 LiteFlow 这个项目带入中国顶尖开源软件的行列。

LiteFlow 这个项目并不是属于作者一个人的，它同样属于团队成员，属于那么多的贡献者，属于社区。

我希望有更多的人来参与这个项目，参与开源。

LiteFlow 在今年夏天也参加了中国科学院软件研究所发起的开源软件供应链点亮计划-《开源之夏 2023》，比较意外的是，有非常多的同学报名了 LiteFlow 的相关课题的研究。除了中选课题的同学之外，我也邀请了一些优秀的同学来参与其他课题的研究。

希望你们都能顺利通过课题，成为团队的成员，为 LiteFlow 项目添砖加瓦。

## 支持和赞助 LiteFlow

开源一个项目并坚持 2 年并不容易，如果各位对 LiteFlow 这个项目有信心并且愿意支持的话，可以在官网首先点击\*`给LiteFlow发电`\*按钮。

但不管你是否选择赞助，我仍然会在社区里尽可能的解决你们的问题。

社区里的问题太多，如果没回答上，请多艾特我几遍。

## 如何加群

LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。

关于加群的方式，请参考：https://liteflow.yomahub.com/pages/73c2c3/
