---
title: Apache ShenYu 2.6.1 Released
author: Ho Fung Eun
date: 2024-01-24
tag:
  - 
cover: /assets/img/blog/ApacheShenYu-2.6.1-0.png
head:
  - - meta
    - name: Blog
---

## About Apache ShenYu

“

official website: https://shenyu.apache.org

GitHub: https://github.com/apache/shenyu

## Version Preview

“

Version Record：https://github.com/apache/shenyu/compare/v2.6.0...v2.6.1

### New features

1. Add Dubbo annotation metadata for shenyu ingress controller

“

Please see specific pr:

https://github.com/apache/shenyu/pull/5000

Please see specific documents:

https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config

2. Support plug-in life cycle

“

Please see specific pr:

https://github.com/apache/shenyu/pull/5031

3. Add shenyu-sdk-openfeign module

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5041

4. Add Motan and Spring Cloud Add ingress controller Support

5.shenyu support alarm function

![](/assets/img/blog/ApacheShenYu-2.6.1-0.png)

  

“

Please see specific pr:

https://github.com/apache/shenyu/pull/4782

Please see specific documents:

https://shenyu.apache.org/zh/docs/next/developer/notice-alert

6.shenyu client adds the discovery registry.
“

Please see specific pr:

https://github.com/apache/shenyu/pull/5153

7. Add the shenyu context-path Ingress controller.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5167

8. Add shenyu grpc Ingress controller

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5240

9. Add shenyu sofa Ingress controller

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5253

10. Add nacos, etcd, eureka as shenyu discovery service registry

![](/assets/img/blog/ApacheShenYu-2.6.1-1.png)

![](/assets/img/blog/ApacheShenYu-2.6.1-2.png)

  

  

“

Please see specific pr:

https://github.com/apache/shenyu/pull/5193

11. Add a new plug-in: basic-plugin

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5258

12. Add new plug-ins and integration tests: shenyu-rabbitmq-logging plugin.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5283

https://github.com/apache/shenyu/pull/5312

13. Binding selector through shenyu-discovery.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5261

### API Change

1. Reconstruct the data structure of shenyu data synchronization

  

![](/assets/img/blog/ApacheShenYu-2.6.1-3.png)

  

2.Use netty as the default httpclient

“

Please see specific pr:

https://github.com/apache/shenyu/pull/5200

3. Refactor the shenyu-admin-listener to support shenyu admin data synchronization

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5294

https://github.com/apache/shenyu/pull/5347

4. delete shenyu's support for brpc, including brpc plug-in, brpc example, brpc integration test

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5305

https://github.com/apache/shenyu/pull/5358

5. Remove Apollo dependencies to support Java 17 (add dependencies yourself)

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5308

Please see specific documents:

https://shenyu.apache.org/docs/next/user-guide/property-config/use-data-sync/#apollo-synchronization-config

6. Remove shenyu's middleware register center.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5352

### Enhanced

1. Add unit tests for shenyu model event.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4965

2. Add shenyu admin test case

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4971

https://github.com/apache/shenyu/pull/5231

https://github.com/apache/shenyu/pull/5263

3. Add end-to-end test cases for motan.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4957

4. Support motan plugin selection protocol

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5003

5. Add end-to-end test cases for Grpc.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4966

6. Upgrade apache-rat-plugin version to 0.15

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5029

7. Address isBlank conditions match when matching.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4983

8.Clickhouse supports ttl fields.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5032

9. Support HttpUtils log level judgment

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4976

10. Add unit tests for Ingress Reconciler.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5051

https://github.com/apache/shenyu/pull/5169

11. Automatically checksum when the package is distributed.

"

Specific pr' please view:

https://github.com/apache/shenyu/pull/5049

12. Zero copy is implemented in the tcp plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5066

13.shenyu-client-springmvc supports the default appname and context-path.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5050

14. Add sdk-feign examples and integration tests.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5099

15.es log plug-in supports user-defined indexes

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5102

16. Enhanced grpc plug-in supports shenyu-loadbalancer load balancing algorithms.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5115

17. Downstream services that support the http2 protocol.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5125

18. Refactoring the enhanced dubbo plug-in supports shenyu-loadbalancer load balancing algorithms.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5131

19. Add ingress controller springcloud integration tests.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5139

20. Add the ability to WebSocket the plug-in agent ping.

“

Please see specific pr:

https://github.com/apache/shenyu/pull/5144

21. Add ingress controller websocket integration tests.

22.Rewrite plug-ins support rewriting by percentage.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5119

23.Admin initializes the discovery server with discovery config.

"

Please check the specific:

https://github.com/apache/shenyu/pull/5174

24.Divide plug-in adapts shenyu discovery.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5185

25.Alert supports multiple admin clusters.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5197

26.WebSocket plug-in adapts to the shenyu discovery.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5202

27. Register the service instance to the shenyu discovery.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5170

28.ShenYu Admin adapts to the local mode of the shenyu-discovery

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5176

29. Add the test case of shenyu sdk core.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5267

https://github.com/apache/shenyu/pull/5270

30. Add shenyu-discovery test cases.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5285

https://github.com/apache/shenyu/pull/5289

https://github.com/apache/shenyu/pull/5291

https://github.com/apache/shenyu/pull/5297

https://github.com/apache/shenyu/pull/5310

31. Add the opengauss e2e test.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5309

32. Add a limit on the size of the upload plug-in package.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5316

33. Add shenyu-client-websocket test cases.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5322

34. Upgrade shiro to secure version (1.18.0)

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5334

35. Upgrade the SpringBoot version to 2.7.17 and update the license.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5356

36. Send a notification to the shenyu-alert when adding a gateway exception.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5382

37. Add EurekaDiscoveryService unit tests.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5390

### Refactoring

1. Refactoring version 2.6.1 (pom.xml)

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4995

2. Use the computeIfAbsent to refactor the operation of the Map.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4997

3. Refactor polaris test cases.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4986

4. Migrate Maven Wrapper to official image

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5011

5. Pattern compiled in WebClientMessageWriter.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5026

6. Refactor the HttpUtils request method.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5027

7. Upgrade github action version and refactor ci

“

Please see specific pr:

https://github.com/apache/shenyu/pull/4992

https://github.com/apache/shenyu/pull/5039

https://github.com/apache/shenyu/pull/5081

8. Refactor the abstract template method for data synchronization.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5001

9. Refactor the MenuProject, MenuModule, and MenuDocItem as VO objects.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5062

10. Unified dubbo version

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5083

11. Refactor the directory of the HttpClient.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5107

12. Refactoring the github action ci cache

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5096

13. Refactoring the motan plug-in supports pojo objects as method parameters.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5112

14. Upgrade kafka-client version to 3.4.0

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5122

15. Migrate the admin swagger springfox to the springdoc.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5113

16. Upgrade dubbo version to 3.2.5 and refactor the expired method.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5120

17. Refactor AbstractShenyuSdkClient getOrDefault methods.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5173

18. Refactor the parameters of the HttpClient.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5151

19. Refactor the implementation of the webclient plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5196

20. Upgrade guava version to 32.0.0-jre

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5137

21. Support k8s as a test environment for e2e.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5217

https://github.com/apache/shenyu/pull/5298

22. Use the Restapi as the request path map for the rest api.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5222

23. Use StringBuilder as a string connector.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5074

24. Set the netty allocator parameter to unpooled.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5244

25. Refactor the started banner.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5329

https://github.com/apache/shenyu/pull/5339

26. Remove duplicate code and make part of the code public.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5336

27. The method of reconstructing null.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5345

28. Refactor the selector processor of the log plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5357

https://github.com/apache/shenyu/pull/5367

29. Refactor the custom plug-in class loader.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5368

30. Refactoring the log plug-in supports plug-in-level sampling ratios.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5385

31. Refactor Context-path to avoid repeated registration (using selector for update)

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5387

https://github.com/apache/shenyu/pull/5386

### Problem fix

1. Avoid the permanent overhead of creating TimeoutException.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4973

2. Fix the main class path of the sample module.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/497

3. Fix plug-in sorting problem

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4999

4. Fix Makefile Snapshot version issues

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4996

5. Fix RELEASE-NOTES.md spelling errors

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4991

6. Fix the wrong package name in the example.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5007

7. Fix password validation rules and add# and. the support

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4977

8. Repair the zookeeper in e2e: 3.8.0 health check.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5008

9. Fix the unstable ci test.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5017

10. Add the e2e WaitForHelper exception log

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5023

11. Fix springcloud in some registry middleware can not get scheme.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5014

12. Fix javadoc compilation errors.

13. Fix the wrong request type in the HttpUtils.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4975

14. The user id was not updated when the auth was fixed.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/4982

15. Fix the eventloop thread leak of the TCP plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5048

16. Format the quickstart in the shenyu-integrated-test.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5065

17. Fix SQL script errors.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5086

https://github.com/apache/shenyu/pull/5037

https://github.com/apache/shenyu/pull/5184

https://github.com/apache/shenyu/pull/5234

https://github.com/apache/shenyu/pull/5368

18. Fix the uri plug-in path error and use rawpath instead of path.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5121

https://github.com/apache/shenyu/pull/5128

19. Fix websocket plug-in support for rewrite plug-ins.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5130

20. The repair ElasticSearchLog Plugin index name is invalid.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5158

21. Fix context-path plug-in errors.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5159

22. Fix the high cpu usage of the shenyu-admin.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5168

https://github.com/apache/shenyu/pull/5164

23. Fix the formatting problem LocalDateTime in alert.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5180

24. Fix the shenyu-client apiDoc error retry problem.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5171

25. The initialization sequence of the repair applicationContextAware is too late.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5195

26. Fix duplicate response header.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5190

27. Set the maximum waiting time for k8s.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5220

28. Modify the status field type of the clickhouse log plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5230

29. Fix the memory leak that may be caused by the response write plugin.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5228

30. Fix the dataType field selection error.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5237

31. Fix http data synchronization errors.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5239

32. Fix word spelling mistakes

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5251

33. Repair the registration status of the shenyu dubbo agent plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5243

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5266

35. Fix the shenyu-registry eureka registration error logic.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5269

36. Fix AbstractLogPluginDataHandler hashcode errors.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5280

37. Fix the key error of the ratelimit plug-in in cluster mode.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5286

38. Fix the error of duplicate registration context-path for multiple shenyu-client of the same application.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5320

39. Fix does not reload the plug-in after the plug-in is closed.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5338

40. Fix the shenyu admin upload plug-in error.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5342

41. Repair shenyu cannot load resources in the resource directory.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5372

42. Fix Admin to show dictionary values.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5375

43. Fix conflicts Authorization in the sign plug-in.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5381

44. Fix the context of the signature plug-in-path path match error.

"

Please see specific pr:

https://github.com/apache/shenyu/pull/5379

## Contributors

TeslaCN,GOODBOY008,moremind,devinsong77,runqi-zhao,JooKS-me,kerwin612,li-keguo,yeshadoo,yu199195,DamonXue,liusishan,HaiqiQin,coderDylan,dragon-zhang,haolinkong,mxyyyy,misaya295,kerwin612,ywj1352,dengliming,impactCn,yunlongn,tanpenggood,xcsnx,xuziyang,ShawnJim,cubxxw,tomsun28,wenlongbrother,VampireAchao,wenpanwenpan,Ceilzcx,847850277,realize096,crudboy,tian-pengfei,0xmkzt,whenelse,lahmXu,wang3820,jbampton,eurecalulu,yudayday,YxYL6125,CytFree,GNK48-Ava,lianjunwei,MRgenial,geek-ken,ttfont

## Become a Contributor

We welcome every 1 contributors to ShenYu, and we welcome contributors to ShenYu in the spirit of Apache Way!

For the contributor guide, please refer:

“

https://shenyu.apache.org/zh/community/contributor-guide