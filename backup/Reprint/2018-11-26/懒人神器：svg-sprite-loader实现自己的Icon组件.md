---
title: '懒人神器：svg-sprite-loader实现自己的Icon组件' 
date: 2018-11-26 2:30:10
hidden: true
slug: 6enix6w2l7o
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x7528; svg-sprite-loader &#x89E3;&#x653E;&#x4F60;&#x7684;icon.</blockquote><p>&#x597D;&#x5427;&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x8D77;&#x6E90;&#x5C31;&#x6765;&#x6E90;&#x4E8E;&#x2014;&#x2014;&#x6211;&#x61D2;&#x3002;</p><p>UI&#x5C0F;&#x59D0;&#x59D0;&#x8BBE;&#x8BA1;&#x4E86;&#x81EA;&#x5DF1;&#x7684;icon&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4E0D;&#x60F3;&#x6BCF;&#x6B21;&#x5F15;&#x5165;icon&#x7684;&#x65F6;&#x5019;&#x90FD;&#x5199;&#x4E00;&#x5927;&#x5806;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img src=&quot;/long/path/to/your/svg/icon.svg&quot; /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/long/path/to/your/svg/icon.svg&quot;</span> /&gt;</span></code></pre><p>&#x5F88;&#x957F;&#x5F88;&#x957F;&#x7684;&#x5730;&#x5740;&#x2026;&#x6211;&#x89C9;&#x5F97;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5F62;&#x5F0F;&#x8FD8;&#x662F;&#x50CF;&#x997F;&#x4E86;&#x4E48;&#x90A3;&#x4E9B;UI&#x5E93;&#x4E00;&#x6837;&#xFF0C;&#x76F4;&#x63A5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;el-icon name=&quot;icon-file-name&quot;&gt;&lt;/el-icon&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">el-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;icon-file-name&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-icon</span>&gt;</span></code></pre><p>&#x5199;&#x4E2A;&#x6587;&#x4EF6;&#x540D;&#x5C31;&#x80FD;&#x5F15;&#x5165;&#x6211;&#x7684;icon&#x4E86;&#x3002;</p><p>OK, &#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x7406;&#x60F3;&#x6A21;&#x5F0F;&#x3002;So, let&#x2019;s go!</p><h2 id="articleHeader0">&#x5DE5;&#x4F5C;&#x539F;&#x7406;</h2><p>&#x7F51;&#x4E0A;&#x641C;&#x5BFB;&#x4E86;&#x4E00;&#x5708;&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F; &#x2014;&#x2014; svg &#x96EA;&#x78A7;&#x56FE;&#x3002;</p><p>&#x5B83;&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x662F;: <strong>&#x5229;&#x7528;svg&#x7684;<code>symbol</code>&#x5143;&#x7D20;&#xFF0C;&#x5C06;&#x6BCF;&#x4E2A;icon&#x5305;&#x62EC;&#x5728;<code>symbol</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>use</code>&#x5143;&#x7D20;&#x4F7F;&#x7528;&#x8BE5;<code>symbol</code></strong>.</p><p>OK&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x6B64;&#x4E0D;&#x4E86;&#x89E3;&#xFF0C;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;&#x5F20;&#x946B;&#x65ED;&#x8001;&#x5E08;&#x7684;<a href="https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a>.</p><p>&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x4E00;&#x70B9;&#x7684;&#x89E3;&#x91CA;&#x5C31;&#x662F;&#xFF0C;&#x6700;&#x7EC8;&#x4F60;&#x7684;svg icon&#x4F1A;&#x53D8;&#x6210;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684; svg &#x96EA;&#x78A7;&#x56FE;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; id=&quot;__SVG_SPRITE_NODE__&quot;&gt;
    &lt;symbol class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; id=&quot;icon&#x540D;&quot;&gt;"{{"&#x7701;&#x7565;&#x7684;icon path"}}"&lt;/symbol&gt;
    &lt;symbol class=&quot;icon&quot; viewBox=&quot;0 0 1024 1024&quot; id=&quot;icon&#x540D;&quot;&gt;"{{"&#x7701;&#x7565;&#x7684;icon path"}}"&lt;/symbol&gt;
&lt;/svg&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">&quot;http://www.w3.org/2000/svg&quot;</span> <span class="hljs-attr">xmlns:xlink</span>=<span class="hljs-string">&quot;http://www.w3.org/1999/xlink&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;__SVG_SPRITE_NODE__&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 1024 1024&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;icon&#x540D;&quot;</span>&gt;</span>"{{"&#x7701;&#x7565;&#x7684;icon path"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 1024 1024&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;icon&#x540D;&quot;</span>&gt;</span>"{{"&#x7701;&#x7565;&#x7684;icon path"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre><p>&#x4F60;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;icon&#x90FD;&#x5BF9;&#x5E94;&#x7740;&#x4E00;&#x4E2A;<code>symbol</code>&#x5143;&#x7D20;&#x3002;&#x7136;&#x540E;&#x5728;&#x4F60;&#x7684;html&#x4E2D;&#xFF0C;&#x5F15;&#x5165;&#x8FD9;&#x6837;&#x7684;svg, &#x968F;&#x540E;&#x901A;&#x8FC7;<code>use</code>&#x5728;&#x4EFB;&#x4F55;&#x4F60;&#x9700;&#x8981;icon&#x7684;&#x5730;&#x65B9;&#x6307;&#x5411;symbol:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;use xlink:href=&quot;#symbolId&quot;&gt;&lt;/use&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">&quot;#symbolId&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span></code></pre><p>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;symbol&#x7406;&#x89E3;&#x4E3A;sketch&#x4E2D;&#x5185;&#x7F6E;&#x7684;&#x56FE;&#x5F62;&#xFF0C;&#x5F53;&#x4F60;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x628A;&#x8FD9;&#x4E2A;&#x5F62;&#x72B6;&#x201D;&#x62D6;&#x62FD;&#x201D;&#x5230;&#x4F60;&#x7684;&#x753B;&#x677F;&#x4E2D;&#x5C31;&#x884C;&#x4E86;&#x3002;&#x800C;<code>use</code>&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x201D;&#x62D6;&#x62FD;&#x201D;&#x884C;&#x4E3A;&#x3002;</p><h2 id="articleHeader1">&#x5DE5;&#x5177;</h2><p>&#x8981;&#x8BA9;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x751F;&#x6210;&#x4E0A;&#x9762;&#x90A3;&#x6837;&#x7684;svg&#x96EA;&#x78A7;&#x56FE;&#x2014;&#x2014;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x7684;&#x54AF;&#xFF01;<br>&#x6069;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x60F3;&#x5230;&#x4E86;&#xFF0C;&#x80AF;&#x5B9A;&#x6709;&#x5DE5;&#x5177;&#xFF01;&#x5F53;&#x7136;&#x4F60;&#x6700;&#x5E38;&#x7528;&#x7684;&#x5E94;&#x8BE5;&#x662F;webpack&#x7684;&#x5DE5;&#x5177;&#x5427;&#xFF0C;&#x8FD9;&#x91CC;&#x62FF;&#x597D;&#xFF01;</p><p><a href="https://github.com/kisenka/svg-sprite-loader" rel="nofollow noreferrer" target="_blank">svg-sprite-loader</a></p><p><code>svg-sprite-loader</code>&#x4F1A;&#x628A;&#x4F60;&#x7684;icon&#x585E;&#x5230;&#x4E00;&#x4E2A;&#x4E2A;<code>symbol</code>&#x4E2D;&#xFF0C;<code>symbol</code>&#x7684;id&#x5982;&#x679C;&#x4E0D;&#x7279;&#x522B;&#x6307;&#x5B9A;&#xFF0C;&#x5C31;&#x662F;&#x4F60;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x3002;&#x5B83;&#x6700;&#x7EC8;&#x4F1A;&#x5728;&#x4F60;&#x7684;<code>html</code>&#x4E2D;&#x5D4C;&#x5165;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;<code>svg</code>&#xFF0C;<br>&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x50CF;&#x4E0A;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;use xlink:href=&quot;#symbolId&quot;&gt;&lt;/use&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">&quot;#symbolId&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span></code></pre><p>&#x968F;&#x610F;&#x4F7F;&#x7528;&#x4F60;&#x7684;icon&#x54AF;&#x3002;</p><p><code>svg-sprite-loader</code>&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.svg$/,
  loader: &apos;svg-sprite-loader&apos;,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.svg$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;svg-sprite-loader&apos;</span>,
}</code></pre><p>&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;svg&#x90FD;&#x8981;&#x653E;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x96EA;&#x78A7;&#x56FE;&#x91CC;&#xFF0C;&#x6709;&#x7684;&#x4E5F;&#x8BB8;&#x6211;&#x5C31;&#x60F3;&#x5F53;&#x505A;&#x56FE;&#x7247;&#x7528;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x5728;&#x6211;&#x4EEC;&#x7684;<code>webpack</code>&#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x8FD9;&#x4E24;&#x79CD;svg&#x533A;&#x522B;&#x5BF9;&#x5F85;&#x3002;<br>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x628A;&#x6240;&#x6709;&#x8981;&#x4F5C;&#x4E3A;icon&#x7684;svg&#x56E2;&#x7ED3;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x653E;&#x5728;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x4F8B;&#x5982;<code>assets/icons</code>&#x3002;&#x5176;&#x4ED6;&#x7684;svg&#x5C31;&#x968F;&#x4F60;&#x4FBF;&#x5566;&#x3002;</p><p>&#x7136;&#x540E;&#x5BF9;&#x4E8E;&#x60F3;&#x8981;&#x7528;&#x4F5C;&#x56FE;&#x7247;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.svg$/,
  loader: &apos;file-loader&apos;,
  exclude: path.resolve(__dirname, &apos;./src/assets/icons&apos;) // &#x4E0D;&#x5E26;icon &#x73A9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.svg$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;file-loader&apos;</span>,
  <span class="hljs-attr">exclude</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./src/assets/icons&apos;</span>) <span class="hljs-comment">// &#x4E0D;&#x5E26;icon &#x73A9;</span>
}</code></pre><p>&#x5BF9;&#x4E8E;&#x7528;&#x4F5C;icon&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.svg$/,
  loader: &apos;svg-sprite-loader&apos;,
  include: path.resolve(__dirname, &apos;./src/assets/icons&apos;) // &#x53EA;&#x5E26;&#x81EA;&#x5DF1;&#x4EBA;&#x73A9;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.svg$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;svg-sprite-loader&apos;</span>,
  <span class="hljs-attr">include</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./src/assets/icons&apos;</span>) <span class="hljs-comment">// &#x53EA;&#x5E26;&#x81EA;&#x5DF1;&#x4EBA;&#x73A9;</span>
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8FD9;&#x4FE9;&#x5C31;&#x5206;&#x9053;&#x626C;&#x9573;&#x5566;&#x3002;</p><h2 id="articleHeader2">&#x7EC4;&#x4EF6;&#x5316;</h2><p>OK, &#x6211;&#x4EEC;&#x7684;&#x95EE;&#x9898;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x4E00;&#x534A;&#xFF0C;&#x4E0D;&#x7528;&#x6BCF;&#x6B21;&#x90FD;&#x5199;&#x8DEF;&#x5F84;&#x5F15;&#x5165;<code>svg</code>&#x6587;&#x4EF6;&#x4E86;&#x3002;<br>&#x4F46;&#x662F;&#x3002;&#x3002;&#x3002;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x8981;&#x6BCF;&#x6B21;&#x90FD;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;svg&gt;
    &lt;use xlink:href=&quot;#symbolId&quot;&gt;&lt;/use&gt;
&lt;/svg&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">&quot;#symbolId&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre><p>&#x6211;&#xFF01;&#x4E0D;&#xFF01;&#x5E72;&#xFF01;&#xFF01;&#xFF01;&#x800C;&#x4E14;&#x4E5F;&#x6CA1;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x6700;&#x521D;&#x7684;&#x76EE;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x628A;&#x4E0A;&#x9762;&#x7684;&#x90A3;&#x4E00;&#x5768;&#x5199;&#x6210;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x54AF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;svg :class=&quot;svgClass&quot;&gt;
    &lt;use :xlink:href=&quot;`#${name}`&quot;&gt;&lt;/use&gt;
  &lt;/svg&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &apos;icon&apos;,
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;svgClass&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">:xlink:href</span>=<span class="hljs-string">&quot;`#${name}`&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;icon&apos;</span>,
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">name</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
      },
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x8FBE;&#x6210;&#x76EE;&#x6807;&#xFF0C;&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;your-icon.svg&apos;;
&lt;icon name=&quot;your-icon-name&quot;&gt;&lt;/icon&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="vue"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;your-icon.svg&apos;</span>;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;your-icon-name&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span></span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x4FEE;&#x6539;&#x56FE;&#x6807;&#x7684;&#x989C;&#x8272;&#xFF0C;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x8BE5;&#x5143;&#x7D20;&#x7684;<code>fill</code>/<code>stroke</code>&#x5C5E;&#x6027;&#x3002;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x6CA1;&#x6709;&#x53CD;&#x5E94;&#x7684;&#x8BDD;&#xFF0C;emmm...&#x53EF;&#x80FD;&#x9700;&#x8981;&#x4F60;&#x7684;&#x8BBE;&#x8BA1;&#x5E08;&#x91CD;&#x65B0;&#x5207;&#x56FE;&#xFF0C;&#x540C;&#x6837;&#x662F;&#x5F20;&#x946B;&#x65ED;&#x5927;&#x4F6C;<br>&#x5173;&#x4E8E;&#x5207;&#x56FE;&#x7684;<a href="https://www.zhangxinxu.com/wordpress/2014/12/psd-icon-path-illustrator-svg-sprites-css3-font-face/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a></p><h2 id="articleHeader3">&#x5F15;&#x5165;&#x6240;&#x6709;Icon&#x6587;&#x4EF6;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x7684;&#x57FA;&#x672C;&#x529F;&#x80FD;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x8FD8;&#x6709;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x95EE;&#x9898;&#x2014;&#x2014;&#x6211;&#x6BCF;&#x6B21;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x5F97;import&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x80AF;&#x5B9A;&#x4E5F;&#x4E0D;&#x6EE1;&#x8DB3;&#x6211;&#x4EEC;&#x5077;&#x61D2;&#x7684;&#x6700;&#x7EC8;&#x76EE;&#x6807;&#x3002;<br>&#x4E0D;&#x8FC7;&#xFF0C;&#x603B;&#x4F1A;&#x6709;&#x4EBA;&#x6BD4;&#x4F60;&#x66F4;&#x61D2;&#xFF0C;&#x6216;&#x8005;&#x603B;&#x4F1A;&#x6709;&#x4EBA;&#x6BD4;&#x4F60;&#x5148;&#x61D2;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;webpack&#x7684;<a href="https://webpack.js.org/guides/dependency-management/#require-context" rel="nofollow noreferrer" target="_blank">require.context</a>API&#x6765;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x4F60;&#x6240;&#x6709;&#x7684;Icon.</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x662F;&#x4E0D;&#x80FD;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x6A21;&#x5757;&#xFF0C;&#x4F46;&#x662F;webpack&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x76F8;&#x5173;&#x529F;&#x80FD;&#xFF0C;<a>webpack</a>) &#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x8868;&#x8FBE;&#x5F0F;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x6A21;&#x5757;&#x3002;&#x6BD4;&#x5982;&#xFF1A;<code>require(&apos;./template/&apos; + name + &apos;.ejs&apos;);</code>&#xFF0C;&#x6B64;&#x65F6;webpack&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>context module</code></p><blockquote>A context module is generated. It contains references to all modules in that directory that can be required with a request matching the regular expression. The context module contains a map which translates requests to module ids.</blockquote><p>&#x5B83;&#x4F1A;&#x88AB;&#x62BD;&#x8C61;&#x6210;&#x4EE5;&#x4E0B;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;./table.ejs&quot;: 42, // key &#x662F;module, value &#x662F;module id
  &quot;./table-row.ejs&quot;: 43,
  &quot;./directory/folder.ejs&quot;: 44
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code>{
  <span class="hljs-string">&quot;./table.ejs&quot;</span>: <span class="hljs-number">42</span>, <span class="hljs-regexp">//</span> key &#x662F;<span class="hljs-keyword">module</span>, value &#x662F;<span class="hljs-keyword">module</span> id
  <span class="hljs-string">&quot;./table-row.ejs&quot;</span>: <span class="hljs-number">43</span>,
  <span class="hljs-string">&quot;./directory/folder.ejs&quot;</span>: <span class="hljs-number">44</span>
}</code></pre><p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;webpack&#x63D0;&#x4F9B;&#x7684;&#x7684;<a><code>require.context</code></a>API &#x6765;&#x521B;&#x5EFA;&#x81EA;&#x5DF1;&#x7684;<code>context module</code>&#x52A8;&#x6001;&#x5F15;&#x5165;icon&#x3002;&#x5B83;&#x63A5;&#x53D7;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#x662F;&#x5426;&#x4F7F;&#x7528;&#x5B50;&#x6587;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x662F;&#x6587;&#x4EF6;&#x5339;&#x914D;&#x7684;&#x6B63;&#x5219;&#x3002;<br><code>require.context(directory, useSubdirectories = false, regExp = /^\.\//)</code><br>&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x7684;&#x5C31;&#x662F;<code>require.context(&apos;./src/assets/icons&apos;, false, /\.svg/)</code>.</p><p><code>require.context</code>&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x8BE5;&#x51FD;&#x6570;&#x6709;<code>keys()</code>&#xFF0C;<code>id</code>&#xFF0C; <code>resolve()</code>&#x5C5E;&#x6027;&#x3002;</p><ul><li><code>keys()</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x8BE5;&#x6A21;&#x5757;&#x53EF;&#x4EE5;&#x5904;&#x7406;&#x7684;&#x6240;&#x6709;&#x53EF;&#x80FD;&#x8BF7;&#x6C42;&#x7684;&#x6A21;&#x5757;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x7B80;&#x5355;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x6EE1;&#x8DB3;&#x8BE5;&#x53C2;&#x6570;&#x7684;&#x6A21;&#x5757;&#xFF1B;</li><li><code>resolve()</code>&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8BF7;&#x6C42;&#x7684;module&#x7684;id;</li><li><code>id</code>&#x662F;&#x8BE5;<code>context module</code>&#x7684;id;</li></ul><p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x8BF4;<code>require.context</code>&#x5E2E;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F;<code>./src/assets/icons</code>, &#x968F;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>request.resolve(&apos;./store.svg&apos;)</code>&#x6765;&#x5F15;&#x5165;&#x8BE5;&#x4E0A;&#x4E0B;&#x6587;&#x5185;&#x7684;&#x6587;&#x4EF6;&#x4E86;&#x3002;</p><p>&#x6211;&#x4EEC;&#x6253;&#x5370;&#x4E00;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require.context(&apos;./assets/icons&apos;, false, /\.svg$/);
console.log(request);
console.log(request.keys());
console.log(request.id);
console.log(&apos;request.resolve()&apos;, request.resolve(&apos;./store.svg&apos;));
console.log(request.resolve);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>.context(<span class="hljs-string">&apos;./assets/icons&apos;</span>, <span class="hljs-literal">false</span>, <span class="hljs-regexp">/\.svg$/</span>);
<span class="hljs-built_in">console</span>.log(request);
<span class="hljs-built_in">console</span>.log(request.keys());
<span class="hljs-built_in">console</span>.log(request.id);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;request.resolve()&apos;</span>, request.resolve(<span class="hljs-string">&apos;./store.svg&apos;</span>));
<span class="hljs-built_in">console</span>.log(request.resolve);
</code></pre><p>&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// request
webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
}

// request.keys()
[&quot;./airbloom.svg&quot;, &quot;./crown.svg&quot;, &quot;./store.svg&quot;]

// request.id
./src/assets/icons sync \.svg$

// request.resolve(&apos;./store.svg&apos;);
./src/assets/icons/store.svg

// request.resolve
webpackContextResolve(req) {
    var id = map[req];
    if(!(id + 1)) { // check for number or string
        var e = new Error(&quot;Cannot find module &apos;&quot; + req + &quot;&apos;&quot;);
        e.code = &apos;MODULE_NOT_FOUND&apos;;
        throw e;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// request</span>
webpackContext(req) {
    <span class="hljs-keyword">var</span> id = webpackContextResolve(req);
    <span class="hljs-keyword">return</span> __webpack_require__(id);
}

<span class="hljs-comment">// request.keys()</span>
[<span class="hljs-string">&quot;./airbloom.svg&quot;</span>, <span class="hljs-string">&quot;./crown.svg&quot;</span>, <span class="hljs-string">&quot;./store.svg&quot;</span>]

<span class="hljs-comment">// request.id</span>
./src/assets/icons sync \.svg$

<span class="hljs-comment">// request.resolve(&apos;./store.svg&apos;);</span>
./src/assets/icons/store.svg

<span class="hljs-comment">// request.resolve</span>
webpackContextResolve(req) {
    <span class="hljs-keyword">var</span> id = map[req];
    <span class="hljs-keyword">if</span>(!(id + <span class="hljs-number">1</span>)) { <span class="hljs-comment">// check for number or string</span>
        <span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;Cannot find module &apos;&quot;</span> + req + <span class="hljs-string">&quot;&apos;&quot;</span>);
        e.code = <span class="hljs-string">&apos;MODULE_NOT_FOUND&apos;</span>;
        <span class="hljs-keyword">throw</span> e;
    }</code></pre><p>&#x6709;&#x5173;&#x7684;&#x6E90;&#x7801;&#x5728;&#x8FD9;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = {
    &quot;./airbloom.svg&quot;: &quot;./src/assets/icons/airbloom.svg&quot;,
    &quot;./crown.svg&quot;: &quot;./src/assets/icons/crown.svg&quot;,
    &quot;./store.svg&quot;: &quot;./src/assets/icons/store.svg&quot;
};


function webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
}
function webpackContextResolve(req) {
    var id = map[req];
    if(!(id + 1)) { // check for number or string
        var e = new Error(&quot;Cannot find module &apos;&quot; + req + &quot;&apos;&quot;);
        e.code = &apos;MODULE_NOT_FOUND&apos;;
        throw e;
    }
    return id;
}
webpackContext.keys = function webpackContextKeys() {
    return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = &quot;./src/assets/icons sync \\.svg$&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> map = {
    <span class="hljs-string">&quot;./airbloom.svg&quot;</span>: <span class="hljs-string">&quot;./src/assets/icons/airbloom.svg&quot;</span>,
    <span class="hljs-string">&quot;./crown.svg&quot;</span>: <span class="hljs-string">&quot;./src/assets/icons/crown.svg&quot;</span>,
    <span class="hljs-string">&quot;./store.svg&quot;</span>: <span class="hljs-string">&quot;./src/assets/icons/store.svg&quot;</span>
};


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackContext</span>(<span class="hljs-params">req</span>) </span>{
    <span class="hljs-keyword">var</span> id = webpackContextResolve(req);
    <span class="hljs-keyword">return</span> __webpack_require__(id);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackContextResolve</span>(<span class="hljs-params">req</span>) </span>{
    <span class="hljs-keyword">var</span> id = map[req];
    <span class="hljs-keyword">if</span>(!(id + <span class="hljs-number">1</span>)) { <span class="hljs-comment">// check for number or string</span>
        <span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;Cannot find module &apos;&quot;</span> + req + <span class="hljs-string">&quot;&apos;&quot;</span>);
        e.code = <span class="hljs-string">&apos;MODULE_NOT_FOUND&apos;</span>;
        <span class="hljs-keyword">throw</span> e;
    }
    <span class="hljs-keyword">return</span> id;
}
webpackContext.keys = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackContextKeys</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(map);
};
webpackContext.resolve = webpackContextResolve;
<span class="hljs-built_in">module</span>.exports = webpackContext;
webpackContext.id = <span class="hljs-string">&quot;./src/assets/icons sync \\.svg$&quot;</span>;</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;<code>request</code>&#x8BE5;<code>context module</code>&#x4E0B;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;<code>module</code>&#xFF0C;&#x5F15;&#x5165;&#x6211;&#x4EEC;&#x6240;&#x6709;&#x7684;icon</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7531;&#x4E8E;request&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x63A5;&#x6536;req&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5C31;&#x662F;&#x628A;request.keys()&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;module&#x4F20;&#x5165;&#x4E86;request&#x7684;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x4E2D;&#x4E86;
request.keys().forEach(request);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x7531;&#x4E8E;request&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x63A5;&#x6536;req&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5C31;&#x662F;&#x628A;request.keys()&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;module&#x4F20;&#x5165;&#x4E86;request&#x7684;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x4E2D;&#x4E86;</span>
request.keys().forEach(request);</code></pre><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><ul><li><p>&#x539F;&#x7406;&#xFF1A;</p><ul><li><code>symbol</code> + <code>use:xlink:href</code>;</li><li><code>svg-sprite-loader</code>&#x751F;&#x6210;&#x96EA;&#x78A7;&#x56FE;;</li><li><code>require.context</code>&#x52A8;&#x6001;&#x5F15;&#x5165;&#x6240;&#x6709;&#x6587;&#x4EF6;&#xFF1B;</li></ul></li><li>&#x4F18;&#x5316;SVG</li></ul><p>&#x6709;&#x65F6;&#x5019;&#xFF0C;&#x8BBE;&#x8BA1;&#x5E08;&#x5207;&#x7684;icon&#x5E76;&#x4E0D;&#x90A3;&#x4E48;geek, &#x6709;&#x5F88;&#x591A;&#x591A;&#x4F59;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5927;&#x540D;&#x9F0E;&#x9F0E;&#x7684;<a href="https://github.com/svg/svgo" rel="nofollow noreferrer" target="_blank">svgo</a>&#x8FDB;&#x884C;&#x4F18;&#x5316;&#xFF0C;<br>&#x5B83;&#x63D0;&#x4F9B;web&#x5728;&#x7EBF;&#x7248;&#xFF0C;webpack loader&#x7B49;&#x3002;</p><ul><li>&#x5176;&#x4ED6;&#x5DE5;&#x5177;</li></ul><p><a href="https://github.com/MMF-FE/vue-svgicon" rel="nofollow noreferrer" target="_blank">vue-svgicon</a>&#x8FD9;&#x6B3E;&#x5DE5;&#x5177;&#x76F8;&#x6BD4;&#x6211;&#x4EEC;&#x7684;&#x6709;&#x66F4;&#x591A;&#x7684;feature&#xFF0C;&#x6BD4;&#x5982;&#x52A8;&#x753B;&#x3001;&#x65B9;&#x5411;&#x7B49;&#x3002;&#x5B83;&#x4F1A;&#x7ED9;&#x6BCF;&#x4E2A;icon&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x76F8;&#x5BF9;&#x5E94;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;<br>&#x7528;&#x6765;&#x6CE8;&#x518C;&#x8FD9;&#x4E2A;icon&#x3002;&#x5C31;&#x6211;&#x76EE;&#x524D;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x6765;&#x8BF4;&#xFF0C;1. &#x5B83;&#x4F1A;&#x751F;&#x6210;&#x5F88;&#x591A;js&#x6587;&#x4EF6;&#xFF1B;2.&#x6BCF;&#x6B21;&#x65B0;&#x589E;&#x4E00;&#x4E2A;svg&#x65F6;&#x6211;&#x5C31;&#x5F97;run&#x4E00;&#x6B21;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x547D;&#x4EE4;&#x3002;&#x5BF9;&#x4E8E;&#x6211;&#x73B0;&#x5728;&#x7684;&#x7B80;&#x5355;&#x5E94;&#x7528;&#x573A;&#x666F;&#x6765;&#x8BF4;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x7B80;&#x5355;&#x65B9;&#x4FBF;&#x3002;<br>&#x4E0D;&#x8FC7;&#x5728;&#x5176;&#x4ED6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4ED6;&#x4E5F;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x53E6;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x3002;</p><ul><li>&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x653E;&#x5728;<a href="https://github.com/Yawenina/svg-sprite-icon" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#x5566;</li><li>&#x672C;&#x6765;&#x60F3;&#x653E;&#x5728;<a href="https://codesandbox.io/" rel="nofollow noreferrer" target="_blank">codesandbox</a>&#x4E0A;&#x7684;&#xFF0C;&#x7ED3;&#x679C;&#x76EE;&#x524D;&#x4ED6;&#x4EEC;<a href="https://github.com/CompuIves/codesandbox-client/issues/723" rel="nofollow noreferrer" target="_blank">&#x8FD8;&#x4E0D;&#x652F;&#x6301;</a></li></ul><p><code>require.context</code>API.</p><h2 id="articleHeader5">&#x53C2;&#x8003;&#x8D44;&#x6599;</h2><ul><li><a href="https://juejin.im/post/59bb864b5188257e7a427c09" rel="nofollow noreferrer" target="_blank">&#x624B;&#x6478;&#x624B;&#xFF0C;&#x5E26;&#x4F60;&#x4F18;&#x96C5;&#x7684;&#x4F7F;&#x7528; icon - &#x6398;&#x91D1;</a></li><li><a href="https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/" rel="nofollow noreferrer" target="_blank">&#x672A;&#x6765;&#x5FC5;&#x70ED;&#xFF1A;SVG Sprite&#x6280;&#x672F;&#x4ECB;&#x7ECD; &#xAB; &#x5F20;&#x946B;&#x65ED;-&#x946B;&#x7A7A;&#x95F4;-&#x946B;&#x751F;&#x6D3B;</a></li><li><a href="https://www.zhangxinxu.com/wordpress/2014/12/psd-icon-path-illustrator-svg-sprites-css3-font-face/" rel="nofollow noreferrer" target="_blank">PSD&#x5C0F;&#x56FE;&#x6807;&#x53D8;&#x8EAB;SVG Sprites/font-face&#x5386;&#x9669;&#x8BB0; &#xAB; &#x5F20;&#x946B;&#x65ED;-&#x946B;&#x7A7A;&#x95F4;-&#x946B;&#x751F;&#x6D3B;</a></li><li><a href="https://webpack.js.org/guides/dependency-management/" rel="nofollow noreferrer" target="_blank">Webpack Dependency Management</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
懒人神器：svg-sprite-loader实现自己的Icon组件

## 原文链接
[https://segmentfault.com/a/1190000015367490](https://segmentfault.com/a/1190000015367490)

