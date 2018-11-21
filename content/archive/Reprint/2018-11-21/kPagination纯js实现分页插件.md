---
title: 'kPagination纯js实现分页插件' 
date: 2018-11-21 2:30:10
hidden: true
slug: urdsq6sep5s
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">kPagination&#x5206;&#x9875;&#x63D2;&#x4EF6;</h1><blockquote>&#x7EAF;js&#x5206;&#x9875;&#x63D2;&#x4EF6;&#xFF0C;&#x538B;&#x7F29;&#x7248;&#x672C;~4kb&#xFF0C;&#x6837;&#x5F0F;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;</blockquote><h4><a href="https://kelen.github.io/kPagination/dist/index.html" rel="nofollow noreferrer" target="_blank">demo</a></h4><h2 id="articleHeader1">&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;pagination&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;kPagination.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new kPagination({
        id: &apos;pagination&apos;,
        currentPage: 1,         // &#x5F53;&#x524D;&#x9875;
        totalPage: 20,
        offset: 5,
        showPrev: true,
        showNext: true,
        jumpPage: true,
        jumpText: &apos;&#x8DF3;&#x8F6C;&apos;
    });
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;pagination&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;kPagination.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> kPagination({
        id: <span class="hljs-string">&apos;pagination&apos;</span>,
        currentPage: <span class="hljs-number">1</span>,         <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;</span>
        totalPage: <span class="hljs-number">20</span>,
        offset: <span class="hljs-number">5</span>,
        showPrev: <span class="hljs-literal">true</span>,
        showNext: <span class="hljs-literal">true</span>,
        jumpPage: <span class="hljs-literal">true</span>,
        jumpText: <span class="hljs-string">&apos;&#x8DF3;&#x8F6C;&apos;</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader2">&#x914D;&#x7F6E;&#x9879;</h3><table><thead><tr><th>&#x9009;&#x9879;</th><th>&#x7C7B;&#x578B;</th><th>&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td>offset</td><td>number</td><td>&#x53EF;&#x4EE5;&#x663E;&#x793A;&#x7684;&#x6309;&#x94AE;&#x4E2A;&#x6570;</td></tr><tr><td>showPrev</td><td>boolean</td><td>&#x662F;&#x5426;&#x663E;&#x793A;&#x4E0A;&#x4E00;&#x9875;&#x6309;&#x94AE;</td></tr><tr><td>showNext</td><td>boolean</td><td>&#x662F;&#x5426;&#x663E;&#x793A;&#x4E0B;&#x4E00;&#x9875;&#x6309;&#x94AE;</td></tr><tr><td>jumpPage</td><td>boolean</td><td>&#x662F;&#x5426;&#x663E;&#x793A;&#x8DF3;&#x8F6C;&#x8F93;&#x5165;&#x6846;</td></tr><tr><td>jumpText</td><td>string</td><td>&#x8DF3;&#x8F6C;&#x6309;&#x94AE;&#x7684;&#x6587;&#x5B57;</td></tr><tr><td>pageChange</td><td>function</td><td>&#x9875;&#x9762;&#x89E6;&#x53D1;&#x56DE;&#x8C03;</td></tr><tr><td>afterRefresh</td><td>function</td><td>&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6210;&#x529F;&#x56DE;&#x8C03;</td></tr></tbody></table><h3 id="articleHeader3">&#x53EF;&#x9009;&#x6837;&#x5F0F;</h3><table><thead><tr><th>&#x9009;&#x9879;</th><th>&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td>k-pagination-num-wrap</td><td>&#x5206;&#x9875;&#x5BB9;&#x5668;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-input-wrap</td><td>&#x6309;&#x94AE;&#x5BB9;&#x5668;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-num</td><td>&#x9875;&#x7801;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-num-active</td><td>&#x6FC0;&#x6D3B;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-disabled</td><td>&#x7981;&#x6B62;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-num-input</td><td>&#x8F93;&#x5165;&#x6846;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-jump-btn</td><td>&#x8DF3;&#x8F6C;&#x6309;&#x94AE;&#x6837;&#x5F0F;</td></tr><tr><td>k-pagination-jump-dot</td><td>&#x7701;&#x7565;&#x53F7;&#x6837;&#x5F0F;</td></tr></tbody></table><p>&#x9644;&#x4E0A;<a href="https://github.com/KELEN/kPagination" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a>&#xFF0C;&#x559C;&#x6B22;&#x7684;&#x670B;&#x53CB;&#x7ED9;&#x4E2A;star&#x5427;&#xFF0C;&#x6709;bug&#x53EF;&#x4EE5;&#x53CD;&#x9988;&#x54C8;&#xFF0C;&#x6211;&#x4F1A;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x4FEE;&#x590D;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
kPagination纯js实现分页插件

## 原文链接
[https://segmentfault.com/a/1190000015759074](https://segmentfault.com/a/1190000015759074)

