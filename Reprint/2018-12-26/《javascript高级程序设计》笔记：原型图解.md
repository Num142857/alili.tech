---
title: '《javascript高级程序设计》笔记：原型图解' 
date: 2018-12-26 2:30:14
hidden: true
slug: fpxpqir1h8a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文章直接从原型图解开始的，如果对一些概念不太清除，可以结合后面几节查看</blockquote>
<h2 id="articleHeader0">1. 图解原型链</h2>
<h3 id="articleHeader1">1.1 “铁三角关系”（重点）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {};
var p = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="javscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span> </span>{};
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person();</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVX0J2?w=764&amp;h=336" src="https://static.alili.tech/img/bVX0J2?w=764&amp;h=336" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个图描述了构造函数，实例对象和原型三者之间的关系，是原型链的基础：<br>（1）实例对象由构造函数new产生；<br>（2）<code>构造函数的原型属性</code>与<code>实例对象的原型对象</code>均指向原型<br>（3）原型对象中有一个属性constructor指向对应的构造函数</p>
<p>原型链：<code>p --&gt; Person.prototype</code><br>描述：实例对象能够访问到 Person.prototype 中<code>不同名</code>的属性和方法<br>验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p instanceof Person; // true
  
p.__proto__ === Person.prototype; // true
  
Person.prototype.constructor === Person; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">p <span class="hljs-keyword">instanceof</span> Person; <span class="hljs-comment">// true</span>
  
p.__proto__ === Person.prototype; <span class="hljs-comment">// true</span>
  
Person.prototype.constructor === Person; <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader2">1.2 以原型为构造函数</h3>
<p><span class="img-wrap"><img data-src="/img/bVX0J8?w=1612&amp;h=362" src="https://static.alili.tech/img/bVX0J8?w=1612&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>原型链：<code>p --&gt; Person.prototype --&gt; Object.prototype --&gt; null</code><br>描述：<br>（1）由于构造函数的原型也是对象，因此：它也有原型对象，指向<code>Object.__proto__</code><br>（2）由于构造函数的原型的原型也是对象，因此：它也有原型对象，指向null（特例）<br>验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p instanceof Person; // true
p instanceof Object; // true
 
Person.prototype instanceof Object; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">p <span class="hljs-keyword">instanceof</span> Person; <span class="hljs-comment">// true</span>
p <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span>
 
Person.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader3">1.3 深入研究，引出Function构造函数</h3>
<p><span class="img-wrap"><img data-src="/img/bVX0Ka?w=1604&amp;h=612" src="https://static.alili.tech/img/bVX0Ka?w=1604&amp;h=612" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>1、原型链1：见1.2中的原型</p>
<p>2、原型链2：<code>Person --&gt; Function.prototype --&gt; Object.prototype --&gt; null</code><br> 描述：<br>（1）构造函数Person作为实例对象时，<code>Person = new Function()</code>隐式调用，因此<code>Person --&gt; Function.prototype</code><br>（2）由于Function.prototype也是对象，<code>Function.prototype = new Object()</code>隐式调用，因此<code>Function.prototype --&gt; Object.prototype</code><br> 验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person instanceof Function; // true
Person instanceof Object; // true
Function.prototype instanceof Object; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Person <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// true</span>
Person <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Function</span>.prototype <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span></code></pre>
<p>3、原型链3：<code>Function --&gt; Function.prototype --&gt; Object.prototype --&gt; null</code><br> 描述：<br>构造函数Function作为实例对象时，<code>Function = new Function()</code>隐式调用，因此<code>Function --&gt; Function.prototype</code></p>
<p><span class="img-wrap"><img data-src="/img/bVX0Ke?w=782&amp;h=162" src="https://static.alili.tech/img/bVX0Ke?w=782&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Function 这条原型链是最为特殊的“铁三角关系”，理解<code>Function = new Function()</code>就非常好理解了<br>验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.__proto__ === Function.prototype; // true
Function instanceof Function; // true
Function instanceof Object; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Function</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Function</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Function</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader4">1.4 完整的原型链</h3>
<p><span class="img-wrap"><img data-src="/img/bVX0Kj?w=1600&amp;h=872" src="https://static.alili.tech/img/bVX0Kj?w=1600&amp;h=872" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>图中新增了<code>Object = new Function()</code>的逻辑</p>
<p>验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object instanceof Function;// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>;<span class="hljs-comment">// true</span></code></pre>
<p>几个结论：<br>（1）对象都有原型对象，对象默认继承自其原型对象<br>（2）所有的函数都是 Function 的实例<br>（3）所有的原型链尾端都会指向Object.prototype</p>
<p>下面提几个问题：<br>（1）上图有几条原型链？分别列出来（上面已给出）<br>（2）如何在代码层面验证原型链上的继承关系？（见第四节）<br>（3）图中有几个“铁三角”关系？分别列出来</p>
<h2 id="articleHeader5">2. 原型链改写（重点）</h2>
<blockquote>当实例对象被创建时，其原型链就已经确定了，当其对应的原型属性指向改变时，也无法改变原型链</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person = function(options) {
  name: options.name,
  age: options.age
};

// 情况1：在修改原型属性前实例化对象
var p1 = new Person();

// 添加原型属性(方法)
Person.prototype.sayName = function() {
  console.log(this.name);
}
// Person.prototype.SayHi = function() {}

// 情况2：在修改原型属性后实例化对象
var p2 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
  name: options.name,
  <span class="hljs-attr">age</span>: options.age
};

<span class="hljs-comment">// 情况1：在修改原型属性前实例化对象</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> Person();

<span class="hljs-comment">// 添加原型属性(方法)</span>
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
}
<span class="hljs-comment">// Person.prototype.SayHi = function() {}</span>

<span class="hljs-comment">// 情况2：在修改原型属性后实例化对象</span>
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>实例对象p1和实例对象p2的原型链相同，只是在方法调用上有所区别，p2有添加的原型属性(方法)，p1没有，原型链为 p1(p2) --&gt; Person.prototype --&gt; Object.prototype</p>
<p><span class="img-wrap"><img data-src="/img/bVX05X?w=1636&amp;h=562" src="https://static.alili.tech/img/bVX05X?w=1636&amp;h=562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person = function(options) {
  name: options.name,
  age: options.age
};

// 情况1：在修改原型属性前实例化对象
var p1 = new Person();

// 重写原型对象
Person.prototype = {
  sayName: function() {
    console.log(this.name);
  }
}

// 情况2：在修改原型属性后实例化对象
var p2 = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
  name: options.name,
  <span class="hljs-attr">age</span>: options.age
};

<span class="hljs-comment">// 情况1：在修改原型属性前实例化对象</span>
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> Person();

<span class="hljs-comment">// 重写原型对象</span>
Person.prototype = {
  <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }
}

<span class="hljs-comment">// 情况2：在修改原型属性后实例化对象</span>
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>重写原型对象的方式，会改变实例对象的原型链，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVX050?w=1618&amp;h=592" src="https://static.alili.tech/img/bVX050?w=1618&amp;h=592" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是，为什么p1的原型链没有变，而p2的原型链变了呢？</p>
<p><strong>当实例对象被创建时，其原型链就已经确定了，当其对应的原型属性指向改变时，也无法改变原型链</strong><br>原型链是以实例对象为核心的，不能被原型对象的改变而误导</p>
<p>重写原型对象的方式会在原型链继承中经常使用到！！！</p>
<h2 id="articleHeader6">3. 对象与函数（重点）</h2>
<p>看到这里，我们可能已经分不清函数与对象了，思考30秒，函数与对象是什么关系？</p>
<blockquote>官方定义: 在Javascript中,每一个函数实际上都是一个函数对象</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {};
var obj = {};

fn instanceof Object; // true
fn instanceof Function; // true

obj instanceof Object; // true
obj instanceof Function; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-keyword">var</span> obj = {};

fn <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span>
fn <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// true</span>

obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span>
obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// false</span></code></pre>
<p>原型链解释：<br>fn对应的原型链：fn --&gt; Function.prototype --&gt; Object.prototype<br>obj对应的原型链：obj --&gt; Object.prototype</p>
<p>从函数的定义来说: <strong>在javascript中一切函数实际都是函数对象，但对象不一定是函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function instanceof Object; // true
Object instanceof Function; // true

Function instanceof Function; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Function</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>; <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// true</span>

<span class="hljs-built_in">Function</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>; <span class="hljs-comment">// true</span></code></pre>
<p>原型链解释：<br>Function对应的原型链（Function作为实例对象）：Function --&gt; Function.prototype --&gt; Object.prototype<br>Object对应的原型链（Object作为实例对象）：Object --&gt; Function.prototype --&gt; Object.prototype</p>
<p>由于Function和Object都是构造函数，在内置对象中，均会调用<code>new Function()</code>的方法</p>
<p><strong>结论：</strong><br>（1）函数一定是对象，但是对象不一定是函数<br>（2）对象都是由函数来创建的</p>
<p>针对第一点，这两个原型链可验证：<br>fn --&gt; Function.prototype --&gt; Object.prototype<br>obj --&gt; Object.prototype</p>
<p>针对第二点，可这样验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = { a: 1, b: 2}
var arr = [2, 'foo', false]

// 实际过程
var obj = new Object()
obj.a = 1
obj.b = 2

var arr = new Array()
arr[0] = 2
arr[1] = 'foo'
arr[2] = false

//typeof Object === 'function'  
//typeof Array === 'function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">2</span>, <span class="hljs-string">'foo'</span>, <span class="hljs-literal">false</span>]

<span class="hljs-comment">// 实际过程</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>()
obj.a = <span class="hljs-number">1</span>
obj.b = <span class="hljs-number">2</span>

<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()
arr[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span>
arr[<span class="hljs-number">1</span>] = <span class="hljs-string">'foo'</span>
arr[<span class="hljs-number">2</span>] = <span class="hljs-literal">false</span>

<span class="hljs-comment">//typeof Object === 'function'  </span>
<span class="hljs-comment">//typeof Array === 'function</span></code></pre>
<h2 id="articleHeader7">4. 几个定义</h2>
<h3 id="articleHeader8">4.1 原型的定义和作用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {};
var p = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person();</code></pre>
<blockquote>构造函数的prototype属性的值(Person.prototype)，也可以说成通过调用构造函数而创建出来的那个实例对象的原型对象(<code>p.__proto__</code>)</blockquote>
<ol>
<li>只要是函数就有 prototype 属性，即函数的原型属性（由于对象是由函数创建的，因此对象也有prototype属性）</li>
<li>函数的原型属性也是对象（因此，这个对象也有对应的prototype属性）</li>
<li>由构造函数创建出来的对象会默认链接到其构造函数的这个属性上（constructor）</li>
<li>构造函数的 prototype 属性的作用是：实现数据共享（继承）</li>
</ol>
<h3 id="articleHeader9">4.2 几个术语</h3>
<p>实例对象中有一个属性叫 <code>__proto__</code> ，它是非标准属性，指向构造函数的原型属性</p>
<p><code>Person.prototype</code>      构造函数的原型属性<br><code>p.__proto__</code>         实例对象的原型对象</p>
<p><code>构造函数的原型属性</code>与<code>实例对象的原型对象</code>是一个东西，只是从不同的角度访问原型</p>
<h2 id="articleHeader10">5. 属性搜索原则和属性来源判断</h2>
<h3 id="articleHeader11">5.1 属性搜索原则（重点）</h3>
<blockquote>当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索先从对象实例本身开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回这个属性，如果没有找到，则继续在这个原型对象的原型对象中查找，直到找到这个属性，否则返回undefined</blockquote>
<p>简言之，<strong>沿着对象的原型链查找属性，返回最近的属性，这就是属性搜索原则</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Nicholas&quot;;
Person.prototype.age = 29;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
  alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = &quot;Greg&quot;;
alert(person1.name); //&quot;Greg&quot; 来自实例
alert(person2.name); //&quot;Nicholas&quot; 来自原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Nicholas"</span>;
Person.prototype.age = <span class="hljs-number">29</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

person1.name = <span class="hljs-string">"Greg"</span>;
alert(person1.name); <span class="hljs-comment">//"Greg" 来自实例</span>
alert(person2.name); <span class="hljs-comment">//"Nicholas" 来自原型</span></code></pre>
<p>同样的，这也是属性屏蔽的原则</p>
<p><span class="img-wrap"><img data-src="/img/bVX0Jy?w=1082&amp;h=162" src="https://static.alili.tech/img/bVX0Jy?w=1082&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接着上面的例子
delete person1.namel;
alert(person1.name); // &quot;Nicholas&quot; 来自原型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="javascrip"><span class="hljs-regexp">//</span> 接着上面的例子
<span class="hljs-keyword">delete</span> person1.namel;
alert(person1.name); <span class="hljs-regexp">//</span> <span class="hljs-string">"Nicholas"</span> 来自原型</code></pre>
<h3 id="articleHeader12">5.2 hasOwnProperty()方法与in操作符</h3>
<blockquote>使用hasOwnProperty()方法可以检测一个属性是存在于实例中，还是在原型中，这个方法只在给定属性存在于对象实例中时，才会返回true</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Nicholas&quot;;
Person.prototype.age = 29;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
  alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty(&quot;name&quot;));  //false

person1.name = &quot;Greg&quot;;
alert(person1.name); //&quot;Greg&quot; 来自实例 
alert(person1.hasOwnProperty(&quot;name&quot;)); //true

alert(person2.name); //&quot;Nicholas&quot; 来自原型
alert(person2.hasOwnProperty(&quot;name&quot;)); //false

delete person1.name;
alert(person1.name); //&quot;Nicholas&quot; 来自原型
alert(person1.hasOwnProperty(&quot;name&quot;)); //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Nicholas"</span>;
Person.prototype.age = <span class="hljs-number">29</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  alert(<span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();

alert(person1.hasOwnProperty(<span class="hljs-string">"name"</span>));  <span class="hljs-comment">//false</span>

person1.name = <span class="hljs-string">"Greg"</span>;
alert(person1.name); <span class="hljs-comment">//"Greg" 来自实例 </span>
alert(person1.hasOwnProperty(<span class="hljs-string">"name"</span>)); <span class="hljs-comment">//true</span>

alert(person2.name); <span class="hljs-comment">//"Nicholas" 来自原型</span>
alert(person2.hasOwnProperty(<span class="hljs-string">"name"</span>)); <span class="hljs-comment">//false</span>

<span class="hljs-keyword">delete</span> person1.name;
alert(person1.name); <span class="hljs-comment">//"Nicholas" 来自原型</span>
alert(person1.hasOwnProperty(<span class="hljs-string">"name"</span>)); <span class="hljs-comment">//false</span></code></pre>
<blockquote>有两种方式使用in操作符：单独使用和在for-in循环中使用。在单独使用时，in操作符会在通过对象能够访问给定属性时返回true，<strong>无论该属性存在于实例中还是原型中</strong>
</blockquote>
<p>因此，同时使用hasOwnProperty()和in操作符，就可以确定某个属性到底是存在于对象中还是存在于原型中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) &amp;&amp; (name in object);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPrototypeProperty</span>(<span class="hljs-params">object, name</span>)</span>{
  <span class="hljs-keyword">return</span> !object.hasOwnProperty(name) &amp;&amp; (name <span class="hljs-keyword">in</span> object);
}</code></pre>
<p>顺便一提，由于in操作符会在整个原型链上查找属性，处于性能考虑，在使用for-in循环时，建议多加一层判别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}

Person.prototype.name = &quot;Nicholas&quot;;
Person.prototype.age = 29;

var p = new Person();
p.sex = &quot;fale&quot;;

for(key in p) {
  console.log(key); // sex name age 
}

// 实际上，我们一般只是在查找实例中的属性
for(key in p) {
  if(p.hasOwnProperty(key)) {
    console.log(key); // sex 屏蔽了原型中的属性
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}

Person.prototype.name = <span class="hljs-string">"Nicholas"</span>;
Person.prototype.age = <span class="hljs-number">29</span>;

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person();
p.sex = <span class="hljs-string">"fale"</span>;

<span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> p) {
  <span class="hljs-built_in">console</span>.log(key); <span class="hljs-comment">// sex name age </span>
}

<span class="hljs-comment">// 实际上，我们一般只是在查找实例中的属性</span>
<span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> p) {
  <span class="hljs-keyword">if</span>(p.hasOwnProperty(key)) {
    <span class="hljs-built_in">console</span>.log(key); <span class="hljs-comment">// sex 屏蔽了原型中的属性</span>
  }
}</code></pre>
<h3 id="articleHeader13">5.3 instanceof操作符</h3>
<blockquote>instanceof 用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上</blockquote>
<p>更形象来说，对于 A instanceof B来说，它的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。不理解没关系，下面会结合图例分析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {}
var p = new Person();
console.log(p instanceof Object);//true
console.log(p instanceof Person);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(p <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(p <span class="hljs-keyword">instanceof</span> Person);<span class="hljs-comment">//true</span></code></pre>
<p>上一篇：<a href="https://segmentfault.com/a/1190000011839528">《javascript高级程序设计》笔记：创建对象</a><br>下一篇：<a href="https://segmentfault.com/a/1190000011917606" target="_blank">《javascript高级程序设计》笔记：继承</a></p>
<p>参考：<br><a href="https://segmentfault.com/a/1190000010245272">JavaScript之原型链的解读</a><br><a href="http://www.cnblogs.com/shuiyi/p/5305435.html" rel="nofollow noreferrer" target="_blank">三张图搞懂JavaScript的原型对象与原型链</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">继承与原型链</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：原型图解

## 原文链接
[https://segmentfault.com/a/1190000011880268](https://segmentfault.com/a/1190000011880268)

