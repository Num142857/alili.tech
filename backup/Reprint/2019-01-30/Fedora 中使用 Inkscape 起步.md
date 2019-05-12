---
title: 'Fedora 中使用 Inkscape 起步' 
date: 2019-01-30 2:30:22
hidden: true
slug: ctmwk9xgaj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#fedora-中使用-inkscape-起步"></a>Fedora 中使用 Inkscape 起步</h1>
<p>Inkscape 是一个流行的、功能齐全、自由而开源的矢量<a href="https://inkscape.org/">图形编辑器</a>，它已经在 Fedora 官方仓库中。它特别适合创作 <a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG 格式</a>的矢量图形。Inkscape 非常适于创建和操作图片和插图，以及创建图表和用户界面设计。</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/cyberscoty-landscape-800px.png"><img src="https://p3.ssl.qhimg.com/t01736b6821bcb8bd88.png" alt="cyberscoty-landscape-800px"></a></p>
<p><em>使用 inkscape 创建的<a href="https://openclipart.org/detail/185885/windmill-in-landscape">风车景色</a>的插图</em></p>
<p><a href="https://inkscape.org/en/about/screenshots/">其官方网站的截图页</a>上有一些很好的例子，说明 Inkscape 可以做些什么。Fedora 杂志Fedora Magazine上的大多数精选图片也是使用 Inkscape 创建的，包括最近的精选图片：</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/09/communty.png"><img src="https://p0.ssl.qhimg.com/t01e888640720957665.png" alt="communty"></a></p>
<p><em>Fedora 杂志最近使用 Inkscape 创建的精选图片</em></p>
<h3><a href="#在-fedora-上安装-inkscape"></a>在 Fedora 上安装 Inkscape</h3>
<p><strong>Inkscape 已经<a href="https://apps.fedoraproject.org/packages/inkscape">在 Fedora 官方仓库中了</a>，因此可以非常简单地在 Fedora Workstation 上使用 Software 这个应用来安装它：</strong></p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/inkscape-gnome-software.png"><img src="https://p5.ssl.qhimg.com/t01783cd7ead19acc34.png" alt="inkscape-gnome-software"></a></p>
<p>另外，如果你习惯用命令行，你可以使用 <code>dnf</code> 命令来安装：</p>
<pre><code class="hljs cmake">sudo dnf <span class="hljs-keyword">install</span> inkscape

</code></pre><h3><a href="#开始深入-inkscape"></a>（开始）深入 Inkscape</h3>
<p>当第一次打开程序时，你会看到一个空白页面，并且有一组不同的工具栏。对于初学者，最重要的三个工具栏是：Toolbar、Tools Control Bar、 Colour Palette（调色板）：</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/inkscape_window.png"><img src="https://p3.ssl.qhimg.com/t01dcc9c028fcd9da4e.png" alt="inkscape_window"></a></p>
<p><strong>Toolbar</strong>提供了创建绘图的所有基本工具，包括以下工具：</p>
<ul>
<li>矩形工具：用于绘制矩形和正方形</li>
<li>星形/多边形（形状）工具</li>
<li>圆形工具：用于绘制椭圆和圆</li>
<li>文本工具：用于添加标签和其他文本</li>
<li>路径工具：用于创建或编辑更复杂或自定义的形状</li>
<li>选择工具：用于选择图形中的对象</li>
</ul>
<p><strong>Colour Palette</strong> 提供了一种设置当前选定对象的颜色的快速方式。 <strong>Tools Control Bar</strong> 提供了工具栏中当前选定工具的所有设置。每次选择新工具时，Tools Control Bar 会变成该工具的相应设置：</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/inkscape-toolscontrolbar.gif"><img src="https://p2.ssl.qhimg.com/t013c43e4e874ff07f3.gif" alt=""></a></p>
<h3><a href="#绘图"></a>绘图</h3>
<p>接下来，让我们使用 Inkscape 绘制一个星星。 首先，从 <strong>Toolbar</strong> 中选择星形工具，<strong>然后在主绘图区域上单击并拖动。</strong></p>
<p>你可能会注意到你画的星星看起来很像一个三角形。要更改它，请使用 <strong>Tools Control Bar</strong> 中的 <strong>Corners</strong> 选项，再添加几个点。 最后，当你完成后，在星星仍被选中的状态下，从 <strong>Palette</strong>（调色板）中选择一种颜色来改变星星的颜色：</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/inkscape-drawastar.gif"><img src="https://p0.ssl.qhimg.com/t01f5ed62d0aa3822d6.gif" alt="inkscape-drawastar"></a></p>
<p>接下来，可以在 Toolbar 中实验一些其他形状工具，如矩形工具，螺旋工具和圆形工具。通过不同的设置，每个工具都可以创建一些独特的图形。</p>
<h3><a href="#在绘图中选择并移动对象"></a>在绘图中选择并移动对象</h3>
<p>现在你有一堆图形了，你可以使用 Select 工具来移动它们。要使用 Select 工具，首先从工具栏中选择它，然后单击要操作的形状，接着将图形拖动到您想要的位置。</p>
<p>选择形状后，你还可以使用尺寸句柄调整图形大小。此外，如果你单击所选的图形，尺寸句柄将转变为旋转模式，并允许你旋转图形：</p>
<p><a href="https://cdn.fedoramagazine.org/wp-content/uploads/2016/10/inkscape-movingshapes.gif"><img src="https://p5.ssl.qhimg.com/t01a345138b4cc414c3.gif" alt="inkscape-movingshapes"></a></p>
<hr>
<p>Inkscape是一个很棒的软件，它还包含了更多的工具和功能。在本系列的下一篇文章中，我们将介绍更多可用来创建插图和文档的功能和选项。</p>
<hr>
<p>作者简介：Ryan 是一名 Fedora 设计师。他使用 Fedora Workstation 作为他的主要桌面，还有来自 Libre Graphics 世界的最好的工具，尤其是矢量图形编辑器 Inkscape。</p>
<hr>
<p>via: <a href="https://fedoramagazine.org/getting-started-inkscape-fedora/">https://fedoramagazine.org/getting-started-inkscape-fedora/</a></p>
<p>作者：<a href="http://ryanlerch.id.fedoraproject.org/">Ryan Lerch</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Fedora 中使用 Inkscape 起步

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-inkscape-on-fedora](https://www.zcfy.cc/article/getting-started-with-inkscape-on-fedora)

