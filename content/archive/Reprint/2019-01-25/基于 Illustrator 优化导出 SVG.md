---
title: '基于 Illustrator 优化导出 SVG' 
date: 2019-01-25 2:30:23
hidden: true
slug: 33bwh8tq75q
categories: [reprint]
---

{{< raw >}}

            <p><img src="http://s4.qhres.com/static/797bf1fdd040699b.svg" alt="SVG"></p>
<p>深入理解如何创建，导出和优化 SVG 文件对于我们使用 SVG 非常有帮助。</p>
<p>本文开始之前，你需要先清除一件事情完整的 SVG 优化涉及到从创建到导出整个过程。像任何 HTML 网页一样，在完成之后很难修复一个糟糕的 SVG 文件。</p>
<p>当然，您可以在导出后使用优化工具，但这种自动化的方法可能会以各种意想不到的方式破坏您的文件。拥有良好的手动SVG优化概念的扎实的工作知识将使您从一开始就保持良好的状态。</p>
<p>这正是你今天要学习的。</p>
<h2>在Illustrator中创建SVG</h2>
<p>当您在Illustrator中创建一个用于SVG导出的图形时，您需要执行一些步骤和注意事项，以便为Web正确优化最终的输出。我们现在来探讨一下。</p>
<h3>设置正确的色彩空间</h3>
<p>Illustrator（作为大多数矢量插图软件）最初是为打印制作而设计的，因此其默认颜色空间设置为CMYK。RGB更适合于网页和屏幕使用，并且具有比CMYK更广泛的色域（颜色范围）。所以，当您创建新文档时，请确保颜色模式设置为RGB - 如下图所示。</p>
<h3>合理命名图层</h3>
<p>SVG文件不像常规的位图图像由一组像素点构成。这是一个具有特定结构的文本文档。</p>
<p>像HTML文档一样，您可以分别选择和操作各个元素。要做到这一点，你需要使用他们的名字作为yin'yong。我发现在Illustrator中进行可视化编辑时创建这些标签总是容易得多，而不是在以后。</p>
<p>出于这个原因，为每个图形元素提供一个有意义的名称是非常重要的。以下是在Illustrator中创建图形时需要了解的信息：</p>
<ul>
<li><p>Illustrator<strong>图层</strong>和<strong>图层组</strong>名称用作SVG组的ID</p>
</li>
<li><p>Illustrator<strong>符号</strong>名称用作SVG符号的ID</p>
</li>
<li><p>Illustrator<strong>图形样式</strong>名称用作CSS类</p>
</li>
</ul>
<p>在下面的图片中，您可以看到Illustrator文件中的名称如何反映到导出的SVG中。</p>
<p><img src="http://p0.qhimg.com/t011c206d3d9dd430b0.png" alt="layers and styles"><img src="http://p0.qhimg.com/t017ee2ecdba6acaa8c.png" alt="Web Elements"></p>
<h3>尽可能简化你的形状</h3>
<p>SVG图形中的形状用坐标点描述。绘图越多，文件越大，编辑和维护越困难。创建小而高效的文件可以让你的生活更轻松。</p>
<p>要解决这个问题，您需要使用尽可能少的点数来创建所需的形状。这可以通过几种方式来实现。</p>
<h4>尽可能使用主SVG形状而不是SVG路径</h4>
<p>使用 <code>line</code>，<code>rect</code> 和 <code>circle</code> 等简单元素具有一些显著的优点。</p>
<p>首先，简单的形状对于人类来说更具可读性 - 当路径可以是任何东西时，我们可以看到一个圆圈是一个圆圈。</p>
<p>其次，简单的形状几乎总是产生更小的文件大小和更少的代码，这使得维护和编辑更容易。您还可以使用它们的直接属性（如x，y，cx，cy）更轻松地控制它们，而不是像路径一样使用点坐标。</p>
<p>要了解我的意思，在下面的图像中，您可以看到一个简单的圆形形状，一次被定义为SVG圆形元素，一次被定义为SVG路径。尽管它们的渲染效果是一样的，但使用SVG形状描述让 SVG 文件更小，更通用。请注意，一些图形编辑器 - 例如Fireworks的SVG导出扩展 - 在导出时会将SVG形状转换为路径。</p>
<p><img src="http://p0.qhimg.com/t01d3541c45d649f532.png" alt="Shapes vs. Paths"></p>
<h4>简化路径</h4>
<p>路径只是一个坐标点数组。简化路径意味着删除一些点，这将导致更少的路径数据和更小的文件大小。要做到这一点，你可以使用<code>对象&gt;路径&gt;简化...</code>命令或<code>变形工具</code>。在这两种情况下，重点是最大限度地减少路径的点，而不失去视觉效果的质量。</p>
<p>在下面的图片中，您可以看到Illustrator的简化过程如何将路径点数从32减少到23（大约是25％），以及这如何反映到代码中。路径数据减少，而视觉质量仍然保持在良好水平。</p>
<p><img src="http://p0.qhimg.com/t0153d59b0ec396da4b.png" alt="simplify"><img src="http://p0.qhimg.com/t01763ab9aa20306883.png" alt="before and after"></p>
<h4>决定是否将文本转换为路径</h4>
<p>在SVG图形中，文本是一个独立的元素，因此它是可搜索的，可访问的，并且易于重新编辑。这对于文本来说是有价值的。但是，如果要保证文本的外观与您在任何地方设计的方式完全相同的话，则需要用户安装正确的字体。这意味着你需要选择一个大家都安装的字体，或者提供一个网页字体 - 这限制了你的创造力。</p>
<p>如果精确的文本渲染比可编辑性更重要 - 例如在 LOGO 中 - 您可以使用“类型”&gt;“创建大纲”命令将其转换为路径，或者在导出面板中设置此选项，稍后将会看到。</p>
<p>请记住，将大量文本转换为路径，文件大小会急剧增加 - 所以在转换前仔细考虑。</p>
<p><img src="http://p0.qhimg.com/t01e98ce071b0722f31.png" alt="text to paths"></p>
<h4>使用“SVG过滤器”而不是Illustrator或Photoshop滤镜效果</h4>
<p>Illustrator提供了一组在浏览器中实时应用的SVG滤镜（“效果”&gt; “SVG滤镜”）。<strong>Illustrator或Photoshop 滤镜效果</strong>会将效果叠加后生成的光栅图嵌入到 SVG 中，而 SVG 滤镜可以随时更改或删除。</p>
<p>您还可以创建可重复使用的过滤器并/或通过<strong>应用SVG过滤器</strong>对话框进行编辑。</p>
<p><img src="http://p0.qhimg.com/t01773b75aae084fa55.png" alt="Filters"></p>
<h4>为画布设置合适的大小</h4>
<p>如果你希望你的SVG能够如期望地显示出来，那么总是把你的画板修剪到绘图区域是个好习惯。画布尺寸是导出的SVG视口的尺寸，画布中的任何空白都将作为视口内的空白空间生成。</p>
<p>根据具体情况，可以使用“对象”&gt;“画板”&gt;“适合艺术作品边界”或“对象”&gt;“画板”&gt;“适合选定的艺术”命令。</p>
<p>在下面的图片中，左边的星星将会与周围的白色空间一起导出，而右边的星星则会以适当的尺寸导出。</p>
<p><img src="http://p0.qhimg.com/t01d7e496d3b3796045.png" alt="Fit to Artboard"></p>
<ul>
<li>广告 -</li>
</ul>
<h2>在Illustrator中导出SVG</h2>
<p>自2015.2版以来，Illustrator CC随附了一个为网页优化的SVG文件创建的新导出面板。在本节中，我们将看到如何使用它。</p>
<p>注意：对于那些使用旧版本Illustrator的人来说，这是一个<a href="http://creativedroplets.com/export-svg-for-the-web-with-illustrator-cc/">合适的教程</a>。</p>
<p>当您的图形准备好生产时，选择 “文件”&gt; “导出”&gt; “导出为” ...命令，然后选择SVG作为文件类型的选项并点击导出按钮。您应该看到以下面板：</p>
<p><img src="http://p0.qhimg.com/t01c29470f9167de86c.png" alt="Export dialog"></p>
<p>让我们来看看更详细的选项。</p>
<h4>Styling</h4>
<p>有三种方法可以设置SVG的样式，并将其显示在第一个下拉列表中。</p>
<ol>
<li><p>首先是使用内部CSS（例如一个 <code>&lt;style&gt;</code> 块），一般认为这是“分离关注”原则之后的最佳选择。</p>
</li>
<li><p>第二种方法是使用内联CSS样式。</p>
</li>
<li><p>第三种方法是使用SVG表示属性。</p>
</li>
</ol>
<p>在下面的图片中，您可以看到这三个选项之间的区别。</p>
<p><img src="http://p0.qhimg.com/t01916efd05e49260b8.png" alt="enter image description here"></p>
<h4>Font</h4>
<p>如果要将文本转换为轮廓，可以在此处指示Illustrator执行此操作。如果要保留文本可编辑性，请选择SVG选项。轮廓文本为您提供了对印刷术的完全视觉控制，但花费巨大 - 文件大小被压缩，文本丢失了可编辑性和可搜索性。</p>
<p>注意：<a href="https://github.com/w3c/svgwg/wiki/SVG-2-new-features#removed">SVG字体将从SVG 2中删除</a>，并被视为已过时的功能，支持从浏览器中删除。</p>
<h4>Images</h4>
<p>在这里，您可以选择如何处理SVG中的任何光栅图像。您可以选择将它们保存为外部文件，或者将其作为<a href="https://en.wikipedia.org/wiki/Data_URI_scheme">DataURI</a>嵌入到SVG中。通常<strong>外链（Link）</strong>是一个有用的选择，因为它使父SVG文件显着缩小，因此，在您的代码编辑器更易于管理。</p>
<p>然而，<strong>嵌入（Embed）</strong>选项有一个伟大的重要优势：嵌入图像永远不会与其“父SVG”断开/分离。使用外链资源的SVG将在第一次下载，上传或移动没有“子图像”时显示丢失的图像图标。</p>
<p>如果你的 SVG 文件想要移植性更高你需要牢记这点。</p>
<p>一般来说，如果您可以<strong>避免在SVG中使用基于像素的图形</strong>，则可以避免将来的许多麻烦。</p>
<p><img src="http://p0.qhimg.com/t01d5c4721c9b8f987d.png" alt="enter image description here"></p>
<h4>Object IDs</h4>
<p>一般来说，最好的选择是选择 <strong>Layer Names(图层名称)</strong>，因为这会给你个别的SVG元素有意义的名字。<strong>Minimal（最小）</strong>使用随机字母数字，而<strong>唯一（Unique）</strong>使用大量随机字符组合。</p>
<p><img src="http://p0.qhimg.com/t01fc6674fcc3d2dc53.png" alt="Object IDs"></p>
<h4>Decimal</h4>
<p>此选项定义您的坐标在小数点后填充的小数位数。更高的数字意味着更精确的路径，而最小的数字产生更少的冗长的代码和小的文件大小。</p>
<p>从下图中可以看到，如果路径有5位小数，体积远大于1个小数点的相同路径，但在视觉上是相同的。</p>
<p>请记住，我们正在讨论像素的百分之一和千分之一。只有在图形非常小或精度要求高时才需要更高的值。在大多数情况下，固定1位小数 - 将是最好的选择。</p>
<p><img src="http://p0.qhimg.com/t01d458230460d7fdc5.png" alt="Decimal Places"></p>
<h4>Minify</h4>
<p>仅当您导出图形的最终版本进行生产时才能检查此选项，并且确定该文件不会再被编辑。</p>
<h4>Responsive</h4>
<p>从理论上讲，这个选项从SVG文档中删除<code>width</code>和<code>height</code>属性 - 使其更具响应性。但是，在大多数情况下，这不足以使您的SVG真正地响应所有浏览器，尤其是IE浏览器。我们将在后续教程中探讨解决这个问题的方法。</p>
<p><strong>提示：</strong>保留原始<code>.ai</code>文件作为源代码总是一个好主意，然后使用该父文件的不同设置导出SVG副本。</p>
<p>当您选择“导出为...”命令时，在出现的导出对话框中，您可能已经注意到一个名为“使用画板”的附加选项。当您使用多个画板时（例如，当您创建一组图标），并且希望将每个画板作为单独的SVG文件导出时，它将变得非常有用。</p>
<p><img src="http://p0.qhimg.com/t01d7e496d3b3796045.png" alt=""></p>
<p>正如您在上面看到的，在SVG的创建和导出过程中会发生很多优化。但是，您可能需要使用某些专用工具（如<a href="https://github.com/svg/svgo">SVGO</a>或其Web GUI GUI版本<a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a>）进一步优化文件。</p>
<p><img src="http://p0.qhimg.com/t012a664be9fd5c1ad1.png" alt="SVGO Optimizer"></p>
<p>请注意，在使用这些工具时您需要小心。他们可以轻松地破坏您的文档功能。我的建议是尽可能使用手动优化，只有在必要和谨慎的情况下才使用自动优化工具。</p>
<p>###更多来自这位作者</p>
<h2>结论</h2>
<p>很多人都认为SVG是Web矢量图形的未来。很难看到SVG不会继续获得更多特性。如果你还不熟悉，那么现在就开始学习，这将是一个好的和明智的投资。</p>
<p><a href="https://www.w3.org/TR/SVG2/">SVG 2</a>发布有一段时间了，为我们带来了许多强大的<a href="https://github.com/w3c/svgwg/wiki/SVG-2-new-features">新功能</a>。真是激动人心的时刻。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Illustrator 优化导出 SVG

## 原文链接
[https://www.zcfy.cc/article/optimizing-and-exporting-svg-in-adobe-illustrator](https://www.zcfy.cc/article/optimizing-and-exporting-svg-in-adobe-illustrator)

