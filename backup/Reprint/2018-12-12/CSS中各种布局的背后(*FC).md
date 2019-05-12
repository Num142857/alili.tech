---
title: 'CSS中各种布局的背后(*FC)' 
date: 2018-12-12 2:30:10
hidden: true
slug: fw7ed6tbeii
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>CSS中各种布局的背后，实质上是各种*FC的组合。CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 FFC 和 GFC。</blockquote>
<h2 id="articleHeader0">盒模型(Box Model)</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013372966" src="https://static.alili.tech/img/remote/1460000013372966" alt="imgage" title="imgage" style="cursor: pointer; display: inline;"></span>.png)</p>
<blockquote>上图为W3C标准盒模型，另外还有一种IE盒模型（IE6以下），唯一的区别就是：前者<code>width = content</code>，后者<code>width = content + padding + border</code><p>若要将IE盒模型转换为标准盒模型，需要在文档顶部加上<code>&lt;!DOCTYPE html&gt;</code>声明；很有意思的是，后来CSS3 中也增加了<code>box-sizing</code>属性，<code>box-sizing: content-box</code>即标准盒模型，<code>box-sizing: border-box</code>即IE盒模型（width包含内边距和边框），W3C反过来又承认了微软，也是有意思。</p>
</blockquote>
<h2 id="articleHeader1">视觉格式化模型(Visual Formatting Model)</h2>
<blockquote>视觉格式化模型(visual formatting model)是用来处理文档并将它显示在视觉媒体上的机制，根据上述的盒模型，为文档元素生成盒（Box）。通俗的说，视觉格式化模型就是文档里的盒子布局呈现的一种规则。</blockquote>
<p>影响布局的因素</p>
<ol>
<li>盒的尺寸和类型</li>
<li>定位方案 <code>Positioning Scheme</code> （常规流，浮动和绝对定位）</li>
<li>文档树中元素之间的关系</li>
<li>外部信息（如：视口大小，图片的固有尺寸等）</li>
</ol>
<h3 id="articleHeader2">FC -- Formatting Context</h3>
<blockquote>FC...是谁在说脏话？！ Formatting Context -- 格式化上下文，*FC就是视觉格式化模型，用来描述盒子布局规则。</blockquote>
<h3 id="articleHeader3">前方大波概念来袭！</h3>
<blockquote>块级元素、块级盒、块容器盒、块盒、匿名块盒、行内级元素、行内级盒、原子行内级盒、原子行内盒、行盒、匿名行内盒、<del>插入盒</del>......要报警了！！！这些真的不是我YY出来的，<a href="https://www.w3.org/TR/CSS22/visuren.html" rel="nofollow noreferrer" target="_blank">W3C</a> 里真的有这么多概念好吗！！！感觉进坑了啊！！！headache...来吧，一个个捋清楚... -_-|||</blockquote>
<ul>
<li>
<strong>块级元素(Block-level elements)</strong>：当元素的 CSS 属性 <code>display:block / list-item / table</code> 时，它就是是块级元素 block-level ，视觉上呈现为块，竖直排列。每个块级元素生成一个主要的块级盒 (Principal Block-level Box) 来包含其后代盒和生成的内容，同时参与定位体系 (Positioning Scheme) 。某些块级元素还会在主要盒之外产生额外的盒： list-item 元素。这些额外的盒会相对于主要盒来摆放。</li>
<li>
<strong>块级盒(Block-level boxes)</strong>：由块级元素生成，参与块级格式化上下文(BFC)。<strong>描述元素跟它的父元素与兄弟元素之间的表现。</strong>
</li>
<li>
<strong>块容器盒(Block container box)</strong>：只包含其它块级盒，或生成一个行内格式化上下文(inline formatting context)，只包含行内盒。有些块级盒，比如表格，不是块容器盒。相反，一些块容器盒，比如非替换行内块及非替换表格单元格，不是块级盒。<strong>描述元素跟它的后代之间的影响。</strong>
</li>
<li>
<strong>块盒(Block boxes)</strong>：同时是块容器盒的块级盒。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013372967?w=384&amp;h=234" src="https://static.alili.tech/img/remote/1460000013372967?w=384&amp;h=234" alt="img" title="img" style="cursor: pointer;"></span></p>
<ul><li>
<strong>匿名块盒(Anonymous block boxes)</strong>：没有名字，不能被 CSS 选择符选中。块容器盒要么只包含行内级盒，要么只包含块级盒，但通常文档会同时包含两者，在这种情况下，将创建匿名块盒来包含毗邻的行内级盒。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
   I am Block container box
   <p>I'm Inline-level boxes</p>
   I am Block container box
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   I am Block container box
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I'm Inline-level boxes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   I am Block container box
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<ul>
<li>
<strong>行内级元素(Inline-level elements)</strong>：当元素的 CSS 属性 <code>display：inline, inline-block 或 inline-table</code> 时，称它为行内级元素。行内级元素生成行内级盒(inline-level boxes)，参与行内格式化上下文(IFC)。</li>
<li>
<strong>行内级盒(Inline-level boxes)</strong>：所有 <code>display:inline</code> 的非替换元素生成的盒是行内盒。</li>
<li>
<strong>原子行内级盒(atomic inline-level boxes)</strong>：不参与生成行内格式化上下文的行内级盒称为原子行内级盒(atomic inline-level boxes)。</li>
<li>
<strong>原子行内盒(atomic inline boxes)</strong>：注意：起初原子行内级盒(atomic inline-level boxes)被称为原子行内盒(atomic inline boxes)。很不幸，它们并非行内盒。规范的勘误表修正了这个错误。不管怎样，当再看到原子行内盒时可以放心的当成原子行内级盒，因为只是改了名字。原子行内盒在行内格式化上下文里不能分成多行。</li>
<li>
<strong>行盒(Line boxes)</strong>：行盒由行内格式化上下文(IFC)产生的盒，用于表示一行。在块盒里面，行盒从块盒一边排版到另一边。 当有浮动时, 行盒从左浮动的最右边排版到右浮动的最左边。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007596125?w=384&amp;h=287" src="https://static.alili.tech/img/remote/1460000007596125?w=384&amp;h=287" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>匿名行内盒(Anonymous inline boxes)</strong>：匿名行内盒最常见的例子是块盒直接包含文本。</li>
<li>
<del>插入盒(Run-in boxes)</del>：插入盒(Run-in boxes)从 CSS 2.1 标准中移除了，因为可操作的实现定义不足。 可能 CSS3 会引入，但是这是实验性质，不能用于生产环境。</li>
</ul>
<h3 id="articleHeader4">定位方案(Positioning schemes)</h3>
<h4>- 常规流(Normal flow)</h4>
<blockquote>CSS2.1中，常规流包括块级盒的块格式化，行内盒的行内格式化，以及块级盒和行内级盒的相对定位。</blockquote>
<h4>- 浮动(Floats)</h4>
<blockquote>在浮动模型中，盒首先根据常规流布局，然后从常规流中脱离并尽可能地向左或向右位移。内容可以布局在浮动周围。</blockquote>
<h4>- 绝对定位(Absolute positioning)</h4>
<blockquote>在绝对定位模型中，盒完全从常规流中脱离（对后面的同胞元素无影响）并根据包含块来分配位置。</blockquote>
<h2 id="articleHeader5">BFC -- Block Formatting Context</h2>
<h3 id="articleHeader6">触发条件</h3>
<ol>
<li>根元素或其它包含它的元素</li>
<li>浮动 <code>float: left/right/inherit</code>
</li>
<li>绝对定位元素 <code>position: absolute/fixed</code>
</li>
<li>行内块 <code>display: inline-block</code>
</li>
<li>表格单元格 <code>display: table-cell</code>
</li>
<li>表格标题 <code>display: table-caption</code>
</li>
<li>溢出元素 <code>overflow: hidden/scroll/auto/inherit</code>
</li>
<li>弹性盒子 <code>display: flex/inline-flex</code>
</li>
</ol>
<h3 id="articleHeader7">布局规则</h3>
<ol>
<li>内部的Box会在垂直方向，一个接一个地放置。</li>
<li>Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。</li>
<li>每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。</li>
<li>BFC的区域不会与float box重叠。</li>
<li>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。</li>
<li>计算BFC的高度时，浮动元素也参与计算</li>
</ol>
<h3 id="articleHeader8">应用场景</h3>
<ul>
<li>闭合浮动：浮动区域不叠加到BFC区域上</li>
<li>防止与浮动元素重叠</li>
<li>防止margin collapse</li>
<li>float 元素高度塌陷</li>
<li>...</li>
</ul>
<h2 id="articleHeader9">IFC -- Inline Formatting Contexts</h2>
<h3 id="articleHeader10">触发条件</h3>
<p>一个块级元素中<strong>仅</strong>包含内联级别元素</p>
<h3 id="articleHeader11">布局规则</h3>
<ul>
<li>内部的盒子会在水平方向，一个接一个地放置。</li>
<li>这些盒子垂直方向的起点从包含块盒子的顶部开始。</li>
<li>摆放这些盒子的时候，它们在水平方向上的 padding、border、margin 所占用的空间都会被考虑在内。</li>
<li>在垂直方向上，这些框可能会以不同形式来对齐（vertical-align）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（baseline）对齐。</li>
<li>能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和存在的浮动来决定。</li>
<li>IFC中的 line box 一般左右边都贴紧其包含块，但是会因为float元素的存在发生变化。float 元素会位于IFC与与 line box 之间，使得 line box 宽度缩短。</li>
<li>IFC 中的 line box 高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同（比如一行包含了较高的图片，而另一行只有文本）</li>
<li>当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性来确定，如果取值为 justify，那么浏览器会对 inline-boxes（注意不是inline-table 和 inline-block boxes）中的文字和空格做出拉伸。</li>
<li>当一个 inline box 超过 line box 的宽度时，它会被分割成多个boxes，这些 boxes 被分布在多个 line box 里。如果一个 inline box 不能被分割（比如只包含单个字符，或 word-breaking 机制被禁用，或该行内框受 white-space 属性值为 nowrap 或 pre 的影响），那么这个 inline box 将溢出这个 line box。</li>
</ul>
<h3 id="articleHeader12">应用场景</h3>
<ul>
<li>水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过设置父容器 text-align:center 则可以使其水平居中。</li>
<li>垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。</li>
</ul>
<h2 id="articleHeader13">FFC -- Flex Formatting Contexts</h2>
<h3 id="articleHeader14">触发条件</h3>
<p>当 <code>display</code> 的值为 <code>flex</code> 或 <code>inline-flex</code> 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）</p>
<h3 id="articleHeader15">布局规则</h3>
<ul>
<li>设置为 <code>flex</code> 的容器被渲染为一个块级元素</li>
<li>设置为 <code>inline-flex</code> 的容器则渲染为一个行内元素</li>
<li>弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局</li>
</ul>
<h2 id="articleHeader16">GFC -- GridLayout Formatting Contexts</h2>
<h3 id="articleHeader17">触发条件</h3>
<p>当为一个元素设置<code>display</code>值为<code>grid</code>的时候，此元素将会获得一个独立的渲染区域</p>
<h3 id="articleHeader18">布局规则</h3>
<p>通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间</p>
<hr>
<p>参考：</p>
<p><a href="https://www.w3.org/TR/CSS22/visuren.html" rel="nofollow noreferrer" target="_blank">Visual formatting model</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model" rel="nofollow noreferrer" target="_blank">视觉格式化模型</a></p>
<p><a href="https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html" rel="nofollow noreferrer" target="_blank">BFC 神奇背后的原理</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS中各种布局的背后(*FC)

## 原文链接
[https://segmentfault.com/a/1190000013372963](https://segmentfault.com/a/1190000013372963)

