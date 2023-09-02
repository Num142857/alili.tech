---
title: 'Angular template syntax' 
date: 2018-11-23 2:30:10
hidden: true
slug: x82ymouq1el
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x6A21;&#x677F;&#x8BED;&#x6CD5;&#x7B80;&#x4ECB;</h1><h2 id="articleHeader1">1&#x3001;&#x63D2;&#x503C;&#x8868;&#x8FBE;&#x5F0F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;Hello "{{"name"}}"&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span>&gt;Hello "{{"<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><blockquote>Angular &#x5BF9;&#x6240;&#x6709;&#x53CC;&#x82B1;&#x62EC;&#x53F7;&#x4E2D;&#x7684;<strong>&#x8868;&#x8FBE;&#x5F0F;</strong>&#x6C42;&#x503C;&#xFF0C;&#x628A;&#x6C42;&#x503C;&#x7684;&#x7ED3;&#x679C;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E76;&#x628A;&#x5B83;&#x4EEC;&#x8DDF;&#x76F8;&#x90BB;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5B57;&#x9762;&#x91CF;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x3002;&#x6700;&#x540E;&#xFF0C;&#x628A;&#x8FD9;&#x4E2A;&#x7EC4;&#x5408;&#x51FA;&#x6765;&#x7684;&#x63D2;&#x503C;&#x7ED3;&#x679C;&#x8D4B;&#x7ED9;&#x5143;&#x7D20;&#x6216;&#x6307;&#x4EE4;&#x7684;&#x5C5E;&#x6027;&#x3002;</blockquote><p>&#x8868;&#x9762;&#x4E0A;&#x770B;&#xFF0C;&#x4F60;&#x5728;&#x5143;&#x7D20;&#x6807;&#x7B7E;&#x4E4B;&#x95F4;&#x63D2;&#x5165;&#x4E86;&#x7ED3;&#x679C;&#x548C;&#x5BF9;&#x6807;&#x7B7E;&#x7684;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x4E86;&#x8D4B;&#x503C;&#x3002; &#x8FD9;&#x6837;&#x601D;&#x8003;&#x8D77;&#x6765;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x5E76;&#x4E14;&#x8FD9;&#x4E2A;&#x8BEF;&#x89E3;&#x5F88;&#x5C11;&#x7ED9;&#x4F60;&#x5E26;&#x6765;&#x9EBB;&#x70E6;&#x3002; &#x4F46;&#x4E25;&#x683C;&#x6765;&#x8BB2;&#xFF0C;&#x8FD9;&#x662F;&#x4E0D;&#x5BF9;&#x7684;&#x3002;&#x63D2;&#x503C;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;Angular &#x628A;&#x5B83;&#x8F6C;&#x6362;&#x6210;&#x4E86;&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x3002;</p><p>&#x7B49;&#x4EF7;&#x4E8E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div [textContent]=&quot;interpolate([&apos;Hello&apos;], [name])&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span> [textContent]=<span class="hljs-string">&quot;interpolate([&apos;Hello&apos;], [name])&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><h2 id="articleHeader2">2&#x3001;&#x6A21;&#x677F;&#x8868;&#x8FBE;&#x5F0F;</h2><blockquote>&#x6A21;&#x677F;&#x8868;&#x8FBE;&#x5F0F;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x503C;&#x3002; Angular &#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5E76;&#x628A;&#x5B83;&#x8D4B;&#x503C;&#x7ED9;&#x7ED1;&#x5B9A;&#x76EE;&#x6807;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x7ED1;&#x5B9A;&#x76EE;&#x6807;&#x53EF;&#x80FD;&#x662F; HTML &#x5143;&#x7D20;&#x3001;&#x7EC4;&#x4EF6;&#x6216;&#x6307;&#x4EE4;&#x3002;</blockquote><h3 id="articleHeader3">&#x8F93;&#x5165;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4E3A;&#x5E38;&#x91CF;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;show-title title=&quot;Some Title&quot;&gt;&lt;/show-title&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span> <span class="hljs-built_in">title</span>=<span class="hljs-string">&quot;Some Title&quot;</span>&gt;&lt;/<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span>&gt;</code></pre><p>&#x7B49;&#x4EF7;&#x4E8E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;show-title [title]=&quot;&apos;Some Title&apos;&quot;&gt;&lt;/show-title&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span> [<span class="hljs-built_in">title</span>]=<span class="hljs-string">&quot;&apos;Some Title&apos;&quot;</span>&gt;&lt;/<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span>&gt;</code></pre><h3 id="articleHeader4">&#x8F93;&#x5165;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4E3A;&#x53D8;&#x91CF;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;show-title [title]=&quot;someTitle&quot;&gt;&lt;/show-title&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span> [<span class="hljs-built_in">title</span>]=<span class="hljs-string">&quot;someTitle&quot;</span>&gt;&lt;/<span class="hljs-keyword">show</span>-<span class="hljs-built_in">title</span>&gt;</code></pre><blockquote>&#x522B;&#x5FD8;&#x4E86;&#x65B9;&#x62EC;&#x53F7;&#xFF0C;&#x65B9;&#x62EC;&#x53F7;&#x544A;&#x8BC9; Angular &#x8981;&#x8BA1;&#x7B97;&#x6A21;&#x677F;&#x8868;&#x8FBE;&#x5F0F;&#x3002; &#x5982;&#x679C;&#x5FD8;&#x4E86;&#x52A0;&#x65B9;&#x62EC;&#x53F7;&#xFF0C;Angular &#x4F1A;&#x628A;&#x8FD9;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x5F53;&#x505A;&#x5B57;&#x7B26;&#x4E32;&#x5E38;&#x91CF;&#x770B;&#x5F85;&#xFF0C;&#x5E76;&#x7528;&#x8BE5;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x521D;&#x59CB;&#x5316;&#x76EE;&#x6807;&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x4E0D;&#x4F1A;&#x8BA1;&#x7B97;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</blockquote><h3 id="articleHeader5">&#x6A21;&#x677F;&#x53D8;&#x91CF;</h3><blockquote>hero &#x524D;&#x7684; let &#x5173;&#x952E;&#x5B57;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x540D;&#x53EB; hero &#x7684;<strong>&#x6A21;&#x677F;&#x8F93;&#x5165;&#x53D8;&#x91CF;</strong>&#x3002; ngFor &#x6307;&#x4EE4;&#x5728;&#x7531;&#x7236;&#x7EC4;&#x4EF6;&#x7684; heroes &#x5C5E;&#x6027;&#x8FD4;&#x56DE;&#x7684; heroes &#x6570;&#x7EC4;&#x4E0A;&#x8FED;&#x4EE3;&#xFF0C;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x90FD;&#x4ECE;&#x6570;&#x7EC4;&#x4E2D;&#x628A;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8D4B;&#x503C;&#x7ED9; hero &#x53D8;&#x91CF;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div *ngFor=&quot;let hero of heroes&quot;&gt;"{{"hero.name"}}"&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span> *ngFor=<span class="hljs-string">&quot;let hero of heroes&quot;</span>&gt;"{{"hero.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><h3 id="articleHeader6">&#x6A21;&#x7248;&#x5F15;&#x7528;&#x53D8;&#x91CF;</h3><blockquote>&#x6A21;&#x677F;&#x5F15;&#x7528;&#x53D8;&#x91CF;&#x901A;&#x5E38;&#x7528;&#x6765;&#x5F15;&#x7528;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x67D0;&#x4E2A; DOM &#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x8FD8;&#x53EF;&#x4EE5;&#x5F15;&#x7528; Angular &#x7EC4;&#x4EF6;&#x6216;&#x6307;&#x4EE4;&#x6216;Web Component&#x3002;&#x4F7F;&#x7528;&#x4E95;&#x53F7; (#) &#x6765;&#x58F0;&#x660E;&#x5F15;&#x7528;&#x53D8;&#x91CF;&#x3002; #phone &#x7684;&#x610F;&#x601D;&#x5C31;&#x662F;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x540D;&#x53EB; phone &#x7684;&#x53D8;&#x91CF;&#x6765;&#x5F15;&#x7528; &lt;input&gt; &#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x5F15;&#x7528;&#x8BE5;&#x6A21;&#x677F;&#x5F15;&#x7528;&#x53D8;&#x91CF;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input #phone placeholder=&quot;phone number&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">input</span> <span class="hljs-selector-id">#phone</span> placeholder=<span class="hljs-string">&quot;phone number&quot;</span>&gt;</code></pre><h1 id="articleHeader7">&#x6A21;&#x677F;&#x8BED;&#x53E5;</h1><blockquote>&#x6A21;&#x677F;&#x8BED;&#x53E5;&#x7528;&#x6765;&#x54CD;&#x5E94;&#x7531;&#x7ED1;&#x5B9A;&#x76EE;&#x6807;&#xFF08;&#x5982; HTML &#x5143;&#x7D20;&#x3001;&#x7EC4;&#x4EF6;&#x6216;&#x6307;&#x4EE4;&#xFF09;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;date-picker (dateChanged)=&quot;statement()&quot;&gt;&lt;/date-picker&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-built_in">date</span>-picker (dateChanged)=<span class="hljs-string">&quot;statement()&quot;</span>&gt;&lt;/<span class="hljs-built_in">date</span>-picker&gt;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular template syntax

## 原文链接
[https://segmentfault.com/a/1190000015614579](https://segmentfault.com/a/1190000015614579)
