---
title: '前端每日实战：83# 视频演示如何用纯 CSS 创作一个小球上台阶的动画' 
date: 2018-11-22 11:48:10
hidden: true
slug: msi0g50txqq
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdYQH?w=400&amp;h=302" src="https://static.alili.tech/img/bVbdYQH?w=400&amp;h=302" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/PBGJwL" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/PBGJwL</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/PBGJwL" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cDMyyHv" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cDMyyHv</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 5 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4EE3;&#x8868; 5 &#x4E2A;&#x53F0;&#x9636;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
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
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 7em;
    height: 5em;
    font-size: 40px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
}</code></pre><p>&#x753B;&#x51FA; 5 &#x4E2A;&#x53F0;&#x9636;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.loader span {
    width: 1em;
    height: 1em;
    background-color: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-between;
    <span class="hljs-attribute">align-items</span>: flex-end;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: white;
}</code></pre><p>&#x7528;&#x53D8;&#x91CF;&#x8BA9; 5 &#x4E2A;&#x53F0;&#x9636;&#x4ECE;&#x4F4E;&#x5230;&#x9AD8;&#x6392;&#x5E8F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    height: calc(var(--n) * 1em);
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
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--n) * <span class="hljs-number">1em</span>);
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
}</code></pre><p>&#x4E3A;&#x53F0;&#x9636;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x6392;&#x5E8F;&#x65B9;&#x5411;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: sort 5s infinite;
}

@keyframes sort {
    0%, 40%, 100% {
        height: calc(var(--n) * 1em);
    }

    50%, 90% {
        height: calc(5em - (var(--n) - 1) * 1em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: sort <span class="hljs-number">5s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> sort {
    0%, 40%, 100% {
        <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--n) * <span class="hljs-number">1em</span>);
    }

    50%, 90% {
        <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(5em - (var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">1em</span>);
    }
}</code></pre><p>&#x4E0B;&#x9762;&#x505A;&#x5C0F;&#x7403;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x7528;&#x4E86;&#x969C;&#x773C;&#x6CD5;&#xFF0C;&#x4F7F; 2 &#x4E2A;&#x540C;&#x8272;&#x5C0F;&#x7403;&#x7684;&#x4EA4;&#x66FF;&#x8FD0;&#x52A8;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x50CF; 1 &#x4E2A;&#x5C0F;&#x7403;&#x5728;&#x505A;&#x5F80;&#x590D;&#x8FD0;&#x52A8;&#x3002;</p><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA; 2 &#x4E2A;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before,
.loader::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: white;
    border-radius: 50%;
    bottom: 1em;
}

.loader::before {
    left: 0;
}

.loader::after {
    left: 6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">6em</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x8BA9;&#x5C0F;&#x7403;&#x5411;&#x4E0A;&#x8FD0;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before,
.loader::after {
    animation: climbing 5s infinite;
    visibility: hidden;
}

.loader::after {
    animation-delay: 2.5s;
}

@keyframes climbing {
    0% {
        bottom: 1em;
        visibility: visible;
    }

    10% {
        bottom: 2em;
    }

    20% {
        bottom: 3em;
    }

    30% {
        bottom: 4em;
    }

    40% {
        bottom: 5em;
    }

    50% {
        bottom: 1em;
    }

    50%, 100% {
        visibility: hidden;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: climbing <span class="hljs-number">5s</span> infinite;
    <span class="hljs-attribute">visibility</span>: hidden;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">2.5s</span>;
}

@<span class="hljs-keyword">keyframes</span> climbing {
    0% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">visibility</span>: visible;
    }

    10% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2em</span>;
    }

    20% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">3em</span>;
    }

    30% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">4em</span>;
    }

    40% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">5em</span>;
    }

    50% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
    }

    50%, 100% {
        <span class="hljs-attribute">visibility</span>: hidden;
    }
}</code></pre><p>&#x5728;&#x5411;&#x4E0A;&#x8FD0;&#x52A8;&#x7684;&#x540C;&#x65F6;&#x5411;&#x4E24;&#x4FA7;&#x8FD0;&#x52A8;&#xFF0C;&#x5F62;&#x6210;&#x4E0A;&#x53F0;&#x9636;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before {
    --direction: 1;
}

.loader::after {
    --direction: -1;
}

@keyframes climbing {
    0% {
        bottom: 1em;
        left: calc(3em - 2 * 1.5em * var(--direction));
        visibility: visible;
    }

    10% {
        bottom: 2em;
        left: calc(3em - 1 * 1.5em * var(--direction));
    }

    20% {
        bottom: 3em;
        left: calc(3em - 0 * 1.5em * var(--direction));
    }

    30% {
        bottom: 4em;
        left: calc(3em + 1 * 1.5em * var(--direction));
    }

    40% {
        bottom: 5em;
        left: calc(3em + 2 * 1.5em * var(--direction));
    }

    50% {
        bottom: 1em;
        left: calc(3em + 2 * 1.5em * var(--direction));
    }

    50%, 100% {
        visibility: hidden;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">--direction</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">--direction</span>: -<span class="hljs-number">1</span>;
}

@<span class="hljs-keyword">keyframes</span> climbing {
    0% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 2 * 1.5em * var(--direction));
        <span class="hljs-attribute">visibility</span>: visible;
    }

    10% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 1 * 1.5em * var(--direction));
    }

    20% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">3em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 0 * 1.5em * var(--direction));
    }

    30% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">4em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 1 * 1.5em * var(--direction));
    }

    40% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">5em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 2 * 1.5em * var(--direction));
    }

    50% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 2 * 1.5em * var(--direction));
    }

    50%, 100% {
        <span class="hljs-attribute">visibility</span>: hidden;
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x4E3A;&#x4E0A;&#x53F0;&#x9636;&#x7684;&#x52A8;&#x4F5C;&#x589E;&#x52A0;&#x62DF;&#x4EBA;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes climbing {
    0% {
        bottom: 1em;
        left: calc(3em - 2 * 1.5em * var(--direction));
        visibility: visible;
    }

    7% {
        bottom: calc(2em + 0.3em);
    }

    10% {
        bottom: 2em;
        left: calc(3em - 1 * 1.5em * var(--direction));
    }

    17% {
        bottom: calc(3em + 0.3em);
    }

    20% {
        bottom: 3em;
        left: calc(3em - 0 * 1.5em * var(--direction));
    }

    27% {
        bottom: calc(4em + 0.3em);
    }

    30% {
        bottom: 4em;
        left: calc(3em + 1 * 1.5em * var(--direction));
    }

    37% {
        bottom: calc(5em + 0.3em);
    }

    40% {
        bottom: 5em;
        left: calc(3em + 2 * 1.5em * var(--direction));
    }

    50% {
        bottom: 1em;
        left: calc(3em + 2 * 1.5em * var(--direction));
    }

    50%, 100% {
        visibility: hidden;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> climbing {
    0% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 2 * 1.5em * var(--direction));
        <span class="hljs-attribute">visibility</span>: visible;
    }

    7% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(2em + 0.3em);
    }

    10% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 1 * 1.5em * var(--direction));
    }

    17% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(3em + 0.3em);
    }

    20% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">3em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em - 0 * 1.5em * var(--direction));
    }

    27% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(4em + 0.3em);
    }

    30% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">4em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 1 * 1.5em * var(--direction));
    }

    37% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(5em + 0.3em);
    }

    40% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">5em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 2 * 1.5em * var(--direction));
    }

    50% {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(3em + 2 * 1.5em * var(--direction));
    }

    50%, 100% {
        <span class="hljs-attribute">visibility</span>: hidden;
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：83# 视频演示如何用纯 CSS 创作一个小球上台阶的动画

## 原文链接
[https://segmentfault.com/a/1190000015686159](https://segmentfault.com/a/1190000015686159)

