---
title: '前端每日实战：12# 视频演示如何用纯 CSS 创作一种文字断开的交互特效' 
date: 2018-12-02 2:30:15
hidden: true
slug: ze64skd5fb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbfmHS?w=400&amp;h=303" src="https://static.alili.tech/img/bVbfmHS?w=400&amp;h=303" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮在当前页面预览，点击链接全屏预览。</p>
<p><a href="https://codepen.io/zhang-ou/pen/LmjNgL" rel="nofollow noreferrer" target="_blank">https://codepen.io/zhang-ou/pen/LmjNgL</a><button class="btn btn-xs btn-default ml10 preview" data-url="zhang-ou/pen/LmjNgL" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p><strong>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</strong></p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/c2EvWHN" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/c2EvWHN</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>请从 github 下载。</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges/tree/master/012-broken-text-effects" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges/tree/master/012-broken-text-effects</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，只有一个元素，元素有一个 data-text 属性，属性值等于元素内的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;text&quot; data-text=&quot;BREAK&quot;>BREAK</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">data-text</span>=<span class="hljs-string">"BREAK"</span>&gt;</span>BREAK<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>设置渐变背景色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    background: linear-gradient(brown, sandybrown);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(brown, sandybrown);
}</code></pre>
<p>设置文本的字体字号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    font-size: 5em;
    font-family: &quot;arial black&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"arial black"</span>;
}</code></pre>
<p>利用伪元素增加文字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    position: relative;
}

.text::before,
.text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: lightyellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-text);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">color</span>: lightyellow;
}</code></pre>
<p>设置左侧文字的遮罩：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text::before {
    background-color: darkgreen;
    clip-path: polygon(0 0, 60% 0, 30% 100%, 0 100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">background-color</span>: darkgreen;
    <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(0 0, 60% 0, 30% 100%, 0 100%);
}</code></pre>
<p>设置右侧文字的背景和遮罩：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text::after {
    background-color: darkblue;
    clip-path: polygon(60% 0, 100% 0, 100% 100%, 30% 100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">background-color</span>: darkblue;
    <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(60% 0, 100% 0, 100% 100%, 30% 100%);
}</code></pre>
<p>当鼠标划过时，遮罩的文字分别向两侧偏移：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text::before,
.text::after {
    transition: 0.2s;
}

.text:hover::before {
    left: -0.15em;
}

.text:hover::after {
    left: 0.15em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::before</span>,
<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.2s</span>;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">0.15em</span>;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0.15em</span>;
}</code></pre>
<p>隐藏辅助元素，包括原始文字和伪元素的背景色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text {
    color: transparent;
}

.text::before {
    /*background-color: darkgreen;*/
}

.text::after {
    /*background-color: darkblue;*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">color</span>: transparent;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-comment">/*background-color: darkgreen;*/</span>
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-comment">/*background-color: darkblue;*/</span>
}</code></pre>
<p>两侧文字增加歪斜效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text:hover::before {
    transform: rotate(-5deg);
}

.text:hover::after {
    transform: rotate(5deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
}</code></pre>
<p>微调文字的高度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text:hover::before {
    top: -0.05em;
}

.text:hover::after {
    top: 0.05em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.05em</span>;
}

<span class="hljs-selector-class">.text</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0.05em</span>;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>data-* <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-%2A" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*</a>
</li>
<li>clip-path <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path</a>
</li>
<li>shape functions <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape#Syntax" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape#Syntax</a>
</li>
<li>rotate() <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate</a>
</li>
<li>::before <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/::before</a>
</li>
<li>::after <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::after" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/::after</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：12# 视频演示如何用纯 CSS 创作一种文字断开的交互特效

## 原文链接
[https://segmentfault.com/a/1190000014719591](https://segmentfault.com/a/1190000014719591)

