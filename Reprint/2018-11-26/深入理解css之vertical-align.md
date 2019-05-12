---
title: '深入理解css之vertical-align' 
date: 2018-11-26 2:30:10
hidden: true
slug: doiauhmy24
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>vertical-align&#x7528;&#x6765;&#x6307;&#x5B9A;&#x884C;&#x5185;&#x5143;&#x7D20;&#xFF08;inline&#xFF09;&#x6216;&#x8868;&#x683C;&#x5355;&#x5143;&#x683C;&#xFF08;table-cell&#xFF09;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x5BF9;&#x9F50;&#x65B9;&#x5F0F;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E8E;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;vertical-align&#x662F;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#x7684;&#x3002;</p><h3 id="articleHeader1">vertical-align&#x7684;&#x5404;&#x7C7B;&#x5C5E;&#x6027;&#x503C;</h3><p>vertical-align&#x7684;&#x5C5E;&#x6027;&#x503C;&#x53EF;&#x4EE5;&#x5F52;&#x4E3A;&#x4EE5;&#x4E0B;4&#x7C7B;&#xFF1A;</p><ul><li>&#x7EBF;&#x7C7B;&#xFF0C;&#x5982; baseline&#x3001;top&#x3001;middle&#x3001;bottom&#xFF1B;</li><li>&#x6587;&#x672C;&#x7C7B;&#xFF0C;&#x5982; text-top&#x3001;text-bottom&#xFF1B;</li><li>&#x4E0A;&#x6807;&#x4E0B;&#x6807;&#x7C7B;&#xFF0C;&#x5982; sub&#x3001;super&#xFF1B;</li><li>&#x6570;&#x503C;&#x767E;&#x5206;&#x6BD4;&#x7C7B;&#xFF0C;&#x5982; 10px&#x3001;1em&#x3001;5%&#xFF1B;</li></ul><h4>&#x7EBF;&#x7C7B;</h4><p>baseline&#xFF0C;baseline&#x4E3A;vertical-align&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5176;&#x610F;&#x601D;&#x662F;&#x6307;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#xFF0C;&#x6240;&#x8C13;&#x57FA;&#x7EBF;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x5B57;&#x6BCD;x&#x7684;&#x4E0B;&#x8FB9;&#x7F18;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x770B;&#x524D;&#x6587;<a href="https://segmentfault.com/a/1190000014936270">&#x6DF1;&#x5165;&#x7406;&#x89E3;css&#x4E4B;line-height</a>&#x6709;&#x8BB2;&#x89E3;&#x5230;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x5EFA;&#x8BAE;&#x5148;&#x770B;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.box {
    width: 100px;
    line-height: 100px;
    border: 1px solid #ccc;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;box&quot;&gt;
    &lt;span class=&quot;text&quot;&gt;&#x6587;&#x672C;&lt;/span&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span>&#x6587;&#x672C;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKt?w=118&amp;h=121" src="https://static.alili.tech/img/bVbcDKt?w=118&amp;h=121" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x7531;&#x4E8E;baseline&#x662F;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x5199;&#x3002;.box&#x7684;line-height&#x4E3A;100px&#xFF0C;&#x8FD9;&#x5176;&#x5B9E;&#x662F;&#x7ED9;&#x201C;strut&#x201D;&#x8BBE;&#x7F6E;&#x7684;&#xFF08;&#x4E0D;&#x61C2;strut&#x6982;&#x5FF5;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x524D;&#x9762;&#x7684;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000014692461" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3;css&#x76D2;&#x5B50;&#x6A21;&#x578B;</a>&#xFF0C;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#x5C31;&#x662F;&#x6BCF;&#x4E00;&#x4E2A;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x770B;&#x4E0D;&#x89C1;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x8BE5;&#x8282;&#x70B9;&#x7EE7;&#x627F;&#x4E86;line-height&#xFF09;&#xFF0C;&#x56E0;&#x6B64;.text&#x5BF9;&#x9F50;&#x4E8E;&#x8BE5;&#x8282;&#x70B9;&#x7684;&#x57FA;&#x7EBF;&#xFF08;&#x53EF;&#x4EE5;&#x60F3;&#x8C61;&#x6210;&#x8FD9;&#x4E2A;&#x770B;&#x4E0D;&#x89C1;&#x7684;&#x8282;&#x70B9;&#x6709;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;x&#xFF0C;&#x800C;.text&#x5C31;&#x662F;&#x8DDF;&#x8FD9;&#x4E2A;&#x5B57;&#x6BCD;x&#x7684;&#x4E0B;&#x8FB9;&#x7F18;&#x5BF9;&#x9F50;&#xFF09;</p><p>&#x5173;&#x4E8E;baseline&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x662F;inline-block&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;inline-block&#x5143;&#x7D20;&#xFF0C;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;overflow&#x4E0D;&#x662F;visible&#xFF0C;&#x5219;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x662F;&#x5176;margin&#x5E95;&#x8FB9;&#x7F18;&#xFF1B;&#x5426;&#x5219;&#x5176;&#x57FA;&#x7EBF;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x91CC;&#x9762;&#x6700;&#x540E;&#x4E00;&#x884C;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#x57FA;&#x7EBF;&#x3002;&#x4F8B;&#x5B50;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;span class=&quot;text&quot;&gt;&#x6587;&#x672C;&lt;/span&gt;
    &lt;span class=&quot;text&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span>&#x6587;&#x672C;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKB?w=239&amp;h=214" src="https://static.alili.tech/img/bVbcDKB?w=239&amp;h=214" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>top&#xFF0C;&#x5BF9;&#x4E8E;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x5143;&#x7D20;&#x7684;&#x9876;&#x90E8;&#x548C;&#x5F53;&#x524D;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x7684;&#x9876;&#x90E8;&#x5BF9;&#x9F50;&#xFF1B;&#x5BF9;&#x4E8E;table-cell&#x5143;&#x7D20;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x5143;&#x7D20;&#x7684;&#x9876;padding&#x8FB9;&#x7F18;&#x548C;&#x8868;&#x683C;&#x884C;&#x7684;&#x9876;&#x90E8;&#x5BF9;&#x9F50;&#x3002;&#x4F8B;&#x5B50;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width: 100px;
    line-height: 100px;
    border: 1px solid #ccc;
}
.top {
    line-height: normal;
    vertical-align: top;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">line-height</span>: normal;
    <span class="hljs-attribute">vertical-align</span>: top;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;box&quot;&gt;
    &lt;span class=&quot;top&quot;&gt;&#x6587;&#x672C;&lt;/span&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;top&quot;</span>&gt;</span>&#x6587;&#x672C;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKC?w=157&amp;h=153" src="https://static.alili.tech/img/bVbcDKC?w=157&amp;h=153" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>bottom&#xFF0C;&#x8DDF;top&#x7C7B;&#x4F3C;&#xFF0C;&#x5C06;&#x9876;&#x90E8;&#x6362;&#x6210;&#x5E95;&#x90E8;&#x5373;&#x53EF;&#x3002;</p><p>middle&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x7528;&#x5F97;&#x6BD4;&#x8F83;&#x591A;&#x3002;&#x5BF9;&#x4E8E;&#x5185;&#x8054;&#x5143;&#x7D20;&#x6307;&#x7684;&#x662F;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x4E2D;&#x5FC3;&#x70B9;&#x4E0E;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x57FA;&#x7EBF;&#x5F80;&#x4E0A;1/2x-height&#x5904;&#x5BF9;&#x9F50;&#xFF0C;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#x5C31;&#x662F;&#x5B57;&#x6BCD;x&#x7684;&#x4E2D;&#x5FC3;&#x4F4D;&#x7F6E;&#x5BF9;&#x9F50;&#xFF1B;&#x5BF9;&#x4E8E;table-cell&#x5143;&#x7D20;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x5355;&#x5143;&#x683C;&#x586B;&#x5145;&#x76D2;&#x5B50;&#x76F8;&#x5BF9;&#x4E8E;&#x5916;&#x9762;&#x7684;&#x8868;&#x683C;&#x884C;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;&#x3002;&#x57FA;&#x672C;&#x4E0A;&#x6240;&#x6709;&#x5B57;&#x4F53;&#x4E2D;&#xFF0C;&#x5B57;&#x6BCD;x&#x7684;&#x4F4D;&#x7F6E;&#x90FD;&#x662F;&#x504F;&#x4E0B;&#x4E00;&#x70B9;&#x7684;&#xFF0C;font-size&#x8D8A;&#x5927;&#x504F;&#x79FB;&#x8D8A;&#x660E;&#x663E;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x5B57;&#x6BCD;x&#x4E2D;&#x5FC3;&#x7684;&#x4F4D;&#x7F6E;&#x4E0D;&#x662F;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x7684;&#x4E2D;&#x5FC3;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;vertical-align&#x53EA;&#x80FD;&#x5B9E;&#x73B0;&#x8FD1;&#x4F3C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;&#x3002;</p><h4>&#x6587;&#x672C;&#x7C7B;</h4><p>text-top&#xFF0C;&#x6307;&#x7684;&#x662F;&#x76D2;&#x5B50;&#x7684;&#x9876;&#x90E8;&#x548C;&#x7236;&#x7EA7;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x7684;&#x9876;&#x90E8;&#x5BF9;&#x9F50;&#x3002;</p><p>text-bottom&#xFF0C;&#x6307;&#x7684;&#x662F;&#x76D2;&#x5B50;&#x7684;&#x5E95;&#x90E8;&#x548C;&#x7236;&#x7EA7;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x7684;&#x5E95;&#x90E8;&#x5BF9;&#x9F50;&#x3002;</p><p>&#x4F8B;&#x5B50;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width: 300px;
    line-height: 100px;
    border: 1px solid #ccc;
    font-size: 20px;
}
.f12 {
    font-size: 12px;
}
.f16 {
    font-size: 16px;
}
.f20 {
    font-size: 20px;
}
.text-top {
    line-height: normal;
    vertical-align: text-top;
    width: 100px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.f12</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}
<span class="hljs-selector-class">.f16</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}
<span class="hljs-selector-class">.f20</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.text-top</span> {
    <span class="hljs-attribute">line-height</span>: normal;
    <span class="hljs-attribute">vertical-align</span>: text-top;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;
    &lt;span class=&quot;f12&quot;&gt;12px&lt;/span&gt;
    &lt;span class=&quot;f16&quot;&gt;16px&lt;/span&gt;
    &lt;span class=&quot;f20&quot;&gt;20px&lt;/span&gt;
    &lt;img class=&quot;text-top&quot; src=&quot;./card.jpg&quot;/&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;f12&quot;</span>&gt;</span>12px<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;f16&quot;</span>&gt;</span>16px<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;f20&quot;</span>&gt;</span>20px<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-top&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./card.jpg&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKH?w=342&amp;h=181" src="https://static.alili.tech/img/bVbcDKH?w=342&amp;h=181" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x6240;&#x8C13;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x6210;&#x662F;&#x9F20;&#x6807;&#x9009;&#x4E2D;&#x6587;&#x5B57;&#x540E;&#x9AD8;&#x4EAE;&#x7684;&#x80CC;&#x666F;&#x8272;&#x533A;&#x57DF;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x7531;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x7684;&#x662F;20px&#xFF0C;&#x6240;&#x4EE5;&#x56FE;&#x7247;&#x7684;vertical-align&#x8BBE;&#x7F6E;text-top&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x6210;&#x662F;&#x8DDF;&#x5B50;&#x5143;&#x7D20;&#x4E3A;20px&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x9876;&#x90E8;&#x5BF9;&#x9F50;&#x3002;</p><h4>&#x4E0A;&#x6807;&#x4E0B;&#x6807;&#x7C7B;</h4><p>&#x4E0A;&#x6807;&#x548C;&#x4E0B;&#x6807;&#x5BF9;&#x5E94;&#x7740;&#x4E24;&#x4E2A;&#x6807;&#x7B7E;super&#x548C;sub&#xFF0C;super&#x5728;&#x4E0A;&#x9762;&#xFF0C;sub&#x5728;&#x4E0B;&#x9762;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x5728;&#x6570;&#x5B66;&#x516C;&#x5F0F;&#x548C;&#x5316;&#x5B66;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7528;&#x5F97;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x5E73;&#x65F6;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x51E0;&#x4E4E;&#x7528;&#x4E0D;&#x5230;&#xFF0C;&#x4E5F;&#x6CA1;&#x5565;&#x597D;&#x8BB2;&#x7684;&#x3002;</p><h4>&#x6570;&#x503C;&#x767E;&#x5206;&#x6BD4;&#x7C7B;</h4><p>vertical-align&#x662F;&#x652F;&#x6301;&#x6570;&#x503C;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x517C;&#x5BB9;&#x6027;&#x4E5F;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x4F46;&#x5927;&#x90E8;&#x5206;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x5374;&#x4E0D;&#x77E5;&#x9053;vertical-align&#x652F;&#x6301;&#x6570;&#x503C;&#x3002;&#x5BF9;&#x4E8E;&#x6570;&#x503C;&#xFF0C;&#x6B63;&#x503C;&#x8868;&#x793A;&#x7531;&#x57FA;&#x7EBF;&#x5F80;&#x4E0A;&#x504F;&#x79FB;&#xFF0C;&#x8D1F;&#x503C;&#x8868;&#x793A;&#x7531;&#x57FA;&#x7EBF;&#x5F80;&#x4E0B;&#x504F;&#x79FB;&#x3002;&#x800C;&#x767E;&#x5206;&#x6BD4;&#x5219;&#x662F;&#x57FA;&#x4E8E;line-height&#x6765;&#x8BA1;&#x7B97;&#x7684;&#xFF0C;&#x767E;&#x5206;&#x6BD4;&#x7528;&#x5F97;&#x6BD4;&#x8F83;&#x5C11;&#xFF0C;&#x56E0;&#x4E3A;line-height&#x4E00;&#x822C;&#x90FD;&#x662F;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x7ED9;&#x51FA;&#x7684;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6570;&#x503C;&#x5C31;&#x53EF;&#x4EE5;&#x7CBE;&#x786E;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x4F7F;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x518D;&#x53BB;&#x8BA1;&#x7B97;&#x4E00;&#x904D;&#x3002;&#x4F7F;&#x7528;&#x6570;&#x503C;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width: 300px;
    line-height: 100px;
    border: 1px solid #ccc;
    font-size: 20px;
}
.num {
    line-height: normal;
    vertical-align: 20px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.num</span> {
    <span class="hljs-attribute">line-height</span>: normal;
    <span class="hljs-attribute">vertical-align</span>: <span class="hljs-number">20px</span>;
}
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;box&quot;&gt;
    &lt;span class=&quot;num&quot;&gt;&#x6587;&#x672C;&lt;/span&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num&quot;</span>&gt;</span>&#x6587;&#x672C;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKK?w=195&amp;h=138" src="https://static.alili.tech/img/bVbcDKK?w=195&amp;h=138" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader2">vertical-align&#x8D77;&#x4F5C;&#x7528;&#x7684;&#x524D;&#x63D0;</h3><p>vertical-align&#x8D77;&#x4F5C;&#x7528;&#x662F;&#x6709;&#x524D;&#x63D0;&#x6761;&#x4EF6;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x524D;&#x63D0;&#x6761;&#x4EF6;&#x5C31;&#x662F;&#xFF1A;&#x53EA;&#x80FD;&#x5E94;&#x7528;&#x4E8E;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4EE5;&#x53CA;display&#x503C;&#x4E3A;table-cell&#x7684;&#x5143;&#x7D20;&#x3002;&#x5728;css&#x4E2D;&#xFF0C;&#x6709;&#x4E9B;css&#x5C5E;&#x6027;&#x662F;&#x4F1A;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x7684;display&#x503C;&#x7684;&#xFF0C;&#x4F8B;&#x5982;float&#x548C;position: absolute&#xFF0C;&#x4E00;&#x65E6;&#x8BBE;&#x7F6E;&#x4E86;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x4E4B;&#x4E00;&#xFF0C;&#x5143;&#x7D20;&#x7684;display&#x503C;&#x5C31;&#x662F;&#x53D8;&#x4E3A;block&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;vertical-align&#x4E5F;&#x5C31;&#x5931;&#x53BB;&#x4E86;&#x4F5C;&#x7528;&#x3002;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x8FD9;&#x6837;&#x5199;&#x5C31;&#x662F;&#x9519;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
   span {
        float: left;
        vertical-align: middle; /* &#x9519;&#x8BEF;&#xFF0C;&#x8BE5;&#x884C;&#x4EE3;&#x7801;&#x65E0;&#x6548; */
   }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">
   <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">vertical-align</span>: middle; <span class="hljs-comment">/* &#x9519;&#x8BEF;&#xFF0C;&#x8BE5;&#x884C;&#x4EE3;&#x7801;&#x65E0;&#x6548; */</span>
   }
</code></pre><p>&#x53E6;&#x5916;&#xFF0C;&#x66F4;&#x591A;&#x4EBA;&#x9047;&#x5230;&#x7684;&#x662F;&#x4EE5;&#x4E0B;&#x8FD9;&#x79CD;&#x65E0;&#x6548;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.box {
    height: 200px;
}
.box &gt; img {
    height: 100px;
    vertical-align: middle;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;box&quot;&gt;
    &lt;img  src=&quot;1.jpg&quot; /&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span>  <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;1.jpg&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x5176;&#x5B9E;&#xFF0C;&#x4E0D;&#x662F;vertical-align&#x65E0;&#x6548;&#xFF0C;&#x800C;&#x662F;&#x524D;&#x9762;&#x6240;&#x8BF4;&#x7684;&#x201C;strut&#x201D;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x7531;&#x4E8E;.box&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;line-height&#xFF0C;&#x6240;&#x4EE5;&#x201C;strut&#x201D;&#x7684;line-height&#x5C31;&#x975E;&#x5E38;&#x5C0F;&#xFF0C;&#x6BD4;&#x56FE;&#x7247;&#x7684;&#x9AD8;&#x5EA6;&#x5C0F;&#x5F88;&#x591A;&#xFF0C;vertical-align: middle&#x6CA1;&#x6CD5;&#x53D1;&#x6325;&#x4F5C;&#x7528;&#x3002;&#x8FD9;&#x65F6;&#x7ED9;.box&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x9AD8;&#x7684;line-height&#xFF0C;&#x5C31;&#x4F1A;&#x770B;&#x5230;vertical-align&#x8D77;&#x4F5C;&#x7528;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.box {
    height: 200px;
    line-height: 200px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
}
</code></pre><h3 id="articleHeader3">vertical-align&#x4E0E;line-height&#x7684;&#x5173;&#x7CFB;</h3><p>&#x524D;&#x9762;&#x8BB2;&#x4E86;&#xFF0C;vertical-align&#x7684;&#x767E;&#x5206;&#x6BD4;&#x503C;&#x662F;&#x6839;&#x636E;line-height&#x6765;&#x8BA1;&#x7B97;&#x7684;&#x3002;&#x4F46;&#x5B9E;&#x8D28;&#x4E0A;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x540C;&#x65F6;&#x5728;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x5982;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    line-height: 32px;
}
.box &gt; span {
    font-size: 24px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">32px</span>;
}
<span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div class=&quot;box&quot;&gt;
    &lt;span&gt;&#x6587;&#x672C;&lt;/span&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&#x6587;&#x672C;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcDKV?w=180&amp;h=87" src="https://static.alili.tech/img/bVbcDKV?w=180&amp;h=87" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4EE3;&#x7801;&#x4E0A;&#x770B;&#xFF0C;&#x597D;&#x50CF;.box&#x7684;&#x9AD8;&#x5EA6;&#x4F1A;&#x662F;32px&#xFF0C;&#x4F46;&#x5B9E;&#x8D28;&#x4E0A;.box&#x7684;&#x9AD8;&#x5EA6;&#x4F1A;&#x6BD4;32px&#x8FD8;&#x8981;&#x9AD8;&#x3002;&#x539F;&#x56E0;&#x662F;&quot;strut&quot;&#x7EE7;&#x627F;&#x4E86;line-height: 32px&#xFF0C;span&#x4E5F;&#x7EE7;&#x627F;&#x4E86;line-height: 32px&#xFF0C;&#x4F46;&#x4E24;&#x8005;&#x7684;font-size&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x5C31;&#x5BFC;&#x81F4;&#x4E86;&quot;strut&quot;&#x7684;font-size&#x6BD4;&#x8F83;&#x5C0F;&#xFF0C;&#x800C;span&#x7684;font-size&#x6BD4;&#x8F83;&#x5927;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5B83;&#x4EEC;&#x7684;&#x57FA;&#x7EBF;&#x4E0D;&#x5728;&#x540C;&#x4E00;&#x4F4D;&#x7F6E;&#x4E0A;&#xFF0C;&quot;strut&quot;&#x504F;&#x4E0A;&#x4E00;&#x70B9;&#xFF0C;&#x800C;span&#x9ED8;&#x8BA4;&#x53C8;&#x662F;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#xFF0C;&#x4E3A;&#x6B64;&#xFF0C;span&#x603B;&#x4F53;&#x4F1A;&#x5F80;&#x4E0A;&#x79FB;&#x4EE5;&#x4FBF;&#x8DDF;&quot;strut&quot;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#xFF0C;.box&#x5143;&#x7D20;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x88AB;&#x6491;&#x9AD8;&#x4E86;&#x3002;&#x800C;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x53EF;&#x4EE5;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#xFF1A;</p><ul><li>span&#x5143;&#x7D20;&#x4E0D;&#x4F7F;&#x7528;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x4E3A;top&#x5BF9;&#x9F50;</li><li>span&#x5143;&#x7D20;&#x5757;&#x72B6;&#x5316;</li><li>line-height&#x8BBE;&#x7F6E;&#x4E3A;0</li><li>font-size&#x8BBE;&#x7F6E;&#x4E3A;0</li></ul><h3 id="articleHeader4">&#x603B;&#x7ED3;</h3><ul><li>&#x8BB2;&#x89E3;&#x4E86;vertical-align&#x7684;&#x5404;&#x7C7B;&#x5C5E;&#x6027;&#x503C;&#x53CA;&#x5176;&#x6548;&#x679C;</li><li>vertical-align&#x8D77;&#x4F5C;&#x7528;&#x7684;&#x524D;&#x63D0;&#x662F;&#x5185;&#x8054;&#x5143;&#x7D20;</li><li>vertical-align&#x4E0E;line-height&#x90FD;&#x662F;&#x540C;&#x65F6;&#x4F5C;&#x7528;&#x5728;&#x5185;&#x8054;&#x5143;&#x7D20;&#x4E0A;&#x7684;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解css之vertical-align

## 原文链接
[https://segmentfault.com/a/1190000015366749](https://segmentfault.com/a/1190000015366749)

