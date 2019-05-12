---
title: '深入理解CSS外边距折叠（Margin Collapse）' 
date: 2019-01-07 2:30:11
hidden: true
slug: vz75b960cu
categories: [reprint]
---

{{< raw >}}

                    
<p>外边距叠加一直是前端开发必须了解的一个概念，面试一般也会问到这个问题。所以整理一下相关外边距叠加相关的知识点。外边距叠加是什么？什么时候会发生外边距叠加？如何避免外边距叠加？</p>
<h2 id="articleHeader0">什么是外边距叠加</h2>
<p>先来看看 <a href="https://www.w3.org/TR/CSS2/box.html#collapsing-margins" rel="nofollow noreferrer" target="_blank">W3C</a> 对于外边距叠加的定义：</p>
<blockquote><p>In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.</p></blockquote>
<p>大概意思是：在CSS中，两个或多个毗邻的普通流中的盒子（可能是父子元素，也可能是兄弟元素）在垂直方向上的外边距会发生叠加，这种形成的外边距称之为外边距叠加。</p>
<p>我们可以注意定义中的几个关键字：毗邻、两个或多个、垂直方向和普通流。</p>
<h3 id="articleHeader1">毗邻</h3>
<p>毗邻说明了他们的位置关系，没有被 <code>padding</code>、<code>border</code>、<code>clear</code> 和 <code>line box</code> 分隔开。</p>
<h3 id="articleHeader2">两个或多个</h3>
<p>两个或多个盒子是指元素之间的相互影响，单个元素不会存在外边距叠加的情况。</p>
<h3 id="articleHeader3">垂直方向</h3>
<blockquote><p>Horizontal margins never collapse.</p></blockquote>
<p>只有垂直方向的外边距会发生外边距叠加。水平方向的外边距不存在叠加的情况。</p>
<h3 id="articleHeader4">普通流(in flow)</h3>
<p>啥为普通流？W3C 只对 out of flow 作了定义：</p>
<blockquote><p>An element is called out of flow if it is floated, absolutely positioned, or is the root element.An element is called in-flow if it is not out-of-flow.</p></blockquote>
<p>从定义中我们可以知道只要不是 <code>float</code>、<code>absolutely positioned</code> 和 <code>root element</code> 时就是 in flow。</p>
<h2 id="articleHeader5">什么时候会发生外边距叠加</h2>
<p>外边距叠加存在两种情况：一是父子外边距叠加；二是兄弟外边距叠加。</p>
<p>W3C 对于什么是毗邻的外边距也有定义：</p>
<blockquote>
<p>Two margins are adjoining if and only if: - both belong to in-flow block-level boxes that participate in the same block formatting context - no line boxes, no clearance, no padding and no border separate them - both belong to vertically-adjacent box edges, i.e. form one of the following pairs:</p>
<ul>
<li>top margin of a box and top margin of its first in-flow child</li>
<li>bottom margin of box and top margin of its next in-flow following sibling</li>
<li>bottom margin of a last in-flow child and bottom margin of its parent if the &gt; parent has "auto" computed height</li>
<li>top and bottom margins of a box that does not establish a new block formatting context and that has zero computed "min-height", zero or "auto" computed "height", and no in-flow children</li>
</ul>
</blockquote>
<p>从定义中我们可以很清楚的知道要符合哪些情况才会发生外边距折叠：</p>
<ul>
<li>都属于普通流的块级盒子且参与到相同的块级格式上下文中</li>
<li>没有被padding、border、clear和line box分隔开</li>
<li>
<p>都属于垂直毗邻盒子边缘：</p>
<ul>
<li>盒子的top margin和它第一个普通流子元素的top margin</li>
<li>盒子的bottom margin和它下一个普通流兄弟的top margin</li>
<li>盒子的bottom margin和它父元素的bottom margin</li>
<li>盒子的top margin和bottom margin，且没有创建一个新的块级格式上下文，且有被计算为0的min-height，被计算为0或auto的height，且没有普通流子元素</li>
</ul>
</li>
</ul>
<h3 id="articleHeader6">Demo 1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent1 {
    height: 20px;
    background: yellow;
    margin-bottom: 20px;
}
.parent2 {
    margin: 20px 0 30px;
}
.parent3 {
    height: 20px;
    background: green;
    margin-top: 20px;
}
.child {
    background: red;
    height: 20px;
    margin: 40px 0 30px;
}

<div class=&quot;parent1&quot;></div>  
<div class=&quot;parent2&quot;>  
    <div class=&quot;child&quot;></div>
    <div class=&quot;child&quot;></div>
    <div class=&quot;child&quot;></div>
</div>  
<div class=&quot;parent3&quot;></div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.parent1</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: yellow;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.parent2</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.parent3</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: green;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">background</span>: red;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">40px</span> <span class="hljs-number">0</span> <span class="hljs-number">30px</span>;
}

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"parent1"</span>&gt;&lt;/div&gt;  
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"parent2"</span>&gt;  
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"child"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"child"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"child"</span>&gt;&lt;/div&gt;
&lt;/div&gt;  
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"parent3"</span>&gt;&lt;/div&gt;  </code></pre>
<p>这个 demo 里的 <code>.parent2</code> 和第一个 <code>.child</code> 的 top margin 叠加，导致 <code>.parent1</code> 和 <code>.parent2</code> 之间的边距为 40px。</p>
<h3 id="articleHeader7">Demo 2</h3>
<p>还是用上面的代码，<code>.parent2</code> 中的 <code>.child</code> 中的 top margin 和 bottom margin 发生外边距叠加，它们之间的外边距为 40px。</p>
<h3 id="articleHeader8">Demo 3</h3>
<p>还是上面的代码，<code>.parent2</code> 中的最后一个 <code>.child</code> 发生 bottom margin 叠加，<code>.parent2</code><br> 和 <code>.parent3</code> 之间的边距为 30px。</p>
<h3 id="articleHeader9">Demo 4</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo {
    height: 30px;
    background: red;
}
.margin-test {
    margin: 20px 0 30px;
}

<div class=&quot;container&quot;>  
    <div class=&quot;demo&quot;></div>
    <div class=&quot;margin-test&quot;></div>
    <div class=&quot;demo&quot;></div>
</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.demo</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.margin-test</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">30px</span>;
}

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container"</span>&gt;  
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"demo"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"margin-test"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"demo"</span>&gt;&lt;/div&gt;
&lt;/div&gt;  </code></pre>
<p>这个 demo 是上面的第四种情况，元素自身的外边距 <code>top</code> 和 <code>bottom</code> 发生折叠，我们可以看出 <code>.container</code> 的高度为 90px，这里可以看到 <code>margin-test</code> 的 <code>top</code> 和 <code>bottom</code> 外边距发生了折叠。</p>
<h2 id="articleHeader10">如何避免外边距叠加</h2>
<p>上面讲了外边距的叠加，那如何避免呢，其实只要破坏上面讲到的四个条件中的任何一个即可：毗邻、两个或多个、普通流和垂直方向。</p>
<p>W3C也对此做了总结：</p>
<ul>
<li>Margins between a floated box and any other box do not collapse (not even between a float and its in-flow children).</li>
<li>Margins of elements that establish new block formatting contexts (such as floats and elements with "overflow" other than "visible") do not collapse with their in-flow children.</li>
<li>Margins of absolutely positioned boxes do not collapse (not even with their in-flow children).</li>
<li>Margins of inline-block boxes do not collapse (not even with their in-flow children).</li>
<li>The bottom margin of an in-flow block-level element always collapses with the top margin of its next in-flow block-level sibling, unless that sibling has clearance.</li>
<li>The top margin of an in-flow block element collapses with its first in-flow block-level child"s top margin if the element has no top border, no top padding, and the child has no clearance.</li>
<li>The bottom margin of an in-flow block box with a "height" of "auto" and a "min-height" of zero collapses with its last in-flow block-level child"s bottom margin if the box has no bottom padding and no bottom border and the child"s bottom margin does not collapse with a top margin that has clearance.</li>
<li>A box"s own margins collapse if the "min-height" property is zero, and it has neither top or bottom borders nor top or bottom padding, and it has a "height" of either 0 or "auto", and it does not contain a line box, and all of its in-flow children"s margins (if any) collapse.</li>
</ul>
<p>翻译一下：</p>
<ul>
<li>浮动元素不会与任何元素发生叠加，也包括它的子元素</li>
<li>创建了 BFC 的元素不会和它的子元素发生外边距叠加</li>
<li>绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素</li>
<li>inline-block 元素和其他任何元素之间不发生外边距叠加，也包括它的子元素</li>
<li>普通流中的块级元素的 margin-bottom 永远和它相邻的下一个块级元素的 margin-top 叠加，除非相邻的兄弟元素 clear</li>
<li>普通流中的块级元素（没有 border-top、没有 padding-top）的 margin-top 和它的第一个普通流中的子元素（没有clear）发生 margin-top 叠加</li>
<li>普通流中的块级元素（height为 auto、min-height为0、没有 border-bottom、没有 padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生 margin-bottom叠加</li>
<li>如果一个元素的 min-height 为0、没有 border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加</li>
</ul>
<blockquote><p>本文首发于有赞技术博客：<a href="http://tech.youzan.com/css-margin-collapse/" rel="nofollow noreferrer" target="_blank">http://tech.youzan.com/css-ma...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解CSS外边距折叠（Margin Collapse）

## 原文链接
[https://segmentfault.com/a/1190000010346113](https://segmentfault.com/a/1190000010346113)

