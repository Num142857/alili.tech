---
title: '【经验】基于vue多入口项目升级webpack4实践' 
date: 2018-11-23 2:30:10
hidden: true
slug: j6fp88n9s7
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x9879;&#x76EE;&#x80CC;&#x666F;&#x7B80;&#x4ECB;</h2><ul><li>&#x591A;&#x9875;&#x9762;&#x5E94;&#x7528;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x72EC;&#x7ACB;entry&#xFF0C;&#x5355;&#x4E2A;&#x9875;&#x9762;&#x5185;&#x4F7F;&#x7528;vue-router</li><li>&#x57FA;&#x4E8E;vue&#xFF0C;&#x4F7F;&#x7528;vue-loader&#x52A0;&#x8F7D;.vue&#x6587;&#x4EF6;</li><li>&#x5355;&#x9875;&#x5185;&#x4F7F;&#x7528;&#x61D2;&#x52A0;&#x8F7D;&#x5F02;&#x6B65;chunk</li></ul><p>&#x9879;&#x76EE;&#x4E8C;&#x671F;&#x4E0A;&#x7EBF;&#x540E;&#xFF0C;&#x76F8;&#x5BF9;&#x4E0D;&#x8FA3;&#x4E48;&#x5FD9;&#xFF0C;&#x773C;&#x770B;&#x7740;webpack4&#x4E5F;&#x51FA;&#x6765;&#x5FEB;&#x534A;&#x5E74;&#x4E86;&#x5E76;&#x4E14;&#x65E5;&#x8D8B;&#x7A33;&#x5B9A;&#xFF0C;&#x4E4B;&#x524D;&#x867D;&#x7136;&#x5199;&#x8FC7;demo&#x6D4B;&#x8BD5;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x8FD8;&#x672A;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7528;&#x8FC7;&#xFF0C;&#x4E8E;&#x662F;&#x62E9;&#x65E5;&#x4E0D;&#x5982;&#x649E;&#x65E5;&#x4E00;&#x9F13;&#x4F5C;&#x6C14;&#x5F00;&#x542F;&#x4E86;&#x5347;&#x7EA7;&#x3010;&#x8E29;&#x5751;&#x3011;&#x4E4B;&#x65C5;</p><h2 id="articleHeader1">&#x5347;&#x7EA7;&#x4E4B;&#x65C5;</h2><p>&#x9996;&#x5148;&#x4FDD;&#x8BC1; node&gt;= 6.11.5&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;8&#x4EE5;&#x4E0A;LTS&#x7248;&#x672C;</p><h3 id="articleHeader2">&#x76F8;&#x5173;&#x4F9D;&#x8D56;&#x5305;&#x5B89;&#x88C5;&#x6216;&#x66F4;&#x65B0;</h3><p>&#x4EE5;&#x4E0B;&#x662F;&#x6211;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x4F9D;&#x8D56;&#x5B89;&#x88C5;&#x6216;&#x66F4;&#x65B0;&#x60C5;&#x51B5;&#xFF0C;&#x4E0D;&#x540C;&#x9879;&#x76EE;&#x4F7F;&#x7528;loader&#x3001;&#x63D2;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x5F97;&#x6839;&#x636E;&#x81EA;&#x8EAB;&#x60C5;&#x51B5;&#x8C03;&#x6574;<br>&#x4E3B;&#x8981;&#x4F9D;&#x8D56;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- webpack&#x5B89;&#x88C5;&#x6700;&#x65B0;
- webpack-cli&#x5B89;&#x88C5;&#xFF08;&#x542F;&#x52A8;webpack)
- webpack-dev-server&#x66F4;&#x65B0;&#x81F3;3&#x4EE5;&#x4E0A;
- vue-loader&#x66F4;&#x65B0;&#x81F3;15&#x4EE5;&#x4E0A;
- &#x5B89;&#x88C5;mini-css-extract-plugin" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> webpack&#x5B89;&#x88C5;&#x6700;&#x65B0;
</span>-<span class="ruby"> webpack-cli&#x5B89;&#x88C5;&#xFF08;&#x542F;&#x52A8;webpack)
</span>-<span class="ruby"> webpack-dev-server&#x66F4;&#x65B0;&#x81F3;<span class="hljs-number">3</span>&#x4EE5;&#x4E0A;
</span>-<span class="ruby"> vue-loader&#x66F4;&#x65B0;&#x81F3;<span class="hljs-number">15</span>&#x4EE5;&#x4E0A;
</span>-<span class="ruby"> &#x5B89;&#x88C5;mini-css-extract-plugin</span></code></pre><p>&#x5176;&#x4ED6;&#xFF1A;<br>babel&#x76F8;&#x5173;&#x4F9D;&#x8D56;&#x3001;html-webpack-plugin&#x3001;file-loader&#x3001;url-loader&#x3001;sass-loader&#x7B49;&#x6211;&#x90FD;&#x5347;&#x7EA7;&#x4E86;&#x7248;&#x672C;&#xFF0C;&#x6216;&#x8005;&#x4E5F;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x5B8C;&#x914D;&#x7F6E;&#x540E;&#xFF0C;&#x8FD0;&#x884C;&#x8D77;&#x6765;&#x770B;&#x770B;&#x63A7;&#x5236;&#x53F0;&#x662F;&#x5426;&#x6709;&#x76F8;&#x5173;&#x62A5;&#x8B66;&#x518D;&#x66F4;&#x65B0;<br>&#x8F85;&#x52A9;&#xFF1A;<br>&#x63A8;&#x8350;&#x5B89;&#x88C5;<a href="https://www.npmjs.com/package/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a>&#x63D2;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5206;&#x6790;&#x6784;&#x5EFA;&#x7ED3;&#x679C;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;</p><h3 id="articleHeader3">&#x914D;&#x7F6E;&#x53D8;&#x66F4;</h3><p>&#x63A5;&#x4E0B;&#x6765;&#x6765;&#x5230;&#x8FD9;&#x6B21;&#x6109;&#x5FEB;&#x8E29;&#x5751;&#x4E4B;&#x65C5;&#x7684;&#x91CD;&#x5934;&#x620F;&#x4E86;&#xFF01;</p><h4>mode</h4><p><code>mode</code>&#x662F;webpack4&#x65B0;&#x589E;&#x7684;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x4E5F;&#x662F;&#x672C;&#x6B21;&#x66F4;&#x65B0;&#x7684;&#x4EAE;&#x70B9;&#x4E4B;&#x4E00;&#xFF0C;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x5C31;&#x662F;&#x544A;&#x8BC9;webpack&#x672C;&#x6B21;&#x6784;&#x5EFA;&#x6A21;&#x5F0F;&#xFF0C;&#x4F7F;&#x5176;&#x53EF;&#x4EE5;&#x5BF9;&#x6784;&#x5EFA;&#x4F7F;&#x7528;&#x5BF9;&#x5E94;&#x7684;<strong>&#x4F18;&#x5316;&#x7B56;&#x7565;</strong>&#x3002;&#x56DE;&#x60F3;&#x4E4B;&#x524D;&#x5199;&#x5DE5;&#x7A0B;&#x5316;&#x914D;&#x7F6E;&#xFF0C;&#x4E5F;&#x4F1A;&#x533A;&#x5206;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x548C;&#x751F;&#x4EA7;&#x6A21;&#x5F0F;&#x7684;&#x914D;&#x7F6E;&#x5165;&#x53E3;&#xFF0C;webpack4&#x63D0;&#x4F9B;&#x4E86;<code>mode</code>&#x964D;&#x4F4E;&#x4E86;&#x4E0D;&#x5C11;&#x914D;&#x7F6E;&#x6210;&#x672C;&#x3002;</p><p><code>mode</code>&#x53EF;&#x88AB;&#x8BBE;&#x7F6E;&#x4E3A;<code>development</code>&#xFF08;&#x9ED8;&#x8BA4;&#xFF09;&#x6216;<code>production</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  mode: &apos;production&apos;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  mode: <span class="hljs-string">&apos;production&apos;</span>
};</code></pre><p><code>development</code>&#x4FA7;&#x91CD;&#x4E8E;&#x4F18;&#x5316;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#xFF0C;<code>production</code>&#x4FA7;&#x91CD;&#x4E8E;&#x4F18;&#x5316;&#x6A21;&#x5757;&#x4F53;&#x79EF;&#x548C;&#x7EBF;&#x4E0A;&#x90E8;&#x7F72;&#xFF0C;&#x5177;&#x4F53;&#x4F18;&#x5316;&#x5185;&#x5BB9;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x642C;&#x8FD0;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E86;&#xFF0C;&#x5BF9;&#x4E8E;&#x6211;&#x7684;&#x9879;&#x76EE;&#x800C;&#x8A00;&#x6BD4;&#x8F83;&#x5728;&#x610F;&#x7684;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>&#x5C06;&#x81EA;&#x52A8;&#x8BBE;&#x7F6E;<code>process.env.NODE_ENV</code>&#x4E3A;&#x5BF9;&#x5E94;&#x503C;&#xFF08;<code>development</code>&#x6216;<code>production</code>&#xFF09;&#xFF0C;&#x539F;&#x624B;&#x5DE5;&#x914D;&#x7F6E;<code>process.env.NODE_ENV = &apos;development&apos; ;</code>&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5220;&#x9664;</li><li><code>production</code>&#x6A21;&#x5F0F;&#x5C06;&#x81EA;&#x52A8;&#x52A0;&#x5165;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x539F;<code>new UglifyJsPlugin()</code>&#x76F8;&#x5173;&#x4EE3;&#x7801;</li></ul><p>&#x66F4;&#x591A;&#x8BF4;&#x660E;&#x53C2;&#x8003; [<a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">https://medium.com/webpack/we...</a><br>](<a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">https://medium.com/webpack/we...</a><br>)</p><h4>optimization</h4><p>webpack4&#x6839;&#x636E;<code>mode</code>&#x914D;&#x7F6E;&#x5BF9;&#x6784;&#x5EFA;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8986;&#x76D6;<code>optimization</code>&#x914D;&#x7F6E;&#x8FDB;&#x4E00;&#x6B65;&#x5B9A;&#x5236;&#x4E24;&#x79CD;&#x6784;&#x5EFA;&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x4F18;&#x5316;&#x7B56;&#x7565;&#xFF0C;&#x5E76;&#x4E14;&#x5B98;&#x65B9;&#x79FB;&#x9664;&#x4E86;<code>CommonsChunkPlugin</code>&#x63D2;&#x4EF6;&#x3002;</p><p>&#x5176;&#x4E2D;&#x9879;&#x76EE;&#x5347;&#x7EA7;&#x6700;&#x5927;&#x7684;&#x53D8;&#x66F4;&#x5C31;&#x5728;<code>CommonsChunkPlugin</code>&#x63D2;&#x4EF6;&#x7684;&#x79FB;&#x9664;&#x548C;<code>optimization</code>&#x4E0B;<code>splitChunks</code>&#x3001;<code>runtimeChunk</code>&#x7684;&#x914D;&#x7F6E;<br>&#x53E6;&#x5916;&#x7531;&#x4E8E;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x529F;&#x80FD;&#x5C06;&#x5728;<code>production</code>&#x6A21;&#x5F0F;&#x4E0B;&#x81EA;&#x52A8;&#x5F00;&#x542F;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x5BF9;js&#x538B;&#x7F29;&#x6216;css&#x538B;&#x7F29;&#x7B56;&#x7565;&#x5B9A;&#x5236;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x8986;&#x76D6;&#x9ED8;&#x8BA4;<code>optimization.minimizer</code>&#x914D;&#x7F6E;</p><h5>splitChunks</h5><p>&#x5173;&#x4E8E;<code>splitChunks</code>&#x53EF;&#x4EE5;&#x5355;&#x72EC;&#x7528;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x53EA;&#x662F;&#x6309;&#x539F;&#x9879;&#x76EE;&#x7684;&#x7F13;&#x5B58;&#x7B56;&#x7565;&#x4FEE;&#x6539;&#xFF08;<code>CommonsChunkPlugin</code>&#x914D;&#x7F6E;&#xFF09;&#xFF1A; &#x62BD;&#x53D6;/node_modules/&#x4E0B;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#x4F5C;&#x4E3A;&#x516C;&#x5171;vendor&#xFF08;&#x57FA;&#x4E8E;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#x66F4;&#x65B0;&#x9891;&#x7387;&#x4F4E;&#xFF09;</p><p>&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4E0B;&#xFF0C;<code>splitChunks</code>&#x53EA;&#x5BF9;&#x61D2;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#x4EA7;&#x751F;&#x5F71;&#x54CD;<br>&#x6CE8;&#x91CA;&#x90E8;&#x5206;&#x662F;splitChunks&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x91CC;&#x4EC5;&#x4FEE;&#x6539;cacheGroups&#x5185;vendor&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF0C;&#x5C06;chunks&#x6539;&#x6210;&apos;initial&apos;&#x907F;&#x514D;&#x5C06;&#x90E8;&#x5206;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x7684;&#x8F83;&#x5927;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x4F9D;&#x8D56;&#x4E5F;&#x5408;&#x5E76;&#x5230;vendor&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="splitChunks: {
      //chunks: &apos;async&apos;,
      //minSize: 30000,
      //minChunks: 1,
      //maxAsyncRequests: 5,
      //maxInitialRequests: 3,
      //automaticNameDelimiter: &apos;~&apos;,
      //name: true,    
      cacheGroups: {
        vendor: {
        name: &apos;vendor&apos;,
        //@NOTE &#x914D;&#x7F6E;&#x6210;all &#x4F1A;&#x628A;async&#x7684;&#x4E5F;&#x6253;&#x8FDB;&#x6765;
        chunks: &apos;initial&apos;, 
        priority: -10,
        test: /[\\/]node_modules[\\/]/
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-attribute">splitChunks</span>: {
      <span class="hljs-comment">//chunks: &apos;async&apos;,</span>
      <span class="hljs-comment">//minSize: 30000,</span>
      <span class="hljs-comment">//minChunks: 1,</span>
      <span class="hljs-comment">//maxAsyncRequests: 5,</span>
      <span class="hljs-comment">//maxInitialRequests: 3,</span>
      <span class="hljs-comment">//automaticNameDelimiter: &apos;~&apos;,</span>
      <span class="hljs-comment">//name: true,    </span>
      <span class="hljs-attribute">cacheGroups</span>: {
        <span class="hljs-attribute">vendor</span>: {
        <span class="hljs-attribute">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,
        <span class="hljs-comment">//@NOTE &#x914D;&#x7F6E;&#x6210;all &#x4F1A;&#x628A;async&#x7684;&#x4E5F;&#x6253;&#x8FDB;&#x6765;</span>
        <span class="hljs-attribute">chunks</span>: <span class="hljs-string">&apos;initial&apos;</span>, 
        <span class="hljs-attribute">priority</span>: -<span class="hljs-number">10</span>,
        <span class="hljs-attribute">test</span>: /[\\/]node_modules[\\/]/
        }
    }
}</code></pre><h5>runtimeChunk</h5><p>&#x4E4B;&#x524D;&#x7684;<code>production</code>&#x6A21;&#x5F0F;&#x6784;&#x5EFA;&#x4F1A;&#x4F7F;&#x7528;<code>CommonChunkPlugin</code>&#x62BD;&#x53D6;runtime code(&#x8FD9;&#x90E8;&#x5206;&#x6982;&#x5FF5;&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://webpack.js.org/concepts/manifest/#src/components/Sidebar/Sidebar.jsx" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/concepts/manifest/#src/components/Sidebar/Sidebar.jsx</a>)&#x4F5C;&#x4E3A;&#x5355;&#x72EC;&#x7684;chunk&#xFF0C;&#x5347;&#x7EA7;&#x540E;&#x8FD9;&#x90E8;&#x5206;&#x914D;&#x7F6E;&#x9700;&#x8981;&#x5199;&#x5230;<code>optimization.runtimeChunk</code>&#x4E2D;&#xFF1A;</p><ul><li>&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#xFF0C;runtime code&#x5305;&#x542B;&#x5728;&#x57FA;&#x4E8E;&#x5404;&#x4E2A;entry&#x62BD;&#x53D6;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;chunk&#x4E2D;&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x7531;&#x4E8E;&#x672C;&#x9879;&#x76EE;&#x62BD;&#x53D6;&#x4E86;&#x516C;&#x7528;vendor&#xFF0C;&#x9488;&#x5BF9;&#x672C;&#x9879;&#x76EE;&#x4F1A;&#x5C06;&#x6240;&#x6709;entry&#x7684;runtime&#x4EE3;&#x7801;&#x62BD;&#x53D6;&#x5230;&#x516C;&#x7528;vendor&#x4E2D;&#xFF0C;vendor&#x5C06;&#x5931;&#x53BB;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#x610F;&#x4E49;&#xFF09;</li><li>&#x914D;&#x7F6E;&#x4E3A;<code>single string</code>&#xFF0C;&#x6240;&#x6709;entry&#x7684;runtime&#x4EE3;&#x7801;&#x5C06;&#x4F1A;&#x62BD;&#x53D6;&#x4E3A;&#x4E00;&#x4E2A;chunk</li><li>&#x914D;&#x7F6E;&#x4E3A;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E;&#x6BCF;&#x4E2A;entry&#x72EC;&#x7ACB;&#x62BD;&#x53D6;runtime&#x4EE3;&#x7801;&#xFF08;&#x672C;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#xFF0C;&#x591A;&#x4E2A;&#x72EC;&#x7ACB;&#x9875;&#x9762;&#x591A;&#x5165;&#x53E3;&#xFF09;</li></ul><p>&#x914D;&#x7F6E;&#x6210;&#x751F;&#x6210;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="runtimeChunk: {
    name: entrypoint =&gt; `manifest~${entrypoint.name}`
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">runtimeChunk</span>: {
    <span class="hljs-attribute">name</span>: entrypoint =&gt; `manifest~${entrypoint.name}`
},</code></pre><h5>minimizer</h5><p>&#x8FD9;&#x4E2A;&#x63A5;&#x6536;&#x5355;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x538B;&#x7F29;&#x63D2;&#x4EF6;&#x548C;&#x914D;&#x7F6E;&#xFF0C;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BE6;&#x7EC6;&#x63CF;&#x8FF0;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="minimizer: [
    // &#x914D;&#x7F6E;UglifyJsPlugin&#x538B;&#x7F29;js&#x6587;&#x4EF6;
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
    }),
    // &#x914D;&#x7F6E;css&#x6587;&#x4EF6;&#x538B;&#x7F29;
    new OptimizeCSSAssetsPlugin({
        cssProcessor: require(&apos;cssnano&apos;),
        cssProcessorOptions: {
        discardComments: {removeAll: true},
        // &#x907F;&#x514D; cssnano &#x91CD;&#x65B0;&#x8BA1;&#x7B97; z-index
            safe: true
        },
        canPrint: false
     })
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">minimizer:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">//</span> <span class="hljs-string">&#x914D;&#x7F6E;UglifyJsPlugin&#x538B;&#x7F29;js&#x6587;&#x4EF6;</span>
    <span class="hljs-string">new</span> <span class="hljs-string">UglifyJsPlugin({</span>
<span class="hljs-attr">        cache:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        parallel:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        sourceMap:</span> <span class="hljs-literal">true</span> 
    <span class="hljs-string">}),</span>
    <span class="hljs-string">//</span> <span class="hljs-string">&#x914D;&#x7F6E;css&#x6587;&#x4EF6;&#x538B;&#x7F29;</span>
    <span class="hljs-string">new</span> <span class="hljs-string">OptimizeCSSAssetsPlugin({</span>
<span class="hljs-attr">        cssProcessor:</span> <span class="hljs-string">require(&apos;cssnano&apos;),</span>
<span class="hljs-attr">        cssProcessorOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        discardComments:</span> <span class="hljs-string">{removeAll:</span> <span class="hljs-literal">true</span><span class="hljs-string">},</span>
        <span class="hljs-string">//</span> <span class="hljs-string">&#x907F;&#x514D;</span> <span class="hljs-string">cssnano</span> <span class="hljs-string">&#x91CD;&#x65B0;&#x8BA1;&#x7B97;</span> <span class="hljs-string">z-index</span>
<span class="hljs-attr">            safe:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        canPrint:</span> <span class="hljs-literal">false</span>
     <span class="hljs-string">})</span>
<span class="hljs-string">]</span></code></pre><h4>mini-css-extract-plugin</h4><p>webpack4&#x4E4B;&#x540E;&#xFF0C;<code>Extract-text-plugin</code>&#x4E0D;&#x518D;&#x9002;&#x7528;&#x4E8E;css&#x6587;&#x4EF6;&#x62BD;&#x53D6;&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x8981;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;&#x5B89;&#x88C5;&#x65F6;&#x53EA;&#x80FD;&#x901A;&#x8FC7;@next&#x7248;&#x672C;&#x5B89;&#x88C5;(yarn add extract-text-plugin@next)&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;<code>contenthash</code>&#x4E0D;&#x652F;&#x6301;&#x4F7F;&#x7528;&#x5728;&#x6587;&#x4EF6;&#x540D;&#x4E2D;&#x3001;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E9B;&#x591A;&#x4F59;&#x7684;chunk css&#x6587;&#x4EF6;</p><p><code>mini-css-extract-plugin</code>&#x4E13;&#x7528;&#x4E8E;&#x62BD;&#x53D6;css&#x6587;&#x4EF6;&#x652F;&#x6301;async-loading&#xFF0C;&#x53EA;&#x80FD;&#x914D;&#x5408;webpack4&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x76EE;&#x524D;&#x6682;&#x65F6;&#x8FD8;&#x4E0D;&#x652F;&#x6301;HMR(Hot Module Replace)&#xFF0C;&#x672C;&#x9879;&#x76EE;&#x53EA;&#x5728;<code>production</code>&#x4E0B;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;</p><p>&#x914D;&#x7F6E;&#x76F8;&#x5BF9;<code>Extract-text-plugin</code>&#x662F;&#x7B80;&#x5355;&#x4E00;&#x4E9B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// loader&#x90E8;&#x5206;&#xFF08;&#x9879;&#x76EE;&#x4F7F;&#x7528;scss&#xFF09;
test: /\.(sa|sc|c)ss$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : &apos;style-loader&apos;,
      &apos;css-loader&apos;,
      {
        loader: &apos;sass-loader&apos;,
        options: {
                    ... ...
        }
    },
    ],
},

// plugin&#x90E8;&#x5206;
plugins.push(
    new MiniCssExtractPlugin({
        filename: isProd ? &quot;css/[name].[contenthash:8].css&quot; : &quot;css/[name].css&quot;;
    })
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-comment">// loader&#x90E8;&#x5206;&#xFF08;&#x9879;&#x76EE;&#x4F7F;&#x7528;scss&#xFF09;</span>
test: <span class="hljs-regexp">/\.(sa|sc|c)ss$/</span>,
    use: [
      isProd ? MiniCssExtractPlugin.loader : <span class="hljs-string">&apos;style-loader&apos;</span>,
      <span class="hljs-string">&apos;css-loader&apos;</span>,
      {
        loader: <span class="hljs-string">&apos;sass-loader&apos;</span>,
        <span class="hljs-keyword">options</span>: {
                    ... ...
        }
    },
    ],
},

<span class="hljs-comment">// plugin&#x90E8;&#x5206;</span>
plugins.<span class="hljs-keyword">push</span>(
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
        filename: isProd ? <span class="hljs-string">&quot;css/[name].[contenthash:8].css&quot;</span> : <span class="hljs-string">&quot;css/[name].css&quot;</span>;
    })
);</code></pre><h4>vue-loader</h4><p>vue-loader&#x914D;&#x5408;webpack4&#x5347;&#x7EA7;&#x5230;&#x4E86;v15&#x7248;&#x672C;&#xFF0C;&#x5347;&#x7EA7;&#x4E4B;&#x540E;&#x914D;&#x7F6E;&#x65B9;&#x5F0F;&#x53D1;&#x751F;&#x4E86;&#x4E00;&#x4E9B;&#x6539;&#x53D8;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><ul><li>&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;&#x9700;&#x8981;&#x4EE5;plugin&#x65B9;&#x5F0F;&#x6DFB;&#x52A0;&#x5230;webpack&#x914D;&#x7F6E;&#x4E2D;</li><li>v15&#x7248;&#x672C;&#x4E4B;&#x540E;&#xFF0C;&#x4F7F;&#x7528;&#x4E86;&#x4E0D;&#x540C;&#x7684;&#x7B56;&#x7565;&#x63A8;&#x5BFC;.vue&#x6587;&#x4EF6;&#x4E2D;&#x5404;&#x4E2A;&#x8BED;&#x8A00;&#x5757;&#x4F7F;&#x7528;&#x7684;loader&#xFF0C;&#x5C06;&#x5404;&#x4E2A;&#x8BED;&#x8A00;&#x5757;&#x89C6;&#x4E3A;&#x72EC;&#x7ACB;&#x7684;&#x6587;&#x4EF6;&#x4F7F;&#x7528;webpack&#x4E2D;&#x914D;&#x7F6E;&#x4E86;&#x89C4;&#x5219;&#x7684;loader&#x5904;&#x7406;&#xFF0C;&#x7531;&#x6B64;&#x5E26;&#x6765;&#x7684;&#x914D;&#x7F6E;&#x53D8;&#x5316;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x6837;&#x5F0F;&#x5904;&#x7406;&#xFF0C;webpack.rules&#x4E2D;&#x5FC5;&#x987B;&#x663E;&#x793A;&#x63D0;&#x4F9B;&#x5BF9;&#x5E94;loader&#x5904;&#x7406;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x539F;vue-loader&#x914D;&#x7F6E;&#x4E2D;&#x5185;&#x8054;&#x4F20;&#x5165;&#x7684;&#x6837;&#x5F0F;&#x76F8;&#x5173;loader&#x53EF;&#x4EE5;&#x53BB;&#x9664;</li><li>&#x9274;&#x4E8E;&#x63A8;&#x5BFC;&#x53D8;&#x5316;&#xFF0C;<code>&lt;script&gt;&lt;/script&gt;</code>&#x6807;&#x7B7E;&#x5185;&#x7684;js&#x4EE3;&#x7801;&#x5C06;&#x88AB;&#x89C6;&#x4E3A;&#x72EC;&#x7ACB;&#x7684;js&#x6587;&#x4EF6;&#x5E76;&#x6839;&#x636E;webpack&#x914D;&#x7F6E;&#x4F7F;&#x7528;babel-loader&#x8F6C;&#x8BD1;&#xFF1B;&#x9879;&#x76EE;&#x914D;&#x7F6E;babel-loader&#x65F6;&#x4F7F;&#x7528;<code>exclude: /node_modules/</code>&#x6392;&#x9664;&#x4F9D;&#x8D56;&#x5305;&#x4E2D;&#x4EE3;&#x7801;&#x7684;&#x8F6C;&#x8BD1;&#xFF0C;&#x5982;&#x679C;&#x5BFC;&#x5165;&#x4E86;<code>/node_modules/</code>&#x4E2D;&#x7684;.vue&#x6587;&#x4EF6;&#xFF0C;<code>&lt;script&gt;</code>&#x90E8;&#x5206;&#x5C06;&#x4E0D;&#x80FD;&#x88AB;&#x8F6C;&#x8BD1;&#xFF0C;&#x6545;&#x9700;&#x8981;&#x5C06;.vue&#x6587;&#x4EF6;&#x52A0;&#x5165;&#x5230;&#x6392;&#x9664;&#x767D;&#x540D;&#x5355;&#x4E2D;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x589E;&#x52A0;&#x4E00;&#x4E2A;plugin
const VueLoaderPlugin = require(&apos;vue-loader/lib/plugin&apos;)
plugin.push( new VueLoaderPlugin())

// rules loader&#x914D;&#x7F6E;
// @UPDATED 
// vue-loader v15+&#x7248;&#x672C; .vue&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x6837;&#x5F0F;&#x5C06;&#x88AB;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#x5E76;&#x8BA4;&#x4E3A;&#x548C;&#x72EC;&#x7ACB;&#x5F15;&#x5165;&#x7684;css&#x6587;&#x4EF6;&#x76F8;&#x540C;
// &#x6545;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x5355;&#x72EC;loader&#x5904;&#x7406;
... ...
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        isProd ? MiniCssExtractPlugin.loader : &apos;style-loader&apos;,
        &apos;css-loader&apos;,
        {
            loader: &apos;sass-loader&apos;,
            options: {
                includePaths: [&apos;src/static/scss&apos;]
            }
        },
    ],
},
// .vue&#x6587;&#x4EF6;
{
    test: /\.vue$/,
    loader: &apos;vue-loader&apos;,
    options: {
        // @UPDATED @DEPRECATED
        // v15+&#x7248;&#x672C;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x5185;&#x8054;&#x7684;cssloader&#x914D;&#x7F6E;
        // &#x5982;&#x679C;&#x4E0D;&#x53BB;&#x6389;&#x4F1A;&#x62A5;&#x9519;
        // loaders: util.cssLoaders({
        //     sourceMap: false,
        //     extract: build,
        //     build: build
        // })
    }
},
// .js&#x6587;&#x4EF6;
{
    test: /\.js$/,
    loader: &apos;babel-loader&apos;,
    exclude: file =&gt; (
        // @UPDATED
        // vue-loader v15+&#x7248;&#x672C; 
        // /node_modules/&#x4E2D;&#x7684;.vue&#x6587;&#x4EF6;&#x9700;&#x8981;&#x7ECF;&#x8FC7;babel-loader&#x8F6C;&#x8BD1;
        /node_modules/.test(file) &amp;&amp;
        !/\.vue\.js/.test(file)
    )
}
... ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-comment">// &#x589E;&#x52A0;&#x4E00;&#x4E2A;plugin</span>
const VueLoaderPlugin = require(<span class="hljs-string">&apos;vue-loader/lib/plugin&apos;</span>)
plugin.<span class="hljs-keyword">push</span>( <span class="hljs-keyword">new</span> VueLoaderPlugin())

<span class="hljs-comment">// rules loader&#x914D;&#x7F6E;</span>
<span class="hljs-comment">// @UPDATED </span>
<span class="hljs-comment">// vue-loader v15+&#x7248;&#x672C; .vue&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x6837;&#x5F0F;&#x5C06;&#x88AB;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#x5E76;&#x8BA4;&#x4E3A;&#x548C;&#x72EC;&#x7ACB;&#x5F15;&#x5165;&#x7684;css&#x6587;&#x4EF6;&#x76F8;&#x540C;</span>
<span class="hljs-comment">// &#x6545;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x5355;&#x72EC;loader&#x5904;&#x7406;</span>
... ...
{
    test: <span class="hljs-regexp">/\.(sa|sc|c)ss$/</span>,
    use: [
        isProd ? MiniCssExtractPlugin.loader : <span class="hljs-string">&apos;style-loader&apos;</span>,
        <span class="hljs-string">&apos;css-loader&apos;</span>,
        {
            loader: <span class="hljs-string">&apos;sass-loader&apos;</span>,
            <span class="hljs-keyword">options</span>: {
                includePaths: [<span class="hljs-string">&apos;src/static/scss&apos;</span>]
            }
        },
    ],
},
<span class="hljs-comment">// .vue&#x6587;&#x4EF6;</span>
{
    test: <span class="hljs-regexp">/\.vue$/</span>,
    loader: <span class="hljs-string">&apos;vue-loader&apos;</span>,
    <span class="hljs-keyword">options</span>: {
        <span class="hljs-comment">// @UPDATED @DEPRECATED</span>
        <span class="hljs-comment">// v15+&#x7248;&#x672C;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x5185;&#x8054;&#x7684;cssloader&#x914D;&#x7F6E;</span>
        <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x53BB;&#x6389;&#x4F1A;&#x62A5;&#x9519;</span>
        <span class="hljs-comment">// loaders: util.cssLoaders({</span>
        <span class="hljs-comment">//     sourceMap: false,</span>
        <span class="hljs-comment">//     extract: build,</span>
        <span class="hljs-comment">//     build: build</span>
        <span class="hljs-comment">// })</span>
    }
},
<span class="hljs-comment">// .js&#x6587;&#x4EF6;</span>
{
    test: <span class="hljs-regexp">/\.js$/</span>,
    loader: <span class="hljs-string">&apos;babel-loader&apos;</span>,
    <span class="hljs-keyword">exclude</span>: <span class="hljs-keyword">file</span> =&gt; (
        <span class="hljs-comment">// @UPDATED</span>
        <span class="hljs-comment">// vue-loader v15+&#x7248;&#x672C; </span>
        <span class="hljs-comment">// /node_modules/&#x4E2D;&#x7684;.vue&#x6587;&#x4EF6;&#x9700;&#x8981;&#x7ECF;&#x8FC7;babel-loader&#x8F6C;&#x8BD1;</span>
        <span class="hljs-regexp">/node_modules/</span>.test(<span class="hljs-keyword">file</span>) &amp;&amp;
        !<span class="hljs-regexp">/\.vue\.js/</span>.test(<span class="hljs-keyword">file</span>)
    )
}
... ...</code></pre><p>&#x5176;&#x4ED6;&#x53D8;&#x66F4;&#x53EF;&#x4EE5;&#x53C2;&#x8003;vue-loader&#x5B98;&#x65B9;&#x6587;&#x6863;&#x8BF4;&#x660E;<a href="https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes" rel="nofollow noreferrer" target="_blank">https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes</a></p><h2 id="articleHeader4">DEMO</h2><p>&#x9879;&#x76EE;webpack4&#x914D;&#x7F6E;demo&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;~~<br><a href="https://github.com/icyfanfan/try-webpack4" rel="nofollow noreferrer" target="_blank">https://github.com/icyfanfan/...</a></p><h2 id="articleHeader5">&#x53C2;&#x8003;</h2><p>webpack&#x5B98;&#x65B9;&#x6587;&#x6863;<br><a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">https://medium.com/webpack/we...</a><br><a href="https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655" rel="nofollow noreferrer" target="_blank">https://medium.com/webpack/we...</a><br><a href="https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366" rel="nofollow noreferrer" target="_blank">https://medium.com/webpack/we...</a></p><p>mini-css-extract-plugin<br><a href="https://github.com/webpack-contrib/mini-css-extract-plugin" rel="nofollow noreferrer" target="_blank">https://github.com/webpack-co...</a></p><p>vue-loader<br><a href="https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes" rel="nofollow noreferrer" target="_blank">https://vue-loader.vuejs.org/...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【经验】基于vue多入口项目升级webpack4实践

## 原文链接
[https://segmentfault.com/a/1190000015639537](https://segmentfault.com/a/1190000015639537)

