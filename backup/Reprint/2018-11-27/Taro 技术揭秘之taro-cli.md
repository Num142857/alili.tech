---
title: 'Taro 技术揭秘之taro-cli' 
date: 2018-11-27 2:30:12
hidden: true
slug: 7vag7dnc8rk
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x6587;&#x7AE0;&#x540C;&#x6B65;&#x4E8E; <a href="https://github.com/Pines-Cheng/blog/issues" rel="nofollow noreferrer" target="_blank">Github/Blog</a></blockquote><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p><a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a> &#x662F;&#x7531;&#x51F9;&#x51F8;&#x5B9E;&#x9A8C;&#x5BA4;&#x6253;&#x9020;&#x7684;&#x4E00;&#x5957;&#x9075;&#x5FAA; React &#x8BED;&#x6CD5;&#x89C4;&#x8303;&#x7684;&#x591A;&#x7AEF;&#x7EDF;&#x4E00;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x3002;</p><p>&#x4F7F;&#x7528; Taro&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53EA;&#x4E66;&#x5199;&#x4E00;&#x5957;&#x4EE3;&#x7801;&#xFF0C;&#x518D;&#x901A;&#x8FC7; Taro &#x7684;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;&#xFF0C;&#x5C06;&#x6E90;&#x4EE3;&#x7801;&#x5206;&#x522B;&#x7F16;&#x8BD1;&#x51FA;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7AEF;&#xFF08;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x3001;H5&#x3001;App &#x7AEF;&#x7B49;&#xFF09;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5B9E;&#x73B0; <strong>&#x4E00;&#x6B21;&#x7F16;&#x5199;&#xFF0C;&#x591A;&#x7AEF;&#x8FD0;&#x884C;</strong>&#x3002; &#x5173;&#x4E8E; Taro &#x7684;&#x66F4;&#x591A;&#x8BE6;&#x7EC6;&#x7684;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x770B;&#x5B98;&#x65B9;&#x7684;&#x4ECB;&#x7ECD;&#x6587;&#x7AE0; <a href="https://aotu.io/notes/2018/06/07/Taro/index.html" rel="nofollow noreferrer" target="_blank">Taro - &#x591A;&#x7AEF;&#x5F00;&#x53D1;&#x6846;&#x67B6;</a> &#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x524D;&#x5F80; GitHub &#x4ED3;&#x5E93; <a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">NervJS/taro</a> &#x67E5;&#x770B; Taro &#x6587;&#x6863;&#x53CA;&#x76F8;&#x5173;&#x8D44;&#x6599;&#x3002;</p><p><span class="img-wrap"><img data-src="https://img11.360buyimg.com/uba/jfs/t21205/91/853520716/145629/b03d7fa7/5b19f383N6a30536b.jpg" src="https://static.alili.techhttps://img11.360buyimg.com/uba/jfs/t21205/91/853520716/145629/b03d7fa7/5b19f383N6a30536b.jpg" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>Taro &#x9879;&#x76EE;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x9879;&#x76EE;&#x590D;&#x6742;&#x800C;&#x5E9E;&#x5927;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x65B9;&#x65B9;&#x9762;&#x9762;&#xFF08;&#x591A;&#x7AEF;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x3001;&#x7EC4;&#x4EF6;&#x3001;&#x8DEF;&#x7531;&#x3001;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3001;&#x751F;&#x547D;&#x5468;&#x671F;&#x3001;&#x7AEF;&#x80FD;&#x529B;&#x7684;&#x5B9E;&#x73B0;&#x4E0E;&#x517C;&#x5BB9;&#x7B49;&#x7B49;&#xFF09;&#x591A;&#xFF0C;&#x5BF9;&#x4E8E;&#x5927;&#x591A;&#x6570;&#x4EBA;&#x6765;&#x8BF4;&#xFF0C;&#x60F3;&#x8981;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x5176;&#x5B9E;&#x73B0;&#x673A;&#x5236;&#x53CA;&#x539F;&#x7406;&#xFF0C;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x56F0;&#x96BE;&#x7684;&#x3002;</p><p><code>Taro &#x6280;&#x672F;&#x63ED;&#x79D8;</code>&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5C06;&#x4E3A;&#x4F60;&#x9010;&#x6B65;&#x63ED;&#x5F00; Taro &#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x540E;&#x7684;&#x795E;&#x79D8;&#x9762;&#x7EB1;&#xFF0C;&#x5E26;&#x9886;&#x4F60;&#x6DF1;&#x5165; Taro &#x5185;&#x90E8;&#xFF0C;&#x4E86;&#x89E3; Taro &#x662F;&#x600E;&#x6837;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x5B9E;&#x73B0; <strong>&#x4E00;&#x6B21;&#x7F16;&#x5199;&#xFF0C;&#x591A;&#x7AEF;&#x8FD0;&#x884C;</strong> &#x7684;&#x5B8F;&#x4F1F;&#x76EE;&#x6807;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x5E0C;&#x671B;&#x501F;&#x6B64;&#x673A;&#x4F1A;&#x629B;&#x7816;&#x5F15;&#x7389;&#xFF0C;&#x4FC3;&#x8FDB;&#x524D;&#x7AEF;&#x5708;&#x6D8C;&#x73B0;&#x51FA;&#x66F4;&#x591A;&#x7684;&#xFF0C;&#x80FD;&#x591F;&#x89E3;&#x51B3;&#x5927;&#x5BB6;&#x75DB;&#x70B9;&#x7684;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4ECE;&#x8D1F;&#x8D23; Taro &#x811A;&#x624B;&#x67B6;&#x521D;&#x59CB;&#x5316;&#x548C;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x7684;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; Taro &#x7684;&#x5165;&#x53E3;&#xFF1A;<a href="https://www.npmjs.com/package/@tarojs/cli" rel="nofollow noreferrer" target="_blank">@tarojs/cli</a> &#x5F00;&#x59CB;&#x3002;</p><h2 id="articleHeader1">taro-cli &#x5305;</h2><h3 id="articleHeader2">taro &#x547D;&#x4EE4;</h3><p>taro-cli &#x5305;&#x4F4D;&#x4E8E; <a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a> &#x5DE5;&#x7A0B;&#x7684; packages &#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7; <code>npm install -g @tarojs/cli</code> &#x5168;&#x5C40;&#x5B89;&#x88C5;&#x540E;&#xFF0C;&#x5C06;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;taro &#x547D;&#x4EE4;&#x3002;&#x4E3B;&#x8981;&#x8D1F;&#x8D23;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x3001;&#x7F16;&#x8BD1;&#x3001;&#x6784;&#x5EFA;&#x7B49;&#x3002;&#x76F4;&#x63A5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x5165; taro &#xFF0C;&#x4F1A;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x63D0;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x279C; taro
&#x1F47D; Taro v0.0.63


  Usage: taro &lt;command&gt; [options]

  Options:

    -V, --version       output the version number
    -h, --help          output usage information

  Commands:

    init [projectName]  Init a project with default templete
    build               Build a project with options
    update              Update packages of taro
    help [cmd]          display help for [cmd]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code class="sh">&#x279C; taro
&#x1F47D; Taro v0.<span class="hljs-number">0.63</span>


  Usage: taro <span class="hljs-symbol">&lt;command&gt;</span> [<span class="hljs-keyword">options</span>]

  Option<span class="hljs-variable">s:</span>

    -V, --<span class="hljs-keyword">version</span>       output the <span class="hljs-keyword">version</span> <span class="hljs-keyword">number</span>
    -h, --<span class="hljs-keyword">help</span>          output usage information

  Command<span class="hljs-variable">s:</span>

    init [projectName]  Init <span class="hljs-keyword">a</span> project with default templete
    build               Build <span class="hljs-keyword">a</span> project with <span class="hljs-keyword">options</span>
    <span class="hljs-keyword">update</span>              Update packages of taro
    <span class="hljs-keyword">help</span> [cmd]          <span class="hljs-keyword">display</span> <span class="hljs-keyword">help</span> <span class="hljs-keyword">for</span> [cmd]</code></pre><p>&#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x8BE6;&#x7EC6;&#x770B;&#x770B; taro &#x547D;&#x4EE4;&#x7528;&#x6CD5;&#x53CA;&#x4F5C;&#x7528;&#x3002;</p><h3 id="articleHeader3">&#x5305;&#x7BA1;&#x7406;&#x4E0E;&#x53D1;&#x5E03;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E86;&#x89E3; taro-cli &#x5305;&#x4E0E; taro &#x5DE5;&#x7A0B;&#x7684;&#x5173;&#x7CFB;&#x3002;</p><p>&#x5C06; Taro &#x5DE5;&#x7A0B; clone &#x4E0B;&#x6765;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5DE5;&#x7A0B;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF0C;&#x6574;&#x4F53;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x660E;&#x4E86;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; CHANGELOG.md
&#x251C;&#x2500;&#x2500; LICENSE
&#x251C;&#x2500;&#x2500; README.md
&#x251C;&#x2500;&#x2500; build
&#x251C;&#x2500;&#x2500; docs
&#x251C;&#x2500;&#x2500; lerna-debug.log
&#x251C;&#x2500;&#x2500; lerna.json     // Lerna &#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; packages
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; eslint-config-taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; eslint-plugin-taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; postcss-plugin-constparse
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; postcss-pxtransform
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-async-await
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-cli
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-components
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-components-rn
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-h5
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-babel
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-csso
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-sass
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-uglifyjs
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-redux
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-redux-h5
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-rn
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-rn-runner
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-router
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-transformer-wx
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-weapp
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; taro-webpack-runner
&#x2514;&#x2500;&#x2500; yarn.lock" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; CHANGELOG<span class="hljs-selector-class">.md</span>
&#x251C;&#x2500;&#x2500; LICENSE
&#x251C;&#x2500;&#x2500; README<span class="hljs-selector-class">.md</span>
&#x251C;&#x2500;&#x2500; build
&#x251C;&#x2500;&#x2500; docs
&#x251C;&#x2500;&#x2500; lerna-debug<span class="hljs-selector-class">.log</span>
&#x251C;&#x2500;&#x2500; lerna<span class="hljs-selector-class">.json</span>     <span class="hljs-comment">// Lerna &#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; packages
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; eslint-config-taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; eslint-plugin-taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; postcss-plugin-constparse
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; postcss-pxtransform
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-async-await
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-cli
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-components
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-components-rn
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-<span class="hljs-selector-tag">h5</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-babel
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-csso
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-sass
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-plugin-uglifyjs
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-redux
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-redux-<span class="hljs-selector-tag">h5</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-rn
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-rn-runner
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-router
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-transformer-wx
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-weapp
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; taro-webpack-runner
&#x2514;&#x2500;&#x2500; yarn.lock</code></pre><p><a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a> &#x9879;&#x76EE;&#x4E3B;&#x8981;&#x662F;&#x7531;&#x4E00;&#x7CFB;&#x5217; npm &#x5305;&#x7EC4;&#x6210;&#xFF0C;&#x4F4D;&#x4E8E;&#x5DE5;&#x7A0B;&#x7684; packages &#x76EE;&#x5F55;&#x4E0B;&#x3002;&#x5B83;&#x7684;&#x5305;&#x7BA1;&#x7406;&#x65B9;&#x5F0F;&#x548C; <a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">Babel</a> &#x9879;&#x76EE;&#x4E00;&#x6837;&#xFF0C;&#x5C06;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A; monorepo &#x6765;&#x8FDB;&#x884C;&#x7BA1;&#x7406;&#xFF0C;&#x5E76;&#x4E14;&#x540C;&#x6837;&#x4F7F;&#x7528;&#x4E86;&#x5305;&#x7BA1;&#x7406;&#x5DE5;&#x5177; <a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">Lerna</a>&#x3002;</p><blockquote>Lerna &#x662F;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x4F18;&#x5316;&#x6258;&#x7BA1;&#x5728; git/npm &#x4E0A;&#x7684;&#x591A; package &#x4EE3;&#x7801;&#x5E93;&#x7684;&#x5DE5;&#x4F5C;&#x6D41;&#x7684;&#x4E00;&#x4E2A;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x5728;&#x4E3B;&#x9879;&#x76EE;&#x4E0B;&#x7BA1;&#x7406;&#x591A;&#x4E2A;&#x5B50;&#x9879;&#x76EE;&#xFF0C;&#x4ECE;&#x800C;&#x89E3;&#x51B3;&#x4E86;&#x591A;&#x4E2A;&#x5305;&#x4E92;&#x76F8;&#x4F9D;&#x8D56;&#xFF0C;&#x4E14;&#x53D1;&#x5E03;&#x65F6;&#x9700;&#x8981;&#x624B;&#x52A8;&#x7EF4;&#x62A4;&#x591A;&#x4E2A;&#x5305;&#x7684;&#x95EE;&#x9898;&#x3002;<p>&#x5173;&#x4E8E; Lerna &#x7684;&#x66F4;&#x591A;&#x4ECB;&#x7ECD;&#x53EF;&#x4EE5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863; <a href="https://lernajs.io/" rel="nofollow noreferrer" target="_blank">Lerna&#xFF1A;A tool for managing JavaScript projects with multiple packages</a>&#x3002;</p></blockquote><p>packages &#x76EE;&#x5F55;&#x4E0B;&#x5341;&#x51E0;&#x4E2A;&#x5305;&#x4E2D;&#xFF0C;&#x6700;&#x5E38;&#x7528;&#x7684;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x4E0E;&#x6784;&#x5EFA;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177; <a href="https://github.com/NervJS/taro/tree/master/packages/taro-cli" rel="nofollow noreferrer" target="_blank">taro-cli</a> &#x5C31;&#x662F;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x3002;&#x5728; Taro &#x5DE5;&#x7A0B;&#x6839;&#x76EE;&#x5F55;&#x8FD0;&#x884C; <code>lerna publish</code> &#x547D;&#x4EE4;&#x4E4B;&#x540E;&#xFF0C;<code>lerna.json</code> &#x91CC;&#x9762;&#x914D;&#x7F6E;&#x597D;&#x7684;&#x6240;&#x6709;&#x7684;&#x5305;&#x4F1A;&#x88AB;&#x53D1;&#x5E03;&#x5230; npm &#x4E0A;&#x53BB;&#x3002;</p><h3 id="articleHeader4">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><p>taro-cli &#x5305;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./
&#x251C;&#x2500;&#x2500; bin    // &#x547D;&#x4EE4;&#x884C;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro        // taro &#x547D;&#x4EE4;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-build        // taro build &#x547D;&#x4EE4;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-update        // taro update &#x547D;&#x4EE4;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; taro-init        // taro init &#x547D;&#x4EE4;
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; node_modules
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; build.js        // taro build &#x547D;&#x4EE4;&#x8C03;&#x7528;&#xFF0C;&#x6839;&#x636E; type &#x7C7B;&#x578B;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x811A;&#x672C;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; babel.js    // Babel &#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; babylon.js        // JavaScript &#x89E3;&#x6790;&#x5668; babylon &#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; browser_list.js    // autoprefixer browsers &#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js        // &#x76EE;&#x5F55;&#x540D;&#x53CA;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x5173;&#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; uglify.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; creator.js
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; h5.js        // &#x6784;&#x5EFA;h5 &#x5E73;&#x53F0;&#x4EE3;&#x7801;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; project.js    // taro init &#x547D;&#x4EE4;&#x8C03;&#x7528;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; rn.js        // &#x6784;&#x5EFA;React Native &#x5E73;&#x53F0;&#x4EE3;&#x7801;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; util        // &#x4E00;&#x7CFB;&#x5217;&#x5DE5;&#x5177;&#x51FD;&#x6570;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; npm.js
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; resolve_npm_files.js
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; weapp.js        // &#x6784;&#x5EFA;&#x5C0F;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;&#x8F6C;&#x6362;
&#x251C;&#x2500;&#x2500; templates        // &#x811A;&#x624B;&#x67B6;&#x6A21;&#x7248;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; default
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; appjs
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; prod
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; editorconfig
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; eslintrc
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; gitignore
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; index.js    // &#x521D;&#x59CB;&#x5316;&#x6587;&#x4EF6;&#x53CA;&#x76EE;&#x5F55;&#xFF0C;copy&#x6A21;&#x7248;&#x7B49;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; indexhtml
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; npmrc
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; pagejs
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; pkg
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; scss
&#x2514;&#x2500;&#x2500; yarn-error.log" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>./
&#x251C;&#x2500;&#x2500; bin    <span class="hljs-comment">// &#x547D;&#x4EE4;&#x884C;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro        <span class="hljs-comment">// taro &#x547D;&#x4EE4;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-build        <span class="hljs-comment">// taro build &#x547D;&#x4EE4;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; taro-update        <span class="hljs-comment">// taro update &#x547D;&#x4EE4;</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; taro-init        <span class="hljs-comment">// taro init &#x547D;&#x4EE4;</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; node_modules
&#x251C;&#x2500;&#x2500; src
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; build<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// taro build &#x547D;&#x4EE4;&#x8C03;&#x7528;&#xFF0C;&#x6839;&#x636E; type &#x7C7B;&#x578B;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x811A;&#x672C;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; babel<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// Babel &#x914D;&#x7F6E;</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; babylon<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// JavaScript &#x89E3;&#x6790;&#x5668; babylon &#x914D;&#x7F6E;</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; browser_list<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// autoprefixer browsers &#x914D;&#x7F6E;</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// &#x76EE;&#x5F55;&#x540D;&#x53CA;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x5173;&#x914D;&#x7F6E;</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; uglify<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; creator<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">h5</span><span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// &#x6784;&#x5EFA;h5 &#x5E73;&#x53F0;&#x4EE3;&#x7801;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; project<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// taro init &#x547D;&#x4EE4;&#x8C03;&#x7528;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; rn<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// &#x6784;&#x5EFA;React Native &#x5E73;&#x53F0;&#x4EE3;&#x7801;</span>
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; util        <span class="hljs-comment">// &#x4E00;&#x7CFB;&#x5217;&#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; npm<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; resolve_npm_files<span class="hljs-selector-class">.js</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; weapp<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// &#x6784;&#x5EFA;&#x5C0F;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;&#x8F6C;&#x6362;</span>
&#x251C;&#x2500;&#x2500; templates        <span class="hljs-comment">// &#x811A;&#x624B;&#x67B6;&#x6A21;&#x7248;</span>
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; default
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; appjs
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; config
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; dev
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; prod
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; editorconfig
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; eslintrc
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; gitignore
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x6587;&#x4EF6;&#x53CA;&#x76EE;&#x5F55;&#xFF0C;copy&#x6A21;&#x7248;&#x7B49;</span>
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; indexhtml
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; npmrc
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; pagejs
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; pkg
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; scss
&#x2514;&#x2500;&#x2500; yarn-error.log</code></pre><p>&#x5176;&#x4E2D;&#x5173;&#x952E;&#x6587;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5DF2;&#x6DFB;&#x52A0;&#x6CE8;&#x91CA;&#x8BF4;&#x660E;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x5148;&#x5927;&#x6982;&#x770B;&#x770B;&#xFF0C;&#x6709;&#x4E2A;&#x521D;&#x6B65;&#x5370;&#x8C61;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x76EE;&#x5F55;&#x6811;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;taro-cli &#x5DE5;&#x7A0B;&#x7684;&#x6587;&#x4EF6;&#x5E76;&#x4E0D;&#x7B97;&#x591A;&#xFF0C;&#x4E3B;&#x8981;&#x76EE;&#x5F55;&#x6709;&#xFF1A;<code>/bin</code>&#x3001;<code>/src</code>&#x3001;<code>/template</code>&#xFF0C;&#x6211;&#x5DF2;&#x7ECF;&#x5728;&#x4E0A;&#x9762;&#x8BE6;&#x7EC6;&#x6807;&#x6CE8;&#x4E86;&#x4E3B;&#x8981;&#x7684;&#x76EE;&#x5F55;&#x548C;&#x6587;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x81F3;&#x4E8E;&#x5177;&#x4F53;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x54B1;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x518D;&#x5206;&#x6790;&#x3002;</p><h2 id="articleHeader5">&#x7528;&#x5230;&#x7684;&#x6838;&#x5FC3;&#x5E93;</h2><ul><li><a href="https://github.com/tj/commander.js/" rel="nofollow noreferrer" target="_blank">tj/commander.js</a> <a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a> &#x547D;&#x4EE4;&#x884C;&#x63A5;&#x53E3;&#x5168;&#x9762;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x7075;&#x611F;&#x6765;&#x81EA;&#x4E8E; Ruby&apos;s <a href="https://github.com/commander-rb/commander" rel="nofollow noreferrer" target="_blank">commander</a>&#x3002;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x7684;&#x89E3;&#x6790;&#x547D;&#x4EE4;&#x548C;&#x53C2;&#x6570;&#xFF0C;&#x5408;&#x5E76;&#x591A;&#x9009;&#x9879;&#xFF0C;&#x5904;&#x7406;&#x77ED;&#x53C2;&#x7B49;&#x7B49;&#xFF0C;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x4E0A;&#x624B;&#x7B80;&#x5355;&#x3002;</li><li><a href="https://github.com/jprichardson/node-fs-extra" rel="nofollow noreferrer" target="_blank">jprichardson/node-fs-extra</a> &#x5728;nodejs&#x7684;fs&#x57FA;&#x7840;&#x4E0A;&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x65B0;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x66F4;&#x597D;&#x7528;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x62F7;&#x8D1D;&#x6A21;&#x677F;&#x3002;</li><li><a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk/chalk</a> &#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x63A7;&#x5236;&#x7EC8;&#x7AEF;&#x8F93;&#x51FA;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x6837;&#x5F0F;&#x3002;</li><li><a href="https://github.com/SBoudrias/Inquirer.js/" rel="nofollow noreferrer" target="_blank">SBoudrias/Inquirer.js</a> NodeJs &#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;&#x5DE5;&#x5177;&#xFF0C;&#x901A;&#x7528;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x7528;&#x6237;&#x754C;&#x9762;&#x96C6;&#x5408;&#xFF0C;&#x7528;&#x4E8E;&#x548C;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;</li><li><a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">sindresorhus/ora</a> &#x52A0;&#x8F7D;&#x4E2D;&#x72B6;&#x6001;&#x8868;&#x793A;&#x7684;&#x65F6;&#x5019;&#x4E00;&#x4E2A;loading&#x600E;&#x4E48;&#x591F;&#xFF0C;&#x518D;&#x5728;&#x524D;&#x9762;&#x52A0;&#x4E2A;&#x5C0F;&#x5708;&#x5708;&#x8F6C;&#x8D77;&#x6765;&#xFF0C;&#x6210;&#x529F;&#x4E86;console&#x4E00;&#x4E2A;success&#x600E;&#x4E48;&#x591F;&#xFF0C;&#x524D;&#x9762;&#x8FD8;&#x53EF;&#x4EE5;&#x7ED9;&#x4ED6;&#x52A0;&#x4E2A;&#x5C0F;&#x94A9;&#x94A9;&#xFF0C;ora&#x5C31;&#x662F;&#x505A;&#x8FD9;&#x4E2A;&#x7684;&#x3002;</li><li><a href="https://github.com/sboudrias/mem-fs-editor" rel="nofollow noreferrer" target="_blank">SBoudrias/mem-fs-editor</a> &#x63D0;&#x4F9B;&#x4E00;&#x7CFB;&#x5217;API&#xFF0C;&#x65B9;&#x4FBF;&#x64CD;&#x4F5C;&#x6A21;&#x677F;&#x6587;&#x4EF6;&#x3002;</li><li><a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer" target="_blank">shelljs/shelljs</a> ShellJS &#x662F;Node.js &#x6269;&#x5C55;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0;Unix shell &#x547D;&#x4EE4;&#x6267;&#x884C;&#x3002;</li><li><a href="https://nodejs.org/api/child_process.html" rel="nofollow noreferrer" target="_blank">Node.js child_process</a> &#x6A21;&#x5757; &#x7528;&#x4E8E;&#x65B0;&#x5EFA;&#x5B50;&#x8FDB;&#x7A0B;&#x3002;&#x5B50;&#x8FDB;&#x7A0B;&#x7684;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x50A8;&#x5B58;&#x5728;&#x7CFB;&#x7EDF;&#x7F13;&#x5B58;&#x4E4B;&#x4E2D;&#xFF08;&#x6700;&#x5927;200KB&#xFF09;&#xFF0C;&#x7B49;&#x5230;&#x5B50;&#x8FDB;&#x7A0B;&#x8FD0;&#x884C;&#x7ED3;&#x675F;&#x4EE5;&#x540E;&#xFF0C;&#x4E3B;&#x8FDB;&#x7A0B;&#x518D;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8BFB;&#x53D6;&#x5B50;&#x8FDB;&#x7A0B;&#x7684;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x3002;</li></ul><h2 id="articleHeader6">taro init</h2><p>taro init &#x547D;&#x4EE4;&#x4E3B;&#x8981;&#x7684;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://user-images.githubusercontent.com/9441951/41692040-7e477b7a-7530-11e8-8453-753a1d8052b6.png" src="https://static.alili.techhttps://user-images.githubusercontent.com/9441951/41692040-7e477b7a-7530-11e8-8453-753a1d8052b6.png" alt="image" title="image" style="cursor:pointer"></span></p><h3 id="articleHeader7">taro &#x547D;&#x4EE4;&#x5165;&#x53E3;</h3><p>&#x5F53;&#x6211;&#x4EEC;&#x5168;&#x5C40;&#x5B89;&#x88C5; taro-cli &#x5305;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x91CC;&#x5C31;&#x591A;&#x4E86;&#x4E00;&#x4E2A; taro &#x547D;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g @tarojs/cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code class="sh" style="word-break:break-word;white-space:initial">$ <span class="hljs-built_in">npm</span> install -g @tarojs/cli</code></pre><p>&#x90A3;&#x4E48; taro &#x547D;&#x4EE4;&#x662F;&#x600E;&#x6837;&#x6DFB;&#x52A0;&#x8FDB;&#x53BB;&#x7684;&#x5462;&#xFF0C;&#x5176;&#x539F;&#x56E0;&#x5728;&#x4E8E; <code>package.json</code> &#x91CC;&#x9762;&#x7684; bin &#x5B57;&#x6BB5;&#xFF1B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;bin&quot;: {
    &quot;taro&quot;: &quot;bin/taro&quot;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">&quot;bin&quot;</span>: {
    <span class="hljs-string">&quot;taro&quot;</span>: <span class="hljs-string">&quot;bin/taro&quot;</span>
  },</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x6307;&#x5B9A;&#xFF0C;taro &#x547D;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;&#x53EF;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x4E3A; bin/taro&#x3002;npm &#x4F1A;&#x5BFB;&#x627E;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5728; <code>[prefix]/bin</code> &#x76EE;&#x5F55;&#x4E0B;&#x5EFA;&#x7ACB;&#x7B26;&#x53F7;&#x94FE;&#x63A5;&#x3002;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;taro&#x4F1A;&#x5EFA;&#x7ACB;&#x7B26;&#x53F7;&#x94FE;&#x63A5; <code>[prefix]/bin/taro</code>&#x3002;&#x7531;&#x4E8E; <code>[prefix]/bin</code> &#x76EE;&#x5F55;&#x4F1A;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x52A0;&#x5165;&#x7CFB;&#x7EDF;&#x7684; PATH &#x53D8;&#x91CF;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x8FD0;&#x884C; npm &#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4E0D;&#x5E26;&#x8DEF;&#x5F84;&#xFF0C;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x6765;&#x8C03;&#x7528;&#x8FD9;&#x4E9B;&#x811A;&#x672C;&#x3002;</p><p>&#x5173;&#x4E8E;<code>prefix</code>&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>npm config get prefix</code>&#x83B7;&#x53D6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm config get prefix
/usr/local" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code class="sh">$ npm config <span class="hljs-built_in">get</span> <span class="hljs-built_in">prefix</span>
/usr/<span class="hljs-built_in">local</span></code></pre><p>&#x901A;&#x8FC7;&#x4E0B;&#x5217;&#x547D;&#x4EE4;&#x53EF;&#x4EE5;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x7684;&#x770B;&#x5230;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x7B26;&#x53F7;&#x94FE;&#x63A5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ls -al `which taro`
lrwxr-xr-x  1 chengshuai  admin  40  6 15 10:51 /usr/local/bin/taro -&gt; ../lib/node_modules/@tarojs/cli/bin/taro" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code class="sh">$ ls -al <span class="hljs-string">`which taro`</span>
lrwxr-xr-x  <span class="hljs-number">1</span> chengshuai  admin  <span class="hljs-number">40</span>  <span class="hljs-number">6</span> <span class="hljs-number">15</span> <span class="hljs-number">10</span>:<span class="hljs-number">51</span> /usr/local/bin/taro -&gt; ../<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node_modules</span>/@<span class="hljs-title">tarojs</span>/<span class="hljs-title">cli</span>/<span class="hljs-title">bin</span>/<span class="hljs-title">taro</span></span></code></pre><h3 id="articleHeader8">taro &#x5B50;&#x547D;&#x4EE4;</h3><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x77E5;&#x9053; taro-cli &#x5305;&#x5B89;&#x88C5;&#x4E4B;&#x540E;&#xFF0C;taro &#x547D;&#x4EE4;&#x662F;&#x600E;&#x4E48;&#x548C; <code>/bin/taro</code> &#x6587;&#x4EF6;&#x76F8;&#x5173;&#x8054;&#x8D77;&#x6765;&#x7684;&#xFF0C; &#x90A3; taro init &#x548C; taro build &#x53C8;&#x662F;&#x600E;&#x6837;&#x548C;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x5173;&#x8054;&#x8D77;&#x6765;&#x7684;&#x5462;&#xFF1F;</p><h4>&#x547D;&#x4EE4;&#x5173;&#x8054;&#x4E0E;&#x53C2;&#x6570;&#x89E3;&#x6790;</h4><p>&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5F97;&#x4E0D;&#x63D0;&#x5230;&#x4E00;&#x4E2A;&#x6709;&#x7528;&#x7684;&#x5305;&#xFF1A;<a href="https://github.com/tj/commander.js/" rel="nofollow noreferrer" target="_blank">tj/commander.js</a> <a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a> &#x547D;&#x4EE4;&#x884C;&#x63A5;&#x53E3;&#x5168;&#x9762;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x7075;&#x611F;&#x6765;&#x81EA;&#x4E8E; Ruby&apos;s <a href="https://github.com/commander-rb/commander" rel="nofollow noreferrer" target="_blank">commander</a>&#x3002;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x7684;&#x89E3;&#x6790;&#x547D;&#x4EE4;&#x548C;&#x53C2;&#x6570;&#xFF0C;&#x5408;&#x5E76;&#x591A;&#x9009;&#x9879;&#xFF0C;&#x5904;&#x7406;&#x77ED;&#x53C2;&#x7B49;&#x7B49;&#xFF0C;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x4E0A;&#x624B;&#x7B80;&#x5355;&#x3002;&#x5177;&#x4F53;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x53C2;&#x89C1;&#x9879;&#x76EE;&#x7684; README&#x3002;</p><p>&#x66F4;&#x4E3B;&#x8981;&#x7684;&#xFF0C;commander &#x652F;&#x6301; git &#x98CE;&#x683C;&#x7684;&#x5B50;&#x547D;&#x4EE4;&#x5904;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B50;&#x547D;&#x4EE4;&#x81EA;&#x52A8;&#x5F15;&#x5BFC;&#x5230;&#x4EE5;&#x7279;&#x5B9A;&#x683C;&#x5F0F;&#x547D;&#x540D;&#x7684;&#x547D;&#x4EE4;&#x6267;&#x884C;&#x6587;&#x4EF6;&#xFF0C;&#x6587;&#x4EF6;&#x540D;&#x7684;&#x683C;&#x5F0F;&#x662F; <code>[command]-[subcommand]</code>&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="taro init =&gt; taro-init
taro build =&gt; taro-build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>taro init =&gt; taro-init
taro build =&gt; taro-build</code></pre><p><code>/bin/taro</code> &#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x4E0D;&#x591A;&#xFF0C;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x4E5F;&#x5C31;&#x90A3;&#x51E0;&#x884C; <code>.command()</code> &#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#! /usr/bin/env node

const program = require(&apos;commander&apos;)
const {getPkgVersion} = require(&apos;../src/util&apos;)

program
  .version(getPkgVersion())
  .usage(&apos;&lt;command&gt; [options]&apos;)
  .command(&apos;init [projectName]&apos;, &apos;Init a project with default templete&apos;)
  .command(&apos;build&apos;, &apos;Build a project with options&apos;)
  .command(&apos;update&apos;, &apos;Update packages of taro&apos;)
  .parse(process.argv)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#! /usr/bin/env node</span>

<span class="hljs-keyword">const</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;commander&apos;</span>)
<span class="hljs-keyword">const</span> {getPkgVersion} = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../src/util&apos;</span>)

program
  .version(getPkgVersion())
  .usage(<span class="hljs-string">&apos;&lt;command&gt; [options]&apos;</span>)
  .command(<span class="hljs-string">&apos;init [projectName]&apos;</span>, <span class="hljs-string">&apos;Init a project with default templete&apos;</span>)
  .command(<span class="hljs-string">&apos;build&apos;</span>, <span class="hljs-string">&apos;Build a project with options&apos;</span>)
  .command(<span class="hljs-string">&apos;update&apos;</span>, <span class="hljs-string">&apos;Update packages of taro&apos;</span>)
  .parse(process.argv)
</code></pre><h4>command&#x65B9;&#x6CD5;</h4><p>&#x7528;&#x6CD5;&#xFF1A;<code>.command(&apos;init &lt;path&gt;&apos;, &apos;description&apos;)</code></p><p>command&#x7684; &#x7528;&#x6CD5;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#xFF0C;&#x539F;&#x5219;&#x4E0A;&#x4ED6;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4E3A;&#x547D;&#x4EE4;&#x5B9A;&#x4E49;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x547D;&#x4EE4;&#x63CF;&#x8FF0;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x4E3A;&#x547D;&#x4EE4;&#x8F85;&#x52A9;&#x4FEE;&#x9970;&#x5BF9;&#x8C61;&#x3002;</p><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; &lt;&gt; &#x6216;&#x8005; [] &#x4FEE;&#x9970;&#x547D;&#x4EE4;&#x53C2;&#x6570;</li><li><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x9009;&#x3002;</p><ul><li>&#x5F53;&#x6CA1;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;commander.js &#x5C06;&#x8FD4;&#x56DE; Command &#x5BF9;&#x8C61;&#xFF0C;&#x82E5;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5C06;&#x8FD4;&#x56DE;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x3002;</li><li>&#x5F53;&#x5E26;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x663E;&#x793A;&#x8C03;&#x7528; action(fn) &#x65F6;&#xFF0C;&#x5219;&#x5C06;&#x4F1A;&#x4F7F;&#x7528;<strong>&#x5B50;&#x547D;&#x4EE4;&#x6A21;&#x5F0F;</strong>&#x3002;</li><li>&#x6240;&#x8C13;&#x5B50;&#x547D;&#x4EE4;&#x6A21;&#x5F0F;&#x5373;&#xFF0C;<code>./pm</code>&#xFF0C;<code>./pm-install</code>&#xFF0C;<code>./pm-search</code>&#x7B49;&#x3002;&#x8FD9;&#x4E9B;&#x5B50;&#x547D;&#x4EE4;&#x8DDF;&#x4E3B;&#x547D;&#x4EE4;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</li></ul></li><li>&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E00;&#x822C;&#x4E0D;&#x7528;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x662F;&#x5426;&#x663E;&#x793A;&#x7684;&#x4F7F;&#x7528;&#x5B50;&#x547D;&#x4EE4;&#x6A21;&#x5F0F;&#x3002;</li></ul><blockquote>&#x6CE8;&#x610F;&#x7B2C;&#x4E00;&#x884C;<code>#!/usr/bin/env node</code>&#xFF0C;&#x6709;&#x4E2A;&#x5173;&#x952E;&#x8BCD;&#x53EB; <a href="https://link.juejin.im/?target=http%3A%2F%2Fsmilejay.com%2F2012%2F03%2Flinux_shebang%2F" rel="nofollow noreferrer" target="_blank">Shebang</a>&#xFF0C;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x53EF;&#x4EE5;&#x53BB;&#x641C;&#x641C;&#x770B;&#x3002;</blockquote><h3 id="articleHeader9">&#x53C2;&#x6570;&#x89E3;&#x6790;&#x53CA;&#x4E0E;&#x7528;&#x6237;&#x4EA4;&#x4E92;</h3><p>&#x524D;&#x9762;&#x63D0;&#x5230;&#x8FC7;&#xFF0C;commander &#x5305;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x547D;&#x4EE4;&#x548C;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x914D;&#x7F6E;&#x597D;&#x547D;&#x4EE4;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x80FD;&#x591F;&#x81EA;&#x52A8;&#x751F;&#x4EA7; help&#xFF08;&#x5E2E;&#x52A9;&#xFF09; &#x547D;&#x4EE4;&#x548C; version&#xFF08;&#x7248;&#x672C;&#x67E5;&#x770B;&#xFF09; &#x547D;&#x4EE4;&#x3002;&#x5E76;&#x4E14;&#x901A;&#x8FC7;<code>program.args</code>&#x4FBF;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6839;&#x636E;&#x53C2;&#x6570;&#x6765;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x811A;&#x672C;&#x3002;</p><p>&#x4F46;&#x5F53;&#x6211;&#x4EEC;&#x8FD0;&#x884C; <code>taro init</code> &#x547D;&#x4EE4;&#x540E;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;&#x53C8;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ taro init taroDemo
Taro&#x5373;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x9879;&#x76EE;!
Need help? Go and open issue: https://github.com/NervJS/taro/issues/new

Taro v0.0.50

? &#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x4ECB;&#x7ECD;&#xFF01;
? &#x8BF7;&#x9009;&#x62E9;&#x6A21;&#x677F; &#x9ED8;&#x8BA4;&#x6A21;&#x677F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code class="sh">$ taro init taroDemo
Taro&#x5373;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x9879;&#x76EE;!
Need <span class="hljs-keyword">help</span>? Go <span class="hljs-built_in">and</span> <span class="hljs-keyword">open</span> issue: http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/NervJS/taro/issues/<span class="hljs-keyword">new</span>

Taro v0.<span class="hljs-number">0.50</span>

? &#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x4ECB;&#x7ECD;&#xFF01;
? &#x8BF7;&#x9009;&#x62E9;&#x6A21;&#x677F; &#x9ED8;&#x8BA4;&#x6A21;&#x677F;</code></pre><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;<a href="https://github.com/SBoudrias/Inquirer.js/" rel="nofollow noreferrer" target="_blank">SBoudrias/Inquirer.js</a> &#x6765;&#x5904;&#x7406;&#x547D;&#x4EE4;&#x884C;&#x4EA4;&#x4E92;&#x3002;</p><p>&#x7528;&#x6CD5;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const inquirer = require(&apos;inquirer&apos;)  // npm i inquirer -D

if (typeof conf.description !== &apos;string&apos;) {
      prompts.push({
        type: &apos;input&apos;,
        name: &apos;description&apos;,
        message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x4ECB;&#x7ECD;&#xFF01;&apos;
      })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> inquirer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;inquirer&apos;</span>)  <span class="hljs-comment">// npm i inquirer -D</span>

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> conf.description !== <span class="hljs-string">&apos;string&apos;</span>) {
      prompts.push({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;input&apos;</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;description&apos;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x9879;&#x76EE;&#x4ECB;&#x7ECD;&#xFF01;&apos;</span>
      })
}</code></pre><p><code>prompt()</code>&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5728;&#x7528;&#x6237;&#x4E0E;&#x7EC8;&#x7AEF;&#x4EA4;&#x4E92;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5C06;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x5B58;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x7B54;&#x6848;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x901A;&#x8FC7;<code>then()</code>&#x83B7;&#x53D6;&#x5230;&#x8FD9;&#x4E2A;&#x7B54;&#x6848;&#x5BF9;&#x8C61;&#x3002;so easy&#xFF01;</p><p>&#x501F;&#x6B64;&#xFF0C;&#x65B0;&#x9879;&#x76EE;&#x7684;&#x540D;&#x79F0;&#x3001;&#x7248;&#x672C;&#x53F7;&#x3001;&#x63CF;&#x8FF0;&#x7B49;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x7EC8;&#x7AEF;&#x4EA4;&#x4E92;&#x63D2;&#x5165;&#x5230;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x5B8C;&#x5584;&#x4EA4;&#x4E92;&#x6D41;&#x7A0B;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x4EA4;&#x4E92;&#x7684;&#x95EE;&#x9898;&#x4E0D;&#x4EC5;&#x9650;&#x4E8E;&#x6B64;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x6DFB;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x4EA4;&#x4E92;&#x95EE;&#x9898;&#x3002;inquirer.js&#x5F3A;&#x5927;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E;&#xFF0C;&#x652F;&#x6301;&#x5F88;&#x591A;&#x79CD;&#x4EA4;&#x4E92;&#x7C7B;&#x578B;&#xFF0C;&#x9664;&#x4E86;&#x7B80;&#x5355;&#x7684;<code>input</code>&#xFF0C;&#x8FD8;&#x6709;<code>confirm</code>&#x3001;<code>list</code>&#x3001;<code>password</code>&#x3001;<code>checkbox</code>&#x7B49;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x89C1;&#x9879;&#x76EE;&#x7684;&#x5DE5;&#x7A0B;<a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">README</a>&#x3002;</p><p>&#x6B64;&#x5916;&#xFF0C;&#x4F60;&#x8FD8;&#x5728;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <a href="https://github.com/sindresorhus/ora" rel="nofollow noreferrer" target="_blank">sindresorhus/ora</a> &#x6765;&#x6DFB;&#x52A0;&#x4E00;&#x4E0B; loading &#x6548;&#x679C;&#x3002;&#x4F7F;&#x7528;<a href="https://github.com/chalk/chalk" rel="nofollow noreferrer" target="_blank">chalk/chalk</a> &#x7ED9;&#x7EC8;&#x7AEF;&#x7684;&#x8F93;&#x51FA;&#x6DFB;&#x52A0;&#x5404;&#x79CD;&#x6837;&#x5F0F;&#x3002;</p><h3 id="articleHeader10">&#x6A21;&#x7248;&#x6587;&#x4EF6;&#x64CD;&#x4F5C;</h3><p>&#x6700;&#x540E;&#x5C31;&#x662F;&#x6A21;&#x7248;&#x6587;&#x4EF6;&#x64CD;&#x4F5C;&#x4E86;&#xFF0C;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#x4E24;&#x5927;&#x5757;&#xFF1A;</p><ul><li>&#x5C06;&#x8F93;&#x5165;&#x7684;&#x5185;&#x5BB9;&#x63D2;&#x5165;&#x5230;&#x6A21;&#x677F;&#x4E2D;</li><li>&#x6839;&#x636E;&#x547D;&#x4EE4;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;copy &#x6587;&#x4EF6;</li><li>&#x66F4;&#x65B0;&#x5DF2;&#x5B58;&#x5728;&#x6587;&#x4EF6;&#x5185;&#x5BB9;</li></ul><p>&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;&#x57FA;&#x672C;&#x90FD;&#x662F;&#x5728; <code>/template/index.js</code>&#x6587;&#x4EF6;&#x91CC;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x8FD8;&#x7528;&#x5230;&#x4E86;<a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer" target="_blank">shelljs/shelljs</a> &#x6267;&#x884C;shell &#x811A;&#x672C;&#xFF0C;&#x5982;&#x521D;&#x59CB;&#x5316; git <code>git init</code>&#xFF0C;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;<code>npm install</code>&#x7B49;&#x3002;</p><h4>&#x62F7;&#x8D1D;&#x6A21;&#x677F;&#x6587;&#x4EF6;</h4><p>&#x62F7;&#x8D1D;&#x6A21;&#x7248;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x662F;&#x4F7F;&#x7528; <a href="https://github.com/jprichardson/node-fs-extra" rel="nofollow noreferrer" target="_blank">jprichardson/node-fs-extra</a> &#x7684;<code>copyTpl()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6B64;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;<code>ejs</code>&#x6A21;&#x677F;&#x8BED;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x8F93;&#x5165;&#x7684;&#x5185;&#x5BB9;&#x63D2;&#x5165;&#x5230;&#x6A21;&#x7248;&#x7684;&#x5BF9;&#x5E94;&#x4F4D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.fs.copyTpl(
      project,
      path.join(projectPath, &apos;project.config.json&apos;,
      {description,projectName}
    );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.fs.copyTpl(
      project,
      path.join(projectPath, <span class="hljs-string">&apos;project.config.json&apos;</span>,
      {description,projectName}
    );</code></pre><h4>&#x66F4;&#x65B0;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x6587;&#x4EF6;&#x5185;&#x5BB9;</h4><p>&#x66F4;&#x65B0;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x662F;&#x5F88;&#x590D;&#x6742;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x6700;&#x53EF;&#x9760;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x628A;&#x6587;&#x4EF6;&#x89E3;&#x6790;&#x4E3A;<code>AST</code>&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7F16;&#x8F91;&#x3002;&#x4E00;&#x4E9B;&#x6D41;&#x884C;&#x7684; <code>AST parser</code> &#x5305;&#x62EC;&#xFF1A;</p><ul><li><code>Cheerio</code>&#xFF1A;&#x89E3;&#x6790;<code>HTML</code>&#x3002;</li><li><code>Babylon</code>&#xFF1A;&#x89E3;&#x6790;<code>JavaScript</code>&#x3002;</li><li>&#x5BF9;&#x4E8E;<code>JSON</code>&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684;<code>JSON</code>&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x3002;</li></ul><p>&#x4F7F;&#x7528; <code>Regex</code> &#x89E3;&#x6790;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x662F;&#x90AA;&#x9053;&#xFF0C;&#x4E0D;&#x8981;&#x8FD9;&#x4E48;&#x5E72;&#xFF0C;&#x4E0D;&#x8981;&#x5FC3;&#x5B58;&#x4FA5;&#x5E78;&#x3002;</p><h2 id="articleHeader11">taro build</h2><p><code>taro build</code> &#x547D;&#x4EE4;&#x662F;&#x6574;&#x4E2A; taro &#x9879;&#x76EE;&#x7684;&#x7075;&#x9B42;&#x548C;&#x6838;&#x5FC3;&#xFF0C;&#x4E3B;&#x8981;&#x8D1F;&#x8D23; <strong>&#x591A;&#x7AEF;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;</strong>&#xFF08;h5&#xFF0C;&#x5C0F;&#x7A0B;&#x5E8F;&#xFF0C;React Native&#x7B49;&#xFF09;&#x3002;</p><p>taro &#x547D;&#x4EE4;&#x7684;&#x5173;&#x8054;&#xFF0C;&#x53C2;&#x6570;&#x89E3;&#x6790;&#x7B49;&#x548C; <code>taro init</code> &#x5176;&#x5B9E;&#x662F;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6700;&#x5173;&#x952E;&#x7684;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x90E8;&#x5206;&#x662F;&#x600E;&#x6837;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;</p><p>&#x8FD9;&#x4E2A;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x8FC7;&#x4E8E;&#x5E9E;&#x5927;&#xFF0C;&#x9700;&#x8981;&#x5355;&#x72EC;&#x62C9;&#x51FA;&#x6765;&#x4E00;&#x7BC7;&#x8BB2;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5148;&#x7B80;&#x5355;&#x63D0;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader12">&#x7F16;&#x8BD1;&#x5DE5;&#x4F5C;&#x6D41;&#x4E0E;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;AST&#xFF09;</h3><p>Taro &#x7684;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x5C06;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x6210;&#x5176;&#x4ED6;&#x7AEF;&#xFF08;H5&#x3001;&#x5C0F;&#x7A0B;&#x5E8F;&#x3001;React Native&#x7B49;&#xFF09;&#x4EE3;&#x7801;&#x3002;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x5C06;&#x4E00;&#x79CD;&#x7ED3;&#x6784;&#x5316;&#x8BED;&#x8A00;&#x7684;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x6210;&#x53E6;&#x4E00;&#x79CD;&#x7C7B;&#x4F3C;&#x7684;&#x7ED3;&#x6784;&#x5316;&#x8BED;&#x8A00;&#x7684;&#x4EE3;&#x7801;&#x5305;&#x62EC;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://p.ssl.qhimg.com/d/inn/fe85afd2/compile.png" src="https://static.alili.techhttps://p.ssl.qhimg.com/d/inn/fe85afd2/compile.png" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x9996;&#x5148;&#x662F; parse&#xFF0C;&#x5C06;&#x4EE3;&#x7801; <code>&#x89E3;&#x6790;&#xFF08;Parse&#xFF09;</code>&#x6210; <code>&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;Abstract Syntex Tree&#xFF09;</code>&#xFF0C;&#x7136;&#x540E;&#x5BF9; AST &#x8FDB;&#x884C; <code>&#x904D;&#x5386;&#xFF08;traverse&#xFF09;</code>&#x548C; <code>&#x66FF;&#x6362;(replace)</code>&#xFF08;&#x8FD9;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x6765;&#x8BF4;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x964C;&#x751F;&#xFF0C;&#x53EF;&#x4EE5;&#x7C7B;&#x6BD4; DOM &#x6811;&#x7684;&#x64CD;&#x4F5C;&#xFF09;&#xFF0C;&#x6700;&#x540E;&#x662F; <code>&#x751F;&#x6210;&#xFF08;generate&#xFF09;</code>&#xFF0C;&#x6839;&#x636E;&#x65B0;&#x7684; AST &#x751F;&#x6210;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h3 id="articleHeader13">Babel &#x6A21;&#x5757;</h3><p>Babel &#x662F;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x591A;&#x529F;&#x80FD;&#x7684; <code>JavaScript &#x7F16;&#x8BD1;&#x5668;</code>&#xFF0C;&#x66F4;&#x786E;&#x5207;&#x5730;&#x8BF4;&#x662F;&#x6E90;&#x7801;&#x5230;&#x6E90;&#x7801;&#x7684;&#x7F16;&#x8BD1;&#x5668;&#xFF0C;&#x901A;&#x5E38;&#x4E5F;&#x53EB;&#x505A; <code>&#x8F6C;&#x6362;&#x7F16;&#x8BD1;&#x5668;&#xFF08;transpiler&#xFF09;</code>&#x3002; &#x610F;&#x601D;&#x662F;&#x8BF4;&#x4F60;&#x4E3A; Babel &#x63D0;&#x4F9B;&#x4E00;&#x4E9B; JavaScript &#x4EE3;&#x7801;&#xFF0C;Babel &#x66F4;&#x6539;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x7ED9;&#x4F60;&#x65B0;&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x6B64;&#x5916;&#x5B83;&#x8FD8;&#x62E5;&#x6709;&#x4F17;&#x591A;&#x6A21;&#x5757;&#x53EF;&#x7528;&#x4E8E;&#x4E0D;&#x540C;&#x5F62;&#x5F0F;&#x7684; <code>&#x9759;&#x6001;&#x5206;&#x6790;</code>&#x3002;</p><blockquote>&#x9759;&#x6001;&#x5206;&#x6790;&#x662F;&#x5728;&#x4E0D;&#x9700;&#x8981;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x7684;&#x5904;&#x7406;&#x8FC7;&#x7A0B; &#xFF08;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x540C;&#x65F6;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5206;&#x6790;&#x5373;&#x662F;&#x52A8;&#x6001;&#x5206;&#x6790;&#xFF09;&#x3002; &#x9759;&#x6001;&#x5206;&#x6790;&#x7684;&#x76EE;&#x7684;&#x662F;&#x591A;&#x79CD;&#x591A;&#x6837;&#x7684;&#xFF0C; &#x5B83;&#x53EF;&#x7528;&#x4E8E;&#x8BED;&#x6CD5;&#x68C0;&#x67E5;&#xFF0C;&#x7F16;&#x8BD1;&#xFF0C;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#xFF0C;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#xFF0C;&#x4F18;&#x5316;&#xFF0C;&#x538B;&#x7F29;&#x7B49;&#x7B49;&#x573A;&#x666F;&#x3002;</blockquote><p>Babel &#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4E00;&#x7EC4;&#x6A21;&#x5757;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x62E5;&#x6709;&#x5E9E;&#x5927;&#x7684;&#x751F;&#x6001;&#x3002;Taro &#x9879;&#x76EE;&#x7684;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x57FA;&#x4E8E; Babel &#x7684;&#x4EE5;&#x4E0B;&#x6A21;&#x5757;&#x5B9E;&#x73B0;&#x7684;&#xFF1A;</p><ul><li><a href="https://github.com/babel/babylon" rel="nofollow noreferrer" target="_blank">babylon</a> Babylon &#x662F; Babel &#x7684;&#x89E3;&#x6790;&#x5668;&#x3002;&#x6700;&#x521D;&#x662F; &#x4ECE;Acorn&#x9879;&#x76EE;fork&#x51FA;&#x6765;&#x7684;&#x3002;Acorn&#x975E;&#x5E38;&#x5FEB;&#xFF0C;&#x6613;&#x4E8E;&#x4F7F;&#x7528;&#xFF0C;&#x5E76;&#x4E14;&#x9488;&#x5BF9;&#x975E;&#x6807;&#x51C6;&#x7279;&#x6027;(&#x4EE5;&#x53CA;&#x90A3;&#x4E9B;&#x672A;&#x6765;&#x7684;&#x6807;&#x51C6;&#x7279;&#x6027;) &#x8BBE;&#x8BA1;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;&#x63D2;&#x4EF6;&#x7684;&#x67B6;&#x6784;&#x3002;</li><li><a href="https://github.com/babel/babel/tree/master/packages/babel-traverse" rel="nofollow noreferrer" target="_blank">babel-traverse</a> Babel Traverse&#xFF08;&#x904D;&#x5386;&#xFF09;&#x6A21;&#x5757;&#x7EF4;&#x62A4;&#x4E86;&#x6574;&#x68F5;&#x6811;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4E14;&#x8D1F;&#x8D23;&#x66FF;&#x6362;&#x3001;&#x79FB;&#x9664;&#x548C;&#x6DFB;&#x52A0;&#x8282;&#x70B9;&#x3002;</li><li><a href="https://github.com/babel/babel/tree/master/packages/babel-types" rel="nofollow noreferrer" target="_blank">babel-types</a> Babel Types&#x6A21;&#x5757;&#x662F;&#x4E00;&#x4E2A;&#x7528;&#x4E8E; AST &#x8282;&#x70B9;&#x7684; Lodash &#x5F0F;&#x5DE5;&#x5177;&#x5E93;&#xFF0C; &#x5B83;&#x5305;&#x542B;&#x4E86;&#x6784;&#x9020;&#x3001;&#x9A8C;&#x8BC1;&#x4EE5;&#x53CA;&#x53D8;&#x6362; AST &#x8282;&#x70B9;&#x7684;&#x65B9;&#x6CD5;&#x3002; &#x8BE5;&#x5DE5;&#x5177;&#x5E93;&#x5305;&#x542B;&#x8003;&#x8651;&#x5468;&#x5230;&#x7684;&#x5DE5;&#x5177;&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x7F16;&#x5199;&#x5904;&#x7406;AST&#x903B;&#x8F91;&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;</li><li><a href="https://github.com/babel/babel/tree/master/packages/babel-generator" rel="nofollow noreferrer" target="_blank">babel-generator</a> Babel Generator&#x6A21;&#x5757;&#x662F; Babel &#x7684;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x5668;&#xFF0C;&#x5B83;&#x8BFB;&#x53D6;AST&#x5E76;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x4EE3;&#x7801;&#x548C;&#x6E90;&#x7801;&#x6620;&#x5C04;&#xFF08;sourcemaps&#xFF09;&#x3002;</li><li><a href="https://github.com/babel/babel/tree/master/packages/babel-template" rel="nofollow noreferrer" target="_blank">babel-template</a> babel-template &#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x867D;&#x7136;&#x5F88;&#x5C0F;&#x4F46;&#x5374;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684;&#x6A21;&#x5757;&#x3002; &#x5B83;&#x80FD;&#x8BA9;&#x4F60;&#x7F16;&#x5199;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x4E14;&#x5E26;&#x6709;&#x5360;&#x4F4D;&#x7B26;&#x7684;&#x4EE3;&#x7801;&#x6765;&#x4EE3;&#x66FF;&#x624B;&#x52A8;&#x7F16;&#x7801;&#xFF0C; &#x5C24;&#x5176;&#x662F;&#x751F;&#x6210;&#x7684;&#x5927;&#x89C4;&#x6A21; AST&#x7684;&#x65F6;&#x5019;&#x3002; &#x5728;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x4E2D;&#xFF0C;&#x8FD9;&#x79CD;&#x80FD;&#x529B;&#x88AB;&#x79F0;&#x4E3A;&#x51C6;&#x5F15;&#x7528;&#xFF08;quasiquotes&#xFF09;&#x3002;</li></ul><h3 id="articleHeader14">&#x89E3;&#x6790;&#x9875;&#x9762; config &#x914D;&#x7F6E;</h3><p>&#x5728;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x6210;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x4EE3;&#x7801;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6709;&#x4E00;&#x6B65;&#x662F;&#x5C06;&#x9875;&#x9762;&#x5165;&#x53E3; js &#x7684; config &#x5C5E;&#x6027;&#x89E3;&#x6790;&#x51FA;&#x6765;&#xFF0C;&#x5E76;&#x5199;&#x5165; <code>*.json</code> &#x6587;&#x4EF6;&#xFF0C;&#x4F9B;&#x5C0F;&#x7A0B;&#x5E8F;&#x4F7F;&#x7528;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x4E00;&#x6B65;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF0C;&#x8FD9;&#x91CC;&#x5C06;&#x8FD9;&#x90E8;&#x5206;&#x529F;&#x80FD;&#x7684;&#x5173;&#x952E;&#x4EE3;&#x7801;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. babel-traverse&#x65B9;&#x6CD5;&#xFF0C; &#x904D;&#x5386;&#x548C;&#x66F4;&#x65B0;&#x8282;&#x70B9;
traverse(ast, {  
    ClassProperty(astPath) { // &#x904D;&#x5386;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x58F0;&#x660E;
        const node = astPath.node
        if (node.key.name === &apos;config&apos;) { // &#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x4E3A; config
            configObj = traverseObjectNode(node)
            astPath.remove() // &#x5C06;&#x8BE5;&#x65B9;&#x6CD5;&#x79FB;&#x9664;&#x6389;
        }
    }
})

// 2. &#x904D;&#x5386;&#xFF0C;&#x89E3;&#x6790;&#x4E3A; JSON &#x5BF9;&#x8C61;
function traverseObjectNode(node, obj) { 
    if (node.type === &apos;ClassProperty&apos; || node.type === &apos;ObjectProperty&apos;) {
        const properties = node.value.properties
        obj = {}
        properties.forEach((p, index) =&gt; {
            obj[p.key.name] = traverseObjectNode(p.value)
        })
        return obj
    }
    if (node.type === &apos;ObjectExpression&apos;) {
        const properties = node.properties
        obj = {}
        properties.forEach((p, index) =&gt; {
            // const t = require(&apos;babel-types&apos;)  AST &#x8282;&#x70B9;&#x7684; Lodash &#x5F0F;&#x5DE5;&#x5177;&#x5E93;
            const key = t.isIdentifier(p.key) ? p.key.name : p.key.value
            obj[key] = traverseObjectNode(p.value)
        })
        return obj
    }
    if (node.type === &apos;ArrayExpression&apos;) {
        return node.elements.map(item =&gt; traverseObjectNode(item))
    }
    if (node.type === &apos;NullLiteral&apos;) {
        return null
    }
    return node.value
}

// 3. &#x5199;&#x5165;&#x5BF9;&#x5E94;&#x76EE;&#x5F55;&#x7684; *.json &#x6587;&#x4EF6;
fs.writeFileSync(outputPageJSONPath, JSON.stringify(configObj, null, 2))
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1. babel-traverse&#x65B9;&#x6CD5;&#xFF0C; &#x904D;&#x5386;&#x548C;&#x66F4;&#x65B0;&#x8282;&#x70B9;</span>
traverse(ast, {  
    ClassProperty(astPath) { <span class="hljs-comment">// &#x904D;&#x5386;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x58F0;&#x660E;</span>
        <span class="hljs-keyword">const</span> node = astPath.node
        <span class="hljs-keyword">if</span> (node.key.name === <span class="hljs-string">&apos;config&apos;</span>) { <span class="hljs-comment">// &#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x4E3A; config</span>
            configObj = traverseObjectNode(node)
            astPath.remove() <span class="hljs-comment">// &#x5C06;&#x8BE5;&#x65B9;&#x6CD5;&#x79FB;&#x9664;&#x6389;</span>
        }
    }
})

<span class="hljs-comment">// 2. &#x904D;&#x5386;&#xFF0C;&#x89E3;&#x6790;&#x4E3A; JSON &#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">traverseObjectNode</span>(<span class="hljs-params">node, obj</span>) </span>{ 
    <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">&apos;ClassProperty&apos;</span> || node.type === <span class="hljs-string">&apos;ObjectProperty&apos;</span>) {
        <span class="hljs-keyword">const</span> properties = node.value.properties
        obj = {}
        properties.forEach(<span class="hljs-function">(<span class="hljs-params">p, index</span>) =&gt;</span> {
            obj[p.key.name] = traverseObjectNode(p.value)
        })
        <span class="hljs-keyword">return</span> obj
    }
    <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">&apos;ObjectExpression&apos;</span>) {
        <span class="hljs-keyword">const</span> properties = node.properties
        obj = {}
        properties.forEach(<span class="hljs-function">(<span class="hljs-params">p, index</span>) =&gt;</span> {
            <span class="hljs-comment">// const t = require(&apos;babel-types&apos;)  AST &#x8282;&#x70B9;&#x7684; Lodash &#x5F0F;&#x5DE5;&#x5177;&#x5E93;</span>
            <span class="hljs-keyword">const</span> key = t.isIdentifier(p.key) ? p.key.name : p.key.value
            obj[key] = traverseObjectNode(p.value)
        })
        <span class="hljs-keyword">return</span> obj
    }
    <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">&apos;ArrayExpression&apos;</span>) {
        <span class="hljs-keyword">return</span> node.elements.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> traverseObjectNode(item))
    }
    <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">&apos;NullLiteral&apos;</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }
    <span class="hljs-keyword">return</span> node.value
}

<span class="hljs-comment">// 3. &#x5199;&#x5165;&#x5BF9;&#x5E94;&#x76EE;&#x5F55;&#x7684; *.json &#x6587;&#x4EF6;</span>
fs.writeFileSync(outputPageJSONPath, <span class="hljs-built_in">JSON</span>.stringify(configObj, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))
</code></pre><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x53EF;&#x4EE5;&#x6E05;&#x6670;&#x7684;&#x770B;&#x5230;&#xFF0C;&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x4E09;&#x6B65;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;&#x5DE5;&#x7A0B;&#x91CC;&#x9762;&#x7684; config &#x914D;&#x7F6E;&#x8F6C;&#x6362;&#x6210;&#x5C0F;&#x7A0B;&#x5E8F;&#x5BF9;&#x5E94;&#x7684; json &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x54EA;&#x6015;&#x4EC5;&#x4EC5;&#x662F;&#x8FD9;&#x4E00;&#x5C0F;&#x5757;&#x529F;&#x80FD;&#x70B9;&#xFF0C;&#x771F;&#x6B63;&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x4E5F;&#x6CA1;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x4F60;&#x8FD8;&#x9700;&#x8981;&#x8003;&#x8651;&#x5927;&#x91CF;&#x7684;&#x771F;&#x5B9E;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x53CA;&#x6781;&#x7AEF;&#x60C5;&#x51B5;&#xFF1A;</p><ul><li>&#x5E94;&#x7528;&#x5165;&#x53E3;app.js &#x548C;&#x9875;&#x9762;&#x5165;&#x53E3; index.js &#x7684; config &#x662F;&#x5426;&#x5F97;&#x5355;&#x72EC;&#x5904;&#x7406;&#xFF1F;</li><li>tabBar&#x914D;&#x7F6E;&#x600E;&#x6837;&#x8F6C;&#x6362;&#x4E14;&#x4FDD;&#x8BC1;&#x529F;&#x80FD;&#x53CA;&#x4EA4;&#x4E92;&#x4E00;&#x81F4;&#xFF1F;</li><li>&#x7528;&#x6237;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#x6709;&#x8BEF;&#x600E;&#x6837;&#x63D0;&#x793A;&#xFF1F;</li></ul><p>&#x66F4;&#x591A;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#xFF0C;&#x8FD8;&#x662F;&#x653E;&#x5728;&#x4E0B;&#x4E00;&#x7BC7;&#x5427;&#x3002;</p><h2 id="articleHeader15">&#x603B;&#x7ED3;</h2><p>&#x5230;&#x6B64;&#xFF0C;<code>taro-cli</code> &#x7684;&#x4E3B;&#x8981;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;&#x547D;&#x4EE4;&#x8C03;&#x7528;&#xFF0C;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x5F0F;&#x7B49;&#x57FA;&#x672C;&#x90FD;&#x634B;&#x5B8C;&#x4E86;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x7740;&#x5DE5;&#x7A0B;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#x81EA;&#x5DF1;&#x8DDF;&#x4E00;&#x904D;&#xFF0C;&#x5E94;&#x8BE5;&#x4E0D;&#x4F1A;&#x592A;&#x8D39;&#x52B2;&#x3002;</p><p><code>taro-cli</code> &#x76EE;&#x524D;&#x662F;&#x5C06;&#x6A21;&#x7248;&#x653E;&#x5728;&#x5DE5;&#x7A0B;&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x66F4;&#x65B0;&#x6A21;&#x7248;&#x90FD;&#x8981;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x811A;&#x624B;&#x67B6;&#x3002;&#x800C; <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> &#x662F;&#x5C06;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x653E;&#x5728; git &#x4E0A;&#xFF0C;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x518D;&#x6839;&#x636E;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x4E0B;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x7ECF;&#x8FC7;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#xFF0C;&#x751F;&#x6210;&#x9879;&#x76EE;&#x3002;&#x8FD9;&#x6837;&#x5C06;&#x6A21;&#x677F;&#x548C;&#x811A;&#x624B;&#x67B6;&#x5206;&#x79BB;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5404;&#x81EA;&#x7EF4;&#x62A4;&#xFF0C;&#x5373;&#x4F7F;&#x6A21;&#x677F;&#x6709;&#x53D8;&#x52A8;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4E0A;&#x4F20;&#x6700;&#x65B0;&#x7684;&#x6A21;&#x677F;&#x5373;&#x53EF;&#xFF0C;&#x800C;&#x4E0D;&#x9700;&#x8981;&#x7528;&#x6237;&#x53BB;&#x66F4;&#x65B0;&#x811A;&#x624B;&#x67B6;&#x5C31;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x6700;&#x65B0;&#x7684;&#x9879;&#x76EE;&#x3002; &#x8FD9;&#x4E2A;&#x540E;&#x671F;&#x53EF;&#x4EE5;&#x7EB3;&#x5165;&#x4F18;&#x5316;&#x7684;&#x8303;&#x7574;&#x3002;</p><p>&#x4E0B;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4E00;&#x8D77;&#x8FDB;&#x5165; Taro &#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x7684;&#x4E16;&#x754C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Taro 技术揭秘之taro-cli

## 原文链接
[https://segmentfault.com/a/1190000015340294](https://segmentfault.com/a/1190000015340294)

