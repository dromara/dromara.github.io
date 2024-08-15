---
title: Valentine's Day Is Breaking Up, Here FreeNginx Come
author: tom
date: 2024-02-16
cover: /assets/img/news/FreeNginx-0.png
head:
  - - meta
    - name: News
---

  

![](/assets/img/news/FreeNginx-0.png)

  

## Timeline

On March 11, 2019, F5 Networks announced the acquisition of Nginx for $0.67 billion.

> 2022.01.18, NGINX founder Igor Sysoev left NGINX and F5: "Igor Sysoev chose to leave F5 in order to spend more time with family and friends, as well as personal projects. Thank him for everything he has done to make websites around the world better."

On Valentine's Day 2024.2.14, Maxim Dounin, one of the longtime core developers of nginx, announced the creation of a new fork project called Freenginx.

## He said when he announced the Freenginx

As you may know, F5 closed its Moscow office in 2022, and I have not worked for F5 since then. However, we have reached an agreement that I will continue to participate as a volunteer in nginx development. In the past two years, I have been working on improving nginx and providing better nginx for everyone for free. Unfortunately, some of F5's new non-technical executives recently decided to interfere with the security policies used by nginx for years, ignoring both policy and developer positions.

It's easy to understand: they own the project and can do anything with it, including market-oriented behavior that ignores the positions of developers and the community. However, this still contradicts our agreement. More importantly, I can no longer control changes to nginx within F5 and no longer view nginx as a free and open source project developed and maintained for the public good.

Therefore, as of today, I will no longer be involved in nginx development run by F5. Instead, I'll start another project, run by a developer rather than a corporate entity.

The goal is to make nginx development unaffected by arbitrary company actions. Help and contributions are welcome. I hope everyone can benefit from it.

## Short statement on freenginx.org

The goal of freenginx.org is to make nginx development independent of arbitrary corporate actions.
>>
>>
>>
>! [](/assets/img/news/FreeNginx-1.png)

## Open Source and Commercial

Different interests and goals determine the different development directions of open source projects, which is not good or bad.

> as a commercial company, F5, after all, spent so much money on nginx and paid the cost of full-time personnel. this definitely needs to be considered in the direction of commercialization, hoping to find a balance between commerce and open source.

> Maxim Dounin has a free ideal garden for developers. looking at the development of open source projects from the perspective of developers, nginx can be more open and free, and the direction is controlled by the community. I also hope that the freenginx will develop smoothly.

**oracle-jdk vs openjdk, mysql vs mariadb**, now with **nginx vs freenginx**, we can now start to pay attention to the future development of **Freenginx** and see how many other developers will focus on this new fork in the future.

## Nginx edge-off ads, use HertzBeat to quickly monitor Nginx

> HertzBeat is our 1 open source real-time monitoring system, without Agent, performance cluster, compatible Prometheus, custom monitoring and status page construction capabilities. **https://github.com/dromara/hertzbeat**

> It supports monitoring of application services, applications, databases, caches, operating systems, big data, middleware, web servers, cloud native, network, customization, etc.
>>
> The following advertisement demonstrates how to quickly monitor the Nginx service status if using HertzBeat.

### 1\. Deployment HertzBeat

```
docker run -d -p 1157:1157 -p 1158:1158 --name hertzbeat tancloud/hertzbeat

```

### 2\. Deploying Nginx

By default, the availability of Nginx is monitored. If more metrics are monitored, the ‘ngx_http_stub_status_module’ and 'ngx_http_reqstat_module' monitoring modules of Nginx must be enabled.

**Open Reference Document: https://hertzbeat.com/zh-cn/docs/help/nginx /**

### 3\. Add Nginx monitoring to the HertzBeat

Access the HertzBeat control page, add peer-to-peer Nginx monitoring in Application Service Monitoring-> Nginx Server, and configure parameters such as the peer IP port. (By the way, Docker's default network environment localhost not available locally)

! [](/assets/img/news/FreeNginx-2.png)

After confirming the addition, it will be OK. Later, we can see the relevant indicator data status of Nginx, and we can also set * * alarm threshold notification * *, etc. * * when Nginx hangs up or an indicator is abnormally high, we will be notified by email DingTalk WeChat, etc * *.

! [](/assets/img/news/FreeNginx-3.png)

! [](/assets/img/news/FreeNginx-4.png)

! [](/assets/img/news/FreeNginx-5.png)

* * 10 minutes, come and use the HertzBeat 24 hours to automatically observe your Nginx status * *

At Github Star we!

**https://github.com/dromara/hertzbeat**

**https://gitee.com/dromara/hertzbeat**

> Part of the content comes from https://www.msn.com/zh-cn/channel/source/cnBeta. COM