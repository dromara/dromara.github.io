---
title: Mayfly-Go 1.7.4 新版本发布，Linux、数据库统一管控平台
author: mayfly-go
date: 2024-03-06
cover: /assets/img/news/MayflyGo-1.7.4-0.png
head:
  - - meta
    - name: 新闻
---

## **简介**

mayfly-go是一个web版linux、数据库、redis、mongo、集工单流程审批于一体的统一管理操作平台，旨在为用户提供统一的操作和管理体验，助力组织实现资源的高效利用和风险管控，提高系统的安全性、合规性、降低风险，同时增强团队的协作和责任感。

## **功能介绍**

*   **linux：** ssh终端(终端操作记录回放)，文件查看（可根据常见后缀名高亮显示关键词等）、修改、上传、下载、删除等，脚本管理执行，计划任务、进程操作，运行状态查看等（可当做堡垒机使用）。
    
*   **dbms(目前支持** **mysql postgres oracle sqlserver sqlite 高斯 达梦 kingbase vastbase。** **)：** 可视化数据增删改查，sql语句提示，表信息、索引信息、建表语句查看，建表等（类似mini版navicat）。
    
*   **dbms-数据同步：** 支持异构数据库之间数据同步
    
*   **redis(单机、哨兵、集群)：** 增删改查redis数据，redis基本信息查看，如版本，内存，cpu等使用情况、集群信息节点查看。
    
*   **mongo：** 增删改查mongo文档数据，数据库、集合状态查看，新建删除集合等。
    
*   **支持ssh tunnel访问：** linux机器、数据库、redis、mongo都支持ssh隧道访问操作。
    
*   **支持工单流程审批：** Dbms、Redis等写入类相关危险操作支持工单流程审批执行。
    
*   **系统管理：** 同时拥有完善的账号、角色、资源权限控制、系统配置（oauth2、ldap登录、登录验证码、双因素校验、水印等），也可基于该项目进行二次开发作为后台管理系统。
    

## **项目信息**

  

项目文档: https://www.yuque.com/may-fly/mayfly-go

gitee: https://gitee.com/objs/mayfly-go

github: https://github.com/may-fly/mayfly-go

## **开发语言&主要框架**

*   前端：typescript、 vue3、 element-plus
    
*   后端：golang、 gin、 gorm
    

## **特点**

*   对前后端进行了大部分通用功能的封装，使用起来更加简洁，功能逻辑清晰，能快速上手学习开发，并进行二次开发或者用于后台管理系统。
    
*   项目使用的Go语言开发，使用更小的内存及资源运行更高效的应用，二进制文件部署，方便快捷。
    

## **升级**

*   支持更多数据库，目前已支持mysql、postgres、oracle、sqlserver、sqlite、高斯、达梦、kingbase、vastbase。![](/assets/img/news/MayflyGo-1.7.4-0.png)
    
*   异构数据库数据同步![](/assets/img/news/MayflyGo-1.7.4-1.png)
    

![](/assets/img/news/MayflyGo-1.7.4-2.png)

image.png

*   Db、redis写入相关操作支持工单流程审批执行
    

![](/assets/img/news/MayflyGo-1.7.4-3.png)

image.png

![](/assets/img/news/MayflyGo-1.7.4-4.png)

image.png

*   新增基于标签树和tab的机器操作
    

![](/assets/img/news/MayflyGo-1.7.4-5.png)

  

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/news/MayflyGo-1.7.4-6.png)