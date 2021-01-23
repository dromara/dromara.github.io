---
title: dubbo用户指南
keywords: dubbo
description: dubbo用户指南
---

# Dubbo接口部分

*  在你的接口项目中引入jar包。

```xml
      <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>hmily-annotation</artifactId>
          <version>{last.version}</version>
      </dependency>
```

* 在需要进行Hmily分布式事务的接口方法上加上 `@Hmily` 标识。
```java
public interface HelloService {

    @Hmily
    void say(String hello);
}
```

# Dubbo实现项目
 
  * 步骤一 ： 引入依赖`hmily`的jar包
  
  * 步骤二 ： 新增`Hmily`配置
  
  * 步骤三 ： 在实现方法上添加注解。`TC`C模式，则需要完成 `confirm`，`cancel`方法的开发

### 引入依赖

##### Spring-Namespace

* Alibaba-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* Aapche-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-apache-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* 在xml中进行如下配置

```xml
    <!--设置开启aspectj-autoproxy-->
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <bean id = "hmilyTransactionAspect" class="org.dromara.hmily.spring.aop.SpringHmilyTransactionAspect"/>
    <bean id = "hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware"/>

```

##### Spring-Boot

* Alibaba-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* Aapche-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-apache-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

## 引入 hmily配置

  * 在项目的 `resource` 新建文件名为:`hmily.yml`配置文件
  
  * 具体的参数配置可以参考[配置详解](config.md),[本地配置模式](config-local.md), [zookeeper配置模式](config-zookeeper.md), [nacos配置模式](config-nacos.md),[apollo配置模式](config-apollo.md)
  
  
## 实现接口上添加注解

上述我们已经完成了集成，下面将讲述具体的实现。

##### TCC模式

 * 对`@Hmily` 标识的接口方法的具体实现上，加上` @HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`

 * `confirmMethod` : 确认方法名称，该方法参数列表与返回类型应与标识方法一致。

 * `cancelMethod` :  回滚方法名称，该方法参数列表与返回类型应与标识方法一致。
 
 * `TCC`模式应该保证 `confirm` 和 `cancel` 方法的幂等性，用户需要自行去开发这个2个方法，所有的事务的确认与回滚，完全由用户决定。Hmily框架只是负责来进行调用

```java

public class HelloServiceImpl implements HelloService  {

    @HmilyTCC(confirmMethod = "sayConfrim", cancelMethod = "sayCancel")
    public void say(String hello) {
         System.out.println("hello world");
    }
    
    public void sayConfrim(String hello) {
         System.out.println(" confirm hello world");
    }

    public void sayCancel(String hello) {
         System.out.println(" cancel hello world");
    }
}
``` 

# dubbo注解用户 

 对于使用 `@Reference ` 注解来注入dubbo服务的用户，请注意：你可以需要做如下配置:
   
#### spring-namespace 用户

在你的xml配置中，需要将 `org.dromara.hmily.spring.annotation.RefererAnnotationBeanPostProcessor` 注入成spring的bean
```xml
 <bean id = "refererAnnotationBeanPostProcessor" class="org.dromara.hmily.spring.annotation.RefererAnnotationBeanPostProcessor"/>
```   

#### spring-boot用户

需要在yml文件里面开启注解支持：
```yml
hmily.support.rpc.annotation = true 
```      

或者在项目中显示注入：

```java
@Bean
public BeanPostProcessor refererAnnotationBeanPostProcessor() {
    return new RefererAnnotationBeanPostProcessor();
}
```

### TAC模式(在开发，未发布)

  *  对`@Hmily` 标识的接口方法的具体实现上加上` @HmilyTAC`
  
## 重要注意事项

  在调用任何RPC调用之前，当你需要聚合rpc调用成为一次分布式事务的时候，需要在聚合RPC调用的方法上，先行添加 `@HmilyTCC` 或者 `@HmilyTAC` 注解,表示开启全局事务。

#### 负载均衡

  * 如果服务部署了几个节点， 负载均衡算法最好使用 `hmily`, 这样 `try`, `confirm`, `cancel` 调用会落在同一个节点
    充分利用了缓存，提搞了效率。
    
  * 支持一下几种 `hmilyConsistentHash `, `hmilyLeastActive `,  `hmilyRandom `, `hmilyRoundRobin ` 几种方式均是继承dubbo原生的
    
```xml
   <dubbo:reference  interface="xxx"  id="xxx" loadbalance="hmilyConsistentHash"/>           
```      
    
#### 设置永不重试
    
  * 需要进行分布式事务的dubbo接口，调用放要设置为永远不重试(retries="0")

```xml
   <dubbo:reference  interface="xxx"  id="xxx" retries="0"/>           
```  

#### 异常
  
  * `try`, `confirm`, `cancel` 方法的所有异常不要自行`catch` 任何异常都应该抛出给 `Hmily`框架处理。