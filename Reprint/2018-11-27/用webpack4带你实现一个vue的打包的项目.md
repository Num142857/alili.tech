---
title: '用webpack4带你实现一个vue的打包的项目' 
date: 2018-11-27 2:30:13
hidden: true
slug: 5lp0ymqxg22
categories: [reprint]
---

{{< raw >}}
<p>&#x4E00;&#x4E2A;&#x7528;<code>webpack4</code>&#x6253;&#x5305;&#x7684;<code>vue</code> &#x7684;&#x9879;&#x76EE;&#xFF0C;&#x53C2;&#x7167;<code>vue-cli</code>&#x7684;<code>webpack</code>&#x914D;&#x7F6E;&#xFF0C;</p><p>&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x5E26;&#x4F60;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;vue&#x7684;&#x6253;&#x5305;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;commit&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#x3002;</p><h3 id="articleHeader0"><a href="https://github.com/naihe138/nvue" rel="nofollow noreferrer" target="_blank">github &#x5730;&#x5740;</a></h3><h3 id="articleHeader1">clone project</h3><p><code>git clone git@github.com:naihe138/nvue.git</code></p><h3 id="articleHeader2">install</h3><p><code>npm install</code> or <code>yarn</code></p><h3 id="articleHeader3">&#x4E00;&#x3001;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h3><p>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF0C;&#x7528;<code>vue-loader</code>&#x6765;&#x6253;&#x5305;<code>.vue</code>&#x6587;&#x4EF6;&#xFF0C;<code>html-webpack-plugin</code>&#x63D2;&#x4EF6;&#x6765;&#x5BFC;&#x51FA;<code>html</code>&#x6587;&#x4EF6;&#x3002;<br>&#x7B2C;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x5229;&#x7528;<code>vue-loader</code> &#x548C;<code>babel-loader</code>&#x662F;&#x628A;<code>.vue</code>&#x6587;&#x4EF6;&#x6253;&#x5305;&#x51FA;&#x6765;&#xFF0C;&#x603B;&#x5171;&#x624D;40&#x591A;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x770B;<code>build/webpack.base.conf.js</code>&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#x5C31;&#x770B;&#x7684;&#x61C2;&#x3002;<code>+++</code>&#x8868;&#x793A;&#x6709;&#x7701;&#x7565;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  +++
  // &#x6A21;&#x5757;&#xFF0C;loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: &apos;vue-loader&apos;,
        exclude: /node_modules/,
        include: resolve(&apos;src&apos;)
      },
      {
        test: /\.js$/,
        loader: &apos;babel-loader&apos;,
        exclude: /node_modules/,
        include: resolve(&apos;src&apos;)
      }
    ]
  }
  +++
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  +++
  <span class="hljs-comment">// &#x6A21;&#x5757;&#xFF0C;loader</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">include</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>)
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;babel-loader&apos;</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">include</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>)
      }
    ]
  }
  +++
}
</code></pre><p>&#x8FD0;&#x884C; <code>webpack --config build/webpack.base.conf.js</code></p><h3 id="articleHeader4">&#x4E8C;&#x3001;&#x6253;&#x5305;css&#x548C;&#x56FE;&#x7247;&#x7B49;&#x8D44;&#x6E90;</h3><p>&#x8FD9;&#x91CC;&#x6253;&#x5305;<code>css</code>&#x4EE5;<code>sass</code>&#x4E3A;&#x4F8B;&#xFF0C;&#x7528;&#x5230;&#x4E86;<code>mini-css-extract-plugin</code>&#x63D2;&#x4EF6;&#x63D0;&#x53D6;<code>css</code>&#xFF0C;&#x7528;<code>url-loader</code>&#x6765;&#x5904;&#x7406;&#x5B57;&#x4F53;&#x3001;&#x56FE;&#x7247;&#x3001;&#x97F3;&#x9891;&#x7B49;&#x8D44;&#x6E90;&#x3002;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x3002;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;<code>+++</code>&#x8868;&#x793A;&#x6709;&#x7701;&#x7565;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+++
module.exports = {
  +++
  // &#x6A21;&#x5757;&#xFF0C;loader
  module: {
    rules: [
      +++
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          &apos;css-loader&apos;,
          &apos;sass-loader&apos;
        ]
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          limit: 10000,
          name: &apos;static/img/[name].[hash:7].[ext]&apos;
        }
      }
      +++
    ]
  },
  // &#x63D2;&#x4EF6;
  plugins: [
    +++
    new MiniCssExtractPlugin({
      filename: &apos;static/css/[name].[hash].css&apos;,
      chunkFilename: &apos;static/css/[name].[hash].css&apos;
    })
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">+++
<span class="hljs-built_in">module</span>.exports = {
  +++
  <span class="hljs-comment">// &#x6A21;&#x5757;&#xFF0C;loader</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      +++
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.s?css$/</span>,
        <span class="hljs-attr">use</span>: [
          MiniCssExtractPlugin.loader,
          <span class="hljs-string">&apos;css-loader&apos;</span>,
          <span class="hljs-string">&apos;sass-loader&apos;</span>
        ]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;static/img/[name].[hash:7].[ext]&apos;</span>
        }
      }
      +++
    ]
  },
  <span class="hljs-comment">// &#x63D2;&#x4EF6;</span>
  plugins: [
    +++
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/css/[name].[hash].css&apos;</span>,
      <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&apos;static/css/[name].[hash].css&apos;</span>
    })
  ]
}
</code></pre><p>&#x8FD0;&#x884C; <code>webpack --config build/webpack.base.conf.js</code></p><h3 id="articleHeader5">&#x4E09;&#x3001;&#x914D;&#x7F6E;&#x70ED;&#x52A0;&#x8F7D;&#x3001;&#x4EE3;&#x7406;&#x7B49;&#x5F00;&#x53D1;&#x73AF;&#x5883;</h3><p>&#x901A;&#x8FC7;<code>build/config.js</code>&#x6765;&#x8BBE;&#x7F6E;&#x5F00;&#x53D1;&#x914D;&#x7F6E;&#x3002;&#x5982;&#x4E0B;&#x6CE8;&#x91CA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const path = require(&apos;path&apos;)

module.exports = {
  dev: {
    assetsSubDirectory: &apos;static&apos;, // &#x9759;&#x6001;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
    assetsPublicPath: &apos;/&apos;, // &#x76F8;&#x5BF9;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;
    proxyTable: {},
    host: &apos;localhost&apos;,
    port: &apos;8000&apos;,
    autoOpenBrowser: false, // &#x662F;&#x5426;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;
    errorOverlay: true, // &#x6D4F;&#x89C8;&#x5668;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x906E;&#x7F69;&#x5C42;
    notifyOnErrors: true, // &#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x901A;&#x77E5;&#x63D0;&#x793A;&#xFF0C;&#x9700;&#x8981;friendly-errors-webpack-plugin &#x914D;&#x5408;
    poll: false,
    useEslint: true, // &#x4FBF;&#x5B9C;&#x4F7F;&#x7528;eslint-loader&#x6A21;&#x5757;
    showEslintErrorsInOverlay: false, // eslint&#x6D4F;&#x89C8;&#x5668;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x906E;&#x7F69;&#x5C42;
    devtool: &apos;cheap-module-eval-source-map&apos;, // Source Maps
    cssSourceMap: true, // css Source Maps
    cacheBusting: false, // vue debugg &#x63D0;&#x793A;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">dev</span>: {
    <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">&apos;static&apos;</span>, <span class="hljs-comment">// &#x9759;&#x6001;&#x6587;&#x4EF6;&#x76EE;&#x5F55;</span>
    assetsPublicPath: <span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-comment">// &#x76F8;&#x5BF9;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;</span>
    proxyTable: {},
    <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;localhost&apos;</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-string">&apos;8000&apos;</span>,
    <span class="hljs-attr">autoOpenBrowser</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x81EA;&#x52A8;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;</span>
    errorOverlay: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x6D4F;&#x89C8;&#x5668;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x906E;&#x7F69;&#x5C42;</span>
    notifyOnErrors: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x901A;&#x77E5;&#x63D0;&#x793A;&#xFF0C;&#x9700;&#x8981;friendly-errors-webpack-plugin &#x914D;&#x5408;</span>
    poll: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">useEslint</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x4FBF;&#x5B9C;&#x4F7F;&#x7528;eslint-loader&#x6A21;&#x5757;</span>
    showEslintErrorsInOverlay: <span class="hljs-literal">false</span>, <span class="hljs-comment">// eslint&#x6D4F;&#x89C8;&#x5668;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x906E;&#x7F69;&#x5C42;</span>
    devtool: <span class="hljs-string">&apos;cheap-module-eval-source-map&apos;</span>, <span class="hljs-comment">// Source Maps</span>
    cssSourceMap: <span class="hljs-literal">true</span>, <span class="hljs-comment">// css Source Maps</span>
    cacheBusting: <span class="hljs-literal">false</span>, <span class="hljs-comment">// vue debugg &#x63D0;&#x793A;</span>
  }
}
</code></pre><p>&#x5728;<code>webpack.dev.conf.js</code>&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>webpack-dev-server</code>&#x63D2;&#x4EF6;&#x6765;&#x5F00;&#x542F;&#x70ED;&#x91CD;&#x8F7D;&#x670D;&#x52A1;&#xFF0C;&#x540C;&#x65F6;&#x914D;&#x7F6E;&#x81EA;&#x52A8;&#x8865;&#x5168;css&#x517C;&#x5BB9;&#x4EE3;&#x7801;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;<code>postcss-loader</code></p><p>&#x8FD0;&#x884C;<code>npm run dev</code> &#x6216;&#x8005; <code>yarn dev</code> &#x5C31;&#x53EF;&#x4EE5;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x4E86;</p><h3 id="articleHeader6">&#x56DB;&#x3001;&#x914D;&#x7F6E;&#x6253;&#x5305;&#x73AF;&#x5883;</h3><p>&#x901A;&#x8FC7;<code>build/config.js</code>&#x6765;&#x8BBE;&#x7F6E;&#x5F00;&#x53D1;&#x914D;&#x7F6E;&#x3002;&#x5982;&#x4E0B;&#x6CE8;&#x91CA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)

module.exports = {
  +++
  build: {
    // html&#x6A21;&#x677F;
    index: path.resolve(__dirname, &apos;../dist/index.html&apos;),
    // Paths
    assetsRoot: path.resolve(__dirname, &apos;../dist&apos;),
    assetsSubDirectory: &apos;static&apos;,
    assetsPublicPath: &apos;/&apos;,
    // &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;souce map
    productionSourceMap: false,
    devtool: &apos;#source-map&apos;,
    // &#x5F00;&#x542F;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;Gzip&#x538B;&#x7F29;
    // &#x5982;&#x679C;&#x662F;true &#x7684;&#x8BDD;  &#x9700;&#x8981; npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: [&apos;js&apos;, &apos;css&apos;],

    // &#x6253;&#x5305;&#x5B8C;&#x6210;&#x663E;&#x793A;&#x5305;&#x5927;&#x5C0F;&#x7684;&#x72B6;&#x6001;&#x5206;&#x6790;
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  +++
  build: {
    <span class="hljs-comment">// html&#x6A21;&#x677F;</span>
    index: path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.html&apos;</span>),
    <span class="hljs-comment">// Paths</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    assetsSubDirectory: <span class="hljs-string">&apos;static&apos;</span>,
    assetsPublicPath: <span class="hljs-string">&apos;/&apos;</span>,
    <span class="hljs-comment">// &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;souce map</span>
    productionSourceMap: <span class="hljs-keyword">false</span>,
    devtool: <span class="hljs-string">&apos;#source-map&apos;</span>,
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;Gzip&#x538B;&#x7F29;</span>
    <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;true &#x7684;&#x8BDD;  &#x9700;&#x8981; npm install --save-dev compression-webpack-plugin</span>
    productionGzip: <span class="hljs-keyword">false</span>,
    productionGzipExtensions: [<span class="hljs-string">&apos;js&apos;</span>, <span class="hljs-string">&apos;css&apos;</span>],

    <span class="hljs-comment">// &#x6253;&#x5305;&#x5B8C;&#x6210;&#x663E;&#x793A;&#x5305;&#x5927;&#x5C0F;&#x7684;&#x72B6;&#x6001;&#x5206;&#x6790;</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
</code></pre><p>&#x8FD0;&#x884C;<code>npm run build</code> &#x6216;&#x8005; <code>yarn build</code> &#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6253;&#x5305;vue&#x9879;&#x76EE;&#x5566;&#x3002;</p><h3 id="articleHeader7">&#x4E94;&#x3001;&#x68C0;&#x67E5;&#x7248;&#x672C;&#xFF0C;&#x4F18;&#x5316;&#x6253;&#x5305;&#x8F93;&#x51FA;&#x548C;Eslint&#x8BBE;&#x7F6E;</h3><p>&#x5728;<code>check-version.js</code>&#x4E2D;&#x7528; <code>shelljs</code>&#x6A21;&#x5757;&#x68C0;&#x67E5;&#x65F6;&#x5019;&#x6709;npm&#x547D;&#x4EE4;&#xFF0C;<code>semver</code>&#x6A21;&#x5757;&#x8BED;&#x4E49;&#x5316;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x7136;&#x540E;&#x5728;<code>build.js</code>&#x5408;&#x5E76;<code>webpack.prod.conf.js</code>&#x7684;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x7EC4;&#x5728;&#x683C;&#x5F0F;&#x5316;&#x8F93;&#x51FA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x68C0;&#x67E5;&#x65F6;&#x5019;&#x6709;&#x5B89;&#x88C5;npm&#x547D;&#x4EE4;
if (shell.which(&apos;npm&apos;)) {
  versionRequirements.push({
    name: &apos;npm&apos;,
    currentVersion: exec(&apos;npm --version&apos;),
    versionRequirement: packageConfig.engines.npm
  })
}

// &#x683C;&#x5F0F;&#x5316;&#x8F93;&#x51FA;
process.stdout.write(stats.toString({
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false
}) + &apos;\n\n&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x68C0;&#x67E5;&#x65F6;&#x5019;&#x6709;&#x5B89;&#x88C5;npm&#x547D;&#x4EE4;</span>
<span class="hljs-keyword">if</span> (shell.which(<span class="hljs-string">&apos;npm&apos;</span>)) {
  versionRequirements.push({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;npm&apos;</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">&apos;npm --version&apos;</span>),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.npm
  })
}

<span class="hljs-comment">// &#x683C;&#x5F0F;&#x5316;&#x8F93;&#x51FA;</span>
process.stdout.write(stats.toString({
  <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
}) + <span class="hljs-string">&apos;\n\n&apos;</span>)
</code></pre><p>&#x901A;&#x8FC7;eslint-loader &#x6765;&#x914D;&#x7F6E;eslint&#x7684;&#x68C0;&#x67E5;&#xFF0C;&#x5EFA;&#x7ACB;.eslintrc.js&#x53BB;&#x8BBE;&#x7F6E;&#x89C4;&#x5219;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(js|vue)$/,
  loader: &apos;eslint-loader&apos;,
  enforce: &apos;pre&apos;,
  include: [resolve(&apos;src&apos;)],
  exclude: /node_modules/,
  options: {
    formatter: require(&apos;eslint-friendly-formatter&apos;),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
},
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;eslint-loader&apos;</span>,
  <span class="hljs-attr">enforce</span>: <span class="hljs-string">&apos;pre&apos;</span>,
  <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">&apos;src&apos;</span>)],
  <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;eslint-friendly-formatter&apos;</span>),
    <span class="hljs-attr">emitWarning</span>: !config.dev.showEslintErrorsInOverlay
  }
},
</code></pre><h3 id="articleHeader8">&#x516D;&#x3001;&#x6253;&#x5305;&#x4F18;&#x5316;</h3><p>1&#x3001;&#x6DFB;&#x52A0;<code>DllPlugin</code>&#x548C;<code>DllReferencePlugin</code>&#x6765;&#x6253;&#x5305;&#x4F18;&#x5316;&#x4E0D;&#x53D8;&#x7684;&#x5E93;&#xFF0C;<br>2&#x3001;&#x901A;&#x8FC7;<code>cache-loader</code>&#x6765;&#x505A;<code>loader</code>&#x7684;&#x7F13;&#x5B58;&#xFF0C;<br>3&#x3001;&#x901A;&#x8FC7;<code>UglifyJsPlugin</code>&#x7684;<code>parallel</code>&#x6765;&#x5F00;&#x542F;&#x591A;&#x7EBF;&#x7A0B;&#x6253;&#x5305;</p><p>&#x5148;&#x8FD0;&#x884C;<code>npm run dll</code> &#x7136;&#x540E; <code>npm run build</code></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用webpack4带你实现一个vue的打包的项目

## 原文链接
[https://segmentfault.com/a/1190000015326528](https://segmentfault.com/a/1190000015326528)

