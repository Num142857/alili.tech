---
title: '前端每日实战：99# 视频演示如何用纯 CSS 创作一个过山车 loader' 
date: 2018-11-18 2:30:10
hidden: true
slug: 3yqnxfp4m3
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeYYy?w=400&amp;h=300" src="https://static.alili.tech/img/bVbeYYy?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/KBxYZg/" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/KBxYZg/</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/KBxYZg/" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cagbkSL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cagbkSL</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4EE3;&#x8868; 3 &#x4E2A;&#x5706;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, silver, teal);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, silver, teal);
}</code></pre><p>&#x5B9A;&#x4E49;&#x6469;&#x5929;&#x8F6E;&#x7684;&#x76F4;&#x5F84;&#xFF0C;&#x5176;&#x4ED6;&#x957F;&#x5EA6;&#x5747;&#x4EE5;&#x6B64;&#x503C;&#x4E3A;&#x57FA;&#x672C;&#x5C3A;&#x5EA6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --diameter: 10em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--diameter</span>: <span class="hljs-number">10em</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF0C;&#x5BBD;&#x662F;&#x9AD8;&#x7684;2&#x500D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --width: calc(var(--diameter) * 2);
    width: var(--width);
    height: var(--diameter);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--width</span>: <span class="hljs-built_in">calc</span>(var(--diameter) * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--width);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--diameter);
}</code></pre><p>&#x5B9A;&#x4E49;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x5171;&#x4EAB;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: relative;
}

.loader::before,
.loader::after {
    content: &apos;&apos;;
    position: absolute;
    bottom: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5E95;&#x90E8;&#x7684;&#x8F68;&#x9053;&#xFF0C;&#x540C;&#x65F6;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x7EBF;&#x7C97;&#x7EC6;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --stroke-width: calc(var(--diameter) / 40);
    color: white;
}

.loader::before {
    width: inherit;
    height: var(--stroke-width);
    background-color: currentColor;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--stroke-width</span>: <span class="hljs-built_in">calc</span>(var(--diameter) / <span class="hljs-number">40</span>);
    <span class="hljs-attribute">color</span>: white;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">width</span>: inherit;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--stroke-width);
    <span class="hljs-attribute">background-color</span>: currentColor;
}</code></pre><p>&#x753B;&#x51FA;&#x4E2D;&#x90E8;&#x7684;&#x5706;&#x5F62;&#x8F68;&#x9053;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::after {
    box-sizing: border-box;
    width: var(--diameter);
    height: var(--diameter);
    border: var(--stroke-width) solid;
    border-radius: 50%;
    left: 25%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--diameter);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--diameter);
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--stroke-width) solid;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">25%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x4E00;&#x4E2A;&#x5706;&#x70B9;&#xFF0C;&#x540C;&#x65F6;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x5706;&#x70B9;&#x76F4;&#x5F84;&#x7684;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --dot-diameter: calc(var(--diameter) / 10);
}

.loader span {
    position: absolute;
    width: var(--dot-diameter);
    height: var(--dot-diameter);
    background-color: currentColor;
    border-radius: 50%;
    bottom: var(--stroke-width);
    left: calc((var(--width) - var(--dot-diameter)) / 2);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--dot-diameter</span>: <span class="hljs-built_in">calc</span>(var(--diameter) / <span class="hljs-number">10</span>);
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--dot-diameter);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--dot-diameter);
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">var</span>(--stroke-width);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((var(--width) - <span class="hljs-built_in">var</span>(--dot-diameter)) / <span class="hljs-number">2</span>);
}</code></pre><p>&#x4E3A;&#x5706;&#x70B9;&#x589E;&#x52A0;&#x6CBF;&#x5706;&#x5F62;&#x8F68;&#x9053;&#x65CB;&#x8F6C;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation:
        rotating 2s linear infinite;
    --vertical-center: calc((var(--diameter) / 2 - var(--stroke-width) - var(--dot-diameter)) * -1);
    transform-origin: 50% var(--vertical-center);
}

@keyframes rotating {
    0%, 10% {
        transform: rotate(0deg);
    }

    60%, 100% {
        transform: rotate(-1turn);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>:
        rotating <span class="hljs-number">2s</span> linear infinite;
    <span class="hljs-attribute">--vertical-center</span>: <span class="hljs-built_in">calc</span>((var(--diameter) / <span class="hljs-number">2</span> - <span class="hljs-built_in">var</span>(--stroke-width) - <span class="hljs-built_in">var</span>(--dot-diameter)) * -<span class="hljs-number">1</span>);
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-built_in">var</span>(--vertical-center);
}

@<span class="hljs-keyword">keyframes</span> rotating {
    0%, 10% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    60%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-1turn);
    }
}</code></pre><p>&#x4E3A;&#x5706;&#x70B9;&#x589E;&#x52A0;&#x79FB;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation:
        run 2s linear infinite,
        rotating 2s linear infinite;
}

@keyframes run {
    0% {
        left: calc(var(--dot-diameter) * -1);
    }

    10%, 60% {
        left: calc((var(--width) - var(--dot-diameter)) / 2);
    }

    70%, 100% {
        left: calc(var(--width));
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>:
        run <span class="hljs-number">2s</span> linear infinite,
        rotating <span class="hljs-number">2s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> run {
    0% {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(var(--dot-diameter) * -<span class="hljs-number">1</span>);
    }

    10%, 60% {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>((var(--width) - <span class="hljs-built_in">var</span>(--dot-diameter)) / <span class="hljs-number">2</span>);
    }

    70%, 100% {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(var(--width));
    }
}</code></pre><p>&#x4E3A;&#x53E6;&#x5916; 2 &#x4E2A;&#x5706;&#x70B9;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x4F7F; 3 &#x4E2A;&#x5706;&#x70B9;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x662F;&#x7D27;&#x6328;&#x7740;&#x7684; 3 &#x4E2A;&#x8F66;&#x53A2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:nth-child(1) {
    animation-delay: 0.075s;
}

.loader span:nth-child(2) {
    animation-delay: 0.15s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.075s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.15s</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：99# 视频演示如何用纯 CSS 创作一个过山车 loader

## 原文链接
[https://segmentfault.com/a/1190000015924973](https://segmentfault.com/a/1190000015924973)

