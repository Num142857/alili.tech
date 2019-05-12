---
title: 'Vue源码阅读 - 文件结构与运行机制' 
date: 2018-11-25 2:30:07
hidden: true
slug: kk83myrfjea
categories: [reprint]
---

{{< raw >}}
<p>vue&#x5DF2;&#x662F;&#x76EE;&#x524D;&#x56FD;&#x5185;&#x524D;&#x7AEF;web&#x7AEF;&#x4E09;&#x5206;&#x5929;&#x4E0B;&#x4E4B;&#x4E00;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4F5C;&#x4E3A;&#x672C;&#x4EBA;&#x4E3B;&#x8981;&#x6280;&#x672F;&#x6808;&#x4E4B;&#x4E00;&#xFF0C;&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528;&#x4E2D;&#x77E5;&#x5176;&#x7136;&#x4E5F;&#x597D;&#x5947;&#x7740;&#x6240;&#x4EE5;&#x7136;&#xFF0C;&#x53E6;&#x5916;&#x6700;&#x8FD1;&#x7684;&#x793E;&#x533A;&#x6D8C;&#x73B0;&#x4E86;&#x4E00;&#x5927;&#x7968;vue&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x5728;&#x4E0B;&#x501F;&#x8FD9;&#x4E2A;&#x673A;&#x4F1A;&#x4ECE;&#x5927;&#x5BB6;&#x7684;&#x6587;&#x7AE0;&#x548C;&#x8BA8;&#x8BBA;&#x4E2D;&#x6C72;&#x53D6;&#x4E86;&#x4E00;&#x4E9B;&#x8425;&#x517B;&#xFF0C;&#x540C;&#x65F6;&#x5BF9;&#x4E00;&#x4E9B;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x65F6;&#x7684;&#x60F3;&#x6CD5;&#x8FDB;&#x884C;&#x603B;&#x7ED3;&#xFF0C;&#x51FA;&#x4EA7;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#xFF0C;&#x4F5C;&#x4E3A;&#x81EA;&#x5DF1;&#x601D;&#x8003;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x672C;&#x4EBA;&#x6C34;&#x5E73;&#x6709;&#x9650;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;~</p><p>&#x76EE;&#x6807;Vue&#x7248;&#x672C;&#xFF1A;<code>2.5.17-beta.0</code><br>vue&#x6E90;&#x7801;&#x6CE8;&#x91CA;&#xFF1A;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/SHERlocked...</a><br>&#x58F0;&#x660E;&#xFF1A;&#x6587;&#x7AE0;&#x4E2D;&#x6E90;&#x7801;&#x7684;&#x8BED;&#x6CD5;&#x90FD;&#x4F7F;&#x7528; Flow&#xFF0C;&#x5E76;&#x4E14;&#x6E90;&#x7801;&#x6839;&#x636E;&#x9700;&#x8981;&#x90FD;&#x6709;&#x5220;&#x8282;(&#x4E3A;&#x4E86;&#x4E0D;&#x88AB;&#x8FF7;&#x7CCA; @_@)&#xFF0C;&#x5982;&#x679C;&#x8981;&#x770B;&#x5B8C;&#x6574;&#x7248;&#x7684;&#x8BF7;&#x8FDB;&#x5165;&#x4E0A;&#x9762;&#x7684;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a>&#xFF0C;&#x672C;&#x6587;&#x662F;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#xFF0C;&#x6587;&#x7AE0;&#x5730;&#x5740;&#x89C1;&#x5E95;&#x90E8;~</p><h2 id="articleHeader0">0. &#x524D;&#x5907;&#x77E5;&#x8BC6;</h2><ul><li>Flow</li><li>ES6&#x8BED;&#x6CD5;</li><li>&#x5E38;&#x7528;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</li><li>&#x67EF;&#x91CC;&#x5316;&#x7B49;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x601D;&#x60F3;</li></ul><p>&#x8FD9;&#x91CC;&#x63A8;&#x4ECB;&#x51E0;&#x7BC7;&#x524D;&#x5907;&#x6587;&#x7AE0;&#xFF1A;<a href="https://segmentfault.com/a/1190000014367450">JS &#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x5DE5;&#x5177; Flow</a>&#xFF0C;<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8; - &#x962E;&#x4E00;&#x5CF0;</a>&#xFF0C;<a href="https://segmentfault.com/a/1190000012769779">JS&#x4E2D;&#x7684;&#x67EF;&#x91CC;&#x5316;</a>&#xFF0C;<a href="https://segmentfault.com/a/1190000012547812" target="_blank">JS &#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</a>&#xFF0C;<a href="https://segmentfault.com/a/1190000012505900">JS &#x5229;&#x7528;&#x9AD8;&#x9636;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x7F13;&#x5B58;(&#x5907;&#x5FD8;&#x6A21;&#x5F0F;)</a></p><h2 id="articleHeader1">1. &#x6587;&#x4EF6;&#x7ED3;&#x6784;</h2><p>&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x5728;vue&#x7684;<a href="https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md" rel="nofollow noreferrer" target="_blank">CONTRIBUTING.md</a>&#x4E2D;&#x6709;&#x4ECB;&#x7ECD;&#xFF0C;&#x8FD9;&#x8FB9;&#x76F4;&#x63A5;&#x7FFB;&#x8BD1;&#x8FC7;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; scripts ------------------------------- &#x5305;&#x542B;&#x4E0E;&#x6784;&#x5EFA;&#x76F8;&#x5173;&#x7684;&#x811A;&#x672C;&#x548C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; alias.js -------------------------- &#x6E90;&#x7801;&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x522B;&#x540D;
&#x2502;   &#x251C;&#x2500;&#x2500; config.js ------------------------- &#x9879;&#x76EE;&#x7684;&#x6784;&#x5EFA;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; build --------------------------------- &#x6784;&#x5EFA;&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x52A8;
&#x251C;&#x2500;&#x2500; dist ---------------------------------- &#x6784;&#x5EFA;&#x540E;&#x6587;&#x4EF6;&#x7684;&#x8F93;&#x51FA;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; examples ------------------------------ &#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;Vue&#x5F00;&#x53D1;&#x7684;&#x5E94;&#x7528;&#x6848;&#x4F8B;
&#x251C;&#x2500;&#x2500; flow ---------------------------------- JS&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x5DE5;&#x5177;[Flow](https://flowtype.org/)&#x7684;&#x7C7B;&#x578B;&#x58F0;&#x660E;
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; test ---------------------------------- &#x6D4B;&#x8BD5;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; src ----------------------------------- &#x6E90;&#x7801;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; compiler -------------------------- &#x7F16;&#x8BD1;&#x5668;&#x4EE3;&#x7801;&#xFF0C;&#x7528;&#x6765;&#x5C06; template &#x7F16;&#x8BD1;&#x4E3A; render &#x51FD;&#x6570;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; parser ------------------------ &#x5B58;&#x653E;&#x5C06;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x6210;&#x5143;&#x7D20;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; codegen ----------------------- &#x5B58;&#x653E;&#x4ECE;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;(AST)&#x751F;&#x6210;render&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; optimizer.js ------------------ &#x5206;&#x6790;&#x9759;&#x6001;&#x6811;&#xFF0C;&#x4F18;&#x5316;vdom&#x6E32;&#x67D3;
&#x2502;   &#x251C;&#x2500;&#x2500; core ------------------------------ &#x5B58;&#x653E;&#x901A;&#x7528;&#x7684;&#xFF0C;&#x5E73;&#x53F0;&#x65E0;&#x5173;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; observer ---------------------- &#x54CD;&#x5E94;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x5305;&#x542B;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; vdom -------------------------- &#x865A;&#x62DF;DOM&#x7684; creation &#x548C; patching &#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; instance ---------------------- Vue&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0E;&#x539F;&#x578B;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; global-api -------------------- &#x7ED9;Vue&#x6784;&#x9020;&#x51FD;&#x6570;&#x6302;&#x8F7D;&#x5168;&#x5C40;&#x65B9;&#x6CD5;(&#x9759;&#x6001;&#x65B9;&#x6CD5;)&#x6216;&#x5C5E;&#x6027;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; components -------------------- &#x5305;&#x542B;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x7684;&#x901A;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x76EE;&#x524D;&#x53EA;&#x6709;keep-alive
&#x2502;   &#x251C;&#x2500;&#x2500; server ---------------------------- &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;(server-side rendering)&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x251C;&#x2500;&#x2500; platforms ------------------------- &#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x7279;&#x6709;&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; weex -------------------------- weex&#x5E73;&#x53F0;&#x652F;&#x6301;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; web --------------------------- web&#x5E73;&#x53F0;&#x652F;&#x6301;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-runtime.js ---------------- &#x8FD0;&#x884C;&#x65F6;&#x6784;&#x5EFA;&#x7684;&#x5165;&#x53E3;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-runtime-with-compiler.js -- &#x72EC;&#x7ACB;&#x6784;&#x5EFA;&#x7248;&#x672C;&#x7684;&#x5165;&#x53E3;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-compiler.js --------------- vue-template-compiler &#x5305;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-server-renderer.js -------- vue-server-renderer &#x5305;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; sfc ------------------------------- &#x5305;&#x542B;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;.vue&#x6587;&#x4EF6;&#x7684;&#x89E3;&#x6790;&#x903B;&#x8F91;&#xFF0C;&#x7528;&#x4E8E;vue-template-compiler&#x5305;
&#x2502;   &#x251C;&#x2500;&#x2500; shared ---------------------------- &#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x5E93;&#x901A;&#x7528;&#x7684;&#x4EE3;&#x7801;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&#x251C;&#x2500;&#x2500; scripts ------------------------------- &#x5305;&#x542B;&#x4E0E;&#x6784;&#x5EFA;&#x76F8;&#x5173;&#x7684;&#x811A;&#x672C;&#x548C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; alias.js -------------------------- &#x6E90;&#x7801;&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x522B;&#x540D;
&#x2502;   &#x251C;&#x2500;&#x2500; config.js ------------------------- &#x9879;&#x76EE;&#x7684;&#x6784;&#x5EFA;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; build --------------------------------- &#x6784;&#x5EFA;&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x52A8;
&#x251C;&#x2500;&#x2500; dist ---------------------------------- &#x6784;&#x5EFA;&#x540E;&#x6587;&#x4EF6;&#x7684;&#x8F93;&#x51FA;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; examples ------------------------------ &#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;Vue&#x5F00;&#x53D1;&#x7684;&#x5E94;&#x7528;&#x6848;&#x4F8B;
&#x251C;&#x2500;&#x2500; flow ---------------------------------- JS&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x5DE5;&#x5177;[Flow](https://flowtype.org/)&#x7684;&#x7C7B;&#x578B;&#x58F0;&#x660E;
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; <span class="hljs-built_in">test</span> ---------------------------------- &#x6D4B;&#x8BD5;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; src ----------------------------------- &#x6E90;&#x7801;&#x76EE;&#x5F55;
&#x2502;   &#x251C;&#x2500;&#x2500; compiler -------------------------- &#x7F16;&#x8BD1;&#x5668;&#x4EE3;&#x7801;&#xFF0C;&#x7528;&#x6765;&#x5C06; template &#x7F16;&#x8BD1;&#x4E3A; render &#x51FD;&#x6570;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; parser ------------------------ &#x5B58;&#x653E;&#x5C06;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x6210;&#x5143;&#x7D20;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; codegen ----------------------- &#x5B58;&#x653E;&#x4ECE;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;(AST)&#x751F;&#x6210;render&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; optimizer.js ------------------ &#x5206;&#x6790;&#x9759;&#x6001;&#x6811;&#xFF0C;&#x4F18;&#x5316;vdom&#x6E32;&#x67D3;
&#x2502;   &#x251C;&#x2500;&#x2500; core ------------------------------ &#x5B58;&#x653E;&#x901A;&#x7528;&#x7684;&#xFF0C;&#x5E73;&#x53F0;&#x65E0;&#x5173;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; observer ---------------------- &#x54CD;&#x5E94;&#x5F0F;&#x5B9E;&#x73B0;&#xFF0C;&#x5305;&#x542B;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; vdom -------------------------- &#x865A;&#x62DF;DOM&#x7684; creation &#x548C; patching &#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; instance ---------------------- Vue&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0E;&#x539F;&#x578B;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; global-api -------------------- &#x7ED9;Vue&#x6784;&#x9020;&#x51FD;&#x6570;&#x6302;&#x8F7D;&#x5168;&#x5C40;&#x65B9;&#x6CD5;(&#x9759;&#x6001;&#x65B9;&#x6CD5;)&#x6216;&#x5C5E;&#x6027;&#x7684;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; components -------------------- &#x5305;&#x542B;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x7684;&#x901A;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x76EE;&#x524D;&#x53EA;&#x6709;keep-alive
&#x2502;   &#x251C;&#x2500;&#x2500; server ---------------------------- &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;(server-side rendering)&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x251C;&#x2500;&#x2500; platforms ------------------------- &#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x7279;&#x6709;&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; weex -------------------------- weex&#x5E73;&#x53F0;&#x652F;&#x6301;
&#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; web --------------------------- web&#x5E73;&#x53F0;&#x652F;&#x6301;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-runtime.js ---------------- &#x8FD0;&#x884C;&#x65F6;&#x6784;&#x5EFA;&#x7684;&#x5165;&#x53E3;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-runtime-with-compiler.js -- &#x72EC;&#x7ACB;&#x6784;&#x5EFA;&#x7248;&#x672C;&#x7684;&#x5165;&#x53E3;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-compiler.js --------------- vue-template-compiler &#x5305;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; entry-server-renderer.js -------- vue-server-renderer &#x5305;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; sfc ------------------------------- &#x5305;&#x542B;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;.vue&#x6587;&#x4EF6;&#x7684;&#x89E3;&#x6790;&#x903B;&#x8F91;&#xFF0C;&#x7528;&#x4E8E;vue-template-compiler&#x5305;
&#x2502;   &#x251C;&#x2500;&#x2500; shared ---------------------------- &#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x5E93;&#x901A;&#x7528;&#x7684;&#x4EE3;&#x7801;</code></pre><p>&#x51E0;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x76EE;&#x5F55;&#xFF1A;</p><ul><li><strong>compiler&#xFF1A;</strong>&#x7F16;&#x8BD1;&#xFF0C;&#x7528;&#x6765;&#x5C06;template&#x8F6C;&#x5316;&#x4E3A;render&#x51FD;&#x6570;</li><li><strong>core&#xFF1A;</strong>Vue&#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x54CD;&#x5E94;&#x5F0F;&#x5B9E;&#x73B0;&#x3001;&#x865A;&#x62DF;DOM&#x3001;Vue&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x7684;&#x6302;&#x8F7D;&#x3001;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x3001;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#x7684;&#x901A;&#x7528;&#x7EC4;&#x4EF6;&#x7B49;</li><li><strong>platform&#xFF1A;</strong>&#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E3B;&#x8981;&#x662F; web &#x5E73;&#x53F0;&#x548C; weex &#x5E73;&#x53F0;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x5E73;&#x53F0;&#x6709;&#x5176;&#x7279;&#x6B8A;&#x7684;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x7684;&#x91CD;&#x70B9;&#x662F; web &#x5E73;&#x53F0;</li><li><strong>server&#xFF1A;</strong>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;(SSR)&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#xFF0C;SSR &#x4E3B;&#x8981;&#x628A;&#x7EC4;&#x4EF6;&#x76F4;&#x63A5;&#x6E32;&#x67D3;&#x4E3A; HTML &#x5E76;&#x7531; Server &#x7AEF;&#x76F4;&#x63A5;&#x63D0;&#x4F9B;&#x7ED9; Client &#x7AEF;</li><li><strong>sfc&#xFF1A;</strong>&#x4E3B;&#x8981;&#x662F; .vue &#x6587;&#x4EF6;&#x89E3;&#x6790;&#x7684;&#x903B;&#x8F91;</li><li><strong>shared&#xFF1A;</strong>&#x4E00;&#x4E9B;&#x901A;&#x7528;&#x7684;&#x5DE5;&#x5177;&#x65B9;&#x6CD5;&#xFF0C;&#x6709;&#x4E00;&#x4E9B;&#x662F;&#x4E3A;&#x4E86;&#x589E;&#x52A0;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x800C;&#x8BBE;&#x7F6E;&#x7684;</li></ul><p>&#x5176;&#x4E2D;&#x5728;platform&#x4E0B;<code>src/platforms/web/entry-runtime.js</code>&#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x8FD0;&#x884C;&#x65F6;&#x6784;&#x5EFA;&#x7684;&#x5165;&#x53E3;&#xFF0C;ESM&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.runtime.esm.js&#xFF0C;CJS&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.runtime.common.js&#xFF0C;UMD&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.runtime.js&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x6A21;&#x677F; template &#x5230; render &#x51FD;&#x6570;&#x7684;&#x7F16;&#x8BD1;&#x5668;<br><code>src/platforms/web/entry-runtime-with-compiler.js</code>&#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x8FD0;&#x884C;&#x65F6;&#x6784;&#x5EFA;&#x7684;&#x5165;&#x53E3;&#xFF0C;ESM&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.esm.js&#xFF0C;CJS&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.common.js&#xFF0C;UMD&#x65B9;&#x5F0F;&#x8F93;&#x51FA; dist/vue.js&#xFF0C;&#x5305;&#x542B;compiler</p><h2 id="articleHeader2">2. &#x5165;&#x53E3;&#x6587;&#x4EF6;</h2><p>&#x4EFB;&#x4F55;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x90FD;&#x53EF;&#x4EE5;&#x4ECE; <code>package.json</code> &#x6587;&#x4EF6;&#x770B;&#x8D77;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x770B;&#x5B83;&#x7684; <code>script.dev</code> &#x5C31;&#x662F;&#x6211;&#x4EEC;&#x8FD0;&#x884C; <code>npm run dev</code> &#x7684;&#x65F6;&#x5019;&#x5B83;&#x7684;&#x547D;&#x4EE4;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;rollup -w -c scripts/config.js --environment TARGET:web-full-dev&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-full-dev&quot;</span>
}</code></pre><blockquote>&#x8FD9;&#x91CC;&#x7684; <a href="http://www.rollupjs.com/" rel="nofollow noreferrer" target="_blank">rollup</a> &#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x4E8E; webpack &#x7684;JS&#x6A21;&#x5757;&#x6253;&#x5305;&#x5668;&#xFF0C;&#x4E8B;&#x5B9E;&#x4E0A; <code>Vue - v1.0.10</code> &#x7248;&#x672C;&#x4E4B;&#x524D;&#x7528;&#x7684;&#x8FD8;&#x662F; webpack &#xFF0C;&#x5176;&#x540E;&#x6539;&#x6210;&#x4E86; rollup &#xFF0C;&#x5982;&#x679C;&#x60F3;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x6362;&#x6210; rollup &#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B; <a href="https://www.zhihu.com/question/37861778" rel="nofollow noreferrer" target="_blank">&#x5C24;&#x96E8;&#x6EAA;&#x672C;&#x4EBA;&#x7684;&#x56DE;&#x7B54;</a>&#xFF0C;&#x603B;&#x7684;&#x6765;&#x8BF4;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x6253;&#x51FA;&#x6765;&#x7684;&#x5305;&#x4F53;&#x79EF;&#x5C0F;&#x4E00;&#x70B9;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x901F;&#x5EA6;&#x5FEB;&#x4E00;&#x70B9;&#x3002;</blockquote><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x91CC; rollup &#x53BB;&#x8FD0;&#x884C; <code>scripts/config.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;&#x4E86;&#x4E2A;&#x53C2;&#x6570; <code>TARGET:web-full-dev</code>&#xFF0C;&#x90A3;&#x6765;&#x770B;&#x770B; <code>scripts/config.js</code> &#x91CC;&#x9762;&#x662F;&#x5565;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// scripts/config.js

const builds = {
  &apos;web-full-dev&apos;: {
    entry: resolve(&apos;web/entry-runtime-with-compiler.js&apos;),  // &#x5165;&#x53E3;&#x6587;&#x4EF6;
    dest: resolve(&apos;dist/vue.js&apos;),                          // &#x8F93;&#x51FA;&#x6587;&#x4EF6;
    format: &apos;umd&apos;,                                         // &#x53C2;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x7F16;&#x8BD1;&#x65B9;&#x5F0F;&#x8BF4;&#x660E;
    env: &apos;development&apos;,                                    // &#x73AF;&#x5883;
    alias: { he: &apos;./entity-decoder&apos; },                     // &#x522B;&#x540D;
    banner                                        // &#x6BCF;&#x4E2A;&#x5305;&#x524D;&#x9762;&#x7684;&#x6CE8;&#x91CA;-&#x7248;&#x672C;/&#x4F5C;&#x8005;/&#x65E5;&#x671F;.etc
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// scripts/config.js</span>

<span class="hljs-keyword">const</span> builds = {
  <span class="hljs-string">&apos;web-full-dev&apos;</span>: {
    <span class="hljs-attr">entry</span>: resolve(<span class="hljs-string">&apos;web/entry-runtime-with-compiler.js&apos;</span>),  <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    dest: resolve(<span class="hljs-string">&apos;dist/vue.js&apos;</span>),                          <span class="hljs-comment">// &#x8F93;&#x51FA;&#x6587;&#x4EF6;</span>
    format: <span class="hljs-string">&apos;umd&apos;</span>,                                         <span class="hljs-comment">// &#x53C2;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x7F16;&#x8BD1;&#x65B9;&#x5F0F;&#x8BF4;&#x660E;</span>
    env: <span class="hljs-string">&apos;development&apos;</span>,                                    <span class="hljs-comment">// &#x73AF;&#x5883;</span>
    alias: { <span class="hljs-attr">he</span>: <span class="hljs-string">&apos;./entity-decoder&apos;</span> },                     <span class="hljs-comment">// &#x522B;&#x540D;</span>
    banner                                        <span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x5305;&#x524D;&#x9762;&#x7684;&#x6CE8;&#x91CA;-&#x7248;&#x672C;/&#x4F5C;&#x8005;/&#x65E5;&#x671F;.etc</span>
  },
}</code></pre><p>format &#x7F16;&#x8BD1;&#x65B9;&#x5F0F;&#x8BF4;&#x660E;&#xFF1A;<br><strong>es&#xFF1A;</strong>ES Modules&#xFF0C;&#x4F7F;&#x7528;ES6&#x7684;&#x6A21;&#x677F;&#x8BED;&#x6CD5;&#x8F93;&#x51FA;<br><strong>cjs&#xFF1A;</strong>CommonJs Module&#xFF0C;&#x9075;&#x5FAA;CommonJs Module&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#x8F93;&#x51FA;<br><strong>amd&#xFF1A;</strong>AMD Module,&#x9075;&#x5FAA;AMD Module&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#x8F93;&#x51FA;<br><strong>umd&#xFF1A;</strong>&#x652F;&#x6301;&#x5916;&#x94FE;&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#x8F93;&#x51FA;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;script&#x6807;&#x7B7E;</p><p>&#x8FD9;&#x91CC;&#x7684; <code>web-full-dev</code> &#x5C31;&#x662F;&#x5BF9;&#x5E94;&#x521A;&#x521A;&#x6211;&#x4EEC;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x91CC;&#x4F20;&#x5165;&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x90A3;&#x4E48; rollup &#x5C31;&#x4F1A;&#x6309;&#x4E0B;&#x9762;&#x7684; entry &#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F00;&#x59CB;&#x53BB;&#x6253;&#x5305;&#xFF0C;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x5F88;&#x591A;&#x547D;&#x4EE4;&#x548C;&#x5176;&#x4ED6;&#x5404;&#x79CD;&#x8F93;&#x51FA;&#x65B9;&#x5F0F;&#x548C;&#x683C;&#x5F0F;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x67E5;&#x770B;&#x4E00;&#x4E0B;&#x6E90;&#x7801;&#x3002;</p><p>&#x56E0;&#x6B64;&#x672C;&#x6587;&#x4E3B;&#x8981;&#x7684;&#x5173;&#x6CE8;&#x70B9;&#x5728;&#x5305;&#x542B; compiler &#x7F16;&#x8BD1;&#x5668;&#x7684; <code>src/platforms/web/entry-runtime-with-compiler.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x751F;&#x4EA7;&#x548C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528; vue-loader &#x6765;&#x8FDB;&#x884C; template &#x7684;&#x7F16;&#x8BD1;&#x4ECE;&#x800C;&#x4E0D;&#x9700;&#x8981;&#x5E26; compiler &#x7684;&#x5305;&#xFF0C;&#x4F46;&#x662F;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;&#x539F;&#x7406;&#x548C;&#x6D41;&#x7A0B;&#x8FD8;&#x662F;&#x63A8;&#x4ECB;&#x4ECE;&#x5E26; compiler &#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x770B;&#x8D77;&#x3002;</p><p>&#x5148;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x5BFC;&#x5165;&#x4E86;&#x4E2A; Vue &#xFF0C;&#x770B;&#x770B;&#x5B83;&#x4ECE;&#x54EA;&#x6765;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/platforms/web/entry-runtime-with-compiler.js

import Vue from &apos;./runtime/index&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/platforms/web/entry-runtime-with-compiler.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./runtime/index&apos;</span></code></pre><p>&#x7EE7;&#x7EED;&#x770B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/platforms/web/runtime/index.js

import Vue from &apos;core/index&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/platforms/web/runtime/index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;core/index&apos;</span></code></pre><p>keep moving</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/index.js

import Vue from &apos;./instance/index&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./instance/index&apos;</span></code></pre><p>keep moving*2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/index.js

/* &#x8FD9;&#x91CC;&#x5C31;&#x662F;vue&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x4E0D;&#x7528;ES6&#x7684;Class&#x8BED;&#x6CD5;&#x662F;&#x56E0;&#x4E3A;mixin&#x6A21;&#x5757;&#x5212;&#x5206;&#x7684;&#x65B9;&#x4FBF; */
function Vue(options) {
  this._init(options)         // &#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F4D;&#x4E8E; initMixin &#x4E2D;
}

// &#x4E0B;&#x9762;&#x7684;mixin&#x5F80;Vue.prototype&#x4E0A;&#x5404;&#x79CD;&#x6302;&#x8F7D;
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/index.js</span>

<span class="hljs-comment">/* &#x8FD9;&#x91CC;&#x5C31;&#x662F;vue&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x4E0D;&#x7528;ES6&#x7684;Class&#x8BED;&#x6CD5;&#x662F;&#x56E0;&#x4E3A;mixin&#x6A21;&#x5757;&#x5212;&#x5206;&#x7684;&#x65B9;&#x4FBF; */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">this</span>._init(options)         <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F4D;&#x4E8E; initMixin &#x4E2D;</span>
}

<span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;mixin&#x5F80;Vue.prototype&#x4E0A;&#x5404;&#x79CD;&#x6302;&#x8F7D;</span>
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue</code></pre><p>&#x5F53;&#x6211;&#x4EEC; <code>new Vue( )</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x8C03;&#x7528;&#x7684;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;&#x8FD9;&#x91CC;&#x5F00;&#x59CB;&#x770B;&#x4E86;&#x3002;</p><h2 id="articleHeader3">3. &#x8FD0;&#x884C;&#x673A;&#x5236;</h2><p>&#x8FD9;&#x91CC;&#x6211;&#x7528;xmind&#x7C97;&#x7565;&#x7684;&#x753B;&#x4E86;&#x4E00;&#x5F20;&#x8FD0;&#x884C;&#x673A;&#x5236;&#x56FE;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x540E;&#x9762;&#x7684;&#x5206;&#x6790;&#x90FD;&#x5728;&#x8FD9;&#x5F20;&#x56FE;&#x4E0A;&#x9762;&#x7684;&#x67D0;&#x4E9B;&#x90E8;&#x5206;&#x4E86;</p><p>&#x672C;&#x6587; Vue &#x5B9E;&#x4F8B;&#x90FD;&#x662F;&#x7528; <code>vm</code> &#x6765;&#x8868;&#x793A;</p><p><span class="img-wrap"><img data-src="/img/bVbcW3U?w=1185&amp;h=1157" src="https://static.alili.tech/img/bVbcW3U?w=1185&amp;h=1157" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x56FE;&#x53EF;&#x4EE5;&#x5206;&#x4E3A;&#x591A;&#x4E2A;&#x90E8;&#x5206;&#x7EC6;&#x52A0;&#x9605;&#x8BFB;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x5728;&#x540E;&#x9762;&#x7684;&#x6587;&#x7AE0;&#x4E2D;&#x8BE6;&#x7EC6;&#x8BA8;&#x8BBA;&#xFF0C;&#x8FD9;&#x91CC;&#x5148;&#x8D34;&#x4E00;&#x90E8;&#x5206;&#x6E90;&#x7801;&#x5C1D;&#x5C1D;&#x9C9C;</p><h3 id="articleHeader4">3.1 &#x521D;&#x59CB;&#x5316; _init( )</h3><p><span class="img-wrap"><img data-src="/img/bVbcW3Y?w=543&amp;h=346" src="https://static.alili.tech/img/bVbcW3Y?w=543&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5F53;&#x6211;&#x4EEC;&#x5728; main.js &#x91CC; <code>new Vue( )</code> &#x540E;&#xFF0C;Vue &#x4F1A;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684; <code>_init( )</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x4F4D;&#x4E8E; core/instance/index.js &#x7684; <code>initMixin( )</code> &#x65B9;&#x6CD5;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/index.js

/* &#x8FD9;&#x91CC;&#x5C31;&#x662F;Vue&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570; */
function Vue(options) {
  this._init(options)              // &#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F4D;&#x4E8E; initMixin &#x4E2D;
}

// &#x4E0B;&#x9762;&#x7684;mixin&#x5F80;Vue.prototype&#x4E0A;&#x5404;&#x79CD;&#x6302;&#x8F7D;&#xFF0C;&#x8FD9;&#x662F;&#x5728;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x5DF2;&#x7ECF;&#x6302;&#x8F7D;&#x597D;&#x7684;
initMixin(Vue)                     // &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;_init&#x51FD;&#x6570;,...
stateMixin(Vue)                    // &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;$data&#x5C5E;&#x6027;, $props&#x5C5E;&#x6027;, $set&#x51FD;&#x6570;, $delete&#x51FD;&#x6570;, $watch&#x51FD;&#x6570;,...
eventsMixin(Vue)                   // &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;$on&#x51FD;&#x6570;, $once&#x51FD;&#x6570;, $off&#x51FD;&#x6570;, $emit&#x51FD;&#x6570;, $watch&#x65B9;&#x6CD5;,...
lifecycleMixin(Vue)                // &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;: _update&#x65B9;&#x6CD5;, $forceUpdate&#x51FD;&#x6570;, $destroy&#x51FD;&#x6570;,...
renderMixin(Vue)                   // &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;: $nextTick&#x51FD;&#x6570;, _render&#x51FD;&#x6570;,...

export default Vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/index.js</span>

<span class="hljs-comment">/* &#x8FD9;&#x91CC;&#x5C31;&#x662F;Vue&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570; */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">this</span>._init(options)              <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F4D;&#x4E8E; initMixin &#x4E2D;</span>
}

<span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;mixin&#x5F80;Vue.prototype&#x4E0A;&#x5404;&#x79CD;&#x6302;&#x8F7D;&#xFF0C;&#x8FD9;&#x662F;&#x5728;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x5DF2;&#x7ECF;&#x6302;&#x8F7D;&#x597D;&#x7684;</span>
initMixin(Vue)                     <span class="hljs-comment">// &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;_init&#x51FD;&#x6570;,...</span>
stateMixin(Vue)                    <span class="hljs-comment">// &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;$data&#x5C5E;&#x6027;, $props&#x5C5E;&#x6027;, $set&#x51FD;&#x6570;, $delete&#x51FD;&#x6570;, $watch&#x51FD;&#x6570;,...</span>
eventsMixin(Vue)                   <span class="hljs-comment">// &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;&#xFF1A;$on&#x51FD;&#x6570;, $once&#x51FD;&#x6570;, $off&#x51FD;&#x6570;, $emit&#x51FD;&#x6570;, $watch&#x65B9;&#x6CD5;,...</span>
lifecycleMixin(Vue)                <span class="hljs-comment">// &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;: _update&#x65B9;&#x6CD5;, $forceUpdate&#x51FD;&#x6570;, $destroy&#x51FD;&#x6570;,...</span>
renderMixin(Vue)                   <span class="hljs-comment">// &#x7ED9;Vue.prototype&#x6DFB;&#x52A0;: $nextTick&#x51FD;&#x6570;, _render&#x51FD;&#x6570;,...</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x770B; <code>init( )</code> &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5230;&#x5E95;&#x8FDB;&#x884C;&#x4E86;&#x54EA;&#x4E9B;&#x521D;&#x59CB;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/index.js

Vue.prototype._init = function(options?: Object) {
  const vm: Component = this

  initLifecycle(vm)                     // &#x521D;&#x59CB;&#x5316;&#x751F;&#x547D;&#x5468;&#x671F; src/core/instance/lifecycle.js
  initEvents(vm)                        // &#x521D;&#x59CB;&#x5316;&#x4E8B;&#x4EF6; src/core/instance/events.js
  initRender(vm)                        // &#x521D;&#x59CB;&#x5316;render src/core/instance/render.js
  callHook(vm, &apos;beforeCreate&apos;)          // &#x8C03;&#x7528;beforeCreate&#x94A9;&#x5B50;
  initInjections(vm)                    // &#x521D;&#x59CB;&#x5316;&#x6CE8;&#x5165;&#x503C; before data/props src/core/instance/inject.js
  initState(vm)                         // &#x6302;&#x8F7D; data/props/methods/watcher/computed
  initProvide(vm)                       // &#x521D;&#x59CB;&#x5316;Provide after data/props
  callHook(vm, &apos;created&apos;)               // &#x8C03;&#x7528;created&#x94A9;&#x5B50;

  if (vm.$options.el) {                    // $options&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x6211;&#x4EEC;&#x4F20;&#x7ED9; `new Vue(options)` &#x7684;options
    vm.$mount(vm.$options.el)              // $mount&#x65B9;&#x6CD5;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/index.js</span>

Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options?: Object</span>) </span>{
  <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>

  initLifecycle(vm)                     <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x751F;&#x547D;&#x5468;&#x671F; src/core/instance/lifecycle.js</span>
  initEvents(vm)                        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x4E8B;&#x4EF6; src/core/instance/events.js</span>
  initRender(vm)                        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;render src/core/instance/render.js</span>
  callHook(vm, <span class="hljs-string">&apos;beforeCreate&apos;</span>)          <span class="hljs-comment">// &#x8C03;&#x7528;beforeCreate&#x94A9;&#x5B50;</span>
  initInjections(vm)                    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x6CE8;&#x5165;&#x503C; before data/props src/core/instance/inject.js</span>
  initState(vm)                         <span class="hljs-comment">// &#x6302;&#x8F7D; data/props/methods/watcher/computed</span>
  initProvide(vm)                       <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;Provide after data/props</span>
  callHook(vm, <span class="hljs-string">&apos;created&apos;</span>)               <span class="hljs-comment">// &#x8C03;&#x7528;created&#x94A9;&#x5B50;</span>

  <span class="hljs-keyword">if</span> (vm.$options.el) {                    <span class="hljs-comment">// $options&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x6211;&#x4EEC;&#x4F20;&#x7ED9; `new Vue(options)` &#x7684;options</span>
    vm.$mount(vm.$options.el)              <span class="hljs-comment">// $mount&#x65B9;&#x6CD5;</span>
  }
}</code></pre><p>&#x8FD9;&#x91CC; <code>_init()</code> &#x65B9;&#x6CD5;&#x4E2D;&#x4F1A;&#x5BF9;&#x5F53;&#x524D; <code>vm</code> &#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x4E00;&#x7CFB;&#x5217;&#x521D;&#x59CB;&#x5316;&#x8BBE;&#x7F6E;&#xFF0C;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#x7684;&#x662F;&#x521D;&#x59CB;&#x5316; State &#x7684;&#x65B9;&#x6CD5; <code>initState(vm)</code> &#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C; <code>data/props</code> &#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4F20;&#x8BF4;&#x4E2D;&#x7684;&#x901A;&#x8FC7; <code>Object.defineProperty()</code> &#x65B9;&#x6CD5;&#x5BF9;&#x9700;&#x8981;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x8BBE;&#x7F6E; <code>getter/setter</code>&#xFF0C;&#x4EE5;&#x6B64;&#x4E3A;&#x57FA;&#x7840;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x641C;&#x96C6;(Dependency Collection)&#xFF0C;&#x8FBE;&#x5230;&#x6570;&#x636E;&#x53D8;&#x5316;&#x9A71;&#x52A8;&#x89C6;&#x56FE;&#x53D8;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x6700;&#x540E;&#x68C0;&#x6D4B; <code>vm.$options</code> &#x4E0A;&#x9762;&#x6709;&#x6CA1;&#x6709; <code>el</code> &#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#x4F7F;&#x7528; <code>vm.$mount</code> &#x65B9;&#x6CD5;&#x6302;&#x8F7D; <code>vm</code>&#xFF0C;&#x5F62;&#x6210;&#x6570;&#x636E;&#x5C42;&#x548C;&#x89C6;&#x56FE;&#x5C42;&#x7684;&#x8054;&#x7CFB;&#x3002;&#x8FD9;&#x4E5F;&#x662F;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x63D0;&#x4F9B; <code>el</code> &#x9009;&#x9879;&#x5C31;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x624B;&#x52A8; <code>vm.$mount(&apos;#app&apos;)</code> &#x7684;&#x539F;&#x56E0;&#x3002;</p><p>&#x6211;&#x4EEC;&#x770B;&#x5230; <code>created</code> &#x94A9;&#x5B50;&#x662F;&#x5728;&#x6302;&#x8F7D; <code>$mount</code> &#x4E4B;&#x524D;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728; <code>created</code> &#x94A9;&#x5B50;&#x89E6;&#x53D1;&#x4E4B;&#x524D;&#x662F;&#x65E0;&#x6CD5;&#x64CD;&#x4F5C; DOM &#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x8FD8;&#x6CA1;&#x6709;&#x6E32;&#x67D3;&#x5230; DOM &#x4E0A;&#x3002;</p><h3 id="articleHeader5">3.2 &#x6302;&#x8F7D; $mount( )</h3><p><span class="img-wrap"><img data-src="/img/bVbcW30?w=645&amp;h=138" src="https://static.alili.tech/img/bVbcW30?w=645&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6302;&#x8F7D;&#x65B9;&#x6CD5; <code>vm.$mount( )</code> &#x5728;&#x591A;&#x4E2A;&#x5730;&#x65B9;&#x6709;&#x5B9A;&#x4E49;&#xFF0C;&#x662F;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x6253;&#x5305;&#x65B9;&#x5F0F;&#x548C;&#x5E73;&#x53F0;&#x6709;&#x5173;&#x7684;&#xFF0C;<code>src/platform/web/entry-runtime-with-compiler.js</code>&#x3001;<code>src/platform/web/runtime/index.js</code>&#x3001;<code>src/platform/weex/runtime/index.js</code>&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5173;&#x6CE8;&#x70B9;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x5728; <code>entry-runtime-with-compiler.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x4F1A;&#x9996;&#x5148;&#x628A; <code>runtime/index.js</code> &#x4E2D;&#x7684; <code>$mount</code> &#x65B9;&#x6CD5;&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#xFF0C;&#x5E76;&#x5728;&#x6700;&#x540E;&#x7528; call &#x8FD0;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/platform/web/entry-runtime-with-compiler.js

const mount = Vue.prototype.$mount    // &#x628A;&#x539F;&#x6765;&#x7684;$mount&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#xFF0C;&#x4F4D;&#x4E8E; src/platform/web/runtime/index.js
Vue.prototype.$mount = function(
  el?: string | Element,    // &#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20;
  hydrating?: boolean       // &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x76F8;&#x5173;&#x53C2;&#x6570;
): Component {
  el = el &amp;&amp; query(el)
  
  const options = this.$options
  if (!options.render) {                // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;render&#x65B9;&#x6CD5;
    let template = options.template
    
    // &#x628A;&#x83B7;&#x53D6;&#x5230;&#x7684;template&#x901A;&#x8FC7;&#x7F16;&#x8BD1;&#x7684;&#x624B;&#x6BB5;&#x8F6C;&#x5316;&#x4E3A;render&#x51FD;&#x6570;
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {...}, this)
      options.render = render
    }
  }
  return mount.call(this, el, hydrating)      // &#x6267;&#x884C;&#x539F;&#x6765;&#x7684;$mount
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/platform/web/entry-runtime-with-compiler.js</span>

<span class="hljs-keyword">const</span> mount = Vue.prototype.$mount    <span class="hljs-comment">// &#x628A;&#x539F;&#x6765;&#x7684;$mount&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#xFF0C;&#x4F4D;&#x4E8E; src/platform/web/runtime/index.js</span>
Vue.prototype.$mount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">
  el?: string | Element,    <span class="hljs-regexp">//</span> &#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20;
  hydrating?: boolean       <span class="hljs-regexp">//</span> &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x76F8;&#x5173;&#x53C2;&#x6570;
</span>): <span class="hljs-title">Component</span> </span>{
  el = el &amp;&amp; query(el)
  
  <span class="hljs-keyword">const</span> options = <span class="hljs-keyword">this</span>.$options
  <span class="hljs-keyword">if</span> (!options.render) {                <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;render&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">let</span> template = options.template
    
    <span class="hljs-comment">// &#x628A;&#x83B7;&#x53D6;&#x5230;&#x7684;template&#x901A;&#x8FC7;&#x7F16;&#x8BD1;&#x7684;&#x624B;&#x6BB5;&#x8F6C;&#x5316;&#x4E3A;render&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">if</span> (template) {
      <span class="hljs-keyword">const</span> { render, staticRenderFns } = compileToFunctions(template, {...}, <span class="hljs-keyword">this</span>)
      options.render = render
    }
  }
  <span class="hljs-keyword">return</span> mount.call(<span class="hljs-keyword">this</span>, el, hydrating)      <span class="hljs-comment">// &#x6267;&#x884C;&#x539F;&#x6765;&#x7684;$mount</span>
}</code></pre><p>&#x5728; Vue 2.0 &#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x6240;&#x6709; Vue &#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x6E32;&#x67D3;&#x6700;&#x7EC8;&#x90FD;&#x9700;&#x8981; render &#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x8BBA;&#x6211;&#x4EEC;&#x662F;&#x7528;&#x5355;&#x6587;&#x4EF6; .vue &#x65B9;&#x5F0F;&#x5F00;&#x53D1;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD8;&#x662F;&#x5199;&#x4E86; el &#x6216;&#x8005; template &#x5C5E;&#x6027;&#xFF0C;&#x6700;&#x7EC8;&#x90FD;&#x4F1A;&#x8F6C;&#x6362;&#x6210; render &#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x91CC;&#x7684; <code>compileToFunctions</code> &#x5C31;&#x662F;&#x628A; template &#x7F16;&#x8BD1;&#x4E3A; render &#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/platform/weex/runtime/index.js

Vue.prototype.$mount = function (
  el?: string | Element,    // &#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20;
  hydrating?: boolean       // &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x76F8;&#x5173;&#x53C2;&#x6570;
): Component {
  el = el &amp;&amp; inBrowser ? query(el) : undefined        // query&#x5C31;&#x662F;document.querySelector&#x65B9;&#x6CD5;
  return mountComponent(this, el, hydrating)          // &#x4F4D;&#x4E8E;core/instance/lifecycle.js
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/platform/weex/runtime/index.js</span>

Vue.prototype.$mount = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
  el?: string | Element,    <span class="hljs-regexp">//</span> &#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20;
  hydrating?: boolean       <span class="hljs-regexp">//</span> &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x76F8;&#x5173;&#x53C2;&#x6570;
</span>): <span class="hljs-title">Component</span> </span>{
  el = el &amp;&amp; inBrowser ? query(el) : <span class="hljs-literal">undefined</span>        <span class="hljs-comment">// query&#x5C31;&#x662F;document.querySelector&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">return</span> mountComponent(<span class="hljs-keyword">this</span>, el, hydrating)          <span class="hljs-comment">// &#x4F4D;&#x4E8E;core/instance/lifecycle.js</span>
}</code></pre><p>&#x8FD9;&#x91CC;&#x7684; <code>el</code> &#x4E00;&#x5F00;&#x59CB;&#x5982;&#x679C;&#x4E0D;&#x662F;DOM&#x5143;&#x7D20;&#x7684;&#x8BDD;&#x4F1A;&#x88AB; query &#x65B9;&#x6CD5;&#x6362;&#x6210;DOM&#x5143;&#x7D20;&#x518D;&#x88AB;&#x4F20;&#x7ED9; <code>mountComponent</code> &#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x770B; <code>mountComponent</code> &#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  callHook(vm, &apos;beforeMount&apos;)            // &#x8C03;&#x7528;beforeMount&#x94A9;&#x5B50;

  // &#x6E32;&#x67D3;watcher&#xFF0C;&#x5F53;&#x6570;&#x636E;&#x66F4;&#x6539;&#xFF0C;updateComponent&#x4F5C;&#x4E3A;Watcher&#x5BF9;&#x8C61;&#x7684;getter&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x5E76;&#x6E32;&#x67D3;&#x89C6;&#x56FE;
  let updateComponent
  updateComponent = () =&gt; {
    vm._update(vm._render(), hydrating)
  }

  // &#x6E32;&#x67D3;watcher, Watcher &#x5728;&#x8FD9;&#x91CC;&#x8D77;&#x5230;&#x4E24;&#x4E2A;&#x4F5C;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
  // &#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x5F53; vm &#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x76D1;&#x6D4B;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, &apos;beforeUpdate&apos;)            // &#x8C03;&#x7528;beforeUpdate&#x94A9;&#x5B50;
      }
    }
  }, true /* isRenderWatcher */)

  // &#x8FD9;&#x91CC;&#x6CE8;&#x610F; vm.$vnode &#x8868;&#x793A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x7236;&#x865A;&#x62DF; Node&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4E3A; Null &#x5219;&#x8868;&#x793A;&#x5F53;&#x524D;&#x662F;&#x6839; Vue &#x7684;&#x5B9E;&#x4F8B;
  if (vm.$vnode == null) {
    vm._isMounted = true               // &#x8868;&#x793A;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x5DF2;&#x7ECF;&#x6302;&#x8F7D;
    callHook(vm, &apos;mounted&apos;)            // &#x8C03;&#x7528;mounted&#x94A9;&#x5B50;
  }
  return vm
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/lifecycle.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mountComponent</span> (<span class="hljs-params">
  vm: Component,
  el: ?Element,
  hydrating?: boolean
</span>): <span class="hljs-title">Component</span> </span>{
  vm.$el = el
  <span class="hljs-keyword">if</span> (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  callHook(vm, <span class="hljs-string">&apos;beforeMount&apos;</span>)            <span class="hljs-comment">// &#x8C03;&#x7528;beforeMount&#x94A9;&#x5B50;</span>

  <span class="hljs-comment">// &#x6E32;&#x67D3;watcher&#xFF0C;&#x5F53;&#x6570;&#x636E;&#x66F4;&#x6539;&#xFF0C;updateComponent&#x4F5C;&#x4E3A;Watcher&#x5BF9;&#x8C61;&#x7684;getter&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x5E76;&#x6E32;&#x67D3;&#x89C6;&#x56FE;</span>
  <span class="hljs-keyword">let</span> updateComponent
  updateComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    vm._update(vm._render(), hydrating)
  }

  <span class="hljs-comment">// &#x6E32;&#x67D3;watcher, Watcher &#x5728;&#x8FD9;&#x91CC;&#x8D77;&#x5230;&#x4E24;&#x4E2A;&#x4F5C;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
  <span class="hljs-comment">// &#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x5F53; vm &#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x76D1;&#x6D4B;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
  <span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop, {
    before () {
      <span class="hljs-keyword">if</span> (vm._isMounted) {
        callHook(vm, <span class="hljs-string">&apos;beforeUpdate&apos;</span>)            <span class="hljs-comment">// &#x8C03;&#x7528;beforeUpdate&#x94A9;&#x5B50;</span>
      }
    }
  }, <span class="hljs-literal">true</span> <span class="hljs-comment">/* isRenderWatcher */</span>)

  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x6CE8;&#x610F; vm.$vnode &#x8868;&#x793A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x7236;&#x865A;&#x62DF; Node&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4E3A; Null &#x5219;&#x8868;&#x793A;&#x5F53;&#x524D;&#x662F;&#x6839; Vue &#x7684;&#x5B9E;&#x4F8B;</span>
  <span class="hljs-keyword">if</span> (vm.$vnode == <span class="hljs-literal">null</span>) {
    vm._isMounted = <span class="hljs-literal">true</span>               <span class="hljs-comment">// &#x8868;&#x793A;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x5DF2;&#x7ECF;&#x6302;&#x8F7D;</span>
    callHook(vm, <span class="hljs-string">&apos;mounted&apos;</span>)            <span class="hljs-comment">// &#x8C03;&#x7528;mounted&#x94A9;&#x5B50;</span>
  }
  <span class="hljs-keyword">return</span> vm
}</code></pre><p>&#x5728; <code>mountComponent</code> &#x65B9;&#x6CD5;&#x91CC;&#x5B9E;&#x4F8B;&#x5316;&#x4E86;&#x4E00;&#x4E2A;&#x6E32;&#x67D3; <code>Watcher</code>&#xFF0C;&#x5E76;&#x4E14;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A; <code>updateComponent</code> &#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;<code>() =&gt; { vm._update(vm._render(), hydrating) }</code> &#x9996;&#x5148;&#x4F7F;&#x7528; <code>_render</code> &#x65B9;&#x6CD5;&#x751F;&#x6210; <code>VNode</code>&#xFF0C;&#x518D;&#x8C03;&#x7528; <code>_update</code> &#x65B9;&#x6CD5;&#x66F4;&#x65B0;DOM&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x89C6;&#x56FE;&#x66F4;&#x65B0;&#x90E8;&#x5206;&#x7684;&#x4ECB;&#x7ECD;</p><p>&#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x4E86;&#x51E0;&#x4E2A;&#x94A9;&#x5B50;&#xFF0C;&#x4ED6;&#x4EEC;&#x7684;&#x65F6;&#x673A;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader6">3.3 &#x7F16;&#x8BD1; compile( )</h3><p>&#x5982;&#x679C;&#x5728;&#x9700;&#x8981;&#x8F6C;&#x6362; render &#x7684;&#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5199;&#x7684; template &#xFF0C;&#x5C06;&#x4F1A;&#x88AB; compiler &#x8F6C;&#x6362;&#x4E3A; render &#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x5176;&#x4E2D;&#x4F1A;&#x6709;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#x7EC4;&#x6210;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcW34?w=391&amp;h=204" src="https://static.alili.tech/img/bVbcW34?w=391&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5165;&#x53E3;&#x4F4D;&#x4E8E;&#x521A;&#x521A; src/platform/web/entry-runtime-with-compiler.js &#x7684; <code>compileToFunctions</code> &#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/platforms/web/compiler/index.js

const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-comment">// src/platforms/web/compiler/index.js</span>

<span class="hljs-keyword">const</span> { compile, compileToFunctions } = createCompiler(baseOptions)
<span class="hljs-keyword">export</span> { compile, compileToFunctions }</code></pre><p>&#x7EE7;&#x7EED;&#x770B;&#x8FD9;&#x91CC;&#x7684; <code>createCompiler</code> &#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/compiler/index.js

export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/compiler/index.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createCompiler = createCompilerCreator(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baseCompile</span> (<span class="hljs-params">
  template: string,
  options: CompilerOptions
</span>): <span class="hljs-title">CompiledResult</span> </span>{
  <span class="hljs-keyword">const</span> ast = parse(template.trim(), options)
  <span class="hljs-keyword">if</span> (options.optimize !== <span class="hljs-literal">false</span>) {
    optimize(ast, options)
  }
  <span class="hljs-keyword">const</span> code = generate(ast, options)
  <span class="hljs-keyword">return</span> {
    ast,
    <span class="hljs-attr">render</span>: code.render,
    <span class="hljs-attr">staticRenderFns</span>: code.staticRenderFns
  }
})</code></pre><p>&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6709;&#x4E09;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x8FC7;&#x7A0B; <code>parse</code>&#x3001;<code>optimize</code>&#x3001;<code>generate</code>&#xFF0C;&#x4E4B;&#x540E;&#x751F;&#x6210;&#x4E86; render &#x65B9;&#x6CD5;&#x4EE3;&#x7801;&#x3002;</p><ul><li><code>parse</code>&#xFF1A;&#x4F1A;&#x7528;&#x6B63;&#x5219;&#x7B49;&#x65B9;&#x5F0F;&#x89E3;&#x6790; template &#x6A21;&#x677F;&#x4E2D;&#x7684;&#x6307;&#x4EE4;&#x3001;class&#x3001;style&#x7B49;&#x6570;&#x636E;&#xFF0C;&#x5F62;&#x6210;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811; AST</li><li><code>optimize</code>&#xFF1A;&#x4F18;&#x5316;AST&#xFF0C;&#x751F;&#x6210;&#x6A21;&#x677F;AST&#x6811;&#xFF0C;&#x68C0;&#x6D4B;&#x4E0D;&#x9700;&#x8981;&#x8FDB;&#x884C;DOM&#x6539;&#x53D8;&#x7684;&#x9759;&#x6001;&#x5B50;&#x6811;&#xFF0C;&#x51CF;&#x5C11; patch &#x7684;&#x538B;&#x529B;</li><li><code>generate</code>&#xFF1A;&#x628A; AST &#x751F;&#x6210; render &#x65B9;&#x6CD5;&#x7684;&#x4EE3;&#x7801;</li></ul><h3 id="articleHeader7">3.4 &#x54CD;&#x5E94;&#x5F0F;&#x5316; observe( )</h3><p>Vue&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;MVVM&#x6846;&#x67B6;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5B83;&#x7684; Model &#x5C42;&#x548C; View &#x5C42;&#x4E4B;&#x95F4;&#x7684;&#x6865;&#x6881; ViewModel &#x662F;&#x505A;&#x5230;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x7684;&#x5173;&#x952E;&#xFF0C;Vue&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x662F;&#x901A;&#x8FC7; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a> &#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x7ED9;&#x88AB;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x8BBE;&#x7F6E; <code>getter/setter</code> &#xFF0C;&#x5F53; render &#x51FD;&#x6570;&#x88AB;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8BFB;&#x53D6;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x5BF9;&#x8C61;&#x7684; <code>getter</code> &#x8FDB;&#x884C;<strong>&#x4F9D;&#x8D56;&#x6536;&#x96C6;</strong>&#xFF0C;&#x800C;&#x5728;&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8BBE;&#x7F6E; <code>setter</code>&#xFF0C;<code>setter</code> &#x65B9;&#x6CD5;&#x4F1A; <code>notify</code> &#x5B83;&#x4E4B;&#x524D;&#x6536;&#x96C6;&#x5230;&#x7684;&#x6BCF;&#x4E00;&#x4E2A; <code>watcher</code> &#x6765;&#x544A;&#x8BC9;&#x4ED6;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#x503C;&#x66F4;&#x65B0;&#x4E86;&#xFF0C;&#x4ECE;&#x800C;&#x89E6;&#x53D1; <code>watcher</code> &#x7684; <code>update</code> &#x53BB; <code>patch</code> &#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbcW37?w=596&amp;h=258" src="https://static.alili.tech/img/bVbcW37?w=596&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;&#x5165;&#x53E3;&#x4F4D;&#x4E8E; src/core/instance/init.js &#x7684; <code>initState</code> &#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/state.js

export function initState(vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/state.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span>(<span class="hljs-params">vm: Component</span>) </span>{
  vm._watchers = []
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm)
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
  }
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)
  <span class="hljs-keyword">if</span> (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}</code></pre><p>&#x5B83;&#x975E;&#x5E38;&#x89C4;&#x5F8B;&#x7684;&#x5B9A;&#x4E49;&#x4E86;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x521D;&#x59CB;&#x5316; <code>props</code>&#x3001;<code>methods</code>&#x3001;<code>data</code>&#x3001;<code>computed</code>&#x3001;<code>wathcer</code>&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x770B; <code>initData</code> &#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x7AA5;&#x4E00;&#x8C79;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/state.js

function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === &apos;function&apos;
                    ? getData(data, vm)
                    : data || {}
  
  observe(data, true /* asRootData */) // &#x7ED9;data&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#x5904;&#x7406;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/state.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initData</span>(<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-keyword">let</span> data = vm.$options.data
  data = vm._data = <span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&apos;function&apos;</span>
                    ? getData(data, vm)
                    : data || {}
  
  observe(data, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>) <span class="hljs-comment">// &#x7ED9;data&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#x5904;&#x7406;</span>
}</code></pre><p>&#x9996;&#x5148;&#x5224;&#x65AD;&#x4E86;&#x4E0B; data &#x662F;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5219;&#x53D6;&#x8FD4;&#x56DE;&#x503C;&#x4E0D;&#x662F;&#x5219;&#x53D6;&#x81EA;&#x8EAB;&#xFF0C;&#x4E4B;&#x540E;&#x6709;&#x4E00;&#x4E2A; <code>observe</code> &#x65B9;&#x6CD5;&#x5BF9; <code>data</code> &#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/index.js

export function observe (value: any, asRootData: ?boolean): Observer | void {
  let ob: Observer | void
  ob = new Observer(value)
  return ob
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/index.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">value: any, asRootData: ?boolean</span>): <span class="hljs-title">Observer</span> | <span class="hljs-title">void</span> </span>{
  <span class="hljs-keyword">let</span> ob: Observer | <span class="hljs-keyword">void</span>
  ob = <span class="hljs-keyword">new</span> Observer(value)
  <span class="hljs-keyword">return</span> ob
}</code></pre><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x7528; <code>data</code> &#x53BB;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A; Observer &#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#xFF0C;Observer &#x662F;&#x4E00;&#x4E2A; Class&#xFF0C;Observer &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F7F;&#x7528; <code>defineReactive</code> &#x65B9;&#x6CD5;&#x7ED9;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#xFF0C;&#x5B83;&#x7ED9;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x9012;&#x5F52;&#x6DFB;&#x52A0; <code>getter/setter</code>&#xFF0C;&#x7528;&#x4E8E;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x548C; notify &#x66F4;&#x65B0;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/index.js

function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* &#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6; */
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            notify();                // &#x89E6;&#x53D1;&#x66F4;&#x65B0;
        }
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/index.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, val</span>) </span>{
    <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">/* &#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6; */</span>
            <span class="hljs-keyword">return</span> val;
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-keyword">if</span> (newVal === val) <span class="hljs-keyword">return</span>;
            notify();                <span class="hljs-comment">// &#x89E6;&#x53D1;&#x66F4;&#x65B0;</span>
        }
    });
}</code></pre><h3 id="articleHeader8">3.5 &#x89C6;&#x56FE;&#x66F4;&#x65B0; patch( )</h3><p><span class="img-wrap"><img data-src="/img/bVbcW4a?w=824&amp;h=411" src="https://static.alili.tech/img/bVbcW4a?w=824&amp;h=411" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5F53;&#x4F7F;&#x7528; <code>defineReactive</code> &#x65B9;&#x6CD5;&#x5C06;&#x5BF9;&#x8C61;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x540E;&#xFF0C;&#x5F53; render &#x51FD;&#x6570;&#x88AB;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x8BFB;&#x53D6;&#x54CD;&#x5E94;&#x5316;&#x5BF9;&#x8C61;&#x7684; <code>getter</code> &#x4ECE;&#x800C;&#x89E6;&#x53D1; <code>getter</code> &#x8FDB;&#x884C; <code>watcher</code> &#x4F9D;&#x8D56;&#x7684;&#x6536;&#x96C6;&#xFF0C;&#x800C;&#x5728;&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x5316;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1; <code>setter</code> &#x901A;&#x77E5; <code>notify</code> &#x4E4B;&#x524D;&#x6536;&#x96C6;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x901A;&#x77E5;&#x81EA;&#x5DF1;&#x5DF2;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;&#x8BF7;&#x6309;&#x9700;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x89C6;&#x56FE;&#x3002;&#x88AB;&#x901A;&#x77E5;&#x7684; <code>watcher</code> &#x8C03;&#x7528; <code>update</code> &#x65B9;&#x6CD5;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#xFF0C;&#x4F4D;&#x4E8E;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x8FC7;&#x7684;&#x4F20;&#x9012;&#x7ED9; <code>new Watcher( )</code> &#x7684; <code>updateComponent</code> &#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x8C03;&#x7528; <code>update</code> &#x65B9;&#x6CD5;&#x53BB; <code>patch</code> &#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/lifecycle.js

let updateComponent
updateComponent = () =&gt; {
  vm._update(vm._render(), hydrating)
}

// &#x6E32;&#x67D3;watcher, Watcher &#x5728;&#x8FD9;&#x91CC;&#x8D77;&#x5230;&#x4E24;&#x4E2A;&#x4F5C;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
// &#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x5F53; vm &#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x76D1;&#x6D4B;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
new Watcher(vm, updateComponent, noop, {...}, true /* isRenderWatcher */)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/lifecycle.js</span>

<span class="hljs-keyword">let</span> updateComponent
updateComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  vm._update(vm._render(), hydrating)
}

<span class="hljs-comment">// &#x6E32;&#x67D3;watcher, Watcher &#x5728;&#x8FD9;&#x91CC;&#x8D77;&#x5230;&#x4E24;&#x4E2A;&#x4F5C;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
<span class="hljs-comment">// &#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x5F53; vm &#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x76D1;&#x6D4B;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop, {...}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* isRenderWatcher */</span>)</code></pre><p>&#x8FD9;&#x4E2A; <code>_render</code> &#x65B9;&#x6CD5;&#x751F;&#x6210;&#x865A;&#x62DF; Node&#xFF0C; <code>_update</code> &#x65B9;&#x6CD5;&#x4E2D;&#x7684;&#x4F1A;&#x5C06;&#x65B0;&#x7684; VNode &#x4E0E;&#x65E7;&#x7684; VNode &#x4E00;&#x8D77;&#x4F20;&#x5165; <code>patch</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/lifecycle.js

Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) { // &#x8C03;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;
  const vm: Component = this
  const prevVnode = vm._vnode
  vm._vnode = vnode

  if (!prevVnode) {
    // &#x521D;&#x59CB;&#x5316;
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    //&#x66F4;&#x65B0;
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/lifecycle.js</span>

Vue.prototype._update = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">vnode: VNode, hydrating?: boolean</span>) </span>{ <span class="hljs-comment">// &#x8C03;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;</span>
  <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">const</span> prevVnode = vm._vnode
  vm._vnode = vnode

  <span class="hljs-keyword">if</span> (!prevVnode) {
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;</span>
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, <span class="hljs-literal">false</span> <span class="hljs-comment">/* removeOnly */</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//&#x66F4;&#x65B0;</span>
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
}</code></pre><p><code>_update</code> &#x8C03;&#x7528; <code>__patch__</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x4E3B;&#x8981;&#x662F;&#x5BF9;&#x65B0;&#x8001; VNode &#x8FDB;&#x884C;&#x6BD4;&#x8F83; <code>patchVnode</code>&#xFF0C;&#x7ECF;&#x8FC7; diff &#x7B97;&#x6CD5;&#x5F97;&#x51FA;&#x5B83;&#x4EEC;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x6700;&#x540E;&#x8FD9;&#x4E9B;&#x5DEE;&#x5F02;&#x7684;&#x5BF9;&#x5E94; DOM &#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x3002;</p><p>&#x5230;&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x4E00;&#x4E2A;&#x4E3B;&#x8981;&#x7684;&#x6D41;&#x7A0B;&#x5C31;&#x4ECB;&#x7ECD;&#x5B8C;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5927;&#x6982;&#x4E86;&#x89E3;&#x4E86;&#x4E00;&#x4E2A; Vue &#x4ECE;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x5F00;&#x59CB;&#x662F;&#x5982;&#x4F55;&#x8FD0;&#x8F6C;&#x7684;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x5C55;&#x5F00;&#x6765;&#x8BA8;&#x8BBA;&#x4E00;&#x4E0B;&#x5404;&#x4E2A;&#x90E8;&#x5206;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5728;&#x4E0B;&#x624D;&#x758F;&#x5B66;&#x6D45;&#xFF0C;&#x672A;&#x514D;&#x7EB0;&#x6F0F;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x8BA8;&#x8BBA;~</p><hr><p>&#x672C;&#x6587;&#x662F;<strong>&#x7CFB;&#x5217;&#x6587;&#x7AE0;</strong>&#xFF0C;&#x968F;&#x540E;&#x4F1A;&#x66F4;&#x65B0;&#x540E;&#x9762;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5171;&#x540C;&#x8FDB;&#x6B65;~</p><blockquote><ol><li><a href="https://segmentfault.com/a/1190000015440980">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x4E0E;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://segmentfault.com/a/1190000015562213" target="_blank">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x539F;&#x7406;</a></li><li><a href="https://segmentfault.com/a/1190000015698196">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6279;&#x91CF;&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x4E0E;nextTick&#x539F;&#x7406;</a></li></ol></blockquote><p>&#x7F51;&#x4E0A;&#x7684;&#x5E16;&#x5B50;&#x5927;&#x591A;&#x6DF1;&#x6D45;&#x4E0D;&#x4E00;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x4E9B;&#x524D;&#x540E;&#x77DB;&#x76FE;&#xFF0C;&#x5728;&#x4E0B;&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x662F;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6307;&#x51FA;~</p><blockquote><p>&#x53C2;&#x8003;&#xFF1A;</p><ol><li><a href="http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/" rel="nofollow noreferrer" target="_blank">Vue2.1.7&#x6E90;&#x7801;&#x5B66;&#x4E60;</a></li><li><a href="https://ustbhuangyi.github.io/vue-analysis" rel="nofollow noreferrer" target="_blank">Vue.js &#x6280;&#x672F;&#x63ED;&#x79D8;</a></li><li><a href="https://juejin.im/book/5a36661851882538e2259c0f/" rel="nofollow noreferrer" target="_blank">&#x5256;&#x6790; Vue.js &#x5185;&#x90E8;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js &#x6587;&#x6863;</a></li><li><a href="https://juejin.im/post/5adff30f518825672d33d596" rel="nofollow noreferrer" target="_blank">&#x3010;&#x5927;&#x578B;&#x5E72;&#x8D27;&#x3011;&#x624B;&#x62C9;&#x624B;&#x5E26;&#x4F60;&#x8FC7;&#x4E00;&#x904D;vue&#x90E8;&#x5206;&#x6E90;&#x7801;</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN - Object.defineProperty()</a></li></ol></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码阅读 - 文件结构与运行机制

## 原文链接
[https://segmentfault.com/a/1190000015440980](https://segmentfault.com/a/1190000015440980)

