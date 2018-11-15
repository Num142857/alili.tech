---
title: react 应用多入口 配置 && 实践总结
reprint: true
categories: reprint
abbrlink: 792a5c2
date: 2018-11-05 02:30:10
---

{{% raw %}}
<h1 id="articleHeader0">&#x80CC;&#x666F;</h1><p>&#x8FD8;&#x662F;&#x4E4B;&#x524D;&#x7684;&#x90A3;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x505A;&#x5B8C;&#x56FD;&#x9645;&#x5316;&#x6CA1;&#x591A;&#x4E45;&#xFF0C;&#x8FD8;&#x6CA1;&#x6765;&#x5F97;&#x53CA;&#x5212;&#x6C34;&#xFF0C; &#x53C8;&#x6709;&#x65B0;&#x7684;&#x6D3B;&#x4E86; -- &#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x517C;&#x5BB9;&#x3002; &#x8003;&#x8651;&#x5230;&#x540E;&#x671F;&#x7684;&#x590D;&#x6742;&#x5EA6;&#xFF0C; &#x9700;&#x8981;&#x505A;&#x4E24;&#x5957;&#x8D44;&#x6E90;&#x3002; &#x5177;&#x4F53;&#x7684;&#x76EE;&#x6807;&#x662F;&#xFF1A;<code>&#x540C;&#x4E00;&#x4E2A;URL&#xFF0C;PC&#x6253;&#x5F00;&#x5C31;&#x663E;&#x793A;PC&#x7684;&#x90A3;&#x4E00;&#x5957;&#xFF0C; M&#x7AEF;&#x6253;&#x5F00;&#x5C31;&#x663E;&#x793A;Mobile&#x7684;&#x9875;&#x9762;</code>&#x3002; create-react-app &#x811A;&#x624B;&#x67B6;&#x672C;&#x8EAB;&#x4E0D;&#x652F;&#x6301;&#x591A;&#x5165;&#x53E3;&#xFF0C; &#x9700;&#x8981;&#x6539;&#x9020;&#xFF0C;&#x4ECA;&#x5929;&#x4E0B;&#x5348;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x6539;&#x9020;&#x4E86;&#x4E00;&#x6CE2;&#xFF0C; &#x57FA;&#x672C;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#xFF0C; &#x5728;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x628A;&#x7ECF;&#x9A8C;&#x603B;&#x7ED3;&#x5206;&#x4EAB;&#x4E0B;&#x3002;</p><h1 id="articleHeader1">&#x5148;&#x7779;&#x4E3A;&#x5FEB;</h1><p>Mobile:</p><p><span class="img-wrap"><img data-src="/img/bVbh6dd?w=1972&amp;h=1630" src="https://static.alili.tech/img/bVbh6dd?w=1972&amp;h=1630" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>PC:</p><p><span class="img-wrap"><img data-src="/img/bVbh6d7?w=1740&amp;h=1996" src="https://static.alili.tech/img/bVbh6d7?w=1740&amp;h=1996" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh6f8?w=412&amp;h=450" src="https://static.alili.tech/img/bVbh6f8?w=412&amp;h=450" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8F93;&#x51FA;&#x4E4B;&#x540E;&#x7684;&#x6587;&#x4EF6;&#xFF0C; &#x76F8;&#x6BD4;&#x4E4B;&#x524D;&#x7684;index.html&#xFF0C; &#x591A;&#x4E86;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684;mobile.html.</p><p>&#x6700;&#x7EC8;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#x76EE;&#x5F55;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh6hM?w=458&amp;h=1498" src="https://static.alili.tech/img/bVbh6hM?w=458&amp;h=1498" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5177;&#x4F53;&#x7684;&#x6539;&#x9020;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><h1 id="articleHeader2">Steps</h1><h2 id="articleHeader3">step1: Eject</h2><p>&#x5728;&#x4E0B;&#x4E4B;&#x524D;&#x56FE;&#x65B9;&#x4FBF;&#xFF0C; &#x76F4;&#x63A5;&#x7528;&#x4E86;<code>create-react-app</code>&#xFF0C; &#x73B0;&#x5728;&#x9700;&#x8981;&#x66F4;&#x6539;&#x914D;&#x7F6E;&#xFF0C; &#x9700;&#x8981;&#x5F39;&#x51FA;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;:</p><p>&#x5728;&#x7EC8;&#x7AEF;&#x6267;&#x884C;&#xFF1A;<code>yarn eject</code>.</p><h2 id="articleHeader4">step2: &#x4FEE;&#x6539;webpack config</h2><p>&#x539F;&#x672C;&#x7684; webpack.config.dev.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [
  require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
  require.resolve(&apos;./polyfills&apos;),
  require.resolve(&apos;react-error-overlay&apos;),
  paths.appIndexJs,
],
output: {
  path: paths.appBuild,
  pathinfo: true,
  filename: &apos;static/js/bundle.js&apos;,
  chunkFilename: &apos;static/js/[name].chunk.js&apos;,
  publicPath: publicPath,
  devtoolModuleFilenameTemplate: info =&gt;
    path.resolve(info.absoluteResourcePath),
},
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>entry: [
  <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;react-dev-utils/webpackHotDevClient&apos;</span>),
  <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;./polyfills&apos;</span>),
  <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;react-error-overlay&apos;</span>),
  paths.appIndexJs,
],
<span class="hljs-attr">output</span>: {
  <span class="hljs-attr">path</span>: paths.appBuild,
  <span class="hljs-attr">pathinfo</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/bundle.js&apos;</span>,
  <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&apos;static/js/[name].chunk.js&apos;</span>,
  <span class="hljs-attr">publicPath</span>: publicPath,
  <span class="hljs-attr">devtoolModuleFilenameTemplate</span>: <span class="hljs-function"><span class="hljs-params">info</span> =&gt;</span>
    path.resolve(info.absoluteResourcePath),
},
 </code></pre><p>&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  entry: {
    index: [
      require.resolve(&apos;./polyfills&apos;),
      require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
      paths.appIndexJs,
    ],
    mobile: [
      require.resolve(&apos;./polyfills&apos;),
      require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
      paths.appSrc + &quot;/mobile/index.js&quot;,
    ]
  },
  output: {
    pathinfo: true,
    filename: &apos;static/js/[name].bundle.js&apos;,
    chunkFilename: &apos;static/js/[name].chunk.js&apos;,
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =&gt;
      path.resolve(info.absoluteResourcePath).replace(/\\/g, &apos;/&apos;),
  },
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>  <span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">index</span>: [
      require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;./polyfills&apos;</span>),
      require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;react-dev-utils/webpackHotDevClient&apos;</span>),
      paths.appIndexJs,
    ],
    mobile: [
      require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;./polyfills&apos;</span>),
      require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;react-dev-utils/webpackHotDevClient&apos;</span>),
      paths.appSrc + <span class="hljs-string">&quot;/mobile/index.js&quot;</span>,
    ]
  },
  <span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">pathinfo</span>: true,
    filename: <span class="hljs-string">&apos;static/js/[name].bundle.js&apos;</span>,
    chunkFilename: <span class="hljs-string">&apos;static/js/[name].chunk.js&apos;</span>,
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =&gt;
      path.<span class="hljs-built_in">resolve</span>(info.absoluteResourcePath).<span class="hljs-built_in">replace</span>(/\\/g, <span class="hljs-string">&apos;/&apos;</span>),
  },
</code></pre><p>&#x53EF;&#x80FD;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>entry&#x4ECE;&#x539F;&#x6765;&#x7684;&#x6570;&#x7EC4;&#x6269;&#x5C55;&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6BCF;&#x4E2A;key&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x3002;</li><li>output&#x4E2D;&#x7684;filename&#x8981;&#x533A;&#x5206;&#x8F93;&#x51FA;&#x540D;&#xFF0C;&#x53EF;&#x589E;&#x52A0;[name]&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x6837;&#x4F1A;&#x6839;&#x636E;entry&#x5206;&#x522B;&#x7F16;&#x8BD1;&#x51FA;&#x6BCF;&#x4E2A;entry&#x7684;js&#x6587;&#x4EF6;&#x3002;</li></ul><p>&#x8FD9;&#x6837;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x5728;<code>src</code> &#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x8D77;&#x4E00;&#x4E2A;&#x6C11;&#x76EE;&#x5F55;&#x5F00;&#x53D1;&#x65B0;&#x7684;SPA&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh6ig?w=362&amp;h=706" src="https://static.alili.tech/img/bVbh6ig?w=362&amp;h=706" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader5">step3: &#x751F;&#x6210;&#x591A;&#x4E2A;html&#x5165;&#x53E3;&#x6587;&#x4EF6;</h2><p>Webpack&#x914D;&#x7F6E;&#x591A;&#x5165;&#x53E3;&#x540E;&#xFF0C;&#x53EA;&#x662F;&#x7F16;&#x8BD1;&#x51FA;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#x7684;Js&#xFF0C;&#x5165;&#x53E3;&#x7684;HTML&#x6587;&#x4EF6;&#x4E5F;&#x9700;&#x8981;&#x914D;&#x7F6E;&#xFF0C; &#x53EF;&#x4EE5;&#x7528;HtmlWebpackPlugin&#x6765;&#x751F;&#x6210;&#x3002;</p><p><code>webpack.config.dev.js</code> &#x539F;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Generates an `index.html` file with the &lt;script&gt; injected.
    new HtmlWebpackPlugin({
      inject: true,
      chunks: [&quot;index&quot;],
      template: paths.appHtml,
    }),
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>    <span class="hljs-comment">// Generates an `index.html` file with the &lt;script&gt; injected.</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      inject: <span class="hljs-literal">true</span>,
      chunks: [<span class="hljs-string">&quot;index&quot;</span>],
      <span class="hljs-keyword">template</span>: paths.appHtml,
    }),
</code></pre><p>&#x9700;&#x8981;&#x52A0;&#x591A;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#xFF0C; &#x6539;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Generates an `index.html` file with the &lt;script&gt; injected.
    new HtmlWebpackPlugin({
      inject: true,
      chunks: [&quot;index&quot;],
      template: paths.appHtml,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: [&quot;mobile&quot;],
      template: paths.appHtml,
      filename: &apos;mobile.html&apos;,
    }),
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>    <span class="hljs-comment">// Generates an `index.html` file with the &lt;script&gt; injected.</span>
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
      <span class="hljs-attribute">inject</span>: true,
      <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">&quot;index&quot;</span>],
      <span class="hljs-attribute">template</span>: paths.appHtml,
    }),
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
      <span class="hljs-attribute">inject</span>: true,
      <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">&quot;mobile&quot;</span>],
      <span class="hljs-attribute">template</span>: paths.appHtml,
      <span class="hljs-attribute">filename</span>: <span class="hljs-string">&apos;mobile.html&apos;</span>,
    }),
</code></pre><ul><li>&#x6BCF;&#x8C03;&#x4E00;&#x6B21;HtmlWebpackPlugin&#x751F;&#x6210;&#x4E00;&#x6B21;HTML&#x9875;&#x9762;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x4E2A;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x4F1A;&#x591A;&#x589E;&#x52A0;&#x4E00;&#x4E2A;mobile.html&#x8282;&#x70B9;&#x3002;</li><li>chunks&#xFF1A; &#x6307;&#x660E;&#x54EA;&#x4E9B;webpack&#x5165;&#x53E3;&#x7684;js&#x4F1A;&#x88AB;&#x6CE8;&#x5165;&#x5230;&#x8FD9;&#x4E2A;HTML&#x9875;&#x9762;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x914D;&#x7F6E;&#xFF0C;&#x5219;&#x5C06;&#x6240;&#x6709;entry&#x7684;JS&#x6587;&#x4EF6;&#x90FD;&#x6CE8;&#x5165;HTML&#x3002;</li><li>filename: &#x6307;&#x660E;&#x751F;&#x6210;&#x7684;HTML&#x8DEF;&#x5F84;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x914D;&#x7F6E;&#x5C31;&#x662F;dist/index.html&#x3002;mobile&#x914D;&#x7F6E;&#x4E86;&#x65B0;&#x7684;filename&#xFF0C;&#x907F;&#x514D;&#x4E0E;&#x7B2C;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x76F8;&#x4E92;&#x8986;&#x76D6;&#x3002;</li><li>template&#xFF1A; &#x6307;&#x5B9A;&#x6A21;&#x7248;&#xFF0C; &#x6211;&#x8FD9;&#x91CC;&#x56E0;&#x4E3A;&#x7528;&#x7684;&#x8FD9;&#x4E24;&#x4E2A;&#x6A21;&#x7248;&#x90FD;&#x4E00;&#x6837;&#xFF0C; &#x6240;&#x4EE5;&#x5C31;&#x6307;&#x5B9A;&#x7684;&#x540C;&#x4E00;&#x4E2A;appHtml, &#x5982;&#x6709;&#x7279;&#x6B8A;&#x9700;&#x6C42;&#xFF0C; &#x5C31;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;html &#x6587;&#x4EF6;&#xFF0C; &#x5728;template&#x5B57;&#x6BB5;&#x91CC;&#x5F15;&#x7528;&#x5373;&#x53EF;&#x3002;</li></ul><h2 id="articleHeader6">Step4: &#x914D;&#x7F6E;webpack Dev Server</h2><p>&#x4E0A;&#x8FF0;&#x914D;&#x7F6E;&#x505A;&#x5B8C;&#x540E;&#xFF0C;&#x7406;&#x8BBA;&#x5C31;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#x51FA;&#x591A;&#x5165;&#x53E3;&#x7684;&#x7248;&#x672C;&#xFF1B;&#x4F46;&#x4F7F;&#x7528;npm start&#x542F;&#x52A8;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x65E0;&#x8BBA;&#x8F93;&#x5165;/index.html&#x8FD8;&#x662F;/mobile.html&#xFF0C;&#x597D;&#x50CF;&#x90FD;&#x662F;&#x548C;&#x539F;&#x6765;/index.html&#x663E;&#x793A;&#x4E00;&#x6837;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x751A;&#x81F3;&#x8F93;&#x5165;&#x663E;&#x7136;&#x4E0D;&#x5B58;&#x5728;&#x7684;/xxxx.html&#xFF0C;&#x4E5F;&#x663E;&#x793A;&#x4E3A;/index.html&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x73B0;&#x8C61;&#xFF0C;&#x521D;&#x6B65;&#x5224;&#x65AD;&#x662F;HTTP&#x670D;&#x52A1;&#x5668;&#x628A;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x4E86;/index.html&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x8FD9;&#x79CD;&#x505A;&#x6CD5;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF08;&#x672C;&#x6765;&#x5C31;&#x4E00;&#x4E2A;&#x9875;&#x9762;), &#x4F46;&#x6211;&#x4EEC;&#x65B0;&#x589E;&#x7684;/mobile.html&#x5C31;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x4E86;&#x3002;</p><p>&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863; The historyApiFallback option&#xFF0C;&#x53D1;&#x73B0;&#x662F;webpack dev server&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x8981;&#x989D;&#x5916;&#x505A;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#xFF0C;&#x9700;&#x4FEE;&#x6539;webpackDevServer.config.js&#xFF1A;</p><p>&#x539F;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="historyApiFallback: {
  // Paths with dots should still use the history fallback.
  // See https://github.com/facebookincubator/create-react-app/issues/387.
  disableDotRule: true,
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code><span class="hljs-string">historyApiFallback:</span> {
  // <span class="hljs-string">Paths </span><span class="hljs-string">with </span><span class="hljs-string">dots </span><span class="hljs-string">should </span><span class="hljs-string">still </span><span class="hljs-string">use </span><span class="hljs-string">the </span><span class="hljs-string">history </span><span class="hljs-string">fallback.</span>
  // <span class="hljs-string">See </span><span class="hljs-string">https:</span>//<span class="hljs-string">github.</span><span class="hljs-string">com/</span><span class="hljs-string">facebookincubator/</span><span class="hljs-built_in">create-react-app/issues/387.</span>
  <span class="hljs-string">disableDotRule:</span> <span class="hljs-string">true,</span>
},</code></pre><p>&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="historyApiFallback: {
  // Paths with dots should still use the history fallback.
  // See https://github.com/facebookincubator/create-react-app/issues/387.
  disableDotRule: true,
  // &#x6307;&#x660E;&#x54EA;&#x4E9B;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x5230;&#x54EA;&#x4E2A;html
  rewrites: [
    { from: /^\/mobile.html/, to: &apos;/dist/mobile.html&apos; },
  ]
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code><span class="hljs-string">historyApiFallback:</span> {
  // <span class="hljs-string">Paths </span><span class="hljs-string">with </span><span class="hljs-string">dots </span><span class="hljs-string">should </span><span class="hljs-string">still </span><span class="hljs-string">use </span><span class="hljs-string">the </span><span class="hljs-string">history </span><span class="hljs-string">fallback.</span>
  // <span class="hljs-string">See </span><span class="hljs-string">https:</span>//<span class="hljs-string">github.</span><span class="hljs-string">com/</span><span class="hljs-string">facebookincubator/</span><span class="hljs-built_in">create-react-app/issues/387.</span>
  <span class="hljs-string">disableDotRule:</span> <span class="hljs-string">true,</span>
  // &#x6307;&#x660E;&#x54EA;&#x4E9B;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x5230;&#x54EA;&#x4E2A;<span class="hljs-string">html
</span>  <span class="hljs-string">rewrites:</span> [
    { <span class="hljs-string">from:</span> /^\/<span class="hljs-string">mobile.</span><span class="hljs-string">html/</span>, <span class="hljs-string">to:</span> <span class="hljs-string">&apos;/dist/mobile.html&apos;</span> },
  ]
},</code></pre><p>&#x589E;&#x52A0;&#x7684;rewrites&#x8282;&#x70B9;&#xFF0C;&#x7279;&#x522B;&#x5BF9;/admin.html&#x8FD9;&#x4E2A;URL&#x91CD;&#x5B9A;&#x5411;&#x4E3A;/dist/mobile.html&#x9875;&#x9762;&#xFF08;&#x4E5F;&#x5C31;&#x662F;HtmlWebpackPlugin&#x8F93;&#x51FA;&#x7684;HTML&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#xFF09;&#xFF0C;&#x8FD9;&#x6837;/mobile.html&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x4E86;&#x3002;</p><p>&#x81F3;&#x6B64;&#xFF0C;dev&#x73AF;&#x5883;&#x7684;&#x591A;&#x5165;&#x53E3;&#x95EE;&#x9898;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#x3002;</p><h2 id="articleHeader7">step5: Prod &#x73AF;&#x5883;&#x914D;&#x7F6E;</h2><p>prod&#x73AF;&#x5883;&#xFF0C;&#x6BD4;dev&#x73AF;&#x5883;&#x66F4;&#x7B80;&#x5355;&#x3002;&#x7531;&#x4E8E;&#x4E0D;&#x5B58;&#x5728;webpack Dev Server&#xFF0C;&#x76F4;&#x63A5;&#x5728;config/webpack.config.prod.js&#x540C;&#x7406;&#x505A;2&#x548C;3&#x6B65;&#x9AA4;&#x5373;&#x53EF;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x624B;&#x52A8;&#x4FEE;&#x6539;URl &#x6765;&#x8BBF;&#x95EE;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh6kk?w=1682&amp;h=1322" src="https://static.alili.tech/img/bVbh6kk?w=1682&amp;h=1322" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbh6j8?w=1392&amp;h=1468" src="https://static.alili.tech/img/bVbh6j8?w=1392&amp;h=1468" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader8">&#x8DEF;&#x7531;&#x76F8;&#x5173;</h1><p>&#x5230;&#x8FD9;&#xFF0C; &#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x4FEE;&#x6539;URL &#x6765;&#x8BBF;&#x95EE;pc &#x548C; mobile&#x7684;&#x9875;&#x9762;&#x4E86;&#x3002; &#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#xFF1A;</p><p>URL&#x6700;&#x540E;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x80FD;&#x7ED9;&#x4F60;&#x624B;&#x52A8;&#x6539;&#x6765;&#x6539;&#x53BB;&#x7684;&#xFF0C; &#x9700;&#x8981;&#x6839;&#x636E;&#x8BBE;&#x5907;&#x7684;&#x60C5;&#x51B5;&#x81EA;&#x5DF1;&#x5224;&#x65AD;&#xFF0C; &#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x4E2A;&#x601D;&#x8DEF;&#xFF1A;</p><p>1: &#x914D;&#x7F6E; Nginx &#x7684;&#x8DEF;&#x5F84;&#x7684;&#x65F6;&#x5019;, &#x52A0;&#x591A;&#x4E00;&#x4E2A;alias &#x7684;&#x6620;&#x5C04;&#x3002;<br>2: &#x524D;&#x7AEF;&#x6839;&#x636E;UA&#x81EA;&#x884C;&#x914D;&#x7F6E;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x5FEB;&#x901F;&#x51FA;&#x6548;&#x679C;&#xFF0C; &#x7B80;&#x5355;&#x641E;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C; &#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh6kE?w=2022&amp;h=1698" src="https://static.alili.tech/img/bVbh6kE?w=2022&amp;h=1698" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#xFF0C; &#x4E0D;&#x7528;&#x624B;&#x52A8;&#x4FEE;&#x6539;URL &#x4E5F;&#x80FD;&#x6839;&#x636E;UA&#x81EA;&#x52A8;&#x663E;&#x793A;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;&#x4E86;, &#x5177;&#x4F53;&#x7684;&#x6548;&#x679C;&#x56FE;&#x5728;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x7684;<code>&#x5148;&#x7779;&#x4E3A;&#x5FEB;</code>&#x4E2D;&#x3002;</p><h1 id="articleHeader9">&#x5176;&#x4ED6;</h1><p>&#x4E0A;&#x9762;&#x7684;&#x8DEF;&#x7531;&#x5C31;&#x4E3A;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x51FA;&#x4E2A;&#x6548;&#x679C;&#xFF0C; &#x6BD4;&#x8F83;&#x7C97;&#x66B4;&#xFF0C; &#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#x3002;</p><h1 id="articleHeader10">&#x7ED3;&#x8BED;</h1><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x5168;&#x90E8;&#x7684;&#x7EC6;&#x8282;&#x4E86;&#xFF0C; &#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x7684;&#x6548;&#x679C;&#xFF0C; &#x4F46;&#x662F;&#x4E5F;&#x6709;&#x5F88;&#x5927;&#x4F18;&#x5316;&#x7A7A;&#x95F4;&#x3002; &#x7B49;&#x540E;&#x9762;&#x4E00;&#x6CE2;&#x9700;&#x6C42;&#x505A;&#x5B8C;&#x4E86;&#xFF0C; &#x518D;&#x6765;&#x505A;&#x8865;&#x5145;&#x5427;&#x3002;:P</p><p>End&#x3002;</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><p><a href="https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474" rel="nofollow noreferrer" target="_blank">https://medium.com/a-beginner...</a></p><p><a href="http://imshuai.com/create-react-app-multiple-entry-points/" rel="nofollow noreferrer" target="_blank">http://imshuai.com/create-rea...</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react 应用多入口 配置 && 实践总结

## 原文链接
[https://segmentfault.com/a/1190000016668274](https://segmentfault.com/a/1190000016668274)

