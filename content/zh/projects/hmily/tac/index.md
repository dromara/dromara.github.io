---
title: Hmily-tac
keywords: tac
description: tac
---

### TAC 模式简介

`TAC`模式其实是`TCC`模式的变种,顾名思义 `TAC` 模式被称为自动回滚,相比于 `TCC` 模式，用户完全不用关心
回滚方法如何去写，减少了用户的开发量，对用户完全透明。

* `TAC` 模式只适合于关系型数据库。

* `TAC` 模式会拦截用户的SQL语句生成反向回滚SQL，SQL的兼容度也会是一大考验。


TAC 模式是一种二阶段提交的分布式事务模式，其实现机制为：

+ 一阶段：分支事务（本地事务）执行）。Hmily 会拦截业务 SQL，首先解析 SQL 语义，找到要更新的业务数据，在数据被更新前，分别保存更新前的数据快照为 beforeImage 和更新后的数据快照为 afterImage，封装为 undo 日志对象，再根据 undo 对象获取对应的全局锁，然后执行业务 SQL 更新数据，本地事务提交后，持久化 undo 日志，释放本地资源，这些操作都在**本地数据库事务**内完成，这样保证了一阶段的 **原子性**；
+ 二阶段：
  + 如果在一阶段中的事务全部执行通过，那么执行全局提交；
  + 如果一阶段中有本地事务没有通过，那么就执行全局回滚，通过 undo 日志生成反向更新 SQL 并执行，以完成分支事务的回滚。

### TAC 模块整体结构

![TAC模块整体结构](/static/img/architecture/hmily-tac-brain.png)

### TAC 事务流程

#### 一阶段

一阶段是每个事务参与者的本地事务的执行，主要流程如下图：

![TAC事务流程](/static/img/architecture/hmily-tac-flow.png)

#### 二阶段

- 如果在一阶段中的事务全部执行通过，那么执行全局提交；
  - 对应每个参与者事务，异步删除 undo log，同步释放对应的全局锁、清除分支事务；
  - 清除全局事务；
- 如果之前的一阶段中有本地事务没有通过，那么就执行全局回滚，回滚用到的就是一阶段记录的 undo log ，通过回滚记录生成反向更新SQL并执行，以完成分支的回滚，回滚成功则异步删除 undo log 、同步删除分支事务。

#### 事务流程详解

首先 `AbstractHmilyTransactionAspect` 是一个使用 Spring AOP 的切面类，会拦截带有 `@HmilyTAC` 注解的方法，在这些方法执行前后进行一些处理。

+ `HmilyGlobalInterceptor` 通过静态代码块加载 tcc 、tac、xa 三种模式对应的 `HmilyTransactionHandlerRegistry` 放到自己的内部变量 `REGISTRY` 中；

  + 加载 tac 模式对应的 HmilyTransactionHandlerRegistry 对象时，会根据角色注册不同的 `HmilyTransactionHandler` 对象
  +  `StarterHmilyTacTransactionHandler` 负责对全局事务的管理，如开启、提交、回滚全局事务等逻辑
  + `ParticipantHmilyTacTransactionHandler` 负责对参与者事务（分支事务）的管理

+ 加载 `HmilyTransactionContext` 对象 context，此时为 null；

+ 从 `REGISTRY` 获取对应的`HmilyTransactionHandlerRegistry`，再调用对应的 `select()` 获取对应的`HmilyTransactionHandler` ，若 context 对象为空，则获取 `StarterHmilyTacTransactionHandler`，并执行它的 `handleTransaction()` 方法，该方法具体作用：

  + 开启全局事务，创建全局事务对象，其状态为 TRYING

  + 执行业务方法，若此方法内部，使用rpc调用了其他服务的方法（以使用 dubbo 为例），则

    + `DubboHmilyTransactionFilter` 会拦截 dubbo 调用链中具有 `@Hmily` 注解的方法，并处理 Hmily 分布式事务相关的逻辑：

      + 创建参与者事务对象 `HmilyParticipant`
      + 通过 `RpcMediator` 传递事务上下文到 Dubbo 的上下文中
      + 调用原始的 Dubbo 服务，执行实际的方法调用：
        + 执行对应服务的方法时，又会被 `AbstractHmilyTransactionAspect` 拦截，此时逻辑与上述一致，不过获取的`HmilyTransactionHandler` 为 `ParticipantHmilyTacTransactionHandler`，最后执行的是它的 `handleTransaction()` 方法

      + 如果调用成功，则注册参与者事务到全局事务中

  + 根据是否发生异常，提交或者回滚事务

    + 提交事务时，会获取所有的参与者事务对象，根据其角色判断是本地的还是远程的
      + 本地的则执行 `HmilyTacLocalParticipantExecutor.confirm()`方法进行 log 的删除
      + 远程的则执行 `HmilyReflector.executor()` 方法
        + 更新全局事务的状态为 CONFIRMING
        + 根据参与者事务的`confirmHmilyInvocation` 对象，调用相应的方法并返回执行结果。**此时方法又走到了`ParticipantHmilyTacTransactionHandler.handleTransaction()`**

    + 回滚事务和提交事务流程类似，不再赘述



### 隔离级别

TAC 模式下，事务的的隔离级别由事务注解 `@HmilyTAC` 的 `isolationLevel` 属性来控制，默认为 `READ_UNCOMMITTED` （读未提交），如果想要实现读已提交的隔离级别，将 `isolationLevel` 的值 改为 `READ_COMMITTED` 即可。此时，`HmilyExecuteTemplate` 执行 `SELECT SQL` 时，会先校验全局锁。具体做法：先由解析器解析 SQL，如果为 SELECT 语句并且隔离级别为 `READ_COMMITTED`,  则由 `HmilySelectSQLComputeEngine` 来生成 selectPKSQL，进查询主键，进而拿到全局锁信息，然后进行校验，检查全局锁是否已被其他事务获取。

### 关键代码分析

#### hmily-tac-core

`StarterHmilyTacTransactionHandler#handleTransaction`，负责对全局事务的管理，如开启、提交、回滚全局事务等逻辑。细节见注释

```java
public Object handleTransaction(final ProceedingJoinPoint point, final HmilyTransactionContext context)
        throws Throwable {
    Object returnValue;
    MetricsReporter.counterIncrement(LabelNames.TRANSACTION_TOTAL, new String[]{TransTypeEnum.TAC.name()});
    LocalDateTime starterTime = LocalDateTime.now();
    try {
        tm.begin(); // 开启事务
        try {
            //execute try
            returnValue = point.proceed();
        } catch (Throwable throwable) {
            //if exception ,execute cancel
            final HmilyTransaction currentTransaction = tm.getHmilyTransaction();
            disruptor.getProvider().onData(() -> {
                tm.rollback(currentTransaction); // 回滚事务
            });
            throw throwable;
        }
        // execute confirm
        final HmilyTransaction currentTransaction = tm.getHmilyTransaction();
        disruptor.getProvider().onData(() -> {
            tm.commit(currentTransaction); // 提交事务
        });
    } finally {
        HmilyContextHolder.remove();
        tm.remove();
    }
    return returnValue;
}
```

`ParticipantHmilyTacTransactionHandler#handleTransaction`，负责对参与者事务（分支事务）的管理，具体细节见代码注释

```java
public Object handleTransaction(final ProceedingJoinPoint point, final HmilyTransactionContext context) throws Throwable {
    HmilyParticipant hmilyParticipant = null;
    switch (HmilyActionEnum.acquireByCode(context.getAction())) {
        case TRYING:  // 一阶段时, 全局事务状态为 TRYING, 都为该条件
            try {
                hmilyParticipant = coordinator.beginParticipant(context, point); // 开启参与者事务, 此时状态为 PRE_TRY
                final Object proceed = point.proceed(); // 执行实际业务方法
                hmilyParticipant.setStatus(HmilyActionEnum.TRYING.getCode()); // 更新参与者事务的状态为 TRYING
                // update log status to try
                HmilyRepositoryStorage.updateHmilyParticipantStatus(hmilyParticipant);
                return proceed;
            } catch (Throwable throwable) {
                // if exception delete log.
                if (Objects.nonNull(hmilyParticipant)) {
                    HmilyParticipantCacheManager.getInstance().removeByKey(hmilyParticipant.getParticipantId());
                }
                HmilyRepositoryStorage.removeHmilyParticipant(hmilyParticipant);
                throw throwable;
            } finally {
                HmilyContextHolder.remove();
            }
        case CONFIRMING: // 当所有参与者都执行成功后（一阶段结束且分支事务都通过）, StarterHmilyTacTransactionHandler 的 handleTransaction() 方法中, 会进行全局事务的提交, 更新全局事务状态为 CONFIRMING
            List<HmilyParticipant> confirmList = HmilyParticipantCacheManager.getInstance().get(context.getParticipantId());
            coordinator.commitParticipant(confirmList, context.getParticipantId());
            break;
        case CANCELING: // 与 CONFIRMING 类似
            List<HmilyParticipant> cancelList = HmilyParticipantCacheManager.getInstance().get(context.getParticipantId());
            coordinator.rollbackParticipant(cancelList, context.getParticipantId());
            break;
        default:
            break;
    }
    Method method = ((MethodSignature) (point.getSignature())).getMethod();
    return DefaultValueUtils.getDefaultValue(method.getReturnType());
}
```

#### hmily-tac-p6spy

Hmily 使用 `p6spy` 对业务SQL进行拦截，以便在SQL执行前后增加额外的操作（回滚SQL生成、获取全局锁等）。具体来说，包括两个核心类：`HmilyJdbcEventListener` 和 `HmilyExecuteTemplate` 。

自定义监听器 `HmilyJdbcEventListener` 继承自 `p6spy` 的 `SimpleJdbcEventListener`，对SQL的执行进行监听。

+ 数据库连接建立后，更改本地事务的自动提交状态为 false
+ SQL 执行之前，执行 `HmilyExecuteTemplate` 的 `execute()`方法
+ 本地事务提交后，根据是否发生异常，执行 `HmilyExecuteTemplate` 的 `commit()`（持久化 undo 日志） 或 `rollback()` （释放全局锁）方法
+ 本地事务回滚后，执行 `HmilyExecuteTemplate` 的 `rollback()`方法

`org.dromara.hmily.tac.p6spy.listener.HmilyJdbcEventListener`

```java
public class HmilyJdbcEventListener extends SimpleJdbcEventListener {
    
    @Override
    public void onAfterGetConnection(final ConnectionInformation connectionInformation, final SQLException e) {
        super.onAfterGetConnection(connectionInformation, e);
        if (Objects.isNull(e)) {
            HmilyExecuteTemplate.INSTANCE.beforeSetAutoCommit(connectionInformation.getConnection());
        }
    }
    
    @Override
    public void onBeforeAnyExecute(final StatementInformation statementInformation) {
        super.onBeforeAnyExecute(statementInformation);
        HmilyExecuteTemplate.INSTANCE.execute(statementInformation.getSql(), getParameters(statementInformation), statementInformation.getConnectionInformation());
    }
    
    @Override
    public void onAfterCommit(final ConnectionInformation connectionInformation, final long timeElapsedNanos, final SQLException e) {
        super.onAfterCommit(connectionInformation, timeElapsedNanos, e);
        if (Objects.isNull(e)) {
            HmilyExecuteTemplate.INSTANCE.commit(connectionInformation.getConnection());
        } else {
            HmilyExecuteTemplate.INSTANCE.rollback(connectionInformation.getConnection());
        }
    }
    
    @Override
    public void onAfterRollback(final ConnectionInformation connectionInformation, final long timeElapsedNanos, final SQLException e) {
        super.onAfterRollback(connectionInformation, timeElapsedNanos, e);
        HmilyExecuteTemplate.INSTANCE.rollback(connectionInformation.getConnection());
    }
    // ....
}
```

`HmilyExecuteTemplate` 的 `excute()` 方法是核心，包含了对 SQL的解析、undo日志的生成、获取全局锁等操作，详情见下面注释。

`org.dromara.hmily.tac.p6spy.executor.HmilyExecuteTemplate#execute`

```java
public void execute(final String sql, final List<Object> parameters, final ConnectionInformation connectionInformation) {
    if (check()) { // 检查是否是 tac 模式、全局事务是否不为空
        return;
    }
    HmilyStatement statement;
    try {
        // 解析SQL, 返回对应的 HmilyStatement
        statement = HmilySqlParserEngineFactory.newInstance().parser(sql, DatabaseTypes.INSTANCE.getDatabaseType());
        log.debug("TAC-parse-sql ::: statement: {}", statement);
    } catch (final Exception ex) {
        return;
    }
    String resourceId = ResourceIdUtils.INSTANCE.getResourceId(connectionInformation.getUrl());
    // 根据 statement 类型创建对应的 HmilySQLComputeEngine
    HmilySQLComputeEngine sqlComputeEngine = HmilySQLComputeEngineFactory.newInstance(statement);
    // 获取 snapshot, 包含数据库表中更新执行前后的数据, 用于后续生成回滚SQL
    HmilyDataSnapshot snapshot = sqlComputeEngine.execute(sql, parameters, connectionInformation.getConnection(), resourceId);
    log.debug("TAC-compute-sql ::: {}", snapshot);
    HmilyUndoContext undoContext = buildUndoContext(HmilyContextHolder.get(), snapshot, resourceId);
    // 获取全局锁
    HmilyLockManager.INSTANCE.tryAcquireLocks(undoContext.getHmilyLocks());
    log.debug("TAC-try-lock ::: {}", undoContext.getHmilyLocks());
    if (!(statement instanceof HmilySelectStatement)) {
        HmilyUndoContextCacheManager.INSTANCE.set(undoContext);
    }
}
```

#### hmily-tac-sqlrevert

**revert流程**

+ 项目启动时会在 `HmilyTacRollbackExecutor` 的构造方法中注册`doRollBack()`函数到 `UndoHook`的 `consumers` 变量中

  + 项目启动时会有个定时任务，调用 `consumers` 的方法来 revert
  + 事务回滚时，`HmilyTacTransactionManager`  的 `rollback` 方法也会调用 `consumers` 的方法 revert

+ `doRollBack(undo)`：通过 `HmilySQLRevertEngineFactory` 类获取 `HmilySQLRevertEngine` 对象，调用其 `revet(undo)`方法，来到 `HmilySQLRevertEngine` 的默认实现类 `DefaultSQLRevertEngine` 的 `revert(undo) ` 方法

+ 在`DefaultSQLRevertEngine` 的方法中，根据 undo 日志对象中每个 tuple 的操作类型选择对应的 `SQLImageMapper` 对象，调用其 `cast()` 方法来封装 SQL 和 参数，然后执行该 SQL

+ `SQLImageMapper` 三个实现类：`InsertSQLImageMapper` 、`UpdateSQLImageMapper` 、`DeleteSQLImageMapper` 

  ```java
  public final class UpdateSQLImageMapper implements SQLImageMapper {
      private final String tableName;
      private final Map<String, Object> beforeImages;
      private final Map<String, Object> afterImages;
      
      @Override
      public RevertSQLUnit cast() {
          String sql = String.format("UPDATE `%s` SET %s WHERE %s",
              tableName, CreateSQLUtil.getKeyValueClause(beforeImages.keySet(), ", "), CreateSQLUtil.getKeyValueClause(afterImages.keySet(), " AND "));
          List<Object> parameters = new LinkedList<>();
          parameters.addAll(beforeImages.values());
          parameters.addAll(afterImages.values());
          return new RevertSQLUnit(sql, parameters);
      }
  }
  ```

  以 `UpdateSQLImageMapper` 为例，`cast()` 方法通过 `beforeImages` 和 `afterImages` 来生成反向的更新SQL，以恢复原始状态。

