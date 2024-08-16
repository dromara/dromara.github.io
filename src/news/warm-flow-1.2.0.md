---
title: Open source workflow engine warm-flow 1.2.0 major update
author: warm-flow
date: 2024-06-13
cover: /assets/img/news/warm-flow-1.2.0-0.png
head:
  - - meta
    - name: News
---

## warm-flow1.2.0 major updates

! [](/assets/img/news/warm-flow-1.2.0-0.png)

This version has been greatly changed, bringing the long-awaited countersign, ticket signing, transfer, oracle and pg database adaptation, etc., and making corresponding code refactoring. Also due to the large changes, if problems are found, issue can be submitted in time. If it can help solve bug and pr, thank you very much. The continuous improvement of warm-flow cannot be separated from everyone. (Thanks to warm organization members, Tirion Fordring | Liang Trabecular | Vanlin | Zhen, and those who participated in pr)

* v1.2.0 2024-06-13 Precautions: Toolkit Path Adjustment, New Upgrade Script

* Decompose users on behalf of the table and add a user table (the query method needs to be changed)

* CC

* countersignature, ticket signature

* Add and subtract

* Retransfer and improvement

* jpa extension

* Oracle Adaptation

* pg adaptation


## Historical background

flowable and activities are indeed large and comprehensive, but will this be good for general projects? Can you leave work early?

1. **Learning curve:** For beginners, learning may take a certain amount of time and energy. Understanding its concepts, APIs, and configuration can take some patience and practice.

2. **Complexity:** The introduction may seem too complicated for a simple workflow. In some cases, it may be more appropriate to use a simple solution.

3. **Customization requirements:** In some special scenarios, it may be necessary to customize the development to meet specific needs. This may require a deep understanding of its inner workings and source code.

4. **Version Update:** Over time, new versions will be released, which may include feature improvements, bug fixes, etc. Upgrading to a new version may require a certain investment of time and resources to ensure a smooth transition and compatibility.

5. * * reading difficulty: * * all English notes, for people who are not good at English, there is indeed a threshold.


## What warm-flow can bring you

> \[!IMPORTANT\]🎉Domestic self-developed workflow engine, its characteristics are simple (only 7 tables) but not simple, complete, independent components, scalable, can meet the components of small and medium-sized projects.

1. Support regular process flow, such as through, back, termination and arbitrary jump

2. Support transfer, assignment, addition and subtraction, and the task will eventually return to the initiator.

3. Support or sign, countersign and ticket sign

4. Business projects can not rely on process designers, components will generate process pictures.

5. Support role, department and user permissions configuration

6. Support listeners, parameter passing, dynamic permissions.

7. Support multi-tenancy

8. Support mutually exclusive gateway, parallel gateway

9. Support conditional expressions, extensible.

10. Support the use of different orm framework systems, support different orm frameworks and database extensions.

Supports both Spring and Solon

12. Compatible with java8 and java17, theory 11 can also be

13. The official provides practical projects based on ruoyi-vue packaging, which is very practical.


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

![](/assets/img/news/warm-flow-1.2.0-1.png)

  

## Demo Address

*   admin/admin123
    

Demo Address：http://www.hhzai.top

## official website

http://warm-flow.cn

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

! [](/assets/img/news/warm-flow-1.2.0-2.png)