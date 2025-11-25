---
title: '前端每日实战：23# 视频演示如何用纯 CSS 创作一个菜单反色填充特效' 
date: 2018-11-30 2:30:12
hidden: true
slug: 29hznk7h9r8
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbcWJO?w=500&amp;h=500" src="https://static.alili.tech/img/bVbcWJO?w=500&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">效果预览</h2>
<p>按下右侧的“点击预览”按钮可以在当前页面预览，点击链接可以全屏预览。<br><a href="https://codepen.io/comehope/pen/qYMoPo" rel="nofollow noreferrer" target="_blank">https://codepen.io/comehope/pen/qYMoPo</a><button class="btn btn-xs btn-default ml10 preview" data-url="comehope/pen/qYMoPo" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader1">可交互视频教程</h2>
<p>此视频是可以交互的，你可以随时暂停视频，编辑视频中的代码。</p>
<p>请用 chrome, safari, edge 打开观看。</p>
<p><a href="https://scrimba.com/p/pEgDAM/cE833h6" rel="nofollow noreferrer" target="_blank">https://scrimba.com/p/pEgDAM/cE833h6</a></p>
<h2 id="articleHeader2">源代码下载</h2>
<p>每日前端实战系列的全部源代码请从 github 下载：</p>
<p><a href="https://github.com/comehope/front-end-daily-challenges" rel="nofollow noreferrer" target="_blank">https://github.com/comehope/front-end-daily-challenges</a></p>
<h2 id="articleHeader3">代码解读</h2>
<p>定义 dom，用 &lt;nav&gt; 定义导航栏，但 &lt;li&gt; 中要包含一个 &lt;span&gt;：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
    <ul>
        <li><span>Home</span></li>
    </ul>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>居中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right bottom, gold, chocolate);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right bottom, gold, chocolate);
}</code></pre>
<p>设置文本样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul {
    padding: 0;
}

nav ul li {
    font-size: 40px;
    font-family: sans-serif;
    list-style-type: none;
    background-color: white;
    border: 2px solid black;
    letter-spacing: 0.1em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">font-family</span>: sans-serif;
    <span class="hljs-attribute">list-style-type</span>: none;
    <span class="hljs-attribute">background-color</span>: white;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid black;
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.1em</span>;
}</code></pre>
<p>为容器设置宽高，此处定义的变量 x 和 y 后面还会用到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --x: 5em;
    --y: 1.5em;
}

nav ul li {
    width: var(--x);
    height: var(--y);
    line-height: var(--y);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--x</span>: <span class="hljs-number">5em</span>;
    <span class="hljs-attribute">--y</span>: <span class="hljs-number">1.5em</span>;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--x);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--y);
    <span class="hljs-attribute">line-height</span>: <span class="hljs-built_in">var</span>(--y);
}</code></pre>
<p>用伪元素画出一个小球，放到菜单项左端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    position: relative;
}

nav ul li::before {
    content: '';
    position: absolute;
    height: var(--y);
    width: var(--y);
    background-color: black;
    border-radius: 50%;
    top: 0;
    left: calc(-1 * var(--y) / 2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--y);
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--y);
    <span class="hljs-attribute">background-color</span>: black;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(-1 * var(--y) / <span class="hljs-number">2</span>);
}</code></pre>
<p>用 mix-blend-mode 设置色彩混合模式，使小球覆盖的文字反色显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li span {
    color: white;
    mix-blend-mode: difference;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">mix-blend-mode</span>: difference;
}</code></pre>
<p>增加动画，使小球从左侧滚到右侧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    overflow: hidden;
}

nav ul li::before {
    transition: 0.5s ease-out;
}

nav ul li:hover::before {
    --r: calc(var(--x) * 1.2);
    height: var(--r);
    width: var(--r);
    top: calc(-1 * var(--r) / 2 + var(--y) / 2);
    left: calc(-1 * var(--r) / 2 + var(--x) / 2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.5s</span> ease-out;
}

<span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">--r</span>: <span class="hljs-built_in">calc</span>(var(--x) * <span class="hljs-number">1.2</span>);
    <span class="hljs-attribute">height</span>: <span class="hljs-built_in">var</span>(--r);
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--r);
    <span class="hljs-attribute">top</span>: <span class="hljs-built_in">calc</span>(-1 * var(--r) / <span class="hljs-number">2</span> + <span class="hljs-built_in">var</span>(--y) / <span class="hljs-number">2</span>);
    <span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(-1 * var(--r) / <span class="hljs-number">2</span> + <span class="hljs-built_in">var</span>(--x) / <span class="hljs-number">2</span>);
}</code></pre>
<p>在 dom 中添加更多的菜单项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
    <ul>
        <li><span>Home</span></li>
        <li><span>Products</span></li>
        <li><span>Services</span></li>
        <li><span>Contact</span></li>
    </ul>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">nav</span>&gt;
    &lt;<span class="hljs-selector-tag">ul</span>&gt;
        &lt;<span class="hljs-selector-tag">li</span>&gt;&lt;<span class="hljs-selector-tag">span</span>&gt;<span class="hljs-selector-tag">Home</span>&lt;/<span class="hljs-selector-tag">span</span>&gt;&lt;/<span class="hljs-selector-tag">li</span>&gt;
        &lt;<span class="hljs-selector-tag">li</span>&gt;&lt;<span class="hljs-selector-tag">span</span>&gt;<span class="hljs-selector-tag">Products</span>&lt;/<span class="hljs-selector-tag">span</span>&gt;&lt;/<span class="hljs-selector-tag">li</span>&gt;
        &lt;<span class="hljs-selector-tag">li</span>&gt;&lt;<span class="hljs-selector-tag">span</span>&gt;<span class="hljs-selector-tag">Services</span>&lt;/<span class="hljs-selector-tag">span</span>&gt;&lt;/<span class="hljs-selector-tag">li</span>&gt;
        &lt;<span class="hljs-selector-tag">li</span>&gt;&lt;<span class="hljs-selector-tag">span</span>&gt;<span class="hljs-selector-tag">Contact</span>&lt;/<span class="hljs-selector-tag">span</span>&gt;&lt;/<span class="hljs-selector-tag">li</span>&gt;
    &lt;/<span class="hljs-selector-tag">ul</span>&gt;
&lt;/<span class="hljs-selector-tag">nav</span>&gt;</code></pre>
<p>最后，设置一下菜单项之间的间距：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav ul li {
    margin: 0.5em;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.5em</span>;
}</code></pre>
<p>大功告成！</p>
<h2 id="articleHeader4">知识点</h2>
<ul>
<li>mix-blend-mode: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode</a>
</li>
<li>var(): <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/var" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/var</a>
</li>
<li>calc(): <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/calc</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每日实战：23# 视频演示如何用纯 CSS 创作一个菜单反色填充特效

## 原文链接
[https://segmentfault.com/a/1190000014876348](https://segmentfault.com/a/1190000014876348)

