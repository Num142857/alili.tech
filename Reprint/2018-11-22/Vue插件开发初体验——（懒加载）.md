---
title: 'Vue插件开发初体验——（懒加载）' 
date: 2018-11-22 11:48:10
hidden: true
slug: ofyvzpa3pd
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Vue&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x521D;&#x4F53;&#x9A8C;&#x2014;&#x2014;&#xFF08;&#x61D2;&#x52A0;&#x8F7D;&#xFF09;</h2><h3 id="articleHeader1">&#x524D;&#x8A00;</h3><blockquote>&#x95F2;&#x6765;&#x65E0;&#x4E8B;&#xFF0C;&#x60F3;&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Vue&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&#xFF0C;&#x80FD;&#x529B;&#x7684;&#x63D0;&#x5347;&#x6211;&#x89C9;&#x5F97;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7F16;&#x5199;&#x63D2;&#x4EF6;&#x5B9E;&#x73B0;&#xFF0C;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B;&#x5B98;&#x7F51;&#x7684;<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">Vue&#x63D2;&#x4EF6;</a>&#x7F16;&#x5199;&#x3002;&#x9A6C;&#x4E0A;&#x81EA;&#x5DF1;&#x72EC;&#x7ACB;&#x5F00;&#x59CB;&#x7F16;&#x5199;&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&#x3002;</blockquote><h2 id="articleHeader2">&#x4E00;&#x3001;&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x7531;&#x4E8E;&#x6211;&#x5728;&#x7F51;&#x4E0A;&#x770B;&#x4E86;&#x5F88;&#x591A;&#x5173;&#x4E8E;vue&#x63D2;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x53D1;&#x73B0;&#x51E0;&#x4E4E;&#x90FD;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x8BE6;&#x7EC6;&#x7684;&#x6559;&#x7A0B;&#xFF0C;&#x81EA;&#x5DF1;&#x7422;&#x78E8;&#x4E86;&#x534A;&#x5929;&#x4E5F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x8FDB;&#x6B65;&#x3002;&#x90FD;&#x662F;&#x5199;&#x7684;&#x6BD4;&#x8F83;&#x7CBE;&#x7B80;&#x3002;&#x7EC8;&#x4E8E;&#x72E0;&#x4E0B;&#x5FC3;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x81EA;&#x5DF1;&#x618B;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x51FA;&#x6765;&#x5427;w(&#xFF9F;&#x414;&#xFF9F;)w&#xFF01;&#x8FD9;&#x6B21;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x5E38;&#x7528;&#x63D2;&#x4EF6;&#x2014;&#x2014;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x6765;&#x4F53;&#x9A8C;&#x4E00;&#x4E0B;vue&#x7684;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x3002;</p><p>&#x840C;&#x65B0;&#x5C0F;&#x767D;&#xFF0C;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5165;&#x95E8;&#x4E00;&#x5E74;&#x4E0D;&#x5230;&#xFF0C;&#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#xFF0C;&#x7ED9;&#x6211;&#x63D0;&#x51FA;&#x6279;&#x8BC4;&#x610F;&#x89C1;&#x8C22;&#x8C22;&#xFF01;&#xFF01;</p><p>&#xFF08;<em>&#x539F;&#x521B;&#x6765;&#x6E90;<a href="http://www.tangyida.top/detail/149" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x535A;&#x5BA2;</a> &#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#xFF0C;GitHub&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/xdnloveme/vue-simple-lazyload" rel="nofollow noreferrer" target="_blank">vue-simple-lazyload</a>&#x4E0A;&#x9762;&#x662F;&#x6240;&#x6709;&#x6E90;&#x7801;&#xFF0C;&#x89C9;&#x5F97;&#x5BF9;&#x5199;&#x63D2;&#x4EF6;&#x6709;&#x5E2E;&#x52A9;&#x5C31;&#x70B9;&#x4E2A;star&#x5427;</em>&#xFF09;</p><h2 id="articleHeader3">&#x4E8C;&#x3001;&#x524D;&#x671F;&#x51C6;&#x5907;</h2><h4>2.1 &#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x6253;&#x5305;&#x5DE5;&#x5177;</h4><p>&#x5408;&#x9002;&#x7684;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x4E8B;&#x534A;&#x529F;&#x500D;&#x7684;&#x6548;&#x679C;&#x3002;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x7684;&#x9996;&#x9009;&#x6709;&#x4E24;&#x4E2A;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;webpack&#xFF0C;&#x4E00;&#x4E2A;&#x662F;rollup&#x3002;&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x6211;&#x4E3A;&#x4EC0;&#x4E48;&#x9009;&#x62E9;&#x4E86;rollup&#x3002;</p><p>&#x4F17;&#x6240;&#x5468;&#x77E5;&#xFF0C;webpack&#x662F;&#x4E00;&#x4E2A;&#x51E0;&#x4E4E;&#x56CA;&#x62EC;&#x4E86;&#x6240;&#x6709;<strong>&#x9759;&#x6001;&#x8D44;&#x6E90;</strong>&#xFF0C;&#x53EF;&#x4EE5;<strong>&#x52A8;&#x6001;&#x6309;&#x9700;&#x52A0;&#x8F7D;</strong>&#x7684;&#x4E00;&#x4E2A;&#x5305;&#x5DE5;&#x5177;&#x3002;&#x800C;rollup&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x6253;&#x5305;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x4E00;&#x4E2A;&#x5927;&#x5757;&#x590D;&#x6742;&#x7684;&#x4EE3;&#x7801;&#x62C6;&#x5206;&#x6210;&#x5404;&#x4E2A;&#x5C0F;&#x6A21;&#x5757;&#x3002;</p><p>&#x6DF1;&#x601D;&#x719F;&#x8651;&#x540E;&#xFF0C;&#x6211;&#x89C9;&#x5F97;webpack&#x4E5F;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#xFF0C;&#x4F46;&#x662F;&#x9996;&#x5148;&#xFF0C;&#x6709;&#x70B9;&#x201C;&#x6740;&#x9E21;&#x7109;&#x7528;&#x725B;&#x5200;&#x201D;&#x7684;&#x611F;&#x89C9;&#x3002;&#x800C;&#x6211;&#x7684;&#x8FD9;&#x4E2A;&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&#x5219;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x7ED9;&#x522B;&#x4EBA;&#x4F7F;&#x7528;&#xFF0C;&#x540C;&#x65F6;&#x53C8;&#x8981;&#x4FDD;&#x8BC1;&#x6574;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x201C;&#x8F7B;&#x91CF;&#x6027;&#x201D;&#xFF08;&#x6253;&#x5305;&#x5B8C;&#x5927;&#x6982;6KB&#xFF0C;&#x800C;webpack&#x5219;&#x6BD4;&#x8F83;&#x5927;&#xFF09;&#xFF0C;&#x4E0D;&#x559C;&#x6B22;&#x50CF;webpack&#x90A3;&#x6837;&#x5728;&#x8FD9;&#x63D2;&#x4EF6;&#x4E0A;&#x81C3;&#x80BF;&#x7684;&#x8868;&#x73B0;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x975E;&#x5E94;&#x7528;&#x7EA7;&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x6211;&#x6BD4;&#x8F83;&#x503E;&#x5411;&#x4E8E;&#x4F7F;&#x7528;rollup.js&#x3002;</p><h4>2.2 &#x786E;&#x8BA4;&#x9879;&#x76EE;&#x7ED3;&#x6784;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|&#x2014;&#x2014;package.json
|&#x2014;&#x2014;config
|    |&#x2014;&#x2014;rollup.config.js
|&#x2014;&#x2014;dist
|    |&#x2014;&#x2014;bundle.js
|&#x2014;&#x2014;src
|    |&#x2014;&#x2014;index.js
|    |&#x2014;&#x2014;directive.js
|    |&#x2014;&#x2014;mixin.js
|    |&#x2014;&#x2014;imagebox.js
|    |&#x2014;&#x2014;lazyload.js
|    |&#x2014;&#x2014;utils
|    |    |&#x2014;&#x2014;utils.js
|    |&#x2014;&#x2014;cores
|        |&#x2014;&#x2014;eventlistener.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">|&#x2014;&#x2014;package.json
|&#x2014;&#x2014;config
|    |&#x2014;&#x2014;rollup.config.js
|&#x2014;&#x2014;dist
|    |&#x2014;&#x2014;bundle.js
|&#x2014;&#x2014;src
|    |&#x2014;&#x2014;index.js
|    |&#x2014;&#x2014;directive.js
|    |&#x2014;&#x2014;mixin.js
|    |&#x2014;&#x2014;imagebox.js
|    |&#x2014;&#x2014;lazyload.js
|    |&#x2014;&#x2014;utils
|    |    |&#x2014;&#x2014;utils.js
|    |&#x2014;&#x2014;cores
|        |&#x2014;&#x2014;eventlistener.js</code></pre><p>config&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x653E;&#x7F6E;rollup&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;src&#x4E3A;&#x6E90;&#x6587;&#x4EF6;&#x5939;&#xFF0C;cores&#x4E0B;&#x9762;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x4E3A;&#x4E3B;&#x8981;&#x7684;&#x6A21;&#x5757;&#xFF0C;utils&#x4E3A;&#x5DE5;&#x5177;&#x7C7B;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x901A;&#x7528;&#x7684;&#x6A21;&#x5757;&#x65B9;&#x6CD5;&#x3002;&#x5927;&#x6982;&#x7684;&#x7ED3;&#x6784;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x3002;</p><h4>2.3 &#x8BBE;&#x8BA1;&#x601D;&#x8DEF;</h4><p>&#x597D;&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;&#x662F;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x7075;&#x9B42;&#xFF0C;&#x6211;&#x4EE5;&#x81EA;&#x5DF1;&#x4E0D;&#x5728;&#x9053;&#x4E0A;&#x7684;&#x8BBE;&#x8BA1;&#x80FD;&#x529B;&#xFF0C;&#x501F;&#x9274;&#x4E86;&#x8BB8;&#x591A;&#x5927;&#x795E;&#x7684;&#x601D;&#x60F3;&#xFF01;&#x5F88;&#x4E0D;&#x81EA;&#x4FE1;&#x5730;&#x8BBE;&#x8BA1;&#x4E86;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x63D2;&#x4EF6;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF0C;&#x89C1;&#x4E0B;&#xFF1A;</p><ul><li><strong>index.js</strong>&#xFF1A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x5165;&#x53E3;&#x603B;&#x6587;&#x4EF6;&#xFF0C;&#x4E3B;&#x8981;&#x4E3A;&#x4E86;&#x66B4;&#x9732;vue&#x63D2;&#x4EF6;&#x7684;<strong>install&#x65B9;&#x6CD5;</strong>&#xFF0C;&#x4F9B;&#x5916;&#x90E8;&#x8C03;&#x7528;&#x3002;</li><li><strong>directive.js</strong>&#xFF1A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;vue&#x6307;&#x4EE4;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x61D2;&#x52A0;&#x8F7D;&#x4E3B;&#x8981;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x5C31;&#x662F;<strong>&#x6307;&#x4EE4;</strong>&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;v-simple-lazy&#x6307;&#x4EE4;&#x903B;&#x8F91;&#x5199;&#x5230;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5185;&#x3002;</li><li><strong>mixin.js</strong>&#xFF1A;&#x6211;&#x4EEC;&#x7684;&#x6838;&#x5FC3;&#x9AA8;&#x6765;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x6DF7;&#x5408;&#xFF08;mixin&#xFF09;&#x5B9A;&#x4E49;&#x5728;vue&#x4E2D;&#x89E3;&#x91CA;&#x5F97;&#x6709;&#x70B9;&#x4E0D;&#x6E05;&#x695A;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x6211;&#x7406;&#x89E3;&#x80FD;&#x529B;&#x6709;&#x95EE;&#x9898;&#x5427;(&#xCA5;_&#xCA5;)&#x3002;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#xFF0C;&#x6DF7;&#x5408;&#x5C31;&#x662F;vue&#x7684;&#x4E00;&#x4E9B;&#x6027;&#x8D28;&#xFF08;&#x6BD4;&#x5982;&#x53CC;&#x7ED1;&#xFF09;&#x6309;&#x7167;&#x5B83;&#x7ED9;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x8DDF;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x4F60;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;&#xFF0C;&#x6DF7;&#x5165;&#x5230;vue&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5F53;&#x505A;vue&#x7684;$vm&#x5B9E;&#x4F8B;&#x7684;&#x53D8;&#x91CF;&#x6765;&#x7528;&#xFF0C;&#x540C;&#x65F6;&#x62E5;&#x6709;&#x4E86;&#x5B9E;&#x4F8B;&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x6027;&#x3002;</li></ul><p>&#x4E0A;&#x8FF0;&#x90FD;&#x662F;&#x5173;&#x4E8E;vue&#x63D2;&#x4EF6;&#x7684;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x8BF4;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E9B;&#xFF1A;</p><ul><li><strong>imagebox.js</strong>&#xFF08;&#x7C7B;&#xFF09;&#xFF1A;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x56FE;&#x50CF;&#x7684;&#x76D2;&#x5B50;&#xFF08;box&#xFF09;&#xFF0C;&#x7528;&#x6765;&#x5B58;&#x50A8;&#x4F60;&#x5B9A;&#x4E49;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x7684;&#x4E00;&#x4E9B;&#x9884;&#x52A0;&#x8F7D;&#x7684;&#x5730;&#x5740;&#x548C;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x8BBE;&#x8BA1;5&#x4E2A;&#x6570;&#x7EC4;&#x7528;&#x6765;&#x5B58;&#x653E;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;item&#xFF0C;itemAlready&#xFF0C;itemPending&#xFF0C;itemFailed&#xFF0C;itemAll&#xFF0C;&#x5206;&#x522B;&#x4F5C;&#x7528;&#x662F;&#xFF1A;<strong>&#x7528;&#x6765;&#x5B58;&#x653E;&#x5F53;&#x524D;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x5143;&#x7D20;</strong>&#xFF0C;<strong>&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x5143;&#x7D20;</strong>&#xFF0C;<strong>&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x4E2D;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x5143;&#x7D20;</strong>&#xFF0C;<strong>&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x5143;&#x7D20;</strong>&#xFF0C;<strong>&#x6240;&#x6709;&#x7ED1;&#x5B9A;&#x4E86;&#x6307;&#x4EE4;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x5143;&#x7D20;</strong>&#x3002;&#x539F;&#x7406;&#x6211;&#x4EEC;&#x4E0B;&#x9762;&#x4F1A;&#x8BF4;&#x3002;</li><li><strong>core&#x7684;eventlistener.js</strong>&#xFF08;&#x7C7B;&#xFF09;&#xFF1A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x4E3B;&#x8981;&#x5B58;&#x653E;&#x5F53;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#x3002;</li><li><strong>lazyload.js</strong>&#xFF1A;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x4E0D;&#x53D8;&#x7684;&#x91CF;&#xFF0C;&#x6BD4;&#x5982;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x9ED8;&#x8BA4;&#x5730;&#x5740;&#x7B49;&#x7B49;&#x3002;</li></ul><h4>2.4 &#x7F16;&#x5199;&#x601D;&#x8DEF;&#x548C;&#x539F;&#x7406;</h4><p>&#x539F;&#x7406;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x901A;&#x8FC7;&#x76D1;&#x542C;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#xFF0C;&#x6765;&#x4E0D;&#x505C;&#x5730;&#x904D;&#x5386;&#x4E0A;&#x8FF0;imagebox&#x91CC;&#x9762;&#x7684;item&#x6570;&#x7EC4;&#xFF08;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x5B58;&#x653E;&#x7740;&#x9700;&#x8981;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x9884;&#x52A0;&#x8F7D;&#x5730;&#x5740;&#xFF09;&#xFF0C;&#x5982;&#x679C;item&#x91CC;&#x9762;&#x6709;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x8FDB;&#x884C;&#x56FE;&#x7247;&#x7684;&#x8BF7;&#x6C42;&#x3002;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x52A0;&#x5165;&#x5230;itemPending&#x91CC;&#x9762;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#x5C31;&#x653E;&#x5230;itemAlready&#x91CC;&#x9762;&#xFF0C;&#x5931;&#x8D25;&#x7684;&#x653E;&#x5230;failed&#x91CC;&#x9762;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x57FA;&#x672C;&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x3002;</p><p>&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5148;&#x7CBE;&#x7B80;&#x5316;&#x3002;&#x5177;&#x4F53;&#x601D;&#x8DEF;&#x5982;&#x4E0B;&#xFF1A;</p><p>=&#x300B;<strong>&#x628A;&#x6240;&#x6709;&#x7528;&#x6307;&#x4EE4;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x6570;&#x7EC4;&#x521D;&#x59CB;&#x5316;</strong></p><p>=&#x300B;<strong>&#x76D1;&#x542C;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;</strong></p><p>=&#x300B;<strong>&#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x8FDB;&#x5165;&#x53EF;&#x89C6;&#x8303;&#x56F4;</strong></p><p>=&#x300B;<strong>&#x5982;&#x679C;&#x8FDB;&#x5165;&#x53EF;&#x89C6;&#x8303;&#x56F4;&#xFF0C;&#x8FDB;&#x884C;src&#x9884;&#x52A0;&#x8F7D;&#xFF08;&#x5B58;&#x5165;&#x7F13;&#x5B58;&#x6570;&#x7EC4;&#xFF09;</strong></p><p>=&#x300B;<strong>&#x5BF9;&#x4E8E;pending&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x8FDB;&#x884C;&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x8D4B;&#x503C;&#xFF0C;&#x5BF9;&#x4E8E;finsh&#x5B8C;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x52A0;&#x8F7D;&#x9884;&#x52A0;&#x8F7D;src&#x91CC;&#x9762;&#x7684;&#x503C;&#xFF0C;&#x5BF9;&#x4E8E;error&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x8FDB;&#x884C;&#x9519;&#x8BEF;&#x56FE;&#x7247;src&#x8D4B;&#x503C;</strong></p><h2 id="articleHeader4">&#x4E09;&#x3001;&#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x7684;&#x7F16;&#x5199;</h2><h4>3.1 &#x786E;&#x8BA4;&#x5165;&#x53E3;&#x6587;&#x4EF6;</h4><p><a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">Vue</a>&#x63D2;&#x4EF6;&#x91CC;&#x9762;&#x4ECB;&#x7ECD;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;
  Vue.myGlobalMethod = function () {
    // &#x903B;&#x8F91;...
  }

  // 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;
  Vue.directive(&apos;my-directive&apos;, {
    bind (el, binding, vnode, oldVnode) {
      // &#x903B;&#x8F91;...
    }
    ...
  })

  // 3. &#x6CE8;&#x5165;&#x7EC4;&#x4EF6;
  Vue.mixin({
    created: function () {
      // &#x903B;&#x8F91;...
    }
    ...
  })

  // 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;
  Vue.prototype.$myMethod = function (methodOptions) {
    // &#x903B;&#x8F91;...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
  <span class="hljs-comment">// 1. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
  }

  <span class="hljs-comment">// 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;</span>
  Vue.directive(<span class="hljs-string">&apos;my-directive&apos;</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
    }
    ...
  })

  <span class="hljs-comment">// 3. &#x6CE8;&#x5165;&#x7EC4;&#x4EF6;</span>
  Vue.mixin({
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
    }
    ...
  })

  <span class="hljs-comment">// 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">methodOptions</span>) </span>{
    <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
  }
}</code></pre><p>&#x5728;&#x5916;&#x9762;&#x66B4;&#x9732;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;install,&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x76F4;&#x63A5;Vue.use(&quot;&#x63D2;&#x4EF6;&#x540D;&#x79F0;&quot;)&#x76F4;&#x63A5;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x5728;install&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x586B;&#x5199;&#x5173;&#x4E8E;&#x6307;&#x4EE4;&#xFF08;directive&#xFF09;&#x548C;<a href="https://cn.vuejs.org/v2/guide/mixins.html" rel="nofollow noreferrer" target="_blank">&#x6DF7;&#x5408;</a>&#xFF08;mixin&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x5916;&#x516C;&#x5F00;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;option&#x6CA1;&#x586B;&#x5199;&#x7684;&#x8BDD;&#x5C31;&#x662F;&#x9ED8;&#x8BA4;&#x7A7A;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x6DF7;&#x5408;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x6DF7;&#x5165;vue&#x5185;&#x90E8;&#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x9664;&#x4E86;&#x4EE5;&#x4E0A;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x540E;&#x53C8;&#x53EF;&#x4EE5;&#x5728;<strong>&#x5168;&#x5C40;&#x4F7F;&#x7528;</strong>&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><h4>3.2 &#x5148;&#x7F16;&#x5199;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h4><p>&#x5DE5;&#x6B32;&#x5584;&#x5176;&#x4E8B;&#x5FC5;&#x5148;&#x5229;&#x5176;&#x5668;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x7F16;&#x5199;rollup&#x7684;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#xFF08;&#x8FD9;&#x91CC;&#x505A;&#x4E86;&#x7CBE;&#x7B80;&#xFF0C;&#x590D;&#x6742;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x7167;&#x6211;&#x7684;github&#x7A0B;&#x5E8F;&#xFF09;&#x3002;</p><p>rollup.config.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import buble from &apos;rollup-plugin-buble&apos;;
import babel from &apos;rollup-plugin-babel&apos;;
import resolve from &apos;rollup-plugin-node-resolve&apos;;
import commonjs from &apos;rollup-plugin-commonjs&apos;;

export default {
  input: &apos;src/index.js&apos;,//&#x5165;&#x53E3;
  output: {
    file: &apos;dist/bundle.js&apos;,//&#x8F93;&#x51FA;&#x7684;&#x51FA;&#x53E3;
    format: &apos;umd&apos;,//&#x683C;&#x5F0F;&#xFF1A;&#x76F8;&#x4F3C;&#x7684;&#x8FD8;&#x6709;cjs&#xFF0C;amd&#xFF0C;iife&#x7B49;
  },
  moduleName: &apos;LazyLoad&apos;,//&#x6253;&#x5305;&#x7684;&#x6A21;&#x5757;&#x540D;&#x79F0;&#xFF0C;&#x53EF;&#x4EE5;&#x518D;Vue.use()&#x65B9;&#x6CD5;&#x4F7F;&#x7528;
  plugins:[
      resolve(),
      commonjs(),//&#x652F;&#x6301;commonJS
      buble(),
      babel({//&#x5173;&#x4E8E;ES6
          exclude: &apos;node_modules/**&apos; // &#x53EA;&#x7F16;&#x8BD1;&#x6211;&#x4EEC;&#x7684;&#x6E90;&#x4EE3;&#x7801;
      })
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> buble <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rollup-plugin-buble&apos;</span>;
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rollup-plugin-babel&apos;</span>;
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rollup-plugin-node-resolve&apos;</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;rollup-plugin-commonjs&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">input</span>: <span class="hljs-string">&apos;src/index.js&apos;</span>,<span class="hljs-comment">//&#x5165;&#x53E3;</span>
  output: {
    <span class="hljs-attr">file</span>: <span class="hljs-string">&apos;dist/bundle.js&apos;</span>,<span class="hljs-comment">//&#x8F93;&#x51FA;&#x7684;&#x51FA;&#x53E3;</span>
    format: <span class="hljs-string">&apos;umd&apos;</span>,<span class="hljs-comment">//&#x683C;&#x5F0F;&#xFF1A;&#x76F8;&#x4F3C;&#x7684;&#x8FD8;&#x6709;cjs&#xFF0C;amd&#xFF0C;iife&#x7B49;</span>
  },
  <span class="hljs-attr">moduleName</span>: <span class="hljs-string">&apos;LazyLoad&apos;</span>,<span class="hljs-comment">//&#x6253;&#x5305;&#x7684;&#x6A21;&#x5757;&#x540D;&#x79F0;&#xFF0C;&#x53EF;&#x4EE5;&#x518D;Vue.use()&#x65B9;&#x6CD5;&#x4F7F;&#x7528;</span>
  plugins:[
      resolve(),
      commonjs(),<span class="hljs-comment">//&#x652F;&#x6301;commonJS</span>
      buble(),
      babel({<span class="hljs-comment">//&#x5173;&#x4E8E;ES6</span>
          exclude: <span class="hljs-string">&apos;node_modules/**&apos;</span> <span class="hljs-comment">// &#x53EA;&#x7F16;&#x8BD1;&#x6211;&#x4EEC;&#x7684;&#x6E90;&#x4EE3;&#x7801;</span>
      })
  ]
};</code></pre><p>package.json</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;lazyload&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;vue&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;main&quot;: &quot;rollup -c config/rollup.config.js&quot;,
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;TangHy&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;dependencies&quot;: {
    &quot;path&quot;: &quot;^0.12.7&quot;,
    &quot;rollup&quot;: &quot;^0.57.1&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.4&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.1&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;,
    &quot;rollup-plugin-babel&quot;: &quot;^3.0.3&quot;,
    &quot;rollup-plugin-buble&quot;: &quot;^0.19.2&quot;,
    &quot;rollup-plugin-commonjs&quot;: &quot;^9.1.0&quot;,
    &quot;rollup-plugin-node-resolve&quot;: &quot;^3.3.0&quot;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;lazyload&quot;</span>,
  <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;vue&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&quot;</span>,
  <span class="hljs-string">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;main&quot;</span>: <span class="hljs-string">&quot;rollup -c config/rollup.config.js&quot;</span>,
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;</span>
  },
  <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;TangHy&quot;</span>,
  <span class="hljs-string">&quot;license&quot;</span>: <span class="hljs-string">&quot;MIT&quot;</span>,
  <span class="hljs-string">&quot;dependencies&quot;</span>: {
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;^0.12.7&quot;</span>,
    <span class="hljs-string">&quot;rollup&quot;</span>: <span class="hljs-string">&quot;^0.57.1&quot;</span>
  },
  <span class="hljs-string">&quot;devDependencies&quot;</span>: {
    <span class="hljs-string">&quot;babel-core&quot;</span>: <span class="hljs-string">&quot;^6.26.0&quot;</span>,
    <span class="hljs-string">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^7.1.4&quot;</span>,
    <span class="hljs-string">&quot;babel-preset-env&quot;</span>: <span class="hljs-string">&quot;^1.6.1&quot;</span>,
    <span class="hljs-string">&quot;babel-preset-react&quot;</span>: <span class="hljs-string">&quot;^6.24.1&quot;</span>,
    <span class="hljs-string">&quot;rollup-plugin-babel&quot;</span>: <span class="hljs-string">&quot;^3.0.3&quot;</span>,
    <span class="hljs-string">&quot;rollup-plugin-buble&quot;</span>: <span class="hljs-string">&quot;^0.19.2&quot;</span>,
    <span class="hljs-string">&quot;rollup-plugin-commonjs&quot;</span>: <span class="hljs-string">&quot;^9.1.0&quot;</span>,
    <span class="hljs-string">&quot;rollup-plugin-node-resolve&quot;</span>: <span class="hljs-string">&quot;^3.3.0&quot;</span>
  }
}
</code></pre><p>&#x6CE8;&#x610F;&#x5176;&#x4E2D;&#x7684;&#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rollup -c config/rollup.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">rollup -c config/rollup.config.js</code></pre><p>&#x540E;&#x9762;&#x7684;config/...&#x662F;&#x8DEF;&#x5F84;&#xFF0C;&#x8FD9;&#x91CC;&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run main" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm run main</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x6253;&#x5305;&#x4E86;&#x3002;</p><p>&#x5173;&#x4E8E;rollup&#x4E0D;&#x61C2;&#x7684;&#x5730;&#x65B9;&#x6216;&#x8005;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x6709;&#x4E00;&#x7BC7;&#x535A;&#x6587;&#x4E5F;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E86;<a href="http://www.tangyida.top/detail/151" rel="nofollow noreferrer" target="_blank">&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x5B66;&#x4E60;Rollup.js&#x7684;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x5229;&#x5668;</a></p><h4>3.3 &#x7F16;&#x5199;&#x4E3B;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;</h4><h5>3.3.1 directive.js</h5><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x5148;&#x753B;&#x597D;&#x96CF;&#x5F62;&#xFF0C;&#x5982;&#x4F55;&#x5C06;eventlistener&#x6587;&#x4EF6;&#x548C;directive&#x8054;&#x7CFB;&#x5728;&#x4E00;&#x8D77;&#xFF1F;</p><p>&#x7B2C;&#x4E00;&#x6B65;&#x9996;&#x5148;&#x80AF;&#x5B9A;&#x662F;&#x5F15;&#x7528;eventlistener&#xFF0C;&#x540C;&#x65F6;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x53EA;&#x8981;&#x6307;&#x4EE4;&#x6BCF;&#x6B21;inserted&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x65B0;new&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x628A;&#x80FD;&#x4F20;&#x7684;&#x503C;&#x90FD;&#x4F20;&#x8FC7;&#x53BB;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import eventlistener from &apos;./cores/eventlistener&apos;

var listener = null;

export default {

    inserted: function (el,binding, vnode, oldVnode) {
        var EventListener = new eventlistener(el,binding, vnode);//&#x8FD9;&#x91CC;&#x6211;&#x4EEC;new&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x628A;el(&#x5143;&#x7D20;)&#xFF0C;binding(&#x7ED1;&#x5B9A;&#x7684;&#x503C;)&#xFF0C;vnode(&#x865A;&#x62DF;node)&#x90FD;&#x4F20;&#x8FC7;&#x53BB;
        listener = EventListener;
        EventListener.init();//&#x5047;&#x8BBE;&#x6709;&#x4E00;&#x4E2A;init&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;
        EventListener.startListen();//&#x8FD9;&#x91CC;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x8FDB;&#x884C;&#x76D1;&#x542C;
  },
    update: function(el,{name,value,oldValue,expression}, vnode, oldVnode){

    },
    unbind: function(){

    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> eventlistener <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./cores/eventlistener&apos;</span>

<span class="hljs-keyword">var</span> listener = <span class="hljs-literal">null</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

    <span class="hljs-attr">inserted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el,binding, vnode, oldVnode</span>) </span>{
        <span class="hljs-keyword">var</span> EventListener = <span class="hljs-keyword">new</span> eventlistener(el,binding, vnode);<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x6211;&#x4EEC;new&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x628A;el(&#x5143;&#x7D20;)&#xFF0C;binding(&#x7ED1;&#x5B9A;&#x7684;&#x503C;)&#xFF0C;vnode(&#x865A;&#x62DF;node)&#x90FD;&#x4F20;&#x8FC7;&#x53BB;</span>
        listener = EventListener;
        EventListener.init();<span class="hljs-comment">//&#x5047;&#x8BBE;&#x6709;&#x4E00;&#x4E2A;init&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;</span>
        EventListener.startListen();<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x8FDB;&#x884C;&#x76D1;&#x542C;</span>
  },
    <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,{name,value,oldValue,expression}, vnode, oldVnode</span>)</span>{

    },
    <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    }
    
}</code></pre><p>&#x5176;&#x6B21;&#x6211;&#x4EEC;&#x8981;&#x8003;&#x8651;&#x5728;update&#x94A9;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5E72;&#x4EC0;&#x4E48;&#xFF1F;</p><p>&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x79CD;&#x4E1A;&#x52A1;&#xFF1A;&#x5F53;&#x4F60;&#x4E00;&#x6B21;&#x6027;&#x7ED1;&#x5B9A;&#x5B8C;&#x6240;&#x6709;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x56FE;&#x7247;&#x5DF2;&#x7ECF;&#x9884;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x518D;&#x600E;&#x4E48;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x6307;&#x4EE4;&#x7ED1;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x90FD;&#x4E0D;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x5237;&#x65B0;&#x56FE;&#x7247;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;update&#x66F4;&#x65B0;&#x65B0;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x662F;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x3002;&#x540C;&#x65F6;&#x89E3;&#x7ED1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53D6;&#x6D88;&#x7ED1;&#x5B9A;&#x4E5F;&#x662F;&#x6709;&#x5FC5;&#x8981;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import eventlistener from &apos;./cores/eventlistener&apos;

var listener = null;

export default {

    inserted: function (el,binding, vnode, oldVnode) {
        var EventListener = new eventlistener(el,binding, vnode);//&#x8FD9;&#x91CC;&#x6211;&#x4EEC;new&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x628A;el(&#x5143;&#x7D20;)&#xFF0C;binding(&#x7ED1;&#x5B9A;&#x7684;&#x503C;)&#xFF0C;vnode(&#x865A;&#x62DF;node)&#x90FD;&#x4F20;&#x8FC7;&#x53BB;
        listener = EventListener;
        EventListener.init();//&#x5047;&#x8BBE;&#x6709;&#x4E00;&#x4E2A;init&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;
        EventListener.startListen();//&#x8FD9;&#x91CC;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x8FDB;&#x884C;&#x76D1;&#x542C;
  },
    update: function(el,{name,value,oldValue,expression}, vnode, oldVnode){
        if(value === oldValue){//&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x5C31;&#x8FD4;&#x56DE;
            return;
        }
        listener.update(el,value);//&#x6709;&#x53D8;&#x5316;&#x5C31;&#x8FDB;&#x884C;&#x66F4;&#x65B0;(&#x5047;&#x8BBE;&#x6709;update&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;)
    },
    unbind: function(){
        listener.removeListen();//&#x89E3;&#x7ED1;&#x79FB;&#x9664;&#x76D1;&#x542C;
    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> eventlistener <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./cores/eventlistener&apos;</span>

<span class="hljs-keyword">var</span> listener = <span class="hljs-literal">null</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

    <span class="hljs-attr">inserted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el,binding, vnode, oldVnode</span>) </span>{
        <span class="hljs-keyword">var</span> EventListener = <span class="hljs-keyword">new</span> eventlistener(el,binding, vnode);<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x6211;&#x4EEC;new&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x628A;el(&#x5143;&#x7D20;)&#xFF0C;binding(&#x7ED1;&#x5B9A;&#x7684;&#x503C;)&#xFF0C;vnode(&#x865A;&#x62DF;node)&#x90FD;&#x4F20;&#x8FC7;&#x53BB;</span>
        listener = EventListener;
        EventListener.init();<span class="hljs-comment">//&#x5047;&#x8BBE;&#x6709;&#x4E00;&#x4E2A;init&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;</span>
        EventListener.startListen();<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x8FDB;&#x884C;&#x76D1;&#x542C;</span>
  },
    <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,{name,value,oldValue,expression}, vnode, oldVnode</span>)</span>{
        <span class="hljs-keyword">if</span>(value === oldValue){<span class="hljs-comment">//&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x5C31;&#x8FD4;&#x56DE;</span>
            <span class="hljs-keyword">return</span>;
        }
        listener.update(el,value);<span class="hljs-comment">//&#x6709;&#x53D8;&#x5316;&#x5C31;&#x8FDB;&#x884C;&#x66F4;&#x65B0;(&#x5047;&#x8BBE;&#x6709;update&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;)</span>
    },
    <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        listener.removeListen();<span class="hljs-comment">//&#x89E3;&#x7ED1;&#x79FB;&#x9664;&#x76D1;&#x542C;</span>
    }
    
}</code></pre><p>&#x5148;&#x5199;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;inserted&#x7684;&#x65F6;&#x5019;&#x7ED1;&#x5B9A;&#x76D1;&#x542C;&#x3002;&#x52A0;&#x5165;&#x7684;&#x65F6;&#x5019;new&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5BF9;&#x8C61;&#x4FDD;&#x5B58;&#x6240;&#x6709;&#x5305;&#x62EC;&#x6240;&#x6709;dom&#x7684;&#x3002;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x770B;&#x3002;</p><h4>3.4 &#x6838;&#x5FC3;&#x4EE3;&#x7801;</h4><h5>3.4.1 imagebox.js&#x7C7B;</h5><p>&#x9996;&#x5148;&#x5148;&#x628A;&#x4E4B;&#x524D;&#x8BF4;&#x5230;&#x7684;&#x51E0;&#x4E2A;&#x6570;&#x7EC4;&#x90FD;&#x521D;&#x59CB;&#x5316;&#x4E86;&#x3002;&#x90A3;&#x4E48;&#x4F5C;&#x4E3A;&#x56FE;&#x50CF;&#x76D2;&#x5B50;&#xFF08;imagebox&#xFF09;&#x7684;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x54EA;&#x4E9B;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#x5462;&#xFF1F;</p><p>&#x9996;&#x5148;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x7684;add&#x65B9;&#x6CD5;&#x80AF;&#x5B9A;&#x8981;&#xFF0C;&#x9700;&#x8981;&#x5224;&#x65AD;&#x4E00;&#x4E0B;&#x662F;&#x5426;&#x6709;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x5C31;&#x52A0;&#x5165;&#x5230;item&#x91CC;&#x9762;&#x53BB;&#x3002;&#x540C;&#x65F6;&#x7C7B;&#x4F3C;&#x7684;&#x8FD8;&#x6709;addFailed&#xFF0C;addPending&#x7B49;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x5982;&#x679C;item&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x52A0;&#x8F7D;&#x5B8C;&#x4E86;,&#x90A3;&#x4E48;&#x968F;&#x4E4B;&#x800C;&#x6765;&#x7684;&#x5C31;&#x9700;&#x8981;&#x5220;&#x9664;item&#x4E2D;&#x7684;&#x5143;&#x7D20;,&#x90A3;&#x4E48;&#x5BF9;&#x5E94;&#x7684;remove&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x7684;,&#x540C;&#x65F6;&#x7C7B;&#x4F3C;&#x7684;&#x8FD8;&#x6709;removePending&#x7B49;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class ImageBox {
  constructor() {
    this.eleAll = [];
    this.item = [];
    this.itemAlready = [];
    this.itemPending = [];
    this.itemFailed = [];
  }

  add(ele,src) {//insert&#x63D2;&#x5165;&#x7684;&#x65F6;&#x5019;&#x628A;&#x6240;&#x6709;&#x7684;dom&#x52A0;&#x5165;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x53BB;&#x521D;&#x59CB;&#x5316;
      const index = this.itemAlready.findIndex((_item)=&gt;{
          return _item.ele === ele;
      })
      if(index === -1){
          this.item.push({
            ele:ele,
            src:src
        })
      }
  }
    
  addPending(ele,src){
      this._addPending(ele,src);
      this._remove(ele);
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ImageBox</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.eleAll = [];
    <span class="hljs-keyword">this</span>.item = [];
    <span class="hljs-keyword">this</span>.itemAlready = [];
    <span class="hljs-keyword">this</span>.itemPending = [];
    <span class="hljs-keyword">this</span>.itemFailed = [];
  }

  add(ele,src) {<span class="hljs-comment">//insert&#x63D2;&#x5165;&#x7684;&#x65F6;&#x5019;&#x628A;&#x6240;&#x6709;&#x7684;dom&#x52A0;&#x5165;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x53BB;&#x521D;&#x59CB;&#x5316;</span>
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      })
      <span class="hljs-keyword">if</span>(index === <span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.item.push({
            <span class="hljs-attr">ele</span>:ele,
            <span class="hljs-attr">src</span>:src
        })
      }
  }
    
  addPending(ele,src){
      <span class="hljs-keyword">this</span>._addPending(ele,src);
      <span class="hljs-keyword">this</span>._remove(ele);
  }
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x662F;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#x7684;box&#xFF0C;&#x7528;&#x4E8E;&#x5B58;&#x53D6;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x5019;&#xFF0C;image&#x56FE;&#x7247;&#x5BF9;&#x8C61;&#x7684;box&#x5B58;&#x53D6;&#x3002;&#x4E3B;&#x8981;&#x601D;&#x8DEF;&#x662F;&#x5206;&#x4E86;&#x4E09;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;<strong>&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x6240;&#x6709;&#x7684;&#x56FE;&#x7247;</strong>&#xFF0C;<strong>&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;</strong>&#xFF0C;<strong>&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x7684;&#x56FE;&#x7247;</strong>&#xFF0C;&#x7136;&#x540E;&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF01;&#xFF01;&#xFF01;</p><p><strong>&#x628A;&#x8FD9;&#x4E2A;imagebox&#x8981;&#x6DF7;&#x5165;&#x5230;&#x5168;&#x5C40;&#xFF0C;&#x4F7F;&#x5176;&#x53EF;&#x4EE5;&#x5F53;&#x505A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x5728;&#x5168;&#x5C40;&#x4F7F;&#x7528;</strong>&#x3002;</p><h5>mixin.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import imagebox from &apos;./imagebox&apos;

const mixin = {
    data () {
      return {
          imagebox: new imagebox()//&#x8FD9;&#x91CC;&#x58F0;&#x660E;&#x4E00;&#x4E2A;new&#x5BF9;&#x8C61;&#xFF0C;&#x5B58;&#x5728;&#x5168;&#x5C40;&#x7684;&#x53D8;&#x91CF;&#x4E2D;&#xFF0C;&#x6DF7;&#x5165;vue&#x5185;&#x90E8;&#xFF0C;&#x53EF;&#x4EE5;&#x5168;&#x5C40;&#x4F7F;&#x7528;
      }
  }
}

export default mixin;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> imagebox <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./imagebox&apos;</span>

<span class="hljs-keyword">const</span> mixin = {
    data () {
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">imagebox</span>: <span class="hljs-keyword">new</span> imagebox()<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x58F0;&#x660E;&#x4E00;&#x4E2A;new&#x5BF9;&#x8C61;&#xFF0C;&#x5B58;&#x5728;&#x5168;&#x5C40;&#x7684;&#x53D8;&#x91CF;&#x4E2D;&#xFF0C;&#x6DF7;&#x5165;vue&#x5185;&#x90E8;&#xFF0C;&#x53EF;&#x4EE5;&#x5168;&#x5C40;&#x4F7F;&#x7528;</span>
      }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mixin;</code></pre><p>&#x4E0B;&#x6240;&#x793A;&#x4EE3;&#x7801;&#x4E2D;&#xFF1A;</p><ol><li>&#x6784;&#x9020;&#x5668;&#x4E2D;&#x521D;&#x59CB;&#x5316;&#x5404;&#x79CD;&#x5143;&#x7D20;&#x6570;&#x7EC4;&#xFF0C;&#x5305;&#x62EC;&#x6240;&#x6709;&#x56FE;&#x7247;&#xFF0C;&#x5DF2;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x6B63;&#x5728;&#x8BF7;&#x6C42;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x5931;&#x8D25;&#x7684;&#x56FE;&#x7247;&#x7B49;&#x7B49;</li><li>add&#x65B9;&#x6CD5;&#x662F;&#x5728;item&#x6570;&#x7EC4;&#x4E2D;&#x6DFB;&#x52A0;&#x56FE;&#x7247;&#x5143;&#x7D20;</li><li>addPending&#x662F;&#x5728;&#x6B63;&#x5728;&#x8BF7;&#x6C42;&#x7684;&#x56FE;&#x7247;&#x6570;&#x7EC4;&#x4E2D;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7C7B;&#x4F3C;&#x7684;&#x8FD8;&#x6709;addFailed&#xFF0C;addAlready&#xFF0C;_remove&#x7B49;&#x79C1;&#x6709;&#x548C;&#x5171;&#x6709;&#x65B9;&#x6CD5;</li><li>util&#x662F;&#x5404;&#x79CD;&#x5DE5;&#x5177;&#x7C7B;&#x65B9;&#x6CD5;&#xFF0C;&#x5305;&#x62EC;&#x5224;&#x65AD;&#x56FE;&#x7247;&#x662F;&#x5426;&#x8FDB;&#x5165;&#x89C6;&#x91CE;</li></ol><p>&#x6839;&#x636E;&#x4E0A;&#x8FF0;&#x601D;&#x8DEF;&#xFF0C;&#x5B8C;&#x6210;&#x4E0B;&#x5217;&#x4EE3;&#x7801;&#xFF1A;</p><p>&#xFF08;&#x8865;&#x5145;&#xFF1A;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;update&#x65B9;&#x6CD5;&#xFF0C;&#x601D;&#x8DEF;&#x662F;&#x66F4;&#x65B0;&#x4E86;&#x540E;&#xFF0C;&#x8FDB;&#x884C;&#x6240;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x904D;&#x5386;&#xFF0C;&#x627E;&#x5230;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;src&#x5C31;&#x662F;&#x5176;&#x503C;&#x7684;&#x66F4;&#x65B0;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class ImageBox {
  constructor() {
    this.eleAll = [];
    this.item = [];
    this.itemAlready = [];
    this.itemPending = [];
    this.itemFailed = [];
  }

  add(ele,src) {
      const index = this.itemAlready.findIndex((_item)=&gt;{
          return _item.ele === ele;
      })
      if(index === -1){
          this.item.push({
            ele:ele,
            src:src
        })
      }
  }

  update(ele,src){
    let index = this.itemAlready.findIndex(item=&gt;{
      return item.ele === ele;
    });

    if(index != -1){
      this.itemAlready.splice(index,1);
      this.add(ele,src);
      return;
    };

    let _index = this.itemFailed.findIndex(item=&gt;{
      return item.ele === ele;
    });

    if(_index !=-1){
      this.itemFailed.splice(_index,1);
      this.add(ele,src);
      return;
    };

  }

  addFailed(ele,src){
      this._addFailed(ele,src);
      this._removeFromPending(ele);
  }

  addPending(ele,src){
      this._addPending(ele,src);
      this._remove(ele);
  }

  addAlready(ele,src){
      this._addAlready(ele,src);
      this._removeFromPending(ele);
  }

  _addAlready(ele,src) {
      const index = this.itemAlready.findIndex((_item)=&gt;{
          return _item.ele === ele;
      })
      if(index === -1){
          this.itemAlready.push({
            ele:ele,
            src:src
        })
      }
  }

  _addPending(ele,src) {
      const index = this.itemPending.findIndex((_item)=&gt;{
          return _item.ele === ele;
      })
      if(index === -1){
          this.itemPending.push({
            ele:ele,
            src:src
        })
      }
  }

  _addFailed(ele,src) {
      const index = this.itemFailed.findIndex((_item)=&gt;{
          return _item.ele === ele;
      })
      if(index === -1){
          this.itemFailed.push({
            ele:ele,
            src:src
        })
      }
  }

  _remove(ele) {
      const index = this.item.findIndex((_item)=&gt;{
          return _item.ele === ele;
      });
      if(index!=-1){
          this.item.splice(index,1);
      }
  }

  _removeFromPending(ele) {
      const index = this.itemPending.findIndex((_item)=&gt;{
          return _item.ele === ele;
      });
      if(index!=-1){
          this.itemPending.splice(index,1);
      }
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ImageBox</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.eleAll = [];
    <span class="hljs-keyword">this</span>.item = [];
    <span class="hljs-keyword">this</span>.itemAlready = [];
    <span class="hljs-keyword">this</span>.itemPending = [];
    <span class="hljs-keyword">this</span>.itemFailed = [];
  }

  add(ele,src) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      })
      <span class="hljs-keyword">if</span>(index === <span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.item.push({
            <span class="hljs-attr">ele</span>:ele,
            <span class="hljs-attr">src</span>:src
        })
      }
  }

  update(ele,src){
    <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{
      <span class="hljs-keyword">return</span> item.ele === ele;
    });

    <span class="hljs-keyword">if</span>(index != <span class="hljs-number">-1</span>){
      <span class="hljs-keyword">this</span>.itemAlready.splice(index,<span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.add(ele,src);
      <span class="hljs-keyword">return</span>;
    };

    <span class="hljs-keyword">let</span> _index = <span class="hljs-keyword">this</span>.itemFailed.findIndex(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span>{
      <span class="hljs-keyword">return</span> item.ele === ele;
    });

    <span class="hljs-keyword">if</span>(_index !=<span class="hljs-number">-1</span>){
      <span class="hljs-keyword">this</span>.itemFailed.splice(_index,<span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.add(ele,src);
      <span class="hljs-keyword">return</span>;
    };

  }

  addFailed(ele,src){
      <span class="hljs-keyword">this</span>._addFailed(ele,src);
      <span class="hljs-keyword">this</span>._removeFromPending(ele);
  }

  addPending(ele,src){
      <span class="hljs-keyword">this</span>._addPending(ele,src);
      <span class="hljs-keyword">this</span>._remove(ele);
  }

  addAlready(ele,src){
      <span class="hljs-keyword">this</span>._addAlready(ele,src);
      <span class="hljs-keyword">this</span>._removeFromPending(ele);
  }

  _addAlready(ele,src) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      })
      <span class="hljs-keyword">if</span>(index === <span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.itemAlready.push({
            <span class="hljs-attr">ele</span>:ele,
            <span class="hljs-attr">src</span>:src
        })
      }
  }

  _addPending(ele,src) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemPending.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      })
      <span class="hljs-keyword">if</span>(index === <span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.itemPending.push({
            <span class="hljs-attr">ele</span>:ele,
            <span class="hljs-attr">src</span>:src
        })
      }
  }

  _addFailed(ele,src) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemFailed.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      })
      <span class="hljs-keyword">if</span>(index === <span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.itemFailed.push({
            <span class="hljs-attr">ele</span>:ele,
            <span class="hljs-attr">src</span>:src
        })
      }
  }

  _remove(ele) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.item.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      });
      <span class="hljs-keyword">if</span>(index!=<span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.item.splice(index,<span class="hljs-number">1</span>);
      }
  }

  _removeFromPending(ele) {
      <span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.itemPending.findIndex(<span class="hljs-function">(<span class="hljs-params">_item</span>)=&gt;</span>{
          <span class="hljs-keyword">return</span> _item.ele === ele;
      });
      <span class="hljs-keyword">if</span>(index!=<span class="hljs-number">-1</span>){
          <span class="hljs-keyword">this</span>.itemPending.splice(index,<span class="hljs-number">1</span>);
      }
  }
}
</code></pre><h5>3.4.2 utils.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isSeen = function(item,imagebox){
  var ele = item.ele;
  var src = item.src;
  //&#x56FE;&#x7247;&#x8DDD;&#x79BB;&#x9875;&#x9762;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
  var top = ele.getBoundingClientRect().top;
  //&#x9875;&#x9762;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;&#x9AD8;&#x5EA6;
  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //top + 10 &#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x4E86;&#x53EF;&#x89C6;&#x533A;&#x57DF;10&#x50CF;&#x7D20;
  if(top + 10 &lt; windowHeight){
      return true;
  }else{
      return false;
  }
}

export {
  isSeen
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> isSeen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item,imagebox</span>)</span>{
  <span class="hljs-keyword">var</span> ele = item.ele;
  <span class="hljs-keyword">var</span> src = item.src;
  <span class="hljs-comment">//&#x56FE;&#x7247;&#x8DDD;&#x79BB;&#x9875;&#x9762;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;</span>
  <span class="hljs-keyword">var</span> top = ele.getBoundingClientRect().top;
  <span class="hljs-comment">//&#x9875;&#x9762;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;&#x9AD8;&#x5EA6;</span>
  <span class="hljs-keyword">var</span> windowHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight;
  <span class="hljs-comment">//top + 10 &#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x4E86;&#x53EF;&#x89C6;&#x533A;&#x57DF;10&#x50CF;&#x7D20;</span>
  <span class="hljs-keyword">if</span>(top + <span class="hljs-number">10</span> &lt; windowHeight){
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}

<span class="hljs-keyword">export</span> {
  isSeen
};</code></pre><h5>3.4.3 eventlistener.js</h5><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x662F;&#x76D1;&#x542C;&#x7684;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#xFF0C;&#x90A3;&#x4E48;&#x80AF;&#x5B9A;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x9996;&#x5148;el&#x5143;&#x7D20;&#x80AF;&#x5B9A;&#x9700;&#x8981;&#xFF0C;binding&#xFF0C;vnode&#xFF0C;$vm&#x80AF;&#x5B9A;&#x90FD;&#x5148;&#x5199;&#x8FDB;&#x6765;&#x3002;</p><p>&#x5176;&#x6B21;imagebox&#x80AF;&#x5B9A;&#x4E5F;&#x9700;&#x8981;&#xFF0C;&#x662F;&#x56FE;&#x7247;&#x7684;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x3002;</p><p>init&#x7684;&#x65B9;&#x6CD5;&#x8FD9;&#x91CC;&#x548C;imagebox&#x4E2D;&#x7684;add&#x65B9;&#x6CD5;&#x8054;&#x7CFB;&#x8D77;&#x6765;&#xFF0C;init&#x4E00;&#x4E2A;&#x5C31;&#x52A0;&#x5165;imagebox&#x4E2D;&#x7684;item&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5143;&#x7D20;&#x3002;</p><p>startListen&#x65B9;&#x6CD5;&#x662F;&#x7528;&#x4E8E;&#x5728;&#x76D1;&#x542C;&#x540E;&#x8FDB;&#x884C;&#x903B;&#x8F91;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {isSeen} from &apos;../utils/utils&apos;//&#x5F15;&#x5165;&#x5DE5;&#x5177;&#x7C7B;&#x7684;&#x91CC;&#x9762;&#x7684;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;&#x5143;&#x7D20;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5224;&#x65AD;

export default class EventListener {
  constructor(el,binding,vnode) {
    this.el = el;//&#x521D;&#x59CB;&#x5316;&#x5404;&#x79CD;&#x9700;&#x8981;&#x7684;&#x5C5E;&#x6027;
    this.binding = binding;
    this.vnode = vnode;
    this.imagebox = null;
    this.$vm = vnode.context;
    this.$lazyload = vnode.context.$lazyload//&#x6DF7;&#x5408;mixin&#x8FDB;&#x53BB;&#x7684;&#x9009;&#x9879;
  }

  init(){
      if(!typeof this.binding.value === &apos;string&apos;){
      throw new Error(&quot;&#x60A8;&#x7684;&#x56FE;&#x7247;&#x6E90;&#x4E0D;&#x662F;String&#x7C7B;&#x578B;&#xFF0C;&#x8BF7;&#x91CD;&#x8BD5;&quot;);
      return;
    }
      this.imagebox = this.vnode.context.imagebox;
    this.imagebox.add(this.el,this.binding.value);//&#x6BCF;&#x6709;&#x4E00;&#x4E2A;item&#xFF0C;&#x5C31;&#x5F80;box&#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5143;&#x7D20;
    this.listenProcess();
  }

  startListen(){
      const _self = this;
      document.addEventListener(&apos;scroll&apos;,(e)=&gt;{
          _self.listenProcess(e);//&#x8FD9;&#x91CC;&#x5F00;&#x59CB;&#x64CD;&#x4F5C;
      })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {isSeen} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../utils/utils&apos;</span><span class="hljs-comment">//&#x5F15;&#x5165;&#x5DE5;&#x5177;&#x7C7B;&#x7684;&#x91CC;&#x9762;&#x7684;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;&#x5143;&#x7D20;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5224;&#x65AD;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventListener</span> </span>{
  <span class="hljs-keyword">constructor</span>(el,binding,vnode) {
    <span class="hljs-keyword">this</span>.el = el;<span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;&#x5404;&#x79CD;&#x9700;&#x8981;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">this</span>.binding = binding;
    <span class="hljs-keyword">this</span>.vnode = vnode;
    <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.$vm = vnode.context;
    <span class="hljs-keyword">this</span>.$lazyload = vnode.context.$lazyload<span class="hljs-comment">//&#x6DF7;&#x5408;mixin&#x8FDB;&#x53BB;&#x7684;&#x9009;&#x9879;</span>
  }

  init(){
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.binding.value === <span class="hljs-string">&apos;string&apos;</span>){
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x60A8;&#x7684;&#x56FE;&#x7247;&#x6E90;&#x4E0D;&#x662F;String&#x7C7B;&#x578B;&#xFF0C;&#x8BF7;&#x91CD;&#x8BD5;&quot;</span>);
      <span class="hljs-keyword">return</span>;
    }
      <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-keyword">this</span>.vnode.context.imagebox;
    <span class="hljs-keyword">this</span>.imagebox.add(<span class="hljs-keyword">this</span>.el,<span class="hljs-keyword">this</span>.binding.value);<span class="hljs-comment">//&#x6BCF;&#x6709;&#x4E00;&#x4E2A;item&#xFF0C;&#x5C31;&#x5F80;box&#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.listenProcess();
  }

  startListen(){
      <span class="hljs-keyword">const</span> _self = <span class="hljs-keyword">this</span>;
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;scroll&apos;</span>,(e)=&gt;{
          _self.listenProcess(e);<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5F00;&#x59CB;&#x64CD;&#x4F5C;</span>
      })
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x4E3B;&#x8981;&#x521D;&#x59CB;&#x5316;&#x4E86;&#x5F88;&#x591A;&#x5C5E;&#x6027;&#xFF0C;&#x5305;&#x62EC;vue&#x7684;&#x865A;&#x62DF;dom&#x548C;&#x5404;&#x79CD;&#x5305;&#x62EC;el&#x5143;&#x7D20;dom&#xFF0C;binding&#x6307;&#x4EE4;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x503C;&#x7B49;&#x7B49;&#x521D;&#x59CB;&#x5316;&#x3002;</p><p>&#x6B64;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x4E3A;&#x4E86;&#x5904;&#x7406;&#x76D1;&#x542C;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x7684;&#xFF0C;&#x76D1;&#x542C;<strong>&#x662F;&#x5426;&#x56FE;&#x7247;&#x8FDB;&#x5165;&#x5230;&#x53EF;&#x89C6;&#x8303;&#x56F4;&#x5185;</strong>&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x4E00;&#x7CFB;&#x5217;&#x4E0B;&#x65B9;&#x7684;&#x5404;&#x79CD;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x6839;&#x636E;<code>image.onload&#xFF0C;image.onerror</code>&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x56FE;&#x7247;&#x9884;&#x52A0;&#x8F7D;&#x7684;&#x903B;&#x8F91;&#x64CD;&#x4F5C;,&#x5982;&#x679C;&#x770B;&#x5F97;&#x89C1;&#x8FD9;&#x4E2A;&#x56FE;&#x7247;,&#x90A3;&#x4E48;&#x5C31;&#x8FDB;&#x884C;&#x56FE;&#x7247;&#x7684;&#x52A0;&#x8F7D;&#xFF08;&#x540C;&#x65F6;&#x52A0;&#x5165;&#x5230;pending&#x91CC;&#x9762;&#x53BB;&#xFF09;&#xFF0C;&#x52A0;&#x8F7D;&#x5B8C;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x3002;</p><p>&#x4E0B;&#x5217;&#x662F;process&#x7684;&#x51FD;&#x6570;<code>listenProcess</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _self = this;
if(this.imagebox.item.length == 0){
    return;
};
this.imagebox.item.forEach((item)=&gt;{
    if(isSeen(item)){//&#x8FD9;&#x91CC;&#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;
        var image = new Image();//&#x8FD9;&#x91CC;&#x5728;&#x8D4B;&#x503C;src&#x524D;new&#x4E00;&#x4E2A;image&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x7F13;&#x51B2;&#x4E00;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x540E;&#x7EED;&#x7684;&#x52A0;&#x8F7D;&#x6216;&#x5931;&#x8D25;&#x7684;&#x51FD;&#x6570;&#x5904;&#x7406;
        image.src = item.src;
        _self._imageStyle(item);//&#x6539;&#x53D8;item&#x7684;&#x6837;&#x5F0F;

        _self.imagebox.addPending(item.ele,item.src);//&#x5728;&#x5BF9;&#x8C61;imagebox&#x4E2D;&#x52A0;&#x5165;&#x4E86;&#x6B63;&#x5728;pending&#x8BF7;&#x6C42;&#x7684;item(&#x540E;&#x7EED;&#x4F1A;&#x4ECB;&#x7ECD;imagebox&#x7C7B;)

        image.onload = function(){//&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x7684;&#x5904;&#x7406;
            if(image.complete){
                _self.imageOnload(item);
            }
        }

        image.onerror = function(){//&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x7684;&#x5904;&#x7406;
            _self.imageOnerror(item);
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _self = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.imagebox.item.length == <span class="hljs-number">0</span>){
    <span class="hljs-keyword">return</span>;
};
<span class="hljs-keyword">this</span>.imagebox.item.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
    <span class="hljs-keyword">if</span>(isSeen(item)){<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;</span>
        <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5728;&#x8D4B;&#x503C;src&#x524D;new&#x4E00;&#x4E2A;image&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x7F13;&#x51B2;&#x4E00;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x540E;&#x7EED;&#x7684;&#x52A0;&#x8F7D;&#x6216;&#x5931;&#x8D25;&#x7684;&#x51FD;&#x6570;&#x5904;&#x7406;</span>
        image.src = item.src;
        _self._imageStyle(item);<span class="hljs-comment">//&#x6539;&#x53D8;item&#x7684;&#x6837;&#x5F0F;</span>

        _self.imagebox.addPending(item.ele,item.src);<span class="hljs-comment">//&#x5728;&#x5BF9;&#x8C61;imagebox&#x4E2D;&#x52A0;&#x5165;&#x4E86;&#x6B63;&#x5728;pending&#x8BF7;&#x6C42;&#x7684;item(&#x540E;&#x7EED;&#x4F1A;&#x4ECB;&#x7ECD;imagebox&#x7C7B;)</span>

        image.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x7684;&#x5904;&#x7406;</span>
            <span class="hljs-keyword">if</span>(image.complete){
                _self.imageOnload(item);
            }
        }

        image.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x7684;&#x5904;&#x7406;</span>
            _self.imageOnerror(item);
        }
    }
})</code></pre><p>&#x8FD8;&#x6709;&#x5176;&#x4F59;&#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="imageOnload(item){//&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x7684;&#x64CD;&#x4F5C;
      this._removeImageStyle(item.ele);
    this.imagebox.addAlready(item.ele,item.src);//&#x6DFB;&#x52A0;&#x5230;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x7684;item&#x6570;&#x7EC4;&#x91CC;&#x9762;
    this._imageSet(item.ele,item.src)
  }

  imageOnerror(item){//&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;
      this._removeImageStyle(item.ele);
    this.imagebox.addFailed(item.ele,item.src);//&#x6DFB;&#x52A0;&#x5230;&#x51FA;&#x73B0;&#x9519;&#x8BEF;item&#x6570;&#x7EC4;&#x91CC;&#x9762;
    this._imageSet(item.ele,this.$lazyload.options.errorUrl)//&#x628A;&#x914D;&#x7F6E;&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#x56FE;&#x7247;url&#x586B;&#x5165;
  }

  _imageStyle(item){
    item.ele.style.background = `url(${this.$lazyload.options.loadUrl}) no-repeat center`;
  }

  _removeImageStyle(ele){
      ele.style.background = &apos;&apos;;
  }

  _imageSet(ele,value){//&#x5173;&#x4E8E;&#x56FE;&#x7247;&#x8D4B;&#x503C;src&#x7684;&#x64CD;&#x4F5C;
    ele.src = value;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">imageOnload(item){<span class="hljs-comment">//&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x7684;&#x64CD;&#x4F5C;</span>
      <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addAlready(item.ele,item.src);<span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5230;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x7684;item&#x6570;&#x7EC4;&#x91CC;&#x9762;</span>
    <span class="hljs-keyword">this</span>._imageSet(item.ele,item.src)
  }

  imageOnerror(item){<span class="hljs-comment">//&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;</span>
      <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addFailed(item.ele,item.src);<span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5230;&#x51FA;&#x73B0;&#x9519;&#x8BEF;item&#x6570;&#x7EC4;&#x91CC;&#x9762;</span>
    <span class="hljs-keyword">this</span>._imageSet(item.ele,<span class="hljs-keyword">this</span>.$lazyload.options.errorUrl)<span class="hljs-comment">//&#x628A;&#x914D;&#x7F6E;&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#x56FE;&#x7247;url&#x586B;&#x5165;</span>
  }

  _imageStyle(item){
    item.ele.style.background = <span class="hljs-string">`url(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$lazyload.options.loadUrl}</span>) no-repeat center`</span>;
  }

  _removeImageStyle(ele){
      ele.style.background = <span class="hljs-string">&apos;&apos;</span>;
  }

  _imageSet(ele,value){<span class="hljs-comment">//&#x5173;&#x4E8E;&#x56FE;&#x7247;&#x8D4B;&#x503C;src&#x7684;&#x64CD;&#x4F5C;</span>
    ele.src = value;
  }</code></pre><p>&#x8865;&#x5145;&#x4E00;&#x4E2A;update&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update(ele,src){
    console.log(&quot;&#x66F4;&#x65B0;&#x4E86;&quot;);
    console.log(this.imagebox);
    this.imagebox.update(ele,src);//&#x8C03;&#x7528;imagebox&#x4E2D;&#x7684;update&#x65B9;&#x6CD5;
    this.listenProcess();//&#x518D;&#x8FDB;&#x884C;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;&#x7684;process&#x64CD;&#x4F5C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">update(ele,src){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x66F4;&#x65B0;&#x4E86;&quot;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.imagebox);
    <span class="hljs-keyword">this</span>.imagebox.update(ele,src);<span class="hljs-comment">//&#x8C03;&#x7528;imagebox&#x4E2D;&#x7684;update&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">this</span>.listenProcess();<span class="hljs-comment">//&#x518D;&#x8FDB;&#x884C;&#x662F;&#x5426;&#x770B;&#x5F97;&#x89C1;&#x7684;process&#x64CD;&#x4F5C;</span>
}</code></pre><p>&#x4E0B;&#x9762;&#x662F;&#x6240;&#x6709;&#x7684;eventlistener.js&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {isSeen} from &apos;../utils/utils&apos;

export default class EventListener {
  constructor(el,binding,vnode) {
    this.el = el;
    this.binding = binding;
    this.vnode = vnode;
    this.imagebox = null;
    this.$vm = vnode.context;
    this.$lazyload = vnode.context.$lazyload
  }
  //&#x7ED1;&#x5B9A;&#x521D;&#x59CB;&#x5316;
  init(){
    if(!typeof this.binding.value === &apos;string&apos;){
      throw new Error(&quot;&#x60A8;&#x7684;&#x56FE;&#x7247;&#x6E90;&#x4E0D;&#x662F;String&#x7C7B;&#x578B;&#xFF0C;&#x8BF7;&#x91CD;&#x8BD5;&quot;);
      return;
    }
      this.imagebox = this.vnode.context.imagebox;
    this.imagebox.add(this.el,this.binding.value);
    this.listenProcess();
  }
  //&#x5F00;&#x59CB;&#x76D1;&#x542C;
  startListen(){
    var listenProcess = this.listenProcess;
      document.addEventListener(&apos;scroll&apos;,listenProcess.bind(this),false);
  }
  //&#x79FB;&#x9664;&#x76D1;&#x542C;
  removeListen(){
    var listenProcess = this.listenProcess;
    document.removeEventListener(&apos;scroll&apos;,listenProcess.bind(this),false);
  }
  //&#x76D1;&#x542C;&#x7684;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x5305;&#x62EC;&#x5224;&#x65AD;image&#x7684;box&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x7B49;
  listenProcess(){
      const _self = this;
    if(this.imagebox.item.length == 0){
      return;
    };

      this.imagebox.item.forEach((item)=&gt;{
            if(isSeen(item)){
          var image = new Image();
          image.src = item.src;
          _self._imageStyle(item);
          
          _self.imagebox.addPending(item.ele,item.src);

          image.onload = function(){
            if(image.complete){
                _self.imageOnload(item);
            }
          }

          image.onerror = function(){
            _self.imageOnerror(item);
          }
            }
        })
  }
  //&#x8FDB;&#x884C;&#x6700;&#x65B0;&#x56FE;&#x7247;&#x5730;&#x5740;&#x7684;&#x66F4;&#x65B0;
  update(ele,src){
    console.log(&quot;&#x66F4;&#x65B0;&#x4E86;&quot;);
    console.log(this.imagebox);
    this.imagebox.update(ele,src);
    this.listenProcess();
  }
  //&#x5177;&#x4F53;&#x5F97;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x7684;&#x64CD;&#x4F5C;
  imageOnload(item){
      this._removeImageStyle(item.ele);
    this.imagebox.addAlready(item.ele,item.src);
    this._imageSet(item.ele,item.src)
  }
  //&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x9519;&#x8BEF;&#x7684;&#x64CD;&#x4F5C;
  imageOnerror(item){
      this._removeImageStyle(item.ele);
    this.imagebox.addFailed(item.ele,item.src);
    this._imageSet(item.ele,this.$lazyload.options.errorUrl)
  }
  //&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x7684;&#x8D4B;&#x503C;
  _imageStyle(item){
    item.ele.style.background = `url(${this.$lazyload.options.loadUrl}) no-repeat center`;
  }
  //&#x79FB;&#x9664;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x5730;&#x5740;
  _removeImageStyle(ele){
      ele.style.background = &apos;&apos;;
  }
  //&#x5BF9;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
  _imageSet(ele,value){
    ele.src = value;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {isSeen} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../utils/utils&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventListener</span> </span>{
  <span class="hljs-keyword">constructor</span>(el,binding,vnode) {
    <span class="hljs-keyword">this</span>.el = el;
    <span class="hljs-keyword">this</span>.binding = binding;
    <span class="hljs-keyword">this</span>.vnode = vnode;
    <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.$vm = vnode.context;
    <span class="hljs-keyword">this</span>.$lazyload = vnode.context.$lazyload
  }
  <span class="hljs-comment">//&#x7ED1;&#x5B9A;&#x521D;&#x59CB;&#x5316;</span>
  init(){
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.binding.value === <span class="hljs-string">&apos;string&apos;</span>){
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x60A8;&#x7684;&#x56FE;&#x7247;&#x6E90;&#x4E0D;&#x662F;String&#x7C7B;&#x578B;&#xFF0C;&#x8BF7;&#x91CD;&#x8BD5;&quot;</span>);
      <span class="hljs-keyword">return</span>;
    }
      <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-keyword">this</span>.vnode.context.imagebox;
    <span class="hljs-keyword">this</span>.imagebox.add(<span class="hljs-keyword">this</span>.el,<span class="hljs-keyword">this</span>.binding.value);
    <span class="hljs-keyword">this</span>.listenProcess();
  }
  <span class="hljs-comment">//&#x5F00;&#x59CB;&#x76D1;&#x542C;</span>
  startListen(){
    <span class="hljs-keyword">var</span> listenProcess = <span class="hljs-keyword">this</span>.listenProcess;
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;scroll&apos;</span>,listenProcess.bind(<span class="hljs-keyword">this</span>),<span class="hljs-literal">false</span>);
  }
  <span class="hljs-comment">//&#x79FB;&#x9664;&#x76D1;&#x542C;</span>
  removeListen(){
    <span class="hljs-keyword">var</span> listenProcess = <span class="hljs-keyword">this</span>.listenProcess;
    <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">&apos;scroll&apos;</span>,listenProcess.bind(<span class="hljs-keyword">this</span>),<span class="hljs-literal">false</span>);
  }
  <span class="hljs-comment">//&#x76D1;&#x542C;&#x7684;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x5305;&#x62EC;&#x5224;&#x65AD;image&#x7684;box&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x7B49;</span>
  listenProcess(){
      <span class="hljs-keyword">const</span> _self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.imagebox.item.length == <span class="hljs-number">0</span>){
      <span class="hljs-keyword">return</span>;
    };

      <span class="hljs-keyword">this</span>.imagebox.item.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
            <span class="hljs-keyword">if</span>(isSeen(item)){
          <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
          image.src = item.src;
          _self._imageStyle(item);
          
          _self.imagebox.addPending(item.ele,item.src);

          image.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(image.complete){
                _self.imageOnload(item);
            }
          }

          image.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            _self.imageOnerror(item);
          }
            }
        })
  }
  <span class="hljs-comment">//&#x8FDB;&#x884C;&#x6700;&#x65B0;&#x56FE;&#x7247;&#x5730;&#x5740;&#x7684;&#x66F4;&#x65B0;</span>
  update(ele,src){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x66F4;&#x65B0;&#x4E86;&quot;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.imagebox);
    <span class="hljs-keyword">this</span>.imagebox.update(ele,src);
    <span class="hljs-keyword">this</span>.listenProcess();
  }
  <span class="hljs-comment">//&#x5177;&#x4F53;&#x5F97;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x7684;&#x64CD;&#x4F5C;</span>
  imageOnload(item){
      <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addAlready(item.ele,item.src);
    <span class="hljs-keyword">this</span>._imageSet(item.ele,item.src)
  }
  <span class="hljs-comment">//&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x9519;&#x8BEF;&#x7684;&#x64CD;&#x4F5C;</span>
  imageOnerror(item){
      <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addFailed(item.ele,item.src);
    <span class="hljs-keyword">this</span>._imageSet(item.ele,<span class="hljs-keyword">this</span>.$lazyload.options.errorUrl)
  }
  <span class="hljs-comment">//&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x7684;&#x8D4B;&#x503C;</span>
  _imageStyle(item){
    item.ele.style.background = <span class="hljs-string">`url(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$lazyload.options.loadUrl}</span>) no-repeat center`</span>;
  }
  <span class="hljs-comment">//&#x79FB;&#x9664;&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x5730;&#x5740;</span>
  _removeImageStyle(ele){
      ele.style.background = <span class="hljs-string">&apos;&apos;</span>;
  }
  <span class="hljs-comment">//&#x5BF9;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x8D4B;&#x503C;</span>
  _imageSet(ele,value){
    ele.src = value;
  }
}</code></pre><p>&#x6240;&#x6709;&#x7684;&#x89E3;&#x91CA;&#x90FD;&#x5DF2;&#x7ECF;&#x5199;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x91CC;&#x9762;&#x4E86;&#x3002;</p><h5>3.4.4 lazyload.js</h5><p>&#x6700;&#x540E;&#x628A;&#x4E00;&#x4E9B;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x6216;&#x8005;&#x5931;&#x8D25;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5B8C;&#x6210;&#x4E0B;&#x5217;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEFAULT_ERROR_URL = &apos;./404.svg&apos;;
const DEFAULT_LOAD_URL = &apos;./loading-spin.svg&apos;;

export default class LazyLoad {
    constructor() {
    this.options = {
        loadUrl: DEFAULT_LOAD_URL,
        errorUrl: DEFAULT_ERROR_URL
    };
  }

  register(options){
      Object.assign(this.options, options);
  }
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> DEFAULT_ERROR_URL = <span class="hljs-string">&apos;./404.svg&apos;</span>;
<span class="hljs-keyword">const</span> DEFAULT_LOAD_URL = <span class="hljs-string">&apos;./loading-spin.svg&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LazyLoad</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.options = {
        <span class="hljs-attr">loadUrl</span>: DEFAULT_LOAD_URL,
        <span class="hljs-attr">errorUrl</span>: DEFAULT_ERROR_URL
    };
  }

  register(options){
      <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.options, options);
  }
} </code></pre><p>&#x6B64;&#x7C7B;&#x6682;&#x65F6;&#x7528;&#x6765;&#x5B58;<strong>&#x50A8;&#x5404;&#x79CD;&#x914D;&#x7F6E;</strong>&#x548C;lazy&#x7684;&#x9884;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;options&#x91CC;&#x9762;&#x5B58;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x548C;&#x9519;&#x8BEF;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#x3002;</p><p>&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x6700;&#x4E0A;&#x9762;&#x4E24;&#x4E2A;&#x503C;&#xFF0C;&#x662F;&#x4E0D;&#x4F20;&#x6570;&#x636E;&#x9ED8;&#x8BA4;&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h5>3.4.5 index.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import directive from &apos;./directive&apos;;
import mixin from &apos;./mixin&apos;;
import lazyload from &apos;./lazyload&apos;;

const install = ( Vue,options = {} )=&gt;{
    const lazy = new lazyload();
    lazy.register(options);

    Vue.prototype.$lazyload = lazy

    Vue.mixin(mixin);
    
    Vue.directive(&apos;simple-lazy&apos;,directive);

}

export default {
    install
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> directive <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./directive&apos;</span>;
<span class="hljs-keyword">import</span> mixin <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mixin&apos;</span>;
<span class="hljs-keyword">import</span> lazyload <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./lazyload&apos;</span>;

<span class="hljs-keyword">const</span> install = <span class="hljs-function">(<span class="hljs-params"> Vue,options = {} </span>)=&gt;</span>{
    <span class="hljs-keyword">const</span> lazy = <span class="hljs-keyword">new</span> lazyload();
    lazy.register(options);

    Vue.prototype.$lazyload = lazy

    Vue.mixin(mixin);
    
    Vue.directive(<span class="hljs-string">&apos;simple-lazy&apos;</span>,directive);

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    install
};</code></pre><p>&#x628A;&#x4E0A;&#x8FF0;&#x6240;&#x6709;&#x7684;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x7EFC;&#x5408;&#xFF0C;&#x653E;&#x5728;&#x8FD9;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x5411;&#x5916;&#x66B4;&#x9732;&#x3002;</p><p>index&#x5C31;&#x662F;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x81F3;&#x6B64;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x4E86;&#x61D2;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6;&#x7684;&#x57FA;&#x672C;&#x4EE3;&#x7801;&#x7F16;&#x5199;&#x3002;</p><h2 id="articleHeader5">&#x56DB;&#x3001;&#x6253;&#x5305;&#x6210;.js&#x53EF;&#x4EE5;&#x5916;&#x90E8;&#x76F4;&#x63A5;&#x5F15;&#x7528;</h2><p>&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (global, factory) {
  typeof exports === &apos;object&apos; &amp;&amp; typeof module !== &apos;undefined&apos; ? module.exports = factory() :
  typeof define === &apos;function&apos; &amp;&amp; define.amd ? define(factory) :
  (global.LazyLoad = factory());
}(this, (function () { &apos;use strict&apos;;

  var isSeen = function isSeen(item, imagebox) {
    var ele = item.ele;
    var src = item.src;
    //&#x56FE;&#x7247;&#x8DDD;&#x79BB;&#x9875;&#x9762;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
    var top = ele.getBoundingClientRect().top;
    //&#x9875;&#x9762;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;&#x9AD8;&#x5EA6;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //top + 10 &#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x4E86;&#x53EF;&#x89C6;&#x533A;&#x57DF;10&#x50CF;&#x7D20;
    if (top + 10 &lt; windowHeight) {
      return true;
    } else {
      return false;
    }
  };

  var EventListener = function EventListener(el, binding, vnode) {
    this.el = el;
    this.binding = binding;
    this.vnode = vnode;
    this.imagebox = null;
    this.$vm = vnode.context;
    this.$lazyload = vnode.context.$lazyload;
  };

  EventListener.prototype.init = function init() {
    this.imagebox = this.vnode.context.imagebox;
    this.imagebox.add(this.el, this.binding.value);
    this.listenProcess();
  };

  EventListener.prototype.startListen = function startListen() {
    var listenProcess = this.listenProcess;
    window.addEventListener(&apos;scroll&apos;, listenProcess.bind(this), false);
  };

  EventListener.prototype.removeListen = function removeListen() {
    var listenProcess = this.listenProcess;
    window.removeEventListener(&apos;scroll&apos;, listenProcess.bind(this), false);
  };

  EventListener.prototype.listenProcess = function listenProcess() {
    var _self = this;
    if (this.imagebox.item.length == 0) {
      return;
    }
    this.imagebox.item.forEach(function (item) {
      if (isSeen(item)) {

        var image = new Image();
        image.src = item.src;
        _self._imageStyle(item);

        _self.imagebox.addPending(item.ele, item.src);

        image.onload = function () {
          if (image.complete) {
            _self.imageOnload(item);
          }
        };

        image.onerror = function () {
          _self.imageOnerror(item);
        };
      }
    });
  };

  EventListener.prototype.update = function update(ele, src) {
    console.log(&quot;&#x66F4;&#x65B0;&#x4E86;&quot;);
    console.log(this.imagebox);
    this.imagebox.update(ele, src);
    this.listenProcess();
  };

  EventListener.prototype.imageOnload = function imageOnload(item) {
    this._removeImageStyle(item.ele);
    this.imagebox.addAlready(item.ele, item.src);
    this._imageSet(item.ele, item.src);
  };

  EventListener.prototype.imageOnerror = function imageOnerror(item) {
    this._removeImageStyle(item.ele);
    this.imagebox.addFailed(item.ele, item.src);
    this._imageSet(item.ele, this.$lazyload.options.errorUrl);
  };

  EventListener.prototype._imageStyle = function _imageStyle(item) {
    item.ele.style.background = &quot;url(&quot; + this.$lazyload.options.loadUrl + &quot;) no-repeat center&quot;;
  };

  EventListener.prototype._removeImageStyle = function _removeImageStyle(ele) {
    ele.style.background = &apos;&apos;;
  };

  EventListener.prototype._imageSet = function _imageSet(ele, value) {
    ele.src = value;
  };

  var listener = null;

  var directive = {

      inserted: function inserted(el, binding, vnode, oldVnode) {
          var EventListener$$1 = new EventListener(el, binding, vnode);
          listener = EventListener$$1;
          EventListener$$1.init();
          EventListener$$1.startListen();
      },
      update: function update(el, ref, vnode, oldVnode) {
          var name = ref.name;
          var value = ref.value;
          var oldValue = ref.oldValue;
          var expression = ref.expression;

          if (value === oldValue) {
              return;
          }
          listener.update(el, value);
      },
      unbind: function unbind() {
          listener.removeListen();
      }

  };

  var ImageBox = function ImageBox() {
    this.eleAll = [];
    this.item = [];
    this.itemAlready = [];
    this.itemPending = [];
    this.itemFailed = [];
  };

  ImageBox.prototype.add = function add(ele, src) {
    var index = this.itemAlready.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.item.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype.update = function update(ele, src) {
    var index = this.itemAlready.findIndex(function (item) {
      return item.ele === ele;
    });

    if (index != -1) {
      this.itemAlready.splice(index, 1);
      this.add(ele, src);
      return;
    }
    var _index = this.itemFailed.findIndex(function (item) {
      return item.ele === ele;
    });

    if (_index != -1) {
      this.itemFailed.splice(_index, 1);
      this.add(ele, src);
      return;
    "}}";

  ImageBox.prototype.addFailed = function addFailed(ele, src) {
    this._addFailed(ele, src);
    this._removeFromPending(ele);
  };

  ImageBox.prototype.addPending = function addPending(ele, src) {
    this._addPending(ele, src);
    this._remove(ele);
  };

  ImageBox.prototype.addAlready = function addAlready(ele, src) {
    this._addAlready(ele, src);
    this._removeFromPending(ele);
  };

  ImageBox.prototype._addAlready = function _addAlready(ele, src) {
    var index = this.itemAlready.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemAlready.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._addPending = function _addPending(ele, src) {
    var index = this.itemPending.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemPending.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._addFailed = function _addFailed(ele, src) {
    var index = this.itemFailed.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemFailed.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._remove = function _remove(ele) {
    var index = this.item.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index != -1) {
      this.item.splice(index, 1);
    }
  };

  ImageBox.prototype._removeFromPending = function _removeFromPending(ele) {
    var index = this.itemPending.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index != -1) {
      this.itemPending.splice(index, 1);
    }
  };

  var mixin = {
      data: function data() {
          return {
              imagebox: new ImageBox()
          };
      }
  };

  var DEFAULT_ERROR_URL = &apos;./404.svg&apos;;
  var DEFAULT_LOAD_URL = &apos;./loading-spin.svg&apos;;

  var LazyLoad = function LazyLoad() {
    this.options = {
      loadUrl: DEFAULT_LOAD_URL,
      errorUrl: DEFAULT_ERROR_URL
    };
  };

  LazyLoad.prototype.register = function register(options) {
    Object.assign(this.options, options);
  };

  var install = function install(Vue, options) {
      if (options === void 0) options = {};

      var lazy = new LazyLoad();
      lazy.register(options);

      Vue.prototype.$lazyload = lazy;

      Vue.mixin(mixin);

      Vue.directive(&apos;simple-lazy&apos;, directive);
  };

  var index = {
      install: install
  };

  return index;

})));
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">global, factory</span>) </span>{
  <span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> !== <span class="hljs-string">&apos;undefined&apos;</span> ? <span class="hljs-built_in">module</span>.exports = factory() :
  <span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; define.amd ? define(factory) :
  (global.LazyLoad = factory());
}(<span class="hljs-keyword">this</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-string">&apos;use strict&apos;</span>;

  <span class="hljs-keyword">var</span> isSeen = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSeen</span>(<span class="hljs-params">item, imagebox</span>) </span>{
    <span class="hljs-keyword">var</span> ele = item.ele;
    <span class="hljs-keyword">var</span> src = item.src;
    <span class="hljs-comment">//&#x56FE;&#x7247;&#x8DDD;&#x79BB;&#x9875;&#x9762;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;</span>
    <span class="hljs-keyword">var</span> top = ele.getBoundingClientRect().top;
    <span class="hljs-comment">//&#x9875;&#x9762;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;&#x9AD8;&#x5EA6;</span>
    <span class="hljs-keyword">var</span> windowHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight;
    <span class="hljs-comment">//top + 10 &#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x4E86;&#x53EF;&#x89C6;&#x533A;&#x57DF;10&#x50CF;&#x7D20;</span>
    <span class="hljs-keyword">if</span> (top + <span class="hljs-number">10</span> &lt; windowHeight) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  };

  <span class="hljs-keyword">var</span> EventListener = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">EventListener</span>(<span class="hljs-params">el, binding, vnode</span>) </span>{
    <span class="hljs-keyword">this</span>.el = el;
    <span class="hljs-keyword">this</span>.binding = binding;
    <span class="hljs-keyword">this</span>.vnode = vnode;
    <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.$vm = vnode.context;
    <span class="hljs-keyword">this</span>.$lazyload = vnode.context.$lazyload;
  };

  EventListener.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.imagebox = <span class="hljs-keyword">this</span>.vnode.context.imagebox;
    <span class="hljs-keyword">this</span>.imagebox.add(<span class="hljs-keyword">this</span>.el, <span class="hljs-keyword">this</span>.binding.value);
    <span class="hljs-keyword">this</span>.listenProcess();
  };

  EventListener.prototype.startListen = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startListen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> listenProcess = <span class="hljs-keyword">this</span>.listenProcess;
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;scroll&apos;</span>, listenProcess.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
  };

  EventListener.prototype.removeListen = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeListen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> listenProcess = <span class="hljs-keyword">this</span>.listenProcess;
    <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">&apos;scroll&apos;</span>, listenProcess.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
  };

  EventListener.prototype.listenProcess = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listenProcess</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.imagebox.item.length == <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">this</span>.imagebox.item.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
      <span class="hljs-keyword">if</span> (isSeen(item)) {

        <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
        image.src = item.src;
        _self._imageStyle(item);

        _self.imagebox.addPending(item.ele, item.src);

        image.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">if</span> (image.complete) {
            _self.imageOnload(item);
          }
        };

        image.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          _self.imageOnerror(item);
        };
      }
    });
  };

  EventListener.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x66F4;&#x65B0;&#x4E86;&quot;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.imagebox);
    <span class="hljs-keyword">this</span>.imagebox.update(ele, src);
    <span class="hljs-keyword">this</span>.listenProcess();
  };

  EventListener.prototype.imageOnload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">imageOnload</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addAlready(item.ele, item.src);
    <span class="hljs-keyword">this</span>._imageSet(item.ele, item.src);
  };

  EventListener.prototype.imageOnerror = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">imageOnerror</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">this</span>._removeImageStyle(item.ele);
    <span class="hljs-keyword">this</span>.imagebox.addFailed(item.ele, item.src);
    <span class="hljs-keyword">this</span>._imageSet(item.ele, <span class="hljs-keyword">this</span>.$lazyload.options.errorUrl);
  };

  EventListener.prototype._imageStyle = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_imageStyle</span>(<span class="hljs-params">item</span>) </span>{
    item.ele.style.background = <span class="hljs-string">&quot;url(&quot;</span> + <span class="hljs-keyword">this</span>.$lazyload.options.loadUrl + <span class="hljs-string">&quot;) no-repeat center&quot;</span>;
  };

  EventListener.prototype._removeImageStyle = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_removeImageStyle</span>(<span class="hljs-params">ele</span>) </span>{
    ele.style.background = <span class="hljs-string">&apos;&apos;</span>;
  };

  EventListener.prototype._imageSet = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_imageSet</span>(<span class="hljs-params">ele, value</span>) </span>{
    ele.src = value;
  };

  <span class="hljs-keyword">var</span> listener = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">var</span> directive = {

      <span class="hljs-attr">inserted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inserted</span>(<span class="hljs-params">el, binding, vnode, oldVnode</span>) </span>{
          <span class="hljs-keyword">var</span> EventListener$$<span class="hljs-number">1</span> = <span class="hljs-keyword">new</span> EventListener(el, binding, vnode);
          listener = EventListener$$<span class="hljs-number">1</span>;
          EventListener$$<span class="hljs-number">1.</span>init();
          EventListener$$<span class="hljs-number">1.</span>startListen();
      },
      <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params">el, ref, vnode, oldVnode</span>) </span>{
          <span class="hljs-keyword">var</span> name = ref.name;
          <span class="hljs-keyword">var</span> value = ref.value;
          <span class="hljs-keyword">var</span> oldValue = ref.oldValue;
          <span class="hljs-keyword">var</span> expression = ref.expression;

          <span class="hljs-keyword">if</span> (value === oldValue) {
              <span class="hljs-keyword">return</span>;
          }
          listener.update(el, value);
      },
      <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unbind</span>(<span class="hljs-params"></span>) </span>{
          listener.removeListen();
      }

  };

  <span class="hljs-keyword">var</span> ImageBox = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ImageBox</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.eleAll = [];
    <span class="hljs-keyword">this</span>.item = [];
    <span class="hljs-keyword">this</span>.itemAlready = [];
    <span class="hljs-keyword">this</span>.itemPending = [];
    <span class="hljs-keyword">this</span>.itemFailed = [];
  };

  ImageBox.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.item.push({
        <span class="hljs-attr">ele</span>: ele,
        <span class="hljs-attr">src</span>: src
      });
    }
  };

  ImageBox.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
      <span class="hljs-keyword">return</span> item.ele === ele;
    });

    <span class="hljs-keyword">if</span> (index != <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemAlready.splice(index, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.add(ele, src);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">var</span> _index = <span class="hljs-keyword">this</span>.itemFailed.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
      <span class="hljs-keyword">return</span> item.ele === ele;
    });

    <span class="hljs-keyword">if</span> (_index != <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemFailed.splice(_index, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.add(ele, src);
      <span class="hljs-keyword">return</span>;
    "}}";

  ImageBox.prototype.addFailed = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addFailed</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">this</span>._addFailed(ele, src);
    <span class="hljs-keyword">this</span>._removeFromPending(ele);
  };

  ImageBox.prototype.addPending = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addPending</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">this</span>._addPending(ele, src);
    <span class="hljs-keyword">this</span>._remove(ele);
  };

  ImageBox.prototype.addAlready = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addAlready</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">this</span>._addAlready(ele, src);
    <span class="hljs-keyword">this</span>._removeFromPending(ele);
  };

  ImageBox.prototype._addAlready = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_addAlready</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemAlready.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemAlready.push({
        <span class="hljs-attr">ele</span>: ele,
        <span class="hljs-attr">src</span>: src
      });
    }
  };

  ImageBox.prototype._addPending = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_addPending</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemPending.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemPending.push({
        <span class="hljs-attr">ele</span>: ele,
        <span class="hljs-attr">src</span>: src
      });
    }
  };

  ImageBox.prototype._addFailed = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_addFailed</span>(<span class="hljs-params">ele, src</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemFailed.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemFailed.push({
        <span class="hljs-attr">ele</span>: ele,
        <span class="hljs-attr">src</span>: src
      });
    }
  };

  ImageBox.prototype._remove = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_remove</span>(<span class="hljs-params">ele</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.item.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index != <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.item.splice(index, <span class="hljs-number">1</span>);
    }
  };

  ImageBox.prototype._removeFromPending = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_removeFromPending</span>(<span class="hljs-params">ele</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.itemPending.findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_item</span>) </span>{
      <span class="hljs-keyword">return</span> _item.ele === ele;
    });
    <span class="hljs-keyword">if</span> (index != <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.itemPending.splice(index, <span class="hljs-number">1</span>);
    }
  };

  <span class="hljs-keyword">var</span> mixin = {
      <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">data</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> {
              <span class="hljs-attr">imagebox</span>: <span class="hljs-keyword">new</span> ImageBox()
          };
      }
  };

  <span class="hljs-keyword">var</span> DEFAULT_ERROR_URL = <span class="hljs-string">&apos;./404.svg&apos;</span>;
  <span class="hljs-keyword">var</span> DEFAULT_LOAD_URL = <span class="hljs-string">&apos;./loading-spin.svg&apos;</span>;

  <span class="hljs-keyword">var</span> LazyLoad = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LazyLoad</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.options = {
      <span class="hljs-attr">loadUrl</span>: DEFAULT_LOAD_URL,
      <span class="hljs-attr">errorUrl</span>: DEFAULT_ERROR_URL
    };
  };

  LazyLoad.prototype.register = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">register</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.options, options);
  };

  <span class="hljs-keyword">var</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span>(<span class="hljs-params">Vue, options</span>) </span>{
      <span class="hljs-keyword">if</span> (options === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) options = {};

      <span class="hljs-keyword">var</span> lazy = <span class="hljs-keyword">new</span> LazyLoad();
      lazy.register(options);

      Vue.prototype.$lazyload = lazy;

      Vue.mixin(mixin);

      Vue.directive(<span class="hljs-string">&apos;simple-lazy&apos;</span>, directive);
  };

  <span class="hljs-keyword">var</span> index = {
      <span class="hljs-attr">install</span>: install
  };

  <span class="hljs-keyword">return</span> index;

})));
</code></pre><h4>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(LazyLoad,{
    loadUrl:&apos;./loading-spin.svg&apos;,//&#x8FD9;&#x91CC;&#x5199;&#x4F60;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x5019;&#x7684;&#x56FE;&#x7247;&#x914D;&#x7F6E;
    errorUrl:&apos;./404.svg&apos;//&#x9519;&#x8BEF;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x914D;&#x7F6E;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Vue.use(LazyLoad,{
    <span class="hljs-attr">loadUrl</span>:<span class="hljs-string">&apos;./loading-spin.svg&apos;</span>,<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5199;&#x4F60;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x5019;&#x7684;&#x56FE;&#x7247;&#x914D;&#x7F6E;</span>
    errorUrl:<span class="hljs-string">&apos;./404.svg&apos;</span><span class="hljs-comment">//&#x9519;&#x8BEF;&#x52A0;&#x8F7D;&#x7684;&#x56FE;&#x7247;&#x914D;&#x7F6E;</span>
});</code></pre><h4>&#x5143;&#x7D20;&#x4E2D;&#x4F7F;&#x7528;&#x6307;&#x4EE4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img v-simple-lazy=&quot;item&quot; v-for=&quot;(item,$key) in imageArr&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">&lt;img v-simple-lazy=<span class="hljs-string">&quot;item&quot;</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(item,$key) in imageArr&quot;</span>&gt;</code></pre><h4>imageArr&#x6D4B;&#x8BD5;&#x6570;&#x636E;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="imageArr:[
    &apos;http://covteam.u.qiniudn.com/test16.jpg?imageView2/2/format/webp&apos;,
    &apos;http://covteam.u.qiniudn.com/test14.jpg?imageView2/2/format/webp&apos;,
    &apos;http://covteam.u.qiniudn.com/test15.jpg?imageView2/2/format/webp&apos;,
    &apos;http://covteam.u.qiniudn.com/test17.jpg?imageView2/2/format/webp&apos;,
    &apos;http://hilongjw.github.io/vue-lazyload/dist/test9.jpg&apos;,
    &apos;http://hilongjw.github.io/vue-lazyload/dist/test10.jpg&apos;,
    &apos;http://hilongjw.github.io/vue-lazyload/dist/test14.jpg&apos;
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">imageArr:[
    <span class="hljs-string">&apos;http://covteam.u.qiniudn.com/test16.jpg?imageView2/2/format/webp&apos;</span>,
    <span class="hljs-string">&apos;http://covteam.u.qiniudn.com/test14.jpg?imageView2/2/format/webp&apos;</span>,
    <span class="hljs-string">&apos;http://covteam.u.qiniudn.com/test15.jpg?imageView2/2/format/webp&apos;</span>,
    <span class="hljs-string">&apos;http://covteam.u.qiniudn.com/test17.jpg?imageView2/2/format/webp&apos;</span>,
    <span class="hljs-string">&apos;http://hilongjw.github.io/vue-lazyload/dist/test9.jpg&apos;</span>,
    <span class="hljs-string">&apos;http://hilongjw.github.io/vue-lazyload/dist/test10.jpg&apos;</span>,
    <span class="hljs-string">&apos;http://hilongjw.github.io/vue-lazyload/dist/test14.jpg&apos;</span>
]</code></pre><p>&#x6D4B;&#x8BD5;&#x5730;&#x5740;&#xFF1A;<a href="http://www.tangyida.top/static/study/lazyload/test.html" rel="nofollow noreferrer" target="_blank">&#x6233;&#x6211;&#x6233;&#x6211;</a></p><h2 id="articleHeader6">&#x4E94;&#x3001;&#x540E;&#x8BB0;</h2><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x7684;&#x7F16;&#x5199;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x5199;&#x5B8C;&#x8FC7;&#x540E;&#x8FDB;&#x884C;&#x603B;&#x7ED3;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5176;&#x4E2D;&#x6700;&#x96BE;&#x7684;&#x662F;&#xFF1A;</p><p><strong>&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x548C;&#x4EE3;&#x7801;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x903B;&#x8F91;&#x5173;&#x7CFB;</strong>&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x624D;&#x662F;&#x6700;&#x96BE;&#x638C;&#x63E1;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6D89;&#x53CA;&#x5230;&#x5927;&#x4E00;&#x70B9;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x597D;&#x4E00;&#x70B9;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x80FD;&#x8BA9;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x8FDB;&#x5EA6;&#x7B49;&#x7B49;&#x56E0;&#x7D20;&#x53D1;&#x751F;&#x5DE8;&#x5927;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x63D0;&#x5347;&#x5DE8;&#x5927;&#x7684;&#x6548;&#x7387;&#x3002;&#x800C;&#x5199;&#x63D2;&#x4EF6;&#x6700;&#x96BE;&#x7684;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x3002;</p><p><strong>&#x5982;&#x4F55;&#x6709;&#x6548;&#x5730;&#x62C6;&#x5206;&#x4EE3;&#x7801;&#xFF1F;&#x5982;&#x4F55;&#x6709;&#x6548;&#x5730;&#x8FDB;&#x884C;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x7684;&#x6784;&#x9020;?</strong> &#x8FD9;&#x624D;&#x662F;&#x6574;&#x4E2A;&#x63D2;&#x4EF6;&#x7F16;&#x5199;&#x7684;&#x6838;&#x5FC3;&#x3002;</p><p>&#x4E4B;&#x524D;&#x5199;&#x8FC7;&#x4E00;&#x4E2A;vue&#x5173;&#x4E8E;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x4E5F;&#x662F;&#x88AB;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x641E;&#x5F97;&#x7126;&#x5934;&#x70C2;&#x989D;&#xFF0C;&#x8FD9;&#x91CC;&#x628A;&#x7B80;&#x5355;&#x7684;&#x61D2;&#x52A0;&#x8F7D;&#x57FA;&#x672C;&#x4EE3;&#x7801;&#x505A;&#x4E00;&#x4E2A;&#x603B;&#x7ED3;&#x3002;&#x5199;&#x8FD9;&#x4E2A;&#x7EAF;&#x7CB9;&#x662F;&#x4E2A;&#x4EBA;&#x5174;&#x8DA3;&#x3002;&#x5E0C;&#x671B;&#x53EF;&#x4EE5;&#x7ED9;&#x5165;&#x95E8;&#x7684;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x65B0;&#x4EBA;&#x7ED9;&#x4E88;&#x4E00;&#x70B9;&#x70B9;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x6DF1;&#x77E5;&#x5199;&#x63D2;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x7ED3;&#x6784;&#x548C;&#x6A21;&#x5757;&#x5316;&#x7684;&#x91CD;&#x8981;&#x6027;&#x3002;&#x800C;&#x7ED3;&#x6784;&#x548C;&#x6A21;&#x5757;&#x5316;&#x7684;&#x4F18;&#x79C0;&#xFF0C;&#x4F1A;&#x8BA9;&#x4F60;&#x4E8B;&#x534A;&#x529F;&#x500D;&#x3002;&#x53E6;&#x5916;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6765;&#x6211;&#x7684;&#x535A;&#x5BA2;&#x53C2;&#x89C2;<a>&#x5510;&#x76CA;&#x8FBE;&#x7684;&#x535A;&#x5BA2;</a>&#xFF0C;&#x53EA;&#x5199;&#x539F;&#x521B;&#x3002;</p><ul><li>&#x539F;&#x521B;&#x6765;&#x6E90;&#x6211;&#x7684;&#x535A;&#x5BA2; <a href="http://www.tangyida.top/detail/149" rel="nofollow noreferrer" target="_blank">http://www.tangyida.top/detai...</a> &#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#x3002;</li><li>GitHub&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/xdnloveme/vue-simple-lazyload" rel="nofollow noreferrer" target="_blank">https://github.com/xdnloveme/...</a></li></ul><p>&#x840C;&#x65B0;&#x5C0F;&#x767D;&#xFF0C;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5165;&#x95E8;&#x4E00;&#x5E74;&#x4E0D;&#x5230;&#xFF0C;&#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue插件开发初体验——（懒加载）

## 原文链接
[https://segmentfault.com/a/1190000015645724](https://segmentfault.com/a/1190000015645724)

