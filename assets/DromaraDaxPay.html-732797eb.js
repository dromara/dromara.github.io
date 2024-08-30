import{_ as e,a,b as i,c as d}from"./Dromara-DaxPay-3-e9e80d6f.js";import{_ as n,o as t,c as r,f as l}from"./app-d3789271.js";const s={},o=l(`<h2 id="作者介绍" tabindex="-1"><a class="header-anchor" href="#作者介绍" aria-hidden="true">#</a> 作者介绍</h2><ul><li><p>名称：喵呀</p></li><li><p>dromara 开源组织成员，dromara/dax-pay 作者</p></li><li><p>支付行业新兵，Java高级开发工程师，开发、设计、运维多面手</p></li><li><p>一枚新济南人，热爱逛各地的博物馆，热爱追寻各种历史古迹</p></li><li><p>个人空间：https://gitee.com/GIotEE</p></li></ul><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>在平时对接三方支付时，尤其需要对接多家支付的时候，是不是有以下痛点：</p><blockquote><ol><li><p>各家支付系统的调用方式、返回参数、数据签名、回调格式等都不尽相同，对接时互相之间无法复用</p></li><li><p>各家支付系统提供的支付能力不尽相同，有时候业务系统为了对客户展现的功能一致，需要写大量的适配代码才能实现</p></li><li><p>支付订单、退款订单、回调记录、订单关闭、对账分账等必要功能都需要进行实现，需要考虑各种场景才能保证不出问题</p></li><li><p>有时候业务上需要支持一些扩展的支付类型，如要支持钱包支付、支持多种支付方式进行组合支付、支持聚合支付实现一码通扫等</p></li></ol></blockquote><p>如果你遇到这些问题，<strong>Dromara  DaxPay</strong>（开源支付网关）或许能帮助到你：</p><p>它是<code>Dromara开源社区</code>旗下新晋的一款开源支付网关系统，将各种支付通道（如支付宝、微信、云闪付等）的调用方式进行抽象统一，隐藏开发者不需要关注的细节，只需要一份代码就可以与多家支付通道对接。<code>DaxPay</code>独立部署，提供独立的管理界面，不侵入业务系统也不需要业务系统进行改造，只需要通过<code>http</code>进行调用就拥有相应的支付能力。除了对各类三方支付系统进行了对接，还对常用的支付方式进行了扩展，支持聚合支付、组合支付、钱包支付等功能。</p><h2 id="系统亮点" tabindex="-1"><a class="header-anchor" href="#系统亮点" aria-hidden="true">#</a> 系统亮点</h2><ul><li><p>基于<code>Spring Boot</code>、<code>Vue3</code>主流技术栈，方便对系统进行扩展和改造</p></li><li><p>已对接<code>微信支付</code>和<code>支付宝</code>支付的接口，后续版本将支持<code>V3</code>版本支付接口，以及<code>云闪付</code>、<code>PayPal</code>等更多类型的支付通道</p></li><li><p>对接各类支付通道对外提供统一的接口，简化支付对接的复杂度，也方便后期快速替换或增加新的支付通道</p></li><li><p>提供<code>钱包支付</code>、<code>现金支付</code>、<code>储值卡支付</code>等扩展支付方式，同时支持组合支付，满足业务系统多样的支付场景</p></li><li><p>提供<code>Java</code>版本的<code>SDK</code>工具包，简化业务系统对接流程，同时也可以使用<code>HTTP</code>方式进行接口调用，保证了更低的耦合性和通用性</p></li><li><p>请求、响应、回调数据都支持启用签名机制，可根据实际需要进行开关，保证交易的安全可靠</p></li><li><p>提供管理平台，可以对各类订单、记录、配置进行便捷的操作，方便运营人员进行支付业务的管理</p></li><li><p>提供<code>聚合支付</code>、<code>电脑收银台</code>和<code>手机收银台</code>的演示模块，供开发者参考其实现支付功能的逻辑</p></li><li><p>系统源码为商业友好的<code>Apache-2.0</code>协议，文档为更加宽松的<code>MIT</code>协议，不需要担心后续代码和文档会突然进行收费</p></li></ul><h2 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明" aria-hidden="true">#</a> 使用说明</h2><blockquote><p>此处以使用SKD对接简单支付接口为例，演示业务系统如何通过SDK快速接入到支付网关中</p></blockquote><h3 id="引入sdk" tabindex="-1"><a class="header-anchor" href="#引入sdk" aria-hidden="true">#</a> 引入SDK</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- 支付SDK路径 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;cn.bootx.platform&lt;/groupId&gt;
    &lt;artifactId&gt;daxpay-single-sdk&lt;/artifactId&gt;
    &lt;version&gt;\${latest.version}&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用代码" tabindex="-1"><a class="header-anchor" href="#调用代码" aria-hidden="true">#</a> 调用代码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package cn.bootx.platform.daxpay.sdk;

import cn.bootx.platform.daxpay.sdk.code.PayChannelEnum;
import cn.bootx.platform.daxpay.sdk.code.PayWayEnum;
import cn.bootx.platform.daxpay.sdk.model.PayOrderModel;
import cn.bootx.platform.daxpay.sdk.net.DaxPayConfig;
import cn.bootx.platform.daxpay.sdk.net.DaxPayKit;
import cn.bootx.platform.daxpay.sdk.param.pay.SimplePayParam;
import cn.bootx.platform.daxpay.sdk.response.DaxPayResult;
import org.junit.Before;
import org.junit.Test;

/**
 * 简单支付
 * @author xxm
 * @since 2024/2/2
 */
public class SimplePayOrderTest {

    @Before
    public void init() {
        // 初始化支付配置
        DaxPayConfig config = DaxPayConfig.builder()
                .serviceUrl(&quot;http://127.0.0.1:9000&quot;)
                // 需要跟网关中配置一致
                .signSecret(&quot;123456&quot;)
                .build();
        DaxPayKit.initConfig(config);
    }

    @Test
    public void simplePay() {
        // 简单支付参数
        SimplePayParam param = new SimplePayParam();
        param.setBusinessNo(&quot;P0001&quot;);
        param.setAmount(1);
        param.setTitle(&quot;测试支付宝支付&quot;);
        // 支付宝扫码支付
        param.setChannel(PayChannelEnum.ALI.getCode());
        param.setPayWay(PayWayEnum.QRCODE.getCode());

        // 如果切换为微信扫码支付, 只需要更改一下通道编码参数即可,
        // param.setChannel(PayChannelEnum.ALI.getCode());

        DaxPayResult&lt;PayOrderModel&gt; execute = DaxPayKit.execute(param, true);
        PayOrderModel data = execute.getData();
        // 打印用于扫码使用的
        System.out.println(data.getPayBody());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目和演示地址" tabindex="-1"><a class="header-anchor" href="#项目和演示地址" aria-hidden="true">#</a> 项目和演示地址</h2><h3 id="源码地址" tabindex="-1"><a class="header-anchor" href="#源码地址" aria-hidden="true">#</a> 源码地址</h3><table><thead><tr><th>项目</th><th>GITEE</th><th>GITHUB</th></tr></thead><tbody><tr><td>后端地址</td><td>https://gitee.com/dromara/dax-pay</td><td>https://github.com/dromara/dax-pay</td></tr><tr><td>Web前端地址</td><td>https://gitee.com/bootx/dax-pay-ui</td><td>https://github.com/xxm1995/dax-pay-ui</td></tr><tr><td>H5前端地址</td><td>https://gitee.com/bootx/dax-pay-h5</td><td>https://github.com/xxm1995/dax-pay-h5</td></tr></tbody></table><h3 id="管理平台" tabindex="-1"><a class="header-anchor" href="#管理平台" aria-hidden="true">#</a> 管理平台:</h3><blockquote><p>注：演示账号部分功能修改删除权限未开放。</p></blockquote><p>地址：https://daxpay.demo.bootx.cn 账号：daxpay 密码：123456</p><h3 id="网关接口" tabindex="-1"><a class="header-anchor" href="#网关接口" aria-hidden="true">#</a> 网关接口</h3><blockquote><p>注：接口平台只开放支付网关相关的接口，不开放系统其他接口。</p></blockquote><p>地址: https://daxpay.server.bootx.cn/doc.html 账号: daxpay 密码: 123456</p><figure><img src="`+e+'" alt="" tabindex="0"><figcaption></figcaption></figure><h3 id="收银台" tabindex="-1"><a class="header-anchor" href="#收银台" aria-hidden="true">#</a> 收银台</h3><blockquote><p>请勿大额支付，可以通过后台管理平台进行退款</p></blockquote><p>电脑收银台地址: https://daxpay.demo.bootx.cn/#/cashier</p><p>手机收银台地址: https://daxpay.demo.bootx.cn/h5/#/cashier/uniCashier</p><figure><img src="'+a+'" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="沟通交流" tabindex="-1"><a class="header-anchor" href="#沟通交流" aria-hidden="true">#</a> 沟通交流</h2><p>一个人的能力总是有限的，非常欢迎大家能够一起来交流，一起成长！！！</p><p>QQ群号: 939414255</p><figure><img src="'+i+'" alt="" tabindex="0"><figcaption></figcaption></figure><p>关于 Dromara</p><p>Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。</p><p>Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。</p><p><strong>欢迎大家来到知识星球和我互动</strong></p><figure><img src="'+d+'" alt="" tabindex="0"><figcaption></figcaption></figure>',39),c=[o];function p(m,u){return t(),r("div",null,c)}const b=n(s,[["render",p],["__file","DromaraDaxPay.html.vue"]]);export{b as default};
