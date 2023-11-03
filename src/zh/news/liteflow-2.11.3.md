---
title: LiteFlow v2.11.3发布，双11需求多变？就靠这款规则引擎了
author: LiteFlow
tag:
  - LiteFlow
date: 2023-11-01
cover: /assets/img/news/LiteFlow-2.11.3-cover.png
head:
  - - meta
    - name: 新闻
---

## LiteFlow介绍

**LiteFlow是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达6种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。**

LiteFlow是Gitee的高star项目，过去一年来保持了非常快的增长趋势。

同时LiteFlow也是国内优秀的社区驱动型开源项目，开源将近3年，目前已经被各大公司应用在核心系统上。特性以及支持度都非常好。社区人数超过3500人。测试用例1500个，质量有保障。

如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：

> 项目官网:
>
> https://liteflow.cc
>
> gitee托管仓库：
>
> https://gitee.com/dromara/liteFlow
>
> github托管仓库：
>
> https://github.com/dromara/liteflow

## 新版本简介

LiteFlow又发布新版本啦！v2.11.3这个版本主要是修复社区里提出的一些bug的版本。

v2.11.3总计有1个增强，5个修复。

对于SQL插件，可能是大家用的最多的LiteFlow插件，我们在新版本里多增加了一个enable的配置映射。使得你在数据库中可以启用和禁用某些流程和脚本。具体文档可以看SQL插件那章。

同时我们修复了2.11.0，2.11.1两个新版本发布诸多特性中遗留下来的bug。

建议在用2.11.X这个系列版本的都更新到这个版本。更新过程是平滑的。完全兼容。

我们每一个版本都在快速进步，得益于LiteFlow目前拥有一个非常强大的开源团队和一份对开源事业追求的热情。我们认真开发每一个特性，仔细对待每一个测试用例，热心回答社区每一个问题，诚恳听取大家的每一个建议，尽力修复每一个bug。

如果你想加入我们，请联系我。

最近又到了一年一度的双11了，LiteFlow目前运行在上百家公司的核心业务中。希望大家都能双11买买买，服务稳定，顺利度过双11。

## 完整更新列表

```
增强 #I8BPM9 SQL插件增加enable字段的映射

https://gitee.com/dromara/liteFlow/issues/I8BPM9

修复 #I8BPMD 修复2.11.2中启动parse两次规则的问题

https://gitee.com/dromara/liteFlow/issues/I8BPMD

修复 #I8BPHS 修复Redis配置源哨兵模式的地址检查

https://gitee.com/dromara/liteFlow/issues/I8BPHS

修复 #I8AWHT LiteFlowChainELBuilder.validate()存在bug

https://gitee.com/dromara/liteFlow/issues/I8AWHT

修复 #I8AR0L 组件定义了重试和回滚，回滚也会被重试

https://gitee.com/dromara/liteFlow/issues/I8AR0L

修复 #I8AF1O 修复redis的订阅模式mode解析的bug

https://gitee.com/dromara/liteFlow/issues/I8AF1O
```