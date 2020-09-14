---
title: '前端每日实战：10# 视频演示如何用纯 CSS 创作一个同心圆弧旋转 loader 特效' 
date: 2018-12-02 2:30:15
hidden: true
slug: kdf0dvvyy3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbb1Vy?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb1Vy?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/OZmXQX" rel="nofollow noreferrer" target="_blank">https://codepen.io/zhang-ou/pen/OZmXQX</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhang-ou/pen/OZmXQX" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cPdWVuD" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cPdWVuD</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/010-concentric-arc-rotating-loader-animation" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/010-concentric-arc-rotating-loader-animation</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，只包含一个元素：</p>
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
<p>一共画三层圆弧，先画最外一层的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle {
    width: 10em;
    height: 10em;
    border-width: 0.4em;
    border-style: solid;
    border-radius: 50%;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: red;
    border-bottom-color: blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: transparent;
    <span class="hljs-attribute">border-right-color</span>: transparent;
    <span class="hljs-attribute">border-top-color</span>: red;
    <span class="hljs-attribute">border-bottom-color</span>: blue;
}</code></pre>
<p>再用伪元素画中间一层的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle {
    position: relative;
}

.circle::before {
    content: '';
    position: absolute;
    width: 75%;
    height: 75%;
    border-width: 0.4em;
    border-style: solid;
    border-radius: 50%;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: orange;
    border-bottom-color: cyan;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">75%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">75%</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: transparent;
    <span class="hljs-attribute">border-right-color</span>: transparent;
    <span class="hljs-attribute">border-top-color</span>: orange;
    <span class="hljs-attribute">border-bottom-color</span>: cyan;
}</code></pre>
<p>再用伪元素画最内一层的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle::before {
    content: '';
    position: absolute;
    width: 75%;
    height: 75%;
    border-width: 0.4em;
    border-style: solid;
    border-radius: 50%;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: yellow;
    border-bottom-color: limegreen;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">75%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">75%</span>;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left-color</span>: transparent;
    <span class="hljs-attribute">border-right-color</span>: transparent;
    <span class="hljs-attribute">border-top-color</span>: yellow;
    <span class="hljs-attribute">border-bottom-color</span>: limegreen;
}</code></pre>
<p>定义动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes animate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(1440deg);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> animate {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1440deg);
    }
}</code></pre>
<p>最后，应用动画效果到每层：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle {
    animation: animate 4s ease-in-out infinite alternate;
}

.circle::before {
    animation: animate 8s ease-in-out infinite alternate;
}

.circle::after {
    animation: animate 16s ease-in-out infinite alternate;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.circle</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">4s</span> ease-in-out infinite alternate;
}

<span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">8s</span> ease-in-out infinite alternate;
}

<span class="hljs-selector-class">.circle</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">animation</span>: animate <span class="hljs-number">16s</span> ease-in-out infinite alternate;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>border-left-color <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color</a>
</li>
<li>border-right-color <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color</a>
</li>
<li>border-top-color <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color</a>
</li>
<li>border-bottom-color <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-color" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-color</a>
</li>
<li>animation-duration <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：10# 视频演示如何用纯 CSS 创作一个同心圆弧旋转 loader 特效

## 原文链接
[https://segmentfault.com/a/1190000014682999](https://segmentfault.com/a/1190000014682999)

