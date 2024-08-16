---
title: 欢迎新晋开源支付网关，Dromara DaxPay
author: 喵呀
date: 2024-02-26
cover: /assets/img/news/Dromara-DaxPay-0.png
head:
  - - meta
    - name: 新闻
---
      
## 作者介绍

*   名称：喵呀
    
*   dromara 开源组织成员，dromara/dax-pay 作者
    
*   支付行业新兵，Java高级开发工程师，开发、设计、运维多面手
    
*   一枚新济南人，热爱逛各地的博物馆，热爱追寻各种历史古迹
    
*   个人空间：https://gitee.com/GIotEE
    

## 背景

在平时对接三方支付时，尤其需要对接多家支付的时候，是不是有以下痛点：

> 1.  各家支付系统的调用方式、返回参数、数据签名、回调格式等都不尽相同，对接时互相之间无法复用
>     
> 2.  各家支付系统提供的支付能力不尽相同，有时候业务系统为了对客户展现的功能一致，需要写大量的适配代码才能实现
>     
> 3.  支付订单、退款订单、回调记录、订单关闭、对账分账等必要功能都需要进行实现，需要考虑各种场景才能保证不出问题
>     
> 4.  有时候业务上需要支持一些扩展的支付类型，如要支持钱包支付、支持多种支付方式进行组合支付、支持聚合支付实现一码通扫等
>     

如果你遇到这些问题，**Dromara  DaxPay**（开源支付网关）或许能帮助到你：

它是`Dromara开源社区`旗下新晋的一款开源支付网关系统，将各种支付通道（如支付宝、微信、云闪付等）的调用方式进行抽象统一，隐藏开发者不需要关注的细节，只需要一份代码就可以与多家支付通道对接。`DaxPay`独立部署，提供独立的管理界面，不侵入业务系统也不需要业务系统进行改造，只需要通过`http`进行调用就拥有相应的支付能力。除了对各类三方支付系统进行了对接，还对常用的支付方式进行了扩展，支持聚合支付、组合支付、钱包支付等功能。

## 系统亮点

*   基于`Spring Boot`、`Vue3`主流技术栈，方便对系统进行扩展和改造
    
*   已对接`微信支付`和`支付宝`支付的接口，后续版本将支持`V3`版本支付接口，以及`云闪付`、`PayPal`等更多类型的支付通道
    
*   对接各类支付通道对外提供统一的接口，简化支付对接的复杂度，也方便后期快速替换或增加新的支付通道
    
*   提供`钱包支付`、`现金支付`、`储值卡支付`等扩展支付方式，同时支持组合支付，满足业务系统多样的支付场景
    
*   提供`Java`版本的`SDK`工具包，简化业务系统对接流程，同时也可以使用`HTTP`方式进行接口调用，保证了更低的耦合性和通用性
    
*   请求、响应、回调数据都支持启用签名机制，可根据实际需要进行开关，保证交易的安全可靠
    
*   提供管理平台，可以对各类订单、记录、配置进行便捷的操作，方便运营人员进行支付业务的管理
    
*   提供`聚合支付`、`电脑收银台`和`手机收银台`的演示模块，供开发者参考其实现支付功能的逻辑
    
*   系统源码为商业友好的`Apache-2.0`协议，文档为更加宽松的`MIT`协议，不需要担心后续代码和文档会突然进行收费
    

## 使用说明

> 此处以使用SKD对接简单支付接口为例，演示业务系统如何通过SDK快速接入到支付网关中

### 引入SDK

```
<!-- 支付SDK路径 -->
<dependency>
    <groupId>cn.bootx.platform</groupId>
    <artifactId>daxpay-single-sdk</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 调用代码

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

## 项目和演示地址

### 源码地址

| 项目 | GITEE | GITHUB |
| --- | --- | --- |
| 后端地址 | https://gitee.com/dromara/dax-pay | https://github.com/dromara/dax-pay |
| Web前端地址 | https://gitee.com/bootx/dax-pay-ui | https://github.com/xxm1995/dax-pay-ui |
| H5前端地址 | https://gitee.com/bootx/dax-pay-h5 | https://github.com/xxm1995/dax-pay-h5 |

### 管理平台:

> 注：演示账号部分功能修改删除权限未开放。

地址：https://daxpay.demo.bootx.cn 账号：daxpay 密码：123456

### 网关接口

> 注：接口平台只开放支付网关相关的接口，不开放系统其他接口。

地址: https://daxpay.server.bootx.cn/doc.html 账号: daxpay 密码: 123456

  

![](/assets/img/news/Dromara-DaxPay-0.jpg)

  

### 收银台

> 请勿大额支付，可以通过后台管理平台进行退款

电脑收银台地址: https://daxpay.demo.bootx.cn/#/cashier

手机收银台地址: https://daxpay.demo.bootx.cn/h5/#/cashier/uniCashier

  

![](/assets/img/news/Dromara-DaxPay-1.jpg)

  

  

## 沟通交流

一个人的能力总是有限的，非常欢迎大家能够一起来交流，一起成长！！！

QQ群号: 939414255

![](/assets/img/news/Dromara-DaxPay-2.jpg)

  

  

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/news/DromaraDaxPay-3.png)