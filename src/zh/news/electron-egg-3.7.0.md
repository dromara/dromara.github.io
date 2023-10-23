---
title: ElectronEgg v3.7.0 正式发布，跨平台桌面软件开发
author: ElectronEgg
date: 2023-09-20
cover: /assets/img/news/electron-egg-cover.png
head:
  - - meta
    - name: 新闻
---

**为什么使用**

桌面软件（办公方向、 个人工具），仍然是未来十几年 PC 端需求之一，提高工作效率

electron 技术是流行趋势，QQ、百度翻译、阿里网盘、迅雷、有道云笔记 ......

**简单**

只需懂 JavaScript

**开源**

gitee：https://gitee.com/dromara/electron-egg 3700+

github：https://github.com/dromara/electron-egg 1000+

## 本次更新

**3.7.0**

1.  【增加】新增 config/bin.js 配置文件，统一处理 ee-bin 功能配置项。
2.  【增加】新增 ee-bin dev 命令，同时启动 frontend electron 服务。
3.  【增加】新增 ee-bin start 命令，使用 node spawn 启动 electron。
4.  【增加】新增 ee-bin build 命令，构建出包含 renderer 进程数据的 process。
5.  【增加】新增 ee-core boot、failure 页面，优化开发体验。
6.  【增加】新增 ee-core jsondb 支持修改数据存储目录。
7.  【增加】新增 ee-bin rd 参数，支持 dist、target 参数。
8.  【增加】新增 demo 分支，（frontend）loading 动画、登录窗口效果、加载本机图片效果。
9.  【增加】新增 demo 分支，（electron）jsondb 目录切换功能、java 插件状态检查功能。
10. 【优化】优化 ee-bin 命令的 log 提示，增加颜色效果。

11. 【优化】优化 ee-core config.openDevTools 支持传参。

12. 【优化】优化 http 服务 listen 参数。

13. 【优化】优化 开发体验。

14. 【修复】修复 getPort 端口获取 bug。

15. 【删除】删除 app.on ('activate')、 app.on ('second-instance')。

16. 【升级】升级 ee-core -> v2.5.0、升级 ee-bin -> 1.2.0

![](/assets/img/news/electron-egg-3.7.0-1.png)

## 使用场景

### 1\. 常规桌面软件

- windows 平台 - demo
  ![](/assets/img/news/electron-egg-3.7.0-2.png)

- macOS 平台 - demo
  ![](/assets/img/news/electron-egg-3.7.0-3.png)

- linux 平台 - 国产 UOS、Deepin - demo
  ![](/assets/img/news/electron-egg-3.7.0-4.png)

- linux 平台 (ubuntu) - demo
  ![](/assets/img/news/electron-egg-3.7.0-5.png)

### 2\. vue、react、web 转换成桌面软件

- vue-ant-design（本地）
  ![](/assets/img/news/electron-egg-3.7.0-6.png)

- 禅道项目管理（web 项目地址）
  ![](/assets/img/news/electron-egg-3.7.0-7.png)

### 3\. 用户案例

![](/assets/img/news/electron-egg-3.7.0-8.png)

![](/assets/img/news/electron-egg-3.7.0-9.png)

![](/assets/img/news/electron-egg-3.7.0-10.png)

## 更多案例

访问官网：electron-egg: 一个入门简单、跨平台、企业级桌面软件开发框架

**https://www.kaka996.com/**
