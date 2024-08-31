---
title: RuoYi-Vue-Plus Releases 5.2.0-BETA Public Test Version Workflow!
author: RuoYi
date: 2024-05-22
tag:
  - 
cover: /assets/img/blog/RuoYi-Vue-Plus-5.2.0-0.png
head:
  - - meta
    - name: Blog
---

![](/assets/img/blog/RuoYi-Vue-Plus-5.2.0-0.png)

* * *

# Update log

### Major changes

* Integration flowable adds workflow related functions (thanks May)

* Integrated snailjob removal powerjob (too many complaints are too expensive to use) (thanks to dhb52)

* Upgrade aws s3 upgrade to 2.x performance is greatly improved

* Optimize data permission data encryption and use pre-scan mapper annotation to improve code performance (thanks to Lao Ma)

* New caffeine reduces redis queries by nearly 90% to improve performance
  

### Dependency Upgrade

*   update springboot 3.1.7 => 3.2.5 Support for virtual threads
    
*   update springboot-admin 3.1.8 => 3.2.3
    
*   update mybatis-plus 3.5.4 => 3.5.6 Adapted Change Code
    
*   update springdoc 2.2.0 => 2.5.0
    
*   update easyexcel 3.3.3 => 3.3.4
    
*   update redisson 3.24.3 => 3.29.0
    
*   update lombok 1.18.30 => 1.18.32
    
*   update sms4j 2.2.0 => 3.2.1 Support custom configuration key can be used for multi-vendor multi-tenant, etc.
    
*   update satoken 1.37.0 -> 1.38.0
    
*   update hutool 5.8.22 => 5.8.26
    
*   update mapstruct-plus 1.3.5 => 1.3.6
    
*   update lock4j 2.2.5 => 2.2.7
    
*   update dynamic-ds 4.2.0 => 4.3.0
    

### Function Update

* update optimizes code generation comments and removes useless introductions (thanks for AprilWind)

* update optimized code generation el-radio tag expiration attribute

* update optimization exception handler automatic configuration

* update optimizes file download using streaming download to reduce memory usage (thanks PhoenixL)

* update optimization removes gc log parameters (add them if necessary)

* update optimized split exception handler

* update optimization regular web exception status code

* update optimization setting static resource path prevents all requests from accessing static resources

* update optimizes redis for different storage types of Long values

* update optimization removes restrictions on encrypted request types

* update optimizes mp multi-tenant plug-in injection logic

* Update optimization RedisUtils support ignoring tenants

* update optimization update ip address xdb file

* update optimizes the verification code to change the background color to light gray

* update optimizes mybatis dependencies to be optional to avoid situations that should not be injected.

* update optimized GET method response body supports encryption

* update optimizes excel plug-in merge strategy to remove non-first row content of merged cells (thanks to cat)

* update optimizes the data permissions of the drop-down interface.

* update optimizes the OssFactory to obtain instance lock performance

* update optimization uses translation annotations to simplify user queries and adjust user query logic.

* Update optimization framework improves query performance as a whole

* update optimization puts p6spy configuration files into common-mybatis plug-in packages
  

### New Features

* add new distributed lock Lock4j exception interceptor

* add new personal center-online device management

* add adds new post code and department code and adjusts the post to department (thank you for AprilWind)

* add's new BaseMapperPlus provides an optional method of selectVoOne whether to throw exceptions (thank you for your resignation before it is cold in autumn)

* add add add user, department, role, position drop-down selection interface and code to achieve optimization

* add add StringUtils.isVirtual method

* add JustAuth integration TopIam single sign-on


### Problem fix

* fix fixes the problem that three-party accounts can be bound to multi-platform accounts

* fix fixes typos in the main building (thanks good)

* fix fixes compatible with redis5.0

* fix fixes the problem that some browsers cannot obtain encrypted response headers

* fix fixes the problem of user not setting department login error

* fix fix excel expression dictionary drop-down box export format error

* fix fixes the scope of elevated locks and uses double check locks (thanks to fanc)

* fix fixes the problem that the user login query department cache cannot obtain the tenant id.

* fix fixes the problem of three-party login error reporting when closing the tenant function
  

### Front-end changes

* update element-plus 2.7.2

* update vite 5.2.10

* update vue 3.4.25

* update vue-router 4.3.2

* update nodejs upgrade to minimum 18.18.0

* update optimizes the default front-end anti-heavy function related to passwords

* update optimizes the problem that the page is blank or the whole page is refreshed when clicking the left menu.

* update optimization el-select and el-input global style

* update optimization home page open topNav does not expand the menu problem

* Update optimization supports global enable or disable interface encryption

* update optimized password verification policy increases illegal character limit

* update optimized image upload component adds compression function to support self-switching (thanks for fengheguai)

* update optimizes the request request class to determine the request header method

* update optimization changes the client state interface using clientId parameter transmission

* update optimizes ws switch to normally open (vite5 fixes crash bug)

* fix fixes the problem that the menu cannot be expanded under the mobile terminal.

* fix repair panel due to min width

* fix fixes the problem that the uppercase suffix of the file preview is not displayed (thanks to North Bridge)

* fix fixes i18n non-sense refresh problem

* fix fixes the problem that websocket to non-index page refresh cannot be reconnected
  

## Platform Introduction

> The RuoYi-Vue-Plus is to rewrite the RuoYi-Vue and upgrade it in an all-round way for the "distributed cluster and multi-tenancy" scenario (not compatible with the original framework).

> project code and documents are open source and free of charge and can be commercially used. just follow the open source protocol and keep the open source protocol files in the project.
It is never too late to write that we are always open source for interest, open source for learning, and open source for everyone to really learn technology.

> System Demo: https://plus-doc.dromara.org/#/common/demo\_system

> front-end project address: plus-ui\](https://gitee.com/JavaLionLi/plus-ui

> Document Address: https://plus-doc.dromara.org

# Functional differences between this framework and RuoYi

| Features | This framework | RuoYi |
| --- | --- | --- |
| Front-end project | Rewritten with Vue3 + TS + ElementPlus | Based on Vue2/Vue3 + JS |
| Back-end project structure | Decoupling in the form of plug-in and expansion package is easy to expand | Module mutual injection coupling is seriously difficult to expand |
| Back-end Code Style | Code Formatting in Strict Compliance with Alibaba Specifications and Project Uniform Configuration | Code Writing and regular Structure Different Dyslexia |
| Web Containers | Adopt Undertow high-performance XNIO-based containers | Adopt Tomcat |
| Permission Authentication | Using Sa-Token and Jwt Static Use Full Functions, Low Coupling and High Expansion | Spring Security Configuration Complicated and Poor Expansion |
| Permission annotation | Using Sa-Token supports annotation login verification, role verification, permission verification, secondary authentication verification, HttpBasic verification, and ignore verification
Role and permission verification supports complex expressions such as 'AND', 'OR' or 'Permission OR role'. | Only whether there is a match is supported. |
| Three-party authentication | Adopt JustAuth third-party login components to support dozens of three-party authentication such as WeChat and DingTalk | None |
| Relational database support | Native support for MySQL, Oracle, PostgreSQL, SQLServer
You can use heterogeneous switching at the same time | Mysql, Oracle does not support simultaneous use, does not support heterogeneous switching |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| Redis Client | Using Redisson Redis Official recommend Netty-based Client Tools
The underlying optimization of more than 90% of Redis commands is supported to avoid many incorrect usages, for example, keys are converted to scan.
Support single-host, sentinel, single-host cluster, multi-host cluster and other modes | Lettuce + RedisTemplate support mode is less cumbersome to use tools
Common-pool Bug for Connection Pool |
| Cache Annotations | It has been extended with Spring-Cache Annotations to support more features.
For example, the maximum expiration time, the maximum idle time, the maximum length of the group, etc. can be automatically cached with only one comment. The Redis code logic needs to be written manually.
| ORM framework | uses Mybatis-Plus object-based almost no writing SQL full java operation powerful plug-ins many
For example, multi-tenant plug-in paging plug-in optimistic lock plug-in, etc. Using Mybatis XML-based requires handwritten SQL.
| SQL monitoring | Using p6spy, you can output complete SQL and execution time monitoring. | Log output requires manual concatenation of SQL statements and parameters. You cannot quickly check debugging problems. |
| Data paging | Using the Mybatis-Plus paging plug-in
The framework has expanded it. Object-oriented paging objects support multiple ways of parameter transfer, support front-end multi-sort complex sorting | Using PageHelper only supports single-query paging parameters can only be transferred from param, only single-sort function, poor scalability, poor experience |
| Data permissions | Use Mybatis-Plus plug-ins to analyze and splice SQL without inductive filtering
Only need to set annotation conditions for Mapper to support various customizations, not limited to department roles | using annotation + aop to realize SQL generated based on department roles has poor compatibility and does not support other business extensions
After generating SQL, it needs to be manually spliced to specific business SQL, which does not work for multiple Mapper queries |
| Data desensitization | Using annotations + desensitization during jackson serialization supports different desensitization conditions for different modules
Support a variety of policies such as ID card, mobile phone number, address, email, bank card, etc. can be self-extended | None |
| Data encryption and decryption | Automatic encryption and decryption during data access using annotations + mybatis interceptors
Supports multiple policies such as BASE64, AES, RSA, SM2, SM4, etc. | None |
| interface transmission encryption | dynamic AES + RSA encryption is used to encrypt the request body. each request key is different, greatly reducing the crackability | none |
| Data Translation | Use annotations + dynamically modify data during jackson serialization for translation
Support multiple modes: 'mapping translator', 'direct translator', 'other extended conditional translator' interface can be completed in two steps to complete custom extension built-in multiple translation implementation | none |
| Multi-data source framework | Adopt dynamic-datasource to support most databases in the world.
You can dynamically manage heterogeneous databases through yml configuration. You can also add data sources through the front-end page.
Support SPEL expression to switch data sources from request header parameters and other conditions | Manual writing code based on druid to configure data sources is cumbersome and poorly supportable |
| Multi-data source transaction | Using dynamic-datasource to support multiple data sources and different kinds of database transaction rollback | Not supported |
| Database Connection Pool | Using HikariCP Spring's official built-in connection pool configuration is simple and famous for its performance and stability | Using druid bug, many communities have poor maintenance and low activity, and many complicated configurations have average performance |
| Database Primary Key | Adopting Snowflake ID Based on Timestamp Orderly Growth Unique ID No Longer Worries about Primary Key Conflicts and Duplication of Sub-database and Sub-table Data Merge | Adopting Database Self-increasing ID Supports Limited Data Volume and Does Not Support Multiple Data Source Primary Key Unique |
| WebSocket protocol | The WebSocket protocol based on Spring encapsulation extends Token authentication and distributed session synchronization, which are no longer just waste based on a single machine | None |
| Serialization | Jackson Spring official built-in serialization is reliable!!! | Famous for adopting fastjson bugjson |
| Distributed Idempotent | Refer to the simplified implementation of the US GTIS anti-heavy system (see the document for details) | Manually written annotations based on aop implementation |
| Distributed lock | Using Lock4j underlying Redisson-based | None |
| Distributed Task Scheduling | Adopting a SnailJob management center that naturally supports distributed unification | Adopting Quartz-based clusters with poor database lock performance requires a lot of configuration and modification |
| file storage | using Minio distributed file storage inherently supports multi-machine, multi-hard disk, multi-slice, multi-copy storage
Support permission management, secure and reliable file storage, can be encrypted | Use native file storage, file leakage is easy to lose, and leakage does not support single-point effect in clusters |
| Cloud Storage | Using AWS S3 Protocol Client to Support All S3 Protocol Supporting Manufacturers such as Qiniu, Ali and Tencent | Not Supported |
| SMS | The sms4j SMS fusion package is used to support dozens of SMS manufacturers. It can be used by multiple manufacturers only by configuring the manufacturer key in yml | Not supported |
| Mail | supports most mail vendors using the mail-api common protocol | Not |
| interface documentation | uses SpringDoc, javadoc, unannotated zero intrusion based on java annotations
Just write the comments well and there is no need to write a lot of documentation comments. | Using Springfox has stopped maintenance and needs to write a large number of comments to support documentation generation. |
| Validation framework | Use Validation support annotations and tool classes to verify annotations to support internationalization | Only annotations are supported and annotations do not support internationalization |
| Excel framework | Plug-in based with Alibaba EasyExcel
The framework has added many functions to it, such as automatic merging of the same content, automatic arrangement, layout, dictionary translation, etc. | POI-based handwriting implementation has limited functions, complexity and poor scalability |
| tool class framework | using hundreds of Hutool and Lombok tools to cover 90% of the usage requirements, automatically generating a large number of codes for simplified frameworks such as get set based on annotations | handwriting tools with poor stability and easy problems, limited number of tools, bloated codes, need to write get set by yourself, etc. |
| Monitoring framework | Adopt SpringBoot-Admin SpringBoot-based official actuator probe mechanism
The real-time monitoring service status framework also extends online log viewing monitoring for it | None |
| Link Tracing | Are Apache SkyWalking Still Worried about Requesting Problems Not Knowing Where to Go
With it, you can view every node that the request passes through in real time | None |
| Code Generator | Just design the table structure and generate all crud codes and pages with one key.
Reduce development by 80% and focus on business design.
The framework adapts MP to it, SpringDoc normalized code and supports dynamic multi-data source code generation. The native structure of code generation only supports single data source generation.
| Deployment Method | Support Docker choreography to build all environments with one click, so that developers will no longer worry about building environments. | Native jar deployment requires manual download and installation to build other environments. |
| Project Path Modification | Provide detailed modification scheme documents and make some changes to them. It is very simple to modify them to what you want. | Many modifications are required. The description of the documents is limited. |
| Internationalization | Dynamically return text content in different languages based on the request header. The development difficulty is low. The corresponding tool class supports the internationalization of most annotation content. | Only basic functions are provided. Other extensions need to be written by oneself. |
| Code singleton test | Provides the writing method of singleton test usage and maven multi-environment single test plug-in | Only provides basic functions and other extensions that need to be written by yourself |
| Demo Case | Actual Use Cases Providing Framework Functions A single module provides a lot of full | None |

  

About Dromara

Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/qrcode_zsxq.webp)