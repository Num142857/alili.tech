---
title: '简单理解 word-wrap、word-break 和 white-space 的区别' 
date: 2018-11-23 2:30:10
hidden: true
slug: m62c31icax
categories: [reprint]
---

{{< raw >}}
<p>&#x4E0D;&#x8BBE;&#x7F6E;<code>word-warp</code>&#x548C;<code>word-break</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x884C;&#x5355;&#x8BCD;&#xFF0C;&#x8D85;&#x8FC7;&#x4E86;&#x5BB9;&#x5668;&#x7684;&#x5BBD;&#x5EA6;&#x662F;&#xFF0C;&#x4F1A;&#x5C06;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5355;&#x8BCD;&#x4E0B;&#x79FB;&#x4E00;&#x884C;&#x8FDB;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x5982;&#x679C;&#x4E0B;&#x79FB;&#x7684;&#x90A3;&#x4E2A;&#x5355;&#x8BCD;&#x957F;&#x5EA6;&#x8FD8;&#x662F;&#x8D85;&#x8FC7;&#x4E86;&#x5BB9;&#x5668;&#x5BBD;&#x5EA6;&#xFF0C;&#x5219;&#x4F1A;&#x6EA2;&#x51FA;</p><h3 id="articleHeader0">word-warp</h3><p>&#x8BBE;&#x7F6E;<code>word-warp: break-word</code>&#x65F6;&#xFF0C;&#x5148;&#x628A;<strong>&#x957F;&#x5355;&#x8BCD;&#x79FB;&#x52A8;&#x5230;&#x4E0B;&#x4E00;&#x884C;</strong>&#xFF0C;&#x7136;&#x540E;&#x5982;&#x679C;&#x8FD8;&#x662F;&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x5BBD;&#x5EA6;&#xFF0C;&#x5219;&#x8FDB;&#x884C;&#x5355;&#x8BCD;&#x5185;&#x7684;&#x65AD;&#x53E5;&#x6362;&#x884C;</p><blockquote>&#x540E;&#x9762;&#x7684;&#x5355;&#x8BCD;&#x540C;&#x4E0A;&#x8FF0;&#x89C4;&#x5219;</blockquote><h3 id="articleHeader1">word-break</h3><p>&#x5F53;&#x4E0A;&#x8FF0;&#x60C5;&#x51B5;&#xFF0C;&#x957F;&#x5355;&#x8BCD;&#x79FB;&#x52A8;&#x5230;&#x4E0B;&#x4E00;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7B2C;&#x4E00;&#x884C;&#x4F1A;&#x6709;&#x4E00;&#x5B9A;&#x7A7A;&#x4F59;&#x7684;&#x7A7A;&#x95F4;&#xFF0C;&#x8F83;&#x4E3A;&#x6D6A;&#x8D39;&#x8D44;&#x6E90;&#x3002;<br>&#x4E8E;&#x662F;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;<code>word-break: break-all</code>&#xFF0C;<strong>&#x957F;&#x5355;&#x8BCD;&#x4E0D;&#x79FB;&#x52A8;&#x5230;&#x4E0B;&#x4E00;&#x884C;</strong>&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x5F53;&#x524D;&#x884C;&#x8FDB;&#x884C;&#x65AD;&#x53E5;&#x6362;&#x884C;</p><h3 id="articleHeader2">white-space</h3><p>&#x4F5C;&#x7528;&#x4E8E;&#x7A7A;&#x683C;&#x548C;&#x56DE;&#x8F66;&#xFF0C;&#x7528;&#x4E8E;&#x63A7;&#x5236;&#x7A7A;&#x683C;&#x662F;&#x5426;&#x5408;&#x5E76;&#x3001;&#x56DE;&#x8F66;&#x662F;&#x5426;&#x53EF;&#x6298;&#x884C;&#x3001;&#x53E5;&#x5B50;&#x592A;&#x957F;&#x662F;&#x5426;&#x5728;&#x7A7A;&#x683C;&#x5904;&#x6298;&#x884C;</p><p>&#x5E38;&#x7528;&#x53D6;&#x503C;&#x4E0D;&#x540C;&#x7684;&#x4F5C;&#x7528;&#xFF1A;</p><ul><li>normal: &#x9ED8;&#x8BA4;&#x3002;&#x7A7A;&#x767D;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x5FFD;&#x7565;&#x3002;</li><li>pre: &#x7A7A;&#x767D;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x4FDD;&#x7559;&#x3002;&#x5176;&#x884C;&#x4E3A;&#x65B9;&#x5F0F;&#x7C7B;&#x4F3C; HTML &#x4E2D;&#x7684;<code>&lt;pre&gt;</code>&#x6807;&#x7B7E;&#x3002;</li><li>nowrap: &#x6587;&#x672C;&#x4E0D;&#x4F1A;&#x6362;&#x884C;&#xFF0C;&#x6587;&#x672C;&#x4F1A;&#x5728;&#x5728;&#x540C;&#x4E00;&#x884C;&#x4E0A;&#x7EE7;&#x7EED;&#xFF0C;&#x76F4;&#x5230;&#x9047;&#x5230;<code>&lt;br&gt;</code>&#x6807;&#x7B7E;&#x4E3A;&#x6B62;&#x3002;</li><li>pre-wrap: &#x4FDD;&#x7559;&#x7A7A;&#x767D;&#x7B26;&#x5E8F;&#x5217;&#xFF0C;&#x4F46;&#x662F;&#x6B63;&#x5E38;&#x5730;&#x8FDB;&#x884C;&#x6362;&#x884C;&#x3002;</li><li>pre-line: &#x5408;&#x5E76;&#x7A7A;&#x767D;&#x7B26;&#x5E8F;&#x5217;&#xFF0C;&#x4F46;&#x662F;&#x4FDD;&#x7559;&#x6362;&#x884C;&#x7B26;&#x3002;</li><li>inherit: &#x89C4;&#x5B9A;&#x5E94;&#x8BE5;&#x4ECE;&#x7236;&#x5143;&#x7D20;&#x7EE7;&#x627F; white-space &#x5C5E;&#x6027;&#x7684;&#x503C;&#x3002;</li></ul><p>&#x53C2;&#x8003;&#x6587;&#x7AE0;</p><blockquote><ul><li><a href="https://www.cnblogs.com/2050/archive/2012/08/10/2632256.html" rel="nofollow noreferrer" target="_blank">&#x4F60;&#x771F;&#x7684;&#x4E86;&#x89E3;word-wrap&#x548C;word-break&#x7684;&#x533A;&#x522B;&#x5417;&#xFF1F;</a></li><li><a href="https://blog.csdn.net/emilyOrchid/article/details/51546258" rel="nofollow noreferrer" target="_blank">white-space&#x3001;word-wrap&#x548C;word-break&#x533A;&#x522B;</a></li></ul></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单理解 word-wrap、word-break 和 white-space 的区别

## 原文链接
[https://segmentfault.com/a/1190000015629352](https://segmentfault.com/a/1190000015629352)

