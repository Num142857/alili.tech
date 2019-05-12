---
title: '深入理解 React 中的上下文 this' 
date: 2019-02-06 2:30:09
hidden: true
slug: 4hk02duunr7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p><code>JavaScript</code>中的作用域<code>scope</code> 和上下文 <code>context</code> 是这门语言的独到之处，每个函数有不同的变量上下文和作用域。这些概念是<code>JavaScript</code>中一些强大的设计模式的后盾。在ES5规范里，我们可以遵循一个原则——每个<code>function</code>内的上下文<code>this</code>指向该<code>function</code>的调用方。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Module = {
    name: 'Jafeney',
    first: function() {
        console.log(this);   // this对象指向调用该方法的Module对象
        var second = (function() {
            console.log(this)  // 由于变量提升，this对象指向Window对象
        })()
    },
    init: function() {
        this.first()
    }
}

Module.init()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Module = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Jafeney'</span>,
    <span class="hljs-attr">first</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);   <span class="hljs-comment">// this对象指向调用该方法的Module对象</span>
        <span class="hljs-keyword">var</span> second = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)  <span class="hljs-comment">// 由于变量提升，this对象指向Window对象</span>
        })()
    },
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.first()
    }
}

Module.init()</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006769772" src="https://static.alili.tech/img/remote/1460000006769772" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>但是，在ES6规范中，出现了一个逆天的箭头操作符 <code>=&gt;</code> ，它可以替代原先ES5里<code>function</code>的作用，快速声明函数。那么，在没有了<code>function</code>关键字，箭头函数内部的上下文<code>this</code>是怎样一种情况呢？</p>
<h2 id="articleHeader1">ES6 中的箭头函数</h2>
<p>在阮一峰老师的<a href="http://es6.ruanyifeng.com/?search=fetch&amp;x=0&amp;y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a> 中，对箭头函数的做了如下介绍：</p>
<h3 id="articleHeader2">箭头函数的基本介绍</h3>
<p>ES6 允许使用“箭头”<code>=&gt;</code> 定义函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = v => v;
//上面的箭头函数等同于：
var f = function(v) {
  return v;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v;
<span class="hljs-comment">//上面的箭头函数等同于：</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
  <span class="hljs-keyword">return</span> v;
};</code></pre>
<ul>
<li>
<p>如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = () => 5;
// 等同于
var f = function () { return 5 };
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">5</span>;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">5</span> };
<span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> num1 + num2;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num1, num2</span>) </span>{
  <span class="hljs-keyword">return</span> num1 + num2;
};</code></pre>
</li>
<li>
<p>如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用<code>return</code>语句返回（重要）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = (num1, num2) => { return num1 + num2; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">var sum = <span class="hljs-function"><span class="hljs-params">(num1, num2)</span> =&gt;</span> { <span class="hljs-keyword">return</span> num1 + num2; }</code></pre>
</li>
<li>
<p>由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号（重要）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getTempItem = id => ({ id: id, name: &quot;Temp&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> getTempItem = <span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> ({ <span class="hljs-attr">id</span>: id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Temp"</span> });</code></pre>
</li>
<li>
<p>箭头函数可以与变量解构结合使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> full = <span class="hljs-function">(<span class="hljs-params">{ first, last }</span>) =&gt;</span> first + <span class="hljs-string">' '</span> + last;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">full</span>(<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">return</span> person.first + <span class="hljs-string">' '</span> + person.last;
}</code></pre>
</li>
<li>
<p>箭头函数使得表达更加简洁</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isEven = n => n % 2 == 0;
const square = n => n * n;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>const <span class="hljs-built_in">isEven</span> = <span class="hljs-built_in">n</span> =&gt; <span class="hljs-built_in">n</span> % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>;
const square = <span class="hljs-built_in">n</span> =&gt; <span class="hljs-built_in">n</span> * <span class="hljs-built_in">n</span>;</code></pre>
<blockquote><p>上面代码只用了两行，就定义了两个简单的工具函数。如果不用箭头函数，可能就要占用多行，而且还不如现在这样写醒目。</p></blockquote>
</li>
<li>
<p>箭头函数的一个用处是简化回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 正常函数写法</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x * x;
});

<span class="hljs-comment">// 箭头函数写法</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x * x);</code></pre>
</li>
</ul>
<h3 id="articleHeader3">箭头函数使用注意点</h3>
<ol>
<li><p>函数体内的<code>this</code>对象，就是定义时所在的对象，而不是使用时所在的对象。</p></li>
<li><p>不可以当作构造函数，也就是说，不可以使用<code>new</code>命令，否则会抛出一个错误。</p></li>
<li><p>不可以使用<code>arguments</code>对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。</p></li>
<li><p>不可以使用<code>yield</code>命令，因此箭头函数不能用作<code>Generator</code>函数。</p></li>
</ol>
<h3 id="articleHeader4">
<code>this</code> 指向固定化</h3>
<p>ES5规范中，<code>this</code>对象的指向是可变的，但是在ES6的箭头函数中，它却是固定的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });   // 输出 id: 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">var</span> id = <span class="hljs-number">21</span>;

foo.call({ <span class="hljs-attr">id</span>: <span class="hljs-number">42</span> });   <span class="hljs-comment">// 输出 id: 42</span></code></pre>
<blockquote><p>注意：上面代码中，<code>setTimeout</code>的参数是一个箭头函数，这个箭头函数的定义生效是在<code>foo</code>函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时<code>this</code>应该指向全局对象<code>window</code>，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是<code>{id: 42}</code>），所以输出的是42。</p></blockquote>
<h3 id="articleHeader5">箭头函数的原理</h3>
<p><code>this</code>指向的固定化，并不是因为箭头函数内部有绑定<code>this</code>的机制，实际原因是箭头函数根本没有自己的<code>this</code>，导致内部的<code>this</code>就是外层代码块的<code>this</code>。正是因为它没有<code>this</code>，所以也就不能用作构造函数。所以，箭头函数转成ES5的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-comment">// ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, _this.id);
  }, <span class="hljs-number">100</span>);
}</code></pre>
<blockquote><p>上面代码中，转换后的ES5版本清楚地说明了，箭头函数里面根本没有自己的<code>this</code>，而是引用外层的<code>this</code>。</p></blockquote>
<h3 id="articleHeader6">两道经典的面试题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 请问下面有几个this 

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // 输出 id: 1
var t2 = f().call({id: 3})(); // 输出 id: 1
var t3 = f()().call({id: 4}); // 输出 id: 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 请问下面有几个this </span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
      };
    };
  };
}

<span class="hljs-keyword">var</span> f = foo.call({<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>});

<span class="hljs-keyword">var</span> t1 = f.call({<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>})()(); <span class="hljs-comment">// 输出 id: 1</span>
<span class="hljs-keyword">var</span> t2 = f().call({<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>})(); <span class="hljs-comment">// 输出 id: 1</span>
<span class="hljs-keyword">var</span> t3 = f()().call({<span class="hljs-attr">id</span>: <span class="hljs-number">4</span>}); <span class="hljs-comment">// 输出 id: 1</span></code></pre>
<blockquote><p>上面代码之中，其实只有一个<code>this</code>，就是函数foo的<code>this</code>，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的<code>this</code>，它们的this其实都是最外层foo函数的this。另外，<strong>由于箭头函数没有自己的this，所以也不能用<code>call()</code>、<code>apply()</code>、<code>bind()</code>这些方法去改变this的指向</strong>。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 请问下面代码执行输出什么

(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 请问下面代码执行输出什么</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; <span class="hljs-keyword">this</span>.x</span>).<span class="hljs-params">bind</span>(<span class="hljs-params">{ x: 'inner' }</span>)<span class="hljs-params">()</span>
  ];
}).<span class="hljs-params">call</span>(<span class="hljs-params">{ x: 'outer' }</span>);</span></code></pre>
<blockquote><p>上面代码中，箭头函数没有自己的<code>this</code>，所以<code>bind</code>方法无效，内部的<code>this</code>指向外部的<code>this</code>。所以上面的代码最终输出 <code>['outer']</code>。</p></blockquote>
<h3 id="articleHeader7">函数绑定 <code>::</code>
</h3>
<p>箭头函数可以绑定<code>this</code>对象，大大减少了显式绑定this对象的写法（<code>call</code>、<code>apply</code>、<code>bind</code>）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（<code>function</code> <code>bind</code>）运算符，用来取代<code>call</code>、<code>apply</code>、<code>bind</code>调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。</p>
<p>函数绑定运算符是并排的两个双冒号（<code>::</code>），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即<code>this</code>对象），绑定到右边的函数上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>foo::bar;
<span class="hljs-comment">// 等同于</span>
bar.bind(foo);

foo::bar(...arguments);
<span class="hljs-comment">// 等同于</span>
bar.apply(foo, arguments);

<span class="hljs-keyword">const</span> hasOwnProperty = Object.prototype.hasOwnProperty;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasOwn</span><span class="hljs-params">(obj, key)</span> </span>{
  <span class="hljs-keyword">return</span> obj::hasOwnProperty(key);
}</code></pre>
<p>如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">method</span> = <span class="hljs-title">obj</span>:</span>:obj.foo;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">method</span> = :</span>:obj.foo;

let log = ::console.log;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> log = console.log.bind(console);</code></pre>
<p>由于双冒号运算符返回的还是原对象，因此可以采用链式写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例一
import { map, takeWhile, forEach } from &quot;iterlib&quot;;

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

// 例二
let { find, html } = jake;

document.querySelectorAll(&quot;div.myClass&quot;)
::find(&quot;p&quot;)
::html(&quot;hahaha&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 例一</span>
<span class="hljs-keyword">import</span> { map, takeWhile, forEach } <span class="hljs-keyword">from</span> <span class="hljs-string">"iterlib"</span>;

getPlayers()
::map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.character())
::takeWhile(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.strength &gt; <span class="hljs-number">100</span>)
::forEach(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x));

<span class="hljs-comment">// 例二</span>
<span class="hljs-keyword">let</span> { find, html } = jake;

<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">"div.myClass"</span>)
::find(<span class="hljs-string">"p"</span>)
::html(<span class="hljs-string">"hahaha"</span>);</code></pre>
<h2 id="articleHeader8">React 中的各种 <code>this</code>
</h2>
<p>目前<code>React</code>的编写风格已经全面地启用了ES6和部分ES7规范，所以很多ES6的坑在<code>React</code>里一个个浮现了。本篇重点介绍 <code>this</code>，也是近期跌得最疼的一个。</p>
<h3 id="articleHeader9">Component 方法内部的 <code>this</code>
</h3>
<p>还是用具体的例子来解释吧，下面是我 <a href="https://github.com/Jafeney/Royal" rel="nofollow noreferrer" target="_blank"><code>Royal</code></a> 项目里一个<code>Table</code>组件（<code>Royal</code>正在开发中，欢迎<a href="https://github.com/Jafeney/Royal" rel="nofollow noreferrer" target="_blank"><code>fork</code></a>贡献代码 ^_^）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import Checkbox from '../../FormControls/Checkbox/' 
import './style.less'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: props.dataSource || [],
            columns: props.columns || [],
            wrapClass: props.wrapClass || null,
            wrapStyle: props.wrapStyle || null,
            style: props.style || null,
            className: props.className || null,
        }
        this.renderRow = props.renderRow || null
    }

    onSelectAll() {
        for (let ref in this.refs) {
            if (ref!=='selectAll') {
                this.refs[ref].setState({checked:true})
            }
        }
    }

    offSelectAll() {
        for (let ref in this.refs) {
            if (ref!=='selectAll') {
                this.refs[ref].setState({checked:false})
            }
        }
    }

    _renderHead() {
        return this.state.columns.map((item,i) => {
            return [<th>{i===0?<Checkbox ref=&quot;selectAll&quot; onConfirm={()=>this.onSelectAll()} onCancel={()=>this.offSelectAll()} />:''}{item.title}</th>]
        })
    }

    _renderBody() {
        let _renderRow = this.renderRow;
        return this.state.dataSource.map((item) => {
            return _renderRow &amp;&amp; _renderRow(item)
        })
    }

    render() {
        let state = this.state;
        return (
            <div className={state.wrapClass} style={state.wrapStyle}>
                <table
                    border=&quot;0&quot;
                    style={state.style}
                    className={&quot;ry-table &quot; + (state.className &amp;&amp; state.className : &quot;&quot;)}>
                    <thead>
                        <tr>{this._renderHead()}</tr>
                    </thead>
                    <tbody>
                        {this._renderBody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Checkbox from <span class="hljs-string">'../../FormControls/Checkbox/'</span> 
<span class="hljs-keyword">import</span> <span class="hljs-string">'./style.less'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            dataSource: props.dataSource || [],
            columns: props.columns || [],
            wrapClass: props.wrapClass || <span class="hljs-literal">null</span>,
            wrapStyle: props.wrapStyle || <span class="hljs-literal">null</span>,
            style: props.style || <span class="hljs-literal">null</span>,
            className: props.className || <span class="hljs-literal">null</span>,
        }
        <span class="hljs-keyword">this</span>.renderRow = props.renderRow || <span class="hljs-literal">null</span>
    }

    onSelectAll() {
        <span class="hljs-keyword">for</span> (let ref <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.refs) {
            <span class="hljs-keyword">if</span> (ref!==<span class="hljs-string">'selectAll'</span>) {
                <span class="hljs-keyword">this</span>.refs[ref].setState({checked:<span class="hljs-literal">true</span>})
            }
        }
    }

    offSelectAll() {
        <span class="hljs-keyword">for</span> (let ref <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.refs) {
            <span class="hljs-keyword">if</span> (ref!==<span class="hljs-string">'selectAll'</span>) {
                <span class="hljs-keyword">this</span>.refs[ref].setState({checked:<span class="hljs-literal">false</span>})
            }
        }
    }

    _renderHead() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.columns.map((item,i) =&gt; {
            <span class="hljs-keyword">return</span> [&lt;th&gt;{i===<span class="hljs-number">0</span>?&lt;Checkbox ref=<span class="hljs-string">"selectAll"</span> onConfirm={()=&gt;<span class="hljs-keyword">this</span>.onSelectAll()} onCancel={()=&gt;<span class="hljs-keyword">this</span>.offSelectAll()} /&gt;:<span class="hljs-string">''</span>}{item.title}&lt;/th&gt;]
        })
    }

    _renderBody() {
        let _renderRow = <span class="hljs-keyword">this</span>.renderRow;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.dataSource.map((item) =&gt; {
            <span class="hljs-keyword">return</span> _renderRow &amp;&amp; _renderRow(item)
        })
    }

    render() {
        let state = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">return</span> (
            &lt;div className={state.wrapClass} style={state.wrapStyle}&gt;
                &lt;table
                    border=<span class="hljs-string">"0"</span>
                    style={state.style}
                    className={<span class="hljs-string">"ry-table "</span> + (state.className &amp;&amp; state.className : <span class="hljs-string">""</span>)}&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;{<span class="hljs-keyword">this</span>._renderHead()}&lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        {<span class="hljs-keyword">this</span>._renderBody()}
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
        )
    }
}

export <span class="hljs-keyword">default</span> Table</code></pre>
<p><code>Component</code>是<code>React</code>内的一个基类，用于继承和创建<code>React</code>自定义组件。ES6规范下的面向对象实现起来非常精简，<code>class</code>关键字 可以快速创建一个类，而<code>Component</code>类内的所有属性和方法均可以通过<code>this</code>访问。换而言之，在<code>Component</code>内的任意方法内，可以通过<code>this.xxx</code>的方式调用该<code>Component</code>的其他属性和方法。</p>
<p>接着分析上面的代码，寥寥几行实现的是对一个Table组件的封装，借鉴了<code>ReactNative</code>组件的设计思路，通过外部传递<code>dataSource</code>（数据源）、<code>columns</code>（表格的表头项）、<code>renderRow</code>（当行渲染的模板函数）来完成一个Table的构建，支持全选和取消全选的功能、允许外部传递<code>className</code>和<code>style</code>对象来修改样式。</p>
<blockquote><p>从这个例子我们可以发现：只要不采用<code>function</code>定义函数，<code>Component</code>所有方法内部的<code>this</code>对象始终指向该类自身。</p></blockquote>
<h3 id="articleHeader10">container 调用 component 时传递的 <code>this</code>
</h3>
<p>还是继续上面的例子，下面在一个做为Demo的<code>container</code>里调用之前 的<code>Table</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Table from '../../components/Views/Table/' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Table <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/Views/Table/'</span> </code></pre>
<p>接着编写<code>renderRow</code>函数并传递给Table组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_renderRow(row) {
    // ------------ 注意：这里对callback函数的写法 -----------
    let onEdit = (x)=> {
        console.log(x+x)
    }, onDelete = (x)=> {
        console.log(x*x)
    }
    // ---------------------------------------------------
    return (
        <tr>
            <td><Checkbox ref={&quot;item_&quot; + row.key} />{row.key}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.birthday}</td>
            <td>{row.job}</td>
            <td>{row.address}</td>
            <td>
                <Button type=&quot;primary&quot; callback={()=>onEdit(row.key)} text=&quot;编辑&quot; />
                <Button type=&quot;secondary&quot; callback={()=>onDelete(row.key)} text=&quot;删除&quot; />
            </td>
        </tr>
    )
}

//... 省略一大堆代码

render() {
    let dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        birthday: '2016-12-29',
        job: '前端工程师',
        address: '西湖区湖底公园1号'
        }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        birthday: '2016-12-29',
        job: '前端工程师',
        address: '西湖区湖底公园1号'
    }],columns = [{
        title: '编号',
        dataIndex: 'key',
        key: 'key',
        },{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        }, {
        title: '职务',
        dataIndex: 'job',
        key: 'job',
        },{
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
    }];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} renderRow={this._renderRow}/>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>_renderRow(row) {
    // ------------ 注意：这里对callback函数的写法 -----------
    let onEdit = (x)=&gt; {
        console.log(x+x)
    }, onDelete = (x)=&gt; {
        console.log(x*x)
    }
    // ---------------------------------------------------
    return (
        &lt;tr&gt;
            &lt;td&gt;&lt;Checkbox ref={<span class="hljs-string">"item_"</span> + row.key} /&gt;{row.key}&lt;/td&gt;
            &lt;td&gt;{row.name}&lt;/td&gt;
            &lt;td&gt;{row.age}&lt;/td&gt;
            &lt;td&gt;{row.birthday}&lt;/td&gt;
            &lt;td&gt;{row.job}&lt;/td&gt;
            &lt;td&gt;{row.address}&lt;/td&gt;
            &lt;td&gt;
                &lt;Button type=<span class="hljs-string">"primary"</span> callback={()=&gt;onEdit(row.key)} text=<span class="hljs-string">"编辑"</span> /&gt;
                &lt;Button type=<span class="hljs-string">"secondary"</span> callback={()=&gt;onDelete(row.key)} text=<span class="hljs-string">"删除"</span> /&gt;
            &lt;/td&gt;
        &lt;/tr&gt;
    )
}

//... 省略一大堆代码

render() {
    let dataSource = [{
        key: <span class="hljs-string">'1'</span>,
        name: <span class="hljs-string">'胡彦斌'</span>,
        age: <span class="hljs-number">32</span>,
        birthday: <span class="hljs-string">'2016-12-29'</span>,
        job: <span class="hljs-string">'前端工程师'</span>,
        address: <span class="hljs-string">'西湖区湖底公园1号'</span>
        }, {
        key: <span class="hljs-string">'2'</span>,
        name: <span class="hljs-string">'胡彦祖'</span>,
        age: <span class="hljs-number">42</span>,
        birthday: <span class="hljs-string">'2016-12-29'</span>,
        job: <span class="hljs-string">'前端工程师'</span>,
        address: <span class="hljs-string">'西湖区湖底公园1号'</span>
    }],columns = [{
        title: <span class="hljs-string">'编号'</span>,
        dataIndex: <span class="hljs-string">'key'</span>,
        key: <span class="hljs-string">'key'</span>,
        },{
        title: <span class="hljs-string">'姓名'</span>,
        dataIndex: <span class="hljs-string">'name'</span>,
        key: <span class="hljs-string">'name'</span>,
        }, {
        title: <span class="hljs-string">'年龄'</span>,
        dataIndex: <span class="hljs-string">'age'</span>,
        key: <span class="hljs-string">'age'</span>,
        }, {
        title: <span class="hljs-string">'生日'</span>,
        dataIndex: <span class="hljs-string">'birthday'</span>,
        key: <span class="hljs-string">'birthday'</span>,
        }, {
        title: <span class="hljs-string">'职务'</span>,
        dataIndex: <span class="hljs-string">'job'</span>,
        key: <span class="hljs-string">'job'</span>,
        },{
        title: <span class="hljs-string">'住址'</span>,
        dataIndex: <span class="hljs-string">'address'</span>,
        key: <span class="hljs-string">'address'</span>,
        }, {
        title: <span class="hljs-string">'操作'</span>,
        dataIndex: <span class="hljs-string">'operate'</span>,
        key: <span class="hljs-string">'operate'</span>,
    }];
    return (
        &lt;div&gt;
            &lt;Table dataSource={dataSource} columns={columns} renderRow={this._renderRow}/&gt;
        &lt;/div&gt;
    );
}</code></pre>
<p>显示效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006032234" src="https://static.alili.tech/img/remote/1460000006032234" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>分析上面的代码，有几处容易出错的地方：</p>
<ol>
<li><p><code>_renderRow</code> 作为<code>component</code>的方法来定义，然后在对应的<code>render</code>函数内通过<code>this</code>来调用。很重要的一点，这里<code>this._renderRow</code>作为的是函数名方式传递。</p></li>
<li>
<p><code>_renderRow</code> 内部<code>Button</code>组件的<code>callback</code>是按钮点击后触发的回调，也是一个函数，但是这个函数没有像上面一样放在<code>component</code>的方法里定义，而是作为一个变量定义并通过匿名函数的方式传递给子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let onEdit = (x)=> {
    console.log(x+x)
}

// .....
callback={()=>onEdit(row.key)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> onEdit = <span class="hljs-function">(<span class="hljs-params">x</span>)=&gt;</span> {
    <span class="hljs-built_in">console</span>.log(x+x)
}

<span class="hljs-comment">// .....</span>
callback={<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>onEdit(row.key)}</code></pre>
<p>这样就避开了使用<code>this</code>时上下文变化的问题。这一点是很讲究的，如果沿用上面的写法很容易这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onEdit(x) {
   console.log(x+x)
}

// ... 
callback={()=>this.onEdit(row.key)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>onEdit(x) {
   <span class="hljs-built_in">console</span>.log(x+x)
}

<span class="hljs-comment">// ... </span>
callback={<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-keyword">this</span>.onEdit(row.key)}</code></pre>
<p>但是很遗憾，这样写<code>this</code>传递到子组件后会变成<code>undefined</code>，从而报错。</p>
</li>
<li>
<p>父组件如要调用子组件的方法，有两种方式：</p>
<ul>
<li>
<p>第一种   通过匿名函数的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback = {()=>this.modalShow()}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;">callback = {<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-keyword">this</span>.modalShow()}</code></pre>
</li>
<li>
<p>第二种   使用 <code>bind</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback = {this.modalShow.bind(this)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">callback = {<span class="hljs-keyword">this</span>.modalShow.bind(<span class="hljs-keyword">this</span>)}</code></pre>
</li>
</ul>
</li>
</ol>
<blockquote><p>注意：如果要绑定的函数需要传参数，可以这么写： <code>xxx.bind(this,arg1,arg2...)</code></p></blockquote>
<h2 id="articleHeader11">参考</h2>
<p><a href="http://es6.ruanyifeng.com/?search=fetch&amp;x=0&amp;y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a></p>
<hr>
<p>@欢迎关注我的 <a href="https://github.com/Jafeney" rel="nofollow noreferrer" target="_blank"><code>github</code></a> 和 <a href="http://jafeney.com" rel="nofollow noreferrer" target="_blank">个人博客 －Jafeney</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 React 中的上下文 this

## 原文链接
[https://segmentfault.com/a/1190000006032223](https://segmentfault.com/a/1190000006032223)

