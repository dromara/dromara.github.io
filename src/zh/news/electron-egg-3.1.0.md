---
title: ElectronEgg v3.1.0 正式发布，跨平台桌面软件开发
author: ElectronEgg
date: 2023-04-28
cover: /assets/img/news/electron-egg-cover.png
head:
  - - meta
    - name: 新闻
---

**值得信赖**
![](/assets/img/news/electron-egg-3.1.0-1.png)
**为什么使用**

桌面软件（办公方向、 个人工具），仍然是未来十几年 PC 端需求之一，提高工作效率

electron 技术是流行趋势，QQ、百度翻译、阿里网盘、迅雷、有道云笔记 ......

**简单**

只需懂 JavaScript

**开源**

gitee：https://gitee.com/dromara/electron-egg 3200+

github：https://github.com/dromara/electron-egg 800+

## 本次更新

**3.1.0**

1.  【增加】Utils 模块 mac 功能：getMAC /isMAC
2.  【增加】Utils 模块 IP 功能：publicIpv4 /publicIpv6
3.  【增加】Job 模块 childJob 功能：createProcess /getPids/execPromise
4.  【增加】Job 模块 childJobPool 功能：create /run/runPromise /getChildByPid / getChild / getPids / killAll
5.  【增加】exception 模块：main/child/renderer 进程捕获异常后是否退出
6.  【增加】ps 模块：getEncryptDir /isEncrypted/exitChildJob /isChildJob/isChildPoolJob
7.  【增加】Utils 模块：co /deprecate/extend /get-port/time
8.  【增加】tools 模块：加密文件过滤及匹配
9.  【增加】bin 模块：clean 清理加密文件

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
