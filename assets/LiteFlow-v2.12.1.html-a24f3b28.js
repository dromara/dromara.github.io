import{_ as e}from"./qrcode_zsxq-8eef4d18.js";import{_ as t,o as i,c as n,f as a}from"./app-bb918e67.js";const o={},s=a(`<blockquote><blockquote><p>&quot;</p></blockquote><p>LiteFlow is an open source orchestration rule engine that allows you to arrange your system logic arbitrarily, can choose script writing logic, supports up to 7 scripting languages, supports rich third-party storage support, and all logic and rules can be hot changed. Design system and refactoring system artifact.</p><blockquote></blockquote><p>LiteFlow is Gitee&#39;s high star project. by the time this article was published, Gitee star was close to the 6k mark, while Github had 2.6Kstar.</p><blockquote></blockquote><p>At the same time, LiteFlow is also an excellent community-driven open source project in China. It has been open source for more than 3 years and has been applied to the core system by major front-line companies. According to incomplete statistics, nearly a thousand domestic companies are using it. The features and support are very good. The community has more than 5000 people. There are nearly 1800 test cases with guaranteed quality.</p><blockquote></blockquote><p>If you know this project for the first time, you can go to the official website or the relevant homepage to understand:</p><blockquote></blockquote><p>Project official website: https://liteflow.cc</p><blockquote></blockquote><p>The following articles LiteFlow referred to as LF.</p></blockquote><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>The last major version update of LF was in mid-April, when v2.12.0 was released. Version feature decision routing is introduced.</p><p>This time, we officially released v2.12.1, introducing 2 major features and 2 major enhancements.</p><p>I hope LF can help more developers, whether you use it or learn. We have a huge community, nearly 3 years of uninterrupted iteration, has turned LF into the 1 fully functional, production-level excellent domestic rules engine framework.</p><h2 id="component-injection-parameter-characteristics" tabindex="-1"><a class="header-anchor" href="#component-injection-parameter-characteristics" aria-hidden="true">#</a> Component injection parameter characteristics</h2><p>Now the process method of the component can also accept parameters (this function is limited to declarative components). These parameters are marked with &#39;@ LiteflowFact&#39; and can be automatically injected into the data in the context.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@LiteflowComponent
public class CmpConfig {

    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS, nodeType = NodeTypeEnum.COMMON, nodeId = &quot;a&quot;)
    public void processA(NodeComponent bindCmp,
                        @LiteflowFact(&quot;user.name&quot;) String name,
                        @LiteflowFact(&quot;data1&quot;) String data1) {
        //do biz
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The advantage of this is that if you have many components, you can save each component from the tedious process of fetching the context and then fetching the data each time.</p><p>And &#39;@ LiteflowFact&#39; supports automatic search in the context, no matter how many contexts you have, with this feature, you don&#39;t need to care about the specific context, just define the data you want to get. And this feature is supported by simple point operators to obtain the deep-seated properties of the object.</p><p>For details about this feature, please refer to chapter 1 of the official website document &#39;Data Context-&gt; Context Parameter Injection.</p><h2 id="support-for-kotlin-scripting-language" tabindex="-1"><a class="header-anchor" href="#support-for-kotlin-scripting-language" aria-hidden="true">#</a> Support for Kotlin scripting language</h2><p>In fact, LF supports the most types of scripting languages in the rule engine, and there is no one.</p><p>With support for Kotlin, which currently supports eight scripting languages, you can now define your business using Kotlin syntax.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;node id=&quot;s1&quot; type=&quot;script&quot; language=&quot;kotlin&quot;&gt;
    import com.yomahub.liteflow.slot.DefaultContext

    fun sum(a: Int, b: Int) = a + b
    var a = 2
    var b = 3
    // 从 bindings 中获取上下文
    val defaultContext = bindings[&quot;defaultContext&quot;] as DefaultContext
    defaultContext.setData(&quot;s1&quot;, sum(a, b))
    println(&quot;Hello Kotlin!&quot;)
&lt;/node&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Like other scripting languages, kotlin can also communicate with java, and even spring beans can be introduced for rpc calls. This is essentially the underlying mechanism of LF is more perfect, and what scripting language has nothing to do.</p><p>For details about this feature, please refer to the official website document &#39;Script Components-&gt; Script Language Types-&gt;Kotlin Script Engine &#39;.</p><h2 id="decision-routing-add-namespace" tabindex="-1"><a class="header-anchor" href="#decision-routing-add-namespace" aria-hidden="true">#</a> Decision Routing Add Namespace</h2><p>LF introduced the decision routing feature in v2.12.0, but many students in the community who used this feature reflected that the decision routing is a global match, and if the decision routing is more than one, it will affect its performance. Although I actually measured it down and will not affect too much. However, decision routing has to have the concept of a group, and in the new version we have added the concept of a namespace to it. Its namespace can be specified at execution time.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;r_chain1&quot; namespace=&quot;n1&quot;&gt;
  &lt;route&gt;
    r1
  &lt;/route&gt;
  &lt;body&gt;
    THEN(b,a);
  &lt;/body&gt;
&lt;/chain&gt;

&lt;chain name=&quot;r_chain2&quot; namespace=&quot;n1&quot;&gt;
  &lt;route&gt;
    OR(r1,r2)
  &lt;/route&gt;
  &lt;body&gt;
    THEN(a,b);
  &lt;/body&gt;
&lt;/chain&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For details about this feature, please refer to the official website document&#39; Decision Routing-&gt; Decision Routing Usage &#39;.</p><h2 id="database-support-decision-routing-feature" tabindex="-1"><a class="header-anchor" href="#database-support-decision-routing-feature" aria-hidden="true">#</a> Database support decision routing feature</h2><p>The new version supports the decision routing feature in the database plug-in. If you configure the corresponding fields and assign values to the database, you can enable the use of the decision routing feature. And the decision route itself can be hot updated.</p><p>Of course, the previous use is also completely seamless compatible.</p><h2 id="full-update-list" tabindex="-1"><a class="header-anchor" href="#full-update-list" aria-hidden="true">#</a> Full Update List</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>特性 #I9K14C 为process方法提供注入型参数特性

https://gitee.com/dromara/liteFlow/issues/I9K14C

特性 #I9H6GN 支持kotlin脚本语言

https://gitee.com/dromara/liteFlow/issues/I9H6GN

特性 #I9PVQ7 决策路由中增加namespace，可以执行指定命名空间的决策路由

https://gitee.com/dromara/liteFlow/issues/I9PVQ7

特性 #I9RPBK 数据库插件支持决策路由特性

https://gitee.com/dromara/liteFlow/issues/I9RPBK

修复 #I9JDY1 绝对路径模糊匹配，没对windows的路径做支持

https://gitee.com/dromara/liteFlow/issues/I9JDY1

修复 #I9N5K8 在自定义组件后，通过getCmpData 获取data的实体对象，data字段与实体类不匹配是会抛异常

https://gitee.com/dromara/liteFlow/issues/I9N5K8

#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>About Dromara</p><p>Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.</p><p>Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.</p><p>**Welcome to the knowledge planet and I interact * *</p><figure><img src="`+e+'" alt="" tabindex="0"><figcaption></figcaption></figure>',31),r=[s];function l(d,c){return i(),n("div",null,r)}const m=t(o,[["render",l],["__file","LiteFlow-v2.12.1.html.vue"]]);export{m as default};
