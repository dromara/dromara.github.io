---
title: Hmily发布2.0.2-RELEASE版本
author: xiaoyu
tag:
  - hmily
date: 2019-04-05
cover: /assets/img/architecture/hmily-framework.png
head:
  - - meta
    - name: 新闻
---

## Hmily 发布 2.0.2-RELEASE 版本

- 解决 SpringCloud 使用 hystrix 配置线程池策略的问题。

- 新增对 springcloud 内嵌事务调用的问题。

- 新增 Hmily 负载均衡策略。

- 其他 bug 的修护，与代码的优化。

- 去除不必须的第三方 jar 包。

- 零侵入方式的引入。

## Hmily 对现在流行 RPC 框架以及 Spring 的支持情况。

- dubbo 2.7.0 以下所有版本。

- Springcloud Dalston 以上版本，包括支持现在的 Finchley 与 Greenwich

- Motan 所有版本。

- 3.0 以上所有 Spring 版本。

## Hmily 在 2.0.2 版本对使用者 RPC 集群时候负载均衡策略。

- hmily 提供了自己实现的负载均衡策略，只是针对加了@Hmily 的接口

dubbo 集群配置,配置负载方式为：loadbalance="hmily"

```xml
 <dubbo:reference timeout="50000"
       interface="org.dromara.hmily.demo.dubbo.account.api.service.AccountService"
             id="accountService"
                 retries="0" check="false" actives="20" loadbalance="hmily"/>
```

Springcloud 在调用方的 yml 配置文件中新增：

```yml
hmily ：
   ribbon:
      rule
        enabled : true
```

## Hmily 的具体使用文档：

- 官网文档 ：https://dromara.org/website/zh-cn/docs/hmily/index.html

- github 地址: https://github.com/yu199195/hmily

- gitee 地址： https://gitee.com/dromara/hmily

- 欢迎大家 star fork ，提供优秀的代码与建议。
