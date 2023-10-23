---
title: MaxKey单点登录认证系统3.5.19发布，开源IAM产品
author: MaxKey
tag:
  - MaxKey
date: 2023-08-16
cover: /assets/img/news/MaxKey-cover.png
head:
  - - meta
    - name: 新闻
---

## 概述

<b>MaxKey</b>单点登录认证系统，谐音马克思的钥匙寓意是最大钥匙,是<b>业界领先的 IAM-IDaas 身份管理和认证产品</b>,支持 OAuth 2.x/OpenID Connect、SAML 2.0、JWT、CAS、SCIM 等标准协议，提供<b>安全、标准和开放</b>的用户身份管理(IDM)、身份认证(AM)、单点登录(SSO)、RBAC 权限管理和资源管理等；开源、安全、自主可控。

官方网站 <a href="http://www.maxkey.top/" target="_blank"><b>http://www.maxkey.top/</b></a>

官方 QQ：<b>1054466084</b>

邮箱 email: <b>support@maxsso.net</b>

代码托管 <a href="https://gitee.com/dromara/MaxKey" target="_blank"><b>Gitee</b></a> | <a href="https://github.com/dromara/MaxKey" target="_blank"><b>GitHub</b></a>

## 产品特性

1. 标准协议

| 序号 | 协议                     | 支持 |
| ---- | :----------------------- | :--- |
| 1.1  | OAuth 2.x/OpenID Connect | 高   |
| 1.2  | SAML 2.0                 | 高   |
| 1.3  | JWT                      | 高   |
| 1.4  | CAS                      | 高   |
| 1.5  | SCIM 2.0                 | 高   |
| 1.6  | FormBased                | 中   |
| 1.7  | TokenBased(Post/Cookie)  | 中   |
| 1.8  | ExtendApi                | 低   |
| 1.9  | EXT                      | 低   |

2. 登录支持

| 序号 | 登录方式   | 支持                                                       |
| ---- | :--------- | :--------------------------------------------------------- |
| 2.1  | 动态验证码 | 字母/数字/算术                                             |
| 2.2  | 双因素认证 | 短信/时间令牌/邮件                                         |
| 2.3  | 短信认证   | 腾讯云短信/阿里云短信/网易云信                             |
| 2.4  | 时间令牌   | Google/Microsoft Authenticator/FreeOTP/支持 TOTP 或者 HOTP |
| 2.5  | 域认证     | Kerberos/SPNEGO/AD 域                                      |
| 2.6  | LDAP       | OpenLDAP/ActiveDirectory/标准 LDAP 服务器                  |
| 2.7  | 社交账号   | 微信/QQ/微博/钉钉/Google/Facebook/其他                     |
| 2.8  | 扫码登录   | 企业微信/钉钉/飞书扫码登录                                 |

3. 提供标准的认证接口以便于其他应用集成 SSO，安全的移动接入，安全的 API、第三方认证和互联网认证的整合。

4. 提供用户生命周期管理，支持 SCIM 2 协议；开箱即用的连接器(Connector)实现身份供给同步。

5. 简化微软 Active Directory 域控、标准 LDAP 服务器机构和账号管理，密码自助服务重置密码。

6. IDaas 多租户功能，支持集团下多企业独立管理或企业下不同部门数据隔离的，降低运维成本。

7. 认证中心具有平台无关性、环境多样性，支持 Web、手机、移动设备等, 如 Apple iOS，Andriod 等，将认证能力从 B/S 到移动应用全面覆盖。

8. 基于 Java EE 平台，微服务架构，采用 Spring、MySQL、Tomcat、Redis、MQ 等开源技术，扩展性强。

9. 开源、安全、自主可控，许可证 Apache 2.0 License & MaxKey 版权声明。

## 界面

![](/assets/img/news/MaxKey-4.0.2.png)

## 下载

当前版本百度网盘下载,<a href="http://www.//maxkey.top/zh/about/download.html" target="_blank"> 历史版本</a>

| 版本     | 日期       | 网盘(提取码)                                                                                   | Docker                                                                |
| -------- | :--------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| v 3.5.19 | 2023/08/15 | <a href="https://pan.baidu.com/s/1EQKN68DW-aSPv0_BeYdKFg" target="_blank">下载</a>( **mxk9** ) | <a href="https://hub.docker.com/u/maxkeytop" target="_blank">链接</a> |

## 版本说明

MaxKey v 3.5.19 GA 2023/08/15

```
    *(MAXKEY-230701) 增加配置:每次构建docker镜像时,可同时构建arm64镜像 * 增加配置:每次构建docker镜像时,可同时构建arm64镜像
    *(MAXKEY-230702) 优化CAS注销 CasLogout
    *(MAXKEY-230703) 修复资源管理无法添加资源 #I7EPYO
    *(MAXKEY-230704) 新增角色失败，数据入库问题。 #I7KMSJ
    *(MAXKEY-230705) 修复/sign/authz/cas/v1/tickets这个接口只要用户名正确，密码随便填都能通过 #I7LC07
    *(MAXKEY-230706) 日志记录采用异步方式写入
    *(MAXKEY-230707) 增加Dockerfile，方便镜像构建
    *(MAXKEY-230708) gradle升级到 8.0.2
    *(MAXKEY-230709) readme增加安装介绍链接
    *(MAXKEY-230710) 代码优化和整合
    *(MAXKEY-230711) 依赖项引用、更新和升级
        spring              5.3.29
        springBoot          2.7.14
        springSecurity      5.7.10
        tomcat              9.0.78
```
