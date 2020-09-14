---
title: 'Vuex? 和 TypeScript 的 Webpack4.+ 尝鲜' 
date: 2018-11-29 9:33:05
hidden: true
slug: dfvl0egu8h
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbhsr?w=800&amp;h=800" src="https://static.alili.tech/img/bVbbhsr?w=800&amp;h=800" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<blockquote>&#x9759;&#x6001;&#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#x80FD;&#x5E2E;&#x52A9;&#x4F60;&#x6709;&#x6548;&#x9632;&#x6B62;&#x8BB8;&#x591A;&#x6F5C;&#x5728;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x9519;&#x8BEF;&#xFF0C;&#x800C;&#x4E14;&#x968F;&#x7740;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x65E5;&#x6E10;&#x4E30;&#x6EE1;&#x4F1A;&#x66F4;&#x52A0;&#x663E;&#x8457;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48; Vue &#x4E0D;&#x4EC5;&#x4EC5;&#x4E3A; Vue core &#x63D0;&#x4F9B;&#x4E86;&#x9488;&#x5BF9; TypeScript &#x7684;&#x5B98;&#x65B9;&#x7C7B;&#x578B;&#x58F0;&#x660E;&#xFF0C;&#x8FD8;&#x4E3A; Vue Router &#x548C; Vuex &#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x76F8;&#x5E94;&#x7684;&#x58F0;&#x660E;&#x6587;&#x4EF6;</blockquote>
<h2 id="articleHeader0">TsConfig&#x914D;&#x7F6E;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
      // ts &#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x6210; js &#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x540C;&#x65F6;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684; map &#x6587;&#x4EF6;
      &quot;sourceMap&quot;: true,
      &quot;strict&quot;: true,
      &quot;strictNullChecks&quot;: true,
      // &#x5F53;&#x8868;&#x8FBE;&#x5F0F;&#x548C;&#x7533;&#x660E; &#x7C7B;&#x578B;&#x4E3A;any&#x65F6;&#xFF0C;&#x662F;&#x5426;&#x9700;&#x8981;&#x53D1;&#x51FA;&#x8B66;&#x544A;&#xFF0C;&#x8BBE;&#x7F6E;true&#xFF0C;&#x5219;&#x4E0D;&#x8B66;&#x544A;
      &quot;noImplicitAny&quot;: true,
      // &#x8BBE;&#x7F6E;&#x4E3A;true&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x8DEF;&#x5F84;&#x90FD;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5219;&#x63D0;&#x793A;Error
      &quot;noImplicitReturns&quot;: true,
      // module &#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x7684;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x89C4;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; commonjs &#x3001; amd &#x3001; umd &#x3001; system &#x3001; es6 &#x3001; es2015 &#x3001; none &#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x3002;
      // &#x9009;&#x62E9;commonJS&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x7B26;&#x5408;commonjs&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;amd&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x6EE1;&#x8DB3;amd&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;system&#x4F1A;&#x751F;&#x6210;&#x4F7F;&#x7528;ES6&#x7684;
      // system.import&#x7684;&#x4EE3;&#x7801;&#x3002;&#x4F7F;&#x7528;es6&#x6216;&#x8005;&#x662F;es2015&#x4F1A;&#x751F;&#x4EA7;&#x5305;&#x542B;ES6&#x7279;&#x6027;&#x7684;&#x4EE3;&#x7801;&#x3002;
      &quot;module&quot;: &quot;es2015&quot;,
      &quot;moduleResolution&quot;: &quot;node&quot;,
      // &#x8BBE;&#x7F6E;&#x4E3A;true&#x65F6;&#xFF0C;&#x5219;&#x5141;&#x8BB8;&#x4ECE;&#x6CA1;&#x6709;&#x9ED8;&#x8BA4;&#x5BFC;&#x51FA;&#x7684;&#x6A21;&#x5757;&#x4E2D;&#x9ED8;&#x8BA4;&#x5BFC;&#x5165;(&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x505A;&#x68C0;&#x67E5;)
      &quot;allowSyntheticDefaultImports&quot;: true,
      // &#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x5219;&#x652F;&#x6301;ES7&#x7684;&#x88C5;&#x9970;&#x5668;&#x7279;&#x6027;
      &quot;experimentalDecorators&quot;: true,
      // target &#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x751F;&#x6210;&#x4EE3;&#x7801;&#x7684;&#x517C;&#x5BB9;&#x7248;&#x672C;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;es3,es5,es2015,es6&#x4E2D;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8BBE;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x751F;&#x4EA7;&#x7684;&#x4EE3;&#x7801;&#x517C;&#x5BB9;&#x5230;es3
      &quot;target&quot;: &quot;es5&quot;
    },
    &quot;include&quot;: [
        &quot;./src/**/*&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;compilerOptions&quot;</span>: {
      <span class="hljs-comment">// ts &#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x6210; js &#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x540C;&#x65F6;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684; map &#x6587;&#x4EF6;</span>
      <span class="hljs-string">&quot;sourceMap&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">&quot;strict&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">&quot;strictNullChecks&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x5F53;&#x8868;&#x8FBE;&#x5F0F;&#x548C;&#x7533;&#x660E; &#x7C7B;&#x578B;&#x4E3A;any&#x65F6;&#xFF0C;&#x662F;&#x5426;&#x9700;&#x8981;&#x53D1;&#x51FA;&#x8B66;&#x544A;&#xFF0C;&#x8BBE;&#x7F6E;true&#xFF0C;&#x5219;&#x4E0D;&#x8B66;&#x544A;</span>
      <span class="hljs-string">&quot;noImplicitAny&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E3A;true&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x8DEF;&#x5F84;&#x90FD;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5219;&#x63D0;&#x793A;Error</span>
      <span class="hljs-string">&quot;noImplicitReturns&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// module &#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x6A21;&#x5757;&#x7684;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x89C4;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; commonjs &#x3001; amd &#x3001; umd &#x3001; system &#x3001; es6 &#x3001; es2015 &#x3001; none &#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x3002;</span>
      <span class="hljs-comment">// &#x9009;&#x62E9;commonJS&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x7B26;&#x5408;commonjs&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;amd&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x6EE1;&#x8DB3;amd&#x89C4;&#x8303;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;system&#x4F1A;&#x751F;&#x6210;&#x4F7F;&#x7528;ES6&#x7684;</span>
      <span class="hljs-comment">// system.import&#x7684;&#x4EE3;&#x7801;&#x3002;&#x4F7F;&#x7528;es6&#x6216;&#x8005;&#x662F;es2015&#x4F1A;&#x751F;&#x4EA7;&#x5305;&#x542B;ES6&#x7279;&#x6027;&#x7684;&#x4EE3;&#x7801;&#x3002;</span>
      <span class="hljs-string">&quot;module&quot;</span>: <span class="hljs-string">&quot;es2015&quot;</span>,
      <span class="hljs-string">&quot;moduleResolution&quot;</span>: <span class="hljs-string">&quot;node&quot;</span>,
      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E3A;true&#x65F6;&#xFF0C;&#x5219;&#x5141;&#x8BB8;&#x4ECE;&#x6CA1;&#x6709;&#x9ED8;&#x8BA4;&#x5BFC;&#x51FA;&#x7684;&#x6A21;&#x5757;&#x4E2D;&#x9ED8;&#x8BA4;&#x5BFC;&#x5165;(&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x505A;&#x68C0;&#x67E5;)</span>
      <span class="hljs-string">&quot;allowSyntheticDefaultImports&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x5219;&#x652F;&#x6301;ES7&#x7684;&#x88C5;&#x9970;&#x5668;&#x7279;&#x6027;</span>
      <span class="hljs-string">&quot;experimentalDecorators&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// target &#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x751F;&#x6210;&#x4EE3;&#x7801;&#x7684;&#x517C;&#x5BB9;&#x7248;&#x672C;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;es3,es5,es2015,es6&#x4E2D;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8BBE;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x751F;&#x4EA7;&#x7684;&#x4EE3;&#x7801;&#x517C;&#x5BB9;&#x5230;es3</span>
      <span class="hljs-string">&quot;target&quot;</span>: <span class="hljs-string">&quot;es5&quot;</span>
    },
    <span class="hljs-string">&quot;include&quot;</span>: [
        <span class="hljs-string">&quot;./src/**/*&quot;</span>
    ]
}</code></pre>
<p>&#x914D;&#x7F6E;&#x53C2;&#x8003;&#xFF1A;</p>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;tsconfig&#x89E3;&#x6790;</a></li>
<li><a href="http://json.schemastore.org/tsconfig" rel="nofollow noreferrer" target="_blank">tsconfig&#x7684;JSON&#x6587;&#x6863;</a></li>
</ul>
<h2 id="articleHeader1">Webpack&#x7684;&#x57FA;&#x7840;&#x914D;&#x7F6E;&#x4E00;&#x89C8;</h2>
<p>&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x4E2A;&#x4EBA;&#x611F;&#x89C9;&#x662F;webpack&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x53EA;&#x6709;&#x914D;&#x7F6E;&#x597D;webpack&#x90E8;&#x5206;&#x540E;&#x7EED;&#x624D;&#x80FD;&#x987A;&#x5229;&#x8FDB;&#x884C;&#x5F00;&#x53D1;</p>
<p>&#x8FD9;&#x91CC;webpack&#x4F7F;&#x7528;&#x4E86;4.+&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6240;&#x4EE5;&#x7B97;&#x662F;&#x4F53;&#x9A8C;&#x4E86;&#x8F83;&#x4E3A;&#x65B0;&#x7684;webpack&#xFF0C;&#x5176;&#x4E2D;&#x548C;&#x65E7;&#x7248;&#x7684;&#x6709;&#x4E9B;&#x533A;&#x522B;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x4ECB;&#x7ECD;</p>
<p>&#x5148;&#x8D34;&#x51FA;webpack&#x7684;&#x914D;&#x7F6E;&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const webpack = require(&apos;webpack&apos;)
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;)

module.exports = {
  mode: process.env.NODE_ENV === &apos;production&apos; ? &apos;production&apos; : &apos;development&apos;,
  entry: &apos;./src/index.ts&apos;,
  output: {
    path: path.resolve(__dirname, &apos;./dist&apos;),
    publicPath: &apos;/dist/&apos;,
    filename: &apos;build.js&apos;
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: &apos;vue-loader&apos;,
        options: {
          loaders: {
            &apos;scss&apos;: &apos;vue-style-loader!css-loader!sass-loader&apos;,
            &apos;sass&apos;: &apos;vue-style-loader!css-loader!sass-loader?indentedSyntax&apos;,
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: &apos;ts-loader&apos;,
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/.vue$/]
        }
      }
    ]
  },
  resolve: {
    extensions: [&apos;.ts&apos;, &apos;.js&apos;, &apos;.vue&apos;, &apos;.josn&apos;],
    alias: {
      &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;
    }
  },
  devServer: {
    contentBase: &apos;./public&apos;,
    host: &apos;localhost&apos;,
    port: &apos;8080&apos;,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: &apos;#eval-source-map&apos;,
  plugins: [
    new VueLoaderPlugin()
  ]
}

if (process.env.NODE_ENV === &apos;production&apos;) {
  module.exports.devtool = &apos;#source-map&apos;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      &apos;process.env&apos;: {
        NODE_ENV: &apos;&quot;production&quot;&apos;
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> VueLoaderPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">mode</span>: process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span> ? <span class="hljs-string">&apos;production&apos;</span> : <span class="hljs-string">&apos;development&apos;</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">&apos;./src/index.ts&apos;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;./dist&apos;</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">&apos;/dist/&apos;</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;build.js&apos;</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">loaders</span>: {
            <span class="hljs-string">&apos;scss&apos;</span>: <span class="hljs-string">&apos;vue-style-loader!css-loader!sass-loader&apos;</span>,
            <span class="hljs-string">&apos;sass&apos;</span>: <span class="hljs-string">&apos;vue-style-loader!css-loader!sass-loader?indentedSyntax&apos;</span>,
          }
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;ts-loader&apos;</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">appendTsSuffixTo</span>: [<span class="hljs-regexp">/.vue$/</span>]
        }
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.ts&apos;</span>, <span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.josn&apos;</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>
    }
  },
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: <span class="hljs-string">&apos;./public&apos;</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;localhost&apos;</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-string">&apos;8080&apos;</span>,
    <span class="hljs-attr">open</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">hints</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;#eval-source-map&apos;</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> VueLoaderPlugin()
  ]
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>) {
  <span class="hljs-built_in">module</span>.exports.devtool = <span class="hljs-string">&apos;#source-map&apos;</span>
  <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">&apos;process.env&apos;</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">&apos;&quot;production&quot;&apos;</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
      <span class="hljs-attr">minimize</span>: <span class="hljs-literal">true</span>
    })
  ])
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ])
}
</code></pre>
<p>&#x6CE8;&#x610F;&#x70B9;&#xFF1A;</p>
<ul>
<li>vue-loader v15&#x9700;&#x8981;&#x5728;webpack&#x63D2;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;VueLoaderPlugin&#x63D2;&#x4EF6;</li>
<li>webpack4.+&#x9700;&#x8981;&#x6307;&#x5B9A;mode&#xFF0C;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x8FD8;&#x662F;&#x751F;&#x4EA7;&#x6A21;&#x5F0F;</li>
<li>&#x6CE8;&#x610F;ts-loader&#x7684;&#x914D;&#x7F6E;</li>
</ul>
<p>&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x8FDB;&#x884C;webpack&#x914D;&#x7F6E;&#xFF0C;&#x6CA1;&#x6709;&#x592A;&#x5B8C;&#x6574;&#x5730;&#x6839;&#x636E;&#x5B8C;&#x6574;&#x7684;&#x9879;&#x76EE;&#x6765;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x914D;&#x7F6E;&#x4E86;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x4EE3;&#x7801;&#x6DF7;&#x6DC6;&#x538B;&#x7F29;&#xFF0C;&#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x548C;&#x70ED;&#x66F4;&#x65B0;&#x7B49;&#xFF0C;&#x6709;&#x9700;&#x8981;&#x5176;&#x4ED6;&#x529F;&#x80FD;&#x6269;&#x5C55;&#x7684;&#x81EA;&#x884C;&#x914D;&#x7F6E;&#x3002;</p>
<h2 id="articleHeader2">Vue&#x73AF;&#x5883;&#x642D;&#x5EFA;&#x914D;&#x7F6E;</h2>
<h3 id="articleHeader3">vue-shims.d.ts&#x7684;&#x6DFB;&#x52A0;</h3>
<p>&#x8FD9;&#x4E2A;&#x662F;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#xFF0C;&#x8BE5;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x653E;&#x5230;vue&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5177;&#x4F53;&#x7684;d.ts&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &apos;*.vue&apos; {
  import Vue from &apos;vue&apos;
  export default Vue
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> &apos;*.vue&apos; {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue
}</code></pre>
<p>&#x76EE;&#x7684;&#x662F;&#x8BA9;ts&#x80FD;&#x591F;&#x8BC6;&#x522B;&#x5230;vue&#x7684;&#x9759;&#x6001;&#x7C7B;&#x578B;</p>
<h3 id="articleHeader4">vue&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</h3>
<p>index.ts:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App.vue&apos;
// vuex&#x90E8;&#x5206;
import store from &apos;./store&apos;

new Vue({
  el: &apos;#app&apos;,
  store,
  render: h =&gt; h(App),
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>
<span class="hljs-comment">// vuex&#x90E8;&#x5206;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">&apos;#app&apos;</span>,
  store,
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
})
</code></pre>
<p>&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x8DDF;&#x666E;&#x901A;&#x7684;js&#x5199;&#x6CD5;&#x6CA1;&#x6709;&#x592A;&#x591A;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x53EA;&#x662F;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x4E3A;ts&#x3002;</p>
<h2 id="articleHeader5">&#x5F00;&#x59CB;&#x5199;vue&#x7684;&#x5355;&#x6587;&#x4EF6;&#x9875;&#x9762;&#x548C;&#x7EC4;&#x4EF6;</h2>
<h3 id="articleHeader6">&#x5355;&#x6587;&#x4EF6;&#x9875;&#x9762;&#x6A21;&#x677F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  ...
&lt;/template&gt;

&lt;script lang=&quot;ts&quot;&gt;
  ...
&lt;/script&gt;

&lt;style&gt;
  ...
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
  ...
&lt;<span class="hljs-regexp">/template&gt;

&lt;script lang=&quot;ts&quot;&gt;
  ...
&lt;/</span>script&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>&#x4E3B;&#x8981;&#x662F;&#x5728;script&#x9879;&#x4E2D;&#x628A;lang&#x5199;&#x4E3A;ts&#x7C7B;&#x578B;</p>
<h3 id="articleHeader7">&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x6765;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x548C;&#x9875;&#x9762;</h3>
<p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x4F7F;&#x7528;&#x4E24;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x5E93;vue-property-decorator &#x548C; vuex-class, vue-property-decorator&#x5176;&#x662F;&#x57FA;&#x4E8E;vue-class-&#x5F97;component&#x7684;&#x57FA;&#x7840;&#x6269;&#x5C55;&#x4FEE;&#x6539;&#x7684;&#x3002;</p>
<ol><li>&#x5927;&#x81F4;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;vue-property-decorator&#x7684;&#x88C5;&#x9970;&#x5668;&#x7684;&#x7528;&#x6CD5;</li></ol>
<p>&#x4E00;&#x5171;&#x6709;&#x4E03;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#xFF1A;</p>
<ul>
<li><code>@Emit</code></li>
<li><code>@Inject</code></li>
<li><code>@Model</code></li>
<li><code>@Prop</code></li>
<li><code>@Provide</code></li>
<li><code>@Watch</code></li>
<li>
<code>@Component</code> (<strong>exported from</strong> <code>vue-class-component</code>)</li>
</ul>
<p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;vue-property-decorator&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x505A;&#x89E3;&#x6790;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from &apos;vue-property-decorator&apos;

const s = Symbol(&apos;baz&apos;)

@Component
export class MyComponent extends Vue {
  
  @Emit()
  addToCount(n: number){ this.count += n }

  @Emit(&apos;reset&apos;)
  resetCount(){ this.count = 0 }

  @Inject() foo: string
  @Inject(&apos;bar&apos;) bar: string
  @Inject({from: &apos;optional&apos;, default: &apos;default&apos;}) optional: string
  @Inject(s) baz: string

  @Model(&apos;change&apos;) checked: boolean

  @Prop()
  propA: number

  @Prop({ default: &apos;default value&apos; })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Provide() foo = &apos;foo&apos;
  @Provide(&apos;bar&apos;) baz = &apos;bar&apos;

  @Watch(&apos;child&apos;)
  onChildChanged(val: string, oldVal: string) { }

  @Watch(&apos;person&apos;, { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-property-decorator&apos;</span>

<span class="hljs-keyword">const</span> s = Symbol(<span class="hljs-string">&apos;baz&apos;</span>)

<span class="hljs-meta">@Component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MyComponent <span class="hljs-keyword">extends</span> Vue {
  
  <span class="hljs-meta">@Emit</span>()
  addToCount(n: <span class="hljs-built_in">number</span>){ <span class="hljs-keyword">this</span>.count += n }

  <span class="hljs-meta">@Emit</span>(<span class="hljs-string">&apos;reset&apos;</span>)
  resetCount(){ <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span> }

  <span class="hljs-meta">@Inject</span>() foo: <span class="hljs-built_in">string</span>
  <span class="hljs-meta">@Inject</span>(<span class="hljs-string">&apos;bar&apos;</span>) bar: <span class="hljs-built_in">string</span>
  <span class="hljs-meta">@Inject</span>({<span class="hljs-keyword">from</span>: <span class="hljs-string">&apos;optional&apos;</span>, <span class="hljs-keyword">default</span>: <span class="hljs-string">&apos;default&apos;</span>}) optional: <span class="hljs-built_in">string</span>
  <span class="hljs-meta">@Inject</span>(s) baz: <span class="hljs-built_in">string</span>

  <span class="hljs-meta">@Model</span>(<span class="hljs-string">&apos;change&apos;</span>) checked: <span class="hljs-built_in">boolean</span>

  <span class="hljs-meta">@Prop</span>()
  propA: <span class="hljs-built_in">number</span>

  <span class="hljs-meta">@Prop</span>({ <span class="hljs-keyword">default</span>: <span class="hljs-string">&apos;default value&apos;</span> })
  propB: <span class="hljs-built_in">string</span>

  <span class="hljs-meta">@Prop</span>([<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Boolean</span>])
  propC: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">boolean</span>

  <span class="hljs-meta">@Provide</span>() foo = <span class="hljs-string">&apos;foo&apos;</span>
  <span class="hljs-meta">@Provide</span>(<span class="hljs-string">&apos;bar&apos;</span>) baz = <span class="hljs-string">&apos;bar&apos;</span>

  <span class="hljs-meta">@Watch</span>(<span class="hljs-string">&apos;child&apos;</span>)
  onChildChanged(val: <span class="hljs-built_in">string</span>, oldVal: <span class="hljs-built_in">string</span>) { }

  <span class="hljs-meta">@Watch</span>(<span class="hljs-string">&apos;person&apos;</span>, { immediate: <span class="hljs-literal">true</span>, deep: <span class="hljs-literal">true</span> })
  onPersonChanged(val: Person, oldVal: Person) { }
}
</code></pre>
<p>&#x76F8;&#x5F53;&#x4E8E;js&#x7684;&#x5199;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const s = Symbol(&apos;baz&apos;)

export const MyComponent = Vue.extend({
  name: &apos;MyComponent&apos;,
  inject: {
    foo: &apos;foo&apos;,
    bar: &apos;bar&apos;,
    &apos;optional&apos;: { from: &apos;optional&apos;, default: &apos;default&apos; },
    [s]: s
  },
  model: {
    prop: &apos;checked&apos;,
    event: &apos;change&apos;
  },
  props: {
 &#xA0; &#xA0;checked: Boolean,
 &#xA0; &#xA0;propA: Number,
    propB: {
      type: String,
      default: &apos;default value&apos;
    },
    propC: [String, Boolean],
  },
  data () {
    return {
      foo: &apos;foo&apos;,
      baz: &apos;bar&apos;
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  },
  methods: {
    addToCount(n){
      this.count += n
      this.$emit(&quot;add-to-count&quot;, n)
    },
    resetCount(){
      this.count = 0
      this.$emit(&quot;reset&quot;)
    },
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  },
  watch: {
    &apos;child&apos;: {
      handler: &apos;onChildChanged&apos;,
      immediate: false,
      deep: false
    },
    &apos;person&apos;: {
      handler: &apos;onPersonChanged&apos;,
      immediate: true,
      deep: true
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> s = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;baz&apos;</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> MyComponent = Vue.extend({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;MyComponent&apos;</span>,
  <span class="hljs-attr">inject</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;foo&apos;</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-string">&apos;bar&apos;</span>,
    <span class="hljs-string">&apos;optional&apos;</span>: { <span class="hljs-attr">from</span>: <span class="hljs-string">&apos;optional&apos;</span>, <span class="hljs-attr">default</span>: <span class="hljs-string">&apos;default&apos;</span> },
    [s]: s
  },
  <span class="hljs-attr">model</span>: {
    <span class="hljs-attr">prop</span>: <span class="hljs-string">&apos;checked&apos;</span>,
    <span class="hljs-attr">event</span>: <span class="hljs-string">&apos;change&apos;</span>
  },
  <span class="hljs-attr">props</span>: {
 &#xA0; &#xA0;<span class="hljs-attr">checked</span>: <span class="hljs-built_in">Boolean</span>,
 &#xA0; &#xA0;<span class="hljs-attr">propA</span>: <span class="hljs-built_in">Number</span>,
    <span class="hljs-attr">propB</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">&apos;default value&apos;</span>
    },
    <span class="hljs-attr">propC</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Boolean</span>],
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;foo&apos;</span>,
      <span class="hljs-attr">baz</span>: <span class="hljs-string">&apos;bar&apos;</span>
    }
  },
  provide () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">foo</span>: <span class="hljs-keyword">this</span>.foo,
      <span class="hljs-attr">bar</span>: <span class="hljs-keyword">this</span>.baz
    }
  },
  <span class="hljs-attr">methods</span>: {
    addToCount(n){
      <span class="hljs-keyword">this</span>.count += n
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;add-to-count&quot;</span>, n)
    },
    resetCount(){
      <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;reset&quot;</span>)
    },
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  },
  <span class="hljs-attr">watch</span>: {
    <span class="hljs-string">&apos;child&apos;</span>: {
      <span class="hljs-attr">handler</span>: <span class="hljs-string">&apos;onChildChanged&apos;</span>,
      <span class="hljs-attr">immediate</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">deep</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-string">&apos;person&apos;</span>: {
      <span class="hljs-attr">handler</span>: <span class="hljs-string">&apos;onPersonChanged&apos;</span>,
      <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
    }
  }
})</code></pre>
<p>&#x76F8;&#x4FE1;&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x7684;&#x4F8B;&#x5B50;&#x6211;&#x4EEC;&#x5F88;&#x5BB9;&#x6613;&#x5C31;&#x770B;&#x51FA;&#x5404;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x5982;&#x4F55;&#x53BB;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x518D;&#x505A;&#x592A;&#x591A;&#x7684;&#x89E3;&#x91CA;&#x3002;</p>
<ol><li>&#x518D;&#x770B;&#x4E00;&#x4E0B;vuex-class&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</li></ol>
<p>&#x540C;&#x6837;&#x4E3E;&#x4F8B;&#x5B98;&#x65B9;&#x7684;&#x4F7F;&#x7528;&#x5217;&#x5B50;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Component from &apos;vue-class-component&apos;
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from &apos;vuex-class&apos;

const someModule = namespace(&apos;path/to/module&apos;)

@Component
export class MyComp extends Vue {
  @State(&apos;foo&apos;) stateFoo
  @State(state =&gt; state.bar) stateBar
  @Getter(&apos;foo&apos;) getterFoo
  @Action(&apos;foo&apos;) actionFoo
  @Mutation(&apos;foo&apos;) mutationFoo
  @someModule.Getter(&apos;foo&apos;) moduleGetterFoo

  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    this.stateFoo // -&gt; store.state.foo
    this.stateBar // -&gt; store.state.bar
    this.getterFoo // -&gt; store.getters.foo
    this.actionFoo({ value: true }) // -&gt; store.dispatch(&apos;foo&apos;, { value: true })
    this.mutationFoo({ value: true }) // -&gt; store.commit(&apos;foo&apos;, { value: true })
    this.moduleGetterFoo // -&gt; store.getters[&apos;path/to/module/foo&apos;]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-class-component&apos;</span>
<span class="hljs-keyword">import</span> {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex-class&apos;</span>

<span class="hljs-keyword">const</span> someModule = namespace(<span class="hljs-string">&apos;path/to/module&apos;</span>)

@Component
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  @State(<span class="hljs-string">&apos;foo&apos;</span>) stateFoo
  @State(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.bar) stateBar
  @Getter(<span class="hljs-string">&apos;foo&apos;</span>) getterFoo
  @Action(<span class="hljs-string">&apos;foo&apos;</span>) actionFoo
  @Mutation(<span class="hljs-string">&apos;foo&apos;</span>) mutationFoo
  @someModule.Getter(<span class="hljs-string">&apos;foo&apos;</span>) moduleGetterFoo

  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    <span class="hljs-keyword">this</span>.stateFoo <span class="hljs-comment">// -&gt; store.state.foo</span>
    <span class="hljs-keyword">this</span>.stateBar <span class="hljs-comment">// -&gt; store.state.bar</span>
    <span class="hljs-keyword">this</span>.getterFoo <span class="hljs-comment">// -&gt; store.getters.foo</span>
    <span class="hljs-keyword">this</span>.actionFoo({ <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// -&gt; store.dispatch(&apos;foo&apos;, { value: true })</span>
    <span class="hljs-keyword">this</span>.mutationFoo({ <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// -&gt; store.commit(&apos;foo&apos;, { value: true })</span>
    <span class="hljs-keyword">this</span>.moduleGetterFoo <span class="hljs-comment">// -&gt; store.getters[&apos;path/to/module/foo&apos;]</span>
  }
}</code></pre>
<h2 id="articleHeader8">Vuex&#x7684;&#x914D;&#x7F6E;</h2>
<h3 id="articleHeader9">store&#x7684;&#x5165;&#x53E3;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Vuex, { StoreOptions } from &apos;vuex&apos;
import { RootState } from &apos;./modules/types&apos;
import { profile } from &apos;./modules/profile&apos;

Vue.use(Vuex)

const store: StoreOptions&lt;RootState&gt; = {
  state: {
    version: &apos;v1.0.0&apos;
  },
  modules: {
    profile
  }
}

export default new Vuex.Store&lt;RootState&gt;(store);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Vuex, { StoreOptions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>
<span class="hljs-keyword">import</span> { RootState } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/types&apos;</span>
<span class="hljs-keyword">import</span> { profile } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/profile&apos;</span>

Vue.use(Vuex)

<span class="hljs-keyword">const</span> store: StoreOptions&lt;RootState&gt; = {
  state: {
    version: <span class="hljs-string">&apos;v1.0.0&apos;</span>
  },
  modules: {
    profile
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store&lt;RootState&gt;(store);</code></pre>
<p>&#x8FD9;&#x91CC;RootState&#x53EA;&#x662F;&#x7528;&#x4E8E;&#x7559;&#x7A7A;&#xFF0C;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x6CE8;&#x5165;&#x5168;&#x5C40;&#x7684;store&#xFF0C;&#x533A;&#x522B;&#x4E8E;modules&#x7684;&#x72B6;&#x6001;</p>
<h3 id="articleHeader10">vuex&#x7684;modules&#x7684;&#x914D;&#x7F6E;</h3>
<ol><li>&#x5199;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7C7B;&#x578B;&#x58F0;&#x660E;</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface RootState {
  version: string;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> RootState {
  version: <span class="hljs-built_in">string</span>;
}</code></pre>
<p>version&#x5B57;&#x6BB5;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x521A;&#x624D;&#x5728;RootState&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x5B57;&#x6BB5;</p>
<ol><li>&#x5B9A;&#x4E49;&#x6A21;&#x677F;profile</li></ol>
<p>profile&#x6A21;&#x5757;&#x7684;&#x7C7B;&#x578B;&#x58F0;&#x660E;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface ProfileState {
  firstName: string
  lastName: string
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> ProfileState {
  firstName: <span class="hljs-built_in">string</span>
  lastName: <span class="hljs-built_in">string</span>
}</code></pre>
<p>profile&#x7684;&#x6A21;&#x5757;&#x5B9E;&#x73B0;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { RootState } from &apos;../types&apos;
import { Module } from &apos;vuex&apos;
import { ProfileState } from &apos;./types&apos;
import { GetterTree, ActionTree, MutationTree  } from &apos;vuex&apos;
import axios, { AxiosPromise } from &apos;axios&apos;

const state: ProfileState = {
  firstName: &apos;&apos;,
  lastName: &apos;&apos;
}

const getters: GetterTree&lt;ProfileState, RootState&gt; = {
  firstName(state) : string {
    return state.firstName
  },
  lastName(state) : string {
    return state.lastName
  }
}

const actions: ActionTree&lt;ProfileState, RootState&gt; = {
  fetchName({ commit }, id: number): AxiosPromise&lt;ProfileState&gt; {
    console.log(&apos;action:&apos;, id)
    return axios.request({
      url: &apos;https://www.apiopen.top/satinCommentApi?id=27610708&amp;page=1&apos;
    }).then(res =&gt; {
      commit(&apos;setProfile&apos;, {
        firstName: &apos;lin&apos;,
        lastName: &apos;guangyu&apos;
      })
      return res
    }).catch(err =&gt; {
      return err
    })
  }
}

const mutations: MutationTree&lt;ProfileState&gt; = {
  setProfile(state, payload: ProfileState) {
    state.firstName = payload.firstName
    state.lastName = payload.lastName
  }
}

const namespaced: boolean = true;

export const profile: Module&lt;ProfileState, RootState&gt; = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { RootState } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../types&apos;</span>
<span class="hljs-keyword">import</span> { Module } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>
<span class="hljs-keyword">import</span> { ProfileState } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./types&apos;</span>
<span class="hljs-keyword">import</span> { GetterTree, ActionTree, MutationTree  } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>
<span class="hljs-keyword">import</span> axios, { AxiosPromise } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-keyword">const</span> state: ProfileState = {
  firstName: <span class="hljs-string">&apos;&apos;</span>,
  lastName: <span class="hljs-string">&apos;&apos;</span>
}

<span class="hljs-keyword">const</span> getters: GetterTree&lt;ProfileState, RootState&gt; = {
  firstName(state) : <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> state.firstName
  },
  lastName(state) : <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> state.lastName
  }
}

<span class="hljs-keyword">const</span> actions: ActionTree&lt;ProfileState, RootState&gt; = {
  fetchName({ commit }, id: <span class="hljs-built_in">number</span>): AxiosPromise&lt;ProfileState&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;action:&apos;</span>, id)
    <span class="hljs-keyword">return</span> axios.request({
      url: <span class="hljs-string">&apos;https://www.apiopen.top/satinCommentApi?id=27610708&amp;page=1&apos;</span>
    }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      commit(<span class="hljs-string">&apos;setProfile&apos;</span>, {
        firstName: <span class="hljs-string">&apos;lin&apos;</span>,
        lastName: <span class="hljs-string">&apos;guangyu&apos;</span>
      })
      <span class="hljs-keyword">return</span> res
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> err
    })
  }
}

<span class="hljs-keyword">const</span> mutations: MutationTree&lt;ProfileState&gt; = {
  setProfile(state, payload: ProfileState) {
    state.firstName = payload.firstName
    state.lastName = payload.lastName
  }
}

<span class="hljs-keyword">const</span> namespaced: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> profile: Module&lt;ProfileState, RootState&gt; = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};</code></pre>
<p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5C31;&#x5B8C;&#x6210;&#x4E86;Vuex&#x7684;&#x914D;&#x7F6E;&#x4E86;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x88C5;&#x9970;&#x5668;&#x5BF9;vuex&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x800C;&#x4E14;&#x5177;&#x6709;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x63D0;&#x793A;&#xFF0C;&#x5341;&#x5206;&#x65B9;&#x4FBF;&#x3002;</p>
<p>&#x5B8C;&#x6210;&#x4E86;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x7684;&#x5C1D;&#x8BD5;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#xFF0C;&#x81EA;&#x5DF1;&#x5199;&#x4E86;&#x4E2A;&#x7B80;&#x5355;&#x7684;demo&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x89C2;&#x770B;<a href="https://github.com/lgybetter/vue-ts-template" rel="nofollow noreferrer" target="_blank">github</a>&#x600E;&#x4E48;&#x914D;&#x7F6E;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex? 和 TypeScript 的 Webpack4.+ 尝鲜

## 原文链接
[https://segmentfault.com/a/1190000015042711](https://segmentfault.com/a/1190000015042711)

