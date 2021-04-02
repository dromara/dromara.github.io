---
title: Websocket Plugin
keywords: soul
description: websocket plugin
---

## Explanation

* Soul gateway also support proxy of websocket.
* In websocket support, divide plugin is used in it.

## Plugin Setting

* In `soul-admin` --> plugin management --> ` divide `, set to enable.
* Introducing dependencies in the pom.xml file of the gateway

```xml
<!--if you use http proxy start this-->
<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-plugin-divide</artifactId>
    <version>${last.version}</version>
</dependency>

<dependency>
    <groupId>org.dromara</groupId>
    <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
    <version>${last.version}</version>
</dependency>
```
## Request Path

* When using soul proxy websocket, its request path is (example):`ws://localhost:9195/?module=ws&method=/websocket&rpcType=websocket`.

```yaml
Detail:
1.localhost:8080 Is the IP and port started by soul.
2.module（Required）:Value is the key that matching selector.
3.method （Parameter）: Your websocket path is also used as a matching rule.
4.rpcType ：websocket must be filled in，and must be websocket
```

* Add a new configuration to the selector in the `divide` plugin, as follows

![](https://yu199195.github.io/images/soul/websocket-selector.png)


* Add a new rule in this selector:

![](https://yu199195.github.io/images/soul/websocket-rule.png)


* In summary, pay attention to your path at this time `ws://localhost:9195/?module=ws&method=/websocket&rpcType=websocket`.
  
  It will be matched by your new selector rule, and then the real websocket address of the proxy is:`127.0.0.1:8080/websocket`,so that soul can proxy websocket.
  
  You can communicate with websocket service, it is actually very simple.
  
* I would like to add just one last word that you can decide the name and value of module and method by yourself as long as the selector and the rule can match, this is just an example,
