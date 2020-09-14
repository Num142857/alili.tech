---
title: '前端每日实战：69# 视频演示如何用纯 CSS 创作一个单元素抛盒子的 loader' 
date: 2018-11-25 2:30:06
hidden: true
slug: dw3q8wjd43m
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbc4IU?w=500&amp;h=500" src="https://static.alili.tech/img/bVbc4IU?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/qKwXbx" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qKwXbx</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qKwXbx" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cD96VUM" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cD96VUM</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;loader&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loader&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: teal;
}</code></pre><p>&#x753B;&#x51FA;&#x4E00;&#x6839;&#x6728;&#x6761;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 6em;
    border-bottom: 0.25em solid white;
    font-size: 30px;
    border-radius: 0.125em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">0.25em</span> solid white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.125em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x5728;&#x5176;&#x4E0A;&#x753B;&#x51FA;&#x4E00;&#x4E2A;&#x76D2;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    position: relative;
}

.loader::before {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    border: 0.25em solid white;
    bottom: 0;
    left: 0.5em;
    border-radius: 0.25em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.25em</span> solid white;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.25em</span>;
}</code></pre><p>&#x8BA9;&#x56FE;&#x6848;&#x503E;&#x659C;&#xFF0C;&#x5F62;&#x6210;&#x76D2;&#x5B50;&#x5728;&#x5761;&#x4E0A;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    transform: rotate(-45deg);
    left: 1em;
    top: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
    <span class="hljs-attribute">left</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">1em</span>;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5236;&#x4F5C;&#x52A8;&#x753B;&#x3002;</p><p>&#x8BA9;&#x76D2;&#x5B50;&#x4E00;&#x6B65;&#x6B65;&#x722C;&#x5761;&#xFF0C;&#x722C;&#x5230;&#x5761;&#x9876;&#x518D;&#x91CD;&#x722C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader::before {
    animation: push 3s infinite;
}

@keyframes push {
    0% {
        transform: translateX(0);
    }
    
    20%, 25% {
        transform: translateX(1em);
    }

    40%, 45% {
        transform: translateX(2em);
    }

    60%, 65% {
        transform: translateX(3em);
    }

    80% {
        transform: translateX(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: push <span class="hljs-number">3s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> push {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
    }
    
    20%, 25% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(1em);
    }

    40%, 45% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(2em);
    }

    60%, 65% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em);
    }

    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x76D2;&#x5B50;&#x5728;&#x722C;&#x5761;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x6EDA;&#x52A8;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes push {
    0% {
        transform: translateX(0) rotate(0deg);
    }
    
    20%, 25% {
        transform: translateX(1em) rotate(calc(90deg * 1));
    }

    40%, 45% {
        transform: translateX(2em) rotate(calc(90deg * 2));
    }

    60%, 65% {
        transform: translateX(3em) rotate(calc(90deg * 3));
    }

    80% {
        transform: translateX(0) rotate(0deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> push {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">rotate</span>(0deg);
    }
    
    20%, 25% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(1em) <span class="hljs-built_in">rotate</span>(calc(90deg * 1));
    }

    40%, 45% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(2em) <span class="hljs-built_in">rotate</span>(calc(90deg * 2));
    }

    60%, 65% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">rotate</span>(calc(90deg * 3));
    }

    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">rotate</span>(0deg);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x76D2;&#x5B50;&#x5728;&#x722C;&#x5761;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x62DF;&#x4EBA;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes push {
    0% {
        transform: translateX(0) rotate(0deg);
    }

    5% {
        transform: translateX(0) rotate(-5deg);
    }
    
    20%, 25% {
        transform: translateX(1em) rotate(calc(90deg * 1 + 5deg));
    }

    30% {
        transform: translateX(1em) rotate(calc(90deg * 1 - 5deg));
    }

    40%, 45% {
        transform: translateX(2em) rotate(calc(90deg * 2 + 5deg));
    }

    50% {
        transform: translateX(2em) rotate(calc(90deg * 2 - 5deg));
    }

    60%, 65% {
        transform: translateX(3em) rotate(calc(90deg * 3 + 5deg));
    }

    70% {
        transform: translateX(3em) rotate(calc(90deg * 3 - 5deg));
    }

    80% {
        transform: translateX(0) rotate(-5deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> push {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">rotate</span>(0deg);
    }

    5% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">rotate</span>(-5deg);
    }
    
    20%, 25% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(1em) <span class="hljs-built_in">rotate</span>(calc(90deg * 1 + 5deg));
    }

    30% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(1em) <span class="hljs-built_in">rotate</span>(calc(90deg * 1 - 5deg));
    }

    40%, 45% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(2em) <span class="hljs-built_in">rotate</span>(calc(90deg * 2 + 5deg));
    }

    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(2em) <span class="hljs-built_in">rotate</span>(calc(90deg * 2 - 5deg));
    }

    60%, 65% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">rotate</span>(calc(90deg * 3 + 5deg));
    }

    70% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">rotate</span>(calc(90deg * 3 - 5deg));
    }

    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">rotate</span>(-5deg);
    }
}</code></pre><p>&#x8BA9;&#x6728;&#x6761;&#x5728;&#x7BB1;&#x5B50;&#x722C;&#x5230;&#x63A5;&#x8FD1;&#x9876;&#x70B9;&#x65F6;&#x505A;&#x629B;&#x63B7;&#x52A8;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    animation: throw 3s infinite;
    transform-origin: 20%;
}

@keyframes throw {
    0%, 70%, 100% {
        transform: rotate(-45deg);
    }

    80% {
        transform: rotate(-135deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">animation</span>: throw <span class="hljs-number">3s</span> infinite;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">20%</span>;
}

@<span class="hljs-keyword">keyframes</span> throw {
    0%, 70%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
    }

    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-135deg);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x76D2;&#x5B50;&#x5728;&#x722C;&#x5230;&#x63A5;&#x8FD1;&#x9876;&#x70B9;&#x65F6;&#x7684;&#x6389;&#x843D;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes push {
    70% {
        transform: translateX(3em) translateY(0) rotate(calc(90deg * 3 - 5deg)) scale(1);
        filter: opacity(1);
    }

    80% {
        transform: translateX(0) translateY(-5em) rotate(-5deg) scale(0);
        filter: opacity(0.5);
    }

    90% {
        transform: translateX(0) translateY(0) rotate(0deg) scale(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> push {
    70% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(3em) <span class="hljs-built_in">translateY</span>(0) <span class="hljs-built_in">rotate</span>(calc(90deg * 3 - 5deg)) <span class="hljs-built_in">scale</span>(1);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }

    80% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">translateY</span>(-5em) <span class="hljs-built_in">rotate</span>(-5deg) <span class="hljs-built_in">scale</span>(0);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.5);
    }

    90% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0) <span class="hljs-built_in">translateY</span>(0) <span class="hljs-built_in">rotate</span>(0deg) <span class="hljs-built_in">scale</span>(0);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x6389;&#x53EF;&#x80FD;&#x8D85;&#x51FA;&#x9875;&#x9762;&#x7684;&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：69# 视频演示如何用纯 CSS 创作一个单元素抛盒子的 loader

## 原文链接
[https://segmentfault.com/a/1190000015470411](https://segmentfault.com/a/1190000015470411)

