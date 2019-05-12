---
title: 'Flex布局完全教程' 
date: 2019-01-18 2:30:34
hidden: true
slug: cdjp78tbjoi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">A Complete Guide to Flexbox</a><br>  作者：<a href="https://css-tricks.com/author/chriscoyier/" rel="nofollow noreferrer" target="_blank">CHRIS COYIER</a><br>译者：<a href="https://www.zhihu.com/people/shelley-lee-94" rel="nofollow noreferrer" target="_blank">Shelley Lee</a><br>本文同时发布于<a href="https://zhuanlan.zhihu.com/fe-guide" rel="nofollow noreferrer" target="_blank">知乎专栏：前端指南</a><br>转载需提前联系译者，未经允许不得转载。</p></blockquote>
<h2 id="articleHeader0">背景介绍</h2>
<p>Flexbox 布局（也叫Flex布局，弹性盒子布局）模块目标在于提供一个更有效地布局、对齐方式，并且能够使父元素在子元素的大小未知或动态变化情况下仍然能够分配好子元素之间的间隙。</p>
<p>Flex布局的主要思想是使父元素能够调节子元素的高度、宽度和排布的顺序，从而能够最好地适应可用布局空间（能够适应不同的设备和不同大小的屏幕）。设定为flex布局的父元素（容器）能够放大子元素使之尽可能填充可用空间，也可以收缩子元素使之不溢出。</p>
<p>最重要的是，与传统布局中块状元素按照垂直方向摆放，行内元素按照水平方向摆放相比，flex布局是无方向的。传统布局在应对大型复杂的布局时缺乏灵活性，特别是在改变方向、改变大小、伸展、收缩等等方面。</p>
<p><strong>注</strong>: Flex 布局比较适合小规模的布局，Gird布局面向更大规模的布局。</p>
<h2 id="articleHeader1">基本概念</h2>
<p>Flex布局是一个完整的模块而不是一个单独的属性，它包括了完整的一套属性。其中有的属性是设置在容器（container，也可以叫做父元素，称为<code>flex container</code>）上，有的则是设置在容器的项目上（item，也可以叫做子元素，称为<code>flex items</code>）上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823766" src="https://static.alili.tech/img/remote/1460000008823766" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000008823767" src="https://static.alili.tech/img/remote/1460000008823767" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>译者注：由于item译成项目不够直观和形象，以下统一用父元素指代container，子元素指代item。</p></blockquote>
<p>如果我们可以说传统布局是建立在块状元素垂直流和行内元素水平流上的，那么flex布局就是建立在"flex-flow方向"上的，通过下图解释flex布局的主要思想。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823768?w=659&amp;h=281" src="https://static.alili.tech/img/remote/1460000008823768?w=659&amp;h=281" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在flex布局中，子元素要么按照主轴也就是<code>main axis</code>（从<code>main-start</code>到<code>main-end</code>）排布，要么按照交叉轴，也就是<code>cross axis</code>(从<code>cross-start</code>到<code>cross-end</code>)排布。</p>
<p>下面介绍几个概念：</p>
<ul>
<li><p>__main axis__: Flex 父元素的主轴是指子元素布局的主要方向轴，注意主轴不一定是水平的，它由属性<code>flex-direction</code>来确定主轴是水平还是垂直的（后面会介绍）。</p></li>
<li><p>__main-start|main-end__: 分别表示主轴的开始和结束，子元素在父元素中会沿着主轴从<code>main-start</code>到<code>main-end</code>排布。</p></li>
<li><p>__main size__: 单个项目占据主轴的长度大小。</p></li>
<li><p>__cross axis__: 交叉轴，与主轴垂直。</p></li>
<li><p>__cross-start|cross-end__: 分别表示交叉轴的开始和结束。子元素在交叉轴的排布从<code>cross-start</code>开始到<code>cross-end</code>。</p></li>
<li><p>__cross size__:  子元素在交叉轴方向上的大小。</p></li>
</ul>
<h2 id="articleHeader2">属性介绍</h2>
<p>属性分作用于父元素的属性和作用于子元素的属性两部分介绍。</p>
<h3 id="articleHeader3">父元素属性</h3>
<h4>display</h4>
<p>用来定义父元素是一个 flex布局容器。如果设置为<code>flex</code>则父元素为块状元素，设置为<code>inline-flex</code>父元素呈现为行内元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: flex; /* or inline-flex */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: flex; <span class="hljs-comment">/* or inline-flex */</span>
}</code></pre>
<h4>flex-direction</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823769" src="https://static.alili.tech/img/remote/1460000008823769" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>flex-direction</code>定义flex布局的主轴方向。flex布局是单方向布局，子元素主要沿着水平行或者垂直列布局。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  flex-direction: row | row-reverse | column | column-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">flex-direction</span>: row | row-reverse | column | column-reverse;
}</code></pre>
<ul>
<li><p><code>row</code>: 行方向，<code>flex-direction</code>的默认值，在<code>ltr</code>(left to right， 从左到右)排版方式下从左到右排列，在<code>rtl</code>(right to left， 从右到左)排版方式下从右到左排列。</p></li>
<li><p><code>row-reverse</code>: 行反方向，在<code>ltr</code>中从右向左，在<code>rtl</code>中从左到右。</p></li>
<li><p><code>column</code>: 列方向，与<code>row</code>相似，只是从上到下。</p></li>
<li><p><code>column-reverse</code>: 列反方向，与<code>row-reverse</code>相似，只是从下岛上。</p></li>
</ul>
<h4>flex-wrap</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823770" src="https://static.alili.tech/img/remote/1460000008823770" alt="" title="" style="cursor: pointer;"></span></p>
<p>默认情况下，flex布局中父元素会把子元素尽可能地排在同一行，通过设置<code>flex-wrap</code>来决定是否允许子元素这行排列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">flex-wrap</span>: nowrap | wrap | wrap-reverse;
}</code></pre>
<ul>
<li><p><code>nowrap</code>: 不折行，默认值，所有的子元素会排在一行。</p></li>
<li><p><code>wrap</code>: 折行，子元素会从上到下根据需求折成多行。</p></li>
<li><p><code>wrap-reverse</code>: 从下向上折行，子元素会从下岛上根据需求折成多行。</p></li>
</ul>
<p>这里有一些可视化的<a href="https://css-tricks.com/almanac/properties/f/flex-wrap/" rel="nofollow noreferrer" target="_blank">示例</a>。</p>
<h4>flex-flow</h4>
<p><code>flex-flow</code>是<code>flex-direction</code>和<code>flex-wrap</code>属性的缩写形式。默认值是<code>row,nowrap</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-flow: <‘flex-direction’> || <‘flex-wrap’>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">flex-flow</span>: &lt;‘<span class="hljs-selector-tag">flex-direction</span>’&gt; || &lt;‘<span class="hljs-selector-tag">flex-wrap</span>’&gt;</code></pre>
<h4>justify-content</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823771" src="https://static.alili.tech/img/remote/1460000008823771" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>justify-content</code>属性定义了子元素沿主轴方向的对齐方式，用来当子元素大小最大的时候，分配主轴上的剩余空间。也可以当子元素超出主轴的时候用来控制子元素的对齐方式。</p>
<ul>
<li><p><code>flex-start</code>: 默认值，朝主轴开始的方向对齐。</p></li>
<li><p><code>flex-end</code>: 朝主轴结束的方向对齐。</p></li>
<li><p><code>center</code>: 沿主轴方向居中。</p></li>
<li><p><code>space-between</code>: 沿主轴两端对齐，第一个子元素在主轴起点，最后一个子元素在主轴终点。</p></li>
<li><p><code>space-around</code>: 沿主轴子元素之间均匀分布。要注意的是子元素看起来间隙是不均匀的，第一个子元素和最后一个子元素离父元素的边缘有一个单位的间隙，但两个子元素之间有两个单位的间隙，因为每个子元素的两侧都有一个单位的间隙。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">justify-content</span>: flex-start | flex-end | center | space-between | space-around;
}</code></pre>
<h4>align-items</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823772" src="https://static.alili.tech/img/remote/1460000008823772" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>align-items</code>定义了子元素在交叉轴方向的对齐方向，这是在每个子元素仍然在其原来所在行的基础上所说的。可以看作是交叉轴上的<code>justify-content</code>属性;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-items</span>: flex-start | flex-end | center | baseline | stretch;
}</code></pre>
<ul>
<li><p>flex-start: 按照交叉轴的起点对齐。</p></li>
<li><p>flex-end: 按照交叉轴的终点对齐。</p></li>
<li><p>center: 沿交叉轴方向居中。</p></li>
<li><p>baseline: 按照项目的第一行文字的基线对齐。</p></li>
<li><p>stretch: 默认值，在满足子项目所设置的<code>min-height</code>、<code>max-height</code>、<code>height</code>的情况下拉伸子元素使之填充整个父元素。</p></li>
</ul>
<h4>align-content</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823773" src="https://static.alili.tech/img/remote/1460000008823773" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>align-content</code>是当父元素所包含的行在交叉轴方向有空余部分时如何分配空间。与<code>justify-content</code>在主轴上如何对单个子元素对齐很相似。</p>
<p><strong>注意</strong>：当只有一行的时候，该属性并不起作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">align-content</span>: flex-start | flex-end | center | space-between | space-around | stretch;
}</code></pre>
<blockquote>
<p><strong>译者注</strong>：该属性中的六个属性值与<code>justify-content</code>中的六个属性意思相似，不同之处在于<code>justify-content</code>沿主轴方向的作用于单个子元素，而<code>align-content</code>沿交叉轴方向作用于行。遂不再赘述各属性值含义。</p>
<p><strong>译者注</strong>：注意<code>align-items</code>和<code>align-content</code>的区别，前者是指在单行内的子元素对齐方式，后者是指多行之间的对齐方式。</p>
</blockquote>
<h4>父元素属性总结</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  display: flex|inline-flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow: <‘flex-direction’> || <‘flex-wrap’>;
  justify-content: flex-start | flex-end | center | space-between | space-around;
  align-items: flex-start | flex-end | center | baseline | stretch;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">flex</span>|<span class="hljs-selector-tag">inline-flex</span>;
  <span class="hljs-selector-tag">flex-direction</span>: <span class="hljs-selector-tag">row</span> | <span class="hljs-selector-tag">row-reverse</span> | <span class="hljs-selector-tag">column</span> | <span class="hljs-selector-tag">column-reverse</span>;
  <span class="hljs-selector-tag">flex-wrap</span>: <span class="hljs-selector-tag">nowrap</span> | <span class="hljs-selector-tag">wrap</span> | <span class="hljs-selector-tag">wrap-reverse</span>;
  <span class="hljs-selector-tag">flex-flow</span>: &lt;‘<span class="hljs-selector-tag">flex-direction</span>’&gt; || &lt;‘<span class="hljs-selector-tag">flex-wrap</span>’&gt;;
  <span class="hljs-selector-tag">justify-content</span>: <span class="hljs-selector-tag">flex-start</span> | <span class="hljs-selector-tag">flex-end</span> | <span class="hljs-selector-tag">center</span> | <span class="hljs-selector-tag">space-between</span> | <span class="hljs-selector-tag">space-around</span>;
  <span class="hljs-selector-tag">align-items</span>: <span class="hljs-selector-tag">flex-start</span> | <span class="hljs-selector-tag">flex-end</span> | <span class="hljs-selector-tag">center</span> | <span class="hljs-selector-tag">baseline</span> | <span class="hljs-selector-tag">stretch</span>;
  <span class="hljs-selector-tag">align-content</span>: <span class="hljs-selector-tag">flex-start</span> | <span class="hljs-selector-tag">flex-end</span> | <span class="hljs-selector-tag">center</span> | <span class="hljs-selector-tag">space-between</span> | <span class="hljs-selector-tag">space-around</span> | <span class="hljs-selector-tag">stretch</span>;</code></pre>
<h3 id="articleHeader4">子元素属性</h3>
<h4>order</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823774" src="https://static.alili.tech/img/remote/1460000008823774" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>默认情况下，子元素按照代码书写的先后顺序布局，但<code>order</code>属性可以更改子元素出现的顺序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  order: <integer>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">order</span>: &lt;integer&gt;;
}</code></pre>
<blockquote><p><strong>译者注</strong>：<code>order</code>的默认值为0;子元素的<code>order</code>值越小，布局越排在前面，参考例图理解。</p></blockquote>
<h4>flex-grow</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823775" src="https://static.alili.tech/img/remote/1460000008823775" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>flex-grow</code>规定在空间允许的情况下，子元素如何按照比例分配可用剩余空间。如果所有的子元素的属性都设定为<code>1</code>，则父元素中的剩余空间会等分给所有子元素。如果其中某个子元素的<code>flex-grow</code>设定为2，则在分配剩余空间时该子元素将获得其他元素二倍的空间（至少会尽力获得）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  flex-grow: <number>; /* default 0 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex-grow</span>: &lt;number&gt;; <span class="hljs-comment">/* default 0 */</span>
}</code></pre>
<p><strong>注</strong>：<code>flex-grow</code>不接受负值。</p>
<blockquote><p><strong>译者注</strong>：默认值为<code>0</code>，意味着即使有剩余空间，各子元素也不会放大。</p></blockquote>
<h4>flex-shrink</h4>
<p>与<code>flex-grow</code>属性类似，<code>flex-shrink</code>定义了空间不足时项目的缩小比例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  flex-shrink: <number>; /* default 1 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex-shrink</span>: &lt;number&gt;; <span class="hljs-comment">/* default 1 */</span>
}</code></pre>
<p><strong>注</strong>： <code>flex-shrink</code>不接受负值。</p>
<blockquote><p><strong>译者注</strong>：<code>flex-shrink</code>默认值为<code>1</code>， 当所有子元素都为默认值时，则空间不足时子元素会同比例缩小。如果其中某个子元素的<code>flex-shrink</code>值为0，则空间不足时该子元素并不会缩小。如果其中某个子元素的<code>flex-shrink</code>值为2时，则空间不足时该子元素会以二倍速度缩小。</p></blockquote>
<h4>flex-basis</h4>
<p><code>flex-basis</code>定义了在计算剩余空间之前子元素默认的大小。可以设置为某个长度（e.g. 20%, 5rem, etc.）或者关键字。关键字<code>auto</code>意味着子元素会按照其本来的大小显示。关键字<code>content</code>意味着根据内容来确定大小——这个关键字到目前没有被很好地支持，所以测试起来比较困难，与<code>content</code>的类似的关键字还有<code>max-content</code>, <code>min-content</code>, <code>fit-content</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  flex-basis: <length> | auto; /* default auto */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex-basis</span>: &lt;length&gt; | auto; <span class="hljs-comment">/* default auto */</span>
}</code></pre>
<p>如果设置为0, 则子元素内容周围的空隙不会根据<code>flex-grow</code>按比例分配，如果设置为<code>auto</code>，则子元素周围额外的空袭会根据<code>flex-grow</code>按照比例分配，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823776" src="https://static.alili.tech/img/remote/1460000008823776" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>flex</h4>
<p><code>flex</code>是<code>flex-grow</code>、<code>flex-shrink</code>、<code>flex-basis</code>三个属性的缩写。其中第二个和第三个参数(<code>flex-grow</code>,<code>flex-basis</code>)是可选的。默认值为<code>0 1 auto</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex</span>: none | [ &lt;<span class="hljs-string">'flex-grow'</span>&gt; &lt;<span class="hljs-string">'flex-shrink'</span>&gt;? || &lt;<span class="hljs-string">'flex-basis'</span>&gt; ]
}</code></pre>
<p>推荐使用缩写形式而不是单独地设置每一个属性，缩写形式中会智能地计算出相关值。</p>
<h4>align-self</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823777" src="https://static.alili.tech/img/remote/1460000008823777" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过设置某个子元素的<code>align-self</code>属性，可以覆盖<code>align-items</code>所设置的对齐方式。属性值与<code>align-items</code>中的意义相同，不再赘述。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">align-self</span>: auto | flex-start | flex-end | center | baseline | stretch;
}</code></pre>
<p><strong>注</strong>：<code>float</code>,<code>clear</code>和<code>vertical-align</code>对flex子元素没有任何影响。</p>
<h2 id="articleHeader5">示例</h2>
<h3 id="articleHeader6">示例一：水平垂直居中</h3>
<p>我们从一个非常非常简单的例子开始，解决一个我们经常会遇到的问题：水平垂直居中。如果使用flex布局会非常简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  height: 300px; /* 随意设定大小 */
}

.child {
  width: 100px;  /* 随意设定大小，比父元素要小 */
  height: 100px; /* 同上 */
  margin: auto;  /* 见证奇迹的时刻 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>; <span class="hljs-comment">/* 随意设定大小 */</span>
}

<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;  <span class="hljs-comment">/* 随意设定大小，比父元素要小 */</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>; <span class="hljs-comment">/* 同上 */</span>
  <span class="hljs-attribute">margin</span>: auto;  <span class="hljs-comment">/* 见证奇迹的时刻 */</span>
}</code></pre>
<p>这个主要原因是，在flex布局的父元素中设置<code>margin</code>为<code>auto</code>会自动吸收额外的空间，所以设置水平垂直的<code>margin</code>都为<code>auto</code>会使子元素在水平垂直方向上都完美居中。</p>
<h3 id="articleHeader7">示例二：响应式初体验</h3>
<p>现在我们考虑用更多的属性。考虑有6个子元素，有固定的大小，但是我们希望他们能够在改变浏览器宽度的时候仍然可以在水平轴上完美地显示（注意在不使用媒体查询的前提下）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-container {
  /* 首先我们先创建一个flex布局上下文 */
  display: flex;
  
  /* 然后我们定义flex方向和是否允许子元素换行
   * 注意这与以下代码等价：
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;
  
  /* 然后我们定义在剩余空间上子元素如何排布 */
  justify-content: space-around;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flex-container</span> {
  <span class="hljs-comment">/* 首先我们先创建一个flex布局上下文 */</span>
  <span class="hljs-attribute">display</span>: flex;
  
  <span class="hljs-comment">/* 然后我们定义flex方向和是否允许子元素换行
   * 注意这与以下代码等价：
   * flex-direction: row;
   * flex-wrap: wrap;
   */</span>
  <span class="hljs-attribute">flex-flow</span>: row wrap;
  
  <span class="hljs-comment">/* 然后我们定义在剩余空间上子元素如何排布 */</span>
  <span class="hljs-attribute">justify-content</span>: space-around;
}</code></pre>
<p>完成。剩下的就是一些其他样式如颜色的设置了。</p>
<p><a href="https://codepen.io/css-tricks/embed/EKEYob?height=409&amp;theme-id=1&amp;slug-hash=EKEYob&amp;default-tab=result&amp;user=css-tricks#0" rel="nofollow noreferrer" target="_blank">在线示例</a><button class="btn btn-xs btn-default ml10 preview" data-url="css-tricks/embed/EKEYob" data-typeid="3">点击预览</button></p>
<p>改变浏览器大小，看看布局会有什么变化吧！</p>
<h3 id="articleHeader8">示例三：响应式导航栏</h3>
<p>让我们再尝试一些别的东西。假设我们有一个向右对齐的导航栏在我们网页的最上端，但是我们希望它在中屏上显示时为居中，在小屏上显示为单列。同样使用flex布局，实现起来会很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 大屏 */
.navigation {
  display: flex;
  flex-flow: row wrap;
  /* 这里设置对齐主轴方向的末端 */
  justify-content: flex-end;
}

/* 中屏 */
@media all and (max-width: 800px) {
  .navigation {
    /* 当在中屏上，设置居中，并设置剩余空间环绕在子元素左右 */
    justify-content: space-around;
  }
}

/* 小屏 */
@media all and (max-width: 500px) {
  .navigation {
    /* 在小屏上，我们不在使用行作为主轴，而以列为主轴 */
    flex-direction: column;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 大屏 */</span>
<span class="hljs-selector-class">.navigation</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-flow</span>: row wrap;
  <span class="hljs-comment">/* 这里设置对齐主轴方向的末端 */</span>
  <span class="hljs-attribute">justify-content</span>: flex-end;
}

<span class="hljs-comment">/* 中屏 */</span>
@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">800px</span>) {
  <span class="hljs-selector-class">.navigation</span> {
    <span class="hljs-comment">/* 当在中屏上，设置居中，并设置剩余空间环绕在子元素左右 */</span>
    <span class="hljs-attribute">justify-content</span>: space-around;
  }
}

<span class="hljs-comment">/* 小屏 */</span>
@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">500px</span>) {
  <span class="hljs-selector-class">.navigation</span> {
    <span class="hljs-comment">/* 在小屏上，我们不在使用行作为主轴，而以列为主轴 */</span>
    <span class="hljs-attribute">flex-direction</span>: column;
  }
}</code></pre>
<p><a href="https://codepen.io/css-tricks/embed/YqaKYR?height=283&amp;theme-id=1&amp;slug-hash=YqaKYR&amp;default-tab=result&amp;user=css-tricks#0" rel="nofollow noreferrer" target="_blank">在线示例</a><button class="btn btn-xs btn-default ml10 preview" data-url="css-tricks/embed/YqaKYR" data-typeid="3">点击预览</button></p>
<p>改变浏览器大小，看看布局会有什么变化吧！</p>
<h3 id="articleHeader9">示例四：移动优先的三栏布局</h3>
<p>我们通过灵活使用flex布局尝试一些更好玩的布局。来做一个移动优先的3列布局并带有全屏宽的header和footer。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  display: flex;
  flex-flow: row wrap;
}

/* 我们要告诉所有的子元素宽度 100% */
.header, .main, .nav, .aside, .footer {
  flex: 1 100%;
}

/* 移动优先依赖于源代码默认的渲染顺序
 * in this case:
 * 1. header
 * 2. nav
 * 3. main
 * 4. aside
 * 5. footer
 */

/* 中屏 */
@media all and (min-width: 600px) {
  /* 我们要告诉两边的sidebar共享一个行 */
  .aside { flex: 1 auto; }
}

/* 大屏幕 */
@media all and (min-width: 800px) {
  /* 通过order设定各个面板的渲染顺序
   * 告诉主要面板元素占用侧栏两倍的空间
   */
  .main { flex: 2 0px; }
  
  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-flow</span>: row wrap;
}

<span class="hljs-comment">/* 我们要告诉所有的子元素宽度 100% */</span>
<span class="hljs-selector-class">.header</span>, <span class="hljs-selector-class">.main</span>, <span class="hljs-selector-class">.nav</span>, <span class="hljs-selector-class">.aside</span>, <span class="hljs-selector-class">.footer</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">100%</span>;
}

<span class="hljs-comment">/* 移动优先依赖于源代码默认的渲染顺序
 * in this case:
 * 1. header
 * 2. nav
 * 3. main
 * 4. aside
 * 5. footer
 */</span>

<span class="hljs-comment">/* 中屏 */</span>
@<span class="hljs-keyword">media</span> all and (min-width: <span class="hljs-number">600px</span>) {
  <span class="hljs-comment">/* 我们要告诉两边的sidebar共享一个行 */</span>
  <span class="hljs-selector-class">.aside</span> { <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> auto; }
}

<span class="hljs-comment">/* 大屏幕 */</span>
@<span class="hljs-keyword">media</span> all and (min-width: <span class="hljs-number">800px</span>) {
  <span class="hljs-comment">/* 通过order设定各个面板的渲染顺序
   * 告诉主要面板元素占用侧栏两倍的空间
   */</span>
  <span class="hljs-selector-class">.main</span> { <span class="hljs-attribute">flex</span>: <span class="hljs-number">2</span> <span class="hljs-number">0px</span>; }
  
  <span class="hljs-selector-class">.aside-1</span> { <span class="hljs-attribute">order</span>: <span class="hljs-number">1</span>; }
  <span class="hljs-selector-class">.main</span>    { <span class="hljs-attribute">order</span>: <span class="hljs-number">2</span>; }
  <span class="hljs-selector-class">.aside-2</span> { <span class="hljs-attribute">order</span>: <span class="hljs-number">3</span>; }
  <span class="hljs-selector-class">.footer</span>  { <span class="hljs-attribute">order</span>: <span class="hljs-number">4</span>; }
}</code></pre>
<p><a href="https://codepen.io/css-tricks/embed/jqzNZq?height=359&amp;theme-id=1&amp;slug-hash=jqzNZq&amp;default-tab=result&amp;user=css-tricks#0" rel="nofollow noreferrer" target="_blank">在线示例</a><button class="btn btn-xs btn-default ml10 preview" data-url="css-tricks/embed/jqzNZq" data-typeid="3">点击预览</button></p>
<p>改变浏览器大小，看看布局会有什么变化吧！</p>
<h2 id="articleHeader10">浏览器前缀</h2>
<p>Flex布局需要一些浏览器前缀来最大力度地兼容大多数的浏览器。Flex布局的前缀不只是在属性前面添加浏览器前缀，不同浏览器下的属性名和属性值都不同，这是因为Flexbox布局的标准一直在变，一共有old, tweener, new 三个版本。</p>
<p>可能处理前缀的最好方法是使用新的语法书写CSS并通过<a href="https://css-tricks.com/autoprefixer/" rel="nofollow noreferrer" target="_blank">Autoprefixer</a>运行CSS，能够很好地处理这个问题。</p>
<p>另外，这里有一个Sass中 @mixin 来处理一些前缀，也可以给你一些处理前缀的启发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin flexbox() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

@mixin flex($values) {
  -webkit-box-flex: $values;
  -moz-box-flex:  $values;
  -webkit-flex:  $values;
  -ms-flex:  $values;
  flex:  $values;
}

@mixin order($val) {
  -webkit-box-ordinal-group: $val;  
  -moz-box-ordinal-group: $val;     
  -ms-flex-order: $val;     
  -webkit-order: $val;  
  order: $val;
}

.wrapper {
  @include flexbox();
}

.item {
  @include flex(1 200px);
  @include order(2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">mixin</span> flexbox() {
  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">-webkit-box</span>;
  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">-moz-box</span>;
  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">-ms-flexbox</span>;
  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">-webkit-flex</span>;
  <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">flex</span>;
}

@<span class="hljs-keyword">mixin</span> flex($values) {
  <span class="hljs-selector-tag">-webkit-box-flex</span>: $<span class="hljs-selector-tag">values</span>;
  <span class="hljs-selector-tag">-moz-box-flex</span>:  $<span class="hljs-selector-tag">values</span>;
  <span class="hljs-selector-tag">-webkit-flex</span>:  $<span class="hljs-selector-tag">values</span>;
  <span class="hljs-selector-tag">-ms-flex</span>:  $<span class="hljs-selector-tag">values</span>;
  <span class="hljs-selector-tag">flex</span>:  $<span class="hljs-selector-tag">values</span>;
}

@<span class="hljs-keyword">mixin</span> order($val) {
  <span class="hljs-selector-tag">-webkit-box-ordinal-group</span>: $<span class="hljs-selector-tag">val</span>;  
  <span class="hljs-selector-tag">-moz-box-ordinal-group</span>: $<span class="hljs-selector-tag">val</span>;     
  <span class="hljs-selector-tag">-ms-flex-order</span>: $<span class="hljs-selector-tag">val</span>;     
  <span class="hljs-selector-tag">-webkit-order</span>: $<span class="hljs-selector-tag">val</span>;  
  <span class="hljs-selector-tag">order</span>: $<span class="hljs-selector-tag">val</span>;
}

<span class="hljs-selector-class">.wrapper</span> {
  @include flexbox();
}

<span class="hljs-selector-class">.item</span> {
  @include flex(1 200px);
  @include order(2);
}</code></pre>
<h2 id="articleHeader11">其他资源</h2>
<ul>
<li><p><a href="http://www.w3.org/TR/css3-flexbox/" rel="nofollow noreferrer" target="_blank">Flexbox in the CSS specifications</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/CSS/Tutorials/Using_CSS_flexible_boxes" rel="nofollow noreferrer" target="_blank">Flexbox at MDN</a></p></li>
<li><p><a href="http://dev.opera.com/articles/view/flexbox-basics/" rel="nofollow noreferrer" target="_blank">Flexbox at Opera</a></p></li>
<li><p><a href="http://weblog.bocoup.com/dive-into-flexbox/" rel="nofollow noreferrer" target="_blank">Diving into Flexbox by Bocoup</a></p></li>
<li><p><a href="https://css-tricks.com/using-flexbox/" rel="nofollow noreferrer" target="_blank">Mixing syntaxes for best browser support on CSS-Tricks</a></p></li>
<li><p><a href="http://www.alsacreations.com/tuto/lire/1493-css3-flexbox-layout-module.html" rel="nofollow noreferrer" target="_blank">Flexbox by Raphael Goetter (FR)</a></p></li>
<li><p><a href="http://bennettfeely.com/flexplorer/" rel="nofollow noreferrer" target="_blank">Flexplorer by Bennett Feely</a></p></li>
</ul>
<h2 id="articleHeader12">Bugs</h2>
<p>我见过的最棒的flexbox bug总结是Philip Walton 和 Greg Whitworth的<a href="https://github.com/philipwalton/flexbugs" rel="nofollow noreferrer" target="_blank">Flexbugs</a>，是开源的，你可以在上面跟踪动态。</p>
<h2 id="articleHeader13">浏览器支持</h2>
<p>首先看一下Flex布局的三个版本</p>
<ul>
<li><p>(new)是指标准中最近的语法(e.g. <code>display:flex;</code>)。</p></li>
<li><p>(tweener)是指2011年以后非官方的临时版本(e.g. <code>display:flexbox;</code>)。</p></li>
<li><p>(old)是指2009年以后的旧语法(e.g. <code>display:box;</code>)</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008823778?w=1435&amp;h=317" src="https://static.alili.tech/img/remote/1460000008823778?w=1435&amp;h=317" alt="" title="" style="cursor: pointer;"></span></p>
<p>Blackberry browser 10+ 支持新语法。</p>
<p>更多混合使用语法达到最佳浏览器兼容，可以参考<a href="https://css-tricks.com/using-flexbox/" rel="nofollow noreferrer" target="_blank">this article (CSS-Tricks)</a>或者<a href="http://dev.opera.com/articles/view/advanced-cross-browser-flexbox/#fallbacks" rel="nofollow noreferrer" target="_blank">this article (DevOpera)</a></p>
<h2 id="articleHeader14">译者的话</h2>
<p>网上有不少flex相关教程，但当我看到<a href="https://css-tricks.com/author/chriscoyier/" rel="nofollow noreferrer" target="_blank">CHRIS COYIER</a>的这篇文章时，不禁被其详尽所震撼，最近也在撰写布局相关的文章，故产生了翻译此文的想法。翻译过程中尽量保持原文原貌，部分地方做了小幅调整以便更加符合中文思维。文中图片均来源于原文。水平有限，如有误漏之处，还请读者不吝赐教。最后希望此文能给读者带去帮助。</p>
<p>更多讨论请到<a href="https://link.zhihu.com/?target=http%3A//shang.qq.com/wpa/qunwpa%3Fidkey%3D1aae58884c7875b2eb3f6e26cdcf48e2d8f83212d9045132335e74d88c71783b" rel="nofollow noreferrer" target="_blank">180251611</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flex布局完全教程

## 原文链接
[https://segmentfault.com/a/1190000008823763](https://segmentfault.com/a/1190000008823763)

