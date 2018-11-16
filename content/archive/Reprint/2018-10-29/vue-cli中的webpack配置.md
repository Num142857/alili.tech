---
title: vue-cli中的webpack配置
hidden: true
categories: [reprint]
slug: '98736992'
date: 2018-10-29 02:30:09
---

{{< raw >}}
<h3 id="articleHeader0">&#x7248;&#x672C;&#x53F7;</h3><p><code>vue-cli</code> 2.8.1 (&#x7EC8;&#x7AEF;&#x901A;&#x8FC7;<code>vue -V</code> &#x53EF;&#x67E5;&#x770B;)</p><p><code>vue</code> 2.2.2</p><p><code>webpack</code> 2.2.1</p><h3 id="articleHeader1">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; README.md
&#x251C;&#x2500;&#x2500; build
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; build.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; check-versions.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev-client.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev-server.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; utils.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; vue-loader.conf.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; webpack.base.conf.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; webpack.dev.conf.js
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; webpack.prod.conf.js
&#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev.env.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; prod.env.js
&#x251C;&#x2500;&#x2500; index.html
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; App.vue
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; assets
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; logo.png
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; components
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; Hello.vue
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; main.js
&#x2514;&#x2500;&#x2500; static" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="shell">&#x251C;&#x2500;&#x2500; README<span class="hljs-selector-class">.md</span>
&#x251C;&#x2500;&#x2500; build
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; build<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; check-versions<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev-client<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev-server<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; utils<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; vue-loader<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; App<span class="hljs-selector-class">.vue</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; assets
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; logo<span class="hljs-selector-class">.png</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; components
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; Hello<span class="hljs-selector-class">.vue</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; main<span class="hljs-selector-class">.js</span>
&#x2514;&#x2500;&#x2500; static</code></pre><h3 id="articleHeader2">webpack&#x914D;&#x7F6E;</h3><p>&#x4E3B;&#x8981;&#x5BF9;build&#x76EE;&#x5F55;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;&#x505A;&#x8BE6;&#x7EC6;&#x5206;&#x6790;</p><h4>webpack.base.conf.js</h4><h5>&#x5165;&#x53E3;&#x6587;&#x4EF6;<code>entry</code></h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  app: &apos;.src/main.js&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">entry: {
  <span class="hljs-attr">app</span>: <span class="hljs-string">&apos;.src/main.js&apos;</span>
}</code></pre><h5>&#x8F93;&#x51FA;&#x6587;&#x4EF6;<code>output</code></h5><p><code>config</code>&#x7684;&#x914D;&#x7F6E;&#x5728;<code>config/index.js</code>&#x6587;&#x4EF6;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  path: config.build.assetsRoot, //&#x5BFC;&#x51FA;&#x76EE;&#x5F55;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
  filename: &apos;[name].js&apos;, //&#x5BFC;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;
  publicPath: process.env.NODE_ENV === &apos;production&apos;? config.build.assetsPublicPath : config.dev.assetsPublicPath //&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x6216;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;html&#x3001;js&#x7B49;&#x6587;&#x4EF6;&#x5185;&#x90E8;&#x5F15;&#x7528;&#x7684;&#x516C;&#x5171;&#x8DEF;&#x5F84;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">output: {
  <span class="hljs-attr">path</span>: config.build.assetsRoot, <span class="hljs-comment">//&#x5BFC;&#x51FA;&#x76EE;&#x5F55;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
  filename: <span class="hljs-string">&apos;[name].js&apos;</span>, <span class="hljs-comment">//&#x5BFC;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
  publicPath: process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>? config.build.assetsPublicPath : config.dev.assetsPublicPath <span class="hljs-comment">//&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x6216;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;html&#x3001;js&#x7B49;&#x6587;&#x4EF6;&#x5185;&#x90E8;&#x5F15;&#x7528;&#x7684;&#x516C;&#x5171;&#x8DEF;&#x5F84;</span>
}</code></pre><h5>&#x6587;&#x4EF6;&#x89E3;&#x6790;<code>resolve</code></h5><p>&#x4E3B;&#x8981;&#x8BBE;&#x7F6E;&#x6A21;&#x5757;&#x5982;&#x4F55;&#x88AB;&#x89E3;&#x6790;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;], //&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x786E;&#x5B9A;&#x7684;&#x62D3;&#x5C55;&#x540D;,&#x4F7F;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x65F6;&#x4E0D;&#x5E26;&#x62D3;&#x5C55;&#x540D;
  alias: {   // &#x521B;&#x5EFA;import&#x6216;require&#x7684;&#x522B;&#x540D;
    &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;, 
    &apos;@&apos;: resolve(&apos;src&apos;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">resolve: {
  <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>], <span class="hljs-comment">//&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x786E;&#x5B9A;&#x7684;&#x62D3;&#x5C55;&#x540D;,&#x4F7F;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x65F6;&#x4E0D;&#x5E26;&#x62D3;&#x5C55;&#x540D;</span>
  alias: {   <span class="hljs-comment">// &#x521B;&#x5EFA;import&#x6216;require&#x7684;&#x522B;&#x540D;</span>
    <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>, 
    <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>)
  }
}</code></pre><h5>&#x6A21;&#x5757;&#x89E3;&#x6790;<code>module</code></h5><p>&#x5982;&#x4F55;&#x5904;&#x7406;&#x9879;&#x76EE;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x6A21;&#x5757;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.vue$/, // vue&#x6587;&#x4EF6;&#x540E;&#x7F00;
      loader: &apos;vue-loader&apos;, //&#x4F7F;&#x7528;vue-loader&#x5904;&#x7406;
      options: vueLoaderConfig //options&#x662F;&#x5BF9;vue-loader&#x505A;&#x7684;&#x989D;&#x5916;&#x9009;&#x9879;&#x914D;&#x7F6E;
    },
    {
      test: /\.js$/, // js&#x6587;&#x4EF6;&#x540E;&#x7F00;
      loader: &apos;babel-loader&apos;, //&#x4F7F;&#x7528;babel-loader&#x5904;&#x7406;
      include: [resolve(&apos;src&apos;), resolve(&apos;test&apos;)] //&#x5FC5;&#x987B;&#x5904;&#x7406;&#x5305;&#x542B;src&#x548C;test&#x6587;&#x4EF6;&#x5939;
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //&#x56FE;&#x7247;&#x540E;&#x7F00;
      loader: &apos;url-loader&apos;, //&#x4F7F;&#x7528;url-loader&#x5904;&#x7406;
      query: {  // query&#x662F;&#x5BF9;loader&#x505A;&#x989D;&#x5916;&#x7684;&#x9009;&#x9879;&#x914D;&#x7F6E;
        limit: 10000, //&#x56FE;&#x7247;&#x5C0F;&#x4E8E;10000&#x5B57;&#x8282;&#x65F6;&#x4EE5;base64&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x7528;
        name: utils.assetsPath(&apos;img/[name].[hash:7].[ext]&apos;) //&#x6587;&#x4EF6;&#x540D;&#x4E3A;name.7&#x4F4D;hash&#x503C;.&#x62D3;&#x5C55;&#x540D;
      }
    }&#xFF0C;
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //&#x5B57;&#x4F53;&#x6587;&#x4EF6;
      loader: &apos;url-loader&apos;, //&#x4F7F;&#x7528;url-loader&#x5904;&#x7406;
      query: {
        limit: 10000,  //&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x5C0F;&#x4E8E;1000&#x5B57;&#x8282;&#x7684;&#x65F6;&#x5019;&#x5904;&#x7406;&#x65B9;&#x5F0F;
        name: utils.assetsPath(&apos;fonts/[name].[hash:7].[ext]&apos;) //&#x6587;&#x4EF6;&#x540D;&#x4E3A;name.7&#x4F4D;hash&#x503C;.&#x62D3;&#x5C55;&#x540D;
      }
    }
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>, <span class="hljs-comment">// vue&#x6587;&#x4EF6;&#x540E;&#x7F00;</span>
      loader: <span class="hljs-string">&apos;vue-loader&apos;</span>, <span class="hljs-comment">//&#x4F7F;&#x7528;vue-loader&#x5904;&#x7406;</span>
      options: vueLoaderConfig <span class="hljs-comment">//options&#x662F;&#x5BF9;vue-loader&#x505A;&#x7684;&#x989D;&#x5916;&#x9009;&#x9879;&#x914D;&#x7F6E;</span>
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-comment">// js&#x6587;&#x4EF6;&#x540E;&#x7F00;</span>
      loader: <span class="hljs-string">&apos;babel-loader&apos;</span>, <span class="hljs-comment">//&#x4F7F;&#x7528;babel-loader&#x5904;&#x7406;</span>
      include: [resolve(<span class="hljs-string">&apos;src&apos;</span>), resolve(<span class="hljs-string">&apos;test&apos;</span>)] <span class="hljs-comment">//&#x5FC5;&#x987B;&#x5904;&#x7406;&#x5305;&#x542B;src&#x548C;test&#x6587;&#x4EF6;&#x5939;</span>
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>, <span class="hljs-comment">//&#x56FE;&#x7247;&#x540E;&#x7F00;</span>
      loader: <span class="hljs-string">&apos;url-loader&apos;</span>, <span class="hljs-comment">//&#x4F7F;&#x7528;url-loader&#x5904;&#x7406;</span>
      query: {  <span class="hljs-comment">// query&#x662F;&#x5BF9;loader&#x505A;&#x989D;&#x5916;&#x7684;&#x9009;&#x9879;&#x914D;&#x7F6E;</span>
        limit: <span class="hljs-number">10000</span>, <span class="hljs-comment">//&#x56FE;&#x7247;&#x5C0F;&#x4E8E;10000&#x5B57;&#x8282;&#x65F6;&#x4EE5;base64&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x7528;</span>
        name: utils.assetsPath(<span class="hljs-string">&apos;img/[name].[hash:7].[ext]&apos;</span>) <span class="hljs-comment">//&#x6587;&#x4EF6;&#x540D;&#x4E3A;name.7&#x4F4D;hash&#x503C;.&#x62D3;&#x5C55;&#x540D;</span>
      }
    }&#xFF0C;
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>, <span class="hljs-comment">//&#x5B57;&#x4F53;&#x6587;&#x4EF6;</span>
      loader: <span class="hljs-string">&apos;url-loader&apos;</span>, <span class="hljs-comment">//&#x4F7F;&#x7528;url-loader&#x5904;&#x7406;</span>
      query: {
        <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,  <span class="hljs-comment">//&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x5C0F;&#x4E8E;1000&#x5B57;&#x8282;&#x7684;&#x65F6;&#x5019;&#x5904;&#x7406;&#x65B9;&#x5F0F;</span>
        name: utils.assetsPath(<span class="hljs-string">&apos;fonts/[name].[hash:7].[ext]&apos;</span>) <span class="hljs-comment">//&#x6587;&#x4EF6;&#x540D;&#x4E3A;name.7&#x4F4D;hash&#x503C;.&#x62D3;&#x5C55;&#x540D;</span>
      }
    }
  ]
}</code></pre><p>&#x6CE8;: &#x5173;&#x4E8E;<code>query</code>&#xA0;&#x4EC5;&#x7531;&#x4E8E;&#x517C;&#x5BB9;&#x6027;&#x539F;&#x56E0;&#x800C;&#x5B58;&#x5728;&#x3002;&#x8BF7;&#x4F7F;&#x7528;&#xA0;<code>options</code>&#xA0;&#x4EE3;&#x66FF;&#x3002;</p><h4>webpack.dev.conf.js</h4><p>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x7684;<code>webpack</code>&#x914D;&#x7F6E;&#xFF0C;&#x901A;&#x8FC7;<code>merge</code>&#x65B9;&#x6CD5;&#x5408;&#x5E76;<code>webpack.base.conf.js</code>&#x57FA;&#x7840;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var merge = require(&apos;webpack-merge&apos;)
var baseWebpackConfig = require(&apos;./webpack.base.conf&apos;)
module.exports = merge(baseWebpackConfig, {}&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.conf&apos;</span>)
<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {}&#xFF09;</code></pre><h5>&#x6A21;&#x5757;&#x914D;&#x7F6E;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  //&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6765;&#x83B7;&#x53D6;rules&#x914D;&#x7F6E;&#xFF0C;&#x6B64;&#x5904;&#x4F20;&#x5165;&#x4E86;sourceMap: false,&#x8868;&#x793A;&#x4E0D;&#x751F;&#x6210;sourceMap
  rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }) 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-comment">//&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6765;&#x83B7;&#x53D6;rules&#x914D;&#x7F6E;&#xFF0C;&#x6B64;&#x5904;&#x4F20;&#x5165;&#x4E86;sourceMap: false,&#x8868;&#x793A;&#x4E0D;&#x751F;&#x6210;sourceMap</span>
  rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap }) 
}</code></pre><p>&#x5728;<code>util.styleLoaders</code>&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.styleLoaders = function (options) {
  var output = [] //&#x5B9A;&#x4E49;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x4FDD;&#x5B58;&#x7684;&#x662F;&#x9488;&#x5BF9;&#x5404;&#x7C7B;&#x578B;&#x7684;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;
  var loaders = exports.cssLoaders(options) // &#x8C03;&#x7528;cssLoaders&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5404;&#x7C7B;&#x578B;&#x7684;&#x6837;&#x5F0F;&#x5BF9;&#x8C61;(css: loader)
  for (var extension in loaders) {  //&#x5FAA;&#x73AF;&#x904D;&#x5386;loaders
    var loader = loaders[extension] //&#x6839;&#x636E;&#x904D;&#x5386;&#x83B7;&#x5F97;&#x7684;key(extension)&#x6765;&#x5F97;&#x5230;value(loader)
    output.push({     //
      test: new RegExp(&apos;\\.&apos; + extension + &apos;$&apos;), // &#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;
      use: loader  //&#x7528;loader&#x6765;&#x5904;&#x7406;&#xFF0C;loader&#x6765;&#x81EA;loaders[extension]
    })
  }
  return output
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">var</span> output = [] <span class="hljs-comment">//&#x5B9A;&#x4E49;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x4FDD;&#x5B58;&#x7684;&#x662F;&#x9488;&#x5BF9;&#x5404;&#x7C7B;&#x578B;&#x7684;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;</span>
  <span class="hljs-keyword">var</span> loaders = exports.cssLoaders(options) <span class="hljs-comment">// &#x8C03;&#x7528;cssLoaders&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5404;&#x7C7B;&#x578B;&#x7684;&#x6837;&#x5F0F;&#x5BF9;&#x8C61;(css: loader)</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> extension <span class="hljs-keyword">in</span> loaders) {  <span class="hljs-comment">//&#x5FAA;&#x73AF;&#x904D;&#x5386;loaders</span>
    <span class="hljs-keyword">var</span> loader = loaders[extension] <span class="hljs-comment">//&#x6839;&#x636E;&#x904D;&#x5386;&#x83B7;&#x5F97;&#x7684;key(extension)&#x6765;&#x5F97;&#x5230;value(loader)</span>
    output.push({     <span class="hljs-comment">//</span>
      test: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;\\.&apos;</span> + extension + <span class="hljs-string">&apos;$&apos;</span>), <span class="hljs-comment">// &#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;</span>
      use: loader  <span class="hljs-comment">//&#x7528;loader&#x6765;&#x5904;&#x7406;&#xFF0C;loader&#x6765;&#x81EA;loaders[extension]</span>
    })
  }
  <span class="hljs-keyword">return</span> output
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x8C03;&#x7528;&#x4E86;<code>exports.cssLoaders(options)</code>,&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x9488;&#x5BF9;&#x5404;&#x7C7B;&#x578B;&#x7684;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;,&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.cssLoaders = function (options) {
  options = options || {}
  
  var cssLoader = { 
    loader: &apos;css-loader&apos;,
    options: {  //options&#x662F;loader&#x7684;&#x9009;&#x9879;&#x914D;&#x7F6E; 
      minimize: process.env.NODE_ENV === &apos;production&apos;, //&#x751F;&#x6210;&#x73AF;&#x5883;&#x4E0B;&#x538B;&#x7F29;&#x6587;&#x4EF6;
      sourceMap: options.sourceMap  //&#x6839;&#x636E;&#x53C2;&#x6570;&#x662F;&#x5426;&#x751F;&#x6210;sourceMap&#x6587;&#x4EF6;
    }
  }
  function generateLoaders (loader, loaderOptions) {  //&#x751F;&#x6210;loader
    var loaders = [cssLoader] // &#x9ED8;&#x8BA4;&#x662F;css-loader
    if (loader) { // &#x5982;&#x679C;&#x53C2;&#x6570;loader&#x5B58;&#x5728;
      loaders.push({
        loader: loader + &apos;-loader&apos;,
        options: Object.assign({}, loaderOptions, { //&#x5C06;loaderOptions&#x548C;sourceMap&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) { // &#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;options&#x5B58;&#x5728;extract&#x4E14;&#x4E3A;true
      return ExtractTextPlugin.extract({  //ExtractTextPlugin&#x5206;&#x79BB;js&#x4E2D;&#x5F15;&#x5165;&#x7684;css&#x6587;&#x4EF6;
        use: loaders,  //&#x5904;&#x7406;&#x7684;loader
        fallback: &apos;vue-style-loader&apos; //&#x6CA1;&#x6709;&#x88AB;&#x63D0;&#x53D6;&#x5206;&#x79BB;&#x65F6;&#x4F7F;&#x7528;&#x7684;loader
      })
    } else {
      return [&apos;vue-style-loader&apos;].concat(loaders)
    }
  }
  return {  //&#x8FD4;&#x56DE;css&#x7C7B;&#x578B;&#x5BF9;&#x5E94;&#x7684;loader&#x7EC4;&#x6210;&#x7684;&#x5BF9;&#x8C61; generateLoaders()&#x6765;&#x751F;&#x6210;loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders(&apos;less&apos;),
    sass: generateLoaders(&apos;sass&apos;, { indentedSyntax: true }),
    scss: generateLoaders(&apos;sass&apos;),
    stylus: generateLoaders(&apos;stylus&apos;),
    styl: generateLoaders(&apos;stylus&apos;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}
  
  <span class="hljs-keyword">var</span> cssLoader = { 
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {  <span class="hljs-comment">//options&#x662F;loader&#x7684;&#x9009;&#x9879;&#x914D;&#x7F6E; </span>
      minimize: process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>, <span class="hljs-comment">//&#x751F;&#x6210;&#x73AF;&#x5883;&#x4E0B;&#x538B;&#x7F29;&#x6587;&#x4EF6;</span>
      sourceMap: options.sourceMap  <span class="hljs-comment">//&#x6839;&#x636E;&#x53C2;&#x6570;&#x662F;&#x5426;&#x751F;&#x6210;sourceMap&#x6587;&#x4EF6;</span>
    }
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{  <span class="hljs-comment">//&#x751F;&#x6210;loader</span>
    <span class="hljs-keyword">var</span> loaders = [cssLoader] <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x662F;css-loader</span>
    <span class="hljs-keyword">if</span> (loader) { <span class="hljs-comment">// &#x5982;&#x679C;&#x53C2;&#x6570;loader&#x5B58;&#x5728;</span>
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">&apos;-loader&apos;</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, { <span class="hljs-comment">//&#x5C06;loaderOptions&#x548C;sourceMap&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
          sourceMap: options.sourceMap
        })
      })
    }
    <span class="hljs-keyword">if</span> (options.extract) { <span class="hljs-comment">// &#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;options&#x5B58;&#x5728;extract&#x4E14;&#x4E3A;true</span>
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({  <span class="hljs-comment">//ExtractTextPlugin&#x5206;&#x79BB;js&#x4E2D;&#x5F15;&#x5165;&#x7684;css&#x6587;&#x4EF6;</span>
        use: loaders,  <span class="hljs-comment">//&#x5904;&#x7406;&#x7684;loader</span>
        fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span> <span class="hljs-comment">//&#x6CA1;&#x6709;&#x88AB;&#x63D0;&#x53D6;&#x5206;&#x79BB;&#x65F6;&#x4F7F;&#x7528;&#x7684;loader</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;vue-style-loader&apos;</span>].concat(loaders)
    }
  }
  <span class="hljs-keyword">return</span> {  <span class="hljs-comment">//&#x8FD4;&#x56DE;css&#x7C7B;&#x578B;&#x5BF9;&#x5E94;&#x7684;loader&#x7EC4;&#x6210;&#x7684;&#x5BF9;&#x8C61; generateLoaders()&#x6765;&#x751F;&#x6210;loader</span>
    css: generateLoaders(),
    <span class="hljs-attr">postcss</span>: generateLoaders(),
    <span class="hljs-attr">less</span>: generateLoaders(<span class="hljs-string">&apos;less&apos;</span>),
    <span class="hljs-attr">sass</span>: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">scss</span>: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>),
    <span class="hljs-attr">stylus</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>),
    <span class="hljs-attr">styl</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>)
  }
}</code></pre><h5>&#x63D2;&#x4EF6;&#x914D;&#x7F6E;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.DefinePlugin({ // &#x7F16;&#x8BD1;&#x65F6;&#x914D;&#x7F6E;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;
    &apos;process.env&apos;: config.dev.env //&#x5F53;&#x524D;&#x73AF;&#x5883;&#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;
  }),
  new webpack.HotModuleReplacementPlugin(), //&#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;
  new webpack.NoEmitOnErrorPlugin(), //&#x4E0D;&#x89E6;&#x53D1;&#x9519;&#x8BEF;,&#x5373;&#x7F16;&#x8BD1;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x5305;&#x6B63;&#x5E38;&#x8FD0;&#x884C;
  new HtmlWebpackPlugin({  //&#x81EA;&#x52A8;&#x751F;&#x6210;html&#x6587;&#x4EF6;,&#x6BD4;&#x5982;&#x7F16;&#x8BD1;&#x540E;&#x6587;&#x4EF6;&#x7684;&#x5F15;&#x5165;
    filename: &apos;index.html&apos;, //&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;
    template: &apos;index.html&apos;, //&#x6A21;&#x677F;
    inject: true
  }),
  new FriendlyErrorsPlugin() //&#x53CB;&#x597D;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">plugins: [
  <span class="hljs-keyword">new</span> webpack.DefinePlugin({ <span class="hljs-comment">// &#x7F16;&#x8BD1;&#x65F6;&#x914D;&#x7F6E;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
    <span class="hljs-string">&apos;process.env&apos;</span>: config.dev.env <span class="hljs-comment">//&#x5F53;&#x524D;&#x73AF;&#x5883;&#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;</span>
  }),
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(), <span class="hljs-comment">//&#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;</span>
  <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorPlugin(), <span class="hljs-comment">//&#x4E0D;&#x89E6;&#x53D1;&#x9519;&#x8BEF;,&#x5373;&#x7F16;&#x8BD1;&#x540E;&#x8FD0;&#x884C;&#x7684;&#x5305;&#x6B63;&#x5E38;&#x8FD0;&#x884C;</span>
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({  <span class="hljs-comment">//&#x81EA;&#x52A8;&#x751F;&#x6210;html&#x6587;&#x4EF6;,&#x6BD4;&#x5982;&#x7F16;&#x8BD1;&#x540E;&#x6587;&#x4EF6;&#x7684;&#x5F15;&#x5165;</span>
    filename: <span class="hljs-string">&apos;index.html&apos;</span>, <span class="hljs-comment">//&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
    template: <span class="hljs-string">&apos;index.html&apos;</span>, <span class="hljs-comment">//&#x6A21;&#x677F;</span>
    inject: <span class="hljs-literal">true</span>
  }),
  <span class="hljs-keyword">new</span> FriendlyErrorsPlugin() <span class="hljs-comment">//&#x53CB;&#x597D;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;</span>
]</code></pre><h4>webpack.prod.conf.js</h4><p>&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;<code>webpack</code>&#x914D;&#x7F6E;&#xFF0C;&#x901A;&#x8FC7;<code>merge</code>&#x65B9;&#x6CD5;&#x5408;&#x5E76;<code>webpack.base.conf.js</code>&#x57FA;&#x7840;&#x914D;&#x7F6E;</p><h5><code>module</code>&#x7684;&#x5904;&#x7406;,&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;<code>css</code>&#x7684;&#x5904;&#x7406;</h5><p>&#x540C;&#x6837;&#x7684;&#x6B64;&#x5904;&#x8C03;&#x7528;&#x4E86;<code>utils.styleLoaders</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: utils.styleLoaders({
    sourceMap: config.build.productionSourceMap,
    extract: true
  }) 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: utils.styleLoaders({
    <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
    <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>
  }) 
}</code></pre><h5>&#x8F93;&#x51FA;&#x6587;&#x4EF6;<code>output</code></h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  //&#x5BFC;&#x51FA;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
  path: config.build.assetsRoot, 
  //&#x5BFC;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x540D;
  filename: utils.assetsPath(&apos;js/[name].[chunkhash].js&apos;), 
  //&#x975E;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF0C;&#x800C;&#x53C8;&#x9700;&#x8981;&#x88AB;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x6587;&#x4EF6;&#x547D;&#x540D;&#x914D;&#x7F6E;,&#x5982;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;
  chunkFilename: utils.assetsPath(&apos;js/[id].[chunkhash].js&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">output: {
  <span class="hljs-comment">//&#x5BFC;&#x51FA;&#x6587;&#x4EF6;&#x76EE;&#x5F55;</span>
  path: config.build.assetsRoot, 
  <span class="hljs-comment">//&#x5BFC;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
  filename: utils.assetsPath(<span class="hljs-string">&apos;js/[name].[chunkhash].js&apos;</span>), 
  <span class="hljs-comment">//&#x975E;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF0C;&#x800C;&#x53C8;&#x9700;&#x8981;&#x88AB;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x6587;&#x4EF6;&#x547D;&#x540D;&#x914D;&#x7F6E;,&#x5982;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;</span>
  chunkFilename: utils.assetsPath(<span class="hljs-string">&apos;js/[id].[chunkhash].js&apos;</span>)
}</code></pre><h5>&#x63D2;&#x4EF6;<code>plugins</code></h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&apos;path&apos;)
var utils = require(&apos;./utils&apos;)
var webpack = require(&apos;webpack&apos;)
var config = require(&apos;../config&apos;)
var merge = require(&apos;webpack-merge&apos;)
var baseWebpackConfig = require(&apos;./webpack.base.conf&apos;)
var CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;)
var HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
var ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
var OptimizeCSSPlugin = require(&apos;optimize-css-assets-webpack-plugin&apos;)
var env = config.build.env
plugins: [
  new webpack.DefinePlugin({
    &apos;process.env&apos;: env //&#x914D;&#x7F6E;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;
  }),
  new webpack.optimize.UglifyJsPlugin({ //js&#x6587;&#x4EF6;&#x538B;&#x7F29;&#x63D2;&#x4EF6;
    compress: {  //&#x538B;&#x7F29;&#x914D;&#x7F6E;
      warnings: false  // &#x4E0D;&#x663E;&#x793A;&#x8B66;&#x544A;
    },
    sourceMap: true //&#x751F;&#x6210;sourceMap&#x6587;&#x4EF6;
  }),
  new ExtractTextPlugin({ //&#x5C06;js&#x4E2D;&#x5F15;&#x5165;&#x7684;css&#x5206;&#x79BB;&#x7684;&#x63D2;&#x4EF6;
    filename: utils.assetsPath(&apos;css/[name].[contenthash].css&apos;) //&#x5206;&#x79BB;&#x51FA;&#x7684;css&#x6587;&#x4EF6;&#x540D;
  }),
  //&#x538B;&#x7F29;&#x63D0;&#x53D6;&#x51FA;&#x7684;css&#xFF0C;&#x5E76;&#x89E3;&#x51B3;ExtractTextPlugin&#x5206;&#x79BB;&#x51FA;&#x7684;js&#x91CD;&#x590D;&#x95EE;&#x9898;(&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x5F15;&#x5165;&#x540C;&#x4E00;css&#x6587;&#x4EF6;)
  new OptimizeCSSPlugin(), 
  //&#x751F;&#x6210;html&#x7684;&#x63D2;&#x4EF6;,&#x5F15;&#x5165;css&#x6587;&#x4EF6;&#x548C;js&#x6587;&#x4EF6;
  new HtmlWebpackPlugin({
    filename: config.build.index, //&#x751F;&#x6210;&#x7684;html&#x7684;&#x6587;&#x4EF6;&#x540D;
    template: &apos;index.html&apos;, //&#x4F9D;&#x636E;&#x7684;&#x6A21;&#x677F;
    inject: true, //&#x6CE8;&#x5165;&#x7684;js&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;&#x653E;&#x5728;body&#x6807;&#x7B7E;&#x4E2D;,&#x5F53;&#x503C;&#x4E3A;&apos;head&apos;&#x65F6;&#xFF0C;&#x5C06;&#x88AB;&#x653E;&#x5728;head&#x6807;&#x7B7E;&#x4E2D;
    minify: {  //&#x538B;&#x7F29;&#x914D;&#x7F6E;
      removeComments: true, //&#x5220;&#x9664;html&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#x4EE3;&#x7801;
      collapseWhitespace: true,  //&#x5220;&#x9664;html&#x4E2D;&#x7684;&#x7A7A;&#x767D;&#x7B26;
      removeAttributeQuotes: true  //&#x5220;&#x9664;html&#x5143;&#x7D20;&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x5F15;&#x53F7;
    },
    chunksSortMode: &apos;dependency&apos; //&#x6309;dependency&#x7684;&#x987A;&#x5E8F;&#x5F15;&#x5165;
  }),
  //&#x5206;&#x79BB;&#x516C;&#x5171;js&#x5230;vendor&#x4E2D;
  new webpack.optimize.CommonsChunkPlugin({
    name: &apos;vendor&apos;,  //&#x6587;&#x4EF6;&#x540D;
    minChunks: functions(module, count) { // &#x58F0;&#x660E;&#x516C;&#x5171;&#x7684;&#x6A21;&#x5757;&#x6765;&#x81EA;node_modules&#x6587;&#x4EF6;&#x5939;
      return (module.resource &amp;&amp; /\.js$/.test(module.resource) &amp;&amp; module,resource.indexOf(path.join(__dirname, &apos;../node_modules&apos;)) === 0)
    }
  }),
  //&#x4E0A;&#x9762;&#x867D;&#x7136;&#x5DF2;&#x7ECF;&#x5206;&#x79BB;&#x4E86;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;,&#x6BCF;&#x6B21;&#x4FEE;&#x6539;&#x7F16;&#x8BD1;&#x90FD;&#x4F1A;&#x6539;&#x53D8;vendor&#x7684;hash&#x503C;&#xFF0C;&#x5BFC;&#x81F4;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;&#x539F;&#x56E0;&#x662F;vendor&#x5305;&#x542B;&#x4E86;webpack&#x5728;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E9B;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#xFF0C;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x4E2D;&#x5B9E;&#x9645;&#x4E0A;&#x4FDD;&#x5B58;&#x4E86;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x3002;&#x5F53;&#x4FEE;&#x6539;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x65F6;,&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7684;js&#x6587;&#x4EF6;&#x7684;hash&#x503C;&#x5FC5;&#x7136;&#x4F1A;&#x6539;&#x53D8;&#x3002;&#x4E00;&#x65E6;&#x6539;&#x53D8;&#x5FC5;&#x7136;&#x4F1A;&#x5BFC;&#x81F4;vendor&#x53D8;&#x5316;&#x3002;vendor&#x53D8;&#x5316;&#x4F1A;&#x5BFC;&#x81F4;&#x5176;hash&#x503C;&#x53D8;&#x5316;&#x3002;
  //&#x4E0B;&#x9762;&#x4E3B;&#x8981;&#x662F;&#x5C06;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x5230;&#x5355;&#x72EC;&#x7684;manifest&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x9632;&#x6B62;&#x5176;&#x5F71;&#x54CD;vendor.js
  new webpack.optimize.CommonsChunkPlugin({
    name: &apos;mainifest&apos;,
    chunks: [&apos;vendor&apos;]
  }),
  // &#x590D;&#x5236;&#x9759;&#x6001;&#x8D44;&#x6E90;,&#x5C06;static&#x6587;&#x4EF6;&#x5185;&#x7684;&#x5185;&#x5BB9;&#x590D;&#x5236;&#x5230;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x5939;
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, &apos;../static&apos;),
    to: config.build.assetsSubDirectory,
    ignore: [&apos;.*&apos;]  //&#x5FFD;&#x89C6;.*&#x6587;&#x4EF6;
  }])
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.conf&apos;</span>)
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;optimize-css-assets-webpack-plugin&apos;</span>)
<span class="hljs-keyword">var</span> env = config.build.env
plugins: [
  <span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">&apos;process.env&apos;</span>: env <span class="hljs-comment">//&#x914D;&#x7F6E;&#x5168;&#x5C40;&#x73AF;&#x5883;&#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;</span>
  }),
  <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({ <span class="hljs-comment">//js&#x6587;&#x4EF6;&#x538B;&#x7F29;&#x63D2;&#x4EF6;</span>
    compress: {  <span class="hljs-comment">//&#x538B;&#x7F29;&#x914D;&#x7F6E;</span>
      warnings: <span class="hljs-literal">false</span>  <span class="hljs-comment">// &#x4E0D;&#x663E;&#x793A;&#x8B66;&#x544A;</span>
    },
    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//&#x751F;&#x6210;sourceMap&#x6587;&#x4EF6;</span>
  }),
  <span class="hljs-keyword">new</span> ExtractTextPlugin({ <span class="hljs-comment">//&#x5C06;js&#x4E2D;&#x5F15;&#x5165;&#x7684;css&#x5206;&#x79BB;&#x7684;&#x63D2;&#x4EF6;</span>
    filename: utils.assetsPath(<span class="hljs-string">&apos;css/[name].[contenthash].css&apos;</span>) <span class="hljs-comment">//&#x5206;&#x79BB;&#x51FA;&#x7684;css&#x6587;&#x4EF6;&#x540D;</span>
  }),
  <span class="hljs-comment">//&#x538B;&#x7F29;&#x63D0;&#x53D6;&#x51FA;&#x7684;css&#xFF0C;&#x5E76;&#x89E3;&#x51B3;ExtractTextPlugin&#x5206;&#x79BB;&#x51FA;&#x7684;js&#x91CD;&#x590D;&#x95EE;&#x9898;(&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x5F15;&#x5165;&#x540C;&#x4E00;css&#x6587;&#x4EF6;)</span>
  <span class="hljs-keyword">new</span> OptimizeCSSPlugin(), 
  <span class="hljs-comment">//&#x751F;&#x6210;html&#x7684;&#x63D2;&#x4EF6;,&#x5F15;&#x5165;css&#x6587;&#x4EF6;&#x548C;js&#x6587;&#x4EF6;</span>
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: config.build.index, <span class="hljs-comment">//&#x751F;&#x6210;&#x7684;html&#x7684;&#x6587;&#x4EF6;&#x540D;</span>
    template: <span class="hljs-string">&apos;index.html&apos;</span>, <span class="hljs-comment">//&#x4F9D;&#x636E;&#x7684;&#x6A21;&#x677F;</span>
    inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x6CE8;&#x5165;&#x7684;js&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;&#x653E;&#x5728;body&#x6807;&#x7B7E;&#x4E2D;,&#x5F53;&#x503C;&#x4E3A;&apos;head&apos;&#x65F6;&#xFF0C;&#x5C06;&#x88AB;&#x653E;&#x5728;head&#x6807;&#x7B7E;&#x4E2D;</span>
    minify: {  <span class="hljs-comment">//&#x538B;&#x7F29;&#x914D;&#x7F6E;</span>
      removeComments: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x5220;&#x9664;html&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#x4EE3;&#x7801;</span>
      collapseWhitespace: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//&#x5220;&#x9664;html&#x4E2D;&#x7684;&#x7A7A;&#x767D;&#x7B26;</span>
      removeAttributeQuotes: <span class="hljs-literal">true</span>  <span class="hljs-comment">//&#x5220;&#x9664;html&#x5143;&#x7D20;&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x5F15;&#x53F7;</span>
    },
    <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">&apos;dependency&apos;</span> <span class="hljs-comment">//&#x6309;dependency&#x7684;&#x987A;&#x5E8F;&#x5F15;&#x5165;</span>
  }),
  <span class="hljs-comment">//&#x5206;&#x79BB;&#x516C;&#x5171;js&#x5230;vendor&#x4E2D;</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,  <span class="hljs-comment">//&#x6587;&#x4EF6;&#x540D;</span>
    minChunks: functions(<span class="hljs-built_in">module</span>, count) { <span class="hljs-comment">// &#x58F0;&#x660E;&#x516C;&#x5171;&#x7684;&#x6A21;&#x5757;&#x6765;&#x81EA;node_modules&#x6587;&#x4EF6;&#x5939;</span>
      <span class="hljs-keyword">return</span> (<span class="hljs-built_in">module</span>.resource &amp;&amp; <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp; <span class="hljs-built_in">module</span>,resource.indexOf(path.join(__dirname, <span class="hljs-string">&apos;../node_modules&apos;</span>)) === <span class="hljs-number">0</span>)
    }
  }),
  <span class="hljs-comment">//&#x4E0A;&#x9762;&#x867D;&#x7136;&#x5DF2;&#x7ECF;&#x5206;&#x79BB;&#x4E86;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;,&#x6BCF;&#x6B21;&#x4FEE;&#x6539;&#x7F16;&#x8BD1;&#x90FD;&#x4F1A;&#x6539;&#x53D8;vendor&#x7684;hash&#x503C;&#xFF0C;&#x5BFC;&#x81F4;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;&#x539F;&#x56E0;&#x662F;vendor&#x5305;&#x542B;&#x4E86;webpack&#x5728;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E9B;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#xFF0C;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x4E2D;&#x5B9E;&#x9645;&#x4E0A;&#x4FDD;&#x5B58;&#x4E86;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x3002;&#x5F53;&#x4FEE;&#x6539;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x65F6;,&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7684;js&#x6587;&#x4EF6;&#x7684;hash&#x503C;&#x5FC5;&#x7136;&#x4F1A;&#x6539;&#x53D8;&#x3002;&#x4E00;&#x65E6;&#x6539;&#x53D8;&#x5FC5;&#x7136;&#x4F1A;&#x5BFC;&#x81F4;vendor&#x53D8;&#x5316;&#x3002;vendor&#x53D8;&#x5316;&#x4F1A;&#x5BFC;&#x81F4;&#x5176;hash&#x503C;&#x53D8;&#x5316;&#x3002;</span>
  <span class="hljs-comment">//&#x4E0B;&#x9762;&#x4E3B;&#x8981;&#x662F;&#x5C06;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x5230;&#x5355;&#x72EC;&#x7684;manifest&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x9632;&#x6B62;&#x5176;&#x5F71;&#x54CD;vendor.js</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;mainifest&apos;</span>,
    <span class="hljs-attr">chunks</span>: [<span class="hljs-string">&apos;vendor&apos;</span>]
  }),
  <span class="hljs-comment">// &#x590D;&#x5236;&#x9759;&#x6001;&#x8D44;&#x6E90;,&#x5C06;static&#x6587;&#x4EF6;&#x5185;&#x7684;&#x5185;&#x5BB9;&#x590D;&#x5236;&#x5230;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x5939;</span>
  <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
    <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../static&apos;</span>),
    <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
    <span class="hljs-attr">ignore</span>: [<span class="hljs-string">&apos;.*&apos;</span>]  <span class="hljs-comment">//&#x5FFD;&#x89C6;.*&#x6587;&#x4EF6;</span>
  }])
]</code></pre><h5>&#x989D;&#x5916;&#x914D;&#x7F6E;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (config.build.productionGzip) { //&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5F00;&#x542F;&#x4E86;gzip&#x538B;&#x7F29;
  
  //&#x5F15;&#x5165;&#x538B;&#x7F29;&#x6587;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;,&#x8BE5;&#x63D2;&#x4EF6;&#x4F1A;&#x5BF9;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;.gz&#x6587;&#x4EF6;
  var CompressionWebpackPlugin = require(&apos;compression-webpack-plugin&apos;) 

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: &apos;[path].gz[query]&apos;, //&#x76EE;&#x6807;&#x6587;&#x4EF6;&#x540D;
      algorithm: &apos;gzip&apos;, //&#x4F7F;&#x7528;gzip&#x538B;&#x7F29;
      test: new RegExp( //&#x6EE1;&#x8DB3;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x88AB;&#x538B;&#x7F29;
        &apos;\\.(&apos; +
        config.build.productionGzipExtensions.join(&apos;|&apos;) +
        &apos;)$&apos;
      ),
      threshold: 10240, //&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#x5927;&#x4E8E;10240B=10kB&#x65F6;&#x4F1A;&#x88AB;&#x538B;&#x7F29;
      minRatio: 0.8 //&#x6700;&#x5C0F;&#x538B;&#x7F29;&#x6BD4;&#x8FBE;&#x5230;0.8&#x65F6;&#x624D;&#x4F1A;&#x88AB;&#x538B;&#x7F29;
    })
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (config.build.productionGzip) { <span class="hljs-comment">//&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5F00;&#x542F;&#x4E86;gzip&#x538B;&#x7F29;</span>
  
  <span class="hljs-comment">//&#x5F15;&#x5165;&#x538B;&#x7F29;&#x6587;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;,&#x8BE5;&#x63D2;&#x4EF6;&#x4F1A;&#x5BF9;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#xFF0C;&#x751F;&#x6210;&#x4E00;&#x4E2A;.gz&#x6587;&#x4EF6;</span>
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;compression-webpack-plugin&apos;</span>) 

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      <span class="hljs-attr">asset</span>: <span class="hljs-string">&apos;[path].gz[query]&apos;</span>, <span class="hljs-comment">//&#x76EE;&#x6807;&#x6587;&#x4EF6;&#x540D;</span>
      algorithm: <span class="hljs-string">&apos;gzip&apos;</span>, <span class="hljs-comment">//&#x4F7F;&#x7528;gzip&#x538B;&#x7F29;</span>
      test: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-comment">//&#x6EE1;&#x8DB3;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x88AB;&#x538B;&#x7F29;</span>
        <span class="hljs-string">&apos;\\.(&apos;</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">&apos;|&apos;</span>) +
        <span class="hljs-string">&apos;)$&apos;</span>
      ),
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>, <span class="hljs-comment">//&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#x5927;&#x4E8E;10240B=10kB&#x65F6;&#x4F1A;&#x88AB;&#x538B;&#x7F29;</span>
      minRatio: <span class="hljs-number">0.8</span> <span class="hljs-comment">//&#x6700;&#x5C0F;&#x538B;&#x7F29;&#x6BD4;&#x8FBE;&#x5230;0.8&#x65F6;&#x624D;&#x4F1A;&#x88AB;&#x538B;&#x7F29;</span>
    })
  )
}</code></pre><h4>npm run dev</h4><p>&#x6709;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x4E4B;&#x540E;&#xFF0C;&#x4E0B;&#x9762;&#x770B;&#x770B;&#x8FD0;&#x884C;&#x547D;&#x4EE4;<code>npm run dev</code>&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;</p><p>&#x5728;<code>package.json</code>&#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;<code>dev</code>&#x8FD0;&#x884C;&#x7684;&#x811A;&#x672C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
   &quot;build&quot;: &quot;node build/build.js&quot;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json"><span class="hljs-string">&quot;scripts&quot;</span>: {
   <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;node build/dev-server.js&quot;</span>,
   <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;node build/build.js&quot;</span>
},</code></pre><p>&#x5F53;&#x8FD0;&#x884C;<code>npm run dev</code>&#x547D;&#x4EE4;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x8FD0;&#x884C;<code>dev-server.js</code>&#x6587;&#x4EF6;</p><p>&#x8BE5;&#x6587;&#x4EF6;&#x4EE5;express&#x4F5C;&#x4E3A;&#x540E;&#x7AEF;&#x6846;&#x67B6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// nodejs&#x73AF;&#x5883;&#x914D;&#x7F6E;
var config = require(&apos;../config&apos;)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require(&apos;opn&apos;) //&#x5F3A;&#x5236;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
var path = require(&apos;path&apos;)
var express = require(&apos;express&apos;)
var webpack = require(&apos;webpack&apos;)
var proxyMiddleware = require(&apos;http-proxy-middleware&apos;) //&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;
var webpackConfig = require(&apos;./webpack.dev.conf&apos;) //webpack&#x7684;&#x914D;&#x7F6E;

var port = process.env.PORT || config.dev.port //&#x7AEF;&#x53E3;&#x53F7;
var autoOpenBrowser = !!config.dev.autoOpenBrowser //&#x662F;&#x5426;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
var proxyTable = config.dev.proxyTable //http&#x7684;&#x4EE3;&#x7406;url

var app = express() //&#x542F;&#x52A8;express
var compiler = webpack(webpackConfig) //webpack&#x7F16;&#x8BD1;

//webpack-dev-middleware&#x7684;&#x4F5C;&#x7528;
//1.&#x5C06;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x751F;&#x6210;&#x7684;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x653E;&#x5728;&#x5185;&#x5B58;&#x4E2D;,&#x6240;&#x4EE5;&#x5728;npm run dev&#x540E;&#x78C1;&#x76D8;&#x4E0A;&#x4E0D;&#x4F1A;&#x751F;&#x6210;&#x6587;&#x4EF6;
//2.&#x5F53;&#x6587;&#x4EF6;&#x6539;&#x53D8;&#x65F6;,&#x4F1A;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x3002;
//3.&#x5F53;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BF7;&#x6C42;&#x67D0;&#x4E2A;&#x8D44;&#x6E90;&#x65F6;&#xFF0C;webpack-dev-server&#x4E0D;&#x4F1A;&#x8BA9;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x4E00;&#x76F4;&#x963B;&#x585E;&#x5B83;&#xFF0C;&#x76F4;&#x5230;webpack&#x7F16;&#x8BD1;&#x5B8C;&#x6BD5;
var devMiddleware = require(&apos;webpack-dev-middleware&apos;)(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

//webpack-hot-middleware&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x65E0;&#x5237;&#x65B0;&#x66F4;&#x65B0;
var hotMiddleware = require(&apos;webpack-hot-middleware&apos;)(compiler, {
  log: () =&gt; {}
})
//&#x58F0;&#x660E;hotMiddleware&#x65E0;&#x5237;&#x65B0;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x673A;:html-webpack-plugin &#x7684;template&#x66F4;&#x6539;&#x4E4B;&#x540E;
compiler.plugin(&apos;compilation&apos;, function (compilation) {
  compilation.plugin(&apos;html-webpack-plugin-after-emit&apos;, function (data, cb) {
    hotMiddleware.publish({ action: &apos;reload&apos; })
    cb()
  })
})

//&#x5C06;&#x4EE3;&#x7406;&#x8BF7;&#x6C42;&#x7684;&#x914D;&#x7F6E;&#x5E94;&#x7528;&#x5230;express&#x670D;&#x52A1;&#x4E0A;
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === &apos;string&apos;) {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

//&#x4F7F;&#x7528;connect-history-api-fallback&#x5339;&#x914D;&#x8D44;&#x6E90;
//&#x5982;&#x679C;&#x4E0D;&#x5339;&#x914D;&#x5C31;&#x53EF;&#x4EE5;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x6307;&#x5B9A;&#x5730;&#x5740;
app.use(require(&apos;connect-history-api-fallback&apos;)())

// &#x5E94;&#x7528;devMiddleware&#x4E2D;&#x95F4;&#x4EF6;
app.use(devMiddleware)
// &#x5E94;&#x7528;hotMiddleware&#x4E2D;&#x95F4;&#x4EF6;
app.use(hotMiddleware)

// &#x914D;&#x7F6E;express&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static(&apos;./static&apos;))

var uri = &apos;http://localhost:&apos; + port

//&#x7F16;&#x8BD1;&#x6210;&#x529F;&#x540E;&#x6253;&#x5370;uri
devMiddleware.waitUntilValid(function () {
  console.log(&apos;&gt; Listening at &apos; + uri + &apos;\n&apos;)
})
//&#x542F;&#x52A8;express&#x670D;&#x52A1;
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // &#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== &apos;testing&apos;) {
    opn(uri)
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// nodejs&#x73AF;&#x5883;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-keyword">if</span> (!process.env.NODE_ENV) {
  process.env.NODE_ENV = <span class="hljs-built_in">JSON</span>.parse(config.dev.env.NODE_ENV)
}
<span class="hljs-keyword">var</span> opn = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;opn&apos;</span>) <span class="hljs-comment">//&#x5F3A;&#x5236;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http-proxy-middleware&apos;</span>) <span class="hljs-comment">//&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</span>
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.dev.conf&apos;</span>) <span class="hljs-comment">//webpack&#x7684;&#x914D;&#x7F6E;</span>

<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port <span class="hljs-comment">//&#x7AEF;&#x53E3;&#x53F7;</span>
<span class="hljs-keyword">var</span> autoOpenBrowser = !!config.dev.autoOpenBrowser <span class="hljs-comment">//&#x662F;&#x5426;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-keyword">var</span> proxyTable = config.dev.proxyTable <span class="hljs-comment">//http&#x7684;&#x4EE3;&#x7406;url</span>

<span class="hljs-keyword">var</span> app = express() <span class="hljs-comment">//&#x542F;&#x52A8;express</span>
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig) <span class="hljs-comment">//webpack&#x7F16;&#x8BD1;</span>

<span class="hljs-comment">//webpack-dev-middleware&#x7684;&#x4F5C;&#x7528;</span>
<span class="hljs-comment">//1.&#x5C06;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x751F;&#x6210;&#x7684;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x653E;&#x5728;&#x5185;&#x5B58;&#x4E2D;,&#x6240;&#x4EE5;&#x5728;npm run dev&#x540E;&#x78C1;&#x76D8;&#x4E0A;&#x4E0D;&#x4F1A;&#x751F;&#x6210;&#x6587;&#x4EF6;</span>
<span class="hljs-comment">//2.&#x5F53;&#x6587;&#x4EF6;&#x6539;&#x53D8;&#x65F6;,&#x4F1A;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x3002;</span>
<span class="hljs-comment">//3.&#x5F53;&#x5728;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BF7;&#x6C42;&#x67D0;&#x4E2A;&#x8D44;&#x6E90;&#x65F6;&#xFF0C;webpack-dev-server&#x4E0D;&#x4F1A;&#x8BA9;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x4E00;&#x76F4;&#x963B;&#x585E;&#x5B83;&#xFF0C;&#x76F4;&#x5230;webpack&#x7F16;&#x8BD1;&#x5B8C;&#x6BD5;</span>
<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-middleware&apos;</span>)(compiler, {
  <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath,
  <span class="hljs-attr">quiet</span>: <span class="hljs-literal">true</span>
})

<span class="hljs-comment">//webpack-hot-middleware&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x65E0;&#x5237;&#x65B0;&#x66F4;&#x65B0;</span>
<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-hot-middleware&apos;</span>)(compiler, {
  <span class="hljs-attr">log</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
})
<span class="hljs-comment">//&#x58F0;&#x660E;hotMiddleware&#x65E0;&#x5237;&#x65B0;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x673A;:html-webpack-plugin &#x7684;template&#x66F4;&#x6539;&#x4E4B;&#x540E;</span>
compiler.plugin(<span class="hljs-string">&apos;compilation&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{
  compilation.plugin(<span class="hljs-string">&apos;html-webpack-plugin-after-emit&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, cb</span>) </span>{
    hotMiddleware.publish({ <span class="hljs-attr">action</span>: <span class="hljs-string">&apos;reload&apos;</span> })
    cb()
  })
})

<span class="hljs-comment">//&#x5C06;&#x4EE3;&#x7406;&#x8BF7;&#x6C42;&#x7684;&#x914D;&#x7F6E;&#x5E94;&#x7528;&#x5230;express&#x670D;&#x52A1;&#x4E0A;</span>
<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">&apos;string&apos;</span>) {
    options = { <span class="hljs-attr">target</span>: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

<span class="hljs-comment">//&#x4F7F;&#x7528;connect-history-api-fallback&#x5339;&#x914D;&#x8D44;&#x6E90;</span>
<span class="hljs-comment">//&#x5982;&#x679C;&#x4E0D;&#x5339;&#x914D;&#x5C31;&#x53EF;&#x4EE5;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x6307;&#x5B9A;&#x5730;&#x5740;</span>
app.use(<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;connect-history-api-fallback&apos;</span>)())

<span class="hljs-comment">// &#x5E94;&#x7528;devMiddleware&#x4E2D;&#x95F4;&#x4EF6;</span>
app.use(devMiddleware)
<span class="hljs-comment">// &#x5E94;&#x7528;hotMiddleware&#x4E2D;&#x95F4;&#x4EF6;</span>
app.use(hotMiddleware)

<span class="hljs-comment">// &#x914D;&#x7F6E;express&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;</span>
<span class="hljs-keyword">var</span> staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static(<span class="hljs-string">&apos;./static&apos;</span>))

<span class="hljs-keyword">var</span> uri = <span class="hljs-string">&apos;http://localhost:&apos;</span> + port

<span class="hljs-comment">//&#x7F16;&#x8BD1;&#x6210;&#x529F;&#x540E;&#x6253;&#x5370;uri</span>
devMiddleware.waitUntilValid(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&gt; Listening at &apos;</span> + uri + <span class="hljs-string">&apos;\n&apos;</span>)
})
<span class="hljs-comment">//&#x542F;&#x52A8;express&#x670D;&#x52A1;</span>
<span class="hljs-built_in">module</span>.exports = app.listen(port, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-comment">// &#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x5219;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
  <span class="hljs-keyword">if</span> (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== <span class="hljs-string">&apos;testing&apos;</span>) {
    opn(uri)
  }
})</code></pre><h4>npm run build</h4><p>&#x7531;&#x4E8E;<code>package.json</code>&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8FD0;&#x884C;&#x6B64;&#x547D;&#x4EE4;&#x540E;&#x4F1A;&#x6267;&#x884C;<code>build.js</code>&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.env.NODE_ENV = &apos;production&apos; //&#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x4E3A;production
var ora = require(&apos;ora&apos;) //&#x7EC8;&#x7AEF;&#x663E;&#x793A;&#x7684;&#x8F6C;&#x8F6E;loading
var rm = require(&apos;rimraf&apos;)  //node&#x73AF;&#x5883;&#x4E0B;rm -rf&#x7684;&#x547D;&#x4EE4;&#x5E93;
var path = require(&apos;path&apos;)  //&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x5904;&#x7406;&#x5E93;
var chalk = require(&apos;chalk&apos;)  //&#x7EC8;&#x7AEF;&#x663E;&#x793A;&#x5E26;&#x989C;&#x8272;&#x7684;&#x6587;&#x5B57;
var webpack = require(&apos;webpack&apos;) 
var config = require(&apos;../config&apos;) 
var webpackConfig = require(&apos;./webpack.prod.conf&apos;) //&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;

// &#x5728;&#x7EC8;&#x7AEF;&#x663E;&#x793A;ora&#x5E93;&#x7684;loading&#x6548;&#x679C;
var spinner = ora(&apos;building for production...&apos;)
spinner.start()

// &#x5220;&#x9664;&#x5DF2;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  if (err) throw err
  //&#x5728;&#x5220;&#x9664;&#x5B8C;&#x6210;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x5F00;&#x59CB;&#x7F16;&#x8BD1;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop() //&#x505C;&#x6B62;loading
    if (err) throw err
    
    // &#x5728;&#x7F16;&#x8BD1;&#x5B8C;&#x6210;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;,&#x5728;&#x7EC8;&#x7AEF;&#x8F93;&#x51FA;&#x7F16;&#x8BD1;&#x7684;&#x6587;&#x4EF6;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + &apos;\n\n&apos;)
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">process.env.NODE_ENV = <span class="hljs-string">&apos;production&apos;</span> <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x4E3A;production</span>
<span class="hljs-keyword">var</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ora&apos;</span>) <span class="hljs-comment">//&#x7EC8;&#x7AEF;&#x663E;&#x793A;&#x7684;&#x8F6C;&#x8F6E;loading</span>
<span class="hljs-keyword">var</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;rimraf&apos;</span>)  <span class="hljs-comment">//node&#x73AF;&#x5883;&#x4E0B;rm -rf&#x7684;&#x547D;&#x4EE4;&#x5E93;</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)  <span class="hljs-comment">//&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x5904;&#x7406;&#x5E93;</span>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>)  <span class="hljs-comment">//&#x7EC8;&#x7AEF;&#x663E;&#x793A;&#x5E26;&#x989C;&#x8272;&#x7684;&#x6587;&#x5B57;</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>) 
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>) 
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.prod.conf&apos;</span>) <span class="hljs-comment">//&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;</span>

<span class="hljs-comment">// &#x5728;&#x7EC8;&#x7AEF;&#x663E;&#x793A;ora&#x5E93;&#x7684;loading&#x6548;&#x679C;</span>
<span class="hljs-keyword">var</span> spinner = ora(<span class="hljs-string">&apos;building for production...&apos;</span>)
spinner.start()

<span class="hljs-comment">// &#x5220;&#x9664;&#x5DF2;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-comment">//&#x5728;&#x5220;&#x9664;&#x5B8C;&#x6210;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x5F00;&#x59CB;&#x7F16;&#x8BD1;</span>
  webpack(webpackConfig, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{
    spinner.stop() <span class="hljs-comment">//&#x505C;&#x6B62;loading</span>
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    
    <span class="hljs-comment">// &#x5728;&#x7F16;&#x8BD1;&#x5B8C;&#x6210;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;,&#x5728;&#x7EC8;&#x7AEF;&#x8F93;&#x51FA;&#x7F16;&#x8BD1;&#x7684;&#x6587;&#x4EF6;</span>
    process.stdout.write(stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
    }) + <span class="hljs-string">&apos;\n\n&apos;</span>)
  })
})</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli中的webpack配置

## 原文链接
[https://segmentfault.com/a/1190000008779053](https://segmentfault.com/a/1190000008779053)

