---
title: '如何以 LaTex 创建文档' 
date: 2019-01-22 2:30:08
hidden: true
slug: 928u79y1ohl
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何以-latex-创建文档"></a>如何以 LaTex 创建文档</h1>
<blockquote>
<p>学习以 LaTex 文本标记语言排版文档</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/99642fe623e6a75668ac517ab6fb9f1a6026522c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f696465615f696e6e6f766174696f6e5f6b69645f656475636174696f6e2e706e673f69746f6b3d6a7065744339774a"><img src="" alt="A introduction to creating documents in LaTeX" title="A introduction to creating documents in LaTeX"></a><br>� LaTeX（读作 <code>lay-tech</code> ）是使用纯文本创建文档的方法，使用与 HTML/CSS 或 Markdown 类似的标记标签进行风格化。 LaTeX 最常用于为学术界（如学术期刊）创建文档。 在 LaTeX 中，作者不必直接对文档进行风格化，就像在 Microsoft Word，LibreOffice Writer 或 Apple Pages 等文字处理程序中一样； 而是用纯文本编写代码，这些代码必须经过编译才能生成 PDF 文档。</p>
<p><a href="https://camo.githubusercontent.com/120cd037ba89238926e18470a12d8fc2f6fb3d78/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f696e74726f2e706e67"><img src="https://p0.ssl.qhimg.com/t014888a0770b12d04d.png" alt="computer screen with LaTeX markup language" title="computer screen with LaTeX markup language"></a></p>
<h3><a href="#起步"></a>起步</h3>
<p>要想使用 LaTex 来书写文档，首先你必须要安装一个 LaTex 编辑器。我用的是一款自由开源软件（FOSS），其在学术界�也是大受欢迎，叫做 <a href="http://www.texstudio.org/">TexStudio</a>，它可以运行在 Windows、Unix/Linux、BSD 和 Mac OS X 上。同时你还需要安装一个 <strong>Tex</strong> 排版系统的分发版。因为我都是在 MacOS 上书写文档，所以我使用的分发版是 <a href="https://www.tug.org/mactex/morepackages.html">MacTex 或 BasicTex</a>。对于 Windows 用户你可以使用 <a href="https://miktex.org/download">MiKTex</a>，�而且 Linux 用户�也可以在软件库中找到它。</p>
<p>�当你完成了 TexStudio 和某个 LaTex 的分发版的下载，你就可以�开始对你的文档进行排版了。</p>
<h3><a href="#创建你的第一个文档"></a>创建你的第一个文档</h3>
<p>在这个简短的教程里，我们会创建一个简单的文章，包括一个大标题、一个子标题和两个段落。</p>
<p>在启动 TexStudio 后，保存一份新的文档。 （我将其保存为 <code>helloworld.tex</code> ，因为我正在编写本教程的 Hello，World！文档。这是编程的一个传统。）接下来，你需要在你的 <code>.tex</code> 文件顶部添加一些样板代码用于指定文档的类型和大小。 这与 HTML5 文件中使用的样板代码类似。</p>
<p>我的代码（如下方）将会把页面大小设置为 A4，文本大小设置为 12pt 。 你可以直接把�这些代码放入 TexStudio，并指定你自己的页面大小、字体大小、名称、标题和其他详细信息进行编辑：</p>
<pre><code class="hljs tex"><span class="hljs-tag">\<span class="hljs-name">documentclass</span><span class="hljs-string">[a4paper,12pt]</span><span class="hljs-string">{article}</span></span>
<span class="hljs-tag">\<span class="hljs-name">begin</span><span class="hljs-string">{document}</span></span>
<span class="hljs-tag">\<span class="hljs-name">title</span><span class="hljs-string">{Hello World! My first LaTeX document}</span></span>
<span class="hljs-tag">\<span class="hljs-name">author</span><span class="hljs-string">{Aaron Cocker}</span></span>
<span class="hljs-tag">\<span class="hljs-name">date</span><span class="hljs-string">{\today}</span></span>
<span class="hljs-tag">\<span class="hljs-name">maketitle</span></span>

content will go here 

<span class="hljs-tag">\<span class="hljs-name">end</span><span class="hljs-string">{document}</span></span>

</code></pre><p>接下来，点击�那个大的绿色箭头来编译该文档。就是下方截图中的中间的那个按钮。</p>
<p><a href="https://camo.githubusercontent.com/4cb853222e178a5466edd8736c83775724238c3b/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f636f6d70696c652e706e67"><img src="https://p0.ssl.qhimg.com/t0196e2a2ecbca78e30.png" alt="compile button in TexStudio" title="compile button in TexStudio"></a></p>
<p>如果这期间发生了什么错误，它将显示在底部的对话框里。</p>
<p>在你编译了这个文档之后，你可以看到它就像一个 PDF 一样显示在程序的 WYSIWYG （所见即所得）预览区域中。记住一旦你修改了代码就必须重新编译，就像我们在 C++ 中编程一样。</p>
<p>�通过点击 <strong>Tools &gt; Commands &gt; View PDF</strong> 可以来预览你的文档，如下截图所示。</p>
<p><a href="https://camo.githubusercontent.com/9e72e10205ba54da122dce4c2264874e92f02cf3/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f766965775f61735f7064662e706e67"><img src="https://p0.ssl.qhimg.com/t0166fb00d55dc5c2ae.png" alt="Menu to view a PDF" title="Menu to view a PDF"></a></p>
<p>PDF 的输出将会显示在右侧，就像这样：</p>
<p><a href="https://camo.githubusercontent.com/c04801558e9fc02b9c414f82b402cc3909d0d42c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7064665f6f75747075742e706e67"><img src="https://p0.ssl.qhimg.com/t016ab958c53aa12716.png" alt="Viewing the LaTeX code as PDF" title="Viewing the LaTeX code as PDF"></a></p>
<p>�现在你可以添加一个段落。首先先通过 <code>\section{}</code> 命令来写一个子标题。在命令的大括号中输入你的子标题；我写的是 <code>Introduction</code>。</p>
<pre><code class="hljs tex"><span class="hljs-tag">\<span class="hljs-name">section</span><span class="hljs-string">{Introduction}</span></span>

</code></pre><p>现在你已经给你的段落标记了一个子标题，是时候来写一个�段落了。在这个例子中，我使用了 Lipsum 的 <a href="http://www.lipsum.com/feed/html">lorem ipsum �生成器</a>。�要创建一个段落，要使用 <code>\paragraph{}</code> 命令， 将你的文本插入到 <code>\maketitle</code> 和 <code>\end{document}</code> 之间的 <code>\paragraph{}</code> 大括号下方，而不是中间。</p>
<p>以下就是我创建的段落的代码：</p>
<pre><code class="hljs tex"><span class="hljs-tag">\<span class="hljs-name">section</span><span class="hljs-string">{Introduction}</span></span>

<span class="hljs-tag">\<span class="hljs-name">paragraph</span><span class="hljs-string">{}</span></span>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nisi, tincidunt tempus sem nec, elementum feugiat ipsum. Nulla in diam libero. Nunc tristique ex a nibh egestas sollicitudin. 

<span class="hljs-tag">\<span class="hljs-name">paragraph</span><span class="hljs-string">{}</span></span>
Mauris efficitur vitae ex id egestas. Vestibulum ligula felis, pulvinar a posuere id, luctus vitae leo. Sed ac imperdiet orci, non elementum leo. Nullam molestie congue placerat. Phasellus tempor et libero maximus commodo.

</code></pre><p>�现在你的文档就已经完成了，你可以将其通过 <strong>Save As</strong> 选项导出并保存为一个 PDF 文档（和大多数程序一样）。</p>
<p>这是一个我已经完成的文档及其相应的代码：</p>
<p><a href="https://camo.githubusercontent.com/4506fa26d546ae3c5c2b736836cdb04bd5a474eb/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f66696e69736865645f646f63756d656e742e706e67"><img src="https://p0.ssl.qhimg.com/t0105b5c589d09da492.png" alt="The finished document with code and the PDF output side-by-side" title="The finished document with code and the PDF output side-by-side"></a></p>
<p>本教程所有的代码如下所示：</p>
<pre><code class="hljs tex"><span class="hljs-tag">\<span class="hljs-name">documentclass</span><span class="hljs-string">[a4paper,12pt]</span><span class="hljs-string">{article}</span></span>
<span class="hljs-tag">\<span class="hljs-name">begin</span><span class="hljs-string">{document}</span></span>
<span class="hljs-tag">\<span class="hljs-name">title</span><span class="hljs-string">{Hello World! My first LaTeX document}</span></span>
<span class="hljs-tag">\<span class="hljs-name">author</span><span class="hljs-string">{Aaron Cocker}</span></span>
<span class="hljs-tag">\<span class="hljs-name">date</span><span class="hljs-string">{\today}</span></span>
<span class="hljs-tag">\<span class="hljs-name">maketitle</span></span>

<span class="hljs-tag">\<span class="hljs-name">section</span><span class="hljs-string">{Introduction}</span></span>

<span class="hljs-tag">\<span class="hljs-name">paragraph</span><span class="hljs-string">{}</span></span>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nisi, tincidunt tempus sem nec, elementum feugiat ipsum. Nulla in diam libero. Nunc tristique ex a nibh egestas sollicitudin. 

<span class="hljs-tag">\<span class="hljs-name">paragraph</span><span class="hljs-string">{}</span></span>
Mauris efficitur vitae ex id egestas. Vestibulum ligula felis, pulvinar a posuere id, luctus vitae leo. Sed ac imperdiet orci, non elementum leo. Nullam molestie congue placerat. Phasellus tempor et libero maximus commodo.

<span class="hljs-tag">\<span class="hljs-name">end</span><span class="hljs-string">{document}</span></span>

</code></pre><h3><a href="#更多"></a>更多</h3>
<p>在 LaTeX 撰写的数以千计的优秀资源中，大多数大学制作的指南是可索引的，同时也可以在 Google 搜索中找到。 <a href="https://www.cs.princeton.edu/courses/archive/spr10/cos433/Latex/latex-guide.pdf">普林斯顿大学</a> 提供了一个很好的扩展教程，为了更深入的了解，普林斯顿大学的导师 Donald Knuth 提供了 <a href="http://www.ctex.org/documents/shredder/src/texbook.pdf">The TexBook</a>，这是关于 LaTeX 的最好的教程。</p>
<p>（题图 : opensource.com）</p>
<hr>
<p>作者简介：</p>
<p>Aaron Cocker - 一名在英国上大学的计算机学士。我是一个有抱负的数据科学家。我最喜欢的语言是 Python。 你可以随时�通过邮箱联系我 : <a href="mailto:aaron@aaroncocker.org.uk">aaron@aaroncocker.org.uk</a> 或者访问我的个人网站 : <a href="https://aaroncocker.org.uk">https://aaroncocker.org.uk</a></p>
<hr>
<p>via: <a href="https://opensource.com/article/17/6/introduction-latex">https://opensource.com/article/17/6/introduction-latex</a></p>
<p>作者：<a href="https://opensource.com/users/aaroncocker">Aaron Cocker</a> 译者：<a href="https://github.com/chenxinlong">chenxinlong</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何以 LaTex 创建文档

## 原文链接
[https://www.zcfy.cc/article/a-introduction-to-creating-documents-in-latex](https://www.zcfy.cc/article/a-introduction-to-creating-documents-in-latex)

