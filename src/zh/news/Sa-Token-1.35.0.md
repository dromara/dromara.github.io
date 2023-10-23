---
title: Sa-Token v1.35.0更新，新增动态 active-timeout 能力
author: 省长
date: 2023-06-25
cover: /assets/img/news/Sa-Token-1.35.0.png
head:
  - - meta
    - name: 新闻
---

## Sa-Token v1.35.0 更新，新增动态 active-timeout 能力

Sa-Token 是一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、分布式 Session 会话、单点登录、OAuth2.0 等一系列权限相关问题。

框架针对踢人下线、自动续签、前后台分离、分布式会话…… 等常见业务进行 N 多适配，通过 Sa-Token，你可以以一种极简的方式实现系统的权限认证部分

Sa-Token v1.35.0.RC   版本更新包括以下内容：

- sa-token-core：

- 优化：前端未提供 token 时，`getTokenSession()` 将抛出未登录异常，而不是返回 null。**\[不向下兼容\]**
- 新增：SaSession 新增字段：`type`、`loginType`、`loginId`、`token`。
- 重构：全局过滤器抽离 SaFilter 统一接口。
- 重构：全局过滤器 `includeList`、`excludeList` 改为 public，同时移除对应的 getter 方法。**\[不向下兼容\]**
- 重构：将全局过滤器的 BeforeAuth 认证设为不受 `includeList` 与 `excludeList` 的限制，所有请求都会进入。**\[不向下兼容\]**
- 新增：新增循环生成 token 的算法，用于确保 Token 的唯一性。**\[重要\]**
- 重构：API 接口签名所有方法均迁移至 core 核心模块。**\[重要\]**
- 新增：新增彩色日志打印，更方便的分辨不同日志等级。**\[重要\]**
- 重构：重构概念：临时有效期 -> token 最低活跃频率，过期后 token 冻结。
- 重构：重构概念：`User-Session` -> `Account-Session`。
- 新增：新增 `getTokenTimeout(String token)` 方法，获取任意 token 剩余有效期。
- 优化：在登录时增加判断当前 StpLogic 是否支持 extra 扩展参数模式，如果不支持则打印警告信息。
- 新增：NotLoginException 增加新场景值 -6、-7，提供更精确的未登录异常描述信息。
- 新增：TokenSign 新增 tag 挂载参数，可在登录时方便的存储一些客户端特有数据。 **\[重要\]**
- 新增：新增 `SaStrategy#createStpLogic`，用于指定动态创建 StpLogic 时的算法策略。
- 新增：新增 `@SaCheckOr` 批量注解鉴权：只要满足其中一个注解即可通过验证。 **\[重要\]**
- 重构：重命名：`SaStrategy.me` -> `SaStrategy.instance`。
- 重构：在登录时强制性检查账号 id 是否为异常值，如果是则登录失败。
- 重构：重构概念：`activity-timeout` -> `active-timeout`。 **\[重要\]**
- 新增：新增动态 `active-timeout` 能力，可在每次登录时指定 `active-timeout` 值。 **\[重要\]**
- 优化：将 `SaStrategy` 所有策略声明抽离为单独的函数式接口。
- 新增：增加为 StpLogic 单独配置 `SaTokenConfig` 参数的能力。

- sa-token-sso：

- 修复：在 SSO 模式三中 `ticket` 校验地址配错时，会出现 NPE 的问题
- 新增：新增 `getData` 接口配置，在模式三拉取数据时可以传递任意参数。**\[重要\]**
- 重构：模式三秘钥配置更改：`sa-token.sso.secretkey=xxx` -> `sa-token.sign.secret-key=xxx`。**\[不向下兼容\]**
- 重构：模式三校验签名方法更改：`SaSsoUtil.checkSign(req)` -> `SaSignUtil.checkRequest(req)`。**\[不向下兼容\]**
- 新增：新增 `sa-token.sso.mode` 配置项，用于约定此系统使用的 SSO 模式。
- 优化：优化校验 ticket 的逻辑。

- sa-token-jwt：

- 修复：jwt 令牌的签名类型可以被篡改的问题。**\[重要\]**

- 其它：

- 优化：所有模块优化注释，更方便开发者阅读源码。
- 优化：在所有 .java 文件中添加 license 头说明。
- 优化：修复大部分代码警告。
- 新增：新增 thymeleaf 标签方言命名空间，增强 ide 代码提示。**\[重要\]**
- 新增：定义 `sa-token-bom` 包，方便引入 sa-token 时对齐版本。
- 新增：sa-token-dubbo3 插件新增代码示例。
- 新增：新增跨域文章和示例：Header 参数版和第三方 Cookie 版。**\[重要\]**
- 修复：修复 `sa-token-alone-redis` 在低版本 springboot 下无法启动成功(缺少 `username` 属性)的问题。

- 新增插件：

- 新增：新增 `sa-token-context-dubbo3` 插件。感谢 `@qiudaozhang` 提交的 pr。**\[重要\]**

- 文档：

- 新增：部分常见报错排查。
- 新增：首页图片增加懒加载效果，节省流量。
- 新增：增加 Cookie 配置示例。
- 修复：整理 demo 结构目录结构，修复不正确的路径说明。
- 新增：新增 api-sign 模块文档。 **\[重要\]**

- 简化包名  **\[重要\]**  **\[不向下兼容\]**

- `sa-token-dao-redis` -> `sa-token-redis`
- `sa-token-dao-redis-jackson` -> `sa-token-redis-jackson`。
- `sa-token-dao-redis-fastjson` -> `sa-token-redis-fastjson`。
- `sa-token-dao-redis-fastjson2` -> `sa-token-redis-fastjson2`。
- `sa-token-dao-redisson-jackson` -> `sa-token-redis-jackson`。
- `sa-token-dao-redisx` -> `sa-token-redisx`。
- `sa-token-context-dubbo` -> `sa-token-dubbo`。
- `sa-token-context-dubbo3` -> `sa-token-dubbo3`。
- `sa-token-context-grpc` -> `sa-token-grpc`。

cn.dev33sa-token-spring-boot-starter1.35.0.RC

#### 代码仓库：https://gitee.com/dromara/sa-token

框架功能结构图

![](/assets/img/news/Sa-Token-1.35.0.png)
