---
title: Warm Flow 1.2.6 版本更新, 支持流程状态自定义
author: warm flow
date: 2024-08-28
cover: /assets/img/news/WarmFlow-1.2.6-0.png
head:
  - - meta
    - name: 新闻
---

## ![](/assets/img/news/WarmFlow-1.2.6-0.png)  

## warm-flow 1.2.6版本更新

### 本次改动

> 流程状态：可接收外部传递，可以支持字符串  
> 新增api：增加获取下个节点信息  
> id生成：支持其他位数的id，可以前端精度问题的序列化处理

*   v1.2.6 2024-08-28
    
*   \[feat\] 增加获取下个节点集合api  @xiarigang
    
*   \[feat\] id内存策略新增14、15位雪花算法支持
    
*   \[feat\] 流程激活和挂起案例  @xiaoxiaoliu889
    
*   \[feat\] 增加基于流程定义Id获取流程图  @xiaoxiaoliu889
    
*   \[update\] 流程状态改成字符串类型  @xiarigang
    
*   \[update\] 测试模块拆分独立仓库
    
*   \[update\] modes-sb删除加载配置文件，改为有上层jar加载
    
*   \[update\] flex solon版本yml弄错了，config调整
    
*   \[refactor\] 流程版本号生成逻辑重构  @xiaoxiaoliu889
    
*   \[fix\] 修复deleteByTaskIds 中的根据无法正确删除user数据
    
*   \[fix\] 修复 jpa solon注解问题  @vanlin
    
*   \[fix\] 修复 并行网关三个任务分支的时候，错误结束流程的问题
    
*   执行升级脚本【warm-flow\_1.2.6.sql】
    
*   流程状态字段flow\_status改为string类型，业务系统需要对应修改
    
*   【升级注意事项】
    
*   更新日志
    

## warm-flow介绍

> \[!IMPORTANT\] Warm-Flow国产工作流引擎🎉，其特点简洁轻量但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件。

1.  简洁易用：只有7张表，代码量少，可快速上手和集成
    
2.  审批功能：支持通过、退回、任意跳转、转办、终止、会签、票签、委派和加减签、互斥和并行网关
    
3.  监听器与流程变量：支持五种监听器，可应对不同场景，灵活可扩展，参数传递，动态权限
    
4.  流程图：流程引擎自带流程图，可在不集成流程设计器情况下使用
    
5.  条件表达式：内置常见的条件表达式，并且支持自定义扩展
    
6.  orm框架扩展：目前支持MyBatis、Mybatis-Plus、Mybatis-Flex和Jpa，后续会由社区提供其他支持，扩展方便
    
7.  数据库支持：目前支持MySQL 、Oracle 和PostgreSQL，后续会继续支持其他数据库或者国产数据库
    
8.  多租户与软删除：流程引擎自身维护多租户和软删除实现，也可使用对应orm框架的实现方式
    
9.  支持角色、部门和用户等权限配置
    
10.  同时支持spring和solon
    
11.  兼容java8和java17,理论11也可以
    
12.  官方提供基于ruoyi-vue封装实战项目，很实用


## 演示地址

*   admin/admin123
    

演示地址：http://www.hhzai.top

## 官网

http://warm-flow.cn

  

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/qrcode_zsxq.webp)