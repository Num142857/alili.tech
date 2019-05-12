---
title: '前端每日实战：29# 视频演示如何不用 transition 和 animation 也能做网页动画' 
date: 2018-11-29 9:34:56
hidden: true
slug: wkpsstvau
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbbytf?w=500&amp;h=500" src="https://static.alili.tech/img/bVbbytf?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。</p>
<p><a href="https://codepen.io/comehope/pen/BxbQJj" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/BxbQJj</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/BxbQJj" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/c/crvq8hq" rel="nofollow noreferrer" target="_blank">https://scrimba.com/c/crvq8hq</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，一个容器中包含 4 个子元素，每个子元素的内容就是一堆斜线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;frame&quot;>
    <div class=&quot;wall top&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall right&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall bottom&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall left&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"frame"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall top"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall right"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall bottom"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>定义容器尺寸：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".frame {
    width: 100vmin;
    height: 100vmin;
    background-color: whitesmoke;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.frame</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100vmin</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vmin</span>;
    <span class="hljs-attribute">background-color</span>: whitesmoke;
}</code></pre>
<p>隐藏超出容器的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>把 4 个元素向四个方向旋转，互相垂直：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    transform-origin: 0 0;
}

.wall.top {
    transform: rotate(0deg);
}

.wall.right {
    transform: rotate(90deg);
}

.wall.bottom {
    transform: rotate(180deg);
}

.wall.left {
    transform: rotate(270deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.bottom</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(270deg);
}</code></pre>
<p>定位它们，形成一个正方形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".frame {
    position: relative;
}

.wall {
    position: absolute;
    width: 100%;
}

.wall.top {
    top: 0;
    left: 0;
}

.wall.right {
    top: 0;
    left: 100%;
}

.wall.bottom {
    top: 100%;
    left: 100%;
}

.wall.left {
    top: 100%;
    left: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.frame</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.bottom</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>对 4 个元素进行 3d 旋转：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".frame {
    perspective: 40vmin;
}

.wall.top {
    transform: rotate(0deg) rotateX(-90deg);
}

.wall.right {
    transform: rotate(90deg) rotateX(-90deg);
}

.wall.bottom {
    transform: rotate(180deg) rotateX(-90deg);
}

.wall.left {
    transform: rotate(270deg) rotateX(-90deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.frame</span> {
    <span class="hljs-attribute">perspective</span>: <span class="hljs-number">40vmin</span>;
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.top</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg) <span class="hljs-built_in">rotateX</span>(-90deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.right</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg) <span class="hljs-built_in">rotateX</span>(-90deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.bottom</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg) <span class="hljs-built_in">rotateX</span>(-90deg);
}

<span class="hljs-selector-class">.wall</span><span class="hljs-selector-class">.left</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(270deg) <span class="hljs-built_in">rotateX</span>(-90deg);
}</code></pre>
<p>把斜线加粗、放大：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wall {
    font-size: 75vmin;
    font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wall</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">75vmin</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>最后，把 dom 中的斜线用 &lt;marquee&gt; 标签包围起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;frame&quot;>
    <div class=&quot;wall top&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall right&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall bottom&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
    <div class=&quot;wall left&quot;><marquee>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</marquee></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"frame"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall top"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall right"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall bottom"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wall left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span>&gt;</span>////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>大功告成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：29# 视频演示如何不用 transition 和 animation 也能做网页动画

## 原文链接
[https://segmentfault.com/a/1190000014964220](https://segmentfault.com/a/1190000014964220)

