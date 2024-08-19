---
title: Newcar 2.0.0 Beta Release!
author: Newcar
date: 2024-07-24
cover: /assets/img/news/Newcar-2.0.0-0.png
head:
  - - meta
    - name: News
---

![](/assets/img/news/Newcar-2.0.0-0.png)

Newcar's progress through native Canvas -> Skia will end in version 2.0.0, so far Newcar has been refactored. compared with 1.0, newcar has rewritten the kernel and redesigned the API in a more elegant and high-performance way.

**https://newcar.js.org /**

## Reactivity --- Responsive on-demand updates

We imitated Vue's responsive design and used it on Newcar's on-demand updates to make the program run more efficiently.

'''
const widget = new Widget()
widget.x.value = 100
'''

Disadvantages: Need to use '.value' for value access and modification

## Setup Syntax Sugar

Traditional animation needs to be animate one by one, and it is particularly troublesome to modify a single value. With setup syntax sugar, animation can be called one by one through generator functions.

'''
widget.setup(w => {
yield 3 // wait 3 seconds
console.log('Hello world!')
// Execute the animation
yield create().withAttr({ duration: 3 })
})
'''

## Event System

The biggest advantage of Newcar over Manim is that it can interact, which is also a big advantage of the front end.

## Interaction

The new version adds an interactive system, such as 'scalable', which allows users to freely scale components.

'''
new Widget ({
dragable: true
scalable: true
})

[https://github.com/dromara/newcar](https://github.com/dromara/newcar)
'''

## Announcement

Because the Newcar team has 80% of high school students and cannot maintain the project for a long time after school starts, this announcement is issued in the hope of finding someone to maintain it for a long time.
![](/assets/img/news/Newcar-2.0.0-1.jfif)

![](/assets/img/news/Newcar-2.0.0-2.jfif)