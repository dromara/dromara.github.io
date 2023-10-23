---
title: 欢迎开源项目 WEMQ 加入 Dromara 社区，物联网设备调试系统
author: wemq
date: 2023-09-25
cover: /assets/img/news/wemq-cover.png
head:
  - - meta
    - name: 新闻
---

## 项目背景

随着物联网技术的迅猛发展，越来越多的物联网设备被应用于各个行业和领域。物联网设备的调试和管理是确保设备正常运行和提供稳定服务的关键环节。然而，传统的物联网设备调试方案往往存在一些问题，如复杂的配置流程、安全性不足、功能不完善等。

为了解决这些问题，**WeMQ**应运而生。WeMQ 是一款面向物联网设备运营商的开源物联网设备调试系统，旨在提供完整的物联网设备调试方案，并集成了设备管理、MQTT 服务器管理、客户管理等功能。该系统采用自研的 Nmqs 通信层组件，实现了连接信息的加密，保证了数据的安全性。

WeMQ 的项目背景源于对物联网设备调试过程中存在问题的深入研究和理解。通过提供开源的解决方案，WeMQ 希望为物联网设备运营商提供一个高性能、安全可靠、功能强大的调试和管理平台，帮助他们简化设备调试流程、提高调试效率，并保证设备的稳定运行。

**项目的主要特性：**

1.  提供一套完整的物联网设备调试方案，包括设备管理、MQTT 服务器管理、客户管理等功能，帮助设备运营商简化调试流程。
2.  自研 Nmqs 通信层组件，实现连接信息的加密，确保数据传输的安全性。
3.  提供高性能、稳定可靠的服务，满足大规模物联网设备的调试和管理需求。
4.  开源项目，吸引更多的开发者参与贡献，推动物联网设备调试领域的发展。

通过 WeMQ，物联网设备运营商可以更轻松地进行设备调试和管理，提高工作效率，降低运营成本，并为最终用户提供更好的物联网设备体验。

<a href="https://gitee.com/dromara/WeMQ"><img src="https://gitee.com/dromara/WeMQ/badge/star.svg"></a>
<a href="https://gitee.com/dromara/WeMQ/members"><img src="https://gitee.com/dromara/WeMQ/badge/fork.svg"></a>
<a href="https://github.com/dromara/WeMQ/blob/master/LICENSE"><img src="https://img.shields.io/github/license/dromara/WeMQ.svg?style=flat-square"></a>

## 技术选型

#### 1\. 系统环境

- Java 8
- Servlet 3.0
- Apache Maven 3

#### 2\. 主框架

- Spring Boot 2.7.x
- Spring Framework 5.3.x
- Spring MVC 5.3.x

#### 3\. 持久层

- Mybatis 3.5.x
- Alibaba Druid 1.2.x
- Hibernate Validation 6.0.x
- Java MySQL Connector 8.0.x

#### 4\. 视图层

- Thymeleaf 3.x
- Bootstrap 5.x
- Layui 2.x

#### 5\. 工具类

- Apache Commons
- Hutool 5.x

#### 6\. 通信层

- Nmqs 实现连接信息加密、消息转发，支持 WS/TCP 协议连接
- Eclipse Paho

## 项目结构

````
cn.mmanager
├── mm-common            // 工具类
│       └── annotation                    // 自定义注解
│       └── constant                      // 通用常量
│       └── core                          // 核心控制
│       └── enums                         // 通用枚举
│       └── exception                     // 通用异常
├── mm-framework         // 框架核心
│       └── aspectj                       // 注解实现
│       └── interceptor                   // 拦截器
│       └── manager                       // 异步处理
│       └── web                           // 前端控制
├── mm-web         // Web服务
├── mm-dao        // 数据访问层
├── mm-service     // 业务层
├── mm-model       // 模型```
````

## 通信层

```
 _   _ __  __  ____   _____
 | \ | |  \/  |/ __ \ / ____|
 |  \| | \  / | |  | | (___
 | . ` | |\/| | |  | |\___ \
 | |\  | |  | | |__| |____) |
 |_| \_|_|  |_|\___\_\_____/
```

通信层组件在物联网设备调试系统中扮演着重要的角色，它负责设备与服务器之间的通信和数据传输。在 WeMQ 中，采用了自研的 Nmqs 通信层组件，它实现了连接信息的加密，确保数据传输的安全性。

**Nmqs 通信层组件具有以下特点和功能：**

1.  **连接信息加密**：Nmqs 采用先进的加密算法，对设备与服务器之间的连接信息进行加密处理。这样可以确保通信过程中的数据安全，防止信息被窃取或篡改。
2.  **安全认证**：Nmqs 提供了安全认证机制，确保只有经过授权的设备和服务器才能建立连接。通过身份验证和密钥交换等方式，确保通信双方的身份合法性和通信的安全性。
3.  **数据压缩和优化**：Nmqs 支持数据压缩和优化技术，可以在传输过程中对数据进行压缩，减少数据传输的带宽占用和传输延迟，提高通信效率。
4.  **可靠性保证**：Nmqs 具备可靠性保证机制，能够处理通信过程中的数据丢失、重传和错误处理。它采用可靠的传输协议，确保数据的完整性和可靠性。
5.  **适应性和灵活性**：Nmqs 通信层组件具有良好的适应性和灵活性，可以适应不同的网络环境和设备类型。它支持多种通信协议和网络传输方式，能够适应不同的物联网设备调试场景。

通过自研的 Nmqs 通信层组件，WeMQ 能够提供安全可靠的设备与服务器之间的通信服务。它保护设备数据的安全性，确保通信过程的可靠性和稳定性，为物联网设备调试和管理提供了强大的基础支持。

## 开源地址

**Gitee：https://gitee.com/dromara/WeMQ**

**Github：https://github.com/dromara/WeMQ**

## Issues & Pull Requests

欢迎提交 Issues 和 Pull Requests，开源大门永远向所有人敞开。

## 作者介绍

- 名称：NicholasLD
- 全栈开发工程师，物联网爱好者
- Dromara 开源组织成员，dromara/WeMQ 作者

**联系方式：**

- Email: 878639947@qq.com
- QQ: 878639947
- WeChat: NicholasLD505
