---
title: Logging Plugin
keywords: logging
description: logging plugin
---

## Explanation

* When making invokes to the target service, soul gateway also allows users to print the request information in the log that includes the request path, request method, request parameters, response header, response body ...etc.

## Plugin Setting

* In `soul-admin` --> plugin management --> `logging`, set to enable.
* Introduce `logging` support in the pox.xml file of the gateway.
* If the user don't use, please disable the plugin in the background.

```xml
   <!-- soul logging plugin start-->
    <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-logging</artifactId>
      <version>${last.version}</version>
    </dependency>
   <!-- soul logging plugin end-->
``` 

* Selectors and rules, please refer to: [selector](../selector-and-rule)。
* Only those matched requests can print the information about this request.
 
## Situation

* Users may want to view the information about request(including request headers, request parameters, response headers, response body...etc) where in the side of gateway when debugging during development or troubleshooting problems online.
