---
title: 动态线程池框架DynamicTp v1.1.4大版本发布，新增若干实用特性
author: DynamicTp
date: 2023-09-26
cover: /assets/img/news/DynamicTp-1.1.4-cover.png
head:
  - - meta
    - name: 新闻
---

## DynamicTp 简介

DynamicTp 是一个基于配置中心实现的轻量级动态线程池监控管理工具，主要功能可以总结为动态调参、通知报警、运行监控、三方包线程池管理等几大类。

## DynamicTp 特性

- **代码零侵入**：我们改变了线程池以往的使用姿势，所有配置均放在配置中心，服务启动时会从配置中心拉取配置生成线程池对象放到 Spring 容器中，使用时直接从 Spring 容器中获取，对业务代码零侵入
- **通知告警**：提供多种报警维度（配置变更通知、活性报警、容量阈值报警、拒绝触发报警、任务执行或等待超时报警），已支持企业微信、钉钉、飞书、邮件报警，同时提供 SPI 接口可自定义扩展实现
- **运行监控**：定时采集线程池指标数据，支持通过 MicroMeter、JsonLog 日志输出、Endpoint 三种方式，可通过 SPI 接口自定义扩展实现
- **任务增强**：提供任务包装功能，实现 TaskWrapper 接口即可，如 MdcTaskWrapper、TtlTaskWrapper、SwTraceTaskWrapper，可以支持线程池上下文信息传递
- **多配置中心支持**：基于主流配置中心实现线程池参数动态调整，实时生效，已支持 Nacos、Apollo、Zookeeper、Consul、Etcd、Polaris、ServiceComb，同时也提供 SPI 接口可自定义扩展实现
- **中间件线程池管理**：集成管理常用第三方组件的线程池，已集成 Tomcat、Jetty、Undertow、Dubbo、RocketMq、Hystrix、Grpc、Motan、Okhttp3、Brpc、Tars、SofaRpc、RabbitMq 等组件的线程池管理（调参、监控报警）
- **轻量简单**：基于 SpringBoot 实现，引入 starter，接入只需简单 4 步就可完成，顺利 3 分钟搞定
- **多模式**：提供了增强线程池 DtpExecutor，IO 密集型场景使用的线程池 EagerDtpExecutor，调度线程池 ScheduledDtpExecutor，有序线程池 OrderedDtpExecutor，可以根据业务场景选择合适的线程池
- **兼容性**：JUC 普通线程池和 Spring 中的 ThreadPoolTaskExecutor 也可以被框架管理，@Bean 定义时加 @DynamicTp 注解即可
- **可靠性**：框架提供的线程池实现 Spring 生命周期方法，可以在 Spring 容器关闭前尽可能多的处理队列中的任务
- **高可扩展**：框架核心功能都提供 SPI 接口供用户自定义个性化实现（配置中心、配置文件解析、通知告警、监控数据采集、任务包装等等）
- **线上大规模应用**：参考美团线程池实践，美团内部已经有该理论成熟的应用经验

## v1.1.4 发版记录

- 支持 Spring 项目，SpringBoot 相关特性只在 starter 模块引入，@dragon-zhang
- 添加 jvmti 黑科技模块，方便集成管理各种三方包线程池，@dragon-zhang
- 升级 VariableLinkedBlockingQueue 到 jdk1.8 的 LinkedBlockingQueue 的实现，@yanhom
- 添加插件机制，基于此可以对框架做自定义开发扩展，@WindSearcher
- 细化告警配置，支持不同告警项配置不同接受人，@kyao
- 通知告警平台支持云之家，@chunhui_lu
- 支持 SpringBoot 1.x，@yanhom
- 第三方线程池（tomcat、undertow、dubbo、rocketmq、okhttp3 等等）支持 run_timeout、queue_timeout、reject 告警，@kyao，@yanhom
  ![](/assets/img/news/DynamicTp-1.1.4-1.png)

- 提供 Aware 扩展，可以扩展自定义线程池执行过程，@kyao
- 监控数据新增线程池别名，@zhifei

#### Bugfix

- 修复 Tomcat 高低版本兼容性报错问题，@yanhom
- 修复其他 agent 增强线程池后，强转 DtpRunnable 失败的问题，@yanhom
- 修复企微告警无@提醒的问题，@yanhom
- 修复企微告警配置多个接受人不能正确@的问题，@KamToHung
- 修复钉钉告警不能@所有人问题，@chenan
- 修复因 Bean 初始化顺序不确定导致的 ApplicationContextHolder npe 问题，@yanhom
- 修复修复拒绝策略为 CallerRunsPolicy 时，MdcRunnable 会删除主线程 mdc 信息的问题，@kyao

#### Optimize

- 优化 dtp 内部 spi 的使用，统一封装管理，@peachyy
- 部分代码优化重构，@yanhom，@KamToHung，@dragon-zhang，@kyao
- 告警信息优化，trace 信息可以自己扩展，集成内部 ELK 等平台，@yanhom

![](/assets/img/news/DynamicTp-1.1.4-2.png)

## 项目地址

**官网**：https://dynamictp.cn<sup>[1]</sup>

**gitee 地址**：https://gitee.com/dromara/dynamic-tp<sup>[2]</sup>

**github 地址**：https://github.com/dromara/dynamic-tp<sup>[3]</sup>

## 加入社群

**看到这儿，方便的话给项目一个 star，你的支持是我们前进的动力！**

使用过程中有任何问题，或者对项目有什么想法或者建议，可以加入社群，跟群友一起交流讨论。

新增分群 4，可以自行扫码加入，或者加我微信拉入其他群！

<img src="/assets/img/news/DynamicTp-1.1.4-3.jpg" height="340">
<br>
<img src="/assets/img/news/DynamicTp-1.1.4-4.png" height="340">

https://dynamictp.cn

https://gitee.com/dromara/dynamic-tp

https://github.com/dromara/dynamic-tp
