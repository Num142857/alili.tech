---
title: VUE单页应用首屏加载速度优化方案
hidden: true
categories: [reprint]
slug: ea162dab
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p>&#x5355;&#x9875;&#x5E94;&#x7528;&#x4F1A;&#x968F;&#x7740;&#x9879;&#x76EE;&#x8D8A;&#x5927;&#xFF0C;&#x5BFC;&#x81F4;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x5F88;&#x6162;&#xFF01;&#xFF01;&#xFF01;&#x4EE5;&#x4E0B;&#x7ED9;&#x51FA;&#x5728;&#x4E0B;&#x77E5;&#x9053;&#x7684;&#x51E0;&#x79CD;&#x4F18;&#x5316;&#x65B9;&#x6848;</p><ol><li>&#x4F7F;&#x7528;CDN&#x8D44;&#x6E90;,&#x51CF;&#x5C0F;&#x670D;&#x52A1;&#x5668;&#x5E26;&#x5BBD;&#x538B;&#x529B;</li><li>&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</li><li>&#x5C06;&#x4E00;&#x4E9B;&#x9759;&#x6001;js css&#x653E;&#x5230;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#xFF08;&#x5982;OSS&#xFF09;&#xFF0C;&#x51CF;&#x5C0F;&#x670D;&#x52A1;&#x5668;&#x538B;&#x529B;</li><li>&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4E09;&#x65B9;&#x8D44;&#x6E90;&#xFF0C;&#x5982;iview,&#x5EFA;&#x8BAE;&#x6309;&#x9700;&#x5F15;&#x5165;iview&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;</li><li>&#x4F7F;&#x7528;nginx&#x5F00;&#x542F;gzip&#x51CF;&#x5C0F;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x7684;&#x6D41;&#x91CF;&#x5927;&#x5C0F;</li><li>&#x82E5;&#x9996;&#x5C4F;&#x4E3A;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x6210;&#x591A;&#x5165;&#x53E3;&#xFF0C;&#x767B;&#x5F55;&#x9875;&#x5355;&#x72EC;&#x5206;&#x79BB;&#x4E3A;&#x4E00;&#x4E2A;&#x5165;&#x53E3;</li><li>&#x4F7F;&#x7528;uglifyjs-webpack-plugin&#x63D2;&#x4EF6;&#x4EE3;&#x66FF;webpack&#x81EA;&#x5E26;UglifyJsPlugin&#x63D2;&#x4EF6;</li></ol><h2>&#x4F7F;&#x7528;CDN&#x8D44;&#x6E90;,&#x51CF;&#x5C0F;&#x670D;&#x52A1;&#x5668;&#x5E26;&#x5BBD;&#x538B;&#x529B;</h2><ul><li>&#x5728;index.html&#x4E2D;&#x5F15;&#x5165;cdn&#x8D44;&#x6E90;</li></ul><pre><code>...
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
    &lt;/div&gt;
    &lt;!-- built files will be auto injected --&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vue/2.5.2/vue.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vue-resource/1.5.1/vue-resource.min.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
  ...</code></pre><ul><li>&#x4FEE;&#x6539; build/webpack.base.conf.js</li></ul><pre><code>module.exports = {
  context: path.resolve(__dirname, &apos;../&apos;),
  entry: {
    app: &apos;./src/main.js&apos;
  },
  externals:{
    &apos;vue&apos;: &apos;Vue&apos;,
    &apos;vue-router&apos;: &apos;VueRouter&apos;,
    &apos;vuex&apos;:&apos;Vuex&apos;,
    &apos;vue-resource&apos;: &apos;VueResource&apos;
  },
  ...
}</code></pre><ul><li>&#x4FEE;&#x6539;src/main.js src/router/index.js &#x6CE8;&#x91CA;&#x6389;import&#x5F15;&#x5165;&#x7684;vue,vue-resource</li></ul><pre><code>// import Vue from &apos;vue&apos;
// import VueResource from &apos;vue-resource&apos;
// Vue.use(VueResource)</code></pre><h2>&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</h2><p>require.ensure&#x65B9;&#x5F0F;</p><pre><code>const workCircle = r =&gt; require.ensure([], () =&gt; r(require(&apos;@/module/work-circle/Index&apos;)), &apos;workCircle&apos;)
const workCircleList = r =&gt; require.ensure([], () =&gt; r(require(&apos;@/module/work-circle/page/List&apos;)), &apos;workCircleList&apos;)
</code></pre><p>import&#x65B9;&#x5F0F;</p><pre><code>const workCircle = () =&gt; import(&apos;@/module/work-circle/Index&apos;)</code></pre><h2>&#x5C06;&#x4E00;&#x4E9B;&#x9759;&#x6001;js css&#x653E;&#x5230;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#xFF08;&#x5982;OSS&#xFF09;&#xFF0C;&#x51CF;&#x5C0F;&#x670D;&#x52A1;&#x5668;&#x538B;&#x529B;</h2><p>&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x7ED3;&#x679C;&#x629B;&#x51FA;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x9700;&#x8981;&#x7528;&#x5230;&#x8BE5;js&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;import&#x5F15;&#x5165;</p><h2>&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4E09;&#x65B9;&#x8D44;&#x6E90;&#xFF0C;&#x5982;iview,&#x5EFA;&#x8BAE;&#x6309;&#x9700;&#x5F15;&#x5165;iview&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;</h2><p>&#x6309;&#x9700;&#x5F15;&#x7528;&#x8BF7;&#x67E5;&#x770B;iview&#x5B98;&#x65B9;&#x6587;&#x6863;<a href="https://www.iviewui.com/docs/guide/install" rel="nofollow noreferrer">iview</a></p><h2>&#x4F7F;&#x7528;nginx&#x5F00;&#x542F;gzip&#x51CF;&#x5C0F;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x7684;&#x6D41;&#x91CF;&#x5927;&#x5C0F;</h2><p><span class="img-wrap"><img data-src="/img/bVbg1h3?w=479&amp;h=364" src="https://static.alili.tech/img/bVbg1h3?w=479&amp;h=364" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x914D;&#x7F6E;nginx&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="http://www.veryhuo.com/a/view/51706.html" rel="nofollow noreferrer">Nginx&#x5F00;&#x542F;Gzip&#x538B;&#x7F29;&#x5927;&#x5E45;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;</a></p><h2>webpack&#x5F00;&#x542F;gzip&#x538B;&#x7F29;&#x3002; &#x53EA;&#x9700;&#x8981;&#x670D;&#x52A1;&#x5668;&#x5F00;&#x542F;gzip&#x538B;&#x7F29;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5F00;&#x542F;gzip&#x538B;&#x7F29;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x90E8;&#x7F72;&#x4E0A;&#x53BB;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F1A;&#x538B;&#x7F29;&#x6587;&#x4EF6;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x3002;&#x6240;&#x4EE5;&#x524D;&#x7AEF;&#x4F7F;&#x7528;gzip&#x538B;&#x7F29;&#x662F;&#x6CA1;&#x6709;&#x8D77;&#x4F5C;&#x7528;&#x7684;&#x3002;&#x6240;&#x4EE5;compression-webpack-plugin&#x63D2;&#x4EF6;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#xFF0C;&#x5404;&#x4F4D;&#x63A2;&#x8BA8;&#x4E0B;QAQ</h2><p>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x914D;&#x5408;Nginx&#x670D;&#x52A1;&#x5668;&#xFF0C;Nginx&#x5F00;&#x542F;gzip</p><p><img alt="clipboard.png" title="clipboard.png" src="https://static.alili.techundefined"></p><blockquote>webpack4.x&#x4EE5;&#x4E0B;&#x4F7F;&#x7528;compression-webpack-plugin&#x63D2;&#x4EF6;&#xFF0C;&#x63D2;&#x4EF6;&#x7248;&#x672C;&#x5E94;&#x4F7F;&#x7528;1.x<br>webpack4.x&#x7248;&#x672C;&#x4EE5;&#x4E0A;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;compression-webpack-plugin 2.x</blockquote><ul><li>config/index.js&#x4E2D;</li></ul><pre><code>module.exports = {
  build: {
    ...
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // &#x5C31;&#x662F;&#x8FD9;&#x91CC;&#x5F00;&#x542F;gzip,vue-cli&#x642D;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x8FD9;&#x91CC;&#x9ED8;&#x8BA4;&#x4E3A;false
    productionGzipExtensions: [&apos;js&apos;, &apos;css&apos;],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}</code></pre><ul><li>build/webpack.prod.conf.js&#x4E2D;</li></ul><p>&#x4F7F;&#x7528;vue-cli&#x6784;&#x5EFA;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x6709;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;</p><pre><code>if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require(&apos;compression-webpack-plugin&apos;)
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: &apos;[path].gz[query]&apos;,
      algorithm: &apos;gzip&apos;,
      test: new RegExp(
        &apos;\\.(&apos; +
        config.build.productionGzipExtensions.join(&apos;|&apos;) +
        &apos;)$&apos;
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
</code></pre><h2>&#x82E5;&#x9996;&#x5C4F;&#x4E3A;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x6210;&#x591A;&#x5165;&#x53E3;&#xFF0C;&#x767B;&#x5F55;&#x9875;&#x5355;&#x72EC;&#x5206;&#x79BB;&#x4E3A;&#x4E00;&#x4E2A;&#x5165;&#x53E3;</h2><h2>&#x4F7F;&#x7528;uglifyjs-webpack-plugin&#x63D2;&#x4EF6;&#x4EE3;&#x66FF;webpack&#x81EA;&#x5E26;UglifyJsPlugin&#x63D2;&#x4EF6;</h2><p>&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x90FD;&#x4E0D;&#x652F;&#x6301;es6&#x538B;&#x7F29;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x6B64;&#x63D2;&#x4EF6;&#x524D;&#x9700;&#x8981;&#x7528;&#x5DE5;&#x5177;&#xFF08;&#x5982;babel-loader&#xFF09;&#x8F6C;&#x6362;es6&#x4EE3;&#x7801;</p><blockquote>&#x95EE;&#x9898;&#x63CF;&#x8FF0;&#xFF1A;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;iview&#x65F6;&#xFF0C;&#x5BFC;&#x81F4;&#x4F7F;&#x7528;UglifyJsPlugin&#x538B;&#x7F29;&#x62A5;&#x9519;<br>&#x56E0;&#x4E3A;iview&#x67D0;&#x63D2;&#x4EF6;&#x4E2D;&#x5305;&#x542B;es6&#x8BED;&#x6CD5;&#x3002;&#x7136;&#x800C;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x90FD;&#x4E0D;&#x652F;&#x6301;es6&#x538B;&#x7F29;</blockquote><p>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x4FEE;&#x6539;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;,&#x4F7F;&#x7528;babel-loader&#x8F6C;&#x6362;&#x4E00;&#x4E0B;iview&#x63D2;&#x4EF6;&#x4E2D;&#x7684;es6&#x8BED;&#x6CD5;</li></ul><pre><code>module.exports = {
  entry: {
    app: &apos;./src/main.js&apos;
  },
  output: {
    path: config.build.assetsRoot,
    filename: &apos;[name].js&apos;,
    publicPath: process.env.NODE_ENV === &apos;production&apos;
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
...
  module: {
    loaders: [
      { test: /iview.src.*?js$/, loader: &apos;babel&apos; },
      { test: /\.js$/, loader: &apos;babel&apos;, exclude: /node_modules/ }
    ],
    rules: [
    ...
      {
        test: /\.js$/,
        loader: &apos;babel-loader&apos;,
         // resolve(&apos;/node_modules/iview/src&apos;),resolve(&apos;/node_modules/iview/packages&apos;)&#x89E3;&#x51B3;iview&#x6253;&#x5305;&#x65F6;UglifyJs&#x62A5;&#x9519;
        include: [resolve(&apos;src&apos;), resolve(&apos;test&apos;), resolve(&apos;/node_modules/iview/src&apos;),resolve(&apos;/node_modules/iview/packages&apos;)]
      }
      ...
    ]
  }
}</code></pre><ul><li>webpack&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;</li></ul><pre><code>...
const UglifyJsPlugin = require(&apos;uglifyjs-webpack-plugin&apos;)
...
    new UglifyJsPlugin({
      // &#x4F7F;&#x7528;&#x5916;&#x90E8;&#x5F15;&#x5165;&#x7684;&#x65B0;&#x7248;&#x672C;&#x7684;js&#x538B;&#x7F29;&#x5DE5;&#x5177;
      parallel: true,
      uglifyOptions: {
        ie8: false, // &#x542F;&#x7528;IE8&#x652F;&#x6301;
        ecma: 6, // &#x652F;&#x6301;&#x7684;ECMAScript&#x7684;&#x7248;&#x672C;&#xFF08;5&#xFF0C;6&#xFF0C;7&#x6216;8&#xFF09;&#x3002;&#x5F71;&#x54CD;parse&#xFF0C;compress&amp;&amp; output&#x9009;&#x9879;
        warnings: false, // &#x663E;&#x793A;&#x8B66;&#x544A;
        mangle: true, // debug false
        output: {
          comments: false,
          beautify: false, // debug true
        },
        compress: {
          // &#x5728;UglifyJs&#x5220;&#x9664;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x4E0D;&#x8F93;&#x51FA;&#x8B66;&#x544A;
          warnings: false,
          // &#x5220;&#x9664;&#x6240;&#x6709;&#x7684; `console` &#x8BED;&#x53E5;
          // &#x8FD8;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;ie&#x6D4F;&#x89C8;&#x5668;
          drop_console: true,
          // &#x5185;&#x5D4C;&#x5B9A;&#x4E49;&#x4E86;&#x4F46;&#x662F;&#x53EA;&#x7528;&#x5230;&#x4E00;&#x6B21;&#x7684;&#x53D8;&#x91CF;
          collapse_vars: true,
          // &#x63D0;&#x53D6;&#x51FA;&#x51FA;&#x73B0;&#x591A;&#x6B21;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x6210;&#x53D8;&#x91CF;&#x53BB;&#x5F15;&#x7528;&#x7684;&#x9759;&#x6001;&#x503C;
          reduce_vars: true,
        }
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),</code></pre><p>&#x6B64;&#x65B9;&#x6CD5;&#x6709;&#x5F85;&#x5B9E;&#x8DF5;&#xFF0C;&#x7559;&#x5F85;&#x4E0B;&#x6B21;&#x5206;&#x4EAB; ==</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE单页应用首屏加载速度优化方案

## 原文链接
[https://segmentfault.com/a/1190000016155447](https://segmentfault.com/a/1190000016155447)

