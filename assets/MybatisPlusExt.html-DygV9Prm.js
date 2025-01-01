import{_ as s,a}from"./MybatisPlusExt-1-BwmhdmD0.js";import{_ as e,c as i,a as l,o as p}from"./app-Cd8Sn9KY.js";const t={};function d(r,n){return p(),i("div",null,n[0]||(n[0]=[l('<p><img src="'+s+`" alt=""></p><p>Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity</p><p>Although MybatisPlus (hereinafter referred to as MP) is much more silky than Mybatis, do you still miss the silky feeling of JPA(Hibernate) occasionally in daily use and devote yourself to business development? if you do, congratulations on your discovery of MybatisPlusExt (hereinafter referred to as MPE).</p><p>MPE further expands the package of MP, that is, it retains the original function of MP and adds more useful and convenient functions. Also adhere to the principle of MP, only do enhancement without change, so even in the case of using MPE, you can still use only MP 100%, so what MP can do, MPE can not only do but also do more.</p><p>The enhanced functions are embodied in several aspects: &#39;free handwriting Mapper&#39;,&#39; automatic table build&#39;, &#39;automatic data filling (similar to audit in JPA)&#39;, &#39;associated query (similar to join in SQL)&#39;, &#39;automatic update of redundant data&#39;, and&#39; dynamic query conditions &#39;.</p><h2 id="start" tabindex="-1"><a class="header-anchor" href="#start"><span>Start</span></a></h2><blockquote><h3 id="_1-introduce-jar-package" tabindex="-1"><a class="header-anchor" href="#_1-introduce-jar-package"><span>1. introduce jar package</span></a></h3></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- spring boot2.* --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.tangzc&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;mybatis-plus-ext-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;{maven仓库搜索最新版}&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- spring boot3.* --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.tangzc&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;mybatis-plus-ext-spring-boot3-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;{maven仓库搜索最新版}&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_2-code-pre-generation" tabindex="-1"><a class="header-anchor" href="#_2-code-pre-generation"><span>2. code pre-generation</span></a></h3></blockquote><h4 id="pain-points" tabindex="-1"><a class="header-anchor" href="#pain-points"><span>Pain points:</span></a></h4><ol><li><p>The code somewhere wants to use the name of the entity field, but does not want to write a dead string (ugly, compile time cannot be verified).</p></li><li><p>Manually write a Mapper class for each entity, but the Mapper class is empty.</p></li></ol><p><em>**Leave these to MPE!!! * *</em></p><p>It automatically pre-generates the definition of the entity field, the interface definition of the entity Mapper, and the definition of the entity Repository class (which further encapsulates the Mapper) before the code is compiled.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 标记生成表字段定义</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>// 标记生成Mapper和Repository</span></span>
<span class="line"><span>@AutoRepository</span></span>
<span class="line"><span>@Data</span></span>
<span class="line"><span>public class TestTable {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The effect is as follows:</p><p><img src="`+a+`" alt=""></p><blockquote><h3 id="_3-automatic-table-creation" tabindex="-1"><a class="header-anchor" href="#_3-automatic-table-creation"><span>3. automatic table creation</span></a></h3></blockquote><p>MPE automatic table building relies on another 1 self-developed framework AutoTable. MPE expands some annotations based on AutoTable and makes Mybatis-plus compatible processing.</p><p>**Make a simple introduction here * *</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@EnableAutoTable</span></span>
<span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class DemoAutoTableApplication {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(DemoAutoTableApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@Table</span></span>
<span class="line"><span>public class MyTable {</span></span>
<span class="line"><span>    private Integer id;</span></span>
<span class="line"><span>    private String userName；</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above code will automatically map the MyTable to the &quot;my_table&quot; table, the fields are<code>id:int</code>、<code>user_name:varchar(255)</code></p><p>PS: Whether the specific table name and field name are underlined depends on the MybatisPlus configuration.</p><p><em>**A fully annotated example is shown below: * *</em></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>// 指定表的编码</span></span>
<span class="line"><span>@MysqlCharset(value = &quot;utf8mb4&quot;, collate = &quot;utf8mb4_general_ci&quot;)</span></span>
<span class="line"><span>// 指定表的存储引擎</span></span>
<span class="line"><span>@MysqlEngine(&quot;myisam&quot;)</span></span>
<span class="line"><span>// 表头同样可以声明单个索引（此处只是举例，等价于username字段上的@Index）</span></span>
<span class="line"><span>@TableIndex(name = &quot;username_index&quot;, fields = {MyTableDefine.username}, type = IndexTypeEnum.UNIQUE)</span></span>
<span class="line"><span>// 需要在表头声明多个索引的情况下，需要用@TableIndexes包裹起来</span></span>
<span class="line"><span>@TableIndexes({</span></span>
<span class="line"><span>        // 声明普通联合索引</span></span>
<span class="line"><span>        @TableIndex(name = &quot;username_phone_index&quot;, fields = {MyTableDefine.username, MyTableDefine.phone}),</span></span>
<span class="line"><span>        // 声明唯一联合索引，单独指定phone的索引排序方式，构建索引的时候indexFields中字段的顺序权重高于fields中的字段</span></span>
<span class="line"><span>        @TableIndex(name = &quot;username_phone_uni_index&quot;, fields = {MyTableDefine.username}, indexFields = {@IndexField(field = MyTableDefine.phone, sort = IndexSortTypeEnum.DESC)}, type = IndexTypeEnum.UNIQUE),</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>// 指定表名、表注释、数据源、忽略字段（不参与建表，等效于字段上的@Ignore）</span></span>
<span class="line"><span>@Table(value = &quot;test_table&quot;, comment = &quot;测试表&quot;, dsName = &quot;my-mysql&quot;, excludeProperty={MyTableDefine.extra})</span></span>
<span class="line"><span>public class MyTable {</span></span>
<span class="line"><span>    // 指定主键自增注释、类型（数据库数字类型可以跟java字符串类型相互转化）、长度</span></span>
<span class="line"><span>    // 注意字段名称id会被自动认定为主键不需要再额外指定</span></span>
<span class="line"><span>    @ColumnComment(&quot;id主键（因为我是独立注解，所以我是大哥，会覆盖下面的comment属性）&quot;)</span></span>
<span class="line"><span>    @ColumnId(mode = IdType.AUTO, comment = &quot;id主键&quot;, type = MysqlTypeConstant.BIGINT, length = 32)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 字段非NULL</span></span>
<span class="line"><span>    @NotNull</span></span>
<span class="line"><span>    // 字段默认值是空字符串</span></span>
<span class="line"><span>    @ColumnDefault(type = DefaultValueEnum.EMPTY_STRING)</span></span>
<span class="line"><span>    // 指定字段长度</span></span>
<span class="line"><span>    @ColumnType(length = 100)</span></span>
<span class="line"><span>    // 指定字段注释</span></span>
<span class="line"><span>    @ColumnComment(&quot;用户名&quot;)</span></span>
<span class="line"><span>    // 唯一索引</span></span>
<span class="line"><span>    @Index(type = IndexTypeEnum.UNIQUE)</span></span>
<span class="line"><span>    private String username;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 设置默认值为0</span></span>
<span class="line"><span>    @ColumnDefault(&quot;0&quot;)</span></span>
<span class="line"><span>    @ColumnComment(&quot;年龄&quot;)</span></span>
<span class="line"><span>    private Integer age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnType(length = 20)</span></span>
<span class="line"><span>    // 设置注释、默认值、不为空</span></span>
<span class="line"><span>    @Column(comment = &quot;电话&quot;, defaultValue = &quot;+00 00000000&quot;, notNull = true)</span></span>
<span class="line"><span>   // 唯一索引快捷方式</span></span>
<span class="line"><span>    @UniqueIndex</span></span>
<span class="line"><span>    private String phone;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 设置注释、小数（等同于@ColumnType(length = 12, decimalLength = 6)）</span></span>
<span class="line"><span>    @Column(comment = &quot;资产&quot;, length = 12, decimalLength = 6)</span></span>
<span class="line"><span>    private BigDecimal money;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // boolean值设置默认值</span></span>
<span class="line"><span>    @ColumnDefault(&quot;true&quot;)</span></span>
<span class="line"><span>    @Column(comment = &quot;激活状态&quot;)</span></span>
<span class="line"><span>   // 普通索引：指定索引名称、注释、索引方法</span></span>
<span class="line"><span>    @Index(name = &quot;active_index&quot;, comment = &quot;激活状态索引&quot;)</span></span>
<span class="line"><span>    private Boolean active;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 单独设置字段类型</span></span>
<span class="line"><span>    @ColumnType(MysqlTypeConstant.TEXT)</span></span>
<span class="line"><span>    @ColumnComment(&quot;个人简介&quot;)</span></span>
<span class="line"><span>    private String description;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 设置默认值为当前时间</span></span>
<span class="line"><span>    @ColumnDefault(&quot;CURRENT_TIMESTAMP&quot;)</span></span>
<span class="line"><span>    @Column(comment = &quot;注册时间&quot;)</span></span>
<span class="line"><span>    private LocalDateTime registerTime;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 忽略该字段，不参与建表</span></span>
<span class="line"><span>    @Ignore</span></span>
<span class="line"><span>    private String extra;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_4-data-fill" tabindex="-1"><a class="header-anchor" href="#_4-data-fill"><span>4. data fill</span></a></h3></blockquote><p>When inserting or updating the database, the data operator, operation time, default value, etc. can be automatically assigned.</p><p>Take article publishing as an example. When publishing Artice, we no longer need to care about too many field values that are not related to business. In the end, we only need to care about the two core data of title and content, and other data will be processed by the framework.</p><p>It involves &#39;data insertion&#39;, &#39;data update&#39;, &#39;data insertion and update&#39; 3 processing opportunities, each of which can insert system time and custom user information.</p><p>**Define Article Entity * *</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@Table(comment = &quot;文章&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 字符串类型的ID，默认也是雪花算法的一串数字（MP的默认功能）</span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;标题&quot;)</span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;内容&quot;)</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 默认值用法：文章默认激活状态，ACTIVE为ActicleStatusEnum[ACTIVE, INACTIVE]的枚举名称字符串</span></span>
<span class="line"><span>    @DefaultValue(&quot;ACTIVE&quot;)</span></span>
<span class="line"><span>    @ColumnComment(&quot;内容&quot;)</span></span>
<span class="line"><span>    private ActicleStatusEnum status;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;发布时间&quot;)</span></span>
<span class="line"><span>    // 【插入】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍（注意，这里的时间是MP执行insert的操作的时候的时间，并不是对象构建时候的时间）</span></span>
<span class="line"><span>    @InsertFillTime</span></span>
<span class="line"><span>    private Date publishedTime;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;发布人&quot;)</span></span>
<span class="line"><span>    // 【插入】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码</span></span>
<span class="line"><span>    @InsertFillData(UserIdAutoFillHandler.class)</span></span>
<span class="line"><span>    private String publishedUserId;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;发布人名字&quot;)</span></span>
<span class="line"><span>    // 【插入】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码</span></span>
<span class="line"><span>    @InsertFillData(UsernameAutoFillHandler.class)</span></span>
<span class="line"><span>    private String publishedUsername;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;最后更新时间&quot;)</span></span>
<span class="line"><span>    // 【插入和更新】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍</span></span>
<span class="line"><span>    @InsertUpdateFillTime</span></span>
<span class="line"><span>    private Date publishedTime;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;最后更新人&quot;)</span></span>
<span class="line"><span>    // 【更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码</span></span>
<span class="line"><span>    // @UpdateFillData(UserIdAutoFillHandler.class)</span></span>
<span class="line"><span>    // 【插入和更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码</span></span>
<span class="line"><span>    @InsertUpdateFillData(UserIdAutoFillHandler.class)</span></span>
<span class="line"><span>    private String publishedUserId;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;最后更新人名字&quot;)</span></span>
<span class="line"><span>    // 【更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码</span></span>
<span class="line"><span>    // @UpdateFillData(UsernameAutoFillHandler.class)</span></span>
<span class="line"><span>    // 【插入和更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码</span></span>
<span class="line"><span>    @InsertUpdateFillData(UsernameAutoFillHandler.class)</span></span>
<span class="line"><span>    private String publishedUsername;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Interface for dynamically populating [user id] * *</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 全局获取用户ID</span></span>
<span class="line"><span> * 此处实现IOptionByAutoFillHandler接口和AutoFillHandler接口均可，</span></span>
<span class="line"><span> * 实现IOptionByAutoFillHandler接口，可以兼容框架内的BaseEntity。</span></span>
<span class="line"><span> * BaseEntity默认需要IOptionByAutoFillHandler的实现。BaseEntity的使用请查看官网。</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>public class UserIdAutoFillHandler implements IOptionByAutoFillHandler&lt;String&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * @param object 当前操作的数据对象</span></span>
<span class="line"><span>     * @param clazz  当前操作的数据对象的class</span></span>
<span class="line"><span>     * @param field  当前操作的数据对象上的字段</span></span>
<span class="line"><span>     * @retur</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String getVal(Object object, Class&lt;?&gt; clazz, Field field) {</span></span>
<span class="line"><span>        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();</span></span>
<span class="line"><span>        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();</span></span>
<span class="line"><span>        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中</span></span>
<span class="line"><span>        return request.getHeader(&quot;user-id&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Interface for dynamically populating [user name] * *</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 全局获取用户名</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>public class UsernameAutoFillHandler implements AutoFillHandler&lt;String&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * @param object 当前操作的数据对象</span></span>
<span class="line"><span>     * @param clazz  当前操作的数据对象的class</span></span>
<span class="line"><span>     * @param field  当前操作的数据对象上的字段</span></span>
<span class="line"><span>     * @return 当前登录用户id</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String getVal(Object object, Class&lt;?&gt; clazz, Field field) {</span></span>
<span class="line"><span>        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();</span></span>
<span class="line"><span>        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();</span></span>
<span class="line"><span>        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中</span></span>
<span class="line"><span>        return request.getHeader(&quot;user-name&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="_5-association-query" tabindex="-1"><a class="header-anchor" href="#_5-association-query"><span>5. Association Query</span></a></h3></blockquote><p>A data association query solution similar to JPA replaces the join method in SQL (or the method of assembling data in memory), and automatically brings out the associated data when querying an entity by associating the relationship between multiple tables through annotations.</p><p>Take the relationship between the user and the article for example</p><p>**Define Entity * *</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>@Table(comment = &quot;文章&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;标题&quot;)</span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(comment = &quot;内容&quot;, type = MySqlTypeConstant.MEDIUMTEXT)</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;发布人&quot;)</span></span>
<span class="line"><span>    private String publishedUserId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;审核: 0 不通过、1 通过&quot;)</span></span>
<span class="line"><span>    private int audit;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;发布时间（时间戳）&quot;)</span></span>
<span class="line"><span>    private Long publishedTime;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>@Table(comment = &quot;用户信息&quot;)</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;用户名&quot;)</span></span>
<span class="line"><span>    private String username;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;密码&quot;)</span></span>
<span class="line"><span>    private String password;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>   // 关联该用户发布的所有文章（&quot;audit = 1&quot; 表示的是Article下的audit为1的情况，customCondition的值只能是被关联表下的字段值，且会以and的形式添加在查询条件末尾。）</span></span>
<span class="line"><span>   @BindEntity(conditions = @JoinCondition(selfField = UserDefine.id, joinField = ArticleDefine.publishedUserId), customCondition = &quot;audit = 1&quot;, orderBy = @JoinOrderBy(field = ArticleDefine.publishedTime, isAsc = false))</span></span>
<span class="line"><span>   private List&lt;Article&gt; articles;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**Requirement: When obtaining user information, you only want to obtain the approved release records of the user, and sort them in reverse order according to the release time. (via custom SQL condition) * *</p><p>writing 1]</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 获取到需要的user集合</span></span>
<span class="line"><span>User user = userMapper.getByUsername(name);</span></span>
<span class="line"><span>// 【推荐】用法一、指定属性关联。</span></span>
<span class="line"><span>Binder.bindOn(user, User::getArticles);</span></span>
<span class="line"><span>// 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。</span></span>
<span class="line"><span>// Binder.bind(user);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>writing 2]</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 本框架拓展的lambda查询器lambdaQueryPlus，增加了bindOne、bindList、bindPage</span></span>
<span class="line"><span>// 显然这是一种更加简便的查询方式，但是如果存在多级深度的关联关系，此种方法就不适用了，还需要借助Binder</span></span>
<span class="line"><span>User user = userRepository.lambdaQueryPlus()</span></span>
<span class="line"><span>        .eq(User::getUsername, name)</span></span>
<span class="line"><span>       // 【推荐】用法一、指定属性关联，只关联文章这个字段。</span></span>
<span class="line"><span>        .bindList(User::getArticles);</span></span>
<span class="line"><span>      // 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。</span></span>
<span class="line"><span>      // .bindList();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>* If you open SQL printing, you will see two SQL statements. The first one queries user information according to name, and the second one queries all associated data in article according to userId.</p><p><em>**Space is limited, more use (intermediate table query, many-to-many query, etc.), please move to the official document * *</em></p><h4 id="note" tabindex="-1"><a class="header-anchor" href="#note"><span>Note:</span></a></h4><p>In order to solve the problem of database compatibility support, the underlying principle of association query is based on the MybatisPlus BaseMapper implementation, so all associated entities must correspond to the Mapper and inherit from the MybatisPlus BaseMapper, including the entities of the intermediate table, in the case of using the intermediate table association query, also need to follow this constraint.</p><p>MPE is equivalent to treating the Mapper corresponding to the entity as a data access window, so any behavior that needs to query data from the database needs to be completed through the corresponding Mapper.</p><blockquote><h3 id="_6-data-redundancy" tabindex="-1"><a class="header-anchor" href="#_6-data-redundancy"><span>6. data redundancy</span></a></h3></blockquote><p>In order to avoid high-frequency data association queries, the 1 solution is to do data redundancy, and some fields of other tables are redundant to the current table. However, this scheme involves a problem of how to synchronize data after modification. This function is born to solve this problem.</p><p>In the scenario of user comments, redundant user names and avatars are required in the comments. If the user&#39;s name and avatars are changed, the new changes need to be synchronized. The code is as follows:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>@Table(comment = &quot;用户信息&quot;)</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;用户名&quot;)</span></span>
<span class="line"><span>    private String username;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;头像&quot;)</span></span>
<span class="line"><span>    private String icon;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 省略其他属性</span></span>
<span class="line"><span>    ......</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@AutoDefine</span></span>
<span class="line"><span>@Table(comment = &quot;评论&quot;)</span></span>
<span class="line"><span>public class Comment {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;评论内容&quot;)</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;评论人id&quot;)</span></span>
<span class="line"><span>    private String userId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // source指定了数据来源的Entity，同样可以使用sourceName来指定全路径的方式，field指定了映射哪个字段</span></span>
<span class="line"><span>    // conditions中隐含了一个joinField字段，该字段默认是“id”，即@Condition(selfField = &quot;userId&quot;, joinField = &quot;id&quot;)等同于示例中的写法</span></span>
<span class="line"><span>    @DataSource(source = User.class, field = UserDefine.username, conditions = @Condition(selfField = UserDefine.userId))</span></span>
<span class="line"><span>    @ColumnComment(&quot;评论人名称&quot;)</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如上，同理</span></span>
<span class="line"><span>    @DataSource(source = User.class, field = UserDefine.icon, condition = @Condition(selfField = UserDefine.userId))</span></span>
<span class="line"><span>    @ColumnComment(&quot;评论人头像&quot;)</span></span>
<span class="line"><span>    private String userIcon;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Based on the @ DataSource annotation, the framework will automatically register the specified field to listen for the &#39;EntityUpdateEvent&#39; event (MPE built-in event, which can be manually initiated). The &#39;EntityUpdateEvent&#39; event will be automatically published when the &#39;updateById&#39; and &#39;updateBatchById&#39; methods of Mapper of all MPs are executed. If other data update methods (such as manual SQL writing) are used, automatic data update will not be triggered automatically. If you want to trigger, you need to throw the &#39;EntityUpdateEvent&#39; event to complete automatic data update.</p><p><em>**For specific usage and explanation, please move to the official document * *</em></p><blockquote><h3 id="_7-dynamic-conditions" tabindex="-1"><a class="header-anchor" href="#_7-dynamic-conditions"><span>7. dynamic conditions</span></a></h3></blockquote><p>According to the pre-set condition function, the data update, delete, query to do dynamic filtering. Commonly used in data permissions.</p><p>For example, according to different permissions to obtain different data, users can only see their own data, administrators can see everyone&#39;s data, we usually need to add a certain condition to each query, update, delete SQL operation, this operation is more mechanized, and in some cases it is easy to forget, can be abstracted into annotations directly configured to Entity, eliminating the need for each data operation to care about this special condition.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * congfig中注册动态条件拦截器【1.3.0之前的版本（不包括1.3.0）可以忽略，不注册该Bean】</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public MybatisPlusInterceptor mybatisPlusInterceptor() {</span></span>
<span class="line"><span>    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();</span></span>
<span class="line"><span>    // 添加动态条件，若同时添加了其他的拦截器，继续添加即可</span></span>
<span class="line"><span>    interceptor.addInnerInterceptor(new DynamicConditionInterceptor());</span></span>
<span class="line"><span>    // 如果使用了分页，请放在DynamicConditionInterceptor之后</span></span>
<span class="line"><span>    interceptor.addInnerInterceptor(new PaginationInnerInterceptor());</span></span>
<span class="line"><span>    return interceptor;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@Table(comment = &quot;文章&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;主键&quot;)</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;标题&quot;)</span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @ColumnComment(&quot;内容&quot;)</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;发布人&quot;)</span></span>
<span class="line"><span>    // 添加了该注解后，针对文章的查询、修改、删除操作，均会被自动带上 published_user_id=?或者published_user_id in (?)的条件，?值来自于CurrentUserDynamicConditionHandler的values()返回值</span></span>
<span class="line"><span>    @DynamicCondition(CurrentUserDynamicConditionHandler.class)</span></span>
<span class="line"><span>    private String publishedUserId;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 省略其他字段</span></span>
<span class="line"><span>    ......</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>public class CurrentUserDynamicConditionHandler implements IDynamicConditionHandler {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private HttpServletRequest request;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public List&lt;Object&gt; values() {</span></span>
<span class="line"><span>        // 只有当enable()返回true的时候 本动态条件才生效。</span></span>
<span class="line"><span>        // 返回空集合或者null的时候，sql上体现的是 [column] is null，只返回一个值的时候sql上体现的是 [column]=***，</span></span>
<span class="line"><span>        // 返回集合的时候，sql上体现的是 [column] in (***)</span></span>
<span class="line"><span>        String userId = request.getHeader(&quot;USER_ID&quot;);</span></span>
<span class="line"><span>        return Collections.singletonList(userId);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public boolean enable() {</span></span>
<span class="line"><span>        // 简单例子：header中取用户权限，如果是非管理员则执行该过滤条件，如果是管理员默认查全部，返回false，本动态条件失效</span></span>
<span class="line"><span>        String userRule = request.getHeader(&quot;USER_ROLE&quot;);</span></span>
<span class="line"><span>        return !&quot;ADMIN&quot;.equals(userRule);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>**For specific usage and explanation, please move to the official document * *</em></p><blockquote><h3 id="_8-field-serialization-and-deserialization" tabindex="-1"><a class="header-anchor" href="#_8-field-serialization-and-deserialization"><span>8. field serialization and deserialization</span></a></h3></blockquote><p>When the data is stored, the complex data type on the automatic serialization field is a string (json-like format), and the data is automatically deserialized when the data is read, without the need to write additional conversion Handler(MP official scheme, you need to manually specify a BaseTypeHandler for each complex data type).</p><p>This scheme has certain limitations. In fact, it draws on the 1 data serialization scheme of Redisson, and records the characteristics of the data itself (the full name of the class) together when serializing, which is used as the basis for deserialization. Therefore, the serialized string is not a standard json. The disadvantage of this scheme is obvious, that is, the full name of the class (package name and class name) cannot be changed at will, because once changed, the problem of class cannot be found, thus the existing data cannot be deserialized normally.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>@TableName(autoResultMap = true) // 必须</span></span>
<span class="line"><span>@Table(comment = &quot;用户&quot;)</span></span>
<span class="line"><span>public class Users {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnComment(&quot;ID&quot;)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Serializable // 必须</span></span>
<span class="line"><span>    @ColumnComment(&quot;爱好&quot;)</span></span>
<span class="line"><span>    private List&lt;Like&gt; likes;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>public class Like {</span></span>
<span class="line"><span>    private String id;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="thanks" tabindex="-1"><a class="header-anchor" href="#thanks"><span>Thanks</span></a></h2><p>Thanks to the dromara.org open source community for the opportunity</p><p>Thank you for your support.</p><p>Small partners with problems are welcome to add me WeChat and pull you into the group to exchange and study together.</p><p>! <a href="/assets/img/news/MybatisPlusExt-2.png"></a></p><p>WeChat QR Code</p><h2 id="author-introduction" tabindex="-1"><a class="header-anchor" href="#author-introduction"><span>Author introduction</span></a></h2><p>In 90 years, male, married, dabbled in both front and back ends. After graduation, he has been in the city of Jinan. If there are small partners in the same area, he can make an appointment at any time.</p><h4 id="the-author-s-open-source-project-please-all-the-readers-to-use-their-rich-hands-and-give-a-star" tabindex="-1"><a class="header-anchor" href="#the-author-s-open-source-project-please-all-the-readers-to-use-their-rich-hands-and-give-a-star"><span>The author&#39;s open source project, please all the readers to use their rich hands and give a star</span></a></h4><p>https://gitee.com/dromara/mybatis-plus-ext</p><p>https://gitee.com/tangzc/auto-table</p>`,81)]))}const u=e(t,[["render",d],["__file","MybatisPlusExt.html.vue"]]),m=JSON.parse('{"path":"/news/MybatisPlusExt.html","title":"Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package.","lang":"en-US","frontmatter":{"title":"Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package.","author":"MybatisPlusExt","date":"2024-03-11T00:00:00.000Z","cover":"/assets/img/news/MybatisPlusExt-0.png","head":[["meta",{"name":"News"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/MybatisPlusExt.html"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/news/MybatisPlusExt.html"}],["meta",{"property":"og:title","content":"Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package."}],["meta",{"property":"og:description","content":"Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity Although MybatisPlus (hereinafter referred to as MP) is much more silky than Myb..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/MybatisPlusExt-0.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-17T16:37:54.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/MybatisPlusExt-0.png"}],["meta",{"name":"twitter:image:alt","content":"Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package."}],["meta",{"property":"article:author","content":"MybatisPlusExt"}],["meta",{"property":"article:published_time","content":"2024-03-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-17T16:37:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package.\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/MybatisPlusExt-0.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/MybatisPlusExt-1.png\\"],\\"datePublished\\":\\"2024-03-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-17T16:37:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MybatisPlusExt\\"}]}"]],"description":"Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity Although MybatisPlus (hereinafter referred to as MP) is much more silky than Myb..."},"headers":[{"level":2,"title":"Start","slug":"start","link":"#start","children":[]},{"level":2,"title":"Thanks","slug":"thanks","link":"#thanks","children":[]},{"level":2,"title":"Author introduction","slug":"author-introduction","link":"#author-introduction","children":[]}],"git":{"createdTime":1723712940000,"updatedTime":1723912674000,"contributors":[{"name":"itanxyu","username":"itanxyu","email":"itanxy@126.com","commits":2,"url":"https://github.com/itanxyu"}]},"readingTime":{"minutes":11.7,"words":3509},"filePathRelative":"news/MybatisPlusExt.md","localizedDate":"March 11, 2024","autoDesc":true,"excerpt":"<p><img src=\\"/assets/img/news/MybatisPlusExt-0.png\\" alt=\\"\\"></p>\\n<p>Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity</p>\\n<p>Although MybatisPlus (hereinafter referred to as MP) is much more silky than Mybatis, do you still miss the silky feeling of JPA(Hibernate) occasionally in daily use and devote yourself to business development? if you do, congratulations on your discovery of MybatisPlusExt (hereinafter referred to as MPE).</p>"}');export{u as comp,m as data};
