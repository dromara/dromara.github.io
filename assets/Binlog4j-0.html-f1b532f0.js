import{_ as e,o as n,c as i,f as l}from"./app-b61402ca.js";const s={},d=l(`<h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍" aria-hidden="true">#</a> 项目介绍</h2><p>Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。</p><h2 id="项目特性" tabindex="-1"><a class="header-anchor" href="#项目特性" aria-hidden="true">#</a> 项目特性</h2><ul><li>集群模式, 通过集群部署的方式，保证服务高可用。</li><li>宕机续读, 避免宕机期间造成数据丢失。</li><li>数据转换, 基于泛型封装 BinlogEvent 的序列化数据。</li><li>兼容 传统项目 与 Spring Boot / Cloud 项目。</li><li>兼容 Spring Boot 2.x 与 Spring Boot 3.x 版本。</li></ul><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><p>包括但不限于（1）数据同步（2）实时计算（3）数据审计（4）数据分析</p><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装" aria-hidden="true">#</a> 下载安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
   &lt;groupId&gt;com.gitee.Jmysy&lt;/groupId&gt;
   &lt;artifactId&gt;binlog4j-core&lt;/artifactId&gt;
   &lt;version&gt;latest.version&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用" aria-hidden="true">#</a> 简单使用</h2><p>通过 BinlogClient 创建客户端，IBinlogEventHandler 处理事件通知，该接口支持泛型，数据将遵循驼峰格式封装。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class BootStrap {

    public static void main(String[] args) {

        BinlogClientConfig clientConfig = new BinlogClientConfig();
        clientConfig.setHost(&quot;127.0.0.1&quot;);
        clientConfig.setPort(3306);
        clientConfig.setUsername(&quot;root&quot;);
        clientConfig.setPassword(&quot;taoren@123&quot;);
        clientConfig.setServerId(1990);

        IBinlogClient binlogClient = new BinlogClient(clientConfig);

        binlogClient.registerEventHandler(&quot;database&quot;, &quot;table&quot;, new IBinlogEventHandler() {

            @Override
            public void onInsert(BinlogEvent event) {
                System.out.println(&quot;插入数据:{}&quot;, event.getData());
            }

            @Override
            public void onUpdate(BinlogEvent event) {
                System.out.println(&quot;修改数据:{}&quot;, event.getData());
            }

            @Override
            public void onDelete(BinlogEvent event) {
                System.out.println(&quot;删除数据:{}&quot;, event.getData());
            }
        });

        binlogClient.connect();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级特性" tabindex="-1"><a class="header-anchor" href="#高级特性" aria-hidden="true">#</a> 高级特性</h2><p>通过 Persistence 配置为 true 启用宕机续读功能, Binlog4j 会将 binlog 的 filename 与 position 记录到 redis, 同时你需要提供 Redis 配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class BootStrap {

    public static void main(String[] args) {

        RedisConfig redisConfig = new RedisConfig();
        redisConfig.setHost(&quot;127.0.0.1&quot;);
        redisConfig.setPort(6379);
        redisConfig.setPassword(&quot;taoren@123&quot;);

        BinlogClientConfig clientConfig = new BinlogClientConfig();
        clientConfig.setHost(&quot;127.0.0.1&quot;);
        clientConfig.setPort(3306);
        clientConfig.setUsername(&quot;root&quot;);
        clientConfig.setPassword(&quot;taoren@123&quot;);
        clientConfig.setServerId(1990);
        clientConfig.setRedisConfig(redisConfig);
        clientConfig.setPersistence(true);
        clientConfig.setMode(BinlogClientMode.cluster);

        BinlogClient binlogClient = new BinlogClient(clientConfig);

        binlogClient.registerEventHandler(&quot;database&quot;, &quot;table&quot;, new IBinlogEventHandler&lt;User&gt;() {

            @Override
            public void onInsert(BinlogEvent&lt;User&gt; event) {
                System.out.println(&quot;插入数据:{}&quot;, event.getData());
            }

            @Override
            public void onUpdate(BinlogEvent&lt;User&gt; event) {
                System.out.println(&quot;修改数据:{}&quot;, event.getData());
            }

            @Override
            public void onDelete(BinlogEvent&lt;User&gt; event) {
                System.out.println(&quot;删除数据:{}&quot;, event.getData());
            }
        });

        binlogClient.connect();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-spring-boot-集成" tabindex="-1"><a class="header-anchor" href="#在-spring-boot-集成" aria-hidden="true">#</a> 在 Spring Boot 集成</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.gitee.Jmysy&lt;/groupId&gt;
    &lt;artifactId&gt;binlog4j-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;latest.version&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，在 application.yml 或 application.properties 中填写 Binlog4j 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  binlog4j:
    redis-config:
      host: 127.0.0.1
      port: 6379
      password: taoren@123
    client-configs:
      master:
        username: root
        password: taoren@123
        host: 127.0.0.1
        port: 3306
        serverId: 1990
      slave:
        username: root
        password: taoren@123
        host: 127.0.0.1
        port: 3306
        serverId: 1991
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单表监听" tabindex="-1"><a class="header-anchor" href="#单表监听" aria-hidden="true">#</a> 单表监听</h2><p>使用 @BinlogSubscriber 注解, 指定 IBinlogEventHandler 需要注册到哪个客户端, 并且指定监听的 database 与 table。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@BinlogSubscriber(clientName = &quot;master&quot;, database = &quot;pear-admin&quot;, table =&quot;sys_user&quot;)
public class UserEventHandler implements IBinlogEventHandler&lt;User&gt; {

    @Override
    public void onInsert(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;插入数据：&quot; + event.getData());
    }

    @Override
    public void onUpdate(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;修改数据:&quot; + event.getData());
    }

    @Override
    public void onDelete(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;删除数据:&quot; + event.getData());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂监听" tabindex="-1"><a class="header-anchor" href="#复杂监听" aria-hidden="true">#</a> 复杂监听</h2><p>@BinlogSubscriber 注解 database 与 table 属性支持 Pattern 匹配, IBinlogEventHandler 在不指定泛型的情况下, event.getData() 为 Map&lt;String, Object&gt; 类型, 用于兼容不同表的数据结构。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@BinlogSubscriber(clientName = &quot;master&quot;, database = &quot;pear-admin&quot;, table =&quot;sys_user&quot;)
public class UserEventHandler implements IBinlogEventHandler&lt;User&gt; {

    @Override
    public void onInsert(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;插入数据：&quot; + event.getData());
    }

    @Override
    public void onUpdate(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;修改数据:&quot; + event.getData());
    }

    @Override
    public void onDelete(BinlogEvent&lt;User&gt; event) {
        System.out.println(&quot;删除数据:&quot; + event.getData());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2><p>Gitee: https://gitee.com/dromara/binlog4j</p>`,26),t=[d];function a(r,v){return n(),i("div",null,t)}const u=e(s,[["render",a],["__file","Binlog4j-0.html.vue"]]);export{u as default};
