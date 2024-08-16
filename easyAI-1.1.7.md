---
title: easyAI v1.1.7 New version released, Java native AI algorithm development engine
author: easyAI
tag:
  - EasyAI
date: 2024-03-04
cover: /assets/img/news/easyAI-1.1.7-0.png
head:
  - - meta
    - name: News
---

# ![](/assets/img/news/easyAI-1.1.7-0.png)

## Introduction

easyAI is the 1 java pure native AI algorithm development engine, built-in a variety of machine learning, reinforcement learning, evolutionary learning and a variety of linear calculus algorithm tools. it also provides various encapsulated classes that can directly call api to implement their own functions, such as natural language, image recognition, and game strategy robots.
easyAI has optimized and innovated a variety of mainstream algorithms, making it able to meet the business performance requirements and performance requirements even with cpu deployment and low training samples. The pursuit of light and fast, small and beautiful, out of the box, so that the majority of small and medium-sized enterprises can easily deploy embedded AI modules for their own system services at low cost.

* easyAI download link: https://gitee.com/dromara/easyAi

* easyAI main API details document: https://wlhlwl.com/gw/easyAi.html

* easyAI detailed video tutorial: https://www.bilibili.com/video/av89134035


### v1.1.7 Update Content

* The performance optimization of the user semantic decision model that supports the application service "SayOrder" has been greatly improved, and the training speed has been increased by 50 times!

* The chat stability of the user question and answer model that supports the application service "SayOrder" is improved!

* remove redundant code, and add elu,relu6,selu and other activation functions, and several matrix bias derivative apis.

* "SayOrder" is the 1 system based on easyAI engine, which can chat with users independently and intelligently, capture users' needs, complete users' answering questions and guiding consumption, and can freely embed and serve the developer's internal system platform, and achieve the highest cost performance.

### Demonstration of the basic process of SayOrder self-generated orders and customer service Q & A

* The first time users make an input to express their ideas! [](/assets/img/news/easyAI-1.1.7-1.png)

* SayOrder it is found that the user's description lacks the necessary information for the order, it will be asked. Users received SayOrder rhetorical questions and further added their own ideas! [](/assets/img/news/easyAI-1.1.7-2.png)

* The information entered by the user for the second time still does not meet the key order information requirements of the background 14 classification legal consultation, continue to supplement the information, and finally complete the order information supplement to generate the order.! [](/assets/img/news/easyAI-1.1.7-3.png)

* Users enter the questions they want to consult, and SayOrder independently answer the questions they ask! [](/assets/img/news/easyAI-1.1.7-4.png)
  

### The above is a simple case demonstration of SayOrder custom business interface. Please download the specific installation and deployment and details from its homepage: https://gitee.com/dromara/sayOrder

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

If you have any ideas or suggestions on the project, you can add my qq communication group (222475213) or vx:thenk008, or create issues to improve the project together.

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/easyAI-1.1.7-5.png)