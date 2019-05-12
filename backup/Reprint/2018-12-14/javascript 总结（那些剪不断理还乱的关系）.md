---
title: 'javascript 总结（那些剪不断理还乱的关系）' 
date: 2018-12-14 2:30:11
hidden: true
slug: gonqm94a5af
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>整理 <code>javascript</code> 中一些相似的关键字、方法、概念。</p>
<h2 id="articleHeader1">1. var、function、let、const 命令的区别</h2>
<ul>
<li>使用var声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象</li>
<li>使用let声明的变量，其作用域为该语句所在的代码块内，不存在变量提升</li>
<li>使用const声明的是常量，在后面出现的代码中不能再修改该常量的栈内存在的值和地址</li>
<li>使用function声明的函数，其作用域为该语句所在的函数内，且存在函数提升现象</li>
<li>
<p>var</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a. 变量提升
console.log(a) // => undefined
var a = 123

//b. 作用域
function f() {
    var a = 123
    console.log(a) // => 123
}
console.log(a) // => a is not defined

for (var i = 0; i < 10; i ++) {}
console.log(i) // => 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//a. 变量提升</span>
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// =&gt; undefined</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>

<span class="hljs-comment">//b. 作用域</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
    <span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// =&gt; 123</span>
}
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">// =&gt; a is not defined</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {}
<span class="hljs-built_in">console</span>.log(i) <span class="hljs-comment">// =&gt; 10</span></code></pre>
</li>
<li>
<p>let</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a. 变量不提升
console.log(a) // => a is not defined
let a = 123

//b. 作用域为所在代码块内
for (let i = 0; i < 10; i ++) {}
console.log(i) // => i is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//a. 变量不提升</span>
console.<span class="hljs-built_in">log</span>(a) <span class="hljs-comment">// =&gt; a is not defined</span>
<span class="hljs-keyword">let</span> a = <span class="hljs-number">123</span>

<span class="hljs-comment">//b. 作用域为所在代码块内</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {}
console.<span class="hljs-built_in">log</span>(i) <span class="hljs-comment">// =&gt; i is not defined</span></code></pre>
</li>
<li>
<p>const</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a. 不能修改的是栈内存在的值和地址
const a = 10
    a = 20 // => Assignment to constant variable 

// 但是以下的赋值确是合法的
const  a = {
    b: 20
}
a.b = 30
console.log(a.b) // => 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//a. 不能修改的是栈内存在的值和地址</span>
const <span class="hljs-selector-tag">a</span> = <span class="hljs-number">10</span>
    <span class="hljs-selector-tag">a</span> = <span class="hljs-number">20</span> <span class="hljs-comment">// =&gt; Assignment to constant variable </span>

<span class="hljs-comment">// 但是以下的赋值确是合法的</span>
const  <span class="hljs-selector-tag">a</span> = {
    <span class="hljs-selector-tag">b</span>: <span class="hljs-number">20</span>
}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.b</span> = <span class="hljs-number">30</span>
console.log(<span class="hljs-selector-tag">a</span>.b) <span class="hljs-comment">// =&gt; 30</span></code></pre>
</li>
<li>
<p>function</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a. 函数提升
fn() // => 123
function fn() {
    return 123
}

//b. 作用域
function fn() {
    function fn1 () {
        return 123456
    }
    fn1() // => 123456
}
fn1() // => fn1 is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//a. 函数提升</span>
fn() <span class="hljs-comment">// =&gt; 123</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>
}

<span class="hljs-comment">//b. 作用域</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">123456</span>
    }
    fn1() <span class="hljs-comment">// =&gt; 123456</span>
}
fn1() <span class="hljs-comment">// =&gt; fn1 is not defined</span></code></pre>
</li>
<li>经典面试题</li>
</ul>
<ol>
<li><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1
function fn() {
    if (!a) {
        var a = 123
    }
    console.log(a)
}
fn() ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    if (!a) {
        var a = 123
    }</span>
    <span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(a)</span>
}
<span class="hljs-title">fn</span><span class="hljs-params">()</span> ?</span></code></pre></li>
<li>
<p>// 如何依次打印出0 - 9</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 10; i++) {
    setTimeout(function(){
        console.log(i)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i)
    })
}</code></pre>
</li>
<li><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo() {
    getName = function(){
        console.log(&quot;1&quot;);
    };
    return this;
}
Foo.getName = function() {
    console.log(&quot;2&quot;);
};

Foo.prototype.getName = function(){
    console.log(&quot;3&quot;);
};

var getName = function() {
    console.log(&quot;4&quot;);
}
function getName(){
    console.log(&quot;5&quot;);
}

Foo.getName(); ?
getName(); ?
Foo().getName(); ?  
getName(); ?
new Foo.getName(); ?
new Foo().getName(); ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1"</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2"</span>);
};

Foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3"</span>);
};

<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"4"</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"5"</span>);
}

Foo.getName(); ?
getName(); ?
Foo().getName(); ?  
getName(); ?
<span class="hljs-keyword">new</span> Foo.getName(); ?
<span class="hljs-keyword">new</span> Foo().getName(); ?</code></pre></li>
</ol>
<ul><li>
<p>答案：<br><em>第一题</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//我们把它执行顺序整理下
var a = 1
function fn() {
    var a = nudefined
    if (!a) {
        var a = 123
    }
    console.log(a)
}
//所以 答案很明显 就是 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//我们把它执行顺序整理下</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
function fn() {
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = nudefined
    <span class="hljs-keyword">if</span> (!a) {
        <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">123</span>
    }
    console.log(a)
}
<span class="hljs-comment">//所以 答案很明显 就是 123</span></code></pre>
<p><em>第2题</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 10; i++) {
    print(i)
}
function print(i) { // 把每个变量i值传进来，变成只可当前作用域访问的局部变量
    setTimeout(function(){
        console.log(i)
    })
}

// 或者自执行函数简写
for (var i = 0; i < 10; i++) {
    (function(i){
        setTimeout(function(){
            console.log(i)
        })
    })(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
    print(<span class="hljs-name">i</span>)
}
function print(<span class="hljs-name">i</span>) { // 把每个变量i值传进来，变成只可当前作用域访问的局部变量
    setTimeout(<span class="hljs-name">function</span>(){
        console.log(<span class="hljs-name">i</span>)
    })
}

// 或者自执行函数简写
for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
    (<span class="hljs-name">function</span>(<span class="hljs-name">i</span>){
        setTimeout(<span class="hljs-name">function</span>(){
            console.log(<span class="hljs-name">i</span>)
        })
    })(<span class="hljs-name">i</span>)
}</code></pre>
<p><em>第3题</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 我们整理下它的执行顺序
var getName = undefined
function Foo() {
    getName = function(){
        console.log(&quot;1&quot;);
    };
    return this;
}
function getName(){
    console.log(&quot;5&quot;);
}
Foo.getName = function() {
    console.log(&quot;2&quot;);
};

Foo.prototype.getName = function(){
    console.log(&quot;3&quot;);
};
getName = function() {
    console.log(&quot;4&quot;);
}

Foo.getName(); // 2 
/*
函数也是对象, Foo.getName 相当于给 Foo这个对象添加了一个静态方法 getName,我们调用的其实是这个静态方法,并不是调用的我们实例化的 getName
 */

getName(); // 4  
/*
按照上面的执行顺序,其实这个就很好理解了,因为 `getName = function() { console.log(&quot;4&quot;); }` 是最后一个赋值, 执行的应该是这个函数
 */

Foo().getName(); // 1  
/*
    这里为什么是 1 而不是我们想象的 3 呢?
    问题就是出在 调用的是 Foo(); 并没有使用 new 这个关键字,所以那时候返回的 this 指向的并不是 Foo, 而是 window;
    至于为什么不用 new 返回的 this 不指向 Foo, 这个随便去哪查一下就好, 就不在这介绍了
 */

getName(); // 1
/*
    这里为什么也是1 呢?  
    其实原因就是 上面我们调用了 `Foo().getName();` 这个方法引起的, 因为我们执行了 Foo 函数, 触发了
    getName = function(){
        console.log(&quot;1&quot;);
    }
    这段代码, 而且并没有在Foo里面声明  getName 变量, 于是就一直往上查找, 找到外部的 getName 变量 并赋值给它.
    所以这里调用 getName() 方法时, 它的值已经变成
    getName = function(){
        console.log(&quot;1&quot;);
    } 了
 */

new Foo.getName(); // 2
/*这个时候还是没有实例化, 调用的还是它的静态方法*/

new Foo().getName(); // 3
/*因为实例化了,所以调的是原型上的方法*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 我们整理下它的执行顺序</span>
<span class="hljs-keyword">var</span> getName = <span class="hljs-literal">undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"1"</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"5"</span>);
}
Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"2"</span>);
};

Foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3"</span>);
};
getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"4"</span>);
}

Foo.getName(); <span class="hljs-comment">// 2 </span>
<span class="hljs-comment">/*
函数也是对象, Foo.getName 相当于给 Foo这个对象添加了一个静态方法 getName,我们调用的其实是这个静态方法,并不是调用的我们实例化的 getName
 */</span>

getName(); <span class="hljs-comment">// 4  </span>
<span class="hljs-comment">/*
按照上面的执行顺序,其实这个就很好理解了,因为 `getName = function() { console.log("4"); }` 是最后一个赋值, 执行的应该是这个函数
 */</span>

Foo().getName(); <span class="hljs-comment">// 1  </span>
<span class="hljs-comment">/*
    这里为什么是 1 而不是我们想象的 3 呢?
    问题就是出在 调用的是 Foo(); 并没有使用 new 这个关键字,所以那时候返回的 this 指向的并不是 Foo, 而是 window;
    至于为什么不用 new 返回的 this 不指向 Foo, 这个随便去哪查一下就好, 就不在这介绍了
 */</span>

getName(); <span class="hljs-comment">// 1</span>
<span class="hljs-comment">/*
    这里为什么也是1 呢?  
    其实原因就是 上面我们调用了 `Foo().getName();` 这个方法引起的, 因为我们执行了 Foo 函数, 触发了
    getName = function(){
        console.log("1");
    }
    这段代码, 而且并没有在Foo里面声明  getName 变量, 于是就一直往上查找, 找到外部的 getName 变量 并赋值给它.
    所以这里调用 getName() 方法时, 它的值已经变成
    getName = function(){
        console.log("1");
    } 了
 */</span>

<span class="hljs-keyword">new</span> Foo.getName(); <span class="hljs-comment">// 2</span>
<span class="hljs-comment">/*这个时候还是没有实例化, 调用的还是它的静态方法*/</span>

<span class="hljs-keyword">new</span> Foo().getName(); <span class="hljs-comment">// 3</span>
<span class="hljs-comment">/*因为实例化了,所以调的是原型上的方法*/</span></code></pre>
</li></ul>
<p><strong>我记得看到过几个经典的例子，找了半天没找到, 暂时就这些吧.。</strong></p>
<h2 id="articleHeader2">2. == 与 === 的区别</h2>
<ul>
<li>
<strong>相同点：</strong><br>  它们两个运算符都允许任意类型的的操作数，如果操作数相等，返回true，否则返回false</li>
<li>
<strong>不同点：</strong><br><strong>==：</strong>运算符称作相等，用来检测两个操作数是否相等，这里的相等定义的非常宽松，可以允许进行类型转换<br><strong>===：</strong>用来检测两个操作数是否严格相等,不会进行类型转换</li>
<li>
<p><strong>== 转换规则</strong></p>
<ol>
<li>首先看双等号前后有没有NaN，如果存在NaN，一律返回false。</li>
<li>再看双等号前后有没有布尔，有布尔就将布尔转换为数字。（false是0，true是1）</li>
<li>接着看双等号前后有没有字符串, 有三种情况：<br>  a. 对方是对象，对象使用toString()或者valueOf()进行转换；<br>  b. 对方是数字，字符串转数字；<br>  c. 对方是字符串，直接比较；<br>  d. 其他返回false</li>
<li>如果是数字，对方是对象，对象取valueOf()或者toString()进行比较, 其他一律返回false</li>
<li>null, undefined不会进行类型转换, 但它们俩相等</li>
</ol>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不同类型，相同值
var a = 1
var b = '1'
console.log(a == b) // => true 
console.log(a === b) // => false 

// 对象和字符串
console.log([1,2,3] == '1,2,3') // => true  因为 [1,2,3]调用了 toString()方法进行转换

// 对象和布尔
console.log([] == true)  // => false  []转换为字符串'',然后转换为数字0, true 转换成1

// 对象和数字
console.log(['1'] == 1) // => true []转换为字符串'1'
console.log(2 == {valueOf: function(){return 2"}}") // => true  调用了 valueOf()方法进行转换

// null, undefined 不会进行类型转换,  但它们俩相等
console.log(null == 1) // => false
console.log(null == 0) // => false
console.log(undefined == 1) // => false
console.log(undefined == 0) // => false
console.log(null == false) // => false
console.log(undefined == false) // => false
console.log(null == undefined) // => true 
console.log(null === undefined) // => false

// NaN 跟任何东西都不相等（包括自己）
console.log(NaN == NaN) // => false
console.log(NaN === NaN) // => false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 不同类型，相同值</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'1'</span>
<span class="hljs-built_in">console</span>.log(a == b) <span class="hljs-comment">// =&gt; true </span>
<span class="hljs-built_in">console</span>.log(a === b) <span class="hljs-comment">// =&gt; false </span>

<span class="hljs-comment">// 对象和字符串</span>
<span class="hljs-built_in">console</span>.log([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] == <span class="hljs-string">'1,2,3'</span>) <span class="hljs-comment">// =&gt; true  因为 [1,2,3]调用了 toString()方法进行转换</span>

<span class="hljs-comment">// 对象和布尔</span>
<span class="hljs-built_in">console</span>.log([] == <span class="hljs-literal">true</span>)  <span class="hljs-comment">// =&gt; false  []转换为字符串'',然后转换为数字0, true 转换成1</span>

<span class="hljs-comment">// 对象和数字</span>
<span class="hljs-built_in">console</span>.log([<span class="hljs-string">'1'</span>] == <span class="hljs-number">1</span>) <span class="hljs-comment">// =&gt; true []转换为字符串'1'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span> == {<span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>"}}") <span class="hljs-comment">// =&gt; true  调用了 valueOf()方法进行转换</span>

<span class="hljs-comment">// null, undefined 不会进行类型转换,  但它们俩相等</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> == <span class="hljs-number">1</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> == <span class="hljs-number">0</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span> == <span class="hljs-number">1</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span> == <span class="hljs-number">0</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> == <span class="hljs-literal">false</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span> == <span class="hljs-literal">false</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span>) <span class="hljs-comment">// =&gt; true </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-comment">// =&gt; false</span>

<span class="hljs-comment">// NaN 跟任何东西都不相等（包括自己）</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> == <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// =&gt; false</span>
</code></pre>
<p>下面几张图表示这些 == === 的关系</p>
<p><strong>==</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013229487?w=720&amp;h=716" src="https://static.alili.tech/img/remote/1460000013229487?w=720&amp;h=716" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>===</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013229488?w=720&amp;h=717" src="https://static.alili.tech/img/remote/1460000013229488?w=720&amp;h=717" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">3. toSting 和 valueOf</h2>
<p><strong>所有对象继承了这两个转换方法</strong><br><code>toString</code>: 返回一个反映这个对象的字符串<br><code>valueOf</code>: 返回它相应的原始值</p>
<ul>
<li>
<p>toString</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3]
var obj = {
    a: 1,
    b: 2
}
console.log(arr.toString()) // => 1,2,3
console.log(obj.toString()) // => [object Object]
// 那我们修改一下它原型上的 toString 方法呢
Array.prototype.toString = function(){ return 123 }
Object.prototype.toString = function(){ return 456 }
console.log(arr.toString()) // => 123
console.log(obj.toString()) // => 456

// 我们看下其余类型转换出来的结果， 基本都是转换成了字符串
console.log((new Date).toString()) // => Mon Feb 05 2018 17:45:47 GMT+0800 (中国标准时间)
console.log(/\d+/g.toString()) // => &quot;/\d+/g&quot;
console.log((new RegExp('asdad', 'ig')).toString()) // => &quot;/asdad/gi&quot;
console.log(true.toString()) // => &quot;true&quot;
console.log(false.toString()) // => &quot;false&quot;
console.log(function(){console.log(1)}.toString()) // => &quot;function (){console.log(1)}&quot;
console.log(Math.random().toString()) // => &quot;0.2609205380591437&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
}
<span class="hljs-built_in">console</span>.log(arr.toString()) <span class="hljs-comment">// =&gt; 1,2,3</span>
<span class="hljs-built_in">console</span>.log(obj.toString()) <span class="hljs-comment">// =&gt; [object Object]</span>
<span class="hljs-comment">// 那我们修改一下它原型上的 toString 方法呢</span>
<span class="hljs-built_in">Array</span>.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">123</span> }
<span class="hljs-built_in">Object</span>.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">456</span> }
<span class="hljs-built_in">console</span>.log(arr.toString()) <span class="hljs-comment">// =&gt; 123</span>
<span class="hljs-built_in">console</span>.log(obj.toString()) <span class="hljs-comment">// =&gt; 456</span>

<span class="hljs-comment">// 我们看下其余类型转换出来的结果， 基本都是转换成了字符串</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).toString()) <span class="hljs-comment">// =&gt; Mon Feb 05 2018 17:45:47 GMT+0800 (中国标准时间)</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\d+/g</span>.toString()) <span class="hljs-comment">// =&gt; "/\d+/g"</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'asdad'</span>, <span class="hljs-string">'ig'</span>)).toString()) <span class="hljs-comment">// =&gt; "/asdad/gi"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span>.toString()) <span class="hljs-comment">// =&gt; "true"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">false</span>.toString()) <span class="hljs-comment">// =&gt; "false"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)}.toString()) <span class="hljs-comment">// =&gt; "function (){console.log(1)}"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random().toString()) <span class="hljs-comment">// =&gt; "0.2609205380591437"</span></code></pre>
</li>
<li>
<p>valueOf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3]
var obj = {
    a: 1,
    b: 2
}
console.log(arr.valueOf()) // => [1, 2, 3]
console.log(obj.valueOf()) // => {a: 1, b: 2}
// 证明valueOf返回的是自身的原始值
// 同样我们修改下 valueOf 方法

Array.prototype.valueOf = function(){ return 123 }
Object.prototype.valueOf = function(){ return 456 }
console.log(arr.valueOf()) // => 123
console.log(obj.valueOf()) // => 456

// valueOf转化出来的基本都是原始值，复杂数据类型Object返回都是本身，除了Date 返回的是时间戳
console.log((new Date).valueOf()) // => 1517824550394  //返回的并不是字符串的世界时间了，而是时间戳
console.log(/\d+/g.valueOf()) // => 456  当我们不设置时valueOf时，正常返回的正则表式本身：/\d+/g，只是我们设置了 Object.prototype.valueOf 所以返回的时：456
console.log(Math.valueOf()) // => 456 同上
console.log(function(){console.log(1)}.valueOf()) // => 456 同上 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
}
<span class="hljs-built_in">console</span>.log(arr.valueOf()) <span class="hljs-comment">// =&gt; [1, 2, 3]</span>
<span class="hljs-built_in">console</span>.log(obj.valueOf()) <span class="hljs-comment">// =&gt; {a: 1, b: 2}</span>
<span class="hljs-comment">// 证明valueOf返回的是自身的原始值</span>
<span class="hljs-comment">// 同样我们修改下 valueOf 方法</span>

<span class="hljs-built_in">Array</span>.prototype.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">123</span> }
<span class="hljs-built_in">Object</span>.prototype.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">456</span> }
<span class="hljs-built_in">console</span>.log(arr.valueOf()) <span class="hljs-comment">// =&gt; 123</span>
<span class="hljs-built_in">console</span>.log(obj.valueOf()) <span class="hljs-comment">// =&gt; 456</span>

<span class="hljs-comment">// valueOf转化出来的基本都是原始值，复杂数据类型Object返回都是本身，除了Date 返回的是时间戳</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).valueOf()) <span class="hljs-comment">// =&gt; 1517824550394  //返回的并不是字符串的世界时间了，而是时间戳</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-regexp">/\d+/g</span>.valueOf()) <span class="hljs-comment">// =&gt; 456  当我们不设置时valueOf时，正常返回的正则表式本身：/\d+/g，只是我们设置了 Object.prototype.valueOf 所以返回的时：456</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.valueOf()) <span class="hljs-comment">// =&gt; 456 同上</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)}.valueOf()) <span class="hljs-comment">// =&gt; 456 同上 </span></code></pre>
</li>
<li>toString 和 valueOf 实例</li>
</ul>
<ol>
<li><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    toString: function() {
        console.log('你调用了a的toString函数')
        return 8
    }
}
console.log( ++a) 
// 你调用了a的toString函数 
// 9  
// 当你设置了 toString 方法， 没有设置 valueOf 方法时，会调用toString方法，无视valueOf方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你调用了a的toString函数'</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">8</span>
    }
}
<span class="hljs-built_in">console</span>.log( ++a) 
<span class="hljs-comment">// 你调用了a的toString函数 </span>
<span class="hljs-comment">// 9  </span>
<span class="hljs-comment">// 当你设置了 toString 方法， 没有设置 valueOf 方法时，会调用toString方法，无视valueOf方法</span></code></pre></li>
<li><div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    num: 10,
    toString: function() {
        console.log('你调用了a的toString函数')
        return 8
    },
    valueOf: function() {
        console.log('你调用了a的valueOf函数')
        return this.num
    }
}
console.log( ++a) 
// 你调用了a的valueOf函数
// 11
// 而当你两者都设置了的时候，会优先取valueOf方法， 不会执行toString方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">num</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你调用了a的toString函数'</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">8</span>
    },
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你调用了a的valueOf函数'</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num
    }
}
<span class="hljs-built_in">console</span>.log( ++a) 
<span class="hljs-comment">// 你调用了a的valueOf函数</span>
<span class="hljs-comment">// 11</span>
<span class="hljs-comment">// 而当你两者都设置了的时候，会优先取valueOf方法， 不会执行toString方法</span></code></pre></li>
</ol>
<h2 id="articleHeader4">4. || 和 &amp;&amp; 的区别</h2>
<ul>
<li>
<p><strong>如果以 “||” 和 “&amp;&amp;” 做条件判断的话</strong></p>
<ul>
<li>“||” 只要其中有一个为 true 那么就满足条件</li>
<li>
<p>“&amp;&amp;” 必须要所有条件都为 true 才能满足条件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = true,b = false, c = true, d = false
var str = 'none'
if (b || d || a) {
    str = '现在是 ||'
}
console.log(str) // => '现在是 ||'  ,因为其中a为true所有满足条件

var str = 'none'
if (b || d ) {
    str = '现在是 ||'
}
console.log(str) // => 'none' ,因为b,d都是false, 不满足条件

var str = 'none'
if (a &amp;&amp; c &amp;&amp; d) {
    str = '现在是 &amp;&amp;'
}
console.log(str) // => 'none' ,因为d是false, 其中有一个false就不满足条件

var str = 'none'
if (a &amp;&amp; c) {
    str = '现在是 &amp;&amp;'
}
console.log(str) // => '现在是 &amp;&amp;' ,因为b,d都是true, 满足条件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var a = <span class="hljs-keyword">true</span>,b = <span class="hljs-keyword">false</span>, c = <span class="hljs-keyword">true</span>, d = <span class="hljs-keyword">false</span>
var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (b || d || a) {
    <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 ||'</span>
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; '现在是 ||'  ,因为其中a为true所有满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (b || d ) {
    <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 ||'</span>
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; 'none' ,因为b,d都是false, 不满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (a &amp;&amp; c &amp;&amp; d) {
    <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 &amp;&amp;'</span>
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; 'none' ,因为d是false, 其中有一个false就不满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (a &amp;&amp; c) {
    <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 &amp;&amp;'</span>
}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; '现在是 &amp;&amp;' ,因为b,d都是true, 满足条件</span></code></pre>
</li>
</ul>
</li>
<li>
<p><strong>短路原理：</strong></p>
<ul>
<li>
<p><strong>||（或）</strong>:<br>  1.只要“||”前面是true,结果会返回“||”前面的值<br>  2.如果“||”前面是false,结果都会“||”返回后面的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = true,b = false, c = true, d = false
var str = 'none'
if (b || d || a) { str = '现在是 ||' }
console.log(str) // => '现在是 ||'  ,因为其中a为true所有满足条件

var str = 'none'
if (b || d ) { str = '现在是 ||' }
console.log(str) // => 'none' ,因为b,d都是false, 不满足条件

var str = 'none'
if (a &amp;&amp; c &amp;&amp; d) { str = '现在是 &amp;&amp;' }
console.log(str) // => 'none' ,因为d是false, 其中有一个false就不满足条件

var str = 'none'
if (a &amp;&amp; c) { str = '现在是 &amp;&amp;' }
console.log(str) // => '现在是 &amp;&amp;' ,因为b,d都是true, 满足条件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var a = <span class="hljs-keyword">true</span>,b = <span class="hljs-keyword">false</span>, c = <span class="hljs-keyword">true</span>, d = <span class="hljs-keyword">false</span>
var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (b || d || a) { <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 ||'</span> }
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; '现在是 ||'  ,因为其中a为true所有满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (b || d ) { <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 ||'</span> }
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; 'none' ,因为b,d都是false, 不满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (a &amp;&amp; c &amp;&amp; d) { <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 &amp;&amp;'</span> }
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; 'none' ,因为d是false, 其中有一个false就不满足条件</span>

var <span class="hljs-built_in">str</span> = <span class="hljs-string">'none'</span>
<span class="hljs-keyword">if</span> (a &amp;&amp; c) { <span class="hljs-built_in">str</span> = <span class="hljs-string">'现在是 &amp;&amp;'</span> }
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>) <span class="hljs-comment">// =&gt; '现在是 &amp;&amp;' ,因为b,d都是true, 满足条件</span></code></pre>
</li>
<li>
<p><strong>&amp;&amp;（与）</strong>：<br>  1.只要“&amp;&amp;”前面是false，无论“&amp;&amp;”后面是true还是false，结果都将返“&amp;&amp;”前面的值<br>  2.只要“&amp;&amp;”前面是true，无论“&amp;&amp;”后面是true还是false，结果都将返“&amp;&amp;”后面的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = false, b = true
console.log(a &amp;&amp; b) // => false  只要“&amp;&amp;”前面是false，无论“&amp;&amp;”后面是true还是false，结果都将返“&amp;&amp;”前面的值
console.log(b &amp;&amp; a) // => false  只要“&amp;&amp;”前面是true，无论“&amp;&amp;”后面是true还是false，结果都将返“&amp;&amp;”后面的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> a = <span class="hljs-literal">false</span>, b = <span class="hljs-literal">true</span>
console.<span class="hljs-built_in">log</span>(a &amp;&amp; b) // =&gt; <span class="hljs-literal">false</span>  只要“&amp;&amp;”前面是<span class="hljs-literal">false</span>，无论“&amp;&amp;”后面是<span class="hljs-literal">true</span>还是<span class="hljs-literal">false</span>，结果都将返“&amp;&amp;”前面的值
console.<span class="hljs-built_in">log</span>(b &amp;&amp; a) // =&gt; <span class="hljs-literal">false</span>  只要“&amp;&amp;”前面是<span class="hljs-literal">true</span>，无论“&amp;&amp;”后面是<span class="hljs-literal">true</span>还是<span class="hljs-literal">false</span>，结果都将返“&amp;&amp;”后面的值</code></pre>
</li>
</ul>
</li>
</ul>
<h2 id="articleHeader5">5. call/bind/apply 的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = '小刚'
var person = {
    name: '小明',
    fn: function() {
        console.log(this.name + '撸代码')
    }
}
person.fn() // => 小明撸代码
// 如何把它变成  “小刚撸代码”  呢？

// 我们可以用 call/bind/apply 分别来实现
person.fn.call(window) // => 小刚撸代码
person.fn.apply(window) // => 小刚撸代码
person.fn.bind(window)() // => 小刚撸代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> name = <span class="hljs-string">'小刚'</span>
<span class="hljs-selector-tag">var</span> person = {
    name: <span class="hljs-string">'小明'</span>,
    fn: function() {
        console.log(this<span class="hljs-selector-class">.name</span> + <span class="hljs-string">'撸代码'</span>)
    }
}
person.fn() <span class="hljs-comment">// =&gt; 小明撸代码</span>
<span class="hljs-comment">// 如何把它变成  “小刚撸代码”  呢？</span>

<span class="hljs-comment">// 我们可以用 call/bind/apply 分别来实现</span>
person<span class="hljs-selector-class">.fn</span><span class="hljs-selector-class">.call</span>(window) <span class="hljs-comment">// =&gt; 小刚撸代码</span>
person<span class="hljs-selector-class">.fn</span><span class="hljs-selector-class">.apply</span>(window) <span class="hljs-comment">// =&gt; 小刚撸代码</span>
person<span class="hljs-selector-class">.fn</span><span class="hljs-selector-class">.bind</span>(window)() <span class="hljs-comment">// =&gt; 小刚撸代码</span></code></pre>
<p>显而易见，call 和 apply 更加类似，bind与两者形式不同<br>  那 call 和 apply 的区别在哪呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.call(thisObj, arg1, arg2, ...)
obj.apply(thisObj, [arg1, arg2, ...])
// 通过上面的参数我们可以看出， 它们之间的区别是apply接受的是数组参数，call接受的是连续参数。
// 于是我们修改上面的函数来验证它们的区别

var person = {
    name: '小明',
    fn: function(a,b) {
        if ({}.toString.call(a).slice(8, -1) === 'Array') {
            console.log(this.name+','+a.toString()+'撸代码')
        }else{
            console.log(this.name+','+a+','+b+'撸代码')
        } 
    }
}

person.fn.call(this, '小红', '小黑' ) // => 小刚,小红,小黑撸代码
person.fn.apply(this, ['小李', '小谢']) // => 小刚,小李,小谢撸代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>obj.<span class="hljs-built_in">call</span>(thisObj, arg1, arg2, ...)
obj.<span class="hljs-built_in">apply</span>(thisObj, [arg1, arg2, ...])
<span class="hljs-comment">// 通过上面的参数我们可以看出， 它们之间的区别是apply接受的是数组参数，call接受的是连续参数。</span>
<span class="hljs-comment">// 于是我们修改上面的函数来验证它们的区别</span>

var person = {
    <span class="hljs-built_in">name</span>: <span class="hljs-string">'小明'</span>,
    fn: function(a,b) {
        <span class="hljs-keyword">if</span> ({}.<span class="hljs-built_in">toString</span>.<span class="hljs-built_in">call</span>(a).slice(<span class="hljs-number">8</span>, -<span class="hljs-number">1</span>) === <span class="hljs-string">'Array'</span>) {
            console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>+<span class="hljs-string">','</span>+a.<span class="hljs-built_in">toString</span>()+<span class="hljs-string">'撸代码'</span>)
        }<span class="hljs-keyword">else</span>{
            console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>+<span class="hljs-string">','</span>+a+<span class="hljs-string">','</span>+b+<span class="hljs-string">'撸代码'</span>)
        } 
    }
}

person.fn.<span class="hljs-built_in">call</span>(this, <span class="hljs-string">'小红'</span>, <span class="hljs-string">'小黑'</span> ) <span class="hljs-comment">// =&gt; 小刚,小红,小黑撸代码</span>
person.fn.<span class="hljs-built_in">apply</span>(this, [<span class="hljs-string">'小李'</span>, <span class="hljs-string">'小谢'</span>]) <span class="hljs-comment">// =&gt; 小刚,小李,小谢撸代码</span></code></pre>
<p>那么bind 与call,apply有什么区别呢 ? <br>  与call和apply不同的是，bind绑定后不会立即执行。它只会将该函数的 this 指向确定好,然后返回该函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;小红&quot;
var obj = {
    name: '小明',
    fn: function(){
        console.log('我是'+this.name)
    }
}
setTimeout(obj.fn, 1000) // => 我是小红
// 我们可以用bind方法打印出 &quot;我是小明&quot;
setTimeout(obj.fn.bind(obj), 1000) // => 我是小明
// 这个地方就不能用 call 或 apply 了, 不然我们把函数刚一方去就执行了

// 注意: bind()函数是在 ECMA-262 第五版才被加入
// 所以 你想兼容低版本的话 ,得需要自己实现 bind 函数
Function.prototype.bind = function (oThis) {
    if (typeof this !== &quot;function&quot;) {
      throw new TypeError(&quot;Function.prototype.bind - what is trying to be bound is not callable&quot;);
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(
              this instanceof fNOP &amp;&amp; oThis ? this : oThis || window,
              aArgs.concat(Array.prototype.slice.call(arguments))
          );
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"小红"</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>,
    <span class="hljs-attr">fn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是'</span>+<span class="hljs-keyword">this</span>.name)
    }
}
setTimeout(obj.fn, <span class="hljs-number">1000</span>) <span class="hljs-comment">// =&gt; 我是小红</span>
<span class="hljs-comment">// 我们可以用bind方法打印出 "我是小明"</span>
setTimeout(obj.fn.bind(obj), <span class="hljs-number">1000</span>) <span class="hljs-comment">// =&gt; 我是小明</span>
<span class="hljs-comment">// 这个地方就不能用 call 或 apply 了, 不然我们把函数刚一方去就执行了</span>

<span class="hljs-comment">// 注意: bind()函数是在 ECMA-262 第五版才被加入</span>
<span class="hljs-comment">// 所以 你想兼容低版本的话 ,得需要自己实现 bind 函数</span>
<span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">oThis</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">"function"</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Function.prototype.bind - what is trying to be bound is not callable"</span>);
    }

    <span class="hljs-keyword">var</span> aArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>), 
        fToBind = <span class="hljs-keyword">this</span>, 
        fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{},
        fBound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> fToBind.apply(
              <span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> fNOP &amp;&amp; oThis ? <span class="hljs-keyword">this</span> : oThis || <span class="hljs-built_in">window</span>,
              aArgs.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>))
          );
        };

    fNOP.prototype = <span class="hljs-keyword">this</span>.prototype;
    fBound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> fBound;
};</code></pre>
<h2 id="articleHeader6">6. callback 、 promise 、 async/await</h2>
<p>这三个东西牵涉到的可能就是我们最常见到的 “同步”、“异步”、“任务队列”、“事件循环”  这几个概念了</p>
<li><ul>
<li>
<p>例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data;
$.ajax({
    ...
    success: function(data) {
        data = data
    }
})
console.log(data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var <span class="hljs-keyword">data</span>;
$.ajax({
    ...
    success: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span> {
        <span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>
    }
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>)</code></pre>
<p>当我们从服务器获取到数据的时候,为什么打印出来的是undefined ? <br>解决这个问题之前我们先来了解javascript的运行环境</p>
<p>JavaScript是单线程语言，JS中所有的任务可以分为两种：同步任务和异步任务。</p>
</li>
<li>
<strong>同步任务: </strong><br>意思是我必须做完第一件事,才能做第二件事,按照顺序一件一件往下执行（在主线程上）</li>
<li>
<strong>异步任务: </strong><br>假如我第一件事需要花费 10s, 但是我第二件事急着要做, 于是我们就把第一件事告诉主线程，然后主线程暂停先放到某个地方, 等把第二件事完成之后,再去那个地方执行第一件事，第一件事也就可以理解为异步任务</li>
<li>
<strong>任务队列（task queue）:</strong><br>任务队列是干嘛的呢; 上面我们说了异步任务的情况,  我们把第一件放到某个地方, 那某个地方是什么地方呢,就是 “任务队列” 这个东西。里面乘放的是所有异步任务。</li>
<li>
<strong>Event Loop(事件循环)</strong><br>当主线程上面所有同步任务执行完之后，主线程就会向任务队列中读取异步任务（队列方法：先进先出）<br>而且是一直重复向任务队列中，即使没有任务。它也会一直去轮询。<br>只不过在任务列表里面没有任务的时候， 主线程只需要稍微过一遍就行， 一旦遇到任务队列里面有任务的时候，就会去执行它<br>也就是说在我们打开网页的时候，JS引擎会一直执行事件循环，直到网页关闭<p>如图所示<br><span class="img-wrap"><img data-src="/img/remote/1460000013229489?w=2160&amp;h=812" src="https://static.alili.tech/img/remote/1460000013229489?w=2160&amp;h=812" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>由此，上面为什么会产生 undefined的原因了， 因为ajax 是异步任务，而我们console.log(data)是同步任务,所以先执行的同步任务，才会去执行 ajax</p>
<p>说了这么多，我们来看下 为什么我们很需要 从 <code>callback</code> =&gt; <code>promise</code> =&gt; <code>async/await</code></p>
<p>因为很多时候我们需要把一个异步任务的返回值，传递给下一个函数，而且有时候是连续的n个</p>
</li>
</ul></li>
<ol>
<li>
<p><strong><code>callback</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只有一个callback的时候
function fn(callback) {
    setTimeout(function(){
        callback &amp;&amp; callback()
    }, 1000)
}
fn(function(){
    console.log(1)
})

// 一旦我们多几个呢？
function fn(a){ // 传入a  返回a1
    function fn1(a1){
        function fn2(a2){
            function fn3(a3){
                console.log(a3)
                ....
            }
        }
    }
}
// 当项目一复杂，这滋味。。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 只有一个callback的时候</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">callback</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        callback &amp;&amp; callback()
    }, <span class="hljs-number">1000</span>)
}
fn(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
})

<span class="hljs-comment">// 一旦我们多几个呢？</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">a</span>)</span>{ <span class="hljs-comment">// 传入a  返回a1</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params">a1</span>)</span>{
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">a2</span>)</span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span>(<span class="hljs-params">a3</span>)</span>{
                <span class="hljs-built_in">console</span>.log(a3)
                ....
            }
        }
    }
}
<span class="hljs-comment">// 当项目一复杂，这滋味。。。</span></code></pre>
</li>
<li>
<p><strong><code>Promise</code></strong></p>
<ul>
<li>
<p>什么是promise?<br><em>Promise是异步编程的一种解决方案，同时也是ES6的内置对象，它有三种状态:</em></p>
<ol>
<li>pending: 进行中</li>
<li>resolved: 已完成</li>
<li>rejected：已失败</li>
</ol>
</li>
<li>
<p><em>Promise方法</em></p>
<ol>
<li>Promise.prototype.then()  接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数。可以进行链式调用</li>
<li>Promise.prototype.catch() 捕获异步操作时出现的异常, 一般我们用来代替.then方法的第二个参数</li>
<li>Promise.resolve()  接受一个参数值，可以是普通的值， 会返回到对应的Promise的then方法上</li>
<li>Promise.reject()  接受一个参数值，可以是普通的值， 会返回到对应的Promise的catch方法上或着then方法的第二个参数上</li>
<li>Promise.all() 接收一个参数，它必须是可以迭代的，比如数组。通常用来处理一些并发的异步操作。成功调用后返回一个数组，数组的值是有序的，即按照传入参数的数组的值操作后返回的结果</li>
<li>Promise.race() 接收一个可以迭代的参数，比如数组。但是只要其中有一个执行了，就算执行完了，不管是成功还是失败。</li>
</ol>
</li>
<li>
<p>基本用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise( (resolve, reject) => {
    setTimeout(function(){
        resolve(1)
    }, 1000)
})
promise.then( res => {
    console.log(res)// 一秒之后打印1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        resolve(<span class="hljs-number">1</span>)
    }, <span class="hljs-number">1000</span>)
})
promise.then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res)<span class="hljs-comment">// 一秒之后打印1</span>
})</code></pre>
</li>
<li>
<p>我们把上面的回调地狱转换下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fn = a => {
    return Promise.resolve(a)
}
const fn1 = a => {
    return Promise.resolve(a)
}
const fn2 = a => {
    // return Promise.resolve(a)
    return new Promise( (resolve, reject) => {
        setTimeout(function(){
            resolve(a)
        },1000)
    })
}
const fn3 = a => {
    // return Promise.resolve(a)
    return new Promise( (resolve, reject) => {
        setTimeout(function(){
            resolve(a)
        },1000)
    })
}
fn(123)
    .then(fn1)
    .then(fn2)
    .then(fn3)
    .then( res => {
        console.log(res) // => 123
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fn = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(a)
}
<span class="hljs-keyword">const</span> fn1 = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(a)
}
<span class="hljs-keyword">const</span> fn2 = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> {
    <span class="hljs-comment">// return Promise.resolve(a)</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(a)
        },<span class="hljs-number">1000</span>)
    })
}
<span class="hljs-keyword">const</span> fn3 = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> {
    <span class="hljs-comment">// return Promise.resolve(a)</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(a)
        },<span class="hljs-number">1000</span>)
    })
}
fn(<span class="hljs-number">123</span>)
    .then(fn1)
    .then(fn2)
    .then(fn3)
    .then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// =&gt; 123</span>
    })</code></pre>
<p>这样就简单明了多了， 我们就不需要一层一层嵌套callback了,可以通过链式调用来解决callback的问题</p>
<p>然而，仅仅这样还是觉得不够好<br>因为这种面条式调用还是让人很不爽，而且 then 方法里面虽然是按先后顺序来的，但是其本身还是异步的<br>看下面这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise( (resolve, reject) => {
    setTimeout(function(){
        resolve(222)
    }, 1000)
})
console.log(111)
promise.then( res => {
    console.log(res)
})
console.log(333)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        resolve(<span class="hljs-number">222</span>)
    }, <span class="hljs-number">1000</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>)
promise.then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>)</code></pre>
<p>打印结果依然还是 111 =&gt; 333 =&gt; 222, 并不是我们想象的 111 =&gt; 222 =&gt; 333<br>依然不适合单线程的思维模式。所以下一个解决方案 又出现了</p>
</li>
</ul>
</li>
<li>
<p><strong><code>async/await</code></strong><br>这是ES7的语法，当然，在现在这种工程化的时代，基本babel编译之后也都是能在项目中引用的</p>
<ul>
<li>
<p>基本用法跟规则<br>async 表示这是一个async函数，<br>await只能用在这个函数里面。后面应该跟着是 Promise 对象， 不跟的话也没关系， 但是await就不会在这里等待了<br>await 表示在这里等待promise返回结果</p>
<p>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fn = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(function(){
            resolve(222)
        }, 1000)
    })
}
(async function(){
    console.log(111)
    let data = await fn()
    console.log(data)
    console.log(333)
})()
// 是不是返回 111 => 222 => 333 了呢

// 我们来试下返回别的东西， 不返回 promise
const fn = () => {
    setTimeout(function(){
        console.log(222)
    }, 1000)
}
(async function(){
    console.log(111)
    let data = await fn()
    console.log(data)
    console.log(333)
})()
// 打印结果： 111 => undefined => 333 => 222
// 当我们不是在await 关键字后面返回的不是 promise 对象时， 它就不会在原地等待 promise执行完再执行， 而是向正常的JS一样执行，把异步任务跳过去" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(<span class="hljs-number">222</span>)
        }, <span class="hljs-number">1000</span>)
    })
}
(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>)
    <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> fn()
    <span class="hljs-built_in">console</span>.log(data)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>)
})()
<span class="hljs-comment">// 是不是返回 111 =&gt; 222 =&gt; 333 了呢</span>

<span class="hljs-comment">// 我们来试下返回别的东西， 不返回 promise</span>
<span class="hljs-keyword">const</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">222</span>)
    }, <span class="hljs-number">1000</span>)
}
(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111</span>)
    <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> fn()
    <span class="hljs-built_in">console</span>.log(data)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">333</span>)
})()
<span class="hljs-comment">// 打印结果： 111 =&gt; undefined =&gt; 333 =&gt; 222</span>
<span class="hljs-comment">// 当我们不是在await 关键字后面返回的不是 promise 对象时， 它就不会在原地等待 promise执行完再执行， 而是向正常的JS一样执行，把异步任务跳过去</span></code></pre>
</li>
<li>
<p><strong><code>await</code> 关键字必须包裹在 <code>async</code> 函数里面，而且<code>async</code> 函数必须是它的父函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fn = () => {
    let promise = new Promise( (resolve, reject) => {
        setTimeout(function(){
            resolve(222)
        }, 1000)
    })
}

// 这样是不行的，会报错，因为的await关键字的父函数不是 async 函数
const grand = async () => {
    return function parent() {
        let data = await fn()
    }
}

// 这样才行，因为await 的父函数 是一个 async 函数
const grand = () => {
    return async function parent() {
        let data = await fn()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(<span class="hljs-number">222</span>)
        }, <span class="hljs-number">1000</span>)
    })
}

<span class="hljs-comment">// 这样是不行的，会报错，因为的await关键字的父函数不是 async 函数</span>
<span class="hljs-keyword">const</span> grand = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parent</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> fn()
    }
}

<span class="hljs-comment">// 这样才行，因为await 的父函数 是一个 async 函数</span>
<span class="hljs-keyword">const</span> grand = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parent</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> fn()
    }
}</code></pre>
</li>
</ul>
</li>
</ol>
<h2 id="articleHeader7">7. 柯里化 与 反柯里化</h2>
<ul>
<li>
<p>柯里化<br>  函数柯里化就是对高阶函数的降阶处理。<br>  柯里化简单的说,就是把 n 个参数的函数,变成只接受一个参数的 n 个函数<br><code>function(arg1,arg2)</code>变成<code>function(arg1)(arg2)</code><br><code>function(arg1,arg2,arg3)</code>变成<code>function(arg1)(arg2)(arg3)</code><br><code>function(arg1,arg2,arg3,arg4)</code>变成<code>function(arg1)(arg2)(arg3)(arg4)</code></p>
<ul>
<li>
<p>柯里化有什么作用</p>
<ol>
<li>参数复用；</li>
<li>提前返回；</li>
<li>延迟计算/运行</li>
</ol>
</li>
<li>
<p>例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//求和
function add (a, b, c) {
    return a + b + c
}
add(1,2,3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//求和</span>
function add (<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">b</span>, c) {
    return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span> + c
}
<span class="hljs-function"><span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)</span></span></code></pre>
<p>如果我只改变 c 的值,在求和<br><code>add(1,2,4)</code> 是不是得多出重新计算  a + b 的部分<br>  我们是不是可以提前返回a+b的值， 然后只传入 c 的值进行计算就行了<br>  修改一下方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add (a, b) {
    return function (c) {
        return a + b + c
    }
}
var sum = add(1, 2)
sum(3)
sum(4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function add (<span class="hljs-selector-tag">a</span>, b) {
    return function (c) {
        return <span class="hljs-selector-tag">a</span> + <span class="hljs-selector-tag">b</span> + c
    }
}
<span class="hljs-selector-tag">var</span> sum = add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-function"><span class="hljs-title">sum</span><span class="hljs-params">(<span class="hljs-number">3</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">sum</span><span class="hljs-params">(<span class="hljs-number">4</span>)</span></span></code></pre>
<p>在此基础上我们在做下修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add (a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> <span class="hljs-params">(a)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(b)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(c)</span> </span>{
            <span class="hljs-keyword">return</span> a + b + c
        }
    }
}</code></pre>
<p>这样我们是不是可以随时复用某个参数，并且控制在某个阶段提前返回</p>
<p>还有一个经典的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent(&quot;on&quot; + type, function(e) {
            fn.call(el, e);
        });
    } 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, type, fn, capture)</span></span> {
    <span class="hljs-keyword">if</span> (window.addEventListener) {
        el.addEventListener(<span class="hljs-keyword">type</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span> {
            fn.<span class="hljs-keyword">call</span>(el, e);
        }, capture);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (window.attachEvent) {
        el.attachEvent(<span class="hljs-string">"on"</span> + <span class="hljs-keyword">type</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span> {
            fn.<span class="hljs-keyword">call</span>(el, e);
        });
    } 
};</code></pre>
<p>我们每次调用事件时，都需要判断兼容问题， 但我们运用柯里化的方式就只要判断一次就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent(&quot;on&quot; + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var addEvent = (<span class="hljs-name">function</span>(){
    if (<span class="hljs-name">window</span>.addEventListener) {
        return function(<span class="hljs-name">el</span>, sType, fn, capture) {
            el.addEventListener(<span class="hljs-name">sType</span>, function(<span class="hljs-name">e</span>) {
                fn.call(<span class="hljs-name">el</span>, e)<span class="hljs-comment">;</span>
            }, (<span class="hljs-name">capture</span>))<span class="hljs-comment">;</span>
        }<span class="hljs-comment">;</span>
    } else if (<span class="hljs-name">window</span>.attachEvent) {
        return function(<span class="hljs-name">el</span>, sType, fn, capture) {
            el.attachEvent(<span class="hljs-string">"on"</span> + sType, function(<span class="hljs-name">e</span>) {
                fn.call(<span class="hljs-name">el</span>, e)<span class="hljs-comment">;</span>
            })<span class="hljs-comment">;</span>
        }<span class="hljs-comment">;</span>
    }
})()<span class="hljs-comment">;</span></code></pre>
<p>还有一个作用就是延迟计算</p>
<p>小明每天都会花一部分钱吃饭<br>  小明想知道它5天之后总共会花费多少钱</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var total = 0
var fn = function(num) {
    total += num
}
fn(50)
fn(70)
fn(60)
fn(100)
fn(80)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> total = <span class="hljs-number">0</span>
<span class="hljs-selector-tag">var</span> fn = function(num) {
    total += num
}
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">50</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">70</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">60</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">100</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">80</span>)</span></span></code></pre>
<p>这样我们便能算出它总共花了都少钱</p>
<p>但是小明又突然想知道 如果他每天花费的的钱翻一倍 会产生多少钱<br>  于是我们是不是得改下 上面的 函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = function(num) {
    total += num*2
}
fn(50)
fn(70)
fn(60)
fn(100)
fn(80)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> fn = function(num) {
    total += num*<span class="hljs-number">2</span>
}
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">50</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">70</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">60</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">100</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-number">80</span>)</span></span></code></pre>
<p>那我们是不是有什么办法，先把这些数 存起来，到最后在进行计算<br>  我们接着来封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var curry = function(fn) {
    var args = []
    return function() {
        if (arguments.length === 0) {
            return fn.apply(null, args)
        }else{
            args = args.concat([].slice.call(arguments))
            return curry.call(null, fn, args)
        }
    }
}

var curryFn = function() {
    var args = [].slice.call(arguments),
        total = 0
    for (var i = 0; i < args.length; i++) {
        total += args[i]
    }
    return total
}
var fn = curry(curryFn)
fn(50)
fn(70)
fn(60)
fn(100)
fn(80)

fn() //不传参数的时候进行计算" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> args = []
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
        }<span class="hljs-keyword">else</span>{
            args = args.concat([].slice.call(<span class="hljs-built_in">arguments</span>))
            <span class="hljs-keyword">return</span> curry.call(<span class="hljs-literal">null</span>, fn, args)
        }
    }
}

<span class="hljs-keyword">var</span> curryFn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>),
        total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; args.length; i++) {
        total += args[i]
    }
    <span class="hljs-keyword">return</span> total
}
<span class="hljs-keyword">var</span> fn = curry(curryFn)
fn(<span class="hljs-number">50</span>)
fn(<span class="hljs-number">70</span>)
fn(<span class="hljs-number">60</span>)
fn(<span class="hljs-number">100</span>)
fn(<span class="hljs-number">80</span>)

fn() <span class="hljs-comment">//不传参数的时候进行计算</span></code></pre>
<p>这样我们只有最后的时候才进行计算。<br>  而且只需要修改 curryFn 里面的计算方法就行</p>
<p>我们整理下上面的方法封装完整的柯里化函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var curry = function (fn, length) {
    length = length || fn.length;
    var sub_curry = function (f) {
        var args = [].slice.call(arguments, 1);
        return function () {
            return f.apply(null, args.concat([].slice.call(arguments)))
        }
    }
    return function () {
        var args = [].slice.call(arguments);
        if (length > args.length) {
            var newArgs = [fn].concat(args);
            return curry(sub_curry.apply(null,newArgs), length - args.length)
        }else{
            fn.apply(null,arguments)
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> curry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, length</span>) </span>{
    length = length || fn.length;
    <span class="hljs-keyword">var</span> sub_curry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">f</span>) </span>{
        <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> f.apply(<span class="hljs-literal">null</span>, args.concat([].slice.call(<span class="hljs-built_in">arguments</span>)))
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">if</span> (length &gt; args.length) {
            <span class="hljs-keyword">var</span> newArgs = [fn].concat(args);
            <span class="hljs-keyword">return</span> curry(sub_curry.apply(<span class="hljs-literal">null</span>,newArgs), length - args.length)
        }<span class="hljs-keyword">else</span>{
            fn.apply(<span class="hljs-literal">null</span>,<span class="hljs-built_in">arguments</span>)
        }
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.
var fn  = curry( function(a,b,c){
    console.log(a, b, c)
})
fn('a')('b')('c')

// 2.
fn1 = curry(function(){
    console.log(arguments)
}, 3)
fn1('a')('b')('c')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 1.</span>
<span class="hljs-selector-tag">var</span> fn  = curry( function(<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">b</span>,c){
    console.log(<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">b</span>, c)
})
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">(<span class="hljs-string">'a'</span>)</span><span class="hljs-params">(<span class="hljs-string">'b'</span>)</span><span class="hljs-params">(<span class="hljs-string">'c'</span>)</span></span>

<span class="hljs-comment">// 2.</span>
fn1 = curry(function(){
    console.log(arguments)
}, <span class="hljs-number">3</span>)
<span class="hljs-function"><span class="hljs-title">fn1</span><span class="hljs-params">(<span class="hljs-string">'a'</span>)</span><span class="hljs-params">(<span class="hljs-string">'b'</span>)</span><span class="hljs-params">(<span class="hljs-string">'c'</span>)</span></span></code></pre>
</li>
</ul>
</li>
<li>
<p>反柯里化<br>  反柯里化的作用在与扩大函数的适用性，使本来作为特定对象所拥有的功能的函数可以被任意对象所用.</p>
<p>被任意对象使用？ 是不是想到了用call, apply 设置this指向</p>
<ul>
<li>
<p>通过 call/apply  被任意对象所用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    a: 1,
    fn: function (b) {
        return this.a + b
    }
}
obj.fn(2) // 3
var obj1 = {a:4}
obj.fn.call(obj1, 2) // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> obj = {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">1</span>,
    fn: function (b) {
        return this<span class="hljs-selector-class">.a</span> + <span class="hljs-selector-tag">b</span>
    }
}
obj.fn(<span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span>
<span class="hljs-selector-tag">var</span> obj1 = {<span class="hljs-selector-tag">a</span>:<span class="hljs-number">4</span>}
obj<span class="hljs-selector-class">.fn</span><span class="hljs-selector-class">.call</span>(obj1, <span class="hljs-number">2</span>) <span class="hljs-comment">// 6</span></code></pre>
</li>
<li>
<p>反柯里化版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uncurrying= function (fn) {
    return function () {
        var context=[].shift.call(arguments);
        return fn.apply(context,arguments);
    }
}
// const uncurrying = fn => (...args) => Function.prototype.call.apply(fn,args) // 简洁版
var f = function (b) {
    return this.a + b
}
var uncurry = uncurrying(f)
var obj = {a:1},
    obj1 = {a:4}
uncurry(obj, 2) // 3
uncurry(obj1, 2) // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> uncurrying= <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> context=[].shift.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> fn.apply(context,<span class="hljs-built_in">arguments</span>);
    }
}
<span class="hljs-comment">// const uncurrying = fn =&gt; (...args) =&gt; Function.prototype.call.apply(fn,args) // 简洁版</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">b</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + b
}
<span class="hljs-keyword">var</span> uncurry = uncurrying(f)
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>},
    obj1 = {<span class="hljs-attr">a</span>:<span class="hljs-number">4</span>}
uncurry(obj, <span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span>
uncurry(obj1, <span class="hljs-number">2</span>) <span class="hljs-comment">// 3</span></code></pre>
</li>
</ul>
</li>
</ul>
<p><strong>相信大家已经看出区别了,这丫的就相当于一个外部的call方法</strong></p>
<h2 id="articleHeader8">总结</h2>
<p>上面很多只是自己的部分理解，不一定准确。如果有不同理解，谢谢指出。</p>
<p><strong><a href="http://dzblog.cn/article/5a7b12a61ad1ff0e1bbe0b97" rel="nofollow noreferrer" target="_blank">博客地址</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 总结（那些剪不断理还乱的关系）

## 原文链接
[https://segmentfault.com/a/1190000013202220](https://segmentfault.com/a/1190000013202220)

