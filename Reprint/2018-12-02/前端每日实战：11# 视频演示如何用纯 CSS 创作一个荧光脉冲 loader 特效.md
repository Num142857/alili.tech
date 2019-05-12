---
title: '前端每日实战：11# 视频演示如何用纯 CSS 创作一个荧光脉冲 loader 特效' 
date: 2018-12-02 2:30:15
hidden: true
slug: d69wqwlujqu
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbb1VP?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb1VP?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/erRzzR" rel="nofollow noreferrer" target="_blank">https://codepen.io/zhang-ou/pen/erRzzR</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhang-ou/pen/erRzzR" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cwrJys7" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cwrJys7</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/011-ripple-pulse-loader-animation" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/011-ripple-pulse-loader-animation</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，只有一个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;circle&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"circle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,
body,
.circle {
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
<span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>画出中间的实心圆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --innerRadius: 2em;
}

.circle {
    width: calc(var(--innerRadius) * 2);
    height: calc(var(--innerRadius) * 2);
    background-color: lime;
    border-radius: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--innerRadius</span>: <span class="hljs-number">2em</span>;
}

<span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">background-color</span>: lime;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>画出圆环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle {
    box-shadow: 0 0 0 calc(var(--innerRadius) - 0.4em) black,
                0 0 0 var(--innerRadius) lime;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(var(--innerRadius) - <span class="hljs-number">0.4em</span>) black,
                <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">var</span>(--innerRadius) lime;
}</code></pre>
<p>用伪元素 ::before 画出动画用到的圆环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle::before {
    content: '';
    position: absolute;
    width: calc(var(--innerRadius) * 2 * 2);
    height: calc(var(--innerRadius) * 2 * 2);
    border: 2px solid lime;
    border-radius: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid lime;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>增加动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle::before
    animation: pulse 2s linear infinite;
}

@keyframes pulse {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(2);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span>
    <span class="hljs-selector-tag">animation</span>: <span class="hljs-selector-tag">pulse</span> 2<span class="hljs-selector-tag">s</span> <span class="hljs-selector-tag">linear</span> <span class="hljs-selector-tag">infinite</span>;
}

@<span class="hljs-keyword">keyframes</span> pulse {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
    }
}</code></pre>
<p>优化动画——增加渐淡和弹性效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle::before
    animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
    from {
        filter: opacity(0.9);
    }

    to {
        filter: opacity(0);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span>
    <span class="hljs-selector-tag">animation</span>: <span class="hljs-selector-tag">pulse</span> 2<span class="hljs-selector-tag">s</span> <span class="hljs-selector-tag">ease-out</span> <span class="hljs-selector-tag">infinite</span>;
}

@<span class="hljs-keyword">keyframes</span> pulse {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.9);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0);
    }
}</code></pre>
<p>最后，用伪元素 ::after 再画出一个动的圆环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle::after {
    content: '';
    position: absolute;
    width: calc(var(--innerRadius) * 2 * 2);
    height: calc(var(--innerRadius) * 2 * 2);
    border: 2px solid lime;
    border-radius: 50%;
    animation: pulse 2s ease-out infinite;
}

.circle::after {
    animation-delay: 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">calc</span>(var(--innerRadius) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>);
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid lime;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">animation</span>: pulse <span class="hljs-number">2s</span> ease-out infinite;
}

<span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">1s</span>;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>variables <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Variables" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Variables</a>
</li>
<li>calc() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
<li>animation-timing-function <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function</a>
</li>
<li>filter <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Functions" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Functions</a>
</li>
<li>box-shadow <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：11# 视频演示如何用纯 CSS 创作一个荧光脉冲 loader 特效

## 原文链接
[https://segmentfault.com/a/1190000014700727](https://segmentfault.com/a/1190000014700727)

