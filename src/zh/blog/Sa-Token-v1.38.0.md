---
title: Sa-Token v1.38.0 发布，大幅重构 SSO 模块
author: click33
date: 2024-05-13
cover: /assets/img/blog/Sa-Token-v1.38.0-0.png
head:
  - - meta
    - name: 博客
---

Sa-Token 是一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、分布式 Session 会话、单点登录、OAuth2.0 等一系列权限相关问题。

框架针对踢人下线、自动续签、前后台分离、分布式会话…… 等常见业务进行 N 多适配，通过 Sa-Token，你可以以一种极简的方式实现系统的权限认证部分

Sa-Token v1.38.0 版本更新包括以下内容：

*   • sa-token-core：
    
*   • 修复：修复 `StpUtil.getSessionByLoginId(xx)` 参数为 null 时创建无效 `SaSession` 的 bug。
    
*   • 优化：在 `SpringBoot 3.x` 版本下错误的引入依赖时将得到启动失败的提示。（感谢`Uncarbon`提交的pr）
    
*   • 优化：进一步优化权限校验算法，hasXxx API 只会返回 true 或 false，不再抛出异常。
    
*   • 重构：`InvalidContextException` 更名为 `SaTokenContextException`。 **\[已做向下兼容处理\]**
    
*   • 重构：彻底删除 `NotPermissionException` 异常中的 `getCode()` 方法。 **\[过期API清理\]**
    
*   • 重构：重构 `SaTokenException` 类方法 `throwBy-`\>`notTrue`、`throwByNull-`\>`notEmpty`。\*\*\[已做向下兼容处理\]\*\*
    
*   • 重构：`StpUtil.getSessionBySessionId` 提供的 `SessionId` 为空时将直接抛出异常，而不是再返回null。\*\*\[不向下兼容\]\*\*
    
*   • 新增：新增 `Http Digest` 认证模块简单实现。 **\[重要\]**
    
*   • 重构：更换 `HttpBasic` 认证模块包名。 **\[已做向下兼容处理\]**
    
*   • 新增：新增 `StpUtil.getLoginDeviceByToken(xxx)` 方法，用于获取任意 token 的登录设备类型。
    
*   • 新增：新增 `StpUtil.getTokenLastActiveTime()` 方法，获取当前 token 最后活跃时间。
    
*   • 修复：修复“当登录时指定 timeout 小于全局 timeout 时，`Account-Session` 有效期为全局 timeout”的问题。
    
*   • 优化：首次获取 `Token-Session` 时，其有效期将保持和 token 有效期相同，而不是再是全局 timeout 值。
    
*   • 移除：移除 `SaSignConfig` 的 `isCheckNonce` 配置项。 **\[不向下兼容\]**
    
*   • 新增：`SaSignTemplate#checkRequest` 增加“可指定参与签名参数”的功能。
    
*   • 重构：将部分加密算法设置为过期。
    
*   • 重构：优化 token 读取策略，空字符串将视为没有提交token。
    
*   • 修复：`sa-token-bom` 补全缺失依赖。
    
*   • 优化：二级认证校验之前必须先通过登录认证校验。
    
*   • 修复：修复 `StpUtil.getLoginId(T defaultValue)` 传入 null 时无法正确返回值的bug。
    
*   • sa-token-sso：
    
*   • 优化：SSO 模式三，API 调用签名校验时，限定参与签名的参数列表，更安全。
    
*   • 新增：新增 `autoRenewTimeout` 配置项：是否在每次下发 ticket 时，自动续期 token 的有效期（根据全局 timeout 值）
    
*   • 新增：`SaSsoConfig` 新增配置 `isCheckSign`（是否校验参数签名），方便本地开发时的调试。
    
*   • 新增：`SaSsoConfig` 新增配置 `currSsoLogin`，用于强制指定当前系统的 sso 登录地址。
    
*   • 重构：整体重构 `sa-token-sso` 模块，将 `server` 端和 `client` 端代码拆分。 **\[重要\]** **\[不向下兼容\]**
    
*   • 新增：`SaSsoConfig` 配置项 `ssoLogoutCall` 重命名为 `currSsoLogoutCall`。\*\*\[已做向下兼容处理\]\*\*
    
*   • 重构：模式三在校验 Ticket 时，也将强制校验签名才能调通请求。\*\*\[不向下兼容\]\*\*
    
*   • 新增：新增 `maxRegClient` 配置项，用于控制模式三下 client 注册数量。
    
*   • 新增：新增不同 SSO Client 配置不同 `secret-key` 的方案。 **\[重要\]**
    
*   • 重构：匿名 client 将不再能解析出所有应用的 ticket。\*\*\[不向下兼容\]\*\*
    
*   • 新增：新增 `homeRoute` 配置项：在 `/sso/auth` 登录后不指定 redirect 参数的情况下默认跳转的路由。
    
*   • 优化：优化登录有效期策略，SSO Client 端登录时将延续 SSO Server 端的会话剩余有效期。
    
*   • 新增：新增 `checkTicketAppendData` 策略函数，用于在校验 ticket 后，给 sso-client 端追加返回信息。
    
*   • 新增：SSO章节文档新增用户数据同步/迁移方案的建议。
    
*   • 修复：修复利用@字符可以绕过域名允许列表校验的漏洞。 **\[漏洞修复\]**
    
*   • 修复：禁止 `allow-url` 配置项 \* 符号出现在中间位置，因为这有可能导致校验被绕过。 **\[漏洞修复\]**
    
*   • 新增插件/示例：
    
*   • 新增：新增插件 `sa-token-hutool-timed-cache`，用于整合 Hutool 缓存插件 TimedCache。 **\[重要\]**
    
*   • 新增：新增 SSM 架构整合 Sa-Token 简单示例。 **\[重要\]**
    
*   • 新增：新增 beetl 整合 Sa-Token 简单示例。 **\[重要\]**
    
*   • 文档：
    
*   • 部分章节将 `@Autowired` 更换为更合适的 `@PostConstruct`
    
*   • 新增过滤器执行顺序更改示例。
    
*   • 其它：
    
*   • 优化：将跨域处理demo拆分为独立仓库。
    
*   • 优化：解决 springboot 集成 sa-token 后排除 jsckson 依赖无法成功启动的问题。
    
*   • 优化：解决 `sa-token-jwt` 模块重复设置 keyt 秘钥问题。（感谢`KonBAI`提交的pr）
    
*   • 优化：jwt模式 token 过期后，抛出的异常描述是 token 已过期，而不再是 token 无效。
    
*   • 修复：补齐 `sa-token-spring-aop` 模块中遗漏监听的注解。
    

```
<!-- Sa-Token 权限认证 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.38.0</version>
</dependency>
```

#### 代码仓库：https://gitee.com/dromara/sa-token

框架功能结构图

![](/assets/img/blog/Sa-Token-v1.38.0-0.png)

昨天无意发现一个用户录制的 Sa-Token 讲解视频，共99集，很用心！

【【SaToken精讲】都4202年了，还不学习一下Sa-Token，国产轻量级Java权限框架。再也没有spring security的繁琐了！】 https://www.bilibili.com/video/BV1Zt421u7gk/

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/qrcode_zsxq.webp)