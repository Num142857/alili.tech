---
title: What is a Tensor in TensorFlow?
tags: [Daily, AI]
slug: eujpibnlnp8
keywords: Artificial Intelligence,Computer Mathematics,Computer Fundamentals,Computer,Front-end Learning AI,Daily Practice
date: 2020-09-18 00:00:00
---

## Tensor

The term "tensor" was first introduced by William Rowan Hamilton in 1846. Yes, that's the Hamilton who invented quaternions:

![Figure 3](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/643fca018187d79da1be1bc50f3beb7544c7ff56ffd50d0b4d332952034daa1b.png)  

* A Tensor is actually a multidimensional array

* The purpose of Tensor is to be able to create higher-dimensional matrices and vectors.

![Figure 1](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/61f12309aef252eb15cb7e168026f7bab180ea4a8cca2726d0ae4454c6003ba6.png)  

### Color Example
Color image files (RGB) are generally processed into 3-d tensors, where each element in the 2d array represents a pixel, R represents Red, G represents Green, B represents Blue

![Figure 2](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/9d8d1f97a751a320d7ba127a3722691950609d6e21edc6fc1e983923d72096c8.png)  

## Multidimensional Arrays

![Figure 4](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/6e86be5b727b21425ed87b5d2971b5f6ea9fa38cfe56455931faacd288085206.png)  

Drawing a three-dimensional tensor as a cube:

![Figure 5](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/0a29499dadc3caf5094316c3a6570a54489f552f36989a67590a2e717b654278.png)  

Higher-dimensional tensors:

![Figure 6](https://incomparable9527.coding.net/p/imageBed/d/imageBed/git/raw/master/f0cd642725a7b5b30592837c1fe8ec518816a170e57f74e577f1dfbcfaf6bb06.png)  

## Initializing a Vector

### 0-Dimensional

```js
tf.tensor(1).print();
```

### 1-Dimensional

```js
tf.tensor([1, 2, 3, 4]).print();
// or
tf.tensor1d([1, 2, 3]).print();
```

### 2-Dimensional

```js
tf.tensor([[1, 2], [3, 4]]).print();
// or
tf.tensor2d([[1, 2], [3, 4]]).print();
```

### 3-Dimensional

```js
tf.tensor([[[1], [2]], [[3], [4]]]).print();
// or
tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
```

### 4-Dimensional

```js
tf.tensor([[[[1], [2]], [[3], [4]]]]).print();
// or
tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
```

### 5-Dimensional

```js
tf.tensor([[[[[1], [2]], [[3], [4]]]]]).print();
// or
tf.tensor5d([[[[[1], [2]], [[3], [4]]]]]).print();
```

### 6-Dimensional

```js
tf.tensor([[[[[[1],[2]],[[3],[4]]],[[[5],[6]],[[7],[8]]]]]]).print();
// or
tf.tensor6d([[[[[[1],[2]],[[3],[4]]],[[[5],[6]],[[7],[8]]]]]]).print();
```
