---
title: warm-flow 1.2.4 version update, domestic workflow engine
author: warm-flow
date: 2024-08-23
cover: /assets/img/news/warm-flow-1.2.4-0.png
head:
  - - meta
    - name: News
---

## warm-flow 1.2.4 version update

* Please check the official website update record for main contents, specific details and upgrade precautions.

* \[feat\] activate and suspend

* \[feat\] Different nodes also support configuring the approval form path

* \[feat\] supports receiving external process status and process status extension

* \[feat\] Added spel conditional expressions. Added conditional expressions that can be loaded through the SPI mechanism

* \[feat\] adds an assignment listener to support dynamic modification of handlers in agent tasks

* \[feat\] Added Easy-Query framework support

* \[feat\] new Mybatis-Flex solon expansion package

* \[feat\] new Jpa solon expansion package

* \[feat\] Add a jump type to the history table and record the jump type

* \[feat\] add component loading, yml control switch
  

## Historical background

flowable and activities are indeed large and comprehensive, but will this be good for general projects? Can you leave work early?

1. **Learning curve:** For beginners, learning may take a certain amount of time and energy. Understanding its concepts, APIs, and configuration can take some patience and practice.

2. **Complexity:** The introduction may seem too complicated for a simple workflow. In some cases, it may be more appropriate to use a simple solution.

3. **Customization requirements:** In some special scenarios, it may be necessary to customize the development to meet specific needs. This may require a deep understanding of its inner workings and source code.

4. **Version Update:** Over time, new versions will be released, which may include feature improvements, bug fixes, etc. Upgrading to a new version may require a certain investment of time and resources to ensure a smooth transition and compatibility.

5. * * reading difficulty: * * all English notes, for people with poor English, there is indeed a threshold.


## What warm-flow can bring you

> Warm-Flow domestic workflow engine🎉, Its characteristics are simple and lightweight but not simple, complete with five internal organs, independent components, expandable, and can meet the components of small and medium-sized projects.

1. Simple and easy to use: only 7 tables, less code, can be quickly started and integrated

2. Approval function: supports pass, return, arbitrary jump, transfer, termination, countersign, ticket sign, delegation, addition and subtraction, mutual exclusion and parallel gateway

3. Listener and process variables: supports five kinds of listeners, can cope with different scenarios, flexible and scalable, parameter transfer, dynamic permissions

4. Flowchart: The process engine comes with a flowchart that can be used without integrating the process designer.

5. Conditional expressions: Built-in common conditional expressions, and support for custom extensions.

6. orm framework extension: currently supports MyBatis, Mybatis-Plus, Mybatis-Flex and Jpa, and other support will be provided by the community in the future, which is convenient for expansion.

7. Database support: currently supports MySQL, Oracle and PostgreSQL, and will continue to support other databases or domestic databases in the future.

8. Multi-tenancy and soft deletion: The process engine itself maintains the implementation of multi-tenancy and soft deletion, and can also use the implementation of the corresponding orm framework.

9. Support role, department and user permissions configuration

Support both Spring and Solon

11. Compatible with java8 and java17, theory 11 can also be

12. The official provides practical projects based on ruoyi-vue packaging, which is very practical.

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

![](/assets/img/news/warm-flow-1.2.4-0.png)

## Demo Address

*   admin/admin123
    

Demo Address：http://www.hhzai.top

## official website

http://warm-flow.cn

About Dromara

Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/qrcode_zsxq.webp)