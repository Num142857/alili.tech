---
title: 'Canvas 处理跨域图片终极方案'
tags: [JavaScript]
slug: g6kghla5ugc
keywords: 跨域,JavaScript,技巧,浏览器
date: 2019-01-10 16:14:25
---

浏览器因为安全问题,是不允许Canvas使用 `getImageData``toDataURL` 处理跨域获取的图片的.

# 传统解决方法

## 1.服务器需要配置Access-Control-Allow-Origin

相信这一行代码,大家见过太多,我就赘述了
```
header("Access-Control-Allow-Origin: 你的域名");
```


## 2.设置crossOrigin属性
```js
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var img = new Image();
img.crossOrigin = 'anonymous';  //就是这行代码
img.onload = function () {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
img.src = 'https://avatars3.xxxx.com/u/496048';
```

> 到这里,你的跨域问题已经基本解决. 但是因为一些客观因素后端工程师拒绝帮你设置跨域头,那你该怎么办?


 终极解决方案

大致思路是 使用ajax获取到图片,然后使用 `FileReader`转成base64;再使用canvas处理base64格式的图片就好了.

## 获取图片的base64
```js
function getBase64(imgUrl) {
  return new Promise(((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    // 声明一个XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // 获取图片
    xhr.open('get', imgUrl, true);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
      if (this.status === 200) {
        // 得到一个blob对象
        const blob = this.response;
        const oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          const base64 = e.target.result;
          //拿到base64 传出结果
          resolve(base64);
        };
        oFileReader.onerror = function (e) {
          reject();
        };
        oFileReader.readAsDataURL(blob);
      }
    };
  }));
}
```


## Canvas 操作图片

```js
const base64 = await getBase64(imgSrc);
const img = new Image();
img.src = base64;

// canvas 处理
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
img.onload = () => {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
```

> 今天就到这里