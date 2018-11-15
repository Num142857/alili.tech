---
title: '前端每日实战：106# 视频演示如何用纯 CSS 创作一个没有 DOM 元素的动画' 
date: 2018-11-16 2:30:06
hidden: true
slug: tv72i0wpvre
categories: reprint
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfl2x?w=400&amp;h=301" src="https://static.alili.tech/img/bVbfl2x?w=400&amp;h=301" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/JBqjqm" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/JBqjqm</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/JBqjqm" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cD3KwTw" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cD3KwTw</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x6CA1;&#x6709; dom &#x5143;&#x7D20;&#xFF0C;&#x76F4;&#x63A5;&#x5199; css&#x3002;<br>&#x8BBE;&#x7F6E;&#x9875;&#x9762;&#x7A7A;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    position: fixed;
    margin: 0;
    width: 100vw;
    height: 100vh;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x80CC;&#x666F;&#x56FE;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body::before {
    content: &apos;&apos;;
    position: fixed;
    width: 200vmax;
    height: 200vmax;
    background-color: steelblue;
    color: turquoise;
    background-image: 
        linear-gradient(
            45deg, 
            currentColor 25%, 
            transparent 25%, transparent 75%, 
            currentColor 75%),
        linear-gradient(
            45deg, 
            currentColor 25%, 
            transparent 25%, transparent 75%, 
            currentColor 75%);
    background-position: 0 0, 5vmax 5vmax;
    background-size: 10vmax 10vmax;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200vmax</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200vmax</span>;
    <span class="hljs-attribute">background-color</span>: steelblue;
    <span class="hljs-attribute">color</span>: turquoise;
    <span class="hljs-attribute">background-image</span>: 
        <span class="hljs-built_in">linear-gradient</span>(
            45deg, 
            currentColor 25%, 
            transparent 25%, transparent 75%, 
            currentColor 75%),
        <span class="hljs-built_in">linear-gradient</span>(
            45deg, 
            currentColor 25%, 
            transparent 25%, transparent 75%, 
            currentColor 75%);
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>, <span class="hljs-number">5vmax</span> <span class="hljs-number">5vmax</span>;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">10vmax</span> <span class="hljs-number">10vmax</span>;</code></pre><p>&#x5E73;&#x79FB;&#x80CC;&#x666F;&#x56FE;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body::before {
    top: 50%;
    left: 50%;
    animation: 
        9s move infinite ease-in-out alternate;
}

@keyframes move {
    from {
        left: -40%;
        top: -40%;
    }

    to {
        left: -60%;
        top: -60%;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">animation</span>: 
        <span class="hljs-number">9s</span> move infinite ease-in-out alternate;
}

@<span class="hljs-keyword">keyframes</span> move {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">40%</span>;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">40%</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">60%</span>;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">60%</span>;
    }
}</code></pre><p>&#x8BA9;&#x80CC;&#x666F;&#x56FE;&#x6848;&#x8F6C;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body::before {
    animation: 
        9s move infinite ease-in-out alternate,
        9s -1.5s rotating infinite ease-in-out alternate;
}

@keyframes rotating {
    to {
        transform: rotate(180deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: 
        <span class="hljs-number">9s</span> move infinite ease-in-out alternate,
        <span class="hljs-number">9s</span> -<span class="hljs-number">1.5s</span> rotating infinite ease-in-out alternate;
}

@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
    }
}</code></pre><p>&#x5E73;&#x79FB;&#x9875;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    top: 50%;
    left: 50%;
    animation: 
        3s move infinite ease-in-out alternate;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">animation</span>: 
        <span class="hljs-number">3s</span> move infinite ease-in-out alternate;
}</code></pre><p>&#x7F29;&#x653E;&#x9875;&#x9762;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    animation: 
        3s move infinite ease-in-out alternate,
        3s zoom infinite ease-in-out alternate;
}

@keyframes zoom {
    to {
        transform: scale(10);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">animation</span>: 
        <span class="hljs-number">3s</span> move infinite ease-in-out alternate,
        <span class="hljs-number">3s</span> zoom infinite ease-in-out alternate;
}

@<span class="hljs-keyword">keyframes</span> zoom {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(10);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x589E;&#x52A0;&#x53D8;&#x8272;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes rotating {
    to {
        transform: rotate(180deg);
        filter: hue-rotate(1turn);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> rotating {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">hue-rotate</span>(1turn);
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：106# 视频演示如何用纯 CSS 创作一个没有 DOM 元素的动画

## 原文链接
[https://segmentfault.com/a/1190000016013632](https://segmentfault.com/a/1190000016013632)

