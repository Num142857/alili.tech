---
title: 'es7与es8其他知识' 
date: 2019-01-07 2:30:11
hidden: true
slug: bttdqc8qg3
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">这是一些关于es7与es8的一些小知识，都是一些比较常用的，可以简单了解下</h3>
<h1 id="articleHeader1">求幂运算符(**)</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(2**3);//8
console.log(4**4);//256
//以往的写法
console.log(Math.pow(2,3));//8
console.log(Math.pow(4,4));//256
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(<span class="hljs-number">2</span>**<span class="hljs-number">3</span>);<span class="hljs-comment">//8</span>
console.log(<span class="hljs-number">4</span>**<span class="hljs-number">4</span>);<span class="hljs-comment">//256</span>
<span class="hljs-comment">//以往的写法</span>
console.log(Math.pow(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>));<span class="hljs-comment">//8</span>
console.log(Math.pow(<span class="hljs-number">4</span>,<span class="hljs-number">4</span>));<span class="hljs-comment">//256</span>
</code></pre>
<h3 id="articleHeader2">另一种写法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 7
a **= 12
let b = 2
b **= 7
console.log(a === Math.pow(7,12)) // true
console.log(b === Math.pow(2,7)) // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let a = <span class="hljs-number">7</span>
a **= <span class="hljs-number">12</span>
let b = <span class="hljs-number">2</span>
b **= <span class="hljs-number">7</span>
console.log(a === Math.pow(<span class="hljs-number">7</span>,<span class="hljs-number">12</span>)) <span class="hljs-comment">// true</span>
console.log(b === Math.pow(<span class="hljs-number">2</span>,<span class="hljs-number">7</span>)) <span class="hljs-comment">// true</span>
</code></pre>
<h1 id="articleHeader3">includes方法</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//包含数组里的数，打印true。
//不包含数组里的数，则打印false。
var aa=[1,2,3];
console.log(aa.includes(5));//false
console.log(aa.includes(3));//true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//包含数组里的数，打印true。</span>
<span class="hljs-comment">//不包含数组里的数，则打印false。</span>
var aa=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
console.log(aa.includes(<span class="hljs-number">5</span>));<span class="hljs-comment">//false</span>
console.log(aa.includes(<span class="hljs-number">3</span>));<span class="hljs-comment">//true</span>
</code></pre>
<h1 id="articleHeader4">字符填充函数padStart 和 padEnd</h1>
<h3 id="articleHeader5">padStart()在开始部位填充，返回一个给出长度的字符串，填充物给定字符串，把字符串填充到期望的长度。从字符串的左边开始</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('react'.padStart(10).length)         // &quot;       react&quot; is 10
console.log('backbone'.padStart(10).length)         // &quot;  backbone&quot; is 10
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'react'</span>.padStart(<span class="hljs-number">10</span>).length)         <span class="hljs-regexp">//</span> <span class="hljs-string">"       react"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'backbone'</span>.padStart(<span class="hljs-number">10</span>).length)         <span class="hljs-regexp">//</span> <span class="hljs-string">"  backbone"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span>
</code></pre>
<h3 id="articleHeader6">padEnd从字符串的尾端右边开始填充。第二个参数，你能实际上用一个任何长度的字符串。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
console.log('react'.padEnd(10, ':-)'))         // &quot;react:-):-&quot; is 10
console.log('backbone'.padEnd(10, '*'))         // &quot;backbone**&quot; is 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'react'</span>.padEnd(<span class="hljs-number">10</span>, <span class="hljs-string">':-)'</span>))         <span class="hljs-regexp">//</span> <span class="hljs-string">"react:-):-"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'backbone'</span>.padEnd(<span class="hljs-number">10</span>, <span class="hljs-string">'*'</span>))         <span class="hljs-regexp">//</span> <span class="hljs-string">"backbone**"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es7与es8其他知识

## 原文链接
[https://segmentfault.com/a/1190000010280296](https://segmentfault.com/a/1190000010280296)

