---
title: 'js闭包实例展示' 
date: 2019-02-14 2:30:37
hidden: true
slug: g3ydimnw0qv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>准确来说，闭包是基于正常的垃圾回收处理机制下的。也就是说，一般情况一个函数（函数作用域）执行完毕，里面声明的变量会全部释放，被垃圾回收器回收。但闭包利用一个技巧，让作用域里面的变量，在函数执行完之后依旧保存没有被垃圾回收处理掉。</blockquote>
<p>闭包</p>
<blockquote>定义</blockquote>
<p>MDN定义</p>
<p>javascriptkit</p>
<p>词法作用域</p>
<blockquote>作用域链</blockquote>
<ul><li>函数在执行的过程中，先从自己内部找变量如果找不到，再从创建当前函数所在的作用域(词法作用域)去找, 以 此往上注意找的是变量的当前的状态</li></ul>
<p>作用域链的博客</p>
<p>函数连同它作用域链上的要找的这个变量，共同构成闭包</p>
<p>一般情况下使用闭包主要是为了</p>
<ul>
<li>封装数据</li>
<li>暂存数据</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016807008" src="https://static.alili.tech/img/remote/1460000016807008" alt="前端面试之js闭包" title="前端面试之js闭包" style="cursor: pointer; display: inline;"></span></p>
<blockquote>一个典型的闭包案例</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function car(){
 var speed = 0
 function fn(){
 speed++
 console.log(speed)
 }
 return fn
}
var speedUp = car()
speedUp() //1
speedUp() //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
 <span class="hljs-keyword">return</span> fn
}
<span class="hljs-keyword">var</span> speedUp = car()
speedUp() <span class="hljs-comment">//1</span>
speedUp() <span class="hljs-comment">//2</span></code></pre>
<p>当函数内部没有执行以下的代码时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
 speed++
 console.log(speed)
 }
return fn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(){
 speed++
 console.log(speed)
 }
<span class="hljs-keyword">return</span> <span class="hljs-type">fn</span></code></pre>
<p>在代码执行完成后，函数内部的局部变量speed就会被销毁，由于全局标量speedUp一直存在（除非关闭当前页面，否则全局变量一直存在），那么函数内部的作用域就没有办法被销毁，里面有东西一直被使用，这点与浏览器的垃圾回收机制相仿，当我们执行speedUp()，他会在函数的词法作用域下去寻找，函数里面又返回了一个fn，因而形成闭包，简单的理解为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var speed = 0
function fn(){
 speed++
 console.log(speed)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
}</code></pre>
<p>这一段代码形成一个闭包，如果不return fn,那函数内部的局部变量就会被销毁。</p>
<p>我们可以看看上述代码利用立即执行语句和立即执行函数可以怎么演变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function car(){
 var speed = 0
 function fn(){
 speed++
 console.log(speed)
 }
 return fn
}
var speedUp = car()
//1
function car(){
 var speed = 0
 return function (){
 speed++
 console.log(speed)
 }
}
var speedUp = car()
//2
function car(speed){
 return function (){
 speed++
 console.log(speed)
 }
}
var speedUp = car(3)
//3
function car(){
 var speed = arguments[0]
 return function (){
 speed++
 console.log(speed)
 }
}
var speedUp = car()
//4
function car(){
 var speed = 0
 return function (){
 speed++
 console.log(speed)
 }
}
//5 car可以不写，则为匿名函数 
var speedUp = (function car(speed){
 return function (){
 speed++
 console.log(speed)
 }
}
)(3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
 <span class="hljs-keyword">return</span> fn
}
<span class="hljs-keyword">var</span> speedUp = car()
<span class="hljs-comment">//1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
}
<span class="hljs-keyword">var</span> speedUp = car()
<span class="hljs-comment">//2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params">speed</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
}
<span class="hljs-keyword">var</span> speedUp = car(<span class="hljs-number">3</span>)
<span class="hljs-comment">//3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
}
<span class="hljs-keyword">var</span> speedUp = car()
<span class="hljs-comment">//4</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
}
<span class="hljs-comment">//5 car可以不写，则为匿名函数 </span>
<span class="hljs-keyword">var</span> speedUp = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">car</span>(<span class="hljs-params">speed</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
 speed++
 <span class="hljs-built_in">console</span>.log(speed)
 }
}
)(<span class="hljs-number">3</span>)</code></pre>
<blockquote>闭包的相关案例</blockquote>
<p>如下代码输出多少？如果想输出3，那如何改造代码？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fnArr = [];
for (var i = 0; i < 10; i ++) {
 fnArr[i] = function(){
 return i
 };
}
console.log( fnArr[3]() ) // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fnArr = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
 fnArr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> i
 };
}
<span class="hljs-built_in">console</span>.log( fnArr[<span class="hljs-number">3</span>]() ) <span class="hljs-comment">// 10</span></code></pre>
<p>同等演变</p>
<p>假设只有两层循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fnArr = []
for (var i = 0; i < 2; i ++) {
 fnArr[i] = (function(j){
 return function(){
 return j
 } 
 })(i)
}
fnArr[3]()
//1
var fnArr = [] 
fnArr[0] = (function(j){
 return function(){
 return j
 } 
 })(0)
}
fnArr[1] = (function(j){
 return function(){
 return j
 } 
 })(1)
}
fnArr[3]()
//2
var a = (function(j){
 return function(){
 return j
 } 
 })(0)
}
var b = (function(j){
 return function(){
 return j
 } 
 })(1)
}
b()
//3
var a = (function(j){
 return function(){
 return j
 } 
 })(0)
}
function fn2(j){
 return function(){
 return j
 }
}
var b = fn2(1)
//4
var a = (function(j){
 return function(){
 return j
 } 
 })(0)
}
function fn2(j){
 return function(){
 return j
 }
 return f
}
var b = fn2(1)
//5
var a = (function(j){
 return function(){
 return j
 } 
 })(0)
}
function fn2(j){
 var j = arguments[0]
 function f(){
 return j
 }
 return f
}
var b = fn2(1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fnArr = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2</span>; i ++) {
 fnArr[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(i)
}
fnArr[<span class="hljs-number">3</span>]()
<span class="hljs-comment">//1</span>
<span class="hljs-keyword">var</span> fnArr = [] 
fnArr[<span class="hljs-number">0</span>] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">0</span>)
}
fnArr[<span class="hljs-number">1</span>] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">1</span>)
}
fnArr[<span class="hljs-number">3</span>]()
<span class="hljs-comment">//2</span>
<span class="hljs-keyword">var</span> a = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">0</span>)
}
<span class="hljs-keyword">var</span> b = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">1</span>)
}
b()
<span class="hljs-comment">//3</span>
<span class="hljs-keyword">var</span> a = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">0</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 }
}
<span class="hljs-keyword">var</span> b = fn2(<span class="hljs-number">1</span>)
<span class="hljs-comment">//4</span>
<span class="hljs-keyword">var</span> a = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">0</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 }
 <span class="hljs-keyword">return</span> f
}
<span class="hljs-keyword">var</span> b = fn2(<span class="hljs-number">1</span>)
<span class="hljs-comment">//5</span>
<span class="hljs-keyword">var</span> a = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(<span class="hljs-number">0</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">var</span> j = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 }
 <span class="hljs-keyword">return</span> f
}
<span class="hljs-keyword">var</span> b = fn2(<span class="hljs-number">1</span>)</code></pre>
<p>改造后（立即执行语句,演变过程）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fnArr = []
for (var i = 0; i < 10; i ++) {
 fnArr[i] = (function(j){
 return function(){
 return j
 } 
 })(i)
}
console.log( fnArr[3]() ) // 3
var fnArr = []
for (var i = 0; i < 10; i ++) {
 (function(i){
 fnArr[i] = function(){
 return i
 } 
 })(i)
}
console.log( fnArr[3]() ) // 3
var fnArr = []
for (let i = 0; i < 10; i ++) {
 fnArr[i] = function(){
 return i
 } 
}
console.log( fnArr[3]() ) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fnArr = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
 fnArr[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> j
 } 
 })(i)
}
<span class="hljs-built_in">console</span>.log( fnArr[<span class="hljs-number">3</span>]() ) <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">var</span> fnArr = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
 (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
 fnArr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> i
 } 
 })(i)
}
<span class="hljs-built_in">console</span>.log( fnArr[<span class="hljs-number">3</span>]() ) <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">var</span> fnArr = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
 fnArr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">return</span> i
 } 
}
<span class="hljs-built_in">console</span>.log( fnArr[<span class="hljs-number">3</span>]() ) <span class="hljs-comment">// 3</span></code></pre>
<p>封装一个 Car 对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Car = (function(){
 var speed = 0;
 function set(s){
 speed = s
 }
 function get(){
 return speed
 }
 function speedUp(){
 speed++
 }
 function speedDown(){
 speed--
 }
 return {
 setSpeed: setSpeed,
 get: get,
 speedUp: speedUp,
 speedDown: speedDown
 }
})()
Car.set(30)
Car.get() //30
Car.speedUp()
Car.get() //31
Car.speedDown()
Car.get() //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Car = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
 <span class="hljs-keyword">var</span> speed = <span class="hljs-number">0</span>;
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span><span class="hljs-params">(s)</span></span>{
 speed = s
 }
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span><span class="hljs-params">()</span></span>{
 <span class="hljs-keyword">return</span> speed
 }
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speedUp</span><span class="hljs-params">()</span></span>{
 speed++
 }
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speedDown</span><span class="hljs-params">()</span></span>{
 speed--
 }
 <span class="hljs-keyword">return</span> {
 setSpeed: setSpeed,
 <span class="hljs-keyword">get</span>: <span class="hljs-keyword">get</span>,
 speedUp: speedUp,
 speedDown: speedDown
 }
})()
Car.set(<span class="hljs-number">30</span>)
Car.get() <span class="hljs-comment">//30</span>
Car.speedUp()
Car.get() <span class="hljs-comment">//31</span>
Car.speedDown()
Car.get() <span class="hljs-comment">//3</span></code></pre>
<p>如下代码输出多少？如何连续输出 0,1,2,3,4</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0; i<5; i++){
 setTimeout(function(){
 console.log('delayer:' + i )
 }, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">5</span>; i++){
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'delayer:'</span> + i )
 }, <span class="hljs-number">0</span>)
}</code></pre>
<p>输出结果为：delayer:5（连续输出5个），执行setTimeout时，代码会挂到任务队列中区，待i遍历完成之后执行，而此时i = 5，所以输出delayer:5（连续输出5个）</p>
<p>修改后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0; i<5; i++){
 (function(j){
 setTimeout(function(){
 console.log('delayer:' + j )
 }, 0)//1000-1000*j 
 })(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for(<span class="hljs-name">var</span> i=0<span class="hljs-comment">; i&lt;5; i++){</span>
 (<span class="hljs-name">function</span>(<span class="hljs-name">j</span>){
 setTimeout(<span class="hljs-name">function</span>(){
 console.log('delayer:' + j )
 }, <span class="hljs-number">0</span>)//1000-1000*j 
 })(<span class="hljs-name">i</span>)
}</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0; i<5; i++){
 setTimeout((function(j){
 return function(){
 console.log('delayer:' + j )
 }
 }(i)), 0) 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">5</span>; i++){
 setTimeout((<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'delayer:'</span> + j )
 }
 }(i)), <span class="hljs-number">0</span>) 
}</code></pre>
<p>如下代码输出多少？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeCounter() {
 var count = 0
 return function() {
 return count++
 };
}
var counter = makeCounter()
var counter2 = makeCounter();
console.log( counter() ) // 0
console.log( counter() ) // 1
console.log( counter2() ) // 0
console.log( counter2() ) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeCounter</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">return</span> count++
 };
}
<span class="hljs-keyword">var</span> counter = makeCounter()
<span class="hljs-keyword">var</span> counter2 = makeCounter();
<span class="hljs-built_in">console</span>.log( counter() ) <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log( counter() ) <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log( counter2() ) <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log( counter2() ) <span class="hljs-comment">// 1</span></code></pre>
<p>补全代码，实现数组按姓名、年纪、任意字段排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = [
 { name: &quot;John&quot;, age: 20, company: &quot;Baidu&quot; },
 { name: &quot;Pete&quot;, age: 18, company: &quot;Alibaba&quot; },
 { name: &quot;Ann&quot;, age: 19, company: &quot;Tecent&quot; }
]
users.sort(byName) 
users.sort(byAge)
users.sort(byField('company'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var users = [
 { <span class="hljs-string">name:</span> <span class="hljs-string">"John"</span>, <span class="hljs-string">age:</span> <span class="hljs-number">20</span>, <span class="hljs-string">company:</span> <span class="hljs-string">"Baidu"</span> },
 { <span class="hljs-string">name:</span> <span class="hljs-string">"Pete"</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span>, <span class="hljs-string">company:</span> <span class="hljs-string">"Alibaba"</span> },
 { <span class="hljs-string">name:</span> <span class="hljs-string">"Ann"</span>, <span class="hljs-string">age:</span> <span class="hljs-number">19</span>, <span class="hljs-string">company:</span> <span class="hljs-string">"Tecent"</span> }
]
users.sort(byName) 
users.sort(byAge)
users.sort(byField(<span class="hljs-string">'company'</span>))</code></pre>
<p>解答</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function byName(user1, user2){
 return user1.name > user2.name
}
function byAge (user1, user2){
 return user1.age > user2.age
}
function byFeild(field){
 return function(user1, user2){
 return user1[field] > user2[field]
 }
}
users.sort(byField('company'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">byName</span><span class="hljs-params">(user1, user2)</span></span>{
 <span class="hljs-keyword">return</span> user1.name &gt; user2.name
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">byAge</span> <span class="hljs-params">(user1, user2)</span></span>{
 <span class="hljs-keyword">return</span> user1.age &gt; user2.age
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">byFeild</span><span class="hljs-params">(field)</span></span>{
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(user1, user2)</span></span>{
 <span class="hljs-keyword">return</span> user1[field] &gt; user2[field]
 }
}
users.sort(byField(<span class="hljs-string">'company'</span>))</code></pre>
<p>写一个 sum 函数，实现如下调用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( sum(1)(2) ) // 3
console.log( sum(5)(-1) ) // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>console.<span class="hljs-keyword">log</span>( <span class="hljs-keyword">sum</span>(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>) ) <span class="hljs-comment">// 3</span>
console.<span class="hljs-keyword">log</span>( <span class="hljs-keyword">sum</span>(<span class="hljs-number">5</span>)(<span class="hljs-number">-1</span>) ) <span class="hljs-comment">// 4</span></code></pre>
<p>最后，祝大家早日学有所成，拿到满意offer，快速升职加薪，走上人生巅峰。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js闭包实例展示

## 原文链接
[https://segmentfault.com/a/1190000016807005](https://segmentfault.com/a/1190000016807005)

