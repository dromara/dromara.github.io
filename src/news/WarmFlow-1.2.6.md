---
title: Warm Flow 1.2.6 Version update, support process status customization
author: warm flow
date: 2024-08-28
cover: /assets/img/news/WarmFlow-1.2.6-0.png
head:
  - - meta
    - name: News
---

## ![](/assets/img/news/WarmFlow-1.2.6-0.png)  

## warm-flow 1.2.6 Version update

### This change

> Process status: can receive external transmission, can support string
> add api: add to get next node information
> id generation: supports id of other digits and can be serialized for front-end precision problems.

* v1.2.6 2024-08-28

* \[feat\] Add api @ xiarigang for obtaining the next node collection

* \[feat\] id memory policy adds 14 and 15-bit snowflake algorithm support

* \[feat\] process activation and suspension case @ xiaoxiaoliu889

* \[feat\] Add @ xiaoxiaoliu889 to get flow chart based on process definition Id

* \[update\] Change the process status to string type @ xiarigang

* \[update\] Test module split independent warehouse

* \[update\] modes-sb delete the loading configuration file and load it with upper-level jar instead

* \[update\] yml version of flex solon is wrong, config is adjusted

* \[refactor\] Logical refactoring of process version number generation @ xiaoxiaoliu889

* \[fix\] Fix that the user data cannot be deleted correctly according to the deleteByTaskIds

* \[fix\] fix jpa solon annotation problem @ vanlin

* \[fix\] Fix the problem of ending the process incorrectly when the parallel gateway 3 a task branch.

* Execute the upgrade script [warm-flow\_1.2.6. SQL]]

* Change the flow\_status field to string type, and the business system needs to modify it accordingly.

* [Upgrade Notes]]

* Update log
    

## warm-flow introduction

> \[!IMPORTANT\] Warm-Flow Domestic Workflow Engine🎉, Its characteristics are simple and lightweight but not simple, complete with five internal organs, independent components, expandable, and can meet the components of small and medium-sized projects.

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