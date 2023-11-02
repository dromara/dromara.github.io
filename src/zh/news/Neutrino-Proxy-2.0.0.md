---
title: 内网穿透神器-中微子代理(NeutrinoProxy)2.0.0重磅发布
author: NeutrinoProxy
date: 2023-10-30
cover: /assets/img/news/Neutrino-Proxy-1.9.0-1.png
head:
  - - meta
    - name: 新闻
---

## 中微子代理(NeutrinoProxy)2.0.0 重磅发布

## 项目简介

- 中微子代理(neutrino-proxy) 是一款基于 netty 的内网穿透神器。该项目采用最为宽松的 MIT 协议，因此您可以对它进行复制、修改、传播并用于任何个人或商业行为。
- 市面上基于内网穿透的常见产品有：花生壳、TeamView、cpolar 等。
- 常见的使用场景：

- 本地开发调试第三方回调
- 本地开发异地接口连调
- 远程登录内网 windows 机器
- 将本地服务映射到外网，用于演示

- Gitee 仓库：https://gitee.com/dromara/neutrino-proxy
- Github 仓库：https://github.com/dromara/neutrino-proxy
- 官网地址 1: https://neutrino-proxy.dromara.org
- 官网地址 2: https://dromara.gitee.io/neutrino-proxy

## 主要特点：

- 1、流量监控：首页图表、报表管理多维度流量监控。全方位掌握实时、历史代理数据。
- 2、用户/License：支持多用户、多客户端使用。后台禁用实时生效。
- 3、端口池：对外端口统一管理，支持用户、License 独占端口。
- 4、端口映射：新增、编辑、删除、禁用实时生效。
- 5、Docker：服务端/客户端支持 Docker 一键部署。
- 6、SSL 证书：隧道通信支持 SSL 加密，保护您的数据安全。
- 7、域名映射：支持绑定子域名，方便本地调试三方回调
- 8、多种协议：支持代理 TCP、HTTP、HTTPS、UDP 协议
- 9、原生部署：支持编译为原生可执行文件，更低部署门槛、更少内存占用
- 10、采用最为宽松的 MIT 协议，免去你的后顾之忧

## 本次更新内容

- solon 版本升级为`2.5.12-M1`
- jdk 版本升级为 17
- 支持原生编译改造
- 默认支持的数据库由 sqlite 改为 h2
- 官方默认使用的 docker 镜像仓库从阿里云改为 dockerhub

## 安装使用说明

- 快速上手：点击这里
- 升级须知：

- jdk 版本升级为了 jdk17，jar 部署时请注意
- 去掉了默认的 sqlite 数据库，改为了 h2。如果之前使用 sqlite，请自行处理数据迁移
- 配置文件做了较大调整，请参照官网使用须知中的`服务端配置`、`客户端配置`进行更新

## 运行示例

#### 本地原生启动截图

![](/assets/img/news/Neutrino-Proxy-2.0.0-1.png)

#### 管理后台首页

![](/assets/img/news/Neutrino-Proxy-1.9.0-1.png)

#### 端口映射

![](/assets/img/news/Neutrino-Proxy-2.0.0-2.png)

## 联系我们

笔者时间、能力有限，且开源项目非一朝一夕之事，存在众多问题亦在所难免。使用、学习过程中有任何问题欢迎大家与我联系。

对项目有什么想法或者建议，可以加我微信拉交流群，或者创建 issues，一起完善项目

- 微信号：yuyunshize
- Email: aoshiguchen@dromara.org
- 微信二维码（添加时请备注"中微子进群"）：

 <img src="/assets/img/news/Neutrino-Proxy-1.9.0-2.jpg" height="340">
