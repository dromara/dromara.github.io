import{_ as e,a,b as i}from"./Newcar-2.0.0-2-da2ea6ed.js";import{_ as n,o as r,c as t,f as d}from"./app-b622e902.js";const s={},c=d('<figure><img src="'+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><p>Newcar在经历了原生Canvas -&gt; Skia的进展过程将会在2.0.0版本结束，至此Newcar已重构完毕，相比于1.0, newcar用更优雅，性能更高的方式实现了内核的重写以及API的重设计</p><p><strong>https://newcar.js.org/</strong></p><h2 id="reactivity-响应式的按需更新" tabindex="-1"><a class="header-anchor" href="#reactivity-响应式的按需更新" aria-hidden="true">#</a> Reactivity --- 响应式的按需更新</h2><p>我们模仿了Vue的响应式设计，并把它用在Newcar的按需更新上，让程序运行更加的高效</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const widget = new Widget()
widget.x.value = 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>缺点：需要使用 <code>.value</code> 进行值的访问和修改</p><h2 id="setup语法糖" tabindex="-1"><a class="header-anchor" href="#setup语法糖" aria-hidden="true">#</a> Setup语法糖</h2><p>传统的动画需要一个一个进行animate,而且修改单个值特别麻烦，有了setup语法糖，就可以通过生成器函数逐个逐个的调用动画</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>widget.setup(w =&gt; {
     yield 3 // 等待3秒
     console.log(&#39;Hello world!&#39;)
     // 执行动画
     yield create().withAttr({ duration: 3 })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件系统" tabindex="-1"><a class="header-anchor" href="#事件系统" aria-hidden="true">#</a> 事件系统</h2><p>Newcar相比于Manim最大的好处就是可以进行交互，这也是前端的一大优势</p><h2 id="交互" tabindex="-1"><a class="header-anchor" href="#交互" aria-hidden="true">#</a> 交互</h2><p>新版本增加了交互系统，如 <code>scalable</code>, 可以让用户自由缩放组件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new Widget({
    dragable: true,
    scalable: true,
})

[https://github.com/dromara/newcar](https://github.com/dromara/newcar)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="公告" tabindex="-1"><a class="header-anchor" href="#公告" aria-hidden="true">#</a> 公告</h2><p>因为Newcar团队的高中生占了80%，开学后无法连续长时间维护项目，所以发布此条公告，希望能找到人来长期维护。</p><figure><img src="`+a+'" alt="" tabindex="0"><figcaption></figcaption></figure><figure><img src="'+i+'" alt="" tabindex="0"><figcaption></figcaption></figure>',19),l=[c];function o(u,v){return r(),t("div",null,l)}const m=n(s,[["render",o],["__file","Newcar-2.0.0.html.vue"]]);export{m as default};
