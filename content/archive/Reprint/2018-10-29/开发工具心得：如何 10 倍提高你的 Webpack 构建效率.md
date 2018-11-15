---
title: 开发工具心得：如何 10 倍提高你的 Webpack 构建效率
reprint: true
categories: reprint
abbrlink: b7abc51e
date: 2018-10-29 02:30:09
---

{{% raw %}}
<h2 id="articleHeader0">0. &#x524D;&#x8A00;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000005770045" src="https://static.alili.tech/img/remote/1460000005770045" alt="babel+webpack+es6+react" title="babel+webpack+es6+react" style="cursor:pointer;display:inline"></span></p><blockquote><p>&#x56FE;1&#xFF1A;ES6 + Webpack + React + Babel</p></blockquote><p>webpack &#x662F;&#x4E2A;&#x597D;&#x4E1C;&#x897F;&#xFF0C;&#x548C; NPM &#x642D;&#x914D;&#x8D77;&#x6765;&#x4F7F;&#x7528;&#x7BA1;&#x7406;&#x6A21;&#x5757;&#x5B9E;&#x5728;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x3002;&#x800C; Babel &#x66F4;&#x662F;&#x795E;&#x4E00;&#x822C;&#x7684;&#x5B58;&#x5728;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x5C1A;&#x672A;&#x5168;&#x9762;&#x666E;&#x53CA; ES6 &#x8BED;&#x6CD5;&#x7684;&#x65F6;&#x4EE3;&#x53EF;&#x4EE5;&#x5148;&#x4E00;&#x6B65;&#x4F53;&#x9A8C;&#x5230;&#x65B0;&#x7684;&#x8BED;&#x6CD5;&#x5E26;&#x6765;&#x7684;&#x4FBF;&#x5229;&#x548C;&#x6548;&#x7387;&#x4E0A;&#x7684;&#x63D0;&#x5347;&#x3002;&#x5728; React &#x9879;&#x76EE;&#x67B6;&#x6784;&#x4E2D;&#x8FD9;&#x4E24;&#x4E2A;&#x4E1C;&#x897F;&#x57FA;&#x672C;&#x6210;&#x4E3A;&#x4E86;&#x6807;&#x914D;&#xFF0C;&#x4F46; commonjs &#x7684;&#x6A21;&#x5757;&#x5FC5;&#x987B;&#x5728;&#x4F7F;&#x7528;&#x524D;&#x7ECF;&#x8FC7; webpack &#x7684;&#x6784;&#x5EFA;(&#x540E;&#x6587;&#x79F0;&#x4E3A; build)&#x624D;&#x80FD;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x6BCF;&#x6B21;&#x4FEE;&#x6539;&#x4E5F;&#x90FD;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#xFF08;&#x540E;&#x6587;&#x79F0;&#x4E3A; rebuild&#xFF09;&#x624D;&#x80FD;&#x751F;&#x6548;&#xFF0C;&#x5982;&#x4F55;&#x63D0;&#x9AD8; webpack &#x7684;&#x6784;&#x5EFA;&#x6548;&#x7387;&#x6210;&#x4E3A;&#x4E86;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x7684;&#x5173;&#x952E;&#x4E4B;&#x4E00;&#x3002;</p><h2 id="articleHeader1">1. Webpack &#x7684;&#x6784;&#x5EFA;&#x6D41;&#x7A0B;</h2><p>&#x5728;&#x5F00;&#x59CB;&#x6B63;&#x5F0F;&#x7684;&#x4F18;&#x5316;&#x4E4B;&#x524D;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x5148;&#x56DE;&#x987E;&#x4E00;&#x4E0B; Webpack &#x7684;&#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#xFF0C;&#x6709;&#x54EA;&#x4E9B;&#x5173;&#x952E;&#x6B65;&#x9AA4;&#xFF0C;&#x53EA;&#x6709;&#x4E86;&#x89E3;&#x4E86;&#x8FD9;&#x4E9B;&#xFF0C;&#x6211;&#x4EEC;&#x624D;&#x80FD;&#x5206;&#x6790;&#x51FA;&#x54EA;&#x4E9B;&#x5730;&#x65B9;&#x6709;&#x4F18;&#x5316;&#x7684;&#x53EF;&#x80FD;&#x6027;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000004839887" src="https://static.alili.tech/img/remote/1460000004839887" alt="webpack official" title="webpack official" style="cursor:pointer;display:inline"></span></p><blockquote><p>&#x56FE;2&#xFF1A;webpack is a module bundler.</p></blockquote><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5B98;&#x65B9;&#x5BF9;&#x4E8E; Webpack &#x7684;&#x7406;&#x5FF5;&#x9610;&#x91CA;&#xFF0C;webapck &#x628A;&#x6240;&#x6709;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x90FD;&#x770B;&#x505A;&#x662F;&#x4E00;&#x4E2A; module&#xFF0C;&#x901A;&#x8FC7; webpack&#xFF0C;&#x5C06;&#x8FD9;&#x4E9B; module &#x7EC4;&#x6210;&#x5230;&#x4E00;&#x4E2A; bundle &#x4E2D;&#x53BB;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x5F15;&#x5165;&#x4E00;&#x4E2A; bundle.js&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x6240;&#x6709;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x52A0;&#x8F7D;&#x3002;&#x6240;&#x4EE5;&#x8BE6;&#x7EC6;&#x4E00;&#x70B9;&#x770B;&#xFF0C;webpack &#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000005770047" src="https://static.alili.tech/img/remote/1460000005770047" alt="" title="" style="cursor:pointer"></span></p><blockquote><p>&#x56FE;3&#xFF1A;Every static asset should be able to be a module --webpack</p></blockquote><p>&#x901A;&#x8FC7; loader&#xFF0C;webpack &#x53EF;&#x4EE5;&#x628A;&#x5404;&#x79CD;&#x975E;&#x539F;&#x751F; js &#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8F6C;&#x6362;&#x6210; JavaScript&#xFF0C;&#x6240;&#x4EE5;&#x7406;&#x8BBA;&#x4E0A;&#x4EFB;&#x4F55;&#x4E00;&#x79CD;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x90FD;&#x53EF;&#x4EE5;&#x6210;&#x4E3A;&#x4E00;&#x4E2A; module&#x3002;<br>&#x5F53;&#x7136; webpack &#x8FD8;&#x6709;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x597D;&#x73A9;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F46;&#x4E0D;&#x662F;&#x672C;&#x6587;&#x7684;&#x91CD;&#x70B9;&#x56E0;&#x6B64;&#x4E0D;&#x94FA;&#x5F00;&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#x4E86;&#x3002;&#x4E86;&#x89E3;&#x4E86;&#x4E0A;&#x8FF0;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8FD9;&#x4E9B;&#x8FC7;&#x7A0B;&#x7684;&#x524D;&#x540E;&#x5904;&#x7406;&#x8FDB;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4F1A;&#x9488;&#x5BF9; build &#x548C; rebuild &#x7684;&#x8FC7;&#x7A0B;&#x7ED9;&#x4E0E;&#x76F8;&#x5E94;&#x7684;&#x610F;&#x89C1;&#x3002;</p><h2 id="articleHeader2">2. RESOLVE</h2><p>&#x6211;&#x4EEC;&#x5148;&#x4ECE;&#x89E3;&#x6790;&#x6A21;&#x5757;&#x8DEF;&#x5F84;&#x548C;&#x5206;&#x6790;&#x4F9D;&#x8D56;&#x8BB2;&#x8D77;&#xFF0C;&#x6709;&#x4EBA;&#x53EF;&#x80FD;&#x89C9;&#x5F97;&#x8FD9;&#x65E0;&#x6240;&#x8C13;&#xFF0C;&#x4F46;&#x5F53;&#x9879;&#x76EE;&#x5E94;&#x7528;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x8D8A;&#x6765;&#x8D8A;&#x91CD;&#x65F6;&#xFF0C;&#x9879;&#x76EE;&#x8D8A;&#x6765;&#x8D8A;&#x5927;&#xFF0C;&#x6587;&#x4EF6;&#x548C;&#x6587;&#x4EF6;&#x5939;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5C31;&#x53D8;&#x5F97;&#x8D8A;&#x6765;&#x8D8A;&#x5173;&#x4E4E;&#x6027;&#x80FD;&#x3002;</p><h3 id="articleHeader3">2.1 &#x51CF;&#x5C0F; Webpack &#x8986;&#x76D6;&#x7684;&#x8303;&#x56F4;</h3><blockquote><p>build +, rebuild +</p></blockquote><p>webpack &#x9ED8;&#x8BA4;&#x4F1A;&#x53BB;&#x5BFB;&#x627E;&#x6240;&#x6709; resolve.root &#x4E0B;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x76EE;&#x5F55;&#x6211;&#x4EEC;&#x662F;&#x53EF;&#x4EE5;&#x660E;&#x786E;&#x544A;&#x77E5; webpack &#x4E0D;&#x8981;&#x7BA1;&#x8FD9;&#x91CC;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x8F7B; webpack &#x7684;&#x5DE5;&#x4F5C;&#x91CF;&#x3002;&#x8FD9;&#x65F6;&#x4F1A;&#x7528;&#x5230; <code>module.noParse</code> &#x53C2;&#x6570;&#x3002;</p><h3 id="articleHeader4">2.2 Resolove.root VS Resolove.moduledirectories</h3><blockquote><p>build +, rebuild +</p></blockquote><p><code>root</code> &#x548C; <code>moduledirectories</code> &#x5982;&#x679C;&#x53EA;&#x4ECE;&#x7528;&#x6CD5;&#x4E0A;&#x6765;&#x770B;&#xFF0C;&#x4F3C;&#x4E4E;&#x662F;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x66FF;&#x4EE3;&#x7684;&#x3002;&#x4F46;&#x56E0;&#x4E3A; <code>moduledirectories</code> &#x4ECE;&#x8BBE;&#x8BA1;&#x4E0A;&#x662F;&#x53D6;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x6240;&#x4EE5;&#x6BD4;&#x8D77; <code>root</code> &#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x591A; parse &#x5F88;&#x591A;&#x8DEF;&#x5F84;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    root: path.resolve(&apos;src/node_modules&apos;),
    extensions: [&apos;&apos;, &apos;.js&apos;, &apos;.jsx&apos;]
},
resolve: {
    modulesDirectories: [&apos;node_modules&apos;, &apos;./src&apos;],
    extensions: [&apos;&apos;, &apos;.js&apos;, &apos;.jsx&apos;]
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">resolve: {
    <span class="hljs-attr">root</span>: path.resolve(<span class="hljs-string">&apos;src/node_modules&apos;</span>),
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.jsx&apos;</span>]
},
<span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">modulesDirectories</span>: [<span class="hljs-string">&apos;node_modules&apos;</span>, <span class="hljs-string">&apos;./src&apos;</span>],
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.jsx&apos;</span>]
},</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x53EA;&#x4F1A;&#x89E3;&#x6790;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./src/node_modules/a" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code class="sh" style="word-break:break-word;white-space:initial">.<span class="hljs-regexp">/src/</span>node_modules<span class="hljs-regexp">/a</span></code></pre><p>==== &#x6B64;&#x5904;&#x6709;&#x4FEE;&#x6539; 2016/09/10 &#x611F;&#x8C22; <a href="/u/lili_21">@lili_21</a> ====</p><p>&#x800C;&#x4E0B;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x4F1A;&#x89E3;&#x6790;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/some/folder/structure/node_modules/a
/some/folder/structure/src/a
/some/folder/node_modules/a
/some/folder/src/a
/some/node_modules/a
/some/src/a
/node_modules/a
/src/a " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="sh">/some/folder/structure/node_modules/<span class="hljs-selector-tag">a</span>
/some/folder/structure/src/<span class="hljs-selector-tag">a</span>
/some/folder/node_modules/<span class="hljs-selector-tag">a</span>
/some/folder/src/<span class="hljs-selector-tag">a</span>
/some/node_modules/<span class="hljs-selector-tag">a</span>
/some/src/<span class="hljs-selector-tag">a</span>
/node_modules/<span class="hljs-selector-tag">a</span>
/src/<span class="hljs-selector-tag">a</span> </code></pre><p>&#x5927;&#x90E8;&#x5206;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528; <code>root</code> &#x5373;&#x53EF;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x6709;&#x5F88;&#x590D;&#x6742;&#x7684;&#x8DEF;&#x5F84;&#x4E0B;&#xFF0C;&#x624D;&#x8003;&#x8651;&#x4F7F;&#x7528; <code>moduledirectories</code>&#xFF0C;&#x8FD9;&#x53EF;&#x4EE5;<a href="https://github.com/webpack/webpack/issues/1574#issuecomment-157520561" rel="nofollow noreferrer" target="_blank">&#x660E;&#x663E;&#x63D0;&#x9AD8; webpack &#x7684;&#x6784;&#x5EFA;&#x6027;&#x80FD;</a>&#x3002;&#x8FD9;&#x4E2A; <a href="https://github.com/webpack/webpack/issues/472#issuecomment-55706013" rel="nofollow noreferrer" target="_blank">issue</a> &#x4E5F;&#x5F88;&#x8BE6;&#x7EC6;&#x5730;&#x8BA8;&#x8BBA;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader5">3. LOADERS</h2><p>webpack &#x5B98;&#x65B9;&#x548C;&#x793E;&#x533A;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x5404;&#x79CD;&#x5404;&#x6837; loader &#x6765;&#x5904;&#x7406;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E9B; loader &#x7684;&#x914D;&#x7F6E;&#x4E5F;&#x76F4;&#x63A5;&#x5F71;&#x54CD;&#x4E86;&#x6784;&#x5EFA;&#x7684;&#x6027;&#x80FD;&#x3002;</p><h3 id="articleHeader6">3.1 Babel-loader: &#x80FD;&#x8005;&#x5C11;&#x52B3;</h3><blockquote><p>build ++, rebuild ++</p></blockquote><p>&#x4EE5; babel-loader &#x4E3A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5F00;&#x53D1; React &#x9879;&#x76EE;&#x65F6;&#x5F88;&#x53EF;&#x80FD;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#x4E86; ES6 &#x6216;&#x8005; jsx &#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x56E0;&#x6B64;&#x4F7F;&#x7528;&#x5230; babel-loader &#x7684;&#x60C5;&#x51B5;&#x5F88;&#x591A;&#xFF0C;&#x6700;&#x7B80;&#x5355;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x914D;&#x7F6E;&#xFF0C;&#x8BA9;&#x6240;&#x6709;&#x7684; js/jsx &#x901A;&#x8FC7; babel-loader&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
      {
          test: /\.js(x)*$/,
          loader: &apos;babel-loader&apos;,
          query: {
              presets: [&apos;react&apos;, &apos;es2015-ie&apos;, &apos;stage-1&apos;]
          }
      }
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">loaders</span>: [
      {
          test: /\.<span class="hljs-built_in">js</span>(x)*$/,
          loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
          query: {
              presets: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;es2015-ie&apos;</span>, <span class="hljs-string">&apos;stage-1&apos;</span>]
          }
      }
    ]
}</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x6837;&#x7684;&#x505A;&#x6CD5;&#x5F53;&#x7136;&#x662F; ok &#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x5F88;&#x591A;&#x7684; npm &#x5305;&#x6765;&#x8BF4;&#xFF0C;&#x4ED6;&#x4EEC;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x7ECF;&#x8FC7; babel &#x7684;&#x5FC5;&#x8981;&#xFF08;&#x6210;&#x719F;&#x7684; npm &#x5305;&#x4F1A;&#x5728;&#x53D1;&#x5E03;&#x524D;&#x5C06;&#x81EA;&#x5DF1; es5&#xFF0C;&#x751A;&#x81F3; es3 &#x5316;&#xFF09;&#xFF0C;&#x8BA9;&#x8FD9;&#x4E9B;&#x5305;&#x901A;&#x8FC7; babel &#x4F1A;&#x5E26;&#x6765;&#x5DE8;&#x5927;&#x7684;&#x6027;&#x80FD;&#x8D1F;&#x62C5;&#xFF0C;&#x6BD5;&#x7ADF; babel6 &#x8981;&#x7ECF;&#x8FC7;&#x51E0;&#x5341;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x867D;&#x7136; babel-loader &#x5F3A;&#x5927;&#xFF0C;&#x4F46;&#x80FD;&#x8005;&#x591A;&#x52B3;&#x7684;&#x8FD9;&#x79CD;&#x4FDD;&#x5B88;&#x7684;&#x60F3;&#x6CD5;&#x5374;&#x4F7F;&#x5F97; babel-loader &#x6210;&#x4E3A;&#x4E86;&#x6574;&#x4E2A;&#x6784;&#x5EFA;&#x7684;&#x6027;&#x80FD;&#x74F6;&#x9888;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>exclude</code>&#xFF0C;&#x5927;&#x80C6;&#x5730;&#x5C4F;&#x853D;&#x6389; npm &#x91CC;&#x7684;&#x5305;&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x6574;&#x5305;&#x7684;&#x6784;&#x5EFA;&#x6548;&#x7387;&#x98DE;&#x901F;&#x63D0;&#x9AD8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
      {
          test: /\.js(x)*$/,
          loader: &apos;babel-loader&apos;,
          exclude: function(path) {
              // &#x8DEF;&#x5F84;&#x4E2D;&#x542B;&#x6709; node_modules &#x7684;&#x5C31;&#x4E0D;&#x53BB;&#x89E3;&#x6790;&#x3002;
              var isNpmModule = !!path.match(/node_modules/);
              return isNpmModule;
          },
          query: {
              presets: [&apos;react&apos;, &apos;es2015-ie&apos;, &apos;stage-1&apos;]
          }
      }
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js(x)*$/</span>,
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;babel-loader&apos;</span>,
          <span class="hljs-attr">exclude</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
              <span class="hljs-comment">// &#x8DEF;&#x5F84;&#x4E2D;&#x542B;&#x6709; node_modules &#x7684;&#x5C31;&#x4E0D;&#x53BB;&#x89E3;&#x6790;&#x3002;</span>
              <span class="hljs-keyword">var</span> isNpmModule = !!path.match(<span class="hljs-regexp">/node_modules/</span>);
              <span class="hljs-keyword">return</span> isNpmModule;
          },
          <span class="hljs-attr">query</span>: {
              <span class="hljs-attr">presets</span>: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;es2015-ie&apos;</span>, <span class="hljs-string">&apos;stage-1&apos;</span>]
          }
      }
    ]
}</code></pre><p>&#x751A;&#x81F3;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x5341;&#x5206;&#x786E;&#x4FE1;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528; include &#x6765;&#x9650;&#x5B9A; babel &#x7684;&#x4F7F;&#x7528;&#x8303;&#x56F4;&#xFF0C;&#x8FDB;&#x4E00;&#x6B65;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&apos;path&apos;);
module.exports = {
    module: {
        loaders: [
          {
              test: /\.js(x)*$/,
              loader: &apos;babel-loader&apos;,
              include: [
                // &#x53EA;&#x53BB;&#x89E3;&#x6790;&#x8FD0;&#x884C;&#x76EE;&#x5F55;&#x4E0B;&#x7684; src &#x548C; demo &#x6587;&#x4EF6;&#x5939;
                path.join(process.cwd(), &apos;./src&apos;),
                path.join(process.cwd(), &apos;./demo&apos;)
              ],
              query: {
                  presets: [&apos;react&apos;, &apos;es2015-ie&apos;, &apos;stage-1&apos;]
              }
          }
        ]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        loaders: [
          {
              test: <span class="hljs-regexp">/\.js(x)*$/</span>,
              loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
              include: [
                <span class="hljs-comment">// &#x53EA;&#x53BB;&#x89E3;&#x6790;&#x8FD0;&#x884C;&#x76EE;&#x5F55;&#x4E0B;&#x7684; src &#x548C; demo &#x6587;&#x4EF6;&#x5939;</span>
                path.join(process.cwd(), <span class="hljs-string">&apos;./src&apos;</span>),
                path.join(process.cwd(), <span class="hljs-string">&apos;./demo&apos;</span>)
              ],
              query: {
                  presets: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;es2015-ie&apos;</span>, <span class="hljs-string">&apos;stage-1&apos;</span>]
              }
          }
        ]
    }
}</code></pre><h2 id="articleHeader7">4. PLUGINS</h2><p>webpack &#x5B98;&#x65B9;&#x548C;&#x793E;&#x533A;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x65B9;&#x4FBF;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x6709;&#x4E9B;&#x63D2;&#x4EF6;&#x4E3A;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x548C;&#x751F;&#x4EA7;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x591A;&#x7684;&#x4FBF;&#x5229;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x5408;&#x9002;&#x5730;&#x4F7F;&#x7528;&#x63D2;&#x4EF6;&#x4E5F;&#x4F1A;&#x62D6;&#x6162; webpack &#x7684;&#x6784;&#x5EFA;&#x6548;&#x7387;&#xFF0C;&#x800C;&#x6709;&#x4E9B;&#x63D2;&#x4EF6;&#x867D;&#x7136;&#x4E0D;&#x4F1A;&#x4E3A;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x4E0A;&#x76F4;&#x63A5;&#x63D0;&#x4F9B;&#x4FBF;&#x5229;&#xFF0C;&#x4F46;&#x4F7F;&#x7528;&#x4ED6;&#x4EEC;&#x5374;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x63D0;&#x9AD8; webpack &#x7684;&#x6784;&#x5EFA;&#x6548;&#x7387;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x672C;&#x6587;&#x4F1A;&#x63D0;&#x5230;&#x7684;&#x3002;</p><h3 id="articleHeader8">4.1 SourceMaps</h3><blockquote><p>build +</p></blockquote><p>SourceMaps &#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x5B9E;&#x7528;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5728; chrome debug &#x65F6;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x76F4;&#x63A5;&#x770B;&#x5DF2;&#x7ECF; bundle &#x8FC7;&#x7684; js&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x5728;&#x6E90;&#x4EE3;&#x7801;&#x4E0A;&#x8FDB;&#x884C;&#x67E5;&#x770B;&#x548C;&#x8C03;&#x8BD5;&#xFF0C;&#x4F46;&#x5B8C;&#x7F8E;&#x7684; SourceMaps &#x662F;&#x5F88;&#x6162;&#x7684;&#xFF0C;webpack &#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;&#x4E03;&#x79CD; sourceMap &#x6A21;&#x5F0F;&#x5171;&#x5927;&#x5BB6;&#x9009;&#x62E9;&#xFF0C;&#x6027;&#x80FD;&#x5BF9;&#x6BD4;&#x5982;&#x4E0B;&#xFF1A;</p><table><thead><tr><th>devtool</th><th>build speed</th><th>rebuild speed</th><th>production supported</th><th>quality</th></tr></thead><tbody><tr><td>eval</td><td>+++</td><td>+++</td><td>no</td><td>generated code</td></tr><tr><td>cheap-eval-source-map</td><td>+</td><td>++</td><td>no</td><td>transformed code (lines only)</td></tr><tr><td>cheap-source-map</td><td>+</td><td>o</td><td>yes</td><td>transformed code (lines only)</td></tr><tr><td>cheap-module-eval-source-map</td><td>o</td><td>++</td><td>no</td><td>original source (lines only)</td></tr><tr><td>cheap-module-source-map</td><td>o</td><td>-</td><td>yes</td><td>original source (lines only)</td></tr><tr><td>eval-source-map</td><td>--</td><td>+</td><td>no</td><td>original source</td></tr><tr><td>source-map</td><td>--</td><td>--</td><td>yes</td><td>original source</td></tr></tbody></table><p>&#x5177;&#x4F53;&#x5404;&#x81EA;&#x7684;&#x533A;&#x522B;&#x8BF7;&#x53C2;&#x8003; <a href="https://github.com/webpack/docs/wiki/configuration#devtool" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/do...</a> &#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4F7F;&#x7528; cheap-source-map&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53BB;&#x6389;&#x4E86;column mapping &#x548C; loader-sourceMap&#xFF08;&#x4F8B;&#x5982; jsx to js&#xFF09; &#x7684; sourceMap&#xFF0C;&#x867D;&#x7136;&#x5E26;&#x4E0A; <code>eval</code> &#x53C2;&#x6570;&#x7684;&#x53EF;&#x4EE5;&#x5FEB;&#x66F4;&#x591A;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD; sourceMap &#x53EA;&#x80FD;&#x770B;&#xFF0C;&#x4E0D;&#x80FD;&#x8C03;&#x8BD5;&#xFF0C;&#x5F97;&#x4E0D;&#x507F;&#x5931;&#x3002;</p><h3 id="articleHeader9">4.2 OPTIMIZATION</h3><blockquote><p>build ++&#xFF0C;rebuild ++</p></blockquote><p>webpack &#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x4F18;&#x5316;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6027;&#x80FD;&#x7684;&#x4F18;&#x5316;&#x63D2;&#x4EF6;&#xFF0C;&#x5982;UglifyJsPlugin&#xFF0C;OccurrenceOrderPlugin &#x548C; DedupePlugin&#xFF0C;&#x90FD;&#x5F88;&#x5B9E;&#x7528;&#xFF0C;&#x4E5F;&#x90FD;&#x5728;&#x6D88;&#x8017;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#xFF08;UglifyJsPlugin &#x975E;&#x5E38;&#x8017;&#x6027;&#x80FD;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x662F;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E9B;&#x63D2;&#x4EF6;&#x6700;&#x597D;&#x90FD;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#xFF0C;&#x6BD5;&#x7ADF;&#x811A;&#x672C;&#x5927;&#x4E00;&#x4E9B;&#xFF0C;&#x8DD1;&#x7684;&#x6162;&#x4E00;&#x4E9B;&#x8FD9;&#x4E9B;&#x6BD4;&#x8D77;&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x8981;&#x8017;&#x8D39;&#x66F4;&#x591A;&#x65F6;&#x95F4;&#x6765;&#x8BF4;&#xFF0C;&#x663E;&#x7136;&#x8FD8;&#x662F;&#x540E;&#x8005;&#x66F4;&#x4F1A;&#x6D88;&#x78E8;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x8010;&#x5FC3;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x53EA;&#x5728;&#x6B63;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;&#x4F7F;&#x7528; OPTIMIZATION&#x3002;</p><h3 id="articleHeader10">4.3 CommonsChunk</h3><blockquote><p>rebuild +</p></blockquote><p>&#x5F53;&#x4F60;&#x7684; webpack &#x6784;&#x5EFA;&#x4EFB;&#x52A1;&#x4E2D;&#x6709;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x90FD; require &#x4E86;&#x76F8;&#x540C;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x4E8B;&#x60C5;&#xFF0C;webpack &#x4F1A;&#x4E3A;&#x6BCF;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F15;&#x5165;&#x4E00;&#x4EFD;&#x76F8;&#x540C;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x663E;&#x7136;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x4F1A;&#x4F7F;&#x5F97;&#x76F8;&#x540C;&#x6A21;&#x5757;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x5F15;&#x5165;&#x7684; entry &#x90FD;&#x9700;&#x8981;&#x4E00;&#x6B21; rebuild&#xFF0C;&#x9020;&#x6210;&#x4E86;&#x6027;&#x80FD;&#x7684;&#x6D6A;&#x8D39;&#xFF0C;CommonsChunkPlugin &#x53EF;&#x4EE5;&#x5C06;&#x76F8;&#x540C;&#x7684;&#x6A21;&#x5757;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x5355;&#x72EC;&#x6253;&#x5305;&#xFF0C;&#x8FDB;&#x800C;&#x51CF;&#x5C0F; rebuild &#x65F6;&#x7684;&#x6027;&#x80FD;&#x6D88;&#x8017;&#x3002;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x7BC7;&#x5F88;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;<a href="http://webpack.toobug.net/zh-cn/chapter3/common-chunks-plugin.html" rel="nofollow noreferrer" target="_blank">http://webpack.toobug.net/zh-...</a> &#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x4E0D;&#x59A8;&#x4E00;&#x8BD5;&#x3002;</p><h3 id="articleHeader11">4.4 DLL &amp; DllReference</h3><blockquote><p>build +++, rebuild +++</p></blockquote><p>&#x9664;&#x4E86;&#x6B63;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#x4E4B;&#x5916;&#xFF0C;&#x901A;&#x5E38;&#x8FD8;&#x4F1A;&#x5F15;&#x5165;&#x5F88;&#x591A;&#x7B2C;&#x4E09;&#x65B9; NPM &#x5305;&#xFF0C;&#x8FD9;&#x4E9B;&#x5305;&#x6211;&#x4EEC;&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x4F46;&#x662F;&#x4ECD;&#x7136;&#x9700;&#x8981;&#x5728;&#x6BCF;&#x6B21; build &#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6D88;&#x8017;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#xFF0C;&#x90A3;&#x6709;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x529E;&#x6CD5;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x8FD9;&#x4E9B;&#x6D88;&#x8017;&#x5462;&#xFF1F;DLLPlugin &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4ED6;&#x901A;&#x8FC7;&#x524D;&#x7F6E;&#x8FD9;&#x4E9B;&#x4F9D;&#x8D56;&#x5305;&#x7684;&#x6784;&#x5EFA;&#xFF0C;&#x6765;&#x63D0;&#x9AD8;&#x771F;&#x6B63;&#x7684; build &#x548C; rebuild &#x7684;&#x6784;&#x5EFA;&#x6548;&#x7387;&#x3002;<br>&#x9274;&#x4E8E;&#x73B0;&#x6709;&#x7684;&#x8D44;&#x6599;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x89E3;&#x91CA;&#x90FD;&#x4E0D;&#x662F;&#x5F88;&#x6E05;&#x695A;&#xFF0C;&#x7B14;&#x8005;&#x8FD9;&#x91CC;&#x7FFB;&#x8BD1;&#x4E86;&#x4E00;&#x7BC7;<a href="http://qiita.com/pirosikick/items/c77db84dbed4c447a6fe#dll%E3%83%90%E3%83%B3%E3%83%89%E3%83%AB%E3%81%A8%E3%81%AF" rel="nofollow noreferrer" target="_blank">&#x65E5;&#x672C;&#x540C;&#x5B66;&#x7684;&#x6587;&#x7AE0;</a>&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x8FD9;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x7528;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x4E3E;&#x4F8B;&#xFF0C;&#x628A; react &#x548C; react-dom &#x6253;&#x5305;&#x6210;&#x4E3A; dll bundle&#x3002;<br>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5199;&#x4E00;&#x4E2A; <a href="https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin" rel="nofollow noreferrer" target="_blank">DLLPlugin</a> &#x7684; config &#x6587;&#x4EF6;&#x3002;</p><blockquote><p>webpack.dll.config.js</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);

module.exports = {
  entry: {
    vendor: [&apos;react&apos;, &apos;react-dom&apos;]
  },
  output: {
    path: path.join(__dirname, &apos;dist&apos;),
    filename: &apos;[name].dll.js&apos;,
    /**
     * output.library
     * &#x5C06;&#x4F1A;&#x5B9A;&#x4E49;&#x4E3A; window.${output.library}
     * &#x5728;&#x8FD9;&#x6B21;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5C06;&#x4F1A;&#x5B9A;&#x4E49;&#x4E3A;`window.vendor_library`
     */
    library: &apos;[name]_library&apos;
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * &#x5B9A;&#x4E49; manifest &#x6587;&#x4EF6;&#x751F;&#x6210;&#x7684;&#x4F4D;&#x7F6E;
       * [name]&#x7684;&#x90E8;&#x5206;&#x7531;entry&#x7684;&#x540D;&#x5B57;&#x66FF;&#x6362;
       */
      path: path.join(__dirname, &apos;dist&apos;, &apos;[name]-manifest.json&apos;),
      /**
       * name
       * dll bundle &#x8F93;&#x51FA;&#x5230;&#x90A3;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E0A;
       * &#x548C; output.library &#x4E00;&#x6837;&#x5373;&#x53EF;&#x3002; 
       */
      name: &apos;[name]_library&apos;
    })
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">&apos;react&apos;</span>, <span class="hljs-string">&apos;react-dom&apos;</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].dll.js&apos;</span>,
    <span class="hljs-comment">/**
     * output.library
     * &#x5C06;&#x4F1A;&#x5B9A;&#x4E49;&#x4E3A; window.${output.library}
     * &#x5728;&#x8FD9;&#x6B21;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5C06;&#x4F1A;&#x5B9A;&#x4E49;&#x4E3A;`window.vendor_library`
     */</span>
    library: <span class="hljs-string">&apos;[name]_library&apos;</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-comment">/**
       * path
       * &#x5B9A;&#x4E49; manifest &#x6587;&#x4EF6;&#x751F;&#x6210;&#x7684;&#x4F4D;&#x7F6E;
       * [name]&#x7684;&#x90E8;&#x5206;&#x7531;entry&#x7684;&#x540D;&#x5B57;&#x66FF;&#x6362;
       */</span>
      path: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>, <span class="hljs-string">&apos;[name]-manifest.json&apos;</span>),
      <span class="hljs-comment">/**
       * name
       * dll bundle &#x8F93;&#x51FA;&#x5230;&#x90A3;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E0A;
       * &#x548C; output.library &#x4E00;&#x6837;&#x5373;&#x53EF;&#x3002; 
       */</span>
      name: <span class="hljs-string">&apos;[name]_library&apos;</span>
    })
  ]
};</code></pre><p>&#x6267;&#x884C; webpack &#x540E;&#xFF0C;&#x5C31;&#x4F1A;&#x5728; dist &#x76EE;&#x5F55;&#x4E0B;&#x751F;&#x6210; dll bundle &#x548C;&#x5BF9;&#x5E94;&#x7684; manifest &#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/webpack --config webpack.dll.config.js
Hash: 36187493b1d9a06b228d
Version: webpack 1.13.1
Time: 860ms
        Asset    Size  Chunks             Chunk Names
vendor.dll.js  699 kB       0  [emitted]  vendor
   [0] dll vendor 12 bytes {0} [built]
    + 167 hidden modules

$ ls dist
./                    vendor-manifest.json
../                   vendor.dll.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="sh">$ ./node_modules/.bin/webpack --config webpack<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
Hash: <span class="hljs-number">36187493</span>b1d9a06b228d
Version: webpack <span class="hljs-number">1.13</span>.<span class="hljs-number">1</span>
Time: <span class="hljs-number">860ms</span>
        Asset    Size  Chunks             Chunk Names
vendor<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span>  <span class="hljs-number">699</span> kB       <span class="hljs-number">0</span>  [emitted]  vendor
   [<span class="hljs-number">0</span>] dll vendor <span class="hljs-number">12</span> bytes {<span class="hljs-number">0</span>} [built]
    + <span class="hljs-number">167</span> hidden modules

$ ls dist
./                    vendor-manifest<span class="hljs-selector-class">.json</span>
../                   vendor<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span></code></pre><p>manifest &#x6587;&#x4EF6;&#x7684;&#x683C;&#x5F0F;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF0C;&#x7531;&#x5305;&#x542B;&#x7684; module &#x548C;&#x5BF9;&#x5E94;&#x7684; id &#x7684;&#x952E;&#x503C;&#x5BF9;&#x6784;&#x6210;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat dist/vendor-manifest.json
{
  &quot;name&quot;: &quot;vendor_library&quot;,
  &quot;content&quot;: {
    &quot;./node_modules/react/react.js&quot;: 1,
    &quot;./node_modules/react/lib/React.js&quot;: 2,
    &quot;./node_modules/process/browser.js&quot;: 3,
    &quot;./node_modules/object-assign/index.js&quot;: 4,
    &quot;./node_modules/react/lib/ReactChildren.js&quot;: 5,
    &quot;./node_modules/react/lib/PooledClass.js&quot;: 6,
    &quot;./node_modules/fbjs/lib/invariant.js&quot;: 7,
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="sh">cat dist/vendor-manifest<span class="hljs-selector-class">.json</span>
{
  <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;vendor_library&quot;</span>,
  <span class="hljs-string">&quot;content&quot;</span>: {
    <span class="hljs-string">&quot;./node_modules/react/react.js&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;./node_modules/react/lib/React.js&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;./node_modules/process/browser.js&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;./node_modules/object-assign/index.js&quot;</span>: <span class="hljs-number">4</span>,
    <span class="hljs-string">&quot;./node_modules/react/lib/ReactChildren.js&quot;</span>: <span class="hljs-number">5</span>,
    <span class="hljs-string">&quot;./node_modules/react/lib/PooledClass.js&quot;</span>: <span class="hljs-number">6</span>,
    <span class="hljs-string">&quot;./node_modules/fbjs/lib/invariant.js&quot;</span>: <span class="hljs-number">7</span>,
...</code></pre><p>&#x597D;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x901A;&#x8FC7; <a href="https://github.com/webpack/docs/wiki/list-of-plugins#dllreferenceplugin" rel="nofollow noreferrer" target="_blank">DLLReferencePlugin</a> &#x6765;&#x4F7F;&#x7528;&#x521A;&#x624D;&#x751F;&#x6210;&#x7684; DLL Bundle&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x53EA;&#x53BB; <code>require</code> react&#xFF0C;&#x5E76;&#x901A;&#x8FC7; <code>console.log</code> &#x5410;&#x51FA;&#x7684; <code>index.js</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require(&apos;react&apos;);
var ReactDOM = require(&apos;react-dom&apos;);
console.log(&quot;dll&apos;s React:&quot;, React);
console.log(&quot;dll&apos;s ReactDOM:&quot;, ReactDOM);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;react&apos;</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;react-dom&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;dll&apos;s React:&quot;</span>, React);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;dll&apos;s ReactDOM:&quot;</span>, ReactDOM);</code></pre><p>&#x518D;&#x5199;&#x4E00;&#x4E2A;&#x4E0D;&#x53C2;&#x8003; Dll Bundle &#x7684;&#x666E;&#x901A; webpack config &#x6587;&#x4EF6;&#x3002;</p><blockquote><p>webpack.conf.js</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);

module.exports = {
  entry: {
    &apos;dll-user&apos;: [&apos;./index.js&apos;]
  },
  output: {
    path: path.join(__dirname, &apos;dist&apos;),
    filename: &apos;[name].bundle.js&apos;
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-string">&apos;dll-user&apos;</span>: [<span class="hljs-string">&apos;./index.js&apos;</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].bundle.js&apos;</span>
  }
};</code></pre><p>&#x6267;&#x884C; webpack&#xFF0C;&#x4F1A;&#x5728; dist &#x4E0B;&#x751F;&#x6210; dll-user.bundle.js&#xFF0C;&#x7EA6; 700K&#xFF0C;&#x8017;&#x65F6; 801ms&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/webpack
Hash: d8cab39e58c13b9713a6
Version: webpack 1.13.1
Time: 801ms
             Asset    Size  Chunks             Chunk Names
dll-user.bundle.js  700 kB       0  [emitted]  dll-user
   [0] multi dll-user 28 bytes {0} [built]
   [1] ./index.js 145 bytes {0} [built]
    + 167 hidden modules" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs subunit"><code class="sh">$ ./node_modules/.bin/webpack
Hash: d8cab39e58c13b9713a6
Version: webpack 1.13.1
<span class="hljs-keyword">Time:</span> 801ms
             Asset    Size  Chunks             Chunk Names
dll-user.bundle.js  700 kB       0  [emitted]  dll-user
   [0] multi dll-user 28 bytes {0} [built]
   [1] ./index.js 145 bytes {0} [built]
    + 167 hidden modules</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x52A0;&#x5165; <a href="https://github.com/webpack/docs/wiki/list-of-plugins#dllreferenceplugin" rel="nofollow noreferrer" target="_blank">DLLReferencePlugin</a></p><blockquote><p>webpack.conf.js</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);

module.exports = {
  entry: {
    &apos;dll-user&apos;: [&apos;./index.js&apos;]
  },
  output: {
    path: path.join(__dirname, &apos;dist&apos;),
    filename: &apos;[name].bundle.js&apos;
  },
  // ----&#x5728;&#x8FD9;&#x91CC;&#x8FFD;&#x52A0;----
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * &#x5728;&#x8FD9;&#x91CC;&#x5F15;&#x5165; manifest &#x6587;&#x4EF6;
       */
      manifest: require(&apos;./dist/vendor-manifest.json&apos;)
    })
  ]
  // ----&#x5728;&#x8FD9;&#x91CC;&#x8FFD;&#x52A0;----
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-string">&apos;dll-user&apos;</span>: [<span class="hljs-string">&apos;./index.js&apos;</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].bundle.js&apos;</span>
  },
  <span class="hljs-comment">// ----&#x5728;&#x8FD9;&#x91CC;&#x8FFD;&#x52A0;----</span>
  plugins: [
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-comment">/**
       * &#x5728;&#x8FD9;&#x91CC;&#x5F15;&#x5165; manifest &#x6587;&#x4EF6;
       */</span>
      manifest: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./dist/vendor-manifest.json&apos;</span>)
    })
  ]
  <span class="hljs-comment">// ----&#x5728;&#x8FD9;&#x91CC;&#x8FFD;&#x52A0;----</span>
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/webpack
Hash: 3bc7bf760779b4ca8523
Version: webpack 1.13.1
Time: 70ms
             Asset     Size  Chunks             Chunk Names
dll-user.bundle.js  2.01 kB       0  [emitted]  dll-user
   [0] multi dll-user 28 bytes {0} [built]
   [1] ./index.js 145 bytes {0} [built]
    + 3 hidden modules" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs subunit"><code class="sh">./node_modules/.bin/webpack
Hash: 3bc7bf760779b4ca8523
Version: webpack 1.13.1
<span class="hljs-keyword">Time:</span> 70ms
             Asset     Size  Chunks             Chunk Names
dll-user.bundle.js  2.01 kB       0  [emitted]  dll-user
   [0] multi dll-user 28 bytes {0} [built]
   [1] ./index.js 145 bytes {0} [built]
    + 3 hidden modules</code></pre><p>&#x7ED3;&#x679C;&#x662F;&#x975E;&#x5E38;&#x60CA;&#x4EBA;&#x7684;&#xFF0C;&#x53EA;&#x6709;2.01K&#xFF0C;&#x8017;&#x65F6; 70 ms&#xFF0C;&#x65E0;&#x7591;&#x5927;&#x5927;&#x63D0;&#x9AD8;&#x4E86; build &#x548C; rebuild &#x7684;&#x6548;&#x7387;&#x3002;&#x5B9E;&#x9645;&#x653E;&#x5230;&#x9875;&#x9762;&#x4E0A;&#x770B;&#x4E0B;&#x662F;&#x5426;&#x53EF;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
  &lt;script src=&quot;dist/vendor.dll.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;dist/dll-user.bundle.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;dist/vendor.dll.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;dist/dll-user.bundle.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000005770049" src="https://static.alili.tech/img/remote/1460000005770049" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x56E0;&#x4E3A; Dll bundle &#x5728;&#x4F9D;&#x8D56;&#x5B89;&#x88C5;&#x5B8C;&#x6BD5;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x6267;&#x884C; dev server &#x524D;&#x6267;&#x884C;&#x4E00;&#x6B21; dll bundle &#x7684; webapck &#x4EFB;&#x52A1;&#x3002;</p><h4>4.4.1 &#x548C; external &#x7684;&#x6BD4;&#x8F83;</h4><p>&#x6709;&#x4EBA;&#x4F1A;&#x8BF4;&#xFF0C;&#x8FD9;&#x4E2A;&#x548C; &#x7528; <code>webpack</code> &#x7684; <code>externals</code> &#x914D;&#x7F6E;&#x628A; require &#x7684; module &#x6307;&#x5411;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6709;&#x70B9;&#x50CF;&#x554A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const webpack = require(&apos;webpack&apos;);

module.exports = {
  entry: {
    &apos;ex&apos;: [&apos;./index.js&apos;]
  },
  output: {
    path: path.join(__dirname, &apos;dist&apos;),
    filename: &apos;[name].bundle.js&apos;
  },
  externals: {
    // require(&apos;react&apos;)&#x306F;window.React&#x3092;&#x4F7F;&#x3046;
    &apos;react&apos;: &apos;React&apos;,
    // require(&apos;react-dom&apos;)&#x306F;window.ReactDOM&#x3092;&#x4F7F;&#x3046;
    &apos;react-dom&apos;: &apos;ReactDOM&apos;
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-string">&apos;ex&apos;</span>: [<span class="hljs-string">&apos;./index.js&apos;</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].bundle.js&apos;</span>
  },
  <span class="hljs-attr">externals</span>: {
    <span class="hljs-comment">// require(&apos;react&apos;)&#x306F;window.React&#x3092;&#x4F7F;&#x3046;</span>
    <span class="hljs-string">&apos;react&apos;</span>: <span class="hljs-string">&apos;React&apos;</span>,
    <span class="hljs-comment">// require(&apos;react-dom&apos;)&#x306F;window.ReactDOM&#x3092;&#x4F7F;&#x3046;</span>
    <span class="hljs-string">&apos;react-dom&apos;</span>: <span class="hljs-string">&apos;ReactDOM&apos;</span>
  }
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
  &lt;script src=&quot;dist/react.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;dist/react-dom.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;dist/ex.bundle.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;dist/react.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;dist/react-dom.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;dist/ex.bundle.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x4E2A;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#xFF1A;</p><ol><li><p>&#x50CF;&#x662F; <code>react</code> &#x8FD9;&#x79CD;&#x5DF2;&#x7ECF;&#x6253;&#x597D;&#x4E86;&#x751F;&#x4EA7;&#x5305;&#x7684;&#x4F7F;&#x7528; <code>externals</code> &#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x5F88;&#x591A; npm &#x5305;&#x662F;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x7684;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B; <code>DLLBundle</code> &#x4ECD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;</p></li><li><p>&#x5982;&#x679C;&#x53EA;&#x662F;&#x5F15;&#x5165; npm &#x5305;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6BD4;&#x5982; <code>require(&apos;react/lib/React&apos;)</code> &#x6216;&#x8005; <code>require(&apos;lodash/fp/extend&apos;)</code> &#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B; <code>DLLBundle</code> &#x4ECD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;</p></li><li><p>&#x5F53;&#x7136;&#x5982;&#x679C;&#x53EA;&#x662F;&#x5F15;&#x7528;&#x4E86; <code>react</code> &#x8FD9;&#x7C7B;&#x7684;&#x8BDD;&#xFF0C;<code>externals</code> &#x56E0;&#x4E3A;&#x914D;&#x7F6E;&#x7B80;&#x5355;&#x6240;&#x4EE5;&#x4E5F;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x3002;</p></li></ol><h3 id="articleHeader12">4.5 <a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">HappyPack</a></h3><blockquote><p>build +, rebuild +</p></blockquote><p>webpack &#x7684;&#x957F;&#x65F6;&#x95F4;&#x6784;&#x5EFA;&#x641E;&#x7684;&#x5927;&#x5BB6;&#x90FD;&#x5F88; unhappy&#x3002;&#x4E8E;&#x662F; @amireh &#x60F3;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x70B9;&#x5B50;&#xFF0C;&#x65E2;&#x7136; loader &#x9ED8;&#x8BA4;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x8FDB;&#x7A0B;&#x5728;&#x8DD1;&#xFF0C;&#x90A3;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x8BA9; loader &#x591A;&#x8FDB;&#x7A0B;&#x53BB;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x5462;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000005770054" src="https://static.alili.tech/img/remote/1460000005770054" alt="" title="" style="cursor:pointer"></span></p><p>happyPack &#x7684;&#x6587;&#x6863;&#x5199;&#x7684;&#x5F88;&#x6613;&#x61C2;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#xFF0C;happyPack &#x4E0D;&#x4EC5;&#x5229;&#x7528;&#x4E86;&#x591A;&#x8FDB;&#x7A0B;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x5229;&#x7528;&#x7F13;&#x5B58;&#x6765;&#x4F7F;&#x5F97; rebuild &#x66F4;&#x5FEB;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x63D2;&#x4EF6;&#x4F5C;&#x8005;&#x7ED9;&#x51FA;&#x7684;&#x6027;&#x80FD;&#x6570;&#x636E;&#xFF1A;</p><blockquote><p>For the main repository I tested on, which had around 3067 modules, the build time went down from 39 seconds to a whopping ~10 seconds when there was yet no</p></blockquote><ol><li><p>Successive builds now take between 6 and 7 seconds.</p></li></ol><blockquote><p>Here&apos;s a rundown of the various states the build was performed in:</p></blockquote><table><thead><tr><th>Elapsed (ms)</th><th>Happy?</th><th>Cache enabled?</th><th>Cache present?</th><th colspan="2">Using DLLs?</th></tr></thead><tbody><tr><td>39851</td><td>NO</td><td>N/A</td><td>N/A</td><td colspan="2">NO</td></tr><tr><td>37393</td><td>NO</td><td>N/A</td><td>N/A</td><td colspan="2">YES</td></tr><tr><td>14605</td><td>YES</td><td>NO</td><td>N/A</td><td colspan="2">NO</td></tr><tr><td>13925</td><td>YES</td><td>YES</td><td>NO</td><td colspan="2">NO</td></tr><tr><td>11877</td><td>YES</td><td>YES</td><td>YES</td><td colspan="2">NO</td></tr><tr><td>9228</td><td>YES</td><td>NO</td><td>N/A</td><td colspan="2">YES</td></tr><tr><td>9597</td><td>YES</td><td>YES</td><td>NO</td><td colspan="2">YES</td></tr><tr><td>6975</td><td>YES</td><td>YES</td><td>YES</td><td colspan="2">YES</td></tr></tbody></table><blockquote><p>The builds above were run on Linux over a machine with 12 cores.</p></blockquote><h2 id="articleHeader13">5. &#x5176;&#x4ED6;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x9488;&#x5BF9; webpack &#x7684; resolve&#x3001;loader &#x548C; plugin &#x7684;&#x8FC7;&#x7A0B;&#x7ED9;&#x51FA;&#x4E86;&#x76F8;&#x5E94;&#x7684;&#x4F18;&#x5316;&#x610F;&#x89C1;&#xFF0C;&#x9664;&#x4E86;&#x8FD9;&#x4E9B;&#x54EA;&#x4E9B;&#x4F18;&#x5316;&#x70B9;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x6709;&#x4E9B;&#x4F18;&#x5316;&#x8D2F;&#x7A7F;&#x5728;&#x8FD9;&#x4E2A;&#x6D41;&#x7A0B;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x7F13;&#x5B58;&#x548C;&#x6587;&#x4EF6; IO&#x3002;</p><h3 id="articleHeader14">5.1 Cache</h3><p>&#x65E0;&#x8BBA;&#x5728;&#x4F55;&#x79CD;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x4E2D;&#xFF0C;&#x7F13;&#x5B58;&#x603B;&#x662F;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x6BD5;&#x7ADF;&#x6BCF;&#x6B21;&#x53D8;&#x52A8;&#x90FD;&#x53EA;&#x5F71;&#x54CD;&#x5F88;&#x5C0F;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x5982;&#x679C;&#x80FD;&#x591F;&#x7F13;&#x5B58;&#x4F4F;&#x90A3;&#x4E9B;&#x6CA1;&#x6709;&#x53D8;&#x52A8;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x76F4;&#x63A5;&#x62FF;&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x81EA;&#x7136;&#x4F1A;&#x4E8B;&#x534A;&#x529F;&#x500D;&#xFF0C;&#x5728; webpack &#x7684;&#x6574;&#x4E2A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6709;&#x591A;&#x4E2A;&#x5730;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;&#x7F13;&#x5B58;&#x7684;&#x673A;&#x4F1A;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6253;&#x5F00;&#x4E86;&#x8FD9;&#x4E9B;&#x7F13;&#x5B58;&#xFF0C;&#x4F1A;&#x5927;&#x5927;&#x52A0;&#x901F;&#x6211;&#x4EEC;&#x7684;&#x6784;&#x5EFA;&#xFF0C;&#x5C24;&#x5176;&#x662F; rebuild &#x7684;&#x6548;&#x7387;&#x3002;</p><h4>5.1.1 <a href="http://webpack.github.io/docs/configuration.html#cache" rel="nofollow noreferrer" target="_blank">webpack.cache</a></h4><blockquote><p>rebuild +</p></blockquote><p>webpack &#x81EA;&#x8EAB;&#x5C31;&#x6709; cache &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5E76;&#x4E14;&#x5728; watch &#x6A21;&#x5F0F;&#x4E0B;&#x81EA;&#x52A8;&#x5F00;&#x542F;&#xFF0C;&#x867D;&#x7136;&#x6548;&#x679C;&#x4E0D;&#x662F;&#x6700;&#x660E;&#x663E;&#x7684;&#xFF0C;&#x4F46;&#x5374;&#x5BF9;&#x6240;&#x6709;&#x7684; module &#x90FD;&#x6709;&#x6548;&#x3002;</p><h4>5.1.2 <a href="https://github.com/babel/babel-loader#options" rel="nofollow noreferrer" target="_blank">babel-loader.cacheDirectory</a></h4><blockquote><p>rebuild ++</p></blockquote><p>babel-loader &#x53EF;&#x4EE5;&#x5229;&#x7528;&#x7CFB;&#x7EDF;&#x7684;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#x7F13;&#x5B58;&#x7ECF;&#x8FC7; babel &#x5904;&#x7406;&#x597D;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5BF9;&#x4E8E; rebuild js &#x6709;&#x7740;&#x975E;&#x5E38;&#x5927;&#x7684;&#x6027;&#x80FD;&#x63D0;&#x5347;&#x3002;</p><h4>5.1.3 <a href="https://github.com/amireh/happypack#cache-boolean" rel="nofollow noreferrer" target="_blank">HappyPack.cache</a></h4><blockquote><p>build +, rebuild +</p></blockquote><p>&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684; happyPack &#x63D2;&#x4EF6;&#x4E5F;&#x540C;&#x6837;&#x63D0;&#x4F9B;&#x4E86; cache &#x529F;&#x80FD;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x4EE5; <code>.happypack/cache--[id].json</code> &#x7684;&#x8DEF;&#x5F84;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#x3002;&#x56E0;&#x4E3A;&#x662F;&#x7F13;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x6240;&#x4EE5;&#x4ED6;&#x4E5F;&#x53EF;&#x4EE5;&#x8F85;&#x52A9;&#x4E0B;&#x6B21; build &#x65F6;&#x7684;&#x6548;&#x7387;&#x3002;</p><h3 id="articleHeader15">5.2 FileSystem</h3><p>&#x9ED8;&#x8BA4;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6784;&#x5EFA;&#x597D;&#x7684;&#x76EE;&#x5F55;&#x4E00;&#x5B9A;&#x8981;&#x8F93;&#x51FA;&#x5230;&#x67D0;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x624D;&#x80FD;&#x4F7F;&#x7528;&#xFF0C;&#x4F46; webpack &#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x5F88;&#x68D2;&#x7684;&#x8BFB;&#x5199;&#x673A;&#x5236;&#xFF0C;&#x4F7F;&#x5F97;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x8FDB;&#x884C;&#x8BFB;&#x5199;&#xFF0C;&#x4ECE;&#x800C;&#x6781;&#x5927;&#x5730;&#x63D0;&#x9AD8; IO &#x7684;&#x6548;&#x7387;&#xFF0C;&#x5F00;&#x542F;&#x7684;&#x65B9;&#x6CD5;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MemoryFS = require(&quot;memory-fs&quot;);
var webpack = require(&quot;webpack&quot;);

var fs = new MemoryFS();
var compiler = webpack({ ... });
compiler.outputFileSystem = fs;
compiler.run(function(err, stats) {
  // ...
  var fileContent = fs.readFileSync(&quot;...&quot;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> MemoryFS = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;memory-fs&quot;</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;webpack&quot;</span>);

<span class="hljs-keyword">var</span> fs = <span class="hljs-keyword">new</span> MemoryFS();
<span class="hljs-keyword">var</span> compiler = webpack({ ... });
compiler.outputFileSystem = fs;
compiler.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> fileContent = fs.readFileSync(<span class="hljs-string">&quot;...&quot;</span>);
});</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; webpackDevMiddleware &#x66F4;&#x52A0;&#x65E0;&#x7F1D;&#x5730;&#x5C31;&#x63A5;&#x5165;&#x5230; dev server &#x4E2D;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x4EE5; express &#x4F5C;&#x4E3A;&#x9759;&#x6001; server &#x7684;&#x4F8B;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compiler = webpack(webpackCfg);

var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
   // webpackDevMiddleware &#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x4E86; memory-fs
   publicPath: &apos;/dist&apos;,
   aggregateTimeout: 300, // wait so long for more changes
   poll: true, // use polling instead of native watchers
   stats: {
       chunks: false
   }
});

var app = express();
app.use(webpackDevMiddlewareInstance);
app.listen(xxxx, function(err) {
   console.log(colors.info(&quot;dev server start: listening at &quot; + xxxx));
   if (err) {
     console.error(err);
   }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> compiler = webpack(webpackCfg);

<span class="hljs-keyword">var</span> webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
   <span class="hljs-comment">// webpackDevMiddleware &#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x4E86; memory-fs</span>
   publicPath: &apos;/dist&apos;,
   aggregateTimeout: 300, <span class="hljs-comment">// wait so long for more changes</span>
   poll: true, <span class="hljs-comment">// use polling instead of native watchers</span>
   stats: {
       chunks: false
   }
});

<span class="hljs-keyword">var</span> <span class="hljs-keyword">app</span> = express();
<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(webpackDevMiddlewareInstance);
<span class="hljs-keyword">app</span>.listen(xxxx, function(<span class="hljs-keyword">err</span>) {
   console.<span class="hljs-built_in">log</span>(colors.info(<span class="hljs-string">&quot;dev server start: listening at &quot;</span> + xxxx));
   <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
     console.<span class="hljs-keyword">error</span>(<span class="hljs-keyword">err</span>);
   }
}</code></pre><h2 id="articleHeader16">6. &#x603B;&#x7ED3;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x4ECE; webpack &#x6784;&#x5EFA;&#x7684;&#x5404;&#x4E2A;&#x90E8;&#x5206;&#xFF0C;&#x7ED9;&#x51FA;&#x4E86;&#x76F8;&#x5E94;&#x7684;&#x4F18;&#x5316;&#x7B56;&#x7565;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x80FD;&#x591F;&#x5C06;&#x5176;&#x5B8C;&#x5168;&#x8D2F;&#x5F7B;&#x8D77;&#x6765;&#xFF0C;10 &#x500D;&#x63D0;&#x901F;&#x4E0D;&#x662F;&#x68A6;&#x60F3;&#x3002;&#x8FD9;&#x4E9B;&#x4F18;&#x5316;&#x4E5F;&#x540C;&#x6837;&#x5E94;&#x7528;&#x5230;&#x4E86;&#x6211;&#x4EEC;&#x56E2;&#x961F;&#x7684; react &#x9879;&#x76EE;&#x4E2D;&#xFF0C;<a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxcore</a> &#xFF0C;&#x6B22;&#x8FCE;&#x4E00;&#x8D77;&#x6765;&#x8BA8;&#x8BBA; webpack &#x7684;&#x6548;&#x7387;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x3002;</p><h2 id="articleHeader17">7. &#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><ul><li><p>webpack build performance&#xFF1A;<a href="http://webpack.github.io/docs/build-performance.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a></p></li><li><p>webpack&#x306E;DLL&#x30D0;&#x30F3;&#x30C9;&#x30EB;&#x3092;&#x4F7F;&#x3063;&#x3066;&#x30D3;&#x30EB;&#x30C9;&#x3092;&#x901F;&#x304F;&#x3059;&#x308B;&#xFF1A;<a href="http://qiita.com/pirosikick/items/c77db84dbed4c447a6fe#%E3%81%8A%E3%81%BE%E3%81%91cachedirectory" rel="nofollow noreferrer" target="_blank">http://qiita.com/pirosikick/i...</a></p></li><li><p>How to make your Webpack builds 10x faster&#xFF1A;<a href="http://www.slideshare.net/trueter/how-to-make-your-webpack-builds-10x-faster" rel="nofollow noreferrer" target="_blank">http://www.slideshare.net/tru...</a></p></li></ul><blockquote><p>&#x672C;&#x6587;&#x4F5C;&#x8005; <a href="https://github.com/eternalsky" rel="nofollow noreferrer" target="_blank">eternalsky</a>&#xFF0C;&#x59CB;&#x53D1;&#x4E8E;&#x56E2;&#x961F;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7; <strong>&#x733F;&#x733F;&#x76F8;&#x62B1;</strong> &#x548C;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2; <a href="http://eternalsky.me/" rel="nofollow noreferrer" target="_blank"><strong>&#x7A7A;&#x306E;&#x5C4B;&#x6577;</strong></a>&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x4FDD;&#x7559;&#x4F5C;&#x8005;&#x4FE1;&#x606F;&#x3002;</p></blockquote>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发工具心得：如何 10 倍提高你的 Webpack 构建效率

## 原文链接
[https://segmentfault.com/a/1190000005770042](https://segmentfault.com/a/1190000005770042)

