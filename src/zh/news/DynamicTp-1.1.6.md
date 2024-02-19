---
title: 动态线程池框架1.1.6发布，支持springboot3
author: DynamicTp
date: 2023-12-19
cover: /assets/img/news/DynamicTp-1.1.4-cover.png
head:
  - - meta
    - name: 新闻
---

## DynamicTp 简介

DynamicTp 是一个基于配置中心实现的轻量级动态线程池监控管理工具，主要功能可以总结为动态调参、通知报警、运行监控、三方包线程池管理等几大类。

![](/assets/img/news/DynamicTp-1.1.4-cover.png)

## DynamicTp 特性

**经过多个版本的迭代，目前最新版本 v1.1.6.1 具有以下特性** ✅

- **代码零侵入**：我们改变了线程池以往的使用姿势，所有配置均放在配置中心，服务启动时会从配置中心拉取配置生成线程池对象放到 Spring 容器中，使用时直接从 Spring 容器中获取，对业务代码零侵入
- **通知告警**：提供多种通知告警维度（配置变更通知、活性报警、队列容量阈值报警、拒绝触发报警、任务执行或等待超时报警），触发配置阈值实时推送告警信息，已支持企微、钉钉、飞书、邮件、云之家报警，同时提供 SPI 接口可自定义扩展实现
- **运行监控**：定时采集线程池指标数据（20 多种指标，包含线程池维度、队列维度、任务维度、tps、tp99 等），支持通过 MicroMeter、JsonLog 两种方式，也可以通过 SpringBoot Endpoint 端点实时获取最新指标数据，同时提供 SPI 接口可自定义扩展实现
- **任务增强**：提供任务包装功能（比 Spring 线程池任务包装更强大），实现 TaskWrapper 接口即可，如 MdcTaskWrapper、TtlTaskWrapper、SwTraceTaskWrapper、OpenTelemetryWrapper，可以支持线程池上下文信息传递
- **多配置中心支持**：支持多种主流配置中心，包括 Nacos、Apollo、Zookeeper、Consul、Etcd、Polaris、ServiceComb，同时也提供 SPI 接口可自定义扩展实现
- **中间件线程池管理**：集成管理常用第三方组件的线程池，已集成 Tomcat、Jetty、Undertow、Dubbo、RocketMq、Hystrix、Grpc、Motan、Okhttp3、Brpc、Tars、SofaRpc、RabbitMq 等组件的线程池管理（调参、监控报警）
- **轻量简单**：使用起来极其简单，引入相应依赖，接入只需简单 4 步就可完成，顺利 3 分钟搞定，相当丝滑
- **多模式**：提供了增强线程池 DtpExecutor，IO 密集型场景使用的线程池 EagerDtpExecutor，调度线程池 ScheduledDtpExecutor，有序线程池 OrderedDtpExecutor，可以根据业务场景选择合适的线程池
- **兼容性**：JUC 普通线程池和 Spring 中的 ThreadPoolTaskExecutor 也可以被框架管理，@Bean 定义时加 @DynamicTp 注解即可
- **可靠性**：依靠 Spring 生命周期管理，可以做到优雅关闭线程池，在 Spring 容器关闭前尽可能多的处理队列中的任务
- **高可扩展**：框架核心功能都提供 SPI 接口供用户自定义个性化实现（配置中心、配置文件解析、通知告警、监控数据采集、任务包装等等）
- **线上大规模应用**：参考美团线程池实践，美团内部已经有该理论成熟的应用经验

## v1.1.6.1 发版记录

#### Feature

- 支持 springboot3、jdk17、spring6，@KamToHung，@dragon-zhang，@yanhom
- 支持 springboot 1.x、springboot 2.0.x、spring 5.0.x 等低版本，@yanhom
- 新增初始化器 DtpInitizlizer SPI 接口，可以在框架启动前做一些自定义初始化操作，@yanhom
- 支持兼容 skywalking 9.0 引入的线程池插件，1.1.5 版本在跟 skywalking 线程池插件一起使用有内存泄露问题，@yanhom
- 告警信息里新增堆内存占比相关信息，@yanhom
- 配置文件配置 dynamictp 时，新增 DtpProperties 相关属性字段自动提示功能，@yanhom

#### Bugfix

- 修复 allowCoreThreadTimeOut 参数为 true 时，ScheduledDtpExecutor 初始化失败的问题，@kyao
- 修复 ExecutorWrapper#threadPoolStatProvider 成员属性初始化失败问题，@KamToHung
- 修复 ALARM_EXECUTOR 没有移除 traceId，导致告警信息里的 traceId 错乱问题，@yanhom
- 修复线程池别名不一致导致 Prometheus 指标上报失败问题，@androidcj
- 修复使用注解注入 ScheduledThreadPoolExecutor 线程池报错的问题，@kyao
- 修复 ScheduledDtpExecutor 不支持超时告警的问题，@kyao
- 修复 alibaba dubbo 初始化失败问题，@yanhom

#### Optimize

- ThreadPoolBuilder、ThreadPoolCreator 方法完善丰富，@yanhom
- 优化 tps、tp99 等指标监控相关代码，@yanhom
- DtpProperties 配置类中一些字段默认值调整，enabledCollect=true，waitForTasksToCompleteOnShutdown=true，awaitTerminationSeconds=3，@yanhom
- 优化 JVMTI 相关模块，@dragon-zhang，@yanhom
- 完善 example，@yanhom
- 部分代码优化重构，@yanhom
- hutool、sc、sca、sb 等依赖版本升级，@yanhom

#### Refactor

- 重构 NacosRefresher，去掉在配置中手动指定线程池配置文件 data-id，降低接入成本，@wuhui
- 重构 ApolloRefresher，去掉在配置中手动指定线程池配置文件 namespace，降低接入成本，@BanTanger
- 重构所有 cloud 模块的 refresher，通过监听 EnvironmentChangeEvent 事件，更精准的判断是否线程池配置变动进行刷新，@yanhom

## maven 依赖

**springboot3 以上用 1.1.6.1-3.x，以下用 1.1.6.1**

## 加入社群

**看到这儿，方便的话给项目一个 star，你的支持是我们前进的动力！**

使用过程中有任何问题，或者对项目有什么想法或者建议，可以加入社群，跟 1000+ 群友一起交流讨论。

加我 vx 拉群，备注 dynamic-tp。

![](/assets/img/news/DynamicTp-1.1.4-4.png)

## 项目地址

**官网**：https://dynamictp.cn\[1\]

**gitee 地址**：https://gitee.com/dromara/dynamic-tp\[2\]

**github 地址**：https://github.com/dromara/dynamic-tp\[3\]
