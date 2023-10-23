---
title: 新晋开源项目 DisJob 加入 Dromara 社区，分布式任务调度框架
author: disjob
date: 2023-09-05
cover: /assets/img/news/Disjob-0-1.jpg
head:
  - - meta
    - name: 新闻
---

## 作者简介

网名 Ponfee，Dromara 开源组织成员，dromara/disjob 项目作者。在国内多个一线大厂待过，有过后端、全栈、大数据等相关工作经历。

## 关于 Disjob

Disjob 是天然为支持分布式长任务执行而设计的，它除了具备常规的任务调度功能外，还提供：任务拆分及分布式并行执行、暂停及取消运行中的任务、恢复执行被暂停的任务、保存任务的执行快照(Checkpoint)、任务编排(DAG)、广播任务等能力。以下是 Disjob 的整体流程图：

![](/assets/img/news/Disjob-0-1.jpg)

## 应用场景举例

举个简单的例子：统计在\*\*`(0，1万亿]`\*\*区间内质数的个数。如果单机单线程 CPU 去统计的话不知道要到何年马月，这里我们就可以用`Disjob`框架提供的分布式并行执行的能力来解决该类问题。

1.  **拆分任务**

先根据当前的机器资源情况来决定拆分任务的数量，比如按照我们的机器数量及 core CPU 数量(因为质数统计是 CPU 密集型)，决定拆分为 10 个任务。

2.  **分发任务**

总任务被拆分成 10 个子任务后，框架会使用指定的路由算法把子任务分发给这些机器。

3.  **接收任务**

机器接收到子任务后，会提交到框架的自定义线程池中执行。

4.  **分布式并行执行**

在执行时我们可以使用分批次方式(通过代码循环)来统计，这里我们指定`task-1`在第一次循环统计`(0, 1亿]`，第二次循环统计`(10亿, 11亿]`，以此类推最后一次循环统计`(9990亿, 9991亿]`。同理其它的 task 也是按同样的方式分布式并行统计。

> P.s. 黎曼猜想中可知质数分布是大体均匀的，判断一个数是否质数有很多方法，如埃氏筛法、欧拉筛法、Miller Rabin 素性检验，我们可以使用 Guava 库提供的素性检验。

5.  **Checkpoint**

如果在统计过程中机器宕机后怎么办？难道再从头开始统计吗？No No No！我们可以在每循环 10 次（或每隔执行超过 1 分钟）时使用`Checkpoint`保存当前`task-1`的执行快照。宕机异常后的重新启动任务时会读取这份快照数据，从上一次的状态中接着继续统计。

> 以下是`task-1`任务保存的快照数据样例

```
{
  "next":4000000001, // 下一次循环时要统计的区间为(40亿, 41亿]
  "count":19819734,  // 已经统计到了 19819734 个质数
  "finished":false   // 当前任务是否已经统计完成：true-是；false-否；
}
```

6.  **暂停与恢复**

假如我们的这几台机器资源需要临时做其它的事情，想把当前的统计任务暂停一段时间。No problem！框架是支持`暂停执行中的任务`，只需要在管理后台的`调度实例`页面，找到该任务点击`暂停`按钮即可。在暂停时任务会接收到一个中断信号，收到中断信号时同样可以在代码中使用`Checkpoint`保存当前的执行快照。

当其它事情处理完后，我们可以在管理后台的`调度实例`页面，找到被暂停的这个任务，点击`恢复`按钮，此时任务会从上一次保存的状态中恢复继续执行。

7.  **任务编排**

现在这个质数统计的总任务已经执行完了，共 10 个子任务，每个子任务都统计出了它的那部分结果。Disjob 能自动帮我汇总结果吗？Yes！框架提供了非常强大且方便的表达式来编排任务，如：`A->B,C,(D->E)->D,F->G`，现在我们可以创建一个汇总任务，然后再把这两个任务编排在一起。以下是本例中质数统计的 job 表数据，其中`job_handler`指定了编排的这两个任务处理器(代码在 Disjob 的开源项目中)。

```
INSERT INTO `sched_job` (
  `job_id`,
  `job_group`,
  `job_name`,
  `job_handler`,
  `job_state`,
  `job_type`,
  `job_param`,
  `trigger_type`,
  `trigger_value`,
  `next_trigger_time`
) VALUES (
  1003164910267351009,
  'default',
  'prime-count-dag',
  'cn.ponfee.disjob.test.handler.PrimeCountJobHandler -> cn.ponfee.disjob.test.handler.PrimeAccumulateJobHandler',
  1,
  2,
  '{\"m\":1,\"n\":10000000000,\"blockSize\":100000000,\"parallel\":10}',
  2,
  '2023-09-02 18:00:00',
  unix_timestamp()*1000
);
```

> **本例中的质数统计流程图如下**

![](/assets/img/news/Disjob-0-2.png)

## 结语

Disjob 还有很多的功能需要去完善打磨，正如 Dromara 的口号：一个人或许能走的更快，但一群人会走的更远。期待有更多的人一起参与共建！

- **项目链接**

gitee: https://gitee.com/dromara/disjob

github: https://github.com/dromara/disjob

个人博客：http://www.ponfee.cn

- **沟通交流**

对项目有什么想法或者建议，可以交流

<img src="/assets/img/news/Disjob-0-3.jpg" height="340">
