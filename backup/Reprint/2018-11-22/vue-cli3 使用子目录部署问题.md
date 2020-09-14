---
title: 'vue-cli3 使用子目录部署问题' 
date: 2018-11-22 11:48:10
hidden: true
slug: keprcww8d5f
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;&#x4F7F;&#x7528; vue-cli3 build&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F7F;&#x7528;&#x975E;&#x5B50;&#x76EE;&#x5F55;&#x9700;&#x8981;&#x5728; vue.config.js &#x4E2D;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  baseUrl: process.env.NODE_ENV === &apos;production&apos; ? &apos;/dist/&apos; : &apos;/&apos;,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-keyword">module</span>.exports = {
  baseUrl: <span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span> ? <span class="hljs-string">&apos;/dist/&apos;</span> : <span class="hljs-string">&apos;/&apos;</span>,
}</code></pre><p>&#x4F46;&#x662F;build&#x5B8C;&#x540E;&#xFF0C;&#x653E;&#x5728;nginx&#x670D;&#x52A1;&#x4E0B;&#xFF0C;&#x4F1A;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x62A5;&#x9519;&#xFF0C;&#x9875;&#x9762;&#x4E5F;&#x663E;&#x793A; no-script &#x7684;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs n1ql"><code style="word-break:break-word;white-space:initial">[Vue warn]: You are using the runtime-only <span class="hljs-keyword">build</span> of Vue <span class="hljs-keyword">where</span> the template compiler <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> available. Either pre-compile the templates <span class="hljs-keyword">into</span> render functions, <span class="hljs-keyword">or</span> <span class="hljs-keyword">use</span> the compiler-included <span class="hljs-keyword">build</span>.</code></pre><p>&#x7F51;&#x4E0A;&#x627E;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x7B54;&#x6848;&#x3002;&#x540E;&#x6765;&#x53D1;&#x73B0; vue-router &#x662F;&#x7528;&#x4E86; history &#x6A21;&#x5F0F;&#xFF0C;&#x4F46;&#x662F; nginx &#x5E76;&#x6CA1;&#x6709;&#x6DFB;&#x52A0;&#x76F8;&#x5E94;&#x7684;&#x914D;&#x7F6E;&#x4FBF;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x4E0B;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;<br>1.&#x53D8;&#x66F4;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#xFF0C;&#x4F7F;&#x5F97;&#x652F;&#x6301; history &#x6A21;&#x5F0F;&#x3002;&#x8FD9;&#x91CC;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539; nginx &#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x628A; 404 &#x6307;&#x5411; index.html &#x5373;&#x53EF;&#x3002;<br>2.&#x4E0D;&#x5728;&#x4F7F;&#x7528;history&#x6A21;&#x5F0F;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli3 使用子目录部署问题

## 原文链接
[https://segmentfault.com/a/1190000015677012](https://segmentfault.com/a/1190000015677012)

