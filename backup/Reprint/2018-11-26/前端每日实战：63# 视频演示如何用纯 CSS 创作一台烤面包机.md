---
title: '前端每日实战：63# 视频演示如何用纯 CSS 创作一台烤面包机' 
date: 2018-11-26 2:30:09
hidden: true
slug: wg85z7ev7v
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbcL0M?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcL0M?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/OEBJRN" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/OEBJRN</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/OEBJRN" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c6bkqT2" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c6bkqT2</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 5 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x673A;&#x4F53;&#x3001;&#x6309;&#x94AE;&#x3001;&#x652F;&#x817F;&#x3001;&#x624B;&#x67C4;&#x548C;&#x9762;&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;toaster&quot;&gt;
    &lt;div class=&quot;body&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;button&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;legs&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;handle&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;toast&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toaster&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;legs&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;handle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toast&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right bottom, moccasin, teal);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right bottom, moccasin, teal);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toaster {
    width: 30em;
    height: 30em;
    background-color: snow;
    font-size: 10px;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toaster</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">background-color</span>: snow;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x673A;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toaster {
    position: relative;
}

.body {
    width: 16em;
    height: 14em;
    background-color: seagreen;
    position: absolute;
    top: 10em;
    left: 6em;
    border-radius: 2.5em;
    border-right: 1.5em solid darkgreen;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toaster</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">14em</span>;
    <span class="hljs-attribute">background-color</span>: seagreen;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1.5em</span> solid darkgreen;
}</code></pre><p>&#x753B;&#x51FA;&#x6309;&#x94AE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    width: 2.5em;
    height: 2.5em;
    background-color: tomato;
    position: absolute;
    top: 13em;
    left: 16em;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">background-color</span>: tomato;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">13em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x652F;&#x817F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".legs::before,
.legs::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1.5em;
    height: 2em;
    background: tomato;
    top: 24em;
}

.legs::before {
    left: 9em;
}

.legs::after {
    right: 10em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.legs</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.legs</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background</span>: tomato;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">24em</span>;
}

<span class="hljs-selector-class">.legs</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">9em</span>;
}

<span class="hljs-selector-class">.legs</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">10em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x624B;&#x67C4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".handle {
    width: 4.2em;
    height: 1.8em;
    background-color: tomato;
    position: absolute;
    top: 12em;
    right: 2.4em;
    border-radius: 0 0.6em 0.6em 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.handle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.8em</span>;
    <span class="hljs-attribute">background-color</span>: tomato;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">12em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">2.4em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">0.6em</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x9762;&#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".toaster {
    z-index: 1;
}

.toast {
    width: 9em;
    height: 6em;
    background-color: gold;
    position: absolute;
    top: 4em;
    left: 10em;
    border-radius: 2em 2em 0 0;
    border-right: 0.6em solid goldenrod;
    z-index: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.toaster</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.toast</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">9em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">background-color</span>: gold;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2em</span> <span class="hljs-number">2em</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0.6em</span> solid goldenrod;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
}</code></pre><p>&#x4E3A;&#x673A;&#x4F53;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x5149;&#x5F71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body::before,
.body::after {
    content: &apos;&apos;;
    position: absolute;
    width: 5em;
    height: 5em;
    border: 0.6em solid transparent;
    border-radius: 50%;
    border-left-color: white;
}

.body::before {
    transform: rotate(40deg);
    top: 1em;
    left: 1em;
}

.body::after {
    bottom: 1em;
    right: 1em;
    transform: rotate(210deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.6em</span> solid transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: white;
}

<span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(40deg);
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.body</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(210deg);
}</code></pre><p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes bake {
    0%, 20% {
        transform: translateY(0);
    }

    80%, 100% {
        transform: translateY(6em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> bake {
    0%, 20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);
    }

    80%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(6em);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5E94;&#x7528;&#x5230;&#x624B;&#x67C4;&#x548C;&#x9762;&#x5305;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".handle {
    animation: bake 3s infinite alternate;
}

.toast {
    animation: bake 3s infinite alternate;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.handle</span> {
    <span class="hljs-attribute">animation</span>: bake <span class="hljs-number">3s</span> infinite alternate;
}

<span class="hljs-selector-class">.toast</span> {
    <span class="hljs-attribute">animation</span>: bake <span class="hljs-number">3s</span> infinite alternate;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：63# 视频演示如何用纯 CSS 创作一台烤面包机

## 原文链接
[https://segmentfault.com/a/1190000015398490](https://segmentfault.com/a/1190000015398490)

