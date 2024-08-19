---
title: 自动化测试工具：TestHub V1.0.2版本发布
author: TestHub
tag:
  - TestHub
date: 2023-10-31
cover: /assets/img/news/TestHub-1.0.2-1.jpg
head:
  - - meta
    - name: 新闻
---

## 自动化测试工具：TestHub V1.0.2 版本发布

## 简介

TestHub 是一款基于流程编排的自动化测试工具。是为了解决在软件开发旅程中测试流程管理和执行的复杂挑战而诞生的。传统测试工具可能局限于接口级自动化，无法满足多样化的需求，而我们在 TestHub 中引入了独特的流程编排功能，让您能够轻松定义、管理和执行测试流程。无论是自动化测试、流程调度还是其他自动化任务，TestHub 的插件式架构都能够满足您的无限扩展需求。

使用手册：http://nsrule.com/

演示环境：http://testhub.nsrule.com:11018/#/

Gitee 开源地址：https://gitee.com/dromara/TestHub

Gitub 开源地址：https://github.com/dromara/TestHub

演示视频：https://www.bilibili.com/video/BV1X94y1v7ak/

安装包：https://url84.ctfile.com/d/49656084-58580094-6ad8ce?p=3738 (访问密码: 3738)

![](/assets/img/news/TestHub-1.0.2-1.jpg)

## 更新内容

- 🪲🪲 修复 BUG🪲🪲

- 解决用例类目树超出不显示滚动条的问题
- 修复无法退出登陆的问题
- 修复 HTTP 超时问题

- 👍👍 新增功能 👍👍

- sql 能力支持同时执行多条 sql
- 实现简单级权限控制
- 后端部分插件化改造
- 提供组件库的功能
- 提供页面配置行为
- 支持配置多环境

## 如何使用

### 环境配置

我们可以在环境设置中配置环境级参数，在测试用例执行的时候选择环境用户切换不同参数 只有管理员可以添加和编辑环境

![](/assets/img/news/TestHub-1.0.2-2.jpg)
![](/assets/img/news/TestHub-1.0.2-3.jpg)

### 行为设置

我们可以在行为设置中看到系统级行为和项目级别行为，其中系统级行为不可以被编辑，项目级行为可由管理员和创建人编辑
![](/assets/img/news/TestHub-1.0.2-4.jpg)

### 如何退出登陆

![](/assets/img/news/TestHub-1.0.2-5.jpg)

## HTTP 如何设置超时时间

timeout 可以设置 HTTP 的超时时间 单位为秒 超时设置默认 60 秒

```
<action code="order" name="下单" type="HTTP" dataType="map">
    <httpModel url="http://192.168.0.4:12004/order" method="post" timeout="120">
        <headers>
            <param code="Content-Type" dataType="STRING" data="application/json;charset=utf-8"/>
        </headers>
        <body type="raw" language="json">
            <bound>
                {
                "acctId": "960307",
                "orderPrice": "1.8",
                "orderQty": "100"
                }
            </bound>
        </body>
    </httpModel>
</action>
```

## SQL 如何设置自动提交事务 与 如何批量执行

commit="true" 表示自动提交事务 bound 中可以写多条 sql

```
<action code="order" name="下单" type="HTTP" dataType="map">
    <httpModel url="http://192.168.0.4:12004/order" method="post" timeout="120">
        <headers>
            <param code="Content-Type" dataType="STRING" data="application/json;charset=utf-8"/>
        </headers>
        <body type="raw" language="json">
            <bound>
                {
                "acctId": "960307",
                "orderPrice": "1.8",
                "orderQty": "100"
                }
            </bound>
        </body>
    </httpModel>
</action>
```

**\[失败女神\]-TestHub 开发团队**

<img src="/assets/img/news/TestHub-0-2.jpg" height="340">
