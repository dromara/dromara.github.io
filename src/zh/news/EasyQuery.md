---
title: 欢迎现代化 Java ORM Easy-Query 加入 Dromara社区
author: xuejm
date: 2024-05-27
cover: /assets/img/news/EasyQuery-0.png
head:
  - - meta
    - name: 新闻
---

## 作者介绍

*   名称:xuejm
    
*   dromara 开源组织成员,dromara/easy-query 作者
    
*   java/.net相关开发10年以上经验小菜鸟一枚
    
*   爱好开源技术乐于专研分享,拥有多个开源项目O(∩\_∩)O哈哈~
    
*   个人空间:https://github.com/xuejmnet  和  https://gitee.com/xuejm
    

## 前言

ORM又叫对象关系映射,一款好的ORM不仅仅是支持OM更重要的是把`R`合理的利用起来`easy-query`就是一款支持对象关系和SQL表达式的现代化ORM.

## EasyQuery介绍

EasyQuery是一款Java下面的现代化ORM,拥有强类型、轻量级、高性能特点,致力于解决jdbc查询,支持对象模型关系筛选,隐式查询,纯SQL表达式查询。

框架支持java8及以上版本完全无依赖干净,支持分库分表、字段加密、联级筛选、逻辑删除、多租户、动态表名、无实体CRUD、计算属性、乐观锁、批处理、数据追踪差异更新等一系列功能,并且给予用户极大地扩展和方言自定义功能扩展。

![](/assets/img/news/EasyQuery-0.png)

### 背景

**使用现有orm中你是否有以下痛点呢?**

> 1.orm使用都是字符串不易维护,ide无法智能提示
> 
> 2.orm不支持join或者多表join功能偏弱无法满足group+join 子查询或者from 子查询等情况
> 
> 3.orm模型联级筛选对象关系过弱,仅支持一对多一对一等的拉取,不支持筛选过滤
> 
> 4.没有统一的函数来支持映射翻译到所有的数据库
> 
> 5.orm功能薄弱想支撑业务需要添加各种外部组件来满足业务
> 
> 6.orm无法和现有pojo体系完美融合兼容
> 
> 7.不支持分库分表需要额外引入sharding来支持

如果你有以上痛点,那么`easy-query`获取能够帮助到你。

**使用easy-query可以为开发者带来什么?**

> 1.简单易用高效的api,流式书写带来的便捷性和易维护性,拒绝魔法值
> 
> 2.强类型只能提示哪怕你是刚入门小白也能在idea的提示下很容易写出想要的代码
> 
> 3.复杂多表join,子查询,exists面对各种复杂业务场景再也不用担心需要额外引入组件了
> 
> 4.模型关系查询将ORM的`R`体现的淋漓尽致,不仅仅是简单的查询出结果更能完美的进行对象模型筛选,犹如stream查询数据库一样可以以`any`,`none`等方法断言和我相关的数据
> 
> 5.结构化DTO任意拉取,可以在用户创建各个模型关系后快速拉去任意结构的对象转成json,不用再烦恼一对一、多对一、一对多、多对多在分页下的获取了
> 
> 6.完美杜绝n+1带来的性能问题
> 
> 7.所有功能完全免费永久开源,并且作者自行编写idea插件帮助大家提高效率happy code

## 实际业务案例

系统的用户架构一般是用户角色（多对多），用户企业多对1，角色菜单多对多

### 用户筛选

#### 简单筛选

```
//筛选用户名称包含小明的
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user->user.name().like("小明"))
    .toList()
  
//筛选用户名称包含小明的
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
   // ifnull(name,'小王') like '小明'
    .where(user->user.name().nullOrDefault("小王").like("小明"))
    .toList()
  
//筛选用户名称包含小明并且年龄小于18岁的
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user->{
         //name like ? and age < ?
            user.name().like("小明");
            user.age().lt(18)
    })
    .toList()
  
//返回分页结果
EasyPageResult<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user->{
         //name like ? and age < ?
            user.name().like("小明");
            user.age().lt(18)
    })
   .orderBy(user->user.createTime().desc())//按用户创建时间倒序
    .toPageResult(1,20)
  

//筛选用户名称包含小明或者年龄小于18岁的
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user->{
       user.or(()->{
           //name like ? or age < ?
            user.name().like("小明");
            user.age().lt(18)
        })
    })
    .toList()

//筛选用户名称包含小明或者年龄小于18岁的,只返回用户id和name
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user->{
       user.or(()->{
           //name like ? or age < ?
            user.name().like("小明");
            user.age().lt(18)
        })
    })
   //仅返回id和name
   .select(user-> user.FETCHER.id().name().fetchProxy())
    .toList()

```

#### 隐式筛选

##### 一对一隐式join

> 因为用户和企业是多对一的关系所以可以在筛选用户的时候利用对象关系以企业为条件进行筛选从而自动进行join

```
//筛选用户名称包含小明并且在JAVA企业上班的
List<SysUser> list = easyEntityQuery.queryable(SysUser.class)
    .where(user -> {
        user.name().like("小明");
        user.company().name().like("JAVA企业");
    }).toList();
//from user left join company on ... where user.name like ? and company.name like ?
```

##### 一对多隐式子查询

> 当我们在用户对象里面创建好企业关系可以在筛选用户时使用企业作为条件,反之我们在企业模型里面创建好企业和用户的关系我们在筛选企业的时候一样可以使用用户作为条件帮我们快速实现筛选

```
//筛选企业,筛选条件为企业下的员工存在名字是小明的
List<Company> companies = easyEntityQuery.queryable(Company.class)
    .where(com -> {
      com.users().any(u -> {
        u.name().like("小明");
      });
    }).toList();
//from company where exists( from user where .... and user.name like ?)


//筛选用户条件为用户包含/admin的菜单路径
List<SysUser> userWithMenuContainsAdminPath = easyEntityQuery.queryable(SysUser.class)
    .where(user -> {
      //筛选条件为用户下的角色,因为角色不需要过滤所以直接展开判断菜单
      //菜单里面存在任意一个路径是'/admin'的即可
      user.roles().flatElement().menus().any(menu -> menu.route().like("/admin"));
    }).toList();
```

##### 多表显式join

```

//查询用户join企业表条件是企业的名称包含JAVA企业这几个字
List<Company> companies = easyEntityQuery.queryable(SysUser.class)
    .leftJoin(Company.class, (user, com) -> user.companyId().eq(com.id()))
    .where((user, com) -> com.name().like("JAVA企业"))
    .select((user, com) -> com).toList();
//select company.* from user left join company on user.company_id = company.id where company.name like ?
```

##### 直接获取用户拥有的菜单

> 用户和菜单并没有直接关系中间和角色表是多对多中间还有两张表user\_role和role\_menu表

```
//查询小明用户拥有的菜单id集合
List<String> menuIds = easyEntityQuery.queryable(SysUser.class)
    .where(user -> user.name().eq("小明"))
    .toList(user -> user.roles().flatElement().menus().flatElement().id());

//查询小明用户拥有的菜单集合
List<SysMenu> menus = easyEntityQuery.queryable(SysUser.class)
    .where(user -> user.name().eq("小明"))
    .toList(user -> user.roles().flatElement().menus().flatElement());
```

##### 返回用户结构附带角色

> 返回结果

```
{user:{id:xxx,roles:[{...}]}}
```

```
//返回小于18岁的用户并且附带角色
List<SysUser> userAndRoles = easyEntityQuery.queryable(SysUser.class)
    .includes(user -> user.roles())
    .where(user -> user.age().lt(18))
    .toList();

//返回用户和用户拥有的角色分页返回一对多
EasyPageResult<SysUser> userAndRolePage = easyEntityQuery.queryable(SysUser.class)
    .includes(user -> user.roles())
    .where(user -> user.age().lt(18))
    .toPageResult(1, 20);
```

##### 隐式查询获取匿名结果

> 有时候我们需要在上文获取中间结果便于java内部计算,大部分orm在这个时候只支持返回map对象,这样会导致在使用时会遍布字符串并且具体类型也会丢失导致使用起来非常不方便

```

//查询返回用户id,用户名称和用户所在企业名称无需定义中间对象适用临时上下文获取或者group时候的聚合结果
List<Draft3<String, String, String>> userInfo = easyEntityQuery.queryable(SysUser.class)
      .where(user -> {
          user.name().like("小明");
          user.company().name().like("JAVA企业");
      }).select(user -> Select.DRAFT.of(
            user.id(),
            user.name(),
            user.company().name()
    )).toList();
for (Draft3<String, String, String> userAdnCom : userInfo) {
  String userId = userAdnCom.getValue1();
  String userName = userAdnCom.getValue2();
  String companyName = userAdnCom.getValue3();
}


List<Draft2<String, Integer>> list2 = easyEntityQuery.queryable(SysUser.class)
      .where(user -> {
        user.name().like("小明");
        user.company().name().like("JAVA企业");
      })
      .groupBy(user -> GroupKeys.TABLE1.of(user.name()))
      .select(group -> Select.DRAFT.of(
          group.key1(),//user.name
          group.sum(group.groupTable().age())//sum(user.age)
      )).toList();
```

### 结构化DTO

很多时候我们在访问响应时需要返回自定义的数据结构,而不是整个数据库结构

所以我们这边使用easy-query插件来快速实现构建结构化DTO响应

*   首先我们在idea插件市场安装`EasyQueryAssistant`插件最新版本
    
*   第二部在需要创建DTO的包右键CreateStructDTO
    
*   第三步选择需要返回的结构化数据
    
    ![](/assets/img/news/EasyQuery-1.jfif)
    
    ![](/assets/img/news/EasyQuery-2.jfif)
    

  

> 最终会生成如下dto

```

/**
 * this file automatically generated by easy-query struct dto mapping
 * 当前文件是easy-query自动生成的 结构化dto 映射
 * {@link com.easy.query.test.entity.blogtest.SysUser }
 *
 * @author easy-query
 */
@Data
public class UserRoleMenuDTO {
    private String id;
    private String name;
    @Navigate(value = RelationTypeEnum.ManyToMany)
    private List<InternalRoles> roles;
    /**
     * {@link com.easy.query.test.entity.blogtest.SysRole }
     */
    @Data
    public static class InternalRoles {
        private String id;
        private String name;
        @Navigate(value = RelationTypeEnum.ManyToMany)
        private List<InternalMenus> menus;
    }

    /**
     * {@link com.easy.query.test.entity.blogtest.SysMenu }
     */
    @Data
    public static class InternalMenus {
        private String id;
        private String name;
        private String route;
        private String icon;
    }

}
//一句话返回需要的结构DTO
//通过selectAutoInclude即可映射到我们的DTO 可以返回任意对象关系


List<UserRoleMenuDTO> menus = easyEntityQuery.queryable(SysUser.class)
    .where(u -> {
      u.name().like("小明");
      u.createTime().rangeClosed(LocalDateTime.now().plusDays(-100),LocalDateTime.now());
    })
    .selectAutoInclude(UserRoleMenuDTO.class)
    .toList();

```

### 函数翻译

#### 通用函数

| 方法 | 描述 |
| --- | --- |
| nullOrDefault | 如果列为null则返回参数值 |
| count | 统计数量返回long |
| intCount | 统计数量返回int |
| min | 最小值 |
| max | 最大值 |

#### 字符串函数

| 方法 | 描述 |
| --- | --- |
| subString | 切割字符串,默认起始0 |
| concat | 链接多个列或者值 |
| toLower | 转成小写 |
| toUpper | 转成大写 |
| trim | 去掉前后空格 |
| trimStart | 去掉前面空格 |
| trimEnd | 去掉后面空格 |
| replace | 替换字符串 |
| leftPad | 往左补值 |
| rightPad | 往右补值 |
| join | 字符串多列join组合返回常用语group+逗号组合 |
| length | 字符串长度 |
| compareTo | 比较字符串大小 |

#### 时间函数

| 方法 | 描述 |
| --- | --- |
| format | 格式化日期支持java格式化 |
| plus | 增加时间 |
| plusMonths | 增加月份 |
| plusYears | 增加年份 |
| dayOfYear | 当前天数在一年中代表第几天 |
| dayOfWeek | 当前天数在一年中代表第几天 0-6星期日为0 |
| year | 返回年份 |
| month | 返回月份1-12 |
| day | 返回月份中的天数1-31 |
| hour | 返回小时0-23 |
| minute | 返回分钟0-59 |
| second | 返回秒数0-59 |
| duration | 返回间隔天/小时/....  a.duration(b,DateTimeDurationEnum.Days) a比b大多少天,如果a小于b则返回负数 两个日期a,b之间相隔多少天 |
| now | 当前时间 |
| utcNow | 当前UTC时间 |

```
//函数嵌套处理
List<SysUser> users = easyEntityQuery.queryable(SysUser.class)
    .where(user -> {
      user.createTime()
        .nullOrDefault(LocalDateTime.now())
        .plus(1, TimeUnit.DAYS)
        .format("yyyy-MM-dd HH:mm:ss")
        .eq("2024-01-01 00:00:00");
    }).toList();
//SQL:FROM user  WHERE DATE_FORMAT(date_add(IFNULL(`create_time`,?), interval (?) microsecond),'%Y-%m-%d %H:%i:%s') = ?
//参数:2024-05-20T14:40:08.152(LocalDateTime),86400000000(Long),2024-01-01 00:00:00(String)
```

如果您对此框架有兴趣那么欢迎您的尝试，也欢迎您的意见建议,框架拥有太多的功能无法在这里意义展示,更多的功能可以访问 github仓库 或gitee仓库 进行查阅

### 最后

`easy-qeury`很高兴加入dromara这个组织希望可以再组织下茁壮成长,为java开源贡献一份自己的微弱力量

最后附上项目地址欢迎大家加入star提交pr issue

github仓库 https://github.com/dromara/easy-query

gitee仓库 https://gitee.com/dromara/easy-query