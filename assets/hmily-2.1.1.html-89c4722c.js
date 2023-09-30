import{_ as s}from"./hmily-framework-f32e3dc5.js";import{_ as r,r as a,o as c,c as o,f as e,g as i,a as n,e as d}from"./app-f20ccc99.js";const t={},v=d('<p>感谢朋友们一路以来的支持，让大家久等了。在这一个版本中，我们团队重构了整个项目，合理的划分功能模块，新增配置中心，调整底层存储结构，解决疑难 bug，以及其他新功能的支持，也吸收了更多开源社区的优秀人才的加入。</p><h2 id="架构全景图" tabindex="-1"><a class="header-anchor" href="#架构全景图" aria-hidden="true">#</a> 架构全景图</h2><figure><img src="'+s+`" alt="架构全景图" tabindex="0" loading="lazy"><figcaption>架构全景图</figcaption></figure><h3 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h3><ul><li>高可靠性 ：支持分布式场景下，事务异常回滚，超时异常恢复，防止事务悬挂。</li><li>易用性 ：提供零侵入性式的 Spring-Boot, Spring-Namespace 快速与业务系统集成。</li><li>高性能 ：去中心化设计，与业务系统完全融合，天然支持集群部署。</li><li>可观测性 ：Metrics 多项指标性能监控，以及 admin 管理后台 UI 展示。</li><li>多种 RPC ：支持 Dubbo, SpringCloud,Montan ,sofa-rpc 等知名 RPC 框架。</li><li>日志存储 ：支持 mysql, oracle, mongodb, redis, zookeeper 等方式。</li><li>复杂场景 ：支持 RPC 嵌套调用事务。</li></ul><h3 id="重构部分" tabindex="-1"><a class="header-anchor" href="#重构部分" aria-hidden="true">#</a> 重构部分</h3><ul><li><p><strong>在模块划分上：</strong></p><ul><li>抽离出开箱即用的 SPI 自定义模块。</li><li>定义事务日志多种存储方式的 SPI 模块。</li><li>定义事务日志多种序列化方式的 SPI 模块。</li><li>新增配置中心，支持各种主流的配置中心（nacos，apollo,zookeeper 等），并支持配置的动态刷新。</li><li>新增 metrics 模块，用来监控运行时候的各种信息。</li><li>抽离出核心的事务执行模块。</li><li>抽离出多种 RPC 支持模块。</li><li>抽离出 spring 与 spring boot 支持模块。</li></ul></li><li><p><strong>在依赖包版本上：</strong></p><ul><li>guava 升级到 29.0</li><li>curator 升级到 5.1.0</li></ul></li><li><p><strong>在代码质量上：</strong></p><ul><li>严格的 check-style 代码检查，秉承优雅，简单易懂原则（talk is cheap ,show you code）。</li></ul></li><li><p><strong>在开放性上：</strong></p><ul><li>社区奉行简单，快乐，和谐基本原则</li></ul></li><li><p><strong>在目标上：</strong></p><ul><li>打造一款高可用，高性能，简单易用金融级的分布式事务解决方案。</li></ul></li></ul><h3 id="解决疑难-bug" tabindex="-1"><a class="header-anchor" href="#解决疑难-bug" aria-hidden="true">#</a> 解决疑难 bug：</h3><ul><li><code>dubbo</code>框架不支持注解方式的使用（spring-boot-starter-dubbo)。</li><li><code>motan</code>框架不支持注解方式的使用。</li><li><code>spring-cloud</code>用户如果使用 feign 与 hystrix 整合 hmily 时候的线程切换问题。</li><li>极端情况下事务日志序列化异常。</li><li>try 阶段超时异常，导致事务悬挂 bug。</li><li>confirm 与 cancel 阶段异常时候，事务未能正确恢复 bug。</li><li>在事务日志存储上，支持同步与异步 2 种模式，供用户选择。</li></ul><h3 id="用户使用与升级指南" tabindex="-1"><a class="header-anchor" href="#用户使用与升级指南" aria-hidden="true">#</a> 用户使用与升级指南</h3><p>对于 hmily 用户来说，只需三个步骤，即可解决 RPC 服务调用之间的柔性事务</p><ul><li>引用 hmily 对各种 rpc 支持的 jar 包。</li><li>添加 hmily 配置。</li><li>在 rpc 接口方法上添加 @Hmily 注解。</li></ul><p><strong>依赖的变更</strong></p><p>用户依赖的方式没有更改，只需要将版本升级到 2.1.0。下面举 dubbo 微服务列子</p><p><strong>dubbo rpc 微服务</strong></p><ul><li>dubbo 接口服务依赖</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>     &lt;dependency&gt;
          &lt;groupId&gt;org.dromara&lt;/groupId&gt;
          &lt;artifactId&gt;hmily-annotation&lt;/artifactId&gt;
          &lt;version&gt;2.1.0&lt;/version&gt;
      &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>dubbo 服务提供者依赖（&lt;2.7）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>       &lt;dependency&gt;
            &lt;groupId&gt;org.dromara&lt;/groupId&gt;
            &lt;artifactId&gt;hmily-dubbo&lt;/artifactId&gt;
           &lt;version&gt;2.1.0&lt;/version&gt;
        &lt;/dependency&gt;

    or

      &lt;dependency&gt;
            &lt;groupId&gt;org.dromara&lt;/groupId&gt;
            &lt;artifactId&gt;hmily-spring-boot-starter-dubbo&lt;/artifactId&gt;
           &lt;version&gt;2.1.0&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>hmily 配置的变更</strong></p><p>在新版 2.1.0 中，新增了 hmily-config 模块，支持本地与注册中心模式。用户首先需要在项目<code>resouce</code>文件下新建一个名称为<code>hmily.yml</code>的文件。默认路径为项目的 <code>resource</code>目录下，也可以使用 <code>-Dhmily.conf</code> 指定，也可以把配置放在 <code>user.dir</code> 目录下。优先级别 <code>-Dhmily.conf</code> &gt; <code>user.dir</code> &gt;<code>resource</code>。文件格式如下（一部分，以下是配置成本地模式):</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  server:
    configMode: local
    appName: account-dubbo
  #  如果server.configMode eq local 的时候才会读取到这里的配置信息.
  config:
    appName: account-dubbo
    serializer: kryo
    contextTransmittalMode: threadLocal
    scheduledThreadMax: 16
    scheduledRecoveryDelay: 60
    scheduledCleanDelay: 60
    scheduledPhyDeletedDelay: 600
    scheduledInitDelay: 30
    recoverDelayTime: 60
    cleanDelayTime: 180
    limit: 200
    retryMax: 10
    bufferSize: 8192
    consumerThreads: 16
    asyncRepository: true
    autoSql: true
    phyDeleted: true
    storeDays: 3
    repository: mysql

repository:
  database:
    driverClassName: com.mysql.jdbc.Driver
    url : jdbc:mysql://127.0.0.1:3306/hmily?useUnicode=true&amp;characterEncoding=utf8
    username: root
    password:
    maxActive: 20
    minIdle: 10
    connectionTimeout: 30000
    idleTimeout: 600000
    maxLifetime: 1800000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果你想将配置文件放在<code>Nacos</code>配置中心：</strong></p><ul><li>第一步：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hmily:
  server:
    configMode: nacos
    appName: xxxxx
  #  如果server.configMode eq local 的时候才会读取到这里的配置信息.

remote:
  nacos:
    server: 192.168.3.22:8848
    dataId: hmily.properties
    group: DEFAULT_GROUP
    timeoutMs: 6000
    fileExtension: yml
    passive: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第二步：将 hmily 的配置，放在 nacos 配置中心上</li></ul><p><strong>如果你想将配置文件放在<code>Apollo</code>配置中心：</strong></p><ul><li>第一步:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hmily:
  server:
    configMode: apollo
    appName: xxxx
  #  如果server.configMode eq local 的时候才会读取到这里的配置信息.

remote:
  apollo:
    appId: hmily-xxxxx
    configService: http://192.168.3.22:8080
    namespace: byin_hmily
    secret:
    fileExtension: yml
    passive: true
    env: dev
    meta: http://192.168.3.22:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第二步：将 hmily 的配置，放在 apollo 配置中心上</li></ul>`,30),u={href:"https://dromara.org/zh-cn/docs/hmily/config.html",target:"_blank",rel:"noopener noreferrer"},m=d(`<p><strong>注解方式的使用的变更</strong></p><p>在之前的版本中，rpc 接口与实现都只需要添加 <code>@Hmily</code> 注解, 现在需要进行变更，在 rpc 接口方法上是添加 <code>@Hmily</code>,用来标识这是一个 hmily 分布式事务的接口方法， 在接口的方法实现上则需要添加 <code>@HmilyTCC</code>，然后指定 <code>confirm</code> 与 <code>cancel</code>方法名称.</p><p><strong>举例（dubbo 中 say 方法需要参与分布式事务):</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface HelloService {

    @Hmily
    void say(String hello);
}

public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = &quot;sayConfrim&quot;, cancelMethod = &quot;sayCancel&quot;)
    public void say(String hello) {
         System.out.println(&quot;hello world&quot;);
    }

    public void sayConfrim(String hello) {
         System.out.println(&quot; confirm hello world&quot;);
    }

    public void sayCancel(String hello) {
         System.out.println(&quot; cancel hello world&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例(springcloud 中 say 方法需要参与分布式事务):</strong></p><ul><li>spring-cloud 服务调用方 FeignClient 中</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@FeignClient(value = &quot;helle-service&quot;)
public interface HelloService {

    @Hmily
    @RequestMapping(&quot;/helle-service/sayHello&quot;)
    void say(String hello);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>spring-cloud 服务提供方</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
public class HelloController {

    private final HelloService helloService ;

    @Autowired
    public AccountController(HelloService helloService) {
        this.helloService= helloService;
    }

    @RequestMapping(&quot;/sayHello&quot;)
    public void payment(String hello) {
        return helloService.say(hello);
    }
}
public interface HelloService {

    void say(String hello);
}
public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = &quot;sayConfrim&quot;, cancelMethod = &quot;sayCancel&quot;)
    public void say(String hello) {
         System.out.println(&quot;hello world&quot;);
    }

    public void sayConfrim(String hello) {
         System.out.println(&quot; confirm hello world&quot;);
    }

    public void sayCancel(String hello) {
         System.out.println(&quot; cancel hello world&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>事务日志存储结构的更改</strong></p><p>在使用上，用户使用或者升级不用关心，框架会默认初始化好。</p><h2 id="下一个版本" tabindex="-1"><a class="header-anchor" href="#下一个版本" aria-hidden="true">#</a> 下一个版本</h2><ul><li>因为调整了架构，在其他模式的支持上将会变得更加容易，在下一个版本，将会发布 TAC 模式（try-auto-cancel）使用此模式，将大大简化框架的使用程度，开发者不需要关心 confirm 以及 cancel 方法的开发，对老系统的改造提供了更好的兼容性，不用担心额外的开发任务，一切就交给 hmily 吧。</li><li>将对 brpc 用户进行支持。</li><li>将对 tars-rpc 用户进行支持。</li></ul><h2 id="社区共建" tabindex="-1"><a class="header-anchor" href="#社区共建" aria-hidden="true">#</a> 社区共建</h2><p>我们秉承<code>和谐快乐</code>，<code>代码至上</code> 的原则，如果你有想法，愿意和我们一起成长，一起贡献，快来加入我们吧！</p>`,15),b={href:"https://github.com/dromara/hmily",target:"_blank",rel:"noopener noreferrer"},p={href:"https://gitee.com/dromara/hmily",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,"qq 群: 162614487",-1);function h(y,f){const l=a("ExternalLinkIcon");return c(),o("div",null,[v,e("p",null,[i("还有其他的配置方式以及配置内容的详解，请参考："),e("a",u,[i("https://dromara.org/zh-cn/docs/hmily/config.html"),n(l)])]),m,e("ul",null,[e("li",null,[i("github："),e("a",b,[i("https://github.com/dromara/hmily"),n(l)])]),e("li",null,[i("gitee："),e("a",p,[i("https://gitee.com/dromara/hmily"),n(l)])]),g])])}const q=r(t,[["render",h],["__file","hmily-2.1.1.html.vue"]]);export{q as default};
