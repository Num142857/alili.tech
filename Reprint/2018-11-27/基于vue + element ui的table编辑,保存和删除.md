---
title: '基于vue + element ui的table编辑,保存和删除' 
date: 2018-11-27 2:30:12
hidden: true
slug: 6jd5cgllcqr
categories: [reprint]
---

{{< raw >}}
<p><strong>&#x5728;&#x6700;&#x8FD1;2&#x5E74;&#x7684;&#x5DE5;&#x4F5C;&#x4E2D;&#x9047;&#x5230;&#x8FC7;&#x51E0;&#x6B21;&#x5F88;&#x57FA;&#x7840;&#x7684;&#x57FA;&#x4E8E;element-ui&#x7684;table&#x5F00;&#x53D1;,&#x7B80;&#x5355;&#x7684;&#x589E;&#x5220;&#x6539;&#x67E5;&#x529F;&#x80FD;,&#x95F2;&#x4E0B;&#x6765;&#x60F3;&#x6574;&#x7406;&#x4E00;&#x4E0B;~ &#x4EE5;&#x5907;&#x540E;&#x7528;</strong></p><p>vue&#x67B6;&#x5B50;,&#x7528;&#x6700;&#x65B0;&#x7684;vue-cli 3.0,&#x6B64;&#x5904;(...),&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x4E4B;&#x524D;&#x7684;<a href="https://segmentfault.com/a/1190000013676663">almost&#x6700;&#x597D;&#x7684;Vue + Typescript&#x7CFB;&#x5217;01 &#x73AF;&#x5883;&#x642D;&#x5EFA;&#x7BC7;</a></p><p>&#x9879;&#x76EE;&#x57FA;&#x7840;&#x6784;&#x5EFA;&#x597D;&#x4EE5;&#x540E;~</p><blockquote>&#x8FD9;&#x4E2A;&#x5C0F;demo&#x6211;&#x4EEC;&#x6682;&#x4E14;&#x5C06;&#x6570;&#x636E;&#x5B58;&#x5728;localStroage,&#x4E4B;&#x540E;&#x6211;&#x5C06;&#x66F4;&#x65B0;&#x57FA;&#x4E8E;sequelize&#x524D;&#x7AEF;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x5E93;&#x7684;&#x64CD;&#x4F5C;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbcusf?w=2338&amp;h=704" src="https://static.alili.tech/img/bVbcusf?w=2338&amp;h=704" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>1. &#x70B9;&#x51FB;&#x65B0;&#x589E;&#x6309;&#x94AE;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbcth8?w=2150&amp;h=648" src="https://static.alili.tech/img/bVbcth8?w=2150&amp;h=648" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>2. &#x70B9;&#x51FB;&#x4FDD;&#x5B58;&#x6309;&#x94AE;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbcup1?w=2412&amp;h=402" src="https://static.alili.tech/img/bVbcup1?w=2412&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x70B9;&#x51FB;&#x4FDD;&#x5B58;&#x540E;,&#x5C06;&#x8BE5;&#x6761;&#x6570;&#x636E;&#x5199;&#x5165;localstorage</p><p><span class="img-wrap"><img data-src="/img/bVbcupz?w=790&amp;h=143" src="https://static.alili.tech/img/bVbcupz?w=790&amp;h=143" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>3. &#x70B9;&#x51FB;&#x7F16;&#x8F91;&#x6309;&#x94AE;</strong><br>&#x5BF9;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7F16;&#x8F91;</p><p><strong>4. &#x70B9;&#x51FB;&#x5220;&#x9664;&#x6309;&#x94AE;</strong><br>&#x5BF9;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5220;&#x9664;<br><span class="img-wrap"><img data-src="/img/bVbcuqC?w=2308&amp;h=746" src="https://static.alili.tech/img/bVbcuqC?w=2308&amp;h=746" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>5. &#x8FD8;&#x53EF;&#x4EE5;&#x5BF9;&#x5F53;&#x524D;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x4E0A;&#x4E0B;&#x8C03;&#x6574;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbcusl?w=2396&amp;h=558" src="https://static.alili.tech/img/bVbcusl?w=2396&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x57FA;&#x672C;&#x7684;&#x589E;&#x5220;&#x6539;&#x529F;&#x80FD;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x5566;~ &#x9644;&#x4E0A;github&#x4EE3;&#x7801;: <a href="https://github.com/Higginshuangjing/vue-element-table-edit" rel="nofollow noreferrer" target="_blank">vue-element-table-edit</a><br>&#x6B22;&#x8FCE;&#x6307;&#x6B63;.<br><strong>&#x540E;&#x671F;&#x6211;&#x5C06;&#x9646;&#x7EED;&#x66F4;&#x65B0;&#x57FA;&#x4E8E;Nodejs ORM&#x6846;&#x67B6;Sequelize&#x7684;&#x6570;&#x636E;&#x5B58;&#x53D6;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue + element ui的table编辑,保存和删除

## 原文链接
[https://segmentfault.com/a/1190000015330954](https://segmentfault.com/a/1190000015330954)

