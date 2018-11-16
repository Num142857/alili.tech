---
title: webpack 从入门到上线
hidden: true
categories: [reprint]
slug: 50b1ed1
date: 2018-10-29 02:30:09
---

{{< raw >}}
<h2 id="articleHeader0">webpack &#x662F;&#x4EC0;&#x4E48;</h2><p><span class="img-wrap"><img data-src="/img/bVzLhA?w=2598&amp;h=1299" src="https://static.alili.tech/img/bVzLhA?w=2598&amp;h=1299" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E00;&#x9879;&#x6280;&#x672F;&#x3001;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x80AF;&#x5B9A;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x3002;&#x90A3;&#x4E48;&#xFF0C;webpack &#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#xFF1A;<strong>&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x7BA1;&#x7406;</strong>&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684; Js, &#x51FA;&#x4E8E;&#x5B89;&#x5168;&#x7684;&#x8003;&#x8651;&#xFF0C;&#x5BF9;&#x672C;&#x5730;&#x6587;&#x4EF6;&#x6CA1;&#x6709;&#x64CD;&#x4F5C;&#x6743;&#x9650;&#xFF0C;&#x4E0D;&#x80FD;&#x5F15;&#x7528;&#x5176;&#x5B83; js, css &#x7B49;&#x6587;&#x4EF6;&#x3002;&#x800C; webpack &#x5C31;&#x662F;&#x7528;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x8BA9;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x53EF;&#x4EE5;&#x5F88;&#x597D;&#x5730;&#x5206;&#x6587;&#x4EF6;&#x3001;&#x5206;&#x6A21;&#x5757;&#xFF0C;&#x800C;&#x4E14;&#x5B83;&#x5BF9;&#x5916;&#x90E8;&#x6587;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#x540C;&#x65F6;&#x652F;&#x6301; cmd, amd &#x548C; commondJs &#x8FD9;&#x4E09;&#x79CD;&#x5F62;&#x5F0F;&#xFF0C;&#x591F;&#x6709;&#x8BDA;&#x610F;&#x3002;<br>&#x6216;&#x8BB8;&#x4F60;&#x8981;&#x8BF4;&#x4E86;&#xFF0C;&#x89E3;&#x51B3;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#xFF0C;&#x65E9;&#x5728; require.js &#x548C; sea.js &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x5440;&#xFF01;&#x90A3;&#x4E48;&#xFF0C;webpack &#x5728;&#x8FD9;&#x65B9;&#x9762;&#xFF0C;&#x6709;&#x54EA;&#x4E9B;&#x65B0;&#x7684;&#x7A81;&#x7834;&#xFF1A;</p><ol><li>&#x652F;&#x6301;&#x5F15;&#x7528;&#x5404;&#x79CD;&#x62D3;&#x5C55;&#x540D;&#x7684;&#x6587;&#x4EF6;</li><li>&#x80FD;&#x591F;&#x5728;&#x4E0D;&#x4F9D;&#x8D56; gulp &#x6216; grunt &#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x76F4;&#x63A5;&#x4EA7;&#x51FA;&#x6253;&#x5305;&#x6587;&#x4EF6;</li><li>&#x652F;&#x6301;&#x5B9E;&#x65F6;&#x7F16;&#x8BD1;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6B65;&#x5237;&#x65B0;</li></ol><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x60F3;&#x5531;&#x4E00;&#x4E0B;&#x738B;&#x529B;&#x5B8F;&#x7684;&#x300A;&#x552F;&#x4E00;&#x300B;&#xFF1A;&#x786E;&#x5B9A;&#x4F60;&#x5C31;&#x662F;&#x6211;&#x7684;&#x552F;&#x4E00;&#xFF01;<br>OK&#xFF0C;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#x3002;</p><h2 id="articleHeader1">&#x5B89;&#x88C5;&#x4E0E;&#x8FD0;&#x884C;</h2><p>&#x76EE;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack_demo
|--src
|  |--pages
|  |  |--index
|  |  |  |--index.js
|--views_dev
|  |--index.html
|--webpack.config.js
|--package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>webpack_demo
|<span class="hljs-string">--src
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--pages
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.js
</span>|<span class="hljs-string">--views_dev
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.html
</span>|<span class="hljs-string">--webpack.config.js
</span>|<span class="hljs-string">--package.json</span></code></pre><h3 id="articleHeader2">&#x5B89;&#x88C5;</h3><p>&#x5728;&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init // &#x751F;&#x6210;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#x914D;&#x7F6E; package.json
$ npm install webpack -g // &#x5168;&#x5C40;&#x5B89;&#x88C5;webpack
$ touch webpack.config.js // &#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x65B0;&#x5EFA; webpack.config.js &#x6587;&#x4EF6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>$ npm init <span class="hljs-comment">// &#x751F;&#x6210;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#x914D;&#x7F6E; package.json</span>
$ npm install webpack -g <span class="hljs-comment">// &#x5168;&#x5C40;&#x5B89;&#x88C5;webpack</span>
$ touch webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span> <span class="hljs-comment">// &#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x65B0;&#x5EFA; webpack.config.js &#x6587;&#x4EF6;</span></code></pre><h3 id="articleHeader3">&#x914D;&#x7F6E;</h3><p>&#x7136;&#x540E;&#xFF0C;&#x5728;&#x4EE5;&#x4E0B;3&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8F93;&#x5165;&#x5185;&#x5BB9;&#xFF1A;</p><ol><li><p>&#x9875;&#x9762; HTML &#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// views_dev/index.html
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;&#x9996;&#x9875;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt;&#x54C8;&#x55BD;&#xFF0C;world&lt;/div&gt;
    &lt;script src=&quot;../asset/dev/main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// views_dev/index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x54C8;&#x55BD;&#xFF0C;world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;../asset/dev/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre></li><li><p>&#x9875;&#x9762;&#x5F15;&#x7528;&#x7684; js &#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/pages/index/index.js
console.log(&apos;I am in index/index.js, haha4&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs glsl"><code><span class="hljs-comment">// src/pages/index/index.js</span>
console.<span class="hljs-built_in">log</span>(&apos;I am <span class="hljs-keyword">in</span> <span class="hljs-keyword">index</span>/<span class="hljs-keyword">index</span>.js, haha4&apos;);</code></pre></li><li><p>webpack &#x6253;&#x5305;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
// &#x5165;&#x53E3;&#xFF1A;&#x8981;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#x5B9E;&#x4F8B;&#xFF08;js&#xFF09;
entry: &apos;./src/pages/index/index.js&apos;,
// &#x51FA;&#x53E3;&#xFF1A;&#x8F93;&#x51FA;&#x914D;&#x7F6E;
output: {
    // &#x8F93;&#x51FA;&#x5230;&#x54EA;&#x4E2A;&#x76EE;&#x5F55;
    path: &apos;./asset/dev/&apos;,
    // &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;
    publicPath: &apos;/asset/dev/&apos;,
    // &#x5B9E;&#x4F8B;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x540D;&#x5B57;
    filename: &apos;[name].js&apos;
}
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
module.exports = {
<span class="hljs-comment">// &#x5165;&#x53E3;&#xFF1A;&#x8981;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#x5B9E;&#x4F8B;&#xFF08;js&#xFF09;</span>
<span class="hljs-string">entry:</span> <span class="hljs-string">&apos;./src/pages/index/index.js&apos;</span>,
<span class="hljs-comment">// &#x51FA;&#x53E3;&#xFF1A;&#x8F93;&#x51FA;&#x914D;&#x7F6E;</span>
<span class="hljs-string">output:</span> {
    <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5230;&#x54EA;&#x4E2A;&#x76EE;&#x5F55;</span>
<span class="hljs-symbol">    path:</span> <span class="hljs-string">&apos;./asset/dev/&apos;</span>,
    <span class="hljs-comment">// &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;</span>
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">&apos;/asset/dev/&apos;</span>,
    <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x540D;&#x5B57;</span>
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">&apos;[name].js&apos;</span>
}
};</code></pre></li></ol><h3 id="articleHeader4">&#x8FD0;&#x884C;</h3><p><strong>&#x8FD0;&#x884C; webpack &#x547D;&#x4EE4;</strong>&#xFF0C;&#x8FDB;&#x884C;&#x6253;&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code style="word-break:break-word;white-space:initial"><span class="hljs-variable">$ </span>webpack</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x641E;&#x5B9A;&#x4E86;&#xFF0C;&#x6B64;&#x65F6;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00; <code>views_dev/index.html</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x6253;&#x5305;&#x6210;&#x529F;&#x4E86;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVB25D?w=777&amp;h=169" src="https://static.alili.tech/img/bVB25D?w=777&amp;h=169" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x597D;&#x7684;&#xFF0C;&#x4F60;&#x5165;&#x95E8;&#x4E86;&#xFF0C;&#x54C8;&#x54C8;&#xFF01;&#x63A5;&#x4E0B;&#x53BB;&#xFF0C;&#x6211;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x5355;&#x4E2A;&#x9875;&#x9762;&#x6253;&#x5305;&#x3001;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x6253;&#x5305;&#xFF0C;&#x4EE5;&#x53CA;&#x6700;&#x540E;&#x7684;&#x53D1;&#x5E03;&#x4E0A;&#x7EBF;&#x3002;Now, go ~</p><h2 id="articleHeader5">&#x5355;&#x4E2A;&#x9875;&#x9762;&#x6253;&#x5305;</h2><p>&#x8FD9;&#x91CC;&#xFF0C;&#x4F60;&#x5C06;&#x5B66;&#x5230;&#xFF1A;</p><ol><li>&#x5F15;&#x5165;&#x5176;&#x5B83; js &#x6587;&#x4EF6;&#x3002;&#x662F;&#x7684;&#xFF0C;&#x4F60;&#x5C06;&#x5B66;&#x4F1A; <strong>&#x6A21;&#x5757;&#x5316;</strong>&#x3002;</li><li>&#x5F15;&#x5165;&#x5176;&#x5B83;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4EE5; css &#x4E3A;&#x4F8B;&#x3002;</li><li>&#x5B9E;&#x65F6;&#x7F16;&#x8BD1; + &#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6B65;&#x5237;&#x65B0;&#x3002;&#x723D;&#xFF01;</li></ol><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#xFF0C;&#x662F;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack_demo
|--src
|  |--pages
|  |  |--index
|  |  |  |--index.js
|  |  |  |--test.js
|  |  |  |--index.css
|  |--plugins
|  |  |--dialog
|  |  |  |--dialog.css
|  |  |  |--dialog.js
|--views_dev
|  |--index.html
|--webpack.config.js
|--package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>webpack_demo
|<span class="hljs-string">--src
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--pages
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--test.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.css
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--plugins
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--dialog
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--dialog.css
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--dialog.js
</span>|<span class="hljs-string">--views_dev
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.html
</span>|<span class="hljs-string">--webpack.config.js
</span>|<span class="hljs-string">--package.json</span></code></pre><h3 id="articleHeader6">&#x5F15;&#x5165;&#x5176;&#x5B83; js &#x6587;&#x4EF6;</h3><ol><li><p>&#x901A;&#x8FC7;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;<br>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5728; <code>src/pages/index.js</code> &#x91CC;&#x9762;&#x5F15;&#x5165; <code>src/pages/test.js</code> &#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Test = require(&apos;./test.js&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">var Test</span> = require(<span class="hljs-string">&apos;./test.js&apos;</span>);</code></pre><p>&#x4F60;&#x4E5F;&#x8BB8;&#x4F1A;&#x95EE;&#xFF0C;&#x6B64;&#x65F6;&#xFF0C;<code>var Test</code> &#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x6362;&#x4E2A;&#x8BF4;&#x6CD5;&#xFF0C;&#x600E;&#x4E48;&#x63A7;&#x5236; <code>test.js</code> &#x88AB;&#x5BFC;&#x51FA;&#x5230;&#x5916;&#x90E8;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x7B54;&#x6848;&#x662F;&#xFF1A;&#x901A;&#x8FC7; <code>module.exports</code>. &#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index/test.js
var str = &quot;I am in test.js&quot;;
module.exports = str;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs openscad"><code><span class="hljs-comment">// index/test.js</span>
var <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;I am in test.js&quot;</span>;
<span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> <span class="hljs-built_in">str</span>;</code></pre><p>&#x90A3;&#x4E48;&#xFF0C;<code>require(&apos;./test.js&apos;)</code> &#x7684;&#x503C;&#x5C31;&#x662F; &quot;I am in test.js&quot; &#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;<code>module.exports</code> &#x53EF;&#x4EE5;&#x5BFC;&#x51FA;&#x4EFB;&#x4F55;&#x503C;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5BFC;&#x51FA; Object.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  aa: &apos;axxx&apos;,
  b: function() {}
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">aa</span>: <span class="hljs-string">&apos;axxx&apos;</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
};</code></pre></li><li><p>&#x901A;&#x8FC7;&#x522B;&#x540D;&#x6216;&#x6A21;&#x5757;<br>&#x5982;&#x679C;&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x90A3; <code>webpack</code> &#x5C31;&#x592A;&#x4E0D;&#x9760;&#x8C31;&#x4E86;&#x3002;&#x56E0;&#x4E3A;&#x5C06;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x8FD9;&#x6837; <code>../../../../libs/libs-tost/toast.js</code>, &#x554A;&#xFF0C;&#x60F3;&#x6B7B;&#xFF01;&#x90A3;&#x4E48;&#xFF0C;&#x600E;&#x4E48;&#x901A;&#x8FC7;&#x522B;&#x540D;&#x5F15;&#x5165;&#x6587;&#x4EF6;&#x5462;&#xFF1F;&#x5047;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x5F15;&#x5165; <code>src/plugins/dialog/dialog.js</code> &#x8FD9;&#x4E2A;&#x5F39;&#x7A97;&#x3002;</p><ul><li><p>&#x5728; <code>webpack.config.js</code> &#x4E2D;&#xFF0C;&#x914D;&#x7F6E;&#x522B;&#x540D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    resolve: {
        // &#x5B9A;&#x4E49;&#x522B;&#x540D;
        alias: {
            plugins: &apos;D:/your/path/webpack_demo/src/plugins&apos;, // &#x522B;&#x540D;&#x53EF;&#x4EE5;&#x662F;&#x76EE;&#x5F55;
            myDialog: &apos;D:/your/path/webpack_demo/src/plugins/dialog/dialog.js&apos; // &#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x6587;&#x4EF6;
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">module</span>.exports = {
    resolve: {
        <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x522B;&#x540D;</span>
        <span class="hljs-keyword">alias</span>: {
            plugins: <span class="hljs-string">&apos;D:/your/path/webpack_demo/src/plugins&apos;</span>, <span class="hljs-comment">// &#x522B;&#x540D;&#x53EF;&#x4EE5;&#x662F;&#x76EE;&#x5F55;</span>
            myDialog: <span class="hljs-string">&apos;D:/your/path/webpack_demo/src/plugins/dialog/dialog.js&apos;</span> <span class="hljs-comment">// &#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x6587;&#x4EF6;</span>
        }
    }
}</code></pre></li><li><p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index/index.js
var Dialog = require(&apos;plugins/dialog/dialog.js&apos;); // &#x65B9;&#x5F0F;&#x4E00;
var Diaglog = require(&apos;myDialog&apos;); // &#x65B9;&#x5F0F;&#x4E8C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// src/index/index.js</span>
<span class="hljs-keyword">var</span> Dialog = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;plugins/dialog/dialog.js&apos;</span>); <span class="hljs-comment">// &#x65B9;&#x5F0F;&#x4E00;</span>
<span class="hljs-keyword">var</span> Diaglog = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;myDialog&apos;</span>); <span class="hljs-comment">// &#x65B9;&#x5F0F;&#x4E8C;</span></code></pre><p>&#x8BF4;&#x660E;&#xFF1A;<code>require(TagPath)</code> &#x7684; <code>TagPath</code> &#x5982;&#x679C;&#x4EE5;&#x5355;&#x8BCD;&#x5F00;&#x5934;&#xFF0C;&#x5C06;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x6A21;&#x5757;&#x5339;&#x914D;&#xFF0C;&#x5B83;&#x4F1A;&#x53BB;&#x627E; <code>node_modules</code> &#x548C; <code>resolve.alias</code> &#x4E0B;&#x7684;&#x6A21;&#x5757;&#xFF08;&#x6216;&#x522B;&#x540D;&#xFF09;&#x3002;&#x4EE5;&#x65B9;&#x5F0F;&#x4E00;&#x4E3A;&#x4F8B;&#xFF0C;&#x5B83;&#x7684;<code>TagPath</code> &#x662F;&#x4EE5; <code>plugins</code> &#x5F00;&#x5934;&#xFF08;&#x6CE8;&#x610F;&#x4E0B;&#xFF1A;<code>/plugins</code> &#x548C; <code>./plugins</code> &#x90FD;&#x4E0D;&#x53EB;&#x4EE5;&#x5355;&#x8BCD;&#x5F00;&#x5934;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x987A;&#x5229;&#x5339;&#x914D;&#x5230; <code>resolve.alias.plugins</code>. &#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x4F60;&#x7ECF;&#x5E38;&#x4F1A;&#x770B;&#x5230; <code>require(&apos;jquery&apos;)</code>, <code>require(&apos;vue&apos;)</code>, <code>require(&apos;react&apos;)</code>, &#x8FD9;&#x4E9B;&#x5C31;&#x662F;&#x5339;&#x914D;&#x5230; <code>node_modules</code> &#x4E0B;&#x5DF2;&#x5B89;&#x88C5;&#x7684;&#x6A21;&#x5757;&#x3002;</p></li></ul></li></ol><h3 id="articleHeader7">&#x5F15;&#x5165;&#x5176;&#x5B83;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;</h3><p><code>webpack</code> &#x7684;&#x5F3A;&#x5927;&#x4E4B;&#x5904;&#x662F;&#xFF0C;&#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x5F15;&#x5165;&#x4EFB;&#x4F55;&#x6587;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;css, jpg, png. &#x90A3;&#x4E48;&#xFF0C;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x8981;&#x600E;&#x4E48;&#x77E5;&#x9053;&#x8BE5;&#x5982;&#x4F55;&#x5206;&#x5F00;&#x5904;&#x7406;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    module: {
        loaders: [{
            test: /\.css$/,
            loader: &apos;style!css&apos;
        }, {
            test: /\.js$/,
            loader: &apos;babel&apos;
        }]
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        loaders: [{
            test: <span class="hljs-regexp">/\.css$/</span>,
            loader: <span class="hljs-string">&apos;style!css&apos;</span>
        }, {
            test: <span class="hljs-regexp">/\.js$/</span>,
            loader: <span class="hljs-string">&apos;babel&apos;</span>
        }]
    }
};</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x662F;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E8E;&#x62D3;&#x5C55;&#x540D;&#x662F; <code>.css</code> &#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x52A0;&#x8F7D;&#x5668; <code>style!css</code>&#xFF08;&#x8FD9;&#x8FB9;&#x4E2D;&#x95F4;&#x6709;&#x4E00;&#x4E2A;&#x611F;&#x53F9;&#x53F7;&#xFF0C;&#x610F;&#x601D;&#x662F;&#xFF1A;&#x5148;&#x662F;&#x7528; css &#x52A0;&#x8F7D;&#x5668;&#x5904;&#x7406;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528; style &#x52A0;&#x8F7D;&#x5668;&#x5904;&#x7406;&#xFF09;&#x3002;&#x5B8C;&#x6574;&#x7684;&#x5199;&#x6CD5;&#x662F;&#xFF1A;<code>style-loader!css-loader</code>, &#x5176;&#x4E2D;&#xFF0C;<code>-loader</code>&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x3002;&#x800C;&#x8FD9;&#x91CC;&#x7684;&#xFF0C;<code>style-loader</code> &#x548C; <code>css-loader</code> &#x5C31;&#x9700;&#x8981;&#x4F60; npm &#x5B89;&#x88C5;&#x4E0B;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i style-loader -D
$ npm i css-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>$ npm <span class="hljs-selector-tag">i</span> style-loader -D
$ npm <span class="hljs-selector-tag">i</span> css-loader -D</code></pre><p>&#x5BF9;&#x4E8E;&#x5176;&#x5B83;&#x62D3;&#x5C55;&#x540D;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x4E5F;&#x662F;&#x7528;&#x540C;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x3002;</p><h3 id="articleHeader8">&#x91CA;&#x653E;&#x53CC;&#x624B;&#xFF1A;&#x81EA;&#x52A8;&#x7F16;&#x8BD1; + &#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6B65;&#x5237;&#x65B0;</h3><p>&#x4F60;&#x80AF;&#x5B9A;&#x5E0C;&#x671B;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x529F;&#x80FD;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x5F00;&#x59CB;&#x5427;&#xFF0C;&#x559D;&#x676F;&#x5496;&#x5561;&#xFF01;</p><ol><li>&#x81EA;&#x52A8;&#x7F16;&#x8BD1;<br>&#x5982;&#x679C;&#x4F60;&#x53EA;&#x662F;&#x60F3;&#x652F;&#x6301;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#xFF0C;&#x90A3;&#x4E48;&#x5F88;&#x7B80;&#x5355;&#x3002;&#x53EA;&#x8981;&#x8FD0;&#x884C; <code>$ webpack -w</code> &#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x542F;&#x5B83;&#x7684;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x529F;&#x80FD;&#x3002;</li><li><p>&#x7528; webpack-dev-server &#x5B9E;&#x73B0;&#xFF1A;&#x81EA;&#x52A8;&#x7F16;&#x8BD1; + &#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6B65;&#x5237;&#x65B0;</p><ul><li><p>&#x9996;&#x5148;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5B89;&#x88C5; <code>webpack-dev-server</code> &#x8FD9;&#x4E2A;&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i webpack-dev-server -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">$ npm <span class="hljs-selector-tag">i</span> webpack-dev-server -D</code></pre></li><li><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E0B;&#x5B83;&#xFF1A;<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack-dev-server &#x6587;&#x6863;</a></p><ul><li>&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x542F;&#x52A8;&#x4E00;&#x4E2A;&#x672C;&#x5730; Node &#x670D;&#x52A1;&#x5668;&#xFF0C;&#x9ED8;&#x8BA4;&#x7AEF;&#x53E3;8080. &#x5373;&#xFF1A;localhost:8080. &#x5E76;&#x4E14;&#x81EA;&#x52A8;&#x8BC6;&#x522B;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>webpack.config.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x6765;&#x4F5C;&#x4E3A; <code>webpack</code> &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</li><li>&#x4EA7;&#x51FA;&#x7684;&#x7F16;&#x8BD1;&#x540E;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x5728; output.path &#x91CC;&#xFF0C;&#x800C;&#x5728;&#x5B83;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x7684;&#x5185;&#x5B58;&#x3002;</li><li><p>&#x884C;&#x5185;&#x53C2;&#x6570;&#x8BF4;&#x660E;&#xFF1A;</p><ul><li>inline: &#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x884C;&#x6A21;&#x5F0F;&#x3002;</li><li>content-base: &#x6307;&#x5B9A;&#x7F51;&#x7AD9;&#x7684;&#x6839;&#x5730;&#x5740;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x6307;&#x5B9A;&#x4E3A;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x90A3;&#x4E48; <code>--content-base ./</code></li><li>hot: &#x5F00;&#x542F;&#x70ED;&#x66FF;&#x6362;&#x3002;&#x4E00;&#x822C;&#x7528;&#x5728; React &#x548C; Vue &#x5F53;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4E0D;&#x7528;&#x3002;</li></ul></li></ul></li></ul><p>&#x597D;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x542F;&#x52A8;&#x5B83;&#x5427;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server  --inline --content-base ./" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs brainfuck"><code style="word-break:break-word;white-space:initial"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-string">.</span><span class="hljs-comment">/</span></code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x4F60;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x8BBF;&#x95EE; <code>http://localhost:8080/views_dev/index.html</code> &#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x4F60;&#x4FEE;&#x6539;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x65F6;&#x7F16;&#x8BD1;&#xFF0C;&#x5E76;&#x4E14;&#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6B65;&#x5237;&#x65B0;&#x4E86;&#x3002;&#xFF08;&#x4E0D;&#x8FC7;&#xFF0C;&#x8981;&#x8865;&#x5145;&#x4E00;&#x4E0B;&#xFF0C;&#x89E6;&#x53D1; webpack &#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x65F6;&#xFF0C;&#x624D;&#x80FD;&#x540C;&#x6B65;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x3002;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x4F60;&#x4FEE;&#x6539; <code>views_dev/*.html</code> &#x7684; HTML &#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x5237;&#x65B0;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1; webpack &#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x3002;&#xFF09;</p></li></ol><h2 id="articleHeader9">&#x591A;&#x9875;&#x9762;&#x6253;&#x5305;</h2><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x52A0;&#x4E00;&#x70B9;&#x70B9;&#x914D;&#x7F6E;&#xFF0C;&#x8BA9;&#x5B83;&#x652F;&#x6301;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x6253;&#x5305;&#x3002;&#x4E4B;&#x524D;&#xFF0C;&#x5B83;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    // &#x5165;&#x53E3;&#xFF1A;&#x8981;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#x5B9E;&#x4F8B;&#xFF08;js&#xFF09;
    entry: &apos;./src/pages/index/index.js&apos;,
    // &#x51FA;&#x53E3;&#xFF1A;&#x8F93;&#x51FA;&#x914D;&#x7F6E;
    output: {
        // &#x8F93;&#x51FA;&#x5230;&#x54EA;&#x4E2A;&#x76EE;&#x5F55;
        path: &apos;./asset/dev/&apos;,
        // &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;
        publicPath: &apos;/asset/dev/&apos;,
        // &#x5B9E;&#x4F8B;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x540D;&#x5B57;
        filename: &apos;[name].js&apos;
    },
    // &#x5176;&#x5B83;&#x914D;&#x7F6E;...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    <span class="hljs-comment">// &#x5165;&#x53E3;&#xFF1A;&#x8981;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#x5B9E;&#x4F8B;&#xFF08;js&#xFF09;</span>
    entry: <span class="hljs-string">&apos;./src/pages/index/index.js&apos;</span>,
    <span class="hljs-comment">// &#x51FA;&#x53E3;&#xFF1A;&#x8F93;&#x51FA;&#x914D;&#x7F6E;</span>
    output: {
        <span class="hljs-comment">// &#x8F93;&#x51FA;&#x5230;&#x54EA;&#x4E2A;&#x76EE;&#x5F55;</span>
        path: <span class="hljs-string">&apos;./asset/dev/&apos;</span>,
        <span class="hljs-comment">// &#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;</span>
        publicPath: <span class="hljs-string">&apos;/asset/dev/&apos;</span>,
        <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x540D;&#x5B57;</span>
        filename: <span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-comment">// &#x5176;&#x5B83;&#x914D;&#x7F6E;...</span>
};</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6539;&#x4E0B; <code>entry</code> &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    index: &apos;./src/pages/index/index.js&apos;,
    list: &apos;./src/pages/list/index.js&apos;,
    common: [
        &apos;./src/base/base.js&apos;,
        &apos;./src/base/base.css&apos;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">index</span>: <span class="hljs-string">&apos;./src/pages/index/index.js&apos;</span>,
    list: <span class="hljs-string">&apos;./src/pages/list/index.js&apos;</span>,
    common: [
        <span class="hljs-string">&apos;./src/base/base.js&apos;</span>,
        <span class="hljs-string">&apos;./src/base/base.css&apos;</span>
    ]
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x4F1A;&#x72EC;&#x7ACB;&#x6253;&#x5305;3&#x4E2A;&#x5B9E;&#x4F53;&#x3002;&#x5206;&#x522B;&#x662F; index, list, common. &#x77E5;&#x8BC6;&#x70B9;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li>&#x5B83;&#x652F;&#x6301;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x6253;&#x5305;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5982;&#x8FD9;&#x91CC;&#x7684; <code>common</code> &#x7684;&#x914D;&#x7F6E;&#x3002;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#xFF0C;&#x7528;&#x6765;&#x653E;&#x516C;&#x5171;&#x57FA;&#x7840;&#x5305;&#x3002;</li><li><p>&#x6211;&#x4EEC;&#x770B;&#x5230; <code>output.filename = [name].js</code>&#xFF0C;&#x8FD9;&#x91CC;&#x7684; <code>[name]</code> &#x53D6;&#x81EA;&#x4E8E; entry &#x7684; key &#x503C;&#x3002;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x4ED6;&#x4EEC;&#x6700;&#x7EC8;&#x6253;&#x5305;&#x7684;&#x8F93;&#x51FA;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack_demo
|--asset
|  |--dev
|  |  |--index.js
|  |  |--list.js
|  |  |--common.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>webpack_demo
|<span class="hljs-string">--asset
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--dev
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--list.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">--common.js</span></code></pre></li></ol><h2 id="articleHeader10">&#x4E0A;&#x7EBF;</h2><p>&#x53D1;&#x5E03;&#x4E0A;&#x7EBF;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x4E5F;&#x8BB8;&#x662F;&#x8FD9;&#x6837;&#xFF1A;</p><ol><li>&#x628A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x751F;&#x6210;&#x5230;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x76EE;&#x5F55;&#x4E0B;</li><li>&#x538B;&#x7F29;</li><li>&#x52A0;&#x4E0A; md5</li><li>html &#x548C; css &#x4E2D;&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x9700;&#x8981;&#x66FF;&#x6362;&#x3002;</li></ol><p>&#x54C8;&#x54C8;&#xFF0C;&#x6216;&#x8BB8;&#x4F60;&#x8FD8;&#x80FD;&#x60F3;&#x5230;&#x5F88;&#x591A;&#x3002;&#x6211;&#x5C31;&#x4E0A;&#x9762;4&#x6B65;&#x6765;&#x8BF4;&#x4E0B;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x8FD9;&#x4E48;&#x505A;&#xFF1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; webpack &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x6765;&#x505A;&#x4E0A;&#x7EBF;&#x53D1;&#x5E03;&#x7684;&#x914D;&#x7F6E;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x540C;&#x6837;&#x653E;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x547D;&#x540D; <code>webpack.config.build.js</code>. &#x6B64;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack -p --config webpack.config.build.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">$ webpack -<span class="hljs-selector-tag">p</span> --config webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.js</span></code></pre><p>&#x8FD9;&#x91CC;&#x7684; <code>-p</code> &#x662F; production &#x6A21;&#x5F0F;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x5B83;&#x4F1A;&#x5BF9; css, js &#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x3002;&#x540E;&#x9762; <code>--config</code> &#x5C31;&#x662F;&#x6307;&#x5B9A;&#x6B64;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x89E3;&#x51B3;&#x4E0A;&#x9762;&#x7684;4&#x4E2A;&#x8981;&#x6C42;&#xFF1A;</p><ol><li><p>&#x628A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x751F;&#x6210;&#x5230;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x76EE;&#x5F55;&#x4E0B; + md5 + css&#x5F15;&#x7528;&#x7684;&#x8D44;&#x6E90;&#x66FF;&#x6362;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.build.js
module.exports = {
    output: {
        path: &apos;./asset/build/&apos;, // &#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x8F93;&#x51FA;&#x8DEF;&#x5F84;&#x6539;&#x6210; build
        publicPath: &apos;http://yourweb.com/asset/build/&apos;, // &#x8FD9;&#x91CC;&#x66FF;&#x6362;&#x6210;&#x7EBF;&#x4E0A;&#x5B9E;&#x9645;&#x5730;&#x5740;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539; css &#x4E2D;&#x5BF9;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;&#x3002;
        filename: &apos;[name]_[hash:5].js&apos; // &#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x5B57;&#xFF0C;&#x52A0;&#x4E0A;&#x4E86;5&#x4F4D;&#x7684; hash&#x503C;&#x3002;&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x4F4D;&#x6570;&#x548C;&#x52A0;hash&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#xFF0C;&#x6BD4;&#x5982; &apos;[name].js?[hash]&apos;.
    },
    // &#x5176;&#x5B83;&#x914D;&#x7F6E;...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-comment">// webpack.config.build.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    output: {
        path: <span class="hljs-string">&apos;./asset/build/&apos;</span>, <span class="hljs-comment">// &#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x8F93;&#x51FA;&#x8DEF;&#x5F84;&#x6539;&#x6210; build</span>
        publicPath: <span class="hljs-string">&apos;http://yourweb.com/asset/build/&apos;</span>, <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x66FF;&#x6362;&#x6210;&#x7EBF;&#x4E0A;&#x5B9E;&#x9645;&#x5730;&#x5740;&#xFF0C;&#x53EF;&#x4EE5;&#x4FEE;&#x6539; css &#x4E2D;&#x5BF9;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x7684;&#x5F15;&#x7528;&#x8DEF;&#x5F84;&#x3002;</span>
        filename: <span class="hljs-string">&apos;[name]_[hash:5].js&apos;</span> <span class="hljs-comment">// &#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x5B57;&#xFF0C;&#x52A0;&#x4E0A;&#x4E86;5&#x4F4D;&#x7684; hash&#x503C;&#x3002;&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x4F4D;&#x6570;&#x548C;&#x52A0;hash&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#xFF0C;&#x6BD4;&#x5982; &apos;[name].js?[hash]&apos;.</span>
    },
    <span class="hljs-comment">// &#x5176;&#x5B83;&#x914D;&#x7F6E;...</span>
};</code></pre></li><li>&#x538B;&#x7F29;&#x3002;&#x7528; <code>webpack -p</code> &#x89E3;&#x51B3;&#x4E86;&#x3002;</li><li>&#x66FF;&#x6362; HTML &#x4E2D;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x8DEF;&#x5F84;&#x3002;&#x53EF;&#x4EE5;&#x7528; webpack &#x7684;&#x63D2;&#x4EF6;&#xFF0C;<code>html-webpack-plugin</code> &#x6765;&#x505A;&#x3002;&#x6216;&#x8005;&#xFF0C;&#x4F60;&#x5BF9; gulp &#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x719F;&#x6089;&#x7684;&#x8BDD;&#xFF0C;&#x7528; <code>gulp-prefix</code> &#x6765;&#x5B9E;&#x73B0;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BE6;&#x7EC6;&#x5199;&#x914D;&#x7F6E;&#x4E86;&#x3002;</li></ol><p>&#x7136;&#x540E;&#xFF0C;&#x606D;&#x559C;&#x4F60;&#x770B;&#x5B8C;&#x4E86;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 从入门到上线

## 原文链接
[https://segmentfault.com/a/1190000006649986](https://segmentfault.com/a/1190000006649986)

