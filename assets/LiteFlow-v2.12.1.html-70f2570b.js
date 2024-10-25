import{_ as e}from"./qrcode_zsxq-8eef4d18.js";import{_ as i,o as n,c as a,f as d}from"./app-b622e902.js";const s={},l=d(`<blockquote><p>“</p><p>LiteFlow是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达7种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。</p><p>LiteFlow是Gitee的高star项目，截止到发此文章的时候，Gitee star接近6k大关，Github则拥有2.6Kstar。</p><p>同时LiteFlow也是国内优秀的社区驱动型开源项目，开源3年多，目前已经被各大一线公司应用在核心系统上，据不完全统计，国内将近千余家公司都在使用。特性以及支持度都非常好。社区人数超过5000人。测试用例将近1800个，质量有保障。</p><p>如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：</p><p>项目官网:https://liteflow.cc</p><p>以下文章LiteFlow简称为LF。</p></blockquote><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>LF上一次大版本更新是在4月中旬，发布了v2.12.0。推出了版本特性决策路由。</p><p>这一次，我们正式发布v2.12.1，推出2个大特性，2个大增强。</p><p>希望LF能帮助到更多的开发者，无论你是使用它还是用来学习。我们拥有庞大的社区，近3年多不间断的迭代，已经让LF变成了一款功能完备，生产级别的优秀国产规则引擎框架。</p><h2 id="组件注入型参数特性" tabindex="-1"><a class="header-anchor" href="#组件注入型参数特性" aria-hidden="true">#</a> 组件注入型参数特性</h2><p>现在组件的process方法上也可以接受参数了（这个功能仅限于声明式组件），这些个参数通过<code>@LiteflowFact</code>标注，能够自动注入上下文里的数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@LiteflowComponent
public class CmpConfig {

    @LiteflowMethod(value = LiteFlowMethodEnum.PROCESS, nodeType = NodeTypeEnum.COMMON, nodeId = &quot;a&quot;)
    public void processA(NodeComponent bindCmp,
                        @LiteflowFact(&quot;user.name&quot;) String name,
                        @LiteflowFact(&quot;data1&quot;) String data1) {
        //do biz
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做的好处是，如果你拥有很多组件，可以省去每个组件每次要去取到上下文然后再去取数据这一套繁琐的过程。</p><p>并且<code>@LiteflowFact</code>是支持在上下文里进行自动搜索的，无论你有多少个上下文，利用这一特性，无需关心具体上下文，只需要定义你想获取的数据即可。并且这个特性是支持通过简单的点操作符去获取对象深层次的属性的。</p><p>关于这个特性具体请参照官网文档<code>数据上下文-&gt;上下文参数注入</code>这一章。</p><h2 id="支持kotlin脚本语言" tabindex="-1"><a class="header-anchor" href="#支持kotlin脚本语言" aria-hidden="true">#</a> 支持Kotlin脚本语言</h2><p>其实LF在脚本语言方面支持的种类绝对是规则引擎里最多的，没有之一。</p><p>这次我们又支持了Kotlin语言，目前总共支持8种脚本语言，你现在可以利用Kotlin语法定义你的业务了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;node id=&quot;s1&quot; type=&quot;script&quot; language=&quot;kotlin&quot;&gt;
    import com.yomahub.liteflow.slot.DefaultContext

    fun sum(a: Int, b: Int) = a + b
    var a = 2
    var b = 3
    // 从 bindings 中获取上下文
    val defaultContext = bindings[&quot;defaultContext&quot;] as DefaultContext
    defaultContext.setData(&quot;s1&quot;, sum(a, b))
    println(&quot;Hello Kotlin!&quot;)
&lt;/node&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和其他脚本语言一样，kotlin也可以和java进行互通，甚至于可以引入spring的bean进行rpc调用也是可以的。这本质上是LF的底层机制比较完善，和用什么脚本语言无关的。</p><p>关于这个特性具体请参照官网文档<code>脚本组件-&gt;脚本语言种类-&gt;Kotlin脚本引擎</code>。</p><h2 id="决策路由增加namespace" tabindex="-1"><a class="header-anchor" href="#决策路由增加namespace" aria-hidden="true">#</a> 决策路由增加Namespace</h2><p>LF在v2.12.0中推出了决策路由特性，但是社区里很多使用了这一特性的同学反映决策路由是全局匹配，如果决策路由一多会影响其性能。虽然我实测下来并不会影响太多。但是决策路由是得有组的概念，在新版本中我们给其增加了一个命名空间的概念。可以在执行的时候指定其命名空间。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;r_chain1&quot; namespace=&quot;n1&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这个特性具体请参照官网文档<code>决策路由-&gt;决策路由用法</code>。</p><h2 id="数据库支持决策路由特性" tabindex="-1"><a class="header-anchor" href="#数据库支持决策路由特性" aria-hidden="true">#</a> 数据库支持决策路由特性</h2><p>新版本在数据库插件中支持决策路由特性了。如果你配置相应的字段，并在数据库赋值，即可开启决策路由特性的使用。并且决策路由本身也是可以被热更新的哦。</p><p>当然对以前的使用方式也是完全无缝兼容的。</p><h2 id="完整更新列表" tabindex="-1"><a class="header-anchor" href="#完整更新列表" aria-hidden="true">#</a> 完整更新列表</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>特性 #I9K14C 为process方法提供注入型参数特性

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于 Dromara</p><p>Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。</p><p>Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。</p><p><strong>欢迎大家来到知识星球和我互动</strong></p><figure><img src="`+e+'" alt="" tabindex="0"><figcaption></figcaption></figure>',31),t=[l];function r(o,c){return n(),a("div",null,t)}const m=i(s,[["render",r],["__file","LiteFlow-v2.12.1.html.vue"]]);export{m as default};
