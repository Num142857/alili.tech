---
title: '前端每日实战：53# 视频演示如何用纯 CSS 创作一个文本淡入淡出的 loader 动画' 
date: 2018-11-27 2:30:13
hidden: true
slug: bb0l8pk1l6p
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfmNq?w=400&amp;h=307" src="https://static.alili.tech/img/bVbfmNq?w=400&amp;h=307" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/ERwpeG" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/ERwpeG</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/ERwpeG" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cED8KsK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cED8KsK</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x662F;&#x5305;&#x542B; 7 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;l&lt;/span&gt;
    &lt;span&gt;o&lt;/span&gt;
    &lt;span&gt;a&lt;/span&gt;
    &lt;span&gt;d&lt;/span&gt;
    &lt;span&gt;i&lt;/span&gt;
    &lt;span&gt;n&lt;/span&gt;
    &lt;span&gt;g&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>l<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>o<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>d<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>i<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>n<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>g<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 40em;
    height: 3em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    color: dodgerblue;
    font-size: 1.5em;
    text-transform: uppercase;
    font-family: sans-serif;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">color</span>: dodgerblue;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">font-family</span>: sans-serif;
}</code></pre><p>&#x7ED9;&#x6587;&#x5B57;&#x589E;&#x52A0;&#x6E10;&#x9690;&#x6E10;&#x663E;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: moving 2s linear infinite;
}

@keyframes moving {
    0% {
        filter: opacity(0);
    }

    33% {
        filter: opacity(1);
    }

    66% {
        filter: opacity(1);
    }

    100% {
        filter: opacity(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: moving <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> moving {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    33% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    66% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
}</code></pre><p>&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x589E;&#x5F3A;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation-delay: calc((var(--n) - 10) * 0.2s)
}

.loader span:nth-child(1) {
    --n: 1;
}

.loader span:nth-child(2) {
    --n: 2;
}

.loader span:nth-child(3) {
    --n: 3;
}

.loader span:nth-child(4) {
    --n: 4;
}

.loader span:nth-child(5) {
    --n: 5;
}

.loader span:nth-child(6) {
    --n: 6;
}

.loader span:nth-child(7) {
    --n: 7;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>((var(--n) - <span class="hljs-number">10</span>) * <span class="hljs-number">0.2s</span>)
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(7)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">7</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x6587;&#x5B57;&#x65CB;&#x8F6C;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: relative;
}

.loader span {
    position: absolute;
    height: 3em;
}

@keyframes moving {
    0% {
        filter: opacity(0);
        transform: rotate(-180deg);
    }

    33% {
        filter: opacity(1);
        transform: rotate(0deg);
    }

    66% {
        filter: opacity(1);
        transform: rotate(0deg);
    }

    100% {
        filter: opacity(0);
        transform: rotate(180deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
}

@<span class="hljs-keyword">keyframes</span> moving {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-180deg);
    }

    33% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    66% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x6587;&#x5B57;&#x79FB;&#x52A8;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes moving {
    0% {
        filter: opacity(0);
        transform: rotate(-180deg);
        left: 100%;
    }

    33% {
        filter: opacity(1);
        transform: rotate(0deg);
        left: 60%;
    }

    66% {
        filter: opacity(1);
        transform: rotate(0deg);
        left: 40%;
    }

    100% {
        filter: opacity(0);
        transform: rotate(180deg);
        left: 0;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> moving {
    0% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-180deg);
        <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
    }

    33% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        <span class="hljs-attribute">left</span>: <span class="hljs-number">60%</span>;
    }

    66% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        <span class="hljs-attribute">left</span>: <span class="hljs-number">40%</span>;
    }

    100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
}</code></pre><p>&#x589E;&#x52A0;&#x6587;&#x5B57;&#x53D8;&#x8272;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    animation: change-color 10s linear infinite;
}

@keyframes change-color {
    0% {
        color: dodgerblue;
    }

    20% {
        color: hotpink;
    }

    40% {
        color: gold;
    }

    60% {
        color: mediumpurple;
    }

    80% {
        color: lightgreen;
    }

    100% {
        color: dodgerblue;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">animation</span>: change-color <span class="hljs-number">10s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> change-color {
    0% {
        <span class="hljs-attribute">color</span>: dodgerblue;
    }

    20% {
        <span class="hljs-attribute">color</span>: hotpink;
    }

    40% {
        <span class="hljs-attribute">color</span>: gold;
    }

    60% {
        <span class="hljs-attribute">color</span>: mediumpurple;
    }

    80% {
        <span class="hljs-attribute">color</span>: lightgreen;
    }

    100% {
        <span class="hljs-attribute">color</span>: dodgerblue;
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x5728;&#x9875;&#x9762;&#x5916;&#x7684;&#x90E8;&#x5206;&#x9690;&#x85CF;&#x6389;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：53# 视频演示如何用纯 CSS 创作一个文本淡入淡出的 loader 动画

## 原文链接
[https://segmentfault.com/a/1190000015305861](https://segmentfault.com/a/1190000015305861)

