---
title: 企业级，跨平台桌面软件开发框架 electron-egg 3.10.0版本发布！
author: egg
date: 2024-02-02
cover: /assets/img/news/electron-egg-3.10.0-0.png
head:
  - - meta
    - name: 新闻
---

大家好，`electron-egg 3.10.0` 发布。在这个版本里我们优化了跨语言支持。

简单来说，就是可以用`java`、`go`等语言来写业务，然后通过 electron-egg 调用；支持 windows、macOS、Linux。其原理是通过 child_process 创建子进程，并返回一个包含各种属性和方法的对象，cross 模块也提供了一些实用的 api。

文章结尾，我们提供了 `electron-egg for java`和 `electron-egg for go` 的案例效果。

目前，框架已经广泛应用于记账、政务、企业、医疗、学校、股票交易、ERP、娱乐、视频等领域客户端，请放心使用！

![](/assets/img/news/electron-egg-3.10.0-0.png)

### 为什么使用

桌面软件（办公方向、 个人工具），仍然是未来十几年 PC 端需求之一，提高工作效率

electron 技术是流行趋势，QQ、百度翻译、阿里网盘、迅雷、有道云笔记 ......

### 开源

gitee：https://gitee.com/dromara/electron-egg 4300+

github：https://github.com/dromara/electron-egg 1400+

### 本次更新

### 3.10.0

1.  【优化】优化 ee-core 模块，支持 go、java 等。
2.  【增加】新增 ee-core cross 模块 API：run()\\killAll()\\kill(pid)\\killByName(name)\\getUrl(name)\\getProcByName(name)\\getProc(pid)getPids()。
3.  【增加】新增 ee-core cross 模块进程对象，包含 API：pid\\name\\port\\config\\child\\emitter\\kill()\\getUrl()\\getArgsObj()。
4.  【增加】新增 go、java 功能使用 demo。
5.  【修复】修复 electron/index 缓存问题。
6.  【修复】修复 jobs 日志写多了会卡死的问题。
7.  【修复】修复 第三方使用 model 错乱问题。
8.  【修改】修改 配置 默认开启 gpu，修改默认协议为 file://。
9.  【修改】修改 go 开发环境配置。
10. 【升级】升级 ee-core v2.8.2

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

![](/assets/img/news/electron-egg-3.10.0-1.png)

### electron-egg for go 案例

#### mayfly-go

下载地址：https://url21.ctfile.com/f/10443521-1017255719-990745?p=9598 (访问密码: 9598)

开源地址：https://github.com/dromara/mayfly-go （web）

![](/assets/img/news/electron-egg-3.10.0-2.png)

![](/assets/img/news/electron-egg-3.10.0-3.png)

![](/assets/img/news/electron-egg-3.10.0-4.png)

![](/assets/img/news/electron-egg-3.10.0-5.png)

### electron-egg for java 案例

#### northstar

开源地址：https://gitee.com/dromara/northstar

![](/assets/img/news/electron-egg-3.10.0-6.png)

![](/assets/img/news/electron-egg-3.10.0-7.png)

#### sms

![](/assets/img/news/electron-egg-3.10.0-8.png)

### 更多

访问官网：https://www.kaka996.com/
