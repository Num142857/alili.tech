---
title: vue-cli3.x 新特性及踩坑记
hidden: true
categories: [reprint]
slug: 193bf9da
date: 2018-11-09 02:30:05
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016423946" src="https://static.alili.tech/img/remote/1460000016423946" alt="webpack.png" title="webpack.png" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>vue-cli &#x90FD;&#x5230; 3.0.3 &#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x65F6;&#x5019;&#x73A9;&#x8F6C;&#x4E00;&#x4E0B; vue-cli 3 &#x7684;&#x65B0;&#x7279;&#x6027;&#x4E86;&#x3002;</p><h1 id="articleHeader1">1. vue-cli 3.0.3</h1><blockquote>&#x4EE5;&#x4E0B;&#x7684;&#x5B89;&#x88C5;&#x90FD;&#x662F;&#x5728; macOS &#x7684;&#x73AF;&#x5883;&#x4E0B;&#x8FDB;&#x884C;&#x7684;&#xFF0C;&#x5F53;&#x7136;&#x5728; windows &#x548C; linus &#x4E0B;&#x4E5F;&#x540C;&#x7406;&#x3002;</blockquote><h4>1.1 &#x5B89;&#x88C5;</h4><blockquote>vue cli &#x7684;&#x5305;&#x540D;&#x79F0;&#x7531; vue-cli &#x6539;&#x6210;&#x4E86; @vue/cli&#x3002; &#x5982;&#x679C;&#x4F60;&#x5DF2;&#x7ECF;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#x4E86;&#x65E7;&#x7248;&#x672C;&#x7684; vue-cli (1.x &#x6216; 2.x)&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5148;&#x901A;&#x8FC7; npm uninstall vue-cli -g &#x6216; yarn global remove vue-cli &#x5378;&#x8F7D;&#x5B83;&#x3002;</blockquote><p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0B;&#x5217;&#x4EFB;&#x4E00;&#x547D;&#x4EE4;&#x5B89;&#x88C5;&#x8FD9;&#x4E2A;&#x65B0; vue-cli 3.0.3 &#x7684;&#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli
# OR
yarn global add @vue/cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install -g @vue/cli
<span class="hljs-comment"># OR</span>
yarn <span class="hljs-built_in">global</span> add @vue/cli</code></pre><p>&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x8FD9;&#x4E2A;&#x547D;&#x4EE4;&#x6765;&#x68C0;&#x67E5;&#x5176;&#x7248;&#x672C;&#x662F;&#x5426;&#x6B63;&#x786E; (3.x)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue --version" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial">vue <span class="hljs-comment">--version</span></code></pre><p>&#x6216;&#x8005;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue -V" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">vue -V</span></code></pre><h4>1.2&#x4F7F;&#x7528;&#x56FE;&#x5F62;&#x5316;&#x754C;&#x9762;</h4><p>&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; vue ui &#x547D;&#x4EE4;&#x4EE5;&#x56FE;&#x5F62;&#x5316;&#x754C;&#x9762;&#x521B;&#x5EFA;&#x548C;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue ui" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">vue ui</span></code></pre><p>&#x4E0A;&#x8FF0;&#x547D;&#x4EE4;&#x4F1A;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#xFF0C;&#x5E76;&#x4EE5;&#x56FE;&#x5F62;&#x5316;&#x754C;&#x9762;&#x5C06;&#x4F60;&#x5F15;&#x5BFC;&#x81F3;&#x9879;&#x76EE;&#x521B;&#x5EFA;&#x7684;&#x6D41;&#x7A0B;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016423947" src="https://static.alili.tech/img/remote/1460000016423947" alt="" title="" style="cursor:pointer;display:inline"></span></p><h4>1.3 &#x521B;&#x5EFA;&#x9879;&#x76EE;</h4><h5>1.3.1 &#x9ED8;&#x8BA4;&#x578B;</h5><ul><li>&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5728;&#x8BE5;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x6253;&#x5F00;&#x547D;&#x4EE4;&#x7A97;&#x53E3;&#xFF0C;&#x8F93;&#x5165;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x8FDB;&#x884C;&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x8D77;&#x7684;&#x9879;&#x76EE;&#x540D;&#x5B57;&#x53EB; vue-webpack-demo</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue create vue-webpack-demo" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">vue create vue-webpack-demo</span></code></pre><ul><li>&#x4F1A;&#x8BA9;&#x4F60;&#x9009;&#x62E9;&#x9ED8;&#x8BA4;&#xFF08;default&#xFF09;&#x8FD8;&#x662F;&#x624B;&#x52A8;&#xFF08;Manually&#xFF09;&#xFF0C;&#xFF08;&#x6CE8;&#xFF1A;&#x73B0;&#x5728;vue-cli3.0&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;yarn&#x4E0B;&#x8F7D;&#xFF09;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423948" src="https://static.alili.tech/img/remote/1460000016423948" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x5148;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#xFF0C;&#x4E00;&#x8DEF;&#x56DE;&#x8F66;&#x540E;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x5982;&#x4E0B;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423949" src="https://static.alili.tech/img/remote/1460000016423949" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x518D;&#x6765;&#x624B;&#x52A8;&#x7684;&#xFF0C;&#x6211;&#x8D77;&#x7684;&#x9879;&#x76EE;&#x540D;&#x5B57;&#x53EB; vue-webpack-demo2&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#xFF0C;&#x8BA9;&#x4F60;&#x9009;&#x62E9;&#x90A3;&#x4E9B;&#x9009;&#x9879;&#xFF0C;&#x6309; &#x7A7A;&#x683C;&#x952E; &#x662F;&#x9009;&#x62E9;&#x5355;&#x4E2A;&#xFF0C;a &#x952E; &#x662F;&#x5168;&#x9009;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423950" src="https://static.alili.tech/img/remote/1460000016423950" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x6211;&#x9009;&#x62E9;&#x4E86;&#x5E38;&#x7528;&#x7684;&#x5982;&#x4E0B;&#x9009;&#x9879;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423951" src="https://static.alili.tech/img/remote/1460000016423951" alt="" title="" style="cursor:pointer"></span></p><ul><li>vue-router &#x9ED8;&#x8BA4; hash &#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x9009;&#x62E9;&#x9ED8;&#x8BA4;&#x7684;&#xFF0C;&#x9009;&#x62E9;&#x4E86; n &#xFF0C;&#x800C;&#x4E0D;&#x662F; history &#x6A21;&#x5F0F;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423952" src="https://static.alili.tech/img/remote/1460000016423952" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x4E0B;&#x4E00;&#x6B65;&#x4E4B;&#x540E;&#x95EE;&#x8BE2;&#x95EE;&#x4F60;&#x5B89;&#x88C5;&#x54EA;&#x4E00;&#x79CD; CSS &#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#xFF0C;&#x6211;&#x662F;&#x9009;&#x62E9;&#x4E86;&#x7528;&#x7684; less&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423953" src="https://static.alili.tech/img/remote/1460000016423953" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x8FD9;&#x4E2A;&#x662F;&#x95EE;&#x4F60;&#x9009;&#x62E9;&#x54EA;&#x4E2A;&#x81EA;&#x52A8;&#x5316;&#x4EE3;&#x7801;&#x683C;&#x5F0F;&#x5316;&#x68C0;&#x6D4B;&#xFF0C;&#x914D;&#x5408; vscode &#x7F16;&#x8F91;&#x5668;&#x7684;&#xFF0C;Prettier - Code formatter&#x63D2;&#x4EF6;&#xFF0C;&#x6211;&#x9009;&#x7684;&#x968F;&#x540E;&#x4E00;&#x4E2A;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423954" src="https://static.alili.tech/img/remote/1460000016423954" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x4FDD;&#x5B58;&#x5C31;&#x68C0;&#x6D4B;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F; fix &#x548C; commit &#x7684;&#x65F6;&#x5019;&#x68C0;&#x67E5;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423955" src="https://static.alili.tech/img/remote/1460000016423955" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x9009;&#x62E9;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;Mocha&#x662F;&#x6D41;&#x884C;&#x7684;JavaScript&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x4E4B;&#x4E00;&#xFF0C;&#x901A;&#x8FC7;&#x5B83;&#x6DFB;&#x52A0;&#x548C;&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x4ECE;&#x800C;&#x4FDD;&#x8BC1;&#x4EE3;&#x7801;&#x8D28;&#x91CF;&#xFF0C;chai &#x662F;&#x65AD;&#x8A00;&#x5E93;&#xFF0C;&#x6211;&#x4E24;&#x4E2A;&#x90FD;&#x9009;&#x62E9;&#x4E86;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423956" src="https://static.alili.tech/img/remote/1460000016423956" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x4E0A;&#x8FB9;&#x8FD9;&#x4FE9;&#x610F;&#x601D;&#x95EE;&#x4F60;&#x50CF;&#xFF0C;babel, postcss, eslint &#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x653E;&#x54EA;&#xFF1F;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#xFF1A;&#x653E;&#x72EC;&#x7ACB;&#x6587;&#x4EF6;&#x653E;&#x7F6E;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#xFF1A;&#x653E;package.json&#x91CC;&#xFF0C;&#x8FD9;&#x91CC;&#x5C0F;&#x6C6A;&#x9009;&#x62E9;&#x653E;&#x5355;&#x72EC;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x9009;&#x7B2C;&#x4E00;&#x4E2A;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423957" src="https://static.alili.tech/img/remote/1460000016423957" alt="image.png" title="image.png" style="cursor:pointer"></span></p><ul><li>&#x4E0B;&#x9762;&#x5012;&#x6570;&#x7B2C;&#x4E8C;&#x884C;&#x95EE;&#x4F60;&#x662F;&#x5426;&#x5C06;&#x4EE5;&#x4E0A;&#x8FD9;&#x4E9B;&#x5C06;&#x6B64;&#x4FDD;&#x5B58;&#x4E3A;&#x672A;&#x6765;&#x9879;&#x76EE;&#x7684;&#x9884;&#x914D;&#x7F6E;&#x5417; &#xFF1F;&#x9009;&#x62E9;&#x662F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0B;&#x6B21;&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x521A;&#x521A;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4E0D;&#x7528;&#x518D;&#x6BCF;&#x4E2A;&#x90FD;&#x914D;&#x7F6E;&#x4E00;&#x904D;&#x3002;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x662F;&#x9009;&#x62E9;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x4F60;&#x968F;&#x610F;&#x9009;&#x62E9;&#xFF0C;&#x70B9;&#x51FB;&#x786E;&#x5B9A;&#x5C31;&#x5F00;&#x59CB;&#x4E0B;&#x8F7D;&#x6A21;&#x677F;&#x4E86;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423958" src="https://static.alili.tech/img/remote/1460000016423958" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x518D;&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x521A;&#x521A;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x9009;&#x62E9;&#x7684;&#x540D;&#x5B57; vue-webpack4 &#x4F1A;&#x8FD9;&#x6837;&#x5B50;&#x51FA;&#x73B0;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000016423959" src="https://static.alili.tech/img/remote/1460000016423959" alt="" title="" style="cursor:pointer"></span></p><ul><li>&#x542F;&#x52A8;&#x547D;&#x4EE4;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. &#x8FDB;&#x5165;&#x9879;&#x76EE;
cd vue-webpack-demo 
// &#x6216;&#x8005; cd vue-webpack-demo2
// 2. &#x5B89;&#x88C5;&#x4F9D;&#x8D56;
npm i
// 3. &#x542F;&#x52A8;
npm run serve" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// 1. &#x8FDB;&#x5165;&#x9879;&#x76EE;</span>
<span class="hljs-keyword">cd</span> vue-webpack-demo 
<span class="hljs-comment">// &#x6216;&#x8005; cd vue-webpack-demo2</span>
<span class="hljs-comment">// 2. &#x5B89;&#x88C5;&#x4F9D;&#x8D56;</span>
npm <span class="hljs-built_in">i</span>
<span class="hljs-comment">// 3. &#x542F;&#x52A8;</span>
npm <span class="hljs-keyword">run</span> serve</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016423960" src="https://static.alili.tech/img/remote/1460000016423960" alt="" title="" style="cursor:pointer"></span></p><h5>1.4 &#x9879;&#x76EE;&#x6539;&#x53D8;</h5><ol><li>&#x76F8;&#x6BD4; vue-cli 2.X &#x521B;&#x5EFA;&#x7684;&#x76EE;&#x5F55;&#xFF0C;vue-cli 3.0 &#x521B;&#x5EFA;&#x7684;&#x76EE;&#x5F55;&#x770B;&#x4E0D;&#x89C1; webpack &#x7684;&#x914D;&#x7F6E;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016423961" src="https://static.alili.tech/img/remote/1460000016423961" alt="image.png" title="image.png" style="cursor:pointer"></span></p><ol><li>&#x542F;&#x52A8;&#x547D;&#x4EE4;&#x884C;&#x7531;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev &#x6216;&#x8005; npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> run dev &#x6216;&#x8005; <span class="hljs-built_in">npm</span> start</code></pre><p>&#x6539;&#x53D8;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run serve" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> serve</span></code></pre><ol><li>&#x5B89;&#x88C5;&#x8FC7;&#x7A0B;&#x4E5F;&#x53D1;&#x751F;&#x4E86;&#x4E00;&#x4E9B;&#x53D8;&#x5316;&#xFF0C;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x4FDD;&#x5B58;&#xFF0C;&#x4E0B;&#x6B21;&#x53EF;&#x4EE5;&#x518D;&#x7528;&#xFF0C;&#x50CF;&#x524D;&#x9762;&#x7684; vue-webpack4&#x3002;</li><li>&#x624B;&#x52A8;&#x914D;&#x7F6E; webpack&#xFF1A;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; vue.config.js &#x6587;&#x4EF6;&#xFF0C;&#x8FDB;&#x884C;&#x4F60;&#x7684;&#x914D;&#x7F6E; :</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);

module.exports = {
    // &#x57FA;&#x672C;&#x8DEF;&#x5F84;
    baseUrl: &apos;./&apos;,
    // &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
    outputDir: &apos;dist&apos;,
    // eslint-loader &#x662F;&#x5426;&#x5728;&#x4FDD;&#x5B58;&#x7684;&#x65F6;&#x5019;&#x68C0;&#x67E5;
    lintOnSave: true,
    // webpack&#x914D;&#x7F6E;
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () =&gt; {},
    configureWebpack: (config) =&gt; {
        if (process.env.NODE_ENV === &apos;production&apos;) {
            // &#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4FEE;&#x6539;&#x914D;&#x7F6E;...
            config.mode = &apos;production&apos;;
        } else {
            // &#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4FEE;&#x6539;&#x914D;&#x7F6E;...
            config.mode = &apos;development&apos;;
        }

        Object.assign(config, {
            // &#x5F00;&#x53D1;&#x751F;&#x4EA7;&#x5171;&#x540C;&#x914D;&#x7F6E;
            resolve: {
                alias: {
                    &apos;@&apos;: path.resolve(__dirname, &apos;./src&apos;),
                    &apos;@c&apos;: path.resolve(__dirname, &apos;./src/components&apos;)
                }
            }
        });
    },
    // &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x662F;&#x5426;&#x751F;&#x6210; sourceMap &#x6587;&#x4EF6;
    productionSourceMap: true,
    // css&#x76F8;&#x5173;&#x914D;&#x7F6E;
    css: {
        // &#x662F;&#x5426;&#x4F7F;&#x7528;css&#x5206;&#x79BB;&#x63D2;&#x4EF6; ExtractTextPlugin
        extract: true,
        // &#x5F00;&#x542F; CSS source maps?
        sourceMap: false,
        // css&#x9884;&#x8BBE;&#x5668;&#x914D;&#x7F6E;&#x9879;
        loaderOptions: {},
        // &#x542F;&#x7528; CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel &amp; TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require(&apos;os&apos;).cpus().length &gt; 1,
    // PWA &#x63D2;&#x4EF6;&#x76F8;&#x5173;&#x914D;&#x7F6E;
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server &#x76F8;&#x5173;&#x914D;&#x7F6E;
    devServer: {
        open: process.platform === &apos;darwin&apos;,
        host: &apos;0.0.0.0&apos;,
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //     // &#x8BBE;&#x7F6E;&#x4EE3;&#x7406;
        //     // proxy all requests starting with /api to jsonplaceholder
        //     &apos;http://localhost:8080/&apos;: {
        //         target: &apos;http://baidu.com:8080&apos;, //&#x771F;&#x5B9E;&#x8BF7;&#x6C42;&#x7684;&#x76EE;&#x6807;&#x5730;&#x5740;
        //         changeOrigin: true,
        //         pathRewrite: {
        //             &apos;^http://localhost:8080/&apos;: &apos;&apos;
        //         }
        //     }
        // },
        before: (app) =&gt; {}
    },
    // &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x914D;&#x7F6E;
    pluginOptions: {
        // ...
    }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">// &#x57FA;&#x672C;&#x8DEF;&#x5F84;</span>
    baseUrl: <span class="hljs-string">&apos;./&apos;</span>,
    <span class="hljs-comment">// &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x76EE;&#x5F55;</span>
    outputDir: <span class="hljs-string">&apos;dist&apos;</span>,
    <span class="hljs-comment">// eslint-loader &#x662F;&#x5426;&#x5728;&#x4FDD;&#x5B58;&#x7684;&#x65F6;&#x5019;&#x68C0;&#x67E5;</span>
    lintOnSave: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// webpack&#x914D;&#x7F6E;</span>
    <span class="hljs-comment">// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md</span>
    chainWebpack: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
    <span class="hljs-attr">configureWebpack</span>: <span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>) {
            <span class="hljs-comment">// &#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4FEE;&#x6539;&#x914D;&#x7F6E;...</span>
            config.mode = <span class="hljs-string">&apos;production&apos;</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4FEE;&#x6539;&#x914D;&#x7F6E;...</span>
            config.mode = <span class="hljs-string">&apos;development&apos;</span>;
        }

        <span class="hljs-built_in">Object</span>.assign(config, {
            <span class="hljs-comment">// &#x5F00;&#x53D1;&#x751F;&#x4EA7;&#x5171;&#x540C;&#x914D;&#x7F6E;</span>
            resolve: {
                <span class="hljs-attr">alias</span>: {
                    <span class="hljs-string">&apos;@&apos;</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./src&apos;</span>),
                    <span class="hljs-string">&apos;@c&apos;</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./src/components&apos;</span>)
                }
            }
        });
    },
    <span class="hljs-comment">// &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x662F;&#x5426;&#x751F;&#x6210; sourceMap &#x6587;&#x4EF6;</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// css&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
    css: {
        <span class="hljs-comment">// &#x662F;&#x5426;&#x4F7F;&#x7528;css&#x5206;&#x79BB;&#x63D2;&#x4EF6; ExtractTextPlugin</span>
        extract: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// &#x5F00;&#x542F; CSS source maps?</span>
        sourceMap: <span class="hljs-literal">false</span>,
        <span class="hljs-comment">// css&#x9884;&#x8BBE;&#x5668;&#x914D;&#x7F6E;&#x9879;</span>
        loaderOptions: {},
        <span class="hljs-comment">// &#x542F;&#x7528; CSS modules for all css / pre-processor files.</span>
        modules: <span class="hljs-literal">false</span>
    },
    <span class="hljs-comment">// use thread-loader for babel &amp; TS in production build</span>
    <span class="hljs-comment">// enabled by default if the machine has more than 1 cores</span>
    parallel: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;os&apos;</span>).cpus().length &gt; <span class="hljs-number">1</span>,
    <span class="hljs-comment">// PWA &#x63D2;&#x4EF6;&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
    <span class="hljs-comment">// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa</span>
    pwa: {},
    <span class="hljs-comment">// webpack-dev-server &#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
    devServer: {
        <span class="hljs-attr">open</span>: process.platform === <span class="hljs-string">&apos;darwin&apos;</span>,
        <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;0.0.0.0&apos;</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
        <span class="hljs-attr">https</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">hotOnly</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-comment">// proxy: {</span>
        <span class="hljs-comment">//     // &#x8BBE;&#x7F6E;&#x4EE3;&#x7406;</span>
        <span class="hljs-comment">//     // proxy all requests starting with /api to jsonplaceholder</span>
        <span class="hljs-comment">//     &apos;http://localhost:8080/&apos;: {</span>
        <span class="hljs-comment">//         target: &apos;http://baidu.com:8080&apos;, //&#x771F;&#x5B9E;&#x8BF7;&#x6C42;&#x7684;&#x76EE;&#x6807;&#x5730;&#x5740;</span>
        <span class="hljs-comment">//         changeOrigin: true,</span>
        <span class="hljs-comment">//         pathRewrite: {</span>
        <span class="hljs-comment">//             &apos;^http://localhost:8080/&apos;: &apos;&apos;</span>
        <span class="hljs-comment">//         }</span>
        <span class="hljs-comment">//     }</span>
        <span class="hljs-comment">// },</span>
        before: <span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {}
    },
    <span class="hljs-comment">// &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x914D;&#x7F6E;</span>
    pluginOptions: {
        <span class="hljs-comment">// ...</span>
    }
};
</code></pre><ol><li>&#x5F53;&#x7136;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x7528;3.0&#x7684;&#x8BDD;&#xFF0C;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;2.0&#x7684;, &#x5B98;&#x65B9;&#x6587;&#x6863;&#x662F;&#x8FD9;&#x6837;&#x8BF4;&#x7684;&#xFF1A;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000016423962" src="https://static.alili.tech/img/remote/1460000016423962" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF1A;<br><a href="https://cli.vuejs.org/zh/guide/" rel="nofollow noreferrer" target="_blank">vue-cli 3.0</a><br><a href="https://cli.vuejs.org/guide/webpack.html#simple-configuration" rel="nofollow noreferrer" target="_blank">&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#x65B9;&#x5F0F;</a></p><h1 id="articleHeader2">&#x8E29;&#x5751;&#x8BB0;</h1><h4>1. npm &#x7684;&#x5168;&#x5C40;&#x8DEF;&#x5F84;&#x88AB;&#x4FEE;&#x6539;&#x4E86;</h4><p>&#x6211;&#x90FD;&#x4E0D;&#x8BB0;&#x5F97;&#x5728;&#x88C5;&#x4EC0;&#x4E48;&#x5305;&#x7684;&#x65F6;&#x5019;&#x4FEE;&#x6539;&#x4E86; mac &#x4E2D; npm &#x7684;&#x5168;&#x5C40;&#x8DEF;&#x5F84;&#x4E86;&#xFF0C;&#x5E73;&#x65F6; npm &#x8FD0;&#x884C;&#x5404;&#x79CD;&#x547D;&#x4EE4;&#x4E0D;&#x62A5;&#x9519;&#x3002;</p><p>&#x5168;&#x5C40;&#x5378;&#x8F7D; vue-cli &#x547D;&#x4EE4;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall vue-cli -g;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">uninstall</span> vue-cli -g;</code></pre><p>&#x4F46;&#x662F;&#x4ECA;&#x5929;&#x5168;&#x5C40;&#x5378;&#x8F7D; vue-cli &#x7684;&#x65F6;&#x5019;&#x4E00;&#x76F4;&#x4E0D;&#x6210;&#x529F;&#xFF0C;&#x641E;&#x4E86;&#x4E00;&#x4E2A;&#x5C0F;&#x65F6;&#xFF0C;&#x7ED3;&#x679C;&#x770B;&#x4E86;&#x4E00;&#x4E0B; npm &#x7684;&#x5168;&#x5C40;&#x8DEF;&#x5F84;&#xFF0C;&#x624D;&#x53D1;&#x73B0;&#x8DEF;&#x5F84;&#x4E0D;&#x5BF9;&#xFF01;&#xFF01;&#xFF01;</p><p>&#x5982;&#x679C;&#x4F60;&#x7684; npm &#x7684;&#x5168;&#x5C40;&#x8DEF;&#x5F84;&#x4E5F;&#x53D8;&#x4E86;&#xFF0C;&#x8BF7;&#x6309;&#x5982;&#x4E0B;&#x6B65;&#x9AA4;&#x4FEE;&#x6539;&#x52A0;&#x9ED8;&#x8BA4;&#x7684;&#x3002;</p><p>&#x65B9;&#x6CD5;&#x4E00;&#xFF1A;</p><p>&#x539F;&#x56E0;&#xFF1A;npmr &#x7684;&#x914D;&#x7F6E;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x5BFC;&#x81F4;&#x6B63;&#x786E;&#x7684; npmr &#x4E0D;&#x80FD;&#x7528;&#x3002;</p><ul><li>&#x6253;&#x5F00;&#x7EC8;&#x7AEF;&#xFF0C;&#x5207;&#x6362;&#x5230;&#x6839;&#x8DEF;&#x5F84;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">cd</span> </code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="open .npmrc " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">open <span class="hljs-selector-class">.npmrc</span> </code></pre><ul><li>&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x4FEE;&#x6539;&#x4E3A; prefix=/usr/local</li></ul><p>&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set prefix /usr/local  //&#x662F;&#x9ED8;&#x8BA4;&#x8DEF;&#x5F84; &#x4FEE;&#x6539;&#x4E86;&#x8DEF;&#x5F84;&#x4F1A;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code style="word-break:break-word;white-space:initial">npm config <span class="hljs-keyword">set</span> prefix /usr/<span class="hljs-keyword">local</span>  <span class="hljs-comment">//&#x662F;&#x9ED8;&#x8BA4;&#x8DEF;&#x5F84; &#x4FEE;&#x6539;&#x4E86;&#x8DEF;&#x5F84;&#x4F1A;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x3002;</span></code></pre><p>&#x6309;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x4FEE;&#x6539;&#x5B8C;&#xFF0C;&#x518D;&#x5168;&#x5C40;&#x5378;&#x8F7D; vue-cli &#x679C;&#x7136;&#x5C31;&#x6210;&#x529F;&#x4E86;&#x3002;</p><h1 id="articleHeader3">&#x6700;&#x540E;</h1><p>&#x4F60;&#x4EE5;&#x4E3A;&#x672C;&#x6587;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86; ? <strong>&#x7CBE;&#x5F69;&#x5728;&#x540E;&#x9762; &#xFF01;&#xFF01;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016404853" src="https://static.alili.tech/img/remote/1460000016404853" alt="" title="" style="cursor:pointer"></span></p><p>&#x5BF9; &#x5168;&#x6808;&#x5F00;&#x53D1; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;</p><p>&#x6211;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x6709;&#x4EF7;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;BiaoChenXuYing<br>&#x5206;&#x4EAB; &#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x3001;&#x540E;&#x7AEF;&#x5F00;&#x53D1; &#x7B49;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;&#x3002;</blockquote><p>&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#x5E76;&#x56DE;&#x590D; <strong>&#x798F;&#x5229;</strong> &#x4FBF;&#x514D;&#x8D39;&#x9001;&#x4F60;&#x516D;&#x5957;&#x89C6;&#x9891;&#x8D44;&#x6E90;&#xFF0C;&#x7EDD;&#x5BF9;&#x5E72;&#x8D27;&#x3002;</p><p>&#x798F;&#x5229;&#x8BE6;&#x60C5;&#x8BF7;&#x70B9;&#x51FB;&#xFF1A; <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">&#x514D;&#x8D39;&#x8D44;&#x6E90;&#x5206;&#x4EAB;&#x2014;&#x2014;Python&#x3001;Java&#x3001;Linux&#x3001;Go&#x3001;node&#x3001;vue&#x3001;react&#x3001;javaScript</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016505245" src="https://static.alili.tech/img/remote/1460000016505245" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli3.x 新特性及踩坑记

## 原文链接
[https://segmentfault.com/a/1190000016423943](https://segmentfault.com/a/1190000016423943)

