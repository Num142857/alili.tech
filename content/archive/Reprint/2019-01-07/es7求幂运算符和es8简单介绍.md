---
title: 'es7求幂运算符和es8简单介绍' 
date: 2019-01-07 2:30:11
hidden: true
slug: n2ezn2u34e
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>es7求幂运算符和es8简单介绍</strong></p>
<blockquote><p>es7求幂运算符：</p></blockquote>
<ul><li><p>求幂运算符  ** operator (求幂运算符)</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" console.log(2**3);  //打印8；
    console.log(4**3);    //打印64；
    console.log(Math.pow(2,3));//打印8；
    console.log(Math.pow(4,3));//打印64；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> console.log(<span class="hljs-number">2</span>**<span class="hljs-number">3</span>);  <span class="hljs-comment">//打印8；</span>
    console.log(<span class="hljs-number">4</span>**<span class="hljs-number">3</span>);    <span class="hljs-comment">//打印64；</span>
    console.log(Math.pow(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>));<span class="hljs-comment">//打印8；</span>
    console.log(Math.pow(<span class="hljs-number">4</span>,<span class="hljs-number">3</span>));<span class="hljs-comment">//打印64；</span></code></pre>
<ul><li><p>Array.prototype.includes</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [1,2,3];
    console.log(a.includes(5));//打印false；
    //includes：判断数组里面有没有那个值；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
    console.log(a.includes(<span class="hljs-number">5</span>));<span class="hljs-comment">//打印false；</span>
    <span class="hljs-comment">//includes：判断数组里面有没有那个值；</span></code></pre>
<blockquote><p>es8：</p></blockquote>
<ul><li><p>padStart：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在字符串前面填充：
    'es8'.padStart(2);          // 打印'es8'；
    'es8'.padStart(5);          // 打印'  es8'；
    'es8'.padStart(6, 'woof');  // 打印'wooes8'；
    'es8'.padStart(14, 'wow');  // 打印'wowwowwowwoes8'；
    'es8'.padStart(7, '0');     // 打印'0000es8'；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>在字符串前面填充：
    <span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">2</span>);          <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es8'</span>；
    <span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">5</span>);          <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'  es8'</span>；
    <span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">6</span>, <span class="hljs-string">'woof'</span>);  <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'wooes8'</span>；
    <span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">14</span>, <span class="hljs-string">'wow'</span>);  <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'wowwowwowwoes8'</span>；
    <span class="hljs-string">'es8'</span>.padStart(<span class="hljs-number">7</span>, <span class="hljs-string">'0'</span>);     <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'0000es8'</span>；</code></pre>
<ul><li><p>padEnd：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在字符串后边填充：
    'es8'.padEnd(2);          // 打印'es8'；
    'es8'.padEnd(5);          // 打印'es8  '；
    'es8'.padEnd(6, 'woof');  // 打印'es8woo'；
    'es8'.padEnd(14, 'wow');  // 打印'es8wowwowwowwo'；
    'es8'.padEnd(7, '6');     // 打印'es86666'；
        
//注释：其中第一个参数是目标长度，第二个参数是填充字符串，默认的值是空格。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>在字符串后边填充：
    <span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">2</span>);          <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es8'</span>；
    <span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">5</span>);          <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es8  '</span>；
    <span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">6</span>, <span class="hljs-string">'woof'</span>);  <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es8woo'</span>；
    <span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">14</span>, <span class="hljs-string">'wow'</span>);  <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es8wowwowwowwo'</span>；
    <span class="hljs-string">'es8'</span>.padEnd(<span class="hljs-number">7</span>, <span class="hljs-string">'6'</span>);     <span class="hljs-regexp">//</span> 打印<span class="hljs-string">'es86666'</span>；
        
<span class="hljs-regexp">//</span>注释：其中第一个参数是目标长度，第二个参数是填充字符串，默认的值是空格。</code></pre>
<ul><li><p>Object.values:</p></li></ul>
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
es7求幂运算符和es8简单介绍

## 原文链接
[https://segmentfault.com/a/1190000010280661](https://segmentfault.com/a/1190000010280661)

