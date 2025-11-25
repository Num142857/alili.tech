---
title: '通过webpack引入第三方库' 
date: 2018-11-22 11:48:10
hidden: true
slug: un2b8rcyj4o
categories: [reprint]
---

{{< raw >}}
<p>&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x6709;&#x4E00;&#x4E0B;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><ol><li>&#x901A;&#x8FC7;CDN&#x5F15;&#x5165;&#xFF1B;</li><li>&#x901A;&#x8FC7;npm &#x5B89;&#x88C5;&#x5E76;&#x5F15;&#x5165;&#xFF1B;</li><li>&#x7B2C;&#x4E09;&#x65B9;js&#x6587;&#x4EF6;&#x5C31;&#x5728;&#x672C;&#x5730;</li></ol><h2 id="articleHeader0">&#x901A;&#x8FC7;CDN</h2><p>&#x8FD9;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4F8B;&#x5982;&#x5F15;&#x5165;&#x9AD8;&#x5FB7;&#x5730;&#x56FE;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x628A;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x653E;&#x5728;index.html&#x6587;&#x4EF6;&#x5E95;&#x90E8;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0E;webpack&#x65E0;&#x5173;&#xFF0C;&#x56E0;&#x4E3A;webpack&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5E76;&#x4E0D;&#x5728;&#x6B64;&#x5904;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/javascript&quot; src=&quot;https://webapi.amap.com/maps?v=1.4.8&amp;key=&#x60A8;&#x7533;&#x8BF7;&#x7684;key&#x503C;&quot;&gt;&lt;/script&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://webapi.amap.com/maps?v=1.4.8&amp;key=&#x60A8;&#x7533;&#x8BF7;&#x7684;key&#x503C;&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre><h2 id="articleHeader1">npm</h2><p>&#x901A;&#x8FC7;npm install&#x5B89;&#x88C5;&#x7684;&#x5305;&#x4F1A;&#x653E;&#x5728;node modules&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x7528;&#x5230;&#x7684;&#x6587;&#x4EF6;&#x9876;&#x90E8;&#x5F15;&#x5165;&#x8FDB;&#x6765;&#xFF0C;&#x4F8B;&#x5982;import&#x6216;&#x8005;require&#x3002;&#x4F46;&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x5316;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x90FD;&#x8981;&#x53BB;&#x5F15;&#x5165;&#x8FD9;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x6587;&#x4EF6;&#xFF0C;&#x5F88;&#x7E41;&#x7410;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x7528;webpack&#x7684;&#x63D2;&#x4EF6;&#xFF1A;<a href="https://webpack.docschina.org/plugins/provide-plugin/" rel="nofollow noreferrer" target="_blank">ProvidePlugin</a>&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x628A;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x5F15;&#x5165;&#xFF0C;&#x4E14;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x5168;&#x5C40;&#x7684;&#x3002;<br>&#x4F8B;&#x5982;&#x5F15;&#x5165;jquery</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: &apos;jquery&apos;,
  jQuery: &apos;jquery&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  $: <span class="hljs-string">&apos;jquery&apos;</span>,
  jQuery: <span class="hljs-string">&apos;jquery&apos;</span>
})</code></pre><p>&#x90A3;&#x4E48;&#x5C31;&#x53EF;&#x4EE5;&#x7528;$&#x548C;jQuery&#x4E86;&#xFF0C;&#x5B83;&#x4EEC;&#x4E24;&#x4E2A;&#x90FD;&#x8868;&#x793A;jquery&#xFF0C;&#x9700;&#x6CE8;&#x610F;&#x7684;&#x662F;$&#x548C;jQuery&#x540E;&#x9762;&#x7684;&#x503C;&#xFF08;jquery&#xFF09;&#x5FC5;&#x987B;&#x548C;npm install jquery&#x4E2D;&#x7684;jquery&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x627E;&#x4E0D;&#x5230;&#x3002;</p><h2 id="articleHeader2">&#x672C;&#x5730;JS&#x5E93;&#x6587;&#x4EF6;</h2><p>&#x4F1A;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x7B2C;&#x4E09;&#x65B9;&#x7684;js&#x6587;&#x4EF6;&#x5C31;&#x5728;&#x672C;&#x5730;&#xFF0C;&#x600E;&#x4E48;&#x901A;&#x8FC7;webpack&#x5F15;&#x5165;&#x5462;&#xFF1F;&#x6BD4;&#x5982;&#x7B2C;&#x4E8C;&#x79CD;jquery&#x7684;&#x60C5;&#x51B5;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: &apos;jquery&apos;,
  jQuery: &apos;jquery&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  $: <span class="hljs-string">&apos;jquery&apos;</span>,
  jQuery: <span class="hljs-string">&apos;jquery&apos;</span>
})</code></pre><p>&#x8FD9;&#x6837;&#x5199;&#x80AF;&#x5B9A;&#x4F1A;&#x627E;&#x4E0D;&#x5230;jquery&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5E76;&#x4E0D;&#x5728;node modules&#x4E2D;&#xFF0C;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x7528;webpack&#x914D;&#x7F6E;&#x4E2D;&#x7684;<a href="https://webpack.docschina.org/configuration/resolve/#resolve" rel="nofollow noreferrer" target="_blank">resolve</a>&#x9009;&#x9879;&#xFF0C;&#x7ED9;jquery&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x522B;&#x540D;&#xFF0C;&#x5E76;&#x914D;&#x7F6E;&#x5176;&#x8DEF;&#x5F84;&#x3002;<br>&#x5047;&#x5982;&#x6211;&#x4EEC;&#x7684;jquery.js&#x6587;&#x4EF6;&#x653E;&#x5728;dist&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve:{
    alias: {
      $: path.resolve(__dirname, &apos;./dist/jquery.js&apos;),
      jQuery: path.resolve(__dirname, &apos;./dist/jquery.js&apos;),
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>:{
    <span class="hljs-attribute">alias</span>: {
      $: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&apos;./dist/jquery.js&apos;</span>),
      jQuery: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&apos;./dist/jquery.js&apos;</span>),
    }
}</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x901A;&#x8FC7;loader</h2><p>&#x9664;&#x4E86;ProvidePlugin&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;<a href="https://webpack.docschina.org/loaders/imports-loader/" rel="nofollow noreferrer" target="_blank">imports-loader</a>&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x7684;&#x5DE5;&#x4F5C;&#x3002;<br>test&#x6765;&#x6307;&#x5B9A;&#x54EA;&#x4E2A;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;,&#x901A;&#x8FC7;options&#x914D;&#x7F6E;jquery&#x3002;&#x7136;&#x540E;&#x6253;&#x5305;&#x540E;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x6253;&#x5305;&#x540E;&#x7684;app.js&#x6587;&#x4EF6;&#x53D8;&#x5927;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
        rules: [
            {
                test: path.resolve(__dirname, &quot;./src/app.js&quot;),
                use: &quot;imports-loader&quot;
                options:{
                    $:&apos;jquery&apos;
                }
            }
        ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
        <span class="hljs-attribute">rules</span>: [
            {
                test: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&quot;./src/app.js&quot;</span>),
                use: <span class="hljs-string">&quot;imports-loader&quot;</span>
                options:{
                    $:<span class="hljs-string">&apos;jquery&apos;</span>
                }
            }
        ]
    }</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过webpack引入第三方库

## 原文链接
[https://segmentfault.com/a/1190000015700211](https://segmentfault.com/a/1190000015700211)

