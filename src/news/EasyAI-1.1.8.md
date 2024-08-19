---
title: Java Native AI algorithm development engine EasyAI v1.1.8 Version Release
author: easyAI
tag:
  - EasyAI
date: 2024-05-06
cover: /assets/img/news/EasyAI-1.1.8-0.png
head:
  - - meta
    - name: News
---

  

![](/assets/img/news/EasyAI-1.1.8-0.png)

## Introduction

> easyAI is the 1 java pure native AI algorithm development engine, built-in a variety of machine learning, reinforcement learning, evolutionary learning and a variety of linear calculus algorithm tools. it also provides various encapsulated classes that can directly call api to implement their own functions, such as natural language, image recognition, and game strategy robots.

> easyAI has optimized and innovated a variety of mainstream algorithms, making it able to meet business performance requirements and performance requirements even with cpu deployment and low training samples. The pursuit of light and fast, small and beautiful, out of the box, so that the majority of small and medium-sized enterprises can easily deploy embedded AI modules for their own system services at low cost.

* easyAI Code Cloud Download Link: https://gitee.com/dromara/easyAi

* easyAI GitHub download link: https://github.com/lifejwang11/easyAi

* easyAI main API details document: http:// 146.56.228.93

* easyAI detailed video tutorial: https://www.bilibili.com/video/av89134035

* JAVA Artificial Intelligence 0 Basic System Course: https://www.bilibili.com/cheese/play/ss17600


### v1.1.8 update content

* Added support for OCR API

* Complement the functions of the image recognition API, enhance performance, optimize YOLO engineering, simplify API steps, and make calls clear and simple.


### Image recognition FastYolo effect display

* Recognition and positioning of characters in images


! [](/assets/img/news/EasyAI-1.1.8-1.jfif)

### Natural Language SayOrder Generates Orders and Customer Service Questions and Answers Basic Process Demonstration

* The first time users make an input to express their ideas! [](/assets/img/news/EasyAI-1.1.8-2.png)

* SayOrder it is found that the user's description lacks the necessary information for the order, it will be asked. Users received SayOrder rhetorical questions and further added their own ideas! [](/assets/img/news/EasyAI-1.1.8-3.png)

* The information entered by the user for the second time still does not meet the key order information requirements of the background 14 classification legal consultation, continue to supplement the information, and finally complete the order information supplement to generate the order.! [](/assets/img/news/EasyAI-1.1.8-4.png)

* Users enter the questions they want to consult, and SayOrder independently answer the questions they ask! [](/assets/img/news/EasyAI-1.1.8-5.png)


### The above is a simple case demonstration of SayOrder (based on easyAI engine) custom business interface. For details of installation and deployment, please download it from its homepage: https://gitee.com/dromara/sayOrder

### Architecture Design

**Common underlying algorithm modules * *

* Basic matrix and line generation calculation module:

1. built-in matrix class and matrix calculation class, which can complete a series of apis such as four common matrix operations, parity, multiple linear regression, logistic regression, European distance, cosine similarity, im2col, inverse im2col, algebraic coform, inverse, adjoint matrix, inner product, differential, etc.

2.RGB three-channel matrix, which can be used for image conversion, cutting, blocking, generating image matrix and other operations to facilitate subsequent calculations.

* Machine Learning-Clustering:

k clustering, mixed Gaussian clustering, density clustering, learning vector quantization clustering, etc.

* Machine learning-classification and fitting: multilayer feedforward neural networks, multilayer recurrent neural networks, residual networks, multilayer residual recurrent neural networks, convolutional neural networks, decision trees, random forests, k-nearest neighbors, etc.

* Heuristic algorithm: particle swarm, ant colony, simulated annealing

* Reinforcement learning dynamic programming, Monte Carlo analysis, Markov, temporal difference


**Common upper algorithm module * *

* Visual image: image recognition, image abstract, object detection

* Natural language: semantic understanding, word splitting, reasoning sensitivity and key words, sentence completion, language communication

* Game robot: autonomous strategy, autonomous action


### Use

1. Download the project and package it into the local maven library.

2. Introduce the easyAi pom file into the address into the project.

### Concerned about the project

* If you have any ideas or suggestions on the project, you can add my work WeChat.


! [](/assets/img/news/EasyAI-1.1.8-6.png)



About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/EasyAI-1.1.8-7.webp)