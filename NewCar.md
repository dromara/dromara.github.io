---
title: Middle school students open source front-end animation engine NewCar to join the Dromara community
author: 高中的BugDuck
date: 2024-04-22
cover: /assets/img/news/NewCar-0.png
head:
  - - meta
    - name: News
---

# 

![](/assets/img/news/NewCar-0.png)

About the Author

## I'm with programming

My name is AcboxSky. I live in Lu 'an, Anhui province. I am a high school student and I am currently studying in senior one.

From the winter vacation in the sixth grade, I started to play scratch because of the 1 open programming class organized by the school. I started to learn Python in the summer vacation when I graduated from the sixth grade. then I met LStar, the first computer enthusiast of the same age I met. we created BugDuck open source team together. To be sure, the open class affected my life.

The first fairly successful project I did was a front-end framework called tntjs, and I put the promo on station B. as a result, it caused a sensation among two people. one group thought we were just studying, and the other group thought we copied Vue. at that time, the team was BugDuck of internal conflicts, and finally split (from more than 30 to less than five). tntjs did not maintain it.

In the first semester of the third year of junior high school, I didn't touch the code for one semester, partly because I was going to take the senior high school entrance examination, and partly because my parents confiscated my computer, but I have been thinking about my new project during this period. When I saw the old flash courseware on the teacher's computer, I wanted to build an animation engine and named it newcar, so I began to write newcar during the winter vacation.

newcar project address: https://github.com/dromara/newcar,文档地址:newcar.js.org

On the whole, my initial pursuit of technology has not changed, but the road is bumpy.

## Me and English

Since primary school, I have put on a 1 of looks that I don't like English. I can only take more than 20 out of 100, and all of them are covered. So how did I become an English lover?

After entering junior high school, I began to learn English from scratch, but my heart was still very resistant. When I graduated from the second day of the junior high school, I could only get a passing score until I found an upmaster named "English rabbit". after watching his class, I fell in love with English by mistake. Since then, I insist on memorizing 10 English words every day, and my English ability has also developed by leaps and bounds. As of today, English has become my strong point.

## My hobby

* Programming: This is not for sure

* English: This is the same

* Electronic technology: very dish, even the transistor can't play well

* Music: I started to learn drums from the second grade of primary school and did not learn them until the first day of primary school. However, I still like penbeat and listening to electronic sounds, especially the World Has A Heartbeat of V God.

* Chemical experiments: very vegetable, can only do some simple, such as the preparation of hydrochloric acid or something

* Play music tour: very good, usually mainly play Phigros and Dancing Line


# Newcar Presentation

Newcar is a modern front-end animation engine, based on CanvasKit-WASM, with the blessing of Skia's WebAssembly version, it not only ensures its performance, but also brings powerful drawing functions.

## Features

1. Highly customizable API

2. Chain syntax, which is different from the way traditional animation engines and game engines need to save objects as variables. Chain syntax will make development more efficient.

3. Have a kernel similar to Vue's diff algorithm, which further ensures the efficiency of animation and "on-demand updates"

4. Multi-platform, can run on modern WebAssembly-supported browsers and nodejs.


## Future plans

1. It can be seen from the mods directory under the root directory of the project that newcar has released mathematical modules (including number axis, plane rectangular coordinate system, function image, etc.) at present. What has not been released are: geometry module, markdown module, dynamic chart module, ui module, physics module, mind map module, etc.

2. The event system will be launched in the future to turn him into an animation game two-in-one engine.

3. Some small things such as animation tree


## Backstory

In math class, the teacher took out his old slides of Qing Dynasty to explain. As a result, the flash courseware inside could not be opened because the computer was not equipped with flash. So I was thinking, since flash is so powerful but declining, why don't I write a library similar to flash? Just do what you say, start thinking in September 2022, and start writing code in December.

At the beginning, newcar was very simple, even based on native Canvas, with very poor performance and complicated animation writing steps. Later, in addition to imitating flash, newcar also integrates the design principles of animation engines such as Manim and svg animation. The latest version of Newcar is a rewritten and redesigned version, but it will have more powerful functions in the future.

* Documentation: newcar.js.org/zh

* GitHub: github.com/dromara/newcar

* station B: BugDuck open source team

* Twitter: @bugduckteam

