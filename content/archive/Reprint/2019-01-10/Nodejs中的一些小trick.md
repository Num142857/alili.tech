---
title: 'Nodejs中的一些小trick' 
date: 2019-01-10 2:30:08
hidden: true
slug: 0mkd7fw84esc
categories: [reprint]
---

{{< raw >}}

                    
<p>之前常常因为不注意，习惯用写PHP或者Java的方式来写nodejs，产生了了一些错误，这里总结一些小小的trick，以便于展示nodejs的不同，和平时需要注意的地方。</p>
<h2 id="articleHeader0">变量提升</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var variable = 'global';
console.log(variable); 
function fn () {
    console.log(variable); 
    var variable = 'local';
    console.log(variable);
}
fn();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">variable</span> = <span class="hljs-string">'global'</span>;
console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">variable</span>); 
function fn () {
    console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">variable</span>); 
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">variable</span> = <span class="hljs-string">'local'</span>;
    console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">variable</span>);
}
fn();
</code></pre>
<p>你可能以为这段代码执行结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="global
global
local" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">global</span>
<span class="hljs-keyword">global</span>
<span class="hljs-keyword">local</span></code></pre>
<p>但实际上结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="global
undefined
local" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">global</span>
undefined
<span class="hljs-keyword">local</span></code></pre>
<p>原因就是函数作用域导致局部变量在整个函数体内部可见，所以执行起来就成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function fn () {
     var variable
     console.log(variable); 
     variable = 'local';
     console.log(variable);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code> function fn () {
     <span class="hljs-built_in">var</span> <span class="hljs-built_in">variable</span>
     console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">variable</span>); 
     <span class="hljs-built_in">variable</span> = <span class="hljs-string">'local'</span>;
     console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">variable</span>);
 }</code></pre>
<p>函数内部的console.log出于就近原则读取的是内部variable，亦即局部variable覆盖了全局variable，然后局部variable是整个函数体内可见，所以相当于提升了变量声明，亦即变量声明放在了函数开头，但是变量初始化还是在原来的位置，所以就是上面展示的顺序。<br>写Java的时候我们倾向于在最开始使用一个局部变量之前声明它，这样帮我们清晰它的作用域以及生命周期；但是JavaScript没有块级作用域，所以局部变量最好写在函数开始，这样才能更清晰的展示它的作用域（整个函数内部）和生命周期，避免产生误解。</p>
<p>有点需要注意的是:声明写var与不写var是有区别的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a);   
a = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>console.log(a)<span class="hljs-comment">;   </span>
<span class="hljs-attribute">a</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span></code></pre>
<p>会报错，而下面这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a);   
var a = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>console.log(a)<span class="hljs-comment">;   </span>
var a = <span class="hljs-number">1</span><span class="hljs-comment">;</span></code></pre>
<p>结果是 undefined ，也就是没有var的声明不会提升。</p>
<h2 id="articleHeader1">函数提升</h2>
<p>js中创建函数有两种方式：函数声明式和函数字面量式。只有函数声明才存在函数提升:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(f1);  
console.log(f2);   
function f1() {}
var f2 = function() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(f1);  
<span class="hljs-built_in">console</span>.log(f2);   
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> f2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Function: f1]
undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>[<span class="hljs-meta">Function</span>: <span class="hljs-built_in">f1</span>]
<span class="hljs-symbol">undefined</span></code></pre>
<p>就是函数提升导致顺序变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {} 　　　　
console.log(f1);   
console.log(f2);   
var f2 = function() {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{} 　　　　
<span class="hljs-built_in">console</span>.log(f1);   
<span class="hljs-built_in">console</span>.log(f2);   
<span class="hljs-keyword">var</span> f2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
</code></pre>
<h2 id="articleHeader2">原型继承中的坑</h2>
<p>JavaScript 没有 提供对象继承的语言级别特性，而是通过原型复制来实现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var util = require('util')
function Superclass(){
    this.a = 'a';
}
Superclass.prototype.d = 'd';
function Subclass(){
    this.b = 'b';
}
util.inherits(Subclass, Superclass);
var superC = new Superclass();
var subC = new Subclass();

console.log(superC.a);
console.log(subC.a);
subC.a = 'suba';
console.log(superC.a);
console.log(subC.a);
subC.cc = 'cc';
console.log(superC.cc);
console.log(subC.cc);
console.log(superC.d);
console.log(subC.d);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Superclass</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.a = <span class="hljs-string">'a'</span>;
}
Superclass.prototype.d = <span class="hljs-string">'d'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Subclass</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.b = <span class="hljs-string">'b'</span>;
}
util.inherits(Subclass, Superclass);
<span class="hljs-keyword">var</span> superC = <span class="hljs-keyword">new</span> Superclass();
<span class="hljs-keyword">var</span> subC = <span class="hljs-keyword">new</span> Subclass();

<span class="hljs-built_in">console</span>.log(superC.a);
<span class="hljs-built_in">console</span>.log(subC.a);
subC.a = <span class="hljs-string">'suba'</span>;
<span class="hljs-built_in">console</span>.log(superC.a);
<span class="hljs-built_in">console</span>.log(subC.a);
subC.cc = <span class="hljs-string">'cc'</span>;
<span class="hljs-built_in">console</span>.log(superC.cc);
<span class="hljs-built_in">console</span>.log(subC.cc);
<span class="hljs-built_in">console</span>.log(superC.d);
<span class="hljs-built_in">console</span>.log(subC.d);
</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a
undefined
a
suba
undefined
cc
d
d
Superclass { a: 'a' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span>
undefined
<span class="hljs-selector-tag">a</span>
suba
undefined
cc
d
d
Superclass { <span class="hljs-selector-tag">a</span>: <span class="hljs-string">'a'</span> }</code></pre>
<p>subC仅仅继承了superC在prototype中定义的属性d，而构造函数内部创造的a属性没有被subC继承。同时，在原型中定义的属性不会被console.log作为对象的属性输出。在subC中修改属性a并不会修改superC的属性a，但是能获取superC的属性d，而且设置了一个属性cc也不会影响superC。所以对于set操作并不会修改原型链，只有get操作才会体会到原型链（继承）的存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var util = require('util')
function Superclass(){
    this.a = 'a';
}
Superclass.prototype.d = 'd';
function Subclass(){
    this.b = 'b';
}
util.inherits(Subclass, Superclass);
var superC = new Superclass();
var subC = new Subclass();


for(x in subC){
    console.log(x);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Superclass</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.a = <span class="hljs-string">'a'</span>;
}
Superclass.prototype.d = <span class="hljs-string">'d'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Subclass</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.b = <span class="hljs-string">'b'</span>;
}
util.inherits(Subclass, Superclass);
<span class="hljs-keyword">var</span> superC = <span class="hljs-keyword">new</span> Superclass();
<span class="hljs-keyword">var</span> subC = <span class="hljs-keyword">new</span> Subclass();


<span class="hljs-keyword">for</span>(x <span class="hljs-keyword">in</span> subC){
    <span class="hljs-built_in">console</span>.log(x);
}
</code></pre>
<p>结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b
d
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">b</span>
d
</code></pre>
<p>也就是说 in 关键字能检测到自有属性和继承熟性，这个可以用 !==来代替</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(x in subC){
    if(subC[x] !== undefined)
        console.log(x);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">for</span>(x <span class="hljs-keyword">in</span> subC){
    <span class="hljs-keyword">if</span>(subC[x] !== <span class="hljs-literal">undefined</span>)
        <span class="hljs-built_in">console</span>.log(x);
}</code></pre>
<p>结果一致， 但是in可以区分属性不存在 和 属性存在且为undefined 两种情况，而!==不能区分。<br>再看下面的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(x in subC){
    if(subC.hasOwnProperty(x))
        console.log(x);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">for</span>(x <span class="hljs-keyword">in</span> subC){
    <span class="hljs-keyword">if</span>(subC.hasOwnProperty(x))
        console.<span class="hljs-built_in">log</span>(x);
}
</code></pre>
<p>结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">b</span></code></pre>
<p>也就是说hasOwnProperty能检测到自身属性，不包含继承属性。总结一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
superC.hasOwnProperty();             //自有属性为真
superC.propertyIsEnumerable(superC); //可枚举属性为真
Object.keys(superC);                 //所有可枚举自有属性
Object.getOwnPropertyNames(superC);  //所有自有属性
for x in superC                      //自有及其其原型链上继承到的可枚举属性
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>
superC.hasOwnProperty();             <span class="hljs-comment">//自有属性为真</span>
superC.propertyIsEnumerable(superC); <span class="hljs-comment">//可枚举属性为真</span>
<span class="hljs-built_in">Object</span>.keys(superC);                 <span class="hljs-comment">//所有可枚举自有属性</span>
<span class="hljs-built_in">Object</span>.getOwnPropertyNames(superC);  <span class="hljs-comment">//所有自有属性</span>
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> superC                      <span class="hljs-comment">//自有及其其原型链上继承到的可枚举属性</span>
</code></pre>
<h2 id="articleHeader3">依然是作用域</h2>
<p>看看这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    },100*i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++){
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    },<span class="hljs-number">100</span>*i)
}</code></pre>
<p>你可能会认为结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 1 2 3 4
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">0 </span><span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span>
</code></pre>
<p>但是结果是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5 5 5 5 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">5 </span><span class="hljs-number">5</span> <span class="hljs-number">5</span> <span class="hljs-number">5</span> <span class="hljs-number">5</span>
</code></pre>
<p>原因就是 settimeout的回调函数执行时，for循环已经执行完毕。i变成了5，而回调函数最近的原型作用域上的i（此处也就是全局作用域）就是5，自然就是5了。要达到想要的效果正确的做法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 5; i++){
    (function(i){setTimeout(function(){
        console.log(i);
    },100*i)})(i)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++){
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    },<span class="hljs-number">100</span>*i)})(i)
}
</code></pre>
<p>即用 (function(i){})(i);来产生一个立即作用域，保证settimeout回调函数执行的时候最近的原型作用域的i就是当时循环的i。</p>
<p>说到这个就得谈谈闭包：所谓“闭包”，指的是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。用大白话：闭包的作用就是在一个函数执行完并返回后，并不回收该函数所占用的资源，因为该函数的内部函数（或属性）的执行需要依赖该函数中的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function outF() {
   var count = 0;
   return function inF(){
      count++;
      console.log(count);
   }
}

var inF= outF();
inF();  // 1
inF();  // 2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>
function <span class="hljs-keyword">outF</span>() {
   <span class="hljs-keyword">var</span> <span class="hljs-keyword">count</span> = 0;
   <span class="hljs-keyword">return</span> function <span class="hljs-keyword">inF</span>(){
      <span class="hljs-keyword">count</span>++;
      console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">count</span>);
   }
}

<span class="hljs-keyword">var</span> <span class="hljs-keyword">inF</span>= <span class="hljs-keyword">outF</span>();
<span class="hljs-keyword">inF</span>();  <span class="hljs-comment">// 1</span>
<span class="hljs-keyword">inF</span>();  <span class="hljs-comment">// 2</span>
</code></pre>
<p>可见outF执行过后，其属性count并未回收。回到上面那个错误的循环，for创建了若干个闭包，每个闭包共享上下文环境 i。因为for（很大可能）会先跑完，所以运行回调函数的时候 i 已经变成了5。而正确的循环中，也通过匿名函数创建了闭包，这个匿名函数作为外部函数，通过立即调用，使得settimeout不需要共享循环中的i，而是独享每一次循环不同的i。</p>
<p>作用域真的可以说是JavaScript的一个问题，var 声明是具有整个函数内部的可见性，而js1.7之后的let的出现算是弥补了这个缺陷（至于是不是缺陷就见仁见智了），let 声明的变量只属于就近的花括号内部，看下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    },100*i)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++){
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    },<span class="hljs-number">100</span>*i)
}
</code></pre>
<p>结果就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 0 1 2 3 4
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span>
</code></pre>
<p>区别就在于使用了 var 和 let 来生明变量i，let 使得每次程序进入花括号就产生了一个块级作用域，也就是说settimeout的回调函数作用域链中最近的i不再是全局的i，而是块级作用域的i，也就是每一次不同的0,1,2,3,4而不是全局i最后是5。let产生了和上面立即作用域相同的效果。</p>
<h2 id="articleHeader4">对象类型</h2>
<p>非常奇怪，在Javascript中没有非常简单的获取一个对象的类别的方法，instanceof 是要检查原型链的，类似于isPropertypeOf，所以无法一步到位获得最精确地的对象类型，一般用下面这个 classof可以获得最精确的类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Date();

function classof(o){
    if(o===null) return &quot;Null&quot;;
    if(o===undefined) return &quot;Undefined&quot;;
    return Object.prototype.toString.call(o).slice(8,-1);
}

console.log(classof(a));//Date
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">classof</span>(<span class="hljs-params">o</span>)</span>{
    <span class="hljs-keyword">if</span>(o===<span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"Null"</span>;
    <span class="hljs-keyword">if</span>(o===<span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"Undefined"</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>,<span class="hljs-number">-1</span>);
}

<span class="hljs-built_in">console</span>.log(classof(a));<span class="hljs-comment">//Date</span>
</code></pre>
<p>之所以不直接用Object.prototype.toString，是因为好多类型重写了这个方法，不能保证它输出是<br>[object class],所以使用Function.call方法。</p>
<h2 id="articleHeader5">万恶的分号 ;</h2>
<p>nodejs中分号; 是可选的，这个有一定程度的便利，可是在我看来它更多的是造成了混乱，js会在必要的时候帮助我们添加分号，它有自己的添加规则（我们自然都懒得去记）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a
a 
=
3
console.log(a)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> a
a 
=
<span class="hljs-number">3</span>
console.log(a)</code></pre>
<p>这个会解析成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a; a = 3;console.log(a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">var a<span class="hljs-comment">; a = 3;console.log(a);</span></code></pre>
<p>没啥毛病。<br>可是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var equa = function(a,b){
    if(a===b){
        return
        true;
    }
    return false;        
}
console.log(equa(5,5));//undefined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> equa = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-keyword">if</span>(a===b){
        <span class="hljs-keyword">return</span>
        <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;        
}
<span class="hljs-built_in">console</span>.log(equa(<span class="hljs-number">5</span>,<span class="hljs-number">5</span>));<span class="hljs-comment">//undefined</span>
</code></pre>
<p>就没有按预期执行，因为它解析成了 return;true;返回的自然是undefined。<br>所以避免混乱最简单的做法就是老老实实的给每一句都加上 ;</p>
<h2 id="articleHeader6">数组相关</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = [];a[1000]=5; //a.length=1001，虽然a只有一个元素

a1 = [,,,]; // [undefined,undefined,undefined]
a2 = new Array(3); //数组根本没有元素
0 in a1;// true  ，如上所说，in 可以区分元素不存在和元素值存在且为undefined的情况
0 in a2;// false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-keyword">a</span> = [];<span class="hljs-keyword">a</span>[<span class="hljs-number">1000</span>]=<span class="hljs-number">5</span>;<span class="hljs-comment"> //a.length=1001，虽然a只有一个元素</span>

a1 = [,,,];<span class="hljs-comment"> // [undefined,undefined,undefined]</span>
a2 = <span class="hljs-built_in">new</span> Array(<span class="hljs-number">3</span>);<span class="hljs-comment"> //数组根本没有元素</span>
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a1<span class="hljs-comment">;// true  ，如上所说，in 可以区分元素不存在和元素值存在且为undefined的情况</span>
<span class="hljs-number">0</span> <span class="hljs-keyword">in</span> a2<span class="hljs-comment">;// false</span>
</code></pre>
<h3 id="articleHeader7">高级数组方法</h3>
<p>filter()：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter(function(x, index) {
    return index % 3 === 0 || x >= 8;
}); 
console.log(arr2); //[1, 4, 7, 8, 9, 10]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>];
var arr2 = arr.filter(function(x, index) {
    return index % <span class="hljs-number">3</span> === <span class="hljs-number">0</span> || x &gt;= <span class="hljs-number">8</span>;
}); 
console.log(arr2); <span class="hljs-comment">//[1, 4, 7, 8, 9, 10]</span>
</code></pre>
<p>every()：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function(x) {
    return x < 10;
}); 
console.log(arr2); //true
var arr3 = arr.every(function(x) {
    return x < 3;
}); 
console.log(arr3); // false  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> arr2 = arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> x &lt; <span class="hljs-number">10</span>;
}); 
<span class="hljs-built_in">console</span>.log(arr2); <span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> arr3 = arr.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> x &lt; <span class="hljs-number">3</span>;
}); 
<span class="hljs-built_in">console</span>.log(arr3); <span class="hljs-comment">// false  </span>
</code></pre>
<p>some()：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。</p>
<p>reduce() 和 reduceRight()，这两个方法都会实现迭代数组的所有项，然后构建一个最终返回的值。reduce()方法从数组的第一项开始，逐个遍历到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。<br>这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。<br>传给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。<br>下面代码用reduce()实现数组求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
    return prev + cur;
},0);
console.log(sum); //15
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">values</span> = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-built_in">var</span> <span class="hljs-built_in">sum</span> = <span class="hljs-built_in">values</span>.reduceRight(function(prev, cur, index, <span class="hljs-built_in">array</span>){
    <span class="hljs-built_in">return</span> prev + cur;
},<span class="hljs-number">0</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">sum</span>); //<span class="hljs-number">15</span>
</code></pre>
<h2 id="articleHeader8">调用函数之 this</h2>
<p>调用函数有4种方式，不同之处就在于调用上下文，也就是关键字（不是变量，不是属性名）this的值</p>
<ul>
<li>函数调用 ，亦即直接调用一个函数，在非严格模式下this指向全局对象，严格模式下指向undefined。需要注意的是嵌套函数的this并不指向外层函数的上下文，而是也遵照这个规则。</li>
<li>方法调用 ，亦即作为一个类的方法调用一个函数，this指向这个类的对象</li>
<li>构造器调用 ，亦即使用 new 关键字，this指向新建的对象本身</li>
<li>call,apply调用 ，this指向该函数绑定的对象</li>
</ul>
<h2 id="articleHeader9">参考</h2>
<p>JavaScript 权威指南 第六版；<br>JavaScript 语言精粹；<br>深入浅出 nodejs；<br><a href="http://blog.csdn.net/u014607184/article/details/51820564" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u0146071...</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<p><strong> 欢迎访问我的主页 <a href="http://mageek.cn/archives/32/" rel="nofollow noreferrer" target="_blank">Mageek`s Wonderland</a> <a href="http://mageek.cn/archives/32/" rel="nofollow noreferrer" target="_blank">http://mageek.cn/archives/32/</a> </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nodejs中的一些小trick

## 原文链接
[https://segmentfault.com/a/1190000010034556](https://segmentfault.com/a/1190000010034556)

