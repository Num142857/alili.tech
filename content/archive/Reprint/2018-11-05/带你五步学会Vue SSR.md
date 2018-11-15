---
title: 带你五步学会Vue SSR
hidden: true
categories: reprint
slug: b07fd488
date: 2018-11-05 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>SSR&#x5927;&#x5BB6;&#x80AF;&#x5B9A;&#x90FD;&#x4E0D;&#x964C;&#x751F;&#xFF0C;&#x901A;&#x8FC7;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x53EF;&#x4EE5;&#x4F18;&#x5316;SEO&#x6293;&#x53D6;&#xFF0C;&#x63D0;&#x5347;&#x9996;&#x9875;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x7B49;&#xFF0C;&#x6211;&#x5728;&#x5B66;&#x4E60;SSR&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x770B;&#x8FC7;&#x5F88;&#x591A;&#x6587;&#x7AE0;&#xFF0C;&#x6709;&#x4E9B;&#x5BF9;&#x6211;&#x6709;&#x5F88;&#x5927;&#x7684;&#x542F;&#x53D1;&#x4F5C;&#x7528;&#xFF0C;&#x6709;&#x4E9B;&#x5C31;&#x53EA;&#x662F;&#x7167;&#x642C;&#x5B98;&#x7F51;&#x6587;&#x6863;&#x3002;&#x901A;&#x8FC7;&#x51E0;&#x5929;&#x7684;&#x5B66;&#x4E60;&#xFF0C;&#x6211;&#x5BF9;SSR&#x6709;&#x4E86;&#x4E00;&#x4E9B;&#x4E86;&#x89E3;&#xFF0C;&#x4E5F;&#x4ECE;&#x5934;&#x5F00;&#x59CB;&#x5B8C;&#x6574;&#x7684;&#x914D;&#x7F6E;&#x51FA;&#x4E86;SSR&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x6240;&#x4EE5;&#x60F3;&#x901A;&#x8FC7;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x603B;&#x7ED3;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x540C;&#x65F6;&#x5E0C;&#x671B;&#x80FD;&#x591F;&#x5BF9;&#x5B66;&#x4E60;SSR&#x7684;&#x670B;&#x53CB;&#x8D77;&#x5230;&#x4E00;&#x70B9;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x6211;&#x4F1A;&#x901A;&#x8FC7;&#x4E94;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x4E00;&#x6B65;&#x6B65;&#x5E26;&#x4F60;&#x5B8C;&#x6210;SSR&#x7684;&#x914D;&#x7F6E;&#xFF1A;</p><ol><li>&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;</li><li>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x4E0D;&#x5305;&#x542B;<code>Ajax</code>&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</li><li>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x5305;&#x542B;<code>Ajax</code>&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</li><li>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x4F7F;&#x7528;<code>serverBundle</code>&#x548C;<code>clientManifest</code>&#x8FDB;&#x884C;&#x4F18;&#x5316;</li><li>&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x57FA;&#x4E8E;<code>Vue + VueRouter + Vuex</code>&#x7684;SSR&#x5DE5;&#x7A0B;</li></ol><p>&#x5982;&#x679C;&#x4F60;&#x73B0;&#x5728;&#x5BF9;&#x4E8E;&#x6211;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x8FD8;&#x4E0D;&#x592A;&#x4E86;&#x89E3;&#xFF0C;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x8DDF;&#x7740;&#x6211;&#x4E00;&#x6B65;&#x6B65;&#x5411;&#x4E0B;&#x8D70;&#xFF0C;&#x6700;&#x7EC8;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x72EC;&#x7ACB;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;SSR&#x5F00;&#x53D1;&#x9879;&#x76EE;&#xFF0C;<strong>&#x6240;&#x6709;&#x6E90;&#x7801;&#x6211;&#x4F1A;&#x653E;&#x5230;<a href="https://github.com/leocoder351/vue-ssr-demo" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x53C2;&#x8003;</strong>&#x3002;</p><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><h3 id="articleHeader2">1. &#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;</h3><p>&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x4F1A;&#xFF0C;&#x5C31;&#x662F;&#x57FA;&#x4E8E;<code>weback + vue</code>&#x7684;&#x4E00;&#x4E2A;&#x5E38;&#x89C4;&#x5F00;&#x53D1;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4F1A;&#x653E;&#x4E00;&#x4E9B;&#x5173;&#x952E;&#x4EE3;&#x7801;&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x53BB;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/01" rel="nofollow noreferrer" target="_blank">github</a>&#x67E5;&#x770B;&#x3002;</p><h5>&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- node_modules
- components  
    - Bar.vue
    - Foo.vue
- App.vue
- app.js
- index.html
- webpack.config.js
- package.json
- yarn.lock
- postcss.config.js
- .babelrc
- .gitignore" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> node_modules
</span>-<span class="ruby"> components  
</span>    -<span class="ruby"> Bar.vue
</span>    -<span class="ruby"> Foo.vue
</span>-<span class="ruby"> App.vue
</span>-<span class="ruby"> app.js
</span>-<span class="ruby"> index.html
</span>-<span class="ruby"> webpack.config.js
</span>-<span class="ruby"> package.json
</span>-<span class="ruby"> yarn.lock
</span>-<span class="ruby"> postcss.config.js
</span>-<span class="ruby"> .babelrc
</span>-<span class="ruby"> .gitignore</span></code></pre><h5>app.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import App from &apos;./App.vue&apos;;

let app = new Vue({
  el: &apos;#app&apos;,
  render: h =&gt; h(App)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>;

<span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre><h5>App.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;Foo&gt;&lt;/Foo&gt;
    &lt;Bar&gt;&lt;/Bar&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Foo from &apos;./components/Foo.vue&apos;;
import Bar from &apos;./components/Bar.vue&apos;;

export default {
  components: {
    Foo, Bar
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Foo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Foo</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Bar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Foo <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/Foo.vue&apos;</span>;
<span class="hljs-keyword">import</span> Bar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/Bar.vue&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components: {
    Foo, Bar
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><h5>index.html</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h5>components/Foo.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;foo&quot;&gt;
    &lt;h1&gt;Foo Component&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.foo {
  background: yellowgreen;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;foo&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Foo Component<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.foo</span> {
  <span class="hljs-attribute">background</span>: yellowgreen;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h5>components/Bar.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;bar&quot;&gt;
    &lt;h1&gt;Bar Component&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.bar {
  background: bisque;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Bar Component<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.bar</span> {
  <span class="hljs-attribute">background</span>: bisque;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h5>webpack.config.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;);

module.exports = {
  mode: &apos;development&apos;,

  entry: &apos;./app.js&apos;,

  output: {
    path: path.resolve(__dirname, &apos;dist&apos;),
    filename: &apos;bundle.js&apos;
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: &apos;babel-loader&apos;
      },
      {
        test: /\.css$/,
        use: [&apos;vue-style-loader&apos;, &apos;css-loader&apos;, &apos;postcss-loader&apos;]
        // &#x5982;&#x679C;&#x9700;&#x8981;&#x5355;&#x72EC;&#x62BD;&#x51FA;CSS&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;
        // use: ExtractTextPlugin.extract({
        //   fallback: &apos;vue-style-loader&apos;,
        //   use: [
        //     &apos;css-loader&apos;,
        //     &apos;postcss-loader&apos;
        //   ]
        // })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: &apos;url-loader&apos;,
          options: {
            limit: 10000    // 10Kb
          }
        }
      },
      {
        test: /\.vue$/,
        use: &apos;vue-loader&apos;
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: &apos;./index.html&apos;
    }),
    // &#x5982;&#x679C;&#x9700;&#x8981;&#x5355;&#x72EC;&#x62BD;&#x51FA;CSS&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;
    // new ExtractTextPlugin(&quot;styles.css&quot;)
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  mode: <span class="hljs-string">&apos;development&apos;</span>,

  entry: <span class="hljs-string">&apos;./app.js&apos;</span>,

  output: {
    path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    filename: <span class="hljs-string">&apos;bundle.js&apos;</span>
  },

  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: <span class="hljs-string">&apos;babel-loader&apos;</span>
      },
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: [<span class="hljs-string">&apos;vue-style-loader&apos;</span>, <span class="hljs-string">&apos;css-loader&apos;</span>, <span class="hljs-string">&apos;postcss-loader&apos;</span>]
        <span class="hljs-comment">// &#x5982;&#x679C;&#x9700;&#x8981;&#x5355;&#x72EC;&#x62BD;&#x51FA;CSS&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;</span>
        <span class="hljs-comment">// use: ExtractTextPlugin.extract({</span>
        <span class="hljs-comment">//   fallback: &apos;vue-style-loader&apos;,</span>
        <span class="hljs-comment">//   use: [</span>
        <span class="hljs-comment">//     &apos;css-loader&apos;,</span>
        <span class="hljs-comment">//     &apos;postcss-loader&apos;</span>
        <span class="hljs-comment">//   ]</span>
        <span class="hljs-comment">// })</span>
      },
      {
        test: <span class="hljs-regexp">/\.(jpg|jpeg|png|gif|svg)$/</span>,
        use: {
          loader: <span class="hljs-string">&apos;url-loader&apos;</span>,
          options: {
            limit: <span class="hljs-number">10000</span>    <span class="hljs-comment">// 10Kb</span>
          }
        }
      },
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        use: <span class="hljs-string">&apos;vue-loader&apos;</span>
      }
    ]
  },

  plugins: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin(),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      template: <span class="hljs-string">&apos;./index.html&apos;</span>
    }),
    <span class="hljs-comment">// &#x5982;&#x679C;&#x9700;&#x8981;&#x5355;&#x72EC;&#x62BD;&#x51FA;CSS&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;</span>
    <span class="hljs-comment">// new ExtractTextPlugin(&quot;styles.css&quot;)</span>
  ]
};</code></pre><h5>postcss.config.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: [
    require(&apos;autoprefixer&apos;)
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = {
  plugins: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;autoprefixer&apos;</span>)
  ]
};</code></pre><h5>.babelrc</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;@babel/preset-env&quot;
  ],
  &quot;plugins&quot;: [
    // &#x8BA9;&#x5176;&#x652F;&#x6301;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x7684;&#x5199;&#x6CD5; const Foo = () =&gt; import(&apos;../components/Foo.vue&apos;)
    &quot;dynamic-import-webpack&quot;    
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;presets&quot;</span>: [
    <span class="hljs-string">&quot;@babel/preset-env&quot;</span>
  ],
  <span class="hljs-attr">&quot;plugins&quot;</span>: [
    // &#x8BA9;&#x5176;&#x652F;&#x6301;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x7684;&#x5199;&#x6CD5; const Foo = () =&gt; import(&apos;../components/Foo.vue&apos;)
    <span class="hljs-string">&quot;dynamic-import-webpack&quot;</span>    
  ]
}</code></pre><h5>package.json</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;01&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;yarn run dev&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server&quot;,
    &quot;build&quot;: &quot;webpack&quot;
  },
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.5.17&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;@babel/core&quot;: &quot;^7.1.2&quot;,
    &quot;@babel/preset-env&quot;: &quot;^7.1.0&quot;,
    &quot;babel-plugin-dynamic-import-webpack&quot;: &quot;^1.1.0&quot;,
    &quot;autoprefixer&quot;: &quot;^9.1.5&quot;,
    &quot;babel-loader&quot;: &quot;^8.0.4&quot;,
    &quot;css-loader&quot;: &quot;^1.0.0&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;^4.0.0-beta.0&quot;,
    &quot;file-loader&quot;: &quot;^2.0.0&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,
    &quot;postcss&quot;: &quot;^7.0.5&quot;,
    &quot;postcss-loader&quot;: &quot;^3.0.0&quot;,
    &quot;url-loader&quot;: &quot;^1.1.1&quot;,
    &quot;vue-loader&quot;: &quot;^15.4.2&quot;,
    &quot;vue-style-loader&quot;: &quot;^4.1.2&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.5.17&quot;,
    &quot;webpack&quot;: &quot;^4.20.2&quot;,
    &quot;webpack-cli&quot;: &quot;^3.1.2&quot;,
    &quot;webpack-dev-server&quot;: &quot;^3.1.9&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;01&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;MIT&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;yarn run dev&quot;</span>,
    <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server&quot;</span>,
    <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>
  },
  <span class="hljs-attr">&quot;dependencies&quot;</span>: {
    <span class="hljs-attr">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>
  },
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;@babel/core&quot;</span>: <span class="hljs-string">&quot;^7.1.2&quot;</span>,
    <span class="hljs-attr">&quot;@babel/preset-env&quot;</span>: <span class="hljs-string">&quot;^7.1.0&quot;</span>,
    <span class="hljs-attr">&quot;babel-plugin-dynamic-import-webpack&quot;</span>: <span class="hljs-string">&quot;^1.1.0&quot;</span>,
    <span class="hljs-attr">&quot;autoprefixer&quot;</span>: <span class="hljs-string">&quot;^9.1.5&quot;</span>,
    <span class="hljs-attr">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^8.0.4&quot;</span>,
    <span class="hljs-attr">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^1.0.0&quot;</span>,
    <span class="hljs-attr">&quot;extract-text-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^4.0.0-beta.0&quot;</span>,
    <span class="hljs-attr">&quot;file-loader&quot;</span>: <span class="hljs-string">&quot;^2.0.0&quot;</span>,
    <span class="hljs-attr">&quot;html-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^3.2.0&quot;</span>,
    <span class="hljs-attr">&quot;postcss&quot;</span>: <span class="hljs-string">&quot;^7.0.5&quot;</span>,
    <span class="hljs-attr">&quot;postcss-loader&quot;</span>: <span class="hljs-string">&quot;^3.0.0&quot;</span>,
    <span class="hljs-attr">&quot;url-loader&quot;</span>: <span class="hljs-string">&quot;^1.1.1&quot;</span>,
    <span class="hljs-attr">&quot;vue-loader&quot;</span>: <span class="hljs-string">&quot;^15.4.2&quot;</span>,
    <span class="hljs-attr">&quot;vue-style-loader&quot;</span>: <span class="hljs-string">&quot;^4.1.2&quot;</span>,
    <span class="hljs-attr">&quot;vue-template-compiler&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>,
    <span class="hljs-attr">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.20.2&quot;</span>,
    <span class="hljs-attr">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.1.2&quot;</span>,
    <span class="hljs-attr">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^3.1.9&quot;</span>
  }
}</code></pre><h5>&#x547D;&#x4EE4;</h5><h6>&#x542F;&#x52A8;&#x5F00;&#x53D1;&#x73AF;&#x5883;</h6><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial">yarn <span class="hljs-literal">start</span></code></pre><h6>&#x6784;&#x5EFA;&#x751F;&#x4EA7;&#x73AF;&#x5883;</h6><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">yarn <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre><p>&#x6700;&#x7EC8;&#x6548;&#x679C;&#x622A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636659?w=1595&amp;h=676" src="https://static.alili.tech/img/remote/1460000016636659?w=1595&amp;h=676" alt="&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;" title="&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;" style="cursor:pointer"></span></p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/01" rel="nofollow noreferrer" target="_blank">github</a></p><h3 id="articleHeader3">2. &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x4E0D;&#x5305;&#x542B;<code>Ajax</code>&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</h3><p>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;SSR&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;&#x540C;&#x6784;&#xFF0C;&#x6700;&#x7EC8;&#x8981;&#x8BA9;&#x4E00;&#x4EFD;&#x4EE3;&#x7801;&#x65E2;&#x53EF;&#x4EE5;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8FD0;&#x884C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8FD0;&#x884C;&#x3002;&#x5982;&#x679C;&#x8BF4;&#x5728;SSR&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x56DE;&#x6EDA;&#x5230;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#xFF0C;&#x4FDD;&#x8BC1;&#x7528;&#x6237;&#x6B63;&#x5E38;&#x770B;&#x5230;&#x9875;&#x9762;&#x3002;</p><p>&#x90A3;&#x4E48;&#xFF0C;&#x987A;&#x7740;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#xFF0C;&#x80AF;&#x5B9A;&#x5C31;&#x4F1A;&#x6709;&#x4E24;&#x4E2A;<code>webpack</code>&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;<code>weboack.client.config.js</code>&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;<code>webpack.server.config.js</code>&#xFF0C;&#x5C06;&#x5B83;&#x4EEC;&#x7684;&#x516C;&#x6709;&#x90E8;&#x5206;&#x62BD;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;<code>webpack.base.cofig.js</code>&#xFF0C;&#x540E;&#x7EED;&#x901A;&#x8FC7;<code>webpack-merge</code>&#x8FDB;&#x884C;&#x5408;&#x5E76;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x4E5F;&#x8981;&#x6709;&#x4E00;&#x4E2A;<code>server</code>&#x6765;&#x63D0;&#x4F9B;<code>http</code>&#x670D;&#x52A1;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x7528;&#x7684;&#x662F;<code>koa</code>&#x3002;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x65B0;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- node_modules
- config    // &#x65B0;&#x589E;
    - webpack.base.config.js
    - webpack.client.config.js
    - webpack.server.config.js
- src
    - components  
        - Bar.vue
        - Foo.vue
    - App.vue
    - app.js
    - entry-client.js   // &#x65B0;&#x589E;
    - entry-server.js   // &#x65B0;&#x589E;
    - index.html
    - index.ssr.html    // &#x65B0;&#x589E;
- package.json
- yarn.lock
- postcss.config.js
- .babelrc
- .gitignore" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> node_modules
</span>-<span class="ruby"> config    /<span class="hljs-regexp">/ &#x65B0;&#x589E;
</span></span>    -<span class="ruby"><span class="hljs-regexp"> webpack.base.config.js
</span></span>    -<span class="ruby"><span class="hljs-regexp"> webpack.client.config.js
</span></span>    -<span class="ruby"><span class="hljs-regexp"> webpack.server.config.js
</span></span>-<span class="ruby"><span class="hljs-regexp"> src
</span></span>    -<span class="ruby"><span class="hljs-regexp"> components  
</span></span>        -<span class="ruby"><span class="hljs-regexp"> Bar.vue
</span></span>        -<span class="ruby"><span class="hljs-regexp"> Foo.vue
</span></span>    -<span class="ruby"><span class="hljs-regexp"> App.vue
</span></span>    -<span class="ruby"><span class="hljs-regexp"> app.js
</span></span>    -<span class="ruby"><span class="hljs-regexp"> entry-client.js   /</span><span class="hljs-regexp">/ &#x65B0;&#x589E;
</span></span>    -<span class="ruby"><span class="hljs-regexp"> entry-server.js   /</span><span class="hljs-regexp">/ &#x65B0;&#x589E;
</span></span>    -<span class="ruby"><span class="hljs-regexp"> index.html
</span></span>    -<span class="ruby"><span class="hljs-regexp"> index.ssr.html    /</span><span class="hljs-regexp">/ &#x65B0;&#x589E;
</span></span>-<span class="ruby"><span class="hljs-regexp"> package.json
</span></span>-<span class="ruby"><span class="hljs-regexp"> yarn.lock
</span></span>-<span class="ruby"><span class="hljs-regexp"> postcss.config.js
</span></span>-<span class="ruby"><span class="hljs-regexp"> .babelrc
</span></span>-<span class="ruby"><span class="hljs-regexp"> .gitignore</span></span></code></pre><p>&#x5728;&#x7EAF;&#x5BA2;&#x6237;&#x7AEF;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;(client-only app)&#x4E2D;&#xFF0C;&#x6BCF;&#x4E2A;&#x7528;&#x6237;&#x4F1A;&#x5728;&#x4ED6;&#x4EEC;&#x5404;&#x81EA;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x65B0;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5B9E;&#x4F8B;&#x3002;&#x5BF9;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x5E0C;&#x671B;&#x5982;&#x6B64;&#xFF1A;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x5E94;&#x8BE5;&#x90FD;&#x662F;&#x5168;&#x65B0;&#x7684;&#x3001;&#x72EC;&#x7ACB;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5B9E;&#x4F8B;&#xFF0C;&#x4EE5;&#x4FBF;&#x4E0D;&#x4F1A;&#x6709;&#x4EA4;&#x53C9;&#x8BF7;&#x6C42;&#x9020;&#x6210;&#x7684;&#x72B6;&#x6001;&#x6C61;&#x67D3;(cross-request state pollution)&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5BF9;<code>app.js</code>&#x505A;&#x4FEE;&#x6539;&#xFF0C;&#x5C06;&#x5176;&#x5305;&#x88C5;&#x4E3A;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x6839;&#x7EC4;&#x4EF6;&#x3002;</p><p><strong>app.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import App from &apos;./App.vue&apos;;

export function createApp() {
  const app = new Vue({
    render: h =&gt; h(App)
  });

  return { app };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
  });

  <span class="hljs-keyword">return</span> { app };
}</code></pre><p>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#xFF0C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6839;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5176;&#x6302;&#x8F7D;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p><strong>entry-client.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createApp } from &apos;./app.js&apos;;

const { app } = createApp();

app.$mount(&apos;#app&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>import { createApp } from &apos;./<span class="hljs-keyword">app</span>.js&apos;;

<span class="hljs-keyword">const</span> { <span class="hljs-keyword">app</span> } = createApp();

<span class="hljs-keyword">app</span>.<span class="hljs-variable">$mount</span>(&apos;#<span class="hljs-keyword">app</span>&apos;);</code></pre><p>&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>context</code>&#x53C2;&#x6570;&#xFF0C;&#x540C;&#x65F6;&#x6BCF;&#x6B21;&#x90FD;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6839;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;<code>context</code>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x8FD8;&#x4E0D;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x540E;&#x7EED;&#x7684;&#x6B65;&#x9AA4;&#x4F1A;&#x7528;&#x5230;&#x5B83;&#x3002;</p><p><strong>entry-server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createApp } from &apos;./app.js&apos;;

export default context =&gt; {
  const { app } = createApp();

  return app;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">import</span> { createApp } from <span class="hljs-string">&apos;./app.js&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {
  <span class="hljs-keyword">const</span> { app } = createApp();

  <span class="hljs-keyword">return</span> app;
}</code></pre><p>&#x7136;&#x540E;&#x518D;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>index.ssr.html</code></p><p><strong>index.ssr.html</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!--vue-ssr-outlet--&gt;

  &lt;script type=&quot;text/javascript&quot; src=&quot;&lt;%= htmlWebpackPlugin.options.files.js %&gt;&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs erb"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!--vue-ssr-outlet--&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;&lt;%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.files.js </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p><code>&lt;!--vue-ssr-outlet--&gt;</code>&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5360;&#x4F4D;&#x7B26;&#xFF0C;&#x540E;&#x7EED;&#x901A;&#x8FC7;<code>vue-server-renderer</code>&#x63D2;&#x4EF6;&#xFF0C;&#x5C06;&#x670D;&#x52A1;&#x5668;&#x89E3;&#x6790;&#x51FA;&#x7684;&#x7EC4;&#x4EF6;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#x63D2;&#x5165;&#x5230;&#x8FD9;&#x91CC;&#x3002;</p><p><code>&lt;script type=&quot;text/javascript&quot; src=&quot;&lt;%= htmlWebpackPlugin.options.files.js %&gt;&quot;&gt;&lt;/script&gt;</code>&#x662F;&#x4E3A;&#x4E86;&#x5C06;<code>webpack</code>&#x901A;&#x8FC7;<code>webpack.client.config.js</code>&#x6253;&#x5305;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x653E;&#x5230;&#x8FD9;&#x91CC;&#xFF08;&#x8FD9;&#x91CC;&#x662F;&#x4E3A;&#x4E86;&#x7B80;&#x5355;&#x6F14;&#x793A;&#xFF0C;&#x540E;&#x7EED;&#x4F1A;&#x6709;&#x522B;&#x7684;&#x529E;&#x6CD5;&#x6765;&#x505A;&#x8FD9;&#x4E2A;&#x4E8B;&#x60C5;&#xFF09;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x670D;&#x52A1;&#x7AEF;&#x5410;&#x51FA;&#x6765;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x4E2A;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x540E;&#x7EED;&#x7684;<code>Vue</code>&#x76F8;&#x5173;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x3001;&#x4E8B;&#x4EF6;&#x54CD;&#x5E94;&#x7B49;&#x7B49;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6765;&#x63A5;&#x7BA1;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x9700;&#x8981;&#x5C06;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x6253;&#x5305;&#x7684;&#x6587;&#x4EF6;&#x5728;&#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x3002;</p><p>&#x7528;&#x5B98;&#x65B9;&#x7684;&#x8BCD;&#x6765;&#x8BF4;&#xFF0C;&#x53EB;<strong>&#x5BA2;&#x6237;&#x7AEF;&#x6FC0;&#x6D3B;&#xFF08;client-side hydration&#xFF09;</strong>&#x3002;</p><p>&#x6240;&#x8C13;&#x5BA2;&#x6237;&#x7AEF;&#x6FC0;&#x6D3B;&#xFF0C;&#x6307;&#x7684;&#x662F; Vue &#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x63A5;&#x7BA1;&#x7531;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x7684;&#x9759;&#x6001; HTML&#xFF0C;&#x4F7F;&#x5176;&#x53D8;&#x4E3A;&#x7531; Vue &#x7BA1;&#x7406;&#x7684;&#x52A8;&#x6001; DOM &#x7684;&#x8FC7;&#x7A0B;&#x3002;</p><p>&#x5728; entry-client.js &#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x884C;&#x6302;&#x8F7D;(mount)&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD9;&#x91CC;&#x5047;&#x5B9A; App.vue template &#x6839;&#x5143;&#x7D20;&#x7684; `id=&quot;app&quot;`
app.$mount(&apos;#app&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> &#x8FD9;&#x91CC;&#x5047;&#x5B9A; App.vue template &#x6839;&#x5143;&#x7D20;&#x7684; `id=<span class="hljs-string">&quot;app&quot;</span>`
app.<span class="hljs-variable">$mount</span>(<span class="hljs-string">&apos;#app&apos;</span>)</code></pre><p>&#x7531;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x5DF2;&#x7ECF;&#x6E32;&#x67D3;&#x597D;&#x4E86; HTML&#xFF0C;&#x6211;&#x4EEC;&#x663E;&#x7136;&#x65E0;&#x9700;&#x5C06;&#x5176;&#x4E22;&#x5F03;&#x518D;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x6240;&#x6709;&#x7684; DOM &#x5143;&#x7D20;&#x3002;&#x76F8;&#x53CD;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&quot;&#x6FC0;&#x6D3B;&quot;&#x8FD9;&#x4E9B;&#x9759;&#x6001;&#x7684; HTML&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x4ED6;&#x4EEC;&#x6210;&#x4E3A;&#x52A8;&#x6001;&#x7684;&#xFF08;&#x80FD;&#x591F;&#x54CD;&#x5E94;&#x540E;&#x7EED;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF09;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x68C0;&#x67E5;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x7684;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF0C;&#x4F60;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x6839;&#x5143;&#x7D20;&#x4E0A;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot; data-server-rendered=&quot;true&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span> data-server-rendered=<span class="hljs-string">&quot;true&quot;</span>&gt;</code></pre><p><code>Vue</code>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x5C31;&#x4F9D;&#x9760;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x5C06;&#x670D;&#x52A1;&#x5668;&#x5410;&#x51FA;&#x6765;&#x7684;<code>html</code>&#x8FDB;&#x884C;&#x6FC0;&#x6D3B;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x4F1A;&#x81EA;&#x5DF1;&#x6784;&#x5EFA;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E86;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;<code>webpack</code>&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;&#xFF1A;</p><p><strong>webpack.base.config.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;);

module.exports = {
  mode: &apos;development&apos;,

  resolve: {
    extensions: [&apos;.js&apos;, &apos;.vue&apos;]
  },

  output: {
    path: path.resolve(__dirname, &apos;../dist&apos;),
    filename: &apos;[name].bundle.js&apos;
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: &apos;vue-loader&apos;
      },
      {
        test: /\.js$/,
        use: &apos;babel-loader&apos;
      },
      {
        test: /\.css$/,
        use: [&apos;vue-style-loader&apos;, &apos;css-loader&apos;, &apos;postcss-loader&apos;]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: &apos;url-loader&apos;,
          options: {
            limit: 10000    // 10Kb
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  mode: <span class="hljs-string">&apos;development&apos;</span>,

  resolve: {
    extensions: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>]
  },

  output: {
    path: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    filename: <span class="hljs-string">&apos;[name].bundle.js&apos;</span>
  },

  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        use: <span class="hljs-string">&apos;vue-loader&apos;</span>
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: <span class="hljs-string">&apos;babel-loader&apos;</span>
      },
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: [<span class="hljs-string">&apos;vue-style-loader&apos;</span>, <span class="hljs-string">&apos;css-loader&apos;</span>, <span class="hljs-string">&apos;postcss-loader&apos;</span>]
      },
      {
        test: <span class="hljs-regexp">/\.(jpg|jpeg|png|gif|svg)$/</span>,
        use: {
          loader: <span class="hljs-string">&apos;url-loader&apos;</span>,
          options: {
            limit: <span class="hljs-number">10000</span>    <span class="hljs-comment">// 10Kb</span>
          }
        }
      }
    ]
  },

  plugins: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin()
  ]
};</code></pre><p><strong>webpack.client.config.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const merge = require(&apos;webpack-merge&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const base = require(&apos;./webpack.base.config&apos;);

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, &apos;../src/entry-client.js&apos;)
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../src/index.html&apos;),
      filename: &apos;index.html&apos;
    })
  ]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.config&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(base, {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">client</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/entry-client.js&apos;</span>)
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/index.html&apos;</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.html&apos;</span>
    })
  ]
});</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x53D8;&#x6210;&#x4E86;<code>entry-client.js</code>&#xFF0C;&#x5C06;&#x5176;&#x6253;&#x5305;&#x51FA;&#x7684;<code>client.bundle.js</code>&#x63D2;&#x5165;&#x5230;<code>index.html</code>&#x4E2D;&#x3002;</p><p><strong>webpack.server.config.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const merge = require(&apos;webpack-merge&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const base = require(&apos;./webpack.base.config&apos;);

module.exports = merge(base, {
  target: &apos;node&apos;,
  entry: {
    server: path.resolve(__dirname, &apos;../src/entry-server.js&apos;)
  },
  output: {
    libraryTarget: &apos;commonjs2&apos;
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../src/index.ssr.html&apos;),
      filename: &apos;index.ssr.html&apos;,
      files: {
        js: &apos;client.bundle.js&apos;
      },
      excludeChunks: [&apos;server&apos;]
    })
  ]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.config&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(base, {
  <span class="hljs-attr">target</span>: <span class="hljs-string">&apos;node&apos;</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">server</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/entry-server.js&apos;</span>)
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">&apos;commonjs2&apos;</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/index.ssr.html&apos;</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.ssr.html&apos;</span>,
      <span class="hljs-attr">files</span>: {
        <span class="hljs-attr">js</span>: <span class="hljs-string">&apos;client.bundle.js&apos;</span>
      },
      <span class="hljs-attr">excludeChunks</span>: [<span class="hljs-string">&apos;server&apos;</span>]
    })
  ]
});</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x51E0;&#x4E2A;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#xFF1A;</p><ol><li>&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x662F; <code>entry-server.js</code></li><li>&#x56E0;&#x4E3A;&#x662F;&#x6253;&#x5305;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4F9D;&#x8D56;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;<code>target</code>&#x8981;&#x8BBE;&#x4E3A;<code>node</code>&#xFF0C;&#x540C;&#x65F6;&#xFF0C;<code>output</code>&#x7684;<code>libraryTarget</code>&#x8981;&#x8BBE;&#x4E3A;<code>commonjs2</code></li></ol><p>&#x8FD9;&#x91CC;&#x5173;&#x4E8E;<code>HtmlWebpackPlugin</code>&#x914D;&#x7F6E;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x4E0D;&#x8981;&#x5728;<code>index.ssr.html</code>&#x4E2D;&#x5F15;&#x5165;&#x6253;&#x5305;&#x51FA;&#x7684;<code>server.bundle.js</code>&#xFF0C;&#x8981;&#x5F15;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5305;&#x7684;<code>client.bundle.js</code>&#xFF0C;&#x539F;&#x56E0;&#x524D;&#x9762;&#x8BF4;&#x8FC7;&#x4E86;&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;<code>Vue</code>&#x53EF;&#x4EE5;&#x5C06;&#x670D;&#x52A1;&#x5668;&#x5410;&#x51FA;&#x6765;&#x7684;<code>html</code>&#x8FDB;&#x884C;&#x6FC0;&#x6D3B;&#xFF0C;&#x4ECE;&#x800C;&#x63A5;&#x7BA1;&#x540E;&#x7EED;&#x54CD;&#x5E94;&#x3002;</p><p>&#x90A3;&#x4E48;&#x6253;&#x5305;&#x51FA;&#x7684;<code>server.bundle.js</code>&#x5728;&#x54EA;&#x7528;&#x5462;&#xFF1F;&#x63A5;&#x7740;&#x5F80;&#x4E0B;&#x770B;&#x5C31;&#x77E5;&#x9053;&#x5566;~~</p><p><strong>package.json</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;01&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;yarn run dev&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server&quot;,
    &quot;build:client&quot;: &quot;webpack --config config/webpack.client.config.js&quot;,
    &quot;build:server&quot;: &quot;webpack --config config/webpack.server.config.js&quot;
  },
  &quot;dependencies&quot;: {
    &quot;koa&quot;: &quot;^2.5.3&quot;,
    &quot;koa-router&quot;: &quot;^7.4.0&quot;,
    &quot;koa-static&quot;: &quot;^5.0.0&quot;,
    &quot;vue&quot;: &quot;^2.5.17&quot;,
    &quot;vue-server-renderer&quot;: &quot;^2.5.17&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;@babel/core&quot;: &quot;^7.1.2&quot;,
    &quot;@babel/preset-env&quot;: &quot;^7.1.0&quot;,
    &quot;autoprefixer&quot;: &quot;^9.1.5&quot;,
    &quot;babel-loader&quot;: &quot;^8.0.4&quot;,
    &quot;css-loader&quot;: &quot;^1.0.0&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;^4.0.0-beta.0&quot;,
    &quot;file-loader&quot;: &quot;^2.0.0&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,
    &quot;postcss&quot;: &quot;^7.0.5&quot;,
    &quot;postcss-loader&quot;: &quot;^3.0.0&quot;,
    &quot;style-loader&quot;: &quot;^0.23.0&quot;,
    &quot;url-loader&quot;: &quot;^1.1.1&quot;,
    &quot;vue-loader&quot;: &quot;^15.4.2&quot;,
    &quot;vue-style-loader&quot;: &quot;^4.1.2&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.5.17&quot;,
    &quot;webpack&quot;: &quot;^4.20.2&quot;,
    &quot;webpack-cli&quot;: &quot;^3.1.2&quot;,
    &quot;webpack-dev-server&quot;: &quot;^3.1.9&quot;,
    &quot;webpack-merge&quot;: &quot;^4.1.4&quot;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;01&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;MIT&quot;</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-string">&quot;yarn run dev&quot;</span>,
    <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server&quot;</span>,
    <span class="hljs-attr">&quot;build:client&quot;</span>: <span class="hljs-string">&quot;webpack --config config/webpack.client.config.js&quot;</span>,
    <span class="hljs-attr">&quot;build:server&quot;</span>: <span class="hljs-string">&quot;webpack --config config/webpack.server.config.js&quot;</span>
  },
  <span class="hljs-attr">&quot;dependencies&quot;</span>: {
    <span class="hljs-attr">&quot;koa&quot;</span>: <span class="hljs-string">&quot;^2.5.3&quot;</span>,
    <span class="hljs-attr">&quot;koa-router&quot;</span>: <span class="hljs-string">&quot;^7.4.0&quot;</span>,
    <span class="hljs-attr">&quot;koa-static&quot;</span>: <span class="hljs-string">&quot;^5.0.0&quot;</span>,
    <span class="hljs-attr">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>,
    <span class="hljs-attr">&quot;vue-server-renderer&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>
  },
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;@babel/core&quot;</span>: <span class="hljs-string">&quot;^7.1.2&quot;</span>,
    <span class="hljs-attr">&quot;@babel/preset-env&quot;</span>: <span class="hljs-string">&quot;^7.1.0&quot;</span>,
    <span class="hljs-attr">&quot;autoprefixer&quot;</span>: <span class="hljs-string">&quot;^9.1.5&quot;</span>,
    <span class="hljs-attr">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^8.0.4&quot;</span>,
    <span class="hljs-attr">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^1.0.0&quot;</span>,
    <span class="hljs-attr">&quot;extract-text-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^4.0.0-beta.0&quot;</span>,
    <span class="hljs-attr">&quot;file-loader&quot;</span>: <span class="hljs-string">&quot;^2.0.0&quot;</span>,
    <span class="hljs-attr">&quot;html-webpack-plugin&quot;</span>: <span class="hljs-string">&quot;^3.2.0&quot;</span>,
    <span class="hljs-attr">&quot;postcss&quot;</span>: <span class="hljs-string">&quot;^7.0.5&quot;</span>,
    <span class="hljs-attr">&quot;postcss-loader&quot;</span>: <span class="hljs-string">&quot;^3.0.0&quot;</span>,
    <span class="hljs-attr">&quot;style-loader&quot;</span>: <span class="hljs-string">&quot;^0.23.0&quot;</span>,
    <span class="hljs-attr">&quot;url-loader&quot;</span>: <span class="hljs-string">&quot;^1.1.1&quot;</span>,
    <span class="hljs-attr">&quot;vue-loader&quot;</span>: <span class="hljs-string">&quot;^15.4.2&quot;</span>,
    <span class="hljs-attr">&quot;vue-style-loader&quot;</span>: <span class="hljs-string">&quot;^4.1.2&quot;</span>,
    <span class="hljs-attr">&quot;vue-template-compiler&quot;</span>: <span class="hljs-string">&quot;^2.5.17&quot;</span>,
    <span class="hljs-attr">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^4.20.2&quot;</span>,
    <span class="hljs-attr">&quot;webpack-cli&quot;</span>: <span class="hljs-string">&quot;^3.1.2&quot;</span>,
    <span class="hljs-attr">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^3.1.9&quot;</span>,
    <span class="hljs-attr">&quot;webpack-merge&quot;</span>: <span class="hljs-string">&quot;^4.1.4&quot;</span>
  }
}
</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;<code>server</code>&#x7AEF;&#x5173;&#x4E8E;<code>http</code>&#x670D;&#x52A1;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><p><strong>server/server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;);
const Router = require(&apos;koa-router&apos;);
const serve = require(&apos;koa-static&apos;);
const path = require(&apos;path&apos;);
const fs = require(&apos;fs&apos;);
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

const bundle = fs.readFileSync(path.resolve(__dirname, &apos;../dist/server.js&apos;), &apos;utf-8&apos;);
const renderer = require(&apos;vue-server-renderer&apos;).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, &apos;../dist/index.ssr.html&apos;), &apos;utf-8&apos;)
});

// &#x540E;&#x7AEF;Server
backendRouter.get(&apos;/index&apos;, (ctx, next) =&gt; {
  // &#x8FD9;&#x91CC;&#x7528; renderToString &#x7684; promise &#x8FD4;&#x56DE;&#x7684; html &#x6709;&#x95EE;&#x9898;&#xFF0C;&#x6CA1;&#x6709;&#x6837;&#x5F0F;
  renderer.renderToString((err, html) =&gt; {
    if (err) {
      console.error(err);
      ctx.status = 500;
      ctx.body = &apos;&#x670D;&#x52A1;&#x5668;&#x5185;&#x90E8;&#x9519;&#x8BEF;&apos;;
    } else {
      console.log(html);
      ctx.status = 200;
      ctx.body = html;
    }
  });
});

backendApp.use(serve(path.resolve(__dirname, &apos;../dist&apos;)));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(3000, () =&gt; {
  console.log(&apos;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x5730;&#x5740;&#xFF1A; http://localhost:3000&apos;);
});


// &#x524D;&#x7AEF;Server
frontendRouter.get(&apos;/index&apos;, (ctx, next) =&gt; {
  let html = fs.readFileSync(path.resolve(__dirname, &apos;../dist/index.html&apos;), &apos;utf-8&apos;);
  ctx.type = &apos;html&apos;;
  ctx.status = 200;
  ctx.body = html;
});

frontendApp.use(serve(path.resolve(__dirname, &apos;../dist&apos;)));

frontendApp
  .use(frontendRouter.routes())
  .use(frontendRouter.allowedMethods());

frontendApp.listen(3001, () =&gt; {
  console.log(&apos;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x5730;&#x5740;&#xFF1A; http://localhost:3001&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>);
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>);
<span class="hljs-keyword">const</span> serve = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-static&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> backendApp = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> frontendApp = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> backendRouter = <span class="hljs-keyword">new</span> Router();
<span class="hljs-keyword">const</span> frontendRouter = <span class="hljs-keyword">new</span> Router();

<span class="hljs-keyword">const</span> bundle = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/server.js&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>);
<span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.ssr.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>)
});

<span class="hljs-comment">// &#x540E;&#x7AEF;Server</span>
backendRouter.get(<span class="hljs-string">&apos;/index&apos;</span>, <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7528; renderToString &#x7684; promise &#x8FD4;&#x56DE;&#x7684; html &#x6709;&#x95EE;&#x9898;&#xFF0C;&#x6CA1;&#x6709;&#x6837;&#x5F0F;</span>
  renderer.renderToString(<span class="hljs-function">(<span class="hljs-params">err, html</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-built_in">console</span>.error(err);
      ctx.status = <span class="hljs-number">500</span>;
      ctx.body = <span class="hljs-string">&apos;&#x670D;&#x52A1;&#x5668;&#x5185;&#x90E8;&#x9519;&#x8BEF;&apos;</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(html);
      ctx.status = <span class="hljs-number">200</span>;
      ctx.body = html;
    }
  });
});

backendApp.use(serve(path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>)));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x5730;&#x5740;&#xFF1A; http://localhost:3000&apos;</span>);
});


<span class="hljs-comment">// &#x524D;&#x7AEF;Server</span>
frontendRouter.get(<span class="hljs-string">&apos;/index&apos;</span>, <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> html = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>);
  ctx.type = <span class="hljs-string">&apos;html&apos;</span>;
  ctx.status = <span class="hljs-number">200</span>;
  ctx.body = html;
});

frontendApp.use(serve(path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>)));

frontendApp
  .use(frontendRouter.routes())
  .use(frontendRouter.allowedMethods());

frontendApp.listen(<span class="hljs-number">3001</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x5730;&#x5740;&#xFF1A; http://localhost:3001&apos;</span>);
});</code></pre><p>&#x8FD9;&#x91CC;&#x5BF9;&#x4E24;&#x4E2A;&#x7AEF;&#x53E3;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#xFF0C;3000&#x7AEF;&#x53E3;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;3001&#x7AEF;&#x53E3;&#x662F;&#x76F4;&#x63A5;&#x8F93;&#x51FA;<code>index.html</code>&#xFF0C;&#x7136;&#x540E;&#x4F1A;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8D70;<code>Vue</code>&#x7684;&#x90A3;&#x4E00;&#x5957;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x505A;&#x5BF9;&#x6BD4;&#x4F7F;&#x7528;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x7684;&#x5173;&#x952E;&#x4EE3;&#x7801;&#x662F;&#x5982;&#x4F55;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x53BB;&#x8F93;&#x51FA;<code>html</code>`&#x5B57;&#x7B26;&#x4E32;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bundle = fs.readFileSync(path.resolve(__dirname, &apos;../dist/server.bundle.js&apos;), &apos;utf-8&apos;);
const renderer = require(&apos;vue-server-renderer&apos;).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, &apos;../dist/index.ssr.html&apos;), &apos;utf-8&apos;)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">const bundle</span> = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/server.bundle.js&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>);
<span class="hljs-attribute">const renderer</span> = require(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.ssr.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>)
});</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>server.bundle.js</code>&#x5728;&#x8FD9;&#x91CC;&#x88AB;&#x4F7F;&#x7528;&#x5566;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7684;&#x5165;&#x53E3;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x6536;<code>context</code>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF08;&#x975E;&#x5FC5;&#x4F20;&#xFF09;&#xFF0C;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6839;&#x7EC4;&#x4EF6;<code>app</code>&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x4E86;<code>vue-server-renderer</code>&#x63D2;&#x4EF6;&#xFF0C;&#x5B83;&#x6709;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x505A;&#x6E32;&#x67D3;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;<code>createRenderer</code>&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;<code>createBundleRenderer</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { createRenderer } = require(&apos;vue-server-renderer&apos;)
const renderer = createRenderer({ /* &#x9009;&#x9879; */ })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { createRenderer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>)
<span class="hljs-keyword">const</span> renderer = createRenderer({ <span class="hljs-comment">/* &#x9009;&#x9879; */</span> })</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { createBundleRenderer } = require(&apos;vue-server-renderer&apos;)
const renderer = createBundleRenderer(serverBundle, { /* &#x9009;&#x9879; */ })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { createBundleRenderer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>)
<span class="hljs-keyword">const</span> renderer = createBundleRenderer(serverBundle, { <span class="hljs-comment">/* &#x9009;&#x9879; */</span> })</code></pre><p><code>createRenderer</code>&#x65E0;&#x6CD5;&#x63A5;&#x6536;&#x4E3A;&#x670D;&#x52A1;&#x7AEF;&#x6253;&#x5305;&#x51FA;&#x7684;<code>server.bundle.js</code>&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x53EA;&#x80FD;&#x7528;<code>createBundleRenderer</code>&#x3002;</p><p><code>serverBundle</code> &#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x4EE5;&#x4E0B;&#x4E4B;&#x4E00;&#xFF1A;</p><ul><li>&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#x597D;&#x7684; <code>bundle</code> &#x6587;&#x4EF6;&#xFF08;<code>.js</code> &#x6216; <code>.json</code>&#xFF09;&#x3002;&#x5FC5;&#x987B;&#x4EE5; <code>/</code> &#x5F00;&#x5934;&#x624D;&#x4F1A;&#x88AB;&#x8BC6;&#x522B;&#x4E3A;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x3002;</li><li>&#x7531; <code>webpack + vue-server-renderer/server-plugin</code> &#x751F;&#x6210;&#x7684; <code>bundle</code> &#x5BF9;&#x8C61;&#x3002;</li><li><code>JavaScript</code> &#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x4E0D;&#x63A8;&#x8350;&#xFF09;&#x3002;</li></ul><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x7684;&#x662F;.js&#x6587;&#x4EF6;&#xFF0C;&#x540E;&#x7EED;&#x4F1A;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x4F7F;&#x7528;.json&#x6587;&#x4EF6;&#x4EE5;&#x53CA;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x5904;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.renderToString((err, html) =&gt; {
    if (err) {
      console.error(err);
      ctx.status = 500;
      ctx.body = &apos;&#x670D;&#x52A1;&#x5668;&#x5185;&#x90E8;&#x9519;&#x8BEF;&apos;;
    } else {
      console.log(html);
      ctx.status = 200;
      ctx.body = html;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>renderer.renderToString((err, html) =&gt; {
    if (err) {
      console.error(err)<span class="hljs-comment">;</span>
      ctx.status = <span class="hljs-number">500</span><span class="hljs-comment">;</span>
      ctx.<span class="hljs-keyword">body </span>= <span class="hljs-string">&apos;&#x670D;&#x52A1;&#x5668;&#x5185;&#x90E8;&#x9519;&#x8BEF;&apos;</span><span class="hljs-comment">;</span>
    } else {
      console.log(html)<span class="hljs-comment">;</span>
      ctx.status = <span class="hljs-number">200</span><span class="hljs-comment">;</span>
      ctx.<span class="hljs-keyword">body </span>= html<span class="hljs-comment">;</span>
    }
})<span class="hljs-comment">;</span></code></pre><p>&#x4F7F;&#x7528;<code>createRenderer</code>&#x548C;<code>createBundleRenderer</code>&#x8FD4;&#x56DE;&#x7684;<code>renderer</code>&#x51FD;&#x6570;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;<code>renderToString</code>&#x548C;<code>renderToStream</code>&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x7528;&#x7684;&#x662F;<code>renderToString</code>&#x6210;&#x529F;&#x540E;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;<code>renderToStream</code>&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;<code>Node</code>&#x6D41;&#x3002;</p><p><code>renderToString</code>&#x652F;&#x6301;<code>Promise</code>&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x5728;&#x4F7F;&#x7528;<code>Prmoise</code>&#x5F62;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x6837;&#x5F0F;&#x4F1A;&#x6E32;&#x67D3;&#x4E0D;&#x51FA;&#x6765;&#xFF0C;&#x6682;&#x65F6;&#x8FD8;&#x4E0D;&#x77E5;&#x9053;&#x539F;&#x56E0;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x7ED9;&#x6211;&#x7559;&#x8A00;&#x554A;&#x3002;</p><p>&#x914D;&#x7F6E;&#x57FA;&#x672C;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x8FD0;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run build:client       // &#x6253;&#x5305;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x9700;&#x8981;bundle
yarn run build:server       // &#x6253;&#x5305;SSR&#x9700;&#x8981;bundle

yarn start      // &#x5176;&#x5B9E;&#x5C31;&#x662F; node server/server.js&#xFF0C;&#x63D0;&#x4F9B;http&#x670D;&#x52A1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">run</span><span class="bash"> build:client       // &#x6253;&#x5305;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x9700;&#x8981;bundle
</span>yarn <span class="hljs-keyword">run</span><span class="bash"> build:server       // &#x6253;&#x5305;SSR&#x9700;&#x8981;bundle
</span>
yarn start      // &#x5176;&#x5B9E;&#x5C31;&#x662F; node server/server.js&#xFF0C;&#x63D0;&#x4F9B;http&#x670D;&#x52A1;</code></pre><p>&#x6700;&#x7EC8;&#x6548;&#x679C;&#x5C55;&#x793A;&#xFF1A;</p><p>&#x8BBF;&#x95EE;<code>http://localhost:3000/index</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636660?w=1597&amp;h=672" src="https://static.alili.tech/img/remote/1460000016636660?w=1597&amp;h=672" alt="SSR&#x6CA1;&#x6709;ajax&#x6570;&#x636E;" title="SSR&#x6CA1;&#x6709;ajax&#x6570;&#x636E;" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4E86;&#x524D;&#x9762;&#x63D0;&#x8FC7;&#x7684;<code>data-server-rendered=&quot;true&quot;</code>&#x5C5E;&#x6027;&#xFF0C;&#x540C;&#x65F6;&#x4F1A;&#x52A0;&#x8F7D;<code>client.bundle.js</code>&#x6587;&#x4EF6;&#xFF0C;&#x4E3A;&#x4E86;&#x8BA9;<code>Vue</code>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x505A;&#x540E;&#x7EED;&#x63A5;&#x7BA1;&#x3002;</p><p>&#x8BBF;&#x95EE;<code>http://localhost:3001/index</code>&#x8FD8;&#x548C;&#x7B2C;&#x4E00;&#x6B65;&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#x4E00;&#x6837;&#xFF0C;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x653E;&#x622A;&#x56FE;&#x4E86;&#x3002;</p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/02" rel="nofollow noreferrer" target="_blank">github</a></p><h3 id="articleHeader4">3. &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF0C;&#x5305;&#x542B;Ajax&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</h3><p>&#x5982;&#x679C;SSR&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x4E48;&#x6D41;&#x7A0B;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x590D;&#x6742;&#x4E00;&#x4E9B;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x63D0;&#x51FA;&#x51E0;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x670D;&#x52A1;&#x7AEF;&#x62FF;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x7684;&#x6B65;&#x9AA4;&#x5728;&#x54EA;&#x505A;&#xFF1F;</li><li>&#x5982;&#x4F55;&#x786E;&#x5B9A;&#x54EA;&#x4E9B;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x6570;&#x636E;&#xFF1F;</li><li>&#x83B7;&#x53D6;&#x5230;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x4E4B;&#x540E;&#x8981;&#x5982;&#x4F55;&#x585E;&#x56DE;&#x5230;&#x7EC4;&#x4EF6;&#x5185;&#xFF1F;</li></ol><p>&#x5E26;&#x7740;&#x95EE;&#x9898;&#x6211;&#x4EEC;&#x5411;&#x4E0B;&#x8D70;&#xFF0C;&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x65F6;&#x5019;&#x4E0A;&#x9762;&#x7684;&#x95EE;&#x9898;&#x4F60;&#x90FD;&#x627E;&#x5230;&#x4E86;&#x7B54;&#x6848;&#x3002;</p><p>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x7ECF;&#x8FC7;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x662F;&#x6709;&#x533A;&#x522B;&#x7684;&#xFF0C;<strong>&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#xFF0C;&#x53EA;&#x4F1A;&#x7ECF;&#x5386;<code>beforeCreate</code>&#x548C;<code>created</code>&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;</strong>&#x3002;&#x56E0;&#x4E3A;SSR&#x670D;&#x52A1;&#x5668;&#x76F4;&#x63A5;&#x5410;&#x51FA;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#x5C31;&#x597D;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x6E32;&#x67D3;DOM&#x7ED3;&#x6784;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5B58;&#x5728;<code>beforeMount</code>&#x548C;<code>mounted</code>&#x7684;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x5C31;&#x4E0D;&#x5B58;&#x5728;<code>beforeUpdate</code>&#x548C;<code>updated</code>&#x7B49;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x60F3;&#x4E00;&#x4E0B;&#xFF0C;&#x5728;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x7684;<code>Vue</code>&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x600E;&#x4E48;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x5E76;&#x6E32;&#x67D3;&#x5230;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#xFF1F;&#x4E00;&#x822C;&#x662F;&#x5728;<code>created</code>&#x6216;&#x8005;<code>mounted</code>&#x751F;&#x547D;&#x5468;&#x671F;&#x91CC;&#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6210;&#x529F;&#x56DE;&#x8C03;&#x91CC;&#x6267;&#x884C;<code>this.data = xxx</code>&#xFF0C;<code>Vue</code>&#x76D1;&#x542C;&#x5230;&#x6570;&#x636E;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x8D70;&#x540E;&#x9762;&#x7684;<code>Dom Diff</code>&#xFF0C;&#x6253;<code>patch</code>&#xFF0C;&#x505A;<code>DOM</code>&#x66F4;&#x65B0;&#x3002;</p><p>&#x90A3;&#x4E48;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x53EF;&#x4E0D;&#x53EF;&#x4EE5;&#x4E5F;&#x8FD9;&#x4E48;&#x505A;&#x5462;&#xFF1F;<strong>&#x7B54;&#x6848;&#x662F;&#x4E0D;&#x884C;&#x7684;</strong>&#x3002;</p><ol><li>&#x5728;<code>mounted</code>&#x91CC;&#x80AF;&#x5B9A;&#x4E0D;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;<code>SSR</code>&#x90FD;&#x6CA1;&#x6709;<code>mounted</code>&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8FD9;&#x91CC;&#x80AF;&#x5B9A;&#x4E0D;&#x884C;&#x3002;</li><li>&#x5728;<code>beforeCreate</code>&#x91CC;&#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x5462;&#xFF0C;&#x4E5F;&#x662F;&#x4E0D;&#x884C;&#x7684;&#x3002;&#x56E0;&#x4E3A;&#x8BF7;&#x6C42;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x6CA1;&#x6709;&#x7B49;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x5C31;&#x5DF2;&#x7ECF;&#x628A;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x51FA;&#x6765;&#x4E86;&#x3002;</li></ol><p>&#x6240;&#x4EE5;&#xFF0C;&#x53C2;&#x8003;&#x4E00;&#x4E0B;<a href="https://ssr.vuejs.org/guide/data.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x4EE5;&#x4E0B;&#x601D;&#x8DEF;&#xFF1A;</p><ol><li>&#x5728;&#x6E32;&#x67D3;&#x524D;&#xFF0C;&#x8981;&#x9884;&#x5148;&#x83B7;&#x53D6;&#x6240;&#x6709;&#x9700;&#x8981;&#x7684;&#x5F02;&#x6B65;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x5B58;&#x5230;<code>Vuex</code>&#x7684;<code>store</code>&#x4E2D;&#x3002;</li><li>&#x5728;&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;<code>Vuex</code>&#x5C06;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x6CE8;&#x5165;&#x5230;&#x76F8;&#x5E94;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</li><li>&#x628A;<code>store</code>&#x4E2D;&#x7684;&#x6570;&#x636E;&#x8BBE;&#x7F6E;&#x5230;<code>window.__INITIAL_STATE__</code>&#x5C5E;&#x6027;&#x4E2D;&#x3002;</li><li>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>Vuex</code>&#x5C06;<code>window.__INITIAL_STATE__</code>&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x6CE8;&#x5165;&#x5230;&#x76F8;&#x5E94;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</li></ol><p>&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x5410;&#x51FA;&#x6765;&#x7684;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#x76F8;&#x5E94;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x90FD;&#x662F;&#x6700;&#x65B0;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x7B2C;4&#x6B65;&#x5E76;&#x4E0D;&#x4F1A;&#x5F15;&#x8D77;<code>DOM</code>&#x66F4;&#x65B0;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x51FA;&#x4E86;&#x67D0;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5410;&#x51FA;&#x6765;&#x7684;<code>html</code>&#x5B57;&#x7B26;&#x4E32;&#x6CA1;&#x6709;&#x76F8;&#x5E94;&#x6570;&#x636E;&#xFF0C;<code>Vue</code>&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x901A;&#x8FC7;<code>`Vuex</code>&#x6CE8;&#x5165;&#x6570;&#x636E;&#xFF0C;&#x8FDB;&#x884C;<code>DOM</code>&#x66F4;&#x65B0;&#x3002;</p><p><strong>&#x66F4;&#x65B0;&#x540E;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- node_modules
- config
   - webpack.base.config.js
   - webpack.client.config.js
   - webpack.server.config.js
- src
   - components  
       - Bar.vue
       - Foo.vue
   - store             // &#x65B0;&#x589E;
       store.js
   - App.vue
   - app.js
   - entry-client.js
   - entry-server.js   
   - index.html
   - index.ssr.html
- package.json
- yarn.lock
- postcss.config.js
- .babelrc
- .gitignore" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> node_modules
</span>-<span class="ruby"> config
</span>   -<span class="ruby"> webpack.base.config.js
</span>   -<span class="ruby"> webpack.client.config.js
</span>   -<span class="ruby"> webpack.server.config.js
</span>-<span class="ruby"> src
</span>   -<span class="ruby"> components  
</span>       -<span class="ruby"> Bar.vue
</span>       -<span class="ruby"> Foo.vue
</span>   -<span class="ruby"> store             /<span class="hljs-regexp">/ &#x65B0;&#x589E;
</span></span>       store.js
   -<span class="ruby"><span class="hljs-regexp"> App.vue
</span></span>   -<span class="ruby"><span class="hljs-regexp"> app.js
</span></span>   -<span class="ruby"><span class="hljs-regexp"> entry-client.js
</span></span>   -<span class="ruby"><span class="hljs-regexp"> entry-server.js   
</span></span>   -<span class="ruby"><span class="hljs-regexp"> index.html
</span></span>   -<span class="ruby"><span class="hljs-regexp"> index.ssr.html
</span></span>-<span class="ruby"><span class="hljs-regexp"> package.json
</span></span>-<span class="ruby"><span class="hljs-regexp"> yarn.lock
</span></span>-<span class="ruby"><span class="hljs-regexp"> postcss.config.js
</span></span>-<span class="ruby"><span class="hljs-regexp"> .babelrc
</span></span>-<span class="ruby"><span class="hljs-regexp"> .gitignore</span></span></code></pre><p>&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>store.js</code>:</p><p><strong>store/store.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;

Vue.use(Vuex);

const fetchBar = function() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      resolve(&apos;bar &#x7EC4;&#x4EF6;&#x8FD4;&#x56DE; ajax &#x6570;&#x636E;&apos;);
    }, 1000);
  });
};

function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: &apos;&apos;
    },

    mutations: {
      &apos;SET_BAR&apos;(state, data) {
        state.bar = data;
      }
    },

    actions: {
      fetchBar({ commit }) {
        return fetchBar().then((data) =&gt; {
          commit(&apos;SET_BAR&apos;, data);
        }).catch((err) =&gt; {
          console.error(err);
        })
      }
    }
  });

  if (typeof window !== &apos;undefined&apos; &amp;&amp; window.__INITIAL_STATE__) {
    console.log(&apos;window.__INITIAL_STATE__&apos;, window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }
  
  return store;
}

export default createStore;

typeof window" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>;

Vue.use(Vuex);

<span class="hljs-keyword">const</span> fetchBar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(<span class="hljs-string">&apos;bar &#x7EC4;&#x4EF6;&#x8FD4;&#x56DE; ajax &#x6570;&#x636E;&apos;</span>);
    }, <span class="hljs-number">1000</span>);
  });
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>: {
      <span class="hljs-attr">bar</span>: <span class="hljs-string">&apos;&apos;</span>
    },

    <span class="hljs-attr">mutations</span>: {
      <span class="hljs-string">&apos;SET_BAR&apos;</span>(state, data) {
        state.bar = data;
      }
    },

    <span class="hljs-attr">actions</span>: {
      fetchBar({ commit }) {
        <span class="hljs-keyword">return</span> fetchBar().then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
          commit(<span class="hljs-string">&apos;SET_BAR&apos;</span>, data);
        }).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          <span class="hljs-built_in">console</span>.error(err);
        })
      }
    }
  });

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;window.__INITIAL_STATE__&apos;</span>, <span class="hljs-built_in">window</span>.__INITIAL_STATE__);
    store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__);
  }
  
  <span class="hljs-keyword">return</span> store;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createStore;

<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span></code></pre><p>&#x5982;&#x679C;&#x4E0D;&#x592A;&#x4E86;&#x89E3;<code>Vuex</code>&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;<a href="https://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vuex&#x5B98;&#x7F51;</a>&#x5148;&#x770B;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x6982;&#x5FF5;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016145588?w=701&amp;h=551" src="https://static.alili.tech/img/remote/1460000016145588?w=701&amp;h=551" alt="vuex" title="vuex" style="cursor:pointer"></span></p><p>&#x8FD9;&#x91CC;<code>fetchBar</code>&#x53EF;&#x4EE5;&#x770B;&#x6210;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD9;&#x91CC;&#x7528;<code>setTimeout</code>&#x6A21;&#x62DF;&#x3002;&#x5728;&#x6210;&#x529F;&#x56DE;&#x8C03;&#x4E2D;<code>commit</code>&#x76F8;&#x5E94;&#x7684;<code>mutation</code>&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x4FEE;&#x6539;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x6BB5;&#x5173;&#x952E;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof window !== &apos;undefined&apos; &amp;&amp; window.__INITIAL_STATE__) {
    console.log(&apos;window.__INITIAL_STATE__&apos;, window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;window.__INITIAL_STATE__&apos;</span>, <span class="hljs-built_in">window</span>.__INITIAL_STATE__);
    store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__);
}</code></pre><p>&#x56E0;&#x4E3A;<code>store.js</code>&#x540C;&#x6837;&#x4E5F;&#x4F1A;&#x88AB;&#x6253;&#x5305;&#x5230;&#x670D;&#x52A1;&#x5668;&#x8FD0;&#x884C;&#x7684;<code>server.bundle.js</code>&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5BF9;<code>window</code>&#x505A;&#x5224;&#x65AD;&#xFF0C;&#x9632;&#x6B62;&#x62A5;&#x9519;&#xFF0C;&#x540C;&#x65F6;&#x5982;&#x679C;&#x6709;<code>window.__INITIAL_STATE__</code>&#x5C5E;&#x6027;&#xFF0C;&#x8BF4;&#x660E;&#x670D;&#x52A1;&#x5668;&#x5DF2;&#x7ECF;&#x628A;&#x6240;&#x6709;&#x521D;&#x59CB;&#x5316;&#x9700;&#x8981;&#x7684;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x90FD;&#x83B7;&#x53D6;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x8981;&#x5BF9;<code>store</code>&#x4E2D;&#x7684;&#x72B6;&#x6001;&#x505A;&#x4E00;&#x4E2A;&#x66FF;&#x6362;&#xFF0C;&#x4FDD;&#x8BC1;&#x7EDF;&#x4E00;&#x3002;</p><p><strong>components/Bar.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;bar&quot;&gt;
    &lt;h1 @click=&quot;onHandleClick&quot;&gt;Bar Component&lt;/h1&gt;
    &lt;h2&gt;&#x5F02;&#x6B65;Ajax&#x6570;&#x636E;&#xFF1A;&lt;/h2&gt;
    &lt;span&gt;{{ msg }}&lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  const fetchInitialData = ({ store }) =&gt; {
    store.dispatch(&apos;fetchBar&apos;);
  };

  export default {
    asyncData: fetchInitialData,

    methods: {
      onHandleClick() {
        alert(&apos;bar&apos;);
      }
    },

    mounted() {
      // &#x56E0;&#x4E3A;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x53EA;&#x6709; beforeCreate &#x548C; created &#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x4E0D;&#x4F1A;&#x8D70;&#x8FD9;&#x91CC;
      // &#x6240;&#x4EE5;&#x628A;&#x8C03;&#x7528; Ajax &#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x4E5F;&#x5199;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x4F9B;&#x5355;&#x72EC;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x4F7F;&#x7528;
      let store = this.$store;
      fetchInitialData({ store });
    },

    computed: {
      msg() {
        return this.$store.state.bar;
      }
    }
  }
&lt;/script&gt;

&lt;style&gt;
.bar {
  background: bisque;
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onHandleClick&quot;</span>&gt;</span>Bar Component<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x5F02;&#x6B65;Ajax&#x6570;&#x636E;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">const</span> fetchInitialData = <span class="hljs-function">(<span class="hljs-params">{ store }</span>) =&gt;</span> {
    store.dispatch(<span class="hljs-string">&apos;fetchBar&apos;</span>);
  };

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">asyncData</span>: fetchInitialData,

    <span class="hljs-attr">methods</span>: {
      onHandleClick() {
        alert(<span class="hljs-string">&apos;bar&apos;</span>);
      }
    },

    mounted() {
      <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x53EA;&#x6709; beforeCreate &#x548C; created &#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x4E0D;&#x4F1A;&#x8D70;&#x8FD9;&#x91CC;</span>
      <span class="hljs-comment">// &#x6240;&#x4EE5;&#x628A;&#x8C03;&#x7528; Ajax &#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x4E5F;&#x5199;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x4F9B;&#x5355;&#x72EC;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x4F7F;&#x7528;</span>
      <span class="hljs-keyword">let</span> store = <span class="hljs-keyword">this</span>.$store;
      fetchInitialData({ store });
    },

    <span class="hljs-attr">computed</span>: {
      msg() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.bar;
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.bar</span> {
  <span class="hljs-attribute">background</span>: bisque;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre><p>&#x8FD9;&#x91CC;&#x5728;<code>Bar</code>&#x7EC4;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x5BFC;&#x51FA;&#x5BF9;&#x8C61;&#x4E2D;&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;<code>asyncData</code>&#xFF0C;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x4E2D;&#x4F1A;<code>dispatch</code>&#x76F8;&#x5E94;&#x7684;<code>action</code>&#xFF0C;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x83B7;&#x53D6;&#x3002;</p><p><strong>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x5728;<code>mounted</code>&#x4E2D;&#x4E5F;&#x5199;&#x4E86;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</strong> &#x56E0;&#x4E3A;&#x60F3;&#x8981;&#x505A;&#x5230;&#x540C;&#x6784;&#xFF0C;&#x4EE3;&#x7801;&#x5355;&#x72EC;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8FD0;&#x884C;&#xFF0C;&#x4E5F;&#x5E94;&#x8BE5;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x53C8;&#x7531;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x6CA1;&#x6709;<code>mounted</code>&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x5199;&#x5728;&#x8FD9;&#x91CC;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x5355;&#x72EC;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4F7F;&#x7528;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x8D77;&#x540C;&#x6837;&#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x53BB;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x3002;</p><p><strong>components/Foo.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;foo&quot;&gt;
    &lt;h1 @click=&quot;onHandleClick&quot;&gt;Foo Component&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  methods: {
    onHandleClick() {
      alert(&apos;foo&apos;);
    }
  },
}
&lt;/script&gt;

&lt;style&gt;
.foo {
  background: yellowgreen;
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;foo&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onHandleClick&quot;</span>&gt;</span>Foo Component<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    onHandleClick() {
      alert(<span class="hljs-string">&apos;foo&apos;</span>);
    }
  },
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.foo</span> {
  <span class="hljs-attribute">background</span>: yellowgreen;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x5BF9;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E3A;&#x7684;&#x662F;&#x8BC1;&#x660E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x5410;&#x51FA;&#x9996;&#x9875;<code>html</code>&#x540E;&#xFF0C;&#x540E;&#x7EED;&#x7684;&#x6B65;&#x9AA4;&#x90FD;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;<code>Vue</code>&#x63A5;&#x7BA1;&#xFF0C;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x6267;&#x884C;&#x540E;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p><strong>app.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import createStore from &apos;./store/store.js&apos;;
import App from &apos;./App.vue&apos;;

export function createApp() {
  const store = createStore();

  const app = new Vue({
    store,
    render: h =&gt; h(App)
  });

  return { app, store, App };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> createStore <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store/store.js&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> store = createStore();

  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    store,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
  });

  <span class="hljs-keyword">return</span> { app, store, App };
}</code></pre><p>&#x5728;&#x5EFA;&#x7ACB;&#x6839;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8981;&#x628A;<code>Vuex&#x7684;store</code>&#x4F20;&#x8FDB;&#x53BB;&#xFF0C;&#x540C;&#x65F6;&#x8981;&#x8FD4;&#x56DE;&#xFF0C;&#x540E;&#x7EED;&#x4F1A;&#x7528;&#x5230;&#x3002;</p><p>&#x6700;&#x540E;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>entry-server.js</code>&#xFF0C;&#x5173;&#x952E;&#x6B65;&#x9AA4;&#x5728;&#x8FD9;&#x91CC;&#xFF1A;</p><p><strong>entry-server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createApp } from &apos;./app.js&apos;;

export default context =&gt; {
  return new Promise((resolve, reject) =&gt; {
    const { app, store, App } = createApp();

    let components = App.components;
    let asyncDataPromiseFns = [];
  
    Object.values(components).forEach(component =&gt; {
      if (component.asyncData) {
        asyncDataPromiseFns.push(component.asyncData({ store }));
      }
    });
  
    Promise.all(asyncDataPromiseFns).then((result) =&gt; {
      // &#x5F53;&#x4F7F;&#x7528; template &#x65F6;&#xFF0C;context.state &#x5C06;&#x4F5C;&#x4E3A; window.__INITIAL_STATE__ &#x72B6;&#x6001;&#xFF0C;&#x81EA;&#x52A8;&#x5D4C;&#x5165;&#x5230;&#x6700;&#x7EC8;&#x7684; HTML &#x4E2D;
      context.state = store.state;
  
      console.log(222);
      console.log(store.state);
      console.log(context.state);
      console.log(context);
  
      resolve(app);
    }, reject);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>import { createApp } <span class="hljs-keyword">from</span> &apos;./app.js&apos;;

export <span class="hljs-keyword">default</span> context =&gt; {
  return new Promise((resolve, reject) =&gt; {
    const { app, store, App } = createApp();

    let components = App.components;
    let asyncDataPromiseFns = [];
  
    Object.values(components).<span class="hljs-keyword">for</span>Each(component =&gt; {
      if (component.asyncData) {
        asyncDataPromiseFns.push(component.asyncData({ store }));
      }
    });
  
    Promise.<span class="hljs-literal">all</span>(asyncDataPromiseFns).then((result) =&gt; {
      // &#x5F53;&#x4F7F;&#x7528; template &#x65F6;&#xFF0C;context.<span class="hljs-keyword">state</span> &#x5C06;&#x4F5C;&#x4E3A; window.__INITIAL_STATE__ &#x72B6;&#x6001;&#xFF0C;&#x81EA;&#x52A8;&#x5D4C;&#x5165;&#x5230;&#x6700;&#x7EC8;&#x7684; HTML &#x4E2D;
      context.<span class="hljs-keyword">state</span> = store.<span class="hljs-keyword">state</span>;
  
      console.<span class="hljs-keyword">log</span>(<span class="hljs-number">222</span>);
      console.<span class="hljs-keyword">log</span>(store.<span class="hljs-keyword">state</span>);
      console.<span class="hljs-keyword">log</span>(context.<span class="hljs-keyword">state</span>);
      console.<span class="hljs-keyword">log</span>(context);
  
      resolve(app);
    }, reject);
  });
}</code></pre><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x5BFC;&#x51FA;&#x7684;<code>App</code>&#x62FF;&#x5230;&#x4E86;&#x6240;&#x6709;&#x5B83;&#x4E0B;&#x9762;&#x7684;<code>components</code>&#xFF0C;&#x7136;&#x540E;&#x904D;&#x5386;&#xFF0C;&#x627E;&#x51FA;&#x54EA;&#x4E9B;<code>component</code>&#x6709;<code>asyncData</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6709;&#x7684;&#x8BDD;&#x8C03;&#x7528;&#x5E76;&#x4F20;&#x5165;<code>store</code>&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>Promise.all</code>&#x7B49;&#x6240;&#x6709;&#x7684;&#x5F02;&#x6B65;&#x65B9;&#x6CD5;&#x90FD;&#x6210;&#x529F;&#x8FD4;&#x56DE;&#xFF0C;&#x624D;<code>resolve(app)</code>&#x3002;</p><p><code>context.state = store.state</code>&#x4F5C;&#x7528;&#x662F;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;<code>createBundleRenderer</code>&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;<code>template</code>&#x9009;&#x9879;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x628A;<code>context.state</code>&#x7684;&#x503C;&#x4F5C;&#x4E3A;<code>window.__INITIAL_STATE__</code>&#x81EA;&#x52A8;&#x63D2;&#x5165;&#x5230;&#x6A21;&#x677F;<code>html</code>&#x4E2D;&#x3002;</p><p><strong>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5927;&#x5BB6;&#x591A;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#xFF0C;&#x5F04;&#x6E05;&#x695A;&#x6574;&#x4E2A;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x903B;&#x8F91;&#x3002;</strong></p><p>&#x5982;&#x4F55;&#x8FD0;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run build:client
yarn run build:server

yarn start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">run</span><span class="bash"> build:client
</span>yarn <span class="hljs-keyword">run</span><span class="bash"> build:server
</span>
yarn start</code></pre><p>&#x6700;&#x7EC8;&#x6548;&#x679C;&#x622A;&#x56FE;&#xFF1A;</p><p><strong>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;&#x6253;&#x5F00;<code>http://localhost:3000/index</code></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636661?w=1596&amp;h=733" src="https://static.alili.tech/img/remote/1460000016636661?w=1596&amp;h=733" alt="server-remder-ajax" title="server-remder-ajax" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>window.__INITIAL_STATE__</code>&#x88AB;&#x81EA;&#x52A8;&#x63D2;&#x5165;&#x4E86;&#x3002;</p><p>&#x6211;&#x4EEC;&#x6765;&#x5BF9;&#x6BD4;&#x4E00;&#x4E0B;<code>SSR</code>&#x5230;&#x5E95;&#x5BF9;&#x52A0;&#x8F7D;&#x6027;&#x80FD;&#x6709;&#x4EC0;&#x4E48;&#x5F71;&#x54CD;&#x5427;&#x3002;</p><p><strong>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x65F6;<code>performance</code>&#x622A;&#x56FE;</strong>&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636662?w=1597&amp;h=763" src="https://static.alili.tech/img/remote/1460000016636662?w=1597&amp;h=763" alt="sercer_render_ajax_performance" title="sercer_render_ajax_performance" style="cursor:pointer"></span></p><p><strong>&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x65F6;<code>performance</code>&#x622A;&#x56FE;</strong>&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636663?w=1596&amp;h=765" src="https://static.alili.tech/img/remote/1460000016636663?w=1596&amp;h=765" alt="client_render_ajax_performance" title="client_render_ajax_performance" style="cursor:pointer;display:inline"></span></p><p>&#x540C;&#x6837;&#x90FD;&#x662F;&#x5728;<code>fast 3G</code>&#x7F51;&#x7EDC;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x82B1;&#x8D39;&#x65F6;&#x95F4;<strong>2.9s</strong>&#xFF0C;&#x56E0;&#x4E3A;<code>client.js</code>&#x52A0;&#x8F7D;&#x5C31;&#x82B1;&#x8D39;&#x4E86;<strong>2.27s</strong>&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;<code>client.js</code>&#x5C31;&#x6CA1;&#x6709;<code>Vue</code>&#xFF0C;&#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x540E;&#x9762;&#x7684;&#x4E1C;&#x897F;&#x4E86;&#x3002;</p><p>&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x9996;&#x5C4F;&#x65F6;&#x95F4;&#x82B1;&#x8D39;<strong>0.8s</strong>&#xFF0C;&#x867D;&#x7136;<code>client.js</code>&#x52A0;&#x8F7D;&#x6254;&#x82B1;&#x8D39;<code>2.27s</code>&#xFF0C;&#x4F46;&#x662F;&#x9996;&#x5C4F;&#x5DF2;&#x7ECF;&#x4E0D;&#x9700;&#x8981;&#x5B83;&#x4E86;&#xFF0C;&#x5B83;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;<code>Vue</code>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8FDB;&#x884C;&#x540E;&#x7EED;&#x63A5;&#x7BA1;&#x3002;</p><p>&#x4ECE;&#x8FD9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x771F;&#x6B63;&#x7684;&#x770B;&#x5230;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x5BF9;&#x4E8E;&#x63D0;&#x5347;&#x9996;&#x5C4F;&#x7684;&#x54CD;&#x5E94;&#x901F;&#x5EA6;&#x662F;&#x5F88;&#x6709;&#x4F5C;&#x7528;&#x7684;&#x3002;</p><p>&#x5F53;&#x7136;&#x6709;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x95EE;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x83B7;&#x53D6;&#x521D;&#x59CB;<code>ajax</code>&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x5EF6;&#x65F6;&#x4E86;1s&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x7528;&#x6237;&#x4E5F;&#x662F;&#x770B;&#x4E0D;&#x5230;&#x9875;&#x9762;&#x7684;&#x3002;&#x6CA1;&#x9519;&#xFF0C;&#x63A5;&#x53E3;&#x7684;&#x65F6;&#x95F4;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x907F;&#x514D;&#xFF0C;&#x5C31;&#x7B97;&#x662F;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#xFF0C;&#x9996;&#x9875;&#x8BE5;&#x8C03;&#x63A5;&#x53E3;&#x8FD8;&#x662F;&#x5F97;&#x8C03;&#xFF0C;&#x5982;&#x679C;&#x63A5;&#x53E3;&#x54CD;&#x5E94;&#x6162;&#xFF0C;&#x90A3;&#x4E48;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x770B;&#x5230;&#x5B8C;&#x6574;&#x9875;&#x9762;&#x7684;&#x65F6;&#x95F4;&#x4F1A;&#x66F4;&#x6162;&#x3002;</p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/03" rel="nofollow noreferrer" target="_blank">github</a></p><h2 id="articleHeader5">4. &#x4F7F;&#x7528;serverBundle&#x548C;clientManifest&#x8FDB;&#x884C;&#x4F18;&#x5316;</h2><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;<code>renderer</code>&#x7684;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bundle = fs.readFileSync(path.resolve(__dirname, &apos;../dist/server.js&apos;), &apos;utf-8&apos;);
const renderer = require(&apos;vue-server-renderer&apos;).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, &apos;../dist/index.ssr.html&apos;), &apos;utf-8&apos;)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">const bundle</span> = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/server.js&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>);
<span class="hljs-attribute">const renderer</span> = require(<span class="hljs-string">&apos;vue-server-renderer&apos;</span>).createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.ssr.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>)
});</code></pre><p><code>serverBundle</code>&#x6211;&#x4EEC;&#x7528;&#x7684;&#x662F;&#x6253;&#x5305;&#x51FA;&#x7684;<code>server.bundle.js</code>&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x8BDD;&#xFF0C;&#x5728;&#x6BCF;&#x6B21;&#x7F16;&#x8F91;&#x8FC7;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6E90;&#x4EE3;&#x7801;&#x4E4B;&#x540E;&#xFF0C;&#x90FD;&#x5FC5;&#x987B;&#x505C;&#x6B62;&#x5E76;&#x91CD;&#x542F;&#x670D;&#x52A1;&#x3002;&#x8FD9;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x5F71;&#x54CD;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;&#x6B64;&#x5916;&#xFF0C;Node.js &#x672C;&#x8EAB;&#x4E0D;&#x652F;&#x6301; source map&#x3002;</p><p><code>vue-server-renderer</code> &#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; <code>createBundleRenderer</code> &#x7684; API&#xFF0C;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x6B64;&#x95EE;&#x9898;&#xFF0C;&#x901A;&#x8FC7;&#x4F7F;&#x7528; <code>webpack</code> &#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x63D2;&#x4EF6;&#xFF0C;<code>server bundle</code> &#x5C06;&#x751F;&#x6210;&#x4E3A;&#x53EF;&#x4F20;&#x9012;&#x5230; <code>bundle renderer</code> &#x7684;&#x7279;&#x6B8A; <code>JSON</code> &#x6587;&#x4EF6;&#x3002;&#x6240;&#x521B;&#x5EFA;&#x7684; <code>bundle renderer</code>&#xFF0C;&#x7528;&#x6CD5;&#x548C;&#x666E;&#x901A; <code>renderer</code> &#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x662F; <code>bundle renderer</code> &#x63D0;&#x4F9B;&#x4EE5;&#x4E0B;&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x5185;&#x7F6E;&#x7684; <code>source map</code> &#x652F;&#x6301;&#xFF08;&#x5728; <code>webpack</code> &#x914D;&#x7F6E;&#x4E2D;&#x4F7F;&#x7528; <code>devtool: &apos;source-map&apos;</code>&#xFF09;</li><li>&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x751A;&#x81F3;&#x90E8;&#x7F72;&#x8FC7;&#x7A0B;&#x4E2D;&#x70ED;&#x91CD;&#x8F7D;&#xFF08;&#x901A;&#x8FC7;&#x8BFB;&#x53D6;&#x66F4;&#x65B0;&#x540E;&#x7684; <code>bundle</code>&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x65B0;&#x521B;&#x5EFA; <code>renderer</code> &#x5B9E;&#x4F8B;&#xFF09;</li><li>&#x5173;&#x952E; <code>CSS(critical CSS)</code> &#x6CE8;&#x5165;&#xFF08;&#x5728;&#x4F7F;&#x7528; <code>*.vue</code> &#x6587;&#x4EF6;&#x65F6;&#xFF09;&#xFF1A;&#x81EA;&#x52A8;&#x5185;&#x8054;&#x5728;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;&#x4E2D;&#x7528;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x6240;&#x9700;&#x7684;<code>CSS</code>&#x3002;&#x66F4;&#x591A;&#x7EC6;&#x8282;&#x8BF7;&#x67E5;&#x770B; <code>CSS</code> &#x7AE0;&#x8282;&#x3002;</li><li>&#x4F7F;&#x7528; <code>clientManifest</code> &#x8FDB;&#x884C;&#x8D44;&#x6E90;&#x6CE8;&#x5165;&#xFF1A;&#x81EA;&#x52A8;&#x63A8;&#x65AD;&#x51FA;&#x6700;&#x4F73;&#x7684;&#x9884;&#x52A0;&#x8F7D;(<code>preload</code>)&#x548C;&#x9884;&#x53D6;(<code>prefetch</code>)&#x6307;&#x4EE4;&#xFF0C;&#x4EE5;&#x53CA;&#x521D;&#x59CB;&#x6E32;&#x67D3;&#x6240;&#x9700;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x5272; <code>chunk</code>&#x3002;</li></ul><p><code>preload</code>&#x548C;<code>prefetch</code>&#x6709;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x67E5;&#x4E00;&#x4E0B;&#x5B83;&#x4EEC;&#x7684;&#x4F5C;&#x7528;&#x54C8;&#x3002;</p><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x6765;&#x4FEE;&#x6539;<code>webpack</code>&#x914D;&#x7F6E;&#xFF1A;</p><p><strong>webpack.client.config.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const merge = require(&apos;webpack-merge&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const VueSSRClientPlugin = require(&apos;vue-server-renderer/client-plugin&apos;);
const base = require(&apos;./webpack.base.config&apos;);

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, &apos;../src/entry-client.js&apos;)
  },

  plugins: [
    new VueSSRClientPlugin(),   // &#x65B0;&#x589E;
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../src/index.html&apos;),
      filename: &apos;index.html&apos;
    })
  ]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> VueSSRClientPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer/client-plugin&apos;</span>);
<span class="hljs-keyword">const</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.config&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(base, {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">client</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/entry-client.js&apos;</span>)
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> VueSSRClientPlugin(),   <span class="hljs-comment">// &#x65B0;&#x589E;</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/index.html&apos;</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.html&apos;</span>
    })
  ]
});</code></pre><p><strong>webpack.server.config.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const merge = require(&apos;webpack-merge&apos;);
const nodeExternals = require(&apos;webpack-node-externals&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
const VueSSRServerPlugin = require(&apos;vue-server-renderer/server-plugin&apos;);
const base = require(&apos;./webpack.base.config&apos;);

module.exports = merge(base, {
  target: &apos;node&apos;,
   // &#x5BF9; bundle renderer &#x63D0;&#x4F9B; source map &#x652F;&#x6301;
  devtool: &apos;#source-map&apos;,
  entry: {
    server: path.resolve(__dirname, &apos;../src/entry-server.js&apos;)
  },
  externals: [nodeExternals()],     // &#x65B0;&#x589E;
  output: {
    libraryTarget: &apos;commonjs2&apos;
  },
  plugins: [
    new VueSSRServerPlugin(),   // &#x8FD9;&#x4E2A;&#x8981;&#x653E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5199;&#xFF0C;&#x5426;&#x5219; CopyWebpackPlugin &#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x539F;&#x56E0;&#x8FD8;&#x6CA1;&#x67E5;&#x6E05;&#x695A;
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, &apos;../src/index.ssr.html&apos;),
      filename: &apos;index.ssr.html&apos;,
      files: {
        js: &apos;client.bundle.js&apos;
      },
      excludeChunks: [&apos;server&apos;]
    })
  ]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>);
<span class="hljs-keyword">const</span> nodeExternals = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-node-externals&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> VueSSRServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-server-renderer/server-plugin&apos;</span>);
<span class="hljs-keyword">const</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.config&apos;</span>);

<span class="hljs-built_in">module</span>.exports = merge(base, {
  <span class="hljs-attr">target</span>: <span class="hljs-string">&apos;node&apos;</span>,
   <span class="hljs-comment">// &#x5BF9; bundle renderer &#x63D0;&#x4F9B; source map &#x652F;&#x6301;</span>
  devtool: <span class="hljs-string">&apos;#source-map&apos;</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">server</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/entry-server.js&apos;</span>)
  },
  <span class="hljs-attr">externals</span>: [nodeExternals()],     <span class="hljs-comment">// &#x65B0;&#x589E;</span>
  output: {
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">&apos;commonjs2&apos;</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> VueSSRServerPlugin(),   <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x8981;&#x653E;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5199;&#xFF0C;&#x5426;&#x5219; CopyWebpackPlugin &#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x539F;&#x56E0;&#x8FD8;&#x6CA1;&#x67E5;&#x6E05;&#x695A;</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">template</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/index.ssr.html&apos;</span>),
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.ssr.html&apos;</span>,
      <span class="hljs-attr">files</span>: {
        <span class="hljs-attr">js</span>: <span class="hljs-string">&apos;client.bundle.js&apos;</span>
      },
      <span class="hljs-attr">excludeChunks</span>: [<span class="hljs-string">&apos;server&apos;</span>]
    })
  ]
});</code></pre><p>&#x56E0;&#x4E3A;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#x5F15;&#x7528;&#x6A21;&#x5757;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x9700;&#x8981;&#x6253;&#x5305;<code>node_modules</code>&#x4E2D;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x4EE3;&#x7801;&#x4E2D;<code>require</code>&#x5F15;&#x7528;&#x5C31;&#x597D;&#xFF0C;&#x6240;&#x4EE5;&#x914D;&#x7F6E;<code>externals: [nodeExternals()]</code>&#x3002;</p><p>&#x4E24;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4F1A;&#x5206;&#x522B;&#x751F;&#x6210;<code>vue-ssr-client-manifest.json</code>&#x548C;<code>vue-ssr-server-bundle.json</code>&#x3002;&#x4F5C;&#x4E3A;<code>createBundleRenderer</code>&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>&#x6765;&#x770B;<code>server.js</code></p><p><strong>server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const serverBundle = require(path.resolve(__dirname, &apos;../dist/vue-ssr-server-bundle.json&apos;));
const clientManifest = require(path.resolve(__dirname, &apos;../dist/vue-ssr-client-manifest.json&apos;));
const template = fs.readFileSync(path.resolve(__dirname, &apos;../dist/index.ssr.html&apos;), &apos;utf-8&apos;);

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">const serverBundle</span> = require(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/vue-ssr-server-bundle.json&apos;</span>));
<span class="hljs-attribute">const clientManifest</span> = require(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/vue-ssr-client-manifest.json&apos;</span>));
<span class="hljs-attribute">const template</span> = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;../dist/index.ssr.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>);

<span class="hljs-attribute">const renderer</span> = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});</code></pre><p>&#x6548;&#x679C;&#x548C;&#x7B2C;&#x4E09;&#x6B65;&#x5C31;&#x662F;&#x4E00;&#x6837;&#x7684;&#x5566;&#xFF0C;&#x5C31;&#x4E0D;&#x622A;&#x56FE;&#x4E86;&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/04" rel="nofollow noreferrer" target="_blank">github</a>&#x3002;</p><h2 id="articleHeader6">5. &#x914D;&#x7F6E;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x57FA;&#x4E8E;Vue + VueRouter + Vuex&#x7684;SSR</h2><p>&#x8FD9;&#x91CC;&#x548C;&#x7B2C;&#x56DB;&#x6B65;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x662F;&#x5F15;&#x5165;&#x4E86;<code>vue-router</code>&#xFF0C;&#x66F4;&#x63A5;&#x8FD1;&#x4E8E;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x3002;</p><p>&#x5728;<code>src</code>&#x4E0B;&#x65B0;&#x589E;<code>router</code>&#x76EE;&#x5F55;&#x3002;</p><p><strong>router/index.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import Router from &apos;vue-router&apos;;
import Bar from &apos;../components/Bar.vue&apos;;

Vue.use(Router);

function createRouter() {
  const routes = [
    {
      path: &apos;/bar&apos;,
      component: Bar
    },
    {
      path: &apos;/foo&apos;,
      component: () =&gt; import(&apos;../components/Foo.vue&apos;)   // &#x5F02;&#x6B65;&#x8DEF;&#x7531;
    }
  ];

  const router = new Router({
    mode: &apos;history&apos;,
    routes
  });

  return router;
}

export default createRouter;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>;
<span class="hljs-keyword">import</span> Bar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Bar.vue&apos;</span>;

Vue.use(Router);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRouter</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> routes = [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/bar&apos;</span>,
      <span class="hljs-attr">component</span>: Bar
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/foo&apos;</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;../components/Foo.vue&apos;</span>)   <span class="hljs-comment">// &#x5F02;&#x6B65;&#x8DEF;&#x7531;</span>
    }
  ];

  <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;history&apos;</span>,
    routes
  });

  <span class="hljs-keyword">return</span> router;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createRouter;</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x628A;<code>Foo</code>&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x5F15;&#x5165;&#xFF0C;&#x505A;&#x6210;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x5728;<code>app.js</code>&#x4E2D;&#x5F15;&#x5165;<code>router</code>&#xFF0C;&#x5E76;&#x5BFC;&#x51FA;&#xFF1A;</p><p><strong>app.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import createStore from &apos;./store/store.js&apos;;
import createRouter from &apos;./router&apos;;
import App from &apos;./App.vue&apos;;

export function createApp() {
  const store = createStore();
  const router = createRouter();

  const app = new Vue({
    router,
    store,
    render: h =&gt; h(App)
  });

  return { app, store, router, App };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> createStore <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store/store.js&apos;</span>;
<span class="hljs-keyword">import</span> createRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> store = createStore();
  <span class="hljs-keyword">const</span> router = createRouter();

  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    router,
    store,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
  });

  <span class="hljs-keyword">return</span> { app, store, router, App };
}</code></pre><p>&#x4FEE;&#x6539;<code>App.vue</code>&#x5F15;&#x5165;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF1A;</p><p><strong>App.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;router-link to=&quot;/bar&quot;&gt;Goto Bar&lt;/router-link&gt; 
    &lt;router-link to=&quot;/foo&quot;&gt;Goto Foo&lt;/router-link&gt; 
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  beforeCreate() {
    console.log(&apos;App.vue beforeCreate&apos;);
  },

  created() {
    console.log(&apos;App.vue created&apos;);
  },

  beforeMount() {
    console.log(&apos;App.vue beforeMount&apos;);
  },

  mounted() {
    console.log(&apos;App.vue mounted&apos;);
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/bar&quot;</span>&gt;</span>Goto Bar<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/foo&quot;</span>&gt;</span>Goto Foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  beforeCreate() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;App.vue beforeCreate&apos;</span>);
  },

  created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;App.vue created&apos;</span>);
  },

  beforeMount() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;App.vue beforeMount&apos;</span>);
  },

  mounted() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;App.vue mounted&apos;</span>);
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6700;&#x91CD;&#x8981;&#x7684;&#x4FEE;&#x6539;&#x5728;<code>entry-server.js</code>&#x4E2D;&#xFF0C;</p><p><strong>entry-server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createApp } from &apos;./app.js&apos;;

export default context =&gt; {
  return new Promise((resolve, reject) =&gt; {
    const { app, store, router, App } = createApp();

    router.push(context.url);

    router.onReady(() =&gt; {
      const matchedComponents = router.getMatchedComponents();

      console.log(context.url)
      console.log(matchedComponents)

      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      Promise.all(matchedComponents.map(component =&gt; {
        if (component.asyncData) {
          return component.asyncData({ store });
        }
      })).then(() =&gt; {
        // &#x5F53;&#x4F7F;&#x7528; template &#x65F6;&#xFF0C;context.state &#x5C06;&#x4F5C;&#x4E3A; window.__INITIAL_STATE__ &#x72B6;&#x6001;&#xFF0C;&#x81EA;&#x52A8;&#x5D4C;&#x5165;&#x5230;&#x6700;&#x7EC8;&#x7684; HTML &#x4E2D;
        context.state = store.state;

        // &#x8FD4;&#x56DE;&#x6839;&#x7EC4;&#x4EF6;
        resolve(app);
      });
    }, reject);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.js&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { app, store, router, App } = createApp();

    router.push(context.url);

    router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> matchedComponents = router.getMatchedComponents();

      <span class="hljs-built_in">console</span>.log(context.url)
      <span class="hljs-built_in">console</span>.log(matchedComponents)

      <span class="hljs-keyword">if</span> (!matchedComponents.length) {
        <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">code</span>: <span class="hljs-number">404</span> });
      }

      <span class="hljs-built_in">Promise</span>.all(matchedComponents.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (component.asyncData) {
          <span class="hljs-keyword">return</span> component.asyncData({ store });
        }
      })).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// &#x5F53;&#x4F7F;&#x7528; template &#x65F6;&#xFF0C;context.state &#x5C06;&#x4F5C;&#x4E3A; window.__INITIAL_STATE__ &#x72B6;&#x6001;&#xFF0C;&#x81EA;&#x52A8;&#x5D4C;&#x5165;&#x5230;&#x6700;&#x7EC8;&#x7684; HTML &#x4E2D;</span>
        context.state = store.state;

        <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x6839;&#x7EC4;&#x4EF6;</span>
        resolve(app);
      });
    }, reject);
  });
}</code></pre><p>&#x8FD9;&#x91CC;&#x524D;&#x9762;&#x63D0;&#x5230;&#x7684;<code>context</code>&#x5C31;&#x8D77;&#x4E86;&#x5927;&#x4F5C;&#x7528;&#xFF0C;&#x5B83;&#x5C06;&#x7528;&#x6237;&#x8BBF;&#x95EE;&#x7684;<code>url</code>&#x5730;&#x5740;&#x4F20;&#x8FDB;&#x6765;&#xFF0C;&#x4F9B;<code>vue-router</code>&#x4F7F;&#x7528;&#x3002;&#x56E0;&#x4E3A;&#x6709;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x5728;<code>router.onReady</code>&#x7684;&#x6210;&#x529F;&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;&#x53BB;&#x627E;&#x8BE5;<code>url</code>&#x8DEF;&#x7531;&#x6240;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x90A3;&#x4E00;&#x5957;&#x8FD8;&#x548C;&#x524D;&#x9762;&#x7684;&#x4E00;&#x6837;&#x3002;</p><p>&#x4E8E;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x5B8C;&#x6574;&#x7684;&#x57FA;&#x4E8E;<code>Vue + VueRouter + Vuex</code>SSR&#x914D;&#x7F6E;&#xFF0C;&#x5B8C;&#x6210;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/05" rel="nofollow noreferrer" target="_blank">github</a>&#x3002;</p><p>&#x6700;&#x7EC8;&#x6548;&#x679C;&#x6F14;&#x793A;&#xFF1A;</p><p>&#x8BBF;&#x95EE;<code>http://localhost:3000/bar</code>&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016636664?w=1098&amp;h=813" src="https://static.alili.tech/img/remote/1460000016636664?w=1098&amp;h=813" alt="ssr-router" title="ssr-router" style="cursor:pointer"></span></p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x67E5;&#x770B;<a href="https://github.com/leocoder351/vue-ssr-demo/tree/master/05" rel="nofollow noreferrer" target="_blank">github</a></p><h2 id="articleHeader7">&#x540E;&#x7EED;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E94;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x5B8C;&#x6210;&#x4E86;&#x4ECE;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x5230;&#x5B8C;&#x6574;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x540C;&#x6784;&#xFF0C;&#x4EE3;&#x7801;&#x65E2;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x56DE;&#x8FC7;&#x5934;&#x6765;&#x6211;&#x4EEC;&#x5728;&#x770B;&#x4E00;&#x4E0B;&#x662F;&#x5426;&#x6709;&#x4F18;&#x5316;&#x7684;&#x7A7A;&#x95F4;&#xFF0C;&#x53C8;&#x6216;&#x8005;&#x6709;&#x54EA;&#x4E9B;&#x6269;&#x5C55;&#x7684;&#x601D;&#x8003;&#x3002;</p><h5>1. &#x4F18;&#x5316;</h5><ul><li>&#x6211;&#x4EEC;&#x76EE;&#x524D;&#x662F;&#x4F7F;&#x7528;<code>renderToString</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5B8C;&#x5168;&#x751F;&#x6210;<code>html</code>&#x540E;&#xFF0C;&#x624D;&#x4F1A;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x8FD4;&#x56DE;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;<code>renderToStream</code>&#xFF0C;&#x5E94;&#x7528;<code>bigpipe</code>&#x6280;&#x672F;&#x53EF;&#x4EE5;&#x5411;&#x6D4F;&#x89C8;&#x5668;&#x6301;&#x7EED;&#x4E0D;&#x65AD;&#x7684;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6D41;&#xFF0C;&#x90A3;&#x4E48;&#x6587;&#x4EF6;&#x7684;&#x52A0;&#x8F7D;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x5C3D;&#x65E9;&#x7684;&#x663E;&#x793A;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x51FA;&#x6765;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const stream = renderer.renderToStream(context)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs glsl"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> <span class="hljs-keyword">stream</span> = renderer.renderToStream(context)</code></pre><p>&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x662F; <code>Node.js stream</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let html = &apos;&apos;

stream.on(&apos;data&apos;, data =&gt; {
  html += data.toString()
})

stream.on(&apos;end&apos;, () =&gt; {
  console.log(html) // &#x6E32;&#x67D3;&#x5B8C;&#x6210;
})

stream.on(&apos;error&apos;, err =&gt; {
  // handle error...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> html = <span class="hljs-string">&apos;&apos;</span>

stream.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  html += data.toString()
})

stream.on(<span class="hljs-string">&apos;end&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(html) <span class="hljs-comment">// &#x6E32;&#x67D3;&#x5B8C;&#x6210;</span>
})

stream.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-comment">// handle error...</span>
})</code></pre><p>&#x5728;&#x6D41;&#x5F0F;&#x6E32;&#x67D3;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5F53; <code>renderer</code> &#x904D;&#x5386;&#x865A;&#x62DF; <code>DOM</code> &#x6811;(<code>virtual DOM tree</code>)&#x65F6;&#xFF0C;&#x4F1A;&#x5C3D;&#x5FEB;&#x53D1;&#x9001;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C3D;&#x5FEB;&#x83B7;&#x5F97;&quot;&#x7B2C;&#x4E00;&#x4E2A; <code>chunk</code>&quot;&#xFF0C;&#x5E76;&#x5F00;&#x59CB;&#x66F4;&#x5FEB;&#x5730;&#x5C06;&#x5176;&#x53D1;&#x9001;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x5F53;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x636E; <code>chunk</code> &#x88AB;&#x53D1;&#x51FA;&#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x4E0D;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x4E5F;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x5982;&#x679C;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5728;&#x5176;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x9644;&#x52A0;&#x5230;&#x6E32;&#x67D3;&#x4E0A;&#x4E0B;&#x6587;(<code>render context</code>)&#xFF0C;&#x5F53;&#x6D41;(<code>stream</code>)&#x542F;&#x52A8;&#x65F6;&#xFF0C;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x5C06;&#x4E0D;&#x53EF;&#x7528;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x5927;&#x91CF;&#x4E0A;&#x4E0B;&#x6587;&#x4FE1;&#x606F;(<code>context information</code>)&#xFF08;&#x5982;&#x5934;&#x4FE1;&#x606F;(<code>head information</code>)&#x6216;&#x5185;&#x8054;&#x5173;&#x952E; <code>CSS(inline critical CSS)&#xFF09;</code>&#x9700;&#x8981;&#x5728;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6807;&#x8BB0;(<code>markup</code>)&#x4E4B;&#x524D;&#x51FA;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x57FA;&#x672C;&#x4E0A;&#x5FC5;&#x987B;&#x7B49;&#x5F85;&#x6D41;(<code>stream</code>)&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x624D;&#x80FD;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x4E0A;&#x4E0B;&#x6587;&#x6570;&#x636E;&#x3002;</p><p>&#x56E0;&#x6B64;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4F9D;&#x8D56;&#x7531;&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x586B;&#x5145;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x6D41;&#x5F0F;&#x4F20;&#x8F93;&#x6A21;&#x5F0F;&#x3002;</p><ul><li><code>webpack</code>&#x4F18;&#x5316;</li></ul><p><code>webpack</code>&#x4F18;&#x5316;&#x53C8;&#x662F;&#x4E00;&#x4E2A;&#x5927;&#x7684;&#x8BDD;&#x9898;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x5C55;&#x5F00;&#x8BA8;&#x8BBA;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x67E5;&#x627E;&#x4E00;&#x4E9B;&#x8D44;&#x6599;&#xFF0C;&#x540E;&#x7EED;&#x6211;&#x4E5F;&#x53EF;&#x80FD;&#x4F1A;&#x4E13;&#x95E8;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6765;&#x8BB2;<code>webpack</code>&#x4F18;&#x5316;&#x3002;</p><h5>2. &#x601D;&#x8003;</h5><ul><li>&#x662F;&#x5426;&#x5FC5;&#x987B;&#x4F7F;&#x7528;<code>vuex</code>&#xFF1F;</li></ul><p>&#x7B54;&#x6848;&#x662F;&#x4E0D;&#x7528;&#x3002;<code>Vuex</code>&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5E2E;&#x52A9;&#x4F60;&#x5B9E;&#x73B0;&#x4E00;&#x5957;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x3001;&#x66F4;&#x65B0;&#x3001;&#x83B7;&#x53D6;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x5165;&#x80A1;&#x4F60;&#x4E0D;&#x7528;<code>Vuex</code>&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5C31;&#x5FC5;&#x987B;&#x81EA;&#x5DF1;&#x60F3;&#x4E00;&#x5957;&#x65B9;&#x6848;&#x53EF;&#x4EE5;&#x5C06;&#x5F02;&#x6B65;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x9002;&#x5F53;&#x7684;&#x65F6;&#x673A;&#x5C06;&#x5B83;&#x6CE8;&#x5165;&#x5230;&#x7EC4;&#x4EF6;&#x5185;&#xFF0C;&#x6709;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#x63D0;&#x51FA;&#x4E86;&#x4E00;&#x4E9B;&#x65B9;&#x6848;&#xFF0C;&#x6211;&#x4F1A;&#x653E;&#x5230;&#x53C2;&#x8003;&#x6587;&#x7AE0;&#x91CC;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;&#x4E00;&#x4E0B;&#x3002;</p><ul><li>&#x662F;&#x5426;&#x4F7F;&#x7528;<code>SSR</code>&#x5C31;&#x4E00;&#x5B9A;&#x597D;&#xFF1F;</li></ul><p>&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x4E0D;&#x4E00;&#x5B9A;&#x7684;&#xFF0C;&#x4EFB;&#x4F55;&#x6280;&#x672F;&#x90FD;&#x6709;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x3002;<code>SSR</code>&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x4F60;&#x63D0;&#x5347;&#x9996;&#x9875;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#xFF0C;&#x4F18;&#x5316;&#x641C;&#x7D22;&#x5F15;&#x64CE;<code>SEO</code>&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x7531;&#x4E8E;&#x5B83;&#x9700;&#x8981;&#x5728;<code>node</code>&#x4E2D;&#x6E32;&#x67D3;&#x6574;&#x5957;<code>Vue</code>&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x4F1A;&#x5360;&#x7528;&#x670D;&#x52A1;&#x5668;&#x8D1F;&#x8F7D;&#xFF0C;&#x540C;&#x65F6;&#x53EA;&#x4F1A;&#x6267;&#x884C;<code>beforeCreate</code>&#x548C;<code>created</code>&#x4E24;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x5916;&#x90E8;&#x6269;&#x5C55;&#x5E93;&#x9700;&#x8981;&#x505A;&#x4E00;&#x5B9A;&#x5904;&#x7406;&#x624D;&#x53EF;&#x4EE5;&#x5728;<code>SSR</code>&#x4E2D;&#x8FD0;&#x884C;&#x7B49;&#x7B49;&#x3002;</p><h2 id="articleHeader8">&#x7ED3;&#x8BED;</h2><p>&#x672C;&#x6587;&#x901A;&#x8FC7;&#x4E94;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x4ECE;&#x7EAF;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6E32;&#x67D3;&#x5F00;&#x59CB;&#xFF0C;&#x5230;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x57FA;&#x4E8E;<code>Vue + vue-router + Vuex</code>&#x7684;SSR&#x73AF;&#x5883;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;&#x5F88;&#x591A;&#x65B0;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4E5F;&#x8BB8;&#x4F60;&#x770B;&#x5B8C;&#x4E00;&#x904D;&#x4E0D;&#x592A;&#x7406;&#x89E3;&#xFF0C;&#x90A3;&#x4E48;&#x7ED3;&#x5408;&#x7740;&#x6E90;&#x7801;&#xFF0C;&#x53BB;&#x81EA;&#x5DF1;&#x624B;&#x6572;&#x51E0;&#x904D;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6765;&#x770B;&#x51E0;&#x904D;&#x6587;&#x7AE0;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x4E00;&#x5B9A;&#x53EF;&#x4EE5;&#x638C;&#x63E1;<code>SSR</code>&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x672C;&#x6587;&#x6240;&#x6709;&#x6E90;&#x4EE3;&#x7801;&#x90FD;&#x653E;&#x5728;&#x6211;&#x7684;<a href="https://github.com/leocoder351/vue-ssr-demo" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x6765;&#x70B9;&#x4E00;&#x4E2A;&#x8D5E;&#x5427;~~</p><h4>&#x53C2;&#x8003;&#x94FE;&#x63A5;</h4><ul><li><a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">https://ssr.vuejs.org/zh/</a></li><li><a href="https://zhuanlan.zhihu.com/p/35871344" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></li><li><a href="http://www.cnblogs.com/qingmingsang/articles/8719679.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/qingmi...</a></li><li><a href="https://juejin.im/entry/590ca74b2f301e006c10465f" rel="nofollow noreferrer" target="_blank">https://juejin.im/entry/590ca...</a></li><li><a href="https://github.com/youngwind/blog/issues/112" rel="nofollow noreferrer" target="_blank">https://github.com/youngwind/...</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你五步学会Vue SSR

## 原文链接
[https://segmentfault.com/a/1190000016637877](https://segmentfault.com/a/1190000016637877)

