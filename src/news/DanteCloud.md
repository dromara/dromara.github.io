---
title: Dante Cloud The first microservice in China that supports the integration of blocking and reactive styles has been released.  
author: Dante Cloud
date: 2024-05-28
cover: /assets/img/news/Dante-Cloud-3.1.3.0-cover.png
head:
  - - meta
    - name: News
---

![](/assets/img/news/Dante-Cloud-3.1.3.0-cover.png)

  

"Dante Cloud" is the first microservice in China that supports the integration of blocking and reactive styles. With the core of "high-quality code and low security vulnerabilities", it adopts the design concept of the Domain-Driven Model (DDD), is fully based on the open-source technology of the entire Spring ecosystem and the OAuth2.1 protocol, supports the authentication of Internet of Things (IoT) devices such as smart TVs and IoT, meets the requirements of the national third-level security protection, supports the encryption and decryption of national secret digital envelopes at the interface, anti-brushing, high protection against XSS and SQL injection, and a series of security system multi-tenant microservice solutions. 

## \[1\] Release background

**Dante Cloud** has always adhered to the concept of "simplicity, efficiency, inclusiveness and pragmatism", and has been constructed using various emerging technologies or mainstream technologies in the field of microservices and its surrounding areas. It has continuously worked intensively, refined and refined, and carefully built. The goal is to build a product with "high code quality, low maintenance investment, and strong security protection", which can help users quickly cross the stages of architectural technology selection and technical research and exploration, and reduce the high maintenance investment caused by potential hidden dangers such as security vulnerabilities, technical debts, and low-quality code in traditional projects. It is expected that, just like the meaning of the project name implies, it will connect the past and the future during the period of industry transformation and assist the informatization construction and transformation of enterprises. In the previous versions, Dante Cloud has always adopted the traditional blocking development method and used the mainstream technologies and components in the industry. Although there are many unique bright spot functions of its own, there is no significant difference from the same type of products in the industry. At the end of 2023, a netizen suggested: **Hope Dante Cloud supports GRPC and WebFlux containers** to widen the performance gap with the same type of open-source frameworks. This suggestion opened up a new train of thought. Therefore, after entering 2024, Dante Cloud has taken the design and development of the reactive version as the focus and strived to integrate some new technologies related to the reactive into the product. After several months of unremitting efforts, it finally lived up to expectations. On the occasion of the third anniversary of open source, a version supporting the integration of "blocking" and "reactive" was released. 

## \[2\] New version features

* 'Spring Boot' has been upgraded to 3.3.0

* 'Spring Authorization Server' has been upgraded to 1.3.0

* Java 21 is fully adopted, and virtual threads are turned on by default to improve the processing of blocking operations and reduce the consumption of system resources.

* Support traditional 'blocking' microservices and 'Reactor' and 'WebFlux' based 'Reactor' microservices running in a system at the same time

* It is not mandatory to use the 'responsive' method for development. You can flexibly choose whether to use the 'responsive' or 'blocking' method to develop corresponding services according to your project's requirements for resource throughput, resource consumption, and special function performance guarantee.

* Under the premise of maintaining the various features of Dante Cloud's original 'Spring Authorization Server' in-depth expansion, the dynamic authentication of the 'Responsive' service is fully integrated with the existing system (no need to use '@ PreAuthorize' to write dead permissions in the code, all through background dynamic management)

* Shift to "reactive programming" and refactor a large number of core code based on 'Reactor' to further improve the code quality and operational efficiency of the system

* Re-architect all core component modules, further reduce the coupling of each module, reduce the dependence depth of third-party components, simplify the complexity of each module, use the official writing method closer to Spring Boot ecology, and improve the pluggability of module components and the adaptation capability of automatic configuration in different environments of 'responsive' and 'blocking'

* Realize the perfect integration of different types of services, Session sharing system and custom Session system (who said that microservices must not use Session :)).

* Added 'GRPC' inter-service calls and communication methods. The system supports 'OpenFeign' and 'GRPC' inter-service calls. You can switch between the two methods by modifying the configuration.

* Rewrite the WebSocket messaging system based on 'RSocket' to achieve WebSocket 'responsive' transformation and full integration with the Spring Security system. Support multi-instance, cross-service private communication and broadcast

* Added OAuth2 independent client, which can be used for client dynamic registration and authorization code mode

* Added a lightweight log center and link tracing solution based on the Grafana ecosystem, which uses OSS as data storage to greatly reduce resource requirements. It can be used as an alternative to the original Skywalking and ELK heavyweight systems, and can be switched according to actual needs.

* Open pure handwriting dynamic form function. It can realize the series connection of BPMN, dynamic form and Camunda process engine to realize workflow operation (currently only supports simple workflow)

* Open the BPMN Online Designer feature with custom property panel.

* Open IoT device authentication and management module to support Emqx-based IoT device communication and management.

* Open third-party OpenApi packaging modules such as Alibaba Cloud Content Review, Baidu OCR, Huanxin, Emqx, Eye Check, Nacos, and PolarisMash

* The front-end project supports Docker operation, and related parameters can be modified by configuring environment variables. It has been uploaded to Docker Hub and can be downloaded and run directly.
  

## \[3\] Design Q & A

### 1\. Why not do "pure blood" response

Responsive has its advantages, but the use of responsive must not face some practical problems:

* To do pure blood response, we must first have ecological guarantee. At present, the acceptance of responsive is not very high, and many components do not support responsive. Unless you have the energy to rewrite 1 all the unsupported components used, it is difficult to achieve pure blood, especially for microservice systems.

* The vast majority of applications need to use databases. Orm components existing in Java either do not support responsiveness (such as JPA), do not support particularly well (such as Hibernate), or need to write too much content (such as R2DBC). Therefore, it is not "cost-effective" to do responsiveness at the data level from the perspective of input-output ratio"


Therefore, it is still necessary to look at the type of application system, and there is no need to achieve pure blood 'responsive' when the conditions are not met '.

### 2\. What are the benefits of being responsive?

There are a lot of articles on the Internet about the benefits of 'responsive' to 'blocking', so I won't go into details. For the obvious advantages in practical application:

* 'Responsive' has higher utilization efficiency of resources. For functions with high resource consumption, the advantages of 'Responsive' are more prominent

* Microservice systems often need to integrate more content, especially at the data level. There may be simultaneous use of multiple types of data storage and data flow and migration. regular event-driven and responsive "flow" thinking is more suitable than traditional blocking.

* Responsive can work better with event-driven. Event-driven is heavily used in many aspects of the Spring ecosystem, and the core design idea of responsiveness is the same as event-driven.


> Because Dante Cloud uses a lot of Spring Integration content, the traditional blocking method becomes more and more awkward, and it becomes more and more necessary to do responsive support. If you have time to take a good look at Spring Integration, maybe it will open a new world for you.

### 3\. What are the difficulties in learning responsive programming

*   If you are learning reactive programming based on Reactor, the difficulty and breakthrough point lies in the two classes `Flux` and `Mono`.By thoroughly understanding the methods of these two classes, you can basically eliminate all obstacles to development.
    
*   The biggest difficulty in reactive programming is the transformation of programming thinking, because it is difficult to adapt to the 'reactive' 'stream' development thinking after being used to blocking programming
    

> It's dogged that does it

## \[4\] Dante Cloud Memorabilia

**Summarize the past and move towards the future!**

*   2021.05.15 Dante Cloud Official open source
    
* 2021.08.04 Complete software copyright registration

* 2022.02.10 A "skilled worker" came to Dante Cloud to disassemble the Dante Engine component library to pave the way for the migration from Spring Security OAuth2 to Spring Authorization Server.

* 2022.05.20 First release of Dante Cloud based on Spring Authorization Server and new architecture

* 2022.07.01 A new front-end project based on the latest technology stacks such as Vue3, Vite2, Pinia, Quasar2, Typescript, Hooks, etc.

* 2022.07.30 officially joined the Dromara open source community, the project name changed from Eurynome Cloud to Dante Cloud

* 2022.08.15 Dante Cloud Star numbers exceed 1K.

* 2022.08.18 The first batch of Dante Cloud Committer (Li Daolan, jokeway, Future, Looo, I asked if this melon is ripe, Ymind, tao) are welcomed one after another. Thank you, the author is no longer alone.

* 2022.10.08 The new version of the monorepo mode based on pnpm goes online

* 2022.12.20 Releases the first official version of Spring Boot 3.

* 2023.04.12 Dante Cloud Star number exceeds 1.5K.

* 2023.05.25 New Adaptation Spring Boot 3.1.0, Open Source 2nd Anniversary Version Released

* 2023.12.07 First version of Spring Boot 3.2.0 and Spring Cloud 2023.0.0 released

* 2023.12.15 New Dante Cloud Committer(Kaiser\_Li, James7, leven-space)

* 2023.12.20 Start planning the design and development of a responsive version

* 2024.01.01 Dante Cloud Star Number Breaks 2K

* 2024.04.20 Responsive version First RC release

* 2024.05.23 Dante Cloud 3.1.X version is out of maintenance

* 2024.05.28 Dante Cloud Responsive Version Released
  

## \[5\] Other instructions

### 1\. Branch Description

| Branch Name | Corresponds to Spring Ecological Version | JDK version | Use | Status quo |
| --- | --- | --- | --- | --- |
| master | Spring Boot 3.3 和 Spring Cloud 2023.0.1 | JDK 17 | Main Publishing Branch | recommend using code branches |
| develop | Spring Boot 3.3 和 Spring Cloud 2023.0.1 | JDK 17 | Development Branch | New functions and ISSUE are developed in this branch and will be PR to the master branch after release. Development branch is not guaranteed to be available |
| reactive-master | Spring Boot 3.3 和 Spring Cloud 2023.0.1 | JDK 21 | Responsive Primary Release Branch | recommend use of responsive code branches |
| reactive-develop | Spring Boot 3.3 和 Spring Cloud 2023.0.1 | JDK 21 | responsive Development branch | Next generation responsive microservice version development branch. Development branch is not guaranteed to be available |
| 3.1.X | Spring Boot 3.1 和 Spring Cloud 2022.0.X | JDK 17 | History code, no longer maintained | Based on the code branch developed in the Spring Boot 3.1 era, it is stable and available and no longer maintained. |
| 2.7.X | Spring Boot 2.7 和 Spring Cloud 2021.0.X | JDK 8 | History code, no longer maintained | Based on the code branch developed in the Spring Boot 2.7 era, it is stable and available and no longer maintained. |
| spring-security-oauth2 | Spring Boot 2.6 和 Spring Cloud 2021.0.X | JDK 8 | History code, no longer maintained | Microservices based on the original Spring Security OAuth2 implementation are stable and available. Because related components are not maintained, this version is no longer maintained. |

### 2\. System Documentation

In order to better help everyone understand and learn Dante Cloud, a new document site https://www.herodotus.vip is added. The site currently contains corrected and reorganized system deployment-related content, the follow-up plan according to the detailed knowledge points and modules involved in the system to supplement the corresponding design implementation and cognitive understanding related articles. If there is no special reason, the original site will still be retained.

* * *

**Welcome Star Wave to support us！**

**Gitee**：https://gitee.com/dromara/dante-cloud

**Github**：https://github.com/dromara/dante-cloud

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.

  

Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact**

![](/assets/img/news/DanteCloud-1.webp)