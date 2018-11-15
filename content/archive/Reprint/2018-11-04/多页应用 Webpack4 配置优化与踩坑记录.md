---
title: 多页应用 Webpack4 配置优化与踩坑记录
reprint: true
categories: reprint
abbrlink: 2fc41a21
date: 2018-11-04 02:30:10
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x65B0;&#x8D77;&#x4E86;&#x4E00;&#x4E2A;&#x591A;&#x9875;&#x9879;&#x76EE;&#xFF0C;&#x4E4B;&#x524D;&#x90FD;&#x672A;&#x4F7F;&#x7528; webpack4&#xFF0C;&#x4E8E;&#x662F;&#x51C6;&#x5907;&#x4E0A;&#x624B;&#x5B9E;&#x8DF5;&#x4E00;&#x4E0B;&#x3002;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x4ECB;&#x7ECD;&#xFF0C;&#x5BF9;&#x4E8E;&#x6B63;&#x51C6;&#x5907;&#x4F7F;&#x7528; webpack4 &#x7684;&#x540C;&#x5B66;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x53C2;&#x8003;&#x3002;</p><p>webpack4 &#x76F8;&#x6BD4;&#x4E4B;&#x524D;&#x7684; 2 &#x4E0E; 3&#xFF0C;&#x6539;&#x53D8;&#x5F88;&#x5927;&#x3002;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x662F;&#x5F88;&#x591A;&#x914D;&#x7F6E;&#x5DF2;&#x7ECF;&#x5185;&#x7F6E;&#xFF0C;&#x4F7F;&#x5F97; webpack &#x80FD;&#x201C;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x201D;&#x3002;&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x4E0D;&#x53EF;&#x80FD;&#x6EE1;&#x8DB3;&#x6240;&#x6709;&#x60C5;&#x51B5;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x591A;&#x4EE5;&#x5F80;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x4E86;&#x3002;&#x6BD4;&#x5982;&#x5728;&#x4E4B;&#x524D;&#xFF0C;&#x538B;&#x7F29;&#x6DF7;&#x6DC6;&#x4EE3;&#x7801;&#xFF0C;&#x9700;&#x8981;&#x589E;&#x52A0;<code>uglify</code>&#x63D2;&#x4EF6;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347;(scope hosting)&#x9700;&#x8981;&#x589E;&#x52A0;<code>ModuleConcatenationPlugin</code>&#x3002;&#x800C;&#x5728; webpack4 &#x4E2D;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x8BBE;&#x7F6E; <code>mode</code> &#x4E3A; <code>production</code>&#x5373;&#x53EF;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x518D;&#x5F3A;&#x884C;&#x589E;&#x52A0;&#x8FD9;&#x4E9B;&#x63D2;&#x4EF6;&#x4E5F;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x5EFA;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x60F3;&#x8FC1;&#x79FB;&#x5230; webpack4&#xFF0C;&#x8FD8;&#x662F;&#x4ECE; 0 &#x5F00;&#x59CB;&#x505A;&#x52A0;&#x6CD5;&#xFF0C;&#x53C2;&#x8003;&#x5386;&#x53F2;&#xFF0C;&#x91CD;&#x65B0;&#x505A;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x3002;&#x800C;&#x4E0D;&#x662F;&#x4ECE;&#x5386;&#x53F2;&#x7684;&#x914D;&#x7F6E;&#x91CC;&#x5220;&#x5220;&#x51CF;&#x51CF;&#xFF0C;&#x518D;&#x5347;&#x7EA7;&#x4E3A; webpack4&#x3002;&#x8FD9;&#x6837; webpack4 &#x7684;&#x914D;&#x7F6E;&#x4F1A;&#x663E;&#x5F97;&#x66F4;&#x7CBE;&#x7B80;&#x3002;</p><h2 id="articleHeader1">&#x6253;&#x5305;&#x4F18;&#x5316;</h2><p>&#x6253;&#x5305;&#x4F18;&#x5316;&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x591A;&#x9875;&#x5E94;&#x7528;&#x6784;&#x5EFA;&#x65F6;&#xFF0C;&#x5BF9;&#x6240;&#x6709;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x4F9D;&#x8D56;&#x8FDB;&#x884C;&#x5408;&#x7406;&#x6253;&#x5305;&#x3002;&#x8FD9;&#x4E2A;&#x76EE;&#x524D;&#x4E1A;&#x754C;&#x90FD;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x5F88;&#x591A;&#x5B9E;&#x8DF5;&#xFF0C;&#x5305;&#x62EC; webpack4&#xFF0C;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x6587;&#x7AE0;&#x4ECB;&#x7ECD;&#x3002;&#x6211;&#x518D;&#x8865;&#x5145;&#x51E0;&#x4E2A;&#x4E0D;&#x5BB9;&#x6613;&#x6CE8;&#x610F;&#x7684;&#x5C0F;&#x7EC6;&#x8282;&#x3002;&#x6709;&#x4E9B;&#x70B9;&#x6211;&#x4E0D;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#xFF0C;&#x4E0D;&#x719F;&#x6089; webpack &#x914D;&#x7F6E;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x4E0D;&#x660E;&#x767D;&#xFF0C;&#x53EF;&#x4EE5;&#x641C;&#x7D22;&#x5BF9;&#x5E94;&#x5173;&#x952E;&#x8BCD;&#xFF0C;&#x7F51;&#x4E0A;&#x80AF;&#x5B9A;&#x6709;&#x975E;&#x5E38;&#x8BE6;&#x7EC6;&#x7684;&#x6587;&#x7AE0;&#x4ECB;&#x7ECD;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6784;&#x5EFA;&#x591A;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x5F80;&#x5F80;&#x4F1A;&#x62BD;&#x79BB;&#x5982;&#x4E0B;&#x51E0;&#x4E2A; chunk &#x5305;&#xFF1A;</p><ol><li><code>common</code>&#xFF1A;&#x5C06;&#x88AB;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x540C;&#x65F6;&#x5F15;&#x7528;&#x7684;&#x4F9D;&#x8D56;&#x5305;&#x6253;&#x5230;&#x4E00;&#x4E2A; common chunk &#x4E2D;&#x3002;&#x7F51;&#x4E0A;&#x5927;&#x90E8;&#x5206;&#x6559;&#x7A0B;&#x662F;&#x88AB;&#x5F15;&#x5165;&#x4E24;&#x6B21;&#x5373;&#x6253;&#x5165; common&#x3002;&#x6211;&#x5EFA;&#x8BAE;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9875;&#x9762;&#x6570;&#x91CF;&#x6765;&#x8C03;&#x6574;&#xFF0C;&#x5728;&#x6211;&#x7684;&#x5DE5;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x8BBE;&#x7F6E;&#x5F15;&#x5165;&#x6B21;&#x6570;&#x8D85;&#x8FC7;&#x9875;&#x9762;&#x6570;&#x91CF;&#x7684; 1/3 &#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x6253;&#x5165; common &#x5305;&#x3002;</li><li><code>dll</code>: &#x5C06;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x5F15;&#x7528;&#x7684;&#x4E14;&#x57FA;&#x672C;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x7684;&#x4F9D;&#x8D56;&#x5305;&#xFF0C;&#x5982; react/react-dom &#x7B49;&#x518D;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#xFF0C;&#x4E0D;&#x8BA9;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x7684;&#x53D8;&#x5316;&#x6C61;&#x67D3; dll &#x5E93;&#x7684; hash &#x7F13;&#x5B58;&#x3002;</li><li><code>manifest</code>: webpack &#x8FD0;&#x884C;&#x65F6;(runtime)&#x4EE3;&#x7801;&#x3002;&#x6BCF;&#x5F53;&#x4F9D;&#x8D56;&#x5305;&#x53D8;&#x5316;&#xFF0C;webpack &#x7684;&#x8FD0;&#x884C;&#x65F6;&#x4EE3;&#x7801;&#x4E5F;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x5982;&#x82E5;&#x4E0D;&#x5C06;&#x8FD9;&#x90E8;&#x5206;&#x62BD;&#x79BB;&#x5F00;&#x6765;&#xFF0C;&#x589E;&#x52A0;&#x4E86; common &#x5305; hash &#x503C;&#x53D8;&#x5316;&#x7684;&#x53EF;&#x80FD;&#x6027;&#x3002;</li><li>&#x9875;&#x9762;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;<code>page.js</code></li></ol><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x7ED9;&#x6253;&#x51FA;&#x7684; chunk &#x5305;&#x540D;&#xFF0C;&#x6CE8;&#x5165; contentHash&#xFF0C;&#x4EE5;&#x5B9E;&#x73B0;&#x6700;&#x5927;&#x7F13;&#x5B58;&#x6548;&#x679C;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x5206; chunk &#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x4E2A;&#x601D;&#x60F3;&#x5C31;&#x662F;&#xFF0C;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x53D1;&#x5E03;&#xFF0C;&#x5C3D;&#x91CF;&#x51CF;&#x5C11; chunk hash &#x503C;&#x7684;&#x6539;&#x53D8;&#x3002;&#x8FD9;&#x4E2A;&#x5728;&#x4E1A;&#x754C;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x975E;&#x5E38;&#x591A;&#x7684;&#x5B9E;&#x8DF5;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF1A;<a href="https://github.com/pigcan/blog/issues/9" rel="nofollow noreferrer" target="_blank">https://github.com/pigcan/blo...</a></p><p>&#x4E0D;&#x8FC7;&#x5728; webpack4 &#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x7528;&#x518D;&#x589E;&#x52A0;&#x8FD9;&#x4E48;&#x591A;&#x63D2;&#x4EF6;&#x5566;&#xFF0C;&#x4E00;&#x4E2A; optimization &#x914D;&#x7F6E;&#x5B8C;&#x5168;&#x5C31;&#x80FD;&#x641E;&#x5B9A;&#x3002;</p><p>&#x6211;&#x5148;&#x8D34;&#x4E0A;&#x6211;&#x7684; webpack &#x7684; optimization &#x914D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x518D;&#x5BF9;&#x5176;&#x505A;&#x4E00;&#x4E9B;&#x4ECB;&#x7ECD;&#xFF0C;&#x52A0;&#x6DF1;&#x5927;&#x5BB6;&#x5370;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const commonOptions = {
  chunks: &apos;all&apos;,
  reuseExistingChunk: true
}

export default {
  namedChunks: true,
  moduleIds: &apos;hashed&apos;,
  runtimeChunk: {
    name: &apos;manifest&apos;
  },
  splitChunks: {
    maxInitialRequests: 5,
    cacheGroups: {
      polyfill: {
        test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
        name: &apos;polyfill&apos;,
        priority: 2,
        ...commonOptions
      },
      dll: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: &apos;dll&apos;,
        priority: 1,
        ...commonOptions
      },
      commons: {
        name: &apos;commons&apos;,
        minChunks: Math.ceil(pages.length / 3), // &#x81F3;&#x5C11;&#x88AB;1/3&#x9875;&#x9762;&#x7684;&#x5F15;&#x5165;&#x624D;&#x6253;&#x5165;common&#x5305;
        ...commonOptions
      }
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> commonOptions = {
  <span class="hljs-attr">chunks</span>: <span class="hljs-string">&apos;all&apos;</span>,
  <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">namedChunks</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">moduleIds</span>: <span class="hljs-string">&apos;hashed&apos;</span>,
  <span class="hljs-attr">runtimeChunk</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;manifest&apos;</span>
  },
  <span class="hljs-attr">splitChunks</span>: {
    <span class="hljs-attr">maxInitialRequests</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">cacheGroups</span>: {
      <span class="hljs-attr">polyfill</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;polyfill&apos;</span>,
        <span class="hljs-attr">priority</span>: <span class="hljs-number">2</span>,
        ...commonOptions
      },
      <span class="hljs-attr">dll</span>: {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/](react|react-dom)[\\/]/</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;dll&apos;</span>,
        <span class="hljs-attr">priority</span>: <span class="hljs-number">1</span>,
        ...commonOptions
      },
      <span class="hljs-attr">commons</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;commons&apos;</span>,
        <span class="hljs-attr">minChunks</span>: <span class="hljs-built_in">Math</span>.ceil(pages.length / <span class="hljs-number">3</span>), <span class="hljs-comment">// &#x81F3;&#x5C11;&#x88AB;1/3&#x9875;&#x9762;&#x7684;&#x5F15;&#x5165;&#x624D;&#x6253;&#x5165;common&#x5305;</span>
        ...commonOptions
      }
    }
  }
}</code></pre><h3 id="articleHeader2">runtimeChunk</h3><p>&#x5728; webpack4 &#x4E4B;&#x524D;&#xFF0C;&#x62BD;&#x79BB; manifest&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528; CommonsChunkPlugin&#xFF0C;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;&#x6307;&#x5B9A; name &#x5C5E;&#x6027;&#x4E3A;&apos;manifest&apos;&#x7684; chunk&#x3002;&#x5728; webpack4 &#x4E2D;&#xFF0C;&#x65E0;&#x9700;&#x624B;&#x52A8;&#x5F15;&#x5165;&#x63D2;&#x4EF6;&#xFF0C;&#x914D;&#x7F6E; runtimeChunk &#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader3">splitChunks</h3><p>&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x4EE5;&#x4E00;&#x5B9A;&#x89C4;&#x5219;&#x62BD;&#x79BB;&#x60F3;&#x8981;&#x7684;&#x5305;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x62BD;&#x597D;&#x51E0;&#x4E2A;&#x5305;&#xFF0C;&#x5982; verdor + common&#xFF0C;&#x6240;&#x4EE5; splitChunks &#x4E2D;&#x63D0;&#x4F9B; cacheGroups &#x5B57;&#x6BB5;&#xFF0C;cacheGroups &#x6BCF;&#x589E;&#x52A0;&#x4E00;&#x4E2A; key&#xFF0C;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x591A;&#x4E00;&#x4E2A;&#x62BD;&#x5305;&#x89C4;&#x5219;&#x3002;</p><p>&#x5728;&#x7F51;&#x4E0A;&#x5F88;&#x591A;&#x6559;&#x7A0B;&#x4E2D;&#xFF0C;dll &#x5F80;&#x5F80;&#x662F;&#x4E13;&#x95E8;&#x518D;&#x52A0;&#x4E00;&#x4E2A; webpack &#x914D;&#x7F6E;&#xFF0C;&#x4F7F;&#x7528; DllPlugin &#x6765;&#x6784;&#x5EFA; dll &#x5E93;&#xFF0C;&#x518D;&#x5728;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x5DE5;&#x7A0B;&#x7684; webpack &#x4E2D;&#x5229;&#x7528; DllReferencePlugin &#x6765;&#x6620;&#x5C04; dll &#x5E93;&#x3002;&#x867D;&#x7136;&#x8FD9;&#x6837;&#x6784;&#x5EFA;&#x901F;&#x5EA6;&#x4F1A;&#x5FEB;&#x4E0D;&#x5C11;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x54CE;&#xFF0C;&#x662F;&#x771F; TM &#x70E6;.....</p><p>&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x6015;&#x70E6;&#x7684;&#x4EBA;&#xFF0C;&#x6211;&#x60C5;&#x613F;&#x5728; webpack4 &#x4E2D;&#x5229;&#x7528; splitChunks&#xFF0C;&#x914D;&#x597D;&#x89C4;&#x5219;&#xFF0C;&#x518D;&#x62BD;&#x79BB;&#x5BF9;&#x5E94;&#x7684; dll &#x5305;&#x3002;&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x9009;&#x62E9;&#x65B9;&#x6848;&#x3002;</p><p>&#x9664;&#x4E86; dll &#x4E0E; common &#x4E24;&#x4E2A; chunk&#xFF0C;&#x6211;&#x8FD8;&#x52A0;&#x4E86;&#x4E00;&#x4E2A; polyfill&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7528;&#x7684;&#x67D0;&#x4E9B;&#x65B0;&#x7684;&#x5E93;&#x6216;&#x8005;&#x4F7F;&#x7528;&#x67D0;&#x4E9B; ES6+&#x8BED;&#x6CD5;(&#x5982; async/await)&#x9700;&#x8981; runtime &#x57AB;&#x7247;&#x3002;&#x6BD4;&#x5982;&#x6211;&#x5DE5;&#x7A0B;&#x4E2D;&#x4F7F;&#x7528;&#x4E86; react16&#xFF0C;&#x9700;&#x8981;&#x589E;&#x52A0;<code>Map</code>/<code>Set</code>/<code>requestAnimationFrame</code> (<a href="https://reactjs.org/docs/javascript-environment-requirements.html)" rel="nofollow noreferrer" target="_blank">https://reactjs.org/docs/java...</a>&#x3002;&#x90A3;&#x6211;&#x5FC5;&#x987B;&#x5728; dll &#x5E93;&#x52A0;&#x8F7D;&#x4E4B;&#x524D;&#x589E;&#x52A0; polyfill&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x5C06;&#x6240;&#x6709; core-js &#x4E0E; babel &#x5F15;&#x5165;&#x7684;&#x5305;&#x4E13;&#x95E8;&#x6253;&#x8FDB; polyfill&#xFF0C;&#x4FDD;&#x8BC1;&#x540E;&#x7EED;&#x52A0;&#x8F7D;&#x7684; chunk &#x80FD;&#x6267;&#x884C;&#x3002;<code>priority</code>&#x5B57;&#x6BB5;&#x7528;&#x6765;&#x914D;&#x7F6E; chunk &#x7684;&#x5F15;&#x5165;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x4E00;&#x822C;&#x7684;&#x9879;&#x76EE;&#x5E94;&#x8BE5;&#x90FD;&#x662F; polyfill &gt; dll &gt; common &gt; page&#x3002;</p><p>splitChunks &#x4E2D;&#x914D;&#x7F6E;&#x9879;<code>maxInitialRequests</code>&#x8868;&#x793A;&#x5728;&#x4E00;&#x4E2A;&#x5165;&#x53E3;(entry)&#x4E2D;&#xFF0C;&#x6700;&#x5927;&#x521D;&#x59CB;&#x8BF7;&#x6C42; chunk &#x6570;(&#x4E0D;&#x5305;&#x542B;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#xFF0C;&#x5373; dom &#x4E2D; script &#x5F15;&#x5165;&#x7684; chunk)&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 3&#x3002;&#x6211;&#x73B0;&#x5728; cacheGroups &#x4E2D;&#x5DF2;&#x7ECF;&#x6709;&#x4E09;&#x4E2A;&#xFF0C;&#x53C8;&#x56E0;&#x4E3A;&#x914D;&#x7F6E;&#x4E86; runtimeChunk&#xFF0C;&#x4F1A;&#x6253;&#x51FA; manifest&#xFF0C;&#x6545;&#x800C;&#x603B;&#x5171;&#x6709; 4 &#x4E2A; chunk &#x5305;&#xFF0C;&#x8D85;&#x51FA;&#x4E86;&#x9ED8;&#x8BA4; 3 &#x4E2A;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x914D;&#x7F6E;&#x503C;&#x3002;</p><h3 id="articleHeader4">moduleIds</h3><p>&#x7A0D;&#x5FAE;&#x4E86;&#x89E3;&#x8FC7; webpack &#x8FD0;&#x884C;&#x673A;&#x5236;&#x7684;&#x540C;&#x5B66;&#x4F1A;&#x77E5;&#x9053;&#xFF0C;&#x9879;&#x76EE;&#x5DE5;&#x7A0B;&#x4E2D;&#x52A0;&#x8F7D;&#x7684; module&#xFF0C;webpack &#x4F1A;&#x4E3A;&#x5176;&#x5206;&#x914D;&#x4E00;&#x4E2A; moduleId&#xFF0C;&#x6620;&#x5C04;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x5757;&#x3002;&#x8FD9;&#x6837;&#x4EA7;&#x751F;&#x7684;&#x95EE;&#x9898;&#x662F;&#x4E00;&#x65E6;&#x5DE5;&#x7A0B;&#x4E2D;&#x6A21;&#x5757;&#x6709;&#x589E;&#x5220;&#x6216;&#x8005;&#x987A;&#x5E8F;&#x53D8;&#x5316;&#xFF0C;moduleId &#x5C31;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x8FDB;&#x800C;&#x53EF;&#x80FD;&#x5F71;&#x54CD;&#x6240;&#x6709; chunk &#x7684; content hash &#x503C;&#x3002;&#x53EA;&#x662F;&#x56E0;&#x4E3A; moduleId &#x53D8;&#x5316;&#x5C31;&#x5BFC;&#x81F4;&#x7F13;&#x5B58;&#x5931;&#x6548;&#xFF0C;&#x8FD9;&#x80AF;&#x5B9A;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x5728; webpack4 &#x4EE5;&#x524D;&#xFF0C;&#x901A;&#x8FC7; <code>HashedModuleIdsPlugin</code> &#x63D2;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x6A21;&#x5757;&#x7684;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x6210; hash &#x503C;&#xFF0C;&#x6765;&#x66FF;&#x4EE3; moduleId&#xFF0C;&#x56E0;&#x4E3A;&#x6A21;&#x5757;&#x8DEF;&#x5F84;&#x662F;&#x57FA;&#x672C;&#x4E0D;&#x53D8;&#x7684;&#xFF0C;&#x6545;&#x800C; hash &#x503C;&#x4E5F;&#x57FA;&#x672C;&#x4E0D;&#x53D8;&#x3002;</p><p>&#x4F46;&#x5728; webpack4 &#x4E2D;&#xFF0C;&#x53EA;&#x9700;&#x8981;<code>optimization</code>&#x7684;&#x914D;&#x7F6E;&#x9879;&#x4E2D;&#x8BBE;&#x7F6E; <code>moduleIds</code> &#x4E3A; <code>hashed</code> &#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader5">namedChunks</h3><p>&#x9664;&#x4E86; moduleId&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5206;&#x79BB;&#x51FA;&#x7684; chunk &#x4E5F;&#x6709;&#x5176; chunkId&#x3002;&#x540C;&#x6837;&#x7684;&#xFF0C;chunkId &#x4E5F;&#x6709;&#x56E0;&#x5176; chunkId &#x53D1;&#x751F;&#x53D8;&#x5316;&#x800C;&#x5BFC;&#x81F4;&#x7F13;&#x5B58;&#x5931;&#x6548;&#x7684;&#x95EE;&#x9898;&#x3002;&#x7531;&#x4E8E;<code>manifest</code>&#x4E0E;&#x6253;&#x51FA;&#x7684; chunk &#x5305;&#x4E2D;&#x6709;<code>chunkId</code>&#x76F8;&#x5173;&#x6570;&#x636E;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x65E6;&#x5982;&#x201C;&#x589E;&#x5220;&#x9875;&#x9762;&#x201D;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x5BFC;&#x81F4; chunkId &#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5F71;&#x54CD;&#x5F88;&#x591A;&#x7684; chunk &#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;</p><p>&#x5728; webpack4 &#x4EE5;&#x524D;&#xFF0C;&#x901A;&#x8FC7;&#x589E;&#x52A0;<code>NamedChunksPlugin</code>&#xFF0C;&#x4F7F;&#x7528; chunkName &#x6765;&#x66FF;&#x6362; chunkId&#xFF0C;&#x5B9E;&#x73B0;&#x56FA;&#x5316; chunkId&#xFF0C;&#x4FDD;&#x6301;&#x7F13;&#x5B58;&#x7684;&#x80FD;&#x529B;&#x3002;&#x5728; webpack4 &#x4E2D;&#xFF0C;&#x53EA;&#x9700;&#x5728;<code>optimization</code>&#x7684;&#x914D;&#x7F6E;&#x9879;&#x4E2D;&#x8BBE;&#x7F6E; <code>namedChunks</code> &#x4E3A; <code>true</code> &#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader6">css &#x76F8;&#x5173;</h3><p>&#x5728; webpack4 &#x4EE5;&#x524D;&#xFF0C;&#x4F7F;&#x7528; <code>extract-text-webpack-plugin</code> &#x63D2;&#x4EF6;&#x5C06; css &#x4ECE; js &#x5305;&#x4E2D;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x5355;&#x72EC;&#x6253;&#x5305;&#x3002;&#x5728; webpack &#x4E2D;&#x5219;&#x9700;&#x8981;&#x6362;&#x6210; <code>MiniCssExtractPlugin</code>&#x3002;&#x5E76;&#x4E14;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x6216;&#x8005;&#x9700;&#x8981; HMR&#xFF08;&#x6A21;&#x5757;&#x70ED;&#x66FF;&#x6362;&#xFF09;&#x65F6;&#xFF0C;&#x8981;&#x7528; <code>MiniCssExtractPlugin.loader</code> &#x66FF;&#x6362; <code>style-loader</code>&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x5751;&#x3002;&#x7531;&#x4E8E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6211;&#x4EEC;&#x4F1A;&#x914D;&#x7F6E;&#x70ED;&#x66F4;&#x65B0;&#xFF0C;css &#x7684;&#x70ED;&#x66F4;&#x65B0;&#x76EE;&#x524D;<code>MiniCssExtractPlugin.loader</code>&#x81EA;&#x8EAB;&#x8FD8;&#x5F85;&#x652F;&#x6301;&#xFF0C;&#x6545;&#x800C;&#x8FD8;&#x9700;&#x8981;&#x589E;&#x52A0; <code>css-hot-loader</code>&#x3002; <strong>&#x5207;&#x8BB0;&#xFF0C;<code>css-hot-loader</code>&#x4E00;&#x5B9A;&#x4E0D;&#x80FD;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x4F7F;&#x7528;&#x3002;&#x5426;&#x5219;&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x6240;&#x6709; js chunk &#x5305;&#x7684; contentHash &#x503C;&#x90FD;&#x4F1A;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x8FDB;&#x800C;&#x5BFC;&#x81F4;&#x6240;&#x6709; js &#x7F13;&#x5B58;&#x5931;&#x6548;&#x3002;</strong> &#x56E0;&#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x589E;&#x52A0;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x4E0D;&#x4F1A;&#x6709;&#x4EFB;&#x4F55;&#x62A5;&#x9519;&#xFF0C;&#x9875;&#x9762;&#x4E5F;&#x80FD;&#x6B63;&#x5E38;&#x6784;&#x5EFA;&#xFF0C;&#x6545;&#x800C;&#x5BB9;&#x6613;&#x5FFD;&#x89C6;&#x3002;</p><h2 id="articleHeader7">&#x7B80;&#x5316;&#x591A;&#x9875;&#x5E94;&#x7528;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</h2><p>&#x4F7F;&#x7528;<code>react</code>/<code>vue</code>&#x7B49;&#x6846;&#x67B6;&#x7684;&#x540C;&#x5B66;&#x77E5;&#x9053;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x5165;&#x53E3;<code>index.js</code>&#xFF0C;&#x5982;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import ReactDOM from &apos;react-dom&apos;
import App from &apos;./app&apos;

ReactDOM.render(&lt;App /&gt;, document.getElementById(&apos;root&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app&apos;</span>

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById(&apos;root&apos;))</span></code></pre><p>&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>dva</code>&#xFF0C;&#x6216;&#x8005;&#x7ED9;&#x6240;&#x6709; react &#x9875;&#x9762;&#x589E;&#x52A0;&#x4E00;&#x4E2A; layout &#x529F;&#x80FD;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x53D8;&#x6210;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import dva from &apos;dva&apos;
import Model from &apos;./model&apos;
import Layout from &apos;~@/layout&apos;
import App from &apos;./app&apos;

const app = dva()
app.router(() =&gt; (
  &lt;Layout&gt;
    &lt;App /&gt;
  &lt;/Layout&gt;
))
app.model(Model)
app.start(document.getElementById(&apos;root&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> dva <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;dva&apos;</span>
<span class="hljs-keyword">import</span> Model <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./model&apos;</span>
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;~@/layout&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app&apos;</span>

<span class="hljs-keyword">const</span> app = dva()
app.router(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
))
app.model(Model)
app.start(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>))</code></pre><p>&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x8FD9;&#x6837;&#xFF0C;&#x7565;&#x7565;&#x6709;&#x70B9;&#x513F;&#x96BE;&#x53D7;&#xFF0C;&#x56E0;&#x4E3A;&#x7A0B;&#x5E8F;&#x5458;&#x6700;&#x6015;&#x5199;&#x91CD;&#x590D;&#x7684;&#x4E1C;&#x897F;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x5B83;&#x53C8;&#x5FC5;&#x987B;&#x8981;&#x6709;&#xFF0C;&#x6CA1;&#x529E;&#x6CD5;&#x62BD;&#x79BB;&#x6210;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x6587;&#x4EF6;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x662F;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x591A;&#x9875;&#x5DE5;&#x7A0B;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x5FC5;&#x987B;&#x8981;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x5373;&#x4F7F;&#x4ED6;&#x4EEC;&#x957F;&#x5F97;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x5C31;&#x4F1A;&#x662F;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- src
  - layout.js
  - pages
    - pageA
      - index.js
      - app.js
      - model.js
    - pageB
      - index.js
      - app.js
      - model.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> src
</span>  -<span class="ruby"> layout.js
</span>  -<span class="ruby"> pages
</span>    -<span class="ruby"> pageA
</span>      -<span class="ruby"> index.js
</span>      -<span class="ruby"> app.js
</span>      -<span class="ruby"> model.js
</span>    -<span class="ruby"> pageB
</span>      -<span class="ruby"> index.js
</span>      -<span class="ruby"> app.js
</span>      -<span class="ruby"> model.js</span></code></pre><p>&#x56E0;&#x4E3A;&#x6240;&#x6709;&#x7684; index &#x90FD;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x7406;&#x60F3;&#x4E2D;&#x7684;&#x9875;&#x9762;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x4EC5;&#x4EC5;&#x9700;&#x8981;<code>app.js</code>&#x5C31;&#x597D;&#xFF0C;&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- src
  - layout.js
  - pages
    - pageA
      - app.js
      - model.js
    - pageB
      - app.js
      - model.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> src
</span>  -<span class="ruby"> layout.js
</span>  -<span class="ruby"> pages
</span>    -<span class="ruby"> pageA
</span>      -<span class="ruby"> app.js
</span>      -<span class="ruby"> model.js
</span>    -<span class="ruby"> pageB
</span>      -<span class="ruby"> app.js
</span>      -<span class="ruby"> model.js</span></code></pre><p><strong>&#x4F5C;&#x4E3A;&#x4E00;&#x540D;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5DE5;&#x7A0B;&#x5E08;&#xFF0C;<code>Node</code> &#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x6765;&#x8BF4;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#x719F;&#x7EC3;&#x8FD0;&#x7528;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4EC5;&#x4EC5;&#x62FF;&#x522B;&#x4EBA;&#x5DF2;&#x7ECF;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x5404;&#x7C7B;&#x5DE5;&#x5177;&#x3002;</strong></p><p>&#x5728;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5927;&#x53EF;&#x4EE5;&#x5728; webpack &#x6784;&#x5EFA;&#x524D;&#xFF0C;&#x901A;&#x8FC7;<code>Node</code>&#x7684;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;(<code>File System</code>)&#xFF0C;&#x5BF9;&#x5E94;&#x6211;&#x4EEC;&#x7684;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x901A;&#x8FC7;&#x540C;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6A21;&#x677F;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E9B;&#x4E34;&#x65F6;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- src
  - .entires
    - pageA.js
    - pageB.js
  - layout.js
  - pages" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> src
</span>  -<span class="ruby"> .entires
</span>    -<span class="ruby"> pageA.js
</span>    -<span class="ruby"> pageB.js
</span>  -<span class="ruby"> layout.js
</span>  -<span class="ruby"> pages</span></code></pre><p>&#x7136;&#x540E;&#x5C06;&#x8FD9;&#x4E9B;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A; webpack &#x7684; entry &#x914D;&#x7F6E;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const fs = require(&apos;fs&apos;)
const glob = require(&apos;glob&apos;)
const rimraf = require(&apos;rimraf&apos;)
const entriesDir = path.resolve(process.cwd(), &apos;./src/.entries&apos;)
const srcDir = path.resolve(process.cwd(), &apos;./src&apos;)

// &#x8FD4;&#x56DE;webpack entry&#x914D;&#x7F6E;
module.exports = function() {
  if (fs.existsSync(entriesDir)) {
    rimraf.sync(entriesDir)
  }
  fs.mkdirSync(entriesDir)
  return buildEntries(srcDir)
}

function buildEntries(srcDir) {
  return getPages(srcDir).reduce((acc, current) =&gt; {
    acc[current.pageName] = buildEntry(current)
    return acc
  }, {})
}
// &#x83B7;&#x53D6;&#x9875;&#x9762;&#x6570;&#x636E;&#xFF0C;&#x53EA;&#x8003;&#x8651;&#x4E00;&#x7EA7;&#x76EE;&#x5F55;
function getPages(srcDir) {
  const pagesDir = `${srcDir}/pages`
  const pages = glob.sync(`${pagesDir}/**/app.js`)
  return pages.map(pagePath =&gt; {
    return {
      pageName: path.relative(pagesDir, p).replace(&apos;/app.js&apos;, &apos;&apos;), // &#x53D6;&#x51FA;page&#x6587;&#x4EF6;&#x5939;&#x540D;
      pagePath: pagePath
    }
  })
}
// &#x6784;&#x5EFA;&#x4E34;&#x65F6;&#x5165;&#x53E3;&#x6587;&#x4EF6;
function buildEntry({ pageName, pagePath }) {
  const fileContent = buildFileContent(pagePath)
  const entryPath = `${entriesDir}/${pageName}.js`
  fs.writeFileSync(entryPath, fileContent)
  return entryPath
}
// &#x66FF;&#x6362;&#x6A21;&#x677F;&#x4E2D;&#x7684; App &#x6A21;&#x5757;&#x5730;&#x5740;&#xFF0C;&#x8FD4;&#x56DE;&#x4E34;&#x65F6;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5185;&#x5BB9;
function buildFileContent(pagePath) {
  return `
    import React from &apos;react&apos;
    import dva from &apos;dva&apos;
    import Model from &apos;./model&apos;
    import Layout from &apos;~@/layout&apos;
    import App from &apos;PAGE_APP_PATH&apos;

    const app = dva()
    app.router(() =&gt; (
      &lt;Layout&gt;
        &lt;App /&gt;
      &lt;/Layout&gt;
    ))
    app.model(Model)
    app.start(document.getElementById(&apos;root&apos;))
  `.replace(PAGE_APP_PATH, pagePath)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;glob&apos;</span>)
<span class="hljs-keyword">const</span> rimraf = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;rimraf&apos;</span>)
<span class="hljs-keyword">const</span> entriesDir = path.resolve(process.cwd(), <span class="hljs-string">&apos;./src/.entries&apos;</span>)
<span class="hljs-keyword">const</span> srcDir = path.resolve(process.cwd(), <span class="hljs-string">&apos;./src&apos;</span>)

<span class="hljs-comment">// &#x8FD4;&#x56DE;webpack entry&#x914D;&#x7F6E;</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (fs.existsSync(entriesDir)) {
    rimraf.sync(entriesDir)
  }
  fs.mkdirSync(entriesDir)
  <span class="hljs-keyword">return</span> buildEntries(srcDir)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildEntries</span>(<span class="hljs-params">srcDir</span>) </span>{
  <span class="hljs-keyword">return</span> getPages(srcDir).reduce(<span class="hljs-function">(<span class="hljs-params">acc, current</span>) =&gt;</span> {
    acc[current.pageName] = buildEntry(current)
    <span class="hljs-keyword">return</span> acc
  }, {})
}
<span class="hljs-comment">// &#x83B7;&#x53D6;&#x9875;&#x9762;&#x6570;&#x636E;&#xFF0C;&#x53EA;&#x8003;&#x8651;&#x4E00;&#x7EA7;&#x76EE;&#x5F55;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPages</span>(<span class="hljs-params">srcDir</span>) </span>{
  <span class="hljs-keyword">const</span> pagesDir = <span class="hljs-string">`<span class="hljs-subst">${srcDir}</span>/pages`</span>
  <span class="hljs-keyword">const</span> pages = glob.sync(<span class="hljs-string">`<span class="hljs-subst">${pagesDir}</span>/**/app.js`</span>)
  <span class="hljs-keyword">return</span> pages.map(<span class="hljs-function"><span class="hljs-params">pagePath</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">pageName</span>: path.relative(pagesDir, p).replace(<span class="hljs-string">&apos;/app.js&apos;</span>, <span class="hljs-string">&apos;&apos;</span>), <span class="hljs-comment">// &#x53D6;&#x51FA;page&#x6587;&#x4EF6;&#x5939;&#x540D;</span>
      pagePath: pagePath
    }
  })
}
<span class="hljs-comment">// &#x6784;&#x5EFA;&#x4E34;&#x65F6;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildEntry</span>(<span class="hljs-params">{ pageName, pagePath }</span>) </span>{
  <span class="hljs-keyword">const</span> fileContent = buildFileContent(pagePath)
  <span class="hljs-keyword">const</span> entryPath = <span class="hljs-string">`<span class="hljs-subst">${entriesDir}</span>/<span class="hljs-subst">${pageName}</span>.js`</span>
  fs.writeFileSync(entryPath, fileContent)
  <span class="hljs-keyword">return</span> entryPath
}
<span class="hljs-comment">// &#x66FF;&#x6362;&#x6A21;&#x677F;&#x4E2D;&#x7684; App &#x6A21;&#x5757;&#x5730;&#x5740;&#xFF0C;&#x8FD4;&#x56DE;&#x4E34;&#x65F6;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5185;&#x5BB9;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildFileContent</span>(<span class="hljs-params">pagePath</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`
    import React from &apos;react&apos;
    import dva from &apos;dva&apos;
    import Model from &apos;./model&apos;
    import Layout from &apos;~@/layout&apos;
    import App from &apos;PAGE_APP_PATH&apos;

    const app = dva()
    app.router(() =&gt; (
      &lt;Layout&gt;
        &lt;App /&gt;
      &lt;/Layout&gt;
    ))
    app.model(Model)
    app.start(document.getElementById(&apos;root&apos;))
  `</span>.replace(PAGE_APP_PATH, pagePath)
}</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x7B80;&#x5355;&#x7684;&#x53BB;&#x6389;&#x4E86;&#x91CD;&#x590D;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x8FD8;&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E2A; layout &#x7684;&#x529F;&#x80FD;&#x3002;&#x8FD9;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x53EF;&#x80FD;&#x8FD8;&#x6709;&#x591A;&#x7EA7;&#x76EE;&#x5F55;&#xFF0C;&#x591A;&#x4E2A; model &#x7B49;&#x7B49;&#xFF0C;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x518D;&#x5B9A;&#x5236;&#x5566;&#x3002;</p><p><code>webpack4</code>&#x51FA;&#x6765;&#x5DF2;&#x7ECF;&#x633A;&#x4E45;&#x4E86;&#xFF0C;&#x6587;&#x7AE0;&#x5199;&#x7684;&#x6709;&#x70B9;&#x513F;&#x6EDE;&#x540E;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x591A;&#x6211;&#x89C9;&#x5F97;&#x5E94;&#x8BE5;&#x5927;&#x5BB6;&#x90FD;&#x660E;&#x767D;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x6CA1;&#x8BE6;&#x7EC6;&#x5199;&#x4E86;&#x3002;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x7591;&#x95EE;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x8BC4;&#x8BBA;~~</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
多页应用 Webpack4 配置优化与踩坑记录

## 原文链接
[https://segmentfault.com/a/1190000016685119](https://segmentfault.com/a/1190000016685119)

