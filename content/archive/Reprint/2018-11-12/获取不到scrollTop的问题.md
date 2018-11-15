---
title: 获取不到scrollTop的问题
hidden: true
categories: reprint
slug: 1edbcd7
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>&#x4ECA;&#x5929;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x9700;&#x8981;&#x83B7;&#x53D6;scrollTop&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x8BBA;&#x662F;&#x7528;&#x539F;&#x751F;&#x7684;scrollTop&#x8FD8;&#x662F;JQ&#x7684;scrollTop&#x83B7;&#x53D6;&#x5230;&#x7684;&#x503C;&#x59CB;&#x7EC8;&#x4E3A;0&#x3002;<br>&#x539F;&#x6765;&#x662F;DOCTYPE&#x7684;&#x5751;&#x3002;</p><pre><code>&lt;!DOCTYPE html&gt; //&#x83B7;&#x53D6;scrollTop&#x59CB;&#x7EC8;&#x4E3A;0
&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.01 Transitional//EN&quot;&gt;&#x3000;// &#x53EF;&#x6B63;&#x5E38;&#x83B7;&#x53D6;scrollTop</code></pre><p>&#x6240;&#x4EE5;&#x8BF4;&#xFF0C;&#x6309;&#x7167;W3C&#x6807;&#x51C6;&#x5F00;&#x53D1;&#x662F;&#x591A;&#x4E48;&#x7684;&#x91CD;&#x8981;</p><p>&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x4E0B; scrollTop&#x7684;&#x5DEE;&#x5F02;<br>IE6/7/8&#xFF1A;<br>&#x5BF9;&#x4E8E;&#x6CA1;&#x6709;doctype&#x58F0;&#x660E;&#x7684;&#x9875;&#x9762;&#x91CC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; document.body.scrollTop &#x6765;&#x83B7;&#x53D6; scrollTop&#x9AD8;&#x5EA6; &#xFF1B;<br>&#x5BF9;&#x4E8E;&#x6709;doctype&#x58F0;&#x660E;&#x7684;&#x9875;&#x9762;&#x5219;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; document.documentElement.scrollTop&#xFF1B;<br>Safari:<br>safari &#x6BD4;&#x8F83;&#x7279;&#x522B;&#xFF0C;&#x6709;&#x81EA;&#x5DF1;&#x83B7;&#x53D6;scrollTop&#x7684;&#x51FD;&#x6570; &#xFF1A; window.pageYOffset &#xFF1B;<br>Firefox:<br>&#x706B;&#x72D0;&#x7B49;&#x7B49;&#x76F8;&#x5BF9;&#x6807;&#x51C6;&#x4E9B;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x7701;&#x5FC3;&#x591A;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x7528; document.documentElement.scrollTop &#xFF1B;<br>2&#x3001;&#x83B7;&#x53D6;scrollTop&#x503C;<br>&#x5B8C;&#x7F8E;&#x7684;&#x83B7;&#x53D6;scrollTop &#x8D4B;&#x503C;&#x77ED;&#x8BED; &#xFF1A;</p><pre><code>var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;</code></pre><p>&#x901A;&#x8FC7;&#x8FD9;&#x53E5;&#x8D4B;&#x503C;&#x5C31;&#x80FD;&#x5728;&#x4EFB;&#x4F55;&#x60C5;&#x51B5;&#x4E0B;&#x83B7;&#x5F97;scrollTop &#x503C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
获取不到scrollTop的问题

## 原文链接
[https://segmentfault.com/a/1190000016291735](https://segmentfault.com/a/1190000016291735)

