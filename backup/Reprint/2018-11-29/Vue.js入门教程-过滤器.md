---
title: 'Vue.js入门教程-过滤器' 
date: 2018-11-29 9:33:05
hidden: true
slug: yx0g64gnax9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x8FC7;&#x6EE4;&#x5668;</h2>
<h3 id="articleHeader1">1.1 &#x6982;&#x8FF0;</h3>
<p>&#xFF08;1&#xFF09;&#x8FC7;&#x6EE4;&#x5668;&#xFF08;Filters&#xFF09;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD; <strong>&#x6267;&#x884C;&#x6587;&#x672C;&#x8F6C;&#x6362;&#x7684;&#x65B9;&#x6CD5;</strong>&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x90FD;&#x8F6C;&#x6362;&#x6210;&#x5927;&#x5199;&#x5B57;&#x6BCD;&#x6216;&#x8005;&#x51E0;&#x4E4E;&#x505A;&#x4EFB;&#x4F55;&#x6211;&#x4EEC;&#x60F3;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x8FC7;&#x6EE4;&#x5668;&#x65E2;&#x53EF;&#x4EE5;&#x5728; <strong>&#x53CC;&#x82B1;&#x62EC;&#x53F7;&#x63D2;&#x503C;</strong> &#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728; v-bind &#x6307;&#x4EE4;&#x7684; <strong>&#x8868;&#x8FBE;&#x5F0F;</strong> &#x4E2D;&#x4F7F;&#x7528;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbmv1?w=470&amp;h=133" src="https://static.alili.tech/img/bVbbmv1?w=470&amp;h=133" alt="&#x8FC7;&#x6EE4;&#x5668;" title="&#x8FC7;&#x6EE4;&#x5668;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1.2 &#x6CE8;&#x610F;</h3>
<p>&#xFF08;1&#xFF09;Vue &#x4E2D;&#x7684;&#x8FC7;&#x6EE4;&#x5668; <strong>&#x4E0D;&#x80FD;&#x66FF;&#x4EE3;</strong> methods&#x3001;computed &#x6216;&#x8005; watch&#xFF0C;&#x56E0;&#x4E3A;&#x8FC7;&#x6EE4;&#x5668; <strong>&#x4E0D;&#x6539;&#x53D8;&#x771F;&#x6B63;&#x7684; data&#xFF0C;&#x800C;&#x53EA;&#x662F;&#x6539;&#x53D8;&#x6E32;&#x67D3;&#x7684;&#x7ED3;&#x679C;</strong>&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8FC7;&#x6EE4;&#x540E;&#x7684;&#x7248;&#x672C;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x5728;&#x5F88;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FC7;&#x6EE4;&#x5668;&#x90FD;&#x662F;&#x6709;&#x7528;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x5C3D;&#x53EF;&#x80FD;&#x4FDD;&#x6301;API&#x54CD;&#x5E94;&#x7684;&#x5E72;&#x51C0;&#xFF0C;&#x5E76;&#x5728;&#x524D;&#x7AEF;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x683C;&#x5F0F;&#x3002;&#x5728;&#x4F60;&#x5E0C;&#x671B;&#x907F;&#x514D;&#x91CD;&#x590D;&#x548C;&#x8FDE;&#x63A5;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4ED6;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x5730;&#x5C01;&#x88C5;&#x6210;&#x53EF;&#x91CD;&#x7528;&#x4EE3;&#x7801;&#x5757;&#x80CC;&#x540E;&#x7684;&#x6240;&#x6709;&#x903B;&#x8F91;&#x3002;</p>
<h2 id="articleHeader3">&#x4E8C;&#x3001;&#x9ED8;&#x8BA4;&#x8FC7;&#x6EE4;&#x5668;</h2>
<p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x662F;&#x7B2C;&#x4E00;&#x6B21;&#x63A5;&#x89E6; Vue&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x77E5;&#x9053; Vue 2.0 &#x4EE5;&#x524D;&#x7684;&#x7248;&#x672C;&#x662F;&#x6709;&#x5185;&#x7F6E;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#xFF0C;&#x4F46;&#x662F;&#x4ED6;&#x4EEC;&#x4ECE; Vue 2.0 &#x7248;&#x672C;&#x4E2D;&#x5220;&#x9664;&#x4E86;&#x3002;</p>
<blockquote>&#x5185;&#x7F6E;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#x662F;&#x6709;&#x7528;&#x7684;&#xFF0C;&#x4F46;&#x5B83;&#x4EEC;&#x7F3A;&#x4E4F;&#x7EAF;JavaScript&#x7684;&#x7075;&#x6D3B;&#x6027;&#x3002;&#x5F53;&#x4E00;&#x4E2A;&#x5185;&#x7F6E;&#x51FD;&#x6570;&#x4E0D;&#x9002;&#x5408;&#x60A8;&#x7684;&#x9700;&#x6C42;&#x65F6;&#xFF0C;&#x60A8;&#x6700;&#x7EC8;&#x4F1A;&#x91CD;&#x65B0;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x529F;&#x80FD;&#xFF08;&#x5728;&#x6700;&#x7EC8;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5185;&#x7F6E;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x6210;&#x65E0;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x6B7B;&#x4EE3;&#x7801;&#xFF09;&#xFF0C;&#x6216;&#x8005;&#x5FC5;&#x987B;&#x7B49;&#x5F85;Vue&#x66F4;&#x65B0;&#x5B83;&#x4EEC;&#x5E76;&#x53D1;&#x5E03;&#x65B0;&#x7248;&#x672C;&#x3002;&#x2014;&#x2014;&#x2014;&#x2014;Vue&#x7684;&#x4F5C;&#x8005;</blockquote>
<h2 id="articleHeader4">&#x4E09;&#x3001;&#x5B9A;&#x4E49;&#x8FC7;&#x6EE4;&#x5668;</h2>
<p>Vue &#x6709;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x65B9;&#x5F0F;&#x6CE8;&#x518C;&#x8FC7;&#x6EE4;&#x5668;&#xFF1A;&#x2460;&#x672C;&#x5730;&#x8FC7;&#x6EE4;&#x5668;&#x2461;&#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x8DE8;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x8BBF;&#x95EE;&#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;&#xFF0C;&#x800C;&#x672C;&#x5730;&#x8FC7;&#x6EE4;&#x5668;&#x53EA;&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x5176;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x3002;</p>
<h3 id="articleHeader5">3.1 &#x672C;&#x5730;&#x8FC7;&#x6EE4;&#x5668;</h3>
<p>&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x4E2A;<strong>&#x7EC4;&#x4EF6;&#x7684;&#x9009;&#x9879;&#x4E2D;</strong>&#x5B9A;&#x4E49;&#x672C;&#x5730;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbmAu?w=667&amp;h=190" src="https://static.alili.tech/img/bVbbmAu?w=667&amp;h=190" alt="&#x672C;&#x5730;&#x8FC7;&#x6EE4;&#x5668;" title="&#x672C;&#x5730;&#x8FC7;&#x6EE4;&#x5668;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">3.2 &#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;</h3>
<p>&#x5728;&#x521B;&#x5EFA;<strong>Vue &#x5B9E;&#x4F8B;&#x4E4B;&#x524D;</strong>&#x5168;&#x5C40;&#x5B9A;&#x4E49;&#x8FC7;&#x6EE4;&#x5668;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbmCV?w=641&amp;h=245" src="https://static.alili.tech/img/bVbbmCV?w=641&amp;h=245" alt="&#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;" title="&#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">3.3 &#x793A;&#x4F8B;</h3>
<p>&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7528;&#x5230;&#x4E86; <strong>capitalize</strong> &#x8FC7;&#x6EE4;&#x5668;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbmEs?w=290&amp;h=128" src="https://static.alili.tech/img/bVbbmEs?w=290&amp;h=128" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<p>&#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;&#x603B;&#x63A5;&#x6536;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C; (<strong>&#x4E4B;&#x524D;&#x7684;&#x64CD;&#x4F5C;&#x94FE;&#x7684;&#x7ED3;&#x679C;</strong>) &#x4F5C;&#x4E3A;<strong>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;</strong>&#x3002;&#x5728;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;capitalize &#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;&#x5C06;&#x4F1A;&#x6536;&#x5230; <strong>message &#x7684;&#x503C;</strong>&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p>
<h2 id="articleHeader8">&#x56DB;&#x3001;&#x8FC7;&#x6EE4;&#x5668;&#x4E32;&#x8FDE;</h2>
<h3 id="articleHeader9">4.1 &#x8BF4;&#x660E;</h3>
<p>&#xFF08;1&#xFF09;&#x8FC7;&#x6EE4;&#x5668;&#x80FD;&#x591F;&#x4F7F;&#x7528;<strong>&#x7BA1;&#x9053;&#xFF08;|&#xFF09;&#x7B26;&#x53F7;</strong>&#x8FDB;&#x884C;&#x4E32;&#x8FDE;&#xFF0C;&#x5E76;&#x901A;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;&#x8FC7;&#x6EE4;&#x5668;&#x8F6C;&#x6362;&#x4E00;&#x4E2A;&#x503C;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbnUp?w=389&amp;h=29" src="https://static.alili.tech/img/bVbbnUp?w=389&amp;h=29" alt="&#x8FC7;&#x6EE4;&#x5668;&#x4E32;&#x8054;" title="&#x8FC7;&#x6EE4;&#x5668;&#x4E32;&#x8054;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;2&#xFF09;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;<strong>filterA</strong> &#x88AB;&#x5B9A;&#x4E49;&#x4E3A;&#x63A5;&#x6536;&#x5355;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;&#xFF0C;&#x8868;&#x8FBE;&#x5F0F; <strong>message</strong> &#x7684;&#x503C;&#x5C06;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x5230;&#x51FD;&#x6570;&#x4E2D;&#x3002;&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x8C03;&#x7528;&#x540C;&#x6837;&#x88AB;&#x5B9A;&#x4E49;&#x4E3A;&#x63A5;&#x6536;&#x5355;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570; <strong>filterB</strong>&#xFF0C;&#x5C06; <strong>filterA</strong> &#x7684;&#x7ED3;&#x679C;&#x4F20;&#x9012;&#x5230; <strong>filterB</strong> &#x4E2D;&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x8FC7;&#x6EE4;&#x5668;&#x662F; JavaScript &#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;<strong>&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x53C2;&#x6570;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbnVX?w=435&amp;h=27" src="https://static.alili.tech/img/bVbbnVX?w=435&amp;h=27" alt="&#x63A5;&#x6536;&#x53C2;&#x6570;" title="&#x63A5;&#x6536;&#x53C2;&#x6570;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;4&#xFF09;&#x8FD9;&#x91CC;&#xFF0C;<strong>filterA</strong> &#x88AB;&#x5B9A;&#x4E49;&#x4E3A;&#x63A5;&#x6536;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;&#x3002;&#x5176;&#x4E2D; <strong>message</strong> &#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x666E;&#x901A;&#x5B57;&#x7B26;&#x4E32; <strong>&apos;arg1&apos;</strong> &#x4F5C;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x8FBE;&#x5F0F; <strong>arg2</strong> &#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p>
<h3 id="articleHeader10">4.2 &#x793A;&#x4F8B;</h3>
<p>&#xFF08;1&#xFF09;&#x82F1;&#x6587;&#x5C0F;&#x5199;&#x8F6C;&#x6362;&#x5927;&#x5199;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbsGp?w=911&amp;h=849" src="https://static.alili.tech/img/bVbbsGp?w=911&amp;h=849" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbbsGr?w=395&amp;h=101" src="https://static.alili.tech/img/bVbbsGr?w=395&amp;h=101" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;2&#xFF09;&#x4EF7;&#x683C;&#x53EA;&#x4FDD;&#x7559;&#x4E24;&#x4F4D;&#x5C0F;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x52A0;&#x4E0A;&#x7F8E;&#x5143;&#x7B26;&#x53F7;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbnWX?w=643&amp;h=686" src="https://static.alili.tech/img/bVbbnWX?w=643&amp;h=686" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbbnXo?w=393&amp;h=98" src="https://static.alili.tech/img/bVbbnXo?w=393&amp;h=98" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/WEBING123/blog" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x591A;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;GitHub&#x5730;&#x5740;</a></p>
<p><a href="https://segmentfault.com/u/webing123">&#x9605;&#x8BFB;&#x66F4;&#x591A;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js入门教程-过滤器

## 原文链接
[https://segmentfault.com/a/1190000015070338](https://segmentfault.com/a/1190000015070338)

