---
title: MaxKey单点登录认证系统4.0.1,修复重要漏洞
author: MaxKey
tag:
  - MaxKey
date: 2023-09-19
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

8. 配置化的密码策略、访问策略；支持 Ip2region 或 GeoLite2 地理库精准 IP 定位 ，强大安全审计，对用户全生命周期审计、访问行为记录追溯审计、安全合规审计、安全风险预警。

9. 基于 Java EE 平台，微服务架构，采用 Spring、MySQL、Tomcat、Redis、MQ 等开源技术，扩展性强。

10. 开源、安全、自主可控，许可证 Apache 2.0 License & MaxKey 版权声明。

## 界面

![](/assets/img/news/MaxKey-4.0.2.png)

## 下载

当前版本百度网盘下载,<a href="http://www.//maxkey.top/zh/about/download.html" target="_blank"> 历史版本</a>

| 版本    | 日期       | 网盘(提取码)                                                                                   | Docker                                                                |
| ------- | :--------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| v 4.0.1 | 2023/09/19 | <a href="https://pan.baidu.com/s/1pY_V6rIOnGLaOZtdllwDlw" target="_blank">下载</a>( **mxk9** ) | <a href="https://hub.docker.com/u/maxkeytop" target="_blank">链接</a> |

## 版本说明

MaxKey v 4.0.1 GA 2023/09/019

```
    *(MAXKEY-230901) !24 fix:shell启动脚本错误 * fix:启动脚本的JAVA_MAINCLASS有误 @tzk007
    *(MAXKEY-230902) 组权限问题修复
    *(MAXKEY-230903) !25修复错误的表别名使用
    *(MAXKEY-230904) GroupMemberMapper.xml 下memberNotIn sql 错误 @OomiyaShinobu
    *(MAXKEY-230905) 增加 scripts，用于处理安装依赖与镜像问题 @徐晓伟
    *(MAXKEY-230906) 修改启动getProperty("server.port")
    *(MAXKEY-230907) 修复用户组bug
    *(MAXKEY-230908) 应用访问空值问题
    *(MAXKEY-230909) 用户组-资源绑定关系
    *(MAXKEY-230910) 删除历史sql文件
    *(MAXKEY-230911) 依赖项引用、更新和升级
```

## Roadmap

### 增强身份管理

### 数据同步优化

### 权限管理优化
