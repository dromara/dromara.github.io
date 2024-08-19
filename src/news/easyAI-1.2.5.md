---
title: Native Java artificial intelligence algorithm framework easyAI v1.2.5 version released
author: EasyAi
tag:
  - EasyAI
date: 2024-08-19
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

*   EasyAI Code Cloud Download Links:https://gitee.com/dromara/easyAi
    
*   EasyAI Technical Document Address：https://www.myeasyai.cn/
    
*   EasyAI detailed video tutorial：https://www.bilibili.com/video/av89134035
    
*   EasyAI Framework 0 Basic Deep Development and Artificial Intelligence Complete System Tutorial：https://www.bilibili.com/cheese/play/ss17600
    

# v1.2.5 Update content

* Optimized for image stability and robustness, improved performance

* 'YoloConfig' is a configuration class for target detection. Version 1.2.5 adds several adjustable parameters to enhance its stability and robustness.

> 'private double stepReduce' is the window moving step during training, which is based on the shrinkage factor of the window size, and the value range is (0,1\]. Each time the actual training window traverses, the moving step size is 'stepReduce * windowWidth' and 'stepReduce * windowHeight', that is, the smaller the value is, the smaller the training step size is, and the smaller the step size is, the more suitable the situation that the training objects in the training sample are more and more intensive. The larger the step size, the more suitable it is for the case where the number of training objects in the sample photo is less and more sparse.
>>
> 'private double checkStepReduce' is the moving step size of the window during detection, which is based on the shrinkage factor of the window size, and the value range is (0,1\]. It is based on the shrinkage factor of the window size, and the value range is (0,1\]. Each time the actual detection window traverses, the moving step size is 'checkStepReduce * windowWidth' and 'checkStepReduce * windowHeight', that is, the smaller the value, the smaller the detection step size, and the smaller the step size, the more suitable for the situation that a single photo detects more and more dense objects. The larger the step size is, the more suitable it is for the case that there are fewer and more sparse objects to be detected in a single photo.
>>
> 'private int regularModel' regular mode, select different regular modes to bring different effects of enhancement, it is based on the weight of neurons to impose penalties, improve the sparseness of the weight to achieve the improvement of the effect.
>>
>> When the value is set to 'RZ. NOT_RZ' when there is no regular mode, no regular mode that is not to impose a penalty on the weight, when facing some specified shape, image size are relatively fixed industrial products, or when the sample data is large enough, you can directly use the no regular mode.
>>
>> When the value is set to 'RZ. L1' is the L1 regular mode, and L1 is very robust when there are outliers or unseen abnormal noise. It enhances its stability and robustness by simplifying the model and highlighting the key weights. There is a more useful expression when faced with variable shapes and fewer types of objects to be detected, such as faces, humans, animals and plants.
>>
>> When the value is set to 'RZ. L2', for the L2 regular mode, it is easier to mobilize all parameter features, so that the average of the features fall on each weight, the error is most likely to fall to the position of the optimal solution. The best optimization results can be obtained in the face of variable shapes and complex types, or large dimensions.
>>
> 'private double regular' regular coefficient, the value range is \[0,1), when the value is 0, there is no regular influence. adjusting to the appropriate regular coefficient helps to resist overfitting and enhance the robustness and stability of the network. the larger the value, the stronger the penalty for neuron weight, recommend the default value is 0.01

*   Face detection effect demonstration
    

![](/assets/img/news/easyAI-1.2.5-1.png)

### Image recognition FastYolo effect display

*   Using EasyAi to Realize Visual Kernel of Image Settlement Vending Machine
    

![](/assets/img/news/easyAI-1.2.5-2.jfif)

### sayOrder artificial intelligence customer service

* sayOrder is an artificial intelligence customer service system that relies on EasyAi for encapsulation.

* It can analyze the semantics of user input to identify user behavior, and distinguish user intent ID through typeID. And by capturing the keyword category set in its background, it can capture the content contained in the statement of the user concerned by the system, such as the time and place in the statement.

* It can also interact with users to answer questions independently, answer questions independently or communicate with other intentions.

* Project Link Address: https://gitee.com/dromara/sayOrder
    

### sayOrder interaction basic business process demonstration

* The first time users make an input to express their ideas
![](/assets/img/news/easyAI-1.2.5-3.png)

* SayOrder it is found that the user's description lacks the necessary information for the order, it will be asked. Users received SayOrder rhetorical questions and further added their own ideas
![](/assets/img/news/easyAI-1.2.5-4.png)

* The information entered by the user for the second time still does not meet the key order information requirements of the background 14 classification legal consultation, continue to supplement the information, and finally complete the order information supplement to generate the order.
![](/assets/img/news/easyAI-1.2.5-5.png)

* Users enter the questions they want to consult, and SayOrder independently answer the questions they ask
![](/assets/img/news/easyAI-1.2.5-6.png)


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

* If you have any ideas or suggestions and studies on the project, you can add my work WeChat
![](/assets/img/news/easyAI-1.2.5-7.jfif)