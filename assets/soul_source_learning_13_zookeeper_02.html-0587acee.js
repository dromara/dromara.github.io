import{_ as t,a as p,b as e,c as o,d as c,e as i,f as l,g as u}from"./zk14-b2f335c3.js";import{_ as k,r,o as d,c as m,a as n,b as s,e as v,f as b}from"./app-73779642.js";const g={},f=n("h4",{id:"启动-admin-与网关。-admin-操作-使用-zookeeper-同步数据到网关",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#启动-admin-与网关。-admin-操作-使用-zookeeper-同步数据到网关","aria-hidden":"true"},"#"),s(" 启动 admin，与网关。 admin 操作，使用 zookeeper 同步数据到网关")],-1),h={href:"https://dromara.org/blog/soul_source_learning_13_zookeeper_01",target:"_blank",rel:"noopener noreferrer"},y=b('<p>数据变化会发布 DataChangedEvent 事件，监听事件将数据同步至 zookeeper。 本篇接着上一篇继续跟踪源码分析 zookeeper 同步数据到网关原理：</p><ul><li>soul-admin 变更网关数据，跟踪数据同步过程。</li><li>soul-bootstrap 如何获取 zookeeper 数据的，如何感知网关数据变化的。</li></ul><h6 id="一、soul-admin-变更网关数据-跟踪数据同步过程" tabindex="-1"><a class="header-anchor" href="#一、soul-admin-变更网关数据-跟踪数据同步过程" aria-hidden="true">#</a> 一、soul-admin 变更网关数据，跟踪数据同步过程</h6><p>1、在网关后台尝试更改 divide 插件状态，debug 跟踪。</p><figure><img src="'+t+'" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><p>2、插件更新后会发布一个 DataChangedEvent 事件</p><figure><img src="'+p+'" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><p>3、org.dromara.soul.admin.listener.DataChangedEventDispatcher --&gt; onApplicationEvent() 负责监听事件</p><figure><img src="'+e+'" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><p>4、org.dromara.soul.admin.listener.zookeeper.ZookeeperDataChangedListener 负责同步数据至 zookeeper</p><figure><img src="'+o+`" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><h6 id="二、soul-bootstrap-如何获取-zookeeper-数据的-如何感知网关数据变化的。" tabindex="-1"><a class="header-anchor" href="#二、soul-bootstrap-如何获取-zookeeper-数据的-如何感知网关数据变化的。" aria-hidden="true">#</a> 二、soul-bootstrap 如何获取 zookeeper 数据的，如何感知网关数据变化的。</h6><p>1、soul-bootstrap 依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.dromara<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>soul-spring-boot-starter-sync-data-zookeeper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${project.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、soul-bootstrap 启动后会自动注入 org.dromara.soul.spring.boot.sync.data.zookeeper.ZookeeperSyncDataConfiguration</p><p>读取 Zookeeper 配置向容器中注入 ZkClient。</p><p>SyncDataService 向容器注入数据同步服务 bean，从 Spring 容器中获取，ZkClient（zookeeper 客户端）， pluginSubscriber（插件数据订阅）、metaSubscribers （元数据订阅）、authSubscribers（权限订阅）。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ZookeeperSyncDataConfiguration</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Sync data service sync data service.
     * <span class="token keyword">@param</span> <span class="token parameter">zkClient</span>          the zk client
     * <span class="token keyword">@param</span> <span class="token parameter">pluginSubscriber</span> the plugin subscriber
     * <span class="token keyword">@param</span> <span class="token parameter">metaSubscribers</span>   the meta subscribers
     * <span class="token keyword">@param</span> <span class="token parameter">authSubscribers</span>   the auth subscribers
     * <span class="token keyword">@return</span> the sync data service
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SyncDataService</span> <span class="token function">syncDataService</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ZkClient</span><span class="token punctuation">&gt;</span></span> zkClient<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PluginDataSubscriber</span><span class="token punctuation">&gt;</span></span> pluginSubscriber<span class="token punctuation">,</span>
                                           <span class="token keyword">final</span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">MetaDataSubscriber</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> metaSubscribers<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">AuthDataSubscriber</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> authSubscribers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;you use zookeeper sync soul data.......&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ZookeeperSyncDataService</span><span class="token punctuation">(</span>zkClient<span class="token punctuation">.</span><span class="token function">getIfAvailable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> pluginSubscriber<span class="token punctuation">.</span><span class="token function">getIfAvailable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                metaSubscribers<span class="token punctuation">.</span><span class="token function">getIfAvailable</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token operator">::</span><span class="token function">emptyList</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authSubscribers<span class="token punctuation">.</span><span class="token function">getIfAvailable</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token operator">::</span><span class="token function">emptyList</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * register zkClient in spring ioc.
     * <span class="token keyword">@param</span> <span class="token parameter">zookeeperConfig</span> the zookeeper configuration
     * <span class="token keyword">@return</span> ZkClient <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token class-name">ZkClient</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ZkClient</span> <span class="token function">zkClient</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ZookeeperConfig</span> zookeeperConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ZkClient</span><span class="token punctuation">(</span>zookeeperConfig<span class="token punctuation">.</span><span class="token function">getUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zookeeperConfig<span class="token punctuation">.</span><span class="token function">getSessionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zookeeperConfig<span class="token punctuation">.</span><span class="token function">getConnectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService 初始化，也就是 soul-bootstrap 启动后就会从 zookeeper 获取数据，同步至内存。</p><ul><li>watcherData()--&gt; watcherAll() --&gt; watcherPlugin() --&gt; cachePluginData()。</li><li>zkClient.subscribeDataChanges() 监听 当前节点和子节点的内容修改、删除。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ZookeeperSyncDataService</span> <span class="token keyword">implements</span> <span class="token class-name">SyncDataService</span><span class="token punctuation">,</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ZkClient</span> zkClient<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">PluginDataSubscriber</span> pluginDataSubscriber<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MetaDataSubscriber</span><span class="token punctuation">&gt;</span></span> metaDataSubscribers<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AuthDataSubscriber</span><span class="token punctuation">&gt;</span></span> authDataSubscribers<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * Instantiates a new Zookeeper cache manager.
     * <span class="token keyword">@param</span> <span class="token parameter">zkClient</span>             the zk client
     * <span class="token keyword">@param</span> <span class="token parameter">pluginDataSubscriber</span> the plugin data subscriber
     * <span class="token keyword">@param</span> <span class="token parameter">metaDataSubscribers</span>  the meta data subscribers
     * <span class="token keyword">@param</span> <span class="token parameter">authDataSubscribers</span>  the auth data subscribers
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ZookeeperSyncDataService</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ZkClient</span> zkClient<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">PluginDataSubscriber</span> pluginDataSubscriber<span class="token punctuation">,</span>
                                    <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MetaDataSubscriber</span><span class="token punctuation">&gt;</span></span> metaDataSubscribers<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AuthDataSubscriber</span><span class="token punctuation">&gt;</span></span> authDataSubscribers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>zkClient <span class="token operator">=</span> zkClient<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pluginDataSubscriber <span class="token operator">=</span> pluginDataSubscriber<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>metaDataSubscribers <span class="token operator">=</span> metaDataSubscribers<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>authDataSubscribers <span class="token operator">=</span> authDataSubscribers<span class="token punctuation">;</span>
        <span class="token function">watcherData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">watchAppAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">watchMetaData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">watcherData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token keyword">final</span> <span class="token class-name">String</span> pluginParent <span class="token operator">=</span> <span class="token class-name">ZkPathConstants</span><span class="token punctuation">.</span><span class="token constant">PLUGIN_PARENT</span><span class="token punctuation">;</span>
	    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> pluginZKs <span class="token operator">=</span> <span class="token function">zkClientGetChildren</span><span class="token punctuation">(</span>pluginParent<span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> pluginName <span class="token operator">:</span> pluginZKs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	        <span class="token function">watcherAll</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token punctuation">}</span>
	    zkClient<span class="token punctuation">.</span><span class="token function">subscribeChildChanges</span><span class="token punctuation">(</span>pluginParent<span class="token punctuation">,</span> <span class="token punctuation">(</span>parentPath<span class="token punctuation">,</span> currentChildren<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
	        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>currentChildren<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> pluginName <span class="token operator">:</span> currentChildren<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	                <span class="token function">watcherAll</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	            <span class="token punctuation">}</span>
	        <span class="token punctuation">}</span>
	    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">watcherPlugin</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> pluginName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token class-name">String</span> pluginPath <span class="token operator">=</span> <span class="token class-name">ZkPathConstants</span><span class="token punctuation">.</span><span class="token function">buildPluginPath</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>zkClient<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>pluginPath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	        zkClient<span class="token punctuation">.</span><span class="token function">createPersistent</span><span class="token punctuation">(</span>pluginPath<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token punctuation">}</span>
	    <span class="token function">cachePluginData</span><span class="token punctuation">(</span>zkClient<span class="token punctuation">.</span><span class="token function">readData</span><span class="token punctuation">(</span>pluginPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token function">subscribePluginDataChanges</span><span class="token punctuation">(</span>pluginPath<span class="token punctuation">,</span> pluginName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、debug 过程</p><figure><img src="`+c+`" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><h6 id="三、soul-bootstrap-是如何感知网关数据变化的" tabindex="-1"><a class="header-anchor" href="#三、soul-bootstrap-是如何感知网关数据变化的" aria-hidden="true">#</a> 三、soul-bootstrap 是如何感知网关数据变化的</h6><p>1、org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService cacheRuleData 方法上打上断点，更新插件规则，观察是否会进入此断点。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">cacheRuleData</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">RuleData</span> ruleData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>ruleData<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>data <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>pluginDataSubscriber<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">onRuleSubscribe</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、soul-admin 后台操作更改 divide 插件规则，首先 soul-admin 会发布事件，并监听事件同步更新数据至 zookeeper。</p><figure><img src="`+i+`" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><p>3、soul-bootstrap 确实收到了插件数据的更新，根据 Soul 官网介绍的&quot;zookeeper 的同步原理&quot;这里主要是依赖 zookeeper 的 watch 机制。</p><p>org.dromara.soul.sync.data.zookeeper.ZookeeperSyncDataService 类：</p><p>zkClient.subscribeDataChanges() 监听 当前节点和子节点的内容修改、删除。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>zkClient<span class="token punctuation">.</span><span class="token function">subscribeChildChanges</span><span class="token punctuation">(</span>groupParentPath<span class="token punctuation">,</span> <span class="token punctuation">(</span>parentPath<span class="token punctuation">,</span> currentChildren<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>currentChildren<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> addSubscribePath <span class="token operator">=</span> <span class="token function">addSubscribePath</span><span class="token punctuation">(</span>childrenList<span class="token punctuation">,</span> currentChildren<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Get the newly added node data and subscribe to that node</span>
        addSubscribePath<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>addPath <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> realPath <span class="token operator">=</span> <span class="token function">buildRealPath</span><span class="token punctuation">(</span>parentPath<span class="token punctuation">,</span> addPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">cacheRuleData</span><span class="token punctuation">(</span>zkClient<span class="token punctuation">.</span><span class="token function">readData</span><span class="token punctuation">(</span>realPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> realPath<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">subscribeRuleDataChanges</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">subscribeRuleDataChanges</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    zkClient<span class="token punctuation">.</span><span class="token function">subscribeDataChanges</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IZkDataListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleDataChange</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> dataPath<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">cacheRuleData</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">RuleData</span><span class="token punctuation">)</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleDataDeleted</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> dataPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">unCacheRuleData</span><span class="token punctuation">(</span>dataPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+'" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure><h6 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结" aria-hidden="true">#</a> 四、总结</h6><figure><img src="'+u+'" alt="在这里插入图片描述" tabindex="0"><figcaption>在这里插入图片描述</figcaption></figure>',35);function w(S,D){const a=r("ExternalLinkIcon");return d(),m("div",null,[f,n("p",null,[n("a",h,[s("上一篇"),v(a)]),s("，通过 soul-admin 启动过程为入口，分析了 soul-admin 启动就会同步网关数据 rule、metaData、selector、plugin 等到 zookeeper。")]),y])}const _=k(g,[["render",w],["__file","soul_source_learning_13_zookeeper_02.html.vue"]]);export{_ as default};