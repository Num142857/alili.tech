---
title: 【vue-cli 3.0】 vue.config.js配置 - 路径别名
hidden: true
categories: [reprint]
slug: e2d64bd9
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h1>&#x5982;&#x4F55;&#x914D;&#x7F6E;vue-cli 3&#x4E2D;vue.config.js&#x7684;&#x8DEF;&#x5F84;&#x522B;&#x540D;&#xFF1F;</h1><p>&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x66F4;&#x65B0;&#x7535;&#x8111;&#x91CD;&#x88C5;&#x4E86;&#x4E00;&#x4E0B;vue-cli&#xFF0C;&#x53D1;&#x73B0;&#x4E86;vue-cli&#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#x5230;3.0&#x7248;&#x3002;&#x7528;&#x6765;&#x642D;&#x5EFA;&#x9879;&#x76EE;&#x540E;&#x53D1;&#x73B0;&#x7B80;&#x5316;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x800C;&#x4E14;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x5168;&#x90E8;&#x7EDF;&#x4E00;&#x5728;vue.config.js&#x4E2D;&#xFF0C;&#x5F88;&#x65B9;&#x4FBF;&#x6709;&#x6CA1;&#x6709;&#xFF0C;&#x4ECE;&#x6B64;&#x4EE5;&#x540E;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8D70;&#x904D;&#x516C;&#x53F8;&#x5927;&#x5C0F;&#x9879;&#x76EE;&#xFF0C;&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x6BCF;&#x6B21;&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#x65F6;&#x91CD;&#x65B0;&#x914D;&#x7F6E;&#x5404;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x9009;&#x9879;&#x4E86;&#x3002;&#x90A3;&#x4E48;&#x600E;&#x4E48;&#x5728;vue.config.js&#x4E2D;&#x914D;&#x7F6E;&#x8DEF;&#x5F84;&#x522B;&#x540D;&#x5462;&#xFF1F;</p><h3>1. <a href="https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create" rel="nofollow noreferrer">&#x521B;&#x5EFA;&#x9879;&#x76EE;</a></h3><h3>2. &#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA; vue.config.js</h3><h3>3. &#x4FEE;&#x6539;vue.config.js</h3><pre><code class="js">// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        &apos;assets&apos;: &apos;@/assets&apos;,
        &apos;components&apos;: &apos;@/components&apos;,
        &apos;views&apos;: &apos;@/views&apos;,
      }
    }
  },
}
</code></pre><hr><p>&#x4E4B;&#x6240;&#x4EE5;&#x7528;<code>&apos;@/assets&apos;</code>&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5077;&#x4E86;&#x4E2A;&#x61D2;&#x5229;&#x7528;3.x&#x4E2D;<code>/node_modules/@vue/cli-service/lib/config/base.js</code>&#x4E2D;&#x5DF2;&#x7ECF;&#x914D;&#x597D;&#x7684;<code>@</code>&#x8DEF;&#x5F84;,&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x8FDB;&#x5165;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x770B;&#x4E00;&#x770B;</p><pre><code class="js">&#xB7;&#xB7;&#xB7;
    webpackConfig.resolve
      .set(&apos;symlinks&apos;, false)
      .extensions
        .merge([&apos;.js&apos;, &apos;.jsx&apos;, &apos;.vue&apos;, &apos;.json&apos;])
        .end()
      .modules
        .add(&apos;node_modules&apos;)
        .add(api.resolve(&apos;node_modules&apos;))
        .add(resolveLocal(&apos;node_modules&apos;))
        .end()
      .alias
        .set(&apos;@&apos;, api.resolve(&apos;src&apos;))
        .set(
          &apos;vue$&apos;,
          options.runtimeCompiler
            ? &apos;vue/dist/vue.esm.js&apos;
            : &apos;vue/dist/vue.runtime.esm.js&apos;
        )
&#xB7;&#xB7;&#xB7;</code></pre><blockquote>&#x53C2;&#x8003;&#x6587;&#x6863;&#xFF1A;<br><a href="https://cli.vuejs.org/zh/guide/webpack.html#webpack-%E7%9B%B8%E5%85%B3" rel="nofollow noreferrer">vue-cli3 webpack &#x76F8;&#x5173;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#x65B9;&#x5F0F;</a><br><a href="https://webpack.js.org/configuration/resolve/#resolve-alias" rel="nofollow noreferrer">webpack resolve.alias</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vue-cli 3.0】 vue.config.js配置 - 路径别名

## 原文链接
[https://segmentfault.com/a/1190000016135314](https://segmentfault.com/a/1190000016135314)

