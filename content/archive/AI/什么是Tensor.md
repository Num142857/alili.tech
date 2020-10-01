---
title: TensorFlow中的Tensor是什么?
tags: [Daily, 数学, AI]
slug: 97enyq3a3m
keywords: 人工智能,计算机数学,计算机基础,计算机,前端学人工智能,每日功课
date: 2020-09-18 00:00:00
---


## Tensor(张量)

“张量”一词最初由威廉·罗恩·哈密顿在1846年引入。对，就是那个发明四元数的哈密顿：

![图 3](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/643fca018187d79da1be1bc50f3beb7544c7ff56ffd50d0b4d332952034daa1b.png)  


* Tensor实际上就是一个多维数组（multidimensional array）

* Tensor的目的是能够创造更高维度的矩阵、向量。

![图 1](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/61f12309aef252eb15cb7e168026f7bab180ea4a8cca2726d0ae4454c6003ba6.png)  


### 色彩的例子
彩色图像文件（RGB）一般都会处理成3-d tensor，每个2d array中的element表示一个像素，R代表Red，G代表Green，B代表Blue

![图 2](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/9d8d1f97a751a320d7ba127a3722691950609d6e21edc6fc1e983923d72096c8.png)  




## 多维数组

![图 4](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/6e86be5b727b21425ed87b5d2971b5f6ea9fa38cfe56455931faacd288085206.png)  


把三维张量画成一个立方体：

![图 5](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/0a29499dadc3caf5094316c2a6570a54489f552f36989a67590a2e717b654278.png)  


更高维的张量:

![图 6](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/f0cd642725a7b5b30592837c1fe8ec518816a170e57f74e577f1dfbcfaf6bb06.png)  



## 初始化一个向量

### 0维

```js
tf.tensor(1).print();
```

### 1维

```js
tf.tensor([1, 2, 3, 4]).print();
// or
tf.tensor1d([1, 2, 3]).print();
```

### 2维

```js
tf.tensor([[1, 2], [3, 4]]).print();
// or
tf.tensor2d([[1, 2], [3, 4]]).print();
```

### 3维

```js
tf.tensor([[[1], [2]], [[3], [4]]]).print();
// or
tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
```

### 4维

```js
tf.tensor([[[[1], [2]], [[3], [4]]]]).print();
// or
tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
```


### 5维

```js
tf.tensor([[[[[1], [2]], [[3], [4]]]]]).print();
// or
tf.tensor5d([[[[[1], [2]], [[3], [4]]]]]).print();
```


### 6维

```js
tf.tensor([[[[[[1],[2]],[[3],[4]]],[[[5],[6]],[[7],[8]]]]]]).print();
// or
tf.tensor6d([[[[[[1],[2]],[[3],[4]]],[[[5],[6]],[[7],[8]]]]]]).print();
```


