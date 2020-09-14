---
title: '【前端工程师手册】JavaScript之作用域' 
date: 2018-12-01 2:30:12
hidden: true
slug: ai3pem6wrxi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是作用域</h2>
<p>来一段《你不知道的JavaScript-上卷》中的原话：</p>
<blockquote>几乎所有编程语言最基本的功能之一，就是能够储存变量当中的值，并且能在之后对这个 值进行访问或修改，这些变量住在哪里?换句话说，它们储存在哪里?最重要的是，程序需要时如何找到它们?这些问题说明需要一套设计良好的规则来存储变量，并且之后可以方便地找到这些变量。这套规则被称为作用域</blockquote>
<p>总之就是作用域就是一套规则，这个规则规定了程序如何去找到变量</p>
<h2 id="articleHeader1">词法作用域</h2>
<p>先看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func1() {
    console.log(index)
}

function func2() {
    var index = 10
    func1()
}

var index = 100
func2()    // 100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(index)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">10</span>
    func1()
}

<span class="hljs-keyword">var</span> index = <span class="hljs-number">100</span>
func2()    <span class="hljs-comment">// 100</span></code></pre>
<p>为啥是100而不是10呢？？？<br>因为JavaScript是<strong>词法作用域</strong><br>词法作用域简单地说就是：函数的作用域在声明的时候就决定好了。和词法作用域相对的是动态作用域，动态作用域关注函数从何处调用<br>上面的代码中，声明func1时，它就处于全局作用域中，所以index就是100，即使执行func1时也是。</p>
<h2 id="articleHeader2">函数作用域和块作用域</h2>
<p>前面讲了JavaScript是词法作用域，那么什么时候会创建作用域呢？？？<br>JavaScript<strong>主要</strong>是基于函数级别的作用域，也就是每一个函数都会创建一个作用域。为什么说主要呢？因为with和try-catch语句也实现了块作用域，当然了用的很少。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flag = true;
if (flag) {
    var num = 10
}
console.log(num)    // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> flag = <span class="hljs-keyword">true</span>;
<span class="hljs-keyword">if</span> (flag) {
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">10</span>
}
console.log(<span class="hljs-built_in">num</span>)    <span class="hljs-comment">// 10</span></code></pre>
<p>如果有块级作用域的话，此时打印num应该报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function funcLevelScope() {
    var index = 10
}

console.log(index);    // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcLevelScope</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    var index = 10
}</span>

<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-keyword">index</span>)</span>;</span>    <span class="hljs-comment">// ReferenceError</span></code></pre>
<p>因为是函数级别的作用域，所以在函数外面访问不到函数内部的变量</p>
<h2 id="articleHeader3">如何模拟块作用域</h2>
<p>当然了，第一反应就是在代码外面加上包装函数不就行了，比如这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function scope() {
    var flag = true;
    if (flag) {
        var num = 10
    }
}
console.log(num)    // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (flag) {
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">10</span>
    }
}
<span class="hljs-built_in">console</span>.log(num)    <span class="hljs-comment">// ReferenceError</span></code></pre>
<p>但是此时的问题就是多了一个函数包装，且我们可以随意的去运行scope函数，这可能会造成不好的影响。<br>自执行函数解决了这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function scope() {
    var flag = true;
    if (flag) {
        var num = 10
    }
})()
scope()    // ReferenceError
console.log(num)    // ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scope</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (flag) {
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">10</span>
    }
})()
scope()    <span class="hljs-comment">// ReferenceError</span>
<span class="hljs-built_in">console</span>.log(num)    <span class="hljs-comment">// ReferenceError</span></code></pre>
<p>包装函数的声明以 (function... 而不仅是以 function... 开始。尽管看上去这并不 是一个很显眼的细节，但实际上却是非常重要的区别。函数会被当作函数表达式而不是一个标准的函数声明来处理。</p>
<h2 id="articleHeader4">作用域内声明提升</h2>
<p><strong>变量声明提升</strong><br>首先明确的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> x = <span class="hljs-number">10</span></code></pre>
<p>像这样一句代码可以分为声明和赋值两句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x
x = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>var <span class="hljs-keyword">x</span>
<span class="hljs-keyword">x</span> = <span class="hljs-number">10</span></code></pre>
<p>明确这个概念再继续学习</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(x)    // undefined
var x = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(x)    <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span></code></pre>
<p>为什么不直接报错呢？<br>因为上面的代码片段等于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x    // 声明提前
console.log(x)
x = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x    <span class="hljs-comment">// 声明提前</span>
<span class="hljs-built_in">console</span>.log(x)
x = <span class="hljs-number">10</span></code></pre>
<p>注意到变量的声明提前到了当前作用域的最前面<br><strong>函数声明提升</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hoist()    // hoist!
function hoist() {
    console.log(&quot;hoist!&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>hoist()    <span class="hljs-comment">// hoist!</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hoist</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hoist!"</span>)
}</code></pre>
<p>为啥函数会成功执行了，因为上面的代码片段相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hoist() {
    console.log(&quot;hoist!&quot;)
}
hoist()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hoist</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hoist!"</span>)
}
hoist()</code></pre>
<p>函数声明被提升到了作用域的最前面<br>那么函数表达式会被提升吗？？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hoist()    // TypeError
var hoist = function () {
    console.log(&quot;hoist&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>hoist()    <span class="hljs-comment">// TypeError</span>
<span class="hljs-keyword">var</span> hoist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hoist"</span>)
}</code></pre>
<p>因为这个相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hoist
hoist()    // TypeError
hoist = function () {
    console.log(&quot;hoist&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> hoist
hoist()    <span class="hljs-comment">// TypeError</span>
hoist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hoist"</span>)
}</code></pre>
<p><strong>变量声明提升和函数声明提升的优先级</strong><br>先说结论：函数会首先被提升，然后才是变量<br>看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(x)
var x = 10
function x() {
    console.log('func x')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(x)
<span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">x</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func x'</span>)
}</code></pre>
<p>显然此时打印的x是一个函数<br>这是因为上面的代码片段相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function x() {
    console.log('func x')
}
var x
console.log(x)    // f x(){...}
x = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function x() {
    console.log('func x')
}
<span class="hljs-keyword">var</span> x
console.log(x)    // f x()<span class="hljs-meta">{...}</span>
x = <span class="hljs-number">10</span></code></pre>
<p>所以打印的是函数</p>
<p>参考资料：<br><a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">JavaScript深入之词法作用域和动态作用域</a><br><a href="https://book.douban.com/subject_search?search_text=%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript&amp;cat=1001" rel="nofollow noreferrer" target="_blank">你不知道的JavaScript-上卷</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】JavaScript之作用域

## 原文链接
[https://segmentfault.com/a/1190000014801288](https://segmentfault.com/a/1190000014801288)

