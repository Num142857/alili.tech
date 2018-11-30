---
title: '前端每日实战：17# 视频演示如何用纯 CSS 创作炫酷的同心矩形旋转动画' 
date: 2018-12-01 2:30:12
hidden: true
slug: 479l5kxqljr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbyrX?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbyrX?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/bMvbRp" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/bMvbRp</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/bMvbRp" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/p/pEgDAM/cp2dZcQ" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cp2dZcQ</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/017-swapping-colors-loader-animation" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/017-swapping-colors-loader-animation</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，一个容器中包含一个 span：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;loader&quot;>
    <span></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loader"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,
body,
.loader {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>设置 span 的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader {
    width: 10em;
    height: 10em;
    font-size: 28px;
    position: relative;
}

.loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(100%, 0%, 0%, 0.3);
    box-sizing: border-box;
    border: 0.5em solid;
    border-color: white rgba(100%, 100%, 100%, 0.2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28px</span>;
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100%, 0%, 0%, 0.3);
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5em</span> solid;
    <span class="hljs-attribute">border-color</span>: white <span class="hljs-built_in">rgba</span>(100%, 100%, 100%, 0.2);
}</code></pre>
<p>在 dom 中把 span 增加到 5 个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;loader&quot;>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"loader"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>分别设置 5 个 span 的尺寸：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:nth-child(1) {
    width: calc(20% + 20% * (5 - 1));
    height: calc(20% + 20% * (5 - 1));
}

.loader span:nth-child(2) {
    width: calc(20% + 20% * (5 - 2));
    height: calc(20% + 20% * (5 - 2));
}

.loader span:nth-child(3) {
    width: calc(20% + 20% * (5 - 3));
    height: calc(20% + 20% * (5 - 3));
}

.loader span:nth-child(4) {
    width: calc(20% + 20% * (5 - 4));
    height: calc(20% + 20% * (5 - 4));
}

.loader span:nth-child(5) {
    width: calc(20% + 20% * (5 - 5));
    height: calc(20% + 20% * (5 - 5));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 1));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 1));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 2));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 2));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 3));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 3));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 4));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 4));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 5));
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(20% + 20% * (5 - 5));
}</code></pre>
<p>增加颜色变幻的动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span {
    animation: animate 5s ease-in-out infinite alternate;
}

@keyframes animate {
    0% {
        /* red */
        background-color: rgba(100%, 0%, 0%, 0.3);
    }

    25% {
        /* yellow */
        background-color: rgba(100%, 100%, 0%, 0.3);
    }

    50% {
        /* green */
        background-color: rgba(0%, 100%, 0%, 0.3);
    }

    75% {
        /* blue */
        background-color: rgba(0%, 0%, 100%, 0.3);
    }

    100% {
        /* purple */
        background-color: rgba(100%, 0%, 100%, 0.3);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">5s</span> ease-in-out infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> animate {
    0% {
        <span class="hljs-comment">/* red */</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100%, 0%, 0%, 0.3);
    }

    25% {
        <span class="hljs-comment">/* yellow */</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100%, 100%, 0%, 0.3);
    }

    50% {
        <span class="hljs-comment">/* green */</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0%, 100%, 0%, 0.3);
    }

    75% {
        <span class="hljs-comment">/* blue */</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0%, 0%, 100%, 0.3);
    }

    100% {
        <span class="hljs-comment">/* purple */</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100%, 0%, 100%, 0.3);
    }
}</code></pre>
<p>再增加旋转效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(720deg);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> animate {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(720deg);
    }
}</code></pre>
<p>最后，为每个 span 设置动画延时，增加动感：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".loader span:nth-child(1) {
    animation-delay: calc(0.2s * (5 - 1));
}

.loader span:nth-child(2) {
    animation-delay: calc(0.2s * (5 - 2));
}

.loader span:nth-child(3) {
    animation-delay: calc(0.2s * (5 - 3));
}

.loader span:nth-child(4) {
    animation-delay: calc(0.2s * (5 - 4));
}

.loader span:nth-child(5) {
    animation-delay: calc(0.2s * (5 - 5));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.2s * (5 - 1));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.2s * (5 - 2));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.2s * (5 - 3));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.2s * (5 - 4));
}

<span class="hljs-selector-class">.loader</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-built_in">calc</span>(0.2s * (5 - 5));
}</code></pre>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>border-color <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-color" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-color</a>
</li>
<li>calc() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
<li>rotate() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate</a>
</li>
<li>animation-delay <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：17# 视频演示如何用纯 CSS 创作炫酷的同心矩形旋转动画

## 原文链接
[https://segmentfault.com/a/1190000014807564](https://segmentfault.com/a/1190000014807564)

