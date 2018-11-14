---
title: 关于HTML5 History API
tags: Javascript
slug: e8e7fab1
keywords: Javascript,css,History,浏览器,http,HTML5
date: 2016-06-06 23:52:35
---
关于HTML5 History API

html5加强了history,
在spa页面里面,有两种方法可以修改了网址页面不用刷新,
1. 修改页面的hash值,
2. 利用html5加强后了的pushState


先说所有浏览器都可以使用hash
hash 就是我们以前所说的锚点
我们对他并不陌生,
我们可以通过


```javascript
location.hash="212345"
```
<!-- more -->
就可以设置网址的hash值,下面是表现形式:

> www.xxx.com#212345

在html里利用a标签也是可以修改hash的
```html
<a href="#123456"></a>
```

当我们修改hash的时候,我们会触发一个事件:

```JavaScript
window.onhashchange = function(){
   //do something
}
```



hash暂且说到这里,下面我们说 pushState

pushState 是history下面的方法

所以我们调用的时候是:

```JavaScript
history.pushState()
```
pushState系列 一共有两个方法,一个事件

```
history.pushState(state, title, url);
history.replaceState(state, title, url);

window.onpopstate
```


##### pushState

pushState一共有三个参数,

state: 可以放任意你想放的数据，它将附加到新url上，作为该页面信息的一个补充。

title: 顾名思义，就是document.title。不过这个参数目前并无作用，浏览器目前会选择忽略它。

url: 新url，也就是你要显示在地址栏上的url。

pushState 运行之后,可以记录history


##### replaceState
也三个参数,作用跟上面是一样的

唯一的不同点是不会记录history

##### window.onpopstate

history.pushState()不会触发这个事件
history.replaceState()也不会触发这个事件,

当页面前进回退的时候会触发这个事件

事件可以拿到PopStateEvent对象,可以获取到很多关于state的信息
