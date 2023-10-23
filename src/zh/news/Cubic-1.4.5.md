---
title: 一站式问题定位解决平台 Cubic v1.4.5 发布
author: 架构技术专栏
date: 2023-05-08
cover: /assets/img/news/Cubic-1.4.5-5.png
head:
  - - meta
    - name: 新闻
---

##   此次版本更新主要功能：

- **重点**：新增自定义 ClassLoader,确保 agent 代码和业务代码分别由不同 Classloader 加载，避免互相污染
- 剥离 agent 核心代码到单独 jar 包，增强隔离性，并为插件化做准备
- 优化线程抓取功能的逻辑适配

**欢迎大家探讨 star**

**Gitee: https://gitee.com/dromara/cubic**

**Github: https://github.com/dromara/cubic**

**官网地址：http://cubic.jiagoujishu.com**

#### 功能展示

##### 1、实例中心（展示当前实例信息）

![](/assets/img/news/Cubic-1.4.5-1.png)

##### 2、基础信息（点击实例-》展示当前实例的基础信息）

![](/assets/img/news/Cubic-1.4.5-2.png)

##### 3、依赖监控（点击实例-》展示当前实例的依赖包信息）

![](/assets/img/news/Cubic-1.4.5-3.png)

##### 4、Arthas 命令操作

![](/assets/img/news/Cubic-1.4.5-4.png)

![](/assets/img/news/Cubic-1.4.5-5.png)

##### 5、线程池监控

![](/assets/img/news/Cubic-1.4.5-6.png)

##### 6、实时线程栈

![](/assets/img/news/Cubic-1.4.5-7.png)

##### 7、历史线程栈

![](/assets/img/news/Cubic-1.4.5-8.png)
