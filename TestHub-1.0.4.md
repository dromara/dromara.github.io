---
title: Automated testing tools released TestHub V1.0.4
author: testhub
date: 2024-04-15
cover: /assets/img/news/TestHub-1.0.4-0.png
head:
  - - meta
    - name: News
---

# 

![](/assets/img/news/TestHub-1.0.4-0.png)

## Introduction

TestHub is the 1 automated testing tool based on process orchestration. was born to solve the complex challenges of test process management and execution in the software development journey. Traditional test tools may be limited to interface-level automation and cannot meet diverse needs. We have introduced unique process orchestration capabilities into our TestHub, making it easy for you to define, manage, and execute test processes. Whether it's testing automation, process scheduling, or other automated tasks, TestHub plug-in architecture can meet your unlimited scaling needs.

> Manual: http://nsrule.com/

> Gitee open source address: https://gitee.com/dromara/TestHub

> Github open source address: https://github.com/dromara/TestHub

> Demo Video: https://www.bilibili.com/video/BV1X94y1v7ak/

> demo environment: http://testhub.nsrule.com:11018/#/account: admin password 123456

> installation package: https://url37.ctfile.com/d/42659137-60695737-5e2d86?p=3710 (access password: 3710)

! [](/assets/img/news/TestHub-1.0.4-1.jpg)

## Update content 1.0.4

*🪲🪲BUG Fix🪲🪲

* Optimize the problem of excessive front-end memory usage

*👍👍New Function👍👍

* Front-end overall refactoring

* Support for Restful API tools

* Introducing a treasure chest

* Support multi-project switching


## Overall front-end reconstruction

The author came from a back-end background and was barely able to write with the support of various front-end bosses around him, but his aesthetic and front-end abilities were obviously insufficient. The discovery of Chat2db in 2023 led to the discovery of new parkways. This front-end reconstruction is based on the front-end of Chat2db3.1.18 as scaffolding, replacing or transforming the following components, and then adding TestHub personalized functions to realize front-end reconstruction and upgrading.

| Technology | Selection |
| --- | --- |
| editor | react-monaco-editor |
| Category Tree | react-complex-tree |
| Split panel | react-resizable-panels |
| electron | electron-egg |

### Color of Tabs labels

There are three colors of fonts in Tabs: default color, red and green. Different colors identify different content states and are used to prompt whether the page data is consistent with the server-side data. Default color: saved, indicating that the data at the front end is consistent with the data saved at the back end. Red: draft not tracked, Changes to be corresponding to git status committed green: edited draft, Changes not Staged for commit corresponding to git status

! [](/assets/img/news/TestHub-1.0.4-2.jpg)

### Category Tree Usage

This category tree uses a new tree component support: search function, multiple selection, rename built-in, powerful drag and drop function

Search function

! [](/assets/img/news/TestHub-1.0.4-3.jpg)

Powerful drag-and-drop functionality

! [](/assets/img/news/TestHub-1.0.4-4.jpg)

## Restful API Tools

! [](/assets/img/news/TestHub-1.0.4-5.png)

! [](/assets/img/news/TestHub-1.0.4-6.png)

## About the treasure chest

* *❓There are already many developed gadgets on the market. Why do you need a treasure chest?❓* *

Indeed, many of the toolkits on the market are typically web-based, which gives them the advantage of being cross-platform because users can access them on any device with a network connection. However, there are some limitations to this web-based toolkit:

> **Insufficient cross-system support**: Most web toolkits are accessed through a browser, and some functions may require the support of the local operating system. This may result in limited or unavailable functionality on some operating systems.

> **Offline access issues**: Web-based toolboxes usually require a network connection to use. If the user is in an environment without a network connection, these toolkits cannot be used.

> **Performance issues**: Compared with local applications, the web toolbox may be limited by browser performance and network speed, resulting in a poor experience.

Therefore, developing a local toolbox software across systems may have its unique advantages:

> **Localization support**: Local applications can better use the functions of the operating system to provide a richer experience and functional support.

> **Offline access**: Local applications can be used without network connection, which improves user flexibility and convenience.

> **Performance advantages**: Local applications are usually faster and smoother than web-based applications because they can better optimize resource usage.

However, it should be noted that not all users have the ability to access the Internet at all times, especially in some regions or certain environments, where network connections may be unstable or unavailable. Therefore, to ensure wider availability, developers may need to consider providing offline support or localized deployment options to meet the needs of different users. (really want🔪People, such as the author's industry, need cloud desktop office is completely isolated from the external network. Forget it.🔪People break the law or write it yourself)

### Treasure Box Post-sequence Planning

| Type | Function |
| --- | --- |
| Format Class | JSON Formatting |
| Format Class | XML Formatting |
| Format Class | SQL Formatting |
| Format Classes | CSS Formatting |
|  |  |
| Development Class | Regular Expression |
| Development Classes | CRON Tools |
| Development Classes | crontab Tools |
| Development Class | Color Value Conversion |
| Development class | Timestamp conversion |
| Development class | XML, JSON conversion |
|  |  |
| Codec | Base64 codec |
| Codec | MD5 Encryption |
| Codec | AES Encryption and Decryption |
| Codec | JWT Tools |
| codec | URL code |
| codec | two-dimensional code generation |
|  |  |
| File Class | File Comparison Tool |
| File Class | Content Retrieval |
|  |  |
| Text class | Text comparison tool |
| Text Class | Text Replacement Tool |
| Text Class | Word Count Tool |
|  |  |

➡What functions do you want to join? Please issues⬅️ https://gitee.com/dromara/TestHub/issues

**\[Goddess of Failure \]-TestHub Development Team * *

* Receive TestHub update notifications as soon as possible.

* Receive TestHub bug notification the first time.

* The first time to receive new open source case notification.

* The first time to get the relevant technical support.

* communicate with many bosses (huá shuǐ) (m not yú).

* People are getting more and more handsome, and their hair never falls off.

* Appreciation, salary increase, V50 on Thursday

* Add my personal WeChat remarks TestHub invite you to join the group


! [](/assets/img/news/TestHub-1.0.4-7.jpg)

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

! [](/assets/img/news/TestHub-1.0.4-8.png)