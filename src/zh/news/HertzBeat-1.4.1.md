---
title: 更好的用户体验, 开源实时监控 HertzBeat 新版发布
author: tom
tag:
  - HertzBeat
date: 2023-09-27
cover: /assets/img/news/HertzBeat-1.4.1-1.png
head:
  - - meta
    - name: 新闻
---

> 哈喽大家好，时间很快 1 个多月又过去了，HertzBeat 经过近两个月的迭代终于发布了 v1.4.1 版本。为什么是终于，因为有点难哈哈。我们参考 rocketmq 重构了 netty 的 server client 端模块，重构了采集器集群调度。比起上一版本有了更优雅的通讯代码，更完善全面的集群。采集任务一致性 hash 调度，集群心跳保活，断开主动重连，主动上线下线，主动停机等等这些都有。设计了新的控制台登陆界面和欢迎页面，支持了采集器集群的 UI 管理，合并了开源之夏两位同学的帮助提示头特性和阈值表达式特性，很多用户需要的监控指标名称国际化等等，最重要的当然是修复若干 BUG，增强了用户体验(自我感觉良好)。

### 总结起来如下：

- **重构 netty client server, 采集器集群调度** 感谢 @Ceilzcx @tomsun28
- **采集器集群的 UI 界面管理** 感谢 @Ceilzcx @tomsun28
- **功能页面帮助信息模块和阈值表达式增强** 开源之夏和 GLCC 课题 感谢 @YutingNie @mikezzb
- **新的控制台登陆界面和欢迎页面**
- **监控指标名称国际化** 用户可以看指标的中英文名称啦，欢迎一起完善监控模版里面的 i18n 国际化资源
- **支持 kubernetes helm charts 一键部署** 见 https://artifacthub.io/packages/search?repo=hertzbeat

**更多的特性和 BUG 修复，稳定性提示** 感谢 @zqr10159 @Carpe-Wang @luxx-lq @l646505418 @LINGLUOJUN @luelueking @qyaaaa @novohit @gcdd1993

### 上效果图:

- 新的登陆页面 UI

![](/assets/img/news/HertzBeat-1.4.1-1.png)

![](/assets/img/news/HertzBeat-1.4.1-2.png)

- 支持采集器集群管理

![](/assets/img/news/HertzBeat-1.4.1-3.png)

![](/assets/img/news/HertzBeat-1.4.1-4.png)

- 友好的帮助文档头

![](/assets/img/news/HertzBeat-1.4.1-5.png)

- 监控指标名称国际化

![](/assets/img/news/HertzBeat-1.4.1-6.png)

### 什么是 HertzBeat?

HertzBeat 赫兹跳动 是一个拥有强大自定义监控能力，高性能集群，无需 Agent 的开源实时监控告警系统。

### 特点

- 集 **监控+告警+通知** 为一体，支持对应用服务，数据库，操作系统，中间件，云原生，网络等监控阈值告警通知一步到位。
- 易用友好，无需 `Agent`，全 `WEB` 页面操作，鼠标点一点就能监控告警，零上手学习成本。
- 将 `Http,Jmx,Ssh,Snmp,Jdbc` 等协议规范可配置化，只需在浏览器配置监控模版 `YML` 就能使用这些协议去自定义采集想要的指标。您相信只需配置下就能立刻适配一款 `K8s` 或 `Docker` 等新的监控类型吗？
- 高性能，支持多采集器集群横向扩展，支持多隔离网络监控，云边协同。
- 自由的告警阈值规则，`邮件` `Discord` `Slack` `Telegram` `钉钉` `微信` `飞书` `短信` `Webhook` 等方式消息及时送达。

![](/assets/img/news/HertzBeat-1.4.1-7.png)

**Github: https://github.com/dromara/hertzbeat**

**Gitee: https://gitee.com/dromara/hertzbeat**

### 尝试部署

1.  `docker` 环境仅需一条命令即可开始

`docker run -d -p 1157:1157 -p 1158:1158 --name hertzbeat tancloud/hertzbeat`

`或者使用 quay.io (若 dockerhub 网络链接超时)`

`docker run -d -p 1157:1157 -p 1158:1158 --name hertzbeat quay.io/tancloud/hertzbeat`

2.  浏览器访问 `http://localhost:1157` 即可开始，默认账号密码 `admin/hertzbeat`
3.  部署采集器集群

```
docker run -d -e IDENTITY=custom-collector-name -e MANAGER_HOST=127.0.0.1 -e MANAGER_PORT=1158 --name hertzbeat-collector tancloud/hertzbeat-collector
```

- `-e IDENTITY=custom-collector-name` : 配置此采集器的唯一性标识符名称，多个采集器名称不能相同，建议自定义英文名称。
- `-e MANAGER_HOST=127.0.0.1` : 配置连接主 HertaBeat 服务的对外 IP。
- `-e MANAGER_PORT=1158` : 配置连接主 HertzBeat 服务的对外端口，默认 1158。

---

**Github: https://github.com/dromara/hertzbeat**  
**Gitee: https://gitee.com/dromara/hertzbeat**

感兴趣的话给个 star 吧:smile:，QQ 交流群：236915833  微信交流群请加好友：

 <img src="/assets/img/news/HertzBeat-1.4.1-8.jpg" height="340">
