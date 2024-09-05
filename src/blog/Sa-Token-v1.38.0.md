---
title: Sa-Token v1.38.0 Release, heavily refactor SSO modules
author: click33
date: 2024-05-13
tag:
  - 
cover: /assets/img/blog/Sa-Token-v1.38.0-0.png
head:
  - - meta
    - name: Blog
---

Sa-Token is a lightweight Java permission authentication framework, mainly to solve: login authentication, permission authentication, distributed Session session, single sign-on, OAuth2.0 and a series of permission-related issues.

The framework is adapted to common services such as kicking people offline, automatic renewal, separation of front and back office, and distributed sessions. Through Sa-Token, you can realize the authority authentication part of the system in a 1 simple way.

The Sa-Token v1.38.0 release update includes the following:

* • sa-token-core:

* • Fix: Fix the bug of creating invalid 'SaSession' when the 'StpUtil.getSessionByLoginId(xx)'parameter is null.

* • Optimization: In the 'SpringBoot 3.x' version, you will be prompted that the dependency has failed to start. (Thanks to 'Uncarbon' for submitting pr)

* • Optimization: further optimize the permission verification algorithm, hasXxx API will only return true or false, no longer throw exceptions.

* • Refactoring: 'InvalidContextException' is renamed to 'SaTokenContextException '. **\[Backward compatibility processing done \]* *

* • Refactoring: Completely remove the 'getCode()'method in the 'NotPermissionException' exception. **\[Outdated API Cleanup \]* *

* • Refactoring: Refactoring the 'SaTokenException' class methods 'throwBy-'\>'notTrue', 'throwByNull-'\>'notEmpty '. \*\*\[Backward compatibility processing has been done \]\*\*

* • Refactoring: If the 'SessionId' provided by 'StpUtil.getSessionBySessionId' is empty, an exception will be thrown directly instead of returning null. \*\*\[not backward compatible \]\*\*

* • New: Add 'Http Digest' authentication module for simple implementation. **\[Important \]* *

* • Refactoring: Change the 'HttpBasic' authentication module package name. **\[Backward compatibility processing done \]* *

* • New: The 'StpUtil.getLoginDeviceByToken(xxx)'method is added to obtain the login device type of any token.

* • New: New' StpUtil.getTokenLastActiveTime()'method is added to obtain the last active time of the current token.

* • Fix: Fix the problem of "When the specified timeout is less than the global timeout at login, the'Account-Session is valid for the global timeout.

* • Optimization: When getting 'Token-Session for the first time, its validity period will remain the same as the token validity period instead of the global timeout value.

* • Remove: Remove the 'isCheckNonce' configuration item of 'SaSignConfig. **\[Not backwards compatible \]* *

* • New: 'SaSignTemplate#checkRequest' adds the function of "You can specify participating signature parameters.

* • Refactoring: Set some encryption algorithms to expire.

* • Refactoring: Optimize the token read strategy, an empty string will be treated as no token has been committed.

* • Fix: 'sa-token-bom' complements missing dependencies.

* • Optimization: Login authentication verification must be passed before level 2 authentication verification.

* Fix: Fix the bug that cannot return the value correctly when null is passed in' StpUtil.getLoginId(T defaultValue).

* • sa-token-sso:

* • Optimization: SSO mode 3, API call signature verification, limited to participate in the signature of the parameter list, more secure.

* New: New' autoRenewTimeout' configuration item: Whether to automatically renew the validity period of token every time a ticket is issued (according to the global timeout value)

* • New: 'SaSsoConfig' adds the configuration 'isCheckSign' (whether to verify the parameter signature) to facilitate debugging during local development.

* • New: 'SaSsoConfig' adds the configuration 'currSsoLogin', which is used to forcibly specify the sso login address of the current system.

* • Refactoring: Refactoring the sa-token-sso module as a whole to split the code on the 'server' side and the 'client' side. **\[Important \]** **\[Not backward compatible \]* *

* • Added: 'SaSsoConfig' configuration item 'ssoLogoutCall' is renamed to 'currSsoLogoutCall '. \*\*\[Backward compatibility processing has been done \]\*\*

* • Refactoring: When the mode 3 checks the Ticket, it will also be forced to check the signature in order to call the request. \*\*\[not backward compatible \]\*\*

* • New: Add the 'maxRegClient' configuration item to control the number of clients registered in the mode 3.

* • New: Add a scheme with different 'secret-key' configurations for different SSO clients. **\[Important \]* *

* • Refactoring: The anonymous client will no longer be able to resolve all application tickets. \*\*\[not backward compatible \]\*\*

* • New: Added the 'homeRoute' configuration item: the route to be redirected by default without specifying redirect parameters after logon of '/sso/auth.

* • Optimization: Optimize the validity period of the login policy. When the SSO client side logs in, the remaining validity period of the session on the SSO server side will be extended.

* • New: Add the 'checkTicketAppendData' policy function, which is used to append the return information to the sso-client side after checking the ticket.

* • New: SSO chapter documents new suggestions for user data synchronization/migration scheme.

* • FIX: Fix a vulnerability where the @ character can bypass the domain name allow list check. **\[Vulnerability fix \]* *

* • Fix: Prohibit the "allow-url" configuration item \* symbol in the middle position, because this may cause verification to be bypassed. **\[Vulnerability fix \]* *

* • New plug-ins/examples:

* • New: Added plug-in sa-token-hutool-timed-cache to integrate the Hutool cache plug-in TimedCache. **\[Important \]* *

* • New: Added a simple example of SSM schema integration Sa-Token. **\[Important \]* *

* • New: Added Beetl integration Sa-Token simple example. **\[Important \]* *

* • Documentation:

* • Some chapters replace '@ Autowired' with more appropriate' @ PostConstruct'

* • Added filter execution order change example.

* • Other:

* • Optimization: Split the cross-domain processing demo into independent warehouses.

* • Optimization: Solve the problem that jsckson dependencies cannot be successfully started after springboot integration sa-token.

* • Optimization: Solve the problem of repeatedly setting keyt keys in the sa-token-jwt module. (Thanks to 'KonBAI' for submission of pr)

* Optimization: After the jwt mode token expires, the exception description thrown is that the token has expired, instead of the token is invalid.

* • Fix: Remedies missing listeners in the sa-token-spring-aop module.
  

```
<!-- Sa-Token 权限认证 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.38.0</version>
</dependency>
```

#### Code Warehouse：https://gitee.com/dromara/sa-token

Frame function structure diagram

![](/assets/img/blog/Sa-Token-v1.38.0-0.png)

Yesterday, I accidentally found a Sa-Token explanation video recorded by a user, with a total of 99 episodes. I was very careful!

[[SaToken Lecture] It's been 4202 years, and I haven't learned Sa-Token yet. It's a domestic lightweight Java permission framework. There is no more complicated spring security!] https://www.bilibili.com/video/BV1Zt421u7gk/

About Dromara

Dromara is an open source community composed of top open source project authors in China. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts involved experience the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/qrcode_zsxq.webp)