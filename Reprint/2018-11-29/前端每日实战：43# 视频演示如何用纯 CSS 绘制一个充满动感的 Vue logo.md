---
title: '前端每日实战：43# 视频演示如何用纯 CSS 绘制一个充满动感的 Vue logo' 
date: 2018-11-29 9:27:38
hidden: true
slug: quyf99rapnd
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbQrP?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbQrP?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/zaqKPx" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/zaqKPx</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/zaqKPx" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cw9WzuV" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cw9WzuV</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x4E2D;&#x5305;&#x542B; 3 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;vue&quot;&gt;
    &lt;span class=&quot;outer&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;middle&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;inner&quot;&gt;&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;vue&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;outer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;middle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
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
    background: radial-gradient(circle at center,lightgreen, white);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">radial-gradient</span>(circle at center,lightgreen, white);
}</code></pre>
<p>&#x5B9A;&#x4E49; 3 &#x5C42;&#x4E09;&#x89D2;&#x5F62;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --outer-w: 49em;
    --outer-h: 40em;
    --middle-w: 32em;
    --middle-h: 26em;
    --inner-w: 16em;
    --inner-h: 13em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--outer-w</span>: <span class="hljs-number">49em</span>;
    <span class="hljs-attribute">--outer-h</span>: <span class="hljs-number">40em</span>;
    <span class="hljs-attribute">--middle-w</span>: <span class="hljs-number">32em</span>;
    <span class="hljs-attribute">--middle-h</span>: <span class="hljs-number">26em</span>;
    <span class="hljs-attribute">--inner-w</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">--inner-h</span>: <span class="hljs-number">13em</span>;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vue {
    width: var(--outer-w);
    height: var(--outer-h);
    font-size: 8px;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.vue</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--outer-w);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--outer-h);
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">8px</span>;
}</code></pre>
<p>&#x753B;&#x51FA; 3 &#x5C42;&#x4E09;&#x89D2;&#x5F62;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vue {
    position: relative;
    display: flex;
    justify-content: center;
}

.outer,
.medium,
.inner {
    position: absolute;
    border-style: solid;
    border-color: transparent;
    border-top-width: var(--h);
    border-top-color: var(--c);
    border-left-width: calc(var(--w) / 2);
    border-right-width: calc(var(--w) / 2);
}

.outer {
    --w: var(--outer-w);
    --h: var(--outer-h);
    --c: #42b883; /* aragon green */
}

.middle {
    --w: var(--middle-w);
    --h: var(--middle-h);
    --c: #35495e;  /* derk denim */
}

.inner {
    --w: var(--inner-w);
    --h: var(--inner-h);
    --c: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.vue</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.outer</span>,
<span class="hljs-selector-class">.medium</span>,
<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-color</span>: transparent;
    <span class="hljs-attribute">border-top-width</span>: <span class="hljs-built_in">var</span>(--h);
    <span class="hljs-attribute">border-top-color</span>: <span class="hljs-built_in">var</span>(--c);
    <span class="hljs-attribute">border-left-width</span>: <span class="hljs-built_in">calc</span>(var(--w) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">border-right-width</span>: <span class="hljs-built_in">calc</span>(var(--w) / <span class="hljs-number">2</span>);
}

<span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">--w</span>: <span class="hljs-built_in">var</span>(--outer-w);
    <span class="hljs-attribute">--h</span>: <span class="hljs-built_in">var</span>(--outer-h);
    <span class="hljs-attribute">--c</span>: <span class="hljs-number">#42b883</span>; <span class="hljs-comment">/* aragon green */</span>
}

<span class="hljs-selector-class">.middle</span> {
    <span class="hljs-attribute">--w</span>: <span class="hljs-built_in">var</span>(--middle-w);
    <span class="hljs-attribute">--h</span>: <span class="hljs-built_in">var</span>(--middle-h);
    <span class="hljs-attribute">--c</span>: <span class="hljs-number">#35495e</span>;  <span class="hljs-comment">/* derk denim */</span>
}

<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">--w</span>: <span class="hljs-built_in">var</span>(--inner-w);
    <span class="hljs-attribute">--h</span>: <span class="hljs-built_in">var</span>(--inner-h);
    <span class="hljs-attribute">--c</span>: white;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer,
.middle,
.inner {
    animation: animate 3s in ease-out infinite;
}

.middle {
    animation-delay: 0.1s;
}

.inner {
    animation-delay: 0.2s;
}

@keyframes animate {
    0%, 5% {
        top: -100%;
    }

    15%, 80% {
        top: 0;
        filter: opacity(1);
        transform: scale(1);
    }

    90%, 100% {
        top: 100%;
        filter: opacity(0);
        transform: scale(0);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.outer</span>,
<span class="hljs-selector-class">.middle</span>,
<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">3s</span> in ease-out infinite;
}

<span class="hljs-selector-class">.middle</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.1s</span>;
}

<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0.2s</span>;
}

@<span class="hljs-keyword">keyframes</span> animate {
    0%, 5% {
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">100%</span>;
    }

    15%, 80% {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
    }

    90%, 100% {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x5BB9;&#x5668;&#x5916;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vue {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.vue</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：43# 视频演示如何用纯 CSS 绘制一个充满动感的 Vue logo

## 原文链接
[https://segmentfault.com/a/1190000015177284](https://segmentfault.com/a/1190000015177284)

