---
title: 云原生大数据平台CloudEon V1.2.0版本发布！
author: CloudEon开源
date: 2023-09-07
cover: /assets/img/news/CloudEon-1.2.0-3.png
head:
  - - meta
    - name: 新闻
---

### **新增功能（Features）：**

1\. 实现用 k8s job 进行初始化服务任务，替换原来用 ssh 执行命令的方式，提高兼容性和更好监听状态和获取日志

2\. 增加 namespace 设置功能，不再写死 default namespace

![](/assets/img/news/CloudEon-1.2.0-1.png)

3\. 集成新组件 Trino

![](/assets/img/news/CloudEon-1.2.0-2.png)

4\. 集成新组件 Amoro

![](/assets/img/news/CloudEon-1.2.0-3.png)

5\. 初步集成 filebeat 用于大数据服务的日志采集

6\. 实现下载服务实例配置文件接口

### **修复缺陷（Bug Fixes）：**

1.  修复安装 dinky，SQL 脚本找不到问题
2.  修复 flink standalone 的 rest 地址无法外部访问
3.  修复 hdfs 组件的环境变量，导致 pod 内无法正常使用 hdfs 命令
4.  修复 flink 提交任务到 YARN 集群问题

### **优化改进（Enhancements）：**

1.  组件 jvm 参数增加 gc 日志文件生成
2.  优化贡献文档
3.  优化任务日志输出，精简日志内容
4.  选择框架会自动显示内置的服务版本
5.  FAQ 文档增加去除节点污点方式
6.  优化 deployment 启动，删除无用日志打印
7.  优化 K8S 节点信息提取 hostname 和 ip，兼容 K8S 和 K3S

---

\[项目简介\]

CloudEon 是一款基于 Kubernetes 的云原生大数据平台，旨在为用户提供一种简单、高效、可扩展的大数据解决方案。如果 CloudEon 项目对您有帮助，请在 Gitee 或 Github 搜索 CloudEon 支持一下，点击 star 加关注。

CloudEon 遵循 Apache-2.0 开源协议，代码完全开源，如果您想为开源社区做出贡献，非常欢迎加入 CloudEon 项目，与其他开发者一起共同推动项目的发展。

Gitee：https://gitee.com/dromara/CloudEon

Github：https://github.com/dromara/CloudEon

官网：https://cloudeon.top/

欢迎加入社区技术交流

公众号：CloudEon 开源

微信社区：

![](/assets/img/news/CloudEon-1.2.0-4.png)
