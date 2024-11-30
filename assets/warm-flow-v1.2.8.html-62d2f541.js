import{_ as e,a as i,b as n,c as a}from"./warm-flow-v1.2.8-3-4ae5df61.js";import{_ as s}from"./qrcode_zsxq-8eef4d18.js";import{_ as t,o as l,c as r,f as d}from"./app-bdc8102f.js";const o={},c=d('<h1 id="the-warm-flow-version-1-2-8-is-updated-and-the-new-variable-expression-and-conditional-expression-support-spel-are-added" tabindex="-1"><a class="header-anchor" href="#the-warm-flow-version-1-2-8-is-updated-and-the-new-variable-expression-and-conditional-expression-support-spel-are-added" aria-hidden="true">#</a> The warm-flow version 1.2.8 is updated, and the new variable expression and conditional expression support spel are added.</h1><figure><img src="'+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><ul><li><p>[Upgrade Notes]]</p></li><li><p>In this upgrade, the built-in json library is loaded in snack3 mode instead of spi mode. The implementation of which json exists in the business project will be used. The 1 types of json are supported to be loaded in sequence: snack3, jackson, fastjson and gson. Currently, only these 4 types are implemented and can be extended.</p></li><li><p>If the snack3 library is not integrated, the snack3 library needs to be used separately (the original component uses the snack3 library).</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      &lt;dependency&gt;
          &lt;groupId&gt;org.noear&lt;/groupId&gt;
          &lt;artifactId&gt;snack3&lt;/artifactId&gt;
          &lt;version&gt;3.2.88&lt;/version&gt;
      &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Update log</p></li><li><p>[feat] json library supports snack3, jackson, fastjson, and gson, and supports extension</p></li><li><p>[feat] adds the variable expression of the handling person, supports \${xxx} substitution and spel, and supports extension</p></li><li><p>[feat] Add a FlowParams field to ListenerVariable the listener variable to facilitate the global transmission of parameters to the listener.</p></li><li><p>[feat] End new support for start and finish listeners</p></li><li><p>[update] the conditional expression of springboot project supports spel by default</p></li><li><p>[update] Change the historical record to a single record and delete duplicate codes</p></li><li><p>[update] Modify the FlowUserDao bean name</p></li><li><p>[update] The middle node is split into or, countersign, and ticket sign</p></li><li><p>[fix] The creation time of the repair history is equal, resulting in abnormal rendering of the flowchart</p></li><li><p>[fix] fix the defect that Mybatis logical deletion becomes real deletion @ xiarigang</p></li><li><p>[refactor] Reconstruct the ID generator to support the default ORM policy. Delete the data and fill the default implementation class, and change it to an anonymous class.</p></li></ul><h1 id="partial-update-content-introduction" tabindex="-1"><a class="header-anchor" href="#partial-update-content-introduction" aria-hidden="true">#</a> Partial update content introduction</h1><h2 id="_1-add-the-variable-expression-of-the-handling-person" tabindex="-1"><a class="header-anchor" href="#_1-add-the-variable-expression-of-the-handling-person" aria-hidden="true">#</a> 1, add the variable expression of the handling person</h2><h3 id="_1-1-default-handler-variable-policy" tabindex="-1"><a class="header-anchor" href="#_1-1-default-handler-variable-policy" aria-hidden="true">#</a> 1.1. Default Handler Variable Policy</h3><h4 id="front-end-page-setting-variable" tabindex="-1"><a class="header-anchor" href="#front-end-page-setting-variable" aria-hidden="true">#</a> Front-end page setting variable</h4><ul><li><p>For example: &#39;@ @ @ |\${ brush},role:1,1&#39;</p></li><li><p>&#39;@ @ @ @ |\${&#39;} @ @ @ @ @ @ @ indicates the default supervisor variable strategy, which is the identifier that needs to be replaced in the process variable.</p></li><li><p>&#39;role:1,1 &#39;indicates the role of the person in charge and the specific person in charge</p></li></ul><figure><img src="`+i+`" alt="" tabindex="0"><figcaption></figcaption></figure><h4 id="backend-code-setting-variables" tabindex="-1"><a class="header-anchor" href="#backend-code-setting-variables" aria-hidden="true">#</a> Backend Code Setting Variables</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
// 流程变量
Map&lt;String, Object&gt; variable = new HashMap&lt;&gt;();
variable.put(&quot;handler1&quot;, &quot;100&quot;);
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2、spel-handle-variable-strategy" tabindex="-1"><a class="header-anchor" href="#_1-2、spel-handle-variable-strategy" aria-hidden="true">#</a> 1.2、spel Handle Variable Strategy</h3><h4 id="front-end-page-setup-variables" tabindex="-1"><a class="header-anchor" href="#front-end-page-setup-variables" aria-hidden="true">#</a> Front End Page Setup Variables</h4><ul><li><p>For example: &#39;@ @ spel @ |#{ @ user. (#) resp.}&#39;</p></li><li><p>&#39;#{@ user.evalVar(#handler2)}&#39; is a spel expression, &#39;#handler2&#39; is a method input variable, which may not be set</p></li></ul><figure><img src="`+n+`" alt="" tabindex="0"><figcaption></figcaption></figure><h4 id="backend-code-setting-variables-1" tabindex="-1"><a class="header-anchor" href="#backend-code-setting-variables-1" aria-hidden="true">#</a> Backend Code Setting Variables</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、listener-variables-add-flowparams-fields" tabindex="-1"><a class="header-anchor" href="#_2、listener-variables-add-flowparams-fields" aria-hidden="true">#</a> 2、Listener Variables Add FlowParams Fields</h2><blockquote><p>Add a FlowParams field to ListenerVariable the listener variable to facilitate the global transfer of parameters to the listener.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、conditional-expressions-support-spel-by-default" tabindex="-1"><a class="header-anchor" href="#_3、conditional-expressions-support-spel-by-default" aria-hidden="true">#</a> 3、conditional expressions support spel by default</h2><blockquote><p>The conditional expression of the springboot project supports spel by default.</p></blockquote><ul><li><p>The front-end configuration is, for example, &#39;#{@ user.eval(#flag)}&#39; expression. Before warehousing, the prefix should be spliced to facilitate the differentiation of expression types. The final value is &#39;@ @ spel @@|#{@ user.eval(#flag)}&#39;</p></li><li><p>&#39;#flag&#39; indicates that the variable is named the same as the following method input parameters, but the input parameters may not be set.</p></li></ul><figure><img src="`+a+`" alt="" tabindex="0"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component(&quot;user&quot;)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="warm-flow-introduction" tabindex="-1"><a class="header-anchor" href="#warm-flow-introduction" aria-hidden="true">#</a> warm-flow introduction</h1><blockquote><p>[!IMPORTANT] Warm-Flow Domestic Workflow Engine🎉, Its characteristics are simple and lightweight but not simple, complete with five internal organs, independent components, expandable, and can meet the components of small and medium-sized projects.</p></blockquote><ol><li><p>Simple and easy to use: only 7 tables, less code, can be quickly started and integrated</p></li><li><p>Approval function: supports pass, return, arbitrary jump, transfer, termination, countersign, ticket sign, delegation, addition and subtraction, mutual exclusion and parallel gateway</p></li><li><p>Listener and process variables: supports five kinds of listeners, can cope with different scenarios, flexible and scalable, parameter transfer, dynamic permissions</p></li><li><p>Flowchart: The process engine comes with a flowchart that can be used without integrating the process designer.</p></li><li><p>Conditional expressions: Built-in common and spel conditional expressions, and support for custom extensions.</p></li><li><p>Handler variable expression: built-in \${handler} and spel format expression, can meet different scenarios, flexible and scalable</p></li><li><p>Orm framework extension: currently supports MyBatis, Mybatis-Plus, Mybatis-Flex and Jpa, and will be supported by the community in the future, which is convenient for expansion.</p></li><li><p>Database support: currently supports MySQL, Oracle and PostgreSQL, and will continue to support other databases or domestic databases in the future.</p></li><li><p>Multi-tenancy and soft deletion: The process engine itself maintains the implementation of multi-tenancy and soft deletion, and can also use the implementation of the corresponding orm framework.</p></li><li><p>Support role, department and user permissions configuration</p></li></ol><p>Supports both Spring and Solon</p><ol start="12"><li><p>Compatible with java8 and java17, theory 11 can also be</p></li><li><p>The official provides practical projects based on ruoyi-vue packaging, which is very practical.</p></li></ol><h2 id="demo-address" tabindex="-1"><a class="header-anchor" href="#demo-address" aria-hidden="true">#</a> Demo Address</h2><ul><li>admin/admin123</li></ul><p>Demo Address：http://www.hhzai.top</p><h2 id="official-website" tabindex="-1"><a class="header-anchor" href="#official-website" aria-hidden="true">#</a> official website</h2><p>http://warm-flow.cn</p><p>About Dromara</p><p>Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.</p><p>Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.</p><p>**Welcome to the knowledge planet and I interact * *</p><figure><img src="`+s+'" alt="" tabindex="0"><figcaption></figcaption></figure>',40),p=[c];function u(v,m){return l(),r("div",null,p)}const f=t(o,[["render",u],["__file","warm-flow-v1.2.8.html.vue"]]);export{f as default};
