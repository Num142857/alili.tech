---
title: JavaScript Tricks
tags: [JavaScript]
slug: javascript-tricks
keywords: JavaScript,CSS,tips,browser
date: 2016-05-25 11:33:33
---

## Type Conversion
### Array to String

```javascript
var arr = [1,2,3,4,5,6];
var str = arr+''; //1,2,3,4,5,6
```

### String to Number

```javascript
var str = '999';
var num = str * 1; //999

var str = '999';
var num = str - 0; //999
```


### String to Number

```javascript
var str = '999';
var num = str * 1; // 999
```

### Round Down

```javascript
var num = ~~1.23232656; //  1

var num = 563.933333 >> 0; //  563
```
<!-- more -->
### Boolean Conversion

```javascript
var bool = !!null; //  false
var bool = !!'null'; //  true

var bool = !!undefined; //  false
var bool = !!'undefined'; //  true

var bool = !!0; //  false
var bool = !!'0'; //  true

var bool=!!''; // false
var bool=!![]; // true
var bool=!!{}; // true

var bool=!!new Boolean('false'); // true
var bool=!!new Boolean('true'); // true
```

--------------------------------------------------------------------------------

## Check if Object Has Property

### Direct Check

```javascript
var obj = {a:123};
if(obj.a){  //obj.b ==>123
console.log('ran') //will run
}

if(obj.b){   //obj.b ==>undefined
console.log('ran') //won't run
}

var obj2 = {a:false};
if(obj2.a){  //obj.b ==>false
console.log('ran') //won't run
}
// Not rigorous, if value is 0, undefined, false, null... will also be judged as false
```



### in Operator

```javascript
var obj = {a:123};
if('a' in obj){ // 'a' in obj ==>true
console.log('ran') //will run
}

if('b' in obj){// 'a' in obj ==>false
console.log('ran') //won't run
}
```

### Using hasOwnProperty

```javascript
var obj = {a:123};
if(obj.hasOwnProperty('a')){   //==>true
console.log('ran') //will run
}

if(obj.hasOwnProperty('b')){  //==>false
console.log('ran') //won't run
}
```

> There are many more, need to write slowly

