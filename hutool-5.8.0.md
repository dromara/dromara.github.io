---
title: Hutool-5.8.0.M1 released, attempting milestone release
author: hutool
tag:
  - hutool
date: 2022-03-30
cover: /assets/img/architecture/hutool-framework.png
head:
  - - meta
    - name: News
---

> Hutool is a small but complete Java utility class library that provides elegant, efficient and convenient tool methods.

## What is Hutool

! [architecture panorama] (/ assets/img/architecture/hutool - framework. PNG)

Originally, this version should have been 5.7.23, but the user raised some issues, which must be resolved by modifying the original code structure:

1. For example, when the MongoDB client is packaged, the packaged tool class has to be modified due to incompatible modifications to its driver.
2. The part of the code involved in Bean copy (BeanCopier), due to a parameter failure, thought it was just a simple bug, and later found that there was a problem with the whole design... You can imagine the extent of the crash, liver spent two nights refactoring this part of the code.
3. When I modified the code, I found that there were many design problems in many parts, and I made small refactoring by the way.
4. In order to solve the possible impact of each major version upgrade on old users, this version is released in a milestone way, the version is M1 (feel to send a CPU to the user), and it is also to solve the problem of each "radical" upgrade of Hutool (after all, old age, to be stable).
5. Purchase instead of donation, if you want to support Hutool, you can go to the Hutool home page and click -> click into the surrounding stores to buy Hutool peripheral to support Hutool. Oh, this is more affordable than donation (after all, I do not know how to thank the donor, it is a moral burden...)

Thank you to the Hutool members who discussed and solved a lot of issues together in this release:
@阿超 @Cherryrum @Husky

---

## 5.8.0.M1

### ❌ Incompatible feature

• 【db 】 【 Not backward compatible 】 Added MongoDB4.x support Return MongoClient change (pr#568@Gitee)
• 【json】【Possible compatibility issues】 Modify JSONObject structure, inherited from MapWrapper
• 【core】【Possible compatibility issues】 Rebuild BeanCopier, create XXXCopier, and delete XXXValueProvider
• 【core】【Possible compatibility issues】URLEncoder is deprecated, URLEncoderUtil uses RFC3986
• 【core】【Possible compatibility issues】 Base32 separate encoding and decoding in order to reduce data load, support Hex mode
• 【core】【Possible compatibility issues】 Base58 separate encoding and decoding
• 【core】【Possible compatibility issues】 Base62 separate encoding and decoding, added inverted mode support
• 【core】【compatibility issues】 PunyCode parameter changed from String to Charsequence
• 【cron 】 【 Possible compatibility issues 】SimpleValueParser was renamed AbsValueParser and changed to abstract
• 【poi 】 【 Possible compatibility problem 】ExcelUtil.getBigWriter Change the return value to BigExcelWriter
• 【core】【Possible compatibility issues】 Opt.ofEmptyAble argument changed from List to Collection subclass (pr#580@Gitee)
• 【json】【Possible compatibility issues】 When converting JSON to Bean, use JSON's own Settings instead of the default (issue#2212@Github)
• 【json】【Possible compatibility issues】isOrder is discarded in JSONConfig, and is all ordered by default

### 🐣 New features

• 【http 】 HttpRequest.form is in TableMap mode (issue#I4W427@Gitee)
• 【core 】 AnnotationUtil adds getAnnotationAlias (pr#554@Gitee)
• 【core 】 FileUtil.extName added special handling for tar.gz (issue#I4W5FS@Gitee)  
• 【crypto 】 Add XXTEA implementation (issue#I4WH2X@Gitee)
• 【core 】 Add Table implementation (issue#2179@Github)
• 【core 】 Add UniqueKeySet (issue#I4WUWR@Gitee)
• 【core 】 Extension of conversion from Arabic numerals to Chinese to par value of invoice (pr#570@Gitee)
• [core] ArrayUtil adds replace method (pr#570@Gitee)
• 【core 】 CsvReadConfig Add the custom title line number (issue#2180@Github)
• 【core 】 FileAppender Optimizes initial List size (pr#2197@Github)
• 【core 】 Base32 adds pad support (pr#2195@Github)  
• 【core 】 Adds setFields methods to Dict (pr#578@Gitee)
• 【db 】 New index related interface to db.meta (pr#563@Gitee)
• 【db 】 The length of Column#typeName is removed from the column of Oracle (pr#563@Gitee).
• 【poi 】 Optimize ExcelReader for read-only mode (pr#2204@Gitee)
• 【poi 】 Optimizes ExcelBase and puts alias in  
• 【core 】 Improved StrUtil#startWith and endWith performance
• 【cron 】 Add CronPatternParser and MatcherTable  
• 【http 】 GlobalHeaders add system attributes allowUnsafeServerCertChange、allowUnsafeRenegotiation  
• 【http 】 UserAgentUtil parsing, add MiUI/XiaoMi browser judgment logic (pr#581@Gitee)
• 【core 】 FileAppender Add lock structure (pr#2211@Github)
• 【poi 】 ExcelReader added construction (pr#2213@Github)
• 【core 】 MapUtil provides change function, EnumUtil provides getBy function, enumeration field mapping through lambda (pr#583@Gitee)
• 【core 】 CompareUtil adds comparingIndexed (pr#585@Gitee).
• 【db 】 DruidDataSource build with custom parameters (issue#I4ZKCW@Gitee)
• 【poi 】 ExcelWriter adds addImg overload (issue#2218@Github)  
• 【bloomFilter】 Added FuncFilter
• 【http 】 Added GlobalInterceptor（issue#2217）

### 🐞Bug fixed

• 【core 】 Fix ObjectUtil.hasNull passing null returns true (pr#555@Gitee)
• 【core 】 Fix NumberConverter number conversion issue (issue#I4WPF4@Gitee)
• 【core 】 Fixing problems with ReflectUtil.getMethods Obtaining interface methods (issue#I4WUWR@Gitee)
• 【core 】 Fix uppercase conversion issue in NamingCase (pr#572@Gitee)
• 【http 】 Fix to GET parameter carrying issue (issue#2189@Github)  
• 【core 】 Fix the parent path error of FileUtil and FileCopier relative paths (pr#2188@Github)
• 【core 】 Fixed invalid fieldNameEditor in CopyOptions (issue#2202@Github)  
• 【json 】 Fix JSON parsing of Map.Entry  
• 【core 】 Fix MapConverter map and map conversion compatibility issues
• 【poi 】 Solves POI-5.2.x compatibility issues when sax reads
• 【core 】 Fixed the intersection problem of judging two time intervals (pr#2210@Github)
• 【http 】 Fix tag deletion issue (issue#I4Z7BV@Gitee)
• 【core 】 Fix file name with \* in Win (pr#584@Gitee)
• 【core 】 FileUtil.getMimeType added rar and 7z support (issue#I4ZBN0@Gitee)
• 【json 】 JSON fixed invalid transient Settings (issue#2212@Github)
• 【core 】 Fix IterUtil.getElementType getting null (issue#2222@Github)
• 【core 】 Fix lunar calendar to Gregorian calendar in leap month error (issue#I4ZSGJ@Gitee)

## Community co-construction

We uphold the principle of `harmony and happiness`, `code first`, if you have ideas, are willing to grow with us, contribute together, come and join us!

- github:https://github.com/dromara/hutool
- gitee:https://gitee.com/dromara/hutool
