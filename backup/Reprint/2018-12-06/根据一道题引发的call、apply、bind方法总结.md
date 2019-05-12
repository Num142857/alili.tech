---
title: '根据一道题引发的call、apply、bind方法总结' 
date: 2018-12-06 2:30:09
hidden: true
slug: kjb9poqzt1
categories: [reprint]
---

{{< raw >}}

                    
<p>这是一道今天遇到的面试题</p>
<p><span class="img-wrap"><img data-src="/img/bV8lco?w=330&amp;h=222" src="https://static.alili.tech/img/bV8lco?w=330&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为setTimeout属于匿名函数,this指向window,所以this.id = 1<br>但还是先总结一下call和apply的用法。</p>
<p>首先介绍一下call和apply的定义</p>
<blockquote>obj.call(thisObj, arg1, arg2,...)<br>obj.apply(thisObj, [arg1, arg2,...])</blockquote>
<p>call和apply的作用是改变函数运行时的上下文环境(改变this的指向),将obj绑定到thisObj</p>
<h3 id="articleHeader0">call和apply的作用</h3>
<p>当一个对象需要调用另外一个对象里面的方法的时候,可以用到call和apply,call和apply可以理解成是继承另外一个对象的方法。</p>
<p>首先我们建立两个对象obj1和obj2</p>
<p><span class="img-wrap"><img data-src="/img/bV8le6?w=325&amp;h=312" src="https://static.alili.tech/img/bV8le6?w=325&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果obj2对象要调用obj1中的func1方法(可以理解为在obj2的环境中执行obj1.func1方法)，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" obj1.func1.call(obj2); //输出：obj2Name
 obj1.func1.apply(obj2);//输出：obj2Name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code> obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(obj2)</span>; <span class="hljs-comment">//输出：obj2Name</span>
 obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.apply<span class="hljs-comment">(obj2)</span>;<span class="hljs-comment">//输出：obj2Name</span></code></pre>
<p>call和apply第一个参数都是表示obj1绑定的对象，如果obj1要绑定到this，此时obj1就是绑定到全局，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" obj1.func1.call(this);//输出：windowName
 obj1.func1.apply(this);//输出：windowName" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code> obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(this)</span>;<span class="hljs-comment">//输出：windowName</span>
 obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.apply<span class="hljs-comment">(this)</span>;<span class="hljs-comment">//输出：windowName</span></code></pre>
<p>如果obj2对象要调用obj1中的func2方法，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  obj1.func2.call(obj2,1,2);//输出：3
  obj1.func2.apply(obj2,[1,2]);//输出：3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>  obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc2</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(obj2,1,2)</span>;<span class="hljs-comment">//输出：3</span>
  obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc2</span>.apply<span class="hljs-comment">(obj2,[1,2])</span>;<span class="hljs-comment">//输出：3</span></code></pre>
<h3 id="articleHeader1">call和apply实现继承</h3>
<p>使用call方法调用父构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError(
      'Cannot create product ' + this.name + ' with a negative price'
    );
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

//等同于
function Food(name, price) {
  this.name = name;
  this.price = price;
  if (price < 0) {
    throw RangeError(
      'Cannot create product ' + this.name + ' with a negative price'
    );
  }

  this.category = 'food';
}

//function Toy 同上
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function Product(name, price) {
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.price = price;

  <span class="hljs-keyword">if</span> (price &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> RangeError(
      <span class="hljs-string">'Cannot create product '</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">' with a negative price'</span>
    );
  }
}

function Food(name, price) {
  Product.call(<span class="hljs-keyword">this</span>, name, price);
  <span class="hljs-keyword">this</span>.category = <span class="hljs-string">'food'</span>;
}

<span class="hljs-comment">//等同于</span>
function Food(name, price) {
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.price = price;
  <span class="hljs-keyword">if</span> (price &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> RangeError(
      <span class="hljs-string">'Cannot create product '</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">' with a negative price'</span>
    );
  }

  <span class="hljs-keyword">this</span>.category = <span class="hljs-string">'food'</span>;
}

<span class="hljs-comment">//function Toy 同上</span>
function Toy(name, price) {
  Product.call(<span class="hljs-keyword">this</span>, name, price);
  <span class="hljs-keyword">this</span>.category = <span class="hljs-string">'toy'</span>;
}

<span class="hljs-keyword">var</span> cheese = new Food(<span class="hljs-string">'feta'</span>, <span class="hljs-number">5</span>);
<span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> = new <span class="hljs-title">Toy</span><span class="hljs-params">(<span class="hljs-string">'robot'</span>, <span class="hljs-number">40</span>)</span></span>;</code></pre>
<h3 id="articleHeader2">bind方法和call、apply的区别</h3>
<p>bind方法也是用来改变this的指向</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    user:&quot;追梦子&quot;,
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
b.bind(a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">user</span>:<span class="hljs-string">"追梦子"</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.user);
    }
}
<span class="hljs-keyword">var</span> b = a.fn;
b.bind(a);</code></pre>
<p>没有被打印,这就是bind方法与apply、call方法的不同。bind方法返回的是修改过后的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    user:&quot;追梦子&quot;,
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
var c = b.bind(a);
c();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">user</span>:<span class="hljs-string">"追梦子"</span>,
    <span class="hljs-attr">fn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.user); <span class="hljs-comment">//追梦子</span>
    }
}
<span class="hljs-keyword">var</span> b = a.fn;
<span class="hljs-keyword">var</span> c = b.bind(a);
c();</code></pre>
<p>执行成功</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
根据一道题引发的call、apply、bind方法总结

## 原文链接
[https://segmentfault.com/a/1190000014342422](https://segmentfault.com/a/1190000014342422)

