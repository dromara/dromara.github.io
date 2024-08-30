import{_ as t}from"./TestHub-1.0.2-1-a1e87689.js";import{_ as e}from"./TestHub-0-2-7d3677fe.js";import{_ as i,o as a,c as n,f as s}from"./app-d3789271.js";const d="/assets/img/news/TestHub-1.0.2-2.jpg",o="/assets/img/news/TestHub-1.0.2-3.jpg",u="/assets/img/news/TestHub-1.0.2-4.jpg",l="/assets/img/news/TestHub-1.0.2-5.jpg",r={},c=s('<h2 id="自动化测试工具-testhub-v1-0-2-版本发布" tabindex="-1"><a class="header-anchor" href="#自动化测试工具-testhub-v1-0-2-版本发布" aria-hidden="true">#</a> 自动化测试工具：TestHub V1.0.2 版本发布</h2><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>TestHub 是一款基于流程编排的自动化测试工具。是为了解决在软件开发旅程中测试流程管理和执行的复杂挑战而诞生的。传统测试工具可能局限于接口级自动化，无法满足多样化的需求，而我们在 TestHub 中引入了独特的流程编排功能，让您能够轻松定义、管理和执行测试流程。无论是自动化测试、流程调度还是其他自动化任务，TestHub 的插件式架构都能够满足您的无限扩展需求。</p><p>使用手册：http://nsrule.com/</p><p>演示环境：http://testhub.nsrule.com:11018/#/</p><p>Gitee 开源地址：https://gitee.com/dromara/TestHub</p><p>Gitub 开源地址：https://github.com/dromara/TestHub</p><p>演示视频：https://www.bilibili.com/video/BV1X94y1v7ak/</p><p>安装包：https://url84.ctfile.com/d/49656084-58580094-6ad8ce?p=3738 (访问密码: 3738)</p><figure><img src="'+t+'" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="更新内容" tabindex="-1"><a class="header-anchor" href="#更新内容" aria-hidden="true">#</a> 更新内容</h2><ul><li><p>🪲🪲 修复 BUG🪲🪲</p></li><li><p>解决用例类目树超出不显示滚动条的问题</p></li><li><p>修复无法退出登陆的问题</p></li><li><p>修复 HTTP 超时问题</p></li><li><p>👍👍 新增功能 👍👍</p></li><li><p>sql 能力支持同时执行多条 sql</p></li><li><p>实现简单级权限控制</p></li><li><p>后端部分插件化改造</p></li><li><p>提供组件库的功能</p></li><li><p>提供页面配置行为</p></li><li><p>支持配置多环境</p></li></ul><h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2><h3 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h3><p>我们可以在环境设置中配置环境级参数，在测试用例执行的时候选择环境用户切换不同参数 只有管理员可以添加和编辑环境</p><p><img src="'+d+'" alt=""><img src="'+o+'" alt=""></p><h3 id="行为设置" tabindex="-1"><a class="header-anchor" href="#行为设置" aria-hidden="true">#</a> 行为设置</h3><p>我们可以在行为设置中看到系统级行为和项目级别行为，其中系统级行为不可以被编辑，项目级行为可由管理员和创建人编辑 <img src="'+u+'" alt=""></p><h3 id="如何退出登陆" tabindex="-1"><a class="header-anchor" href="#如何退出登陆" aria-hidden="true">#</a> 如何退出登陆</h3><figure><img src="'+l+`" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="http-如何设置超时时间" tabindex="-1"><a class="header-anchor" href="#http-如何设置超时时间" aria-hidden="true">#</a> HTTP 如何设置超时时间</h2><p>timeout 可以设置 HTTP 的超时时间 单位为秒 超时设置默认 60 秒</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;action code=&quot;order&quot; name=&quot;下单&quot; type=&quot;HTTP&quot; dataType=&quot;map&quot;&gt;
    &lt;httpModel url=&quot;http://192.168.0.4:12004/order&quot; method=&quot;post&quot; timeout=&quot;120&quot;&gt;
        &lt;headers&gt;
            &lt;param code=&quot;Content-Type&quot; dataType=&quot;STRING&quot; data=&quot;application/json;charset=utf-8&quot;/&gt;
        &lt;/headers&gt;
        &lt;body type=&quot;raw&quot; language=&quot;json&quot;&gt;
            &lt;bound&gt;
                {
                &quot;acctId&quot;: &quot;960307&quot;,
                &quot;orderPrice&quot;: &quot;1.8&quot;,
                &quot;orderQty&quot;: &quot;100&quot;
                }
            &lt;/bound&gt;
        &lt;/body&gt;
    &lt;/httpModel&gt;
&lt;/action&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sql-如何设置自动提交事务-与-如何批量执行" tabindex="-1"><a class="header-anchor" href="#sql-如何设置自动提交事务-与-如何批量执行" aria-hidden="true">#</a> SQL 如何设置自动提交事务 与 如何批量执行</h2><p>commit=&quot;true&quot; 表示自动提交事务 bound 中可以写多条 sql</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;action code=&quot;order&quot; name=&quot;下单&quot; type=&quot;HTTP&quot; dataType=&quot;map&quot;&gt;
    &lt;httpModel url=&quot;http://192.168.0.4:12004/order&quot; method=&quot;post&quot; timeout=&quot;120&quot;&gt;
        &lt;headers&gt;
            &lt;param code=&quot;Content-Type&quot; dataType=&quot;STRING&quot; data=&quot;application/json;charset=utf-8&quot;/&gt;
        &lt;/headers&gt;
        &lt;body type=&quot;raw&quot; language=&quot;json&quot;&gt;
            &lt;bound&gt;
                {
                &quot;acctId&quot;: &quot;960307&quot;,
                &quot;orderPrice&quot;: &quot;1.8&quot;,
                &quot;orderQty&quot;: &quot;100&quot;
                }
            &lt;/bound&gt;
        &lt;/body&gt;
    &lt;/httpModel&gt;
&lt;/action&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>[失败女神]-TestHub 开发团队</strong></p><img src="`+e+'" height="340">',28),p=[c];function h(m,q){return a(),n("div",null,p)}const _=i(r,[["render",h],["__file","TestHub-1.0.2.html.vue"]]);export{_ as default};
