---
title: '手把手教你用vue搭建个人站' 
date: 2018-11-22 2:30:10
hidden: true
slug: sm73evq5tyh
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;&#x6211;&#x8F6C;&#x524D;&#x7AEF;&#x4EE5;&#x6765;&#xFF0C;&#x4E00;&#x76F4;&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x613F;&#x671B;&#xFF1A;</p><p>&#x201C;&#x81EA;&#x5DF1;&#x642D;&#x5EFA;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x89E3;&#x6790;Markdown&#x6587;&#x6863;&#x7684;&#x4E2A;&#x4EBA;&#x7AD9;&#x201D;</p><p>&#x4ECA;&#x5929;&#x7EC8;&#x4E8E;&#x5B9E;&#x73B0;&#x5566;&#xFF0C;&#x5148;&#x8D34;&#x4E0A;&#x6211;&#x7684;<a href="http://dendise7en.tech/#/home" rel="nofollow noreferrer" target="_blank">blog&#x5730;&#x5740;</a></p><h2 id="articleHeader0">&#x786E;&#x8BA4;&#x9700;&#x6C42;</h2><p>&#x5176;&#x5B9E;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x4E2A;&#x4EBA;&#x7AD9;&#xFF0C;&#x5C31;&#x662F;&#x8BB8;&#x591A;&#x7684;HTML&#x9875;&#x9762;&#xFF0C;&#x4F60;&#x53EA;&#x8981;&#x53EF;&#x4EE5;&#x7528;HTML&#x5199;&#x51FA;&#x6765;&#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x7136;&#x540E;&#x6302;&#x5230;<code>Github pages</code>&#x4E0A;&#x3002;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x6211;&#x60F3;&#x8981;&#x7684;&#x3002;</p><p>&#x4E5F;&#x6709;&#x8BB8;&#x591A;&#x7684;&#x4EBA;&#x4F1A;&#x9009;&#x62E9;&#x7528;Vuepress&#xFF0C;Hexo&#xFF0C;Wordpress&#xFF0C;Jekyll&#x7B49;&#x7B49;&#x8FD9;&#x6837;&#x7684;&#x535A;&#x5BA2;&#x6846;&#x67B6;&#x6765;&#x642D;&#x5EFA;&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;&#xFF0C;&#x6211;&#x4E5F;&#x90FD;&#x5C1D;&#x8BD5;&#x8FC7;&#xFF0C;&#x6709;&#x5F88;&#x591A;&#x7684;&#x4E3B;&#x9898;&#x53EF;&#x4EE5;&#x7ED9;&#x4F60;&#x9009;&#x62E9;&#xFF0C;&#x4F60;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E2A;&#x4E3B;&#x9898;&#x6216;&#x8005;&#x4FEE;&#x6539;&#x5176;&#x4ED6;&#x4EBA;&#x7684;&#x4E3B;&#x9898;&#x8BA9;&#x4F60;&#x7684;&#x535A;&#x5BA2;&#x53D8;&#x5F97;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#xFF0C;&#x4F46;&#x8FD9;&#x4E5F;&#x4E0D;&#x662F;&#x6211;&#x60F3;&#x8981;&#x7684;&#x3002;</p><p>&#x90A3;&#xFF0C;&#x6211;&#x60F3;&#x8981;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><p>&#x7528;Markdown&#x8BED;&#x6CD5;&#x4E66;&#x5199;&#x535A;&#x5BA2;&#xFF0C;&#x652F;&#x6301;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#x3002;</p><ul><li>&#x535A;&#x5BA2;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#x3002;</li><li>Markdown&#x7684;YAML&#x5F00;&#x5934;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x6BB5;&#xFF0C;&#x4FBF;&#x4E8E;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x5C55;&#x793A;&#x3002;</li><li>&#x5728;&#x5199;&#x535A;&#x5BA2;&#x7684;&#x540C;&#x65F6;&#x652F;&#x6301;&#x9875;&#x9762;&#x66F4;&#x65B0;&#xFF0C;&#x5B9E;&#x65F6;&#x770B;&#x5230;&#x6548;&#x679C;&#x3002;</li><li>&#x5176;&#x4ED6;&#x535A;&#x5BA2;&#x57FA;&#x672C;&#x7684;&#x529F;&#x80FD;&#x3002;</li></ul><p>&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x5F88;&#x591A;&#x7684;&#x535A;&#x5BA2;&#x7CFB;&#x7EDF;&#xFF0C;&#x6216;&#x8005;&#x9759;&#x6001;&#x535A;&#x5BA2;&#x751F;&#x6210;&#x5668;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x4E0A;&#x9762;&#x5927;&#x90E8;&#x5206;&#x7684;&#x6761;&#x4EF6;&#xFF0C;&#x6211;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x7684;&#x539F;&#x56E0;&#x4E3B;&#x8981;&#x662F;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>&#x6211;&#x5F88;&#x96BE;&#x628A;&#x63A7;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x5728;&#x5176;&#x4ED6;&#x4EBA;&#x7684;&#x4E3B;&#x9898;&#x9875;&#x9762;&#x60F3;&#x8981;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#xFF0C;&#x5F88;&#x5403;&#x529B;&#x3002;</li><li>&#x5BF9;&#x535A;&#x5BA2;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x90FD;&#x4F1A;&#x6709;&#x9884;&#x6599;&#x4E4B;&#x5916;&#x7684;&#x6548;&#x679C;&#x3002;</li><li>&#x4E00;&#x4E9B;&#x4E3B;&#x9898;&#x4E5F;&#x4E0D;&#x5B8C;&#x5584;&#xFF0C;&#x603B;&#x662F;&#x5C11;&#x4E86;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x4E14;&#x5BF9;&#x4E8E;Markdown&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x7684;&#x529F;&#x80FD;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x4E5F;&#x53C2;&#x5DEE;&#x4E0D;&#x9F50;&#x3002;</li><li>&#x9875;&#x9762;&#x7684;&#x6784;&#x9020;&#x548C;&#x6837;&#x5F0F;&#x7684;&#x8C03;&#x6574;&#xFF0C;&#x81EA;&#x7531;&#x5EA6;&#x4E0D;&#x591F;&#x3002;</li></ul><h2 id="articleHeader1">&#x5206;&#x6790;&#x9700;&#x6C42;</h2><p>&#x770B;&#x5230;&#x8FD9;&#x4E9B;&#x9700;&#x6C42;&#xFF0C;&#x5176;&#x5B9E;&#x91CD;&#x70B9;&#x4E0D;&#x5728;&#x4E8E;&#x4F60;&#x8981;&#x7528;&#x4EC0;&#x4E48;&#x6846;&#x67B6;&#x6765;&#x5199;&#x3002;vue&#x4E5F;&#x597D;react&#x4E5F;&#x597D;&#x751A;&#x81F3;Jquery&#x6216;&#x8005;&#x539F;&#x751F;&#x7684;JS&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x3002;</p><p>&#x91CD;&#x70B9;&#x5728;&#x4E8E;&#x4F60;&#x5982;&#x4F55;&#x5904;&#x7406;Markdown&#x6587;&#x4EF6;&#xFF0C;&#x628A;&#x5B83;&#x8F6C;&#x6362;&#x6210;&#x4F60;&#x9700;&#x8981;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x4F60;&#x7684;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x6765;&#x63A7;&#x5236;&#x9875;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x7684;&#x5207;&#x6362;&#x3002;</p><p>&#x7B80;&#x800C;&#x8A00;&#x4E4B;&#xFF0C;&#x5C31;&#x662F;&#x4E24;&#x70B9;&#xFF1A;</p><ul><li>&#x535A;&#x5BA2;&#x6570;&#x636E;</li><li>&#x9875;&#x9762;&#x8DEF;&#x7531;</li></ul><p>&#x5F53;&#x4F60;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#x6240;&#x6709;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x64B8;&#x9875;&#x9762;&#x4E86;&#xFF0C;&#x5929;&#x9AD8;&#x4EFB;&#x4F60;&#x98DE;&#xFF0C;&#x548C;&#x592A;&#x9633;&#x80A9;&#x5E76;&#x80A9;&#x3002;</p><h2 id="articleHeader2">&#x6570;&#x636E;&#x7684;&#x83B7;&#x53D6;</h2><p>&#x6216;&#x8BB8;&#x4E5F;&#x53EF;&#x4EE5;&#x6362;&#x4E00;&#x4E2A;&#x5C0F;&#x6807;&#x9898;&#xFF0C;&#x600E;&#x6837;&#x62FF;&#x5230;Markdown&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#x5462;&#xFF1F;</p><p>&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x662F;&#x56E0;&#x4E3A;&#x8003;&#x8651;&#x5230;&#xFF0C;&#x5728;&#x9996;&#x9875;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x5C55;&#x793A;&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x5206;&#x7C7B;&#xFF0C;&#x548C;&#x6240;&#x6709;&#x7684;Tags&#xFF0C;&#x751A;&#x81F3;&#x6240;&#x6709;&#x7684;&#x6587;&#x7AE0;&#x7684;&#x6807;&#x9898;&#x548C;&#x5185;&#x5BB9;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E2A;&#x535A;&#x5BA2;&#x7684;&#x68C0;&#x7D22;&#xFF1F;</p><p>&#x6211;&#x628A;&#x4EE5;&#x4E0A;&#x63D0;&#x5230;&#x7684;&#x6240;&#x6709;&#x7684;&#x535A;&#x5BA2;&#x6846;&#x67B6;&#x7684;&#x6E90;&#x7801;&#x770B;&#x4E86;&#x4E00;&#x904D;&#xFF0C;&#x60F3;&#x770B;&#x770B;&#x5BF9;&#x4ED6;&#x4EEC;&#x662F;&#x600E;&#x4E48;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x7136;&#x540E;&#x5728;&#x6211;&#x9996;&#x5148;&#x5728;<a href="https://react-static.js.org/" rel="nofollow noreferrer" target="_blank">React-static</a>&#x7684;&#x5143;am&#x91CC;&#x9762;&#xFF0C;&#x627E;&#x5230;&#x4E86;&#x8FD9;&#x4E2A;&#xFF1A;<a href="https://github.com/DanWebb/jdown" rel="nofollow noreferrer" target="_blank">Jdown</a></p><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x89E3;&#x6790;Markdown&#x7684;&#x5305;&#xFF0C;&#x751A;&#x81F3;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x90FD;&#x662F;&#x7528;&#x8FD9;&#x4E2A;&#x6765;&#x89E3;&#x6790;&#x6211;&#x7684;Markdown&#x6587;&#x4EF6;&#x4E2D;&#x7684;YAML&#x6807;&#x7B7E;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5E76;&#x4E14;&#x6211;&#x8FD8;&#x548C;&#x5305;&#x7684;&#x4F5C;&#x8005;DanWebb&#x804A;&#x4E86;&#x5F88;&#x591A;&#x5173;&#x4E8E;&#x642D;&#x5EFA;&#x4E2A;&#x4EBA;&#x7AD9;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x76F4;&#x5230;&#x6211;&#x9879;&#x76EE;&#x7684;&#x6700;&#x540E;&#x624D;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x4E2A;&#x5305;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x8FC7;&#x957F;&#x7684;&#x4E2D;&#x6587;&#xFF0C;&#x53EF;&#x80FD;&#x4ED6;&#x4F1A;&#x89E3;&#x6790;&#x5931;&#x8D25;&#xFF0C;&#x6211;&#x4E5F;&#x627E;&#x4E0D;&#x5230;&#x89C4;&#x5F8B;&#xFF0C;&#x5BF9;&#x4E8E;&#x6211;&#x6765;&#x8BF4;&#xFF0C;&#x8981;&#x53BB;&#x9605;&#x8BFB;&#x4ED6;&#x7684;&#x6E90;&#x7801;&#x6765;&#x5B9A;&#x4F4D;&#x95EE;&#x9898;&#xFF0C;&#x9700;&#x8981;&#x592A;&#x591A;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x60F3;&#x627E;&#x4E00;&#x4E2A;&#x66FF;&#x4EE3;&#x7684;&#x5305;&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x540C;&#x6837;&#x7684;&#x529F;&#x80FD;&#x3002;</p><p>&#x7136;&#x540E;&#x6211;&#x5C31;&#x627E;&#x5230;&#x4E86;<a href="https://github.com/jonschlinkert/gray-matter" rel="nofollow noreferrer" target="_blank">gray-matter</a></p><p>&#x6211;&#x7528;&#x8FD9;&#x4E2A;&#x5305;&#x6210;&#x529F;&#x7684;&#x628A;Markdown&#x6587;&#x4EF6;&#x7684;YAML&#x5934;&#x89E3;&#x6790;&#x4E3A;&#x4E00;&#x4E2A;JSON&#x5BF9;&#x8C61;&#x3002;&#x6211;&#x662F;&#x600E;&#x4E48;&#x505A;&#x7684;&#x5462;&#xFF1F;</p><p>&#x5728;&#x9879;&#x76EE;(&#x6253;&#x5305;/&#x7F16;&#x8BD1;)&#x7684;JS&#x4E2D;&#xFF1A;</p><ul><li>&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x76EE;&#x5F55;(&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x6240;&#x6709;md&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x7684;&#x76EE;&#x5F55;),&#x83B7;&#x53D6;&#x5230;&#x6240;&#x6709;&#x7684;&#x4EE5;md&#x7ED3;&#x5C3E;&#x7684;&#x6587;&#x4EF6;&#x5BF9;&#x8C61;&#x3002;</li><li>&#x5BF9;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7684;YAML&#x5934;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;&#x62FF;&#x5230;JSON&#x5BF9;&#x8C61;&#x3002;</li><li>&#x5BF9;JSON&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x89E3;&#x6790;&#xFF0C;&#x4F8B;&#x5982;&#x53D6;&#x51FA;&#x6240;&#x6709;&#x7684;tag&#x5B58;&#x653E;&#x5230;&#x540C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#xFF08;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x653E;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x6765;&#x505A;&#x8FD9;&#x4EF6;&#x4E8B;&#xFF09;</li><li>&#x628A;&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x7684;JSON&#x5BF9;&#x8C61;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x91CC;&#xFF0C;&#x7528;nodeJS&#x7684;fs&#x6A21;&#x5757;&#x5199;&#x5165;&#x5230;&#x4E00;&#x4E2A;<code>data.js</code>&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF08;&#x8FD9;&#x4E2A;&#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x76EE;&#x5F55;&#xFF09;</li></ul><p>&#x81F3;&#x6B64;&#xFF0C;&#x6240;&#x6709;&#x9875;&#x9762;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#x3002;<br>&#x5728;&#x9875;&#x9762;&#x4E0A;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x53EA;&#x9700;&#x8981;&#x5F15;&#x5165;&#x8FD9;&#x4E2A;<code>data.js</code>&#x7684;&#x6587;&#x4EF6;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x9875;&#x9762;&#x7684;&#x6570;&#x636E;&#x5566;~</p><h2 id="articleHeader3">&#x9875;&#x9762;&#x8DEF;&#x7531;</h2><p>&#x9875;&#x9762;&#x8DEF;&#x7531;&#x662F;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x535A;&#x5BA2;&#x7CFB;&#x7EDF;&#x7684;&#x5173;&#x952E;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x4E0A;&#x4E00;&#x6B65;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x62FF;&#x5230;&#x4E86;<code>YAML</code>&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5E76;&#x6CA1;&#x6709;&#x62FF;&#x5230;&#x8FD9;&#x4E2A;&#x6587;&#x6863;&#x5185;&#x5BB9;&#xFF0C;&#x5C31;&#x7B97;&#x6211;&#x4EEC;&#x62FF;&#x5230;&#x4E86;&#x5185;&#x5BB9;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x628A;&#x4ED6;&#x89E3;&#x6790;&#x4E3A;HTML&#x4E4B;&#x540E;&#xFF0C;&#x624D;&#x53EF;&#x4EE5;&#x5C55;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x90A3;&#x73B0;&#x5728;&#x600E;&#x4E48;&#x505A;&#x5462;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x7528;&#x8FC7;webpack&#x7684;&#x4EBA;&#x90FD;&#x77E5;&#x9053;&#xFF0C;webpack&#x6709;&#x4E00;&#x4E2A;loader&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x662F;&#x7528;&#x5230;markdown&#x7684;loader&#x6765;&#x505A;&#x8FD9;&#x6837;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;loader&#x5C31;&#x50CF;&#x662F;&#x4E00;&#x4E2A;&#x7FFB;&#x8BD1;&#x5DE5;&#x5177;&#xFF0C;&#x628A;&#x6E90;&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x5904;&#x7406;&#x4E4B;&#x540E;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x591A;&#x91CD;&#x7FFB;&#x8BD1;&#x4E4B;&#x540E;&#x518D;&#x8FD4;&#x56DE;&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x7528;Markdown&#x7684;loader.</p><p>&#x90A3;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x8DEF;&#x7531;&#x4E2D;&#x8BBE;&#x7F6E;&#xFF0C;&#x628A;component&#x8BBE;&#x7F6E;&#x6210;&#x5BF9;&#x5E94;&#x7684;md&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;Webpack&#x5C31;&#x4F1A;&#x4F7F;&#x7528;loader&#x6765;&#x89E3;&#x6790;&#x8FD9;&#x4E2A;md&#x6587;&#x4EF6;&#xFF0C;&#x53D8;&#x6210;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;HTML&#x9875;&#x9762;&#xFF0C;&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x89E3;&#x6790;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x52A0;&#x5165;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x589E;&#x5F3A;&#x548C;&#x81EA;&#x5B9A;&#x4E49;&#x6211;&#x4EEC;&#x7684;markdown&#x3002;</p><p>&#x5728;router&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x8BBE;&#x7F6E;&#x7C7B;&#x4F3C;&#x4E8E;&#x4E0B;&#x9762;&#x8FD9;&#x6837;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 path: &quot;/post/2018-05-20-first&quot;,
 component: () =&gt; import(&apos;../posts/2018-05-20-first.md&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
 <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/post/2018-05-20-first&quot;</span>,
 <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;../posts/2018-05-20-first.md&apos;</span>)
}</code></pre><p>&#x4F60;&#x4EE5;&#x4E3A;&#x5C31;&#x8FD9;&#x6837;&#x7B80;&#x5355;&#x7684;&#x7ED3;&#x675F;&#x4E86;&#x5417;&#xFF1F;</p><p>&#x592A;&#x5929;&#x771F;&#x4E86;&#x5C11;&#x5E74;&#xFF0C;&#x56E0;&#x4E3A;webpack&#x662F;&#x4E0D;&#x652F;&#x6301;import&#x7684;&#x52A8;&#x6001;&#x53C2;&#x6570;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x9875;&#x9762;&#x8DD1;&#x8D77;&#x6765;&#x4E4B;&#x540E;&#xFF0C;&#x60F3;&#x8981;&#x901A;&#x8FC7;YAML&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6765;&#x62FC;&#x63A5;&#x51FA;router&#x7684;&#x503C;&#xFF0C;&#x662F;&#x4E0D;&#x53EF;&#x884C;&#x7684;&#xFF0C;&#x5C31;&#x7B97;&#x4F60;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x6587;&#x4EF6;&#x540D;&#x3002;</p><p>&#x6211;&#x4EEC;&#x603B;&#x4E0D;&#x80FD;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x5C31;&#x5F80;&#x8FD9;&#x4E2A;router&#x91CC;&#x9762;&#x52A0;&#x5165;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#x5427;&#xFF1F;</p><p>&#x8FD9;&#x4E00;&#x6B65;&#x4E5F;&#x56F0;&#x6270;&#x4E86;&#x6211;&#x5F88;&#x4E45;&#xFF0C;&#x901A;&#x8FC7;&#x8D44;&#x6599;&#x7684;&#x641C;&#x96C6;&#x548C;&#x67E5;&#x770B;&#x5176;&#x5B83;&#x4EBA;&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x6211;&#x5728;Vuepress&#x7684;&#x6E90;&#x7801;&#x4E2D;&#x627E;&#x5230;&#x4E86;&#x7B54;&#x6848;&#x3002;&#x5C24;&#x5927;&#x5927;&#x662F;&#x600E;&#x4E48;&#x505A;&#x7684;&#x5462;&#xFF1F;</p><p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;&#x4E00;&#x4E0B;<a href="https://vuepress.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vuepress</a>&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x5173;&#x952E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#x662F;<code>~/lib/prepare/codegen.js</code></p><p>&#x4EE3;&#x7801;&#x8D34;&#x51FA;&#x6765;(&#x5173;&#x952E;&#x7684;&#x4FE1;&#x606F;&#x6211;&#x5DF2;&#x7ECF;&#x6253;&#x4E0A;&#x4E86;&#x6CE8;&#x91CA;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.genRoutesFile = async function ({
  siteData: { pages },
  sourceDir,
  pageFiles
}) {
  function genRoute ({ path: pagePath, key: componentName }, index) {
    const file = pageFiles[index]
    const filePath = path.resolve(sourceDir, file)
    // &#x8FD9;&#x4E00;&#x6BB5;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x4F60;&#x7684;&#x8DEF;&#x7531;&#x4FE1;&#x606F;
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    component: ThemeLayout,
    beforeEnter: (to, from, next) =&gt; {
      import(${JSON.stringify(filePath)}).then(comp =&gt; {
        Vue.component(${JSON.stringify(componentName)}, comp.default)
        next()
      })
    }
  }`

    const dncodedPath = decodeURIComponent(pagePath)
    if (dncodedPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(dncodedPath)},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    if (/\/$/.test(pagePath)) {
      code += `,
  {
    path: ${JSON.stringify(pagePath + &apos;index.html&apos;)},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    return code
  }

  const notFoundRoute = `,
  {
    path: &apos;*&apos;,
    component: ThemeNotFound
  }`


  return (
    //   &#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x4EE5;&#x653E;&#x5165;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x7684;&#x9700;&#x8981;&#x5728;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x5F15;&#x5165;&#x7684;&#x4FE1;&#x606F;
    `import ThemeLayout from &apos;@themeLayout&apos;\n` +
    `import ThemeNotFound from &apos;@themeNotFound&apos;\n` +
    `import { injectMixins } from &apos;@app/util&apos;\n` +
    `import rootMixins from &apos;@app/root-mixins&apos;\n\n` +
    `injectMixins(ThemeLayout, rootMixins)\n` +
    `injectMixins(ThemeNotFound, rootMixins)\n\n` +
    `export const routes = [${pages.map(genRoute).join(&apos;,&apos;)}${notFoundRoute}\n]`
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">exports.genRoutesFile = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{
  siteData: { pages },
  sourceDir,
  pageFiles
}</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">genRoute</span> (<span class="hljs-params">{ path: pagePath, key: componentName }, index</span>) </span>{
    <span class="hljs-keyword">const</span> file = pageFiles[index]
    <span class="hljs-keyword">const</span> filePath = path.resolve(sourceDir, file)
    <span class="hljs-comment">// &#x8FD9;&#x4E00;&#x6BB5;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x4F60;&#x7684;&#x8DEF;&#x7531;&#x4FE1;&#x606F;</span>
    <span class="hljs-keyword">let</span> code = <span class="hljs-string">`
  {
    name: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(componentName)}</span>,
    path: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(pagePath)}</span>,
    component: ThemeLayout,
    beforeEnter: (to, from, next) =&gt; {
      import(<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(filePath)}</span>).then(comp =&gt; {
        Vue.component(<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(componentName)}</span>, comp.default)
        next()
      })
    }
  }`</span>

    <span class="hljs-keyword">const</span> dncodedPath = <span class="hljs-built_in">decodeURIComponent</span>(pagePath)
    <span class="hljs-keyword">if</span> (dncodedPath !== pagePath) {
      code += <span class="hljs-string">`,
  {
    path: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(dncodedPath)}</span>,
    redirect: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(pagePath)}</span>
  }`</span>
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\/$/</span>.test(pagePath)) {
      code += <span class="hljs-string">`,
  {
    path: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(pagePath + <span class="hljs-string">&apos;index.html&apos;</span>)}</span>,
    redirect: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(pagePath)}</span>
  }`</span>
    }

    <span class="hljs-keyword">return</span> code
  }

  <span class="hljs-keyword">const</span> notFoundRoute = <span class="hljs-string">`,
  {
    path: &apos;*&apos;,
    component: ThemeNotFound
  }`</span>


  <span class="hljs-keyword">return</span> (
    <span class="hljs-comment">//   &#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x4EE5;&#x653E;&#x5165;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x7684;&#x9700;&#x8981;&#x5728;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x5F15;&#x5165;&#x7684;&#x4FE1;&#x606F;</span>
    <span class="hljs-string">`import ThemeLayout from &apos;@themeLayout&apos;\n`</span> +
    <span class="hljs-string">`import ThemeNotFound from &apos;@themeNotFound&apos;\n`</span> +
    <span class="hljs-string">`import { injectMixins } from &apos;@app/util&apos;\n`</span> +
    <span class="hljs-string">`import rootMixins from &apos;@app/root-mixins&apos;\n\n`</span> +
    <span class="hljs-string">`injectMixins(ThemeLayout, rootMixins)\n`</span> +
    <span class="hljs-string">`injectMixins(ThemeNotFound, rootMixins)\n\n`</span> +
    <span class="hljs-string">`export const routes = [<span class="hljs-subst">${pages.map(genRoute).join(<span class="hljs-string">&apos;,&apos;</span>)}</span><span class="hljs-subst">${notFoundRoute}</span>\n]`</span>
  )
}</code></pre><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5728;&#x505A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x65E2;&#x7136;import&#x4E0D;&#x652F;&#x6301;&#x52A8;&#x6001;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x76F4;&#x63A5;&#x751F;&#x6210;&#x4E00;&#x4E2A;router&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;router&#x6765;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;&#x8DEF;&#x7531;&#x4E0D;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x5417;&#xFF1F;</p><p>&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#x9762;&#xFF0C;&#x628A;&#x8FD9;&#x4E00;&#x6B65;&#x52A0;&#x5165;&#x5230;&#x89E3;&#x6790;markdown&#x7684;YAML&#x4FE1;&#x606F;&#x8FD9;&#x4E2A;&#x6B65;&#x9AA4;&#x91CC;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x5728;&#x62FF;&#x5230;&#x4E86;&#x9875;&#x9762;&#x57FA;&#x672C;&#x4FE1;&#x606F;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x4E5F;&#x8FDB;&#x884C;&#x4E86;&#x8DEF;&#x7531;&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h2 id="articleHeader4">&#x5B8C;&#x6210;&#x56FE;</h2><p>&#x7ECF;&#x8FC7;&#x4E00;&#x4E9B;&#x9875;&#x9762;&#x7684;&#x8BBE;&#x8BA1;&#xFF0C;&#x7EC8;&#x4E8E;&#x5B8C;&#x6210;&#x5566;&#xFF0C;&#x8FD9;&#x91CC;&#x4E5F;&#x8D34;&#x4E00;&#x4E0B;<a href="https://github.com/DendiSe7enGitHub/vue-blog-generater" rel="nofollow noreferrer" target="_blank">blog&#x7684;&#x6E90;&#x7801;</a>&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;star</p><p>&#x8D34;&#x4E00;&#x6CE2;&#x56FE;&#xFF1A;</p><p>&#x9996;&#x9875;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721553?w=1895&amp;h=984" src="https://static.alili.tech/img/remote/1460000015721553?w=1895&amp;h=984" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>about&#x9875;&#x9762;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721554?w=1908&amp;h=980" src="https://static.alili.tech/img/remote/1460000015721554?w=1908&amp;h=980" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>Tag&#x9875;&#x9762;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721555?w=1902&amp;h=982" src="https://static.alili.tech/img/remote/1460000015721555?w=1902&amp;h=982" alt="" title="" style="cursor:pointer"></span></p><p>Category&#x9875;&#x9762;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721556?w=1902&amp;h=983" src="https://static.alili.tech/img/remote/1460000015721556?w=1902&amp;h=983" alt="" title="" style="cursor:pointer"></span></p><p>Post&#x9875;&#x9762;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721557" src="https://static.alili.tech/img/remote/1460000015721557" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>Post&#x9875;&#x5934;&#x5C55;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015721558?w=1906&amp;h=987" src="https://static.alili.tech/img/remote/1460000015721558?w=1906&amp;h=987" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader5">&#x5199;&#x5728;&#x6700;&#x540E;</h2><p>&#x8FD9;&#x4E2A;blog&#x7CFB;&#x7EDF;&#xFF0C;&#x4E5F;&#x96F6;&#x96F6;&#x788E;&#x788E;&#x82B1;&#x4E86;&#x63A5;&#x8FD1;&#x4E00;&#x4E2A;&#x6708;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x7EC8;&#x4E8E;&#x662F;&#x544A;&#x4E00;&#x6BB5;&#x843D;&#x4E86;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x91CC;&#x9762;&#x4F1A;&#x6709;&#x8BB8;&#x591A;&#x6211;&#x6CA1;&#x6709;&#x63D0;&#x5230;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6BD4;&#x5982;&#x600E;&#x4E48;&#x90E8;&#x7F72;&#x5230;&#x57DF;&#x540D;&#x4E0B;&#x554A;&#xFF0C;&#x600E;&#x4E48;&#x6253;&#x5305;&#x7F16;&#x8BD1;&#x53D1;&#x5E03;&#x5230;github pages&#xFF0C;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x9875;&#x9762;&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x6CA1;&#x6709;&#x5199;&#x8FD9;&#x4E9B;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x90FD;&#x6709;&#x8BB8;&#x591A;&#x73B0;&#x6210;&#x7684;&#x7B54;&#x6848;&#x5566;&#x3002;</p><p>&#x6700;&#x540E;&#x65B0;&#x4EBA;&#x6C42;&#x4E00;&#x6CE2;&#x5173;&#x6CE8;&#x5566;~&#x5173;&#x4E8E;&#x8FD9;&#x4E2A;blog&#x7CFB;&#x7EDF;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x4EFB;&#x4F55;&#x4E0D;&#x6E05;&#x695A;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x53EF;&#x4EE5;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x8BC4;&#x8BBA;&#xFF0C;&#x6216;&#x8005;&#x4E0E;&#x6211;&#x8054;&#x7CFB;~</p><p>&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你用vue搭建个人站

## 原文链接
[https://segmentfault.com/a/1190000015721550](https://segmentfault.com/a/1190000015721550)

