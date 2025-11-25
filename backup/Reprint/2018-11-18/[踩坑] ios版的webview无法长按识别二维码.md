---
title: '[踩坑] ios版的webview无法长按识别二维码' 
date: 2018-11-18 2:30:10
hidden: true
slug: 2g6v86n4ve3
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x73B0;&#x8C61;</h3><p>&#x6700;&#x8FD1;&#x5F00;&#x59CB;&#x7528;vue&#x4E86;&#xFF0C;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x5FAE;&#x4FE1;&#x5185;&#x5D4C;&#x7684;h5&#x9875;&#x9762;&#xFF0C;&#x67D0;&#x4E2A;&#x9875;&#x9762;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x5728;&#x5B89;&#x5353;&#x624B;&#x673A;&#x4E0A;&#x53EF;&#x4EE5;&#x957F;&#x6309;&#x8BC6;&#x522B;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x4F46;&#x662F;ios&#x4E0D;&#x884C;&#x3002;</p><p>&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br>&#x5B89;&#x5353;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x95EE;&#x9898;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeTq6?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVbeTq6?w=1080&amp;h=1920" alt="&#x5B89;&#x5353;&#x6CA1;&#x95EE;&#x9898;" title="&#x5B89;&#x5353;&#x6CA1;&#x95EE;&#x9898;" style="cursor:pointer;display:inline"></span></p><p>ios&#x957F;&#x6309;&#x5C31;&#x4E0D;&#x884C;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeTrd?w=750&amp;h=1334" src="https://static.alili.tech/img/bVbeTrd?w=750&amp;h=1334" alt="ios&#x4E0D;&#x884C;" title="ios&#x4E0D;&#x884C;" style="cursor:pointer;display:inline"></span></p><p>(&#x51FA;&#x4E8E;&#x9690;&#x79C1;&#xFF0C;&#x9A6C;&#x8D5B;&#x514B;&#x4E86;&#x4E2D;&#x95F4;&#x7684;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x89C1;&#x8C05;&#x89C1;&#x8C05;)</p><h3 id="articleHeader1">&#x73AF;&#x5883;</h3><p>&#x6846;&#x67B6;: vue</p><p>&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;: ios</p><h3 id="articleHeader2">&#x89E3;&#x51B3;&#x529E;&#x6CD5;</h3><p>&#x540E;&#x6765;&#x5230;&#x5904;&#x627E;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;google&#xFF0C;&#xFF0C;&#x6392;&#x67E5;&#x4E86;N&#x591A;&#x539F;&#x56E0;&#xFF0C;&#x4EC0;&#x4E48;64px&#x7684;Bug&#xFF0C;&#x4EC0;&#x4E48;&#x4E8C;&#x7EF4;&#x7801;&#x8FC7;&#x5927;&#x8FC7;&#x5C0F;&#x7B49;&#x7B49;&#x7B49;&#x7B49;&#x3002;&#x8054;&#x7CFB;&#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x8005;&#x4E2D;&#x5FC3;&#xFF0C;&#x95EE;&#x9898;&#x7B97;&#x662F;&#x53CD;&#x9988;&#x4E0A;&#x53BB;&#x4E86;&#xFF0C;&#x8BA9;&#x6211;&#x628A;&#x56FE;&#x7247;&#x548C;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E0A;&#x4F20;&#x4E0A;&#x53BB;&#xFF0C;&#x4E5F;&#x4E0A;&#x4F20;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5C31;&#x6CA1;&#x4E0B;&#x6587;&#x4E86;&#x3002;&#xFF08;&#x771F;&#x5FC3;&#x4E0D;&#x60F3;&#x5410;&#x69FD;&#x4E86;&#xFF09;&#x3002;&#x90A3;&#x5C31;&#x81EA;&#x5DF1;&#x4E00;&#x4E2A;&#x4E2A;&#x6392;&#x67E5;&#x95EE;&#x9898;&#x5427;&#xFF0C;&#x65B0;&#x5EFA;vue&#x9879;&#x76EE;&#xFF0C;&#x4E00;&#x4E2A;&#x4E2A;&#x5730;&#x65B9;&#x6539;&#xFF0C;&#x7EC8;&#x4E8E;&#x53D1;&#x73B0;&#x4E86;</p><blockquote>&#x6700;&#x540E;&#xFF01;&#x7EC8;&#x4E8E;&#x53D1;&#x73B0;&#x662F;vue-router&#x7684;&#x539F;&#x56E0;&#x3002;&#x4E3A;&#x4E86;&#x597D;&#x770B;&#x91C7;&#x7528;&#x7684;&#x662F;history&#x7684;&#x6A21;&#x5F0F;&#xFF01;&#x7ED3;&#x679C;&#x53D1;&#x73B0;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;Bug&#x3002;&#x56E0;&#x6B64;&#x5C06;vue-router&#x7684;mode:history&#x53BB;&#x6389;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x7684;&#x662F;hash&#x6A21;&#x5F0F;&#x7684;router&#xFF09;</blockquote><p>(ps: &#x5C0F;&#x58F0;BB, &#x5751;&#x7239;&#x7684;&#x5FAE;&#x4FE1;&#xFF0C;&#x8BF4;&#x6765;&#x8BF4;&#x53BB;&#x4E0D;&#x662F;vue-router&#x7684;&#x9505;&#xFF0C;&#x800C;&#x662F;&#x5FAE;&#x4FE1;&#x81EA;&#x5DF1;&#x7684;&#x9505;&#xFF0C; &#x81F3;&#x4E8E;&#x5177;&#x4F53;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x56E0;&#x4E3A;&#x62FF;&#x4E0D;&#x5230;&#x5FAE;&#x4FE1;&#x90A3;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x81EA;&#x7136;&#x5C31;&#x4E0D;&#x77E5;&#x9053;&#x4E86;&#x3002;&#x3002;&#x53EA;&#x77E5;&#x9053;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x54CE;&#x3002;&#x96BE;&#x53D7;)</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[踩坑] ios版的webview无法长按识别二维码

## 原文链接
[https://segmentfault.com/a/1190000015902492](https://segmentfault.com/a/1190000015902492)

