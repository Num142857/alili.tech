---
title: Weex小册—从0搭建一个Weex项目
hidden: true
categories: [reprint]
slug: d26e5125
date: 2018-10-29 02:30:09
---

{{< raw >}}
<h4>&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#x5DE5;&#x7A0B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir weex-starter  
cd weex-starter   
npm init -y   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dos"><code><span class="hljs-built_in">mkdir</span> weex-starter  
<span class="hljs-built_in">cd</span> weex-starter   
npm init -y   </code></pre><p>&#x7136;&#x540E;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;index.html&#x6587;&#x4EF6;&#x3002;<br>&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; index.html
&#x2514;&#x2500;&#x2500; package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>.
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
&#x2514;&#x2500;&#x2500; <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span></code></pre><h4>&#x5B89;&#x88C5;&#x4F9D;&#x8D56;</h4><ul><li><p>webpack &amp; webpack-dev-server<br>&#x7531;&#x4E8E;weex-loader&#x6682;&#x4E0D;&#x652F;&#x6301;webpack4&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;webpack&#x53EA;&#x80FD;&#x5B89;&#x88C5;3.x&#x7248;&#x672C;&#xFF0C;webpack-dev-server&#x5BF9;&#x5E94;&#x5B89;&#x88C5;2.x&#x7248;&#x672C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack@3.x webpack-dev-server@2.x -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> webpack@<span class="hljs-number">3</span><span class="hljs-selector-class">.x</span> webpack-dev-server@<span class="hljs-number">2</span><span class="hljs-selector-class">.x</span> -D</code></pre></li><li><p>babel&#x76F8;&#x5173;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-loader babel-core babel-preset-env -D
// &#x65B0;&#x5EFA;.babelrc&#x6587;&#x4EF6;
{
     &quot;presets&quot;: [&quot;env&quot;]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> i <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-env </span>-D
// &#x65B0;&#x5EFA;.<span class="hljs-keyword">babelrc&#x6587;&#x4EF6;
</span>{
     <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>]
}
</code></pre></li><li><p>vue&#x76F8;&#x5173;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vue -S
// vue-loader&#x914D;&#x7F6E;&#x9879;
npm i vue-loader autoprefixer postcss-plugin-weex postcss-plugin-px2rem weex-vue-precompiler  -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>npm i vue -<span class="hljs-built_in">S</span>
<span class="hljs-comment">// vue-loader&#x914D;&#x7F6E;&#x9879;</span>
npm i vue-loader autoprefixer postcss-<span class="hljs-keyword">plugin</span>-weex postcss-<span class="hljs-keyword">plugin</span>-px2rem weex-vue-precompiler  -<span class="hljs-built_in">D</span></code></pre></li><li><p>weex-loader<br>weex-loader&#x7684;&#x4F5C;&#x7528;&#x662F;&#x628A;.vue&#x6587;&#x4EF6;&#x8F6C;&#x5316;&#x4E3A;native&#x7AEF;&#x4F7F;&#x7528;&#x7684;.weex.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i weex-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> weex-loader -D</code></pre></li><li><p><a href="https://github.com/weexteam/weex-vue-render" rel="nofollow noreferrer" target="_blank">weex-vue-render</a><br>weex-vue-render&#x662F; Vue DSL &#x7684; Web &#x6E32;&#x67D3;&#x5668;&#xFF0C; &#x5B83;&#x5728; Web &#x4E0A;&#x5B9E;&#x73B0;&#x4E86; Weex &#x7684;&#x5185;&#x7F6E;&#x7EC4;&#x4EF6;&#x548C;&#x5185;&#x7F6E;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i weex-vue-render -S" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> weex-vue-render -S</code></pre><p>&#x6B64;&#x65F6;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF08;&#x5FFD;&#x7565;node_modules&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; index.html
&#x251C;&#x2500;&#x2500; package-lock.json
&#x2514;&#x2500;&#x2500; package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; package-lock<span class="hljs-selector-class">.json</span>
&#x2514;&#x2500;&#x2500; package.json</code></pre></li></ul><h4>src&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir -p src/entry src/page" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">mkdir -<span class="hljs-selector-tag">p</span> src/entry src/page</code></pre><p>entry&#x6587;&#x4EF6;&#x5939;&#x662F;webpack&#x6253;&#x5305;&#x7684;&#x5165;&#x53E3;&#xFF0C;page&#x6587;&#x4EF6;&#x5939;&#x662F;&#x5404;&#x4E2A;.vue&#x9875;&#x9762;&#x3002;<br>&#x6B64;&#x65F6;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF08;&#x5FFD;&#x7565;node_modules&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; index.html
&#x251C;&#x2500;&#x2500; package-lock.json
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entry
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; page
&#x2514;&#x2500;&#x2500; webpack.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; package-lock<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entry
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; page
&#x2514;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre><h4>&#x7F16;&#x5199;&#x4EE3;&#x7801;</h4><p>weex&#x6700;&#x5E38;&#x89C1;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5C31;&#x662F;&#x7F16;&#x5199;&#x67D0;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x800C;&#x4E0D;&#x662F;&#x6574;&#x4E2A;APP&#xFF0C;&#x5373;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x653E;&#x5230;native&#x7AEF;&#x5448;&#x73B0;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x7684;weex-starter&#x5DE5;&#x7A0B;&#x4E5F;&#x662F;&#x4EE5;&#x9875;&#x9762;&#x4E3A;&#x5355;&#x4F4D;&#x7EC4;&#x7EC7;&#x7684;&#xFF1A;src/entry&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4F1A;&#x7F16;&#x8BD1;&#x51FA;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x3002;</p><p>&#x5F00;&#x53D1;&#x9875;&#x9762;&#x662F;&#x5728;web&#x7AEF;&#x8FDB;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x4F9D;&#x8D56;vue&#x548C;weex-vue-render&#xFF0C;&#x4F46;&#x662F;<code>.weex.js</code>&#x662F;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E24;&#x4E2A;&#x5E93;&#x7684;&#xFF0C;&#x56E0;&#x4E3A; Weex &#x672C;&#x8EAB;&#x96C6;&#x6210;&#x4E86;v2&#x7248;&#x672C;&#x7684; Vue&#xFF0C;&#x800C;weex-vue-render&#x662F; Vue DSL &#x7684; <code>Web &#x6E32;&#x67D3;&#x5668;</code>&#x3002;&#x5F00;&#x53D1;&#x4EE5;&#x53CA;&#x6253;&#x5305;&#x7F16;&#x8BD1;&#x65F6;&#xFF0C;&#x4F1A;&#x540C;&#x65F6;&#x751F;&#x6210;.web.js&#x548C;.weex.js&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x628A;vue&#x548C;weex-vue-render&#x4EE5;&lt;script&gt;&#x6807;&#x7B7E;&#x7684;&#x65B9;&#x5F0F;&#x76F4;&#x63A5;&#x5F15;&#x5165;&#x5230;html&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctype html&gt;
&lt;html&gt;

&lt;head&gt;
  ...
  &lt;script src=&quot;./node_modules/vue/dist/vue.runtime.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;./node_modules/weex-vue-render/dist/index.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./node_modules/vue/dist/vue.runtime.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./node_modules/weex-vue-render/dist/index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;root&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/entry/index.js

// import Vue from &apos;vue/dist/vue.esm&apos;; 
// import weex from &apos;weex-vue-render&apos;;
import Index from &apos;../page/index.vue&apos;;

// weex.init(Vue);

Index.el = &apos;#root&apos;;
new Vue(Index);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/entry/index.js</span>

<span class="hljs-comment">// import Vue from &apos;vue/dist/vue.esm&apos;; </span>
<span class="hljs-comment">// import weex from &apos;weex-vue-render&apos;;</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../page/index.vue&apos;</span>;

<span class="hljs-comment">// weex.init(Vue);</span>

Index.el = <span class="hljs-string">&apos;#root&apos;</span>;
<span class="hljs-keyword">new</span> Vue(Index);</code></pre><p>src/page/index.vue&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6B63;&#x5E38;&#x7684;.vue&#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x5C31;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.common.js
const path = require(&apos;path&apos;);
const fs = require(&apos;fs&apos;);
const webpack = require(&apos;webpack&apos;);

const entry = {};
...
// &#x904D;&#x5386;src/entry&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x4E00;&#x7EA7;js&#x6587;&#x4EF6;&#x505A;&#x6253;&#x5305;&#x5165;&#x53E3;&#xFF0C;&#x5373;entry/*.js

const webConfig = {
  entry,
  output: {
    filename: &apos;[name].web.js&apos;,
    path: path.resolve(__dirname, &apos;dist&apos;),
    publicPath: &apos;dist/&apos;
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [&apos;babel-loader&apos;]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [
          {
            loader: &apos;vue-loader&apos;,
            options: {
              ...
              // &#x8FD9;&#x4E2A;&#x5730;&#x65B9;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x8003; https://github.com/weexteam/weex-vue-render
            }
          }
        ]
      }
    ]
  },
  plugins: []
};

const weexConfig = {
  entry,
  output: {
    filename: &apos;[name].js&apos;,
    path: path.resolve(__dirname, &apos;dist&apos;)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [&apos;babel-loader&apos;]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [&apos;weex-loader&apos;]
      }
    ]
  },
  plugins: [
    // &#x6253;&#x5305;&#x540E;&#x7684;.weex.js&#x7684;&#x5934;&#x90E8;&#x52A0;&#x4E0A;&#x4EE5;&#x4E0B;banner&#x624D;&#x80FD;&#x88AB;native&#x8BC6;&#x522B;
    new webpack.BannerPlugin({
      banner: &apos;// { &quot;framework&quot;: &quot;Vue&quot; }\n&quot;use weex:vue&quot;;\n&apos;,
      raw: true
    })
  ]
};

module.exports = [webConfig, weexConfig];
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// webpack.common.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-keyword">const</span> entry = {};
...
<span class="hljs-comment">// &#x904D;&#x5386;src/entry&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x4E00;&#x7EA7;js&#x6587;&#x4EF6;&#x505A;&#x6253;&#x5305;&#x5165;&#x53E3;&#xFF0C;&#x5373;entry/*.js</span>

<span class="hljs-keyword">const</span> webConfig = {
  entry,
  output: {
    filename: <span class="hljs-string">&apos;[name].web.js&apos;</span>,
    path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    publicPath: <span class="hljs-string">&apos;dist/&apos;</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: [<span class="hljs-string">&apos;babel-loader&apos;</span>]
      },
      {
        test: <span class="hljs-regexp">/\.vue(\?[^?]+)?$/</span>,
        use: [
          {
            loader: <span class="hljs-string">&apos;vue-loader&apos;</span>,
            options: {
              ...
              <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x5730;&#x65B9;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x8003; https://github.com/weexteam/weex-vue-render</span>
            }
          }
        ]
      }
    ]
  },
  plugins: []
};

<span class="hljs-keyword">const</span> weexConfig = {
  entry,
  output: {
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
    path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>)
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: [<span class="hljs-string">&apos;babel-loader&apos;</span>]
      },
      {
        test: <span class="hljs-regexp">/\.vue(\?[^?]+)?$/</span>,
        use: [<span class="hljs-string">&apos;weex-loader&apos;</span>]
      }
    ]
  },
  plugins: [
    <span class="hljs-comment">// &#x6253;&#x5305;&#x540E;&#x7684;.weex.js&#x7684;&#x5934;&#x90E8;&#x52A0;&#x4E0A;&#x4EE5;&#x4E0B;banner&#x624D;&#x80FD;&#x88AB;native&#x8BC6;&#x522B;</span>
    <span class="hljs-keyword">new</span> webpack.BannerPlugin({
      banner: <span class="hljs-string">&apos;// { &quot;framework&quot;: &quot;Vue&quot; }\n&quot;use weex:vue&quot;;\n&apos;</span>,
      raw: <span class="hljs-literal">true</span>
    })
  ]
};

<span class="hljs-built_in">module</span>.exports = [webConfig, weexConfig];
</code></pre><p>&#x6253;&#x5305;&#x7F16;&#x8BD1;js&#x5206;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x751F;&#x6210;&#x73AF;&#x5883;&#xFF0C;&#x751F;&#x6210;&#x73AF;&#x5883;&#xFF0C;&#x76F4;&#x63A5;&#x6253;&#x5305;webpack.common.js&#x7684;&#x914D;&#x7F6E;&#x5C31;&#x884C;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4F1A;&#x6253;&#x5305;&#x51FA;&#x5BF9;&#x5E94;&#x7684;.web.js&#x548C;.weex.js&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.prod.conf.js
const path = require(&apos;path&apos;);
const rimraf = require(&apos;rimraf&apos;);
const UglifyJSPlugin = require(&apos;uglifyjs-webpack-plugin&apos;);
const commonConfig = require(&apos;./webpack.common&apos;);

const [webConfig, weexConfig] = commonConfig;

webConfig.plugins.push(new UglifyJSPlugin());
weexConfig.plugins.unshift(new UglifyJSPlugin()); // &#x662F;unshift&#xFF0C;&#x8981;&#x5148;&#x538B;&#x7F29;js&#xFF0C;&#x540E;&#x52A0;banner
rimraf.sync(path.resolve(__dirname, &apos;dist&apos;)); // &#x5220;&#x9664;dist&#x6587;&#x4EF6;&#x5939;

module.exports = [webConfig, weexConfig];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.prod.conf.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> rimraf = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;rimraf&apos;</span>);
<span class="hljs-keyword">const</span> UglifyJSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> commonConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.common&apos;</span>);

<span class="hljs-keyword">const</span> [webConfig, weexConfig] = commonConfig;

webConfig.plugins.push(<span class="hljs-keyword">new</span> UglifyJSPlugin());
weexConfig.plugins.unshift(<span class="hljs-keyword">new</span> UglifyJSPlugin()); <span class="hljs-comment">// &#x662F;unshift&#xFF0C;&#x8981;&#x5148;&#x538B;&#x7F29;js&#xFF0C;&#x540E;&#x52A0;banner</span>
rimraf.sync(path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>)); <span class="hljs-comment">// &#x5220;&#x9664;dist&#x6587;&#x4EF6;&#x5939;</span>

<span class="hljs-built_in">module</span>.exports = [webConfig, weexConfig];</code></pre><p>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x8D77;&#x4E00;&#x4E2A;devServer&#xFF0C;server&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x4F1A;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;.web.js&#xFF0C;&#x4F46;&#x662F;&#x6B64;&#x65F6;&#x8FD8;&#x9700;&#x8981;&#x751F;&#x6210;.weex.js&#xFF0C;&#x56E0;&#x4E3A;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4E0D;&#x4EC5;&#x8981;&#x5728;web&#x4E0A;&#x770B;&#x6548;&#x679C;&#xFF0C;&#x8FD8;&#x8981;&#x5728;native&#x7AEF;&#x770B;&#x6548;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.dev.conf.js
...

const weexConfig = webpackMerge(commonConfig[1], {
  watch: true
});
// &#x4EE5;Node.js API&#x7684;&#x65B9;&#x5F0F;&#x6267;&#x884C;webpack&#x751F;&#x6210;weex.js&#xFF0C;https://webpack.js.org/api/node/
webpack(weexConfig, (err, stats) =&gt; {
  if (err) {
    console.err(&apos;COMPILE ERROR:&apos;, err.stack);
  }
});

const webConfig = webpackMerge(commonConfig[0], {
  devServer: {
    ...
  }
});

// &#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x53F7;
portfinder.getPort((err, port) =&gt; {
  if (err) {
    console.log(err);
  } else {
    webConfig.devServer.port = port;
  }
});

module.exports = webConfig;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// webpack.dev.conf.js</span>
...

<span class="hljs-keyword">const</span> weexConfig = webpackMerge(commonConfig[1], {
  watch: true
});
<span class="hljs-comment">// &#x4EE5;Node.js API&#x7684;&#x65B9;&#x5F0F;&#x6267;&#x884C;webpack&#x751F;&#x6210;weex.js&#xFF0C;https://webpack.js.org/api/node/</span>
webpack(weexConfig, (<span class="hljs-keyword">err</span>, stats) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
    console.<span class="hljs-keyword">err</span>(&apos;COMPILE <span class="hljs-keyword">ERROR</span>:&apos;, <span class="hljs-keyword">err</span>.<span class="hljs-keyword">stack</span>);
  }
});

<span class="hljs-keyword">const</span> webConfig = webpackMerge(commonConfig[0], {
  devServer: {
    ...
  }
});

<span class="hljs-comment">// &#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x53F7;</span>
portfinder.getPort((<span class="hljs-keyword">err</span>, port) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">err</span>);
  } <span class="hljs-keyword">else</span> {
    webConfig.devServer.port = port;
  }
});

module.exports = webConfig;
</code></pre><p>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5DE5;&#x7A0B;&#x53EA;&#x80FD;&#x7528;&#x6765;&#x5F00;&#x53D1;&#x4E00;&#x5F20;&#x9875;&#x9762;&#x672A;&#x514D;&#x592A;&#x5962;&#x4F88;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;webpack&#x6253;&#x5305;entry&#x914D;&#x7F6E;&#x7684;&#x662F;&#x591A;&#x5165;&#x53E3;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x4E2A;&#x5DE5;&#x7A0B;&#x91CC;&#x9762;&#x5F00;&#x53D1;&#x591A;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x60F3;&#x67E5;&#x770B;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#x6D4F;&#x89C8;&#x5668;&#x7684;url&#x5373;&#x53EF;&#xFF0C;&#x57FA;&#x4E8E;&#x6B64;&#xFF0C;&#x505A;&#x51FA;&#x4E86;&#x4EE5;&#x4E0B;&#x6539;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
...
&lt;script&gt;
    // &#x8FD9;&#x6BB5;js&#x7684;&#x610F;&#x601D;&#x662F;&#xFF1A;&#x9ED8;&#x8BA4;&#x52A0;&#x8F7D;dist&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;index.web.js&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x67E5;&#x770B;&#x53E6;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x628A;url&#x4E2D;&#x7684;page=index.web.js&#x6539;&#x6210;&#x5176;&#x4ED6;&#x7684;js&#x5373;&#x53EF;
    // &#x6BD4;&#x5982;page=home.web.js&#xFF0C;&#x6B64;&#x65F6;&#x67E5;&#x770B;&#x7684;&#x5C31;&#x662F;home.vue&#x7684;&#x5185;&#x5BB9;
    ;(function () {
      var defaultPage = &apos;index.web.js&apos;

      var match = location.search.match(new RegExp(&apos;[?|&amp;]page=([^&amp;]+)&apos;))
      var page = match &amp;&amp; match[1]
      if (!page) {
        return location.href = location.href.replace(/\?|$/, function (f) {
          var query = &apos;?page=&apos; + defaultPage
          return f ? query + &apos;&amp;&apos; : query
        })
      }

      var $script = document.createElement(&apos;script&apos;)
      $script.src = &apos;./dist/&apos; + page
      document.body.appendChild($script)
    })();
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// index.html
...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// &#x8FD9;&#x6BB5;js&#x7684;&#x610F;&#x601D;&#x662F;&#xFF1A;&#x9ED8;&#x8BA4;&#x52A0;&#x8F7D;dist&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;index.web.js&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x67E5;&#x770B;&#x53E6;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x628A;url&#x4E2D;&#x7684;page=index.web.js&#x6539;&#x6210;&#x5176;&#x4ED6;&#x7684;js&#x5373;&#x53EF;</span>
    <span class="hljs-comment">// &#x6BD4;&#x5982;page=home.web.js&#xFF0C;&#x6B64;&#x65F6;&#x67E5;&#x770B;&#x7684;&#x5C31;&#x662F;home.vue&#x7684;&#x5185;&#x5BB9;</span>
    ;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> defaultPage = <span class="hljs-string">&apos;index.web.js&apos;</span>

      <span class="hljs-keyword">var</span> match = location.search.match(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;[?|&amp;]page=([^&amp;]+)&apos;</span>))
      <span class="hljs-keyword">var</span> page = match &amp;&amp; match[<span class="hljs-number">1</span>]
      <span class="hljs-keyword">if</span> (!page) {
        <span class="hljs-keyword">return</span> location.href = location.href.replace(<span class="hljs-regexp">/\?|$/</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">f</span>) </span>{
          <span class="hljs-keyword">var</span> query = <span class="hljs-string">&apos;?page=&apos;</span> + defaultPage
          <span class="hljs-keyword">return</span> f ? query + <span class="hljs-string">&apos;&amp;&apos;</span> : query
        })
      }

      <span class="hljs-keyword">var</span> $script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>)
      $script.src = <span class="hljs-string">&apos;./dist/&apos;</span> + page
      <span class="hljs-built_in">document</span>.body.appendChild($script)
    })();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6B64;&#x65F6;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF08;&#x5FFD;&#x7565;node_modules&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; .babelrc
&#x251C;&#x2500;&#x2500; index.html
&#x251C;&#x2500;&#x2500; package-lock.json
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entry
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.js
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; page
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; home.vue
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; index.vue
&#x251C;&#x2500;&#x2500; webpack.common.js
&#x251C;&#x2500;&#x2500; webpack.dev.conf.js
&#x2514;&#x2500;&#x2500; webpack.prod.conf.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.babelrc</span>
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; package-lock<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; entry
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; page
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; home<span class="hljs-selector-class">.vue</span>
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.vue</span>
&#x251C;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.common</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
&#x2514;&#x2500;&#x2500; webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span></code></pre><p>&#x5176;&#x5B9E;&#xFF0C;&#x5F00;&#x53D1;weex&#x9875;&#x9762;&#x7684;&#x5DE5;&#x7A0B;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;.vue&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#x7F16;&#x8BD1;&#x6210;.web.js&#x548C;.weex.js&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5C11;&#x4E86;&#x4E00;&#x4E2A;&#x73AF;&#x8282;&#x6709;&#x6CA1;&#x6709;&#x89C9;&#x5BDF;&#x5230;&#xFF1F;&#x2014;&#x2014;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;.weex.js&#x5728;native&#x4E0A;&#x600E;&#x4E48;&#x770B;&#x9875;&#x9762;&#x6548;&#x679C;&#x3002;</p><h4>native&#x9884;&#x89C8;</h4><p>&#x5728;&#x5F00;&#x53D1;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x52A8;&#x6001;&#x751F;&#x6210;&#x4E86;.weex.js&#xFF0C;&#x73B0;&#x5728;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x628A;.weex.js&#x4EE5;&#x4E8C;&#x7EF4;&#x7801;&#x7684;&#x5F62;&#x5F0F;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x3002;<br>&#x73B0;&#x5728;&#x662F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x5904;&#x7406;&#x7684;&#xFF1A;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x5DE6;&#x4E0A;&#x89D2;&#x4E0A;&#x663E;&#x793A;&#x4E86;&#x4E00;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#x7684;&#x5185;&#x5BB9;&#x6B63;&#x662F;&#x5F53;&#x524D;&#x9875;&#x9762;&#x5BF9;&#x5E94;&#x7684;.weex.js&#xFF0C;&#x7136;&#x540E;&#x7528; <a href="http://weex.apache.org/cn/tools/playground.html" rel="nofollow noreferrer" target="_blank">Weex playground app</a> &#x626B;&#x63CF;&#x8FD9;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x6E32;&#x67D3;&#x7684;&#x771F;&#x5B9E;&#x6548;&#x679C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bV8S4M?w=756&amp;h=1310" src="https://static.alili.tech/img/bV8S4M?w=756&amp;h=1310" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x6709;&#x70B9;&#x788D;&#x4E8B;&#xFF0C;&#x60F3;&#x5F00;&#x53D1;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E4B;&#x540E;&#x518D;&#x770B;native&#x9884;&#x89C8;&#x6548;&#x679C;&#xFF0C;&#x90A3;&#x4F60;&#x53EF;&#x4EE5;&#x5148;&#x628A;&#x4E8C;&#x7EF4;&#x7801;&#x9690;&#x85CF;&#x6389;&#x3002;</p><p>&#x76EE;&#x524D;&#x7684;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#x53EA;&#x662F;&#x8FBE;&#x5230;&#x4E86;native&#x9884;&#x89C8;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6709;&#x5F88;&#x5927;&#x63D0;&#x5347;&#x7A7A;&#x95F4;&#x3002;&#x6211;&#x6700;&#x7EC8;&#x7684;&#x60F3;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;&#x9875;&#x9762;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x4E8E;&#x82F9;&#x679C;&#x624B;&#x673A;&#x7684;&#x865A;&#x62DF;Home&#x952E;&#xFF0C;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x62D6;&#x52A8;&#xFF0C;&#x5F53;&#x9F20;&#x6807;hover&#x5B83;&#x4E0A;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x4EE5;popover&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;&#x5C55;&#x793A;&#x51FA;&#x4E8C;&#x7EF4;&#x7801;&#x3002;</p><p>&#x7531;&#x4E8E;&#x65F6;&#x95F4;&#x6BD4;&#x8F83;&#x7D27;&#xFF0C;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#x5E76;&#x6CA1;&#x6709;&#x5F00;&#x53D1;&#x51FA;&#x6765;&#xFF0C;&#x6B22;&#x8FCE;&#x5404;&#x4F4D;&#x80FD;&#x591F;&#x63D0;PR&#xFF0C;&#x5171;&#x540C;&#x5B8C;&#x5584;&#x8FD9;&#x4E2A;weex-starter&#x5DE5;&#x7A0B;&#x3002;github&#xFF1A;<a href="https://github.com/jasonintju/weex-starter" rel="nofollow noreferrer" target="_blank">https://github.com/jasonintju/weex-starter</a></p><hr><p>Weex&#x5C0F;&#x518C;&#x7CFB;&#x5217;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000014401052">Weex&#x5C0F;&#x518C;&#x2014;&#x8BA4;&#x8BC6;&#x4E00;&#x4E0B;Weex</a><br><a href="https://segmentfault.com/a/1190000014471888" target="_blank">Weex&#x5C0F;&#x518C;&#x2014;&#x4ECE;0&#x642D;&#x5EFA;&#x4E00;&#x4E2A;Weex&#x9879;&#x76EE;</a><br>...&#x672A;&#x5B8C;&#x5F85;&#x7EED;</p><hr><p>&#x9644;&#x62DB;&#x8058;&#xFF1A;<br></p><div class="video-prev vp_XMzQyOTkzODEwMA=="><div class="clearfix video-header"><img class="pull-left" src="https://static.alili.techundefined"><div class="pull-left"><h5>&#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x6DD8;&#x5B9D;&#x6280;&#x672F;&#x90E8;&#x57FA;&#x7840;&#x5E73;&#x53F0;&#x56E2;&#x961F;&#x89C6;&#x9891;</h5><span class="text-muted">http://v.youku.com/v_show/id_XMzQyOTkzODEwMA==.html</span></div></div></div>&#x62DB;P6/P7&#x524D;&#x7AEF;&#x3002;<br>&#x4F60;&#x53EF;&#x80FD;&#x4E0D;&#x77E5;&#x9053;&#x57FA;&#x7840;&#x5E73;&#x53F0;&#x90E8;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x53EF;&#x80FD;&#x542C;&#x8FC7;Weex&#x3001;Atlas&#x3001;&#x65E0;&#x4EBA;&#x8D85;&#x5E02;&#x3001;EMAS&#x7B49;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x9876;&#x5C16;&#x7684;&#x67B6;&#x6784;&#x5E08;&#x56E2;&#x961F;&#x3001;&#x79FB;&#x52A8;AI&#x56E2;&#x961F;&#x3001;&#x7B97;&#x6CD5;&#x56E2;&#x961F;&#x3001;&#x524D;&#x7AEF;&#x56E2;&#x961F;&#x3001;&#x4EA7;&#x54C1;&#x6280;&#x672F;&#x56E2;&#x961F;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x505A;&#x7684;&#x662F;EMAS&#x8DE8;&#x5E73;&#x53F0;&#x4EA7;&#x54C1;&#xFF0C;&#x6B22;&#x8FCE;&#x4F18;&#x79C0;&#x7684;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x52A0;&#x5165;&#x6211;&#x4EEC;&#xFF0C;&#x7B80;&#x5386;&#x53D1;&#x9001;&#x81F3; jasonintju@gmail.com&#xFF0C;&#x5F53;&#x7136;&#x5982;&#x679C;&#x4F60;&#x6709;&#x5176;&#x4ED6;&#x5FC3;&#x4EEA;&#x7684;&#x90E8;&#x95E8;&#xFF0C;&#x6211;&#x4E5F;&#x53EF;&#x4EE5;&#x5E2E;&#x5FD9;&#x5185;&#x63A8;&#x3002;<a href="https://cnodejs.org/topic/5ad8109eba60fcc66b7b8547" rel="nofollow noreferrer" target="_blank">&#x62DB;&#x8058;&#x8BE6;&#x60C5;</a><p></p><p>&#x9644;&#x6211;&#x4EEC;&#x7F8E;&#x4E3D;&#x7684;&#x4EA7;&#x54C1;&#x5C0F;&#x59D0;&#x59D0;&#x7167;&#x7247;&#xFF0C;&#x6B22;&#x8FCE;&#x6765;&#x64A9;&#x554A;~</p><p><span class="img-wrap"><img data-src="/img/bV8SWh?w=1080&amp;h=1440" src="https://static.alili.tech/img/bV8SWh?w=1080&amp;h=1440" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bV8SWo?w=1080&amp;h=1080" src="https://static.alili.tech/img/bV8SWo?w=1080&amp;h=1080" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex小册—从0搭建一个Weex项目

## 原文链接
[https://segmentfault.com/a/1190000014471888](https://segmentfault.com/a/1190000014471888)

