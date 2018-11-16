---
title: '【译】Node.js 前端开发指南' 
date: 2018-11-15 21:20:48
hidden: true
slug: yqi5qcy0ga
categories: [reprint]
---

{{< raw >}}
<p><a href="https://www.zcfy.cc/article/node-js-guide-for-frontend-developers" rel="nofollow noreferrer">&#x4F17;&#x6210;&#x7FFB;&#x8BD1;</a></p><p><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html" rel="nofollow noreferrer">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p><p><a href="https://blog.bloomca.me/about" rel="nofollow noreferrer">&#x5173;&#x4E8E;&#x4F5C;&#x8005;</a></p><p>2018&#x5E74;6&#x6708;21&#x65E5;&#x51FA;&#x7248;<br>&#x200B;</p><blockquote>&#x672C;&#x6307;&#x5357;&#x9762;&#x5411;&#x4E86;&#x89E3;Javascript&#x4F46;&#x5C1A;&#x672A;&#x5341;&#x5206;&#x719F;&#x6089;Node.js&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x3002;&#x6211;&#x8FD9;&#x91CC;&#x4E0D;&#x4E13;&#x6CE8;&#x4E8E;&#x8BED;&#x8A00;&#x672C;&#x8EAB; -- Node.js &#x4F7F;&#x7528; V8 &#x5F15;&#x64CE;&#xFF0C;&#x6240;&#x4EE5;&#x548C;Google Chrome&#x7684;&#x89E3;&#x91CA;&#x5668;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x70B9;&#x60A8;&#x6216;&#x8BB8;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#xFF08;&#x4F46;&#x662F;&#xFF0C;&#x5B83;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7684;VM&#x4E0A;&#x8FD0;&#x884C;&#xFF0C;&#x8BF7;&#x53C2;&#x9605; <a href="https://github.com/nodejs/node-chakracore" rel="nofollow noreferrer">node-chakracore</a>&#xFF09;</blockquote><h2>&#x76EE;&#x5F55;</h2><ul><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#node-version" rel="nofollow noreferrer">Node &#x7248;&#x672C;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#no-babel-is-needed" rel="nofollow noreferrer">&#x4E0D;&#x9700;&#x8981;Babel</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#callback-style" rel="nofollow noreferrer">&#x56DE;&#x8C03;&#x98CE;&#x683C;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#event-loop" rel="nofollow noreferrer">&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#event-emitters" rel="nofollow noreferrer">&#x4E8B;&#x4EF6;&#x53D1;&#x5C04;&#x5668;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#streams" rel="nofollow noreferrer">&#x6D41;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#module-system" rel="nofollow noreferrer">&#x6A21;&#x5757;&#x7CFB;&#x7EDF;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#environment-variables" rel="nofollow noreferrer">&#x73AF;&#x5883;&#x53D8;&#x91CF;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#putting-everything-together" rel="nofollow noreferrer">&#x7EFC;&#x5408;&#x8FD0;&#x7528;</a></li><li><a href="https://blog.bloomca.me/2018/06/21/nodejs-guide-for-frontend-developers.html/#conclusion" rel="nofollow noreferrer">&#x603B;&#x7ED3;</a></li></ul><p>&#x200B;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x8DDF;Node.js&#x6253;&#x4EA4;&#x9053;&#xFF0C;&#x5373;&#x4F7F;&#x4F60;&#x662F;&#x4E00;&#x540D;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4EBA;&#x5458; -- <a href="https://docs.npmjs.com/misc/scripts" rel="nofollow noreferrer">npm&#x811A;&#x672C;</a>&#xFF0C;webpack&#x914D;&#x7F6E;&#xFF0C;gulp&#x4EFB;&#x52A1;&#xFF0C;<a href="https://webpack.js.org/api/node/" rel="nofollow noreferrer">&#x7A0B;&#x5E8F;&#x6253;&#x5305;</a> &#x6216; <a href="https://karma-runner.github.io/2.0/dev/public-api.html" rel="nofollow noreferrer">&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;</a>&#x7B49;&#x3002;&#x5373;&#x4F7F;&#x4F60;&#x771F;&#x7684;&#x4E0D;&#x9700;&#x8981;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x8FD9;&#x4E9B;&#x4EFB;&#x52A1;&#xFF0C;&#x4F46;&#x6709;&#x65F6;&#x5019;&#x4F60;&#x4F1A;&#x611F;&#x5230;&#x56F0;&#x60D1;&#xFF0C;&#x4F1A;&#x56E0;&#x4E3A;&#x7F3A;&#x5C11;Node.js&#x7684;&#x4E00;&#x4E9B;&#x6838;&#x5FC3;&#x6982;&#x5FF5;&#x800C;&#x4EE5;&#x975E;&#x5E38;&#x5947;&#x602A;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7F16;&#x7801;&#x3002;&#x719F;&#x6089;Node.js&#x4E4B;&#x540E;&#xFF0C;&#x60A8;&#x8FD8;&#x53EF;&#x4EE5;&#x8BA9;&#x67D0;&#x4E9B;&#x539F;&#x672C;&#x9700;&#x8981;&#x624B;&#x52A8;&#x64CD;&#x4F5C;&#x7684;&#x4E1C;&#x897F;&#x81EA;&#x52A8;&#x6267;&#x884C;&#xFF0C;&#x8BA9;&#x60A8;&#x53EF;&#x4EE5;&#x66F4;&#x81EA;&#x4FE1;&#x5730;&#x67E5;&#x770B;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x200B;&#x200B;&#x7F16;&#x5199;&#x66F4;&#x590D;&#x6742;&#x7684;&#x811A;&#x672C;&#x3002;<br>&#x200B;</p><h3>Node &#x7248;&#x672C;</h3><p>Node.js&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x4EE3;&#x7801;&#x6700;&#x5927;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x60A8;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x6765;&#x51B3;&#x5B9A;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x5B8C;&#x5168;&#x6E05;&#x695A;&#x5B83;&#x652F;&#x6301;&#x54EA;&#x4E9B;&#x7279;&#x6027; -- &#x60A8;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5177;&#x4F53;&#x7684;&#x9700;&#x6C42;&#x548C;&#x53EF;&#x7528;&#x7684;&#x670D;&#x52A1;&#x5668;&#x6765;&#x9009;&#x62E9;&#x4F7F;&#x7528;&#x54EA;&#x4E2A;&#x7248;&#x672C;&#x3002;</p><p>Node.js&#x6709;&#x4E00;&#x4E2A;&#x516C;&#x5F00;&#x53D1;&#x5E03;&#x65F6;&#x95F4;&#x8868;&#xFF0C;&#x544A;&#x8BC9;&#x6211;&#x4EEC;&#x5947;&#x6570;&#x7248;&#x672C;&#x6CA1;&#x6709;&#x88AB;&#x957F;&#x671F;&#x652F;&#x6301;&#x3002;&#x5F53;&#x524D;&#x7684;LTS&#xFF08;long-term support&#xFF09;&#x7248;&#x672C;&#x5C06;&#x88AB;&#x79EF;&#x6781;&#x5F00;&#x53D1;&#x5230;2019&#x5E74;4&#x6708;&#xFF0C;&#x7136;&#x540E;2019&#x5E74;12&#x6708;31&#x65E5;&#x4E4B;&#x524D;&#xFF0C;&#x901A;&#x8FC7;&#x66F4;&#x65B0;&#x5173;&#x952E;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x7EF4;&#x62A4;&#x3002;Node.js&#x65B0;&#x7248;&#x672C;&#x6B63;&#x5728;&#x79EF;&#x6781;&#x5F00;&#x53D1;&#xFF0C;&#x5B83;&#x4EEC;&#x5E26;&#x6765;&#x4E86;&#x8BB8;&#x591A;&#x65B0;&#x529F;&#x80FD;&#xFF0C;&#x4EE5;&#x53CA;&#x5B89;&#x5168;&#x6027;&#x548C;&#x6027;&#x80FD;&#x65B9;&#x9762;&#x7684;&#x63D0;&#x5347;&#x3002;&#x8FD9;&#x4E5F;&#x8BB8;&#x662F;&#x4F7F;&#x7528;&#x5F53;&#x524D;&#x6D3B;&#x8DC3;&#x7248;&#x672C;&#x7684;&#x4E00;&#x4E2A;&#x597D;&#x7406;&#x7531;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x6CA1;&#x6709;&#x4EBA;&#x771F;&#x6B63;&#x5F3A;&#x8FEB;&#x4F60;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x4F7F;&#x7528;&#x65E7;&#x7248;&#x672C;&#x4E5F;&#x53EF;&#x4EE5;&#xFF0C;&#x7B49;&#x5230;&#x60A8;&#x89C9;&#x5F97;&#x65F6;&#x673A;&#x5408;&#x9002;&#x518D;&#x66F4;&#x65B0;&#x5C31;&#x884C;&#x3002;</p><p>Node.js&#x88AB;&#x5E7F;&#x6CDB;&#x5E94;&#x7528;&#x4E8E;&#x73B0;&#x4EE3;&#x524D;&#x7AEF;&#x5DE5;&#x5177;&#x94FE; - &#x6211;&#x4EEC;&#x5F88;&#x96BE;&#x60F3;&#x8C61;&#x4E00;&#x4E2A;&#x73B0;&#x4EE3;&#x9879;&#x76EE;&#x6CA1;&#x6709;&#x4F7F;&#x7528;Node&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x4EFB;&#x4F55;&#x5904;&#x7406;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x60A8;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x719F;&#x6089;nvm&#xFF08;node&#x7248;&#x672C;&#x7BA1;&#x7406;&#x5668;&#xFF09;&#xFF0C;&#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x540C;&#x65F6;&#x5B89;&#x88C5;&#x51E0;&#x4E2A;Node&#x7248;&#x672C;&#xFF0C;&#x4E3A;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x9009;&#x62E9;&#x6B63;&#x786E;&#x7684;&#x7248;&#x672C;&#x3002;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x5DE5;&#x5177;&#x7684;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#xFF0C;&#x4E0D;&#x540C;&#x9879;&#x76EE;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;Node&#x7248;&#x672C;&#xFF0C;&#x5E76;&#x4E14;&#x4F60;&#x4E0D;&#x60F3;&#x6C38;&#x8FDC;&#x4FDD;&#x6301;&#x5B83;&#x4EEC;&#x540C;&#x6B65;&#xFF0C;&#x60A8;&#x53EA;&#x60F3;&#x4FDD;&#x7559;&#x7F16;&#x5199;&#x548C;&#x6D4B;&#x8BD5;&#x5B83;&#x4EEC;&#x7684;&#x73AF;&#x5883;&#x3002;&#x5176;&#x5B83;&#x8BED;&#x8A00;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x8FD9;&#x6837;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x4F8B;&#x5982;&#x7528;&#x4E8E;Python&#x7684;virtualenv&#xFF0C;&#x7528;&#x4E8E;Ruby&#x7684;rbenv&#x7B49;&#x7B49;&#x3002;</p><h3>&#x4E0D;&#x9700;&#x8981;Babel</h3><p>&#x7531;&#x4E8E;&#x60A8;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x9009;&#x62E9;&#x4EFB;&#x4F55;Node.js&#x7248;&#x672C;&#xFF0C;&#x6240;&#x4EE5;&#x60A8;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x4F7F;&#x7528;LTS&#x7248;&#x672C;&#x3002;&#x8BE5;&#x7248;&#x672C;&#x5728;&#x672C;&#x6587;&#x64B0;&#x5199;&#x65F6;&#x4E3A;8.11.3&#xFF0C;&#x51E0;&#x4E4E;&#x652F;&#x6301;&#x6240;&#x6709;ECMAScript 2015&#x7684;&#x89C4;&#x8303;&#xFF0C;&#x9664;&#x4E86;&#x5C3E;&#x9012;&#x5F52;&#x3002;</p><p>&#x8FD9;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;Babel&#xFF0C;&#x9664;&#x975E;&#x60A8;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x65E7;&#x7684;Node.js&#x7248;&#x672C;&#xFF0C;&#x9700;&#x8981;&#x8F6C;&#x6362;JSX&#xFF0C;&#x6216;&#x8005;&#x9700;&#x8981;&#x5176;&#x5B83;&#x524D;&#x6CBF;&#x7684;&#x8F6C;&#x6362;&#x5668;&#x3002;&#x5728;&#x5B9E;&#x8DF5;&#x4E2D;&#xFF0C;Babel&#x5E76;&#x4E0D;&#x662F;&#x90A3;&#x4E48;&#x91CD;&#x8981;&#xFF0C;&#x6240;&#x4EE5;&#x60A8;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x548C;&#x7F16;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x540C;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x4EFB;&#x4F55;&#x7F16;&#x8BD1;&#x5668; -- &#x8FD9;&#x4E2A;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x9057;&#x5FD8;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x5929;&#x624D;&#x3002;</p><p>&#x6211;&#x4EEC;&#x4E5F;&#x4E0D;&#x9700;&#x8981;webpack&#x6216;browserify&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x6CA1;&#x6709;&#x5DE5;&#x5177;&#x6765;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801; -- &#x5982;&#x679C;&#x60A8;&#x5728;&#x5F00;&#x53D1;&#x7C7B;&#x4F3C;Web&#x670D;&#x52A1;&#x5668;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;nodemon&#xFF0C;&#x5728;&#x6587;&#x4EF6;&#x66F4;&#x6539;&#x540E;&#x6765;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x3002;</p><p>&#x800C;&#x4E14;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x4E0D;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x4F20;&#x9001;&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x9700;&#x8981;&#x7F29;&#x5C0F;&#x5B83; -- &#x7701;&#x4E86;&#x4E00;&#x6B65;&#xFF1A;&#x60A8;&#x53EA;&#x9700;&#x539F;&#x5C01;&#x4E0D;&#x52A8;&#x5730;&#x4F7F;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x771F;&#x7684;&#x5F88;&#x795E;&#x5947;&#xFF01;</p><h3>&#x56DE;&#x8C03;&#x98CE;&#x683C;</h3><p>&#x4EE5;&#x524D;&#xFF0C;Node.js&#x4E2D;&#x7684;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x5E26;&#x6709;&#x7B7E;&#x540D;<code>&#xFF08;err&#xFF0C;data&#xFF09;</code>&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x5176;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4EE3;&#x8868;&#x9519;&#x8BEF;&#x4FE1;&#x606F; - &#x5982;&#x679C;&#x5B83;&#x4E3A;null&#xFF0C;&#x5219;&#x5168;&#x90E8;&#x6B63;&#x786E;&#xFF0C;&#x5426;&#x5219;&#x60A8;&#x5FC5;&#x987B;&#x5904;&#x7406;&#x9519;&#x8BEF;&#x3002;&#x8FD9;&#x4E9B;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x4F1A;&#x5728;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x54CD;&#x5E94;&#x540E;&#x8C03;&#x7528;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x8BFB;&#x53D6;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><pre><code class="javascript">const fs = require(&apos;fs&apos;);
fs.readFile(&apos;myFile.js&apos;, (err, file) =&gt; {
  if (err) {
    console.error(&apos;There was an error reading file :(&apos;);
    // process is a global object in Node
   // https://nodejs.org/api/process.html#process_process_exit_code
   process.exit(1);
  }

    // do something with file content
});</code></pre><p>&#x6211;&#x4EEC;&#x5F88;&#x5FEB;&#x5C31;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x79CD;&#x98CE;&#x683C;&#x5F88;&#x96BE;&#x7F16;&#x5199;&#x53EF;&#x8BFB;&#x548C;&#x53EF;&#x7EF4;&#x62A4;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x751A;&#x81F3;&#x9020;&#x6210;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x3002;&#x540E;&#x6765;&#xFF0C;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x539F;&#x751F;&#x7684;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x65B9;&#x5F0F; <code>Promise</code>&#x88AB;&#x5F15;&#x5165;&#x4E86;&#x3002;&#x5B83;&#x5728;ECMAScript 2015&#x4E0A;&#x6807;&#x51C6;&#x5316;&#xFF08;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x548C;Node.js&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF09;&#x3002;&#x8FD1;&#x6765;&#xFF0C;<code>async / await</code> &#x5728;ECMAScript 2017&#x4E2D;&#x6807;&#x51C6;&#x5316;&#x4E86;&#xFF0C;Node.js 7.6+ &#x90FD;&#x652F;&#x6301;&#x8FD9;&#x4E2A;&#x89C4;&#x8303;&#xFF0C;&#x6240;&#x4EE5;&#x60A8;&#x53EF;&#x4EE5;&#x5728;LTS&#x7248;&#x672C;&#x4E2D;&#x4F7F;&#x7528;&#x5B83;&#x3002;</p><p>&#x6709;&#x4E86; <code>Promise</code>&#xFF0C;&#x6211;&#x4EEC;&#x907F;&#x514D;&#x4E86;&#x201C;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x201D;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x662F;&#x65E7;&#x4EE3;&#x7801;&#x548C;&#x8BB8;&#x591A;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x4ECD;&#x7136;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x7684;&#x65B9;&#x5F0F;&#x3002;&#x5C06;&#x5B83;&#x4EEC;&#x8F6C;&#x6362;&#x4E3A; <code>Promise</code> &#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x96BE; -- &#x4E3A;&#x4E86;&#x9610;&#x91CA;&#x6E05;&#x695A;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;fs.readFile&#x8F6C;&#x6210;<code>Promise</code>&#xFF1A;</p><pre><code class="javascript">const fs = require(&apos;fs&apos;);
function readFile(...arguments) {
  return new Promise((resolve, reject) =&gt; {
    fs.readFile(...arguments, (err, data) =&gt; {
      if (err) {
         reject(err);
        } else {
          resolve(data);
        }
    });
  });
}
</code></pre><p>&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x5730;&#x6269;&#x5C55;&#x5230;&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5185;&#x7F6E;&#x7684;utils&#x6A21;&#x5757;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x51FD;&#x6570; - <code>utils.promisify</code>&#x3002;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><pre><code class="javascript">const util = require(&apos;util&apos;);
const fs = require(&apos;fs&apos;);
const stat = util.promisify(fs.stat);

stat(&apos;.&apos;).then((stats) =&gt; {
  // Do something with stats
}).catch((error) =&gt; {
  // Handle the error.
});</code></pre><p>Node.js&#x6838;&#x5FC3;&#x56E2;&#x961F;&#x660E;&#x767D;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ECE;&#x65E7;&#x98CE;&#x683C;&#x4E2D;&#x8FC1;&#x79FB;&#x51FA;&#x6765;&#xFF0C;&#x4ED6;&#x4EEC;&#x5C1D;&#x8BD5;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x7684;<code>promisified</code>&#x7248;&#x672C; - &#x5DF2;&#x7ECF;&#x6709;<code>promisified</code>&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x6A21;&#x5757;&#x4E86;&#xFF0C;&#x867D;&#x7136;&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x65F6;&#x5B83;&#x8FD8;&#x5728;&#x5904;&#x4E8E;&#x8BD5;&#x9A8C;&#x9636;&#x6BB5;&#x3002;</p><p>&#x4F60;&#x4ECD;&#x7136;&#x4F1A;&#x9047;&#x5230;&#x5F88;&#x591A;&#x65E7;&#x5F0F;&#x7684;&#x3001;&#x5E26;&#x56DE;&#x8C03;&#x7684;Node.js&#x4EE3;&#x7801;&#xFF0C;&#x4E3A;&#x4E86;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; <code>utils.promisify</code> &#x628A;&#x5B83;&#x4EEC;&#x5305;&#x88C5;&#x4E00;&#x4E0B;&#x3002;</p><h3>&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</h3><p>&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x51E0;&#x4E4E;&#x4E0E;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E0B;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x662F;&#x6709;&#x4E00;&#x4E9B;&#x6269;&#x5C55;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x7531;&#x4E8E;&#x8FD9;&#x4E2A;&#x4E3B;&#x9898;&#x6BD4;&#x8F83;&#x9AD8;&#x6DF1;&#xFF0C;&#x6211;&#x5C06;&#x5168;&#x9762;&#x8BB2;&#x89E3;&#x4E0B;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x5DEE;&#x5F02;&#xFF08;&#x6211;&#x4F1A;&#x91CD;&#x70B9;&#x5F3A;&#x8C03;&#x8FD9;&#x90E8;&#x5206;&#xFF0C;&#x8BA9;&#x60A8;&#x77E5;&#x9053;&#x54EA;&#x4E9B;&#x662F;Node.js&#x7279;&#x6709;&#x7684;&#xFF09;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016096225?w=692&amp;h=417" src="https://static.alili.tech/img/remote/1460000016096225?w=692&amp;h=417" alt="" title=""></span></p><h4>Node.js&#x4E2D;&#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</h4><p>JavaScript&#x5728;&#x6784;&#x5EFA;&#x65F6;&#x8003;&#x8651;&#x4E86;&#x5F02;&#x6B65;&#x884C;&#x4E3A;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4E0D;&#x4F1A;&#x9A6C;&#x4E0A;&#x6267;&#x884C;&#x6240;&#x6709;&#x64CD;&#x4F5C;&#x3002;&#x4EE5;&#x4E0B;&#x5217;&#x4E3E;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E8B;&#x4EF6;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x6309;&#x987A;&#x5E8F;&#x6267;&#x884C;:</p><blockquote>microtasks</blockquote><p>&#x4F8B;&#x5982;&#xFF0C;&#x7ACB;&#x5373;&#x5904;&#x7406;Promises&#xFF0C;&#x5982;Promise.resolve&#x3002;&#x5B83;&#x610F;&#x5473;&#x7740;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4F1A;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x4E2D;&#x88AB;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x5F97;&#x7B49;&#x5230;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x3002;</p><blockquote>process.nextTick</blockquote><p>&#x8FD9;&#x662F;Node.js&#x7279;&#x6709;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x4E0D;&#x5B58;&#x5728;&#x4E8E;&#x4EFB;&#x4F55;&#x6D4F;&#x89C8;&#x5668;&#xFF08;&#x4EE5;&#x53CA;&#x8FDB;&#x7A0B;&#x5BF9;&#x8C61;&#xFF09;&#x4E2D;&#x3002;&#x5B83;&#x7684;&#x884C;&#x4E3A;&#x7C7B;&#x4F3C;&#x4E8E;&#x5FAE;&#x4EFB;&#x52A1;(microtask)&#xFF0C;&#x4F46;&#x5177;&#x6709;&#x4F18;&#x5148;&#x7EA7;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5B83;&#x5C06;&#x5728;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x4E4B;&#x540E;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x5373;&#x4F7F;&#x4E4B;&#x524D;&#x5F15;&#x5165;&#x4E86;&#x5176;&#x4ED6;&#x5FAE;&#x4EFB;&#x52A1; - &#x8FD9;&#x662F;&#x5F88;&#x5371;&#x9669;&#x7684;&#xFF0C;&#x53EF;&#x80FD;&#x5BFC;&#x81F4;&#x65E0;&#x9650;&#x5FAA;&#x73AF;&#x3002;&#x4ECE;&#x547D;&#x540D;&#x4E0A;&#x8BB2;&#x662F;&#x4E0D;&#x5BF9;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x4E2D;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5728;&#x5B83;&#x7684;<code>next tick</code>&#x4E2D;&#x6267;&#x884C;&#x3002;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x517C;&#x5BB9;&#x6027;&#x539F;&#x56E0;&#xFF0C;&#x5B83;&#x53EF;&#x80FD;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x3002;</p><blockquote>setImmediate</blockquote><p>&#x867D;&#x7136;&#x5B83;&#x786E;&#x5B9E;&#x5B58;&#x5728;&#x4E8E;&#x67D0;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x4F46;&#x5E76;&#x672A;&#x5728;&#x6240;&#x6709;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8FBE;&#x5230;&#x4E00;&#x81F4;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x60A8;&#x9700;&#x8981;&#x975E;&#x5E38;&#x5C0F;&#x5FC3;&#x3002;&#x5B83;&#x7C7B;&#x4F3C;&#x4E8E; <code>setTimeout&#xFF08;0&#xFF09;</code>&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x6709;&#x65F6;&#x4F1A;&#x4F18;&#x5148;&#x4E8E;&#x5B83;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x547D;&#x540D;&#x4E5F;&#x4E0D;&#x662F;&#x6700;&#x597D;&#x7684; - &#x6211;&#x4EEC;&#x5728;&#x8C08;&#x8BBA;&#x4E0B;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x8FED;&#x4EE3;&#xFF0C;&#x5B83;&#x5E76;&#x4E0D;&#x662F;&#x771F;&#x6B63;&#x7684;<code>immidiate</code>&#x3002;</p><blockquote>setTimeout/setInterval</blockquote><p>&#x5B9A;&#x65F6;&#x5668;&#x5728;Node&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#x662F;&#x76F8;&#x540C;&#x7684;&#x3002;&#x5173;&#x4E8E;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x7684;&#x5EF6;&#x8FDF;&#x4E0D;&#x4EE3;&#x8868;&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x4E4B;&#x540E;&#x56DE;&#x8C03;&#x5C31;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#x3002;&#x5B83;&#x7684;&#x771F;&#x6B63;&#x542B;&#x4E49;&#x662F;&#xFF0C;&#x4E00;&#x65E6;&#x4E3B;&#x7EBF;&#x7A0B;&#x5B8C;&#x6210;&#x6240;&#x6709;&#x64CD;&#x4F5C;&#xFF08;&#x5305;&#x62EC;&#x5FAE;&#x4EFB;&#x52A1;&#xFF09;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x5176;&#x5B83;&#x5177;&#x6709;&#x66F4;&#x9AD8;&#x4F18;&#x5148;&#x7EA7;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;Node.js&#x5C06;&#x5728;&#x6B64;&#x65F6;&#x95F4;&#x4E4B;&#x540E;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p>&#x5F80;&#x4E0B;&#x770B;&#x6211;&#x4F1A;&#x7ED9;&#x51FA;&#x811A;&#x672C;&#x6267;&#x884C;&#x540E;&#x6B63;&#x786E;&#x7684;&#x8F93;&#x51FA;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x613F;&#x610F;&#xFF0C;&#x8BF7;&#x5C1D;&#x8BD5;&#x81EA;&#x5DF1;&#x5B8C;&#x6210;&#x5B83;&#xFF08;&#x5F53;&#x4E00;&#x56DE;&#x201C;JavaScript&#x89E3;&#x91CA;&#x5668;&#x201D;&#xFF09;&#xFF1A;</p><pre><code class="javascript">const fs = require(&apos;fs&apos;);
console.log(&apos;beginning of the program&apos;);
const promise = new Promise(resolve =&gt; {
  // function, passed to the Promise constructor
  // is executed synchronously!
  console.log(&apos;I am in the promise function!&apos;);
resolve(&apos;resolved message&apos;);
});
promise.then(() =&gt; {
  console.log(&apos;I am in the first resolved promise&apos;);
}).then(() =&gt; {
  console.log(&apos;I am in the second resolved promise&apos;);
});
process.nextTick(() =&gt; {
  console.log(&apos;I am in the process next tick now&apos;);
});
fs.readFile(&apos;index.html&apos;, () =&gt; {
  console.log(&apos;==================&apos;);
setTimeout(() =&gt; {
    console.log(&apos;I am in the callback from setTimeout with 0ms delay&apos;);
}, 0);
setImmediate(() =&gt; {
    console.log(&apos;I am from setImmediate callback&apos;);
});
});
setTimeout(() =&gt; {
  console.log(&apos;I am in the callback from setTimeout with 0ms delay&apos;);
}, 0);
setImmediate(() =&gt; {
  console.log(&apos;I am from setImmediate callback&apos;);
});
</code></pre><p>&#x6B63;&#x786E;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>node event-loop.js
beginning of the program
I am in the promise function!
I am in the process next tick now
I am in the first resolved promise
I am in the second resolved promise
I am in the callback from setTimeout with 0ms delay
I am from setImmediate callback
==================
I am from setImmediate callback
I am in the callback from setTimeout with 0ms delay</code></pre><p>&#x60A8;&#x53EF;&#x4EE5;&#x5728;Node.js&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x83B7;&#x53D6;&#x66F4;&#x591A;&#x6709;&#x5173;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x548C;process.nextTick&#x7684;&#x4FE1;&#x606F;&#x3002;</p><h3>&#x4E8B;&#x4EF6;&#x53D1;&#x5C04;&#x5668;</h3><p>Node.js&#x4E2D;&#x7684;&#x8BB8;&#x591A;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#x6D3E;&#x53D1;&#x6216;&#x63A5;&#x6536;&#x4E0D;&#x540C;&#x7684;&#x4E8B;&#x4EF6;&#x3002;&#x5B83;&#x6709;&#x4E00;&#x4E2A;EventEmitter&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x53D1;&#x5E03; - &#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x3002;&#x8FD9;&#x4E0E;&#x6D4F;&#x89C8;&#x5668;DOM&#x4E8B;&#x4EF6;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#xFF0C;&#x8BED;&#x6CD5;&#x7565;&#x6709;&#x4E0D;&#x540C;&#xFF0C;&#x7406;&#x89E3;&#x5B83;&#x6700;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x4EB2;&#x81EA;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E0B;&#xFF1A;</p><pre><code class="javascript">class EventEmitter {
  constructor() {
    this.events = {};
}
  checkExistence(event) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
  }
  once(event, cb) {
    this.checkExistence(event);
    const cbWithRemove = (...args) =&gt; {
          cb(...args);
        this.off(event, cbWithRemove);
      };
      this.events[event].push(cbWithRemove);
     }
  on(event, cb) {
    this.checkExistence(event);
    this.events[event].push(cb);
  }
  off(event, cb) {
    this.checkExistence(event);
    this.events[event] = this.events[event].filter(
      registeredCallback =&gt; registeredCallback !== cb
    );
  }
  emit(event, ...args) {
    this.checkExistence(event);
    this.events[event].forEach(cb =&gt; cb(...args));
    }
  }
</code></pre><blockquote>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x53EA;&#x663E;&#x793A;&#x6A21;&#x5F0F;&#x672C;&#x8EAB;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x9488;&#x5BF9;&#x786E;&#x5207;&#x7684;&#x529F;&#x80FD; - &#x8BF7;&#x4E0D;&#x8981;&#x5728;&#x60A8;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x4F7F;&#x7528;&#x5B83;&#xFF01;</blockquote><p>&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709;&#x57FA;&#x7840;&#x4EE3;&#x7801;&#xFF01;&#x5B83;&#x5141;&#x8BB8;&#x60A8;&#x8BA2;&#x9605;&#x4E8B;&#x4EF6;&#xFF0C;&#x7A0D;&#x540E;&#x53D6;&#x6D88;&#x8BA2;&#x9605;&#xFF0C;&#x5E76;&#x6D3E;&#x53D1;&#x4E0D;&#x540C;&#x7684;&#x4E8B;&#x4EF6;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x54CD;&#x5E94;&#x4F53;&#xFF0C;&#x8BF7;&#x6C42;&#x4F53;&#xFF0C;&#x6D41; - &#x5B83;&#x4EEC;&#x5B9E;&#x9645;&#x4E0A;&#x90FD;&#x6269;&#x5C55;&#x6216;&#x5B9E;&#x73B0;&#x4E86;EventEmitter&#xFF01;</p><p>&#x6B63;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5982;&#x6B64;&#x7B80;&#x5355;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x6240;&#x4EE5;&#x88AB;&#x7528;&#x4E8E;&#x8BB8;&#x591A;&#x7684;NPM&#x5305;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x76F8;&#x540C;&#x7684;&#x4E8B;&#x4EF6;&#x53D1;&#x5C04;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x3002;</p><h3>&#x6D41;</h3><blockquote>&#x201C;Streams&#x662F;Node.js&#x6700;&#x597D;&#x7528;&#x3001;&#x6700;&#x5BB9;&#x6613;&#x88AB;&#x8BEF;&#x89E3;&#x7684;&#x6982;&#x5FF5;&#x3002;&#x201D;</blockquote><p>&#x591A;&#x7C73;&#x5C3C;&#x514B;&#x5854;&#x5C14;(Dominic Tarr)</p><p>Streams&#x5141;&#x8BB8;&#x60A8;&#x4EE5;&#x5757;&#x7684;&#x5F62;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x5B8C;&#x6574;&#x64CD;&#x4F5C;&#xFF08;&#x5982;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF09;&#x3002;&#x4E3A;&#x4E86;&#x7406;&#x89E3;&#x5B83;&#x4EEC;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5411;&#x7528;&#x6237;&#x8FD4;&#x56DE;&#x4EFB;&#x610F;&#x5927;&#x5C0F;&#x7684;&#x8BF7;&#x6C42;&#x6587;&#x4EF6;&#x3002;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><pre><code class="javascript">function (req, res) {
  const filename = req.url.slice(1);
  fs.readFile(filename, (err, data) =&gt; {
    if (err) {
        res.statusCode = 500;
        res.end(&apos;Something went wrong&apos;);
    } else {
       res.end(data);
    }
  });
}</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5728;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x7684;&#x673A;&#x5668;&#x4E0A;&#xFF0C;&#x4F46;&#x5B83;&#x53EF;&#x4E5F;&#x80FD;&#x4F1A;&#x5931;&#x8D25; - &#x60A8;&#x770B;&#x51FA;&#x95EE;&#x9898;&#x4E86;&#x5417;&#xFF1F;&#x5982;&#x679C;&#x6587;&#x4EF6;&#x592A;&#x5927;&#xFF0C;&#x6211;&#x4EEC;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x65F6;&#x5C31;&#x4F1A;&#x9047;&#x5230;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x653E;&#x5165;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8DB3;&#x591F;&#x7684;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF0C;&#x8FD9;&#x5C06;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x5F88;&#x591A;&#x5E76;&#x53D1;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4E5F;&#x4E0D;&#x4F1A;&#x751F;&#x6548; - &#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x5C06;&#x6570;&#x636E;&#x5BF9;&#x8C61;&#x4FDD;&#x7559;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x76F4;&#x5230;&#x6211;&#x4EEC;&#x53D1;&#x9001;&#x4E86;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x6211;&#x4EEC;&#x6839;&#x672C;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6; - &#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x4ECE;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x8FD4;&#x56DE;&#x5B83;&#xFF0C;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x4E0D;&#x4F1A;&#x67E5;&#x770B;&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5B83;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x7ACB;&#x5373;&#x8FD4;&#x56DE;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x6765;&#x91CA;&#x653E;&#x6211;&#x4EEC;&#x7684;&#x5185;&#x5B58;&#xFF0C;&#x91CD;&#x590D;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x4E86;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x53D1;&#x9001;&#x3002;&#x8FD9;&#x662F;&#x5BF9; <code>Streams</code> &#x7684;&#x7B80;&#x77ED;&#x4ECB;&#x7ECD; - &#x6211;&#x4EEC;&#x6709;&#x4E00;&#x79CD;&#x4EE5;&#x5757;&#x7684;&#x5F62;&#x5F0F;&#x6765;&#x63A5;&#x6536;&#x6570;&#x636E;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x5E76;&#x4E14; <em>&#x6211;&#x4EEC;</em> &#x51B3;&#x5B9A;&#x5982;&#x4F55;&#x5904;&#x7406;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5904;&#x7406;&#xFF1A;</p><pre><code class="javascript">function (req, res) {
  const filename = req.url.slice(1);
  const filestream = fs.createReadStream(filename, { encoding: &apos;utf-8&apos; });
  let result = &apos;&apos;;
  filestream.on(&apos;data&apos;, chunk =&gt; {
    result += chunk;
  });
  filestream.on(&apos;end&apos;, () =&gt; {
    res.end(result);
  });
  // if file does not exist, error callback will be called
  filestream.on(&apos;error&apos;, () =&gt; {
    res.statusCode = 500;
  res.end(&apos;Something went wrong&apos;);
  });
}</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; <code>&#x6D41;</code> &#x6765;&#x8BFB;&#x53D6;&#x6587;&#x4EF6; - &#x8FD9;&#x4E2A;&#x6D41;&#x6267;&#x884C;EventEmitter&#x8FD9;&#x4E2A;&#x7C7B;&#xFF0C;&#x5728;<code>data</code>&#x4E8B;&#x4EF6;&#x4E0A;&#x6211;&#x4EEC;&#x63A5;&#x6536;&#x4E0B;&#x4E00;&#x4E2A;&#x5757;&#xFF0C;&#x5728;<code>end</code>&#x4E8B;&#x4EF6;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x4FE1;&#x53F7;&#xFF0C;&#x8868;&#x793A;&#x6D41;&#x5DF2;&#x7ED3;&#x675F;&#xFF0C;&#x7136;&#x540E;&#x8BFB;&#x53D6;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x5B9E;&#x73B0;&#x8DDF;&#x524D;&#x9762;&#x7684;&#x4E00;&#x6837; - &#x6211;&#x4EEC;&#x7B49;&#x5F85;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x88AB;&#x8BFB;&#x53D6;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x54CD;&#x5E94;&#x4E2D;&#x8FD4;&#x56DE;&#x5B83;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x5B83;&#x4E5F;&#x6709;&#x540C;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF1A;&#x6211;&#x4EEC;&#x5C06;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x4FDD;&#x7559;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53D1;&#x9001;&#x56DE;&#x6765;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x54CD;&#x5E94;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x5B9E;&#x73B0;&#x4E86;&#x53EF;&#x5199;&#x6D41;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x4FE1;&#x606F;&#x5199;&#x5165;&#x8BE5;&#x6D41;&#x800C;&#x4E0D;&#x5C06;&#x5176;&#x4FDD;&#x7559;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF1A;</p><pre><code class="javascript">function (req, res) {
  const filename = req.u&#xE5;rl.slice(1);
  const filestream = fs.createReadStream(filename, { encoding: &apos;utf-8&apos; });
  filestream.on(&apos;data&apos;, chunk =&gt; {
    res.write(chunk);
  });
  filestream.on(&apos;end&apos;, () =&gt; {
    res.end();
  });
  // if file does not exist, error callback will be called
  filestream.on(&apos;error&apos;, () =&gt; {
    res.statusCode = 500;
    res.end(&apos;Something went wrong&apos;);
  });
}</code></pre><blockquote>&#x54CD;&#x5E94;&#x4F53;&#x5B9E;&#x73B0;&#x53EF;&#x5199;&#x6D41;&#xFF0C;<code>fs.createReadStream</code> &#x521B;&#x5EFA;&#x53EF;&#x8BFB;&#x6D41;&#xFF0C;&#x8FD8;&#x6709;&#x53CC;&#x5411;&#x548C;&#x8F6C;&#x6362;&#x6D41;&#x3002;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x533A;&#x522B;&#x4EE5;&#x53CA;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#xFF0C;&#x4E0D;&#x5728;&#x672C;&#x6559;&#x7A0B;&#x7684;&#x8303;&#x56F4;&#x5185;&#xFF0C;&#x4F46;&#x662F;&#x4E86;&#x89E3;&#x5B83;&#x4EEC;&#x7684;&#x5B58;&#x5728;&#x8FD8;&#x662F;&#x5927;&#x6709;&#x88E8;&#x76CA;&#x7684;&#x3002;</blockquote><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x7ED3;&#x679C;&#x53D8;&#x91CF;&#x4E86;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;&#x5DF2;&#x8BFB;&#x7684; <code>&#x5757;</code> &#x7ACB;&#x5373;&#x5199;&#x5165;&#x54CD;&#x5E94;&#x4F53;&#xFF0C;&#x4E0D;&#x5C06;&#x5B83;&#x4FDD;&#x7559;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF01;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5927;&#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;&#x9AD8;&#x5E76;&#x53D1;&#x8BF7;&#x6C42; - &#x56E0;&#x4E3A;&#x6587;&#x4EF6;&#x6CA1;&#x6709;&#x88AB;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x8D85;&#x51FA;&#x5185;&#x5B58;&#x6240;&#x80FD;&#x627F;&#x8F7D;&#x7684;&#x6570;&#x91CF;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x4E00;&#x4E2A;&#x6D41;&#xFF08;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF09;&#x4E2D;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x5199;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#xFF08;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF09;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x4E8B;&#x7269;&#x5177;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5EF6;&#x8FDF;&#x3002;&#x8FD9;&#x91CC;&#x5F3A;&#x8C03;&#x662F;&#x771F;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x7ECF;&#x8FC7;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x54CD;&#x5E94;&#x6D41;&#x5C06;&#x4E0D;&#x582A;&#x91CD;&#x8D1F;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x8981;&#x6162;&#x5F97;&#x591A;&#x3002;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#x5BF9;&#x80CC;&#x538B;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;Node&#x6709;&#x4E00;&#x4E2A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x6BCF;&#x4E2A;&#x53EF;&#x8BFB;&#x6D41;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x7BA1;&#x9053;&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x5C06;&#x6240;&#x6709;&#x6570;&#x636E;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x4E0E;&#x5176;&#x8D1F;&#x8F7D;&#x76F8;&#x5173;&#x7684;&#x7ED9;&#x5B9A;&#x6D41;&#x4E2D;&#xFF1A;&#x5982;&#x679C;&#x5B83;&#x6B63;&#x5FD9;&#xFF0C;&#x5B83;&#x5C06;&#x6682;&#x505C;&#x539F;&#x59CB;&#x6D41;&#x5E76;&#x6062;&#x590D;&#x5B83;&#x3002;&#x4F7F;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x4EE3;&#x7801;&#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p><pre><code class="javascript">function (req, res) {
  const filename = req.url.slice(1);
  const filestream = fs.createReadStream(filename, { encoding: &apos;utf-8&apos; });
  filestream.pipe(res);
  // if file does not exist, error callback will be called
  filestream.on(&apos;error&apos;, () =&gt; {
    res.statusCode = 500;
    res.end(&apos;Something went wrong&apos;);
  });
}</code></pre><blockquote>&#x5728;Node&#x7684;&#x5386;&#x53F2;&#x8FDB;&#x7A0B;&#x4E2D;&#xFF0C;Streams&#x6539;&#x53D8;&#x4E86;&#x51E0;&#x6B21;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x9605;&#x8BFB;&#x65E7;&#x624B;&#x518C;&#x65F6;&#x8981;&#x683C;&#x5916;&#x5C0F;&#x5FC3;&#xFF0C;&#x5E76;&#x7ECF;&#x5E38;&#x67E5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF01;</blockquote><h4>&#x6A21;&#x5757;&#x7CFB;&#x7EDF;</h4><p>Node.js&#x4F7F;&#x7528;commonjs&#x6A21;&#x5757;&#x3002;&#x60A8;&#x6216;&#x8BB8;&#x4F7F;&#x7528;&#x8FC7; - &#x6BCF;&#x6B21;&#x4F7F;&#x7528;require&#x6765;&#x83B7;&#x53D6;webpack&#x914D;&#x7F6E;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x60A8;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x4F7F;&#x7528;&#x4E86;commonjs&#x6A21;&#x5757;; &#x6BCF;&#x6B21;&#x58F0;&#x660E; <code>module.exports</code> &#x65F6;&#x4E5F;&#x5728;&#x4F7F;&#x7528;&#x5B83;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x60A8;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x770B;&#x5230;&#x50CF; <code>exports.some = {}</code> &#x8FD9;&#x6837;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x6CA1;&#x6709; <code>module</code>&#xFF0C;&#x5728;&#x8FD9;&#x4E00;&#x8282;&#x4E2D;&#x6211;&#x4EEC;&#x5C06;&#x770B;&#x4E0B;&#x5B83;&#x7A76;&#x7ADF;&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x8BA8;&#x8BBA;commonjs&#x6A21;&#x5757;&#xFF0C;&#x5B83;&#x4EEC;&#x901A;&#x5E38;&#x90FD;&#x6709; <code>.js</code> &#x7684;&#x6269;&#x5C55;&#xFF0C;&#x800C;&#x4E0D;&#x662F; <code>.esm / .mjs</code> &#x6587;&#x4EF6;&#xFF08;ECMAScript&#x6A21;&#x5757;&#xFF09;&#xFF0C;&#x5B83;&#x4EEC;&#x5141;&#x8BB8;&#x60A8;&#x4F7F;&#x7528; <code>import/export</code> &#x7684;&#x8BED;&#x6CD5;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x662F;&#x8981;&#x660E;&#x767D;&#xFF0C;webpack&#x548C;browserify&#xFF08;&#x4EE5;&#x53CA;&#x5176;&#x5B83;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF09;&#x4F7F;&#x7528;&#x81EA;&#x5DF1;&#x7684;<code>require</code>&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x8BF7;&#x4E0D;&#x8981;&#x6DF7;&#x6DC6; - &#x8FD9;&#x91CC;&#x4E0D;&#x8BB2;&#x89E3;&#x5B83;&#x4EEC;&#xFF0C;&#x53EA;&#x8981;&#x660E;&#x767D;&#x5B83;&#x4EEC;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x4E1C;&#x897F;&#x5C31;&#x884C;&#xFF08;&#x5373;&#x4F7F;&#x5B83;&#x4EEC;&#x8868;&#x73B0;&#x5F97;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#xFF09;&#x3002;</p><p>&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5728;&#x54EA;&#x91CC;&#x83B7;&#x5F97;&#x8FD9;&#x4E9B;&#x201C;&#x5168;&#x5C40;&#x201D;&#x5BF9;&#x8C61;&#xFF0C;&#x5982; <code>module</code>&#xFF0C;<code>requier</code> &#x548C; <code>exports</code> &#xFF1F;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x662F;Node.js&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x6DFB;&#x52A0;&#x7684; - &#x5B83;&#x4E0D;&#x662F;&#x4EC5;&#x6267;&#x884C;&#x7ED9;&#x5B9A;&#x7684;javascript&#x6587;&#x4EF6;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5C06;&#x5B83;&#x5305;&#x542B;&#x5728;&#x5177;&#x6709;&#x6240;&#x6709;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#xFF1A;</p><pre><code>function (exports, require, module, __filename, __dirname) {
  // your module
}</code></pre><p>&#x60A8;&#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x6BB5;&#x6765;&#x67E5;&#x770B;&#x8FD9;&#x4E2A;&#x5305;&#xFF1A;</p><p><code>1node -e &quot;console.log(require(&apos;module&apos;).wrapper)&quot;</code></p><p>&#x8FD9;&#x4E9B;&#x662F;&#x6CE8;&#x5165;&#x5230;&#x6A21;&#x5757;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x201C;&#x5168;&#x5C40;&#x201D;&#x53D8;&#x91CF;&#x4F7F;&#x7528;&#xFF0C;&#x5373;&#x4F7F;&#x5B83;&#x4EEC;&#x4E0D;&#x662F;&#x771F;&#x6B63;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3002;&#x6211;&#x5F3A;&#x70C8;&#x5EFA;&#x8BAE;&#x4F60;&#x7814;&#x7A76;&#x5B83;&#x4EEC;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x6A21;&#x5757;&#x53D8;&#x91CF;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5728;javascript&#x6587;&#x4EF6;&#x4E2D;&#x8C03;&#x7528; <code>console.log&#xFF08;module&#xFF09;</code>&#xFF0C;&#x5BF9;&#x6BD4;&#x4ECE; <code>main</code> &#x6587;&#x4EF6;&#x6253;&#x5370;&#x548C;&#x4ECE; <code>required</code> &#x7684;&#x6587;&#x4EF6;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B; <code>exports</code> &#x5BF9;&#x8C61; - &#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x4F8B;&#x5B50;&#xFF0C;&#x663E;&#x793A;&#x4E00;&#x4E9B;&#x4E0E;&#x4E4B;&#x76F8;&#x5173;&#x7684;&#x8B66;&#x544A;&#xFF1A;</p><pre><code class="javascript">exports.name = &apos;our name&apos;;
// this works

exports = { name: &apos;our name&apos; };
// this doesn&apos;t work

module.exports = { name: &apos;our name&apos; };
// this works!</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x53EF;&#x80FD;&#x4F1A;&#x8BA9;&#x4F60;&#x611F;&#x5230;&#x56F0;&#x60D1; &#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x6837;&#xFF1F;&#x7B54;&#x6848;&#x662F;<code>exports</code>&#x5BF9;&#x8C61;&#x7684;&#x672C;&#x8D28; - &#x5B83;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x6211;&#x4EEC;&#x7ED9;&#x5B83;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x7684;&#x60C5;&#x51B5;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x91CD;&#x5199;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x65E7;&#x7684;&#x5F15;&#x7528;&#x5C31;&#x4E0D;&#x5B58;&#x5728;&#x4E86;&#x3002;&#x5C3D;&#x7BA1;&#x5B83;&#x6CA1;&#x6709;&#x5B8C;&#x5168;&#x6D88;&#x5931; - <code>module.exports</code>&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; - &#x6240;&#x4EE5;&#x5B83;&#x4EEC;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5BF9;&#x5355;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x76F8;&#x540C;&#x5F15;&#x7528;&#xFF1A;</p><pre><code class="javascript">module.exports === exports;
// true
</code></pre><p>&#x6700;&#x540E;&#x4E00;&#x90E8;&#x5206;&#x662F; <code>require</code> - &#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x6A21;&#x5757;&#x540D;&#x79F0;&#x5E76;&#x8FD4;&#x56DE;&#x8BE5;&#x6A21;&#x5757;&#x7684; <code>exports&#x5BF9;&#x8C61;</code> &#x7684;&#x51FD;&#x6570;&#x3002;&#x5B83;&#x7A76;&#x7ADF;&#x662F;&#x5982;&#x4F55;&#x89E3;&#x6790;&#x6A21;&#x5757;&#x7684;&#xFF1F;&#x6709;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x89C4;&#x5219;&#xFF1A;</p><ul><li>&#x6839;&#x636E;&#x540D;&#x79F0;&#x68C0;&#x7D22;&#x6838;&#x5FC3;&#x6A21;&#x5757;</li><li>&#x5982;&#x679C;&#x8DEF;&#x5F84;&#x4EE5; <code>./</code> &#x6216; <code>../</code>&#x5F00;&#x5934;&#xFF0C;&#x5219;&#x5C1D;&#x8BD5;&#x89E3;&#x6790;&#x6587;&#x4EF6;</li><li>&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;&#x6587;&#x4EF6;&#xFF0C;&#x5C1D;&#x8BD5;&#x5728;&#x5176;&#x4E2D;&#x627E;&#x5230;&#x5305;&#x542B;<code>index.js</code>&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;</li><li><p>&#x5982;&#x679C;<code>path</code> &#x4E0D;&#x4EE5; <code>./</code> &#x6216; <code>../</code> &#x5F00;&#x5934;&#xFF0C;&#x8BF7;&#x8F6C;&#x5230;<code>node_modules /</code>&#x5E76;&#x68C0;&#x67E5;&#x6587;&#x4EF6;&#x5939;/&#x6587;&#x4EF6;&#xFF1A;</p><ul><li>&#x5728;&#x6211;&#x4EEC;&#x8FD0;&#x884C;&#x811A;&#x672C;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x4E2D;</li><li>&#x4E0A;&#x9762;&#x4E00;&#x7EA7;&#xFF0C;&#x76F4;&#x5230;&#x6211;&#x4EEC;&#x5230;&#x8FBE;<code>/ node_modules</code></li></ul></li></ul><p>&#x8FD8;&#x6709;&#x5176;&#x5B83;&#x4E00;&#x4E9B;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x60A8;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x6307;&#x5B9A;&#x53D8;&#x91CF; <code>NODE_PATH</code> &#x6765;&#x63D0;&#x4F9B;&#x67E5;&#x627E;&#x8DEF;&#x5F84;&#xFF0C;&#x8FD9;&#x4E5F;&#x8BB8;&#x5F88;&#x6709;&#x7528;&#x3002;&#x5982;&#x679C;&#x60A8;&#x8981;&#x67E5;&#x770B;&#x89E3;&#x6790;<code>node_modules</code>&#x7684;&#x786E;&#x5207;&#x987A;&#x5E8F;&#xFF0C;&#x53EA;&#x9700;&#x5728;&#x811A;&#x672C;&#x4E2D;&#x6253;&#x5370;&#x6A21;&#x5757;&#x5BF9;&#x8C61;&#x5E76;&#x67E5;&#x627E;<code>paths</code>&#x5C5E;&#x6027;&#x3002;&#x6211;&#x64CD;&#x4F5C;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x4E86;&#x5982;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><pre><code class="javascript">&#x279C; tmp node test.js

Module {
  id: &apos;.&apos;,
  exports: {},
  parent: null,
  filename: &apos;/Users/seva.zaikov/tmp/test.js&apos;,
  loaded: false,
  children: [],
  paths:
   [ &apos;/Users/seva.zaikov/tmp/node_modules&apos;,
     &apos;/Users/seva.zaikov/node_modules&apos;,
     &apos;/Users/node_modules&apos;,
     &apos;/node_modules&apos; ] }</code></pre><p>&#x5173;&#x4E8E; <code>require</code> &#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x6709;&#x8DA3;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF0C;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;require&#x8C03;&#x7528;&#x6A21;&#x5757;&#x88AB;&#x7F13;&#x5B58;&#x540E;&#xFF0C;&#x5C06;&#x4E0D;&#x4F1A;&#x518D;&#x6B21;&#x6267;&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x53EA;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x7684;export&#x5BF9;&#x8C61; - &#x8FD9;&#x610F;&#x5473;&#x7740;&#x4F60;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#x5E76;&#x786E;&#x4FDD;&#x5B83;&#x4F1A;&#x5728;&#x7B2C;&#x4E00;&#x6B21;require&#x8C03;&#x7528;&#x4E4B;&#x540E;&#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF08;&#x8FD9;&#x4E0D;&#x5B8C;&#x5168;&#x6B63;&#x786E; - &#x5982;&#x679C;&#x518D;&#x6B21;&#x9700;&#x8981;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4ECE;<code>require.cache</code>&#x4E2D;&#x5220;&#x9664;&#x6A21;&#x5757;id &#xFF0C;&#x7136;&#x540E;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#xFF09;</p><h3>&#x73AF;&#x5883;&#x53D8;&#x91CF;</h3><p>&#x6B63;&#x5982;&#x5728;<code>&#x5341;&#x4E8C;&#x56E0;&#x7D20;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;</code>&#x6240;&#x8FF0;&#xFF0C;&#x5C06;&#x914D;&#x7F6E;&#x5B58;&#x50A8;&#x5728;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E2D;&#x662F;&#x4E00;&#x79CD;&#x5F88;&#x597D;&#x7684;&#x505A;&#x6CD5;&#x3002;&#x60A8;&#x53EF;&#x4EE5;&#x4E3A;shell&#x4F1A;&#x8BDD;&#x8BBE;&#x7F6E;&#x53D8;&#x91CF;&#xFF1A;</p><p><code>export MY_VARIABLE=&quot;some variable value&quot;</code></p><blockquote>Node&#x662F;&#x4E00;&#x4E2A;&#x8DE8;&#x5E73;&#x53F0;&#x5F15;&#x64CE;&#xFF0C;&#x7406;&#x60F3;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5E94;&#x8BE5;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;&#x5E73;&#x53F0;&#x4E0A;&#x8FD0;&#x884C;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3002;&#x60A8;&#x9009;&#x62E9;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x6765;&#x8FD0;&#x884C;&#x60A8;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x901A;&#x5E38;&#x5B83;&#x662F;&#x4E00;&#x4E9B;Linux&#x5206;&#x53D1;&#x7248;&#xFF09;&#x3002;&#x6211;&#x7684;&#x793A;&#x4F8B;&#x4EC5;&#x6DB5;&#x76D6;MacOS / Linux&#xFF0C;&#x4E0D;&#x9002;&#x7528;&#x4E8E;Windows&#x3002;Windows&#x4E2D;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x8BED;&#x6CD5;&#x8DDF;&#x8FD9;&#x91CC;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x50CF;cross-env&#x8FD9;&#x6837;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F46;&#x5728;&#x5176;&#x5B83;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4F60;&#x4E5F;&#x5E94;&#x8BE5;&#x8BB0;&#x4F4F;&#x8FD9;&#x70B9;&#x3002;</blockquote><p>&#x60A8;&#x53EF;&#x4EE5;&#x628A;&#x4E0B;&#x9762;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x6DFB;&#x52A0;&#x5230; <code>bash / zsh</code> &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x4EFB;&#x4F55;&#x65B0;&#x7684;&#x7EC8;&#x7AEF;&#x4F1A;&#x8BDD;&#x4E2D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x60A8;&#x901A;&#x5E38;&#x53EA;&#x5728;&#x8FD0;&#x884C;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x65F6;&#xFF0C;&#x4E3A;&#x8FD9;&#x4E9B;&#x5B9E;&#x4F8B;&#x63D0;&#x4F9B;&#x7279;&#x6709;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p><p><code>APP_DB_URI=&quot;.....&quot; SECRET_KEY=&quot;secret key value&quot; node server.js</code></p><p>&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>process.env</code> &#x5BF9;&#x8C61;&#x6765;&#x8BBF;&#x95EE; Node.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#xFF1A;</p><pre><code class="javascript">const CONFIG = {
  db: process.env.APP_DB_URI,
  secret: process.env.SECRET_KEY
}</code></pre><h3>&#x7EFC;&#x5408;&#x8FD0;&#x7528;</h3><p>&#x5728;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;http&#x670D;&#x52A1;&#xFF0C;&#x5B83;&#x5C06;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x4EE5;url<code>/</code>&#x540E;&#x9762;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x547D;&#x540D;&#x3002;&#x5982;&#x679C;&#x6587;&#x4EF6;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x8FD4;&#x56DE; <code>404 Not Found</code> &#x7684;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x679C;&#x7528;&#x6237;&#x8BD5;&#x56FE;&#x6295;&#x673A;&#x53D6;&#x5DE7;&#xFF0C;&#x4F7F;&#x7528;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x6216;&#x5D4C;&#x5957;&#x8DEF;&#x5F84;&#xFF0C;&#x6211;&#x4EEC;&#x5219;&#x8FD4;&#x56DE;403&#x9519;&#x8BEF;&#x3002;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x4F7F;&#x7528;&#x8FC7;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x8BB0;&#x5F55;&#x5B83;&#x4EEC; - &#x8FD9;&#x6B21;&#x5B83;&#x5C06;&#x5305;&#x542B;&#x5927;&#x91CF;&#x7684;&#x4FE1;&#x606F;&#xFF1A;</p><pre><code class="javascript">// we require only built-in modules, so Node.js
// does not traverse our node_modules folders
// https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener

const { createServer } = require(&quot;http&quot;);
const fs = require(&quot;fs&quot;);
const url = require(&quot;url&quot;);
const path = require(&quot;path&quot;);

// we pass the folder name with files as an environment variable
// so we can use a different folder locally

const FOLDER_NAME = process.env.FOLDER_NAME;
const PORT = process.env.PORT || 8080;
const server = createServer((req, res) =&gt; {
  // req.url contains full url, with querystring
  // we ignored it before, but here we want to ensure
  // that we only get pathname, without querystring
  // https://nodejs.org/api/http.html#http_message_url
  
  const parsedURL = url.parse(req.url);
  
   // we don&apos;t need the first / symbol
  const pathname = parsedURL.pathname.slice(1);
  
  // in order to return a response, we have to call res.end()
  // https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
  //
  // &gt; The method, response.end(), MUST be called on each response.
  // if we don&apos;t call it, the connection won&apos;t close and a requester
  // will wait for it until the timeout
  // 
  // by default, we return a response with [code 200](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  // in case something went wrong, we are supposed to return
  // a correct status code, using the res.statusCode = ... property:
  // https://nodejs.org/api/http.html#http_response_statuscode

  if (pathname.startsWith(&quot;.&quot;)) {
    res.statusCode = 403;
     res.end(&quot;Relative paths are not allowed&quot;);
  } else if (pathname.includes(&quot;/&quot;)) {
    res.statusCode = 403;
    res.end(&quot;Nested paths are not allowed&quot;);
  } else {
    // https://nodejs.org/en/docs/guides/working-with-different-filesystems/
    // in order to stay cross-platform, we can&apos;t just create a path on our own
    // we have to use the platform-specific separator as a delimiter
    // path.join() does exactly that for us:
    // https://nodejs.org/api/path.html#path_path_join_paths
    const filePath = path.join(__dirname, FOLDER_NAME, pathname);
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
  fileStream.on(&quot;error&quot;, e =&gt; {
      // we handle only non-existant files, but there are plenty
      // of possible error codes. you can get all common codes from the docs:
      // https://nodejs.org/api/errors.html#errors_common_system_errors
      
      if (e.code === &quot;ENOENT&quot;) {
       res.statusCode = 404;
        res.end(&quot;This file does not exist.&quot;);
    } else {
        res.statusCode = 500;
        res.end(&quot;Internal server error&quot;);
    }
  });}
 });
server.listen(PORT, () =&gt; {
  console.log(application is listening at the port ${PORT});
});</code></pre><h3>&#x603B;&#x7ED3;</h3><p>&#x5728;&#x672C;&#x6307;&#x5357;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;&#x8BB8;&#x591A;&#x57FA;&#x672C;&#x7684;Node.js&#x539F;&#x5219;&#x3002;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x7279;&#x5B9A;&#x7684;API&#xFF0C;&#x6211;&#x4EEC;&#x786E;&#x5B9E;&#x9519;&#x8FC7;&#x4E86;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x672C;&#x6307;&#x5357;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x8D77;&#x70B9;&#xFF0C;&#x8BA9;&#x60A8;&#x5728;&#x9605;&#x8BFB;API&#xFF0C;&#x7F16;&#x8F91;&#x73B0;&#x6709;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6216;&#x8005;&#x521B;&#x5EFA;&#x65B0;&#x811A;&#x672C;&#x65F6;&#x6709;&#x4FE1;&#x5FC3;&#x3002;&#x60A8;&#x73B0;&#x5728;&#x80FD;&#x591F;&#x7406;&#x89E3;&#x9519;&#x8BEF;&#xFF0C;&#x6E05;&#x695A;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x4F7F;&#x7528;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x4EE5;&#x53CA;&#x4ECE;&#x5178;&#x578B;&#x7684;Node.js&#x5BF9;&#x8C61;&#x548C;&#x63A5;&#x53E3;&#x4E2D;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#x54EA;&#x4E9B;&#x4E1C;&#x897F;&#x3002;</p><p>&#x4E0B;&#x4E00;&#x6B21;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x6DF1;&#x5165;&#x4ECB;&#x7ECD;&#x4F7F;&#x7528;Node.js&#x7684;Web&#x670D;&#x52A1;&#xFF0C;Node.js REPL&#xFF0C;&#x5982;&#x4F55;&#x7F16;&#x5199;CLI&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF0C;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x4F7F;&#x7528;Node.js&#x7F16;&#x5199;&#x5C0F;&#x811A;&#x672C;&#x3002;&#x60A8;&#x53EF;&#x4EE5;&#x8BA2;&#x9605;&#x4EE5;&#x83B7;&#x53D6;&#x6709;&#x5173;&#x8FD9;&#x4E9B;&#x65B0;&#x6587;&#x7AE0;&#x7684;&#x901A;&#x77E5;&#x3002;</p><h2>&#x76F8;&#x5173;&#x6587;&#x7AE0;</h2><blockquote>2017&#x5E74;7&#x6708;9&#x65E5;&#xBB; Node.js REPL&#x6DF1;&#x5EA6;<p>2018&#x5E74;6&#x6708;5&#x65E5;&#xBB; &#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x7F29;&#x7565;&#x8BCD;</p><p>2018 &#x5E74; 6&#x6708;3&#x65E5;&#xBB; &#x5355;&#x5143;&#x6D4B;&#x8BD5;</p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】Node.js 前端开发指南

## 原文链接
[https://segmentfault.com/a/1190000016096222](https://segmentfault.com/a/1190000016096222)

