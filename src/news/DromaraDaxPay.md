---
title: Welcome to the new open source payment gateway，Dromara DaxPay
author: 喵呀
date: 2024-02-26
cover: /assets/img/news/Dromara-DaxPay-0.png
head:
  - - meta
    - name: News
---

## Author introduction

* Name: Meow

* dromara open source organization member, dromara/dax-pay author

* Payment industry recruits, Java senior development engineer, development, design, operation and maintenance versatile

* 1 new Jinan people, love to visit museums everywhere, love to pursue a variety of historical sites

* Personal space: https://gitee.com/GIotEE
  

## Background

Is there the following pain points when docking three-party payments at ordinary times, especially when docking multiple payments:

> 1. each payment system has different calling methods, return parameters, data signatures, callback formats, etc., and cannot be reused with each other during docking.
>>
> 2. The payment capabilities provided by various payment systems are different. Sometimes, in order to show the same functions to customers, the business system needs to write a large number of adaptation codes to realize it.
>>
> 3. necessary functions such as payment order, refund order, callback record, order closing, reconciliation and account splitting, etc. need to be implemented, and various scenarios need to be considered to ensure that there is no problem.
>>
> 4. Sometimes the business needs to support some extended payment types, such as supporting wallet payment, supporting multiple payment methods for combined payment, supporting aggregate payment for one-code scanning, etc.
>>

If you encounter these problems, **Dromara DaxPay** (open source payment gateway) may be able to help you:

It is the 1 new open source payment gateway system under the' Dromara Open Source Community'. It abstracts and unifies the calling methods of various payment channels (such as Alipay, WeChat, Cloud Flash Payment, etc.), hides details that developers do not need to pay attention to, and can interface with multiple payment channels only by 1 a code. 'DaxPay' is deployed independently and provides an independent management interface. It does not invade the business system or need to be modified. It only needs to be called through 'http' to have the corresponding payment capability. In addition to the docking of various three-party payment systems, the commonly used payment methods have been expanded to support functions such as aggregate payment, combination payment, and wallet payment.
## System highlights

* Based on 'Spring Boot', 'Vue3' mainstream technology stack, easy to expand and transform the system

* The interfaces of "WeChat Pay" and "Alipay" payment have been connected. Subsequent versions will support the "V3" version payment interface and more types of payment channels such as "Cloud Flash Pay" and "PayPal '.

* Provide a unified interface for all kinds of payment channels to simplify the complexity of payment docking, and also facilitate the rapid replacement or addition of new payment channels in the later period.

* Provide extended payment methods such as 'wallet payment', 'cash payment' and 'stored value card payment', and support combined payment to meet various payment scenarios of business systems.

* Provide the 'Java' version of the 'SDK' toolkit to simplify the business system docking process, and can also use the 'HTTP' method for interface calls, ensuring lower coupling and versatility

* The request, response, and callback data all support the signature mechanism, which can be switched according to actual needs to ensure the safety and reliability of the transaction

* Provide a management platform for convenient operation of various orders, records and configurations, and facilitate the management of payment services by operators

* Provide demo modules of 'Aggregate Payment', 'Computer Cashier' and 'Mobile Cashier' for developers to refer to the logic of implementing payment functions.

* The system source code is a business-friendly' Apache-2.0 'protocol, and the document is a looser' MIT' protocol. There is no need to worry about sudden charges for subsequent codes and documents.

## Instructions for use

> This is an example of using SKD docking simple payment interface to demonstrate how the business system can quickly access the payment gateway through SDK.

### Introducing the SDK
```
<!-- Payment SDK path -->
<dependency>
    <groupId>cn.bootx.platform</groupId>
    <artifactId>daxpay-single-sdk</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### Call code

```
package cn.bootx.platform.daxpay.sdk;

import cn.bootx.platform.daxpay.sdk.code.PayChannelEnum;
import cn.bootx.platform.daxpay.sdk.code.PayWayEnum;
import cn.bootx.platform.daxpay.sdk.model.PayOrderModel;
import cn.bootx.platform.daxpay.sdk.net.DaxPayConfig;
import cn.bootx.platform.daxpay.sdk.net.DaxPayKit;
import cn.bootx.platform.daxpay.sdk.param.pay.SimplePayParam;
import cn.bootx.platform.daxpay.sdk.response.DaxPayResult;
import org.junit.Before;
import org.junit.Test;

/**
 * 简单支付
 * @author xxm
 * @since 2024/2/2
 */
public class SimplePayOrderTest {

    @Before
    public void init() {
        // 初始化支付配置
        DaxPayConfig config = DaxPayConfig.builder()
                .serviceUrl("http://127.0.0.1:9000")
                // 需要跟网关中配置一致
                .signSecret("123456")
                .build();
        DaxPayKit.initConfig(config);
    }

    @Test
    public void simplePay() {
        // 简单支付参数
        SimplePayParam param = new SimplePayParam();
        param.setBusinessNo("P0001");
        param.setAmount(1);
        param.setTitle("测试支付宝支付");
        // 支付宝扫码支付
        param.setChannel(PayChannelEnum.ALI.getCode());
        param.setPayWay(PayWayEnum.QRCODE.getCode());

        // 如果切换为微信扫码支付, 只需要更改一下通道编码参数即可,
        // param.setChannel(PayChannelEnum.ALI.getCode());

        DaxPayResult<PayOrderModel> execute = DaxPayKit.execute(param, true);
        PayOrderModel data = execute.getData();
        // 打印用于扫码使用的
        System.out.println(data.getPayBody());
    }
}
```

## Project and Demo Address

### Source code address

| 项目 | GITEE | GITHUB |
| --- | --- | --- |
| 后端地址 | https://gitee.com/dromara/dax-pay | https://github.com/dromara/dax-pay |
| Web前端地址 | https://gitee.com/bootx/dax-pay-ui | https://github.com/xxm1995/dax-pay-ui |
| H5前端地址 | https://gitee.com/bootx/dax-pay-h5 | https://github.com/xxm1995/dax-pay-h5 |

### Management Platform:

> note: the permission to modify and delete some functions of the demo account is not open.

Address: https://daxpay.demo.bootx.cn account number: daxpay password: 123456

### Gateway Interface

> Note: The interface platform only opens the interfaces related to the payment gateway, and does not open other interfaces of the system.

Address: https://daxpay.server.bootx.cn/doc.html account number: daxpay password: 123456

  

![](/assets/img/news/Dromara-DaxPay-0.png)

  

### Cashier

> Do not pay large amounts, you can refund through the background management platform

Computer cashier address: https://daxpay.demo.bootx.cn/#/cashier

Mobile Cashier Address: https://daxpay.demo.bootx.cn/h5/#/cashier/uniCashier

  

![](/assets/img/news/Dromara-DaxPay-1.png)

  

  

## Communication

A person's ability is always limited, very welcome everyone to communicate and grow together!!!

QQ group number: 939414255

![](/assets/img/news/Dromara-DaxPay-2.png)

  

  

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/Dromara-DaxPay-3.png)