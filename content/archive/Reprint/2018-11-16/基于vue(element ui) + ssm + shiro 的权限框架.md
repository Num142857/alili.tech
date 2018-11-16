---
title: '基于vue(element ui) + ssm + shiro 的权限框架' 
date: 2018-11-16 2:30:06
hidden: true
slug: eeddc2rji2a
categories: reprint
---

{{< raw >}}
<p>&#x57FA;&#x4E8E;vue(element ui) + ssm + shiro &#x7684;&#x6743;&#x9650;&#x6846;&#x67B6;&#x3002;</p><p>&#x9886;&#x609F;&#xFF0C;&#x7406;&#x89E3;&#xFF0C;&#x6D88;&#x5316;&#x5B83;&#xFF01;</p><hr><h1 id="articleHeader0">&#x5F15;&#x8A00;</h1><h2 id="articleHeader1">&#x5FC3;&#x58F0;</h2><p>&#x73B0;&#x5728;&#x7684;Java&#x4E16;&#x754C;&#xFF0C;&#x5404;&#x79CD;&#x8D44;&#x6E90;&#x5F88;&#x4E30;&#x5BCC;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;&#xFF0C;&#x4ECE;&#x5206;&#x5E03;&#x5F0F;&#xFF0C;&#x670D;&#x52A1;&#x5316;&#xFF0C;orm,&#x518D;&#x5230;&#x524D;&#x7AEF;&#x63A7;&#x5236;&#xFF0C;&#x6743;&#x9650;&#x7B49;&#x7B49;&#x73B2;&#x7405;&#x6EE1;&#x76EE;&#xFF0C;&#x7F51;&#x4E0A;&#x6709;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x8BED;&#x8A00;&#x6846;&#x67B6;&#x8FED;&#x4EE3;&#x592A;&#x5FEB;&#x4E86;&#xFF0C;&#x6211;&#x5B66;&#x4E0D;&#x52A8;&#x4E86;&#xFF0C;&#x4E0D;&#x5982;&#x56DE;&#x53BB;&#x642C;&#x7816;&#x5427;&#xFF0C;&#x53EF;&#x662F;&#x5929;&#x8FD9;&#x4E48;&#x70ED;&#xFF0C;&#x7816;&#x70EB;&#x624B;&#x554A;&#x3002;&#x7A0B;&#x5E8F;&#x641E;&#x8D77;&#x6765;&#x5F88;&#x5BB9;&#x6613;&#xFF0C;&#x5C31;&#x662F;&#x6709;&#x70B9;&#x5934;&#x51B7;&#x3002;<br>&lt;div align=&quot;center&quot;&gt; &lt;img src=&quot;<a href="http://p94g7wqy4.bkt.clouddn.com/zhcc/content/touleng.jpg&amp;quot" rel="nofollow noreferrer" target="_blank">http://p94g7wqy4.bkt.clouddn....</a>; width=&quot;400&quot;/&gt; &lt;/div&gt;<br></p><h2 id="articleHeader2">&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x4E24;&#x5927;&#x4E16;&#x754C;&#x96BE;&#x9898;</h2><h3 id="articleHeader3">&#x91CD;&#x590D;&#x8F6E;&#x5B50;</h3><p>&#x8BED;&#x8A00;&#x6846;&#x67B6;&#x8FED;&#x4EE3;&#x592A;&#x5FEB;&#xFF0C;&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x9AD8;&#x7EA7;&#x8BED;&#x8A00;&#x5C31;&#x6709;&#x51E0;&#x5341;&#x79CD;&#xFF0C;&#x867D;&#x7136;&#x6D41;&#x884C;&#x7684;&#x5C31;&#x90A3;&#x4E48;&#x51E0;&#x79CD;&#xFF0C;&#x8BED;&#x8A00;&#x5C31;&#x662F;&#x91CD;&#x590D;&#x4E4B;&#x4E00;&#xFF0C;&#x4ECE;&#x8BED;&#x8A00;&#x60F3;&#x8868;&#x8FBE;&#x7684;&#x4F5C;&#x7528;&#x4E0A;&#x6765;&#x770B;&#xFF0C;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x64CD;&#x4F5C;&#x8BA1;&#x7B97;&#x673A;&#xFF0C;&#x6211;&#x60F3;&#x672A;&#x6765;&#x8BA1;&#x7B97;&#x673A;&#x8BED;&#x8A00;&#x7684;&#x524D;&#x666F;&#x53EF;&#x80FD;&#x662F;&#x8BED;&#x8A00;&#x4E00;&#x4F53;&#x5316;&#xFF0C;&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x662F;&#x4E2A;&#x5F88;&#x6F2B;&#x957F;&#x7684;&#x8DEF;&#xFF0C;&#x76F8;&#x4FE1;&#x4E00;&#x4E9B;&#x8BED;&#x8A00;&#x7684;&#x521B;&#x9020;&#x8005;&#xFF0C;&#x5F53;&#x521D;&#x4E5F;&#x662F;&#x5BF9;&#x67D0;&#x8BED;&#x8A00;&#x4E0D;&#x6EE1;&#x610F;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53BB;&#x6539;&#x9020;&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x5B9E;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x8FD8;&#x662F;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x8FD9;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x6211;&#x6DF1;&#x6709;&#x4F53;&#x4F1A;&#xFF0C;&#x5F53;&#x521D;&#xFF0C;&#x4EC5;&#x4EC5;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x5730;&#x5B66;&#x4E60;MVC&#x6846;&#x67B6;&#x539F;&#x7406;&#xFF0C;&#x89C9;&#x5F97;&#x6700;&#x597D;&#x7684;&#x5B66;&#x4E60;&#x5C31;&#x662F;&#x91CD;&#x5199;&#x5B83;&#xFF0C;&#x6700;&#x540E;&#xFF0C;&#x6BD4;&#x5982;<a href="https://github.com/hulichao/hulichao_framework.git" rel="nofollow noreferrer" target="_blank">hulichao_framework</a>&#x4E0B;&#x9762;&#x7684;oliver&#x5C31;&#x662F;&#x7ED3;&#x679C;&#x7684;&#x6B8B;&#x54C1;&#xFF0C;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x57FA;&#x672C;&#x7684;&#x4ECE;&#x9875;&#x9762;&#x5230;&#x5904;&#x7406;&#x7AEF;&#x7684;&#x6620;&#x5C04;&#xFF0C;&#x4EE5;&#x53CA;&#x5904;&#x7406;&#x8FD4;&#x56DE;&#xFF0C;&#x5176;&#x5B9E;&#x60F3;&#x60F3;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x539F;&#x7406;&#xFF0C;&#x5C31;&#x662F;&#x9875;&#x9762;&#x4E0E;&#x63A7;&#x5236;&#x5668;&#x66F4;&#x597D;&#x5730;&#x5904;&#x7406;&#x4E0E;&#x6620;&#x5C04;&#xFF0C;&#x5F53;&#x7136;&#x5B8C;&#x7F8E;&#x91CD;&#x5199;&#xFF0C;&#x6211;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x5E72;&#xFF0C;&#x73B0;&#x5728;&#x6D41;&#x884C;&#x7684;&#x5F00;&#x6E90;mvc&#x6846;&#x67B6;&#x5DF2;&#x7ECF;&#x5F88;&#x591A;&#x4E86;&#xFF0C;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x7B80;&#x5355;&#x91CD;&#x6784;&#x8FC7;orm&#x6846;&#x67B6;<a href="https://github.com/hulichao/hulichao_framework.git" rel="nofollow noreferrer" target="_blank">hulichao_framework</a>&#x4E0B;&#x9762;&#x7684;yBatis&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x4EC0;&#x4E48;&#x5462;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x636E;&#x5E93;&#x4E0E;Java&#x7A0B;&#x5E8F;&#x4E4B;&#x95F4;&#x7684;&#x76F8;&#x4E92;&#x6620;&#x5C04;&#xFF0C;&#x540C;&#x65F6;&#x7EA6;&#x5B9A;&#x56FA;&#x5B9A;&#x65B9;&#x6CD5;&#x5F00;&#x5934;&#x7684;&#x53EF;&#x4EE5;&#x4E0D;&#x9700;&#x8981;&#x5199;sql&#x8BED;&#x53E5;&#xFF0C;&#x60F3;&#x8BF4;&#x660E;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x5462;&#xFF0C;&#x5176;&#x4E00;&#xFF0C;&#x6211;&#x5728;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;&#xFF0C;&#x5F53;&#x7136;&#x5728;&#x8FD9;&#x4E2A;&#x5B66;&#x4E60;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x8FD8;&#x662F;&#x6536;&#x83B7;&#x86EE;&#x5927;&#x7684;&#xFF0C;&#x5373;&#x4F7F;&#x73B0;&#x6709;&#x6846;&#x67B6;&#x4E0D;&#x80FD;&#x6EE1;&#x8DB3;&#x90E8;&#x5206;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F;&#x91CD;&#x65B0;&#x6539;&#x9020;&#x5B83;&#x4EE3;&#x4EF7;&#x5982;&#x679C;&#x6BD4;&#x8F83;&#x9AD8;&#xFF0C;&#x4E5F;&#x4E0D;&#x5EFA;&#x8BAE;&#xFF0C;&#x5176;&#x4E8C;&#xFF0C;&#x5B66;&#x4E60;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x5148;&#x539F;&#x7406;&#xFF0C;&#x518D;&#x63A5;&#x53E3;&#xFF0C;&#x518D;&#x6CE8;&#x91CA;&#x4EE3;&#x7801;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5C31;&#x50CF;&#x524D;&#x9762;&#x7684;&#x6846;&#x67B6;&#x4ECE;&#x4E00;&#x5F00;&#x59CB;&#xFF0C;&#x6211;&#x60F3;&#x5B9E;&#x73B0;&#x7684;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x660E;&#x767D;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x53C2;&#x8003;&#x4E3B;&#x8981;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x8BBE;&#x8BA1;&#x63A5;&#x53E3;&#xFF0C;&#x6700;&#x540E;&#x5199;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF0C;&#x5C82;&#x6709;&#x96BE;&#x8F7D;&#x3002;</p><h3 id="articleHeader4">&#x6C9F;&#x901A;&#x95EE;&#x9898;</h3><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x95EE;&#x9898;&#x5176;&#x5B9E;&#x4E0D;&#x4EC5;&#x6D89;&#x53CA;&#x5230;&#x4EBA;&#x4E0E;&#x4EBA;&#xFF0C;&#x4E5F;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x673A;&#x5668;&#x4E0E;&#x4EBA;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x8BF4;&#xFF0C;&#x6211;&#x60F3;&#x505A;&#x4E00;&#x53F0;&#x6316;&#x6398;&#x673A;&#x6765;&#x7092;&#x83DC;&#xFF0C;&#x6316;&#x6398;&#x673A;&#x6839;&#x636E;&#x6700;&#x597D;&#x7684;&#x4F18;&#x5316;&#x8DEF;&#x7EBF;&#x884C;&#x9A76;&#xFF0C;&#x5C31;&#x8DDF;&#x73B0;&#x5728;&#x7684;&#x65E0;&#x4EBA;&#x8F66;&#x4E00;&#x6837;&#xFF0C;&#x540C;&#x65F6;&#x8BBE;&#x5907;&#x9F50;&#x5168;&#xFF0C;&#x80FD;&#x6839;&#x636E;&#x4E3B;&#x4EBA;&#x7684;&#x53E3;&#x5473;&#x63A8;&#x8350;&#x51FA;&#x83DC;&#x7CFB;&#xFF0C;&#x8FD9;&#x6837;&#x65E2;&#x53EF;&#x4EE5;&#x4FDD;&#x6301;&#x5176;&#x539F;&#x6709;&#x529F;&#x7528;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x79C1;&#x5BB6;&#x5C0F;&#x52A9;&#x624B;&#xFF0C;&#x7528;&#x6700;&#x4F18;&#x96C5;&#x7684;&#x65B9;&#x5F0F;&#x505A;&#x51FA;&#x6700;&#x7F8E;&#x5473;&#x7684;&#x83DC;&#xFF0C;&#x4E0D;&#x5C31;&#x662F;&#x7092;&#x83DC;&#x4E48;&#xFF0C;&#x5BF9;&#x4E8E;&#x5F88;&#x591A;&#x4EBA;&#x6765;&#x8BF4;&#x4E5F;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x5F00;&#x4E2A;&#x6316;&#x6398;&#x673A;&#x76F8;&#x4FE1;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x592A;&#x591A;&#x77E5;&#x8BC6;&#xFF0C;&#x8FD8;&#x6709;&#x505A;&#x63A8;&#x8350;&#x7B97;&#x6CD5;&#x7684;&#xFF0C;&#x8BF7;&#x4E00;&#x4E9B;&#x76F8;&#x5173;&#x9886;&#x57DF;&#x4E13;&#x5BB6;&#xFF0C;&#x5E94;&#x8BE5;&#x4E5F;&#x4E0D;&#x662F;&#x5F88;&#x5927;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x7EC4;&#x5408;&#x8D77;&#x6765;&#x5C31;&#x6BD4;&#x8F83;&#x8D39;&#x52B2;&#x4E86;&#xFF0C;&#x4E92;&#x8054;&#x7F51;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x628A;&#x751F;&#x6D3B;&#x4E2D;&#x5404;&#x79CD;&#x5404;&#x79CD;&#x5B9E;&#x5B9E;&#x5728;&#x5728;&#x7684;&#x95EE;&#x9898;&#x7528;&#x4E92;&#x8054;&#x7F51;&#x7684;&#x601D;&#x7EF4;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x90A3;&#x4E48;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x5462;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x6C9F;&#x901A;&#xFF0C;&#x5404;&#x4E2A;&#x4E13;&#x4E1A;&#x4EBA;&#x5458;&#x4E4B;&#x95F4;&#x7684;&#x6C9F;&#x901A;&#xFF0C;&#x8BBE;&#x8BA1;&#x8005;&#x7684;&#x60F3;&#x6CD5;&#x4E0E;&#x5B9E;&#x73B0;&#x8005;&#x7684;&#x60F3;&#x6CD5;&#x7684;&#x4E92;&#x52A8;&#xFF0C;&#x673A;&#x5668;&#x4E0E;&#x4EBA;&#x7684;&#x4E92;&#x52A8;&#x3002;&#x542C;&#x8D77;&#x6765;&#x8FD9;&#x662F;&#x4E2A;&#x6BB5;&#x5B50;&#xFF0C;&#x6216;&#x8005;&#x79D1;&#x5E7B;&#x7535;&#x5F71;&#x7684;&#x60C5;&#x8282;&#xFF0C;&#x55EF;&#xFF0C;&#x5176;&#x5B9E;&#x786E;&#x5B9E;&#x662F;&#x3002;&#x5BF9;&#x4E8E;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x4E0E;&#x540C;&#x4E8B;&#x7684;&#x6C9F;&#x901A;&#xFF0C;&#x4E0E;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x6C9F;&#x901A;&#xFF0C;&#x9700;&#x6C42;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x80FD;&#x5B9E;&#x73B0;&#x6210;&#x600E;&#x4E48;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x770B;&#x6574;&#x4E2A;&#x56E2;&#x961F;&#x7684;&#x5951;&#x5408;&#x5EA6;&#x5427;&#x3002;</p><h2 id="articleHeader5">&#x5EFA;&#x8BAE;</h2><p>&#x7406;&#x89E3;&#x539F;&#x7406;&#x6709;&#x7528;&#xFF0C;&#x4F46;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;&#xFF0C;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;&#xFF0C;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;,&#x5B81;&#x613F;&#x53BB;github&#x627E;&#x4E00;&#x5708;&#x627E;&#x5230;&#x57FA;&#x672C;&#x5408;&#x9002;&#x7684;&#x8F6E;&#x5B50;&#x6539;&#x9020;&#xFF0C;&#x4E5F;&#x4E0D;&#x8981;&#x4E3A;&#x4E86;&#x88C5;&#x903C;&#x5199;&#x81EA;&#x5DF1;&#x8F6E;&#x5B50;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x5F88;&#x96BE;&#x53D7;&#xFF0C;&#x81F3;&#x4E8E;&#x6C9F;&#x901A;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;&#x5C31;&#x662F;&#x4E2A;&#x96BE;&#x89E3;&#xFF0C;&#x6240;&#x4EE5;&#x51FA;&#x6765;&#x4E86;&#x9762;&#x5411;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#xFF0C;&#x9762;&#x5411;&#x63A5;&#x53E3;&#x7F16;&#x7A0B;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x6BD4;&#x80A5;&#x4ED4;&#x5FEB;&#x4E50;&#x6C34;&#x66F4;&#x81EA;&#x7136;&#x3002;&lt;div align=&quot;center&quot;&gt; &lt;img src=&quot;<a href="http://p94g7wqy4.bkt.clouddn.com//zhcc/content/feizai1.jpg&amp;quot" rel="nofollow noreferrer" target="_blank">http://p94g7wqy4.bkt.clouddn....</a>; width=&quot;400&quot;/&gt; &lt;/div&gt;<br><br>&lt;div align=&quot;center&quot;&gt; &lt;img src=&quot;<a href="http://p94g7wqy4.bkt.clouddn.com//zhcc/content/feizai2.jpg&amp;quot" rel="nofollow noreferrer" target="_blank">http://p94g7wqy4.bkt.clouddn....</a>; width=&quot;400&quot;/&gt; &lt;/div&gt;<br></p><hr><h1 id="articleHeader6">&#x6B63;&#x9898;</h1><p>&#x968F;&#x7740;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;&#x7684;&#x70ED;&#x6F6E;&#xFF0C;&#x524D;&#x7AEF;&#x5404;&#x5927;&#x6846;&#x67B6;&#x7684;&#xFF0C;&#x524D;&#x540E;&#x7AEF;&#x6C9F;&#x901A;&#x90E8;&#x5206;&#x4E5F;&#x6210;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x4E4B;&#x524D;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x9875;&#x9762;&#x751F;&#x6210;&#x5230;&#x524D;&#x7AEF;&#x6765;&#xFF0C;&#x73B0;&#x5728;&#x524D;&#x540E;&#x7AEF;&#x53EF;&#x80FD;&#x662F;&#x4E24;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4E00;&#x4E9B;&#x6280;&#x672F;&#x7684;&#x8FC1;&#x79FB;&#xFF0C;&#x672C;&#x6846;&#x67B6;&#x7684;&#x6743;&#x9650;&#x90E8;&#x5206;&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#xFF0C;&#x501F;&#x9274;&#x4E86;&#x524D;&#x7AEF;&#x5927;&#x725B;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x4E5F;&#x6709;&#x4F20;&#x7EDF;&#x540E;&#x7AEF;&#x7684;&#x8BBE;&#x8BA1;&#x65B9;&#x6848;&#xFF0C;&#x629B;&#x7816;&#x5F15;&#x7389;&#xFF0C;&#x505A;&#x4E2A;&#x6865;&#x6881;&#xFF0C;&#x5B9E;&#x73B0;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x6743;&#x9650;&#x7684;&#x8BBE;&#x8BA1;&#xFF0C;&#x4EE3;&#x7801;&#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#xFF0C;&#x601D;&#x8DEF;&#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#xFF0C;&#x76F8;&#x4FE1;&#x4F18;&#x79C0;&#x7684;&#x4F60;&#x5199;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x601D;&#x60F3;&#x4F1A;&#x66F4;&#x4E3A;&#x8D34;&#x5207;&#xFF0C;&#x65B9;&#x4FBF;&#x3002;<br>&#x6700;&#x7EC8;&#x5373;&#x5177;&#x6709;&#x7EDF;&#x4E00;&#x54CD;&#x5E94;&#x7ED3;&#x6784;&#x3001; &#x524D;&#x540E;&#x53F0;&#x6570;&#x636E;&#x6D41;&#x8F6C;&#x673A;&#x5236;(HTTP&#x6D88;&#x606F;&#x4E0E;Java&#x5BF9;&#x8C61;&#x7684;&#x4E92;&#x76F8;&#x8F6C;&#x5316;&#x673A;&#x5236;)&#x3001;&#x7EDF;&#x4E00;&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x673A;&#x5236;&#x3001;&#x53C2;&#x6570;&#x9A8C;&#x8BC1;&#x673A;&#x5236;&#x3001;Cors&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x673A;&#x5236;&#x4EE5;&#x53CA;&#x9274;&#x6743;&#x673A;&#x5236;<br>&#x524D;&#x7AEF;&#x8BBE;&#x8BA1;&#xFF1A;&#x91C7;&#x7528;Vue&#x7684;element ui &#xFF0C;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x8BBE;&#x8BA1;&#x8005;&#x6765;&#x8BF4;&#xFF0C;&#x5E94;&#x8BE5;&#x5F88;&#x597D;&#x7406;&#x89E3;&#x6E90;&#x7801;&#x3002;<br>&#x540E;&#x7AEF;&#x8BBE;&#x8BA1;&#xFF1A;shiro + ssm + redis&#x5B58;&#x50A8;jwt<br>&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#xFF1A;&#x524D;&#x7AEF;&#x5B58;&#x50A8;jwt&#xFF0C;&#x5728;&#x8BBF;&#x95EE;&#x540E;&#x7AEF;&#x65F6;&#x643A;&#x5E26;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x552F;&#x4E00;&#x4EA4;&#x4E92;&#x9A8C;&#x8BC1;&#x65B9;&#x5F0F;&#x3002;<br>&#x524D;&#x671F;&#x5DE5;&#x4F5C;&#xFF1A;&#x8BBE;&#x8BA1;&#x7B26;&#x5408;&#x9700;&#x6C42;&#x7684;vue&#x6A21;&#x677F;&#xFF0C;&#x8DEF;&#x7531;&#xFF0C;&#x8D44;&#x6E90;&#xFF0C;&#x89D2;&#x8272;&#xFF0C;&#x7528;&#x6237;&#x5176;&#x4E2D;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#x4E5F;&#x53EF;&#x4ECE;&#x6570;&#x636E;&#x8868;&#x4E2D;&#x4F53;&#x73B0;&#x51FA;&#x6765;</p><h2 id="articleHeader7">&#x5199;&#x5728;&#x524D;</h2><p>&#x5B9E;&#x9645;&#x7684;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x5176;&#x4E00;&#x662F;&#x8981;&#x6C42;&#x7528;&#x6237;&#x7B80;&#x5355;&#x5730;&#x8FDB;&#x884C;&#x6CE8;&#x518C;&#x767B;&#x5F55;&#xFF0C;&#x5176;&#x4E8C;&#x662F;&#x5BF9;&#x5176;&#x6388;&#x6743;&#xFF0C;&#x9644;&#x5E26;&#x7684;&#x6709;session&#x7BA1;&#x7406;&#x548C;&#x52A0;&#x5BC6;&#xFF0C;&#x6240;&#x4EE5;&#x8BDE;&#x751F;&#x4E86;shiro&#x8FD9;&#x6B3E;&#x6846;&#x67B6;&#xFF0C;&#x800C;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x8D8B;&#x52BF;&#xFF0C;&#x4F7F;&#x5F97;shiro&#x66F4;&#x597D;&#x5730;&#x5E94;&#x7528;&#x4E8E;&#x524D;&#x7AEF;&#x66F4;&#x6709;&#x5B9E;&#x9645;&#x610F;&#x4E49;&#xFF0C;&#x800C;&#x76EE;&#x524D;&#x50CF;vue&#x7C7B;&#x4F3C;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x4E5F;&#x5F88;&#x70ED;&#x95E8;&#xFF0C;&#x540C;&#x65F6;&#x6B63;&#x597D;&#x63A5;&#x89E6;&#x5230;&#x4E86;vue&#xFF0C;&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x9002;&#x5E94;&#x8981;&#x6C42;&#xFF0C;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x57FA;&#x4E8E;&#x524D;&#x540E;&#x7AEF;&#x5B8C;&#x5168;&#x5206;&#x79BB;&#x7684;&#x6743;&#x9650;&#x6846;&#x67B6;&#x3002;<br>&#x53E6;&#x5916;&#xFF0C;&#x4E00;&#x822C;&#x8BA4;&#x4E3A;&#x6743;&#x9650;&#x53EA;&#x80FD;&#x662F;&#x540E;&#x7AEF;&#x6765;&#x505A;&#xFF0C;&#x4F46;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5462;&#xFF1F;&#x8FD9;&#x6837;&#x5C82;&#x4E0D;&#x662F;&#x5F88;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#x3002;&#x51B5;&#x4E14;&#x5173;&#x4E8E;vue&#x7684;&#x6743;&#x9650;&#x63A7;&#x5236;&#x5728;&#x4E1A;&#x754C;&#x76F8;&#x5BF9;&#x6CA1;&#x6709;&#x4E3B;&#x6D41;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x767E;&#x5EA6;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x65B9;&#x9762;&#x7684;&#x8D44;&#x6599;&#x4E5F;&#x4E0D;&#x591A;&#xFF0C;&#x57FA;&#x672C;&#x90FD;&#x5F88;&#x96F6;&#x6563;&#x3002;<br>&#x524D;&#x7AEF;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/hulichao/zhcc-view-source.git" rel="nofollow noreferrer" target="_blank">https://github.com/hulichao/z...</a><br>&#x540E;&#x7AEF;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/hulichao/zhcc-server.git" rel="nofollow noreferrer" target="_blank">https://github.com/hulichao/z...</a></p><h2 id="articleHeader8">&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;</h2><p>&#x57FA;&#x672C;&#x60F3;&#x6CD5;&#x5C31;&#x662F;&#xFF0C;&#x7528;&#x5230;Vuex &#x548C; Vue Router &#x524D;&#x8005;&#x7528;&#x6765;&#x505A;&#x72B6;&#x6001;&#x63A7;&#x5236;&#xFF0C;&#x540E;&#x8005;&#x7ED1;&#x5B9A;&#x8DEF;&#x7531;&#xFF0C;&#x8FD9;&#x6837;&#x6743;&#x9650;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5BF9;&#x5E94;&#x5230;&#x7EC4;&#x4EF6;&#x4E0A;&#xFF0C;&#x67D0;&#x4E2A;&#x7528;&#x4E8E;&#x53EA;&#x80FD;&#x8BBF;&#x95EE;&#x67D0;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x5C06;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x52A0;&#x4E0A;&#x6743;&#x9650;&#x63A7;&#x5236;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x662F;&#x8FD8;&#x6709;&#x5355;&#x70B9;&#x767B;&#x5F55;&#x3002;<br>&#x6240;&#x4EE5;&#x629B;&#x7816;&#x5F15;&#x7389;&#xFF0C;&#x5199;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x6846;&#x67B6;&#xFF0C;&#xFF08;&#x81F3;&#x5C11;&#x662F;&#x901A;&#x7528;&#x60F3;&#x6CD5;&#xFF09;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x6A21;&#x5757;&#x5316;&#x6765;&#x53EF;&#x63D2;&#x62D4;&#x5C31;ok &#x4E86;&#x3002;<br>&#x975E;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x7684;&#x95EE;&#x9898;&#x662F;&#x53EA;&#x80FD;&#x5728;&#x62FF;&#x5230;&#x6743;&#x9650;&#x4E4B;&#x540E;&#x521D;&#x59CB;&#x5316;Vue&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x6B64;&#x5FC5;&#x987B;&#x628A;&#x767B;&#x9646;&#x9875;&#x4ECE;SPA&#x4E2D;&#x5265;&#x79BB;&#x51FA;&#x6765;&#x505A;&#x6210;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x7528;&#x6237;&#x767B;&#x5F55;/&#x9000;&#x51FA;&#x64CD;&#x4F5C;&#x9700;&#x8981;&#x5728;&#x4E24;&#x4E2A;url&#x4E4B;&#x95F4;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F53;&#x9A8C;&#x7565;&#x5DEE;&#x3002;</p><p>&#x53E6;&#x4E00;&#x79CD;&#x505A;&#x6CD5;&#x662F;&#x76F4;&#x63A5;&#x7528;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x5B9E;&#x4F8B;&#x5316;&#x5E94;&#x7528;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x767B;&#x5F55;&#x62FF;&#x5230;&#x6743;&#x9650;&#x540E;&#x518D;&#x901A;&#x8FC7;&#x5143;&#x7D20;&#x64CD;&#x4F5C;&#x9690;&#x85CF;&#x8D8A;&#x6743;&#x83DC;&#x5355;&#xFF0C;&#x8FD9;&#x65F6;&#x7528;&#x6237;&#x8FD8;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x8F93;&#x5165;&#x5730;&#x5740;&#x8BBF;&#x95EE;&#x8D8A;&#x6743;&#x9875;&#x9762;&#xFF0C;&#x56E0;&#x6B64;&#x8FD8;&#x9700;&#x8981;&#x7ED9;&#x8DEF;&#x7531;&#x52A0;beforeEach&#x94A9;&#x5B50;&#x6765;&#x9650;&#x5236;&#x8DEF;&#x7531;&#x8BBF;&#x95EE;&#xFF0C;&#x8DEF;&#x7531;&#x94A9;&#x5B50;&#x672C;&#x8EAB;&#x4F1A;&#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x7684;&#x6027;&#x80FD;&#x538B;&#x529B;&#xFF0C;&#x800C;&#x4E14;&#x5B9E;&#x4F8B;&#x5316;&#x5373;&#x6CE8;&#x518C;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x4E5F;&#x4F1A;&#x4F7F;&#x524D;&#x7AEF;&#x52A0;&#x8F7D;&#x5197;&#x4F59;&#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x3002;<br>&#x672C;&#x7CFB;&#x7EDF;&#x91C7;&#x7528;&#x7684;&#x5728;&#x521D;&#x59CB;&#x8DEF;&#x7531;&#x6CE8;&#x518C;&#x9996;&#x9875;&#x548C;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x5E76;&#x5728;&#x62FF;&#x5230;token&#x540E;&#x5F97;&#x5230;&#x6743;&#x9650;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5B9E;&#x4F8B;&#x5316;Vue&#x5B9E;&#x4F8B;&#x3002;&#x8DEF;&#x7531;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new Router({
  routes: [
    {
      path: &apos;/login&apos;,
      name: &quot;login&quot;,
      component: LoginView,
      meta: { requiresAuth: false }
    },{
      path: &apos;/index&apos;,
      redirect: &apos;/&apos;,
      meta: { requiresAuth: true }
    }
  ]
});
generateIndexRouter();

// &#x9A8C;&#x8BC1;token&#xFF0C;&#x5B58;&#x5728;&#x624D;&#x8DF3;&#x8F6C;
router.beforeEach((to, from, next) =&gt; {
  let token = sessionStorage.getItem(&apos;token&apos;)
  if(to.path === &apos;/&apos;) {
    if(!token) {
      next({
                path: &apos;/login&apos;,
                query: { redirect: to.fullPath }
      })
      return
    }
  }

    if(to.meta.requiresAuth) {
        if(token) {
            next()
        } else {
            next({
                path: &apos;/login&apos;,
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
});

router.afterEach((to, from) =&gt; {
  // &#x8BBE;&#x7F6E;&#x9762;&#x5305;&#x5C51;
  let breadCrumbItems = []
  let homePageCrumb = {
    title: &apos;&#x9996;&#x9875;&apos;,
    to: &apos;/&apos;
  }
  breadCrumbItems.push(homePageCrumb)
  if(to.meta.nameFullPath) {
    let fullPathSplit = to.meta.nameFullPath.split(&apos;/&apos;)
    fullPathSplit.forEach(( item, index ) =&gt; {
      let routerBreadCrumb = {
        title: item,
        to: (index == fullPathSplit.length - 1 ? to.path : &apos;&apos;)
      }
      breadCrumbItems.push(routerBreadCrumb)
    });
  }
  // &#x66F4;&#x65B0;&#x5230;state
  router.app.$store.dispatch(&apos;setBreadcurmbItems&apos;, breadCrumbItems)
})

// &#x751F;&#x6210;&#x9996;&#x9875;&#x8DEF;&#x7531;
function generateIndexRouter() {
  if (!sessionStorage.routers) {
    return
  }
  let indexRouter = {
    path: &quot;/&quot;,
    name: &quot;/&quot;,
    component: resolve =&gt; require([&apos;@/views/home/index&apos;], resolve),
    children: [
      ...generateChildRouters()
    ]
  }
  router.addRoutes([indexRouter])
}

// &#x751F;&#x6210;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#xFF08;&#x5B50;&#x8DEF;&#x7531;&#xFF09;
function generateChildRouters() {
  let routers = JSON.parse(sessionStorage.routers)
  let childRouters = []
  for(let router of routers) {
    if(router.code != null) {
      let routerProps = JSON.parse(router.properties)
      let childRouter = {
        path: router.url,
        name: router.code,
        component: resolve =&gt; require([&apos;@/views/&apos; + router.code + &apos;/index&apos;], resolve),
        meta: { routerId: router.id, requiresAuth: routerProps.meta.requiresAuth, nameFullPath: routerProps.nameFullPath }
      }
      childRouters.push(childRouter)
    }
  }
  return childRouters
}

export default router;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;login&quot;</span>,
      <span class="hljs-attr">component</span>: LoginView,
      <span class="hljs-attr">meta</span>: { <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">false</span> }
    },{
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/index&apos;</span>,
      <span class="hljs-attr">redirect</span>: <span class="hljs-string">&apos;/&apos;</span>,
      <span class="hljs-attr">meta</span>: { <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">true</span> }
    }
  ]
});
generateIndexRouter();

<span class="hljs-comment">// &#x9A8C;&#x8BC1;token&#xFF0C;&#x5B58;&#x5728;&#x624D;&#x8DF3;&#x8F6C;</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> token = sessionStorage.getItem(<span class="hljs-string">&apos;token&apos;</span>)
  <span class="hljs-keyword">if</span>(to.path === <span class="hljs-string">&apos;/&apos;</span>) {
    <span class="hljs-keyword">if</span>(!token) {
      next({
                <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
                <span class="hljs-attr">query</span>: { <span class="hljs-attr">redirect</span>: to.fullPath }
      })
      <span class="hljs-keyword">return</span>
    }
  }

    <span class="hljs-keyword">if</span>(to.meta.requiresAuth) {
        <span class="hljs-keyword">if</span>(token) {
            next()
        } <span class="hljs-keyword">else</span> {
            next({
                <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
                <span class="hljs-attr">query</span>: { <span class="hljs-attr">redirect</span>: to.fullPath }
            })
        }
    } <span class="hljs-keyword">else</span> {
        next()
    }
});

router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span></span>) =&gt;</span> {
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x9762;&#x5305;&#x5C51;</span>
  <span class="hljs-keyword">let</span> breadCrumbItems = []
  <span class="hljs-keyword">let</span> homePageCrumb = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
    <span class="hljs-attr">to</span>: <span class="hljs-string">&apos;/&apos;</span>
  }
  breadCrumbItems.push(homePageCrumb)
  <span class="hljs-keyword">if</span>(to.meta.nameFullPath) {
    <span class="hljs-keyword">let</span> fullPathSplit = to.meta.nameFullPath.split(<span class="hljs-string">&apos;/&apos;</span>)
    fullPathSplit.forEach(<span class="hljs-function">(<span class="hljs-params"> item, index </span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> routerBreadCrumb = {
        <span class="hljs-attr">title</span>: item,
        <span class="hljs-attr">to</span>: (index == fullPathSplit.length - <span class="hljs-number">1</span> ? to.path : <span class="hljs-string">&apos;&apos;</span>)
      }
      breadCrumbItems.push(routerBreadCrumb)
    });
  }
  <span class="hljs-comment">// &#x66F4;&#x65B0;&#x5230;state</span>
  router.app.$store.dispatch(<span class="hljs-string">&apos;setBreadcurmbItems&apos;</span>, breadCrumbItems)
})

<span class="hljs-comment">// &#x751F;&#x6210;&#x9996;&#x9875;&#x8DEF;&#x7531;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateIndexRouter</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (!sessionStorage.routers) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">let</span> indexRouter = {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/&quot;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;/&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">&apos;@/views/home/index&apos;</span>], resolve),
    <span class="hljs-attr">children</span>: [
      ...generateChildRouters()
    ]
  }
  router.addRoutes([indexRouter])
}

<span class="hljs-comment">// &#x751F;&#x6210;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#xFF08;&#x5B50;&#x8DEF;&#x7531;&#xFF09;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateChildRouters</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> routers = <span class="hljs-built_in">JSON</span>.parse(sessionStorage.routers)
  <span class="hljs-keyword">let</span> childRouters = []
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> router <span class="hljs-keyword">of</span> routers) {
    <span class="hljs-keyword">if</span>(router.code != <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">let</span> routerProps = <span class="hljs-built_in">JSON</span>.parse(router.properties)
      <span class="hljs-keyword">let</span> childRouter = {
        <span class="hljs-attr">path</span>: router.url,
        <span class="hljs-attr">name</span>: router.code,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">&apos;@/views/&apos;</span> + router.code + <span class="hljs-string">&apos;/index&apos;</span>], resolve),
        <span class="hljs-attr">meta</span>: { <span class="hljs-attr">routerId</span>: router.id, <span class="hljs-attr">requiresAuth</span>: routerProps.meta.requiresAuth, <span class="hljs-attr">nameFullPath</span>: routerProps.nameFullPath }
      }
      childRouters.push(childRouter)
    }
  }
  <span class="hljs-keyword">return</span> childRouters
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router;
</code></pre><h3 id="articleHeader9">&#x524D;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x7EA6;&#x5B9A;</h3><p>&#x65E2;&#x7136;&#x662F;restful&#x98CE;&#x683C;&#xFF0C;&#x5FC5;&#x7136;&#x6709;&#x901A;&#x7528;&#x8FD4;&#x56DE;&#x72B6;&#x6001;&#x7684;&#x7C7B;&#xFF0C;&#x9075;&#x5FAA;&#x7F51;&#x4E0A;&#x5F00;&#x6E90;&#x539F;&#x5219;&#xFF0C;&#x4E00;&#x7C7B;&#x7EE7;&#x627F;hashmap&#x8FD9;&#x6837;&#x8FBE;&#x5230;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4EFB;&#x610F;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x901A;&#x7528;&#x7684;&#x6570;&#x636E;&#x5C31;&#x662F;code.msg.data&#x8FD9;&#x4E9B;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5206;&#x9875;&#x4F1A;&#x53E6;&#x5916;&#x52A0;&#x5206;&#x9875;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x662F;&#xFF0C;data.msg.state(code).token + &#x5206;&#x9875;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;data&quot;: {
    &quot;list&quot;: null,
    &quot;pagebar&quot;: {
      &quot;page&quot;: 1,
      &quot;total&quot;: 2,
      &quot;limit&quot;: 10
    }
  },
 &quot;msg&quot;: &quot;error&quot;,
  &quot;state&quot;: 0,
  &quot;is_redirect&quot;: true,
  &quot;redirect_url&quot;: &quot;http://qq.com&quot;,
  &quot;token&quot;: null" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">&quot;data&quot;:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    &quot;list&quot;:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    &quot;pagebar&quot;:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      &quot;page&quot;:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">      &quot;total&quot;:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">      &quot;limit&quot;:</span> <span class="hljs-number">10</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr"> &quot;msg&quot;:</span> <span class="hljs-string">&quot;error&quot;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  &quot;state&quot;:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">  &quot;is_redirect&quot;:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  &quot;redirect_url&quot;:</span> <span class="hljs-string">&quot;http://qq.com&quot;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  &quot;token&quot;:</span> <span class="hljs-literal">null</span></code></pre><p>&#x672C;&#x9879;&#x76EE;&#x8003;&#x8651;&#x5230;&#x540E;&#x671F;&#x7684;&#x6269;&#x5C55;&#x6027;&#xFF0C;&#x7528;&#x5230;&#x4E86;&#x7B2C;&#x4E00;&#x7C7B;&#xFF0C;&#x5176;&#x4E2D;&#x5B9E;&#x73B0;&#x4E86;&#x5E38;&#x7528;&#x7684;&#x5931;&#x8D25;&#x548C;&#x6210;&#x529F;&#x7684;&#x72B6;&#x6001;&#x7801;&#x53CA;&#x5176;&#x54CD;&#x5E94;,&#x7C7B;&#x540D;&#x8BBE;&#x8BA1;&#x4E3A;Result&#xFF0C;&#x4F4D;&#x4E8E;zhcc-common&#x4E0B;&#x9762;&#xFF0C;&#x4E00;&#x822C;&#x6027;&#x5730;&#x662F;&#x5C01;&#x88C5;&#x5230;ResponseEntity&#x4E2D;&#x8FD4;&#x56DE;&#x3002;</p><h3 id="articleHeader10">&#x524D;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x7EA6;&#x5B9A;</h3><p>&#x5206;&#x522B;&#x5BF9;&#x5E94;http&#x534F;&#x8BAE;&#x7684;get/put/post/delete&#x65B9;&#x6CD5;&#xFF0C;&#x540E;&#x7AEF;&#x6743;&#x9650;&#x662F;:read/:update/:create/:delete</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case &quot;get&quot;:
    permissionString += &quot;:read&quot;;
    break;
case &quot;put&quot;:
    permissionString += &quot;:update&quot;;
    break;
case &quot;post&quot;:
    permissionString += &quot;:create&quot;;
    break;
case &quot;delete&quot;:
    permissionString += &quot;:delete&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-keyword">case</span> <span class="hljs-string">&quot;get&quot;</span>:
    permissionString += <span class="hljs-string">&quot;:read&quot;</span>;
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;put&quot;</span>:
    permissionString += <span class="hljs-string">&quot;:update&quot;</span>;
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;post&quot;</span>:
    permissionString += <span class="hljs-string">&quot;:create&quot;</span>;
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;delete&quot;</span>:
    permissionString += <span class="hljs-string">&quot;:delete&quot;</span>;</code></pre><h3 id="articleHeader11">&#x9A8C;&#x8BC1;&#x90E8;&#x5206;</h3><p>&#x7528;&#x7684;&#x662F;com.baidu.unbiz.fluentvalidator.ValidationError &#x800C;&#x4E0D;&#x662F;hibernateValidator &#x51CF;&#x8F7B;&#x670D;&#x52A1;&#x7AEF;&#x7F16;&#x7A0B;&#x7B49;&#x7684;&#x538B;&#x529B;&#x3002;&#x76F4;&#x63A5;&#x5728;controller&#x91CC;&#x9762;&#x9A8C;&#x8BC1;,&#x6700;&#x540E;&#x5C01;&#x88C5;&#x5230;Result&#x7684;fail&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x8FD4;&#x56DE;&#x3002;</p><h2 id="articleHeader12">&#x6743;&#x9650;&#x7684;&#x8BBE;&#x8BA1;</h2><p>&#x6743;&#x9650;&#x7684;&#x63A7;&#x5236;&#x4E3B;&#x8981;&#x5206;&#x4E3A;4&#x5927;&#x7C7B;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x57FA;&#x4E8E;RBAC&#x539F;&#x7406;&#x3002;<br>&#x8DEF;&#x7531;&#xFF0C;&#x8D44;&#x6E90;&#xFF0C;&#x89D2;&#x8272;&#xFF0C;&#x7528;&#x6237;<br>&#x8DEF;&#x7531;&#x7EA7;&#x522B;&#x548C;&#x7EC4;&#x4EF6;&#x7EA7;&#x522B;&#x53EF;&#x63A7;&#x5236;</p><h2 id="articleHeader13">&#x8FC7;&#x7A0B;&#x8BBE;&#x8BA1;</h2><p>1.&#x6743;&#x9650;&#x8BBE;&#x8BA1;<br>2.&#x5F02;&#x5E38;&#x8BBE;&#x8BA1;<br>3.&#x5B57;&#x5178;&#x548C;&#x5176;&#x4ED6;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;<br>4.&#x524D;&#x540E;&#x7684;&#x901A;&#x8BAF;&#x8BBE;&#x8BA1;==</p><h2 id="articleHeader14">&#x8BF4;&#x660E;</h2><p>vue.js&#x5B98;&#x7F51;&#x662F;&#x6700;&#x597D;&#x7684;&#x6559;&#x7A0B;&#xFF0C;vue.js&#x5B98;&#x7F51;&#x662F;&#x6700;&#x597D;&#x7684;&#x6559;&#x7A0B;&#xFF0C;vue.js&#x5B98;&#x7F51;&#x662F;&#x6700;&#x597D;&#x7684;&#x6559;&#x7A0B;&#x3002;&#x4E0D;&#x4FE1;&#x7684;&#x8BDD;&#xFF0C;&#x54B1;&#x8D70;&#x7740;&#x77A7;&#xFF01;</p><h2 id="articleHeader15">&#x600E;&#x4E48;&#x7528;&#xFF1F;</h2><p>&#x4E00;&#x4EFD; demo&#x3001;&#x4E00;&#x4E2A;&#x5165;&#x95E8;&#x6307;&#x5357;&#x3001;&#x4E00;&#x4E2A; API &#x5217;&#x8868;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x6D4B;&#x8BD5;&#x3002;</p><ol><li><p>demo&#x600E;&#x4E48;&#x7528;</p><ul><li>git clone &#x524D;&#x7AEF;&#x5730;&#x5740; &#x6267;&#x884C;npm run dev &#x5728;&#x8FD9;&#x4E4B;&#x524D;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x6309;&#x7167;&#x4E00;&#x4E0B;npm &#x4F9D;&#x8D56;&#x7684;&#x5305;&#xFF0C;&#x90A3;&#x5C31;&#x5148;&#x6267;&#x884C;npm init &#x7136;&#x540E; npm install, &#x6700;&#x540E;&#x518D;&#x6267;&#x884C;npm run dev&#x6216;&#x8005;npm run build &#x4E24;&#x8005;&#x7684;&#x533A;&#x522B;&#x4F60;&#x61C2;&#x7684;&#x3002;</li><li>git clone &#x540E;&#x7AEF;&#x5730;&#x5740; clone&#x4E0B;&#x6765;&#x7136;&#x540E;&#x5462;&#xFF1F;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x5E93;&#x8DEF;&#x5F84;&#xFF0C;&#x8FD0;&#x884C;sql&#x5BFC;&#x5165;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x6700;&#x540E;&#x8FD0;&#x884C;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x5373;&#x53EF;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x662F;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#xFF0C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;nginx&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6765;&#x90E8;&#x7F72;&#x524D;&#x7AEF;&#x4EE3;&#x7801;&#x3002;</li></ul></li><li>&#x5165;&#x95E8;&#x6307;&#x5357;&#xFF0C;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E48;&#x4F18;&#x79C0;&#x7684;&#x4F60;&#xFF0C;&#x5E94;&#x8BE5;&#x4E0D;&#x9700;&#x8981;&#x4E86;&#x5427;&#x3002;</li><li>API&#x548C;&#x6D4B;&#x8BD5;&#x540E;&#x671F;&#x518D;&#x5B8C;&#x5584;&#x3002;&#x8BF7;&#x65F6;&#x523B;&#x5173;&#x6CE8;&#x672C;&#x6587;&#x6863;&#xFF0C;&#x83B7;&#x53D6;&#x5B9E;&#x65F6;&#x8D44;&#x8BAF;&#x3002;</li></ol><h2 id="articleHeader16">&#x6350;&#x8D60;&#xFF08;Donation&#xFF09;</h2><p>&#x89C9;&#x5F97;&#x4E0D;&#x9519;&#x7684;&#x8BDD;&#xFF0C;&#x8D4F;&#x5457;&#x5496;&#x5561;&#x5457;&#xFF0C;&#x4E00;&#x676F;&#x4E0D;&#x884C;&#x534A;&#x676F;&#x4E5F;&#x53EF;&#x4EE5;&#x8BF6;&#xFF0C;&#x5982;&#x679C;&#x8FDB;&#x6765;fork&#x4E00;&#x4E0B;&#x4E0B;&#xFF0C;star&#x4E00;&#x4E0B;&#x4E0B;&#x518D;&#x597D;&#x4E0D;&#x8FC7;&#x5566;&#x3002;</p><h2 id="articleHeader17">&#x53C2;&#x8003;</h2><ul><li>&#x53C2;&#x8003;&#x8D44;&#x6599;1&#xFF1A;<a href="https://refined-x.com/2017/11/28/Vue2.0%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" rel="nofollow noreferrer" target="_blank">vue &#x6743;&#x9650;&#x524D;&#x7AEF;&#x8BBE;&#x8BA1;</a></li><li>&#x53C2;&#x8003;&#x8D44;&#x6599;2&#xFF1A;csdn <a href="https://edu.csdn.net/course/play/4983/undefined" rel="nofollow noreferrer" target="_blank">https://edu.csdn.net/course/p...</a></li><li>&#x53C2;&#x8003;&#x8D44;&#x6599;3&#xFF1A;&#x5F00;&#x6E90;&#x6846;&#x67B6; <a href="https://gitee.com/zhocuhenglin/dp-security/tree/master/dp-shiro/src/main/java/net/chenlin/dp/shiro" rel="nofollow noreferrer" target="_blank">https://gitee.com/zhocuhengli...</a></li><li>&#x53C2;&#x8003;&#x8D44;&#x6599;4&#xFF1A;vue &#x5B98;&#x7F51;</li><li>&#x53C2;&#x8003;&#x8D44;&#x6599;5&#xFF1A;vue &#x6743;&#x9650;&#x63A7;&#x5236; <a href="https://github.com/OneWayTech/vue-auth-solution" rel="nofollow noreferrer" target="_blank">https://github.com/OneWayTech...</a></li></ul><h2 id="articleHeader18">&#x523B;&#x610F;&#x7EC3;&#x4E60;</h2><p>&#x8BF4;&#x660E;&#x4E00;&#x70B9;&#xFF0C;&#x4ECE;&#x5B66;&#x4E60;&#x672C;&#x8EAB;&#x6765;&#x8BF4;&#x5E76;&#x4E0D;&#x662F;&#x96BE;&#x4E8B;&#xFF0C;&#x6BD4;&#x5982;&#x8BFB;&#x4E00;&#x672C;&#x4E66;&#xFF0C;&#x5B66;&#x4F1A;&#x7528;&#x4E00;&#x4E2A;&#x6846;&#x67B6;&#xFF0C;&#x7B49;&#x7B49;&#xFF0C;&#x5373;&#x4F7F;&#x96F6;&#x57FA;&#x7840;&#x5230;&#x719F;&#x7EC3;&#xFF0C;&#x6240;&#x82B1;&#x8D39;&#x7684;&#x65F6;&#x95F4;&#x548C;&#x7CBE;&#x529B;&#x4E5F;&#x4E0D;&#x4F1A;&#x5F88;&#x591A;&#xFF0C;&#x800C;&#x6574;&#x4E2A;&#x6280;&#x80FD;&#x6808;&#x5374;&#x53C8;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x70B9;&#x4E00;&#x6EF4;&#x79EF;&#x7D2F;&#x8D77;&#x6765;&#x7684;&#xFF0C;&#x90A3;&#x4E9B;&#x770B;&#x8D77;&#x6765;&#x6D0B;&#x6D0B;&#x5F97;&#x610F;&#x7684;&#x5927;&#x795E;&#xFF0C;&#x80CC;&#x540E;&#x90FD;&#x5C11;&#x4E0D;&#x4E86;&quot;&#x80AE;&#x810F;&quot;,&#x4E3A;&#x4EC0;&#x4E48;&#x4F60;&#x5C31;&#x4E0D;&#x53EF;&#x4EE5;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x60F3;&#x901F;&#x6210;&#xFF0C;&#x4F60;&#x60F3;&#x4E00;&#x591C;&#x4E4B;&#x95F4;&#x638C;&#x63E1;&#x6240;&#x6709;&#x7684;&#x6280;&#x80FD;&#xFF0C;&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x7684;&#x5404;&#x79CD;&#x901F;&#x6210;&#xFF0C;&#x6BD4;&#x5982;21&#x5929;&#x5B66;&#x4F1A;&#x4ECE;&#x5220;&#x5E93;&#x5230;&#x8DD1;&#x8DEF;&#x7684;&#x4E66;&#x7C4D;&#x5F88;&#x6D41;&#x884C;&#xFF0C;&#x5176;&#x5B9E;&#x54EA;&#x6709;&#x6377;&#x5F84;&#xFF0C;&#x53EA;&#x6709;&#x8B66;&#x8BB0;&#xFF1A;&#x81EA;&#x5F8B;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x751F;&#x6D3B;&#xFF0C;&#x6210;&#x957F;&#x5728;&#x4E8E;&#x575A;&#x6301;&#x4E0E;&#x79EF;&#x7D2F;&#x3002;&#x4ECE;&#x523B;&#x610F;&#x7EC3;&#x4E60;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5B66;&#x5230;&#x7684;&#x662F;&#xFF0C;&#x5B66;&#x4F1A;&#x5B66;&#x4E60;&#xFF0C;&#x6211;&#x4EEC;&#x4F5C;&#x4E3A;&#x7F16;&#x7A0B;&#x513F;&#xFF0C;&#x65E0;&#x8BBA;&#x54EA;&#x79CD;&#x5F62;&#x5F0F;&#x8981;&#x8BB0;&#x5F97;&#x7F16;&#x7A0B;-&gt;&#x53CD;&#x9988;-&gt;&#x4FEE;&#x6B63;-&gt;&#x91CD;&#x65B0;&#x6574;&#x7406;&#x5B66;&#x4E60;&#x3002;&#x66F4;&#x591A;&#x7684;&#x5173;&#x6CE8;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;<a href="http://hulichao.top" rel="nofollow noreferrer" target="_blank">http://hulichao.top</a> &#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x6709;&#x9152;&#xFF0C;&#x4F60;&#x8981;&#x6765;&#x4E48;&#xFF1F;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue(element ui) + ssm + shiro 的权限框架

## 原文链接
[https://segmentfault.com/a/1190000016025085](https://segmentfault.com/a/1190000016025085)

