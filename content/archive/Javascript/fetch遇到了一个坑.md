---
title: fetch遇到了一个坑
slug: d82a6654
date: 2016-06-08 22:52:35
keywords: JavaScript,CSS,技巧,浏览器,fetch
tags:
---
fetch 在跨域的情况下,不带cookie;

解决办法:

带上参数{credentials: 'include'}后才可以在请求里面带上cookie

```javascript
fetch('doAct.action', {credentials: 'include'}).then(function(res) {
    // ...
})
```
