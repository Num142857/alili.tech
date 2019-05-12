---
title: 'CSS Flexbox学习笔记' 
date: 2019-01-17 2:30:25
hidden: true
slug: hqya064le2r
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文记录了我在学习前端上的笔记，方便以后的复习和巩固。</p></blockquote>
<h2 id="articleHeader0">开始使用Flex</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>在父元素中的显式的设置<code>display:flex</code>或者<code>display:inline-flex</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 声明父元素为flex容器 */
ul{
    display: flex; /* 或者inline-flex */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 声明父元素为flex容器 */</span>
<span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">display</span>: flex; <span class="hljs-comment">/* 或者inline-flex */</span>
}</code></pre>
<p>效果如下图:</p>
<p><span class="img-wrap"><img data-src="/img/bVLDaK?w=800&amp;h=215" src="https://static.alili.tech/img/bVLDaK?w=800&amp;h=215" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>默认情况下，div在css中是垂直的，如下图:</p>
<p><span class="img-wrap"><img data-src="/img/bVLDaL?w=800&amp;h=349" src="https://static.alili.tech/img/bVLDaL?w=800&amp;h=349" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p><strong>关键词：</strong><br>Flex容器（Flex Container）：父元素显式设置了display:flex<br>Flex项目（Flex Items）：Flex容器内的子元素</p></blockquote>
<h2 id="articleHeader1">Flex容器属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-content" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">flex-direction</span> || <span class="hljs-selector-tag">flex-wrap</span> || <span class="hljs-selector-tag">flex-flow</span> || <span class="hljs-selector-tag">justify-content</span> || <span class="hljs-selector-tag">align-items</span> || <span class="hljs-selector-tag">align-content</span></code></pre>
<h3 id="articleHeader2">flex-direction</h3>
<p><code>flex-dirction</code>属性控制Flex项目沿主轴(Main Axis)的排列方向。 <br><code>flex-direction</code>属性可以让你决定Flex项目如何排列。它可以是行(水平)、列(垂直)或者行列相反的方向。 <br>它具有四个值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ul是一个flex容器 */
ul{
    flex-direction: row || column || row-reverse || column-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* ul是一个flex容器 */</span>
<span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-direction</span>: row || column || row-reverse || column-reverse;
}</code></pre>
<blockquote><p>主轴和侧轴: 主轴可以当成当成水平方向理解，侧轴则是垂直方向。<code>Main-Axis</code>就是水平方向，从左到右，这也是默认方向。<code>Cross-Axis</code>是垂直方向，从上往下。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVLDav?w=641&amp;h=440" src="https://static.alili.tech/img/bVLDav?w=641&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>默认情况下，<code>flex-direction</code>属性的值是<code>row</code>。它让Flex项目沿着Main-Axis排列(从左到右，水平排列)</p>
<p><span class="img-wrap"><img data-src="/img/bVLDaA?w=1255&amp;h=260" src="https://static.alili.tech/img/bVLDaA?w=1255&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果把<code>flex-direction</code>属性的值改成<code>column</code>，这时Flex项目将沿着Cross-Axis从上到下垂直排列。不在是从左到右水平排列。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDaR?w=1255&amp;h=630" src="https://static.alili.tech/img/bVLDaR?w=1255&amp;h=630" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果把flex-direction属性的值加上reverse如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    flex-direction: row-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-direction</span>: row-reverse;
}</code></pre>
<p>如下图:</p>
<p><span class="img-wrap"><img data-src="/img/bVLDa0?w=1255&amp;h=260" src="https://static.alili.tech/img/bVLDa0?w=1255&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    flex-direction: column-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-direction</span>: column-reverse;
}</code></pre>
<p>如下图:</p>
<p><span class="img-wrap"><img data-src="/img/bVLDa5?w=1255&amp;h=630" src="https://static.alili.tech/img/bVLDa5?w=1255&amp;h=630" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">flex-wrap</h3>
<p>flex-wrap属性有三个属性值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    flex-wrap: warp || nowrap || wrap-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-wrap</span>: warp || nowrap || wrap-reverse;
}</code></pre>
<p><code>flex-wrap</code>默认属性是<code>nowrap</code>。也就是说，Flex项目在Flex容器内不换行排列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    flex-wrap: nowarp;/* Flex容器内的Flex项目不换行排列 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-wrap</span>: nowarp;<span class="hljs-comment">/* Flex容器内的Flex项目不换行排列 */</span>
}</code></pre>
<p>当你希望Flex容器内的Flex项目达到一定数量时，能换行排列。当Flex容器中没有足够的空间放置Flex项目（Flex项目默认宽度），那么Flex项目将会换行排列。把它<code>（flex-wrap）</code>的值设置为<code>wrap</code>就有这种可能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    flex-wrap: wrap;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">flex-wrap</span>: wrap;
}</code></pre>
<p>现在Flex项目在Flex容器中就会多行排列。 <br>在这种情况下，当一行再不能包含所有列表项的默认宽度，他们就会多行排列。即使调整浏览器大小。 <br>注意：Flex项目现在显示的宽度是他们的默认宽度。也没有必要强迫一行有多少个Flex项目。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDa6?w=772&amp;h=368" src="https://static.alili.tech/img/bVLDa6?w=772&amp;h=368" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>flex-wrap</code>还有一个值：<code>warp-reverse</code>它让Flex项目在容器中多行排列，只是方向是反的</p>
<p><span class="img-wrap"><img data-src="/img/bVLDa7?w=774&amp;h=359" src="https://static.alili.tech/img/bVLDa7?w=774&amp;h=359" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">flex-flow</h3>
<p><code>flex-flow</code>是<code>flex-direction</code>和<code>flex-wrap</code>两个属性的速记属性。 <br>就像border一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    border:1px solid #ccc;
    flex-flow: row wrap;  /* 第一个值是flex-flow的值第二个则是flex-direvtion的值 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">flex-flow</span>: row wrap;  <span class="hljs-comment">/* 第一个值是flex-flow的值第二个则是flex-direvtion的值 */</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLDa8?w=500&amp;h=400" src="https://static.alili.tech/img/bVLDa8?w=500&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">justify-content</h3>
<p>justify-content属性可以接受下面五个值之一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    justify-content: flex-start || flex-end || center || space-between || space-around
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">justify-content</span>: flex-start || flex-end || center || space-between || space-around
}</code></pre>
<p><code>justify-content</code>属性主要定义了Flex项目在Main-Axis上的对齐方式。你可以想象下<code>text-align</code>属性。</p>
<p><strong>各个属性的效果如图:</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLDbb?w=524&amp;h=283" src="https://static.alili.tech/img/bVLDbb?w=524&amp;h=283" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这两个属性值可以一起理解 <br><code>flex-start</code>让所有Flex项目靠Main-Axis开始边缘(左对齐) <br><code>flex-end</code>让所有Flex项目靠Main-Axis结束边缘(右对齐) <br><code>center</code>让所有Flex项目排在Main-Axis中间（居中对齐） <br><code>space-between</code>让除了第一个和最一个Flex项目的两者间间距相同（两端对齐） <br><code>space-around</code>让每个Flex项目具有相同的空间。</p>
<h3 id="articleHeader6">align-items</h3>
<p><code>align-items</code>属性可以接受这些属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul{
    align-items: flex-start || flex-end || center || stretch || baseline
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">align-items</span>: flex-start || flex-end || center || stretch || baseline
}</code></pre>
<p>它主要用来控制Flex项目在Cross-Axis垂直方向的对齐方式。这也是<strong>align-items</strong>和<strong>justify-content</strong>两个属性之间的不同之处。 </p>
<p><code>flex-start/baseline：</code>伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起点的边。 <br><code>flex-end：</code>伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边。 <br><code>center：</code>伸缩项目的外边距盒在该行的侧轴上居中放置。（如果伸缩行的尺寸小于伸缩项目，则伸缩项目会向两个方向溢出相同的量）。 <br><code>stretch：</code>伸缩项目拉伸，填满整个侧轴</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbf?w=541&amp;h=386" src="https://static.alili.tech/img/bVLDbf?w=541&amp;h=386" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">align-content</h3>
<p><code>flex-start：</code>各行向伸缩容器的起点位置堆叠。伸缩容器中第一行在侧轴起点的边会紧靠住伸缩容器在侧轴起点的边，之后的每一行都紧靠住前面一行。</p>
<p><code>flex-end：</code>各行向伸缩容器的结束位置堆叠。伸缩容器中最后一行在侧轴终点的边会紧靠住该伸缩容器在侧轴终点的边，之前的每一行都紧靠住后面一行。</p>
<p><code>center：</code>各行向伸缩容器的中间位置堆叠。各行两两紧靠住同时在伸缩容器中居中对齐，保持伸缩容器在侧轴起点边的内容边和第一行之间的距离与该容器在侧轴终点边的内容边与第最后一行之间的距离相等。（如果剩下的空间是负数，则行的堆叠会向两个方向溢出的相等距离。）</p>
<p><code>space-between：</code>各行在伸缩容器中平均分布。如果剩余的空间是负数或伸缩容器中只有一行，该值等效于「flex-start」。在其它情况下，第一行在侧轴起点的边会紧靠住伸缩容器在侧轴起点边的内容边，最后一行在侧轴终点的边会紧靠住伸缩容器在侧轴终点的内容边，剩余的行在保持两两之间的空间相等的状况下排列。</p>
<p><code>space-around：</code>各行在伸缩容器中平均分布，在两边各有一半的空间。如果剩余的空间是负数或伸缩容器中只有一行，该值等效于「center」。在其它情况下，各行会在保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半的状况下排列。</p>
<p><code>stretch：</code>各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于「flex-start」。在其它情况下，剩余空间被所有行平分，扩大各行的侧轴尺寸。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbi?w=625&amp;h=516" src="https://static.alili.tech/img/bVLDbi?w=625&amp;h=516" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">Flex项目属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="order || flex-grow || flex-shrink || flex-basis
order" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">order</span> || <span class="hljs-selector-tag">flex-grow</span> || <span class="hljs-selector-tag">flex-shrink</span> || <span class="hljs-selector-tag">flex-basis</span>
<span class="hljs-selector-tag">order</span></code></pre>
<h4>oredr</h4>
<p>允许Flex项目在一个Flex容器中重新排序。基本上，你可以改变Flex项目的顺序，从一个位置移动到另一个地方。</p>
<p>这不会影响源代码。这也意味着Flex项目的位置在HTML源代码中不需要改变。order属性的默认值是0。它可以接受一个正值，也可以接受一个负值。</p>
<p>值得注意的是，Flex项目会根据order值重新排序。从底到高。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>默认情况下，所有Flex项目的order值都是0。把前面给列表的样式运用过来。看到的效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbk?w=763&amp;h=252" src="https://static.alili.tech/img/bVLDbk?w=763&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Flex项目显示是按HTML源代码中的顺序来显示，Flex项目1、2、3和4。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    li:nth-child(1){
        order:1
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">    <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
        <span class="hljs-attribute">order</span>:<span class="hljs-number">1</span>
    }</code></pre>
<p>Flex项目就重新进行了排列，从低到高排列。不要忘记了，默认情况下，Flex项目2、3、4的order值为0。现在Flex项目1的order值为1</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbp?w=757&amp;h=212" src="https://static.alili.tech/img/bVLDbp?w=757&amp;h=212" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Flex项目2、3和4的order值都是0。HTML源代码秩序并没有修改过。如果给Flex项目2的order设置为2呢？</p>
<p>是的，你猜对了。它也增加堆栈。现在代表Flex项目的最高的order值。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbx?w=760&amp;h=239" src="https://static.alili.tech/img/bVLDbx?w=760&amp;h=239" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>flex-grow和flex-shrink</h4>
<p><code>flex-grow</code>和<code>flex-shrink</code>属性控制Flex项目在容器有多余的空间如何放大，在没有额外空间又如何缩小 <br>它们可以接受0或大于0的任何正数</p>
<p>值为0</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbM?w=746&amp;h=170" src="https://static.alili.tech/img/bVLDbM?w=746&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>值为1</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbQ?w=694&amp;h=165" src="https://static.alili.tech/img/bVLDbQ?w=694&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>看下图会更好理解</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbT?w=1255&amp;h=260" src="https://static.alili.tech/img/bVLDbT?w=1255&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>flex-shrink值为0时他们不会缩小会保持原来的大小</p>
<blockquote><p>注意：负数无效</p></blockquote>
<h4>flex-basis</h4>
<p>这个属性和<code>width，height</code>属性相同，用来指定flex项目的大小</p>
<p>属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-item{
    flex-bassis: auto || <width>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flex-item</span>{
    <span class="hljs-attribute">flex-bassis</span>: auto || &lt;width&gt;;
}</code></pre>
<p>flex-basis指定了第四个flex项目的初始尺寸。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDbZ?w=1255&amp;h=260" src="https://static.alili.tech/img/bVLDbZ?w=1255&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>默认值: <code>auto</code></p>
<h4>flex</h4>
<p>这个属性是<code>flex-grow</code>、<code>flex-shrink</code>和<code>flex-basis</code>的速写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-item{
    flex: none | auto | [ <flex-grow> <flex-shrink>? || <flex-basis> ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flex-item</span>{
    <span class="hljs-attribute">flex</span>: none | auto | [ &lt;flex-grow&gt; &lt;flex-shrink&gt;? || &lt;flex-basis&gt; ];
}</code></pre>
<p>默认值: <code>0 ,1, auto</code></p>
<h4>align-self</h4>
<p>使用<code>align-self</code>属性可以指定flex项目自身的对齐方式或者使用<code>align-items</code>来指定单个flex项目。使用<code>align-items</code>对齐方式来解释flex容器，能更好的理解他们的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-item{
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flex-item</span>{
    <span class="hljs-attribute">align-self</span>: auto | flex-start | flex-end | center | baseline | stretch;
}</code></pre>
<p>第三个和第四个flex项目使用align-self属性覆盖了其默认的对齐方式。</p>
<p><span class="img-wrap"><img data-src="/img/bVLDb5?w=1255&amp;h=318" src="https://static.alili.tech/img/bVLDb5?w=1255&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>默认值: <code>auto</code></p>
<blockquote><p><strong>注意：</strong> <strong>align-self</strong>取值为<code>auto</code>值时，flex项目对齐方式会根据其父元素<strong>align-items</strong>来决定。如果其元素设置为<code>stretch</code>值时或没有父元素时，<strong>align-self</strong>的值为<code>auto</code>时将无对齐方式一说。著作权归作者所有。</p></blockquote>
<blockquote><p>最后，如有错误和疑惑请指出，多谢各位大哥</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS Flexbox学习笔记

## 原文链接
[https://segmentfault.com/a/1190000008929742](https://segmentfault.com/a/1190000008929742)

