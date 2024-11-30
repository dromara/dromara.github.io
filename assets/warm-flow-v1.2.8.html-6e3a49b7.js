import{_ as e,a as i,b as n,c as a}from"./warm-flow-v1.2.8-3-4ae5df61.js";import{_ as l}from"./qrcode_zsxq-8eef4d18.js";import{_ as s,o as r,c as d,f as t}from"./app-bdc8102f.js";const c={},v=t('<h1 id="warm-flow-1-2-8版本更新-新增办理人变量表达式和条件表达式支持spel" tabindex="-1"><a class="header-anchor" href="#warm-flow-1-2-8版本更新-新增办理人变量表达式和条件表达式支持spel" aria-hidden="true">#</a> warm-flow 1.2.8版本更新,新增办理人变量表达式和条件表达式支持spel</h1><figure><img src="'+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><ul><li><p>【升级注意事项】</p></li><li><p>本次升级，内置json库snack3方式，改为spi方式加载，业务项目中存在哪种json就会使用哪种的实现， 支持顺序按顺序加载一种：snack3、jackson、fastjson、gson，并且目前只实现了这四种，可扩展</p></li><li><p>如在未集成snack3库的环境下，还需要使用snack3库，需要单独使用（原组件使用snack3库）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      &lt;dependency&gt;
          &lt;groupId&gt;org.noear&lt;/groupId&gt;
          &lt;artifactId&gt;snack3&lt;/artifactId&gt;
          &lt;version&gt;3.2.88&lt;/version&gt;
      &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>更新日志</p></li><li><p>[feat] json库支持snack3、jackson、fastjson和gson，并且支持扩展</p></li><li><p>[feat] 增加办理人变量表达式，支持\${xxx}替换和spel，并支持扩展</p></li><li><p>[feat] ListenerVariable监听器变量新增FlowParams字段，方便开始监听器全局传递参数</p></li><li><p>[feat] 终止新增对开始和完成监听器的支持</p></li><li><p>[update] springboot项目的条件表达式默认支持spel</p></li><li><p>[update] 历史记录改为单条保存，删除重复代码</p></li><li><p>[update] 修改FlowUserDao的bean名称</p></li><li><p>[update] 中间节点拆分为或签，会签，票签</p></li><li><p>[fix] 修复历史记录创建时间相等，导致流程图渲染异常</p></li><li><p>[fix]修复Mybatis逻辑删除变成真实删除的缺陷                               @xiarigang</p></li><li><p>[refactor] 重构id生成器，支持orm默认策略，删除数据填充默认实现类，改为匿名类</p></li></ul><h1 id="部分更新内容介绍" tabindex="-1"><a class="header-anchor" href="#部分更新内容介绍" aria-hidden="true">#</a> 部分更新内容介绍</h1><h2 id="_1、增加办理人变量表达式" tabindex="-1"><a class="header-anchor" href="#_1、增加办理人变量表达式" aria-hidden="true">#</a> 1、增加办理人变量表达式</h2><h3 id="_1-1、默认办理人变量策略" tabindex="-1"><a class="header-anchor" href="#_1-1、默认办理人变量策略" aria-hidden="true">#</a> 1.1、默认办理人变量策略</h3><h4 id="前端页面设置变量" tabindex="-1"><a class="header-anchor" href="#前端页面设置变量" aria-hidden="true">#</a> 前端页面设置变量</h4><ul><li><p>比如：<code>@@default@@|\${handler1},role:1,1</code></p></li><li><p><code>@@default@@|\${handler1}</code>中@@default@@表示默认办理人变量策略，handler1是需要被流程变量中替换的标识</p></li><li><p><code>role:1,1</code>表示办理人角色和具体办理人</p></li></ul><figure><img src="`+i+`" alt="" tabindex="0"><figcaption></figcaption></figure><h4 id="后端代码设置变量" tabindex="-1"><a class="header-anchor" href="#后端代码设置变量" aria-hidden="true">#</a> 后端代码设置变量</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
// 流程变量
Map&lt;String, Object&gt; variable = new HashMap&lt;&gt;();
variable.put(&quot;handler1&quot;, &quot;100&quot;);
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2、spel办理人变量策略" tabindex="-1"><a class="header-anchor" href="#_1-2、spel办理人变量策略" aria-hidden="true">#</a> 1.2、spel办理人变量策略</h3><h4 id="前端页面设置变量-1" tabindex="-1"><a class="header-anchor" href="#前端页面设置变量-1" aria-hidden="true">#</a> 前端页面设置变量</h4><ul><li><p>比如：<code>@@spel@@|#{@user.evalVar(#handler2)}</code></p></li><li><p><code>#{@user.evalVar(#handler2)}</code>是spel表达式，<code>#handler2</code>是方法入参变量，可以不设置</p></li></ul><figure><img src="`+n+`" alt="" tabindex="0"><figcaption></figcaption></figure><h4 id="后端代码设置变量-1" tabindex="-1"><a class="header-anchor" href="#后端代码设置变量-1" aria-hidden="true">#</a> 后端代码设置变量</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 用户类
 */
@Component(&quot;user&quot;)
public class User {

    /**
     * spel办理人变量表达式
     * @param handler2 办理人
     * @return String
     */
    public String evalVar(String handler2) {
        return handler2;
    }
}

// 流程变量
Map&lt;String, Object&gt; variable = new HashMap&lt;&gt;();
variable.put(&quot;handler2&quot;, &quot;101&quot;);
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、监听器变量新增flowparams字段" tabindex="-1"><a class="header-anchor" href="#_2、监听器变量新增flowparams字段" aria-hidden="true">#</a> 2、监听器变量新增FlowParams字段</h2><blockquote><p>ListenerVariable监听器变量新增FlowParams字段，方便开始监听器全局传递参数</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class GlobalStartListener implements Listener {


  private static final Logger log = LoggerFactory.getLogger(GlobalStartListener.class);

  /**
   * 设置办理人id、所拥有的权限等操作，也可以放到业务代码中办理前设置，或者局部监听器
   * @param listenerVariable 监听器变量
   */
  @Override
  public void notify(ListenerVariable listenerVariable) {
    log.info(&quot;全局开始监听器&quot;);

    FlowParams flowParams = listenerVariable.getFlowParams();
    LoginUser user = SecurityUtils.getLoginUser();
    // 设置当前办理人id
    flowParams.setHandler(user.getUser().getUserId().toString());

    // 设置办理人所拥有的权限，比如角色、部门、用户等
    List&lt;String&gt; permissionList = flowParams.getPermissionFlag();
    if (StringUtils.isEmpty(permissionList)) {
      permissionList = new ArrayList&lt;&gt;();
    }

    List&lt;SysRole&gt; roles = user.getUser().getRoles();
    if (Objects.nonNull(roles)) {
      permissionList.addAll(roles.stream().map(role -&gt; &quot;role:&quot; + role.getRoleId()).collect(Collectors.toList()));
    }
    permissionList.add(&quot;dept:&quot; + SecurityUtils.getLoginUser().getUser().getDeptId());
    permissionList.add(user.getUser().getUserId().toString());
    flowParams.setPermissionFlag(permissionList);

    log.info(&quot;全局开始监听器结束;{}&quot;, &quot;开启流程完成&quot;);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、条件表达式默认支持spel" tabindex="-1"><a class="header-anchor" href="#_3、条件表达式默认支持spel" aria-hidden="true">#</a> 3、条件表达式默认支持spel</h2><blockquote><p>springboot项目的条件表达式默认支持spel</p></blockquote><ul><li><p>前端配置如<code>#{@user.eval(#flag)}</code>表达式，入库前要拼接前缀，方便区分表达式类型，最终为<code>@@spel@@|#{@user.eval(#flag)}</code></p></li><li><p><code>#flag</code>为变量和以下方法入参命名一致，可不设置入参</p></li></ul><figure><img src="`+a+`" alt="" tabindex="0"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component(&quot;user&quot;)
public class User {

  /**
   * spel条件表达：判断大于等4
   * @param flag 待判断的字符串
   * @return boolean
   */
  public boolean eval(String flag) {
    BigDecimal a = new BigDecimal(flag);
    BigDecimal b = new BigDecimal(&quot;4&quot;);
    return a.compareTo(b) &gt; 0;
  }
}

/**
 * 新增OA 请假申请
 *
 * @param testLeave OA 请假申请
 * @return 结果
 */
@Override
public int insertTestLeave(TestLeave testLeave, String flowStatus)
{
  FlowParams flowParams = FlowParams.build().flowCode(getFlowType(testLeave));
  // 流程变量
  Map&lt;String, Object&gt; variable = new HashMap&lt;&gt;();
  variable.put(&quot;flag&quot;, String.valueOf(testLeave.getDay()));
  flowParams.variable(variable);

  Instance instance = insService.start(id, flowParams);
  return instance != null? 1 : 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="warm-flow介绍" tabindex="-1"><a class="header-anchor" href="#warm-flow介绍" aria-hidden="true">#</a> warm-flow介绍</h1><blockquote><p>[!IMPORTANT] Warm-Flow国产工作流引擎🎉，其特点简洁轻量但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件。</p></blockquote><ol><li><p>简洁易用：只有7张表，代码量少，可快速上手和集成</p></li><li><p>审批功能：支持通过、退回、任意跳转、转办、终止、会签、票签、委派和加减签、互斥和并行网关</p></li><li><p>监听器与流程变量：支持五种监听器，可应对不同场景，灵活可扩展，参数传递，动态权限</p></li><li><p>流程图：流程引擎自带流程图，可在不集成流程设计器情况下使用</p></li><li><p>条件表达式：内置常见的和spel条件表达式，并且支持自定义扩展</p></li><li><p>办理人变量表达式：内置\${handler}和spel格式的表达式，可满足不同场景，灵活可扩展</p></li><li><p>orm框架扩展：目前支持MyBatis、Mybatis-Plus、Mybatis-Flex和Jpa，后续会由社区提供其他支持，扩展方便</p></li><li><p>数据库支持：目前支持MySQL 、Oracle 和PostgreSQL，后续会继续支持其他数据库或者国产数据库</p></li><li><p>多租户与软删除：流程引擎自身维护多租户和软删除实现，也可使用对应orm框架的实现方式</p></li><li><p>支持角色、部门和用户等权限配置</p></li><li><p>同时支持spring和solon</p></li><li><p>兼容java8和java17,理论11也可以</p></li><li><p>官方提供基于ruoyi-vue封装实战项目，很实用</p></li></ol><h2 id="演示地址" tabindex="-1"><a class="header-anchor" href="#演示地址" aria-hidden="true">#</a> 演示地址</h2><ul><li>admin/admin123</li></ul><p>演示地址：http://www.hhzai.top</p><h2 id="官网" tabindex="-1"><a class="header-anchor" href="#官网" aria-hidden="true">#</a> 官网</h2><p>http://warm-flow.cn</p><p>关于 Dromara</p><p>Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。</p><p>Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。</p><p><strong>欢迎大家来到知识星球和我互动</strong></p><figure><img src="`+l+'" alt="" tabindex="0"><figcaption></figcaption></figure>',38),o=[v];function u(m,p){return r(),d("div",null,o)}const f=s(c,[["render",u],["__file","warm-flow-v1.2.8.html.vue"]]);export{f as default};
