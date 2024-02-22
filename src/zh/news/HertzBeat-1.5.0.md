---
title: 赫兹跳动 v1.5.0 发布，新增强大 Status Page 构建能力
author: tom
tag:
  - HertzBeat
date: 2024-02-08
cover: /assets/img/news/HertzBeat-1.5.0-0.png
head:
  - - meta
    - name: 新闻
---

## 新年好呀

没想到在除夕之前还能出一个版本，HertzBeat v1.5.0 发布啦，刚好一月一版。

这个版本我们主要是新提供了 Status Page 状态页面构建功能，用户可以通过赫兹跳动构建自己团队服务的对外状态页面，支持状态页状态与监控实例状态联动，支持发布维护异常事件。

**通过 Status Page 轻松向用户传达您产品服务的实时状态**

**如果你们团队提供用户在线服务，那 Status Page 状态页的重要性我们就不要再一一强调了吧。参考 Github 状态页 https://www.githubstatus.com/ , 阿里云状态页 https://status.aliyun.com/。**

**提升团队服务的透明度和专业度，增强用户信任，降低沟通成本。还不快来 10 分钟构建一个专属的 Status Page**

![](/assets/img/news/HertzBeat-1.5.0-0.png)

![](/assets/img/news/HertzBeat-1.5.0-1.png)

![](/assets/img/news/HertzBeat-1.5.0-2.png)

![](/assets/img/news/HertzBeat-1.5.0-3.png)

![](/assets/img/news/HertzBeat-1.5.0-4.png)

**后面在 status page 还会加消息订阅功能等，欢迎在 github issue 上你理想的 status page 功能需求**

**https://github.com/dromara/hertzbeat/issues**

## 更新日志

- support status page function @tomsun28
- add new field description in hertzbeat tag detail by @GEM0816g
- bugfix: search monitors error when pageable @avvCode
- Alert define add export and import function @a-little-fool @yqxxgh
- refactor tdengine store code, auto close resource by @Carpe-Wang
- alert notice add monitor host by @yqxxgh
- snowflake id by @liyin
- interface info displays in Mb by @Calvin979
- Alert yml config by @zqr10159
- more feature, document and bugfix

## 🎡 HertzBeat 介绍

HertzBeat 赫兹跳动 是一个易用友好的开源实时监控告警系统，无需 Agent，高性能集群，兼容 Prometheus，提供强大的自定义监控和状态页构建能力。

### 特点

- 集 **监控+告警+通知** 为一体，支持对应用服务，应用程序，数据库，缓存，操作系统，大数据，中间件，Web 服务器，云原生，网络，自定义等监控阈值告警通知一步到位。
- 易用友好，无需 `Agent`，全 `WEB` 页面操作，鼠标点一点就能监控告警，零上手学习成本。
- 将 `Http, Jmx, Ssh, Snmp, Jdbc, Prometheus` 等协议规范可配置化，只需在浏览器配置监控模版 `YML` 就能使用这些协议去自定义采集想要的指标。您相信只需配置下就能立刻适配一款 `K8s` 或 `Docker` 等新的监控类型吗？
- 兼容 `Prometheus` 的系统生态并且更多，只需页面操作就可以监控 `Prometheus` 所能监控的。
- 高性能，支持多采集器集群横向扩展，支持多隔离网络监控，云边协同。
- 自由的告警阈值规则，`邮件` `Discord` `Slack` `Telegram` `钉钉` `微信` `飞书` `短信` `Webhook` `Server酱` 等方式消息及时送达。
- 提供强大的状态页构建能力，轻松向用户传达您产品服务的实时状态。

Github: https://github.com/dromara/hertzbeat

Gitee: https://gitee.com/dromara/hertzbeat

今年就这样了，大家新年快乐！准备去干饭，来个 star 哇！
