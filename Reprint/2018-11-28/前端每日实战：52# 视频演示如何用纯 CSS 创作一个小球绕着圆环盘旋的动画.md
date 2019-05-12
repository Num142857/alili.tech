---
title: '前端每日实战：52# 视频演示如何用纯 CSS 创作一个小球绕着圆环盘旋的动画' 
date: 2018-11-28 2:30:10
hidden: true
slug: yzh4rlxoim
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfmMe?w=400&amp;h=307" src="https://static.alili.tech/img/bVbfmMe?w=400&amp;h=307" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/gKxyWo" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/gKxyWo</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/gKxyWo" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cg48mty" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cg48mty</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5706;&#x73AF;&#x548C;3&#x4E2A;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;ring&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;spheres&quot;&gt;
        &lt;span class=&quot;sphere&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;sphere&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;sphere&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ring&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;spheres&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sphere&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sphere&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sphere&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkslategray;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: darkslategray;
}</code></pre><p>&#x6539;&#x53D8;&#x76D2;&#x6A21;&#x578B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    box-sizing: border-box;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">* {
    <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre><p>&#x753B;&#x51FA;&#x5706;&#x73AF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    position: relative;
    font-size: 20px;
}

.ring {
    position: relative;
    width: 10em;
    height: 10em;
    border: 1.5em solid paleturquoise;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.ring</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1.5em</span> solid paleturquoise;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x5728;&#x5706;&#x73AF;&#x7684;&#x5DE6;&#x4E0A;&#x65B9;&#x753B;&#x51FA;&#x4E00;&#x4E2A;&#x5C0F;&#x7403;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sphere {
    position: absolute;
    top: -20%;
    left: -20%;
}

.sphere::after {
    content: &apos;&apos;;
    position: absolute;
    width: 3em;
    height: 3em;
    background-color: lightseagreen;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sphere</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">20%</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">20%</span>;
}

<span class="hljs-selector-class">.sphere</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">background-color</span>: lightseagreen;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x8BA9;&#x5C0F;&#x7403;&#x5728;&#x5706;&#x73AF;&#x7684;&#x5DE6;&#x4E0A;&#x65B9;&#x76D8;&#x65CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sphere {
    width: 80%;
    height: 80%;
    animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sphere</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80%</span>;
    <span class="hljs-attribute">animation</span>: rotate <span class="hljs-number">1.5s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
  }
}</code></pre><p>&#x8BA9;&#x5C0F;&#x7403;&#x7684;&#x5706;&#x73AF;&#x7684;&#x4E0A;&#x4E0B;&#x7A7F;&#x68AD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ring {
    z-index: 2;
}

.sphere {
    animation: 
        rotate 1.5s linear infinite,
        overlapping 1.5s linear infinite;
}

@keyframes overlapping {
  to {
      z-index: 2;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ring</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.sphere</span> {
    <span class="hljs-attribute">animation</span>: 
        rotate <span class="hljs-number">1.5s</span> linear infinite,
        overlapping <span class="hljs-number">1.5s</span> linear infinite;
}

@<span class="hljs-keyword">keyframes</span> overlapping {
  <span class="hljs-selector-tag">to</span> {
      <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
  }
}</code></pre><p>&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5EF6;&#x65F6;&#xFF0C;&#x5236;&#x9020; 3 &#x4E2A;&#x5C0F;&#x7403;&#x540C;&#x65F6;&#x76D8;&#x65CB;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sphere:nth-child(2) {
    animation-delay: -0.5s;
}

.sphere:nth-child(3) {
    animation-delay: -1s;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sphere</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">0.5s</span>;
}

<span class="hljs-selector-class">.sphere</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">animation-delay</span>: -<span class="hljs-number">1s</span>;
}</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x5BB9;&#x5668;&#x8F6C;&#x52A8;&#x8D77;&#x6765;&#xFF0C;&#x5236;&#x9020;&#x5C0F;&#x7403;&#x56F4;&#x7ED5;&#x5706;&#x73AF;&#x76D8;&#x65CB;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    animation: rotate 5s linear infinite;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">animation</span>: rotate <span class="hljs-number">5s</span> linear infinite;
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：52# 视频演示如何用纯 CSS 创作一个小球绕着圆环盘旋的动画

## 原文链接
[https://segmentfault.com/a/1190000015295466](https://segmentfault.com/a/1190000015295466)

