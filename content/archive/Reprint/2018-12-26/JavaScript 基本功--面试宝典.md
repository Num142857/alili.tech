---
title: 'JavaScript 基本功--面试宝典' 
date: 2018-12-26 2:30:14
hidden: true
slug: 2mvain7qa86
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript数据类型</h2>
<h4>JavaScript中有哪些基本数据类型</h4>
<p><code>undefined</code>、<code>null</code>、<code>number</code>、<code>string</code>、<code>boolean</code>、<code>symbol</code>(es6中新增)<br>为啥没有object、array、function？他们都属于复杂的数据类型。看起来有点咬文嚼字。</p>
<h4>typeof 操作符对各个数据类型的操作结果</h4>
<p>string-------------------------string<br>number-------------------------number<br>boolean------------------------boolean<br>function-----------------------function<br>undefined----------------------undefined<br>null---------------------------object （null值表示一个空对象指针）<br>array--------------------------object<br>object-------------------------object<br>因此，有些时候typeof并不能准确的判断某个变量的数据类型。</p>
<h2 id="articleHeader1">如何区分null和undefined</h2>
<p>通过上边可以看出，使用typeof就可以判断区null和undefined了。<br>还可以通过<code>null === undefined</code>这种方式来判断。</p>
<h2 id="articleHeader2">如何准确的判断一个变量的数据类型</h2>
<p>JavaScript 中所有变量都可以当作对象使用，除了 null 和 undefined 两个例外。所以我们可以使用对象原型链上的toString方法来将一个变量转化成字符串，然后区分他们的类型。<br>Object.prototype.toString.call(*);示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call(null)           //  &quot;[object Null]&quot;
Object.prototype.toString.call(undefined)      //  &quot;[object Undefined]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>(null)           <span class="hljs-comment">//  "[object Null]"</span>
Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>(undefined)      <span class="hljs-comment">//  "[object Undefined]"</span></code></pre>
<p><em>*在IE8中两者结果都为 "[object Object]"</em><br>因此，我们也可以用这个方法来区分null和undefined</p>
<h1 id="articleHeader3">对象创建和使用</h1>
<p><strong>创建对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {x:1,'long name':2};
var obj2 = new Object();
var obj3 = Object.create(obj2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> obj1 = {x:<span class="hljs-number">1</span>,<span class="hljs-string">'long name'</span>:<span class="hljs-number">2</span>};
<span class="hljs-keyword">var</span> obj2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-keyword">var</span> obj3 = <span class="hljs-built_in">Object</span>.create(obj2);</code></pre>
<p><strong>访问对象属性</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj1.x                // 1
obj1[&quot;long name&quot;]     // 2 注意，如果属性名有空格或者中划线什么的就只能使用这种方式了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>obj1<span class="hljs-selector-class">.x</span>                <span class="hljs-comment">// 1</span>
obj1[<span class="hljs-string">"long name"</span>]     <span class="hljs-comment">// 2 注意，如果属性名有空格或者中划线什么的就只能使用这种方式了</span></code></pre>
<p><strong>删除对象属性</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delete obj1.x         // 删除对象属性的唯一方法是delete" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">delete</span> obj1.x         <span class="hljs-regexp">//</span> 删除对象属性的唯一方法是<span class="hljs-keyword">delete</span></code></pre>
<h1 id="articleHeader4">继承与原型链</h1>
<p>前边我们说了，可以认为 JavaScript 中万物皆对象。每个对象都有一个私有 Prototype。它持有一个连接到另一个称为其 prototype 对象（原型对象）的链接。该 prototype 对象又具有一个自己的原型，层层向上直到一个对象的原型为 null。<br><strong>继承</strong><br>上边创建对象以及可以看到使用 Object.create 可以实现继承。还有可以使用<code>Object.prototype</code>来实现继承。示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1}
function P(name){    // 构造函数
    this.name = name
}
P.prototype = obj  // 继承obj
var p = new P('wesley');     // 实例对象
p.a                  // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {a:<span class="hljs-number">1</span>}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">P</span><span class="hljs-params">(name)</span></span>{    <span class="hljs-comment">// 构造函数</span>
    <span class="hljs-keyword">this</span>.name = name
}
P.prototype = obj  <span class="hljs-comment">// 继承obj</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> P(<span class="hljs-string">'wesley'</span>);     <span class="hljs-comment">// 实例对象</span>
p.a                  <span class="hljs-comment">// 1</span></code></pre>
<p>其次，我们还可以使用es6中的新语法class等关键字来实现继承。<br><strong>原型链</strong><br>原型链的定义复杂拗口，我们可以通过 JavaScript 的非标准但许多浏览器实现的属性<code>__proto__</code>来理解原型链。<br>对象的<code>__proto__</code>属性是该对象的构造函数的prototype属性。基于上边构造函数继承代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(p.__proto__ === P.prototype)                       // true
console.log(P.prototype === obj)                               // true
console.log(P.prototype.__proto__ === Object.prototype)        // true
console.log(Object.prototype.__proto__ === null)               // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(p.__proto__ === P.prototype)                       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(P.prototype === obj)                               <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(P.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype)        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.__proto__ === <span class="hljs-literal">null</span>)               <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader5">作用域与命名空间</h2>
<p>如果了解es6的let用法，那么就应该只要 JavaScript 有块级作用域和函数作用域。简单来说通常我们使用var创建的变量都属于函数作用域。<br>什么是块级作用域呢？其实可以简单理解为一对花括号包围的代码块的作用范围内。<br>JavaScript 中没有显式的命名空间定义，这就意味着所有对象都定义在一个全局共享的命名空间下面。<br>每次引用一个变量，JavaScript 会向上遍历整个作用域直到找到这个变量为止。 如果到达全局作用域但是这个变量仍未找到，则会抛出 ReferenceError 异常。<br><strong>隐式的全局变量</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo1 = 1;
var foo2 = 2;   // 如果是在函数内部  就是局部变量
let foo3 = 3;   // 如果是在代码块内  就是局部变量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>fo<span class="hljs-meta">o1</span> = <span class="hljs-number">1</span>;
var fo<span class="hljs-meta">o2</span> = <span class="hljs-number">2</span>;   <span class="hljs-comment">// 如果是在函数内部  就是局部变量</span>
let fo<span class="hljs-meta">o3</span> = <span class="hljs-number">3</span>;   <span class="hljs-comment">// 如果是在代码块内  就是局部变量</span></code></pre>
<p>可以通过如下代码的执行结果来理解let和var</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 10</span></code></pre>
<p>如果使用let</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  a[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}
a[<span class="hljs-number">6</span>](); <span class="hljs-comment">// 6</span></code></pre>
<p><strong>变量声明提升</strong><br>var 表达式和 function 声明都将会被提升到当前作用域的顶部。要注意的是 let 表达式并不会被提升。<br>这也正好可以说明如下代码可以正常执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test();
function test(){
    console.log(a)
    var a = 5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>test();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a)
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">5</span>;
}</code></pre>
<p>可以理解为提升后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(){
  var a;  // 此时a为undefined  所以我们打印的时候就是undefined了
  console.log(a)
  a = 5;
}
test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span><span class="hljs-comment">{
  var a;  // 此时a为undefined  所以我们打印的时候就是undefined了
  console.log(a)
  a = 5;
}</span>
<span class="hljs-title">test</span><span class="hljs-params">()</span>;</span></code></pre>
<p>不使用var申明的变量提升示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test();
function test(){
  b = 5
}
console.log(b)
// 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>test();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
  b = <span class="hljs-number">5</span>
}
<span class="hljs-built_in">console</span>.log(b)
<span class="hljs-comment">// 5</span></code></pre>
<p>可以理解为提升后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b;  // undefined
function test(){
  b = 5
}
console.log(b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> b;  <span class="hljs-comment">// undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
  b = <span class="hljs-number">5</span>
}
<span class="hljs-built_in">console</span>.log(b)</code></pre>
<h2 id="articleHeader6">闭包</h2>
<p>闭包是 JavaScript 一个非常重要的特性，这意味着当前作用域总是能够访问外部作用域中的变量。<br>可以理解为访问你本不能够访问到的东西，就是一个闭包。示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Counter(start) {
    var count = start;
    return {
        increment: function() {
            count++;
        },

        get: function() {
            return count;
        }
    }
}

var foo = Counter(4);   // 此时如果我们在外部直接 console.log(count) 是会抛错的
foo.increment();
foo.get(); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Counter</span><span class="hljs-params">(start)</span> </span>{
    <span class="hljs-keyword">var</span> count = start;
    <span class="hljs-keyword">return</span> {
        increment: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            count++;
        },

        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> count;
        }
    }
}

<span class="hljs-keyword">var</span> foo = Counter(<span class="hljs-number">4</span>);   <span class="hljs-comment">// 此时如果我们在外部直接 console.log(count) 是会抛错的</span>
foo.increment();
foo.get(); <span class="hljs-comment">// 5</span></code></pre>
<p>这里，Counter 函数返回两个闭包，函数 increment 和函数 get。这两个函数都维持着对 Counter 函数内部作用域的引用。<br>所以如果需要访问或者说获取Counter中的变量count，只能通过闭包的方式。<br>关于闭包，有个很经典的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// 10个10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, <span class="hljs-number">1000</span>);
}
<span class="hljs-comment">// 10个10</span></code></pre>
<p><em>*想想，为什么。具体可以看：<a href="https://segmentfault.com/a/1190000006893014">https://segmentfault.com/a/11...</a></em><br><strong>setTimeout 和 setInterval</strong><br>由于 JavaScript 是异步的，可以使用 <code>setTimeout</code> 和 <code>setInterval</code> 来计划执行函数。<br><em>*注意: 定时处理不是 ECMAScript 的标准，它们在 DOM (文档对象模型) 被实现。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {}
var id = setTimeout(foo, 1000); // 返回一个大于零的数字" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{}
<span class="hljs-keyword">var</span> id = setTimeout(foo, <span class="hljs-number">1000</span>); <span class="hljs-comment">// 返回一个大于零的数字</span></code></pre>
<p>当 setTimeout 被调用时，它会返回一个 ID 标识并且计划在将来大约 1000 毫秒后调用 foo 函数。 foo 函数只会被执行一次。<br>所以，通常我们可以认为被setTimeout执行的函数是会被异步执行的。</p>
<p>Tips：<br>本人正在找工作。。。<br>简历：<a href="https://eternityspring.github.io/" rel="nofollow noreferrer" target="_blank">https://eternityspring.github...</a><br>个人网站：<a href="https://79px.com/" rel="nofollow noreferrer" target="_blank">https://79px.com/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 基本功--面试宝典

## 原文链接
[https://segmentfault.com/a/1190000011901359](https://segmentfault.com/a/1190000011901359)

