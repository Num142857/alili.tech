---
title: 'vue-cli 2.x、create-react-app 项目，使用 webpack-bundle-analyzer 打包分析' 
date: 2018-11-27 2:30:13
hidden: true
slug: p72bscyxm0d
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">vue-cli&#x3001;create-react-app &#x9879;&#x76EE;&#x5982;&#x4F55;&#x67E5;&#x770B;&#x6253;&#x5305;&#x5206;&#x6790;&#xFF1F;</h3><table><thead><tr><th>&#x9879;&#x76EE;</th><th>&#x5982;&#x4F55;&#x67E5;&#x770B;&#x6253;&#x5305;&#x5206;&#x6790;</th></tr></thead><tbody><tr><td>vue-cli &#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;</td><td>&#x5DF2;&#x7ECF;&#x96C6;&#x6210; webpack-bundle-analyzer&#xFF0C;&#x8FD0;&#x884C;<code>npm run build --report</code></td></tr><tr><td>create-react-app &#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;</td><td>&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x4F7F;&#x7528; source-map-explorer&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;&#xFF0C;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#analyzing-the-bundle-size" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/c...</a> &#xFF1B;&lt;br/&gt;&#x63A8;&#x8350;&#x4F7F;&#x7528; webpack-bundle-analyzer&#xFF0C;&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x4F7F;&#x7528;&#x3002;</td></tr></tbody></table><h3 id="articleHeader1">create-react-app &#x642D;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5F15;&#x5165; webpack-bundle-analyzer &#x6253;&#x5305;&#x5206;&#x6790;</h3><p>1.&#x5148;&#x8FD0;&#x884C;<code>npm run eject</code>&#xFF0C;&#x5C06;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x653E;&#x5728;&#x672C;&#x5730;<br>2.&#x5B89;&#x88C5;<code>npm install webpack-bundle-analyzer --save-dev</code><br>3.&#x5728; config/webpack.config.prod.js &#x6587;&#x4EF6;&#xFF08;&#x63A8;&#x8350;&#xFF09;&#x6216; config/webpack.config.dev.js &#x4E2D;&#xFF0C;&#x6DFB;&#x52A0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BundleAnalyzerPlugin = require(&apos;webpack-bundle-analyzer&apos;).BundleAnalyzerPlugin;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">const BundleAnalyzerPlugin</span> = require(<span class="hljs-string">&apos;webpack-bundle-analyzer&apos;</span>).BundleAnalyzerPlugin;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
&#x3000;&#x3000;plugins: [
&#x3000;&#x3000;&#x3000;&#x3000;...
&#x3000;&#x3000;&#x3000;&#x3000;new BundleAnalyzerPlugin()
&#x3000;&#x3000;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
&#x3000;&#x3000;plugins: [
&#x3000;&#x3000;&#x3000;&#x3000;...
&#x3000;&#x3000;&#x3000;&#x3000;<span class="hljs-keyword">new</span> BundleAnalyzerPlugin()
&#x3000;&#x3000;]
}</code></pre><p>4.&#x8FD0;&#x884C;<code>npm run build</code>&#xFF08;&#x63A8;&#x8350;&#xFF0C;&#x8FD9;&#x6837;&#x53EA;&#x5728;&#x6253;&#x5305;&#x65F6;&#xFF0C;&#x6253;&#x5F00;&#x5206;&#x6790;&#x7F51;&#x9875;&#xFF1B;&#x8FD9;&#x4E2A;&#x5730;&#x65B9;&#x5177;&#x4F53;&#x547D;&#x4EE4;&#x540D;&#xFF0C;&#x53EF;&#x5728; package.json &#x6587;&#x4EF6;&#x4E2D; scripts &#x90E8;&#x5206;&#x4FEE;&#x6539;&#xFF09;&#x6216;<code>npm run dev</code>&#xFF08;&#x6BCF;&#x6B21;&#x8FD0;&#x884C;&#x8FD9;&#x4E2A;&#x547D;&#x4EE4;&#xFF0C;&#x90FD;&#x4F1A;&#x6253;&#x5F00;&#x5206;&#x6790;&#x7F51;&#x9875;&#xFF09;&#xFF0C;&#x6253;&#x5305;&#x5206;&#x6790;&#x9875;&#x9762;&#xFF1A;<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:8888/ &#x3002;<br>scripts &#x90E8;&#x5206;&#xFF0C;&#x6211;&#x4FEE;&#x6539;&#x6210;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
&#x3000;&#x3000;&quot;dev&quot;: &quot;node scripts/start.js&quot;,
&#x3000;&#x3000;&quot;build&quot;: &quot;node scripts/build.js&quot;,
&#x3000;&#x3000;&quot;test&quot;: &quot;node scripts/test.js --env=jsdom&quot;,
&#x3000;&#x3000;&quot;analyze&quot;: &quot;source-map-explorer dist/static/js/main.*&quot;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
&#x3000;&#x3000;<span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;node scripts/start.js&quot;</span>,
&#x3000;&#x3000;<span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;node scripts/build.js&quot;</span>,
&#x3000;&#x3000;<span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;node scripts/test.js --env=jsdom&quot;</span>,
&#x3000;&#x3000;<span class="hljs-string">&quot;analyze&quot;</span>: <span class="hljs-string">&quot;source-map-explorer dist/static/js/main.*&quot;</span>
},</code></pre><ul><li>&#x4F8B;&#x5B50;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/cag2050/antd_mobx_demo/blob/master/config/webpack.config.prod.js" rel="nofollow noreferrer" target="_blank">https://github.com/cag2050/an...</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli 2.x、create-react-app 项目，使用 webpack-bundle-analyzer 打包分析

## 原文链接
[https://segmentfault.com/a/1190000015312403](https://segmentfault.com/a/1190000015312403)

