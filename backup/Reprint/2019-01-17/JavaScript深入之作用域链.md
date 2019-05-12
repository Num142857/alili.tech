---
title: 'JavaScript深入之作用域链' 
date: 2019-01-17 2:30:25
hidden: true
slug: i5dmpw9q2r8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第五篇，讲述作用链的创建过程，最后结合着变量对象，执行上下文栈，让我们一起捋一捋函数创建和执行的过程中到底发生了什么？</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a>中讲到，当JavaScript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。</p>
<p>对于每个执行上下文，都有三个重要属性：</p>
<ul>
<li><p>变量对象(Variable object，VO)</p></li>
<li><p>作用域链(Scope chain)</p></li>
<li><p>this</p></li>
</ul>
<p>今天重点讲讲作用域链。</p>
<h2 id="articleHeader1">作用域链</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">《JavaScript深入之变量对象》</a>中讲到，当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。</p>
<p>下面，让我们以一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的。</p>
<h2 id="articleHeader2">函数创建</h2>
<p>在<a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">《JavaScript深入之词法作用域和动态作用域》</a>中讲到，函数的作用域在函数定义的时候就决定了。</p>
<p>这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
function foo() {
    function bar() {
        ...
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        ...
    }
}
</code></pre>
<p>函数创建时，各自的[[scope]]为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
</code></pre>
<h2 id="articleHeader3">函数激活</h2>
<p>当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。</p>
<p>这时候执行上下文的作用域链，我们命名为 Scope：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Scope = [AO].concat([[Scope]]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
Scope = [AO].concat([[Scope]]);
</code></pre>
<p>至此，作用域链创建完毕。</p>
<h2 id="articleHeader4">捋一捋</h2>
<p>以下面的例子为例，结合着之前讲的变量对象和执行上下文栈，我们来总结一下函数执行上下文中作用域链和变量对象的创建过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = &quot;global scope&quot;;
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> scope = <span class="hljs-string">"global scope"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkscope</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> scope2 = <span class="hljs-string">'local scope'</span>;
    <span class="hljs-keyword">return</span> scope2;
}
checkscope();</code></pre>
<p>执行过程如下：</p>
<p>1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkscope.[[scope]] = [
    globalContext.VO
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">checkscope.[[scope]] = [
    globalContext.VO
];</code></pre>
<p>2.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECStack = [
    checkscopeContext,
    globalContext
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ECStack = [
    checkscopeContext,
    globalContext
];</code></pre>
<p>3.checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkscopeContext = {
    Scope: checkscope.[[scope]],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">checkscopeContext = {
    <span class="hljs-attr">Scope</span>: checkscope.[[scope]],
}</code></pre>
<p>4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">checkscopeContext = {
    <span class="hljs-attr">AO</span>: {
        <span class="hljs-attr">arguments</span>: {
            <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">scope2</span>: <span class="hljs-literal">undefined</span>
    }
}</code></pre>
<p>5.第三步：将活动对象压入 checkscope 作用域链顶端</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">checkscopeContext = {
    <span class="hljs-attr">AO</span>: {
        <span class="hljs-attr">arguments</span>: {
            <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">scope2</span>: <span class="hljs-literal">undefined</span>
    },
    <span class="hljs-attr">Scope</span>: [AO, [[Scope]]]
}</code></pre>
<p>6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">checkscopeContext = {
    <span class="hljs-attr">AO</span>: {
        <span class="hljs-attr">arguments</span>: {
            <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">scope2</span>: <span class="hljs-string">'local scope'</span>
    },
    <span class="hljs-attr">Scope</span>: [AO, [[Scope]]]
}</code></pre>
<p>7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ECStack = [
    globalContext
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ECStack = [
    globalContext
];</code></pre>
<h2 id="articleHeader5">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/7" rel="nofollow noreferrer" target="_blank">《JavaScript深入之从ECMAScript规范解读this》</a></p>
<h2 id="articleHeader6">本文相关链接</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/3" rel="nofollow noreferrer" target="_blank">《JavaScript深入之词法作用域和动态作用域》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a></p>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">《JavaScript深入之变量对象》</a></p>
<h2 id="articleHeader7">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之作用域链

## 原文链接
[https://segmentfault.com/a/1190000009035308](https://segmentfault.com/a/1190000009035308)

