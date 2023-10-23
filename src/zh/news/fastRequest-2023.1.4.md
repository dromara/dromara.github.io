---
title: 支持自动域名，Fast Request 2023.1.4 发布
author: 阿胜
tag:
  - fastRequest
date: 2023-04-27
cover: https://api-buddy.cn/img/rfr.svg
head:
  - - meta
    - name: 新闻
---

## 简介

Restful Fast Request  是一个类似于 Postman 的 IDEA 插件。它是一个强大的 restful api 工具包插件，可以根据已有的方法帮助您快速、自动生成 url 和 params。Restful Fast Request = API 调试工具 + API 管理工具 + API 搜索工具。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的 api 请求和导出 api 请求。插件帮助你在 IDEA 界面内更快更高效得调试你的 API。

Restful Fast Request 为简化 API 调试而生

倾听用户的声音，不断提升自我，本次  Restful Fast Request  更新主要内容如下：

新功能、优化项、修复项

- 自动域名
- SearchEveryWhere 支持搜索 jar 包中的 url
- Script 项目级别头设置失败

## 1.  自动域名

配置文件解析逻辑

1.  读取  application.yml  或者  bootstrap.yml。如果找到配置  server.port  或者  server.servlet.context-path，则取该配置。
2.  如果以上配置文件无法找到  server.port  或者  server.servlet.context-path，则读取  spring.profiles.active，作为变量 env。接着寻找  application-env.yml  或者  bootstrap-env.yml，寻找配置  server.port  或者  server.servlet.context-path
3.  properties 和 yaml 文件逻辑类似
4.  以上配置无法找到则  port=8080，context-path=/
5.  项目名称取自模块名
6.  spring.profiles.active 不支持 Maven 变量读取解析，例如 spring.profiles.active=@active.env@ 针对历史已保存的 api，插件不做自动域名处理；针对新的 API，如果开关开启，将自动创建域名

所以自动域名的另外一个好使是  API 域名的自动切换，如果没有则自动生成，如果有需改改进，开发者只需要修改域名值即可！插件将自动适配！

\-> 自动域名设置更多详情

## 更多详情

请点击 ------------->  https://dromara.gitee.io/fast-request/guide/history.html
