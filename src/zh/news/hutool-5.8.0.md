---
title: Hutool-5.8.0.M1 发布，尝试里程碑发布
author: hutool
tag:
  - hutool
date: 2022-03-30
cover: /assets/img/architecture/hutool-framework.png
head:
  - - meta
    - name: 新闻
---

> Hutool 是一个小而全的 Java 工具类库，提供优雅、高效和便捷的工具方法。

## Hutool 是什么

![架构全景图](/assets/img/architecture/hutool-framework.png)

本来这个版本应该是 5.7.23 的，可惜用户提了一些 issue，这些问题的解决必须修改原有代码结构：

1. 如 MongoDB 客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。
2. 涉及到 Bean 拷贝的代码部分（BeanCopier），由于一个参数失效，以为只是简单的一个 bug，后来发现是整个设计有问题……崩溃程度可想而知，肝了两个晚上重构了这部分代码。
3. 修改代码的同时才发现还有很多部分的设计有问题，顺便做了小重构。
4. 为了解决每次大版本升级的可能带来的对老用户的影响，此次版本采用里程碑方式发布，版本为 M1（感觉给用户送了颗 CPU），也是解决 Hutool 每次“激进”升级的问题（毕竟年龄大了，要稳重）
5. 希望购买代替捐赠，如果你希望支持下 Hutool，可以去 Hutool 主页点->击进入周边商店购买 Hutool 周边来支持 Hutool 哦，这比捐赠实惠的多（毕竟捐赠者我不知道如何道谢，很有道德负担……）

鸣谢一下此次版本一起讨论和一起解决大量 issue 的 Hutool 几位成员：  
@阿超 @Cherryrum @Husky

---

## 5.8.0.M1

### ❌ 不兼容特性

• 【db 】 【不向下兼容 】增加 MongoDB4.x 支持返回 MongoClient 变更（pr#568@Gitee）  
• 【json 】 【可能兼容问题】修改 JSONObject 结构，继承自 MapWrapper  
• 【core 】 【可能兼容问题】BeanCopier 重构，新建 XXXCopier，删除 XXXValueProvider  
• 【core 】 【可能兼容问题】URLEncoder 废弃，URLEncoderUtil 使用 RFC3986  
• 【core 】 【可能兼容问题】Base32 分离编码和解码，以便减少数据加载，支持 Hex 模式  
• 【core 】 【可能兼容问题】Base58 分离编码和解码  
• 【core 】 【可能兼容问题】Base62 分离编码和解码，增加 inverted 模式支持  
• 【core 】 【兼容问题 】PunyCode 参数由 String 改为 Charsequence  
• 【cron 】 【可能兼容问题】SimpleValueParser 改名为 AbsValueParser，改为 abstract  
• 【poi 】 【可能兼容问题】ExcelUtil.getBigWriter 返回值改为 BigExcelWriter  
• 【core 】 【可能兼容问题】Opt.ofEmptyAble 参数由 List 改为 Collection 子类（pr#580@Gitee）  
• 【json 】 【可能兼容问题】JSON 转 Bean 时，使用 JSON 本身的相关设置，而非默认（issue#2212@Github）  
• 【json 】 【可能兼容问题】JSONConfig 中 isOrder 废弃，默认全部有序

### 🐣 新特性

• 【http 】 HttpRequest.form 采用 TableMap 方式（issue#I4W427@Gitee）  
• 【core 】 AnnotationUtil 增加 getAnnotationAlias 方法（pr#554@Gitee）  
• 【core 】 FileUtil.extName 增加对 tar.gz 特殊处理（issue#I4W5FS@Gitee）  
• 【crypto 】 增加 XXTEA 实现（issue#I4WH2X@Gitee）  
• 【core 】 增加 Table 实现（issue#2179@Github）  
• 【core 】 增加 UniqueKeySet（issue#I4WUWR@Gitee）  
• 【core 】 阿拉伯数字转换成中文对发票票面金额转换的扩展（pr#570@Gitee）  
• 【core 】 ArrayUtil 增加 replace 方法（pr#570@Gitee）  
• 【core 】 CsvReadConfig 增加自定义标题行行号（issue#2180@Github）  
• 【core 】 FileAppender 优化初始 List 大小（pr#2197@Github）  
• 【core 】 Base32 增加 pad 支持（pr#2195@Github）  
• 【core 】 Dict 增加 setFields 方法（pr#578@Gitee）  
• 【db 】 新加 db.meta 的索引相关接口（pr#563@Gitee）  
• 【db 】 Oracle 中 Column#typeName 后的长度去掉（pr#563@Gitee）  
• 【poi 】 优化 ExcelReader，采用只读模式（pr#2204@Gitee）  
• 【poi 】 优化 ExcelBase，将 alias 放入  
• 【poi 】 优化 ExcelBase，将 alias 放入  
• 【core 】 改进 StrUtil#startWith、endWith 性能  
• 【cron 】 增加 CronPatternParser、MatcherTable  
• 【http 】 GlobalHeaders 增加系统属性 allowUnsafeServerCertChange、allowUnsafeRenegotiation  
• 【http 】 UserAgentUtil 解析，增加 MiUI/XiaoMi 浏览器判断逻辑（pr#581@Gitee）  
• 【core 】 FileAppender 添加锁构造（pr#2211@Github）  
• 【poi 】 ExcelReader 增加构造（pr#2213@Github）  
• 【core 】 MapUtil 提供 change 函数，EnumUtil 提供 getBy 函数，通过 lambda 进行枚举字段映射（pr#583@Gitee）  
• 【core 】 CompareUtil 增加 comparingIndexed（pr#585@Gitee）  
• 【db 】 DruidDataSource 构建时支持自定义参数（issue#I4ZKCW@Gitee）  
• 【poi 】 ExcelWriter 增加 addImg 重载（issue#2218@Github）  
• 【bloomFilter】 增加 FuncFilter  
• 【http 】 增加 GlobalInterceptor（issue#2217）

### 🐞Bug 修复

• 【core 】 修复 ObjectUtil.hasNull 传入 null 返回 true 的问题（pr#555@Gitee）  
• 【core 】 修复 NumberConverter 对数字转换的问题（issue#I4WPF4@Gitee）  
• 【core 】 修复 ReflectUtil.getMethods 获取接口方法问题（issue#I4WUWR@Gitee）  
• 【core 】 修复 NamingCase 中大写转换问题（pr#572@Gitee）  
• 【http 】 修复 GET 重定向时，携带参数问题（issue#2189@Github）  
• 【core 】 修复 FileUtil、FileCopier 相对路径获取父路径错误问题（pr#2188@Github）  
• 【core 】 修复 CopyOptions 中 fieldNameEditor 无效问题（issue#2202@Github）  
• 【json 】 修复 JSON 对 Map.Entry 的解析问题  
• 【core 】 修复 MapConverter 中 map 与 map 转换兼容问题  
• 【poi 】 解决 sax 读取时，POI-5.2.x 兼容性问题  
• 【core 】 修复判断两段时间区间交集问题（pr#2210@Github）  
• 【http 】 修复标签误删问题（issue#I4Z7BV@Gitee）  
• 【core 】 修复 Win 下文件名带\*问题（pr#584@Gitee）  
• 【core 】 FileUtil.getMimeType 增加 rar、7z 支持（issue#I4ZBN0@Gitee）  
• 【json 】 JSON 修复 transient 设置无效问题（issue#2212@Github）  
• 【core 】 修复 IterUtil.getElementType 获取结果为 null 的问题（issue#2222@Github）  
• 【core 】 修复农历转公历在闰月时错误（issue#I4ZSGJ@Gitee）

## 社区共建

我们秉承`和谐快乐`，`代码至上` 的原则，如果你有想法，愿意和我们一起成长，一起贡献，快来加入我们吧！

- github：https://github.com/dromara/hutool
- gitee：https://gitee.com/dromara/hutool
