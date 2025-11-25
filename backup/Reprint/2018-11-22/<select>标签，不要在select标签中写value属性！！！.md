---
title: '<select>标签，不要在select标签中写value属性！！！' 
date: 2018-11-22 11:48:10
hidden: true
slug: qizxwt3y978
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&lt;select&gt;</h3><blockquote>select&#x6807;&#x7B7E;&#xFF0C;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x6846;&#x6807;&#x7B7E;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x4F1A;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x6807;&#x7B7E;&#xFF0C;&#x4F8B;&#x5982;&#x9009;&#x62E9;&#x751F;&#x65E5;19**&#x5E74;&#xFF0C;&#x6216;&#x8005;&#x5728;segmentfault&#x4E2D;&#x7F16;&#x8F91;&#x6587;&#x7AE0;&#x65F6;&#x9009;&#x62E9;&#x2018;&#x539F;&#x521B;&#x2019;&#xFF0C;&#x2018;&#x8F6C;&#x8F7D;&#x2019;&#xFF0C;&#x8FD8;&#x662F;&#x2018;&#x7FFB;&#x8BD1;&#x2019;&#x7B49;&#x7B49;&#xFF0C;&#x7528;&#x5904;&#x76F8;&#x5F53;&#x591A;&#xFF0C;&#x662F;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x539F;&#x751F;&#x9009;&#x62E9;&#x6846;</blockquote><h4>&#x5B83;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#x6839;&#x636E;&#x624B;&#x673A;&#x7684;&#x4E0D;&#x540C;&#x4F1A;&#x6709;&#x6240;&#x4E0D;&#x540C;</h4><p>&#xFF08;1&#xFF09;&#x5728;ios&#x4E2D;&#x8868;&#x73B0;&#x4E3A;&#x5E95;&#x90E8;&#x5F39;&#x51FA;&#x6ED1;&#x52A8;&#x9009;&#x62E9;&#x6846;&#xFF0C;&#x8FDB;&#x884C;&#x6ED1;&#x52A8;&#x9009;&#x62E9;&#xFF0C;&#x5982;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbd1tR?w=270&amp;h=480" src="https://static.alili.tech/img/bVbd1tR?w=270&amp;h=480" alt="ios" title="ios" style="cursor:pointer;display:inline"></span></p><p>&#xFF08;2&#xFF09;&#x5728;&#x6211;&#x7684;&#x5C0F;&#x7C73;&#x624B;&#x673A;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;modal&#x5F39;&#x7A97;&#x5F62;&#x5F0F;&#xFF0C;&#x8FDB;&#x884C;&#x70B9;&#x51FB;&#x70B9;&#x51FB;&#x9009;&#x62E9;&#xFF0C;&#x5982;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbd1lG?w=270&amp;h=480" src="https://static.alili.tech/img/bVbd1lG?w=270&amp;h=480" alt="android" title="android" style="cursor:pointer;display:inline"></span></p><h4>&#x6211;&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x8E29;&#x4E86;&#x4E2A;&#x5751;</h4><p>&#x6211;&#x5728;select&#x6807;&#x7B7E;&#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;value&#xFF0C;&#x7ED1;&#x5B9A;&#x4E86;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5F53;select&#x503C;&#x6539;&#x53D8;&#x65F6;&#x8C03;&#x7528;onchange&#x4E8B;&#x4EF6;&#x6765;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;value&#xFF0C;&#x4ECE;&#x800C;&#x6539;&#x53D8;select&#x6846;&#x9009;&#x4E2D;&#x7684;&#x503C;&#x3002;</p><p>&#x8FD9;&#x6837;&#x505A;&#x4F1A;&#x9020;&#x6210;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x5F39;&#x51FA;&#x9009;&#x62E9;&#x6846;&#xFF0C;&#x9ED8;&#x8BA4;&#x9009;&#x4E2D;&#x7B2C;&#x4E00;&#x9879;&#xFF0C;selectedIndex&#x4E3A;0&#xFF0C;&#x7136;&#x540E;&#x518D;&#x70B9;&#x51FB;&#xFF0C;&#x9009;&#x62E9;&#x5176;&#x4ED6;&#x503C;&#x540E;&#xFF0C;selectedIndex&#x53D8;&#x4E3A;&#x4E86;-1&#xFF0C;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#x5C31;&#x662F;&#xFF0C;&#x5728;&#x5B89;&#x5353;&#x4E2D;&#xFF0C;&#x5F39;&#x51FA;&#x9009;&#x62E9;&#x6846;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x9009;&#x4E2D;&#x503C;&#xFF0C;&#x5728;ios&#x4E2D;&#x5F39;&#x51FA;&#x6846;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x9ED8;&#x8BA4;&#x7B2C;&#x4E00;&#x9879;&#x4E0A;&#x3002;</p><p>&#x5B9E;&#x9645;&#x4E0A;&#x591A;&#x6B64;&#x4E00;&#x4E3E;&#xFF0C;select&#x4F1A;&#x81EA;&#x52A8;&#x5207;&#x6362;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5E76;&#x4FDD;&#x5B58;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x5728;&#x4E0B;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#x540E;&#x9ED8;&#x8BA4;&#x4E3A;&#x4E0A;&#x4E00;&#x6B21;&#x9009;&#x62E9;&#x7684;&#x503C;&#x3002;&#x5B83;&#x5E76;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;value&#x5C5E;&#x6027;&#xFF0C;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;value&#x5C5E;&#x6027;&#xFF0C;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;value&#x5C5E;&#x6027;&#xFF01;&#xFF01;<br>&#x4E0B;&#x9762;&#x7ED9;&#x51FA;w3cSchool&#x7684;&#x6587;&#x6863;&#x8BF4;&#x660E;<br><span class="img-wrap"><img data-src="/img/bVbd1xx?w=1656&amp;h=956" src="https://static.alili.tech/img/bVbd1xx?w=1656&amp;h=956" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
<select>标签，不要在select标签中写value属性！！！

## 原文链接
[https://segmentfault.com/a/1190000015696524](https://segmentfault.com/a/1190000015696524)

