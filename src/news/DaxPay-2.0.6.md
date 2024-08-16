---
title: DaxPay v2.0.6 Release:Refactoring Simplified, Light and Starting Again
author: DaxPay
date: 2024-05-17
cover: /assets/img/news/DaxPay-2.0.6-0.png
head:
  - - meta
    - name: News
---

## Project Introduction

'DaxPay' is an open source payment gateway system owned by 'Dromara Open Source Community', which has been connected to Alipay, WeChat payment and cloud flash payment related interfaces. Independent deployment, provides interfaces for business systems to call, does not affect the original system.

## 源码地址

| Project | GITEE | GITHUB |
| --- | --- | --- |
| Backend Address | https://gitee.com/dromara/dax-pay | https://github.com/dromara/dax-pay |
| Web front-end address | https://gitee.com/bootx/dax-pay-ui | https://github.com/xxm1995/dax-pay-ui |
| H5 Front End Address | https://gitee.com/bootx/dax-pay-h5 | https://github.com/xxm1995/dax-pay-h5 |

## System Highlights

* The interfaces that encapsulate various payment channels are unified interfaces, which is convenient for business systems to call and simplify the complexity of docking multiple payment methods.

* Interfaces related to "WeChat Pay", "Alipay" and "Cloud Flash Pay" have been connected

* Support payment, refund, reconciliation, and other payment-related capabilities

* Provide 'HTTP' interface calling capability and 'Java' version of 'SDK' to facilitate docking of business systems

* The interface request and response data supports the signature mechanism to ensure safe and reliable transactions

* Provide a management platform to facilitate the management and operation of operators

* Provide demo modules of 'Aggregate Payment', 'Computer Cashier' and 'Mobile Cashier' for developers to refer to the logic of implementing payment functions.

* The system source code is a business-friendly' Apache-2.0 'protocol, and the document is a looser' MIT' protocol. There is no need to worry about sudden charges for subsequent codes and documents.
  

## Refactoring and updating instructions

> The 'DaxPay' before this reconstruction has some design problems, such as the introduction of the concept of combined payment in order to make something different from other payment systems, resulting in a doubling of the complexity of the payment to solve a very small number of scenarios. As well as before and after the development of different considerations, the system of various concepts, over-design, naming is not uniform everywhere, reading the source code and secondary development has created a great obstacle. After discussing with the community exchange group and the ideas determined in the design of the multi-merchant version, it was decided to slim down the single-merchant version, focus on the needs of small and micro merchants and developers, and as a verification outpost for the multi-merchant version, carry out a major system restructuring to better cope with the subsequent evolution.

### Order concept simplification

* Remove the concept of channel payment orders, there is no longer a multi-level order, from one-to-many to one-to -1

* Remove the concept of channel refund, only associated with payment orders, no longer associated with channel payment orders, refund orders also return to a 1 relationship

* Payment and refund-related callback records, closing records, synchronization records, etc., the association relationship is simplified to one-to-many, and there is no longer a many-to-many relationship.

* Optimize the rules for generating various transaction numbers, and change the original snowflake ID to a number with specific business meaning.

### Simplified payment process

* Remove the concept of combined payment, sacrifice 5% of the applicable scenarios in exchange for a 50% reduction in business complexity and a 30% reduction in code volume

* Simplify the length of payment links and the number of branches, remove some overused design patterns, and make the code easier to start

* Payment synchronization, callback and refund synchronization, callback removal of special processing logic caused by combined payment

* Message notification sending process transformation, no longer using complex inheritance combination relationship, only retain the first-class inheritance relationship

* Callback notification processing no longer uses the inheritance mode, but is modified to the combination mode to improve the convenience of reading and debugging.

### Reconciliation process optimization

* Simplify the original obscure process, abstract bit statements and reconciliation differences.

* Save the original reconciliation file downloaded from the three-party payment institution and provide download function

* Support downloading system transaction bills and reconciliation variance details to perform offline reconciliation
  

### split automation

* Supports automatic account splitting based on the completed order of the default account splitting team payment.

* supports automatic synchronization of reconciliation results and automatic completion of split bills
  

### Unified API interface style

* Unified parameter naming rules, including the attributes of related parameters such as payment, refund, reconciliation, and account splitting, to achieve a unified style.

* Unified public request parameters and response parameters, and response parameter format for unified processing

* The response parameters are signed by default to avoid loss of funds due to tampering by middlemen.

* Initially unify the exception return format, and subsequently unify all kinds of exception codes and exception information.
  

### Front-end interaction optimization

* Optimize 85% payment-related pages and unify page interaction logic

* Adapt to various query conditions and displays, and initially complete the functional completeness of the management terminal.

* Unify the amount of money and use yuan as the display unit. At present, 80% of the money has been completed.
  

### Scaffolding simplified

* Change from jar integration to source integration

* Eliminate and simplify useless modules
  

## system foresight

### Multi-merchant version launch development

> for medium and large projects, all kinds of complex payment services can realize multi-merchant and multi-application self-entry and receipt. And according to the rules, automatically select the best direct or inter-connected channel for receipt; It is expected that the multi-merchant version will be released in the fourth quarter, please look forward to it!

* Based on Spring Boot3.X JDK 21 Postgresql, embracing new technologies and adapting to changes in subsequent Java versions

* Introduce concepts such as merchants and applications. The system will be divided into payment gateway, operation management and merchant terminals to adapt to more complex business scenarios.

* Payment-related codes directly use the official SDK to increase system autonomy and controllability

* All kinds of encryption methods are switched to national secret algorithm, which is more convenient to adapt to the requirements of localization, security and controllability.

* Reconstruction of the underlying scaffolding, removal of irrelevant business modules, redesign of system modules, improve system performance and operational convenience

* More features in the design plan
  

### Single Merchant Subsequent Evolution

> the single merchant version is targeted at small and micro merchants and small and medium-sized enterprise developers, and can be used for simple receipt, composition of small project payment, and learning reference. There will also be pre-validation of the design and functionality of some multi-merchant versions.

* Support Alipay and WeChat V3 version interface

* Support more payment interfaces such as cancellation and transfer

* Add WeChat notification, DingTalk notification and flying book notification capabilities

* Support the service provider model and some inter-connected channels, such as Tonglian Payment and Yibao Payment, to better adapt to small and micro acquiring scenarios.
  

## Demo Address

### Management Platform:

> note: the permission to modify and delete some functions of the demo account is not open.

Address: https://daxpay.demo.bootx.cn account number: daxpay password: 123456

### Gateway Interface

> Note: The interface platform only opens the interfaces related to the payment gateway, and does not open other interfaces of the system.

Address: https://daxpay.server.bootx.cn/doc.html account number: daxpay password: 123456

### Cashier

> Do not pay large amounts, you can refund through the background management platform

Computer cashier address: https://daxpay.demo.bootx.cn/#/cashier

Mobile Cashier Address: https://daxpay.demo.bootx.cn/h5/#/cashier/uniCashier

## System Presentation

### PC Cashier

![](/assets/img/news/DaxPay-2.0.6-0.jpg)

  

### Cockpit

![](/assets/img/news/DaxPay-2.0.6-1.jpg)

  

### Payment Order

![](/assets/img/news/DaxPay-2.0.6-2.jpg)

  

### Order Details

![](/assets/img/news/DaxPay-2.0.6-3.jpg)

  

### Dimension Group

![](/assets/img/news/DaxPay-2.0.6-4.jpg)

  

## Communication

A person's ability is always limited, very welcome everyone to communicate and grow together!!!

### QQ communication group

![](/assets/img/news/DaxPay-2.0.6-5.jpg)

![](/assets/img/news/DaxPay-2.0.6-6.jpg)

### WeChat Sweep Code Plus Small Assistant Pull Group

![](/assets/img/news/DaxPay-2.0.6-7.jpg)

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/DaxPay-2.0.6-8.png)