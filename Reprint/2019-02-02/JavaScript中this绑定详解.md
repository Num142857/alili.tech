---
title: 'JavaScript中this绑定详解' 
date: 2019-02-02 2:30:11
hidden: true
slug: f1goxj498pc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>转载请注明出处 <a href="https://segmentfault.com/a/1190000007101339">https://segmentfault.com/a/11...</a></p></blockquote>
<p><code>this</code> 可以说是 javascript 中最耐人寻味的一个特性，就像高中英语里各种时态，比如被动时态，过去时，现在时，过去进行时一样，无论弄错过多少次，下一次依然可能弄错。本文启发于《你不知道的JavaScript上卷》,对 javasript 中的 <code>this</code> 进行一个总结。</p>
<p>学习 <code>this</code> 的第一步就是明白 <code>this</code> 既不是指向函数自身也不指向函数的作用域。<code>this</code> 实际上是在函数被调用时发生的绑定，它指向什么地方完全取决于函数在哪里被调用。</p>
<h3 id="articleHeader0">默认绑定</h3>
<p>在 javascript 中 ，最常用的函数调用类型就是<strong>独立函数调用</strong>，因此可以把这条规则看作是无法应用其他规则时的默认规则。如果在调用函数的时候，函数不带任何修饰，也就是“光秃秃”的调用，那就会应用<strong>默认绑定规则</strong>, 默认绑定的指向的是全局作用域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayLocation() {
    console.log(this.atWhere)
}

var atWhere = &quot;I am in global&quot;

sayLocation() // 默认绑定，this绑定在全局对象,输出 “I am in global”" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayLocation</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.atWhere)
}

<span class="hljs-keyword">var</span> atWhere = <span class="hljs-string">"I am in global"</span>

sayLocation() <span class="hljs-comment">// 默认绑定，this绑定在全局对象,输出 “I am in global”</span></code></pre>
<p>再看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;global&quot;
function person() {
    console.log(this.name) //  (1) &quot;global&quot;
      person.name = 'inside'
    function sayName() {
        console.log(this.name) // (2) &quot;global&quot;  不是 &quot;inside&quot;
    }
    sayName() // 在person函数内部执行sayName函数,this指向的同样是全局的对象
}
person()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"global"</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">person</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name) <span class="hljs-comment">//  (1) "global"</span>
      person.name = <span class="hljs-string">'inside'</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name) <span class="hljs-comment">// (2) "global"  不是 "inside"</span>
    }
    sayName() <span class="hljs-comment">// 在person函数内部执行sayName函数,this指向的同样是全局的对象</span>
}
person()</code></pre>
<p>在这个例子中，<code>person</code> 函数在全局作用域中被调用，因此第(1)句中的 <code>this</code> 就绑定在了全局对象上（在浏览器中是是<code>window</code>，在node中就是<code>global</code>）,因此第(1)句自然输出的是一个全局对象的 <code>name</code> 属性，当然就是<code>"global"</code>了。<code>sayName</code>函数在person函数内调用，即使这样第(2)句中的<code>this</code>指代的仍然是全局对象，即使 <code>person</code> 函数设置了 name 属性。</p>
<p>这就是<strong>默认绑定规则</strong>,它是 javascript 中最常见的一种函数调用模式，<code>this</code> 的绑定规则也是四种绑定规则中最简单的一种，就是<strong>绑定在全局作用域上</strong>。</p>
<h4>默认绑定里的严格模式</h4>
<p>在 javascript 中，如果使用了严格模式，则 <code>this</code> 不能绑定到全局对象。还是以第一个例子，只不过这次加上了严格模式声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
function sayLocation() {
    console.log(this.atWhere)
}
var atWhere = &quot;I am in global&quot;
sayLocation()
// Uncaught TypeError: Cannot read property 'atWhere' of undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayLocation</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.atWhere)
}
<span class="hljs-keyword">var</span> atWhere = <span class="hljs-string">"I am in global"</span>
sayLocation()
<span class="hljs-comment">// Uncaught TypeError: Cannot read property 'atWhere' of undefined</span></code></pre>
<p>可以看出，在严格模式下，把 <code>this</code> 绑定到全局对象上时，实际上绑定的是 <code>undefined</code> ,因此上面这段代码会报错。</p>
<h3 id="articleHeader1">隐式绑定</h3>
<p>当函数在调用时，如果函数有所谓的“落脚点”,即有上下文对象时，隐式绑定规则会把函数中的 <code>this</code> 绑定到这个上下文对象。如果觉得上面这段话不够直白的话，还是来看代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say() {
    console.log(this.name)
}
var obj1 = {
    name: &quot;zxt&quot;,
    say: say
}

var obj2 = {
    name: &quot;zxt1&quot;,
    say: say
}
obj1.say() // zxt
obj2.say() // zxt1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"zxt"</span>,
    <span class="hljs-attr">say</span>: say
}

<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"zxt1"</span>,
    <span class="hljs-attr">say</span>: say
}
obj1.say() <span class="hljs-comment">// zxt</span>
obj2.say() <span class="hljs-comment">// zxt1</span></code></pre>
<p>很简单是不是。在上面这段代码中，<code>obj1</code> , <code>obj2</code> 就是所谓的 <code>say</code> 函数的落脚点，专业一点的说法就是上下文对象，当给函数指定了这个上下文对象时，函数内部的<code>this</code> 自然指向了这个上下文对象。这也是很常见的一种函数调用模式。</p>
<h4>隐式绑定时丢失上下文</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say() {
    console.log(this.name)
}
var name = &quot;global&quot;
var obj = {
    name: &quot;inside&quot;,
    say: say
}
var alias = obj.say // 设置一个简写   (1) 
alias() // 函数调用 输出&quot;global&quot;  (2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"global"</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"inside"</span>,
    <span class="hljs-attr">say</span>: say
}
<span class="hljs-keyword">var</span> alias = obj.say <span class="hljs-comment">// 设置一个简写   (1) </span>
alias() <span class="hljs-comment">// 函数调用 输出"global"  (2)</span></code></pre>
<p>可以看到这里输出的是 <code>”global“</code> ，为什么就和上例中不一样，我们明明只是给 <code>obj.say</code> 换了个名字而已？<br>首先我们来看上面第(1)句代码，由于在 javascript 中，函数是对象，对象之间是引用传递，而不是值传递。因此，第(1)句代码只是 <code>alias = obj.say = say</code> ，也就是 <code>alias = say</code> ，<code>obj.say</code> 只是起了一个桥梁的作用，<code>alias</code> 最终引用的是 <code>say</code> 函数的地址，而与 obj 这个对象无关了。这就是所谓的”丢失上下文“。最终执行 <code>alias</code> 函数，只不过简单的执行了<code>say</code>函数，输出<code>"global"</code>。</p>
<h3 id="articleHeader2">显式绑定</h3>
<p>显式绑定，顾名思义，显示地将this绑定到一个上下文，javascript中，提供了三种显式绑定的方法，<code>apply</code>,<code>call</code>,<code>bind</code>。<code>apply</code>和<code>call</code>的用法基本相似，它们之间的区别是：</p>
<blockquote><p><code>apply(obj,[arg1,arg2,arg3,...]</code> 被调用函数的参数以数组的形式给出  <br><code>call(obj,arg1,arg2,arg3,...)</code> 被调用函数的参数依次给出</p></blockquote>
<p>而<code>bind</code>函数执行后，返回的是一个新函数。下面以代码说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不带参数
function speak() {
    console.log(this.name)
}

var name = &quot;global&quot;
var obj1 = {
    name: 'obj1'
}
var obj2 = {
    name: 'obj2'
}

speak() // global 等价于speak.call(window)
speak.call(window)

speak.call(obj1) // obj1
speak.call(obj2) // obj2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 不带参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speak</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}

<span class="hljs-keyword">var</span> name = <span class="hljs-string">"global"</span>
<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'obj1'</span>
}
<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'obj2'</span>
}

speak() <span class="hljs-comment">// global 等价于speak.call(window)</span>
speak.call(<span class="hljs-built_in">window</span>)

speak.call(obj1) <span class="hljs-comment">// obj1</span>
speak.call(obj2) <span class="hljs-comment">// obj2</span></code></pre>
<p>因此可以看出，<code>apply</code>, <code>call</code> 的作用就是给函数绑定一个执行上下文，且是显式绑定的。因此，函数内的this自然而然的绑定在了 <code>call</code> 或者 <code>apply</code> 所调用的对象上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 带参数
function count(num1, num2) {
    console.log(this.a * num1 + num2)
}

var obj1 = {
    a: 2
}
var obj2 = {
    a: 3
}

count.call(obj1, 1, 2) // 4
count.apply(obj1, [1, 2]) // 4

count.call(obj2, 1, 2) // 5
count.apply(obj2, [1, 2]) // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 带参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">count</span>(<span class="hljs-params">num1, num2</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a * num1 + num2)
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}
<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">3</span>
}

count.call(obj1, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 4</span>
count.apply(obj1, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]) <span class="hljs-comment">// 4</span>

count.call(obj2, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 5</span>
count.apply(obj2, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]) <span class="hljs-comment">// 5</span></code></pre>
<p>上面这个例子则说明了 <code>apply</code> 和 <code>call</code> 用法上的差异。  <br>而 <code>bind</code> 函数，则返回一个绑定了指定的执行上下文的新函数。还是以上面这段代码为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 带参数
function count(num1, num2) {
    console.log(this.a * num1 + num2)
}

var obj1 = {
    a: 2
}

var bound1 = count.bind(obj1) // 未指定参数
bound1(1, 2) // 4

var bound2 = count.bind(obj1, 1) // 指定了一个参数
bound2(2) // 4 

var bound3 = count.bind(obj1, 1, 2) // 指定了两个参数
bound3() //4

var bound4 = count.bind(obj1, 1, 2, 3) // 指定了多余的参数,多余的参数会被忽略
bound4() // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 带参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">count</span>(<span class="hljs-params">num1, num2</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a * num1 + num2)
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">var</span> bound1 = count.bind(obj1) <span class="hljs-comment">// 未指定参数</span>
bound1(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 4</span>

<span class="hljs-keyword">var</span> bound2 = count.bind(obj1, <span class="hljs-number">1</span>) <span class="hljs-comment">// 指定了一个参数</span>
bound2(<span class="hljs-number">2</span>) <span class="hljs-comment">// 4 </span>

<span class="hljs-keyword">var</span> bound3 = count.bind(obj1, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 指定了两个参数</span>
bound3() <span class="hljs-comment">//4</span>

<span class="hljs-keyword">var</span> bound4 = count.bind(obj1, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// 指定了多余的参数,多余的参数会被忽略</span>
bound4() <span class="hljs-comment">// 4</span></code></pre>
<p>所以，<code>bind</code> 方法只是返回了一个新的函数，这个函数内的this指定了执行上下文，而返回这个新函数可以接受参数。</p>
<h3 id="articleHeader3">new 绑定</h3>
<p>最后要讲的一种 <code>this</code> 绑定规则，是指通过 <code>new</code> 操作符调用构造函数时发生的 <code>this</code> 绑定。首先要明确一点的是，在 javascript 中并没有其他语言那样的类的概念。构造函数也仅仅是普通的函数而已，只不过构造函数的函数名以大写字母开头，也只不过它可以通过 <code>new</code> 操作符调用而已.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name,age) {
    this.name = name
    this.age = age
    console.log(&quot;我也只不过是个普通函数&quot;)
}
Person(&quot;zxt&quot;,22) // &quot;我也只不过是个普通函数&quot;
console.log(name) // &quot;zxt&quot;
console.log(age) // 22

var zxt = new Person(&quot;zxt&quot;,22) // &quot;我也只不过是个普通函数&quot;
console.log(zxt.name) // &quot;zxt&quot;
console.log(zxt.age) // 22" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name,age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.age = age
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我也只不过是个普通函数"</span>)
}
Person(<span class="hljs-string">"zxt"</span>,<span class="hljs-number">22</span>) <span class="hljs-comment">// "我也只不过是个普通函数"</span>
<span class="hljs-built_in">console</span>.log(name) <span class="hljs-comment">// "zxt"</span>
<span class="hljs-built_in">console</span>.log(age) <span class="hljs-comment">// 22</span>

<span class="hljs-keyword">var</span> zxt = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zxt"</span>,<span class="hljs-number">22</span>) <span class="hljs-comment">// "我也只不过是个普通函数"</span>
<span class="hljs-built_in">console</span>.log(zxt.name) <span class="hljs-comment">// "zxt"</span>
<span class="hljs-built_in">console</span>.log(zxt.age) <span class="hljs-comment">// 22</span></code></pre>
<p>上面这个例子中，首先定义了一个 <code>Person</code> 函数，既可以普通调用，也可以以构造函数的形式的调用。当普通调用时，则按照正常的函数执行，输出一个字符串。 如果是通过一个<code>new</code>操作符,则构造了一个新的对象。那么，接下来我们再看看两种调用方式， <code>this</code> 分别绑定在了何处首先普通调用时，前面已经介绍过，此时应用默认绑定规则，<code>this</code>绑定在了全局对象上，此时全局对象上会分别增加 <code>name</code> 和 <code>age</code> 两个属性。当通过<code>new</code>操作符调用时，函数会返回一个对象，从输出结果上来看 <code>this</code> 对象绑定在了这个返回的对象上。  <br>因此，所谓的<code>new</code>绑定是指通过<code>new</code>操作符来调用函数时，会产生一个新对象，并且会把构造函数内的<code>this</code>绑定到这个对象上。  <br>事实上，在<code>javascript</code>中，使用<code>new</code>来调用函数，会自动执行下面的操作。</p>
<ol>
<li><p>创建一个全新的对象</p></li>
<li><p>这个新对象会被执行原型连接</p></li>
<li><p>这个新对象会绑定到函数调用的<code>this</code></p></li>
<li><p>如果函数没有返回其他对象，那么<code>new</code>表达式中的函数调用会自动返回这个新对象</p></li>
</ol>
<h3 id="articleHeader4">四种绑定的优先级</h3>
<p>上面讲述了<code>javascript</code>中四种<code>this</code>绑定规则，这四种绑定规则基本上涵盖了所有函数调用情况。但是如果同时应用了这四种规则中的两种甚至更多，又该是怎么样的一个情况，或者说这四种绑定的优先级顺序又是怎么样的。  <br>首先，很容易理解，<strong>默认绑定的优先级是最低的</strong>。这是因为只有在无法应用其他<code>this</code>绑定规则的情况下，才会调用默认绑定。那隐式绑定和显式绑定呢？还是上代码吧，代码可从来不会说谎。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function speak() {
    console.log(this.name)
}

var obj1 = {
    name: 'obj1',
    speak: speak
}
var obj2 = {
    name: 'obj2'
}

obj1.speak() // obj1 (1)
obj1.speak.call(obj2) // obj2 (2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">speak</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}

<span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'obj1'</span>,
    <span class="hljs-attr">speak</span>: speak
}
<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'obj2'</span>
}

obj1.speak() <span class="hljs-comment">// obj1 (1)</span>
obj1.speak.call(obj2) <span class="hljs-comment">// obj2 (2)</span></code></pre>
<p>所以在上面代码中，执行了<code>obj1.speak()</code>,<code>speak</code>函数内部的<code>this</code>指向了<code>obj1</code>，因此(1)处代码输出的当然就是<code>obj1</code>，但是当显式绑定了<code>speak</code>函数内的<code>this</code>到<code>obj2</code>上，输出结果就变成了<code>obj2</code>，所有从这个结果可以看出<strong>显式绑定</strong>的优先级是要高于<strong>隐式绑定</strong>的。事实上我们可以这么理解<code>obj1.speak.call(obj2)</code>这行代码，<code>obj1.speak</code>只是间接获得了<code>speak</code>函数的引用，这就有点像前面所说的<strong>隐式绑定丢失了上下文</strong>。好，既然<strong>显式绑定</strong>的优先级要高于<strong>隐式绑定</strong>，那么接下来再来比较一下new 绑定和显式绑定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(something) {
    this.a = something
}

var obj1 = {}
var bar = foo.bind(obj1)  // 返回一个新函数bar，这个新函数内的this指向了obj1  (1)
bar(2) // this绑定在了Obj1上，所以obj1.a === 2
console.log(obj1.a)

var baz = new bar(3)  // 调用new 操作符后，bar函数的this指向了返回的新实例baz  (2)

console.log(obj1.a)
console.log(baz.a) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">something</span>) </span>{
    <span class="hljs-keyword">this</span>.a = something
}

<span class="hljs-keyword">var</span> obj1 = {}
<span class="hljs-keyword">var</span> bar = foo.bind(obj1)  <span class="hljs-comment">// 返回一个新函数bar，这个新函数内的this指向了obj1  (1)</span>
bar(<span class="hljs-number">2</span>) <span class="hljs-comment">// this绑定在了Obj1上，所以obj1.a === 2</span>
<span class="hljs-built_in">console</span>.log(obj1.a)

<span class="hljs-keyword">var</span> baz = <span class="hljs-keyword">new</span> bar(<span class="hljs-number">3</span>)  <span class="hljs-comment">// 调用new 操作符后，bar函数的this指向了返回的新实例baz  (2)</span>

<span class="hljs-built_in">console</span>.log(obj1.a)
<span class="hljs-built_in">console</span>.log(baz.a) </code></pre>
<p>我们可以看到，在(1)处，<code>bar</code>函数内部的<code>this</code>原本指向的是<code>obj1</code>，但是在(2)处，由于经过了<code>new</code>操作符调用，<code>bar</code>函数内部的<code>this</code>却重新指向了返回的实例，这就可以说明<strong>new 绑定</strong>的优先级是要高于<strong>显式绑定</strong>的。  <br>至此，四种绑定规则的优先级排序就已经得出了,分别是</p>
<blockquote><p>new 绑定 &gt; 显式绑定 &gt; 隐式绑定 &gt; 默认绑定</p></blockquote>
<h3 id="articleHeader5">箭头函数中的this绑定</h3>
<p>箭头函数是ES6里一个重要的特性。<br>箭头函数的<code>this</code>是根据外层的（函数或者全局）作用域来决定的。函数体内的<code>this</code>对象指的是定义时所在的对象，而不是之前介绍的调用时绑定的对象。举一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
var foo = () => {
    console.log(this.a) // 定义在全局对象中，因此this绑定在全局作用域
}

var obj = {
    a: 2
}
foo() // 1 ,在全局对象中调用
foo.call(obj) // 1,显示绑定，由obj对象来调用，但根本不影响结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a) <span class="hljs-comment">// 定义在全局对象中，因此this绑定在全局作用域</span>
}

<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
}
foo() <span class="hljs-comment">// 1 ,在全局对象中调用</span>
foo.call(obj) <span class="hljs-comment">// 1,显示绑定，由obj对象来调用，但根本不影响结果</span></code></pre>
<p>从上面这个例子看出，箭头函数的 this 强制性的绑定在了箭头函数定义时所在的作用域，而且无法通过显示绑定，如<code>apply</code>,<code>call</code>方法来修改。在来看下面这个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个构造函数
function Person(name,age) {
    this.name = name
    this.age = age 
    this.speak = function (){
        console.log(this.name)
        // 普通函数（非箭头函数),this绑定在调用时的作用域
    }
    this.bornYear = () => {
        // 本文写于2016年，因此new Date().getFullYear()得到的是2016
        // 箭头函数，this绑定在实例内部
        console.log(new Date().getFullYear() - this.age)
        }
    }
}

var zxt = new Person(&quot;zxt&quot;,22)

zxt.speak() // &quot;zxt&quot;
zxt.bornYear() // 1994

// 到这里应该大家应该都没什么问题

var xiaoMing = {
    name: &quot;xiaoming&quot;,
    age: 18  // 小明永远18岁
}

zxt.speak.call(xiaoMing)
// &quot;xiaoming&quot; this绑定的是xiaoMing这个对象
zxt.bornYear.call(xiaoMing)
// 1994 而不是 1998,这是因为this永远绑定的是zxt这个实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义一个构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name,age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.age = age 
    <span class="hljs-keyword">this</span>.speak = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
        <span class="hljs-comment">// 普通函数（非箭头函数),this绑定在调用时的作用域</span>
    }
    <span class="hljs-keyword">this</span>.bornYear = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 本文写于2016年，因此new Date().getFullYear()得到的是2016</span>
        <span class="hljs-comment">// 箭头函数，this绑定在实例内部</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear() - <span class="hljs-keyword">this</span>.age)
        }
    }
}

<span class="hljs-keyword">var</span> zxt = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zxt"</span>,<span class="hljs-number">22</span>)

zxt.speak() <span class="hljs-comment">// "zxt"</span>
zxt.bornYear() <span class="hljs-comment">// 1994</span>

<span class="hljs-comment">// 到这里应该大家应该都没什么问题</span>

<span class="hljs-keyword">var</span> xiaoMing = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"xiaoming"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>  <span class="hljs-comment">// 小明永远18岁</span>
}

zxt.speak.call(xiaoMing)
<span class="hljs-comment">// "xiaoming" this绑定的是xiaoMing这个对象</span>
zxt.bornYear.call(xiaoMing)
<span class="hljs-comment">// 1994 而不是 1998,这是因为this永远绑定的是zxt这个实例</span></code></pre>
<p>因此 ES6 的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 <code>this</code> ，具体来说就是，箭头函数会继承 <em>外层函数调用的this绑定</em> ，而无论外层函数的<code>this</code>绑定到哪里。</p>
<h3 id="articleHeader6">小结</h3>
<p>以上就是<code>javascript</code>中所有<code>this</code>绑定的情况，在es6之前，前面所说的四种绑定规则可以涵盖任何的函数调用情况，es6标准实施以后，对于函数的扩展新增了箭头函数，与之前不同的是，<strong>箭头函数的作用域位于箭头函数定义时所在的作用域</strong>。</p>
<p>而对于之前的四种绑定规则来说，掌握每种规则的调用条件就能很好的理解<code>this</code>到底是绑定在了哪个作用域。</p>
<blockquote><p>全文完</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中this绑定详解

## 原文链接
[https://segmentfault.com/a/1190000007101339](https://segmentfault.com/a/1190000007101339)

