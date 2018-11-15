---
title: happypack提升项目构建速度
hidden: true
categories: reprint
slug: 30124c04
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">happypack&#x63D0;&#x5347;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x901F;&#x5EA6;</h1><h2 id="articleHeader1">&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x5728;&#x770B;&#x300A;&#x6DF1;&#x5165;&#x6D45;&#x51FA;webpack&#x300B;&#x770B;&#x5230;&#x4E86;<code>happypack</code>&#x3002;&#x5C31;&#x60F3;&#x8D77;&#x516C;&#x53F8;&#x4E00;vue&#x9879;&#x76EE;&#xFF0C;&#x6BCF;&#x6B21;&#x9879;&#x76EE;&#x542F;&#x52A8;&#x90FD;&#x5C06;&#x8FD1;2&#x5206;&#x949F;&#x3002;&#x7B49;&#x7684;&#x5B9E;&#x5728;&#x8BA9;&#x4EBA;&#x4E0D;&#x8010;&#x70E6;&#xFF0C;&#x90FD;&#x591F;&#x6211;&#x652F;&#x4ED8;&#x5B9D;&#x5077;&#x4E00;&#x6CE2;&#x80FD;&#x91CF;&#x4E86;&#x3002;&#x5C31;&#x81EA;&#x5DF1;&#x5B9E;&#x8DF5;&#x4E86;&#x4E0B;&#xFF0C;&#x4E8B;&#x5B9E;&#x8BC1;&#x660E;&#x662F;&#x6709;&#x6548;&#x7684;&#x3002;&#x539F;&#x5E73;&#x5747;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x4E3A;1&#x5206;55&#x79D2;&#xFF08;5&#x6B21;&#xFF09;&#xFF0C;&#x4F7F;&#x7528;happypack&#x540E;&#x5E73;&#x5747;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x4E3A;1&#x5206;45&#x79D2;&#xFF08;5&#x6B21;&#xFF09;&#x3002;&#x6211;&#x53EA;&#x4FEE;&#x6539;&#x4E86;&#x5BF9;.vue&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x4E0B;&#x5B9E;&#x6218;&#x4EE3;&#x7801;&#xFF0C;&#x8282;&#x7701;&#x4E86;10&#x79D2;&#x8FD8;&#x662F;&#x4E0D;&#x9519;&#x6EF4;&#x3002;</p><h2 id="articleHeader2">happypack</h2><p>&#x7531;&#x4E8E;&#x6709;&#x5927;&#x91CF;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x89E3;&#x6790;&#x548C;&#x5904;&#x7406;&#xFF0C;&#x6784;&#x5EFA;&#x662F;&#x6587;&#x4EF6;&#x8BFB;&#x5199;&#x548C;&#x8BA1;&#x7B97;&#x5BC6;&#x96C6;&#x578B;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5F53;&#x6587;&#x4EF6;&#x6570;&#x91CF;&#x53D8;&#x591A;&#x540E;&#xFF0C;Webpack &#x6784;&#x5EFA;&#x6162;&#x7684;&#x95EE;&#x9898;&#x4F1A;&#x663E;&#x5F97;&#x4E25;&#x91CD;&#x3002; &#x8FD0;&#x884C;&#x5728; Node.js &#x4E4B;&#x4E0A;&#x7684; Webpack &#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x6A21;&#x578B;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4; Webpack &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x4EFB;&#x52A1;&#x9700;&#x8981;&#x4E00;&#x4EF6;&#x4EF6;&#x6328;&#x7740;&#x505A;&#xFF0C;&#x4E0D;&#x80FD;&#x591A;&#x4E2A;&#x4E8B;&#x60C5;&#x4E00;&#x8D77;&#x505A;&#x3002;<code>happypack</code>&#x628A;&#x4EFB;&#x52A1;&#x5206;&#x89E3;&#x7ED9;&#x591A;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5E76;&#x53D1;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5B50;&#x8FDB;&#x7A0B;&#x5904;&#x7406;&#x5B8C;&#x540E;&#x518D;&#x628A;&#x7ED3;&#x679C;&#x53D1;&#x9001;&#x7ED9;&#x4E3B;&#x8FDB;&#x7A0B;&#x3002;</p><h2 id="articleHeader3">&#x5B9E;&#x6218;(&#x4EE3;&#x7801;&#x6765;&#x81EA;&#x6784;&#x5EFA;&#x5C06;&#x8FD1;2&#x5206;&#x949F;&#x7684;&#x9879;&#x76EE;&#xFF09;</h2><p><strong>&#x4FEE;&#x6539;&#x524D;&#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// ...

module: {
    // ...
  rules: [
    {
      test: /\.vue$/,
      loader: &apos;vue-loader&apos;,
      options: vueLoaderConfig
    },
  ]
},
plugins: []
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// ...</span>

<span class="hljs-built_in">module</span>: {
    <span class="hljs-comment">// ...</span>
  rules: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
      <span class="hljs-attr">options</span>: vueLoaderConfig
    },
  ]
},
<span class="hljs-attr">plugins</span>: []
</code></pre><p><strong>&#x4FEE;&#x6539;&#x540E;&#x4EE3;&#x7801;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
module: {
// ...
  rules: [
    {
      test: /\.vue$/,
      loader: &apos;happypack/loader?id=vue&apos;,
    },
  ]
},
plugins: [
  new HappyPack({
    id: &apos;vue&apos;,
    loaders: [{
      loader: &apos;vue-loader&apos;,
      options: vueLoaderConfig
    }],
  }),
]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
<span class="hljs-built_in">module</span>: {
<span class="hljs-comment">// ...</span>
  rules: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;happypack/loader?id=vue&apos;</span>,
    },
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-keyword">new</span> HappyPack({
    <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;vue&apos;</span>,
    <span class="hljs-attr">loaders</span>: [{
      <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;vue-loader&apos;</span>,
      <span class="hljs-attr">options</span>: vueLoaderConfig
    }],
  }),
]
</code></pre><p>&#x5728; Loader &#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x6240;&#x6709;.vue&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x90FD;&#x4EA4;&#x7ED9;&#x4E86; happypack/loader &#x53BB;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;&#x7D27;&#x8DDF;&#x5176;&#x540E;&#x7684; querystring ?id=vue(&#x8FD9;&#x4E2A;id&#x968F;&#x4FBF;&#x53BB;&#x53EA;&#x8981;&#x8DDF;&#x4E0B;&#x9762;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;id&#x5BF9;&#x5E94;&#x4E0A;&#x5C31;&#x884C;&#x4E86;) &#x53BB;&#x544A;&#x8BC9; happypack/loader &#x53BB;&#x9009;&#x62E9;&#x54EA;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x53BB;&#x5904;&#x7406;&#x6587;&#x4EF6;&#xFF08;&#x53EF;&#x4EE5;new &#x591A;&#x4E2A;HappyPack&#x5206;&#x522B;&#x53BB;&#x5904;&#x7406;&#x591A;&#x79CD;&#x7C7B;&#x578B;&#x6587;&#x4EF6;,&#x6BD4;&#x5982;&#x4F60;&#x53EF;&#x4EE5;&#x518D;new&#x4E00;&#x4E2A;HappyPack&#x53BB;&#x5904;&#x7406;css&#xFF0C;&#x540C;&#x4E0A;&#x9762;&#x5904;&#x7406;.vue&#x6587;&#x4EF6;&#x4E00;&#x6837;&#xFF09;&#x3002;<br>&#x5728; Plugin &#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x65B0;&#x589E;&#x4E86;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x5206;&#x522B;&#x7528;&#x4E8E;&#x544A;&#x8BC9; happypack/loader &#x53BB;&#x5982;&#x4F55;&#x5904;&#x7406;.vue&#x3002;&#x9009;&#x9879;&#x4E2D;&#x7684; id &#x5C5E;&#x6027;&#x7684;&#x503C;&#x548C;&#x4E0A;&#x9762; querystring &#x4E2D;&#x7684; ?id=vue&#x76F8;&#x5BF9;&#x5E94;&#xFF0C;&#x9009;&#x9879;&#x4E2D;&#x7684; loaders &#x5C5E;&#x6027;&#x548C; Loader &#x914D;&#x7F6E;&#x4E2D;&#x4E00;&#x6837;&#x3002;</p><p>&#x63A5;&#x5165; HappyPack &#x540E;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x7ED9;&#x9879;&#x76EE;&#x5B89;&#x88C5;&#x65B0;&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p><blockquote><code>npm i -D happypack</code></blockquote><p>&#x5728;&#x5B9E;&#x4F8B;&#x5316; HappyPack &#x63D2;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x4F20;&#x5165; <code>id</code> &#x548C; <code>loaders</code> &#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x5916;&#xFF0C;<code>HappyPack</code> &#x8FD8;&#x652F;&#x6301;&#x5982;&#x4E0B;&#x53C2;&#x6570;&#xFF1A;</p><ul><li><code>threads</code> &#x4EE3;&#x8868;&#x5F00;&#x542F;&#x51E0;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5904;&#x7406;&#x8FD9;&#x4E00;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;3&#x4E2A;&#xFF0C;&#x7C7B;&#x578B;&#x5FC5;&#x987B;&#x662F;&#x6574;&#x6570;&#x3002;</li><li><code>verbose</code> &#x662F;&#x5426;&#x5141;&#x8BB8; <code>HappyPack</code> &#x8F93;&#x51FA;&#x65E5;&#x5FD7;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F; true&#x3002;</li><li><code>threadPool</code> &#x4EE3;&#x8868;&#x5171;&#x4EAB;&#x8FDB;&#x7A0B;&#x6C60;&#xFF0C;&#x5373;&#x591A;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x90FD;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x5171;&#x4EAB;&#x8FDB;&#x7A0B;&#x6C60;&#x4E2D;&#x7684;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5904;&#x7406;&#x4EFB;&#x52A1;&#xFF0C;&#x4EE5;&#x9632;&#x6B62;&#x8D44;&#x6E90;&#x5360;&#x7528;&#x8FC7;&#x591A;&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
happypack提升项目构建速度

## 原文链接
[https://segmentfault.com/a/1190000016418966](https://segmentfault.com/a/1190000016418966)

