---
title: '前端每日实战：67# 视频演示如何用纯 CSS 创作单元素点阵 loader' 
date: 2018-11-25 2:30:07
hidden: true
slug: b1lu5arf7yi
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcXWQ?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcXWQ?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;<br><a href="https://codepen.io/comehope/pen/YvBvBr" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/YvBvBr</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/YvBvBr" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cwE7NCm" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cwE7NCm</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(darkgreen 30%, forestgreen);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(darkgreen 30%, forestgreen);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 10em;
    height: 10em;
    font-size: 20px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre><p>&#x7528; box-shadow &#x753B;&#x51FA; 2 &#x7EC4;&#x70B9;&#x9635;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before,
.loader::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: currentColor;
    box-shadow:
        0 0, 2em 0, 4em 0, 6em 0,
        0 2em, 2em 2em, 4em 2em, 6em 2em,
        0 4em, 2em 4em, 4em 4em, 6em 4em,
        0 6em, 2em 6em, 4em 6em, 6em 6em;
    border-radius: 50%;
}

.loader::before {
    color: gold;
}

.loader::after {
    color: dodgerblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">box-shadow</span>:
        <span class="hljs-number">0</span> <span class="hljs-number">0</span>, <span class="hljs-number">2em</span> <span class="hljs-number">0</span>, <span class="hljs-number">4em</span> <span class="hljs-number">0</span>, <span class="hljs-number">6em</span> <span class="hljs-number">0</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">2em</span>, <span class="hljs-number">2em</span> <span class="hljs-number">2em</span>, <span class="hljs-number">4em</span> <span class="hljs-number">2em</span>, <span class="hljs-number">6em</span> <span class="hljs-number">2em</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">4em</span>, <span class="hljs-number">2em</span> <span class="hljs-number">4em</span>, <span class="hljs-number">4em</span> <span class="hljs-number">4em</span>, <span class="hljs-number">6em</span> <span class="hljs-number">4em</span>,
        <span class="hljs-number">0</span> <span class="hljs-number">6em</span>, <span class="hljs-number">2em</span> <span class="hljs-number">6em</span>, <span class="hljs-number">4em</span> <span class="hljs-number">6em</span>, <span class="hljs-number">6em</span> <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">color</span>: gold;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">color</span>: dodgerblue;
}</code></pre><p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes round {
    0% {
        transform: translateX(0) translateY(0);
    }

    25% {
        transform: translateX(3em) translateY(0);
    }

    50% {
        transform: translateX(3em) translateY(3em);
    }

    75% {
        transform: translateX(0) translateY(3em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> round {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">translateY</span>(0);
    }

    25% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">translateY</span>(0);
    }

    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">translateY</span>(3em);
    }

    75% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">translateY</span>(3em);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5E94;&#x7528;&#x5230;&#x70B9;&#x9635;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before,
.loader::after {
    animation: round 2s ease infinite;
}

.loader::after {
    animation-delay: -1s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: round <span class="hljs-number">2s</span> ease infinite;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">1s</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：67# 视频演示如何用纯 CSS 创作单元素点阵 loader

## 原文链接
[https://segmentfault.com/a/1190000015444368](https://segmentfault.com/a/1190000015444368)

