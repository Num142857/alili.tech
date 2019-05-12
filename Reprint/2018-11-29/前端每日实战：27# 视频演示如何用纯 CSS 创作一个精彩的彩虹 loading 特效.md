---
title: '前端每日实战：27# 视频演示如何用纯 CSS 创作一个精彩的彩虹 loading 特效' 
date: 2018-11-29 9:34:56
hidden: true
slug: mvatow3luan
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbytK?w=500&amp;h=441" src="https://static.alili.tech/img/bVbbytK?w=500&amp;h=441" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/vjvoow" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/vjvoow</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/vjvoow" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/p/pEgDAM/cPLGLhV" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cPLGLhV</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;rainbow&quot;>
    <div class=&quot;bows&quot;>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rainbow"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bows"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body, .bows {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-class">.bows</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: black;
}</code></pre>
<p>定义彩虹的尺寸：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow {
    width: 20em;
    height: 10em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
}</code></pre>
<p>定义彩虹内拱形的尺寸：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bows {
    width: 100%;
    height: 200%;
    position: relative;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bows</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200%</span>;
    <span class="hljs-attribute">position</span>: relative;
}</code></pre>
<p>定义彩虹内所有拱形共有的特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bows {
    transform: rotate(225deg);
}

.bows span {
    position: absolute;
    width: calc(100% - 2em * (var(--n) - 1));
    height: calc(100% - 2em * (var(--n) - 1));
    border: 1em solid var(--color);
    box-sizing: border-box;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bows</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(225deg);
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(100% - 2em * (var(--n) - <span class="hljs-number">1</span>));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(100% - 2em * (var(--n) - <span class="hljs-number">1</span>));
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1em</span> solid <span class="hljs-built_in">var</span>(--color);
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">border-top-color</span>: transparent;
    <span class="hljs-attribute">border-left-color</span>: transparent;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>分别设置每个拱形的个性变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bows span:nth-child(1) {
    --n: 1;
    --color: orangered;
}

.bows span:nth-child(2) {
    --n: 2;
    --color: orange;
}

.bows span:nth-child(3) {
  --n: 3;
  --color: yellow;
}

.bows span:nth-child(4) {
  --n: 4;
  --color: mediumspringgreen;
}

.bows span:nth-child(5) {
  --n: 5;
  --color: deepskyblue;
}

.bows span:nth-child(6) {
  --n: 6;
  --color: mediumpurple;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">--color</span>: orangered;
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">--n</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">--color</span>: orange;
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">3</span>;
  <span class="hljs-attribute">--color</span>: yellow;
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">4</span>;
  <span class="hljs-attribute">--color</span>: mediumspringgreen;
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">5</span>;
  <span class="hljs-attribute">--color</span>: deepskyblue;
}

<span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
  <span class="hljs-attribute">--n</span>: <span class="hljs-number">6</span>;
  <span class="hljs-attribute">--color</span>: mediumpurple;
}</code></pre>
<p>定义动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bows span {
    animation: rotating 3s infinite;
    animation-delay: calc(0.05s * var(--n));
}

@keyframes rotating {
    0%, 20% {
        transform: rotate(0deg);
    }

    80%, 100% {
        transform: rotate(360deg);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bows</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: rotating <span class="hljs-number">3s</span> infinite;
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.05s * var(--n));
}

@<span class="hljs-keyword">keyframes</span> rotating {
    0%, 20% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    80%, 100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    }
}</code></pre>
<p>最后，隐藏掉容器之外的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rainbow {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rainbow</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>大功告成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：27# 视频演示如何用纯 CSS 创作一个精彩的彩虹 loading 特效

## 原文链接
[https://segmentfault.com/a/1190000014939781](https://segmentfault.com/a/1190000014939781)

