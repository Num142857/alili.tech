---
title: '真正理解 JavaScript （中高级知识总结）' 
date: 2018-12-24 2:30:07
hidden: true
slug: pp74cwv8ax
categories: [reprint]
---

{{< raw >}}

                    
<p>分享一篇我在2015年底做的总结笔记。本文整理了我对 JavaScript 的一些理解，试将零散的知识归总。此文非语法整理，内容偏中高级，如有纰漏或错误，请予以指正。</p>
<h2 id="articleHeader0">1. 对象模型</h2>
<h3 id="articleHeader1">1.1. 数据类型</h3>
<p>在 JavaScript 的语法层面，除了 <code>undefined</code> 和 <code>null</code> 一切皆对象，字面量也是对象，而 <code>null</code> 的类型也是对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'foo'.substring(1);
3.1415926.toFixed(2);
typeof null; // 'object'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'foo'</span>.substring(<span class="hljs-number">1</span>);
<span class="hljs-number">3.1415926</span>.toFixed(<span class="hljs-number">2</span>);
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// 'object'</span></code></pre>
<p>JavaScript 语言中内置了一些对象用来辅助用户编程，它们均是 <code>函数对象</code> ，如：</p>
<ul>
<li>Function</li>
<li>Object</li>
<li>String</li>
<li>Number</li>
</ul>
<p>解析引擎中创建了诸多内建类型，它们是实现 JavaScript 各类型的数据结构。</p>
<p>基本类型的字面量创建方式会直接调用解析引擎来创建 JavaScript 对象，它不是内置函数对象的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 'foo';
console.log(foo instanceof String); // false
foo = new String('foo');
console.log(foo instanceof String); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'foo'</span>;
<span class="hljs-built_in">console</span>.log(foo <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>); <span class="hljs-comment">// false</span>
foo = <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'foo'</span>);
<span class="hljs-built_in">console</span>.log(foo <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>); <span class="hljs-comment">// true</span></code></pre>
<p>对象(这里指语法层面的对象)、正则、数组等的字面量创建方式会调用内置函数对象来创建实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {};
console.log(foo instanceof Object); // true
foo = new Object();
console.log(foo instanceof Object); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = {};
<span class="hljs-built_in">console</span>.log(foo <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>); <span class="hljs-comment">// true</span>
foo = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-built_in">console</span>.log(foo <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>); <span class="hljs-comment">// true</span></code></pre>
<p>归纳如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi0b?w=2204&amp;h=1076" src="https://static.alili.tech/img/bVZi0b?w=2204&amp;h=1076" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1.2. 函数对象</h3>
<p>任何JS对象均需要由函数对象创建。<strong>函数对象</strong>是在普通对象的基础上增加了内建的属性 <code>[[Call]]</code> 和 <code>[[Construct]]</code> ，这一过程由解释器完成，两个属性均指向解释器的内建函数：[[Call]] 用于函数调用，使用操作符 <code>()</code> 时执行；[[Construct]] 用于构造对象，使用操作符 <code>new</code> 时执行。</p>
<p>语法层面上，函数对象也是由其它函数对象(或自己)创建的，使用 <code>function</code> 关键字可以创建用户自定义函数对象。最上游的对象是 <code>Function</code> 。</p>
<p><span class="img-wrap"><img data-src="/img/bVZi0k?w=1402&amp;h=372" src="https://static.alili.tech/img/bVZi0k?w=1402&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当对象被创建后，解释器为对象增加 <code>constructor</code> 属性指向创建它的函数对象。</p>
<h3 id="articleHeader3">1.3. 原型对象</h3>
<p>原型对象通常由内置函数对象 <code>Object</code> 创建，它通常是一个普通对象，但也可能是函数对象。</p>
<p>任何对象都有内建属性 <code>[[Prototype]]</code> 用来指向其原型对象，有些解释器(如V8)会将其开放为 <code>__proto__</code> 属性供用户代码调用。函数对象有开放属性 <code>prototype</code> ，用来表示通过函数对象构建的对象的原型。</p>
<p>以下条件总是为 true ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="函数对象.prototype === 该函数对象创建的对象.__proto__
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>函数对象.proto<span class="hljs-keyword">type</span> === 该函数对象创建的对象.__proto__
</code></pre>
<p>示例如下代码的原型关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    this.foo = 'foo';
};
Foo.prototype.bar = 'bar';
var f1 = new Foo();
var f2 = new Foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.foo = <span class="hljs-string">'foo'</span>;
};
Foo.prototype.bar = <span class="hljs-string">'bar'</span>;
<span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">new</span> Foo();
<span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">new</span> Foo();</code></pre>
<p>对象指向原型对象的层层链条构成<strong>原型链</strong>，对象查找属性时沿着原型链向上游找。</p>
<p><span class="img-wrap"><img data-src="/img/bVZi0F?w=1474&amp;h=536" src="https://static.alili.tech/img/bVZi0F?w=1474&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通常情况下，<code>Function.prototype</code> 为解析引擎创建的空函数，<code>Object.prototype</code> 为解析引擎创建的空对象。</p>
<h3 id="articleHeader4">1.4. 对象的关系</h3>
<p>示例如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){};
var foo = new Foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{};
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo();</code></pre>
<p>再加上内置函数对象 String，其关系如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi04?w=1890&amp;h=686" src="https://static.alili.tech/img/bVZi04?w=1890&amp;h=686" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>有如下规律：</p>
<ul>
<li>所有函数对象的原型最终指向 Function.prototype ；</li>
<li>所有普通对象(除 Object.prototype)的原型最终指向 Object.prototype，而 Object.prototype 的原型为 null ；</li>
<li>所有 constructor 最终指向 Function ，包括它自己；</li>
<li>所有原型对象的 constructor 的 prototype 指向自己，普通对象不具备该特性。</li>
</ul>
<h2 id="articleHeader5">2. 执行模型</h2>
<p>函数生命周期包括：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi1h?w=1270&amp;h=598" src="https://static.alili.tech/img/bVZi1h?w=1270&amp;h=598" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">2.1. 执行上下文</h3>
<p><code>执行上下文(Execution Context)</code> 是对可执行代码的抽象，某特定时刻下它们是等价的。发生函数调用的时候，正在执行的上下文被中断并将新的执行上下文压入执行上下文栈中，调用结束后(return 或 throw Error)新的上下文从栈中弹出并继续执行之前的上下文。栈底总是<code>全局执行上下文</code>：</p>
<p><span class="img-wrap"><img data-src="/img/bVZiZ4?w=1362&amp;h=252" src="https://static.alili.tech/img/bVZiZ4?w=1362&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>变量对象(Variable Object)</strong>是执行上下文中的一种数据结构，用来存储：</p>
<ul>
<li>变量</li>
<li>函数声明</li>
<li>形参</li>
</ul>
<p>变量对象为抽象概念，其实现分两种情况：</p>
<p>一、全局执行上下文中的变量对象使用全局对象自身实现，因此全局变量可以通过相应的变量对象访问到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 'foo'
alert(window.foo); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'foo'</span>
alert(<span class="hljs-built_in">window</span>.foo); </code></pre>
<p>二、函数执行上下文中的变量对象为<strong>活动对象(Activation Object)</strong>，用户代码无法直接访问它。</p>
<p><span class="img-wrap"><img data-src="/img/bVZi1Y?w=1688&amp;h=712" src="https://static.alili.tech/img/bVZi1Y?w=1688&amp;h=712" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">2.2. 函数执行过程</h3>
<p>函数执行前会先为其创建执行环境：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi2w?w=1106&amp;h=194" src="https://static.alili.tech/img/bVZi2w?w=1106&amp;h=194" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>示例以下代码的执行过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(foo1, foo2) {
    var foo3 = 'foo3';
    var foo4 = function () {};
    this.foo5 = 'foo5';
    function foo6() {};
    foo6();
}
foo('foo1', 'foo2', 'more');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">foo1, foo2</span>) </span>{
    <span class="hljs-keyword">var</span> foo3 = <span class="hljs-string">'foo3'</span>;
    <span class="hljs-keyword">var</span> foo4 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
    <span class="hljs-keyword">this</span>.foo5 = <span class="hljs-string">'foo5'</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo6</span>(<span class="hljs-params"></span>) </span>{};
    foo6();
}
foo(<span class="hljs-string">'foo1'</span>, <span class="hljs-string">'foo2'</span>, <span class="hljs-string">'more'</span>);</code></pre>
<p><strong>1) 创建执行环境</strong></p>
<p>该过程重点是创建 <code>活动对象</code> 的命名属性：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi2T?w=1600&amp;h=1104" src="https://static.alili.tech/img/bVZi2T?w=1600&amp;h=1104" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>2) 依次执行代码</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVZi2Z?w=1508&amp;h=424" src="https://static.alili.tech/img/bVZi2Z?w=1508&amp;h=424" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>理解了函数执行过程便可以解释局部变量的初始化时机问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 'global';
function bar() {
    alert(foo);  // undefined
    var foo = 'local';
}
bar();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'global'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    alert(foo);  <span class="hljs-comment">// undefined</span>
    <span class="hljs-keyword">var</span> foo = <span class="hljs-string">'local'</span>;
}
bar();</code></pre>
<p>同时也解释了两种函数声明方式的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();  // foo
bar();  // TypeError: bar is not a function.
function foo() {
    console.log('foo');
}
var bar = function () {
    console.log('bar');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo();  <span class="hljs-comment">// foo</span>
bar();  <span class="hljs-comment">// TypeError: bar is not a function.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo'</span>);
}
<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>);
};</code></pre>
<p>根据活动对象的属性填充顺序，也可以解释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(x); // function
var x = 10;
alert(x); // 10
x = 20;
function x() {};
alert(x); // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">alert(x); <span class="hljs-comment">// function</span>
<span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
alert(x); <span class="hljs-comment">// 10</span>
x = <span class="hljs-number">20</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">x</span>(<span class="hljs-params"></span>) </span>{};
alert(x); <span class="hljs-comment">// 20</span></code></pre>
<h3 id="articleHeader8">2.2. 作用域</h3>
<p>示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
function foo() {
    var y = 2;
    function bar() {
        var z = 3;
        alert(x +  y + z);
    }
    bar();
}
foo(); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> y = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> z = <span class="hljs-number">3</span>;
        alert(x +  y + z);
    }
    bar();
}
foo(); <span class="hljs-comment">// 6</span></code></pre>
<p>其作用域相关的属性创建过程如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi3n?w=1942&amp;h=832" src="https://static.alili.tech/img/bVZi3n?w=1942&amp;h=832" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其中函数对象的内部属性 <code>[[Scope]]</code> 在某些解释器中实现为 <code>__parent__</code> 并开放给用户代码。执行上下文中的 <code>Scope</code> 属性构成 <strong>作用域链</strong>，其实现未必像图中所示使用数组，也可以使用链表等数据结构，ECMAScript 规范对解释器的实现机制未做规定。</p>
<p>变量查找时沿着作用域链向上游查找。例如在函数 bar 中查找 x 时，会依次查找：1）bar的活动对象；2）foo的活动对象；3）全局对象，最终在全局对象中找到。</p>
<h3 id="articleHeader9">2.3. 闭包</h3>
<p>ECMAScript 使用静态词法作用域：当函数对象创建时，其上层上下文数据(变量对象)保存在内部属性 [[Scope]] 中，即函数在创建的时候就保存了上层上下文的作用域链，不管函数会否被调用。因此<strong>所有的函数都是一个闭包</strong>(除了 Function 构造器创建的函数)。不过，出于优化目的，当函数不使用自由变量时，引擎实现可能并不保存上层作用域链。</p>
<blockquote><p><strong>自由变量</strong>是在函数内使用的一种变量：它既不是函数的参数，也不是其局部变量。</p></blockquote>
<p>[[Scope]] 属性是指向变量对象的引用，同一上下文创建的多个闭包<strong>共用</strong>该变量对象。因此，某个闭包对其变量的修改会影响到其他闭包对其变量的读取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fooClosure;
var barClosure;

function foo() {
    var x = 1;
    fooClosure = function () { return ++x; };
    barClosure = function () { return --x; };
}
foo();

alert(fooClosure()); // 2
alert(barClosure()); // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fooClosure;
<span class="hljs-keyword">var</span> barClosure;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
    fooClosure = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> ++x; };
    barClosure = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> --x; };
}
foo();

alert(fooClosure()); <span class="hljs-comment">// 2</span>
alert(barClosure()); <span class="hljs-comment">// 1</span></code></pre>
<p>函数执行时，变量对象的属性变化如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZi3w?w=1798&amp;h=512" src="https://static.alili.tech/img/bVZi3w?w=1798&amp;h=512" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以解释此常犯错的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [];
for (var k = 0; k < 3; k++) {
    data[k] = function () {
        alert(k);
    };
}
 
data[0](); // 3, 而不是 0
data[1](); // 3, 而不是 1
data[2](); // 3, 而不是 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">3</span>; k++) {
    data[k] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(k);
    };
}
 
data[<span class="hljs-number">0</span>](); <span class="hljs-comment">// 3, 而不是 0</span>
data[<span class="hljs-number">1</span>](); <span class="hljs-comment">// 3, 而不是 1</span>
data[<span class="hljs-number">2</span>](); <span class="hljs-comment">// 3, 而不是 2</span></code></pre>
<p>通过创建多个变量对象(方式一)或使用函数对象的属性(方式二)可以解决此问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方式一
var data = [];
for (var k = 0; k < 3; k++) {
    data[k] = (function (x) {
        return function () {
            alert(x);
        };
    })(k);
}

// 方式二
var data = [];
for (var k = 0; k < 3; k++) {
    (data[k] = function () {
        alert(arguments.callee.x);
    }).x = k;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方式一</span>
<span class="hljs-keyword">var</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">3</span>; k++) {
    data[k] = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            alert(x);
        };
    })(k);
}

<span class="hljs-comment">// 方式二</span>
<span class="hljs-keyword">var</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">3</span>; k++) {
    (data[k] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-built_in">arguments</span>.callee.x);
    }).x = k;
}</code></pre>
<p>从理论角度讲，ECMAScript 中所有的函数都是闭包。然而实践中，以下函数才算是闭包：</p>
<ul>
<li>即使创建它的上下文已经销毁，它仍然存在</li>
<li>代码中引用了自由变量</li>
</ul>
<h2 id="articleHeader10">3. 其它</h2>
<h3 id="articleHeader11">3.1. 不使用var声明并不能创建全局变量</h3>
<p>不使用 var 关键字创建的只是全局对象的属性(全局执行上下文中的变量对象使用全局对象自身实现)，它并不是一个变量。可以用如下代码检测区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a); // undefined
alert(b); // Can't find variable: b

b = 10;
var a = 20;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">alert(a); <span class="hljs-comment">// undefined</span>
alert(b); <span class="hljs-comment">// Can't find variable: b</span>

b = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;</code></pre>
<h3 id="articleHeader12">3.2. 三种函数类型</h3>
<p>1) <strong>函数声明</strong>在程序级别或另一函数的函数体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    // ...
}

function globalFD() {
    function innerFD() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">globalFD</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerFD</span>(<span class="hljs-params"></span>) </span>{}
}</code></pre>
<p>2) <strong>函数表达式</strong>在表达式的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function () {
    // ...
};

(function foo() {});
[function foo() {}];
1, function foo() {};

var bar = (foo % 2 == 0
    ? function () { alert(0); }
    : function () { alert(1); }
);

// bar 为函数表达式：
foo(function bar() {
    alert('foo.bar');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
};

(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{});
[<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{}];
<span class="hljs-number">1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-keyword">var</span> bar = (foo % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>
    ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-number">0</span>); }
    : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-number">1</span>); }
);

<span class="hljs-comment">// bar 为函数表达式：</span>
foo(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">'foo.bar'</span>);
});</code></pre>
<p>函数表达式的作用是避免对变量对象造成污染。</p>
<p>3）<strong>Function构造器</strong>的 [[Scope]] 属性中只包含全局对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
function foo() {
    var x = 20;
    var y = 30;
    var bar = new Function('alert(x); alert(y);');
    bar(); // 10, &quot;y&quot; is not defined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">20</span>;
    <span class="hljs-keyword">var</span> y = <span class="hljs-number">30</span>;
    <span class="hljs-keyword">var</span> bar = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'alert(x); alert(y);'</span>);
    bar(); <span class="hljs-comment">// 10, "y" is not defined</span>
}</code></pre>
<p>参考资料：</p>
<ul><li><a href="http://dmitrysoshnikov.com/ecmascript/chapter-6-closures" rel="nofollow noreferrer" target="_blank">closures</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
真正理解 JavaScript （中高级知识总结）

## 原文链接
[https://segmentfault.com/a/1190000012188928](https://segmentfault.com/a/1190000012188928)

