---
title: 支持 Postman 同步,IDEA 插件 Fast Request 2023.2.3 发布
author: Fast Request
tag:
  - fastRequest
date: 2023-12-20
cover: /assets/img/news/fastRequest-2023.2.3-0.png
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

- **feat:API 同步至 Postman**
- **feat:自动域名切换项目名下拉框自动切换**
- **feat:Markdown 文档模板配置**
- **feat:JSON5 支持**
- **perf:Environment 重构**
- **perf:项目域名添加优化**
- **perf:api 文档同步触发在 api 保存的时候**
- **perf:忽略字段使用 @fastRequestParseIgnore**
- **fix:SearchEveryWhere 兼容 idea2023.3**
- **fix:body 中传非 json 报错**
- **fix:历史请求显示错误**

## 1\. API 同步至 Postman

仅需配置 Postman 的 token 和对应 workspace 的 ID，再点击保存或同步按钮。即可将 API 上传到 Postman.无需额外操作。

同时支持了 Environment 变量的上传和域名的变量上传。

![](/assets/img/news/fastRequest-2023.2.3-0.png)

![](/assets/img/news/fastRequest-2023.2.3-1.png)

![](/assets/img/news/fastRequest-2023.2.3-2.png)

## 2. **Markdown 文档模板配置**

利用 Velocity 和 Markdown 技术，实现导出文档和 \*\*Api 在线文档 \*\*自定义格式实现，满足用户各种样式类型文档的输出。

\*\*点击\*\*查看文档

![](/assets/img/news/fastRequest-2023.2.3-3.png)

![](/assets/img/news/fastRequest-2023.2.3-4.png)

![](/assets/img/news/fastRequest-2023.2.3-5.png)

### 3\. JSON5 支持

请求体 JSON5 格式支持,JSON 字段注释支持等

![](/assets/img/news/fastRequest-2023.2.3-6.png)

json5

## 4\. Environment 重构

Environment 区分为本地值(Current value)和共享值(Initial value)

Initial value 可以通过提交 .fastRequest/config/fastRequestCurrentProjectEnvironment.json 实现共享

![](/assets/img/news/fastRequest-2023.2.3-7.png)

## 5\. 项目域名添加优化

添加项目名的时候，自动识别 module 名称作为下拉框选项,也可以自定义输入.

![](/assets/img/news/fastRequest-2023.2.3-8.png)

projectName

## 6\. 忽略字段使用@fastRequestParseIgnore

针对实体类需要忽略解析的字段,可以在注释中添加@fastRequestParseIgnore 来实现,原来的注解@parseIgnore 依然适用，减少代码入侵

```
/**
 * xxx description
 * @fastRequestParseIgnore
 */
private String someIgnoreField ;

```

还有非常多的细节优化不再一一描述，赶紧升级吧！

# 更多详情

请点击 ------------->**这里 https://api-buddy.cn/guide/history.html**

**看完还不赶紧上号？**
