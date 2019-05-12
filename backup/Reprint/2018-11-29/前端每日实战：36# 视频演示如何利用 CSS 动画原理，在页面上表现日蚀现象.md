---
title: '前端每日实战：36# 视频演示如何利用 CSS 动画原理，在页面上表现日蚀现象' 
date: 2018-11-29 9:33:05
hidden: true
slug: qzsgjjuifjo
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbboHk?w=500&amp;h=500" src="https://static.alili.tech/img/bVbboHk?w=500&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">&#x6548;&#x679C;&#x9884;&#x89C8;</h2>
<p>&#x6309;&#x4E0B;&#x53F3;&#x4FA7;&#x7684;&#x201C;&#x70B9;&#x51FB;&#x9884;&#x89C8;&#x201D;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x9884;&#x89C8;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x53EF;&#x4EE5;&#x5168;&#x5C4F;&#x9884;&#x89C8;&#x3002;</p>
<p><a href="https://codepen.io/comehope/pen/OELvrK" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/OELvrK</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/OELvrK" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
<h2 id="articleHeader1">&#x53EF;&#x4EA4;&#x4E92;&#x89C6;&#x9891;&#x6559;&#x7A0B;</h2>
<p>&#x6B64;&#x89C6;&#x9891;&#x662F;&#x53EF;&#x4EE5;&#x4EA4;&#x4E92;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x6682;&#x505C;&#x89C6;&#x9891;&#xFF0C;&#x7F16;&#x8F91;&#x89C6;&#x9891;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8BF7;&#x7528; chrome, safari, edge &#x6253;&#x5F00;&#x89C2;&#x770B;&#x3002;</p>
<p><a href="https://scrimba.com/p/pEgDAM/cgnzMAz" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cgnzMAz</a></p>
<h2 id="articleHeader2">&#x6E90;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;</h2>
<p>&#x6BCF;&#x65E5;&#x524D;&#x7AEF;&#x5B9E;&#x6218;&#x7CFB;&#x5217;&#x7684;&#x5168;&#x90E8;&#x6E90;&#x4EE3;&#x7801;&#x8BF7;&#x4ECE; github &#x4E0B;&#x8F7D;&#xFF1A;</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">&#x4EE3;&#x7801;&#x89E3;&#x8BFB;</h2>
<p>&#x5B9A;&#x4E49; dom&#xFF0C;&#x4E00;&#x4E2A;&#x540D;&#x4E3A; sky &#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x4E2A; sun &#x5143;&#x7D20;&#x548C;&#x4E00;&#x4E2A; moon &#x5143;&#x7D20;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;sky&quot;&gt;
    &lt;div class=&quot;sun&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;moon&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sky&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sun&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;moon&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x753B;&#x51FA;&#x5929;&#x7A7A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    margin: 0;
}

.sky {
    width: 100vw;
    height: 100vh;
    background-color: skyblue;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.sky</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">background-color</span>: skyblue;
}</code></pre>
<p>&#x753B;&#x51FA;&#x592A;&#x9633;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sky {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.sun {
    position: absolute;
    width: 50vmin;
    height: 50vmin;
    border-radius: 50%;
    background-color: gold;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sky</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.sun</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50vmin</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: gold;
}</code></pre>
<p>&#x753B;&#x51FA;&#x6708;&#x4EAE;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".moon {
    position: absolute;
    width: 50vmin;
    height: 50vmin;
    border-radius: 50%;
    background-color: slategray;
    transform: translateX(-55vmin);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.moon</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50vmin</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: slategray;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-55vmin);
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x5929;&#x7A7A;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5F53;&#x65E5;&#x8680;&#x6765;&#x4E34;&#x65F6;&#x5929;&#x7A7A;&#x4F1A;&#x53D8;&#x9ED1;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes animate-sky {
    50% {
        background-color: black;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> animate-sky {
    50% {
        <span class="hljs-attribute">background-color</span>: black;
    }
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x592A;&#x9633;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5F53;&#x65E5;&#x8680;&#x6765;&#x4E34;&#x65F6;&#x592A;&#x9633;&#x867D;&#x4F1A;&#x88AB;&#x906E;&#x6321;&#xFF0C;&#x4F46;&#x5149;&#x6655;&#x4ECD;&#x4F1A;&#x900F;&#x51FA;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes animate-sun {
    50% {
        box-shadow: 0 0 5em 1em white;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> animate-sun {
    50% {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5em</span> <span class="hljs-number">1em</span> white;
    }
}</code></pre>
<p>&#x5B9A;&#x4E49;&#x6708;&#x4EAE;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x5F53;&#x5B83;&#x8FD0;&#x52A8;&#x5230;&#x548C;&#x592A;&#x9633;&#x91CD;&#x53E0;&#x7684;&#x4F4D;&#x7F6E;&#x65F6;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x5149;&#xFF0C;&#x5C31;&#x770B;&#x4E0D;&#x5230;&#x5B83;&#x7684;&#x989C;&#x8272;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes animate-moon {
    from {
        transform: translateX(-100vmin);
    }

    50% {
        background-color: black;
    }

    to {
        transform: translateX(100vmin);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> animate-moon {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-100vmin);
    }

    50% {
        <span class="hljs-attribute">background-color</span>: black;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(100vmin);
    }
}</code></pre>
<p>&#x628A;&#x52A8;&#x753B;&#x5E94;&#x7528;&#x5230;&#x5143;&#x7D20;&#x4E0A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sky,
.sun,
.moon {
    animation: 10s linear infinite;
}

.sky {
    animation-name: animate-sky;
}

.sun {
    animation-name: animate-sun;
}

.moon {
    animation-name: animate-moon;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sky</span>,
<span class="hljs-selector-class">.sun</span>,
<span class="hljs-selector-class">.moon</span> {
    <span class="hljs-attribute">animation</span>: <span class="hljs-number">10s</span> linear infinite;
}

<span class="hljs-selector-class">.sky</span> {
    <span class="hljs-attribute">animation-name</span>: animate-sky;
}

<span class="hljs-selector-class">.sun</span> {
    <span class="hljs-attribute">animation-name</span>: animate-sun;
}

<span class="hljs-selector-class">.moon</span> {
    <span class="hljs-attribute">animation-name</span>: animate-moon;
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x9690;&#x85CF;&#x6EDA;&#x52A8;&#x6761;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sky {
    overflow: hidden;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sky</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>&#x5927;&#x529F;&#x544A;&#x6210;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：36# 视频演示如何利用 CSS 动画原理，在页面上表现日蚀现象

## 原文链接
[https://segmentfault.com/a/1190000015070543](https://segmentfault.com/a/1190000015070543)

