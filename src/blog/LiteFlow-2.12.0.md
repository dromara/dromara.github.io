---
title: Decision routing features hit, LiteFlow release of version 2.12.0, Make your code amaing!
author: Platinum East
date: 2024-04-16
tag:
  - 
cover: /assets/img/blog/LiteFlow-2.12.0-0.png
head:
  - - meta
    - name: Blog
---

![](/assets/img/blog/LiteFlow-2.12.0-0.png)

**LiteFlow is an open source orchestration rule engine that allows you to arrange your system logic arbitrarily, can choose script writing logic, supports up to seven scripting languages, supports rich third-party storage support, and all logic and rules can be hot changed. Design system and refactoring system artifact. * *

LiteFlow is Gitee's high star project. By the time this article was published, Gitee star was close to the 6k mark, while Github had 2.6Kstar.

At the same time, LiteFlow is also an excellent community-driven open source project in China. It has been open source for more than 3 years and has been applied to the core system by major front-line companies. According to incomplete statistics, nearly a thousand domestic companies are using it. The features and support are very good. The community has more than 5000 people. There are nearly 1800 test cases with guaranteed quality.

If you know this project for the first time, you can go to the official website or the relevant homepage to learn about it:

> Project official website:
>>
>> https://liteflow.cc
>>
> gitee managed repository:
>>
>> https://gitee.com/dromara/liteFlow
>>
> github managed repository:
>>
>> https://github.com/dromara/liteflow

Hereinafter, the article LiteFlow is referred to as LF for short.

## Preface

It has been 3 months since the last version, and this time we have brought the super-large version update of v2.12.0. This version was originally intended to be released at the end of March, skipping two votes in the middle, all for the sake of a more stable version. Thank the developers for waiting.

This year, I can clearly feel that there are more and more small partners using LF, the number of people in the community is also rising, and daily consultation is constant. I believe many people are waiting for this version, which brings 19 issue updates, including a lot of major feature updates, as well as stability updates and some bug fixes reflected by the community.

In the past 3 months, my friends and LF team have been working hard for this version, and the new version of official website has also made some changes. The dynamic effect of the home page has been changed and is now more concise. The current moving picture of the background is more in line with the intention of LF's components, and the idea comes from jigsaw puzzle. Thanks to Senyang's design.

![](/assets/img/blog/LiteFlow-2.12.0-1.png)

![](/assets/img/blog/LiteFlow-2.12.0-2.png)

At the same time, v2.12.0 replaced slogan. This version of slogan is: Make your code amazing. We hope that using LF will help developers make their code more smart and amazing.

Next, let's understand what is the highlight of v2.12.0!

## Decision Routing

Decision routing is a version feature of v2.12.0. LF brings a new use of rules, that is, the execution does not specify a specific rule ID, through the decision route EL judgment, to dynamically execute which rules, and the matching and execution process are all parallel. The (route) tag is introduced for this LF:

```
<chain name="chain1">
    <route>
        AND(r1, r2, r3)
    </route>
    <body>
        THEN(a, b, c);
    </body>
</chain>

<chain name="chain2">
    <route>
        AND(OR(r4, r5), NOT(r3))
    </route>
    <body>
        SWITCH(x).TO(d, e, f);
    </body>
</chain>
```

The EL in the decision body can only be used with or non-expressions, and the component can only be used with Boolean expressions. Please refer to the "Decision Routing" in the official website document for details on how to use it '.

## Boolean component

v2.12.0 is not a compatible version, the main reason is the new concept of Boolean components.

In the new version, 'NodeIfComponent','NodeWhileComponent', and 'NodeBreakComponent' are removed 3 a component form, and the boolean component 'NodeBooleanComponent' is unified '. In other words, Boolean components can be used in IF,WHILE,BREAK expressions.

```
@LiteflowComponent("x")
public class ECmp extends NodeBooleanComponent {
    @Override
    public boolean processBoolean() throws Exception {
        // do your biz
        return true;
    }
}
```

If you upgrade the new version, you need to replace the above three components as Boolean components and replace the superclass. This process will not delay you too much time. To this end, we have prepared the '2.12.0 Upgrade Guide', which has a very detailed upgrade guide, which can be found in the official website.

## Allow startup without checking node existence

Many small partners in the community have reflected that the current mandatory startup check node existence has hindered their collaborative development. A global parameter is provided for this LF new version:
```
parse-mode=PARSE_ONE_ON_FIRST_EXEC
```

This 'parse-mode' replaces the previous 'parse-on-start '. This parameter has three values:

| Set value | Meaning |
| --- | --- |
| PARSE\_ALL\_ON\_START | Parse all rules at startup, this is the default value without configuration |
| PARSE\_ALL\_ON\_FIRST\_EXEC | Rules are not parsed at startup, but the first time any rule is executed, all |
| PARSE\_ONE\_ON\_FIRST\_EXEC | Rules are not parsed at startup, but only the corresponding rules are parsed when the relevant rules are executed for the first time. |

For a detailed explanation of this part, please see 'Metadata Management-> Start Do Not Check Rules' in the official website document '.

## Rewritten python scripting engine

LF provides python script support, but this parsing engine has always had some problems. Perhaps there are not many people in the community using python engine, so this problem has not been exposed. Since someone uses it, since there is a problem. Then we need to fix this problem.

To this end, we overturned the previous implementation of the python parsing engine and re-wrote the 1 version to solve the problem that the python script cannot return normally.

## The unity of declarative components

In fact, this feature has been implemented as early as 2.11.4, and is not strictly a new version of the feature. However, due to compatibility, it is not stated in the 2.11.X document.

Before LF classification declaration type and method level declaration type, and the class declaration type in the declaration than the method level declaration type one more '@ LiteflowCmpDefine' annotation, once a small partner said that this is a bit redundant, and a bit fragmented.

Therefore, LF can not use this annotation in the new declaration. Basically, class-level declarative and method-level declarative are unified. If you define a component in a class, that is class-level declarative, and defining multiple components is method-level declarative. Of course, the previous definition is still valid. LF is compatible.

This is the class level declarative:

```
@LiteflowComponent("a")
public class ACmp{
  
    @LiteflowMethod(LiteFlowMethodEnum.PROCESS, nodeType = NodeTypeEnum.COMMON)
    public void processAcmp(NodeComponent bindCmp) {
        System.out.println("ACmp executed!");
    }
}
```

This is a method level declarative：

```
@LiteflowComponent
public class CmpConfig {

    //普通组件的定义
    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS, nodeId = "a", nodeName = "A组件")
    public void processA(NodeComponent bindCmp) {
        ...
    }

    //SWITCH组件的定义
    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS_SWITCH, nodeId = "b", nodeName = "B组件", nodeType = NodeTypeEnum.SWITCH)
    public String processB(NodeComponent bindCmp) {
        ...
    }
    
    //布尔组件的定义
    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS_BOOLEAN, nodeId = "c", nodeName = "C组件", nodeType = NodeTypeEnum.BOOLEAN)
    public boolean processC(NodeComponent bindCmp) {
        ...
    }
}
```

## The context provides the way to get the alias.

I believe everyone knows that the context is obtained through 'this.getContextBean' or'this. getFirstContextBean. However, these acquisition methods are all acquired through class. If two contexts of the same class are passed in, there will be problems.

LF introduced the method of obtaining according to alias in the new version. To define an alias of a context, it is very simple. You only need to label it with the' @ ContextBean' annotation:

```
@ContextBean("anyName")
public class YourContext {
    ...
}
```

When acquiring, LF provides a new acquisition method:

```
@Component("a")
public class ACmp extends NodeComponent {

    @Override
    public void process() {
        TestContext context = this.getContextBean("anyName");
        ...
    }
}
```

This feature can solve the same class as the context of the scenario.

## EL level provides retry keyword

LF provided the retry feature before, but the retry feature is provided through the '@ LiteflowRetry' annotation. This annotation is on the class, and there is no way to reflect it in the rule EL. In the new version, we provide the 'retry' keyword based on the EL level, and apply the retry feature to arbitrary expressions instead of just components.

```
<chain id="chain1">
    THEN(a, b.retry(3));
</chain>

<chain id="chain2">
    THEN(a, b).retry(3);
</chain>

<chain id="chain3">
    FOR(c).DO(a).retry(3);
</chain>

<chain id="chain4">
    exp = SWITCH(x).to(m,n,p);
    IF(f, exp.retry(3), b);
</chain>
```

For details about the usage of the 'retry' keyword, please refer to 'Advanced Features-> Retry in EL' in the official website document '.

## Add validation/unload script feature

In the new version, we provide an api for verifying scripts and uninstalling scripts. Specific usage is as follows:

```
boolean isValid = ScriptValidator.validate(script);
```

The usage of the unload script is as follows:

'''
FlowBus.unloadScriptNode(String nodeId);
'''

## Provide to view all nodes under a rule

In the new version, we also provide an api to view all nodes under chain:

'''
List(Node) nodeList = FlowBus.getNodesByChainId("chain1");
'''

## Start and stop a rule/script

In the data, LF has long supported the enable of rules and scripts, but in other storage plug-ins, we did not support it before.

We also support the new version. Since many storage plug-ins such as zk,etcd,redis,apollo and other rules/scripts are KV structures, we have made some modifications to the structure of key.

The full form of the rule key is 'Rule ID[: Enabled] '.

The complete format of the script key is: 'Script component ID: script type [: script name: script language: enabled] '.

where the values in square brackets are optional.

For a detailed explanation of this part, please refer to the 1 chapter of "Rules and Configuration Sources" in the official document.

## Full list of updates

```
特性 #I96A33 为LF增加决策表特性

https://gitee.com/dromara/liteFlow/issues/I96A33

特性 #I9DQDU 允许对不存在的组件增加全局参数

https://gitee.com/dromara/liteFlow/issues/I9DQDU

特性 #I9050W 为每一个上下文提供一个名字，使用时可以根据名字来获取

https://gitee.com/dromara/liteFlow/issues/I9050W

特性 #I8PL2M EL语句里可以设置重试次数，类似于EL中的超时时间

https://gitee.com/dromara/liteFlow/issues/I8PL2M

特性 #I61D1N 规则层面增加一个enable的选项，可以禁用规则

https://gitee.com/dromara/liteFlow/issues/I61D1N

特性 #I8YNCB 查看某一个chainId下的所有node

https://gitee.com/dromara/liteFlow/issues/I8YNCB

特性 #I8HDIA 新增一个验证脚本的方法

https://gitee.com/dromara/liteFlow/issues/I8HDIA

增强 #I8SMQB BREAK、IF、WHILE组件统一变成布尔组件

https://gitee.com/dromara/liteFlow/issues/I8SMQB

增强 #I8MW6Q 没有脚本（node）加载后没有提供卸载的方法，可能造成脚本一直占用内存

https://gitee.com/dromara/liteFlow/issues/I8MW6Q

增强 #I905AD 优化注解的获取速度，优化性能

https://gitee.com/dromara/liteFlow/issues/I905AD

增强 #I95XTD python脚本无法写return脚本

https://gitee.com/dromara/liteFlow/issues/I95XTD

增强 #I90IRR 设置超时maxWaitSenconds之后，超时的组件仍旧执行会报出NPE的问题

https://gitee.com/dromara/liteFlow/issues/I90IRR

增强 #I9F2HP 链路继承中的占位符换成双括弧

https://gitee.com/dromara/liteFlow/issues/I9F2HP

增强 #I98L0S 现版本需要依赖jackson2.16，缺少toPrettyString方法

https://gitee.com/dromara/liteFlow/issues/I98L0S

增强 #I97Y7Y 2.11.4.2版本中ComponentScanner初始化失败，建议重写BeanPostProcessor#postProcessBeforeInitialization

https://gitee.com/dromara/liteFlow/issues/I97Y7Y

增强 #I91AUT 对于诸如isContinueOnError或isAccess这样的方法，期望能够提供set形式的调用

https://gitee.com/dromara/liteFlow/issues/I91AUT

修复 #I932V4 组件降级，在寻找降级组件时，仍应该去查找下有没有对应的组件

https://gitee.com/dromara/liteFlow/issues/I932V4

修复 #I8YDGE 在迭代循环组件中，无法获取子流程传递的请求参数

https://gitee.com/dromara/liteFlow/issues/I8YDGE

修复 #I8Y0X4 并行循环中有可能导致的ConditionStack的并发问题

https://gitee.com/dromara/liteFlow/issues/I8Y0X4
```

## Adopt team members

At present, there are 11 members in LF 1, and we also hope to attract more developers to join the open source team. If you want to join the open source team, the "certificate of submission" is 3 PR, which can only be qualified if you successfully pass the author's review and be included in the lead. If you are a student friend, you will pass if you complete the topic assigned by the author and successfully join the main task.

## LF CLUB

LF CLUB is a premium paid community founded by the authors.

LF CLUB helps users of all LiteFlow frameworks, as well as potential developers who want to use LiteFlow.

In addition to providing members with the most timely and detailed consulting services, 11 articles have been updated in the series of vernacular analysis LF, and this series will be more than 50 articles. All are exclusive content. It will not be published on other platforms.

In addition, there will be other high-concurrency parsing, Java spring using advanced skills and other series, as well as LF-related processes, introduction of new features, and so on.

It is updated every 2 to 3 days. If you are interested in small partners, you can scan the following two-dimensional code to see the introduction.

![](/assets/img/blog/LiteFlow-2.12.0-3.png)