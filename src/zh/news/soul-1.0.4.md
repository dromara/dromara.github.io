---
title: Soul网关发布1.0.4-RELEASE版本
author: xiaoyu
date: 2019-04-09
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: 新闻
---

### Soul 网关发布 1.0.4-RELEASE 版本

- 修复在 1.0.3 版本的后台管理中，出现的 bug。
- 配置信息序列化方式支持自定义扩展。默认的序列化方式由 kroy 改为了 java 序列化方式。
- dubbo 框架支持的更改。

### 对 dubbo 用户使用的更改。

- 在以前的版本中（1.0.2 or 1.0.3），dubbo 的参数是通过 header 头上传递，在 1.0.4 版本中是通过 body 传递

- 更新了相关的文档信息。

### 关于使用 1.0.4 版本的建议。

- 1.0.4 版本支持用户自定义插件开发，支持正则表达式的匹配。

- dubbo 参数传递的更改，我觉得这样会更加友好。

### 如果您之前使用的 1.0.2 版本，想要更新到 1.0.4 版本。

- 在插件表新增 role 字段。

- 重新启动 1.0.4 版本的管理后台。

- 执行同步所有插件（因为序列化方式的更改）

- 启动 1.0.4 版本的 soul-web 服务。

### 遇到问题？

- 添加 qq 群（429951241）

- 官网文档：https://dromara.org/website/zh-cn/docs/soul/soul.html

- github 地址: https://github.com/Dromara/soul

- gitee 地址： https://gitee.com/dromara/soul
