---
title: '实战Vue简易项目（0）项目需求' 
date: 2018-11-20 2:30:10
hidden: true
slug: yg74a81si5
categories: [reprint]
---

{{< raw >}}
<h2>&#x5F00;&#x573A;&#x767D;</h2><p>&#x91CD;&#x5927;&#x7684;&#x4E8B;&#x60C5;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x915D;&#x917F;&#xFF0C;&#x4E0B;&#x8FB9;&#x662F;&#x6211;&#x7684;&#x9152;...</p><p>&#x5728;&#x8FD9;&#x91CC;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x5B66;&#x4E60;<code>Vue</code>&#x7684;&#x7ECF;&#x9A8C;&#xFF0C;&#x5F88;&#x591A;&#x5185;&#x5BB9;&#x4E5F;&#x662F;&#x5C5E;&#x4E8E;&#x81C6;&#x6D4B;&#x7684;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6000;&#x7591;&#x4E0E;&#x6307;&#x6B63;&#xFF0C;&#x6211;&#x4E5F;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x521D;&#x5B66;&#x8005;&#x3002;</p><blockquote>&#x5C3D;&#x4FE1;&#x4E66;&#x4E0D;&#x5982;&#x65E0;&#x4E66;&#x561B;&#x3002;</blockquote><p>&#x7531;&#x4E8E;&#x4E2A;&#x4EBA;&#x7535;&#x8111;&#x914D;&#x7F6E;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x90FD;&#x662F;&#x5728;<code>win10</code>&#x73AF;&#x5883;&#x4E0B;&#x8FDB;&#x884C;&#x7684;&#xFF0C;<code>Mac || Linux</code>&#x7CFB;&#x7EDF;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x667A;&#x80FD;&#x81EA;&#x884C;&#x8F6C;&#x6362;&#x547D;&#x4EE4;&#x4E86;&#xFF0C;&#x5728;&#x6B64;&#x62B1;&#x6B49;&#x3002;</p><p>&#x9879;&#x76EE;&#x662F;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x539F;&#x578B;&#xFF0C;&#x4E89;&#x53D6;&#x5C3D;&#x53EF;&#x80FD;&#x5168;&#x9762;&#x7684;&#x8BB2;&#x89E3;Vue&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;&#x5C3D;&#x7BA1;&#x5982;&#x6B64;&#xFF0C;&#x4E5F;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x8986;&#x76D6;&#x4E0D;&#x5230;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6DF1;&#x5EA6;&#x4E5F;&#x53EF;&#x80FD;&#x8FBE;&#x4E0D;&#x5230;&#x5927;&#x5BB6;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x671B;&#x5305;&#x6DB5;&#x3002;</p><p><strong>&#x672C;&#x7CFB;&#x5217;&#x53EA;&#x9650;&#x4E8E;&#x6587;&#x7AE0;&#x53D1;&#x8868;&#x65F6;<code>Vue</code>&#x7248;&#x672C;...</strong></p><h2>&#x9879;&#x76EE;&#x539F;&#x578B;</h2><p><span class="img-wrap"><img data-src="/img/bVbetpp?w=920&amp;h=1094" src="https://static.alili.tech/img/bVbetpp?w=920&amp;h=1094" alt="&#x539F;&#x578B;1" title="&#x539F;&#x578B;1"></span></p><p><span class="img-wrap"><img data-src="/img/bVbetpQ?w=375&amp;h=967" src="https://static.alili.tech/img/bVbetpQ?w=375&amp;h=967" alt="&#x539F;&#x578B;2" title="&#x539F;&#x578B;2"></span></p><p><span class="img-wrap"><img data-src="/img/bVbetp4?w=1200&amp;h=1042" src="https://static.alili.tech/img/bVbetp4?w=1200&amp;h=1042" alt="&#x539F;&#x578B;3" title="&#x539F;&#x578B;3"></span></p><p><span class="img-wrap"><img data-src="/img/bVbetp5?w=1884&amp;h=896" src="https://static.alili.tech/img/bVbetp5?w=1884&amp;h=896" alt="&#x539F;&#x578B;4" title="&#x539F;&#x578B;4"></span></p><p>&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x770B;&#x4E00;&#x4E0B;&#x9879;&#x76EE;&#x539F;&#x578B;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x81EA;&#x5DF1;&#xFF0C;&#x4F1A;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5462;&#xFF08;&#x591A;&#x591A;&#x601D;&#x8003;&#x561B;&#xFF09;&#xFF1F;</p><p>&#x5982;&#x679C;&#x5BF9;&#x9879;&#x76EE;&#x6709;&#x4EC0;&#x4E48;&#x7591;&#x95EE;&#xFF0C;&#x53EF;&#x4EE5;&#x63D0;&#x51FA;&#xFF0C;&#x6211;&#x518D;&#x7EC6;&#x5316;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x6211;&#x53EA;&#x60F3;&#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;...</p><p>&#x4E0B;&#x4E00;&#x7AE0;&#xFF0C;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x9879;&#x76EE;&#x5B9E;&#x73B0;...</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Vue简易项目（0）项目需求

## 原文链接
[https://segmentfault.com/a/1190000015803591](https://segmentfault.com/a/1190000015803591)

