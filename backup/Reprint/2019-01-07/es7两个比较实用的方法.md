---
title: 'es7两个比较实用的方法' 
date: 2019-01-07 2:30:11
hidden: true
slug: joeno4qjexb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">es7两个比较实用的方法</h1>
<blockquote><ol><li><p><strong> </strong> operator (求幂运算符)**</p></li></ol></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(2**3);//8
console.log(4**4);//256
//以往的写法
console.log(Math.pow(2,3));//8
console.log(Math.pow(4,4));//256" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(<span class="hljs-number">2</span>**<span class="hljs-number">3</span>);<span class="hljs-comment">//8</span>
console.log(<span class="hljs-number">4</span>**<span class="hljs-number">4</span>);<span class="hljs-comment">//256</span>
<span class="hljs-comment">//以往的写法</span>
console.log(Math.pow(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>));<span class="hljs-comment">//8</span>
console.log(Math.pow(<span class="hljs-number">4</span>,<span class="hljs-number">4</span>));<span class="hljs-comment">//256</span></code></pre>
<p>还不是很简单，两个*号就能进行求幂运算</p>
<blockquote>
<ol><li><p><strong> Array.prototype.includes</strong></p></li></ol>
<blockquote><p>es6为字符串添加了一个includes方法，现在同样运用与数组</p></blockquote>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="l=[1,2,3]
l.includes(5)//false  跟数组一样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>l=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
l.includes(<span class="hljs-number">5</span>)<span class="hljs-comment">//false  跟数组一样</span></code></pre>
<blockquote>
<p><strong>字符填充函数padStart 和 padEnd</strong></p>
<blockquote>
<p>padStart()在开始部位填充，返回一个给出长度的字符串，填充物给定字符串，把字符串填充到期望的长度。从字符串的左边开始</p>
<p>padEnd从字符串的尾端右边开始填充。第二个参数，你能实际上用一个任何长度的字符串。</p>
</blockquote>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('react'.padStart(10).length)         // &quot;       react&quot; is 10
console.log('backbone'.padStart(10).length)         // &quot;  backbone&quot; is 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'react'</span>.padStart(<span class="hljs-number">10</span>).length)         <span class="hljs-regexp">//</span> <span class="hljs-string">"       react"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'backbone'</span>.padStart(<span class="hljs-number">10</span>).length)         <span class="hljs-regexp">//</span> <span class="hljs-string">"  backbone"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('react'.padEnd(10, ':-)'))         // &quot;react:-):-&quot; is 10
console.log('backbone'.padEnd(10, '*'))         // &quot;backbone**&quot; is 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'react'</span>.padEnd(<span class="hljs-number">10</span>, <span class="hljs-string">':-)'</span>))         <span class="hljs-regexp">//</span> <span class="hljs-string">"react:-):-"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'backbone'</span>.padEnd(<span class="hljs-number">10</span>, <span class="hljs-string">'*'</span>))         <span class="hljs-regexp">//</span> <span class="hljs-string">"backbone**"</span> <span class="hljs-keyword">is</span> <span class="hljs-number">10</span></code></pre>
<blockquote><p>Object.values:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = { 
     x: 'xxx', 
     y: 1 
};
    Object.values(obj); // 打印['xxx', 1]；

    let obj = ['e', 's', '8'];
    Object.values(obj); // 打印['e', 's', '8']；
        
    Object.values('es8'); // 打印['e', 's', '8']；
        
    const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
    Object.values(obj); // 打印['yyy', 'zzz', 'xxx']；
//注释：如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>let obj = { 
     x: <span class="hljs-string">'xxx'</span>, 
     y: <span class="hljs-number">1</span> 
};
    Object.values(obj); <span class="hljs-regexp">//</span> 打印[<span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>]；

    let obj = [<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>];
    Object.values(obj); <span class="hljs-regexp">//</span> 打印[<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>]；
        
    Object.values(<span class="hljs-string">'es8'</span>); <span class="hljs-regexp">//</span> 打印[<span class="hljs-string">'e'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'8'</span>]；
        
    const obj = { <span class="hljs-number">10</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'yyy'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'zzz'</span> };
    Object.values(obj); <span class="hljs-regexp">//</span> 打印[<span class="hljs-string">'yyy'</span>, <span class="hljs-string">'zzz'</span>, <span class="hljs-string">'xxx'</span>]；
<span class="hljs-regexp">//</span>注释：如果是纯 number 型的键值，则返回值顺序根据键值从小到大排列；</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es7两个比较实用的方法

## 原文链接
[https://segmentfault.com/a/1190000010282863](https://segmentfault.com/a/1190000010282863)

