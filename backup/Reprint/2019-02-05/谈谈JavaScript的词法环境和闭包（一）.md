---
title: '谈谈JavaScript的词法环境和闭包（一）' 
date: 2019-02-05 2:30:09
hidden: true
slug: 19d30h9tb1h
categories: [reprint]
---

{{< raw >}}

                    
<p>一个资深的同事在我出发去面试前告诫我，问JS知识点的时候千万别主动提闭包，它就是一个坑啊！坑啊！啊！</p>
<p>闭包确实是js的难点和重点，其实也没那么可怕，关键是机制的理解，可以和函数一起单独拿出来说说，其实关于闭包的解释很多文章都写得比较详细了，这篇文章就作为自己学习过程的记录吧。</p>
<h1 id="articleHeader0">闭包的概念</h1>
<p>首先明确一下闭包的概念：</p>
<p><a href="https://developer.mozilla.org/cn/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">MDN (Mozilla Develop Network) </a>上的对闭包的定义：</p>
<blockquote><p>闭包是指能够访问自由变量的函数 (变量在本地使用，但在闭包中定义)。换句话说，定义在闭包中的函数可以“记忆”它被创建时候的环境。</p></blockquote>
<p>分析：</p>
<ul>
<li><p>闭包由函数和与其相关的引用环境（词法环境）的组合而成</p></li>
<li><p>闭包允许函数访问其引用环境（词法环境）中的变量（又称自由变量）</p></li>
<li><p>广义上来说，<strong>所有JS的函数都可以称为闭包</strong>，因为JS函数在创建时保存了当前的词法环境</p></li>
</ul>
<p>还是很拗口有木有，一脸懵逼的时候就应该从基础的概念开始找，所以我们来谈谈词法环境。</p>
<h1 id="articleHeader1">词法环境的概念</h1>
<p>定义（摘自<a href="https://www.w3.org/html/ig/zh/wiki/ES5/%E5%8F%AF%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%E4%B8%8E%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83#.E8.AF.8D.E6.B3.95.E7.8E.AF.E5.A2.83" rel="nofollow noreferrer" target="_blank">wiki百科</a>）。</p>
<blockquote><p><strong>词法环境</strong>是一个用于定义特定变量和函数标识符在ECMAScript代码的词法嵌套结构上关联关系的规范类型。一个词法环境由一个<strong>环境记录项</strong>和可能为空的<strong>外部词法环境引用</strong>构成。</p></blockquote>
<h2 id="articleHeader2">变量作用域</h2>
<p>一般来说，在编程语言中都有变量作用域的概念，每个变量都有自己的生命周期和作用范围。<br>作用域有两种解析方式：</p>
<ol>
<li><p>静态作用域<br>又称为词法作用域，在编译阶就可以决定变量的引用，由程序定义的位置决定，和代码执行顺序无关，用嵌套的方式解析。</p></li>
<li><p>动态作用域<br>在程序运行时候，和代码的执行顺序决定。用动态栈动态管理。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
function getX() {
    alert(x);
}
function foo() {
    var x = 20;
    getX();
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getX</span><span class="hljs-params">()</span> </span>{
    alert(x);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">20</span>;
    getX();
}
foo();</code></pre>
<ol>
<li><p>在静态作用域下：<br>全局作用域下有<code>x</code>, <code>getX</code>, <code>foo</code>三个变量，<code>getX</code>和<code>foo</code>都有自己的作用域。执行foo函数的时候，getX()被执行，但是getX的<strong>定义位置</strong>在全局作用域下的，取到的x是<code>10</code>，而不是<code>20</code>。</p></li>
<li><p>在动态作用域下：<br>运行这段代码时，先把<code>x=10</code>、<code>getX</code>、<code>foo</code>按顺序压栈，然后执行<code>foo</code>函数，在函数中把<code>x=20</code>压栈，然后执行<code>getX()</code>，此时距离栈顶最近的<code>x</code>值为<code>20</code>，因此alert的值也是<code>20</code>。</p></li>
</ol>
<p><strong>JavaScript使用的变量作用域是静态作用域。</strong>JS中作用域简单分为两部分：全局作用域和函数作用域。ES5中使用<strong>词法环境</strong>管理静态作用域。</p>
<p>词法环境包含两部分</p>
<ul>
<li>
<p>环境记录</p>
<ul>
<li><p>形参</p></li>
<li><p>函数声明</p></li>
<li><p>变量</p></li>
<li><p>其它...</p></li>
</ul>
</li>
<li><p>对外部词法环境的引用(outer)</p></li>
</ul>
<h2 id="articleHeader3">环境记录初始化</h2>
<p>一段JS代码执行之前，会对环境记录进行初始化（声明提前），即将函数的形参、函数声明和变量先放入函数的环境记录中，特别需要注意的是：</p>
<ul><li><p>形参会在初始化的时候定义值，但是函数内部定义的变量只声明不定义（不赋值），这个需要用JS中的Hoisting机制来解释，具体可以看这一篇文章：<a href="https://segmentfault.com/a/1190000000348228">《理解 JavaScript（二）：Scoping &amp; Hoisting》</a>。</p></li></ul>
<p>以下面这段代码为例，解析环境记录初始化和代码执行的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
function foo(y) {
    var z  = 30;
    function bar(q) {
        return x + y + z + q;
    }
    return bar;
}
var bar = foo(20);
bar(40);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(y)</span> </span>{
    <span class="hljs-keyword">var</span> z  = <span class="hljs-number">30</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">(q)</span> </span>{
        <span class="hljs-keyword">return</span> x + y + z + q;
    }
    <span class="hljs-keyword">return</span> bar;
}
<span class="hljs-keyword">var</span> bar = foo(<span class="hljs-number">20</span>);
bar(<span class="hljs-number">40</span>);</code></pre>
<ul><li><p><strong>step1:初始化全局环境</strong></p></li></ul>
<table>
<thead><tr>
<th colspan="2">全局环境</th>
</tr></thead>
<tbody>
<tr>
<td rowspan="3">环境记录(record)</td>
   <td>foo: &lt;function&gt;</td>
</tr>
<tr>
<td>x: undefined（声明变量而非定义变量）</td>
</tr>
<tr>
<td>bar: undefined（声明变量而非定义变量）</td>
</tr>
<tr>
<td>外部环境(outer)</td>
   <td>null</td>
</tr>
</tbody>
</table>
<ul><li><p><strong>step2: 执行<code>x=10</code></strong></p></li></ul>
<table>
<thead><tr>
<th colspan="2">全局环境</th>
</tr></thead>
<tbody>
<tr>
<td rowspan="3">环境记录(record)</td>
   <td>foo: &lt;function&gt;</td>
</tr>
<tr>
<td>x: 10（）</td>
</tr>
<tr>
<td>bar: undefined（声明变量而非定义变量）</td>
</tr>
<tr>
<td>外部环境(outer)</td>
   <td>null</td>
</tr>
</tbody>
</table>
<ul><li><p><strong>step3：执行var bar = foo(20)语句之前，将foo函数的环境记录初始化</strong></p></li></ul>
<table>
<thead><tr>
<th colspan="2">foo 环境</th>
</tr></thead>
<tbody>
<tr>
<td rowspan="3">环境记录(record)</td>
   <td><strong>y: 20（定义形参）</strong></td>
</tr>
<tr>
<td>bar: &lt;function&gt;</td>
</tr>
<tr>
<td>z: undefined（声明变量而非定义变量）</td>
</tr>
<tr>
<td>外部环境(outer)</td>
   <td>全局环境</td>
</tr>
</tbody>
</table>
<ul><li><p><strong>step4：执行var bar = foo(20)语句，变量bar接收foo函数中返回的bar函数</strong></p></li></ul>
<table>
<thead><tr>
<th colspan="2">foo 环境</th>
</tr></thead>
<tbody>
<tr>
<td rowspan="3">环境记录(record)</td>
   <td><strong>y: 20</strong></td>
</tr>
<tr>
<td>bar: &lt;function&gt;</td>
</tr>
<tr>
<td><strong>z: 30（定义z）</strong></td>
</tr>
<tr>
<td>外部环境(outer)</td>
   <td>全局环境</td>
</tr>
</tbody>
</table>
<ul><li><p><strong>step5：执行bar函数之前，初始化bar的词法环境</strong></p></li></ul>
<table>
<thead><tr>
<th colspan="2">bar环境</th>
</tr></thead>
<tbody>
<tr>
<td>环境记录(record)</td>
   <td><strong>q: 40（定义形参q）</strong></td>
</tr>
<tr>
<td>外部环境(outer)</td>
   <td>foo环境</td>
</tr>
</tbody>
</table>
<ul><li><p><strong>step6：在foo函数内执行bar函数</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    x + y + z + q = 10 + 20 + 30 + 40 = 100 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">    x + y + z + q = <span class="hljs-number">10</span> + <span class="hljs-number">20</span> + <span class="hljs-number">30</span> + <span class="hljs-number">40</span> = <span class="hljs-number">100</span> </code></pre>
<p>其实说了那么多，也是想强调一点：形参的值在环境初始化的时候就赋值了！因此形参的作用之一就是<strong>保存外部变量的值</strong>！</p>
<h1 id="articleHeader4">一道闭包的面试题</h1>
<p>查了一下关于闭包的面试题，用具体的例子说明闭包的应用场景。<br>最常见的答案来自于《JavaScript高级程序设计（第3版）》p181：</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function creacteFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creacteFunctions</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> i;
        }
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>这个函数返回了长度为10的函数数组，假设我们调用函数数组的第3个函数，在控制台中输入<code>creacteFunctions()[2]()</code>，即执行函数数组里面的第三个函数，<code>creacteFunctions()</code>返回函数数组，[2]是取第三个函数的引用，最后一个()是执行第三个函数，返回结果却并不是预期的<code>2</code>，而是<code>10</code>.</p>
<p>因此，为了能够让闭包的行为符合预期，需要创建一个匿名函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function creacteFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function() {
                return num;
            }
        }(i);
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creacteFunctions</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">num</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> num;
            }
        }(i);
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>此时在控制台中输入<code>creacteFunctions()[2]()</code>，即执行函数数组里面的第三个函数，返回的就是预期中的<code>2</code>。<br>有了词法环境的初始化过程，这里也就非常容易理解了。匿名函数的形参num保存了每次执行的i的值。在<code>function(num){...}(i)</code>这个结构中，i作为形参num的实际值执行这个匿名函数，因此每次循环中的num直接初始化为i的值。<br>为了更清楚的提取这部分结构，我们将匿名函数命名为helper：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var helper = function (num) {
    return function() {
        return num;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> helper = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(num)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> num;
    }
}</code></pre>
<p>用helper函数重写第二段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var helper = function (num) {
    return function() {
        return num;
    }
}
function creacteFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = helper(i);
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> helper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> num;
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creacteFunctions</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        result[i] = helper(i);
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>在控制台中输入<code>creacteFunctions()[2]()</code>，输出的也是预期中的<code>2</code>。</p>
<p>未完待续哦，闭包可以讲的东西太多啦！</p>
<h1 id="articleHeader5">一句话总结</h1>
<blockquote><p>真正理解了作用域也就理解了闭包.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈JavaScript的词法环境和闭包（一）

## 原文链接
[https://segmentfault.com/a/1190000006719728](https://segmentfault.com/a/1190000006719728)

