---
title: '前端每日实战：16# 视频演示如何用纯 CSS 创作一个渐变色动画边框' 
date: 2018-12-01 2:30:12
hidden: true
slug: 9pnd141gzsq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbb1V0?w=500&amp;h=500" src="https://static.alili.tech/img/bVbb1V0?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/odpRKX" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/odpRKX</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/odpRKX" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/cmQV7Hd" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/cmQV7Hd</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/016-colorful-gradient-animated-border" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/016-colorful-gradient-animated-border</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，一个容器中包含一些文字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    you are my<br>
    FAVORITE
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    you are my<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    FAVORITE
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html,
body,
.box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>设置页面背景色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    background: #222;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#222</span>;
}</code></pre>
<p>设置容器和文字样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    color: white;
    font-size: 2.5em;
    width: 10em;
    height: 5em;
    background: #111;
    font-family: sans-serif;
    line-height: 1.5em;
    text-align: center;
    border-radius: 0.2em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#111</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5em</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
}</code></pre>
<p>用伪元素增加一个背板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    position: relative;
}

.box::after {
    content: '';
    position: absolute;
    width: 102%;
    height: 104%;
    background-color: orange;
    z-index: -1;
    border-radius: 0.2em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">102%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">104%</span>;
    <span class="hljs-attribute">background-color</span>: orange;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2em</span>;
}</code></pre>
<p>把背板设置为渐变色的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box::after {
    /*background-color: orange;*/
    background-image: linear-gradient(60deg, aquamarine, cornflowerblue, goldenrod, hotpink, salmon, lightgreen, sandybrown, violet);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-comment">/*background-color: orange;*/</span>
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(60deg, aquamarine, cornflowerblue, goldenrod, hotpink, salmon, lightgreen, sandybrown, violet);
}</code></pre>
<p>为背板设置动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box::after {
    background-size: 300%, 300%;
    animation: animate_bg 5s ease infinite alternate;
}

@keyframes animate_bg {
    0% {
        background-position: 0%, 50%;
    }

    50% {
        background-position: 100%, 50%;
    }

    100% {
        background-position: 0%, 50%;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">300%</span>, <span class="hljs-number">300%</span>;
    <span class="hljs-attribute">animation</span>: animate_bg <span class="hljs-number">5s</span> ease infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> animate_bg {
    0% {
        <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0%</span>, <span class="hljs-number">50%</span>;
    }

    50% {
        <span class="hljs-attribute">background-position</span>: <span class="hljs-number">100%</span>, <span class="hljs-number">50%</span>;
    }

    100% {
        <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0%</span>, <span class="hljs-number">50%</span>;
    }
}</code></pre>
<p>最后，再为文字增加变色效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    animation: animate_text 2s linear infinite alternate;
}

@keyframes animate_text {
    from {
        color: lime;
    }

    to {
        color: yellow;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">animation</span>: animate_text <span class="hljs-number">2s</span> linear infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> animate_text {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">color</span>: lime;
    }

    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">color</span>: yellow;
    }
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>z-index <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/z-index</a>
</li>
<li>background-image <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-image" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-image</a>
</li>
<li>background-size <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-size</a>
</li>
<li>background-position <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-position" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/background-position</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：16# 视频演示如何用纯 CSS 创作一个渐变色动画边框

## 原文链接
[https://segmentfault.com/a/1190000014785816](https://segmentfault.com/a/1190000014785816)

