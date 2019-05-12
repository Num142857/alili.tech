---
title: 'js中的bool值转换及"&&" 、"||"、 "!!"详解' 
date: 2018-12-21 2:30:11
hidden: true
slug: tf2xdywy7ia
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">bool值转换</h2>
<table>
<thead><tr>
<th>数据类型</th>
<th>bool值转化</th>
</tr></thead>
<tbody>
<tr>
<td>undefined</td>
<td>undefined 转化为 false</td>
</tr>
<tr>
<td>Object</td>
<td>null 转化为false，其他为 true</td>
</tr>
<tr>
<td>Boolean</td>
<td>false 转化为 false，true 转化为 true</td>
</tr>
<tr>
<td>Number</td>
<td>0，NaN 转化为false，其他为 true</td>
</tr>
<tr>
<td>String</td>
<td>"" 转化为 false，其他为 true</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">"&amp;&amp;" : 遇到“假”爱就返回</h2>
<blockquote>
<p>javascript中“&amp;&amp;”运算符运算法则如下：</p>
<blockquote>返回遇到的第一个假值（null, undefined, NaN, false, '', 0）或者最后一个值。<br> 如果&amp;&amp;左侧表达式的值为真值，则返回右侧表达式的值；否则返回左侧表达式的值。多个&amp;&amp;表达式一起运算时，返回第一个表达式运算为false的值，如果所有表达式运算结果都为true，则返回最右侧一个表达式运算的值。</blockquote>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aa = {'name': 'xx'};
const bb = aa &amp;&amp; aa.age; // bb输出为undefined;
let cc;
const dd = cc &amp;&amp; cc.name ? cc.name : undefined; // dd输出为undefined
const dd = cc &amp;&amp; cc.name; // dd输出为undefined;
上面两句代码的执行结果是一样的，之前写代码的时候一直用上面的方式，但是发现有些单测覆盖不到，导致单测分支覆盖率很低，换下面的方式就可以很好的解决这个问题，这两句的效果是一样的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> aa = {'name': 'xx'};
<span class="hljs-keyword">const</span> bb = aa &amp;&amp; aa.age; <span class="hljs-comment">// bb输出为undefined;</span>
let <span class="hljs-keyword">cc</span>;
<span class="hljs-keyword">const</span> dd = <span class="hljs-keyword">cc</span> &amp;&amp; <span class="hljs-keyword">cc</span>.name ? <span class="hljs-keyword">cc</span>.name : undefined; <span class="hljs-comment">// dd输出为undefined</span>
<span class="hljs-keyword">const</span> dd = <span class="hljs-keyword">cc</span> &amp;&amp; <span class="hljs-keyword">cc</span>.name; <span class="hljs-comment">// dd输出为undefined;</span>
上面两句代码的执行结果是一样的，之前写代码的时候一直用上面的方式，但是发现有些单测覆盖不到，导致单测分支覆盖率很低，换下面的方式就可以很好的解决这个问题，这两句的效果是一样的。</code></pre>
<h2 id="articleHeader2">"||" ：遇到“真”爱就返回</h2>
<blockquote>
<p>javascript中"||"运算符的运算法则如下：</p>
<blockquote>返回遇到的第一个真值或者最后一个值。<br>如果"||"左侧表达式的值为真值，则返回左侧表达式的值；否则返回右侧表达式的值。多个"||"表达式一起运算时，返回第一个表达式运算结果为true的值，如果所有表达式运算结果都为false，否则返回最右侧的表达式的值。</blockquote>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aa = false || 'xx'; // aa输出为'xx' 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>const aa = <span class="hljs-literal">false</span> <span class="hljs-params">||</span> <span class="hljs-string">'xx'</span>; <span class="hljs-regexp">//</span> aa输出为<span class="hljs-string">'xx'</span> 
</code></pre>
<h2 id="articleHeader3">"!!"</h2>
<blockquote>"!!"将表达式进行强制转化为bool值的运算，运算结果为true或者false。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aa = 'xx';
const bb = !!aa; // bb输出为true
const cc = !!(NaN || undefined || null || 0 || '' ); // cc为false;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>const aa = <span class="hljs-string">'xx'</span>;
const bb = !!aa; <span class="hljs-regexp">//</span> bb输出为<span class="hljs-literal">true</span>
const cc = !!(NaN <span class="hljs-params">||</span> undefined <span class="hljs-params">||</span> null <span class="hljs-params">||</span> <span class="hljs-number">0</span> <span class="hljs-params">||</span> <span class="hljs-string">''</span> ); <span class="hljs-regexp">//</span> cc为<span class="hljs-literal">false</span>;
</code></pre>
<p>我的博客即将搬运同步至腾讯云+社区，邀请大家一同入驻：<a href="https://cloud.tencent.com/developer/support-plan?invite_code=1mkdmtr98460t" rel="nofollow noreferrer" target="_blank">https://cloud.tencent.com/dev...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js中的bool值转换及"&&" 、"||"、 "!!"详解

## 原文链接
[https://segmentfault.com/a/1190000012493781](https://segmentfault.com/a/1190000012493781)

