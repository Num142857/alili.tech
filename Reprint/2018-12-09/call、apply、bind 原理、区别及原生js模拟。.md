---
title: 'call、apply、bind 原理、区别及原生js模拟。' 
date: 2018-12-09 2:30:08
hidden: true
slug: wc8j3gd6ozn
categories: [reprint]
---

{{< raw >}}

                    
<p>Function的prototype原型上存放着 Function实例 的一些共有方法。<br>A.Function的原型不像其他类(Array、Object...)的原型一样是个对象，Fuction的原型是一个空函数，是可以执行的，只不过返回undefined，Function.prototype();但是这并不影响它作为一个对象拥有自己的属性方法<br>B.Function这个类，同时也是Function的一个实例，所以它也具备__proto__属性，这个属性指向它自己的原型</p>
<p>1.call方法。每个函数都可以调用call方法，来改变当前这个函数执行的this关键字，并且支持传入参数;我们用原生js模拟call方法，来更加深刻了解它。<br>a.第一个参数为调用call方法的函数中的this指向<br>b.第二个及以后的参数为给调用call方法的函数传入的参数<br>c.执行这个函数，call方法返回的结果就是 调用他的函数返回的结果<br>d.将this指向销毁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.mycall = function(context){
    context = context || window;
    context.fn = this;
    var arr = [];
    for(var i = 1;i<arguments.length;i++){
        arr.push('arguments['+i+']');
    }
    var result = eval('context.fn('+arr.toString()+')');
    delete context.fn;
    return result;
}
var obj = {name:'qiaoshi'};
var a = {sex:1}
function say(n){
    console.log(this,n);
}
say.mycall(obj,a)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.mycall = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>)</span>{
    context = context || <span class="hljs-built_in">window</span>;
    context.fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;i&lt;<span class="hljs-built_in">arguments</span>.length;i++){
        arr.push(<span class="hljs-string">'arguments['</span>+i+<span class="hljs-string">']'</span>);
    }
    <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span>+arr.toString()+<span class="hljs-string">')'</span>);
    <span class="hljs-keyword">delete</span> context.fn;
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">'qiaoshi'</span>};
<span class="hljs-keyword">var</span> a = {<span class="hljs-attr">sex</span>:<span class="hljs-number">1</span>}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params">n</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>,n);
}
say.mycall(obj,a)
</code></pre>
<p>2.apply和call方法类似，作用都是改变当前函数执行的this指向，并且将函数执行。<br>唯一不同就是 call方法给当前函数传参是一个一个传。而apply是以数组方式传入参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.myApply =function(context,arr){
context = Object(context) || window;
context.fn = this;
var result;
if(!arr){
    result= context.fn();
}else{
    var args = [];
    for(var i=0;i<arr.length;i++){
        args.push('arr['+i+']');
    }
    result = eval('context.fn('+args.toString()+')')
}
delete context.fn;
return result;
}

var q = {name:'chuchu'};
var arg1 = 1;
var arg2= [123]
function eat(n,m){
    console.log(this,n,m);
}
eat.myApply(q,[arg1,arg2])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.myApply =<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context,arr</span>)</span>{
context = <span class="hljs-built_in">Object</span>(context) || <span class="hljs-built_in">window</span>;
context.fn = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">var</span> result;
<span class="hljs-keyword">if</span>(!arr){
    result= context.fn();
}<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">var</span> args = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        args.push(<span class="hljs-string">'arr['</span>+i+<span class="hljs-string">']'</span>);
    }
    result = <span class="hljs-built_in">eval</span>(<span class="hljs-string">'context.fn('</span>+args.toString()+<span class="hljs-string">')'</span>)
}
<span class="hljs-keyword">delete</span> context.fn;
<span class="hljs-keyword">return</span> result;
}

<span class="hljs-keyword">var</span> q = {<span class="hljs-attr">name</span>:<span class="hljs-string">'chuchu'</span>};
<span class="hljs-keyword">var</span> arg1 = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> arg2= [<span class="hljs-number">123</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eat</span>(<span class="hljs-params">n,m</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>,n,m);
}
eat.myApply(q,[arg1,arg2])
</code></pre>
<p>3.bind方法，是改变当前调用bind方法的函数this指向，但是不会立即执行当前函数，而是返回一个新的函数。并且支持给新的函数传入参数执行，从而出发之前调用bind方法的函数执行，并且参数透传进去。bind方法是高阶函数的一种。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.myBind = function(){
var context = arguments[0];
var self = this;
return function (){
    self.myApply(context,arguments)
}
};
var j = {name:1};
var k = [123]
function drink (k){
    console.log(this.name,k);
}
var fn = drink.myBind(j);
fn(k);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.myBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">var</span> context = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    self.myApply(context,<span class="hljs-built_in">arguments</span>)
}
};
<span class="hljs-keyword">var</span> j = {<span class="hljs-attr">name</span>:<span class="hljs-number">1</span>};
<span class="hljs-keyword">var</span> k = [<span class="hljs-number">123</span>]
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drink</span> (<span class="hljs-params">k</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name,k);
}
<span class="hljs-keyword">var</span> fn = drink.myBind(j);
fn(k);

</code></pre>
<p>实现原生 call、apply、bind方法的重点:<br>1.改变this指向:函数执行，点.前面是谁，this就是谁的原理改变this指向<br>2.参数透传:通过eval将字符串转变成js语法 去执行。<br>3.bind方法返回一个函数，返回的函数执行，会进行作用域查找context对象；并且通过原型链查找调用apply方法</p>
<p>call、apply、bind相同和区别<br>相同：都能改变函数执行的this指向<br>不同:callapply 是立即执行 bind是不执行</p>
<p>call传参是一个一个传入，apply是数组形式传入</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
call、apply、bind 原理、区别及原生js模拟。

## 原文链接
[https://segmentfault.com/a/1190000013900784](https://segmentfault.com/a/1190000013900784)

