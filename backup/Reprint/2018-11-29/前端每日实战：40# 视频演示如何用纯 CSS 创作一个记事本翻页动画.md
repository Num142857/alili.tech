---
title: '前端每日实战：40# 视频演示如何用纯 CSS 创作一个记事本翻页动画' 
date: 2018-11-29 9:27:39
hidden: true
slug: tx5l42cdszb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWD5?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWD5?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/qKOPGw" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qKOPGw</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qKOPGw" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/c6GV2Ay" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c6GV2Ay</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x4E00;&#x4E2A; book &#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x4E2A; page &#x5BB9;&#x5668;&#xFF0C;page &#x4E2D;&#x518D;&#x5305;&#x542B; 5 &#x4E2A; &lt;span&gt;&#xFF0C;page &#x7528;&#x4E8E;&#x7ED8;&#x5236;&#x4E66;&#x9875;&#xFF0C;&lt;span&gt; &#x7528;&#x4E8E;&#x7ED8;&#x5236;&#x7B14;&#x5212;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;book&quot;&gt;
        &lt;div class=&quot;page&quot;&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;book&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;page&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x91CD;&#x5B9A;&#x4E49;&#x76D2;&#x6A21;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    box-sizing: border-box;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">* {
    <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x4E66;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".book {
    --sw: 0.3em; /* stroke width */
    width: 15em;
    height: 10em;
    background-color: white;
    border: var(--sw) solid cadetblue;
    border-radius: var(--sw);
    font-size: 20px;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.book</span> {
    <span class="hljs-attribute">--sw</span>: <span class="hljs-number">0.3em</span>; <span class="hljs-comment">/* stroke width */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border</span>: <span class="hljs-built_in">var</span>(--sw) solid cadetblue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--sw);
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x4E66;&#x9875;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".book {
    position: relative;
}

.book .page {
    height: inherit;
    width: calc(50% + var(--sw) + var(--sw) / 2);
    background-color: inherit;
    border: inherit;
    border-radius: inherit;
    position: absolute;
    top: calc(-1 * var(--sw));
    right: calc(-1 * var(--sw));
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.book</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> {
    <span class="hljs-attribute">height</span>: inherit;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(50% + var(--sw) + <span class="hljs-built_in">var</span>(--sw) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">background-color</span>: inherit;
    <span class="hljs-attribute">border</span>: inherit;
    <span class="hljs-attribute">border-radius</span>: inherit;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(-1 * var(--sw));
    <span class="hljs-attribute">right</span>: <span class="hljs-built_in">calc</span>(-1 * var(--sw));
}</code></pre>
<p>&#x7ED8;&#x5236;&#x4E66;&#x9875;&#x4E0A;&#x7684;&#x7B14;&#x5212;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".book .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8% 5%;
}

.book .page span {
    display: block;
    width: 100%;
    border-top: var(--sw) solid cadetblue;
    border-radius: inherit;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: space-between;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">8%</span> <span class="hljs-number">5%</span>;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-built_in">var</span>(--sw) solid cadetblue;
    <span class="hljs-attribute">border-radius</span>: inherit;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x7B14;&#x5212;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x4F9D;&#x6B21;&#x753B;&#x51FA; 5 &#x4E2A;&#x7B14;&#x5212;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".book .page span {
    animation: 4s linear infinite;
    transform-origin: left;
    transform: scaleX(0);
}

.book .page span:nth-child(1) {
    animation-name: stroke-1;
}

.book .page span:nth-child(2) {
    animation-name: stroke-2;
}

.book .page span:nth-child(3) {
    animation-name: stroke-3;
}

.book .page span:nth-child(4) {
    animation-name: stroke-4;
}

.book .page span:nth-child(5) {
    animation-name: stroke-5;
}

@keyframes stroke-1 {
    0% {
        transform: scaleX(0);
    }

    10%, 100% {
        transform: scaleX(1);
    }
}

@keyframes stroke-2 {
    10% {
        transform: scaleX(0);
    }

    20%, 100% {
        transform: scaleX(1);
    }
}

@keyframes stroke-3 {
    20% {
        transform: scaleX(0);
    }

    30%, 100% {
        transform: scaleX(1);
    }
}

@keyframes stroke-4 {
    30% {
        transform: scaleX(0);
    }

    40%, 100% {
        transform: scaleX(1);
    }
}

@keyframes stroke-5 {
    40% {
        transform: scaleX(0);
    }

    50%, 100% {
        transform: scaleX(1);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: <span class="hljs-number">4s</span> linear infinite;
    <span class="hljs-attribute">transform-origin</span>: left;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">animation-name</span>: stroke-<span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-name</span>: stroke-<span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">animation-name</span>: stroke-<span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">animation-name</span>: stroke-<span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">animation-name</span>: stroke-<span class="hljs-number">5</span>;
}

@<span class="hljs-keyword">keyframes</span> stroke-<span class="hljs-number">1</span> {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
    }

    10%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}

@<span class="hljs-keyword">keyframes</span> stroke-<span class="hljs-number">2</span> {
    10% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
    }

    20%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}

@<span class="hljs-keyword">keyframes</span> stroke-<span class="hljs-number">3</span> {
    20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
    }

    30%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}

@<span class="hljs-keyword">keyframes</span> stroke-<span class="hljs-number">4</span> {
    30% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
    }

    40%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}

@<span class="hljs-keyword">keyframes</span> stroke-<span class="hljs-number">5</span> {
    40% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(0);
    }

    50%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleX</span>(1);
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x5B9A;&#x4E49;&#x4E66;&#x9875;&#x7FFB;&#x52A8;&#x7684;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".book .page {
    animation: flip 4s linear infinite;
    transform-origin: left;
    transform-style: preserve-3d;
}

@keyframes flip {
    55% {
        transform: rotateY(0) translateX(0) skewY(0);
    }

    70% {
        transform: rotateY(-90deg) translateX(calc(-1 * var(--sw) / 2)) skewY(-20deg);
    }

    80%, 100% {
        transform: rotateY(-180deg) translateX(calc(-1 * var(--sw))) skewY(0);
    }
}

.book .page span {
    backface-visibility: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> {
    <span class="hljs-attribute">animation</span>: flip <span class="hljs-number">4s</span> linear infinite;
    <span class="hljs-attribute">transform-origin</span>: left;
    <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
}

@<span class="hljs-keyword">keyframes</span> flip {
    55% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0) <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">skewY</span>(0);
    }

    70% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-90deg) <span class="hljs-built_in">translateX</span>(calc(-1 * var(--sw) / <span class="hljs-number">2</span>)) <span class="hljs-built_in">skewY</span>(-20deg);
    }

    80%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(-180deg) <span class="hljs-built_in">translateX</span>(calc(-1 * var(--sw))) <span class="hljs-built_in">skewY</span>(0);
    }
}

<span class="hljs-selector-class">.book</span> <span class="hljs-selector-class">.page</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">backface-visibility</span>: hidden;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：40# 视频演示如何用纯 CSS 创作一个记事本翻页动画

## 原文链接
[https://segmentfault.com/a/1190000015142453](https://segmentfault.com/a/1190000015142453)

