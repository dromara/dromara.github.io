---
title: RuoYi-Cloud-Plus 发布 2.1.2 版本 2023 最后一版
author: 疯狂的狮子Li
date: 2023-12-27
cover: /assets/img/news/RuoYi-Cloud-Plus-2.1.2-0.png
head:
  - - meta
    - name: 新闻
---

# 更新日志

### 依赖升级

- update springboot 3.1.5 => 3.1.7
- update springboot 2.7.17 => 2.7.18(扩展服务升级到 boot2 最终版本)
- update mybatis-boot 3.0.2 => 3.0.3 优化依赖传递
- update powerjob 4.3.3 => 4.3.6
- update easyexcel 3.3.2 => 3.3.3
- update transmittable-thread-local 2.14.2 => 2.14.4
- update justauth 1.16.5 => 1.16.6
- update redisson 3.24.1 => 3.24.3 修复订阅重启连接超时问题
- update easy-es 1.1.1 => 2.0.0-beta4

### 功能更新

- update 优化 oss 远程调用 支持降级处理
- update 优化 丰富 RedisUtils 对 List Set 类型的操作
- update 优化 为 admin 模块 单独增加 ratelimiter 模块
- update 优化 验证码接口 增加限流配置
- update 优化 excel 合并注解会根据第一合并列的结果来决定后续的列合并 (感谢 Simple)
- update 优化 SocialUtils 代码
- update 优化 删除无用异常类
- update 优化 补全三方登录校验国际化
- update 优化 sms 组件 预留自动配置类
- update 更新 关于数据库的说明
- update 优化 sms 组件 预留自动配置类
- update 优化 将 OSS 配置 改为全局模式 降低使用难度 保留 sql 便于用户自行扩展(常规项目用不上配置分多租户)
- update 优化 细化 oss 配置管理权限控制
- update 优化 开启 redisson 脚本缓存 减少网络传输
- update 优化 删除 hikaricp 官方不推荐使用的配置 jdbc4 协议自带校验方法
- update 优化 减少 PlusSaTokenDao 不必要的查询优化性能
- update 优化 更新用户异常提示 使用登录账号
- update 优化 使用登录用户判断是否登录 提高效率
- update 优化 重构 LoginHelper 将本地存储代码操作封装
- update 优化 getTenantId 判断是否开启多租户
- update 优化 Dockerfile 使用 shell 模式 支持环境变量传入 jvm 参数
- update 优化 WebSocketUtils 连接关闭改为警告
- update 优化 excel 多 sheet 页导出 (感谢 May)
- update 优化 删除无用接口实现
- update 优化 jvm 参数调整 全面启用 zgc
- update 优化 使用动态租户重构业务对租户的逻辑
- update 优化 TenantHelper 动态租户支持函数式方法
- update 优化 支持多租户绑定相同的三方登录
- update 优化 更新用户登录信息方法忽略数据权限
- update 优化 补全三方绑定时间字段 删除无用 excel 注解
- update 优化 将登录记录抽取到监听器统一处理
- update 优化 登录消息推送异常拦截(未启动 resource 也不耽误用)
- update 优化 租户插件 ignoreTable 方法支持动态租户

### 新增功能

- add 新增 RedisUtils.setObjectIfExists 如果存在则设置方法
- add 新增 丰富 RedisUtils 对 List Set 类型的操作
- add 新增 翻译组件 用户昵称翻译实现
- add 新增 响应加密功能 支持注解强制加密接口数据 (感谢 MichelleChung)
- add 新增 common-ratelimiter 限流模块 用于自定义业务限流 与 sentinel 不冲突

### 问题修复

- fix 修复 stream-mq 测试服务未导入租户模块 导致鉴权不一致问题
- fix 修复 使用 zgc 导致 seata 报错(未知原因 将 alibaba 组件全还原)
- fix 修复 sentinel 镜像添加了多余接口参数
- fix 修复 注册接口获取开关未在租户范围内问题
- fix 修复 seata-server logback 版本冲突问题
- fix 修复 selectDictTypeByType 查询方法错误问题
- fix 修复 一些不正常类无法加载报错问题
- fix 修复 powerjob sql 脚本针对其他数据库转义符问题 (感谢 branches)
- fix 修复 MybatisSystemException 空指针问题
- fix 修复 excel 合并注解会根据第一合并列的结果来决定后续的列合并
- fix 修复 session 多账号共用覆盖问题 改为 tokenSession 独立存储
- fix 修复 token 失效后 登录获取用户 null 问题
- fix 修复 powerjob 部署方案 高版本 nginx 不生效问题
- fix 修复 OssFactory 并发多创建实例问题
- fix 修复 延迟队列在投递消息未到达时间的时候 服务死机导致重启收不到消息

### 前端改动

- update 优化 用户头像 img 变量无确定类型问题
- update 优化 细化 oss 配置管理权限控制
- update 优化 明确打包命令
- update 优化 代码中存在的警告
- update 优化 前端白名单页面放行逻辑
- update 优化 页面关于权限标识符说明
- fix 修复 append-to-body 编写错误 (感谢 Ai3\_刘小龙)
- fix 关闭动态路由 tab 页签时不清理组件缓存 (感谢 NickLuo)
- fix 删除重复环境变量 ElUploadInstance (感谢 棉花)
- fix 修复 在线用户 强推按钮点击取消控制台警告问题
- fix 修复 字典使用 default 样式报警告问题

## 框架文档

使用框架前请仔细阅读文档重点注意事项

参考文档: https://plus\-doc.dromara.org

## 加公开群

加微信备注加群

![](/assets/img/news/RuoYi-Vue-Plus-5.1.0-1.png)
