---
title: 开源工作流引擎 warm-flow 1.2.0 重大更新
author: warm-flow
date: 2024-06-13
cover: /assets/img/news/warm-flow-1.2.0-0.png
head:
  - - meta
    - name: 新闻
---

## warm-flow1.2.0重大更新

![](/assets/img/news/warm-flow-1.2.0-0.png)

本次版本改动比较大，带来了大家期待已久的会签、票签、转办、oracle和pg数据库适配等，并且做了相应的代码重构。也由于改动比较大，如果发现问题，可以及时提交issue，如果能帮助解bug和pr，非常感谢，warm-flow不断完善离不开大家。(感谢warm组织成员，Tirion Fordring|梁小梁|Vanlin|Zhen,以及参与pr的人)

*   v1.2.0  2024-06-13 注意事项：工具包路径调整，新增升级脚本
    
*   代办表解偶用户，新增用户表（查询方式需要改动）
    
*   抄送
    
*   会签，票签
    
*   加减签
    
*   转办完善
    
*   jpa扩展
    
*   oracle适配
    
*   pg适配
    

## 历史背景

flowable和activities确实大而全，但是这样对一般的项目会是好事吗？能早点下班吗

1.  **学习曲线：** 对于初学者来说，学习可能需要一定的时间和精力。理解其概念、API 和配置可能需要一些耐心和实践。
    
2.  **复杂性：** 对于简单的工作流程来说，引入可能会显得过于复杂。在某些情况下，使用简单的解决方案可能更合适。
    
3.  **定制化需求：** 在一些特殊场景下，可能需要对进行定制化开发，以满足特定的需求。这可能需要深入理解其内部工作原理和源代码。
    
4.  **版本更新：** 随着时间的推移，会发布新的版本，其中可能包含功能改进、bug 修复等。升级到新版本可能需要投入一定的时间和资源，以确保平稳过渡和兼容性。
    
5.  **阅读难度：** 全英文注释，对于英文不好的人来说，确实有门槛。
    

## warm-flow能给你带来什么

> \[!IMPORTANT\] 🎉国产自研工作流引擎，其特点简洁(只有7张表)但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件。

1.  支持常规的流程流转，比如通过、回退、终止和任意跳转
    
2.  支持转办、委派、加减签，任务最终回到发起人
    
3.  支持或签、会签和票签
    
4.  业务项目可不依赖流程设计器，组件会生成流程图片
    
5.  支持角色、部门和用户等权限配置
    
6.  支持监听器，参数传递，动态权限
    
7.  支持多租户
    
8.  支持互斥网关，并行网关
    
9.  支持条件表达式，可扩展
    
10.  支持不同orm框架系统使用，支持不同orm框架和数据库扩展
    
11.  同时支持spring和solon
    
12.  兼容java8和java17,理论11也可以
    
13.  官方提供基于ruoyi-vue封装实战项目，很实用


#### 流程流转管理

流程流转就像是warm-flow的驾驶人。让办理流程像喝水一样简单的事情。  

```
// 部署流程
public void deployFlow() throws Exception {
        defService.importXml(new FileInputStream("/xxx/leaveFlow-serial.xml"));
        }
// 发布流程
public void publish() {
        defService.publish(1219285650587652096L);
        }
// 开启流程
public void startFlow() {
        insService.start("2", getUser());
        }
// 跳转流程
public void skipFlow() {
        Instance instance = insService.skip(1232001238795685888L,getUser().skipType(SkipType.PASS.getKey())
        .permissionFlag(Arrays.asList("role:1", "role:2")));
        }
//任意跳转
public void skipAnyNode() {
        Instance instance = taskService.skip(1219286332145274880L, getUser().skipType(SkipType.PASS.getKey())
        .permissionFlag(Arrays.asList("role:1", "role:2")).nodeCode("4"));
        }
// 终止流程
public void termination() {
        taskService.termination(1232001396254052352L, getUser());
        }
```

#### 流程图管理

流程图管理就像warm-flow的门面。作为工作流引擎，当然是可以能脱离流程设计器，独立使用的，那流程图片生成是必不可少的。warm-flow自研了流程图绘制，通过设计器获取坐标，进行绘制流程的进度和状态（当然业务系统可以不集成设计器，可在作者提供的demo项目中设计好导出xml，业务系统再次导入即可）。  

![](/assets/img/news/warm-flow-1.2.0-1.png)

  

## 演示地址

*   admin/admin123
    

演示地址：http://www.hhzai.top

## 官网

http://warm-flow.cn

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/news/warm-flow-1.2.0-2.png)