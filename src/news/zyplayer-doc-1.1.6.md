---
title: zyplayer-doc 1.1.6-Release
author: zyplayer
tag:
  - zyplayer-doc
date: 2023-10-16
cover: /assets/img/logo/zyplayer-doc.webp
head:
  - - meta
    - name: News
---

## 简介

**zyplayer-doc**是一款适合企业和个人私有化部署使用的 WIKI 知识库管理系统，提供在线化的知识库管理功能，专为私有化部署而设计，最大程度上保证企业或个人的数据安全。

可用于企业内部协作的知识库、规章制度，企业对外的产品帮助文档，个人笔记、WIKI 知识库等场景使用。

提供有富文本和 Markdown 格式的编辑器，具有附件、评论和历史版本的功能，同时可将编写的文档一键开启分享，提供有界面友好的开放文档查看功能。

体验地址：https://zyplayer.com

在线文档：https://doc.zyplayer.com

## V1.1.6 更新内容

参与本次更新的社区成员有：**@sh1yu** **@diant** ，感谢大家的贡献与辛勤付出！同时期待更多小伙伴的参与~

### 新增功能

- 文档管理页面优化，更简洁和现代化
- 新增模板管理功能
- 新增文档移动和复制功能
- 修改页面新建和附件保存逻辑
- 增加达梦数据库支持
- db 模块 tab 页面增加右键菜单
- sql 执行器增加上下布局拖拽

### 功能优化

- Word 文档导出优化
- 添加 rewriteBatchedStatements=true 提高批量操作数据库效率
- db 模块全局滚动条美化
- sql 执行器页面易用性优化
- db 模块增加节流、防抖函数，有效提升页面性能
- 修改模块化加载，可以通过配置文件控制加载哪些模块，同时前端有对应显示
- 其他各种细节优化

### 问题修复

- #I85QPE 处理附件列表问题，优化文件上传逻辑
- 修改数据互导查询总条数时某些数据库将别名大写了的问题
- 修复 oracle 数据库字段大小混写导致表数据结果页面报错问题

### 更新详情

WIKI 文档查看管理页面

![1.png](/assets/img/news/zyplayer-1-1-6-1.png)

WIKI 文档编辑页面

![2.png](/assets/img/news/zyplayer-1-1-6-2.png)

WIKI 开放文档查看页面

![3.png](/assets/img/news/zyplayer-1-1-6-3.png)
