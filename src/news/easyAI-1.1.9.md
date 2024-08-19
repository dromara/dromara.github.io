---
title: Native Java Artificial intelligence algorithm framework easyAI v1.1.9 Version Release
author: easyAI
tag:
  - EasyAI
date: 2024-07-01
cover: /assets/img/news/easyAI-1.1.9-0.png
head:
  - - meta
    - name: News
---

![](/assets/img/news/easyAI-1.1.9-0.png)

## Preface

The significance of EasyAi to Java is the same as that of spring in JavaWeb fields-to be an out-of-the-box application so that every developer can use EasyAi to develop small and micro models that meet their own artificial intelligence business needs, which is its mission!

## EasyAi Introduction

EasyAi has no dependencies, it is a native Java artificial intelligence algorithm framework. First of all, * * it can be introduced into our Java project by Maven with one click without any additional environment configuration and dependency, so it can be used out of the box. **Furthermore, it not only has some modules for image target detection and artificial intelligence customer service that we have already packaged, but also provides a variety of deep learning, machine learning, reinforcement learning, heuristic learning, matrix operations, and other underlying algorithm tools. Through simple learning, developers can complete the in-depth development of small and micro models that meet their own business according to their own business.

* EasyAI Code Cloud Download Link: https://gitee.com/dromara/easyAi

* EasyAI GitHub download link: https://github.com/lifejwang11/easyAi

* EasyAI main technical document address: https://yhk.yhktech.com/easyai

* EasyAI detailed video tutorial: https://www.bilibili.com/video/av89134035

* JAVA Artificial Intelligence 0 Basic System Course: https://www.bilibili.com/cheese/play/ss17600
  

### v1.1.9 Update Content

* The stability of image target detection is increased, and adjustable parameters are added to balance performance and stability.

* Complete the functions of the image recognition API, enhance the performance, optimize the engineering and algorithm links of YOLO, simplify the API steps, and make the call clear and simple.


### Image recognition FastYolo effect display

* Using EasyAi to realize the visual kernel of image settlement vending machine

![](/assets/img/news/easyAI-1.1.9-1.jfif)

### sayOrder artificial intelligence customer service

* sayOrder is an artificial intelligence customer service system that relies on EasyAi for encapsulation.

* It can analyze the semantics of user input to identify user behavior, and distinguish user intent ID through typeID. And by capturing the keyword category set in its background, it can capture the content contained in the statement of the user concerned by the system, such as the time and place in the statement.

* It can also interact with users to answer questions independently, answer questions independently or communicate with other intentions.

* Project Link Address: https://gitee.com/dromara/sayOrder


### Demonstration of Basic Business Process for sayOrder Interaction

* The first time users make an input to express their ideas! [](/assets/img/news/easyAI-1.1.9-2.png)

* SayOrder it is found that the user's description lacks the necessary information for the order, it will be asked. Users received SayOrder rhetorical questions and further added their own ideas! [](/assets/img/news/easyAI-1.1.9-3.png)

* The information entered by the user for the second time still does not meet the key order information requirements of the background 14 classification legal consultation, continue to supplement the information, and finally complete the order information supplement to generate the order.! [](/assets/img/news/easyAI-1.1.9-4.png)

* Users enter the questions they want to consult, and SayOrder independently answer the questions they ask! [](/assets/img/news/easyAI-1.1.9-5.png)


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

* If you have any ideas or suggestions and studies on the project, you can add my work WeChat! [](/assets/img/news/easyAI-1.1.9-6.png)


About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/easyAI-1.1.9-7.webp)