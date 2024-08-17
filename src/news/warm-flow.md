---
title: Workflow Engine Warm Flow Joins Dromara Open Source Community
author: warm
date: 2024-04-26
cover: /assets/img/news/warm-flow-0.png
head:
  - - meta
    - name: News
---

### Author Introduction

* Name: warm

* dromara open source organization member, dromara/warm-flow author

* R & D engineer, technical manager, 8 years working experience. This workflow has been under development for more than a year.

* https://gitee.com/dromara/warm-flow.git

* https://github.com/dromara/warm-flow.git


### Historical Background

flowable and activities are indeed large and comprehensive, but will this be good for general projects? Can you leave work early?

1. **Learning curve:** For beginners, learning may take a certain amount of time and energy. Understanding its concepts, APIs, and configuration can take some patience and practice.

2. **Complexity:** The introduction may seem too complicated for a simple workflow. In some cases, it may be more appropriate to use a simple solution.

3. **Customization requirements:** In some special scenarios, it may be necessary to customize the development to meet specific needs. This may require a deep understanding of its inner workings and source code.

4. **Version Update:** Over time, new versions will be released, which may include feature improvements, bug fixes, etc. Upgrading to a new version may require a certain investment of time and resources to ensure a smooth transition and compatibility.

5. * * reading difficulty: * * all English notes, for people who are not good at English, there is indeed a threshold.


> * * why not develop a workflow that belongs to the Chinese? for this reason, it took a year to develop the warm-flow workflow. * *

### What can warm-flow bring to you

Domestic self-research workflow, its characteristics are simple (only 6 tables) but not simple, complete, independent components, scalable, can meet the components of small and medium-sized projects.

1. Support regular process flow, such as jump, rollback, approval and arbitrary jump

2. Support transfer and termination, and the task will eventually return to the initiator.

3. Support or sign (countersign and ticket sign are under development)

4. Business projects can not rely on the process designer, and components can generate process pictures.

5. Support role, department and user permissions configuration

6. Support listeners, parameter passing, dynamic permissions.

7. Support multi-tenancy

8. Support mutually exclusive gateway, parallel gateway

9. Support conditional expressions, extensible.

10. Support for different orm frameworks and database extensions.

Supports both Spring and Solon

12. Compatible with java8, java17 and above, theory 11 can also be

13. The official provides a simple process to package demo projects, which is very practical.


> after receiving * * into warm-flow, my mother no longer has to worry about me working overtime * *

### Project function module

#### Process flow management

Process flow is like a warm-flow driver. Make the process as simple as drinking water.

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

#### Flowchart Management

Flowchart management is like a warm-flow facade. As a workflow engine, of course, it can be used independently from the process designer. The process picture generation is essential. The warm-flow self-developed the flow chart drawing, obtained the coordinates through the designer, and carried out the progress and status of the drawing process (of course, the business system can not integrate the designer, but can design the export xml in the demo project provided by the author, and the business system can be imported again).

! [](/assets/img/news/warm-flow-0.png)

! [](/assets/img/news/warm-flow-1.png)

#### Listener Management

The listener can be said to be the core figure of the upper limit, flexibility and scalability of the workflow engine.

1. Listener type


* create: creates a listener, which is executed when a task is created.

* start: start the listener, which is executed when the task is started.

* permission: permission listener, dynamically set permissions for handling tasks

* assignment: dispatch manager monitor, executed after dispatch

* finish: end the listener and execute it after the current task is completed.


3. Listener life cycle


! [](/assets/img/news/warm-flow-2.png)

Enter picture description

#### Configuration Management

Configuration files can make workflows easier to use and more powerful.

1. The configuration file currently supports banner graph and filler configuration, and multi-tenant and soft delete will be added later.

    ```
    # warm-flow工作流配置
    warm-flow:
      # 是否显示banner图，默认是
      banner: true
      #填充器（也通过代码防守注入）
      data-fill-handler-path: com.ruoyi.system.handle.CustomDataFillHandler
    ```
    
2.  Filler can also be injected by code
    

```
@Configuration
public class WarmFlowConfig {

    @Bean
    public DataFillHandler dataFillHandler() {
        return new CustomDataFillHandler();
    }
}
```

### Extended Support

#### orm and database extension

As a new era of programmers can not stand still, only support mybatis and msyql. Therefore, at present, the database operation has been solved and other orm or database types can be extended in mybatis way.

! [](/assets/img/news/warm-flow-3.png)

Enter picture description

#### Conditional Expression Extension

If the workflow engine wants to jump flexibly, it must have corresponding expressions that meet different conditions and perform different tasks.

Currently supported, and supports rule extension

```
>, >=, <, <=, =, !=, like, not like
```

### Contact the author

<table data-tool="mdnice编辑器"><tbody><tr><td><img class="rich_pages wxw-img js_img_placeholder wx_img_placeholder" data-imgfileid="100005826" data-ratio="1.3642105263157895" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/KCPYGythicQJOB3IUnWCibl8sBozvyzBeycM2t0w3vQNsN2UcrckubgRL6tlwr2lqpnaIyUF88hc2fAEDZKmgsuQ/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="950" style="display: block; margin-right: auto; margin-left: auto; width: 614px !important; height: 837.625px !important;" data-original-style="display: block;margin-right: auto;margin-left: auto;" data-index="5" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="677px" crossorigin="anonymous" alt="图片"></td><td><img class="rich_pages wxw-img js_img_placeholder wx_img_placeholder" data-imgfileid="100005827" data-ratio="1.8138297872340425" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/KCPYGythicQJOB3IUnWCibl8sBozvyzBeyyPVFKnibBflWX4wk1OKRTR3jnP7qSRxolZtzXkicwMjaVicTmA4ibFx9SQ/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="940" style="display: block; margin-right: auto; margin-left: auto; width: 322px !important; height: 584.053px !important;" data-original-style="display: block;margin-right: auto;margin-left: auto;" data-index="6" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="677px" crossorigin="anonymous" alt="图片"></td></tr></tbody></table>