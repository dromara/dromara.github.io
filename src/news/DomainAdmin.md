---
title: Welcome Domain Name Certificate Detection Platform Domain Admin to Join Dromara Open Source Community
author: Domain Admin
date: 2024-09-10
cover: /assets/img/news/DomainAdmin-0.png
head:
  - - meta
    - name: News
---

Project Profile

Domain Admin is an SSL certificate application, automatic renewal, and expiration monitoring tool.

1. Technology stack adopted by Domain Admin

* Backend: Python

* Front end: Vue3.js
    

2. Main functions

* 'Certificate monitoring': Unified and centralized certificate monitoring, allowing you to manage scattered website SSL certificates in a unified way

* 'Certificate Application': Integrates 'Let's Encrypt', 'Zero SSL' to apply for SSL certificate free of charge, and supports automatic renewal

* 'Expiration Notice': pre-expiration email, enterprise WeChat, DingTalk, flying book and other channels. Add another insurance for automatic renewal.
    

## Installation

Domain Admin supports multiple installation methods, such as docker, which can be easily installed.

```
# 本地文件夹和容器文件夹映射
$ docker run \
-v $(pwd)/database:/app/database \
-v $(pwd)/logs:/app/logs \
-p 8000:8000 \
--name domain-admin \
mouday/domain-admin:latest
```

## Preview

Online preview address (account password is optional):

https://mouday.github.io/domain-admin-web/

Login

![](/assets/img/news/DomainAdmin-0.png)

Home Page

![](/assets/img/news/DomainAdmin-1.png)

Certificate Monitoring

![](/assets/img/news/DomainAdmin-2.png)

Certificate Request

![](/assets/img/news/DomainAdmin-3.png)

The project has been added `Dromara开源社区`

Project Address：

https://github.com/dromara/domain-admin