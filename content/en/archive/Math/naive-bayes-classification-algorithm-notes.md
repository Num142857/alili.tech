---
title: Math - Naive Bayes Classification Algorithm (Notes)
tags:
  - Daily
  - Math
slug: 6iwpimvelxh
keywords: 'Artificial Intelligence,Computer Mathematics,Computer Fundamentals,Computer,Front-end Learning AI,Daily Practice'
date: 2020-09-14T00:00:00.000Z
---

## Naive Bayes

> "After updating our initial beliefs about something with objective new information, we get a new, improved belief."
>  ---- Mathematician Thomas Bayes (1702～1761)

When you cannot accurately know the essence of something, you can rely on how many events related to that specific essence appear to judge the probability of its essential attributes.

The more events that support a certain attribute occur, the more likely that attribute is to be true.

In 1774, French mathematician Pierre-Simon Laplace (1749-1827) independently rediscovered Bayes' formula.

![Figure 16](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/3d6c983eec1f9283cb79904d2cc4cc1c7ee9654d73874ce1daf498b94fd23358.png)  

Alternative notation:

![Figure 17](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/a1ace7950302e8e260f8397ea6c765ad2affa502ebc48d64f8b437e03eaf57ac.png)  

## Making Computers Distinguish Fruits

We need to convert fruit characteristics into data that computers can understand. The most common way is to extract attributes of objects in the real world and convert them into numbers.

For example: shape, skin color, zebra texture, weight, grip feel, taste.

![Figure 19](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/a99743fd96d79a2d6d343ef81f988c32f9ea4b28a8ad5c2391c2658ba60c188b.png)  

Convert these descriptions into numbers, converting weight from continuous values to discrete values, because Naive Bayes processes discrete values.

![Figure 20](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/c6c05b372ef0736d10734971409f755698ca90913095af1e752a7ecee88f9e7a.png)  

Expand the sample. Just 3 fruits are not enough to constitute the training sample required for Naive Bayes classification.

![Figure 21](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/d485cea0f343ac13f4056b4ec0042563ae0866e275ab17b45ad7aecedc4f41f9.png)  

### How We Use Bayes' Formula

> Estimate posterior probability using prior probability and conditional probability.

![Figure 22](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/a725fc90f77e944d101977ea08e273e05f77c4160eb3ecf861a952a8719b8ac1.png)  

Assume that different attributes of a data object are independent when affecting its classification. If attributes fi and fj appear simultaneously in data object o, then the probability that object o belongs to category c is:

> The Naive Bayes algorithm assumes that features are independent of each other, which is why both sides can be equal. This is also the origin of the word "naive" in Naive Bayes classification.

![Figure 23](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/890407d644aa61250ee7e983ec0fd8e161679f7ff7e29a02bab486922a42e607.png)  

Use data from 10 fruits to build a Naive Bayes model.

![Figure 24](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/6ec393ee25603bb065911573df41cc0ce291e26087cb78c1a2f80b64e3739eb1.png)  

#### Smoothing
Situations where the result is 0 will occur, so we usually take a very small value smaller than the minimum statistical probability in this dataset to replace "zero probability". For example, we take 0.01 here. When filling attribute values that have never appeared in training data, we use this technique, which we call Smoothing.

### Example:

Suppose we have a new fruit with a round shape and sweet taste. According to Naive Bayes, what are the probabilities that it belongs to apple, sweet orange, and watermelon respectively?

![Figure 25](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/e7bb1d2b6d6271b843f6fe43a407494899f04695c881ed0971f8ad09b862abdb.png)  

apple represents classification as apple, shape-2 represents the shape attribute value of 2 (i.e., round), taste-2 represents the taste attribute value of 2. Similarly, we can calculate the probability that this fruit belongs to sweet orange and watermelon.

![Figure 26](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/566411191bd8528f098fcae1cb13f0ff42a4b689de1e6f364b8dfbd38ebeb8f3.png)  

Comparing these three values, 0.00198<0.00798<0.26934, so the computer can conclude that the fruit is most likely a sweet orange.

### Naive Bayes Classification Mainly Includes These Steps

* `Prepare Data`: For the fruit classification case, we collected several fruit instances and converted them into data that computers can understand starting from common fruit attributes. This data is also called training samples.
  
* `Build Model`: Through fruit instances at hand, we let the computer count the prior probability of each fruit and attribute occurrence, as well as the conditional probability of a certain attribute appearing under a certain fruit classification. This process is also called sample-based training.
  
* `Classify New Data`: For a new fruit's attribute data, the computer performs derivation calculations based on the established model to obtain the probability that the fruit belongs to each classification, achieving the purpose of classification. This process is also called prediction.

### Advantages and Disadvantages of Naive Bayes Classification

* Advantages:

 1. Simple algorithm logic, easy to implement

 2. Small time and space overhead during classification

* Disadvantages:

Theoretically, Naive Bayes models have the smallest error rate compared to other classification methods. But in practice, this is not always the case, because Naive Bayes models assume that attributes are independent of each other. This assumption is often not true in practical applications. When there are many attributes or high correlation between attributes, classification performance is poor.
