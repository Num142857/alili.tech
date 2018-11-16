---
title: webpack 4 ：从0配置到项目搭建
hidden: true
categories: [reprint]
slug: a7580a50
date: 2018-10-28 02:30:09
---

{{< raw >}}
<blockquote>&#x672C;&#x6587;&#x9996;&#x53D1;<a href="https://phoebecodespace.github.io/2018/07/04/webpack-4-tutorial/" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x535A;&#x5BA2;</a><br>&#x672C;&#x6587;&#x6D89;&#x53CA;&#x5230;<a href="https://github.com/phoebeCodeSpace/webpack4-learning" rel="nofollow noreferrer" target="_blank">&#x76F8;&#x5173;&#x4EE3;&#x7801;</a></blockquote><p>webpack4&#x53D1;&#x5E03;&#x4EE5;&#x6765;&#xFF0C;&#x6211;&#x5199;&#x9879;&#x76EE;&#x90FD;&#x662F;&#x7528;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x5373;&#x4F7F;&#x518D;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x771F;&#x7684;&#x662F;really shame&#x3002;&#x3002;&#x867D;&#x7136;&#x9053;&#x542C;&#x9014;&#x8BF4;&#x4E86;&#x5F88;&#x591A; webpack4 &#x7684;&#x7279;&#x6027;&#xFF0C;&#x5374;&#x6CA1;&#x6709;&#x5C1D;&#x8BD5;&#x8FC7;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7ED9;&#x4EBA;&#x7684;&#x611F;&#x89C9;&#x5C31;&#x662F;&#xFF0C;em...&#x5F88;&#x96BE;&#x3002;&#x4F46;&#x662F;&#x4ECA;&#x5929;&#x6211;&#x4ECE;&#x6700;&#x7B80;&#x5355;&#x7684;&#x90E8;&#x5206;&#x5F00;&#x59CB;&#xFF0C;&#x4E00;&#x70B9;&#x70B9;&#x642D;&#x5EFA;&#x8D77;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x3002;</p><h2 id="articleHeader0">0&#x914D;&#x7F6E;&#xFF0C;&#x914D;&#x7F6E;&#x4E86;&#x4EC0;&#x4E48;</h2><p>&#x8BA9;&#x6211;&#x4EEC;&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x5728;&#x7EC8;&#x7AEF;&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x8BED;&#x53E5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir webpack-4-quickstart &amp;&amp; cd webpack-4-quickstart
npm init -y
npm i webpack --save-dev
npm i webpack-cli --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">mkdir webpack-4-quickstart &amp;&amp; <span class="hljs-built_in">cd</span> webpack-4-quickstart
npm init -y
npm i webpack --save-dev
npm i webpack-cli --save-dev</code></pre><p>&#x4FEE;&#x6539;&#x4EE3;&#x7801; <code>package.json</code> &#x4E2D; <code>scripts</code> &#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;build&quot;: &quot;webpack&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>
}</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x7684; <code>package.json</code> &#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack-4-quickstart&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
     &quot;build&quot;: &quot;webpack&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^4.14.0&quot;,
    &quot;webpack-cli&quot;: &quot;^3.0.8&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;webpack-4-quickstart&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
     <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>
  },
  <span class="hljs-attr">&quot;keywords&quot;</span>: [],
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>,
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.14.0&quot;</span>,
    <span class="hljs-attr">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.0.8&quot;</span>
  }
}</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x6267;&#x884C; <code>npm run build</code>&#xFF0C; &#x4F1A;&#x7ED9;&#x51FA;&#x4EE5;&#x4E0B;&#x63D0;&#x793A;/&#x9519;&#x8BEF;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015490724?w=2170&amp;h=186" src="https://static.alili.tech/img/remote/1460000015490724?w=2170&amp;h=186" alt="webpack4-error" title="webpack4-error" style="cursor:pointer;display:inline"></span></p><ol><li>error: &#x6CA1;&#x6709;&#x5165;&#x53E3;&#x6587;&#x4EF6;</li><li>warning: &#x5EFA;&#x8BAE;&#x8BBE;&#x7F6E; <code>mode</code> &#x9009;&#x9879;</li></ol><h3 id="articleHeader1">entry &amp; output</h3><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x65B0;&#x5EFA; <code>src/index.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`I&apos;m a entry point`);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">`I&apos;m a entry point`</span>);</code></pre><p>&#x6B64;&#x65F6;&#x518D;&#x6B21;&#x6267;&#x884C; <code>npm run build</code>&#xFF0C;&#x6210;&#x529F;&#x6253;&#x5305;&#x51FA;&#x4E86; <code>dist/main.js</code>,&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x77E5;&#xFF1A;</p><blockquote>webpack4 more&#x914D;&#x7F6E;&#x4E86; entry&#xFF08;&#x5165;&#x53E3;&#xFF09; <code>src/index.js</code> &#x548C;output&#xFF08;&#x51FA;&#x53E3;&#xFF09; <code>dist/main.js</code></blockquote><p>&#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8986;&#x76D6;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#xFF08;&#x6BD4;&#x5982;&#x4FEE;&#x6539;&#x4E3A; <code>./foo/src/js/index.js</code>&#xFF09;&#xFF0C;&#x53EF;&#x4EE5;&#x5728; <code>package.json</code> &#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack --mode development ./foo/src/js/index.js --output ./foo/main.js&quot;,
  &quot;build&quot;: &quot;webpack --mode production ./foo/src/js/index.js --output ./foo/main.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack --mode development ./foo/src/js/index.js --output ./foo/main.js&quot;</span>,
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production ./foo/src/js/index.js --output ./foo/main.js&quot;</span>
}</code></pre><h3 id="articleHeader2">production &amp; development</h3><p>webpack4 &#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x8D77;&#x7801;&#x4F1A;&#x8BBE;&#x7F6E;&#x4E24;&#x79CD;&#x7C7B;&#x578B;&#x6587;&#x4EF6;&#xFF1A;</p><ul><li>&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;webpack.dev.conf.js&#xFF0C;&#x5B9A;&#x4E49; webpack &#x542F;&#x52A8;&#x7684;&#x670D;&#x52A1;&#x5668;&#x7B49;</li><li>&#x7528;&#x4E8E;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;webpack.prod.conf.js&#xFF0C;&#x5B9A;&#x4E49;UglifyJSPlugin&#x6216;&#x5176;&#x4ED6;&#x914D;&#x7F6E;&#x7B49;</li></ul><p>&#x800C; webpack4 &#x7684; <code>mode</code> &#x7ED9;&#x51FA;&#x4E86;&#x4E24;&#x79CD;&#x914D;&#x7F6E;&#xFF1A;<code>development</code> &#x548C; <code>production</code>&#x3002;</p><p>&#x6211;&#x4EEC;&#x4FEE;&#x6539; <code>package.json</code> &#x4E2D; <code>scripts</code> &#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack --mode development&quot;,
  &quot;build&quot;: &quot;webpack --mode production&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack --mode development&quot;</span>,
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production&quot;</span>
}</code></pre><p>&#x6211;&#x4EEC;&#x5206;&#x522B;&#x6267;&#x884C; <code>npm run dev</code> &#x548C; <code>npm run build</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015490725" src="https://static.alili.tech/img/remote/1460000015490725" alt="webpack4-mode" title="webpack4-mode" style="cursor:pointer;display:inline"></span></p><p>&#x6267;&#x884C; <code>npm run dev</code> &#x6253;&#x5305;&#x7684;&#x662F;&#x672A;&#x538B;&#x7F29;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x800C; <code>npm run build</code> &#x662F;&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><blockquote><ul><li>&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x4E0B;&#xFF1A;&#x542F;&#x7528;&#x4E86; &#x4EE3;&#x7801;&#x538B;&#x7F29;&#x3001;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;&#xFF08;scope hoisting&#xFF09;&#x3001; tree-shaking&#xFF0C;&#x4F7F;&#x4EE3;&#x7801;&#x6700;&#x7CBE;&#x7B80;</li><li>&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;&#xFF1A;&#x76F8;&#x8F83;&#x4E8E;&#x66F4;&#x5C0F;&#x4F53;&#x79EF;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x63D0;&#x4F9B;&#x7684;&#x662F;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x4E0A;&#x7684;&#x4F18;&#x5316;</li></ul></blockquote><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3><p>webpack 4 &#x7684;&#x96F6;&#x914D;&#x7F6E;&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x4E8E;&#xFF1A;</p><ul><li><code>entry</code> &#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x4E3A; <code>./src/index.js</code></li><li><code>output</code> &#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x4E3A; <code>./dist/main.js</code></li><li><code>production</code> &#x548C; <code>development</code> &#x4E24;&#x79CD;&#x6A21;&#x5F0F;</li></ul><h2 id="articleHeader4">&#x9879;&#x76EE;&#x642D;&#x5EFA;</h2><p>&#x9879;&#x76EE;&#x642D;&#x5EFA;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;webpack&#x7684;&#x8BC9;&#x6C42;&#x662F;&#xFF1A;</p><ul><li>js&#x7684;&#x5904;&#x7406;&#xFF1A;&#x8F6C;&#x6362; ES6 &#x4EE3;&#x7801;&#xFF0C;&#x89E3;&#x51B3;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x95EE;&#x9898;</li><li>css&#x7684;&#x5904;&#x7406;&#xFF1A;&#x7F16;&#x8BD1;css&#xFF0C;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x524D;&#x7F00;&#xFF0C;&#x62BD;&#x53D6;css&#x5230;&#x72EC;&#x7ACB;&#x6587;&#x4EF6;</li><li>html&#x7684;&#x5904;&#x7406;&#xFF1A;&#x590D;&#x5236;&#x5E76;&#x538B;&#x7F29;html&#x6587;&#x4EF6;</li><li>dist&#x7684;&#x6E05;&#x7406;&#xFF1A;&#x6253;&#x5305;&#x524D;&#x6E05;&#x7406;&#x6E90;&#x76EE;&#x5F55;&#x6587;&#x4EF6;</li><li>assets&#x7684;&#x5904;&#x7406;&#xFF1A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5904;&#x7406;</li><li>server&#x7684;&#x542F;&#x7528;&#xFF1A;development &#x6A21;&#x5F0F;&#x4E0B;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x5668;&#x5E76;&#x5B9E;&#x65F6;&#x5237;&#x65B0;</li></ul><h3 id="articleHeader5">&#x8F6C;&#x6362; ES6 &#x4EE3;&#x7801;&#xFF0C;&#x89E3;&#x51B3;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x95EE;&#x9898;</h3><h4>&#x7528; babel &#x8F6C;&#x6362; ES6 &#x4EE3;&#x7801;</h4><p>&#x7528; babel &#x8F6C;&#x6362; ES6 &#x4EE3;&#x7801;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5230; <strong>babel-loader</strong> &#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i babel-core babel-loader babel-preset-env --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm i babel-core babel-loader babel-preset-env --save-dev</code></pre><p>&#x7136;&#x540E;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;babel&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>.babelrc</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
        &quot;presets&quot;: [
            &quot;env&quot;
        ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">    {
        <span class="hljs-attr">&quot;presets&quot;</span>: [
            <span class="hljs-string">&quot;env&quot;</span>
        ]
    }</code></pre><p>&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x5C06;&#x914D;&#x7F6E;&#x7528;&#x4E8E;webpack&#x6253;&#x5305;&#x4E2D;&#xFF1F;</p><ul><li>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; webpack &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>&#x5728; npm scripts &#x4E2D;&#x4F7F;&#x7528; <code>--module-bind</code></li></ul><ol><li><p>&#x4F7F;&#x7528; webpack &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><p>&#x65B0;&#x5EFA; <code>webpack.config.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: &quot;babel-loader&quot;
            }
          }
        ]
      }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-built_in">module</span>.exports = {
      <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
          {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">use</span>: {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
            }
          }
        ]
      }
    }</code></pre></li><li>&#x5728; npm scripts &#x4E2D;&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;scripts&quot;: {
      &quot;dev&quot;: &quot;webpack --mode development --module-bind js=babel-loader&quot;,
      &quot;build&quot;: &quot;webpack --mode production --module-bind js=babel-loader&quot;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">    <span class="hljs-string">&quot;scripts&quot;</span>: {
      <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack --mode development --module-bind js=babel-loader&quot;</span>,
      <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production --module-bind js=babel-loader&quot;</span>
    }</code></pre><h4>&#x4F7F;&#x7528; babel-polyfill &#x89E3;&#x51B3;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</h4><p>&#x7136;&#x800C;&#x6D4F;&#x89C8;&#x5668;&#x4F9D;&#x7136;&#x4E0D;&#x652F;&#x6301;&#x4E00;&#x4E9B;&#x8BED;&#x6CD5;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x5BFC;&#x81F4;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x7528; <code>babel-polyfill</code> &#x89E3;&#x51B3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i babel-polyfill babel-plugin-transform-runtime  --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm i babel-polyfill babel-plugin-transform-runtime  --save-dev</code></pre><p><code>.babelrc</code> &#x6DFB;&#x52A0;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [
        &quot;env&quot;
    ],
    &quot;plugins&quot;: [
       &quot;transform-runtime&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;presets&quot;</span>: [
        <span class="hljs-string">&quot;env&quot;</span>
    ],
    <span class="hljs-attr">&quot;plugins&quot;</span>: [
       <span class="hljs-string">&quot;transform-runtime&quot;</span>
    ]
}</code></pre><p>&#x6700;&#x540E;&#x5728; <code>webpack.config.js</code> &#x4E2D;&#x5C06; <code>babel-polyfill</code> &#x52A0;&#x5230;&#x4F60;&#x7684; entry &#x6570;&#x7EC4;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
module.exports = {
    entry: [
        &quot;babel-polyfill&quot;,
        path.join(__dirname, &apos;./src/index.js&apos;)
    ],
    // ...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: [
        <span class="hljs-string">&quot;babel-polyfill&quot;</span>,
        path.join(__dirname, <span class="hljs-string">&apos;./src/index.js&apos;</span>)
    ],
    <span class="hljs-comment">// ...</span>
};</code></pre><h3 id="articleHeader6">&#x7F16;&#x8BD1;css&#xFF0C;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x524D;&#x7F00;&#xFF0C;&#x62BD;&#x53D6;css&#x5230;&#x72EC;&#x7ACB;&#x6587;&#x4EF6;</h3><ul><li><a href="https://webpack.js.org/loaders/postcss-loader/" rel="nofollow noreferrer" target="_blank">postcss-loader</a></li><li><a href="https://github.com/webpack-contrib/mini-css-extract-plugin" rel="nofollow noreferrer" target="_blank">mini-css-extract-plugin</a></li></ul><p>webpack &#x5E76;&#x4E0D;&#x4F1A;&#x4E3B;&#x52A8;&#x5C06;&#x4F60;&#x7684;css&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8FC7;&#x53BB;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>extract-text-webpack-plugin</code>&#xFF0C;&#x5728;webpack4&#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<a href="https://github.com/webpack-contrib/mini-css-extract-plugin" rel="nofollow noreferrer" target="_blank">mini-css-extract-plugin</a>&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><p>postcss-loader &#x7528;&#x4E8E;&#x6DFB;&#x52A0;&#x6D4F;&#x89C8;&#x5668;&#x524D;&#x7F00;&#xFF0C;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x6211;&#x559C;&#x6B22;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA; <code>postcss.config.js</code> &#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i mini-css-extract-plugin css-loader --save-dev
    npm i style-loader postcss-loader  --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">    npm i mini-css-extract-plugin css-loader --save-dev
    npm i style-loader postcss-loader  --save-dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // webpack.config.js
    const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
    module.exports = (env, argv) =&gt; {
      const devMode = argv.mode !== &apos;production&apos;
      return {
        module: {
          rules: [
            // ...,
            {
                test: /\.css$/,
                use: [
                    devMode ? &apos;style-loader&apos; : MiniCssExtractPlugin.loader,
                    &apos;css-loader&apos;,
                    &apos;postcss-loader&apos;
                ]
            },
            ]
          },
          plugins: [
            // ...,
            new MiniCssExtractPlugin({
              filename: &quot;[name].css&quot;,
              chunkFilename: &quot;[id].css&quot;
            })
          ]
      }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// webpack.config.js</span>
    <span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;mini-css-extract-plugin&quot;</span>);
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">env, argv</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> devMode = argv.mode !== <span class="hljs-string">&apos;production&apos;</span>
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">module</span>: {
          <span class="hljs-attr">rules</span>: [
            <span class="hljs-comment">// ...,</span>
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">use</span>: [
                    devMode ? <span class="hljs-string">&apos;style-loader&apos;</span> : MiniCssExtractPlugin.loader,
                    <span class="hljs-string">&apos;css-loader&apos;</span>,
                    <span class="hljs-string">&apos;postcss-loader&apos;</span>
                ]
            },
            ]
          },
          <span class="hljs-attr">plugins</span>: [
            <span class="hljs-comment">// ...,</span>
            <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
              <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;[name].css&quot;</span>,
              <span class="hljs-attr">chunkFilename</span>: <span class="hljs-string">&quot;[id].css&quot;</span>
            })
          ]
      }
    }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// postcss.config.js
    module.exports = {
        plugins: {
            autoprefixer: {}
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// postcss.config.js</span>
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">plugins</span>: {
            <span class="hljs-attr">autoprefixer</span>: {}
        }
    }</code></pre><h3 id="articleHeader7">&#x590D;&#x5236;&#x5E76;&#x538B;&#x7F29;html&#x6587;&#x4EF6; <a href="https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i html-webpack-plugin html-loader --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm i html-webpack-plugin html-loader --save-dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // webpack.config.js
    const HtmlWebPackPlugin = require(&quot;html-webpack-plugin&quot;);
    module.exports = {
        module: {
            rules: [
                // ...,
                {
                    test: /\.html$/,
                    use: [{
                        loader: &quot;html-loader&quot;,
                        options: {
                            minimize: true
                        }
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: &quot;./src/index.html&quot;,
                filename: &quot;./index.html&quot;
            })
        ]
    };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// webpack.config.js</span>
    <span class="hljs-keyword">const</span> HtmlWebPackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;html-webpack-plugin&quot;</span>);
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">module</span>: {
            <span class="hljs-attr">rules</span>: [
                <span class="hljs-comment">// ...,</span>
                {
                    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
                    <span class="hljs-attr">use</span>: [{
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;html-loader&quot;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">minimize</span>: <span class="hljs-literal">true</span>
                        }
                    }]
                }
            ]
        },
        <span class="hljs-attr">plugins</span>: [
            <span class="hljs-keyword">new</span> HtmlWebPackPlugin({
                <span class="hljs-attr">template</span>: <span class="hljs-string">&quot;./src/index.html&quot;</span>,
                <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;./index.html&quot;</span>
            })
        ]
    };</code></pre><h3 id="articleHeader8">&#x6253;&#x5305;&#x524D;&#x6E05;&#x7406;&#x6E90;&#x76EE;&#x5F55;&#x6587;&#x4EF6; <a href="https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder" rel="nofollow noreferrer" target="_blank">clean-webpack-plugin</a></h3><p>&#x6BCF;&#x6B21;&#x6253;&#x5305;&#xFF0C;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x9879;&#x76EE;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x968F;&#x7740;&#x67D0;&#x4E9B;&#x6587;&#x4EF6;&#x7684;&#x589E;&#x5220;&#xFF0C;&#x6211;&#x4EEC;&#x7684; dist &#x76EE;&#x5F55;&#x4E0B;&#x53EF;&#x80FD;&#x4EA7;&#x751F;&#x4E00;&#x4E9B;&#x4E0D;&#x518D;&#x4F7F;&#x7528;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;webpack&#x5E76;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x5224;&#x65AD;&#x54EA;&#x4E9B;&#x662F;&#x9700;&#x8981;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x4E3A;&#x4E86;&#x4E0D;&#x8BA9;&#x8FD9;&#x4E9B;&#x65E7;&#x6587;&#x4EF6;&#x4E5F;&#x90E8;&#x7F72;&#x5230;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0A;&#x5360;&#x7528;&#x7A7A;&#x95F4;&#xFF0C;&#x6240;&#x4EE5;&#x5728; webpack &#x6253;&#x5305;&#x524D;&#x6700;&#x597D;&#x80FD;&#x6E05;&#x7406; dist &#x76EE;&#x5F55;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install clean-webpack-plugin --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm install clean-webpack-plugin --save-dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const CleanWebpackPlugin = require(&apos;clean-webpack-plugin&apos;);
  module.exports = {
    plugins: [
      new CleanWebpackPlugin([&apos;dist&apos;]),
    ]
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;clean-webpack-plugin&apos;</span>);
  <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">&apos;dist&apos;</span>]),
    ]
  };</code></pre><h3 id="articleHeader9">&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5904;&#x7406; <a href="https://webpack.js.org/loaders/file-loader/" rel="nofollow noreferrer" target="_blank">file-loader</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install file-loader --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm install file-loader --save-dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // webpack.config.js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: &apos;file-loader&apos;,
                options: {}
              }
            ]
          }
        ]
      }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// webpack.config.js</span>
    <span class="hljs-built_in">module</span>.exports = {
      <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
          {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
            <span class="hljs-attr">use</span>: [
              {
                <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;file-loader&apos;</span>,
                <span class="hljs-attr">options</span>: {}
              }
            ]
          }
        ]
      }
    }</code></pre><h3 id="articleHeader10">development &#x6A21;&#x5F0F;&#x4E0B;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x5668;&#x5E76;&#x5B9E;&#x65F6;&#x5237;&#x65B0; <a href="https://webpack.js.org/configuration/dev-server" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i webpack-dev-server --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">    npm i webpack-dev-server --save-dev</code></pre><p><code>package.json</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;scripts&quot;: {
      &quot;start&quot;: &quot;webpack-dev-server --mode development --open&quot;,
      &quot;build&quot;: &quot;webpack --mode production&quot;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">    <span class="hljs-string">&quot;scripts&quot;</span>: {
      <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --mode development --open&quot;</span>,
      <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production&quot;</span>
    }</code></pre><h2 id="articleHeader11">&#x4F7F;&#x7528; webpack 4 &#x5EFA;&#x7ACB; react &#x9879;&#x76EE;</h2><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6A21;&#x4EFF; <a href="https://github.com/facebook/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a> &#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x81EA;&#x5DF1;&#x642D;&#x5EFA;&#x4E00;&#x4E2A; react &#x9879;&#x76EE;&#xFF0C;&#x5E76;&#x4E14;&#x7528;less&#x9884;&#x7F16;&#x8BD1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x251C;&#x2500;&#x2500; public
  &#x2502;   &#x2514;&#x2500;&#x2500; index.html      # html &#x6A21;&#x677F;
  &#x251C;&#x2500;&#x2500; src
  &#x2502;   &#x251C;&#x2500;&#x2500; assets          # &#x9759;&#x6001;&#x8D44;&#x6E90;
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logo.png
  &#x2502;   &#x251C;&#x2500;&#x2500; components      # &#x7EC4;&#x4EF6;
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; App.js
  &#x2502;   &#x251C;&#x2500;&#x2500; index.js        # &#x5165;&#x53E3;&#x6587;&#x4EF6;
  &#x2502;   &#x2514;&#x2500;&#x2500; styles
  &#x2502;       &#x2514;&#x2500;&#x2500; index.less
  &#x251C;&#x2500;&#x2500; .babelrc
  &#x251C;&#x2500;&#x2500; package-lock.json
  &#x251C;&#x2500;&#x2500; package.json
  &#x251C;&#x2500;&#x2500; postcss.config.js
  &#x2514;&#x2500;&#x2500; webpack.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">  &#x251C;&#x2500;&#x2500; public
  &#x2502;   &#x2514;&#x2500;&#x2500; index.html      <span class="hljs-comment"># html &#x6A21;&#x677F;</span>
  &#x251C;&#x2500;&#x2500; src
  &#x2502;   &#x251C;&#x2500;&#x2500; assets          <span class="hljs-comment"># &#x9759;&#x6001;&#x8D44;&#x6E90;</span>
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logo.png
  &#x2502;   &#x251C;&#x2500;&#x2500; components      <span class="hljs-comment"># &#x7EC4;&#x4EF6;</span>
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; App.js
  &#x2502;   &#x251C;&#x2500;&#x2500; index.js        <span class="hljs-comment"># &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  &#x2502;   &#x2514;&#x2500;&#x2500; styles
  &#x2502;       &#x2514;&#x2500;&#x2500; index.less
  &#x251C;&#x2500;&#x2500; .babelrc
  &#x251C;&#x2500;&#x2500; package-lock.json
  &#x251C;&#x2500;&#x2500; package.json
  &#x251C;&#x2500;&#x2500; postcss.config.js
  &#x2514;&#x2500;&#x2500; webpack.config.js</code></pre><p>&#x5728;&#x4EE5;&#x4E0A;&#x7684;&#x57FA;&#x7840;&#xFF08;&#x9879;&#x76EE;&#x642D;&#x5EFA;&#x90E8;&#x5206;&#xFF09;&#xFF0C;&#x518D;&#x5B89;&#x88C5;react&#x76F8;&#x5173;&#x6A21;&#x5757;&#x53CA;less&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i react react-dom --save
    npm i babel-preset-react --save-dev
    npm i less less-loader --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">    npm i react react-dom --save
    npm i babel-preset-react --save-dev
    npm i less less-loader --save-dev</code></pre><p>&#x4FEE;&#x6539; <code>.babelrc</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
      &quot;presets&quot;: [&quot;env&quot;, &quot;react&quot;]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">    {
      <span class="hljs-attr">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>, <span class="hljs-string">&quot;react&quot;</span>]
    }</code></pre><p>&#x4FEE;&#x6539; <code>webpack.config.js</code> &#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // webpack.config.js
    const path = require(&apos;path&apos;);
    module.exports = (env, argv) =&gt; {
        const devMode = argv.mode !== &apos;production&apos;
        return {
            entry: [
                &quot;babel-polyfill&quot;,
                path.join(__dirname, &apos;./src/index.js&apos;)
            ],
            devServer: {
                port: 3000, //&#x7AEF;&#x53E3;&#x53F7;
            },
            module: {
                rules: [
                    // ...
                    // &#x5904;&#x7406;react
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: &quot;babel-loader&quot;
                        }
                    },
                    // &#x5904;&#x7406;less
                    {
                        test: /\.less$/,
                        use: [
                            devMode ? &apos;style-loader&apos; : MiniCssExtractPlugin.loader,
                            &apos;css-loader&apos;,
                            &apos;postcss-loader&apos;,
                            &apos;less-loader&apos;,
                        ]
                    }
                ]
            }
        }
    };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// webpack.config.js</span>
    <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">env, argv</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> devMode = argv.mode !== <span class="hljs-string">&apos;production&apos;</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">entry</span>: [
                <span class="hljs-string">&quot;babel-polyfill&quot;</span>,
                path.join(__dirname, <span class="hljs-string">&apos;./src/index.js&apos;</span>)
            ],
            <span class="hljs-attr">devServer</span>: {
                <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>, <span class="hljs-comment">//&#x7AEF;&#x53E3;&#x53F7;</span>
            },
            <span class="hljs-attr">module</span>: {
                <span class="hljs-attr">rules</span>: [
                    <span class="hljs-comment">// ...</span>
                    <span class="hljs-comment">// &#x5904;&#x7406;react</span>
                    {
                        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                        <span class="hljs-attr">use</span>: {
                            <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span>
                        }
                    },
                    <span class="hljs-comment">// &#x5904;&#x7406;less</span>
                    {
                        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
                        <span class="hljs-attr">use</span>: [
                            devMode ? <span class="hljs-string">&apos;style-loader&apos;</span> : MiniCssExtractPlugin.loader,
                            <span class="hljs-string">&apos;css-loader&apos;</span>,
                            <span class="hljs-string">&apos;postcss-loader&apos;</span>,
                            <span class="hljs-string">&apos;less-loader&apos;</span>,
                        ]
                    }
                ]
            }
        }
    };</code></pre><p>&#x57FA;&#x672C;&#x4E0A;&#x642D;&#x5EFA;&#x5B8C;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x770B;<a href="https://github.com/phoebeCodeSpace/webpack4-learning/blob/master/webpack-react/webpack.config.js" rel="nofollow noreferrer" target="_blank">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</a></p><h2 id="articleHeader12">&#x4F7F;&#x7528; webpack 4 &#x5EFA;&#x7ACB; vue &#x9879;&#x76EE;</h2><p>&#x540C;&#x6837;&#x5730;&#xFF0C;&#x6211;&#x4EEC;&#x6A21;&#x4EFF; vue-cli &#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x81EA;&#x5DF1;&#x642D;&#x5EFA;&#x4E00;&#x4E2A; vue &#x9879;&#x76EE;&#xFF0C;&#x8FD9;&#x6B21;&#x6211;&#x4EEC;&#x7684;css&#x9884;&#x7F16;&#x8BD1;&#x8BED;&#x8A00;&#x7528; <code>scss</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x251C;&#x2500;&#x2500; public
  &#x2502;   &#x2514;&#x2500;&#x2500; index.html      # html &#x6A21;&#x677F;
  &#x251C;&#x2500;&#x2500; src
  &#x2502;   &#x251C;&#x2500;&#x2500; assets          # &#x9759;&#x6001;&#x8D44;&#x6E90;
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logo.png
  &#x2502;   &#x251C;&#x2500;&#x2500; components      # &#x7EC4;&#x4EF6;
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; App.vue
  &#x2502;   &#x251C;&#x2500;&#x2500; main.js        # &#x5165;&#x53E3;&#x6587;&#x4EF6;
  &#x2502;   &#x251C;&#x2500;&#x2500; main.js        # &#x5165;&#x53E3;&#x6587;&#x4EF6;
  &#x2502;   &#x2514;&#x2500;&#x2500; styles
  &#x2502;       &#x2514;&#x2500;&#x2500; index.scss
  &#x251C;&#x2500;&#x2500; .babelrc
  &#x251C;&#x2500;&#x2500; package-lock.json
  &#x251C;&#x2500;&#x2500; package.json
  &#x251C;&#x2500;&#x2500; postcss.config.js
  &#x2514;&#x2500;&#x2500; webpack.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">  &#x251C;&#x2500;&#x2500; public
  &#x2502;   &#x2514;&#x2500;&#x2500; index.html      <span class="hljs-comment"># html &#x6A21;&#x677F;</span>
  &#x251C;&#x2500;&#x2500; src
  &#x2502;   &#x251C;&#x2500;&#x2500; assets          <span class="hljs-comment"># &#x9759;&#x6001;&#x8D44;&#x6E90;</span>
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; logo.png
  &#x2502;   &#x251C;&#x2500;&#x2500; components      <span class="hljs-comment"># &#x7EC4;&#x4EF6;</span>
  &#x2502;   &#x2502;   &#x2514;&#x2500;&#x2500; App.vue
  &#x2502;   &#x251C;&#x2500;&#x2500; main.js        <span class="hljs-comment"># &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  &#x2502;   &#x251C;&#x2500;&#x2500; main.js        <span class="hljs-comment"># &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  &#x2502;   &#x2514;&#x2500;&#x2500; styles
  &#x2502;       &#x2514;&#x2500;&#x2500; index.scss
  &#x251C;&#x2500;&#x2500; .babelrc
  &#x251C;&#x2500;&#x2500; package-lock.json
  &#x251C;&#x2500;&#x2500; package.json
  &#x251C;&#x2500;&#x2500; postcss.config.js
  &#x2514;&#x2500;&#x2500; webpack.config.js</code></pre><p>&#x5728;&#x4EE5;&#x4E0A;&#x7684;&#x57FA;&#x7840;&#xFF08;&#x9879;&#x76EE;&#x642D;&#x5EFA;&#x90E8;&#x5206;&#xFF09;&#xFF0C;&#x518D;&#x5B89;&#x88C5;vue&#x76F8;&#x5173;&#x6A21;&#x5757;&#x53CA;sass&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm i vue --save
    npm i vue-loader vue-template-compiler --save-dev
    npm i node-sass sass-loader --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">    npm i vue --save
    npm i vue-loader vue-template-compiler --save-dev
    npm i node-sass sass-loader --save-dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // webpack.config.js
    const path = require(&apos;path&apos;);
    const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;)

    module.exports = (env, argv) =&gt; {
        const devMode = argv.mode !== &apos;production&apos;
        return {
            entry: [
                &quot;babel-polyfill&quot;,
                path.join(__dirname, &apos;./src/main.js&apos;)
            ],
            module: {
                rules: [
                    // ...
                    // &#x89E3;&#x6790;vue
                    {
                        test: /\.vue$/,
                        loader: &apos;vue-loader&apos;,
                        options: {
                            loaders: {}
                        }
                    },
                    // &#x5904;&#x7406;scss
                    {
                        test: /\.scss$/,
                        use: [
                            devMode ? &apos;style-loader&apos; : MiniCssExtractPlugin.loader,
                            &apos;css-loader&apos;,
                            &apos;postcss-loader&apos;,
                            &apos;sass-loader&apos;,
                        ]
                    }
                ]
            },
            plugins: [
                // ...
                new VueLoaderPlugin()
            ]
        }
    };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// webpack.config.js</span>
    <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
    <span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>)

    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">env, argv</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> devMode = argv.mode !== <span class="hljs-string">&apos;production&apos;</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">entry</span>: [
                <span class="hljs-string">&quot;babel-polyfill&quot;</span>,
                path.join(__dirname, <span class="hljs-string">&apos;./src/main.js&apos;</span>)
            ],
            <span class="hljs-attr">module</span>: {
                <span class="hljs-attr">rules</span>: [
                    <span class="hljs-comment">// ...</span>
                    <span class="hljs-comment">// &#x89E3;&#x6790;vue</span>
                    {
                        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">loaders</span>: {}
                        }
                    },
                    <span class="hljs-comment">// &#x5904;&#x7406;scss</span>
                    {
                        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
                        <span class="hljs-attr">use</span>: [
                            devMode ? <span class="hljs-string">&apos;style-loader&apos;</span> : MiniCssExtractPlugin.loader,
                            <span class="hljs-string">&apos;css-loader&apos;</span>,
                            <span class="hljs-string">&apos;postcss-loader&apos;</span>,
                            <span class="hljs-string">&apos;sass-loader&apos;</span>,
                        ]
                    }
                ]
            },
            <span class="hljs-attr">plugins</span>: [
                <span class="hljs-comment">// ...</span>
                <span class="hljs-keyword">new</span> VueLoaderPlugin()
            ]
        }
    };</code></pre><p>&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684; vue-cli &#x4E5F;&#x642D;&#x5EFA;&#x5B8C;&#x6210;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x770B;<a href="https://github.com/phoebeCodeSpace/webpack4-learning/blob/master/webpack-vue/webpack.config.js" rel="nofollow noreferrer" target="_blank">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</a></p><h2 id="articleHeader13">&#x53C2;&#x8003;&#x8D44;&#x6E90;</h2><ul><li><a href="https://webpack.js.org/concepts/" rel="nofollow noreferrer" target="_blank">webpack documentation</a></li><li><a href="https://www.valentinog.com/blog/webpack-tutorial/" rel="nofollow noreferrer" target="_blank">Webpack 4 Tutorial: from 0 Conf to Production Mode</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 4 ：从0配置到项目搭建

## 原文链接
[https://segmentfault.com/a/1190000015490721](https://segmentfault.com/a/1190000015490721)

