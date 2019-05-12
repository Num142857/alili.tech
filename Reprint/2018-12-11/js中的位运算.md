---
title: 'js中的位运算' 
date: 2018-12-11 2:30:10
hidden: true
slug: lzqojns6wu8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>在平常的工作中位运算用得比较少，一般用其他更容易理解得方式去达到相同目的。在计算机内部，一切运算最终都转化成二级制运算，直接使用二级制运算执行得效率是最高的。偶尔看到一道面试题，复习一下这方面知识，先来看一下这道面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 10;
a ^= (1<<4) - 1;
a的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
a ^= (<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">4</span>) - <span class="hljs-number">1</span>;
a的值</code></pre>
<p>题目先放一放，看看js中有哪些位运算。</p>
<h3 id="articleHeader1">1. 位与(&amp;)</h3>
<p>真真为真，其余为假</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9和10二进制位与运算

      1001
    &amp; 1010
    -------
      1000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9</span>和<span class="hljs-number">10</span>二进制位与运算

      <span class="hljs-number">1001</span>
    &amp; <span class="hljs-number">1010</span>
    -------
      <span class="hljs-number">1000</span></code></pre>
<p>由于奇数的二进制末位为1，偶数为0，跟1的位与运算后，分别为1和0，因此可以用位与运算来判断奇偶数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(n &amp; 1) {
    console.log('n为奇数');
} else {
    console.log('n为偶数');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(n &amp; <span class="hljs-number">1</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'n为奇数'</span>);
} <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'n为偶数'</span>);
}</code></pre>
<h3 id="articleHeader2">2. 位或(|)</h3>
<p>假假为假，其余为真</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9和10二进制位或运算

      1001
    | 1010
    -------
      1011" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9</span>和<span class="hljs-number">10</span>二进制位或运算

      <span class="hljs-number">1001</span>
    | <span class="hljs-number">1010</span>
    -------
      <span class="hljs-number">1011</span></code></pre>
<p>整数与0的位或运算，都是本身。浮点数不支持位运算，过程中会自动转化成整数，利用这一点，可以将浮点数与0进行位或运算即可达到取整目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(15.22 | 0); // 15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">15.22</span> | <span class="hljs-number">0</span>); <span class="hljs-comment">// 15</span></code></pre>
<h3 id="articleHeader3">3. 位非(~)</h3>
<p>真为假，假为真</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9二进制位非运算

    ~ 0000000000000000 0000000000001001
    -------取反
      1111111111111111 1111111111110110
    -------符号位不变，其余取反
      1000000000000000 0000000000001001
    -------加1
      1000000000000000 0000000000001010" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9</span>二进制位非运算

    ~ <span class="hljs-number">0000000000000000</span> <span class="hljs-number">0000000000001001</span>
    -------取反
      <span class="hljs-number">1111111111111111</span> <span class="hljs-number">1111111111110110</span>
    -------符号位不变，其余取反
      <span class="hljs-number">1000000000000000</span> <span class="hljs-number">0000000000001001</span>
    -------加<span class="hljs-number">1</span>
      <span class="hljs-number">1000000000000000</span> <span class="hljs-number">0000000000001010</span></code></pre>
<p>按位非操作，首先每一位取反，然后，第一位为负数符号位保持不变，剩余取反加1就是最后结果。</p>
<h3 id="articleHeader4">4. 异或(^)</h3>
<p>相同为假，不同为真</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9和10二进制异或运算

      1001
    | 1010
    -------
      0011" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9</span>和<span class="hljs-number">10</span>二进制异或运算

      <span class="hljs-number">1001</span>
    | <span class="hljs-number">1010</span>
    -------
      <span class="hljs-number">0011</span></code></pre>
<p>可以用于交换两个整数的值，不过一般很少这么用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 3, b = 5;
a ^= b;
b ^= a;
a ^= b;
console.log('a:', a); // 5
console.log('b:', b); // a" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>, b = <span class="hljs-number">5</span>;
a ^= b;
b ^= a;
a ^= b;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a:'</span>, a); <span class="hljs-comment">// 5</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b:'</span>, b); <span class="hljs-comment">// a</span></code></pre>
<h3 id="articleHeader5">5. 有符号左移(&lt;&lt;)</h3>
<p>首位符号为不动，把32位二进制数字整体往左边移动指定位数，左边超出部分被舍去，右边补0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9二进制有符号左移5位
    9<<5
    0000000000000000 0000000000001001
    ------
    0000000000000000 0000000100100000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9</span>二进制有符号左移<span class="hljs-number">5</span>位
    <span class="hljs-number">9</span>&lt;&lt;<span class="hljs-number">5</span>
    <span class="hljs-number">0000000000000000</span> <span class="hljs-number">0000000000001001</span>
    ------
    <span class="hljs-number">0000000000000000</span> <span class="hljs-number">0000000100100000</span></code></pre>
<p>计算机内是这样位移计算的，实际应用计算我们可以通过公式：<code>num * (2^n)</code>，即：<code>9*Math.pow(2,5)</code></p>
<h3 id="articleHeader6">6. 有符号右移(&gt;&gt;)</h3>
<p>首位符号为不动，把32位二进制数字整体往右边移动指定位数，右边超出部分被舍去，左边补0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="288二进制有符号右移5位
    9>>5
    0000000000000000 0000000100100000
    ------
    0000000000000000 0000000000001001" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">288</span>二进制有符号右移<span class="hljs-number">5</span>位
    <span class="hljs-number">9</span>&gt;&gt;<span class="hljs-number">5</span>
    <span class="hljs-number">0000000000000000</span> <span class="hljs-number">0000000100100000</span>
    ------
    <span class="hljs-number">0000000000000000</span> <span class="hljs-number">0000000000001001</span></code></pre>
<p>计算机内是这样位移计算的，实际应用计算我们可以通过公式：<code>num / (2^n)</code>，即：<code>288/Math.pow(2,5)</code></p>
<h3 id="articleHeader7">7. 无符号右移(&gt;&gt;&gt;)</h3>
<p>符号为也跟着一起移动，这样，无符号右移会把负数的二进制当成整数的二进制码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4294967296二进制无有符号右移5位
    4294967296>>>5
    1000000000000000 0000000000000000
    ------
    0000010000000000 0000000000000000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">4294967296</span>二进制无有符号右移<span class="hljs-number">5</span>位
    <span class="hljs-number">4294967296</span>&gt;&gt;&gt;<span class="hljs-number">5</span>
    <span class="hljs-number">1000000000000000</span> <span class="hljs-number">0000000000000000</span>
    ------
    <span class="hljs-number">0000010000000000</span> <span class="hljs-number">0000000000000000</span></code></pre>
<h3 id="articleHeader8">回归面试题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 10;
a ^= (1<<4) - 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
a ^= (<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">4</span>) - <span class="hljs-number">1</span>;</code></pre>
<p><code>1&lt;&lt;4</code>左移4位，即<code>1*Math.pow(2, 4) == 16</code>，则<code>a ^= 15</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10和15的异或运算
    1111
  ^ 1010
 .........
    0101" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">10</span>和<span class="hljs-number">15</span>的异或运算
    <span class="hljs-number">1111</span>
  ^ <span class="hljs-number">1010</span>
 .........
    <span class="hljs-number">0101</span></code></pre>
<p><code>0101</code>二进制表示5，所以a的值位5</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js中的位运算

## 原文链接
[https://segmentfault.com/a/1190000013607145](https://segmentfault.com/a/1190000013607145)

