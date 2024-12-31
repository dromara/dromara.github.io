---
title: 函数支持，Fast Request 2024.1.7 发布
author: Fast Request
date: 2024-09-24
cover: https://api-buddy.cn/img/rfr.svg
tag:
  - fastRequest
head:
  - - meta
    - name: 新闻
---

**Fast Request**是一个类似于 Postman 的 IDEA 插件。它是一个强大的 restful api 工具包插件，可以根据已有的方法帮助您快速、自动生成 url 和 params。Restful Fast Request = API 调试工具 + API 管理工具 + API 搜索工具。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的 api 请求和导出 api 请求。插件帮助你在 IDEA 界面内更快更高效得调试你的 API。

**最新域名**：**api-buddy.c**n

**Fast Request 为简化 API 调试而生，3 秒调完 Spring 接口不是梦**，所以少年，赶紧**上号**吧

![](https://api-buddy.cn/img/rfr.svg)

**倾听用户的声音，不断提升自我**，本次**Fast Request**更新主要内容如下：

*   **函数与变量支持代码补全**
    
*   **JSON filter支持**
    
*   **Header 常用值支持代码补全**
    
*   **@FeignClient 扫描支持**
    
*   **文件默认值支持**
    
*   **异常上报支持**
    
*   **SearchEveryWhere 结果排序优化**
    
*   **Script语法提示优化**
    
*   **Map 解析优化**
    
*   **修复 Jar 中的 url 扫描结果展示为空**
    
*   **若干已知问题优化**
    

## 函数与变量支持代码补全

![](/assets/img/news/FastRequest-2024.1.7-1.png)

![](/assets/img/news/FastRequest-2024.1.7-2.png)

![](/assets/img/news/FastRequest-2024.1.7-3.png)

支持变量`{{xx}}`与`{{$函数名}}`的代码补全

函数支持更多信息请参考---->**函数**

## JSON filter支持

![](/assets/img/news/FastRequest-2024.1.7-4.png)

jsonFilter

当 JSON 字段较多，但是只需要一部分的时候，可以通过该功能对 JSON进行字段过滤

## Header 常用值支持代码补全

![](/assets/img/news/FastRequest-2024.1.7-5.png)

header

对于一些例如`Authorization`、`token`的请求头支持代码补全

## @FeignClient 扫描

![](/assets/img/news/FastRequest-2024.1.7-6.png)

feignClientSupport

支持对`org.springframework.cloud.openfeign.FeignClient`的扫描，优化 path 路径解析结果

## @文件默认值支持

![](/assets/img/news/FastRequest-2024.1.7-7.png)

defaultMultipartFile

Multipart 类型字段可以通过该配置设置默认文件路径

## 异常上报支持

![](/assets/img/news/FastRequest-2024.1.7-8.png)

errorReport

更加方便得上报错误，这可以使得作者可以更好得修复和定位 bug。

## SearchEveryWhere 结果排序优化

![](/assets/img/news/FastRequest-2024.1.7-9.png)

searchEveryWhere

按照Url 路径优化了匹配的排序规则，将匹配度高的排在前面

## Script 语法提示优化

![](/assets/img/news/FastRequest-2024.1.7-10.png)

scriptHint

前提是需要点击安装依赖 lib，使用`rfr.request`、`rfr.response`替换以获得代码补全提示。

原先的内置变量`request`、`response`依然可以使用，但是代码补全提示不友好。

更多内置变量请参考\*\*Script->rfr\*\*

## 更多详情

请点击 ------------->**这里** https://api-buddy.cn/guide/history.html#\_2024-1-7

**看完还不赶紧上号？**