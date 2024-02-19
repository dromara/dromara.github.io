---
title: 欢迎Dromara新晋开源项目-dbswitch，异构数据库迁移同步工具！
author: 三胖
date: 2023-11-27
cover: /assets/img/news/dbswitch-0-0.png
head:
  - - meta
    - name: 新闻
---

# 一个适用于异构数据库迁移同步的简单工具 dbswitch

## 作者介绍

- 网名：三胖(inrgihc)
- dromara 开源组织成员，项目 dromara/dbswitch 作者
- 项目地址：https://gitee.com/dromara/dbswitch

![](/assets/img/news/dbswitch-0-0.png)

## dbswitch 的诞生

你需要**将 Oracle 等老牌数据库中的数据一键搞到 MySQL 或 PostgreSQL 中**么？你需要**将 MySQL 等关系型数据库中的数据一键搞到 Greenplum/ClickHouse 等 OLAP 数据库中进行分析**么？

如果你在工作中遇到与我同样的需求，那么不妨体验下 dbswitch 工具。

dbswitch 是在**数据库间数据搬迁**和**数据入仓入湖**这两大背景环境下诞生的，虽然目标路程还很长，但是**dbswitch 作为一款开源工具**会一直再努力坚持着（也许各个数据库厂商都有自己的专业迁移工具）。

## dbswitch 的功能

简言之，dbswitch 提供源端数据库向目的端数据库的批量迁移同步功能：

- 结构迁移：

(1)支持字段类型、主键信息、建表语句等的转换，并生成建表 SQL 语句。

(2)支持基于正则表达式转换的表名与字段名映射转换。

- 数据同步：

(1)基于 JDBC 的分批次读取源端数据库数据，并基于 jdbc(insert/copy 方式)将数据分批次写入目的数据库。

(2)支持有主键表（基于数据比对变化计算原理的）增量变更(insert/update/delete)同步功能

## dbswitch 支持的数据库

当前基于**驱动隔离**已经集成支持**多版本的数据库**产品如下：

- 甲骨文的 Oracle
- 微软的 Microsoft SQLServer
- MySQL/MariaDB
- PostgreSQL
- Greenplum(需使用 PostgreSQL 类型)
- IBM 的 DB2
- Sybase 数据库
- 国产达梦数据库 DMDB
- 国产人大金仓数据库 Kingbase8
- 国产翰高数据库 HighGo
- 国产神通数据库 Oscar
- 国产南大通用数据库 GBase8a
- Apache Hive(基于 JdbcStorageHandler)
- SQLite3
- OpenGuass
- ClickHouse
- MongoDB

## dbswitch 的部署体验

### 1.一键部署

- 基于 docker-compose 的一键安装(或升级):

```
curl -sSL https://gitee.com/inrgihc/dbswitch/attach_files/1551962/download | sh
```

- 基于 docker 的一键安装：

假设已经部署好的 MySQL 数据库地址为 192.168.31.57，端口为 3306，账号为 test，密码为 123456

```
docker run -d --name dbswitch \
 -e MYSQLDB_HOST=192.168.31.57 \
 -e MYSQLDB_PORT=3306 \
 -e MYSQLDB_USERNAME=test \
 -e MYSQLDB_PASSWORD='123456' \
 -v /tmp:/tmp \
 -p 9088:9088 \
 registry.cn-hangzhou.aliyuncs.com/inrgihc/dbswitch:1.8.2
```

## 2.部分截图

![](/assets/img/news/dbswitch-0-1.png)![](/assets/img/news/dbswitch-0-2.png)

- 二次集成开发

dbswitch 也支持 java 下二次集成开发，具体可查看 dbswitch 项目中的文档说明。

## 关注 dbswitch

欢迎体验使用 dbswitch 工具，同时项目中也提供了 dbswitch 相关的实现原理。对项目有什么想法、建议或 BUG，可以加微信进群深度交流（加好友请注明："程序交流"），也可创建 issues 进行反馈:

![](/assets/img/news/dbswitch-0-3.png)

## 友情项目

\[1\] Greenplum 一键安装

\[2\] 新闻文章正文抽取正文抽取组件

- **项目地址：https://gitee.com/dromara/dbswitch**
