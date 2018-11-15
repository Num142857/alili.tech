---
title: '【微信小程序】scroll-view，滚动穿透，阻止滚动' 
date: 2018-11-15 21:20:48
hidden: true
slug: lut8sgesn5n
categories: reprint
---

{{< raw >}}
<h1>scroll-view&#x6EDA;&#x52A8;&#x7A7F;&#x900F;&#xFF0C;&#x963B;&#x6B62;&#x6EDA;&#x52A8;</h1><p>&#x9875;&#x9762;&#x5F39;&#x7A97;&#x963B;&#x6B62;&#x6EDA;&#x52A8;&#x662F;&#x4E00;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x5C0F;&#x7A0B;&#x5E8F;scroll-view&#x7684;&#x4E00;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x5F0F;</p><h2>&#x5E38;&#x7528;&#x963B;&#x6B62;&#x6EDA;&#x52A8;&#x65B9;&#x5F0F;</h2><p>&#x5728;&#x4E0D;&#x4F7F;&#x7528;scroll-view&#x7684;&#x5F39;&#x7A97;&#x4E2D;, &#x4E3A;position&#x4E3A;absolute&#x6216;fixed&#x7684;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;catchtouchmove&#x7A7A;&#x4E8B;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x963B;&#x6B62;&#x5F39;&#x7A97;&#x4E0B;&#x7684;&#x9875;&#x9762;&#x56E0;&#x4E8B;&#x4EF6;&#x7A7F;&#x900F;&#x6EDA;&#x52A8;</p><pre><code class="code">&lt;view catchtouchmove=&quot;doNothing&quot;&gt;&lt;/view&gt;</code></pre><p>&#x4E5F;&#x53EF;&#x76F4;&#x63A5;&#x5199;catchtouchmove&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x7ED1;&#x5B9A;&#x4E86;&#x4E8B;&#x4EF6;&#x540D;&#x4E3A;true&#x7684;&#x4E8B;&#x4EF6;</p><h2>&#x95EE;&#x9898;&#x573A;&#x666F;</h2><p>&#x5728;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x5728;absolute&#x6216;fixed&#x7684;&#x7C7B;&#x5F39;&#x7A97;&#x5E03;&#x5C40;&#x4E2D;&#x3002;&#x8981;&#x663E;&#x793A;&#x5217;&#x8868;&#x3001;&#x957F;&#x6587;&#x672C;&#x6BB5;&#x843D;&#x7B49;&#x53EF;&#x6EDA;&#x52A8;&#x5143;&#x7D20;&#xFF0C;&#x5FC5;&#x987B;&#x4F7F;&#x7528;scroll-view&#x7EC4;&#x4EF6;&#xFF0C;&#x65E0;&#x6CD5;&#x963B;&#x6B62;&#x9875;&#x9762;&#x672C;&#x8EAB;&#x7684;&#x6EDA;&#x52A8;</p><h2>&#x89E3;&#x51B3;&#x529E;&#x6CD5;</h2><p>&#x65E2;&#x7136;&#x65E0;&#x6CD5;&#x7B80;&#x5355;&#x7684;&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x7A7F;&#x900F;&#xFF0C;&#x5C31;&#x5728;&#x9875;&#x9762;&#x53EF;&#x6EDA;&#x52A8;&#x7684;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x60F3;&#x60F3;&#x529E;&#x6CD5;&#xFF1A;</p><h3>&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x5143;&#x7D20;</h3><p>&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x7B80;&#x5355;&#x5E03;&#x5C40;&#xFF0C;&#x5728;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x8D85;&#x51FA;&#x4E00;&#x5C4F;&#x65F6;&#xFF0C;&#x6EDA;&#x52A8;&#x7684;&#x5143;&#x7D20;&#x662F;page</p><h3>&#x5982;&#x4F55;&#x8BA9;&#x9875;&#x9762;&#x4E0D;&#x6EDA;&#x52A8;</h3><p>&#x5C06;page&#x7684;&#x9AD8;&#x5EA6;&#x8BBE;&#x4E3A;100%&#xFF0C;&#x9875;&#x9762;&#x6700;&#x5916;&#x5C42;&#x653E;&#x4E00;&#x4E2A;view&#xFF0C;&#x6253;&#x5F00;&#x5F39;&#x7A97;&#x65F6;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;class&#x589E;&#x52A0;&#x6837;&#x5F0F;&#xFF0C;&#x8BBE;&#x9875;&#x9762;&#x9AD8;&#x5EA6;100%&#xFF0C;overflow: hidden&#x6765;&#x505C;&#x6B62;&#x6EDA;&#x52A8;<br>&#x6253;&#x5F00;&#x5F39;&#x7A97;&#x65F6;&#x8BBE;isStopBodyScroll&#x4E3A;true&#xFF0C;&#x5173;&#x95ED;&#x65F6;&#x8BBE;&#x4E3A;false</p><pre><code class="html">&lt;view class=&quot;"{{"isStopBodyScroll ? &apos;scroll-lock&apos; : &apos;&apos;"}}"&quot;&gt;
  &lt;!-- &#x9875;&#x9762;&#x5185;&#x5BB9; --&gt;
&lt;/view&gt;</code></pre><pre><code class="css">.scroll-lock {
  height: 100%;
  overflow-y: hidden;
}</code></pre><h2>&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h2><p>&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x9875;&#x9762;&#x4F1A;&#x56DE;&#x5230;&#x9876;&#x90E8;&#xFF0C;&#x671F;&#x5F85;&#x6709;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x5F0F;&#x6216;&#x5B98;&#x65B9;&#x5BF9;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x63D0;&#x4F9B;&#x652F;&#x6301;</p><p>&#x559C;&#x6B22;&#x7684;&#x8BDD;&#x8BF7;&#x5173;&#x6CE8;&#xFF0C;&#x70B9;&#x8D5E;&#xFF0C;&#x6536;&#x85CF;~&#x8C22;&#x8C22;&#x9605;&#x8BFB;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【微信小程序】scroll-view，滚动穿透，阻止滚动

## 原文链接
[https://segmentfault.com/a/1190000016068127](https://segmentfault.com/a/1190000016068127)

