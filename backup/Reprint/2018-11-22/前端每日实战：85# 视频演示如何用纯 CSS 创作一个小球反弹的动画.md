---
title: '前端每日实战：85# 视频演示如何用纯 CSS 创作一个小球反弹的动画' 
date: 2018-11-22 2:30:10
hidden: true
slug: 3ou9rt6fm0p
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbd5WH?w=400&amp;h=300" src="https://static.alili.tech/img/bVbd5WH?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/OwWROO" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/OwWROO</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/OwWROO" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cnKwKA3" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cnKwKA3</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709; 1 &#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#666, #333);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(#666, #333);
}</code></pre><p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width: 30em;
    height: 20em;
    font-size: 10px;
    background-color: steelblue;
    border: 0.5em solid #222;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: steelblue;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5em</span> solid <span class="hljs-number">#222</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    position: relative;
}

.box::before {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 2em;
    background-color: silver;
    border-radius: 50%;
    box-shadow: inset -0.3em -0.3em 0.5em rgba(0, 0, 0, 0.6);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: silver;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">box-shadow</span>: inset -<span class="hljs-number">0.3em</span> -<span class="hljs-number">0.3em</span> <span class="hljs-number">0.5em</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.6);
}</code></pre><p>&#x5B9A;&#x4E49;&#x6CBF; x &#x8F74;&#x5373;&#x6A2A;&#x5411;&#x79FB;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes moveX {
    from {
        left: 0;
    }

    to {
        left: calc(30em - 2em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> moveX {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(30em - 2em);
    }
}</code></pre><p>&#x5B9A;&#x4E49;&#x6CBF; y &#x8F74;&#x5373;&#x7EB5;&#x5411;&#x79FB;&#x52A8;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes moveY {
    from {
        top: 0;
    }

    to {
        top: calc(20em - 2em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> moveY {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(20em - 2em);
    }
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x628A;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5E94;&#x7528;&#x5230;&#x5C0F;&#x7403;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box::before {
    animation: 
        moveX 2s linear infinite alternate,
        moveY 2.5s linear infinite alternate;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: 
        moveX <span class="hljs-number">2s</span> linear infinite alternate,
        moveY <span class="hljs-number">2.5s</span> linear infinite alternate;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：85# 视频演示如何用纯 CSS 创作一个小球反弹的动画

## 原文链接
[https://segmentfault.com/a/1190000015713438](https://segmentfault.com/a/1190000015713438)

