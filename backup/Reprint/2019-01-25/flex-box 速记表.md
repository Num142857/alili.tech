---
title: 'flex-box 速记表' 
date: 2019-01-25 2:30:24
hidden: true
slug: ik09416kg2
categories: [reprint]
---

{{< raw >}}

                    
<h4>启动 flex-box：</h4>
<p>父元素设置 display: flex; 或 display:inline-flex;</p>
<p>flex container： 父元素显示设置 display: flex</p>
<p>flex item：flex container 中的子元素</p>
<h4>flex 容器属性：</h4>
<ul>
<li>
<p>flex-direction：控制 flex 元素沿着 main-axis 的排列方向</p>
<ul>
<li><p>row：默认值，flex 元素沿着 main-axis 从左到右排列</p></li>
<li><p>column：flex 元素将沿着 cross-axis 从上到下垂直排列</p></li>
<li><p>row-reverse：flex 元素沿着 main-axis 从右到左排列</p></li>
<li><p>column-reverse：flex 元素将沿着 cross-axis 从下到上垂直排列</p></li>
</ul>
</li>
<li>
<p>flex-wrap： 指定 flex 元素单行显示还是多行显示</p>
<ul>
<li><p>nowrap：默认值，flex 元素在 flex 容器内不换行排列</p></li>
<li><p>wrap：flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值 相当于 start 或 before。cross-end 为 cross-start 的相对值</p></li>
<li><p>wrap-reverse：和 wrap 的表现一样但是 cross-start 和 cross-end 交替排列</p></li>
</ul>
</li>
<li><p>flex-flow：是 flex-direction 和 flex-wrap 的简写</p></li>
<li>
<p>justify-content：定义了浏览器如何分配顺着父容器 main-axis 的 flex 元素之间及其周围的空间</p>
<ul>
<li><p>flex-start：默认值，flex 元素靠 main-axis 开始边缘（左对齐）</p></li>
<li><p>flex-end：所有 flex 元素靠 main-axis 结束边缘（右对齐）</p></li>
<li><p>center：所有 flex 元素排在 main-axis中间（居中对齐）</p></li>
<li><p>space-between：除了第一个和最一个 flex 元素的两者间间距相同（两端对齐）</p></li>
<li><p>space-around：让每个 flex 元素具有相同的空间</p></li>
</ul>
</li>
<li>
<p>align-items：以与 justify-content 相同的方式在侧轴方向上将当前行上的 flex 元素对齐</p>
<ul>
<li><p>stretch：默认值，让所有的 flex 元素高度和 flex 容器高度一样</p></li>
<li><p>flex-start：让所有 flex 元素靠 cross-axis 开始边缘（顶部对齐）</p></li>
<li><p>flex-end：让所有 flex 元素靠 cross-axis 结束边缘（底部对齐）</p></li>
<li><p>center：让 flex 元素在 cross-axis 中间（居中对齐）</p></li>
<li><p>baseline：让所有 flex 元素在 cross-axis 上沿着他们自己的基线对齐</p></li>
</ul>
</li>
<li>
<p>align-content：定义弹性容器的侧轴方向上有额外空间时，如何排布每一行，当弹性容器只有一行时无作用</p>
<ul>
<li><p>stretch：默认值，拉伸 flex 元素，让他们沿着 cross-axis 适应 flex 容器可用的空间</p></li>
<li><p>flex-start：让多行 flex 元素靠 cross-axis开始边缘，沿着 cross-axis 从上到下排列，flex 元素在 flex 容器中顶部对齐</p></li>
<li><p>flex-end：让多行 flex 元素靠着 cross-axis 结束位置，让 flex 元素沿着Cross-Axis从下到上排列，即底部对齐</p></li>
<li><p>center：让多行 flex 元素在cross-axis中间，在 flex 容器中居中对齐</p></li>
</ul>
</li>
</ul>
<h4>flex 元素属性：</h4>
<ul>
<li><p>order：允许 flex 元素在一个 flex 容器中重新排序 类似 z-index</p></li>
<li><p>flex-grow：控制 flex 元素在容器有多余的空间如何放大（扩展）</p></li>
<li><p>flex-shrink：控制 flex 元素在容器没有额外空间又如何缩小</p></li>
<li>
<p>flex-basis：指定了 flex 元素在主轴方向上的初始大小</p>
<ul>
<li><p>auto：默认值，flex 元素宽度的计算是基于内容的多少来自动计算</p></li>
<li><p>取任何用于 width 属性的任何值，比如 % || em || rem || px等</p></li>
</ul>
</li>
<li>
<p>flex：flex-grow flex-shrink flex-basis 的速记</p>
<ul>
<li><p>flex: 0 1 auto; 默认行为</p></li>
<li><p>flex: 0 0 auto; 相当于 flex: none; 它基本上是一个固定宽度的元素，其初始宽度是基于 flex 元素中内容大小</p></li>
<li><p>flex: 1 1 auto; 相当于 flex: auto; 自动计算初始化宽度，但是如果有必要，会伸展或者收缩以适应整个可用宽度</p></li>
<li><p>flex: "positive number"  将 flex 元素的初始宽度设置为零，伸展元素以填满可用空间 并且最后只要有可能就收缩元素</p></li>
</ul>
</li>
<li>
<p>align-self：整体对齐 flex 容器内的所有弹性项目，改变一个 flex 元素沿着侧轴的位置，而不影响相邻的 flex 元素</p>
<ul>
<li><p>auto：默认值，设置为父元素的 align-item 值，如果该元素没有父元素的话，就设置为&nbsp;stretch</p></li>
<li><p>flex-start：元素会对齐到&nbsp;cross-axis&nbsp;的首端</p></li>
<li><p>flex-end：元素会对齐到&nbsp;cross-axis&nbsp;的尾端</p></li>
<li><p>center：flex 元素会对齐到 cross-axis 的中间，如果该元素的 cross-size 的尺寸大于 flex 容器，将在两个方向均等溢出</p></li>
<li><p>baseline：所有的 flex 元素会沿着基线对齐</p></li>
<li><p>stretch：将目标元素拉伸，以沿着 cross-axis 填满 flex 容器的可用空间，flex 元素高度和 flex 容器高度一样</p></li>
</ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flex-box 速记表

## 原文链接
[https://segmentfault.com/a/1190000008513899](https://segmentfault.com/a/1190000008513899)

