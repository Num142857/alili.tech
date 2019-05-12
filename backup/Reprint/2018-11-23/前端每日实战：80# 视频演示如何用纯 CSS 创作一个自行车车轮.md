---
title: '前端每日实战：80# 视频演示如何用纯 CSS 创作一个自行车车轮' 
date: 2018-11-23 2:30:10
hidden: true
slug: vwqj0gj29xf
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbdNMm?w=400&amp;h=301" src="https://static.alili.tech/img/bVbdNMm?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/XBXEPK" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/XBXEPK</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/XBXEPK" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cgkqnAz" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cgkqnAz</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 6 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;wheel&quot;&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
    &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wheel&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
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
    background-image: linear-gradient(#555, #222);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(#555, #222);
}</code></pre><p>&#x753B;&#x51FA;&#x8F6E;&#x5708;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel {
    width: 9em;
    height: 9em;
    font-size: 25px;
    border: 0.4em solid #777;
    border-radius: 50%;
    box-shadow: 0 0 0 0.5em #111;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.4em</span> solid <span class="hljs-number">#777</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">#111</span>;
}</code></pre><p>&#x5B9A;&#x4E49;&#x8F90;&#x6761;&#x7684;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wheel span {
    position: absolute;
    width: 8em;
    height: 1em;
    border: 0.1em solid;
    border-color: #ccc transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#ccc</span> transparent;
}</code></pre><p>&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF0C;&#x753B;&#x51FA;&#x591A;&#x6839;&#x5E45;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel span {
    transform: rotate(calc((var(--n) - 1) * 30deg));
}

.wheel span:nth-child(1) {
    --n: 1;
}

.wheel span:nth-child(2) {
    --n: 2;
}

.wheel span:nth-child(3) {
    --n: 3;
}

.wheel span:nth-child(4) {
    --n: 4;
}

.wheel span:nth-child(5) {
    --n: 5;
}

.wheel span:nth-child(6) {
    --n: 6;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc((var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">30deg</span>));
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
}</code></pre><p>&#x8BA9;&#x8F66;&#x8F6E;&#x8F6C;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel span {
    animation: run 4s linear infinite;
}

@keyframes run {
    to {
        transform: rotate(calc((var(--n) - 1) * 30deg + 360deg));
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: run <span class="hljs-number">4s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> run {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc((var(--n) - <span class="hljs-number">1</span>) * <span class="hljs-number">30deg</span> + <span class="hljs-number">360deg</span>));
    }
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x5730;&#x9762;&#x4E0A;&#x7684;&#x7EBF;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel {
    position: relative;
}

.wheel::before {
    content: &apos;&apos;;
    position: absolute;
    width: 15em;
    height: 0.2em;
    top: 11em;
    background-image: linear-gradient(
            to right,
            silver 0, silver 4em,
            transparent 4em, transparent 5em,
            silver 5em, silver 10em,
            transparent 10em, transparent 12em,
            silver 12em, silver 14em,
            transparent 14em, transparent 15em
        );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.wheel</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">11em</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(
            to right,
            silver 0, silver 4em,
            transparent 4em, transparent 5em,
            silver 5em, silver 10em,
            transparent 10em, transparent 12em,
            silver 12em, silver 14em,
            transparent 14em, transparent 15em
        );
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x5730;&#x9762;&#x4E0A;&#x7684;&#x7EBF;&#x6761;&#x52A8;&#x8D77;&#x6765;&#xFF0C;&#x5F62;&#x6210;&#x8F66;&#x8F6E;&#x5411;&#x524D;&#x8D70;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wheel::before {
    background-position: 15em;
    animation: run2 6s linear infinite;
}

@keyframes run2 {
    to {
        background-position: -15em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wheel</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">animation</span>: run2 <span class="hljs-number">6s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> run2 {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">15em</span>;
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：80# 视频演示如何用纯 CSS 创作一个自行车车轮

## 原文链接
[https://segmentfault.com/a/1190000015643606](https://segmentfault.com/a/1190000015643606)

