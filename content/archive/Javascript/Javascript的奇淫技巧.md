---
title: Javascript的奇淫技巧
tags: [Javascript]
slug: 7807a0b7
keywords: Javascript,css,技巧,浏览器
date: 2016-05-25 11:33:33
---

## 类型转换
### 数组转字符串

```javascript
var arr = [1,2,3,4,5,6];
var str = arr+''; //1,2,3,4,5,6
```

### 字符串转数字

```javascript
var str = '999';
var num = str * 1; //999

var str = '999';
var num = str - 0; //999
```


### 字符串转数字

```javascript
var str = '999';
var num = str * 1; // 999
```

### 向下取整

```javascript
var num = ~~1.23232656; //  1

var num = 563.933333 >> 0; //  563
```
<!-- more -->
### boolean 转换

```javascript
var bool = !!null; //  false
var bool = !!'null'; //  true

var bool = !!undefined; //  false
var bool = !!'undefined'; //  true

var bool = !!0; //  false
var bool = !!'0'; //  true

var bool=!!''; // true
var bool=!![]; // true
var bool=!!{}; // true

var bool=!!new Boolean('false'); // true
var bool=!!new Boolean('true'); // true
```

--------------------------------------------------------------------------------

## 判断对象下面是否有此属性

### 直接判断

```javascript
var obj = {a:123};
if(obj.a){  //obj.b ==>123
console.log('运行了') //可以运行
}

if(obj.b){   //obj.b ==>undefined
console.log('运行了') //没有运行
}

var obj2 = {a:false};
if(obj2.a){  //obj.b ==>false
console.log('运行了') //没有运行
}
// 不严谨,如果值为0,undefined,false,null... 也会判断为false
```



### in 操作符

```javascript
var obj = {a:123};
if('a' in obj){ // 'a' in obj ==>true
console.log('运行了') //可以运行
}

if('b' in obj){// 'a' in obj ==>false
console.log('运行了') //没有运行
}
```

### 利用hasOwnProperty

```javascript
var obj = {a:123};
if(obj.hasOwnProperty('a')){   //==>true
console.log('运行了') //可以运行
}

if(obj.hasOwnProperty('b')){  //==>false
console.log('运行了') //没有运行
}
```

> 还有好多好多,得慢慢写
