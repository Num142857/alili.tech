---
title: Common Ground Between Object.defineProperty and Proxy
tags: [JavaScript]
slug: object-defineproperty-and-proxy-common-ground
keywords: JavaScript,CSS,tips,browser,Object.defineProperty,Proxy
date: 2017-06-01 11:33:33
---
When reading Vue documentation, I found an interesting point.
It's about how Object.defineProperty is used similarly to Proxy. Very interesting.

The documentation says:

> When you pass a plain JavaScript object to a Vue instance's data option, Vue will walk through all of this object's properties and convert them to getter/setter using Object.defineProperty.

## Object.defineProperty
Syntax:
```javascript
Object.defineProperty(obj, prop, descriptor)
```

* obj: Required. Target object 
* prop: Required. Name of the property to define or modify
* descriptor: Required. Descriptor for the target property

Return value:

The object passed to the function. That is, the first parameter obj


## getter/setter Accessor Descriptor

When using accessor descriptors to describe property characteristics, the following characteristic properties are allowed:


```javascript
var obj = {};
Object.defineProperty(obj,"newKey",{
    get:function (){} | undefined,
    set:function (value){} | undefined
});
```

When setting or getting the value of an object's property, getter/setter methods can be provided.

``` javascript
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,"newKey",{
    get:function (){
        //Function triggered when getting value
        return initValue;    
    },
    set:function (value){
        //Function triggered when setting value, new value is obtained through parameter value
        initValue = value;
    }
});
//Get value
console.log( obj.newKey );  //hello

//Set value
obj.newKey = 'change value';

console.log( obj.newKey ); //change value
```


Isn't it amazing? 

But when I saw this, I suddenly thought of Proxy, which was mentioned in a previous article.

For example:

``` javascript
var obj={
  a:1
}
var proxyObj =  new Proxy(obj,{ //proxyObj will inherit obj
    set:function(){
      alert("I was modified")
    },
    get:function(){
        alert("I was accessed")
    }
  });

  //Modify property
  proxyObj.a=2; //After property is modified, the previously set handler will be triggered
  console.log(obj.a) // 2
```


> That's all for today, Happy Children's Day.

