---
title: vue生命周期简记
hidden: true
categories: [reprint]
slug: e4a602bd
date: 2018-11-05 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x5982;&#x9898;&#xFF0C;vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x662F;vue&#x7406;&#x89E3;&#x7684;&#x91CD;&#x8981;&#x4E00;&#x73AF;&#xFF0C;&#x5F04;&#x660E;&#x767D;&#x5B83;&#x4E0D;&#x53EA;&#x4F1A;&#x52A0;&#x6DF1;&#x5BF9;vue&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x4E5F;&#x4F1A;&#x66F4;&#x52A0;&#x5F97;&#x5FC3;&#x5E94;&#x624B;&#xFF0C;&#x5728;&#x6B64;&#x8BB0;&#x5F55;&#x5199;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x4F53;&#x4F1A;&#x5230;&#x7684;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x53EA;&#x662F;&#x603B;&#x7ED3; &#x5E76;&#x4E0D;&#x5168;&#x9762;&#xFF0C;&#x60F3;&#x8981;&#x8BE6;&#x7EC6;&#x5B66;&#x4E60;&#x7F51;&#x4E0A;&#x5173;&#x4E8E;vue&#x751F;&#x547D;&#x5468;&#x671F;&#x5B66;&#x4E60;&#x7684;&#x6587;&#x7AE0;&#x5F88;&#x4E30;&#x5BCC;</p><p>&lt;!--more--&gt;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016622555?w=1200&amp;h=3039" src="https://static.alili.tech/img/remote/1460000016622555?w=1200&amp;h=3039" alt="lifecycle.png" title="lifecycle.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x751F;&#x547D;&#x5468;&#x671F;</h2><ul><li><strong>beforeCreate</strong>&#xFF1A;&#x521B;&#x5EFA;&#x524D;&#xFF0C;new&#x64CD;&#x4F5C;&#xFF0C;&#x5DF2;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD8;&#x6CA1;&#x6709;&#x6570;&#x636E;&#xFF0C;&#x4E0D;&#x80FD;&#x5904;&#x7406;&#x6570;&#x636E;</li><li><strong>created</strong>&#xFF1A;&#x521B;&#x5EFA;&#xFF0C;&#x53EF;&#x4EE5;&#x5904;&#x7406;&#x6570;&#x636E;</li><li><strong>beforeMounted</strong>&#xFF1A;&#x6302;&#x8F7D;&#x524D;&#xFF0C;&#x51C6;&#x5907;&#x628A;&#x521B;&#x5EFA;&#x7684;&#x6302;&#x8F7D;&#x5230;el&#x4E0A;&#xFF0C;&#x6709;el&#x624D;&#x53BB;&#x6267;&#x884C;&#x6302;&#x8F7D;<br>&#x6302;&#x8F7D;&#x524D;&#x7684;el&#x4ECD;&#x662F;&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</li><li>&#x6709;template&#x8F6C;&#x5316;&#x540E;&#x6267;&#x884C;render funcion&#x518D;&#x53BB;&#x6E32;&#x67D3;<br>cli&#x4E2D;&#x7684;.vue&#x6587;&#x4EF6;&#x4E2D;&#x7684;template&#x662F;&#x901A;&#x8FC7;vue-loader&#x76F4;&#x63A5;&#x8F6C;&#x5316;&#x76F4;&#x63A5;&#x6267;&#x884C;render funcion&#x7684;&#x51CF;&#x5C11;&#x8017;&#x65F6;</li><li><strong>mounted</strong>&#xFF1A;&#x6302;&#x8F7D;&#xFF0C;&#x6302;&#x8F7D;&#x540E;$el&#x5C31;&#x662F;&#x6E32;&#x67D3;&#x540E;&#x7684;&lt;div&gt;123&lt;/div&gt;&#xFF0C;&#x6302;&#x8F7D;&#x524D;&#x540E;&#x4E2D;&#x95F4;&#x6267;&#x884C;render funcion</li><li><strong>beforeUpdated</strong>&#xFF1A;&#x66F4;&#x65B0;&#x524D;&#xFF0C;&#x6570;&#x636E;&#x53D8;&#x5316;</li><li><strong>updated</strong>&#xFF1A;&#x66F4;&#x65B0;</li><li><strong>beforeDestroy</strong>&#xFF1A;&#x9500;&#x6BC1;&#x524D;&#xFF0C;&#x7EC4;&#x4EF6;&#x88AB;&#x9500;&#x6BC1;&#xFF0C;&#x6216;&#x624B;&#x52A8;&#x9500;&#x6BC1;</li><li><strong>destroy</strong>&#xFF1A;&#x9500;&#x6BC1;</li></ul><p><em>&#x6CE8;&#xFF1A;</em><br>&#x6302;&#x8F7D;&#x524D;&#x7684;&#x94A9;&#x5B50;&#x91CC;&#x83B7;&#x53D6;&#x4E0D;&#x5230;<strong>el</strong>&#x7684;&#xFF0C;&#x60F3;&#x5BF9;&#x5982;<strong>data</strong>&#x4E2D;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x6700;&#x65E9;&#x8981;&#x5728;<strong>created</strong>&#x91CC;&#xFF1B;<br>&#x4E00;&#x822C;&#x5728;<strong>created</strong>&#x548C;<strong>mounted</strong>&#x94A9;&#x5B50;&#x91CC;&#x5199;&#x4E00;&#x4E9B;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x524D;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#xFF1B;<br>&#x6709;&#x4E9B;&#x4F20;&#x7EDF;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x5728;&#x4F7F;&#x7528;&#x540E;&#x9700;&#x8981;&#x5728;&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x65F6;&#x624B;&#x52A8;&#x5220;&#x9664;&#x5176;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x5728;<strong>destroy</strong>&#x4E2D;</p><p>&lt;!--more--&gt;</p><p>&#x6CA1;&#x6709;&#x4EE3;&#x7801;<br><strong>&#x6700;&#x540E;&#x9644;&#x4E0A;&#x4E00;&#x5F20;&#x4EE5;&#x524D;&#x770B;&#x5230;&#x7684;&#x4E00;&#x5F20;&#x56FE;</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000016622556" src="https://static.alili.tech/img/remote/1460000016622556" alt="&#x751F;&#x547D;&#x5468;&#x671F;&#x8868;.png" title="&#x751F;&#x547D;&#x5468;&#x671F;&#x8868;.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue生命周期简记

## 原文链接
[https://segmentfault.com/a/1190000016622552](https://segmentfault.com/a/1190000016622552)

