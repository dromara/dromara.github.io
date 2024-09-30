---
title: warm-flow v1.2.8 更新 - 新增办理人变量表达式和条件表达式支持spel
author: warm-flow
date: 2024-09-25
cover: /assets/img/news/warm-flow-v1.2.8-0.png
head:
  - - meta
    - name: 新闻
---

# warm-flow 1.2.8版本更新,新增办理人变量表达式和条件表达式支持spel

![](/assets/img/news/warm-flow-v1.2.8-0.png)

*   【升级注意事项】
    
*   本次升级，内置json库snack3方式，改为spi方式加载，业务项目中存在哪种json就会使用哪种的实现， 支持顺序按顺序加载一种：snack3、jackson、fastjson、gson，并且目前只实现了这四种，可扩展
    
*   如在未集成snack3库的环境下，还需要使用snack3库，需要单独使用（原组件使用snack3库）
    
    ```
          <dependency>
              <groupId>org.noear</groupId>
              <artifactId>snack3</artifactId>
              <version>3.2.88</version>
          </dependency>
    ```
    
*   更新日志
    
*   \[feat\] json库支持snack3、jackson、fastjson和gson，并且支持扩展
    
*   \[feat\] 增加办理人变量表达式，支持${xxx}替换和spel，并支持扩展
    
*   \[feat\] ListenerVariable监听器变量新增FlowParams字段，方便开始监听器全局传递参数
    
*   \[feat\] 终止新增对开始和完成监听器的支持
    
*   \[update\] springboot项目的条件表达式默认支持spel
    
*   \[update\] 历史记录改为单条保存，删除重复代码
    
*   \[update\] 修改FlowUserDao的bean名称
    
*   \[update\] 中间节点拆分为或签，会签，票签
    
*   \[fix\] 修复历史记录创建时间相等，导致流程图渲染异常
    
*   \[fix\]修复Mybatis逻辑删除变成真实删除的缺陷                               @xiarigang
    
*   \[refactor\] 重构id生成器，支持orm默认策略，删除数据填充默认实现类，改为匿名类
    

# 部分更新内容介绍

## 1、增加办理人变量表达式

### 1.1、默认办理人变量策略

#### 前端页面设置变量

*   比如：`@@default@@|${handler1},role:1,1`
    
*   `@@default@@|${handler1}`中@@default@@表示默认办理人变量策略，handler1是需要被流程变量中替换的标识
    
*   `role:1,1`表示办理人角色和具体办理人
    

![](/assets/img/news/warm-flow-v1.2.8-1.png)

#### 后端代码设置变量

```

// 流程变量
Map<String, Object> variable = new HashMap<>();
variable.put("handler1", "100");
flowParams.variable(variable);

Instance instance = insService.skipByInsId(testLeave.getInstanceId(), flowParams);
```

### 1.2、spel办理人变量策略

#### 前端页面设置变量

*   比如：`@@spel@@|#{@user.evalVar(#handler2)}`
    
*   `#{@user.evalVar(#handler2)}`是spel表达式，`#handler2`是方法入参变量，可以不设置
    

![](/assets/img/news/warm-flow-v1.2.8-2.png)

#### 后端代码设置变量

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

## 2、监听器变量新增FlowParams字段

> ListenerVariable监听器变量新增FlowParams字段，方便开始监听器全局传递参数

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

## 3、条件表达式默认支持spel

> springboot项目的条件表达式默认支持spel

*   前端配置如`#{@user.eval(#flag)}`表达式，入库前要拼接前缀，方便区分表达式类型，最终为`@@spel@@|#{@user.eval(#flag)}`
    
*   `#flag`为变量和以下方法入参命名一致，可不设置入参
    

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

# warm-flow介绍

> \[!IMPORTANT\] Warm-Flow国产工作流引擎🎉，其特点简洁轻量但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件。

1.  简洁易用：只有7张表，代码量少，可快速上手和集成
    
2.  审批功能：支持通过、退回、任意跳转、转办、终止、会签、票签、委派和加减签、互斥和并行网关
    
3.  监听器与流程变量：支持五种监听器，可应对不同场景，灵活可扩展，参数传递，动态权限
    
4.  流程图：流程引擎自带流程图，可在不集成流程设计器情况下使用
    
5.  条件表达式：内置常见的和spel条件表达式，并且支持自定义扩展
    
6.  办理人变量表达式：内置${handler}和spel格式的表达式，可满足不同场景，灵活可扩展
    
7.  orm框架扩展：目前支持MyBatis、Mybatis-Plus、Mybatis-Flex和Jpa，后续会由社区提供其他支持，扩展方便
    
8.  数据库支持：目前支持MySQL 、Oracle 和PostgreSQL，后续会继续支持其他数据库或者国产数据库
    
9.  多租户与软删除：流程引擎自身维护多租户和软删除实现，也可使用对应orm框架的实现方式
    
10.  支持角色、部门和用户等权限配置
    
11.  同时支持spring和solon
    
12.  兼容java8和java17,理论11也可以
    
13.  官方提供基于ruoyi-vue封装实战项目，很实用


## 演示地址

*   admin/admin123
    

演示地址：http://www.hhzai.top

## 官网

http://warm-flow.cn

关于 Dromara

Dromara 是由国内顶尖的开源项目作者共同组成的开源社区。提供包括分布式事务，流行工具，企业级认证，微服务RPC，运维监控，Agent监控，分布式日志，调度编排等一系列开源产品、解决方案与咨询、技术支持与培训认证服务。技术栈全面开源共建、 保持社区中立，致力于为全球用户提供微服务云原生解决方案。让参与的每一位开源爱好者，体会到开源的快乐。

  

Dromara开源社区目前拥有10+GVP项目，总star数量超过十万，构建了上万人的开源社区，有成千上万的个人及团队在使用Dromara社区的开源项目。

**欢迎大家来到知识星球和我互动**

![](/assets/img/qrcode_zsxq.webp)