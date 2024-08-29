---
title: Apache ShenYu 2.6.1 Released
author: 何凤恩
date: 2024-01-24
cover: /assets/img/blog/ApacheShenYu-2.6.1-0.png
head:
  - - meta
    - name: 博客
---

## 关于Apache ShenYu

“

官网: https://shenyu.apache.org

GitHub: https://github.com/apache/shenyu

## 版本预览

“

版本记录：https://github.com/apache/shenyu/compare/v2.6.0...v2.6.1

### 新特性

1.为shenyu ingress controller添加Dubbo注解元数据

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5000

具体文档请查看：

https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config

2.支持插件生命周期

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5031

3.添加shenyu-sdk-openfeign模块

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5041

4.添加Motan和Spring Cloud添加ingress controller支持

5.shenyu支持告警功能

![](/assets/img/blog/ApacheShenYu-2.6.1-0.png)

  

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4782

具体文档请查看：

https://shenyu.apache.org/zh/docs/next/developer/notice-alert

6.shenyu client添加discovery的注册中心

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5153

7.添加shenyu context-path Ingress controller

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5167

8.添加shenyu grpc Ingress controller

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5240

9.添加shenyu sofa Ingress controller

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5253

10.添加nacos, etcd, eureka作为shenyu discovery服务注册中心

![](/assets/img/blog/ApacheShenYu-2.6.1-1.png)

![](/assets/img/blog/ApacheShenYu-2.6.1-2.png)

  

  

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5193

11.添加新的插件：basic-plugin

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5258

12.添加新插件以及集成测试：shenyu-rabbitmq-logging plugin

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5283

https://github.com/apache/shenyu/pull/5312

13.通过shenyu-discovery绑定selector

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5261

### API变化

1.重构shenyu数据同步的数据结构

  

![](/assets/img/blog/ApacheShenYu-2.6.1-3.png)

  

2.使用netty作为默认的httpclient

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5200

3.重构shenyu-admin-listener来支持shenyu admin数据同步

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5294

https://github.com/apache/shenyu/pull/5347

4.删除shenyu对brpc的支持，包括brpc插件，brpc示例，brpc集成测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5305

https://github.com/apache/shenyu/pull/5358

5.移除Apollo的依赖以便支持Java 17(自行添加依赖)

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5308

具体文档请查看：

https://shenyu.apache.org/docs/next/user-guide/property-config/use-data-sync/#apollo-synchronization-config

6.删除shenyu的中间件register center

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5352

### 增强

1.添加shenyu model event的单元测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4965

2.添加shenyu admin测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4971

https://github.com/apache/shenyu/pull/5231

https://github.com/apache/shenyu/pull/5263

3.添加motan的端到端测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4957

4.支持motan插件选择协议

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5003

5.添加Grpc的端到端测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4966

6.升级apache-rat-plugin版本到0.15

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5029

7.在匹配时地址isBlank条件匹配

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4983

8.Clickhouse支持ttl字段

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5032

9.支持HttpUtils的日志级别判断

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4976

10.为Ingress Reconciler添加单元测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5051

https://github.com/apache/shenyu/pull/5169

11.当软件包分发时自动checksum

“

具体pr‘请查看：

https://github.com/apache/shenyu/pull/5049

12.在tcp插件中实现零拷贝

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5066

13.shenyu-client-springmvc支持默认的appname和context-path

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5050

14.添加sdk-feign的示例和集成测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5099

15.es log插件支持用户自定义的索引

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5102

16.增强grpc插件支持shenyu-loadbalancer负载均衡算法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5115

17.支持http2协议的下游服务

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5125

18.重构增强dubbo插件支持shenyu-loadbalancer负载均衡算法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5131

19.添加ingress controller的springcloud集成测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5139

20.添加WebSocket插件代理ping的功能

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5144

21.添加ingress controller的websocket集成测试

22.Rewrite插件支持按照百分比重写

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5119

23.Admin使用discovery config初始化discovery server

“

具体请查看：

https://github.com/apache/shenyu/pull/5174

24.Divide插件适配shenyu discovery

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5185

25.Alert支持多个admin的集群

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5197

26.WebSocket插件适配shenyu discovery

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5202

27.注册服务实例到shenyu discovery

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5170

28.ShenYu Admin适配shenyu-discovery的local模式

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5176

29.添加shenyu sdk core的测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5267

https://github.com/apache/shenyu/pull/5270

30.添加shenyu-discovery的测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5285

https://github.com/apache/shenyu/pull/5289

https://github.com/apache/shenyu/pull/5291

https://github.com/apache/shenyu/pull/5297

https://github.com/apache/shenyu/pull/5310

31.添加opengauss的e2e测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5309

32.添加上传插件包大小的限制

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5316

33.添加shenyu-client-websocket的测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5322

34.升级shiro到安全版本(1.18.0)

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5334

35.升级SpringBoot版本到2.7.17，更新license

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5356

36.添加网关异常时发送通知到shenyu-alert

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5382

37.添加EurekaDiscoveryService单元测试

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5390

### 重构

1.重构整理2.6.1版本(pom.xml)

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4995

2.使用computeIfAbsent重构Map的操作

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4997

3.重构polaris测试用例

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4986

4.迁移Maven Wrapper到官方镜像

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5011

5.在WebClientMessageWriter中编译过的Pattern

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5026

6.重构HttpUtils的请求方法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5027

7.升级github action版本并重构ci

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4992

https://github.com/apache/shenyu/pull/5039

https://github.com/apache/shenyu/pull/5081

8.重构数据同步的抽象模板方法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5001

9.重构MenuProject, MenuModule, MenuDocItem为VO对象

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5062

10.统一dubbo版本

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5083

11.重构HttpClient的目录

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5107

12.重构github action ci缓存

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5096

13.重构motan插件支持pojo对象作为方法参数

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5112

14.升级kafka-client版本到3.4.0

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5122

15.迁移admin swagger springfox到springdoc

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5113

16.升级dubbo版本到3.2.5并重构过期方法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5120

17.重构AbstractShenyuSdkClient getOrDefault方法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5173

18.重构HttpClient的参数

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5151

19.重构webclient插件的实现

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5196

20.升级guava版本到32.0.0-jre

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5137

21.支持k8s作为e2e的测试环境

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5217

https://github.com/apache/shenyu/pull/5298

22.使用@Restapi作为rest api的请求路径映射

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5222

23.使用StringBuilder作为字符串连接器

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5074

24.设置netty allocator参数为unpooled

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5244

25.重构启动的banner

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5329

https://github.com/apache/shenyu/pull/5339

26.删除重复的代码并且将部分代码作为公用

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5336

27.重构null的判断方法

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5345

28.重构日志插件的选择器处理器

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5357

https://github.com/apache/shenyu/pull/5367

29.重构自定义插件类加载器

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5368

30.重构日志插件支持插件级别的采样比率

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5385

31.重构Context-path避免重复注册(使用selector for update)

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5387

https://github.com/apache/shenyu/pull/5386

### 问题修复

1.避免创建TimeoutException的永久开销

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4973

2.修复示例模块的主类路径

“

具体pr请查看：

https://github.com/apache/shenyu/pull/497

3.修复插件排序问题

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4999

4.修复Makefile Snapshot版本问题

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4996

5.修复RELEASE-NOTES.md的拼写错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4991

6.修复示例中的错误包名

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5007

7.修复密码验证规则，并且添加#和.的支持

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4977

8.修复e2e中zookeeper:3.8.0的健康检查

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5008

9.修复不稳定的ci检验

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5017

10.添加e2e WaitForHelper异常日志

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5023

11.修复springcloud在某些注册中心中间件不能获取scheme

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5014

12.修复javadoc编译错误

13.修复HttpUtils中错误的请求类型

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4975

14.修复更新auth时未更新用户id

“

具体pr请查看：

https://github.com/apache/shenyu/pull/4982

15.修复TCP插件的eventloop线程泄漏

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5048

16.格式化shenyu-integrated-test中的quickstart

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5065

17.修复SQL脚本错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5086

https://github.com/apache/shenyu/pull/5037

https://github.com/apache/shenyu/pull/5184

https://github.com/apache/shenyu/pull/5234

https://github.com/apache/shenyu/pull/5368

18.修复uri插件path错误，并且使用rawpath替代path

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5121

https://github.com/apache/shenyu/pull/5128

19.修复websocket插件对rewrite插件的支持

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5130

20.修复ElasticSearchLog Plugin索引名称无效

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5158

21.修复context-path插件的错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5159

22.修复shenyu-admin的cpu占用过高问题

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5168

https://github.com/apache/shenyu/pull/5164

23.修复alert中LocalDateTime的格式化问题

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5180

24.修复shenyu-client的apiDoc的错误重试问题

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5171

25.修复applicationContextAware初始化顺序过晚

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5195

26.修复重复的response header

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5190

27.设置k8s的最大等待时间

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5220

28.修改clickhouse日志插件的status字段类型

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5230

29.修复response write plugin可能造成的内存泄漏

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5228

30.修复dataType字段选择错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5237

31.修复http数据同步错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5239

32.修复单词拼写错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5251

33.修复shenyu dubbo代理插件的注册状态

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5243

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5266

35.修复shenyu-registry的eureka注册错误逻辑

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5269

36.修复AbstractLogPluginDataHandler hashcode错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5280

37.修复ratelimit插件在集群模式下的key错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5286

38.修复同一个应用多个shenyu-client重复注册context-path的错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5320

39.修复在插件关闭后不会重新加载插件

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5338

40.修复shenyu admin上传插件的错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5342

41.修复shenyu不能加载resource目录下的资源

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5372

42.修复Admin来展示字典值

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5375

43.修复Authorization在sign插件中的冲突

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5381

44.修复签名插件的context-path路径匹配错误

“

具体pr请查看：

https://github.com/apache/shenyu/pull/5379

## 贡献者

TeslaCN,GOODBOY008,moremind,devinsong77,runqi-zhao,JooKS-me,kerwin612,li-keguo,yeshadoo,yu199195,DamonXue,liusishan,HaiqiQin,coderDylan,dragon-zhang,haolinkong,mxyyyy,misaya295,kerwin612,ywj1352,dengliming,impactCn,yunlongn,tanpenggood,xcsnx,xuziyang,ShawnJim,cubxxw,tomsun28,wenlongbrother,VampireAchao,wenpanwenpan,Ceilzcx,847850277,realize096,crudboy,tian-pengfei,0xmkzt,whenelse,lahmXu,wang3820,jbampton,eurecalulu,yudayday,YxYL6125,CytFree,GNK48-Ava,lianjunwei,MRgenial,geek-ken,ttfont

## 成为贡献者

我们欢迎每一位贡献者的加入ShenYu，欢迎贡献者以Apache Way的精神参与ShenYu！

贡献者指南请参考：

“

https://shenyu.apache.org/zh/community/contributor-guide