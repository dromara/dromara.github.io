---
title: sms4j 2.0 全新来袭
author: SMS-风
tag:
  - sms4j
date: 2023-04-17
cover: /assets/img/news/sms4j-cover.png
head:
  - - meta
    - name: 新闻
---

## sms4j 2.0 全新来袭

即 sms-aggregation 成功加入 dromara 之后，很多人向我们反应了项目名称太长不好记，也太绕口， 在经过了有奖名称征集之后，我们定名为 sms4j 并伴随着大版本更新一同发布。这次更新不仅仅改变了项目名称，启用了新的 logo，还调整了项目结构，加入了更多新特性，下面我们一起来简单的看一下吧！

![](/assets/img/news/sms4j-cover.png)

## 首先是 maven 的变化

老版本中，groupId 为作者的个人网站，同时也是项目的官网，在新的版本中统一改为了 Dromara 的地址

```
<dependency>
     <groupId>org.dromara.sms4j</groupId>
     <artifactId>sms4j-spring-boot-starter</artifactId>
     <version> 最新版本请查看gitee或官网 </version>
 </dependency>
```

## 其次是功能的调整

在 1.X 版本中，（前名称 sms-aggregatio）只支持单家运营商的使用，不能同时使用多家厂商，对于厂商的切换也只能依靠配置文件的改变，可以说是功能及其单一，但是在新版本中，添加了多厂商支持和并用，同时配置方式也发生了变化

```
sms:
    alibaba:
      #阿里云的accessKey
      accessKeyId: 您的accessKey
      #阿里云的accessKeySecret
      accessKeySecret: 您的accessKeySecret
      #短信签名
      signature: 测试签名
      #模板ID 用于发送固定模板短信使用
      templateId: SMS_215125134
      #模板变量 上述模板的变量
      templateName: code
      #请求地址 默认为dysmsapi.aliyuncs.com 如无特殊改变可以不用设置
      requestUrl: dysmsapi.aliyuncs.com
    huawei:
      #华为短信appKey
      appKey: 5N6fvXXXX920HaWhVXXXXXX7fYa
      #华为短信appSecret
      app-secret: Wujt7EYzZTBXXXXXXEhSP6XXXX
      #短信签名
      signature: 华为短信测试
      #通道号
      sender: 8823040504797
      #模板ID 如果使用自定义模板发送方法可不设定
      template-id: acXXXXXXXXc274b2a8263479b954c1ab5
      #华为回调地址，如不需要可不设置或为空
      statusCallBack:
       #华为分配的app请求地址
      url: https://XXXXX.cn-north-4.XXXXXXXX.com:443
```

```
@RestController
@RequestMapping("/test/")
public class DemoController {

   // 测试发送固定模板短信
   @RequestMapping("/")
   public void doLogin(String username, String password) {
        //阿里云向此手机号发送短信
       SmsFactory.createSmsBlend(SupplierType.ALIBABA).sendMessage("18888888888","123456");
       //华为短信向此手机号发送短信
       SmsFactory.createSmsBlend(SupplierType.HUAWEI).sendMessage("16666666666","000000");
   }
}
```

在以上仅仅只是示例，在实际的实用中可以同时支持更多的厂商。

## 其他的方面

sms4j 还添加了数据库配置的支持，开发者可以通过在数据库添加配置来替代配置文件，做到动态切换厂商

```
sms:
  # 告诉框架要读取的厂商配置来源，此处为枚举形式
  config-type: sql_config
  sql:
    # JDBC驱动
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 要链接的数据库名称
    database-name: dev
    # 连接字符串
    url: jdbc:mysql://localhost:3306
    # 数据库账号
    username: root
    # 数据库密码
    password: 123456
    # 配置所在表名
    table-name: config_info
    # 厂商名称存储字段
    supplier-field-name: user_name
    # 配置所在字段
    config-name: pay_psw
    # 配置启用标识字段
    start-name: state
    # 配置启用值  此处意思为 当字段state值为1时，则启用这个配置
    is-start: 1
```

更多的新特性和功能不在这里一 一介绍了，具体的可以查看官方文档或者 gitee 仓库

**官方文档** **https://wind.kim/**

**gitee 仓库** **https://gitee.com/dromara/sms4j**

**您的支持是我们前进的动力，如果我们的项目对您产生了帮助或者您觉得还不错，请为我们点上一颗 star**
