---
title: The rule engine LiteFlow released the v2.12.1 version. How hard did it use to know
author: Platinum East
date: 2024-06-04
tag:
  - 
cover: /assets/img/qrcode_zsxq.webp
head:
  - - meta
    - name: Blog
---

>>"
>>
> LiteFlow is an open source orchestration rule engine that allows you to arrange your system logic arbitrarily, can choose script writing logic, supports up to 7 scripting languages, supports rich third-party storage support, and all logic and rules can be hot changed. Design system and refactoring system artifact.
>>
> LiteFlow is Gitee's high star project. by the time this article was published, Gitee star was close to the 6k mark, while Github had 2.6Kstar.
>>
> At the same time, LiteFlow is also an excellent community-driven open source project in China. It has been open source for more than 3 years and has been applied to the core system by major front-line companies. According to incomplete statistics, nearly a thousand domestic companies are using it. The features and support are very good. The community has more than 5000 people. There are nearly 1800 test cases with guaranteed quality.
>>
> If you know this project for the first time, you can go to the official website or the relevant homepage to understand:
>>
> Project official website: https://liteflow.cc
>>
> The following articles LiteFlow referred to as LF.

## Preface

The last major version update of LF was in mid-April, when v2.12.0 was released. Version feature decision routing is introduced.

This time, we officially released v2.12.1, introducing 2 major features and 2 major enhancements.

I hope LF can help more developers, whether you use it or learn. We have a huge community, nearly 3 years of uninterrupted iteration, has turned LF into the 1 fully functional, production-level excellent domestic rules engine framework.

## Component injection parameter characteristics

Now the process method of the component can also accept parameters (this function is limited to declarative components). These parameters are marked with '@ LiteflowFact' and can be automatically injected into the data in the context.

```
@LiteflowComponent
public class CmpConfig {

    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS, nodeType = NodeTypeEnum.COMMON, nodeId = "a")
    public void processA(NodeComponent bindCmp,
                        @LiteflowFact("user.name") String name,
                        @LiteflowFact("data1") String data1) {
        //do biz
    }
}
```

The advantage of this is that if you have many components, you can save each component from the tedious process of fetching the context and then fetching the data each time.

And '@ LiteflowFact' supports automatic search in the context, no matter how many contexts you have, with this feature, you don't need to care about the specific context, just define the data you want to get. And this feature is supported by simple point operators to obtain the deep-seated properties of the object.

For details about this feature, please refer to chapter 1 of the official website document 'Data Context-> Context Parameter Injection.

## Support for Kotlin scripting language

In fact, LF supports the most types of scripting languages in the rule engine, and there is no one.

With support for Kotlin, which currently supports eight scripting languages, you can now define your business using Kotlin syntax.

```
<node id="s1" type="script" language="kotlin">
    import com.yomahub.liteflow.slot.DefaultContext

    fun sum(a: Int, b: Int) = a + b
    var a = 2
    var b = 3
    // 从 bindings 中获取上下文
    val defaultContext = bindings["defaultContext"] as DefaultContext
    defaultContext.setData("s1", sum(a, b))
    println("Hello Kotlin!")
</node>
```

Like other scripting languages, kotlin can also communicate with java, and even spring beans can be introduced for rpc calls. This is essentially the underlying mechanism of LF is more perfect, and what scripting language has nothing to do.

For details about this feature, please refer to the official website document 'Script Components-> Script Language Types->Kotlin Script Engine '.

## Decision Routing Add Namespace

LF introduced the decision routing feature in v2.12.0, but many students in the community who used this feature reflected that the decision routing is a global match, and if the decision routing is more than one, it will affect its performance. Although I actually measured it down and will not affect too much. However, decision routing has to have the concept of a group, and in the new version we have added the concept of a namespace to it. Its namespace can be specified at execution time.

```
<chain name="r_chain1" namespace="n1">
  <route>
    r1
  </route>
  <body>
    THEN(b,a);
  </body>
</chain>

<chain name="r_chain2" namespace="n1">
  <route>
    OR(r1,r2)
  </route>
  <body>
    THEN(a,b);
  </body>
</chain>
```

For details about this feature, please refer to the official website document' Decision Routing-> Decision Routing Usage '.

## Database support decision routing feature

The new version supports the decision routing feature in the database plug-in. If you configure the corresponding fields and assign values to the database, you can enable the use of the decision routing feature. And the decision route itself can be hot updated.

Of course, the previous use is also completely seamless compatible.

## Full Update List

```
特性 #I9K14C 为process方法提供注入型参数特性

https://gitee.com/dromara/liteFlow/issues/I9K14C

特性 #I9H6GN 支持kotlin脚本语言

https://gitee.com/dromara/liteFlow/issues/I9H6GN

特性 #I9PVQ7 决策路由中增加namespace，可以执行指定命名空间的决策路由

https://gitee.com/dromara/liteFlow/issues/I9PVQ7

特性 #I9RPBK 数据库插件支持决策路由特性

https://gitee.com/dromara/liteFlow/issues/I9RPBK

修复 #I9JDY1 绝对路径模糊匹配，没对windows的路径做支持

https://gitee.com/dromara/liteFlow/issues/I9JDY1

修复 #I9N5K8 在自定义组件后，通过getCmpData 获取data的实体对象，data字段与实体类不匹配是会抛异常

https://gitee.com/dromara/liteFlow/issues/I9N5K8

#
```

  

  

About Dromara

Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/qrcode_zsxq.webp)