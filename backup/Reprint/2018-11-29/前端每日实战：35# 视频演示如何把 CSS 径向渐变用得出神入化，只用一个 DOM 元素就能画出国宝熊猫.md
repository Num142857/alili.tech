---
title: '前端每日实战：35# 视频演示如何把 CSS 径向渐变用得出神入化，只用一个 DOM 元素就能画出国宝熊猫' 
date: 2018-11-29 9:33:05
hidden: true
slug: e2kbbeaqe6
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmJt?w=400&amp;h=304" src="https://static.alili.tech/img/bVbfmJt?w=400&amp;h=304" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/odKrpy" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/odKrpy</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/odKrpy" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cV7J6SK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cV7J6SK</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;panda&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;panda&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
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
    background-color: mediumturquoise;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: mediumturquoise;
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x5C3A;&#x5BF8;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda {
    width: 21em;
    height: 16em;
    background-color: white;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">21em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">16em</span>;
    <span class="hljs-attribute">background-color</span>: white;
}</code></pre>
<p>&#x753B;&#x51FA;&#x5934;&#x90E8;&#x8F6E;&#x5ED3;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda {
    border: 0.5em solid #333;
    border-top-left-radius: 11em;
    border-top-right-radius: 11em;
    border-bottom-left-radius: 11em 6em;
    border-bottom-right-radius: 11em 6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5em</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">11em</span>;
    <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">11em</span>;
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-number">11em</span> <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">11em</span> <span class="hljs-number">6em</span>;
}</code></pre>
<p>&#x753B;&#x51FA;&#x53F3;&#x773C;&#x8F6E;&#x5ED3;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda {
    position: relative;
}

.panda::before {
    content: &apos;&apos;;
    position: absolute;
    width: 7em;
    height: 4em;
    left: 2.9em;
    top: 5.5em;
    background-color: #333;
    border-radius: 50% 50% 45% 42%;
    transform: rotate(-45deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2.9em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">45%</span> <span class="hljs-number">42%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
}</code></pre>
<p>&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&#x753B;&#x51FA;&#x5DE6;&#x773C;&#x8F6E;&#x5ED3;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda::after {
    content: &apos;&apos;;
    position: absolute;
    width: 7em;
    height: 4em;
    left: 11.1em;
    top: 5.5em;
    background-color: #333;
    border-radius: 50% 50% 42% 45%;
    transform: rotate(45deg);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">7em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">11.1em</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5.5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">42%</span> <span class="hljs-number">45%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
}</code></pre>
<p>&#x753B;&#x51FA;&#x4E24;&#x53EA;&#x8033;&#x6735;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda::before {
    box-shadow: 1em -7.2em 0 -0.4em #333;
}

.panda::after {
    box-shadow: -1em -7.2em 0 -0.4em #333;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1em</span> -<span class="hljs-number">7.2em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.4em</span> <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">1em</span> -<span class="hljs-number">7.2em</span> <span class="hljs-number">0</span> -<span class="hljs-number">0.4em</span> <span class="hljs-number">#333</span>;
}</code></pre>
<p>&#x753B;&#x51FA;&#x4E24;&#x53EA;&#x773C;&#x775B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda::before {
    background-image: 
        radial-gradient(circle at 5.1em 2em, white 0.3em, transparent 0.3em), 
        radial-gradient(circle at 4.6em 2em, #333 0.7em, transparent 0.7em), 
        radial-gradient(circle at 4.5em 2em, white 1em, transparent 1em);
}

.panda::after {
    background-image: 
        radial-gradient(circle at 2.4em 1.5em, white 0.3em, transparent 0.3em), 
        radial-gradient(circle at 2.4em 2em, #333 0.7em, transparent 0.7em), 
        radial-gradient(circle at 2.5em 2em, white 1em, transparent 1em);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background-image</span>: 
        <span class="hljs-built_in">radial-gradient</span>(circle at 5.1em 2em, white 0.3em, transparent 0.3em), 
        <span class="hljs-built_in">radial-gradient</span>(circle at 4.6em 2em, #333 0.7em, transparent 0.7em), 
        <span class="hljs-built_in">radial-gradient</span>(circle at 4.5em 2em, white 1em, transparent 1em);
}

<span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-image</span>: 
        <span class="hljs-built_in">radial-gradient</span>(circle at 2.4em 1.5em, white 0.3em, transparent 0.3em), 
        <span class="hljs-built_in">radial-gradient</span>(circle at 2.4em 2em, #333 0.7em, transparent 0.7em), 
        <span class="hljs-built_in">radial-gradient</span>(circle at 2.5em 2em, white 1em, transparent 1em);
}</code></pre>
<p>&#x753B;&#x51FA;&#x9F3B;&#x5B50;&#x548C;&#x5634;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda {
    background-image: 
        radial-gradient(ellipse at 50% 60%, #333 1.2em, transparent 1.2em),
        radial-gradient(ellipse at 50% 80%, #555 0.6em, transparent 0.6em);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span> {
    <span class="hljs-attribute">background-image</span>: 
        <span class="hljs-built_in">radial-gradient</span>(ellipse at 50% 60%, #333 1.2em, transparent 1.2em),
        <span class="hljs-built_in">radial-gradient</span>(ellipse at 50% 80%, #555 0.6em, transparent 0.6em);
}</code></pre>
<p>&#x589E;&#x52A0;&#x4E00;&#x70B9;&#x7ACB;&#x4F53;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda {
    border-bottom-width: 1em;
    box-shadow: inset 1em -1em 0 #eee;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span> {
    <span class="hljs-attribute">border-bottom-width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">1em</span> -<span class="hljs-number">1em</span> <span class="hljs-number">0</span> <span class="hljs-number">#eee</span>;
}</code></pre>
<p>&#x8BA9;&#x53F3;&#x773C;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda::before {
    animation: before-animate 1s ease-in-out infinite alternate;
}

@keyframes before-animate {
    to {
        background-image: 
            radial-gradient(circle at 4.9em 1.8em, white 0.3em, transparent 0.3em), 
            radial-gradient(circle at 4.4em 1.8em, #333 0.7em, transparent 0.7em), 
            radial-gradient(circle at 4.5em 2em, white 1em, transparent 1em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: before-animate <span class="hljs-number">1s</span> ease-in-out infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> before-animate {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-image</span>: 
            <span class="hljs-built_in">radial-gradient</span>(circle at 4.9em 1.8em, white 0.3em, transparent 0.3em), 
            <span class="hljs-built_in">radial-gradient</span>(circle at 4.4em 1.8em, #333 0.7em, transparent 0.7em), 
            <span class="hljs-built_in">radial-gradient</span>(circle at 4.5em 2em, white 1em, transparent 1em);
    }
}</code></pre>
<p>&#x7C7B;&#x4F3C;&#x5730;&#xFF0C;&#x8BA9;&#x5DE6;&#x773C;&#x4E5F;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panda::after {
    animation: after-animate 1s ease-in-out infinite alternate -1s;
}

@keyframes after-animate {
    to {
        background-image: 
            radial-gradient(circle at 2.6em 1.3em, white 0.3em, transparent 0.3em), 
            radial-gradient(circle at 2.6em 1.8em, #333 0.7em, transparent 0.7em), 
            radial-gradient(circle at 2.5em 2em, white 1em, transparent 1em);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panda</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: after-animate <span class="hljs-number">1s</span> ease-in-out infinite alternate -<span class="hljs-number">1s</span>;
}

@<span class="hljs-keyword">keyframes</span> after-animate {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-image</span>: 
            <span class="hljs-built_in">radial-gradient</span>(circle at 2.6em 1.3em, white 0.3em, transparent 0.3em), 
            <span class="hljs-built_in">radial-gradient</span>(circle at 2.6em 1.8em, #333 0.7em, transparent 0.7em), 
            <span class="hljs-built_in">radial-gradient</span>(circle at 2.5em 2em, white 1em, transparent 1em);
    }
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x8BA9;&#x9ED1;&#x773C;&#x5708;&#x548C;&#x8033;&#x6735;&#x4E5F;&#x52A8;&#x8D77;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes before-animate {
    to {
        transform: rotate(-40deg);
    }
}

@keyframes after-animate {
    to {
        transform: rotate(40deg);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> before-animate {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-40deg);
    }
}

@<span class="hljs-keyword">keyframes</span> after-animate {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(40deg);
    }
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：35# 视频演示如何把 CSS 径向渐变用得出神入化，只用一个 DOM 元素就能画出国宝熊猫

## 原文链接
[https://segmentfault.com/a/1190000015052653](https://segmentfault.com/a/1190000015052653)

