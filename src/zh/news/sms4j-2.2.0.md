---
title: 这年头，坐上火箭的不光神州，还有sms4j的版本
author: sms4j
tag:
  - sms4j
date: 2023-06-21
cover: /assets/img/news/sms4j-cover.png
head:
  - - meta
    - name: 新闻
---

## sms4j 2.2.0 版本正式发布

在拖延了 NNNNNN 多久之后，sms4j 的 2.2.0 版本终于发布了！不过嘛，作为一个有良心的作者，怎么能让大家白等呢！

这次又是给大家带来了诸多的干货！

### 新特性

1.  JAVA SE 适配正式支持
2.  网易云短信接入
3.  redis 支持接口化处理
4.  插件能力发布

    ### BUG 修复

5.  阿里云短信发送会不定期报错
6.  数据库配置下不填写数据库名称会报错的问题
7.  去除多余的注解，该注解曾导致项目的 spring 线程池失效
8.  修复腾讯云 json 解析问题
9.  修复 sql 配置方式 json 解析问题

### 优化

返回信息优化

### JAVA SE 适配

在发部了这么多版本之后，承诺过的 java se 适配终于添加了，现在 java se 项目可以直接进行使用了

##### maven 依赖

```
<dependency>
        <groupId>org.dromara.sms4j</groupId>
        <artifactId>sms4j-javase-plugin</artifactId>
        <version> version </version>
</dependency>
```

##### 配置文件

```
sms:
  alibaba:
    access-key-id: 您的accessKey
    access-key-secret: 您的accessKeySecret
    template-id: 您的templateId
    template-name: 您的templateName
    signature: 您的短信签名
# 其他配置……
```

##### 读取配置

```
SEInitializer.initializer().fromYaml();
```

##### 发送短信

```
SmsFactory.createSmsBlend(SupplierType.ALIBABA).sendMessage("手机号码", "短信");
```

原生 SE 使用支持多种的配置，其他的使用方法请参考 官方文档

### 网易云短信接入

在仓库的 issues 中，我们收到了很多的厂商接入建议，我们也在逐步的从中选取厂商进行接入（会优先接入新用户量相对较大的），本次网易云短信来自贡献者 \*\*阿丢丢 \*\* ,在这里感谢大家对于我们的支持，也欢迎大家参与到我们之中

### redis 支持接口化处理

sms4j 自带的短信拦截功能中，依赖于缓存，虽说内部实现了一个缓存，但是没有持久化的能力，略显不足，故而用户可以自己选择使用 redis 作为缓存，在先前的版本中默认的适用了 springboot 集成的 redis 进行连接，但是部分用户反馈他们并没有使用这个。所以，我们拓展了 redis 的能力，你可以自己实现一个接口，然后替代内部的 redis 实现，从而使用自己的方式进行缓存。

使用方式：

实现位于`org.dromara.sms4j.api.universal`的接口`RedisUtil`,并实现两个方法

设置带有缓存时间的 key，三个参数分别为  redis key   redis value   过期时间 time

过期时间的单位为秒

`boolean setOrTime(String key, Object value, Long time)`

获取 key

`Object getByKey(String key)`

当用户实现了该接口，并启用了 redis 作为 sms4j 拦截缓存后，框架内部的缓存实现将被替代，从而使用用户自己的 redis

### 插件能力发布

曾经有一吨人（体重加起来不少于 1 吨）问过我，sms4j 是否会支持其他的通知，比如企业微信，钉钉，飞书，邮件等等。其实刚开始并没有这方面的规划…………

但是既然这么多人都问了，肯定是需求不少了  
本着 为天地立心，为生民立命，为往圣继绝学，为万世开太平 的伟大理想！（就是为了 star 和赞助）  
现在开始逐步接入，sms4j 项目本体主旨不变，其他只作为额外的能力，通过额外 maven 依赖进行引入使用。  
当然，贡献组成员的时间精力都很有限的，如果你有时间或者有兴趣的话可以联系我或者直接提交 pr ，参与 到我们之中，原则上我们欢迎任何贡献者参与到我们！  
至于我为啥不单独立仓库，别问，问就是懒！  
重新立仓库我需要重新搞个子域名，重新建立个仓库，重新攒 star，重新起名，重新设计 logo………………  
拉个摊子太烦了，所以干脆都放这了，就当是 sms4j 的插件吧

#### 现有插件

- sms4j-mail 邮件发送插件
- 敬请期待…………

通知类是一个大类别，不是一朝一夕可完善完成的事情，我们需要做的还有很多。路漫漫其修远兮

我们真心的邀请大家参与到我们之中，跟我们一起成长，一起为往圣继绝学！

## 结语

最后还请大家给个 star 支持一下，无论是 gitee 或者是 github，我们都将十分感谢

gitee  https://gitee.com/dromara/sms4j

github  https://github.com/dromara/sms4j

官方文档   https://wind.kim
