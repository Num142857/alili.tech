---
title: '前端每日实战：38# 视频演示如何用纯 CSS 创作阶梯文字特效' 
date: 2018-11-29 9:33:05
hidden: true
slug: 734o5ucplqd
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmKg?w=400&amp;h=305" src="https://static.alili.tech/img/bVbfmKg?w=400&amp;h=305" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/MXYBEM" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/MXYBEM</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/MXYBEM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cEQMJAK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cEQMJAK</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 1 &#x4E2A;&#x6BB5;&#x843D;&#xFF0C;&#x6BB5;&#x843D;&#x4E2D;&#x5305;&#x542B;&#x51E0;&#x4E2A;&#x5355;&#x8BCD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;p&gt;
        &lt;span&gt;stay&lt;/span&gt;
        &lt;span&gt;hungry&lt;/span&gt;
        &lt;span&gt;stay&lt;/span&gt;
        &lt;span&gt;foolish&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>stay<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hungry<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>stay<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>foolish<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: black;
}</code></pre>
<p>&#x8BBE;&#x7F6E;&#x6587;&#x5B57;&#x6837;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p {
    color: white;
    font-size: 60px;
    font-family: sans-serif;
    font-weight: bold;
    text-transform: uppercase;
}

.container p span {
    display: block;
    text-align: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">text-transform</span>: uppercase;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">text-align</span>: center;
}</code></pre>
<p>&#x4FEE;&#x6539; dom&#xFF0C;&#x628A;&#x6587;&#x672C;&#x5206;&#x6210;&#x6BCF;&#x76F8;&#x90BB;&#x7684; 2 &#x53E5;&#x4E3A;&#x4E00;&#x7EC4;&#xFF0C;4 &#x53E5;&#x8BDD;&#x4E00;&#x5171;&#x5206;&#x6210; 3 &#x7EC4;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;p&gt;
        &lt;span&gt;stay&lt;/span&gt;
        &lt;span&gt;hungry&lt;/span&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;span&gt;hungry&lt;/span&gt;
        &lt;span&gt;stay&lt;/span&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;span&gt;stay&lt;/span&gt;
        &lt;span&gt;foolish&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>stay<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hungry<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hungry<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>stay<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>stay<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>foolish<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x628A;&#x6BB5;&#x843D;&#x7684;&#x884C;&#x9AD8;&#x6539;&#x4E3A; 1 &#x884C;&#x6587;&#x672C;&#x9AD8;&#xFF0C;3 &#x4E2A;&#x6BB5;&#x843D;&#x5404;&#x5360;&#x4E00;&#x884C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p {
    margin: 0;
    height: 1em;
    overflow: hidden;
}

.container p span {
    line-height: 1em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1em</span>;
}</code></pre>
<p>&#x8BA9;&#x6587;&#x5B57;&#x503E;&#x659C;&#x53D8;&#x5F62;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p:nth-child(odd) {
    transform: skewY(-30deg) skewX(45deg) scaleY(1.3333);
}

.container p:nth-child(even) {
    transform: skewY(-30deg) scaleY(1.3333);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(odd)</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewY</span>(-30deg) <span class="hljs-built_in">skewX</span>(45deg) <span class="hljs-built_in">scaleY</span>(1.3333);
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skewY</span>(-30deg) <span class="hljs-built_in">scaleY</span>(1.3333);
}</code></pre>
<p>&#x5BF9;&#x9F50;&#x6587;&#x5B57;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p:nth-child(2) {
    margin-left: 1.3em;
}

.container p:nth-child(3) {
    margin-left: 2.6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">1.3em</span>;
}

<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2.6em</span>;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x8BA9;&#x6587;&#x5B57;&#x4E0A;&#x4E0B;&#x79FB;&#x52A8;&#x7684;&#x52A8;&#x753B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p span {
    animation: lettering 3s infinite ease-in-out alternate;
}

@keyframes lettering {
    to {
        transform: translateY(-100%);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: lettering <span class="hljs-number">3s</span> infinite ease-in-out alternate;
}

@<span class="hljs-keyword">keyframes</span> lettering {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-100%);
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x6587;&#x5B57;&#x504F;&#x5DE6;&#x4E00;&#x4E9B;&#xFF0C;&#x62B5;&#x9500;&#x56E0;&#x503E;&#x659C;&#x9020;&#x6210;&#x7684;&#x4F4D;&#x79FB;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container p {
    position: relative;
    left: -0.8em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">0.8em</span>;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：38# 视频演示如何用纯 CSS 创作阶梯文字特效

## 原文链接
[https://segmentfault.com/a/1190000015107942](https://segmentfault.com/a/1190000015107942)

