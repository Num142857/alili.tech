---
title: 从零开始做Vue前端架构（1）
hidden: true
categories: [reprint]
slug: 15c8274b
date: 2018-10-28 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x60F3;&#x60F3;&#x4E5F;&#x5DF2;&#x7ECF;&#x505A;&#x8FC7;&#x4E0D;&#x5C11;&#x67B6;&#x6784;&#x7684;&#x9879;&#x76EE;&#x4E86;&#xFF0C;&#x6709;&#x57FA;&#x4E8E;vue&#xFF0C;&#x57FA;&#x4E8E;react&#xFF0C;&#x57FA;&#x4E8E;thinkPHP&#xFF0C;&#x57FA;&#x4E8E;laravel&#x7684;&#x3002;</p><p>&#x505A;&#x591A;&#x4E86;&#xFF0C;&#x4E5F;&#x5C31;&#x5BF9;&#x73B0;&#x6709;&#x7684;&#x67B6;&#x6784;&#x6709;&#x5404;&#x79CD;&#x60F3;&#x6CD5;&#xFF0C;&#x6709;&#x597D;&#x7684;&#xFF0C;&#x6709;&#x574F;&#x7684;&#xFF0C;&#x603B;&#x4E4B;&#xFF0C;&#x7528;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x4E0D;&#x723D;&#x3002;vue-cli&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x5F88;&#x5FEB;&#x5730;&#x6784;&#x5EFA;&#x5E76;&#x4F7F;&#x7528;&#xFF0C;&#x5C24;&#x5176;&#x662F;vue-cli v3.0&#xFF0C;&#x628A;webpack&#x90FD;&#x5C01;&#x8FDB;<code>@vue/cli</code>&#x7684;sdk&#x91CC;&#x4E86;&#xFF0C;&#x7528;&#x8D77;&#x6765;&#x66F4;&#x52A0;&#x5E72;&#x51C0;&#x3001;&#x7B80;&#x6D01;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x7231;&#x6298;&#x817E;&#x7684;&#x6211;&#x4EEC;&#xFF0C;&#x597D;&#x5427;&#xFF0C;&#x5F00;&#x4E2A;&#x73A9;&#x7B11;&#x3002;&#x91CD;&#x6765;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x9875;&#x9762;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x8FD8;&#x6709;&#x9879;&#x76EE;&#x7684;&#x67B6;&#x6784;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x505A;&#x591A;&#x591A;&#x5C11;&#x5C11;&#x7684;&#x4FEE;&#x6539;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x4ECB;&#x7ECD;&#x5B8C;&#x6BD5;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x5C31;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#xFF0C;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x5EFA;&#x8D77;&#x524D;&#x540E;&#x7AEF;&#x5B8C;&#x5168;&#x5206;&#x79BB;&#x7684;&#x524D;&#x7AEF;&#x67B6;&#x6784;&#x4E86;&#x3002;</p><h2 id="articleHeader1">&#x6B65;&#x9AA4;</h2><p>&#x7531;&#x4E8E;&#x8981;&#x4ECB;&#x7ECD;&#x7684;&#x5F88;&#x591A;&#xFF0C;&#x5168;&#x5199;&#x5728;&#x4E00;&#x7BC7;&#x91CC;&#xFF0C;&#x6709;&#x4E9B;&#x592A;&#x957F;&#x4E86;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4F1A;&#x5206;&#x4E3A;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>&#x914D;&#x7F6E;eslint&#x3001;babel&#x3001;postcss</li><li>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x3001;&#x76EE;&#x5F55;&#x67B6;&#x6784;</li><li>&#x901A;&#x8FC7;koa&#x5B9E;&#x73B0;&#x672C;&#x5730;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x6A21;&#x62DF;</li><li>&#x521B;&#x5EFA;&#x53D1;&#x5E03;&#x73AF;&#x5883;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>&#x521B;&#x5EFA;&#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#x4E0B;&#x7684;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3001;&#x4EE5;&#x53CA;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B; &#xFF08;TODO&#xFF09;</li><li>&#x81EA;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x6784;&#x5EFA;&#x9879;&#x76EE;&#xFF08;TODO&#xFF09;</li></ol><p>&#x8FD9;&#x4E03;&#x7BC7;&#x6765;&#x5206;&#x522B;&#x4ECB;&#x7ECD;&#x3002;</p><h2 id="articleHeader2">&#x5F00;&#x53D1;</h2><h3 id="articleHeader3">&#x4E00;&#x3001;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h3><ol><li>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;</li></ol><p>&#x6211;&#x4EEC;&#x5C31;&#x53EB;<code>vue-construct</code>&#x5427;</p><ol><li>&#x521D;&#x59CB;&#x5316;git</li></ol><p><code>git init</code></p><ol><li>&#x521D;&#x59CB;&#x5316;npm</li></ol><p><code>npm init</code></p><ol><li>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x6587;&#x4EF6;</li></ol><p>&#x4E3A;&#x4E86;&#x80FD;&#x8BA9;webpack&#x8DD1;&#x8D77;&#x6765;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E00;&#x53E3;&#x6C14;&#x53EA;&#x8BB2;&#x914D;&#x7F6E;&#x800C;&#x4E0D;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;&#x90A3;&#x6837;&#x672A;&#x514D;&#x6709;&#x4E9B;&#x7A7A;&#x6D1E;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x70B9;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x548C;&#x76EE;&#x5F55;&#x3002;<br>&#x5728;&#x8FD9;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5148;&#x5B89;&#x88C5;&#x4E24;&#x4E2A;&#x5305;&#xFF1A;vue&#x3001;vue-router&#xFF0C; <code>npm i -S vue vue-router</code>&#x3002;<br>&#x6211;&#x4EEC;&#x5C06;&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x76F8;&#x5173;&#x6587;&#x4EF6;&#x90FD;&#x653E;&#x5728;&#x540D;&#x4E3A;<code>app</code>&#x7684;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x3002;&#x6211;&#x5148;&#x90FD;&#x521B;&#x5EFA;&#x5B8C;&#xFF0C;&#x7136;&#x540E;&#x4E00;&#x4E2A;&#x4E2A;&#x4ECB;&#x7ECD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; app
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app.vue
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; common
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; img
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; js
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; scss
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.html
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; views
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; home
&#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; index.vue
&#x251C;&#x2500;&#x2500; .gitignore
&#x251C;&#x2500;&#x2500; package-lock.json
&#x251C;&#x2500;&#x2500; package.json
&#x2514;&#x2500;&#x2500; webpack.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="shell">&#x251C;&#x2500;&#x2500; app
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app<span class="hljs-selector-class">.vue</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; common
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">img</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; js
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; scss
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; views
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; home
&#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.vue</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.gitignore</span>
&#x251C;&#x2500;&#x2500; package-lock<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x2514;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre><p>node_modules&#x7684;&#x8BDD;&#x5C31;&#x5FFD;&#x7565;&#x4E86;&#x3002;</p><table><thead><tr><th>&#x6587;&#x4EF6;/&#x6587;&#x4EF6;&#x5939;</th><th>&#x7528;&#x9014;</th></tr></thead><tbody><tr><td>app.vue</td><td>&#x4F5C;&#x4E3A;vue&#x7684;&#x4E3B;&#x6587;&#x4EF6;</td></tr><tr><td>common</td><td>&#x91CC;&#x9762;&#x653E;&#x516C;&#x5171;&#x7684;&#x4EE3;&#x7801;</td></tr><tr><td>index.html</td><td>&#x9875;&#x9762;&#x6A21;&#x677F;&#x6587;&#x4EF6;</td></tr><tr><td>index.js</td><td>&#x9879;&#x76EE;&#x4E3B;&#x5165;&#x53E3;&#x6587;&#x4EF6;</td></tr><tr><td>router</td><td>&#x653E;vue&#x5BF9;&#x5E94;&#x7684;router&#x6587;&#x4EF6;</td></tr><tr><td>views</td><td>&#x653E;&#x89C6;&#x56FE;&#x6587;&#x4EF6;</td></tr><tr><td>.gitignore</td><td>&#x5FFD;&#x7565;node_module</td></tr></tbody></table><p>&#x54B1;&#x4EEC;&#x6682;&#x4E14;&#x4E0D;&#x5173;&#x7CFB;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x7B49;webpack&#x914D;&#x7F6E;&#x5B8C;&#x518D;&#x8BF4;&#x3002;</p><h3 id="articleHeader4">&#x4E8C;&#x3001;&#x914D;&#x7F6E;webpack.config.js</h3><ol><li>&#x5B89;&#x88C5;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x5305;&#xFF1A;</li></ol><p>&#x4E3A;&#x4E86;webpack&#x7684;&#x8FD0;&#x884C;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack
webpack-dev-server" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code class="shell">webpack
webpack-dev-<span class="hljs-keyword">server</span></code></pre><p>&#x4E3A;&#x4E86;&#x5904;&#x7406;vue&#x5355;&#x9875;&#x6587;&#x4EF6;&#xFF0C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code class="shell" style="word-break:break-word;white-space:initial"><span class="hljs-attribute">vue-loader</span></code></pre><p>&#x4E3A;&#x4E86;&#x5904;&#x7406;scss&#x6587;&#x4EF6;&#x5E76;&#x4ECE;js&#x4E2D;&#x62BD;&#x79BB;&#xFF0C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node-sass
style-loader
css-loader
sass-loader
vue-style-loader
postcss
postcss-loader
autoprefixer
extract-text-webpack-plugin" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code class="shell"><span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>
style-loader
css-loader
sass-loader
vue-style-loader
postcss
postcss-loader
autoprefixer
extract-text-webpack-plugin</code></pre><p>&#x4E3A;&#x4E86;&#x5904;&#x7406;&#x56FE;&#x7247;&#x548C;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#xFF0C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="file-loader
url-loader" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code class="shell"><span class="hljs-built_in">file</span>-loader
url-loader</code></pre><p>&#x4E3A;&#x4E86;&#x652F;&#x6301;&#x9AD8;&#x7EA7;&#x8BED;&#x6CD5;-babel&#xFF0C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel
babel-loader
babel-plugin-syntax-dynamic-import
babel-plugin-transform-object-rest-spread
babel-polyfill
babel-preset-env" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code class="shell"><span class="hljs-keyword">babel
</span><span class="hljs-keyword">babel-loader
</span><span class="hljs-keyword">babel-plugin-syntax-dynamic-import
</span><span class="hljs-keyword">babel-plugin-transform-object-rest-spread
</span><span class="hljs-keyword">babel-polyfill
</span><span class="hljs-keyword">babel-preset-env</span></code></pre><p>&#x4E3A;&#x4E86;&#x9A8C;&#x8BC1;&#x4EE3;&#x7801;&#x683C;&#x5F0F;-eslint&#xFF0C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eslint
eslint-loader
eslint-plugin-html
babel-eslint" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="shell">eslint
eslint-loader
eslint-plugin-<span class="hljs-selector-tag">html</span>
babel-eslint</code></pre><ol><li>&#x914D;&#x7F6E;webpack.config.js&#x6587;&#x4EF6;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;)
const path = require(&apos;path&apos;)
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
const FriendlyErrorsPlugin = require(&apos;friendly-errors-webpack-plugin&apos;)
// &#x4E3A;&#x4E86;&#x62BD;&#x79BB;&#x51FA;&#x4E24;&#x4EFD;CSS&#xFF0C;&#x521B;&#x5EFA;&#x4E24;&#x4EFD;ExtractTextPlugin
// base&#x4F5C;&#x4E3A;&#x57FA;&#x7840;&#x7684;css&#xFF0C;&#x57FA;&#x672C;&#x4E0D;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x53EF;&#x4EE5;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x5145;&#x5206;&#x5229;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;
// app&#x4F5C;&#x4E3A;&#x8FED;&#x4EE3;&#x7684;css&#xFF0C;&#x4F1A;&#x7ECF;&#x5E38;&#x6539;&#x53D8;
const isProduction = process.env.NODE_ENV === &apos;production&apos;
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
const extractBaseCSS =
  new ExtractTextPlugin(
    {
      filename:&apos;static/css/base.[chunkhash:8].css&apos;,
      allChunks: true,
      disable: !isProduction // &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x4E0D;&#x62BD;&#x79BB;css
    }
  )
const extractAppCSS
  = new ExtractTextPlugin(
    {
      filename:&apos;static/css/app.[chunkhash:8].css&apos;,
      allChunks: true,
      disable: !isProduction // &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x4E0D;&#x62BD;&#x79BB;css
    }
  )

// &#x51CF;&#x5C11;&#x8DEF;&#x5F84;&#x4E66;&#x5199;
function resolve(dir) {
  return path.join(__dirname, dir)
}

// &#x7F51;&#x7AD9;&#x56FE;&#x6807;&#x914D;&#x7F6E;
const favicon = resolve(&apos;favicon.ico&apos;)

// __dirname: &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x88AB;&#x6267;&#x884C;&#x7684; js &#x6240;&#x5728;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
// __filename: &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x88AB;&#x6267;&#x884C;&#x7684; js &#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
// process.cwd(): &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x8FD0;&#x884C; node &#x547D;&#x4EE4;&#x65F6;&#x6240;&#x5728;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
const config = {
  // sourcemap &#x6A21;&#x5F0F;
  devtool: &apos;cheap-module-eval-source-map&apos;,
  // &#x5165;&#x53E3;
  entry: {
    app: [
      &apos;babel-polyfill&apos;, // &#x8FD9;&#x91CC;&#x662F;&#x914D;&#x5408;babel-present-env&#x5BFC;&#x5165;&#x7684;&#x52A8;&#x6001;babel-polyfill,&#x56E0;&#x6B64;npm&#x9700;dev&#x4F9D;&#x8D56;
      resolve(&apos;app/index.js&apos;)
    ]
  },
  // &#x8F93;&#x51FA;
  output: {
    path: resolve(&apos;dev&apos;),
    filename: &apos;index.bundle.js&apos;
  },
  resolve: {
    // &#x6269;&#x5C55;&#x540D;&#xFF0C;&#x6BD4;&#x5982;import &apos;app.vue&apos;&#xFF0C;&#x6269;&#x5C55;&#x540E;&#x53EA;&#x9700;&#x8981;&#x5199;&#x6210;import &apos;app&apos;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;
    extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.scss&apos;, &apos;.css&apos;],
    // &#x53D6;&#x8DEF;&#x5F84;&#x522B;&#x540D;&#xFF0C;&#x65B9;&#x4FBF;&#x5728;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x4E2D;import
    alias: {
      api: resolve(&apos;app/api/&apos;),
      common: resolve(&apos;app/common/&apos;),
      views: resolve(&apos;app/views/&apos;),
      components: resolve(&apos;app/components/&apos;),
      componentsBase: resolve(&apos;app/componentsBase/&apos;),
      directives: resolve(&apos;app/directives/&apos;),
      filters: resolve(&apos;app/filters/&apos;),
      mixins: resolve(&apos;app/mixins/&apos;)
    }
  },
  // loaders&#x5904;&#x7406;
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve(&apos;app&apos;)],
        loader: [
          &apos;babel-loader&apos;,
          &apos;eslint-loader&apos;
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: &apos;vue-loader&apos;,
        options: {
          extractCSS: true,
          loaders: {
            scss: extractAppCSS.extract({
              fallback: &apos;vue-style-loader&apos;,
              use: [
                {
                  loader: &apos;css-loader&apos;,
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: &apos;postcss-loader&apos;,
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: &apos;sass-loader&apos;,
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: extractBaseCSS.extract({
          fallback: &apos;style-loader&apos;,
          use: [
            {
              loader: &apos;css-loader&apos;,
              options: {
                sourceMap: true
              }
            },
            {
              loader: &apos;postcss-loader&apos;,
              options: {
                sourceMap: true
              }
            },
            {
              loader: &apos;sass-loader&apos;,
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          limit: 8192,
          name: isProduction
            ? &apos;static/img/[name].[hash:8].[ext]&apos;
            : &apos;static/img/[name].[ext]&apos;
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          limit: 8192,
          name: isProduction
            ? &apos;static/font/[name].[hash:8].[ext]&apos;
            : &apos;static/font/[name].[ext]&apos;
        }
      }
    ]
  },
  plugins: [
    // html &#x6A21;&#x677F;&#x63D2;&#x4EF6;
    new HtmlWebpackPlugin({
      favicon,
      filename: &apos;index.html&apos;,
      template: resolve(&apos;app/index.html&apos;)
    }),
    // &#x62BD;&#x79BB;&#x51FA;css
    extractBaseCSS,
    extractAppCSS,
    // &#x70ED;&#x66FF;&#x6362;&#x63D2;&#x4EF6;
    new webpack.HotModuleReplacementPlugin(),
    // &#x66F4;&#x53CB;&#x597D;&#x5730;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    proxy: {
      // &#x51E1;&#x662F; `/api` &#x5F00;&#x5934;&#x7684; http &#x8BF7;&#x6C42;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x4EE3;&#x7406;&#x5230; localhost:7777 &#x4E0A;&#xFF0C;&#x7531; koa &#x63D0;&#x4F9B; mock &#x6570;&#x636E;&#x3002;
      // koa &#x4EE3;&#x7801;&#x5728; ./mock &#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x542F;&#x52A8;&#x547D;&#x4EE4;&#x4E3A; npm run mock&#x3002;
      &apos;/api&apos;: {
        target: &apos;http://localhost:7777&apos;, // &#x5982;&#x679C;&#x8BF4;&#x8054;&#x8C03;&#x4E86;&#xFF0C;&#x5C06;&#x5730;&#x5740;&#x6362;&#x6210;&#x540E;&#x7AEF;&#x73AF;&#x5883;&#x7684;&#x5730;&#x5740;&#x5C31;&#x54E6;&#x4E86;
        secure: false
      }
    },
    host: &apos;0.0.0.0&apos;,
    port: &apos;9999&apos;,
    disableHostCheck: true, // &#x4E3A;&#x4E86;&#x624B;&#x673A;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;
    contentBase: resolve(&apos;dev&apos;), // &#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
    // historyApiFallback: true, // &#x4E3A;&#x4E86;SPA&#x5E94;&#x7528;&#x670D;&#x52A1;
    inline: true, //&#x5B9E;&#x65F6;&#x5237;&#x65B0;
    hot: true  // &#x4F7F;&#x7528;&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6; HotModuleReplacementPlugin
  }
}

module.exports = {
  config: config,
  extractBaseCSS: extractBaseCSS,
  extractAppCSS: extractAppCSS
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;friendly-errors-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x4E3A;&#x4E86;&#x62BD;&#x79BB;&#x51FA;&#x4E24;&#x4EFD;CSS&#xFF0C;&#x521B;&#x5EFA;&#x4E24;&#x4EFD;ExtractTextPlugin</span>
<span class="hljs-comment">// base&#x4F5C;&#x4E3A;&#x57FA;&#x7840;&#x7684;css&#xFF0C;&#x57FA;&#x672C;&#x4E0D;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x53EF;&#x4EE5;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x5145;&#x5206;&#x5229;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;</span>
<span class="hljs-comment">// app&#x4F5C;&#x4E3A;&#x8FED;&#x4EE3;&#x7684;css&#xFF0C;&#x4F1A;&#x7ECF;&#x5E38;&#x6539;&#x53D8;</span>
<span class="hljs-keyword">const</span> isProduction = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> extractBaseCSS =
  <span class="hljs-keyword">new</span> ExtractTextPlugin(
    {
      <span class="hljs-attr">filename</span>:<span class="hljs-string">&apos;static/css/base.[chunkhash:8].css&apos;</span>,
      <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">disable</span>: !isProduction <span class="hljs-comment">// &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x4E0D;&#x62BD;&#x79BB;css</span>
    }
  )
<span class="hljs-keyword">const</span> extractAppCSS
  = <span class="hljs-keyword">new</span> ExtractTextPlugin(
    {
      <span class="hljs-attr">filename</span>:<span class="hljs-string">&apos;static/css/app.[chunkhash:8].css&apos;</span>,
      <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">disable</span>: !isProduction <span class="hljs-comment">// &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x4E0D;&#x62BD;&#x79BB;css</span>
    }
  )

<span class="hljs-comment">// &#x51CF;&#x5C11;&#x8DEF;&#x5F84;&#x4E66;&#x5199;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, dir)
}

<span class="hljs-comment">// &#x7F51;&#x7AD9;&#x56FE;&#x6807;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> favicon = resolve(<span class="hljs-string">&apos;favicon.ico&apos;</span>)

<span class="hljs-comment">// __dirname: &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x88AB;&#x6267;&#x884C;&#x7684; js &#x6240;&#x5728;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
<span class="hljs-comment">// __filename: &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x88AB;&#x6267;&#x884C;&#x7684; js &#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
<span class="hljs-comment">// process.cwd(): &#x603B;&#x662F;&#x8FD4;&#x56DE;&#x8FD0;&#x884C; node &#x547D;&#x4EE4;&#x65F6;&#x6240;&#x5728;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-comment">// sourcemap &#x6A21;&#x5F0F;</span>
  devtool: <span class="hljs-string">&apos;cheap-module-eval-source-map&apos;</span>,
  <span class="hljs-comment">// &#x5165;&#x53E3;</span>
  entry: {
    <span class="hljs-attr">app</span>: [
      <span class="hljs-string">&apos;babel-polyfill&apos;</span>, <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x914D;&#x5408;babel-present-env&#x5BFC;&#x5165;&#x7684;&#x52A8;&#x6001;babel-polyfill,&#x56E0;&#x6B64;npm&#x9700;dev&#x4F9D;&#x8D56;</span>
      resolve(<span class="hljs-string">&apos;app/index.js&apos;</span>)
    ]
  },
  <span class="hljs-comment">// &#x8F93;&#x51FA;</span>
  output: {
    <span class="hljs-attr">path</span>: resolve(<span class="hljs-string">&apos;dev&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.bundle.js&apos;</span>
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// &#x6269;&#x5C55;&#x540D;&#xFF0C;&#x6BD4;&#x5982;import &apos;app.vue&apos;&#xFF0C;&#x6269;&#x5C55;&#x540E;&#x53EA;&#x9700;&#x8981;&#x5199;&#x6210;import &apos;app&apos;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</span>
    extensions: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.scss&apos;</span>, <span class="hljs-string">&apos;.css&apos;</span>],
    <span class="hljs-comment">// &#x53D6;&#x8DEF;&#x5F84;&#x522B;&#x540D;&#xFF0C;&#x65B9;&#x4FBF;&#x5728;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x4E2D;import</span>
    alias: {
      <span class="hljs-attr">api</span>: resolve(<span class="hljs-string">&apos;app/api/&apos;</span>),
      <span class="hljs-attr">common</span>: resolve(<span class="hljs-string">&apos;app/common/&apos;</span>),
      <span class="hljs-attr">views</span>: resolve(<span class="hljs-string">&apos;app/views/&apos;</span>),
      <span class="hljs-attr">components</span>: resolve(<span class="hljs-string">&apos;app/components/&apos;</span>),
      <span class="hljs-attr">componentsBase</span>: resolve(<span class="hljs-string">&apos;app/componentsBase/&apos;</span>),
      <span class="hljs-attr">directives</span>: resolve(<span class="hljs-string">&apos;app/directives/&apos;</span>),
      <span class="hljs-attr">filters</span>: resolve(<span class="hljs-string">&apos;app/filters/&apos;</span>),
      <span class="hljs-attr">mixins</span>: resolve(<span class="hljs-string">&apos;app/mixins/&apos;</span>)
    }
  },
  <span class="hljs-comment">// loaders&#x5904;&#x7406;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">&apos;app&apos;</span>)],
        <span class="hljs-attr">loader</span>: [
          <span class="hljs-string">&apos;babel-loader&apos;</span>,
          <span class="hljs-string">&apos;eslint-loader&apos;</span>
        ]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">extractCSS</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">loaders</span>: {
            <span class="hljs-attr">scss</span>: extractAppCSS.extract({
              <span class="hljs-attr">fallback</span>: <span class="hljs-string">&apos;vue-style-loader&apos;</span>,
              <span class="hljs-attr">use</span>: [
                {
                  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>,
                  <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
                  }
                },
                {
                  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
                  <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
                  }
                },
                {
                  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;sass-loader&apos;</span>,
                  <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
                  }
                }
              ]
            })
          }
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(css|scss)$/</span>,
        <span class="hljs-attr">use</span>: extractBaseCSS.extract({
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">&apos;style-loader&apos;</span>,
          <span class="hljs-attr">use</span>: [
            {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
              }
            },
            {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
              }
            },
            {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;sass-loader&apos;</span>,
              <span class="hljs-attr">options</span>: {
                <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
              }
            }
          ]
        })
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg|ico)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>,
          <span class="hljs-attr">name</span>: isProduction
            ? <span class="hljs-string">&apos;static/img/[name].[hash:8].[ext]&apos;</span>
            : <span class="hljs-string">&apos;static/img/[name].[ext]&apos;</span>
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>,
          <span class="hljs-attr">name</span>: isProduction
            ? <span class="hljs-string">&apos;static/font/[name].[hash:8].[ext]&apos;</span>
            : <span class="hljs-string">&apos;static/font/[name].[ext]&apos;</span>
        }
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// html &#x6A21;&#x677F;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      favicon,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-attr">template</span>: resolve(<span class="hljs-string">&apos;app/index.html&apos;</span>)
    }),
    <span class="hljs-comment">// &#x62BD;&#x79BB;&#x51FA;css</span>
    extractBaseCSS,
    extractAppCSS,
    <span class="hljs-comment">// &#x70ED;&#x66FF;&#x6362;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-comment">// &#x66F4;&#x53CB;&#x597D;&#x5730;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;</span>
    <span class="hljs-keyword">new</span> FriendlyErrorsPlugin()
  ],
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">proxy</span>: {
      <span class="hljs-comment">// &#x51E1;&#x662F; `/api` &#x5F00;&#x5934;&#x7684; http &#x8BF7;&#x6C42;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x4EE3;&#x7406;&#x5230; localhost:7777 &#x4E0A;&#xFF0C;&#x7531; koa &#x63D0;&#x4F9B; mock &#x6570;&#x636E;&#x3002;</span>
      <span class="hljs-comment">// koa &#x4EE3;&#x7801;&#x5728; ./mock &#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x542F;&#x52A8;&#x547D;&#x4EE4;&#x4E3A; npm run mock&#x3002;</span>
      <span class="hljs-string">&apos;/api&apos;</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">&apos;http://localhost:7777&apos;</span>, <span class="hljs-comment">// &#x5982;&#x679C;&#x8BF4;&#x8054;&#x8C03;&#x4E86;&#xFF0C;&#x5C06;&#x5730;&#x5740;&#x6362;&#x6210;&#x540E;&#x7AEF;&#x73AF;&#x5883;&#x7684;&#x5730;&#x5740;&#x5C31;&#x54E6;&#x4E86;</span>
        secure: <span class="hljs-literal">false</span>
      }
    },
    <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;0.0.0.0&apos;</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-string">&apos;9999&apos;</span>,
    <span class="hljs-attr">disableHostCheck</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x4E3A;&#x4E86;&#x624B;&#x673A;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;</span>
    contentBase: resolve(<span class="hljs-string">&apos;dev&apos;</span>), <span class="hljs-comment">// &#x672C;&#x5730;&#x670D;&#x52A1;&#x5668;&#x6240;&#x52A0;&#x8F7D;&#x7684;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
    <span class="hljs-comment">// historyApiFallback: true, // &#x4E3A;&#x4E86;SPA&#x5E94;&#x7528;&#x670D;&#x52A1;</span>
    inline: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x5B9E;&#x65F6;&#x5237;&#x65B0;</span>
    hot: <span class="hljs-literal">true</span>  <span class="hljs-comment">// &#x4F7F;&#x7528;&#x70ED;&#x52A0;&#x8F7D;&#x63D2;&#x4EF6; HotModuleReplacementPlugin</span>
  }
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">config</span>: config,
  <span class="hljs-attr">extractBaseCSS</span>: extractBaseCSS,
  <span class="hljs-attr">extractAppCSS</span>: extractAppCSS
}</code></pre><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x8FD9;&#x4E00;&#x7BC7;&#x4E3B;&#x8981;&#x5C31;&#x505A;&#x4E86;&#x4E09;&#x4EF6;&#x4E8B;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;</li><li>&#x5B89;&#x88C5;&#x4E86;&#x8FD9;&#x7BC7;&#xFF0C;&#x4EE5;&#x53CA;&#x4E4B;&#x540E;&#x8981;&#x7528;&#x5230;npm&#x5305;</li><li>&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;Webpack</li></ol><p>&#x4E0B;&#x4E00;&#x7BC7;&#x6211;&#x4EEC;&#x5C06;&#x914D;&#x7F6E;eslint&#x3001;babel&#x3001;postcss - <a href="https://github.com/CodeLittlePrince/blog/issues/11" rel="nofollow noreferrer" target="_blank">&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x505A;Vue&#x524D;&#x7AEF;&#x67B6;&#x6784;&#xFF08;2&#xFF09;</a></p><h2 id="articleHeader6">&#x9879;&#x76EE;&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h2><p><a href="https://github.com/CodeLittlePrince/vue-construct" rel="nofollow noreferrer" target="_blank">Vue&#x524D;&#x7AEF;&#x67B6;&#x6784;-by &#x5B50;&#x54BB;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始做Vue前端架构（1）

## 原文链接
[https://segmentfault.com/a/1190000013091570](https://segmentfault.com/a/1190000013091570)

