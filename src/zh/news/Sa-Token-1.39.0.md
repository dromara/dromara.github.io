---
title: Sa-Token v1.39.0 更新，大幅重构 OAuth2 模块
author: Sa-Token
date: 2024-09-02
cover: /assets/img/news/Sa-Token-1.39.0-0.png
head:
  - - meta
    - name: 新闻
---

Sa-Token 是一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、分布式 Session 会话、单点登录、OAuth2.0 等一系列权限相关问题。

框架针对踢人下线、自动续签、前后台分离、分布式会话…… 等常见业务进行 N 多适配，通过 Sa-Token，你可以以一种极简的方式实现系统的权限认证部分

Sa-Token v1.39.0 版本更新包括以下内容：

*   • 核心：
    
*   • 升级：重构注解鉴权底层，支持自定义鉴权注解了。 **\[重要\]**
    
*   • 修复：修复前端提交同名 `Cookie` 时的框架错读现象。
    
*   • 插件：
    
*   • 修复：修复 `sa-token-quick-login` 插件无法正常拦截的问题。
    
*   • SSO：
    
*   • 优化：优化 sso-server 前后端分离 demo 代码。
    
*   • 优化：优化 sso-server 前后端分离时的跳转流程。
    
*   • OAuth2：
    
*   • 重构：`sa-token-oauth2` 模块整体重构。 **\[重要\]** **\[不向下兼容\]**
    
*   • 新增：新增支持自定义 `scope` 处理器。 **\[重要\]**
    
*   • 新增：新增支持自定义 `grant_type`。 **\[重要\]**
    
*   • 新增：新增 `scope` 划分等级。 **\[重要\]**
    
*   • 新增：新增 `oidc` 协议支持。 **\[重要\]**
    
*   • 新增：新增支持默认 `openid` 生成算法。 **\[重要\]**
    
*   • 新增：新增 `OAuth2` 注解鉴权支持。 **\[重要\]**
    
*   • 修复：`redirect_url` 参数校验增加规则：不允许出现@字符、\*通配符只能出现在最后一位。关联 issue **\[重要\]**
    
*   • 优化：优化代码注释、异常提示信息。
    
*   • 升级：兼容 `Http Basic` 提交 `client` 信息的场景。感谢 github `@CuiGeekYoung` 提交的pr。
    
*   • 升级：兼容 `Bearer Token` 方式提交 `access_token` 和 `client_token`。
    
*   • 升级：适配拆分式路由。
    
*   • 新增：将 `scope` 字段改为 List 类型。
    
*   • 重构：抽离 `SaOAuth2Strategy` 全局策略接口，定义一些创建 token 的算法策略。
    
*   • 新增：新增 `addAllowUrls` `addContractScopes` 方法，简化 `SaClientModel` 构建代码。
    
*   • 重构：抽离 `SaOAuth2Dao` 接口，负责数据持久。
    
*   • 重构：抽离 `SaOAuth2DataLoader` 数据加载器接口。
    
*   • 重构：抽离 `SaOAuth2DataGenerate` 数据构造器接口。
    
*   • 重构：抽离 `SaOAuth2DataConverter` 数据转换器接口。
    
*   • 重构：抽离 `SaOAuth2DataResolver` 数据解析器接口。
    
*   • 重构：重构 `SaOAuth2Handle` -> `SaOAuth2ServerProcessor` 更方便的逻辑重写。
    
*   • 重构：重构 `PastToken` -> `LowerClientToken`。
    
*   • 新增：新增 `state` 值校验，同一 `state` 参数不可重复使用。
    
*   • 优化：完善 `SaOAuth2Util` 相关方法，更方便的二次开发。
    
*   • 新增：新增部分异常类，细分异常 `ClassType`。
    
*   • 优化：优化 `sa-token-oauth2` 异常细分状态码。
    
*   • 文档：
    
*   • 新增：新增数据结构说明。
    
*   • 新增：新增不同 `client` 不同登录页说明。
    
*   • 优化：优化文档 \[将权限数据放在缓存里\] 示例。
    
*   • 新增：新增 从 Shiro、SpringSecurity、JWT 迁移 示例。 **\[重要\]**
    

```
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.39.0</version>
</dependency>
```

#### 代码仓库：https://gitee.com/dromara/sa-token

框架功能结构图

![](/assets/img/news/Sa-Token-1.39.0-0.png)

js

近期发现的录制的与 Sa-Token 相关的视频：

【微服务架构设计与实战】 https://www.bilibili.com/video/BV1nJWWeDEFN