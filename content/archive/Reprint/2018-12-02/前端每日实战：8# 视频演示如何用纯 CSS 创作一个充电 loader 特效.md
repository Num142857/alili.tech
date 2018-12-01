---
title: '前端每日实战：8# 视频演示如何用纯 CSS 创作一个充电 loader 特效' 
date: 2018-12-02 2:30:16
hidden: true
slug: wpjc9i7s72
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWRr?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWRr?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/deNqdV" rel="nofollow noreferrer" target="_blank">https://codepen.io/zhang-ou/pen/deNqdV</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhang-ou/pen/deNqdV" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cvrwJAK" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cvrwJAK</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/008-charging-loader-animation" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/008-charging-loader-animation</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，只有一个容器元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;battery&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"battery"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, teal, aqua);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to bottom, teal, aqua);
}</code></pre>
<p>画出电池的主体轮廓：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".battery {
    width: 6em;
    height: 3em;
    color: midnightblue;
    border: 0.5em solid currentColor;
    border-radius: 0.2em;
    font-size: 2em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.battery</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
    <span class="hljs-attribute">color</span>: midnightblue;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5em</span> solid currentColor;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
}</code></pre>
<p>画出电池的突起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".battery {
    position: relative;
}

.battery::after {
    content: '';
    position: absolute;
    width: 0.5em;
    height: 2em;
    background-color: currentColor;
    top: 0.5em;
    right: -1em;
    border-radius: 0 0.2em 0.2em 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.battery</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.battery</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>: currentColor;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0.2em</span> <span class="hljs-number">0.2em</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>画出充电电量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".battery {
    background-image: linear-gradient(to right, whitesmoke, whitesmoke);
    background-repeat: no-repeat;
    background-size: 30% 80%;
    background-position: 0.3em 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.battery</span> {
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(to right, whitesmoke, whitesmoke);
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">30%</span> <span class="hljs-number">80%</span>;
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0.3em</span> <span class="hljs-number">50%</span>;
}</code></pre>
<p>定义和应用动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes charge {
    from {
        background-size: 10% 80%;
    }

    to {
        background-size: 95% 80%;
    }
}

.battery {
    animation: charge 5s linear infinite;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> charge {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">10%</span> <span class="hljs-number">80%</span>;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">95%</span> <span class="hljs-number">80%</span>;
    }
}

<span class="hljs-selector-class">.battery</span> {
    <span class="hljs-attribute">animation</span>: charge <span class="hljs-number">5s</span> linear infinite;
}</code></pre>
<p>最后，把动画的时间函数由线性变化改为步长变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".battery {
    animation: charge 5s steps(8) infinite;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.battery</span> {
    <span class="hljs-attribute">animation</span>: charge <span class="hljs-number">5s</span> <span class="hljs-built_in">steps</span>(8) infinite;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<p>linear-gradient() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient</a></p>
<p>background-size <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-size</a></p>
<p>background-position <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-position" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-position</a></p>
<p>steps() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Timing_functions" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Timing_functions</a></p>
<p>currentColor <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Values" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Values</a></p>
<p>border-radius <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：8# 视频演示如何用纯 CSS 创作一个充电 loader 特效

## 原文链接
[https://segmentfault.com/a/1190000014669547](https://segmentfault.com/a/1190000014669547)

