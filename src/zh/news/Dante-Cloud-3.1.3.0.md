---
title: Dante Cloud 3.1.3.0 发布，采用领域驱动设计(DDD)的微服务架构
author: dante
tag:
  - Dante-Cloud
date: 2023-08-25
cover: /assets/img/news/Dante-Cloud-3.1.3.0-cover.png
head:
  - - meta
    - name: 新闻
---

**Dante Cloud** 是一款企业级微服务架构和服务能力开发平台，是采用领域驱动模型(DDD)设计思想的、全面拥抱 Spring Authorization Server 的、基于 OAuth2.1 协议的、支持智能电视、IoT 等物联网设备认证的微服务架构。基于 Spring Authorization Server 1.1.2、Spring Boot 3.1.3、Spring Cloud 2022.0.4、Spring Cloud Tencent 1.11.9-2022.0.1、Spring Cloud Alibaba 2022.0.0.0、Nacos 2.2.4 等主流技术栈开发的多租户系统，遵循 SpringBoot 编程思想，高度模块化和可配置化。具备服务发现、配置、熔断、限流、降级、监控、多级缓存、分布式事务、工作流等功能

**平台定位**

- 构建成熟的、完善的、全面的，基于 OAuth2.1 的、前后端分离的微服务架构解决方案。
- 面向企业级应用和互联网应用设计开发，既兼顾传统项目的微服务化，又满足互联网应用开发建设、快速迭代的使用需求。
- 平台架构使用微服务领域及周边相关的各类新兴技术或主流技术进行建设，是帮助快速跨越架构技术选型、研究探索阶段的利器。
- 代码简洁规范、结构合理清晰，是新技术开发应用的典型的、综合性案例，助力开发人员对新兴技术的学习和掌握。

**初衷**

作者本人过往工作，主要专注企业信息化项目建设，经手过大大小小、各式各样、规模各异的项目。这些项目经历，足以让我体会 IT 行业的千滋百味。回顾过往，发现其中很多工作，特别是很多会占用技术人员大量时间和精力的工作，大多数情况下并不是像技术攻关、新技术研究、业务架构设计、并发性能调优等有挑战性的工作，而往往都是因细节考虑欠缺、代码质量不高、在用技术老旧、欠缺优化迭代、系统难于维护、项目管理不善等问题产生的需要长期投入的、低效、低意义工作。

这也是为什么做 Dante Cloud 的初衷：一方面是以 Dante Cloud 为载体，潜移默化地将过往项目建设的经验教训融入其中，尽可能地帮助使用者规避或者减少无效工作，提升工作效率和质量，有跟多的时间做更有意义的事情；另一方面不断地融合和使用各类新兴技术，帮助使用者尽可能多的了解、学习和运用新技术，让技术不再成为禁锢变为进步和提升的基石。

## \[1\] 本次更新内容

- 【主要更新】

- \[升级\] Spring Boot 版本升级至 3.1.3
- \[升级\] Spring Authorization Server 版本升级至 1.1.2
- \[升级\] Spring Cloud Tencent 版本升级至 1.11.9-2022.0.1
- \[升级\] Spring Boot Admin 版本升级至 3.1.5

- 【其它更新】

- \[新增\] 新增 idea IDE 中显示 Dante Cloud Logo 配置。
- \[新增\] DateTimeUtils 增加 Date 互转 ZonedDateTime 方法
- \[新增\] 前端工程新增 OSS 普通流式上传、下载进度显示。fix: #I7DO83 (ISSUED by jacky)
- \[重构\] 重构部分核心包代码依赖逻辑，解决部分包依赖不合理问题。
- \[重构\] 参照 Spring Boot 规范，重构部分自定义 Event 所在模块，以及核心 Event 实现定义。解决 Event 代码放置混乱逻辑不易理解问题。
- \[重构\] 参数 Spring Boot 规范，重构 engine-rest 模块下所有代码模块。同时，调整相关代码，进一步解耦。
- \[重构\] 参照 Spring Boot 规范，重构短信模块
- \[重构\] 将原有实体转换代码，重构为 Converter 形式。
- \[重构\] 将所有 Starter 按照 Spring Boot Starter 规范重构相关代码。
- \[重构\] 为了保证数据一致性，数据库初始化脚本移动至 dante-cloud-oss-ability 服务中。在线文档数据库初始化内容也同步更新。
- \[重构\] 重构前端 OSS 流式上传、下载 Typescript 相关定义和接口调用服务代码。流式上传、下载替换为使用后端符合 Dante Java OSS API 规范的统一定义 REST API，并完成前后端联调验证。
- \[重构\] 重构前端 OSS 大文件分片上传 Typescript 相关定义和接口调用服务代码。流式上传、下载替换为使用后端符合 Dante Java OSS API 规范的统一定义 REST API，并完成前后端联调验证。
- \[重构\] 因不具备跨业务通用性，调整前端 OSS 相关组件代码放置位置，将其移动到 OSS 页面代码文件夹，以保持业务相关性。
- \[重构\] 按照 Spring 生态规范，重构 assistant 和 rest 相关模块自动配置代码，让其既符合 Spring 自动配置规范，又可以提升模块代码的内聚性，减少耦合关联和精简依赖包的依赖。
- \[修复\] 修复 Snakeyaml (CVE-2022-1471) 存在反序列化漏洞 和 (CVE-2022-41854) 存在缓冲区溢出漏洞
- \[修复\] 修复前端自定义 ListItem 组件 directives 设置不正确导致前端控制台抛错问题。
- \[修复\] 修复前端创建存储桶界面校验存储桶是否存在错误
- \[修复\] 修复微服务版本环境下，因自定义代理地址配置错误，导致 OSS 大文件分片上传出错问题。
- \[修复\] 修复单体版数据库初始化脚本存在重复数据问题
- \[修复\] 重构 HDialog 自定义封装组件。修复前端上传对话框操作按钮逻辑不合理，导致前端抛错以及上传成功后不会刷新对象列表问题。
- \[修复\] 修复前端工程页面切换动画不生效问题
- \[优化\] 默认数据库名称进行变更，修改为与项目名称一致，方便记忆和使用。
- \[优化\] 优化对象存储相关 Nacos 配置，将原有配置替换为与 Dante OSS 1.3.0 统一的新版配置。
- \[优化\] 补充 Nacos 2.2.3 Mysql 数据库初始化脚本。
- \[优化\] 补充可外部化配置的 logback.xml 日志配置文件。包含 Skywalking 日志上报、ELK 日志中心日志收集、Skywalking TraceId 等支持。同时提供常规及 MDC 两种配置
- \[优化\] 使用 import 方式，优化 springdoc 依赖包的引入方式，减少过多无用的依赖信息。
- \[优化\] 优化项目 Banner.txt，增加在线文档地址展示
- \[删除\] 删除 okio 强制版本控制，改为使用统一配置版本。
- \[删除\] 删除 xnio 强制版本控制，改为使用统一配置版本。
- \[升级\] Minio Docker 镜像版本升级至 RELEASE.2023-08-23T10-07-06Z

- 【依赖更新】

- \[升级\] snakeyaml 版本升级至 2.1
- \[升级\] bcprov-jdk18on 版本升级至 1.76
- \[升级\] tencentcloud-sdk-java-sms 版本升级至 3.1.835
- \[升级\] alipay-sdk-java 版本升级至 4.38.61.ALL
- \[升级\] redisson 版本升级至 3.23.3
- \[升级\] minio 版本升级至 8.5.5
- \[升级\] aws-java-sdk-s3 版本升级至 1.12.533
- \[升级\] fastjson2 版本升级至 2.0.39
- \[升级\] mybatis-plus-boot-starter 版本升级至 3.5.3.2

- 【文档更新】

- Dante Cloud Cookbook 上新基础知识篇《Spring Boot 3 之自动配置与注入顺序控制》，助力快速掌握突破微服务生态的关键“开关”。欢迎扫码阅读！

![](/assets/img/news/Dante-Cloud-3.1.3.0-1.png)

## \[2\] Dante Cloud 3.1.X 后端新特性

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
- 支持 `Opaque Token` (不透明令牌) 格式及校验方式，将低 `JWT Token` 被捕获解析的风险。可通过修改配置参数，设置默认 Token 格式是采用 `Opaque Token` 格式还是 `JWT Token` 格式。
- 全面支持 `OpenID Connect` (OIDC) 协议，系统使用时可根据使用需求，通过前端开关配置，快速切换 OIDC 模式和传统 OAuth2 模式
- 深度扩展 `Authorization Code`、`Resource Ownership Password`、`Social Credentials` 几种模式，全面融合 `IdToken`、`Opaque Token`、`JWT Token` 与现有权限体系，同时提供 `IdToken` 和 自定义 Token 扩展两种无须二次请求的用户信息传递方式，减少用户信息的频繁请求。
- 自定义 `Spring Authorization Server` 授权码模式登录认证页面和授权确认页面，授权码模式登录采用数据加密传输。支持多种验证码类型，暂不支持行为验证码。
- 无须在代码中配置 `Spring Security` 权限注解以及权限方法，即可实现接口鉴权以及权限的动态修改。采用分布式鉴权方案，规避 Gateway 统一鉴权的压力以及重复鉴权问题
- OAuth2 UserDetails 核心数据支持直连数据库获取和 Feign 远程调用两种模式。OAuth2 直连数据库模式性能更优，Feign 访问远程调用可扩展性更强。可通过配置动态修改采用策略方式。
- 基于自定义 Session，混合国密 `SM2` (非对称) 和 `SM4` (对称加密) 算法，实现基于数字信封技术的秘钥动态生成加密传输。利用 “一人一码机制”，实现密码模式登录数据进行动态加密传输。配合 OAuth2 Client 验证，保护接口调用和前后端数据传输的合理性及安全性。

### 3\. `Spring Authorization Server` OAuth2 **Device Authorization Grant** 认证模式

OAuth2 **Device Authorization Grant** 认证模式，是在 OIDC 协议支持的模式中，专有的一类 Device Flow 设备模式，允许各类终端或硬件完成认证登录流程。

**Device Authorization Grant** （设备授权授予）或 **Device Flow** 对于处理，例如：智能电视、IoT 设备或打印机等，输入受限终端或硬件的身份验证和授权非常有用。由于终端的显示模式可能受限，无法内置登录页面。通过 Device Flow 提供的超链接或者生成二维码，设备会让用户在另一台设备上的浏览器中访问一个网页，以进行登录。用户登录后，设备可以获取所需的访问令牌和刷新令牌。

## \[3\] Dante Cloud 3.1.X 前端新特性

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
- 代码以共享模块的方式进行单独维护开发，降低现有工程代码复杂度，便于后续功能的扩展和代码的复用

---

**欢迎 Star 一波来支持我们！**

**Gitee**：https://gitee.com/dromara/dante-cloud**Github**：https://github.com/dromara/dante-cloud

<img src="/assets/img/news/Dante-Cloud-3.1.3.0-2.jpg" height="340">
<br>
<img src="/assets/img/news/Dante-Cloud-3.1.3.0-3.jpg" height="340">
