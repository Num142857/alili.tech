---
title: 'CSS Grid 系列(上)-Grid布局完整指南' 
date: 2018-12-17 2:30:07
hidden: true
slug: d2wny8w098j
categories: [reprint]
---

{{< raw >}}

                    
<p>by <a href="http://chris.house/blog/a-complete-guide-css-grid-layout/" rel="nofollow noreferrer" target="_blank">Chris House</a> <br>译者：若愚老师<br>想要更好的阅读体验可在<a href="http://blog.jirengu.com/?p=990" rel="nofollow noreferrer" target="_blank">饥人谷技术博客</a> 查看原文</p>
<p>CSS 网格布局(Grid Layout) 是CSS中最强大的布局系统。 这是一个二维系统，这意味着它可以同时处理列和行，不像 <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">flexbox</a> 那样主要是一维系统。 你可以通过将CSS规则应用于父元素（成为网格容器）和该元素的子元素（网格元素），来使用网格布局。</p>
<h2 id="articleHeader0">引言</h2>
<p>CSS网格布局（又名“网格”）是一个二维的基于网格的布局系统，其目的只在于完全改变我们设计基于网格的用户界面的方式。 CSS一直用来布局网页，但一直都不完美。 一开始我们使用table 做布局，然后转向浮动、定位以及inline-block，但所有这些方法本质上都是 Hack 的方式，并且遗漏了很多重要的功能（例如垂直居中）。 Flexbox的出现在一定程度上解决了这个问题，但是它的目的是为了更简单的一维布局，而不是复杂的二维布局（Flexbox和Grid实际上一起工作得很好）。 只要我们一直在制作网站，我们就一直在为解决布局问题不断探索， 而Grid是第一个专门为解决布局问题而生的CSS模块。</p>
<p>有两个东西，启发我写这篇指南。 第一个是雷切尔·安德鲁（Rachel Andrew）的书为<a href="https://abookapart.com/products/get-ready-for-css-grid-layout" rel="nofollow noreferrer" target="_blank">CSS Grid布局准备</a>。 这本书对网格布局做了彻底、清晰的介绍，也是是整篇文章的基础，我强烈建议你购买并阅读他的书。 我的另一个重要灵感是<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">Chris Coyier的Flexbox完全指南</a>，当需要查阅 flexbox 的一切资料时我就会找这篇文章。 这篇文章帮助了很多人学习 Flex 布局，也是 Google 上搜索“flexbox”关键字排名第一的文章。你会发现他的文章和我的很多相似之处，有最好的范例在那放着为什么咱不偷师学着写呢？</p>
<p>本指南的目的是介绍网格概念，因为它们存在于最新版本的规范中。 因此我不会覆盖过时的IE语法，而且随着规范的成熟，我会尽最大努力保存更新本指南。</p>
<h2 id="articleHeader1">基础知识以及浏览器支持情况</h2>
<p>一开始你需要使用<code>display：grid</code>把容器元素定义为一个网格，使用<code>grid-template-columns</code>和<code>grid-template-rows</code>设置列和行大小，然后使用<code>grid-column</code> 和<code> grid-row</code>把它的子元素放入网格。 与flexbox类似，网格子元素的原始顺序不重要。 你的可以在 CSS 里以任意顺序放置它们，这使得使用媒体查询重新排列网格变得非常容易。 想象一下，我们需要定义整个页面的布局，然后为了适应不同的屏幕宽度完全重新排列，我们只需要几行CSS就能实现这个需求。 网格是有史以来最强大的CSS模块之一。</p>
<p>截至2017年3月，许多浏览器都提供了原生的、不加前缀的对CSS Grid的支持，比如 Chrome（包括Android），Firefox，Safari（包括iOS）和Opera。 另一方面，Internet Explorer 10和11支持它，但需要使用过时的语法。 Edge浏览器已经宣布将支持标准的Grid语法，但暂未支持。</p>
<blockquote>浏览器支持的详细数据可在<a href="https://caniuse.com/#feat=css-grid" rel="nofollow noreferrer" target="_blank">Caniuse</a>查看。其中里面的数字表示该版本以上的浏览器支持Grid。</blockquote>
<p><strong>桌面浏览器</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012889798?w=720&amp;h=110" src="https://static.alili.tech/img/remote/1460000012889798?w=720&amp;h=110" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>移动端 / 平板</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012889799?w=720&amp;h=123" src="https://static.alili.tech/img/remote/1460000012889799?w=720&amp;h=123" alt="" title="" style="cursor: pointer;"></span></p>
<p>除了微软之外，浏览器制造商在 Grid 规范完全落地以前似乎并没有放手让 Gird 野生也长的打算。 这是一件好事，这意味着我们不需要再去学习各种浏览器兼容版本的旧语法。</p>
<p>在生产环境中使用Grid只是时间问题，但现在是我们该学习的时候了。</p>
<h2 id="articleHeader2">重要术语</h2>
<p>在深入了解网格的概念之前，理解术语是很重要的。 由于这里所涉及的术语在概念上都是相似的，如果不先记住它们在网格规范中定义的含义，则很容易将它们彼此混淆。 但是不用太担心，这些术语并不多。</p>
<h4><em>Grid Container</em></h4>
<p>设置了 <code>display: gird </code>的元素。 这是所有grid item的直接父项。 在下面的例子中，<code>.container</code>就是是 grid container。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;item item-1&quot;></div>
  <div class=&quot;item item-2&quot;></div>
  <div class=&quot;item item-3&quot;></div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item item-1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item item-2"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item item-3"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt; </span></code></pre>
<h4><em>Grid Item</em></h4>
<p>Grid 容器的孩子（直接子元素）。下面的 <code>.item</code> 元素就是 grid item，但 <code>.sub-item</code>不是。</p>
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
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"container"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt; 
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span>&gt;
    &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"sub-item"</span>&gt;&lt;/p&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h4><em>Grid Line</em></h4>
<p>这个分界线组成网格结构。 它们既可以是垂直的（“column grid lines”），也可以是水平的（“row grid lines”），并位于行或列的任一侧。 下面例中的黄线就是一个列网格线。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889800?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000012889800?w=383&amp;h=219" alt="" title="" style="cursor: pointer;"></span></p>
<h4><em>Grid Track</em></h4>
<p>两个相邻网格线之间的空间。 你可以把它们想象成网格的列或行。 下面是第二行和第三行网格线之间的网格轨道。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889801?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000012889801?w=383&amp;h=219" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4><em>Grid Cell</em></h4>
<p>两个相邻的行和两个相邻的列网格线之间的空间。它是网格的一个“单元”。 下面是行网格线1和2之间以及列网格线2和3的网格单元。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889802?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000012889802?w=383&amp;h=219" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4><em>Grid Area</em></h4>
<p>四个网格线包围的总空间。 网格区域可以由任意数量的网格单元组成。 下面是行网格线1和3以及列网格线1和3之间的网格区域。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889803?w=383&amp;h=219" src="https://static.alili.tech/img/remote/1460000012889803?w=383&amp;h=219" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4><em>Grid 属性列表</em></h4>
<p>Grid Container 的全部属性</p>
<ul>
<li>display</li>
<li>grid-template-columns</li>
<li>grid-template-rows</li>
<li>grid-template-areas</li>
<li>grid-template</li>
<li>grid-column-gap</li>
<li>grid-row-gap</li>
<li>grid-gap</li>
<li>justify-items</li>
<li>align-items</li>
<li>justify-content</li>
<li>align-content</li>
<li>grid-auto-columns</li>
<li>grid-auto-rows</li>
<li>grid-auto-flow</li>
<li>grid</li>
</ul>
<p>Grid Items 的全部属性</p>
<ul>
<li>grid-column-start</li>
<li>grid-column-end</li>
<li>grid-row-start</li>
<li>grid-row-end</li>
<li>grid-column</li>
<li>grid-row</li>
<li>grid-area</li>
<li>justify-self</li>
<li>align-self</li>
</ul>
<h2 id="articleHeader3">父容器(Grid Container)的属性</h2>
<h4><em>display</em></h4>
<p>将元素定义为 grid contaienr，并为其内容建立新的网格格式化上下文(grid formatting context)。</p>
<p>值:</p>
<ul>
<li>grid - 生成一个块级(block-level)网格</li>
<li>inline-grid - 生成一个行级(inline-level)网格</li>
<li>subgrid - 如果你的 grid container 本身就是一个 grid item（即,嵌套网格），你可以使用这个属性来表示你想从它的父节点获取它的行/列的大小，而不是指定它自己的大小。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid | inline-grid | subgrid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid | inline-grid | subgrid;
}</code></pre>
<p>注意：<code>column</code>, <code>float</code>, <code>clear</code>, 以及 <code>vertical-align</code> 对一个 grid container 没有影响</p>
<h4><em>grid-template-columns / grid-template-rows</em></h4>
<p>使用以空格分隔的多个值来定义网格的列和行。这些值表示轨道大小(track size)，它们之间的空格代表表格线(grid line)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>.<span class="hljs-keyword">container</span> {
  <span class="hljs-keyword">grid</span>-template-columns: &lt;<span class="hljs-keyword">track</span>-<span class="hljs-keyword">size</span>&gt; ... | &lt;line-name&gt; &lt;<span class="hljs-keyword">track</span>-<span class="hljs-keyword">size</span>&gt; ...;
  <span class="hljs-keyword">grid</span>-template-rows: &lt;<span class="hljs-keyword">track</span>-<span class="hljs-keyword">size</span>&gt; ... | &lt;line-name&gt; &lt;<span class="hljs-keyword">track</span>-<span class="hljs-keyword">size</span>&gt; ...;
}</code></pre>
<p>例子:</p>
<p>(如果未显示的给网格线命名)，轨道值之间仅仅有空格时，网格线会被自动分配数字名称：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">40px</span> <span class="hljs-number">50px</span> auto <span class="hljs-number">50px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">25%</span> <span class="hljs-number">100px</span> auto;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889804?w=464&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889804?w=464&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<p>但你可以给网格线指定确切的命名。 注意中括号里的网格线命名语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code>.<span class="hljs-keyword">container</span> {
  grid-template-columns: <span class="hljs-comment">[first]</span> 40px <span class="hljs-comment">[line2]</span> 50px <span class="hljs-comment">[line3]</span> auto <span class="hljs-comment">[col4-start]</span> 50px <span class="hljs-comment">[five]</span> 40px <span class="hljs-comment">[end]</span>;
  grid-template-rows: <span class="hljs-comment">[row1-start]</span> 25% <span class="hljs-comment">[row1-end]</span> 100px <span class="hljs-comment">[third-line]</span> auto <span class="hljs-comment">[last-line]</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889805?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889805?w=514&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<p>需要注意的是，一个网格线可以有不止一个名字。例如，这里第2条网格线有两个名字：row1-end 和 row2-start：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">25%</span> [row1-end row2-start] <span class="hljs-number">25%</span> [row2-end];
}</code></pre>
<p>如果你的定义中包含重复的部分，则可以使用repeat() 符号来简化写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: repeat(3, 20px [col-start]) 5%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 20px [col-start]) <span class="hljs-number">5%</span>;
}</code></pre>
<p>上面的写法和下面等价：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">20px</span> [col-start] <span class="hljs-number">5%</span>;
}</code></pre>
<p>“fr”单位允许您将轨道大小设置为网格容器自由空间的一部分。 例如，下面的代码会将每个 grid item 为 grid container 宽度的三分之一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 1fr 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<p>自由空间是在排除所有不可伸缩的 grid item 之后计算得到的。 在下面的示例中，fr单位可用的自由空间总量不包括50px:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">50px</span> <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<h3 id="articleHeader4">grid-template-areas</h3>
<p>通过引用 <code>grid-area</code>属性指定的网格区域的名称来定义网格模板。 重复网格区域的名称导致内容扩展到这些单元格。 点号表示一个空单元格。 语法本身提供了网格结构的可视化。</p>
<p>值：</p>
<ul>
<li>
<code>&lt;grid-area-name&gt;</code> - 使用 grid-area 属性设置的网格区域的名称</li>
<li>. - 点号代表一个空网格单元</li>
<li>none - 没有定义网格区域</li>
</ul>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    &quot;header header header header&quot;
    &quot;main main . sidebar&quot;
    &quot;footer footer footer footer&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">grid-area</span>: header;
}
<span class="hljs-selector-class">.item-b</span> {
  <span class="hljs-attribute">grid-area</span>: main;
}
<span class="hljs-selector-class">.item-c</span> {
  <span class="hljs-attribute">grid-area</span>: sidebar;
}
<span class="hljs-selector-class">.item-d</span> {
  <span class="hljs-attribute">grid-area</span>: footer;
}

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">50px</span> <span class="hljs-number">50px</span> <span class="hljs-number">50px</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: auto;
  <span class="hljs-attribute">grid-template-areas</span>: 
    <span class="hljs-string">"header header header header"</span>
    <span class="hljs-string">"main main . sidebar"</span>
    <span class="hljs-string">"footer footer footer footer"</span>;
}</code></pre>
<p>这将创建一个四列宽三行高的网格。 整个第一行将由 header 区域组成。 中间一行将由两个 main 区域、一个空单元格和一个 sidebar 区域组成。 最后一行是footer区域组成。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889806?w=427&amp;h=330" src="https://static.alili.tech/img/remote/1460000012889806?w=427&amp;h=330" alt="" title="" style="cursor: pointer;"></span></p>
<p>你的声明中的每一行都需要有相同数量的单元格。</p>
<p>您可以使用任意数量的相邻的.来声明单个空单元格。 只要这些点号之间没有空格，他们就代表了一个单一的单元格。</p>
<p>需要注意的是你不是在用这个语法命名网格线，而是在命名区域。 当你使用这种语法时，区域两端的网格线实际上是自动命名的。 比如，如果网格区域的名称是foo，那么区域的起始的行网格线和列网格线名称是 foo-start，并且区域终点的行网格线和列网格线名称是 foo-end。 这意味着某些网格线可能有多个名称，比如上面的例子中最左边的一条网格线有三个名字：header-start，main-start 和 footer-start。</p>
<h4><em>grid-template</em></h4>
<p>在单个声明中定义 grid-template-rows、grid-template-columns、grid-template-areas 的简写。</p>
<p>值：</p>
<ul>
<li>none - 将三个属性都设置为其初始值</li>
<li>subgrid - 把 grid-template-rows 和 grid-template-columns 设置为 subgrid, 并且 grid-template-areas 设置为初始值</li>
<li>
<code>grid-template-rows</code> / <code>&lt;grid-template-columns</code> - 把 grid-template-columns 和 grid-template-rows 设置为指定值, 与此同时, 设置 grid-template-areas 为 none</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template: none | subgrid | <grid-template-rows> / <grid-template-columns>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template</span>: none | subgrid | &lt;grid-template-rows&gt; / &lt;grid-template-columns&gt;;
}</code></pre>
<p>它也可以使用一个更复杂但相当方便的语法来指定这三个值。 一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template:
    [row1-start] &quot;header header header&quot; 25px [row1-end]
    [row2-start] &quot;footer footer footer&quot; 25px [row2-end]
    / auto 50px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>.container {
  grid-<span class="hljs-keyword">template</span>:
    [row1-start] <span class="hljs-string">"header header header"</span> <span class="hljs-number">25</span>px [row1-<span class="hljs-built_in">end</span>]
    [row2-start] <span class="hljs-string">"footer footer footer"</span> <span class="hljs-number">25</span>px [row2-<span class="hljs-built_in">end</span>]
    / <span class="hljs-keyword">auto</span> <span class="hljs-number">50</span>px <span class="hljs-keyword">auto</span>;
}</code></pre>
<p>以上等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    &quot;header header header&quot; 
    &quot;footer footer footer&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">25px</span> [row1-end row2-start] <span class="hljs-number">25px</span> [row2-end];
  <span class="hljs-attribute">grid-template-columns</span>: auto <span class="hljs-number">50px</span> auto;
  <span class="hljs-attribute">grid-template-areas</span>: 
    <span class="hljs-string">"header header header"</span> 
    <span class="hljs-string">"footer footer footer"</span>;
}</code></pre>
<p>由于 grid-template 不会重置隐式网格属性（<code>grid-auto-columns</code>，<code>grid-auto-rows</code>和<code>grid-auto-flow</code>），而这可能是大多数情况下你想要做的。因此建议使用grid属性来代替<code>grid-template</code>。</p>
<h4><em>grid-column-gap / grid-row-gap</em></h4>
<p>指定网格线的大小，你可以把它想象为设置列/行之间的间距的宽度。</p>
<p>值：</p>
<ul><li>
<code>line-size</code> - 一个长度值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-column-gap</span>: &lt;line-size&gt;;
  <span class="hljs-attribute">grid-row-gap</span>: &lt;line-size&gt;;
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">80px</span> auto <span class="hljs-number">80px</span>; 
  <span class="hljs-attribute">grid-column-gap</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">grid-row-gap</span>: <span class="hljs-number">15px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889807?w=322&amp;h=273" src="https://static.alili.tech/img/remote/1460000012889807?w=322&amp;h=273" alt="" title="" style="cursor: pointer;"></span></p>
<p>只能在列/行之间创建缝隙，而不是在外部边缘创建。</p>
<h4><em>grid-gap</em></h4>
<p>grid-row-gap 和 grid-column-gap 的缩写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-gap: <grid-row-gap> <grid-column-gap>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-gap</span>: &lt;grid-row-gap&gt; &lt;grid-column-gap&gt;;
}</code></pre>
<p>Example:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-gap: 10px 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">100px</span> <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">80px</span> auto <span class="hljs-number">80px</span>; 
  <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">10px</span> <span class="hljs-number">15px</span>;
}</code></pre>
<p>如果没有指定 grid-row-gap，则会被设置为与 grid-column-gap 相同的值。</p>
<h4><em>justify-items</em></h4>
<p>沿着行轴对齐网格内的内容（与之对应的是 align-items, 即沿着列轴对齐），该值适用于容器内的所有的 grid items。</p>
<p>值：</p>
<ul>
<li>start: 内容与网格区域的左端对齐</li>
<li>end: 内容与网格区域的右端对齐</li>
<li>center: 内容位于网格区域的中间位置</li>
<li>stretch: 内容宽度占据整个网格区域空间(这是默认值)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-items: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-items</span>: start | end | center | stretch;
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-items: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-items</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889808?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889808?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  justify-items: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">justify-items</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889809?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889809?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-items</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889810?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889810?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-items: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-items</span>: stretch;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889811?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889811?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<p>也可以通过给单个 grid item 设置<code>justify-self</code>属性来达到上述效果。</p>
<h4><em>align-items</em></h4>
<p>沿着列轴对齐grid item 里的内容（与之对应的是使用 justify-items 设置沿着行轴对齐），该值适用于容器内的所有 grid items。</p>
<p>值：</p>
<ul>
<li>start: 内容与网格区域的顶端对齐</li>
<li>end: 内容与网格区域的底部对齐</li>
<li>center: 内容位于网格区域的垂直中心位置</li>
<li>stretch: 内容高度占据整个网格区域空间(这是默认值)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: start | end | center | stretch;
}</code></pre>
<p>举例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889812?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889812?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889813?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889813?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889814?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889814?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: stretch;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889815?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889815?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<p>也可以通过给单个 grid item 设置<code>align-self</code>属性来达到上述效果。</p>
<h4><em>justify-content</em></h4>
<p>有时，网格的总大小可能小于其网格容器的大小。如果你的所有 grid items 都使用像px这样的非弹性单位来设置大小，则可能发生这种情况。此时，你可以设置网格容器内的网格的对齐方式。 此属性沿着行轴对齐网格（与之对应的是 align-content, 沿着列轴对齐）。</p>
<p>值：</p>
<ul>
<li>start - 网格与网格容器的左边对齐</li>
<li>end - 网格与网格容器的右边对齐</li>
<li>center - 网格与网格容器的中间对齐</li>
<li>stretch - 调整g rid item 的大小，让宽度填充整个网格容器</li>
<li>space-around - 在 grid item 之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半</li>
<li>space-between - 在 grid item 之间设置均等宽度空白间隙，其外边缘无间隙</li>
<li>space-evenly - 在每个 grid item 之间设置均等宽度的空白间隙，包括外边缘</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>.container {
  justify-content: start | <span class="hljs-keyword">end</span> | center | stretch | <span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span> | <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> | <span class="hljs-literal">space</span>-evenly;  
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889816?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889816?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: end; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: end; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889817?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889817?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: center;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: center;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889818?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889818?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: stretch; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: stretch; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889819?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889819?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: space-around;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: space-around;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889820?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889820?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: space-between; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: space-between; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889821?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889821?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: space-evenly;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: space-evenly;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889822?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889822?w=387&amp;h=187" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">align-content</h3>
<p>有时，网格的总大小可能小于其网格容器的大小。如果你的所有 grid items 都使用像px这样的非弹性单位来设置大小，则可能发生这种情况。此时，你可以设置网格容器内的网格的对齐方式。 此属性沿着列轴对齐网格（与之对应的是 justify-content, 即沿着行轴对齐）。</p>
<p>值：</p>
<ul>
<li>start - 网格与网格容器的顶部对齐</li>
<li>end - 网格与网格容器的底部对齐</li>
<li>center - 网格与网格容器的中间对齐</li>
<li>stretch - 调整 grid item 的大小，让高度填充整个网格容器</li>
<li>space-around - 在 grid item 之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半</li>
<li>space-between - 在 grid item 之间设置均等宽度空白间隙，其外边缘无间隙</li>
<li>space-evenly - 在每个 grid item 之间设置均等宽度的空白间隙，包括外边缘</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>.container {
  align-content: start | <span class="hljs-keyword">end</span> | center | stretch | <span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span> | <span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span> | <span class="hljs-literal">space</span>-evenly;  
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: start; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: start; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889823?w=387&amp;h=187" src="https://static.alili.tech/img/remote/1460000012889823?w=387&amp;h=187" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: end; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: end; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889824?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889824?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: center;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: center;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889825?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889825?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: stretch; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: stretch; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889826?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889826?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: space-around;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: space-around;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889827?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889827?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: space-between; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: space-between; 
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889828?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889828?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: space-evenly;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: space-evenly;  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889829?w=258&amp;h=275" src="https://static.alili.tech/img/remote/1460000012889829?w=258&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<h4><em>grid-auto-columns / grid-auto-rows</em></h4>
<p>指定自动生成的网格轨道（又名隐式网格轨道）的大小。 隐式网格轨道在你显式的定位超出指定网格范围的行或列（使用 grid-template-rows/grid-template-columns）时被创建。</p>
<p>值：</p>
<ul><li>
<code>&lt;track-size&gt;</code> - 可以是一个长度值，一个百分比值，或者一个自由空间的一部分（使用 fr 单位）</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-auto-columns</span>: &lt;track-size&gt; ...;
  <span class="hljs-attribute">grid-auto-rows</span>: &lt;track-size&gt; ...;
}</code></pre>
<p>为了说明如何创建隐式网格轨道，思考如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">90px</span> <span class="hljs-number">90px</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889830?w=188&amp;h=229" src="https://static.alili.tech/img/remote/1460000012889830?w=188&amp;h=229" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里创建了一个 2x2的网格。</p>
<p>但是，现在想象一下，使用 grid-column 和 grid-row 来定位你的网格项目，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.item-b</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">5</span> / <span class="hljs-number">6</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889831?w=320&amp;h=229" src="https://static.alili.tech/img/remote/1460000012889831?w=320&amp;h=229" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里我们指定 .item-b开始于列网格线 5 并结束于在列网格线 6，但我们并未定义列网格线 5 或 6。因为我们引用不存在的网格线，宽度为0的隐式轨道的就会被创建用与填补间隙。我们可以使用 grid-auto-columns 和 grid-auto-rows属性来指定这些隐式轨道的宽度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-auto-columns: 60px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-auto-columns</span>: <span class="hljs-number">60px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889832?w=401&amp;h=229" src="https://static.alili.tech/img/remote/1460000012889832?w=401&amp;h=229" alt="" title="" style="cursor: pointer;"></span></p>
<h4><em>grid-auto-flow</em></h4>
<p>如果你存在没有显示指明放置在网格上的 grid item，则自动放置算法会自动放置这些项目。 而该属性则用于控制自动布局算法的工作方式。</p>
<p>值：</p>
<ul>
<li>row - 告诉自动布局算法依次填充每行，根据需要添加新行</li>
<li>column - 告诉自动布局算法依次填充每列，根据需要添加新列</li>
<li>dense - 告诉自动布局算法，如果后面出现较小的 grid item，则尝试在网格中填充空洞</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-auto-flow: row | column | row dense | column dense
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-auto-flow</span>: row | column | row dense | column dense
}</code></pre>
<p>需要注意的是，dense 可能导致您的 grid item 乱序。</p>
<p>举例， 考虑如下 HTML：</p>
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
      </div><pre class="hljs applescript"><code>&lt;section <span class="hljs-built_in">class</span>=<span class="hljs-string">"container"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item-a"</span>&gt;<span class="hljs-built_in">item</span>-a&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item-b"</span>&gt;<span class="hljs-built_in">item</span>-b&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item-c"</span>&gt;<span class="hljs-built_in">item</span>-c&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item-d"</span>&gt;<span class="hljs-built_in">item</span>-d&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item-e"</span>&gt;<span class="hljs-built_in">item</span>-e&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/section&gt;</code></pre>
<p>你定义一个有5列和2行的网格，并将 grid-auto-flow 设置为 row（这也是默认值）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: row;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">30px</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">grid-auto-flow</span>: row;
}</code></pre>
<p>当把 grid item 放在网格上时，你只把其中两个设置了固定的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  grid-column: 1;
  grid-row: 1 / 3;
}
.item-e {
  grid-column: 5;
  grid-row: 1 / 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.item-e</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">5</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
}</code></pre>
<p>因为我们将 grid-auto-flow 设置为row，所以我们的grid就像这样。 注意观察我们没有做设置的三个项目（item-b，item-c和item-d）是如何在剩余的行水平摆放位置的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889833?w=371&amp;h=77" src="https://static.alili.tech/img/remote/1460000012889833?w=371&amp;h=77" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们将 grid-auto-flow 设置为 column，则 item-b，item-c 和 item-d 以列的顺序上下摆放：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: column;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span> <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">30px</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">grid-auto-flow</span>: column;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889834?w=371&amp;h=77" src="https://static.alili.tech/img/remote/1460000012889834?w=371&amp;h=77" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4><em>grid</em></h4>
<p>在单个属性中设置所有以下属性的简写：grid-template-rows，grid-template-columns，grid-template-areas，grid-auto-rows，grid-auto-columns和grid-auto-flow。 它同时也将 sets grid-column-gap 和 grid-row-gap 设置为它们的初始值，即使它们不能被此属性显示设置。</p>
<p>值：</p>
<ul>
<li>none - 将所有子属性设置为其初始值</li>
<li>
<code>&lt;grid-template-rows&gt;</code> / <code>&lt;grid-template-columns&gt;</code> - 将 grid-template-rows 和 grid-template-columns 分别设置为指定值，将所有其他子属性设置为其初始值</li>
<li>
<code>&lt;grid-auto-flow&gt;</code> [<code>&lt;grid-auto-rows&gt;</code> [ / <code>&lt;grid-auto-columns&gt;</code>] ] - 接受所有与grid-auto-flow，grid-auto-rows和grid-auto-columns相同的值。 如果省略grid-auto-columns，则将其设置为为grid-auto-rows指定的值。 如果两者都被省略，则它们被设置为它们的初始值</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    grid: none | <grid-template-rows> / <grid-template-columns> | <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>.container {
    grid: none | &lt;grid-template-rows&gt; / &lt;grid-template-columns&gt; | &lt;grid-auto-flow&gt; <span class="hljs-meta">[&lt;grid-auto-rows&gt; [/ &lt;grid-auto-columns&gt;]</span>];
}</code></pre>
<p>举例：</p>
<p>以下代码写法等价</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid: 200px auto / 1fr auto 1fr;
}
.container {
  grid-template-rows: 200px auto;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid</span>: <span class="hljs-number">200px</span> auto / <span class="hljs-number">1</span>fr auto <span class="hljs-number">1</span>fr;
}
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">200px</span> auto;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr auto <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-template-areas</span>: none;
}</code></pre>
<p>以下代码写法等价</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid: column 1fr / auto;
}
.container {
  grid-auto-flow: column;
  grid-auto-rows: 1fr;
  grid-auto-columns: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid</span>: column <span class="hljs-number">1</span>fr / auto;
}
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-auto-flow</span>: column;
  <span class="hljs-attribute">grid-auto-rows</span>: <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-auto-columns</span>: auto;
}</code></pre>
<p>它也可用使用一个更复杂但相当方便的语法来一次设置所有内容。 你可以指定 grid-template-areas、grid-template-rows 以及 grid-template-columns，并将所有其他子属性设置为其初始值。 你现在所做的是在其网格区域内，指定网格线名称和内联轨道大小。 可以看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid: [row1-start] &quot;header header header&quot; 1fr [row1-end]
        [row2-start] &quot;footer footer footer&quot; 25px [row2-end]
        / auto 50px auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid</span>: [row1-start] <span class="hljs-string">"header header header"</span> <span class="hljs-number">1</span>fr [row1-end]
        [row2-start] <span class="hljs-string">"footer footer footer"</span> <span class="hljs-number">25px</span> [row2-end]
        / auto <span class="hljs-number">50px</span> auto;
}</code></pre>
<p>上述代码等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  grid-template-areas: 
    &quot;header header header&quot;
    &quot;footer footer footer&quot;;
  grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-areas</span>: 
    <span class="hljs-string">"header header header"</span>
    <span class="hljs-string">"footer footer footer"</span>;
  <span class="hljs-attribute">grid-template-rows</span>: [row1-start] <span class="hljs-number">1</span>fr [row1-end row2-start] <span class="hljs-number">25px</span> [row2-end];
  <span class="hljs-attribute">grid-template-columns</span>: auto <span class="hljs-number">50px</span> auto;    
}</code></pre>
<h2 id="articleHeader6">孩子(Grid Items)的属性</h2>
<h5><em>grid-column-start / grid-column-end / grid-row-start /grid-row-end</em></h5>
<p>使用特定的网格线确定 grid item 在网格内的位置。grid-column-start/grid-row-start 属性表示grid item的网格线的起始位置，grid-column-end/grid-row-end属性表示网格项的网格线的终止位置。</p>
<p>值：</p>
<ul>
<li>
<code>&lt;line&gt;</code>: 可以是一个数字来指代相应编号的网格线，也可使用名称指代相应命名的网格线</li>
<li>
<code>span &lt;number&gt;</code>: 网格项将跨越指定数量的网格轨道</li>
<li>
<code>span &lt;name&gt;</code>: 网格项将跨越一些轨道，直到碰到指定命名的网格线</li>
<li>auto: 自动布局， 或者自动跨越， 或者跨越一个默认的轨道</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>.item {
  grid-column-<span class="hljs-keyword">star</span><span class="hljs-variable">t:</span> <span class="hljs-symbol">&lt;number&gt;</span> | <span class="hljs-symbol">&lt;name&gt;</span> | span <span class="hljs-symbol">&lt;number&gt;</span> | span <span class="hljs-symbol">&lt;name&gt;</span> | auto
  grid-column-end: <span class="hljs-symbol">&lt;number&gt;</span> | <span class="hljs-symbol">&lt;name&gt;</span> | span <span class="hljs-symbol">&lt;number&gt;</span> | span <span class="hljs-symbol">&lt;name&gt;</span> | auto
  grid-row-<span class="hljs-keyword">star</span><span class="hljs-variable">t:</span> <span class="hljs-symbol">&lt;number&gt;</span> | <span class="hljs-symbol">&lt;name&gt;</span> | span <span class="hljs-symbol">&lt;number&gt;</span> | span <span class="hljs-symbol">&lt;name&gt;</span> | auto
  grid-row-end: <span class="hljs-symbol">&lt;number&gt;</span> | <span class="hljs-symbol">&lt;name&gt;</span> | span <span class="hljs-symbol">&lt;number&gt;</span> | span <span class="hljs-symbol">&lt;name&gt;</span> | auto
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-column-end</span>: five;
  <span class="hljs-attribute">grid-row-start</span>: row1-start
  grid-row-end: <span class="hljs-number">3</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889835?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889835?w=514&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-b {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-b</span> {
  <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-column-end</span>: span col4-start;
  <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>
  grid-row-end: span <span class="hljs-number">2</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889836?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889836?w=514&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果没有声明 grid-column-end / grid-row-end，默认情况下，该网格项将跨越1个轨道。</p>
<p>网格项可以相互重叠。 您可以使用z-index来控制它们的堆叠顺序。</p>
<h3 id="articleHeader7">grid-column / grid-row</h3>
<p>grid-column-start + grid-column-end, 和 grid-row-start + grid-row-end 的简写形式。</p>
<p>值：</p>
<ul><li>
<code>&lt;start-line&gt;</code> / <code>&lt;end-line&gt; </code>- 每个值的用法都和属性分开写时的用法一样</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>.<span class="hljs-class">item </span>{
  grid-column: <span class="hljs-params">&lt;start-line&gt;</span> / <span class="hljs-params">&lt;end-line&gt;</span> | <span class="hljs-params">&lt;start-line&gt;</span> / span <span class="hljs-params">&lt;value&gt;</span>;
  grid-row: <span class="hljs-params">&lt;start-line&gt;</span> / <span class="hljs-params">&lt;end-line&gt;</span> | <span class="hljs-params">&lt;start-line&gt;</span> / span <span class="hljs-params">&lt;value&gt;</span>;
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-c</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span> / span <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row</span>: third-line / <span class="hljs-number">4</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889837?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889837?w=514&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果没有指定结束行值，则该网格项默认跨越1个轨道。</p>
<h4><em>grid-area</em></h4>
<p>给 grid item 进行命名以便于使用 grid-template-areas 属性创建模板时来进行引用。另外也可以做为 grid-row-start + grid-column-start + grid-row-end + grid-column-end 的简写形式。</p>
<p>值：</p>
<ul>
<li>
<code>&lt;name&gt;</code> - 你的命名</li>
<li>
<code>&lt;row-start&gt;</code> / <code>&lt;column-start&gt;</code> /<code> &lt;row-end&gt;</code> /<code>&lt;column-end&gt;</code> - 可以是数字，也可以是网格线的名字</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>.<span class="hljs-class">item </span>{
  grid-area: <span class="hljs-params">&lt;name&gt;</span> | <span class="hljs-params">&lt;row-start&gt;</span> / <span class="hljs-params">&lt;column-start&gt;</span> / <span class="hljs-params">&lt;row-end&gt;</span> / <span class="hljs-params">&lt;column-end&gt;</span>;
}</code></pre>
<p>举例:</p>
<p>给一个网格项命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-d {
  grid-area: header
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-d</span> {
  <span class="hljs-attribute">grid-area</span>: header
}</code></pre>
<p>作为 grid-row-start + grid-column-start + grid-row-end + grid-column-end 的简写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-d {
  grid-area: 1 / col4-start / last-line / 6
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-d</span> {
  <span class="hljs-attribute">grid-area</span>: <span class="hljs-number">1</span> / col4-start / last-line / <span class="hljs-number">6</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889838?w=514&amp;h=365" src="https://static.alili.tech/img/remote/1460000012889838?w=514&amp;h=365" alt="" title="" style="cursor: pointer;"></span></p>
<h4><em>justify-self</em></h4>
<p>沿着行轴对齐grid item 里的内容（与之对应的是 align-self, 即沿列轴对齐）。 此属性对单个网格项内的内容生效。</p>
<p>值：</p>
<ul>
<li>start - 将内容对齐到网格区域的左端</li>
<li>end - 将内容对齐到网格区域的右端</li>
<li>center - 将内容对齐到网格区域的中间</li>
<li>stretch - 填充网格区域的宽度 (这是默认值)</li>
</ul>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  justify-self: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">justify-self</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889839?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889839?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  justify-self: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">justify-self</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889840?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889840?w=312&amp;h=125" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  justify-self: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">justify-self</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889841?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889841?w=312&amp;h=125" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  justify-self: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">justify-self</span>: stretch;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889842?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889842?w=312&amp;h=125" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>要为网格中的所有grid items 设置对齐方式，也可以通过 justify-items 属性在网格容器上设置此行为。</p>
<h3 id="articleHeader8">align-self</h3>
<p>沿着列轴对齐grid item 里的内容（与之对应的是 justify-self, 即沿行轴对齐）。 此属性对单个网格项内的内容生效。</p>
<p>值：</p>
<ul>
<li>start - 将内容对齐到网格区域的顶部</li>
<li>end - 将内容对齐到网格区域的底部</li>
<li>center - 将内容对齐到网格区域的中间</li>
<li>stretch - 填充网格区域的高度 (这是默认值)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  align-self: start | end | center | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">align-self</span>: start | end | center | stretch;
}</code></pre>
<p>举例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  align-self: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">align-self</span>: start;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889843?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889843?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  align-self: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">align-self</span>: end;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889844?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889844?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  align-self: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">align-self</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889845?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889845?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-a {
  align-self: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.item-a</span> {
  <span class="hljs-attribute">align-self</span>: stretch;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012889846?w=312&amp;h=125" src="https://static.alili.tech/img/remote/1460000012889846?w=312&amp;h=125" alt="" title="" style="cursor: pointer;"></span></p>
<p>要为网格中的所有grid items 统一设置对齐方式，也可以通过 align-items 属性在网格容器上设置此行为。</p>
<p>加微信号: astak10或者长按识别下方二维码进入前端技术交流群 ，暗号：写代码啦</p>
<p>每日一题，每周资源推荐，精彩博客推荐，工作、笔试、面试经验交流解答，免费直播课，群友轻分享... ，数不尽的福利免费送</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012605904?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000012605904?w=200&amp;h=200" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS Grid 系列(上)-Grid布局完整指南

## 原文链接
[https://segmentfault.com/a/1190000012889793](https://segmentfault.com/a/1190000012889793)

