import{_ as e,o as i,c as n,f as t}from"./app-6db77336.js";const s={},a=t(`<h2 id="author-introduction" tabindex="-1"><a class="header-anchor" href="#author-introduction" aria-hidden="true">#</a> Author introduction</h2><ul><li><p>Name: xuejm</p></li><li><p>dromara member of open source organization, dromara/easy-query author</p></li><li><p>java/.net related development experience of more than 10 years, rookie 1</p></li><li><p>I like open source technology and am willing to specialize in research and sharing. I have many open source projects O(∩_∩)O ha ha ~</p></li><li><p>Personal space: https://github.com/xuejmnet和 https://gitee.com/xuejm</p></li></ul><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>ORM is also called object relational mapping. 1 a good ORM not only supports OM, but more importantly, it makes reasonable use&#39; R&#39; and&#39; easy-query&#39; is 1 modern ORM that supports object relations and SQL expressions.</p><h2 id="easyquery-introduction" tabindex="-1"><a class="header-anchor" href="#easyquery-introduction" aria-hidden="true">#</a> EasyQuery Introduction</h2><p>EasyQuery is the 1 modern ORM under Java. It has strong type, lightweight and high performance characteristics. It is dedicated to solving jdbc queries, supporting object model relational filtering, implicit queries and pure SQL expression queries.</p><p>The framework supports java8 and above versions without dependencies. It supports a series of functions such as sub-database and sub-table, field encryption, cascade filtering, logical deletion, multi-tenant, dynamic table name, entity-free CRUD, calculation attribute, optimistic lock, batch processing, data tracking difference update, etc. It also provides users with great expansion and dialect custom function expansion.</p><p>! <a href="/assets/img/news/EasyQuery-0.png"></a></p><h3 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h3><p>**Do you have the following pain points in using the existing orm? * *</p><blockquote><p>1.orm usage is not easy to maintain, ide can not intelligent prompt</p><blockquote></blockquote><p>2.orm does not support join or multi-table join function is weak and cannot meet the situation of group join subquery or from subquery, etc.</p><blockquote></blockquote><p>3.orm model cascade filtering object relationship is too weak, only supports one-to-many one-to-one pull, does not support filtering</p><blockquote></blockquote><ol start="4"><li>There is no unified function to support mapping translation to all databases</li></ol><blockquote></blockquote><p>5.orm function is weak to support the business needs to add various external components to meet the business</p><blockquote></blockquote><p>6.orm cannot be perfectly integrated with the existing pojo system</p><blockquote></blockquote><ol start="7"><li>do not support sub-database sub-table need to introduce additional sharding to support</li></ol></blockquote><p>If you have the above pain points, then &#39;easy-query&#39; can help you.</p><p>**What can easy-query bring to developers? * *</p><blockquote><ol><li>simple, easy-to-use and efficient api, convenience and maintainability brought by streaming writing, and rejection of magic value</li></ol><blockquote></blockquote><ol start="2"><li>strong type can only prompt that even if you are a new beginner, Xiao Bai can easily write the desired code under the prompt of idea.</li></ol><blockquote></blockquote><ol start="3"><li>complex multi-table join, subquery, exists no longer need to worry about the need to introduce additional components in the face of various complex business scenarios</li></ol><blockquote></blockquote><ol start="4"><li>model relation query embodies ORM &#39;r&#39; incisively and vividly. it is not only a simple query result but also a perfect object model screening. just like stream query database, it can assert data related to me by methods such as&#39; any&#39;,&#39; none&#39;, etc.</li></ol><blockquote></blockquote><ol start="5"><li>structured DTO can be pulled at will. after the user creates each model relationship, the object of any structure can be quickly pulled and converted into json. there is no need to worry about the acquisition of one-to -1., many-to-many 1. and many-to-many under paging.</li></ol><blockquote></blockquote><ol start="6"><li>perfect elimination of performance problems caused by n 1</li></ol><blockquote></blockquote><ol start="7"><li>all functions are completely free and permanently open source, and the author writes his own idea plug-in to help everyone improve efficiency. happy code</li></ol></blockquote><h2 id="actual-business-case" tabindex="-1"><a class="header-anchor" href="#actual-business-case" aria-hidden="true">#</a> Actual business case</h2><p>The user architecture of the system is generally user roles (many-to-many), user enterprises are many-to -1, and role menus are many-to-many.</p><h3 id="user-filtering" tabindex="-1"><a class="header-anchor" href="#user-filtering" aria-hidden="true">#</a> User Filtering</h3><h4 id="simple-filter" tabindex="-1"><a class="header-anchor" href="#simple-filter" aria-hidden="true">#</a> Simple Filter</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//筛选用户名称包含小明的
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user-&gt;user.name().like(&quot;小明&quot;))
    .toList()
  
//筛选用户名称包含小明的
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
   // ifnull(name,&#39;小王&#39;) like &#39;小明&#39;
    .where(user-&gt;user.name().nullOrDefault(&quot;小王&quot;).like(&quot;小明&quot;))
    .toList()
  
//筛选用户名称包含小明并且年龄小于18岁的
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user-&gt;{
         //name like ? and age &lt; ?
            user.name().like(&quot;小明&quot;);
            user.age().lt(18)
    })
    .toList()
  
//返回分页结果
EasyPageResult&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user-&gt;{
         //name like ? and age &lt; ?
            user.name().like(&quot;小明&quot;);
            user.age().lt(18)
    })
   .orderBy(user-&gt;user.createTime().desc())//按用户创建时间倒序
    .toPageResult(1,20)
  

//筛选用户名称包含小明或者年龄小于18岁的
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user-&gt;{
       user.or(()-&gt;{
           //name like ? or age &lt; ?
            user.name().like(&quot;小明&quot;);
            user.age().lt(18)
        })
    })
    .toList()

//筛选用户名称包含小明或者年龄小于18岁的,只返回用户id和name
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user-&gt;{
       user.or(()-&gt;{
           //name like ? or age &lt; ?
            user.name().like(&quot;小明&quot;);
            user.age().lt(18)
        })
    })
   //仅返回id和name
   .select(user-&gt; user.FETCHER.id().name().fetchProxy())
    .toList()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="implicit-filtering" tabindex="-1"><a class="header-anchor" href="#implicit-filtering" aria-hidden="true">#</a> Implicit Filtering</h4><h5 id="a-pair-of-1-implicitly-join" tabindex="-1"><a class="header-anchor" href="#a-pair-of-1-implicitly-join" aria-hidden="true">#</a> A pair of 1 implicitly join</h5><blockquote><p>because users and enterprises have multiple pairs of 1, when filtering users, object relationships can be used to filter on the condition of enterprises to automatically join users.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//筛选用户名称包含小明并且在JAVA企业上班的
List&lt;SysUser&gt; list = easyEntityQuery.queryable(SysUser.class)
    .where(user -&gt; {
        user.name().like(&quot;小明&quot;);
        user.company().name().like(&quot;JAVA企业&quot;);
    }).toList();
//from user left join company on ... where user.name like ? and company.name like ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="one-to-many-implicit-subquery" tabindex="-1"><a class="header-anchor" href="#one-to-many-implicit-subquery" aria-hidden="true">#</a> One-to-many implicit subquery</h5><blockquote><p>When we create a good enterprise relationship in the user object, we can use the enterprise as a condition when filtering users. On the contrary, when we create a good relationship between the enterprise and the user in the enterprise model, we can also use the user as a condition to help us quickly filter.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//筛选企业,筛选条件为企业下的员工存在名字是小明的
List&lt;Company&gt; companies = easyEntityQuery.queryable(Company.class)
    .where(com -&gt; {
      com.users().any(u -&gt; {
        u.name().like(&quot;小明&quot;);
      });
    }).toList();
//from company where exists( from user where .... and user.name like ?)


//筛选用户条件为用户包含/admin的菜单路径
List&lt;SysUser&gt; userWithMenuContainsAdminPath = easyEntityQuery.queryable(SysUser.class)
    .where(user -&gt; {
      //筛选条件为用户下的角色,因为角色不需要过滤所以直接展开判断菜单
      //菜单里面存在任意一个路径是&#39;/admin&#39;的即可
      user.roles().flatElement().menus().any(menu -&gt; menu.route().like(&quot;/admin&quot;));
    }).toList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="multi-table-explicit-join" tabindex="-1"><a class="header-anchor" href="#multi-table-explicit-join" aria-hidden="true">#</a> Multi-table explicit join</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
//查询用户join企业表条件是企业的名称包含JAVA企业这几个字
List&lt;Company&gt; companies = easyEntityQuery.queryable(SysUser.class)
    .leftJoin(Company.class, (user, com) -&gt; user.companyId().eq(com.id()))
    .where((user, com) -&gt; com.name().like(&quot;JAVA企业&quot;))
    .select((user, com) -&gt; com).toList();
//select company.* from user left join company on user.company_id = company.id where company.name like ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="get-user-owned-menus-directly" tabindex="-1"><a class="header-anchor" href="#get-user-owned-menus-directly" aria-hidden="true">#</a> Get user-owned menus directly</h5><blockquote><p>there is no direct relationship between users and menus. the middle and role tables are many-to-many tables. there are also two tables user_role and role_menu tables in the middle.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//查询小明用户拥有的菜单id集合
List&lt;String&gt; menuIds = easyEntityQuery.queryable(SysUser.class)
    .where(user -&gt; user.name().eq(&quot;小明&quot;))
    .toList(user -&gt; user.roles().flatElement().menus().flatElement().id());

//查询小明用户拥有的菜单集合
List&lt;SysMenu&gt; menus = easyEntityQuery.queryable(SysUser.class)
    .where(user -&gt; user.name().eq(&quot;小明&quot;))
    .toList(user -&gt; user.roles().flatElement().menus().flatElement());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="return-user-structure-with-role" tabindex="-1"><a class="header-anchor" href="#return-user-structure-with-role" aria-hidden="true">#</a> Return User Structure with Role</h5><blockquote><p>Return Results</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{user:{id:xxx,roles:[{...}]}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//返回小于18岁的用户并且附带角色
List&lt;SysUser&gt; userAndRoles = easyEntityQuery.queryable(SysUser.class)
    .includes(user -&gt; user.roles())
    .where(user -&gt; user.age().lt(18))
    .toList();

//返回用户和用户拥有的角色分页返回一对多
EasyPageResult&lt;SysUser&gt; userAndRolePage = easyEntityQuery.queryable(SysUser.class)
    .includes(user -&gt; user.roles())
    .where(user -&gt; user.age().lt(18))
    .toPageResult(1, 20);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="implicit-query-to-get-anonymous-results" tabindex="-1"><a class="header-anchor" href="#implicit-query-to-get-anonymous-results" aria-hidden="true">#</a> Implicit query to get anonymous results</h5><blockquote><p>sometimes we need to obtain the intermediate results above to facilitate java internal calculation. most orm only supports returning map objects at this time, which will lead to string all over and specific types will be lost, which is very inconvenient to use.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
//查询返回用户id,用户名称和用户所在企业名称无需定义中间对象适用临时上下文获取或者group时候的聚合结果
List&lt;Draft3&lt;String, String, String&gt;&gt; userInfo = easyEntityQuery.queryable(SysUser.class)
      .where(user -&gt; {
          user.name().like(&quot;小明&quot;);
          user.company().name().like(&quot;JAVA企业&quot;);
      }).select(user -&gt; Select.DRAFT.of(
            user.id(),
            user.name(),
            user.company().name()
    )).toList();
for (Draft3&lt;String, String, String&gt; userAdnCom : userInfo) {
  String userId = userAdnCom.getValue1();
  String userName = userAdnCom.getValue2();
  String companyName = userAdnCom.getValue3();
}


List&lt;Draft2&lt;String, Integer&gt;&gt; list2 = easyEntityQuery.queryable(SysUser.class)
      .where(user -&gt; {
        user.name().like(&quot;小明&quot;);
        user.company().name().like(&quot;JAVA企业&quot;);
      })
      .groupBy(user -&gt; GroupKeys.TABLE1.of(user.name()))
      .select(group -&gt; Select.DRAFT.of(
          group.key1(),//user.name
          group.sum(group.groupTable().age())//sum(user.age)
      )).toList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="structured-dto" tabindex="-1"><a class="header-anchor" href="#structured-dto" aria-hidden="true">#</a> Structured DTO</h3><p>Many times we need to return a custom data structure instead of the entire database structure when accessing the response.</p><p>So we use the easy-query plug-in here to quickly build a structured DTO response.</p><ul><li><p>First, we install the latest version of&#39; EasyQueryAssistant&#39; plug-in in the idea plug-in market.</p></li><li><p>The second part is right-CreateStructDTO on the package that needs to create the DTO</p></li><li><p>Step 3 Select the structured data to be returned</p></li></ul><p>! <a href="/assets/img/news/EasyQuery-1.jfif"></a></p><p>! <a href="/assets/img/news/EasyQuery-2.jfif"></a></p><blockquote><p>the following dto will be generated in the end</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
/**
 * this file automatically generated by easy-query struct dto mapping
 * 当前文件是easy-query自动生成的 结构化dto 映射
 * {@link com.easy.query.test.entity.blogtest.SysUser }
 *
 * @author easy-query
 */
@Data
public class UserRoleMenuDTO {
    private String id;
    private String name;
    @Navigate(value = RelationTypeEnum.ManyToMany)
    private List&lt;InternalRoles&gt; roles;
    /**
     * {@link com.easy.query.test.entity.blogtest.SysRole }
     */
    @Data
    public static class InternalRoles {
        private String id;
        private String name;
        @Navigate(value = RelationTypeEnum.ManyToMany)
        private List&lt;InternalMenus&gt; menus;
    }

    /**
     * {@link com.easy.query.test.entity.blogtest.SysMenu }
     */
    @Data
    public static class InternalMenus {
        private String id;
        private String name;
        private String route;
        private String icon;
    }

}
//一句话返回需要的结构DTO
//通过selectAutoInclude即可映射到我们的DTO 可以返回任意对象关系


List&lt;UserRoleMenuDTO&gt; menus = easyEntityQuery.queryable(SysUser.class)
    .where(u -&gt; {
      u.name().like(&quot;小明&quot;);
      u.createTime().rangeClosed(LocalDateTime.now().plusDays(-100),LocalDateTime.now());
    })
    .selectAutoInclude(UserRoleMenuDTO.class)
    .toList();

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>nullOrDefault</td><td>Return parameter value if column is null</td></tr><tr><td>count</td><td>returns long</td></tr><tr><td>intCount</td><td>Statistics returned int</td></tr><tr><td>min</td><td>min</td></tr><tr><td>max</td><td>max</td></tr></tbody></table><h4 id="string-functions" tabindex="-1"><a class="header-anchor" href="#string-functions" aria-hidden="true">#</a> String Functions</h4><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>subString</td><td>Cut string, default start 0</td></tr><tr><td>concat</td><td>Link multiple columns or values</td></tr><tr><td>toLower</td><td>To lowercase</td></tr><tr><td>toUpper</td><td>To uppercase</td></tr><tr><td>trim</td><td>remove spaces before and after</td></tr><tr><td>trimStart</td><td>Remove the leading space</td></tr><tr><td>trimEnd</td><td>Remove trailing spaces</td></tr><tr><td>replace</td><td>Replace string</td></tr><tr><td>leftPad</td><td>left complement</td></tr><tr><td>rightPad</td><td>right complement</td></tr><tr><td>join</td><td>string multi-column join combination returns the common phrase group comma combination</td></tr><tr><td>length</td><td>String length</td></tr><tr><td>compareTo</td><td>Compare String Size</td></tr></tbody></table><h4 id="time-function" tabindex="-1"><a class="header-anchor" href="#time-function" aria-hidden="true">#</a> Time function</h4><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>format</td><td>Java formatting is supported for date formatting</td></tr><tr><td>plus</td><td>Increase Time</td></tr><tr><td>plusMonths</td><td>Add months</td></tr><tr><td>plusYears</td><td>Increase Year</td></tr><tr><td>dayOfYear</td><td>The current number of days represents the number of days in a 1 year</td></tr><tr><td>dayOfWeek</td><td>The current number of days in the 1 year represents the day 0-6 Sunday is 0</td></tr><tr><td>year</td><td>Returns the year</td></tr><tr><td>month</td><td>Returns months 1-12</td></tr><tr><td>day</td><td>Returns the number of days 1-31 in the month</td></tr><tr><td>hour</td><td>Returns hours 0-23</td></tr><tr><td>minute</td><td>Returns minutes 0-59</td></tr><tr><td>second</td><td>Returns the number of seconds 0-59</td></tr><tr><td>duration</td><td>Returns the interval of days/hours/.... a.duration (B, DateTimeDurationEnum.Days) how many days is a greater than B, if a is less than B, returns the negative number of days between two dates a and B</td></tr><tr><td>now</td><td>Current time</td></tr><tr><td>utcNow</td><td>Current UTC time</td></tr></tbody></table><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//函数嵌套处理
List&lt;SysUser&gt; users = easyEntityQuery.queryable(SysUser.class)
    .where(user -&gt; {
      user.createTime()
        .nullOrDefault(LocalDateTime.now())
        .plus(1, TimeUnit.DAYS)
        .format(&quot;yyyy-MM-dd HH:mm:ss&quot;)
        .eq(&quot;2024-01-01 00:00:00&quot;);
    }).toList();
//SQL:FROM user  WHERE DATE_FORMAT(date_add(IFNULL(\`create_time\`,?), interval (?) microsecond),&#39;%Y-%m-%d %H:%i:%s&#39;) = ?
//参数:2024-05-20T14:40:08.152(LocalDateTime),86400000000(Long),2024-01-01 00:00:00(String)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you are interested in this framework, you are welcome to try and your comments and suggestions. The framework has too many functions that cannot be displayed here. More functions can be consulted in github warehouse or gitee warehouse.</p><h3 id="finally" tabindex="-1"><a class="header-anchor" href="#finally" aria-hidden="true">#</a> Finally</h3><p>easy-qeury &#39;is very pleased to join dromara organization, hoping to thrive under the organization and contribute 1 of its own weak strength to java open source.</p><p>Finally, please attach the project address and welcome everyone to join star to submit pr issue.</p><p>github repository https://github.com/dromara/easy-query</p><p>gitee warehouse https://gitee.com/dromara/easy-query</p>`,58),r=[a];function l(d,u){return i(),n("div",null,r)}const c=e(s,[["render",l],["__file","EasyQuery.html.vue"]]);export{c as default};
