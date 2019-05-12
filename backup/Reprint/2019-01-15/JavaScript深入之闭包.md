---
title: 'JavaScript深入之闭包' 
date: 2019-01-15 2:30:12
hidden: true
slug: 2rprsjoijo6
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第八篇，介绍理论上的闭包和实践上的闭包，以及从作用域链的角度解析经典的闭包题。</p></blockquote>
<h2 id="articleHeader0">定义</h2>
<p>MDN 对闭包的定义为：</p>
<blockquote><p>闭包是指那些能够访问自由变量的函数。</p></blockquote>
<p>那什么是自由变量呢？</p>
<blockquote><p>自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。</p></blockquote>
<p>由此，我们可以看出闭包共有两部分组成：</p>
<blockquote><p>闭包 = 函数 + 函数能够访问的自由变量</p></blockquote>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;

function foo() {
    console.log(a);
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(a);
}

foo();</code></pre>
<p>foo 函数可以访问变量 a，但是 a 既不是 foo 函数的局部变量，也不是 foo 函数的参数，所以 a 就是自由变量。</p>
<p>那么，函数 foo + foo 函数访问的自由变量 a 不就是构成了一个闭包嘛……</p>
<p>还真是这样的！</p>
<p>所以在《JavaScript权威指南》中就讲到：从技术的角度讲，所有的JavaScript函数都是闭包。</p>
<p>咦，这怎么跟我们平时看到的讲到的闭包不一样呢！？</p>
<p>别着急，这是理论上的闭包，其实还有一个实践角度上的闭包，让我们看看汤姆大叔翻译的关于闭包的文章中的定义：</p>
<p>ECMAScript中，闭包指的是：</p>
<ol>
<li><p>从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。</p></li>
<li>
<p>从实践角度：以下函数才算是闭包：</p>
<ol>
<li><p>即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）</p></li>
<li><p>在代码中引用了自由变量</p></li>
</ol>
</li>
</ol>
<p>接下来就来讲讲实践上的闭包。</p>
<h2 id="articleHeader1">分析</h2>
<p>让我们先写个例子，例子依然是来自《JavaScript权威指南》，稍微做点改动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global scope&quot;;
function checkscope(){
    var scope = &quot;local scope&quot;;
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global scope"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local scope"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> scope;
    }
    <span class="hljs-keyword">return</span> f;
}

<span class="hljs-keyword">var</span> foo = checkscope();
foo();</code></pre>
<p>首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况。</p>
<p>另一个与这段代码相似的例子，在<a href="https://github.com/mqyqingfeng/Blog/issues/8" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文》</a>中有着非常详细的分析。如果看不懂以下的执行过程，建议先阅读这篇文章。</p>
<p>这里直接给出简要的执行过程：</p>
<ol>
<li><p>进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈</p></li>
<li><p>全局执行上下文初始化</p></li>
<li><p>执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈</p></li>
<li><p>checkscope 执行上下文初始化，创建变量对象、作用域链、this等</p></li>
<li><p>checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出</p></li>
<li><p>执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈</p></li>
<li><p>f 执行上下文初始化，创建变量对象、作用域链、this等</p></li>
<li><p>f 函数执行完毕，f 函数上下文从执行上下文栈中弹出</p></li>
</ol>
<p>了解到这个过程，我们应该思考一个问题，那就是：</p>
<p>当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？</p>
<p>以上的代码，要是转换成 PHP，就会报错，因为在 PHP 中，f 函数只能读取到自己作用域和全局作用域里的值，所以读不到 checkscope 下的 scope 值。(这段我问的PHP同事……)</p>
<p>然而 JavaScript 却是可以的！</p>
<p>当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fContext = {
    <span class="hljs-attr">Scope</span>: [AO, checkscopeContext.AO, globalContext.VO],
}</code></pre>
<p>对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。</p>
<p>所以，让我们再看一遍实践角度上闭包的定义：</p>
<ol>
<li><p>即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）</p></li>
<li><p>在代码中引用了自由变量</p></li>
</ol>
<p>在这里再补充一个《JavaScript权威指南》英文原版对闭包的定义:</p>
<blockquote><p>This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature.</p></blockquote>
<p>闭包在计算机科学中也只是一个普通的概念，大家不要去想得太复杂。</p>
<h2 id="articleHeader2">必刷题</h2>
<p>接下来，看这道刷题必刷，面试必考的闭包题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = [];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
  data[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
  };
}

data[<span class="hljs-number">0</span>]();
data[<span class="hljs-number">1</span>]();
data[<span class="hljs-number">2</span>]();</code></pre>
<p>答案是都是 3，让我们分析一下原因：</p>
<p>当执行到 data[0] 函数之前，此时全局上下文的 VO 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">globalContext = {
    <span class="hljs-attr">VO</span>: {
        <span class="hljs-attr">data</span>: [...],
        <span class="hljs-attr">i</span>: <span class="hljs-number">3</span>
    }
}</code></pre>
<p>当执行 data[0] 函数的时候，data[0] 函数的作用域链为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data[0]Context = {
    Scope: [AO, globalContext.VO]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">data[<span class="hljs-number">0</span>]Context = {
    <span class="hljs-attr">Scope</span>: [AO, globalContext.VO]
}</code></pre>
<p>data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。</p>
<p>data[1] 和 data[2] 是一样的道理。</p>
<p>所以让我们改成闭包看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = [];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
  data[i] = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(i);
        }
  })(i);
}

data[<span class="hljs-number">0</span>]();
data[<span class="hljs-number">1</span>]();
data[<span class="hljs-number">2</span>]();</code></pre>
<p>当执行到 data[0] 函数之前，此时全局上下文的 VO 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">globalContext = {
    <span class="hljs-attr">VO</span>: {
        <span class="hljs-attr">data</span>: [...],
        <span class="hljs-attr">i</span>: <span class="hljs-number">3</span>
    }
}</code></pre>
<p>跟没改之前一模一样。</p>
<p>当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">data[<span class="hljs-number">0</span>]Context = {
    <span class="hljs-attr">Scope</span>: [AO, 匿名函数Context.AO globalContext.VO]
}</code></pre>
<p>匿名函数执行上下文的 AO 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">匿名函数Context = {
    <span class="hljs-attr">AO</span>: {
        <span class="hljs-attr">arguments</span>: {
            <span class="hljs-number">0</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
        },
        <span class="hljs-attr">i</span>: <span class="hljs-number">0</span>
    }
}</code></pre>
<p>data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是 0。</p>
<p>data[1] 和 data[2] 是一样的道理。</p>
<h2 id="articleHeader3">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/10" rel="nofollow noreferrer" target="_blank">JavaScript深入之参数按值传递</a></p>
<h2 id="articleHeader4">相关链接</h2>
<p>如果想了解执行上下文的具体变化，不妨循序渐进，阅读这六篇：</p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">《JavaScript深入之词法作用域和动态作用域》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">《JavaScript深入之变量对象》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/6" rel="nofollow noreferrer" target="_blank">《JavaScript深入之作用域链》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/7" rel="nofollow noreferrer" target="_blank">《JavaScript深入之从ECMAScript规范解读this》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/8" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文》</a></p>
<h2 id="articleHeader5">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之闭包

## 原文链接
[https://segmentfault.com/a/1190000009215716](https://segmentfault.com/a/1190000009215716)

