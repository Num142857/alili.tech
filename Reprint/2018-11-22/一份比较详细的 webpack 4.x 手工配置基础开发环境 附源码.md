---
title: '一份比较详细的 webpack 4.x 手工配置基础开发环境 附源码' 
date: 2018-11-22 2:30:10
hidden: true
slug: uq39hy9byj
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015724080?w=497&amp;h=270" src="https://static.alili.tech/img/remote/1460000015724080?w=497&amp;h=270" alt="webpack" title="webpack" style="cursor:pointer;display:inline"></span></p><blockquote>&#x91CD;&#x65B0;&#x4E66;&#x5199;&#x4E86;&#x535A;&#x5BA2;&#x5185;&#x5BB9;&#xFF0C;&#x5E0C;&#x671B;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x7684;&#x5448;&#x73B0;&#x8BE5;&#x6709;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;<br>bundle.js &#x6307;&#x7684;&#x662F; webpack &#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x3002;</blockquote><h2 id="articleHeader0">&#x5C0F;&#x5267;&#x573A;</h2><p>&#x9879;&#x76EE;&#x7ECF;&#x7406;&#xFF1A;&#x6211;&#x4EEC;&#x8981;&#x5F00;&#x59CB;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x88E4;&#x88C6;&#x4F60;&#x6765;&#x8D1F;&#x8D23;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x5427;&#x3002;<br>&#x6211;&#xFF1A;&#x597D;&#x7684;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x7ECF;&#x7406;&#x8BF7;&#x7A0D;&#x7B49;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-cli -g
vue init webpack -y new-project-name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code class="npm">npm <span class="hljs-keyword">install</span> vue-cli -g
vue init webpack -y <span class="hljs-keyword">new</span>-<span class="hljs-keyword">project</span>-<span class="hljs-keyword">name</span></code></pre><p>&#x6211;&#xFF1A;&#x597D;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x5427;&#x3002;<br>&#x9879;&#x76EE;&#x7ECF;&#x7406;&#xFF1A;&#x63A5;&#x4E0B;&#x6765;&#x5462;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015724081?w=440&amp;h=252" src="https://static.alili.tech/img/remote/1460000015724081?w=440&amp;h=252" alt="&#x9ED1;&#x4EBA;&#x95EE;&#x53F7;&#x8138;" title="&#x9ED1;&#x4EBA;&#x95EE;&#x53F7;&#x8138;" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#xFF1A;&#x63A5;&#x4E0B;&#x6765;&#x6CA1;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x5F00;&#x53D1;&#x4E86;&#x3002;<br>&#x9879;&#x76EE;&#x7ECF;&#x7406;&#xFF1A;&#x88E4;&#x88C6;&#x554A;&#xFF0C;&#x901F;&#x5EA6;&#x5FEB;&#x662F;&#x597D;&#x4E8B;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x770B;&#x4F60;&#x6BCF;&#x6B21;&#x90FD;&#x662F;&#x90A3;&#x4E48;&#x51E0;&#x6B65;&#xFF0C;&#x80FD;&#x4E0D;&#x80FD;&#x6765;&#x70B9;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4F60;&#x770B;&#x90A3;&#x4E9B;&#x9762;&#x8BD5;&#x5B98;&#xFF0C;&#x9762;&#x8BD5;&#x624B;&#x5199;&#x4E00;&#x4E2A; <code>webpack 4.x</code> &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4F60;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x5199;&#x4E48;&#xFF1F;<br>&#x6211;&#xFF1A;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;<br>&#x9879;&#x76EE;&#x7ECF;&#x7406;&#xFF1A;&#xFF08;&#x62C2;&#x8896;&#x800C;&#x53BB;&#xFF0C;&#x8FDC;&#x8FDC;&#x5730;&#x542C;&#x5230;&#x7A7A;&#x4E2D;&#x4F20;&#x6765;&#x4E00;&#x53E5;&#x8BDD;&#xFF09;&#x5E74;&#x8F7B;&#x4EBA;&#xFF0C;&#x5207;&#x52FF;&#x6025;&#x8E81;&#xFF0C;&#x7A33;&#x4E2D;&#x6C42;&#x80DC;&#x554A;&#x3002;<br>&#x6211;&#xFF1A;&#x9879;&#x76EE;&#x6025;&#x7684;&#x65F6;&#x5019;&#x4F60;&#x4E0D;&#x662F;&#x8FD9;&#x4E48;&#x8BF4;&#x7684;&#x3002;<br>&#x9879;&#x76EE;&#x7ECF;&#x7406;&#xFF1A;&#x88E4;&#x88C6;&#x4F60;&#x8BF4;&#x5565;&#xFF1F;<br>&#x6211;&#xFF1A;&#x7ECF;&#x7406;&#x4F60;&#x8BF4;&#x5F97;&#x5BF9;&#x3002;</p><h2 id="articleHeader1">&#x524D;&#x8A00;</h2><p>&#x5728;&#x6211;&#x4EEC;&#x5728;&#x9762;&#x5BF9;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7F51;&#x4E0A;&#x7684;&#x5927;&#x91CF;&#x4F18;&#x79C0;&#x7684;&#x6A21;&#x677F;&#x53EF;&#x4EE5;&#x4F7F;&#x6211;&#x4EEC;&#x5C11;&#x8D70;&#x5F88;&#x591A;&#x5F2F;&#x8DEF;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x4E3B;&#x8981;&#x7684;&#x7CBE;&#x529B;&#x653E;&#x5728;&#x4E1A;&#x52A1;&#x4E0A;&#xFF0C;&#x7B49;&#x5230;&#x540E;&#x671F;&#x9879;&#x76EE;&#x5E9E;&#x5927;&#x4E86;&#xFF0C;&#x4E1A;&#x52A1;&#x590D;&#x6742;&#x4E86;&#x7684;&#x65F6;&#x5019;&#x518D;&#x53BB;&#x505A;&#x4E00;&#x4E9B;&#x4F18;&#x5316;&#xFF0C;&#x8FD9;&#x5176;&#x4E2D;&#x5305;&#x62EC;&#x9879;&#x76EE;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x4F18;&#x5316;&#xFF0C;&#x9879;&#x76EE;&#x6253;&#x5305;&#x4F53;&#x79EF;&#x4F18;&#x5316;&#xFF08;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x505A;&#x662F;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x4F18;&#x5316;&#xFF09;&#xFF0C;&#x7B49;&#x7B49;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8EAB;&#x4E3A;&#x4E00;&#x4E2A;&#x7231;&#x6298;&#x817E;&#x7684;&#x7A0B;&#x5E8F;&#x733F;&#xFF0C;&#x9762;&#x5BF9;&#x8FD9;&#x4E9B;&#x6A21;&#x677F;&#xFF0C;&#x662F;&#x7684;&#xFF0C;&#x6211;&#x5F88;&#x597D;&#x5947;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015724082?w=750&amp;h=422" src="https://static.alili.tech/img/remote/1460000015724082?w=750&amp;h=422" alt="~~&#x6211;&#x5F88;&#x597D;&#x9A91;~~" title="~~&#x6211;&#x5F88;&#x597D;&#x9A91;~~" style="cursor:pointer"></span></p><p>&#x5F53;&#x7136;&#xFF0C;&#x6587;&#x7AE0;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x9644;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;&#x5730;&#x5740;&#xFF0C;<a href="https://github.com/jsjzh/my-webpack-template" rel="nofollow noreferrer" target="_blank">github@jsjzh</a>&#xFF0C;&#x6240;&#x6709;&#x7684;&#x4EE3;&#x7801;&#x6211;&#x90FD;&#x52A0;&#x4E0A;&#x4E86;&#x6CE8;&#x91CA;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x770B;&#x5B8C;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x6709;&#x6240;&#x6536;&#x83B7;&#xFF0C;&#x6700;&#x597D;&#x80FD;&#x8D4F;&#x4E2A; <code>star</code> &#x5566;&#xFF01;=3=</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/jsjzh/my-webpack-template.git
cd my-webpack-template
npm install
npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/jsjzh/my-webpack-template.git
cd my-webpack-template
npm install
npm <span class="hljs-literal">start</span></code></pre><h2 id="articleHeader2"><code>webpack 4.x</code> &#x7684;&#x90A3;&#x4E9B;&#x65B0;&#x73A9;&#x610F;&#x513F;</h2><p>&#x5728;&#x6700;&#x65B0;&#x7684; <a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a> &#x4E2D;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x65B0;&#x7684;&#x914D;&#x7F6E;&#x9879;&#xFF0C;<code>mode</code> &#x548C; <code>optimization</code>&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4ECE;&#x8FD9;&#x4E24;&#x4E2A;&#x5165;&#x624B;&#xFF0C;&#x770B;&#x770B; <code>webpack .4x</code> &#x6709;&#x4EC0;&#x4E48;&#x65B0;&#x4E1C;&#x897F;&#x3002;</p><p>&#x4E0B;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;&#x56E0;&#x4E3A;&#x4F60;&#x914D;&#x7F6E;&#x4E86;&#x4E0D;&#x540C;&#x7684; <code>mode</code> &#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x53D7;&#x5230;&#x7684;&#x4E0D;&#x540C;&#x5BF9;&#x5F85;&#x3002;</p><h3 id="articleHeader3"><code>mode</code> &#x662F;&#x4E2A;&#x5565;</h3><p>&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x662F;&#x533A;&#x5206; <code>webpack 4.x</code> &#x548C;&#x5176;&#x4ED6;&#x7248;&#x672C;&#x6700;&#x65B9;&#x4FBF;&#x7684;&#x624B;&#x6BB5;&#xFF0C;<code>webpack 4.x</code> &#x7ED9;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x4E2A;&#x6A21;&#x5F0F;&#x7528;&#x4F5C;&#x5F00;&#x53D1;&#x548C;&#x751F;&#x4EA7;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x6A21;&#x5F0F;&#x4E0B; <code>webpack</code> &#x9ED8;&#x9ED8;&#x7ED9;&#x6211;&#x4EEC;&#x5F00;&#x542F;&#x4E86;&#x4E0D;&#x5C11;&#x4F18;&#x5316;&#x624B;&#x6BB5;&#xFF0C;&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x4E9B;&#x4F18;&#x5316;&#x624B;&#x6BB5;&#x6211;&#x4EEC;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x5728; <code>optimization</code> &#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x589E;&#x52A0; <code>optimization</code> &#x9009;&#x9879;&#x5BF9;&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x66F4;&#x7EC6;&#x7684;&#x4F18;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="production | development | none" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code style="word-break:break-word;white-space:initial">production | <span class="hljs-type">development</span> | <span class="hljs-type">none</span></code></pre><p>&#x4E0B;&#x9762;&#x6211;&#x4F1A;&#x5BF9; <code>mode</code> &#x7684;&#x4E24;&#x4E2A;&#x503C; <code>production</code> &#x548C; <code>development</code> &#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#x8BE6;&#x7EC6;&#x7684;&#x8BF4;&#x660E;&#xFF0C;&#x770B;&#x770B; <code>webpack</code> &#x5230;&#x5E95;&#x5077;&#x5077;&#x7ED9;&#x6211;&#x4EEC;&#x5F00;&#x542F;&#x4E86;&#x4EC0;&#x4E48;&#x4F18;&#x5316;&#x3002;</p><h4><code>prod</code> &#x548C; <code>dev</code> &#x76F8;&#x540C;&#x7684;&#x4F18;&#x5316;</h4><p><code>mode: production || development</code> &#x65F6;&#xFF0C;<code>webpack</code> &#x90FD;&#x4F1A;&#x5F00;&#x542F;&#x7684;&#x4F18;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;mode&quot;: &quot;production&quot; || &quot;development&quot;,
  &quot;optimization&quot;: {
    // &#x5982;&#x679C; &#x5B50;&#x6A21;&#x5757; &#x548C; &#x7236;&#x6A21;&#x5757; &#x90FD;&#x52A0;&#x8F7D;&#x4E86;&#x540C;&#x4E00;&#x4E2A; A&#x6A21;&#x5757; &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F00;&#x542F;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x5C06;&#x4F1A;&#x544A;&#x8BC9; webpack &#x8DF3;&#x8FC7;&#x5728; &#x5B50;&#x6A21;&#x5757; &#x4E2D;&#x5BF9; A&#x6A21;&#x5757; &#x7684;&#x68C0;&#x7D22;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x52A0;&#x5FEB;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x3002;
    &quot;removeAvailableModules&quot;: true,
    // webpack &#x5C06;&#x4F1A;&#x4E0D;&#x4F1A;&#x53BB;&#x6253;&#x5305;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x6A21;&#x5757;&#x3002;
    &quot;removeEmptyChunks&quot;: true,
    // &#x544A;&#x8BC9; webpack &#x5408;&#x5E76;&#x4E00;&#x4E9B;&#x5305;&#x542B;&#x4E86;&#x76F8;&#x540C;&#x6A21;&#x5757;&#x7684;&#x6A21;&#x5757;&#x3002;
    &quot;mergeDuplicateChunks&quot;: true,
    // &#x4F1A;&#x5728; process.env.NODE_ENV &#x4E2D;&#x4F20;&#x5165;&#x5F53;&#x524D;&#x7684; mode &#x73AF;&#x5883;&#x3002;
    &quot;nodeEnv&quot;: &quot;production&quot; || &quot;development&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;mode&quot;</span>: <span class="hljs-string">&quot;production&quot;</span> || <span class="hljs-string">&quot;development&quot;</span>,
  <span class="hljs-attr">&quot;optimization&quot;</span>: {
    // &#x5982;&#x679C; &#x5B50;&#x6A21;&#x5757; &#x548C; &#x7236;&#x6A21;&#x5757; &#x90FD;&#x52A0;&#x8F7D;&#x4E86;&#x540C;&#x4E00;&#x4E2A; A&#x6A21;&#x5757; &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F00;&#x542F;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x5C06;&#x4F1A;&#x544A;&#x8BC9; webpack &#x8DF3;&#x8FC7;&#x5728; &#x5B50;&#x6A21;&#x5757; &#x4E2D;&#x5BF9; A&#x6A21;&#x5757; &#x7684;&#x68C0;&#x7D22;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x52A0;&#x5FEB;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x3002;
    <span class="hljs-attr">&quot;removeAvailableModules&quot;</span>: <span class="hljs-literal">true</span>,
    // webpack &#x5C06;&#x4F1A;&#x4E0D;&#x4F1A;&#x53BB;&#x6253;&#x5305;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x6A21;&#x5757;&#x3002;
    <span class="hljs-attr">&quot;removeEmptyChunks&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x544A;&#x8BC9; webpack &#x5408;&#x5E76;&#x4E00;&#x4E9B;&#x5305;&#x542B;&#x4E86;&#x76F8;&#x540C;&#x6A21;&#x5757;&#x7684;&#x6A21;&#x5757;&#x3002;
    <span class="hljs-attr">&quot;mergeDuplicateChunks&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x4F1A;&#x5728; process.env.NODE_ENV &#x4E2D;&#x4F20;&#x5165;&#x5F53;&#x524D;&#x7684; mode &#x73AF;&#x5883;&#x3002;
    <span class="hljs-attr">&quot;nodeEnv&quot;</span>: <span class="hljs-string">&quot;production&quot;</span> || <span class="hljs-string">&quot;development&quot;</span>
  }
}</code></pre><h4><code>prod</code> &#x548C; <code>dev</code> &#x4E0D;&#x540C;&#x7684;&#x4F18;&#x5316;</h4><p><code>mode: production</code> &#x65F6;&#xFF0C;<code>webpack</code> &#x5F00;&#x542F;&#x7684;&#x4F18;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;mode&quot;: &quot;production&quot;,
  &quot;optimization&quot;: {
    // &#x544A;&#x8BC9; webpack &#x786E;&#x5B9A;&#x548C;&#x6807;&#x8BB0;&#x5757;&#xFF0C;&#x8FD9;&#x4E9B;&#x5757;&#x662F;&#x5176;&#x4ED6;&#x5757;&#x7684;&#x5B50;&#x96C6;&#xFF0C;&#x5F53;&#x66F4;&#x5927;&#x7684;&#x5757;&#x5DF2;&#x7ECF;&#x88AB;&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x8FD9;&#x4E9B;&#x5B50;&#x96C6;&#x3002;
    &quot;flagIncludedChunks&quot;: true,
    // &#x544A;&#x8BC9; webpack &#x627E;&#x51FA;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x4F7F;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x5165;&#x53E3; bundle.js &#x6700;&#x5C0F;&#x5316;&#x3002;
    &quot;occurrenceOrder&quot;: true,
    // &#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x4E0B;&#x5BFC;&#x51FA;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x3002;
    &quot;usedExports&quot;: true,
    // &#x544A;&#x8BC9; webpack &#x67E5;&#x627E;&#x53EF;&#x4EE5;&#x5B89;&#x5168;&#x5730;&#x8FDE;&#x63A5;&#x5230;&#x5355;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x6A21;&#x5757;&#x56FE;&#x7684;&#x7247;&#x6BB5;&#x3002;&#x53D6;&#x51B3;&#x4E8E;&#x4F18;&#x5316;&#x3002;
    &quot;concatenateModules&quot;: true,
    // &#x4F7F;&#x7528; UglifyjsWebpackPlugin &#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x3002;
    &quot;minimize&quot;: true
  },
  // &#x6027;&#x80FD;&#x76F8;&#x5173;&#x914D;&#x7F6E;
  &quot;performance&quot;: {
    &quot;hints&quot;: &quot;error&quot;,
    // ...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;mode&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>,
  <span class="hljs-attr">&quot;optimization&quot;</span>: {
    // &#x544A;&#x8BC9; webpack &#x786E;&#x5B9A;&#x548C;&#x6807;&#x8BB0;&#x5757;&#xFF0C;&#x8FD9;&#x4E9B;&#x5757;&#x662F;&#x5176;&#x4ED6;&#x5757;&#x7684;&#x5B50;&#x96C6;&#xFF0C;&#x5F53;&#x66F4;&#x5927;&#x7684;&#x5757;&#x5DF2;&#x7ECF;&#x88AB;&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x8FD9;&#x4E9B;&#x5B50;&#x96C6;&#x3002;
    <span class="hljs-attr">&quot;flagIncludedChunks&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x544A;&#x8BC9; webpack &#x627E;&#x51FA;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x4F7F;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x5165;&#x53E3; bundle.js &#x6700;&#x5C0F;&#x5316;&#x3002;
    <span class="hljs-attr">&quot;occurrenceOrder&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x4E0B;&#x5BFC;&#x51FA;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x3002;
    <span class="hljs-attr">&quot;usedExports&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x544A;&#x8BC9; webpack &#x67E5;&#x627E;&#x53EF;&#x4EE5;&#x5B89;&#x5168;&#x5730;&#x8FDE;&#x63A5;&#x5230;&#x5355;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x6A21;&#x5757;&#x56FE;&#x7684;&#x7247;&#x6BB5;&#x3002;&#x53D6;&#x51B3;&#x4E8E;&#x4F18;&#x5316;&#x3002;
    <span class="hljs-attr">&quot;concatenateModules&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x4F7F;&#x7528; UglifyjsWebpackPlugin &#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x3002;
    <span class="hljs-attr">&quot;minimize&quot;</span>: <span class="hljs-literal">true</span>
  },
  // &#x6027;&#x80FD;&#x76F8;&#x5173;&#x914D;&#x7F6E;
  <span class="hljs-attr">&quot;performance&quot;</span>: {
    <span class="hljs-attr">&quot;hints&quot;</span>: <span class="hljs-string">&quot;error&quot;</span>,
    // ...
  }
}</code></pre><p><code>mode: development</code> &#x65F6;&#xFF0C;<code>webpack</code> &#x5F00;&#x542F;&#x7684;&#x4F18;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;mode&quot;: &quot;development&quot;,
  // &#x751F;&#x6210; source map &#x7684;&#x683C;&#x5F0F;&#x9009;&#x62E9;&#xFF0C;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F71;&#x54CD;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x3002;
  &quot;devtool&quot;: &quot;eval&quot;,
  // &#x7F13;&#x5B58;&#x6A21;&#x5757;&#xFF0C;&#x907F;&#x514D;&#x5728;&#x672A;&#x66F4;&#x6539;&#x65F6;&#x91CD;&#x5EFA;&#x5B83;&#x4EEC;&#x3002;
  &quot;cache&quot;: true,
  &quot;module&quot;: {
    // &#x7F13;&#x5B58;&#x5DF2;&#x89E3;&#x51B3;&#x7684;&#x4F9D;&#x8D56;&#x9879;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x65B0;&#x89E3;&#x6790;&#x5B83;&#x4EEC;&#x3002;
    &quot;unsafeCache&quot;: true
  },
  &quot;output&quot;: {
    // &#x5728; bundle.js &#x4E2D;&#x5F15;&#x5165;&#x9879;&#x76EE;&#x6240;&#x5305;&#x542B;&#x6A21;&#x5757;&#x7684;&#x6CE8;&#x91CA;&#x4FE1;&#x606F;&#x3002;
    &quot;pathinfo&quot;: true
  },
  &quot;optimization&quot;: {
    // &#x5728;&#x53EF;&#x80FD;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x5BFC;&#x51FA;&#x3002;
    &quot;providedExports&quot;: true,
    // &#x627E;&#x5230; chunk &#x4E2D;&#x5171;&#x4EAB;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x53D6;&#x51FA;&#x6765;&#x751F;&#x6210;&#x5355;&#x72EC;&#x7684; chunk&#x3002;
    // &#x8BE5;&#x914D;&#x7F6E;&#x7528;&#x4E8E;&#x4EE3;&#x7801;&#x5206;&#x5272;&#x6253;&#x5305;&#xFF0C;&#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; CommonsChunkPlugin &#x63D2;&#x4EF6;&#x3002;
    &quot;splitChunks&quot;: true,
    // &#x4E3A; webpack &#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x521B;&#x5EFA;&#x5355;&#x72EC;&#x7684; chunk&#x3002;
    &quot;runtimeChunk&quot;: true,
    // &#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x65F6;&#x4E0D;&#x5199;&#x5165;&#x5230;&#x8F93;&#x51FA;&#x3002;
    // &#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; NoEmitOnErrorsPlugin &#x63D2;&#x4EF6;&#x3002;
    &quot;noEmitOnErrors&quot;: true,
    // &#x7ED9;&#x6A21;&#x5757;&#x66F4;&#x6709;&#x610F;&#x4E49;&#x66F4;&#x65B9;&#x4FBF;&#x8C03;&#x8BD5;&#x7684;&#x540D;&#x79F0;&#x3002;
    // &#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; NamedModulesPlugin &#x63D2;&#x4EF6;&#x3002;
    &quot;namedModules&quot;: true,
    // &#x7ED9; chunk &#x66F4;&#x6709;&#x610F;&#x4E49;&#x66F4;&#x65B9;&#x4FBF;&#x8C03;&#x8BD5;&#x7684;&#x540D;&#x79F0;&#x3002;
    &quot;namedChunks&quot;: true,
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;mode&quot;</span>: <span class="hljs-string">&quot;development&quot;</span>,
  // &#x751F;&#x6210; source map &#x7684;&#x683C;&#x5F0F;&#x9009;&#x62E9;&#xFF0C;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F71;&#x54CD;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x3002;
  <span class="hljs-attr">&quot;devtool&quot;</span>: <span class="hljs-string">&quot;eval&quot;</span>,
  // &#x7F13;&#x5B58;&#x6A21;&#x5757;&#xFF0C;&#x907F;&#x514D;&#x5728;&#x672A;&#x66F4;&#x6539;&#x65F6;&#x91CD;&#x5EFA;&#x5B83;&#x4EEC;&#x3002;
  <span class="hljs-attr">&quot;cache&quot;</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">&quot;module&quot;</span>: {
    // &#x7F13;&#x5B58;&#x5DF2;&#x89E3;&#x51B3;&#x7684;&#x4F9D;&#x8D56;&#x9879;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x65B0;&#x89E3;&#x6790;&#x5B83;&#x4EEC;&#x3002;
    <span class="hljs-attr">&quot;unsafeCache&quot;</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">&quot;output&quot;</span>: {
    // &#x5728; bundle.js &#x4E2D;&#x5F15;&#x5165;&#x9879;&#x76EE;&#x6240;&#x5305;&#x542B;&#x6A21;&#x5757;&#x7684;&#x6CE8;&#x91CA;&#x4FE1;&#x606F;&#x3002;
    <span class="hljs-attr">&quot;pathinfo&quot;</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">&quot;optimization&quot;</span>: {
    // &#x5728;&#x53EF;&#x80FD;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x5BFC;&#x51FA;&#x3002;
    <span class="hljs-attr">&quot;providedExports&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x627E;&#x5230; chunk &#x4E2D;&#x5171;&#x4EAB;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x53D6;&#x51FA;&#x6765;&#x751F;&#x6210;&#x5355;&#x72EC;&#x7684; chunk&#x3002;
    // &#x8BE5;&#x914D;&#x7F6E;&#x7528;&#x4E8E;&#x4EE3;&#x7801;&#x5206;&#x5272;&#x6253;&#x5305;&#xFF0C;&#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; CommonsChunkPlugin &#x63D2;&#x4EF6;&#x3002;
    <span class="hljs-attr">&quot;splitChunks&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x4E3A; webpack &#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x521B;&#x5EFA;&#x5355;&#x72EC;&#x7684; chunk&#x3002;
    <span class="hljs-attr">&quot;runtimeChunk&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x65F6;&#x4E0D;&#x5199;&#x5165;&#x5230;&#x8F93;&#x51FA;&#x3002;
    // &#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; NoEmitOnErrorsPlugin &#x63D2;&#x4EF6;&#x3002;
    <span class="hljs-attr">&quot;noEmitOnErrors&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x7ED9;&#x6A21;&#x5757;&#x66F4;&#x6709;&#x610F;&#x4E49;&#x66F4;&#x65B9;&#x4FBF;&#x8C03;&#x8BD5;&#x7684;&#x540D;&#x79F0;&#x3002;
    // &#x53D6;&#x4EE3;&#x4E86;&#x66FE;&#x7ECF;&#x7684; NamedModulesPlugin &#x63D2;&#x4EF6;&#x3002;
    <span class="hljs-attr">&quot;namedModules&quot;</span>: <span class="hljs-literal">true</span>,
    // &#x7ED9; chunk &#x66F4;&#x6709;&#x610F;&#x4E49;&#x66F4;&#x65B9;&#x4FBF;&#x8C03;&#x8BD5;&#x7684;&#x540D;&#x79F0;&#x3002;
    <span class="hljs-attr">&quot;namedChunks&quot;</span>: <span class="hljs-literal">true</span>,
  }
}</code></pre><h2 id="articleHeader4"><code>webpack 4.x</code> &#x57FA;&#x7840;&#x7248;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x8BE6;&#x7EC6;&#x914D;&#x7F6E;</h2><p>&#x57FA;&#x7840;&#x7248;&#x62E5;&#x6709; <code>npm start</code> &#x4E4B;&#x540E; &#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x5E76;&#x4E14;&#x66F4;&#x6539; <code>js</code> &#x4F1A;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x5BF9; <code>ES6</code> &#x8BED;&#x6CD5;&#x7684;&#x8F6C;&#x4E49;&#x4EE5;&#x53CA; <code>css</code> &#x6253;&#x5305;&#xFF0C;<code>image</code> &#x56FE;&#x7247;&#x8F6C;&#x4E3A; <code>dataURL</code> &#x7684;&#x529F;&#x80FD;&#x3002;</p><p>&#x5148;&#x6765;&#x4E00;&#x5957;&#x7EC4;&#x5408;&#x62F3;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5E76;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="md my-webpack-template
cd my-webpack-template
npm init -y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>md <span class="hljs-keyword">my</span>-webpack-template
cd <span class="hljs-keyword">my</span>-webpack-template
npm init -y</code></pre><p>&#x63A5;&#x7740;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF08;&#x5217;&#x51FA;&#x4E3B;&#x8981;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x9488;&#x5BF9; <code>dev</code> &#x73AF;&#x5883;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+---my-webpack-template
|       index.html
|       package.json
+---build
|       utils.js
|       build-server.js
|       webpack.base.conf.js
|       webpack.dev.conf.js
+---config
|       index.js
|       dev.env.js
+---src
|       index.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>+---my-webpack-template
<span class="hljs-string">|       index.html</span>
<span class="hljs-string">|       package.json</span>
+---build
<span class="hljs-string">|       utils.js</span>
<span class="hljs-string">|       build-server.js</span>
<span class="hljs-string">|       webpack.base.conf.js</span>
<span class="hljs-string">|       webpack.dev.conf.js</span>
+---config
<span class="hljs-string">|       index.js</span>
<span class="hljs-string">|       dev.env.js</span>
+---src
<span class="hljs-string">|       index.js</span></code></pre><p>&#x5B89;&#x88C5;&#x6240;&#x9700;&#x4F9D;&#x8D56;&#x3002;</p><p><code>webpack</code> &#x548C; <code>webpack-cli</code> &#x66FE;&#x7ECF;&#x662F;&#x5728;&#x4E00;&#x8D77;&#x7684;&#xFF0C;&#x5728; <code>4.x</code> &#x7248;&#x672C;&#x4E2D;&#x8FDB;&#x884C;&#x4E86;&#x62C6;&#x5206;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x4E0D;&#x597D;&#x597D;&#x540C;&#x65F6;&#x5B89;&#x88C5;&#x4ED6;&#x4EEC;&#x4FE9;&#x662F;&#x4E0D;&#x884C;&#x7684;&#x54E6;&#x3002;</p><blockquote>&#x4E0D;&#x63A8;&#x8350;&#x5168;&#x5C40;&#x5B89;&#x88C5; webpack&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x547D;&#x4EE4;&#x884C;&#x8FD0;&#x884C; webpack &#x7684;&#x65F6;&#x5019;&#x9501;&#x5B9A;&#x7248;&#x672C;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-cli -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code style="word-break:break-word;white-space:initial">npm install webpack webpack-<span class="hljs-keyword">cli</span> -<span class="hljs-built_in">D</span></code></pre><p><code>webpack-dev-server</code> &#x662F;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4F7F;&#x7528;&#x7684;&#x96C6;&#x6210;&#x4E86;&#x4F17;&#x591A;&#x529F;&#x80FD;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x57FA;&#x4E8E; <code>express</code>&#xFF0C;&#x62E5;&#x6709;&#x5373;&#x65F6;&#x7F16;&#x8BD1;&#x4EE3;&#x7801;&#xFF08;<code>webapck-dev-middleware</code>&#xFF09;&#xFF0C;&#x70ED;&#x66F4;&#x65B0;&#xFF08;<code>webpack-hot-middleware</code>&#xFF09;&#xFF0C;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF08;<code>opn</code>&#xFF09;&#xFF0C;&#x5BF9; <code>HTML5</code> &#x4E2D; <code>history</code> &#x505A;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF08;<code>connect-history-api-fallback</code>&#xFF09;&#x7B49;&#x7B49;&#x529F;&#x80FD;&#x3002;</p><blockquote>&#x5BF9;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x5373;&#x65F6;&#x7F16;&#x8BD1;&#x7684;&#x4EE3;&#x7801;&#x4E0D;&#x4F1A;&#x5B58;&#x50A8;&#x5728;&#x786C;&#x76D8;&#x4E2D;&#x800C;&#x662F;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x8FD9;&#x662F;&#x7531; webapck-dev-middleware &#x5B8C;&#x6210;&#x7684;&#x529F;&#x80FD;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -D</code></pre><p>&#x7528;&#x4E8E;&#x5408;&#x5E76; <code>webpack</code> &#x914D;&#x7F6E;&#x7684;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x628A; <code>webpack</code> &#x7684; <code>base</code> &#x914D;&#x7F6E;&#x548C; <code>dev</code> &#x914D;&#x7F6E; &#x548C; <code>prod</code> &#x914D;&#x7F6E;&#x5206;&#x5F00;&#x5199;&#xFF0C;&#x7528;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x5C31;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x5408;&#x5E76; <code>base</code> &#x548C; <code>dev</code> &#x7684;&#x914D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-merge -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> webpack-<span class="hljs-keyword">merge</span> -D</code></pre><p>&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x6253;&#x5305;&#x8FD9;&#x4E2A;&#x8FDB;&#x7A0B;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x6E05;&#x9664;&#x6253;&#x5305;&#x65F6;&#x5019;&#x6B8B;&#x7559;&#x7684;&#x63A7;&#x5236;&#x53F0;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x6253;&#x5305;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x6587;&#x5B57;&#x63D0;&#x793A;&#xFF0C;&#x5F53;&#x7136;&#xFF0C;&#x5BF9;&#x4E8E;&#x6253;&#x5305;&#x9519;&#x8BEF;&#x4E4B;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x4E5F;&#x662F;&#x6709;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install friendly-errors-webpack-plugin -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> friendly-<span class="hljs-keyword">errors</span>-webpack-<span class="hljs-keyword">plugin</span> -D</code></pre><p>&#x8FD9;&#x4E2A;&#x76F8;&#x5BF9;&#x6765;&#x8BF4;&#x5404;&#x4F4D;&#x770B;&#x5B98;&#x5E94;&#x8BE5;&#x7528;&#x7684;&#x5F88;&#x591A;&#x4E86;&#x5427;&#xFF0C;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x4E00;&#x4E2A; <code>html</code> &#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x5728;&#x5E95;&#x90E8;&#x6CE8;&#x5165;&#x901A;&#x8FC7; <code>webpack</code> &#x6253;&#x5305;&#x597D;&#x7684; <code>bundle.js</code> &#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> -D</code></pre><p>&#x4E00;&#x4E2A;&#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7AEF;&#x53E3;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x5F53;&#x4F60;&#x914D;&#x7F6E;&#x7684;&#x7AEF;&#x53E3;&#x88AB;&#x5360;&#x7528;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x4F1A;&#x81EA;&#x52A8;&#x5BFB;&#x627E;&#x4E00;&#x4E2A;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install portfinder -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> portfinder -D</code></pre><h3 id="articleHeader5">&#x914D;&#x7F6E; <code>package.json</code> &#x4E2D;&#x7684;&#x8FD0;&#x884C;&#x811A;&#x672C;</h3><p>&#x63A5;&#x7740;&#xFF0C;&#x5B89;&#x88C5;&#x5B8C;&#x4E86;&#x4F9D;&#x8D56;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x914D;&#x7F6E; <code>npm</code> &#x8FD0;&#x884C;&#x65F6;&#x5019;&#x7684;&#x811A;&#x672C;&#x4E86;&#x3002;</p><blockquote>&#x5F53;&#x4F60;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x76F4;&#x63A5;&#x8F93;&#x5165; <code>webpack</code> &#x62A5;&#x9519;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x786E;&#x4FE1;&#x81EA;&#x5DF1;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x4E86; <code>webpack</code> &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BD5;&#x8BD5;&#x76F4;&#x63A5;&#x914D;&#x7F6E; <code>package.json</code> &#x4E2D;&#x7684; <code>scripts</code>&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x4F60;&#x5B89;&#x88C5;&#x7684;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x7684; <code>webpack</code>&#xFF0C;&#x800C; <code>package.json</code> &#x4E2D;&#x8FD0;&#x884C;&#x7684;&#x811A;&#x672C;&#x5C06;&#x4F18;&#x5148;&#x8BE5;&#x9879;&#x76EE;&#x7684;&#x73AF;&#x5883;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/build-server.js&quot;,
  &quot;start&quot;: &quot;npm run dev&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --progress --config build/build-server.js&quot;</span>,
  <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;npm run dev&quot;</span>
}</code></pre><h3 id="articleHeader6"><code>build/webpack.base.conf.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</h3><p>&#x5148;&#x6765;&#x914D;&#x7F6E; <code>webpack</code> &#x57FA;&#x7840;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x914D;&#x7F6E; <code>prod</code> &#x548C; <code>dev</code> &#x76F8;&#x540C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5C06;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x5199;&#x5728; config/index.js &#x4E2D;&#xFF0C;&#x65B9;&#x4FBF;&#x76F4;&#x63A5;&#x83B7;&#x53D6;
var config = require(&quot;../config&quot;);

// &#x83B7;&#x53D6;&#x9879;&#x76EE;&#x7684;&#x521D;&#x59CB;&#x76EE;&#x5F55;&#xFF0C;&#x5305;&#x88C5;&#x4E86;&#x4E2A;&#x5C0F;&#x51FD;&#x6570;
function resolve(file) {
  return path.resolve(__dirname, &quot;../&quot;, file)
}

module.exports = {
  // webpack &#x5904;&#x7406;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x7684;&#x521D;&#x59CB;&#x76EE;&#x5F55;
  context: resolve(&quot;./&quot;)&#xFF0C;
  // &#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;webapck 4.x &#x9ED8;&#x8BA4;&#x7684;&#x5C31;&#x662F; src/index.js
  entry: {
    app: &quot;./src/index.js&quot;
  }&#xFF0C;
  // &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;
  output: {
    path: config.build.assetsRoot&#xFF0C;
    filename: &quot;[name].js&quot;&#xFF0C;
    publicPath: process.env.NODE_ENV === &quot;production&quot; ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5C06;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x5199;&#x5728; config/index.js &#x4E2D;&#xFF0C;&#x65B9;&#x4FBF;&#x76F4;&#x63A5;&#x83B7;&#x53D6;</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;../config&quot;</span>);

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x9879;&#x76EE;&#x7684;&#x521D;&#x59CB;&#x76EE;&#x5F55;&#xFF0C;&#x5305;&#x88C5;&#x4E86;&#x4E2A;&#x5C0F;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">file</span>) </span>{
  <span class="hljs-keyword">return</span> path.resolve(__dirname, <span class="hljs-string">&quot;../&quot;</span>, file)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// webpack &#x5904;&#x7406;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x7684;&#x521D;&#x59CB;&#x76EE;&#x5F55;</span>
  context: resolve(<span class="hljs-string">&quot;./&quot;</span>)&#xFF0C;
  <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;webapck 4.x &#x9ED8;&#x8BA4;&#x7684;&#x5C31;&#x662F; src/index.js</span>
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">&quot;./src/index.js&quot;</span>
  }&#xFF0C;
  <span class="hljs-comment">// &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;</span>
  output: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot&#xFF0C;
    filename: <span class="hljs-string">&quot;[name].js&quot;</span>&#xFF0C;
    publicPath: process.env.NODE_ENV === <span class="hljs-string">&quot;production&quot;</span> ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}</code></pre><h3 id="articleHeader7"><code>build/webpack.dev.conf.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5C06;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x5199;&#x5728; config/index.js &#x4E2D;&#xFF0C;&#x65B9;&#x4FBF;&#x76F4;&#x63A5;&#x83B7;&#x53D6;
var config = require(&quot;../config&quot;);
var devConfig = config.dev;
// &#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;
var utils = require(&quot;./utils&quot;);
// nodeJs &#x5185;&#x7F6E;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4E13;&#x95E8;&#x7528;&#x6765;&#x89E3;&#x6790;&#x8DEF;&#x5F84;
var path = require(&quot;path&quot;);
// &#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684; webpack
var webpack = require(&quot;webpack&quot;);
var merge = require(&quot;webpack-merge&quot;);
var HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);
var webpackBaseConfig = require(&quot;./webpack.base.conf&quot;);

module.exports = merge(webpackBaseConfig&#xFF0C;{
  // &#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883; mode
  mode: &quot;development&quot;&#xFF0C;
  // &#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x8FD9;&#x662F;&#x4E2A;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5B9A;&#x4F4D;&#x7684;&#x914D;&#x7F6E;
  // &#x4F46;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x4F1A;&#x5F71;&#x54CD;&#x7F16;&#x8BD1;&#x901F;&#x5EA6;&#x548C;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x548C; vue-cli &#x540C;&#x6837;&#x7684;&#x914D;&#x7F6E;
  devtool: devConfig.devtool&#xFF0C;
  // &#x4F7F;&#x7528;&#x4E86; webpack-dev-server &#x4E4B;&#x540E;&#x5C31;&#x9700;&#x8981;&#x6709;&#x7684;&#x914D;&#x7F6E;
  // &#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x8BE6;&#x7EC6;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;
  devServer: {
    // &#x5F53;&#x6211;&#x4EEC;&#x5728; package.json &#x4E2D;&#x4F7F;&#x7528; webpack-dev-server --inline &#x6A21;&#x5F0F;&#x7684;&#x65F6;&#x5019;
    // &#x6211;&#x4EEC;&#x5728; chrome &#x7684;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x7684;&#x63A7;&#x5236;&#x53F0; console &#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4FE1;&#x606F;&#x79CD;&#x7C7B;
    // &#x53EF;&#x9009; none error warning info
    clientLogLevel: &quot;warning&quot;&#xFF0C;
    // &#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#xFF1A;&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x6240;&#x9700;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5728;&#x4F60;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4E07;&#x80FD;&#x56DE;&#x9000;&#x8DEF;&#x7EBF;&#x3002;&#x5982;&#x679C;URL&#x4E0D;&#x5339;&#x914D;&#x4EFB;&#x4F55;&#x9759;&#x6001;&#x8D44;&#x4EA7;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x5E94;&#x8BE5;&#x670D;&#x52A1;&#x4E8E;&#x76F8;&#x540C;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6240;&#x5728;&#x7684;html&#x9875;&#x9762;&#x3002;&#x53C8;&#x6F02;&#x4EAE;! --- by vue-router
    // &#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x5C31;&#x662F;&#x5E94;&#x7528;&#x4E86; connect-history-api-fallback &#x63D2;&#x4EF6;
    // &#x60F3;&#x8C61;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF0C;vue &#x5F00;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x5229;&#x7528; vue-router &#x7684; history &#x6A21;&#x5F0F;&#x8FDB;&#x884C;&#x5355;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x9875;&#x9762;&#x8DF3;&#x8F6C;
    // www.demo.com &#x8DF3;&#x8F6C;&#x53BB; www.demo.com/list
    // &#x770B;&#x8D77;&#x6765;&#x6CA1;&#x6BDB;&#x75C5;&#xFF0C;vue-router &#x4E2D;&#x53EA;&#x8981;&#x914D;&#x7F6E;&#x4E86; list &#x7684;&#x8DEF;&#x7531;&#x5373;&#x53EF;
    // &#x4F46;&#x662F;&#xFF0C;&#x5F53;&#x4F60;&#x5237;&#x65B0;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x53BB;&#x5411;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42; www.demo.com/list &#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x8FD9;&#x60F3;&#x5F53;&#x7136;&#x662F;&#x627E;&#x4E0D;&#x5230;&#x7684;
    // &#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5C31;&#x662F;&#x4F1A;&#x81EA;&#x52A8;&#x6355;&#x83B7;&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5B83;&#x91CD;&#x65B0;&#x5B9A;&#x4F4D;&#x5230; index.html
    historyApiFallback: {
      rewrites: [{
        from: /.*/&#xFF0C;
        to: path.posix.join(devConfig.assetsPublicPath&#xFF0C;&quot;index.html&quot;)
      }]
    }&#xFF0C;
    // webpack &#x6700;&#x6709;&#x7528;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00; --- by webpack
    // &#x70ED;&#x66F4;&#x65B0;&#x88C5;&#x7F6E;&#x542F;&#x52A8;
    hot: true&#xFF0C;
    // &#x544A;&#x8BC9; webpack-dev-server &#x642D;&#x5EFA;&#x670D;&#x52A1;&#x5668;&#x7684;&#x65F6;&#x5019;&#x4ECE;&#x54EA;&#x91CC;&#x83B7;&#x53D6;&#x9759;&#x6001;&#x6587;&#x4EF6;
    // &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C06;&#x4F7F;&#x7528;&#x5F53;&#x524D;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x4F5C;&#x4E3A;&#x63D0;&#x4F9B;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;
    // contentBase: false&#xFF0C;
    // &#x642D;&#x5EFA;&#x7684;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x542F;&#x52A8; gzip &#x538B;&#x7F29;
    compress: true&#xFF0C;
    // &#x642D;&#x5EFA;&#x7684;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x7684; host&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53BB;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7535;&#x8111;&#x7684;&#x5C40;&#x57DF;&#x7F51; ip
    // &#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x4F60;&#x7684;&#x7535;&#x8111;&#x7684; ip &#x5730;&#x5740;&#xFF0C;&#x7136;&#x540E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x5C31;&#x53EF;&#x4EE5;&#x642D;&#x5EFA;&#x5728;&#x5C40;&#x57DF;&#x7F51;&#x91CC;
    // &#x5982;&#x679C;&#x6709;&#x4E00;&#x540C;&#x5F00;&#x53D1;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x5728;&#x540C;&#x4E00;&#x5C40;&#x57DF;&#x7F51;&#x5185;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#x770B;&#x5230;&#x4F60;&#x7684;&#x9875;&#x9762;
    // &#x540C;&#x6837;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E5F;&#x9002;&#x7528;&#x4E8E;&#x624B;&#x673A;&#xFF0C;&#x8FDE;&#x4E0A;&#x540C;&#x4E00;&#x4E2A; wifi &#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x5B9E;&#x65F6;&#x770B;&#x5230;&#x4FEE;&#x6539;&#x7684;&#x6548;&#x679C;
    host: utils.getIPAdress()&#xFF0C;
    // &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x7684;&#x7AEF;&#x53E3;&#x53F7;
    // &#x4F46;&#x662F;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x7528;&#x5230; portfinder &#x63D2;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x771F;&#x7684; config/index.js &#x4E2D;&#x7684;&#x7AEF;&#x53E3;&#x88AB;&#x5360;&#x7528;&#x4E86;
    // &#x90A3;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4F1A;&#x4EE5;&#x8FD9;&#x4E2A;&#x4E3A; basePort &#x53BB;&#x627E;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x88AB;&#x5360;&#x7528;&#x7684;&#x7AEF;&#x53E3;
    port: devConfig.port&#xFF0C;
    // &#x662F;&#x5426;&#x8981;&#x670D;&#x52A1;&#x5668;&#x642D;&#x5EFA;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
    open: devConfig.autoOpenBrowser&#xFF0C;
    // &#x662F;&#x5426;&#x6253;&#x5F00;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#x4E4B;&#x540E;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5168;&#x5C4F;&#x5E55;&#x663E;&#x793A;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x529F;&#x80FD;
    overlay: devConfig.errorOverlay ? {
      warnings: false&#xFF0C;
      errors: true
    } : false&#xFF0C;
    // &#x6B64;&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x53EF;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8BBF;&#x95EE;
    // &#x5047;&#x8BBE;&#x670D;&#x52A1;&#x5668;&#x8FD0;&#x884C;&#x5728; http://localhost:8080 &#x5E76;&#x4E14; output.filename &#x88AB;&#x8BBE;&#x7F6E;&#x4E3A; bundle.js
    // &#x9ED8;&#x8BA4; publicPath &#x662F; &quot;/&quot;&#xFF0C;&#x6240;&#x4EE5; bundle.js &#x53EF;&#x4EE5;&#x901A;&#x8FC7; http://localhost:8080/bundle.js &#x8BBF;&#x95EE;
    publicPath: devConfig.assetsPublicPath&#xFF0C;
    // &#x542F;&#x52A8;&#x63A5;&#x53E3;&#x8BBF;&#x95EE;&#x4EE3;&#x7406;
    proxy: devConfig.proxyTable&#xFF0C;
    // &#x542F;&#x7528; quiet &#x540E;&#xFF0C;&#x9664;&#x4E86;&#x521D;&#x59CB;&#x542F;&#x52A8;&#x4FE1;&#x606F;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;
    // &#x548C; FriendlyErrorsPlugin &#x914D;&#x5408;&#x98DF;&#x7528;&#x66F4;&#x4F73;
    quiet: true&#xFF0C;
    // &#x5F00;&#x542F;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5728; webpack-dev-server &#x548C; webpack-dev-middleware &#x4E2D;&#x662F;&#x9ED8;&#x8BA4;&#x5F00;&#x59CB;&#x7684;
    // watch: true&#xFF0C;
    // &#x5173;&#x4E8E;&#x4E0A;&#x9762; watch &#x7684;&#x4E00;&#x4E9B;&#x9009;&#x9879;&#x914D;&#x7F6E;
    watchOptions: {
      // &#x6392;&#x9664;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#xFF0C;&#x8FD9;&#x6709;&#x5229;&#x4E8E;&#x63D0;&#x9AD8;&#x6027;&#x80FD;
      // &#x8FD9;&#x91CC;&#x6392;&#x9664;&#x4E86; node_modules &#x6587;&#x4EF6;&#x5939;&#x7684;&#x76D1;&#x542C;
      // &#x4F46;&#x662F;&#x8FD9;&#x5728;&#x5E94;&#x5BF9;&#x9700;&#x8981; npm install &#x4E00;&#x4E9B;&#x65B0;&#x7684; module &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x542F;&#x670D;&#x52A1;
      ignored: /node_modules/&#xFF0C;
      // &#x662F;&#x5426;&#x5F00;&#x59CB;&#x8F6E;&#x8BE2;&#xFF0C;&#x6709;&#x7684;&#x65F6;&#x5019;&#x6587;&#x4EF6;&#x5DF2;&#x7ECF;&#x66F4;&#x6539;&#x4E86;&#x4F46;&#x662F;&#x5374;&#x6CA1;&#x6709;&#x88AB;&#x76D1;&#x542C;&#x5230;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x8F6E;&#x8BE2;
      // &#x4F46;&#x662F;&#x6BD4;&#x8F83;&#x6D88;&#x8017;&#x6027;&#x80FD;&#xFF0C;&#x9009;&#x62E9;&#x5173;&#x95ED;
      poll: devConfig.poll
    }
  }&#xFF0C;
  plugins: [
    // &#x8FD9;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;
    // &#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x6587;&#x672C;&#x66FF;&#x6362;&#xFF0C;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#x5FC5;&#x987B;&#x5305;&#x542B;&#x5B57;&#x7B26;&#x4E32;&#x672C;&#x8EAB;&#x5185;&#x7684;&#x5B9E;&#x9645;&#x5F15;&#x53F7; --- by webpack
    // &#x6240;&#x4EE5;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x7528;
    // &quot;process.env&quot;: JSON.stringify(&apos;development&apos;)
    // &#x6216;&#x8005;
    // &quot;process.env&quot;: &apos;&quot;development&quot;&apos;
    new webpack.DefinePlugin({
      &quot;process.env&quot;: require(&quot;../config/dev.env&quot;)
    })&#xFF0C;
    // &#x5F00;&#x542F;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684;&#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;
    new webpack.HotModuleReplacementPlugin()&#xFF0C;
    // &#x4F7F;&#x7528;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#xFF08;&#x8BCD;&#x7A77;&#xFF09;&#x7684; html-webpack-plugin &#x6A21;&#x677F;&#x63D2;&#x4EF6;
    new HtmlWebpackPlugin({
      // &#x8F93;&#x51FA;&#x7684; html &#x6587;&#x4EF6;&#x7684;&#x540D;&#x5B57;
      filename: &quot;index.html&quot;&#xFF0C;
      // &#x4F7F;&#x7528;&#x7684; html &#x6A21;&#x677F;&#x540D;&#x5B57;
      template: &quot;index.html&quot;&#xFF0C;
      // &#x662F;&#x5426;&#x8981;&#x63D2;&#x5165; weback &#x6253;&#x5305;&#x597D;&#x7684; bundle.js &#x6587;&#x4EF6;
      inject: true
    })
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5C06;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x5199;&#x5728; config/index.js &#x4E2D;&#xFF0C;&#x65B9;&#x4FBF;&#x76F4;&#x63A5;&#x83B7;&#x53D6;</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;../config&quot;</span>);
<span class="hljs-keyword">var</span> devConfig = config.dev;
<span class="hljs-comment">// &#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./utils&quot;</span>);
<span class="hljs-comment">// nodeJs &#x5185;&#x7F6E;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4E13;&#x95E8;&#x7528;&#x6765;&#x89E3;&#x6790;&#x8DEF;&#x5F84;</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;path&quot;</span>);
<span class="hljs-comment">// &#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684; webpack</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack&quot;</span>);
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack-merge&quot;</span>);
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>);
<span class="hljs-keyword">var</span> webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.base.conf&quot;</span>);

<span class="hljs-built_in">module</span>.exports = merge(webpackBaseConfig&#xFF0C;{
  <span class="hljs-comment">// &#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883; mode</span>
  mode: <span class="hljs-string">&quot;development&quot;</span>&#xFF0C;
  <span class="hljs-comment">// &#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x8FD9;&#x662F;&#x4E2A;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5B9A;&#x4F4D;&#x7684;&#x914D;&#x7F6E;</span>
  <span class="hljs-comment">// &#x4F46;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x4F1A;&#x5F71;&#x54CD;&#x7F16;&#x8BD1;&#x901F;&#x5EA6;&#x548C;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x548C; vue-cli &#x540C;&#x6837;&#x7684;&#x914D;&#x7F6E;</span>
  devtool: devConfig.devtool&#xFF0C;
  <span class="hljs-comment">// &#x4F7F;&#x7528;&#x4E86; webpack-dev-server &#x4E4B;&#x540E;&#x5C31;&#x9700;&#x8981;&#x6709;&#x7684;&#x914D;&#x7F6E;</span>
  <span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x8BE6;&#x7EC6;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;</span>
  devServer: {
    <span class="hljs-comment">// &#x5F53;&#x6211;&#x4EEC;&#x5728; package.json &#x4E2D;&#x4F7F;&#x7528; webpack-dev-server --inline &#x6A21;&#x5F0F;&#x7684;&#x65F6;&#x5019;</span>
    <span class="hljs-comment">// &#x6211;&#x4EEC;&#x5728; chrome &#x7684;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x7684;&#x63A7;&#x5236;&#x53F0; console &#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4FE1;&#x606F;&#x79CD;&#x7C7B;</span>
    <span class="hljs-comment">// &#x53EF;&#x9009; none error warning info</span>
    clientLogLevel: <span class="hljs-string">&quot;warning&quot;</span>&#xFF0C;
    <span class="hljs-comment">// &#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#xFF1A;&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x6240;&#x9700;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5728;&#x4F60;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4E07;&#x80FD;&#x56DE;&#x9000;&#x8DEF;&#x7EBF;&#x3002;&#x5982;&#x679C;URL&#x4E0D;&#x5339;&#x914D;&#x4EFB;&#x4F55;&#x9759;&#x6001;&#x8D44;&#x4EA7;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x5E94;&#x8BE5;&#x670D;&#x52A1;&#x4E8E;&#x76F8;&#x540C;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6240;&#x5728;&#x7684;html&#x9875;&#x9762;&#x3002;&#x53C8;&#x6F02;&#x4EAE;! --- by vue-router</span>
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x5C31;&#x662F;&#x5E94;&#x7528;&#x4E86; connect-history-api-fallback &#x63D2;&#x4EF6;</span>
    <span class="hljs-comment">// &#x60F3;&#x8C61;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF0C;vue &#x5F00;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x5229;&#x7528; vue-router &#x7684; history &#x6A21;&#x5F0F;&#x8FDB;&#x884C;&#x5355;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x9875;&#x9762;&#x8DF3;&#x8F6C;</span>
    <span class="hljs-comment">// www.demo.com &#x8DF3;&#x8F6C;&#x53BB; www.demo.com/list</span>
    <span class="hljs-comment">// &#x770B;&#x8D77;&#x6765;&#x6CA1;&#x6BDB;&#x75C5;&#xFF0C;vue-router &#x4E2D;&#x53EA;&#x8981;&#x914D;&#x7F6E;&#x4E86; list &#x7684;&#x8DEF;&#x7531;&#x5373;&#x53EF;</span>
    <span class="hljs-comment">// &#x4F46;&#x662F;&#xFF0C;&#x5F53;&#x4F60;&#x5237;&#x65B0;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x53BB;&#x5411;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42; www.demo.com/list &#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x8FD9;&#x60F3;&#x5F53;&#x7136;&#x662F;&#x627E;&#x4E0D;&#x5230;&#x7684;</span>
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5C31;&#x662F;&#x4F1A;&#x81EA;&#x52A8;&#x6355;&#x83B7;&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5B83;&#x91CD;&#x65B0;&#x5B9A;&#x4F4D;&#x5230; index.html</span>
    historyApiFallback: {
      <span class="hljs-attr">rewrites</span>: [{
        <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>&#xFF0C;
        to: path.posix.join(devConfig.assetsPublicPath&#xFF0C;<span class="hljs-string">&quot;index.html&quot;</span>)
      }]
    }&#xFF0C;
    <span class="hljs-comment">// webpack &#x6700;&#x6709;&#x7528;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00; --- by webpack</span>
    <span class="hljs-comment">// &#x70ED;&#x66F4;&#x65B0;&#x88C5;&#x7F6E;&#x542F;&#x52A8;</span>
    hot: <span class="hljs-literal">true</span>&#xFF0C;
    <span class="hljs-comment">// &#x544A;&#x8BC9; webpack-dev-server &#x642D;&#x5EFA;&#x670D;&#x52A1;&#x5668;&#x7684;&#x65F6;&#x5019;&#x4ECE;&#x54EA;&#x91CC;&#x83B7;&#x53D6;&#x9759;&#x6001;&#x6587;&#x4EF6;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C06;&#x4F7F;&#x7528;&#x5F53;&#x524D;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x4F5C;&#x4E3A;&#x63D0;&#x4F9B;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;</span>
    <span class="hljs-comment">// contentBase: false&#xFF0C;</span>
    <span class="hljs-comment">// &#x642D;&#x5EFA;&#x7684;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x542F;&#x52A8; gzip &#x538B;&#x7F29;</span>
    compress: <span class="hljs-literal">true</span>&#xFF0C;
    <span class="hljs-comment">// &#x642D;&#x5EFA;&#x7684;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x7684; host&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53BB;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7535;&#x8111;&#x7684;&#x5C40;&#x57DF;&#x7F51; ip</span>
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x4F60;&#x7684;&#x7535;&#x8111;&#x7684; ip &#x5730;&#x5740;&#xFF0C;&#x7136;&#x540E;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x5C31;&#x53EF;&#x4EE5;&#x642D;&#x5EFA;&#x5728;&#x5C40;&#x57DF;&#x7F51;&#x91CC;</span>
    <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x4E00;&#x540C;&#x5F00;&#x53D1;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x5728;&#x540C;&#x4E00;&#x5C40;&#x57DF;&#x7F51;&#x5185;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5730;&#x5740;&#x770B;&#x5230;&#x4F60;&#x7684;&#x9875;&#x9762;</span>
    <span class="hljs-comment">// &#x540C;&#x6837;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E5F;&#x9002;&#x7528;&#x4E8E;&#x624B;&#x673A;&#xFF0C;&#x8FDE;&#x4E0A;&#x540C;&#x4E00;&#x4E2A; wifi &#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x5B9E;&#x65F6;&#x770B;&#x5230;&#x4FEE;&#x6539;&#x7684;&#x6548;&#x679C;</span>
    host: utils.getIPAdress()&#xFF0C;
    <span class="hljs-comment">// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x7684;&#x7AEF;&#x53E3;&#x53F7;</span>
    <span class="hljs-comment">// &#x4F46;&#x662F;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x7528;&#x5230; portfinder &#x63D2;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x771F;&#x7684; config/index.js &#x4E2D;&#x7684;&#x7AEF;&#x53E3;&#x88AB;&#x5360;&#x7528;&#x4E86;</span>
    <span class="hljs-comment">// &#x90A3;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4F1A;&#x4EE5;&#x8FD9;&#x4E2A;&#x4E3A; basePort &#x53BB;&#x627E;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x88AB;&#x5360;&#x7528;&#x7684;&#x7AEF;&#x53E3;</span>
    port: devConfig.port&#xFF0C;
    <span class="hljs-comment">// &#x662F;&#x5426;&#x8981;&#x670D;&#x52A1;&#x5668;&#x642D;&#x5EFA;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
    open: devConfig.autoOpenBrowser&#xFF0C;
    <span class="hljs-comment">// &#x662F;&#x5426;&#x6253;&#x5F00;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#x4E4B;&#x540E;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5168;&#x5C4F;&#x5E55;&#x663E;&#x793A;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x529F;&#x80FD;</span>
    overlay: devConfig.errorOverlay ? {
      <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>&#xFF0C;
      errors: <span class="hljs-literal">true</span>
    } : <span class="hljs-literal">false</span>&#xFF0C;
    <span class="hljs-comment">// &#x6B64;&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x53EF;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8BBF;&#x95EE;</span>
    <span class="hljs-comment">// &#x5047;&#x8BBE;&#x670D;&#x52A1;&#x5668;&#x8FD0;&#x884C;&#x5728; http://localhost:8080 &#x5E76;&#x4E14; output.filename &#x88AB;&#x8BBE;&#x7F6E;&#x4E3A; bundle.js</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4; publicPath &#x662F; &quot;/&quot;&#xFF0C;&#x6240;&#x4EE5; bundle.js &#x53EF;&#x4EE5;&#x901A;&#x8FC7; http://localhost:8080/bundle.js &#x8BBF;&#x95EE;</span>
    publicPath: devConfig.assetsPublicPath&#xFF0C;
    <span class="hljs-comment">// &#x542F;&#x52A8;&#x63A5;&#x53E3;&#x8BBF;&#x95EE;&#x4EE3;&#x7406;</span>
    proxy: devConfig.proxyTable&#xFF0C;
    <span class="hljs-comment">// &#x542F;&#x7528; quiet &#x540E;&#xFF0C;&#x9664;&#x4E86;&#x521D;&#x59CB;&#x542F;&#x52A8;&#x4FE1;&#x606F;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;</span>
    <span class="hljs-comment">// &#x548C; FriendlyErrorsPlugin &#x914D;&#x5408;&#x98DF;&#x7528;&#x66F4;&#x4F73;</span>
    quiet: <span class="hljs-literal">true</span>&#xFF0C;
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5728; webpack-dev-server &#x548C; webpack-dev-middleware &#x4E2D;&#x662F;&#x9ED8;&#x8BA4;&#x5F00;&#x59CB;&#x7684;</span>
    <span class="hljs-comment">// watch: true&#xFF0C;</span>
    <span class="hljs-comment">// &#x5173;&#x4E8E;&#x4E0A;&#x9762; watch &#x7684;&#x4E00;&#x4E9B;&#x9009;&#x9879;&#x914D;&#x7F6E;</span>
    watchOptions: {
      <span class="hljs-comment">// &#x6392;&#x9664;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#xFF0C;&#x8FD9;&#x6709;&#x5229;&#x4E8E;&#x63D0;&#x9AD8;&#x6027;&#x80FD;</span>
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x6392;&#x9664;&#x4E86; node_modules &#x6587;&#x4EF6;&#x5939;&#x7684;&#x76D1;&#x542C;</span>
      <span class="hljs-comment">// &#x4F46;&#x662F;&#x8FD9;&#x5728;&#x5E94;&#x5BF9;&#x9700;&#x8981; npm install &#x4E00;&#x4E9B;&#x65B0;&#x7684; module &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x542F;&#x670D;&#x52A1;</span>
      ignored: <span class="hljs-regexp">/node_modules/</span>&#xFF0C;
      <span class="hljs-comment">// &#x662F;&#x5426;&#x5F00;&#x59CB;&#x8F6E;&#x8BE2;&#xFF0C;&#x6709;&#x7684;&#x65F6;&#x5019;&#x6587;&#x4EF6;&#x5DF2;&#x7ECF;&#x66F4;&#x6539;&#x4E86;&#x4F46;&#x662F;&#x5374;&#x6CA1;&#x6709;&#x88AB;&#x76D1;&#x542C;&#x5230;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x8F6E;&#x8BE2;</span>
      <span class="hljs-comment">// &#x4F46;&#x662F;&#x6BD4;&#x8F83;&#x6D88;&#x8017;&#x6027;&#x80FD;&#xFF0C;&#x9009;&#x62E9;&#x5173;&#x95ED;</span>
      poll: devConfig.poll
    }
  }&#xFF0C;
  plugins: [
    <span class="hljs-comment">// &#x8FD9;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
    <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x6587;&#x672C;&#x66FF;&#x6362;&#xFF0C;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#x5FC5;&#x987B;&#x5305;&#x542B;&#x5B57;&#x7B26;&#x4E32;&#x672C;&#x8EAB;&#x5185;&#x7684;&#x5B9E;&#x9645;&#x5F15;&#x53F7; --- by webpack</span>
    <span class="hljs-comment">// &#x6240;&#x4EE5;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x7528;</span>
    <span class="hljs-comment">// &quot;process.env&quot;: JSON.stringify(&apos;development&apos;)</span>
    <span class="hljs-comment">// &#x6216;&#x8005;</span>
    <span class="hljs-comment">// &quot;process.env&quot;: &apos;&quot;development&quot;&apos;</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">&quot;process.env&quot;</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;../config/dev.env&quot;</span>)
    })&#xFF0C;
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684;&#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()&#xFF0C;
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#xFF08;&#x8BCD;&#x7A77;&#xFF09;&#x7684; html-webpack-plugin &#x6A21;&#x677F;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-comment">// &#x8F93;&#x51FA;&#x7684; html &#x6587;&#x4EF6;&#x7684;&#x540D;&#x5B57;</span>
      filename: <span class="hljs-string">&quot;index.html&quot;</span>&#xFF0C;
      <span class="hljs-comment">// &#x4F7F;&#x7528;&#x7684; html &#x6A21;&#x677F;&#x540D;&#x5B57;</span>
      template: <span class="hljs-string">&quot;index.html&quot;</span>&#xFF0C;
      <span class="hljs-comment">// &#x662F;&#x5426;&#x8981;&#x63D2;&#x5165; weback &#x6253;&#x5305;&#x597D;&#x7684; bundle.js &#x6587;&#x4EF6;</span>
      inject: <span class="hljs-literal">true</span>
    })
  ]
})</code></pre><h3 id="articleHeader8"><code>build/build-server.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x66F4;&#x53CB;&#x597D;&#x7684;&#x63D0;&#x793A;&#x63D2;&#x4EF6;
var FriendlyErrorsPlugin = require(&quot;friendly-errors-webpack-plugin&quot;);
// &#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x53EF;&#x7528;&#x7684; port &#x7684;&#x63D2;&#x4EF6;
var portfinder = require(&quot;portfinder&quot;);
var devWebpackConfig = require(&quot;./webpack.dev.conf&quot;);

// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A; promise &#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x8BA9; wepback &#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;
// &#x5E76;&#x5728; resolve &#x7684;&#x65F6;&#x5019;&#x8FD0;&#x884C; &#x8FD9;&#x4E2A;&#x914D;&#x7F6E;
// &#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x7528;&#x5230;&#x4E86; portfinder &#x548C; friendly-errors-webpack-plugin
module.exports = new Promise((resolve&#xFF0C;reject) =&gt; {
  // &#x8BBE;&#x7F6E;&#x63D2;&#x4EF6;&#x7684;&#x521D;&#x59CB;&#x641C;&#x5BFB;&#x7AEF;&#x53E3;&#x53F7;
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err&#xFF0C;port) =&gt; {
    if (err) reject(err)
    else {
      // &#x8FD9;&#x91CC;&#x5C31;&#x5229;&#x7528; portfinder &#x5F97;&#x5230;&#x4E86;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7684;&#x7AEF;&#x53E3;
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // &#x6E05;&#x9664;&#x63A7;&#x5236;&#x53F0;&#x539F;&#x6709;&#x7684;&#x4FE1;&#x606F;
        clearConsole: true&#xFF0C;
        // &#x6253;&#x5305;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x7ED9;&#x4E88;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x63D0;&#x793A;
        compilationSuccessInfo: {
          messages: [`&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x542F;&#x52A8;&#x6210;&#x529F;&#xFF0C;&#x9879;&#x76EE;&#x8FD0;&#x884C;&#x5728;: http://${devWebpackConfig.devServer.host}:${port}`]
        }&#xFF0C;
        // &#x6253;&#x5305;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;
        onErrors: () =&gt; { console.log(&quot;&#x6253;&#x5305;&#x5931;&#x8D25;&quot;) }
      }))
      resolve(devWebpackConfig)
    }
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x66F4;&#x53CB;&#x597D;&#x7684;&#x63D0;&#x793A;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">var</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;friendly-errors-webpack-plugin&quot;</span>);
<span class="hljs-comment">// &#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x53EF;&#x7528;&#x7684; port &#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">var</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;portfinder&quot;</span>);
<span class="hljs-keyword">var</span> devWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./webpack.dev.conf&quot;</span>);

<span class="hljs-comment">// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A; promise &#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;&#x8BA9; wepback &#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x7684;&#x914D;&#x7F6E;</span>
<span class="hljs-comment">// &#x5E76;&#x5728; resolve &#x7684;&#x65F6;&#x5019;&#x8FD0;&#x884C; &#x8FD9;&#x4E2A;&#x914D;&#x7F6E;</span>
<span class="hljs-comment">// &#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x7528;&#x5230;&#x4E86; portfinder &#x548C; friendly-errors-webpack-plugin</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve&#xFF0C;reject</span>) =&gt;</span> {
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x63D2;&#x4EF6;&#x7684;&#x521D;&#x59CB;&#x641C;&#x5BFB;&#x7AEF;&#x53E3;&#x53F7;</span>
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort(<span class="hljs-function">(<span class="hljs-params">err&#xFF0C;port</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) reject(err)
    <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C31;&#x5229;&#x7528; portfinder &#x5F97;&#x5230;&#x4E86;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7684;&#x7AEF;&#x53E3;</span>
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(<span class="hljs-keyword">new</span> FriendlyErrorsPlugin({
        <span class="hljs-comment">// &#x6E05;&#x9664;&#x63A7;&#x5236;&#x53F0;&#x539F;&#x6709;&#x7684;&#x4FE1;&#x606F;</span>
        clearConsole: <span class="hljs-literal">true</span>&#xFF0C;
        <span class="hljs-comment">// &#x6253;&#x5305;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x7ED9;&#x4E88;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x63D0;&#x793A;</span>
        compilationSuccessInfo: {
          <span class="hljs-attr">messages</span>: [<span class="hljs-string">`&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x542F;&#x52A8;&#x6210;&#x529F;&#xFF0C;&#x9879;&#x76EE;&#x8FD0;&#x884C;&#x5728;: http://<span class="hljs-subst">${devWebpackConfig.devServer.host}</span>:<span class="hljs-subst">${port}</span>`</span>]
        }&#xFF0C;
        <span class="hljs-comment">// &#x6253;&#x5305;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;</span>
        onErrors: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6253;&#x5305;&#x5931;&#x8D25;&quot;</span>) }
      }))
      resolve(devWebpackConfig)
    }
  })
})</code></pre><h3 id="articleHeader9">&#x7F16;&#x8BD1;&#x51FA;&#x9519;&#x4E86;&#xFF1F;&#x770B;&#x770B;&#x8FD9;&#x91CC;</h3><blockquote>&#x5982;&#x679C;&#x4F60;&#x53D1;&#x73B0;&#x76F4;&#x63A5;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6267;&#x884C; <code>webpack</code> &#x62A5;&#x9519;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x786E;&#x5B9E;&#x6267;&#x884C;&#x4E86; <code>npm install</code>&#xFF0C;&#x90A3;&#x662F;&#x56E0;&#x4E3A;&#x4F60;&#x6CA1;&#x6709;&#x5B89;&#x88C5;&#x5168;&#x5C40;&#x7684; <code>webpack&#x3002;</code></blockquote><ul><li><p>&#x53EF;&#x4EE5;&#x6267;&#x884C; <code>.\node_modules\.bin\webpack --config webpack.config.js</code></p><ul><li>&#x8C03;&#x7528;&#x8BE5;&#x9879;&#x76EE; <code>node_modules</code> &#x4E0B;&#x7684; <code>webpack</code></li></ul></li><li><p>&#x4F7F;&#x7528; <code>package.json</code> &#x914D;&#x7F6E;&#x8BA9; <code>npm</code> &#x53BB;&#x627E;&#x8BE5;&#x9879;&#x76EE;&#x4E2D;&#x7684; <code>webpack</code></p><ul><li><code>package.json &gt; scripts.build: webapck</code></li></ul></li></ul><blockquote><code>DeprecationWarning: Tapable.plugin is deprecated. Use new API on &apos;.hooks&apos; instead</code></blockquote><p>&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#x4F1A;&#x53D1;&#x751F;&#x5728;&#x4F60;&#x4F7F;&#x7528;&#x7684;&#x63D2;&#x4EF6;&#x6CA1;&#x6709;&#x9488;&#x5BF9; webpack 4.x &#x5347;&#x7EA7;&#x3002;<br>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53EA;&#x80FD;&#x53BB; <code>github</code> &#x63D0; <code>issue</code> &#x6216;&#x8005;&#x6362;&#x4E00;&#x4E2A; <code>plugin</code> &#x4E86;&#x3002;</p><blockquote>&#x8FD8;&#x53D1;&#x73B0;&#x4E86;&#x5176;&#x4ED6;&#x7684;&#x9519;&#xFF1F;&#x8BF7;&#x76F4;&#x63A5;&#x79C1;&#x4FE1;&#x6211;&#xFF0C;&#x6216;&#x8005;&#x5728;&#x8BC4;&#x8BBA;&#x4E2D;&#x7559;&#x8A00;&#x3002;</blockquote><h2 id="articleHeader10">&#x540E;&#x8BED;</h2><p>&#x5E0C;&#x671B;&#x81EA;&#x5DF1;&#x6240;&#x505A;&#x7684;&#x4E00;&#x4E9B;&#x5FAE;&#x5C0F;&#x7684;&#x4E8B;&#x60C5;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#x5728;&#x6F2B;&#x6F2B;&#x524D;&#x7AEF;&#x8DEF;&#x4E2D;&#x66F4;&#x4E0A;&#x4E00;&#x5C42;&#x697C;&#xFF0C;&#x53E6;&#x5916;&#xFF0C;&#x5468;&#x672B;&#x4E86;&#x4E0D;&#x8981;&#x592A;&#x6C89;&#x8FF7;&#x4E8E;&#x6572;&#x4EE3;&#x7801;&#xFF0C;&#x591A;&#x51FA;&#x53BB;&#x8D70;&#x8D70;&#xFF0C;&#x6563;&#x6563;&#x6B65;&#xFF0C;&#x8FD0;&#x52A8;&#x8FD0;&#x52A8;&#xFF0C;&#x7ED9;&#x81EA;&#x5DF1;&#x7684;&#x4E00;&#x5468;&#x5145;&#x5B9E;&#x7684;&#x5927;&#x8111;&#x653E;&#x4E2A;&#x7A7A;&#x3002;</p><p>&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x7684;&#x4E0D;&#x5BF9;&#xFF0C;&#x8BF7;&#x4E0D;&#x8981;&#x72B9;&#x8C6B;&#xFF0C;&#x76F4;&#x63A5; diss &#x6211; =3=</p><p>&#x4EE3;&#x7801;&#x5982;&#x4EBA;&#x751F;&#xFF0C;&#x6211;&#x7518;&#x4E4B;&#x5982;&#x9974;&#x3002;</p><p>&#x6211;&#x5728;&#x8FD9;&#x91CC; <a href="https://github.com/jsjzh" rel="nofollow noreferrer" target="_blank">gayhub@jsjzh</a> &#x6B22;&#x8FCE;&#x6765;&#x627E;&#x6211;&#x73A9;&#x513F;</p><blockquote>&#x5411;&#x524D;&#x770B;&#x5C31;&#x662F;&#x672A;&#x6765;&#xFF0C;&#x5411;&#x540E;&#x770B;&#x5C31;&#x662F;&#x8FC7;&#x53BB;&#xFF0C;&#x4ECE;&#x4E2D;&#x53D6;&#x4E00;&#x6BB5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x6545;&#x4E8B;&#xFF0C;&#x800C;&#x8FD9;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x90A3;&#x6837;&#x7684;&#x6545;&#x4E8B;&#x4E2D;&#x5F88;&#x5C0F;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x800C;&#x5DF2;&#x3002;--- &#x7070;&#x8272;&#x7684;&#x679C;&#x5B9E;</blockquote><h2 id="articleHeader11">&#x5927;&#x7EB2;</h2><ul><li><p><code>webpack 4.x</code> &#x7684;&#x90A3;&#x4E9B;&#x65B0;&#x73A9;&#x610F;&#x513F;&#xFF08;DONE&#xFF09;</p><ul><li><code>mode</code></li><li><code>optimization</code></li></ul></li><li><p><code>webpack 4.x</code> &#x57FA;&#x7840;&#x7248;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x8BE6;&#x7EC6;&#x914D;&#x7F6E;&#xFF08;DONE&#xFF09;</p><ul><li><code>package.json</code> &#x4E2D;&#x7684; <code>devDependencies</code></li><li><code>package.json</code> &#x4E2D;&#x7684; <code>scripts</code></li><li><code>build/webpack.base.conf.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</li><li><code>build/webpack.dev.conf.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</li><li><code>build/build-server.js</code> &#x914D;&#x7F6E;&#x8BE6;&#x89E3;</li></ul></li><li><p><code>webpack 4.x</code> &#x5347;&#x7EA7;&#x7248;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x8BE6;&#x7EC6;&#x914D;&#x7F6E;&#xFF08;TODO&#xFF09;[&#x5206;&#x7BC7;]</p><ul><li>&#x5229;&#x7528; <code>babel</code> &#x8F6C;&#x6362; <code>ES6</code> &#x8BED;&#x6CD5;</li><li>&#x5C06; <code>img</code> &#x8F6C;&#x4E3A; <code>dataURL</code></li><li>&#x6253;&#x5305; <code>css</code></li><li>&#x4F7F;&#x7528; <code>vue-loader</code> &#x6216;&#x5176;&#x4ED6; <code>loader</code> &#x6765;&#x5B8C;&#x6210;&#x66F4;&#x591A;</li><li>&#x81EA;&#x5DF1;&#x52A8;&#x624B;&#x5F00;&#x53D1;&#x4E00;&#x4E2A; <code>webpack-plugin</code></li></ul></li><li><code>webpack 4.x</code> &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x8BE6;&#x7EC6;&#x914D;&#x7F6E;&#xFF08;TODO&#xFF09;[&#x5206;&#x7BC7;]</li><li><p><code>webpack</code> &#x914D;&#x7F6E;&#x4F18;&#x5316;&#xFF08;TODO&#xFF09;[&#x5206;&#x7BC7;]</p><ul><li>&#x6253;&#x5305;&#x901F;&#x5EA6;&#x4F18;&#x5316;</li><li>&#x6253;&#x5305;&#x4F53;&#x79EF;&#x4F18;&#x5316;</li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一份比较详细的 webpack 4.x 手工配置基础开发环境 附源码

## 原文链接
[https://segmentfault.com/a/1190000015724077](https://segmentfault.com/a/1190000015724077)

