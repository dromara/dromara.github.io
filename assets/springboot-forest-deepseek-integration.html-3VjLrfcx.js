import{_ as n,a as e,b as a}from"./springboot-forest-deepseek-integration-2-Bd7faMpN.js";import{_ as i,c as p,a as l,o as t}from"./app-ClKXsWTV.js";const c={};function d(r,s){return t(),p("div",null,[...s[0]||(s[0]=[l(`<h2 id="一-环境要求" tabindex="-1"><a class="header-anchor" href="#一-环境要求"><span>一. 环境要求</span></a></h2><ul><li><p>JDK 8 / 17</p></li><li><p>SpringBoot 2.x / 3.x</p></li><li><p>Forest 1.6.4+</p></li><li><p>Fastjson2</p></li></ul><h3 id="依赖配置" tabindex="-1"><a class="header-anchor" href="#依赖配置"><span>依赖配置</span></a></h3><p>除了 SpringBoot 和 Lombok 等基础框架之外，再加上 Forest 和 Fastjson2 的依赖</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;!-- Forest框架 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.dtflys.forest&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;forest-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.6.4&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- Fastjson2 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;fastjson&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;2.0.53&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二-申请-deepseek-的-api-key" tabindex="-1"><a class="header-anchor" href="#二-申请-deepseek-的-api-key"><span>二. 申请 DeepSeek 的 API Key</span></a></h2><p>打开 DeepSeek 官网，进入到 API Key 的管理页面(https://platform.deepseek.com/api_keys)，就能找到您的 API Key。</p><p>如果还没有 KEY，可以点击页面下方的<code>创建API Key</code>按钮</p><figure><img src="`+n+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>API Keys 页面</p><p>创建完之后，会弹出一个对话框告诉您新生成的 API Key 字符串，然后要及时把它复制下来保存到一个安全的地方。</p><h2 id="三-配置项目" tabindex="-1"><a class="header-anchor" href="#三-配置项目"><span>三. 配置项目</span></a></h2><p>进入 SpringBoot 的配置文件<code>application.yml</code>，加入以下代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Forest 框架配置</span></span>
<span class="line"><span>forest:</span></span>
<span class="line"><span>  connect-timeout: 10000      # 请求连接超时时间</span></span>
<span class="line"><span>  read-timeout: 3600000       # 请求数据读取超时时间，越长越好</span></span>
<span class="line"><span>  variables:</span></span>
<span class="line"><span>    apiKey: YOUR_API_KEY      # 替换为您申请到的 API Key</span></span>
<span class="line"><span>    model: deepseek-reasoner  # DeepSeek 支持的模型，R1 模型</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四-创建声名式接口" tabindex="-1"><a class="header-anchor" href="#四-创建声名式接口"><span>四. 创建声名式接口</span></a></h2><p>Forest 支持以声名式的方式发送 HTTP 请求，以下代码就是将 DeepSeek API 请求以声名式接口的方式进行定义</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public interface DeepSeek {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Post(</span></span>
<span class="line"><span>            url = &quot;https://api.deepseek.com/chat/completions&quot;,</span></span>
<span class="line"><span>            contentType = &quot;application/json&quot;,</span></span>
<span class="line"><span>            headers = &quot;Authorization: Bearer {apiKey}&quot;,</span></span>
<span class="line"><span>            data = &quot;{\\&quot;messages\\&quot;:[{\\&quot;content\\&quot;:\\&quot;{content}\\&quot;,\\&quot;role\\&quot;:\\&quot;user\\&quot;}],\\&quot;model\\&quot;:\\&quot;{model}\\&quot;,\\&quot;stream\\&quot;:true}&quot;)</span></span>
<span class="line"><span>    ForestSSE completions(@Var(&quot;content&quot;) String content);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上的代码意思也很明显，调用该接口方法就会发送一个<code>POST</code>请求，URL 地址为 https://api.deepseek.com/chat/completions</p><p>其中 {apiKey} 和 {model} 的意思为读取配置文件中的 apiKey 字段，{content} 则是读取 @Var(&quot;content&quot;) 注解修饰的参数。 并且请求体数据为官网文档提供的 JSON 字符串，然后通过<code>{变量名}</code>这种字符串模板占位符的形式拼接出您想要的参数。</p><p>接口方法的返回类型为<code>ForestSSE</code>，这是 Forest 框架提供的内置类型，主要用于接受和处理 SSE 事件流消息。</p><h2 id="五-调用接口" tabindex="-1"><a class="header-anchor" href="#五-调用接口"><span>五. 调用接口</span></a></h2><p>在声名式接口创建完之后，可以通过 Spring 的<code>@Resouce</code>注解将此接口实例注入到启动类中，Forest框架会利用动态代理模式自动生成相应的接口代理类实例，并将其自动注入到您所需要调用的类中。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@Resource</span></span>
<span class="line"><span>private DeepSeek deepSeek;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以调用接口进行发送请求的操作了，并设置Lambda表达式来接收和处理返回的 SSE 流式事件消息</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>publicclass DeepSeekExampleApplication implements CommandLineRunner {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // DeepSeek 声名式接口</span></span>
<span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private DeepSeek deepSeek; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void run(String... args) {</span></span>
<span class="line"><span>        // 调用声明式接口方法</span></span>
<span class="line"><span>        deepSeek.completions(&quot;你好，你是谁？&quot;)</span></span>
<span class="line"><span>                .setOnMessage(event -&gt; {</span></span>
<span class="line"><span>                    // 接受和处理 SSE 事件</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        // 获取消息数据，并反序列化为 DeepSeekResult 类</span></span>
<span class="line"><span>                        DeepSeekResult result = event.value(DeepSeekResult.class);</span></span>
<span class="line"><span>                        // 打印 DeepSeekResult 对象中的消息内容</span></span>
<span class="line"><span>                        System.out.print(result.content());</span></span>
<span class="line"><span>                    } catch (Exception e) {</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                })</span></span>
<span class="line"><span>                .listen(SSELinesMode.SINGLE_LINE); // 监听 SSE，并设置为单行消息模式</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            SpringApplication.run(DeepSeekExampleApplication.class, args);</span></span>
<span class="line"><span>        } catch (Throwable th) {</span></span>
<span class="line"><span>            th.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，DeepSeekResult 是根据返回的消息格式定义的数据类，具体代码如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@Data</span></span>
<span class="line"><span>publicclass DeepSeekResult {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String object;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer created;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String model;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @JSONField(name = &quot;system_fingerprint&quot;)</span></span>
<span class="line"><span>    private String systemFingerprint;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private List&lt;JSONObject&gt; choices;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取消息中的 choices[0].delta.content</span></span>
<span class="line"><span>    public String content() {</span></span>
<span class="line"><span>        List&lt;JSONObject&gt; choices = getChoices();</span></span>
<span class="line"><span>        if (CollectionUtil.isNotEmpty(choices)) {</span></span>
<span class="line"><span>            JSONObject chooseJson = choices.get(0);</span></span>
<span class="line"><span>            DeepSeekResultChoice choice = chooseJson.toJavaObject(DeepSeekResultChoice.class);</span></span>
<span class="line"><span>            return choice.getDelta().getContent();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return&quot;&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他的数据类包括 DeepSeekResultChoice 类也都类似。如果要看具体代码，在文章末尾会提供代码仓库地址。</p><h2 id="六-应答测试" tabindex="-1"><a class="header-anchor" href="#六-应答测试"><span>六. 应答测试</span></a></h2><p>调用方法写完之后，我们就可以跑一下代码看看了，点击 Run 之后可以看到控制台日志会打印以下内容</p><figure><img src="`+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>测试日志</p><p>日志上半部分<code>POST https://api.deepseek.com/chat/completions HTTPS [SSE]</code>这类信息为 Forest 的请求日志，会告诉您发出去的 HTTP 请求信息中有些什么数据和参数。</p><p>而下半部分 “您好！我是由中国的深度求索（DeepSeek）公司开发的智能助手DeepSeek-R1...” 自然就是 DeepSeek 的回答了。</p><h2 id="七-思维链" tabindex="-1"><a class="header-anchor" href="#七-思维链"><span>七. 思维链</span></a></h2><p>以上的代码案例，只会返回 DeepSeek 的回答内容，不包含他的思考过程，哪怕模型是<code>DeepSeek-R1</code>也一样。如果要打印出思维链，就要修改一下代码</p><p>首先要修改 DeepSeekResult 类中的 content() 方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@Data</span></span>
<span class="line"><span>publicclass DeepSeekResult {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String object;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer created;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String model;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @JSONField(name = &quot;system_fingerprint&quot;)</span></span>
<span class="line"><span>    private String systemFingerprint;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private List&lt;JSONObject&gt; choices;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取消息中的 choices[0].delta.reasoning_content</span></span>
<span class="line"><span>    // 或 choices[0].delta.content</span></span>
<span class="line"><span>    // 是否为思维内容，通过 DeepSeekContent.isReasoning 来标识</span></span>
<span class="line"><span>    public DeepSeekContent content() {</span></span>
<span class="line"><span>        List&lt;JSONObject&gt; choices = getChoices();</span></span>
<span class="line"><span>        if (CollectionUtil.isNotEmpty(choices)) {</span></span>
<span class="line"><span>            JSONObject chooseJson = choices.get(0);</span></span>
<span class="line"><span>            DeepSeekResultChoice choice = chooseJson.toJavaObject(DeepSeekResultChoice.class);</span></span>
<span class="line"><span>            String reasoningContent = choice.getDelta().getReasoningContent();</span></span>
<span class="line"><span>            // 判断是否存在 reasoningContent，存在就是思维链内容，否则就是存粹的回答内容</span></span>
<span class="line"><span>            if (StringUtils.isNotEmpty(reasoningContent)) {</span></span>
<span class="line"><span>                returnnew DeepSeekContent(true, reasoningContent);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            returnnew DeepSeekContent(false, choice.getDelta().getContent());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        returnnew DeepSeekContent();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加 DeepSeekContent 类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@Data</span></span>
<span class="line"><span>publicclass DeepSeekContent {</span></span>
<span class="line"><span>    // 是否为思考过程内容</span></span>
<span class="line"><span>    privateboolean reasoning = false;</span></span>
<span class="line"><span>    // DeepSeek 回答的具体内容</span></span>
<span class="line"><span>    private String content = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public DeepSeekContent() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public DeepSeekContent(boolean reasoning, String content) {</span></span>
<span class="line"><span>        this.reasoning = reasoning;</span></span>
<span class="line"><span>        this.content = content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，修改接口的调用部分</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>publicclass DeepSeekExampleApplication implements CommandLineRunner {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // DeepSeek 声名式接口</span></span>
<span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private DeepSeek deepSeek; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void run(String... args) {</span></span>
<span class="line"><span>        // 标志位：是否为第一次接收到到思维链内容</span></span>
<span class="line"><span>        AtomicBoolean isFirstReasoning = new AtomicBoolean(false);</span></span>
<span class="line"><span>        // 调用声明式接口方法</span></span>
<span class="line"><span>        deepSeek.completions(&quot;1+1等于几？&quot;)</span></span>
<span class="line"><span>                .setOnMessage(event -&gt; {</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        DeepSeekResult result = event.value(DeepSeekResult.class);</span></span>
<span class="line"><span>                        DeepSeekContent content = result.content();</span></span>
<span class="line"><span>                        // 通过 CAS 判断是否第一次接收到到思维链内容</span></span>
<span class="line"><span>                        // 如果是，则打印出&lt;思维链&gt;标签</span></span>
<span class="line"><span>                        if (content.isReasoning() &amp;&amp; isFirstReasoning.compareAndSet(false, true)) {</span></span>
<span class="line"><span>                            System.out.println(&quot;&lt;思维链&gt;&quot;);</span></span>
<span class="line"><span>                            System.out.print(content.getContent());</span></span>
<span class="line"><span>                        } elseif (!content.isReasoning() &amp;&amp; isFirstReasoning.compareAndSet(true, false)) {</span></span>
<span class="line"><span>                            // 当 isFirstReasoning 由 true 转为 false</span></span>
<span class="line"><span>                            // 则表明消息从思维链内容转向正式回答内容</span></span>
<span class="line"><span>                            System.out.print(content.getContent());</span></span>
<span class="line"><span>                            System.out.println(&quot;\\n&lt;/思维链&gt;\\n&quot;);</span></span>
<span class="line"><span>                        } else {</span></span>
<span class="line"><span>                            // 打印正常的思维链或正式回答内容</span></span>
<span class="line"><span>                            System.out.print(Opt.ofBlankAble(content.getContent()).orElse(&quot;&quot;));</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    } catch (Exception e) {</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                })</span></span>
<span class="line"><span>                .listen(SSELinesMode.SINGLE_LINE);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            SpringApplication.run(DeepSeekExampleApplication.class, args);</span></span>
<span class="line"><span>        } catch (Throwable th) {</span></span>
<span class="line"><span>            th.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八-思维链消息测试" tabindex="-1"><a class="header-anchor" href="#八-思维链消息测试"><span>八. 思维链消息测试</span></a></h2><p>接下来就可以运行程序测试了，看看日志中是否包含了思维链的过程</p><figure><img src="`+a+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>思维链日志.png</p><p>从日志中可以看出，程序正常运行了，其中被包裹在<code>&lt;思维链&gt;</code>和<code>&lt;/思维链&gt;</code>标签中间的部分就是 DeepSeek 告诉我们的思维过程。 而在<code>&lt;/思维链&gt;</code>结束标签之后的文字就是他的正式回答内容。</p><h2 id="九-错误处理" tabindex="-1"><a class="header-anchor" href="#九-错误处理"><span>九. 错误处理</span></a></h2><p>本文案例调用的是 DeepSeek 官方的 API。由于众所周知的原因，调用接口时极有可能发生<code>401</code>等网络错误。</p><p>遇到这种请求，加一个拦截器就完事了</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>// Forest 的 SSE 请求拦截器</span></span>
<span class="line"><span>publicclass DeepSeekInterceptor implements SSEInterceptor {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接受到请求响应时会自动调用该方法</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public ResponseResult onResponse(ForestRequest request, ForestResponse response) {</span></span>
<span class="line"><span>        // 判断请求是否发生错误，如 401、404 等等</span></span>
<span class="line"><span>        if (response.isError()) {</span></span>
<span class="line"><span>            // 如有错，就打印“服务端繁忙，请稍后再试”</span></span>
<span class="line"><span>            System.out.println(&quot;服务端繁忙，请稍后再试&quot;);</span></span>
<span class="line"><span>            return success();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return proceed();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，将拦截器绑定到接口上</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>// 为整个接口绑定拦截器</span></span>
<span class="line"><span>@BaseRequest(interceptor = DeepSeekInterceptor.class)</span></span>
<span class="line"><span>public interface DeepSeek {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Post(</span></span>
<span class="line"><span>            url = &quot;https://api.deepseek.com/chat/completions&quot;,</span></span>
<span class="line"><span>            contentType = &quot;application/json&quot;,</span></span>
<span class="line"><span>            headers = &quot;Authorization: Bearer {apiKey}&quot;,</span></span>
<span class="line"><span>            data = &quot;{\\&quot;messages\\&quot;:[{\\&quot;content\\&quot;:\\&quot;{content}\\&quot;,\\&quot;role\\&quot;:\\&quot;user\\&quot;}],\\&quot;model\\&quot;:\\&quot;{model}\\&quot;,\\&quot;stream\\&quot;:true}&quot;)</span></span>
<span class="line"><span>    ForestSSE completions(@Var(&quot;content&quot;) String content);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十-总结" tabindex="-1"><a class="header-anchor" href="#十-总结"><span>十. 总结</span></a></h2><p>可以看到，通过 Forest 这种声名式的形式来对接 DeepSeek API，相比于 OkHttp 和 HttpClient 有很多明显的好处。除了代码简洁，容易实现之外，更重要的是声名式代码天然更容易解耦。文本代码很自然的就实现了在参数配置、HTTP请求参数、以及接口调用的业务逻辑之间实现了代码解耦。如果要修改 API Key 或者模型，直接该配置文件就行。如果要修改 HTTP 的 URL 或参数，可以直接改声名式接口，而不会影响到调用接口的业务代码。而且可以很自然地将 DeepSeek API 的 HTTP 代码统一放到一个接口类中，方便管理，而且请求中的 URL、请求头、请求体参数都都一目了然。</p><p><strong>代码仓库地址</strong>：https://gitee.com/dromara/forest/tree/master/forest-examples/example-deepseek</p>`,56)])])}const u=i(c,[["render",d]]),m=JSON.parse('{"path":"/zh/blog/springboot-forest-deepseek-integration.html","title":"如何使用Forest方便快捷地在SpringBoot项目中对接DeepSeek","lang":"zh-CN","frontmatter":{"title":"如何使用Forest方便快捷地在SpringBoot项目中对接DeepSeek","author":"2025年03月07日 09:58","date":"2025-03-07T00:00:00.000Z","cover":"/assets/img/blog/springboot-forest-deepseek-integration-0.png","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Forest方便快捷地在SpringBoot项目中对接DeepSeek\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/springboot-forest-deepseek-integration-0.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/springboot-forest-deepseek-integration-1.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/springboot-forest-deepseek-integration-2.png\\"],\\"datePublished\\":\\"2025-03-07T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-06T11:40:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"2025年03月07日 09:58\\"}]}"],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/blog/springboot-forest-deepseek-integration.html"}],["meta",{"property":"og:title","content":"如何使用Forest方便快捷地在SpringBoot项目中对接DeepSeek"}],["meta",{"property":"og:description","content":"一. 环境要求 JDK 8 / 17 SpringBoot 2.x / 3.x Forest 1.6.4+ Fastjson2 依赖配置 除了 SpringBoot 和 Lombok 等基础框架之外，再加上 Forest 和 Fastjson2 的依赖 二. 申请 DeepSeek 的 API Key 打开 DeepSeek 官网，进入到 API Ke..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/springboot-forest-deepseek-integration-0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-09-06T11:40:08.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/springboot-forest-deepseek-integration-0.png"}],["meta",{"name":"twitter:image:alt","content":"如何使用Forest方便快捷地在SpringBoot项目中对接DeepSeek"}],["meta",{"property":"article:author","content":"2025年03月07日 09:58"}],["meta",{"property":"article:published_time","content":"2025-03-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-06T11:40:08.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://vuepress-theme-hope-docs-demo.netlify.app/blog/springboot-forest-deepseek-integration.html"}],["meta",{"name":"博客"}]],"description":"一. 环境要求 JDK 8 / 17 SpringBoot 2.x / 3.x Forest 1.6.4+ Fastjson2 依赖配置 除了 SpringBoot 和 Lombok 等基础框架之外，再加上 Forest 和 Fastjson2 的依赖 二. 申请 DeepSeek 的 API Key 打开 DeepSeek 官网，进入到 API Ke..."},"git":{"createdTime":1756905908000,"updatedTime":1757158808000,"contributors":[{"name":"kaku","username":"kaku","email":"1092804319@qq.com","commits":2,"url":"https://github.com/kaku"}]},"readingTime":{"minutes":6.76,"words":2028},"filePathRelative":"zh/blog/springboot-forest-deepseek-integration.md","autoDesc":true}');export{u as comp,m as data};
