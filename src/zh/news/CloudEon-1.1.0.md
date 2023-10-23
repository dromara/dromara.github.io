---
title: 云原生大数据平台CloudEon V1.1.0版本发布！
author: CloudEon开源
date: 2023-07-31
cover: /assets/img/news/CloudEon-1.1.0.png
head:
  - - meta
    - name: 新闻
---

CloudEon 社区的小伙伴们大家好，今天很高兴宣布 CloudEon 于 2023 年 7 月 28 日正式发布 1.1.0   版本。

非常感谢 CloudEon 开源社区成员对 1.1.0 版本发布做出的贡献。

## 重要更新

1.1.0 版本主要有如下重大更新：

**新增功能：**

- 支持 Kyuubi 服务,实现 Spark SQL 查询
- 增加 Kyuubi 监控面板
- 支持 Iceberg 数据湖功能,实现 Iceberg 在 Flink 和 Spark 上的集成
- 支持 Elasticsearch 组件
- 支持数据采集 seatunnel 组件
- 支持 OLAP 组件 Kylin5
- 支持实时计算 Dinky 组件

**优化改进：**

- 优化组件 Docker 镜像,精简大小
- 改进节点 SSH 连接,支持指定私钥
- 优化监控面板,修复多个面板问题
- 优化部分组件的容器资源控制问题，包括 hbase/flink/spark/hive/yarn/hdfs/zookeeper

**修复缺陷：**

- 修复停止服务时角色 Pod 错乱的问题
- 修复 Zookeeper 无法修改客户端端口的问题
- 修复 HBase Shell 无法在 Pod 中使用的问题
- 修复偶尔出现 ssh 导致的命令执行卡住问题
- 修复 hive 容器缺失 mysql 驱动问题

详情可查看：

https://github.com/dromara/CloudEon/releases/tag/v1.1.0

## 安装部署

### **Docker 部署（推荐）**

如果你本地已经安装了 docker，执行以下命令可以一键安装：

```
docker run  -p 7700:7700  --name cloudeon --rm registry.cn-hangzhou.aliyuncs.com/udh/cloudeon:v1.1.0
```

镜像启动成功后，在浏览器中访问 http://docker_ip:7700 进入登录页。镜像中提供初始账户，用户名 admin 密码 admin

更多配置信息可以查看项目文档。

## 社区参与

CloudEon 项目依靠社区发展，我们致力为用户提供简单易用的大数据产品，我们强调社区协作，互相帮助，共同成长。

首先，如果您在下载和使用 CloudEon 1.1.0 中发现任何问题，欢迎使用 Github Issues 功能，将您遇到的问题和社区分享。

https://github.com/dromara/CloudEon/issues

如果您或者您的公司正在使用 CloudEon，并乐意与社区分享，可以在**Who is using Cloudeon?** 中进行留言。

https://github.com/dromara/CloudEon/issues/20

我们也接受其他任何形式的帮助，详见：

https://docs.cloudeon.top/en/dev/%E7%A4%BE%E5%8C%BA%E8%B4%A1%E7%8C%AE/contribute/

## 致谢

CloudEon 1.1.0 版本的发布离不开所有社区成员的支持和反馈，在社区驱动的模式下，CloudEon 才得以有今天的发展态势，真诚地感谢每一位社区贡献者及用户的信任、支持和帮助。

特别感谢对 1.1.0 版本直接贡献的社区成员：

@Pandas886

@limaiwang

@KangTomwk

@linshenkx

@tgluon

@Mericol

@linzehao

@wangkang1

@pan3793

@tangxiuhong

另外感谢@wangkang1 贡献组件扩展文档，如果社区小伙伴有想要扩展组件的需求，可以参考文档：

https://docs.cloudeon.top/en/dev/component\_extension/

## 项目简介

CloudEon 是一款基于 Kubernetes 的云原生大数据平台，旨在为用户提供一种简单、高效、可扩展的大数据解决方案。如果 CloudEon 项目对您有帮助，请在 Gitee 或 Github 搜索 CloudEon 支持一下，点击 star 加关注。

CloudEon 遵循 Apache-2.0 开源协议，代码完全开源，如果您想为开源社区做出贡献，非常欢迎加入 CloudEon 项目，与其他开发者一起共同推动项目的发展。

Gitee：https://gitee.com/dromara/CloudEon

Github：https://github.com/dromara/CloudEon

官网：https://cloudeon.top/

欢迎加入社区技术交流

公众号：CloudEon 开源

微信社区：

![](/assets/img/news/CloudEon-1.2.0-4.png)
