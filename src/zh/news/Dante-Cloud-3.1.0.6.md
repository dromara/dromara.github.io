---
title: Dante Cloud 3.1.0.6 发布，拆分核心基础组件，构建产品生态
author: dante
tag:
  - Dante-Cloud
date: 2023-06-14
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

为方便用户使用，Dante Cloud 建设初期以“全面”为目标，尽可能的集成、开发和包容更多常用组件，以兼容更多用户的使用需求。Dante Cloud 经过两年的建设、完善与发展、探索，发现这种模式看似全面、面面俱到、可以吸引更多用户的青睐。但对实际的开发、使用的促进效果并不理想。

主要存在以下问题：

- 集成和兼容内容过多，影响代码编译、发布的时效性。
- 并不是所有内容都对用户有帮助，反而会带来过多的依赖性和耦合性。
- 原本相对独立性较高的内容，却融入在一个庞大的架构环境中，既不利于理解，也不利于单独使用。
- 引入过多杂音，分散用户对 Dante Cloud 核心价值内容的关注度，不利于掌握和深入 Dante Cloud 核心。
- 过多内容的集成，影响各个部分的专注和专业程度，导致多而不精，多而不深的问题。

因此，尝试采用构建“产品生态”的方式，解决以上问题，同时给用户带来更好的、更便捷产品使用体验。

- 通过构建产品生态，将独立性较强的内容，从系统核心内容中剥离，让 Dante Cloud 本身更加专精和独立，同时降低互相影响和干扰
- 被剥离的内容以独立的产品形态存在，目标既可以独立使用集成至任意系统中，又可以快速的与 Dante Cloud 融合，形成以 Dante Cloud 为主，生态产品为辅的格局。
- 生态产品以独立的产品运作，反向促进提升生态产品的完整性、深入性和便捷性。

## \[1\] 本次更新内容

- 主要更新

- \[升级\] Spring Cloud Tencent 1.11.7-2022.0.1
- \[变更\] Minio 对象存储相关代码，从 Dante Engine 中剥离，成为一个独立的项目产品
- \[删除\] 删除 pay 和 nosql 相关模块，清理系统中独立性较高的模组，以保持系统内核的专注性
- \[新增\] 新增 REST 接口动态鉴权是否使用严格模式配置，在严格模式下，所有接口必须配置权限才可使用；在非严格模式下，接口只需要携带 Token 即可使用。

- 其它更新

- \[新增\] 新增 message-rabbitmq-spring-boot-starter，以方便 RabbitMQ 使用者集成使用
- \[新增\] 新增对象存储 Minio 服务器不可用错误代码
- \[新增\] 前端新增对象存储 Bucket 管理界面
- \[新增\] 前端新增对象存储 Bucket 设置界面
- \[新增\] 前端新增对象存储 Object 管理界面
- \[新增\] 前端新增对象存储 Object 设置界面
- \[新增\] 前端新增基于 vue-simple-uploader 的大文件分片存储支持
- \[新增\] 新增 OSS 对象存储服务
- \[新增\] 新增对象存储 Minio 服务器不可用错误代码
- \[修复\] 修复在未引入 Spring Cloud OpenFeign 环境下，RestTemplate 配置失效导致启动错误的问题
- \[优化\] 优化基础 Controller 代码，调整判断逻辑，以更好地的支持查询数据成功、未查询到数据、查询失败等三种状态

- 依赖更新

- \[升级\] common-io 版本升级至 2.13.0
- \[升级\] redission 版本升级至 3.22.0
- \[升级\] guava 版本升级至 32.0.1-jre
- \[升级\] skywalking 版本升级至 8.16.0
- \[升级\] wxjava 版升级至 4.5.1.B
- \[升级\] camunda 版升级至 7.20.0-alpha2
- \[升级\] Webjars Bootstrap 版升级至 5.3.0
- \[升级\] tencentcloud-sdk-java-sms 版升级至 3.1.775
- \[升级\] alipay-sdk-java 版本升级至 4.35.154.ALL

## \[2\] 生态产品 Dante OSS

### 优点 | Advantages

- **零额外学习成本**: 开发者只要会 Spring 和 REST 基本开发，即可无缝集成和使用 Dante OSS
- **降低开发者门槛**: 屏蔽 Minio 标准 Java SDK 使用复杂度，使用 Spring 环境标准方式对原有 API 进行简化封装。Service API 和 REST API 开箱即用
- **包含的功能丰富**: 改造了 Minio Java SDK 的几乎全部功能，且对大文件分片上传、秒传、直传、断点续传等功能，均采用业内最优解决方案进行实现和融合
- **规范优雅的代码**: 所有函数参数，并未破坏原有 Minio 代码构造器结构，而是在原有方式的基础上抽象简化，编程体验和代码可读性大幅提升
- **完善的注释文档**: 对请求参数、方法、REST API、Validation 提供详实的注释、说明和 OpenAPI 标注，用途用法一目了然，无需再翻阅 Minio 文档和源代码，帮助您节省更多时间
- **完整的前端示例**：前端采用一个完整的项目而非 Demo 的形式，全面的展示了前后端交互涉及、接口调用、参数使用、TS 类型定义等各方面内容，可直接用于实际项目或简单改造后构建自己的产品

### 对比 | Compare

#### 1\. 不只是简单的 Spring Boot Starter 构建

1.  构建统一的错误，可以返回更人性化、更易理解的错误信息，同时兼顾更详细错误信息的返回，方便开发人员理解和定位问题。
2.  采用更易理解和使用的格式对 Minio Java SDK 参数进行重新定义。规避 Minio 默认 XML 方式参数多、不易理解使用、与前端交互不方便等问题。
3.  隐藏 Minio Java SDK 不易理解和使用的细节，提供详实的注释说明，开发人员在使用时无需再通过翻阅 Minio 在线文档和源代码来了解各个 API 使用细节。
4.  提供统一标准的 REST API，以及 OpenAPI Swagger3 文档描述和准确的 Spring Validation 校验，可直接集成至系统中使用。
5.  Minio Client 对象池、自定义极简 Minio Server 访问反向代理，提升

#### 2\. 标准化业务逻辑和解决方案集合

1.  不只是上传、下载等常用方法的封装，涵盖 Minio Java SDK 支持的所有方法和操作。
2.  选择业内最优的解决方案，实现和集成大文件分片上传、秒传、直传、断点续传等主要业务需求功能。
3.  结合自身应用经验和需求，将 Minio API 进一步组合成符合实际应用的业务逻辑和功能处理。
4.  采用一个基于 Vue3、Typescript5、Vite4、Pinia 2 的完整的前端项目作为集成示例，包括详细的 Typescript 类型定义以及 vue-simple-uploader 等主流组件集成和使用方法。
5.  提供基于 Spring Authorization Server 的单体版、微服务版案例，从 SDK、Spring Boot Starter 到完整项目任你选择。

#### 3\. 具体差异说明

- \[1\] 基础 API 方法以及方法参数

| Minio SDK                                               | Dante OSS                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 仅包含基础操作 API                                      | 提供大量重载方法                                                                     |
| 必须用构造器创建参数对象                                | 重载方法覆盖所有常见参数，按需传参即可                                               |
| API 全部混在同一个类中                                  | 根据差异、用途、场景拆分为不同的 Service，例如：getObject 和 downloadObject          |
| 源于 XML 对象参数结构复杂                               | 自定义实体和转换器简化参数结构                                                       |
| 基础 API 会抛出大量 Exception，具体问题需要自己摸索对应 | 对所有错误进行标准化处理，提供更准确和交互友好的描述信息，可方便地与系统错误体系融合 |

- \[2\] 前后端交互

| Minio SDK                      | Dante OSS                                                            |
| ------------------------------ | -------------------------------------------------------------------- |
| 复杂结构参数不利于 JSON 互转   | 采用最简化参数方便传输并可准确转换成对应 Minio 复杂对象参数          |
| 参数层次结构复杂               | 自定义请求参数实体保持继承结构的同时简化传递参数                     |
| 参数多用途不明晰必须查阅源代码 | 使用 OpenAPI 注解详细说明各参数用途可使用 Swagger 查阅               |
| 参数校验规则细节多没有文档说明 | 对照 Minio 源代码，结合自定义实体，增加匹配的 Spring Validation 校验 |
| 不提供 REST API                | 提供标准的 REST API 可直接使用                                       |

- \[3\] 业务支持

| 内容       | Minio SDK                                           | Dante OSS                                                                       |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| 常规业务   | 独立方法需要自己按需组合                            | 封装常规业务逻辑，可直接调用 REST API 使用                                      |
| 设置管理   | 对于存储桶、对象的管理只能通过 Minio 服务器管理界面 | 对照 Minio 管理界面方式，将管理功能封装为 Service、REST API 以及 Vue 管理界面   |
| 文件直传   | 提供直传机制，直接暴露 Minio 服务器地址             | 增加超简化反向代理，在满足直传需求的前提下，很好的隐藏 Minio 服务器以提升安全性 |
| 文件直传   | 直传接口无法与现有系统安全体系融合（无法鉴权）      | 提供基于 Spring Authorization Server 的、完整的单体版和微服务版案例             |
| 大文件分片 | 内部机制无法直接使用                                | 封装主流大文件分片方案，提供前后端使用案例                                      |
| 文件秒传   | 不支持                                              | 提供共用化秒传实现，可直接使用，支持多种数据库                                  |

- \[4\] 前端开发

| Dante OSS                                                                                               |
| ------------------------------------------------------------------------------------------------------- |
| 只要 Minio API 支持，对应的管理功能均会在标准的 Vue3 工程中实现                                         |
| 提供与后端一致 Typescript 声明文件，可以直接用于基于 Typescript 的前端开发                              |
| 完整的、基于 Vue3、Vite4、Typescript5 的前端项目案例，可清晰的了解 Minio 前后端交互和使用，甚至直接使用 |

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

### 4\. `Spring Authorization Server` OAuth2 **Device Authorization Grant** 认证模式

OAuth2 **Device Authorization Grant** 认证模式，是在 OIDC 协议支持的模式中，专有的一类 Device Flow 设备模式，允许各类终端或硬件完成认证登录流程。

**Device Authorization Grant** （设备授权授予）或 **Device Flow** 对于处理，例如：智能电视、IoT 设备或打印机等，输入受限终端或硬件的身份验证和授权非常有用。由于终端的显示模式可能受限，无法内置登录页面。通过 Device Flow 提供的超链接或者生成二维码，设备会让用户在另一台设备上的浏览器中访问一个网页，以进行登录。用户登录后，设备可以获取所需的访问令牌和刷新令牌。

## \[4\] Dante Cloud 3.0.0 前端新特性

### 采用 `pnpm monorepo` 重构前端

- 前端工程包管理器变更为 pnpm。
- 采用 `monorepo` 模式对前端工程进行重构，抽取 utils、components、apis、bpmn-designer 等相关代码，形成共享模块
- 共享模块已进行优化配置，利用 Vite 可编译成独立的组件，单独以组件形式进行发布
- 代码以共享模块的方式进行单独维护开发，降低现有工程代码复杂度，便于后续功能的扩展和代码的复用。
