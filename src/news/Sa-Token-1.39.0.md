---
title: Sa-Token v1.39.0 update, greatly refactoring the OAuth2 module
author: Sa-Token
date: 2024-09-02
cover: /assets/img/news/Sa-Token-1.39.0-0.png
head:
  - - meta
    - name: News
---

Sa-Token is a lightweight Java permission authentication framework, mainly to solve: login authentication, permission authentication, distributed Session session, single sign-on, OAuth2.0 and a series of permission-related issues.

The framework is adapted to common services such as kicking people offline, automatic renewal, separation of front and back office, and distributed sessions. Through Sa-Token, you can realize the authority authentication part of the system in a 1 simple way.

The Sa-Token v1.39.0 version update includes the following:

* • Core:

* Upgrade: Reconstruct the bottom layer of annotation authentication to support custom authentication annotations. **\[Important \]* *

* Fix: Fix the frame misreading phenomenon when the front end submits the namesep' Cookie.

* • Plug-in:

* • Fix: Fix the problem that the sa-token-quick-login plug-in cannot block normally.

* • SSO:

* Optimization: Optimize the front and back end of the sso-server to separate the demo code.

* • Optimization: Optimize the jump process when the front and back ends of the sso-server are separated.

* • OAuth2:

* • Refactoring: The sa-token-oauth2 module is refactored as a whole. **\[Important \]** **\[Not backward compatible \]* *

* • New: Added support for custom 'scope' processors. **\[Important \]* *

* • New: Added support for custom grant_type '. **\[Important \]* *

* • New: Added 'scope' classification. **\[Important \]* *

* • New: Added 'oidc' protocol support. **\[Important \]* *

* • New: Added support for the default 'openid' generation algorithm. **\[Important \]* *

* • New: Added 'OAuth2' annotation authentication support. **\[Important \]* *

* • Fix: Add rules for redirect_url parameter verification: @ characters are not allowed, and \* wildcards can only appear in the last 1. Associated issue **\[Important \]* *

* • Optimization: Optimize code comments and exception prompt information.

* • Upgrade: Compatible with scenarios where 'Http Basic' submits 'client' information. Thanks to github '@ CuiGeekYoung' for submitting pr.

* • Upgrade: Compatible with 'Bearer Token' way to submit 'access_token and 'client_token '.

* • Upgrade: Adapt split routing.

* • New: Change 'scope' field to List type.

* • Refactoring: Separate the 'SaOAuth2Strategy' global policy interface and define some algorithm policies for creating tokens.

* • New: Added the 'addAllowUrls' 'addContractScopes 'method to simplify the 'SaClientModel' build code.

* • Refactoring: Withdraw the 'SaOAuth2Dao' interface and be responsible for data persistence.

* • Refactoring: pulling out the 'SaOAuth2DataLoader' data loader interface.

* • Refactoring: pull out the 'SaOAuth2DataGenerate' data constructor interface.

* • Refactoring: Withdraw the 'SaOAuth2DataConverter' data converter interface.

* • Refactoring: pulling away the 'SaOAuth2DataResolver' data parser interface.

* • Refactoring: Refactoring 'SaOAuth2Handle' -> 'SaOAuth2ServerProcessor' for a more convenient logical rewrite.

* • Refactoring: Refactoring 'PastToken' -> 'LowerClientToken '.

* • New: adds a 'state' value verification. The same 'state' parameter cannot be used repeatedly.

* • Optimization: improve the 'SaOAuth2Util' related methods, more convenient secondary development.

* • New: Add some exception classes and subdivide the exception 'ClassType '.

* • Optimization: Optimize the 'sa-token-oauth2 Exception Subdivision Status Code.

* • Documentation:

* • New: Added data structure description.

* • New: Add different 'client' different logon page description.

* • Optimize: Optimize the document \[Put permission data in cache \] example.

* • New: Added migration examples from Shiro, SpringSecurity, and JWT. **\[Important \]* *
    

```
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.39.0</version>
</dependency>
```

#### Code Warehouse：https://gitee.com/dromara/sa-token

Frame function structure diagram

![](/assets/img/news/Sa-Token-1.39.0-0.png)

js

Recently discovered recorded Sa-Token-related videos:

【Microservice architecture design and actual combat】 https://www.bilibili.com/video/BV1nJWWeDEFN