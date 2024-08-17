---
title: Mayfly-Go 1.7.4 New Version Released, Linux, Database Unified Control Platform
author: mayfly-go
date: 2024-03-06
cover: /assets/img/news/MayflyGo-1.7.4-0.png
head:
  - - meta
    - name: News
---

## **Introduction * *

mayfly-go is a unified management and operation platform that integrates linux, database, redis, mongo, and work order process approval. it aims to provide users with a unified operation and management experience, help organizations realize efficient use of resources and risk control, improve system security, compliance, reduce risks, and enhance team collaboration and responsibility.

## **Function Introduction * *

* **linux:** ssh terminal (terminal operation record playback), file viewing (keywords can be highlighted according to common suffix, etc.), modification, upload, download, delete, etc., script management and execution, planned tasks, process operations, running status viewing, etc. (can be used as a bastion machine).

* **dbms (currently supports** **mysql postgres oracle sqlserver sqlite gausda dream kingbase vastbase.** **):** Visual data addition, deletion, modification and query, SQL statement prompt, table information, index information, table creation statement view, table creation, etc. (similar to mini version navicat).

* **dbms-data synchronization:** supports data synchronization between heterogeneous databases

* **Redis (stand-alone, sentinel, and cluster):** Add, delete, modify, and view redis data, basic information, such as version, memory, cpu usage, and cluster information nodes.

* **mongo:** Add, delete, modify and check mongo document data, view database and collection status, create and delete collections, etc.

**Support ssh tunnel access:** Linux machines, databases, redis, and mongo all support ssh tunnel access.

**Support work order process approval:** Dbms, Redis and other write-related dangerous operations support work order process approval.

* * * system management: * * at the same time, it has perfect account, role, resource permission control, system configuration (oauth2, ldap login, login verification code, two-factor verification, watermark, etc.), and can also be used as a background management system for secondary development based on this project.


## **Project Information * *



project documentation: https://www.yuque.com/may-fly/mayfly-go

gitee: https://gitee.com/objs/mayfly-go

github: https://github.com/may-fly/mayfly-go

## **Development Language & Main Framework * *

* Front end: typescript, vue3, element-plus

* Backend: golang, gin, gorm


## **Features * *

* The front and back ends are packaged with most common functions, which is more concise to use, clear functional logic, quick to learn and develop, and carry out secondary development or use in background management system.

* The project uses the Go language development, using smaller memory and resources to run more efficient applications, binary file deployment, convenient and fast.


## **Upgrade * *

* Support more databases. Currently, mysql, postgres, oracle, sqlserver, sqlite, Gauss, Dameng, kingbase and vastbase are supported.! [](/assets/img/news/MayflyGo-1.7.4-0.png)

* Heterogeneous database data synchronization! [](/assets/img/news/MayflyGo-1.7.4-1.png)


! [](/assets/img/news/MayflyGo-1.7.4-2.png)

image.png

* Db and redis write-related operations support work order process approval execution.


! [](/assets/img/news/MayflyGo-1.7.4-3.png)

image.png

! [](/assets/img/news/MayflyGo-1.7.4-4.png)

image.png

* Added tag tree and tab-based machine operations


! [](/assets/img/news/MayflyGo-1.7.4-5.png)



About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

! [](/assets/img/news/MayflyGo-1.7.4-6.png)