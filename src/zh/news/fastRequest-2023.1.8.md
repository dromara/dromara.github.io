---
title: 支持变量，IDEA 插件 Fast Request 2023.1.8发布
author: Kings
tag:
  - fastRequest
date: 2023-08-02
cover: https://api-buddy.cn/img/rfr.svg
head:
  - - meta
    - name: 新闻
---

## 简介

[**Restful Fast Request**](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F16988-restful-fast-request)是一个类似于 Postman 的 IDEA 插件。它是一个强大的 restful api 工具包插件，可以根据已有的方法帮助您快速、自动生成 url 和 params。 Restful Fast Request = API 调试工具 + API 管理工具 + API 搜索工具。 它有一个漂亮的界面来完成请求、检查服务器响应、存储你的 api 请求和导出 api 请求。插件帮助你在 IDEA 界面内更快更高效得调试你的 API。

**Restful Fast Request 为简化 API 调试而生**

![](https://oscimg.oschina.net/oscnet/up-2c30405e687d4f8e9163f8973fe3126c029.gif)

**倾听用户的声音，不断提升自我**，本次**Restful Fast Request**更新主要内容如下：

**新功能、优化项、修复项**

- **Environment**
- **方法描述截断**
- **Instant 类型解析**
- **Windows 系统 APIs 中目录删除**

## **1\. Environment**

### **1.1 定义**

Environment 中可以设置存储一些变量，并且在其他地方使用`{{key}}`来替换固定值或者魔法值。

可以在以下场景中使用`{{key}}`

- Url
- Headers
- Path Params
- URL Params
- Body

  - JSON
  - Form URL-Encoded
  - Multipart

Environment 的 Tab 值取自项目域名配置中的`环境`，key 需要满足正则表达式`^[a-zA-Z_$][a-zA-Z0-9_$]*$`

![](/assets/img/news/fastRequest-2023.1.8-1.png)

聚焦表格后，可以输入 key 值来快速定位行

## 1.2 使用

在 Value 中直接输入`{{key}}`来替换固定值或者魔法值，当替换后，如果 Environment 中包含此 key 则会绿色高亮。鼠标悬浮 500ms 后可以显示当前的 Environment 值

![](/assets/img/news/fastRequest-2023.1.8-2.png)

也可以选中**单行**，并点图标 E 击从列表从选择。

![](/assets/img/news/fastRequest-2023.1.8-3.jpg)

## 1.3  脚本支持

参考 脚本 -> demo -> 设置一个 Environment 变量

![](/assets/img/news/fastRequest-2023.1.8-4.jpg)

## 2.方法描述截断

针对方法名过于长，导致显示或者数据保存的时候方法描述过程，可以进行截断设置。例如`SearchEveryWhere`

![](/assets/img/news/fastRequest-2023.1.8-5.jpg)

## 更多详情

请点击 ------------->[**这里**](https://api-buddy.cn/guide/history.html)

**看完还不赶紧上号？**
