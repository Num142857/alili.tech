---
title: 'css布局简史与决胜未来的第四代css布局技术' 
date: 2018-11-21 2:30:09
hidden: true
slug: c8xyrtk79jl
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbenWU?w=500&amp;h=500" src="https://static.alili.tech/img/bVbenWU?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4E00;&#x8F6C;&#x773C;&#x5DF2;&#x7ECF;2018&#x5E74;&#xFF0C;&#x524D;&#x7AEF;&#x884C;&#x4E1A;&#x4E5F;&#x98CE;&#x98CE;&#x96E8;&#x96E8;&#x7684;&#x8D70;&#x8FC7;&#x4E86;10&#x591A;&#x5E74;&#xFF0C;&#x7F51;&#x9875;&#x5E03;&#x5C40;&#x4E5F;&#x4ECE;&#x6700;&#x539F;&#x59CB;&#x7684;&#x6587;&#x6863;&#x53D8;&#x6210;&#x6210;&#x4E86;&#x5F53;&#x524D;&#x7CBE;&#x5F69;&#x7EB7;&#x5448;&#x7684;&#x4EA4;&#x4E92;&#x3002;&#x5F53;&#x6211;&#x770B;&#x5230;&#x7B2C;&#x56DB;&#x4EE3;css&#x5E03;&#x5C40;&#x6280;&#x672F;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x770B;&#x5230;&#x65E0;&#x6570;&#x5973;&#x5B50;&#x4E00;&#x6837;&#x7684;&#x7684;&#x53CD;&#x5E94;&#xFF0C;&#x8FD9;&#x4E2A;&#x599E;&#x513F;&#x597D;&#x50CF;&#x5728;&#x54EA;&#x89C1;&#x8FC7;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x4E0D;&#x662F;&#x53D1;&#x751F;&#x8FC7;&#x70B9;&#x5565;&#x6216;&#x8005;&#x8BE5;&#x53D1;&#x751F;&#x70B9;&#x5565;&#xFF1F;</p><p>&#x77E5;&#x9053;&#x8FC7;&#x53BB;&#x80FD;&#x66F4;&#x597D;&#x7684;&#x6307;&#x5BFC;&#x6211;&#x4EEC;&#x672A;&#x6765;&#x7684;&#x6280;&#x672F;&#x5B66;&#x4E60;&#xFF0C;&#x6BD5;&#x7ADF;&#x592A;&#x9633;&#x5E95;&#x4E0B;&#x6CA1;&#x6709;&#x65B0;&#x9C9C;&#x4E8B;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x770B;&#x5230;&#x6700;&#x65B0;&#x7684;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x8054;&#x60F3;&#x8D77;&#x66FE;&#x7ECF;&#x7684;&#x521D;&#x4EE3;table&#x5E03;&#x5C40;&#x6837;&#xFF0C;&#x4E00;&#x5207;&#x90FD;&#x53D8;&#x4E86;&#xFF0C;&#x4E00;&#x5207;&#x597D;&#x50CF;&#x90FD;&#x662F;&#x91CD;&#x65B0;&#x6765;&#x8FC7;&#x3002;</p><p>&#x90A3;&#x662F;2006&#x5E74;&#x7684;&#x7B2C;&#x4E00;&#x573A;&#x96EA;&#xFF0C;&#x6BD4;2005&#x5E74;&#x6765;&#x7684;&#x66F4;&#x65E9;&#x4E00;&#x4E9B;&#xFF0C;&#x90A3;&#x65F6;&#x5019;&#x6211;&#x8FD8;&#x662F;&#x4E00;&#x4E2A;&#x98CE;&#x5EA6;&#x7FE9;&#x7FE9;&#x7389;&#x6811;&#x4E34;&#x98CE;&#x7684;&#x5C11;&#x5E74;&#xFF0C;&#x90A3;&#x4E00;&#x5E74;&#x6BCF;&#x4E00;&#x4E2A;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x7535;&#x8111;&#x4E0A;&#x8FD8;&#x90FD;&#x88C5;&#x7740;&#x4E00;&#x4E2A;frontpage&#xFF0C;&#x90A3;&#x4E00;&#x5E74;&#x6211;&#x8FD8;&#x80FD;&#x88AB;&#x65E9;&#x5DF2;&#x7ECF;&#x88AB;&#x6254;&#x5165;&#x5783;&#x573E;&#x5806;&#x7684;dreamwaver8 &#x60CA;&#x8273;&#x5230;&#xFF0C;&#x90A3;&#x4E00;&#x5E74;&#x90A3;&#x4E2A;&#x5C0F;&#x874C;&#x86AA;&#xFF08;dreamwaver8&#x7684;&#x56FE;&#x6807;&#x662F;&#x4E00;&#x4E2A;&#x5012;&#x7740;&#x5199;&#x7684;6&#xFF0C;&#x597D;&#x5427;&#xFF0C;&#x6211;&#x4E00;&#x76F4;&#x4EE5;&#x4E3A;&#x4ED6;&#x50CF;&#x4E00;&#x4E2A;&#x5C0F;&#x874C;&#x86AA;&#xFF09;&#x4F34;&#x968F;&#x4E86;&#x6211;&#x5927;&#x534A;&#x4E2A;&#x9752;&#x6625;&#x2026;&#x2026;<br><span class="img-wrap"><img data-src="/img/bVbenWZ?w=220&amp;h=220" src="https://static.alili.tech/img/bVbenWZ?w=220&amp;h=220" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>2006&#x5E74;&#x6CE8;&#x5B9A;&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x5E73;&#x51E1;&#x7684;&#x4E00;&#x5E74;&#xFF0C;&#x90A3;&#x4E00;&#x5E74;&#x5FAE;&#x8F6F;&#x5224;&#x4E86;fontpage&#x6B7B;&#x5211;&#xFF0C;&#x90A3;&#x4E00;&#x5E74;XMLHttpRequest&#x88AB;W3C&#x6B63;&#x5F0F;&#x7EB3;&#x5165;&#x6807;&#x51C6; &#xFF0C;&#x90A3;&#x4E00;&#x5E74;&#x8C37;&#x6B4C;&#x6700;&#x6027;&#x611F;&#x7684;&#x599E;&#x513F;gmail&#x5DF2;&#x7ECF;&#x4E24;&#x5C81;&#x4E86;&#xFF0C;&#x91CD;&#x70B9;&#x662F;&#x66FE;&#x7ECF;&#x7EDF;&#x6CBB;PC&#x7F51;&#x7AD9;90%&#x4EE5;&#x4E0A;&#x7684;jquery &#x88AB; John Resig&#x53D1;&#x5E03;&#x4E86;jQuery &#xFF0C;js&#x4E00;&#x54E5;&#x6A2A;&#x7A7A;&#x51FA;&#x4E16;&#xFF0C;&#x4ECE;&#x6B64;&#xFF0C;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x8FD9;&#x4E2A;&#x8BA9;&#x5927;&#x91CF;&#x4EBA;&#x8363;&#x8000;&#x4E0E;&#x60C6;&#x6005;&#x7684;&#x804C;&#x4E1A;&#x5982;&#x96E8;&#x540E;&#x6625;&#x7B0B;&#x822C;&#x6210;&#x957F;&#x8D77;&#x6765;&#xFF0C;&#x76F4;&#x5230;&#x73B0;&#x5728;&#x4F9D;&#x7136;&#x706B;&#x7206;&#xFF0C;&#x5F53;&#x7136;&#x8FD8;&#x6709;dreamwaver 8 &#x53D1;&#x5E03;&#x4E86;&#x3002;</p><p>&#x4E00;&#x5207;&#x90FD;&#x90A3;&#x4E48;&#x7F8E;&#x597D;&#xFF0C;&#x9664;&#x4E86;&#x8BA9;&#x4EBA;&#x6076;&#x5FC3;&#x7684;&#x521D;&#x4EE3;table&#x5E03;&#x5C40;&#x3002;</p><h3 id="articleHeader0"><strong>&#x521D;&#x4EE3;table&#x5E03;&#x5C40;</strong></h3><p>&#x6B63;&#x5982;table&#x7684;&#x6700;&#x65E9;&#x4F7F;&#x7528;&#x8005;&#x6240;&#x8BF4;&#xFF0C;&#x6211;&#x628A;&#x70B8;&#x9171;&#x548C;&#x9762;&#x5012;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6CD5;&#x5206;&#x5F00;&#x4ED6;&#x3002;&#x7FFB;&#x8BD1;&#x6210;&#x4EBA;&#x8BDD;&#x5C31;&#x662F;&#xFF0C;&#x968F;&#x7740;&#x4E1A;&#x52A1;&#x7684;&#x8D8A;&#x6765;&#x8D8A;&#x590D;&#x6742;&#xFF0C;&#x505A;&#x597D;&#x7684;&#x7F51;&#x9875;&#x4F60;&#x60F3;&#x6539;&#x5C31;&#x662F;&#x626F;&#x6DE1;&#x7684;&#x4E8B;&#x513F;&#xFF0C;&#x7279;&#x522B;&#x96BE;&#x6539;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbenW3?w=600&amp;h=400" src="https://static.alili.tech/img/bVbenW3?w=600&amp;h=400" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader1">&#x7136;&#x540E;&#x7B2C;&#x4E8C;&#x4EE3;&#x5E03;&#x5C40;css+div&#x5E03;&#x5C40;&#x767B;&#x573A;&#x4E86;&#xFF0C;</h3><p>&#x51C6;&#x786E;&#x7684;&#x8BF4;&#x8FD9;&#x73A9;&#x610F;10&#x51E0;&#x5E74;&#x524D;&#x5C31;&#x6709;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x624D;&#x957F;&#x6210;&#x5927;&#x59D1;&#x5A18;&#xFF0C;&#x7136;&#x540E;&#x4E00;&#x51FA;&#x4E16;&#x5C31;&#x5B8C;&#x5168;&#x5BA0;&#x7231;&#x4E8E;&#x4E00;&#x8EAB;&#xFF0C;&#x76F4;&#x63A5;&#x628A;table&#x5E03;&#x5C40;&#x6253;&#x5165;&#x51B7;&#x5BAB;&#x4E86;&#x3002;&#x4ECE;&#x6B64;&#x6B63;&#x5F0F;&#x5F00;&#x542F;&#x4E86;div+css&#x65F6;&#x4EE3;&#x3002;</p><p>&#x8FD9;&#x8D27;&#x706B;&#x8D77;&#x6765;&#x662F;&#x6709;&#x539F;&#x56E0;&#x7684;&#xFF0C;&#x5E94;&#x4E3A;&#x7075;&#x6D3B;&#x4FEE;&#x6539;&#xFF0C;&#x5982;&#x679C;&#x8BF4;table&#x5E03;&#x5C40;&#x662F;&#x534A;&#x6C38;&#x4E45;&#x7EB9;&#x7709;&#x7684;&#x8BDD;&#xFF0C;div+css&#x5E03;&#x5C40;&#x5C31;&#x662F;&#x753B;&#x7709;&#xFF0C;&#x60F3;&#x600E;&#x4E48;&#x53D8;&#x5C31;&#x600E;&#x4E48;&#x53D8;&#xFF0C;&#x8FD8;&#x4E0D;&#x7528;&#x524A;&#x9AA8;&#xFF08;&#x52A8;DOM&#xFF09;,&#x5F53;&#x7136;&#x76EE;&#x524D;&#x8FD9;&#x8D27;&#x4E5F;&#x662F;&#x5F88;&#x4E3B;&#x6D41;&#x7684;,&#x4F46;&#x662F;&#x6211;&#x89C9;&#x5F97;css&#x8FD9;&#x8D27;&#x4E5F;&#x4E0D;&#x662F;&#x6CA1;&#x5565;&#x7F3A;&#x70B9;&#xFF0C;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x7834;&#x73A9;&#x610F;&#x5BF9;&#x975E;&#x7A0B;&#x5E8F;&#x5458;&#x592A;&#x590D;&#x6742;&#x4E86;&#xFF0C;&#x5373;&#x4F7F;&#x5BF9;&#x4E8E;&#x7A0B;&#x5E8F;&#x5458;&#x4E5F;&#x592A;&#x78E8;&#x53FD;&#x4E86;&#xFF0C;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x53BB;&#x63A7;&#x5236;&#xFF0C;&#x5C31;&#x8DDF;&#x4E00;&#x4E2A;&#x5973;&#x5B69;&#x8981;&#x5316;&#x5986;&#xFF0C;&#x5C3C;&#x739B;&#x5440;&#x6709;20&#x53EA;&#x7709;&#x7B14;&#xFF0C;&#x4E09;&#x5341;&#x8272;&#x53E3;&#x7EA2;&#xFF0C;&#x600E;&#x4E48;&#x914D;&#x5408;&#xFF1F;&#x592A;&#x9EBB;&#x70E6;&#x4E86;&#x2026;&#x2026;</p><p>&#x8981;&#x662F;&#x556A;&#x556A;&#x556A;&#xFF0C;&#x6709;&#x4E2A;&#x8D34;&#x819C;&#x591A;&#x597D;&#xFF0C;&#x7F51;&#x4E0A;&#x4E00;&#x8D34;&#x7709;&#x6BDB;&#x5C31;&#x753B;&#x597D;&#x4E86;&#xFF0C;&#x518D;&#x556A;&#x556A;&#x556A;&#x4E00;&#x8D34;&#xFF0C;&#x8138;&#x86CB;&#x7EA2;&#x6DA6;&#x4E86;&#x3002;&#x522B;&#x8BA9;&#x6211;&#x4E00;&#x7B14;&#x7B14;&#x7684;&#x63CF;&#xFF0C;&#x4E00;&#x4E0B;&#x4E00;&#x4E0B;&#x7684;&#x94FA;&#x7C89;&#x5E95;&#x5F04;&#x4EC0;&#x4E48;&#x816E;&#x7EA2;&#x3002;</p><p>&#x662F;&#x7684;&#x4F60;&#x61C2;&#x5F97;&#xFF0C;&#x56E0;&#x4E3A;css&#x5E03;&#x5C40;&#x7684;&#x58A8;&#x8FF9;&#xFF0C;&#x5C24;&#x5176;&#x662F;float&#x5E03;&#x5C40;&#x5404;&#x79CD;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x4E4B;&#x7C7B;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x5C31;&#x8DDF;&#x6316;&#x5B8C;&#x9F3B;&#x5C4E;&#x5F97;&#x64E6;&#x4E00;&#x4E2A;&#x9053;&#x7406;&#xFF0C;&#x771F;&#x6076;&#x5FC3;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8FD9;&#x4E9B;&#x6076;&#x5FC3;&#x7684;&#x95EE;&#x9898;&#xFF0C;css&#xFF0C;&#xFF08;&#x653E;&#x5FC3;&#x76EE;&#x524D;&#x5C31;&#x8FD9;&#x54E5;&#x4EEC;&#x4E00;&#x7EDF;&#x6C5F;&#x6E56;&#x4E86;&#xFF0C;&#x6CA1;&#x6709;&#x522B;&#x7684;&#x4EC0;&#x4E48;&#x73A9;&#x610F;&#xFF0C;&#x8FD9;&#x70B9;&#x6211;&#x8FD8;&#x662F;&#x5F88;&#x6B23;&#x6170;&#x7684;&#xFF0C;&#x4E0D;&#x50CF;html &#x5C1D;&#x8BD5;&#x641E;&#x4EC0;&#x4E48;XHTML2.0&#x4EC0;&#x4E48;html5,js&#x66F4;&#x8FC7;&#x5206;&#xFF0C;&#x641E;&#x4EC0;&#x4E48;typescript&#x4EC0;&#x4E48;&#x7684;&#xFF09;&#x4E00;&#x62CD;&#x5927;&#x817F;&#xFF0C;&#x4EC0;&#x4E48;float&#x4EC0;&#x4E48;&#x561B;&#xFF0C;&#x4EC0;&#x4E48;&#x6076;&#x5FC3;&#x4EBA;&#x7684;&#x4F4D;&#x7F6E;&#x5BBD;&#x9AD8;&#x7269;&#x4F53;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x4EC0;&#x4E48;float&#x5143;&#x7D20;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x5C45;&#x4E2D;&#xFF0C;&#x8FD9;&#x90FD;&#x5565;&#x6076;&#x5FC3;&#x4E0D;&#x5783;&#x573E;&#x7684;&#x73A9;&#x610F;&#x554A;&#xFF0C;&#x54E5;&#x6709;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x89E3;&#x51B3;&#x4F60;&#xFF0C;</p><h3 id="articleHeader2"><strong>&#x7B2C;&#x4E09;&#x4EE3;&#x7F51;&#x7EDC;&#x5E03;&#x5C40;&#x7CFB;&#x7EDF;flex</strong>&#x3002;</h3><p>&#x200B; flex&#x7684;&#x5E94;&#x7528;&#x6709;&#x4E24;&#x4E2A;&#x7B80;&#x5355;&#x5230;&#x8BA9;&#x4EBA;&#x53D1;&#x6307;&#x7684;&#x5730;&#x65B9;</p><h4>&#x7B2C;&#x4E00;&#x4E2A;&#xFF0C;&#x5143;&#x7D20;&#x5782;&#x76F4;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x3002;</h4><p>&#x200B;&#x770B;&#x8FD9;&#x91CC;&#xFF0C;&#x770B;&#x8FD9;&#x91CC;&#xFF0C;&#x7785;&#x54EA;&#x5462;&#xFF0C;&#x770B;&#x56FE;!<span class="img-wrap"><img data-src="/img/bVbenXm?w=621&amp;h=862" src="https://static.alili.tech/img/bVbenXm?w=621&amp;h=862" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5927;&#x5BB6;&#x770B; &#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;APP &#x7528;css&#x5E03;&#x5C40;&#x5B9E;&#x73B0;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x7EDF;&#x7684;&#x5DE6;&#x53F3;&#x56FE;&#x6807; &#x5206;&#x522B;float&#x5411;&#x4E24;&#x4FA7;&#xFF0C;&#x90A3;&#x4E48;&#x4E2D;&#x95F4;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x56FE;&#x6807;&#x7B49;&#x8DDD;&#x5C45;&#x4E2D;&#x662F;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x7ED9;&#x5BBD;&#x5EA6;&#x6216;&#x8005;&#x4E0D;&#x7ED9;&#x5BBD;&#x5EA6;&#x90FD;&#x4E0D;&#x597D;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x4E0D;&#x4EC5;&#x8003;&#x8651;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x4E0D;&#x5360;&#x7A7A;&#x95F4;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5360;&#x4F4D;&#xFF0C;&#x53C8;&#x6D89;&#x53CA;&#x5230;&#x5DE6;&#x8FB9;&#x95F4;&#x8DDD;&#x548C;&#x5782;&#x76F4;&#x95F4;&#x8DDD;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x8981;&#x4FDD;&#x8BC1;&#x4E0D;&#x540C;&#x5206;&#x8FA8;&#x7387;&#x5C4F;&#x5E55;&#x4E0B;&#x6C38;&#x8FDC;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x90FD;&#x5728;&#x90A3;&#x4E2A;&#x4F4D;&#x7F6E;&#x5C31;&#x5FC5;&#x987B;&#x4F7F;&#x7528; rem&#x5E03;&#x5C40;+js&#x52A8;&#x6001;&#x8BA1;&#x7B97;&#xFF0C;rem&#x53C8;&#x8981;&#x8003;&#x8651;&#x89C6;&#x7F51;&#x819C;&#x5C4F;&#xFF0C;&#x5927;&#x5BB6;&#x5FC3;&#x91CC;&#x60F3;&#x9A82;&#x5A18;&#x4E86;&#xFF0C;&#x6211;&#x7279;&#x4E48;&#x5C31;&#x60F3;&#x8BA9;&#x51E0;&#x4E2A;&#x56FE;&#x6807;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x6C34;&#x5E73;&#x6709;&#x95F4;&#x8DDD;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5C4F;&#x5E55;&#x4E0A;&#x4E00;&#x6837;&#x3002;&#x600E;&#x4E48;&#x7279;&#x4E48;&#x90A3;&#x4E48;&#x8D39;&#x4E8B;&#x3002;&#x8FD8;&#x597D;&#x6211;&#x4EEC;&#x6709;flex&#x5E03;&#x5C40;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#toolbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-id">#toolbar</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: space-between;
}</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x4E24;&#x4E2A;&#x56FE;&#x6807;&#x89C4;&#x89C4;&#x77E9;&#x77E9;&#x7684;&#x5404;&#x81EA;&#x9760;&#x8FB9;&#x5360;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#iconTool {
    display: flex;
    justify-content: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-id">#iconTool</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre><p>&#x6CA1;&#x6BDB;&#x75C5;&#xFF0C;&#x4E2D;&#x95F4;&#x90E8;&#x5206;&#x89C4;&#x89C4;&#x77E9;&#x4E2D;&#x5206;&#x4E86;&#x3002;</p><p>&#x4E0D;&#x7528;&#x5B66;&#x5F88;&#x591A;&#x6CA1;&#x7528;&#x7684;&#x4E1C;&#x897F;&#x5927;&#x5BB6;&#x5C31;&#x8BB0;&#x4F4F;&#x7236;&#x5143;&#x7D20;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#toolbar{
    display: flex;
    align-items: center;//&#x8FD9;&#x4E2A;&#x8D1F;&#x8D23;&#x7EB5;&#x5411;&#x5C45;&#x4E2D;
    justify-content: space-between;//&#x8FD9;&#x4E2A;&#x8D1F;&#x8D23;&#x6A2A;&#x5411;&#x5C45;&#x4E2D;&#x6216;&#x8005;&#x4E24;&#x8FB9;&#x7AD9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-selector-id">#toolbar</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;<span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x8D1F;&#x8D23;&#x7EB5;&#x5411;&#x5C45;&#x4E2D;</span>
    <span class="hljs-attribute">justify-content</span>: space-between;<span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x8D1F;&#x8D23;&#x6A2A;&#x5411;&#x5C45;&#x4E2D;&#x6216;&#x8005;&#x4E24;&#x8FB9;&#x7AD9;</span>
}</code></pre><p>&#x6211;&#x60F3;&#x8BA9;#iconTool &#x5360;&#x6EE1;&#x9664;&#x4E86;&#x4E24;&#x4E2A;&#x56FE;&#x6807;&#x4E4B;&#x5916;&#x7684;&#x7A7A;&#x95F4;&#x548B;&#x529E;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-grow:1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">flex-grow</span>:<span class="hljs-number">1</span>;</code></pre><p>&#x6709;&#x540C;&#x5B66;&#x4F1A;&#x8BF4;&#x8001;&#x5E08;&#x4E3A;&#x5565;&#x4E0D;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex:1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;</code></pre><p>&#x4F60;&#x7528;&#x4E2A;&#x5C41;&#x7528;&#x554A;&#xFF0C;&#x4F60;&#x5C31;&#x662F;&#x60F3;&#x592A;&#x591A;&#x4E86;&#xFF0C;flex&#x91CC;&#x9762;&#x5305;&#x542B;flex-grow&#x3001;flex-shrink&#x3001;flex-basis &#xFF0C;&#x4F60;&#x60F3;&#x628A;&#x81EA;&#x5DF1;&#x641E;&#x6655;&#x5417;&#xFF1F;</p><p>&#x522B;&#x6574;&#x6CA1;&#x7528;&#x7684;&#xFF0C;&#x5C31;&#x8BB0;&#x4F4F;&#x521A;&#x624D;&#x90A3;&#x4E24;&#x4E2A;&#x8D27;&#xFF0C;&#x4F60;flex&#x5E03;&#x5C40;&#x5927;&#x90E8;&#x5206;&#x95EE;&#x9898;&#x90FD;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x4F60;&#x518D;google,&#x522B;&#x52A8;&#x4E0D;&#x52A8;&#x5C31;&#x60F3;&#x5927;&#x800C;&#x5168;&#x7684;&#x5B66;&#x4E1C;&#x897F;&#xFF0C;&#x5230;&#x65F6;&#x5019;&#x5565;&#x90FD;&#x4E0D;&#x4F1A;&#x3002;</p><h4><strong>&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;&#x201C;&#x8C46;&#x8150;&#x5757;&#x201D;&#x5E03;&#x5C40;&#x3002;</strong></h4><p>&#x76F4;&#x63A5;&#x770B;&#x56FE;!<br><span class="img-wrap"><img data-src="/img/bVbenXv?w=732&amp;h=1000" src="https://static.alili.tech/img/bVbenXv?w=732&amp;h=1000" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5927;&#x5BB6;&#x770B;&#x6211;&#x7EA2;&#x5708;&#x5708;&#x8D77;&#x6765;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x6BCF;&#x4E00;&#x4E2A;app&#x90FD;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x7684;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x53EF;&#x6076;&#x5FC3;&#x4E86;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x5DE6;&#x8FB9;&#x53F3;&#x8FB9;&#x95F4;&#x8DDD;&#x4E0D;&#x4E00;&#x6837;&#x4E86;&#xFF0C;&#x6216;&#x8005;&#x5DE6;&#x8FB9;&#x53F3;&#x8FB9;&#x8981;&#x8FB9;&#xFF0C;&#x4E2D;&#x95F4;&#x53C8;&#x53EA;&#x8981;&#x4E00;&#x4E2A;&#x8FB9;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E24;&#x4E2A;&#x8FB9;&#xFF0C;&#x7528;first-child &#x548C;last-child &#x9009;&#x62E9;&#x5668;&#x8FD8;&#x8981;&#x8003;&#x8651;&#x517C;&#x5BB9;&#x3002;&#x53E6;&#x5916;&#x8FD8;&#x8981;&#x4F7F;&#x7528;box-sizing,&#x91CC;&#x9762;&#x7684;&#x56FE;&#x7247;&#x4E0D;&#x540C;&#x8BBE;&#x5907;&#x5BBD;&#x9AD8;&#x6BD4;&#x4F8B;&#x53C8;&#x4E0D;&#x5BF9;&#x4E86;&#xFF0C;&#x53CD;&#x6B63;&#x600E;&#x4E48;&#x641E;&#x90FD;&#x7279;&#x4E48;&#x4E0D;&#x723D;&#x3002;&#x8FD8;&#x5F97;&#x56FE;&#x7247;&#x8DDF;&#x6587;&#x5B57;&#x4E5F;&#x5F97;&#x5C45;&#x4E2D;&#xFF0C;&#x8001;&#x5E08;&#x60F3;&#x60F3;&#x5C31;&#x5F97;&#x5305;&#x5F88;&#x591A;&#x5C42;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x8FD8;&#x5F97;&#x7528;dl dd&#xFF0C;&#x522B;&#x60F3;&#x592A;&#x591A;&#xFF0C;&#x770B;&#x6211;&#x600E;&#x4E48;&#x505A;&#x3002;&#x73B0;&#x5728;&#x6211;&#x5C31;&#x544A;&#x8BC9;&#x4F60;&#x4E00;&#x4E2A;&#x597D;&#x65B9;&#x6CD5;&#x89E3;&#x653E;&#x519B;&#x53D4;&#x53D4;&#x6765;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x6211;&#x600E;&#x4E48;&#x641E;&#xFF0C;&#x5176;&#x5B9E;&#x7B80;&#x5355;&#x7684;&#x53C8;&#x8BA9;&#x4EBA;&#x53D1;&#x6307;&#x4E86;&#x3002;&#x6211;&#x5DF2;&#x6700;&#x4E0A;&#x9762;&#x7684;&#x4ECA;&#x65E5;&#x63A8;&#x8350;&#x90E8;&#x5206;&#x4E3E;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#recommend-items {
    display: flex;
    justify-content: space-around;//&#x6A2A;&#x5411;&#x5B50;&#x5143;&#x7D20;&#x6392;&#x5217;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0D;&#x7528;&#x8BB0;&#x4F4F;&#xFF0C;&#x7528;&#x7684;&#x65F6;&#x5019;&#x8BD5;&#x8BD5;&#x5C31;OK
    border-bottom: 1px solid #eee;
}
#recommend-items .item {
    flex-grow: 1;
    text-align: center;
    display: flex;
    flex-direction: column;//&#x5B50;&#x5143;&#x7D20;&#x7EB5;&#x5411;&#x6392;&#x5217;
    align-items: center;
    justify-content: center;
    height: 0.93rem;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-selector-id">#recommend-items</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-around;<span class="hljs-comment">//&#x6A2A;&#x5411;&#x5B50;&#x5143;&#x7D20;&#x6392;&#x5217;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0D;&#x7528;&#x8BB0;&#x4F4F;&#xFF0C;&#x7528;&#x7684;&#x65F6;&#x5019;&#x8BD5;&#x8BD5;&#x5C31;OK</span>
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-id">#recommend-items</span> <span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;<span class="hljs-comment">//&#x5B50;&#x5143;&#x7D20;&#x7EB5;&#x5411;&#x6392;&#x5217;</span>
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.93rem</span>;
}</code></pre><p>&#x522B;&#x7785;&#x4E86;&#xFF0C;&#x770B;&#x6211;&#x751F;&#x6D3B;&#x4E0D;&#x8981;&#x592A;&#x7F8E;&#x597D;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x9E1F;&#x4E86;&#xFF0C;&#x4F60;&#x89C9;&#x5F97;&#x8FD9;&#x6837;&#x5C31;&#x591F;&#x4E86;&#x5417;&#xFF1F;&#x663E;&#x7136;&#x4E0D;&#x662F;&#xFF0C;</p><h3 id="articleHeader3">&#x725B;&#x63B0;666&#x7684;&#x7B2C;&#x56DB;&#x4EE3;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x7CFB;&#x7EDF;&#x6765;&#x4E86;&#x3002;</h3><p>&#x6709;&#x540C;&#x5B66;&#x8BF4;&#x8001;&#x5E08;&#x8FD9;&#x4E2A;&#x4E0D;&#x633A;&#x597D;&#x5417;&#xFF1F;&#x597D;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#xFF0C;&#x6CA1;&#x6709;&#x65E0;&#x7F18;&#x65E0;&#x6545;&#x7684;&#x7231;&#x4E5F;&#x6CA1;&#x6709;&#x65E0;&#x7F18;&#x65E0;&#x6545;&#x7684;&#x6068;&#x3002;&#x7FFB;&#x8BD1;&#x6210;&#x6280;&#x672F;&#x7684;&#x8BDD;&#x5C31;&#x662F;&#xFF0C;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x5C31;&#x4E0D;&#x4F1A;&#x6709;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;&#x6280;&#x672F;&#x662F;&#x4E3A;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x670D;&#x52A1;&#x7684;&#xFF0C;flex&#x5E03;&#x5C40;&#x80AF;&#x5B9A;&#x53D8;&#x6210;&#x6002;&#x86CB;&#x624D;&#x4F1A;&#x53D1;&#x660E;&#x66F4;&#x725B;&#x63B0;&#x7684;&#x73A9;&#x610F;&#x3002;&#x6211;&#x4EEC;&#x770B;&#x8FD9;&#x6837;&#x4E00;&#x79CD;&#x60C5;&#x51B5;:</p><p><span class="img-wrap"><img data-src="/img/bVbenXc?w=734&amp;h=754" src="https://static.alili.tech/img/bVbenXc?w=734&amp;h=754" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5927;&#x5BB6;&#x770B;&#x8FD9;&#x4E48;&#x4E2A;&#x7834;&#x73A9;&#x610F;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x624B;&#x673A;&#x6DD8;&#x5B9D;APP&#x91CC;&#x9762;&#x7684;&#x4E00;&#x4E2A;&#x5E03;&#x5C40;&#xFF0C;&#x522B;&#x770B;&#x59B9;&#x5B50;&#xFF0C;&#x770B;&#x6211;&#xFF0C;&#x6211;&#x4E0D;&#x60F3;&#x58A8;&#x8FF9;&#x54B1;&#x4EEC;&#x770B;&#x770B;flex&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#xFF0C;&#x4F60;&#x4E0D;&#x662F;&#x725B;&#x63B0;&#x4E48;&#xFF0C;&#x770B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;&#x5927;&#x5F6C;&#x54E5;666&lt;/title&gt;
    &lt;style&gt;
        /** &#x5B9E;&#x6218;&#x7248; **/
        .flex-item {
            background: #f55;
            text-align: center;
            vertical-align: middle;
        }

        .wrap-box {
            display: flex;
            width: 500px;
            border: 1px solid #abc;
            margin-bottom: 10px;
            margin-left: 10px;
        }

        .flex-inner {
            display: flex;
            flex-grow: 1;
        }

        .flex-item {
            flex-grow: 1;
            font-size: 0;
            position: relative;
        }

        .wrap-6 {
            /* -webkit-box-orient: horizontal; */
        }

        .wrap-6 .flex-inner {
            display: flex;
            flex-direction: column;
        }

        .wrap-6 .flex-inner:first-child {
            width: 66.6%;
        }

        .wrap-6 .flex-inner:last-child {
            width: 33.3%;
        }

        .wrap-6 .flex-item {
            padding-top: 100%;
        }

        .wrap-6 .flex-box2 .flex-item {
            padding-top: 50%;
        }

        .wrap-6 .flex-box2 {
            display: flex;
        }

        .wrap-6 .flex-inner:first-child,
        .wrap-6 .flex-box2 .flex-item:first-child {
            margin-right: 1px;
        }

        .wrap-6 .flex-box1,
        .wrap-6 .flex-inner:last-child .flex-item:first-child,
        .wrap-6 .flex-inner:last-child .flex-item:nth-child(2) {
            margin-bottom: 1px;
        }

        img {
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class=&quot;wrap-box wrap-6&quot;&gt;
        &lt;div class=&quot;flex-inner&quot;&gt;
            &lt;div class=&quot;flex-box1 flex-item&quot;&gt;
                &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
            &lt;/div&gt;
            &lt;div class=&quot;flex-box2&quot;&gt;
                &lt;div class=&quot;flex-item&quot;&gt;
                    &lt;img src=&quot;img/2.jpg&quot; alt=&quot;&quot;&gt;

                &lt;/div&gt;
                &lt;div class=&quot;flex-item&quot;&gt;
                    &lt;img src=&quot;img/3.jpg&quot; alt=&quot;&quot;&gt;

                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;flex-inner&quot;&gt;
            &lt;div class=&quot;flex-item&quot;&gt;
                &lt;img src=&quot;img/4.jpg&quot; alt=&quot;&quot;&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex-item&quot;&gt;
                &lt;img src=&quot;img/5.jpg&quot; alt=&quot;&quot;&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex-item&quot;&gt;
                &lt;img src=&quot;img/6.jpg&quot; alt=&quot;&quot;&gt;

            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x5927;&#x5F6C;&#x54E5;666<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-comment">/** &#x5B9E;&#x6218;&#x7248; **/</span>
        <span class="hljs-selector-class">.flex-item</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f55</span>;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">vertical-align</span>: middle;
        }

        <span class="hljs-selector-class">.wrap-box</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#abc</span>;
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
        }

        <span class="hljs-selector-class">.flex-inner</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
        }

        <span class="hljs-selector-class">.flex-item</span> {
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-selector-class">.wrap-6</span> {
            <span class="hljs-comment">/* -webkit-box-orient: horizontal; */</span>
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">flex-direction</span>: column;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span><span class="hljs-selector-pseudo">:first-child</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">66.6%</span>;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span><span class="hljs-selector-pseudo">:last-child</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">33.3%</span>;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-item</span> {
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-box2</span> <span class="hljs-selector-class">.flex-item</span> {
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">50%</span>;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-box2</span> {
            <span class="hljs-attribute">display</span>: flex;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span><span class="hljs-selector-pseudo">:first-child</span>,
        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-box2</span> <span class="hljs-selector-class">.flex-item</span><span class="hljs-selector-pseudo">:first-child</span> {
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">1px</span>;
        }

        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-box1</span>,
        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span><span class="hljs-selector-pseudo">:last-child</span> <span class="hljs-selector-class">.flex-item</span><span class="hljs-selector-pseudo">:first-child</span>,
        <span class="hljs-selector-class">.wrap-6</span> <span class="hljs-selector-class">.flex-inner</span><span class="hljs-selector-pseudo">:last-child</span> <span class="hljs-selector-class">.flex-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1px</span>;
        }

        <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wrap-box wrap-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-inner&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-box1 flex-item&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-box2&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/2.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>

                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/3.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>

                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-inner&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-item&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/4.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-item&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/5.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-item&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/6.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8001;&#x5B9E;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x8BA9;&#x4E00;&#x4E9B;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005; &#x5728;&#x7528;flex&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x5E03;&#x5C40;&#x548C;&#x95FB;&#x5927;&#x5F6C;&#x54E5;&#x7684;&#x9999;&#x4E4B;&#x95F4;&#x505A;&#x4E2A;&#x9009;&#x62E9;&#x7684;&#x8BDD;&#xFF0C;&#x5F88;&#x591A;&#x5F00;&#x53D1;&#x8005;&#x4F30;&#x8BA1;&#x4F1A;</p><p>&#x75DB;&#x5FEB;&#x7684;&#x8BF4;&#x613F;&#x95FB;&#x5176;&#x8BE6;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x95FB;&#x7684;&#x8BDD;&#xFF0C;&#x81EA;&#x5DF1;&#x53EF;&#x80FD;&#x5361;&#x51FA;&#x9999;&#x6765;&#x3002;</p><p>&#x4E0D;&#x662F;flex &#x6002;&#x86CB;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x4EBA;&#x5BB6;&#x5C31;&#x662F;&#x548C;&#x4E00;&#x7EF4;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x4E8C;&#x7EF4;&#x5C31;&#x5E9F;&#x4E86;&#x3002;&#x7FFB;&#x8BD1;&#x6210;&#x4EBA;&#x8BDD;&#x5C31;&#x662F;flex&#x5E03;&#x5C40;&#x9002;&#x5408;&#x4E00;&#x4E2A;&#x65B9;&#x5411;&#x5E03;&#x5C40;&#xFF0C;&#x540C;&#x65F6;&#x8981;&#x641E;&#x6A2A;&#x5411;&#x548C;&#x7EB5;&#x5411;&#x5C31;&#x641E;&#x4E0D;&#x52A8;&#x4E86;&#x3002;&#x6709;&#x4E9B;&#x4EBA;&#x8BF4;flex&#x5E03;&#x5C40;&#x548C;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5185;&#x5BB9;&#x4F18;&#x5148;&#x548C;&#x5E03;&#x5C40;&#x4F18;&#x5148;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x8981;&#x5FCD;&#x4E0D;&#x4F4F;&#x5410;&#x69FD;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5B66;&#x6280;&#x672F;&#x662F;&#x4E3A;&#x4E86;&#x5E94;&#x7528;&#x5230;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x5DE5;&#x4F5C;&#x4F60;&#x5403;&#x5565;&#xFF0C;&#x6CA1;&#x6709;&#x5DE5;&#x4F5C;&#x4E86;&#x4F60;&#x7A7F;&#x5565;&#xFF0C;&#x5403;&#x7A7F;&#x90FD;&#x6CA1;&#x4E86;&#x4F60;&#x8FD8;&#x81ED;&#x561A;&#x745F;&#x5565;&#xFF1F;&#x4F60;&#x77E5;&#x9053;&#x4E0D;&#x77E5;&#x9053;&#x5185;&#x5BB9;&#x4F18;&#x5148;&#x548C;&#x5E03;&#x5C40;&#x4F18;&#x5148;&#x5BF9;&#x80FD;&#x591F;&#x66F4;&#x5FEB;&#x66F4;&#x597D;&#x7684;&#x5E03;&#x5C40;&#x5B8C;&#x6D3B;&#x513F;&#x6CA1;&#x6709;&#x534A;&#x6BDB;&#x94B1;&#x5173;&#x7CFB;&#xFF0C;&#x7A0B;&#x5E8F;&#x5458;&#x5934;&#x53D1;&#x5DF2;&#x7ECF;&#x591F;&#x5C11;&#x4E86;&#xFF0C;&#x5C11;&#x5B66;&#x70B9;&#x6CA1;&#x7528;&#x7684;&#x4E1C;&#x897F;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbenXX?w=750&amp;h=427" src="https://static.alili.tech/img/bVbenXX?w=750&amp;h=427" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h4>&#x90A3;&#x4E48;&#x5C31;&#x5F00;&#x59CB;&#x770B;&#x770B;&#x7B2C;&#x56DB;&#x4EE3;&#x7F51;&#x7EDC;&#x5E03;&#x5C40;&#x795E;&#x5947;grid&#x5E03;&#x5C40;&#x7684;&#x5F3A;&#x5927;&#x4E4B;&#x5904;&#x3002;</h4><p>&#x7F51;&#x4E0A;&#x6709;&#x4E9B;&#x6587;&#x7AE0;&#x7C7B;&#x4F3C;&#x4E8E;5&#x5206;&#x949F;&#x5B66;&#x4F1A; CSS Grid &#x5E03;&#x5C40;&#x4E4B;&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x8FD9;&#x4E9B;&#x6587;&#x7AE0;&#x5165;&#x95E8;&#x633A;&#x597D;&#x7684;&#x4F46;&#x662F;&#x8981;&#x60F3;&#x770B;&#x5B8C;&#x8FD9;&#x4E2A;&#x6587;&#x7AE0;5&#x5206;&#x949F;&#x5C31;&#x80FD;&#x591F;&#x5DE5;&#x4F5C;&#x4E2D;&#x7528;&#x8FD8;&#x662F;&#x6709;&#x70B9;&#x8D39;&#x52B2;&#x7684;&#x3002;&#x6211;&#x53C8;&#x4E0D;&#x662F;&#x5927;&#x81EA;&#x7136;&#x7684;&#x642C;&#x8FD0;&#x5DE5;&#xFF0C;&#x80FD;&#x641C;&#x5230;&#x7684;&#x4E1C;&#x897F;&#x6211;&#x5C31;&#x4E0D;&#x8BB2;&#x4E86;&#xFF0C;&#x54B1;&#x4EEC;&#x4E0D;&#x58A8;&#x8FF9;&#x76F4;&#x63A5;&#x5C31;&#x4E0A;&#x6765;&#x4E00;&#x68AD;&#x5B50;&#x4EE3;&#x7801;&#x770B;&#x770B;&#x521A;&#x624D;&#x7684;&#x5B9E;&#x9645;&#x624B;&#x6DD8;&#x5E03;&#x5C40;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;style&gt;
    * {
        margin: 0;
        padding: 0;
    }

    .wrapper {
        display: grid;
        width: 500px;
        height: 500px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 1px;
    }

    .item1 {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
    }
    img{
        width: 100%;
        max-height: 100%;
    }
    
&lt;/style&gt;

&lt;body&gt;
    &lt;div class=&quot;wrapper&quot;&gt;
        &lt;div class=&quot;item1&quot; style=&quot;background: red&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item2&quot; style=&quot;background: orange&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item3&quot; style=&quot;background: yellow&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item4&quot; style=&quot;background: green&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item5&quot; style=&quot;background: aqua&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;item6&quot; style=&quot;background: blue&quot;&gt;
            &lt;img src=&quot;img/1.jpg&quot; alt=&quot;&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.wrapper</span> {
        <span class="hljs-attribute">display</span>: grid;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
        <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
        <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.item1</span> {
        <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
        <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
    }
    <span class="hljs-selector-tag">img</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100%</span>;
    }
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wrapper&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item1&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: red&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item2&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: orange&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item3&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: yellow&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item4&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: green&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item5&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: aqua&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item6&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background: blue&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;img/1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6709;&#x540C;&#x5B66;&#x8BF4; &#x8001;&#x5E08;&#x4F60;&#x4E0D;&#x8BB2;&#x8BB2;&#x8FD9;&#x73A9;&#x610F;&#xFF0C;</p><p>&#x53EA;&#x8BB2;&#x4E24;&#x70B9;&#xFF0C;&#x7B2C;&#x4E00;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
        display: grid;
        width: 500px;
        height: 500px;
        grid-template-columns: 1fr 1fr 1fr;//&#x4F60;&#x628A;&#x4ED6;&#x7406;&#x89E3;&#x6210;&#x8DDF;&#x50CF;&#x7D20;&#x4E00;&#x6837;&#x7684;&#x5355;&#x4F4D;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 1px;
    }

    .item1 {
        grid-column: 1 / 3;//&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x4E09;&#x5206;&#x4E4B;&#x4E00; &#x662F;&#x7B2C;&#x4E00;&#x6761;&#x7EBF;&#x5230;&#x7B2C;&#x4E09;&#x6761;&#x7EBF;
        grid-row: 1 / 3;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-selector-class">.wrapper</span> {
        <span class="hljs-attribute">display</span>: grid;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        grid-template-<span class="hljs-attribute">columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;<span class="hljs-comment">//&#x4F60;&#x628A;&#x4ED6;&#x7406;&#x89E3;&#x6210;&#x8DDF;&#x50CF;&#x7D20;&#x4E00;&#x6837;&#x7684;&#x5355;&#x4F4D;</span>
        grid-template-rows: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
        grid-gap: <span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.item1</span> {
        grid-column: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x4E0D;&#x662F;&#x4E09;&#x5206;&#x4E4B;&#x4E00; &#x662F;&#x7B2C;&#x4E00;&#x6761;&#x7EBF;&#x5230;&#x7B2C;&#x4E09;&#x6761;&#x7EBF;</span>
        grid-row: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
    }</code></pre><p>&#x7B2C;&#x4E8C;&#x70B9;&#xFF0C;<strong>&#x4ED6;&#x5F88;&#x7B80;&#x5355;</strong>&#x5343;&#x4E07;&#x522B;&#x60F3;&#x592A;&#x590D;&#x6742;&#x8BF4;&#x4EC0;&#x4E48;&#x6211;&#x8981;&#x597D;&#x597D;&#x5B66;&#x5B66;&#xFF0C;&#x7CFB;&#x7EDF;&#x5B66;&#x5B66;&#xFF0C;&#x5B66;&#x4F60;&#x59B9;&#x554A;&#xFF0C;&#x62FF;&#x8D77;&#x6765;&#x5C31;&#x7528;&#x522B;&#x6709;&#x70B9;&#x65B0;&#x4E1C;&#x897F;&#x5C31;&#x4E8B;&#x513F;&#x4E8B;&#x513F;&#x7684;&#x60F3;&#x5927;&#x5757;&#x65F6;&#x95F4;&#x5B66;&#xFF0C;&#x5230;&#x6700;&#x540E;&#x4E5F;&#x6CA1;&#x5B66;&#xFF0C;&#x522B;&#x60F3;&#x4E86;&#xFF0C;&#x62FF;&#x8D77;&#x952E;&#x76D8;&#x5C31;&#x662F;&#x5E72;&#x5C31;&#x5BF9;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x540C;&#x5B66;&#x4F1A;&#x8BF4;&#xFF0C;&#x8001;&#x5E08;&#x4F60;&#x778E;&#x5FFD;&#x60A0;&#xFF0C;flex&#x548C;grid&#x90FD;&#x662F;&#x65B0;&#x6280;&#x672F;&#xFF0C;&#x4ED6;&#x4EEC;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x8C01;&#x66FF;&#x4EE3;&#x8C01;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x544A;&#x8BC9;&#x4F60;&#xFF0C;&#x4F60;&#x8BF4;&#x7684;&#x6CA1;&#x9519;&#x751A;&#x81F3;table&#x5E03;&#x5C40;&#x662F;&#x521D;&#x4EE3;&#x5E03;&#x5C40;&#x7CFB;&#x7EDF;&#x4E5F;&#x6709;&#x5546;&#x69B7;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x4EBA;&#x89C9;&#x5F97;&#x4ECE;&#x7B2C;&#x4E00;&#x4E2A;&#x7F51;&#x9875;&#x51FA;&#x6765;&#x90A3;&#x4E2A;&#x662F;&#x7B2C;&#x4E00;&#x4EE3;&#x3002;&#x6211;&#x60F3;&#x8BF4;&#x7684;&#x662F;&#x4E0D;&#x7BA1;&#x600E;&#x4E48;&#x5206;&#xFF0C;&#x4F60;&#x80FD;&#x8BF4;&#x7684;&#x5F88;&#x6709;&#x9053;&#x7406;&#x5C31;&#x884C;&#xFF0C;&#x6709;&#x81EA;&#x5DF1;&#x601D;&#x8003;&#x5728;&#x91CC;&#x9762;&#x5C31;&#x884C;&#xFF0C;&#x522B;&#x8DDF;&#x522B;&#x4EBA;&#x5C41;&#x80A1;&#x540E;&#x9762;&#x4EBA;&#x5BB6;&#x8BF4;&#x5565;&#x4F60;&#x8DDF;&#x7740;&#x8DD1;&#xFF0C;&#x5BF9;&#x4E86;&#x5185;&#x4E2A;&#x8BCD;&#x513F;&#x53EB;&#x4EBA;&#x4E91;&#x4EA6;&#x4E91;&#x5C31;&#x884C;&#x3002;&#x800C;&#x7B2C;&#x56DB;&#x4EE3;&#x5E03;&#x5C40;&#x7CFB;&#x7EDF;&#x4E5F;&#x662F;&#x6211;&#x603B;&#x7ED3;&#x51FA;&#x6765;&#x7684;&#x4E3A;&#x4EC0;&#x4E48;&#x4ED6;&#x662F;&#x7B2C;&#x56DB;&#x4EE3;&#xFF0C;&#x800C;flex&#x662F;&#x7B2C;&#x4E09;&#x4EE3;&#x5462;&#xFF1F;</p><p>&#x539F;&#x56E0;&#xFF1A;</p><p>1.flex&#x5BF9;&#x6807;&#x7684;&#x662F;float&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x8FD8;&#x662F;&#x4E00;&#x7EF4;&#x5E03;&#x5C40;&#xFF0C;&#x8FD9;&#x5C31;&#x8DDF;&#x522B;&#x4EBA;&#x5F00;&#x7740;&#x590F;&#x5229;&#xFF0C;&#x4F60;&#x5F00;&#x5954;&#x9A70;&#x90FD;&#x662F;&#x5730;&#x9762;&#x4E0A;&#x8DD1;&#x6CA1;&#x5565;&#x672C;&#x8D28;&#x533A;&#x522B;&#x4E00;&#x6837;&#x3002;&#x4F46;&#x662F;grid&#x5347;&#x7EF4;&#x4E86;&#xFF0C;grid&#x662F;&#x98DE;&#x673A;&#xFF0C;&#x5728;&#x5730;&#x9762;&#x9A6C;&#x8DEF;&#x8FD9;&#x6761;&#x7EBF;&#x4E00;&#x7EF4;&#x4E4B;&#x4E0A;&#x8BA9;&#x4EBA;&#x80FD;&#x591F;&#x601D;&#x8003;&#x9AD8;&#x5EA6;&#x8FD9;&#x4E2A;&#x7EF4;&#x5EA6;&#xFF0C;&#x4EE5;&#x524D;&#x662F;&#x6C7D;&#x8F66;&#x4E00;&#x7EF4;&#x4EA4;&#x901A;&#x5DE5;&#x5177;&#xFF08;&#x4F60;&#x53EA;&#x53EA;&#x80FD;&#x5728;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x7684;&#x4EBA;&#x4E00;&#x4E2A;&#x65B9;&#x5411;&#x5F00;&#xFF09;&#xFF0C;&#x98DE;&#x673A;&#x662F;&#x4E8C;&#x7EF4;&#xFF08;&#x80FD;&#x4FEF;&#x51B2;&#x4E86;&#xFF08;&#x6A2A;&#x5411;&#x3001;&#x7EB5;&#x5411;&#x540C;&#x65F6;&#xFF09;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;grid&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x62D3;&#x5BBD;&#x4E86;css&#x5E03;&#x5C40;&#x7684;&#x7EF4;&#x5EA6;&#xFF0C;&#x4E0D;&#x6392;&#x9664;&#x5C06;&#x6765;&#x4F1A;&#x6709;&#x4E09;&#x7EF4;&#x5E03;&#x5C40;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x80FD;css&#x63A7;&#x5236; &#x6A2A;&#x5411;&#x5E03;&#x5C40;&#xFF0C;&#x7EB5;&#x5411;&#x5E03;&#x5C40;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6DF1;&#x5EA6;&#x5E03;&#x5C40;&#xFF08;&#x8FD9;&#x4E2A;&#x8981;&#x4F9D;&#x8D56;&#x4E8E;&#x4E09;&#x7EF4;&#x5C55;&#x793A;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x5982;VR&#xFF0C;AR&#x4E09;&#x7EF4;&#x7ACB;&#x4F53;&#x7684;&#x5C55;&#x793A;&#x8BBE;&#x5907;&#x51FA;&#x73B0;&#xFF09;&#x3002;</p><p>2.grid&#x5E03;&#x5C40;&#x91CC;&#x9762;&#x91C7;&#x7528;&#x4E86;&#x201C;&#x53EF;&#x89C6;&#x5316;&#x5E03;&#x5C40;&#xFF08;template&#x90E8;&#x5206;&#xFF0C;&#x6240;&#x89C1;&#x5373;&#x6240;&#x5F97;&#xFF09;&#x201D;&#xFF0C;&#x8FD9;&#x4E2A;&#x98A0;&#x8986;&#x4E86;&#x4F20;&#x7EDF;&#x7684;&#xFF0C;&#x5199;&#x4E00;&#x53E5;&#x4EE3;&#x7801;&#x5237;&#x4E00;&#x4E0B;&#x6D4F;&#x89C8;&#x5668;&#x8FD9;&#x6837;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0D;&#x6392;&#x9664;&#x4EE5;&#x540E;&#x4F1A;&#x51FA;&#x73B0;&#x4EE3;&#x7801;&#x5373;&#x6548;&#x679C;&#x7684;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x3002;&#x6BD4;&#x5982;&#x4F60;&#x518D;&#x4E00;&#x4E2A;&#x8BBE;&#x5907;&#x4E0A;&#x753B;&#x4E00;&#x4E2A;&#x533A;&#x57DF;&#xFF0C;&#x7136;&#x540E;&#x753B;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;</p><p>&#x7C7B;&#x4F3C;&#x4E8E;vc++&#x63A7;&#x4EF6;&#x4F46;&#x662F;&#x66F4;&#x667A;&#x80FD;&#xFF0C;&#x66F4;&#x53CB;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x3002;&#x8C01;&#x8BF4;&#x4E0D;&#x53EF;&#x80FD;&#x5462;&#xFF0C;&#x5927;&#x5BB6;&#x4E0D;&#x8981;&#x5FD8;&#x4E86;grid&#x5E03;&#x5C40;&#x7684;&#x6765;&#x6E90;&#x662F;&#x65E9;&#x5C31;&#x5E9F;&#x5F03;&#x7684;table&#x5E03;&#x5C40;&#x3002;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x591A;&#x8BF4;&#x4E00;&#x53E5;&#x641E;&#x7B11;&#x7684;&#x5FAE;&#x8F6F;&#xFF0C;frontpage&#x6CA1;&#x706B;&#xFF0C;dreamwaver&#x706B;&#x4E86;&#xFF0C;&#x6700;&#x65E9;&#x63D0;&#x51FA;&#x201C;canvas&#x201D;&#x6982;&#x5FF5;&#x7684; VML&#x6CA1;&#x706B;&#xFF0C;&#x6700;&#x540E;html5&#x7684;canvas&#x706B;&#x4E86;&#xFF0C;&#x8FDE;CSS3&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x662F;&#x7531;&#x5FAE;&#x8F6F;&#x521B;&#x5EFA;&#x7684;&#x4E00;&#x4E2A;&#x6A21;&#x5757; &#xFF0C;&#x6700;&#x540E;&#x706B;&#x8D77;&#x6765;&#x5C45;&#x7136;&#x6CA1;&#x4EBA;&#x8BA4;&#x8BC6;&#x4ED6;&#x3002;&#x5FC3;&#x75BC;&#x6211;&#x8F6F;&#x4E00;&#x79D2;&#x949F;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x4E0D;&#x778E;&#x903C;&#x903C;&#x4E86;&#xFF0C;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x672C;&#x6587;&#x4F60;&#x5E94;&#x8BE5;&#x5B66;&#x4F1A;&#x4E00;&#x4E0B;&#x51E0;&#x4E2A;&#x4E1C;&#x897F;&#x3002;</p><p>1.&#x4E86;&#x89E3;&#x7F51;&#x683C;&#x5E03;&#x5C40;&#x7684;&#x53D1;&#x5C55;&#x5386;&#x53F2;&#xFF0C;&#x4EE5;&#x4FBF;&#x5BF9;&#x672A;&#x6765;&#x5E03;&#x5C40;&#x6280;&#x672F;&#x7684;&#x53D1;&#x5C55;&#x6709;&#x4E00;&#x4E2A;&#x5BA2;&#x89C2;&#x7684;&#x5224;&#x65AD;&#x6B63;&#x786E;&#x7684;&#x9009;&#x62E9;&#x662F;&#x5426;&#x5B66;&#x4E60;&#x3002;</p><p>2.&#x5B66;&#x4F1A;&#x4F7F;&#x7528;flex&#x5E03;&#x5C40;&#x5199;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5149;&#x5C31;&#x8BB0;&#x4F4F;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><p>3.&#x5B66;&#x4F1A;&#x4F7F;&#x7528;grid&#x5E03;&#x5C40;&#x5199;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8BF4;&#x6211;&#x627E;&#x65F6;&#x95F4;&#x7814;&#x7A76;&#x7814;&#x7A76;&#x3002;</p><p>4.&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x5199;&#x7684;&#x597D;&#xFF0C;&#x8BB0;&#x5F97;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x7559;&#x8A00;&#x6216;&#x70B9;&#x8D5E;&#xFF0C;&#x56E0;&#x4E3A;&#x4FE1;&#x5F6C;&#x54E5;&#xFF0C;&#x539F;&#x5730;&#x6EE1;&#x8840;&#x590D;&#x6D3B;&#xFF0C;&#x6700;&#x4E3B;&#x8981;&#x662F;&#x771F;&#x7279;&#x4E48;&#x7684;&#x80FD;&#x6DA8;&#x5DE5;&#x8D44;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css布局简史与决胜未来的第四代css布局技术

## 原文链接
[https://segmentfault.com/a/1190000015782763](https://segmentfault.com/a/1190000015782763)

