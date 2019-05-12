---
title: 【资源集合】 ES6 元编程（Proxy & Reflect & Symbol）
hidden: true
categories: [reprint]
slug: '67844063'
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h2>&#x5BFC;&#x8BFB;</h2><p>&#x51E0;&#x5E74;&#x524D; ES6 &#x521A;&#x51FA;&#x6765;&#x7684;&#x65F6;&#x5019;&#x63A5;&#x89E6;&#x8FC7; <strong>&#x5143;&#x7F16;&#x7A0B;</strong>&#xFF08;Metaprogramming&#xFF09;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4E0D;&#x8FC7;&#x5F53;&#x65F6;&#x8FD8;&#x6CA1;&#x6709;&#x6DF1;&#x7A76;&#x3002;&#x4ECA;&#x5929;&#x5728;&#x5E94;&#x7528;&#x548C;&#x5B66;&#x4E60;&#x4E2D;&#x4E0D;&#x65AD;&#x63A5;&#x89E6;&#x5230;&#x8FD9;&#x6982;&#x5FF5;&#xFF0C;&#x6BD4;&#x5982; <a href="https://segmentfault.com/a/1190000015875144#mobx-proxy">mobx 5</a> &#x4E2D;&#x5C31;&#x7528;&#x5230;&#x4E86; Proxy &#x91CD;&#x5199;&#x4E86; Observable &#x5BF9;&#x8C61;&#xFF0C;&#x89C9;&#x5F97;&#x6709;&#x5FC5;&#x8981;&#x68B3;&#x7406;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x3002;</p><p><strong>&#x672C;&#x6587;&#x4E0D;&#x751F;&#x4EA7;&#x4EE3;&#x7801;&#xFF0C;&#x53EA;&#x5F53;&#x4EE3;&#x7801;&#x3001;&#x6587;&#x6863;&#x7684;&#x642C;&#x8FD0;&#x5DE5;</strong>&#x3002;&#x6240;&#x4EE5;&#x672C;&#x6587;&#x5E76;&#x975E;&#x662F;&#x4E00;&#x7BC7;&#x4F20;&#x7EDF;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6559;&#x7A0B;&#xFF0C;&#x66F4;&#x7C7B;&#x4F3C;&#x4E8E; <a href="https://github.com/sindresorhus/awesome" rel="nofollow noreferrer">github awesome</a> &#x8FD9;&#x6837;&#x5217;&#x8868;&#x6587;&#x7AE0;&#x3002;</p><h2>1&#x3001;&#x7406;&#x89E3;&#x5143;&#x7F16;&#x7A0B;</h2><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" rel="nofollow noreferrer">Symbol</a>&#x3001;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect" rel="nofollow noreferrer">Reflect</a> &#x548C; <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer">Proxy</a> &#x662F;&#x5C5E;&#x4E8E; ES6 &#x5143;&#x7F16;&#x7A0B;&#x8303;&#x7574;&#x7684;&#xFF0C;&#x80FD;&#x201C;&#x4ECB;&#x5165;&#x201D;&#x7684;&#x5BF9;&#x8C61;&#x5E95;&#x5C42;&#x64CD;&#x4F5C;&#x8FDB;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5E76;&#x52A0;&#x4EE5;&#x5F71;&#x54CD;&#x3002;&#x5143;&#x7F16;&#x7A0B;&#x4E2D;&#x7684; <strong>&#x5143;</strong> &#x7684;&#x6982;&#x5FF5;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A; <strong>&#x7A0B;&#x5E8F;</strong> &#x672C;&#x8EAB;&#x3002;</p><p>&#x201D;&#x5143;&#x7F16;&#x7A0B;&#x80FD;&#x8BA9;&#x4F60;&#x62E5;&#x6709;&#x53EF;&#x4EE5;&#x6269;&#x5C55;&#x7A0B;&#x5E8F;&#x81EA;&#x8EAB;&#x80FD;&#x529B;&#x201C;&#x3002;&#x8FD9;&#x53E5;&#x8BDD;&#x8FD8;&#x662F;&#x5F88;&#x62BD;&#x8C61;&#xFF0C;&#x521D;&#x5B66;&#x8005;&#x8BE5;&#x600E;&#x4E48;&#x7406;&#x89E3;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4E5F;&#x7406;&#x89E3;&#x4E86;&#x534A;&#x5929;&#xFF0C;&#x60F3;&#x5230;&#x4E86;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><p>&#x5C31;&#x597D;&#x6BD4;&#x4F60;&#x539F;&#x672C;&#x662F;&#x516C;&#x53F8;&#x7684;&#x90E8;&#x95E8;&#x7684;&#x5927;&#x4E3B;&#x7BA1;&#xFF0C;&#x867D;&#x7136;&#x4F60;&#x80FD;&#x529B;&#x5F88;&#x5F3A;&#xFF0C;&#x4F46;&#x4E5F;&#x5FC5;&#x987B;&#x6309;&#x7167;&#x89C4;&#x7AE0;&#x5236;&#x5EA6;&#x505A;&#x4E8B;&#xFF0C;&#x6BD4;&#x5982;&#x65E9;&#x4E0A; 8 &#x70B9;&#x5FC5;&#x987B;&#x5230;&#x516C;&#x53F8;&#xFF0C;&#x5426;&#x5219;&#x4F60;&#x5C31;&#x8981;&#x6263;&#x7EE9;&#x6548;&#xFF1B;&#x800C;&#x540E;&#x6765;&#x516C;&#x53F8;&#x57FA;&#x672C;&#x89C4;&#x5B9A;&#x7075;&#x6D3B;&#x4E86;&#xFF0C;&#x6BCF;&#x4E2A;&#x90E8;&#x95E8;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5236;&#x5B9A;&#x6253;&#x5361;&#x5236;&#x5EA6;&#xFF0C;&#x6B64;&#x65F6;&#x8EAB;&#x4E3A;&#x4E3B;&#x7BA1;&#x7684;&#x4F60;&#xFF0C;&#x4F9D;&#x636E;&#x516C;&#x53F8;&#x8BE5;&#x57FA;&#x672C;&#x89C4;&#x5B9A;&#xFF0C;&#x5236;&#x5B9A;&#x81EA;&#x5DF1;&#x90E8;&#x95E8;&#x7684;&#x8003;&#x52E4;&#x5236;&#x5EA6;&#xFF0C;&#x672C;&#x90E8;&#x95E8;&#x7684;&#x804C;&#x5DE5;&#x53EF;&#x4EE5; 9 &#x70B9;&#x6765;&#x516C;&#x53F8;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4E0D;&#x6253;&#x5361;&#xFF01;&#xFF08;&#x5F53;&#x7136;&#x8FD8;&#x53EF;&#x4EE5;&#x5236;&#x5B9A;&#x5176;&#x4ED6;&#x89C4;&#x5B9A;&#xFF09;</p><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF1A;</p><ul><li>&#x201D;<strong>&#x6574;&#x4E2A;&#x516C;&#x53F8;</strong>&#x201C;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; JS &#x5F15;&#x64CE;</li><li>&#x201D;<strong>&#x516C;&#x53F8;&#x7684;&#x57FA;&#x672C;&#x89C4;&#x7AE0;&#x5236;&#x5EA6;</strong>&#x201C;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; JS &#x8FD0;&#x884C;&#x673A;&#x5236;&#x548C;&#x8BED;&#x6CD5;&#xFF0C;&#x5458;&#x5DE5;&#x529E;&#x4E8B;&#x6700;&#x4F4E;&#x8981;&#x6C42;&#x5C31;&#x662F;&#x9075;&#x7167;&#x516C;&#x53F8;&#x7684;&#x89C4;&#x7AE0;&#x5236;&#x5EA6;</li><li>&#x201D;<strong>&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x4F60;&#x62E5;&#x6709;&#x7BA1;&#x7406;&#x90E8;&#x95E8;&#x7684;&#x6743;&#x529B;&#xFF0C;&#x8D1F;&#x8D23;&#x5F00;&#x53D1;&#x5E76;&#x7EF4;&#x62A4;&#x4E00;&#x4E9B;&#x4EA7;&#x54C1;</strong>&#x201C;&#xFF0C;&#x8FD9;&#x79CD;&#x884C;&#x4E3A;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x5E73;&#x65F6;&#x666E;&#x901A;&#x7684;&#x7F16;&#x7A0B;&#xFF1B;</li><li>&#x516C;&#x53F8;&#x7684;&#x57FA;&#x672C;&#x89C4;&#x5B9A;&#x53D8;&#x7075;&#x6D3B;&#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x9664;&#x4E86;&#x62E5;&#x6709;&#x4EE5;&#x524D;&#x7BA1;&#x7406;&#x5458;&#x5DE5;&#x7684;&#x6743;&#x529B;&#x4E4B;&#x5916;&#xFF0C;&#x201D;<strong>&#x8FD8;&#x62E5;&#x6709;&#x66F4;&#x6539;&#x5236;&#x5EA6;&#xFF08;&#x9488;&#x5BF9;&#x8BE5;&#x90E8;&#x95E8;&#xFF09;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE;&#x5236;&#x5EA6;&#x5C42;&#x9762;&#x5F71;&#x54CD;&#x5458;&#x5DE5;&#x7684;&#x6700;&#x4F4E;&#x8981;&#x6C42;&#x884C;&#x4E3A;</strong>&#x201C;&#xFF0C;&#x8FD9;&#x91CC;&#x66F4;&#x6539;&#x89C4;&#x7AE0;&#x5236;&#x5EA6;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; <strong>&#x5143;&#x7F16;&#x7A0B;</strong> &#x4E86;&#xFF1B;</li></ul><p>&#x8FD9;&#x91CC;&#x7684;&#x4F8B;&#x5B50;&#x4E0D;&#x4E00;&#x5B9A;&#x51C6;&#x786E;&#xFF0C;&#x662F;&#x6211;&#x4E2A;&#x4EBA;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x6743;&#x505A;&#x53C2;&#x8003;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#x77E5;&#x4E4E;&#x4E0A; <a href="https://www.zhihu.com/question/23856985" rel="nofollow noreferrer">&#x600E;&#x4E48;&#x7406;&#x89E3;&#x5143;&#x7F16;&#x7A0B;&#xFF1F;</a> &#x7684;&#x95EE;&#x7B54;&#x3002;</p><p>&#x501F;&#x52A9;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7406;&#x89E3;&#x5143;&#x7F16;&#x7A0B;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x611F;&#x77E5;&#x5728;&#x6CA1;&#x6709;&#x5143;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x7B97;&#x4F60;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#x5F88;&#x5389;&#x5BB3;&#xFF0C;&#x4F46;&#x7EC8;&#x7A76;&#x201C;&#x5B59;&#x609F;&#x7A7A;&#x7FFB;&#x4E0D;&#x51FA;&#x4E94;&#x6307;&#x5C71;&#x201D;&#xFF1B;&#x800C;&#x638C;&#x63E1;&#x4E86;&#x5143;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x5DEE;&#x4E0A;&#x5929;&#x4E86;&#xFF0C;&#x201C;&#x7ED9;&#x4F60;&#x4E00;&#x4E2A;&#x652F;&#x70B9;&#xFF0C;&#x4F60;&#x5C31;&#x80FD;&#x64AC;&#x52A8;&#x5730;&#x7403;&#x201D;&#xFF0C;&#x80FD;&#x529B;&#x5927;&#x5927;&#x6269;&#x589E;&#x3002;</p><p>&#x7B80;&#x8A00;&#x4E4B;&#xFF0C;&#x5143;&#x7F16;&#x7A0B;&#x8BA9;&#x4F60;&#x5177;&#x5907;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x6539;&#x53D8;&#x73B0;&#x6709;&#x7684;&#x7A0B;&#x5E8F;&#x89C4;&#x5219;&#x5C42;&#x9762;&#x7684;&#x80FD;&#x529B;&#x3002;&#x6216;&#x8005;&#x8BF4;&#xFF0C;&#x5143;&#x7F16;&#x7A0B;&#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x4EE5;&#x67D0;&#x79CD;&#x5F62;&#x5F0F;&#x53BB;&#x5F71;&#x54CD;&#x6216;&#x66F4;&#x6539;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x6240;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x529F;&#x80FD;&#xFF0C;&#x4EE5;&#x6B64;&#x83B7;&#x5F97;&#x4E00;&#x4E9B;&#x7EF4;&#x62A4;&#x6027;&#x3001;&#x6548;&#x7387;&#x4E0A;&#x7684;&#x597D;&#x5904;&#x3002;</p><p>Javascript &#x4E2D;&#xFF0C;<code>eval</code>&#x3001;<code>new Function()</code>&#x4FBF;&#x662F;&#x4E24;&#x4E2A;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x8FDB;&#x884C;&#x5143;&#x7F16;&#x7A0B;&#x7684;&#x7279;&#x6027;&#x3002;&#x4E0D;&#x8FC7;&#x56E0;&#x4E3A;&#x6027;&#x80FD;&#x548C;&#x53EF;&#x7EF4;&#x62A4;&#x7684;&#x89D2;&#x5EA6;&#x4E0A;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x7279;&#x6027;&#x8FD8;&#x662F;&#x4E0D;&#x8981;&#x7528;&#x4E3A;&#x5999;&#x3002;</p><p>&#x5728; ES6 &#x4E4B;&#x540E;&#xFF0C;&#x6807;&#x51C6;&#x5F15;&#x5165;&#x4E86; Proxy &amp; Reflect &amp; Symbols&#xFF0C;&#x4ECE;&#x800C;&#x63D0;&#x4F9B;&#x6BD4;&#x8F83;&#x5B8C;&#x5584;&#x7684;&#x5143;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#x3002;</p><h2>2&#x3001;&#x5B66;&#x4E60; ES6 &#x5143;&#x7F16;&#x7A0B;&#x7684;&#x8D44;&#x6E90;</h2><p>&#x6211;&#x539F;&#x672C;&#x4E5F;&#x60F3;&#x4ED4;&#x7EC6;&#x8BB2;&#x8BB2; ES6 &#x4E2D; <code>Symbol</code>&#x3001;<code>Proxy</code> &#x548C; <code>Reflect</code> &#x7684;&#x57FA;&#x672C;&#x6982;&#x5FF5;&#x548C;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x4F46;&#x7F51;&#x4E0A;&#x8FD9;&#x65B9;&#x9762;&#x7684;&#x6587;&#x7AE0;&#x4E0D;&#x8981;&#x592A;&#x591A;&#xFF0C;&#x89C9;&#x5F97;&#x91CD;&#x590D;&#x7801;&#x5B57;&#x4E5F;&#x6CA1;&#x6709;&#x592A;&#x5FC5;&#x8981;&#x3002;&#x8FD9;&#x91CC;&#x7740;&#x91CD;&#x63A8;&#x8350;&#x51E0;&#x7BC7;&#xFF0C;&#x5206;&#x4E3A;&#x6559;&#x7A0B;&#x7C7B;&#x548C;&#x624B;&#x518C;&#x7C7B;&#xFF0C;&#x901A;&#x8BFB;&#x5B8C;&#x4E4B;&#x540E;&#x5E94;&#x8BE5;&#x5C31;&#x638C;&#x63E1;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#x3002;</p><p>&#x5143;&#x7F16;&#x7A0B;&#x5728; ES6 &#x4F53;&#x73B0;&#x6700;&#x4E3A;&#x7A81;&#x51FA;&#x7684;&#x662F; <code>Proxy</code> &#x7684;&#x5E94;&#x7528;&#xFF0C;&#x76EE;&#x524D;&#x6211;&#x6240;&#x627E;&#x7684;&#x6587;&#x7AE0;&#x4E5F;&#x591A;&#x504F;&#x5411; <code>Proxy</code>&#x3002;</p><p><strong>&#x539F;&#x7406;&#x6559;&#x7A0B;&#x7C7B;</strong>&#xFF1A;</p><ul><li><a href="http://www.infoq.com/cn/articles/es6-in-depth-proxies-and-reflect/" rel="nofollow noreferrer">&#x6DF1;&#x5165;&#x6D45;&#x51FA;ES6&#xFF08;&#x5341;&#x4E8C;&#xFF09;&#xFF1A;&#x4EE3;&#x7406; Proxies</a>&#xFF1A;ES6 &#x6DF1;&#x5165;&#x6D45;&#x51FA;&#x7CFB;&#x5217;&#xFF0C;&#x4E2A;&#x4EBA;&#x63A8;&#x8350;&#x8BA4;&#x771F;&#x8BFB;&#x5B8C;&#x8BE5;&#x6587;&#x7AE0;&#x3002;&#x672C;&#x6587;&#x7684;&#x4F5C;&#x8005;&#x5B9E;&#x73B0;&#x4E86; ES6 &#x7684; Reflect &#x7279;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x4ED6;&#x5BF9; ES6 &#x8FD9;&#x4E24;&#x4E2A;&#x7279;&#x6027;&#x7406;&#x89E3;&#x662F;&#x6700;&#x4E3A;&#x6DF1;&#x523B;&#x7684;&#xFF0C;&#x4ED6;&#x7684;&#x6587;&#x7AE0;&#x81EA;&#x7136;&#x8981;&#x6DF1;&#x5EA6;&#x9605;&#x8BFB;&#x3002;</li><li><a href="https://ponyfoo.com/articles/es6-proxies-in-depth" rel="nofollow noreferrer">ES6 Proxies in Depth</a>&#xFF1A;&#x548C;&#x5176;&#x4ED6;&#x6559;&#x7A0B;&#x76F8;&#x6BD4;&#xFF0C;&#x8BE5;&#x6587;&#x7AE0;&#x7BC7;&#x5E45;&#x7A0D;&#x5FAE;&#x77ED;&#x4E00;&#x4E9B;&#xFF0C;&#x80FD;&#x8F83;&#x4E3A;&#x5FEB;&#x901F;&#x5F97;&#x638C;&#x63E1;&#x6982;&#x5FF5;&#x548C;&#x4E00;&#x4E9B;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x3002;</li><li><a href="http://exploringjs.com/es6/ch_proxies.html" rel="nofollow noreferrer">Metaprogramming with proxies</a>&#xFF1A;&#x6765;&#x81EA; &#x300A;<a href="http://exploringjs.com/es6/index.html#toc_ch_proxies" rel="nofollow noreferrer">Exploring ES6</a>&#x300B;&#x4E66;&#x7C4D;&#x6458;&#x9009;&#xFF0C;&#x57FA;&#x7840;&#x5165;&#x95E8;&#x3002;</li><li><a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch7.md" rel="nofollow noreferrer">Chapter 7: Meta Programming</a>&#xFF1A;&#x7ECF;&#x5178;&#x7684; &#x300A;You Don&apos;t Know JS&#x300B;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#xFF0C;&#x6DF1;&#x5165;&#x6D45;&#x51FA;&#xFF0C;&#x6587;&#x7AE0;&#x591F;&#x957F;&#xFF0C;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x8010;&#x5FC3;&#x3002;</li><li><a href="https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/" rel="nofollow noreferrer">Metaprogramming in ES6: Symbols and why they&apos;re awesome</a>&#xFF1A;&#x672C;&#x7BC7;&#x5C31;&#x662F;&#x57FA;&#x4E8E; Symbols&#x3001;Reflect&#x3001;Proxy &#x7B49;&#x5B9E;&#x73B0;&#x5143;&#x7F16;&#x7A0B;&#x7684;&#x6559;&#x7A0B;&#x7CFB;&#x5217;&#x6559;&#x7A0B;&#xFF0C;&#x5185;&#x5BB9;&#x4E5F;&#x8DB3;&#x591F;&#x8BE6;&#x5B9E;&#x3002;</li><li><a href="https://www.w3cplus.com/javascript/es6-proxy-reflect.html" rel="nofollow noreferrer">ES6&#x5B66;&#x4E60;&#x7B14;&#x8BB0;&#xFF1A; &#x4EE3;&#x7406;&#x548C;&#x53CD;&#x5C04;</a>&#xFF1A;&#x975E;&#x5E38;&#x8BE6;&#x5B9E;&#x5730;&#x6574;&#x7406;&#x4E86; <code>Proxy</code> &#x548C; <code>Reflect</code> &#x76F8;&#x5173;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x53EA;&#x662F;&#x9605;&#x8BFB;&#x8D77;&#x6765;&#x7565;&#x5FAE;&#x67AF;&#x71E5;&#x3002;</li></ul><p><strong>&#x5E94;&#x7528;&#x6559;&#x7A0B;&#x7C7B;</strong>&#xFF1A;</p><ul><li><a href="http://dealwithjs.io/es6-features-10-use-cases-for-proxy/" rel="nofollow noreferrer">ES6 Features - 10 Use Cases for Proxy</a>&#xFF1A;&#x6536;&#x96C6;&#x4E86; 10 &#x4E2A; proxy &#x7684;&#x5177;&#x4F53;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x5728; <a href="https://github.com/gergob/jsProxy" rel="nofollow noreferrer">jsProxy</a> &#x4ED3;&#x5E93;&#x4E2D;</li><li><a href="https://segmentfault.com/a/1190000015800703">&#x4ECE;ES6&#x91CD;&#x65B0;&#x8BA4;&#x8BC6;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;(&#x4E94;): &#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x548C;Proxy</a>&#xFF1A;&#x672C;&#x6587;&#x4ECE;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0A;&#x53BB;&#x7406;&#x89E3; Proxy &#x7684;&#x5E94;&#x7528;</li><li><a href="https://juejin.im/post/5a3cb0846fb9a044fb07f36c" rel="nofollow noreferrer">&#x4F7F;&#x7528; Javascript &#x539F;&#x751F;&#x7684; Proxy &#x4F18;&#x5316;&#x5E94;&#x7528;</a> &#xFF1A;&#x6587;&#x7AE0;&#x6D89;&#x53CA;&#x5230; Proxy &#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x3001;&#x5982;&#x4F55;&#x4F7F;&#x7528; Proxy &#x521B;&#x5EFA;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#xFF0C;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x5BF9;&#x5E94;&#x7528;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3002;</li></ul><p><strong>&#x624B;&#x518C;&#x7C7B;</strong>&#xFF1A;</p><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer">MDN - Proxy</a>&#xFF1A;MDN &#x4E0A;&#x7684; Proxy &#x5B98;&#x65B9;&#x6587;&#x6863;</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer">MDN - Reflect</a>&#xFF1A;MDN &#x4E0A;&#x7684; Reflect &#x5B98;&#x65B9;&#x6587;&#x6863;</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Meta_programming" rel="nofollow noreferrer">MDN - &#x5143;&#x7F16;&#x7A0B;</a>&#xFF1A;MDN &#x5B98;&#x65B9;&#x6587;&#x6863;&#x6559;&#x7A0B;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;&#x5143;&#x7F16;&#x7A0B;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5E94;&#x8BE5;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x62BD;&#x8C61;&#x7684;&#xFF0C;&#x5F53;&#x624B;&#x518C;&#x7FFB;&#x7FFB;&#x4E0D;&#x9519;&#xFF1B;</li><li><a href="http://es6.ruanyifeng.com/#docs/proxy" rel="nofollow noreferrer">ECMAScript 6 &#x5165;&#x95E8; - Proxy</a>&#xFF1A;&#x962E;&#x4E00;&#x5CF0;&#x7FFB;&#x8BD1;&#x7684; &#x300A;ECMAScript 6 &#x5165;&#x95E8;&#x300B; &#x6559;&#x7A0B;</li><li><a href="https://itbilu.com/javascript/js/EkOtcbSf-.html" rel="nofollow noreferrer">ES6 &#x81EA;&#x5B9A;&#x4E49;JavaScript&#x8BED;&#x8A00;&#x884C;&#x4E3A;&#x7684; Proxy &#x5BF9;&#x8C61;</a>&#xFF1A;&#x7B97;&#x662F;&#x7B80;&#x660E;&#x7248;&#x7684;&#x4E2D;&#x6587;&#x7248;&#x7684; API &#x624B;&#x518C;</li></ul><blockquote>&#x5728;&#x6CA1;&#x5145;&#x5206;&#x7406;&#x89E3;&#x5143;&#x7F16;&#x7A0B;&#x4E4B;&#x524D;&#x7FFB;&#x624B;&#x518C;&#x8FD8;&#x662F;&#x633A;&#x67AF;&#x71E5;&#x7684;&#xFF0C;&#x5EFA;&#x8BAE;&#x5E73;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x518D;&#x4ECE;&#x8FD9;&#x91CC;&#x8865;&#x6F0F;</blockquote><p>&#x968F;&#x7740;&#x65F6;&#x95F4;&#x7684;&#x63A8;&#x79FB;&#xFF0C;&#x4E0A;&#x9762;&#x6536;&#x96C6;&#x7684;&#x6587;&#x7AE0;&#x53EF;&#x80FD;&#x4F1A;&#x663E;&#x5F97;&#x9648;&#x65E7;&#xFF0C;&#x53C8;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x65B0;&#x7684;&#x597D;&#x6587;&#x7AE0;&#xFF0C;&#x63A8;&#x8350;&#x5728;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x4E2D;&#x4F7F;&#x7528; <code>js Metaprogramming</code> &#x6216;&#x8005; <code>es6 proxy</code> &#x8FDB;&#x884C;&#x641C;&#x7D22;&#x76F8;&#x5173;&#x6587;&#x7AE0;&#xFF1B;</p><h2>3&#x3001;&#x4EE3;&#x7801;&#x7247;&#x6BB5;</h2><p>&#x4E0B;&#x9762;&#x6458;&#x6284;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF0C;&#x65B9;&#x4FBF;&#x81EA;&#x5DF1;&#x540E;&#x7EED;&#x5728;&#x5E94;&#x7528; JS &#x5143;&#x7F16;&#x7A0B;&#x7684;&#x65F6;&#x5019;&#x5FEB;&#x901F; &quot;&#x501F;&#x9274;&quot;&#x3002;&#x4F60;&#x4EEC;&#x5982;&#x679C;&#x4E5F;&#x6709;&#x89C9;&#x5F97;&#x4E0D;&#x9519;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF0C;&#x6B22;&#x8FCE;&#x5728; <a href="https://github.com/boycgit/boycgit.github.io/issues/12" rel="nofollow noreferrer">issue</a> &#x4E2D;&#x56DE;&#x590D;&#xFF0C;&#x6211;&#x5C06;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x5230;&#x8FD9;&#x513F;&#x3002;</p><p><a id="catalog"></a></p><h3>&#x76EE;&#x5F55;</h3><ul><li><a href="#schema-valid">Schema &#x6821;&#x9A8C;</a></li><li><a href="#auto-fill">&#x81EA;&#x52A8;&#x586B;&#x5145;&#x5BF9;&#x8C61;</a></li><li><a href="#base-convert">&#x8FDB;&#x5236;&#x8F6C;&#x6362;</a></li><li><a href="#cache-proxy">&#x7F13;&#x5B58;&#x4EE3;&#x7406;</a></li><li><a href="#private-prop">&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027;</a></li><li><a href="#fn-throttle">&#x51FD;&#x6570;&#x8282;&#x6D41;</a></li><li><a href="#image-lazy">&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;</a></li><li><a href="#attr-onchange">&#x76D1;&#x542C;&#x5C5E;&#x6027;&#x66F4;&#x6539;</a></li><li><a href="#single-pattern">&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;</a></li><li><a href="#python-slice">Python &#x90A3;&#x6837;&#x622A;&#x53D6;&#x6570;&#x7EC4;</a></li></ul><p><a id="schema-valid"></a></p><h3>Schema &#x6821;&#x9A8C; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="https://ponyfoo.com/articles/es6-proxies-in-depth" rel="nofollow noreferrer">ES6 Proxies in Depth</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;<code>person</code> &#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E00;&#x4E2A; <code>age</code> &#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x7ED9;&#x5B83;&#x8D4B;&#x503C;&#x7684;&#x65F6;&#x5019;&#x786E;&#x4FDD;&#x662F;&#x5927;&#x4E8E;&#x96F6;&#x7684;&#x6570;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x8D4B;&#x503C;&#x5931;&#x8D25;&#x5E76;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x3002;</p><pre><code class="js">var person = { age: 27 };</code></pre><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E; <code>set</code> trap&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x5BF9; <code>age</code> &#x5B57;&#x6BB5;&#x7684;&#x6821;&#x9A8C;&#x903B;&#x8F91;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">var validator = {
  set (target, key, value) {
    if (key === &apos;age&apos;) {
      if (typeof value !== &apos;number&apos; || Number.isNaN(value)) {
        throw new TypeError(&apos;Age must be a number&apos;)
      }
      if (value &lt;= 0) {
        throw new TypeError(&apos;Age must be a positive number&apos;)
      }
    }
    return true
  }
}
var proxy = new Proxy(person, validator)
proxy.age = &apos;foo&apos;
// &lt;- TypeError: Age must be a number
proxy.age = NaN
// &lt;- TypeError: Age must be a number
proxy.age = 0
// &lt;- TypeError: Age must be a positive number
proxy.age = 28
console.log(person.age)
// &lt;- 28</code></pre><p><a id="auto-fill"></a></p><h3>&#x81EA;&#x52A8;&#x586B;&#x5145;&#x5BF9;&#x8C61; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="http://www.infoq.com/cn/articles/es6-in-depth-proxies-and-reflect/" rel="nofollow noreferrer">&#x6DF1;&#x5165;&#x6D45;&#x51FA;ES6&#xFF08;&#x5341;&#x4E8C;&#xFF09;&#xFF1A;&#x4EE3;&#x7406; Proxies</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Tree()&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x4EE5;&#x4E0B;&#x7279;&#x6027;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61; <code>branch1</code>&#x3001;<code>branch2</code> &#x548C; <code>branch3</code> &#x90FD;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x3002;</p><pre><code class="js">var tree = Tree();
tree
//    { }
tree.branch1.branch2.twig = &quot;green&quot;;
// { branch1: { branch2: { twig: &quot;green&quot; } } }

tree.branch1.branch3.twig = &quot;yellow&quot;;

// { branch1: { branch2: { twig: &quot;green&quot; },
//                 branch3: { twig: &quot;yellow&quot; }}}</code></pre><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;Tree &#x8FD4;&#x56DE;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x4E2A; proxy &#x5B9E;&#x4F8B;&#xFF0C;&#x901A;&#x8FC7; <code>get</code> trap &#xFF0C;&#x5F53;&#x4E0D;&#x5B58;&#x5728;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B50;&#x6811;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">  function Tree() {
    return new Proxy({}, handler);
  }
  var handler = {
    get: function (target, key, receiver) {
      if (!(key in target)) {
        target[key] = Tree();  // &#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B50;&#x6811;
      }
      return Reflect.get(target, key, receiver);
    }
  };</code></pre><p><a id="base-convert"></a></p><h3>&#x8FDB;&#x5236;&#x8F6C;&#x6362; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="http://www.infoq.com/cn/articles/es6-in-depth-proxies-and-reflect/" rel="nofollow noreferrer">&#x6DF1;&#x5165;&#x6D45;&#x51FA;ES6&#xFF08;&#x5341;&#x4E8C;&#xFF09;&#xFF1A;&#x4EE3;&#x7406; Proxies</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x6BD4;&#x5982;&#x5C06; 2 &#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x6210; 16 &#x8FDB;&#x5236;&#x6216;&#x8005; 8 &#x8FDB;&#x5236;&#xFF0C;&#x53CD;&#x4E4B;&#x4E5F;&#x80FD;&#x8F6C;&#x6362;&#x3002;</p><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x7531;&#x4E8E;&#x5927;&#x90E8;&#x5206;&#x7684;&#x529F;&#x80FD;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x540D;&#x5B57;&#x5C06;&#x53D8;&#x91CF;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; <code>get</code> trap &#x5B8C;&#x6210;&#x8FDB;&#x5236;&#x8F6C;&#x6362;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">const baseConvertor = new Proxy({}, {
  get: function baseConvert(object, methodName) {
    var methodParts = methodName.match(/base(\d+)toBase(\d+)/);
    var fromBase = methodParts &amp;&amp; methodParts[1];
    var toBase = methodParts &amp;&amp; methodParts[2];
    if (!methodParts || fromBase &gt; 36 || toBase &gt; 36 || fromBase &lt; 2 || toBase &lt; 2) {
      throw new Error(&apos;TypeError: baseConvertor&apos; + methodName + &apos; is not a function&apos;);
    }
    return function (fromString) {
      return parseInt(fromString, fromBase).toString(toBase);
    }
  }
});

baseConvertor.base16toBase2(&apos;deadbeef&apos;) === &apos;11011110101011011011111011101111&apos;;
baseConvertor.base2toBase16(&apos;11011110101011011011111011101111&apos;) === &apos;deadbeef&apos;;</code></pre><p><a id="cache-proxy"></a></p><h3>&#x7F13;&#x5B58;&#x4EE3;&#x7406; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="https://segmentfault.com/a/1190000015800703">&#x4ECE;ES6&#x91CD;&#x65B0;&#x8BA4;&#x8BC6;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;(&#x4E94;): &#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x548C;Proxy</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x4EE5;&#x6CA1;&#x6709;&#x7ECF;&#x8FC7;&#x4EFB;&#x4F55;&#x4F18;&#x5316;&#x7684;&#x8BA1;&#x7B97;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x51FD;&#x6570;&#x6765;&#x5047;&#x8BBE;&#x4E3A;&#x5F00;&#x9500;&#x5F88;&#x5927;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x79CD;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x5728;&#x8BA1;&#x7B97; 40 &#x4EE5;&#x4E0A;&#x7684;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x9879;&#x65F6;&#x5C31;&#x80FD;&#x660E;&#x663E;&#x7684;&#x611F;&#x5230;&#x5EF6;&#x8FDF;&#x611F;&#x3002;&#x5E0C;&#x671B;&#x901A;&#x8FC7;&#x7F13;&#x5B58;&#x6765;&#x6539;&#x5584;&#x3002;</p><pre><code class="js">const getFib = (number) =&gt; {
  if (number &lt;= 2) {
    return 1;
  } else {
    return getFib(number - 1) + getFib(number - 2);
  }
}</code></pre><blockquote>&#x6CE8;&#xFF1A;&#x8FD9;&#x53EA;&#x662F;&#x6F14;&#x793A;&#x7F13;&#x5B58;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x672C;&#x8EAB;&#x5C31;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x5BB9;&#x6613;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#x9700;&#x8981;&#x6539;&#x5199;&#x4E0A;&#x8FF0;&#x7684; <code>getFib</code> &#x51FD;&#x6570;&#x3002;</blockquote><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x56E0;&#x4E3A;&#x662F;&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x4F7F;&#x7528; <code>apply</code> trap&#xFF0C;&#x5229;&#x7528; Map &#x6216;&#x8005;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x5B58;&#x50A8;&#x6BCF;&#x6B21;&#x8BA1;&#x7B97;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x8FD0;&#x7B97;&#x524D;&#x5148;&#x53BB; Map &#x67E5;&#x8BE2;&#x8BA1;&#x7B97;&#x503C;&#x662F;&#x5426;&#x88AB;&#x7F13;&#x5B58;&#x3002;&#xFF08;&#x76F8;&#x5F53;&#x4E8E;&#x4EE5;&#x7A7A;&#x95F4;&#x6362;&#x65F6;&#x95F4;&#xFF0C;&#x83B7;&#x5F97;&#x6027;&#x80FD;&#x63D0;&#x5347;&#xFF09;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">const getCacheProxy = (fn, cache = new Map()) =&gt; {
  return new Proxy(fn, {
    apply(target, context, args) {
      const argsString = args.join(&apos; &apos;);
      if (cache.has(argsString)) {
        // &#x5982;&#x679C;&#x6709;&#x7F13;&#x5B58;,&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x6570;&#x636E;
        console.log(`&#x8F93;&#x51FA;${args}&#x7684;&#x7F13;&#x5B58;&#x7ED3;&#x679C;: ${cache.get(argsString)}`);
        
        return cache.get(argsString);
      }
      const result = Reflect.apply(target, undefined, args);
      cache.set(argsString, result);

      return result;
    }
  })
}

const getFibProxy = getCacheProxy(getFib);
getFibProxy(40); // 102334155
getFibProxy(40); // &#x8F93;&#x51FA;40&#x7684;&#x7F13;&#x5B58;&#x7ED3;&#x679C;: 102334155</code></pre><p>&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#x6570;&#x636E;&#x91CF;&#x8D8A;&#x5927;&#x3001;&#x8BA1;&#x7B97;&#x8FC7;&#x7A0B;&#x8D8A;&#x590D;&#x6742;&#xFF0C;&#x4F18;&#x5316;&#x6548;&#x679C;&#x8D8A;&#x597D;&#xFF0C;&#x5426;&#x5219;&#x6709;&#x53EF;&#x80FD;&#x4F1A;&#x5F97;&#x4E0D;&#x507F;&#x5931;&#x3002;</p><p><a id="private-prop"></a></p><h3>&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="https://segmentfault.com/a/1190000015800703">&#x4ECE;ES6&#x91CD;&#x65B0;&#x8BA4;&#x8BC6;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;(&#x4E94;): &#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x548C;Proxy</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x4F17;&#x6240;&#x5468;&#x77E5;&#xFF0C;JavaScript&#x662F;&#x6CA1;&#x6709;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x8FD9;&#x4E00;&#x4E2A;&#x6982;&#x5FF5;&#x7684;&#xFF0C;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x4E00;&#x822C;&#x662F;&#x4EE5; <code>_</code> &#x4E0B;&#x5212;&#x7EBF;&#x5F00;&#x5934;&#xFF0C;&#x8BF7;&#x901A;&#x8FC7; Proxy &#x9650;&#x5236;&#x4EE5; <code>_</code> &#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x8BBF;&#x95EE;&#x3002;</p><pre><code class="js">const myObj = {
  public: &apos;hello&apos;,
  _private: &apos;secret&apos;,
  method: function () {
    console.log(this._private);
  }
},</code></pre><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x770B;&#x4E0A;&#x53BB;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x8C8C;&#x4F3C;&#x4F7F;&#x7528; <code>get</code>&#x3001;<code>set</code> &#x8FD9;&#x4E24;&#x4E2A; trap &#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x5E76;&#x4E0D;&#x662F;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x8FD8;&#x9700;&#x8981;&#x5B9E;&#x73B0; <code>has</code>, <code>ownKeys</code> , <code>getOwnPropertyDescriptor</code> &#x8FD9;&#x4E9B; trap&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x6700;&#x5927;&#x9650;&#x5EA6;&#x7684;&#x9650;&#x5236;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x8BBF;&#x95EE;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">function getPrivateProps(obj, filterFunc) {
  return new Proxy(obj, {
    get(obj, prop) {
      if (!filterFunc(prop)) {
        let value = Reflect.get(obj, prop);
        // &#x5982;&#x679C;&#x662F;&#x65B9;&#x6CD5;, &#x5C06;this&#x6307;&#x5411;&#x4FEE;&#x6539;&#x539F;&#x5BF9;&#x8C61;
        if (typeof value === &apos;function&apos;) {
          value = value.bind(obj);
        }
        return value;
      }
    },
    set(obj, prop, value) {
      if (filterFunc(prop)) {
        throw new TypeError(`Can&apos;t set property &quot;${prop}&quot;`);
      }
      return Reflect.set(obj, prop, value);
    },
    has(obj, prop) {
      return filterFunc(prop) ? false : Reflect.has(obj, prop);
    },
    ownKeys(obj) {
      return Reflect.ownKeys(obj).filter(prop =&gt; !filterFunc(prop));
    },
    getOwnPropertyDescriptor(obj, prop) {
      return filterFunc(prop) ? undefined : Reflect.getOwnPropertyDescriptor(obj, prop);
    }
  });
}

function propFilter(prop) {
  return prop.indexOf(&apos;_&apos;) === 0;
}

myProxy = getPrivateProps(myObj, propFilter);

console.log(JSON.stringify(myProxy)); // {&quot;public&quot;:&quot;hello&quot;}
console.log(myProxy._private); // undefined
console.log(&apos;_private&apos; in myProxy); // false
console.log(Object.keys(myProxy)); // [&quot;public&quot;, &quot;method&quot;]
for (let prop in myProxy) { console.log(prop); }    // public  method
myProxy._private = 1; // Uncaught TypeError: Can&apos;t set property &quot;_private&quot;</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x5176;&#x4E2D;&#x5728; <code>get</code> &#x65B9;&#x6CD5;&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x4F7F;&#x5C06; <code>this</code> &#x6307;&#x5411;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x662F;&#x5728;&#x4F7F;&#x7528; Proxy &#x9700;&#x8981;&#x5341;&#x5206;&#x6CE8;&#x610F;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8FD9;&#x4E48;&#x505A;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x7684; this &#x4F1A;&#x6307;&#x5411; Proxy &#x4EE3;&#x7406;&#x3002;</p><blockquote>&#x4E00;&#x822C;&#x6765;&#x8BB2;&#xFF0C;<code>set</code> trap &#x90FD;&#x4F1A;&#x9ED8;&#x8BA4;&#x89E6;&#x53D1; <code>getOwnPropertyDescriptor</code> &#x548C; <code>defineProperty</code></blockquote><p><a id="fn-throttle"></a></p><h3>&#x51FD;&#x6570;&#x8282;&#x6D41; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="https://juejin.im/post/5a3cb0846fb9a044fb07f36c" rel="nofollow noreferrer">&#x4F7F;&#x7528; Javascript &#x539F;&#x751F;&#x7684; Proxy &#x4F18;&#x5316;&#x5E94;&#x7528;</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x63A7;&#x5236;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;&#x9891;&#x7387;.</p><pre><code class="js">const handler = () =&gt; console.log(&apos;Do something...&apos;);
document.addEventListener(&apos;scroll&apos;, handler);</code></pre><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x6D89;&#x53CA;&#x5230;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528; <code>apply</code> trap &#x5373;&#x53EF;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">const createThrottleProxy = (fn, rate) =&gt; {
  let lastClick = Date.now() - rate;
  return new Proxy(fn, {
    apply(target, context, args) {
      if (Date.now() - lastClick &gt;= rate) {
        fn.bind(target)(args);
        lastClick = Date.now();
      }
    }
  });
};

const handler = () =&gt; console.log(&apos;Do something...&apos;);
const handlerProxy = createThrottleProxy(handler, 1000);
document.addEventListener(&apos;scroll&apos;, handlerProxy);</code></pre><p>&#x540C;&#x6837;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4F7F;&#x7528; <code>bind</code> &#x7ED1;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x7684;&#x793A;&#x4F8B;&#x4F7F;&#x7528;&#x4E86;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x7528; <code>bind</code> &#x4E5F;&#x6CA1;&#x5565;&#x95EE;&#x9898;&#x3002;</p><p><a id="image-lazy"></a></p><h3>&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="https://juejin.im/post/5a3cb0846fb9a044fb07f36c" rel="nofollow noreferrer">&#x4F7F;&#x7528; Javascript &#x539F;&#x751F;&#x7684; Proxy &#x4F18;&#x5316;&#x5E94;&#x7528;</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x5728;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F7F;&#x7528; <code>loading</code> &#x5360;&#x4F4D;&#x56FE;&#xFF0C;&#x7B49;&#x771F;&#x6B63;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#x518D;&#x663E;&#x793A;&#x51FA;&#x6765;&#x3002;&#x539F;&#x59CB;&#x7684;&#x5199;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="js">const img = new Image();
img.src = &apos;/some/big/size/image.jpg&apos;;
document.body.appendChild(img);</code></pre><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x8BFB;&#x53D6; <code>img.src</code> &#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>constructor</code> trap &#x63A7;&#x5236;&#x5728;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528; loading &#x56FE;&#xFF0C;&#x7B49;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x518D;&#x5C06;&#x771F;&#x5B9E;&#x5730;&#x5740;&#x8D4B;&#x7ED9; <code>img</code>;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js"> const IMG_LOAD = &apos;https://img.alicdn.com/tfs/TB11rDdclLoK1RjSZFuXXXn0XXa-300-300.png&apos;;

  const imageProxy = (loadingImg) =&gt; {
      return new Proxy(Image, {
          construct(target, args){
              const instance = Reflect.construct(target, args);
              instance.src = loadingImg;
              return instance;
          }
      });
  };

  const ImageProxy = imageProxy(IMG_LOAD);

  const createImageProxy = (realImg) =&gt;{
      const img = new ImageProxy();
      const virtualImg = new Image();
      virtualImg.src = realImg;
      virtualImg.onload = () =&gt; {
          hasLoaded = true;
          img.src = realImg;
      };
      return img;
  }
  var img = createImageProxy(&apos;https://cdn.dribbble.com/users/329207/screenshots/5289734/bemocs_db_dribbble_03_gold_leaf.jpg&apos;);
  document.body.appendChild(img);</code></pre><p><a id="attr-onchange"></a></p><h3>&#x76D1;&#x542C;&#x5C5E;&#x6027;&#x66F4;&#x6539; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="http://dealwithjs.io/es6-features-10-use-cases-for-proxy/" rel="nofollow noreferrer">ES6 Features - 10 Use Cases for Proxy</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x5F53;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x66F4;&#x6539;&#x540E;&#xFF0C;&#x89E6;&#x53D1;&#x6240;&#x7ED1;&#x5B9A;&#x7684; <code>onChange</code> &#x56DE;&#x8C03;&#xFF1B;</p><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x80FD;&#x66F4;&#x6539;&#x5C5E;&#x6027;&#x7684;&#x6709; <code>set</code> &#x548C; <code>deleteProperty</code> &#x8FD9;&#x4E24;&#x4E2A; trap&#xFF0C;&#x5728;&#x5176;&#x4E2D;&#x8C03;&#x7528; onChange &#x65B9;&#x6CD5;&#x5373;&#x53EF;</p><pre><code class="js">function trackChange(obj, onChange) {
    const handler = {
        set (obj, prop, value) {
            const oldVal = obj[prop];
            Reflect.set(obj, prop, value);
            onChange(obj, prop, oldVal, value);
        },
        deleteProperty (obj, prop) {
            const oldVal = obj[prop];
            Reflect.deleteProperty(obj, prop);
            onChange(obj, prop, oldVal, undefined);
        }
    };
    return new Proxy(obj, handler);
}

// &#x5E94;&#x7528;&#x5728;&#x5BF9;&#x8C61;&#x4E0A;
let myObj = trackChange({a: 1, b: 2}, function (obj, prop, oldVal, newVal) {
    console.log(`myObj.${prop} changed from ${oldVal} to ${newVal}`);
});

myObj.a = 5;     // myObj.a changed from 1 to 5
delete myObj.b;  // myObj.b changed from 2 to undefined
myObj.c = 6;     // myObj.c changed from undefined to 6

// &#x5E94;&#x7528;&#x5728;&#x6570;&#x7EC4;&#x4E0A;
let myArr = trackChange([1,2,3], function (obj, prop, oldVal, newVal) {
    let propFormat = isNaN(parseInt(prop)) ? `.${prop}` : `[${prop}]`,
        arraySum = myArr.reduce((a,b) =&gt; a + b);
    console.log(`myArr${propFormat} changed from ${oldVal} to ${newVal}`);
    console.log(`  sum [${myArr}] = ${arraySum}`);
});

myArr[0] = 4;      // myArr[0] changed from 1 to 4         
                   //   sum [4,2,3] = 9
delete myArr[2];   // myArr[2] changed from 3 to undefined                
                   //   sum [4,2,] = 6
myArr.length = 1;  // myArr.length changed from 3 to 1                
                   //   sum [4] = 4
</code></pre><p><a id="single-pattern"></a></p><h3>&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x6A21;&#x5F0F; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="http://dealwithjs.io/es6-features-10-use-cases-for-proxy/" rel="nofollow noreferrer">ES6 Features - 10 Use Cases for Proxy</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x5B9E;&#x73B0;&#x5355;&#x4F8B;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF1B;</p><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x548C;&#x521B;&#x5EFA;&#x6709;&#x5173;&#x7684;&#xFF0C;&#x662F; <code>construct</code> &#x8FD9;&#x4E2A; trap&#xFF0C;&#x6BCF;&#x6B21;&#x6211;&#x4EEC;&#x8FD4;&#x56DE;&#x76F8;&#x540C;&#x7684;&#x5B9E;&#x4F8B;&#x5373;&#x53EF;&#x3002;</p><p><strong>&#x4EE3;&#x7801;</strong>&#xFF1A;</p><pre><code class="js">// makes a singleton proxy for a constructor function
function makeSingleton(func) {
    let instance,
        handler = {
            construct: function (target, args) {
                if (!instance) {
                    instance = new func();
                }
                return instance;
            }
        };
    return new Proxy(func, handler);
}


// &#x4EE5;&#x8FD9;&#x4E2A;&#x4E3A; constructor &#x4E3A;&#x4F8B;
function Test() {
    this.value = 0;
}

// &#x666E;&#x901A;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;
const t1 = new Test(),
    t2 = new Test();
t1.value = 123;
console.log(&apos;Normal:&apos;, t2.value);  // 0 - &#x56E0;&#x4E3A; t1&#x3001;t2 &#x662F;&#x4E0D;&#x540C;&#x7684;&#x5B9E;&#x4F8B;

// &#x4F7F;&#x7528; Proxy &#x6765; trap &#x6784;&#x9020;&#x51FD;&#x6570;, &#x5B8C;&#x6210;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;
const TestSingleton = makeSingleton(Test),
    s1 = new TestSingleton(),
    s2 = new TestSingleton();
s1.value = 123;
console.log(&apos;Singleton:&apos;, s2.value);  // 123 - &#x73B0;&#x5728; s1&#x3001;s2 &#x662F;&#x76F8;&#x540C;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</code></pre><p><a id="python-slice"></a></p><h3>&#x50CF; Python &#x90A3;&#x6837;&#x622A;&#x53D6;&#x6570;&#x7EC4; <a href="#catalog">&#x2191;</a></h3><blockquote>&#x793A;&#x4F8B;&#x6765;&#x81EA; <a href="http://dealwithjs.io/es6-features-10-use-cases-for-proxy/" rel="nofollow noreferrer">ES6 Features - 10 Use Cases for Proxy</a></blockquote><p><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x5728; python &#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>list[10:20:3]</code> &#x6765;&#x83B7;&#x53D6; 10 &#x5230; 20 &#x7D22;&#x6027;&#x4E2D;&#x6BCF;&#x9694; 3 &#x4E2A;&#x7684;&#x5143;&#x7D20;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x4E5F;&#x652F;&#x6301;&#x8D1F;&#x6570;&#x7D22;&#x5F15;&#xFF09;&#x3002;</p><p><strong>&#x601D;&#x8DEF;</strong>&#xFF1A;&#x7531;&#x4E8E;&#x5728; JS &#x4E2D;&#xFF0C;&#x6570;&#x7EC4;&#x65B9;&#x62EC;&#x53F7;&#x8BED;&#x6CD5;&#x4E2D;&#x4E0D;&#x652F;&#x6301;&#x5192;&#x53F7;&#xFF0C;&#x53EA;&#x80FD;&#x66F2;&#x7EBF;&#x6551;&#x56FD;&#xFF0C;&#x4F7F;&#x7528;&#x8FD9;&#x6837; <code>list[&quot;10:20:3&quot;]</code> &#x7684;&#x5F62;&#x5F0F;&#x3002;&#x53EA;&#x9700;&#x8981;&#x5B9E;&#x73B0; <code>get</code> trap &#x5373;&#x53EF;&#x3002;</p><pre><code class="js">// Python-like array slicing

function pythonIndex(array) {

    function parse(value, defaultValue, resolveNegative) {
        if (value === undefined || isNaN(value)) {
            value = defaultValue;
        } else if (resolveNegative &amp;&amp; value &lt; 0) {
            value += array.length;
        }
        return value;
    }
    
    function slice(prop) {
        if (typeof prop === &apos;string&apos; &amp;&amp; prop.match(/^[+-\d:]+$/)) {
            // no &apos;:&apos;, return a single item
            if (prop.indexOf(&apos;:&apos;) === -1) {
                let index = parse(parseInt(prop, 10), 0, true);
                console.log(prop, &apos;\t\t&apos;, array[index]);
                return array[index];
            }                
            // otherwise: parse the slice string
            let [start, end, step] = prop.split(&apos;:&apos;).map(part =&gt; parseInt(part, 10));
            step = parse(step, 1, false);
            if (step === 0) {
                throw new RangeError(&apos;Step can\&apos;t be zero&apos;);
            }
            if (step &gt; 0) {
                start = parse(start, 0, true);
                end = parse(end, array.length, true);
            } else {
                start = parse(start, array.length - 1, true);
                end = parse(end, -1, true);
            }
            // slicing
            let result = [];
            for (let i = start; start &lt;= end ? i &lt; end : i &gt; end; i += step) {
                result.push(array[i]);
            }
            console.log(prop, &apos;\t&apos;, JSON.stringify(result));
            return result;
        }
    }

    const handler = {
        get (arr, prop) {
            return slice(prop) || Reflect.get(array, prop);
        }
    };
    return new Proxy(array, handler);
}


// try it out
let values = [0,1,2,3,4,5,6,7,8,9],
    pyValues = pythonIndex(values);

console.log(JSON.stringify(values));

pyValues[&apos;-1&apos;];      // 9
pyValues[&apos;0:3&apos;];     // [0,1,2]    
pyValues[&apos;8:5:-1&apos;];  // [8,7,6]
pyValues[&apos;-8::-1&apos;];  // [2,1,0]
pyValues[&apos;::-1&apos;];    // [9,8,7,6,5,4,3,2,1,0]
pyValues[&apos;4::2&apos;];    // [4,6,8]

// &#x4E0D;&#x5F71;&#x54CD;&#x6B63;&#x5E38;&#x7684;&#x7D22;&#x5F15;
pyValues[3];         // 3</code></pre><h2>&#x5C0F;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x603B;&#x7ED3;&#x4E86;&#x81EA;&#x5DF1;&#x5B66;&#x4E60; ES6 &#x5143;&#x7F16;&#x7A0B;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#xFF08;Symbols &amp; Proxy &amp; Reflect&#xFF09;&#x7684;&#x7406;&#x89E3;&#x3001;&#x6559;&#x7A0B;&#x6587;&#x6863; &#x548C; &#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x3002;</p><p>&#x7531;&#x4E8E;&#x6559;&#x7A0B;&#x6587;&#x6863;&#x548C;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x5C06;&#x968F;&#x7740;&#x5B66;&#x4E60;&#x7684;&#x8FDB;&#x884C;&#x5C06;&#x589E;&#x591A;&#xFF0C;&#x6240;&#x4EE5;&#x540E;&#x7EED;&#x8FD8;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x6709;&#x597D;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x6B22;&#x8FCE;&#x5230; <a href="https://github.com/boycgit/boycgit.github.io/issues/12" rel="nofollow noreferrer">issue</a> &#x4E2D;&#x56DE;&#x590D;&#x5171;&#x4EAB;&#x3002;</p><h2>Changelog</h2><ul><li>2018.09.22 &#x66F4;&#x65B0; <a href="https://segmentfault.com/a/1190000016133613#image-lazy">&#x56FE;&#x7247;&#x61D2;&#x52A0;&#x8F7D;</a> &#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF0C;&#x6539;&#x7528; <code>construct</code> trap &#x5B9E;&#x73B0;&#xFF1B;<strong>&#x66F4;&#x65B0;&#x539F;&#x56E0;</strong>&#xFF1A;bugfix&#xFF0C;&#x539F;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x6240;&#x521B;&#x5EFA;&#x7684; <code>img</code> &#x662F; proxy &#x5BF9;&#x8C61;&#xFF0C;&#x6267;&#x884C; <code>document.body.appendChild(img)</code> &#x5C06;&#x62A5;&#x9519;&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【资源集合】 ES6 元编程（Proxy & Reflect & Symbol）

## 原文链接
[https://segmentfault.com/a/1190000016133613](https://segmentfault.com/a/1190000016133613)

