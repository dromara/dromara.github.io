---
title: 2024第一弹，JAVA原生AI算法引擎 EasyAI 加入Dromara开源社区
author: EasyAI
date: 2024-01-05
cover: /assets/img/news/EasyAI-0-0.png
head:
  - - meta
    - name: 新闻
---

> **如今 AI 项目无论在工业领域还是生活领域都开始逐渐深入，ChatGPT，文心一言等大模型更是如火如荼，让我们看到了 AI 的强大。不知道多少小伙伴想快速涉猎到 AI 领域呢？因为各种原因 JAVA 在 AI 领域一直是传统弱项，但是 JAVA 程序员却占据了国内程序员就业的半壁江山，所以这次我带来的 java 原生开源 AI 算法引擎-easyAI（不依赖任何第三方库，开箱即用的引擎），介绍给大家。**

---

# EasyAI - JAVA 原生 AI 算法引擎

## 作者介绍

- dromara 开源组织成员，dromara/easyAI 作者。
- 2 年 JAVA 开发工程师，2 年游戏开发工程师，5 年图像/自然语言算法研究员与工程师。从业 IT 九年，做算法工作时产出视觉与语言算法发明专利共三件（独立发明），项目若干。工作经历以图像算法为主，语言为辅。做游戏工作时休闲小游戏产出不计其数，做 JAVA 工作时以中间件研发工作为主。

## 背景与简介

**广大公司，尤其是中小公司是不是遇到过以下痛点？**

> 1.公司后端突然需要一个 AI 模块来辅助某业务场景，但是因为传统业务关系公司后端大部分都是 java 程序员。去招个资深的算法工程师吧，先不说招聘的时间成本，就因为这么一个需求就去找一个价格这么昂贵的人员也太不经济，最后只能无奈外包。
>
> 2.突然有了某个 AI 模块需求，用了很长的时间成本从网上买了一套做好的 AI 模块，结果人家是 py 或者 cpp。动不动还要装 cuda 环境（但凡装过 cuda 环境的都知道多少坑），有时候要考虑环境，有时候还要内嵌，要考虑 py/cpp 与 java 互相调用，还有因此而来的效率与安全问题等等。我更希望是完美兼容我的系统，我不想去繁琐的调整运行环境，考虑各种兼容性，我想要直接引入包到我的 maven 里就能开箱即用。
>
> 3.我去！chatGPT 好牛逼，人用的真爽，可是它不能给我的系统服务。它是大模型很好，但是我的系统不需要大模型！我需要的是一个我可以自定义，去针对我们业务环境的小模型来嵌入我们的系统，为系统服务！大模型是给人用的，但是不能内嵌我们的系统给我们的系统服务。

- 如果你有以上痛点，easyAI 就帮到你了！easyAI 是一个纯 java 原生算法引擎。其底层从矩阵运算，微分求导。中层到机器学习 强化学习等各种算法，然后最上层实现了图像视觉，自然语言全部包含在 easyAi 引擎内。
- 这种从最底层的基础运算到上层 AI 算法上下游的全囊括，使得 java 项目只要引入 easyAi 的 maven 包，就可以做到无缝调用，且可以不依赖任何第三库，让 java 程序员舒服的一批！
- 然而这还没完，easyAi 是引擎，是为 java 开发人员服务的，所以我要封装的更彻底！因此我又封装了完整的依赖于 easyAi 引擎的 AI 业务应用，共大家无脑调用！大家可以直接使用，或者修改后再融入到到自己的业务中。
- 到了此时 easyAI 才可以既满足了，了解算法知识，可以利用 easyAI 内置中底层算法工具深入开发的算法工作人员。也满足了只想利用现成应用业务代码，去满足自己系统内嵌，服务与自己系统 AI 的普通 java 业务开发人员的需求。
- 然后再强调一点，easyAI 并不是对主流算法 JAVA 的无差别重新实现，而是根据应用场景对主流算法进行了优化与魔改，让用户即便使用一台普通的电脑，就可开箱直接跑起来。并且保证普通服务器或个人电脑 CPU 下依然达到可用性能的流畅运行。所以我的“easy”并不是只是指的简单，而是对算法进行了廉价，低成本方向的优化。如果我没有办法对某种算法做到廉价优化的算法实现，我也不会放入 easyAI 里面。
- easyAI 的核心理念，为 java 开发者服务是一方面，另一方面是专注于针对性业务，高性能，低成本优化方向的中小模型的算法引擎

### 综上，我们总结出以下的背景

- 广泛性：easyAI 可以为占据国内半数程序员以上的 JAVA 业务程序员开发 AI 业务，提供底层算法引擎动力。
- 深入性：easyAI 无任何依赖，从底层基础算法工具到上层算法模型全囊括，可以支持专业性的深度开发，也可提供简单直接的业务层嵌入 AI，而且这一点在持续扩张中。
- 廉价性，主要关注针对性可嵌入业务系统中小模型，低训练样本需求，低算力需求，这两个方向去优化算法模型是 easyAI 的方向。
- 兼容性，因为是原生 JAVA 研发，无任何第三库依赖，所以对 JAVA 项目，引入包后就开箱即用，无任何环境异常会导致的问题。

## EasyAI 应用举例

- easyAI 下载链接:https://gitee.com/dromara/easyAi
- easyAI 主要 API 详情文档：https://wlhlwl.com/gw/easyAi.html
- easyAI 详细视频教程：https://www.bilibili.com/video/av89134035
- easyAI 是算法引擎，我们要直观感受它的强大，要从依赖它构建的应用化项目 DEMO 来看，这次我们拿出其中之一的应用案例--强大的自主智能客服工具，支持自动与用户对话，并捕捉用户对话中的需求后自动生成订单！可自主解答用户问题或进行诱导消费！基于 easyAi 算法引擎构建智脑——myJecs

## myJecs 分类配置及标注后台

- 登录页面![](/assets/img/news/EasyAI-0-0.png)
- 配置业务分类及分类订单必要关键信息![](/assets/img/news/EasyAI-0-1.png)
- 对分类业务填写训练样本并标注关键信息![](/assets/img/news/EasyAI-0-2.png)
- 聊天咨询标注直接输入表位置![](/assets/img/news/EasyAI-0-3.png)

## myJecs 智能客服基本流程演示

- 用户第一次进行输入表达自己的想法![](/assets/img/news/EasyAI-0-4.png)
- myJecs 发现用户的描述缺少订单必要信息，则进行反问。用户接收到 myJecs 的反问，进一步补充的自己的想法![](/assets/img/news/EasyAI-0-5.png)
- 用户第二次输入信息依然不满足后台 14 分类法律咨询的订单关键信息要求，继续补充信息，最终完成订单信息补充生成订单。![](/assets/img/news/EasyAI-0-6.png)
- 用户输入想要咨询的问题，myJecs 对用户咨询的问题进行自主解答![](/assets/img/news/EasyAI-0-7.png)

#### 以上是 myJecs 自定义业务接口的简单案例演示，具体安装部署及细节详情请到其主页下载: https://gitee.com/ldp\_dpsmax/my-jecs

## 架构设计

**常用底层算法模块**

- 基础矩阵及线代计算模块：

  1.内置矩阵类，矩阵计算类，可以完成常用矩阵四则运算，奇偶性，多元线性回归，逻辑斯蒂回归，欧式距离，余弦相似性，im2col，逆 im2col，求代数余子式，求逆，求伴随矩阵，内积等，微分等一系列 api。

  2.RGB 三通道矩阵，可进行图像转化，剪切，分块，生成图像矩阵等操作方便后续计算。

- 机器学习-聚类：

  k 聚类，混合高斯聚类，密度聚类，学习向量量化聚类等

- 机器学习-分类及拟合：多层前馈神经网络，多层循环神经网络，残差网络，多层残差循环神经网络，卷积神经网络，决策树，随机森林，k 最近邻等
- 启发式算法：粒子群，蚁群，模拟退火
- 强化学习 动态规划，蒙特卡洛分析，马尔可夫，时序差分

**常用上层算法模块**

- 视觉图像：图像识别，图片摘要，目标检测
- 自然语言：语义理解，拆词分词，推理敏感及关键词，语句补全，语言交流
- 游戏机器人：自主策略，自主行动

## 使用

1.将项目下载后打包进本地 maven 库

2.将 easyAi pom 文件引入地址引入项目

## 关注项目

对项目有什么想法或者建议，可以加我 qq 交流群(222475213)或 vx:thenk008，或者创建 issues，一起完善项目。**https://gitee.com/dromara/easyAi**
