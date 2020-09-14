---
title: Puppeteer在工作中是如何伪装自己的(爬虫与反爬虫)
tags: [puppeteer]
slug: 7fp151i7xnf
keywords:  Nodejs,ts,map,typescript,puppeteer,Chrome,浏览器
date: 2020-08-29 20:32:05
---

为了更好保护我们的数据与程序安全.

今天就介绍一下,如何检测访问我们的web程序是否为无头浏览器,
以及他们的一些反检测的方法.

## Webdriver检测

一般来说,如果是无头浏览器模式下, `navigator.webdriver` 会返回 `true`.

### 检测方式

最简单的检测方式
```js
if (navigator.webdriver) {
  // 针对无头浏览器的操作
}
```

#### 使用defineProperty删除webdriver后如何检测

如果对方使用以下方式删除了webdriver属性,其实还是有办法检测的

```js
 Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
 })
```

#### 应对方案

以下方式,还是可以检测出来

```js
webdriver in navigator
```

```js
navigator.hasOwnProperty("webdriver")
```


### 绕过方法

直接删掉webdriver属性,这是我目前验证成功的方法.
目前其他网上找到的方法已经无效.

```js
await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });
```

## chrome属性检测


### 检测方式
在无头浏览器模式下,全局对象下的chrome对象是没有 `runtime`属性的

```js
if (!window.chrome || !window.chrome.runtime) {
  // 无头浏览器模式...
}
```

### 绕过方法

所以绕过方法也很简单,我们只需要伪造一个

```js
window.navigator.chrome = {
    runtime: {}
  };
```

如果是Puppeteer 我们跟上面一样,只要提前运行一下上面的代码就好了.

```js
await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
        runtime: {}
      };
  });
```

## 尾巴

其他网络上的方法我都尝试过,可以成功的我都放在了这里.
因为浏览器跟反爬虫方式时时刻刻都会更新,所以可能当你看到这篇文章的时候.
有的方式已经不能用了,但是核心点还是要善于观察力与对比.
所有的形式都可以有伪装与绕过的方法.大致思路都跟上面提到的差不多.

