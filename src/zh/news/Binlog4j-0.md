---
title: 轻量级 Mysql Binlog 客户端 Binlog4j 加入 Dromara 社区
author: 就眠儀式
date: 2023-08-31
cover: /assets/img/news/Binlog4j-0.jpg
head:
  - - meta
    - name: 新闻
---

## 项目介绍

Binlog4j 是一款提供宕机续读，高可用集群，数据转换的 Binlog 客户端。

## 项目特性

- 集群模式, 通过集群部署的方式，保证服务高可用。
- 宕机续读, 避免宕机期间造成数据丢失。
- 数据转换, 基于泛型封装 BinlogEvent 的序列化数据。
- 兼容 传统项目 与 Spring Boot / Cloud 项目。
- 兼容 Spring Boot 2.x 与 Spring Boot 3.x 版本。

## 应用场景

包括但不限于（1）数据同步（2）实时计算（3）数据审计（4）数据分析

## 下载安装

```
<dependency>
   <groupId>com.gitee.Jmysy</groupId>
   <artifactId>binlog4j-core</artifactId>
   <version>latest.version</version>
</dependency>
```

## 简单使用

通过 BinlogClient 创建客户端，IBinlogEventHandler 处理事件通知，该接口支持泛型，数据将遵循驼峰格式封装。

```
public class BootStrap {

    public static void main(String[] args) {

        BinlogClientConfig clientConfig = new BinlogClientConfig();
        clientConfig.setHost("127.0.0.1");
        clientConfig.setPort(3306);
        clientConfig.setUsername("root");
        clientConfig.setPassword("taoren@123");
        clientConfig.setServerId(1990);

        IBinlogClient binlogClient = new BinlogClient(clientConfig);

        binlogClient.registerEventHandler("database", "table", new IBinlogEventHandler() {

            @Override
            public void onInsert(BinlogEvent event) {
                System.out.println("插入数据:{}", event.getData());
            }

            @Override
            public void onUpdate(BinlogEvent event) {
                System.out.println("修改数据:{}", event.getData());
            }

            @Override
            public void onDelete(BinlogEvent event) {
                System.out.println("删除数据:{}", event.getData());
            }
        });

        binlogClient.connect();
    }
}
```

## 高级特性

通过 Persistence 配置为 true 启用宕机续读功能, Binlog4j 会将 binlog 的 filename 与 position 记录到 redis, 同时你需要提供 Redis 配置。

```
public class BootStrap {

    public static void main(String[] args) {

        RedisConfig redisConfig = new RedisConfig();
        redisConfig.setHost("127.0.0.1");
        redisConfig.setPort(6379);
        redisConfig.setPassword("taoren@123");

        BinlogClientConfig clientConfig = new BinlogClientConfig();
        clientConfig.setHost("127.0.0.1");
        clientConfig.setPort(3306);
        clientConfig.setUsername("root");
        clientConfig.setPassword("taoren@123");
        clientConfig.setServerId(1990);
        clientConfig.setRedisConfig(redisConfig);
        clientConfig.setPersistence(true);
        clientConfig.setMode(BinlogClientMode.cluster);

        BinlogClient binlogClient = new BinlogClient(clientConfig);

        binlogClient.registerEventHandler("database", "table", new IBinlogEventHandler<User>() {

            @Override
            public void onInsert(BinlogEvent<User> event) {
                System.out.println("插入数据:{}", event.getData());
            }

            @Override
            public void onUpdate(BinlogEvent<User> event) {
                System.out.println("修改数据:{}", event.getData());
            }

            @Override
            public void onDelete(BinlogEvent<User> event) {
                System.out.println("删除数据:{}", event.getData());
            }
        });

        binlogClient.connect();
    }
}
```

## 在 Spring Boot 集成

```
<dependency>
    <groupId>com.gitee.Jmysy</groupId>
    <artifactId>binlog4j-spring-boot-starter</artifactId>
    <version>latest.version</version>
</dependency>
```

首先，在 application.yml 或 application.properties 中填写 Binlog4j 配置

```
spring:
  binlog4j:
    redis-config:
      host: 127.0.0.1
      port: 6379
      password: taoren@123
    client-configs:
      master:
        username: root
        password: taoren@123
        host: 127.0.0.1
        port: 3306
        serverId: 1990
      slave:
        username: root
        password: taoren@123
        host: 127.0.0.1
        port: 3306
        serverId: 1991
```

## 单表监听

使用 @BinlogSubscriber 注解, 指定 IBinlogEventHandler 需要注册到哪个客户端, 并且指定监听的 database 与 table。

```
@BinlogSubscriber(clientName = "master", database = "pear-admin", table ="sys_user")
public class UserEventHandler implements IBinlogEventHandler<User> {

    @Override
    public void onInsert(BinlogEvent<User> event) {
        System.out.println("插入数据：" + event.getData());
    }

    @Override
    public void onUpdate(BinlogEvent<User> event) {
        System.out.println("修改数据:" + event.getData());
    }

    @Override
    public void onDelete(BinlogEvent<User> event) {
        System.out.println("删除数据:" + event.getData());
    }

}
```

## 复杂监听

@BinlogSubscriber 注解 database 与 table 属性支持 Pattern 匹配, IBinlogEventHandler 在不指定泛型的情况下, event.getData() 为 Map<String, Object> 类型, 用于兼容不同表的数据结构。

```
@BinlogSubscriber(clientName = "master", database = "pear-admin", table ="sys_user")
public class UserEventHandler implements IBinlogEventHandler<User> {

    @Override
    public void onInsert(BinlogEvent<User> event) {
        System.out.println("插入数据：" + event.getData());
    }

    @Override
    public void onUpdate(BinlogEvent<User> event) {
        System.out.println("修改数据:" + event.getData());
    }

    @Override
    public void onDelete(BinlogEvent<User> event) {
        System.out.println("删除数据:" + event.getData());
    }

}
```

## 相关链接

Gitee: https://gitee.com/dromara/binlog4j
