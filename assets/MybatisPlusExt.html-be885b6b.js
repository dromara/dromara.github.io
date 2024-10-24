import{_ as e,a as i}from"./MybatisPlusExt-1-5fe27003.js";import{_ as n,o as a,c as t,f as s}from"./app-57280697.js";const l={},d=s('<figure><img src="'+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity</p><p>Although MybatisPlus (hereinafter referred to as MP) is much more silky than Mybatis, do you still miss the silky feeling of JPA(Hibernate) occasionally in daily use and devote yourself to business development? if you do, congratulations on your discovery of MybatisPlusExt (hereinafter referred to as MPE).</p><p>MPE further expands the package of MP, that is, it retains the original function of MP and adds more useful and convenient functions. Also adhere to the principle of MP, only do enhancement without change, so even in the case of using MPE, you can still use only MP 100%, so what MP can do, MPE can not only do but also do more.</p><p>The enhanced functions are embodied in several aspects: &#39;free handwriting Mapper&#39;,&#39; automatic table build&#39;, &#39;automatic data filling (similar to audit in JPA)&#39;, &#39;associated query (similar to join in SQL)&#39;, &#39;automatic update of redundant data&#39;, and&#39; dynamic query conditions &#39;.</p><h2 id="start" tabindex="-1"><a class="header-anchor" href="#start" aria-hidden="true">#</a> Start</h2><blockquote><h3 id="_1-introduce-jar-package" tabindex="-1"><a class="header-anchor" href="#_1-introduce-jar-package" aria-hidden="true">#</a> 1. introduce jar package</h3></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- spring boot2.* --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.tangzc&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-plus-ext-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;{maven仓库搜索最新版}&lt;/version&gt;
&lt;/dependency&gt;

&lt;!-- spring boot3.* --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.tangzc&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-plus-ext-spring-boot3-starter&lt;/artifactId&gt;
    &lt;version&gt;{maven仓库搜索最新版}&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_2-code-pre-generation" tabindex="-1"><a class="header-anchor" href="#_2-code-pre-generation" aria-hidden="true">#</a> 2. code pre-generation</h3></blockquote><h4 id="pain-points" tabindex="-1"><a class="header-anchor" href="#pain-points" aria-hidden="true">#</a> Pain points:</h4><ol><li><p>The code somewhere wants to use the name of the entity field, but does not want to write a dead string (ugly, compile time cannot be verified).</p></li><li><p>Manually write a Mapper class for each entity, but the Mapper class is empty.</p></li></ol><p><em>**Leave these to MPE!!! * *</em></p><p>It automatically pre-generates the definition of the entity field, the interface definition of the entity Mapper, and the definition of the entity Repository class (which further encapsulates the Mapper) before the code is compiled.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 标记生成表字段定义
@AutoDefine
// 标记生成Mapper和Repository
@AutoRepository
@Data
public class TestTable {

    private String id;
    private String name;
    private int age;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The effect is as follows:</p><figure><img src="`+i+`" alt="" tabindex="0"><figcaption></figcaption></figure><blockquote><h3 id="_3-automatic-table-creation" tabindex="-1"><a class="header-anchor" href="#_3-automatic-table-creation" aria-hidden="true">#</a> 3. automatic table creation</h3></blockquote><p>MPE automatic table building relies on another 1 self-developed framework AutoTable. MPE expands some annotations based on AutoTable and makes Mybatis-plus compatible processing.</p><p>**Make a simple introduction here * *</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@EnableAutoTable
@SpringBootApplication
public class DemoAutoTableApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoAutoTableApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@Table
public class MyTable {
    private Integer id;
    private String userName；
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above code will automatically map the MyTable to the &quot;my_table&quot; table, the fields are<code>id:int</code>、<code>user_name:varchar(255)</code></p><p>PS: Whether the specific table name and field name are underlined depends on the MybatisPlus configuration.</p><p><em>**A fully annotated example is shown below: * *</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@AutoDefine
// 指定表的编码
@MysqlCharset(value = &quot;utf8mb4&quot;, collate = &quot;utf8mb4_general_ci&quot;)
// 指定表的存储引擎
@MysqlEngine(&quot;myisam&quot;)
// 表头同样可以声明单个索引（此处只是举例，等价于username字段上的@Index）
@TableIndex(name = &quot;username_index&quot;, fields = {MyTableDefine.username}, type = IndexTypeEnum.UNIQUE)
// 需要在表头声明多个索引的情况下，需要用@TableIndexes包裹起来
@TableIndexes({
        // 声明普通联合索引
        @TableIndex(name = &quot;username_phone_index&quot;, fields = {MyTableDefine.username, MyTableDefine.phone}),
        // 声明唯一联合索引，单独指定phone的索引排序方式，构建索引的时候indexFields中字段的顺序权重高于fields中的字段
        @TableIndex(name = &quot;username_phone_uni_index&quot;, fields = {MyTableDefine.username}, indexFields = {@IndexField(field = MyTableDefine.phone, sort = IndexSortTypeEnum.DESC)}, type = IndexTypeEnum.UNIQUE),
})
// 指定表名、表注释、数据源、忽略字段（不参与建表，等效于字段上的@Ignore）
@Table(value = &quot;test_table&quot;, comment = &quot;测试表&quot;, dsName = &quot;my-mysql&quot;, excludeProperty={MyTableDefine.extra})
public class MyTable {
    // 指定主键自增注释、类型（数据库数字类型可以跟java字符串类型相互转化）、长度
    // 注意字段名称id会被自动认定为主键不需要再额外指定
    @ColumnComment(&quot;id主键（因为我是独立注解，所以我是大哥，会覆盖下面的comment属性）&quot;)
    @ColumnId(mode = IdType.AUTO, comment = &quot;id主键&quot;, type = MysqlTypeConstant.BIGINT, length = 32)
    private String id;

    // 字段非NULL
    @NotNull
    // 字段默认值是空字符串
    @ColumnDefault(type = DefaultValueEnum.EMPTY_STRING)
    // 指定字段长度
    @ColumnType(length = 100)
    // 指定字段注释
    @ColumnComment(&quot;用户名&quot;)
    // 唯一索引
    @Index(type = IndexTypeEnum.UNIQUE)
    private String username;

    // 设置默认值为0
    @ColumnDefault(&quot;0&quot;)
    @ColumnComment(&quot;年龄&quot;)
    private Integer age;

    @ColumnType(length = 20)
    // 设置注释、默认值、不为空
    @Column(comment = &quot;电话&quot;, defaultValue = &quot;+00 00000000&quot;, notNull = true)
   // 唯一索引快捷方式
    @UniqueIndex
    private String phone;

    // 设置注释、小数（等同于@ColumnType(length = 12, decimalLength = 6)）
    @Column(comment = &quot;资产&quot;, length = 12, decimalLength = 6)
    private BigDecimal money;

    // boolean值设置默认值
    @ColumnDefault(&quot;true&quot;)
    @Column(comment = &quot;激活状态&quot;)
   // 普通索引：指定索引名称、注释、索引方法
    @Index(name = &quot;active_index&quot;, comment = &quot;激活状态索引&quot;)
    private Boolean active;

    // 单独设置字段类型
    @ColumnType(MysqlTypeConstant.TEXT)
    @ColumnComment(&quot;个人简介&quot;)
    private String description;

    // 设置默认值为当前时间
    @ColumnDefault(&quot;CURRENT_TIMESTAMP&quot;)
    @Column(comment = &quot;注册时间&quot;)
    private LocalDateTime registerTime;

    // 忽略该字段，不参与建表
    @Ignore
    private String extra;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_4-data-fill" tabindex="-1"><a class="header-anchor" href="#_4-data-fill" aria-hidden="true">#</a> 4. data fill</h3></blockquote><p>When inserting or updating the database, the data operator, operation time, default value, etc. can be automatically assigned.</p><p>Take article publishing as an example. When publishing Artice, we no longer need to care about too many field values that are not related to business. In the end, we only need to care about the two core data of title and content, and other data will be processed by the framework.</p><p>It involves &#39;data insertion&#39;, &#39;data update&#39;, &#39;data insertion and update&#39; 3 processing opportunities, each of which can insert system time and custom user information.</p><p>**Define Article Entity * *</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@Table(comment = &quot;文章&quot;)
public class Article {
    
    // 字符串类型的ID，默认也是雪花算法的一串数字（MP的默认功能）
    @ColumnComment(&quot;主键&quot;)
    private String id;
    
    @ColumnComment(&quot;标题&quot;)
    private String title;
    
    @ColumnComment(&quot;内容&quot;)
    private String content;
    
    // 默认值用法：文章默认激活状态，ACTIVE为ActicleStatusEnum[ACTIVE, INACTIVE]的枚举名称字符串
    @DefaultValue(&quot;ACTIVE&quot;)
    @ColumnComment(&quot;内容&quot;)
    private ActicleStatusEnum status;
    
    @ColumnComment(&quot;发布时间&quot;)
    // 【插入】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍（注意，这里的时间是MP执行insert的操作的时候的时间，并不是对象构建时候的时间）
    @InsertFillTime
    private Date publishedTime;
    
    @ColumnComment(&quot;发布人&quot;)
    // 【插入】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    @InsertFillData(UserIdAutoFillHandler.class)
    private String publishedUserId;
    
    @ColumnComment(&quot;发布人名字&quot;)
    // 【插入】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    @InsertFillData(UsernameAutoFillHandler.class)
    private String publishedUsername;
    
    @ColumnComment(&quot;最后更新时间&quot;)
    // 【插入和更新】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍
    @InsertUpdateFillTime
    private Date publishedTime;
    
    @ColumnComment(&quot;最后更新人&quot;)
    // 【更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    // @UpdateFillData(UserIdAutoFillHandler.class)
    // 【插入和更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    @InsertUpdateFillData(UserIdAutoFillHandler.class)
    private String publishedUserId;
    
    @ColumnComment(&quot;最后更新人名字&quot;)
    // 【更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    // @UpdateFillData(UsernameAutoFillHandler.class)
    // 【插入和更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    @InsertUpdateFillData(UsernameAutoFillHandler.class)
    private String publishedUsername;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Interface for dynamically populating [user id] * *</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 全局获取用户ID
 * 此处实现IOptionByAutoFillHandler接口和AutoFillHandler接口均可，
 * 实现IOptionByAutoFillHandler接口，可以兼容框架内的BaseEntity。
 * BaseEntity默认需要IOptionByAutoFillHandler的实现。BaseEntity的使用请查看官网。
 */
@Component
public class UserIdAutoFillHandler implements IOptionByAutoFillHandler&lt;String&gt; {

    /**
     * @param object 当前操作的数据对象
     * @param clazz  当前操作的数据对象的class
     * @param field  当前操作的数据对象上的字段
     * @retur
     */
    @Override
    public String getVal(Object object, Class&lt;?&gt; clazz, Field field) {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中
        return request.getHeader(&quot;user-id&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Interface for dynamically populating [user name] * *</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 全局获取用户名
 */
@Component
public class UsernameAutoFillHandler implements AutoFillHandler&lt;String&gt; {

    /**
     * @param object 当前操作的数据对象
     * @param clazz  当前操作的数据对象的class
     * @param field  当前操作的数据对象上的字段
     * @return 当前登录用户id
     */
    @Override
    public String getVal(Object object, Class&lt;?&gt; clazz, Field field) {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中
        return request.getHeader(&quot;user-name&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_5-association-query" tabindex="-1"><a class="header-anchor" href="#_5-association-query" aria-hidden="true">#</a> 5. Association Query</h3></blockquote><p>A data association query solution similar to JPA replaces the join method in SQL (or the method of assembling data in memory), and automatically brings out the associated data when querying an entity by associating the relationship between multiple tables through annotations.</p><p>Take the relationship between the user and the article for example</p><p>**Define Entity * *</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@AutoDefine
@Table(comment = &quot;文章&quot;)
public class Article {

    @ColumnComment(&quot;主键&quot;)
    private String id;

    @ColumnComment(&quot;标题&quot;)
    private String title;

    @Column(comment = &quot;内容&quot;, type = MySqlTypeConstant.MEDIUMTEXT)
    private String content;
    
    @ColumnComment(&quot;发布人&quot;)
    private String publishedUserId;

    @ColumnComment(&quot;审核: 0 不通过、1 通过&quot;)
    private int audit;
    
    @ColumnComment(&quot;发布时间（时间戳）&quot;)
    private Long publishedTime;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@AutoDefine
@Table(comment = &quot;用户信息&quot;)
public class User {

    @ColumnComment(&quot;主键&quot;)
    private String id;

    @ColumnComment(&quot;用户名&quot;)
    private String username;

    @ColumnComment(&quot;密码&quot;)
    private String password;
  
   // 关联该用户发布的所有文章（&quot;audit = 1&quot; 表示的是Article下的audit为1的情况，customCondition的值只能是被关联表下的字段值，且会以and的形式添加在查询条件末尾。）
   @BindEntity(conditions = @JoinCondition(selfField = UserDefine.id, joinField = ArticleDefine.publishedUserId), customCondition = &quot;audit = 1&quot;, orderBy = @JoinOrderBy(field = ArticleDefine.publishedTime, isAsc = false))
   private List&lt;Article&gt; articles;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Requirement: When obtaining user information, you only want to obtain the approved release records of the user, and sort them in reverse order according to the release time. (via custom SQL condition) * *</p><p>writing 1]</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取到需要的user集合
User user = userMapper.getByUsername(name);
// 【推荐】用法一、指定属性关联。
Binder.bindOn(user, User::getArticles);
// 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。
// Binder.bind(user);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>writing 2]</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 本框架拓展的lambda查询器lambdaQueryPlus，增加了bindOne、bindList、bindPage
// 显然这是一种更加简便的查询方式，但是如果存在多级深度的关联关系，此种方法就不适用了，还需要借助Binder
User user = userRepository.lambdaQueryPlus()
        .eq(User::getUsername, name)
       // 【推荐】用法一、指定属性关联，只关联文章这个字段。
        .bindList(User::getArticles);
      // 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。
      // .bindList();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>* If you open SQL printing, you will see two SQL statements. The first one queries user information according to name, and the second one queries all associated data in article according to userId.</p><p><em>**Space is limited, more use (intermediate table query, many-to-many query, etc.), please move to the official document * *</em></p><h4 id="note" tabindex="-1"><a class="header-anchor" href="#note" aria-hidden="true">#</a> Note:</h4><p>In order to solve the problem of database compatibility support, the underlying principle of association query is based on the MybatisPlus BaseMapper implementation, so all associated entities must correspond to the Mapper and inherit from the MybatisPlus BaseMapper, including the entities of the intermediate table, in the case of using the intermediate table association query, also need to follow this constraint.</p><p>MPE is equivalent to treating the Mapper corresponding to the entity as a data access window, so any behavior that needs to query data from the database needs to be completed through the corresponding Mapper.</p><blockquote><h3 id="_6-data-redundancy" tabindex="-1"><a class="header-anchor" href="#_6-data-redundancy" aria-hidden="true">#</a> 6. data redundancy</h3></blockquote><p>In order to avoid high-frequency data association queries, the 1 solution is to do data redundancy, and some fields of other tables are redundant to the current table. However, this scheme involves a problem of how to synchronize data after modification. This function is born to solve this problem.</p><p>In the scenario of user comments, redundant user names and avatars are required in the comments. If the user&#39;s name and avatars are changed, the new changes need to be synchronized. The code is as follows:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@AutoDefine
@Table(comment = &quot;用户信息&quot;)
public class User {

    @ColumnComment(&quot;主键&quot;)
    private String id;

    @ColumnComment(&quot;用户名&quot;)
    private String username;

    @ColumnComment(&quot;头像&quot;)
    private String icon;
    
    // 省略其他属性
    ......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@AutoDefine
@Table(comment = &quot;评论&quot;)
public class Comment {

    @ColumnComment(&quot;主键&quot;)
    private String id;

    @ColumnComment(&quot;评论内容&quot;)
    private String content;

    @ColumnComment(&quot;评论人id&quot;)
    private String userId;

    // source指定了数据来源的Entity，同样可以使用sourceName来指定全路径的方式，field指定了映射哪个字段
    // conditions中隐含了一个joinField字段，该字段默认是“id”，即@Condition(selfField = &quot;userId&quot;, joinField = &quot;id&quot;)等同于示例中的写法
    @DataSource(source = User.class, field = UserDefine.username, conditions = @Condition(selfField = UserDefine.userId))
    @ColumnComment(&quot;评论人名称&quot;)
    private String userName;

    // 如上，同理
    @DataSource(source = User.class, field = UserDefine.icon, condition = @Condition(selfField = UserDefine.userId))
    @ColumnComment(&quot;评论人头像&quot;)
    private String userIcon;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Based on the @ DataSource annotation, the framework will automatically register the specified field to listen for the &#39;EntityUpdateEvent&#39; event (MPE built-in event, which can be manually initiated). The &#39;EntityUpdateEvent&#39; event will be automatically published when the &#39;updateById&#39; and &#39;updateBatchById&#39; methods of Mapper of all MPs are executed. If other data update methods (such as manual SQL writing) are used, automatic data update will not be triggered automatically. If you want to trigger, you need to throw the &#39;EntityUpdateEvent&#39; event to complete automatic data update.</p><p><em>**For specific usage and explanation, please move to the official document * *</em></p><blockquote><h3 id="_7-dynamic-conditions" tabindex="-1"><a class="header-anchor" href="#_7-dynamic-conditions" aria-hidden="true">#</a> 7. dynamic conditions</h3></blockquote><p>According to the pre-set condition function, the data update, delete, query to do dynamic filtering. Commonly used in data permissions.</p><p>For example, according to different permissions to obtain different data, users can only see their own data, administrators can see everyone&#39;s data, we usually need to add a certain condition to each query, update, delete SQL operation, this operation is more mechanized, and in some cases it is easy to forget, can be abstracted into annotations directly configured to Entity, eliminating the need for each data operation to care about this special condition.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * congfig中注册动态条件拦截器【1.3.0之前的版本（不包括1.3.0）可以忽略，不注册该Bean】
 */
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    // 添加动态条件，若同时添加了其他的拦截器，继续添加即可
    interceptor.addInnerInterceptor(new DynamicConditionInterceptor());
    // 如果使用了分页，请放在DynamicConditionInterceptor之后
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
    return interceptor;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@Table(comment = &quot;文章&quot;)
public class Article {

    @ColumnComment(&quot;主键&quot;)
    private String id;

    @ColumnComment(&quot;标题&quot;)
    private String title;
    
    @ColumnComment(&quot;内容&quot;)
    private String content;

    @ColumnComment(&quot;发布人&quot;)
    // 添加了该注解后，针对文章的查询、修改、删除操作，均会被自动带上 published_user_id=?或者published_user_id in (?)的条件，?值来自于CurrentUserDynamicConditionHandler的values()返回值
    @DynamicCondition(CurrentUserDynamicConditionHandler.class)
    private String publishedUserId;
    
    // 省略其他字段
    ......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class CurrentUserDynamicConditionHandler implements IDynamicConditionHandler {

    @Resource
    private HttpServletRequest request;

    @Override
    public List&lt;Object&gt; values() {
        // 只有当enable()返回true的时候 本动态条件才生效。
        // 返回空集合或者null的时候，sql上体现的是 [column] is null，只返回一个值的时候sql上体现的是 [column]=***，
        // 返回集合的时候，sql上体现的是 [column] in (***)
        String userId = request.getHeader(&quot;USER_ID&quot;);
        return Collections.singletonList(userId);
    }

    @Override
    public boolean enable() {
        // 简单例子：header中取用户权限，如果是非管理员则执行该过滤条件，如果是管理员默认查全部，返回false，本动态条件失效
        String userRule = request.getHeader(&quot;USER_ROLE&quot;);
        return !&quot;ADMIN&quot;.equals(userRule);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>**For specific usage and explanation, please move to the official document * *</em></p><blockquote><h3 id="_8-field-serialization-and-deserialization" tabindex="-1"><a class="header-anchor" href="#_8-field-serialization-and-deserialization" aria-hidden="true">#</a> 8. field serialization and deserialization</h3></blockquote><p>When the data is stored, the complex data type on the automatic serialization field is a string (json-like format), and the data is automatically deserialized when the data is read, without the need to write additional conversion Handler(MP official scheme, you need to manually specify a BaseTypeHandler for each complex data type).</p><p>This scheme has certain limitations. In fact, it draws on the 1 data serialization scheme of Redisson, and records the characteristics of the data itself (the full name of the class) together when serializing, which is used as the basis for deserialization. Therefore, the serialized string is not a standard json. The disadvantage of this scheme is obvious, that is, the full name of the class (package name and class name) cannot be changed at will, because once changed, the problem of class cannot be found, thus the existing data cannot be deserialized normally.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
@TableName(autoResultMap = true) // 必须
@Table(comment = &quot;用户&quot;)
public class Users {

    @ColumnComment(&quot;ID&quot;)
    private Long id;

    @Serializable // 必须
    @ColumnComment(&quot;爱好&quot;)
    private List&lt;Like&gt; likes;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class Like {
    private String id;
    private String name;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="thanks" tabindex="-1"><a class="header-anchor" href="#thanks" aria-hidden="true">#</a> Thanks</h2><p>Thanks to the dromara.org open source community for the opportunity</p><p>Thank you for your support.</p><p>Small partners with problems are welcome to add me WeChat and pull you into the group to exchange and study together.</p><p>! <a href="/assets/img/news/MybatisPlusExt-2.png"></a></p><p>WeChat QR Code</p><h2 id="author-introduction" tabindex="-1"><a class="header-anchor" href="#author-introduction" aria-hidden="true">#</a> Author introduction</h2><p>In 90 years, male, married, dabbled in both front and back ends. After graduation, he has been in the city of Jinan. If there are small partners in the same area, he can make an appointment at any time.</p><h4 id="the-author-s-open-source-project-please-all-the-readers-to-use-their-rich-hands-and-give-a-star" tabindex="-1"><a class="header-anchor" href="#the-author-s-open-source-project-please-all-the-readers-to-use-their-rich-hands-and-give-a-star" aria-hidden="true">#</a> The author&#39;s open source project, please all the readers to use their rich hands and give a star</h4><p>https://gitee.com/dromara/mybatis-plus-ext</p><p>https://gitee.com/tangzc/auto-table</p>`,81),r=[d];function u(o,c){return a(),t("div",null,r)}const b=n(l,[["render",u],["__file","MybatisPlusExt.html.vue"]]);export{b as default};
