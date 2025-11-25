---
title: 'TypeScript在node项目中的实践' 
date: 2018-11-22 2:30:10
hidden: true
slug: s7z6zvdctma
categories: [reprint]
---

{{< raw >}}
<p>TypeScript&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;JavaScript&#x7684;&#x4E00;&#x4E2A;&#x8D85;&#x96C6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6DB5;&#x76D6;&#x4E86;&#x6240;&#x6709;JavaScript&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x5728;&#x4E4B;&#x4E0A;&#x6709;&#x7740;&#x81EA;&#x5DF1;&#x72EC;&#x7279;&#x7684;&#x8BED;&#x6CD5;&#x3002;<br>&#x6700;&#x8FD1;&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x9879;&#x76EE;&#x5F00;&#x59CB;&#x4E86;TS&#x7684;&#x8E29;&#x5751;&#x4E4B;&#x65C5;&#xFF0C;&#x73B0;&#x5206;&#x4EAB;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x501F;&#x9274;&#x7684;&#x5957;&#x8DEF;&#x7ED9;&#x5927;&#x5BB6;&#x3002;</p><h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x9009;&#x62E9;TS</h2><p>&#x4F5C;&#x4E3A;&#x5DE8;&#x786C;&#x516C;&#x53F8;&#x51FA;&#x54C1;&#x7684;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x5F3A;&#x7C7B;&#x578B;&#x7F16;&#x8BD1;&#x578B;&#x8BED;&#x8A00;&#xFF0C;&#x8BE5;&#x8BED;&#x8A00;&#x5DF2;&#x7ECF;&#x51FA;&#x73B0;&#x4E86;&#x51E0;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x76F8;&#x4FE1;&#x5728;&#x793E;&#x533A;&#x7684;&#x7EF4;&#x62A4;&#x4E0B;&#xFF0C;&#x5DF2;&#x7ECF;&#x662F;&#x4E00;&#x95E8;&#x5F88;&#x7A33;&#x5B9A;&#x7684;&#x8BED;&#x8A00;&#x3002;<br>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;JavaScript&#x662F;&#x4E00;&#x95E8;&#x52A8;&#x6001;&#x5F31;&#x7C7B;&#x578B;&#x89E3;&#x91CA;&#x578B;&#x811A;&#x672C;&#x8BED;&#x8A00;&#xFF0C;&#x52A8;&#x6001;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x591A;&#x7684;&#x4FBF;&#x5229;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x4E2D;&#x968F;&#x610F;&#x7684;&#x4FEE;&#x6539;&#x53D8;&#x91CF;&#x7C7B;&#x578B;&#x4EE5;&#x8FBE;&#x5230;&#x9884;&#x671F;&#x76EE;&#x7684;&#x3002;<br>&#x4F46;&#x540C;&#x65F6;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x628A;&#x53CC;&#x5203;&#x5251;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x5E9E;&#x5927;&#x7684;&#x9879;&#x76EE;&#x51FA;&#x73B0;&#x5728;&#x4F60;&#x7684;&#x9762;&#x524D;&#xFF0C;&#x9762;&#x5BF9;&#x65E0;&#x6BD4;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x4F60;&#x5F88;&#x96BE;&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x770B;&#x51FA;&#x67D0;&#x4E2A;&#x53D8;&#x91CF;&#x662F;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#xFF0C;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x8981;&#x505A;&#x4EC0;&#x4E48;&#xFF0C;&#x5F88;&#x53EF;&#x80FD;&#x4E00;&#x4E0D;&#x5C0F;&#x5FC3;&#x5C31;&#x4F1A;&#x8E29;&#x5230;&#x5751;&#x3002;</p><p>&#x800C;&#x9759;&#x6001;&#x5F3A;&#x7C7B;&#x578B;&#x7F16;&#x8BD1;&#x80FD;&#x591F;&#x5E26;&#x6765;&#x5F88;&#x591A;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x5176;&#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x675C;&#x7EDD;&#x4E00;&#x4E9B;&#x9A6C;&#x864E;&#x5927;&#x610F;&#x7684;&#x95EE;&#x9898;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bV3F9Y?w=1116&amp;h=691" src="https://static.alili.tech/img/bV3F9Y?w=1116&amp;h=691" alt="javascript-error-graph.png" title="javascript-error-graph.png" style="cursor:pointer;display:inline"></span><br><em>&#x56FE;&#x4E3A;rollbar&#x7EDF;&#x8BA1;&#x7684;&#x6570;&#x5343;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x6570;&#x91CF;&#x6700;&#x591A;&#x7684;&#x524D;&#x5341;&#x4E2A;&#x5F02;&#x5E38;</em></p><p>&#x4E0D;&#x96BE;&#x770B;&#x51FA;&#xFF0C;&#x56E0;&#x4E3A;&#x7C7B;&#x578B;&#x4E0D;&#x5339;&#x914D;&#x3001;&#x53D8;&#x91CF;&#x4E3A;&#x7A7A;&#x5BFC;&#x81F4;&#x7684;&#x5F02;&#x5E38;&#x6BD4;&#x4F60;&#x6562;&#x627F;&#x8BA4;&#x7684;&#x6B21;&#x6570;&#x8981;&#x591A;&#x3002;<br>&#x8B6C;&#x5982;<br><span class="img-wrap"><img data-src="/img/bVbd7zC?w=521&amp;h=187" src="https://static.alili.tech/img/bVbd7zC?w=521&amp;h=187" alt="sample-error-code.1ci4jfvvt2t4ojs.png" title="sample-error-code.1ci4jfvvt2t4ojs.png" style="cursor:pointer"></span><br>&#x800C;&#x8FD9;&#x4E00;&#x70B9;&#x5728;TS&#x4E2D;&#x5F97;&#x5230;&#x4E86;&#x5F88;&#x597D;&#x7684;&#x6539;&#x5584;&#xFF0C;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x81EA;&#x5DF1;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x800C;&#x4F60;&#x4E0B;&#x8FB9;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x7528;&#x4EC0;&#x4E48;&#xFF0C;&#x652F;&#x6301;&#x4EC0;&#x4E48;&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x5728;&#x4E0A;&#x8FB9;&#x8FDB;&#x884C;&#x5B9A;&#x4E49;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd7zz?w=473&amp;h=401" src="https://static.alili.tech/img/bVbd7zz?w=473&amp;h=401" alt="typescript-example.1ciuh4eh1v1sum.png" title="typescript-example.1ciuh4eh1v1sum.png" style="cursor:pointer"></span><br>&#x8FD9;&#x4E2A;&#x63D0;&#x793A;&#x4F1A;&#x5728;&#x5F00;&#x53D1;&#x3001;&#x7F16;&#x8BD1;&#x671F;&#x6765;&#x63D0;&#x793A;&#x7ED9;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x907F;&#x514D;&#x4E86;&#x4E0A;&#x7EBF;&#x4EE5;&#x540E;&#x53D1;&#x73B0;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x518D;&#x53BB;&#x4FEE;&#x6539;&#x3002;</p><p>&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x7531;&#x9759;&#x6001;&#x7F16;&#x8BD1;&#x7C7B;&#x578B;&#x5E26;&#x6765;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x7B7E;&#x540D;&#x3002;<br>&#x8FD8;&#x662F;&#x5C31;&#x50CF;&#x4E0A;&#x8FB9;&#x6240;&#x8BF4;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x7684;&#x811A;&#x672C;&#x8BED;&#x8A00;&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x96BE;&#x6709;&#x7F16;&#x8F91;&#x5668;&#x80FD;&#x591F;&#x5728;&#x5F00;&#x53D1;&#x671F;&#x95F4;&#x6B63;&#x786E;&#x5730;&#x544A;&#x8BC9;&#x4F60;&#x6240;&#x8981;&#x8C03;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x9700;&#x8981;&#x4F20;&#x9012;&#x4EC0;&#x4E48;&#x53C2;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbd7zy?w=235&amp;h=96" src="https://static.alili.tech/img/bVbd7zy?w=235&amp;h=96" alt="js-function-call.1ci4kli9ou37kr.png" title="js-function-call.1ci4kli9ou37kr.png" style="cursor:pointer"></span></p><p>&#x800C;&#x5728;TS&#x4E2D;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x9996;&#x5148;&#x4F60;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x6240;&#x6709;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4EE5;&#x53CA;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x7C7B;&#x578B;&#x3002;<br>&#x8FD9;&#x6837;&#x5728;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5F88;&#x6E05;&#x6670;&#x7684;&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd7zw?w=513&amp;h=220" src="https://static.alili.tech/img/bVbd7zw?w=513&amp;h=220" alt="ts-function-call.1ciuh6bsp2ujs1q.png" title="ts-function-call.1ciuh6bsp2ujs1q.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x662F;&#x6700;&#x57FA;&#x7840;&#x7684;&#x3001;&#x80FD;&#x591F;&#x8BA9;&#x7A0B;&#x5E8F;&#x66F4;&#x52A0;&#x7A33;&#x5B9A;&#x7684;&#x4E24;&#x4E2A;&#x7279;&#x6027;&#xFF0C;&#x5F53;&#x7136;&#xFF0C;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#x5728;TS&#x4E2D;&#x7684;&#xFF1A;<a href="https://www.typescriptlang.org/docs/home.html" rel="nofollow noreferrer" target="_blank">TypeScript | Handbook</a></p><h2 id="articleHeader1">TypeScript&#x5728;node&#x4E2D;&#x7684;&#x5E94;&#x7528;</h2><p>&#x5728;TS&#x7684;&#x5B98;&#x7F51;&#x4E2D;&#xFF0C;&#x6709;&#x7740;&#x5927;&#x91CF;&#x7684;<a href="https://www.typescriptlang.org/samples/index.html" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>&#xFF0C;&#x5176;&#x4E2D;&#x5C31;&#x627E;&#x5230;&#x4E86;<a href="https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter" rel="nofollow noreferrer" target="_blank">Express</a>&#x7248;&#x672C;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x9488;&#x5BF9;&#x8FD9;&#x4E2A;&#x7A0D;&#x4F5C;&#x4FEE;&#x9970;&#xFF0C;&#x5E94;&#x7528;&#x5728;&#x4E86;&#x4E00;&#x4E2A; koa &#x9879;&#x76EE;&#x4E2D;&#x3002;</p><h3 id="articleHeader2">&#x73AF;&#x5883;&#x4F9D;&#x8D56;</h3><p>&#x5728;&#x4F7F;&#x7528;TS&#x4E4B;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x5148;&#x51C6;&#x5907;&#x8FD9;&#x4E9B;&#x4E1C;&#x897F;&#xFF1A;</p><ol><li><strong>VS code</strong>&#xFF0C;&#x540C;&#x4E3A;&#x5DE8;&#x786C;&#x516C;&#x53F8;&#x51FA;&#x54C1;&#xFF0C;&#x672C;&#x8EAB;&#x5C31;&#x662F;TS&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x9042;&#x8BE5;&#x7F16;&#x8F91;&#x5668;&#x662F;&#x76EE;&#x524D;&#x5BF9;TS&#x652F;&#x6301;&#x5EA6;&#x6700;&#x9AD8;&#x7684;&#x4E00;&#x4E2A;</li><li>Node.js &#x63A8;&#x8350;8.11&#x7248;&#x672C;&#x4EE5;&#x4E0A;</li><li><code>npm i -g typescript</code>&#xFF0C;&#x5168;&#x5C40;&#x5B89;&#x88C5;TS&#xFF0C;&#x7F16;&#x8BD1;&#x6240;&#x4F7F;&#x7528;&#x7684;tsc&#x547D;&#x4EE4;&#x5728;&#x8FD9;&#x91CC;</li><li><code>npm i -g nodemon</code>&#xFF0C;&#x5168;&#x5C40;&#x5B89;&#x88C5;nodemon&#xFF0C;&#x5728;tsc&#x7F16;&#x8BD1;&#x540E;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x670D;&#x52A1;&#x5668;&#x7A0B;&#x5E8F;</li></ol><ul><li><a href="https://www.typescriptlang.org/docs/handbook" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x624B;&#x518C;</a></li><li><a href="https://github.com/Microsoft/TypeScript-Node-Starter/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;Express&#x793A;&#x4F8B;</a></li></ul><p>&#x4EE5;&#x53CA;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x6838;&#x5FC3;&#x4F9D;&#x8D56;&#xFF1A;</p><ol><li><code>reflect-metadata</code>&#xFF1A; &#x5927;&#x91CF;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5305;&#x90FD;&#x4F1A;&#x4F9D;&#x8D56;&#x7684;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x5305;&#xFF0C;&#x7528;&#x4E8E;&#x6CE8;&#x5165;&#x6570;&#x636E;</li><li><code>routing-controllers</code>&#xFF1A; &#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8FDB;&#x884C;koa-router&#x7684;&#x5F00;&#x53D1;</li><li><code>sequelize</code>&#xFF1A; &#x62BD;&#x8C61;&#x5316;&#x7684;&#x6570;&#x636E;&#x5E93;&#x64CD;&#x4F5C;</li><li><code>sequelize-typescript</code>&#xFF1A; &#x4E0A;&#x8FF0;&#x63D2;&#x4EF6;&#x7684;&#x88C5;&#x9970;&#x5668;&#x7248;&#x672C;&#xFF0C;&#x5B9A;&#x4E49;&#x5B9E;&#x4F53;&#x65F6;&#x4F7F;&#x7528;</li></ol><h3 id="articleHeader3">&#x9879;&#x76EE;&#x7ED3;&#x6784;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x653E;&#x51FA;&#x76EE;&#x524D;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; README.md
&#x251C;&#x2500;&#x2500; copy-static-assets.ts
&#x251C;&#x2500;&#x2500; nodemon.json
&#x251C;&#x2500;&#x2500; package-lock.json
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; dist
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; controllers
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entity
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; models
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; middleware
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; public
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; server.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; types
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; utils
&#x251C;&#x2500;&#x2500; tsconfig.json
&#x2514;&#x2500;&#x2500; tslint.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">.
&#x251C;&#x2500;&#x2500; README.md
&#x251C;&#x2500;&#x2500; copy-static-assets.ts
&#x251C;&#x2500;&#x2500; nodemon.json
&#x251C;&#x2500;&#x2500; package-lock.json
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; dist
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; controllers
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entity
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; models
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; middleware
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; public
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; server.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; types
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; utils
&#x251C;&#x2500;&#x2500; tsconfig.json
&#x2514;&#x2500;&#x2500; tslint.json</code></pre><p><code>src</code>&#x4E3A;&#x4E3B;&#x8981;&#x5F00;&#x53D1;&#x76EE;&#x5F55;&#xFF0C;&#x6240;&#x6709;&#x7684;TS&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#x8FB9;&#xFF0C;&#x5728;&#x7ECF;&#x8FC7;&#x7F16;&#x8BD1;&#x8FC7;&#x540E;&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x4E0E;<code>src</code>&#x540C;&#x7EA7;&#x7684;<code>dist</code>&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x662F;<code>node</code>&#x5F15;&#x64CE;&#x5B9E;&#x9645;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x5728;<code>src</code>&#x4E0B;&#xFF0C;&#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x5206;&#x4E3A;&#x4E86;&#x5982;&#x4E0B;&#x7ED3;&#x6784;&#xFF08;&#x4F9D;&#x636E;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x7684;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x8FDB;&#x884C;&#x589E;&#x5220;&#xFF09;&#xFF1A;</p><h1 id="articleHeader4">|folder|desc</h1><table><tbody><tr><td align="center">1</td><td><code>controllers</code></td><td>&#x7528;&#x4E8E;&#x5904;&#x7406;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF0C;&#x539F;<code>apps</code>&#x3001;<code>routes</code>&#x6587;&#x4EF6;&#x5939;&#x3002;</td></tr><tr><td align="center">2</td><td><code>middleware</code></td><td>&#x5B58;&#x653E;&#x4E86;&#x5404;&#x79CD;&#x4E2D;&#x95F4;&#x4EF6;&#x3001;&#x5168;&#x5C40; or &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</td></tr><tr><td align="center">3</td><td><code>config</code></td><td>&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x9879;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5305;&#x62EC;&#x7AEF;&#x53E3;&#x3001;<code>log</code>&#x8DEF;&#x5F84;&#x3001;&#x5404;&#x79CD;&#x5DF4;&#x62C9;&#x5DF4;&#x62C9;&#x7684;&#x5E38;&#x91CF;&#x5B9A;&#x4E49;&#x3002;</td></tr><tr><td align="center">4</td><td><code>entity</code></td><td>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x7684;&#x662F;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F53;&#x5B9A;&#x4E49;&#xFF08;&#x4F7F;&#x7528;&#x4E86;sequelize&#x8FDB;&#x884C;&#x6570;&#x636E;&#x5E93;&#x64CD;&#x4F5C;&#xFF09;&#x3002;</td></tr><tr><td align="center">5</td><td><code>models</code></td><td>&#x4F7F;&#x7528;&#x6765;&#x81EA;<code>entity</code>&#x4E2D;&#x7684;&#x5B9E;&#x4F53;&#x8FDB;&#x884C;<code>sequelize</code>&#x6765;&#x5B8C;&#x6210;&#x521D;&#x59CB;&#x5316;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x5C06;<code>sequelize</code>&#x5BF9;&#x8C61;&#x629B;&#x51FA;&#x3002;</td></tr><tr><td align="center">6</td><td><code>utils</code></td><td>&#x5B58;&#x653E;&#x7684;&#x5404;&#x79CD;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x63D0;&#x70BC;&#x51FA;&#x6765;&#x7684;&#x516C;&#x5171;&#x51FD;&#x6570;</td></tr><tr><td align="center">7</td><td><code>types</code></td><td>&#x5B58;&#x653E;&#x4E86;&#x5404;&#x79CD;&#x5BA2;&#x5236;&#x5316;&#x7684;&#x590D;&#x5408;&#x7C7B;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x5404;&#x79CD;&#x7ED3;&#x6784;&#x3001;&#x5C5E;&#x6027;&#x3001;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5B9A;&#x4E49;&#xFF08;&#x76EE;&#x524D;&#x5305;&#x62EC;&#x5E38;&#x7528;&#x7684;Promise&#x7248;redis&#x4E0E;qconf&#xFF09;</td></tr></tbody></table><h3 id="articleHeader5">controllers</h3><blockquote>controllers&#x53EA;&#x8D1F;&#x8D23;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;model&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x636E;&#x5E93;&#x6765;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x7684;&#x589E;&#x5220;&#x6539;&#x67E5;</blockquote><p>&#x9274;&#x4E8E;&#x516C;&#x53F8;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7684;Node&#x9879;&#x76EE;&#x7248;&#x672C;&#x90FD;&#x5DF2;&#x7ECF;&#x5347;&#x7EA7;&#x5230;&#x4E86;<code>Node 8.11</code>&#xFF0C;&#x7406;&#x6240;&#x5E94;&#x5F53;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5C1D;&#x8BD5;&#x65B0;&#x7684;&#x8BED;&#x6CD5;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6211;&#x4EEC;&#x4F1A;&#x629B;&#x5F03;<code>Generator</code>&#xFF0C;&#x62E5;&#x62B1;<code>async</code>/<code>await</code> &#x3002;</p><p>&#x4F7F;&#x7528;<code>Koa</code>&#x3001;<code>Express</code>&#x5199;&#x8FC7;&#x63A5;&#x53E3;&#x7684;&#x7AE5;&#x978B;&#x5E94;&#x8BE5;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x53D8;&#x5F97;&#x5E9E;&#x5927;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x4EA7;&#x751F;&#x5F88;&#x591A;&#x91CD;&#x590D;&#x7684;&#x975E;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get(&apos;/&apos;, ctx =&gt; {})
router.get(&apos;/page1&apos;, ctx =&gt; {})
router.get(&apos;/page2&apos;, ctx =&gt; {})
router.get(&apos;/page3&apos;, ctx =&gt; {})
router.get(&apos;/pageN&apos;, ctx =&gt; {})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {})
router.get(<span class="hljs-string">&apos;/page1&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {})
router.get(<span class="hljs-string">&apos;/page2&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {})
router.get(<span class="hljs-string">&apos;/page3&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {})
router.get(<span class="hljs-string">&apos;/pageN&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {})</code></pre><p>&#x800C;&#x5728;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x4E2D;&#xFF0C;&#x53C8;&#x505A;&#x7740;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x7684;&#x5DE5;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get(&apos;/&apos;, ctx =&gt; {
  let uid = Number(ctx.cookies.get(&apos;uid&apos;))
  let device = ctx.headers[&apos;device&apos;] || &apos;ios&apos;
  let { tel, name } = ctx.query
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript">router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> uid = <span class="hljs-built_in">Number</span>(ctx.cookies.get(<span class="hljs-string">&apos;uid&apos;</span>))
  <span class="hljs-keyword">let</span> device = ctx.headers[<span class="hljs-string">&apos;device&apos;</span>] || <span class="hljs-string">&apos;ios&apos;</span>
  <span class="hljs-keyword">let</span> { tel, name } = ctx.query
})</code></pre><p>&#x51E0;&#x4E4E;&#x6BCF;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x7684;&#x5934;&#x90E8;&#x90FD;&#x662F;&#x5728;&#x505A;&#x7740;&#x83B7;&#x53D6;&#x53C2;&#x6570;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x800C;&#x53C2;&#x6570;&#x5F88;&#x53EF;&#x80FD;&#x6765;&#x81EA;<code>header</code>&#x3001;<code>body</code>&#x751A;&#x81F3;&#x662F;<code>cookie</code>&#x53CA;<code>query</code>&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x539F;&#x6765;koa&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x4E2A;&#x8F83;&#x5927;&#x7684;&#x6539;&#x52A8;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;<a href="https://github.com/typestack/routing-controllers" rel="nofollow noreferrer" target="_blank">routing-controllers</a>&#x5927;&#x91CF;&#x7684;&#x5E94;&#x7528;&#x88C5;&#x9970;&#x5668;&#x6765;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x5927;&#x90E8;&#x5206;&#x7684;&#x975E;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x3002;</p><p>&#x539F;&#x6709;router&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (router) {
  router.get(&apos;/&apos;, function* (next) {
    let uid = Number(this.cookies.get(&apos;uid&apos;))
    let device = this.headers[&apos;device&apos;]
    
    this.body = {
      code: 200
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">router</span>) </span>{
  router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">let</span> uid = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">this</span>.cookies.get(<span class="hljs-string">&apos;uid&apos;</span>))
    <span class="hljs-keyword">let</span> device = <span class="hljs-keyword">this</span>.headers[<span class="hljs-string">&apos;device&apos;</span>]
    
    <span class="hljs-keyword">this</span>.body = {
      code: <span class="hljs-number">200</span>
    }
  })
}</code></pre><p>&#x4F7F;&#x7528;&#x4E86;TypeScript&#x4E0E;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Controller
export default class {
  @Get(&apos;/&apos;)
  async index (
    @CookieParam(&apos;uid&apos;) uid: number,
    @HeaderParam(&apos;device&apos;) device: string
  ) {
    return {
      code: 200
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Controller</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> {
  <span class="hljs-meta">@Get</span>(<span class="hljs-string">&apos;/&apos;</span>)
  <span class="hljs-keyword">async</span> index (
    <span class="hljs-meta">@CookieParam</span>(<span class="hljs-string">&apos;uid&apos;</span>) uid: <span class="hljs-built_in">number</span>,
    <span class="hljs-meta">@HeaderParam</span>(<span class="hljs-string">&apos;device&apos;</span>) device: <span class="hljs-built_in">string</span>
  ) {
    <span class="hljs-keyword">return</span> {
      code: <span class="hljs-number">200</span>
    }
  }
}</code></pre><p>&#x4E3A;&#x4E86;&#x4F7F;&#x63A5;&#x53E3;&#x66F4;&#x6613;&#x4E8E;&#x68C0;&#x7D22;&#x3001;&#x66F4;&#x6E05;&#x6670;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x629B;&#x5F03;&#x4E86;&#x539F;&#x6709;&#x7684;<code>bd-router</code>&#x7684;&#x529F;&#x80FD;&#xFF08;&#x4F9D;&#x636E;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x8DEF;&#x5F84;&#x3001;TS&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x4EC5;&#x7528;&#x4E8E;&#x6587;&#x4EF6;&#x5206;&#x5C42;&#xFF09;&#x3002;<br>&#x76F4;&#x63A5;&#x5728;<code>controllers</code>&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x58F0;&#x660E;&#x5BF9;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#x3002;</p><h3 id="articleHeader6">middleware</h3><p>&#x5982;&#x679C;&#x662F;&#x5168;&#x5C40;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x5728;class&#x4E0A;&#x6DFB;&#x52A0;<code>@Middleware</code>&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;<code>type: &apos;after|before&apos;</code>&#x5373;&#x53EF;&#x3002;<br>&#x5982;&#x679C;&#x662F;&#x7279;&#x5B9A;&#x7684;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5219;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;class&#x5373;&#x53EF;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;<code>controller</code>&#x5BF9;&#x8C61;&#x4E0A;&#x6307;&#x5B9A;<code>@UseBefore</code>/<code>@UseAfter</code>&#xFF08;&#x53EF;&#x4EE5;&#x5199;&#x5728;class&#x4E0A;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5199;&#x5728;method&#x4E0A;&#xFF09;&#x3002;</p><p><strong>&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x90FD;&#x9700;&#x8981;&#x7EE7;&#x627F;&#x5BF9;&#x5E94;&#x7684;MiddlewareInterface&#x63A5;&#x53E3;&#xFF0C;&#x5E76;&#x9700;&#x8981;&#x5B9E;&#x73B0;<code>use</code>&#x65B9;&#x6CD5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// middleware/xxx.ts
import {ExpressMiddlewareInterface} from &quot;../../src/driver/express/ExpressMiddlewareInterface&quot;

export class CompressionMiddleware implements KoaMiddlewareInterface {
  use(request: any, response: any, next?: Function): any {
    console.log(&quot;hello compression ...&quot;)
    next()
  }
}

// controllers/xxx.ts
@UseBefore(CompressionMiddleware)
export default class { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// middleware/xxx.ts</span>
<span class="hljs-keyword">import</span> {ExpressMiddlewareInterface} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../../src/driver/express/ExpressMiddlewareInterface&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CompressionMiddleware <span class="hljs-keyword">implements</span> KoaMiddlewareInterface {
  use(request: <span class="hljs-built_in">any</span>, response: <span class="hljs-built_in">any</span>, next?: <span class="hljs-built_in">Function</span>): <span class="hljs-built_in">any</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello compression ...&quot;</span>)
    next()
  }
}

<span class="hljs-comment">// controllers/xxx.ts</span>
<span class="hljs-meta">@UseBefore</span>(CompressionMiddleware)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> { }</code></pre><h3 id="articleHeader7">entity</h3><blockquote>&#x6587;&#x4EF6;&#x53EA;&#x8D1F;&#x8D23;&#x5B9A;&#x4E49;&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF0C;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x903B;&#x8F91;&#x64CD;&#x4F5C;</blockquote><p>&#x540C;&#x6837;&#x7684;&#x4F7F;&#x7528;&#x4E86;sequelize+&#x88C5;&#x9970;&#x5668;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;entity&#x53EA;&#x662F;&#x7528;&#x6765;&#x5EFA;&#x7ACB;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x4E4B;&#x95F4;&#x901A;&#x8BAF;&#x7684;&#x6570;&#x636E;&#x6A21;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Model, Table, Column } from &apos;sequelize-typescript&apos;

@Table({
  tableName: &apos;user_info_test&apos;
})
export default class UserInfo extends Model&lt;UserInfo&gt; {
  @Column({
    comment: &apos;&#x81EA;&#x589E;ID&apos;,
    autoIncrement: true,
    primaryKey: true
  })
  uid: number

  @Column({
    comment: &apos;&#x59D3;&#x540D;&apos;
  })
  name: string

  @Column({
    comment: &apos;&#x5E74;&#x9F84;&apos;,
    defaultValue: 0
  })
  age: number

  @Column({
    comment: &apos;&#x6027;&#x522B;&apos;
  })
  gender: number
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Model, Table, Column } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>

<span class="hljs-meta">@Table</span>({
  tableName: <span class="hljs-string">&apos;user_info_test&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> UserInfo <span class="hljs-keyword">extends</span> Model&lt;UserInfo&gt; {
  <span class="hljs-meta">@Column</span>({
    comment: <span class="hljs-string">&apos;&#x81EA;&#x589E;ID&apos;</span>,
    autoIncrement: <span class="hljs-literal">true</span>,
    primaryKey: <span class="hljs-literal">true</span>
  })
  uid: <span class="hljs-built_in">number</span>

  <span class="hljs-meta">@Column</span>({
    comment: <span class="hljs-string">&apos;&#x59D3;&#x540D;&apos;</span>
  })
  name: <span class="hljs-built_in">string</span>

  <span class="hljs-meta">@Column</span>({
    comment: <span class="hljs-string">&apos;&#x5E74;&#x9F84;&apos;</span>,
    defaultValue: <span class="hljs-number">0</span>
  })
  age: <span class="hljs-built_in">number</span>

  <span class="hljs-meta">@Column</span>({
    comment: <span class="hljs-string">&apos;&#x6027;&#x522B;&apos;</span>
  })
  gender: <span class="hljs-built_in">number</span>
}</code></pre><p><strong>&#x56E0;&#x4E3A;sequelize&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x4E5F;&#x662F;&#x9700;&#x8981;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#x5E93;&#x5730;&#x5740;&#x3001;&#x8D26;&#x6237;&#x3001;&#x5BC6;&#x7801;&#x3001;database&#x7B49;&#x4FE1;&#x606F;&#x3001;&#x6240;&#x4EE5;&#x63A8;&#x8350;&#x5C06;&#x540C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x5E93;&#x7684;&#x6240;&#x6709;&#x5B9E;&#x4F53;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x65B9;&#x4FBF;sequelize&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x578B;</strong><br>&#x540C;&#x6B65;&#x7684;&#x63A8;&#x8350;&#x5728;config&#x4E0B;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x4E00;&#x5217;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x5B9E;&#x4F53;&#x7684;key&#x3002;<br>&#x8FD9;&#x6837;&#x5728;&#x5EFA;&#x7ACB;&#x6570;&#x636E;&#x5E93;&#x94FE;&#x63A5;&#xFF0C;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x6A21;&#x578B;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x52A8;&#x6001;&#x7684;&#x5BFC;&#x5165;&#x8BE5;&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x5B9E;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config.ts
export const config = {
  // ...
  mysql1: {
    // ... config
+   entity: &apos;entity1&apos; // &#x6DFB;&#x52A0;&#x4E00;&#x5217;&#x7528;&#x6765;&#x6807;&#x8BC6;&#x662F;&#x4EC0;&#x4E48;&#x5B9E;&#x4F53;&#x7684;key
  },
  mysql2: {
    // ... config
+   entity: &apos;entity2&apos; // &#x6DFB;&#x52A0;&#x4E00;&#x5217;&#x7528;&#x6765;&#x6807;&#x8BC6;&#x662F;&#x4EC0;&#x4E48;&#x5B9E;&#x4F53;&#x7684;key
  }
  // ...
}

// utils/mysql.ts
new Sequelize({
  // ...
  modelPath: [path.reolve(__dirname, `../entity/${config.mysql1.entity}`)]
  // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// config.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> config = {
  <span class="hljs-comment">// ...</span>
  mysql1: {
    <span class="hljs-comment">// ... config</span>
+   entity: <span class="hljs-string">&apos;entity1&apos;</span> <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E00;&#x5217;&#x7528;&#x6765;&#x6807;&#x8BC6;&#x662F;&#x4EC0;&#x4E48;&#x5B9E;&#x4F53;&#x7684;key</span>
  },
  mysql2: {
    <span class="hljs-comment">// ... config</span>
+   entity: <span class="hljs-string">&apos;entity2&apos;</span> <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E00;&#x5217;&#x7528;&#x6765;&#x6807;&#x8BC6;&#x662F;&#x4EC0;&#x4E48;&#x5B9E;&#x4F53;&#x7684;key</span>
  }
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// utils/mysql.ts</span>
<span class="hljs-keyword">new</span> Sequelize({
  <span class="hljs-comment">// ...</span>
  modelPath: [path.reolve(__dirname, <span class="hljs-string">`../entity/<span class="hljs-subst">${config.mysql1.entity}</span>`</span>)]
  <span class="hljs-comment">// ...</span>
})</code></pre><h3 id="articleHeader8">model</h3><p>model&#x7684;&#x5B9A;&#x4F4D;&#x5728;&#x4E8E;&#x6839;&#x636E;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x4F53;&#x521B;&#x5EFA;&#x62BD;&#x8C61;&#x5316;&#x7684;&#x6570;&#x636E;&#x5E93;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86;sequelize&#xFF0C;&#x6240;&#x4EE5;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x7B80;&#x6D01;&#x3002;<br>&#x57FA;&#x672C;&#x5C31;&#x662F;&#x521D;&#x59CB;&#x5316;sequelize&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x5728;&#x52A0;&#x8F7D;&#x6A21;&#x578B;&#x540E;&#x5C06;&#x5176;&#x629B;&#x51FA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Sequelize({
  host: &apos;127.0.0.1&apos;,
  database: &apos;database&apos;,
  username: &apos;user&apos;,
  password: &apos;password&apos;,
  dialect: &apos;mysql&apos;, // &#x6216;&#x8005;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x6570;&#x636E;&#x5E93;
  modelPaths: [path.resolve(__dirname, `../entity/${configs.mysql1.entity}`)], // &#x52A0;&#x8F7D;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x4F53;
  pool: { // &#x8FDE;&#x63A5;&#x6C60;&#x7684;&#x4E00;&#x4E9B;&#x76F8;&#x5173;&#x914D;&#x7F6E;
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  logging: true // true&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x6BCF;&#x6B21;sequelize&#x64CD;&#x4F5C;&#x65F6;&#x5BF9;&#x5E94;&#x7684;SQL&#x547D;&#x4EE4;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Sequelize({
  host: <span class="hljs-string">&apos;127.0.0.1&apos;</span>,
  database: <span class="hljs-string">&apos;database&apos;</span>,
  username: <span class="hljs-string">&apos;user&apos;</span>,
  password: <span class="hljs-string">&apos;password&apos;</span>,
  dialect: <span class="hljs-string">&apos;mysql&apos;</span>, <span class="hljs-comment">// &#x6216;&#x8005;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x6570;&#x636E;&#x5E93;</span>
  modelPaths: [path.resolve(__dirname, <span class="hljs-string">`../entity/<span class="hljs-subst">${configs.mysql1.entity}</span>`</span>)], <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x4F53;</span>
  pool: { <span class="hljs-comment">// &#x8FDE;&#x63A5;&#x6C60;&#x7684;&#x4E00;&#x4E9B;&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
    max: <span class="hljs-number">5</span>,
    min: <span class="hljs-number">0</span>,
    acquire: <span class="hljs-number">30000</span>,
    idle: <span class="hljs-number">10000</span>
  },
  operatorsAliases: <span class="hljs-literal">false</span>,
  logging: <span class="hljs-literal">true</span> <span class="hljs-comment">// true&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x6BCF;&#x6B21;sequelize&#x64CD;&#x4F5C;&#x65F6;&#x5BF9;&#x5E94;&#x7684;SQL&#x547D;&#x4EE4;</span>
})</code></pre><h3 id="articleHeader9">utils</h3><p>&#x6240;&#x6709;&#x7684;&#x516C;&#x5171;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x653E;&#x5728;&#x8FD9;&#x91CC;&#x3002;<br>&#x540C;&#x65F6;&#x63A8;&#x8350;&#x7F16;&#x5199;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;&#x6587;&#x4EF6;(index.ts)&#xFF0C;&#x5927;&#x81F4;&#x7684;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// utils/get-uid.ts
export default function (): number {
  return 123
}

// utils/number-comma.ts
export default function(): string {
  return &apos;1,234&apos;
}

// utils/index.ts
export {default as getUid} from &apos;./get-uid&apos;
export {default as numberComma} from &apos;./number-comma&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// utils/get-uid.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>): <span class="hljs-title">number</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>
}

<span class="hljs-comment">// utils/number-comma.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>): <span class="hljs-title">string</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;1,234&apos;</span>
}

<span class="hljs-comment">// utils/index.ts</span>
<span class="hljs-keyword">export</span> {<span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> getUid} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./get-uid&apos;</span>
<span class="hljs-keyword">export</span> {<span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> numberComma} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./number-comma&apos;</span></code></pre><p>&#x6BCF;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>util</code>&#xFF0C;&#x5C31;&#x53BB;<code>index</code>&#x4E2D;&#x6DFB;&#x52A0;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x8FD9;&#x6837;&#x5E26;&#x6765;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x884C;&#x6765;&#x5F15;&#x5165;&#x6240;&#x6709;&#x60F3;&#x5F15;&#x5165;&#x7684;<code>utils</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {getUid, numberComma} from &apos;./utils&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> {getUid, numberComma} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils&apos;</span></code></pre><h3 id="articleHeader10">configs</h3><p>configs&#x4E0B;&#x8FB9;&#x5B58;&#x50A8;&#x7684;&#x5C31;&#x662F;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#x4E86;&#xFF0C;&#x5305;&#x62EC;&#x4E00;&#x4E9B;&#x7B2C;&#x4E09;&#x65B9;&#x63A5;&#x53E3;URL&#x3001;&#x6570;&#x636E;&#x5E93;&#x914D;&#x7F6E;&#x3001;&#x65E5;&#x5FD7;&#x8DEF;&#x5F84;&#x3002;<br>&#x5404;&#x79CD;balabala&#x7684;&#x9759;&#x6001;&#x6570;&#x636E;&#x3002;<br>&#x5982;&#x679C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x591A;&#x7684;&#x8BDD;&#xFF0C;&#x5EFA;&#x8BAE;&#x62C6;&#x5206;&#x4E3A;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;<code>utils</code>&#x7684;&#x65B9;&#x5F0F;&#x7F16;&#x5199;&#x7D22;&#x5F15;&#x6587;&#x4EF6;&#x3002;</p><h3 id="articleHeader11">types</h3><p>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x7684;&#x662F;&#x6240;&#x6709;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x7C7B;&#x578B;&#x5B9A;&#x4E49;&#xFF0C;&#x4E00;&#x4E9B;&#x5F00;&#x6E90;&#x793E;&#x533A;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x5B9A;&#x4E49;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x5E38;&#x7528;&#x7684;&#x90FD;&#x4F1A;&#x6709;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x4E9B;&#x5C0F;&#x4F17;&#x7684;&#x5305;&#x53EF;&#x80FD;&#x786E;&#x5B9E;&#x6CA1;&#x6709;TS&#x7684;&#x652F;&#x6301;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4F7F;&#x7528;&#x7684;&#x4E00;&#x4E2A;<code>node-qconf</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// types/node-qconf.d.ts
export function getConf(path: string): string | null
export function getBatchKeys(path: string): string[] | null
export function getBatchConf(path: string): string | null
export function getAllHost(path: string): string[] | null
export function getHost(path: string): string | null" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// types/node-qconf.d.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getConf</span>(<span class="hljs-params">path: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span> | <span class="hljs-title">null</span>
<span class="hljs-title">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBatchKeys</span>(<span class="hljs-params">path: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span>[] | <span class="hljs-title">null</span>
<span class="hljs-title">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBatchConf</span>(<span class="hljs-params">path: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span> | <span class="hljs-title">null</span>
<span class="hljs-title">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAllHost</span>(<span class="hljs-params">path: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span>[] | <span class="hljs-title">null</span>
<span class="hljs-title">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHost</span>(<span class="hljs-params">path: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">string</span> | <span class="hljs-title">null</span></span></span></span></span></span></code></pre><p><em>&#x7C7B;&#x578B;&#x5B9A;&#x4E49;&#x7684;&#x6587;&#x4EF6;&#x89C4;&#x5B9A;&#x540E;&#x7F00;&#x4E3A; .d.ts</em><br>types&#x4E0B;&#x8FB9;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x5173;&#x5FC3;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x7684;&#x95EE;&#x9898;&#xFF08;&#x5176;&#x4ED6;&#x666E;&#x901A;&#x7684;model&#x5219;&#x9700;&#x8981;&#x5199;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x5C34;&#x5C2C;&#x7684;&#x95EE;&#x9898;&#xFF09;&#x3002;</p><h3 id="articleHeader12">&#x76EE;&#x524D;&#x4F7F;&#x7528;TS&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x95EE;&#x9898;</h3><p><span class="img-wrap"><img data-src="/img/bVbd7zp?w=2004&amp;h=816" src="https://static.alili.tech/img/bVbd7zp?w=2004&amp;h=816" alt="issues.1ci8qk2dr12l4sc.png" title="issues.1ci8qk2dr12l4sc.png" style="cursor:pointer;display:inline"></span><br>&#x5F53;&#x524D;GitHub&#x4ED3;&#x5E93;&#x4E2D;&#xFF0C;&#x6709;2600+&#x7684;&#x5F00;&#x542F;&#x72B6;&#x6001;&#x7684;issues&#xFF0C;&#x7B5B;&#x9009;bug&#x6807;&#x7B7E;&#x540E;&#xFF0C;&#x4F9D;&#x7136;&#x6709;900+&#x7684;&#x5B58;&#x5728;&#x3002;<br>&#x6240;&#x4EE5;&#x5F88;&#x96BE;&#x4FDD;&#x8BC1;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E0D;&#x4F1A;&#x8E29;&#x5751;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x62E5;&#x6709;&#x8FD9;&#x4E48;&#x591A;&#x6D3B;&#x8DC3;&#x7684;issues&#xFF0C;&#x4E5F;&#x80FD;&#x4ECE;&#x4FA7;&#x9762;&#x8BF4;&#x660E;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x53D7;&#x6B22;&#x8FCE;&#x7A0B;&#x5EA6;&#x3002;</p><p>&#x76EE;&#x524D;&#x9047;&#x5230;&#x7684;&#x552F;&#x4E00;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x5C34;&#x5C2C;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#xFF1A;<br><strong>&#x5F15;&#x7528;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x4E00;&#x5B9A;&#x8981;&#x5199;&#x5168;&#x3002;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import module from &apos;../../../../f**k-module&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> <span class="hljs-built_in">module</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../../../f**k-module&apos;</span></code></pre><h2 id="articleHeader13">&#x5C0F;&#x7ED3;</h2><p>&#x521D;&#x6B21;&#x5C1D;&#x8BD5;TypeScript&#xFF0C;&#x6DF1;&#x6DF1;&#x7684;&#x559C;&#x6B22;&#x4E0A;&#x4E86;&#x8FD9;&#x4E2A;&#x8BED;&#x8A00;&#xFF0C;&#x867D;&#x8BF4;&#x4E5F;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x5C0F;&#x5C0F;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x8FD8;&#x662F;&#x80FD;&#x514B;&#x670D;&#x7684;:)&#x3002;<br>&#x4F7F;&#x7528;&#x4E00;&#x95E8;&#x9759;&#x6001;&#x5F3A;&#x7C7B;&#x578B;&#x7F16;&#x8BD1;&#x8BED;&#x8A00;&#xFF0C;&#x80FD;&#x591F;&#x5C06;&#x5F88;&#x591A;bug&#x90FD;&#x6D88;&#x706D;&#x5728;&#x5F00;&#x53D1;&#x671F;&#x95F4;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x4E0A;&#x8FF0;&#x63CF;&#x8FF0;&#x7684;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x793A;&#x4F8B;&#xFF1A;<a href="https://github.com/Jiasm/typescript-example" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;&#x4ED3;&#x5E93;</a></p><p>&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x73A9;&#x5F97;&#x5F00;&#x5FC3;&#xFF0C;&#x5982;&#x6709;&#x4EFB;&#x4F55;TS&#x76F8;&#x5173;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6B22;&#x8FCE;&#x6765;&#x9A9A;&#x6270;&#x3002;<code>NPM loves U.</code>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TypeScript在node项目中的实践

## 原文链接
[https://segmentfault.com/a/1190000015719697](https://segmentfault.com/a/1190000015719697)

