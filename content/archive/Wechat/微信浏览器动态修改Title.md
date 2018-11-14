---
title: 微信浏览器动态修改Title
tags: weChat
slug: 1e2d080b
keywords: 微信,浏览器,修改title
date: 2016-05-26 11:43:05
---

## 微信浏览器动态修改Title

为什么会有这么一篇文章?之前在做spa页面开发的时候,发现了一件非常匪夷所思的事情.

下面这段代码在微信浏览器里,是无效的.

```javascript
document.title = "我是标题"
```

标题第一次生成后,就无法在改变.

不过没有关系,

下面我们用黑魔法般的代码,来完成微信浏览器里title的修改.

<!-- more -->

```javascript
document.title = "我是标题";
var iframe = document.createElement("iframe");
iframe.src = "/favicon.ico";
document.body.appendChild(iframe);
iframe.onload = function() {
  setTimeout(function() {
    document.body.removeChild(iframe);
  }, 0)
}
```

就是这样,title改变了.
