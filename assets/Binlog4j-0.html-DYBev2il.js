import{_ as s,c as a,a as e,o as i}from"./app-BmgeuuSW.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍"><span>项目介绍</span></a></h2><p>Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。</p><h2 id="项目特性" tabindex="-1"><a class="header-anchor" href="#项目特性"><span>项目特性</span></a></h2><ul><li>集群模式, 通过集群部署的方式，保证服务高可用。</li><li>宕机续读, 避免宕机期间造成数据丢失。</li><li>数据转换, 基于泛型封装 BinlogEvent 的序列化数据。</li><li>兼容 传统项目 与 Spring Boot / Cloud 项目。</li><li>兼容 Spring Boot 2.x 与 Spring Boot 3.x 版本。</li></ul><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h2><p>包括但不限于（1）数据同步（2）实时计算（3）数据审计（4）数据分析</p><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装"><span>下载安装</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>   &lt;groupId&gt;com.gitee.Jmysy&lt;/groupId&gt;</span></span>
<span class="line"><span>   &lt;artifactId&gt;binlog4j-core&lt;/artifactId&gt;</span></span>
<span class="line"><span>   &lt;version&gt;latest.version&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用"><span>简单使用</span></a></h2><p>通过 BinlogClient 创建客户端，IBinlogEventHandler 处理事件通知，该接口支持泛型，数据将遵循驼峰格式封装。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class BootStrap {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BinlogClientConfig clientConfig = new BinlogClientConfig();</span></span>
<span class="line"><span>        clientConfig.setHost(&quot;127.0.0.1&quot;);</span></span>
<span class="line"><span>        clientConfig.setPort(3306);</span></span>
<span class="line"><span>        clientConfig.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span>        clientConfig.setPassword(&quot;taoren@123&quot;);</span></span>
<span class="line"><span>        clientConfig.setServerId(1990);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        IBinlogClient binlogClient = new BinlogClient(clientConfig);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        binlogClient.registerEventHandler(&quot;database&quot;, &quot;table&quot;, new IBinlogEventHandler() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onInsert(BinlogEvent event) {</span></span>
<span class="line"><span>                System.out.println(&quot;插入数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onUpdate(BinlogEvent event) {</span></span>
<span class="line"><span>                System.out.println(&quot;修改数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onDelete(BinlogEvent event) {</span></span>
<span class="line"><span>                System.out.println(&quot;删除数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        binlogClient.connect();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级特性" tabindex="-1"><a class="header-anchor" href="#高级特性"><span>高级特性</span></a></h2><p>通过 Persistence 配置为 true 启用宕机续读功能, Binlog4j 会将 binlog 的 filename 与 position 记录到 redis, 同时你需要提供 Redis 配置。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class BootStrap {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        RedisConfig redisConfig = new RedisConfig();</span></span>
<span class="line"><span>        redisConfig.setHost(&quot;127.0.0.1&quot;);</span></span>
<span class="line"><span>        redisConfig.setPort(6379);</span></span>
<span class="line"><span>        redisConfig.setPassword(&quot;taoren@123&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BinlogClientConfig clientConfig = new BinlogClientConfig();</span></span>
<span class="line"><span>        clientConfig.setHost(&quot;127.0.0.1&quot;);</span></span>
<span class="line"><span>        clientConfig.setPort(3306);</span></span>
<span class="line"><span>        clientConfig.setUsername(&quot;root&quot;);</span></span>
<span class="line"><span>        clientConfig.setPassword(&quot;taoren@123&quot;);</span></span>
<span class="line"><span>        clientConfig.setServerId(1990);</span></span>
<span class="line"><span>        clientConfig.setRedisConfig(redisConfig);</span></span>
<span class="line"><span>        clientConfig.setPersistence(true);</span></span>
<span class="line"><span>        clientConfig.setMode(BinlogClientMode.cluster);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BinlogClient binlogClient = new BinlogClient(clientConfig);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        binlogClient.registerEventHandler(&quot;database&quot;, &quot;table&quot;, new IBinlogEventHandler&lt;User&gt;() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onInsert(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>                System.out.println(&quot;插入数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onUpdate(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>                System.out.println(&quot;修改数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void onDelete(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>                System.out.println(&quot;删除数据:{}&quot;, event.getData());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        binlogClient.connect();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-spring-boot-集成" tabindex="-1"><a class="header-anchor" href="#在-spring-boot-集成"><span>在 Spring Boot 集成</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.gitee.Jmysy&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;binlog4j-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;latest.version&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，在 application.yml 或 application.properties 中填写 Binlog4j 配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  binlog4j:</span></span>
<span class="line"><span>    redis-config:</span></span>
<span class="line"><span>      host: 127.0.0.1</span></span>
<span class="line"><span>      port: 6379</span></span>
<span class="line"><span>      password: taoren@123</span></span>
<span class="line"><span>    client-configs:</span></span>
<span class="line"><span>      master:</span></span>
<span class="line"><span>        username: root</span></span>
<span class="line"><span>        password: taoren@123</span></span>
<span class="line"><span>        host: 127.0.0.1</span></span>
<span class="line"><span>        port: 3306</span></span>
<span class="line"><span>        serverId: 1990</span></span>
<span class="line"><span>      slave:</span></span>
<span class="line"><span>        username: root</span></span>
<span class="line"><span>        password: taoren@123</span></span>
<span class="line"><span>        host: 127.0.0.1</span></span>
<span class="line"><span>        port: 3306</span></span>
<span class="line"><span>        serverId: 1991</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单表监听" tabindex="-1"><a class="header-anchor" href="#单表监听"><span>单表监听</span></a></h2><p>使用 @BinlogSubscriber 注解, 指定 IBinlogEventHandler 需要注册到哪个客户端, 并且指定监听的 database 与 table。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@BinlogSubscriber(clientName = &quot;master&quot;, database = &quot;pear-admin&quot;, table =&quot;sys_user&quot;)</span></span>
<span class="line"><span>public class UserEventHandler implements IBinlogEventHandler&lt;User&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onInsert(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;插入数据：&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onUpdate(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;修改数据:&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onDelete(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;删除数据:&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂监听" tabindex="-1"><a class="header-anchor" href="#复杂监听"><span>复杂监听</span></a></h2><p>@BinlogSubscriber 注解 database 与 table 属性支持 Pattern 匹配, IBinlogEventHandler 在不指定泛型的情况下, event.getData() 为 Map&lt;String, Object&gt; 类型, 用于兼容不同表的数据结构。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@BinlogSubscriber(clientName = &quot;master&quot;, database = &quot;pear-admin&quot;, table =&quot;sys_user&quot;)</span></span>
<span class="line"><span>public class UserEventHandler implements IBinlogEventHandler&lt;User&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onInsert(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;插入数据：&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onUpdate(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;修改数据:&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onDelete(BinlogEvent&lt;User&gt; event) {</span></span>
<span class="line"><span>        System.out.println(&quot;删除数据:&quot; + event.getData());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接"><span>相关链接</span></a></h2><p>Gitee: https://gitee.com/dromara/binlog4j</p>`,26)]))}const r=s(l,[["render",p],["__file","Binlog4j-0.html.vue"]]),c=JSON.parse('{"path":"/zh/news/Binlog4j-0.html","title":"轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区","lang":"zh-CN","frontmatter":{"title":"轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区","author":"就眠儀式","date":"2023-08-31T00:00:00.000Z","cover":"/assets/img/news/Binlog4j-0.jpg","head":[["meta",{"name":"新闻"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/Binlog4j-0.html"}],["meta",{"property":"og:title","content":"轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区"}],["meta",{"property":"og:description","content":"项目介绍 Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。 项目特性 集群模式, 通过集群部署的方式，保证服务高可用。 宕机续读, 避免宕机期间造成数据丢失。 数据转换, 基于泛型封装 BinlogEvent 的序列化数据。 兼容 传统项目 与 Spring Boot / Cloud 项目。 兼容 Spring Bo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Binlog4j-0.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-23T05:33:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Binlog4j-0.jpg"}],["meta",{"name":"twitter:image:alt","content":"轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区"}],["meta",{"property":"article:author","content":"就眠儀式"}],["meta",{"property":"article:published_time","content":"2023-08-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-23T05:33:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Binlog4j-0.jpg\\"],\\"datePublished\\":\\"2023-08-31T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-23T05:33:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"就眠儀式\\"}]}"]],"description":"项目介绍 Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。 项目特性 集群模式, 通过集群部署的方式，保证服务高可用。 宕机续读, 避免宕机期间造成数据丢失。 数据转换, 基于泛型封装 BinlogEvent 的序列化数据。 兼容 传统项目 与 Spring Boot / Cloud 项目。 兼容 Spring Bo..."},"headers":[{"level":2,"title":"项目介绍","slug":"项目介绍","link":"#项目介绍","children":[]},{"level":2,"title":"项目特性","slug":"项目特性","link":"#项目特性","children":[]},{"level":2,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[]},{"level":2,"title":"下载安装","slug":"下载安装","link":"#下载安装","children":[]},{"level":2,"title":"简单使用","slug":"简单使用","link":"#简单使用","children":[]},{"level":2,"title":"高级特性","slug":"高级特性","link":"#高级特性","children":[]},{"level":2,"title":"在 Spring Boot 集成","slug":"在-spring-boot-集成","link":"#在-spring-boot-集成","children":[]},{"level":2,"title":"单表监听","slug":"单表监听","link":"#单表监听","children":[]},{"level":2,"title":"复杂监听","slug":"复杂监听","link":"#复杂监听","children":[]},{"level":2,"title":"相关链接","slug":"相关链接","link":"#相关链接","children":[]}],"git":{"createdTime":1698039180000,"updatedTime":1698039180000,"contributors":[{"name":"Cici","username":"Cici","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cici"}]},"readingTime":{"minutes":2.27,"words":682},"filePathRelative":"zh/news/Binlog4j-0.md","localizedDate":"2023年8月31日","autoDesc":true,"excerpt":"<h2>项目介绍</h2>\\n<p>Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。</p>\\n<h2>项目特性</h2>\\n<ul>\\n<li>集群模式, 通过集群部署的方式，保证服务高可用。</li>\\n<li>宕机续读, 避免宕机期间造成数据丢失。</li>\\n<li>数据转换, 基于泛型封装 BinlogEvent 的序列化数据。</li>\\n<li>兼容 传统项目 与 Spring Boot / Cloud 项目。</li>\\n<li>兼容 Spring Boot 2.x 与 Spring Boot 3.x 版本。</li>\\n</ul>\\n<h2>应用场景</h2>"}');export{r as comp,c as data};
