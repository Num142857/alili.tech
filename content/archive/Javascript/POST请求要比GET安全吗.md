---
title: POST请求要比GET安全吗
tags: [JavaScript]
slug: b50a8cab
keywords: JavaScript,CSS,技巧,浏览器,http,Proxy,get,post
date: 2017-01-16 11:46:35
---

从学习发送请求的第一天,老师就告诉我们.
POST请求,要比GET请求要安全.

## 为什么?
在利用from发送请求的时代.get请求会夹带信息在地址栏里,而post不会.post会把信息放在body里面.

因为参数放在地址栏里的get请求,会让别人看得见.一些信息难免会暴露.

所以得出,post要比get更加安全.

> 后来公司新来了一名后台小哥,他说post要比get更安全,于是没有经过任何人同意,把所有的新增接口都设计成了post.当我联调的时候,看着这一连串的post请求,一脸懵逼.开发这么久,我从来不觉得这会有安全问题的存在.

公司前端都是AngularJs的SPA应用. 所以每次发送请求的方式都是Ajax.并不存在get请求的参数会暴露在地址栏的情况.

如果所有的接口,全部变成了post,那我们的代码会变成什么样子呢?

```javascript
//查找数据
$http.post("xxx.xxx.xxx")

//增加数据
$http.post("xxx.xxx.xxx")

//修改数据
$http.post("xxx.xxx.xxx")

//删除数据
$http.post("xxx.xxx.xxx")
```

所有的请求都是post,根本没有任何语义,一塌糊涂,非常不利于查看.


大家都知道,请求方式都好几种.

* GET
* POST
* HEAD
* PUT
* DELETE
* OPTIONS
* TRACE
* CONNECT


对于增删改查都有相应的方式,那我们的代码:

```javascript
//查找数据
$http.get("xxx.xxx.xxx")

//增加数据
$http.post("xxx.xxx.xxx")

//修改数据
$http.put("xxx.xxx.xxx")

//删除数据
$http.delete("xxx.xxx.xxx")
```

## 小结: 
在SPA应用里,POST并没有跟GET上有所谓安全性的差异.我们应该使用更加适合的请求方式,来发送以及请求数据.


