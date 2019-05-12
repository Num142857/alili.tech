---
title: 'webpack优化' 
date: 2018-11-29 9:33:05
hidden: true
slug: 32pg9z7tim
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack&#x4F18;&#x5316;</h1>
<blockquote>&#x67E5;&#x770B;&#x6240;&#x6709;&#x6587;&#x6863;&#x9875;&#x9762;&#xFF1A;<a href="https://whjin.github.io/full-stack-development/" rel="nofollow noreferrer" target="_blank">&#x5168;&#x6808;&#x5F00;&#x53D1;</a>&#xFF0C;&#x83B7;&#x53D6;&#x66F4;&#x591A;&#x4FE1;&#x606F;&#x3002;<p>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/" rel="nofollow noreferrer" target="_blank">webpack&#x4F18;&#x5316;</a>&#xFF0C;&#x539F;&#x6587;&#x5E7F;&#x544A;&#x6A21;&#x6001;&#x6846;&#x906E;&#x6321;&#xFF0C;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#x4E0D;&#x597D;&#xFF0C;&#x6240;&#x4EE5;&#x6574;&#x7406;&#x6210;&#x672C;&#x6587;&#xFF0C;&#x65B9;&#x4FBF;&#x67E5;&#x627E;&#x3002;</p>
</blockquote>
<h2 id="articleHeader1">&#x4F18;&#x5316;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;</h2>
<ol>
<li>
<p><strong>&#x4F18;&#x5316;&#x6784;&#x5EFA;&#x901F;&#x5EA6;</strong>&#x3002;&#x5728;&#x9879;&#x76EE;&#x5E9E;&#x5927;&#x65F6;&#x6784;&#x5EFA;&#x8017;&#x65F6;&#x53EF;&#x80FD;&#x4F1A;&#x53D8;&#x7684;&#x5F88;&#x957F;&#xFF0C;&#x6BCF;&#x6B21;&#x7B49;&#x5F85;&#x6784;&#x5EFA;&#x7684;&#x8017;&#x65F6;&#x52A0;&#x8D77;&#x6765;&#x4E5F;&#x4F1A;&#x662F;&#x4E2A;&#x5927;&#x6570;&#x76EE;&#x3002;</p>
<ul>
<li>&#x7F29;&#x5C0F;&#x6587;&#x4EF6;&#x641C;&#x7D22;&#x8303;&#x56F4;</li>
<li>&#x4F7F;&#x7528; DllPlugin</li>
<li>&#x4F7F;&#x7528; HappyPack</li>
<li>&#x4F7F;&#x7528; ParallelUglifyPlugin</li>
</ul>
</li>
<li>
<p><strong>&#x4F18;&#x5316;&#x4F7F;&#x7528;&#x4F53;&#x9A8C;</strong>&#x3002;&#x901A;&#x8FC7;&#x81EA;&#x52A8;&#x5316;&#x624B;&#x6BB5;&#x5B8C;&#x6210;&#x4E00;&#x4E9B;&#x91CD;&#x590D;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4E13;&#x6CE8;&#x4E8E;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x672C;&#x8EAB;&#x3002;</p>
<ul>
<li>&#x4F7F;&#x7528;&#x81EA;&#x52A8;&#x5237;&#x65B0;</li>
<li>&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;</li>
</ul>
</li>
</ol>
<h2 id="articleHeader2">&#x4F18;&#x5316;&#x8F93;&#x51FA;&#x8D28;&#x91CF;</h2>
<p>&#x4F18;&#x5316;&#x8F93;&#x51FA;&#x8D28;&#x91CF;&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x7ED9;&#x7528;&#x6237;&#x5448;&#x73B0;&#x4F53;&#x9A8C;&#x66F4;&#x597D;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x4F8B;&#x5982;&#x51CF;&#x5C11;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x3001;&#x63D0;&#x5347;&#x6027;&#x80FD;&#x6D41;&#x7545;&#x5EA6;&#x7B49;&#x3002; &#x8FD9;&#x81F3;&#x5173;&#x91CD;&#x8981;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x4E92;&#x8054;&#x7F51;&#x884C;&#x4E1A;&#x7ADE;&#x4E89;&#x65E5;&#x76CA;&#x6FC0;&#x70C8;&#x7684;&#x4ECA;&#x5929;&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x5173;&#x7CFB;&#x5230;&#x4F60;&#x7684;&#x4EA7;&#x54C1;&#x7684;&#x751F;&#x6B7B;&#x3002;</p>
<p>&#x4F18;&#x5316;&#x8F93;&#x51FA;&#x8D28;&#x91CF;&#x672C;&#x8D28;&#x662F;&#x4F18;&#x5316;&#x6784;&#x5EFA;&#x8F93;&#x51FA;&#x7684;&#x8981;&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p>
<ol>
<li>
<p><strong>&#x51CF;&#x5C11;&#x7528;&#x6237;&#x80FD;&#x611F;&#x77E5;&#x5230;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x3002;</p>
<ul>
<li>&#x533A;&#x5206;&#x73AF;&#x5883;</li>
<li>&#x538B;&#x7F29;&#x4EE3;&#x7801;</li>
<li>CDN &#x52A0;&#x901F;</li>
<li>&#x4F7F;&#x7528; Tree Shaking</li>
<li>&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</li>
<li>&#x6309;&#x9700;&#x52A0;&#x8F7D;</li>
</ul>
</li>
<li>
<p><strong>&#x63D0;&#x5347;&#x6D41;&#x7545;&#x5EA6;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x63D0;&#x5347;&#x4EE3;&#x7801;&#x6027;&#x80FD;&#x3002;</p>
<ul>
<li>&#x4F7F;&#x7528; Prepack</li>
<li>&#x5F00;&#x542F; Scope Hoisting</li>
</ul>
</li>
</ol>
<h1 id="articleHeader3">&#x7F29;&#x5C0F;&#x6587;&#x4EF6;&#x641C;&#x7D22;&#x8303;&#x56F4;</h1>
<p>Webpack &#x542F;&#x52A8;&#x540E;&#x4F1A;&#x4ECE;&#x914D;&#x7F6E;&#x7684; Entry &#x51FA;&#x53D1;&#xFF0C;&#x89E3;&#x6790;&#x51FA;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#xFF0C;&#x518D;&#x9012;&#x5F52;&#x7684;&#x89E3;&#x6790;&#x3002; &#x5728;&#x9047;&#x5230;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x65F6; Webpack &#x4F1A;&#x505A;&#x4E24;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</p>
<ol>
<li>&#x6839;&#x636E;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x53BB;&#x5BFB;&#x627E;&#x5BF9;&#x5E94;&#x7684;&#x8981;&#x5BFC;&#x5165;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x4F8B;&#x5982; <code>require(&apos;react&apos;)</code> &#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x662F; <code>./node_modules/react/react.js&#xFF0C;require(&apos;./util&apos;)</code> &#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x662F; <code>./util.js</code>&#x3002;</li>
<li>&#x6839;&#x636E;&#x627E;&#x5230;&#x7684;&#x8981;&#x5BFC;&#x5165;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#xFF0C;&#x4F7F;&#x7528;&#x914D;&#x7F6E;&#x4E2D;&#x7684; Loader &#x53BB;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x3002;&#x4F8B;&#x5982;&#x4F7F;&#x7528; ES6 &#x5F00;&#x53D1;&#x7684; JavaScript &#x6587;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528; <code>babel-loader</code> &#x53BB;&#x5904;&#x7406;&#x3002;</li>
</ol>
<h2 id="articleHeader4">&#x4F18;&#x5316; <code>loader</code> &#x914D;&#x7F6E;</h2>
<p>&#x7531;&#x4E8E; Loader &#x5BF9;&#x6587;&#x4EF6;&#x7684;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#x5F88;&#x8017;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x8BA9;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x7684;&#x6587;&#x4EF6;&#x88AB; Loader &#x5904;&#x7406;&#x3002;</p>
<p>&#x5728; Module &#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7;&#x5728;&#x4F7F;&#x7528; Loader &#x65F6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>test</code> &#x3001; <code>include</code> &#x3001; <code>exclude</code> &#x4E09;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x6765;&#x547D;&#x4E2D; Loader &#x8981;&#x5E94;&#x7528;&#x89C4;&#x5219;&#x7684;&#x6587;&#x4EF6;&#x3002; &#x4E3A;&#x4E86;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x7684;&#x8BA9;&#x6587;&#x4EF6;&#x88AB; Loader &#x5904;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>include</code> &#x53BB;&#x547D;&#x4E2D;&#x53EA;&#x6709;&#x54EA;&#x4E9B;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x88AB;&#x5904;&#x7406;&#x3002;</p>
<p>&#x4EE5;&#x91C7;&#x7528; ES6 &#x7684;&#x9879;&#x76EE;&#x4E3A;&#x4F8B;&#xFF0C;&#x5728;&#x914D;&#x7F6E; <code>babel-loader</code> &#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        // &#x5982;&#x679C;&#x9879;&#x76EE;&#x6E90;&#x7801;&#x4E2D;&#x53EA;&#x6709; js &#x6587;&#x4EF6;&#x5C31;&#x4E0D;&#x8981;&#x5199;&#x6210; /\.jsx?$/&#xFF0C;&#x63D0;&#x5347;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x6027;&#x80FD;
        test: /\.js$/,
        // babel-loader &#x652F;&#x6301;&#x7F13;&#x5B58;&#x8F6C;&#x6362;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x901A;&#x8FC7; cacheDirectory &#x9009;&#x9879;&#x5F00;&#x542F;
        use: [&apos;babel-loader?cacheDirectory&apos;],
        // &#x53EA;&#x5BF9;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; src &#x76EE;&#x5F55;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x91C7;&#x7528; babel-loader
        include: path.resolve(__dirname, &apos;src&apos;),
      },
    ]
  },
};


" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        <span class="hljs-comment">// &#x5982;&#x679C;&#x9879;&#x76EE;&#x6E90;&#x7801;&#x4E2D;&#x53EA;&#x6709; js &#x6587;&#x4EF6;&#x5C31;&#x4E0D;&#x8981;&#x5199;&#x6210; /\.jsx?$/&#xFF0C;&#x63D0;&#x5347;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x6027;&#x80FD;</span>
        test: /\.js$/,
        <span class="hljs-comment">// babel-loader &#x652F;&#x6301;&#x7F13;&#x5B58;&#x8F6C;&#x6362;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x901A;&#x8FC7; cacheDirectory &#x9009;&#x9879;&#x5F00;&#x542F;</span>
        <span class="hljs-keyword">use</span>: [&apos;babel-loader?cacheDirectory&apos;],
        <span class="hljs-comment">// &#x53EA;&#x5BF9;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; src &#x76EE;&#x5F55;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x91C7;&#x7528; babel-loader</span>
        <span class="hljs-meta"><span class="hljs-meta-keyword">include</span>: path.resolve(__dirname, &apos;src&apos;),
      },
    ]
  },
};


</span></code></pre>
<blockquote>&#x4F60;&#x53EF;&#x4EE5;&#x9002;&#x5F53;&#x7684;&#x8C03;&#x6574;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x5728;&#x914D;&#x7F6E; Loader &#x65F6;&#x901A;&#x8FC7; <code>include</code> &#x53BB;&#x7F29;&#x5C0F;&#x547D;&#x4E2D;&#x8303;&#x56F4;&#x3002;</blockquote>
<h2 id="articleHeader5">&#x4F18;&#x5316; <code>resolve.modules</code> &#x914D;&#x7F6E;</h2>
<p>&#x5728; Resolve &#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7; <code>resolve.modules</code> &#x7528;&#x4E8E;&#x914D;&#x7F6E; Webpack &#x53BB;&#x54EA;&#x4E9B;&#x76EE;&#x5F55;&#x4E0B;&#x5BFB;&#x627E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x3002;</p>
<p><code>resolve.modules</code> &#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x662F; <code>[&apos;node_modules&apos;]</code>&#xFF0C;&#x542B;&#x4E49;&#x662F;&#x5148;&#x53BB;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>./node_modules</code> &#x76EE;&#x5F55;&#x4E0B;&#x53BB;&#x627E;&#x60F3;&#x627E;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x627E;&#x5230;&#x5C31;&#x53BB;&#x4E0A;&#x4E00;&#x7EA7;&#x76EE;&#x5F55; <code>../node_modules</code> &#x4E2D;&#x627E;&#xFF0C;&#x518D;&#x6CA1;&#x6709;&#x5C31;&#x53BB; <code>../../node_modules</code> &#x4E2D;&#x627E;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#xFF0C;&#x8FD9;&#x548C; Node.js &#x7684;&#x6A21;&#x5757;&#x5BFB;&#x627E;&#x673A;&#x5236;&#x5F88;&#x76F8;&#x4F3C;&#x3002;</p>
<p>&#x5F53;&#x5B89;&#x88C5;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x90FD;&#x653E;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>./node_modules</code> &#x76EE;&#x5F55;&#x4E0B;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x6309;&#x7167;&#x9ED8;&#x8BA4;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x4E00;&#x5C42;&#x5C42;&#x7684;&#x5BFB;&#x627E;&#xFF0C;&#x53EF;&#x4EE5;&#x6307;&#x660E;&#x5B58;&#x653E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x4EE5;&#x51CF;&#x5C11;&#x5BFB;&#x627E;&#xFF0C;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = {
  resolve: {
    // &#x4F7F;&#x7528;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x6307;&#x660E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x5B58;&#x653E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4EE5;&#x51CF;&#x5C11;&#x641C;&#x7D22;&#x6B65;&#x9AA4;
    // &#x5176;&#x4E2D; __dirname &#x8868;&#x793A;&#x5F53;&#x524D;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;
    modules: [path.resolve(__dirname, &apos;node_modules&apos;)]
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x6307;&#x660E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x5B58;&#x653E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4EE5;&#x51CF;&#x5C11;&#x641C;&#x7D22;&#x6B65;&#x9AA4;</span>
    <span class="hljs-comment">// &#x5176;&#x4E2D; __dirname &#x8868;&#x793A;&#x5F53;&#x524D;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;</span>
    modules: [path.resolve(__dirname, <span class="hljs-string">&apos;node_modules&apos;</span>)]
  },
};
</code></pre>
<h2 id="articleHeader6">&#x4F18;&#x5316; <code>resolve.mainFields</code> &#x914D;&#x7F6E;</h2>
<p>&#x5728; Resolve &#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7; <code>resolve.mainFields</code> &#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F7F;&#x7528;&#x54EA;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x3002;</p>
<p>&#x5B89;&#x88C5;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4E2D;&#x90FD;&#x4F1A;&#x6709;&#x4E00;&#x4E2A; <code>package.json</code> &#x6587;&#x4EF6;&#x7528;&#x4E8E;&#x63CF;&#x8FF0;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x4E2D;&#x6709;&#x4E9B;&#x5B57;&#x6BB5;&#x7528;&#x4E8E;&#x63CF;&#x8FF0;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5728;&#x54EA;&#x91CC;&#xFF0C;<code>resolve.mainFields</code> &#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x91C7;&#x7528;&#x54EA;&#x4E2A;&#x5B57;&#x6BB5;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x63CF;&#x8FF0;&#x3002;</p>
<p>&#x53EF;&#x4EE5;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#x5B57;&#x6BB5;&#x63CF;&#x8FF0;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x539F;&#x56E0;&#x662F;&#x56E0;&#x4E3A;&#x6709;&#x4E9B;&#x6A21;&#x5757;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x7528;&#x5728;&#x591A;&#x4E2A;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x51C6;&#x5BF9;&#x4E0D;&#x540C;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x4EE3;&#x7801;&#x3002; &#x4EE5; <a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">isomorphic-fetch</a> &#x4E3A;&#x4F8B;&#xFF0C;&#x5B83;&#x662F; fetch API &#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x53EF;&#x540C;&#x65F6;&#x7528;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x548C; Node.js &#x73AF;&#x5883;&#x3002; &#x5B83;&#x7684; <code>package.json</code> &#x4E2D;&#x5C31;&#x6709;2&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x5B57;&#x6BB5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;browser&quot;: &quot;fetch-npm-browserify.js&quot;,
  &quot;main&quot;: &quot;fetch-npm-node.js&quot;
}   
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;browser&quot;</span>: <span class="hljs-string">&quot;fetch-npm-browserify.js&quot;</span>,
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;fetch-npm-node.js&quot;</span>
}   
</code></pre>
<blockquote>
<code>isomorphic-fetch</code> &#x5728;&#x4E0D;&#x540C;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E0B;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x56E0;&#x4E3A; fetch API &#x7684;&#x5B9E;&#x73B0;&#x673A;&#x5236;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x901A;&#x8FC7;&#x539F;&#x751F;&#x7684; <code>fetch</code> &#x6216;&#x8005; <code>XMLHttpRequest</code> &#x5B9E;&#x73B0;&#xFF0C;&#x5728; Node.js &#x4E2D;&#x901A;&#x8FC7; <code>http</code> &#x6A21;&#x5757;&#x5B9E;&#x73B0;&#x3002;</blockquote>
<p><code>resolve.mainFields</code> &#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x548C;&#x5F53;&#x524D;&#x7684; <code>target</code> &#x914D;&#x7F6E;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>&#x5F53; <code>target</code> &#x4E3A; <code>web</code> &#x6216;&#x8005; <code>webworker</code> &#x65F6;&#xFF0C;&#x503C;&#x662F; <code>[&quot;browser&quot;, &quot;module&quot;, &quot;main&quot;]</code>
</li>
<li>&#x5F53; <code>target</code> &#x4E3A;&#x5176;&#x5B83;&#x60C5;&#x51B5;&#x65F6;&#xFF0C;&#x503C;&#x662F; <code>[&quot;module&quot;, &quot;main&quot;]</code>
</li>
</ul>
<p>&#x4EE5; <code>target</code> &#x7B49;&#x4E8E; web &#x4E3A;&#x4F8B;&#xFF0C;Webpack &#x4F1A;&#x5148;&#x91C7;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4E2D;&#x7684; <code>browser</code> &#x5B57;&#x6BB5;&#x53BB;&#x5BFB;&#x627E;&#x6A21;&#x5757;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x91C7;&#x7528; <code>module</code> &#x5B57;&#x6BB5;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;</p>
<p>&#x4E3A;&#x4E86;&#x51CF;&#x5C11;&#x641C;&#x7D22;&#x6B65;&#x9AA4;&#xFF0C;&#x5728;&#x4F60;&#x660E;&#x786E;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x5B57;&#x6BB5;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x628A;&#x5B83;&#x8BBE;&#x7F6E;&#x7684;&#x5C3D;&#x91CF;&#x5C11;&#x3002; &#x7531;&#x4E8E;&#x5927;&#x591A;&#x6570;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x90FD;&#x91C7;&#x7528; <code>main</code> &#x5B57;&#x6BB5;&#x53BB;&#x63CF;&#x8FF0;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x914D;&#x7F6E; Webpack&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // &#x53EA;&#x91C7;&#x7528; main &#x5B57;&#x6BB5;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x5B57;&#x6BB5;&#xFF0C;&#x4EE5;&#x51CF;&#x5C11;&#x641C;&#x7D22;&#x6B65;&#x9AA4;
    mainFields: [&apos;main&apos;],
  },
};   
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x53EA;&#x91C7;&#x7528; main &#x5B57;&#x6BB5;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x5B57;&#x6BB5;&#xFF0C;&#x4EE5;&#x51CF;&#x5C11;&#x641C;&#x7D22;&#x6B65;&#x9AA4;</span>
    mainFields: [<span class="hljs-string">&apos;main&apos;</span>],
  },
};   
</code></pre>
<blockquote>&#x4F7F;&#x7528;&#x672C;&#x65B9;&#x6CD5;&#x4F18;&#x5316;&#x65F6;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x8003;&#x8651;&#x5230;&#x6240;&#x6709;&#x8FD0;&#x884C;&#x65F6;&#x4F9D;&#x8D56;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x5B57;&#x6BB5;&#xFF0C;&#x5C31;&#x7B97;&#x6709;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x641E;&#x9519;&#x4E86;&#x90FD;&#x53EF;&#x80FD;&#x4F1A;&#x9020;&#x6210;&#x6784;&#x5EFA;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x3002;</blockquote>
<h2 id="articleHeader7">&#x4F18;&#x5316; <code>resolve.alias</code> &#x914D;&#x7F6E;</h2>
<p><code>resolve.alias</code> &#x914D;&#x7F6E;&#x9879;&#x901A;&#x8FC7;&#x522B;&#x540D;&#x6765;&#x628A;&#x539F;&#x5BFC;&#x5165;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BFC;&#x5165;&#x8DEF;&#x5F84;&#x3002;</p>
<p>&#x5728;&#x5B9E;&#x6218;&#x9879;&#x76EE;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x4F9D;&#x8D56;&#x4E00;&#x4E9B;&#x5E9E;&#x5927;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#xFF0C;&#x4EE5; React &#x5E93;&#x4E3A;&#x4F8B;&#xFF0C;&#x5B89;&#x88C5;&#x5230; <code>node_modules</code> &#x76EE;&#x5F55;&#x4E0B;&#x7684; React &#x5E93;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; dist
&#x2502;   &#x251C;&#x2500;&#x2500; react.js
&#x2502;   &#x2514;&#x2500;&#x2500; react.min.js
&#x251C;&#x2500;&#x2500; lib
&#x2502;   ... &#x8FD8;&#x6709;&#x51E0;&#x5341;&#x4E2A;&#x6587;&#x4EF6;&#x88AB;&#x5FFD;&#x7565;
&#x2502;   &#x251C;&#x2500;&#x2500; LinkedStateMixin.js
&#x2502;   &#x251C;&#x2500;&#x2500; createClass.js
&#x2502;   &#x2514;&#x2500;&#x2500; React.js
&#x251C;&#x2500;&#x2500; package.json
&#x2514;&#x2500;&#x2500; react.js
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; dist
&#x2502;   &#x251C;&#x2500;&#x2500; react<span class="hljs-selector-class">.js</span>
&#x2502;   &#x2514;&#x2500;&#x2500; react<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; lib
&#x2502;   ... &#x8FD8;&#x6709;&#x51E0;&#x5341;&#x4E2A;&#x6587;&#x4EF6;&#x88AB;&#x5FFD;&#x7565;
&#x2502;   &#x251C;&#x2500;&#x2500; LinkedStateMixin<span class="hljs-selector-class">.js</span>
&#x2502;   &#x251C;&#x2500;&#x2500; createClass<span class="hljs-selector-class">.js</span>
&#x2502;   &#x2514;&#x2500;&#x2500; React<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x2514;&#x2500;&#x2500; react<span class="hljs-selector-class">.js</span>
</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x53D1;&#x5E03;&#x51FA;&#x53BB;&#x7684; React &#x5E93;&#x4E2D;&#x5305;&#x542B;&#x4E24;&#x5957;&#x4EE3;&#x7801;&#xFF1A;</p>
<ul>
<li>&#x4E00;&#x5957;&#x662F;&#x91C7;&#x7528; CommonJS &#x89C4;&#x8303;&#x7684;&#x6A21;&#x5757;&#x5316;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x90FD;&#x653E;&#x5728; <code>lib</code> &#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x4EE5; <code>package.json</code> &#x4E2D;&#x6307;&#x5B9A;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6; <code>react.js</code> &#x4E3A;&#x6A21;&#x5757;&#x7684;&#x5165;&#x53E3;&#x3002;</li>
<li>&#x4E00;&#x5957;&#x662F;&#x628A; React &#x6240;&#x6709;&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x6253;&#x5305;&#x597D;&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x3002;&#x5176;&#x4E2D; <code>dist/react.js</code> &#x662F;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x68C0;&#x67E5;&#x548C;&#x8B66;&#x544A;&#x7684;&#x4EE3;&#x7801;&#x3002;<code>dist/react.min.js</code> &#x662F;&#x7528;&#x4E8E;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#xFF0C;&#x88AB;&#x6700;&#x5C0F;&#x5316;&#x4E86;&#x3002;</li>
</ul>
<p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B; Webpack &#x4F1A;&#x4ECE;&#x5165;&#x53E3;&#x6587;&#x4EF6; <code>./node_modules/react/react.js</code> &#x5F00;&#x59CB;&#x9012;&#x5F52;&#x7684;&#x89E3;&#x6790;&#x548C;&#x5904;&#x7406;&#x4F9D;&#x8D56;&#x7684;&#x51E0;&#x5341;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4F1A;&#x65F6;&#x4E00;&#x4E2A;&#x8017;&#x65F6;&#x7684;&#x64CD;&#x4F5C;&#x3002; &#x901A;&#x8FC7;&#x914D;&#x7F6E; <code>resolve.alias</code> &#x53EF;&#x4EE5;&#x8BA9; Webpack &#x5728;&#x5904;&#x7406; React &#x5E93;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5355;&#x72EC;&#x5B8C;&#x6574;&#x7684; <code>react.min.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x4ECE;&#x800C;&#x8DF3;&#x8FC7;&#x8017;&#x65F6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x64CD;&#x4F5C;&#x3002;</p>
<p>&#x76F8;&#x5173; Webpack &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // &#x4F7F;&#x7528; alias &#x628A;&#x5BFC;&#x5165; react &#x7684;&#x8BED;&#x53E5;&#x6362;&#x6210;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5355;&#x72EC;&#x5B8C;&#x6574;&#x7684; react.min.js &#x6587;&#x4EF6;&#xFF0C;
    // &#x51CF;&#x5C11;&#x8017;&#x65F6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x64CD;&#x4F5C;
    alias: {
      &apos;react&apos;: path.resolve(__dirname, &apos;./node_modules/react/dist/react.min.js&apos;),
    }
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">module</span>.exports = {
  resolve: {
    <span class="hljs-comment">// &#x4F7F;&#x7528; alias &#x628A;&#x5BFC;&#x5165; react &#x7684;&#x8BED;&#x53E5;&#x6362;&#x6210;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5355;&#x72EC;&#x5B8C;&#x6574;&#x7684; react.min.js &#x6587;&#x4EF6;&#xFF0C;</span>
    <span class="hljs-comment">// &#x51CF;&#x5C11;&#x8017;&#x65F6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x64CD;&#x4F5C;</span>
    <span class="hljs-keyword">alias</span>: {
      <span class="hljs-string">&apos;react&apos;</span>: path.resolve(<span class="hljs-number">__</span>dirname, <span class="hljs-string">&apos;./node_modules/react/dist/react.min.js&apos;</span>),
    }
  },
};
</code></pre>
<blockquote>
<p>&#x9664;&#x4E86; React &#x5E93;&#x5916;&#xFF0C;&#x5927;&#x591A;&#x6570;&#x5E93;&#x53D1;&#x5E03;&#x5230; Npm &#x4ED3;&#x5E93;&#x4E2D;&#x65F6;&#x90FD;&#x4F1A;&#x5305;&#x542B;&#x6253;&#x5305;&#x597D;&#x7684;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#xFF0C;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x5E93;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x5BF9;&#x5B83;&#x4EEC;&#x914D;&#x7F6E; <code>alias</code>&#x3002;</p>
<p>&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x6709;&#x4E9B;&#x5E93;&#x4F7F;&#x7528;&#x672C;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x540E;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x540E;&#x9762;&#x8981;&#x8BB2;&#x7684;&#x4F7F;&#x7528; <code>Tree-Shaking</code> &#x53BB;&#x9664;&#x65E0;&#x6548;&#x4EE3;&#x7801;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x6253;&#x5305;&#x597D;&#x7684;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#x4E2D;&#x6709;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x53EF;&#x80FD;&#x6C38;&#x8FDC;&#x7528;&#x4E0D;&#x4E0A;&#x3002; &#x4E00;&#x822C;&#x5BF9;&#x6574;&#x4F53;&#x6027;&#x6BD4;&#x8F83;&#x5F3A;&#x7684;&#x5E93;&#x91C7;&#x7528;&#x672C;&#x65B9;&#x6CD5;&#x4F18;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x5B8C;&#x6574;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#xFF0C;&#x6BCF;&#x4E00;&#x884C;&#x90FD;&#x662F;&#x4E0D;&#x53EF;&#x6216;&#x7F3A;&#x7684;&#x3002; &#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x7C7B;&#x7684;&#x5E93;&#xFF0C;&#x4F8B;&#x5982; <code>lodash</code>&#xFF0C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x53EF;&#x80FD;&#x53EA;&#x7528;&#x5230;&#x4E86;&#x5176;&#x4E2D;&#x51E0;&#x4E2A;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF0C;&#x4F60;&#x5C31;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x672C;&#x65B9;&#x6CD5;&#x53BB;&#x4F18;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x4F60;&#x7684;&#x8F93;&#x51FA;&#x4EE3;&#x7801;&#x4E2D;&#x5305;&#x542B;&#x5F88;&#x591A;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
</blockquote>
<h2 id="articleHeader8">&#x4F18;&#x5316; <code>resolve.extensions</code> &#x914D;&#x7F6E;</h2>
<p>&#x5728;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x6CA1;&#x5E26;&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x65F6;&#xFF0C;Webpack &#x4F1A;&#x81EA;&#x52A8;&#x5E26;&#x4E0A;&#x540E;&#x7F00;&#x540E;&#x53BB;&#x5C1D;&#x8BD5;&#x8BE2;&#x95EE;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;&#x3002;<code>resolve.extensions</code> &#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x5728;&#x5C1D;&#x8BD5;&#x8FC7;&#x7A0B;&#x4E2D;&#x7528;&#x5230;&#x7684;&#x540E;&#x7F00;&#x5217;&#x8868;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions: [&apos;.js&apos;, &apos;.json&apos;]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">extensions:</span> [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>]
</code></pre>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5F53;&#x9047;&#x5230; <code>require(&apos;./data&apos;)</code> &#x8FD9;&#x6837;&#x7684;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x65F6;&#xFF0C;Webpack &#x4F1A;&#x5148;&#x53BB;&#x5BFB;&#x627E; <code>./data.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x6587;&#x4EF6;&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x53BB;&#x5BFB;&#x627E; <code>./data.json</code> &#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x662F;&#x627E;&#x4E0D;&#x5230;&#x5C31;&#x62A5;&#x9519;&#x3002;    </p>
<p>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x5217;&#x8868;&#x8D8A;&#x957F;&#xFF0C;&#x6216;&#x8005;&#x6B63;&#x786E;&#x7684;&#x540E;&#x7F00;&#x5728;&#x8D8A;&#x540E;&#x9762;&#xFF0C;&#x5C31;&#x4F1A;&#x9020;&#x6210;&#x5C1D;&#x8BD5;&#x7684;&#x6B21;&#x6570;&#x8D8A;&#x591A;&#xFF0C;&#x6240;&#x4EE5; <code>resolve.extensions</code> &#x7684;&#x914D;&#x7F6E;&#x4E5F;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x6784;&#x5EFA;&#x7684;&#x6027;&#x80FD;&#x3002; &#x5728;&#x914D;&#x7F6E; <code>resolve.extensions</code> &#x65F6;&#x4F60;&#x9700;&#x8981;&#x9075;&#x5B88;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF0C;&#x4EE5;&#x505A;&#x5230;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x4F18;&#x5316;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#xFF1A;</p>
<ul>
<li>&#x540E;&#x7F00;&#x5C1D;&#x8BD5;&#x5217;&#x8868;&#x8981;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x5C0F;&#xFF0C;&#x4E0D;&#x8981;&#x628A;&#x9879;&#x76EE;&#x4E2D;&#x4E0D;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x7684;&#x60C5;&#x51B5;&#x5199;&#x5230;&#x540E;&#x7F00;&#x5C1D;&#x8BD5;&#x5217;&#x8868;&#x4E2D;&#x3002;</li>
<li>&#x9891;&#x7387;&#x51FA;&#x73B0;&#x6700;&#x9AD8;&#x7684;&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x8981;&#x4F18;&#x5148;&#x653E;&#x5728;&#x6700;&#x524D;&#x9762;&#xFF0C;&#x4EE5;&#x505A;&#x5230;&#x5C3D;&#x5FEB;&#x7684;&#x9000;&#x51FA;&#x5BFB;&#x627E;&#x8FC7;&#x7A0B;&#x3002;</li>
<li>&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x5199;&#x5BFC;&#x5165;&#x8BED;&#x53E5;&#x65F6;&#xFF0C;&#x8981;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x5E26;&#x4E0A;&#x540E;&#x7F00;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x5BFB;&#x627E;&#x8FC7;&#x7A0B;&#x3002;&#x4F8B;&#x5982;&#x5728;&#x4F60;&#x786E;&#x5B9A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x628A; <code>require(&apos;./data&apos;) &#x5199;&#x6210; require(&apos;./data.json&apos;)</code>&#x3002;</li>
</ul>
<p>&#x76F8;&#x5173; Webpack &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // &#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x51CF;&#x5C11;&#x540E;&#x7F00;&#x5C1D;&#x8BD5;&#x7684;&#x53EF;&#x80FD;&#x6027;
    extensions: [&apos;js&apos;],
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x51CF;&#x5C11;&#x540E;&#x7F00;&#x5C1D;&#x8BD5;&#x7684;&#x53EF;&#x80FD;&#x6027;</span>
    extensions: [<span class="hljs-string">&apos;js&apos;</span>],
  },
};
</code></pre>
<h2 id="articleHeader9">&#x4F18;&#x5316; <code>module.noParse</code> &#x914D;&#x7F6E;</h2>
<p><code>module.noParse</code> &#x914D;&#x7F6E;&#x9879;&#x53EF;&#x4EE5;&#x8BA9; Webpack &#x5FFD;&#x7565;&#x5BF9;&#x90E8;&#x5206;&#x6CA1;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#x7684;&#x6587;&#x4EF6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x597D;&#x5904;&#x662F;&#x80FD;&#x63D0;&#x9AD8;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#x3002; &#x539F;&#x56E0;&#x662F;&#x4E00;&#x4E9B;&#x5E93;&#xFF0C;&#x4F8B;&#x5982; jQuery &#x3001;ChartJS&#xFF0C; &#x5B83;&#x4EEC;&#x5E9E;&#x5927;&#x53C8;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#x6807;&#x51C6;&#xFF0C;&#x8BA9; Webpack &#x53BB;&#x89E3;&#x6790;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x8017;&#x65F6;&#x53C8;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#x3002;</p>
<p>&#x5728;&#x4E0A;&#x9762;&#x7684; &#x4F18;&#x5316; <code>resolve.alias </code>&#x914D;&#x7F6E; &#x4E2D;&#x8BB2;&#x5230;&#x5355;&#x72EC;&#x5B8C;&#x6574;&#x7684; <code>react.min.js</code> &#x6587;&#x4EF6;&#x5C31;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x901A;&#x8FC7;&#x914D;&#x7F6E; <code>module.noParse</code> &#x5FFD;&#x7565;&#x5BF9; <code>react.min.js</code> &#x6587;&#x4EF6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x5904;&#x7406;&#xFF0C; &#x76F8;&#x5173; Webpack &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);

module.exports = {
  module: {
    // &#x72EC;&#x5B8C;&#x6574;&#x7684; `react.min.js` &#x6587;&#x4EF6;&#x5C31;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x5FFD;&#x7565;&#x5BF9; `react.min.js` &#x6587;&#x4EF6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x5904;&#x7406;
    noParse: [/react\.min\.js$/],
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    <span class="hljs-comment">// &#x72EC;&#x5B8C;&#x6574;&#x7684; `react.min.js` &#x6587;&#x4EF6;&#x5C31;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x5FFD;&#x7565;&#x5BF9; `react.min.js` &#x6587;&#x4EF6;&#x7684;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x5904;&#x7406;</span>
    noParse: [<span class="hljs-regexp">/react\.min\.js$/</span>],
  },
};
</code></pre>
<blockquote>&#x6CE8;&#x610F;&#x88AB;&#x5FFD;&#x7565;&#x6389;&#x7684;&#x6587;&#x4EF6;&#x91CC;&#x4E0D;&#x5E94;&#x8BE5;&#x5305;&#x542B; <code>import</code> &#x3001; <code>require</code> &#x3001; <code>define</code> &#x7B49;&#x6A21;&#x5757;&#x5316;&#x8BED;&#x53E5;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x5BFC;&#x81F4;&#x6784;&#x5EFA;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x5305;&#x542B;&#x65E0;&#x6CD5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E0B;&#x6267;&#x884C;&#x7684;&#x6A21;&#x5757;&#x5316;&#x8BED;&#x53E5;&#x3002;</blockquote>
<p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6240;&#x6709;&#x548C;&#x7F29;&#x5C0F;&#x6587;&#x4EF6;&#x641C;&#x7D22;&#x8303;&#x56F4;&#x76F8;&#x5173;&#x7684;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x4E86;&#xFF0C;&#x5728;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x7684;&#x9700;&#x8981;&#x53BB;&#x6309;&#x7167;&#x4EE5;&#x4E0A;&#x65B9;&#x6CD5;&#x6539;&#x9020;&#x540E;&#xFF0C;&#x4F60;&#x7684;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x4E00;&#x5B9A;&#x4F1A;&#x6709;&#x6240;&#x63D0;&#x5347;&#x3002;</p>
<h1 id="articleHeader10">&#x4F7F;&#x7528; DllPlugin</h1>
<p>&#x8981;&#x7ED9; Web &#x9879;&#x76EE;&#x6784;&#x5EFA;&#x63A5;&#x5165;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x9700;&#x8981;&#x5B8C;&#x6210;&#x4EE5;&#x4E0B;&#x4E8B;&#x60C5;&#xFF1A;</p>
<ul>
<li>&#x628A;&#x7F51;&#x9875;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x6A21;&#x5757;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#xFF0C;&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x53BB;&#x3002;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x3002;</li>
<li>&#x5F53;&#x9700;&#x8981;&#x5BFC;&#x5165;&#x7684;&#x6A21;&#x5757;&#x5B58;&#x5728;&#x4E8E;&#x67D0;&#x4E2A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x4E0D;&#x80FD;&#x88AB;&#x518D;&#x6B21;&#x88AB;&#x6253;&#x5305;&#xFF0C;&#x800C;&#x662F;&#x53BB;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x83B7;&#x53D6;&#x3002;</li>
<li>&#x5F53;&#x9700;&#x8981;&#x5BFC;&#x5165;&#x7684;&#x6A21;&#x5757;&#x5B58;&#x5728;&#x4E8E;&#x67D0;&#x4E2A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x4E0D;&#x80FD;&#x88AB;&#x518D;&#x6B21;&#x88AB;&#x6253;&#x5305;&#xFF0C;&#x800C;&#x662F;&#x53BB;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x83B7;&#x53D6;&#x3002;</li>
</ul>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x7ED9; Web &#x9879;&#x76EE;&#x6784;&#x5EFA;&#x63A5;&#x5165;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x7684;&#x601D;&#x60F3;&#x540E;&#xFF0C;&#x4F1A;&#x5927;&#x5927;&#x63D0;&#x5347;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x5462;&#xFF1F; &#x539F;&#x56E0;&#x5728;&#x4E8E;&#x5305;&#x542B;&#x5927;&#x91CF;&#x590D;&#x7528;&#x6A21;&#x5757;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x53EA;&#x9700;&#x8981;&#x7F16;&#x8BD1;&#x4E00;&#x6B21;&#xFF0C;&#x5728;&#x4E4B;&#x540E;&#x7684;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x88AB;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x5305;&#x542B;&#x7684;&#x6A21;&#x5757;&#x5C06;&#x4E0D;&#x4F1A;&#x5728;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002; &#x7531;&#x4E8E;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x5927;&#x591A;&#x6570;&#x5305;&#x542B;&#x7684;&#x662F;&#x5E38;&#x7528;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#xFF0C;&#x4F8B;&#x5982; <code>react</code>&#x3001;<code>react-dom</code>&#xFF0C;&#x53EA;&#x8981;&#x4E0D;&#x5347;&#x7EA7;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x5C31;&#x4E0D;&#x7528;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x3002;</p>
<h2 id="articleHeader11">&#x63A5;&#x5165; Webpack</h2>
<p>Webpack &#x5DF2;&#x7ECF;&#x5185;&#x7F6E;&#x4E86;&#x5BF9;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;2&#x4E2A;&#x5185;&#x7F6E;&#x7684;&#x63D2;&#x4EF6;&#x63A5;&#x5165;&#xFF0C;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ul>
<li>DllPlugin &#x63D2;&#x4EF6;&#xFF1A;&#x7528;&#x4E8E;&#x6253;&#x5305;&#x51FA;&#x4E00;&#x4E2A;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x3002;</li>
<li>DllReferencePlugin &#x63D2;&#x4EF6;&#xFF1A;&#x7528;&#x4E8E;&#x5728;&#x4E3B;&#x8981;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x53BB;&#x5F15;&#x5165; DllPlugin &#x63D2;&#x4EF6;&#x6253;&#x5305;&#x597D;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x3002;</li>
</ul>
<p>&#x4E0B;&#x9762;&#x4EE5;&#x57FA;&#x672C;&#x7684; React &#x9879;&#x76EE;&#x4E3A;&#x4F8B;&#xFF0C;&#x4E3A;&#x5176;&#x63A5;&#x5165; DllPlugin&#xFF0C;&#x5728;&#x5F00;&#x59CB;&#x524D;&#x5148;&#x6765;&#x770B;&#x4E0B;&#x6700;&#x7EC8;&#x6784;&#x5EFA;&#x51FA;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; main.js
&#x251C;&#x2500;&#x2500; polyfill.dll.js
&#x251C;&#x2500;&#x2500; polyfill.manifest.json
&#x251C;&#x2500;&#x2500; react.dll.js
&#x2514;&#x2500;&#x2500; react.manifest.json
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; main<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; polyfill<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; polyfill<span class="hljs-selector-class">.manifest</span><span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; react<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span>
&#x2514;&#x2500;&#x2500; react<span class="hljs-selector-class">.manifest</span><span class="hljs-selector-class">.json</span>
</code></pre>
<p>&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ul>
<li>
<code>polyfill.dll.js</code> &#x91CC;&#x9762;&#x5305;&#x542B;&#x9879;&#x76EE;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684; <code>polyfill</code>&#xFF0C;&#x4F8B;&#x5982; Promise&#x3001;fetch &#x7B49; API&#x3002;</li>
<li>
<code>react.dll.js</code> &#x91CC;&#x9762;&#x5305;&#x542B; React &#x7684;&#x57FA;&#x7840;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; <code>react</code> &#x548C; <code>react-dom</code> &#x6A21;&#x5757;&#x3002;</li>
</ul>
<p>&#x4EE5; <code>react.dll.js</code> &#x6587;&#x4EF6;&#x4E3A;&#x4F8B;&#xFF0C;&#x5176;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _dll_react = (function(modules) {
  // ... &#x6B64;&#x5904;&#x7701;&#x7565; webpackBootstrap &#x51FD;&#x6570;&#x4EE3;&#x7801;
}([
  function(module, exports, __webpack_require__) {
    // &#x6A21;&#x5757; ID &#x4E3A; 0 &#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;
  },
  function(module, exports, __webpack_require__) {
    // &#x6A21;&#x5757; ID &#x4E3A; 1 &#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;
  },
  // ... &#x6B64;&#x5904;&#x7701;&#x7565;&#x5269;&#x4E0B;&#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801; 
]));
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> _dll_react = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(modules)</span> </span>{
  <span class="hljs-comment">// ... &#x6B64;&#x5904;&#x7701;&#x7565; webpackBootstrap &#x51FD;&#x6570;&#x4EE3;&#x7801;</span>
}([
  <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports, __webpack_require__)</span> </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757; ID &#x4E3A; 0 &#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;</span>
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports, __webpack_require__)</span> </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757; ID &#x4E3A; 1 &#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;</span>
  },
  <span class="hljs-comment">// ... &#x6B64;&#x5904;&#x7701;&#x7565;&#x5269;&#x4E0B;&#x7684;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801; </span>
]));
</code></pre>
<p>&#x53EF;&#x89C1;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x5927;&#x91CF;&#x6A21;&#x5757;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;&#x5B58;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x91CC;&#xFF0C;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;&#x53F7;&#x4F5C;&#x4E3A; ID&#x3002; &#x5E76;&#x4E14;&#x8FD8;&#x901A;&#x8FC7; <code>_dll_react</code> &#x53D8;&#x91CF;&#x628A;&#x81EA;&#x5DF1;&#x66B4;&#x9732;&#x5728;&#x4E86;&#x5168;&#x5C40;&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>window._dll_react</code> &#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x5B83;&#x91CC;&#x9762;&#x5305;&#x542B;&#x7684;&#x6A21;&#x5757;&#x3002;    </p>
<p>&#x5176;&#x4E2D; <code>polyfill.manifest.json</code> &#x548C; <code>react.manifest.json</code> &#x6587;&#x4EF6;&#x4E5F;&#x662F;&#x7531; DllPlugin &#x751F;&#x6210;&#x51FA;&#xFF0C;&#x7528;&#x4E8E;&#x63CF;&#x8FF0;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x4E2D;&#x5305;&#x542B;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#xFF0C; &#x4EE5; <code>react.manifest.json</code> &#x6587;&#x4EF6;&#x4E3A;&#x4F8B;&#xFF0C;&#x5176;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;565&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;GdVvmZ&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;react.manifest.json&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/GdVvmZ/" rel="nofollow noreferrer" target="_blank">react.manifest.json</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/GdVvmZ/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x53EF;&#x89C1; <code>manifest.json</code> &#x6587;&#x4EF6;&#x6E05;&#x695A;&#x5730;&#x63CF;&#x8FF0;&#x4E86;&#x4E0E;&#x5176;&#x5BF9;&#x5E94;&#x7684; <code>dll.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x4EE5;&#x53CA;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x8DEF;&#x5F84;&#x548C; ID&#x3002;</p>
<p><code>main.js</code> &#x6587;&#x4EF6;&#x662F;&#x7F16;&#x8BD1;&#x51FA;&#x6765;&#x7684;&#x6267;&#x884C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x5F53;&#x9047;&#x5230;&#x5176;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#x5728; <code>dll.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x65F6;&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x901A;&#x8FC7; <code>dll.js</code> &#x6587;&#x4EF6;&#x66B4;&#x9732;&#x51FA;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x53BB;&#x83B7;&#x53D6;&#x6253;&#x5305;&#x5728; <code>dll.js</code> &#x6587;&#x4EF6;&#x7684;&#x6A21;&#x5757;&#x3002; &#x6240;&#x4EE5;&#x5728; <code>index.html</code> &#x6587;&#x4EF6;&#x4E2D;&#x9700;&#x8981;&#x628A;&#x4F9D;&#x8D56;&#x7684;&#x4E24;&#x4E2A; <code>dll.js</code> &#x6587;&#x4EF6;&#x7ED9;&#x52A0;&#x8F7D;&#x8FDB;&#x53BB;&#xFF0C;<code>index.html</code> &#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;!--&#x5BFC;&#x5165;&#x4F9D;&#x8D56;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;--&gt;
&lt;script src=&quot;./dist/polyfill.dll.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;./dist/react.dll.js&quot;&gt;&lt;/script&gt;
&lt;!--&#x5BFC;&#x5165;&#x6267;&#x884C;&#x5165;&#x53E3;&#x6587;&#x4EF6;--&gt;
&lt;script src=&quot;./dist/main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x5BFC;&#x5165;&#x4F9D;&#x8D56;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/polyfill.dll.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/react.dll.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x5BFC;&#x5165;&#x6267;&#x884C;&#x5165;&#x53E3;&#x6587;&#x4EF6;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6240;&#x6709;&#x63A5;&#x5165; DllPlugin &#x540E;&#x6700;&#x7EC8;&#x7F16;&#x8BD1;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x3002;</p>
<h2 id="articleHeader12">&#x6784;&#x5EFA;&#x51FA;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;</h2>
<p>&#x6784;&#x5EFA;&#x8F93;&#x51FA;&#x7684;&#x4EE5;&#x4E0B;&#x8FD9;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; polyfill.dll.js
&#x251C;&#x2500;&#x2500; polyfill.manifest.json
&#x251C;&#x2500;&#x2500; react.dll.js
&#x2514;&#x2500;&#x2500; react.manifest.json
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; polyfill<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; polyfill<span class="hljs-selector-class">.manifest</span><span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; react<span class="hljs-selector-class">.dll</span><span class="hljs-selector-class">.js</span>
&#x2514;&#x2500;&#x2500; react<span class="hljs-selector-class">.manifest</span><span class="hljs-selector-class">.json</span>
</code></pre>
<p>&#x548C;&#x4EE5;&#x4E0B;&#x8FD9;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; main.js
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; main<span class="hljs-selector-class">.js</span>
</code></pre>
<p>&#x662F;&#x7531;&#x4E24;&#x4EFD;&#x4E0D;&#x540C;&#x7684;&#x6784;&#x5EFA;&#x5206;&#x522B;&#x8F93;&#x51FA;&#x7684;&#x3002;</p>
<p>&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x7531;&#x4E00;&#x4EFD;&#x72EC;&#x7ACB;&#x7684;&#x6784;&#x5EFA;&#x8F93;&#x51FA;&#xFF0C;&#x7528;&#x4E8E;&#x7ED9;&#x4E3B;&#x6784;&#x5EFA;&#x4F7F;&#x7528;&#x3002;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>webpack_dll.config.js</code> &#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x6784;&#x5EFA;&#x5B83;&#x4EEC;&#xFF0C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;665&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;MGNvrB&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;webpack_dll.config.js&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/MGNvrB/" rel="nofollow noreferrer" target="_blank">webpack_dll.config.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/MGNvrB/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<h2 id="articleHeader13">&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;</h2>
<p>&#x6784;&#x5EFA;&#x51FA;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x6587;&#x4EF6;&#x7528;&#x4E8E;&#x7ED9;&#x5176;&#x5B83;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x4E5F;&#x5C31;&#x662F;&#x7ED9;&#x6267;&#x884C;&#x5165;&#x53E3;&#x4F7F;&#x7528;&#x3002;</p>
<p>&#x7528;&#x4E8E;&#x8F93;&#x51FA; <code>main.js</code> &#x7684;&#x4E3B; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;720&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;GdVvxj&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;main.js&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/GdVvxj/" rel="nofollow noreferrer" target="_blank">main.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/GdVvxj/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x5728; <code>webpack_dll.config.js</code> &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;DllPlugin &#x4E2D;&#x7684; <code>name</code> &#x53C2;&#x6570;&#x5FC5;&#x987B;&#x548C; <code>output.library</code> &#x4E2D;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002; &#x539F;&#x56E0;&#x5728;&#x4E8E; DllPlugin &#x4E2D;&#x7684; <code>name</code> &#x53C2;&#x6570;&#x4F1A;&#x5F71;&#x54CD;&#x8F93;&#x51FA;&#x7684; <code>manifest.json</code> &#x6587;&#x4EF6;&#x4E2D; <code>name</code> &#x5B57;&#x6BB5;&#x7684;&#x503C;&#xFF0C; &#x800C;&#x5728; <code>webpack.config.js</code> &#x6587;&#x4EF6;&#x4E2D; DllReferencePlugin &#x4F1A;&#x53BB; <code>manifest.json</code> &#x6587;&#x4EF6;&#x8BFB;&#x53D6; <code>name</code> &#x5B57;&#x6BB5;&#x7684;&#x503C;&#xFF0C; &#x628A;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x4F5C;&#x4E3A;&#x5728;&#x4ECE;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E2D;&#x83B7;&#x53D6;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x4E2D;&#x5185;&#x5BB9;&#x65F6;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x540D;&#x3002;</blockquote>
<h2 id="articleHeader14">&#x6267;&#x884C;&#x6784;&#x5EFA;</h2>
<p>&#x5728;&#x4FEE;&#x6539;&#x597D;&#x4EE5;&#x4E0A;&#x4E24;&#x4E2A; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#x3002; &#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#x65F6;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x9700;&#x8981;&#x5148;&#x628A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x51FA;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x4E3B; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; DllReferencePlugin &#x4F9D;&#x8D56;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x3002;</p>
<p>&#x6267;&#x884C;&#x6784;&#x5EFA;&#x65F6;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p>
<ol>
<li>&#x5982;&#x679C;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#x8FD8;&#x6CA1;&#x6709;&#x7F16;&#x8BD1;&#x51FA;&#x6765;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x5148;&#x628A;&#x5B83;&#x4EEC;&#x7F16;&#x8BD1;&#x51FA;&#x6765;&#x3002;&#x65B9;&#x6CD5;&#x662F;&#x6267;&#x884C; <code>webpack --config webpack_dll.config.js</code> &#x547D;&#x4EE4;&#x3002;</li>
<li>&#x5728;&#x786E;&#x4FDD;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x5B58;&#x5728;&#x65F6;&#xFF0C;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x7684;&#x7F16;&#x8BD1;&#x51FA;&#x5165;&#x53E3;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x3002;&#x65B9;&#x6CD5;&#x662F;&#x6267;&#x884C; webpack &#x547D;&#x4EE4;&#x3002;&#x8FD9;&#x65F6;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x6709;&#x4E86;&#x975E;&#x5E38;&#x5927;&#x7684;&#x63D0;&#x5347;&#x3002;</li>
</ol>
<h1 id="articleHeader15">&#x4F7F;&#x7528; HappyPack</h1>
<p>&#x7531;&#x4E8E;&#x6709;&#x5927;&#x91CF;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x89E3;&#x6790;&#x548C;&#x5904;&#x7406;&#xFF0C;&#x6784;&#x5EFA;&#x662F;&#x6587;&#x4EF6;&#x8BFB;&#x5199;&#x548C;&#x8BA1;&#x7B97;&#x5BC6;&#x96C6;&#x578B;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5F53;&#x6587;&#x4EF6;&#x6570;&#x91CF;&#x53D8;&#x591A;&#x540E;&#xFF0C;Webpack &#x6784;&#x5EFA;&#x6162;&#x7684;&#x95EE;&#x9898;&#x4F1A;&#x663E;&#x5F97;&#x4E25;&#x91CD;&#x3002; &#x8FD0;&#x884C;&#x5728; Node.js &#x4E4B;&#x4E0A;&#x7684; Webpack &#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x6A21;&#x578B;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4; Webpack &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x4EFB;&#x52A1;&#x9700;&#x8981;&#x4E00;&#x4EF6;&#x4EF6;&#x6328;&#x7740;&#x505A;&#xFF0C;&#x4E0D;&#x80FD;&#x591A;&#x4E2A;&#x4E8B;&#x60C5;&#x4E00;&#x8D77;&#x505A;&#x3002;</p>
<p>&#x6587;&#x4EF6;&#x8BFB;&#x5199;&#x548C;&#x8BA1;&#x7B97;&#x64CD;&#x4F5C;&#x662F;&#x65E0;&#x6CD5;&#x907F;&#x514D;&#x7684;&#xFF0C;&#x90A3;&#x80FD;&#x4E0D;&#x80FD;&#x8BA9; Webpack &#x540C;&#x4E00;&#x65F6;&#x523B;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x53D1;&#x6325;&#x591A;&#x6838; CPU &#x7535;&#x8111;&#x7684;&#x5A01;&#x529B;&#xFF0C;&#x4EE5;&#x63D0;&#x5347;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x5462;&#xFF1F;</p>
<p>HappyPack &#x5C31;&#x80FD;&#x8BA9; Webpack &#x505A;&#x5230;&#x8FD9;&#x70B9;&#xFF0C;&#x5B83;&#x628A;&#x4EFB;&#x52A1;&#x5206;&#x89E3;&#x7ED9;&#x591A;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5E76;&#x53D1;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5B50;&#x8FDB;&#x7A0B;&#x5904;&#x7406;&#x5B8C;&#x540E;&#x518D;&#x628A;&#x7ED3;&#x679C;&#x53D1;&#x9001;&#x7ED9;&#x4E3B;&#x8FDB;&#x7A0B;&#x3002;</p>
<blockquote>&#x7531;&#x4E8E; JavaScript &#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x6A21;&#x578B;&#xFF0C;&#x8981;&#x60F3;&#x53D1;&#x6325;&#x591A;&#x6838; CPU &#x7684;&#x80FD;&#x529B;&#xFF0C;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x591A;&#x8FDB;&#x7A0B;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x800C;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x591A;&#x7EBF;&#x7A0B;&#x5B9E;&#x73B0;&#x3002;</blockquote>
<p>&#x5206;&#x89E3;&#x4EFB;&#x52A1;&#x548C;&#x7BA1;&#x7406;&#x7EBF;&#x7A0B;&#x7684;&#x4E8B;&#x60C5; HappyPack &#x90FD;&#x4F1A;&#x5E2E;&#x4F60;&#x505A;&#x597D;&#xFF0C;&#x4F60;&#x6240;&#x9700;&#x8981;&#x505A;&#x7684;&#x53EA;&#x662F;&#x63A5;&#x5165; HappyPack&#x3002; &#x63A5;&#x5165; HappyPack &#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;665&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;RyXLEy&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;HappyPack &quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/RyXLEy/" rel="nofollow noreferrer" target="_blank">HappyPack </a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/RyXLEy/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x6709;&#x4E24;&#x70B9;&#x91CD;&#x8981;&#x7684;&#x4FEE;&#x6539;&#xFF1A;</p>
<ul>
<li>&#x5728; Loader &#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x90FD;&#x4EA4;&#x7ED9;&#x4E86; <code>happypack/loader</code> &#x53BB;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;&#x7D27;&#x8DDF;&#x5176;&#x540E;&#x7684; <code>querystring ?id=babel</code> &#x53BB;&#x544A;&#x8BC9; <code>happypack/loader</code> &#x53BB;&#x9009;&#x62E9;&#x54EA;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x53BB;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x3002;</li>
<li>&#x5728; Plugin &#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x65B0;&#x589E;&#x4E86;&#x4E24;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x5206;&#x522B;&#x7528;&#x4E8E;&#x544A;&#x8BC9; <code>happypack/loader</code> &#x53BB;&#x5982;&#x4F55;&#x5904;&#x7406; <code>.js </code>&#x548C; <code>.css</code> &#x6587;&#x4EF6;&#x3002;&#x9009;&#x9879;&#x4E2D;&#x7684; <code>id</code> &#x5C5E;&#x6027;&#x7684;&#x503C;&#x548C;&#x4E0A;&#x9762; <code>querystring</code> &#x4E2D;&#x7684; <code>?id=babel</code> &#x76F8;&#x5BF9;&#x5E94;&#xFF0C;&#x9009;&#x9879;&#x4E2D;&#x7684; <code>loaders</code> &#x5C5E;&#x6027;&#x548C; Loader &#x914D;&#x7F6E;&#x4E2D;&#x4E00;&#x6837;&#x3002;</li>
</ul>
<p>&#x5728;&#x5B9E;&#x4F8B;&#x5316; HappyPack &#x63D2;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x4F20;&#x5165; <code>id</code> &#x548C; <code>loaders</code> &#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x5916;&#xFF0C;HappyPack &#x8FD8;&#x652F;&#x6301;&#x5982;&#x4E0B;&#x53C2;&#x6570;&#xFF1A;</p>
<ul>
<li>
<code>threads</code> &#x4EE3;&#x8868;&#x5F00;&#x542F;&#x51E0;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5904;&#x7406;&#x8FD9;&#x4E00;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;<code>3</code>&#x4E2A;&#xFF0C;&#x7C7B;&#x578B;&#x5FC5;&#x987B;&#x662F;&#x6574;&#x6570;&#x3002;</li>
<li>
<code>verbose</code> &#x662F;&#x5426;&#x5141;&#x8BB8; HappyPack &#x8F93;&#x51FA;&#x65E5;&#x5FD7;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F; <code>true</code>&#x3002;</li>
<li>
<code>threadPool</code> &#x4EE3;&#x8868;&#x5171;&#x4EAB;&#x8FDB;&#x7A0B;&#x6C60;&#xFF0C;&#x5373;&#x591A;&#x4E2A; HappyPack &#x5B9E;&#x4F8B;&#x90FD;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x5171;&#x4EAB;&#x8FDB;&#x7A0B;&#x6C60;&#x4E2D;&#x7684;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5904;&#x7406;&#x4EFB;&#x52A1;&#xFF0C;&#x4EE5;&#x9632;&#x6B62;&#x8D44;&#x6E90;&#x5360;&#x7528;&#x8FC7;&#x591A;&#xFF0C;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</li>
</ul>
<p>&lt;p data-height=&quot;465&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;MGNERw&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;threadPool &quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/MGNERw/" rel="nofollow noreferrer" target="_blank">threadPool </a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/MGNERw/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x63A5;&#x5165; HappyPack &#x540E;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x7ED9;&#x9879;&#x76EE;&#x5B89;&#x88C5;&#x65B0;&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D happypack
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D happypack
</code></pre>
<h2 id="articleHeader16">HappyPack &#x539F;&#x7406;</h2>
<p>&#x5728;&#x6574;&#x4E2A; Webpack &#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#x4E2D;&#xFF0C;&#x6700;&#x8017;&#x65F6;&#x7684;&#x6D41;&#x7A0B;&#x53EF;&#x80FD;&#x5C31;&#x662F; Loader &#x5BF9;&#x6587;&#x4EF6;&#x7684;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x8981;&#x8F6C;&#x6362;&#x7684;&#x6587;&#x4EF6;&#x6570;&#x636E;&#x5DE8;&#x591A;&#xFF0C;&#x800C;&#x4E14;&#x8FD9;&#x4E9B;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#x90FD;&#x53EA;&#x80FD;&#x4E00;&#x4E2A;&#x4E2A;&#x6328;&#x7740;&#x5904;&#x7406;&#x3002; HappyPack &#x7684;&#x6838;&#x5FC3;&#x539F;&#x7406;&#x5C31;&#x662F;&#x628A;&#x8FD9;&#x90E8;&#x5206;&#x4EFB;&#x52A1;&#x5206;&#x89E3;&#x5230;&#x591A;&#x4E2A;&#x8FDB;&#x7A0B;&#x53BB;&#x5E76;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x5C11;&#x4E86;&#x603B;&#x7684;&#x6784;&#x5EFA;&#x65F6;&#x95F4;&#x3002;</p>
<p>&#x4ECE;&#x524D;&#x9762;&#x7684;&#x4F7F;&#x7528;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6240;&#x6709;&#x9700;&#x8981;&#x901A;&#x8FC7; Loader &#x5904;&#x7406;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x5148;&#x4EA4;&#x7ED9;&#x4E86; <code>happypack/loader</code> &#x53BB;&#x5904;&#x7406;&#xFF0C;&#x6536;&#x96C6;&#x5230;&#x4E86;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x6743;&#x540E; HappyPack &#x5C31;&#x597D;&#x7EDF;&#x4E00;&#x5206;&#x914D;&#x4E86;&#x3002;</p>
<p>&#x6BCF;&#x901A;&#x8FC7;<code> new HappyPack()</code> &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A; HappyPack &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x544A;&#x8BC9; HappyPack &#x6838;&#x5FC3;&#x8C03;&#x5EA6;&#x5668;&#x5982;&#x4F55;&#x901A;&#x8FC7;&#x4E00;&#x7CFB;&#x5217; Loader &#x53BB;&#x8F6C;&#x6362;&#x4E00;&#x7C7B;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x5982;&#x4F55;&#x7ED9;&#x8FD9;&#x7C7B;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#x5206;&#x914D;&#x5B50;&#x8FDB;&#x7A0B;&#x3002;</p>
<p>&#x6838;&#x5FC3;&#x8C03;&#x5EA6;&#x5668;&#x7684;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x5728;&#x4E3B;&#x8FDB;&#x7A0B;&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8FD0;&#x884C;&#x7740; Webpack &#x7684;&#x8FDB;&#x7A0B;&#x4E2D;&#xFF0C;&#x6838;&#x5FC3;&#x8C03;&#x5EA6;&#x5668;&#x4F1A;&#x628A;&#x4E00;&#x4E2A;&#x4E2A;&#x4EFB;&#x52A1;&#x5206;&#x914D;&#x7ED9;&#x5F53;&#x524D;&#x7A7A;&#x95F2;&#x7684;&#x5B50;&#x8FDB;&#x7A0B;&#xFF0C;&#x5B50;&#x8FDB;&#x7A0B;&#x5904;&#x7406;&#x5B8C;&#x6BD5;&#x540E;&#x628A;&#x7ED3;&#x679C;&#x53D1;&#x9001;&#x7ED9;&#x6838;&#x5FC3;&#x8C03;&#x5EA6;&#x5668;&#xFF0C;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4EA4;&#x6362;&#x662F;&#x901A;&#x8FC7;&#x8FDB;&#x7A0B;&#x95F4;&#x901A;&#x4FE1; API &#x5B9E;&#x73B0;&#x7684;&#x3002;</p>
<p>&#x6838;&#x5FC3;&#x8C03;&#x5EA6;&#x5668;&#x6536;&#x5230;&#x6765;&#x81EA;&#x5B50;&#x8FDB;&#x7A0B;&#x5904;&#x7406;&#x5B8C;&#x6BD5;&#x7684;&#x7ED3;&#x679C;&#x540E;&#x4F1A;&#x901A;&#x77E5; Webpack &#x8BE5;&#x6587;&#x4EF6;&#x5904;&#x7406;&#x5B8C;&#x6BD5;&#x3002;</p>
<h1 id="articleHeader17">&#x4F7F;&#x7528; ParallelUglifyPlugin</h1>
<p>&#x5728;&#x4F7F;&#x7528; Webpack &#x6784;&#x5EFA;&#x51FA;&#x7528;&#x4E8E;&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x90FD;&#x4F1A;&#x6709;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x8FD9;&#x4E00;&#x6D41;&#x7A0B;&#x3002; &#x6700;&#x5E38;&#x89C1;&#x7684; JavaScript &#x4EE3;&#x7801;&#x538B;&#x7F29;&#x5DE5;&#x5177;&#x662F; UglifyJS&#xFF0C;&#x5E76;&#x4E14; Webpack &#x4E5F;&#x5185;&#x7F6E;&#x4E86;&#x5B83;&#x3002;</p>
<p>&#x7528;&#x8FC7; UglifyJS &#x7684;&#x4F60;&#x4E00;&#x5B9A;&#x4F1A;&#x53D1;&#x73B0;&#x5728;&#x6784;&#x5EFA;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x5F88;&#x5FEB;&#x5C31;&#x80FD;&#x5B8C;&#x6210;&#xFF0C;&#x4F46;&#x5728;&#x6784;&#x5EFA;&#x7528;&#x4E8E;&#x7EBF;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x6784;&#x5EFA;&#x4E00;&#x76F4;&#x5361;&#x5728;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x70B9;&#x8FDF;&#x8FDF;&#x6CA1;&#x6709;&#x53CD;&#x5E94;&#xFF0C;&#x5176;&#x5B9E;&#x5361;&#x4F4F;&#x7684;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x662F;&#x5728;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x3002;</p>
<p>&#x7531;&#x4E8E;&#x538B;&#x7F29; JavaScript &#x4EE3;&#x7801;&#x9700;&#x8981;&#x5148;&#x628A;&#x4EE3;&#x7801;&#x89E3;&#x6790;&#x6210;&#x7528; Object &#x62BD;&#x8C61;&#x8868;&#x793A;&#x7684; AST &#x8BED;&#x6CD5;&#x6811;&#xFF0C;&#x518D;&#x53BB;&#x5E94;&#x7528;&#x5404;&#x79CD;&#x89C4;&#x5219;&#x5206;&#x6790;&#x548C;&#x5904;&#x7406; AST&#xFF0C;&#x5BFC;&#x81F4;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x8BA1;&#x7B97;&#x91CF;&#x5DE8;&#x5927;&#xFF0C;&#x8017;&#x65F6;&#x975E;&#x5E38;&#x591A;&#x3002;</p>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x628A;&#x5728;&#x4F7F;&#x7528; HappyPack&#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7;&#x7684;&#x591A;&#x8FDB;&#x7A0B;&#x5E76;&#x884C;&#x5904;&#x7406;&#x7684;&#x601D;&#x60F3;&#x4E5F;&#x5F15;&#x5165;&#x5230;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x4E2D;&#x5462;&#xFF1F;</p>
<p>ParallelUglifyPlugin &#x5C31;&#x505A;&#x4E86;&#x8FD9;&#x4E2A;&#x4E8B;&#x60C5;&#x3002; &#x5F53; Webpack &#x6709;&#x591A;&#x4E2A; JavaScript &#x6587;&#x4EF6;&#x9700;&#x8981;&#x8F93;&#x51FA;&#x548C;&#x538B;&#x7F29;&#x65F6;&#xFF0C;&#x539F;&#x672C;&#x4F1A;&#x4F7F;&#x7528; UglifyJS &#x53BB;&#x4E00;&#x4E2A;&#x4E2A;&#x6328;&#x7740;&#x538B;&#x7F29;&#x518D;&#x8F93;&#x51FA;&#xFF0C; &#x4F46;&#x662F; ParallelUglifyPlugin &#x5219;&#x4F1A;&#x5F00;&#x542F;&#x591A;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#xFF0C;&#x628A;&#x5BF9;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x538B;&#x7F29;&#x5DE5;&#x4F5C;&#x5206;&#x914D;&#x7ED9;&#x591A;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5B8C;&#x6210;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x5176;&#x5B9E;&#x8FD8;&#x662F;&#x901A;&#x8FC7; UglifyJS &#x53BB;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x53D8;&#x6210;&#x4E86;&#x5E76;&#x884C;&#x6267;&#x884C;&#x3002; &#x6240;&#x4EE5; ParallelUglifyPlugin &#x80FD;&#x66F4;&#x5FEB;&#x7684;&#x5B8C;&#x6210;&#x5BF9;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x538B;&#x7F29;&#x5DE5;&#x4F5C;&#x3002;</p>
<p>&#x4F7F;&#x7528; ParallelUglifyPlugin &#x4E5F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x628A;&#x539F;&#x6765; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x5185;&#x7F6E;&#x7684; UglifyJsPlugin &#x53BB;&#x6389;&#x540E;&#xFF0C;&#x518D;&#x66FF;&#x6362;&#x6210; ParallelUglifyPlugin&#xFF0C;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;585&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;BxXwgM&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;ParallelUglifyPlugin&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/BxXwgM/" rel="nofollow noreferrer" target="_blank">ParallelUglifyPlugin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/BxXwgM/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x5728;&#x901A;&#x8FC7; new ParallelUglifyPlugin() &#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#xFF0C;&#x652F;&#x6301;&#x4EE5;&#x4E0B;&#x53C2;&#x6570;&#xFF1A;</p>
<ul>
<li>
<code>test</code>&#xFF1A;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x53BB;&#x5339;&#x914D;&#x54EA;&#x4E9B;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x88AB; ParallelUglifyPlugin &#x538B;&#x7F29;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F; <code>/.js$/</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9ED8;&#x8BA4;&#x538B;&#x7F29;&#x6240;&#x6709;&#x7684; <code>.js</code> &#x6587;&#x4EF6;&#x3002;</li>
<li>
<code>include</code>&#xFF1A;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x53BB;&#x547D;&#x4E2D;&#x9700;&#x8981;&#x88AB; ParallelUglifyPlugin &#x538B;&#x7F29;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A; <code>[]</code>&#x3002;</li>
<li>
<code>exclude</code>&#xFF1A;&#x4F7F;&#x7528;&#x6B63;&#x5219;&#x53BB;&#x547D;&#x4E2D;&#x4E0D;&#x9700;&#x8981;&#x88AB; ParallelUglifyPlugin &#x538B;&#x7F29;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A; <code>[]</code>&#x3002;</li>
<li>
<code>cacheDir</code>&#xFF1A;&#x7F13;&#x5B58;&#x538B;&#x7F29;&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4E0B;&#x6B21;&#x9047;&#x5230;&#x4E00;&#x6837;&#x7684;&#x8F93;&#x5165;&#x65F6;&#x76F4;&#x63A5;&#x4ECE;&#x7F13;&#x5B58;&#x4E2D;&#x83B7;&#x53D6;&#x538B;&#x7F29;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x5E76;&#x8FD4;&#x56DE;&#x3002;cacheDir &#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x7F13;&#x5B58;&#x5B58;&#x653E;&#x7684;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;&#x3002;&#x9ED8;&#x8BA4;&#x4E0D;&#x4F1A;&#x7F13;&#x5B58;&#xFF0C;&#x60F3;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#x8BF7;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x8DEF;&#x5F84;&#x3002;</li>
<li>
<code>workerCount</code>&#xFF1A;&#x5F00;&#x542F;&#x51E0;&#x4E2A;&#x5B50;&#x8FDB;&#x7A0B;&#x53BB;&#x5E76;&#x53D1;&#x7684;&#x6267;&#x884C;&#x538B;&#x7F29;&#x3002;&#x9ED8;&#x8BA4;&#x662F;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x7535;&#x8111;&#x7684; CPU &#x6838;&#x6570;&#x51CF;&#x53BB;1&#x3002;</li>
<li>
<code>sourceMap</code>&#xFF1A;&#x662F;&#x5426;&#x8F93;&#x51FA; Source Map&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x538B;&#x7F29;&#x8FC7;&#x7A0B;&#x53D8;&#x6162;&#x3002;</li>
<li>
<code>uglifyJS</code>&#xFF1A;&#x7528;&#x4E8E;&#x538B;&#x7F29; ES5 &#x4EE3;&#x7801;&#x65F6;&#x7684;&#x914D;&#x7F6E;&#xFF0C;Object &#x7C7B;&#x578B;&#xFF0C;&#x76F4;&#x63A5;&#x900F;&#x4F20;&#x7ED9; UglifyJS &#x7684;&#x53C2;&#x6570;&#x3002;</li>
<li>
<code>uglifyES</code>&#xFF1A;&#x7528;&#x4E8E;&#x538B;&#x7F29; ES6 &#x4EE3;&#x7801;&#x65F6;&#x7684;&#x914D;&#x7F6E;&#xFF0C;Object &#x7C7B;&#x578B;&#xFF0C;&#x76F4;&#x63A5;&#x900F;&#x4F20;&#x7ED9; UglifyES &#x7684;&#x53C2;&#x6570;&#x3002;</li>
</ul>
<p>&#x5176;&#x4E2D;&#x7684; <code>test</code>&#x3001;<code>include</code>&#x3001;<code>exclude</code> &#x4E0E;&#x914D;&#x7F6E; Loader &#x65F6;&#x7684;&#x601D;&#x60F3;&#x548C;&#x7528;&#x6CD5;&#x4E00;&#x6837;&#x3002;</p>
<blockquote>UglifyES &#x662F; UglifyJS &#x7684;&#x53D8;&#x79CD;&#xFF0C;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x538B;&#x7F29; ES6 &#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x4EEC;&#x4E24;&#x90FD;&#x51FA;&#x81EA;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x4EEC;&#x4E24;&#x4E0D;&#x80FD;&#x540C;&#x65F6;&#x4F7F;&#x7528;&#x3002;<p>UglifyES &#x4E00;&#x822C;&#x7528;&#x4E8E;&#x7ED9;&#x6BD4;&#x8F83;&#x65B0;&#x7684; JavaScript &#x8FD0;&#x884C;&#x73AF;&#x5883;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#xFF0C;&#x4F8B;&#x5982;&#x7528;&#x4E8E; ReactNative &#x7684;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x5728;&#x517C;&#x5BB9;&#x6027;&#x8F83;&#x597D;&#x7684; JavaScriptCore &#x5F15;&#x64CE;&#x4E2D;&#xFF0C;&#x4E3A;&#x4E86;&#x5F97;&#x5230;&#x66F4;&#x597D;&#x7684;&#x6027;&#x80FD;&#x548C;&#x5C3A;&#x5BF8;&#xFF0C;&#x91C7;&#x7528; UglifyES &#x538B;&#x7F29;&#x6548;&#x679C;&#x4F1A;&#x66F4;&#x597D;&#x3002;</p>
<p>ParallelUglifyPlugin &#x540C;&#x65F6;&#x5185;&#x7F6E;&#x4E86; UglifyJS &#x548C; UglifyES&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4; ParallelUglifyPlugin &#x652F;&#x6301;&#x5E76;&#x884C;&#x538B;&#x7F29; ES6 &#x4EE3;&#x7801;&#x3002;</p>
</blockquote>
<p>&#x63A5;&#x5165; ParallelUglifyPlugin &#x540E;&#xFF0C;&#x9879;&#x76EE;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x65B0;&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack-parallel-uglify-plugin
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D webpack-parallel-uglify-plugin
</code></pre>
<p>&#x5B89;&#x88C5;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x901F;&#x5EA6;&#x53D8;&#x5FEB;&#x4E86;&#x8BB8;&#x591A;&#x3002;&#x5982;&#x679C;&#x8BBE;&#x7F6E; cacheDir &#x5F00;&#x542F;&#x4E86;&#x7F13;&#x5B58;&#xFF0C;&#x5728;&#x4E4B;&#x540E;&#x7684;&#x6784;&#x5EFA;&#x4E2D;&#x4F1A;&#x53D8;&#x7684;&#x66F4;&#x5FEB;&#x3002;</p>
<h1 id="articleHeader18">&#x4F7F;&#x7528;&#x81EA;&#x52A8;&#x5237;&#x65B0;</h1>
<p>&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#xFF0C;&#x4FEE;&#x6539;&#x6E90;&#x7801;&#x662F;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#x64CD;&#x4F5C;&#x3002; &#x5BF9;&#x4E8E;&#x5F00;&#x53D1;&#x7F51;&#x9875;&#x6765;&#x8BF4;&#xFF0C;&#x8981;&#x60F3;&#x770B;&#x5230;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x9700;&#x8981;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x8BA9;&#x5176;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x6700;&#x65B0;&#x7684;&#x4EE3;&#x7801;&#x624D;&#x884C;&#x3002; &#x867D;&#x7136;&#x8FD9;&#x76F8;&#x6BD4;&#x4E8E;&#x5F00;&#x53D1;&#x539F;&#x751F; iOS &#x548C; Android &#x5E94;&#x7528;&#x6765;&#x8BF4;&#x8981;&#x65B9;&#x4FBF;&#x5F88;&#x591A;&#xFF0C;&#x56E0;&#x4E3A;&#x90A3;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x518D;&#x8FD0;&#x884C;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E2A;&#x4F53;&#x9A8C;&#x4F18;&#x5316;&#x7684;&#x66F4;&#x597D;&#x3002; &#x501F;&#x52A9;&#x81EA;&#x52A8;&#x5316;&#x7684;&#x624B;&#x6BB5;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E9B;&#x91CD;&#x590D;&#x7684;&#x64CD;&#x4F5C;&#x4EA4;&#x7ED9;&#x4EE3;&#x7801;&#x53BB;&#x5E2E;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#xFF0C;&#x5728;&#x76D1;&#x542C;&#x5230;&#x672C;&#x5730;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x51FA;&#x53EF;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x540E;&#x518D;&#x63A7;&#x5236;&#x6D4F;&#x89C8;&#x5668;&#x5237;&#x65B0;&#x3002;</p>
<p>Webpack &#x628A;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#x90FD;&#x5185;&#x7F6E;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x8FD8;&#x63D0;&#x4F9B;&#x591A;&#x79CD;&#x65B9;&#x6848;&#x53EF;&#x9009;&#x3002;</p>
<h2 id="articleHeader19">&#x6587;&#x4EF6;&#x76D1;&#x542C;</h2>
<p>&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x662F;&#x5728;&#x53D1;&#x73B0;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x51FA;&#x65B0;&#x7684;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x3002;</p>
<p>Webpack &#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x5927;&#x6A21;&#x5757;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x6838;&#x5FC3;&#x7684; webpack&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x5728;&#x4F7F;&#x7528; DevServer &#x4E2D;&#x63D0;&#x5230;&#x7684; <code>webpack-dev-server</code> &#x6269;&#x5C55;&#x6A21;&#x5757;&#x3002; &#x800C;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x529F;&#x80FD;&#x662F; webpack &#x6A21;&#x5757;&#x63D0;&#x4F9B;&#x7684;&#x3002;</p>
<p>&#x5728;<a href="https://whjin.github.io/full-stack-development/posts/webpack%E9%85%8D%E7%BD%AE.html" rel="nofollow noreferrer" target="_blank">&#x5176;&#x5B83;&#x914D;&#x7F6E;&#x9879;</a>&#x4E2D;&#x66FE;&#x4ECB;&#x7ECD;&#x8FC7; Webpack &#x652F;&#x6301;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  // &#x53EA;&#x6709;&#x5728;&#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;watchOptions &#x624D;&#x6709;&#x610F;&#x4E49;
  // &#x9ED8;&#x8BA4;&#x4E3A; false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x5F00;&#x542F;
  watch: true,
  // &#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x53C2;&#x6570;
  // &#x5728;&#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;&#x624D;&#x6709;&#x610F;&#x4E49;
  watchOptions: {
    // &#x4E0D;&#x76D1;&#x542C;&#x7684;&#x6587;&#x4EF6;&#x6216;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x652F;&#x6301;&#x6B63;&#x5219;&#x5339;&#x914D;
    // &#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;
    ignored: /node_modules/,
    // &#x76D1;&#x542C;&#x5230;&#x53D8;&#x5316;&#x53D1;&#x751F;&#x540E;&#x4F1A;&#x7B49;300ms&#x518D;&#x53BB;&#x6267;&#x884C;&#x52A8;&#x4F5C;&#xFF0C;&#x9632;&#x6B62;&#x6587;&#x4EF6;&#x66F4;&#x65B0;&#x592A;&#x5FEB;&#x5BFC;&#x81F4;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x9891;&#x7387;&#x592A;&#x9AD8;
    // &#x9ED8;&#x8BA4;&#x4E3A; 300ms
    aggregateTimeout: 300,
    // &#x5224;&#x65AD;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x662F;&#x901A;&#x8FC7;&#x4E0D;&#x505C;&#x7684;&#x53BB;&#x8BE2;&#x95EE;&#x7CFB;&#x7EDF;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x6709;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x5B9E;&#x73B0;&#x7684;
    // &#x9ED8;&#x8BA4;&#x6BCF;&#x79D2;&#x95EE; 1000 &#x6B21;
    poll: 1000
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code>module.export = {
  <span class="hljs-comment">// &#x53EA;&#x6709;&#x5728;&#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;watchOptions &#x624D;&#x6709;&#x610F;&#x4E49;</span>
  <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A; false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x5F00;&#x542F;</span>
<span class="hljs-symbol">  watch:</span> true,
  <span class="hljs-comment">// &#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x53C2;&#x6570;</span>
  <span class="hljs-comment">// &#x5728;&#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;&#x624D;&#x6709;&#x610F;&#x4E49;</span>
<span class="hljs-symbol">  watchOptions:</span> {
    <span class="hljs-comment">// &#x4E0D;&#x76D1;&#x542C;&#x7684;&#x6587;&#x4EF6;&#x6216;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x652F;&#x6301;&#x6B63;&#x5219;&#x5339;&#x914D;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;</span>
<span class="hljs-symbol">    ignored:</span> /node_modules/,
    <span class="hljs-comment">// &#x76D1;&#x542C;&#x5230;&#x53D8;&#x5316;&#x53D1;&#x751F;&#x540E;&#x4F1A;&#x7B49;300ms&#x518D;&#x53BB;&#x6267;&#x884C;&#x52A8;&#x4F5C;&#xFF0C;&#x9632;&#x6B62;&#x6587;&#x4EF6;&#x66F4;&#x65B0;&#x592A;&#x5FEB;&#x5BFC;&#x81F4;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x9891;&#x7387;&#x592A;&#x9AD8;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A; 300ms</span>
<span class="hljs-symbol">    aggregateTimeout:</span> <span class="hljs-number">300</span>,
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x662F;&#x901A;&#x8FC7;&#x4E0D;&#x505C;&#x7684;&#x53BB;&#x8BE2;&#x95EE;&#x7CFB;&#x7EDF;&#x6307;&#x5B9A;&#x6587;&#x4EF6;&#x6709;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x5B9E;&#x73B0;&#x7684;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x6BCF;&#x79D2;&#x95EE; 1000 &#x6B21;</span>
<span class="hljs-symbol">    poll:</span> <span class="hljs-number">1000</span>
  }
}
</code></pre>
<p>&#x8981;&#x8BA9; Webpack &#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul>
<li>&#x5728;&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>webpack.config.js</code> &#x4E2D;&#x8BBE;&#x7F6E; <code>watch: true</code>&#x3002;</li>
<li>&#x5728;&#x6267;&#x884C;&#x542F;&#x52A8; Webpack &#x547D;&#x4EE4;&#x65F6;&#xFF0C;&#x5E26;&#x4E0A; <code>--watch</code> &#x53C2;&#x6570;&#xFF0C;&#x5B8C;&#x6574;&#x547D;&#x4EE4;&#x662F; <code>webpack --watch</code>&#x3002;</li>
</ul>
<h2 id="articleHeader20">&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x5DE5;&#x4F5C;&#x539F;&#x7406;</h2>
<p>&#x5728; Webpack &#x4E2D;&#x76D1;&#x542C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x539F;&#x7406;&#x662F;&#x5B9A;&#x65F6;&#x7684;&#x53BB;&#x83B7;&#x53D6;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x5B58;&#x4E0B;&#x6700;&#x65B0;&#x7684;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x5F53;&#x524D;&#x83B7;&#x53D6;&#x7684;&#x548C;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x4FDD;&#x5B58;&#x7684;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x5C31;&#x8BA4;&#x4E3A;&#x8BE5;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x3002; &#x914D;&#x7F6E;&#x9879;&#x4E2D;&#x7684; <code>watchOptions.poll</code> &#x5C31;&#x662F;&#x7528;&#x4E8E;&#x63A7;&#x5236;&#x5B9A;&#x65F6;&#x68C0;&#x67E5;&#x7684;&#x5468;&#x671F;&#xFF0C;&#x5177;&#x4F53;&#x542B;&#x4E49;&#x662F;&#x6BCF;&#x79D2;&#x68C0;&#x67E5;&#x591A;&#x5C11;&#x6B21;&#x3002;</p>
<p>&#x5F53;&#x53D1;&#x73B0;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x7ACB;&#x523B;&#x544A;&#x8BC9;&#x76D1;&#x542C;&#x8005;&#xFF0C;&#x800C;&#x662F;&#x5148;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x6536;&#x96C6;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x7684;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x518D;&#x4E00;&#x6B21;&#x6027;&#x544A;&#x8BC9;&#x76D1;&#x542C;&#x8005;&#x3002; &#x914D;&#x7F6E;&#x9879;&#x4E2D;&#x7684; <code>watchOptions.aggregateTimeout</code> &#x5C31;&#x662F;&#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x8FD9;&#x4E2A;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#x3002; &#x8FD9;&#x6837;&#x505A;&#x7684;&#x76EE;&#x7684;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x7F16;&#x8F91;&#x4EE3;&#x7801;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x9AD8;&#x9891;&#x7684;&#x8F93;&#x5165;&#x6587;&#x5B57;&#x5BFC;&#x81F4;&#x6587;&#x4EF6;&#x53D8;&#x5316;&#x7684;&#x4E8B;&#x4EF6;&#x9AD8;&#x9891;&#x7684;&#x53D1;&#x751F;&#xFF0C;&#x5982;&#x679C;&#x6BCF;&#x6B21;&#x90FD;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#x5C31;&#x4F1A;&#x8BA9;&#x6784;&#x5EFA;&#x5361;&#x6B7B;&#x3002;</p>
<p>&#x5BF9;&#x4E8E;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x6765;&#x8BF4;&#xFF0C;&#x539F;&#x7406;&#x76F8;&#x4F3C;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x4F1A;&#x5BF9;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x90FD;&#x5B9A;&#x65F6;&#x7684;&#x6267;&#x884C;&#x68C0;&#x67E5;&#x3002; &#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x9700;&#x8981;&#x76D1;&#x542C;&#x7684;&#x6587;&#x4EF6;&#x5217;&#x8868;&#x662F;&#x600E;&#x4E48;&#x786E;&#x5B9A;&#x7684;&#x5462;&#xFF1F; &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B; Webpack &#x4F1A;&#x4ECE;&#x914D;&#x7F6E;&#x7684; Entry &#x6587;&#x4EF6;&#x51FA;&#x53D1;&#xFF0C;&#x9012;&#x5F52;&#x89E3;&#x6790;&#x51FA; Entry &#x6587;&#x4EF6;&#x6240;&#x4F9D;&#x8D56;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x628A;&#x8FD9;&#x4E9B;&#x4F9D;&#x8D56;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x52A0;&#x5165;&#x5230;&#x76D1;&#x542C;&#x5217;&#x8868;&#x4E2D;&#x53BB;&#x3002; &#x53EF;&#x89C1; Webpack &#x8FD9;&#x4E00;&#x70B9;&#x8FD8;&#x662F;&#x505A;&#x7684;&#x5F88;&#x667A;&#x80FD;&#x7684;&#xFF0C;&#x4E0D;&#x662F;&#x7C97;&#x66B4;&#x7684;&#x76F4;&#x63A5;&#x76D1;&#x542C;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x3002;</p>
<p>&#x7531;&#x4E8E;&#x4FDD;&#x5B58;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#x548C;&#x6700;&#x540E;&#x7F16;&#x8F91;&#x65F6;&#x95F4;&#x9700;&#x8981;&#x5360;&#x7528;&#x5185;&#x5B58;&#xFF0C;&#x5B9A;&#x65F6;&#x68C0;&#x67E5;&#x5468;&#x671F;&#x68C0;&#x67E5;&#x9700;&#x8981;&#x5360;&#x7528; CPU &#x4EE5;&#x53CA;&#x6587;&#x4EF6; I/O&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x597D;&#x51CF;&#x5C11;&#x9700;&#x8981;&#x76D1;&#x542C;&#x7684;&#x6587;&#x4EF6;&#x6570;&#x91CF;&#x548C;&#x964D;&#x4F4E;&#x68C0;&#x67E5;&#x9891;&#x7387;&#x3002;</p>
<h2 id="articleHeader21">&#x4F18;&#x5316;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x6027;&#x80FD;</h2>
<p>&#x5728;&#x660E;&#x767D;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x540E;&#xFF0C;&#x5C31;&#x597D;&#x5206;&#x6790;&#x5982;&#x4F55;&#x4F18;&#x5316;&#x6587;&#x4EF6;&#x76D1;&#x542C;&#x6027;&#x80FD;&#x4E86;&#x3002;</p>
<p>&#x5F00;&#x542F;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x65F6;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x76D1;&#x542C;&#x914D;&#x7F6E;&#x7684; Entry &#x6587;&#x4EF6;&#x548C;&#x6240;&#x6709;&#x5176;&#x9012;&#x5F52;&#x4F9D;&#x8D56;&#x7684;&#x6587;&#x4EF6;&#x3002; &#x5728;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x4E2D;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x5B58;&#x5728;&#x4E8E; <code>node_modules</code> &#x4E0B;&#xFF0C;&#x56E0;&#x4E3A;&#x5982;&#x4ECA;&#x7684; Web &#x9879;&#x76EE;&#x4F1A;&#x4F9D;&#x8D56;&#x5927;&#x91CF;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x3002; &#x5728;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x6211;&#x4EEC;&#x90FD;&#x4E0D;&#x53EF;&#x80FD;&#x53BB;&#x7F16;&#x8F91; <code>node_modules</code> &#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x662F;&#x7F16;&#x8F91;&#x81EA;&#x5DF1;&#x5EFA;&#x7ACB;&#x7684;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x3002; &#x6240;&#x4EE5;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684;&#x4F18;&#x5316;&#x70B9;&#x5C31;&#x662F;&#x5FFD;&#x7565;&#x6389; <code>node_modules</code> &#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x76D1;&#x542C;&#x5B83;&#x4EEC;&#x3002;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.export = {
  watchOptions: {
    // &#x4E0D;&#x76D1;&#x542C;&#x7684; node_modules &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;
    ignored: /node_modules/,
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.<span class="hljs-keyword">export</span> = {
  watchOptions: {
    <span class="hljs-comment">// &#x4E0D;&#x76D1;&#x542C;&#x7684; node_modules &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;</span>
    ignored: <span class="hljs-regexp">/node_modules/</span>,
  }
}
</code></pre>
<p>&#x91C7;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4F18;&#x5316;&#x540E;&#xFF0C;&#x4F60;&#x7684; Webpack &#x6D88;&#x8017;&#x7684;&#x5185;&#x5B58;&#x548C; CPU &#x5C06;&#x4F1A;&#x5927;&#x5927;&#x964D;&#x4F4E;&#x3002;</p>
<blockquote>&#x6709;&#x65F6;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x89C9;&#x5F97; <code>node_modules</code> &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x6709; <code>bug</code>&#xFF0C;&#x60F3;&#x4FEE;&#x6539;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x8BD5;&#x8BD5;&#x3002; &#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E86;&#x4EE5;&#x4E0A;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x91CD;&#x542F;&#x6784;&#x5EFA;&#x4EE5;&#x770B;&#x5230;&#x6700;&#x65B0;&#x6548;&#x679C;&#x3002; &#x4F46;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x6BD5;&#x7ADF;&#x662F;&#x975E;&#x5E38;&#x5C11;&#x89C1;&#x7684;&#x3002;</blockquote>
<p>&#x9664;&#x4E86;&#x5FFD;&#x7565;&#x6389;&#x90E8;&#x5206;&#x6587;&#x4EF6;&#x7684;&#x4F18;&#x5316;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x5982;&#x4E0B;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;</p>
<ul>
<li>
<code>watchOptions.aggregateTimeout</code> &#x503C;&#x8D8A;&#x5927;&#x6027;&#x80FD;&#x8D8A;&#x597D;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x80FD;&#x964D;&#x4F4E;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x7684;&#x9891;&#x7387;&#x3002;</li>
<li>
<code>watchOptions.poll</code> &#x503C;&#x8D8A;&#x5C0F;&#x8D8A;&#x597D;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x80FD;&#x964D;&#x4F4E;&#x68C0;&#x67E5;&#x7684;&#x9891;&#x7387;&#x3002;</li>
</ul>
<p>&#x4F46;&#x4E24;&#x79CD;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x7684;&#x540E;&#x679C;&#x662F;&#x4F1A;&#x8BA9;&#x4F60;&#x611F;&#x89C9;&#x5230;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x7684;&#x53CD;&#x5E94;&#x548C;&#x7075;&#x654F;&#x5EA6;&#x964D;&#x4F4E;&#x4E86;&#x3002;</p>
<h1 id="articleHeader22">&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;</h1>
<p>&#x76D1;&#x542C;&#x5230;&#x6587;&#x4EF6;&#x66F4;&#x65B0;&#x540E;&#x7684;&#x4E0B;&#x4E00;&#x6B65;&#x662F;&#x53BB;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;<code>webpack</code> &#x6A21;&#x5757;&#x8D1F;&#x8D23;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#xFF0C;<code>webpack-dev-server</code> &#x6A21;&#x5757;&#x5219;&#x8D1F;&#x8D23;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x3002; &#x5728;&#x4F7F;&#x7528; <code>webpack-dev-server</code> &#x6A21;&#x5757;&#x53BB;&#x542F;&#x52A8; <code>webpack</code> &#x6A21;&#x5757;&#x65F6;&#xFF0C;<code>webpack</code> &#x6A21;&#x5757;&#x7684;&#x76D1;&#x542C;&#x6A21;&#x5F0F;&#x9ED8;&#x8BA4;&#x4F1A;&#x88AB;&#x5F00;&#x542F;&#x3002; <code>webpack</code> &#x6A21;&#x5757;&#x4F1A;&#x5728;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x544A;&#x8BC9; <code>webpack-dev-server</code> &#x6A21;&#x5757;&#x3002;</p>
<h2 id="articleHeader23">&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x7684;&#x539F;&#x7406;</h2>
<p>&#x63A7;&#x5236;&#x6D4F;&#x89C8;&#x5668;&#x5237;&#x65B0;&#x6709;&#x4E09;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;</p>
<ol>
<li>&#x501F;&#x52A9;&#x6D4F;&#x89C8;&#x5668;&#x6269;&#x5C55;&#x53BB;&#x901A;&#x8FC7;&#x6D4F;&#x89C8;&#x5668;&#x63D0;&#x4F9B;&#x7684;&#x63A5;&#x53E3;&#x5237;&#x65B0;&#xFF0C;WebStorm IDE &#x7684; LiveEdit &#x529F;&#x80FD;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#x7684;&#x3002;</li>
<li>&#x5F80;&#x8981;&#x5F00;&#x53D1;&#x7684;&#x7F51;&#x9875;&#x4E2D;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x4EE3;&#x7801;&#xFF0C;&#x901A;&#x8FC7;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x53BB;&#x5237;&#x65B0;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x3002;</li>
<li>&#x628A;&#x8981;&#x5F00;&#x53D1;&#x7684;&#x7F51;&#x9875;&#x88C5;&#x8FDB;&#x4E00;&#x4E2A; <code>iframe</code> &#x4E2D;&#xFF0C;&#x901A;&#x8FC7;&#x5237;&#x65B0; <code>iframe</code> &#x53BB;&#x770B;&#x5230;&#x6700;&#x65B0;&#x6548;&#x679C;&#x3002;</li>
</ol>
<p>DevServer &#x652F;&#x6301;&#x7B2C;2&#x3001;3&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x7B2C;2&#x79CD;&#x662F; DevServer &#x9ED8;&#x8BA4;&#x91C7;&#x7528;&#x7684;&#x5237;&#x65B0;&#x65B9;&#x6CD5;&#x3002;</p>
<h2 id="articleHeader24">&#x4F18;&#x5316;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x7684;&#x6027;&#x80FD;</h2>
<p>&#x5728;DevServer&#x4E2D;&#x66FE;&#x4ECB;&#x7ECD;&#x8FC7; <code>devServer.inline</code> &#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x5B83;&#x5C31;&#x662F;&#x7528;&#x6765;&#x63A7;&#x5236;&#x662F;&#x5426;&#x5F80; Chunk &#x4E2D;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x6CE8;&#x5165;&#x3002; &#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x5728;&#x5F00;&#x542F; <code>inline</code> &#x65F6;&#xFF0C;DevServer &#x4F1A;&#x4E3A;&#x6BCF;&#x4E2A;&#x8F93;&#x51FA;&#x7684; Chunk &#x4E2D;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5F53;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x9700;&#x8981;&#x8F93;&#x51FA;&#x7684; Chunk &#x6709;&#x5F88;&#x591A;&#x4E2A;&#x65F6;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x4F60;&#x7684;&#x6784;&#x5EFA;&#x7F13;&#x6162;&#x3002; &#x5176;&#x5B9E;&#x8981;&#x5B8C;&#x6210;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#xFF0C;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x53EA;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x5C31;&#x884C;&#x4E86;&#xFF0C;DevServer &#x4E4B;&#x6240;&#x4EE5;&#x7C97;&#x66B4;&#x7684;&#x4E3A;&#x6BCF;&#x4E2A; Chunk &#x90FD;&#x6CE8;&#x5165;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5B83;&#x4E0D;&#x77E5;&#x9053;&#x67D0;&#x4E2A;&#x7F51;&#x9875;&#x4F9D;&#x8D56;&#x54EA;&#x51E0;&#x4E2A; Chunk&#xFF0C;&#x7D22;&#x6027;&#x5C31;&#x5168;&#x90E8;&#x90FD;&#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x3002; &#x7F51;&#x9875;&#x53EA;&#x8981;&#x4F9D;&#x8D56;&#x4E86;&#x5176;&#x4E2D;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A; Chunk&#xFF0C;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x5C31;&#x88AB;&#x6CE8;&#x5165;&#x5230;&#x7F51;&#x9875;&#x4E2D;&#x53BB;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#x4F18;&#x5316;&#x7684;&#x601D;&#x8DEF;&#x662F;&#x5173;&#x95ED;&#x8FD8;&#x4E0D;&#x591F;&#x4F18;&#x96C5;&#x7684; <code>inline</code> &#x6A21;&#x5F0F;&#xFF0C;&#x53EA;&#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x3002; &#x4E3A;&#x4E86;&#x5173;&#x95ED; <code>inline</code> &#x6A21;&#x5F0F;&#xFF0C;&#x5728;&#x542F;&#x52A8; DevServer &#x65F6;&#xFF0C;&#x53EF;&#x901A;&#x8FC7;&#x6267;&#x884C;&#x547D;&#x4EE4; <code>webpack-dev-server --inline false</code>&#xFF08;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x8BBE;&#x7F6E;&#xFF09;&#x3002;</p>
<p>&#x8981;&#x5F00;&#x53D1;&#x7684;&#x7F51;&#x9875;&#x88AB;&#x653E;&#x8FDB;&#x4E86;&#x4E00;&#x4E2A; <code>iframe</code> &#x4E2D;&#xFF0C;&#x7F16;&#x8F91;&#x6E90;&#x7801;&#x540E;&#xFF0C;<code>iframe</code> &#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x3002; &#x540C;&#x65F6;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6784;&#x5EFA;&#x65F6;&#x95F4;&#x4ECE; <code>1566ms</code> &#x51CF;&#x5C11;&#x5230;&#x4E86; <code>1130ms</code>&#xFF0C;&#x8BF4;&#x660E;&#x4F18;&#x5316;&#x751F;&#x6548;&#x4E86;&#x3002;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#x63D0;&#x5347;&#x7684;&#x6548;&#x679C;&#x5728;&#x8981;&#x8F93;&#x51FA;&#x7684; Chunk &#x6570;&#x91CF;&#x8D8A;&#x591A;&#x65F6;&#x4F1A;&#x663E;&#x5F97;&#x8D8A;&#x7A81;&#x51FA;&#x3002;</p>
<blockquote>&#x5728;&#x4F60;&#x5173;&#x95ED;&#x4E86; <code>inline</code> &#x540E;&#xFF0C;DevServer &#x4F1A;&#x81EA;&#x52A8;&#x5730;&#x63D0;&#x793A;&#x4F60;&#x901A;&#x8FC7;&#x65B0;&#x7F51;&#x5740; <code>http://localhost:8080/webpack-dev-server/</code> &#x53BB;&#x8BBF;&#x95EE;&#xFF0C;&#x8FD9;&#x70B9;&#x662F;&#x505A;&#x7684;&#x5F88;&#x4EBA;&#x5FC3;&#x5316;&#x7684;&#x3002;</blockquote>
<p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x901A;&#x8FC7; <code>iframe</code> &#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x8BBF;&#x95EE;&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x53C8;&#x60F3;&#x8BA9;&#x7F51;&#x9875;&#x4FDD;&#x6301;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x529F;&#x80FD;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5F80;&#x7F51;&#x9875;&#x4E2D;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#xFF0C;&#x5F80; <code>index.html</code> &#x4E2D;&#x63D2;&#x5165;&#x4EE5;&#x4E0B;&#x6807;&#x7B7E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x6CE8;&#x5165; DevServer &#x63D0;&#x4F9B;&#x7684;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#xFF0C;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x662F; DevServer &#x5185;&#x7F6E;&#x7684;--&gt;
&lt;script src=&quot;http://localhost:8080/webpack-dev-server.js&quot;&gt;&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--&#x6CE8;&#x5165; DevServer &#x63D0;&#x4F9B;&#x7684;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#xFF0C;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x662F; DevServer &#x5185;&#x7F6E;&#x7684;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://localhost:8080/webpack-dev-server.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>&#x7ED9;&#x7F51;&#x9875;&#x6CE8;&#x5165;&#x4EE5;&#x4E0A;&#x811A;&#x672C;&#x540E;&#xFF0C;&#x72EC;&#x7ACB;&#x6253;&#x5F00;&#x7684;&#x7F51;&#x9875;&#x5C31;&#x80FD;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x8981;&#x6CE8;&#x610F;&#x5728;&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x65F6;&#x8BB0;&#x5F97;&#x5220;&#x9664;&#x6389;&#x8FD9;&#x6BB5;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<h1 id="articleHeader25">&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;</h1>
<p>&#x8981;&#x505A;&#x5230;&#x5B9E;&#x65F6;&#x9884;&#x89C8;&#xFF0C;&#x9664;&#x4E86;&#x5728;&#x4F7F;&#x7528;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x4E2D;&#x4ECB;&#x7ECD;&#x7684;&#x5237;&#x65B0;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x5916;&#xFF0C;DevServer &#x8FD8;&#x652F;&#x6301;&#x4E00;&#x79CD;&#x53EB;&#x505A;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;(Hot Module Replacement)&#x7684;&#x6280;&#x672F;&#x53EF;&#x5728;&#x4E0D;&#x5237;&#x65B0;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x505A;&#x5230;&#x8D85;&#x7075;&#x654F;&#x7684;&#x5B9E;&#x65F6;&#x9884;&#x89C8;&#x3002; &#x539F;&#x7406;&#x662F;&#x5F53;&#x4E00;&#x4E2A;&#x6E90;&#x7801;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x53EA;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x518D;&#x7528;&#x65B0;&#x8F93;&#x51FA;&#x7684;&#x6A21;&#x5757;&#x66FF;&#x6362;&#x6389;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x8001;&#x6A21;&#x5757;&#x3002;</p>
<p>&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6280;&#x672F;&#x7684;&#x4F18;&#x52BF;&#x6709;&#xFF1A;</p>
<ul>
<li>&#x5B9E;&#x65F6;&#x9884;&#x89C8;&#x53CD;&#x5E94;&#x66F4;&#x5FEB;&#xFF0C;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#x66F4;&#x77ED;&#x3002;</li>
<li>&#x4E0D;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x4FDD;&#x7559;&#x5F53;&#x524D;&#x7F51;&#x9875;&#x7684;&#x8FD0;&#x884C;&#x72B6;&#x6001;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x4F7F;&#x7528; Redux &#x6765;&#x7BA1;&#x7406;&#x6570;&#x636E;&#x7684;&#x5E94;&#x7528;&#x4E2D;&#x642D;&#x914D;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x80FD;&#x505A;&#x5230;&#x4EE3;&#x7801;&#x66F4;&#x65B0;&#x65F6; Redux &#x4E2D;&#x7684;&#x6570;&#x636E;&#x8FD8;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x3002;</li>
</ul>
<p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6280;&#x672F;&#x5F88;&#x5927;&#x7A0B;&#x5EA6;&#x4E0A;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x548C;&#x4F53;&#x9A8C;&#x3002;</p>
<h2 id="articleHeader26">&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x539F;&#x7406;</h2>
<p>&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x539F;&#x7406;&#x548C;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x539F;&#x7406;&#x7C7B;&#x4F3C;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x5F80;&#x8981;&#x5F00;&#x53D1;&#x7684;&#x7F51;&#x9875;&#x4E2D;&#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x7528;&#x4E8E;&#x8FDE;&#x63A5; DevServer &#x548C;&#x7F51;&#x9875;&#xFF0C; &#x4E0D;&#x540C;&#x5728;&#x4E8E;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x72EC;&#x7279;&#x7684;&#x6A21;&#x5757;&#x66FF;&#x6362;&#x673A;&#x5236;&#x3002;</p>
<p>DevServer &#x9ED8;&#x8BA4;&#x4E0D;&#x4F1A;&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6A21;&#x5F0F;&#xFF0C;&#x8981;&#x5F00;&#x542F;&#x8BE5;&#x6A21;&#x5F0F;&#xFF0C;&#x53EA;&#x9700;&#x5728;&#x542F;&#x52A8;&#x65F6;&#x5E26;&#x4E0A;&#x53C2;&#x6570; <code>--hot</code>&#xFF0C;&#x5B8C;&#x6574;&#x547D;&#x4EE4;&#x662F; <code>webpack-dev-server --hot</code>&#x3002;</p>
<p>&#x9664;&#x4E86;&#x901A;&#x8FC7;&#x5728;&#x542F;&#x52A8;&#x65F6;&#x5E26;&#x4E0A; <code>--hot</code> &#x53C2;&#x6570;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x63A5;&#x5165; Plugin &#x5B9E;&#x73B0;&#xFF0C;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HotModuleReplacementPlugin = require(&apos;webpack/lib/HotModuleReplacementPlugin&apos;);

module.exports = {
  entry:{
    // &#x4E3A;&#x6BCF;&#x4E2A;&#x5165;&#x53E3;&#x90FD;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;
    main:[&apos;webpack-dev-server/client?http://localhost:8080/&apos;, &apos;webpack/hot/dev-server&apos;,&apos;./src/main.js&apos;],
  },
  plugins: [
    // &#x8BE5;&#x63D2;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x542F;&#x52A8;&#x65F6;&#x5E26;&#x4E0A; `--hot` &#x53C2;&#x6570;&#xFF0C;&#x4F1A;&#x6CE8;&#x5165;&#x8BE5;&#x63D2;&#x4EF6;&#xFF0C;&#x751F;&#x6210; .hot-update.json &#x6587;&#x4EF6;&#x3002;
    new HotModuleReplacementPlugin(),
  ],
  devServer:{
    // &#x544A;&#x8BC9; DevServer &#x8981;&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6A21;&#x5F0F;
    hot: true,      
  }  
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> HotModuleReplacementPlugin = require(<span class="hljs-string">&apos;webpack/lib/HotModuleReplacementPlugin&apos;</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry:{
    <span class="hljs-comment">// &#x4E3A;&#x6BCF;&#x4E2A;&#x5165;&#x53E3;&#x90FD;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;</span>
    main:[<span class="hljs-string">&apos;webpack-dev-server/client?http://localhost:8080/&apos;</span>, <span class="hljs-string">&apos;webpack/hot/dev-server&apos;</span>,<span class="hljs-string">&apos;./src/main.js&apos;</span>],
  },
  plugins: [
    <span class="hljs-comment">// &#x8BE5;&#x63D2;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x542F;&#x52A8;&#x65F6;&#x5E26;&#x4E0A; `--hot` &#x53C2;&#x6570;&#xFF0C;&#x4F1A;&#x6CE8;&#x5165;&#x8BE5;&#x63D2;&#x4EF6;&#xFF0C;&#x751F;&#x6210; .hot-update.json &#x6587;&#x4EF6;&#x3002;</span>
    <span class="hljs-keyword">new</span> HotModuleReplacementPlugin(),
  ],
  devServer:{
    <span class="hljs-comment">// &#x544A;&#x8BC9; DevServer &#x8981;&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6A21;&#x5F0F;</span>
    hot: <span class="hljs-keyword">true</span>,      
  }  
};
</code></pre>
<p>&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A;&#x53C2;&#x6570; <code>--hot</code> &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x81EA;&#x52A8;&#x4E3A;&#x4F60;&#x5B8C;&#x6210;&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x3002;</p>
<p>&#x76F8;&#x6BD4;&#x4E8E;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x7684;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x591A;&#x51FA;&#x4E86;&#x540E;&#x4E09;&#x4E2A;&#x7528;&#x4E8E;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x66F4;&#x5927;&#x4E86;&#x3002;</p>
<p>&#x53EF;&#x89C1;&#x8865;&#x4E01;&#x4E2D;&#x5305;&#x542B;&#x4E86; <code>main.css</code> &#x6587;&#x4EF6;&#x65B0;&#x7F16;&#x8BD1;&#x51FA;&#x6765; CSS &#x4EE3;&#x7801;&#xFF0C;&#x7F51;&#x9875;&#x4E2D;&#x7684;&#x6837;&#x5F0F;&#x4E5F;&#x7ACB;&#x523B;&#x53D8;&#x6210;&#x4E86;&#x6E90;&#x7801;&#x4E2D;&#x63CF;&#x8FF0;&#x7684;&#x90A3;&#x6837;&#x3002;</p>
<p>&#x4F46;&#x5F53;&#x4F60;&#x4FEE;&#x6539; <code>main.js</code> &#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x4F1A;&#x53D1;&#x73B0;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6CA1;&#x6709;&#x751F;&#x6548;&#xFF0C;&#x800C;&#x662F;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x88AB;&#x5237;&#x65B0;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4FEE;&#x6539; main.js &#x6587;&#x4EF6;&#x65F6;&#x4F1A;&#x8FD9;&#x6837;&#x5462;&#xFF1F;</p>
<p>Webpack &#x4E3A;&#x4E86;&#x8BA9;&#x4F7F;&#x7528;&#x8005;&#x5728;&#x4F7F;&#x7528;&#x4E86;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x529F;&#x80FD;&#x65F6;&#x80FD;&#x7075;&#x6D3B;&#x5730;&#x63A7;&#x5236;&#x8001;&#x6A21;&#x5757;&#x88AB;&#x66FF;&#x6362;&#x65F6;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x53BB;&#x505A;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x3002;</p>
<p>&#x628A;&#x7684; <code>main.js</code> &#x6587;&#x4EF6;&#x6539;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;365&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;QreOEw&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;main.js&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/QreOEw/" rel="nofollow noreferrer" target="_blank">main.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/QreOEw/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x5176;&#x4E2D;&#x7684; <code>module.hot</code> &#x662F;&#x5F53;&#x5F00;&#x542F;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x540E;&#x6CE8;&#x5165;&#x5230;&#x5168;&#x5C40;&#x7684; API&#xFF0C;&#x7528;&#x4E8E;&#x63A7;&#x5236;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x903B;&#x8F91;&#x3002;</p>
<p>&#x73B0;&#x5728;&#x4FEE;&#x6539; <code>AppComponent.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x628A; <code>Hello,Webpack</code> &#x6539;&#x6210; <code>Hello,World</code>&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x751F;&#x6548;&#x4E86;&#x3002; &#x4F46;&#x662F;&#x5F53;&#x4F60;&#x7F16;&#x8F91; <code>main.js</code> &#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x88AB;&#x5237;&#x65B0;&#x4E86;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x4FEE;&#x6539;&#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x4F1A;&#x6709;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x8868;&#x73B0;&#x5462;&#xFF1F;</p>
<p>&#x5F53;&#x5B50;&#x6A21;&#x5757;&#x53D1;&#x751F;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x66F4;&#x65B0;&#x4E8B;&#x4EF6;&#x4F1A;&#x4E00;&#x5C42;&#x5C42;&#x5F80;&#x4E0A;&#x4F20;&#x9012;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4ECE; <code>AppComponent.js</code> &#x6587;&#x4EF6;&#x4F20;&#x9012;&#x5230; <code>main.js</code> &#x6587;&#x4EF6;&#xFF0C; &#x76F4;&#x5230;&#x6709;&#x67D0;&#x5C42;&#x7684;&#x6587;&#x4EF6;&#x63A5;&#x53D7;&#x4E86;&#x5F53;&#x524D;&#x53D8;&#x5316;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; <code>main.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; <code>module.hot.accept([&apos;./AppComponent&apos;], callback)</code>&#xFF0C; &#x8FD9;&#x65F6;&#x5C31;&#x4F1A;&#x8C03;&#x7528; <code>callback</code> &#x51FD;&#x6570;&#x53BB;&#x6267;&#x884C;&#x81EA;&#x5B9A;&#x4E49;&#x903B;&#x8F91;&#x3002;&#x5982;&#x679C;&#x4E8B;&#x4EF6;&#x4E00;&#x76F4;&#x5F80;&#x4E0A;&#x629B;&#x5230;&#x6700;&#x5916;&#x5C42;&#x90FD;&#x6CA1;&#x6709;&#x6587;&#x4EF6;&#x63A5;&#x53D7;&#x5B83;&#xFF0C;&#x5C31;&#x4F1A;&#x76F4;&#x63A5;&#x5237;&#x65B0;&#x7F51;&#x9875;&#x3002;</p>
<p>&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x6CA1;&#x6709;&#x5730;&#x65B9;&#x63A5;&#x53D7;&#x8FC7; <code>.css</code> &#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x4FEE;&#x6539;&#x6240;&#x6709;&#x7684; <code>.css</code> &#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x5462;&#xFF1F; &#x539F;&#x56E0;&#x5728;&#x4E8E; <code>style-loader</code> &#x4F1A;&#x6CE8;&#x5165;&#x7528;&#x4E8E;&#x63A5;&#x53D7; CSS &#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<blockquote>&#x8BF7;&#x4E0D;&#x8981;&#x628A;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x6280;&#x672F;&#x7528;&#x4E8E;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#xFF0C;&#x5B83;&#x662F;&#x4E13;&#x95E8;&#x4E3A;&#x63D0;&#x5347;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x751F;&#x7684;&#x3002;</blockquote>
<h2 id="articleHeader27">&#x4F18;&#x5316;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;</h2>
<p>&#x5176;&#x4E2D;&#x7684; Updated modules: 68 &#x662F;&#x6307; ID &#x4E3A;68&#x7684;&#x6A21;&#x5757;&#x88AB;&#x66FF;&#x6362;&#x4E86;&#xFF0C;&#x8FD9;&#x5BF9;&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#x5F88;&#x4E0D;&#x53CB;&#x597D;&#xFF0C;&#x56E0;&#x4E3A;&#x5F00;&#x53D1;&#x8005;&#x4E0D;&#x77E5;&#x9053; ID &#x548C;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#xFF0C;&#x6700;&#x597D;&#x662F;&#x628A;&#x66FF;&#x6362;&#x4E86;&#x7684;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;&#x8F93;&#x51FA;&#x51FA;&#x6765;&#x3002; Webpack &#x5185;&#x7F6E;&#x7684; NamedModulesPlugin &#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8BE5;&#x95EE;&#x9898;&#xFF0C;&#x4FEE;&#x6539; Webpack &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x63A5;&#x5165;&#x8BE5;&#x63D2;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const NamedModulesPlugin = require(&apos;webpack/lib/NamedModulesPlugin&apos;);

module.exports = {
  plugins: [
    // &#x663E;&#x793A;&#x51FA;&#x88AB;&#x66FF;&#x6362;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;
    new NamedModulesPlugin(),
  ],
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> NamedModulesPlugin = require(<span class="hljs-string">&apos;webpack/lib/NamedModulesPlugin&apos;</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    <span class="hljs-comment">// &#x663E;&#x793A;&#x51FA;&#x88AB;&#x66FF;&#x6362;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;</span>
    <span class="hljs-keyword">new</span> NamedModulesPlugin(),
  ],
};
</code></pre>
<p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x8FD8;&#x9762;&#x4E34;&#x7740;&#x548C;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x4E00;&#x6837;&#x7684;&#x6027;&#x80FD;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x90FD;&#x9700;&#x8981;&#x76D1;&#x542C;&#x6587;&#x4EF6;&#x53D8;&#x5316;&#x548C;&#x6CE8;&#x5165;&#x5BA2;&#x6237;&#x7AEF;&#x3002; &#x8981;&#x4F18;&#x5316;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x6784;&#x5EFA;&#x6027;&#x80FD;&#xFF0C;&#x601D;&#x8DEF;&#x548C;&#x5728;&#x4F7F;&#x7528;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x5F88;&#x7C7B;&#x4F3C;&#xFF1A;&#x76D1;&#x542C;&#x66F4;&#x5C11;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5FFD;&#x7565;&#x6389; <code>node_modules</code> &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x3002; &#x4F46;&#x662F;&#x5176;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x5173;&#x95ED;&#x9ED8;&#x8BA4;&#x7684; <code>inline</code> &#x6A21;&#x5F0F;&#x624B;&#x52A8;&#x6CE8;&#x5165;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x7528;&#x4E8E;&#x5728;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C; &#x539F;&#x56E0;&#x5728;&#x4E8E;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#x7684;&#x8FD0;&#x884C;&#x4F9D;&#x8D56;&#x5728;&#x6BCF;&#x4E2A; Chunk &#x4E2D;&#x90FD;&#x5305;&#x542B;&#x4EE3;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<h1 id="articleHeader28">&#x533A;&#x5206;&#x73AF;&#x5883;</h1>
<h2 id="articleHeader29">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x533A;&#x5206;&#x73AF;&#x5883;</h2>
<p>&#x5728;&#x5F00;&#x53D1;&#x7F51;&#x9875;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x6709;&#x591A;&#x5957;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<ol>
<li>&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x65B9;&#x4FBF;&#x5F00;&#x53D1;&#x8C03;&#x8BD5;&#x7684;&#x73AF;&#x5883;&#x3002;</li>
<li>&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x7ED9;&#x7528;&#x6237;&#x4F7F;&#x7528;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x3002;</li>
</ol>
<p>&#x8FD9;&#x4E24;&#x5957;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x867D;&#x7136;&#x90FD;&#x662F;&#x7531;&#x540C;&#x4E00;&#x5957;&#x6E90;&#x4EE3;&#x7801;&#x7F16;&#x8BD1;&#x800C;&#x6765;&#xFF0C;&#x4F46;&#x662F;&#x4EE3;&#x7801;&#x5185;&#x5BB9;&#x5374;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5DEE;&#x5F02;&#x5305;&#x62EC;&#xFF1A;</p>
<ul>
<li>&#x7EBF;&#x4E0A;&#x4EE3;&#x7801;&#x88AB;&#x901A;&#x8FC7;&#x538B;&#x7F29;&#x4EE3;&#x7801; &#x4E2D;&#x63D0;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#x538B;&#x7F29;&#x8FC7;&#x3002;</li>
<li>&#x5F00;&#x53D1;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x5305;&#x542B;&#x4E00;&#x4E9B;&#x7528;&#x4E8E;&#x63D0;&#x793A;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x63D0;&#x793A;&#x65E5;&#x5FD7;&#xFF0C;&#x8FD9;&#x4E9B;&#x65E5;&#x5FD7;&#x666E;&#x901A;&#x7528;&#x6237;&#x4E0D;&#x53EF;&#x80FD;&#x53BB;&#x770B;&#x5B83;&#x3002;</li>
<li>&#x5F00;&#x53D1;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x6240;&#x8FDE;&#x63A5;&#x7684;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4E5F;&#x53EF;&#x80FD;&#x548C;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#x4E0D;&#x540C;&#xFF0C;&#x56E0;&#x4E3A;&#x8981;&#x907F;&#x514D;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x9020;&#x6210;&#x5BF9;&#x7EBF;&#x4E0A;&#x6570;&#x636E;&#x7684;&#x5F71;&#x54CD;&#x3002;</li>
</ul>
<p>&#x4E3A;&#x4E86;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x590D;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x5728;&#x6784;&#x5EFA;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x9700;&#x8981;&#x6839;&#x636E;&#x76EE;&#x6807;&#x4EE3;&#x7801;&#x8981;&#x8FD0;&#x884C;&#x7684;&#x73AF;&#x5883;&#x800C;&#x8F93;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x5957;&#x673A;&#x5236;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x53BB;&#x533A;&#x5206;&#x73AF;&#x5883;&#x3002; &#x5E78;&#x8FD0;&#x7684;&#x662F; Webpack &#x5DF2;&#x7ECF;&#x4E3A;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x70B9;&#x3002;</p>
<h2 id="articleHeader30">&#x5982;&#x4F55;&#x533A;&#x5206;&#x73AF;&#x5883;</h2>
<p>&#x5177;&#x4F53;&#x533A;&#x5206;&#x65B9;&#x6CD5;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x901A;&#x8FC7;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.env.NODE_ENV === &apos;production&apos;) {
  console.log(&apos;&#x4F60;&#x6B63;&#x5728;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;);
} else {
  console.log(&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">if</span> (process.<span class="hljs-keyword">env</span>.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>) {
  console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;&#x4F60;&#x6B63;&#x5728;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;</span>);
} <span class="hljs-keyword">else</span> {
  console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;</span>);
}
</code></pre>
<p>&#x5176;&#x5927;&#x6982;&#x539F;&#x7406;&#x662F;&#x501F;&#x52A9;&#x4E8E;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x53BB;&#x5224;&#x65AD;&#x6267;&#x884C;&#x54EA;&#x4E2A;&#x5206;&#x652F;&#x3002;</p>
<p>&#x5F53;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x51FA;&#x73B0;&#x4E86;&#x4F7F;&#x7528; <code>process</code> &#x6A21;&#x5757;&#x7684;&#x8BED;&#x53E5;&#x65F6;&#xFF0C;Webpack &#x5C31;&#x81EA;&#x52A8;&#x6253;&#x5305;&#x8FDB; <code>process</code> &#x6A21;&#x5757;&#x7684;&#x4EE3;&#x7801;&#x4EE5;&#x652F;&#x6301;&#x975E; Node.js &#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x3002; &#x5F53;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x6CA1;&#x6709;&#x4F7F;&#x7528; <code>process</code> &#x65F6;&#x5C31;&#x4E0D;&#x4F1A;&#x6253;&#x5305;&#x8FDB; <code>process</code> &#x6A21;&#x5757;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x8FD9;&#x4E2A;&#x6CE8;&#x5165;&#x7684; process &#x6A21;&#x5757;&#x4F5C;&#x7528;&#x662F;&#x4E3A;&#x4E86;&#x6A21;&#x62DF; Node.js &#x4E2D;&#x7684; <code>process</code>&#xFF0C;&#x4EE5;&#x652F;&#x6301;&#x4E0A;&#x9762;&#x4F7F;&#x7528;&#x7684; <code>process.env.NODE_ENV === &apos;production&apos;</code> &#x8BED;&#x53E5;&#x3002;</p>
<p>&#x5728;&#x6784;&#x5EFA;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x7ED9;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#x53D8;&#x91CF; <code>NODE_ENV = &apos;production&apos;&#xFF0C;Webpack</code> &#x76F8;&#x5173;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DefinePlugin = require(&apos;webpack/lib/DefinePlugin&apos;);

module.exports = {
  plugins: [
    new DefinePlugin({
      // &#x5B9A;&#x4E49; NODE_ENV &#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E3A; production
      &apos;process.env&apos;: {
        NODE_ENV: JSON.stringify(&apos;production&apos;)
      }
    }),
  ],
};


" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> DefinePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack/lib/DefinePlugin&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> DefinePlugin({
      <span class="hljs-comment">// &#x5B9A;&#x4E49; NODE_ENV &#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E3A; production</span>
      <span class="hljs-string">&apos;process.env&apos;</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">&apos;production&apos;</span>)
      }
    }),
  ],
};


</code></pre>
<blockquote>&#x6CE8;&#x610F;&#x5728;&#x5B9A;&#x4E49;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x65F6;&#x7528; <code>JSON.stringify</code> &#x5305;&#x88F9;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x539F;&#x56E0;&#x662F;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x9700;&#x8981;&#x662F;&#x4E00;&#x4E2A;&#x7531;&#x53CC;&#x5F15;&#x53F7;&#x5305;&#x88F9;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x800C; <code>JSON.stringify(&apos;production&apos;)</code>&#x7684;&#x503C;&#x6B63;&#x597D;&#x7B49;&#x4E8E;<code>&apos;&quot;production&quot;&apos;</code>&#x3002;</blockquote>
<p>&#x6267;&#x884C;&#x6784;&#x5EFA;&#x540E;&#xFF0C;&#x4F60;&#x4F1A;&#x5728;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x53D1;&#x73B0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (true) {
  console.log(&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;);
} else {
  console.log(&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;</span>)<span class="hljs-comment">;</span>
} <span class="hljs-keyword">else</span> {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x4F60;&#x6B63;&#x5728;&#x4F7F;&#x7528;&#x5F00;&#x53D1;&#x73AF;&#x5883;&apos;</span>)<span class="hljs-comment">;</span>
}
</code></pre>
<p>&#x5B9A;&#x4E49;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x88AB;&#x4EE3;&#x5165;&#x5230;&#x4E86;&#x6E90;&#x7801;&#x4E2D;&#xFF0C;<code>process.env.NODE_ENV === &apos;production&apos;</code> &#x88AB;&#x76F4;&#x63A5;&#x66FF;&#x6362;&#x6210;&#x4E86; <code>true</code>&#x3002; &#x5E76;&#x4E14;&#x7531;&#x4E8E;&#x6B64;&#x65F6;&#x8BBF;&#x95EE; <code>process</code> &#x7684;&#x8BED;&#x53E5;&#x88AB;&#x66FF;&#x6362;&#x4E86;&#x800C;&#x6CA1;&#x6709;&#x4E86;&#xFF0C;Webpack &#x4E5F;&#x4E0D;&#x4F1A;&#x6253;&#x5305;&#x8FDB; <code>process</code> &#x6A21;&#x5757;&#x4E86;&#x3002;</p>
<p>DefinePlugin &#x5B9A;&#x4E49;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x53EA;&#x5BF9; <code>Webpack</code> &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x4EE3;&#x7801;&#x6709;&#x6548;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD; Node.js &#x8FD0;&#x884C;&#x65F6;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x3002;</p>
<p>&#x901A;&#x8FC7; Shell &#x811A;&#x672C;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B9A;&#x4E49;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x4F8B;&#x5982; <code>NODE_ENV=production webpack&#xFF0C;Webpack</code> &#x662F;&#x4E0D;&#x8BA4;&#x8BC6;&#x7684;&#xFF0C;&#x5BF9; Webpack &#x9700;&#x8981;&#x5904;&#x7406;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x73AF;&#x5883;&#x533A;&#x5206;&#x8BED;&#x53E5;&#x662F;&#x6CA1;&#x6709;&#x4F5C;&#x7528;&#x7684;&#x3002;</p>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EA;&#x9700;&#x8981;&#x901A;&#x8FC7; DefinePlugin &#x5B9A;&#x4E49;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5C31;&#x80FD;&#x4F7F;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x73AF;&#x5883;&#x533A;&#x5206;&#x8BED;&#x53E5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF0C;&#x6CA1;&#x5FC5;&#x8981;&#x53C8;&#x901A;&#x8FC7; Shell &#x811A;&#x672C;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B9A;&#x4E49;&#x4E00;&#x904D;&#x3002;</p>
<p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8BA9; Webpack &#x4F7F;&#x7528;&#x901A;&#x8FC7; Shell &#x811A;&#x672C;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B9A;&#x4E49;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>EnvironmentPlugin</code>&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.EnvironmentPlugin([&apos;NODE_ENV&apos;])
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.EnvironmentPlugin([<span class="hljs-string">&apos;NODE_ENV&apos;</span>])
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x8FD9;&#x53E5;&#x4EE3;&#x7801;&#x5B9E;&#x9645;&#x4E0A;&#x7B49;&#x4EF7;&#x4E8E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
  &apos;process.env.NODE_ENV&apos;: JSON.stringify(process.env.NODE_ENV),
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs roboconf"><code>new webpack.DefinePlugin({
  &apos;<span class="hljs-attribute">process.env.NODE_ENV&apos;</span>: JSON<span class="hljs-variable">.stringify</span>(process<span class="hljs-variable">.env</span><span class="hljs-variable">.NODE_ENV</span>),
})
</code></pre>
<h2 id="articleHeader31">&#x7ED3;&#x5408; UglifyJS</h2>
<p>&#x5176;&#x5B9E;&#x4EE5;&#x4E0A;&#x8F93;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x4F18;&#x5316;&#xFF0C;&#x56E0;&#x4E3A; <code>if(true)</code> &#x8BED;&#x53E5;&#x6C38;&#x8FDC;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x524D;&#x4E00;&#x4E2A;&#x5206;&#x652F;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6700;&#x4F73;&#x7684;&#x8F93;&#x51FA;&#x5176;&#x5B9E;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&apos;&#x4F60;&#x6B63;&#x5728;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs autoit"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x4F60;&#x6B63;&#x5728;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&apos;</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>Webpack &#x6CA1;&#x6709;&#x5B9E;&#x73B0;&#x53BB;&#x9664;&#x6B7B;&#x4EE3;&#x7801;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F; UglifyJS &#x53EF;&#x4EE5;&#x505A;&#x8FD9;&#x4E2A;&#x4E8B;&#x60C5;&#xFF0C;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x8BF7;&#x9605;&#x8BFB; <a href="http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-8%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81.html" rel="nofollow noreferrer" target="_blank">&#x538B;&#x7F29;&#x4EE3;&#x7801;</a> &#x4E2D;&#x7684;&#x538B;&#x7F29; JavaScript&#x3002;</p>
<h2 id="articleHeader32">&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4E2D;&#x7684;&#x73AF;&#x5883;&#x533A;&#x5206;</h2>
<p>&#x9664;&#x4E86;&#x5728;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x6E90;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x6709;&#x73AF;&#x5883;&#x533A;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x5916;&#xFF0C;&#x5F88;&#x591A;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4E5F;&#x505A;&#x4E86;&#x73AF;&#x5883;&#x533A;&#x5206;&#x7684;&#x4F18;&#x5316;&#x3002; &#x4EE5; React &#x4E3A;&#x4F8B;&#xFF0C;&#x5B83;&#x505A;&#x4E86;&#x4E24;&#x5957;&#x73AF;&#x5883;&#x533A;&#x5206;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ol>
<li>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF1A;&#x5305;&#x542B;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x3001;HTML &#x5143;&#x7D20;&#x68C0;&#x67E5;&#x7B49;&#x7B49;&#x9488;&#x5BF9;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x8B66;&#x544A;&#x65E5;&#x5FD7;&#x4EE3;&#x7801;&#x3002;</li>
<li>&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#xFF1A;&#x53BB;&#x6389;&#x4E86;&#x6240;&#x6709;&#x9488;&#x5BF9;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x53EA;&#x4FDD;&#x7559;&#x8BA9; React &#x80FD;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x4EE5;&#x4F18;&#x5316;&#x5927;&#x5C0F;&#x548C;&#x6027;&#x80FD;&#x3002;</li>
</ol>
<p>&#x4F8B;&#x5982; React &#x6E90;&#x7801;&#x4E2D;&#x6709;&#x5927;&#x91CF;&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.env.NODE_ENV !== &apos;production&apos;) {
  warning(false, &apos;%s(...): Can only update a mounted or mounting component.... &apos;)
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-keyword">if</span> (process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> !== <span class="hljs-string">&apos;production&apos;</span>) {
  warning(false, <span class="hljs-string">&apos;%s(...): Can only update a mounted or mounting component.... &apos;</span>)
}
</code></pre>
<p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x5B9A;&#x4E49; <code>NODE_ENV=production</code> &#x90A3;&#x4E48;&#x8FD9;&#x4E9B;&#x8B66;&#x544A;&#x65E5;&#x5FD7;&#x5C31;&#x4F1A;&#x88AB;&#x5305;&#x542B;&#x5230;&#x8F93;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x975E;&#x5E38;&#x5927;&#x3002;</p>
<p><code>process.env.NODE_ENV !== &apos;production&apos;</code> &#x4E2D;&#x7684; <code>NODE_ENV</code> &#x548C; <code>&apos;production&apos;</code> &#x4E24;&#x4E2A;&#x503C;&#x662F;&#x793E;&#x533A;&#x7684;&#x7EA6;&#x5B9A;&#xFF0C;&#x901A;&#x5E38;&#x4F7F;&#x7528;&#x8FD9;&#x6761;&#x5224;&#x65AD;&#x8BED;&#x53E5;&#x5728;&#x533A;&#x5206;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#x3002;</p>
<h1 id="articleHeader33">&#x538B;&#x7F29;&#x4EE3;&#x7801;</h1>
<p>&#x6D4F;&#x89C8;&#x5668;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x8BBF;&#x95EE;&#x7F51;&#x9875;&#x65F6;&#x83B7;&#x53D6;&#x7684; JavaScript&#x3001;CSS &#x8D44;&#x6E90;&#x90FD;&#x662F;&#x6587;&#x672C;&#x5F62;&#x5F0F;&#x7684;&#xFF0C;&#x6587;&#x4EF6;&#x8D8A;&#x5927;&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x8D8A;&#x957F;&#x3002; &#x4E3A;&#x4E86;&#x63D0;&#x5347;&#x7F51;&#x9875;&#x52A0;&#x901F;&#x901F;&#x5EA6;&#x548C;&#x51CF;&#x5C11;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x6D41;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x3002; &#x538B;&#x7F29;&#x7684;&#x65B9;&#x6CD5;&#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>GZIP</code> &#x7B97;&#x6CD5;&#x5BF9;&#x6587;&#x4EF6;&#x538B;&#x7F29;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5BF9;&#x6587;&#x672C;&#x672C;&#x8EAB;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x3002;</p>
<p>&#x5BF9;&#x6587;&#x672C;&#x672C;&#x8EAB;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x7684;&#x4F5C;&#x7528;&#x9664;&#x4E86;&#x6709;&#x63D0;&#x5347;&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x7684;&#x4F18;&#x52BF;&#x5916;&#xFF0C;&#x8FD8;&#x5177;&#x6709;&#x6DF7;&#x6DC6;&#x6E90;&#x7801;&#x7684;&#x4F5C;&#x7528;&#x3002; &#x7531;&#x4E8E;&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x975E;&#x5E38;&#x5DEE;&#xFF0C;&#x5C31;&#x7B97;&#x522B;&#x4EBA;&#x4E0B;&#x8F7D;&#x5230;&#x4E86;&#x7F51;&#x9875;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x5927;&#x5927;&#x589E;&#x52A0;&#x4E86;&#x4EE3;&#x7801;&#x5206;&#x6790;&#x548C;&#x6539;&#x9020;&#x7684;&#x96BE;&#x5EA6;&#x3002;</p>
<p>&#x4E0B;&#x9762;&#x6765;&#x4E00;&#x4E00;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x5728; Webpack &#x4E2D;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x3002;</p>
<h2 id="articleHeader34">&#x538B;&#x7F29; JavaScript</h2>
<p>&#x76EE;&#x524D;&#x6700;&#x6210;&#x719F;&#x7684; JavaScript &#x4EE3;&#x7801;&#x538B;&#x7F29;&#x5DE5;&#x5177;&#x662F; UglifyJS &#xFF0C; &#x5B83;&#x4F1A;&#x5206;&#x6790; JavaScript &#x4EE3;&#x7801;&#x8BED;&#x6CD5;&#x6811;&#xFF0C;&#x7406;&#x89E3;&#x4EE3;&#x7801;&#x542B;&#x4E49;&#xFF0C;&#x4ECE;&#x800C;&#x80FD;&#x505A;&#x5230;&#x8BF8;&#x5982;&#x53BB;&#x6389;&#x65E0;&#x6548;&#x4EE3;&#x7801;&#x3001;&#x53BB;&#x6389;&#x65E5;&#x5FD7;&#x8F93;&#x51FA;&#x4EE3;&#x7801;&#x3001;&#x7F29;&#x77ED;&#x53D8;&#x91CF;&#x540D;&#x7B49;&#x4F18;&#x5316;&#x3002;</p>
<p>&#x8981;&#x5728; Webpack &#x4E2D;&#x63A5;&#x5165; UglifyJS &#x9700;&#x8981;&#x901A;&#x8FC7;&#x63D2;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x76EE;&#x524D;&#x6709;&#x4E24;&#x4E2A;&#x6210;&#x719F;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ul>
<li>
<code>UglifyJsPlugin</code>&#xFF1A;&#x901A;&#x8FC7;&#x5C01;&#x88C5; UglifyJS &#x5B9E;&#x73B0;&#x538B;&#x7F29;&#x3002;</li>
<li>
<code>ParallelUglifyPlugin</code>&#xFF1A;&#x591A;&#x8FDB;&#x7A0B;&#x5E76;&#x884C;&#x5904;&#x7406;&#x538B;&#x7F29;&#xFF0C;&#x4F7F;&#x7528; <a href="http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-4%E4%BD%BF%E7%94%A8ParallelUglifyPlugin.html" rel="nofollow noreferrer" target="_blank">ParallelUglifyPlugin</a> &#x4E2D;&#x6709;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</li>
</ul>
<p>&#x7531;&#x4E8E; ParallelUglifyPlugin &#x5728; 4-4&#x4F7F;&#x7528;ParallelUglifyPlugin &#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7;&#x5C31;&#x4E0D;&#x518D;&#x590D;&#x8FF0;&#xFF0C; &#x8FD9;&#x91CC;&#x91CD;&#x70B9;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x914D;&#x7F6E; UglifyJS &#x4EE5;&#x8FBE;&#x5230;&#x6700;&#x4F18;&#x7684;&#x538B;&#x7F29;&#x6548;&#x679C;&#x3002;</p>
<p>UglifyJS &#x63D0;&#x4F9B;&#x4E86;&#x975E;&#x5E38;&#x591A;&#x7684;&#x9009;&#x62E9;&#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x5728;&#x538B;&#x7F29;&#x8FC7;&#x7A0B;&#x4E2D;&#x91C7;&#x7528;&#x54EA;&#x4E9B;&#x89C4;&#x5219;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x9009;&#x9879;&#x8BF4;&#x660E;&#x53EF;&#x4EE5;&#x5728; &#x5176;&#x5B98;&#x65B9;&#x6587;&#x6863; &#x4E0A;&#x770B;&#x5230;&#x3002; &#x7531;&#x4E8E;&#x9009;&#x9879;&#x975E;&#x5E38;&#x591A;&#xFF0C;&#x5C31;&#x6311;&#x51FA;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x62FF;&#x51FA;&#x6765;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;&#x5176;&#x5E94;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul>
<li>
<code>sourceMap</code>&#xFF1A;&#x662F;&#x5426;&#x4E3A;&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684; Source Map&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x4E0D;&#x751F;&#x6210;&#xFF0C;&#x5F00;&#x542F;&#x540E;&#x8017;&#x65F6;&#x4F1A;&#x5927;&#x5927;&#x589E;&#x52A0;&#x3002;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x628A;&#x538B;&#x7F29;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x7684; Source Map &#x53D1;&#x9001;&#x7ED9;&#x7F51;&#x7AD9;&#x7528;&#x6237;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x800C;&#x662F;&#x7528;&#x4E8E;&#x5185;&#x90E8;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x8C03;&#x8BD5;&#x7EBF;&#x4E0A;&#x4EE3;&#x7801;&#x65F6;&#x4F7F;&#x7528;&#x3002;</li>
<li>
<code>beautify</code>&#xFF1A; &#x662F;&#x5426;&#x8F93;&#x51FA;&#x53EF;&#x8BFB;&#x6027;&#x8F83;&#x5F3A;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5373;&#x4F1A;&#x4FDD;&#x7559;&#x7A7A;&#x683C;&#x548C;&#x5236;&#x8868;&#x7B26;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x662F;&#xFF0C;&#x4E3A;&#x4E86;&#x8FBE;&#x5230;&#x66F4;&#x597D;&#x7684;&#x538B;&#x7F29;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A; false&#x3002;</li>
<li>
<code>comments</code>&#xFF1A;&#x662F;&#x5426;&#x4FDD;&#x7559;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x4FDD;&#x7559;&#xFF0C;&#x4E3A;&#x4E86;&#x8FBE;&#x5230;&#x66F4;&#x597D;&#x7684;&#x538B;&#x7F29;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A; <code>false</code>&#x3002;</li>
<li>
<code>compress.warnings</code>&#xFF1A;&#x662F;&#x5426;&#x5728; UglifyJs &#x5220;&#x9664;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x8F93;&#x51FA;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x8F93;&#x51FA;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A; <code>false</code> &#x4EE5;&#x5173;&#x95ED;&#x8FD9;&#x4E9B;&#x4F5C;&#x7528;&#x4E0D;&#x5927;&#x7684;&#x8B66;&#x544A;&#x3002;</li>
<li>
<code>drop_console</code>&#xFF1A;&#x662F;&#x5426;&#x5254;&#x9664;&#x4EE3;&#x7801;&#x4E2D;&#x6240;&#x6709;&#x7684; <code>console</code> &#x8BED;&#x53E5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x4E0D;&#x5254;&#x9664;&#x3002;&#x5F00;&#x542F;&#x540E;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x63D0;&#x5347;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x6548;&#x679C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;&#x4E0D;&#x652F;&#x6301; <code>console</code> &#x8BED;&#x53E5; IE &#x6D4F;&#x89C8;&#x5668;&#x3002;</li>
<li>
<code>collapse_vars</code>&#xFF1A;&#x662F;&#x5426;&#x5185;&#x5D4C;&#x5B9A;&#x4E49;&#x4E86;&#x4F46;&#x662F;&#x53EA;&#x7528;&#x5230;&#x4E00;&#x6B21;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4F8B;&#x5982;&#x628A; <code>var x = 5; y = x </code>&#x8F6C;&#x6362;&#x6210;<code> y = 5</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x4E0D;&#x8F6C;&#x6362;&#x3002;&#x4E3A;&#x4E86;&#x8FBE;&#x5230;&#x66F4;&#x597D;&#x7684;&#x538B;&#x7F29;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A; <code>false</code>&#x3002;</li>
<li>
<code>reduce_vars</code>&#xFF1A; &#x662F;&#x5426;&#x63D0;&#x53D6;&#x51FA;&#x51FA;&#x73B0;&#x591A;&#x6B21;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x6210;&#x53D8;&#x91CF;&#x53BB;&#x5F15;&#x7528;&#x7684;&#x9759;&#x6001;&#x503C;&#xFF0C;&#x4F8B;&#x5982;&#x628A; <code>x = &apos;Hello&apos;; y = &apos;Hello&apos;</code> &#x8F6C;&#x6362;&#x6210; <code>var a = &apos;Hello&apos;; x = a; y = b</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x4E0D;&#x8F6C;&#x6362;&#x3002;&#x4E3A;&#x4E86;&#x8FBE;&#x5230;&#x66F4;&#x597D;&#x7684;&#x538B;&#x7F29;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A; <code>false</code>&#x3002;</li>
</ul>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5728;&#x4E0D;&#x5F71;&#x54CD;&#x4EE3;&#x7801;&#x6B63;&#x786E;&#x6267;&#x884C;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#xFF0C;&#x6700;&#x4F18;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x914D;&#x7F6E;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const UglifyJSPlugin = require(&apos;webpack/lib/optimize/UglifyJsPlugin&apos;);

module.exports = {
  plugins: [
    // &#x538B;&#x7F29;&#x8F93;&#x51FA;&#x7684; JS &#x4EE3;&#x7801;
    new UglifyJSPlugin({
      compress: {
        // &#x5728;UglifyJs&#x5220;&#x9664;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x4E0D;&#x8F93;&#x51FA;&#x8B66;&#x544A;
        warnings: false,
        // &#x5220;&#x9664;&#x6240;&#x6709;&#x7684; `console` &#x8BED;&#x53E5;&#xFF0C;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;ie&#x6D4F;&#x89C8;&#x5668;
        drop_console: true,
        // &#x5185;&#x5D4C;&#x5B9A;&#x4E49;&#x4E86;&#x4F46;&#x662F;&#x53EA;&#x7528;&#x5230;&#x4E00;&#x6B21;&#x7684;&#x53D8;&#x91CF;
        collapse_vars: true,
        // &#x63D0;&#x53D6;&#x51FA;&#x51FA;&#x73B0;&#x591A;&#x6B21;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x6210;&#x53D8;&#x91CF;&#x53BB;&#x5F15;&#x7528;&#x7684;&#x9759;&#x6001;&#x503C;
        reduce_vars: true,
      },
      output: {
        // &#x6700;&#x7D27;&#x51D1;&#x7684;&#x8F93;&#x51FA;
        beautify: false,
        // &#x5220;&#x9664;&#x6240;&#x6709;&#x7684;&#x6CE8;&#x91CA;
        comments: false,
      }
    }),
  ],
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">UglifyJSPlugin</span> <span class="hljs-string">=</span> <span class="hljs-string">require(&apos;webpack/lib/optimize/UglifyJsPlugin&apos;);</span>

<span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">//</span> <span class="hljs-string">&#x538B;&#x7F29;&#x8F93;&#x51FA;&#x7684;</span> <span class="hljs-string">JS</span> <span class="hljs-string">&#x4EE3;&#x7801;</span>
    <span class="hljs-string">new</span> <span class="hljs-string">UglifyJSPlugin({</span>
<span class="hljs-attr">      compress:</span> <span class="hljs-string">{</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x5728;UglifyJs&#x5220;&#x9664;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#x4E0D;&#x8F93;&#x51FA;&#x8B66;&#x544A;</span>
<span class="hljs-attr">        warnings:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x5220;&#x9664;&#x6240;&#x6709;&#x7684;</span> <span class="hljs-string">`console`</span> <span class="hljs-string">&#x8BED;&#x53E5;&#xFF0C;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;ie&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-attr">        drop_console:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x5185;&#x5D4C;&#x5B9A;&#x4E49;&#x4E86;&#x4F46;&#x662F;&#x53EA;&#x7528;&#x5230;&#x4E00;&#x6B21;&#x7684;&#x53D8;&#x91CF;</span>
<span class="hljs-attr">        collapse_vars:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x63D0;&#x53D6;&#x51FA;&#x51FA;&#x73B0;&#x591A;&#x6B21;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x6210;&#x53D8;&#x91CF;&#x53BB;&#x5F15;&#x7528;&#x7684;&#x9759;&#x6001;&#x503C;</span>
<span class="hljs-attr">        reduce_vars:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      output:</span> <span class="hljs-string">{</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x6700;&#x7D27;&#x51D1;&#x7684;&#x8F93;&#x51FA;</span>
<span class="hljs-attr">        beautify:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x5220;&#x9664;&#x6240;&#x6709;&#x7684;&#x6CE8;&#x91CA;</span>
<span class="hljs-attr">        comments:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">}),</span>
  <span class="hljs-string">],</span>
<span class="hljs-string">};</span>
</code></pre>
<p>&#x4ECE;&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA; Webpack &#x5185;&#x7F6E;&#x4E86; UglifyJsPlugin&#xFF0C;&#x9700;&#x8981;&#x6307;&#x51FA;&#x7684;&#x662F; UglifyJsPlugin &#x5F53;&#x524D;&#x91C7;&#x7528;&#x7684;&#x662F; UglifyJS2 &#x800C;&#x4E0D;&#x662F;&#x8001;&#x7684; UglifyJS1&#xFF0C; &#x8FD9;&#x4E24;&#x4E2A;&#x7248;&#x672C;&#x7684; UglifyJS &#x5728;&#x914D;&#x7F6E;&#x4E0A;&#x6709;&#x6240;&#x533A;&#x522B;&#xFF0C;&#x770B;&#x6587;&#x6863;&#x65F6;&#x6CE8;&#x610F;&#x7248;&#x672C;&#x3002;</p>
<p>&#x9664;&#x6B64;&#x4E4B;&#x5916; Webpack &#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x66F4;&#x7B80;&#x4FBF;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x63A5;&#x5165; UglifyJSPlugin&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A; <code>--optimize-minimize</code> &#x53C2;&#x6570;&#xFF0C;&#x5373; <code>webpack --optimize-minimize</code>&#xFF0C; &#x8FD9;&#x6837; Webpack &#x4F1A;&#x81EA;&#x52A8;&#x4E3A;&#x4F60;&#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x5E26;&#x6709;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x7684; UglifyJSPlugin&#x3002;</p>
<h2 id="articleHeader35">&#x538B;&#x7F29; ES6</h2>
<p>&#x867D;&#x7136;&#x5F53;&#x524D;&#x5927;&#x591A;&#x6570; JavaScript &#x5F15;&#x64CE;&#x8FD8;&#x4E0D;&#x5B8C;&#x5168;&#x652F;&#x6301; ES6 &#x4E2D;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x4F46;&#x5728;&#x4E00;&#x4E9B;&#x7279;&#x5B9A;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E0B;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6267;&#x884C; ES6 &#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x4F8B;&#x5982;&#x6700;&#x65B0;&#x7248;&#x7684; Chrome&#x3001;ReactNative &#x7684;&#x5F15;&#x64CE; JavaScriptCore&#x3002;</p>
<p>&#x8FD0;&#x884C; ES6 &#x7684;&#x4EE3;&#x7801;&#x76F8;&#x6BD4;&#x4E8E;&#x8F6C;&#x6362;&#x540E;&#x7684; ES5 &#x4EE3;&#x7801;&#x6709;&#x5982;&#x4E0B;&#x4F18;&#x70B9;&#xFF1A;</p>
<ul>
<li>&#x4E00;&#x6837;&#x7684;&#x903B;&#x8F91;&#x7528; ES6 &#x5B9E;&#x73B0;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x6BD4; ES5 &#x66F4;&#x5C11;&#x3002;</li>
<li>JavaScript &#x5F15;&#x64CE;&#x5BF9; ES6 &#x4E2D;&#x7684;&#x8BED;&#x6CD5;&#x505A;&#x4E86;&#x6027;&#x80FD;&#x4F18;&#x5316;&#xFF0C;&#x4F8B;&#x5982;&#x9488;&#x5BF9; <code>const</code> &#x7533;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x6709;&#x66F4;&#x5FEB;&#x7684;&#x8BFB;&#x53D6;&#x901F;&#x5EA6;&#x3002;</li>
</ul>
<p>&#x6240;&#x4EE5;&#x5728;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x5141;&#x8BB8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684; ES6 &#x4EE3;&#x7801;&#x53BB;&#x8FD0;&#x884C;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8F6C;&#x6362;&#x540E;&#x7684; ES5 &#x4EE3;&#x7801;&#x3002;</p>
<p>&#x5728;&#x4F60;&#x7528;&#x4E0A;&#x9762;&#x6240;&#x8BB2;&#x7684;&#x538B;&#x7F29;&#x65B9;&#x6CD5;&#x53BB;&#x538B;&#x7F29; ES6 &#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0; UglifyJS &#x4F1A;&#x62A5;&#x9519;&#x9000;&#x51FA;&#xFF0C;&#x539F;&#x56E0;&#x662F; UglifyJS &#x53EA;&#x8BA4;&#x8BC6; ES5 &#x8BED;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#x3002; &#x4E3A;&#x4E86;&#x538B;&#x7F29; ES6 &#x4EE3;&#x7801;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4E13;&#x95E8;&#x9488;&#x5BF9; ES6 &#x4EE3;&#x7801;&#x7684; UglifyES&#x3002;</p>
<p>UglifyES &#x548C; UglifyJS &#x6765;&#x81EA;&#x540C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x4E0D;&#x540C;&#x5206;&#x652F;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x57FA;&#x672C;&#x76F8;&#x540C;&#xFF0C;&#x53EA;&#x662F;&#x63A5;&#x5165; Webpack &#x65F6;&#x6709;&#x6240;&#x533A;&#x522B;&#x3002; &#x5728;&#x7ED9; Webpack &#x63A5;&#x5165; UglifyES &#x65F6;&#xFF0C;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x5185;&#x7F6E;&#x7684; UglifyJsPlugin&#xFF0C;&#x800C;&#x662F;&#x9700;&#x8981;&#x5355;&#x72EC;&#x5B89;&#x88C5;&#x548C;&#x4F7F;&#x7528;&#x6700;&#x65B0;&#x7248;&#x672C;&#x7684; <code>uglifyjs-webpack-plugin</code>&#x3002; &#x5B89;&#x88C5;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D uglifyjs-webpack-plugin@beta
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> i -D uglifyjs-webpack-plugin@beta
</code></pre>
<p>Webpack &#x76F8;&#x5173;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;465&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;ELqbWw&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;Webpack&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/ELqbWw/" rel="nofollow noreferrer" target="_blank">Webpack</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/ELqbWw/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x540C;&#x65F6;&#xFF0C;&#x4E3A;&#x4E86;&#x4E0D;&#x8BA9; <code>babel-loader</code> &#x8F93;&#x51FA; ES5 &#x8BED;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x9700;&#x8981;&#x53BB;&#x6389; <code>.babelrc</code> &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x7684; <code>babel-preset-env</code>&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x5B83;&#x7684; Babel &#x63D2;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982; <code>babel-preset-react</code> &#x8FD8;&#x662F;&#x8981;&#x4FDD;&#x7559;&#xFF0C; &#x56E0;&#x4E3A;&#x6B63;&#x662F; <code>babel-preset-env</code> &#x8D1F;&#x8D23;&#x628A; ES6 &#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x4E3A; ES5 &#x4EE3;&#x7801;&#x3002;</p>
<h2 id="articleHeader36">&#x538B;&#x7F29; CSS</h2>
<p>CSS &#x4EE3;&#x7801;&#x4E5F;&#x53EF;&#x4EE5;&#x50CF; JavaScript &#x90A3;&#x6837;&#x88AB;&#x538B;&#x7F29;&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x63D0;&#x5347;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x548C;&#x4EE3;&#x7801;&#x6DF7;&#x6DC6;&#x7684;&#x4F5C;&#x7528;&#x3002; &#x76EE;&#x524D;&#x6BD4;&#x8F83;&#x6210;&#x719F;&#x53EF;&#x9760;&#x7684; CSS &#x538B;&#x7F29;&#x5DE5;&#x5177;&#x662F; cssnano&#xFF0C;&#x57FA;&#x4E8E; PostCSS&#x3002;</p>
<p><code>cssnano</code> &#x80FD;&#x7406;&#x89E3; CSS &#x4EE3;&#x7801;&#x7684;&#x542B;&#x4E49;&#xFF0C;&#x800C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x5220;&#x6389;&#x7A7A;&#x683C;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<ul>
<li>
<code>margin: 10px 20px 10px 20px</code> &#x88AB;&#x538B;&#x7F29;&#x6210; <code>margin: 10px 20px</code>
</li>
<li>
<code>color: #ff0000</code> &#x88AB;&#x538B;&#x7F29;&#x6210; <code>color:red</code>
</li>
</ul>
<p>&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x538B;&#x7F29;&#x89C4;&#x5219;&#x53EF;&#x4EE5;&#x53BB;&#x5176;&#x5B98;&#x7F51;&#x67E5;&#x770B;&#xFF0C;&#x901A;&#x5E38;&#x538B;&#x7F29;&#x7387;&#x80FD;&#x8FBE;&#x5230; 60%&#x3002;</p>
<p>&#x628A; <code>cssnano</code> &#x63A5;&#x5165;&#x5230; Webpack &#x4E2D;&#x4E5F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A; <code>css-loader</code> &#x5DF2;&#x7ECF;&#x5C06;&#x5176;&#x5185;&#x7F6E;&#x4E86;&#xFF0C;&#x8981;&#x5F00;&#x542F; <code>cssnano</code> &#x53BB;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x53EA;&#x9700;&#x8981;&#x5F00;&#x542F; <code>css-loader</code> &#x7684; <code>minimize</code> &#x9009;&#x9879;&#x3002; &#x76F8;&#x5173; Webpack &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;565&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;rvXYwm&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;cssnano&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/rvXYwm/" rel="nofollow noreferrer" target="_blank">cssnano</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/rvXYwm/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<h1 id="articleHeader37">CDN &#x52A0;&#x901F;</h1>
<p>&#x867D;&#x7136;&#x524D;&#x9762;&#x901A;&#x8FC7;&#x4E86;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x7684;&#x624B;&#x6BB5;&#x6765;&#x51CF;&#x5C0F;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x5927;&#x5C0F;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6700;&#x5F71;&#x54CD;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x7684;&#x8FD8;&#x662F;&#x7F51;&#x9875;&#x9996;&#x6B21;&#x6253;&#x5F00;&#x65F6;&#x7684;&#x52A0;&#x8F7D;&#x7B49;&#x5F85;&#x3002; &#x5BFC;&#x81F4;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x6839;&#x672C;&#x662F;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x8FC7;&#x7A0B;&#x8017;&#x65F6;&#x5927;&#xFF0C;CDN &#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x52A0;&#x901F;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x3002;</p>
<p>CDN &#x53C8;&#x53EB;<code>&#x5185;&#x5BB9;&#x5206;&#x53D1;&#x7F51;&#x7EDC;</code>&#xFF0C;&#x901A;&#x8FC7;&#x628A;&#x8D44;&#x6E90;&#x90E8;&#x7F72;&#x5230;&#x4E16;&#x754C;&#x5404;&#x5730;&#xFF0C;&#x7528;&#x6237;&#x5728;&#x8BBF;&#x95EE;&#x65F6;&#x6309;&#x7167;&#x5C31;&#x8FD1;&#x539F;&#x5219;&#x4ECE;&#x79BB;&#x7528;&#x6237;&#x6700;&#x8FD1;&#x7684;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x8D44;&#x6E90;&#xFF0C;&#x4ECE;&#x800C;&#x52A0;&#x901F;&#x8D44;&#x6E90;&#x7684;&#x83B7;&#x53D6;&#x901F;&#x5EA6;&#x3002; CDN &#x5176;&#x5B9E;&#x662F;&#x901A;&#x8FC7;&#x4F18;&#x5316;&#x7269;&#x7406;&#x94FE;&#x8DEF;&#x5C42;&#x4F20;&#x8F93;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x5149;&#x901F;&#x6709;&#x9650;&#x3001;&#x4E22;&#x5305;&#x7B49;&#x95EE;&#x9898;&#x6765;&#x63D0;&#x5347;&#x7F51;&#x901F;&#x7684;&#xFF0C;&#x5176;&#x5927;&#x81F4;&#x539F;&#x7406;&#x53EF;&#x4EE5;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&#x5728;&#x672C;&#x8282;&#x4E2D;&#x4F60;&#x4E0D;&#x5FC5;&#x7406;&#x89E3; CDN &#x7684;&#x5177;&#x4F53;&#x8FD0;&#x884C;&#x6D41;&#x7A0B;&#x548C;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x628A; CDN &#x670D;&#x52A1;&#x770B;&#x4F5C;&#x6210;&#x901F;&#x5EA6;&#x66F4;&#x5FEB;&#x7684; HTTP &#x670D;&#x52A1;&#x3002; &#x5E76;&#x4E14;&#x76EE;&#x524D;&#x5F88;&#x591A;&#x5927;&#x516C;&#x53F8;&#x90FD;&#x4F1A;&#x5EFA;&#x7ACB;&#x81EA;&#x5DF1;&#x7684; CDN &#x670D;&#x52A1;&#xFF0C;&#x5C31;&#x7B97;&#x4F60;&#x81EA;&#x5DF1;&#x6CA1;&#x6709;&#x8D44;&#x6E90;&#x53BB;&#x642D;&#x5EFA;&#x4E00;&#x5957; CDN &#x670D;&#x52A1;&#xFF0C;&#x5404;&#x5927;&#x4E91;&#x670D;&#x52A1;&#x63D0;&#x4F9B;&#x5546;&#x90FD;&#x63D0;&#x4F9B;&#x4E86;&#x6309;&#x91CF;&#x6536;&#x8D39;&#x7684; CDN &#x670D;&#x52A1;&#x3002;</p>
<h2 id="articleHeader38">&#x63A5;&#x5165; CDN</h2>
<p>&#x8981;&#x7ED9;&#x7F51;&#x7AD9;&#x63A5;&#x5165; CDN&#xFF0C;&#x9700;&#x8981;&#x628A;&#x7F51;&#x9875;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x4E0A;&#x4F20;&#x5230; CDN &#x670D;&#x52A1;&#x4E0A;&#x53BB;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x8FD9;&#x4E9B;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x901A;&#x8FC7; CDN &#x670D;&#x52A1;&#x63D0;&#x4F9B;&#x7684; URL &#x5730;&#x5740;&#x53BB;&#x8BBF;&#x95EE;&#x3002;</p>
<p>&#x4E3E;&#x4E2A;&#x8BE6;&#x7EC6;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x6784;&#x5EFA;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist
|-- app_9d89c964.js
|-- app_a6976b6d.css
|-- arch_ae805d49.png
`-- index.html
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>dist
|<span class="hljs-comment">-- app_9d89c964.js</span>
|<span class="hljs-comment">-- app_a6976b6d.css</span>
|<span class="hljs-comment">-- arch_ae805d49.png</span>
`<span class="hljs-comment">-- index.html</span>
</code></pre>
<p>&#x5176;&#x4E2D; <code>index.html</code> &#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;app_a6976b6d.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;app_9d89c964.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;app_a6976b6d.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;app_9d89c964.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><code>app_a6976b6d.css</code>&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{background:url(arch_ae805d49.png) repeat}h1{color:red}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(arch_ae805d49.png) repeat}<span class="hljs-selector-tag">h1</span>{<span class="hljs-attribute">color</span>:red}
</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x5230;&#x5BFC;&#x5165;&#x8D44;&#x6E90;&#x65F6;&#x90FD;&#x662F;&#x901A;&#x8FC7;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x53BB;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x5F53;&#x628A;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#x90FD;&#x653E;&#x5230;&#x540C;&#x4E00;&#x4E2A; CDN &#x670D;&#x52A1;&#x4E0A;&#x53BB;&#x65F6;&#xFF0C;&#x7F51;&#x9875;&#x662F;&#x80FD;&#x6B63;&#x5E38;&#x4F7F;&#x7528;&#x7684;&#x3002; &#x4F46;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x7531;&#x4E8E; CDN &#x670D;&#x52A1;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x7ED9;&#x8D44;&#x6E90;&#x5F00;&#x542F;&#x5F88;&#x957F;&#x65F6;&#x95F4;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x4F8B;&#x5982;&#x7528;&#x6237;&#x4ECE; CDN &#x4E0A;&#x83B7;&#x53D6;&#x5230;&#x4E86; <code>index.html</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x540E;&#xFF0C; &#x5373;&#x4F7F;&#x4E4B;&#x540E;&#x7684;&#x53D1;&#x5E03;&#x64CD;&#x4F5C;&#x628A; <code>index.html</code> &#x6587;&#x4EF6;&#x7ED9;&#x91CD;&#x65B0;&#x8986;&#x76D6;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x7528;&#x6237;&#x5728;&#x5F88;&#x957F;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x5185;&#x8FD8;&#x662F;&#x8FD0;&#x884C;&#x7684;&#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x8FD9;&#x4F1A;&#x65B0;&#x7684;&#x5BFC;&#x81F4;&#x53D1;&#x5E03;&#x4E0D;&#x80FD;&#x7ACB;&#x5373;&#x751F;&#x6548;&#x3002;</p>
<p>&#x8981;&#x907F;&#x514D;&#x4EE5;&#x4E0A;&#x95EE;&#x9898;&#xFF0C;&#x4E1A;&#x754C;&#x6BD4;&#x8F83;&#x6210;&#x719F;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p>
<ul>
<li>&#x9488;&#x5BF9; HTML &#x6587;&#x4EF6;&#xFF1A;&#x4E0D;&#x5F00;&#x542F;&#x7F13;&#x5B58;&#xFF0C;&#x628A; HTML &#x653E;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x800C;&#x4E0D;&#x662F; CDN &#x670D;&#x52A1;&#x4E0A;&#xFF0C;&#x540C;&#x65F6;&#x5173;&#x95ED;&#x81EA;&#x5DF1;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x7F13;&#x5B58;&#x3002;&#x81EA;&#x5DF1;&#x7684;&#x670D;&#x52A1;&#x5668;&#x53EA;&#x63D0;&#x4F9B; HTML &#x6587;&#x4EF6;&#x548C;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x3002;</li>
<li>&#x9488;&#x5BF9;&#x9759;&#x6001;&#x7684; JavaScript&#x3001;CSS&#x3001;&#x56FE;&#x7247;&#x7B49;&#x6587;&#x4EF6;&#xFF1A;&#x5F00;&#x542F; CDN &#x548C;&#x7F13;&#x5B58;&#xFF0C;&#x4E0A;&#x4F20;&#x5230; CDN &#x670D;&#x52A1;&#x4E0A;&#x53BB;&#xFF0C;&#x540C;&#x65F6;&#x7ED9;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x540D;&#x5E26;&#x4E0A;&#x7531;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7B97;&#x51FA;&#x7684; Hash &#x503C;&#xFF0C; &#x4F8B;&#x5982;&#x4E0A;&#x9762;&#x7684; <code>app_a6976b6d.css</code> &#x6587;&#x4EF6;&#x3002; &#x5E26;&#x4E0A; Hash &#x503C;&#x7684;&#x539F;&#x56E0;&#x662F;&#x6587;&#x4EF6;&#x540D;&#x4F1A;&#x968F;&#x7740;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x800C;&#x53D8;&#x5316;&#xFF0C;&#x53EA;&#x8981;&#x6587;&#x4EF6;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x5176;&#x5BF9;&#x5E94;&#x7684; URL &#x5C31;&#x4F1A;&#x53D8;&#x5316;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x4E0B;&#x8F7D;&#xFF0C;&#x65E0;&#x8BBA;&#x7F13;&#x5B58;&#x65F6;&#x95F4;&#x6709;&#x591A;&#x957F;&#x3002;</li>
</ul>
<p>&#x91C7;&#x7528;&#x4EE5;&#x4E0A;&#x65B9;&#x6848;&#x540E;&#xFF0C;&#x5728; HTML &#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x8D44;&#x6E90;&#x5F15;&#x5165;&#x5730;&#x5740;&#x4E5F;&#x9700;&#x8981;&#x6362;&#x6210; CDN &#x670D;&#x52A1;&#x63D0;&#x4F9B;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x4F8B;&#x5982;&#x4EE5;&#x4E0A;&#x7684; <code>index.html</code> &#x53D8;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;//cdn.com/id/app_a6976b6d.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;//cdn.com/id/app_9d89c964.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;//cdn.com/id/app_a6976b6d.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;//cdn.com/id/app_9d89c964.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>&#x5E76;&#x4E14; <code>app_a6976b6d.css</code> &#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x5E94;&#x8BE5;&#x53D8;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4E4B;&#x524D;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x90FD;&#x53D8;&#x6210;&#x4E86;&#x7EDD;&#x5BF9;&#x7684;&#x6307;&#x5411; CDN &#x670D;&#x52A1;&#x7684; URL &#x5730;&#x5740;&#x3002;</p>
<blockquote>&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x5F62;&#x5982; <code>//cdn.com/id/app_a6976b6d.css</code> &#x8FD9;&#x6837;&#x7684; URL &#x611F;&#x5230;&#x964C;&#x751F;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x77E5;&#x9053;&#x8FD9;&#x79CD; URL &#x7701;&#x6389;&#x4E86;&#x524D;&#x9762;&#x7684; <code>http:</code> &#x6216;&#x8005; <code>https:</code> &#x524D;&#x7F00;&#xFF0C; &#x8FD9;&#x6837;&#x505A;&#x7684;&#x597D;&#x5904;&#x65F6;&#x5728;&#x8BBF;&#x95EE;&#x8FD9;&#x4E9B;&#x8D44;&#x6E90;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x81EA;&#x52A8;&#x7684;&#x6839;&#x636E;&#x5F53;&#x524D; HTML &#x7684; URL &#x662F;&#x91C7;&#x7528;&#x4EC0;&#x4E48;&#x6A21;&#x5F0F;&#x53BB;&#x51B3;&#x5B9A;&#x662F;&#x91C7;&#x7528; HTTP &#x8FD8;&#x662F; HTTPS &#x6A21;&#x5F0F;&#x3002;</blockquote>
<p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x77E5;&#x9053;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x4E00;&#x4E2A;&#x89C4;&#x5219;&#x662F;&#x540C;&#x4E00;&#x65F6;&#x523B;&#x9488;&#x5BF9;&#x540C;&#x4E00;&#x4E2A;&#x57DF;&#x540D;&#x7684;&#x8D44;&#x6E90;&#x5E76;&#x884C;&#x8BF7;&#x6C42;&#x662F;&#x6709;&#x9650;&#x5236;&#x7684;&#x8BDD;&#xFF08;&#x5177;&#x4F53;&#x6570;&#x5B57;&#x5927;&#x6982;4&#x4E2A;&#x5DE6;&#x53F3;&#xFF0C;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x80FD;&#x4E0D;&#x540C;&#xFF09;&#xFF0C; &#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4E0A;&#x9762;&#x7684;&#x505A;&#x6CD5;&#x6709;&#x4E2A;&#x5F88;&#x5927;&#x7684;&#x95EE;&#x9898;&#x3002;&#x7531;&#x4E8E;&#x6240;&#x6709;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x90FD;&#x653E;&#x5230;&#x4E86;&#x540C;&#x4E00;&#x4E2A; CDN &#x670D;&#x52A1;&#x7684;&#x57DF;&#x540D;&#x4E0B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x7684; <code>cdn.com</code>&#x3002; &#x5982;&#x679C;&#x7F51;&#x9875;&#x7684;&#x8D44;&#x6E90;&#x5F88;&#x591A;&#xFF0C;&#x4F8B;&#x5982;&#x6709;&#x5F88;&#x591A;&#x56FE;&#x7247;&#xFF0C;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x8D44;&#x6E90;&#x7684;&#x52A0;&#x8F7D;&#x88AB;&#x963B;&#x585E;&#xFF0C;&#x56E0;&#x4E3A;&#x540C;&#x65F6;&#x53EA;&#x80FD;&#x52A0;&#x8F7D;&#x51E0;&#x4E2A;&#xFF0C;&#x5FC5;&#x987B;&#x7B49;&#x5176;&#x5B83;&#x8D44;&#x6E90;&#x52A0;&#x8F7D;&#x5B8C;&#x624D;&#x80FD;&#x7EE7;&#x7EED;&#x52A0;&#x8F7D;&#x3002; &#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E9B;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5206;&#x6563;&#x5230;&#x4E0D;&#x540C;&#x7684; CDN &#x670D;&#x52A1;&#x4E0A;&#x53BB;&#xFF0C; &#x4F8B;&#x5982;&#x628A; JavaScript &#x6587;&#x4EF6;&#x653E;&#x5230; <code>js.cdn.com</code> &#x57DF;&#x540D;&#x4E0B;&#x3001;&#x628A; CSS &#x6587;&#x4EF6;&#x653E;&#x5230; <code>css.cdn.com</code> &#x57DF;&#x540D;&#x4E0B;&#x3001;&#x56FE;&#x7247;&#x6587;&#x4EF6;&#x653E;&#x5230; <code>img.cdn.com</code> &#x57DF;&#x540D;&#x4E0B;&#xFF0C; &#x8FD9;&#x6837;&#x505A;&#x4E4B;&#x540E; <code>index.html</code> &#x9700;&#x8981;&#x53D8;&#x6210;&#x8FD9;&#x6837;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;//css.cdn.com/id/app_a6976b6d.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;//js.cdn.com/id/app_9d89c964.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;//css.cdn.com/id/app_a6976b6d.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;//js.cdn.com/id/app_9d89c964.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<blockquote>&#x4F7F;&#x7528;&#x4E86;&#x591A;&#x4E2A;&#x57DF;&#x540D;&#x540E;&#x53C8;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E2A;&#x65B0;&#x95EE;&#x9898;&#xFF1A;&#x589E;&#x52A0;&#x57DF;&#x540D;&#x89E3;&#x6790;&#x65F6;&#x95F4;&#x3002;&#x662F;&#x5426;&#x91C7;&#x7528;&#x591A;&#x57DF;&#x540D;&#x5206;&#x6563;&#x8D44;&#x6E90;&#x9700;&#x8981;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x9700;&#x6C42;&#x53BB;&#x8861;&#x91CF;&#x5F97;&#x5931;&#x3002; &#x5F53;&#x7136;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5728; HTML HEAD &#x6807;&#x7B7E;&#x4E2D; &#x52A0;&#x5165; &lt;link rel=&quot;dns-prefetch&quot; href=&quot;//js.cdn.com&quot;&gt; &#x53BB;&#x9884;&#x89E3;&#x6790;&#x57DF;&#x540D;&#xFF0C;&#x4EE5;&#x964D;&#x4F4E;&#x57DF;&#x540D;&#x89E3;&#x6790;&#x5E26;&#x6765;&#x7684;&#x5EF6;&#x8FDF;&#x3002;</blockquote>
<h2 id="articleHeader39">&#x7528; Webpack &#x5B9E;&#x73B0; CDN &#x7684;&#x63A5;&#x5165;</h2>
<p>&#x603B;&#x7ED3;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;&#xFF0C;&#x6784;&#x5EFA;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p>
<ul>
<li>&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x5BFC;&#x5165; URL &#x9700;&#x8981;&#x53D8;&#x6210;&#x6307;&#x5411; CDN &#x670D;&#x52A1;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x7684; URL &#x800C;&#x4E0D;&#x662F;&#x76F8;&#x5BF9;&#x4E8E; HTML &#x6587;&#x4EF6;&#x7684; URL&#x3002;</li>
<li>&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x79F0;&#x9700;&#x8981;&#x5E26;&#x4E0A;&#x6709;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7B97;&#x51FA;&#x6765;&#x7684; Hash &#x503C;&#xFF0C;&#x4EE5;&#x9632;&#x6B62;&#x88AB;&#x7F13;&#x5B58;&#x3002;</li>
<li>&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x8D44;&#x6E90;&#x653E;&#x5230;&#x4E0D;&#x540C;&#x57DF;&#x540D;&#x7684; CDN &#x670D;&#x52A1;&#x4E0A;&#x53BB;&#xFF0C;&#x4EE5;&#x9632;&#x6B62;&#x8D44;&#x6E90;&#x7684;&#x5E76;&#x884C;&#x52A0;&#x8F7D;&#x88AB;&#x963B;&#x585E;&#x3002;</li>
</ul>
<p>&#x5148;&#x6765;&#x770B;&#x4E0B;&#x8981;&#x5B9E;&#x73B0;&#x4EE5;&#x4E0A;&#x8981;&#x6C42;&#x7684;&#x6700;&#x7EC8; Webpack &#x914D;&#x7F6E;&#xFF1A;</p>
<p>&lt;p data-height=&quot;565&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;ELqbwb&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;CDN &#x7684;&#x63A5;&#x5165;&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/ELqbwb/" rel="nofollow noreferrer" target="_blank">CDN &#x7684;&#x63A5;&#x5165;</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/ELqbwb/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;    </p>
<p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x4E2D;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x90E8;&#x5206;&#x662F;&#x901A;&#x8FC7; <code>publicPath</code> &#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x5B58;&#x653E;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684; CDN &#x76EE;&#x5F55; URL&#xFF0C; &#x4E3A;&#x4E86;&#x8BA9;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x8D44;&#x6E90;&#x8F93;&#x51FA;&#x5230;&#x4E0D;&#x540C;&#x7684; CDN&#xFF0C;&#x9700;&#x8981;&#x5206;&#x522B;&#x5728;&#xFF1A;</p>
<ul>
<li>
<code>output.publicPath</code> &#x4E2D;&#x8BBE;&#x7F6E; JavaScript &#x7684;&#x5730;&#x5740;&#x3002;</li>
<li>
<code>css-loader.publicPath</code> &#x4E2D;&#x8BBE;&#x7F6E;&#x88AB; CSS &#x5BFC;&#x5165;&#x7684;&#x8D44;&#x6E90;&#x7684;&#x7684;&#x5730;&#x5740;&#x3002;</li>
<li>
<code>WebPlugin.stylePublicPath</code> &#x4E2D;&#x8BBE;&#x7F6E; CSS &#x6587;&#x4EF6;&#x7684;&#x5730;&#x5740;&#x3002;</li>
</ul>
<p>&#x8BBE;&#x7F6E;&#x597D; <code>publicPath</code> &#x540E;&#xFF0C;WebPlugin &#x5728;&#x751F;&#x6210; HTML &#x6587;&#x4EF6;&#x548C; <code>css-loader</code> &#x8F6C;&#x6362; CSS &#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x4F1A;&#x8003;&#x8651;&#x5230;&#x914D;&#x7F6E;&#x4E2D;&#x7684; <code>publicPath</code>&#xFF0C;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x7EBF;&#x4E0A;&#x5730;&#x5740;&#x66FF;&#x6362;&#x539F;&#x6765;&#x7684;&#x76F8;&#x5BF9;&#x5730;&#x5740;&#x3002;</p>
<h1 id="articleHeader40">&#x4F7F;&#x7528; Tree Shaking</h1>
<p>Tree Shaking &#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5254;&#x9664; JavaScript &#x4E2D;&#x7528;&#x4E0D;&#x4E0A;&#x7684;&#x6B7B;&#x4EE3;&#x7801;&#x3002;&#x5B83;&#x4F9D;&#x8D56;&#x9759;&#x6001;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#xFF0C;&#x4F8B;&#x5982;&#x901A;&#x8FC7; <code>import</code> &#x548C; <code>export</code> &#x5BFC;&#x5165;&#x5BFC;&#x51FA;&#x3002; Tree Shaking &#x6700;&#x5148;&#x5728; Rollup &#x4E2D;&#x51FA;&#x73B0;&#xFF0C;Webpack &#x5728; 2.0 &#x7248;&#x672C;&#x4E2D;&#x5C06;&#x5176;&#x5F15;&#x5165;&#x3002;</p>
<p>&#x4E3A;&#x4E86;&#x66F4;&#x76F4;&#x89C2;&#x7684;&#x7406;&#x89E3;&#x5B83;&#xFF0C;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x5047;&#x5982;&#x6709;&#x4E00;&#x4E2A;&#x6587;&#x4EF6; <code>util.js</code> &#x91CC;&#x5B58;&#x653E;&#x4E86;&#x5F88;&#x591A;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x548C;&#x5E38;&#x91CF;&#xFF0C;&#x5728; <code>main.js</code> &#x4E2D;&#x4F1A;&#x5BFC;&#x5165;&#x548C;&#x4F7F;&#x7528; <code>util.js</code>&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><code>util.js</code> &#x6E90;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function funcA() {
}

export function funB() {
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcA</span>(<span class="hljs-params"></span>) </span>{
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funB</span>(<span class="hljs-params"></span>) </span>{
}
</code></pre>
<p><code>main.js</code> &#x6E90;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {funcA} from &apos;./util.js&apos;;
funcA();
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {funcA} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./util.js&apos;</span>;
funcA();
</code></pre>
<p>Tree Shaking &#x540E;&#x7684; <code>util.js</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function funcA() {
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcA</span>(<span class="hljs-params"></span>) </span>{
}
</code></pre>
<p>&#x7531;&#x4E8E;&#x53EA;&#x7528;&#x5230;&#x4E86; <code>util.js</code> &#x4E2D;&#x7684; <code>funcA</code>&#xFF0C;&#x6240;&#x4EE5;&#x5269;&#x4E0B;&#x7684;&#x90FD;&#x88AB; Tree Shaking &#x5F53;&#x4F5C;&#x6B7B;&#x4EE3;&#x7801;&#x7ED9;&#x5254;&#x9664;&#x4E86;&#x3002;</p>
<p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x8981;&#x8BA9; Tree Shaking &#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#x7684;&#x524D;&#x63D0;&#x662F;&#x4EA4;&#x7ED9; Webpack &#x7684; JavaScript &#x4EE3;&#x7801;&#x5FC5;&#x987B;&#x662F;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#xFF0C; &#x56E0;&#x4E3A; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x662F;&#x9759;&#x6001;&#x7684;&#xFF08;&#x5BFC;&#x5165;&#x5BFC;&#x51FA;&#x8BED;&#x53E5;&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x662F;&#x9759;&#x6001;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x80FD;&#x653E;&#x5165;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#xFF09;&#xFF0C;&#x8FD9;&#x8BA9; Webpack &#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x5206;&#x6790;&#x51FA;&#x54EA;&#x4E9B; <code>export</code> &#x7684;&#x88AB; <code>import</code> &#x8FC7;&#x4E86;&#x3002; &#x5982;&#x679C;&#x4F60;&#x91C7;&#x7528; ES5 &#x4E2D;&#x7684;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x4F8B;&#x5982; <code>module.export={...}</code>&#x3001;<code>require(x+y)</code>&#x3001;<code>if(x){require(&apos;./util&apos;)}</code>&#xFF0C;Webpack &#x65E0;&#x6CD5;&#x5206;&#x6790;&#x51FA;&#x54EA;&#x4E9B;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5254;&#x9664;&#x3002;</p>
<h2 id="articleHeader41">&#x63A5;&#x5165; Tree Shaking</h2>
<p>&#x4E0A;&#x9762;&#x8BB2;&#x4E86; Tree Shaking &#x662F;&#x505A;&#x4EC0;&#x4E48;&#x7684;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x4E00;&#x6B65;&#x6B65;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x914D;&#x7F6E; Webpack &#x8BA9; Tree Shaking &#x751F;&#x6548;&#x3002;</p>
<p>&#x9996;&#x5148;&#xFF0C;&#x4E3A;&#x4E86;&#x628A;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x4EA4;&#x7ED9; Webpack&#xFF0C;&#x9700;&#x8981;&#x914D;&#x7F6E; Babel &#x8BA9;&#x5176;&#x4FDD;&#x7559; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x53E5;&#xFF0C;&#x4FEE;&#x6539; <code>.babelrc</code> &#x6587;&#x4EF6;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [
      &quot;env&quot;,
      {
        &quot;modules&quot;: false
      }
    ]
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;presets&quot;</span>: [
    [
      <span class="hljs-string">&quot;env&quot;</span>,
      {
        <span class="hljs-attr">&quot;modules&quot;</span>: <span class="hljs-literal">false</span>
      }
    ]
  ]
}
</code></pre>
<p>&#x5176;&#x4E2D; <code>&quot;modules&quot;: false</code> &#x7684;&#x542B;&#x4E49;&#x662F;&#x5173;&#x95ED; Babel &#x7684;&#x6A21;&#x5757;&#x8F6C;&#x6362;&#x529F;&#x80FD;&#xFF0C;&#x4FDD;&#x7559;&#x539F;&#x672C;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x3002;</p>
<p>&#x914D;&#x7F6E;&#x597D; Babel &#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x8FD0;&#x884C; Webpack&#xFF0C;&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A; <code>--display-used-exports</code> &#x53C2;&#x6570;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x8FFD;&#x8E2A; Tree Shaking &#x7684;&#x5DE5;&#x4F5C;&#xFF0C; &#x8FD9;&#x65F6;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x4E2D;&#x8F93;&#x51FA;&#x4E86;&#x5982;&#x4E0B;&#x7684;&#x65E5;&#x5FD7;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; webpack --display-used-exports
bundle.js  3.5 kB       0  [emitted]  main
   [0] ./main.js 41 bytes {0} [built]
   [1] ./util.js 511 bytes {0} [built]
       [only some exports used: funcA]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&gt; webpack --<span class="hljs-attribute">display</span>-used-exports
bundle<span class="hljs-selector-class">.js</span>  <span class="hljs-number">3.5</span> kB       <span class="hljs-number">0</span>  [emitted]  main
   [<span class="hljs-number">0</span>] ./main<span class="hljs-selector-class">.js</span> <span class="hljs-number">41</span> bytes {<span class="hljs-number">0</span>} [built]
   [<span class="hljs-number">1</span>] ./util<span class="hljs-selector-class">.js</span> <span class="hljs-number">511</span> bytes {<span class="hljs-number">0</span>} [built]
       [only some exports used: funcA]
</code></pre>
<p>&#x5176;&#x4E2D; [only some exports used: funcA] &#x63D0;&#x793A;&#x4E86; util.js &#x53EA;&#x5BFC;&#x51FA;&#x4E86;&#x7528;&#x5230;&#x7684; funcA&#xFF0C;&#x8BF4;&#x660E; Webpack &#x786E;&#x5B9E;&#x6B63;&#x786E;&#x7684;&#x5206;&#x6790;&#x51FA;&#x4E86;&#x5982;&#x4F55;&#x5254;&#x9664;&#x6B7B;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x4F46;&#x5F53;&#x4F60;&#x6253;&#x5F00; Webpack &#x8F93;&#x51FA;&#x7684; <code>bundle.js</code> &#x6587;&#x4EF6;&#x770B;&#x4E0B;&#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x7528;&#x4E0D;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x5728;&#x91CC;&#x9762;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* harmony export (immutable) */
__webpack_exports__[&quot;a&quot;] = funcA;

/* unused harmony export funB */

function funcA() {
  console.log(&apos;funcA&apos;);
}

function funB() {
  console.log(&apos;funcB&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* harmony export (immutable) */</span>
__webpack_exports__[<span class="hljs-string">&quot;a&quot;</span>] = funcA;

<span class="hljs-comment">/* unused harmony export funB */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcA</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;funcA&apos;</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funB</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;funcB&apos;</span>);
}
</code></pre>
<p>Webpack &#x53EA;&#x662F;&#x6307;&#x51FA;&#x4E86;&#x54EA;&#x4E9B;&#x51FD;&#x6570;&#x7528;&#x4E0A;&#x4E86;&#x54EA;&#x4E9B;&#x6CA1;&#x7528;&#x4E0A;&#xFF0C;&#x8981;&#x5254;&#x9664;&#x7528;&#x4E0D;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x5F97;&#x7ECF;&#x8FC7; UglifyJS &#x53BB;&#x5904;&#x7406;&#x4E00;&#x904D;&#x3002; &#x8981;&#x63A5;&#x5165; UglifyJS &#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;4-8&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x4E2D;&#x4ECB;&#x7ECD;&#x7684;&#x52A0;&#x5165; UglifyJSPlugin &#x53BB;&#x5B9E;&#x73B0;&#xFF0C; &#x4E5F;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x901A;&#x8FC7;&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A; <code>--optimize-minimize</code> &#x53C2;&#x6570;&#xFF0C;&#x4E3A;&#x4E86;&#x5FEB;&#x901F;&#x9A8C;&#x8BC1; Tree Shaking &#x6211;&#x4EEC;&#x91C7;&#x7528;&#x8F83;&#x7B80;&#x5355;&#x7684;&#x540E;&#x8005;&#x6765;&#x5B9E;&#x9A8C;&#x4E0B;&#x3002;</p>
<p>&#x901A;&#x8FC7; <code>webpack --display-used-exports --optimize-minimize</code> &#x91CD;&#x542F; Webpack &#x540E;&#xFF0C;&#x6253;&#x5F00;&#x65B0;&#x8F93;&#x51FA;&#x7684; <code>bundle.js</code>&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function r() {
  console.log(&quot;funcA&quot;)
}

t.a = r
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">r</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;funcA&quot;</span>)
}

t.a = r
</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x51FA; Tree Shaking &#x786E;&#x5B9E;&#x505A;&#x5230;&#x4E86;&#xFF0C;&#x7528;&#x4E0D;&#x4E0A;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x88AB;&#x5254;&#x9664;&#x4E86;&#x3002;</p>
<p>&#x5F53;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x4E86;&#x5927;&#x91CF;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0; Tree Shaking &#x4F3C;&#x4E4E;&#x4E0D;&#x751F;&#x6548;&#x4E86;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x5927;&#x90E8;&#x5206; Npm &#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x91C7;&#x7528;&#x7684; CommonJS &#x8BED;&#x6CD5;&#xFF0C; &#x8FD9;&#x5BFC;&#x81F4; Tree Shaking &#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#x800C;&#x964D;&#x7EA7;&#x5904;&#x7406;&#x3002; &#x4F46;&#x5E78;&#x8FD0;&#x7684;&#x65F6;&#x6709;&#x4E9B;&#x5E93;&#x8003;&#x8651;&#x5230;&#x4E86;&#x8FD9;&#x70B9;&#xFF0C;&#x8FD9;&#x4E9B;&#x5E93;&#x5728;&#x53D1;&#x5E03;&#x5230; Npm &#x4E0A;&#x65F6;&#x4F1A;&#x540C;&#x65F6;&#x63D0;&#x4F9B;&#x4E24;&#x4EFD;&#x4EE3;&#x7801;&#xFF0C;&#x4E00;&#x4EFD;&#x91C7;&#x7528; CommonJS &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#xFF0C;&#x4E00;&#x4EFD;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x3002; &#x5E76;&#x4E14;&#x5728; <code>package.json</code> &#x6587;&#x4EF6;&#x4E2D;&#x5206;&#x522B;&#x6307;&#x51FA;&#x8FD9;&#x4E24;&#x4EFD;&#x4EE3;&#x7801;&#x7684;&#x5165;&#x53E3;&#x3002;</p>
<p>&#x4EE5; <code>redux</code> &#x5E93;&#x4E3A;&#x4F8B;&#xFF0C;&#x5176;&#x53D1;&#x5E03;&#x5230; Npm &#x4E0A;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_modules/redux
|-- es
|   |-- index.js # &#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;
|-- lib
|   |-- index.js # &#x91C7;&#x7528; ES5 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;
|-- package.json
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crystal"><code>node_modules/redux
|-- es
|   |-- index.js <span class="hljs-comment"># &#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;</span>
|-- <span class="hljs-class"><span class="hljs-keyword">lib</span></span>
|   |-- index.js <span class="hljs-comment"># &#x91C7;&#x7528; ES5 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;</span>
|-- package.json
</code></pre>
<p><code>package.json</code> &#x6587;&#x4EF6;&#x4E2D;&#x6709;&#x4E24;&#x4E2A;&#x5B57;&#x6BB5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;main&quot;: &quot;lib/index.js&quot;, // &#x6307;&#x660E;&#x91C7;&#x7528; CommonJS &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x5165;&#x53E3;
  &quot;jsnext:main&quot;: &quot;es/index.js&quot; // &#x6307;&#x660E;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x5165;&#x53E3;
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
  <span class="hljs-string">&quot;main&quot;</span>: <span class="hljs-string">&quot;lib/index.js&quot;</span>, <span class="hljs-comment">// &#x6307;&#x660E;&#x91C7;&#x7528; CommonJS &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x5165;&#x53E3;</span>
  <span class="hljs-string">&quot;jsnext:main&quot;</span>: <span class="hljs-string">&quot;es/index.js&quot;</span> <span class="hljs-comment">// &#x6307;&#x660E;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x5165;&#x53E3;</span>
}
</code></pre>
<p><code>mainFields</code> &#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x91C7;&#x7528;&#x54EA;&#x4E2A;&#x5B57;&#x6BB5;&#x4F5C;&#x4E3A;&#x6A21;&#x5757;&#x7684;&#x5165;&#x53E3;&#x63CF;&#x8FF0;&#x3002; &#x4E3A;&#x4E86;&#x8BA9; Tree Shaking &#x5BF9; <code>redux</code> &#x751F;&#x6548;&#xFF0C;&#x9700;&#x8981;&#x914D;&#x7F6E; Webpack &#x7684;&#x6587;&#x4EF6;&#x5BFB;&#x627E;&#x89C4;&#x5219;&#x4E3A;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;
    mainFields: [&apos;jsnext:main&apos;, &apos;browser&apos;, &apos;main&apos;]
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;</span>
    mainFields: [<span class="hljs-string">&apos;jsnext:main&apos;</span>, <span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;main&apos;</span>]
  },
};
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x7684;&#x542B;&#x4E49;&#x662F;&#x4F18;&#x5148;&#x4F7F;&#x7528; <code>jsnext:main</code> &#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728; <code>jsnext:main</code> &#x5C31;&#x91C7;&#x7528; <code>browser</code> &#x6216;&#x8005; <code>main</code> &#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x3002; &#x867D;&#x7136;&#x5E76;&#x4E0D;&#x662F;&#x6BCF;&#x4E2A; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x90FD;&#x4F1A;&#x63D0;&#x4F9B; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x63D0;&#x4F9B;&#x4E86;&#x7684;&#x4E0D;&#x80FD;&#x653E;&#x8FC7;&#xFF0C;&#x80FD;&#x4F18;&#x5316;&#x7684;&#x5C31;&#x4F18;&#x5316;&#x3002;</p>
<p>&#x76EE;&#x524D;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x8003;&#x8651;&#x5230;&#x4E86; Tree Shaking&#xFF0C;&#x5E76;&#x5BF9;&#x5176;&#x63D0;&#x4F9B;&#x4E86;&#x652F;&#x6301;&#x3002; &#x91C7;&#x7528; <code>jsnext:main</code> &#x4F5C;&#x4E3A; ES6 &#x6A21;&#x5757;&#x5316;&#x4EE3;&#x7801;&#x7684;&#x5165;&#x53E3;&#x662F;&#x793E;&#x533A;&#x7684;&#x4E00;&#x4E2A;&#x7EA6;&#x5B9A;&#xFF0C;&#x5047;&#x5982;&#x5C06;&#x6765;&#x4F60;&#x8981;&#x53D1;&#x5E03;&#x4E00;&#x4E2A;&#x5E93;&#x5230; Npm &#x65F6;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x652F;&#x6301; Tree Shaking&#xFF0C; &#x4EE5;&#x8BA9; Tree Shaking &#x53D1;&#x6325;&#x66F4;&#x5927;&#x7684;&#x4F18;&#x5316;&#x6548;&#x679C;&#xFF0C;&#x8BA9;&#x66F4;&#x591A;&#x7684;&#x4EBA;&#x4E3A;&#x6B64;&#x53D7;&#x76CA;&#x3002;</p>
<h1 id="articleHeader42">&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</h1>
<h2 id="articleHeader43">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</h2>
<p>&#x5927;&#x578B;&#x7F51;&#x7AD9;&#x901A;&#x5E38;&#x4F1A;&#x7531;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x7EC4;&#x6210;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x3002; &#x4F46;&#x7531;&#x4E8E;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x91C7;&#x7528;&#x540C;&#x6837;&#x7684;&#x6280;&#x672F;&#x6808;&#xFF0C;&#x4EE5;&#x53CA;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x5957;&#x6837;&#x5F0F;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x5BFC;&#x81F4;&#x8FD9;&#x4E9B;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x6709;&#x5F88;&#x591A;&#x76F8;&#x540C;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x628A;&#x8FD9;&#x4E9B;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x5305;&#x542B;&#x8FDB;&#x53BB;&#xFF0C;&#x4F1A;&#x9020;&#x6210;&#x4EE5;&#x4E0B;&#x95EE;&#x9898;&#xFF1A;</p>
<ul>
<li>&#x76F8;&#x540C;&#x7684;&#x8D44;&#x6E90;&#x88AB;&#x91CD;&#x590D;&#x7684;&#x52A0;&#x8F7D;&#xFF0C;&#x6D6A;&#x8D39;&#x7528;&#x6237;&#x7684;&#x6D41;&#x91CF;&#x548C;&#x670D;&#x52A1;&#x5668;&#x7684;&#x6210;&#x672C;&#xFF1B;</li>
<li>&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x8D44;&#x6E90;&#x592A;&#x5927;&#xFF0C;&#x5BFC;&#x81F4;&#x7F51;&#x9875;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x7F13;&#x6162;&#xFF0C;&#x5F71;&#x54CD;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;</li>
</ul>
<p>&#x5982;&#x679C;&#x628A;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x516C;&#x5171;&#x7684;&#x4EE3;&#x7801;&#x62BD;&#x79BB;&#x6210;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5C31;&#x80FD;&#x4F18;&#x5316;&#x4EE5;&#x4E0A;&#x95EE;&#x9898;&#x3002; &#x539F;&#x56E0;&#x662F;&#x5047;&#x5982;&#x7528;&#x6237;&#x8BBF;&#x95EE;&#x4E86;&#x7F51;&#x7AD9;&#x7684;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x7F51;&#x9875;&#xFF0C;&#x90A3;&#x4E48;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x4E0B;&#x7684;&#x5176;&#x5B83;&#x7F51;&#x9875;&#x7684;&#x6982;&#x7387;&#x5C06;&#x975E;&#x5E38;&#x5927;&#x3002; &#x5728;&#x7528;&#x6237;&#x7B2C;&#x4E00;&#x6B21;&#x8BBF;&#x95EE;&#x540E;&#xFF0C;&#x8FD9;&#x4E9B;&#x9875;&#x9762;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x7684;&#x6587;&#x4EF6;&#x5DF2;&#x7ECF;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x7528;&#x6237;&#x5207;&#x6362;&#x5230;&#x5176;&#x5B83;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x5B58;&#x653E;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x7684;&#x6587;&#x4EF6;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4ECE;&#x7F13;&#x5B58;&#x4E2D;&#x83B7;&#x53D6;&#x3002; &#x8FD9;&#x6837;&#x505A;&#x540E;&#x6709;&#x5982;&#x4E0B;&#x597D;&#x5904;&#xFF1A;</p>
<ul>
<li>&#x51CF;&#x5C11;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x6D41;&#x91CF;&#xFF0C;&#x964D;&#x4F4E;&#x670D;&#x52A1;&#x5668;&#x6210;&#x672C;&#xFF1B;</li>
<li>&#x867D;&#x7136;&#x7528;&#x6237;&#x7B2C;&#x4E00;&#x6B21;&#x6253;&#x5F00;&#x7F51;&#x7AD9;&#x7684;&#x901F;&#x5EA6;&#x5F97;&#x4E0D;&#x5230;&#x4F18;&#x5316;&#xFF0C;&#x4F46;&#x4E4B;&#x540E;&#x8BBF;&#x95EE;&#x5176;&#x5B83;&#x9875;&#x9762;&#x7684;&#x901F;&#x5EA6;&#x5C06;&#x5927;&#x5927;&#x63D0;&#x5347;&#x3002;</li>
</ul>
<h2 id="articleHeader44">&#x5982;&#x4F55;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</h2>
<p>&#x4F60;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x4E86;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x4F1A;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x5904;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x6218;&#x4E2D;&#x5177;&#x4F53;&#x8981;&#x600E;&#x4E48;&#x505A;&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x6548;&#x679C;&#x6700;&#x4F18;&#x5462;&#xFF1F; &#x901A;&#x5E38;&#x4F60;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x539F;&#x5219;&#x53BB;&#x4E3A;&#x4F60;&#x7684;&#x7F51;&#x7AD9;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;&#xFF1A;</p>
<ul>
<li>&#x6839;&#x636E;&#x4F60;&#x7F51;&#x7AD9;&#x6240;&#x4F7F;&#x7528;&#x7684;&#x6280;&#x672F;&#x6808;&#xFF0C;&#x627E;&#x51FA;&#x7F51;&#x7AD9;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x57FA;&#x7840;&#x5E93;&#xFF0C;&#x4EE5;&#x91C7;&#x7528; React &#x6280;&#x672F;&#x6808;&#x7684;&#x7F51;&#x7AD9;&#x4E3A;&#x4F8B;&#xFF0C;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x4F9D;&#x8D56; <code>react</code>&#x3001;<code>react-dom</code> &#x7B49;&#x5E93;&#xFF0C;&#x628A;&#x5B83;&#x4EEC;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x3002; &#x4E00;&#x822C;&#x628A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x53EB;&#x505A; base.js&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5305;&#x542B;&#x6240;&#x6709;&#x7F51;&#x9875;&#x7684;&#x57FA;&#x7840;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF1B;</li>
<li>&#x5728;&#x5254;&#x9664;&#x4E86;&#x5404;&#x4E2A;&#x9875;&#x9762;&#x4E2D;&#x88AB; <code>base.js</code> &#x5305;&#x542B;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5916;&#xFF0C;&#x518D;&#x627E;&#x51FA;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x653E;&#x5230; <code>common.js</code> &#x4E2D;&#x53BB;&#x3002;</li>
<li>&#x518D;&#x4E3A;&#x6BCF;&#x4E2A;&#x7F51;&#x9875;&#x90FD;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x4E0D;&#x518D;&#x5305;&#x542B; <code>base.js</code> &#x548C; <code>common.js</code> &#x4E2D;&#x5305;&#x542B;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x53EA;&#x5305;&#x542B;&#x5404;&#x4E2A;&#x9875;&#x9762;&#x5355;&#x72EC;&#x9700;&#x8981;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x3002;</li>
</ul>
<p>&#x6587;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x7ED3;&#x6784;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048422" src="https://static.alili.tech/img/remote/1460000015048422" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x8BFB;&#x5230;&#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x4EE5;&#x4F1A;&#x6709;&#x7591;&#x95EE;&#xFF1A;&#x65E2;&#x7136;&#x80FD;&#x627E;&#x51FA;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x653E;&#x5230; <code>common.js</code> &#x4E2D;&#x53BB;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x9700;&#x8981;&#x518D;&#x628A;&#x7F51;&#x7AD9;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x57FA;&#x7840;&#x5E93;&#x63D0;&#x53D6;&#x5230; <code>base.js</code> &#x53BB;&#x5462;&#xFF1F; &#x539F;&#x56E0;&#x662F;&#x4E3A;&#x4E86;&#x957F;&#x671F;&#x7684;&#x7F13;&#x5B58; <code>base.js</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x3002;</p>
<p>&#x53D1;&#x5E03;&#x5230;&#x7EBF;&#x4E0A;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x91C7;&#x7528;&#x5728;4-9CDN&#x52A0;&#x901F;&#x4E2D;&#x4ECB;&#x7ECD;&#x8FC7;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x90FD;&#x9644;&#x52A0;&#x6839;&#x636E;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x8BA1;&#x7B97;&#x51FA; Hash &#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6700;&#x7EC8; <code>base.js</code> &#x7684;&#x6587;&#x4EF6;&#x540D;&#x4F1A;&#x53D8;&#x6210; <code>base_3b1682ac.js</code>&#xFF0C;&#x4EE5;&#x957F;&#x671F;&#x7F13;&#x5B58;&#x6587;&#x4EF6;&#x3002; &#x7F51;&#x7AD9;&#x901A;&#x5E38;&#x4F1A;&#x4E0D;&#x65AD;&#x7684;&#x66F4;&#x65B0;&#x53D1;&#x5E03;&#xFF0C;&#x6BCF;&#x6B21;&#x53D1;&#x5E03;&#x90FD;&#x4F1A;&#x5BFC;&#x81F4; <code>common.js</code> &#x548C;&#x5404;&#x4E2A;&#x7F51;&#x9875;&#x7684; JavaScript &#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x56E0;&#x4E3A;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x800C;&#x5BFC;&#x81F4;&#x5176; Hash &#x503C;&#x88AB;&#x66F4;&#x65B0;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x7F13;&#x5B58;&#x88AB;&#x66F4;&#x65B0;&#x3002;</p>
<p>&#x628A;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x57FA;&#x7840;&#x5E93;&#x63D0;&#x53D6;&#x5230; <code>base.js</code> &#x7684;&#x597D;&#x5904;&#x5728;&#x4E8E;&#x53EA;&#x8981;&#x4E0D;&#x5347;&#x7EA7;&#x57FA;&#x7840;&#x5E93;&#x7684;&#x7248;&#x672C;&#xFF0C;<code>base.js</code> &#x7684;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5C31;&#x4E0D;&#x4F1A;&#x53D8;&#x5316;&#xFF0C;Hash &#x503C;&#x4E0D;&#x4F1A;&#x88AB;&#x66F4;&#x65B0;&#xFF0C;&#x7F13;&#x5B58;&#x5C31;&#x4E0D;&#x4F1A;&#x88AB;&#x66F4;&#x65B0;&#x3002; &#x6BCF;&#x6B21;&#x53D1;&#x5E03;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x4F1A;&#x4F7F;&#x7528;&#x88AB;&#x7F13;&#x5B58;&#x7684; <code>base.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x53BB;&#x91CD;&#x65B0;&#x4E0B;&#x8F7D; <code>base.js</code> &#x6587;&#x4EF6;&#x3002; &#x7531;&#x4E8E; <code>base.js</code> &#x901A;&#x5E38;&#x4F1A;&#x5F88;&#x5927;&#xFF0C;&#x8FD9;&#x5BF9;&#x63D0;&#x5347;&#x7F51;&#x9875;&#x52A0;&#x901F;&#x901F;&#x5EA6;&#x80FD;&#x8D77;&#x5230;&#x5F88;&#x5927;&#x7684;&#x6548;&#x679C;&#x3002;</p>
<h2 id="articleHeader45">&#x5982;&#x4F55;&#x901A;&#x8FC7; Webpack &#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</h2>
<p>&#x4F60;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x5982;&#x4F55;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x7528; Webpack &#x5B9E;&#x73B0;&#x3002;</p>
<p>Webpack &#x5185;&#x7F6E;&#x4E86;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x63D0;&#x53D6;&#x591A;&#x4E2A; Chunk &#x4E2D;&#x516C;&#x5171;&#x90E8;&#x5206;&#x7684;&#x63D2;&#x4EF6; <code>CommonsChunkPlugin</code>&#xFF0C;<code>CommonsChunkPlugin</code> &#x5927;&#x81F4;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CommonsChunkPlugin = require(&apos;webpack/lib/optimize/CommonsChunkPlugin&apos;);

new CommonsChunkPlugin({
  // &#x4ECE;&#x54EA;&#x4E9B; Chunk &#x4E2D;&#x63D0;&#x53D6;
  chunks: [&apos;a&apos;, &apos;b&apos;],
  // &#x63D0;&#x53D6;&#x51FA;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Chunk&#xFF0C;&#x8FD9;&#x4E2A;&#x65B0; Chunk &#x7684;&#x540D;&#x79F0;
  name: &apos;common&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack/lib/optimize/CommonsChunkPlugin&apos;</span>);

<span class="hljs-keyword">new</span> CommonsChunkPlugin({
  <span class="hljs-comment">// &#x4ECE;&#x54EA;&#x4E9B; Chunk &#x4E2D;&#x63D0;&#x53D6;</span>
  chunks: [<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>],
  <span class="hljs-comment">// &#x63D0;&#x53D6;&#x51FA;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Chunk&#xFF0C;&#x8FD9;&#x4E2A;&#x65B0; Chunk &#x7684;&#x540D;&#x79F0;</span>
  name: <span class="hljs-string">&apos;common&apos;</span>
})
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x5C31;&#x80FD;&#x4ECE;&#x7F51;&#x9875; A &#x548C;&#x7F51;&#x9875; B &#x4E2D;&#x62BD;&#x79BB;&#x51FA;&#x516C;&#x5171;&#x90E8;&#x5206;&#xFF0C;&#x653E;&#x5230; <code>common</code> &#x4E2D;&#x3002;</p>
<p>&#x6BCF;&#x4E2A; CommonsChunkPlugin &#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Chunk&#xFF0C;&#x8FD9;&#x4E2A;&#x65B0; Chunk &#x4E2D;&#x5305;&#x542B;&#x4E86;&#x88AB;&#x63D0;&#x53D6;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x5FC5;&#x987B;&#x6307;&#x5B9A; <code>name</code> &#x5C5E;&#x6027;&#xFF0C;&#x4EE5;&#x544A;&#x8BC9;&#x63D2;&#x4EF6;&#x65B0;&#x751F;&#x6210;&#x7684; Chunk &#x7684;&#x540D;&#x79F0;&#x3002; &#x5176;&#x4E2D; <code>chunks</code> &#x5C5E;&#x6027;&#x6307;&#x660E;&#x4ECE;&#x54EA;&#x4E9B;&#x5DF2;&#x6709;&#x7684; Chunk &#x4E2D;&#x63D0;&#x53D6;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x586B;&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x4F1A;&#x4ECE;&#x6240;&#x6709;&#x5DF2;&#x77E5;&#x7684; Chunk &#x4E2D;&#x63D0;&#x53D6;&#x3002;</p>
<blockquote>Chunk &#x662F;&#x4E00;&#x7CFB;&#x5217;&#x6587;&#x4EF6;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x4E00;&#x4E2A; Chunk &#x4E2D;&#x4F1A;&#x5305;&#x542B;&#x8FD9;&#x4E2A; Chunk &#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x548C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x7684;&#x6587;&#x4EF6;&#x3002;</blockquote>
<p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x8F93;&#x51FA;&#x7684; common Chunk &#x4E2D;&#x4F1A;&#x5305;&#x542B;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x8FD0;&#x884C;&#x5E93; <code>react</code>&#x3001;<code>react-dom</code>&#xFF0C;&#x4E3A;&#x4E86;&#x628A;&#x57FA;&#x7840;&#x8FD0;&#x884C;&#x5E93;&#x4ECE; <code>common</code> &#x4E2D;&#x62BD;&#x79BB;&#x5230; <code>base</code> &#x4E2D;&#x53BB;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#x3002;</p>
<p>&#x9996;&#x5148;&#x9700;&#x8981;&#x5148;&#x914D;&#x7F6E;&#x4E00;&#x4E2A; Chunk&#xFF0C;&#x8FD9;&#x4E2A; Chunk &#x4E2D;&#x53EA;&#x4F9D;&#x8D56;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x5E93;&#x4EE5;&#x53CA;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F7F;&#x7528;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E3A;&#x6B64;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5199;&#x4E00;&#x4E2A;&#x6587;&#x4EF6; <code>base.js</code> &#x6765;&#x63CF;&#x8FF0; base Chunk &#x6240;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x5E93;
import &apos;react&apos;;
import &apos;react-dom&apos;;
// &#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F7F;&#x7528;&#x7684;&#x6837;&#x5F0F;
import &apos;./base.css&apos;;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x5E93;</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> &apos;react&apos;;</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> &apos;react-dom&apos;;</span>
<span class="hljs-comment">// &#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F7F;&#x7528;&#x7684;&#x6837;&#x5F0F;</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> &apos;./base.css&apos;;</span>
</code></pre>
<p>&#x63A5;&#x7740;&#x518D;&#x4FEE;&#x6539; Webpack &#x914D;&#x7F6E;&#xFF0C;&#x5728; <code>entry</code> &#x4E2D;&#x52A0;&#x5165; <code>base</code>&#xFF0C;&#x76F8;&#x5173;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    base: &apos;./base.js&apos;
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">module</span>.exports = {
  entry: {
    <span class="hljs-keyword">base</span>: &apos;./<span class="hljs-keyword">base</span>.js&apos;
  },
};
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x5BF9;&#x65B0; Chunk base &#x7684;&#x914D;&#x7F6E;&#x3002;</p>
<p>&#x4E3A;&#x4E86;&#x4ECE; common &#x4E2D;&#x63D0;&#x53D6;&#x51FA; <code>base</code> &#x4E5F;&#x5305;&#x542B;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E00;&#x4E2A; <code>CommonsChunkPlugin</code>&#xFF0C;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CommonsChunkPlugin({
  // &#x4ECE; common &#x548C; base &#x4E24;&#x4E2A;&#x73B0;&#x6210;&#x7684; Chunk &#x4E2D;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;
  chunks: [&apos;common&apos;, &apos;base&apos;],
  // &#x628A;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x653E;&#x5230; base &#x4E2D;
  name: &apos;base&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">CommonsChunkPlugin</span>({
  <span class="hljs-comment">// &#x4ECE; common &#x548C; base &#x4E24;&#x4E2A;&#x73B0;&#x6210;&#x7684; Chunk &#x4E2D;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;</span>
  <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">&apos;common&apos;</span>, <span class="hljs-string">&apos;base&apos;</span>],
  <span class="hljs-comment">// &#x628A;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x653E;&#x5230; base &#x4E2D;</span>
  <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;base&apos;</span>
})
</code></pre>
<p>&#x7531;&#x4E8E; <code>common</code> &#x548C; <code>base</code> &#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x5C31;&#x662F; <code>base</code> &#x76EE;&#x524D;&#x5DF2;&#x7ECF;&#x5305;&#x542B;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x6837;&#x914D;&#x7F6E;&#x540E; <code>common</code> &#x5C06;&#x4F1A;&#x53D8;&#x5C0F;&#xFF0C;&#x800C; <code>base</code> &#x5C06;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x3002;</p>
<p>&#x4EE5;&#x4E0A;&#x90FD;&#x914D;&#x7F6E;&#x597D;&#x540E;&#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#xFF0C;&#x4F60;&#x5C06;&#x4F1A;&#x5F97;&#x5230;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<p><code>base.js</code>&#xFF1A;&#x6240;&#x6709;&#x7F51;&#x9875;&#x90FD;&#x4F9D;&#x8D56;&#x7684;&#x57FA;&#x7840;&#x5E93;&#x7EC4;&#x6210;&#x7684;&#x4EE3;&#x7801;&#xFF1B;<br><code>common.js</code>&#xFF1A;&#x7F51;&#x9875;A&#x3001;B&#x90FD;&#x9700;&#x8981;&#x7684;&#xFF0C;&#x4F46;&#x53C8;&#x4E0D;&#x5728; <code>base.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x51FA;&#x73B0;&#x8FC7;&#x7684;&#x4EE3;&#x7801;&#xFF1B;<br><code>a.js</code>&#xFF1A;&#x7F51;&#x9875; A &#x5355;&#x72EC;&#x9700;&#x8981;&#x7684;&#x4EE3;&#x7801;&#xFF1B;<br><code>b.js</code>&#xFF1A;&#x7F51;&#x9875; B &#x5355;&#x72EC;&#x9700;&#x8981;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x4E3A;&#x4E86;&#x8BA9;&#x7F51;&#x9875;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#xFF0C;&#x4EE5;&#x7F51;&#x9875; <code>A</code> &#x4E3A;&#x4F8B;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x5176; HTML &#x4E2D;&#x6309;&#x7167;&#x4EE5;&#x4E0B;&#x987A;&#x5E8F;&#x5F15;&#x5165;&#x4EE5;&#x4E0B;&#x6587;&#x4EF6;&#x624D;&#x80FD;&#x8BA9;&#x7F51;&#x9875;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;base.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;common.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;a.js&quot;&gt;&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;base.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;common.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;a.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709;&#x6B65;&#x9AA4;&#x3002;</p>
<p>&#x9488;&#x5BF9; CSS &#x8D44;&#x6E90;&#xFF0C;&#x4EE5;&#x4E0A;&#x7406;&#x8BBA;&#x548C;&#x65B9;&#x6CD5;&#x540C;&#x6837;&#x6709;&#x6548;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x5BF9; CSS &#x6587;&#x4EF6;&#x505A;&#x540C;&#x6837;&#x7684;&#x4F18;&#x5316;&#x3002;</p>
<p>&#x4EE5;&#x4E0A;&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0; <code>common.js</code> &#x4E2D;&#x6CA1;&#x6709;&#x4EE3;&#x7801;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x53BB;&#x6389;&#x57FA;&#x7840;&#x8FD0;&#x884C;&#x5E93;&#x5916;&#x5F88;&#x96BE;&#x518D;&#x627E;&#x5230;&#x6240;&#x6709;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x7528;&#x4E0A;&#x7684;&#x6A21;&#x5757;&#x3002; &#x5728;&#x51FA;&#x73B0;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x91C7;&#x53D6;&#x4EE5;&#x4E0B;&#x505A;&#x6CD5;&#x4E4B;&#x4E00;&#xFF1A;</p>
<ul>
<li>CommonsChunkPlugin &#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x9009;&#x9879; <code>minChunks</code>&#xFF0C;&#x8868;&#x793A;&#x6587;&#x4EF6;&#x8981;&#x88AB;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x65F6;&#x9700;&#x8981;&#x5728;&#x6307;&#x5B9A;&#x7684; Chunks &#x4E2D;&#x6700;&#x5C0F;&#x51FA;&#x73B0;&#x6700;&#x5C0F;&#x6B21;&#x6570;&#x3002; &#x5047;&#x5982; <code>minChunks=2&#x3001;chunks=[&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;]</code>&#xFF0C;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x53EA;&#x8981;&#x5728; <code>[&apos;a&apos;,&apos;b&apos;,&apos;c&apos;,&apos;d&apos;]</code> &#x4E2D;&#x4EFB;&#x610F;&#x4E24;&#x4E2A;&#x4EE5;&#x4E0A;&#x7684; Chunk &#x4E2D;&#x90FD;&#x51FA;&#x73B0;&#x8FC7;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5C31;&#x4F1A;&#x88AB;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x3002; &#x4F60;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x9700;&#x6C42;&#x53BB;&#x8C03;&#x6574; <code>minChunks</code> &#x7684;&#x503C;&#xFF0C;<code>minChunks</code> &#x8D8A;&#x5C0F;&#x8D8A;&#x591A;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x88AB;&#x63D0;&#x53D6;&#x5230; <code>common.js</code> &#x4E2D;&#x53BB;&#xFF0C;&#x4F46;&#x8FD9;&#x4E5F;&#x4F1A;&#x5BFC;&#x81F4;&#x90E8;&#x5206;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x4E0D;&#x76F8;&#x5173;&#x7684;&#x8D44;&#x6E90;&#x8D8A;&#x591A;&#xFF1B; <code>minChunks</code> &#x8D8A;&#x5927;&#x8D8A;&#x5C11;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x88AB;&#x63D0;&#x53D6;&#x5230; <code>common.js</code> &#x4E2D;&#x53BB;&#xFF0C;&#x4F46;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4; <code>common.js</code> &#x53D8;&#x5C0F;&#x3001;&#x6548;&#x679C;&#x53D8;&#x5F31;&#x3002;</li>
<li>&#x6839;&#x636E;&#x5404;&#x4E2A;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7684;&#x76F8;&#x5173;&#x6027;&#x9009;&#x53D6;&#x5176;&#x4E2D;&#x7684;&#x90E8;&#x5206;&#x9875;&#x9762;&#x7528; <code>CommonsChunkPlugin</code> &#x53BB;&#x63D0;&#x53D6;&#x8FD9;&#x90E8;&#x5206;&#x88AB;&#x9009;&#x51FA;&#x7684;&#x9875;&#x9762;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x63D0;&#x53D6;&#x6240;&#x6709;&#x9875;&#x9762;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x4E14;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x53EF;&#x4EE5;&#x53E0;&#x52A0;&#x591A;&#x6B21;&#x3002; &#x8FD9;&#x6837;&#x505A;&#x7684;&#x6548;&#x679C;&#x4F1A;&#x5F88;&#x597D;&#xFF0C;&#x4F46;&#x7F3A;&#x70B9;&#x662F;&#x914D;&#x7F6E;&#x590D;&#x6742;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x6839;&#x636E;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x53BB;&#x601D;&#x8003;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4E0D;&#x901A;&#x7528;&#x3002;</li>
</ul>
<blockquote>&#x672C;&#x5B9E;&#x4F8B;&#x63D0;&#x4F9B;<a href="http://webpack.wuhaolin.cn/4-11%E6%8F%90%E5%8F%96%E5%85%AC%E5%85%B1%E4%BB%A3%E7%A0%81.zip" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5B8C;&#x6574;&#x4EE3;&#x7801;</a>
</blockquote>
<h1 id="articleHeader46">&#x5206;&#x5272;&#x4EE3;&#x7801;&#x6309;&#x9700;&#x52A0;&#x8F7D;</h1>
<h2 id="articleHeader47">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x6309;&#x9700;&#x52A0;&#x8F7D;</h2>
<p>&#x968F;&#x7740;&#x4E92;&#x8054;&#x7F51;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x4E00;&#x4E2A;&#x7F51;&#x9875;&#x9700;&#x8981;&#x627F;&#x8F7D;&#x7684;&#x529F;&#x80FD;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x3002; &#x5BF9;&#x4E8E;&#x91C7;&#x7528;&#x5355;&#x9875;&#x5E94;&#x7528;&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x67B6;&#x6784;&#x7684;&#x7F51;&#x7AD9;&#x6765;&#x8BF4;&#xFF0C;&#x4F1A;&#x9762;&#x4E34;&#x7740;&#x4E00;&#x4E2A;&#x7F51;&#x9875;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x5F88;&#x5927;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x8BB8;&#x591A;&#x529F;&#x80FD;&#x90FD;&#x96C6;&#x4E2D;&#x7684;&#x505A;&#x5230;&#x4E86;&#x4E00;&#x4E2A; HTML &#x91CC;&#x3002; &#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x7F13;&#x6162;&#x3001;&#x4EA4;&#x4E92;&#x5361;&#x987F;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x5C06;&#x975E;&#x5E38;&#x7CDF;&#x7CD5;&#x3002;</p>
<p>&#x5BFC;&#x81F4;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x6839;&#x672C;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#x4E00;&#x6B21;&#x6027;&#x7684;&#x52A0;&#x8F7D;&#x6240;&#x6709;&#x529F;&#x80FD;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x7528;&#x6237;&#x6BCF;&#x4E00;&#x9636;&#x6BB5;&#x53EA;&#x53EF;&#x80FD;&#x4F7F;&#x7528;&#x5176;&#x4E2D;&#x4E00;&#x90E8;&#x5206;&#x529F;&#x80FD;&#x3002; &#x6240;&#x4EE5;&#x89E3;&#x51B3;&#x4EE5;&#x4E0A;&#x95EE;&#x9898;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x7528;&#x6237;&#x5F53;&#x524D;&#x9700;&#x8981;&#x7528;&#x4EC0;&#x4E48;&#x529F;&#x80FD;&#x5C31;&#x53EA;&#x52A0;&#x8F7D;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x3002;</p>
<h2 id="articleHeader48">&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x6309;&#x9700;&#x52A0;&#x8F7D;</h2>
<p>&#x5728;&#x7ED9;&#x5355;&#x9875;&#x5E94;&#x7528;&#x505A;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4F18;&#x5316;&#x65F6;&#xFF0C;&#x4E00;&#x822C;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x539F;&#x5219;&#xFF1A;</p>
<ul>
<li>&#x628A;&#x6574;&#x4E2A;&#x7F51;&#x7AD9;&#x5212;&#x5206;&#x6210;&#x4E00;&#x4E2A;&#x4E2A;&#x5C0F;&#x529F;&#x80FD;&#xFF0C;&#x518D;&#x6309;&#x7167;&#x6BCF;&#x4E2A;&#x529F;&#x80FD;&#x7684;&#x76F8;&#x5173;&#x7A0B;&#x5EA6;&#x628A;&#x5B83;&#x4EEC;&#x5206;&#x6210;&#x51E0;&#x7C7B;&#x3002;</li>
<li>&#x628A;&#x6BCF;&#x4E00;&#x7C7B;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A; Chunk&#xFF0C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7684; Chunk&#x3002;</li>
<li>&#x5BF9;&#x4E8E;&#x7528;&#x6237;&#x9996;&#x6B21;&#x6253;&#x5F00;&#x4F60;&#x7684;&#x7F51;&#x7AD9;&#x65F6;&#x9700;&#x8981;&#x770B;&#x5230;&#x7684;&#x753B;&#x9762;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E0D;&#x8981;&#x5BF9;&#x5B83;&#x4EEC;&#x505A;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x800C;&#x662F;&#x653E;&#x5230;&#x6267;&#x884C;&#x5165;&#x53E3;&#x6240;&#x5728;&#x7684; Chunk &#x4E2D;&#xFF0C;&#x4EE5;&#x964D;&#x4F4E;&#x7528;&#x6237;&#x80FD;&#x611F;&#x77E5;&#x7684;&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x3002;</li>
<li>&#x5BF9;&#x4E8E;&#x4E2A;&#x522B;&#x4F9D;&#x8D56;&#x5927;&#x91CF;&#x4EE3;&#x7801;&#x7684;&#x529F;&#x80FD;&#x70B9;&#xFF0C;&#x4F8B;&#x5982;&#x4F9D;&#x8D56; <code>Chart.js</code> &#x53BB;&#x753B;&#x56FE;&#x8868;&#x3001;&#x4F9D;&#x8D56; <code>flv.js</code> &#x53BB;&#x64AD;&#x653E;&#x89C6;&#x9891;&#x7684;&#x529F;&#x80FD;&#x70B9;&#xFF0C;&#x53EF;&#x518D;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x3002;</li>
</ul>
<p>&#x88AB;&#x5206;&#x5272;&#x51FA;&#x53BB;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x52A0;&#x8F7D;&#x9700;&#x8981;&#x4E00;&#x5B9A;&#x7684;&#x65F6;&#x673A;&#x53BB;&#x89E6;&#x53D1;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5F53;&#x7528;&#x6237;&#x64CD;&#x4F5C;&#x5230;&#x4E86;&#x6216;&#x8005;&#x5373;&#x5C06;&#x64CD;&#x4F5C;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x529F;&#x80FD;&#x65F6;&#x518D;&#x53BB;&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x3002; &#x88AB;&#x5206;&#x5272;&#x51FA;&#x53BB;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x673A;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5DF1;&#x53BB;&#x6839;&#x636E;&#x7F51;&#x9875;&#x7684;&#x9700;&#x6C42;&#x53BB;&#x8861;&#x91CF;&#x548C;&#x786E;&#x5B9A;&#x3002;</p>
<p>&#x7531;&#x4E8E;&#x88AB;&#x5206;&#x5272;&#x51FA;&#x53BB;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x52A0;&#x8F7D;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x9700;&#x8981;&#x8017;&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x9884;&#x8A00;&#x7528;&#x6237;&#x63A5;&#x4E0B;&#x6765;&#x53EF;&#x80FD;&#x4F1A;&#x8FDB;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x63D0;&#x524D;&#x52A0;&#x8F7D;&#x597D;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4ECE;&#x800C;&#x8BA9;&#x7528;&#x6237;&#x611F;&#x77E5;&#x4E0D;&#x5230;&#x7F51;&#x7EDC;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x3002;</p>
<h2 id="articleHeader49">&#x7528; Webpack &#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;</h2>
<p>Webpack &#x5185;&#x7F6E;&#x4E86;&#x5F3A;&#x5927;&#x7684;&#x5206;&#x5272;&#x4EE3;&#x7801;&#x7684;&#x529F;&#x80FD;&#x53BB;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x3002;</p>
<p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x73B0;&#x5728;&#x9700;&#x8981;&#x505A;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x8FDB;&#x884C;&#x4E86;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4F18;&#x5316;&#x7684;&#x7F51;&#x9875;&#xFF1A;</p>
<ul>
<li>&#x7F51;&#x9875;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x65F6;&#x53EA;&#x52A0;&#x8F7D; <code>main.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x7F51;&#x9875;&#x4F1A;&#x5C55;&#x793A;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;<code>main.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x53EA;&#x5305;&#x542B;&#x76D1;&#x542C;&#x6309;&#x94AE;&#x4E8B;&#x4EF6;&#x548C;&#x52A0;&#x8F7D;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x3002;</li>
<li>&#x5F53;&#x6309;&#x94AE;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x624D;&#x53BB;&#x52A0;&#x8F7D;&#x88AB;&#x5206;&#x5272;&#x51FA;&#x53BB;&#x7684; <code>show.js</code> &#x6587;&#x4EF6;&#xFF0C;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x518D;&#x6267;&#x884C; <code>show.js</code> &#x91CC;&#x7684;&#x51FD;&#x6570;&#x3002;</li>
</ul>
<p>&#x5176;&#x4E2D; <code>main.js</code> &#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.document.getElementById(&apos;btn&apos;).addEventListener(&apos;click&apos;, function () {
  // &#x5F53;&#x6309;&#x94AE;&#x88AB;&#x70B9;&#x51FB;&#x540E;&#x624D;&#x53BB;&#x52A0;&#x8F7D; show.js &#x6587;&#x4EF6;&#xFF0C;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x5BFC;&#x51FA;&#x7684;&#x51FD;&#x6570;
  import(/* webpackChunkName: &quot;show&quot; */ &apos;./show&apos;).then((show) =&gt; {
    show(&apos;Webpack&apos;);
  })
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.document.getElementById(<span class="hljs-string">&apos;btn&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// &#x5F53;&#x6309;&#x94AE;&#x88AB;&#x70B9;&#x51FB;&#x540E;&#x624D;&#x53BB;&#x52A0;&#x8F7D; show.js &#x6587;&#x4EF6;&#xFF0C;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x5BFC;&#x51FA;&#x7684;&#x51FD;&#x6570;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;show&quot; */</span> <span class="hljs-string">&apos;./show&apos;</span>).then(<span class="hljs-function">(<span class="hljs-params">show</span>) =&gt;</span> {
    show(<span class="hljs-string">&apos;Webpack&apos;</span>);
  })
});
</code></pre>
<p><code>show.js</code> &#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (content) {
  window.alert(&apos;Hello &apos; + content);
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">content</span>) </span>{
  <span class="hljs-built_in">window</span>.alert(<span class="hljs-string">&apos;Hello &apos;</span> + content);
};
</code></pre>
<p>&#x4EE3;&#x7801;&#x4E2D;&#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x53E5;&#x662F; <code>import(/* webpackChunkName: &quot;show&quot; */ &apos;./show&apos;)</code>&#xFF0C;Webpack &#x5185;&#x7F6E;&#x4E86;&#x5BF9; <code>import(*)</code> &#x8BED;&#x53E5;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5F53; Webpack &#x9047;&#x5230;&#x4E86;&#x7C7B;&#x4F3C;&#x7684;&#x8BED;&#x53E5;&#x65F6;&#x4F1A;&#x8FD9;&#x6837;&#x5904;&#x7406;&#xFF1A;</p>
<ul>
<li>&#x4EE5; <code>./show.js</code> &#x4E3A;&#x5165;&#x53E3;&#x65B0;&#x751F;&#x6210;&#x4E00;&#x4E2A; Chunk&#xFF1B;</li>
<li>&#x5F53;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5230; <code>import</code> &#x6240;&#x5728;&#x8BED;&#x53E5;&#x65F6;&#x624D;&#x4F1A;&#x53BB;&#x52A0;&#x8F7D;&#x7531; Chunk &#x5BF9;&#x5E94;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x3002;</li>
<li>
<code>import</code> &#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise&#xFF0C;&#x5F53;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x65F6;&#x53EF;&#x4EE5;&#x5728; Promise &#x7684; <code>then</code> &#x65B9;&#x6CD5;&#x4E2D;&#x83B7;&#x53D6;&#x5230; <code>show.js</code> &#x5BFC;&#x51FA;&#x7684;&#x5185;&#x5BB9;&#x3002;</li>
</ul>
<blockquote>&#x5728;&#x4F7F;&#x7528; <code>import()</code> &#x5206;&#x5272;&#x4EE3;&#x7801;&#x540E;&#xFF0C;&#x4F60;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5E76;&#x4E14;&#x8981;&#x652F;&#x6301; Promise API &#x624D;&#x80FD;&#x8BA9;&#x4EE3;&#x7801;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#xFF0C; &#x56E0;&#x4E3A; import() &#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise&#xFF0C;&#x5B83;&#x4F9D;&#x8D56; Promise&#x3002;&#x5BF9;&#x4E8E;&#x4E0D;&#x539F;&#x751F;&#x652F;&#x6301; Promise &#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6CE8;&#x5165; Promise polyfill&#x3002;<p><code>/* webpackChunkName: &quot;show&quot; */</code> &#x7684;&#x542B;&#x4E49;&#x662F;&#x4E3A;&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684; Chunk &#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x540D;&#x79F0;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x8FFD;&#x8E2A;&#x548C;&#x8C03;&#x8BD5;&#x4EE3;&#x7801;&#x3002; &#x5982;&#x679C;&#x4E0D;&#x6307;&#x5B9A;&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684; Chunk &#x7684;&#x540D;&#x79F0;&#xFF0C;&#x9ED8;&#x8BA4;&#x540D;&#x79F0;&#x5C06;&#x4F1A;&#x662F; <code>[id].js</code>&#x3002; <code>/* webpackChunkName: &quot;show&quot; */</code> &#x662F;&#x5728; Webpack3 &#x4E2D;&#x5F15;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5728; Webpack3 &#x4E4B;&#x524D;&#x662F;&#x65E0;&#x6CD5;&#x4E3A;&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684; Chunk &#x8D4B;&#x4E88;&#x540D;&#x79F0;&#x7684;&#x3002;</p>
</blockquote>
<p>&#x4E3A;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x8F93;&#x51FA;&#x5728; /<em> webpackChunkName: &quot;show&quot; </em>/ &#x4E2D;&#x914D;&#x7F6E;&#x7684; ChunkName&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E0B; Webpack&#xFF0C;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // JS &#x6267;&#x884C;&#x5165;&#x53E3;&#x6587;&#x4EF6;
  entry: {
    main: &apos;./main.js&apos;,
  },
  output: {
    // &#x4E3A;&#x4ECE; entry &#x4E2D;&#x914D;&#x7F6E;&#x751F;&#x6210;&#x7684; Chunk &#x914D;&#x7F6E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x540D;&#x79F0;
    filename: &apos;[name].js&apos;,
    // &#x4E3A;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684; Chunk &#x914D;&#x7F6E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x540D;&#x79F0;
    chunkFilename: &apos;[name].js&apos;,
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// JS &#x6267;&#x884C;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  entry: {
    main: <span class="hljs-string">&apos;./main.js&apos;</span>,
  },
  output: {
    <span class="hljs-comment">// &#x4E3A;&#x4ECE; entry &#x4E2D;&#x914D;&#x7F6E;&#x751F;&#x6210;&#x7684; Chunk &#x914D;&#x7F6E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x540D;&#x79F0;</span>
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
    <span class="hljs-comment">// &#x4E3A;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684; Chunk &#x914D;&#x7F6E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x540D;&#x79F0;</span>
    chunkFilename: <span class="hljs-string">&apos;[name].js&apos;</span>,
  }
};
</code></pre>
<p>&#x5176;&#x4E2D;&#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x884C;&#x662F; <code>chunkFilename: &apos;[name].js&apos;</code>,&#xFF0C;&#x5B83;&#x4E13;&#x95E8;&#x6307;&#x5B9A;&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684; Chunk &#x5728;&#x8F93;&#x51FA;&#x65F6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x79F0;&#x3002; &#x5982;&#x679C;&#x6CA1;&#x6709;&#x8FD9;&#x884C;&#xFF0C;&#x5206;&#x5272;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x79F0;&#x5C06;&#x4F1A;&#x662F; <code>[id].js</code>&#x3002;</p>
<h2 id="articleHeader50">&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4E0E; ReactRouter</h2>
<p>&#x5728;&#x5B9E;&#x6218;&#x4E2D;&#xFF0C;&#x4E0D;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4E0A;&#x9762;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x4E3E;&#x4E00;&#x4E2A;&#x5B9E;&#x6218;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;&#x5BF9;&#x91C7;&#x7528;&#x4E86; ReactRouter &#x7684;&#x5E94;&#x7528;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x4F18;&#x5316;&#x3002; &#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7531;&#x4E00;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x6784;&#x6210;&#xFF0C;&#x8FD9;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7531;&#x4E24;&#x4E2A;&#x5B50;&#x9875;&#x9762;&#x6784;&#x6210;&#xFF0C;&#x901A;&#x8FC7; ReactRouter &#x5728;&#x4E24;&#x4E2A;&#x5B50;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x5207;&#x6362;&#x548C;&#x7BA1;&#x7406;&#x8DEF;&#x7531;&#x3002;</p>
<p>&#x8FD9;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6; <code>main.js</code> &#x5982;&#x4E0B;&#xFF1A;</p>
<p>&lt;p data-height=&quot;565&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;KROoWV&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;main.js&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/KROoWV/" rel="nofollow noreferrer" target="_blank">main.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/KROoWV/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x4E2D;&#x6700;&#x5173;&#x952E;&#x7684;&#x90E8;&#x5206;&#x662F; <code>getAsyncComponent</code> &#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x914D;&#x5408; ReactRouter &#x53BB;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x542B;&#x4E49;&#x8BF7;&#x770B;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#x3002;</p>
<p>&#x7531;&#x4E8E;&#x4EE5;&#x4E0A;&#x6E90;&#x7801;&#x9700;&#x8981;&#x901A;&#x8FC7; Babel &#x53BB;&#x8F6C;&#x6362;&#x540E;&#x624D;&#x80FD;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#xFF0C;&#x9700;&#x8981;&#x5728; Webpack &#x4E2D;&#x914D;&#x7F6E;&#x597D;&#x5BF9;&#x5E94;&#x7684; <code>babel-loader</code>&#xFF0C;&#x6E90;&#x7801;&#x5148;&#x4EA4;&#x7ED9; <code>babel-loader</code> &#x5904;&#x7406;&#x540E;&#x518D;&#x4EA4;&#x7ED9; Webpack &#x53BB;&#x5904;&#x7406;&#x5176;&#x4E2D;&#x7684; <code>import(*)</code> &#x8BED;&#x53E5;&#x3002; &#x4F46;&#x8FD9;&#x6837;&#x505A;&#x540E;&#x4F60;&#x5F88;&#x5FEB;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;Babel &#x62A5;&#x51FA;&#x9519;&#x8BEF;&#x8BF4;&#x4E0D;&#x8BA4;&#x8BC6; <code>import(*)</code> &#x8BED;&#x6CD5;&#x3002; &#x5BFC;&#x81F4;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x539F;&#x56E0;&#x662F; <code>import(*)</code> &#x8BED;&#x6CD5;&#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x52A0;&#x5165;&#x5230;&#x5728;&#x4F7F;&#x7528;ES6&#x8BED;&#x8A00;&#x4E2D;&#x63D0;&#x5230;&#x7684; ECMAScript &#x6807;&#x51C6;&#x4E2D;&#x53BB;&#xFF0C; &#x4E3A;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4E00;&#x4E2A; Babel &#x63D2;&#x4EF6; <code>babel-plugin-syntax-dynamic-import</code>&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5176;&#x52A0;&#x5165;&#x5230; <code>.babelrc</code> &#x4E2D;&#x53BB;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;env&quot;,
    &quot;react&quot;
  ],
  &quot;plugins&quot;: [
    &quot;syntax-dynamic-import&quot;
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;presets&quot;</span>: [
    <span class="hljs-string">&quot;env&quot;</span>,
    <span class="hljs-string">&quot;react&quot;</span>
  ],
  <span class="hljs-attr">&quot;plugins&quot;</span>: [
    <span class="hljs-string">&quot;syntax-dynamic-import&quot;</span>
  ]
}
</code></pre>
<p>&#x6267;&#x884C; Webpack &#x6784;&#x5EFA;&#x540E;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x8F93;&#x51FA;&#x4E86;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p>
<ul>
<li>
<code>main.js</code>&#xFF1A;&#x6267;&#x884C;&#x5165;&#x53E3;&#x6240;&#x5728;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x5305;&#x62EC; <code>PageHome</code> &#x6240;&#x9700;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x56E0;&#x4E3A;&#x7528;&#x6237;&#x9996;&#x6B21;&#x6253;&#x5F00;&#x7F51;&#x9875;&#x65F6;&#x5C31;&#x9700;&#x8981;&#x770B;&#x5230; <code>PageHome</code> &#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x4EE5;&#x964D;&#x4F4E;&#x7528;&#x6237;&#x80FD;&#x611F;&#x77E5;&#x5230;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#xFF1B;</li>
<li>
<code>page-about.js</code>&#xFF1A;&#x5F53;&#x7528;&#x6237;&#x8BBF;&#x95EE; <code>/about</code> &#x65F6;&#x624D;&#x4F1A;&#x52A0;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF1B;</li>
<li>
<code>page-login.js</code>&#xFF1A;&#x5F53;&#x7528;&#x6237;&#x8BBF;&#x95EE; <code>/login</code> &#x65F6;&#x624D;&#x4F1A;&#x52A0;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x3002;</li>
</ul>
<p>&#x540C;&#x65F6;&#x4F60;&#x8FD8;&#x4F1A;&#x53D1;&#x73B0; <code>page-about.js</code> &#x548C; <code>page-login.js</code> &#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5728;&#x9996;&#x9875;&#x662F;&#x4E0D;&#x4F1A;&#x52A0;&#x8F7D;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x5F53;&#x4F60;&#x5207;&#x6362;&#x5230;&#x4E86;&#x5BF9;&#x5E94;&#x7684;&#x5B50;&#x9875;&#x9762;&#x540E;&#x6587;&#x4EF6;&#x624D;&#x4F1A;&#x5F00;&#x59CB;&#x52A0;&#x8F7D;&#x3002;</p>
<h1 id="articleHeader51">&#x4F7F;&#x7528; Prepack</h1>
<p>&#x5728;&#x524D;&#x9762;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x4E2D;&#x63D0;&#x5230;&#x4E86;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x548C;&#x5206;&#x5757;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x5728;&#x7F51;&#x7EDC;&#x52A0;&#x8F7D;&#x5C42;&#x9762;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x8FD8;&#x53EF;&#x4EE5;&#x4F18;&#x5316;&#x4EE3;&#x7801;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x6548;&#x7387;&#xFF0C;<a href="https://prepack.io/" rel="nofollow noreferrer" target="_blank">Prepack</a> &#x5C31;&#x662F;&#x4E3A;&#x6B64;&#x800C;&#x751F;&#x3002;</p>
<p>Prepack &#x7531; Facebook &#x5F00;&#x6E90;&#xFF0C;&#x5B83;&#x91C7;&#x7528;&#x8F83;&#x4E3A;&#x6FC0;&#x8FDB;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;&#x5728;&#x4FDD;&#x6301;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x4E00;&#x81F4;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6539;&#x53D8;&#x6E90;&#x4EE3;&#x7801;&#x7684;&#x8FD0;&#x884C;&#x903B;&#x8F91;&#xFF0C;&#x8F93;&#x51FA;&#x6027;&#x80FD;&#x66F4;&#x9AD8;&#x7684; JavaScript &#x4EE3;&#x7801;&#x3002; &#x5B9E;&#x9645;&#x4E0A; Prepack &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x90E8;&#x5206;&#x6C42;&#x503C;&#x5668;&#xFF0C;&#x7F16;&#x8BD1;&#x4EE3;&#x7801;&#x65F6;&#x63D0;&#x524D;&#x5C06;&#x8BA1;&#x7B97;&#x7ED3;&#x679C;&#x653E;&#x5230;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5728;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x65F6;&#x624D;&#x53BB;&#x6C42;&#x503C;&#x3002;</p>
<p>&#x4EE5;&#x5982;&#x4E0B;&#x6E90;&#x7801;&#x4E3A;&#x4F8B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from &apos;react&apos;;
import {renderToString} from &apos;react-dom/server&apos;;

function hello(name) {
  return &apos;hello &apos; + name;
}

class Button extends Component {
  render() {
    return hello(this.props.name);
  }
}

console.log(renderToString(&lt;Button name=&apos;webpack&apos;/&gt;));
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> {renderToString} from <span class="hljs-symbol">&apos;react</span>-dom/server&apos;;

function hello(name) {
  <span class="hljs-keyword">return</span> <span class="hljs-symbol">&apos;hello</span> &apos; + name;
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> hello(<span class="hljs-keyword">this</span>.props.name);
  }
}

console.log(renderToString(&lt;<span class="hljs-type">Button</span> name=<span class="hljs-symbol">&apos;webpac</span>k&apos;/&gt;));
</code></pre>
<p>&#x88AB; Prepack &#x8F6C;&#x5316;&#x540E;&#x7ADF;&#x7136;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;hello webpack&quot;);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs abnf"><code>console.log(<span class="hljs-string">&quot;hello webpack&quot;</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x51FA; Prepack &#x901A;&#x8FC7;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x9884;&#x5148;&#x6267;&#x884C;&#x4E86;&#x6E90;&#x7801;&#x5F97;&#x5230;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF0C;&#x518D;&#x76F4;&#x63A5;&#x628A;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x8F93;&#x51FA;&#x6765;&#x4EE5;&#x63D0;&#x5347;&#x6027;&#x80FD;&#x3002;</p>
<p>Prepack &#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x548C;&#x6D41;&#x7A0B;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>&#x901A;&#x8FC7; Babel &#x628A; JavaScript &#x6E90;&#x7801;&#x89E3;&#x6790;&#x6210;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;AST&#xFF09;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x66F4;&#x7EC6;&#x7C92;&#x5EA6;&#x5730;&#x5206;&#x6790;&#x6E90;&#x7801;&#xFF1B;</li>
<li>Prepack &#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A; JavaScript &#x89E3;&#x91CA;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x6267;&#x884C;&#x6E90;&#x7801;&#x3002;&#x501F;&#x52A9;&#x8FD9;&#x4E2A;&#x89E3;&#x91CA;&#x5668; Prepack &#x624D;&#x80FD;&#x638C;&#x63E1;&#x6E90;&#x7801;&#x5177;&#x4F53;&#x662F;&#x5982;&#x4F55;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x5E76;&#x628A;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;&#x5230;&#x8F93;&#x51FA;&#x4E2D;&#x3002;</li>
</ul>
<p>&#x4ECE;&#x8868;&#x9762;&#x4E0A;&#x770B;&#x53BB;&#x8FD9;&#x4F3C;&#x4E4E;&#x975E;&#x5E38;&#x7F8E;&#x597D;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A; Prepack &#x8FD8;&#x4E0D;&#x591F;&#x6210;&#x719F;&#x4E0E;&#x5B8C;&#x5584;&#x3002;Prepack &#x76EE;&#x524D;&#x8FD8;&#x5904;&#x4E8E;&#x521D;&#x671F;&#x7684;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#xFF0C;&#x5C40;&#x9650;&#x6027;&#x4E5F;&#x5F88;&#x5927;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<ul>
<li>&#x4E0D;&#x80FD;&#x8BC6;&#x522B; DOM API &#x548C; &#x90E8;&#x5206; Node.js API&#xFF0C;&#x5982;&#x679C;&#x6E90;&#x7801;&#x4E2D;&#x6709;&#x8C03;&#x7528;&#x4F9D;&#x8D56;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x7684; API &#x5C31;&#x4F1A;&#x5BFC;&#x81F4; Prepack &#x62A5;&#x9519;&#xFF1B;</li>
<li>&#x5B58;&#x5728;&#x4F18;&#x5316;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x6027;&#x80FD;&#x53CD;&#x800C;&#x66F4;&#x4F4E;&#x7684;&#x60C5;&#x51B5;&#xFF1B;</li>
<li>&#x5B58;&#x5728;&#x4F18;&#x5316;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x5C3A;&#x5BF8;&#x5927;&#x5927;&#x589E;&#x52A0;&#x7684;&#x60C5;&#x51B5;&#x3002;</li>
</ul>
<p>&#x603B;&#x4E4B;&#xFF0C;&#x73B0;&#x5728;&#x628A; Prepack &#x7528;&#x4E8E;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#x8FD8;&#x4E3A;&#x65F6;&#x8FC7;&#x65E9;&#x3002;</p>
<h2 id="articleHeader52">&#x63A5;&#x5165; Webpack</h2>
<p>Prepack &#x9700;&#x8981;&#x5728; Webpack &#x8F93;&#x51FA;&#x6700;&#x7EC8;&#x7684;&#x4EE3;&#x7801;&#x4E4B;&#x524D;&#xFF0C;&#x5BF9;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#xFF0C;&#x5C31;&#x50CF; UglifyJS &#x90A3;&#x6837;&#x3002; &#x56E0;&#x6B64;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x65B0;&#x63A5;&#x5165;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x6765;&#x4E3A; Webpack &#x63A5;&#x5165; Prepack&#xFF0C;&#x5E78;&#x8FD0;&#x7684;&#x662F;&#x793E;&#x533A;&#x4E2D;&#x5DF2;&#x7ECF;&#x6709;&#x4EBA;&#x505A;&#x597D;&#x4E86;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF1A;<a href="https://github.com/gajus/prepack-webpack-plugin" rel="nofollow noreferrer" target="_blank">prepack-webpack-plugin</a>&#x3002;</p>
<p>&#x63A5;&#x5165;&#x8BE5;&#x63D2;&#x4EF6;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PrepackWebpackPlugin = require(&apos;prepack-webpack-plugin&apos;).default;

module.exports = {
  plugins: [
    new PrepackWebpackPlugin()
  ]
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> PrepackWebpackPlugin = require(<span class="hljs-string">&apos;prepack-webpack-plugin&apos;</span>).<span class="hljs-keyword">default</span>;

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    <span class="hljs-keyword">new</span> PrepackWebpackPlugin()
  ]
};
</code></pre>
<p>&#x91CD;&#x65B0;&#x6267;&#x884C;&#x6784;&#x5EFA;&#x4F60;&#x5C31;&#x4F1A;&#x770B;&#x5230;&#x8F93;&#x51FA;&#x7684;&#x88AB; Prepack &#x4F18;&#x5316;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<h1 id="articleHeader53">&#x5F00;&#x542F; Scope Hoisting</h1>
<p>Scope Hoisting &#x53EF;&#x4EE5;&#x8BA9; Webpack &#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x66F4;&#x5C0F;&#x3001;&#x8FD0;&#x884C;&#x7684;&#x66F4;&#x5FEB;&#xFF0C; &#x5B83;&#x53C8;&#x8BD1;&#x4F5C; &quot;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;&quot;&#xFF0C;&#x662F;&#x5728; Webpack3 &#x4E2D;&#x65B0;&#x63A8;&#x51FA;&#x7684;&#x529F;&#x80FD;&#x3002; &#x5355;&#x4ECE;&#x540D;&#x5B57;&#x4E0A;&#x770B;&#x4E0D;&#x51FA; Scope Hoisting &#x5230;&#x5E95;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x5B83;&#x3002;</p>
<p>&#x8BA9;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x5728;&#x6CA1;&#x6709; Scope Hoisting &#x4E4B;&#x524D; Webpack &#x7684;&#x6253;&#x5305;&#x65B9;&#x5F0F;&#x3002;</p>
<p>&#x5047;&#x5982;&#x73B0;&#x5728;&#x6709;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5206;&#x522B;&#x662F; <code>util.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default &apos;Hello,Webpack&apos;;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> <span class="hljs-string">&apos;Hello,Webpack&apos;</span>;
</code></pre>
<p>&#x548C;&#x5165;&#x53E3;&#x6587;&#x4EF6; <code>main.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import str from &apos;./util.js&apos;;
console.log(str);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">import</span> <span class="hljs-built_in">str</span> from <span class="hljs-string">&apos;./util.js&apos;</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>);
</code></pre>
<p>&#x4EE5;&#x4E0A;&#x6E90;&#x7801;&#x7528; Webpack &#x6253;&#x5305;&#x540E;&#x8F93;&#x51FA;&#x4E2D;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__[&quot;a&quot;]);
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__[&quot;a&quot;] = (&apos;Hello,Webpack&apos;);
  })
]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs clojure"><code>[
  (<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">__WEBPACK_IMPORTED_MODULE_0__util_js__</span>[<span class="hljs-string">&quot;a&quot;</span>])<span class="hljs-comment">;</span>
  }),
  (<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, __webpack_exports__, __webpack_require__) {
    __webpack_exports__[<span class="hljs-string">&quot;a&quot;</span>] = (<span class="hljs-name">&apos;Hello</span>,Webpack&apos;)<span class="hljs-comment">;</span>
  })
]
</code></pre>
<p>&#x5728;&#x5F00;&#x542F; Scope Hoisting &#x540E;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x6E90;&#x7801;&#x8F93;&#x51FA;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  (function (module, __webpack_exports__, __webpack_require__) {
    var util = (&apos;Hello,Webpack&apos;);
    console.log(util);
  })
]
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs clojure"><code>[
  (<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, __webpack_exports__, __webpack_require__) {
    var util = (<span class="hljs-name">&apos;Hello</span>,Webpack&apos;)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">util</span>)<span class="hljs-comment">;</span>
  })
]
</code></pre>
<p>&#x4ECE;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x5F00;&#x542F; Scope Hoisting &#x540E;&#xFF0C;&#x51FD;&#x6570;&#x7533;&#x660E;&#x7531;&#x4E24;&#x4E2A;&#x53D8;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C;<code>util.js</code> &#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x5185;&#x5BB9;&#x88AB;&#x76F4;&#x63A5;&#x6CE8;&#x5165;&#x5230;&#x4E86; <code>main.js</code> &#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x5757;&#x4E2D;&#x3002; &#x8FD9;&#x6837;&#x505A;&#x7684;&#x597D;&#x5904;&#x662F;&#xFF1A;</p>
<ul>
<li>&#x4EE3;&#x7801;&#x4F53;&#x79EF;&#x66F4;&#x5C0F;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x7533;&#x660E;&#x8BED;&#x53E5;&#x4F1A;&#x4EA7;&#x751F;&#x5927;&#x91CF;&#x4EE3;&#x7801;&#xFF1B;</li>
<li>&#x4EE3;&#x7801;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x56E0;&#x4E3A;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x66F4;&#x5C11;&#x4E86;&#xFF0C;&#x5185;&#x5B58;&#x5F00;&#x9500;&#x4E5F;&#x968F;&#x4E4B;&#x53D8;&#x5C0F;&#x3002;</li>
</ul>
<p>Scope Hoisting &#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF1A;&#x5206;&#x6790;&#x51FA;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#xFF0C;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x628A;&#x6253;&#x6563;&#x7684;&#x6A21;&#x5757;&#x5408;&#x5E76;&#x5230;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x53BB;&#xFF0C;&#x4F46;&#x524D;&#x63D0;&#x662F;&#x4E0D;&#x80FD;&#x9020;&#x6210;&#x4EE3;&#x7801;&#x5197;&#x4F59;&#x3002; &#x56E0;&#x6B64;&#x53EA;&#x6709;&#x90A3;&#x4E9B;&#x88AB;&#x5F15;&#x7528;&#x4E86;&#x4E00;&#x6B21;&#x7684;&#x6A21;&#x5757;&#x624D;&#x80FD;&#x88AB;&#x5408;&#x5E76;&#x3002;</p>
<p>&#x7531;&#x4E8E; Scope Hoisting &#x9700;&#x8981;&#x5206;&#x6790;&#x51FA;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#xFF0C;&#x56E0;&#x6B64;&#x6E90;&#x7801;&#x5FC5;&#x987B;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x53E5;&#xFF0C;&#x4E0D;&#x7136;&#x5B83;&#x5C06;&#x65E0;&#x6CD5;&#x751F;&#x6548;&#x3002;</p>
<h2 id="articleHeader54">&#x4F7F;&#x7528; Scope Hoisting</h2>
<p>&#x8981;&#x5728; Webpack &#x4E2D;&#x4F7F;&#x7528; Scope Hoisting &#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x662F; Webpack &#x5185;&#x7F6E;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ModuleConcatenationPlugin = require(&apos;webpack/lib/optimize/ModuleConcatenationPlugin&apos;);

module.exports = {
  plugins: [
    // &#x5F00;&#x542F; Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> ModuleConcatenationPlugin = require(<span class="hljs-string">&apos;webpack/lib/optimize/ModuleConcatenationPlugin&apos;</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    <span class="hljs-comment">// &#x5F00;&#x542F; Scope Hoisting</span>
    <span class="hljs-keyword">new</span> ModuleConcatenationPlugin(),
  ],
};
</code></pre>
<p>&#x540C;&#x65F6;&#xFF0C;&#x8003;&#x8651;&#x5230; Scope Hoisting &#x4F9D;&#x8D56;&#x6E90;&#x7801;&#x9700;&#x91C7;&#x7528; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x7F6E; mainFields&#x3002; &#x539F;&#x56E0;&#x5728; 4-10 &#x4F7F;&#x7528; TreeShaking &#x4E2D;&#x63D0;&#x5230;&#x8FC7;&#xFF1A;&#x56E0;&#x4E3A;&#x5927;&#x90E8;&#x5206; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x91C7;&#x7528;&#x4E86; CommonJS &#x8BED;&#x6CD5;&#xFF0C;&#x4F46;&#x90E8;&#x5206;&#x5E93;&#x4F1A;&#x540C;&#x65F6;&#x63D0;&#x4F9B; ES6 &#x6A21;&#x5757;&#x5316;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E3A;&#x4E86;&#x5145;&#x5206;&#x53D1;&#x6325; Scope Hoisting &#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x589E;&#x52A0;&#x4EE5;&#x4E0B;&#x914D;&#x7F6E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  resolve: {
    // &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;
    mainFields: [&apos;jsnext:main&apos;, &apos;browser&apos;, &apos;main&apos;]
  },
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;</span>
    mainFields: [<span class="hljs-string">&apos;jsnext:main&apos;</span>, <span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;main&apos;</span>]
  },
};
</code></pre>
<p>&#x5BF9;&#x4E8E;&#x91C7;&#x7528;&#x4E86;&#x975E; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;Webpack &#x4F1A;&#x964D;&#x7EA7;&#x5904;&#x7406;&#x4E0D;&#x4F7F;&#x7528; Scope Hoisting &#x4F18;&#x5316;&#xFF0C;&#x4E3A;&#x4E86;&#x77E5;&#x9053; Webpack &#x5BF9;&#x54EA;&#x4E9B;&#x4EE3;&#x7801;&#x505A;&#x4E86;&#x964D;&#x7EA7;&#x5904;&#x7406;&#xFF0C; &#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A; <code>--display-optimization-bailout</code> &#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x8F93;&#x51FA;&#x65E5;&#x5FD7;&#x4E2D;&#x5C31;&#x4F1A;&#x5305;&#x542B;&#x7C7B;&#x4F3C;&#x5982;&#x4E0B;&#x7684;&#x65E5;&#x5FD7;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0] ./main.js + 1 modules 80 bytes {0} [built]
    ModuleConcatenation bailout: Module is not an ECMAScript module
    " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs oxygene"><code>[<span class="hljs-number">0</span>] ./main.js + <span class="hljs-number">1</span> modules <span class="hljs-number">80</span> bytes <span class="hljs-comment">{0}</span> [built]
    ModuleConcatenation bailout: <span class="hljs-keyword">Module</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> an ECMAScript <span class="hljs-keyword">module</span>
    </code></pre>
<p>&#x5176;&#x4E2D;&#x7684; <code>ModuleConcatenation bailout</code> &#x544A;&#x8BC9;&#x4E86;&#x4F60;&#x54EA;&#x4E2A;&#x6587;&#x4EF6;&#x56E0;&#x4E3A;&#x4EC0;&#x4E48;&#x539F;&#x56E0;&#x5BFC;&#x81F4;&#x4E86;&#x964D;&#x7EA7;&#x5904;&#x7406;&#x3002;</p>
<p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x8981;&#x5F00;&#x542F; Scope Hoisting &#x5E76;&#x53D1;&#x6325;&#x6700;&#x5927;&#x4F5C;&#x7528;&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ModuleConcatenationPlugin = require(&apos;webpack/lib/optimize/ModuleConcatenationPlugin&apos;);

module.exports = {
  resolve: {
    // &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;
    mainFields: [&apos;jsnext:main&apos;, &apos;browser&apos;, &apos;main&apos;]
  },
  plugins: [
    // &#x5F00;&#x542F; Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> ModuleConcatenationPlugin = require(<span class="hljs-string">&apos;webpack/lib/optimize/ModuleConcatenationPlugin&apos;</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  resolve: {
    <span class="hljs-comment">// &#x9488;&#x5BF9; Npm &#x4E2D;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4F18;&#x5148;&#x91C7;&#x7528; jsnext:main &#x4E2D;&#x6307;&#x5411;&#x7684; ES6 &#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x7684;&#x6587;&#x4EF6;</span>
    mainFields: [<span class="hljs-string">&apos;jsnext:main&apos;</span>, <span class="hljs-string">&apos;browser&apos;</span>, <span class="hljs-string">&apos;main&apos;</span>]
  },
  plugins: [
    <span class="hljs-comment">// &#x5F00;&#x542F; Scope Hoisting</span>
    <span class="hljs-keyword">new</span> ModuleConcatenationPlugin(),
  ],
};
</code></pre>
<h1 id="articleHeader55">&#x8F93;&#x51FA;&#x5206;&#x6790;</h1>
<p>&#x524D;&#x9762;&#x867D;&#x7136;&#x4ECB;&#x7ECD;&#x4E86;&#x975E;&#x5E38;&#x591A;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x4E5F;&#x65E0;&#x6CD5;&#x6DB5;&#x76D6;&#x6240;&#x6709;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x4E3A;&#x6B64;&#x4F60;&#x9700;&#x8981;&#x5BF9;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x505A;&#x5206;&#x6790;&#xFF0C;&#x4EE5;&#x51B3;&#x5B9A;&#x4E0B;&#x4E00;&#x6B65;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x5411;&#x3002;</p>
<p>&#x6700;&#x76F4;&#x63A5;&#x7684;&#x5206;&#x6790;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x53BB;&#x9605;&#x8BFB; Webpack &#x8F93;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x7531;&#x4E8E; Webpack &#x8F93;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x975E;&#x5E38;&#x5DEE;&#x800C;&#x4E14;&#x6587;&#x4EF6;&#x975E;&#x5E38;&#x5927;&#xFF0C;&#x8FD9;&#x4F1A;&#x8BA9;&#x4F60;&#x975E;&#x5E38;&#x5934;&#x75BC;&#x3002; &#x4E3A;&#x4E86;&#x66F4;&#x7B80;&#x5355;&#x76F4;&#x89C2;&#x7684;&#x5206;&#x6790;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#xFF0C;&#x793E;&#x533A;&#x4E2D;&#x51FA;&#x73B0;&#x4E86;&#x8BB8;&#x591A;&#x53EF;&#x89C6;&#x5316;&#x7684;&#x5206;&#x6790;&#x5DE5;&#x5177;&#x3002;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#x4EE5;&#x56FE;&#x5F62;&#x7684;&#x65B9;&#x5F0F;&#x628A;&#x7ED3;&#x679C;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x7684;&#x5C55;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x8BA9;&#x4F60;&#x5FEB;&#x901F;&#x770B;&#x5230;&#x95EE;&#x9898;&#x6240;&#x5728;&#x3002; &#x63A5;&#x4E0B;&#x6765;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#x3002;</p>
<p>&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#xFF0C;&#x652F;&#x6301;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ul>
<li>
<code>--profile</code>&#xFF1A;&#x8BB0;&#x5F55;&#x4E0B;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x8017;&#x65F6;&#x4FE1;&#x606F;&#xFF1B;</li>
<li>
<code>--json</code>&#xFF1A;&#x4EE5; JSON &#x7684;&#x683C;&#x5F0F;&#x8F93;&#x51FA;&#x6784;&#x5EFA;&#x7ED3;&#x679C;&#xFF0C;&#x6700;&#x540E;&#x53EA;&#x8F93;&#x51FA;&#x4E00;&#x4E2A; <code>.json</code> &#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x5305;&#x62EC;&#x6240;&#x6709;&#x6784;&#x5EFA;&#x76F8;&#x5173;&#x7684;&#x4FE1;&#x606F;&#x3002;</li>
</ul>
<p>&#x5728;&#x542F;&#x52A8; Webpack &#x65F6;&#x5E26;&#x4E0A;&#x4EE5;&#x4E0A;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x542F;&#x52A8;&#x547D;&#x4EE4;&#x5982;&#x4E0B; <code>webpack --profile --json &gt; stats.json</code>&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x9879;&#x76EE;&#x4E2D;&#x591A;&#x51FA;&#x4E86;&#x4E00;&#x4E2A; <code>stats.json</code> &#x6587;&#x4EF6;&#x3002; &#x8FD9;&#x4E2A; <code>stats.json</code> &#x6587;&#x4EF6;&#x662F;&#x7ED9;&#x540E;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x53EF;&#x89C6;&#x5316;&#x5206;&#x6790;&#x5DE5;&#x5177;&#x4F7F;&#x7528;&#x7684;&#x3002;</p>
<blockquote>
<code>webpack --profile --json</code> &#x4F1A;&#x8F93;&#x51FA;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684; JSON&#xFF0C;<code>&gt; stats.json</code> &#x662F; UNIX/Linux &#x7CFB;&#x7EDF;&#x4E2D;&#x7684;&#x7BA1;&#x9053;&#x547D;&#x4EE4;&#x3001;&#x542B;&#x4E49;&#x662F;&#x628A; <code>webpack --profile --json</code> &#x8F93;&#x51FA;&#x7684;&#x5185;&#x5BB9;&#x901A;&#x8FC7;&#x7BA1;&#x9053;&#x8F93;&#x51FA;&#x5230; <code>stats.json</code> &#x6587;&#x4EF6;&#x4E2D;&#x3002;</blockquote>
<h2 id="articleHeader56">&#x5B98;&#x65B9;&#x7684;&#x53EF;&#x89C6;&#x5316;&#x5206;&#x6790;&#x5DE5;&#x5177;</h2>
<p>Webpack &#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x89C6;&#x5316;&#x5206;&#x6790;&#x5DE5;&#x5177; <a>Webpack Analyse</a>&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5728;&#x7EBF; Web &#x5E94;&#x7528;&#x3002;</p>
<p>&#x6253;&#x5F00; Webpack Analyse &#x94FE;&#x63A5;&#x7684;&#x7F51;&#x9875;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x770B;&#x5230;&#x4E00;&#x4E2A;&#x5F39;&#x7A97;&#x63D0;&#x793A;&#x4F60;&#x4E0A;&#x4F20; JSON &#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9700;&#x8981;&#x4E0A;&#x4F20;&#x4E0A;&#x9762;&#x8BB2;&#x5230;&#x7684; <code>stats.json</code> &#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x56FE;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048423" src="https://static.alili.tech/img/remote/1460000015048423" alt="" title="" style="cursor: pointer;"></span></p>
<p>Webpack Analyse &#x4E0D;&#x4F1A;&#x628A;&#x4F60;&#x9009;&#x62E9;&#x7684; <code>stats.json</code> &#x6587;&#x4EF6;&#x53D1;&#x8FBE;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x672C;&#x5730;&#x89E3;&#x6790;&#xFF0C;&#x4F60;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x4E3A;&#x6B64;&#x800C;&#x6CC4;&#x9732;&#x3002; &#x9009;&#x62E9;&#x6587;&#x4EF6;&#x540E;&#xFF0C;&#x4F60;&#x9A6C;&#x4E0A;&#x5C31;&#x80FD;&#x5982;&#x4E0B;&#x7684;&#x6548;&#x679C;&#x56FE;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048424" src="https://static.alili.tech/img/remote/1460000015048424" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x5B83;&#x5206;&#x4E3A;&#x4E86;&#x516D;&#x5927;&#x677F;&#x5757;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;</p>
<ul>
<li>
<code>Modules</code>&#xFF1A;&#x5C55;&#x793A;&#x6240;&#x6709;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x5E76;&#x4E14;&#x8FD8;&#x5305;&#x542B;&#x6240;&#x6709;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x56FE;&#x3001;&#x6A21;&#x5757;&#x8DEF;&#x5F84;&#x3001;&#x6A21;&#x5757;ID&#x3001;&#x6A21;&#x5757;&#x6240;&#x5C5E; Chunk&#x3001;&#x6A21;&#x5757;&#x5927;&#x5C0F;&#xFF1B;</li>
<li>
<code>Chunks</code>&#xFF1A;&#x5C55;&#x793A;&#x6240;&#x6709;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x3002;&#x5E76;&#x4E14;&#x8FD8;&#x5305;&#x542B;&#x4EE3;&#x7801;&#x5757;&#x7684;ID&#x3001;&#x540D;&#x79F0;&#x3001;&#x5927;&#x5C0F;&#x3001;&#x6BCF;&#x4E2A;&#x4EE3;&#x7801;&#x5757;&#x5305;&#x542B;&#x7684;&#x6A21;&#x5757;&#x6570;&#x91CF;&#xFF0C;&#x4EE5;&#x53CA;&#x4EE3;&#x7801;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x56FE;&#xFF1B;</li>
<li>
<code>Assets</code>&#xFF1A;&#x5C55;&#x793A;&#x6240;&#x6709;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x8D44;&#x6E90;&#xFF0C;&#x5305;&#x62EC; <code>.js</code>&#x3001;<code>.css</code>&#x3001;&#x56FE;&#x7247;&#x7B49;&#x3002;&#x5E76;&#x4E14;&#x8FD8;&#x5305;&#x62EC;&#x6587;&#x4EF6;&#x540D;&#x79F0;&#x3001;&#x5927;&#x5C0F;&#x3001;&#x8BE5;&#x6587;&#x4EF6;&#x6765;&#x81EA;&#x54EA;&#x4E2A;&#x4EE3;&#x7801;&#x5757;&#xFF1B;</li>
<li>
<code>Warnings</code>&#xFF1A;&#x5C55;&#x793A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x73B0;&#x7684;&#x6240;&#x6709;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#xFF1B;</li>
<li>
<code>Errors</code>&#xFF1A;&#x5C55;&#x793A;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x51FA;&#x73B0;&#x7684;&#x6240;&#x6709;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF1B;</li>
<li>
<code>Hints</code>&#xFF1A;&#x5C55;&#x793A;&#x5904;&#x7406;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x8017;&#x65F6;&#x3002;</li>
</ul>
<p>&#x4E0B;&#x9762;&#x4EE5;&#x5728; 3-10&#x7BA1;&#x7406;&#x591A;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528; &#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x9879;&#x76EE;&#x4E3A;&#x4F8B;&#xFF0C;&#x6765;&#x5206;&#x6790;&#x5176; <code>stats.json</code> &#x6587;&#x4EF6;&#x3002;</p>
<p>&#x70B9;&#x51FB; <strong>Modules</strong>&#xFF0C;&#x67E5;&#x770B;&#x6A21;&#x5757;&#x4FE1;&#x606F;&#xFF0C;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048425?w=2695&amp;h=1621" src="https://static.alili.tech/img/remote/1460000015048425?w=2695&amp;h=1621" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>&#x7531;&#x4E8E;&#x4F9D;&#x8D56;&#x4E86;&#x5927;&#x91CF;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#xFF0C;&#x6587;&#x4EF6;&#x6570;&#x91CF;&#x5927;&#xFF0C;&#x5BFC;&#x81F4;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x56FE;&#x592A;&#x5BC6;&#x96C6;&#x800C;&#x65E0;&#x6CD5;&#x770B;&#x6E05;&#xFF0C;&#x4F46;&#x4F60;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x653E;&#x5927;&#x67E5;&#x770B;&#x3002;</blockquote>
<p>&#x70B9;&#x51FB; <strong>Chunks</strong>&#xFF0C;&#x67E5;&#x770B;&#x4EE3;&#x7801;&#x5757;&#x4FE1;&#x606F;&#xFF0C;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048426" src="https://static.alili.tech/img/remote/1460000015048426" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>&#x7531;&#x4EE3;&#x7801;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x56FE;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x4E24;&#x4E2A;&#x9875;&#x9762;&#x7EA7;&#x7684;&#x4EE3;&#x7801;&#x5757; <code>login</code> &#x548C; <code>index</code> &#x4F9D;&#x8D56;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x5757; common&#x3002;</blockquote>
<p>&#x70B9;&#x51FB; <strong>Assets</strong>&#xFF0C;&#x67E5;&#x770B;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x8D44;&#x6E90;&#xFF0C;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048427" src="https://static.alili.tech/img/remote/1460000015048427" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x70B9;&#x51FB; <strong>Hints</strong>&#xFF0C;&#x67E5;&#x770B;&#x8F93;&#x51FA;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x8017;&#x65F6;&#x5206;&#x5E03;&#xFF0C;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048428" src="https://static.alili.tech/img/remote/1460000015048428" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>&#x4ECE; Hints &#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x5728;&#x5904;&#x7406;&#x8FC7;&#x7A0B;&#x7684;&#x5F00;&#x59CB;&#x65F6;&#x95F4;&#x548C;&#x7ED3;&#x675F;&#x65F6;&#x95F4;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x627E;&#x51FA;&#x662F;&#x54EA;&#x4E2A;&#x6587;&#x4EF6;&#x5BFC;&#x81F4;&#x6784;&#x5EFA;&#x7F13;&#x6162;&#x3002;</blockquote>
<h2 id="articleHeader57"><code>webpack-bundle-analyzer</code></h2>
<p><a href="https://www.npmjs.com/package/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a> &#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x53EF;&#x89C6;&#x5316;&#x5206;&#x6790;&#x5DE5;&#x5177;&#xFF0C; &#x5B83;&#x867D;&#x7136;&#x6CA1;&#x6709;&#x5B98;&#x65B9;&#x90A3;&#x6837;&#x6709;&#x90A3;&#x4E48;&#x591A;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x6BD4;&#x5B98;&#x65B9;&#x7684;&#x8981;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x3002;</p>
<p>&#x5148;&#x6765;&#x770B;&#x4E0B;&#x5B83;&#x7684;&#x6548;&#x679C;&#x56FE;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015048429" src="https://static.alili.tech/img/remote/1460000015048429" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x5B83;&#x80FD;&#x65B9;&#x4FBF;&#x7684;&#x8BA9;&#x4F60;&#x77E5;&#x9053;&#xFF1A;</p>
<ul>
<li>&#x6253;&#x5305;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x90FD;&#x5305;&#x542B;&#x4E86;&#x4EC0;&#x4E48;&#xFF1B;</li>
<li>&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x5C3A;&#x5BF8;&#x5728;&#x603B;&#x4F53;&#x4E2D;&#x7684;&#x5360;&#x6BD4;&#xFF0C;&#x4E00;&#x773C;&#x770B;&#x51FA;&#x54EA;&#x4E9B;&#x6587;&#x4EF6;&#x5C3A;&#x5BF8;&#x5927;&#xFF1B;</li>
<li>&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x5305;&#x542B;&#x5173;&#x7CFB;&#xFF1B;</li>
<li>&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7684; Gzip &#x540E;&#x7684;&#x5927;&#x5C0F;&#x3002;</li>
</ul>
<p>&#x63A5;&#x5165; <code>webpack-bundle-analyzer</code> &#x7684;&#x65B9;&#x6CD5;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p>
<ol>
<li>&#x5B89;&#x88C5; webpack-bundle-analyzer &#x5230;&#x5168;&#x5C40;&#xFF0C;&#x6267;&#x884C;&#x547D;&#x4EE4; <code>npm i -g webpack-bundle-analyzer</code>&#xFF1B;</li>
<li>&#x6309;&#x7167;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#x751F;&#x6210; <code>stats.json</code> &#x6587;&#x4EF6;&#xFF1B;</li>
<li>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E2D;&#x6267;&#x884C; <code>webpack-bundle-analyzer</code> &#x540E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x6253;&#x5F00;&#x5BF9;&#x5E94;&#x7F51;&#x9875;&#x770B;&#x5230;&#x4EE5;&#x4E0A;&#x6548;&#x679C;&#x3002;</li>
</ol>
<h1 id="articleHeader58">&#x4F18;&#x5316;&#x603B;&#x7ED3;</h1>
<p>&#x672C;&#x7AE0;&#x4ECE;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x548C;&#x8F93;&#x51FA;&#x8D28;&#x91CF;&#x4E24;&#x4E2A;&#x89D2;&#x5EA6;&#x8BB2;&#x89E3;&#x4E86;&#x5982;&#x4F55;&#x4F18;&#x5316;&#x9879;&#x76EE;&#x4E2D;&#x7684; Webpack &#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x4E9B;&#x4F18;&#x5316;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x6765;&#x81EA;&#x9879;&#x76EE;&#x5B9E;&#x6218;&#x4E2D;&#x7684;&#x7ECF;&#x9A8C;&#x79EF;&#x7D2F;&#x3002; &#x867D;&#x7136;&#x6BCF;&#x4E00;&#x5C0F;&#x8282;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x5E76;&#x4E0D;&#x51B2;&#x7A81;&#x53EF;&#x4EE5;&#x76F8;&#x4E92;&#x7EC4;&#x5408;&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x6700;&#x4F73;&#x7684;&#x6548;&#x679C;&#x3002;</p>
<p>&#x4EE5;&#x4E0B;&#x5C06;&#x7ED9;&#x51FA;&#x662F;&#x7ED3;&#x5408;&#x4E86;&#x672C;&#x7AE0;&#x6240;&#x6709;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x4F8B;&#x9879;&#x76EE;&#xFF0C;&#x7531;&#x4E8E;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x548C;&#x8F93;&#x51FA;&#x8D28;&#x91CF;&#x4E0D;&#x80FD;&#x517C;&#x5F97;&#xFF0C;&#x6309;&#x7167;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#x4E3A;&#x8BE5;&#x9879;&#x76EE;&#x914D;&#x7F6E;&#x4E86;&#x4E24;&#x4EFD;&#x6587;&#x4EF6;&#xFF0C;&#x5206;&#x522B;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><strong>&#x4FA7;&#x91CD;&#x4F18;&#x5316;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>webpack.config.js</code>&#xFF1A;</strong></p>
<p>&lt;p data-height=&quot;565&quot; data-theme-id=&quot;0&quot; data-slug-hash=&quot;pVMVgW&quot; data-default-tab=&quot;js&quot; data-user=&quot;whjin&quot; data-embed-version=&quot;2&quot; data-pen-title=&quot;webpack-dist.config.js&quot; class=&quot;codepen&quot;&gt;See the Pen <a href="https://codepen.io/whjin/pen/pVMVgW/" rel="nofollow noreferrer" target="_blank">webpack-dist.config.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/pVMVgW/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src=&quot;<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>&#x672C;&#x7AE0;&#x4ECB;&#x7ECD;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#x867D;&#x7136;&#x96BE;&#x4EE5;&#x6DB5;&#x76D6; Webpack &#x7684;&#x65B9;&#x65B9;&#x9762;&#x9762;&#xFF0C;&#x4F46;&#x8DB3;&#x4EE5;&#x89E3;&#x51B3;&#x5B9E;&#x6218;&#x4E2D;&#x5E38;&#x89C1;&#x7684;&#x573A;&#x666F;&#x3002; &#x5BF9;&#x4E8E;&#x672C;&#x4E66;&#x6CA1;&#x6709;&#x4ECB;&#x7ECD;&#x5230;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x9700;&#x6C42;&#x6309;&#x7167;&#x4EE5;&#x4E0B;&#x601D;&#x8DEF;&#x53BB;&#x4F18;&#x5316;&#xFF1A;</p>
<ol>
<li>&#x627E;&#x51FA;&#x95EE;&#x9898;&#x7684;&#x539F;&#x56E0;&#xFF1B;</li>
<li>&#x627E;&#x51FA;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x65B9;&#x6CD5;&#xFF1B;</li>
<li>&#x5BFB;&#x627E;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x65B9;&#x6CD5;&#x5BF9;&#x5E94;&#x7684; Webpack &#x96C6;&#x6210;&#x65B9;&#x6848;&#x3002;</li>
</ol>
<p>&#x540C;&#x65F6;&#x4F60;&#x8FD8;&#x9700;&#x8981;&#x8DDF;&#x7D27;&#x793E;&#x533A;&#x7684;&#x8FED;&#x4EE3;&#xFF0C;&#x5B66;&#x4E60;&#x4ED6;&#x4EBA;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6CD5;&#xFF0C;&#x4E86;&#x89E3;&#x6700;&#x65B0;&#x7684; Webpack &#x7279;&#x6027;&#x548C;&#x65B0;&#x6D8C;&#x73B0;&#x51FA;&#x7684;&#x63D2;&#x4EF6;&#x3001;Loader&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack优化

## 原文链接
[https://segmentfault.com/a/1190000015048417](https://segmentfault.com/a/1190000015048417)

