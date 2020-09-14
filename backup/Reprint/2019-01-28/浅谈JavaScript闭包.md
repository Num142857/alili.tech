---
title: '浅谈JavaScript闭包' 
date: 2019-01-28 2:30:09
hidden: true
slug: rdf457whav
categories: [reprint]
---

{{< raw >}}

                    
<p>　　初学JavaScript闭包时，闭包这个概念在我眼里及其的神秘，也不知道这个东西在讲什么，尤其某些地方的闭包概念定义的非常抽象，属于那种本来你可能明白这个概念，看了反而又把你给绕糊涂了，学习了这么长时间的JavaScript，看了不少的书，对闭包的这个概念也算是稍稍有点体会的了，这里顺便推荐两本书《你不知道的JavaScript》和《JavaScript忍者秘籍》。<br>　　之前有次面试的时候，面试官让我写一个闭包的例子，我就写了下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 100;
(function(){
    console.log(a); //100
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">//100</span>
})();</code></pre>
<p>上面这个例子从广义上讲确实算是一个闭包的例子，但是实质上讲其实算是一个词法作用域的例子，其中涉及到RHS。但却不是一个很合适的讲述闭包的例子，后面看到一个例子算是一个比较好解释闭包的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
    var a = 100;
    function func(){
        console.log(a);
    }
    return func;
}

var func = fn();
func(); //100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">100</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(a);
    }
    <span class="hljs-keyword">return</span> func;
}

<span class="hljs-keyword">var</span> func = fn();
func(); <span class="hljs-comment">//100</span></code></pre>
<p>　　这个例子才算是一个比较好的闭包的概念。</p>
<blockquote><p>当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前的词法作用域之外的执行的。</p></blockquote>
<p>　　上面这个概念是引申自《你所不知道的JavaScript》中，变量<code>a</code>定义在函数<code>fn()</code>的作用域中，并且函数<code>fn()</code>中含有一个内部函数<code>func()</code>,内部函数<code>func()</code>持有对变量a的引用。在正常情况下，当函数<code>func</code>执行后就，内部的变量就会被垃圾回收机制所回收(比如变量<code>a</code>)。但是函数<code>fn()</code>返回了内部函数<code>func()</code>，内部函数<code>func()</code>会随时访问变量<code>a</code>,所以垃圾回收机制是不会回收函数<code>fn()</code>的内部作用域的，这就是闭包的含义。也就是</p>
<blockquote><p>函数在定义的词法作用域以外的地方被调用，闭包使得函数可以继续访问定义时的词法作用域。</p></blockquote>
<p>　　现在你对闭包的理解会不会有种恍然大悟的感觉呢？如果没有？那建议看看《你所不知道的JavaScript》和《JavaScript忍者秘籍》这两本书，里面对闭包讲解的都非常的棒。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈JavaScript闭包

## 原文链接
[https://segmentfault.com/a/1190000008063268](https://segmentfault.com/a/1190000008063268)

