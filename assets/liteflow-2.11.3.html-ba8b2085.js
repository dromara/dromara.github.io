import{_ as s,r as t,o as a,c as r,a as e,b as i,d as l,e as o}from"./app-75a46660.js";const d={},c=e("h2",{id:"liteflow介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#liteflow介绍","aria-hidden":"true"},"#"),i(" LiteFlow介绍")],-1),u=e("p",null,[e("strong",null,"LiteFlow是一个开源编排式规则引擎，能够让你的系统逻辑任意编排，可选用脚本书写逻辑，支持多达6种脚本语言，支持丰富的第三方存储的支持，所有的逻辑和规则均可热变更。设计系统和重构系统的神器。")],-1),v=e("p",null,"LiteFlow是Gitee的高star项目，过去一年来保持了非常快的增长趋势。",-1),m=e("p",null,"同时LiteFlow也是国内优秀的社区驱动型开源项目，开源将近3年，目前已经被各大公司应用在核心系统上。特性以及支持度都非常好。社区人数超过3500人。测试用例1500个，质量有保障。",-1),h=e("p",null,"如果你是第一次知道这个项目，可以去官网或相关的主页进行了解：",-1),p=e("p",null,"项目官网:",-1),b={href:"https://liteflow.cc",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,"gitee托管仓库：",-1),g={href:"https://gitee.com/dromara/liteFlow",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,"github托管仓库：",-1),f={href:"https://github.com/dromara/liteflow",target:"_blank",rel:"noopener noreferrer"},F=o(`<h2 id="新版本简介" tabindex="-1"><a class="header-anchor" href="#新版本简介" aria-hidden="true">#</a> 新版本简介</h2><p>LiteFlow又发布新版本啦！v2.11.3这个版本主要是修复社区里提出的一些bug的版本。</p><p>v2.11.3总计有1个增强，5个修复。</p><p>对于SQL插件，可能是大家用的最多的LiteFlow插件，我们在新版本里多增加了一个enable的配置映射。使得你在数据库中可以启用和禁用某些流程和脚本。具体文档可以看SQL插件那章。</p><p>同时我们修复了2.11.0，2.11.1两个新版本发布诸多特性中遗留下来的bug。</p><p>建议在用2.11.X这个系列版本的都更新到这个版本。更新过程是平滑的。完全兼容。</p><p>我们每一个版本都在快速进步，得益于LiteFlow目前拥有一个非常强大的开源团队和一份对开源事业追求的热情。我们认真开发每一个特性，仔细对待每一个测试用例，热心回答社区每一个问题，诚恳听取大家的每一个建议，尽力修复每一个bug。</p><p>如果你想加入我们，请联系我。</p><p>最近又到了一年一度的双11了，LiteFlow目前运行在上百家公司的核心业务中。希望大家都能双11买买买，服务稳定，顺利度过双11。</p><h2 id="完整更新列表" tabindex="-1"><a class="header-anchor" href="#完整更新列表" aria-hidden="true">#</a> 完整更新列表</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>增强 #I8BPM9 SQL插件增加enable字段的映射

https://gitee.com/dromara/liteFlow/issues/I8BPM9

修复 #I8BPMD 修复2.11.2中启动parse两次规则的问题

https://gitee.com/dromara/liteFlow/issues/I8BPMD

修复 #I8BPHS 修复Redis配置源哨兵模式的地址检查

https://gitee.com/dromara/liteFlow/issues/I8BPHS

修复 #I8AWHT LiteFlowChainELBuilder.validate()存在bug

https://gitee.com/dromara/liteFlow/issues/I8AWHT

修复 #I8AR0L 组件定义了重试和回滚，回滚也会被重试

https://gitee.com/dromara/liteFlow/issues/I8AR0L

修复 #I8AF1O 修复redis的订阅模式mode解析的bug

https://gitee.com/dromara/liteFlow/issues/I8AF1O
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function L(I,x){const n=t("ExternalLinkIcon");return a(),r("div",null,[c,u,v,m,h,e("blockquote",null,[p,e("p",null,[e("a",b,[i("https://liteflow.cc"),l(n)])]),_,e("p",null,[e("a",g,[i("https://gitee.com/dromara/liteFlow"),l(n)])]),w,e("p",null,[e("a",f,[i("https://github.com/dromara/liteflow"),l(n)])])]),F])}const k=s(d,[["render",L],["__file","liteflow-2.11.3.html.vue"]]);export{k as default};
