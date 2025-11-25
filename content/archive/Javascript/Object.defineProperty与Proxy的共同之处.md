---
title: Object.defineProperty与Proxy的共同之处
tags: [JavaScript]
slug: 4c861783
keywords: JavaScript,CSS,技巧,浏览器,Object.defineProperty,Proxy
date: 2017-06-01 11:33:33
---
在看vue文档的时候发现一个有意思的地方.
就是关于Object.defineProperty的利用与Proxy有相似之处.非常有意思.

文档是这样说的:

> 把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。

## Object.defineProperty
语法：
```javascript
Object.defineProperty(obj, prop, descriptor)
```

* obj：必需。目标对象 
* prop：必需。需定义或修改的属性的名字
* descriptor：必需。目标属性所拥有的特性

返回值:

传入函数的对象。即第一个参数obj


## getter/setter 存取器描述

当使用存取器描述属性的特性的时候，允许设置以下特性属性：


```javascript
var obj = {};
Object.defineProperty(obj,"newKey",{
    get:function (){} | undefined,
    set:function (value){} | undefined
});
```

当设置或获取对象的某个属性的值的时候，可以提供getter/setter方法。

``` javascript
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,"newKey",{
    get:function (){
        //当获取值的时候触发的函数
        return initValue;    
    },
    set:function (value){
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        initValue = value;
    }
});
//获取值
console.log( obj.newKey );  //hello

//设置值
obj.newKey = 'change value';

console.log( obj.newKey ); //change value
```


是不是很神奇? 

但是看到这里,突然想到之前文章里提到过的ES6里新增的Proxy.

举个例子:

``` javascript
var obj={
  a:1
}
var proxyObj =  new Proxy(obj,{ //proxyObj会继承obj
    set:function(){
      alert("我被修改了")
    },
    get:function(){
        alert("我被获取了")
    }
  });

  //修改属性
  proxyObj.a=2; //属性被修改后,之前设置的handler会被触发
  console.log(obj.a) // 2
```


> 今天就到这里,祝儿童节快乐.