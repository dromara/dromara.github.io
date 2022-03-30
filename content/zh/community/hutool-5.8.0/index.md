---
title: "Hutool-5.8.0.M1 发布，尝试里程碑发布"
author: "hutool"
description: "Hutool是一个小而全的Java工具类库，提供优雅、高效和便捷的工具方法"
categories: "hutool"
tags: ["hutool"]
date: 2022-03-30
cover: "/img/architecture/hutool-framework.png"
---

> Hutool是一个小而全的Java工具类库，提供优雅、高效和便捷的工具方法。  

## Hutool是什么   
![架构全景图](/img/architecture/hutool-framework.png)   

本来这个版本应该是5.7.23的，可惜用户提了一些issue，这些问题的解决必须修改原有代码结构：  

1. 如MongoDB客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。
2. 涉及到Bean拷贝的代码部分（BeanCopier），由于一个参数失效，以为只是简单的一个bug，后来发现是整个设计有问题……崩溃程度可想而知，肝了两个晚上重构了这部分代码。
3. 修改代码的同时才发现还有很多部分的设计有问题，顺便做了小重构。
4. 为了解决每次大版本升级的可能带来的对老用户的影响，此次版本采用里程碑方式发布，版本为M1（感觉给用户送了颗CPU），也是解决Hutool每次“激进”升级的问题（毕竟年龄大了，要稳重）
5. 希望购买代替捐赠，如果你希望支持下Hutool，可以去Hutool主页点->击进入周边商店购买Hutool周边来支持Hutool哦，这比捐赠实惠的多（毕竟捐赠者我不知道如何道谢，很有道德负担……）

鸣谢一下此次版本一起讨论和一起解决大量issue的Hutool几位成员：   
@阿超 @Cherryrum @Husky
------------------------------------------------------------------------------------------

## 5.8.0.M1

### ❌不兼容特性  

• 【db 】 【不向下兼容 】增加MongoDB4.x支持返回MongoClient变更（pr#568@Gitee）  
• 【json 】 【可能兼容问题】修改JSONObject结构，继承自MapWrapper  
• 【core 】 【可能兼容问题】BeanCopier重构，新建XXXCopier，删除XXXValueProvider    
• 【core 】 【可能兼容问题】URLEncoder废弃，URLEncoderUtil使用RFC3986  
• 【core 】 【可能兼容问题】Base32分离编码和解码，以便减少数据加载，支持Hex模式  
• 【core 】 【可能兼容问题】Base58分离编码和解码  
• 【core 】 【可能兼容问题】Base62分离编码和解码，增加inverted模式支持  
• 【core 】 【兼容问题 】PunyCode参数由String改为Charsequence  
• 【cron 】 【可能兼容问题】SimpleValueParser改名为AbsValueParser，改为abstract  
• 【poi 】 【可能兼容问题】ExcelUtil.getBigWriter返回值改为BigExcelWriter  
• 【core 】 【可能兼容问题】Opt.ofEmptyAble参数由List改为Collection子类（pr#580@Gitee）  
• 【json 】 【可能兼容问题】JSON转Bean时，使用JSON本身的相关设置，而非默认（issue#2212@Github）  
• 【json 】 【可能兼容问题】JSONConfig中isOrder废弃，默认全部有序  


### 🐣新特性   

• 【http 】 HttpRequest.form采用TableMap方式（issue#I4W427@Gitee）  
• 【core 】 AnnotationUtil增加getAnnotationAlias方法（pr#554@Gitee）  
• 【core 】 FileUtil.extName增加对tar.gz特殊处理（issue#I4W5FS@Gitee）  
• 【crypto 】 增加XXTEA实现（issue#I4WH2X@Gitee）  
• 【core 】 增加Table实现（issue#2179@Github）  
• 【core 】 增加UniqueKeySet（issue#I4WUWR@Gitee）  
• 【core 】 阿拉伯数字转换成中文对发票票面金额转换的扩展（pr#570@Gitee）  
• 【core 】 ArrayUtil增加replace方法（pr#570@Gitee）  
• 【core 】 CsvReadConfig增加自定义标题行行号（issue#2180@Github）  
• 【core 】 FileAppender优化初始List大小（pr#2197@Github）  
• 【core 】 Base32增加pad支持（pr#2195@Github）  
• 【core 】 Dict增加setFields方法（pr#578@Gitee）  
• 【db 】 新加db.meta的索引相关接口（pr#563@Gitee）  
• 【db 】 Oracle中Column#typeName后的长度去掉（pr#563@Gitee）  
• 【poi 】 优化ExcelReader，采用只读模式（pr#2204@Gitee）  
• 【poi 】 优化ExcelBase，将alias放入  
• 【poi 】 优化ExcelBase，将alias放入  
• 【core 】 改进StrUtil#startWith、endWith性能  
• 【cron 】 增加CronPatternParser、MatcherTable   
• 【http 】 GlobalHeaders增加系统属性allowUnsafeServerCertChange、allowUnsafeRenegotiation  
• 【http 】 UserAgentUtil 解析，增加MiUI/XiaoMi浏览器判断逻辑（pr#581@Gitee）  
• 【core 】 FileAppender添加锁构造（pr#2211@Github）  
• 【poi 】 ExcelReader增加构造（pr#2213@Github）  
• 【core 】 MapUtil提供change函数，EnumUtil提供getBy函数，通过lambda进行枚举字段映射（pr#583@Gitee）  
• 【core 】 CompareUtil增加comparingIndexed（pr#585@Gitee）  
• 【db 】 DruidDataSource构建时支持自定义参数（issue#I4ZKCW@Gitee）  
• 【poi 】 ExcelWriter增加addImg重载（issue#2218@Github）  
• 【bloomFilter】 增加FuncFilter  
• 【http 】 增加GlobalInterceptor（issue#2217）  

### 🐞Bug修复

• 【core 】 修复ObjectUtil.hasNull传入null返回true的问题（pr#555@Gitee）  
• 【core 】 修复NumberConverter对数字转换的问题（issue#I4WPF4@Gitee）  
• 【core 】 修复ReflectUtil.getMethods获取接口方法问题（issue#I4WUWR@Gitee）  
• 【core 】 修复NamingCase中大写转换问题（pr#572@Gitee）  
• 【http 】 修复GET重定向时，携带参数问题（issue#2189@Github）  
• 【core 】 修复FileUtil、FileCopier相对路径获取父路径错误问题（pr#2188@Github）  
• 【core 】 修复CopyOptions中fieldNameEditor无效问题（issue#2202@Github）  
• 【json 】 修复JSON对Map.Entry的解析问题  
• 【core 】 修复MapConverter中map与map转换兼容问题  
• 【poi 】 解决sax读取时，POI-5.2.x兼容性问题  
• 【core 】 修复判断两段时间区间交集问题（pr#2210@Github）  
• 【http 】 修复标签误删问题（issue#I4Z7BV@Gitee）  
• 【core 】 修复Win下文件名带*问题（pr#584@Gitee）  
• 【core 】 FileUtil.getMimeType增加rar、7z支持（issue#I4ZBN0@Gitee）  
• 【json 】 JSON修复transient设置无效问题（issue#2212@Github）  
• 【core 】 修复IterUtil.getElementType获取结果为null的问题（issue#2222@Github）  
• 【core 】 修复农历转公历在闰月时错误（issue#I4ZSGJ@Gitee）  


## 社区共建

我们秉承`和谐快乐`，`代码至上` 的原则，如果你有想法，愿意和我们一起成长，一起贡献，快来加入我们吧！

- github：https://github.com/dromara/hutool     
- gitee：https://gitee.com/dromara/hutool    
