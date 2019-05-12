---
title: '实战Vue简易项目（2）定制开发环境' 
date: 2018-11-19 2:32:04
hidden: true
slug: bifo47oe4qg
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x7AE0;&#x5185;&#x5BB9;&#x5305;&#x542B;&#x4E0A;&#x4E00;&#x7AE0;&#x601D;&#x8003;&#x7684;&#x89E3;&#x51B3;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x5176;&#x5B83;&#x7684;&#x5B9A;&#x5236;...</p><h2 id="articleHeader0">CSS&#x9884;&#x5904;&#x7406;</h2><p>&#x5173;&#x4E8E;&#x5BF9;<code>.vue</code>&#x6587;&#x4EF6;&#x6A21;&#x5757;&#x5904;&#x7406;&#x89C4;&#x5219;&#x7684;&#x914D;&#x7F6E;&#x4F9D;&#x6B21;&#x53EF;&#x5728;<code>build/webpack.base.conf.js</code>-&gt;<code>build/vue-loader.conf.js</code>-&gt;<code>build/utils.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x8DDF;&#x8E2A;&#xFF1B;</p><p>&#x800C;<code>loaders</code>&#x7684;&#x5173;&#x952E;&#x5728;&#x4E8E;<code>build/vue-loader.conf.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x5BF9;<code>utils.cssLoaders</code>&#x7684;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>...
<span class="hljs-keyword">module</span>.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
...</code></pre><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x5806;&#xFF0C;&#x6211;&#x60F3;&#x8868;&#x8FBE;&#x5565;&#x5462;&#xFF1F;</p><p>&#x56E0;&#x4E3A;&#x4E2A;&#x4EBA;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4E60;&#x60EF;&#x7528;<code>scss</code>&#x7F16;&#x5199;&#x6837;&#x5F0F;&#xFF0C;&#x8DDF;&#x8E2A;&#x4EE5;&#x4E0A;&#x6587;&#x4EF6;&#x53D1;&#x73B0;&#xFF0C;&#x9488;&#x5BF9;<code>.vue</code>&#x6587;&#x4EF6;&#x7684;&#x9884;&#x5904;&#x7406;<code>loaders</code>&#x4E2D;&#x5DF2;&#x7ECF;&#x5305;&#x542B;&#x5BF9;<code>scss</code>&#x7684;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//utils.js&#x6587;&#x4EF6;

exports.cssLoaders = function (options) {
  options = options || {}
...
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders(&apos;less&apos;),
    sass: generateLoaders(&apos;sass&apos;, { indentedSyntax: true }),
    scss: generateLoaders(&apos;sass&apos;),
    stylus: generateLoaders(&apos;stylus&apos;),
    styl: generateLoaders(&apos;stylus&apos;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>//utils.js&#x6587;&#x4EF6;

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> {</span>
  <span class="hljs-keyword">options</span> = <span class="hljs-keyword">options</span> || {}
...
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">cs</span><span class="hljs-variable">s:</span> generateLoaders(),
    postcs<span class="hljs-variable">s:</span> generateLoaders(),
    les<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">&apos;less&apos;</span>),
    sas<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>, { indentedSyntax: true }),
    <span class="hljs-keyword">scs</span><span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>),
    stylu<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>),
    sty<span class="hljs-variable">l:</span> generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>)
  }
}</code></pre><p><strong>&#x8FD9;&#x6837;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>scss</code>&#x4E86;&#x5462;&#xFF1F;</strong></p><p>&#x606D;&#x559C;&#x4F60;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;...</p><p>&#x67E5;&#x627E;&#x53D1;&#x73B0;&#xFF0C;<code>package.json</code>&#x4E2D;&#x5E76;&#x6CA1;&#x6709;&#x5173;&#x4E8E;<code>sass-loader</code>&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;<code>sass-loader</code>&#x3001;<code>node-sass</code>NPM&#x5305;&#xFF1A;<code>npm i -D sass-loader</code>&#x3001;<code>npm i -D node-sass</code>&#x3002;</p><h3 id="articleHeader1">&#x6D4B;&#x8BD5;&#x53EF;&#x884C;&#x6027;</h3><p>&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5728;<code>src/components/HelloWorld.vue</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeuEx?w=929&amp;h=470" src="https://static.alili.tech/img/bVbeuEx?w=929&amp;h=470" alt="scss&#x6D4B;&#x8BD5;" title="scss&#x6D4B;&#x8BD5;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x5C40;&#x57DF;&#x7F51;&#x8BBF;&#x95EE;</h2><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x7684;&#x73AF;&#x5883;&#x662F;&#x4E0D;&#x5141;&#x8BB8;&#x5C40;&#x57DF;&#x7F51;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5C40;&#x57DF;&#x7F51;&#x8BBF;&#x95EE;&#x7684;&#x8BDD;&#xFF0C;&#x8DDF;&#x8E2A;&#x8DEF;&#x5F84;<code>build/webpack.dev.conf.js</code>&#xFF08;<strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8DDF;&#x8E2A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5462;&#xFF1F;</strong>&#xFF09;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    clientLogLevel: &apos;warning&apos;,
...
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs roboconf"><code>devServer: {
    <span class="hljs-attribute">clientLogLevel</span>: &apos;warning&apos;,
...
    host: HOST || config<span class="hljs-variable">.dev</span><span class="hljs-variable">.host</span>,
    port: PORT || config<span class="hljs-variable">.dev</span><span class="hljs-variable">.port</span>,
    open: config<span class="hljs-variable">.dev</span><span class="hljs-variable">.autoOpenBrowser</span>,
...</code></pre><p>&#x8FD9;&#x91CC;&#x6307;&#x5B9A;&#x4E86;<code>host</code>&#x5B57;&#x6BB5;&#xFF0C;&#x800C;<code>HOST</code>&#x503C;&#x5728;&#x8BE5;&#x6587;&#x4EF6;&#x53EF;&#x67E5;&#x627E;&#x5230;<code>const HOST = process.env.HOST</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x5C40;&#x57DF;&#x7F51;&#x5185;&#x8BBF;&#x95EE;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;</p><ol><li>&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x914D;&#x7F6E;<code>--host 0.0.0.0</code>&#xFF0C;&#x5373;&#x5728;<code>/package.json</code>&#x7684;<code>scripts</code>&#x4E2D;&#x4FEE;&#x6539;<code>&quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 0.0.0.0&quot;,</code>&#xFF1B;</li><li>&#x5728;<code>config/index.js</code>&#x4E2D;:</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  dev: {
...
    host: &apos;localhost&apos;, // can be overwritten by process.env.HOST
    port: 8080,
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
  dev: {
...
    host: <span class="hljs-string">&apos;localhost&apos;</span>, <span class="hljs-comment">// can be overwritten by process.env.HOST</span>
    port: <span class="hljs-number">8080</span>,
...</code></pre><p>&#x4FEE;&#x6539;<code>host: &apos;localhost&apos;,</code>&#x4E3A;<code>host: &apos;0.0.0.0&apos;,</code>&#xFF0C;&#x5373;&#x53EF;&#xFF1B;</p><p>&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#xFF0C;&#x5373;&#xFF1A;&#x7B2C;&#x4E8C;&#x79CD;&#x3002;</p><p>&#x81F3;&#x4E8E;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8DDF;&#x8E2A;<code>build/webpack.dev.conf.js</code>&#x6587;&#x4EF6;&#xFF1F;</p><p>&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x662F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x72EC;&#x6709;&#x7684;&#xFF0C;&#x8981;&#x4FEE;&#x6539;<strong>&#x5F00;&#x53D1;&#x73AF;&#x5883;</strong>&#x5416;&#xFF0C;&#x5FC5;&#x7136;&#x627E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x8DDF;&#x8E2A;&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ul><li>&#x4FEE;&#x6539;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x914D;&#x7F6E;&#xFF0C;&#x8981;&#x91CD;&#x542F;&#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#xFF08;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;<code>Ctrl + c</code>&#xFF0C;&#x7136;&#x540E;<code>npm run dev</code>&#x5373;&#x53EF;&#xFF09;&#x624D;&#x53EF;&#x5E94;&#x7528;&#x65B0;&#x7684;&#x914D;&#x7F6E;&#x3002;</li></ul><h3 id="articleHeader3">&#x6D4B;&#x8BD5;&#x53EF;&#x884C;&#x6027;&#xFF1A;</h3><p>&#x91CD;&#x542F;&#x9879;&#x76EE;&#x540E;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8F93;&#x5165;<code>http://192.168.1.106:8080/#/</code>&#xFF08;<code>192.168.1.106</code>&#x662F;&#x4F60;&#x672C;&#x5730;IP&#xFF0C;&#x53EF;&#x901A;&#x8FC7;<code>ipconfig /all</code>&#x67E5;&#x770B;&#xFF09;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#xFF0C;&#x5C31;&#x8BF4;&#x660E;&#x5C40;&#x57DF;&#x7F51;&#x5185;&#x7684;&#x5176;&#x4ED6;&#x7AEF;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x3002;</p><p>&#x4E0D;&#x4FE1;&#xFF1F;&#x4F60;&#x8BD5;&#x8BD5;&#x624B;&#x673A;&#x3002;</p><h2 id="articleHeader4">&#x6253;&#x5305;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;</h2><p>&#x5982;&#x679C;&#xFF0C;&#x4F60;&#x60F3;&#x548C;&#x5176;&#x5B83;&#x670B;&#x53CB;&#x5206;&#x4EAB;&#x4F60;&#x7684;&#x6210;&#x679C;&#xFF0C;&#x90E8;&#x7F72;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x6216;&#x76F4;&#x63A5;&#x6253;&#x5305;&#x53D1;&#x7ED9;&#x670B;&#x53CB;&#xFF0C;&#x901A;&#x8FC7;<code>npm run build</code>&#x5373;&#x53EF;&#x751F;&#x6210;&#x9759;&#x6001;&#x8D44;&#x6E90;<code>dist/</code>&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x6253;&#x5F00;<code>dist/index.html</code>&#xFF0C;&#x53D1;&#x73B0;&#x662F;<strong>&#x7A7A;&#x767D;&#x9875;</strong>&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x8FD8;&#x62A5;&#x9519;&#xFF08;&#x8D44;&#x6E90;&#x627E;&#x4E0D;&#x5230;&#xFF09;&#xFF0C;&#x4EBA;&#x751F;&#x5931;&#x53BB;&#x4E86;&#x5E0C;&#x671B;...</p><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;<strong><code>webpack</code>&#x751F;&#x4EA7;&#x914D;&#x7F6E;&#x6587;&#x4EF6;<code>output.publicPath</code>&#x914D;&#x7F6E;&#x6709;&#x95EE;&#x9898;</strong>&#xFF0C;&#x8DDF;&#x8E2A;&#x6587;&#x4EF6;<code>build/webpack.base.conf.js</code>-&gt;<code>build/webpack.prod.conf.js</code>&#x3002;</p><p>&#x5F88;&#x597D;&#xFF0C;&#x6211;&#x4EEC;&#x5728;<code>build/webpack.base.conf.js</code>&#x4E2D;&#x5C31;&#x53D1;&#x73B0;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  output: {
    path: config.build.assetsRoot,
    filename: &apos;[name].js&apos;,
    publicPath: process.env.NODE_ENV === &apos;production&apos;
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>  output: {
    path: <span class="hljs-built_in">config</span>.build.assetsRoot,
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
    publicPath: <span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
      ? <span class="hljs-built_in">config</span>.build.assetsPublicPath
      : <span class="hljs-built_in">config</span>.dev.assetsPublicPath
  },</code></pre><p>&#x8DDF;&#x8E2A;<code>config.build.assetsPublicPath</code>&#x627E;&#x5230;<code>config/index.js</code>&#xFF0C;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  build: {
    // Template for index.html
    index: path.resolve(__dirname, &apos;../dist/index.html&apos;),

    // Paths
    assetsRoot: path.resolve(__dirname, &apos;../dist&apos;),
    assetsSubDirectory: &apos;static&apos;,
    assetsPublicPath: &apos;/&apos;, //&#x5C06;assetsPublicPath&#x7684;&#x503C;&#x4FEE;&#x6539;&#x4E3A;&apos;./&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">build</span>: {
    <span class="hljs-comment">// Template for index.html</span>
    <span class="hljs-attribute">index</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.html&apos;</span>),

    <span class="hljs-comment">// Paths</span>
    <span class="hljs-attribute">assetsRoot</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    <span class="hljs-attribute">assetsSubDirectory</span>: <span class="hljs-string">&apos;static&apos;</span>,
    <span class="hljs-attribute">assetsPublicPath</span>: <span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-comment">//&#x5C06;assetsPublicPath&#x7684;&#x503C;&#x4FEE;&#x6539;&#x4E3A;&apos;./&apos;</span></code></pre><p><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x6837;&#x4FEE;&#x6539;&#x5462;&#xFF1F;</strong></p><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x5F15;&#x7528;&#x6240;&#x5728;&#x5730;&#x5740;&#x7684;&#x7EC4;&#x6210;&#x89C4;&#x5219;&#x4E3A;<code>output.publicPath + filename</code>&#x3002;</p><hr><p>&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x6837;<strong>&#x5E76;&#x6CA1;&#x6709;&#x7ED3;&#x675F;</strong>&#x3002;</p><p>&#x5982;&#x679C;&#x5728;&#x6837;&#x5F0F;&#x4E2D;&#x5F15;&#x5165;&#x56FE;&#x7247;&#xFF0C;&#x4F1A;&#x62A5;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&#x9519;&#x8BEF;&#xFF0C;&#x5F15;&#x7528;&#x5730;&#x5740;<code>static/css/static/css/img/XXX.png</code>&#xFF1B;</p><p>&#x9700;&#x8981;&#x4FEE;&#x6539;<code>build/utils.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: &apos;vue-style-loader&apos;,
        publicPath: &apos;../../&apos;
      })
    } else {
      return [&apos;vue-style-loader&apos;].concat(loaders)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>   <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        use: loaders,
        fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
        publicPath: <span class="hljs-string">&apos;../../&apos;</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;vue-style-loader&apos;</span>].concat(loaders)
    }</code></pre><p><code>webpack</code>&#x6253;&#x5305;&#x8981;&#x533A;&#x5206;&#x4E24;&#x4E2A;&#x8DEF;&#x5F84;&#xFF1A;</p><ol><li>&#x6253;&#x5305;&#x8DEF;&#x5F84;&#xFF08;&#x6587;&#x4EF6;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;&#xFF1A;output.path + [filename | name]&#xFF09;</li><li>&#x5F15;&#x7528;&#x8DEF;&#x5F84;&#xFF08;&#x6587;&#x4EF6;&#x4E92;&#x76F8;&#x5F15;&#x7528;&#x7684;&#x4F4D;&#x7F6E;&#xFF1A;output.publicname + [filename | name]&#xFF09;</li></ol><h2 id="articleHeader5">ES6+</h2><p>&#x76EE;&#x524D;&#x8FD8;&#x4E0D;&#x80FD;&#x7ED3;&#x675F;...</p><p>&#x76EE;&#x524D;<code>ES6</code>&#x7684;&#x8BED;&#x6CD5;&#x6210;&#x4E3A;&#x4E86;&#x4E3B;&#x6D41;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;<code>ES6</code>&#xFF0C;&#x5728;&#x4E00;&#x4E9B;&#x8F83;&#x65E7;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x5475;&#x5475;...</p><p>&#x50CF;<code>Object.assign</code>&#x3001;<code>Array.from</code>...&#x65B9;&#x6CD5;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#xFF0C;&#x7A0B;&#x5E8F;&#x62A5;&#x9519;&#x3002;</p><p><strong>&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;</strong></p><p><code>npm i -S babel-polyfill</code>&#x5B89;&#x88C5;<code>polyfill</code>&#xFF0C;&#x5B83;&#x4F1A;&#x4E3A;ES2015+&#x6DFB;&#x52A0;&#x7684;&#x65B0;&#x7684;API&#x4F5C;<strong>&#x517C;&#x5BB9;</strong>&#x4E3A;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x7528;&#xFF0C;&#x4FD7;&#x79F0;&#x201C;&#x57AB;&#x7247;&#x201D;&#x3002;</p><p>&#x9700;&#x8981;&#x5C06;<code>polyfill</code>&#x6253;&#x5305;&#x5230;&#x751F;&#x4EA7;&#x5305;&#x4E2D;&#xFF0C;&#x5373;<code>build/webpack.base.conf.js</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  context: path.resolve(__dirname, &apos;../&apos;),
  entry: {
    app: &apos;./src/main.js&apos; //&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E3A;app: [&apos;babel-polyfill&apos;,&apos;./src/main.js&apos;]
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>module.exports = {
  contex<span class="hljs-variable">t:</span> path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&apos;../&apos;</span>),
  entry: {
    app: <span class="hljs-string">&apos;./src/main.js&apos;</span> //&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E3A;app: [<span class="hljs-string">&apos;babel-polyfill&apos;</span>,<span class="hljs-string">&apos;./src/main.js&apos;</span>]
  },</code></pre><h2 id="articleHeader6">&#x7AE0;&#x8282;&#x56DE;&#x987E;</h2><ul><li>&#x8FD8;&#x8BB0;&#x5F97;&#x5982;&#x4F55;&#x9884;&#x5904;&#x7406;scss&#x4E48;&#xFF0C;&#x90A3;&#x5982;&#x679C;&#x4F7F;&#x7528;Less&#x5462;&#xFF1F;</li><li>&#x8FD8;&#x8BB0;&#x5F97;&#x5982;&#x4F55;&#x5C40;&#x57DF;&#x7F51;&#x8BBF;&#x95EE;&#x4E48;&#xFF0C;&#x90A3;&#x5982;&#x679C;&#x60F3;&#x4FEE;&#x6539;&#x7AEF;&#x53E3;&#x5462;&#xFF1F;</li><li>&#x8FD8;&#x8BB0;&#x5F97;&#x5982;&#x4F55;&#x6253;&#x5305;&#x90E8;&#x7F72;&#x4E48;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF1F;</li><li>&#x8FD8;&#x8BB0;&#x5F97;&#x5982;&#x4F55;&#x8003;&#x8651;&#x65E7;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x4E48;&#xFF1F;</li></ul><h2 id="articleHeader7">&#x601D;&#x8003;</h2><ul><li>&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x600E;&#x4E48;&#x642D;&#x5EFA;&#x5462;&#xFF1F;</li><li>&#x9875;&#x9762;&#x7ED3;&#x6784;&#x600E;&#x4E48;&#x5E03;&#x5C40;&#x5462;&#xFF1F;</li><li>&#x54EA;&#x4E9B;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x5462;&#xFF1F;</li><li>&#x54EA;&#x4E9B;&#x5DE5;&#x5177;&#x5355;&#x5143;&#x53EF;&#x4EE5;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x5462;&#xFF1F;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Vue简易项目（2）定制开发环境

## 原文链接
[https://segmentfault.com/a/1190000015808846](https://segmentfault.com/a/1190000015808846)

