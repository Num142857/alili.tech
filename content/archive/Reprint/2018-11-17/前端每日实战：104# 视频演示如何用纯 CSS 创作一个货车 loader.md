---
title: '前端每日实战：104# 视频演示如何用纯 CSS 创作一个货车 loader' 
date: 2018-11-17 2:30:13
hidden: true
slug: m7i5t0aczp
categories: reprint
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfdO7?w=400&amp;h=300" src="https://static.alili.tech/img/bVbfdO7?w=400&amp;h=300" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2><p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p><p><a href="https://codepen.io/comehope/pen/vaPGRz" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/vaPGRz</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/vaPGRz" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;</h2><p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p><p><a href="https://scrimba.com/p/pEgDAM/cz32DUd" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cz32DUd</a></p><h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2><p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p><p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p><h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2><p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x5BB9;&#x5668;&#x4EE3;&#x8868;&#x5361;&#x8F66;&#xFF0C;&#x5305;&#x542B;&#x7684; 2 &#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x4EE3;&#x8868;&#x8F66;&#x5934;&#x548C;&#x5C3E;&#x6C14;&#xFF1B;<code>&lt;hr&gt;</code> &#x4EE3;&#x8868;&#x9053;&#x8DEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;truck&quot;&gt;
    &lt;span class=&quot;cab&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;smoke&quot;&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;hr&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;truck&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cab&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;smoke&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span></code></pre><p>&#x5C45;&#x4E2D;&#x663E;&#x793A;&#xFF0C;&#x540C;&#x65F6;&#x9053;&#x8DEF;&#x4E0E;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7559;&#x51FA;&#x7A7A;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 10%;
    padding-top: 10%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10%</span>;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">10%</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5361;&#x8F66;&#x8F66;&#x53A2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".truck {
    width: 15em;
    height: 5em;
    font-size: 10px;
    background-color: #444;
    border-radius: 0.4em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.truck</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;
}</code></pre><p>&#x7528;&#x4F2A;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x8F66;&#x53A2;&#x7684;&#x8F66;&#x8F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".truck {
    position: relative;
}

.truck::before,
.truck::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 2em;
    height: 2em;
    background-color: #444;
    border: 0.1em solid white;
    border-radius: 50%;
    bottom: -1em;
}

.truck::before {
    left: 0.6em;
}

.truck::after {
    right: 0.6em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.truck</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.truck</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.truck</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.truck</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.6em</span>;
}

<span class="hljs-selector-class">.truck</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0.6em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x8F66;&#x5934;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cab {
    position: absolute;
    width: 3.3em;
    height: 2.5em;
    background-color: #333;
    left: -3.5em;
    bottom: 0;
    border-radius: 40% 0 0.4em 0.4em;
}

.cab::before {
    content: &apos;&apos;;
    position: absolute;
    width: 2em;
    height: 1.5em;
    background-color: #333;
    top: -1.5em;
    right: 0;
    border-radius: 100% 0 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cab</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3.3em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">3.5em</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">40%</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span> <span class="hljs-number">0.4em</span>;
}

<span class="hljs-selector-class">.cab</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x8F66;&#x5934;&#x7684;&#x8F66;&#x8F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cab::after {
    content: &apos;&apos;;
    position: absolute;
    box-sizing: border-box;
    width: 2em;
    height: 2em;
    background-color: #444;
    border: 0.1em solid white;
    border-radius: 50%;
    bottom: -1em;
    left: 0.5em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cab</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.1em</span> solid white;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">1em</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.5em</span>;
}</code></pre><p>&#x753B;&#x51FA;&#x5C3E;&#x6C14;&#x7684;&#x521D;&#x59CB;&#x72B6;&#x6001;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".smoke,
.smoke::before,
.smoke::after {
    content: &apos;&apos;;
    position: absolute;
    width: 1em;
    height: 1em;
    background-color: #333;
    right: -0.1em;
    bottom: -0.5em;
    border-radius: 50%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.smoke</span>,
<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">0.1em</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre><p>&#x589E;&#x52A0;&#x6392;&#x51FA;&#x5C3E;&#x6C14;&#x7684;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".smoke {
    animation: smoke-1 2s infinite;
}

.smoke::before {
    animation: smoke-2 2s infinite;
}

.smoke::after {
    animation: smoke-3 2s infinite;
}

@keyframes smoke-1 {
    to {
        width: 3em;
        height: 3em;
        right: -3em;
        bottom: 0.5em;
    }
}

@keyframes smoke-2 {
    to {
        width: 2.5em;
        height: 2.5em;
        right: -6em;
        bottom: 0.8em;
    }
}

@keyframes smoke-3 {
    to {
        width: 3.5em;
        height: 3.5em;
        right: -4em;
        bottom: 0.2em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.smoke</span> {
    <span class="hljs-attribute">animation</span>: smoke-<span class="hljs-number">1</span> <span class="hljs-number">2s</span> infinite;
}

<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: smoke-<span class="hljs-number">2</span> <span class="hljs-number">2s</span> infinite;
}

<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: smoke-<span class="hljs-number">3</span> <span class="hljs-number">2s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> smoke-<span class="hljs-number">1</span> {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">3em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">3em</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0.5em</span>;
    }
}

@<span class="hljs-keyword">keyframes</span> smoke-<span class="hljs-number">2</span> {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">2.5em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">2.5em</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">6em</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0.8em</span>;
    }
}

@<span class="hljs-keyword">keyframes</span> smoke-<span class="hljs-number">3</span> {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">3.5em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">3.5em</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">4em</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0.2em</span>;
    }
}</code></pre><p>&#x589E;&#x52A0;&#x5C3E;&#x6C14;&#x7684;&#x98D8;&#x6563;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".smoke {
    animation:
        drift 2s infinite,
        smoke-1 2s infinite;
}

.smoke::before {
    animation: 
        drift 3s infinite,
        smoke-2 3s infinite;
}

.smoke::after {
    animation: 
        drift 4s infinite,
        smoke-3 4s infinite;
}

@keyframes drift {
    0%, 100% {
        filter: opacity(0);
    }

    15% {
        filter: opacity(0.9);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.smoke</span> {
    <span class="hljs-attribute">animation</span>:
        drift <span class="hljs-number">2s</span> infinite,
        smoke-<span class="hljs-number">1</span> <span class="hljs-number">2s</span> infinite;
}

<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: 
        drift <span class="hljs-number">3s</span> infinite,
        smoke-<span class="hljs-number">2</span> <span class="hljs-number">3s</span> infinite;
}

<span class="hljs-selector-class">.smoke</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: 
        drift <span class="hljs-number">4s</span> infinite,
        smoke-<span class="hljs-number">3</span> <span class="hljs-number">4s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> drift {
    0%, 100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    15% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.9);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x5361;&#x8F66;&#x884C;&#x9A76;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".truck {
    animation: 
        move 5s infinite;
}

@keyframes move {
    0% {
        margin-left: 90%;
    }

    50% {
        margin-left: 45%;
    }

    100% {
        margin-left: 0;
    }

    0%, 100% {
        filter: opacity(0);
    }

    10%, 90% {
        filter: opacity(1);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.truck</span> {
    <span class="hljs-attribute">animation</span>: 
        move <span class="hljs-number">5s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> move {
    0% {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">90%</span>;
    }

    50% {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">45%</span>;
    }

    100% {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0</span>;
    }

    0%, 100% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }

    10%, 90% {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(1);
    }
}</code></pre><p>&#x589E;&#x52A0;&#x5361;&#x7247;&#x884C;&#x9A76;&#x4E2D;&#x98A0;&#x7C38;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".truck {
    animation: 
        put-put 2s infinite,
        move 10s infinite;
}

@keyframes put-put {
    0% {
        margin-top: 0;
        height: 5em;
    }

    5% {
        margin-top: -0.2em;
        height: 5.2em;
    }

    20% {
        margin-top: -0.1em;
        height: 5em;
    }

    35% {
        margin-top: 0.1em;
        height: 4.9em;
    }

    40% {
        margin-top: -0.1em;
        height: 5.1em;
    }

    60% {
        margin-top: 0.1em;
        height: 4.9em;
    }

    75% {
        margin-top: 0;
        height: 5em;
    }

    80% {
        margin-top: -0.4em;
        height: 5.2em;
    }

    100% {
        margin-top: 0.1em;
        height: 4.9em;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.truck</span> {
    <span class="hljs-attribute">animation</span>: 
        put-put <span class="hljs-number">2s</span> infinite,
        move <span class="hljs-number">10s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> put-put {
    0% {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    }

    5% {
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">0.2em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5.2em</span>;
    }

    20% {
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">0.1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    }

    35% {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4.9em</span>;
    }

    40% {
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">0.1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5.1em</span>;
    }

    60% {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4.9em</span>;
    }

    75% {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    }

    80% {
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">0.4em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">5.2em</span>;
    }

    100% {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0.1em</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4.9em</span>;
    }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：104# 视频演示如何用纯 CSS 创作一个货车 loader

## 原文链接
[https://segmentfault.com/a/1190000015982054](https://segmentfault.com/a/1190000015982054)

