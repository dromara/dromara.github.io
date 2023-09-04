---
title: Soul Gateway Learning (2) HTTP Client Access Source Code Parsing
author: fanjinpeng
date: 2021-01-18
tag:
  - Soul
cover: /assets/img/architecture/soul-framework.png
head:
  - - meta
    - name: Blog
---

# Logic Analysis of HTTP User Accessing to Soul Gateway

## 1. Registration portal

When the HTTP user accesses the Soul Gateway, it will call the soul-admin interface to register the interface that needs to be managed by the Soul Gateway. Let's see what we have done today.

First look at the interface information called as follows:

```java
// SpringMvcClientBeanPostProcessor.java
/**
 * Instantiates a new Soul client bean post processor.
 *
 * @param soulSpringMvcConfig the soul spring mvc config
 */
public SpringMvcClientBeanPostProcessor(final SoulSpringMvcConfig soulSpringMvcConfig) {
    ValidateUtils.validate(soulSpringMvcConfig);
    this.soulSpringMvcConfig = soulSpringMvcConfig;
    url = soulSpringMvcConfig.getAdminUrl() + "/soul-client/springmvc-register";
    executorService = new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>());
}
```

## 2. Spring mvc-register interface logic

Search "springmvc-register" globally and find the SoulClientController under the soul-admin module. See here. Are we familiar with those who often write CRUD? Ha-ha

```java
// SoulClientController.java
/**
 * Register spring mvc string.
 *
 * @param springMvcRegisterDTO the spring mvc register dto
 * @return the string
 */
@PostMapping("/springmvc-register")
public String registerSpringMvc(@RequestBody final SpringMvcRegisterDTO springMvcRegisterDTO) {
    return soulClientRegisterService.registerSpringMvc(springMvcRegisterDTO);
}
```

Service layer implementation class:

```java
// SoulClientRegisterServiceImpl.java
@Override
@Transactional
public String registerSpringMvc(final SpringMvcRegisterDTO dto) {
    if (dto.isRegisterMetaData()) {
        MetaDataDO exist = metaDataMapper.findByPath(dto.getPath());
        if (Objects.isNull(exist)) {
            saveSpringMvcMetaData(dto);
        }
    }
    String selectorId = handlerSpringMvcSelector(dto);
    handlerSpringMvcRule(selectorId, dto);
    return SoulResultMessage.SUCCESS;
}
```

Dto. IsRegister MetaData () is used to determine whether to register metadata information. I don't know when to use it, and I have doubts.//TODO, go down first.

### 2.1 Take a look at the method handlerSpringMvcSelector to handle the Selector.

```java
// SoulClientRegisterServiceImpl.java
private String handlerSpringMvcSelector(final SpringMvcRegisterDTO dto) {
    String contextPath = dto.getContext();
    // 根据 contextPath 到数据库里查询，是否已经注册过。
    SelectorDO selectorDO = selectorService.findByName(contextPath);
    String selectorId;
    String uri = String.join(":", dto.getHost(), String.valueOf(dto.getPort()));
    if (Objects.isNull(selectorDO)) {
        // 还没有注册过
        selectorId = registerSelector(contextPath, dto.getRpcType(), dto.getAppName(), uri);
    } else {
        // 已经注册过，业务系统重启了会到这里
        selectorId = selectorDO.getId();
        //update upstream
        String handle = selectorDO.getHandle();
        String handleAdd;
        DivideUpstream addDivideUpstream = buildDivideUpstream(uri);
        SelectorData selectorData = selectorService.buildByName(contextPath);
        if (StringUtils.isBlank(handle)) {
            handleAdd = GsonUtils.getInstance().toJson(Collections.singletonList(addDivideUpstream));
        } else {
            List<DivideUpstream> exist = GsonUtils.getInstance().fromList(handle, DivideUpstream.class);
            for (DivideUpstream upstream : exist) {
                if (upstream.getUpstreamUrl().equals(addDivideUpstream.getUpstreamUrl())) {
                    return selectorId;
                }
            }
            exist.add(addDivideUpstream);
            handleAdd = GsonUtils.getInstance().toJson(exist);
        }
        selectorDO.setHandle(handleAdd);
        selectorData.setHandle(handleAdd);
        // update db
        selectorMapper.updateSelective(selectorDO);
        // submit upstreamCheck
        upstreamCheckService.submit(contextPath, addDivideUpstream);
        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(selectorData)));
    }
    return selectorId;
}
```

#### 2.1.1 First Access to Soul Gateway

For the new access, the selectorDO cannot be found in the database. Enter the registerSelector method to carefully see which database tables have been inserted with data.

```java
// SoulClientRegisterServiceImpl.java
private String registerSelector(final String contextPath, final String rpcType, final String appName, final String uri) {
    SelectorDTO selectorDTO = SelectorDTO.builder()
            .name(contextPath)
            .type(SelectorTypeEnum.CUSTOM_FLOW.getCode())
            .matchMode(MatchModeEnum.AND.getCode())
            .enabled(Boolean.TRUE)
            .loged(Boolean.TRUE)
            .continued(Boolean.TRUE)
            .sort(1)
            .build();
    if (RpcTypeEnum.DUBBO.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.DUBBO.getName()));
    } else if (RpcTypeEnum.SPRING_CLOUD.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.SPRING_CLOUD.getName()));
        selectorDTO.setHandle(GsonUtils.getInstance().toJson(buildSpringCloudSelectorHandle(appName)));
    } else if (RpcTypeEnum.SOFA.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.SOFA.getName()));
        selectorDTO.setHandle(appName);
    } else if (RpcTypeEnum.TARS.getName().equals(rpcType)) {
        selectorDTO.setPluginId(getPluginId(PluginEnum.TARS.getName()));
        selectorDTO.setHandle(appName);
    } else {
        //is divide
        DivideUpstream divideUpstream = buildDivideUpstream(uri);
        String handler = GsonUtils.getInstance().toJson(Collections.singletonList(divideUpstream));
        selectorDTO.setHandle(handler);
        selectorDTO.setPluginId(getPluginId(PluginEnum.DIVIDE.getName()));
        upstreamCheckService.submit(selectorDTO.getName(), divideUpstream);
    }
    SelectorConditionDTO selectorConditionDTO = new SelectorConditionDTO();
    selectorConditionDTO.setParamType(ParamTypeEnum.URI.getName());
    selectorConditionDTO.setParamName("/");
    selectorConditionDTO.setOperator(OperatorEnum.MATCH.getAlias());
    selectorConditionDTO.setParamValue(contextPath + "/**");
    selectorDTO.setSelectorConditions(Collections.singletonList(selectorConditionDTO));
    return selectorService.register(selectorDTO);
}
```

Are you excited to see so many if else? You can think about how to optimize so many if else and PR ^-^.

Having written so much, it is nothing more than encapsulating the Selector DTO object, and finally calling the selectorS ervice. Register (Selector DTO) into the library, and continuing to follow.

```java
// SelectorServiceImpl.java
@Override
public String register(final SelectorDTO selectorDTO) {
    SelectorDO selectorDO = SelectorDO.buildSelectorDO(selectorDTO);
    List<SelectorConditionDTO> selectorConditionDTOs = selectorDTO.getSelectorConditions();
    if (StringUtils.isEmpty(selectorDTO.getId())) {
        selectorMapper.insertSelective(selectorDO);
        selectorConditionDTOs.forEach(selectorConditionDTO -> {
            selectorConditionDTO.setSelectorId(selectorDO.getId());
            // 这里在 for 循环里调用 dao 层插入数据，是不是可以考虑挪出去一次性批量插入？
            selectorConditionMapper.insertSelective(SelectorConditionDO
                    .buildSelectorConditionDO(selectorConditionDTO));
        });
    }
    publishEvent(selectorDO, selectorConditionDTOs);
    return selectorDO.getId();
}
```

You can see that there are two warehousing methods, which insert data into the selector and selector \_ condition tables respectively. Here we will not discuss the structure and business significance of the table in detail, and we will add it later.

The publishEvent method, which involves the ApplicationEventPublisher interface, is an implementation of the observer pattern. After the event is published, the subsequent operations are completed through the listener. Here, press No Table first, and then write an article for analysis.

#### 2.1.2 Soul Gateway has been accessed

Just like Inception, we go back two layers of dreams and go back to the other branch of inserting data. It can be imagined that the system that has been connected to the Soul gateway restarts, or the new node starts to go.

Post the previous code again:

```java
// SoulClientRegisterServiceImpl.java
private String handlerSpringMvcSelector(final SpringMvcRegisterDTO dto) {
    String contextPath = dto.getContext();
    // 根据 contextPath 到数据库里查询，是否已经注册过。
    SelectorDO selectorDO = selectorService.findByName(contextPath);
    String selectorId;
    String uri = String.join(":", dto.getHost(), String.valueOf(dto.getPort()));
    if (Objects.isNull(selectorDO)) {
        // 还没有注册过
        selectorId = registerSelector(contextPath, dto.getRpcType(), dto.getAppName(), uri);
    } else {
        // 已接入的业务系统重启，或新节点启动，会到这里
        selectorId = selectorDO.getId();
        //update upstream
        // handle 字段存储这个接口真实节点信息，可能存在多台机器需要负载均衡的场景
        String handle = selectorDO.getHandle();
        String handleAdd;
        DivideUpstream addDivideUpstream = buildDivideUpstream(uri);
        SelectorData selectorData = selectorService.buildByName(contextPath);
        if (StringUtils.isBlank(handle)) {
            // 这个接口虽然之前注册过，但第1个服务器节点接入 Soul 时会进来
            handleAdd = GsonUtils.getInstance().toJson(Collections.singletonList(addDivideUpstream));
        } else {
            // 如果已经至少有1个服务器节点已接入，会进到这里，判断是否是同一个节点（使用 upstreamUrl 区分），如果相同直接返回
            List<DivideUpstream> exist = GsonUtils.getInstance().fromList(handle, DivideUpstream.class);
            for (DivideUpstream upstream : exist) {
                if (upstream.getUpstreamUrl().equals(addDivideUpstream.getUpstreamUrl())) {
                    return selectorId;
                }
            }
            // 如果不是同一个节点，把新节点加入到 handle 字段中
            exist.add(addDivideUpstream);
            handleAdd = GsonUtils.getInstance().toJson(exist);
        }
        selectorDO.setHandle(handleAdd);
        selectorData.setHandle(handleAdd);
        // update db 更新数据库
        selectorMapper.updateSelective(selectorDO);
        // submit upstreamCheck
        upstreamCheckService.submit(contextPath, addDivideUpstream);
        // publish change event.
        eventPublisher.publishEvent(new DataChangedEvent(ConfigGroupEnum.SELECTOR, DataEventTypeEnum.UPDATE,
                Collections.singletonList(selectorData)));
    }
    return selectorId;
}
```

Because the database table structure design has not been studied, according to some known guesses, one selector corresponds to one divide plug-in, which is identified by contextPath (here is "/HTTP"), and one contextPath can deploy multiple server nodes. The node information is stored in the handle field as JSON.

```json
// handle/handleAdd 数据格式
[
  {
    "upstreamHost": "localhost",
    "protocol": "http://",
    "upstreamUrl": "10.0.0.12:8188",
    "weight": 50,
    "status": true,
    "timestamp": 0,
    "warmup": 0
  }
]
```

The next step is to update the database update Selective.

upstreamCheckService.submit(contextPath, addDivideUpstream); The real server node information is cached in a Map (UPSTREAM \_ MAP), and there are regular tasks to detect the activity. If the service node is found to be down, it will be eliminated to prevent the request from being sent to the node that has been down.

Then there is the eventPublisher. PublishEvent (), which, like the previous publishEvent method, publishes the event and completes the subsequent operations through the listener. Here, the message of data SelectorData modification is sent through the web socket long connection established with the Soul gateway. The Soul gateway modifies the data according to the message. What data is modified and how to modify it will be analyzed later.

At this point, the handlerSpringMvcSelector method is finally analyzed.

### 2.Let's take a look at the method handlerSpringMvcRule, which handles the Rule.

```java
// SoulClientRegisterServiceImpl.java
private void handlerSpringMvcRule(final String selectorId, final SpringMvcRegisterDTO dto) {
    RuleDO ruleDO = ruleMapper.findByName(dto.getRuleName());
    if (Objects.isNull(ruleDO)) {
        registerRule(selectorId, dto.getPath(), dto.getRpcType(), dto.getRuleName());
    }
}
```

First, take the name of the rule and go to the rule table to get the data. If the table name has been registered, there is no operation.

Look at the database data, which is the interface address under the business system.

```bash
mysql> use soul;
Database changed

mysql> select * from rule where name = '/http/order/findById' \G
*************************** 1. row ***************************
          id: 1349650371868782592
 selector_id: 1349650371302551552
  match_mode: 0
        name: /http/order/findById
     enabled: 1
       loged: 1
        sort: 1
      handle: {"loadBalance":"random","retry":0,"timeout":3000}
date_created: 2021-01-14 17:31:39
date_updated: 2021-01-14 17:31:39
1 row in set (0.00 sec)
```

If you don't get the data, register this rule.

```java
// SoulClientRegisterServiceImpl.java
private void registerRule(final String selectorId, final String path, final String rpcType, final String ruleName) {
    RuleHandle ruleHandle = RuleHandleFactory.ruleHandle(RpcTypeEnum.acquireByName(rpcType), path);
    RuleDTO ruleDTO = RuleDTO.builder()
            .selectorId(selectorId)
            .name(ruleName)
            .matchMode(MatchModeEnum.AND.getCode())
            .enabled(Boolean.TRUE)
            .loged(Boolean.TRUE)
            .sort(1)
            .handle(ruleHandle.toJson())
            .build();
    RuleConditionDTO ruleConditionDTO = RuleConditionDTO.builder()
            .paramType(ParamTypeEnum.URI.getName())
            .paramName("/")
            .paramValue(path)
            .build();
    if (path.indexOf("*") > 1) {
        ruleConditionDTO.setOperator(OperatorEnum.MATCH.getAlias());
    } else {
        ruleConditionDTO.setOperator(OperatorEnum.EQ.getAlias());
    }
    ruleDTO.setRuleConditions(Collections.singletonList(ruleConditionDTO));
    ruleService.register(ruleDTO);
}
```

In the first line, the corresponding RuleHandle is obtained according to rpcType ( "HTTP"). Here, three types are built in by default. Here, HTTP corresponds to DivideRuleHandle.

```java
// RuleHandleFactory.java
public final class RuleHandleFactory {

    /**
     * The RpcType to RuleHandle class map.
     */
    private static final Map<RpcTypeEnum, Class<? extends RuleHandle>> RPC_TYPE_TO_RULE_HANDLE_CLASS = new ConcurrentHashMap<>();

    /**
     * The default RuleHandle.
     */
    private static final Class<? extends RuleHandle> DEFAULT_RULE_HANDLE = SpringCloudRuleHandle.class;

    static {
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.HTTP, DivideRuleHandle.class);
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.DUBBO, DubboRuleHandle.class);
        RPC_TYPE_TO_RULE_HANDLE_CLASS.put(RpcTypeEnum.SOFA, SofaRuleHandle.class);
    }

    /**
     * Get a RuleHandle object with given rpc type and path.
     * @param rpcType   rpc type.
     * @param path      path.
     * @return          RuleHandle object.
     */
    public static RuleHandle ruleHandle(final RpcTypeEnum rpcType, final String path) {
        if (Objects.isNull(rpcType)) {
            return null;
        }
        Class<? extends RuleHandle> clazz = RPC_TYPE_TO_RULE_HANDLE_CLASS.getOrDefault(rpcType, DEFAULT_RULE_HANDLE);
        try {
            return clazz.newInstance().createDefault(path);
        } catch (InstantiationException | IllegalAccessException e) {
            throw new SoulException(
                    String.format("Init RuleHandle failed with rpc type: %s, rule class: %s, exception: %s",
                            rpcType,
                            clazz.getSimpleName(),
                            e.getMessage()));
        }
    }
}
```

Let's construct the RuleDTO object and register the rules.

```java
// RuleServiceImpl.java
@Override
public String register(final RuleDTO ruleDTO) {
    RuleDO ruleDO = RuleDO.buildRuleDO(ruleDTO);
    List<RuleConditionDTO> ruleConditions = ruleDTO.getRuleConditions();
    if (StringUtils.isEmpty(ruleDTO.getId())) {
        ruleMapper.insertSelective(ruleDO);
        ruleConditions.forEach(ruleConditionDTO -> {
            ruleConditionDTO.setRuleId(ruleDO.getId());
            // 这里在 for 循环里调用 dao 层插入数据，是不是可以考虑挪出去一次性批量插入？
            ruleConditionMapper.insertSelective(RuleConditionDO
                    .buildRuleConditionDO(ruleConditionDTO));
        });
    }
    publishEvent(ruleDO, ruleConditions);
    return ruleDO.getId();
}
```

Insert data into the rule and rule \_ condition tables, respectively.

The publishEvent () method sends RuleData data to the Soul gateway through the web socket long connection.

## 3.Sum up

At this point, the logical analysis of calling the "/soul-client/springmvc-register" interface is finished, and we summarize as follows:

- Process the selector
  - Add or modify selector and selector \_ condition table data, and persist them to MySQL.
  - Send data change information to Soul gateway through websocket.
- Process the rule
  - Add or modify the data of rule and rule \_ condition tables, and persist them to MySQL.
  - Send data change information to Soul gateway through websocket.

The table structure and field meaning need further study and research. After the websocket is sent to the Soul gateway, what the gateway has done also needs follow-up analysis.

At this point, the registration logic of the HTTP user accessing the Soul gateway is analyzed.

If you have the need to use the gateway in your work, or you have the pursuit of learning the gateway, welcome to analyze and learn with me. Soul Gateway, you deserve it.
