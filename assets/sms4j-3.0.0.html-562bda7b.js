import{_ as i,o as e,c as n,f as s}from"./app-912f5142.js";const l={},d=s(`<h2 id="🎉sms4j-3-0-0-版本震撼发布-短信重试-多方共用-负载均衡正式来袭-🎉" tabindex="-1"><a class="header-anchor" href="#🎉sms4j-3-0-0-版本震撼发布-短信重试-多方共用-负载均衡正式来袭-🎉" aria-hidden="true">#</a> 🎉sms4j 3.0.0 版本震撼发布 短信重试，多方共用，负载均衡正式来袭 🎉</h2><p>在历经了数月的等待之后（主要作者在摸鱼，写得慢。。。。）sms4j 的 3.0 版本终于正式发布，本次版本为大版本更新，与 2.x 不兼容，但是本次更新是一个长期支持版本，并且带来了诸多的新特性，接下来我们一起来看看吧</p><h2 id="🚀-新特性" tabindex="-1"><a class="header-anchor" href="#🚀-新特性" aria-hidden="true">#</a> 🚀 新特性</h2><ul><li>支持短信失败重试，可以自定义重试次数</li><li>支持单厂商多配置使用</li><li>支持接口类配置</li><li>支持自定义缓存来源</li><li>支持默认负载均衡形式，权重可自定义配置</li><li>支持邮件发送</li><li>支持邮箱监听</li><li>支持邮件发送失败自动重试</li><li>支持短信拦截</li></ul><h2 id="🏇-使用方式变更" tabindex="-1"><a class="header-anchor" href="#🏇-使用方式变更" aria-hidden="true">#</a> 🏇 使用方式变更</h2><p>在 sms4j3.0 版本中，使用方式与先前的 2.X 有所不同，使用上不再依托 2.X 中的枚举，而是改为更加自由的自定义 key 标识</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> SmsBlend smsBlend = SmsFactory.getSmsBlend(&quot;在配置中定义的configId&quot;);
 SmsResponse smsResponse = smsBlend.sendMessage(&quot;18888888888&quot;,&quot;123&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔧-配置方式变更" tabindex="-1"><a class="header-anchor" href="#🔧-配置方式变更" aria-hidden="true">#</a> 🔧 配置方式变更</h2><p>在 3.0 版本中，去除了先前中的 JDBC 配置等形式，改为更加自由的接口类配置，同时保留了 yml 配置，项目更加轻量，使用更加自由方便</p><h4 id="yml-配置" tabindex="-1"><a class="header-anchor" href="#yml-配置" aria-hidden="true">#</a> yml 配置</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sms:
    # 标注从yml读取配置
    config-type: yaml
    blends:
      # 自定义的标识，也就是configId这里可以是任意值（最好不要是中文）
      tx1:
        #厂商标识，标定此配置是哪个厂商，详细请看厂商标识介绍部分
        supplier: tencent
        #您的accessKey
        access-key-id: 您的accessKey
        #您的accessKeySecret
        access-key-secret: 您的accessKeySecret
        #您的短信签名
        signature: 您的短信签名
        #模板ID 非必须配置，如果使用sendMessage的快速发送需此配置
        template-id: xxxxxxxx
        #您的sdkAppId
        sdk-app-id: 您的sdkAppId
        # 自定义的标识，也就是configId这里可以是任意值（最好不要是中文）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="接口类配置" tabindex="-1"><a class="header-anchor" href="#接口类配置" aria-hidden="true">#</a> 接口类配置</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class ReadConfig implements SmsReadConfig {
    @Override
    public BaseConfig getSupplierConfig(String configId) {
        UniConfig uniConfig = new UniConfig();
       //此处仅为示例，实际环境中，数据可以来自任意位置，
        return uniConfig;
    }

    @Override
    public List&lt;BaseConfig&gt; getSupplierConfigList() {
        //此处仅为示例，实际环境中，数据可以来自任意位置，
        return null;
    }
}

@Component
public class Demo {
    @Autowired
    ReadConfig config;

    @PostConstruct
    public void init(){
        // 创建SmsBlend 短信实例
        SmsFactory.createSmsBlend(config,&quot;在配置中定义的configId&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📧-邮件插件" tabindex="-1"><a class="header-anchor" href="#📧-邮件插件" aria-hidden="true">#</a> 📧 邮件插件</h2><p>邮件插件在这次的更新中也得到了很大的优化，现在的邮件插件使用起来更加简单方便，同时可以覆盖多种场景，并且支持自定义 html 模板发送邮件</p><p>支持包括：</p><ul><li>html 模板邮件</li><li>携带多个附件的邮件</li><li>自动打包成 zip 的邮件</li><li>标准的文字邮件</li><li>抄送人</li><li>密送人</li><li>失败自动重试</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//以下仅做演示，实际使用需要填入数据
MailSmtpConfig config = MailSmtpConfig.builder.build;

//这里的key可以是任何可对比类型，用于后续从工厂取出邮件实现类用
MailFactory.put(&quot;qq&quot;,config)

MailClient mail = MailFactory.createMailClient(&quot;qq&quot;);

mail.send(message);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>邮件插件去除了先前版本中过多的重载方法，统一改为 send 方法进行发送，通过<code>MailMessage</code>构建不同的邮件</p><h2 id="📩-邮箱监听" tabindex="-1"><a class="header-anchor" href="#📩-邮箱监听" aria-hidden="true">#</a> 📩 邮箱监听</h2><p>邮箱监听可以监听到某个 IMAP 协议邮箱中收到的邮件，并对其进行一定的处理。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MonitorFactory.put(&quot;自定义的标识&quot;,MailImapConfig配置,Monitor回调对象)
MonitorFactory.start(&quot;put中自定义的标识&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>邮箱监听开启后可以监听指定配置下的邮箱，并将收到的邮件进行自定义的处理</p><h2 id="🔨-问题修复" tabindex="-1"><a class="header-anchor" href="#🔨-问题修复" aria-hidden="true">#</a> 🔨 问题修复</h2><p>本次版本中，还修复了 2.X 中存在的一些问题</p><ul><li>华为云短信在群发时签名错误</li><li>腾讯云短信在某些情况下导致的发送失败</li><li>unisms 的返回值存在异常</li><li>阿里云短信在某些极端情况下会出现签名错误</li><li>springUtil 与其他框架冲突</li><li>多租户某些状态下配置存在问题</li><li>邮件发送时 ssl 配置状态错误</li></ul>`,26),a=[d];function r(c,t){return e(),n("div",null,a)}const u=i(l,[["render",r],["__file","sms4j-3.0.0.html.vue"]]);export{u as default};
