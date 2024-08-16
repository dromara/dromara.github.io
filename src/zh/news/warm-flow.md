---
title: 工作流引擎 Warm Flow 加入 Dromara 开源社区
author: warm
date: 2024-04-26
cover: /assets/img/news/warm-flow-0.png
head:
  - - meta
    - name: 新闻
---

### 作者介绍

*   名称：warm
    
*   dromara 开源组织成员，dromara/warm-flow作者
    
*   研发工程师、技术经理，工作经验8年。此工作流已经持续开发有一年有余。
    
*   https://gitee.com/dromara/warm-flow.git
    
*   https://github.com/dromara/warm-flow.git
    

### 历史背景

flowable和activities确实大而全，但是这样对一般的项目会是好事吗？能早点下班吗

1.  **学习曲线：** 对于初学者来说，学习可能需要一定的时间和精力。理解其概念、API 和配置可能需要一些耐心和实践。
    
2.  **复杂性：** 对于简单的工作流程来说，引入可能会显得过于复杂。在某些情况下，使用简单的解决方案可能更合适。
    
3.  **定制化需求：** 在一些特殊场景下，可能需要对进行定制化开发，以满足特定的需求。这可能需要深入理解其内部工作原理和源代码。
    
4.  **版本更新：** 随着时间的推移，会发布新的版本，其中可能包含功能改进、bug 修复等。升级到新版本可能需要投入一定的时间和资源，以确保平稳过渡和兼容性。
    
5.  **阅读难度：** 全英文注释，对于英文不好的人来说，确实有门槛。
    

> **那何不开发属于国人的工作流呢，为此耗时一年时间自研warm-flow工作流。**

### warm-flow能给你带来什么

国产自研工作流，其特点简洁(只有6张表)但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件。

1.  支持常规的流程流转，比如跳转、回退、审批和任意跳转
    
2.  支持转办、终止，任务最终回到发起人
    
3.  支持或签（会签和票签开发中）
    
4.  业务项目可不依赖流程设计器，组件可生成流程图片
    
5.  支持角色、部门和用户等权限配置
    
6.  支持监听器，参数传递，动态权限
    
7.  支持多租户
    
8.  支持互斥网关，并行网关
    
9.  支持条件表达式，可扩展
    
10.  支持不同orm框架和数据库扩展
    
11.  同时支持spring和solon
    
12.  兼容java8、java17及以上版本，理论11也可以
    
13.  官方提供简单流程封装demo项目，很实用


> 接**入warm-flow后妈妈再也不用担心我加班了**

### 项目功能模块

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

![](/assets/img/news/warm-flow-0.png)

![](/assets/img/news/warm-flow-1.png)

#### 监听器管理

监听器可以说是工作流引擎的上限，灵活度和可扩展性的核心人物

1.  监听器类型
    

*   create：创建监听器，任务创建时执行
    
*   start：开始监听器，任务开始办理时执行
    
*   permission：权限监听器，办理任务动态设置权限
    
*   assignment：分派办理人监听器，分派后执行
    
*   finish：结束监听器，当前任务完成后执行
    

3.  监听器生命周期
    

![](/assets/img/news/warm-flow-2.png)

输入图片说明

#### 配置管理

配置文件可以让工作流使用更加方便，如虎添翼。

1.  配置文件目前支持banner图和填充器配置，后续还会增加多租户和软删除等。
    
    ```
    # warm-flow工作流配置
    warm-flow:
      # 是否显示banner图，默认是
      banner: true
      #填充器（也通过代码防守注入）
      data-fill-handler-path: com.ruoyi.system.handle.CustomDataFillHandler
    ```
    
2.  填充器也可通过代码方式注入
    

```
@Configuration
public class WarmFlowConfig {

    @Bean
    public DataFillHandler dataFillHandler() {
        return new CustomDataFillHandler();
    }
}
```

### 扩展支持

#### orm和数据库扩展

作为新时代的程序员不能固步自封，只支持mybatis和msyql。所以目前已经解偶数据库操作，按照mybatis方式扩展其他的orm或者数据库类型即可

![](/assets/img/news/warm-flow-3.png)

输入图片说明

#### 条件表达式扩展

工作流引擎想要灵活跳转，就得有相应表达式，满足不同的条件，执行不同的任务

目前支持，并且支持规则扩展

```
>, >=, <, <=, =, !=, like, not like
```

### 联系作者

<table data-tool="mdnice编辑器"><tbody><tr><td><img class="rich_pages wxw-img js_img_placeholder wx_img_placeholder" data-imgfileid="100005826" data-ratio="1.3642105263157895" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/KCPYGythicQJOB3IUnWCibl8sBozvyzBeycM2t0w3vQNsN2UcrckubgRL6tlwr2lqpnaIyUF88hc2fAEDZKmgsuQ/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="950" style="display: block; margin-right: auto; margin-left: auto; width: 614px !important; height: 837.625px !important;" data-original-style="display: block;margin-right: auto;margin-left: auto;" data-index="5" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="677px" crossorigin="anonymous" alt="图片"></td><td><img class="rich_pages wxw-img js_img_placeholder wx_img_placeholder" data-imgfileid="100005827" data-ratio="1.8138297872340425" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/KCPYGythicQJOB3IUnWCibl8sBozvyzBeyyPVFKnibBflWX4wk1OKRTR3jnP7qSRxolZtzXkicwMjaVicTmA4ibFx9SQ/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="940" style="display: block; margin-right: auto; margin-left: auto; width: 322px !important; height: 584.053px !important;" data-original-style="display: block;margin-right: auto;margin-left: auto;" data-index="6" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="677px" crossorigin="anonymous" alt="图片"></td></tr></tbody></table>