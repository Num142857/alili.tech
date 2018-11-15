---
title: Webpack4 搭建 Vue 项目
reprint: true
categories: reprint
abbrlink: ed7f036f
date: 2018-11-10 02:30:10
---

{{% raw %}}
<h1 id="articleHeader0">1. &#x524D;&#x8A00;</h1><p>&#x7531;&#x4E8E; Parcel &#x6253;&#x5305;&#x5DE5;&#x5177;&#x7684;&#x5F71;&#x54CD;&#xFF0C;webpack4 &#x4E5F;&#x8FFD;&#x6C42;&#x96F6;&#x914D;&#x7F6E;&#x642D;&#x5EFA;&#x9879;&#x76EE;&#x3002;&#x800C;&#x524D;&#x9635;&#x5B50;&#x51FA;&#x73B0;&#x7684; vue-cli 3.0&#x4E5F;&#x662F;&#x57FA;&#x4E8E; webpack4 &#x96F6;&#x914D;&#x7F6E;&#x7684;&#x601D;&#x60F3;&#x521B;&#x5EFA;&#x7684;&#x3002;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x4E60;&#x60EF;webpack3 &#x7684;&#x5F00;&#x53D1;&#x8005;&#x96BE;&#x514D;&#x6709;&#x4E9B;&#x4E0D;&#x4E60;&#x60EF;&#x3002;&#x672C;&#x6587;&#x5C31;&#x5E26;&#x4F60;&#x7ED5;&#x8FC7; vue-cli&#xFF0C;&#x7528; webpack4 &#x4E00;&#x6B65;&#x6B65;&#x642D;&#x5EFA; vue &#x9879;&#x76EE;&#x3002;</p><p><strong>&#x6CE8;&#xFF1A;&#xFF08;&#x672C;&#x6587;&#x8BB2;&#x8FF0;&#x7684;&#x662F;webpack4&#x57FA;&#x7840;&#x914D;&#x7F6E;&#xFF0C;&#x6587;&#x7AE0;&#x6709;&#x70B9;&#x957F;&#xFF0C;&#x8BF7;&#x8010;&#x5FC3;&#x770B;&#x5B8C;&#x3002;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x67E5;&#x770B;<a href="https://github.com/zxpsuper/createVue" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x6E90;&#x7801;</a>&#xFF0C;&#x6216;&#x8005;<code>ctrl + w</code>&#xFF09;</strong></p><h1 id="articleHeader1">2. &#x9879;&#x76EE;&#x642D;&#x5EFA;</h1><ol><li>&#x521B;&#x5EFA; createVue &#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x8FDB;&#x5165;&#x8BE5;&#x6587;&#x4EF6;&#x5939;&#xFF0C; <code>npm init</code> &#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</li><li>&#x5B89;&#x88C5; webpack &#x56DB;&#x4EF6;&#x5957;</li></ol><p><code>npm i webpack webpack-cli webpack-dev-server webpack-merge --save-dev</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F53;&#x524D;&#x6211;&#x4F7F;&#x7528;&#x7248;&#x672C;
&quot;webpack&quot;: &quot;^4.16.3&quot;,
&quot;webpack-cli&quot;: &quot;^3.1.0&quot;,
&quot;webpack-dev-server&quot;: &quot;^3.1.5&quot;, // &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;
&quot;webpack-merge&quot;: &quot;^4.1.4&quot; // webpack &#x914D;&#x7F6E;&#x5408;&#x5E76;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5F53;&#x524D;&#x6211;&#x4F7F;&#x7528;&#x7248;&#x672C;</span>
<span class="hljs-string">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.16.3&quot;</span>,
<span class="hljs-string">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.1.0&quot;</span>,
<span class="hljs-string">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^3.1.5&quot;</span>, <span class="hljs-comment">// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;</span>
<span class="hljs-string">&quot;webpack-merge&quot;</span>: <span class="hljs-string">&quot;^4.1.4&quot;</span> <span class="hljs-comment">// webpack &#x914D;&#x7F6E;&#x5408;&#x5E76;</span></code></pre><ol><li>&#x521B;&#x5EFA;&#x76F8;&#x5E94;&#x6587;&#x4EF6;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createVue
  |--dist
  |--build
      |--webpack.prod.js
      |--webpack.dev.js
      |--webpack.base.js
  |--src
      |--index.js
      |--app.vue
  |--index.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>createVue
  <span class="hljs-string">|--dist</span>
  <span class="hljs-string">|--build</span>
      <span class="hljs-string">|--webpack.prod.js</span>
      <span class="hljs-string">|--webpack.dev.js</span>
      <span class="hljs-string">|--webpack.base.js</span>
  <span class="hljs-string">|--src</span>
      <span class="hljs-string">|--index.js</span>
      <span class="hljs-string">|--app.vue</span>
  <span class="hljs-string">|--index.html</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js
// &#x5B58;&#x653E; dev &#x548C; prod &#x901A;&#x7528;&#x914D;&#x7F6E;
const webpack = require(&apos;webpack&apos;);

module.exports = {
  entry: &apos;./src/index.js&apos;, //&#x5165;&#x53E3;
  module: {
    rules: []
  },
  plugins: [
    // &#x89E3;&#x51B3;vender&#x540E;&#x9762;&#x7684;hash&#x6BCF;&#x6B21;&#x90FD;&#x6539;&#x53D8;
    new webpack.HashedModuleIdsPlugin(),
  ],// &#x63D2;&#x4EF6;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>
<span class="hljs-comment">// &#x5B58;&#x653E; dev &#x548C; prod &#x901A;&#x7528;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">&apos;./src/index.js&apos;</span>, <span class="hljs-comment">//&#x5165;&#x53E3;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: []
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// &#x89E3;&#x51B3;vender&#x540E;&#x9762;&#x7684;hash&#x6BCF;&#x6B21;&#x90FD;&#x6539;&#x53D8;</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
  ],<span class="hljs-comment">// &#x63D2;&#x4EF6;</span>
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.dev.js
// &#x5B58;&#x653E; dev &#x914D;&#x7F6E;
const merge = require(&apos;webpack-merge&apos;);
const common = require(&apos;./webpack.base.js&apos;);
const path = require(&apos;path&apos;);

module.exports = merge(common, {
  devtool: &apos;inline-source-map&apos;,
  devServer: { // &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;
    contentBase: &apos;../dist&apos;
  },
  output: { // &#x8F93;&#x51FA;
    filename: &apos;js/[name].[hash].js&apos;, // &#x6BCF;&#x6B21;&#x4FDD;&#x5B58; hash &#x90FD;&#x53D8;&#x5316;
    path: path.resolve(__dirname, &apos;../dist&apos;)
  },
  module: {},
  mode: &apos;development&apos;,
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.dev.js</span>
<span class="hljs-comment">// &#x5B58;&#x653E; dev &#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> common = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.js&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(common, {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;inline-source-map&apos;</span>,
  <span class="hljs-attr">devServer</span>: { <span class="hljs-comment">// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;</span>
    contentBase: <span class="hljs-string">&apos;../dist&apos;</span>
  },
  <span class="hljs-attr">output</span>: { <span class="hljs-comment">// &#x8F93;&#x51FA;</span>
    filename: <span class="hljs-string">&apos;js/[name].[hash].js&apos;</span>, <span class="hljs-comment">// &#x6BCF;&#x6B21;&#x4FDD;&#x5B58; hash &#x90FD;&#x53D8;&#x5316;</span>
    path: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>)
  },
  <span class="hljs-attr">module</span>: {},
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;development&apos;</span>,
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js
// &#x5B58;&#x653E; prod &#x914D;&#x7F6E;
const path = require(&apos;path&apos;);
// &#x5408;&#x5E76;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
const merge = require(&apos;webpack-merge&apos;);
const common = require(&apos;./webpack.base.js&apos;);

module.exports = merge(common, {
  module: {},
  plugins: [],
  mode: &apos;production&apos;,
  output: {
    filename: &apos;js/[name].[contenthash].js&apos;, //contenthash &#x82E5;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x65E0;&#x53D8;&#x5316;&#xFF0C;&#x5219;contenthash &#x540D;&#x79F0;&#x4E0D;&#x53D8;
    path: path.resolve(__dirname, &apos;../dist&apos;)
  },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>
<span class="hljs-comment">// &#x5B58;&#x653E; prod &#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-comment">// &#x5408;&#x5E76;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> common = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.js&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(common, {
  <span class="hljs-attr">module</span>: {},
  <span class="hljs-attr">plugins</span>: [],
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;production&apos;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;js/[name].[contenthash].js&apos;</span>, <span class="hljs-comment">//contenthash &#x82E5;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x65E0;&#x53D8;&#x5316;&#xFF0C;&#x5219;contenthash &#x540D;&#x79F0;&#x4E0D;&#x53D8;</span>
    path: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>)
  },
});</code></pre><p><strong>webpack4 &#x589E;&#x52A0;&#x4E86; mode &#x5C5E;&#x6027;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E3A; development / production,&#x4EE5;&#x4E0B;&#x662F;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="development:

process.env.NODE_ENV &#x7684;&#x503C;&#x8BBE;&#x4E3A; development
&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x4EE5;&#x4E0B;&#x63D2;&#x4EF6;&#xFF0C;&#x5145;&#x5206;&#x5229;&#x7528;&#x4E86;&#x6301;&#x4E45;&#x5316;&#x7F13;&#x5B58;&#x3002;&#x53C2;&#x8003;&#x57FA;&#x4E8E; webpack &#x7684;&#x6301;&#x4E45;&#x5316;&#x7F13;&#x5B58;&#x65B9;&#x6848;

NamedChunksPlugin &#xFF1A;&#x4EE5;&#x540D;&#x79F0;&#x56FA;&#x5316; chunk id
NamedModulesPlugin &#xFF1A;&#x4EE5;&#x540D;&#x79F0;&#x56FA;&#x5316; module id

production:

process.env.NODE_ENV &#x7684;&#x503C;&#x8BBE;&#x4E3A; production
&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x4EE5;&#x4E0B;&#x63D2;&#x4EF6;&#xFF0C;&#x5176;&#x4E2D; SideEffectsFlagPlugin &#x548C; UglifyJsPlugin &#x7528;&#x4E8E; tree-shaking


FlagDependencyUsagePlugin &#xFF1A;&#x7F16;&#x8BD1;&#x65F6;&#x6807;&#x8BB0;&#x4F9D;&#x8D56;
FlagIncludedChunksPlugin &#xFF1A;&#x6807;&#x8BB0;&#x5B50;chunks&#xFF0C;&#x9632;&#x5B50;chunks&#x591A;&#x6B21;&#x52A0;&#x8F7D;
ModuleConcatenationPlugin &#xFF1A;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;(scope hosting),&#x9884;&#x7F16;&#x8BD1;&#x529F;&#x80FD;,&#x63D0;&#x5347;&#x6216;&#x8005;&#x9884;&#x7F16;&#x8BD1;&#x6240;&#x6709;&#x6A21;&#x5757;&#x5230;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x4E2D;&#xFF0C;&#x63D0;&#x5347;&#x4EE3;&#x7801;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x6267;&#x884C;&#x901F;&#x5EA6;
NoEmitOnErrorsPlugin &#xFF1A;&#x5728;&#x8F93;&#x51FA;&#x9636;&#x6BB5;&#x65F6;&#xFF0C;&#x9047;&#x5230;&#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x8DF3;&#x8FC7;
OccurrenceOrderPlugin &#xFF1A;&#x7ED9;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x7684;ids&#x66F4;&#x77ED;&#x7684;&#x503C;
SideEffectsFlagPlugin &#xFF1A;&#x8BC6;&#x522B; package.json &#x6216;&#x8005; module.rules &#x7684; sideEffects &#x6807;&#x5FD7;&#xFF08;&#x7EAF;&#x7684; ES2015 &#x6A21;&#x5757;)&#xFF0C;&#x5B89;&#x5168;&#x5730;&#x5220;&#x9664;&#x672A;&#x7528;&#x5230;&#x7684; export &#x5BFC;&#x51FA;
UglifyJsPlugin &#xFF1A;&#x5220;&#x9664;&#x672A;&#x5F15;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x538B;&#x7F29;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>development:

process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> &#x7684;&#x503C;&#x8BBE;&#x4E3A; development
&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x4EE5;&#x4E0B;&#x63D2;&#x4EF6;&#xFF0C;&#x5145;&#x5206;&#x5229;&#x7528;&#x4E86;&#x6301;&#x4E45;&#x5316;&#x7F13;&#x5B58;&#x3002;&#x53C2;&#x8003;&#x57FA;&#x4E8E; webpack &#x7684;&#x6301;&#x4E45;&#x5316;&#x7F13;&#x5B58;&#x65B9;&#x6848;

NamedChunksPlugin &#xFF1A;&#x4EE5;&#x540D;&#x79F0;&#x56FA;&#x5316; chunk id
NamedModulesPlugin &#xFF1A;&#x4EE5;&#x540D;&#x79F0;&#x56FA;&#x5316; module id

production:

process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> &#x7684;&#x503C;&#x8BBE;&#x4E3A; production
&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x4EE5;&#x4E0B;&#x63D2;&#x4EF6;&#xFF0C;&#x5176;&#x4E2D; SideEffectsFlagPlugin &#x548C; UglifyJsPlugin &#x7528;&#x4E8E; tree-shaking


FlagDependencyUsagePlugin &#xFF1A;&#x7F16;&#x8BD1;&#x65F6;&#x6807;&#x8BB0;&#x4F9D;&#x8D56;
FlagIncludedChunksPlugin &#xFF1A;&#x6807;&#x8BB0;&#x5B50;chunks&#xFF0C;&#x9632;&#x5B50;chunks&#x591A;&#x6B21;&#x52A0;&#x8F7D;
ModuleConcatenationPlugin &#xFF1A;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;(scope hosting),&#x9884;&#x7F16;&#x8BD1;&#x529F;&#x80FD;,&#x63D0;&#x5347;&#x6216;&#x8005;&#x9884;&#x7F16;&#x8BD1;&#x6240;&#x6709;&#x6A21;&#x5757;&#x5230;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x4E2D;&#xFF0C;&#x63D0;&#x5347;&#x4EE3;&#x7801;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x6267;&#x884C;&#x901F;&#x5EA6;
NoEmitOnErrorsPlugin &#xFF1A;&#x5728;&#x8F93;&#x51FA;&#x9636;&#x6BB5;&#x65F6;&#xFF0C;&#x9047;&#x5230;&#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x8DF3;&#x8FC7;
OccurrenceOrderPlugin &#xFF1A;&#x7ED9;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x7684;ids&#x66F4;&#x77ED;&#x7684;&#x503C;
SideEffectsFlagPlugin &#xFF1A;&#x8BC6;&#x522B; package<span class="hljs-selector-class">.json</span> &#x6216;&#x8005; module<span class="hljs-selector-class">.rules</span> &#x7684; sideEffects &#x6807;&#x5FD7;&#xFF08;&#x7EAF;&#x7684; ES2015 &#x6A21;&#x5757;)&#xFF0C;&#x5B89;&#x5168;&#x5730;&#x5220;&#x9664;&#x672A;&#x7528;&#x5230;&#x7684; export &#x5BFC;&#x51FA;
UglifyJsPlugin &#xFF1A;&#x5220;&#x9664;&#x672A;&#x5F15;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x538B;&#x7F29;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
// &#x9700; npm i vue --save
import Vue from &apos;vue&apos;;
import App from &apos;./App.vue&apos;
import &apos;./index.scss&apos;
new Vue({
  el: &apos;#app&apos;,
  render: h =&gt; h(App),
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>
<span class="hljs-comment">// &#x9700; npm i vue --save</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./index.scss&apos;</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- app.vue --&gt;
&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    hello world
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &apos;app&apos;
}
&lt;/script&gt;

&lt;style scoped&gt;
#app {
  font-family: &apos;Avenir&apos;, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- app.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    hello world
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;app&apos;</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&apos;Avenir&apos;</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Suporka Vue App&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Suporka Vue App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><ol><li>&#x5B89;&#x88C5; vue &#x6838;&#x5FC3;&#x89E3;&#x6790;&#x63D2;&#x4EF6;</li></ol><p><code>npm i vue-loader vue-template-compiler --save-dev</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F53;&#x524D;&#x6211;&#x4F7F;&#x7528;&#x7248;&#x672C;
&quot;vue-loader&quot;: &quot;^15.2.6&quot;,
&quot;vue-template-compiler&quot;: &quot;^2.5.17&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5F53;&#x524D;&#x6211;&#x4F7F;&#x7528;&#x7248;&#x672C;</span>
<span class="hljs-string">&quot;vue-loader&quot;</span>: <span class="hljs-string">&quot;^15.2.6&quot;</span>,
<span class="hljs-string">&quot;vue-template-compiler&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>,</code></pre><p>&#x7531;&#x4E8E; vue &#x7684;&#x89E3;&#x6790;&#x5728; dev &#x548C; prod &#x4E2D;&#x5747;&#x9700;&#x4F7F;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x5F52;&#x5165;&#x57FA;&#x672C;&#x914D;&#x7F6E; base</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js

// ...&#x7701;&#x7565;&#x53F7;
// vue-loader &#x63D2;&#x4EF6;
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;);
module.exports = {
  //...&#x7701;&#x7565;&#x53F7;
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: &apos;vue-loader&apos;
      }
    ]
  },
  plugins: [
    // &#x8BF7;&#x786E;&#x4FDD;&#x5F15;&#x5165;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x6765;&#x65BD;&#x5C55;&#x9B54;&#x6CD5;
    new VueLoaderPlugin(),
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>

<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
<span class="hljs-comment">// vue-loader &#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//...&#x7701;&#x7565;&#x53F7;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// &#x8BF7;&#x786E;&#x4FDD;&#x5F15;&#x5165;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x6765;&#x65BD;&#x5C55;&#x9B54;&#x6CD5;</span>
    <span class="hljs-keyword">new</span> VueLoaderPlugin(),
  ]
};</code></pre><ol><li>&#x5B89;&#x88C5; html &#x6A21;&#x677F;&#x89E3;&#x6790;&#x63D2;&#x4EF6;</li></ol><p><code>npm i html-webpack-plugin --save-dev</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F53;&#x524D;&#x7248;&#x672C; 
&quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5F53;&#x524D;&#x7248;&#x672C; </span>
<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^3.2.0&quot;</span></code></pre><p>html &#x89E3;&#x6790;&#x4E5F;&#x5C5E;&#x4E8E;&#x57FA;&#x672C;&#x914D;&#x7F6E;&#xFF0C;&#x5F52;&#x5165; base</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js

// ...&#x7701;&#x7565;&#x53F7;
// html&#x63D2;&#x4EF6;
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
module.exports = {
  //...&#x7701;&#x7565;&#x53F7;
  plugins: [
    //...&#x7701;&#x7565;&#x53F7;
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../index.html&apos;),
    }),
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>

<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
<span class="hljs-comment">// html&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//...&#x7701;&#x7565;&#x53F7;</span>
  plugins: [
    <span class="hljs-comment">//...&#x7701;&#x7565;&#x53F7;</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../index.html&apos;</span>),
    }),
  ]
};</code></pre><ol><li>&#x521B;&#x5EFA; npm &#x547D;&#x4EE4;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;webpack-dev-server --hot --open --config build/webpack.dev.js&quot;,
  &quot;build&quot;: &quot;webpack --config build/webpack.prod.js&quot;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="JSON"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --hot --open --config build/webpack.dev.js&quot;</span>,
  <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --config build/webpack.prod.js&quot;</span>
},</code></pre><p>--hot &#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;</p><p>--open &#x5F00;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;</p><p>&#x6B64;&#x65F6; <code>npm start</code>&#xFF0C;&#x9879;&#x76EE;&#x53EF;&#x6B63;&#x5E38;&#x8FD0;&#x884C;</p><h1 id="articleHeader2">3. &#x529F;&#x80FD;&#x62D3;&#x5C55;</h1><ol><li>&#x6DFB;&#x52A0; loader</li></ol><ul><li>CSS loader (&#x5305;&#x62EC;&#x524D;&#x5904;&#x7406;&#x548C;&#x540E;&#x5904;&#x7406;)</li></ul><p>CSS &#x57FA;&#x7840; loader</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;css-loader&quot;: &quot;^1.0.0&quot;,
&quot;style-loader&quot;: &quot;^0.21.0&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^1.0.0&quot;</span>,
<span class="hljs-string">&quot;style-loader&quot;</span>: <span class="hljs-string">&quot;^0.21.0&quot;</span>,</code></pre><p>CSS &#x524D;&#x5904;&#x7406; less &#x4E24;&#x4EF6;&#x5957;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;less&quot;: &quot;^3.8.0&quot;,
&quot;less-loader&quot;: &quot;^4.1.0&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;less&quot;</span>: <span class="hljs-string">&quot;^3.8.0&quot;</span>,
<span class="hljs-string">&quot;less-loader&quot;</span>: <span class="hljs-string">&quot;^4.1.0&quot;</span>,</code></pre><p>CSS &#x524D;&#x5904;&#x7406; sass &#x4E24;&#x4EF6;&#x5957;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;node-sass&quot;: &quot;^4.9.2&quot;,
&quot;sass-loader&quot;: &quot;^7.1.0&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;node-sass&quot;</span>: <span class="hljs-string">&quot;^4.9.2&quot;</span>,
<span class="hljs-string">&quot;sass-loader&quot;</span>: <span class="hljs-string">&quot;^7.1.0&quot;</span>,</code></pre><p>CSS &#x540E;&#x5904;&#x7406; postcss &#x4E24;&#x4EF6;&#x5957;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;postcss-loader&quot;: &quot;^2.1.6&quot;,
&quot;autoprefixer&quot;: &quot;^9.1.0&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;postcss-loader&quot;</span>: <span class="hljs-string">&quot;^2.1.6&quot;</span>,
<span class="hljs-string">&quot;autoprefixer&quot;</span>: <span class="hljs-string">&quot;^9.1.0&quot;</span>,</code></pre><p>&#x5E76;&#x5728;&#x6839;&#x6587;&#x4EF6;&#x5939;&#x521B;&#x5EFA; postcss.config.js &#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// postcss.config.js
// &#x81EA;&#x52A8;&#x6DFB;&#x52A0;css&#x517C;&#x5BB9;&#x5C5E;&#x6027;
module.exports = {
  plugins: [
    require(&apos;autoprefixer&apos;)
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// postcss.config.js</span>
<span class="hljs-comment">// &#x81EA;&#x52A8;&#x6DFB;&#x52A0;css&#x517C;&#x5BB9;&#x5C5E;&#x6027;</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;autoprefixer&apos;</span>)
  ]
}</code></pre><p>&#x5B89;&#x88C5;&#x4EE5;&#x4E0A;&#x4F9D;&#x8D56;&#xFF0C;&#x5728; base &#x6587;&#x4EF6;&#x4E2D;&#x52A0;&#x5165;&#x4E00;&#x4E0B; loader &#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js

// ...&#x7701;&#x7565;&#x53F7;
rules: [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      &apos;style-loader&apos;,
      &apos;css-loader&apos;,
      &apos;postcss-loader&apos;,
      &apos;sass-loader&apos;,
    ],
  },
  {
    test: /\.less$/,
    use: [
      &apos;style-loader&apos;,
      &apos;css-loader&apos;,
      &apos;postcss-loader&apos;,
      &apos;less-loader&apos;,
    ],
  },
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>

<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
rules: [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(sa|sc|c)ss$/</span>,
    <span class="hljs-attr">use</span>: [
      <span class="hljs-string">&apos;style-loader&apos;</span>,
      <span class="hljs-string">&apos;css-loader&apos;</span>,
      <span class="hljs-string">&apos;postcss-loader&apos;</span>,
      <span class="hljs-string">&apos;sass-loader&apos;</span>,
    ],
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">use</span>: [
      <span class="hljs-string">&apos;style-loader&apos;</span>,
      <span class="hljs-string">&apos;css-loader&apos;</span>,
      <span class="hljs-string">&apos;postcss-loader&apos;</span>,
      <span class="hljs-string">&apos;less-loader&apos;</span>,
    ],
  },
]</code></pre><ul><li>&#x56FE;&#x7247; loader</li></ul><p>&#x89E3;&#x6790;&#x56FE;&#x7247;&#xFF0C;&#x5B57;&#x4F53;&#x7B49;&#x90FD;&#x662F;&#x7528; file-loader&#xFF0C;&#x5B89;&#x88C5;<code>npm i file-loader --save-dev</code></p><p>base &#x6587;&#x4EF6;&#x52A0;&#x5165;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js

// ...&#x7701;&#x7565;&#x53F7;
rules: [
  // ...&#x7701;&#x7565;&#x53F7;
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader: &apos;file-loader&apos;,
        options: {
          limit: 5000,
          // &#x5206;&#x79BB;&#x56FE;&#x7247;&#x81F3;imgs&#x6587;&#x4EF6;&#x5939;
          name: &quot;imgs/[name].[ext]&quot;,
        }
      },
    ]
  },
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>

<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
rules: [
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
    <span class="hljs-attr">use</span>: [
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;file-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">5000</span>,
          <span class="hljs-comment">// &#x5206;&#x79BB;&#x56FE;&#x7247;&#x81F3;imgs&#x6587;&#x4EF6;&#x5939;</span>
          name: <span class="hljs-string">&quot;imgs/[name].[ext]&quot;</span>,
        }
      },
    ]
  },
]</code></pre><h1 id="articleHeader3">4. &#x6253;&#x5305;&#x4F18;&#x5316;</h1><ol><li>&#x89E3;&#x51B3;&#x6BCF;&#x6B21;&#x91CD;&#x65B0;&#x6253;&#x5305;&#xFF0C;dist &#x6587;&#x4EF6;&#x5939;&#x6587;&#x4EF6;&#x672A;&#x6E05;&#x9664;</li></ol><ul><li>&#x5B89;&#x88C5; clean-webpack-plugin &#x63D2;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js

// &#x6253;&#x5305;&#x4E4B;&#x524D;&#x6E05;&#x9664;&#x6587;&#x4EF6;
const CleanWebpackPlugin = require(&apos;clean-webpack-plugin&apos;);
// ...&#x7701;&#x7565;&#x53F7;
plugins: [
  new CleanWebpackPlugin([&apos;dist/*&apos;], {
    root: path.resolve(__dirname, &apos;../&apos;)
  }),
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>

<span class="hljs-comment">// &#x6253;&#x5305;&#x4E4B;&#x524D;&#x6E05;&#x9664;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;clean-webpack-plugin&apos;</span>);
<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
plugins: [
  <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">&apos;dist/*&apos;</span>], {
    <span class="hljs-attr">root</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../&apos;</span>)
  }),
]</code></pre><ol><li>&#x5206;&#x79BB; CSS</li></ol><p>webpack4 &#x4E2D;&#x4F7F;&#x7528; mini-css-extract-plugin &#x63D2;&#x4EF6;&#x6765;&#x5206;&#x79BB; css&#x3002;</p><ul><li>&#x5B89;&#x88C5; mini-css-extract-plugin &#x63D2;&#x4EF6;&#x540E;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js

// &#x5206;&#x79BB;CSS&#x63D2;&#x4EF6;
const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
// ...&#x7701;&#x7565;&#x53F7;
plugins: [
  new MiniCssExtractPlugin({
    filename: &quot;css/[name].[hash].css&quot;,
    chunkFilename: &apos;css/[id].[hash].css&apos;
  }),
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>

<span class="hljs-comment">// &#x5206;&#x79BB;CSS&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;mini-css-extract-plugin&quot;</span>);
<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
plugins: [
  <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;css/[name].[hash].css&quot;</span>,
    <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&apos;css/[id].[hash].css&apos;</span>
  }),
]</code></pre><p>&#x53E6;&#x5916;&#xFF0C;&#x8FD8;&#x9700;&#x5C06;&#x5404;&#x4E2A; css loader&#x4E2D;&#x7684;style-loader &#x66FF;&#x6362;&#x4E3A; MiniCssExtractPlugin</p><p>&#x56FE;&#x7247;&#x538B;&#x7F29;&#x4F7F;&#x7528; <code>image-webpack-loader</code>, &#x5B89;&#x88C5;&#x540E;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js
// ...&#x7701;&#x7565;&#x53F7;
rules: [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: &apos;../&apos;
        }
      },
      &apos;css-loader&apos;,
      &apos;postcss-loader&apos;,
      &apos;sass-loader&apos;,
    ],
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: &apos;../&apos;
        }
      },
      &apos;css-loader&apos;,
      &apos;postcss-loader&apos;,
      &apos;less-loader&apos;,
    ],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader: &apos;file-loader&apos;,
        options: {
          limit: 5000,
          name: &quot;imgs/[hash].[ext]&quot;,
        }
      },
      // &#x56FE;&#x7247;&#x538B;&#x7F29;
      {
        loader: &apos;image-webpack-loader&apos;,
        options: {
          //   bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: &apos;65-90&apos;,
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          }
        },
      },
    ]
  },
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>
<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
rules: [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(sa|sc|c)ss$/</span>,
    <span class="hljs-attr">use</span>: [
      {
        <span class="hljs-attr">loader</span>: MiniCssExtractPlugin.loader,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// you can specify a publicPath here</span>
          <span class="hljs-comment">// by default it use publicPath in webpackOptions.output</span>
          publicPath: <span class="hljs-string">&apos;../&apos;</span>
        }
      },
      <span class="hljs-string">&apos;css-loader&apos;</span>,
      <span class="hljs-string">&apos;postcss-loader&apos;</span>,
      <span class="hljs-string">&apos;sass-loader&apos;</span>,
    ],
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">use</span>: [
      {
        <span class="hljs-attr">loader</span>: MiniCssExtractPlugin.loader,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// you can specify a publicPath here</span>
          <span class="hljs-comment">// by default it use publicPath in webpackOptions.output</span>
          publicPath: <span class="hljs-string">&apos;../&apos;</span>
        }
      },
      <span class="hljs-string">&apos;css-loader&apos;</span>,
      <span class="hljs-string">&apos;postcss-loader&apos;</span>,
      <span class="hljs-string">&apos;less-loader&apos;</span>,
    ],
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
    <span class="hljs-attr">use</span>: [
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;file-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">5000</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;imgs/[hash].[ext]&quot;</span>,
        }
      },
      <span class="hljs-comment">// &#x56FE;&#x7247;&#x538B;&#x7F29;</span>
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;image-webpack-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">//   bypassOnDebug: true,</span>
          mozjpeg: {
            <span class="hljs-attr">progressive</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">quality</span>: <span class="hljs-number">65</span>
          },
          <span class="hljs-attr">optipng</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>,
          },
          <span class="hljs-attr">pngquant</span>: {
            <span class="hljs-attr">quality</span>: <span class="hljs-string">&apos;65-90&apos;</span>,
            <span class="hljs-attr">speed</span>: <span class="hljs-number">4</span>
          },
          <span class="hljs-attr">gifsicle</span>: {
            <span class="hljs-attr">interlaced</span>: <span class="hljs-literal">false</span>,
          }
        },
      },
    ]
  },
]</code></pre><ol><li>&#x4F7F;&#x7528; happypack &#x591A;&#x8FDB;&#x7A0B;&#x52A0;&#x5FEB;&#x7F16;&#x8BD1;&#x901F;&#x5EA6;</li></ol><p>&#x540C;&#x65F6;&#x4E5F;&#x9700;&#x8981;&#x5B89;&#x88C5; babel &#x4E24;&#x4EF6;&#x5957;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel-core&quot;: &quot;^6.26.3&quot;,
&quot;babel-loader&quot;: &quot;^7.1.5&quot;,
&quot;happypack&quot;: &quot;^5.0.0&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;babel-core&quot;</span>: <span class="hljs-string">&quot;^6.26.3&quot;</span>,
<span class="hljs-string">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^7.1.5&quot;</span>,
<span class="hljs-string">&quot;happypack&quot;</span>: <span class="hljs-string">&quot;^5.0.0&quot;</span>,</code></pre><p>happypack &#x5F00;&#x53D1;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x90FD;&#x7528;&#x5230;&#xFF0C;&#x914D;&#x7F6E;&#x5F52;&#x5165; base</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.js
// &#x4F7F;&#x7528;happypack
const HappyPack = require(&apos;happypack&apos;);
const os = require(&apos;os&apos;);
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// ...&#x7701;&#x7565;&#x53F7;
rules: [
  {
    test: /\.js$/,
    //&#x628A;&#x5BF9;.js &#x7684;&#x6587;&#x4EF6;&#x5904;&#x7406;&#x4EA4;&#x7ED9;id&#x4E3A;happyBabel &#x7684;HappyPack &#x7684;&#x5B9E;&#x4F8B;&#x6267;&#x884C;
    loader: &apos;happypack/loader?id=happyBabel&apos;,
    //&#x6392;&#x9664;node_modules &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;
    exclude: /node_modules/
  },
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.js</span>
<span class="hljs-comment">// &#x4F7F;&#x7528;happypack</span>
<span class="hljs-keyword">const</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;happypack&apos;</span>);
<span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;os&apos;</span>);
<span class="hljs-keyword">const</span> happyThreadPool = HappyPack.ThreadPool({ <span class="hljs-attr">size</span>: os.cpus().length });
<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
rules: [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
    <span class="hljs-comment">//&#x628A;&#x5BF9;.js &#x7684;&#x6587;&#x4EF6;&#x5904;&#x7406;&#x4EA4;&#x7ED9;id&#x4E3A;happyBabel &#x7684;HappyPack &#x7684;&#x5B9E;&#x4F8B;&#x6267;&#x884C;</span>
    loader: <span class="hljs-string">&apos;happypack/loader?id=happyBabel&apos;</span>,
    <span class="hljs-comment">//&#x6392;&#x9664;node_modules &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;</span>
    exclude: <span class="hljs-regexp">/node_modules/</span>
  },
]</code></pre><ol><li>&#x5206;&#x79BB;&#x4E0D;&#x5E38;&#x53D8;&#x5316;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5982; node_modules &#x4E0B;&#x5F15;&#x7528;&#x7684;&#x5E93;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js
module.exports = merge(common, {
  // ...&#x7701;&#x7565;&#x53F7;
  optimization: {
    // &#x5206;&#x79BB;chunks
    splitChunks: {
      chunks: &apos;all&apos;,
      cacheGroups: {
        vendor: {
          name: &quot;vendor&quot;,
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: &quot;initial&quot; // &#x53EA;&#x6253;&#x5305;&#x521D;&#x59CB;&#x65F6;&#x4F9D;&#x8D56;&#x7684;&#x7B2C;&#x4E09;&#x65B9;
        },
      }
    },
  },
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>
<span class="hljs-built_in">module</span>.exports = merge(common, {
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
  optimization: {
    <span class="hljs-comment">// &#x5206;&#x79BB;chunks</span>
    splitChunks: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>,
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">vendor</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vendor&quot;</span>,
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">10</span>,
          <span class="hljs-attr">chunks</span>: <span class="hljs-string">&quot;initial&quot;</span> <span class="hljs-comment">// &#x53EA;&#x6253;&#x5305;&#x521D;&#x59CB;&#x65F6;&#x4F9D;&#x8D56;&#x7684;&#x7B2C;&#x4E09;&#x65B9;</span>
        },
      }
    },
  },
})</code></pre><p>&#x5982;&#x6B64;&#x914D;&#x7F6E;&#xFF0C;&#x5219;&#x6253;&#x5305;&#x7684; js &#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x4F1A;&#x591A;&#x4E00;&#x4E2A; vendor.js</p><ol><li>&#x538B;&#x7F29;CSS&#x548C;JS&#x4EE3;&#x7801;</li></ol><p>&#x5B89;&#x88C5; optimize-css-assets-webpack-plugin &#x548C; uglifyjs-webpack-plugin &#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.js
// &#x538B;&#x7F29;CSS&#x548C;JS&#x4EE3;&#x7801;
// ...&#x7701;&#x7565;&#x53F7;
const OptimizeCSSAssetsPlugin = require(&quot;optimize-css-assets-webpack-plugin&quot;);
const UglifyJsPlugin = require(&quot;uglifyjs-webpack-plugin&quot;);
module.exports = merge(common, {
  // ...&#x7701;&#x7565;&#x53F7;
  optimization: {
    // ...&#x7701;&#x7565;&#x53F7;
    minimizer: [
      // &#x538B;&#x7F29;JS
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false, // &#x53BB;&#x9664;&#x8B66;&#x544A;
            drop_debugger: true, // &#x53BB;&#x9664;debugger
            drop_console: true // &#x53BB;&#x9664;console.log
          },
        },
        cache: true, // &#x5F00;&#x542F;&#x7F13;&#x5B58;
        parallel: true, // &#x5E73;&#x884C;&#x538B;&#x7F29;
        sourceMap: false // set to true if you want JS source maps
      }),
      // &#x538B;&#x7F29;css
      new OptimizeCSSAssetsPlugin({})
    ]
  },
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.prod.js</span>
<span class="hljs-comment">// &#x538B;&#x7F29;CSS&#x548C;JS&#x4EE3;&#x7801;</span>
<span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
<span class="hljs-keyword">const</span> OptimizeCSSAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;optimize-css-assets-webpack-plugin&quot;</span>);
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;uglifyjs-webpack-plugin&quot;</span>);
<span class="hljs-built_in">module</span>.exports = merge(common, {
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
  optimization: {
    <span class="hljs-comment">// ...&#x7701;&#x7565;&#x53F7;</span>
    minimizer: [
      <span class="hljs-comment">// &#x538B;&#x7F29;JS</span>
      <span class="hljs-keyword">new</span> UglifyJsPlugin({
        <span class="hljs-attr">uglifyOptions</span>: {
          <span class="hljs-attr">compress</span>: {
            <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x53BB;&#x9664;&#x8B66;&#x544A;</span>
            drop_debugger: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x53BB;&#x9664;debugger</span>
            drop_console: <span class="hljs-literal">true</span> <span class="hljs-comment">// &#x53BB;&#x9664;console.log</span>
          },
        },
        <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x5F00;&#x542F;&#x7F13;&#x5B58;</span>
        parallel: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x5E73;&#x884C;&#x538B;&#x7F29;</span>
        sourceMap: <span class="hljs-literal">false</span> <span class="hljs-comment">// set to true if you want JS source maps</span>
      }),
      <span class="hljs-comment">// &#x538B;&#x7F29;css</span>
      <span class="hljs-keyword">new</span> OptimizeCSSAssetsPlugin({})
    ]
  },
})</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x518D;&#x62D3;&#x5C55;&#x4E00;&#x4E2A; hash, chunkhash, contenthash &#x7684;&#x533A;&#x522B;</p><ul><li>hash&#x662F;&#x8DDF;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x6784;&#x5EFA;&#x76F8;&#x5173;&#xFF0C;&#x53EA;&#x8981;&#x9879;&#x76EE;&#x91CC;&#x6709;&#x6587;&#x4EF6;&#x66F4;&#x6539;&#xFF0C;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x7684;hash&#x503C;&#x90FD;&#x4F1A;&#x66F4;&#x6539;&#xFF0C;&#x5E76;&#x4E14;&#x5168;&#x90E8;&#x6587;&#x4EF6;&#x90FD;&#x5171;&#x7528;&#x76F8;&#x540C;&#x7684;hash&#x503C;</li><li>chunkhash&#x548C;hash&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5B83;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;(Entry)&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#x89E3;&#x6790;&#x3001;&#x6784;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;chunk&#xFF0C;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x54C8;&#x5E0C;&#x503C;&#x3002;</li><li>contenthash &#x66F4;&#x7EC6;&#x81F4;&#x5730;&#x6839;&#x636E;&#x5185;&#x5BB9;&#x66F4;&#x6539;&#xFF0C;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x54C8;&#x5E0C;&#x503C;&#x3002;&#x89E3;&#x51B3;chunkhash &#x6587;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x56E0; chunkhash &#x53D8;&#x52A8;&#x800C;&#x53D8;&#x52A8;&#x7684;&#x95EE;&#x9898;</li></ul><p><a href="https://github.com/zxpsuper/createVue" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x6E90;&#x7801;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack4 搭建 Vue 项目

## 原文链接
[https://segmentfault.com/a/1190000016364487](https://segmentfault.com/a/1190000016364487)

