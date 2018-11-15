---
title: vue cli 平稳升级webapck4
hidden: true
categories: reprint
slug: 5c5d3d9c
date: 2018-10-29 02:30:09
---

{{< raw >}}
<blockquote>webpack4 released &#x5DF2;&#x7ECF;&#x6709;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x63D2;&#x4EF6;&#x7CFB;&#x7EDF;&#x8D8B;&#x4E8E;&#x5E73;&#x7A33;&#xFF0C;&#x9002;&#x9022;&#x5BF9;webpack3&#x7684;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x5F88;&#x4E0D;&#x6EE1;&#x610F;&#xFF0C;&#x56E0;&#x6B64;&#x51B3;&#x5B9A;&#x5C06;&#x5F53;&#x524D;&#x5728;&#x505A;&#x7684;&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x5347;&#x7EA7;&#xFF0C;&#x6B63;&#x597D;&#x4E5F;&#x5B9E;&#x8DF5;&#x4E00;&#x4E0B;webpack4&#x3002;</blockquote><h2 id="articleHeader0">&#x65B0;&#x7279;&#x6027;</h2><h4>0&#x914D;&#x7F6E;</h4><p>&#x5E94;&#x8BE5;&#x662F;parcel&#x51FA;&#x6765;&#x4EE5;&#x540E;&#xFF0C;webpack&#x56E2;&#x961F;&#x610F;&#x8BC6;&#x5230;&#x5176;&#x914D;&#x7F6E;&#x786E;&#x5B9E;&#x6709;&#x70B9;&#x590D;&#x6742;&#xFF0C;&#x4E0D;&#x592A;&#x5BB9;&#x6613;&#x4E0A;&#x624B;&#x3002;so, webapck4 &#x5F00;&#x59CB;&#x652F;&#x6301;0&#x914D;&#x7F6E;&#x542F;&#x52A8;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x4E07;&#x53D8;&#x4E0D;&#x79BB;&#x5176;&#x5B97;&#xFF0C;webpack4&#x7684;0&#x914D;&#x7F6E;&#x4E5F;&#x53EA;&#x662F;&#x652F;&#x6301;&#x4E86;&#x9ED8;&#x8BA4;entry &#x548C; output&#x800C;&#x5DF2;&#xFF0C;&#x5373;&#x9ED8;&#x8BA4;entry&#x4E3A;./src,&#x9ED8;&#x8BA4;output&#x4E3A;/dist&#x3002;</p><h4>&#x6A21;&#x5F0F;&#x9009;&#x62E9;mode</h4><p>mode&#x6709;&#x4E24;&#x4E2A;&#x53EF;&#x9009;&#x9879;&#xFF0C;production &amp; development&#x3002;&#x4F5C;&#x4E3A;&#x5FC5;&#x9009;&#x9879;&#xFF0C;mode&#x662F;&#x4E0D;&#x53EF;&#x7F3A;&#x7701;&#x7684;&#x3002;&#x5728;production&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4F1A;&#x9ED8;&#x8BA4;&#x505A;&#x4E00;&#x4E9B;&#x5FC5;&#x8981;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x5982;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x548C;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;&#xFF0C;&#x8FD8;&#x4F1A;&#x9ED8;&#x8BA4;&#x6307;&#x5B9A;process.env.NODE_ENV &#x4E3A; production&#x3002;&#x5728;development&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4F18;&#x5316;&#x4E86;&#x589E;&#x91CF;&#x6784;&#x5EFA;&#xFF0C;&#x652F;&#x6301;&#x6CE8;&#x91CA;&#x548C;&#x63D0;&#x793A;&#xFF0C;&#x5E76;&#x4E14;&#x652F;&#x6301; eval &#x4E0B;&#x7684; source maps&#xFF0C;&#x540C;&#x65F6;&#x9ED8;&#x8BA4;&#x6307;&#x5B9A;process.env.NODE_ENV &#x4E3A; development&#x3002;</p><h4>sideEffects</h4><p>&#x901A;&#x8FC7;&#x8BE5;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x5927;&#x5E45;&#x5EA6;&#x51CF;&#x5C0F;&#x6253;&#x5305;&#x4F53;&#x79EF;&#x3002;&#x5F53;&#x6A21;&#x5757;&#x7684; package.json &#x914D;&#x7F6E;sideEffects:false&#x8868;&#x660E;&#x8BE5;&#x6A21;&#x5757;&#x6CA1;&#x6709;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740; webpack &#x53EF;&#x4EE5;&#x5B89;&#x5168;&#x5730;&#x6E05;&#x9664;&#x88AB;&#x7528;&#x4E8E;&#x91CD;&#x590D;&#x5BFC;&#x51FA;(re-exports)&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h4>&#x6A21;&#x5757;&#x7C7B;&#x578B;</h4><p>webpack4&#x63D0;&#x4F9B;&#x4E86;5&#x79CD;&#x6A21;&#x5757;&#x7C7B;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json: &#x53EF;&#x901A;&#x8FC7; require &#x548C; import &#x5BFC;&#x5165;&#x7684; JSON &#x683C;&#x5F0F;&#x7684;&#x6570;&#x636E;(&#x9ED8;&#x8BA4;&#x4E3A; .json &#x7684;&#x6587;&#x4EF6;)

webassembly: WebAssembly &#x6A21;&#x5757;&#xFF0C;&#xFF08;&#x76EE;&#x524D;&#x662F; .wasm &#x6587;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x7C7B;&#x578B;&#xFF09;

javascript/auto: (webpack 3&#x4E2D;&#x7684;&#x9ED8;&#x8BA4;&#x7C7B;&#x578B;)&#x652F;&#x6301;&#x6240;&#x6709;&#x7684;JS&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF1A;CommonJS&#x3001;AMD&#x3002;

javascript/esm: EcmaScript&#x6A21;&#x5757;&#xFF08;&#x9ED8;&#x8BA4; .mjs &#x6587;&#x4EF6;&#xFF09;&#x3002;

javascript/dynamic: &#x4EC5;&#x652F;&#x6301; CommonJS &amp; AMD&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code><span class="hljs-attribute">json</span>: &#x53EF;&#x901A;&#x8FC7; require &#x548C; import &#x5BFC;&#x5165;&#x7684; JSON &#x683C;&#x5F0F;&#x7684;&#x6570;&#x636E;(&#x9ED8;&#x8BA4;&#x4E3A; .json &#x7684;&#x6587;&#x4EF6;)

<span class="http"><span class="hljs-attribute">webassembly</span>: WebAssembly &#x6A21;&#x5757;&#xFF0C;&#xFF08;&#x76EE;&#x524D;&#x662F; .wasm &#x6587;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x7C7B;&#x578B;&#xFF09;

<span class="http"><span class="hljs-attribute">javascript/auto</span>: (webpack 3&#x4E2D;&#x7684;&#x9ED8;&#x8BA4;&#x7C7B;&#x578B;)&#x652F;&#x6301;&#x6240;&#x6709;&#x7684;JS&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF1A;CommonJS&#x3001;AMD&#x3002;

<span class="http"><span class="hljs-attribute">javascript/esm</span>: EcmaScript&#x6A21;&#x5757;&#xFF08;&#x9ED8;&#x8BA4; .mjs &#x6587;&#x4EF6;&#xFF09;&#x3002;

<span class="actionscript">javascript/<span class="hljs-keyword">dynamic</span>: &#x4EC5;&#x652F;&#x6301; CommonJS &amp; AMD&#x3002;
</span></span></span></span></code></pre><h4>JSON</h4><p>webpack 4 &#x4E0D;&#x4EC5;&#x652F;&#x6301;&#x672C;&#x5730;&#x5904;&#x7406; JSON&#xFF0C;&#x8FD8;&#x652F;&#x6301;&#x5BF9; JSON &#x7684; Tree Shaking&#x3002;&#x5F53;&#x4F7F;&#x7528; ESM &#x8BED;&#x6CD5; import json &#x65F6;&#xFF0C;webpack &#x4F1A;&#x6D88;&#x9664;&#x6389;JSON Module &#x4E2D;&#x672A;&#x4F7F;&#x7528;&#x7684;&#x5BFC;&#x51FA;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x7528; loader &#x8F6C;&#x6362; json &#x4E3A; js&#xFF0C;&#x9700;&#x8981;&#x8BBE;&#x7F6E; type &#x4E3A; javascript/auto&#x3002;</p><h4>optimization</h4><p>Webpack 4 &#x5220;&#x9664;&#x4E86; CommonsChunkPlugin&#xFF0C;&#x5E76;&#x9ED8;&#x8BA4;&#x542F;&#x7528;&#x4E86;&#x5B83;&#x7684;&#x8BB8;&#x591A;&#x529F;&#x80FD;&#x3002;&#x56E0;&#x6B64;webpack4&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5F88;&#x597D;&#x7684;&#x9ED8;&#x8BA4;&#x4F18;&#x5316;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x90A3;&#x4E9B;&#x9700;&#x8981;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x7F13;&#x5B58;&#x7B56;&#x7565;&#xFF0C;&#x589E;&#x52A0;&#x4E86; optimization.splitChunks &#x548C; optimization.runtimeChunk&#x3002;&#x5177;&#x4F53;&#x89E3;&#x91CA;&#x53EF;&#x53C2;&#x8003;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x89E3;&#x91CA;&#x5F97;&#x5F88;&#x8BE6;&#x7EC6;&#x3002;<a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693" rel="nofollow noreferrer" target="_blank">RIP CommonsChunkPlugin</a><button class="btn btn-xs btn-default ml10 preview" data-url="sokra/1522d586b8e5c0f5072d7565c2bee693" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button><br>&#x3002;</p><h2 id="articleHeader1">&#x624B;&#x628A;&#x624B;&#x5347;&#x7EA7;</h2><p>&#x6211;&#x662F;&#x628A;&#x539F;&#x6765;vue cli&#x7684;&#x9879;&#x76EE;&#x505A;&#x4E86;&#x4E00;&#x4E0B;&#x5347;&#x7EA7;&#xFF0C;&#x603B;&#x4F53;&#x6765;&#x8BF4;&#xFF0C;&#x5347;&#x7EA7;&#x8FD8;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x987A;&#x5229;&#x6B65;&#x9AA4;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5206;&#x6210;&#x4E24;&#x6B65;&#x8D70;&#xFF0C;&#x9996;&#x5148;&#x5347;&#x7EA7;&#x76F8;&#x5173;&#x4F9D;&#x8D56;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x4F18;&#x5316;webapck&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><h3 id="articleHeader2">&#x5347;&#x7EA7;&#x63D2;&#x4EF6;</h3><p><br>&#x9996;&#x5148;&#x8981;&#x628A;&#x4E0B;&#x9762;&#x5217;&#x8868;&#x7684;&#x63D2;&#x4EF6;&#x5347;&#x7EA7;&#x5230;&#x5BF9;&#x5E94;&#x7248;&#x672C;&#x6216;&#x8005;&#x6700;&#x65B0;&#x7248;&#x672C;</p><ol><li>webpack@4.4.1</li><li>css-loader@0.28.10,</li><li>extract-text-webpack-plugin@4.0.0-beta.0,</li><li>file-loader@1.1.11,</li><li>html-webpack-plugin@3.1.0,</li><li>optimize-css-assets-webpack-plugin@4.0.0,</li><li>url-loader@1.0.1,</li><li>vue-loader@14.2.2,</li><li>vue-style-loader@4.1.0,</li><li>vue-template-compiler@2.5.16,</li><li>webpack-bundle-analyzer@2.11.1,</li><li>webpack-dev-middleware@3.1.0,</li><li>webpack-dev-server@3.1.1,</li><li>webpack-hot-middleware@2.21.2</li></ol><p>&#x5982;&#x679C;&#x9047;&#x5230;&#x5176;&#x4ED6;&#x5305;&#x62A5;&#x9519;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#x5347;&#x7EA7;&#x5230;&#x6700;&#x65B0;&#x7684;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x4E86;&#x3002;</p><h3 id="articleHeader3">&#x66F4;&#x65B0;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h3><h4>webpack.dev.conf.js</h4><p>dev&#x73AF;&#x5883;&#x53D8;&#x5316;&#x4E0D;&#x5927;&#xFF0C;&#x6BD5;&#x7ADF;webpack4&#x5F88;&#x5927;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x4F18;&#x5316;&#x90FD;&#x662F;&#x9488;&#x5BF9;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#xFF0C;&#x8BE5;&#x6587;&#x4EF6;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5220;&#x9664;&#x4E00;&#x4E9B;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x7684;&#x63D2;&#x4EF6;&#x65E2;&#x53EF;&#x4EE5;&#x3002;&#x4F8B;&#x5982;&#xFF1A;webpack.NamedModulesPlugin&#x3001;webpack.NoEmitOnErrorsPlugin&#xFF0C;&#x5176;&#x529F;&#x80FD;webpack4&#x5DF2;&#x7ECF;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x8981;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: &apos;development&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">mode:</span> <span class="hljs-string">&apos;development&apos;</span></code></pre><h4>webpack.production.conf.js</h4><p>webvpack4&#x4E2D;&#x6539;&#x52A8;&#x6700;&#x5927;&#xFF0C;&#x5F71;&#x54CD;&#x4E5F;&#x6700;&#x5927;&#x7684;&#x5C31;&#x662F;webpack4&#x4F7F;&#x7528;optimization.splitChunks&#x66FF;&#x4EE3;&#x4E86;CommonsChunkPlugin&#x3002;&#x4EE5;&#x524D;&#x7684;CommonsChunkPlugin&#x4E3B;&#x8981;&#x7528;&#x6765;&#x62BD;&#x53D6;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x5171;&#x7528;&#x90E8;&#x5206;&#xFF0C;webpack runtime&#x4E4B;&#x7C7B;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7ED3;&#x5408;chunkhash&#xFF0C;&#x5B9E;&#x73B0;&#x6700;&#x597D;&#x7684;&#x7F13;&#x5B58;&#x7B56;&#x7565;&#x3002;&#x800C;optimization.splitChunks&#x5219;&#x5B9E;&#x73B0;&#x4E86;&#x76F8;&#x540C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x4E14;&#x914D;&#x7F6E;&#x66F4;&#x52A0;&#x7075;&#x6D3B;&#xFF0C;&#x5177;&#x4F53;&#x89E3;&#x91CA;&#x53EF;&#x53C2;&#x8003;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x89E3;&#x91CA;&#x5F97;&#x5F88;&#x8BE6;&#x7EC6;&#x3002;<a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693" rel="nofollow noreferrer" target="_blank">RIP CommonsChunkPlugin</a><button class="btn btn-xs btn-default ml10 preview" data-url="sokra/1522d586b8e5c0f5072d7565c2bee693" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: &apos;production&apos;,
optimization: {
  splitChunks: {
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: &apos;initial&apos;,
        name: &apos;vendors&apos;,
      },
      &apos;async-vendors&apos;: {
        test: /[\\/]node_modules[\\/]/,
        minChunks: 2,
        chunks: &apos;async&apos;,
        name: &apos;async-vendors&apos;
      }
    }
  },
  runtimeChunk: { name: &apos;runtime&apos; }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-keyword">mode</span>: <span class="hljs-string">&apos;production&apos;</span>,
optimization: {
  splitChunk<span class="hljs-variable">s:</span> {
    cacheGroup<span class="hljs-variable">s:</span> {
      vendor<span class="hljs-variable">s:</span> {
        tes<span class="hljs-variable">t:</span> /[\\/]node_modules[\\/]/,
        chunk<span class="hljs-variable">s:</span> <span class="hljs-string">&apos;initial&apos;</span>,
        name: <span class="hljs-string">&apos;vendors&apos;</span>,
      },
      <span class="hljs-string">&apos;async-vendors&apos;</span>: {
        tes<span class="hljs-variable">t:</span> /[\\/]node_modules[\\/]/,
        minChunk<span class="hljs-variable">s:</span> <span class="hljs-number">2</span>,
        chunk<span class="hljs-variable">s:</span> <span class="hljs-string">&apos;async&apos;</span>,
        name: <span class="hljs-string">&apos;async-vendors&apos;</span>
      }
    }
  },
  runtimeChunk: { name: <span class="hljs-string">&apos;runtime&apos;</span> }
}</code></pre><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x603B;&#x4F53;&#x6765;&#x8BF4;&#x672C;&#x6B21;&#x5347;&#x7EA7;&#x8FD8;&#x7B97;&#x987A;&#x5229;&#xFF0C;&#x4E0D;&#x5230;&#x4E00;&#x5929;&#x641E;&#x5B9A;&#xFF0C;&#x76EE;&#x524D;&#x611F;&#x89C9;&#xFF0C;&#x6253;&#x5305;&#x901F;&#x5EA6;&#x5927;&#x7EA6;&#x4F18;&#x5316;&#x4E86;70%&#x5DE6;&#x53F3;&#xFF0C;&#x540C;&#x65F6;&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4F53;&#x79EF;&#x4E5F;&#x6709;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x5E26;&#x6765;&#x7684;&#x6548;&#x679C;&#x5F88;&#x663E;&#x8457;&#x7684;&#x3002;<br><a href="https://github.com/teapot-py/webpack4-demo" rel="nofollow noreferrer" target="_blank">&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6211;&#x6CA1;&#x6709;&#x8BF4;&#x660E;&#x767D;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4EFD;&#x914D;&#x7F6E;&#xFF0C;&#x8BF7;&#x62FF;&#x8D70;</a></p><p></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue cli 平稳升级webapck4

## 原文链接
[https://segmentfault.com/a/1190000014169887](https://segmentfault.com/a/1190000014169887)

