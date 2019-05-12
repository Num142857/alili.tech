---
title: '前端面试题（4）JavaScript' 
date: 2018-11-29 9:27:38
hidden: true
slug: ygql63uh75
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x9898;JavaScript&#xFF08;&#x4E00;&#xFF09;</h3>
<hr>
<p><strong>JavaScript&#x7684;&#x7EC4;&#x6210;</strong></p>
<ul><li>
<p>JavaScript &#x7531;&#x4EE5;&#x4E0B;&#x4E09;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF1A;</p>
<ul>
<li>ECMAScript&#xFF08;&#x6838;&#x5FC3;&#xFF09;&#xFF1A;JavaScript &#x8BED;&#x8A00;&#x57FA;&#x7840;</li>
<li>DOM&#xFF08;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF09;&#xFF1A;&#x89C4;&#x5B9A;&#x4E86;&#x8BBF;&#x95EE;HTML&#x548C;XML&#x7684;&#x63A5;&#x53E3;</li>
<li>BOM&#xFF08;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF09;&#xFF1A;&#x63D0;&#x4F9B;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x7684;&#x5BF9;&#x8C61;&#x548C;&#x65B9;&#x6CD5;</li>
</ul>
</li></ul>
<p><strong>JS&#x7684;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x548C;&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;</strong></p>
<ul>
<li>&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF1A;undefined&#x3001;null&#x3001;boolean&#x3001;number&#x3001;string&#x3001;symbol</li>
<li>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF1A;object&#x3001;array&#x3001;function</li>
</ul>
<p><strong>&#x68C0;&#x6D4B;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#x7248;&#x672C;&#x6709;&#x54EA;&#x4E9B;&#x65B9;&#x5F0F;&#xFF1F;</strong></p>
<ul>
<li>&#x6839;&#x636E; navigator.userAgent   //  UA.toLowerCase().indexOf(&apos;chrome&apos;)</li>
<li>&#x6839;&#x636E; window &#x5BF9;&#x8C61;&#x7684;&#x6210;&#x5458;       // &apos;ActiveXObject&apos; in window</li>
</ul>
<p><strong>&#x4ECB;&#x7ECD;JS&#x6709;&#x54EA;&#x4E9B;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#xFF1F;</strong></p>
<ul>
<li>&#x6570;&#x636E;&#x5C01;&#x88C5;&#x7C7B;&#x5BF9;&#x8C61;&#xFF1A;Object&#x3001;Array&#x3001;Boolean&#x3001;Number&#x3001;String</li>
<li>&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF1A;Function&#x3001;Arguments&#x3001;Math&#x3001;Date&#x3001;RegExp&#x3001;Error</li>
<li>ES6&#x65B0;&#x589E;&#x5BF9;&#x8C61;&#xFF1A;Symbol&#x3001;Map&#x3001;Set&#x3001;Promises&#x3001;Proxy&#x3001;Reflect</li>
</ul>
<p><strong>&#x8BF4;&#x51E0;&#x6761;&#x5199;JavaScript&#x7684;&#x57FA;&#x672C;&#x89C4;&#x8303;&#xFF1F;</strong></p>
<ul>
<li>&#x4EE3;&#x7801;&#x7F29;&#x8FDB;&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x201C;&#x56DB;&#x4E2A;&#x7A7A;&#x683C;&#x201D;&#x7F29;&#x8FDB;</li>
<li>&#x4EE3;&#x7801;&#x6BB5;&#x4F7F;&#x7528;&#x82B1;&#x62EC;&#x53F7;{}&#x5305;&#x88F9;</li>
<li>&#x8BED;&#x53E5;&#x7ED3;&#x675F;&#x4F7F;&#x7528;&#x5206;&#x53F7;;</li>
<li>&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x5728;&#x4F7F;&#x7528;&#x524D;&#x8FDB;&#x884C;&#x58F0;&#x660E;</li>
<li>&#x4EE5;&#x5927;&#x5199;&#x5B57;&#x6BCD;&#x5F00;&#x5934;&#x547D;&#x540D;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5168;&#x5927;&#x5199;&#x547D;&#x540D;&#x5E38;&#x91CF;</li>
<li>&#x89C4;&#x8303;&#x5B9A;&#x4E49;JSON&#x5BF9;&#x8C61;&#xFF0C;&#x8865;&#x5168;&#x53CC;&#x5F15;&#x53F7;</li>
<li>&#x7528;{}&#x548C;[]&#x58F0;&#x660E;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;</li>
</ul>
<p><strong>&#x5982;&#x4F55;&#x7F16;&#x5199;&#x9AD8;&#x6027;&#x80FD;&#x7684;JavaScript&#xFF1F;</strong></p>
<ul>
<li>&#x9075;&#x5FAA;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF1A;&quot;use strict&quot;;</li>
<li>&#x5C06;js&#x811A;&#x672C;&#x653E;&#x5728;&#x9875;&#x9762;&#x5E95;&#x90E8;&#xFF0C;&#x52A0;&#x5FEB;&#x6E32;&#x67D3;&#x9875;&#x9762;</li>
<li>&#x5C06;js&#x811A;&#x672C;&#x5C06;&#x811A;&#x672C;&#x6210;&#x7EC4;&#x6253;&#x5305;&#xFF0C;&#x51CF;&#x5C11;&#x8BF7;&#x6C42;</li>
<li>&#x4F7F;&#x7528;&#x975E;&#x963B;&#x585E;&#x65B9;&#x5F0F;&#x4E0B;&#x8F7D;js&#x811A;&#x672C;</li>
<li>&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x6765;&#x4FDD;&#x5B58;&#x5168;&#x5C40;&#x53D8;&#x91CF;</li>
<li>&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x4F7F;&#x7528;&#x95ED;&#x5305;</li>
<li>&#x4F7F;&#x7528; window &#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x7701;&#x7565; window</li>
<li>&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x5BF9;&#x8C61;&#x6210;&#x5458;&#x5D4C;&#x5957;</li>
<li>&#x7F13;&#x5B58; DOM &#x8282;&#x70B9;&#x7684;&#x8BBF;&#x95EE;</li>
<li>&#x901A;&#x8FC7;&#x907F;&#x514D;&#x4F7F;&#x7528; eval() &#x548C; Function() &#x6784;&#x9020;&#x5668;</li>
<li>&#x7ED9; setTimeout() &#x548C; setInterval() &#x4F20;&#x9012;&#x51FD;&#x6570;&#x800C;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;</li>
<li>&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x76F4;&#x63A5;&#x91CF;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;</li>
<li>&#x6700;&#x5C0F;&#x5316;&#x91CD;&#x7ED8;(repaint)&#x548C;&#x56DE;&#x6D41;(reflow)</li>
</ul>
<p><strong>&#x63CF;&#x8FF0;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;&#xFF0C;DOM&#x6811;&#x548C;&#x6E32;&#x67D3;&#x6811;&#x7684;&#x533A;&#x522B;&#xFF1F;</strong></p>
<ul>
<li>
<p>&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;&#xFF1A;</p>
<ul>
<li>&#x89E3;&#x6790;HTML&#x6784;&#x5EFA; DOM(DOM&#x6811;)&#xFF0C;&#x5E76;&#x884C;&#x8BF7;&#x6C42; css/image/js</li>
<li>CSS &#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#xFF0C;&#x5F00;&#x59CB;&#x6784;&#x5EFA; CSSOM(CSS&#x6811;)</li>
<li>CSSOM &#x6784;&#x5EFA;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x548C; DOM &#x4E00;&#x8D77;&#x751F;&#x6210; Render Tree(&#x6E32;&#x67D3;&#x6811;)</li>
<li>&#x5E03;&#x5C40;(Layout)&#xFF1A;&#x8BA1;&#x7B97;&#x51FA;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;</li>
<li>&#x663E;&#x793A;(Painting)&#xFF1A;&#x901A;&#x8FC7;&#x663E;&#x5361;&#x628A;&#x9875;&#x9762;&#x753B;&#x5230;&#x5C4F;&#x5E55;&#x4E0A;</li>
</ul>
</li>
<li>
<p>DOM&#x6811; &#x548C; &#x6E32;&#x67D3;&#x6811; &#x7684;&#x533A;&#x522B;&#xFF1A;</p>
<ul>
<li>DOM&#x6811;&#x4E0E;HTML&#x6807;&#x7B7E;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#xFF0C;&#x5305;&#x62EC;head&#x548C;&#x9690;&#x85CF;&#x5143;&#x7D20;</li>
<li>&#x6E32;&#x67D3;&#x6811;&#x4E0D;&#x5305;&#x62EC;head&#x548C;&#x9690;&#x85CF;&#x5143;&#x7D20;&#xFF0C;&#x5927;&#x6BB5;&#x6587;&#x672C;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x884C;&#x90FD;&#x662F;&#x72EC;&#x7ACB;&#x8282;&#x70B9;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x90FD;&#x6709;&#x5BF9;&#x5E94;&#x7684;css&#x5C5E;&#x6027;</li>
</ul>
</li>
</ul>
<p><strong>&#x91CD;&#x7ED8;&#x548C;&#x56DE;&#x6D41;&#xFF08;&#x91CD;&#x6392;&#xFF09;&#x7684;&#x533A;&#x522B;&#x548C;&#x5173;&#x7CFB;&#xFF1F;</strong></p>
<ul>
<li>&#x91CD;&#x7ED8;&#xFF1A;&#x5F53;&#x6E32;&#x67D3;&#x6811;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5916;&#x89C2;&#xFF08;&#x5982;&#xFF1A;&#x989C;&#x8272;&#xFF09;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x5E03;&#x5C40;&#x65F6;&#xFF0C;&#x4EA7;&#x751F;&#x91CD;&#x7ED8;</li>
<li>&#x56DE;&#x6D41;&#xFF1A;&#x5F53;&#x6E32;&#x67D3;&#x6811;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#xFF08;&#x5982;&#xFF1A;&#x5C3A;&#x5BF8;&#x3001;&#x4F4D;&#x7F6E;&#x3001;&#x9690;&#x85CF;/&#x72B6;&#x6001;&#x72B6;&#x6001;&#xFF09;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4EA7;&#x751F;&#x91CD;&#x7ED8;&#x56DE;&#x6D41;</li>
<li>&#x6CE8;&#x610F;&#xFF1A;JS&#x83B7;&#x53D6;Layout&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5982;&#xFF1A;offsetLeft&#x3001;scrollTop&#x3001;getComputedStyle&#x7B49;&#xFF09;&#x4E5F;&#x4F1A;&#x5F15;&#x8D77;&#x56DE;&#x6D41;&#x3002;&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x56DE;&#x6D41;&#x8BA1;&#x7B97;&#x6700;&#x65B0;&#x503C;</li>
<li>&#x56DE;&#x6D41;&#x5FC5;&#x5C06;&#x5F15;&#x8D77;&#x91CD;&#x7ED8;&#xFF0C;&#x800C;&#x91CD;&#x7ED8;&#x4E0D;&#x4E00;&#x5B9A;&#x4F1A;&#x5F15;&#x8D77;&#x56DE;&#x6D41;</li>
</ul>
<p><strong>&#x5982;&#x4F55;&#x6700;&#x5C0F;&#x5316;&#x91CD;&#x7ED8;(repaint)&#x548C;&#x56DE;&#x6D41;(reflow)&#xFF1F;</strong></p>
<ul>
<li>&#x9700;&#x8981;&#x8981;&#x5BF9;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x590D;&#x6742;&#x7684;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5148;&#x9690;&#x85CF;(display:&quot;none&quot;)&#xFF0C;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#x540E;&#x518D;&#x663E;&#x793A;</li>
<li>&#x9700;&#x8981;&#x521B;&#x5EFA;&#x591A;&#x4E2A;DOM&#x8282;&#x70B9;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;DocumentFragment&#x521B;&#x5EFA;&#x5B8C;&#x540E;&#x4E00;&#x6B21;&#x6027;&#x7684;&#x52A0;&#x5165;document</li>
<li>&#x7F13;&#x5B58;Layout&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5982;&#xFF1A;var left = elem.offsetLeft; &#x8FD9;&#x6837;&#xFF0C;&#x591A;&#x6B21;&#x4F7F;&#x7528; left &#x53EA;&#x4EA7;&#x751F;&#x4E00;&#x6B21;&#x56DE;&#x6D41;</li>
<li>&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x7528;table&#x5E03;&#x5C40;&#xFF08;table&#x5143;&#x7D20;&#x4E00;&#x65E6;&#x89E6;&#x53D1;&#x56DE;&#x6D41;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;table&#x91CC;&#x6240;&#x6709;&#x7684;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x56DE;&#x6D41;&#xFF09;</li>
<li>&#x907F;&#x514D;&#x4F7F;&#x7528;css&#x8868;&#x8FBE;&#x5F0F;(expression)&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x90FD;&#x4F1A;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x503C;&#xFF08;&#x5305;&#x62EC;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#xFF09;</li>
<li>&#x5C3D;&#x91CF;&#x4F7F;&#x7528; css &#x5C5E;&#x6027;&#x7B80;&#x5199;&#xFF0C;&#x5982;&#xFF1A;&#x7528; border &#x4EE3;&#x66FF; border-width, border-style, border-color</li>
<li>&#x6279;&#x91CF;&#x4FEE;&#x6539;&#x5143;&#x7D20;&#x6837;&#x5F0F;&#xFF1A;elem.className &#x548C; elem.style.cssText &#x4EE3;&#x66FF; elem.style.xxx</li>
</ul>
<p><strong>script &#x7684;&#x4F4D;&#x7F6E;&#x662F;&#x5426;&#x4F1A;&#x5F71;&#x54CD;&#x9996;&#x5C4F;&#x663E;&#x793A;&#x65F6;&#x95F4;&#xFF1F;</strong></p>
<ul>
<li>&#x5728;&#x89E3;&#x6790; HTML &#x751F;&#x6210; DOM &#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;js &#x6587;&#x4EF6;&#x7684;&#x4E0B;&#x8F7D;&#x662F;&#x5E76;&#x884C;&#x7684;&#xFF0C;&#x4E0D;&#x9700;&#x8981; DOM &#x5904;&#x7406;&#x5230; script &#x8282;&#x70B9;&#x3002;&#x56E0;&#x6B64;&#xFF0C;script&#x7684;&#x4F4D;&#x7F6E;&#x4E0D;&#x5F71;&#x54CD;&#x9996;&#x5C4F;&#x663E;&#x793A;&#x7684;&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#x3002;</li>
<li>&#x6D4F;&#x89C8;&#x5668;&#x89E3;&#x6790; HTML &#x662F;&#x81EA;&#x4E0A;&#x800C;&#x4E0B;&#x7684;&#x7EBF;&#x6027;&#x8FC7;&#x7A0B;&#xFF0C;script&#x4F5C;&#x4E3A; HTML &#x7684;&#x4E00;&#x90E8;&#x5206;&#x540C;&#x6837;&#x9075;&#x5FAA;&#x8FD9;&#x4E2A;&#x539F;&#x5219;</li>
<li>&#x56E0;&#x6B64;&#xFF0C;script &#x4F1A;&#x5EF6;&#x8FDF; DomContentLoad&#xFF0C;&#x53EA;&#x663E;&#x793A;&#x5176;&#x4E0A;&#x90E8;&#x5206;&#x9996;&#x5C4F;&#x5185;&#x5BB9;&#xFF0C;&#x4ECE;&#x800C;&#x5F71;&#x54CD;&#x9996;&#x5C4F;&#x663E;&#x793A;&#x7684;&#x5B8C;&#x6210;&#x65F6;&#x95F4;</li>
</ul>
<p><strong>&#x89E3;&#x91CA;JavaScript&#x4E2D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x63D0;&#x5347;&#xFF1F;</strong></p>
<ul>
<li>
<p>JavaScript&#x4F5C;&#x7528;&#x57DF;&#xFF1A;</p>
<ul>
<li>&#x5728;Java&#x3001;C&#x7B49;&#x8BED;&#x8A00;&#x4E2D;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x4E3A;for&#x8BED;&#x53E5;&#x3001;if&#x8BED;&#x53E5;&#x6216;{}&#x5185;&#x7684;&#x4E00;&#x5757;&#x533A;&#x57DF;&#xFF0C;&#x79F0;&#x4E3A;&#x4F5C;&#x7528;&#x57DF;&#xFF1B;</li>
<li>&#x800C;&#x5728; JavaScript &#x4E2D;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x4E3A;function(){}&#x5185;&#x7684;&#x533A;&#x57DF;&#xFF0C;&#x79F0;&#x4E3A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x3002;</li>
</ul>
</li>
<li>
<p>JavaScript&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x63D0;&#x5347;&#xFF1A;</p>
<ul>
<li>&#x5728;JavaScript&#x4E2D;&#xFF0C;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x4E0E;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7ECF;&#x5E38;&#x88AB;JavaScript&#x5F15;&#x64CE;&#x9690;&#x5F0F;&#x5730;&#x63D0;&#x5347;&#x5230;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x9876;&#x90E8;&#x3002;</li>
<li>&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x4E2D;&#x7684;&#x8D4B;&#x503C;&#x90E8;&#x5206;&#x5E76;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x53EA;&#x6709;&#x540D;&#x79F0;&#x88AB;&#x63D0;&#x5347;</li>
<li>&#x51FD;&#x6570;&#x58F0;&#x660E;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x679C;&#x53D8;&#x91CF;&#x540D;&#x8DDF;&#x51FD;&#x6570;&#x540D;&#x76F8;&#x540C;&#x4E14;&#x672A;&#x8D4B;&#x503C;&#xFF0C;&#x5219;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x4F1A;&#x8986;&#x76D6;&#x53D8;&#x91CF;&#x58F0;&#x660E;</li>
<li>&#x5982;&#x679C;&#x51FD;&#x6570;&#x6709;&#x591A;&#x4E2A;&#x540C;&#x540D;&#x53C2;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF08;&#x5373;&#x4F7F;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#xFF09;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;&#x540C;&#x540D;&#x53C2;&#x6570;</li>
</ul>
</li>
</ul>
<p><strong>&#x4ECB;&#x7ECD;JavaScript&#x7684;&#x539F;&#x578B;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#xFF1F;&#x6709;&#x4EC0;&#x4E48;&#x7279;&#x70B9;&#xFF1F;</strong></p>
<ul>
<li>
<p>&#x539F;&#x578B;&#xFF1A;</p>
<ul>
<li>JavaScript&#x7684;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x4E2D;&#x90FD;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E2A; [__proto__] &#x5185;&#x90E8;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x5C31;&#x662F;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;</li>
<li>JavaScript&#x7684;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#xFF0C;&#x9664;&#x4E86;&#x539F;&#x578B; [__proto__] &#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x9884;&#x7F6E;&#x4E86; prototype &#x5C5E;&#x6027;</li>
<li>&#x5F53;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x8BE5; prototype &#x5C5E;&#x6027;&#x503C;&#x5C06;&#x88AB;&#x4F5C;&#x4E3A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B; [__proto__]&#x3002;</li>
</ul>
</li>
<li>
<p>&#x539F;&#x578B;&#x94FE;&#xFF1A;</p>
<ul>
<li>&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x8C03;&#x7528;&#x7684;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;&#x81EA;&#x8EAB;&#x4E0D;&#x5B58;&#x5728;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x53BB;&#x81EA;&#x5DF1; [__proto__] &#x5173;&#x8054;&#x7684;&#x524D;&#x8F88; prototype &#x5BF9;&#x8C61;&#x4E0A;&#x53BB;&#x627E;</li>
<li>&#x5982;&#x679C;&#x6CA1;&#x627E;&#x5230;&#xFF0C;&#x5C31;&#x4F1A;&#x53BB;&#x8BE5; prototype &#x539F;&#x578B; [__proto__] &#x5173;&#x8054;&#x7684;&#x524D;&#x8F88; prototype &#x53BB;&#x627E;&#x3002;&#x4F9D;&#x6B21;&#x7C7B;&#x63A8;&#xFF0C;&#x76F4;&#x5230;&#x627E;&#x5230;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;&#x6216; undefined &#x4E3A;&#x6B62;&#x3002;&#x4ECE;&#x800C;&#x5F62;&#x6210;&#x4E86;&#x6240;&#x8C13;&#x7684;&#x201C;&#x539F;&#x578B;&#x94FE;&#x201D;</li>
</ul>
</li>
<li>
<p>&#x539F;&#x578B;&#x7279;&#x70B9;&#xFF1A;</p>
<ul><li>JavaScript&#x5BF9;&#x8C61;&#x662F;&#x901A;&#x8FC7;&#x5F15;&#x7528;&#x6765;&#x4F20;&#x9012;&#x7684;&#xFF0C;&#x5F53;&#x4FEE;&#x6539;&#x539F;&#x578B;&#x65F6;&#xFF0C;&#x4E0E;&#x4E4B;&#x76F8;&#x5173;&#x7684;&#x5BF9;&#x8C61;&#x4E5F;&#x4F1A;&#x7EE7;&#x627F;&#x8FD9;&#x4E00;&#x6539;&#x53D8;</li></ul>
</li>
</ul>
<p><strong>JavaScript&#x6709;&#x51E0;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x503C;</strong></p>
<ul>
<li>&#x539F;&#x59CB;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF08;Undefined&#xFF0C;Null&#xFF0C;Boolean&#xFF0C;Number&#x3001;String&#xFF09;-- &#x6808;</li>
<li>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF08;&#x5BF9;&#x8C61;&#x3001;&#x6570;&#x7EC4;&#x548C;&#x51FD;&#x6570;&#xFF09;-- &#x5806;</li>
<li>&#x4E24;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x533A;&#x522B;&#x662F;&#xFF1A;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x540C;&#xFF1A;</li>
<li>&#x539F;&#x59CB;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;&#x76F4;&#x63A5;&#x5B58;&#x50A8;&#x5728;&#x6808;(stack)&#x4E2D;&#x7684;&#x7B80;&#x5355;&#x6570;&#x636E;&#x6BB5;&#xFF0C;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#x5C0F;&#x3001;&#x5927;&#x5C0F;&#x56FA;&#x5B9A;&#xFF0C;&#x5C5E;&#x4E8E;&#x88AB;&#x9891;&#x7E41;&#x4F7F;&#x7528;&#x6570;&#x636E;&#xFF1B;</li>
<li>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5B58;&#x50A8;&#x5728;&#x5806;(heap)&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#x5927;&#x3001;&#x5927;&#x5C0F;&#x4E0D;&#x56FA;&#x5B9A;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x50A8;&#x5728;&#x6808;&#x4E2D;&#xFF0C;&#x5C06;&#x4F1A;&#x5F71;&#x54CD;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x7684;&#x6027;&#x80FD;&#xFF1B;</li>
<li>&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5728;&#x6808;&#x4E2D;&#x5B58;&#x50A8;&#x4E86;&#x6307;&#x9488;&#xFF0C;&#x8BE5;&#x6307;&#x9488;&#x6307;&#x5411;&#x5806;&#x4E2D;&#x8BE5;&#x5B9E;&#x4F53;&#x7684;&#x8D77;&#x59CB;&#x5730;&#x5740;&#x3002;</li>
<li>&#x5F53;&#x89E3;&#x91CA;&#x5668;&#x5BFB;&#x627E;&#x5F15;&#x7528;&#x503C;&#x65F6;&#xFF0C;&#x4F1A;&#x9996;&#x5148;&#x68C0;&#x7D22;&#x5176;&#x5728;&#x6808;&#x4E2D;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x53D6;&#x5F97;&#x5730;&#x5740;&#x540E;&#x4ECE;&#x5806;&#x4E2D;&#x83B7;&#x5F97;&#x5B9E;&#x4F53;&#x3002;</li>
</ul>
<p><strong>JavaScript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x600E;&#x4E48;&#x5B9E;&#x4F8B;&#x5316;&#x8FD9;&#x4E2A;&#x7C7B;&#xFF1F;</strong></p>
<ul><li>
<p>&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CD5;&#xFF08;this + prototype&#xFF09; -- &#x7528; new &#x5173;&#x952E;&#x5B57; &#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</p>
<ul><li>&#x7F3A;&#x70B9;&#xFF1A;&#x7528;&#x5230;&#x4E86; this &#x548C; prototype&#xFF0C;&#x7F16;&#x5199;&#x590D;&#x6742;&#xFF0C;&#x53EF;&#x8BFB;&#x6027;&#x5DEE;</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function Mobile(name, price){
     this.name = name;
     this.price = price;
   }
   Mobile.prototype.sell = function(){
      alert(this.name + &quot;&#xFF0C;&#x552E;&#x4EF7; $&quot; + this.price);
   }
   var iPhone7 = new Mobile(&quot;iPhone7&quot;, 1000);
   iPhone7.sell();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Mobile</span>(<span class="hljs-params">name, price</span>)</span>{
     <span class="hljs-keyword">this</span>.name = name;
     <span class="hljs-keyword">this</span>.price = price;
   }
   Mobile.prototype.sell = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      alert(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&quot;&#xFF0C;&#x552E;&#x4EF7; $&quot;</span> + <span class="hljs-keyword">this</span>.price);
   }
   <span class="hljs-keyword">var</span> iPhone7 = <span class="hljs-keyword">new</span> Mobile(<span class="hljs-string">&quot;iPhone7&quot;</span>, <span class="hljs-number">1000</span>);
   iPhone7.sell();</code></pre>
<ul>
<li>Object.create &#x6CD5; -- &#x7528; Object.create() &#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</li>
<li>&#x7F3A;&#x70B9;&#xFF1A;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x4E5F;&#x4E0D;&#x80FD;&#x5171;&#x4EAB;&#x6570;&#x636E;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Person = {
     firstname: &quot;Mark&quot;,
     lastname: &quot;Yun&quot;,
     age: 25,
     introduce: function(){
         alert(&apos;I am &apos; + Person.firstname + &apos; &apos; + Person.lastname);
     }
 };

 var person = Object.create(Person);
 person.introduce();

 // Object.create &#x8981;&#x6C42; IE9+&#xFF0C;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x90E8;&#x7F72;&#xFF1A;
 if (!Object.create) {
&#x3000;   Object.create = function (o) {
&#x3000;&#x3000;&#x3000; function F() {}
&#x3000;&#x3000;&#x3000; F.prototype = o;
&#x3000;&#x3000;&#x3000; return new F();
&#x3000;&#x3000;};
&#x3000;}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">var</span> Person = {
     <span class="hljs-attr">firstname</span>: <span class="hljs-string">&quot;Mark&quot;</span>,
     <span class="hljs-attr">lastname</span>: <span class="hljs-string">&quot;Yun&quot;</span>,
     <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>,
     <span class="hljs-attr">introduce</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         alert(<span class="hljs-string">&apos;I am &apos;</span> + Person.firstname + <span class="hljs-string">&apos; &apos;</span> + Person.lastname);
     }
 };

 <span class="hljs-keyword">var</span> person = <span class="hljs-built_in">Object</span>.create(Person);
 person.introduce();

 <span class="hljs-comment">// Object.create &#x8981;&#x6C42; IE9+&#xFF0C;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x90E8;&#x7F72;&#xFF1A;</span>
 <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Object</span>.create) {
&#x3000;   <span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
&#x3000;&#x3000;&#x3000; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
&#x3000;&#x3000;&#x3000; F.prototype = o;
&#x3000;&#x3000;&#x3000; <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
&#x3000;&#x3000;};
&#x3000;}</code></pre>
<ul><li>
<p>&#x6781;&#x7B80;&#x4E3B;&#x4E49;&#x6CD5;&#xFF08;&#x6D88;&#x9664; this &#x548C; prototype&#xFF09; -- &#x8C03;&#x7528; createNew() &#x5F97;&#x5230;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</p>
<ul><li>&#x4F18;&#x70B9;&#xFF1A;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#xFF0C;&#x7ED3;&#x6784;&#x6E05;&#x6670;&#x4F18;&#x96C5;&#xFF0C;&#x7B26;&#x5408;&#x4F20;&#x7EDF;&#x7684;&quot;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&quot;&#x7684;&#x6784;&#x9020;</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Cat = {
   age: 3, // &#x5171;&#x4EAB;&#x6570;&#x636E; -- &#x5B9A;&#x4E49;&#x5728;&#x7C7B;&#x5BF9;&#x8C61;&#x5185;&#xFF0C;createNew() &#x5916;
   createNew: function () {
     var cat = {};
     // var cat = Animal.createNew(); // &#x7EE7;&#x627F; Animal &#x7C7B;
     cat.name = &quot;&#x5C0F;&#x54AA;&quot;;
     var sound = &quot;&#x55B5;&#x55B5;&#x55B5;&quot;; // &#x79C1;&#x6709;&#x5C5E;&#x6027;--&#x5B9A;&#x4E49;&#x5728; createNew() &#x5185;&#xFF0C;&#x8F93;&#x51FA;&#x5BF9;&#x8C61;&#x5916;
     cat.makeSound = function () {
       alert(sound);  // &#x66B4;&#x9732;&#x79C1;&#x6709;&#x5C5E;&#x6027;
     };
     cat.changeAge = function(num){
       Cat.age = num; // &#x4FEE;&#x6539;&#x5171;&#x4EAB;&#x6570;&#x636E;
     };
     return cat; // &#x8F93;&#x51FA;&#x5BF9;&#x8C61;
   }
 };

 var cat = Cat.createNew();
 cat.makeSound();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">var</span> Cat = {
   <span class="hljs-attr">age</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// &#x5171;&#x4EAB;&#x6570;&#x636E; -- &#x5B9A;&#x4E49;&#x5728;&#x7C7B;&#x5BF9;&#x8C61;&#x5185;&#xFF0C;createNew() &#x5916;</span>
   createNew: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">var</span> cat = {};
     <span class="hljs-comment">// var cat = Animal.createNew(); // &#x7EE7;&#x627F; Animal &#x7C7B;</span>
     cat.name = <span class="hljs-string">&quot;&#x5C0F;&#x54AA;&quot;</span>;
     <span class="hljs-keyword">var</span> sound = <span class="hljs-string">&quot;&#x55B5;&#x55B5;&#x55B5;&quot;</span>; <span class="hljs-comment">// &#x79C1;&#x6709;&#x5C5E;&#x6027;--&#x5B9A;&#x4E49;&#x5728; createNew() &#x5185;&#xFF0C;&#x8F93;&#x51FA;&#x5BF9;&#x8C61;&#x5916;</span>
     cat.makeSound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       alert(sound);  <span class="hljs-comment">// &#x66B4;&#x9732;&#x79C1;&#x6709;&#x5C5E;&#x6027;</span>
     };
     cat.changeAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>)</span>{
       Cat.age = num; <span class="hljs-comment">// &#x4FEE;&#x6539;&#x5171;&#x4EAB;&#x6570;&#x636E;</span>
     };
     <span class="hljs-keyword">return</span> cat; <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5BF9;&#x8C61;</span>
   }
 };

 <span class="hljs-keyword">var</span> cat = Cat.createNew();
 cat.makeSound();</code></pre>
<ul><li>ES6 &#x8BED;&#x6CD5;&#x7CD6; class -- &#x7528; new &#x5173;&#x952E;&#x5B57; &#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     class Point {
       constructor(x, y) {
         this.x = x;
         this.y = y;
       }
       toString() {
         return &apos;(&apos; + this.x + &apos;, &apos; + this.y + &apos;)&apos;;
       }
     }

  var point = new Point(2, 3);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
       <span class="hljs-keyword">constructor</span>(x, y) {
         <span class="hljs-keyword">this</span>.x = x;
         <span class="hljs-keyword">this</span>.y = y;
       }
       toString() {
         <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;(&apos;</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">&apos;, &apos;</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">&apos;)&apos;</span>;
       }
     }

  <span class="hljs-keyword">var</span> point = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p><strong>Javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF1F;</strong></p>
<ul><li>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#xFF1A;&#x4F7F;&#x7528; call &#x6216; apply &#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x7236;&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x5728;&#x5B50;&#x5BF9;&#x8C61;&#x4E0A;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name,color){
 &#x3000;Animal.apply(this, arguments);
 &#x3000;this.name = name;
 &#x3000;this.color = color;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name,color</span>)</span>{
 &#x3000;Animal.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
 &#x3000;<span class="hljs-keyword">this</span>.name = name;
 &#x3000;<span class="hljs-keyword">this</span>.color = <span class="hljs-built_in">color</span>;
}</code></pre>
<ul><li>&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;&#xFF1A;&#x5C06;&#x5B50;&#x5BF9;&#x8C61;&#x7684; prototype &#x6307;&#x5411;&#x7236;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Cat.prototype = <span class="hljs-keyword">new</span> Animal();
Cat.prototype.constructor = Cat;</code></pre>
<ul><li>&#x62F7;&#x8D1D;&#x7EE7;&#x627F;&#xFF1A;&#x5982;&#x679C;&#x628A;&#x7236;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x62F7;&#x8D1D;&#x8FDB;&#x5B50;&#x5BF9;&#x8C61;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function extend(Child, Parent) {
  &#x3000;&#x3000;&#x3000;var p = Parent.prototype;
  &#x3000;&#x3000;&#x3000;var c = Child.prototype;
  &#x3000;&#x3000;&#x3000;for (var i in p) {
  &#x3000;&#x3000;&#x3000;   c[i] = p[i];
  &#x3000;&#x3000;&#x3000;}
  &#x3000;&#x3000;&#x3000;c.uber = p;
  &#x3000; }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span><span class="hljs-params">(Child, Parent)</span> </span>{
  &#x3000;&#x3000;&#x3000;<span class="hljs-keyword">var</span> p = Parent.prototype;
  &#x3000;&#x3000;&#x3000;<span class="hljs-keyword">var</span> c = Child.prototype;
  &#x3000;&#x3000;&#x3000;<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> p) {
  &#x3000;&#x3000;&#x3000;   c[i] = p[i];
  &#x3000;&#x3000;&#x3000;}
  &#x3000;&#x3000;&#x3000;c.uber = p;
  &#x3000; }</code></pre>
<ul><li>&#x539F;&#x578B;&#x7EE7;&#x627F;&#xFF1A;&#x5C06;&#x5B50;&#x5BF9;&#x8C61;&#x7684; prototype &#x6307;&#x5411;&#x7236;&#x5BF9;&#x8C61;&#x7684; prototype</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function extend(Child, Parent) {
        var F = function(){};
      &#x3000;F.prototype = Parent.prototype;
      &#x3000;Child.prototype = new F();
      &#x3000;Child.prototype.constructor = Child;
      &#x3000;Child.uber = Parent.prototype;
    }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">Child, Parent</span>) </span>{
        <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
      &#x3000;F.prototype = Parent.prototype;
      &#x3000;Child.prototype = <span class="hljs-keyword">new</span> F();
      &#x3000;Child.prototype.constructor = Child;
      &#x3000;Child.uber = Parent.prototype;
    }</code></pre>
<ul><li>ES6 &#x8BED;&#x6CD5;&#x7CD6; extends&#xFF1A;class ColorPoint extends Point {}</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class ColorPoint extends Point {
       constructor(x, y, color) {
          super(x, y); // &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;constructor(x, y)
          this.color = color;
       }
       toString() {
          return this.color + &apos; &apos; + super.toString(); // &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;toString()
       }
    }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span> </span>{
       <span class="hljs-keyword">constructor</span>(x, y, color) {
          <span class="hljs-keyword">super</span>(x, y); <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;constructor(x, y)</span>
          <span class="hljs-keyword">this</span>.color = color;
       }
       toString() {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.color + <span class="hljs-string">&apos; &apos;</span> + <span class="hljs-keyword">super</span>.toString(); <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;toString()</span>
       }
    }</code></pre>
<p><strong>&#x8C08;&#x8C08;this&#x5BF9;&#x8C61;&#x7684;&#x7406;&#x89E3;</strong></p>
<ul>
<li>this &#x603B;&#x662F;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x8005;</li>
<li>&#x5982;&#x679C;&#x6709; new &#x5173;&#x952E;&#x5B57;&#xFF0C;this &#x6307;&#x5411; new &#x51FA;&#x6765;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</li>
<li>&#x5728;&#x4E8B;&#x4EF6;&#x4E2D;&#xFF0C;this&#x6307;&#x5411;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x7684;&#x5BF9;&#x8C61;</li>
<li>IE&#x4E0B; attachEvent &#x4E2D;&#x7684;this&#x603B;&#x662F;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;Window</li>
</ul>
<p><strong>eval&#x662F;&#x505A;&#x4EC0;&#x4E48;&#x7684;&#xFF1F;</strong></p>
<p><strong>eval&#x7684;&#x529F;&#x80FD;&#x662F;&#x628A;&#x5BF9;&#x5E94;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x89E3;&#x6790;&#x6210;JS&#x4EE3;&#x7801;&#x5E76;&#x8FD0;&#x884C;</strong></p>
<ul>
<li>&#x5E94;&#x8BE5;&#x907F;&#x514D;&#x4F7F;&#x7528;eval&#xFF0C;&#x4E0D;&#x5B89;&#x5168;&#xFF0C;&#x975E;&#x5E38;&#x8017;&#x6027;&#x80FD;&#xFF08;&#x5148;&#x89E3;&#x6790;&#x6210;js&#x8BED;&#x53E5;&#xFF0C;&#x518D;&#x6267;&#x884C;&#xFF09;</li>
<li>&#x7531;JSON&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;JSON&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x7528; eval(&apos;(&apos;+ str +&apos;)&apos;);</li>
</ul>
<p><strong>&#x4EC0;&#x4E48;&#x662F; Window &#x5BF9;&#x8C61;? &#x4EC0;&#x4E48;&#x662F; Document &#x5BF9;&#x8C61;?</strong></p>
<ul>
<li>Window &#x5BF9;&#x8C61;&#x8868;&#x793A;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x7A97;&#x53E3;&#xFF0C;&#x662F;JavaScript&#x7684;&#x9876;&#x7EA7;&#x5BF9;&#x8C61;&#x3002;</li>
<li>&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x3001;&#x51FD;&#x6570;&#x3001;&#x53D8;&#x91CF;&#x90FD;&#x662F; Window &#x5BF9;&#x8C61;&#x7684;&#x6210;&#x5458;&#x3002;</li>
<li>Window &#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x662F;&#x5728;&#x5168;&#x5C40;&#x8303;&#x56F4;&#x5185;&#x6709;&#x6548;&#x7684;&#x3002;</li>
<li>Document &#x5BF9;&#x8C61;&#x662F; HTML &#x6587;&#x6863;&#x7684;&#x6839;&#x8282;&#x70B9;&#x4E0E;&#x6240;&#x6709;&#x5176;&#x4ED6;&#x8282;&#x70B9;&#xFF08;&#x5143;&#x7D20;&#x8282;&#x70B9;&#xFF0C;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x5C5E;&#x6027;&#x8282;&#x70B9;, &#x6CE8;&#x91CA;&#x8282;&#x70B9;&#xFF09;</li>
<li>Document &#x5BF9;&#x8C61;&#x4F7F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x811A;&#x672C;&#x5BF9; HTML &#x9875;&#x9762;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x8BBF;&#x95EE;</li>
<li>Document &#x5BF9;&#x8C61;&#x662F; Window &#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; window.document &#x5C5E;&#x6027;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x8BBF;&#x95EE;</li>
</ul>
<p><strong>&#x4ECB;&#x7ECD; DOM &#x7684;&#x53D1;&#x5C55;</strong></p>
<ul>
<li>DOM&#xFF1A;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF08;Document Object Model&#xFF09;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x8BBF;&#x95EE;HTML&#x548C;XML&#x6587;&#x6863;&#x7684;&#x6807;&#x51C6;&#xFF0C;&#x4E0E;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x53CA;&#x5E73;&#x53F0;&#x65E0;&#x5173;</li>
<li>DOM0&#xFF1A;&#x63D0;&#x4F9B;&#x4E86;&#x67E5;&#x8BE2;&#x548C;&#x64CD;&#x4F5C;Web&#x6587;&#x6863;&#x7684;&#x5185;&#x5BB9;API&#x3002;&#x672A;&#x5F62;&#x6210;&#x6807;&#x51C6;&#xFF0C;&#x5B9E;&#x73B0;&#x6DF7;&#x4E71;&#x3002;&#x5982;&#xFF1A;document.forms[&apos;login&apos;]</li>
<li>DOM1&#xFF1A;W3C&#x63D0;&#x51FA;&#x6807;&#x51C6;&#x5316;&#x7684;DOM&#xFF0C;&#x7B80;&#x5316;&#x4E86;&#x5BF9;&#x6587;&#x6863;&#x4E2D;&#x4EFB;&#x610F;&#x90E8;&#x5206;&#x7684;&#x8BBF;&#x95EE;&#x548C;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#xFF1A;JavaScript&#x4E2D;&#x7684;Document&#x5BF9;&#x8C61;</li>
<li>DOM2&#xFF1A;&#x539F;&#x6765;DOM&#x57FA;&#x7840;&#x4E0A;&#x6269;&#x5145;&#x4E86;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#x7B49;&#x7EC6;&#x5206;&#x6A21;&#x5757;&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x5BF9;CSS&#x7684;&#x652F;&#x6301;&#x3002;&#x5982;&#xFF1A;getComputedStyle(elem, pseudo)</li>
<li>DOM3&#xFF1A;&#x589E;&#x52A0;&#x4E86;XPath&#x6A21;&#x5757;&#x548C;&#x52A0;&#x8F7D;&#x4E0E;&#x4FDD;&#x5B58;&#xFF08;Load and Save&#xFF09;&#x6A21;&#x5757;&#x3002;&#x5982;&#xFF1A;XPathEvaluator</li>
</ul>
<p><strong>&#x4ECB;&#x7ECD;DOM0&#xFF0C;DOM2&#xFF0C;DOM3&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x533A;&#x522B;</strong></p>
<ul>
<li>
<p>DOM0&#x7EA7;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul>
<li><code>btn.onclick = func;</code></li>
<li><code>btn.onclick = null;</code></li>
</ul>
</li>
<li>
<p>DOM2&#x7EA7;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul>
<li><code>btn.addEventListener(&apos;click&apos;, func, false);</code></li>
<li><code>btn.removeEventListener(&apos;click&apos;, func, false);</code></li>
<li><code>btn.attachEvent(&quot;onclick&quot;, func);</code></li>
<li><code>btn.detachEvent(&quot;onclick&quot;, func);</code></li>
</ul>
</li>
<li>
<p>DOM3&#x7EA7;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul>
<li><code>eventUtil.addListener(input, &quot;textInput&quot;, func);</code></li>
<li>
<code>eventUtil</code> &#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#xFF0C;<code>textInput</code> &#x662F;DOM3&#x7EA7;&#x4E8B;&#x4EF6;</li>
</ul>
</li>
</ul>
<p><strong>&#x4E8B;&#x4EF6;&#x7684;&#x4E09;&#x4E2A;&#x9636;&#x6BB5;</strong></p>
<ul><li>&#x6355;&#x83B7;&#x3001;&#x76EE;&#x6807;&#x3001;&#x5192;&#x6CE1;</li></ul>
<p><strong>&#x4ECB;&#x7ECD;&#x4E8B;&#x4EF6;&#x201C;&#x6355;&#x83B7;&#x201D;&#x548C;&#x201C;&#x5192;&#x6CE1;&#x201D;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x548C;&#x4E8B;&#x4EF6;&#x7684;&#x6267;&#x884C;&#x6B21;&#x6570;&#xFF1F;</strong></p>
<ul>
<li>&#x6309;&#x7167;W3C&#x6807;&#x51C6;&#x7684;&#x4E8B;&#x4EF6;&#xFF1A;&#x9996;&#x662F;&#x8FDB;&#x5165;&#x6355;&#x83B7;&#x9636;&#x6BB5;&#xFF0C;&#x76F4;&#x5230;&#x8FBE;&#x5230;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF0C;&#x518D;&#x8FDB;&#x5165;&#x5192;&#x6CE1;&#x9636;&#x6BB5;</li>
<li>
<p>&#x4E8B;&#x4EF6;&#x6267;&#x884C;&#x6B21;&#x6570;&#xFF08;DOM2-addEventListener&#xFF09;&#xFF1A;&#x5143;&#x7D20;&#x4E0A;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x4E2A;&#x6570;</p>
<ul>
<li>&#x6CE8;&#x610F;1&#xFF1A;&#x524D;&#x63D0;&#x662F;&#x4E8B;&#x4EF6;&#x88AB;&#x786E;&#x5B9E;&#x89E6;&#x53D1;</li>
<li>&#x6CE8;&#x610F;2&#xFF1A;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x51E0;&#x6B21;&#x5C31;&#x7B97;&#x51E0;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5373;&#x4F7F;&#x7C7B;&#x578B;&#x548C;&#x529F;&#x80FD;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#x4E5F;&#x4E0D;&#x4F1A;&#x201C;&#x8986;&#x76D6;&#x201D;</li>
</ul>
</li>
<li>
<p>&#x4E8B;&#x4EF6;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF1A;&#x5224;&#x65AD;&#x7684;&#x5173;&#x952E;&#x662F;&#x5426;&#x76EE;&#x6807;&#x5143;&#x7D20;</p>
<ul>
<li>&#x975E;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF1A;&#x6839;&#x636E;W3C&#x7684;&#x6807;&#x51C6;&#x6267;&#x884C;&#xFF1A;&#x6355;&#x83B7;-&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;-&gt;&#x5192;&#x6CE1;&#xFF08;&#x4E0D;&#x4F9D;&#x636E;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x987A;&#x5E8F;&#xFF09;</li>
<li>&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF1A;&#x4F9D;&#x636E;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x987A;&#x5E8F;&#xFF1A;&#x5148;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x5148;&#x6267;&#x884C;&#xFF08;&#x4E0D;&#x4F9D;&#x636E;&#x6355;&#x83B7;&#x5192;&#x6CE1;&#x6807;&#x51C6;&#xFF09;</li>
<li>&#x6700;&#x7EC8;&#x987A;&#x5E8F;&#xFF1A;&#x7236;&#x5143;&#x7D20;&#x6355;&#x83B7;-&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x4E8B;&#x4EF6;1-&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x4E8B;&#x4EF6;2-&gt;&#x5B50;&#x5143;&#x7D20;&#x6355;&#x83B7;-&gt;&#x5B50;&#x5143;&#x7D20;&#x5192;&#x6CE1;-&gt;&#x7236;&#x5143;&#x7D20;&#x5192;&#x6CE1;</li>
<li>&#x6CE8;&#x610F;&#xFF1A;&#x5B50;&#x5143;&#x7D20;&#x4E8B;&#x4EF6;&#x6267;&#x884C;&#x524D;&#x63D0;    &#x4E8B;&#x4EF6;&#x786E;&#x5B9E;&#x201C;&#x843D;&#x201D;&#x5230;&#x5B50;&#x5143;&#x7D20;&#x5E03;&#x5C40;&#x533A;&#x57DF;&#x4E0A;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;&#x5177;&#x6709;&#x5D4C;&#x5957;&#x5173;&#x7CFB;</li>
</ul>
</li>
</ul>
<p><strong>&#x5728;&#x4E00;&#x4E2A;DOM&#x4E0A;&#x540C;&#x65F6;&#x7ED1;&#x5B9A;&#x4E24;&#x4E2A;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF1A;&#x4E00;&#x4E2A;&#x7528;&#x6355;&#x83B7;&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x5192;&#x6CE1;&#x3002;&#x4E8B;&#x4EF6;&#x4F1A;&#x6267;&#x884C;&#x51E0;&#x6B21;&#xFF0C;&#x5148;&#x6267;&#x884C;&#x5192;&#x6CE1;&#x8FD8;&#x662F;&#x6355;&#x83B7;&#xFF1F;</strong></p>
<ul>
<li>&#x8BE5;DOM&#x4E0A;&#x7684;&#x4E8B;&#x4EF6;&#x5982;&#x679C;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x4F1A;&#x6267;&#x884C;&#x4E24;&#x6B21;&#xFF08;&#x6267;&#x884C;&#x6B21;&#x6570;&#x7B49;&#x4E8E;&#x7ED1;&#x5B9A;&#x6B21;&#x6570;&#xFF09;</li>
<li>&#x5982;&#x679C;&#x8BE5;DOM&#x662F;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x6309;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x987A;&#x5E8F;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x533A;&#x5206;&#x5192;&#x6CE1;/&#x6355;&#x83B7;</li>
<li>&#x5982;&#x679C;&#x8BE5;DOM&#x662F;&#x5904;&#x4E8E;&#x4E8B;&#x4EF6;&#x6D41;&#x4E2D;&#x7684;&#x975E;&#x76EE;&#x6807;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x5148;&#x6267;&#x884C;&#x6355;&#x83B7;&#xFF0C;&#x540E;&#x6267;&#x884C;&#x5192;&#x6CE1;</li>
</ul>
<p><strong>&#x4E8B;&#x4EF6;&#x7684;&#x4EE3;&#x7406;/&#x59D4;&#x6258;</strong></p>
<ul><li>
<p>&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x662F;&#x6307;&#x5C06;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x7684;&#x5230;&#x7236;&#x5143;&#x7D20;&#x4E0A;&#xFF0C;&#x5229;&#x7528;&#x5192;&#x6CE1;&#x673A;&#x5236;&#x89E6;&#x53D1;&#x8BE5;&#x4E8B;&#x4EF6;</p>
<ul>
<li>
<p>&#x4F18;&#x70B9;&#xFF1A;</p>
<ul>
<li>&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x4E8B;&#x4EF6;&#x6CE8;&#x518C;&#xFF0C;&#x8282;&#x7701;&#x5927;&#x91CF;&#x5185;&#x5B58;&#x5360;&#x7528;</li>
<li>&#x53EF;&#x4EE5;&#x5C06;&#x4E8B;&#x4EF6;&#x5E94;&#x7528;&#x4E8E;&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4E0A;</li>
</ul>
</li>
<li>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x4F7F;&#x7528;&#x4E0D;&#x5F53;&#x4F1A;&#x9020;&#x6210;&#x4E8B;&#x4EF6;&#x5728;&#x4E0D;&#x5E94;&#x8BE5;&#x89E6;&#x53D1;&#x65F6;&#x89E6;&#x53D1;</li>
<li>&#x793A;&#x4F8B;&#xFF1A;</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ulEl.addEventListener(&apos;click&apos;, function(e){
    var target = event.target || event.srcElement;
    if(!!target &amp;&amp; target.nodeName.toUpperCase() === &quot;LI&quot;){
        console.log(target.innerHTML);
    }
}, false);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs aspectj"><code>ulEl.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, function(e){
    var <span class="hljs-keyword">target</span> = event.<span class="hljs-keyword">target</span> || event.srcElement;
    <span class="hljs-keyword">if</span>(!!<span class="hljs-keyword">target</span> &amp;&amp; <span class="hljs-keyword">target</span>.nodeName.toUpperCase() === <span class="hljs-string">&quot;LI&quot;</span>){
        console.log(<span class="hljs-keyword">target</span>.innerHTML);
    }
}, <span class="hljs-keyword">false</span>);</code></pre>
<p><strong>IE&#x4E0E;&#x706B;&#x72D0;&#x7684;&#x4E8B;&#x4EF6;&#x673A;&#x5236;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF1F; &#x5982;&#x4F55;&#x963B;&#x6B62;&#x5192;&#x6CE1;&#xFF1F;</strong></p>
<ul><li>IE&#x53EA;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF0C;&#x4E0D;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1B;&#x706B;&#x72D0;&#x540C;&#x65F6;&#x652F;&#x6301;&#x4EF6;&#x5192;&#x6CE1;&#x548C;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;</li></ul>
<p><strong>IE&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x548C;W3C&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x6709;&#x54EA;&#x4E9B;&#x533A;&#x522B;&#xFF1F;</strong></p>
<ul>
<li>
<p>&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</p>
<ul>
<li>W3C: targetEl.addEventListener(&apos;click&apos;, handler, false);</li>
<li>IE: targetEl.attachEvent(&apos;onclick&apos;, handler);</li>
</ul>
</li>
<li>
<p>&#x5220;&#x9664;&#x4E8B;&#x4EF6;</p>
<ul>
<li>W3C: targetEl.removeEventListener(&apos;click&apos;, handler, false);</li>
<li>IE: targetEl.detachEvent(event, handler);</li>
</ul>
</li>
<li>
<p>&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</p>
<ul>
<li>W3C: var e = arguments.callee.caller.arguments[0]</li>
<li>IE: window.event</li>
</ul>
</li>
<li>
<p>&#x4E8B;&#x4EF6;&#x76EE;&#x6807;</p>
<ul>
<li>W3C: e.target</li>
<li>IE: window.event.srcElement</li>
</ul>
</li>
<li>
<p>&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;</p>
<ul>
<li>W3C: e.preventDefault()</li>
<li>IE: window.event.returnValue = false</li>
</ul>
</li>
<li>
<p>&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x4F20;&#x64AD;</p>
<ul>
<li>W3C: e.stopPropagation()</li>
<li>IE: window.event.cancelBubble = true</li>
</ul>
</li>
</ul>
<p><strong>W3C&#x4E8B;&#x4EF6;&#x7684; target &#x4E0E; currentTarget &#x7684;&#x533A;&#x522B;&#xFF1F;</strong></p>
<ul>
<li>target &#x53EA;&#x4F1A;&#x51FA;&#x73B0;&#x5728;&#x4E8B;&#x4EF6;&#x6D41;&#x7684;&#x76EE;&#x6807;&#x9636;&#x6BB5;</li>
<li>currentTarget &#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x5728;&#x4E8B;&#x4EF6;&#x6D41;&#x7684;&#x4EFB;&#x4F55;&#x9636;&#x6BB5;</li>
<li>&#x5F53;&#x4E8B;&#x4EF6;&#x6D41;&#x5904;&#x5728;&#x76EE;&#x6807;&#x9636;&#x6BB5;&#x65F6;&#xFF0C;&#x4E8C;&#x8005;&#x7684;&#x6307;&#x5411;&#x76F8;&#x540C;</li>
<li>&#x5F53;&#x4E8B;&#x4EF6;&#x6D41;&#x5904;&#x4E8E;&#x6355;&#x83B7;&#x6216;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x65F6;&#xFF1A;currentTarget &#x6307;&#x5411;&#x5F53;&#x524D;&#x4E8B;&#x4EF6;&#x6D3B;&#x52A8;&#x7684;&#x5BF9;&#x8C61;(&#x4E00;&#x822C;&#x4E3A;&#x7236;&#x7EA7;)</li>
</ul>
<p><strong>&#x5982;&#x4F55;&#x6D3E;&#x53D1;&#x4E8B;&#x4EF6;(dispatchEvent)&#xFF1F;&#xFF08;&#x5982;&#x4F55;&#x8FDB;&#x884C;&#x4E8B;&#x4EF6;&#x5E7F;&#x64AD;&#xFF1F;&#xFF09;</strong></p>
<ul>
<li>W3C: &#x4F7F;&#x7528; dispatchEvent &#x65B9;&#x6CD5;</li>
<li>IE: &#x4F7F;&#x7528; fireEvent &#x65B9;&#x6CD5;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fireEvent = function(element, event){
    if (document.createEventObject){
        var mockEvent = document.createEventObject();
        return element.fireEvent(&apos;on&apos; + event, mockEvent)
    }else{
        var mockEvent = document.createEvent(&apos;HTMLEvents&apos;);
        mockEvent.initEvent(event, true, true);
        return !element.dispatchEvent(mockEvent);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fireEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, event</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.createEventObject){
        <span class="hljs-keyword">var</span> mockEvent = <span class="hljs-built_in">document</span>.createEventObject();
        <span class="hljs-keyword">return</span> element.fireEvent(<span class="hljs-string">&apos;on&apos;</span> + event, mockEvent)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> mockEvent = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">&apos;HTMLEvents&apos;</span>);
        mockEvent.initEvent(event, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
        <span class="hljs-keyword">return</span> !element.dispatchEvent(mockEvent);
    }
}</code></pre>
<p><strong>&#x4EC0;&#x4E48;&#x662F;&#x51FD;&#x6570;&#x8282;&#x6D41;&#xFF1F;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x5E94;&#x7528;&#x573A;&#x666F;&#x548C;&#x539F;&#x7406;&#xFF1F;</strong></p>
<ul><li>&#x51FD;&#x6570;&#x8282;&#x6D41;(throttle)&#x662F;&#x6307;&#x963B;&#x6B62;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5728;&#x5F88;&#x77ED;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x5185;&#x8FDE;&#x7EED;&#x8C03;&#x7528;&#x3002;</li></ul>
<p>&#x53EA;&#x6709;&#x5F53;&#x4E0A;&#x4E00;&#x6B21;&#x51FD;&#x6570;&#x6267;&#x884C;&#x540E;&#x8FBE;&#x5230;&#x89C4;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#xFF0C;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x3002;<br>&#x4F46;&#x8981;&#x4FDD;&#x8BC1;&#x4E00;&#x4E2A;&#x7D2F;&#x8BA1;&#x6700;&#x5C0F;&#x8C03;&#x7528;&#x95F4;&#x9694;&#xFF08;&#x5426;&#x5219;&#x62D6;&#x62FD;&#x7C7B;&#x7684;&#x8282;&#x6D41;&#x90FD;&#x5C06;&#x65E0;&#x8FDE;&#x7EED;&#x6548;&#x679C;&#xFF09;</p>
<ul>
<li>&#x51FD;&#x6570;&#x8282;&#x6D41;&#x7528;&#x4E8E; onresize, onscroll &#x7B49;&#x77ED;&#x65F6;&#x95F4;&#x5185;&#x4F1A;&#x591A;&#x6B21;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</li>
<li>&#x51FD;&#x6570;&#x8282;&#x6D41;&#x7684;&#x539F;&#x7406;&#xFF1A;&#x4F7F;&#x7528;&#x5B9A;&#x65F6;&#x5668;&#x505A;&#x65F6;&#x95F4;&#x8282;&#x6D41;&#x3002;</li>
</ul>
<p>&#x5F53;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x65F6;&#xFF0C;&#x5148;&#x7528; setTimout &#x8BA9;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x5EF6;&#x8FDF;&#x4E00;&#x5C0F;&#x6BB5;&#x65F6;&#x95F4;&#x518D;&#x6267;&#x884C;&#x3002;<br>&#x5982;&#x679C;&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x5185;&#x53C8;&#x89E6;&#x53D1;&#x4E86;&#x4E8B;&#x4EF6;&#xFF0C;&#x5C31; clearTimeout &#x539F;&#x6765;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;<br>&#x518D; setTimeout &#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x6D41;&#x7A0B;&#x3002;</p>
<ul><li>&#x51FD;&#x6570;&#x8282;&#x6D41;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#xFF1A;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }&#xFF0C; 100); // &#x4E24;&#x6B21;&#x8C03;&#x7528;&#x81F3;&#x5C11;&#x95F4;&#x9694; 100ms
}
// &#x8C03;&#x7528;
window.onresize = function(){
    throttle(myFunc, window);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">method, context</span>) </span>{
     clearTimeout(methor.tId);
     method.tId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         method.call(context);
     }&#xFF0C; <span class="hljs-number">100</span>); <span class="hljs-comment">// &#x4E24;&#x6B21;&#x8C03;&#x7528;&#x81F3;&#x5C11;&#x95F4;&#x9694; 100ms</span>
}
<span class="hljs-comment">// &#x8C03;&#x7528;</span>
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    throttle(myFunc, <span class="hljs-built_in">window</span>);
}</code></pre>
<p><strong>&#x533A;&#x5206;&#x4EC0;&#x4E48;&#x662F;&#x201C;&#x5BA2;&#x6237;&#x533A;&#x5750;&#x6807;&#x201D;&#x3001;&#x201C;&#x9875;&#x9762;&#x5750;&#x6807;&#x201D;&#x3001;&#x201C;&#x5C4F;&#x5E55;&#x5750;&#x6807;&#x201D;&#xFF1F;</strong></p>
<ul>
<li>&#x5BA2;&#x6237;&#x533A;&#x5750;&#x6807;&#xFF1A;&#x9F20;&#x6807;&#x6307;&#x9488;&#x5728;&#x53EF;&#x89C6;&#x533A;&#x4E2D;&#x7684;&#x6C34;&#x5E73;&#x5750;&#x6807;(clientX)&#x548C;&#x5782;&#x76F4;&#x5750;&#x6807;(clientY)</li>
<li>&#x9875;&#x9762;&#x5750;&#x6807;&#xFF1A;&#x9F20;&#x6807;&#x6307;&#x9488;&#x5728;&#x9875;&#x9762;&#x5E03;&#x5C40;&#x4E2D;&#x7684;&#x6C34;&#x5E73;&#x5750;&#x6807;(pageX)&#x548C;&#x5782;&#x76F4;&#x5750;&#x6807;(pageY)</li>
<li>&#x5C4F;&#x5E55;&#x5750;&#x6807;&#xFF1A;&#x8BBE;&#x5907;&#x7269;&#x7406;&#x5C4F;&#x5E55;&#x7684;&#x6C34;&#x5E73;&#x5750;&#x6807;(screenX)&#x548C;&#x5782;&#x76F4;&#x5750;&#x6807;(screenY)</li>
</ul>
<p><strong>&#x5982;&#x4F55;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;DOM&#x5143;&#x7D20;&#x7684;&#x7EDD;&#x5BF9;&#x4F4D;&#x7F6E;&#xFF1F;</strong></p>
<ul>
<li>elem.offsetLeft&#xFF1A;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x76F8;&#x5BF9;&#x4E8E;&#x5176;&#x5B9A;&#x4F4D;&#x7236;&#x7EA7;&#x5DE6;&#x4FA7;&#x7684;&#x8DDD;&#x79BB;</li>
<li>elem.offsetTop&#xFF1A;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x76F8;&#x5BF9;&#x4E8E;&#x5176;&#x5B9A;&#x4F4D;&#x7236;&#x7EA7;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;</li>
<li>elem.getBoundingClientRect()&#xFF1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;DOMRect&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E00;&#x7EC4;&#x63CF;&#x8FF0;&#x8FB9;&#x6846;&#x7684;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;&#xFF0C;&#x5355;&#x4F4D;&#x50CF;&#x7D20;</li>
</ul>
<p><strong>&#x5206;&#x6790; [&apos;1&apos;, &apos;2&apos;, &apos;3&apos;].map(parseInt) &#x7B54;&#x6848;&#x662F;&#x591A;&#x5C11;&#xFF1F;</strong></p>
<ul>
<li>&#x7B54;&#x6848;:[1, NaN, NaN]</li>
<li>parseInt(string, radix) &#x7B2C;2&#x4E2A;&#x53C2;&#x6570; radix &#x8868;&#x793A;&#x8FDB;&#x5236;&#x3002;&#x7701;&#x7565; radix &#x6216; radix = 0&#xFF0C;&#x5219;&#x6570;&#x5B57;&#x5C06;&#x4EE5;&#x5341;&#x8FDB;&#x5236;&#x89E3;&#x6790;</li>
<li>map &#x6BCF;&#x6B21;&#x4E3A; parseInt &#x4F20;3&#x4E2A;&#x53C2;&#x6570;(elem, index, array)&#xFF0C;&#x5176;&#x4E2D; index &#x4E3A;&#x6570;&#x7EC4;&#x7D22;&#x5F15;</li>
<li>&#x56E0;&#x6B64;&#xFF0C;map &#x904D;&#x5386; [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;]&#xFF0C;&#x76F8;&#x5E94; parseInt &#x63A5;&#x6536;&#x53C2;&#x6570;&#x5982;&#x4E0B;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt(&apos;1&apos;, 0);  // 1
parseInt(&apos;2&apos;, 1);  // NaN
parseInt(&apos;3&apos;, 2);  // NaN" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&apos;1&apos;</span>, <span class="hljs-number">0</span>);  <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&apos;2&apos;</span>, <span class="hljs-number">1</span>);  <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">&apos;3&apos;</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">// NaN</span></code></pre>
<ul><li>&#x6240;&#x4EE5;&#xFF0C;parseInt &#x53C2;&#x6570; radix &#x4E0D;&#x5408;&#x6CD5;&#xFF0C;&#x5BFC;&#x81F4;&#x8FD4;&#x56DE;&#x503C;&#x4E3A; NaN</li></ul>
<p><strong>new &#x64CD;&#x4F5C;&#x7B26;&#x5177;&#x4F53;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;</strong></p>
<ul>
<li>&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;this &#x53D8;&#x91CF;&#x5F15;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x7EE7;&#x627F;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;</li>
<li>&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x88AB;&#x52A0;&#x5165;&#x5230; this &#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x4E2D;</li>
<li>&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x7531; this &#x6240;&#x5F15;&#x7528;&#xFF0C;&#x5E76;&#x4E14;&#x6700;&#x540E;&#x9690;&#x5F0F;&#x7684;&#x8FD4;&#x56DE; this</li>
</ul>
<p><strong>&#x7528;&#x539F;&#x751F;JavaScript&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x4EC0;&#x4E48;&#x529F;&#x80FD;&#x5417;&#xFF1F;</strong></p>
<ul><li>&#x5C01;&#x88C5;&#x9009;&#x62E9;&#x5668;&#x3001;&#x8C03;&#x7528;&#x7B2C;&#x4E09;&#x65B9;API&#x3001;&#x8BBE;&#x7F6E;&#x548C;&#x83B7;&#x53D6;&#x6837;&#x5F0F;</li></ul>
<p><strong>&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x610F;&#x601D;&#x5417;&#xFF1F;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [].forEach.call($$(&quot;*&quot;), function(el){
      el.style.outline = &quot;1px solid #&quot; + (~~(Math.random()*(1&lt;&lt;24))).toString(16);
  })" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  [].forEach.call($$(<span class="hljs-string">&quot;*&quot;</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
      el.style.outline = <span class="hljs-string">&quot;1px solid #&quot;</span> + (~~(<span class="hljs-built_in">Math</span>.random()*(<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>))).toString(<span class="hljs-number">16</span>);
  })</code></pre>
<ul><li>&#x89E3;&#x91CA;&#xFF1A;&#x83B7;&#x53D6;&#x9875;&#x9762;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x904D;&#x5386;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#xFF0C;&#x4E3A;&#x5B83;&#x4EEC;&#x6DFB;&#x52A0;1&#x50CF;&#x7D20;&#x968F;&#x673A;&#x989C;&#x8272;&#x7684;&#x8F6E;&#x5ED3;(outline)</li></ul>
<ol>
<li><span class="MathJax_Preview"></span><div class="MathJax_Display" style="text-align: center;"><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 2.817em; display: inline-block;"><span style="display: inline-block; position: relative; width: 2.314em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.631em, 1002.32em, 2.822em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mo" id="MathJax-Span-3" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-4" style="font-family: STIXGeneral-Italic;">s</span><span class="mi" id="MathJax-Span-5" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-6" style="font-family: STIXGeneral-Italic;">l<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mo" id="MathJax-Span-7" style="font-family: STIXGeneral-Regular;">)</span><span class="texatom" id="MathJax-Span-8"><span class="mrow" id="MathJax-Span-9"><span class="mo" id="MathJax-Span-10" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="texatom" id="MathJax-Span-11"><span class="mrow" id="MathJax-Span-12"><span class="mo" id="MathJax-Span-13" style="font-family: STIXGeneral-Regular;">/</span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.281em; border-left: 0px solid; width: 0px; height: 1.174em;"></span></span></nobr></span></div><script type="math/tex; mode=display" id="MathJax-Element-1">(sel)// </script>&#x51FD;&#x6570;&#x88AB;&#x8BB8;&#x591A;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x547D;&#x4EE4;&#x884C;&#x652F;&#x6301;&#xFF0C;&#x7B49;&#x4EF7;&#x4E8E; document.querySelectorAll(sel)</li>
<li>
<code>[].forEach.call(NodeLists)</code> // &#x4F7F;&#x7528; call &#x51FD;&#x6570;&#x5C06;&#x6570;&#x7EC4;&#x904D;&#x5386;&#x51FD;&#x6570; forEach &#x5E94;&#x5230;&#x8282;&#x70B9;&#x5143;&#x7D20;&#x5217;&#x8868;</li>
<li>
<code>el.style.outline = &quot;1px solid #333&quot;</code> // &#x6837;&#x5F0F; outline &#x4F4D;&#x4E8E;&#x76D2;&#x6A21;&#x578B;&#x4E4B;&#x5916;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x5143;&#x7D20;&#x5E03;&#x5C40;&#x4F4D;&#x7F6E;</li>
<li>
<code>(1&lt;&lt;24)</code> // parseInt(&quot;ffffff&quot;, 16) == 16777215 == 2^24 - 1 // 1&lt;&lt;24 == 2^24 == 16777216</li>
<li>
<code>Math.random()*(1&lt;&lt;24)</code> // &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4F4D;&#x4E8E; 0 &#x5230; 16777216 &#x4E4B;&#x95F4;&#x7684;&#x968F;&#x673A;&#x6D6E;&#x70B9;&#x6570;</li>
<li>
<code>~~Math.random()*(1&lt;&lt;24)</code> // <code>~~</code> &#x4F5C;&#x7528;&#x76F8;&#x5F53;&#x4E8E; parseInt &#x53D6;&#x6574;</li>
<li>
<code>(~~(Math.random()*(1&lt;&lt;24))).toString(16)</code> // &#x8F6C;&#x6362;&#x4E3A;&#x4E00;&#x4E2A;&#x5341;&#x516D;&#x8FDB;&#x5236;-</li>
</ol>
<p><strong> JavaScript&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x65B9;&#x6CD5;&#xFF1F;</strong></p>
<ul>
<li>&#x56DE;&#x8C03;&#x51FD;&#x6570;</li>
<li>&#x4E8B;&#x4EF6;&#x76D1;&#x542C;</li>
<li>&#x53D1;&#x5E03;/&#x8BA2;&#x9605;</li>
<li>Promises&#x5BF9;&#x8C61;</li>
<li>Async&#x51FD;&#x6570;[ES7]</li>
</ul>
<p><strong>web&#x5F00;&#x53D1;&#x4E2D;&#x4F1A;&#x8BDD;&#x8DDF;&#x8E2A;&#x7684;&#x65B9;&#x6CD5;&#x6709;&#x54EA;&#x4E9B;</strong></p>
<ul>
<li>cookie</li>
<li>session</li>
<li>url&#x91CD;&#x5199;</li>
<li>&#x9690;&#x85CF;input</li>
<li>ip&#x5730;&#x5740;</li>
</ul>
<p><strong>&#x8BF4;&#x51E0;&#x6761;&#x5199;JavaScript&#x7684;&#x57FA;&#x672C;&#x89C4;&#x8303;&#xFF1F;</strong></p>
<ul>
<li>&#x4E0D;&#x8981;&#x5728;&#x540C;&#x4E00;&#x884C;&#x58F0;&#x660E;&#x591A;&#x4E2A;&#x53D8;&#x91CF;</li>
<li>&#x8BF7;&#x4F7F;&#x7528; ===/!==&#x6765;&#x6BD4;&#x8F83;true/false&#x6216;&#x8005;&#x6570;&#x503C;</li>
<li>&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x66FF;&#x4EE3;new Array&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;</li>
<li>&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x51FD;&#x6570;</li>
<li>Switch&#x8BED;&#x53E5;&#x5FC5;&#x987B;&#x5E26;&#x6709;default&#x5206;&#x652F;</li>
<li>&#x51FD;&#x6570;&#x4E0D;&#x5E94;&#x8BE5;&#x6709;&#x65F6;&#x5019;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;</li>
<li>If&#x8BED;&#x53E5;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;</li>
<li>for-in&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x53D8;&#x91CF; &#x5E94;&#x8BE5;&#x4F7F;&#x7528;var&#x5173;&#x952E;&#x5B57;&#x660E;&#x786E;&#x9650;&#x5B9A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4ECE;&#x800C;&#x907F;&#x514D;&#x4F5C;&#x7528;&#x57DF;&#x6C61;</li>
</ul>
<p><strong>Javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF1F;</strong></p>
<ul>
<li>&#x6784;&#x9020;&#x7EE7;&#x627F;</li>
<li>&#x539F;&#x578B;&#x7EE7;&#x627F;</li>
<li>&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;</li>
<li>&#x62F7;&#x8D1D;&#x7EE7;&#x627F;</li>
<li>&#x539F;&#x578B;prototype&#x673A;&#x5236;&#x6216;apply&#x548C;call&#x65B9;&#x6CD5;&#x53BB;&#x5B9E;&#x73B0;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0E;&#x539F;&#x578B;&#x6DF7;&#x5408;&#x65B9;&#x5F0F;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Parent(){
        this.name = &apos;wang&apos;;
    }

    function Child(){
        this.age = 28;
    }
    Child.prototype = new Parent();//&#x7EE7;&#x627F;&#x4E86;Parent&#xFF0C;&#x901A;&#x8FC7;&#x539F;&#x578B;

    var demo = new Child();
    alert(demo.age);
    alert(demo.name);//&#x5F97;&#x5230;&#x88AB;&#x7EE7;&#x627F;&#x7684;&#x5C5E;&#x6027;
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;wang&apos;</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">this</span>.age = <span class="hljs-number">28</span>;
    }
    Child.prototype = <span class="hljs-keyword">new</span> Parent();<span class="hljs-comment">//&#x7EE7;&#x627F;&#x4E86;Parent&#xFF0C;&#x901A;&#x8FC7;&#x539F;&#x578B;</span>

    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Child();
    alert(demo.age);
    alert(demo.name);<span class="hljs-comment">//&#x5F97;&#x5230;&#x88AB;&#x7EE7;&#x627F;&#x7684;&#x5C5E;&#x6027;</span>
  }</code></pre>
<p><strong>javascript&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF1F;</strong></p>
<blockquote>javascript&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7B80;&#x5355;&#x7684;&#x8BF4;,&#x65E0;&#x975E;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#x6216;&#x5404;&#x79CD;&#x81EA;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x7136;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;JSON&#xFF1B;&#x4F46;&#x5199;&#x6CD5;&#x6709;&#x5F88;&#x591A;&#x79CD;&#xFF0C;&#x4E5F;&#x80FD;&#x6DF7;&#x5408;&#x4F7F;&#x7528;</blockquote>
<ul><li>&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x65B9;&#x5F0F;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person={firstname:&quot;Mark&quot;,lastname:&quot;Yun&quot;,age:25,eyecolor:&quot;black&quot;};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">person={<span class="hljs-string">firstname:</span><span class="hljs-string">&quot;Mark&quot;</span>,<span class="hljs-string">lastname:</span><span class="hljs-string">&quot;Yun&quot;</span>,<span class="hljs-string">age:</span><span class="hljs-number">25</span>,<span class="hljs-string">eyecolor:</span><span class="hljs-string">&quot;black&quot;</span>};</code></pre>
<ul><li>&#x7528;function&#x6765;&#x6A21;&#x62DF;&#x65E0;&#x53C2;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Person(){}
    var person=new Person();//&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;function&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;new&quot;&#x5B9E;&#x4F8B;&#x5316;&quot;,&#x8BE5;function&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x4E00;&#x4E2A;Class
        person.name=&quot;Mark&quot;;
        person.age=&quot;25&quot;;
        person.work=function(){
        alert(person.name+&quot; hello...&quot;);
    }
person.work();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span></span>{}
    <span class="hljs-keyword">var</span> person=<span class="hljs-keyword">new</span> Person();<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;function&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;new&quot;&#x5B9E;&#x4F8B;&#x5316;&quot;,&#x8BE5;function&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x4E00;&#x4E2A;Class</span>
        person.name=<span class="hljs-string">&quot;Mark&quot;</span>;
        person.age=<span class="hljs-string">&quot;25&quot;</span>;
        person.work=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(person.name+<span class="hljs-string">&quot; hello...&quot;</span>);
    }
person.work();</code></pre>
<ul><li>&#x7528;function&#x6765;&#x6A21;&#x62DF;&#x53C2;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#xFF08;&#x7528;this&#x5173;&#x952E;&#x5B57;&#x5B9A;&#x4E49;&#x6784;&#x9020;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x5C5E;&#x6027;&#xFF09;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pet(name,age,hobby){
       this.name=name;//this&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5F53;&#x524D;&#x5BF9;&#x8C61;
       this.age=age;
       this.hobby=hobby;
       this.eat=function(){
          alert(&quot;&#x6211;&#x53EB;&quot;+this.name+&quot;,&#x6211;&#x559C;&#x6B22;&quot;+this.hobby+&quot;,&#x662F;&#x4E2A;&#x7A0B;&#x5E8F;&#x5458;&quot;);
       }
    }
    var maidou =new Pet(&quot;&#x9EA6;&#x515C;&quot;,25,&quot;coding&quot;);//&#x5B9E;&#x4F8B;&#x5316;&#x3001;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;
    maidou.eat();//&#x8C03;&#x7528;eat&#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pet</span><span class="hljs-params">(name,age,hobby)</span></span>{
       <span class="hljs-keyword">this</span>.name=name;<span class="hljs-comment">//this&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5F53;&#x524D;&#x5BF9;&#x8C61;</span>
       <span class="hljs-keyword">this</span>.age=age;
       <span class="hljs-keyword">this</span>.hobby=hobby;
       <span class="hljs-keyword">this</span>.eat=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
          alert(<span class="hljs-string">&quot;&#x6211;&#x53EB;&quot;</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">&quot;,&#x6211;&#x559C;&#x6B22;&quot;</span>+<span class="hljs-keyword">this</span>.hobby+<span class="hljs-string">&quot;,&#x662F;&#x4E2A;&#x7A0B;&#x5E8F;&#x5458;&quot;</span>);
       }
    }
    <span class="hljs-keyword">var</span> maidou =<span class="hljs-keyword">new</span> Pet(<span class="hljs-string">&quot;&#x9EA6;&#x515C;&quot;</span>,<span class="hljs-number">25</span>,<span class="hljs-string">&quot;coding&quot;</span>);<span class="hljs-comment">//&#x5B9E;&#x4F8B;&#x5316;&#x3001;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;</span>
    maidou.eat();<span class="hljs-comment">//&#x8C03;&#x7528;eat&#x65B9;&#x6CD5;</span></code></pre>
<ul><li>&#x7528;&#x5DE5;&#x5382;&#x65B9;&#x5F0F;&#x6765;&#x521B;&#x5EFA;&#xFF08;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#xFF09;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wcDog =new Object();
     wcDog.name=&quot;&#x65FA;&#x8D22;&quot;;
     wcDog.age=3;
     wcDog.work=function(){
       alert(&quot;&#x6211;&#x662F;&quot;+wcDog.name+&quot;,&#x6C6A;&#x6C6A;&#x6C6A;......&quot;);
     }
     wcDog.work();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> wcDog =<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
     wcDog.name=<span class="hljs-string">&quot;&#x65FA;&#x8D22;&quot;</span>;
     wcDog.age=<span class="hljs-number">3</span>;
     wcDog.work=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       alert(<span class="hljs-string">&quot;&#x6211;&#x662F;&quot;</span>+wcDog.name+<span class="hljs-string">&quot;,&#x6C6A;&#x6C6A;&#x6C6A;......&quot;</span>);
     }
     wcDog.work();</code></pre>
<ul><li>&#x7528;&#x539F;&#x578B;&#x65B9;&#x5F0F;&#x6765;&#x521B;&#x5EFA;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dog(){

     }
     Dog.prototype.name=&quot;&#x65FA;&#x8D22;&quot;;
     Dog.prototype.eat=function(){
     alert(this.name+&quot;&#x662F;&#x4E2A;&#x5403;&#x8D27;&quot;);
     }
     var wangcai =new Dog();
     wangcai.eat();
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span><span class="hljs-params">()</span></span>{

     }
     Dog.prototype.name=<span class="hljs-string">&quot;&#x65FA;&#x8D22;&quot;</span>;
     Dog.prototype.eat=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
     alert(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">&quot;&#x662F;&#x4E2A;&#x5403;&#x8D27;&quot;</span>);
     }
     <span class="hljs-keyword">var</span> wangcai =<span class="hljs-keyword">new</span> Dog();
     wangcai.eat();
</code></pre>
<ul><li>&#x7528;&#x6DF7;&#x5408;&#x65B9;&#x5F0F;&#x6765;&#x521B;&#x5EFA;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Car(name,price){
      this.name=name;
      this.price=price; 
    }
     Car.prototype.sell=function(){
       alert(&quot;&#x6211;&#x662F;&quot;+this.name+&quot;&#xFF0C;&#x6211;&#x73B0;&#x5728;&#x5356;&quot;+this.price+&quot;&#x4E07;&#x5143;&quot;);
      }
    var camry =new Car(&quot;&#x51EF;&#x7F8E;&#x745E;&quot;,27);
    camry.sell(); " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span><span class="hljs-params">(name,price)</span></span>{
      <span class="hljs-keyword">this</span>.name=name;
      <span class="hljs-keyword">this</span>.price=price; 
    }
     Car.prototype.sell=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
       alert(<span class="hljs-string">&quot;&#x6211;&#x662F;&quot;</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">&quot;&#xFF0C;&#x6211;&#x73B0;&#x5728;&#x5356;&quot;</span>+<span class="hljs-keyword">this</span>.price+<span class="hljs-string">&quot;&#x4E07;&#x5143;&quot;</span>);
      }
    <span class="hljs-keyword">var</span> camry =<span class="hljs-keyword">new</span> Car(<span class="hljs-string">&quot;&#x51EF;&#x7F8E;&#x745E;&quot;</span>,<span class="hljs-number">27</span>);
    camry.sell(); </code></pre>
<p><strong>null&#xFF0C;undefined &#x7684;&#x533A;&#x522B;&#xFF1F;</strong></p>
<ul>
<li>undefined   &#x8868;&#x793A;&#x4E0D;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x503C;&#x3002;</li>
<li>undefined :&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x793A;&quot;&#x65E0;&quot;&#x7684;&#x539F;&#x59CB;&#x503C;&#x6216;&#x8005;&#x8BF4;&#x8868;&#x793A;&quot;&#x7F3A;&#x5C11;&#x503C;&quot;&#xFF0C;&#x5C31;&#x662F;&#x6B64;&#x5904;&#x5E94;&#x8BE5;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x3002;&#x5F53;&#x5C1D;&#x8BD5;&#x8BFB;&#x53D6;&#x65F6;&#x4F1A;&#x8FD4;&#x56DE; undefined</li>
<li>&#x4F8B;&#x5982;&#x53D8;&#x91CF;&#x88AB;&#x58F0;&#x660E;&#x4E86;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x65F6;&#xFF0C;&#x5C31;&#x7B49;&#x4E8E;undefined</li>
<li>null &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x88AB;&#x5B9A;&#x4E49;&#x4E86;&#xFF0C;&#x503C;&#x4E3A;&#x201C;&#x7A7A;&#x503C;&#x201D;</li>
<li>null : &#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;(&#x7A7A;&#x5BF9;&#x8C61;, &#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;)</li>
<li>&#x4F8B;&#x5982;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#xFF1B;</li>
<li>&#x5728;&#x9A8C;&#x8BC1;null&#x65F6;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x4F7F;&#x7528;&#x3000;=== &#xFF0C;&#x56E0;&#x4E3A; == &#x65E0;&#x6CD5;&#x5206;&#x522B; null &#x548C;&#x3000;undefined</li>
</ul>
<p><strong>&#x5199;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x4E8B;&#x4EF6;&#x4FA6;&#x542C;&#x5668;&#x51FD;&#x6570;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // event(&#x4E8B;&#x4EF6;)&#x5DE5;&#x5177;&#x96C6;&#xFF0C;&#x6765;&#x6E90;&#xFF1A;github.com/markyun
    markyun.Event = {
        // &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != &apos;function&apos;) {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // &#x89C6;&#x80FD;&#x529B;&#x5206;&#x522B;&#x4F7F;&#x7528;dom0||dom2||IE&#x65B9;&#x5F0F; &#x6765;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;
        // &#x53C2;&#x6570;&#xFF1A; &#x64CD;&#x4F5C;&#x7684;&#x5143;&#x7D20;,&#x4E8B;&#x4EF6;&#x540D;&#x79F0; ,&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;&#x3001;&#x9700;&#x8981;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3001;&#x662F;&#x5426;&#x6355;&#x6349;
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent(&apos;on&apos; + type, function() {
                    handler.call(element);
                });
            } else {
                element[&apos;on&apos; + type] = handler;
            }
        },
        // &#x79FB;&#x9664;&#x4E8B;&#x4EF6;
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent(&apos;on&apos; + type, handler);
            } else {
                element[&apos;on&apos; + type] = null;
            }
        },
        // &#x963B;&#x6B62;&#x4E8B;&#x4EF6; (&#x4E3B;&#x8981;&#x662F;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF0C;&#x56E0;&#x4E3A;IE&#x4E0D;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // &#x53D6;&#x6D88;&#x4E8B;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // &#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // &#x83B7;&#x53D6;event&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x53D6;&#x5230;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x4FE1;&#x606F;&#xFF0C;&#x786E;&#x4FDD;&#x968F;&#x65F6;&#x80FD;&#x4F7F;&#x7528;event&#xFF1B;
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev &amp;&amp; Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">// event(&#x4E8B;&#x4EF6;)&#x5DE5;&#x5177;&#x96C6;&#xFF0C;&#x6765;&#x6E90;&#xFF1A;github.com/markyun</span>
    markyun.Event = {
        <span class="hljs-comment">// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;</span>
        readyEvent : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
            <span class="hljs-keyword">if</span> (fn==<span class="hljs-literal">null</span>) {
                fn=<span class="hljs-built_in">document</span>;
            }
            <span class="hljs-keyword">var</span> oldonload = <span class="hljs-built_in">window</span>.onload;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.onload != <span class="hljs-string">&apos;function&apos;</span>) {
                <span class="hljs-built_in">window</span>.onload = fn;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    oldonload();
                    fn();
                };
            }
        },
        <span class="hljs-comment">// &#x89C6;&#x80FD;&#x529B;&#x5206;&#x522B;&#x4F7F;&#x7528;dom0||dom2||IE&#x65B9;&#x5F0F; &#x6765;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</span>
        <span class="hljs-comment">// &#x53C2;&#x6570;&#xFF1A; &#x64CD;&#x4F5C;&#x7684;&#x5143;&#x7D20;,&#x4E8B;&#x4EF6;&#x540D;&#x79F0; ,&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;</span>
        addEvent : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>) </span>{
            <span class="hljs-keyword">if</span> (element.addEventListener) {
                <span class="hljs-comment">//&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;&#x3001;&#x9700;&#x8981;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3001;&#x662F;&#x5426;&#x6355;&#x6349;</span>
                element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
                element.attachEvent(<span class="hljs-string">&apos;on&apos;</span> + type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    handler.call(element);
                });
            } <span class="hljs-keyword">else</span> {
                element[<span class="hljs-string">&apos;on&apos;</span> + type] = handler;
            }
        },
        <span class="hljs-comment">// &#x79FB;&#x9664;&#x4E8B;&#x4EF6;</span>
        removeEvent : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>) </span>{
            <span class="hljs-keyword">if</span> (element.removeEventListener) {
                element.removeEventListener(type, handler, <span class="hljs-literal">false</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.datachEvent) {
                element.detachEvent(<span class="hljs-string">&apos;on&apos;</span> + type, handler);
            } <span class="hljs-keyword">else</span> {
                element[<span class="hljs-string">&apos;on&apos;</span> + type] = <span class="hljs-literal">null</span>;
            }
        },
        <span class="hljs-comment">// &#x963B;&#x6B62;&#x4E8B;&#x4EF6; (&#x4E3B;&#x8981;&#x662F;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF0C;&#x56E0;&#x4E3A;IE&#x4E0D;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;)</span>
        stopPropagation : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
            <span class="hljs-keyword">if</span> (ev.stopPropagation) {
                ev.stopPropagation();
            } <span class="hljs-keyword">else</span> {
                ev.cancelBubble = <span class="hljs-literal">true</span>;
            }
        },
        <span class="hljs-comment">// &#x53D6;&#x6D88;&#x4E8B;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;</span>
        preventDefault : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">if</span> (event.preventDefault) {
                event.preventDefault();
            } <span class="hljs-keyword">else</span> {
                event.returnValue = <span class="hljs-literal">false</span>;
            }
        },
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;</span>
        getTarget : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">return</span> event.target || event.srcElement;
        },
        <span class="hljs-comment">// &#x83B7;&#x53D6;event&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x53D6;&#x5230;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x4FE1;&#x606F;&#xFF0C;&#x786E;&#x4FDD;&#x968F;&#x65F6;&#x80FD;&#x4F7F;&#x7528;event&#xFF1B;</span>
        getEvent : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> ev = e || <span class="hljs-built_in">window</span>.event;
            <span class="hljs-keyword">if</span> (!ev) {
                <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">this</span>.getEvent.caller;
                <span class="hljs-keyword">while</span> (c) {
                    ev = c.arguments[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">if</span> (ev &amp;&amp; Event == ev.constructor) {
                        <span class="hljs-keyword">break</span>;
                    }
                    c = c.caller;
                }
            }
            <span class="hljs-keyword">return</span> ev;
        }
    };</code></pre>
<p><strong>&#x4EC0;&#x4E48;&#x662F;&#x95ED;&#x5305;&#xFF08;closure&#xFF09;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;&#x5B83;&#xFF1F;</strong></p>
<ul>
<li>&#x95ED;&#x5305;&#x662F;&#x6307;&#x6709;&#x6743;&#x8BBF;&#x95EE;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x521B;&#x5EFA;&#x95ED;&#x5305;&#x7684;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5185;&#x521B;&#x5EFA;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x901A;&#x8FC7;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;,&#x5229;&#x7528;&#x95ED;&#x5305;&#x53EF;&#x4EE5;&#x7A81;&#x7834;&#x4F5C;&#x7528;&#x94FE;&#x57DF;</li>
<li>
<p>&#x95ED;&#x5305;&#x7684;&#x7279;&#x6027;&#xFF1A;</p>
<ul>
<li>&#x51FD;&#x6570;&#x5185;&#x518D;&#x5D4C;&#x5957;&#x51FD;&#x6570;</li>
<li>&#x5185;&#x90E8;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5F15;&#x7528;&#x5916;&#x5C42;&#x7684;&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;</li>
<li>&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;&#x4E0D;&#x4F1A;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x56DE;&#x6536;</li>
</ul>
</li>
</ul>
<p><strong>javascript &#x4EE3;&#x7801;&#x4E2D;&#x7684;&quot;use strict&quot;;&#x662F;&#x4EC0;&#x4E48;&#x610F;&#x601D; ? &#x4F7F;&#x7528;&#x5B83;&#x533A;&#x522B;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</strong></p>
<ul><li>use strict&#x662F;&#x4E00;&#x79CD;ECMAscript 5 &#x6DFB;&#x52A0;&#x7684;&#xFF08;&#x4E25;&#x683C;&#xFF09;&#x8FD0;&#x884C;&#x6A21;&#x5F0F;,&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x4F7F;&#x5F97; Javascript &#x5728;&#x66F4;&#x4E25;&#x683C;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x8FD0;&#x884C;,&#x4F7F;JS&#x7F16;&#x7801;&#x66F4;&#x52A0;&#x89C4;&#x8303;&#x5316;&#x7684;&#x6A21;&#x5F0F;,&#x6D88;&#x9664;Javascript&#x8BED;&#x6CD5;&#x7684;&#x4E00;&#x4E9B;&#x4E0D;&#x5408;&#x7406;&#x3001;&#x4E0D;&#x4E25;&#x8C28;&#x4E4B;&#x5904;&#xFF0C;&#x51CF;&#x5C11;&#x4E00;&#x4E9B;&#x602A;&#x5F02;&#x884C;&#x4E3A;</li></ul>
<p><strong>&#x5982;&#x4F55;&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x5C5E;&#x4E8E;&#x67D0;&#x4E2A;&#x7C7B;&#xFF1F;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F7F;&#x7528;instanceof &#xFF08;&#x5F85;&#x5B8C;&#x5584;&#xFF09;
   if(a instanceof Person){
       alert(&apos;yes&apos;);
   }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// &#x4F7F;&#x7528;instanceof &#xFF08;&#x5F85;&#x5B8C;&#x5584;&#xFF09;</span>
   <span class="hljs-keyword">if</span><span class="hljs-comment">(a instanceof Person)</span>{
       alert<span class="hljs-comment">(&apos;yes&apos;)</span>;
   }</code></pre>
<p><strong>new&#x64CD;&#x4F5C;&#x7B26;&#x5177;&#x4F53;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#x5462;?</strong></p>
<ul>
<li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14; this &#x53D8;&#x91CF;&#x5F15;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x7EE7;&#x627F;&#x4E86;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;</li>
<li>&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x88AB;&#x52A0;&#x5165;&#x5230; this &#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x4E2D;</li>
<li>&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x7531; this &#x6240;&#x5F15;&#x7528;&#xFF0C;&#x5E76;&#x4E14;&#x6700;&#x540E;&#x9690;&#x5F0F;&#x7684;&#x8FD4;&#x56DE; this</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs abnf"><code>var obj  = {}<span class="hljs-comment">;</span>
obj.__proto__ = Base.prototype<span class="hljs-comment">;</span>
Base.call(obj)<span class="hljs-comment">;</span></code></pre>
<p><strong>js&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</strong></p>
<ul><li>defer&#x548C;async&#x3001;&#x52A8;&#x6001;&#x521B;&#x5EFA;DOM&#x65B9;&#x5F0F;&#xFF08;&#x7528;&#x5F97;&#x6700;&#x591A;&#xFF09;&#x3001;&#x6309;&#x9700;&#x5F02;&#x6B65;&#x8F7D;&#x5165;js</li></ul>
<p><strong>Ajax &#x662F;&#x4EC0;&#x4E48;? &#x5982;&#x4F55;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Ajax&#xFF1F;</strong></p>
<blockquote>ajax&#x7684;&#x5168;&#x79F0;&#xFF1A;Asynchronous Javascript And XML</blockquote>
<ul>
<li>&#x5F02;&#x6B65;&#x4F20;&#x8F93;+js+xml</li>
<li>&#x6240;&#x8C13;&#x5F02;&#x6B65;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5730;&#x89E3;&#x91CA;&#x5C31;&#x662F;&#xFF1A;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5FC5;&#x7B49;&#x5F85;&#x7ED3;&#x679C;&#xFF0C;&#x800C;&#x662F;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x505A;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x7B49;&#x5230;&#x6709;&#x4E86;&#x7ED3;&#x679C;&#x5B83;&#x81EA;&#x5DF1;&#x4F1A;&#x6839;&#x636E;&#x8BBE;&#x5B9A;&#x8FDB;&#x884C;&#x540E;&#x7EED;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x662F;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x6574;&#x9875;&#x5237;&#x65B0;&#x7684;&#xFF0C;&#x63D0;&#x9AD8;&#x4E86;&#x7528;&#x6237;&#x4F53;&#x9A8C;</li>
<li>&#x521B;&#x5EFA;XMLHttpRequest&#x5BF9;&#x8C61;,&#x4E5F;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5BF9;&#x8C61;</li>
<li>&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;HTTP&#x8BF7;&#x6C42;,&#x5E76;&#x6307;&#x5B9A;&#x8BE5;HTTP&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x6CD5;&#x3001;URL&#x53CA;&#x9A8C;&#x8BC1;&#x4FE1;&#x606F;</li>
<li>&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;HTTP&#x8BF7;&#x6C42;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x7684;&#x51FD;&#x6570;</li>
<li>&#x53D1;&#x9001;HTTP&#x8BF7;&#x6C42;</li>
<li>&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;</li>
<li>&#x7528;JavaScript&#x548C;DOM&#x5B9E;&#x73B0;&#x5C40;&#x90E8;&#x5237;&#x65B0;</li>
</ul>
<p><strong>&#x540C;&#x6B65;&#x548C;&#x5F02;&#x6B65;&#x7684;&#x533A;&#x522B;?</strong></p>
<ul>
<li>&#x540C;&#x6B65;&#xFF1A;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#xFF0C;&#x7528;&#x6237;&#x770B;&#x5F97;&#x5230;&#x9875;&#x9762;&#x5237;&#x65B0;&#xFF0C;&#x91CD;&#x65B0;&#x53D1;&#x8BF7;&#x6C42;,&#x7B49;&#x8BF7;&#x6C42;&#x5B8C;&#xFF0C;&#x9875;&#x9762;&#x5237;&#x65B0;&#xFF0C;&#x65B0;&#x5185;&#x5BB9;&#x51FA;&#x73B0;&#xFF0C;&#x7528;&#x6237;&#x770B;&#x5230;&#x65B0;&#x5185;&#x5BB9;,&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;</li>
<li>&#x5F02;&#x6B65;&#xFF1A;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#xFF0C;&#x7528;&#x6237;&#x6B63;&#x5E38;&#x64CD;&#x4F5C;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x540E;&#x7AEF;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;&#x7B49;&#x8BF7;&#x6C42;&#x5B8C;&#xFF0C;&#x9875;&#x9762;&#x4E0D;&#x5237;&#x65B0;&#xFF0C;&#x65B0;&#x5185;&#x5BB9;&#x4E5F;&#x4F1A;&#x51FA;&#x73B0;&#xFF0C;&#x7528;&#x6237;&#x770B;&#x5230;&#x65B0;&#x5185;&#x5BB9;</li>
</ul>
<p><strong>documen.write&#x548C; innerHTML&#x7684;&#x533A;&#x522B;</strong></p>
<ul>
<li>document.write&#x53EA;&#x80FD;&#x91CD;&#x7ED8;&#x6574;&#x4E2A;&#x9875;&#x9762;</li>
<li>innerHTML&#x53EF;&#x4EE5;&#x91CD;&#x7ED8;&#x9875;&#x9762;&#x7684;&#x4E00;&#x90E8;&#x5206;</li>
</ul>
<p><strong>DOM&#x64CD;&#x4F5C;&#x2014;&#x2014;&#x600E;&#x6837;&#x6DFB;&#x52A0;&#x3001;&#x79FB;&#x9664;&#x3001;&#x79FB;&#x52A8;&#x3001;&#x590D;&#x5236;&#x3001;&#x521B;&#x5EFA;&#x548C;&#x67E5;&#x627E;&#x8282;&#x70B9;?</strong></p>
<ul>
<li>
<p>&#xFF08;1&#xFF09;&#x521B;&#x5EFA;&#x65B0;&#x8282;&#x70B9;</p>
<ul>
<li>createDocumentFragment() //&#x521B;&#x5EFA;&#x4E00;&#x4E2A;DOM&#x7247;&#x6BB5;</li>
<li>createElement()   //&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x5143;&#x7D20;</li>
<li>createTextNode()   //&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;</li>
</ul>
</li>
<li>
<p>&#xFF08;2&#xFF09;&#x6DFB;&#x52A0;&#x3001;&#x79FB;&#x9664;&#x3001;&#x66FF;&#x6362;&#x3001;&#x63D2;&#x5165;</p>
<ul>
<li>appendChild()</li>
<li>removeChild()</li>
<li>replaceChild()</li>
<li>insertBefore() //&#x5728;&#x5DF2;&#x6709;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x524D;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;</li>
</ul>
</li>
<li>
<p>&#xFF08;3&#xFF09;&#x67E5;&#x627E;</p>
<ul>
<li>getElementsByTagName()    //&#x901A;&#x8FC7;&#x6807;&#x7B7E;&#x540D;&#x79F0;</li>
<li>getElementsByName()    // &#x901A;&#x8FC7;&#x5143;&#x7D20;&#x7684;Name&#x5C5E;&#x6027;&#x7684;&#x503C;(IE&#x5BB9;&#x9519;&#x80FD;&#x529B;&#x8F83;&#x5F3A;&#xFF0C;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x62EC;id&#x7B49;&#x4E8E;name&#x503C;&#x7684;)</li>
<li>getElementById()    //&#x901A;&#x8FC7;&#x5143;&#x7D20;Id&#xFF0C;&#x552F;&#x4E00;&#x6027;</li>
</ul>
</li>
</ul>
<p><strong>&#x90A3;&#x4E9B;&#x64CD;&#x4F5C;&#x4F1A;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#xFF1F;</strong></p>
<ul>
<li>&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x6307;&#x4EFB;&#x4F55;&#x5BF9;&#x8C61;&#x5728;&#x60A8;&#x4E0D;&#x518D;&#x62E5;&#x6709;&#x6216;&#x9700;&#x8981;&#x5B83;&#x4E4B;&#x540E;&#x4ECD;&#x7136;&#x5B58;&#x5728;</li>
<li>&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x5B9A;&#x671F;&#x626B;&#x63CF;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x8BA1;&#x7B97;&#x5F15;&#x7528;&#x4E86;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x91CF;&#x3002;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x6570;&#x91CF;&#x4E3A; 0&#xFF08;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#x8FC7;&#x8BE5;&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;&#x6216;&#x5BF9;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x60DF;&#x4E00;&#x5F15;&#x7528;&#x662F;&#x5FAA;&#x73AF;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5B58;&#x5373;&#x53EF;&#x56DE;&#x6536;</li>
<li>setTimeout &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F7F;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x800C;&#x975E;&#x51FD;&#x6570;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x5F15;&#x53D1;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;</li>
<li>&#x95ED;&#x5305;&#x3001;&#x63A7;&#x5236;&#x53F0;&#x65E5;&#x5FD7;&#x3001;&#x5FAA;&#x73AF;&#xFF08;&#x5728;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5F7C;&#x6B64;&#x5F15;&#x7528;&#x4E14;&#x5F7C;&#x6B64;&#x4FDD;&#x7559;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#xFF09;</li>
</ul>
<p><strong>&#x6E10;&#x8FDB;&#x589E;&#x5F3A;&#x548C;&#x4F18;&#x96C5;&#x964D;&#x7EA7;</strong></p>
<ul>
<li>&#x6E10;&#x8FDB;&#x589E;&#x5F3A; &#xFF1A;&#x9488;&#x5BF9;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x884C;&#x6784;&#x5EFA;&#x9875;&#x9762;&#xFF0C;&#x4FDD;&#x8BC1;&#x6700;&#x57FA;&#x672C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x9488;&#x5BF9;&#x9AD8;&#x7EA7;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x884C;&#x6548;&#x679C;&#x3001;&#x4EA4;&#x4E92;&#x7B49;&#x6539;&#x8FDB;&#x548C;&#x8FFD;&#x52A0;&#x529F;&#x80FD;&#x8FBE;&#x5230;&#x66F4;&#x597D;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;</li>
<li>&#x4F18;&#x96C5;&#x964D;&#x7EA7; &#xFF1A;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x6784;&#x5EFA;&#x5B8C;&#x6574;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x9488;&#x5BF9;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x8FDB;&#x884C;&#x517C;&#x5BB9;</li>
</ul>
<p><strong>Javascript&#x5783;&#x573E;&#x56DE;&#x6536;&#x65B9;&#x6CD5;</strong></p>
<ul><li>&#x6807;&#x8BB0;&#x6E05;&#x9664;&#xFF08;mark and sweep&#xFF09;</li></ul>
<blockquote><ul>
<li>&#x8FD9;&#x662F;JavaScript&#x6700;&#x5E38;&#x89C1;&#x7684;&#x5783;&#x573E;&#x56DE;&#x6536;&#x65B9;&#x5F0F;&#xFF0C;&#x5F53;&#x53D8;&#x91CF;&#x8FDB;&#x5165;&#x6267;&#x884C;&#x73AF;&#x5883;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x51FD;&#x6570;&#x4E2D;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x5C06;&#x5176;&#x6807;&#x8BB0;&#x4E3A;&#x201C;&#x8FDB;&#x5165;&#x73AF;&#x5883;&#x201D;&#xFF0C;&#x5F53;&#x53D8;&#x91CF;&#x79BB;&#x5F00;&#x73AF;&#x5883;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7ED3;&#x675F;&#xFF09;&#x5C06;&#x5176;&#x6807;&#x8BB0;&#x4E3A;&#x201C;&#x79BB;&#x5F00;&#x73AF;&#x5883;&#x201D;</li>
<li>&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x4F1A;&#x5728;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x7ED9;&#x5B58;&#x50A8;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x52A0;&#x4E0A;&#x6807;&#x8BB0;&#xFF0C;&#x7136;&#x540E;&#x53BB;&#x6389;&#x73AF;&#x5883;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x4EE5;&#x53CA;&#x88AB;&#x73AF;&#x5883;&#x4E2D;&#x53D8;&#x91CF;&#x6240;&#x5F15;&#x7528;&#x7684;&#x53D8;&#x91CF;&#xFF08;&#x95ED;&#x5305;&#xFF09;&#xFF0C;&#x5728;&#x8FD9;&#x4E9B;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x4ECD;&#x5B58;&#x5728;&#x6807;&#x8BB0;&#x7684;&#x5C31;&#x662F;&#x8981;&#x5220;&#x9664;&#x7684;&#x53D8;&#x91CF;&#x4E86;</li>
</ul></blockquote>
<p><strong>&#x5F15;&#x7528;&#x8BA1;&#x6570;(reference counting)</strong></p>
<blockquote>&#x5728;&#x4F4E;&#x7248;&#x672C;IE&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x51FA;&#x73B0;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x5C31;&#x662F;&#x56E0;&#x4E3A;&#x5176;&#x91C7;&#x7528;&#x5F15;&#x7528;&#x8BA1;&#x6570;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5783;&#x573E;&#x56DE;&#x6536;&#x3002;&#x5F15;&#x7528;&#x8BA1;&#x6570;&#x7684;&#x7B56;&#x7565;&#x662F;&#x8DDF;&#x8E2A;&#x8BB0;&#x5F55;&#x6BCF;&#x4E2A;&#x503C;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x6B21;&#x6570;&#xFF0C;&#x5F53;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E2A; &#x53D8;&#x91CF;&#x5E76;&#x5C06;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x8D4B;&#x503C;&#x7ED9;&#x8BE5;&#x53D8;&#x91CF;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#x5F15;&#x7528;&#x6B21;&#x6570;&#x5C31;&#x52A0;1&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x53D8;&#x6210;&#x4E86;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#xFF0C;&#x5219;&#x8FD9;&#x4E2A;&#x503C;&#x5F97;&#x5F15;&#x7528;&#x6B21;&#x6570;&#x51CF;1&#xFF0C;&#x5F53;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#x5F15;&#x7528;&#x6B21;&#x6570;&#x53D8;&#x4E3A;0&#x7684;&#x65F6; &#x5019;&#xFF0C;&#x8BF4;&#x660E;&#x6CA1;&#x6709;&#x53D8;&#x91CF;&#x5728;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x6CA1;&#x6CD5;&#x88AB;&#x8BBF;&#x95EE;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x5360;&#x7528;&#x7684;&#x7A7A;&#x95F4;&#x56DE;&#x6536;&#xFF0C;&#x8FD9;&#x6837;&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x4F1A;&#x5728;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x6E05;&#x7406;&#x6389;&#x5F15;&#x7528;&#x6B21;&#x6570;&#x4E3A;0&#x7684;&#x503C;&#x5360;&#x7528;&#x7684;&#x7A7A;&#x95F4;</blockquote>
<p><strong>js&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x53CA;&#x5176;&#x4F18;&#x7F3A;&#x70B9;</strong></p>
<ul>
<li>
<p>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;</p>
<ul><li>&#x4E00;&#x662F;&#x5B57;&#x9762;&#x91CF;&#x91CD;&#x5199;&#x539F;&#x578B;&#x4F1A;&#x4E2D;&#x65AD;&#x5173;&#x7CFB;&#xFF0C;&#x4F7F;&#x7528;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#xFF0C;&#x5E76;&#x4E14;&#x5B50;&#x7C7B;&#x578B;&#x8FD8;&#x65E0;&#x6CD5;&#x7ED9;&#x8D85;&#x7C7B;&#x578B;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x3002;</li></ul>
</li>
<li>
<p>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF08;&#x7C7B;&#x5F0F;&#x7EE7;&#x627F;&#xFF09;</p>
<ul><li>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x867D;&#x7136;&#x89E3;&#x51B3;&#x4E86;&#x521A;&#x624D;&#x4E24;&#x79CD;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x539F;&#x578B;&#xFF0C;&#x5219;&#x590D;&#x7528;&#x65E0;&#x4ECE;&#x8C08;&#x8D77;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x539F;&#x578B;&#x94FE;+&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x79F0;&#x4E3A;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</li></ul>
</li>
<li>
<p>&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</p>
<ul><li>&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x79CD;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x80CC;&#x540E;&#x7684;&#x601D;&#x8DEF;&#x662F;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x5BF9;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x800C;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7684;&#x7EE7;&#x627F;&#x3002;&#x8FD9;&#x6837;&#xFF0C;&#x65E2;&#x901A;&#x8FC7;&#x5728;&#x539F;&#x578B;&#x4E0A;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x51FD;&#x6570;&#x590D;&#x7528;&#xFF0C;&#x53C8;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x3002;</li></ul>
</li>
</ul>
<p><strong>defer&#x548C;async</strong></p>
<ul><li>defer&#x5E76;&#x884C;&#x52A0;&#x8F7D;js&#x6587;&#x4EF6;&#xFF0C;&#x4F1A;&#x6309;&#x7167;&#x9875;&#x9762;&#x4E0A;script&#x6807;&#x7B7E;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;async&#x5E76;&#x884C;&#x52A0;&#x8F7D;js&#x6587;&#x4EF6;&#xFF0C;&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x4F1A;&#x6309;&#x7167;&#x9875;&#x9762;&#x4E0A;script&#x6807;&#x7B7E;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;</li></ul>
<p><strong>&#x7528;&#x8FC7;&#x54EA;&#x4E9B;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF1F;</strong></p>
<ul><li>
<p>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF1A;</p>
<ul>
<li>&#x4E3B;&#x8981;&#x597D;&#x5904;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x6D88;&#x9664;&#x5BF9;&#x8C61;&#x95F4;&#x7684;&#x8026;&#x5408;&#xFF0C;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x5DE5;&#x7A0B;&#x65B9;&#x6CD5;&#x800C;&#x4E0D;&#x662F;new&#x5173;&#x952E;&#x5B57;&#x3002;&#x5C06;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x96C6;&#x4E2D;&#x5728;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x9632;&#x6B62;&#x4EE3;&#x7801;&#x91CD;&#x590D;</li>
<li>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x89E3;&#x51B3;&#x4E86;&#x91CD;&#x590D;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x95EE;&#x9898; &#xFF0C;&#x4F46;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;,&#x90A3;&#x5C31;&#x662F;&#x8BC6;&#x522B;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x6839;&#x672C;&#x65E0;&#x6CD5; &#x641E;&#x6E05;&#x695A;&#x4ED6;&#x4EEC;&#x5230;&#x5E95;&#x662F;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5B9E;&#x4F8B;</li>
</ul>
</li></ul>
<p>-</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createObject(name,age,profession){//&#x96C6;&#x4E2D;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x51FD;&#x6570;var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = function () {
        return this.name + &apos; at &apos; + this.age + &apos; engaged in &apos; + this.profession;
    };
    return obj;
}
var test1 = createObject(&apos;trigkit4&apos;,22,&apos;programmer&apos;);//&#x7B2C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;var test2 = createObject(&apos;mike&apos;,25,&apos;engineer&apos;);//&#x7B2C;&#x4E8C;&#x4E2A;&#x5B9E;&#x4F8B;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObject</span><span class="hljs-params">(name,age,profession)</span></span>{<span class="hljs-comment">//&#x96C6;&#x4E2D;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x51FD;&#x6570;var obj = new Object();</span>
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos; at &apos;</span> + <span class="hljs-keyword">this</span>.age + <span class="hljs-string">&apos; engaged in &apos;</span> + <span class="hljs-keyword">this</span>.profession;
    };
    <span class="hljs-keyword">return</span> obj;
}
<span class="hljs-keyword">var</span> test1 = createObject(<span class="hljs-string">&apos;trigkit4&apos;</span>,<span class="hljs-number">22</span>,<span class="hljs-string">&apos;programmer&apos;</span>);<span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;var test2 = createObject(&apos;mike&apos;,25,&apos;engineer&apos;);//&#x7B2C;&#x4E8C;&#x4E2A;&#x5B9E;&#x4F8B;</span>
</code></pre>
<ul>
<li>
<p>&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</p>
<ul><li>&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x6CD5; &#xFF0C;&#x5373;&#x89E3;&#x51B3;&#x4E86;&#x91CD;&#x590D;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x95EE;&#x9898; &#xFF0C;&#x53C8;&#x89E3;&#x51B3;&#x4E86;&#x5BF9;&#x8C61;&#x8BC6;&#x522B;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8BE5;&#x6A21;&#x5F0F;&#x4E0E;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7684;&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#x5728;&#x4E8E;</li></ul>
</li>
<li>&#x6784;&#x9020;&#x51FD;&#x6570;&#x65B9;&#x6CD5;&#x6CA1;&#x6709;&#x663E;&#x793A;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61; (new Object());</li>
<li>&#x76F4;&#x63A5;&#x5C06;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x8D4B;&#x503C;&#x7ED9; this &#x5BF9;&#x8C61;;</li>
<li>&#x6CA1;&#x6709; renturn &#x8BED;&#x53E5;</li>
</ul>
<p><strong>&#x8BF7;&#x89E3;&#x91CA;&#x4E00;&#x4E0B; JavaScript &#x7684;&#x540C;&#x6E90;&#x7B56;&#x7565;</strong></p>
<ul>
<li>&#x6982;&#x5FF5;:&#x540C;&#x6E90;&#x7B56;&#x7565;&#x662F;&#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#xFF08;&#x5C24;&#x5176;&#x662F;Javascript&#xFF09;&#x7684;&#x91CD;&#x8981;&#x7684;&#x5B89;&#x5168;&#x5EA6;&#x91CF;&#x6807;&#x51C6;&#x3002;&#x5B83;&#x6700;&#x65E9;&#x51FA;&#x81EA;Netscape Navigator2.0&#xFF0C;&#x5176;&#x76EE;&#x7684;&#x662F;&#x9632;&#x6B62;&#x67D0;&#x4E2A;&#x6587;&#x6863;&#x6216;&#x811A;&#x672C;&#x4ECE;&#x591A;&#x4E2A;&#x4E0D;&#x540C;&#x6E90;&#x88C5;&#x8F7D;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x6307;&#x7684;&#x662F;&#xFF1A;&#x534F;&#x8BAE;&#xFF0C;&#x57DF;&#x540D;&#xFF0C;&#x7AEF;&#x53E3;&#x76F8;&#x540C;&#xFF0C;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x662F;&#x4E00;&#x79CD;&#x5B89;&#x5168;&#x534F;&#x8BAE;</li>
<li>&#x6307;&#x4E00;&#x6BB5;&#x811A;&#x672C;&#x53EA;&#x80FD;&#x8BFB;&#x53D6;&#x6765;&#x81EA;&#x540C;&#x4E00;&#x6765;&#x6E90;&#x7684;&#x7A97;&#x53E3;&#x548C;&#x6587;&#x6863;&#x7684;&#x5C5E;&#x6027;</li>
</ul>
<p><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x6709;&#x540C;&#x6E90;&#x9650;&#x5236;&#xFF1F;</strong></p>
<ul>
<li>&#x6211;&#x4EEC;&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#xFF1A;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x9ED1;&#x5BA2;&#x7A0B;&#x5E8F;&#xFF0C;&#x4ED6;&#x5229;&#x7528;Iframe&#x628A;&#x771F;&#x6B63;&#x7684;&#x94F6;&#x884C;&#x767B;&#x5F55;&#x9875;&#x9762;&#x5D4C;&#x5230;&#x4ED6;&#x7684;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x5F53;&#x4F60;&#x4F7F;&#x7528;&#x771F;&#x5B9E;&#x7684;&#x7528;&#x6237;&#x540D;&#xFF0C;&#x5BC6;&#x7801;&#x767B;&#x5F55;&#x65F6;&#xFF0C;&#x4ED6;&#x7684;&#x9875;&#x9762;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;Javascript&#x8BFB;&#x53D6;&#x5230;&#x4F60;&#x7684;&#x8868;&#x5355;&#x4E2D;input&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8FD9;&#x6837;&#x7528;&#x6237;&#x540D;&#xFF0C;&#x5BC6;&#x7801;&#x5C31;&#x8F7B;&#x677E;&#x5230;&#x624B;&#x4E86;&#x3002;</li>
<li>
<p>&#x7F3A;&#x70B9;</p>
<ul><li>&#x73B0;&#x5728;&#x7F51;&#x7AD9;&#x7684;JS&#x90FD;&#x4F1A;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#xFF0C;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x7528;&#x4E86;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x800C;&#x53E6;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x3002;&#x8FD9;&#x65F6;&#x8FD9;&#x4E9B;&#x672C;&#x6765;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x88AB; merge&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E32;&#x5C31;&#x5230;&#x4E86;&#x6587;&#x4EF6;&#x7684;&#x4E2D;&#x95F4;&#xFF0C;&#x4E0D;&#x4EC5;&#x6CA1;&#x6709;&#x6307;&#x793A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x53CD;&#x800C;&#x5728;&#x538B;&#x7F29;&#x540E;&#x6D6A;&#x8D39;&#x4E86;&#x5B57;&#x8282;</li></ul>
</li>
</ul>
<p><strong>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x51FD;&#x6570;clone&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;JavaScript&#x4E2D;&#x7684;5&#x79CD;&#x4E3B;&#x8981;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF08;&#x5305;&#x62EC;Number&#x3001;String&#x3001;Object&#x3001;Array&#x3001;Boolean&#xFF09;&#x8FDB;&#x884C;&#x503C;&#x590D;&#x5236;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.clone = function(){

            var o = this.constructor === Array ? [] : {};

            for(var e in this){

                    o[e] = typeof this[e] === &quot;object&quot; ? this[e].clone() : this[e];

            }

            return o;
    }
    " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Object.prototype.clone = function(){

            <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">constructor</span> === Array ? [] : {};

            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> e <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>){

                    o[e] = typeof <span class="hljs-keyword">this</span>[e] === <span class="hljs-string">&quot;object&quot;</span> ? <span class="hljs-keyword">this</span>[e].clone() : <span class="hljs-keyword">this</span>[e];

            }

            <span class="hljs-keyword">return</span> o;
    }
    </code></pre>
<p><strong>&#x8BF4;&#x8BF4;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x7684;&#x9650;&#x5236;</strong></p>
<ul>
<li>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E3B;&#x8981;&#x6709;&#x4EE5;&#x4E0B;&#x9650;&#x5236;&#xFF1A;</li>
<li>&#x53D8;&#x91CF;&#x5FC5;&#x987B;&#x58F0;&#x660E;&#x540E;&#x518D;&#x4F7F;&#x7528;</li>
<li>&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x80FD;&#x6709;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;</li>
<li>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;with&#x8BED;&#x53E5;</li>
<li>&#x4E0D;&#x80FD;&#x5BF9;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;</li>
<li>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x524D;&#x7F00;0&#x8868;&#x793A;&#x516B;&#x8FDB;&#x5236;&#x6570;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;</li>
<li>&#x4E0D;&#x80FD;&#x5220;&#x9664;&#x4E0D;&#x53EF;&#x5220;&#x9664;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;</li>
<li>&#x4E0D;&#x80FD;&#x5220;&#x9664;&#x53D8;&#x91CF;delete prop&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x53EA;&#x80FD;&#x5220;&#x9664;&#x5C5E;&#x6027;delete global[prop]</li>
<li>eval&#x4E0D;&#x4F1A;&#x5728;&#x5B83;&#x7684;&#x5916;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x5F15;&#x5165;&#x53D8;&#x91CF;</li>
<li>eval&#x548C;arguments&#x4E0D;&#x80FD;&#x88AB;&#x91CD;&#x65B0;&#x8D4B;&#x503C;</li>
<li>arguments&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x53CD;&#x6620;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x53D8;&#x5316;</li>
<li>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;arguments.callee</li>
<li>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;arguments.caller</li>
<li>&#x7981;&#x6B62;this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;</li>
<li>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;fn.caller&#x548C;fn.arguments&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;&#x5806;&#x6808;</li>
<li>&#x589E;&#x52A0;&#x4E86;&#x4FDD;&#x7559;&#x5B57;&#xFF08;&#x6BD4;&#x5982;protected&#x3001;static&#x548C;interface&#xFF09;</li>
</ul>
<p><strong>&#x5982;&#x4F55;&#x5220;&#x9664;&#x4E00;&#x4E2A;cookie</strong></p>
<ul><li>&#x5C06;&#x65F6;&#x95F4;&#x8BBE;&#x4E3A;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x5F80;&#x524D;&#x4E00;&#x70B9;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();

date.setDate(date.getDate() - 1);//&#x771F;&#x6B63;&#x7684;&#x5220;&#x9664;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>();

<span class="hljs-built_in">date</span>.setDate(<span class="hljs-built_in">date</span>.getDate() - <span class="hljs-number">1</span>);<span class="hljs-comment">//&#x771F;&#x6B63;&#x7684;&#x5220;&#x9664;</span></code></pre>
<p>setDate()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6708;&#x7684;&#x67D0;&#x4E00;&#x5929;</p>
<ul><li>expires&#x7684;&#x8BBE;&#x7F6E;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  document.cookie = &apos;user=&apos;+ encodeURIComponent(&apos;name&apos;)  + &apos;;expires = &apos; + new Date(0)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">&apos;user=&apos;</span>+ <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">&apos;name&apos;</span>)  + <span class="hljs-string">&apos;;expires = &apos;</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>)</code></pre>
<p><strong>&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5; &#x6C42;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5B57;&#x8282;&#x957F;&#x5EA6;</strong></p>
<ul><li>&#x5047;&#x8BBE;&#xFF1A;&#x4E00;&#x4E2A;&#x82F1;&#x6587;&#x5B57;&#x7B26;&#x5360;&#x7528;&#x4E00;&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x4E00;&#x4E2A;&#x4E2D;&#x6587;&#x5B57;&#x7B26;&#x5360;&#x7528;&#x4E24;&#x4E2A;&#x5B57;&#x8282;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GetBytes(str){

        var len = str.length;

        var bytes = len;

        for(var i=0; i&lt;len; i++){

            if (str.charCodeAt(i) &gt; 255) bytes++;

        }

        return bytes;

    }

alert(GetBytes(&quot;&#x4F60;&#x597D;,as&quot;));
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetBytes</span><span class="hljs-params">(str)</span></span>{

        <span class="hljs-keyword">var</span> len = str.length;

        <span class="hljs-keyword">var</span> bytes = len;

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;len; i++){

            <span class="hljs-keyword">if</span> (str.charCodeAt(i) &gt; <span class="hljs-number">255</span>) bytes++;

        }

        <span class="hljs-keyword">return</span> bytes;

    }

alert(GetBytes(<span class="hljs-string">&quot;&#x4F60;&#x597D;,as&quot;</span>));
</code></pre>
<p><strong>&#x8BF7;&#x89E3;&#x91CA;&#x4EC0;&#x4E48;&#x662F;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;</strong></p>
<ul><li>&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#xFF08;Event Delegation&#xFF09;&#xFF0C;&#x53C8;&#x79F0;&#x4E4B;&#x4E3A;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x3002;&#x662F; JavaScript &#x4E2D;&#x5E38;&#x7528;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x5E38;&#x7528;&#x6280;&#x5DE7;&#x3002;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x201C;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#x201D;&#x5373;&#x662F;&#x628A;&#x539F;&#x672C;&#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x7ED9;&#x7236;&#x5143;&#x7D20;&#xFF0C;&#x8BA9;&#x7236;&#x5143;&#x7D20;&#x62C5;&#x5F53;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x7684;&#x804C;&#x52A1;&#x3002;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#x7684;&#x539F;&#x7406;&#x662F;DOM&#x5143;&#x7D20;&#x7684;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x3002;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#x7684;&#x597D;&#x5904;&#x662F;&#x53EF;&#x4EE5;&#x63D0;&#x9AD8;&#x6027;&#x80FD;</li></ul>
<p><strong>attribute&#x548C;property&#x7684;&#x533A;&#x522B;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</strong></p>
<ul>
<li>attribute&#x662F;dom&#x5143;&#x7D20;&#x5728;&#x6587;&#x6863;&#x4E2D;&#x4F5C;&#x4E3A;html&#x6807;&#x7B7E;&#x62E5;&#x6709;&#x7684;&#x5C5E;&#x6027;&#xFF1B;</li>
<li>property&#x5C31;&#x662F;dom&#x5143;&#x7D20;&#x5728;js&#x4E2D;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x62E5;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x3002;</li>
<li>&#x5BF9;&#x4E8E;html&#x7684;&#x6807;&#x51C6;&#x5C5E;&#x6027;&#x6765;&#x8BF4;&#xFF0C;attribute&#x548C;property&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x662F;&#x4F1A;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x7684;</li>
<li>&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x6765;&#x8BF4;&#xFF0C;&#x4ED6;&#x4EEC;&#x662F;&#x4E0D;&#x540C;&#x6B65;&#x7684;</li>
</ul>
<p><strong>&#x9875;&#x9762;&#x7F16;&#x7801;&#x548C;&#x88AB;&#x8BF7;&#x6C42;&#x7684;&#x8D44;&#x6E90;&#x7F16;&#x7801;&#x5982;&#x679C;&#x4E0D;&#x4E00;&#x81F4;&#x5982;&#x4F55;&#x5904;&#x7406;&#xFF1F;</strong></p>
<ul>
<li>&#x540E;&#x7AEF;&#x54CD;&#x5E94;&#x5934;&#x8BBE;&#x7F6E; charset</li>
<li>&#x524D;&#x7AEF;&#x9875;&#x9762;<code>&lt;meta&gt;</code>&#x8BBE;&#x7F6E; charset</li>
</ul>
<p><strong>&#x628A;<code>&lt;script&gt;</code>&#x653E;&#x5728;<code>&lt;/body&gt;</code>&#x4E4B;&#x524D;&#x548C;&#x4E4B;&#x540E;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF1F;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x5982;&#x4F55;&#x89E3;&#x6790;&#x5B83;&#x4EEC;&#xFF1F;</strong></p>
<ul>
<li>&#x6309;&#x7167;HTML&#x6807;&#x51C6;&#xFF0C;&#x5728;<code>&lt;/body&gt;</code>&#x7ED3;&#x675F;&#x540E;&#x51FA;&#x73B0;<code>&lt;script&gt;</code>&#x6216;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#x7684;&#x5F00;&#x59CB;&#x6807;&#x7B7E;&#xFF0C;&#x90FD;&#x662F;&#x89E3;&#x6790;&#x9519;&#x8BEF;</li>
<li>&#x867D;&#x7136;&#x4E0D;&#x7B26;&#x5408;HTML&#x6807;&#x51C6;&#xFF0C;&#x4F46;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x81EA;&#x52A8;&#x5BB9;&#x9519;&#xFF0C;&#x4F7F;&#x5B9E;&#x9645;&#x6548;&#x679C;&#x4E0E;&#x5199;&#x5728;<code>&lt;/body&gt;</code>&#x4E4B;&#x524D;&#x6CA1;&#x6709;&#x533A;&#x522B;</li>
<li>&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5BB9;&#x9519;&#x673A;&#x5236;&#x4F1A;&#x5FFD;&#x7565;&lt;script&gt;&#x4E4B;&#x524D;&#x7684;<code>&lt;/body&gt;</code>&#xFF0C;&#x89C6;&#x4F5C;<code>&lt;script&gt;</code>&#x4ECD;&#x5728; body &#x4F53;&#x5185;&#x3002;&#x7701;&#x7565;<code>&lt;/body&gt;</code>&#x548C;<code>&lt;/html&gt;</code>&#x95ED;&#x5408;&#x6807;&#x7B7E;&#x7B26;&#x5408;HTML&#x6807;&#x51C6;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8FD9;&#x4E00;&#x6807;&#x51C6;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x8F93;&#x51FA;&#x5185;&#x5BB9;</li>
</ul>
<p><strong>&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;JS&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</strong></p>
<ul>
<li>&#x8BBE;&#x7F6E;<code>&lt;script&gt;</code>&#x5C5E;&#x6027; defer=&quot;defer&quot; &#xFF08;&#x811A;&#x672C;&#x5C06;&#x5728;&#x9875;&#x9762;&#x5B8C;&#x6210;&#x89E3;&#x6790;&#x65F6;&#x6267;&#x884C;&#xFF09;</li>
<li>&#x52A8;&#x6001;&#x521B;&#x5EFA; script DOM&#xFF1A;document.createElement(&apos;script&apos;);</li>
<li>XmlHttpRequest &#x811A;&#x672C;&#x6CE8;&#x5165;</li>
<li>&#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x5DE5;&#x5177; LazyLoad</li>
</ul>
<p><strong>&#x5F02;&#x6B65;&#x52A0;&#x8F7D;JS&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</strong></p>
<ul>
<li>&#x8BBE;&#x7F6E;<code>&lt;script&gt;</code>&#x5C5E;&#x6027; async=&quot;async&quot; &#xFF08;&#x4E00;&#x65E6;&#x811A;&#x672C;&#x53EF;&#x7528;&#xFF0C;&#x5219;&#x4F1A;&#x5F02;&#x6B65;&#x6267;&#x884C;&#xFF09;</li>
<li>&#x52A8;&#x6001;&#x521B;&#x5EFA; script DOM&#xFF1A;document.createElement(&apos;script&apos;);</li>
<li>XmlHttpRequest &#x811A;&#x672C;&#x6CE8;&#x5165;</li>
<li>&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x5E93; LABjs</li>
<li>&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668; Sea.js</li>
</ul>
<p><strong>JavaScript &#x4E2D;&#xFF0C;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x6709;&#x54EA;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF1F;</strong></p>
<ul>
<li>&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x6A21;&#x5F0F;          Foo.foo(arg1, arg2);</li>
<li>&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6A21;&#x5F0F;          foo(arg1, arg2);</li>
<li>&#x6784;&#x9020;&#x5668;&#x8C03;&#x7528;&#x6A21;&#x5F0F;        (new Foo())(arg1, arg2);</li>
<li>call/applay&#x8C03;&#x7528;&#x6A21;&#x5F0F;   Foo.foo.call(that, arg1, arg2);</li>
<li>bind&#x8C03;&#x7528;&#x6A21;&#x5F0F;          Foo.foo.bind(that)(arg1, arg2)();</li>
</ul>
<p><strong>&#x7B80;&#x5355;&#x5B9E;&#x73B0; Function.bind &#x51FD;&#x6570;&#xFF1F;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (!Function.prototype.bind) {
    Function.prototype.bind = function(that) {
      var func = this, args = arguments;
      return function() {
        return func.apply(that, Array.prototype.slice.call(args, 1));
      }
    }
  }
  // &#x53EA;&#x652F;&#x6301; bind &#x9636;&#x6BB5;&#x7684;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF1A;
  func.bind(that, arg1, arg2)();

  // &#x4E0D;&#x652F;&#x6301;&#x4EE5;&#x4E0B;&#x8C03;&#x7528;&#x9636;&#x6BB5;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF1A;
  func.bind(that)(arg1, arg2);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Function</span>.prototype.bind) {
    <span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">that</span>) </span>{
      <span class="hljs-keyword">var</span> func = <span class="hljs-keyword">this</span>, args = <span class="hljs-built_in">arguments</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> func.apply(that, <span class="hljs-built_in">Array</span>.prototype.slice.call(args, <span class="hljs-number">1</span>));
      }
    }
  }
  <span class="hljs-comment">// &#x53EA;&#x652F;&#x6301; bind &#x9636;&#x6BB5;&#x7684;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF1A;</span>
  func.bind(that, arg1, arg2)();

  <span class="hljs-comment">// &#x4E0D;&#x652F;&#x6301;&#x4EE5;&#x4E0B;&#x8C03;&#x7528;&#x9636;&#x6BB5;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF1A;</span>
  func.bind(that)(arg1, arg2);</code></pre>
<p><strong> &#x5217;&#x4E3E;&#x4E00;&#x4E0B;JavaScript&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#x6709;&#x54EA;&#x4E9B;&#x539F;&#x751F;&#x65B9;&#x6CD5;&#xFF1F;</strong></p>
<ul>
<li>
<p>&#x6570;&#x7EC4;&#xFF1A;</p>
<ul>
<li>arr.concat(arr1, arr2, arrn);</li>
<li>arr.join(&quot;,&quot;);</li>
<li>arr.sort(func);</li>
<li>arr.pop();</li>
<li>arr.push(e1, e2, en);</li>
<li>arr.shift();</li>
<li>unshift(e1, e2, en);</li>
<li>arr.reverse();</li>
<li>arr.slice(start, end);</li>
<li>arr.splice(index, count, e1, e2, en);</li>
<li>arr.indexOf(el);</li>
<li>arr.includes(el);   // ES6</li>
</ul>
</li>
<li>
<p>&#x5BF9;&#x8C61;&#xFF1A;</p>
<ul>
<li>object.hasOwnProperty(prop);</li>
<li>object.propertyIsEnumerable(prop);</li>
<li>object.valueOf();</li>
<li>object.toString();</li>
<li>object.toLocaleString();</li>
<li>Class.prototype.isPropertyOf(object);</li>
</ul>
</li>
</ul>
<p><strong>Array.splice() &#x4E0E; Array.splice() &#x7684;&#x533A;&#x522B;&#xFF1F;</strong></p>
<ul>
<li><p>slice -- &#x201C;&#x8BFB;&#x53D6;&#x201D;&#x6570;&#x7EC4;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x4F1A;&#x5BF9;&#x539F;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x4FEE;&#x6539;</p></li>
<li><ul>
<li>&#x8BED;&#x6CD5;&#xFF1A;arr.slice(start, end)</li>
<li>start &#x6307;&#x5B9A;&#x9009;&#x53D6;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#xFF08;&#x542B;&#xFF09;</li>
<li>end &#x6307;&#x5B9A;&#x9009;&#x53D6;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#xFF08;&#x4E0D;&#x542B;&#xFF09;</li>
</ul></li>
<ul><li>
<p>splice</p>
<ul>
<li>&#x201C;&#x64CD;&#x4F5C;&#x201D;&#x6570;&#x7EC4;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F1A;&#x4FEE;&#x6539;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x8FD4;&#x56DE;&#x88AB;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;</li>
<li>&#x8BED;&#x6CD5;&#xFF1A;arr.splice(index, count, [insert Elements])</li>
<li>index &#x662F;&#x64CD;&#x4F5C;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</li>
<li>count = 0 &#x63D2;&#x5165;&#x5143;&#x7D20;&#xFF0C;count &gt; 0 &#x5220;&#x9664;&#x5143;&#x7D20;</li>
<li>[insert Elements] &#x5411;&#x6570;&#x7EC4;&#x65B0;&#x63D2;&#x5165;&#x7684;&#x5143;&#x7D20;</li>
</ul>
</li></ul>
</ul>
<p><strong>JavaScript &#x5BF9;&#x8C61;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x7406;&#x89E3;&#xFF1F;</strong></p>
<ul>
<li>&#x5F53;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;JavaScript &#x4F1A;&#x81EA;&#x52A8;&#x4E3A;&#x8BE5;&#x5BF9;&#x8C61;&#x5206;&#x914D;&#x9002;&#x5F53;&#x7684;&#x5185;&#x5B58;</li>
<li>&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x5B9A;&#x671F;&#x626B;&#x63CF;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x8BA1;&#x7B97;&#x5F15;&#x7528;&#x4E86;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x91CF;</li>
<li>&#x5982;&#x679C;&#x88AB;&#x5F15;&#x7528;&#x6570;&#x91CF;&#x4E3A; 0&#xFF0C;&#x6216;&#x60DF;&#x4E00;&#x5F15;&#x7528;&#x662F;&#x5FAA;&#x73AF;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5B58;&#x5373;&#x53EF;&#x56DE;&#x6536;</li>
</ul>
<p><strong>&#x54EA;&#x4E9B;&#x64CD;&#x4F5C;&#x4F1A;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#xFF1F;</strong></p>
<ul>
<li>JavaScript &#x5185;&#x5B58;&#x6CC4;&#x9732;&#x6307;&#x5BF9;&#x8C61;&#x5728;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5B83;&#x65F6;&#x4ECD;&#x7136;&#x5B58;&#x5728;&#xFF0C;&#x5BFC;&#x81F4;&#x5360;&#x7528;&#x7684;&#x5185;&#x5B58;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x6216;&#x56DE;&#x6536;</li>
<li>&#x672A;&#x4F7F;&#x7528; var &#x58F0;&#x660E;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</li>
<li>&#x95ED;&#x5305;&#x51FD;&#x6570;(Closures)</li>
<li>&#x5FAA;&#x73AF;&#x5F15;&#x7528;(&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x76F8;&#x4E92;&#x5F15;&#x7528;)</li>
<li>&#x63A7;&#x5236;&#x53F0;&#x65E5;&#x5FD7;(console.log)</li>
<li>&#x79FB;&#x9664;&#x5B58;&#x5728;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;DOM&#x5143;&#x7D20;(IE)</li>
</ul>
<hr>
<ul>
<li>&#x4E0A;&#x671F;&#x7ECF;&#x5178;<a href="https://segmentfault.com/a/1190000015150912">&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x9898;&#xFF08;3&#xFF09;&#x73B0;&#x4EE3;&#x6280;&#x672F;</a>
</li>
<li>&#x5F80;&#x671F;&#x7ECF;&#x5178;<a href="https://segmentfault.com/a/1190000014872028" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x2014;&#x2014;URL&#x52A0;&#x8F7D;&#x8FC7;&#x7A0B;</a>
</li>
</ul>
<blockquote><strong><em>&#x6301;&#x7EED;&#x66F4;&#x65B0;&#x4E2D;&#x2026;&#x2026;&#x559C;&#x6B22;&#x8BF7;&#x70B9;&#x4E2A;&#x8D5E;&#x54E6;~</em></strong></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题（4）JavaScript

## 原文链接
[https://segmentfault.com/a/1190000015162142](https://segmentfault.com/a/1190000015162142)

