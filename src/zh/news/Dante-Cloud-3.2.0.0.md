---
title: Dante Cloud 3.2.0.0 发布，首个适配 Spring Boot 3.2版本及经验分享
author: dnate cloud
tag:
  - Dante-Cloud
date: 2023-12-08
cover: /assets/img/news/Dante-Cloud-3.1.3.0-cover.png
head:
  - - meta
    - name: 新闻
---

**Dante Cloud** (但丁，原 Eurynome Cloud) 是一款企业级微服务架构和服务能力开发平台，是采用领域驱动模型 (DDD) 设计思想的、全面拥抱 **Spring Authorization Server** 的、基于 **OAuth2.1** 协议的、支持智能电视、IoT 等物联网设备认证的微服务架构。基于 **Spring Authorization Server** 1.2.0、**Spring Boot** 3.2.0、**Spring Cloud** 2023.0.0、**Spring Cloud Tencent** 1.12.4-2022.0.4、**Spring Cloud Alibaba** 2022.0.0.0、**Nacos** 2.3.0 等主流技术栈开发的多租户系统，遵循 SpringBoot 编程思想，高度模块化和可配置化。具备服务发现、配置、熔断、限流、降级、监控、多级缓存、分布式事务、工作流等功能。

**定位**

- 构建成熟的、完善的、全面的，基于 OAuth2.1 的、前后端分离的微服务架构解决方案。
- 面向企业级应用和互联网应用设计开发，既兼顾传统项目的微服务化，又满足互联网应用开发建设、快速迭代的使用需求。
- 平台架构使用微服务领域及周边相关的各类新兴技术或主流技术进行建设，是帮助快速跨越架构技术选型、研究探索阶段的利器。
- 代码简洁规范、结构合理清晰，是新技术开发应用的典型的、综合性案例，助力开发人员对新兴技术的学习和掌握。

## \[1\] 软件信息

- 软件组成

- 核心组件：https://gitee.com/herodotus/dante-engine（已上传中央库）
- 后端工程：https://gitee.com/dromara/dante-cloud
- 前端工程：https://gitee.com/herodotus/dante-cloud-ui

- 软件生态

- Dante Cloud Athena（Dante Cloud 单体版）：https://gitee.com/herodotus/dante-cloud-athena
- Dante OSS （像 JPA 一样操作 OSS）：https://gitee.com/herodotus/dante-oss

- 软件文档

- 《Dante Cloud 及相关知识学习方法和学习路径的建议》
- 《OAuth 2 中的 Scope 与 Role 深度解析》
- 《Spring Boot 3 之自动配置与注入顺序控制》
- 《Spring Cloud 之 Session 共享及一致性处理》
- 《OAuth 2 中的鉴权和动态接口鉴权》
- 更多详情参见：https://www.herodotus.cn/cookbook/
- 官方文档：https://www.herodotus.cn
- 技术手册：

## \[2\] 经验分享

因 "虚拟线程" 这个新特性，而让 Java 21 备受关注。Spring Boot 3.2.0 作为 2023 年年终的大版本，对虚拟线程已经做到完全支持了，而让人分外期待。Dante Cloud 作为新技术和新特性的拥趸，也在第一时间对 Spring Boot 3.2.0 和 Spring Cloud 2023.0.0 等组件进行适配和尝鲜。

相比适配 Spring Boot 3.0 来说，适配 Spring Boot 3.2 会遇到的问题已经少了很多，但也不是一帆风顺。现将适配过程中遇到的问题，分享出来，希望可以帮助感兴趣的朋友尽量避坑。

### 组件版本

- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- Spring Authrozation Server 1.2.0
- Spring Cloud Tencent 1.12.4-2022.0.4
- Spring Cloud Alibaba 2022.0.0.0
- Nacos 2.3.0

### 问题解决

1.  Spring Boot 和 Spring Cloud

微服务架构想要适配 Spring Boot 3.2 一定要注意版本对应。Spring Boot 3.2 已经绑定 Spring Cloud 版本为 2023.0.0，低于该版本代码无法运行。

2.  Spring Cloud Tencent

适配 Spring Boot 3.2 后，在使用 Spring Cloud Tencent 时，目前发现两个问题：

- Netty 最新的 4.1.101.Final 版本调用了一个 Grpc 组件不支持的方法，会导致 Spring Cloud Tencent 无法连接到 Server，运行时出错。这个问题本身并不是“适配” 问题，而是 Spring Boot 2.7.18、3.1.6 和 3.2.0 都依赖了最新版本的 Netty，升级就会出错。
- 因为 Spring Bean 和 Feign 代码存在变化，而 Spring Cloud Tencent 采用 uber.jar 打包方式，导致依赖当前版本会出现代码冲突。

解决办法：

- 将 Netty 版本降至 4.1.100.Final，可解决无法 GRPC 无法连接 Server 问题。
- 去除对包 `spring-cloud-starter-tencent-all` 和 `spring-cloud-starter-tencent-polaris-circuitbreaker` 的依赖，即可运行但部分功能会不可用

> 相关问题已经提交至 Spring Cloud Tencent 社区。https://github.com/Tencent/spring-cloud-tencent/issues/1210。该问题已经修复，grpc-java 也已经发布新版本。需要等待 Spring Cloud Tencent 新版本发布

3.  Spring Cloud Alibaba

因为 Feign 底层核心接口存在变化，所以原来可以使用的 Sentinel 全局 Fallback 代码无法使用。而且当前环境，依赖 Sentinel 相关组件，会出现自定义 Feign Contract 配置失效，导致使用 SpringMVC 注解的或者自定义注解的 Feign 代码抛错。

目前的临时解决办法就是去除 Sentinel 所有的依赖包。

4.  Spring Authrozation Server

Spring Authrozation Server 1.2.0 并没有太多的变化。但其中影响最大的变化，就是 issuer 地址不再允许包含 ip 和 port 以外的路径。如果包含了路径，启动时将会报错。https://github.com/spring-projects/spring-authorization-server/issues/1435 。目前临时的解决办法就手动修改代码，将限制取消。

### 额外说明

1.  Dante Cloud 3.2.0.0 虽然已经适配 Spring Boot 3.2 和 Spring Cloud 2023.0.0，但是因为部分功能并不可用，所以不建议用于生产。
2.  **虽说是“适配”，但是核心目的是对升级 Spring Boot 3.2 和 Spring Cloud 2023.0.0 的工作量和会遇到的问题做评估，有了合理的评估才好决定是否要升级。所以望理解**
3.  虽然前面的内容说的都是“问题”，但这并不是说组件本身有问题，而是放到当前 Dante Cloud 的环境中以及使用未进行版本适配遇到的小插曲，而且和具体自己代码的实现思路和逻辑有很大关系，不同的系统代码遇到问题也未必相同。

最后，还是建议等相关组件完成代码适配后再进行尝试。Spring Cloud Tencent 社区已经在进行响应，等 1.13 版本发布后就会开展 Spring Cloud 2023.0.0 版本的适配工作。https://github.com/Tencent/spring-cloud-tencent/issues/1209

## \[3\] 本次更新内容

- 【主要更新】

- \[升级\] Spring Boot 版本升级至 3.2.0
- \[升级\] Spring Cloud 版本升级至 2023.0.0
- \[升级\] Spring Authorization Server 版本升级至 1.2.0
- \[升级\] Spring Boot Admin 版本升级至 3.1.8
- \[升级\] Nacos 版本升级至 2.3.0
- \[升级\] Nacos Docker 镜像 版本升级至 2.3.0
- \[优化\] jetcache 的问题修复及优化。（PR by Kaiser_Li）

1.  优化计数缓存签章，增加 maxTimes 作为默认值，简化了 counting 方法，一般情况下只需调用 counting(key)即可
2.  修复 AbstractCountStampManager 中 counting(String identity, int maxTimes)调用报错的问题
3.  优化 AbstractCountStampManager 中对次数的判断，大于 maxTimes 时都返回错误

- 【其它更新】

- \[新增\] 新增 Spring Cloud Tencent 读取和使用本地缓存统一化配置。
- \[新增\] Spring Cloud Tencent Polaris 配置导入包，方便环境搭建和配置
- \[新增\] 新增 caffeine、jetcache、redis 缓存组件使用详细说明，文档路径：dante-engine/readme/plugins/cache/ 以及 各模块 Readme 说明（PR by Kaiser_Li）
- \[重构\] 重构 RestTemplate 和 OpenFeign 底层 Engine 及负载均衡统一化配置。去除 Spring Boot 3.2 不再支持的 OkHttp3ClientHttpRequestFactory 相关配置，增加基于 JdkClient 的 RestTemplate 和 OpenFeign 统一配置。fix: #I8JNOK
- \[重构\] 重构相关代码，适配 Spring Boot 3.2.0 fix: #I7W5C3
- \[重构\] 重构相关代码，适配 Spring Cloud 2023.0.0-RC1 fix: #7W5C6
- \[重构\] 重构 Spring Authorization Server 自定义 Provider 代码，适配最新的 Spring Authorization Server 1.2.0 版本。fix: #I7W5BY
- \[重构\] 重构 Spring Authorization Server 配置代码，去除过时方法，适配最新代码。
- \[重构\] 重构系统静态权限配置核心代码，统一配置信息出入口，规范调用 API 名称及使用方式。一次性构建解析列表，减少冗余的循环和临时创建 fix: #I8KL29
- \[重构\] 重构自定义 ApplicationEvent 命名及使用方式。
- \[修复\] 修复 Emqx 监控数据转 Influxdb2 的 Spring Integration 流程注入配置条件错误。
- \[修复\] 修复 docker-compose 文件中，polaris 镜像名称不正确问题。
- \[修复\] 调整 polaris docker-compose 默认端口，适配最新版本 Polarismesh Server。
- \[修复\] 前端工程适配 Vite 5.0.0，修复 monorepo 模块编译时出现 “The CJS build of Vite's Node API is deprecated” 问题 fix: #I8HLU0
- \[修复\] 清除 Docker Profile 环境下原有的 Native 配置，解决在 Docker Profile 环境下编译错误问题。fix: #I8ICSZ
- \[优化\] 调整 Polaris 本地配置缓存目录，防止与新增配置导入包冲突和混淆
- \[优化\] 优化各个服务中，Spring Cloud Tencent 相关配置，去除无用的或者与默认参数相同的配置。
- \[优化\] 临时解决 Spring Authorization Server 1.2.0 不兼容问题，后续根据实际情况进行完善和修改。https://github.com/spring-projects/spring-authorization-server/issues/1435
- \[优化\] 删除 dependencies 中重复的或无用的版本控制配置，统一使用 Spring Boot Dependencies 控制依赖版本
- \[优化\] 前端工程支持 ES 模块代码的编译生成，以及 ES 模块的加载。fix: #I8HLVI
- \[优化\] 去除所有 Native 相关 pom 配置，待 Spring Boot 后续版本统一进行 Native 处理。
- \[优化\] 优化 message-sdk-mqtt 模块代码，明确入站、出站以及通道相关代码。增加系统统一通道定义类，便于后续其它模块集成使用。fix: #I8IPWG
- \[适配\] 适配 Spring Cloud Alibaba 生态组件。临时去除 Sentinel 相关组件依赖和代码，解决在 Spring Cloud 2023.0.0 环境下，依赖 Sentinel 会引起 Feign 契约配置失效而导致的服务无法启动问题。
- \[适配\] 代码适配 Hutool 6.0.0-M8
- \[适配\] Apache Maven 适配至 3.9.6
- \[升级\] minio docker 镜像版本升级至 RELEASE.2023-12-06T09-09-22Z

- 【依赖更新】

- \[升级\] aws-java-sdk-s3 版本升级至 1.12.606
- \[升级\] alipay-sdk-java 版本升级至 4.38.149.ALL
- \[升级\] bcprov-jdk15to18 版本升级至 1.77
- \[升级\] bcprov-jdk18on 版本升级至 1.77
- \[升级\] wxjava 版本升级至 4.5.7.B
- \[升级\] com.baidu.aip 版本升级至 4.16.17
- \[升级\] minio 版本升级至 8.5.7
- \[升级\] hutool 版本升级至 6.0.0-M8
- \[升级\] mybatis-plus 版本升级至 3.5.4.1
- \[升级\] mybatis 版本升级至 3.5.14
- \[升级\] sqlite-jdbc 版本升级至 3.44.1.0
- \[升级\] springdoc 版本升级至 2.3.0
- \[升级\] transmittable-thread-local 版本升级至 2.14.4
- \[升级\] fastjson2 版本升级至 2.0.43
- \[升级\] commons-io 版本升级至 2.15.1
- \[升级\] JustAuth 版本升级至 1.16.6
- \[升级\] quasar webjars 版本升级至 2.14.0
- \[升级\] vue webjars 版本升级至 3.3.9
- \[升级\] redisson 版本升级至 3.25.0
- \[升级\] influxdb-client 版本升级至 6.11.0

## \[4\] Dante Cloud 特性

### 1\. 核心基础依赖便捷切换

- 新增 `Spring Cloud Tencent` 和 `Spring Cloud` 原生微服务全家桶等两种基础设施支持。
- 新增 `Spring Cloud Alibaba`、`Spring Cloud Tencent` 和 `Spring Cloud` 原生微服务全家桶三种基础设值切换能力，可以以相对便捷的方式切换使用 Alibaba、Tencent、Spring 等基础设施环境。可根据自身实际需求选择，不再局限于只能在某一种基础设施环境中运行。

### 2\. `Spring Authorization Server` 全特性支持及扩展

- 基于 `Spring Authorization Server` 和 `Spring Data JPA` 实现多租户系统架构， 支持 Database 和 Schema 两种模式。
- 基于 `Spring Data JPA`，重新构建 `Spring Authorization Server` 基础数据存储代码，替代原有 JDBC 数据访问方式，破除 `Spring Authorization Server` 原有数据存储局限，扩展为更符合实际应用的方式和设计。
- 基于 `Spring Authorization Server`，在 OAuth 2.1 规范基础之上，增加自定义 `Resource Ownership Password` (密码) 认证模式，以兼容现有基于 OAuth 2 规范的、前后端分离的应用，支持 `Refresh Token` 的使用。
- 基于 `Spring Authorization Server`，在 OAuth 2.1 规范基础之上，增加自定义 `Social Credentials` (社会化登录) 认证模式，支持手机短信验证码、微信小程序、基于 `JustAuth` 的第三方应用登录， 支持 `Refresh Token` 的使用。
- 扩展 `Spring Authorization Server` 默认的 `Client Credentials` 模式，实现真正的使用 Scope 权限对接口进行验证。增加客户端 Scope 的权限配置功能，并与已有的用户权限体系解耦
- 支持 `Spring Authorization Server` `Authorization Code PKCE` 认证模式
- 在 `Spring Authorization Server` 的标准的 `JWT Token` 加密校验方式外，支持基于自定义证书的 `JWT Token` 加密校验方式，可通过配置动态修改。
- 支持 `Opaque Token` (不透明令牌) 格式及校验方式，降低 `JWT Token` 被捕获解析的风险。可通过修改配置参数，设置默认 Token 格式是采用 `Opaque Token` 格式还是 `JWT Token` 格式。
- 全面支持 `OpenID Connect` (OIDC) 协议，系统使用时可根据使用需求，通过前端开关配置，快速切换 OIDC 模式和传统 OAuth2 模式
- 深度扩展 `Authorization Code`、`Resource Ownership Password`、`Social Credentials` 几种模式，全面融合 `IdToken`、`Opaque Token`、`JWT Token` 与现有权限体系，同时提供 `IdToken` 和 自定义 Token 扩展两种无须二次请求的用户信息传递方式，减少用户信息的频繁请求。
- 自定义 `Spring Authorization Server` 授权码模式登录认证页面和授权确认页面，授权码模式登录采用数据加密传输。支持多种验证码类型，暂不支持行为验证码。
- 新增基于 `Spring Authorization Server` 的、支持智能电视、IoT 等物联网设备认证模式
- 无须在代码中配置 `Spring Security` 权限注解以及权限方法，即可实现接口鉴权以及权限的动态修改。采用分布式鉴权方案，规避 Gateway 统一鉴权的压力以及重复鉴权问题
- OAuth2 UserDetails 核心数据支持直连数据库获取和 Feign 远程调用两种模式。OAuth2 直连数据库模式性能更优，Feign 访问远程调用可扩展性更强。可通过配置动态修改采用策略方式。

### 3\. 全体系化应用和开发特性集成

- 微服务架构全体系 Session 共享，实现 Spring Authorization Server、多实例服务、WebSocket、自定义 Session 以及大前端 Session 的统一。`微服务架构下的 Session 可以选择不用，但是不能没有`。
- 混合国密 `SM2` (非对称) 和 `SM4` (对称加密) 算法，实现基于数字信封技术的秘钥动态生成加密传输。利用“一人一码机制”，实现前后端数据进行动态加密传输与。Spring Authorization Server OAuth 2.1 授权模式深度融合，构建统一体系的数据传输加密。
- 全面整合 `@PreAuthorize` 注解权限与 `URL` 权限，通过后端动态配置，无须在代码中配置 `Spring Security` 权限注解以及权限方法，可实现接口鉴权以及权限的统一管理和动态修改
- 融合 Spring Cloud Stream 和 WebSocket，以优雅的方式实现 WebSocket 服务多实例环境下，点对点、广播消息跨实例推送，在线用户实时统计，完美支持 WebSocket 集群化应用。
- 借鉴 JPA 标准化设计思想，提取和抽象 OSS 标准化操作，形成统一的 Java OSS API 规范。封装可操作任意厂商的、统一的 REST API，构建定义统一、动态实现的应用模式（类似于 Hibernate 是 JPA 的一种实现，Hibernate 以 Dialect 方式支持不同的数据库一样），在不修改代码的情况下通过修改配置实现 OSS 的无缝切换和迁移
- 自研基于 `JetCache` 分布式两级缓存，完美实现 JPA Hibernate 二级缓存，支持各类查询数据缓存以及 JPA `@ManyToMany`， `@ManyToOne`等关联查询。完美解决 Spring Cache 仅使用本地缓存、创建 Key 繁琐和分页数据无法更新的问题。支持多实例服务本地缓存和远程缓存数据同步，同时支持 Mybatis Plus 二级缓存
- 平台统一错误处理，支持自定义错误码体系，有效集成 `OAuth2`、`Spring Validation` 等多方错误体系并有机整合 HTTP 状态码。采用 Customizer 模式，采用错误码自动计算和创建模式，支持代码模块级错误码灵活定义扩展。响应结果更加多样灵活，反馈结果也更加人性化，便于理解和定位问题。
- 全体系 OkHttp 、HttpClient 统一化集成，实现 OkHttp 、HttpClient 与 RestTemplate 、Openfeign 一体化融合。统一使用 Feign 配置参数，对 OkHttp 、HttpClient 进行参数设定，可策略化选择设置使用 OkHttp 或 HttpClient 作为 RestTemplate 、Openfeign 统一的基础 HttpClient

### 4\. 采用 `pnpm monorepo` 重构前端

- 未使用任何流行开源模版，使用全新技术栈，完全纯"手写"全新前端工程。
- 借鉴参考流行开源版本的使用和设计，新版前端界面风格和操作习惯尽量与当前流行方式统一。
- 充份使用 Typescript 语言特性，解决大量类型校验问题，尽可能规避 "any" 式的 Typescript 编程语言使用方式。
- 充份使用 Composition Api 和 Hooks 等 Vue3 框架新版特性进行代码编写。
- 充份利用 Component、Hooks 以及 Typescript 面向对象等特性，抽取通用组件和代码，尽可能降低工程重复代码。
- 对较多 Quasar 基础组件和应用功能组件进行封装，以方便代码的统一修改维护和开发使用。
- 对生产模式下，对基于 Vite3 的工程打包进行深度性能优化。
- 提供以 docker-compose 方式，对工程生产代码进行容器化打包和部署。
- 该版本基于 pnpm，采用 monorepo 模式对前端工程进行重构。构建 monorepo 版本前端，是为扩展更多功能、增加应用级功能做铺垫
- 抽取 utils、components、apis、bpmn-designer 等相关代码，形成共享模块。
- 共享模块已进行优化配置，可编译成独立的组件，单独以组件形式进行发布。
- 代码以共享模块的方式进行单独维护开发，降低现有工程代码复杂度，便于后续功能的扩展和代码的复用。
- **使用极少的 CSS 样式、高度的模块化构建，对后端人员开发前端非常友好。**

---

**欢迎 Star 一波来支持我们！**

**Gitee**：https://gitee.com/dromara/dante-cloud  
**Github**：https://github.com/dromara/dante-cloud

<img src="/assets/img/news/Dante-Cloud-3.1.3.0-3.jpg" height="340">
