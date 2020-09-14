---
title: '前端每日实战：62# 视频演示如何用纯 CSS 创作一只蒸锅' 
date: 2018-11-26 2:30:09
hidden: true
slug: yy4q0b2tage
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfmOf?w=400&amp;h=307" src="https://static.alili.tech/img/bVbfmOf?w=400&amp;h=307" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/YvOzNy" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/YvOzNy</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/YvOzNy" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cg46aSG" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cg46aSG</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x8868;&#x793A;&#x9505;&#x76D6;&#x548C;&#x9505;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;steamer&quot;&gt;
    &lt;div class=&quot;lid&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;pot&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;steamer&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;lid&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pot&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right bottom, violet, midnightblue);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right bottom, violet, midnightblue);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".steamer {
    width: 30em;
    height: 30em;
    background-color: snow;
    font-size: 10px;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.steamer</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">background-color</span>: snow;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x9505;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".steamer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pot {
    position: relative;
    width: 16em;
    height: 12em;
    background: darkslateblue;
    border-radius: 0.5em 0.5em 6.5em 6.5em;
    border-right: 1.5em solid midnightblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.steamer</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.pot</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">background</span>: darkslateblue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">6.5em</span> <span class="hljs-number">6.5em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1.5em</span> solid midnightblue;
}</code></pre><p>&#x753B;&#x51FA;&#x9505;&#x628A;&#x624B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".steamer {
    z-index: 1;
}

.pot::before {
    content: &apos;&apos;;
    position: absolute;
    width: 27em;
    height: 2.5em;
    background-color: tomato;
    left: -4.75em;
    top: 2em;
    z-index: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.steamer</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.pot</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">27em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">background-color</span>: tomato;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">4.75em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x9505;&#x76D6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lid {
    width: 17em;
    height: 6em;
    background-color: gold;
    position: relative;
    border-radius: 6em 6em 0 0;
    border-right: 1.5em solid goldenrod;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lid</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">17em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">background-color</span>: gold;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6em</span> <span class="hljs-number">6em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1.5em</span> solid goldenrod;
</code></pre><p>&#x753B;&#x51FA;&#x9505;&#x76D6;&#x4E0A;&#x7684;&#x94AE;&#x6263;&#x628A;&#x624B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lid::before {
    content: &apos;&apos;;
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: tomato;
    border-radius: 50%;
    left: 7em;
    top: -2.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lid</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">background-color</span>: tomato;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2.5em</span>;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6DA6;&#x8272;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x4E3A;&#x9505;&#x4F53;&#x589E;&#x52A0;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pot::after {
    content: &apos;&apos;;
    position: absolute;
    width: 8em;
    height: 8em;
    border: 0.6em solid transparent;
    border-radius: 50%;
    border-left-color: white;
    transform: rotate(-60deg);
    top: 1em;
    left: 2em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pot</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.6em</span> solid transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: white;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-60deg);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2em</span>;
}</code></pre><p>&#x4E3A;&#x9505;&#x76D6;&#x589E;&#x52A0;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lid::after {
    content: &apos;&apos;;
    position: absolute;
    width: 7em;
    height: 7em;
    border: 0.6em solid transparent;
    border-radius: 50%;
    border-left-color: white;
    transform: rotate(40deg);
    top: 0.6em;
    left: 2.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lid</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.6em</span> solid transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: white;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(40deg);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.6em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2.5em</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x589E;&#x52A0;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".lid {
    transform: translateY(-0.5em);
    animation: animate 1s infinite alternate;
}

@keyframes animate {
    to {
        transform: translateY(0.5em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.lid</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-0.5em);
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">1s</span> infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> animate {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0.5em);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：62# 视频演示如何用纯 CSS 创作一只蒸锅

## 原文链接
[https://segmentfault.com/a/1190000015389338](https://segmentfault.com/a/1190000015389338)

