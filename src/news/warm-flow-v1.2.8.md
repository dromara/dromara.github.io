---
title: warm-flow v1.2.8 Update-Added Handler Variable Expressions and Conditional Expressions to support spel
author: warm-flow
date: 2024-09-25
cover: /assets/img/news/warm-flow-v1.2.8-0.png
head:
  - - meta
    - name: News
---

# The warm-flow version 1.2.8 is updated, and the new variable expression and conditional expression support spel are added.

![](/assets/img/news/warm-flow-v1.2.8-0.png)

* [Upgrade Notes]]

* In this upgrade, the built-in json library is loaded in snack3 mode instead of spi mode. The implementation of which json exists in the business project will be used. The 1 types of json are supported to be loaded in sequence: snack3, jackson, fastjson and gson. Currently, only these 4 types are implemented and can be extended.

* If the snack3 library is not integrated, the snack3 library needs to be used separately (the original component uses the snack3 library).
  
    ```
          <dependency>
              <groupId>org.noear</groupId>
              <artifactId>snack3</artifactId>
              <version>3.2.88</version>
          </dependency>
    ```
    
* Update log

* \[feat\] json library supports snack3, jackson, fastjson, and gson, and supports extension

* \[feat\] adds the variable expression of the handling person, supports ${xxx} substitution and spel, and supports extension

* \[feat\] Add a FlowParams field to ListenerVariable the listener variable to facilitate the global transmission of parameters to the listener.

* \[feat\] End new support for start and finish listeners

* \[update\] the conditional expression of springboot project supports spel by default

* \[update\] Change the historical record to a single record and delete duplicate codes

* \[update\] Modify the FlowUserDao bean name

* \[update\] The middle node is split into or, countersign, and ticket sign

* \[fix\] The creation time of the repair history is equal, resulting in abnormal rendering of the flowchart

* \[fix\] fix the defect that Mybatis logical deletion becomes real deletion @ xiarigang

* \[refactor\] Reconstruct the ID generator to support the default ORM policy. Delete the data and fill the default implementation class, and change it to an anonymous class.


# Partial update content introduction

## 1, add the variable expression of the handling person

### 1.1. Default Handler Variable Policy

#### Front-end page setting variable

* For example: '@ @ @ |${ brush},role:1,1'

* '@ @ @ @ |${'} @ @ @ @ @ @ @ indicates the default supervisor variable strategy, which is the identifier that needs to be replaced in the process variable.

* 'role:1,1 'indicates the role of the person in charge and the specific person in charge
  

![](/assets/img/news/warm-flow-v1.2.8-1.png)

#### Backend Code Setting Variables

```

// 流程变量
Map<String, Object> variable = new HashMap<>();
variable.put("handler1", "100");
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
```

### 1.2、spel Handle Variable Strategy

#### Front End Page Setup Variables

* For example: '@ @ spel @ |#{ @ user. (#) resp.}'

* '#{@ user.evalVar(#handler2)}' is a spel expression, '#handler2' is a method input variable, which may not be set
  

![](/assets/img/news/warm-flow-v1.2.8-2.png)

#### Backend Code Setting Variables

```
/**
 * 用户类
 */
@Component("user")
public class User {

    /**
     * spel办理人变量表达式
     * @param handler2 办理人
     * @return String
     */
    public String evalVar(String handler2) {
        return handler2;
    }
}

// 流程变量
Map<String, Object> variable = new HashMap<>();
variable.put("handler2", "101");
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
```

## 2、Listener Variables Add FlowParams Fields

> Add a FlowParams field to ListenerVariable the listener variable to facilitate the global transfer of parameters to the listener.

```
@Component
public class GlobalStartListener implements Listener {


  private static final Logger log = LoggerFactory.getLogger(GlobalStartListener.class);

  /**
   * 设置办理人id、所拥有的权限等操作，也可以放到业务代码中办理前设置，或者局部监听器
   * @param listenerVariable 监听器变量
   */
  @Override
  public void notify(ListenerVariable listenerVariable) {
    log.info("全局开始监听器");

    FlowParams flowParams = listenerVariable.getFlowParams();
    LoginUser user = SecurityUtils.getLoginUser();
    // 设置当前办理人id
    flowParams.setHandler(user.getUser().getUserId().toString());

    // 设置办理人所拥有的权限，比如角色、部门、用户等
    List<String> permissionList = flowParams.getPermissionFlag();
    if (StringUtils.isEmpty(permissionList)) {
      permissionList = new ArrayList<>();
    }

    List<SysRole> roles = user.getUser().getRoles();
    if (Objects.nonNull(roles)) {
      permissionList.addAll(roles.stream().map(role -> "role:" + role.getRoleId()).collect(Collectors.toList()));
    }
    permissionList.add("dept:" + SecurityUtils.getLoginUser().getUser().getDeptId());
    permissionList.add(user.getUser().getUserId().toString());
    flowParams.setPermissionFlag(permissionList);

    log.info("全局开始监听器结束;{}", "开启流程完成");
  }
}
```

## 3、conditional expressions support spel by default

> The conditional expression of the springboot project supports spel by default.

* The front-end configuration is, for example, '#{@ user.eval(#flag)}' expression. Before warehousing, the prefix should be spliced to facilitate the differentiation of expression types. The final value is '@ @ spel @@|#{@ user.eval(#flag)}'

* '#flag' indicates that the variable is named the same as the following method input parameters, but the input parameters may not be set.
  

![](/assets/img/news/warm-flow-v1.2.8-3.png)

```
@Component("user")
public class User {

  /**
   * spel条件表达：判断大于等4
   * @param flag 待判断的字符串
   * @return boolean
   */
  public boolean eval(String flag) {
    BigDecimal a = new BigDecimal(flag);
    BigDecimal b = new BigDecimal("4");
    return a.compareTo(b) > 0;
  }
}

/**
 * 新增OA 请假申请
 *
 * @param testLeave OA 请假申请
 * @return 结果
 */
@Override
public int insertTestLeave(TestLeave testLeave, String flowStatus)
{
  FlowParams flowParams = FlowParams.build().flowCode(getFlowType(testLeave));
  // 流程变量
  Map<String, Object> variable = new HashMap<>();
  variable.put("flag", String.valueOf(testLeave.getDay()));
  flowParams.variable(variable);

  Instance instance = insService.start(id, flowParams);
  return instance != null? 1 : 0;
}
```

# warm-flow introduction

> \[!IMPORTANT\] Warm-Flow Domestic Workflow Engine🎉, Its characteristics are simple and lightweight but not simple, complete with five internal organs, independent components, expandable, and can meet the components of small and medium-sized projects.

1. Simple and easy to use: only 7 tables, less code, can be quickly started and integrated

2. Approval function: supports pass, return, arbitrary jump, transfer, termination, countersign, ticket sign, delegation, addition and subtraction, mutual exclusion and parallel gateway

3. Listener and process variables: supports five kinds of listeners, can cope with different scenarios, flexible and scalable, parameter transfer, dynamic permissions

4. Flowchart: The process engine comes with a flowchart that can be used without integrating the process designer.

5. Conditional expressions: Built-in common and spel conditional expressions, and support for custom extensions.

6. Handler variable expression: built-in ${handler} and spel format expression, can meet different scenarios, flexible and scalable

7. Orm framework extension: currently supports MyBatis, Mybatis-Plus, Mybatis-Flex and Jpa, and will be supported by the community in the future, which is convenient for expansion.

8. Database support: currently supports MySQL, Oracle and PostgreSQL, and will continue to support other databases or domestic databases in the future.

9. Multi-tenancy and soft deletion: The process engine itself maintains the implementation of multi-tenancy and soft deletion, and can also use the implementation of the corresponding orm framework.

10. Support role, department and user permissions configuration

Supports both Spring and Solon

12. Compatible with java8 and java17, theory 11 can also be

13. The official provides practical projects based on ruoyi-vue packaging, which is very practical.


## Demo Address

*   admin/admin123
    

Demo Address：http://www.hhzai.top

## official website

http://warm-flow.cn

About Dromara

Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/qrcode_zsxq.webp)