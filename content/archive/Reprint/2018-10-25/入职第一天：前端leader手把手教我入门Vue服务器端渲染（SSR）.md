---
title: 入职第一天：前端leader手把手教我入门Vue服务器端渲染（SSR）
hidden: true
categories: [reprint]
slug: 9c1d2d98
date: 2018-10-25 09:08:15
---

{{< raw >}}
<p>&#x7EE7;&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x897F;&#x5B89;&#x7535;&#x9762;&#x4E4B;&#x540E;&#x987A;&#x5229;&#x62FF;&#x5230;&#x4E86;OFFER&#xFF0C;&#x4ECA;&#x5929;&#xFF08;5&#x6708;2&#x53F7;&#xFF09;&#x662F;&#x6211;&#x5165;&#x804C;&#x7B2C;&#x4E00;&#x5929;&#xFF0C;&#x5728;&#x7B80;&#x77ED;&#x7684;&#x5185;&#x90E8;&#x57F9;&#x8BAD;&#x4E86;&#x4E00;&#x4E0A;&#x5348;&#x540E;&#xFF0C;&#x524D;&#x7AEF;leader&#x8BA9;&#x6211;&#x5148;&#x4E86;&#x89E3;&#x4E0B;<strong>&#x4EC0;&#x4E48;&#x662F;vue&#x7684;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#xFF08;SSR&#xFF09;</strong>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVDOf4?w=1946&amp;h=892" src="https://static.alili.tech/img/bVDOf4?w=1946&amp;h=892" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>SSR&#xFF0C;&#x82F1;&#x6587;&#x5168;&#x79F0;&#x53EB; Server side rendering &#xFF0C;&#x56FD;&#x4EBA;&#x53EB;&#x5B83;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x3002;</p><p>&#x9996;&#x5148;&#x542C;&#x5230;&#x8FD9;&#x4E2A;&#x540D;&#x8BCD;&#xFF0C;&#x6211;&#x5934;&#x8111;&#x5C31;&#x6709;&#x70B9;&#x7729;&#x6655;&#x3002;&#x54B1;&#x4EEC;&#x8FD8;&#x662F;&#x5148;&#x53BB;&#x5B98;&#x7F51;&#x4E86;&#x89E3;&#x4E0B;SSR&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><p>Vue.js &#x53EF;&#x4EE5;&#x5C06;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x4E3A;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684; HTML &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5C06;&#x5B83;&#x4EEC;&#x76F4;&#x63A5;&#x53D1;&#x9001;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6700;&#x540E;&#x5C06;&#x9759;&#x6001;&#x6807;&#x8BB0;&quot;&#x6DF7;&#x5408;&quot;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x4E0A;&#x5B8C;&#x5168;&#x4EA4;&#x4E92;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x3002;&#x8FD9;&#x79CD;&#x5728;&#x670D;&#x52A1;&#x5668;&#x548C;&#x5BA2;&#x6237;&#x7AEF;&#x90FD;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x7A0B;&#x5E8F;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53EB;&#x505A;&#x201C;&#x540C;&#x6784;&#x201D;&#x3002;</p><p>&#x6211;&#x5F31;&#x5F31;&#x5730;&#x95EE;&#x4E86;leader&#x4E00;&#x53E5;&#xFF0C;&#x54B1;&#x4EEC;&#x516C;&#x53F8;<strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;</strong>&#xFF1F;</p><p>leader&#x56DE;&#x590D;&#x6211;&#xFF0C;&#x6709;&#x4E24;&#x70B9;&#x539F;&#x56E0;&#xFF0C;&#x7B2C;&#x4E00;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x516C;&#x53F8;&#x7684;&#x7AD9;&#x70B9;&#x5F88;&#x6CE8;&#x91CD;SEO&#xFF0C;&#x9875;&#x9762;&#x53C8;&#x662F;&#x5F02;&#x6B65;&#x83B7;&#x53D6;&#x5185;&#x5BB9;&#xFF1B;&#x7B2C;&#x4E8C;&#x70B9;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x5E0C;&#x671B;&#x7528;&#x6237;&#x66F4;&#x5FEB;&#x901F;&#x5730;&#x770B;&#x5230;&#x5B8C;&#x6574;&#x6E32;&#x67D3;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x4ECE;&#x800C;&#x63D0;&#x9AD8;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;&#x57FA;&#x4E8E;&#x8FD9;&#x4E24;&#x70B9;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;(SSR)&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x3002;<br>&#x90A3;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x6D41;&#x7A0B;&#x7A76;&#x7ADF;&#x662F;&#x600E;&#x6837;&#x7684;&#x5462;&#xFF1F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x5148;&#x4E0A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bV9Y3Y?w=1306&amp;h=756" src="https://static.alili.tech/img/bV9Y3Y?w=1306&amp;h=756" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x4F7F;&#x7528;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9996;&#x5148;&#x8981;&#x6709;&#x4E2A;server&#x7AEF;&#x3002;&#x56E0;&#x4E3A;&#x5728;&#x5F00;&#x53D1;vue&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x8D77;&#x4E00;&#x4E2A;webpack-dev-server&#x7684;&#x670D;&#x52A1;&#xFF0C;&#x7AEF;&#x53E3;8000&#x3002;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x8981;&#x4F7F;&#x7528;&#x5B83;&#x7684;&#x70ED;&#x66F4;&#x66FF;&#xFF0C;&#x8FD9;&#x6837;&#x80FD;&#x52A0;&#x5FEB;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>&#x7531;&#x4E8E;webpack&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x4E3B;&#x7684;server&#xFF0C;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x5728;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x662F;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x5199;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x518D;&#x8D77;&#x4E00;&#x4E2A;node server&#xFF0C;&#x53BB;&#x6267;&#x884C;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x903B;&#x8F91;&#x3002;&#x6211;&#x4EEC;&#x4F1A;&#x7528;&#x5230;vue-server-renderer&#x8FD9;&#x4E2A;&#x5305;&#x6765;&#x5E2E;&#x6211;&#x4EEC;&#x5728;node.js&#x73AF;&#x5883;&#x91CC;&#x9762;&#x53BB;&#x6E32;&#x67D3;&#x51FA;vue&#x4EE3;&#x7801;&#x751F;&#x6210;&#x7684;HTML&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x662F;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7ED9;&#x7528;&#x6237;&#x7684;&#xFF0C;&#x7528;&#x6237;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x76F4;&#x63A5;&#x770B;&#x5230;HTML&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x4EE5;&#x56FE;&#x4E3A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4E24;&#x4E2A;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E24;&#x79CD;server&#x3002;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;webpack-dev-server&#xFF0C;&#x5C31;&#x8DDF;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E00;&#x6837;&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x524D;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x8D70;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x5C31;&#x8981;&#x8D70;node server&#x670D;&#x52A1;&#xFF0C;&#x7AEF;&#x53E3;3333&#x4EE5;&#x793A;&#x533A;&#x522B;&#x3002;&#x800C;&#x4E14;&#x9700;&#x8981;&#x6253;&#x5305;&#x4E00;&#x4E2A;&#x903B;&#x8F91;&#x5230;node&#x7AEF;&#x8FD0;&#x884C;&#xFF0C;&#x901A;&#x8FC7;webpack-server-compiler&#x53BB;&#x751F;&#x6210;&#x4E00;&#x4E2A;server bundle&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#x7684;app.js&#x3002; &#x5F53;node server &#x83B7;&#x53D6;&#x5230;server bundle&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6267;&#x884C;vue-server-renderer&#xFF0C;&#x53BB;&#x6E32;&#x67D3;&#x51FA;HTML&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7ED9;&#x7528;&#x6237;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x901A;&#x8FC7;js&#x518D;&#x53BB;&#x6E32;&#x67D3;&#x51FA;&#x9875;&#x9762;&#x5185;&#x5BB9;&#xFF0C;&#x51CF;&#x5C11;&#x4E86;&#x7528;&#x6237;&#x7684;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#x3002;</p><p>&#x4ECA;&#x5929;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x4E3B;&#x8981;&#x4EFB;&#x52A1;&#x662F;&#xFF0C;&#x5148;&#x7528;webpack&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6765;&#x6253;&#x5305;server&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5165;&#x95E8;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x5982;&#x4F55;&#x7F16;&#x5199;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1F;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x91CC;&#x9762;&#x627E;&#x5230;build&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5176;&#x4E0B;&#x9762;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;webpack.config.server.js&#x6587;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x5148;&#x64B8;&#x4E3A;&#x656C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const ExtractPlugin = require(&apos;extract-text-webpack-plugin&apos;)
const webpack = require(&apos;webpack&apos;)
const merge = require(&apos;webpack-merge&apos;)
const baseConfig = require(&apos;./webpack.config.base&apos;)
const VueServerPlugin = require(&apos;vue-server-renderer/server-plugin&apos;)

let config

config = merge(baseConfig, {
  target: &apos;node&apos;,
  entry: path.join(__dirname, &apos;../client/server-entry.js&apos;),
  devtool: &apos;source-map&apos;,
  output: {
    libraryTarget: &apos;commonjs2&apos;,
    filename: &apos;server-entry.js&apos;,
    path: path.join(__dirname, &apos;../server-build&apos;)
  },
  externals: Object.keys(require(&apos;../package.json&apos;).dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: &apos;vue-style-loader&apos;,
          use: [
            &apos;css-loader&apos;,
            {
              loader: &apos;postcss-loader&apos;,
              options: {
                sourceMap: true
              }
            },
            &apos;stylus-loader&apos;
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin(&apos;styles.[contentHash:8].css&apos;),
    new webpack.DefinePlugin({
      &apos;process.env.NODE_ENV&apos;: JSON.stringify(process.env.NODE_ENV || &apos;development&apos;),
      &apos;process.env.VUE_ENV&apos;: &apos;&quot;server&quot;&apos;
    }),
    new VueServerPlugin()
  ]
})

module.exports = config" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> ExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.config.base&apos;</span>)
<span class="hljs-keyword">const</span> VueServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer/server-plugin&apos;</span>)

<span class="hljs-keyword">let</span> config

config = merge(baseConfig, {
  target: <span class="hljs-string">&apos;node&apos;</span>,
  entry: path.join(__dirname, <span class="hljs-string">&apos;../client/server-entry.js&apos;</span>),
  devtool: <span class="hljs-string">&apos;source-map&apos;</span>,
  output: {
    libraryTarget: <span class="hljs-string">&apos;commonjs2&apos;</span>,
    filename: <span class="hljs-string">&apos;server-entry.js&apos;</span>,
    path: path.join(__dirname, <span class="hljs-string">&apos;../server-build&apos;</span>)
  },
  externals: <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../package.json&apos;</span>).dependencies),
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.styl/</span>,
        use: ExtractPlugin.extract({
          fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
          use: [
            <span class="hljs-string">&apos;css-loader&apos;</span>,
            {
              loader: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
              options: {
                sourceMap: <span class="hljs-literal">true</span>
              }
            },
            <span class="hljs-string">&apos;stylus-loader&apos;</span>
          ]
        })
      }
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> ExtractPlugin(<span class="hljs-string">&apos;styles.[contentHash:8].css&apos;</span>),
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">&apos;process.env.NODE_ENV&apos;</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV || <span class="hljs-string">&apos;development&apos;</span>),
      <span class="hljs-string">&apos;process.env.VUE_ENV&apos;</span>: <span class="hljs-string">&apos;&quot;server&quot;&apos;</span>
    }),
    <span class="hljs-keyword">new</span> VueServerPlugin()
  ]
})

<span class="hljs-built_in">module</span>.exports = config</code></pre><p>&#x521A;&#x63A5;&#x89E6;SSR&#x7684;&#x7AE5;&#x978B;&#xFF0C;&#x770B;&#x5B8C;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x662F;&#x4E0D;&#x662F;&#x611F;&#x89C9;&#x6709;&#x70B9;&#x6655;&#xFF1F;&#x522B;&#x7740;&#x6025;&#xFF0C;&#x6211;&#x6765;&#x5E26;&#x5927;&#x5BB6;&#x4E00;&#x4E00;&#x5206;&#x6790;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target: &apos;node&apos;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial">target: &apos;<span class="hljs-keyword">node</span><span class="hljs-title">&apos;,</span></code></pre><p>target&#x9700;&#x8981;&#x6307;&#x5B9A;&#x4E3A;node&#xFF0C;&#x56E0;&#x4E3A;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x7A0B;&#x5E8F;&#x662F;&#x5728;node&#x7AEF;&#x8FD0;&#x884C;&#x7684;&#xFF0C;&#x4E0D;&#x662F;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8FD0;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x6307;&#x5B9A;&#x6253;&#x5305;&#x7684;&#x76EE;&#x6807;&#x662F;node&#x73AF;&#x5883;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: path.join(__dirname, &apos;../client/server-entry.js&apos;)," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code style="word-break:break-word;white-space:initial">entry: path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">&apos;../client/server-entry.js&apos;</span>),</code></pre><p>entry&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5728;client&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;server-entry.js&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devtool: &apos;source-map&apos;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">devtool:</span> <span class="hljs-string">&apos;source-map&apos;</span>,</code></pre><p>devtool&#x9700;&#x8981;&#x6307;&#x5B9A;source-map&#xFF0C;&#x56E0;&#x4E3A;vue-server-renderer&#x6709;&#x4E2A;webpack&#x63D2;&#x4EF6;&#xFF0C;&#x5B83;&#x80FD;&#x63D0;&#x4F9B;&#x4EE3;&#x7801;&#x8C03;&#x8BD5;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E0D;&#x8FC7;&#x53EA;&#x80FD;&#x63D0;&#x793A;&#x5230;&#x51FA;&#x9519;&#x7684;&#x6587;&#x4EF6;&#x51FA;&#x5728;&#x54EA;&#x4E00;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="libraryTarget: &apos;commonjs2&apos;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">libraryTarget:</span> <span class="hljs-string">&apos;commonjs2&apos;</span>,</code></pre><p>&#x6307;&#x5B9A;libraryTarget&#x7684;&#x7C7B;&#x578B;&#x4E3A;commonjs2&#xFF0C;&#x7528;&#x6765;&#x6307;&#x5B9A;&#x4EE3;&#x7801;export&#x51FA;&#x53BB;&#x7684;&#x5165;&#x53E3;&#x7684;&#x5F62;&#x5F0F;&#x3002;&#x5728;node.js&#x4E2D;&#x6A21;&#x5757;&#x662F;module.exports = {...}&#xFF0C;commonjs2&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x51FA;&#x53E3;&#x5F62;&#x5F0F;&#x5C31;&#x7C7B;&#x4F3C;&#x4E8E;&#x6B64;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: Object.keys(require(&apos;../package.json&apos;).dependencies)," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code style="word-break:break-word;white-space:initial">externals: Object.keys(require(&apos;../<span class="hljs-keyword">package</span>.json&apos;).dependencies),</code></pre><p>externals&#x662F;&#x5916;&#x90E8;&#x56E0;&#x7D20;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6253;&#x5F00;package.json&#x6587;&#x4EF6;&#x770B;&#x770B;dependencies</p><p><span class="img-wrap"><img data-src="/img/bV9Y3W?w=1326&amp;h=788" src="https://static.alili.tech/img/bV9Y3W?w=1326&amp;h=788" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x7528;Object.keys()&#x5F97;&#x5230;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;externals&#x5C31;&#x662F;&#x544A;&#x8BC9;webpack&#x4E0D;&#x8981;&#x53BB;&#x6253;&#x5305;node_modules&#x91CC;&#x9762;&#x7684;js&#x4EE3;&#x7801;&#x3002;devDependencies&#x91CC;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x578B;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x5728;&#x5E94;&#x7528;&#x771F;&#x6B63;&#x8DD1;&#x8D77;&#x6765;&#x7684;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x3002;&#x53EA;&#x6709;&#x5728;&#x6267;&#x884C;&#x4E00;&#x4E9B;&#x6253;&#x5305;&#xFF0C;&#x5DE5;&#x5177;&#x5316;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x9700;&#x8981;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;process.env.VUE_ENV&apos;: &apos;&quot;server&quot;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scheme"><code style="word-break:break-word;white-space:initial"><span class="hljs-symbol">&apos;process.env.VUE_ENV</span><span class="hljs-symbol">&apos;:</span> &apos;<span class="hljs-string">&quot;server&quot;</span>&apos;</code></pre><p>&#x8FD9;&#x662F;vue&#x670D;&#x52A1;&#x7AEF;&#x5B98;&#x65B9;&#x5EFA;&#x8BAE;&#x6211;&#x4EEC;&#x8FD9;&#x4E48;&#x53BB;&#x505A;&#x7684;&#xFF0C;&#x5728;vue-server-renderer&#x91CC;&#x9762;&#x53EF;&#x80FD;&#x4F1A;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const VueServerPlugin = require(&apos;vue-server-renderer/server-plugin&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> VueServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer/server-plugin&apos;</span>)</code></pre><p>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x80FD;&#x5E2E;&#x6211;&#x4EEC;&#x5355;&#x72EC;&#x5730;&#x751F;&#x6210;&#x4E00;&#x4E2A;json&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E8E;&#x5728;vue&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x91CC;&#x9762;&#x80FD;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x4E00;&#x4E9B;&#x5F88;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#x3002;</p><h3 id="articleHeader0">&#x6700;&#x540E;</h3><p>&#x6587;&#x7AE0;&#x5199;&#x5230;&#x8FD9;&#x513F;&#xFF0C;Vue&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x5165;&#x95E8;&#x5DE5;&#x4F5C;&#x5C31;&#x7B97;&#x5B8C;&#x6210;&#x4E86;&#xFF08;&#x5148;&#x7528;webpack&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6765;&#x6253;&#x5305;server&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#xFF09;&#xFF0C;&#x4E0B;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x4F7F;&#x7528;koa&#x8FD9;&#x4E2A;node&#x670D;&#x52A1;&#x7AEF;&#x6846;&#x67B6;&#x53BB;&#x5B9E;&#x73B0;node server&#xFF0C;&#x6700;&#x65B0;&#x6587;&#x7AE0;&#x90FD;&#x4F1A;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x66F4;&#x65B0;&#x5728;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&lt;<strong>&#x95F0;&#x571F;&#x5927;&#x53D4;</strong>&gt;&#x91CC;&#x9762;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bV9Y3V?w=344&amp;h=344" src="https://static.alili.tech/img/bV9Y3V?w=344&amp;h=344" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
入职第一天：前端leader手把手教我入门Vue服务器端渲染（SSR）

## 原文链接
[https://segmentfault.com/a/1190000014733669](https://segmentfault.com/a/1190000014733669)

