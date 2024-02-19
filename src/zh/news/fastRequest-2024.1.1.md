---
title: IDEA 插件 Fast Request 2024.1.1 强势来袭
author: Fast Request
tag:
  - fastRequest
date: 2024-01-16
cover: /assets/img/news/fastRequest-2024.1.1-0.png
head:
  - - meta
    - name: 新闻
---

# 简介

**Restful Fast Request** 是一个类似于 Postman 的 IDEA 插件。它是一个强大的 restful api 工具包插件，可以根据已有的方法帮助您快速、自动生成 url 和 params。Restful Fast Request = API 调试工具 + API 管理工具 + API 搜索工具。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的 api 请求和导出 api 请求。插件帮助你在 IDEA 界面内更快更高效得调试你的 API。

**最新域名**：**api-buddy.cn**

**Restful Fast Request 为简化 API 调试而生，3 秒调完 Spring 接口不是梦**，所以少年，赶紧**上号**吧

**倾听用户的声音，不断提升自我**，本次**Restful Fast Request**更新主要内容如下：

**重要功能、新功能、优化项、修复项**

- **SearchEveryWhere 支持类名搜索**
- **.fastRequest 目录生成策略**
- **忽略字段名解析支持**
- **Apis,Navigate 弹框打开支持**
- **Content-Disposition 支持优化**
- **SearchEveryWhere 性能优化**
- **Navigate 中的 api 加载性能优化**
- **Markdown 文档批量 api 导出增加返回值文档**
- **集合泛型解析错误**

## 1.SearchEveryWhere 支持类名搜索

![](/assets/img/news/fastRequest-2024.1.1-0.png)

searchEveryWhere

输入 Url 所在的类名，即可搜索该类下面的所有 API

## 2.fastRequest 目录生成策略

默认打开 Project 不再生成.fastRequest 目录，只有操作插件才生成

### 3.忽略字段名解析支持

![](/assets/img/news/fastRequest-2024.1.1-1.png)

ignoreFiled

只需要在配置中增加字段名，即可将实体类中的特定字段忽略生成

## 4.Apis,Navigate 弹框打开支持

![](/assets/img/news/fastRequest-2024.1.1-2.png)

![](/assets/img/news/fastRequest-2024.1.1-3.png)

可以通过快捷键快速打开 Apis 和 Navigate 窗口查看信息, 窗口打开的情况下再按 ESC 可以关闭窗口

## 5.SearchEveryWhere 性能优化

优化了 SearchEveryWhere 搜索逻辑，大大提生大项目的搜索性能。我们测试了拥有 7000 个 API 的项目，搜索响应非常快

## 6.Content-Disposition 支持优化

文件下载支持针对一下 2 种格式的支持，同时支持文件名转码

```
Content-Disposition:attachment; filename*=UTF-8''fastRequest%20.txt
Content-Disposition:attachment; filename=fastRequest.txt


```

还有非常多的细节优化不再一一描述，赶紧升级吧！

# 更多详情

请点击 ------------->**这里 https://api-buddy.cn/guide/history.html**

**看完还不赶紧上号？**
