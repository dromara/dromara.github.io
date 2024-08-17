---
title: 情人节即分手，FreeNginx 来了
author: tom
date: 2024-02-16
cover: /assets/img/news/FreeNginx-0.png
head:
  - - meta
    - name: 新闻
---

  

![](/assets/img/news/FreeNginx-0.png)

  

## 时间线

> 2019 年 3 月 11 日，F5 Networks 宣布以 6.7 亿美元收购 Nginx。

> 2022.01.18, NGINX 创始人 Igor Sysoev 从 NGINX 和 F5 离职：“Igor Sysoev 选择离开 F5，以便将更多的时间留给陪伴家人和朋友，以及个人项目。感谢他所做的一切让全世界的网站变得更好。”

> 在 2024.2.14 情人节这天，作为 nginx 的长期核心开发者之一，马克西姆-杜宁（Maxim Dounin）宣布创建一个名为 Freenginx 的新分叉项目。

## 他在宣布 Freenginx 时说道

你们可能知道，F5 于 2022 年关闭了莫斯科办事处，从那时起我就不再为 F5 工作了。 不过，我们已经达成协议，我将继续作为志愿者参与nginx开发。在近两年的时间里，我一直致力于改进nginx，免费为大家提供更好的nginx。不幸的是，F5一些新的非技术管理人员最近决定干涉nginx多年来使用的安全策略，无视策略和开发者的立场。

这很好理解：他们拥有这个项目，可以对其做任何事情，包括以市场为导向的行为，无视开发者和社区的立场。 不过，这还是与我们的协议相矛盾。更重要的是，我无法再控制F5内部对nginx的修改，也不再将nginx视为一个为公众利益开发和维护的自由开源项目。

因此，从今天起，我将不再参与F5运营的nginx开发。取而代之的是，我将启动另一个项目，由开发者而非公司实体运行。

目标是使nginx开发不受公司任意行为的影响。欢迎提供帮助和贡献。希望大家都能从中受益。

## freenginx.org上的简短声明

> freenginx.org的目标是使nginx的开发不受任意公司行为的影响。
> 
>   
> 
> ![](/assets/img/news/FreeNginx-1.png)

## 开源和商业

利益与目标不同决定了开源项目的不同发展方向，这不好评说好坏对错。

> 作为商业公司，F5毕竟真金白银花了那么多钱拥有了nginx，全职人员的成本付出，这肯定需要往商业化方向考量，希望能找到商业与开源的平衡。

> Maxim Dounin 有着开发者的自由理想园，站在开发者的角度看开源项目的发展，nginx 能更开放更自由，方向由社区掌控。也希望 freenginx 能发展顺利。

**oracle-jdk vs openjdk, mysql vs mariadb**, 现在有了 **nginx vs freenginx**, 我们现在可以开始关注 **Freenginx** 的未来发展，看未来有多少其他开发者会专注于这个新的分叉。

## Nginx 擦边广告，使用 HertzBeat 快速监控 Nginx

> HertzBeat 是一款我们开源的实时监控系统，无需Agent，性能集群，兼容Prometheus，自定义监控和状态页构建能力。**https://github.com/dromara/hertzbeat**

> 它支持对应用服务，应用程序，数据库，缓存，操作系统，大数据，中间件，Web服务器，云原生，网络，自定义等监控。
> 
> 下面广告演示下如果使用 HertzBeat 快速监控 Nginx 服务状态。

### 1\. 部署 HertzBeat

```
docker run -d -p 1157:1157 -p 1158:1158 --name hertzbeat tancloud/hertzbeat

```

### 2\. 部署 Nginx

本地部署启动 Nginx, 默认监控 Nginx 可用性，若监控更多指标，则需启用 Nginx 的 `ngx_http_stub_status_module` 和 `ngx_http_reqstat_module` 监控模块

**开启参考文档：https://hertzbeat.com/zh-cn/docs/help/nginx/**

### 3\. 在 HertzBeat 添加 Nginx 监控

访问 HertzBeat 控制页面，在 应用服务监控 -> Nginx服务器 添加对端 Nginx 监控，配置对端IP端口等参数。(对了 Docker 默认网络环境下localhost不通本地)

![](/assets/img/news/FreeNginx-2.png)

确认添加后就OK啦，后续我们就可以看到 Nginx 的相关指标数据状态，还可以设置**告警阈值通知**等，**当 Nginx 挂了或者某个指标异常过高时，通过邮件钉钉微信等通知我们**。

![](/assets/img/news/FreeNginx-3.png)

![](/assets/img/news/FreeNginx-4.png)

![](/assets/img/news/FreeNginx-5.png)

**10分钟搞定，快来使用 HertzBeat 24小时自动观测你的 Nginx 状态**

在 Github Star 我们!

**https://github.com/dromara/hertzbeat**

**https://gitee.com/dromara/hertzbeat**

> 部分内容来源于 https://www.msn.com/zh-cn/channel/source/cnBeta.COM