---
title: '前端每日实战：24# 视频演示如何用纯 CSS 创作出平滑的层叠海浪特效' 
date: 2018-11-30 2:30:11
hidden: true
slug: s64lmhj4bu
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbytV?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbytV?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/JvmBdE" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/JvmBdE</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/JvmBdE" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/p/pEgDAM/cp2edUD" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cp2edUD</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，容器中包含一行文本和3条做海浪特效的 &lt;span&gt;：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;sea&quot;>
    <p class=&quot;title&quot;>the sea</p>
    <span class=&quot;wave&quot;></span>
    <span class=&quot;wave&quot;></span>
    <span class=&quot;wave&quot;></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sea"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>the sea<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wave"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wave"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wave"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(antiquewhite, navajowhite);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(antiquewhite, navajowhite);
}</code></pre>
<p>设置容器样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sea {
    width: 300px;
    height: 300px;
    background-color: whitesmoke;
    background-image: linear-gradient(
        darkblue,
        rgba(255, 255, 255, 0) 80%,
        rgba(255, 255, 255, 0.5));
    border-radius: 5px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sea</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">background-color</span>: whitesmoke;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(
        darkblue,
        rgba(255, 255, 255, 0) <span class="hljs-number">80%</span>,
        <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5));
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">30px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2);
}</code></pre>
<p>设置文字样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sea {
    position: relative;
}

.sea .title {
    color: white;
    font-size: 24px;
    font-family: serif;
    text-align: center;
    line-height: 250px;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    position: absolute;
    z-index: 1;
    width: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sea</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">font-family</span>: serif;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">250px</span>;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.4em</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p>制作海浪动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sea .wave {
    position: absolute;
    top: -250px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: deepskyblue;
    border-radius: 43%;
    filter: opacity(0.4);
    animation: drift linear infinite;
}

.sea .wave:nth-of-type(1) {
    animation-duration: 5s;
}

.sea .wave:nth-of-type(2) {
    animation-duration: 7s;
}

.sea .wave:nth-of-type(3) {
    animation-duration: 9s;
}

@keyframes drift {
    from {
        transform: rotate(360deg);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">250px</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">background</span>: deepskyblue;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">43%</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.4);
    <span class="hljs-attribute">animation</span>: drift linear infinite;
}

<span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span><span class="hljs-selector-pseudo">:nth-of-type(1)</span> {
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">5s</span>;
}

<span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span><span class="hljs-selector-pseudo">:nth-of-type(2)</span> {
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">7s</span>;
}

<span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span> {
    <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">9s</span>;
}

@<span class="hljs-keyword">keyframes</span> drift {
    <span class="hljs-selector-tag">from</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    }
}</code></pre>
<p>加大海浪的波动幅度，增加颜色差异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sea .wave {
    transform-origin: 50% 48%;
}

.sea .wave:nth-of-type(3) {
    background-color: orangered;
    filter: opacity(0.1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">48%</span>;
}

<span class="hljs-selector-class">.sea</span> <span class="hljs-selector-class">.wave</span><span class="hljs-selector-pseudo">:nth-of-type(3)</span> {
    <span class="hljs-attribute">background-color</span>: orangered;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">opacity</span>(0.1);
}</code></pre>
<p>最后，隐藏容器外的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sea {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sea</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>大功告成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：24# 视频演示如何用纯 CSS 创作出平滑的层叠海浪特效

## 原文链接
[https://segmentfault.com/a/1190000014895634](https://segmentfault.com/a/1190000014895634)

