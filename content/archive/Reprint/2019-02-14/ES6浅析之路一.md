---
title: 'ES6浅析之路一' 
date: 2019-02-14 2:30:37
hidden: true
slug: 53c0n8xys23
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>(个人理解ES6就是对ES5的BUG修改和升级)</strong><br>废话不多说今天要探讨的是  <strong>var</strong>与<strong>let</strong><br><a href="http://es6.ruanyifeng.com/#docs/let" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门 作者：阮一峰</a></p>
<p>下面是个人总结：<br>let不允许在相同作用域内，重复声明同一个变量。<br>let 特点是<strong>块级作用域</strong></p>
<p>先来看一下ES5中时常出现的变量提升的问题！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var tmp = new Date();
    function f() {
        console.log(tmp);
        if(false) {
            var tmp = 'hello world';
        }
        console.log(tmp);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(tmp);
        <span class="hljs-keyword">if</span>(<span class="hljs-literal">false</span>) {
            <span class="hljs-keyword">var</span> tmp = <span class="hljs-string">'hello world'</span>;
        }
        <span class="hljs-built_in">console</span>.log(tmp);
    }</code></pre>
<p>输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。</p>
<p>在ES6的语法中解决的变量提升的问题 是这么实现的！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function f1() {
         let n = 5;
        if (true) {
            let n = 10;
        }
        console.log(n); // 5
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
         <span class="hljs-keyword">let</span> n = <span class="hljs-number">5</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
            <span class="hljs-keyword">let</span> n = <span class="hljs-number">10</span>;
        }
        <span class="hljs-built_in">console</span>.log(n); <span class="hljs-comment">// 5</span>
    }
</code></pre>
<p>这里大家可以自己试验 将内层 和外层的 n 分别用var let 来定义 就发现<br>let不允许在相同作用域内，重复声明同一个变量。<br>lef 特点是<strong>块级作用域</strong><br>let 的特点得到明显的体现！</p>
<p>再看一个ES5中的循环变量泄露为全局变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var s = 'hello';
    for (var i = 0; i < s.length; i++) {
      console.log(s[i]);
    }
    console.log(i); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> s = <span class="hljs-string">'hello'</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; s.length; i++) {
      <span class="hljs-built_in">console</span>.log(s[i]);
    }
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 5</span></code></pre>
<p>很明显i成了全局变量。 <br> ES6中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for (let i = 0; i < 10; i++) {
      // ...
    }
    
    console.log(i); 
    // ReferenceError: i is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
      <span class="hljs-regexp">//</span> ...
    }
    
    console.log(i); 
    <span class="hljs-regexp">//</span> <span class="hljs-symbol">ReferenceError:</span> i is <span class="hljs-keyword">not</span> <span class="hljs-keyword">defined</span></code></pre>
<p>这表明，let声明的变量只在它所在的代码块有效。   </p>
<p>本人目前了解的还不够深！<br>比如ES6中添加一个新的词汇  “暂时性死区”（temporal dead zone，简称 TDZ）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var tmp = 123;
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-keyword">var</span> tmp = <span class="hljs-number">123</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
      tmp = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// ReferenceError</span>
      <span class="hljs-keyword">let</span> tmp;
    }</code></pre>
<p>我可以把它理解为ES6解决不了的BUG！非要给他定义成一个词汇么？（笑死）！<br>也希望大牛前来解答探讨！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6浅析之路一

## 原文链接
[https://segmentfault.com/a/1190000016891057](https://segmentfault.com/a/1190000016891057)

