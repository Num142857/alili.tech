---
title: 'Canvas Cross-Origin Image Ultimate Solution'
tags: [JavaScript]
slug: g6kghla5ugc
keywords: Cross-Origin,JavaScript,Tips,Browser
date: 2019-01-10 16:14:25
---

Browsers, for security reasons, do not allow Canvas to use `getImageData` `toDataURL` to process cross-origin fetched images.

# Traditional Solutions

## 1. Server Needs to Configure Access-Control-Allow-Origin

I believe everyone has seen this line of code too many times, I won't elaborate
```
header("Access-Control-Allow-Origin: your-domain");
```

## 2. Set crossOrigin Attribute
```js
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var img = new Image();
img.crossOrigin = 'anonymous';  // This line of code
img.onload = function () {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
img.src = 'https://avatars3.xxxx.com/u/496048';
```

> Up to here, your cross-origin problem is basically solved. But because of some objective factors, backend engineers refuse to help you set cross-origin headers, what should you do?

 Ultimate Solution

General idea is to use ajax to fetch the image, then use `FileReader` to convert to base64; then use canvas to process the base64 format image.

## Get Image's base64
```js
function getBase64(imgUrl) {
  return new Promise(((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    // Declare an XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Fetch image
    xhr.open('get', imgUrl, true);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
      if (this.status === 200) {
        // Get a blob object
        const blob = this.response;
        const oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          const base64 = e.target.result;
          // Get base64, output result
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

## Canvas Image Operations

```js
const base64 = await getBase64(imgSrc);
const img = new Image();
img.src = base64;

// canvas processing
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
img.onload = () => {
    context.drawImage(this, 0, 0);
    context.getImageData(0, 0, this.width, this.height);
};
```

> That's all for today

