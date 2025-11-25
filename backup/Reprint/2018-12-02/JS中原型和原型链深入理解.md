---
title: 'JS中原型和原型链深入理解' 
date: 2018-12-02 2:30:15
hidden: true
slug: 6mb09wx36xx
categories: [reprint]
---

{{< raw >}}

                    
<p>首先要搞明白几个概念：</p>
<blockquote><ol>
<li>函数（function）</li>
<li>函数对象(function object)</li>
<li>本地对象(native object)</li>
<li>内置对象(build-in object)</li>
<li>宿主对象(host object)</li>
</ol></blockquote>
<h2 id="articleHeader0">函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    
}
var foo = function(){
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
    
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
}</code></pre>
<p>前者为函数声明，后者为函数表达式。typeof foo<br>的结果都是function。</p>
<h2 id="articleHeader1">函数对象</h2>
<p>函数就是对象,<strong>代表函数的</strong>对象就是函数对象</p>
<blockquote>官方定义， 在Javascript中,每一个函数实际上都是一个函数对象.<p>JavaScript代码中定义函数，或者调用Function创建函数时，最终都会以类似这样的形式调用Function函数:var newFun = new Function(funArgs, funBody)</p>
</blockquote>
<p>其实也就是说，我们定义的函数，语法上，都称为函数对象，看我们如何去使用。如果我们单纯的把它当成一个函数使用，那么它就是函数，如果我们通过他来实例化出对象来使用，那么它就可以当成一个函数对象来使用，在面向对象的范畴里面，函数对象类似于类的概念。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = new function(){
    
}
typeof foo // object

或者

function Foo (){
    
}
var foo = new Foo();

typeof foo // object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
}
<span class="hljs-keyword">typeof</span> foo <span class="hljs-comment">// object</span>

或者

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span> <span class="hljs-params">()</span></span>{
    
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo();

<span class="hljs-keyword">typeof</span> foo <span class="hljs-comment">// object</span></code></pre>
<p>上面，我们所建立的对象</p>
<h2 id="articleHeader2">本地对象</h2>
<blockquote>ECMA-262 把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。它们包括：<br>Object,Function,Array,String,Boolean,Number<br>Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError.</blockquote>
<p>我们不能被他们起的名字是本地对象，就把他们理解成对象（虽然是事实上，它就是一个对象，因为JS中万物皆为对象），通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof(Object)
typeof(Array)
typeof(Date)
typeof(RegExp)
typeof(Math)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>typeof(<span class="hljs-type">Object</span>)
typeof(<span class="hljs-type">Array</span>)
typeof(<span class="hljs-type">Date</span>)
typeof(<span class="hljs-type">RegExp</span>)
typeof(<span class="hljs-type">Math</span>)
</code></pre>
<p>返回的结果都是function</p>
<p>也就是说其实这些本地对象（类）是通过function建立起来的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Object（）{
    
}
function Array（）{
    
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">Object（）{</span>
    
}
<span class="hljs-keyword">function</span> <span class="hljs-title">Array（）{</span>
    
}
...</code></pre>
<p>可以看出Object原本就是一个函数，通过new Object()之后实例化后，创建对象。类似于JAVA中的类。</p>
<h2 id="articleHeader3">内置对象</h2>
<blockquote>ECMA-262 把内置对象（built-in object）定义为“由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。</blockquote>
<p>理清楚了这几个概念，有助于理解我们下面要讲述的原型和原型链。</p>
<h2 id="articleHeader4">prototype</h2>
<p>prototype属性是每一个函数都具有的属性，但是不是一个对象都具有的属性。比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    
}

var foo = new Foo()；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">()</span></span>{
    
}

<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo()；</code></pre>
<p>其中Foo中有prototype属性，而foo没有。但是foo中的隐含的__proto__属性指向Foo.prototype。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.__proto__ === Foo.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-title">foo</span>.__proto__ === <span class="hljs-type">Foo</span>.proto<span class="hljs-keyword">type</span></code></pre>
<p>为什么会存在prototype属性？</p>
<p>Javascript里面所有的数据类型都是对象，为了使JavaScript实现面向对象的思想，就必须要能够实现‘继承’使所有的对象连接起来。而如何实现继承呢？JavaScript采用了类似C++，java的方式，通过new的方式来实现实例。</p>
<p>举个例子，child1,child2都是Mother的孩子，且是双胞胎。（虽然不是很好，但是还是很能说明问题的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mother(name){
    this.name = name;
    this.father = 'baba';
}
var child1 = new Mother('huahua');
var child2 = new Mother('huahua');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Mother</span></span>(name){
    <span class="hljs-built_in">this</span>.name = name;
    <span class="hljs-built_in">this</span>.father = <span class="hljs-string">'baba'</span>;
}
<span class="hljs-keyword">var</span> child1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Mother</span>(<span class="hljs-string">'huahua'</span>);
<span class="hljs-keyword">var</span> child2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Mother</span>(<span class="hljs-string">'huahua'</span>);</code></pre>
<p>如果有一天，发现孩子的父亲其实是Baba，那么就要修改每一个孩子的father属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="child1.father ='Baba';
console.log(child2.father) // baba" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>child1.father =<span class="hljs-string">'Baba'</span>;
<span class="hljs-built_in">console</span>.log(child2.father) <span class="hljs-comment">// baba</span></code></pre>
<p>也就是说修改了其中一个孩子的father属性不会影响到下一个，属性的值无法共享。</p>
<p>正是这个原因才提出来prototype属性，把需要共享的属性放到构造函数也就是父类的实例中去。</p>
<h2 id="articleHeader5"><code>__proto__</code></h2>
<p>__proto__属性是每一个对象以及函数都隐含的一个属性。对于每一个含有__proto__属性，他所指向的是创建他的构造函数的prototype。原型链就是通过这个属性构件的。</p>
<p>想像一下，如果一个函数对象（也称为构造函数）a的prototype是另一个函数对象b构建出的实例，a的实例就可以通过__proto__与b的原型链起来。而b的原型其实就是Object的实例，所以a的实例对象，就可以通过原型链和object的prototype链接起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(){
    
}
function b(){
    
}
var b1 = new b();
a.prototype = b1;
var a1 = new a();
console.log(a1.__proto__===b1);//true
console.log(a1.__proto__.__proto__===b.prototype) //true
console.log(a1.__proto__.__proto__.__proto__===Object.prototype) //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
    
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>)</span>{
    
}
<span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> b();
a.prototype = b1;
<span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> a();
<span class="hljs-built_in">console</span>.log(a1.__proto__===b1);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(a1.__proto__.__proto__===b.prototype) <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(a1.__proto__.__proto__.__proto__===<span class="hljs-built_in">Object</span>.prototype) <span class="hljs-comment">//true</span></code></pre>
<p>如果要理清原型和原型链的关系，首先要明确一下几个概念：<br>1.JS中的所有东西都是对象，函数也是对象, 而且是一种特殊的对象</p>
<p>2.JS中所有的东西都由Object衍生而来, 即所有东西原型链的终点指向Object.prototype</p>
<p>3.JS对象都有一个隐藏的__proto__属性，他指向创建它的构造函数的原型，但是有一个例外，Object.prototype.__proto__指向的是null。</p>
<p>4.JS中构造函数和实例(对象)之间的微妙关系</p>
<p>构造函数通过定义prototype来约定其实例的规格, 再通过 new 来构造出实例,他们的作用就是生产对象.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    
}
var foo = new Foo();
foo其实是通过Foo.prototype来生成实例的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">()</span></span>{
    
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo();
foo其实是通过Foo.prototype来生成实例的。
</code></pre>
<p>构造函数本身又是方法(Function)的实例, 因此也可以查到它的__proto__(原型链)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    
}
等价于
var Foo= new Function（）；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>)</span>{
    
}
等价于
<span class="hljs-keyword">var</span> Foo= <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>（）；</code></pre>
<p>而Function实际上是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Function(){
    Native Code
}
也就是等价于
var Function= new Function()；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">()</span></span>{
    Native Code
}
也就是等价于
var <span class="hljs-function"><span class="hljs-keyword">Function</span></span>= new <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">()</span></span>；</code></pre>
<p>所以说Function是通过自己创建出来的。正常情况下对象的__proto__是指向创建它的构造函数的prototype的.所以Function的__proto__指向的Function.prototype</p>
<p>Object 实际上也是通过Function创建出来的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof(Object)//function
所以，
function Object(){
    Native Code
}
等价于
var Object = new Function();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">typeof</span>(<span class="hljs-built_in">Object</span>)<span class="hljs-comment">//function</span>
所以，
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Object</span>(<span class="hljs-params"></span>)</span>{
    Native Code
}
等价于
<span class="hljs-keyword">var</span> <span class="hljs-built_in">Object</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>();</code></pre>
<p>那么Object的__proto__指向的是Function.prototype，也即是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.__proto__ === Function.prototype //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype <span class="hljs-comment">//true</span></code></pre>
<p>下面再来看Function.prototype的__proto__指向哪里</p>
<p>因为JS中所有的东西都是对象，那么，Function.prototype 也是对象，既然是对象，那么Function.prototype肯定是通过Object创建出来的，所以，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Function.prototype.__proto__ === Object.prototype //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-built_in">Function</span>.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype <span class="hljs-comment">//true</span></code></pre>
<p>综上所述，Function和Object的原型以及原型链的关系可以归纳为下图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014717977" src="https://static.alili.tech/img/remote/1460000014717977" alt="2016102714775006823199.jpg" title="2016102714775006823199.jpg" style="cursor: pointer;"></span></p>
<p>对于单个的对象实例，如果通过Object创建，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();</code></pre>
<p>那么它的原型和原型链的关系如下图<br><span class="img-wrap"><img data-src="/img/remote/1460000014717978" src="https://static.alili.tech/img/remote/1460000014717978" alt="20161027147749990054513.jpg" title="20161027147749990054513.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>如果通过函数对象来创建，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(){
    
}
var foo = new Foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">()</span></span>{
    
}
<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo();</code></pre>
<p>那么它的原型和原型链的关系如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014717979" src="https://static.alili.tech/img/remote/1460000014717979" alt="20161027147750059948187.jpg" title="20161027147750059948187.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>那JavaScript的整体的原型和原型链中的关系就很清晰了，如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014717980" src="https://static.alili.tech/img/remote/1460000014717980" alt="20161027147750055267571.jpg" title="20161027147750055267571.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中原型和原型链深入理解

## 原文链接
[https://segmentfault.com/a/1190000014717972](https://segmentfault.com/a/1190000014717972)

