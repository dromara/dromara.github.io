---
title: Apache ShenYu 2.6.1 Released
author: 何凤恩
date: 2024-01-24
cover: /assets/img/news/Apache-ShenYu-2.6.1-0.png
head:
  - - meta
    - name: 新闻
---

## 关于 Apache ShenYu

官网: https://shenyu.apache.org

GitHub: https://github.com/apache/shenyu

## 版本预览

版本记录：https://github.com/apache/shenyu/compare/v2.6.0...v2.6.1

### 新特性

1.为 shenyu ingress controller 添加 Dubbo 注解元数据

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5000

具体文档请查看：

https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config

2.支持插件生命周期

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5031

3.添加 shenyu-sdk-openfeign 模块

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5041

4.添加 Motan 和 Spring Cloud 添加 ingress controller 支持

5.shenyu 支持告警功能

![](/assets/img/news/Apache-ShenYu-2.6.1-0.png)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4782

具体文档请查看：

https://shenyu.apache.org/zh/docs/next/developer/notice-alert

6.shenyu client 添加 discovery 的注册中心

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5153

7.添加 shenyu context-path Ingress controller

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5167

8.添加 shenyu grpc Ingress controller

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5240

9.添加 shenyu sofa Ingress controller

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5253

10.添加 nacos, etcd, eureka 作为 shenyu discovery 服务注册中心

![](/assets/img/news/Apache-ShenYu-2.6.1-1.png)

![](/assets/img/news/Apache-ShenYu-2.6.1-2.png)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5193

11.添加新的插件：basic-plugin

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5258

12.添加新插件以及集成测试：shenyu-rabbitmq-logging plugin

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5283

https://github.com/apache/shenyu/pull/5312

13.通过 shenyu-discovery 绑定 selector

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5261

### API 变化

1.重构 shenyu 数据同步的数据结构

![](/assets/img/news/Apache-ShenYu-2.6.1-3.png)

2.使用 netty 作为默认的 httpclient

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5200

3.重构 shenyu-admin-listener 来支持 shenyu admin 数据同步

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5294

https://github.com/apache/shenyu/pull/5347

4.删除 shenyu 对 brpc 的支持，包括 brpc 插件，brpc 示例，brpc 集成测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5305

https://github.com/apache/shenyu/pull/5358

5.移除 Apollo 的依赖以便支持 Java 17(自行添加依赖)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5308

具体文档请查看：

https://shenyu.apache.org/docs/next/user-guide/property-config/use-data-sync/#apollo-synchronization-config

6.删除 shenyu 的中间件 register center

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5352

### 增强

1.添加 shenyu model event 的单元测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4965

2.添加 shenyu admin 测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4971

https://github.com/apache/shenyu/pull/5231

https://github.com/apache/shenyu/pull/5263

3.添加 motan 的端到端测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4957

4.支持 motan 插件选择协议

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5003

5.添加 Grpc 的端到端测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4966

6.升级 apache-rat-plugin 版本到 0.15

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5029

7.在匹配时地址 isBlank 条件匹配

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4983

8.Clickhouse 支持 ttl 字段

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5032

9.支持 HttpUtils 的日志级别判断

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4976

10.为 Ingress Reconciler 添加单元测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5051

https://github.com/apache/shenyu/pull/5169

11.当软件包分发时自动 checksum

具体 pr‘请查看：

https://github.com/apache/shenyu/pull/5049

12.在 tcp 插件中实现零拷贝

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5066

13.shenyu-client-springmvc 支持默认的 appname 和 context-path

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5050

14.添加 sdk-feign 的示例和集成测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5099

15.es log 插件支持用户自定义的索引

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5102

16.增强 grpc 插件支持 shenyu-loadbalancer 负载均衡算法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5115

17.支持 http2 协议的下游服务

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5125

18.重构增强 dubbo 插件支持 shenyu-loadbalancer 负载均衡算法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5131

19.添加 ingress controller 的 springcloud 集成测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5139

20.添加 WebSocket 插件代理 ping 的功能

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5144

21.添加 ingress controller 的 websocket 集成测试

22.Rewrite 插件支持按照百分比重写

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5119

23.Admin 使用 discovery config 初始化 discovery server

具体请查看：

https://github.com/apache/shenyu/pull/5174

24.Divide 插件适配 shenyu discovery

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5185

25.Alert 支持多个 admin 的集群

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5197

26.WebSocket 插件适配 shenyu discovery

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5202

27.注册服务实例到 shenyu discovery

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5170

28.ShenYu Admin 适配 shenyu-discovery 的 local 模式

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5176

29.添加 shenyu sdk core 的测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5267

https://github.com/apache/shenyu/pull/5270

30.添加 shenyu-discovery 的测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5285

https://github.com/apache/shenyu/pull/5289

https://github.com/apache/shenyu/pull/5291

https://github.com/apache/shenyu/pull/5297

https://github.com/apache/shenyu/pull/5310

31.添加 opengauss 的 e2e 测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5309

32.添加上传插件包大小的限制

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5316

33.添加 shenyu-client-websocket 的测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5322

34.升级 shiro 到安全版本(1.18.0)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5334

35.升级 SpringBoot 版本到 2.7.17，更新 license

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5356

36.添加网关异常时发送通知到 shenyu-alert

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5382

37.添加 EurekaDiscoveryService 单元测试

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5390

### 重构

1.重构整理 2.6.1 版本(pom.xml)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4995

2.使用 computeIfAbsent 重构 Map 的操作

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4997

3.重构 polaris 测试用例

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4986

4.迁移 Maven Wrapper 到官方镜像

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5011

5.在 WebClientMessageWriter 中编译过的 Pattern

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5026

6.重构 HttpUtils 的请求方法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5027

7.升级 github action 版本并重构 ci

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4992

https://github.com/apache/shenyu/pull/5039

https://github.com/apache/shenyu/pull/5081

8.重构数据同步的抽象模板方法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5001

9.重构 MenuProject, MenuModule, MenuDocItem 为 VO 对象

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5062

10.统一 dubbo 版本

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5083

11.重构 HttpClient 的目录

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5107

12.重构 github action ci 缓存

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5096

13.重构 motan 插件支持 pojo 对象作为方法参数

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5112

14.升级 kafka-client 版本到 3.4.0

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5122

15.迁移 admin swagger springfox 到 springdoc

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5113

16.升级 dubbo 版本到 3.2.5 并重构过期方法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5120

17.重构 AbstractShenyuSdkClient getOrDefault 方法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5173

18.重构 HttpClient 的参数

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5151

19.重构 webclient 插件的实现

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5196

20.升级 guava 版本到 32.0.0-jre

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5137

21.支持 k8s 作为 e2e 的测试环境

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5217

https://github.com/apache/shenyu/pull/5298

22.使用@Restapi 作为 rest api 的请求路径映射

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5222

23.使用 StringBuilder 作为字符串连接器

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5074

24.设置 netty allocator 参数为 unpooled

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5244

25.重构启动的 banner

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5329

https://github.com/apache/shenyu/pull/5339

26.删除重复的代码并且将部分代码作为公用

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5336

27.重构 null 的判断方法

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5345

28.重构日志插件的选择器处理器

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5357

https://github.com/apache/shenyu/pull/5367

29.重构自定义插件类加载器

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5368

30.重构日志插件支持插件级别的采样比率

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5385

31.重构 Context-path 避免重复注册(使用 selector for update)

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5387

https://github.com/apache/shenyu/pull/5386

### 问题修复

1.避免创建 TimeoutException 的永久开销

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4973

2.修复示例模块的主类路径

具体 pr 请查看：

https://github.com/apache/shenyu/pull/497

3.修复插件排序问题

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4999

4.修复 Makefile Snapshot 版本问题

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4996

5.修复 RELEASE-NOTES.md 的拼写错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4991

6.修复示例中的错误包名

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5007

7.修复密码验证规则，并且添加#和.的支持

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4977

8.修复 e2e 中 zookeeper:3.8.0 的健康检查

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5008

9.修复不稳定的 ci 检验

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5017

10.添加 e2e WaitForHelper 异常日志

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5023

11.修复 springcloud 在某些注册中心中间件不能获取 scheme

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5014

12.修复 javadoc 编译错误

13.修复 HttpUtils 中错误的请求类型

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4975

14.修复更新 auth 时未更新用户 id

具体 pr 请查看：

https://github.com/apache/shenyu/pull/4982

15.修复 TCP 插件的 eventloop 线程泄漏

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5048

16.格式化 shenyu-integrated-test 中的 quickstart

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5065

17.修复 SQL 脚本错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5086

https://github.com/apache/shenyu/pull/5037

https://github.com/apache/shenyu/pull/5184

https://github.com/apache/shenyu/pull/5234

https://github.com/apache/shenyu/pull/5368

18.修复 uri 插件 path 错误，并且使用 rawpath 替代 path

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5121

https://github.com/apache/shenyu/pull/5128

19.修复 websocket 插件对 rewrite 插件的支持

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5130

20.修复 ElasticSearchLog Plugin 索引名称无效

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5158

21.修复 context-path 插件的错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5159

22.修复 shenyu-admin 的 cpu 占用过高问题

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5168

https://github.com/apache/shenyu/pull/5164

23.修复 alert 中 LocalDateTime 的格式化问题

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5180

24.修复 shenyu-client 的 apiDoc 的错误重试问题

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5171

25.修复 applicationContextAware 初始化顺序过晚

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5195

26.修复重复的 response header

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5190

27.设置 k8s 的最大等待时间

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5220

28.修改 clickhouse 日志插件的 status 字段类型

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5230

29.修复 response write plugin 可能造成的内存泄漏

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5228

30.修复 dataType 字段选择错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5237

31.修复 http 数据同步错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5239

32.修复单词拼写错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5251

33.修复 shenyu dubbo 代理插件的注册状态

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5243

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5266

35.修复 shenyu-registry 的 eureka 注册错误逻辑

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5269

36.修复 AbstractLogPluginDataHandler hashcode 错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5280

37.修复 ratelimit 插件在集群模式下的 key 错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5286

38.修复同一个应用多个 shenyu-client 重复注册 context-path 的错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5320

39.修复在插件关闭后不会重新加载插件

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5338

40.修复 shenyu admin 上传插件的错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5342

41.修复 shenyu 不能加载 resource 目录下的资源

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5372

42.修复 Admin 来展示字典值

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5375

43.修复 Authorization 在 sign 插件中的冲突

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5381

44.修复签名插件的 context-path 路径匹配错误

具体 pr 请查看：

https://github.com/apache/shenyu/pull/5379

## 贡献者

TeslaCN,GOODBOY008,moremind,devinsong77,runqi-zhao,JooKS-me,kerwin612,li-keguo,yeshadoo,yu199195,DamonXue,liusishan,HaiqiQin,coderDylan,dragon-zhang,haolinkong,mxyyyy,misaya295,kerwin612,ywj1352,dengliming,impactCn,yunlongn,tanpenggood,xcsnx,xuziyang,ShawnJim,cubxxw,tomsun28,wenlongbrother,VampireAchao,wenpanwenpan,Ceilzcx,847850277,realize096,crudboy,tian-pengfei,0xmkzt,whenelse,lahmXu,wang3820,jbampton,eurecalulu,yudayday,YxYL6125,CytFree,GNK48-Ava,lianjunwei,MRgenial,geek-ken,ttfont

## 成为贡献者

我们欢迎每一位贡献者的加入 ShenYu，欢迎贡献者以 Apache Way 的精神参与 ShenYu！

贡献者指南请参考：

https://shenyu.apache.org/zh/community/contributor-guide
