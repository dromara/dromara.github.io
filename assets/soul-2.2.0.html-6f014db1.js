import{_ as s}from"./soul-admin-c472a6ef.js";import{_ as a}from"./soul-framework-68ec47cd.js";import{_ as r,r as d,o,c as u,f as l,g as e,a as n,e as t}from"./app-f20ccc99.js";const c={},g=t(`<p>我们还是先来看看新增功能，然后再讲故事。</p><ul><li>完全的插件化架构设计，插件热插拔。</li><li>完整支持 dubbo 所有版本，alibaba-dubbo ，apache-dubbo。</li><li>支持 dubbo 泛化调用，多参数，复杂参数接口。</li><li>增强 monitor 插件，移除 influxdb 支持，新增内存，CPU，QPS，TPS，响应迟延等 metrics，支持接入 Prometheus。</li><li>springCloud 插件支持 eureka 与 nacos 二种注册中心。</li><li>waf 插件增强,支持黑白名单，以及混合模式。</li><li>抽离 Hystrix 熔断功能，独立成插件支持。</li><li>修护 Zookeeper 数据同步方式 bug，新增 nacos 同步数据方式。</li><li>多种 soul-client 支持，提供传统 spring，以及 springboot 等方式接入。</li><li>优化 soul-admin 后台控制界面。</li><li>负载均衡算法 bug 修护。</li><li>修护大文件上传时候的 bug。</li><li>…….太多了不一一列举了。</li></ul><h2 id="体验新架构-10-分钟搞定一个高可用高性能网关。" tabindex="-1"><a class="header-anchor" href="#体验新架构-10-分钟搞定一个高可用高性能网关。" aria-hidden="true">#</a> 体验新架构，10 分钟搞定一个高可用高性能网关。</h2><p><strong>启动 soul-admin</strong></p><ul><li>下载 soul-admin.jar 包，并启动.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; wget  https://yu199195.github.io/jar/soul-admin.jar
&gt; java -jar soul-admin.jar --spring.datasource.url=&quot;jdbc:mysql://你的url:3306/soul?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false&quot;
  --spring.datasource.username=&#39;you username&#39;  --spring.datasource.password=&#39;you password&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),p={href:"http://localhost:9095/index.html",target:"_blank",rel:"noopener noreferrer"},v=l("p",null,[l("strong",null,"搭建属于你的网关")],-1),b={href:"https://spring.io/quickstart",target:"_blank",rel:"noopener noreferrer"},m=l("li",null,"引入如下 jar 包：",-1),h=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-webflux&lt;/artifactId&gt;
        &lt;version&gt;2.2.2-RELEASE&lt;/version&gt;
  &lt;/dependency&gt;

  &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
        &lt;version&gt;2.2.2-RELEASE&lt;/version&gt;
  &lt;/dependency&gt;

  &lt;!--soul gateway start--&gt;
  &lt;dependency&gt;
        &lt;groupId&gt;org.dromara&lt;/groupId&gt;
        &lt;artifactId&gt;soul-spring-boot-starter-gateway&lt;/artifactId&gt;
        &lt;version&gt;2.2.0&lt;/version&gt;
  &lt;/dependency&gt;

   &lt;!--soul data sync start use websocket--&gt;
   &lt;dependency&gt;
        &lt;groupId&gt;org.dromara&lt;/groupId&gt;
        &lt;artifactId&gt;soul-spring-boot-starter-sync-data-websocket&lt;/artifactId&gt;
        &lt;version&gt;2.2.0&lt;/version&gt;
   &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在你的 <code>application.yaml</code> 文件中加上如下配置：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
   main:
     allow-bean-definition-overriding: true

management:
  health:
    defaults:
      enabled: false
soul :
    sync:
        websocket :
             urls: ws://localhost:9095/websocket  //设置成你的soul-admin地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这样网关的环境就已经搭建完成。</li></ul><h2 id="体验新架构下的插件热插拔" tabindex="-1"><a class="header-anchor" href="#体验新架构下的插件热插拔" aria-hidden="true">#</a> 体验新架构下的插件热插拔</h2>`,5),f=l("li",null,[l("p",null,"问：我想使用熔断功能，应该如何做呢？")],-1),_={href:"https://dromara.org/zh-cn/docs/soul/soul.html",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  &lt;!-- soul hystrix plugin start--&gt;
  &lt;dependency&gt;
      &lt;groupId&gt;org.dromara&lt;/groupId&gt;
      &lt;artifactId&gt;soul-spring-boot-starter-plugin-hystrix&lt;/artifactId&gt;
      &lt;version&gt;2.2.0&lt;/version&gt;
  &lt;/dependency&gt;
  &lt;!-- soul hystrix plugin end--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>问:我怎么接入 dubbo 服务呢？</p></li><li><p>答：<br> 1）如果你使用的是 alibaba-dubbo，那么你应该引入如下：</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   &lt;!--soul alibaba dubbo plugin start--&gt;
    &lt;dependency&gt;
          &lt;groupId&gt;org.dromara&lt;/groupId&gt;
          &lt;artifactId&gt;soul-spring-boot-starter-plugin-alibaba-dubbo&lt;/artifactId&gt;
          &lt;version&gt;2.2.0&lt;/version&gt;
    &lt;/dependency&gt;
   &lt;!-- soul alibaba dubbo plugin end--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2） 如果你使用 apache-dubbo，那么你应该引入如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   &lt;!--soul apache dubbo plugin start--&gt;
    &lt;dependency&gt;
          &lt;groupId&gt;org.dromara&lt;/groupId&gt;
          &lt;artifactId&gt;soul-spring-boot-starter-plugin-apache-dubbo&lt;/artifactId&gt;
          &lt;version&gt;2.2.0&lt;/version&gt;
    &lt;/dependency&gt;
   &lt;!-- soul apache dubbo plugin end--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),I={start:"3"},y={href:"https://dromara.org/zh-cn/docs/soul/user-dubbo.html",target:"_blank",rel:"noopener noreferrer"},S=l("li",null,[l("p",null,"问：如果我想使用限流功能呢？")],-1),k={href:"https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html",target:"_blank",rel:"noopener noreferrer"},w=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  &lt;!-- soul ratelimiter plugin start--&gt;
  &lt;dependency&gt;
      &lt;groupId&gt;org.dromara&lt;/groupId&gt;
      &lt;artifactId&gt;soul-spring-boot-starter-plugin-ratelimiter&lt;/artifactId&gt;
      &lt;version&gt;2.2.0&lt;/version&gt;
  &lt;/dependency&gt;
  &lt;!-- soul ratelimiter plugin end--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>总而言之，你想要使用什么插件，你就新增该插件的依赖。就这？是热插拔么。。</li><li>问：那有些插件我不想用了怎么办？</li><li>答：在 soul-admin 后台禁用该插件即可，想用就开启。</li></ul><h2 id="soul-网关的特性" tabindex="-1"><a class="header-anchor" href="#soul-网关的特性" aria-hidden="true">#</a> Soul 网关的特性</h2><ul><li>我觉得最大的特色是在流量筛选和管控方面。无论多复杂的请求，可以根据各种条件，规则，匹配方式，来进行流量过滤，筛选，处理。这个过程完全是可视化，自定义，即时生效的，程序无需任何更改。</li><li>每个配置都在 soul-admin 控制台配置，会同步到每个 Soul 网关节点的 JVM 内存，这也是 Soul 集群高性能的关键之一，在 soul 网关内部，使用了 http 长轮询，websocket，zookeeper 等方式，独立实现了分布式配置中心的功能。</li><li>Soul 网关使用 Reactor 编程方式来实现，独立了线程调度，低消耗，经过网关的流量，我们在开启 10 个插件都处理的情况下，延迟是 1~2ms。</li><li>插件机制，默认提供了限流，熔断，黑白名单，认证等等插件。</li><li>支持 A/B test，蓝绿发布（因为掌控了所有流量这个很容易做）。</li></ul><h2 id="soul-网关有哪些使用场景-又有哪些值得你关注或者学习的" tabindex="-1"><a class="header-anchor" href="#soul-网关有哪些使用场景-又有哪些值得你关注或者学习的" aria-hidden="true">#</a> Soul 网关有哪些使用场景，又有哪些值得你关注或者学习的？</h2><p>首先我觉得还是实用主义，需要用到,才会去了解。那么在什么场景下，你需要用到呢？</p><p><strong>后台管理 web</strong></p><ul><li><p>首先随便微服务的流行，我们的后台都划分成很多的微服务，我相信你们每个公司都有一个后台管理系统吧，如果我没猜错的话，他们大体上是如下架构。<br><img src="`+s+'" alt="soul-admin" loading="lazy"></p></li><li><p>它会有什么问题呢？大家思考一下。</p><ul><li><p>每个微服务项目的开发人员都在这上面进行开发，会越来越笨重。</p></li><li><p>如何不停机发布的问题？你要发布商品模块的接口，会造成所有其他的模块使用不了。</p></li><li><p>假如某一个模块接口的请求量很大（需要部署多个），另一个模块不需要，你又怎么拆分呢？</p></li></ul></li><li><p>有人又会说，那我把他们拆处理，拆成一个一个 web 不就行了么？但是这样又会带来一个新的问题，负载均衡在哪里做？统一的认证在哪里做？</p></li><li><p>Soul 网关就很好了解决了以上所有问题，只需要把你的微服务注册到 Soul 网关。你想怎么玩都可以，不重样的.. 比如 order 模块有 2 个应用，你要发布新的版本，你可以在网关里面，把流量先打到其中一个，另一个进行更新，更新完了以后，再把流量放过去。改变了以前运维掌控一切的观念，java 程序员，也可以玩的更好，运维都省了，向老板申请加薪指日可待。</p></li><li><p>需要统一鉴权？你只需要在网关新增一个适合自己业务的鉴权插件就 OK。<br><strong>公司入口网关（开放平台）</strong></p></li><li><p>如果一个公司要做开放平台或者入口网关，鉴权，限流，监控，熔断肯定少不了。</p></li><li><p>如果贵公司是 dubbo 体系，开发人员写了 dubbo 服务后，还要傻乎乎的新增一个 web 项目，来提供接口给别人调用吗？</p></li><li><p>如果一个接口被攻击，你怎么处理呢？如果被大流量攻击，你怎么处理呢？</p></li><li><p>不巧，soul 在设计之初就是来干这种事情的，我们来看一下整体的架构图。</p></li></ul><figure><img src="'+a+'" alt="soul-framework" tabindex="0" loading="lazy"><figcaption>soul-framework</figcaption></figure><ul><li>Soul 网关是使用响应式编程实现的，响应式编程绝对是未来 java 邻域的重要方向，看风向标 Spring 体系就好了。我在 14 年的时候，天天写 for 循环操作集合，溜的一笔。领导对我说，要使用 lambda 表达式，这是未来的重点，今天来看，如果你是 java 程序员，你不会 lambda 函数式编程，你好意思么。</li></ul><h2 id="从发布-2-2-0-谈谈近几年的开源体会。" tabindex="-1"><a class="header-anchor" href="#从发布-2-2-0-谈谈近几年的开源体会。" aria-hidden="true">#</a> 从发布 2.2.0，谈谈近几年的开源体会。</h2><p>我是 17 年左右的时候，开始写开源项目的，最开始我和王亮一起讨论设计了 LCN 分布式事务，后面自己又陆续写了 Hmily，Raincat，Myth 等分布式事务中间件，再后来写了 Soul 网关，这一路走来，遇到很多很有意思的事，也遭受很多小白用户的摧残。总的感觉，一个好的开源项目，高扩展，可插拔的设计实在太重要了。</p><ul><li>案例一：Soul 网关刚开始数据同步只支持 Zookeeper 方式，有些用户反馈，我们没有 zk，那怎么办？</li><li>案例二 ：Soul 网关是支持 Dubbo 的，但是有些用户是 alibaba-dubbo，有些用户 apache-dubbo，你又怎么说？</li><li>案例三 ：soul 刚开始提供的客户端都是基于 Springboot 的，有些用户是传统的 Spring，你又怎么说？</li></ul><p>所以插件化设计，SPI 可插拔设计势在必行。</p><p><strong>SPI VS 可插拔</strong></p><p>诚然 SPI 扩展方式，是可插拔的基石，但是他们又不完全等同。举个列子：假如我们先存储一条数据，你定好了 SPI 接口，也有 Mysql，mongodb，elasticseach，zookeeper 等等多种方式实现，现在你要考虑的是把它组合在一起项目里面，还是放在不同的项目，按需打包和加载呢？这些都是要考虑的，所以不能一股脑的 SPI 方式。</p><p><strong>checkStyle</strong></p><ul><li><p>严格的代码规范，是对源码学习中，框架使用者的尊重，更是一种开源的态度。</p></li><li><p>严格的代码规范，让人看起来舒服，也更容易让人理解整个代码。</p></li><li><p>也希望各位小伙伴提交 PR 的时候，至少本地要 Install 成功，之前有些 PR，为了不打击他们的积极性，合并之后流着泪修改。</p></li></ul><p><strong>参与开源</strong></p>',19),j={href:"https://github.com/apache/shardingsphere%E3%80%82",target:"_blank",rel:"noopener noreferrer"},z=l("li",null,[l("p",null,"国人在开源方面，技术方面大到芯片，小到 MATLAB ，都落后挺多的，也希望大家拥有开源的心态，多参与开源，学习技术，宣传思想，为往圣继绝学！")],-1);function E(P,L){const i=d("ExternalLinkIcon");return o(),u("div",null,[g,l("ul",null,[l("li",null,[e("访问 "),l("a",p,[e("http://localhost:9095/index.html"),n(i)]),e(" 默认的用户名：admin 密码:123456。")])]),v,l("ul",null,[l("li",null,[e("首先你新建一个空的 springboot 项目，可以参考 soul-bootstrap. 也可以在 spring 官网:["),l("a",b,[e("https://spring.io/quickstart"),n(i)]),e("]")]),m]),h,l("ul",null,[f,l("li",null,[l("p",null,[e("答：你可以在 pom.xml 文件 引入以下依赖,更多的还请看："),l("a",_,[e("https://dromara.org/zh-cn/docs/soul/soul.html"),n(i)])])])]),x,l("ol",I,[l("li",null,[e("更多的使用请你参考："),l("a",y,[e("https://dromara.org/zh-cn/docs/soul/user-dubbo.html"),n(i)])])]),l("ul",null,[S,l("li",null,[l("p",null,[e("答：你可以引入以下依赖，具体的参考："),l("a",k,[e("https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html"),n(i)])])])]),w,l("ul",null,[l("li",null,[l("p",null,[e("目前我主要专注于 Apache ShardingSphere，这是中国人在 apache 组织的第一个关于数据库分库分表的顶级项目，欢迎大家参与进来。"),l("a",j,[e("https://github.com/apache/shardingsphere。"),n(i)])])]),z])])}const V=r(c,[["render",E],["__file","soul-2.2.0.html.vue"]]);export{V as default};
