---
title: Hmily分布式事务重启月度报告
author: xiaoyu
date: 2020-09-08
tag:
  - hmily
cover: /assets/img/architecture/hmily-framework.png
head:
  - - meta
    - name: 新闻
---

Hmily 是一款高性能，高可靠，易使用的柔性分布式事务解决方案，目前提供了对 dubbo，spring-cloud，motan，grpc 等 rpc 框架的支持，在易用性上提供零侵入性式的 Spring-Boot, Spring-Namespace 快速集成，目标是打造金融级的一体系分布式事务解决方案。

## 调整 Hmily 架构，更合理的模块划分

**全景图：**

![全景图](/assets/img/architecture/hmily-framework.png)

**架构调整：**

- 抽离核心执行模块，支持多种事务模式以及混合使用（TCC 模式，TAC 模式）
- 核心模块去除对 spring 的依赖
- 定义多种 SPI 接口的实现
- 新增 `hmily-rpc` : 聚合多种 rpc 框架的支持
- 新增 `hmily-spi` : hmily 框架自定义 spi 机制实现
- 新增 `hmily-bom` : 解决版本依赖管理冲突的问题
- 新增 `hmily-metrics` : 监控 JVM，线程，事务运行状态，耗时等信息
- 新增 `hmily-tcc` : tcc 模式的核心实现
- 新增 `hmily-tac` : tac 模式的核心实现

**SPI 模块划分：**

- 新增 `hmily-repository`: 事务日志存储模块，支持（mysql，oracle，postgresql，sqlserver，zookeeper，redis，mongodb，file）
- 新增 `hmily-serializer`: 事务日志序列化模块, 支持 （hessian，jdk，kryo，protobuf）
- 新增 `hmily-config`：配置模块，支持（本地模式，zookeeper，nacos，apollo，etcd）
- 新增 `hmily-tac-sqlparser` ：tac 模式下，sql 解析模块

### 梳理 Hmily 社区 issue，解决 bug。

![hmily-bug](/assets/img/architecture/hmily-bug.png)

如上图：在社区中，主要是梳理和解决之前社区反馈的问题，以及社区合作进行新的开发。

**解决 bug（列举几个）：**

- `dubbo`框架不支持注解方式的使用（spring-boot-starter-dubbo）
- `motan`框架不支持注解方式的使用
- `spring-cloud`用户如果使用 feign 与 hystrix 整合 hmily 时候的异常问题
- 事务日志序列化异常
- 超时异常事务悬挂 bug
- 事务定时恢复 bug

**社区完成功能（列举几个）：**

- `build`：新增 travis-ci 功能
- 事务日志支持：`oracle`, `postgresql`,`sqlsever`,`mongo`,`zookeeper`,`file`,`redis`
- 配置模块：新增 apollo,etcd,nacos 配置中心支持
- demo：新增 motan-rpc 方式使用 hmily 分布式事务 demo

### 社区共建

社区奉行`简单`，`快乐`，`优雅`，和`谐基`本原则。

- 代码准则：代码遵循 hmily-checkstyle 标准，也有很多灵活自由的空间。（talk is cheap ,show you code）
- 开放准则：希望在这里每个人都有好的思想和观点，大家一起讨论，反复 review 代码，思考解决 bug，快乐成长，绝不搞一言堂。

### 最近

会发布最新架构的 hmily-2.1.0 版本（只会支持 TCC 模式）

**配置模块**

- 配置动态刷新功能，支持所有的配置中心

**TAC 模式:**

- `SQL-parser`: 正在接入`apache-shardingsphere`,`apache-calcite`
- `SQL-revert`：正在开发

### 大约在冬季

很高兴来了这里季节，在这个时间点，会发布`hmily-2.2.0`版本，这个版本将完全支持`TAC`,`TCC`模式。
`TAC(transaction auto rollback)` ：有了这个模式，用户再也不用担心像 TCC 那样去写反向的 cancel 方法了。大大减少了使用成本以及学习成本。
`TCC`: 稳定性，可靠性得到大大加强，彻底解决事务悬挂问题。

### 以后的以后

- 更多 RPC 框架的支持：brpc 等等。
- 支持 XA 模式。

......这里空起来，很多多的规划，希望你来参与建设。

- github：https://github.com/dromara/hmily
- gitee：https://github.com/shuaiqiyu/hmily
- qq 群: 162614487
