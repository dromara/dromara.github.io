import{_ as e,o as i,c as t,f as d}from"./app-b622e902.js";const n="/assets/img/news/Forest-1.5.33-1.png",s={},a=d(`<h2 id="forest-介绍" tabindex="-1"><a class="header-anchor" href="#forest-介绍" aria-hidden="true">#</a> Forest 介绍</h2><p>Forest 是一个开源的 Java HTTP 客户端框架，它能够将 HTTP 的所有请求信息（包括 URL、Header 以及 Body 等信息）绑定到您自定义的 Interface 方法上，能够通过调用本地接口方法的方式发送 HTTP 请求</p><h3 id="获得奖项" tabindex="-1"><a class="header-anchor" href="#获得奖项" aria-hidden="true">#</a> 获得奖项</h3><ul><li>2021 年度 OSC 中国开源项目评选「最受欢迎项目」</li><li>2022 年度 OSC 中国开源项目评选「最火热中国开源项目社区」</li></ul><h3 id="简单的栗子" tabindex="-1"><a class="header-anchor" href="#简单的栗子" aria-hidden="true">#</a> 简单的栗子</h3><ul><li><strong>声明式接口</strong></li></ul><p>创建一个 interface，并用<code>@Get</code>注解修饰接口方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface MyClient {
    @Get(&quot;http://localhost:8080/hello&quot;)
    String hello();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>@Get</code>注解，将上面的 MyClient 接口中的<code>simpleRequest()</code>方法绑定了一个 HTTP 请求， 其 URL 为<code>http://localhost:8080/hello</code>，并默认使用 GET 方式，且将请求响应的数据以 String 的方式返回给调用者</p><ul><li><strong>编程式接口</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Forest.get(&quot;http://localhost:8080/hello&quot;).execute();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编程式接口则更为简单直接</p><h2 id="v1-5-33-新增特性" tabindex="-1"><a class="header-anchor" href="#v1-5-33-新增特性" aria-hidden="true">#</a> v1.5.33 新增特性</h2><ul><li>增强自定义注解组合</li><li>支持 Socks 代理</li></ul><h3 id="增强自定义注解组合" tabindex="-1"><a class="header-anchor" href="#增强自定义注解组合" aria-hidden="true">#</a> 增强自定义注解组合</h3><p>组合注解是 Forest 提供的自定义注解的一种方式，这种方式只需定义注解自身，已经绑定上需要组合的注解即可，相比通过需要自定义注解声明周期的方式，要方便快捷不少</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
// 组合Header注解
@Headers(&quot;Content-Type: application/json&quot;)
// 组合Address注解
@Address(host = &quot;127.0.0.1&quot;, port = 80)
public @interface MySite {
   // 自定义的 @MySite 注解
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时使用自定义的<code>@MySite</code>的注解，就相当于加上了<code>Content-Type: application/json</code>头和<code>host = &quot;127.0.0.1&quot;, port = 80</code>的根地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// @MySite 等价于
// @Header(&quot;Content-Type: application/json&quot;) + @Address(host = &quot;127.0.0.1&quot;, port = 80)
@MySite
public interface MyClient {
   // ... ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想更灵活一点，想为<code>@MySite</code>注解添加<code>host</code>和<code>port</code>属性，并覆盖<code>@Address</code>注解的<code>host</code>和<code>port</code>属性，这在以前版本是做不到的，而 v1.5.33 版本可以</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
// 加上 @RequestAttributes 注解才能解析注解中定义的属性
@RequestAttributes
// 组合Header注解
@Headers(&quot;Content-Type: application/json&quot;)
// 组合Address注解
@Address
public @interface MySite {

    // 重写 @Address 注解的 host 属性
    @OverrideAttribute
    String host();

    // 重写 @Address 注解的 port 属性
    @OverrideAttribute
    int port();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时就可以通过<code>@MySite</code>注解的<code>host</code>和<code>port</code>属性从外部传入根地址信息了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@MySite(host = &quot;127.0.0.1&quot;, port = 80)
public interface MyClient {
   // ... ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="socks-协议代理" tabindex="-1"><a class="header-anchor" href="#socks-协议代理" aria-hidden="true">#</a> Socks 协议代理</h3><p>在以前版本也可以实现 Socks 代理功能，但需要自定义后端的 OkHttpClient 对象或 Apache 的 HttpClient 对象，然后还要后端 HTTP 框架的 Client 对象绑定自定义的 Socket Connection 部分代码，非常的麻烦。如果再加上 SSL 和用户验证的需求，那更是烦上加烦</p><p>而此次 Forest 直接支持了 Socks 协议代理，分别为声明式接口和编程式接口提供了友好的 Api，让事情变成原本就该有的简单</p><h4 id="声明式-socks-代理" tabindex="-1"><a class="header-anchor" href="#声明式-socks-代理" aria-hidden="true">#</a> 声明式 Socks 代理</h4><p>只要加上<code>@SocksProxy</code>注解，并填上<code>host</code>和<code>port</code>就能轻松实现 Socks 代理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Post(&quot;http://localhost:8080/hello&quot;)
@SocksProxy(host = &quot;127.0.0.1&quot;, port = &quot;1089&quot;)
String simplePostWithSocksProxy();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上用户密码验证也十分简单</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Post(&quot;http://localhost:8080/hello&quot;)
@SocksProxy(host = &quot;127.0.0.1&quot;, port = &quot;1089&quot;, username = &quot;root&quot;, password = &quot;xxxxxx&quot;)
String simplePostWithSocksProxy();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="编程式-socks-代理" tabindex="-1"><a class="header-anchor" href="#编程式-socks-代理" aria-hidden="true">#</a> 编程式 Socks 代理</h4><p>通过静态方法<code>ForestProxy.socks</code>即可快速构建 Socks 协议代理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ForestProxy proxy = ForestProxy.socks(&quot;127.0.0.1&quot;, 3128);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加上用户密码验证</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ForestProxy proxy = ForestProxy.socks(&quot;127.0.0.1&quot;, 3128)
        .username(&quot;foo&quot;)  // 验证用户名
        .password(&quot;bar&quot;); // 验证密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="官网和仓库地址" tabindex="-1"><a class="header-anchor" href="#官网和仓库地址" aria-hidden="true">#</a> 官网和仓库地址</h2><blockquote><h4 id="官网地址" tabindex="-1"><a class="header-anchor" href="#官网地址" aria-hidden="true">#</a> 官网地址:</h4><p>http://forest.dtflyx.com</p><h4 id="gitee-仓库地址" tabindex="-1"><a class="header-anchor" href="#gitee-仓库地址" aria-hidden="true">#</a> Gitee 仓库地址:</h4><p>https://gitee.com/dromara/forest</p><h4 id="github-仓库地址" tabindex="-1"><a class="header-anchor" href="#github-仓库地址" aria-hidden="true">#</a> Github 仓库地址:</h4><p>https://github.com/dromara/forest</p></blockquote><h2 id="本次更新内容" tabindex="-1"><a class="header-anchor" href="#本次更新内容" aria-hidden="true">#</a> 本次更新内容</h2><blockquote><ul><li>feat: #I6MLMD 支持 socks 代理</li><li>feat: 组合注解支持属性重写</li><li>fix: #I7UPBR @Body 注解的数组参数无法正常解析为 JSON 数组</li><li>fix: #I7F3F0 Content-Type 为 application/xml 的情况下，发送 byte 数组数据错误</li><li>fix: #I7QLTS @JSONBody Collectioncodes 报错</li><li>add: SocksProxy 注解</li><li>add: OverrideAttribute 注解</li><li>opt: 优化 URL 更新方式</li><li>update: forest-solon-plugin 升级 solon 为：2.4.0</li></ul></blockquote><figure><img src="`+n+'" alt="" tabindex="0"><figcaption></figcaption></figure>',41),o=[a];function l(r,c){return i(),t("div",null,o)}const v=e(s,[["render",l],["__file","Forest-1.5.33.html.vue"]]);export{v as default};
