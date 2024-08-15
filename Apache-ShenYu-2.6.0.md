---
title: Apache ShenYu 2.6.0 Released！
author: 何凤恩
date: 2023-08-16
cover: /assets/img/news/Apache-ShenYu-2.6.0.jpg
head:
  - - meta
    - name: 新闻
---

## 关于 Apache ShenYu

`Apache ShenYu` 一款使用 `Java Reactor` 开发的响应式`API` 网关。以其高性能，动态灵活的流量管控，热插拔，易部署等特性，开箱即用为用户提供整套全生命周期的 `API`网关，包含 `API`注册、服务代理、协议转换、`API`文档与 `API`治理等功能。Apache ShenYu 于`2022年7月`毕业成为`Apache`顶级项目。

> 官网: https://shenyu.apache.org  
> GitHub: https://github.com/apache/shenyu

## 版本预览

时隔半年，`Apache ShenYu`发布了 2.6.0 版本，该版本共计提交了`280+个 Pull Request`,新增约`20+个新特性`，新增了若干增强，重构了若干功能，并且修复了若干个 bug。共计`78位`贡献者参与其中，累计贡献者达 350+位。

> 版本记录：https://github.com/apache/shenyu/compare/v2.5.1…v2.6.0

### 新特性

1.支持插件上传功能，支持网关热加载插件

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4392

2.支持使用 Apollo 作为数据同步和注册中心

```
sheneyu:
  sync:
    apollo:
      appId: shenyu
      meta: http://localhost:8080
      env: dev
      clusterName: test
      namespace: application
```

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4532

3.支持 springboot client 在 shenyu client 中动态配置

4.添加 TCP 插件

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/tcp-plugin
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4607
>
> https://github.com/apache/shenyu/pull/4766

![](/assets/img/news/Apache-ShenYu-2.6.0-1.png)
![](/assets/img/news/Apache-ShenYu-2.6.0-2.png)

5.支持 springmvn(boot)在 shenyu client 中收集 api-meta data

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4600

6.添加 shenyu ingress controller 的支持

> 具体使用请查看：https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/build-deploy
>
> https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4620
>
> 配置如下：
>
> ```
> shenyu:
>   netty:
>     http:
>       sni:
>         enabled: true
>         mod: k8s #k8s模式适用
>         defaultK8sSecretNamespace: shenyu-ingress #默认secret资源的namespace
>         defaultK8sSecretName: default-cert #默认secret资源名字
> ```

7.添加 zookeeper,naocs,apollo,HttpLongPolling,consul 作为 shenyu 服务发现

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4636
>
> https://github.com/apache/shenyu/pull/4657
>
> https://github.com/apache/shenyu/pull/4802
>
> https://github.com/apache/shenyu/pull/4795
>
> https://github.com/apache/shenyu/pull/4800
>
> https://github.com/apache/shenyu/issues/4562

8.添加华为云 lts 日志收集

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4812

9.添加 opengauss 数据库支持

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4856

10.添加 polaris 作为 shenyu 的数据同步和注册中心

```
shenyu:
  sync:
    polaris:
      url: 127.0.0.1:8093
      namespace:
      fileGroup:
```

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4410
>
> https://github.com/apache/shenyu/pull/4897

11.添加 shenyu 匹配缓存

```
shenyu:
  selectorMatchCache:
    ## selector L1 cache
    cache:
      enabled: false
      initialCapacity: 10000 # initial capacity in cache
      maximumSize: 10000 # max size in cache
    ## selector L2 cache, use trie as L2 cache
    trie:
      enabled: false
      cacheSize: 128 # the number of plug-ins
      matchMode: antPathMatch
  ruleMatchCache:
    ## rule L1 cache
    cache:
      enabled: true
      initialCapacity: 10000 # initial capacity in cache
      maximumSize: 65536 # max size in cache
    ## rule L2 cache, use trie as L2 cache
    trie:
      enabled: false
      cacheSize: 1024 # the number of selectors
      matchMode: antPathMatch
```

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/user-guide/property-config/client-property-config
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4417
>
> https://github.com/apache/shenyu/pull/4536

12.新增 shenyu admin 对 prometheus 的支持

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4336

13.暴露 shenyu actuator 端点

> 说明：可通过 pr 查看 shenyu 网关的内存数据
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4637
>
> 如何关闭请查看 actuator 配置：
>
> ```
> management:
>   endpoints:
>     web:
>       exposure:
>         include: "*" # or health,info
> ```

## 增强

1.对 API doc client 增加 tags 属性

> 具体使用请查看：https://shenyu.apache.org/docs/user-guide/api-doc/shenyu-annotation-apidoc
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4362

2.添加 Brpc 的集成测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4319

3.Brpc 支持共享线程池

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4402

4.为加密插件(cryptorRequst 和 cryptorResponse)增加映射类型

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4418

5.加密插件支持多个个字段加密

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4435

6.添加 p2c 负载均衡算法

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4451

7.使用 base64 生成插件字符串，并存储到插件数据中

> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/developer/custom-plugin
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4473

8.添加最短响应负载均衡算法

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4488

9.添加 hash 负载均衡测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4383

10.添加`DetailSerivice`测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4450

11.提供宽泛的路径策略

> 具体配置如下：
>
> ```
> shenyu:
>     switchConfig:
>        local: true
>        collapseSlashes: false #true表示开启宽泛路径支持
> ```
>
> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4522

12.添加 shenyu-common 的 enums 包测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4541

13.添加 shenyu-common 的 dto 包测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4549/

14.添加 Add shenyu-admin 的 model 包测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/issues/4540

15.添加 shenyu match cache 测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4557

16.支持 k8s 探针

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4567

17.添加 shenyu-admin 的 service 包测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4579

18.在 API 文档中添加 json 支持

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4591

19.mock 插件的 SPEL 默认为安全的

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4606

20.添加`ShenyuClientApiDocExecutorSubscriber`的测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4632

21.为 shenyu-client-sofa 模块添加测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4688

22.为`shenyu api doc`添加`tag relation`

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4362

23.添加 windows 下的启动、停止脚本

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4673

24.添加`ShenyuSdkClientFactory`的测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4645

25.添加 shenyu e2e springcloud plugin 的 websocket 同步支持

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4698

26.支持 divide 插件自动下线

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4702

27.添加 springcloud service instance 缓存

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4705
>
> 具体使用请查看：https://shenyu.apache.org/zh/docs/next/plugin-center/proxy/spring-cloud-plugin
>
> ```
> shenyu:
>     springCloudCache:
>        enabled: false # 为true是开启springcloud缓存
> ```

28.更改密码支持 i18n

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4758

29.shenyu discovery 支持 websocket 同步

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4768

30.升级`springboot`版本到`2.7.13`

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4783

31.为 e2e-springcloud 添加 nacos，zookeeper 同步测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4747

32.添加`api doc client`注解生成属性

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4845

33.支持`zookeeper`客户端自动下线

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4806

34.支持`Apollo client`自动下线

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4855

35.支持 swagger 文档，并将文档存储到数据库

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4849

36.支持`nacos client`自动下线

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4890

37.添加 alibaba dubbo e2e 测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4859

38.添加 apache dubbo e2e 测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4899

39.添加 shenyu spring sdk 测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4913

40.添加 sofa e2e 测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4919

41.添加 Apollo 数据同步的测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4918

42.添加数据库的连接池配置(hakari)

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4938

43.为 shenyu 添加`idea icon`

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4951

## 重构

1.重构 shenyu admin

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4355

2.优化 least active balance 算法

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4342

3.优化 shenyu sign 插件的第一个版本的兼容性

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4332
>
> 具体使用请查看：https://shenyu.apache.org/docs/plugin-center/security/sign-plugin

4.优化 shenyu upstream check 逻辑

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4386

5.优化项目的全局版本

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4394

6.优化`ShenyuConsulConfigWatch`的代码

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4400

7.优化 shenyu 前缀树匹配逻辑

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4414

8.优化 rule condition 提交时的校验

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4403

9.优化 shenyu-client-websocket 的客户端注册代码

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4462

10.添加 shenyu admin 依赖 Micrometer 的许可证

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4409

11.更新 maven-assembly-plugin 打包插件到 3.5.0 版本

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4673

12.优化全局插件的排序

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4429

13.在 shenyu admin 中使用 BearerToken 替代 StatelessToken

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4516

14.重构 shenyu-logging 模块

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4526

15.对 api doc 支持校验

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4564

16.优化 shenyu 前缀树，并支持`*`匹配

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4569

17.优化插件的热加载

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4392

18.优化`ShenyuWebHandler`的 putPlugin 方法

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4598

19.重构 Shenyu webfilter

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4614

20.重构 oauth2 plguin 插件

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4624

21.重构 shenyu 选择器的 continued 字段

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4635

22.重构 shenyu 选择和规则的匹配缓存

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4578

23.删除了 shenyu 客户端中未使用的泛型

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4653

24.重构 shenyu 对 sentinel 插件的支持

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4669

25.将缓存数据通过 actuator 端点暴露

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4637
>
> https://github.com/apache/shenyu/pull/4658

26.重构`checkUserPassword`方法，启动时不打印已知错误日志

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4697

27.添加打印日志的参数

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4637

28.重构 shenyu 全局异常处理

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4709

29.添加了 shenyu 插件上传的集成测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4679

30.优化语法糖

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4700

31.优化 discovery_upstream 的 discovery_handler_id 字段

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4710

32.重构 shenyu-plugin 模块，将 proxy 插件分类归档

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4765

33.重构`AlibabaDubboConfigCache`的缓存

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4772

34.移除 hutool 的依赖

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4773

35.重构`ShenyuClientShutdownHook`

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4780

36.Extractor 添加 BaseAnnotationApiBeansExtractor

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4787

37.支持多客户端注册

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4790

38.重构 Shenyu-e2e 支持 Shenyu 的 check style

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4799

39.优化 shenyu 客户端注册逻辑

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4809

40.添加 shenyu divide 插件的域名测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4803

41.更新 rpc_ext 字段的扩展

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4821

42.优化 consul 的连接操作

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4832

43.重构 shenyu e2e 的 springcloud 的 yaml 添加方式

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4837

44.为 k8s ingress controller 添加集成测试

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4820

45.拆分 apidoc 明细接口的 document 字段，增加 requestHeaders、responseParameters 等字段

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4865

46.加 swagger 示例项目，测试 API 文档的相关功能

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4825

47.优化 shenyu admin 的 json 格式表单字段的显示

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4873

48.重构 shenyu 日志可观测性

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4874

49.添加 bootstrap 启动日志

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4879

50.重构 swagger 的 api 文档

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4892

51.升级 grpc 版本至 1.53.0

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4841

52.重构 api 元数据处理函数

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4948

53.优化代码和 pom 依赖

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4945

## Bug 修复

1.优化 h2 的路径

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4351

2.修复加密响应插件的调用错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4331

3.修复 jdk8 Map computeIfAbsent 性能 bug

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4338

4.修复 zombieRemovalTimes 代码

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4368

5.修复升级后的 sql 错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4374

6.删除 detectorOfflineLinks 标签

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4382

7.忽略扁平化的 pom

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4390

8.修复 LOG 调用方法

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4387

9.使用 nacos 修复 sheyu-example-springcloud 的 NPE

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4396

10.修复 Shenyu-admin 名称的类型争论

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4340

11.修复负载平衡 spi 资源

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4411

12.修复 sql 脚本错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4412

13.修复 jackson 的 24 小时格式和时区

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4413

14.修复 JwtUtils 错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4420

15.修复 dubbo 调用者缓存 bug

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4433

16.修复丢失 HOST 的删除操作

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4425

17.修复 SpringMvcClientEventListener 测试用例

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4252

18.修复 zombie 更新 PENDING_SYNC 的错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4430

19.修复 windlfu 的内存泄漏

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4486

20.修复因规则过多导致规则查询失败的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4499

21.修复示例 http 中缺少执行器依赖项和端口错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4506

22.修复 UpstreamCheckUtils 的 http 和 https 错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4509

23.修复 FileFilter 造成内存泄漏的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4507

24.修复 zookeeper 同步错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4906

25.修复 MemorySafeWindowTinyLFUMap 内存泄漏错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4524

26.修复 ApiDoc 路径缺少分隔符的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4528

27.修复 shenyu trie 的 NPE

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4533

28.修复插件跳过错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4589

29.修复 oracle sql 错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4595

30.修复 shenyu admin 中无法加载 shenyu 图标的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4605

31.修复 hystrix fallback 的 bug

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4593

32.修复 divide 和 springcloud 的预热时间

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4619

33.修复 springcloud 服务选择器

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4639

34.修复 shenyu-spring-boot-starter-plugin-mock 添加 spring.factories

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4644

35.修复 shenyu-client-mvc 和 shenyu-client-springcloud 丢失 ip

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4681

36.修复缓存中规则数据和选择器数据为空的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4716

37.修复 api 文档模块更新 api 详情错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4720

38.修复从 KafkaLogCollectClient 中的配置获取 topic

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4756

39.修复 loggingConsole 插件的线程安全问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4763

40.修复 brpc 集成测试响应大小

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4784

41.修复 plugn-dubbo-common 的选择器更新灰色发布删除缓存的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4762

42.修复 shenyu admin 菜单名称 bug

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4805

43.修复 shenyu admin 无法配置 consul 端口的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4843

44.修复 shenyu 客户端元数据和 uri 无法与 apollo 同步到 admin 的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4851

45.修复 PathVariable 注解 url 无法匹配的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4852

46.修复 PathPattern 模式下无法更新 uri 的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4854

47.修复客户端关闭方法调用两次

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4867

48.修复 shenyu 错误处理 consul 配置

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4872

49.从 Request、modifyResponse 插件中删除未使用的配置

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4882

50.修复 http 注册元数据错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4889

51.修复 websocket 丢失用户自定义关闭状态的问题

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4844

52.修复 consul 寄存器在特殊符号时丢失元路径的属性

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4885

53.修复 etcd 同步错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4911

54.修复 shenyu admin 多次同步事件错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4941

55.修复 Shenyu motan 插件执行错误

> 具体 pr 请查看：https://github.com/apache/shenyu/pull/4934

## 贡献者

特别感谢以下贡献者对 `2.6.0`版本的支持和参与（排名不分先后）。

midnight2104,koonchen,847850277,balloon72,yu199195,iwangjie,damonxue,tian-pengfei,caojiajun,dragon-zhang,u3breeze,li-keguo,SuperMonkeyC,mahaitao617,tomsun28,moremind,liaolzy,Ceilzcx,misaya295,BoyuLi4,HaiqiQin,starlight2003,stulzq,ywj1352,yunlongn,aFlyBird0,dengliming,plutokaito,xuyicheng1995,lan-dian,sachin10fi,zuobiao-zhou, hudongdong129,crudboy,aoshiguchen,VampireAchao,JooKS-me,Redick01,huanccwang,lijay7674,omernaci,peng-heng,December-Pb,6freeair2016,jieyangxchen,lianjunwei,u3breeze,eurecalulu,wanyaoasiainfo,wanyaoasiainfo,Kakk22,xuziyang,menglujing,xcsnx,yu1183688986,lahmXu,fabian4,ileonli,VampireAchao,GOODBOY008,TeslaCN

## 成为贡献者

我们欢迎每一位贡献者的加入 ShenYu，欢迎贡献者以 Apache Way 的精神参与 ShenYu！

贡献者指南请参考：

> https://shenyu.apache.org/zh/community/contributor-guide
