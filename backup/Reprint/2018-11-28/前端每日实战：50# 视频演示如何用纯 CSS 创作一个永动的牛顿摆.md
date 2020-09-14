---
title: '前端每日实战：50# 视频演示如何用纯 CSS 创作一个永动的牛顿摆' 
date: 2018-11-28 2:30:11
hidden: true
slug: i4jc0nznm7s
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfmLf?w=400&amp;h=304" src="https://static.alili.tech/img/bVbfmLf?w=400&amp;h=304" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/qKmGaJ" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qKmGaJ</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qKmGaJ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cPpkyUK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cPpkyUK</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49;dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 5 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;
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
    background-color: beige;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: beige;
}</code></pre><p>&#x753B;&#x51FA;&#x5C0F;&#x7403;&#x7684;&#x6302;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: absolute;
    display: flex;
    width: 12em;
    font-size: 10px;
    justify-content: space-between;
}

.loader span {
    position: relative;
    width: 0.2em;
    height: 10em;
    background-color: black;
    transform-origin: top;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">justify-content</span>: space-between;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">transform-origin</span>: top;
}</code></pre><p>&#x753B;&#x51FA;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span::before {
    content: &apos;&apos;;
    position: absolute;
    bottom: 0;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background-color: black;
    left: -1.4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">1.4em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x725B;&#x987F;&#x6446;&#x7684;&#x6302;&#x67B6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    border-style: solid;
    border-color: black;
    border-width: 0.4em 0.1em 4em 0.1em;
    padding: 0 4em 2em 4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: black;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0.4em</span> <span class="hljs-number">0.1em</span> <span class="hljs-number">4em</span> <span class="hljs-number">0.1em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">4em</span> <span class="hljs-number">2em</span> <span class="hljs-number">4em</span>;
}</code></pre><p>&#x8BA9;&#x6700;&#x5DE6;&#x4FA7;&#x7684;&#x6446;&#x7EBF;&#x6643;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:first-child {
    animation: moving-up 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) infinite alternate;
    --direction: 1;
}

@keyframes moving-up {
    0%{
        transform: rotate(0deg);
    }

    50%{
        transform: rotate(0deg);
    }

    100%{
        transform: rotate(calc(45deg * var(--direction)));
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:first-child</span> {
    <span class="hljs-attribute">animation</span>: moving-up <span class="hljs-number">0.75s</span> <span class="hljs-built_in">cubic-bezier</span>(0.215, 0.61, 0.355, 1) infinite alternate;
    <span class="hljs-attribute">--direction</span>: <span class="hljs-number">1</span>;
}

@<span class="hljs-keyword">keyframes</span> moving-up {
    0%{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    50%{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    100%{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(calc(45deg * var(--direction)));
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x6700;&#x53F3;&#x4FA7;&#x7684;&#x6446;&#x7EBF;&#x6643;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:last-child {
    animation: moving-up 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) infinite alternate-reverse;
    --direction: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:last-child</span> {
    <span class="hljs-attribute">animation</span>: moving-up <span class="hljs-number">0.75s</span> <span class="hljs-built_in">cubic-bezier</span>(0.215, 0.61, 0.355, 1) infinite alternate-reverse;
    <span class="hljs-attribute">--direction</span>: -<span class="hljs-number">1</span>;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：50# 视频演示如何用纯 CSS 创作一个永动的牛顿摆

## 原文链接
[https://segmentfault.com/a/1190000015270808](https://segmentfault.com/a/1190000015270808)

