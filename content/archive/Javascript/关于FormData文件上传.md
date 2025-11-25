---
title: 关于FormData文件上传
slug: 3f5c7ee8
date: 2016-06-03 23:46:35
keywords: JavaScript,CSS,技巧,浏览器,http,Proxy,FormData,上传
tags:
---
关于文件上传

在新时代里,使用input file 选取文件,
然后我们查到这dom对象的时候,把这个对象传进 Formdata,
 ```javascript
 var filedata = document.getElementById('file');

 var formData= new FormData();

 formData.append('file',filedata);

 var xhr = new XMLHttpRequest();

 xhr.open('post','url',true);
 xhr.send(formData);
 xhr.onreadystatechange= function(){
    if(xhr.readyState = 4 &&xhr.staus == 200){
        do something....
    }
 }
 ```
<!-- more -->
 or

  ```javascript
  //假设 html已经有一个form,并且包含一个input type="file"
 var form = document.getElementById('form');

 //我们只要传进 FormData 就可以了
 var formData= new FormData(form);

 var xhr = new XMLHttpRequest();

 xhr.open('post','url',true);
 xhr.send(formData);
 xhr.onreadystatechange= function(){
    if(xhr.readyState = 4 &&xhr.staus == 200){
        do something....
    }
 }
 ```


在没有FormData的年代,我们是用form上传文件

用js创建一个form表单,里面放几个input,
然后提交 也能完成表单提交
