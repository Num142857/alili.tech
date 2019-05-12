---
title: 'Flex实现九宫格' 
date: 2018-11-17 14:34:54
hidden: true
slug: 2mx5rjtfr1v
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x5199;&#x4E00;&#x4E2A;&#x9760;&#x8C31;&#x7684;flex&#x5E03;&#x5C40;</h3><p><span class="img-wrap"><img data-src="/img/bVbe5KA?w=407&amp;h=666" src="https://static.alili.tech/img/bVbe5KA?w=407&amp;h=666" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;style&gt;
.block {
    padding-top: 30%;
    margin-top: 3%;
    border-radius: 10%;
    background-color: orange;
    width: 30%;
}
.container-flex2  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
&lt;/style&gt;
&lt;body&gt;
   &lt;div class=&quot;container-flex2&quot;&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;block&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.block</span> {
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">30%</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">3%</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10%</span>;
    <span class="hljs-attribute">background-color</span>: orange;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30%</span>;
}
<span class="hljs-selector-class">.container-flex2</span>  {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-wrap</span>: wrap;
    <span class="hljs-attribute">justify-content</span>: space-around;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container-flex2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5173;&#x952E;&#x70B9;&#xFF1A;&#x5229;&#x7528;&#x4E86;padding-top&#x548C;flex-wrap:wrap&#xFF0C;&#x5F53;&#x8BBE;&#x7F6E;background-color&#x65F6;&#xFF0C;&#x662F;&#x5305;&#x62EC;&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x4E2D;&#x7684;content&#x548C;padding&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x8BBE;&#x7F6E;height&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x7236;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x9AD8;&#x5EA6;&#xFF0C;&#x6240;&#x4EE5;&#x5B9A;&#x4E49;height:30%&#x662F;&#x6CA1;&#x6709;&#x7528;&#x7684;&#xFF0C;&#x4E14;&#x82E5;&#x60F3;&#x6BCF;&#x4E2A;block&#x90FD;&#x4E3A;&#x6B63;&#x65B9;&#x5F62;&#xFF0C;&#x6700;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;padding-top/padding-bottom&#xFF1A;a%&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x7684;&#x767E;&#x5206;&#x6BD4;&#x662F;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x7684;&#x767E;&#x5206;&#x6BD4;&#xFF0C;&#x800C;width&#x4E5F;&#x4E3A;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x7684;&#x767E;&#x5206;&#x6BD4;&#xFF0C;&#x6240;&#x4EE5;block&#x53EF;&#x4EE5;&#x6210;&#x4E3A;&#x6B63;&#x65B9;&#x5F62;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flex实现九宫格

## 原文链接
[https://segmentfault.com/a/1190000015951015](https://segmentfault.com/a/1190000015951015)

