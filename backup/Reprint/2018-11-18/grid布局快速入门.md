---
title: 'grid布局快速入门' 
date: 2018-11-18 3:32:07
hidden: true
slug: i6t12pg8u8
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Grid&#x5E03;&#x5C40;&#x5FEB;&#x901F;&#x5165;&#x95E8;</h2><h3 id="articleHeader1">&#x5E38;&#x7528;Grid&#x5E03;&#x5C40;&#x5C5E;&#x6027;&#x4ECB;&#x7ECD;</h3><p>&#x4E0B;&#x9762;&#x4ECE;&#x4E00;&#x4E2A;&#x7B80;&#x5355;Grid&#x5E03;&#x5C40;&#x4F8B;&#x5B50;&#x8BF4;&#x8D77;&#x3002;<br>CSS Grid &#x5E03;&#x5C40;&#x7531;&#x4E24;&#x4E2A;&#x6838;&#x5FC3;&#x7EC4;&#x6210;&#x90E8;&#x5206;&#x662F; wrapper&#xFF08;&#x7236;&#x5143;&#x7D20;&#xFF09;&#x548C; items&#xFF08;&#x5B50;&#x5143;&#x7D20;&#xFF09;&#x3002; wrapper &#x662F;&#x5B9E;&#x9645;&#x7684; grid(&#x7F51;&#x683C;)&#xFF0C;items &#x662F; grid(&#x7F51;&#x683C;) &#x5185;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A; wrapper &#x5143;&#x7D20;&#xFF0C;&#x5185;&#x90E8;&#x5305;&#x542B;6&#x4E2A; items &#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;wrapper&quot;&gt;
            &lt;div class=&quot;item div1&quot;&gt;1&lt;/div&gt;
            &lt;div class=&quot;item div2&quot;&gt;2&lt;/div&gt;
            &lt;div class=&quot;item div3&quot;&gt;3&lt;/div&gt;
            &lt;div class=&quot;item div4&quot;&gt;4&lt;/div&gt;
            &lt;div class=&quot;item div5&quot;&gt;5&lt;/div&gt;
            &lt;div class=&quot;item div6&quot;&gt;6&lt;/div&gt;
        &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;wrapper&quot;</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div1&quot;</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div2&quot;</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div3&quot;</span>&gt;<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div4&quot;</span>&gt;<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div5&quot;</span>&gt;<span class="hljs-number">5</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item div6&quot;</span>&gt;<span class="hljs-number">6</span>&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x8981;&#x628A; wrapper &#x5143;&#x7D20;&#x53D8;&#x6210;&#x4E00;&#x4E2A; grid(&#x7F51;&#x683C;)&#xFF0C;&#x53EA;&#x8981;&#x7B80;&#x5355;&#x5730;&#x628A;&#x5176; display &#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x4E3A; grid &#x5373;&#x53EF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeMrJ?w=415&amp;h=347" src="https://static.alili.tech/img/bVbeMrJ?w=415&amp;h=347" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">Columns(&#x5217;) &#x548C; rows(&#x884C;)</h3><p>&#x4E3A;&#x4E86;&#x4F7F;&#x5176;&#x6210;&#x4E3A;&#x4E8C;&#x7EF4;&#x7684;&#x7F51;&#x683C;&#x5BB9;&#x5668;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x5217;&#x548C;&#x884C;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x521B;&#x5EFA;3&#x5217;&#x548C;2&#x884C;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;grid-template-row&#x548C;grid-template-column&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">50px</span> <span class="hljs-number">50px</span>;
}</code></pre><p>grid-template-columns&#x7684;3&#x4E2A;&#x503C;&#x8868;&#x793A;&#x4E09;&#x5217;&#xFF0C;&#x76F8;&#x5E94;&#x7684;&#x6570;&#x503C;&#x8868;&#x793A;&#x5217;&#x5BBD;&#x5373;&#x90FD;&#x4E3A;100px&#x3002;<br>grid-template-rows&#x7684;2&#x4E2A;&#x503C;&#x8868;&#x793A;&#x4E24;&#x884C;&#xFF0C;&#x76F8;&#x5E94;&#x7684;&#x6570;&#x503C;&#x8868;&#x793A;&#x884C;&#x9AD8;&#x5373;&#x90FD;&#x4E3A;50px</p><p>&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeMsB?w=367&amp;h=153" src="https://static.alili.tech/img/bVbeMsB?w=367&amp;h=153" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D8;&#x5316;&#x4E00;&#x4E0B;&#x884C;&#x9AD8;&#x8DDF;&#x5217;&#x5BBD;&#x7684;&#x503C;&#x770B;&#x4E0B;&#x6548;&#x679C;&#xFF0C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
    display: grid;
    grid-template-columns: 200px 50px 100px;
    grid-template-rows: 100px 50px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">100px</span> <span class="hljs-number">50px</span>;
}</code></pre><p>&#x6548;&#x679C;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeMzO?w=428&amp;h=215" src="https://static.alili.tech/img/bVbeMzO?w=428&amp;h=215" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x5BFC;&#xFF01;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
grid布局快速入门

## 原文链接
[https://segmentfault.com/a/1190000015877347](https://segmentfault.com/a/1190000015877347)

