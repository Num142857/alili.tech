---
title: 'webpack4 的生产环境优化' 
date: 2018-11-19 2:32:04
hidden: true
slug: o9gftxuthvc
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">webpack4 &#x7684;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4F18;&#x5316;</h1><p>webpack4&#x5B8C;&#x6574;&#x914D;&#x7F6E;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A; <a href="https://github.com/ziwei3749/webpack-4" rel="nofollow noreferrer" target="_blank">https://github.com/ziwei3749/...</a></p><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x4E86; webpack4 &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x6211;&#x90FD;&#x505A;&#x4E86;&#x54EA;&#x4E9B;&#x4F18;&#x5316;</p><p>&#x6587;&#x7AE0;&#x7684;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>1.&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#x3002;</li><li>2.hash &#x7F13;&#x5B58;&#x3002;</li><li>3.&#x4EE3;&#x7801;&#x5206;&#x5272;&#x3002;</li><li>4.&#x538B;&#x7F29;&#x6DF7;&#x6DC6;&#x4EE3;&#x7801;&#x3002;</li><li>5.&#x5F00;&#x542F; gzip &#x538B;&#x7F29;&#x3002;</li><li>6.&#x5173;&#x95ED; devtool&#x3002;</li><li>7.Tree Shaking</li></ul><h2 id="articleHeader1">1.&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#x3002;&#x5BF9;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#x7684;&#x5904;&#x7406;&#x548C;&#x9A8C;&#x8BC1;</h2><p>&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5305;&#x62EC;: js css image&#xFF0C;</p><p>&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x8DEF;&#x5F84;&#x7684;&#x7EC4;&#x6210;: &#x524D;&#x7F00; + &#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;&#x7684;&#x8DEF;&#x5F84;</p><p><strong>&#x524D;&#x7F00; &#xFF1A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x7684;&#x524D;&#x7F00;&#x901A;&#x8FC7; output.publicPath &#x8BBE;&#x7F6E;</strong></p><p>&#x5173;&#x4E8E;publicPath&#x7684;&#x89E3;&#x91CA; <a href="https://juejin.im/post/5ae9ae5e518825672f19b094" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5ae9ae...</a></p><p><strong>&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;&#x7684;&#x8DEF;&#x5F84;</strong></p><blockquote>js &#x7684;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;</blockquote><p>js &#x7684;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x5728; output.filename</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.resolve(__dirname, &apos;../dist&apos;),
    filename: &apos;static/js/[name].[contenthash:8].js&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">output: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/[name].[contenthash:8].js&apos;</span>
}</code></pre><blockquote>css &#x8DEF;&#x5F84;&#x914D;&#x7F6E;</blockquote><p>css &#x7684;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x5728;&#x5206;&#x79BB; css &#x7684;&#x63D2;&#x4EF6;&#x91CC;&#x3002;&#x4F8B;&#x5982;&#x4E4B;&#x524D;&#x7684; extract-text-webpack-plugin &#x6216;&#x8005; mini-css-extract-plugin</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new MiniCssExtractPlugin({
        filename: &quot;static/css/[name].[contenthash:8].css&quot;
    })
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">plugins: [
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;static/css/[name].[contenthash:8].css&quot;</span>
    })
];</code></pre><blockquote>image &#x8DEF;&#x5F84;&#x914D;&#x7F6E;</blockquote><p>img &#x7684;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x5728; url-loader &#x91CC;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: &quot;url-loader&quot;,
                    options: {
                        limit: 10000,
                        name: &quot;static/images/[name].[hash:7].[ext]&quot;
                    }
                }
            ]
        }
    ];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">modules: {
    <span class="hljs-attr">rules</span>: [
        {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
            <span class="hljs-attr">use</span>: [
                {
                    <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;url-loader&quot;</span>,
                    <span class="hljs-attr">options</span>: {
                        <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;static/images/[name].[hash:7].[ext]&quot;</span>
                    }
                }
            ]
        }
    ];
}</code></pre><p><strong>ps: &#x6709;&#x7684;&#x524D;&#x7AEF;&#x540C;&#x5B66;&#xFF0C;&#x53EF;&#x80FD;&#x50CF;&#x6211;&#x4E00;&#x6837;&#x4E0D;&#x592A;&#x6E05;&#x695A;&#x5982;&#x4F55;&#x9A8C;&#x8BC1;&#x6253;&#x5305;&#x538B;&#x7F29;&#x540E;&#x7684;&#x7684;&#x6587;&#x4EF6;&#x5185;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;&#x7684;&#x662F;&#x5426;&#x6B63;&#x786E;</strong></p><p>&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x4E0B;&#x8F7D; express &#x9879;&#x76EE;&#x811A;&#x624B;&#x67B6;&#x751F;&#x6210;&#x4E00;&#x4E2A; node &#x9879;&#x76EE;&#xFF0C;&#x5C06;&#x6253;&#x5305;&#x540E;&#x7684; dist &#x6254;&#x5230; public&#xFF0C;&#x542F;&#x52A8; node &#x670D;&#x52A1;&#x5668;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express-generator -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install express-generator -D</code></pre><p>&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x53BB;&#x6253;&#x5F00; dist &#x6587;&#x4EF6;&#x5939;&#x91CC;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x53BB;&#x786E;&#x5B9E;&#x8DEF;&#x5F84;&#x662F;&#x5426;&#x6B63;&#x786E;&#x3002;</p><h2 id="articleHeader2">2.hash &#x7F13;&#x5B58;&#x3002;</h2><p>&#x5C06;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x3001;&#x7B2C;&#x4E09;&#x65B9;&#x7C7B;&#x5E93;&#x3001;runtime &#x4EE3;&#x7801;&#x3001;css &#x5355;&#x72EC;&#x6253;&#x5305;&#xFF0C;&#x7ED9;&#x4ED6;&#x4EEC;&#x4E0D;&#x540C; hash&#xFF0C;&#x6765;&#x6700;&#x5927;&#x5316;&#x5229;&#x7528;&#x7F13;&#x5B58;</p><p>webpack3 &#x4E2D;&#x5206;&#x79BB;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x3001;&#x7B2C;&#x4E09;&#x65B9;&#x7C7B;&#x5E93;&#x9700;&#x8981;&#x7528; CommonChunksPlugin&#x3002;<br>webpack4 &#x7684;&#x65B0;&#x589E; optimization,&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x5206;&#x79BB;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x4E14; hash &#x7684;&#x7A33;&#x5B9A;&#x6027;&#x7684;&#x95EE;&#x9898;&#x4E5F;&#x6709;&#x6539;&#x8FDB;&#x3002;</p><p><strong>&#x5355;&#x72EC;&#x6253;&#x5305;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x3001;&#x7B2C;&#x4E09;&#x65B9;&#x7C7B;&#x5E93;&#x3001;runtime</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    optimization: {
        splitChunks: {      // &#x6253;&#x5305; node_modules&#x91CC;&#x7684;&#x4EE3;&#x7801;
            chunks: &apos;all&apos;
        },
        runtimeChunk: true,  // &#x6253;&#x5305; runtime &#x4EE3;&#x7801;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    optimization: {
        <span class="hljs-attr">splitChunks</span>: {      <span class="hljs-comment">// &#x6253;&#x5305; node_modules&#x91CC;&#x7684;&#x4EE3;&#x7801;</span>
            chunks: <span class="hljs-string">&apos;all&apos;</span>
        },
        <span class="hljs-attr">runtimeChunk</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// &#x6253;&#x5305; runtime &#x4EE3;&#x7801;</span>
    }</code></pre><p><strong>&#x5355;&#x72EC;&#x6253;&#x5305; css &#x4EE3;&#x7801;</strong></p><p>webpack4 &#x63A8;&#x8350; mini-css-extract-plugin</p><blockquote>&#x6CE8;&#x610F;: &#x4E4B;&#x524D;&#x7684; extract-text-webpack-plugin &#x9700;&#x8981; beta &#x7248;&#x672C;&#x624D;&#x652F;&#x6301;&#xFF0C;&#x800C;&#x4E14; contenthash &#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x3002;</blockquote><p><strong>&#x5206;&#x914D;&#x4E0D;&#x540C;&#x7684; hash</strong></p><p>&#x5173;&#x4E8E; hash &#x7A33;&#x5B9A;&#x6027;&#x7684;&#x5751;</p><p>&#x6CE8;&#x610F;&#x533A;&#x5206;</p><ul><li>[hash] &#xFF1A; &#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6709;&#x53D8;&#x52A8;&#x65F6;&#xFF0C;hash &#x53D8;&#x5316;&#x3002;</li><li>[chunkhash] &#xFF1A; chunk &#x6709;&#x53D8;&#x52A8;&#xFF0C;chunkhash &#x53D8;&#x5316;</li><li>[contenthash] &#xFF1A; &#x76EE;&#x524D;&#x6587;&#x6863;&#x6CA1;&#x6709;&#x660E;&#x786E;&#x5B9A;&#x4E49;&#x548C;&#x8BF4;&#x660E;&#xFF0C;&#x4F46;&#x662F;&#x548C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7684;&#x53D8;&#x5316;&#x76F8;&#x5173;</li></ul><p>&#x5728;&#x5206;&#x79BB; js &#x548C; css &#x65F6;&#xFF0C;&#x90FD;&#x7528;&#x8BBE;&#x7F6E; contenthash.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  output: {
    path: path.resolve(__dirname, &apos;../dist&apos;),
    filename: &apos;static/js/[name].[contenthash:8].js&apos;,
    publicPath: &apos;/&apos;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  output: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/js/[name].[contenthash:8].js&apos;</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">&apos;/&apos;</span>
  },</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new MiniCssExtractPlugin({
      filename: &apos;static/css/[name].[contenthash:8].css&apos;
    })," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;static/css/[name].[contenthash:8].css&apos;</span>
    }),</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x914D;&#x7F6E;js&#x7684;&#x6587;&#x4EF6;&#x540D;&#x65F6;&#xFF0C;&#x4E4B;&#x524D;webpack3&#x90FD;&#x662F;&#x7528;chunkhash&#x4E5F;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x8DF5;&#x540E;&#x53D1;&#x73B0;webpack4&#x4E2D;&#x7528;chunkhash&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#xFF0C;&#x4FEE;&#x6539;css&#x65F6;&#x5F15;&#x53D1;js&#x7684;chunkhash&#x53D8;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs x86asm"><code style="word-break:break-word;white-space:initial">&#x914D;&#x7F6E;<span class="hljs-keyword">js</span>&#x7684;&#x6587;&#x4EF6;&#x540D;&#x65F6;&#xFF0C;&#x4E4B;&#x524D;webpack3&#x90FD;&#x662F;&#x7528;chunkhash&#x4E5F;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x8DF5;&#x540E;&#x53D1;&#x73B0;webpack4&#x4E2D;&#x7528;chunkhash&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#xFF0C;&#x4FEE;&#x6539;css&#x65F6;&#x5F15;&#x53D1;<span class="hljs-keyword">js</span>&#x7684;chunkhash&#x53D8;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;</code></pre><p>&#x7ECF;&#x6D4B;&#x8BD5;&#x8FD9;&#x6837;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x7684;&#x786E;&#x53EF;&#x4EE5;&#x5206;&#x79BB;&#x6253;&#x5305;&#xFF0C;&#x5E76;&#x4E14;&#x5404;&#x81EA;&#x7684; hash &#x503C;&#x4E92;&#x76F8;&#x4E0D;&#x4F1A;&#x5E72;&#x6270;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x5171;&#x540C;&#x8BA8;&#x8BBA;</p><h2 id="articleHeader3">3.&#x4EE3;&#x7801;&#x5206;&#x5272;</h2><p>&#x4EE3;&#x7801;&#x5206;&#x5272;&#x6216;&#x8005;&#x8BF4;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x662F; webpack &#x4ECE;&#x8BDE;&#x751F;&#x5C31;&#x4E00;&#x76F4;&#x6807;&#x699C;&#x7684;&#x529F;&#x80FD;&#x5427;&#x3002;</p><p>&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x628A; js &#x5206;&#x5272;&#x6210;&#x51E0;&#x4EFD;&#xFF0C;&#x5728;&#x7528;&#x6237;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x65F6;&#x624D;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x7528;&#x4E00;&#x6B21;&#x6027;&#x52A0;&#x8F7D;&#x6240;&#x6709; js&#x3002;</p><p>&#x90A3;&#x4E48;&#x5728; webpack &#x91CC;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5206;&#x5272;&#x5E76;&#x4E0D;&#x662F;&#x7528;&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x6211;&#x4EEC;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x544A;&#x8BC9; webpack &#x54EA;&#x4E9B;&#x4EE3;&#x7801;&#x8981;&#x5206;&#x5272;</p><p>webpack &#x91CC;&#x6709; 2 &#x79CD; webpack &#x5206;&#x5272;&#x65B9;&#x6CD5;</p><ul><li>webpack &#x5185;&#x7F6E;&#x65B9;&#x6CD5; : require.ensure() &#x548C; require.include()</li><li>es2015 &#x5B9A;&#x4E49;&#x7684; &#x52A8;&#x6001; import,import &#x8FD4;&#x56DE; promise</li></ul><p>require.ensure &#x4F7F;&#x7528; demo</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// require.ensure()&#x7684; 4 &#x4E2A;&#x53C2;&#x6570; &#xFF1A; []&#x4F9D;&#x8D56; &#x3001; callback &#x3001; errorCallback &#x3001; chunkName
require.ensure(
    [&quot;./subPageA&quot;],
    () =&gt; {
        var subPageA = require(&quot;./subPageA&quot;);
    },
    &quot;subPageA&quot;
);

// require.include(&apos;./moduleA.js&apos;)&#x53EF;&#x4EE5;&#x63D0;&#x53D6;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x4E2D;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5230;&#x7236;chunk" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// require.ensure()&#x7684; 4 &#x4E2A;&#x53C2;&#x6570; &#xFF1A; []&#x4F9D;&#x8D56; &#x3001; callback &#x3001; errorCallback &#x3001; chunkName</span>
<span class="hljs-built_in">require</span>.ensure(
    [<span class="hljs-string">&quot;./subPageA&quot;</span>],
    () =&gt; {
        <span class="hljs-keyword">var</span> subPageA = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./subPageA&quot;</span>);
    },
    <span class="hljs-string">&quot;subPageA&quot;</span>
);

<span class="hljs-comment">// require.include(&apos;./moduleA.js&apos;)&#x53EF;&#x4EE5;&#x63D0;&#x53D6;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x4E2D;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5230;&#x7236;chunk</span></code></pre><p>import &#x4F7F;&#x7528; demo</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import(&quot;./subPageA&quot;).then(subPageA =&gt; {
    console.log(subPageA);
});

// &#x533A;&#x522B;
//  import(&apos;./subPageA&apos;)&#x4F1A;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;
//  &#x800C;require.ensure()&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x6267;&#x884C;&#xFF0C;&#x662F;&#x5728;&#x91CC;&#x9762;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x624D;&#x6267;&#x884C;&#x7684;&#x5F15;&#x5165;&#x64CD;&#x4F5C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./subPageA&quot;</span>).then(<span class="hljs-function"><span class="hljs-params">subPageA</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(subPageA);
});

<span class="hljs-comment">// &#x533A;&#x522B;</span>
<span class="hljs-comment">//  import(&apos;./subPageA&apos;)&#x4F1A;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;</span>
<span class="hljs-comment">//  &#x800C;require.ensure()&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x6267;&#x884C;&#xFF0C;&#x662F;&#x5728;&#x91CC;&#x9762;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x624D;&#x6267;&#x884C;&#x7684;&#x5F15;&#x5165;&#x64CD;&#x4F5C;&#x3002;</span></code></pre><blockquote>&#x5173;&#x4E8E;import&#x7684;&#x4F7F;&#x7528;&#x6CE8;&#x610F;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@babel&#x5347;&#x7EA7;&#x540E;&#xFF0C;&#x4F7F;&#x7528;import&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x9700;&#x8981;&#x4E0B;&#x8F7D;&#x63D2;&#x4EF6; @babel/plugin-syntax-dynamic-import

&#x4EE5;&#x4E0B;&#x7684;&#x5730;&#x5740;&#x94FE;&#x63A5;
https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-variable">@babel</span>&#x5347;&#x7EA7;&#x540E;&#xFF0C;&#x4F7F;&#x7528;import&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x9700;&#x8981;&#x4E0B;&#x8F7D;&#x63D2;&#x4EF6; <span class="hljs-variable">@babel</span>/plugin-syntax-dynamic-import

&#x4EE5;&#x4E0B;&#x7684;&#x5730;&#x5740;&#x94FE;&#x63A5;
<span class="hljs-attribute">https</span>:<span class="hljs-comment">//babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html</span></code></pre><h2 id="articleHeader4">4.&#x538B;&#x7F29;&#x6DF7;&#x6DC6;&#x4EE3;&#x7801;</h2><p>&#x542C;&#x8BF4;webpack4&#x53EA;&#x9700;&#x8981;&#x8BBE;&#x7F6E;mode:produciton&#xFF0C;&#x5C31;&#x81EA;&#x52A8;&#x6253;&#x5305;&#x6DF7;&#x6DC6;js&#x4EE3;&#x7801;&#x5566;&#xFF01;</p><p>&#x5F88;&#x597D;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x538B;&#x7F29;css&#x4E86;&#x53EF;&#x4EE5;&#x4E86;&#x5462;&#xFF0C;&#x4E8E;&#x662F;&#x4E0B;&#x8F7D;&#x63D2;&#x4EF6;optimize-css-assets-webpack-plugin</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const OptimizeCssAssetsPlugin = require(&apos;optimize-css-assets-webpack-plugin&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> OptimizeCssAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;optimize-css-assets-webpack-plugin&apos;</span>)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  optimization: {
    splitChunks: {
      chunks: &apos;all&apos;
    },
    runtimeChunk: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({})
    ]
  },
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  optimization: {
    <span class="hljs-attr">splitChunks</span>: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>
    },
    <span class="hljs-attr">runtimeChunk</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">minimizer</span>: [
      <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({})
    ]
  },
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require(&apos;cssnano&apos;),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    })," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({
      <span class="hljs-attr">assetNameRegExp</span>: <span class="hljs-regexp">/\.optimize\.css$/g</span>,
      <span class="hljs-attr">cssProcessor</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;cssnano&apos;</span>),
      <span class="hljs-attr">cssProcessorOptions</span>: { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">discardComments</span>: { <span class="hljs-attr">removeAll</span>: <span class="hljs-literal">true</span> } },
      <span class="hljs-attr">canPrint</span>: <span class="hljs-literal">true</span>
    }),</code></pre><p>&#x518D;&#x770B;&#x4E00;&#x773C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5751;&#x7239;&#x7684;&#x53D1;&#x73B0;js&#x7684;&#x538B;&#x7F29;&#x5C45;&#x7136;&#x5931;&#x6548;&#x4E86;&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x6211;&#x5728;&#x95EE;&#x7B54;&#x793E;&#x533A;&#x770B;&#x5230;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x627E;&#x5230;&#x4E86;&#x89E3;&#x91CA;&#x3002;</p><p>&#x5927;&#x81F4;&#x610F;&#x601D;&#x5C31;&#x662F;&#x3002;&#x9ED8;&#x8BA4;optimization.minimize&#x662F;true&#xFF0C;&#x6240;&#x4EE5;js&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x538B;&#x7F29;</p><p>&#x4F46;&#x662F;&#x81EA;&#x5B9A;&#x4E49;minimizer&#x540E;&#xFF0C;webpack&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4F1A;&#x53D6;&#x6D88;&#x6389;&#x3002;</p><p>&#x6587;&#x6863;&#x8FD8;&#x5F88;&#x76AE;&#x7684;&#x544A;&#x8BC9;&#x4F60;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7528;&#x4E86;css&#x538B;&#x7F29;&#xFF0C;&#x8BB0;&#x5F97;&#x81EA;&#x5DF1;&#x7528;uglifyjs&#x538B;&#x7F29;js&#x5440;&#x3002;&#x3002;&#x3002;</p><ul><li><a href="https://segmentfault.com/a/1190000014904384">https://segmentfault.com/a/11...</a></li><li><a href="https://webpack.js.org/plugins/mini-css-extract-plugin/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/plugin...</a></li></ul><p>&#x603B;&#x4E4B;&#xFF0C;&#x8FD8;&#x662F;&#x8981;&#x81EA;&#x5DF1;&#x7528;uglifyjs&#x914D;&#x7F6E;&#x540E;&#x538B;&#x7F29;js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    minimizer: [
      new OptimizeCssAssetsPlugin({}), // &#x538B;&#x7F29; css,&#x4F7F;&#x7528;minimizer&#x4F1A;&#x81EA;&#x52A8;&#x53D6;&#x6D88;webpack&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5;&#x8BB0;&#x5F97;&#x7528;UglifyJsPlugin
      new UglifyJsPlugin({
        // &#x538B;&#x7F29; js
        uglifyOptions: {
          ecma: 6,
          cache: true,
          parallel: true
        }
      })
    ]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    minimizer: [
      <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({}), <span class="hljs-comment">// &#x538B;&#x7F29; css,&#x4F7F;&#x7528;minimizer&#x4F1A;&#x81EA;&#x52A8;&#x53D6;&#x6D88;webpack&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5;&#x8BB0;&#x5F97;&#x7528;UglifyJsPlugin</span>
      <span class="hljs-keyword">new</span> UglifyJsPlugin({
        <span class="hljs-comment">// &#x538B;&#x7F29; js</span>
        uglifyOptions: {
          <span class="hljs-attr">ecma</span>: <span class="hljs-number">6</span>,
          <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>
        }
      })
    ]
</code></pre><h2 id="articleHeader5">5.&#x5F00;&#x542F; gzip &#x538B;&#x7F29;&#x3002;</h2><p>&#x5F00;&#x542F;gzip&#x538B;&#x7F29;&#xFF0C;&#x90A3;&#x4E48;&#x538B;&#x7F29;&#x7684;&#x597D;&#x5904;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</p><p>&#x53EF;&#x4EE5;&#x51CF;&#x5C0F;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#xFF0C;&#x4F20;&#x8F93;&#x901F;&#x5EA6;&#x66F4;&#x5FEB;&#x3002;</p><ul><li>&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001; response &#x65F6;&#x53EF;&#x4EE5;&#x914D;&#x7F6E; Content-Encoding&#xFF1A;gzip&#xFF0C;&#x7528;&#x6237;&#x8BF4;&#x660E;&#x6570;&#x636E;&#x7684;&#x538B;&#x7F29;&#x65B9;&#x5F0F;</li><li>&#x6D4F;&#x89C8;&#x5668;&#x63A5;&#x53D7;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x76F8;&#x5E94;&#x4E2A;&#x683C;&#x5F0F;&#x53BB;&#x89E3;&#x7801;&#x3002;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x7528; Accept-Encoding:gzip&#xFF0C;&#x7528;&#x6237;&#x8BF4;&#x660E;&#x63A5;&#x53D7;&#x54EA;&#x4E9B;&#x538B;&#x7F29;&#x65B9;&#x6CD5;</li></ul><p>&#x6240;&#x4EE5; gzip &#x683C;&#x5F0F;&#x5728; http &#x4E2D;&#x4F20;&#x8F93;&#x6587;&#x4EF6;&#x7684;&#x8BDD;&#xFF0C;&#x901F;&#x5EA6;&#x66F4;&#x5FEB;&#x3002;&#x90A3;&#x4E48;&#x8C01;&#x6765;&#x538B;&#x7F29;&#x6587;&#x4EF6;&#xFF1F;</p><p>&#x4E0D;&#x662F;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x5C31;&#x662F;&#x5BA2;&#x6237;&#x7AEF;&#x54AF;&#x3002;</p><ul><li>&#x670D;&#x52A1;&#x7AEF;&#x6BD4;&#x5982; ngix &#x6216;&#x8005; node &#x53BB;&#x505A;&#x538B;&#x7F29;&#xFF0C;</li><li>&#x4E5F;&#x53EF;&#x4EE5; webpack &#x6253;&#x5305;&#x4E0A;&#x7EBF;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x63D2;&#x4EF6;&#x53BB;&#x505A;&#x538B;&#x7F29;&#x3002;</li></ul><p>&#x670D;&#x52A1;&#x7AEF;&#x54CD;&#x5E94;&#x65F6;&#x538B;&#x7F29;&#xFF0C;&#x80AF;&#x5B9A;&#x4E0D;&#x5982;&#x5E94;&#x7528;&#x6784;&#x5EFA;&#x65F6;&#x538B;&#x7F29;&#x66F4;&#x5408;&#x9002;&#x3002;&#x56E0;&#x4E3A;&#x538B;&#x7F29;&#x4E5F;&#x662F;&#x8981;&#x6709;&#x65F6;&#x95F4;&#x5F00;&#x9500;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CompressionWebpackPlugin = require(&apos;compression-webpack-plugin&apos;);

webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: &apos;[path].gz[query]&apos;,
      algorithm: &apos;gzip&apos;,
      test: new RegExp(&apos;\\.(js|css)$&apos;),
      threshold: 10240,
      minRatio: 0.8
    })
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;compression-webpack-plugin&apos;</span>);

webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      <span class="hljs-attr">asset</span>: <span class="hljs-string">&apos;[path].gz[query]&apos;</span>,
      <span class="hljs-attr">algorithm</span>: <span class="hljs-string">&apos;gzip&apos;</span>,
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;\\.(js|css)$&apos;</span>),
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,
      <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>
    })
)</code></pre><p>&#x538B;&#x7F29;&#x4E4B;&#x540E;&#xFF0C;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x51CF;&#x5C11;&#x7684;&#x786E;&#x663E;&#x8457;&#x3002;</p><h2 id="articleHeader6">6.&#x5173;&#x95ED;devtool</h2><p>devtool&#x6211;&#x6CA1;&#x6709;&#x505A;&#x5F88;&#x6DF1;&#x5165;&#x7684;&#x7814;&#x7A76;&#x3002;</p><p>&#x6211;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x5FC5;&#x987B;&#x8981;&#x914D;&#x7F6E;&#xFF0C;&#x5426;&#x5219;&#x80AF;&#x5B9A;&#x65E0;&#x6CD5;&#x8C03;&#x8BD5;&#x3002;</p><p>&#x800C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x53EF;&#x4EE5;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x8C03;&#x8BD5;&#x4EE3;&#x7801;&#x3002;&#x5982;&#x679C;&#x7406;&#x89E3;&#x6709;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x6B63;&#x54C8;~</p><h2 id="articleHeader7">7.Tree shaking</h2><p>tree shaking &#x7684;&#x539F;&#x7406;</p><ul><li>ES6 &#x7684;&#x6A21;&#x5757;&#x662F;&#x9759;&#x6001;&#x5206;&#x6790;&#x7684;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x7F16;&#x8BD1;&#x65F6;&#x53EF;&#x4EE5;&#x5224;&#x65AD;&#x54EA;&#x4E9B;&#x4EE3;&#x7801;&#x6CA1;&#x6709; exports</li><li>&#x5206;&#x6790;&#x7A0B;&#x5E8F;&#x6D41;&#xFF0C;&#x5224;&#x65AD;&#x54EA;&#x4E9B;&#x53D8;&#x91CF;&#x6CA1;&#x6709;&#x88AB;&#x4F7F;&#x7528;&#x3001;&#x4ECE;&#x800C;&#x5220;&#x9664;&#x4EE3;&#x7801;</li></ul><p>webpack4&#x7684;&#x65B0;&#x589E;&#x4E86;sideEffects&#x6765;&#x6307;&#x5B9A;&#x201C;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x6587;&#x4EF6;&#x201D;&#xFF0C;</p><p>&#x4F46;&#x662F;&#x6211;&#x5728;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x5751;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x6837;&#x914D;&#x7F6E;&#x540E;&#xFF0C;&#x6211;&#x610F;&#x601D;&#x662F;&#x6307;&#x5B9A;.css&#x6587;&#x4EF6;&#x4E0D;&#x8981;&#x88AB;&#x201C;&#x6447;&#x201D;&#x6389;&#x3002;</p><p>&#x4F46;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x4F9D;&#x65E7;&#x5BFC;&#x81F4;&#x4E86;css&#x6587;&#x4EF6;&#x6253;&#x5305;&#x540E;&#x88AB;&#x5F53;&#x505A;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#x88AB;&#x5220;&#x9664;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;sideEffects&quot;: [
    &quot;*.css&quot;
  ]," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-string">&quot;sideEffects&quot;</span>: [
    <span class="hljs-string">&quot;*.css&quot;</span>
  ],</code></pre><p>&#x5173;&#x4E8E;tree shaking&#x5C31;&#x8D34;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x3002;&#x5173;&#x4E8E;tree shaking&#x7814;&#x7A76;&#x6E05;&#x695A;&#x540E;&#x518D;&#x66F4;&#x65B0;&#x5427;</p><p><a href="https://zhuanlan.zhihu.com/p/32831172" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6574;&#x4E2A;&#x914D;&#x7F6E;&#x7684;&#x8BF4;&#x660E;&#x5566;&#xFF0C;&#x76EE;&#x524D;tree shaking&#x76EE;&#x524D;&#x8FD8;&#x6CA1;&#x6709;&#x641E;&#x5B9A;&#xFF0C;&#x5176;&#x4ED6;&#x529F;&#x80FD;&#x6211;&#x81EA;&#x5DF1;&#x6D4B;&#x8BD5;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x8D34;&#x4E00;&#x4EFD;&#xFF0C;webpack4&#x5B8C;&#x6574;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x5730;&#x5740;&#x3002;</p><p>&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6709;&#x5E2E;&#x52A9;&#x5E0C;&#x671B;star&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x9047;&#x5230;&#x95EE;&#x9898;&#xFF0C;&#x4E5F;&#x6B22;&#x8FCE;&#x6307;&#x6559;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 的生产环境优化

## 原文链接
[https://segmentfault.com/a/1190000015836090](https://segmentfault.com/a/1190000015836090)

