---
title: 'React 回忆录（一）新的旅程' 
date: 2018-11-23 2:30:10
hidden: true
slug: bnv2ind7isc
categories: [reprint]
---

{{< raw >}}
<p>Hi &#x5404;&#x4F4D;&#xFF0C;&#x597D;&#x4E45;&#x4E0D;&#x89C1; &#x1F44B;&#xFF0C;&#x5373;&#x5C06;&#x9646;&#x7EED;&#x53D1;&#x5E03;&#x7684;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x300A;React &#x56DE;&#x5FC6;&#x5F55;&#x300B;&#x5C06;&#x4F1A;&#x603B;&#x7ED3;&#x6211;&#x5BF9; React &#x6846;&#x67B6;&#x7684;&#x4E00;&#x4E9B;&#x7406;&#x89E3;&#x548C;&#x5FC3;&#x5F97;&#xFF0C;&#x5E0C;&#x671B;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9; React <strong>&#x521D;&#x5B66;&#x8005;</strong>&#x7406;&#x89E3; React &#x6846;&#x67B6;&#x6240;&#x6DB5;&#x76D6;&#x7684;&#x57FA;&#x672C;&#x5185;&#x5BB9;&#x4E0E;&#x5185;&#x5728;&#x903B;&#x8F91;&#x3002;&#x4E5F;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x52A9;&#x62E5;&#x6709; <strong>1~2&#x5E74;</strong> React &#x4F7F;&#x7528;&#x7ECF;&#x9A8C;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x56DE;&#x987E; React &#x4E3B;&#x8981;&#x5185;&#x5BB9;&#x5E76;&#x52A0;&#x6DF1;&#x5BF9; React &#x7684;&#x8BA4;&#x8BC6;&#x548C;&#x7406;&#x89E3;&#x3002;</p><h2 id="articleHeader0">&#x4E00; &#xB7; &#x4E13;&#x9898;&#x5185;&#x5BB9;</h2><p>&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x300A;React &#x56DE;&#x5FC6;&#x5F55;&#x300B;&#x5C06;&#x4F1A;&#x7531;&#x4EE5;&#x4E0B;&#x516D;&#x4E2A;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF1A;</p><ol><li>&#x65B0;&#x7684;&#x65C5;&#x7A0B;&#xFF1A;&#x5305;&#x542B;<strong>&#x4E13;&#x9898;&#x7B80;&#x4ECB;</strong>&#xFF0C;<strong>&#x76EE;&#x5F55;</strong>&#x4E0E;<strong>&#x66F4;&#x65B0;&#x8BA1;&#x5212;</strong>&#xFF1B;</li><li>&#x4E3A;&#x4EC0;&#x4E48;&#x4F7F;&#x7528; React&#xFF1A;&#x4ECB;&#x7ECD;&#x4E86; React &#x7684;&#x4E94;&#x5927;&#x7279;&#x70B9;&#xFF1A;<strong>&#x865A;&#x62DF;DOM</strong>&#xFF0C;<strong>&#x7EC4;&#x4EF6;&#x5316;</strong>&#xFF0C;<strong>&#x58F0;&#x660E;&#x5F0F;&#x4EE3;&#x7801;</strong>&#xFF0C;<strong>&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</strong>&#xFF0C;<strong>JavaScript&#x8BED;&#x6CD5;</strong>&#xFF1B;</li><li>&#x4F7F;&#x7528; React &#x6E32;&#x67D3;&#x754C;&#x9762;&#xFF1A;&#x4ECB;&#x7ECD;&#x4F7F;&#x7528; React &#x751F;&#x6210;&#x754C;&#x9762;&#x5143;&#x7D20;&#x7684;&#x65B9;&#x6CD5;&#xFF1B;</li><li>React &#x4E2D;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF1A;&#x4ECB;&#x7ECD; <code>props</code>&#xFF0C;<code>state</code>&#xFF0C;&#x4EE5;&#x53CA;&#x63A7;&#x5236;&#x7EC4;&#x4EF6;&#x7684;&#x542B;&#x4E49;&#x548C;&#x7528;&#x6CD5;&#xFF1B;</li><li>&#x4F7F;&#x7528;&#x5916;&#x90E8;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x754C;&#x9762;&#xFF1A;&#x4ECB;&#x7ECD; React &#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF1B;</li><li><del>&#x4F7F;&#x7528; React Router &#x7BA1;&#x7406;&#x5E94;&#x7528;&#x8DEF;&#x7531;&#xFF1A;&#x4ECB;&#x7ECD; React Router &#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1B;</del></li></ol><h2 id="articleHeader1">&#x4E8C; &#xB7; &#x66F4;&#x65B0;&#x8BA1;&#x5212;</h2><p>&#x4E13;&#x9898;&#x7AE0;&#x7684;&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;&#x5B89;&#x6392;&#x5982;&#x4E0B;&#xFF1A;&#x4ECE;2018&#x5E74;7&#x6708;13&#x65E5;&#x8D77;&#xFF0C;&#x6BCF;<strong>2</strong>&#x5929;&#x66F4;&#x65B0;&#x4E00;&#x7AE0;&#xFF0C;&#x81F3;2018&#x5E74;7&#x6708;24&#x65E5;&#x5168;&#x90E8;&#x66F4;&#x65B0;&#x5B8C;&#x6BD5;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#x3002;</p><hr><p>PS&#xFF1A;&#x1F50A;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x8BE5;&#x4E13;&#x9898;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x522B;&#x5FD8;&#x4E86;&#x8BA2;&#x9605;&#x672C;&#x4E13;&#x680F;&#xFF0C;&#x786E;&#x4FDD;&#x53CA;&#x65F6;&#x6536;&#x5230;&#x66F4;&#x65B0;&#x901A;&#x77E5;&#x3002;&#x8BB0;&#x5F97;&#x70B9;&#x51FB;&#x4E0B;&#x65B9;&#x1F447;&#x7684;&#x5404;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x8BA9;&#x6211;&#x77E5;&#x9053;&#x4F60;&#x8BA4;&#x53EF;&#x6211;&#x7684;&#x4ED8;&#x51FA;&#xFF0C;&#x8FD9;&#x662F;&#x6FC0;&#x52B1;&#x6211;&#x6301;&#x7EED;&#x4EA7;&#x51FA;&#x7684;&#x52A8;&#x529B;&#x548C;&#x6E90;&#x6CC9; &#x1F60E;&#x3002;</p><p>&#x4E0B;&#x4E2A;&#x7AE0;&#x8282;&#x89C1; &#x1F389; &#x1F64C; &#x1F44B;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 回忆录（一）新的旅程

## 原文链接
[https://segmentfault.com/a/1190000015624440](https://segmentfault.com/a/1190000015624440)

