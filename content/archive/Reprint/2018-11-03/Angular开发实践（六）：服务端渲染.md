---
title: Angular开发实践（六）：服务端渲染
reprint: true
categories: reprint
abbrlink: 94b10dc
date: 2018-11-03 10:03:44
---

{{% raw %}}
<h2 id="articleHeader0">Angular Universal</h2><p>Angular&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x65B9;&#x9762;&#x63D0;&#x4F9B;&#x4E00;&#x5957;&#x524D;&#x540E;&#x7AEF;&#x540C;&#x6784;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x5B83;&#x5C31;&#x662F; <a href="https://github.com/angular/universal" rel="nofollow noreferrer" target="_blank">Angular Universal</a>&#xFF08;&#x7EDF;&#x4E00;&#x5E73;&#x53F0;&#xFF09;&#xFF0C;&#x4E00;&#x9879;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8FD0;&#x884C; Angular &#x5E94;&#x7528;&#x7684;&#x6280;&#x672F;&#x3002;</p><p>&#x6807;&#x51C6;&#x7684; Angular &#x5E94;&#x7528;&#x4F1A;&#x6267;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x5B83;&#x4F1A;&#x5728; DOM &#x4E2D;&#x6E32;&#x67D3;&#x9875;&#x9762;&#xFF0C;&#x4EE5;&#x54CD;&#x5E94;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x800C; Angular Universal &#x4F1A;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x88AB;&#x79F0;&#x4E3A;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF08;server-side rendering - SSR&#xFF09;&#x7684;&#x8FC7;&#x7A0B;&#x751F;&#x6210;&#x9759;&#x6001;&#x7684;&#x5E94;&#x7528;&#x9875;&#x9762;&#x3002;</p><p>&#x5B83;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x8FD9;&#x4E9B;&#x9875;&#x9762;&#xFF0C;&#x5E76;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8BF7;&#x6C42;&#x65F6;&#x76F4;&#x63A5;&#x7528;&#x5B83;&#x4EEC;&#x7ED9;&#x51FA;&#x54CD;&#x5E94;&#x3002; &#x5B83;&#x4E5F;&#x53EF;&#x4EE5;&#x628A;&#x9875;&#x9762;&#x9884;&#x5148;&#x751F;&#x6210;&#x4E3A; HTML &#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x5B83;&#x4EEC;&#x4F5C;&#x4E3A;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x4F9B;&#x670D;&#x52A1;&#x7AEF;&#x4F7F;&#x7528;&#x3002;</p><h3 id="articleHeader1">&#x5DE5;&#x4F5C;&#x539F;&#x7406;</h3><p>&#x8981;&#x5236;&#x4F5C;&#x4E00;&#x4E2A; Universal &#x5E94;&#x7528;&#xFF0C;&#x5C31;&#x8981;&#x5B89;&#x88C5; <code>platform-server</code> &#x5305;&#x3002; platform-server &#x5305;&#x63D0;&#x4F9B;&#x4E86;&#x670D;&#x52A1;&#x7AEF;&#x7684; DOM &#x5B9E;&#x73B0;&#x3001;XMLHttpRequest &#x548C;&#x5176;&#x5B83;&#x5E95;&#x5C42;&#x7279;&#x6027;&#xFF0C;&#x4F46;&#x4E0D;&#x518D;&#x4F9D;&#x8D56;&#x6D4F;&#x89C8;&#x5668;&#x3002;</p><p>&#x4F60;&#x8981;&#x4F7F;&#x7528; <code>platform-server</code> &#x6A21;&#x5757;&#x800C;&#x4E0D;&#x662F; <code>platform-browser</code> &#x6A21;&#x5757;&#x6765;&#x7F16;&#x8BD1;&#x8FD9;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x4E00;&#x4E2A; Web &#x670D;&#x52A1;&#x5668;&#x4E0A;&#x8FD0;&#x884C;&#x8FD9;&#x4E2A; Universal &#x5E94;&#x7528;&#x3002;</p><p>&#x670D;&#x52A1;&#x5668;&#xFF08;&#x4E0B;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x662F; Node Express &#x670D;&#x52A1;&#x5668;&#xFF09;&#x4F1A;&#x628A;&#x5BA2;&#x6237;&#x7AEF;&#x5BF9;&#x5E94;&#x7528;&#x9875;&#x9762;&#x7684;&#x8BF7;&#x6C42;&#x4F20;&#x7ED9; <code>renderModuleFactory</code> &#x51FD;&#x6570;&#x3002;</p><p>renderModuleFactory &#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6A21;&#x677F; HTML &#x9875;&#x9762;&#xFF08;&#x901A;&#x5E38;&#x662F; index.html&#xFF09;&#x3001;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x7684; Angular &#x6A21;&#x5757;&#x548C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x51B3;&#x5B9A;&#x8BE5;&#x663E;&#x793A;&#x54EA;&#x4E9B;&#x7EC4;&#x4EF6;&#x7684;&#x8DEF;&#x7531;&#x4F5C;&#x4E3A;&#x8F93;&#x5165;&#x3002;</p><p>&#x8BE5;&#x8DEF;&#x7531;&#x4ECE;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#x4F20;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#x3002; &#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x7ED9;&#x51FA;&#x6240;&#x8BF7;&#x6C42;&#x8DEF;&#x7531;&#x7684;&#x4E00;&#x4E2A;&#x9002;&#x5F53;&#x7684;&#x89C6;&#x56FE;&#x3002;</p><p>renderModuleFactory &#x5728;&#x6A21;&#x677F;&#x4E2D;&#x7684; <code>&lt;app&gt;</code> &#x6807;&#x8BB0;&#x4E2D;&#x6E32;&#x67D3;&#x51FA;&#x54EA;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x5E76;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B8C;&#x6210;&#x7684; HTML &#x9875;&#x9762;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5C31;&#x4F1A;&#x628A;&#x6E32;&#x67D3;&#x597D;&#x7684;&#x9875;&#x9762;&#x8FD4;&#x56DE;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x3002;</p><h2 id="articleHeader2">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;</h2><p>&#x4E09;&#x4E2A;&#x4E3B;&#x8981;&#x539F;&#x56E0;&#xFF1A;</p><ol><li>&#x5E2E;&#x52A9;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#xFF08;SEO&#xFF09;</li><li>&#x63D0;&#x5347;&#x5728;&#x624B;&#x673A;&#x548C;&#x4F4E;&#x529F;&#x8017;&#x8BBE;&#x5907;&#x4E0A;&#x7684;&#x6027;&#x80FD;</li><li>&#x8FC5;&#x901F;&#x663E;&#x793A;&#x51FA;&#x7B2C;&#x9996;&#x9875;</li></ol><h3 id="articleHeader3">&#x5E2E;&#x52A9;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#xFF08;SEO&#xFF09;</h3><p>Google&#x3001;Bing&#x3001;&#x767E;&#x5EA6;&#x3001;Facebook&#x3001;Twitter &#x548C;&#x5176;&#x5B83;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x6216;&#x793E;&#x4EA4;&#x5A92;&#x4F53;&#x7F51;&#x7AD9;&#x90FD;&#x4F9D;&#x8D56;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#x53BB;&#x7D22;&#x5F15;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x5185;&#x5BB9;&#xFF0C;&#x5E76;&#x4E14;&#x8BA9;&#x5B83;&#x7684;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7F51;&#x7EDC;&#x641C;&#x7D22;&#x5230;&#x3002;</p><p>&#x8FD9;&#x4E9B;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#x53EF;&#x80FD;&#x4E0D;&#x4F1A;&#x50CF;&#x4EBA;&#x7C7B;&#x90A3;&#x6837;&#x5BFC;&#x822A;&#x5230;&#x4F60;&#x7684;&#x5177;&#x6709;&#x9AD8;&#x5EA6;&#x4EA4;&#x4E92;&#x6027;&#x7684; Angular &#x5E94;&#x7528;&#xFF0C;&#x5E76;&#x4E3A;&#x5176;&#x5EFA;&#x7ACB;&#x7D22;&#x5F15;&#x3002;</p><p>Angular Universal &#x53EF;&#x4EE5;&#x4E3A;&#x4F60;&#x751F;&#x6210;&#x5E94;&#x7528;&#x7684;&#x9759;&#x6001;&#x7248;&#x672C;&#xFF0C;&#x5B83;&#x6613;&#x641C;&#x7D22;&#x3001;&#x53EF;&#x94FE;&#x63A5;&#xFF0C;&#x6D4F;&#x89C8;&#x65F6;&#x4E5F;&#x4E0D;&#x5FC5;&#x501F;&#x52A9; JavaScript&#x3002;&#x5B83;&#x4E5F;&#x8BA9;&#x7AD9;&#x70B9;&#x53EF;&#x4EE5;&#x88AB;&#x9884;&#x89C8;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A; URL &#x8FD4;&#x56DE;&#x7684;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5B8C;&#x5168;&#x6E32;&#x67D3;&#x597D;&#x7684;&#x9875;&#x9762;&#x3002;</p><p>&#x542F;&#x7528;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#x901A;&#x5E38;&#x88AB;&#x79F0;&#x4E3A;<a href="https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E4%BC%98%E5%8C%96/3132" rel="nofollow noreferrer" target="_blank">&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x4F18;&#x5316; (SEO)</a>&#x3002;</p><h3 id="articleHeader4">&#x63D0;&#x5347;&#x624B;&#x673A;&#x548C;&#x4F4E;&#x529F;&#x8017;&#x8BBE;&#x5907;&#x4E0A;&#x7684;&#x6027;&#x80FD;</h3><p>&#x6709;&#x4E9B;&#x8BBE;&#x5907;&#x4E0D;&#x652F;&#x6301; JavaScript &#x6216; JavaScript &#x6267;&#x884C;&#x5F97;&#x5F88;&#x5DEE;&#xFF0C;&#x5BFC;&#x81F4;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x4E0D;&#x53EF;&#x63A5;&#x53D7;&#x3002; &#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x60C5;&#x51B5;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x9700;&#x8981;&#x8BE5;&#x5E94;&#x7528;&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x3001;&#x65E0; JavaScript &#x7684;&#x7248;&#x672C;&#x3002; &#x867D;&#x7136;&#x6709;&#x4E00;&#x4E9B;&#x9650;&#x5236;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x53EF;&#x80FD;&#x662F;&#x90A3;&#x4E9B;&#x5B8C;&#x5168;&#x6CA1;&#x529E;&#x6CD5;&#x4F7F;&#x7528;&#x8BE5;&#x5E94;&#x7528;&#x7684;&#x4EBA;&#x7684;&#x552F;&#x4E00;&#x9009;&#x62E9;&#x3002;</p><h3 id="articleHeader5">&#x5FEB;&#x901F;&#x663E;&#x793A;&#x9996;&#x9875;</h3><p>&#x5FEB;&#x901F;&#x663E;&#x793A;&#x9996;&#x9875;&#x5BF9;&#x4E8E;&#x5438;&#x5F15;&#x7528;&#x6237;&#x662F;&#x81F3;&#x5173;&#x91CD;&#x8981;&#x7684;&#x3002;</p><p>&#x5982;&#x679C;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x8D85;&#x8FC7;&#x4E86;&#x4E09;&#x79D2;&#x4E2D;&#xFF0C;&#x90A3;&#x4E48; 53% &#x7684;&#x79FB;&#x52A8;&#x7F51;&#x7AD9;&#x4F1A;&#x88AB;&#x653E;&#x5F03;&#x3002; &#x4F60;&#x7684;&#x5E94;&#x7528;&#x9700;&#x8981;&#x542F;&#x52A8;&#x7684;&#x66F4;&#x5FEB;&#x4E00;&#x70B9;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x7528;&#x6237;&#x51B3;&#x5B9A;&#x505A;&#x522B;&#x7684;&#x4E8B;&#x60C5;&#x4E4B;&#x524D;&#x5438;&#x5F15;&#x4ED6;&#x4EEC;&#x7684;&#x6CE8;&#x610F;&#x529B;&#x3002;</p><p>&#x4F7F;&#x7528; Angular Universal&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4E3A;&#x5E94;&#x7528;&#x751F;&#x6210;&#x201C;&#x7740;&#x9646;&#x9875;&#x201D;&#xFF0C;&#x5B83;&#x4EEC;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x548C;&#x5B8C;&#x6574;&#x7684;&#x5E94;&#x7528;&#x4E00;&#x6837;&#x3002; &#x8FD9;&#x4E9B;&#x7740;&#x9646;&#x9875;&#x662F;&#x7EAF; HTML&#xFF0C;&#x5E76;&#x4E14;&#x5373;&#x4F7F; JavaScript &#x88AB;&#x7981;&#x7528;&#x4E86;&#x4E5F;&#x80FD;&#x663E;&#x793A;&#x3002; &#x8FD9;&#x4E9B;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x5904;&#x7406;&#x6D4F;&#x89C8;&#x5668;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FC7;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; routerLink &#x5728;&#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x4E2D;&#x5BFC;&#x822A;&#x3002;</p><p>&#x5728;&#x5B9E;&#x8DF5;&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x8981;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7740;&#x9646;&#x9875;&#x7684;&#x9759;&#x6001;&#x7248;&#x672C;&#x6765;&#x4FDD;&#x6301;&#x7528;&#x6237;&#x7684;&#x6CE8;&#x610F;&#x529B;&#x3002; &#x540C;&#x65F6;&#xFF0C;&#x4F60;&#x4E5F;&#x4F1A;&#x5728;&#x5E55;&#x540E;&#x52A0;&#x8F7D;&#x5B8C;&#x6574;&#x7684; Angular &#x5E94;&#x7528;&#x3002; &#x7528;&#x6237;&#x4F1A;&#x8BA4;&#x4E3A;&#x7740;&#x9646;&#x9875;&#x51E0;&#x4E4E;&#x662F;&#x7ACB;&#x5373;&#x51FA;&#x73B0;&#x7684;&#xFF0C;&#x800C;&#x5F53;&#x5B8C;&#x6574;&#x7684;&#x5E94;&#x7528;&#x52A0;&#x8F7D;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x5B8C;&#x5168;&#x7684;&#x4EA4;&#x4E92;&#x4F53;&#x9A8C;&#x3002;</p><h2 id="articleHeader6">&#x793A;&#x4F8B;&#x89E3;&#x6790;</h2><p>&#x4E0B;&#x9762;&#x5C06;&#x57FA;&#x4E8E;&#x6211;&#x5728;GitHub&#x4E0A;&#x7684;&#x793A;&#x4F8B;&#x9879;&#x76EE; <a href="https://github.com/laixiangran/angular-universal-starter" rel="nofollow noreferrer" target="_blank">angular-universal-starter</a> &#x6765;&#x8FDB;&#x884C;&#x8BB2;&#x89E3;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E0E;&#x7B2C;&#x4E00;&#x7BC7;&#x7684;&#x793A;&#x4F8B;&#x9879;&#x76EE;&#x4E00;&#x6837;&#xFF0C;&#x90FD;&#x662F;&#x57FA;&#x4E8E; Angular CLI&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x6784;&#x5EFA;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x4EEC;&#x7684;&#x533A;&#x522B;&#x53EA;&#x5728;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x6240;&#x9700;&#x7684;&#x90A3;&#x4E9B;&#x914D;&#x7F6E;&#x4E0A;&#x3002;</p><h3 id="articleHeader7">&#x5B89;&#x88C5;&#x5DE5;&#x5177;</h3><p>&#x5728;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x4E0B;&#x5217;&#x5305;&#x662F;&#x5FC5;&#x987B;&#x5B89;&#x88C5;&#x7684;&#xFF08;&#x793A;&#x4F8B;&#x9879;&#x76EE;&#x5747;&#x5DF2;&#x914D;&#x7F6E;&#x597D;&#xFF0C;&#x53EA;&#x9700; <code>npm install</code> &#x5373;&#x53EF;&#xFF09;&#xFF1A;</p><ul><li><code>@angular/platform-server</code> - Universal &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x5143;&#x4EF6;&#x3002;</li><li><code>@nguniversal/module-map-ngfactory-loader</code> - &#x7528;&#x4E8E;&#x5904;&#x7406;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x60F0;&#x6027;&#x52A0;&#x8F7D;&#x3002;</li><li><code>@nguniversal/express-engine</code> - Universal &#x5E94;&#x7528;&#x7684; <a href="https://github.com/angular/universal/tree/master/modules/express-engine" rel="nofollow noreferrer" target="_blank">Express &#x5F15;&#x64CE;</a>&#x3002;</li><li><code>ts-loader</code> - &#x7528;&#x4E8E;&#x5BF9;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x8FDB;&#x884C;&#x8F6C;&#x8BD1;&#x3002;</li><li><code>express</code> - Node Express &#x670D;&#x52A1;&#x5668;</li></ul><p>&#x4F7F;&#x7528;&#x4E0B;&#x5217;&#x547D;&#x4EE4;&#x5B89;&#x88C5;&#x5B83;&#x4EEC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine express" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine express</code></pre><h3 id="articleHeader8">&#x9879;&#x76EE;&#x914D;&#x7F6E;</h3><p>&#x914D;&#x7F6E;&#x5DE5;&#x4F5C;&#x6709;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x6A21;&#x5757;&#xFF1A;<code>src/app/app.server.module.ts</code></li><li>&#x4FEE;&#x6539;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x6A21;&#x5757;&#xFF1A;<code>src/app/app.module.ts</code></li><li>&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x5F15;&#x5BFC;&#x7A0B;&#x5E8F;&#x6587;&#x4EF6;&#xFF1A;<code>src/main.server.ts</code></li><li>&#x4FEE;&#x6539;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x5F15;&#x5BFC;&#x7A0B;&#x5E8F;&#x6587;&#x4EF6;&#xFF1A;<code>src/main.ts</code></li><li>&#x521B;&#x5EFA; TypeScript &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;<code>src/tsconfig.server.json</code></li><li>&#x4FEE;&#x6539; @angular/cli &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1A;<code>.angular-cli.json</code></li><li>&#x521B;&#x5EFA; Node Express &#x7684;&#x670D;&#x52A1;&#x7A0B;&#x5E8F;&#xFF1A;<code>server.ts</code></li><li>&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x9884;&#x6E32;&#x67D3;&#x7684;&#x7A0B;&#x5E8F;&#xFF1A;<code>prerender.ts</code></li><li>&#x521B;&#x5EFA; Webpack &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;<code>webpack.server.config.js</code></li></ol><h4>1&#x3001;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x6A21;&#x5757;&#xFF1A;<code>src/app/app.server.module.ts</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule } from &apos;@angular/core&apos;;
import { ServerModule, ServerTransferStateModule } from &apos;@angular/platform-server&apos;;
import { ModuleMapLoaderModule } from &apos;@nguniversal/module-map-ngfactory-loader&apos;;

import { AppBrowserModule } from &apos;./app.module&apos;;
import { AppComponent } from &apos;./app.component&apos;;

// &#x53EF;&#x4EE5;&#x6CE8;&#x518C;&#x90A3;&#x4E9B;&#x5728; Universal &#x73AF;&#x5883;&#x4E0B;&#x8FD0;&#x884C;&#x5E94;&#x7528;&#x65F6;&#x7279;&#x6709;&#x7684;&#x670D;&#x52A1;&#x63D0;&#x4F9B;&#x5546;
@NgModule({
    imports: [
        AppBrowserModule, // &#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x7684; AppModule
        ServerModule, // &#x670D;&#x52A1;&#x7AEF;&#x7684; Angular &#x6A21;&#x5757;
        ModuleMapLoaderModule, // &#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x8DEF;&#x7531;&#x7684;&#x60F0;&#x6027;&#x52A0;&#x8F7D;
        ServerTransferStateModule, // &#x5728;&#x670D;&#x52A1;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { ServerModule, ServerTransferStateModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-server&apos;</span>;
<span class="hljs-keyword">import</span> { ModuleMapLoaderModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@nguniversal/module-map-ngfactory-loader&apos;</span>;

<span class="hljs-keyword">import</span> { AppBrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.module&apos;</span>;
<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.component&apos;</span>;

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x6CE8;&#x518C;&#x90A3;&#x4E9B;&#x5728; Universal &#x73AF;&#x5883;&#x4E0B;&#x8FD0;&#x884C;&#x5E94;&#x7528;&#x65F6;&#x7279;&#x6709;&#x7684;&#x670D;&#x52A1;&#x63D0;&#x4F9B;&#x5546;</span>
@NgModule({
    <span class="hljs-attr">imports</span>: [
        AppBrowserModule, <span class="hljs-comment">// &#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x7684; AppModule</span>
        ServerModule, <span class="hljs-comment">// &#x670D;&#x52A1;&#x7AEF;&#x7684; Angular &#x6A21;&#x5757;</span>
        ModuleMapLoaderModule, <span class="hljs-comment">// &#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x8DEF;&#x7531;&#x7684;&#x60F0;&#x6027;&#x52A0;&#x8F7D;</span>
        ServerTransferStateModule, <span class="hljs-comment">// &#x5728;&#x670D;&#x52A1;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;</span>
    ],
    <span class="hljs-attr">bootstrap</span>: [AppComponent],
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppServerModule</span> </span>{
}</code></pre><p>&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x6A21;&#x5757;&#xFF08;&#x4E60;&#x60EF;&#x4E0A;&#x53EB;&#x4F5C; AppServerModule&#xFF09;&#x662F;&#x4E00;&#x4E2A; Angular &#x6A21;&#x5757;&#xFF0C;&#x5B83;&#x5305;&#x88C5;&#x4E86;&#x5E94;&#x7528;&#x7684;&#x6839;&#x6A21;&#x5757; AppModule&#xFF0C;&#x4EE5;&#x4FBF; Universal &#x53EF;&#x4EE5;&#x5728;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x548C;&#x670D;&#x52A1;&#x5668;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x534F;&#x8C03;&#x3002; AppServerModule &#x8FD8;&#x4F1A;&#x544A;&#x8BC9; Angular &#x518D;&#x628A;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x4EE5; Universal &#x65B9;&#x5F0F;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x8BE5;&#x5982;&#x4F55;&#x5F15;&#x5BFC;&#x5B83;&#x3002;</p><h4>2&#x3001;&#x4FEE;&#x6539;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x6A21;&#x5757;&#xFF1A;<code>src/app/app.module.ts</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserModule, BrowserTransferStateModule } from &apos;@angular/platform-browser&apos;;
import { HttpClientModule } from &apos;@angular/common/http&apos;;
import { APP_ID, Inject, NgModule, PLATFORM_ID } from &apos;@angular/core&apos;;
import { AppComponent } from &apos;./app.component&apos;;
import { HomeComponent } from &apos;./home/home.component&apos;;
import { TransferHttpCacheModule } from &apos;@nguniversal/common&apos;;
import { isPlatformBrowser } from &apos;@angular/common&apos;;
import { AppRoutingModule } from &apos;./app.routes&apos;;

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule.withServerTransition({appId: &apos;my-app&apos;}),
        TransferHttpCacheModule, // &#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x5668;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x4F20;&#x8F93;&#x7F13;&#x5B58;&#xFF0C;&#x9632;&#x6B62;&#x5BA2;&#x6237;&#x7AEF;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x7AEF;&#x5DF2;&#x5B8C;&#x6210;&#x7684;&#x8BF7;&#x6C42;
        BrowserTransferStateModule, // &#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppBrowserModule {
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string) {
        
        // &#x5224;&#x65AD;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x8FD8;&#x662F;&#x670D;&#x52A1;&#x7AEF;
        const platform = isPlatformBrowser(platformId) ? &apos;in the browser&apos; : &apos;on the server&apos;;
        console.log(`Running ${platform} with appId=${appId}`);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { BrowserModule, BrowserTransferStateModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-browser&apos;</span>;
<span class="hljs-keyword">import</span> { HttpClientModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/common/http&apos;</span>;
<span class="hljs-keyword">import</span> { APP_ID, Inject, NgModule, PLATFORM_ID } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.component&apos;</span>;
<span class="hljs-keyword">import</span> { HomeComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./home/home.component&apos;</span>;
<span class="hljs-keyword">import</span> { TransferHttpCacheModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@nguniversal/common&apos;</span>;
<span class="hljs-keyword">import</span> { isPlatformBrowser } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/common&apos;</span>;
<span class="hljs-keyword">import</span> { AppRoutingModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.routes&apos;</span>;

@NgModule({
    <span class="hljs-attr">imports</span>: [
        AppRoutingModule,
        BrowserModule.withServerTransition({<span class="hljs-attr">appId</span>: <span class="hljs-string">&apos;my-app&apos;</span>}),
        TransferHttpCacheModule, <span class="hljs-comment">// &#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x5668;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x4F20;&#x8F93;&#x7F13;&#x5B58;&#xFF0C;&#x9632;&#x6B62;&#x5BA2;&#x6237;&#x7AEF;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x7AEF;&#x5DF2;&#x5B8C;&#x6210;&#x7684;&#x8BF7;&#x6C42;</span>
        BrowserTransferStateModule, <span class="hljs-comment">// &#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;</span>
        HttpClientModule
    ],
    <span class="hljs-attr">declarations</span>: [
        AppComponent,
        HomeComponent
    ],
    <span class="hljs-attr">providers</span>: [],
    <span class="hljs-attr">bootstrap</span>: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppBrowserModule</span> </span>{
    <span class="hljs-keyword">constructor</span>(@Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string) {
        
        <span class="hljs-comment">// &#x5224;&#x65AD;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x8FD8;&#x662F;&#x670D;&#x52A1;&#x7AEF;</span>
        <span class="hljs-keyword">const</span> platform = isPlatformBrowser(platformId) ? <span class="hljs-string">&apos;in the browser&apos;</span> : <span class="hljs-string">&apos;on the server&apos;</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Running <span class="hljs-subst">${platform}</span> with appId=<span class="hljs-subst">${appId}</span>`</span>);
    }
}</code></pre><p>&#x5C06; <code>NgModule</code> &#x7684;&#x5143;&#x6570;&#x636E;&#x4E2D; BrowserModule &#x7684;&#x5BFC;&#x5165;&#x6539;&#x6210; BrowserModule.withServerTransition({appId: &apos;my-app&apos;})&#xFF0C;Angular &#x4F1A;&#x628A; appId &#x503C;&#xFF08;&#x5B83;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x4F55;&#x5B57;&#x7B26;&#x4E32;&#xFF09;&#x6DFB;&#x52A0;&#x5230;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x9875;&#x9762;&#x7684;&#x6837;&#x5F0F;&#x540D;&#x4E2D;&#xFF0C;&#x4EE5;&#x4FBF;&#x5B83;&#x4EEC;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x542F;&#x52A8;&#x65F6;&#x53EF;&#x4EE5;&#x88AB;&#x627E;&#x5230;&#x5E76;&#x79FB;&#x9664;&#x3002;</p><p>&#x6B64;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F9D;&#x8D56;&#x6CE8;&#x5165;&#xFF08;<code>@Inject(PLATFORM_ID)</code> &#x53CA; <code>@Inject(APP_ID)</code>&#xFF09;&#x53D6;&#x5F97;&#x5173;&#x4E8E;&#x5F53;&#x524D;&#x5E73;&#x53F0;&#x548C; appId &#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(@Inject(PLATFORM_ID) private platformId: Object,
            @Inject(APP_ID) private appId: string) {
    
    // &#x5224;&#x65AD;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x8FD8;&#x662F;&#x670D;&#x52A1;&#x7AEF;
    const platform = isPlatformBrowser(platformId) ? &apos;in the browser&apos; : &apos;on the server&apos;;
    console.log(`Running ${platform} with appId=${appId}`);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>(@Inject(PLATFORM_ID) private platformId: Object,
            @Inject(APP_ID) private appId: string) {
    
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x8FD8;&#x662F;&#x670D;&#x52A1;&#x7AEF;</span>
    <span class="hljs-keyword">const</span> platform = isPlatformBrowser(platformId) ? <span class="hljs-string">&apos;in the browser&apos;</span> : <span class="hljs-string">&apos;on the server&apos;</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Running <span class="hljs-subst">${platform}</span> with appId=<span class="hljs-subst">${appId}</span>`</span>);
}</code></pre><h4>3&#x3001;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x5F15;&#x5BFC;&#x7A0B;&#x5E8F;&#x6587;&#x4EF6;&#xFF1A;<code>src/main.server.ts</code></h4><p>&#x8BE5;&#x6587;&#x4EF6;&#x5BFC;&#x51FA;&#x670D;&#x52A1;&#x7AEF;&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export { AppServerModule } from &apos;./app/app.server.module&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">export</span> { AppServerModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app/app.server.module&apos;</span>;</code></pre><h4>4&#x3001;&#x4FEE;&#x6539;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x5F15;&#x5BFC;&#x7A0B;&#x5E8F;&#x6587;&#x4EF6;&#xFF1A;<code>src/main.ts</code></h4><p>&#x76D1;&#x542C; DOMContentLoaded &#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x53D1;&#x751F; DOMContentLoaded &#x4E8B;&#x4EF6;&#x65F6;&#x8FD0;&#x884C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x4F7F; TransferState &#x6B63;&#x5E38;&#x5DE5;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { enableProdMode } from &apos;@angular/core&apos;;
import { platformBrowserDynamic } from &apos;@angular/platform-browser-dynamic&apos;;

import { AppBrowserModule } from &apos;./app/app.module&apos;;
import { environment } from &apos;./environments/environment&apos;;

if (environment.production) {
    enableProdMode();
}

// &#x5728; DOMContentLoaded &#x65F6;&#x8FD0;&#x884C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x4F7F; TransferState &#x6B63;&#x5E38;&#x5DE5;&#x4F5C;
document.addEventListener(&apos;DOMContentLoaded&apos;, () =&gt; {
    platformBrowserDynamic().bootstrapModule(AppBrowserModule);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { enableProdMode } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { platformBrowserDynamic } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-browser-dynamic&apos;</span>;

<span class="hljs-keyword">import</span> { AppBrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app/app.module&apos;</span>;
<span class="hljs-keyword">import</span> { environment } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./environments/environment&apos;</span>;

<span class="hljs-keyword">if</span> (environment.production) {
    enableProdMode();
}

<span class="hljs-comment">// &#x5728; DOMContentLoaded &#x65F6;&#x8FD0;&#x884C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x4F7F; TransferState &#x6B63;&#x5E38;&#x5DE5;&#x4F5C;</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;DOMContentLoaded&apos;</span>, () =&gt; {
    platformBrowserDynamic().bootstrapModule(AppBrowserModule);
});</code></pre><h4>5&#x3001;&#x521B;&#x5EFA; TypeScript &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;<code>src/tsconfig.server.json</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;../tsconfig.json&quot;,
  &quot;compilerOptions&quot;: {
    &quot;outDir&quot;: &quot;../out-tsc/app&quot;,
    &quot;baseUrl&quot;: &quot;./&quot;,
    &quot;module&quot;: &quot;commonjs&quot;,
    &quot;types&quot;: [
      &quot;node&quot;
    ]
  },
  &quot;exclude&quot;: [
    &quot;test.ts&quot;,
    &quot;**/*.spec.ts&quot;
  ],
  &quot;angularCompilerOptions&quot;: {
    &quot;entryModule&quot;: &quot;app/app.server.module#AppServerModule&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;extends&quot;</span>: <span class="hljs-string">&quot;../tsconfig.json&quot;</span>,
  <span class="hljs-attr">&quot;compilerOptions&quot;</span>: {
    <span class="hljs-attr">&quot;outDir&quot;</span>: <span class="hljs-string">&quot;../out-tsc/app&quot;</span>,
    <span class="hljs-attr">&quot;baseUrl&quot;</span>: <span class="hljs-string">&quot;./&quot;</span>,
    <span class="hljs-attr">&quot;module&quot;</span>: <span class="hljs-string">&quot;commonjs&quot;</span>,
    <span class="hljs-attr">&quot;types&quot;</span>: [
      <span class="hljs-string">&quot;node&quot;</span>
    ]
  },
  <span class="hljs-attr">&quot;exclude&quot;</span>: [
    <span class="hljs-string">&quot;test.ts&quot;</span>,
    <span class="hljs-string">&quot;**/*.spec.ts&quot;</span>
  ],
  <span class="hljs-attr">&quot;angularCompilerOptions&quot;</span>: {
    <span class="hljs-attr">&quot;entryModule&quot;</span>: <span class="hljs-string">&quot;app/app.server.module#AppServerModule&quot;</span>
  }
}</code></pre><p>&#x4E0E; <code>tsconfig.app.json</code> &#x7684;&#x5DEE;&#x5F02;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>module &#x5C5E;&#x6027;&#x5FC5;&#x987B;&#x662F; commonjs&#xFF0C;&#x8FD9;&#x6837;&#x5B83;&#x624D;&#x80FD;&#x88AB; require() &#x65B9;&#x6CD5;&#x5BFC;&#x5165;&#x4F60;&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x3002;</li><li><p>angularCompilerOptions &#x90E8;&#x5206;&#x6709;&#x4E00;&#x4E9B;&#x9762;&#x5411; AOT &#x7F16;&#x8BD1;&#x5668;&#x7684;&#x9009;&#x9879;&#xFF1A;</p><ul><li>entryModule - &#x670D;&#x52A1;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x6839;&#x6A21;&#x5757;&#xFF0C;&#x5176;&#x683C;&#x5F0F;&#x4E3A; path/to/file#ClassName&#x3002;</li></ul></li></ul><h4>6&#x3001;&#x4FEE;&#x6539; @angular/cli &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1A;<code>.angular-cli.json</code></h4><p>&#x5728; <code>apps</code> &#x4E0B;&#x6DFB;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;platform&quot;: &quot;server&quot;,
    &quot;root&quot;: &quot;src&quot;,
    &quot;outDir&quot;: &quot;dist/server&quot;,
    &quot;assets&quot;: [
      &quot;assets&quot;,
      &quot;favicon.ico&quot;
    ],
    &quot;index&quot;: &quot;index.html&quot;,
    &quot;main&quot;: &quot;main.server.ts&quot;,
    &quot;test&quot;: &quot;test.ts&quot;,
    &quot;tsconfig&quot;: &quot;tsconfig.server.json&quot;,
    &quot;testTsconfig&quot;: &quot;tsconfig.spec.json&quot;,
    &quot;prefix&quot;: &quot;&quot;,
    &quot;styles&quot;: [
      &quot;styles.scss&quot;
    ],
    &quot;scripts&quot;: [],
    &quot;environmentSource&quot;: &quot;environments/environment.ts&quot;,
    &quot;environments&quot;: {
      &quot;dev&quot;: &quot;environments/environment.ts&quot;,
      &quot;prod&quot;: &quot;environments/environment.prod.ts&quot;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;platform&quot;</span>: <span class="hljs-string">&quot;server&quot;</span>,
    <span class="hljs-attr">&quot;root&quot;</span>: <span class="hljs-string">&quot;src&quot;</span>,
    <span class="hljs-attr">&quot;outDir&quot;</span>: <span class="hljs-string">&quot;dist/server&quot;</span>,
    <span class="hljs-attr">&quot;assets&quot;</span>: [
      <span class="hljs-string">&quot;assets&quot;</span>,
      <span class="hljs-string">&quot;favicon.ico&quot;</span>
    ],
    <span class="hljs-attr">&quot;index&quot;</span>: <span class="hljs-string">&quot;index.html&quot;</span>,
    <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;main.server.ts&quot;</span>,
    <span class="hljs-attr">&quot;test&quot;</span>: <span class="hljs-string">&quot;test.ts&quot;</span>,
    <span class="hljs-attr">&quot;tsconfig&quot;</span>: <span class="hljs-string">&quot;tsconfig.server.json&quot;</span>,
    <span class="hljs-attr">&quot;testTsconfig&quot;</span>: <span class="hljs-string">&quot;tsconfig.spec.json&quot;</span>,
    <span class="hljs-attr">&quot;prefix&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">&quot;styles&quot;</span>: [
      <span class="hljs-string">&quot;styles.scss&quot;</span>
    ],
    <span class="hljs-attr">&quot;scripts&quot;</span>: [],
    <span class="hljs-attr">&quot;environmentSource&quot;</span>: <span class="hljs-string">&quot;environments/environment.ts&quot;</span>,
    <span class="hljs-attr">&quot;environments&quot;</span>: {
      <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;environments/environment.ts&quot;</span>,
      <span class="hljs-attr">&quot;prod&quot;</span>: <span class="hljs-string">&quot;environments/environment.prod.ts&quot;</span>
    }
}</code></pre><h4>7&#x3001;&#x521B;&#x5EFA; Node Express &#x7684;&#x670D;&#x52A1;&#x7A0B;&#x5E8F;&#xFF1A;<code>server.ts</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;zone.js/dist/zone-node&apos;;
import &apos;reflect-metadata&apos;;
import { enableProdMode } from &apos;@angular/core&apos;;

import * as express from &apos;express&apos;;
import { join } from &apos;path&apos;;
import { readFileSync } from &apos;fs&apos;;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), &apos;dist&apos;);

// Our index.html we&apos;ll use as our template
const template = readFileSync(join(DIST_FOLDER, &apos;browser&apos;, &apos;index.html&apos;)).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(&apos;./dist/server/main.bundle&apos;);

// Express Engine
import { ngExpressEngine } from &apos;@nguniversal/express-engine&apos;;
// Import module map for lazy loading
import { provideModuleMap } from &apos;@nguniversal/module-map-ngfactory-loader&apos;;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(&apos;html&apos;, ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set(&apos;view engine&apos;, &apos;html&apos;);
app.set(&apos;views&apos;, join(DIST_FOLDER, &apos;browser&apos;));

/* - Example Express Rest API endpoints -
  app.get(&apos;/api/**&apos;, (req, res) =&gt; { });
*/

// Server static files from /browser
app.get(&apos;*.*&apos;, express.static(join(DIST_FOLDER, &apos;browser&apos;), {
    maxAge: &apos;1y&apos;
}));

// ALl regular routes use the Universal engine
app.get(&apos;*&apos;, (req, res) =&gt; {
    res.render(&apos;index&apos;, {req});
});

// Start up the Node server
app.listen(PORT, () =&gt; {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;zone.js/dist/zone-node&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;reflect-metadata&apos;</span>;
<span class="hljs-keyword">import</span> { enableProdMode } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;express&apos;</span>;
<span class="hljs-keyword">import</span> { join } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;path&apos;</span>;
<span class="hljs-keyword">import</span> { readFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;fs&apos;</span>;

<span class="hljs-comment">// Faster server renders w/ Prod mode (dev mode never needed)</span>
enableProdMode();

<span class="hljs-comment">// Express server</span>
<span class="hljs-keyword">const</span> app = express();

<span class="hljs-keyword">const</span> PORT = process.env.PORT || <span class="hljs-number">4000</span>;
<span class="hljs-keyword">const</span> DIST_FOLDER = join(process.cwd(), <span class="hljs-string">&apos;dist&apos;</span>);

<span class="hljs-comment">// Our index.html we&apos;ll use as our template</span>
<span class="hljs-keyword">const</span> template = readFileSync(join(DIST_FOLDER, <span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;index.html&apos;</span>)).toString();

<span class="hljs-comment">// * NOTE :: leave this as require() since this file is built Dynamically from webpack</span>
<span class="hljs-keyword">const</span> {AppServerModuleNgFactory, LAZY_MODULE_MAP} = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./dist/server/main.bundle&apos;</span>);

<span class="hljs-comment">// Express Engine</span>
<span class="hljs-keyword">import</span> { ngExpressEngine } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@nguniversal/express-engine&apos;</span>;
<span class="hljs-comment">// Import module map for lazy loading</span>
<span class="hljs-keyword">import</span> { provideModuleMap } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@nguniversal/module-map-ngfactory-loader&apos;</span>;

<span class="hljs-comment">// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)</span>
app.engine(<span class="hljs-string">&apos;html&apos;</span>, ngExpressEngine({
    <span class="hljs-attr">bootstrap</span>: AppServerModuleNgFactory,
    <span class="hljs-attr">providers</span>: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set(<span class="hljs-string">&apos;view engine&apos;</span>, <span class="hljs-string">&apos;html&apos;</span>);
app.set(<span class="hljs-string">&apos;views&apos;</span>, join(DIST_FOLDER, <span class="hljs-string">&apos;browser&apos;</span>));

<span class="hljs-comment">/* - Example Express Rest API endpoints -
  app.get(&apos;/api/**&apos;, (req, res) =&gt; { });
*/</span>

<span class="hljs-comment">// Server static files from /browser</span>
app.get(<span class="hljs-string">&apos;*.*&apos;</span>, express.static(join(DIST_FOLDER, <span class="hljs-string">&apos;browser&apos;</span>), {
    <span class="hljs-attr">maxAge</span>: <span class="hljs-string">&apos;1y&apos;</span>
}));

<span class="hljs-comment">// ALl regular routes use the Universal engine</span>
app.get(<span class="hljs-string">&apos;*&apos;</span>, (req, res) =&gt; {
    res.render(<span class="hljs-string">&apos;index&apos;</span>, {req});
});

<span class="hljs-comment">// Start up the Node server</span>
app.listen(PORT, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Node Express server listening on http://localhost:<span class="hljs-subst">${PORT}</span>`</span>);
});</code></pre><h5>Universal &#x6A21;&#x677F;&#x5F15;&#x64CE;</h5><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x90E8;&#x5206;&#x662F; ngExpressEngine &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.engine(&apos;html&apos;, ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.engine(<span class="hljs-string">&apos;html&apos;</span>, ngExpressEngine({
    <span class="hljs-attr">bootstrap</span>: AppServerModuleNgFactory,
    <span class="hljs-attr">providers</span>: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));</code></pre><p>ngExpressEngine &#x662F;&#x5BF9; Universal &#x7684; renderModuleFactory &#x51FD;&#x6570;&#x7684;&#x5C01;&#x88C5;&#x3002;&#x5B83;&#x4F1A;&#x628A;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x6210;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684; HTML &#x9875;&#x9762;&#x3002;<strong>&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x4E8E;Node&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6280;&#x672F;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x8BE5;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#x4E2D;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;</strong></p><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4F60;&#x4EE5;&#x524D;&#x5199;&#x8FC7;&#x7684; AppServerModule&#x3002; &#x5B83;&#x662F; Universal &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x5668;&#x548C;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x4E4B;&#x95F4;&#x7684;&#x6865;&#x6881;&#x3002;</li><li>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F; extraProviders&#x3002;&#x5B83;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x8FD0;&#x884C;&#x65F6;&#x624D;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E9B;&#x53EF;&#x9009;&#x7684; Angular &#x4F9D;&#x8D56;&#x6CE8;&#x5165;&#x63D0;&#x4F9B;&#x5546;&#x3002;&#x5F53;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x9700;&#x8981;&#x90A3;&#x4E9B;&#x53EA;&#x6709;&#x5F53;&#x8FD0;&#x884C;&#x5728;&#x670D;&#x52A1;&#x5668;&#x5B9E;&#x4F8B;&#x4E2D;&#x624D;&#x9700;&#x8981;&#x7684;&#x4FE1;&#x606F;&#x65F6;&#xFF0C;&#x5C31;&#x8981;&#x63D0;&#x4F9B; extraProviders &#x53C2;&#x6570;&#x3002;</li></ul><p>ngExpressEngine &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x4F1A;&#x89E3;&#x6790;&#x6210;&#x6E32;&#x67D3;&#x597D;&#x7684;&#x9875;&#x9762;&#x7684;&#x627F;&#x8BFA;&#xFF08;Promise&#xFF09;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x4F60;&#x7684;&#x5F15;&#x64CE;&#x8981;&#x51B3;&#x5B9A;&#x62FF;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x505A;&#x70B9;&#x4EC0;&#x4E48;&#x3002; &#x73B0;&#x5728;&#x8FD9;&#x4E2A;&#x5F15;&#x64CE;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x628A;&#x6E32;&#x67D3;&#x597D;&#x7684;&#x9875;&#x9762;&#x8FD4;&#x56DE;&#x7ED9;&#x4E86; Web &#x670D;&#x52A1;&#x5668;&#xFF0C;&#x7136;&#x540E;&#x670D;&#x52A1;&#x5668;&#x901A;&#x8FC7; HTTP &#x54CD;&#x5E94;&#x628A;&#x5B83;&#x8F6C;&#x53D1;&#x7ED9;&#x4E86;&#x5BA2;&#x6237;&#x7AEF;&#x3002;</p><h4>8&#x3001;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x9884;&#x6E32;&#x67D3;&#x7684;&#x7A0B;&#x5E8F;&#xFF1A;<code>prerender.ts</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Load zone.js for the server.
import &apos;zone.js/dist/zone-node&apos;;
import &apos;reflect-metadata&apos;;
import { readFileSync, writeFileSync, existsSync, mkdirSync } from &apos;fs&apos;;
import { join } from &apos;path&apos;;

import { enableProdMode } from &apos;@angular/core&apos;;
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import { provideModuleMap } from &apos;@nguniversal/module-map-ngfactory-loader&apos;;
import { renderModuleFactory } from &apos;@angular/platform-server&apos;;
import { ROUTES } from &apos;./static.paths&apos;;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(&apos;./dist/server/main.bundle&apos;);

const BROWSER_FOLDER = join(process.cwd(), &apos;browser&apos;);

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join(&apos;browser&apos;, &apos;index.html&apos;), &apos;utf8&apos;);

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route =&gt; {
    const fullPath = join(BROWSER_FOLDER, route);

    // Make sure the directory structure is there
    if (!existsSync(fullPath)) {
        mkdirSync(fullPath);
    }

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender.then(_ =&gt; renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    })).then(html =&gt; writeFileSync(join(fullPath, &apos;index.html&apos;), html));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Load zone.js for the server.</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;zone.js/dist/zone-node&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;reflect-metadata&apos;</span>;
<span class="hljs-keyword">import</span> { readFileSync, writeFileSync, existsSync, mkdirSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;fs&apos;</span>;
<span class="hljs-keyword">import</span> { join } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;path&apos;</span>;

<span class="hljs-keyword">import</span> { enableProdMode } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-comment">// Faster server renders w/ Prod mode (dev mode never needed)</span>
enableProdMode();

<span class="hljs-comment">// Import module map for lazy loading</span>
<span class="hljs-keyword">import</span> { provideModuleMap } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@nguniversal/module-map-ngfactory-loader&apos;</span>;
<span class="hljs-keyword">import</span> { renderModuleFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-server&apos;</span>;
<span class="hljs-keyword">import</span> { ROUTES } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./static.paths&apos;</span>;

<span class="hljs-comment">// * NOTE :: leave this as require() since this file is built Dynamically from webpack</span>
<span class="hljs-keyword">const</span> {AppServerModuleNgFactory, LAZY_MODULE_MAP} = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./dist/server/main.bundle&apos;</span>);

<span class="hljs-keyword">const</span> BROWSER_FOLDER = join(process.cwd(), <span class="hljs-string">&apos;browser&apos;</span>);

<span class="hljs-comment">// Load the index.html file containing referances to your application bundle.</span>
<span class="hljs-keyword">const</span> index = readFileSync(join(<span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;index.html&apos;</span>), <span class="hljs-string">&apos;utf8&apos;</span>);

<span class="hljs-keyword">let</span> previousRender = <span class="hljs-built_in">Promise</span>.resolve();

<span class="hljs-comment">// Iterate each route path</span>
ROUTES.forEach(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> fullPath = join(BROWSER_FOLDER, route);

    <span class="hljs-comment">// Make sure the directory structure is there</span>
    <span class="hljs-keyword">if</span> (!existsSync(fullPath)) {
        mkdirSync(fullPath);
    }

    <span class="hljs-comment">// Writes rendered HTML to index.html, replacing the file if it already exists.</span>
    previousRender = previousRender.then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> renderModuleFactory(AppServerModuleNgFactory, {
        <span class="hljs-attr">document</span>: index,
        <span class="hljs-attr">url</span>: route,
        <span class="hljs-attr">extraProviders</span>: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    })).then(<span class="hljs-function"><span class="hljs-params">html</span> =&gt;</span> writeFileSync(join(fullPath, <span class="hljs-string">&apos;index.html&apos;</span>), html));
});</code></pre><h4>9&#x3001;&#x521B;&#x5EFA; Webpack &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;<code>webpack.server.config.js</code></h4><p>Universal &#x5E94;&#x7528;&#x4E0D;&#x9700;&#x8981;&#x4EFB;&#x4F55;&#x989D;&#x5916;&#x7684; Webpack &#x914D;&#x7F6E;&#xFF0C;Angular CLI &#x4F1A;&#x5E2E;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x5B83;&#x4EEC;&#x3002;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x672C;&#x4F8B;&#x5B50;&#x7684; Node Express &#x7684;&#x670D;&#x52A1;&#x7A0B;&#x5E8F;&#x662F; TypeScript &#x5E94;&#x7528;&#xFF08;server.ts&#x53CA;prerender.ts&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x4F7F;&#x7528; Webpack &#x6765;&#x8F6C;&#x8BD1;&#x5B83;&#x3002;&#x8FD9;&#x91CC;&#x4E0D;&#x8BA8;&#x8BBA; Webpack &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x7684;&#x79FB;&#x6B65; <a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack&#x5B98;&#x7F51;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);

module.exports = {
    entry: {
        server: &apos;./server.ts&apos;, // This is our Express server for Dynamic universal
        prerender: &apos;./prerender.ts&apos; // This is an example of Static prerendering (generative)
    },
    target: &apos;node&apos;,
    resolve: {extensions: [&apos;.ts&apos;, &apos;.js&apos;]},
    externals: [/(node_modules|main\..*\.js)/,], // Make sure we include all node_modules etc
    output: {
        path: path.join(__dirname, &apos;dist&apos;), // Puts the output at the root of the dist folder
        filename: &apos;[name].js&apos;
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: &apos;ts-loader&apos;}
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/, // fixes WARNING Critical dependency: the request of a dependency is an expression
            path.join(__dirname, &apos;src&apos;), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/, // fixes WARNING Critical dependency: the request of a dependency is an expression
            path.join(__dirname, &apos;src&apos;),
            {}
        )
    ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Work around for https://github.com/angular/angular-cli/issues/7200</span>

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">server</span>: <span class="hljs-string">&apos;./server.ts&apos;</span>, <span class="hljs-comment">// This is our Express server for Dynamic universal</span>
        prerender: <span class="hljs-string">&apos;./prerender.ts&apos;</span> <span class="hljs-comment">// This is an example of Static prerendering (generative)</span>
    },
    <span class="hljs-attr">target</span>: <span class="hljs-string">&apos;node&apos;</span>,
    <span class="hljs-attr">resolve</span>: {<span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.ts&apos;</span>, <span class="hljs-string">&apos;.js&apos;</span>]},
    <span class="hljs-attr">externals</span>: [<span class="hljs-regexp">/(node_modules|main\..*\.js)/</span>,], <span class="hljs-comment">// Make sure we include all node_modules etc</span>
    output: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>), <span class="hljs-comment">// Puts the output at the root of the dist folder</span>
        filename: <span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ts$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;ts-loader&apos;</span>}
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.ContextReplacementPlugin(
            <span class="hljs-regexp">/(.+)?angular(\\|\/)core(.+)?/</span>, <span class="hljs-comment">// fixes WARNING Critical dependency: the request of a dependency is an expression</span>
            path.join(__dirname, <span class="hljs-string">&apos;src&apos;</span>), <span class="hljs-comment">// location of your src</span>
            {} <span class="hljs-comment">// a map of your routes</span>
        ),
        <span class="hljs-keyword">new</span> webpack.ContextReplacementPlugin(
            <span class="hljs-regexp">/(.+)?express(\\|\/)(.+)?/</span>, <span class="hljs-comment">// fixes WARNING Critical dependency: the request of a dependency is an expression</span>
            path.join(__dirname, <span class="hljs-string">&apos;src&apos;</span>),
            {}
        )
    ]
};</code></pre><h3 id="articleHeader9">&#x6D4B;&#x8BD5;&#x914D;&#x7F6E;</h3><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5236;&#x4F5C;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x53EF;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684; Angular Universal &#x5E94;&#x7528;&#x3002;</p><p>&#x5728; package.json &#x7684; scripts &#x533A;&#x914D;&#x7F6E; build &#x548C; serve &#x6709;&#x5173;&#x7684;&#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {
        &quot;ng&quot;: &quot;ng&quot;,
        &quot;start&quot;: &quot;ng serve -o&quot;,
        &quot;ssr&quot;: &quot;npm run build:ssr &amp;&amp; npm run serve:ssr&quot;,
        &quot;prerender&quot;: &quot;npm run build:prerender &amp;&amp; npm run serve:prerender&quot;,
        &quot;build&quot;: &quot;ng build&quot;,
        &quot;build:client-and-server-bundles&quot;: &quot;ng build --prod &amp;&amp; ng build --prod --app 1 --output-hashing=false&quot;,
        &quot;build:prerender&quot;: &quot;npm run build:client-and-server-bundles &amp;&amp; npm run webpack:server &amp;&amp; npm run generate:prerender&quot;,
        &quot;build:ssr&quot;: &quot;npm run build:client-and-server-bundles &amp;&amp; npm run webpack:server&quot;,
        &quot;generate:prerender&quot;: &quot;cd dist &amp;&amp; node prerender&quot;,
        &quot;webpack:server&quot;: &quot;webpack --config webpack.server.config.js --progress --colors&quot;,
        &quot;serve:prerender&quot;: &quot;cd dist/browser &amp;&amp; http-server&quot;,
        &quot;serve:ssr&quot;: &quot;node dist/server&quot;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;scripts&quot;</span>: {
        <span class="hljs-attr">&quot;ng&quot;</span>: <span class="hljs-string">&quot;ng&quot;</span>,
        <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;ng serve -o&quot;</span>,
        <span class="hljs-attr">&quot;ssr&quot;</span>: <span class="hljs-string">&quot;npm run build:ssr &amp;&amp; npm run serve:ssr&quot;</span>,
        <span class="hljs-attr">&quot;prerender&quot;</span>: <span class="hljs-string">&quot;npm run build:prerender &amp;&amp; npm run serve:prerender&quot;</span>,
        <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;ng build&quot;</span>,
        <span class="hljs-attr">&quot;build:client-and-server-bundles&quot;</span>: <span class="hljs-string">&quot;ng build --prod &amp;&amp; ng build --prod --app 1 --output-hashing=false&quot;</span>,
        <span class="hljs-attr">&quot;build:prerender&quot;</span>: <span class="hljs-string">&quot;npm run build:client-and-server-bundles &amp;&amp; npm run webpack:server &amp;&amp; npm run generate:prerender&quot;</span>,
        <span class="hljs-attr">&quot;build:ssr&quot;</span>: <span class="hljs-string">&quot;npm run build:client-and-server-bundles &amp;&amp; npm run webpack:server&quot;</span>,
        <span class="hljs-attr">&quot;generate:prerender&quot;</span>: <span class="hljs-string">&quot;cd dist &amp;&amp; node prerender&quot;</span>,
        <span class="hljs-attr">&quot;webpack:server&quot;</span>: <span class="hljs-string">&quot;webpack --config webpack.server.config.js --progress --colors&quot;</span>,
        <span class="hljs-attr">&quot;serve:prerender&quot;</span>: <span class="hljs-string">&quot;cd dist/browser &amp;&amp; http-server&quot;</span>,
        <span class="hljs-attr">&quot;serve:ssr&quot;</span>: <span class="hljs-string">&quot;node dist/server&quot;</span>
    }
}</code></pre><h4>&#x5F00;&#x53D1;&#x53EA;&#x9700;&#x8FD0;&#x884C; <code>npm run start</code></h4><h4>&#x6267;&#x884C; <code>npm run ssr</code> &#x7F16;&#x8BD1;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF0C;&#x5E76;&#x542F;&#x52A8;&#x4E00;&#x4E2A;Node Express&#x6765;&#x4E3A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x63D0;&#x4F9B;&#x670D;&#x52A1; <code>http://localhost:4000</code></h4><p>dist&#x76EE;&#x5F55;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014044666?w=441&amp;h=449" src="https://static.alili.tech/img/remote/1460000014044666?w=441&amp;h=449" alt="" title="" style="cursor:pointer"></span></p><h4>&#x6267;&#x884C;npm run prerender - &#x7F16;&#x8BD1;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5E76;&#x9884;&#x6E32;&#x67D3;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6587;&#x4EF6;&#xFF0C;&#x542F;&#x52A8;&#x4E00;&#x4E2A;&#x6F14;&#x793A;http&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4EE5;&#x4FBF;&#x60A8;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5B83; <code>http://localhost:8080</code></h4><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> &#x8981;&#x5C06;&#x9759;&#x6001;&#x7F51;&#x7AD9;&#x90E8;&#x7F72;&#x5230;&#x9759;&#x6001;&#x6258;&#x7BA1;&#x5E73;&#x53F0;&#xFF0C;&#x60A8;&#x5FC5;&#x987B;&#x90E8;&#x7F72;dist/browser&#x6587;&#x4EF6;&#x5939;, &#x800C;&#x4E0D;&#x662F;dist&#x6587;&#x4EF6;&#x5939;</p><p>dist&#x76EE;&#x5F55;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014044667?w=441&amp;h=493" src="https://static.alili.tech/img/remote/1460000014044667?w=441&amp;h=493" alt="" title="" style="cursor:pointer"></span></p><p>&#x6839;&#x636E;&#x9879;&#x76EE;&#x5B9E;&#x9645;&#x7684;&#x8DEF;&#x7531;&#x4FE1;&#x606F;&#x5E76;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x7684; <code>static.paths.ts</code> &#x4E2D;&#x914D;&#x7F6E;&#xFF0C;&#x63D0;&#x4F9B;&#x7ED9; prerender.ts &#x89E3;&#x6790;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const ROUTES = [
    &apos;/&apos;,
    &apos;/lazy&apos;
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES = [
    <span class="hljs-string">&apos;/&apos;</span>,
    <span class="hljs-string">&apos;/lazy&apos;</span>
];</code></pre><p>&#x56E0;&#x6B64;&#xFF0C;&#x4ECE;dist&#x76EE;&#x5F55;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x9884;&#x6E32;&#x67D3;&#x4F1A;&#x6839;&#x636E;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x8DEF;&#x7531;&#x5728; browser &#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x9759;&#x6001;index.html&#x3002;&#x5982; <code>/</code> &#x5BF9;&#x5E94; <code>/index.html</code>&#xFF0C;<code>/lazy</code> &#x5BF9;&#x5E94; <code>/lazy/index.html</code>&#x3002;</p><h2 id="articleHeader10">&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x6A21;&#x5757;&#x61D2;&#x52A0;&#x8F7D;</h2><p>&#x5728;&#x524D;&#x9762;&#x7684;&#x4ECB;&#x7ECD;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5728; <code>app.server.module.ts</code> &#x4E2D;&#x5BFC;&#x5165;&#x4E86; <a href="https://github.com/angular/universal/tree/master/modules/module-map-ngfactory-loader" rel="nofollow noreferrer" target="_blank">ModuleMapLoaderModule</a>&#xFF0C;&#x5728; <code>app.module.ts</code>&#x3002;</p><p><code>ModuleMapLoaderModule</code> &#x6A21;&#x5757;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x800C;&#x4F60;&#x8981;&#x505A;&#x4E5F;&#x53EA;&#x662F;&#x5728; <code>app.server.module.ts</code> &#x4E2D;&#x5BFC;&#x5165;&#x3002;</p><h2 id="articleHeader11">&#x670D;&#x52A1;&#x7AEF;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x72B6;&#x6001;&#x4F20;&#x8F93;</h2><p>&#x5728;&#x524D;&#x9762;&#x7684;&#x4ECB;&#x7ECD;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5728; <code>app.server.module.ts</code> &#x4E2D;&#x5BFC;&#x5165;&#x4E86; <code>ServerTransferStateModule</code>&#xFF0C;&#x5728; <code>app.module.ts</code> &#x4E2D;&#x5BFC;&#x5165;&#x4E86; <code>BrowserTransferStateModule</code> &#x548C; <a href="https://github.com/angular/universal/tree/master/modules/common" rel="nofollow noreferrer" target="_blank">TransferHttpCacheModule</a>&#x3002;</p><p>&#x8FD9;&#x4E09;&#x4E2A;&#x6A21;&#x5757;&#x90FD;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x72B6;&#x6001;&#x4F20;&#x8F93;&#x6709;&#x5173;&#xFF1A;</p><ul><li><code>ServerTransferStateModule</code>&#xFF1A;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x7AEF;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;</li><li><code>BrowserTransferStateModule</code>&#xFF1A;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5BFC;&#x5165;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x5C06;&#x72B6;&#x6001;&#x4ECE;&#x670D;&#x52A1;&#x7AEF;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;</li><li><code>TransferHttpCacheModule</code>&#xFF1A;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x4F20;&#x8F93;&#x7F13;&#x5B58;&#xFF0C;&#x9632;&#x6B62;&#x5BA2;&#x6237;&#x7AEF;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x7AEF;&#x5DF2;&#x5B8C;&#x6210;&#x7684;&#x8BF7;&#x6C42;</li></ul><p>&#x4F7F;&#x7528;&#x8FD9;&#x51E0;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x53EF;&#x4EE5;&#x89E3;&#x51B3; <strong>http&#x8BF7;&#x6C42;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x548C;&#x5BA2;&#x6237;&#x7AEF;&#x5206;&#x522B;&#x8BF7;&#x6C42;&#x4E00;&#x6B21;</strong> &#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x6BD4;&#x5982;&#x5728; <code>home.component.ts</code> &#x4E2D;&#x6709;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnDestroy, OnInit } from &apos;@angular/core&apos;;
import { HttpClient } from &apos;@angular/common/http&apos;;
import { Observable } from &apos;rxjs/Observable&apos;;

@Component({
    selector: &apos;app-home&apos;,
    templateUrl: &apos;./home.component.html&apos;,
    styleUrls: [&apos;./home.component.scss&apos;]
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(public http: HttpClient) {
    }
    
    ngOnInit() {
        this.poiSearch(this.keyword, &apos;&#x5317;&#x4EAC;&#x5E02;&apos;).subscribe((data: any) =&gt; {
            console.log(data);
        });
    }
    
    ngOnDestroy() {
    }
    
    poiSearch(text: string, city?: string): Observable&lt;any&gt; {
        return this.http.get(encodeURI(`http://restapi.amap.com/v3/place/text?keywords=${text}&amp;city=${city}&amp;offset=20&amp;key=55f909211b9950837fba2c71d0488db9&amp;extensions=all`));
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnDestroy, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { HttpClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/common/http&apos;</span>;
<span class="hljs-keyword">import</span> { Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rxjs/Observable&apos;</span>;

@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">&apos;app-home&apos;</span>,
    <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">&apos;./home.component.html&apos;</span>,
    <span class="hljs-attr">styleUrls</span>: [<span class="hljs-string">&apos;./home.component.scss&apos;</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span>, <span class="hljs-title">OnDestroy</span> </span>{
    <span class="hljs-keyword">constructor</span>(public http: HttpClient) {
    }
    
    ngOnInit() {
        <span class="hljs-keyword">this</span>.poiSearch(<span class="hljs-keyword">this</span>.keyword, <span class="hljs-string">&apos;&#x5317;&#x4EAC;&#x5E02;&apos;</span>).subscribe(<span class="hljs-function">(<span class="hljs-params">data: any</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(data);
        });
    }
    
    ngOnDestroy() {
    }
    
    poiSearch(text: string, city?: string): Observable&lt;any&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.get(<span class="hljs-built_in">encodeURI</span>(<span class="hljs-string">`http://restapi.amap.com/v3/place/text?keywords=<span class="hljs-subst">${text}</span>&amp;city=<span class="hljs-subst">${city}</span>&amp;offset=20&amp;key=55f909211b9950837fba2c71d0488db9&amp;extensions=all`</span>));
    }
}</code></pre><p>&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x4E4B;&#x540E;&#xFF0C;</p><p>&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x5E76;&#x6253;&#x5370;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014044668?w=555&amp;h=363" src="https://static.alili.tech/img/remote/1460000014044668?w=555&amp;h=363" alt="" title="" style="cursor:pointer"></span></p><p>&#x5BA2;&#x6237;&#x7AEF;&#x518D;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#x5E76;&#x6253;&#x5370;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014044669?w=909&amp;h=310" src="https://static.alili.tech/img/remote/1460000014044669?w=909&amp;h=310" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader12">&#x65B9;&#x6CD5;1&#xFF1A;&#x4F7F;&#x7528; <code>TransferHttpCacheModule</code></h3><p>&#x4F7F;&#x7528; <code>TransferHttpCacheModule</code> &#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4EE3;&#x7801;&#x4E0D;&#x9700;&#x8981;&#x6539;&#x52A8;&#x3002;&#x5728; <code>app.module.ts</code> &#x4E2D;&#x5BFC;&#x5165;&#x4E4B;&#x540E;&#xFF0C;Angular&#x81EA;&#x52A8;&#x4F1A;&#x5C06;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x7F13;&#x5B58;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#x5C31;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x5230;&#x6570;&#x636E;&#x4F1A;&#x81EA;&#x52A8;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x63A5;&#x6536;&#x5230;&#x6570;&#x636E;&#x4E4B;&#x540E;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x4E86;&#x3002;</p><h3 id="articleHeader13">&#x65B9;&#x6CD5;2&#xFF1A;&#x4F7F;&#x7528; <code>BrowserTransferStateModule</code></h3><p>&#x8BE5;&#x65B9;&#x6CD5;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x4E9B;&#xFF0C;&#x9700;&#x8981;&#x6539;&#x52A8;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8C03;&#x6574; <code>home.component.ts</code> &#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnDestroy, OnInit } from &apos;@angular/core&apos;;
import { makeStateKey, TransferState } from &apos;@angular/platform-browser&apos;;
import { HttpClient } from &apos;@angular/common/http&apos;;
import { Observable } from &apos;rxjs/Observable&apos;;

const KFCLIST_KEY = makeStateKey(&apos;kfcList&apos;);

@Component({
    selector: &apos;app-home&apos;,
    templateUrl: &apos;./home.component.html&apos;,
    styleUrls: [&apos;./home.component.scss&apos;]
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(public http: HttpClient,
                private state: TransferState) {
    }
    
    ngOnInit() {
    
        // &#x91C7;&#x7528;&#x4E00;&#x4E2A;&#x6807;&#x8BB0;&#x6765;&#x533A;&#x5206;&#x670D;&#x52A1;&#x7AEF;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x62FF;&#x5230;&#x4E86;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x62FF;&#x5230;&#x6570;&#x636E;&#x5C31;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x62FF;&#x5230;&#x6570;&#x636E;&#x5C31;&#x4E0D;&#x53D1;&#x8BF7;&#x6C42;
        const kfcList&#xFF1A;any[] = this.state.get(KFCLIST_KEY, null as any);

        if (!this.kfcList) {
            this.poiSearch(this.keyword, &apos;&#x5317;&#x4EAC;&#x5E02;&apos;).subscribe((data: any) =&gt; {
                console.log(data);
                this.state.set(KFCLIST_KEY, data as any); // &#x5B58;&#x50A8;&#x6570;&#x636E;
            });
        }
    }
    
    ngOnDestroy() {
        if (typeof window === &apos;object&apos;) {
            this.state.set(KFCLIST_KEY, null as any); // &#x5220;&#x9664;&#x6570;&#x636E;
        }
    }
    
    poiSearch(text: string, city?: string): Observable&lt;any&gt; {
        return this.http.get(encodeURI(`http://restapi.amap.com/v3/place/text?keywords=${text}&amp;city=${city}&amp;offset=20&amp;key=55f909211b9950837fba2c71d0488db9&amp;extensions=all`));
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnDestroy, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { makeStateKey, TransferState } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-browser&apos;</span>;
<span class="hljs-keyword">import</span> { HttpClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/common/http&apos;</span>;
<span class="hljs-keyword">import</span> { Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rxjs/Observable&apos;</span>;

<span class="hljs-keyword">const</span> KFCLIST_KEY = makeStateKey(<span class="hljs-string">&apos;kfcList&apos;</span>);

@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">&apos;app-home&apos;</span>,
    <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">&apos;./home.component.html&apos;</span>,
    <span class="hljs-attr">styleUrls</span>: [<span class="hljs-string">&apos;./home.component.scss&apos;</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span>, <span class="hljs-title">OnDestroy</span> </span>{
    <span class="hljs-keyword">constructor</span>(public http: HttpClient,
                private state: TransferState) {
    }
    
    ngOnInit() {
    
        <span class="hljs-comment">// &#x91C7;&#x7528;&#x4E00;&#x4E2A;&#x6807;&#x8BB0;&#x6765;&#x533A;&#x5206;&#x670D;&#x52A1;&#x7AEF;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x62FF;&#x5230;&#x4E86;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x62FF;&#x5230;&#x6570;&#x636E;&#x5C31;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x62FF;&#x5230;&#x6570;&#x636E;&#x5C31;&#x4E0D;&#x53D1;&#x8BF7;&#x6C42;</span>
        <span class="hljs-keyword">const</span> kfcList&#xFF1A;any[] = <span class="hljs-keyword">this</span>.state.get(KFCLIST_KEY, <span class="hljs-literal">null</span> <span class="hljs-keyword">as</span> any);

        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.kfcList) {
            <span class="hljs-keyword">this</span>.poiSearch(<span class="hljs-keyword">this</span>.keyword, <span class="hljs-string">&apos;&#x5317;&#x4EAC;&#x5E02;&apos;</span>).subscribe(<span class="hljs-function">(<span class="hljs-params">data: any</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(data);
                <span class="hljs-keyword">this</span>.state.set(KFCLIST_KEY, data <span class="hljs-keyword">as</span> any); <span class="hljs-comment">// &#x5B58;&#x50A8;&#x6570;&#x636E;</span>
            });
        }
    }
    
    ngOnDestroy() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">&apos;object&apos;</span>) {
            <span class="hljs-keyword">this</span>.state.set(KFCLIST_KEY, <span class="hljs-literal">null</span> <span class="hljs-keyword">as</span> any); <span class="hljs-comment">// &#x5220;&#x9664;&#x6570;&#x636E;</span>
        }
    }
    
    poiSearch(text: string, city?: string): Observable&lt;any&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.get(<span class="hljs-built_in">encodeURI</span>(<span class="hljs-string">`http://restapi.amap.com/v3/place/text?keywords=<span class="hljs-subst">${text}</span>&amp;city=<span class="hljs-subst">${city}</span>&amp;offset=20&amp;key=55f909211b9950837fba2c71d0488db9&amp;extensions=all`</span>));
    }
}</code></pre><ul><li>&#x4F7F;&#x7528; <code>const KFCLIST_KEY = makeStateKey(&apos;kfcList&apos;)</code> &#x521B;&#x5EFA;&#x50A8;&#x5B58;&#x4F20;&#x8F93;&#x6570;&#x636E;&#x7684; StateKey</li><li>&#x5728; <code>HomeComponent</code> &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x6CE8;&#x5165; <code>TransferState</code></li><li>&#x5728; <code>ngOnInit</code> &#x4E2D;&#x6839;&#x636E; <code>this.state.get(KFCLIST_KEY, null as any)</code> &#x5224;&#x65AD;&#x6570;&#x636E;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF08;&#x4E0D;&#x7BA1;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#x8FD8;&#x662F;&#x5BA2;&#x6237;&#x7AEF;&#xFF09;&#xFF0C;&#x5B58;&#x5728;&#x5C31;&#x4E0D;&#x518D;&#x8BF7;&#x6C42;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5E76;&#x901A;&#x8FC7; <code>this.state.set(KFCLIST_KEY, data as any)</code> &#x5B58;&#x50A8;&#x4F20;&#x8F93;&#x6570;&#x636E;</li><li>&#x5728; <code>ngOnDestroy</code> &#x4E2D;&#x6839;&#x636E;&#x5F53;&#x524D;&#x662F;&#x5426;&#x5BA2;&#x6237;&#x7AEF;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x5C06;&#x5B58;&#x50A8;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5220;&#x9664;</li></ul><h2 id="articleHeader14">&#x5BA2;&#x6237;&#x7AEF;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x5BF9;&#x6BD4;</h2><p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x522B;&#x901A;&#x8FC7;&#x8FD9;&#x4E09;&#x4E2A;&#x539F;&#x56E0;&#x6765;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;&#xFF1A;</p><ol><li>&#x5E2E;&#x52A9;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#xFF08;SEO&#xFF09;</li><li>&#x63D0;&#x5347;&#x5728;&#x624B;&#x673A;&#x548C;&#x4F4E;&#x529F;&#x8017;&#x8BBE;&#x5907;&#x4E0A;&#x7684;&#x6027;&#x80FD;</li><li>&#x8FC5;&#x901F;&#x663E;&#x793A;&#x51FA;&#x9996;&#x9875;</li></ol><h3 id="articleHeader15">&#x5E2E;&#x52A9;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#xFF08;SEO&#xFF09;</h3><p>&#x5BA2;&#x6237;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014063980?w=1018&amp;h=57" src="https://static.alili.tech/img/remote/1460000014063980?w=1018&amp;h=57" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014063981?w=1018&amp;h=204" src="https://static.alili.tech/img/remote/1460000014063981?w=1018&amp;h=204" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x63D0;&#x524D;&#x5C06;&#x4FE1;&#x606F;&#x6E32;&#x67D3;&#x5230;&#x8FD4;&#x56DE;&#x7684;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x8FD9;&#x6837;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x83B7;&#x53D6;&#x5230;&#x4FE1;&#x606F;&#x4E86;&#xFF08;&#x7F51;&#x7EDC;&#x722C;&#x866B;&#x57FA;&#x672C;&#x4E0D;&#x4F1A;&#x89E3;&#x6790;javascript&#x7684;&#xFF09;&#x3002;</p><h3 id="articleHeader16">&#x63D0;&#x5347;&#x5728;&#x624B;&#x673A;&#x548C;&#x4F4E;&#x529F;&#x8017;&#x8BBE;&#x5907;&#x4E0A;&#x7684;&#x6027;&#x80FD;</h3><p>&#x8FD9;&#x4E2A;&#x539F;&#x56E0;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x4F4E;&#x7AEF;&#x7684;&#x8BBE;&#x5907;&#xFF0C;&#x76F4;&#x63A5;&#x663E;&#x793A;&#x9875;&#x9762;&#x603B;&#x6BD4;&#x8981;&#x89E3;&#x6790;javascript&#x6027;&#x80FD;&#x9AD8;&#x7684;&#x591A;&#x3002;</p><h3 id="articleHeader17">&#x8FC5;&#x901F;&#x663E;&#x793A;&#x51FA;&#x9996;&#x9875;</h3><p>&#x540C;&#x6837;&#x5728; Fast 3G &#x7F51;&#x7EDC;&#x6761;&#x4EF6;&#x4E0B;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;</p><p>&#x5BA2;&#x6237;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014063982?w=1027&amp;h=848" src="https://static.alili.tech/img/remote/1460000014063982?w=1027&amp;h=848" alt="" title="" style="cursor:pointer"></span></p><p>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000014063983?w=928&amp;h=847" src="https://static.alili.tech/img/remote/1460000014063983?w=928&amp;h=847" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader18">&#x7262;&#x8BB0;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;</h2><ul><li>&#x5BF9;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x8F6F;&#x4EF6;&#x5305;&#xFF0C;&#x60A8;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x5C06;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x5305;&#x542B;&#x5230;<code>nodeExternals</code>&#x767D;&#x540D;&#x5355;&#x4E2D;</li><li><p><strong><code>window</code></strong>, <strong><code>document</code></strong>, <strong><code>navigator</code></strong> &#x4EE5;&#x53CA;&#x5176;&#x5B83;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B; - <em>&#x4E0D;&#x5B58;&#x5728;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;</em> - &#x5982;&#x679C;&#x4F60;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x5C06;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#x3002; &#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF1A;</p><ul><li><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>PLATFORM_ID</code>&#x6807;&#x8BB0;&#x6CE8;&#x5165;&#x7684;<code>Object</code>&#x6765;&#x68C0;&#x67E5;&#x5F53;&#x524D;&#x5E73;&#x53F0;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x8FD8;&#x662F;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7279;&#x6709;&#x7684;&#x7C7B;&#x578B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import { PLATFORM_ID } from &apos;@angular/core&apos;;
 import { isPlatformBrowser, isPlatformServer } from &apos;@angular/common&apos;;
 
 constructor(@Inject(PLATFORM_ID) private platformId: Object) { ... }
 
 ngOnInit() {
   if (isPlatformBrowser(this.platformId)) {
      // &#x4EC5;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;&#x4EE3;&#x7801;
      ...
   }
   if (isPlatformServer(this.platformId)) {
     // &#x4EC5;&#x8FD0;&#x884C;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x4EE3;&#x7801;
     ...
   }
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"> <span class="hljs-keyword">import</span> { PLATFORM_ID } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
 <span class="hljs-keyword">import</span> { isPlatformBrowser, isPlatformServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/common&apos;</span>;
 
 <span class="hljs-keyword">constructor</span>(<span class="hljs-params">@Inject(PLATFORM_ID</span>) private platformId: Object) { ... }
 
 ngOnInit() {
   <span class="hljs-keyword">if</span> (isPlatformBrowser(<span class="hljs-keyword">this</span>.platformId)) {
      <span class="hljs-comment">// &#x4EC5;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;&#x4EE3;&#x7801;</span>
      ...
   }
   <span class="hljs-keyword">if</span> (isPlatformServer(<span class="hljs-keyword">this</span>.platformId)) {
     <span class="hljs-comment">// &#x4EC5;&#x8FD0;&#x884C;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x4EE3;&#x7801;</span>
     ...
   }
 }</code></pre></li></ul></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 - &#x5C3D;&#x91CF;**&#x9650;&#x5236;**&#x6216;**&#x907F;&#x514D;**&#x4F7F;&#x7528;`setTimeout`&#x3002;&#x5B83;&#x4F1A;&#x51CF;&#x6162;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;&#x3002;&#x786E;&#x4FDD;&#x5728;&#x7EC4;&#x4EF6;&#x7684;`ngOnDestroy`&#x4E2D;&#x5220;&#x9664;&#x5B83;&#x4EEC;
 
 - &#x5BF9;&#x4E8E;RxJs&#x8D85;&#x65F6;&#xFF0C;&#x8BF7;&#x786E;&#x4FDD;&#x5728;&#x6210;&#x529F;&#x65F6; _&#x53D6;&#x6D88;_ &#x5B83;&#x4EEC;&#x7684;&#x6D41;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x4E5F;&#x4F1A;&#x964D;&#x4F4E;&#x6E32;&#x67D3;&#x901F;&#x5EA6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>
 -<span class="ruby"> &#x5C3D;&#x91CF;**&#x9650;&#x5236;**&#x6216;**&#x907F;&#x514D;**&#x4F7F;&#x7528;<span class="hljs-string">`setTimeout`</span>&#x3002;&#x5B83;&#x4F1A;&#x51CF;&#x6162;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;&#x3002;&#x786E;&#x4FDD;&#x5728;&#x7EC4;&#x4EF6;&#x7684;<span class="hljs-string">`ngOnDestroy`</span>&#x4E2D;&#x5220;&#x9664;&#x5B83;&#x4EEC;
</span> 
 -<span class="ruby"> &#x5BF9;&#x4E8E;RxJs&#x8D85;&#x65F6;&#xFF0C;&#x8BF7;&#x786E;&#x4FDD;&#x5728;&#x6210;&#x529F;&#x65F6; <span class="hljs-number">_</span>&#x53D6;&#x6D88;<span class="hljs-number">_</span> &#x5B83;&#x4EEC;&#x7684;&#x6D41;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x4E5F;&#x4F1A;&#x964D;&#x4F4E;&#x6E32;&#x67D3;&#x901F;&#x5EA6;&#x3002;
</span></code></pre><ul><li><strong>&#x4E0D;&#x8981;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;nativeElement</strong>&#xFF0C;&#x4F7F;&#x7528;<a href="https://angular.io/api/core/Renderer2" rel="nofollow noreferrer" target="_blank">Renderer2</a>&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x8DE8;&#x5E73;&#x53F0;&#x6539;&#x53D8;&#x5E94;&#x7528;&#x89C6;&#x56FE;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(element: ElementRef, renderer: Renderer2) {
  this.renderer.setStyle(element.nativeElement, &apos;font-size&apos;, &apos;x-large&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">constructor</span>(<span class="hljs-params">element: ElementRef, renderer: Renderer2</span>) {
  <span class="hljs-keyword">this</span>.renderer.setStyle(element.nativeElement, <span class="hljs-string">&apos;font-size&apos;</span>, <span class="hljs-string">&apos;x-large&apos;</span>);
}</code></pre><ul><li><p>&#x89E3;&#x51B3;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x8FD0;&#x884C;XHR&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x518D;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x95EE;&#x9898;</p><ul><li>&#x4F7F;&#x7528;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x8F93;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x7F13;&#x5B58;&#xFF08;TransferState&#xFF09;</li></ul></li><li>&#x6E05;&#x695A;&#x4E86;&#x89E3;&#x4E0E;DOM&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x5C5E;&#x6027;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;</li><li>&#x5C3D;&#x91CF;&#x8BA9;&#x6307;&#x4EE4;&#x65E0;&#x72B6;&#x6001;&#x3002;&#x5BF9;&#x4E8E;&#x6709;&#x72B6;&#x6001;&#x6307;&#x4EE4;&#xFF0C;&#x60A8;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4EE5;&#x53CD;&#x6620;&#x76F8;&#x5E94;&#x5C5E;&#x6027;&#x7684;&#x521D;&#x59CB;&#x5B57;&#x7B26;&#x4E32;&#x503C;&#xFF0C;&#x4F8B;&#x5982;img&#x6807;&#x7B7E;&#x4E2D;&#x7684;url&#x3002;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x7684;native&#x5143;&#x7D20;&#xFF0C;src&#x5C5E;&#x6027;&#x88AB;&#x53CD;&#x6620;&#x4E3A;&#x5143;&#x7D20;&#x7C7B;&#x578B;HTMLImageElement&#x7684;src&#x5C5E;&#x6027;</li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular开发实践（六）：服务端渲染

## 原文链接
[https://segmentfault.com/a/1190000014044661](https://segmentfault.com/a/1190000014044661)

