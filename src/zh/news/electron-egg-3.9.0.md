---
title: ElectronEgg v3.9.0 发布，快速开发一个桌面应用
author: electron-egg
date: 2023-12-26
cover: /assets/img/news/electron-egg-3.10.0-0.png
head:
  - - meta
    - name: 新闻
---

大家好，`electron-egg 3.9.0` 重大更新。

在这个版本里我们做了重大更新，支持了 `go` 语言，天生的跨平台、高性能，可以把核心业务用 go 来写，能极大提升了软件体验。

目前，框架已经广泛应用于记账、政务、企业、医疗、学校、股票交易、ERP、娱乐、视频等领域客户端，请放心使用！

![](/assets/img/news/electron-egg-3.10.0-0.png)

### 为什么使用

桌面软件（办公方向、 个人工具），仍然是未来十几年 PC 端需求之一，提高工作效率

electron 技术是流行趋势，QQ、百度翻译、阿里网盘、迅雷、有道云笔记 ......

### 开源

gitee：https://gitee.com/dromara/electron-egg 4200+

github：https://github.com/dromara/electron-egg 1300+

### 本次更新

### 3.9.0

**【重大更新】**

1.  【增加】新增 ee-go 模块，支持 go 语言，以及众多功能。
2.  【增加】新增 ee-bin dev for go。
3.  【增加】新增 ee-bin dev 配置 electron.loadingPage。
4.  【增加】新增 ee-core cross 模块，支持跨语言服务。
5.  【增加】新增 ee-core 生产环境配置 loadingPage。
6.  【优化】优化 ee-bin dev --serve 支持自定义命令。
7.  【优化】优化 ee-bin exec --cmds 支持自定义命令。
8.  【优化】优化 ee-bin build --cmds 支持自定义命令。
9.  【升级】升级 ee-core v2.7.1，升级 ee-bin v1.4.0

### 下载

```
# gitee
git clone https://gitee.com/dromara/electron-egg.git

# github
git clone https://github.com/dromara/electron-egg.git
```

### 安装

```
# 设置国内镜像源(加速)
npm config set registry=https://registry.npmmirror.com

#如果下载electron慢，配置如下
npm config set electron_mirror=https://registry.npmmirror.com/-/binary/electron/

# 根目录，安装 electron 依赖
npm i

# 进入【前端目录】安装 frontend 依赖
cd frontend
npm i
```

### 运行项目

```
npm run start
```

## ![](/assets/img/news/electron-egg-3.10.0-1.png)

### 用户案例

![](/assets/img/news/electron-egg-3.9.0-2.jpg)

![](/assets/img/news/electron-egg-3.9.0-3.png)

### 更多

访问官网：https://www.kaka996.com/
