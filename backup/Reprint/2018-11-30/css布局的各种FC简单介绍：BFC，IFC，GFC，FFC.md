---
title: 'css布局的各种FC简单介绍：BFC，IFC，GFC，FFC' 
date: 2018-11-30 2:30:12
hidden: true
slug: 3lk3kbbxgnh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是FC？</h2>
<p><code>Formatting Context</code>，格式化上下文，指页面中一个渲染区域，拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用。</p>
<h2 id="articleHeader1">BFC</h2>
<h3 id="articleHeader2">什么是BFC</h3>
<p><code>Block Formatting Context</code>，块级格式化上下文，一个独立的块级渲染区域，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。</p>
<h3 id="articleHeader3">BFC的约束规则</h3>
<ol>
<li>内部的<code>BOX</code>会在垂直方向上一个接一个的放置；</li>
<li>垂直方向上的距离由<code>margin</code>决定。（完整的说法是：<strong>属于同一个<code>BFC</code>的俩个相邻的<code>BOX</code>的<code>margin</code>会发生重叠，与方向无关。</strong>）</li>
<li>每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此。（这说明BFC中的子元素不会超出它的包含块，而<code>position</code>为<code>absolute</code>的元素可以超出它的包含块边界）；</li>
<li>
<code>BFC</code>的区域不会与<code>float</code>的元素区域重叠；</li>
<li>计算<code>BFC</code>的高度时，浮动子元素也参与计算；</li>
<li>
<code>BFC</code>就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；</li>
</ol>
<h3 id="articleHeader4">BFC的应用</h3>
<ul>
<li>防止<code>margin</code>发生重叠</li>
<li>防止发生因浮动导致的高度塌陷</li>
</ul>
<h3 id="articleHeader5">怎么生成 BFC</h3>
<ul>
<li>
<code>float</code>的值不为<code>none</code>；</li>
<li>
<code>overflow</code>的值不为<code>visible</code>；</li>
<li>
<code>display</code>的值为<code>inline-block</code> <code>table-cell</code> <code>table-caption</code>；</li>
<li>
<code>position</code>的值为<code>absolute</code>或<code>fixed</code>；</li>
</ul>
<blockquote>
<code>display：table</code>也认为可以生成<code>BFC</code>？其实是在于<code>Table</code>会默认生成一个匿名的<code>table-cell</code>，正是这个匿名的<code>table-cell</code>生成了<code>BFC</code>。</blockquote>
<h2 id="articleHeader6">IFC</h2>
<h3 id="articleHeader7">什么是IFC</h3>
<p><code>IFC(Inline Formatting Contexts)</code>直译为"行内格式化上下文"，<code>IFC</code>的<code>line box</code>（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 <code>padding/margin</code> 影响)</p>
<h3 id="articleHeader8">IFC有的特性</h3>
<ol>
<li>
<code>IFC</code>中的<code>line box</code>一般左右都贴紧整个<code>IFC</code>，但是会因为<code>float</code>元素而扰乱。<code>float</code>元素会位于<code>IFC</code>与与<code>line box</code>之间，使得<code>line box</code>宽度缩短。</li>
<li>
<code>IFC</code>中时不可能有块级元素的，当插入块级元素时（如<code>p</code>中插入<code>div</code>）会产生两个匿名块与<code>div</code>分隔开，即产生两个<code>IFC</code>，每个<code>IFC</code>对外表现为块级元素，与<code>div</code>垂直排列。</li>
</ol>
<h3 id="articleHeader9">IFC的应用</h3>
<ol>
<li>水平居中：当一个块要在环境中水平居中时，设置其为<code>inline-block</code>则会在外层产生<code>IFC</code>，通过<code>text-align</code>则可以使其水平居中。</li>
<li>垂直居中：创建一个<code>IFC</code>，用其中一个元素撑开父元素的高度，然后设置其<code>vertical-align:middle</code>，其他行内元素则可以在此父元素下垂直居中。</li>
</ol>
<h2 id="articleHeader10">GFC</h2>
<p><code>GFC(GridLayout Formatting Contexts)</code>直译为"网格布局格式化上下文"，当为一个元素设置<code>display</code>值为<code>grid</code>的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器<code>（grid container）</code>上定义网格定义行<code>（grid definition rows）</code>和网格定义列<code>（grid definition columns）</code>属性各在网格项目<code>（grid item）</code>上定义网格行<code>（grid row）</code>和网格列<code>（grid columns）</code>为每一个网格项目<code>（grid item）</code>定义位置和空间。 </p>
<p><code>GFC</code>将改变传统的布局模式，他将让布局从一维布局变成了二维布局。简单的说，有了<code>GFC</code>之后，布局不再局限于单个维度了。这个时候你要实现类似九宫格，拼图之类的布局效果显得格外的容易。</p>
<h2 id="articleHeader11">FFC</h2>
<p><code>FFC(Flex Formatting Contexts)</code>直译为"自适应格式化上下文"，<code>display</code>值为<code>flex</code>或者<code>inline-flex</code>的元素将会生成自适应容器<code>（flex container）</code>。</p>
<p><code>Flex Box</code> 由伸缩容器和伸缩项目组成。通过设置元素的 <code>display</code> 属性为 <code>flex</code> 或 <code>inline-flex</code> 可以得到一个伸缩容器。设置为 <code>flex</code> 的容器被渲染为一个块级元素，而设置为 <code>inline-flex</code> 的容器则渲染为一个行内元素。</p>
<p>伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，<code>Flexbox</code> 定义了伸缩容器内伸缩项目该如何布局。</p>
<h2 id="articleHeader12">FFC与BFC的区别</h2>
<p><code>FFC</code>与<code>BFC</code>有点儿类似，但仍有以下几点区别：</p>
<ul>
<li>Flexbox 不支持 <code>::first-line</code> 和 <code>::first-letter</code> 这两种伪元素</li>
<li>
<code>vertical-align</code> 对 <code>Flexbox</code> 中的子元素 是没有效果的</li>
<li>
<code>float</code> 和 <code>clear</code> 属性对 <code>Flexbox</code> 中的子元素是没有效果的，也不会使子元素脱离文档流(但是对<code>Flexbox</code> 是有效果的！)</li>
<li>多栏布局（<code>column-*</code>） 在 <code>Flexbox</code> 中也是失效的，就是说我们不能使用多栏布局在 <code>Flexbox</code> 排列其下的子元素</li>
<li>
<code>Flexbox</code> 下的子元素不会继承父级容器的宽</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css布局的各种FC简单介绍：BFC，IFC，GFC，FFC

## 原文链接
[https://segmentfault.com/a/1190000014886753](https://segmentfault.com/a/1190000014886753)

