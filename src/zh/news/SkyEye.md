---
title: 云智能制造平台 SkyEye 加入 Dromara 开源社区
author: SkyEye
date: 2024-08-27
cover: /assets/img/news/SkyEye-0.jfif
head:
  - - meta
    - name: 新闻
---

## 作者介绍

*   名称：卫志强
    
*   dromara开源组织成员，dromara/skyeye-oa 作者
    
*   开源主打办公软件，包括OA、CRM、ERP、CMS、MES、ADM、IM、SM、SCM、HRM等。
    
*   个人空间：https://gitee.com/doc\_wei01\_admin
    

## 关于 Skyeye云智能制造平台

Skyeye云智能制造平台，采用Springboot + winUI的低代码平台开发模式。包含30多个应用模块、50多种电子流程，CRM、PM、ERP、MES、ADM、EHR、笔记、知识库、项目、门店、商城、财务、多班次考勤、薪资、招聘、云售后、论坛、公告、问卷、报表设计、工作流、日程、云盘等全面管理，实现智能制造行业一体化管理。实现管理流程“客户关系-> 线上/线下报价->销售报价->销售合同->生产计划->商品设计->采购->加工制造->入库->发货->售后服务”的高效运作，同时实现企业员工的管理以及内部运作的流程操作，完善了员工从“入职->培训->转正->办公->离职”等多项功能。

![](/assets/img/news/SkyEye-0.jfif)

## 功能结构图

> 功能结构图内容较多，加载可能会有点慢，请耐心等待。

具体的功能内容可前往查看：https://gitee.com/dromara/skyeye

![](/assets/img/news/SkyEye-1.jfif)

## 功能效果图

> `Skyeye`云整套系统中包含了很多功能，并且每个功能之间都是打通的。这里不放那么多的截图。

### PC端效果图

#### 基础内容

![](/assets/img/news/SkyEye-2.png)

![](/assets/img/news/SkyEye-3.png)

#### CRM

![](/assets/img/news/SkyEye-4.png)

![](/assets/img/news/SkyEye-5.png)

![](/assets/img/news/SkyEye-6.png)

#### ERP + MES + 仓库

![](/assets/img/news/SkyEye-7.png)

![](/assets/img/news/SkyEye-8.png)

![](/assets/img/news/SkyEye-9.png)

#### 行政办公

![](/assets/img/news/SkyEye-10.png)

![](/assets/img/news/SkyEye-11.png)

![](/assets/img/news/SkyEye-12.png)

### 移动端效果图

> 移动端和PC端功能类似，这里不截那么多图拉。

![](/assets/img/news/SkyEye-13.png)

![](/assets/img/news/SkyEye-14.png)

![](/assets/img/news/SkyEye-15.png)

## 架构介绍

![](/assets/img/news/SkyEye-16.png)

### 技术选型

#### 后端技术:

| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| Spring Cloud Alibaba | 微服务框架 | 2.1.0.RELEASE | 文档 |
| Nacos | 配置中心 & 注册中心 | 1.4.3 | 文档 |
| RocketMQ | 消息队列 | 4.0.0 | 文档 |
| Sentinel | 服务保障 | 2.1.0.RELEASE | 文档 |
| XXL Job | 定时任务 | 2.3.0 | 文档 |
| Spring Cloud Zuul | 服务网关 | 3.4.1 | 文档 |
| MySQL | 数据库服务器 | 5.7 / 8.0+ |   
 |
| Druid | JDBC 连接池、监控组件 | 1.2.23 | 文档 |
| MyBatis Plus | MyBatis 增强工具包 | 3.5.7 | 文档 |
| Redis | key-value 数据库 | 5.0 / 6.0 |   
 |
| Flowable | 工作流引擎 | 6.8.0 | 文档 |
| Spring Boot Admin | Spring Boot 监控平台 | 2.0.3 | 文档 |
| hutool | 一个小而全的Java工具类库 | 5.5.4 | 文档 |
| Lombok | 消除冗长的 Java 代码 | 1.16.22 | 文档 |
| JUnit | Java 单元测试框架 | 4.12 | \- |

#### 前端技术：

| 框架 | 技术 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| layui | 模块化前端UI | 2.6.7 | 文档 |
| winui | win10风格UI | 自研 | \- |
| uni-app | 一个使用Vue.js开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序、快应用等多个平台。 | VUE3 | 文档 |

## 友情链接

\[项目源码\] https://gitee.com/dromara/skyeye  
\[技术文档\] https://articles.zsxq.com/id\_xi3xhacte72g.html

## 沟通交流

`Skyeye云`是一个维护了6年+的一个智能制造的项目，期间做了多次代码的重构，之前是只做商业版的内容，现在全部`开源`出来，方便大家的学习与使用。不过作者也是需要生存的，所以全部源代码以及文档放在了知识星球，进入星球即可获取全部源代码哈。欢迎大家的加入~~~

  

| 知识星球                            | 微信公众号(Skyeye智能制造云办公)     |
| ----------------------------------- | ------------------------------------ |
| ![](/assets/img/news/SkyEye-17.png) | ![](/assets/img/news/SkyEye-18.jfif) |