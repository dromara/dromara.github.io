---
title: Dante Cloud 3.0.6.4 发布，支持IOT设备的Device Flow认证上线
author: dante
tag:
  - Dante-Cloud
date: 2023-05-18
cover: /assets/img/news/Dante-Cloud-3.1.3.0-cover.png
head:
  - - meta
    - name: 新闻
---

**Dante Cloud** 是一款企业级微服务架构和服务能力开发平台，是采用领域驱动模型(DDD)设计思想的、全面拥抱 Spring Authorization Server 的、基于 OAuth2.1 协议的、支持智能电视、IoT 等物联网设备认证的微服务架构。基于 Spring Authorization Server 1.1.0、Spring Boot 3.1.0、Spring Cloud 2022.0.3、Spring Cloud Tencent 1.11.7-2022.0.1、Spring Cloud Alibaba 2022.0.0.0、Nacos 2.2.2 等主流技术栈开发的多租户系统，遵循 SpringBoot 编程思想，高度模块化和可配置化。具备服务发现、配置、熔断、限流、降级、监控、多级缓存、分布式事务、工作流等功能

**平台定位**

- 构建成熟的、完善的、全面的，基于 OAuth2.1 的、前后端分离的微服务架构解决方案。
- 面向企业级应用和互联网应用设计开发，既兼顾传统项目的微服务化，又满足互联网应用开发建设、快速迭代的使用需求。
- 平台架构使用微服务领域及周边相关的各类新兴技术或主流技术进行建设，是帮助快速跨越架构技术选型、研究探索阶段的利器。
- 代码简洁规范、结构合理清晰，是新技术开发应用的典型的、综合性案例，助力开发人员对新兴技术的学习和掌握。

**发布背景**

自 11 月 24 日，Spring Boot 3.0 以及 Spring Cloud 2022.0.0、Spring Cloud Tencent 等全新版本发布，整个 Java 社区也步入的 Java 17 和 Spring Boot 3 的新时代。紧跟 Java 技术和 Spring 社区的发展，让更多质量更好、性能更优的新特性服务于实际的开发工作，Dante Cloud 也同步进行升级及适配，开发了全新的 3.0 版本。

## \[1\] 新特性背景

OAuth2 **Device Authorization Grant** 认证模式，是在 OIDC 协议支持的模式中，专有的一类 Device Flow 设备模式，允许各类终端或硬件完成认证登录流程。

**Device Authorization Grant** （设备授权授予）或 **Device Flow** 对于处理，例如：智能电视、IoT 设备或打印机等，输入受限终端或硬件的身份验证和授权非常有用。由于终端的显示模式可能受限，无法内置登录页面。通过 Device Flow 提供的超链接或者生成二维码，设备会让用户在另一台设备上的浏览器中访问一个网页，以进行登录。用户登录后，设备可以获取所需的访问令牌和刷新令牌。

## \[2\] 本次更新内容

- 【主要更新】

- \[升级\] Spring Authroization Server 版本升级至 1.1.0
- \[升级\] Spring Security 版本升级至 6.1.0
- \[新增\] 新增支持智能电视、IOT 设备等输入受限设备的 Device Flow 认证模式

- 【其它更新】

- \[新增\] 新增 Device Flow 认证系统内置页面
- \[新增\] 新增 IOT 产品、设备管理 SDK
- \[重构\] 重构 Spring Authorization Server 授权确认页面，与内置认证页面统一风格。
- \[重构\] 除特殊依赖外，将所有内置页面静态资源引用改为 Webjars 方式。
- \[重构\] 所有内置页面均改用页面嵌入 Vue 方式重新实现
- \[优化\] 优化客户端动态自动注册相关功能代码及配置方式
- \[优化\] 优化数据库初始化脚本，增加 Spring Authorization Server 内置默认 Scope 数据及关联数据

- 【依赖更新】

- \[升级\] fastjson2 版本升级至 2.0.32
- \[升级\] tencentcloud-sdk-java-sms 版本升级至 3.1.756
- \[升级\] aliyun-sdk-oss 版本升级至 3.16.3

**新特性界面预览**

![](/assets/img/news/Dante-Cloud-3.0.6.4-1.png)
![](/assets/img/news/Dante-Cloud-3.0.6.4-2.png)

## \[3\] Dante Cloud 3.0.0 后端新特性

### 1\. 核心基础依赖便捷切换

- 新增 `Spring Cloud Tencent` 和 `Spring Cloud` 原生微服务全家桶等两种基础设施支持。
- 新增 `Spring Cloud Alibaba`、`Spring Cloud Tencent` 和 `Spring Cloud` 原生微服务全家桶三种基础设值切换能力，可以以相对便捷的方式切换使用 Alibaba、Tencent、Spring 等基础设施环境。可根据自身实际需求选择，不再局限于只能在某一种基础设施环境中运行。

### 2\. 支持 `GraalVM` 原生镜像

- 整体调整各类模块 pom build 配置，适当增加冗余重复配置，以支持 `Spring Native` 或 `GraalVM` 编译需要。规避对所有模块进行 Native 编译，而导致错误问题。

### 3\. `Spring Authorization Server` 全特性支持及扩展

- 基于 `Spring Authorization Server` 和 `Spring Data JPA` 实现多租户系统架构， 支持 Database 和 Schema 两种模式。
- 基于 `Spring Data JPA`，重新构建 `Spring Authorization Server` 基础数据存储代码，替代原有 JDBC 数据访问方式，破除 `Spring Authorization Server` 原有数据存储局限，扩展为更符合实际应用的方式和设计。
- 基于 `Spring Authorization Server`，在 OAuth 2.1 规范基础之上，增加自定义 `Resource Ownership Password` (密码) 认证模式，以兼容现有基于 OAuth 2 规范的、前后端分离的应用，支持 `Refresh Token` 的使用。
- 基于 `Spring Authorization Server`，在 OAuth 2.1 规范基础之上，增加自定义 `Social Credentials` (社会化登录) 认证模式，支持手机短信验证码、微信小程序、基于 `JustAuth` 的第三方应用登录， 支持 `Refresh Token` 的使用。
- 扩展 `Spring Authorization Server` 默认的 `Client Credentials` 模式，实现真正的使用 Scope 权限对接口进行验证。增加客户端 Scope 的权限配置功能，并与已有的用户权限体系解耦
- 支持 `Spring Authorization Server` `Authorization Code PKCE` 认证模式
- 在 `Spring Authorization Server` 的标准的 `JWT Token` 加密校验方式外，支持基于自定义证书的 `JWT Token` 加密校验方式，可通过配置动态修改。
- 支持 `Opaque Token` (不透明令牌) 格式及校验方式，将低 `JWT Token` 被捕获解析的风险。可通过修改配置参数，设置默认 Token 格式是采用 `Opaque Token` 格式还是 `JWT Token` 格式。
- 全面支持 `OpenID Connect` (OIDC) 协议，系统使用时可根据使用需求，通过前端开关配置，快速切换 OIDC 模式和传统 OAuth2 模式
- 深度扩展 `Authorization Code`、`Resource Ownership Password`、`Social Credentials` 几种模式，全面融合 `IdToken`、`Opaque Token`、`JWT Token` 与现有权限体系，同时提供 `IdToken` 和 自定义 Token 扩展两种无须二次请求的用户信息传递方式，减少用户信息的频繁请求。
- 自定义 `Spring Authorization Server` 授权码模式登录认证页面和授权确认页面，授权码模式登录采用数据加密传输。支持多种验证码类型，暂不支持行为验证码。
- 无须在代码中配置 `Spring Security` 权限注解以及权限方法，即可实现接口鉴权以及权限的动态修改。采用分布式鉴权方案，规避 Gateway 统一鉴权的压力以及重复鉴权问题
- OAuth2 UserDetails 核心数据支持直连数据库获取和 Feign 远程调用两种模式。OAuth2 直连数据库模式性能更优，Feign 访问远程调用可扩展性更强。可通过配置动态修改采用策略方式。
- 基于自定义 Session，混合国密 `SM2` (非对称) 和 `SM4` (对称加密) 算法，实现基于数字信封技术的秘钥动态生成加密传输。利用 “一人一码机制”，实现密码模式登录数据进行动态加密传输。配合 OAuth2 Client 验证，保护接口调用和前后端数据传输的合理性及安全性。

## \[4\] Dante Cloud 3.0.0 前端新特性

### 采用 `pnpm monorepo` 重构前端

- 前端工程包管理器变更为 pnpm。
- 采用 `monorepo` 模式对前端工程进行重构，抽取 utils、components、apis、bpmn-designer 等相关代码，形成共享模块
- 共享模块已进行优化配置，利用 Vite 可编译成独立的组件，单独以组件形式进行发布
- 代码以共享模块的方式进行单独维护开发，降低现有工程代码复杂度，便于后续功能的扩展和代码的复用。
