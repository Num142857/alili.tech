---
title: 'JavaScript this 从此不再疑惑' 
date: 2019-01-09 2:30:12
hidden: true
slug: ukh7u7w7z0c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>1. 问题引入</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A() {}
A.prototype.fna = function() {
    console.log(this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{}
A.prototype.fna = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}</code></pre>
<p><strong>我的问题是 <code>fna</code> 的 <code>this</code> 是指向哪里的？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new A();
a.fna();  // A {}

var fnt = a.fna;
fnt();  // window {...}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> a = new A();
a.fna();  // A {}

<span class="hljs-keyword">var</span> fnt = a.fna;
fnt();  // window <span class="hljs-meta">{...}</span>
</code></pre>
<p><strong>再看我们经常遇到的情形</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A() {
    this.name = 'A';
}

A.prototype.fna = function() {
    return this.name;
}

function sayName(fn) {
    console.log(fn());
}

var a = new A();
sayName(a.fna); //undefined
sayName(a.fna.bind(a));  //A
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'A'</span>;
}

A.prototype.fna = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-built_in">console</span>.log(fn());
}

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A();
sayName(a.fna); <span class="hljs-comment">//undefined</span>
sayName(a.fna.bind(a));  <span class="hljs-comment">//A</span>
</code></pre>
<p><strong>这里就是我们平时在写代码的时候为什么要调用 <code>bind</code> 函数来绑定上下文</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A() {
    this.fna = function() {
        console.log(this);
    }
}

A.prototype.getFna = function() {
    return this.fna;
}

function sayContext(fn) {
    fn();
}

var a = new A();
var fna = a.getFna();
sayContext(fna);  //window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.fna = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    }
}

A.prototype.getFna = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.fna;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayContext</span>(<span class="hljs-params">fn</span>) </span>{
    fn();
}

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> A();
<span class="hljs-keyword">var</span> fna = a.getFna();
sayContext(fna);  <span class="hljs-comment">//window</span></code></pre>
<p>为什么会有以上这种情况呢，在 <code>java</code> 中 <code>this</code> 是始终指向调用对象的。是的，始终指向调用对象，调用对象，这个很重要，<code>java</code> 的静态成员是没有 <code>this</code> 的概念的。在 <code>javascript</code> 中 <code>this</code> 只和函数的执行环境有关。只有三种情况，在浏览中 window、调用对象、严格模式下的undefined，对应我们开发者来说能接触到的就是以上三者，所以我们可以理解为 函数的执行环境就是以上三者。</p>
<h2 id="articleHeader1"><strong>2. 确定 <code>this</code> 指向</strong></h2>
<p>我们如何确定 <code>this</code> 的指向呢，有很多文章介绍 <code>this</code> 确定指向，方式也有很多种，而我是根据函数的调用形势去判断的，有以下两个判断标准。</p>
<p><strong>1 如果函数的最终调用形式是 <code>fn();</code> 那么在非严格模式下 <code>this</code> 指向 <code>window</code> 对象，在严格模式下指向 <code>undefined</code></strong><br><strong>2 如果是通过对象调用 <code>o.fn();</code> 这种形式 <code>this</code> 指向对象 <code>o</code></strong></p>
<p><strong>是的就这两个标准，就这么简单。</strong></p>
<h2 id="articleHeader2"><strong>3. 通过 <code>call</code> 、<code>apply</code>、<code>bind</code> 深入理解 <code>this</code></strong></h2>
<p><strong>函数调用原型</strong></p>
<p><code>fn.call(thisArg, arg1, arg2, ...)</code><br><code>fn.apply(thisArg, [argsArray])</code><br><code>fn.bind(thisArg[, arg1[, arg2[, ...]]])</code></p>
<p><strong>上面这三个函数都是用来改变函数的 <code>this</code> 指向的</strong><br><strong>1 <code>call</code> 第一个参数是 <code>fn</code> 中 <code>this</code> 的期望指向，值可以是 <code>对象</code> 或者 <code>undefined</code>，后面的参数是要传递  给 <code>fn</code> 的参数列表</strong></p>
<p><strong>2 <code>apply</code> 第一个参数是 <code>fn</code> 中 <code>this</code> 的期望指向，值可以是 <code>对象</code> 或者 <code>undefined</code>，后面的值是 <code>fn</code> 的  参数，是一个数组</strong></p>
<p><code>call</code> 和<code>apply</code> 功能相同，唯一不同的是选择将参数以 <code>参数列表</code> 传入或者以 <code>数组</code> 传入，都可以，可以互换<br>使用。调用者两个函数会立即执行 fn，这里是立即执行</p>
<p><strong>3 <code>bind</code> 第一个参数是 <code>fn</code> 中 <code>this</code> 的期望指向，值可以是 <code>对象</code> 或者 <code>undefined</code>，后面的参数是要传递  给 <code>fn</code> 的参数列表</strong></p>
<p>调用 <code>bind</code> 函数会返回一个函数，这个函数是 <code>fn</code> 的包装，和 <code>fn</code> 的唯一区别是绑定了 <code>this</code>，即 <code>this</code>指向明确。所以 <code>bind</code> 和 <code>call</code>、<code>apply</code>，的区别是 <code>bind</code> 返回一个 <code>this</code> 明确的新函数，<code>call</code> 和 <code>apply</code>立即执行了 <code>fn</code>。</p>
<p><strong>到这里我想 <code>javascript</code> 的 <code>this</code> 已经说的很清楚了。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript this 从此不再疑惑

## 原文链接
[https://segmentfault.com/a/1190000010109690](https://segmentfault.com/a/1190000010109690)

