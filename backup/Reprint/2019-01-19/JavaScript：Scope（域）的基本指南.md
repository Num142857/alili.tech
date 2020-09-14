---
title: 'JavaScript：Scope（域）的基本指南' 
date: 2019-01-19 2:30:10
hidden: true
slug: s7inim87cf9
categories: [reprint]
---

{{< raw >}}

            <hr>
<h1>JavaScript：Scope（域）的基本指南</h1>
<h2>Scope决定了代码中变量，函数和对象的可见性。在这里了解所有细节。</h2>
<p><img src="http://p0.qhimg.com/t012cdcbd844c1aa7cf.png" alt=""></p>
<p>Scope是JavaScript和编程的一个重要方面。Scope限制了整个代码中变量，函数和对象的可见性以及可用性。</p>
<p>这带来了很多好处，其中包括：</p>
<ul>
<li><p>安全 - 变量只能在需要的地方访问。</p>
</li>
<li><p>减少变量名空间冲突 - 当两个或更多变量共享一个通用名称时，会发生变量名冲突。变量范围有助于减少阻止这种情况发生。</p>
</li>
</ul>
<hr>
<p><strong>在最基本的层面上，JavaScript有两种类型的范围:</strong></p>
<ul>
<li><p><strong>Global</strong> Scope（全局作用域）</p>
</li>
<li><p><strong>Local</strong> Scope（局部作用域）</p>
</li>
</ul>
<hr>
<h4>全局作用域</h4>
<p>当你开始用JavaScript编写代码时，你就已经在全局范围内。任何在全局范围内编写的东西都可以在JavaScript代码中的任何地方访问</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">var cat</span> = <span class="hljs-string">'Jerry'</span>;

</code></pre><pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">localScopeExample</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// LOCAL SCOPE</span>
  <span class="hljs-built_in">console</span>.log(cat); <span class="hljs-comment">// Jerry</span>
}

</code></pre><pre><code class="hljs stata"><span class="hljs-comment">// GLOBAL SCOPE</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span>); <span class="hljs-comment">// Jerry</span>

</code></pre><h4>局部作用域</h4>
<p>局部作用域稍微复杂一点。局部作用域变量只能在局部作用域（它们被定义的地方）中可见和可访问。您可以将局部作用域视为您在全局范围内创建的任何新范围。</p>
<p>一个简单的例子就是在使用函数时。用JavaScript编写的每个函数都会创建一个新的局部作用域。这些局部作用域的变量只能在它们定义的函数中访问。</p>
<p>我们来看一个例子。我们将创建一个函数并在该函数中声明变量cat。猫可以访问并且可以在该功能的任何地方使用。但是，在函数之外调用cat将导致Uncaught ReferenceError：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">localScopeExample</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// LOCAL SCOPE</span>
  <span class="hljs-keyword">var</span> cat = <span class="hljs-string">'Jerry'</span>;
  <span class="hljs-built_in">console</span>.log(cat); <span class="hljs-comment">// Jerry</span>
}

</code></pre><pre><code class="hljs stata"><span class="hljs-comment">// GLOBAL SCOPE</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span>); <span class="hljs-comment">// Uncaught ReferenceError: cat is not defined</span>

</code></pre><p>由于局部变量只能在其函数中访问，因此可以在<em>不同的函数中使用相同的变量名称</em>：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> cat = <span class="hljs-string">'Jerry'</span>;
  <span class="hljs-built_in">console</span>.log(cat); <span class="hljs-comment">// Jerry</span>
}

</code></pre><pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> cat = <span class="hljs-string">'Tom'</span>;
  <span class="hljs-built_in">console</span>.log(cat); <span class="hljs-comment">// Tom</span>
}

</code></pre><h4>词法作用域</h4>
<p>学习词法作用域也很重要。词法作用域（也称为静态作用域）是内部函数访问外部函数范围的能力。</p>
<p>我们来看一个例子。在下面的代码中，我们定义了两个函数 - <code>func1</code>在全局范围内，<code>func2</code>在<code>func1</code>范围内声明。由于词汇范围的限制，您可以在<em>范围2</em>中访问<em>全局作用域</em>和<em>范围1</em>中的所有内容：</p>
<pre><code class="hljs actionscript"><span class="hljs-comment">// GLOBAL SCOPE</span>
<span class="hljs-keyword">var</span> dog = <span class="hljs-string">'Lewis'</span>;

</code></pre><pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span><span class="hljs-params">()</span></span>{
  <span class="hljs-comment">// SCOPE 1</span>
  <span class="hljs-keyword">var</span> cat = <span class="hljs-string">'Jerry'</span>;

</code></pre><pre><code class="hljs javascript">  <span class="hljs-keyword">var</span> func2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// SCOPE 2</span>
    <span class="hljs-built_in">console</span>.log(cat); <span class="hljs-comment">// Jerry</span>
    <span class="hljs-built_in">console</span>.log(dog); <span class="hljs-comment">// Lewis</span>
  }
}

</code></pre><h4>块级作用域</h4>
<p>使用<code>var</code>时，变量既可以是全局作用域，也可以局部作用于定义它的函数。块级作用域如<code>if</code>，<code>for</code>，<code>while</code>，<code>{}</code>对<code>var</code> 没有影响。</p>
<p><code>let</code> &amp; <code>const</code>,另一方面，它们被限定在它们所定义的区块内。我们来看一个例子：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">let x</span> = 1;

</code></pre><pre><code class="hljs clojure">{
  let x = <span class="hljs-number">2</span><span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">; // 2</span>
}

</code></pre><pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(x); <span class="hljs-comment">// 1</span>

</code></pre><p>正如你在上面看到的那样，简单地使用括号来创建一个代码块将在本地范围内在该块内声明的任何变量。相同的概念适用于其他块范围：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">let x</span> = 1;

</code></pre><pre><code class="hljs gauss"><span class="hljs-keyword">if</span> (x !== <span class="hljs-number">2</span>) {
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">2</span>;
  console.<span class="hljs-built_in">log</span>(x); <span class="hljs-comment">// 2</span>
}

</code></pre><pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(x); <span class="hljs-comment">// 1</span>

</code></pre><p>但要小心。如果您不小心重新声明具有相同块范围的相同变量，则会出现错误：</p>
<pre><code class="hljs nix">{
  <span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">2</span>;
}

</code></pre><pre><code class="hljs groovy">Uncaught <span class="hljs-string">SyntaxError:</span> Identifier <span class="hljs-string">'x'</span> has already been declared

</code></pre><h4>关键要点：</h4>
<ul>
<li><p>全局范围的持续时间与系统一样长。</p>
</li>
<li><p>局部变量在函数启动时创建，并在函数结束时删除。</p>
</li>
<li><p>词法作用域允许内部函数访问其外部函数的作用域</p>
</li>
<li><p><code>const</code>和<code>let</code>是块范围变量。块范围不适用于<code>var</code>。</p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript：Scope（域）的基本指南

## 原文链接
[https://www.zcfy.cc/article/javascript-a-basic-guide-to-scope-codeburst](https://www.zcfy.cc/article/javascript-a-basic-guide-to-scope-codeburst)

