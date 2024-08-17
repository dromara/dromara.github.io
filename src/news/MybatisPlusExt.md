---
title: Welcome the new open source MPE to join the Dromara community and MybatisPlus the capacity expansion enhancement package.
author: MybatisPlusExt
date: 2024-03-11
cover: /assets/img/news/MybatisPlusExt-0.png
head:
  - - meta
    - name: News
---

![](/assets/img/news/MybatisPlusExt-0.png)

  

Borrowing the slogan of MybatisPlus: born to simplify development work and increase productivity

Although MybatisPlus (hereinafter referred to as MP) is much more silky than Mybatis, do you still miss the silky feeling of JPA(Hibernate) occasionally in daily use and devote yourself to business development? if you do, congratulations on your discovery of MybatisPlusExt (hereinafter referred to as MPE).

MPE further expands the package of MP, that is, it retains the original function of MP and adds more useful and convenient functions. Also adhere to the principle of MP, only do enhancement without change, so even in the case of using MPE, you can still use only MP 100%, so what MP can do, MPE can not only do but also do more.

The enhanced functions are embodied in several aspects: 'free handwriting Mapper',' automatic table build', 'automatic data filling (similar to audit in JPA)', 'associated query (similar to join in SQL)', 'automatic update of redundant data', and' dynamic query conditions '.

## Start

> ### 1. introduce jar package

```
<!-- spring boot2.* -->
<dependency>
    <groupId>com.tangzc</groupId>
    <artifactId>mybatis-plus-ext-spring-boot-starter</artifactId>
    <version>{maven仓库搜索最新版}</version>
</dependency>

<!-- spring boot3.* -->
<dependency>
    <groupId>com.tangzc</groupId>
    <artifactId>mybatis-plus-ext-spring-boot3-starter</artifactId>
    <version>{maven仓库搜索最新版}</version>
</dependency>
```

> ### 2. code pre-generation

#### Pain points:

1. The code somewhere wants to use the name of the entity field, but does not want to write a dead string (ugly, compile time cannot be verified).

2. Manually write a Mapper class for each entity, but the Mapper class is empty.


_**Leave these to MPE!!! * *_

It automatically pre-generates the definition of the entity field, the interface definition of the entity Mapper, and the definition of the entity Repository class (which further encapsulates the Mapper) before the code is compiled.

```
// 标记生成表字段定义
@AutoDefine
// 标记生成Mapper和Repository
@AutoRepository
@Data
public class TestTable {

    private String id;
    private String name;
    private int age;
}
```

The effect is as follows:

![](/assets/img/news/MybatisPlusExt-1.png)

> ### 3. automatic table creation

MPE automatic table building relies on another 1 self-developed framework AutoTable. MPE expands some annotations based on AutoTable and makes Mybatis-plus compatible processing.

**Make a simple introduction here * *

```
@EnableAutoTable
@SpringBootApplication
public class DemoAutoTableApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoAutoTableApplication.class, args);
    }
}
```

```
@Data
@Table
public class MyTable {
    private Integer id;
    private String userName；
}
```

The above code will automatically map the MyTable to the "my_table" table, the fields are`id:int`、`user_name:varchar(255)`

PS: Whether the specific table name and field name are underlined depends on the MybatisPlus configuration.

_**A fully annotated example is shown below: * *_

```
@Data
@AutoDefine
// 指定表的编码
@MysqlCharset(value = "utf8mb4", collate = "utf8mb4_general_ci")
// 指定表的存储引擎
@MysqlEngine("myisam")
// 表头同样可以声明单个索引（此处只是举例，等价于username字段上的@Index）
@TableIndex(name = "username_index", fields = {MyTableDefine.username}, type = IndexTypeEnum.UNIQUE)
// 需要在表头声明多个索引的情况下，需要用@TableIndexes包裹起来
@TableIndexes({
        // 声明普通联合索引
        @TableIndex(name = "username_phone_index", fields = {MyTableDefine.username, MyTableDefine.phone}),
        // 声明唯一联合索引，单独指定phone的索引排序方式，构建索引的时候indexFields中字段的顺序权重高于fields中的字段
        @TableIndex(name = "username_phone_uni_index", fields = {MyTableDefine.username}, indexFields = {@IndexField(field = MyTableDefine.phone, sort = IndexSortTypeEnum.DESC)}, type = IndexTypeEnum.UNIQUE),
})
// 指定表名、表注释、数据源、忽略字段（不参与建表，等效于字段上的@Ignore）
@Table(value = "test_table", comment = "测试表", dsName = "my-mysql", excludeProperty={MyTableDefine.extra})
public class MyTable {
    // 指定主键自增注释、类型（数据库数字类型可以跟java字符串类型相互转化）、长度
    // 注意字段名称id会被自动认定为主键不需要再额外指定
    @ColumnComment("id主键（因为我是独立注解，所以我是大哥，会覆盖下面的comment属性）")
    @ColumnId(mode = IdType.AUTO, comment = "id主键", type = MysqlTypeConstant.BIGINT, length = 32)
    private String id;

    // 字段非NULL
    @NotNull
    // 字段默认值是空字符串
    @ColumnDefault(type = DefaultValueEnum.EMPTY_STRING)
    // 指定字段长度
    @ColumnType(length = 100)
    // 指定字段注释
    @ColumnComment("用户名")
    // 唯一索引
    @Index(type = IndexTypeEnum.UNIQUE)
    private String username;

    // 设置默认值为0
    @ColumnDefault("0")
    @ColumnComment("年龄")
    private Integer age;

    @ColumnType(length = 20)
    // 设置注释、默认值、不为空
    @Column(comment = "电话", defaultValue = "+00 00000000", notNull = true)
   // 唯一索引快捷方式
    @UniqueIndex
    private String phone;

    // 设置注释、小数（等同于@ColumnType(length = 12, decimalLength = 6)）
    @Column(comment = "资产", length = 12, decimalLength = 6)
    private BigDecimal money;

    // boolean值设置默认值
    @ColumnDefault("true")
    @Column(comment = "激活状态")
   // 普通索引：指定索引名称、注释、索引方法
    @Index(name = "active_index", comment = "激活状态索引")
    private Boolean active;

    // 单独设置字段类型
    @ColumnType(MysqlTypeConstant.TEXT)
    @ColumnComment("个人简介")
    private String description;

    // 设置默认值为当前时间
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(comment = "注册时间")
    private LocalDateTime registerTime;

    // 忽略该字段，不参与建表
    @Ignore
    private String extra;
}
```

> ### 4. data fill

When inserting or updating the database, the data operator, operation time, default value, etc. can be automatically assigned.

Take article publishing as an example. When publishing Artice, we no longer need to care about too many field values that are not related to business. In the end, we only need to care about the two core data of title and content, and other data will be processed by the framework.

It involves 'data insertion', 'data update', 'data insertion and update' 3 processing opportunities, each of which can insert system time and custom user information.

**Define Article Entity * *

```
@Data
@Table(comment = "文章")
public class Article {
    
    // 字符串类型的ID，默认也是雪花算法的一串数字（MP的默认功能）
    @ColumnComment("主键")
    private String id;
    
    @ColumnComment("标题")
    private String title;
    
    @ColumnComment("内容")
    private String content;
    
    // 默认值用法：文章默认激活状态，ACTIVE为ActicleStatusEnum[ACTIVE, INACTIVE]的枚举名称字符串
    @DefaultValue("ACTIVE")
    @ColumnComment("内容")
    private ActicleStatusEnum status;
    
    @ColumnComment("发布时间")
    // 【插入】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍（注意，这里的时间是MP执行insert的操作的时候的时间，并不是对象构建时候的时间）
    @InsertFillTime
    private Date publishedTime;
    
    @ColumnComment("发布人")
    // 【插入】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    @InsertFillData(UserIdAutoFillHandler.class)
    private String publishedUserId;
    
    @ColumnComment("发布人名字")
    // 【插入】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    @InsertFillData(UsernameAutoFillHandler.class)
    private String publishedUsername;
    
    @ColumnComment("最后更新时间")
    // 【插入和更新】数据时候会自动获取系统当前时间赋值，支持多种数据类型，具体可参考@FillTime注解详细介绍
    @InsertUpdateFillTime
    private Date publishedTime;
    
    @ColumnComment("最后更新人")
    // 【更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    // @UpdateFillData(UserIdAutoFillHandler.class)
    // 【插入和更新】的时候，自动填充用户id，UserIdAutoFillHandler看下面代码
    @InsertUpdateFillData(UserIdAutoFillHandler.class)
    private String publishedUserId;
    
    @ColumnComment("最后更新人名字")
    // 【更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    // @UpdateFillData(UsernameAutoFillHandler.class)
    // 【插入和更新】的时候，自动填充用户名字，UsernameAutoFillHandler看下面代码
    @InsertUpdateFillData(UsernameAutoFillHandler.class)
    private String publishedUsername;
}
```

**Interface for dynamically populating [user id] * *

```
/**
 * 全局获取用户ID
 * 此处实现IOptionByAutoFillHandler接口和AutoFillHandler接口均可，
 * 实现IOptionByAutoFillHandler接口，可以兼容框架内的BaseEntity。
 * BaseEntity默认需要IOptionByAutoFillHandler的实现。BaseEntity的使用请查看官网。
 */
@Component
public class UserIdAutoFillHandler implements IOptionByAutoFillHandler<String> {

    /**
     * @param object 当前操作的数据对象
     * @param clazz  当前操作的数据对象的class
     * @param field  当前操作的数据对象上的字段
     * @retur
     */
    @Override
    public String getVal(Object object, Class<?> clazz, Field field) {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中
        return request.getHeader("user-id");
    }
}
```

**Interface for dynamically populating [user name] * *

```
/**
 * 全局获取用户名
 */
@Component
public class UsernameAutoFillHandler implements AutoFillHandler<String> {

    /**
     * @param object 当前操作的数据对象
     * @param clazz  当前操作的数据对象的class
     * @param field  当前操作的数据对象上的字段
     * @return 当前登录用户id
     */
    @Override
    public String getVal(Object object, Class<?> clazz, Field field) {
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
        // 配合网关或者过滤器，token校验成功后就把用户信息塞到header中
        return request.getHeader("user-name");
    }
}
```

> ### 5. Association Query

A data association query solution similar to JPA replaces the join method in SQL (or the method of assembling data in memory), and automatically brings out the associated data when querying an entity by associating the relationship between multiple tables through annotations.

Take the relationship between the user and the article for example

**Define Entity * *

```
@Data
@AutoDefine
@Table(comment = "文章")
public class Article {

    @ColumnComment("主键")
    private String id;

    @ColumnComment("标题")
    private String title;

    @Column(comment = "内容", type = MySqlTypeConstant.MEDIUMTEXT)
    private String content;
    
    @ColumnComment("发布人")
    private String publishedUserId;

    @ColumnComment("审核: 0 不通过、1 通过")
    private int audit;
    
    @ColumnComment("发布时间（时间戳）")
    private Long publishedTime;
}
```

```
@Data
@AutoDefine
@Table(comment = "用户信息")
public class User {

    @ColumnComment("主键")
    private String id;

    @ColumnComment("用户名")
    private String username;

    @ColumnComment("密码")
    private String password;
  
   // 关联该用户发布的所有文章（"audit = 1" 表示的是Article下的audit为1的情况，customCondition的值只能是被关联表下的字段值，且会以and的形式添加在查询条件末尾。）
   @BindEntity(conditions = @JoinCondition(selfField = UserDefine.id, joinField = ArticleDefine.publishedUserId), customCondition = "audit = 1", orderBy = @JoinOrderBy(field = ArticleDefine.publishedTime, isAsc = false))
   private List<Article> articles;
}
```

**Requirement: When obtaining user information, you only want to obtain the approved release records of the user, and sort them in reverse order according to the release time. (via custom SQL condition) * *

writing 1]

```
// 获取到需要的user集合
User user = userMapper.getByUsername(name);
// 【推荐】用法一、指定属性关联。
Binder.bindOn(user, User::getArticles);
// 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。
// Binder.bind(user);
```

writing 2]

```
// 本框架拓展的lambda查询器lambdaQueryPlus，增加了bindOne、bindList、bindPage
// 显然这是一种更加简便的查询方式，但是如果存在多级深度的关联关系，此种方法就不适用了，还需要借助Binder
User user = userRepository.lambdaQueryPlus()
        .eq(User::getUsername, name)
       // 【推荐】用法一、指定属性关联，只关联文章这个字段。
        .bindList(User::getArticles);
      // 【不推荐】用法二、全关联。此种用法关联user下所有声明需要绑定的属性。
      // .bindList();
```

\* If you open SQL printing, you will see two SQL statements. The first one queries user information according to name, and the second one queries all associated data in article according to userId.

_**Space is limited, more use (intermediate table query, many-to-many query, etc.), please move to the official document * *_

#### Note:

In order to solve the problem of database compatibility support, the underlying principle of association query is based on the MybatisPlus BaseMapper implementation, so all associated entities must correspond to the Mapper and inherit from the MybatisPlus BaseMapper, including the entities of the intermediate table, in the case of using the intermediate table association query, also need to follow this constraint.

MPE is equivalent to treating the Mapper corresponding to the entity as a data access window, so any behavior that needs to query data from the database needs to be completed through the corresponding Mapper.

> ### 6. data redundancy

In order to avoid high-frequency data association queries, the 1 solution is to do data redundancy, and some fields of other tables are redundant to the current table. However, this scheme involves a problem of how to synchronize data after modification. This function is born to solve this problem.

In the scenario of user comments, redundant user names and avatars are required in the comments. If the user's name and avatars are changed, the new changes need to be synchronized. The code is as follows:
```
@Data
@AutoDefine
@Table(comment = "用户信息")
public class User {

    @ColumnComment("主键")
    private String id;

    @ColumnComment("用户名")
    private String username;

    @ColumnComment("头像")
    private String icon;
    
    // 省略其他属性
    ......
}
```

```
@Data
@AutoDefine
@Table(comment = "评论")
public class Comment {

    @ColumnComment("主键")
    private String id;

    @ColumnComment("评论内容")
    private String content;

    @ColumnComment("评论人id")
    private String userId;

    // source指定了数据来源的Entity，同样可以使用sourceName来指定全路径的方式，field指定了映射哪个字段
    // conditions中隐含了一个joinField字段，该字段默认是“id”，即@Condition(selfField = "userId", joinField = "id")等同于示例中的写法
    @DataSource(source = User.class, field = UserDefine.username, conditions = @Condition(selfField = UserDefine.userId))
    @ColumnComment("评论人名称")
    private String userName;

    // 如上，同理
    @DataSource(source = User.class, field = UserDefine.icon, condition = @Condition(selfField = UserDefine.userId))
    @ColumnComment("评论人头像")
    private String userIcon;
}
```

Based on the @ DataSource annotation, the framework will automatically register the specified field to listen for the 'EntityUpdateEvent' event (MPE built-in event, which can be manually initiated). The 'EntityUpdateEvent' event will be automatically published when the 'updateById' and 'updateBatchById' methods of Mapper of all MPs are executed. If other data update methods (such as manual SQL writing) are used, automatic data update will not be triggered automatically. If you want to trigger, you need to throw the 'EntityUpdateEvent' event to complete automatic data update.

_**For specific usage and explanation, please move to the official document * *_

> ### 7. dynamic conditions

According to the pre-set condition function, the data update, delete, query to do dynamic filtering. Commonly used in data permissions.

For example, according to different permissions to obtain different data, users can only see their own data, administrators can see everyone's data, we usually need to add a certain condition to each query, update, delete SQL operation, this operation is more mechanized, and in some cases it is easy to forget, can be abstracted into annotations directly configured to Entity, eliminating the need for each data operation to care about this special condition.
```
/**
 * congfig中注册动态条件拦截器【1.3.0之前的版本（不包括1.3.0）可以忽略，不注册该Bean】
 */
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    // 添加动态条件，若同时添加了其他的拦截器，继续添加即可
    interceptor.addInnerInterceptor(new DynamicConditionInterceptor());
    // 如果使用了分页，请放在DynamicConditionInterceptor之后
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
    return interceptor;
}
```

```
@Data
@Table(comment = "文章")
public class Article {

    @ColumnComment("主键")
    private String id;

    @ColumnComment("标题")
    private String title;
    
    @ColumnComment("内容")
    private String content;

    @ColumnComment("发布人")
    // 添加了该注解后，针对文章的查询、修改、删除操作，均会被自动带上 published_user_id=?或者published_user_id in (?)的条件，?值来自于CurrentUserDynamicConditionHandler的values()返回值
    @DynamicCondition(CurrentUserDynamicConditionHandler.class)
    private String publishedUserId;
    
    // 省略其他字段
    ......
}
```

```
@Component
public class CurrentUserDynamicConditionHandler implements IDynamicConditionHandler {

    @Resource
    private HttpServletRequest request;

    @Override
    public List<Object> values() {
        // 只有当enable()返回true的时候 本动态条件才生效。
        // 返回空集合或者null的时候，sql上体现的是 [column] is null，只返回一个值的时候sql上体现的是 [column]=***，
        // 返回集合的时候，sql上体现的是 [column] in (***)
        String userId = request.getHeader("USER_ID");
        return Collections.singletonList(userId);
    }

    @Override
    public boolean enable() {
        // 简单例子：header中取用户权限，如果是非管理员则执行该过滤条件，如果是管理员默认查全部，返回false，本动态条件失效
        String userRule = request.getHeader("USER_ROLE");
        return !"ADMIN".equals(userRule);
    }
}
```

_**For specific usage and explanation, please move to the official document * *_

> ### 8. field serialization and deserialization

When the data is stored, the complex data type on the automatic serialization field is a string (json-like format), and the data is automatically deserialized when the data is read, without the need to write additional conversion Handler(MP official scheme, you need to manually specify a BaseTypeHandler for each complex data type).

This scheme has certain limitations. In fact, it draws on the 1 data serialization scheme of Redisson, and records the characteristics of the data itself (the full name of the class) together when serializing, which is used as the basis for deserialization. Therefore, the serialized string is not a standard json. The disadvantage of this scheme is obvious, that is, the full name of the class (package name and class name) cannot be changed at will, because once changed, the problem of class cannot be found, thus the existing data cannot be deserialized normally.
```
@Data
@TableName(autoResultMap = true) // 必须
@Table(comment = "用户")
public class Users {

    @ColumnComment("ID")
    private Long id;

    @Serializable // 必须
    @ColumnComment("爱好")
    private List<Like> likes;
}
```

```
@Data
public class Like {
    private String id;
    private String name;
}
```

## Thanks

Thanks to the dromara.org open source community for the opportunity

Thank you for your support.

Small partners with problems are welcome to add me WeChat and pull you into the group to exchange and study together.

! [](/assets/img/news/MybatisPlusExt-2.png)

WeChat QR Code

## Author introduction

In 90 years, male, married, dabbled in both front and back ends. After graduation, he has been in the city of Jinan. If there are small partners in the same area, he can make an appointment at any time.

#### The author's open source project, please all the readers to use their rich hands and give a star

https://gitee.com/dromara/mybatis-plus-ext

https://gitee.com/tangzc/auto-table