---
title: 'videojs 播放无法通过URI确定格式的视频源(flv/mp4)' 
date: 2018-11-23 2:30:11
hidden: true
slug: bo2mpbr7xrh
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x524D;&#x4EBA;&#x5751;&#x6211;&#x5343;&#x767E;&#x904D;&#x6211;&#x5F85;&#x524D;&#x4EBA;&#x5982;&#x521D;&#x604B;&#x3002;&#x6700;&#x8FD1;&#x516C;&#x53F8;&#x5F00;&#x6E90;&#x8282;&#x6D41;&#x642C;&#x673A;&#x623F;&#xFF0C;&#x9700;&#x8981;&#x628A;&#x539F;&#x6765;&#x7684;&#x670D;&#x52A1;&#x8FC1;&#x79FB;&#xFF0C;&#x7136;&#x540E;&#x5C41;&#x98A0;&#x5C41;&#x98A0;&#x7684;&#x628A;&#x4E00;&#x4E2A;&#x8DD1;&#x4E86;&#x51E0;&#x5E74;&#x6CA1;&#x4EBA;&#x7BA1;&#x7684;&#x89C6;&#x9891;&#x7F51;&#x7AD9;&#xFF08;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;&#x4EBA;&#x90FD;&#x8D70;&#x4E86;&#xFF09;&#x8FC1;&#x79FB;&#x5230;&#x65B0;&#x7684;&#x673A;&#x623F;&#x53BB;&#x3002;</p><p>&#x7ED3;&#x679C;&#x8DD1;&#x8D77;&#x6765;&#x53D1;&#x73B0;&#x539F;&#x6765;&#x91CC;&#x9762;&#x540C;&#x65F6;&#x5B58;&#x5728;<code>flv/mp4</code>&#x683C;&#x5F0F;&#x89C6;&#x9891;&#xFF0C;&#x5E76;&#x4E14;&#x539F;&#x6765;&#x7EBF;&#x4E0A;<code>flv</code>&#x7684;&#x89C6;&#x9891;&#x662F;&#x64AD;&#x4E0D;&#x4E86;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x5728;<code>url</code>&#x4E0A;&#x662F;&#x6CA1;&#x6709;&#x4F53;&#x73B0;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x4E00;&#x4E2A;<code>java</code>&#x9879;&#x76EE;(&#x6211;&#x4E0D;&#x4F1A;)&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x6E90;&#x7801;&#xFF0C;&#x6211;&#x7684;&#x5185;&#x5FC3;&#x5168;&#x662F;&#x8349;&#x62DF;&#x9A6C;&#x3002;</p><p>&#x8FD8;&#x597D;&#x7528;&#x7684;&#x662F;<code>FreeMarker</code>&#x6A21;&#x677F;&#x5F15;&#x64CE;&#xFF0C;&#x8981;&#x662F;&#x4E00;&#x4E2A;&#x50CF;<code>ASP</code>&#x8FD9;&#x6837;&#x4F1A;&#x7F16;&#x8F91;&#x8FDB;&#x53BB;&#x7684;&#x73A9;&#x610F;&#xFF0C;&#x90A3;&#x6211;&#x771F;&#x662F;&#x6B7B;&#x90FD;&#x6B7B;&#x4E0D;&#x51FA;&#x6765;&#x3002;</p><h2 id="articleHeader1">&#x603B;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#x662F;&#x5728;&#x516C;&#x5171;&#x573A;&#x6240;<strong>&#x5BF9;&#x6316;&#x5751;&#x7684;&#x4EBA;&#x53D1;&#x6CC4;&#x5FC3;&#x4E2D;&#x7684;&#x4E0D;&#x6EE1;</strong>&#xFF0C;&#x987A;&#x4FBF;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x7528;<code>videojs</code>&#x5728;&#x8D44;&#x6E90;&#x51FA;&#x9519;&#x65F6;&#x5207;&#x6362;&#x5176;&#x4ED6;&#x5907;&#x7528;&#x8D44;&#x6E90;&#x3002;</p><p>&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x9996;&#x5148;&#x652F;&#x6301;<code>flv</code>&#x64AD;&#x653E;&#xFF0C;&#x5176;&#x6B21;&#x51FA;&#x9519;&#x65F6;&#x5207;&#x6362;&#x8D44;&#x6E90;&#x3002;</p><h2 id="articleHeader2">&#x793A;&#x4F8B;&#x4EE3;&#x7801;</h2><p><a href="http://jsfiddle.net/qogLkyc9/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/qogLkyc9/</a><button class="btn btn-xs btn-default ml10 preview" data-url="qogLkyc9/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
videojs 播放无法通过URI确定格式的视频源(flv/mp4)

## 原文链接
[https://segmentfault.com/a/1190000015603600](https://segmentfault.com/a/1190000015603600)

