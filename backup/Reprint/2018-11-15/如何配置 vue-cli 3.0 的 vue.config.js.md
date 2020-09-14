---
title: 如何配置 vue-cli 3.0 的 vue.config.js
hidden: true
categories: [reprint]
slug: de855b5d
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p><a href="https://cli.vuejs.org/guide/" rel="nofollow noreferrer">vue-cli 3 &#x82F1;&#x6587;&#x6587;&#x6863;</a><br><a href="https://cli.vuejs.org/zh/guide/" rel="nofollow noreferrer">vue-cli 3 &#x4E2D;&#x6587;&#x6587;&#x6863;</a><br><a href="https://webpack.js.org/plugins/mini-css-extract-plugin/" rel="nofollow noreferrer">webpack 4 plugins</a><br><a href="https://github.com/mozilla-neutrino/webpack-chain" rel="nofollow noreferrer">webpack-chain</a></p><p>TLDR</p><p>vue-cli 3 &#x4E0E; 2 &#x7248;&#x672C;&#x6709;&#x5F88;&#x5927;&#x533A;&#x522B;</p><ol><li>vue-cli 3 &#x7684; github &#x4ED3;&#x5E93;&#x7531;&#x539F;&#x6709;&#x72EC;&#x7ACB;&#x7684; github &#x4ED3;&#x5E93;&#x8FC1;&#x79FB;&#x5230;&#x4E86; vue &#x9879;&#x76EE;&#x4E0B;</li><li>vue-cli 3 &#x7684;&#x9879;&#x76EE;&#x67B6;&#x6784;&#x5B8C;&#x5168;&#x629B;&#x5F03;&#x4E86; vue-cli 2 &#x7684;&#x539F;&#x6709;&#x67B6;&#x6784;&#xFF0C;3 &#x7684;&#x8BBE;&#x8BA1;&#x66F4;&#x52A0;&#x62BD;&#x8C61;&#x548C;&#x7B80;&#x6D01;&#xFF08;&#x6B64;&#x5904;&#x540E;&#x7EED;&#x53EF;&#x4EE5;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#xFF09;</li><li>vue-cli 3 &#x662F;&#x57FA;&#x4E8E; webpack 4 &#x6253;&#x9020;&#xFF0C;vue-cli 2 &#x8FD8;&#x662F; webapck 3</li><li>vue-cli 3 &#x7684;&#x8BBE;&#x8BA1;&#x539F;&#x5219;&#x662F;&#x201C;0&#x914D;&#x7F6E;&#x201D;</li><li>vue-cli 3 &#x63D0;&#x4F9B;&#x4E86; vue ui &#x547D;&#x4EE4;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x53EF;&#x89C6;&#x5316;&#x914D;&#x7F6E;&#xFF0C;&#x66F4;&#x52A0;&#x4EBA;&#x6027;&#x5316;</li></ol><p>&#x7531;&#x4E8E; vue-cli 3 &#x4E5F;&#x5B66;&#x4E60;&#x4E86; rollup &#x7684;&#x96F6;&#x914D;&#x7F6E;&#x601D;&#x8DEF;&#xFF0C;&#x6240;&#x4EE5;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x540E;&#xFF0C;&#x6CA1;&#x6709;&#x4E86;&#x4EE5;&#x524D;&#x719F;&#x6089;&#x7684; build &#x76EE;&#x5F55;&#xFF0C;&#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x4E86; webpack.base.config.js&#x3001;webpack.dev.config.js &#x3001;webpack.prod.config.js &#x7B49;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><p>&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x8BE5;&#x5982;&#x4F55;&#x53BB;&#x914D;&#x7F6E;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E86;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E00;&#x5207;&#x90FD;&#x662F;&#x56E0;&#x4E3A; vue-cli 3 &#x7684;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x5E2E;&#x5F00;&#x53D1;&#x8005;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86; 80% &#xFF0C;&#x751A;&#x81F3;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x60C5;&#x5F62;&#x4E0B;&#x7684; webpack &#x914D;&#x7F6E;&#x3002;</p><p>&#x4E0A;&#x8FF0;&#x529F;&#x80FD;&#x5C31;&#x662F;&#x7531; @vue/cli-service &#x4F9D;&#x8D56;&#x53BB;&#x5904;&#x7406;&#xFF0C;&#x5F53;&#x4F60;&#x6253;&#x5F00; node_modules &#x76EE;&#x5F55;&#x4E0B; @vue &#x4E2D;&#x7684; cli-service &#x770B;&#x4E00;&#x773C;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x627E;&#x5230;&#x4E86;&#x719F;&#x6089;&#x7684;&#x611F;&#x89C9;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/bVbfIZG?w=620&amp;h=1350" src="https://static.alili.tech/img/bVbfIZG?w=620&amp;h=1350" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x80AF;&#x5B9A;&#x8FD8;&#x6709;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#x4E86;&#xFF1F;</p><p>&#x8FD9;&#x70B9;&#x5C31;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x624B;&#x52A8;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; vue.config.js&#xFF0C;&#x6B64;&#x5904;&#x53C2;&#x8003;&#x6211;&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x6A21;&#x677F;:</p><pre><code>module.exports = {
  baseUrl: process.env.NODE_ENV === &apos;production&apos;
    ? &apos;//your_url&apos;
    : &apos;/&apos;,

  outputDir: &apos;dist&apos;,

  assetsDir: &apos;static&apos;,

  filenameHashing: true,

  // When building in multi-pages mode, the webpack config will contain different plugins
  // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
  // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  pages: {
    index: {
      // entry for the pages
      entry: &apos;src/pages/index/index.js&apos;,
      // the source template
      template: &apos;src/pages/index/index.html&apos;,
      // output as dist/index.html
      filename: &apos;index.html&apos;,
      // when using title option,
      // template title tag needs to be &lt;title&gt;&lt;%= htmlWebpackPlugin.options.title %&gt;&lt;/title&gt;
      title: &apos;&#x9996;&#x9875;&apos;,
      // chunks to include on this pages, by default includes
      // extracted common chunks and vendor chunks.
      chunks: [&apos;chunk-vendors&apos;, &apos;chunk-common&apos;, &apos;index&apos;]
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: &apos;&apos;
  },

  // eslint-loader &#x662F;&#x5426;&#x5728;&#x4FDD;&#x5B58;&#x7684;&#x65F6;&#x5019;&#x68C0;&#x67E5;
  lintOnSave: true,

  // &#x662F;&#x5426;&#x4F7F;&#x7528;&#x5305;&#x542B;&#x8FD0;&#x884C;&#x65F6;&#x7F16;&#x8BD1;&#x5668;&#x7684;Vue&#x6838;&#x5FC3;&#x7684;&#x6784;&#x5EFA;
  runtimeCompiler: false,

  // &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B; babel-loader &#x5FFD;&#x7565;&#x5176;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6; node_modules
  transpileDependencies: [],

  // &#x751F;&#x4EA7;&#x73AF;&#x5883; sourceMap
  productionSourceMap: false,

  // cors &#x76F8;&#x5173; https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack &#x914D;&#x7F6E;&#xFF0C;&#x952E;&#x503C;&#x5BF9;&#x8C61;&#x65F6;&#x4F1A;&#x5408;&#x5E76;&#x914D;&#x7F6E;&#xFF0C;&#x4E3A;&#x65B9;&#x6CD5;&#x65F6;&#x4F1A;&#x6539;&#x5199;&#x914D;&#x7F6E;
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: (config) =&gt; {
  },

  // webpack &#x94FE;&#x63A5; API&#xFF0C;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x548C;&#x4FEE;&#x6539; webapck &#x914D;&#x7F6E;
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) =&gt; {
    // &#x56E0;&#x4E3A;&#x662F;&#x591A;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x53D6;&#x6D88; chunks&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x53EA;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684; JS / CSS
    config.optimization
      .splitChunks({
        cacheGroups: {}
      });

    // &apos;src/lib&apos; &#x76EE;&#x5F55;&#x4E0B;&#x4E3A;&#x5916;&#x90E8;&#x5E93;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x53C2;&#x4E0E; eslint &#x68C0;&#x6D4B;
    config.module
      .rule(&apos;eslint&apos;)
      .exclude
      .add(&apos;/Users/maybexia/Downloads/FE/community_built-in/src/lib&apos;)
      .end()
  },

  // &#x914D;&#x7F6E;&#x9AD8;&#x4E8E;chainWebpack&#x4E2D;&#x5173;&#x4E8E; css loader &#x7684;&#x914D;&#x7F6E;
  css: {
    // &#x662F;&#x5426;&#x5F00;&#x542F;&#x652F;&#x6301; foo.module.css &#x6837;&#x5F0F;
    modules: false,

    // &#x662F;&#x5426;&#x4F7F;&#x7528; css &#x5206;&#x79BB;&#x63D2;&#x4EF6; ExtractTextPlugin&#xFF0C;&#x91C7;&#x7528;&#x72EC;&#x7ACB;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x8F7D;&#x5165;&#xFF0C;&#x4E0D;&#x91C7;&#x7528; &lt;style&gt; &#x65B9;&#x5F0F;&#x5185;&#x8054;&#x81F3; html &#x6587;&#x4EF6;&#x4E2D;
    extract: true,

    // &#x662F;&#x5426;&#x6784;&#x5EFA;&#x6837;&#x5F0F;&#x5730;&#x56FE;&#xFF0C;false &#x5C06;&#x63D0;&#x9AD8;&#x6784;&#x5EFA;&#x901F;&#x5EA6;
    sourceMap: false,

    // css&#x9884;&#x8BBE;&#x5668;&#x914D;&#x7F6E;&#x9879;
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    host: &apos;127.0.0.1&apos;,

    port: 3000,

    https: false,

    hotOnly: false,

    proxy: null,

    before: app =&gt; {
    }
  },
  // &#x6784;&#x5EFA;&#x65F6;&#x5F00;&#x542F;&#x591A;&#x8FDB;&#x7A0B;&#x5904;&#x7406; babel &#x7F16;&#x8BD1;
  parallel: require(&apos;os&apos;).cpus().length &gt; 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // &#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x914D;&#x7F6E;
  pluginOptions: {}
};
</code></pre><p>&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x6240;&#x6709;&#x7684;&#x95EE;&#x9898;&#x90FD;&#x96C6;&#x4E2D;&#x5728;&#x4E86;--- &#x6211;&#x5230;&#x5E95;&#x8981;&#x600E;&#x4E48;&#x6837;&#x53BB;&#x4FEE;&#x6539;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1F;</p><p>&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x6BD4;&#x5982;&#x591A;&#x9875;&#x9762;&#x3001;&#x63A5;&#x53E3;&#x4EE3;&#x7406;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x53BB;&#x770B;&#x4E0B;&#x5B98;&#x65B9; doc &#xFF0C;&#x6587;&#x7AE0;&#x6700;&#x4E0A;&#x9762;&#x6709;&#x63D0;&#x4F9B;&#x3002;</p><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x6539;&#x52A8;&#x539F;&#x672C; webpack &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#x4E86;&#xFF1F;</p><p>&#x56E0;&#x4E3A; vue-cli 3 &#x4E2D;&#x7684; cli-service &#x5BF9; webpack 4 &#x5F15;&#x5165;&#x4E86; webpack-chain &#x63D2;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x5BF9;&#x914D;&#x7F6E;&#x8FDB;&#x884C;&#x4E86;&#x9AD8;&#x5EA6;&#x62BD;&#x8C61;&#x5316;&#xFF0C;&#x6240;&#x4EE5;&#x5F00;&#x53D1;&#x8005;&#x60F3;&#x968F;&#x5FC3;&#x6240;&#x6B32;&#x7684;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#xFF0C;&#x64CD;&#x4F5C;&#x65B9;&#x5F0F;&#x5C31;&#x6BD4;&#x4EE5;&#x524D;&#x66F4;&#x52A0;&#x96BE;&#x3002;&#x5728;&#x6211;&#x7684;&#x4EB2;&#x8EAB;&#x5B9E;&#x8DF5;&#x4E0B;&#xFF0C;&#x603B;&#x7ED3;&#x4E86;&#x51E0;&#x70B9;&#xFF0C;&#x4F9B;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#xFF1A;</p><p>&#x9996;&#x5148;&#xFF0C;&#x4FEE;&#x6539;&#x70B9;&#x4E3B;&#x8981;&#x4F4D;&#x4E8E; vue.config.js &#x4E2D;&#x7684;</p><pre><code>configureWebpack: (config) =&gt; {
// &#x7B80;&#x5355;/&#x57FA;&#x7840;&#x914D;&#x7F6E;&#xFF0C;&#x6BD4;&#x5982;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x63D2;&#x4EF6;
},</code></pre><pre><code>chainWebpack: (config) =&gt; {
// &#x94FE;&#x5F0F;&#x914D;&#x7F6E;
}</code></pre><pre><code>loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
}</code></pre><p>&#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x53EF;&#x4EE5;&#x770B;&#x6587;&#x7AE0;&#x6700;&#x4E0A;&#x9762;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x6B64;&#x5904;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;</p><p>&#x6838;&#x5FC3;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#xFF1A; <strong>cmd &#x4E2D;&#x6572; vue inspect &gt; output.js</strong> , &#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4EFD;&#x6700;&#x7EC8;&#x751F;&#x6548;&#x7684; webpack &#x914D;&#x7F6E;&#x4FE1;&#x606F;&#xFF0C;&#x7701;&#x53BB;&#x4E86;&#x4F60;&#x81EA;&#x5DF1;&#x53BB;&#x770B; cli-service &#x6E90;&#x7801;&#x3002;</p><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><p>&#x6211;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539; eslint &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x8BA9;&#x5B83;&#x4E0D;&#x53BB;&#x68C0;&#x6D4B;&#x6211;&#x9879;&#x76EE;&#x4E0B;&#x7684; src/lib &#x76EE;&#x5F55;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x5916;&#x90E8;&#x5E93;&#x6587;&#x4EF6;&#xFF08;&#x5176;&#x5B9E;&#x6B64;&#x5904;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x76F4;&#x63A5;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; .eslintignore&#x6587;&#x4EF6;&#x53BB;&#x5904;&#x7406;&#xFF0C;&#x4F46;&#x6211;&#x8FD9;&#x91CC;&#x9009;&#x62E9;&#x4FEE;&#x6539; webpack &#x6587;&#x4EF6;&#xFF09;</p><p>&#x7B2C;&#x4E00;&#x6B65;: vue inspect &gt; output.js<br>&#x7B2C;&#x4E8C;&#x6B65;: &#x5728; output.js &#x4E2D;&#x641C;&#x7D22; eslint &#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfIZU?w=1888&amp;h=992" src="https://static.alili.tech/img/bVbfIZU?w=1888&amp;h=992" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x7B2C;&#x4E09;&#x6B65;: &#x6211;&#x786E;&#x5B9A;&#x4E86;&#x6211;&#x8981;&#x4FEE;&#x7684;&#x662F; exclude &#x914D;&#x7F6E;&#x9879;<br>&#x7B2C;&#x56DB;&#x6B65;: &#x53BB; <a href="https://github.com/mozilla-neutrino/webpack-chain" rel="nofollow noreferrer">mozilla-neutrino/webpack-chain</a> &#x5168;&#x5C40;&#x641C; exclude&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfIZ5?w=642&amp;h=1224" src="https://static.alili.tech/img/bVbfIZ5?w=642&amp;h=1224" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x7B2C;&#x4E94;&#x6B65;: &#x56E0;&#x4E3A; exclude &#x53EA;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x5FAE;&#x5FAE;&#x4E00;&#x7B11;&#x5F88;&#x503E;&#x57CE;&#x3002;&#x4F46;&#x662F;&#x6211;&#x770B;&#x5230;&#x4E86; include&#xFF0C;&#x63A5;&#x7740;&#x641C; include&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfI0i?w=880&amp;h=630" src="https://static.alili.tech/img/bVbfI0i?w=880&amp;h=630" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x7B2C;&#x516D;&#x6B65;: &#x53C2;&#x8003; include &#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfI0n?w=976&amp;h=318" src="https://static.alili.tech/img/bVbfI0n?w=976&amp;h=318" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5728; vue inspect &gt; output.js &#x770B;&#x4E00;&#x4E0B;&#xFF0C;</p><p><span class="img-wrap"><img data-src="/img/bVbfI0p?w=1824&amp;h=998" src="https://static.alili.tech/img/bVbfI0p?w=1824&amp;h=998" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>done</p><p>&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF0C;&#x5728;&#x591A;&#x7528;&#x51E0;&#x6B21; webpack-chain &#x4EE5;&#x540E;&#xFF0C;&#x76F8;&#x4FE1;&#x6211;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5F88;&#x591A;&#x89C4;&#x5F8B;&#xFF0C;vue-cli 3 &#x4E5F;&#x5C31;&#x5F88;&#x7B80;&#x5355;&#x5566;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何配置 vue-cli 3.0 的 vue.config.js

## 原文链接
[https://segmentfault.com/a/1190000016101954](https://segmentfault.com/a/1190000016101954)

