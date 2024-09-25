---
title: 欢迎域名证书检测平台Domain Admin加入Dromara开源社区
author: Domain Admin
date: 2024-09-10
cover: /assets/img/news/DomainAdmin-0.png
head:
  - - meta
    - name: 新闻
---

项目简介  

Domain Admin是一个SSL证书申请，自动续期，到期监控工具

1、Domain Admin 采用的技术栈

*   后端：Python
    
*   前端：Vue3.js
    

2、主要功能

*   `证书监控`：统一集中式的证书监控，让你零散的网站SSL证书统一管理
    
*   `证书申请`：集成了`Let’s Encrypt`、`Zero SSL`免费申请SSL证书，并且支持自动续期
    
*   `到期通知`：到期前邮件、企业微信、钉钉、飞书等渠道通知。给自动续期再加一个保险
    

## 安装

Domain Admin支持多种安装方式，例如使用docker可以很方便的安装

```
# 本地文件夹和容器文件夹映射
$ docker run \
-v $(pwd)/database:/app/database \
-v $(pwd)/logs:/app/logs \
-p 8000:8000 \
--name domain-admin \
mouday/domain-admin:latest
```

## 预览

在线预览地址（账号密码随意）：

https://mouday.github.io/domain-admin-web/

登录

![](/assets/img/news/DomainAdmin-0.png)

首页

![](/assets/img/news/DomainAdmin-1.png)

证书监控

![](/assets/img/news/DomainAdmin-2.png)

证书申请

![](/assets/img/news/DomainAdmin-3.png)

该项目已加入 `Dromara开源社区`

项目地址：

https://github.com/dromara/domain-admin