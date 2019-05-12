---
title: 'JavaScript深入之执行上下文栈' 
date: 2019-01-17 2:30:25
hidden: true
slug: de88fxieso
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第三篇，讲解执行上下文栈的是如何执行的，也回答了第二篇中的略难的思考题。</p></blockquote>
<h2 id="articleHeader0">顺序执行？</h2>
<p>如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function () {

    console.log('foo1');

}

foo();  // foo1

var foo = function () {

    console.log('foo2');

}

foo(); // foo2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo1'</span>);

}

foo();  <span class="hljs-comment">// foo1</span>

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo2'</span>);

}

foo(); <span class="hljs-comment">// foo2</span></code></pre>
<p>然而去看这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function foo() {

    console.log('foo1');

}

foo();  // foo2

function foo() {

    console.log('foo2');

}

foo(); // foo2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo1'</span>);

}

foo();  <span class="hljs-comment">// foo2</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo2'</span>);

}

foo(); <span class="hljs-comment">// foo2</span>
</code></pre>
<p>打印的结果却是两个 <code>foo2</code>。</p>
<p>刷过面试题的都知道这是因为 JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。</p>
<p>但是本文真正想让大家思考的是：这个“一段一段”中的“段”究竟是怎么划分的呢？</p>
<p>到底JavaScript引擎遇到一段怎样的代码时才会做“准备工作”呢？</p>
<h2 id="articleHeader1">可执行代码</h2>
<p>这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？</p>
<p>其实很简单，就三种，全局代码、函数代码、eval代码。</p>
<p>举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution contexts)"。</p>
<h2 id="articleHeader2">执行上下文栈</h2>
<p>接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？</p>
<p>所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文</p>
<p>为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ECStack = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">    ECStack = [];</code></pre>
<p>试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以 ECStack 最底部永远有个 globalContext：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ECStack = [
        globalContext
    ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    ECStack = [
        globalContext
    ];</code></pre>
<p>现在 JavaScript 遇到下面的这段代码了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun3</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fun3'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun2</span>(<span class="hljs-params"></span>) </span>{
    fun3();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun1</span>(<span class="hljs-params"></span>) </span>{
    fun2();
}

fun1();</code></pre>
<p>当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 伪代码</span>

<span class="hljs-comment">// fun1()</span>
ECStack.push(&lt;fun1&gt; functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(&lt;fun2&gt; functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(&lt;fun3&gt; functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext</code></pre>
<h2 id="articleHeader3">解答思考题</h2>
<p>好啦，现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章<a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">《JavaScript深入之词法作用域和动态作用域》</a>最后的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global scope&quot;;
function checkscope(){
    var scope = &quot;local scope&quot;;
    function f(){
        return scope;
    }
    return f();
}
checkscope();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global scope"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> scope = <span class="hljs-string">"local scope"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> scope;
    }
    <span class="hljs-keyword">return</span> f();
}
checkscope();</code></pre>
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
checkscope()();" title="" data-original-title="复制"></span>
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
checkscope()();</code></pre>
<p>两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？</p>
<p>答案就是执行上下文栈的变化不一样。</p>
<p>让我们模拟第一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ECStack.push(&lt;checkscope&gt; functionContext);
ECStack.push(&lt;f&gt; functionContext);
ECStack.pop();
ECStack.pop();</code></pre>
<p>让我们模拟第二段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ECStack.push(&lt;checkscope&gt; functionContext);
ECStack.pop();
ECStack.push(&lt;f&gt; functionContext);
ECStack.pop();</code></pre>
<p>是不是有些不同呢？</p>
<p>当然了，这样概括的回答执行上下文栈的变化不同，是不是依然有一种意犹未尽的感觉呢，为了更详细讲解两个函数执行上的区别，我们需要探究一下执行上下文到底包含了哪些内容，所以欢迎阅读下一篇《JavaScript深入之变量对象》。</p>
<h2 id="articleHeader4">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">《JavaScript深入之变量对象》</a></p>
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
JavaScript深入之执行上下文栈

## 原文链接
[https://segmentfault.com/a/1190000009006005](https://segmentfault.com/a/1190000009006005)

