---
title: 'BFC与IFC概念理解+布局规则+形成方法+用处' 
date: 2019-01-13 2:30:11
hidden: true
slug: pt2e432q68
categories: [reprint]
---

{{< raw >}}

                    
<p>想要理解BFC与IFC，首先要理解另外两个概念：<code>Box</code> 和 <code>FC</code>（即 formatting context）。</p>
<h2 id="articleHeader0">Box</h2>
<p>一个页面是由很多个 <code>Box</code> 组成的，元素的类型和 <code>display</code> 属性决定了这个 <code>Box</code> 的类型。不同类型的 Box，会参与不同的 Formatting Context。</p>
<p><code>Block level</code>的box会参与形成BFC，比如<code>display</code>值为<code>block，list-item，table</code>的元素。</p>
<p><code>Inline level</code>的box会参与形成IFC，比如<code>display</code>值为<code>inline，inline-table，inline-block</code>的元素。</p>
<p>参考：<a href="https://www.w3.org/TR/css3-box/#block-level0" rel="nofollow noreferrer" target="_blank">W3C文档block-level</a></p>
<h2 id="articleHeader1">FC（Formatting Context）</h2>
<p>它是W3C CSS2.1规范中的一个概念，定义的是页面中的一块渲染区域，并且有一套渲染规则，它<strong>决定了其子元素将如何定位</strong>，以及<strong>和其他元素的关系和相互作用</strong>。</p>
<p>常见的<code>Formatting Context</code> 有：<code>Block Formatting Context</code>（BFC | 块级格式化上下文） 和 <code>Inline Formatting Context</code>（IFC |行内格式化上下文）。</p>
<p>下面就来介绍IFC和BFC的布局规则。</p>
<h2 id="articleHeader2">IFC布局规则：</h2>
<blockquote><p>在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 <code>margin</code>，<code>border</code> 和 <code>padding</code>在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。</p></blockquote>
<h2 id="articleHeader3">BFC布局规则：</h2>
<p>W3C原文：</p>
<blockquote>
<p>Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.</p>
<p>In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.</p>
<p>In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).</p>
</blockquote>
<p>整理为中文：</p>
<blockquote><ol>
<li><p>内部的Box会在垂直方向，一个接一个地放置。</p></li>
<li><p>Box垂直方向的距离由<code>margin</code>决定。属于同一个BFC的两个相邻Box的<code>margin</code>会发生重叠</p></li>
<li><p>每个元素的左外边缘（<code>margin-left</code>)， 与包含块的左边（<code>contain box left</code>）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。</p></li>
<li><p>BFC的区域不会与<code>float box</code>重叠。</p></li>
<li><p>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。</p></li>
<li><p>计算BFC的高度时，浮动元素也参与计算</p></li>
</ol></blockquote>
<p>参考：<br><a href="https://www.w3.org/TR/CSS2/visuren.html#inline-formatting" rel="nofollow noreferrer" target="_blank">W3C文档inline-formatting</a><br><a href="https://www.w3.org/TR/CSS2/visuren.html#block-formatting" rel="nofollow noreferrer" target="_blank">W3C文档block-formatting</a></p>
<h2 id="articleHeader4">怎样形成一个BFC？</h2>
<p>块级格式化上下文由以下之一创建：</p>
<blockquote><ol>
<li><p>根元素或其它包含它的元素</p></li>
<li><p>浮动 (元素的 <code>float</code> 不是 <code>none</code>)</p></li>
<li><p>绝对定位的元素 (元素具有 <code>position</code> 为 <code>absolute</code> 或 <code>fixed</code>)</p></li>
<li><p>非块级元素具有 <code>display: inline-block，table-cell, table-caption, flex, inline-flex</code></p></li>
<li><p>块级元素具有<code>overflow</code> ，且值不是 <code>visible</code></p></li>
</ol></blockquote>
<p>整理到这儿，对于上面第4条产生了一个small small的疑问：为什么<code>display: inline-block;</code>的元素是<code>inline level</code> 的元素，参与形成IFC，却能创建BFC？</p>
<p>后来觉得答案是这样的：inline-block的元素的内部是一个BFC，但是它本身可以和其它inline元素一起形成IFC。</p>
<h2 id="articleHeader5">BFC用处</h2>
<h3 id="articleHeader6">1. 清除浮动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrap&quot;>
<section>1</section>
<section>2</section>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap {
  border: 2px solid yellow;
  width: 250px;
}
section {
  background-color: pink;
  float: left;
  width: 100px;
  height: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrap</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid yellow;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
}
<span class="hljs-selector-tag">section</span> {
  <span class="hljs-attribute">background-color</span>: pink;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>可以看到，由于子元素都是浮动的，受浮动影响，边框为黄色的父元素的高度塌陷了。</p>
<p><span class="img-wrap"><img data-src="/img/bVOdsc?w=261&amp;h=113" src="https://static.alili.tech/img/bVOdsc?w=261&amp;h=113" alt="BFC1" title="BFC1" style="cursor: pointer; display: inline;"></span></p>
<p>解决方案：为 <code>.wrap</code> 加上 <code>overflow: hidden;</code>使其形成BFC，根据BFC规则第六条，计算高度时就会计算float的元素的高度，达到清除浮动影响的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVOdsi?w=265&amp;h=113" src="https://static.alili.tech/img/bVOdsi?w=265&amp;h=113" alt="BFC2" title="BFC2" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">2. 布局：自适应两栏布局</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
<aside></aside>
<main>我是好多好多文字会换行的那种蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤</main>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>我是好多好多文字会换行的那种蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {width: 200px;}
aside {
  background-color: yellow;
  float: left;
  width: 100px;
  height: 50px;
}
main {
  background-color: pink;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;}
<span class="hljs-selector-tag">aside</span> {
  <span class="hljs-attribute">background-color</span>: yellow;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-attribute">background-color</span>: pink;
}</code></pre>
<p>可以看到右侧元素的一部分跑到了左侧元素下方。</p>
<p><span class="img-wrap"><img data-src="/img/bVOdrZ?w=203&amp;h=86" src="https://static.alili.tech/img/bVOdrZ?w=203&amp;h=86" alt="BFC3" title="BFC3" style="cursor: pointer; display: inline;"></span></p>
<p>解决方案：为<code>main</code>设置 <code>overflow: hidden; </code>触发main元素的BFC，根据规则第4、5条，BFC的区域是独立的，不会与页面其他元素相互影响，且不会与float元素重叠，因此就可以形成两列自适应布局</p>
<p><span class="img-wrap"><img data-src="/img/bVOdr2?w=209&amp;h=115" src="https://static.alili.tech/img/bVOdr2?w=209&amp;h=115" alt="BFC4" title="BFC4" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">3. 防止垂直margin合并</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;top&quot;>1</section>
<section class=&quot;bottom&quot;>2</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bottom"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="section {
  background-color: pink;
  margin-bottom: 100px;
  width: 100px;
  height: 100px;
}
.bottom {
  margin-top: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">section</span> {
  <span class="hljs-attribute">background-color</span>: pink;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.bottom</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVOdso?w=112&amp;h=311" src="https://static.alili.tech/img/bVOdso?w=112&amp;h=311" alt="BFC5" title="BFC5" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，明明<code>.top</code>和<code>.bottom</code>中间加起来有200px的margin值，但是我们只能看到100px。这是因为他们的外边距相遇发生了合并。</p>
<p>怎样解决：为其中一个元素的外面包裹一层元素。并为这个外层元素设置 <code>overflow: hidden;</code>，使其形成BFC。因为BFC内部是一个独立的容器，所以不会与外部相互影响，可以防止margin合并。</p>
<p><span class="img-wrap"><img data-src="/img/bVOdsr?w=110&amp;h=410" src="https://static.alili.tech/img/bVOdsr?w=110&amp;h=410" alt="BFC6" title="BFC6" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;top&quot;>1</section>
<div class=&quot;wrap&quot;>
<section class=&quot;bottom&quot;>2</section>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bottom"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap {
  overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrap</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
BFC与IFC概念理解+布局规则+形成方法+用处

## 原文链接
[https://segmentfault.com/a/1190000009545742](https://segmentfault.com/a/1190000009545742)

