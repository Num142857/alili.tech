---
title: '进击JavaScript之（四）原型与原型链' 
date: 2019-02-04 2:30:58
hidden: true
slug: mwxggl1s9pd
categories: [reprint]
---

{{< raw >}}

                    
<p>本文您将看到以下内容：</p>
<ul>
<li>传统构造函数的问题</li>
<li>一些相关概念</li>
<li>认识原型</li>
<li>构造、原型、实例三角结构图</li>
<li>对象的原型链</li>
<li>函数的构造函数Function</li>
</ul>
<p>一句话说明什么是原型：原型就是一个JavaScript对象，原型能存储我们的方法，构造函数创建出来的实例对象能够引用原型中的方法。</p>
<h1 id="articleHeader0">一、传统构造函数的问题</h1>
<p>有如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    this.sayHello = function(){
     }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     }
}</code></pre>
<p>由于对象是调用<code>new Foo()</code>所创建出来的，因此每一个对象在创建的时候，函数 sayHello 都会呗创建一次</p>
<p>那么有没一个对象都含有一个独立的，不同的，但是功能逻辑一样的函数，比如：<code>{} == {}</code>。</p>
<p>在代码中方法就会消耗性能，最典型的资源就越是内存</p>
<p>这里最好的方法就是将函数放在构造函数之外，那么在构造函数中引用该函数即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello () {}
function Foo () {
    this.say = sayHello；
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span> (<span class="hljs-params"></span>) </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.say = sayHello；
}</code></pre>
<p>会在开发中变得困难：引入框架危险，代码繁冗不好维护。解决方法就是如果外面的函数不占用其名字，而且在函数名下。</p>
<p>每一个函数在定义的时候，有一个神秘对象（就是原型对象，暂且这么称呼）被创建出来。</p>
<p>每一个由构造函数创建的对象都会默认的连接到该神秘对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f1 = new Foo();
var f2 = new Foo();
f1.sayHello();    //如果f1没有sayHello那么就会在Foo.prototype中去找" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">new</span> Foo();
<span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">new</span> Foo();
f1.sayHello();    <span class="hljs-comment">//如果f1没有sayHello那么就会在Foo.prototype中去找</span></code></pre>
<p>由构造函数创建出来的众多对象共享一个对象就是：<code>构造函数.prototype</code></p>
<p>只需要将共享的东西，重复会多占用内存的东西放到<code>构造函数.prototype</code>中，那么所有的对象就可以共享了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){}
Foo.prototype.sayHello = function(){
    console.log(&quot;….&quot;);
}
var f1 = new Foo();
f1.sayHello();
var f2 = new Foo();
f2.sayHello();
console.log(f1.sayHello === f2.sayHello); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{}
Foo.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"…."</span>);
}
<span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">new</span> Foo();
f1.sayHello();
<span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">new</span> Foo();
f2.sayHello();
<span class="hljs-built_in">console</span>.log(f1.sayHello === f2.sayHello); <span class="hljs-comment">// true</span></code></pre>
<h1 id="articleHeader1">二、一些相关概念</h1>
<p><strong>类class</strong>：在JS中就是构造函数</p>
<ul>
<li>在传统的面向对象语言中，使用一个叫类的东西定义模板，然后使用模板创建对象。</li>
<li>在构造方法中也具有类似的功能，因此也称其为类</li>
</ul>
<p><strong>实例（instance）与对象（object）</strong></p>
<ul>
<li>实例一般是指某一个构造函数创建出来的对象，我们称为XXXX 构造函数的实例</li>
<li>实例就是对象。对象是一个泛称</li>
<li>实例与对象是一个近义词</li>
</ul>
<p><strong>键值对与属性和方法</strong></p>
<ul>
<li>在JS中键值对的集合称为对象</li>
<li>如果值为数据（非函数），就称该键值对为属性</li>
<li>如果值为函数（方法），就称该键值对为方法method</li>
</ul>
<p><strong>父类与子类（基类和派生类）</strong></p>
<ul>
<li>传统的面向对象语言中使用类来实现继承那么就有父类、子类的概念</li>
<li>父类又称为基类，子类又称为派生类</li>
<li>在JS中没有类的概念，在JS中常常称为父对象，子对象，基对象，派生对象。</li>
</ul>
<h1 id="articleHeader2">三、认识原型</h1>
<p>在JavaScript中，<strong>原型也是一个对象，通过原型可以实现对象的属性继承</strong>，JavaScript的对象中都包含了一个<code>[[Prototype]]</code>内部属性，这个属性所对应的就是该对象的原型。</p>
<p>[[Prototype]]作为对象的内部属性，是不能被直接访问的。所以为了方便查看一个对象的原型，Firefox和Chrome中提供了<code>__proto__</code>这个<strong>非标准</strong>（不是所有浏览器都支持）的访问器（ECMA引入了标准对象原型访问器"Object.getPrototype(object)"）。</p>
<p>下面通过一个例子来看看原型相关概念：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {}
// 神秘对象就是Person.prototype
//那么只有使用构造函数才可以访问它
var o = new Person();
//以前不能直接使用o来访问神秘对象
//现在有了__proto__后，
o.__proto__也可以直接访问神秘对象
//那么o.__proto__ === Person.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-comment">// 神秘对象就是Person.prototype</span>
<span class="hljs-comment">//那么只有使用构造函数才可以访问它</span>
<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> Person();
<span class="hljs-comment">//以前不能直接使用o来访问神秘对象</span>
<span class="hljs-comment">//现在有了__proto__后，</span>
o.__proto__也可以直接访问神秘对象
<span class="hljs-comment">//那么o.__proto__ === Person.prototype</span></code></pre>
<p><strong>神秘对象（原型）</strong>中都有一个属性<code>constructor</code>，翻译为 构造器 。表示该原型是与什么构造函数联系起来的。</p>
<p><code>__proto__</code>有什么用？可以访问原型。由于在开发中除非特殊要求，不要使用实例去修改原型的成员，因此该属性开发时使用较少。但是在调试过程中非常方便，可以轻易的访问原型进行查看成员</p>
<p>如果在早期的浏览器中使用实例需要访问原型如何处理？可以使用实例对象访问构造器，然后使用构造器访问原型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = new Person();
o.constructor.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> Person();
o.constructor.prototype</code></pre>
<p>如果给实例继承自原型的属性赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo();
Foo.prototype.name = &quot;test&quot;;
var o1 = new Foo();
var o2 = new Foo();
o1.name = &quot;张三&quot;;    // 不是修改原型中的name而是自己增加了一个name属性
console.log(o1.name + '，'+ o2.name);    // 张三，test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>);
<span class="hljs-title">Foo</span>.<span class="hljs-title">prototype</span>.<span class="hljs-title">name</span> = "<span class="hljs-title">test</span>";
<span class="hljs-title">var</span> <span class="hljs-title">o1</span> = <span class="hljs-title">new</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>);
<span class="hljs-title">var</span> <span class="hljs-title">o2</span> = <span class="hljs-title">new</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>);
<span class="hljs-title">o1</span>.<span class="hljs-title">name</span> = "张三";    // 不是修改原型中的<span class="hljs-title">name</span>而是自己增加了一个<span class="hljs-title">name</span>属性
<span class="hljs-title">console</span>.<span class="hljs-title">log</span>(<span class="hljs-params">o1.name + <span class="hljs-string">'，'</span>+ o2.name</span>);    // 张三，<span class="hljs-title">test</span></span></code></pre>
<h1 id="articleHeader3">四、构造、原型、实例三角结构图</h1>
<p>对于如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
var p = new Person()

console.log(Person.prototype.constructor); //function Person(){}
console.log(Person.prototype.constructor.name); //Person
console.log(typeof Person.prototype.constructor); //function

console.log(p.__prop__);
console.log(p.__prop__ === Person.prototype);//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person()

<span class="hljs-built_in">console</span>.log(Person.prototype.constructor); <span class="hljs-comment">//function Person(){}</span>
<span class="hljs-built_in">console</span>.log(Person.prototype.constructor.name); <span class="hljs-comment">//Person</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> Person.prototype.constructor); <span class="hljs-comment">//function</span>

<span class="hljs-built_in">console</span>.log(p.__prop__);
<span class="hljs-built_in">console</span>.log(p.__prop__ === Person.prototype);<span class="hljs-comment">//true</span></code></pre>
<p>于是他们的关系图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922883?w=691&amp;h=470" src="https://static.alili.tech/img/remote/1460000012922883?w=691&amp;h=470" alt="构造、原型、实例三角结构图" title="构造、原型、实例三角结构图" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">五、对象的原型链</h1>
<p><strong>凡是对象就有原型，原型也是对象。因此凡是给定一个对象，那么就可以找到他的原型，原型还有原型，那么如此下去，就构成一个对象的序列，称该结构为原型链。</strong></p>
<p>问题：</p>
<ol>
<li>原型链到底到什么时候是一个头？</li>
<li>一个默认的原型链结构是怎样的？</li>
<li>原型链结构对已知语法的修正</li>
</ol>
<h2 id="articleHeader5">5.1 原型链的结构</h2>
<p>凡是使用构造函数，创建出对象，并且没有利用赋值的方式修改原型，就说该对象保留默认的原型链。</p>
<p>默认原型链结构是什么样子呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
var p = new Person();
//p 具有默认的原型链" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person();
<span class="hljs-comment">//p 具有默认的原型链</span></code></pre>
<p>默认的原型链结构就是：<code>当前对象 -&gt; 构造函数.prototype -&gt; Object.prototype -&gt; null</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922884?w=652&amp;h=439" src="https://static.alili.tech/img/remote/1460000012922884?w=652&amp;h=439" alt="构造、原型、实例三角结构图" title="构造、原型、实例三角结构图" style="cursor: pointer;"></span></p>
<p>在实现继承的时候，有时候会利用替换原型链结构的方式实现原型继承，那么原型链结构就会发送改变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DunizbCollection(){}
DunizbCollection.prototype = [];
var arr = new DunizbCollection();
// arr -> [] -> Array.prototype -> Object.prototype -> null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DunizbCollection</span>(<span class="hljs-params"></span>)</span>{}
DunizbCollection.prototype = [];
<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> DunizbCollection();
<span class="hljs-comment">// arr -&gt; [] -&gt; Array.prototype -&gt; Object.prototype -&gt; null</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922885?w=719&amp;h=461" src="https://static.alili.tech/img/remote/1460000012922885?w=719&amp;h=461" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">六、函数的构造函数Function</h1>
<p>在JS中使用Function可以实例化函数对象 。也就是说在JS中函数与普通对象一样，也是一个对象类型。函数是JS中的一等公民。</p>
<ol>
<li>函数是对象，就可以使用对象的动态特性</li>
<li>函数是对象，就有构造函数创建函数</li>
<li>函数是对象，可以创建其它对象</li>
<li>函数是唯一可以限定变量作用域的结果</li>
</ol>
<p>要解决的问题</p>
<ol>
<li>Function 如何使用</li>
<li>Function 与函数的关系</li>
<li>函数的原型链结构</li>
</ol>
<h2 id="articleHeader7">6.1 函数是Function的实例</h2>
<p>语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Function( arg0,arg1,arg1,….argN, body );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>( arg0,arg1,arg1,….argN, body );</code></pre>
<p>Function 中的参数全部是字符串</p>
<p>该构造函数的作用是将参数链接起来组成函数</p>
<ul>
<li>如果参数只有一个，那么表示函数体</li>
<li>如果参数有多个，最后一个参数表示函数体，前面的所有参数表示函数的参数</li>
<li>如果没有参数，表示创建一个空函数</li>
</ul>
<p>举例：创建一个打印一句话的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 传统的
function foo () {
    console.log( '你好' );
}
//Function
var func = new Function( 'console.log( &quot;你好&quot; );' );
// 功能上，这里foo 与 func 等价" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 传统的</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'你好'</span> );
}
<span class="hljs-comment">//Function</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>( <span class="hljs-string">'console.log( "你好" );'</span> );
<span class="hljs-comment">// 功能上，这里foo 与 func 等价</span></code></pre>
<p>再比如，创建一个空函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传统
function foo () {}
//Function
var func = new Function();
func();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//传统</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{}
<span class="hljs-comment">//Function</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>();
func();</code></pre>
<p>传入函数内一个数字，打印该函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传统
function foo ( num ) {
    console.log( num );
}
//Function
var func = new Function( &quot;num&quot; ,&quot;console.log( num )&quot; );
func();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//传统</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"> num </span>) </span>{
    <span class="hljs-built_in">console</span>.log( num );
}
<span class="hljs-comment">//Function</span>
<span class="hljs-keyword">var</span> func = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>( <span class="hljs-string">"num"</span> ,<span class="hljs-string">"console.log( num )"</span> );
func();</code></pre>
<h2 id="articleHeader8">6.2 函数的原型链结构</h2>
<p>任意的一个函数，都是相当于Function的实例，类似于{}与new Object()的关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo () {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{}</code></pre>
<p>上面的代告诉解析器，有一个对象叫foo，它是一个函数；相当于<code>new Function（）</code>得到一个函数对象</p>
<ul>
<li>函数应该有什么属性？答：<code>__proto__</code>
</li>
<li>函数的构造函数是什么？答：Function</li>
<li>函数应该继承自Function.prototype</li>
<li>Function.prototype继承自Object.prototype</li>
</ul>
<p>对于Function，我们还必须知道</p>
<ul>
<li>Object函数是Function的一个实例</li>
<li>
<p>Object作为对象是继承自Function.prototype的，又“Function.prototype”继承自Object.prototype</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.prototype.__proto__ === Object.prototype // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">foo.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype <span class="hljs-comment">// true</span></code></pre>
</li>
<li>Function是自己的构造函数</li>
<li>在JS 中任何对象的老祖宗就是Object.prototype</li>
<li>在JS中任何函数的老祖宗就是Function.prototype</li>
</ul>
<p>下面绘制出 Function 的构造原型实例三角形结构</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922886?w=709&amp;h=522" src="https://static.alili.tech/img/remote/1460000012922886?w=709&amp;h=522" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">6.3 为什么要使用Function？</h2>
<p>Function是使用字符串构建函数，那么就可以在程序运行过程中构建函数.</p>
<p>以前的函数必须一开始就写好，再经过预解析，一步一步的运行</p>
<p>假定从服务器里拿到“[1,2,3,4,5]”，将数组形式的字符串转换成数组对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ( new Function( 'return ' + str + ' ;' ) )();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arr = ( <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>( <span class="hljs-string">'return '</span> + str + <span class="hljs-string">' ;'</span> ) )();</code></pre>
<hr>
<p><strong>推荐阅读</strong></p>
<ul>
<li><a href="https://blog.dunizb.com/2016/08/09/attack-JavaScript-1-variable/" rel="nofollow noreferrer" target="_blank">进击JavaScript之（一）词法作用域与作用域链</a></li>
<li><a href="https://blog.dunizb.com/2016/08/19/attack-JavaScript-2-scope/" rel="nofollow noreferrer" target="_blank">进击JavaScript之（二）词法作用域与作用域链</a></li>
<li><a href="https://blog.dunizb.com/2016/08/28/attack-JavaScript-3-closure/" rel="nofollow noreferrer" target="_blank">进击JavaScript之（三）玩转闭包</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
进击JavaScript之（四）原型与原型链

## 原文链接
[https://segmentfault.com/a/1190000006811354](https://segmentfault.com/a/1190000006811354)

