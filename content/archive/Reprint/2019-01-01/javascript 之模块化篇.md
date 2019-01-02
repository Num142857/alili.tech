---
title: 'javascript 之模块化篇' 
date: 2019-01-01 2:30:07
hidden: true
slug: rbhuvlun8y
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">什么是模块化？</h1>
<p>模块化就是把系统分离成独立功能的方法，这样我们需要什么功能，就加载什么功能。</p>
<p>优点：<br>可维护性：根据定义，每个模块都是独立的，良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护。<br>可复用性：可以重复利用，而不用经常复制自己之前写过的代码</p>
<h1 id="articleHeader1">原始JS开发问题</h1>
<p>1、污染全局变量<br>//a.js 文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test1='aaaaaa';
//b.js 文件
var test1='bbbbbb';
 <script>
    console.log('test1='+test1);//bbbbbb;
 
</script>
console test1 输出'bbbbbb';悲剧啊" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test1=<span class="hljs-string">'aaaaaa'</span>;
<span class="hljs-comment">//b.js 文件</span>
<span class="hljs-keyword">var</span> test1=<span class="hljs-string">'bbbbbb'</span>;
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test1='</span>+test1);<span class="hljs-comment">//bbbbbb;</span>
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="hljs-built_in">console</span> test1 输出<span class="hljs-string">'bbbbbb'</span>;悲剧啊</code></pre>
<p>2、命名冲突</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a.js 文件:
function fun(){
    console.log('this is b');
}
 //b.js 文件
 
function fun(){
    console.log('this is b');
}
//main.js 文件
<script src=&quot;a.js&quot;></script>
<script src=&quot;b.js&quot;></script>
<script>
    fun();//this is b;
</script>
小张在a.js定义了fun(),小李在b.js又定义了fun(),a,b被小王引入到main.js，执行fun()，输出this is b; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//a.js 文件:</span>
function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>{
    console.log(<span class="hljs-string">'this is b'</span>);
}
 <span class="hljs-comment">//b.js 文件</span>
 
function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>{
    console.log(<span class="hljs-string">'this is b'</span>);
}
<span class="hljs-comment">//main.js 文件</span>
&lt;script src=<span class="hljs-string">"a.js"</span>&gt;&lt;/script&gt;
&lt;script src=<span class="hljs-string">"b.js"</span>&gt;&lt;/script&gt;
&lt;script&gt;
    <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//this is b;</span>
&lt;/script&gt;
小张在a.js定义了<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>,小李在b.js又定义了<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>,a,b被小王引入到main.js，执行<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>，输出<span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> b; </code></pre>
<p>3、依赖关系<br>   b.js依赖a.js，标签的书写顺序必须是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;a.js&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;b.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"a.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"b.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>这样在多人开发的时候很难协调啊，令人头疼的问题。</p>
<h1 id="articleHeader2">解决冲突的方式</h1>
<p>1、使用java式的命名空间<br>2、变量前加“_”<br>3、对象写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1={
    test1:'aaaaaa',
    fun:function(){
        console.log(this.test1);
    }
}
变量和函数封装在对象里面，使用时，调用对象的属性即可：
module1.fun();//aaaaaa
但是这样的写法会暴露所有模块成员，内部状态可以被外部改写,
module1.test1='cccccc';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> module1={
    test1:<span class="hljs-string">'aaaaaa'</span>,
    <span class="hljs-function"><span class="hljs-keyword">fun</span>:<span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
        console.log(<span class="hljs-keyword">this</span>.test1);
    }
}
变量和函数封装在对象里面，使用时，调用对象的属性即可：
module1.<span class="hljs-keyword">fun</span>();<span class="hljs-comment">//aaaaaa</span>
但是这样的写法会暴露所有模块成员，内部状态可以被外部改写,
module1.test1=<span class="hljs-string">'cccccc'</span>;</code></pre>
<p>4、匿名闭包函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  module1=(function(){
    var test1='aaaaaa';
    var fun=function(){
        console.log('this is a');
    }
    return{
        fun:fun
    }
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span>  module1=(function(){
    <span class="hljs-keyword">var</span> test1=<span class="hljs-string">'aaaaaa'</span>;
    <span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span>=<span class="hljs-title">function</span><span class="hljs-params">()</span></span>{
        console.log(<span class="hljs-string">'this is a'</span>);
    }
    <span class="hljs-keyword">return</span>{
        <span class="hljs-function"><span class="hljs-keyword">fun</span>:<span class="hljs-keyword">fun</span></span>
    }
}());</code></pre>
<p>匿名函数有自己的作用域，这样外部代码无法读取 module1 function  里面的变量了，从而也不会修改变量或者是覆盖同名变量了，但是还是有缺陷的，module1这个的变量还是暴露到全局了，而去随着模块的增多，全局变量会越来越多。<br>5、全局引入<br>像jquery库使用的全局引入。和匿名闭包函数相似，只是传入全局变量的方法不同<br>(function(window){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test1='aaaaaa';
window.testFun=function(){//通过给window添加属性而暴漏到全局
    console.log(test1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> test1=<span class="hljs-string">'aaaaaa'</span>;
<span class="hljs-built_in">window</span>.testFun=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//通过给window添加属性而暴漏到全局</span>
    <span class="hljs-built_in">console</span>.log(test1);
}</code></pre>
<p>}(window));</p>
<p>通过匿名函数包装代码，所依赖的外部变量传给这个函数，在函数内部可以使用这些依赖，然后在函数的最后把模块自身暴漏给window。</p>
<p>3,4,5解决方法都是通过定一个全局变量来把所有的代码包含在一个函数内，由此来创建私有的命名空间和闭包作用域。</p>
<p>本文着重介绍几种广受欢迎的解决方案：CommonJS，AMD，CMD，ES模块化。</p>
<h1 id="articleHeader3">CommonJs</h1>
<p>根据CommonJs规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。</p>
<p>commonJS中模块可以加载多次，但是只会在第一次加载的时候运行一次，然后运行结构被缓存，再次加载就是读取缓存的结果。</p>
<p>CommonJS规范加载模块是同步的，也就是说，加载完成才可以执行后面的操作，Node.js主要用于服务器编程，模块一般都是存在本地硬盘中，加载比较快，所以Node.js采用CommonJS规范。</p>
<p>CommonJS规范分为三部分:module（模块标识）,require（模块引用)， exports（模块定义），<br>module变量在每个模块内部，就代表当前模块；<br>exports属性是对外的接口，用于导出当前模块的方法或变量；<br>require()用来加载外部模块，读取并执行js文件，返回该模块的exports对象；</p>
<h2 id="articleHeader4">1、commonJs模块定义</h2>
<p>module.exports定义模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//math.js
let add=(x,y)=>{
    return x+y;
}
let sub=(x,y)=>{
    return x-y;
}

module.exports={
    add:add,
    sub:sub
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>//math.js
let add=(<span class="hljs-keyword">x</span>,<span class="hljs-keyword">y</span>)=&gt;{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>+<span class="hljs-keyword">y</span>;
}
let <span class="hljs-function"><span class="hljs-keyword">sub</span>=(<span class="hljs-title">x</span>,<span class="hljs-title">y</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>-<span class="hljs-keyword">y</span>;
}

module.exports={
    add:add,
    <span class="hljs-function"><span class="hljs-keyword">sub</span>:<span class="hljs-title">sub</span>
}</span>;
</code></pre>
<p>exports 定义模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let add=(x,y)=>{
    return x+y;
}
let sub=(x,y)=>{
    return x-y;
}
exports.add=add;
exports.sub=sub;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>let add=(<span class="hljs-keyword">x</span>,<span class="hljs-keyword">y</span>)=&gt;{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>+<span class="hljs-keyword">y</span>;
}
let <span class="hljs-function"><span class="hljs-keyword">sub</span>=(<span class="hljs-title">x</span>,<span class="hljs-title">y</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>-<span class="hljs-keyword">y</span>;
}
exports.add=add;
exports.sub=<span class="hljs-function"><span class="hljs-keyword">sub</span></span>;</code></pre>
<p>注意：不可以直接对exports赋值，exports=add;</p>
<p><strong>exports和module.exports有什么区别呢？</strong>   <br>在每个模块中Node都提供了一个Module 对象，代表当前模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//console.log(Module);
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/zss/node-Demo/my-app/testNOde/b.js',
  loaded: false,
  children: [],
  paths: 
   [ '/Users/zss/node-Demo/my-app/testNOde/node_modules',
     '/Users/zss/node-Demo/my-app/node_modules',
     '/Users/zss/node-Demo/node_modules',
     '/Users/zss/node_modules',
     '/Users/node_modules',
     '/node_modules' 
     ] 
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>//console.log(Module);
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/zss/<span class="hljs-keyword">node</span><span class="hljs-title">-Demo</span>/my-app/testNOde/b.js',
  loaded: <span class="hljs-literal">false</span>,
  children: [],
  paths: 
   [ '/Users/zss/<span class="hljs-keyword">node</span><span class="hljs-title">-Demo</span>/my-app/testNOde/node_modules',
     '/Users/zss/<span class="hljs-keyword">node</span><span class="hljs-title">-Demo</span>/my-app/node_modules',
     '/Users/zss/<span class="hljs-keyword">node</span><span class="hljs-title">-Demo</span>/node_modules',
     '/Users/zss/node_modules',
     '/Users/node_modules',
     '/node_modules' 
     ] 
   }</code></pre>
<p>module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。<br>为了方便，Node为每个模块提供一个exports变量，指向module.exports。我们把它们都打印出来看看究竟,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//test.js
console.log(module.exports);
console.log(exports);
console.log(module.exports===exports);

exports.test = ()=>{
    console.log('exports 1');
};
module.exports.test1 = ()=>{
    console.log('module.exports 1');
};
console.log(module.exports);
console.log(exports);

//输出：
{}
{}
true
{ test: [Function], test1: [Function] }
{ test: [Function], test1: [Function] }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//test.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports);
<span class="hljs-built_in">console</span>.log(exports);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports===exports);

exports.test = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'exports 1'</span>);
};
<span class="hljs-built_in">module</span>.exports.test1 = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'module.exports 1'</span>);
};
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports);
<span class="hljs-built_in">console</span>.log(exports);

<span class="hljs-comment">//输出：</span>
{}
{}
<span class="hljs-literal">true</span>
{ <span class="hljs-attr">test</span>: [<span class="hljs-built_in">Function</span>], <span class="hljs-attr">test1</span>: [<span class="hljs-built_in">Function</span>] }
{ <span class="hljs-attr">test</span>: [<span class="hljs-built_in">Function</span>], <span class="hljs-attr">test1</span>: [<span class="hljs-built_in">Function</span>] }
</code></pre>
<p>从上例可以看出：<br><strong>1.每个模块文件一创建，有个var exports = module.exports = {};使exports和module.exports都指向一个空对象。</strong><br>**2.module是全局内置对象，exports是被var创建的局部对象，module.exports和exports所指向的内存地址相同<br>所有的exports收集到的属性和方法，都赋值给了Module.exports，最终返回给模块调用的是module.exports而不是exports。**</p>
<p>再举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//test.js
exports.test = ()=>{
    console.log('exports 1');
};
module.exports={
    test:function(){
        console.log('module.exports 1');
    },
    testmodule:()=>{
        console.log('module.exports 2')
    }
}
console.log(module.exports);
console.log(exports);

 
 //输出
{ test: [Function: test], testmodule: [Function: testmodule] }
{ test: [Function] }

//在index.js文件中调用test2.js
let a=require('./test2');
a.test();
a.testmodule();
//输出：
module.exports 1
module.exports 2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//test.js</span>
exports.test = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'exports 1'</span>);
};
<span class="hljs-built_in">module</span>.exports={
    <span class="hljs-attr">test</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'module.exports 1'</span>);
    },
    <span class="hljs-attr">testmodule</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'module.exports 2'</span>)
    }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.exports);
<span class="hljs-built_in">console</span>.log(exports);

 
 <span class="hljs-comment">//输出</span>
{ <span class="hljs-attr">test</span>: [<span class="hljs-built_in">Function</span>: test], <span class="hljs-attr">testmodule</span>: [<span class="hljs-built_in">Function</span>: testmodule] }
{ <span class="hljs-attr">test</span>: [<span class="hljs-built_in">Function</span>] }

<span class="hljs-comment">//在index.js文件中调用test2.js</span>
<span class="hljs-keyword">let</span> a=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./test2'</span>);
a.test();
a.testmodule();
<span class="hljs-comment">//输出：</span>
<span class="hljs-built_in">module</span>.exports <span class="hljs-number">1</span>
<span class="hljs-built_in">module</span>.exports <span class="hljs-number">2</span>
</code></pre>
<p><strong>所有的exports收集到的属性和方法，都赋值给了Module.exports，当直接把函数和属性传给module.exports时,module.exports与exports不想等了，在调用时候，exports的属性和方法会被忽略，所以最终返回给模块调用的是module.exports而不是exports。</strong></p>
<h2 id="articleHeader5">2、模块分类</h2>
<p>NodeJs的模块分为两类：<br>一类是原生模块，例如http,fs,path 等等。node在加载原生模块的时候，不需要传入路径，NodeJs将原生模块的代码编译到了二进制执行文件中，加载速度快。<br>一类是文件模块，动态加载模块，<br>但是NodeJs对原生模块和文件模块都进行了缓存，第二次require时，就是执行的内存中的文件。</p>
<h2 id="articleHeader6">3、commonJs模块加载规则</h2>
<p>index.js调用math模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let math=require('./math');
let test=math.add(3,3);
console.log(test);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> math=require(<span class="hljs-string">'./math'</span>);
<span class="hljs-built_in">let</span> <span class="hljs-built_in">test</span>=math.add(3,3);
console.log(<span class="hljs-built_in">test</span>);</code></pre>
<p>执行index.js 输出：6；</p>
<p>当我们执行node index.js的时候，第一语句就是“require('./math');”   加载 math文件。加载math文件这个动作是由原生模块module的runMain()实现的。</p>
<p>有没有注意到上面写的是加载math文件，并没有明确指出是js文件。<br>NodeJS加载文件模块基本流程：<br>1、根据名称按照‘.js’,‘.node‘,’.json‘的顺讯依次查找，如果是.node或者.json的文件最好加上扩展名，加载速度快。<br>2、查找到math.js，读取js内容，将使用function进行包装，这样可以避免污染全局环境，该函数的参数包括require、module、exports等等参数，以mathi.js为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（function(exports,require,module,__filename,__dirname){
        let add=(x,y)=>{
            return x+y;
        }
        let sub=(x,y)=>{
            return x-y;
        }

        module.exports={
            add:add,
            sub:sub
        };

 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>（function(exports,<span class="hljs-keyword">require</span>,module,__filename,__dirname){
        let add=(<span class="hljs-keyword">x</span>,<span class="hljs-keyword">y</span>)=&gt;{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>+<span class="hljs-keyword">y</span>;
        }
        let <span class="hljs-function"><span class="hljs-keyword">sub</span>=(<span class="hljs-title">x</span>,<span class="hljs-title">y</span>)=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>-<span class="hljs-keyword">y</span>;
        }

        module.exports={
            add:add,
            <span class="hljs-function"><span class="hljs-keyword">sub</span>:<span class="hljs-title">sub</span>
        }</span>;

 })</code></pre>
<p>require 方法中的文件查找规则很复杂底，在网上copy了一个图：</p>
<p><span class="img-wrap"><img data-src="/img/bVUlcZ?w=479&amp;h=601" src="https://static.alili.tech/img/bVUlcZ?w=479&amp;h=601" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>更详细的加载规则可以参考：<a href="http://www.infoq.com/cn/articles/nodejs-module-mechanism" rel="nofollow noreferrer" target="_blank">http://www.infoq.com/cn/artic...</a></p>
<h2 id="articleHeader7">4、commonJs模块的加载机制：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
//index.js
var mod=require('./lib');
consoe.log(mod.counter);
mod.incCounter();
consoe.log(mod.counter);

输出：3
     3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">//lib.js</span>
<span class="hljs-keyword">var</span> counter = <span class="hljs-number">3</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incCounter</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  counter++;
}</span>
<span class="hljs-title">module</span>.<span class="hljs-title">exports</span> = <span class="hljs-comment">{
  counter: counter,
  incCounter: incCounter,
}</span>;</span>
<span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">mod</span>=<span class="hljs-keyword">require</span>(<span class="hljs-string">'./lib'</span>);
consoe.log(<span class="hljs-keyword">mod</span>.counter);
<span class="hljs-keyword">mod</span>.incCounter();
consoe.log(<span class="hljs-keyword">mod</span>.counter);

输出：<span class="hljs-number">3</span>
     <span class="hljs-number">3</span></code></pre>
<p><strong>commonJS中模块加载以后，它的内部变化不会影响其内部变量，因为它们会被缓存,所以它输出的是值的拷贝。</strong></p>
<p>CommonJS规范比较适用服务器端，如果是浏览器就需要异步加载模块了，所以就有了AMD，CMD解决方案。</p>
<h1 id="articleHeader8">AMD（requireJS）</h1>
<p>　AMD是"Asynchronous Module Definition"的简写，也就是异步模块定义。它采用异步方式加载模块。通过define方法去定义模块，require方法去加载模块。</p>
<h2 id="articleHeader9">AMD模块定义：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(){
    let add=(x,y)=>{
        return x+y;
    }
    let sub=(x,y)=>{
        return x-y;
    }
    
    return {
        add:add,
        sub:sub
    };
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>define(function(){
    let add=(<span class="hljs-keyword">x</span>,<span class="hljs-keyword">y</span>)=&gt;{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>+<span class="hljs-keyword">y</span>;
    }
    let <span class="hljs-function"><span class="hljs-keyword">sub</span>=(<span class="hljs-title">x</span>,<span class="hljs-title">y</span>)=&gt;</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">x</span>-<span class="hljs-keyword">y</span>;
    }
    
    <span class="hljs-keyword">return</span> {
        add:add,
        <span class="hljs-function"><span class="hljs-keyword">sub</span>:<span class="hljs-title">sub</span>
    }</span>;
});
</code></pre>
<p>如果这个模块还需要依赖其他模块，那么define函数的第一个参数，必须是一个数组，指明该模块的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([tools],function(){
    //…………………………
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define([tools],<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//…………………………</span>
})
</code></pre>
<h2 id="articleHeader10">AMD模块的加载：</h2>
<p>require([module], callback);</p>
<p>第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。例如加载math.js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require([math],function(){
    //……………………
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>([math],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//……………………</span>
})
</code></pre>
<p>require()异步加载math，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。</p>
<h1 id="articleHeader11">CMD(SeaJS)</h1>
<p>玉伯提出的CMD规范，并开发了前端模块化开发框架SeaJS，不过在2015年后SeaJS停止了在github上维护，CMD与AMD用法很相似，但是我个人更喜欢使用SeaJS,虽然在2016年后也被我抛弃啦。</p>
<p>SeaJs使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 所有模块都通过 define 来定义
define(function(require, exports, module) {

   // 通过 require 引入依赖
   var $ = require('jquery');
   var Spinning = require('./spinning');

   // 通过 exports 对外提供接口
   exports.doSomething = ...

   // 或者通过 module.exports 提供整个接口
   module.exports = ...

});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 所有模块都通过 define 来定义</span>
<span class="hljs-class"><span class="hljs-keyword">define</span></span>(function(<span class="hljs-keyword">require</span>, exports, module) {

   <span class="hljs-comment">// 通过 require 引入依赖</span>
   <span class="hljs-built_in">var</span> $ = <span class="hljs-keyword">require</span>(<span class="hljs-string">'jquery'</span>);
   <span class="hljs-built_in">var</span> Spinning = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./spinning'</span>);

   <span class="hljs-comment">// 通过 exports 对外提供接口</span>
   exports.doSomething = <span class="hljs-params">...</span>

   <span class="hljs-comment">// 或者通过 module.exports 提供整个接口</span>
   module.exports = <span class="hljs-params">...</span>

});
</code></pre>
<p>有关于SeaJS与 RequireJS 的异同，可以参考：<br><a href="https://github.com/seajs/seajs/issues/277" rel="nofollow noreferrer" target="_blank">https://github.com/seajs/seaj...</a><br><a href="https://www.douban.com/note/283566440/" rel="nofollow noreferrer" target="_blank">https://www.douban.com/note/2...</a></p>
<h1 id="articleHeader12">ES6 模块化</h1>
<p>在es6 之前没有模块化的，为了解决问题，提出了commonJS,AMD,CMD，现在ES6模块化汲取了CommonJS 和 AMD 的优点，简洁的语法，异步加载    <br>它完全可以成为浏览器和服务器通用的模块化解决方案。</p>
<h2 id="articleHeader13">ES6中模块的定义</h2>
<p>ES6 新增了两个关键字 export 和 import，export 用于把 模块里的内容 暴露 出来， import 用于引入模块提供的功能。</p>
<p>export命令输出变量:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//lib.js
let bar=function(){
    console.log('this is bar funciton');
};

let foo=function(){
    console.log('this is foo function');
};

export {bar,foo}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//lib.js</span>
<span class="hljs-keyword">let</span> bar=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is bar funciton'</span>);
};

<span class="hljs-keyword">let</span> foo=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is foo function'</span>);
};

<span class="hljs-keyword">export</span> {bar,foo}</code></pre>
<p>上面的代码还有另一种写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export let bar=function(){
    console.log('this is bar funciton');
};

export let foo=function(){
    console.log('this is foo function');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> bar=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is bar funciton'</span>);
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> foo=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is foo function'</span>);
};</code></pre>
<p>export 不止可以导出函数，还可以导出对象，类，字符串等等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const test='aaa';
const obj={
    str:'hello!'
}
export {test,obj};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const test</span>=<span class="hljs-string">'aaa'</span>;
<span class="hljs-attribute">const obj</span>={
    str:<span class="hljs-string">'hello!'</span>
}
export {test,obj};</code></pre>
<p>注：使用export在尾部输出变量时，一定要加大括号，</p>
<h2 id="articleHeader14">ES6中模块的加载</h2>
<p>import 加载模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //加载 lib.js文件
 import {bar,foo,test,obj} from './lib'
 
 foo();//this is foo function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> <span class="hljs-comment">//加载 lib.js文件</span>
 <span class="hljs-keyword">import</span> {bar,foo,test,obj} <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>
 
 foo();<span class="hljs-comment">//this is foo function</span></code></pre>
<p>注：import 命令具有提升效果，会提升到整个模块的头部，首先执行</p>
<p>上面的是逐一指定要加载的方法,我们还可以使用 ＊ 可以整体加载模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as lib from './lib'
lib.foo();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>import * <span class="hljs-keyword">as</span> <span class="hljs-class"><span class="hljs-keyword">lib</span> <span class="hljs-title">from</span> './<span class="hljs-title">lib</span>'</span>
<span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">foo</span>();</span>
</code></pre>
<p>上面的加载模块的方式需要知道变量名和函数名，否则是无法加载的，我们可以使用export default 命令，为模块指定默认输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//lib.js
let foo=function(){
    console.log('this is foo');
} 
export default foo; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//lib.js</span>
<span class="hljs-keyword">let</span> foo=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is foo'</span>);
} 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> foo; </code></pre>
<p>其他文件加载时，可以为该匿名函数指定任意名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import  lib from 'lib';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>import  <span class="hljs-class"><span class="hljs-keyword">lib</span> <span class="hljs-title">from</span> '<span class="hljs-title">lib</span>';</span>
</code></pre>
<p>注：export default 命令适用于指定默认模块的输出，一个模块只能有一个默认输出，所以export default 只能使用一次。</p>
<h2 id="articleHeader15">ES6 模块运行机制</h2>
<p>ES6模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），变量不会被缓存，而是成为一个指向被加载模块的引用。等脚本执行时，根据只读引用，到被加载的那个模块中去取值。<br>举一个NodeJS模块化的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//lib.js
export let counter = 3;
exoprt function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
//index.js
import {counter,incCounter} from './lib';
consoe.log(mod.counter);
mod.incCounter();
consoe.log(mod.counter);

输出：3
     4
调用 incCounter()方法后，lib 模块里的counter变量值改变了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//lib.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> counter = <span class="hljs-number">3</span>;
exoprt <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incCounter</span>(<span class="hljs-params"></span>) </span>{
  counter++;
}
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">counter</span>: counter,
  <span class="hljs-attr">incCounter</span>: incCounter,
};
<span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> {counter,incCounter} <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>;
consoe.log(mod.counter);
mod.incCounter();
consoe.log(mod.counter);

输出：<span class="hljs-number">3</span>
     <span class="hljs-number">4</span>
调用 incCounter()方法后，lib 模块里的counter变量值改变了。
</code></pre>
<p>参考：<br><a href="http://www.cnblogs.com/TomXu/archive/2011/12/30/2288372.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/TomXu/...</a><br><a href="http://blog.csdn.net/tyro_java/article/details/53572296" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/tyro_jav...</a><br><a href="http://javascript.ruanyifeng.com/nodejs/module.html" rel="nofollow noreferrer" target="_blank">http://javascript.ruanyifeng....</a><br><a href="http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br><a href="https://zhuanlan.zhihu.com/p/22890374" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a><br><a href="https://segmentfault.com/a/1190000000733959#articleHeader5">https://segmentfault.com/a/11...</a><br><a href="http://web.jobbole.com/83761/" rel="nofollow noreferrer" target="_blank">http://web.jobbole.com/83761/</a><br><a href="http://es6.ruanyifeng.com/#docs/module-loader" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a><br><a href="http://www.cnblogs.com/lishuxue/p/6000205.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/lishux...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 之模块化篇

## 原文链接
[https://segmentfault.com/a/1190000011063732](https://segmentfault.com/a/1190000011063732)

