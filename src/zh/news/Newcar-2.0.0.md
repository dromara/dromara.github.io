---
title: Newcar 2.0.0 Beta 版本发布！
author: Newcar
date: 2024-07-24
cover: /assets/img/news/Newcar-2.0.0-0.png
head:
  - - meta
    - name: 新闻
---

![](/assets/img/news/Newcar-2.0.0-0.png)

Newcar在经历了原生Canvas -> Skia的进展过程将会在2.0.0版本结束，至此Newcar已重构完毕，相比于1.0, newcar用更优雅，性能更高的方式实现了内核的重写以及API的重设计

**https://newcar.js.org/**

## Reactivity --- 响应式的按需更新

我们模仿了Vue的响应式设计，并把它用在Newcar的按需更新上，让程序运行更加的高效

```
const widget = new Widget()
widget.x.value = 100
```

缺点：需要使用 `.value` 进行值的访问和修改

## Setup语法糖

传统的动画需要一个一个进行animate,而且修改单个值特别麻烦，有了setup语法糖，就可以通过生成器函数逐个逐个的调用动画

```
widget.setup(w => {
     yield 3 // 等待3秒
     console.log('Hello world!')
     // 执行动画
     yield create().withAttr({ duration: 3 })
})
```

## 事件系统

Newcar相比于Manim最大的好处就是可以进行交互，这也是前端的一大优势

## 交互

新版本增加了交互系统，如 `scalable`, 可以让用户自由缩放组件

```
new Widget({
    dragable: true,
    scalable: true,
})

[https://github.com/dromara/newcar](https://github.com/dromara/newcar)
```

## 公告

因为Newcar团队的高中生占了80%，开学后无法连续长时间维护项目，所以发布此条公告，希望能找到人来长期维护。

![](/assets/img/news/Newcar-2.0.0-1.jfif)

![](/assets/img/news/Newcar-2.0.0-2.jfif)