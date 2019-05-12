---
title: 'JavaScript深入之词法作用域和动态作用域' 
date: 2019-01-17 2:30:25
hidden: true
slug: rncv5zwwev
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript深入系列的第二篇，JavaScript采用词法作用域，什么语言采用了动态作用域？两者的区别又是什么？还有一个略难的思考题，快来看看吧。</p></blockquote>
<h2 id="articleHeader0">作用域</h2>
<p>作用域是指程序源代码中定义变量的区域。</p>
<p>作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。</p>
<p>JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。</p>
<h2 id="articleHeader1">静态作用域与动态作用域</h2>
<p>因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。</p>
<p>而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。</p>
<p>让我们认真看个例子就能明白之间的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> value = <span class="hljs-number">1</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-number">2</span>;
    foo();
}

bar();

<span class="hljs-comment">// 结果是 ???</span></code></pre>
<p>假设JavaScript采用静态作用域，让我们分析下执行过程：</p>
<p>执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。</p>
<p>假设JavaScript采用动态作用域，让我们分析下执行过程：</p>
<p>执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。</p>
<p>前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。</p>
<h2 id="articleHeader2">动态作用域</h2>
<p>也许你会好奇什么语言是动态作用域？</p>
<p>bash 就是动态作用域，不信的话，把下面的脚本存成例如 scope.bash，然后进入相应的目录，用命令行执行 <code>bash ./scope.bash</code>，看看打印的值是多少。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="value=1
function foo () {
    echo $value;
}
function bar () {
    local value=2;
    foo;
}
bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">value=1
<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">foo</span></span> () {
    <span class="hljs-built_in">echo</span> <span class="hljs-variable">$value</span>;
}
<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">bar</span></span> () {
    <span class="hljs-built_in">local</span> value=2;
    foo;
}
bar</code></pre>
<p>这个文件也可以在<a href="https://github.com/mqyqingfeng/Blog/blob/master/demos/scope/scope.bash" rel="nofollow noreferrer" target="_blank">github博客仓库</a>中找到。</p>
<h2 id="articleHeader3">思考题</h2>
<p>最后，让我们看一个《JavaScript权威指南》中的例子：</p>
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
<p>猜猜两段代码各自的执行结果是多少？</p>
<p>这里直接告诉大家结果，两段代码都会打印：<code>local scope</code>。</p>
<p>原因也很简单，因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。</p>
<p>而引用《JavaScript权威指南》的回答就是：</p>
<p>JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。</p>
<p>但是在这里真正想让大家思考的是：</p>
<p>虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？</p>
<p>如果要回答这个问题，就要牵涉到很多的内容，词法作用域只是其中的一小部分，让我们期待下一篇文章————《JavaScript深入之执行上下文栈》。</p>
<h2 id="articleHeader4">下一篇文章</h2>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/4" rel="nofollow noreferrer" target="_blank">JavaScript深入之执行上下文栈</a></p>
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
JavaScript深入之词法作用域和动态作用域

## 原文链接
[https://segmentfault.com/a/1190000008972987](https://segmentfault.com/a/1190000008972987)

