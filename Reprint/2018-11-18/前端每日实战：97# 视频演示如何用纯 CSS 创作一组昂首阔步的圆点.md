---
title: '前端每日实战：97# 视频演示如何用纯 CSS 创作一组昂首阔步的圆点' 
date: 2018-11-18 3:32:07
hidden: true
slug: y3g8pubww6
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbeKgO?w=400&amp;h=300" src="https://static.alili.tech/img/bVbeKgO?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/ejrMKe" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/ejrMKe</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/ejrMKe" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/caw7yTv" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/caw7yTv</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 5 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x4EE3;&#x8868; 1 &#x4E2A;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
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
    background: radial-gradient(circle at center, sienna, maroon);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center, sienna, maroon);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 6em;
    height: 1em;
    font-size: 40px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: relative;
}

.loader span {
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: white;
    border-radius: 50%;
    left: 5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">5em</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x5C0F;&#x7403;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x79FB;&#x52A8;&#x4EE5;&#x53CA;&#x4ECE;&#x5DE6;&#x4FA7;&#x8FD4;&#x56DE;&#x5230;&#x53F3;&#x4FA7;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --duration: 5s;
}

.loader span {
    animation: 
        walk linear infinite;
    animation-duration: var(--duration);
}

@keyframes walk {
    0%, 95%, 100% {
        left: 5em;
    }

    80%, 85% {
        left: 0;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--duration</span>: <span class="hljs-number">5s</span>;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: 
        walk linear infinite;
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-built_in">var</span>(--duration);
}

@<span class="hljs-keyword">keyframes</span> walk {
    0%, 95%, 100% {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">5em</span>;
    }

    80%, 85% {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
}</code></pre><p>&#x518D;&#x589E;&#x52A0;&#x5C0F;&#x7403;&#x5728;&#x6700;&#x5DE6;&#x7AEF;&#x5411;&#x4E0A;&#x8DF3;&#x8D77;&#x548C;&#x5728;&#x6700;&#x53F3;&#x7AEF;&#x5411;&#x4E0B;&#x843D;&#x4E0B;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: 
        walk linear infinite,
        jump linear infinite;
}

@keyframes jump {
    80%, 100% {
        top: 0;
    }

    85%, 95% {
        top: -1em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: 
        walk linear infinite,
        jump linear infinite;
}

@<span class="hljs-keyword">keyframes</span> jump {
    80%, 100% {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    85%, 95% {
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">1em</span>;
    }
}</code></pre><p>&#x518D;&#x589E;&#x52A0;&#x5C0F;&#x7403;&#x5728;&#x4ECE;&#x5DE6;&#x4FA7;&#x8FD4;&#x56DE;&#x5230;&#x53F3;&#x4FA7;&#x65F6;&#xFF0C;&#x56E0;&#x8FD0;&#x52A8;&#x5F97;&#x5FEB;&#x800C;&#x7A0D;&#x88AB;&#x538B;&#x6241;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: 
        walk linear infinite,
        jump linear infinite,
        squash linear infinite;
}

@keyframes squash {
    80%, 100% {
        width: 1em;
        height: 1em;
    }

    90% {
        width: 2em;
        height: 0.8em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: 
        walk linear infinite,
        jump linear infinite,
        squash linear infinite;
}

@<span class="hljs-keyword">keyframes</span> squash {
    80%, 100% {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    }

    90% {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0.8em</span>;
    }
}</code></pre><p>&#x4E3A; 5 &#x4E2A;&#x5C0F;&#x7403;&#x5206;&#x522B;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:nth-child(1) {
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
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
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
}</code></pre><p>&#x58F0;&#x660E;&#x5C0F;&#x7403;&#x7684;&#x6570;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    --dots: 5;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">--dots</span>: <span class="hljs-number">5</span>;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation-delay: calc(var(--n) * var(--duration) / var(--dots) * -1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(var(--n) * <span class="hljs-built_in">var</span>(--duration) / <span class="hljs-built_in">var</span>(--dots) * -<span class="hljs-number">1</span>);
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x70B9;&#x7684;&#x5C3A;&#x5BF8;&#x6539;&#x5C0F;&#x4E00;&#x4E9B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    font-size: 20px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：97# 视频演示如何用纯 CSS 创作一组昂首阔步的圆点

## 原文链接
[https://segmentfault.com/a/1190000015868445](https://segmentfault.com/a/1190000015868445)

