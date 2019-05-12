---
title: '前端每日实战：70# 视频演示如何用纯 CSS 创作一只徘徊的果冻怪兽' 
date: 2018-11-24 2:30:10
hidden: true
slug: yq9hk8slzwo
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbc8tF?w=500&amp;h=500" src="https://static.alili.tech/img/bVbc8tF?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/VdOKQG" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/VdOKQG</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/VdOKQG" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/c43ekUL" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/c43ekUL</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 2 &#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5206;&#x522B;&#x4EE3;&#x8868;&#x602A;&#x517D;&#x7684;&#x8EAB;&#x4F53;&#x548C;&#x773C;&#x775B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;monster&quot;&gt;
    &lt;span class=&quot;body&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;eyes&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;monster&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;eyes&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    background-color: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre><p>&#x8BBE;&#x7F6E;&#x524D;&#x666F;&#x8272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".monster {
    width: 100vw;
    height: 50vh;
    background-color: lightcyan;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.monster</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50vh</span>;
    <span class="hljs-attribute">background-color</span>: lightcyan;
}</code></pre><p>&#x753B;&#x51FA;&#x602A;&#x517D;&#x7684;&#x8EAB;&#x4F53;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".monster {
    position: relative;
}

.body {
    position: absolute;
    width: 32vmin;
    height: 32vmin;
    background-color: teal;
    border-radius: 43% 40% 43% 40%;
    bottom: calc(-1 * 32vmin / 2 - 4vmin);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.monster</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">32vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32vmin</span>;
    <span class="hljs-attribute">background-color</span>: teal;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">43%</span> <span class="hljs-number">40%</span> <span class="hljs-number">43%</span> <span class="hljs-number">40%</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(-1 * 32vmin / 2 - 4vmin);
}</code></pre><p>&#x5B9A;&#x4E49;&#x602A;&#x517D;&#x773C;&#x775B;&#x6240;&#x5728;&#x7684;&#x5BB9;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes {
    width: 24vmin;
    height: 5vmin;
    position: absolute;
    bottom: 2vmin;
    left: calc(32vmin - 24vmin - 2vmin);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">24vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5vmin</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">2vmin</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(32vmin - 24vmin - 2vmin);
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x602A;&#x517D;&#x7684;&#x773C;&#x775B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes::before,
.eyes::after {
    content: &apos;&apos;;
    position: absolute;
    width: 5vmin;
    height: 5vmin;
    border: 1.25vmin solid white;
    box-sizing: border-box;
    border-radius: 50%;
}

.eyes::before {
    left: 4vmin;
}

.eyes::after {
    right: 4vmin;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5vmin</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1.25vmin</span> solid white;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">4vmin</span>;
}

<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">4vmin</span>;
}</code></pre><p>&#x4E3A;&#x602A;&#x517D;&#x5B9A;&#x4E49;&#x8F7B;&#x8F7B;&#x8DF3;&#x8D77;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x7ED3;&#x5408;&#x540E;&#x9762;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x8BA9;&#x5B83;&#x5177;&#x6709;&#x679C;&#x51BB;&#x7684;&#x5F39;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".body {
    animation:
        bounce 1s infinite alternate;
}

@keyframes bounce {
    to {
        bottom: calc(-1 * 32vmin / 2 - 2vmin);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">animation</span>:
        bounce <span class="hljs-number">1s</span> infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> bounce {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-built_in">calc</span>(-1 * 32vmin / 2 - 2vmin);
    }
}</code></pre><p>&#x8BA9;&#x602A;&#x517D;&#x7684;&#x8EAB;&#x4F53;&#x8F6C;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes wave {
    to {
        transform: rotate(360deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> wave {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    }
}</code></pre><p>&#x8BA9;&#x602A;&#x517D;&#x5F98;&#x5F8A;&#x884C;&#x8D70;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".monster {
    overflow: hidden;
}

.body {
    left: -2vmin;
    animation:
        wander 5s linear infinite alternate,
        wave 3s linear infinite,
        bounce 1s infinite alternate;
}

.eyes {
    animation: wander 5s linear infinite alternate;
}

@keyframes wander {
    to {
        left: calc(100% - 32vmin + 2vmin);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.monster</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">2vmin</span>;
    <span class="hljs-attribute">animation</span>:
        wander <span class="hljs-number">5s</span> linear infinite alternate,
        wave <span class="hljs-number">3s</span> linear infinite,
        bounce <span class="hljs-number">1s</span> infinite alternate;
}

<span class="hljs-selector-class">.eyes</span> {
    <span class="hljs-attribute">animation</span>: wander <span class="hljs-number">5s</span> linear infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> wander {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(100% - 32vmin + 2vmin);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x602A;&#x517D;&#x7684;&#x773C;&#x775B;&#x7728;&#x4E00;&#x7728;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes::before,
.eyes::after {
    animation: blink 3s infinite linear;
}

@keyframes blink {
    4%, 10%, 34%, 40% {
        transform: scaleY(1);
    }

    7%, 37% {
        transform: scaleY(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.eyes</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: blink <span class="hljs-number">3s</span> infinite linear;
}

@<span class="hljs-keyword">keyframes</span> blink {
    4%, 10%, 34%, 40% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
    }

    7%, 37% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：70# 视频演示如何用纯 CSS 创作一只徘徊的果冻怪兽

## 原文链接
[https://segmentfault.com/a/1190000015484852](https://segmentfault.com/a/1190000015484852)

