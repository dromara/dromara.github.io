---
title: Quantitative software industry spoiler, northstar 7.0 official version of the strong debut
author: northstar
date: 2024-02-01
tag:
  - 
cover: /assets/img/blog/northstar-7.0-0.png
head:
  - - meta
    - name: Blog
---

Let's take a look at what skills this troublemaker has and dare to challenge a large number of commercial quantitative software.

## One-stop platform

Those who speculate in foreign exchange know to use MT4 and MT5; those who do domestic futures know to use Wenhua, MC, Pioneer and Pyramid; those who do stocks have heard of PTrade and QMT ...... Every time they switch trading platforms, they are all time-consuming and laborious re-learning. People can't help but ask, why can't you platforms be a one-stop shop?

northstar the author himself suffered from it. Therefore, northstar has been determined to be a one-stop platform from the beginning of its birth, vowing to let users regain their dominance; instead of letting us constantly cater to different software vendors and exchanges.

To this end, the overall design of the northstar is as follows:

![](/assets/img/blog/northstar-7.0-0.png)

As can be seen from the figure, no matter what exchange, as long as it provides a public API interface, it can be connected to the exchange by implementing an adapter module in the northstar, so as to realize the docking of any exchange.

At present, the docking has been achieved with domestic futures CTP, coin security, tiger securities.

## Privatization Deployment

In addition to many of the client-side commercial software mentioned above, there are also many that provide quantitative services in the form of SaaS tenants, such as a certain width, a certain basket, etc. The most deadly problem with SaaS services is the security of trading strategies. No matter how much the platform emphasizes that the deployment of trading strategies is safe, it is not as safe as it can be deployed privately.

northstar genetically determines that the code of the project is absolutely controllable by the user. The deployment process is also completely handled by the user. Fundamentally eliminate the risk of code leakage hidden dangers.

In order to take into account the update iteration of the general framework of the main program and the privacy of the user policy code, the main program adopts a flexible pluggable design. As long as the user runs the policy code package in the same directory as the main package, the main program can automatically load the user policy. The whole process is very simple and natural. (In the following figure, the northstar is the main package and the northstar-external is the user policy package)

![](/assets/img/blog/northstar-7.0-1.png)

As shown in the figure, not only the user's policy code can enjoy such smooth pluggable functions, but also the rest of the expandable modules can achieve better scalability.

## Full link monitoring

A mature quantitative trading program must be deployed on the server to run uninterrupted for a long time, for which a set of full-link monitoring means is essential. Thanks to the mature web application ecology, northstar has also created a 1 set of monitoring system to escort transactions.

In advance, users can create automated trading modules through computer or mobile web pages.

![](/assets/img/blog/northstar-7.0-2.png)

The above picture shows the computer interface

![](/assets/img/blog/northstar-7.0-3.png)

The above picture shows the mobile phone interface

In the event, you can use WeChat or email to receive transaction dynamics and abnormal prompts from the program in a timely manner.

![](/assets/img/blog/northstar-7.0-4.png)

After the event, the program log and the module run log can be checked separately.

![](/assets/img/blog/northstar-7.0-5.png)

This creates a reassuring automated trading system.

## Intelligent trading

Intelligent trading is a necessary threshold for the next generation of quantitative software (at least that's how I understand it). With the popularity of artificial intelligence algorithms, more and more trading scenarios need to be applied to deep learning frameworks.

To this end, northstar 7.0 has integrated artificial intelligence capabilities as a major core feature of the major version upgrade, with the help of a more popular Tensorflow framework, so that northstar can call already trained neural network models. Thanks to the northstar's good scalability design, the ability to integrate artificial intelligence is not easy, at least it is a Ma Pingchuan.

![](/assets/img/blog/northstar-7.0-6.png)

As shown in the figure above, the new artificial intelligence capability essentially unifies the method of data sampling and adds a pre-trained model. The data sampling method is completely implemented by a custom strategy. In the training phase, the playback engine provided by the framework drives the collection of sampling data, so that the Tensorflow can have enough data for training, and in the real stage, the pre-trained model is pre-loaded, and then the neural network's reasoning results can be easily derived. In order to achieve the artificial intelligence algorithm to enhance the strategy.

northstar supported trading models include, but are not limited to, CTA indicator trading, contract spread trading, high-frequency TICK algorithm trading, cross-market arbitrage trading, and more. The addition of artificial intelligence algorithms superimposed on different trading modes can greatly improve the winning rate of trading.

## Low cost operation

northstar just rely on the understated features of the above intelligent transactions and put any 1 software on the market, the annual software usage fee is not as small as 10 thousands or 20 thousands yuan, which is basically impossible. To put it more modestly, there are few who want to collect the above four characteristics. What makes users even more amazing is that its cost of use is only about less than one-tenth of the price.

Since the northstar project itself is a free open source project, the equivalent software is freely available. After all, the marginal cost of software products is almost zero, the large number of software vendors software costs are expensive, mainly because of the marketing costs and corporate management costs are relatively high. It is because of the high cost of software that northstar authors have the urge to create northstar. Therefore, northstar at the beginning of its birth comes with grass-roots dragon slaying properties. As the famous saying goes, "from the masses to the masses".

Everything has two sides, northstar the biggest cost is the user's learning cost. Therefore, as a northstar user needs to have a certain JAVA programming ability, if you want to use AI ability, you also need to have the same technical ability as AI engineers. But from a northstar author's point of view, these are essential skills to be a 1 quantitative trader. Therefore, I believe that all users who intend to quantify transactions in into the pit will have full psychological expectations of the challenges they face.

In addition to the cost of learning, there are also the insignificant server costs, data service costs, and so on.

As a free open source project, northstar project is not selling software at all. From the perspective of the northstar author, it is more like doing a net red IP, aiming to build a grassroots quantitative ecological community. Capable participants are welcome to provide valuable paid value-added services in the community, and more users are needed to support the purchase of community value-added services to help the community develop and grow.

## Personalized customization

northstar have a good scalability design, allowing users to expand on their own as needed.

The community brings together many excellent developers and can provide customized services for a fee. Welcome Party A's father to experience VIP customized services.

  

  

* * *

  

## northstar 7.0 version upgrade instructions

> after introducing the competitiveness of the products, it is time to explain to the old fans some major improvements in this v7.0 upgrade.

**Refactored core classes to optimize memory usage * *


In order to better verify the optimization effect, I specially did an A/B test. Back-test the same batch of modules for the same back-test cycle and observe their memory usage.

![](/assets/img/blog/northstar-7.0-7.jfif)

![](/assets/img/blog/northstar-7.0-8.jfif)

The memory operation before optimization is as follows:

![](/assets/img/blog/northstar-7.0-9.jfif)

The optimized memory operation is as follows:

![](/assets/img/blog/northstar-7.0-10.jfif)

It can be clearly seen that the optimized memory growth rate is significantly reduced, and the final physical memory occupied is also significantly reduced.

**Upgraded JDK21, introduced virtual threads * *


All the logic of the main program involving IO operations is optimized for virtual threads. For example, save K-line data, send real-time quotes, etc.

* Integrated Tensorflow deep learning capabilities


As mentioned earlier, the strategy can be loaded with Tensorflow pre-trained models to optimize the strategy's odds.

* **Notes * *


Due to the springboot3 upgrade, the H2 database upgrade caused data incompatibility, and data files must be removed or data migration must be performed.



