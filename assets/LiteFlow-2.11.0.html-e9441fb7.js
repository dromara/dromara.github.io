import{_ as e,o as i,c as n,f as a}from"./app-2e9cf0b8.js";const d="/assets/img/news/LiteFlow-2.11.0-1.png",s="/assets/img/news/LiteFlow-2.11.0-2.png",l="/assets/img/news/LiteFlow-2.11.0-3.png",t={},c=a(`<h2 id="liteflow-介绍" tabindex="-1"><a class="header-anchor" href="#liteflow-介绍" aria-hidden="true">#</a> LiteFlow 介绍</h2><p><strong>LiteFlow 是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达 6 种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。</strong></p><p>LiteFlow 是 Gitee 的高 star 项目，过去一年来保持了非常快的增长趋势。</p><p>同时 LiteFlow 也是国内优秀的社区驱动型开源项目，开源将近 3 年，目前已经被各大公司应用在核心系统上。特性以及支持度都非常好。社区人数超过 3500 人。测试用例 1500 个，质量有保障。</p><p>如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>项目官网:
https://liteflow.cc

gitee 托管仓库：
https://gitee.com/dromara/liteFlow

github 托管仓库：
https://github.com/dromara/liteflow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v2-11-0-介绍" tabindex="-1"><a class="header-anchor" href="#v2-11-0-介绍" aria-hidden="true">#</a> v2.11.0 介绍</h2><p>v2.11.0 是一个大版本，LiteFlow 提供了 5 个大的新特性，以及 3 个加强，2 个 bug 修复。</p><p>LiteFlow 同时更换了新的项目 Logo 和启动了新的域名。</p><p>LF 在这个版本改头换面，以全新的姿态继续向前冲~</p><h2 id="新的项目-logo" tabindex="-1"><a class="header-anchor" href="#新的项目-logo" aria-hidden="true">#</a> 新的项目 LOGO</h2><figure><img src="`+d+'" alt="" tabindex="0"><figcaption></figcaption></figure><p>感谢设计师<code>Evan Lou</code>的帮助，为 LiteFlow 带来了全新的 Logo。🤙</p><p>新 Logo 寓意：</p><p>1.整体是一片树叶形状，树叶既代表了轻量，也象征着 LiteFlow 会一直像树叶那样进行光合作用，释放氧气。</p><p>2.叶子里的叶脉是一个 L 和 F 的交错变体，象征着 LiteFlow 的缩写。</p><p>3.叶脉简单且延展开，象征流程的分叉。</p><p>4.整个叶子被叶脉分隔成 4 部分，象征着编排，4 个不同的部分组成了一片完美的叶子。</p><h2 id="启用全新域名" tabindex="-1"><a class="header-anchor" href="#启用全新域名" aria-hidden="true">#</a> 启用全新域名</h2><p>LiteFlow 在 v2.11.0 启用了全新的域名：https://liteflow.cc。简单且好记。</p><p>同时老的域名也是可以访问的，会自动重定向到新的域名上。</p><h2 id="新的-slogan" tabindex="-1"><a class="header-anchor" href="#新的-slogan" aria-hidden="true">#</a> 新的 Slogan</h2><p>LiteFlow 会从 2.11.0 这个版本开始，为每一个版本都设计一句 Slogan。</p><p>这个版本的 Slogan 为：<code>Keep on the light side</code>。</p><p>中文寓意为：<code>逐光而行</code>。</p><p>这句 Slogan 一语双关，其中<code>light</code>谐音<code>lite</code>，表示我们会一直坚持 LiteFlow 的开源迭代。</p><p>逐光而行，我希望我自己可以践行，人总要需要一道光来照亮生命，我们疲惫且努力的追逐那道光，远离黑暗。</p><h2 id="特性-1-能够用-java-原生语言来写脚本" tabindex="-1"><a class="header-anchor" href="#特性-1-能够用-java-原生语言来写脚本" aria-hidden="true">#</a> 特性 1：能够用 Java 原生语言来写脚本</h2><p>丰富的脚本语言支持是 LiteFlow 的一大特色，脚本语言轻巧，能否被即时刷新的特点受到了很多开发者的喜爱。</p><p>LiteFlow 之前支持了挺多的脚本语言，分别是：Groovy，Javascript，Python，QLExpress，Lua，Aviator。</p><p>但是不同的语言有不同的语法结构，很多不熟悉的这些语言写法的同学可能还要花点时间去学习该如何写。</p><p>这次版本 LiteFlow 支持了原生 Java 脚本语言的写法，这意味着你可以无学习成本的直接在脚本里用 Java 来书写逻辑。</p><figure><img src="'+s+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>关于 Java 脚本语言的详细文档请参照官网中<code>脚本组件-&gt;脚本语言种类-&gt;Java脚本引擎</code>。</p><h2 id="特性-2-支持了-redis-中存储规则和脚本" tabindex="-1"><a class="header-anchor" href="#特性-2-支持了-redis-中存储规则和脚本" aria-hidden="true">#</a> 特性 2：支持了 Redis 中存储规则和脚本</h2><p>LiteFlow 支持丰富的存储插件，所有的关系型数据库以及各种注册中心。</p><p>这次我们新增了 Redis 插件，用 Redis 来存储规则以及脚本。Redis 在各大企业中用的比较多。为了保证使用的多样性。我们甚至开发了 2 种模式：<code>轮询拉取模式</code>和<code>订阅模式</code>，各有特点。</p><p>其中轮询拉取模式，我们做了非常多的优化，我们对每一个脚本和规则生成了指纹，只比对指纹，而非拉取整个数据，消耗极小。</p><p>订阅模式非常实时，但是需要你用<code>Redission</code>框架来操作 Redis，算有一定的使用限制。具体选用哪种模式，交由开发者来决定。</p><p>关于 redis 插件的详细文档请参照官网中<code>规则文件-&gt;Redis配置源</code>。</p><h2 id="特性-3-全方位的超时控制" tabindex="-1"><a class="header-anchor" href="#特性-3-全方位的超时控制" aria-hidden="true">#</a> 特性 3：全方位的超时控制</h2><p>在以前的 LiteFlow 版本中，超时控制只能针对<code>WHEN</code>表达式，且是全局配置。</p><p>在新版本中，我们支持了全方位的超时控制体系，一个<code>maxWaitSeconds</code>关键字可对任意的组件、表达式、流程进行超时控制。</p><p>对任意表达式的控制：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;chain1&quot;&gt;
    THEN(a,b).maxWaitSeconds(5);
&lt;/chain&gt;
&lt;chain name=&quot;chain1&quot;&gt;
    FOR(2).DO(a).maxWaitSeconds(3);
&lt;/chain&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对组件的超时控制</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;chain1&quot;&gt;
    WHEN(
        a.maxWaitSeconds(2),
        b.maxWaitSeconds(3)
    );
&lt;/chain&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对子流程的超时控制</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;testChain&quot;&gt;
    THEN(b)
&lt;/chain&gt;
&lt;chain name=&quot;chain&quot;&gt;
    testChain.maxWaitSeconds(3);
&lt;/chain&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这块的详细文档请参考官网文档中的<code>高级特性-&gt;超时控制</code>。</p><h2 id="特性-4-异步循环模式" tabindex="-1"><a class="header-anchor" href="#特性-4-异步循环模式" aria-hidden="true">#</a> 特性 4：异步循环模式</h2><p>经常群里的小伙伴会反映：LiteFLow 的循环体系只支持同步，如果能支持异步就好了。</p><p>这个版本我们支持了！对三种循环模式都予以了异步支持。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;chain name=&quot;chain1&quot;&gt;
   FOR(2).parallel(true).DO(THEN(a,b,c));
&lt;/chain&gt;
&lt;chain name=&quot;chain2&quot;&gt;
    WHILE(x).parallel(true).DO(THEN(a,b,c));
&lt;/chain&gt;
&lt;chain name=&quot;chain3&quot;&gt;
    ITERATOR(x).parallel(true).DO(THEN(a,b,c));
&lt;/chain&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个<code>parallel</code>关键字搞定。是不是很简单？</p><p>关于异步循环的详细文档请参考官网文档中的<code>高级特性-&gt;异步循环模式</code>。</p><h2 id="特性-5-组件回滚" tabindex="-1"><a class="header-anchor" href="#特性-5-组件回滚" aria-hidden="true">#</a> 特性 5：组件回滚</h2><p>这也就是所谓的逆操作。LiteFlow 从这个版本开始有逆向操作了！LiteFlow 会自动帮你记录执行的顺序，当某个组件抛出异常时，会自动按实际执行的顺序进行逆操作。</p><p>这一切的前提只需要你在组件中实现<code>rollback</code>方法。</p><p>在自动执行完回滚操作后，LiteFlow 的日志还会把回滚的步骤都打出来，让你一目了然。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@LiteflowComponent(&quot;a&quot;)
public class ACmp extends NodeComponent {

    @Override
    public void process() {
        //do your biz
    }

    @Override
    public void rollback() throws Exception {
        //do your biz
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于组件回滚的详细文档请参考官网文档中的<code>高级特性-&gt;组件回滚</code>。</p><h2 id="测试用例增加到-1200-个左右" tabindex="-1"><a class="header-anchor" href="#测试用例增加到-1200-个左右" aria-hidden="true">#</a> 测试用例增加到 1200 个左右</h2><p>我相信，一个开源框架的上限是看这个框架所解决的问题和这个框架提供的特性和设计。而下限则是这个开源框架的测试用例的完备性。</p><p>我们不仅要开疆拓土，提供新特性和新的探索，也要守疆土，确保整体稳定性和质量。</p><p>我们这次将测试用例数量提高到近 1200 个，几乎覆盖到了所有的地方。</p><p>大家可以放心用。我们也有完备的社区和组织，社区目前拥有 3500 人左右。</p><h2 id="ppt-更新" tabindex="-1"><a class="header-anchor" href="#ppt-更新" aria-hidden="true">#</a> PPT 更新</h2><p>官网提供的 PPT 同步更新到 v2.11.0 这个版本。</p><p>获取 PPT 的方式请参考：https://liteflow.cc/pages/8d6666/</p><h2 id="完整更新列表" tabindex="-1"><a class="header-anchor" href="#完整更新列表" aria-hidden="true">#</a> 完整更新列表</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>更新列表

特性 #I7V6VB 建议增加Janino插件，支持java脚本的书写

https://gitee.com/dromara/liteFlow/issues/I7V6VB

特性 #I7T53A 增加Redis存储规则的支持

https://gitee.com/dromara/liteFlow/issues/I7T53A

特性 #I7I3LL 允许对EL中的每⼀个组件设置超时时间控制

https://gitee.com/dromara/liteFlow/issues/I7I3LL

特性 #I7HJFX 循环表达式中支持异步模式

https://gitee.com/dromara/liteFlow/issues/I7HJFX

特性 #I590JT 对于回滚流程的支持

https://gitee.com/dromara/liteFlow/issues/I590JT

增强 #I7QC8V SQL插件格式化加入CDATA

https://gitee.com/dromara/liteFlow/issues/I7QC8V

增强 #I7Q8BX 部分代码有NPE风险

https://gitee.com/dromara/liteFlow/issues/I7Q8BX

增强 #I7Q4BN 默认主线程池的名称拼写

https://gitee.com/dromara/liteFlow/issues/I7Q4BN

修复 #I7WNDA SQLException: 使用druid+oracle会报出关闭的语句错误

https://gitee.com/dromara/liteFlow/issues/I7WNDA

修复 #I7TYS3 当组件出现Exception的时候，afterProcess获取不到

https://gitee.com/dromara/liteFlow/issues/I7TYS3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="支持和赞助-liteflow" tabindex="-1"><a class="header-anchor" href="#支持和赞助-liteflow" aria-hidden="true">#</a> 支持和赞助 LiteFlow</h2><p>开源一个项目并坚持 2 年并不容易，如果各位对 LiteFlow 这个项目有信心并且愿意支持的话，可以在官网首先点击 <code>给LiteFlow发电</code> 按钮。</p><p>但不管你是否选择赞助，我仍然会在社区里尽可能的解决你们的问题。</p><p>社区里的问题太多，如果没回答上，请多艾特我几遍。</p><h2 id="如何加群" tabindex="-1"><a class="header-anchor" href="#如何加群" aria-hidden="true">#</a> 如何加群</h2><p>LiteFlow 的社区群已经有大约 3000 人以上了。你有任何问题，都可以在群里问。</p><p>关于加群的方式，请参考：https://liteflow.cc/pages/73c2c3/</p><p>你也可以直接以下这个码来加入新群：</p><img src="`+l+'" height="340">',81),r=[c];function o(v,u){return i(),n("div",null,r)}const m=e(t,[["render",o],["__file","LiteFlow-2.11.0.html.vue"]]);export{m as default};
