---
title: '[译] Grid 布局完全指南' 
date: 2019-01-27 2:30:59
hidden: true
slug: kgrwh2son38
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><a>简介</a></h2>
<p>CSS 栅格布局 (亦称 "Grid")，是一个基于栅格的二维布局系统，旨在彻底改变基于网格用户界面的设计。CSS 一直以来并没有把布局做的足够好。刚开始，我们使用 tables，后来是 floats，positioning 和 inline-block，这些本质上是一些 hacks 而且许多重要功能尚未解决（例如垂直居中）。Flexbox 可以做到这些，但是它主要用来一些简单的一维布局，并不适合复杂的二维布局（当然 Flexbox 与 Grid 可以一并使用）。Grid 是第一个为了解决布局问题的 CSS 模块，只要我们做过网页，就会遇到这些问题。</p>
<p>有两件事情在激励着我创作这篇指南，首先是 Rachel Andrew 那本非常不错的书 <a href="http://abookapart.com/products/get-ready-for-css-grid-layout" rel="nofollow noreferrer" target="_blank">Get Ready for CSS Grid Layout.</a>，清晰透彻地介绍了 Grid，它是本篇文章的基础。我<strong>强烈建议</strong>你去购买并且阅读它。另一件事是 Chris Coyier 的文章 <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">A Complete Guide to Flexbox</a>，是关于 flexbox 的首选资源。它帮助了很多人，当你 Google "flexbox" 的时候，第一眼便能够看见它。或许你已经注意到我的文章与它有很大相似之处，但我们有什么理由不借鉴它呢？</p>
<p>我会把 Grid 在最新版本规范上的概念呈现出来。因此，我将不会照顾过期的 IE 语法。当规范成熟时，我将尽可能去定期更新。</p>
<h2 id="articleHeader1"><a>基础与浏览器支持</a></h2>
<p>开始 Grid 是简单的，你仅仅需要在容器(container)元素上定义一个栅格使用 <code>display: grid</code>，并通过 <code>grid-template-columns</code> 与 <code>grid-template-rows</code> 设置行与列。通过设置 <code>grid-column</code> 和 <code>grid-row</code> 把子元素置于栅格中。与 <code>flexbox</code> 类似，栅格项目(items)的顺序是无关紧要的，你可以通过 CSS 来控制顺序。当使用媒体查询时，改变它们的顺序是极其简单的。假设你设计好了网页的布局，但你需要适应不同的屏幕宽度，这仅仅需要几行代码，Grid 是最为有效的模块。</p>
<p><strong>关于 Grid 一件非常重要的事情是你还不能够在生产环境中使用它</strong>。它目前仅仅是一个 <a href="https://www.w3.org/TR/css-grid-1/" rel="nofollow noreferrer" target="_blank">W3C工作草案</a>，而且不能够被任何浏览器默认支持。虽然IE10 与 IE11 能够支持它，但使用了过期语法旧的实现。为了现在能够体验 Grid，最好的方法是使用 Chrome, Opera 或者 Firefox，并且开启特定的标志。在 Chrome 中，导航到 chrome://flags 并且开启 “experimental web platform features”。在 Opera 中同样如此（opera://flags）。在 Firefox 中，开启标志 layout.css.grid.enabled（about:config）。</p>
<p>这有一张浏览器支持表格，我将保持更新。</p>
<p>Chrome 29+ (Behind flag)<br>Safari Not supported<br>Firefox 40+ (Behind flag)<br>Opera 28+ (Behind flag)<br>IE 10+ (Old syntax)<br>Android Not supported<br>iOS Not supported</p>
<blockquote><p>译者注：现在有些最新浏览器的最新版本已经能够支持，可以查看 <a>caniuse</a> 网站。</p></blockquote>
<p>你在生产环境中使用它仅仅是一个时间问题。但是，学习正在当下！</p>
<h2 id="articleHeader2">重要术语</h2>
<p>在深入了解 Grid 概念之前，了解它的术语是极为重要的。因为在此涉及到的术语概念相似，不易混淆。不过不用担心，他们并没有很多。</p>
<h3 id="articleHeader3">Grid Container （栅格容器）</h3>
<p>设置 <code>display: grid</code> 的元素，它是所有栅格项目的直接父级元素。在这个例子中，<code>container</code> 是栅格的容器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;item item-1&quot;></div>
  <div class=&quot;item item-2&quot;></div>
  <div class=&quot;item item-3&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item item-1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item item-2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item item-3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader4">Grid Item （栅格项目）</h3>
<p>栅格容器的直接子代。在这里 <code>item</code> 是栅格项目，而 <code>sub-item</code> 不是栅格项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;item&quot;></div> 
  <div class=&quot;item&quot;>
    <p class=&quot;sub-item&quot;></p>
  </div>
  <div class=&quot;item&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sub-item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader5">Grid Line （栅格线）</h3>
<p>组成栅格结构的分割线。它们位于行与列的两侧，有的是垂直的（列栅格线），有的是水平的（行栅格线）。以下黄色线是一个列栅格线。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299558?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000008299558?w=383&amp;h=219" alt="Grid line" title="Grid line" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Grid Track （栅格轨迹）</h3>
<p>相邻栅格线的区域。你可以认为他们是栅格的一行或者一列。以下是第二与第三栅格线间的栅格轨迹。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299559?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000008299559?w=383&amp;h=219" alt="Grid track" title="Grid track" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">Grid Cell （栅格格子）</h3>
<p>相邻行栅格线与相邻列栅格线间的区域。它是栅格的独立“单元”。以下栅格格子位于1，2行栅格线与2，3列栅格线间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299560?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000008299560?w=383&amp;h=219" alt="Grid cell" title="Grid cell" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">Grid Area （栅格区域）</h3>
<p>被四个栅格线围绕的区域。一个栅格区域由任意数量的栅格格子组成。以下栅格区域位于1，3行栅格线与1，3列栅格线间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299561?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000008299561?w=383&amp;h=219" alt="Grid area" title="Grid area" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">栅格属性内容表</h2>
<p>属于栅格容器的属性：</p>
<ul>
<li><p><a>display</a></p></li>
<li><p><a>grid-template-columns</a></p></li>
<li><p><a>grid-template-rows</a></p></li>
<li><p><a>grid-template-areas</a></p></li>
<li><p><a>grid-column-gap</a></p></li>
<li><p><a>grid-row-gap</a></p></li>
<li><p><a>grid-gap</a></p></li>
<li><p><a>justify-items</a></p></li>
<li><p><a>align-items</a></p></li>
<li><p><a>justify-content</a></p></li>
<li><p><a>align-content</a></p></li>
<li><p><a>grid-auto-columns</a></p></li>
<li><p><a>grid-auto-rows</a></p></li>
<li><p><a>grid-auto-flow</a></p></li>
<li><p><a>grid</a></p></li>
</ul>
<p>属于栅格项目的属性：</p>
<ul>
<li><p><a>grid-column-start</a></p></li>
<li><p><a>grid-column-end</a></p></li>
<li><p><a>grid-row-start</a></p></li>
<li><p><a>grid-row-end</a></p></li>
<li><p><a>grid-column</a></p></li>
<li><p><a>grid-row</a></p></li>
<li><p><a>grid-area</a></p></li>
<li><p><a>justify-self</a></p></li>
<li><p><a>align-self</a></p></li>
</ul>
<h2 id="articleHeader10">栅格容器属性（Grid Container）</h2>
<h3 id="articleHeader11">display</h3>
<p>定义该元素为栅格项目，并且为它的内容建立一个新的<em>栅格格式上下文（grid formatting context）</em>。</p>
<blockquote><p>译者注：还记得 BFC 与 IFC 吗？</p></blockquote>
<p>属性值：</p>
<ul>
<li><p><strong>grid</strong> 生成块状栅格</p></li>
<li><p><strong>inline-grid</strong> 生成行间栅格</p></li>
<li><p><strong>subgrid</strong> 如果你的栅格容器本身是一个栅格项目的话（例如：嵌套栅格），你可以根据它的父元素而不是它自己，指定行列大小。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  display: grid | inline-grid | subgrid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">display</span>: grid | inline-grid | subgrid;
}</code></pre>
<p>注意：<code>column</code>，<code>float</code>，<code>clear</code> 与 <code>vertical-align</code> 在栅格容器上无效。</p>
<h3 id="articleHeader12">grid-template-columns <br> grid-template-rows</h3>
<p>通过空格分隔的值定义栅格的行与列。值代表轨迹大小（track size），它们中间的间隙代表栅格线。</p>
<p>属性值：</p>
<ul>
<li><p><strong>&lt;track-size&gt;</strong> 可以是长度，百分比，或者栅格中的空白空间（使用 <code>fr</code>）</p></li>
<li><p><strong>&lt;line-name&gt;</strong> 任意名字，任君选择</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: &lt;track-size&gt; ... | &lt;line-name&gt; &lt;track-size&gt; ...;
  <span class="hljs-attribute">grid-template-rows</span>: &lt;track-size&gt; ... | &lt;line-name&gt; &lt;track-size&gt; ...;
}</code></pre>
<p>示例:</p>
<p>当你在轨迹值之间预留空格时，栅格线会被自动分配为数值名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">40px</span> <span class="hljs-number">50px</span> auto <span class="hljs-number">50px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">25%</span> <span class="hljs-number">100px</span> auto;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299562?w=464&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299562?w=464&amp;h=365" alt="Grid with auto named lines" title="Grid with auto named lines" style="cursor: pointer;"></span></p>
<p>你也可以为栅格线设置名字，注意栅格线名字的括号语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: [first] <span class="hljs-number">40px</span> [line2] <span class="hljs-number">50px</span> [line3] auto [col4-start] <span class="hljs-number">50px</span> [five] <span class="hljs-number">40px</span> [end];
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">25%</span> [row1-end] <span class="hljs-number">100px</span> [third-line] auto [last-line];
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299563?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299563?w=514&amp;h=365" alt="Grid with user named lines" title="Grid with user named lines" style="cursor: pointer;"></span></p>
<p>注意一条线可以有多个名字。例如，这里第二条线有两个名字：row1-end 和 row2-start。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">25%</span> [row1-end row2-start] <span class="hljs-number">25%</span> [row2-end];
}</code></pre>
<p>如果你定义的内容包含重复部分，你可以使用 <code>repeat()</code> 标记去组织它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: repeat(3, 20px [col-start]) 5%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 20px [col-start]) <span class="hljs-number">5%</span>;
}</code></pre>
<p>与以下代码是等价的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">5%</span>;
}</code></pre>
<p><code>fr</code> 允许你设置轨迹大小为栅格容器的一部分。例如，以下示例将设置每个项目为栅格容器的三分之一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 1fr 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<p>空白空间将在固定项目 <em>之后</em> 被计算。在这个例子中，给 <code>fr</code> 分配的全部空余时间不包括 50px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 1fr 50px 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">50px</span> <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<h3 id="articleHeader13">grid-template-areas</h3>
<p>通过指定栅格区域的名字来定义栅格模板，这样栅格项目会通过 <a><code>grid-area</code></a> 属性来指定区域。重复栅格区域的名字将会合并栅格格子，一个句点表示一个空的栅格格子。语法本身提供了一个可视化的栅格结构。</p>
<p>属性值：</p>
<ul>
<li><p><strong>&lt;grid-area-name&gt;</strong> 在项目中使用 <a><code>grid-area</code></a> 属性指定的栅格区域</p></li>
<li><p><strong>.</strong> 句点表示空白栅格格子</p></li>
<li><p><strong>none</strong> 不定义栅格区域</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-areas: &quot;<grid-area-name> | . | none | ...&quot;
                       &quot;...&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"&lt;grid-area-name&gt; | . | none | ..."</span>
                       <span class="hljs-string">"..."</span>
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  grid-area: header;
}
.item-b{
  grid-area: main;
}
.item-c{
  grid-area: sidebar;
}
.item-d{
  grid-area: footer;
}

.container{
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: &quot;header header header header&quot;
                       &quot;main main . sidebar&quot;
                       &quot;footer footer footer footer&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">grid-area</span>: header;
}
<span class="hljs-selector-class">.item-b</span>{
  <span class="hljs-attribute">grid-area</span>: main;
}
<span class="hljs-selector-class">.item-c</span>{
  <span class="hljs-attribute">grid-area</span>: sidebar;
}
<span class="hljs-selector-class">.item-d</span>{
  <span class="hljs-attribute">grid-area</span>: footer;
}

<span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">50px</span> <span class="hljs-number">50px</span> <span class="hljs-number">50px</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: auto;
  <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"header header header header"</span>
                       <span class="hljs-string">"main main . sidebar"</span>
                       <span class="hljs-string">"footer footer footer footer"</span>
}</code></pre>
<p>这将建造一个三行四列的栅格。第一行全部由 <strong>header</strong> 区域组成，第二行由两个 <strong>main</strong> 区域，一个空白格子与一个 <strong>sidebar</strong> 区域组成。最后一行全部由 <strong>footer</strong> 组成。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299564?w=427&amp;h=330" src="https://static.alili.tech/img/remote/1460000008299564?w=427&amp;h=330" alt="Example of grid-template-areas" title="Example of grid-template-areas" style="cursor: pointer;"></span></p>
<p>你声明的每行都需要有相同数量的栅格格子。</p>
<p>你可以使用任意数量无空格分割的相邻句点去表示单个空白栅格格子。</p>
<blockquote><p>译者注：<code>grid-template-areas: "first . last"</code> 与 <code>grid-template-areas: "first ...... last"</code> 等价。</p></blockquote>
<p>注意，这种语法仅仅能命名区域，而无法命名栅格线。实际上，当你使用这种语法的时候，栅格区域两端的栅格线已被自动命名。如果你的栅格区域叫 <strong><em>foo</em></strong>，栅格区域开始的行与列将被命名为 <strong><em>foo-start</em></strong>，而结束的行与列将被命名为 <strong><em>foo-end</em></strong>。这意味着一些栅格线会有很多名字，比如上述例子的最左边的栅格线将会有三个名字：header-start, main-start 和 footer-start。</p>
<h3 id="articleHeader14">grid-template</h3>
<p><a><code>grid-template-columns</code></a>，<a><code>grid-template-rows</code></a> 和 <a><code>grid-template-areas</code></a> 的简写。</p>
<p>属性值：</p>
<ul>
<li><p><strong>none</strong> 设置这三个属性为初始属性</p></li>
<li><p><strong>subgrid</strong> 设置 <code>grid-template-rows</code> 和 <code>grid-template-columns</code> 为 <code>subgrid</code>，<code>grid-template-areas</code> 为初始值。</p></li>
<li><p><strong>&lt;grid-template-columns&gt; / &lt;grid-template-rows&gt;</strong> 设置 <code>grid-template-columns</code> 与 <code>grid-template-rows</code> 为各自指定的值。而 <code>grid-template-areas</code> 为 <code>none</code>。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template: none | subgrid | <grid-template-columns> / <grid-template-rows>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template</span>: none | subgrid | &lt;grid-template-columns&gt; / &lt;grid-template-rows&gt;;
}</code></pre>
<p>另外，也有一个比较复杂但是方便的语法指定三个属性，示例如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template: auto 50px auto /
    [row1-start] 25px &quot;header header header&quot; [row1-end]
    [row2-start] &quot;footer footer footer&quot; 25px [row2-end];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template</span>: auto <span class="hljs-number">50px</span> auto /
    [row1-start] <span class="hljs-number">25px</span> <span class="hljs-string">"header header header"</span> [row1-end]
    [row2-start] <span class="hljs-string">"footer footer footer"</span> <span class="hljs-number">25px</span> [row2-end];
}</code></pre>
<p>与以下代码是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: auto 50px auto;
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-areas: 
    &quot;header header header&quot; 
    &quot;footer footer footer&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: auto <span class="hljs-number">50px</span> auto;
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">25px</span> [row1-end row2-start] <span class="hljs-number">25px</span> [row2-end];
  <span class="hljs-attribute">grid-template-areas</span>: 
    <span class="hljs-string">"header header header"</span> 
    <span class="hljs-string">"footer footer footer"</span>;
}</code></pre>
<p>因为 <code>grid-template</code> 无法 <em>隐式</em> 重置属性（<a><code>grid-auto-columns</code></a>，<a><code>grid-auto-rows</code></a> 与 <a><code>grid-auto-flow</code></a>）。或许你想做更多的事，那么推荐你使用 <code>grid</code> 属性去替代 <code>grid-template</code>。</p>
<h3 id="articleHeader15">grid-column-gap <br> grid-row-gap</h3>
<p>指定栅格线的大小，你可以理解它为设置行/列间隙。</p>
<p>属性值：</p>
<ul><li><p><strong>&lt;line-size&gt;</strong> 长度值</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-column-gap</span>: &lt;line-size&gt;;
  <span class="hljs-attribute">grid-row-gap</span>: &lt;line-size&gt;;
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">80px</span> auto <span class="hljs-number">80px</span>; 
  <span class="hljs-attribute">grid-column-gap</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">grid-row-gap</span>: <span class="hljs-number">15px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299565?w=322&amp;h=273" src="https://static.alili.tech/img/remote/1460000008299565?w=322&amp;h=273" alt="Example of grid-column-gap and grid-row-gap" title="Example of grid-column-gap and grid-row-gap" style="cursor: pointer;"></span></p>
<p>栅格间隙仅仅在行/列 <em>之间</em>，不包括最外部的边。</p>
<h3 id="articleHeader16">grid-gap</h3>
<p><a><code>grid-column-gap</code></a> 与 <a><code>grid-row-gap</code></a> 的简写。</p>
<p>属性值：</p>
<ul><li><p><strong>&lt;grid-row-gap&gt; &lt;grid-column-gap&gt;</strong> 长度值</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-gap: <grid-row-gap> <grid-column-gap>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-gap</span>: &lt;grid-row-gap&gt; &lt;grid-column-gap&gt;;
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-gap: 10px 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">80px</span> auto <span class="hljs-number">80px</span>; 
  <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">10px</span> <span class="hljs-number">15px</span>;
}</code></pre>
<p>如果没有设置 <code>grid-row-gap</code>，它将于 <code>grid-column-gap</code> 保持一致。</p>
<h3 id="articleHeader17">justify-items</h3>
<p>使栅格项目中的内容与 <em>列</em> 轴对齐（相应地，<a><code>align-items</code></a> 与 <em>行</em> 轴对齐）。这个属性值应用在容器中的所有项目上。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 使内容与栅格区域左侧对齐</p></li>
<li><p><strong>end</strong> 使内容与栅格区域右侧对齐</p></li>
<li><p><strong>center</strong> 使内容在栅格区域中居中</p></li>
<li><p><strong>stretch</strong> 使内容充满整个栅格区域的宽（默认属性）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: start | end | center | stretch;
}</code></pre>
<p>示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299566?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299566?w=312&amp;h=125" alt="Example of justify-items set to start" title="Example of justify-items set to start" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299567?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299567?w=312&amp;h=125" alt="Example of justify-items set to end" title="Example of justify-items set to end" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299568?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299568?w=312&amp;h=125" alt="Example of justify-items set to center" title="Example of justify-items set to center" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: stretch;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299569?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299569?w=312&amp;h=125" alt="Example of justify-items set to stretch" title="Example of justify-items set to stretch" style="cursor: pointer;"></span></p>
<p>这个行为也可以通过 <a><code>justify-self</code></a> 属性设置在独立的栅格项目上。</p>
<h3 id="articleHeader18">align-items</h3>
<p>使栅格项目中的内容与 <em>行</em> 轴对齐（相应地，<a><code>justify-items</code></a> 与 <em>列</em> 轴对齐）。这个属性值应用在容器中的所有项目上。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 使内容与栅格区域顶部对齐</p></li>
<li><p><strong>end</strong> 使内容与栅格区域底部对齐</p></li>
<li><p><strong>center</strong> 使内容在栅格区域中居中</p></li>
<li><p><strong>stretch</strong> 使内容充满整个栅格区域的高（默认属性）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-items: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-items</span>: start | end | center | stretch;
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-items: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-items</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299570?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299570?w=312&amp;h=125" alt="Example of align-items set to start" title="Example of align-items set to start" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-items: end;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-items</span>: end;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299571?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299571?w=312&amp;h=125" alt="Example of align-items set to end" title="Example of align-items set to end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-items: center;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-items</span>: center;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299572?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299572?w=312&amp;h=125" alt="Example of align-items set to center" title="Example of align-items set to center" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-items: stretch;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-items</span>: stretch;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299569?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299569?w=312&amp;h=125" alt="Example of align-items set to stretch" title="Example of align-items set to stretch" style="cursor: pointer;"></span></p>
<p>这个行为也可以通过 <a><code>align-self</code></a> 属性设置在独立的栅格项目上。</p>
<h3 id="articleHeader19">justify-content</h3>
<p>有时候，栅格的总大小小于栅格容器的大小，比如你使用 <code>px</code> 给所有的栅格项目设置了固定大小。本例中，你可以设置栅格容器中栅格的对齐。这个属性会使栅格与 <em>列</em> 轴对齐（相应地，<a><code>align-content</code></a> 会使栅格与 <em>行</em> 轴对齐）。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 与栅格容器的左侧对齐</p></li>
<li><p><strong>end</strong> 与栅格容器的右侧对齐</p></li>
<li><p><strong>center</strong> 在栅格容器中居中</p></li>
<li><p><strong>stretch</strong> 调整栅格项目的大小，使栅格充满整个栅格容器。</p></li>
<li><p><strong>space-around</strong> 每两个项目之间留有相同的空白，在最左端与最右端为一半大小的空白。</p></li>
<li><p><strong>space-between</strong> 每两个项目之间留有相同的空白，在最左端与最右端不留空白。</p></li>
<li><p><strong>space-evenly</strong> 每两个项目之间留有相同的空白，包括两端。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: start | end | center | stretch | space-around | space-between | space-evenly;  
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: start;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: start;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299573?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299573?w=387&amp;h=187" alt="Example of justify-content set to start" title="Example of justify-content set to start" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: end;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: end;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299574?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299574?w=387&amp;h=187" alt="Example of justify-content set to end" title="Example of justify-content set to end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: center;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: center;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299575?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299575?w=387&amp;h=187" alt="Example of justify-content set to center" title="Example of justify-content set to center" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: stretch;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: stretch;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299576?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299576?w=387&amp;h=187" alt="Example of justify-content set to stretch" title="Example of justify-content set to stretch" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: space-around;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: space-around;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299577?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299577?w=387&amp;h=187" alt="Example of justify-content set to space-around" title="Example of justify-content set to space-around" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: space-between;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: space-between;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299578?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299578?w=387&amp;h=187" alt="Example of justify-content set to space-between" title="Example of justify-content set to space-between" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-content: space-evenly;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-content</span>: space-evenly;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299579?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000008299579?w=387&amp;h=187" alt="Example of justify-content set to space-evenly" title="Example of justify-content set to space-evenly" style="cursor: pointer;"></span></p>
<h3 id="articleHeader20">align-content</h3>
<p>有时候，栅格的总大小小于栅格容器的大小，比如你使用 <code>px</code> 给所有的栅格项目设置了固定大小。本例中，你可以设置栅格容器中栅格的对齐。这个属性会使栅格与 <em>行</em> 轴对齐（相应地，<code>align-content</code> 会使栅格与 <em>列</em> 轴对齐）。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 与栅格容器的顶部对齐</p></li>
<li><p><strong>end</strong> 与栅格容器的底部对齐</p></li>
<li><p><strong>center</strong> 在栅格容器中居中</p></li>
<li><p><strong>stretch</strong> 调整栅格项目的大小，使栅格充满整个栅格容器。</p></li>
<li><p><strong>space-around</strong> 每两个项目之间留有相同的空白，在最左端与最右端为一半大小的空白。</p></li>
<li><p><strong>space-between</strong> 每两个项目之间留有相同的空白，在最左端与最右端不留空白。</p></li>
<li><p><strong>space-evenly</strong> 每两个项目之间留有相同的空白，包括两端。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: start | end | center | stretch | space-around | space-between | space-evenly;  
}
</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: start;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: start;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299580?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299580?w=258&amp;h=275" alt="Example of align-content set to start" title="Example of align-content set to start" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: end;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: end;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299581?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299581?w=258&amp;h=275" alt="Example of align-content set to end" title="Example of align-content set to end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: center;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: center;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299582?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299582?w=258&amp;h=275" alt="Example of align-content set to center" title="Example of align-content set to center" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: stretch;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: stretch;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299583?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299583?w=258&amp;h=275" alt="Example of align-content set to stretch" title="Example of align-content set to stretch" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: space-around;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: space-around;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299584?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299584?w=258&amp;h=275" alt="Example of align-content set to space-around" title="Example of align-content set to space-around" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: space-between;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: space-between;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299585?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299585?w=258&amp;h=275" alt="Example of align-content set to space-between" title="Example of align-content set to space-between" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  align-content: space-evenly;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">align-content</span>: space-evenly;  
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299586?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000008299586?w=258&amp;h=275" alt="Example of align-content set to space-evenly" title="Example of align-content set to space-evenly" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader21">grid-auto-columns <br> grid-auto-rows</h3>
<p>指定自动生成的栅格轨迹的大小（亦称<em>隐式栅格轨迹</em>）。当你显式定位行与列的时候（通过 <code>grid-template-rows</code> / <code>grid-template-columns</code>），隐式栅格轨迹会在定义的栅格外被创建。</p>
<p>属性值：</p>
<ul><li><p><strong>&lt;track-size&gt;</strong> 可以是长度，百分比或者 <code>fr</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-auto-columns</span>: &lt;track-size&gt; ...;
  <span class="hljs-attribute">grid-auto-rows</span>: &lt;track-size&gt; ...;
}</code></pre>
<p>举例了解隐式栅格轨迹是如何被创建的，考虑以下示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">90px</span> <span class="hljs-number">90px</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299587?w=320&amp;h=229" src="https://static.alili.tech/img/remote/1460000008299587?w=320&amp;h=229" alt="Example of implicit tracks" title="Example of implicit tracks" style="cursor: pointer;"></span></p>
<p>本示例建造了 2 * 2 的栅格。</p>
<p>你使用 <code>[grid-column</code>](#prop-grid-column) 与 <a><code>grid-row</code></a> 去定位你的项目如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b{
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.item-b</span>{
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">5</span> / <span class="hljs-number">6</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007139082?w=320&amp;h=229" src="https://static.alili.tech/img/remote/1460000007139082?w=320&amp;h=229" alt="Example of implicit tracks" title="Example of implicit tracks" style="cursor: pointer;"></span></p>
<p>我们告知 .item-b 在 5-6 列间，<em>但我们从未定义第五列或者第六列</em>。因为我们引用的栅格线不存在，宽度为0的隐式栅格轨迹将会创建去填充空白。我们可以使用 <a><code>grid-auto-columns</code></a> 和 <a><code>grid-auto-rows</code></a> 去指定这些轨迹的宽。</p>
<blockquote><p>译者注：经译者测试，并非以宽度为0的 implicit track 去填充。<a href="https://www.w3.org/TR/css-grid-1/#auto-tracks" rel="nofollow noreferrer" target="_blank">w3c auto-tracks</a> 上表明 <code>grid-auto-columns</code> 的默认值为 <code>auto</code>，则超过的列将会平分空白空间。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007139083?w=401&amp;h=229" src="https://static.alili.tech/img/remote/1460000007139083?w=401&amp;h=229" alt="Example of implicit tracks" title="Example of implicit tracks" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-auto-columns: 60px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-auto-columns</span>: <span class="hljs-number">60px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299588?w=401&amp;h=229" src="https://static.alili.tech/img/remote/1460000008299588?w=401&amp;h=229" alt="Example of implicit tracks" title="Example of implicit tracks" style="cursor: pointer;"></span></p>
<h3 id="articleHeader22">grid-auto-flow</h3>
<p>如果你的栅格项目没有显式地在栅格中设置位置，<em>自动放置算法</em>便会生效。这个属性控制自动放置算法的的运作。</p>
<p>属性值：</p>
<ul>
<li><p><strong>row</strong> 自动放置算法将按行依次排列，按需添加新行。</p></li>
<li><p><strong>column</strong> 自动放置算法将按列依次排列，按需添加新列。</p></li>
<li><p><strong>dense</strong> 如果较小的项目出现靠后时，自动防止算法将尽可能早地填充栅格的空白格子</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  grid-auto-flow: row | column | row dense | column dense
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">grid-auto-flow</span>: row | column | row dense | column dense
}</code></pre>
<p>注意 <strong>dense</strong> 可能使你的项目次序颠倒。</p>
<p>示例:</p>
<p>考虑以下 html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;container&quot;>
    <div class=&quot;item-a&quot;>item-a</div>
    <div class=&quot;item-b&quot;>item-b</div>
    <div class=&quot;item-c&quot;>item-c</div>
    <div class=&quot;item-d&quot;>item-d</div>
    <div class=&quot;item-e&quot;>item-e</div>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-a"</span>&gt;</span>item-a<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-b"</span>&gt;</span>item-b<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-c"</span>&gt;</span>item-c<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-d"</span>&gt;</span>item-d<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-e"</span>&gt;</span>item-e<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>你定义了一个两行五列的栅格，并设置它的 <a><code>grid-auto-flow</code></a> 属性为 <code>row</code> （默认属性便是 <code>row</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 30px;
    grid-auto-flow: row;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">30px</span> <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">grid-auto-flow</span>: row;
}</code></pre>
<p>当我们把项目放置在栅格中的时候，明确指定以下两个项目的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
    grid-column: 1;
    grid-row: 1 / 3;
}
.item-e{
    grid-column: 5;
    grid-row: 1 / 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.item-e</span>{
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
}</code></pre>
<p>因为我们设置了 <a><code>grid-auto-flow</code></a> 属性为 <code>row</code>，呈现在我们眼前的栅格便是如下这个样子。注意，这三个项目（<strong>item-b</strong>，<strong>item-c</strong> 与 <strong>item-d</strong>）并没有特意指定位置。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299589?w=371&amp;h=77" src="https://static.alili.tech/img/remote/1460000008299589?w=371&amp;h=77" alt="Example of grid-auto-flow set to row" title="Example of grid-auto-flow set to row" style="cursor: pointer;"></span></p>
<p>如果设置 <a><code>grid-auto-flow</code></a> 的属性为 <code>column</code>，item-b<strong>，</strong>item-c<strong> 与 </strong>item-d** 将按列以此排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 30px;
    grid-auto-flow: column;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">30px</span> <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">grid-auto-flow</span>: column;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299590?w=371&amp;h=77" src="https://static.alili.tech/img/remote/1460000008299590?w=371&amp;h=77" alt="Example of grid-auto-flow set to column" title="Example of grid-auto-flow set to column" style="cursor: pointer;"></span></p>
<h3 id="articleHeader23">grid</h3>
<p>以下属性的缩写：<a><code>grid-template-rows</code></a>， <a><code>grid-template-columns</code></a>， <a><code>grid-template-areas</code></a>，<a><code>grid-auto-rows</code></a>，<a><code>grid-auto-columns</code></a><code>，与 [</code>grid-auto-flow<code>](#prop-grid-auto-flow)</code>。它也可以设置 <a><code>grid-column-gap</code></a> 和 <a><code>grid-row-gap</code></a>为默认值，即使并没有在 <code>grid</code> 中明确设置。</p>
<p>属性值：</p>
<ul>
<li><p><strong>none</strong> 设置所有子属性的值为初始值。</p></li>
<li><p><strong>&lt;grid-template-rows&gt; / &lt;grid-template-columns&gt;</strong> 仅仅设置这两个属性值，其它子属性值为初始值。</p></li>
<li><p><strong>&lt;grid-auto-flow&gt; [&lt;grid-auto-rows&gt; [ / &lt;grid-auto-columns&gt;] ]</strong> 如果 <a><code>grid-auto-columns</code></a> 属性值确实，则采用 <a><code>grid-auto-rows</code></a>的值。如果属性值均缺失，则采用默认值。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid: none | <grid-template-rows> / <grid-template-columns> | <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid</span>: none | &lt;grid-template-rows&gt; / &lt;grid-template-columns&gt; | &lt;grid-auto-flow&gt; [&lt;grid-auto-rows&gt; [/ &lt;grid-auto-columns&gt;]];
}</code></pre>
<p>以下两种写法是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid: 200px auto / 1fr auto 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid</span>: <span class="hljs-number">200px</span> auto / <span class="hljs-number">1</span>fr auto <span class="hljs-number">1</span>fr;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid-template-rows: 200px auto;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">200px</span> auto;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr auto <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-template-areas</span>: none;
}</code></pre>
<p>以下两种写法也是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid: column 1fr / auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid</span>: column <span class="hljs-number">1</span>fr / auto;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid-auto-flow: column;
    grid-auto-rows: 1fr;
    grid-auto-columns: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid-auto-flow</span>: column;
    <span class="hljs-attribute">grid-auto-rows</span>: <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-auto-columns</span>: auto;
}</code></pre>
<p>另外你可以设置更为复杂但相当方便的语法一次性设置所有属性。你可以指定<a><code>grid-template-areas</code></a>， <a><code>grid-auto-rows</code></a> 与 <a><code>grid-auto-columns</code></a>，其他子属性将被设为默认值。你需要指定栅格线与轨迹大小，这很容易用一个例子表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid: [row1-start] &quot;header header header&quot; 1fr [row1-end]
          [row2-start] &quot;footer footer footer&quot; 25px [row2-end]
          / auto 50px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid</span>: [row1-start] <span class="hljs-string">"header header header"</span> <span class="hljs-number">1</span>fr [row1-end]
          [row2-start] <span class="hljs-string">"footer footer footer"</span> <span class="hljs-number">25px</span> [row2-end]
          / auto <span class="hljs-number">50px</span> auto;
}</code></pre>
<p>与以下写法是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    grid-template-areas: &quot;header header header&quot;
                         &quot;footer footer footer&quot;;
    grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
    grid-template-columns: auto 50px auto;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"header header header"</span>
                         <span class="hljs-string">"footer footer footer"</span>;
    <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">1</span>fr [row1-end row2-start] <span class="hljs-number">25px</span> [row2-end];
    <span class="hljs-attribute">grid-template-columns</span>: auto <span class="hljs-number">50px</span> auto;    
}</code></pre>
<h3 id="articleHeader24">栅格项目属性 （Grid Items）</h3>
<h3 id="articleHeader25">grid-column-start <br> grid-column-end <br> grid-row-start <br> grid-row-end</h3>
<p>通过指定栅格线来确定栅格项目的位置。<code>grid-column-start</code> / <code>grid-row-start</code> 代表项目开始的线，<code>grid-column-end</code>/<code>grid-row-end</code> 代表项目结束的线。</p>
<p>属性值：</p>
<ul>
<li><p><strong>&lt;Line&gt;</strong> 可以是一个表示栅格线名字或数字。</p></li>
<li><p><strong>span &lt;number&gt;</strong> 项目将横跨指定数量栅格轨迹</p></li>
<li><p><strong>span &lt;name&gt;</strong> 项目将横跨至指定名字的栅格线</p></li>
<li><p><strong>auto</strong> 自动放置，自动跨越轨迹或者默认跨越轨迹</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item{
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">grid-column-start</span>: &lt;number&gt; | &lt;name&gt; | span &lt;number&gt; | span &lt;name&gt; | auto
  grid-column-end: &lt;number&gt; | &lt;name&gt; | span &lt;number&gt; | span &lt;name&gt; | auto
  grid-row-start: &lt;number&gt; | &lt;name&gt; | span &lt;number&gt; | span &lt;name&gt; | auto
  grid-row-end: &lt;number&gt; | &lt;name&gt; | span &lt;number&gt; | span &lt;name&gt; | auto
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-column-end</span>: five;
  <span class="hljs-attribute">grid-row-start</span>: row1-start
  grid-row-end: <span class="hljs-number">3</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299591?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299591?w=514&amp;h=365" alt="Example of grid-row/column-start/end" title="Example of grid-row/column-start/end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-b{
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-b</span>{
  <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-column-end</span>: span col4-start;
  <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>
  grid-row-end: span <span class="hljs-number">2</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299592?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299592?w=514&amp;h=365" alt="Example of grid-row/column-start/end" title="Example of grid-row/column-start/end" style="cursor: pointer;"></span></p>
<p>如果没有指定 grid-column-end/grid-row-end，项目默认横跨一个轨迹。</p>
<p>项目可能会互相重叠，你可以使用 <code>z-index</code> 控制它们的层叠顺序（stacking order）。</p>
<h3 id="articleHeader26">grid-column <br> grid-row</h3>
<p>各自表示<a><code>grid-column-start</code></a> + <a><code>grid-column-end</code></a> 与 <a><code>grid-row-start</code></a> + <a><code>grid-row-end</code></a>的缩写。</p>
<p>属性值：</p>
<ul><li><p><strong>&lt;start-line&gt; / &lt;end-line&gt;</strong> 接收 grid-column-start 同样的属性值，包括 span</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item{
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">grid-column</span>: &lt;start-line&gt; / &lt;end-line&gt; | &lt;start-line&gt; / span &lt;value&gt;;
  <span class="hljs-attribute">grid-row</span>: &lt;start-line&gt; / &lt;end-line&gt; | &lt;start-line&gt; / span &lt;value&gt;;
}</code></pre>
<p>Example:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-c{
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-c</span>{
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span> / span <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row</span>: third-line / <span class="hljs-number">4</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299593?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299593?w=514&amp;h=365" alt="Example of grid-column/grid-row" title="Example of grid-column/grid-row" style="cursor: pointer;"></span></p>
<p>如果没有指定 end line，项目将默认跨越一个轨迹。</p>
<h3 id="articleHeader27">grid-area</h3>
<p>当创建栅格容器使用 <a><code>grid-template-areas</code></a> 属性时，可以通过制定区域名字确定栅格项目的位置。同样，它也可以作为以下属性的缩写：<a><code>grid-row-start</code></a> + <a><code>grid-column-start</code></a> + <a><code>grid-row-end</code></a> + <a><code>grid-column-end</code></a>。</p>
<p>属性值：</p>
<ul>
<li><p><strong>&lt;name&gt;</strong></p></li>
<li><p><strong>&lt;row-start&gt; / &lt;column-start&gt; / &lt;row-end&gt; / &lt;column-end&gt;</strong></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item{
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">grid-area</span>: &lt;name&gt; | &lt;row-start&gt; / &lt;column-start&gt; / &lt;row-end&gt; / &lt;column-end&gt;;
}</code></pre>
<p>示例:</p>
<p>你可以给项目设置名字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-d{
  grid-area: header
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-d</span>{
  <span class="hljs-attribute">grid-area</span>: header
}</code></pre>
<p>也可以作为<a><code>grid-row-start</code></a> + <a><code>grid-column-start</code></a> + <a><code>grid-row-end</code></a> + <a><code>grid-column-end</code></a> 的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-d{
  grid-area: 1 / col4-start / last-line / 6
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-d</span>{
  <span class="hljs-attribute">grid-area</span>: <span class="hljs-number">1</span> / col4-start / last-line / <span class="hljs-number">6</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299594?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000008299594?w=514&amp;h=365" alt="Example of grid-area" title="Example of grid-area" style="cursor: pointer;"></span></p>
<h3 id="articleHeader28">justify-self</h3>
<p>使栅格项目中的内容与 <em>列</em> 轴对齐（相应地，<a><code>align-self</code></a> 与 <em>行</em> 轴对齐）。本属性值适用于单个项目的内容。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 使内容与栅格区域左侧对齐</p></li>
<li><p><strong>end</strong> 使内容与栅格区域右侧对齐</p></li>
<li><p><strong>center</strong> 使内容在栅格区域中居中</p></li>
<li><p><strong>stretch</strong> 使内容充满整个栅格区域的宽（默认属性）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item{
  justify-self: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">justify-self</span>: start | end | center | stretch;
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  justify-self: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">justify-self</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299595?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299595?w=312&amp;h=125" alt="Example of justify-self set to start" title="Example of justify-self set to start" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  justify-self: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">justify-self</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299596?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299596?w=312&amp;h=125" alt="Example of justify-self set to end" title="Example of justify-self set to end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  justify-self: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">justify-self</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299597?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299597?w=312&amp;h=125" alt="Example of justify-self set to center" title="Example of justify-self set to center" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  justify-self: stretch;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">justify-self</span>: stretch;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299598?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299598?w=312&amp;h=125" alt="Example of justify-self set to stretch" title="Example of justify-self set to stretch" style="cursor: pointer;"></span></p>
<p>为了对栅格项目中的<strong>所有</strong>项目设置对齐，可以是指栅格容器的 <a><code>justify-items</code></a> 属性。</p>
<h3 id="articleHeader29">align-self</h3>
<p>使栅格项目中的内容与 <em>行</em> 轴对齐（相应地，<a><code>justify-self</code></a> 与<em>列</em>轴对齐）。本属性值适用于单个项目的内容。</p>
<p>属性值：</p>
<ul>
<li><p><strong>start</strong> 使内容与栅格区域顶部对齐</p></li>
<li><p><strong>end</strong> 使内容与栅格区域底部对齐</p></li>
<li><p><strong>center</strong> 使内容在栅格区域中居中</p></li>
<li><p><strong>stretch</strong> 使内容充满整个栅格区域的高（默认属性）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item{
  align-self: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">align-self</span>: start | end | center | stretch;
}</code></pre>
<p>示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  align-self: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">align-self</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299599?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299599?w=312&amp;h=125" alt="Example of align-self set to start" title="Example of align-self set to start" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  align-self: end;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">align-self</span>: end;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299600?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299600?w=312&amp;h=125" alt="Example of align-self set to end" title="Example of align-self set to end" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  align-self: center;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">align-self</span>: center;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299601?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299601?w=312&amp;h=125" alt="Example of align-self set to center" title="Example of align-self set to center" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a{
  align-self: stretch;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span>{
  <span class="hljs-attribute">align-self</span>: stretch;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008299602?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000008299602?w=312&amp;h=125" alt="Example of align-self set to stretch" title="Example of align-self set to stretch" style="cursor: pointer;"></span></p>
<p>为了对栅格项目中的<strong>所有</strong>项目设置对齐，可以设置栅格容器的 <a><code>align-items</code></a> 属性。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Grid 布局完全指南

## 原文链接
[https://segmentfault.com/a/1190000008299555](https://segmentfault.com/a/1190000008299555)

