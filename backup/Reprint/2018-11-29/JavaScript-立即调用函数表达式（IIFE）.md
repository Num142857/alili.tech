---
title: 'JavaScript-立即调用函数表达式（IIFE）' 
date: 2018-11-29 9:33:05
hidden: true
slug: a5p2wgfn216
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x51FD;&#x6570;&#x58F0;&#x660E;&amp;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</h2>
<h3 id="articleHeader1">1.1 &#x51FD;&#x6570;&#x58F0;&#x660E; (&#x51FD;&#x6570;&#x8BED;&#x53E5;)</h3>
<p><span class="img-wrap"><img data-src="/img/bVbbqvT?w=278&amp;h=166" src="https://static.alili.tech/img/bVbbqvT?w=278&amp;h=166" alt="&#x51FD;&#x6570;&#x58F0;&#x660E;" title="&#x51FD;&#x6570;&#x58F0;&#x660E;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;1&#xFF09;&#x4F7F;&#x7528; function &#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x518D;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x53EB;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;JavaScript&#x5F15;&#x64CE;&#x89C4;&#x5B9A;&#xFF0C;&#x5982;&#x679C;function&#x5173;&#x952E;&#x5B57;&#x51FA;&#x73B0;&#x5728;<strong>&#x884C;&#x9996;</strong>&#xFF0C;&#x4E00;&#x5F8B;&#x89E3;&#x91CA;&#x6210;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x8BED;&#x53E5;</p>
<h3 id="articleHeader2">1.2 &#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F; (function expression)</h3>
<p><span class="img-wrap"><img data-src="/img/bVbbqxq?w=278&amp;h=165" src="https://static.alili.tech/img/bVbbqxq?w=278&amp;h=165" alt="&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;" title="&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;1&#xFF09;&#x4F7F;&#x7528; function &#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x540D;&#x79F0;&#x53EF;&#x88AB;&#x7701;&#x7565;&#xFF0C;&#x6B64;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x7684;&#x51FD;&#x6570;&#x662F; <strong>&#x533F;&#x540D;&#x51FD;&#x6570;</strong>&#xFF08;anonymous&#xFF09;&#x3002; &#x51FD;&#x6570;&#x540D;&#x79F0;&#x53EA;&#x662F;&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x3002;</p>
<p>&#xFF08;2&#xFF09;<strong>&#x5C06;&#x533F;&#x540D;&#x51FD;&#x6570;&#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;</strong>&#xFF0C;&#x53EB;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FD9;&#x662F;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x8BED;&#x6CD5;&#x5F62;&#x5F0F;&#x3002;</p>
<h3 id="articleHeader3">1.3 &#x533F;&#x540D;&#x51FD;&#x6570;</h3>
<p>&#xFF08;1&#xFF09;&#x4E0B;&#x9762;&#x662F;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF08;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x540D;&#x5B57;&#xFF09;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbqKl?w=342&amp;h=81" src="https://static.alili.tech/img/bVbbqKl?w=342&amp;h=81" alt="&#x533F;&#x540D;&#x51FD;&#x6570;" title="&#x533F;&#x540D;&#x51FD;&#x6570;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;2&#xFF09;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;<strong>&#x5B9A;&#x4E49;&#x65F6;</strong>&#x4E3A;&#x51FD;&#x6570;&#x547D;&#x540D;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbqLf?w=506&amp;h=81" src="https://static.alili.tech/img/bVbbqLf?w=506&amp;h=81" alt="&#x51FD;&#x6570;&#x547D;&#x540D;" title="&#x51FD;&#x6570;&#x547D;&#x540D;" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;3&#xFF09;&#x547D;&#x540D;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x7684;<strong>&#x597D;&#x5904;</strong>&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x9047;&#x5230;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x5806;&#x6808;&#x8DDF;&#x8E2A;&#x4F1A;&#x663E;&#x793A;&#x51FD;&#x6570;&#x540D;&#xFF0C;<strong>&#x5BB9;&#x6613;&#x5BFB;&#x627E;&#x9519;&#x8BEF;</strong>&#x3002;</p>
<p>&#xFF08;4&#xFF09;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x4F8B;&#x5B50;&#x90FD;&#x4E0D;&#x4EE5;function&#x5F00;&#x5934;&#x3002;<strong>&#x4E0D;&#x4EE5;function&#x5F00;&#x5934;&#x7684;&#x51FD;&#x6570;&#x8BED;&#x53E5;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x5B9A;&#x4E49;</strong>&#x3002;</p>
<h3 id="articleHeader4">1.4 IIFE</h3>
<p>&#xFF08;1&#xFF09;&#x4F46;&#x6709;&#x65F6;&#x9700;&#x8981;&#x5728;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#xFF08;<strong>&#x51FD;&#x6570;&#x53EA;&#x4F7F;&#x7528;&#x4E00;&#x6B21;</strong>&#xFF09;&#x3002;&#x8FD9;&#x79CD;&#x51FD;&#x6570;&#x5C31;&#x53EB;&#x505A;<strong>&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;</strong>&#xFF0C;&#x5168;&#x79F0;&#x4E3A;<strong>&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</strong>IIFE(Imdiately Invoked Function Expression)</p>
<h2 id="articleHeader5">&#x4E8C;&#x3001;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</h2>
<h3 id="articleHeader6">2.1 &#x6982;&#x5FF5;</h3>
<blockquote>&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;IIFE&#xFF09;&#x662F;&#x4E00;&#x4E2A;&#x5728;&#x5B9A;&#x4E49;&#x65F6;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;  JavaScript &#x51FD;&#x6570;&#x3002;</blockquote>
<h3 id="articleHeader7">2.2 &#x7EC4;&#x6210;</h3>
<p>&#xFF08;1&#xFF09;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x88AB;&#x79F0;&#x4E3A; <strong>&#x81EA;&#x6267;&#x884C;&#x533F;&#x540D;&#x51FD;&#x6570; &#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</strong>&#xFF0C;&#x4E3B;&#x8981;&#x5305;&#x542B;&#x4E24;&#x90E8;&#x5206;&#x3002;&#x7B2C;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x5305;&#x56F4;&#x5728; <strong>&#x5706;&#x62EC;&#x53F7;&#x8FD0;&#x7B97;&#x7B26;()</strong> &#x91CC;&#x7684;&#x4E00;&#x4E2A;<strong>&#x533F;&#x540D;&#x51FD;&#x6570;</strong>&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;&#x518D;&#x4E00;&#x6B21;&#x4F7F;&#x7528; <strong>()</strong> &#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<strong>&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</strong>&#xFF0C;JavaScript &#x5F15;&#x64CE;&#x5230;&#x6B64;&#x5C06;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3002;</p>
<h3 id="articleHeader8">2.3 &#x5199;&#x6CD5;</h3>
<p>&#xFF08;1&#xFF09;&#x3010;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E24;&#x79CD;&#x529E;&#x6CD5;&#x3011;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbrjV?w=372&amp;h=137" src="https://static.alili.tech/img/bVbbrjV?w=372&amp;h=137" alt="IIFE" title="IIFE" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;2&#xFF09;&#x3010;&#x5176;&#x4ED6;&#x5199;&#x6CD5;&#x3011;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbrlb?w=830&amp;h=522" src="https://static.alili.tech/img/bVbbrlb?w=830&amp;h=522" alt="IIFE" title="IIFE" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">2.4 &#x62EC;&#x53F7;</h3>
<p>&#xFF08;1&#xFF09;&#x65E0;&#x8BBA;&#x4F55;&#x65F6;&#xFF0C;&#x7ED9;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570; <strong>&#x52A0;&#x4E0A;&#x62EC;&#x53F7;</strong> &#x662F;&#x4E2A;&#x597D;&#x4E60;&#x60EF;&#x3002;</p>
<p>&#xFF08;2&#xFF09;&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x7684;&#x4ECB;&#x7ECD;&#xFF0C;&#x6211;&#x4EEC;&#x5927;&#x6982;&#x4E86;&#x89E3;&#x901A;&#x8FC7;()&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x4E00;&#x4E2A;<strong>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x7ACB;&#x5373;&#x6267;&#x884C;</strong>&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x6709;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x4E0A;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;()&#x4F7F;&#x4E4B;&#x53D8;&#x6210;&#x4E00;&#x4E2A;<strong>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</strong>&#xFF0C;&#x5565;&#x610F;&#x601D;&#xFF1F;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x5176;&#x5B9E;&#x4E0D;&#x52A0;&#x4E0A;()&#x4E5F;<strong>&#x4E0D;&#x4F1A;&#x4FDD;&#x9519;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbsfb?w=409&amp;h=27" src="https://static.alili.tech/img/bVbbsfb?w=409&amp;h=27" alt="IIFE" title="IIFE" style="cursor: pointer;"></span></p>
<p>&#xFF08;4&#xFF09;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4F9D;&#x7136;<strong>&#x63A8;&#x8350;&#x52A0;&#x4E0A;()</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbsfL?w=432&amp;h=26" src="https://static.alili.tech/img/bVbbsfL?w=432&amp;h=26" alt="IIFE" title="IIFE" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;5&#xFF09;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x9605;&#x8BFB;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C; function &#x5185;&#x90E8;&#x4EE3;&#x7801;&#x91CF;&#x5E9E;&#x5927;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x6EDA;&#x52A8;&#x5230;&#x6700;&#x540E;&#x53BB;&#x67E5;&#x770B; function(){} &#x540E; <strong>&#x662F;&#x5426;&#x5E26;&#x6709;()</strong>&#xFF0C;&#x7528;&#x6765;<strong>&#x786E;&#x5B9A; i &#x7684;&#x503C;</strong>&#xFF0C;&#x5E76;&#x5224;&#x65AD;&#x662F; <strong>function</strong> &#x8FD8;&#x662F; function&#x5185;&#x90E8;&#x7684;<strong>&#x8FD4;&#x56DE;&#x503C;</strong>&#x3002;&#x6240;&#x4EE5;&#x4E3A;&#x4E86;<strong>&#x4EE3;&#x7801;&#x7684;&#x53EF;&#x8BFB;&#x6027;</strong>&#xFF0C;&#x8BF7;&#x5C3D;&#x91CF;&#x52A0;&#x4E0A;()&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x662F;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p>
<h3 id="articleHeader10">2.4 &#x4F5C;&#x7528;</h3>
<p>&#xFF08;1&#xFF09;IIFE &#x4E2D;&#x7684;&#x533F;&#x540D;&#x51FD;&#x6570;&#x62E5;&#x6709; <strong>&#x72EC;&#x7ACB;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;</strong>&#x3002;&#x8FD9;&#x4E0D;&#x4EC5;&#x907F;&#x514D;&#x4E86;&#x5916;&#x754C;&#x8BBF;&#x95EE;&#x6B64; IIFE &#x4E2D;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x4E14;&#x53C8;&#x4E0D;&#x4F1A;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#xFF08;&#x53E6;&#x4E00;&#x79CD;&#x8BF4;&#x6CD5; &#x3010;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x9632;&#x6B62;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3011;&#xFF09;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbq40?w=268&amp;h=162" src="https://static.alili.tech/img/bVbbq40?w=268&amp;h=162" alt="IIFE" title="IIFE" style="cursor: pointer; display: inline;"></span></p>
<p>&#xFF08;2&#xFF09;JavaScript <strong>&#x6CA1;&#x7528;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6982;&#x5FF5;</strong>&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5728;&#x591A;&#x4EBA;&#x5F00;&#x53D1;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x4F60;&#x5728;&#x5168;&#x5C40;&#x6216;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x88AB;&#x5176;&#x4ED6;&#x4EBA;&#x4E0D;&#x5C0F;&#x5FC3;&#x7528;&#x540C;&#x540D;&#x7684;&#x53D8;&#x91CF;&#x7ED9; <strong>&#x8986;&#x76D6;</strong>&#xFF0C;&#x6839;&#x636E;JavaScript &#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x6280;&#x672F;&#x53EF;&#x4EE5;&#x6A21;&#x4EFF;&#x4E00;&#x4E2A;&#x79C1;&#x6709;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;<strong>&#x533F;&#x540D;&#x51FD;&#x6570;</strong>&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x201C;&#x5BB9;&#x5668;&#x201D;&#xFF0C;&#x201C;&#x5BB9;&#x5668;&#x201D;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5916;&#x90E8;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x5916;&#x90E8;&#x73AF;&#x5883;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;&#x201C;&#x5BB9;&#x5668;&#x201D;&#x5185;&#x90E8;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5; ( function(){&#x2026;} )() <strong>&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x4E0D;&#x4F1A;&#x548C;&#x5916;&#x90E8;&#x7684;&#x53D8;&#x91CF;&#x53D1;&#x751F;&#x51B2;&#x7A81;</strong>&#xFF0C;&#x4FD7;&#x79F0;&#x201C;&#x533F;&#x540D;&#x5305;&#x88F9;&#x5668;&#x201D;&#x6216;&#x201C;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x201D;&#x3002;</p>
<p>&#xFF08;3&#xFF09;&#x3010;&#x6CE8;&#x610F;&#x3011;&#x5C06; IIFE &#x5206;&#x914D;&#x7ED9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x662F;&#x5B58;&#x50A8; IIFE &#x672C;&#x8EAB;&#xFF0C;&#x800C;&#x662F;<strong>&#x5B58;&#x50A8; IIFE &#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;</strong>&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbq7f?w=316&amp;h=191" src="https://static.alili.tech/img/bVbbq7f?w=316&amp;h=191" alt="IIFE" title="IIFE" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">2.5 &#x793A;&#x4F8B;</h3>
<p>&#x63A5;&#x4E0B;&#x6765;&#x7528;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x5B9E;&#x73B0;&#x6765;&#x66F4;&#x76F4;&#x89C2;&#x5730;&#x8BF4;&#x660E;IIFE&#x7684;&#x7528;&#x9014;&#x3002;&#x5047;&#x8BBE;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x8FD4;&#x56DE;&#x52A0;1&#x7684;&#x4E00;&#x4E2A;&#x6570;&#x5B57;(&#x6570;&#x5B57;&#x521D;&#x59CB;&#x503C;&#x4E3A;0)</p>
<p>&#x3010;1&#x3011;&#x5168;&#x5C40;&#x53D8;&#x91CF;</p>
<p>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6765;&#x4FDD;&#x5B58;&#x8BE5;&#x6570;&#x5B57;&#x72B6;&#x6001;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbspg?w=284&amp;h=160" src="https://static.alili.tech/img/bVbbspg?w=284&amp;h=160" alt="&#x5168;&#x5C40;&#x53D8;&#x91CF;" title="&#x5168;&#x5C40;&#x53D8;&#x91CF;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x3010;2&#x3011;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</p>
<p>&#x4F46;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x53D8;&#x91CF;a&#x5B9E;&#x9645;&#x4E0A;&#x53EA;&#x548C;add&#x51FD;&#x6570;&#x76F8;&#x5173;&#xFF0C;&#x5374;&#x58F0;&#x660E;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x592A;&#x5408;&#x9002;</p>
<p>&#x5C06;&#x53D8;&#x91CF;a&#x66F4;&#x6539;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x66F4;&#x4E3A;&#x6070;&#x5F53;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbsp2?w=284&amp;h=161" src="https://static.alili.tech/img/bVbbsp2?w=284&amp;h=161" alt="&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;" title="&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x3010;3&#x3011;IIFE</p>
<p>&#x5176;&#x5B9E;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x8FD8;&#x662F;&#x6709;&#x95EE;&#x9898;&#x3002;&#x6709;&#x4E9B;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x4F1A;&#x65E0;&#x610F;&#x4E2D;&#x5C06;add.count&#x91CD;&#x7F6E;</p>
<p>&#x4F7F;&#x7528;IIFE&#x628A;&#x8BA1;&#x6570;&#x5668;&#x53D8;&#x91CF;&#x4FDD;&#x5B58;&#x4E3A;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x66F4;&#x5B89;&#x5168;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x5BF9;&#x5168;&#x5C40;&#x7A7A;&#x95F4;&#x7684;&#x6C61;&#x67D3;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbsqa?w=284&amp;h=244" src="https://static.alili.tech/img/bVbbsqa?w=284&amp;h=244" alt="IIFE" title="IIFE" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/u/webing123">&#x9605;&#x8BFB;&#x66F4;&#x591A;</a></p>
<p>&#x53C2;&#x8003;&#x6587;&#x7AE0; </p>
<p><a href="https://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;JavaScript&#x7CFB;&#x5217;&#xFF08;4&#xFF09;&#xFF1A;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F; &#x6C64;&#x59C6;&#x5927;&#x53D4;</a></p>
<p><a href="https://www.cnblogs.com/zichi/p/4401755.html" rel="nofollow noreferrer" target="_blank">&#xFF08;&#x8BD1;&#xFF09;&#x8BE6;&#x89E3;javascript&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;IIFE&#xFF09; &#x97E9;&#x5B50;&#x8FDF;</a></p>
<p><a href="https://www.cnblogs.com/xiaohuochai/p/5731016.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x95ED;&#x5305;&#x7CFB;&#x5217;&#x7B2C;&#x4E09;&#x7BC7;&#x2014;&#x2014;IIFE &#x5C0F;&#x706B;&#x67F4;&#x7684;&#x84DD;&#x8272;&#x7406;&#x60F3;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript-立即调用函数表达式（IIFE）

## 原文链接
[https://segmentfault.com/a/1190000015089341](https://segmentfault.com/a/1190000015089341)

