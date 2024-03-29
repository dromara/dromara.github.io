---
title: RuoYi-Vue-Plus 5.1.0 发布 客户端授权、三方授权、传输加密、sms4j、powerjob密集来袭
author: 疯狂的狮子Li
date: 2023-09-06
cover: /assets/img/news/RuoYi-Vue-Plus-5.1.0-cover.png
head:
  - - meta
    - name: 新闻
---

## 开发历程

- 2023 年 5 月 开始 5.1.0 计划 历经 1 个月的设计与讨论
- 2023 年 6 月 开始着手开发 历经 2 个多月的开发 特别感谢团队的小伙伴与一些热心的粉丝 参与功能开发与测试
- 2023 年 8 月 开始公测 历经将近 1 个月的公测与修复工作(期间成功支持多位使用者生产使用)
- 2023 年 9 月初 正式发布(经过多个小伙伴的生产实践 已基本可尝试生产使用)

> 关于 4.X 的说明 由于 SpringBoot2.X 与 vue2.X 均在 11 月底停止维护  
> 故而咱们 vue 版本 4.X 也无法再继续更新  
> 介于 4.X 的用户量特别庞大 功能也非常的稳定  
> 计划于 11 月底同 Boot2.X 一同停止更新但还会持续维护修复 bug(修复的形式为直接提交到 4.X 分支停止发版)

## 视频介绍

为了更好的让大家了解 5.1.0 作者录制了相关的视频 供大家快速了解上手

- 5.1.0 新功能与变更介绍: https://www.bilibili.com/video/BV1fj411y71X/
- 搭建与运行: https://www.bilibili.com/video/BV1Fg4y137JK/
- 生产环境搭建部署: https://www.bilibili.com/video/BV1mL411e7ha/

## 更新日志

### 重大更新

- \[重大更新\] 优化 相关代码 完成代码生成多数据源统一存储(感谢 WangBQ !pr349)
- \[不兼容更新\] 移除 原短信功能 集成更强大的 sms4j 短信工具包(感谢 友杰 !pr367)
- \[不兼容更新\] 对接 powerjob 实现分布式任务调度 删除原有 xxljob 原因为社区不更新功能太少只支持 mysql(感谢 yhan219 !pr359)
- \[重大更新\] 新增 三方授权绑定登录功能 基于 justauth 支持市面上大部分三方登录(感谢 三个三 !pr370)
- \[不兼容更新\] 新增 客户端授权功能 不需要更改任何代码即可完成多端动态对接(感谢 Michelle.Chung !pr379)
- \[重大更新\] 新增 前后端接口请求加密传输 基于 AES+RSA 动态高强度加密(感谢 wdhcr !pr377)
- \[重大更新\] 新增 三方授权登录 对接 maxkey 单点登录
- \[不兼容更新\] 优化 redis 序列化配置 更改为通用格式(升级需清除 redis 所有数据)

### 依赖升级

- update springboot 3.0.7 => 3.1.3
- update springboot-admin 3.1.3 => 3.1.5
- update springdoc 2.1.0 => 2.2.0
- update spring-mybatis 3.0.1 => 3.0.2
- update mybatis-plus 3.5.3.1 => 3.5.3.2
- update easyexcel 3.2.1 => 3.3.2
- update mapstruct-plus 1.2.3 => 1.3.5 解决修改实体类 idea 不编译问题
- update satoken 1.34.0 => 1.35.0.RC 优化过期配置 支持多端 token 自定义有效期
- update dynamic-ds 3.6.1 => 4.1.3 支持 SpringBoot3
- update sms4j 2.2.0
- update hutool 5.8.18 => 5.8.20
- update redisson 3.20.1 => 3.23.4
- update lock4j 2.2.4 => 2.2.5
- update aws-java-sdk-s3 1.12.400 => 1.12.540
- update maven-surefire-plugin 3.0.0 => 3.1.2

### 功能更新

- update 优化 excel 导出合并 在初始化类时进行数据的处理
- update 优化 简化 flatten 插件语法写法
- update 优化 支持本地虚拟域名调试(感谢 代星登 !pr363)
- update 重构 将框架内的 swagger 命名更改为 springdoc 命名避免误解
- update 重构 将系统内置配置放置到 common 包内独立加载 不允许用户随意修改
- update 优化 切换 maven 仓库到 华为云(aliyun 依赖不更新拉取不到)
- update 优化 升级 satoken 支持多端 token 自定义有效期功能
- update 优化 RepeatSubmitAspect 逻辑避免并发请求问题
- update 优化 在全局异常拦截器中增加两类异常处理
- update 优化 提供 powerjob 完整 sql 脚本 降低用户使用难度
- update 优化 StreamUtils 其他方法过滤 null 值(感谢 bleachtred !pr390)
- update 优化 powerjob 端口随着主应用端口飘逸 避免集群冲突
- update 优化 角色权限支持仅本人权限查看 解决无法查看自己创建的角色问题
- update 修改代码生成模版，日期范围统一采用 addDateRange 方法(感谢 LiuHao !pr397)
- update 优化 树表生成前端缺少 children 字段
- update 优化 CryptoFilter null 判断工具
- update 优化 websocket 路径与 cloud 版本保持一致
- update 优化 更新登录策略返回值(感谢 zlyx)
- update 修改代码生成模板，调整列表打开对话框和接口请求顺序
- update 优化 SaInterceptor 拦截器判断 token 客户端 id 是否有效(感谢 zlyx !pr402)
- update 优化 excel 导出字典默认转为下拉框
- update 优化 兼容 clientid 通过 param 传输
- update 优化 excel 导出字典转下拉框 无需标记 index 自动处理(感谢 一夏 coco)
- update 优化 简化线程池配置
- update 优化 屏蔽 powerjob 无用的心跳日志
- update 优化 适配 mysql 8.0.34 升级连接机制
- update 优化 加密实现 使用 EncryptUtils 统一处理
- update 优化 删除字典无用状态字段(基本用不上 禁用后还会导致回显问题)
- update 优化 部门与角色如果绑定了用户则不允许禁用
- update 优化 岗位如果绑定了用户则不允许禁用
- update 优化 用户管理 只查询未禁用的部门角色岗位数据
- update 优化 登录用户增加昵称返回
- update 优化 将部门管理 负责人选项改为下拉框选择(感谢 Lionel !pr410)
- update 优化 全局异常处理器 业务异常不输出具体堆栈信息 减少无用日志存储
- update 优化 登录用户缓存 去除冗余统一存储
- update 优化 放宽菜单权限 角色关联菜单无需管理员

### 新增功能

- add 增加 RedisUtils 批量删除 hash key 方法
- add 新增 Oss 上传 File 文件方法(感谢 jenn !pr362)
- add 增加 excel 导出下拉框功能
- add 新增 RedisUtils.setObjectIfAbsent 如果不存在则设置方法

### 修复问题

- fix 修复 脱敏注解标记位置错误
- fix 修复 OssClient 实例多租户相同 key 缓存覆盖问题
- fix 修复 关闭多租户 脱敏判断问题
- fix 修复 OssClient 切换服务 实例不正确问题(感谢 jenn !pr360)
- fix 修复 传参类型不正确导致 postgreSql 同步套餐报错问题
- fix 修复 参数类型修改 未修改校验注解
- fix 修复 登录校验错误次数未达到上限时 错误次数缓存未设置有效时间问题(感谢 konbai !pr366)
- fix 修复 common-core 包使用 aop 注解 但未添加 aop 实现类导致单独使用报错问题
- fix 修复 Mapper 多参数未加 @Param 注解问题
- fix 修复 邮箱登录 查询值错误问题
- fix 修复 用户篡改管理员角色标识符越权问题
- fix 修复 字典缓存注解使用错误问题
- fix 修复 查询部门下拉树未过滤数据权限问题
- fix 修复 CacheName 缓存 key 存储错误问题
- fix 修复 代码生成 前端添加或修改表单修改列生成问题
- fix 修复 新增角色使用内置管理员标识符问题
- fix 修复 代码生成 前端添加或修改表单修改列生成问题
- fix 修复 token 过期登出无法清理在线用户问题
- fix 修复 加密模块数据转换异常问题
- fix 修复 可能导致异常类无法反序列化问题
- fix 修复 代码生成 编辑按钮刷新列表问题
- fix 修复 客户端编辑时授权类型变更未保存的问题(感谢 David Wei !pr400)
- fix 修复 有界队列与优先队列 错误使用问题
- fix 修复 修复树模板父级编码变量错误
- fix 修复 部署部分系统出现乱码问题
- fix 修复 一级菜单无法显示问题
- fix 修复 可能会存在的越权行为(感谢 丶 Stone !pr416)
- fix 修复 代码生成页面参数缺少逗号问题

### 移除功能

- remove 移除原有短信功能(建议使用 sms4j)
- remove 移除 xxljob 功能(建议使用 powerjob)

## 框架文档

使用框架前请仔细阅读文档重点注意事项

参考文档: https://plus-doc.dromara.org

## 加公开群

加微信备注加群

![](/assets/img/news/RuoYi-Vue-Plus-5.1.0-1.png)
