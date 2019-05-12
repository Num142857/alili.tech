---
title: 'JavaScript深入之变量对象' 
date: 2019-01-17 2:30:25
hidden: true
slug: i9iu6ixgxob
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列第四篇，具体讲解执行上下文中的变量对象与活动对象。全局上下文下的变量对象是什么？函数上下文下的活动对象是如何分析和执行的？还有两个思考题帮你加深印象，快来看看吧！</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>在上篇<a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a>中讲到，当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。</p>
<p>对于每个执行上下文，都有三个重要属性：</p>
<ul>
<li><p>变量对象(Variable object，VO)</p></li>
<li><p>作用域链(Scope chain)</p></li>
<li><p>this</p></li>
</ul>
<p>今天重点讲讲创建变量对象的过程。</p>
<h2 id="articleHeader1">变量对象</h2>
<p>变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。</p>
<p>因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文下的变量对象和函数上下文下的变量对象。</p>
<h2 id="articleHeader2">全局上下文</h2>
<p>我们先了解一个概念，叫全局对象。在 <a href="http://www.w3school.com.cn/jsref/jsref_obj_global.asp" rel="nofollow noreferrer" target="_blank">W3C school</a> 中也有介绍：</p>
<blockquote>
<p>全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。</p>
<p>在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。</p>
<p>例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。</p>
</blockquote>
<p>如果看的不是很懂的话，容我再来介绍下全局对象:</p>
<p>1.可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);</code></pre>
<p>2.全局对象是由 Object 构造函数实例化的一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this instanceof Object);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);</code></pre>
<p>3.预定义了一堆，嗯，一大堆函数和属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 都能生效
console.log(Math.random());
console.log(this.Math.random());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 都能生效</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random());
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.Math.random());</code></pre>
<p>4.作为全局变量的宿主。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
console.log(this.a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);</code></pre>
<p>5.客户端 JavaScript 中，全局对象有 window 属性指向自身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
console.log(window.a);

this.window.b = 2;
console.log(this.b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);

<span class="hljs-keyword">this</span>.window.b = <span class="hljs-number">2</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.b);</code></pre>
<p>花了一个大篇幅介绍全局对象，其实就想说：</p>
<p>全局上下文中的变量对象就是全局对象呐！</p>
<h2 id="articleHeader3">函数上下文</h2>
<p>在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。</p>
<p>活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。</p>
<p>活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。</p>
<h2 id="articleHeader4">执行过程</h2>
<p>执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：</p>
<ol>
<li><p>进入执行上下文</p></li>
<li><p>代码执行</p></li>
</ol>
<h3 id="articleHeader5">进入执行上下文</h3>
<p>当进入执行上下文时，这时候还没有执行代码，</p>
<p>变量对象会包括：</p>
<ol>
<li>
<p>函数的所有形参 (如果是函数上下文)</p>
<ul>
<li><p>由名称和对应值组成的一个变量对象的属性被创建</p></li>
<li><p>没有实参，属性值设为 undefined</p></li>
</ul>
</li>
<li>
<p>函数声明</p>
<ul>
<li><p>由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建</p></li>
<li><p>如果变量对象已经存在相同名称的属性，则完全替换这个属性</p></li>
</ul>
</li>
<li>
<p>变量声明</p>
<ul>
<li><p>由名称和对应值（undefined）组成一个变量对象的属性被创建；</p></li>
<li><p>如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性</p></li>
</ul>
</li>
</ol>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{}
  <span class="hljs-keyword">var</span> d = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

  b = <span class="hljs-number">3</span>;

}

foo(<span class="hljs-number">1</span>);</code></pre>
<p>在进入执行上下文后，这时候的 AO 是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">AO = {
    <span class="hljs-attr">arguments</span>: {
        <span class="hljs-number">0</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">c</span>: reference to <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>)</span>{},
    <span class="hljs-attr">d</span>: <span class="hljs-literal">undefined</span>
}</code></pre>
<h3 id="articleHeader6">代码执行</h3>
<p>在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值</p>
<p>还是上面的例子，当代码执行完后，这时候的 AO 是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression &quot;d&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">AO = {
    <span class="hljs-attr">arguments</span>: {
        <span class="hljs-number">0</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">c</span>: reference to <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>)</span>{},
    <span class="hljs-attr">d</span>: reference to FunctionExpression <span class="hljs-string">"d"</span>
}</code></pre>
<p>到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：</p>
<ol>
<li><p>全局上下文的变量对象初始化是全局对象</p></li>
<li><p>函数上下文的变量对象初始化只包括 Arguments 对象</p></li>
<li><p>在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值</p></li>
<li><p>在代码执行阶段，会再次修改变量对象的属性值</p></li>
</ol>
<h2 id="articleHeader7">思考题</h2>
<p>最后让我们看几个例子：</p>
<p>1.第一题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log(a);
    a = 1;
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(a);
    a = <span class="hljs-number">1</span>;
}

foo(); <span class="hljs-comment">// ???</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(a);
}
bar(); <span class="hljs-comment">// ???</span></code></pre>
<p>第一段会报错：<code>Uncaught ReferenceError: a is not defined</code>。</p>
<p>第二段会打印：<code>1</code>。</p>
<p>这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。</p>
<p>第一段执行 console 的时候， AO 的值是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AO = {
    arguments: {
        length: 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">AO = {
    <span class="hljs-attr">arguments</span>: {
        <span class="hljs-attr">length</span>: <span class="hljs-number">0</span>
    }
}</code></pre>
<p>没有 a 的值，然后就会到全局去找，全局也没有，所以会报错。</p>
<p>当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。</p>
<p>2.第二题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(foo);

function foo(){
    console.log(&quot;foo&quot;);
}

var foo = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(foo);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"foo"</span>);
}

<span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;</code></pre>
<p>会打印函数，而不是 undefined 。</p>
<p>这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。</p>
<h2 id="articleHeader8">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/6" rel="nofollow noreferrer" target="_blank">《JavaScript深入之作用域链》</a></p>
<h2 id="articleHeader9">本文相关链接</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">《JavaScript深入之执行上下文栈》</a></p>
<h2 id="articleHeader10">深入系列</h2>
<p>JavaScript深入系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript深入系列预计写十五篇左右，旨在帮大家捋顺JavaScript底层知识，重点讲解如原型、作用域、执行上下文、变量对象、this、闭包、按值传递、call、apply、bind、new、继承等难点概念。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript深入之变量对象

## 原文链接
[https://segmentfault.com/a/1190000009018898](https://segmentfault.com/a/1190000009018898)

