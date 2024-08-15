import{_ as e,o as i,c as o,f as n}from"./app-4aee1e45.js";const s="/assets/img/news/Disjob-0-1.jpg",t="/assets/img/news/Disjob-0-2.png",d="/assets/img/news/Disjob-0-3.jpg",a={},l=n('<h2 id="作者简介" tabindex="-1"><a class="header-anchor" href="#作者简介" aria-hidden="true">#</a> 作者简介</h2><p>网名 Ponfee，Dromara 开源组织成员，dromara/disjob 项目作者。在国内多个一线大厂待过，有过后端、全栈、大数据等相关工作经历。</p><h2 id="关于-disjob" tabindex="-1"><a class="header-anchor" href="#关于-disjob" aria-hidden="true">#</a> 关于 Disjob</h2><p>Disjob 是天然为支持分布式长任务执行而设计的，它除了具备常规的任务调度功能外，还提供：任务拆分及分布式并行执行、暂停及取消运行中的任务、恢复执行被暂停的任务、保存任务的执行快照(Checkpoint)、任务编排(DAG)、广播任务等能力。以下是 Disjob 的整体流程图：</p><figure><img src="'+s+`" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="应用场景举例" tabindex="-1"><a class="header-anchor" href="#应用场景举例" aria-hidden="true">#</a> 应用场景举例</h2><p>举个简单的例子：统计在**<code>(0，1万亿]</code>**区间内质数的个数。如果单机单线程 CPU 去统计的话不知道要到何年马月，这里我们就可以用<code>Disjob</code>框架提供的分布式并行执行的能力来解决该类问题。</p><ol><li><strong>拆分任务</strong></li></ol><p>先根据当前的机器资源情况来决定拆分任务的数量，比如按照我们的机器数量及 core CPU 数量(因为质数统计是 CPU 密集型)，决定拆分为 10 个任务。</p><ol start="2"><li><strong>分发任务</strong></li></ol><p>总任务被拆分成 10 个子任务后，框架会使用指定的路由算法把子任务分发给这些机器。</p><ol start="3"><li><strong>接收任务</strong></li></ol><p>机器接收到子任务后，会提交到框架的自定义线程池中执行。</p><ol start="4"><li><strong>分布式并行执行</strong></li></ol><p>在执行时我们可以使用分批次方式(通过代码循环)来统计，这里我们指定<code>task-1</code>在第一次循环统计<code>(0, 1亿]</code>，第二次循环统计<code>(10亿, 11亿]</code>，以此类推最后一次循环统计<code>(9990亿, 9991亿]</code>。同理其它的 task 也是按同样的方式分布式并行统计。</p><blockquote><p>P.s. 黎曼猜想中可知质数分布是大体均匀的，判断一个数是否质数有很多方法，如埃氏筛法、欧拉筛法、Miller Rabin 素性检验，我们可以使用 Guava 库提供的素性检验。</p></blockquote><ol start="5"><li><strong>Checkpoint</strong></li></ol><p>如果在统计过程中机器宕机后怎么办？难道再从头开始统计吗？No No No！我们可以在每循环 10 次（或每隔执行超过 1 分钟）时使用<code>Checkpoint</code>保存当前<code>task-1</code>的执行快照。宕机异常后的重新启动任务时会读取这份快照数据，从上一次的状态中接着继续统计。</p><blockquote><p>以下是<code>task-1</code>任务保存的快照数据样例</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;next&quot;:4000000001, // 下一次循环时要统计的区间为(40亿, 41亿]
  &quot;count&quot;:19819734,  // 已经统计到了 19819734 个质数
  &quot;finished&quot;:false   // 当前任务是否已经统计完成：true-是；false-否；
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li><strong>暂停与恢复</strong></li></ol><p>假如我们的这几台机器资源需要临时做其它的事情，想把当前的统计任务暂停一段时间。No problem！框架是支持<code>暂停执行中的任务</code>，只需要在管理后台的<code>调度实例</code>页面，找到该任务点击<code>暂停</code>按钮即可。在暂停时任务会接收到一个中断信号，收到中断信号时同样可以在代码中使用<code>Checkpoint</code>保存当前的执行快照。</p><p>当其它事情处理完后，我们可以在管理后台的<code>调度实例</code>页面，找到被暂停的这个任务，点击<code>恢复</code>按钮，此时任务会从上一次保存的状态中恢复继续执行。</p><ol start="7"><li><strong>任务编排</strong></li></ol><p>现在这个质数统计的总任务已经执行完了，共 10 个子任务，每个子任务都统计出了它的那部分结果。Disjob 能自动帮我汇总结果吗？Yes！框架提供了非常强大且方便的表达式来编排任务，如：<code>A-&gt;B,C,(D-&gt;E)-&gt;D,F-&gt;G</code>，现在我们可以创建一个汇总任务，然后再把这两个任务编排在一起。以下是本例中质数统计的 job 表数据，其中<code>job_handler</code>指定了编排的这两个任务处理器(代码在 Disjob 的开源项目中)。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>INSERT INTO \`sched_job\` (
  \`job_id\`,
  \`job_group\`,
  \`job_name\`,
  \`job_handler\`,
  \`job_state\`,
  \`job_type\`,
  \`job_param\`,
  \`trigger_type\`,
  \`trigger_value\`,
  \`next_trigger_time\`
) VALUES (
  1003164910267351009,
  &#39;default&#39;,
  &#39;prime-count-dag&#39;,
  &#39;cn.ponfee.disjob.test.handler.PrimeCountJobHandler -&gt; cn.ponfee.disjob.test.handler.PrimeAccumulateJobHandler&#39;,
  1,
  2,
  &#39;{\\&quot;m\\&quot;:1,\\&quot;n\\&quot;:10000000000,\\&quot;blockSize\\&quot;:100000000,\\&quot;parallel\\&quot;:10}&#39;,
  2,
  &#39;2023-09-02 18:00:00&#39;,
  unix_timestamp()*1000
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>本例中的质数统计流程图如下</strong></p></blockquote><figure><img src="`+t+'" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>Disjob 还有很多的功能需要去完善打磨，正如 Dromara 的口号：一个人或许能走的更快，但一群人会走的更远。期待有更多的人一起参与共建！</p><ul><li><strong>项目链接</strong></li></ul><p>gitee: https://gitee.com/dromara/disjob</p><p>github: https://github.com/dromara/disjob</p><p>个人博客：http://www.ponfee.cn</p><ul><li><strong>沟通交流</strong></li></ul><p>对项目有什么想法或者建议，可以交流</p><img src="'+d+'" height="340">',37),r=[l];function c(u,b){return i(),o("div",null,r)}const v=e(a,[["render",c],["__file","Disjob-0.html.vue"]]);export{v as default};
