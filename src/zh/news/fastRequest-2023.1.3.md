---
title: Fast Request 2023.1.3重磅发布，支持团队协作
author: 阿胜
tag:
  - fastRequest
date: 2023-04-18
cover: https://api-buddy.cn/img/rfr.svg
head:
  - - meta
    - name: 新闻
---

## 简介

Restful Fast Request  是一个类似于 Postman 的 IDEA 插件。它是一个强大的 restful api 工具包插件，可以根据已有的方法帮助您快速、自动生成 url 和 params。Restful Fast Request = API 调试工具 + API 管理工具 + API 搜索工具。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的 api 请求和导出 api 请求。插件帮助你在 IDEA 界面内更快更高效得调试你的 API。

Restful Fast Request 为简化 API 调试而生

倾听用户的声音，不断提升自我，本次  Restful Fast Request  更新主要内容如下：

**新功能、优化项、修复项**

- **重量级更新：团队协作支**
- **OpenAI API 接口优化字段支持**
- **API 与存储文件跳转**
- **项目配置刷新**
- **rfr.currentModuleName 支持**
- **工具栏优化**
- **LocalDateTime、LocalDate、LocalTime 解析优化**
- **GET、POST、DELETE、PUT、PATCH 图标优化**
- **修复 IDEA 2023.1 响应未格式化**
- **修复 Mapping 为数组的时候 URL 随机生成**
- **修复 Kotlin 字段注释未生成**

## **1\. 团队协作支**

**我们费了非常大的精力，对插件进行了重大的重构，将原先的单机版改成了支持团队协作版，通过文件版本管理系统，实现部分配置及所有 API 的共享。但是可能也带来了一些 bug，希望开发者能体谅！**

同时我们也希望开发者们能在团队中推广并分享 Restful Fast Request 插件，在此非常感谢！

![](/assets/img/news/fastRequest-2023.1.3-1.png)

更多详情请看 -> 团队协作支持

## **2\. OpenAI API 接口优化字段支持**

利用 OpenAI 接口，替换随机字段值。注意由于 API 是非结构向数据，所以返回的内容可能会有误差

![](/assets/img/news/fastRequest-2023.1.3-2.gif)

## **3\. API 与存储文件跳转**

实现 API 以及底层保存的 json 数据进行关联跳转

![](/assets/img/news/fastRequest-2023.1.3-3.png)

## **4\. API 与存储文件跳转项目配置刷新**

**配置文件更新后，UI 实现项目级别配置更新**

![](/assets/img/news/fastRequest-2023.1.3-4.png)

## **5\. rfr.currentModuleName 支持**

脚本 中用于获取当前 API 所属模块支持

## **6. Api 文档同步支持自定义分支**

支持特定分支，因为有些情况下 master 被保护不允许 push

![](/assets/img/news/fastRequest-2023.1.3-5.png)

## **7.  工具栏优化**

**1.垂直工具栏支持 2.按钮位置调整和折叠**

## **8. GET、POST、DELETE、PUT、PATCH 图标**

**对图标进行了圆角处理，并且调整了背景色**

## **修复重要 bug**

**1\. IDEA 2023.1 响应未格式化\*\***2\. Mapping 为数组的时候 URL 随机生成 3. Kotlin 字段注释未生成 4. 若干已知 bug 修复\*\*

## 更多详情

请点击 ------------->**这里** https://dromara.gitee.io/fast-request/guide/history.html
