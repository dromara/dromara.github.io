---
title: Welcome Modern Java ORM Easy-Query to the Dromara Community
author: xuejm
date: 2024-05-27
cover: /assets/img/news/EasyQuery-0.png
head:
  - - meta
    - name: News
---

## Author introduction

* Name: xuejm

* dromara member of open source organization, dromara/easy-query author

* java/.net related development experience of more than 10 years, rookie 1

* I like open source technology and am willing to specialize in research and sharing. I have many open source projects O(∩\_∩)O ha ha ~

* Personal space: https://github.com/xuejmnet和 https://gitee.com/xuejm


## Preface

ORM is also called object relational mapping. 1 a good ORM not only supports OM, but more importantly, it makes reasonable use' R' and' easy-query' is 1 modern ORM that supports object relations and SQL expressions.

## EasyQuery Introduction

EasyQuery is the 1 modern ORM under Java. It has strong type, lightweight and high performance characteristics. It is dedicated to solving jdbc queries, supporting object model relational filtering, implicit queries and pure SQL expression queries.

The framework supports java8 and above versions without dependencies. It supports a series of functions such as sub-database and sub-table, field encryption, cascade filtering, logical deletion, multi-tenant, dynamic table name, entity-free CRUD, calculation attribute, optimistic lock, batch processing, data tracking difference update, etc. It also provides users with great expansion and dialect custom function expansion.

! [](/assets/img/news/EasyQuery-0.png)

### Background

**Do you have the following pain points in using the existing orm? * *

> 1.orm usage is not easy to maintain, ide can not intelligent prompt
>>
> 2.orm does not support join or multi-table join function is weak and cannot meet the situation of group join subquery or from subquery, etc.
>>
> 3.orm model cascade filtering object relationship is too weak, only supports one-to-many one-to-one pull, does not support filtering
>>
> 4. There is no unified function to support mapping translation to all databases
>>
> 5.orm function is weak to support the business needs to add various external components to meet the business
>>
> 6.orm cannot be perfectly integrated with the existing pojo system
>>
> 7. do not support sub-database sub-table need to introduce additional sharding to support

If you have the above pain points, then 'easy-query' can help you.

**What can easy-query bring to developers? * *

> 1. simple, easy-to-use and efficient api, convenience and maintainability brought by streaming writing, and rejection of magic value
>>
> 2. strong type can only prompt that even if you are a new beginner, Xiao Bai can easily write the desired code under the prompt of idea.
>>
> 3. complex multi-table join, subquery, exists no longer need to worry about the need to introduce additional components in the face of various complex business scenarios
>>
> 4. model relation query embodies ORM 'r' incisively and vividly. it is not only a simple query result but also a perfect object model screening. just like stream query database, it can assert data related to me by methods such as' any',' none', etc.
>>
> 5. structured DTO can be pulled at will. after the user creates each model relationship, the object of any structure can be quickly pulled and converted into json. there is no need to worry about the acquisition of one-to -1., many-to-many 1. and many-to-many under paging.
>>
> 6. perfect elimination of performance problems caused by n 1
>>
> 7. all functions are completely free and permanently open source, and the author writes his own idea plug-in to help everyone improve efficiency. happy code

## Actual business case

The user architecture of the system is generally user roles (many-to-many), user enterprises are many-to -1, and role menus are many-to-many.

### User Filtering

#### Simple Filter
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

#### Implicit Filtering

##### A pair of 1 implicitly join

> because users and enterprises have multiple pairs of 1, when filtering users, object relationships can be used to filter on the condition of enterprises to automatically join users.

```
//筛选用户名称包含小明并且在JAVA企业上班的
List<SysUser> list = easyEntityQuery.queryable(SysUser.class)
    .where(user -> {
        user.name().like("小明");
        user.company().name().like("JAVA企业");
    }).toList();
//from user left join company on ... where user.name like ? and company.name like ?
```

##### One-to-many implicit subquery

> When we create a good enterprise relationship in the user object, we can use the enterprise as a condition when filtering users. On the contrary, when we create a good relationship between the enterprise and the user in the enterprise model, we can also use the user as a condition to help us quickly filter.

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

##### Multi-table explicit join

```

//查询用户join企业表条件是企业的名称包含JAVA企业这几个字
List<Company> companies = easyEntityQuery.queryable(SysUser.class)
    .leftJoin(Company.class, (user, com) -> user.companyId().eq(com.id()))
    .where((user, com) -> com.name().like("JAVA企业"))
    .select((user, com) -> com).toList();
//select company.* from user left join company on user.company_id = company.id where company.name like ?
```

##### Get user-owned menus directly

> there is no direct relationship between users and menus. the middle and role tables are many-to-many tables. there are also two tables user\_role and role\_menu tables in the middle.
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

##### Return User Structure with Role

> Return Results

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

##### Implicit query to get anonymous results

> sometimes we need to obtain the intermediate results above to facilitate java internal calculation. most orm only supports returning map objects at this time, which will lead to string all over and specific types will be lost, which is very inconvenient to use.
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

### Structured DTO

Many times we need to return a custom data structure instead of the entire database structure when accessing the response.

So we use the easy-query plug-in here to quickly build a structured DTO response.

* First, we install the latest version of' EasyQueryAssistant' plug-in in the idea plug-in market.

* The second part is right-CreateStructDTO on the package that needs to create the DTO

* Step 3 Select the structured data to be returned

! [](/assets/img/news/EasyQuery-1.jfif)

! [](/assets/img/news/EasyQuery-2.jfif)




> the following dto will be generated in the end

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

| Method | Description |
| --- | --- |
| nullOrDefault | Return parameter value if column is null |
| count | returns long |
| intCount | Statistics returned int |
| min | min |
| max | max |

#### String Functions

| Method | Description |
| --- | --- |
| subString | Cut string, default start 0 |
| concat | Link multiple columns or values |
| toLower | To lowercase |
| toUpper | To uppercase |
| trim | remove spaces before and after |
| trimStart | Remove the leading space |
| trimEnd | Remove trailing spaces |
| replace | Replace string |
| leftPad | left complement |
| rightPad | right complement |
| join | string multi-column join combination returns the common phrase group comma combination |
| length | String length |
| compareTo | Compare String Size |

#### Time function

| Method | Description |
| --- | --- |
| format | Java formatting is supported for date formatting |
| plus | Increase Time |
| plusMonths | Add months |
| plusYears | Increase Year |
| dayOfYear | The current number of days represents the number of days in a 1 year |
| dayOfWeek | The current number of days in the 1 year represents the day 0-6 Sunday is 0 |
| year | Returns the year |
| month | Returns months 1-12 |
| day | Returns the number of days 1-31 in the month |
| hour | Returns hours 0-23 |
| minute | Returns minutes 0-59 |
| second | Returns the number of seconds 0-59 |
| duration | Returns the interval of days/hours/.... a.duration (B, DateTimeDurationEnum.Days) how many days is a greater than B, if a is less than B, returns the negative number of days between two dates a and B |
| now | Current time |
| utcNow | Current UTC time |

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

If you are interested in this framework, you are welcome to try and your comments and suggestions. The framework has too many functions that cannot be displayed here. More functions can be consulted in github warehouse or gitee warehouse.

### Finally

easy-qeury 'is very pleased to join dromara organization, hoping to thrive under the organization and contribute 1 of its own weak strength to java open source.

Finally, please attach the project address and welcome everyone to join star to submit pr issue.

github repository https://github.com/dromara/easy-query

gitee warehouse https://gitee.com/dromara/easy-query