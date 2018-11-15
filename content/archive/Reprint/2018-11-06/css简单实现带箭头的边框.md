---
title: css简单实现带箭头的边框
hidden: true
categories: reprint
slug: ddb6ae64
date: 2018-11-06 15:28:31
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x5730;&#x5740; <a href="https://tianshengjie.cn/article/6" rel="nofollow noreferrer" target="_blank">https://tianshengjie.cn/artic...</a></blockquote><h2 id="articleHeader0">css&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x5E26;&#x7BAD;&#x5934;&#x7684;&#x8FB9;&#x6846;</h2><h3 id="articleHeader1">&#x666E;&#x901A;&#x8FB9;&#x6846;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .border {
        width: 100px;
        height: 50px;
        border: 1px solid red;
    }
&lt;/style&gt;
&lt;div class=&quot;border&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.border</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbhBts?w=260&amp;h=136" src="https://static.alili.tech/img/bVbhBts?w=260&amp;h=136" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">&#x5B9E;&#x73B0;&#x7531;&#x56DB;&#x4E2A;&#x4E09;&#x89D2;&#x5F62;&#x7EC4;&#x6210;&#x7684;&#x6B63;&#x65B9;&#x5F62;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .triangle {
        width: 0;
        height: 0;
        border: 100px solid red;
        border-right-color: green;
        border-left-color: blue;
        border-top-color: black;
    }
&lt;/style&gt;
&lt;div class=&quot;triangle&quot;&gt;&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.triangle</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">100px</span> solid red;
        <span class="hljs-attribute">border-right-color</span>: green;
        <span class="hljs-attribute">border-left-color</span>: blue;
        <span class="hljs-attribute">border-top-color</span>: black;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;triangle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhBtB?w=414&amp;h=430" src="https://static.alili.tech/img/bVbhBtB?w=414&amp;h=430" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">&#x5411;&#x4E0B;&#x4E09;&#x89D2;&#x5F62;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .triangle-bottom {
        width: 0;
        height: 0;
        border: 100px solid transparent;
        border-top-color: red;
    }
&lt;/style&gt;
&lt;div class=&quot;triangle-bottom&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.triangle-bottom</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">100px</span> solid transparent;
        <span class="hljs-attribute">border-top-color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;triangle-bottom&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C06;&#x5DE6;&#x53F3;&#x4E0B;&#x8FB9;&#x989C;&#x8272;&#x8BBE;&#x7F6E;&#x4E3A;&#x900F;&#x660E; transparent&#xFF0C;&#x5F97;&#x5230;&#x5411;&#x4E0B;&#x7684;&#x7BAD;&#x5934;</p><p><span class="img-wrap"><img data-src="/img/bVbhBtK?w=426&amp;h=236" src="https://static.alili.tech/img/bVbhBtK?w=426&amp;h=236" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader4">&#x5C06;&#x4E09;&#x89D2;&#x5F62;&#x653E;&#x5165;&#x8FB9;&#x6846;&#x4E2D;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .border-triangle {
        width: 100px;
        height: 50px;
        border: 1px solid red;
        position: relative;
    }

    .border-triangle:before {
        content: &quot;&quot;;
        position: absolute;
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-top-color: red;
        left: 50%;
        margin-left: -4px;
        bottom: -8px;
    }
&lt;/style&gt;
&lt;div class=&quot;border-triangle&quot;&gt;&lt;/div&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.border-triangle</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-class">.border-triangle</span><span class="hljs-selector-pseudo">:before</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid transparent;
        <span class="hljs-attribute">border-top-color</span>: red;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">4px</span>;
        <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">8px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-triangle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</code></pre><p>&#x5C06;&#x4E09;&#x89D2;&#x5F62;&#x8BBE;&#x7F6E;&#x4E3A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x5229;&#x7528;margin-left&#x548C;left &#x5B9A;&#x4F4D;&#x5230;&#x5143;&#x7D20;&#x4E2D;&#x95F4;&#xFF0C;bottom&#x8BBE;&#x7F6E;-8px&#xFF0C;&#x9760;&#x8FD1;&#x8FB9;&#x6846;&#x5E95;&#x90E8;&#x5C45;&#x4E2D;</p><p><span class="img-wrap"><img data-src="/img/bVbhBtS?w=244&amp;h=156" src="https://static.alili.tech/img/bVbhBtS?w=244&amp;h=156" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader5">&#x5E26;&#x7BAD;&#x5934;&#x7684;&#x8FB9;&#x6846;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    .border-triangle-bottom {
        width: 100px;
        height: 30px;
        border: 1px solid #1d9cd6;
        position: relative;
        border-radius: 4px;
    }

    .border-triangle-bottom:after,
    .border-triangle-bottom:before {
        content: &quot;&quot;;
        position: absolute;
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-top-color: #1d9cd6;
        left: 50%;
        margin-left: -4px;
        bottom: -8px;
    }

    .border-triangle-bottom:after {
        border-top-color: #fff;
        bottom: -7px;
    }
&lt;/style&gt;
&lt;div class=&quot;border-triangle-bottom&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.border-triangle-bottom</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#1d9cd6</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    }

    <span class="hljs-selector-class">.border-triangle-bottom</span><span class="hljs-selector-pseudo">:after</span>,
    <span class="hljs-selector-class">.border-triangle-bottom</span><span class="hljs-selector-pseudo">:before</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid transparent;
        <span class="hljs-attribute">border-top-color</span>: <span class="hljs-number">#1d9cd6</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">4px</span>;
        <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">8px</span>;
    }

    <span class="hljs-selector-class">.border-triangle-bottom</span><span class="hljs-selector-pseudo">:after</span> {
        <span class="hljs-attribute">border-top-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">7px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-triangle-bottom&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C06;&#x8FB9;&#x6846;&#x989C;&#x8272;&#x6362;&#x6210;&#x597D;&#x770B;&#x7684;&#x84DD;&#x8272;&#xFF0C;&#x5C06;before&#x548C;after&#x4F2A;&#x5143;&#x7D20;&#x90FD;&#x8BBE;&#x7F6E;&#x4E3A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x5B9A;&#x4F4D;&#x5230;&#x8FB9;&#x6846;&#x5E95;&#x90E8;&#x5267;&#x4E2D;&#xFF0C;&#x5C06;after&#x4F2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x6210;&#x767D;&#x8272;&#xFF0C;&#x5E95;&#x90E8;&#x504F;&#x79FB;&#x91CF;&#x5927;&#x4E8E;before 1px&#xFF0C;&#x906E;&#x4F4F;&#x4E09;&#x89D2;&#x5F62;&#x5E95;&#x90E8;&#x7684;&#x989C;&#x8272;&#x3002;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x597D;&#x770B;&#x7684;&#x7BAD;&#x5934;&#x8FB9;&#x6846;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;</p><p><span class="img-wrap"><img data-src="/img/bVbhBuQ?w=250&amp;h=118" src="https://static.alili.tech/img/bVbhBuQ?w=250&amp;h=118" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css简单实现带箭头的边框

## 原文链接
[https://segmentfault.com/a/1190000016549360](https://segmentfault.com/a/1190000016549360)

