---
title: '如何用 Python 解析 HTML' 
date: 2019-01-20 2:30:11
hidden: true
slug: 9rw2sq677j8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何用-python-解析-html"></a>如何用 Python 解析 HTML</h1>
<p>用一些简单的脚本，可以很容易地清理文档和其它大量的 HTML 文件。但是首先你需要解析它们。 <a href="https://camo.githubusercontent.com/99460d6f61149df86b5b0e1ebe8d63a19f651c2e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6275735f68746d6c5f636f64652e706e673f69746f6b3d566a556d47736e6c"><img src="http://p0.qhimg.com/t019d88222a2c7782e6.png" alt=""></a></p>
<p>图片由 Jason Baker 为 Opensource.com 所作。</p>
<p>作为 Scribus 文档团队的长期成员，我要随时了解最新的源代码更新，以便对文档进行更新和补充。 我最近在刚升级到 Fedora 27 系统的计算机上使用 Subversion 进行检出操作时，对于下载该文档所需要的时间我感到很惊讶，文档由 HTML 页面和相关图像组成。 我恐怕该项目的文档看起来比项目本身大得多，并且怀疑其中的一些内容是“僵尸”文档——不再使用的 HTML 文件以及 HTML 中无法访问到的图像。</p>
<p>我决定为自己创建一个项目来解决这个问题。 一种方法是搜索未使用的现有图像文件。 如果我可以扫描所有 HTML 文件中的图像引用，然后将该列表与实际图像文件进行比较，那么我可能会看到不匹配的文件。</p>
<p>这是一个典型的图像标签：</p>
<pre><code class="hljs routeros">&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/edit_shapes.png"</span> <span class="hljs-attribute">ALT</span>=<span class="hljs-string">"Edit examples"</span> <span class="hljs-attribute">ALIGN</span>=left&gt;

</code></pre><p>我对 <code>src=</code> 之后的第一组引号之间的部分很感兴趣。 在寻找了一些解决方案后，我找到一个名为 <a href="https://www.crummy.com/software/BeautifulSoup/">BeautifulSoup</a> 的 Python 模块。 脚本的核心部分如下所示：</p>
<pre><code class="hljs lua">soup = BeautifulSoup(all_text, <span class="hljs-string">'html.parser'</span>)
<span class="hljs-built_in">match</span> = soup.findAll(<span class="hljs-string">"img"</span>)
<span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(<span class="hljs-built_in">match</span>) &gt; <span class="hljs-number">0</span>:
    <span class="hljs-keyword">for</span> m <span class="hljs-keyword">in</span> <span class="hljs-built_in">match</span>:
        imagelist.append(str(m))

</code></pre><p>我们可以使用这个 <code>findAll</code> 方法来挖出图片标签。 这是一小部分输出：</p>
<pre><code class="hljs routeros">&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/pdf-form-ht3.png"</span>/&gt;&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/pdf-form-ht4.png"</span>/&gt;&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/pdf-form-ht5.png"</span>/&gt;&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/pdf-form-ht6.png"</span>/&gt;&lt;img <span class="hljs-attribute">align</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attribute">alt</span>=<span class="hljs-string">"GSview - Advanced Options Panel"</span> <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/gsadv1.png"</span> <span class="hljs-attribute">title</span>=<span class="hljs-string">"GSview - Advanced Options Panel"</span>/&gt;&lt;img <span class="hljs-attribute">align</span>=<span class="hljs-string">"middle"</span> <span class="hljs-attribute">alt</span>=<span class="hljs-string">"Scribus External Tools Preferences"</span> <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/gsadv2.png"</span> <span class="hljs-attribute">title</span>=<span class="hljs-string">"Scribus External Tools Preferences"</span>/&gt;

</code></pre><p>到现在为止还挺好。我原以为下一步就可以搞定了，但是当我在脚本中尝试了一些字符串方法时，它返回了有关标记的错误而不是字符串的错误。 我将输出保存到一个文件中，并在 <a href="https://www.kde.org/applications/utilities/kwrite/">KWrite</a> 中进行编辑。 KWrite 的一个好处是你可以使用正则表达式（regex）来做“查找和替换”操作，所以我可以用 <code>\n&lt;img</code> 替换 <code>&lt;img</code>，这样可以看得更清楚。 KWrite 的另一个好处是，如果你用正则表达式做了一个不明智的选择，你还可以撤消。</p>
<p>但我认为，肯定有比这更好的东西，所以我转而使用正则表达式，或者更具体地说 Python 的 <code>re</code> 模块。 这个新脚本的相关部分如下所示：</p>
<pre><code class="hljs awk">match = re.findall(<span class="hljs-string">r'src="(.*)/&gt;'</span>, all_text)
<span class="hljs-keyword">if</span> len(match)&gt;<span class="hljs-number">0</span>:
    <span class="hljs-keyword">for</span> m <span class="hljs-keyword">in</span> match:
        imagelist.append(m)

</code></pre><p>它的一小部分输出如下所示：</p>
<pre><code class="hljs gams">images/cmcanvas.png<span class="hljs-string">" title="</span>Context Menu <span class="hljs-keyword">for</span> the document canvas<span class="hljs-string">" alt="</span>Context Menu <span class="hljs-keyword">for</span> the document canvas<span class="hljs-string">" /&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;br images/eps-imp1.png"</span> title=<span class="hljs-string">"EPS preview in a file dialog"</span> alt=<span class="hljs-string">"EPS preview in a file dialog"</span> images/<span class="hljs-literal">eps</span>-imp5.png<span class="hljs-string">" title="</span>Colors imported from an <span class="hljs-literal">EPS</span> <span class="hljs-keyword">file</span><span class="hljs-string">" alt="</span>Colors imported from an <span class="hljs-literal">EPS</span> <span class="hljs-keyword">file</span><span class="hljs-string">" images/eps-imp4.png"</span> title=<span class="hljs-string">"EPS font substitution"</span> alt=<span class="hljs-string">"EPS font substitution"</span> images/<span class="hljs-literal">eps</span>-imp2.png<span class="hljs-string">" title="</span><span class="hljs-literal">EPS</span> import progress<span class="hljs-string">" alt="</span><span class="hljs-literal">EPS</span> import progress<span class="hljs-string">" images/eps-imp3.png"</span> title=<span class="hljs-string">"Bitmap conversion failure"</span> alt=<span class="hljs-string">"Bitmap conversion failure"</span>

</code></pre><p>乍一看，它看起来与上面的输出类似，并且附带有去除图像的标签部分的好处，但是有令人费解的是还夹杂着表格标签和其他内容。 我认为这涉及到这个正则表达式 <code>src="(.*)/&gt;</code>，这被称为_贪婪_，意味着它不一定停止在遇到 <code>/&gt;</code> 的第一个实例。我应该补充一点，我也尝试过 <code>src="(.*)"</code>，这真的没有什么更好的效果，我不是一个正则表达式专家（只是做了这个），找了各种方法来改进这一点但是并没什么用。</p>
<p>做了一系列的事情之后，甚至尝试了 Perl 的 <code>HTML::Parser</code> 模块，最终我试图将这与我为 Scribus 编写的一些脚本进行比较，这些脚本逐个字符的分析文本内容，然后采取一些行动。 为了最终目的，我终于想出了所有这些方法，并且完全不需要正则表达式或 HTML 解析器。 让我们回到展示的那个 <code>img</code> 标签的例子。</p>
<pre><code class="hljs routeros">&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"images/edit_shapes.png"</span> <span class="hljs-attribute">ALT</span>=<span class="hljs-string">"Edit examples"</span> <span class="hljs-attribute">ALIGN</span>=left&gt;

</code></pre><p>我决定回到 <code>src=</code> 这一块。 一种方法是等待 <code>s</code> 出现，然后看下一个字符是否是 <code>r</code>，下一个是 <code>c</code>，下一个是否 <code>=</code>。 如果是这样，那就匹配上了！ 那么两个双引号之间的内容就是我所需要的。 这种方法的问题在于需要连续识别上面这样的结构。 一种查看代表一行 HTML 文本的字符串的方法是：</p>
<pre><code class="hljs groovy"><span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> <span class="hljs-string">all_text:</span>

</code></pre><p>但是这个逻辑太乱了，以至于不能持续匹配到前面的 <code>c</code>，还有之前的字符，更之前的字符，更更之前的字符。</p>
<p>最后，我决定专注于 <code>=</code> 并使用索引方法，以便我可以轻松地引用字符串中的任何先前或将来的字符。 这里是搜索部分：</p>
<pre><code class="hljs delphi">    <span class="hljs-keyword">index</span> = <span class="hljs-number">3</span>
    <span class="hljs-keyword">while</span> <span class="hljs-keyword">index</span> &lt; linelength:
        <span class="hljs-keyword">if</span> (all_text[<span class="hljs-keyword">index</span>] == <span class="hljs-string">'='</span>):
            <span class="hljs-keyword">if</span> (all_text[<span class="hljs-keyword">index</span>-<span class="hljs-number">3</span>] == <span class="hljs-string">'s'</span>) <span class="hljs-keyword">and</span> (all_text[<span class="hljs-keyword">index</span>-<span class="hljs-number">2</span>] == <span class="hljs-string">'r'</span>) <span class="hljs-keyword">and</span> (all_text[<span class="hljs-keyword">index</span>-<span class="hljs-number">1</span>] == <span class="hljs-string">'c'</span>):
                imagefound(all_text, imagelist, <span class="hljs-keyword">index</span>)
                <span class="hljs-keyword">index</span> += <span class="hljs-number">1</span>
            <span class="hljs-keyword">else</span>:
                <span class="hljs-keyword">index</span> += <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">index</span> += <span class="hljs-number">1</span>

</code></pre><p>我用第四个字符开始搜索（索引从 0 开始），所以我在下面没有出现索引错误，并且实际上，在每一行的第四个字符之前不会有等号。 第一个测试是看字符串中是否出现了 <code>=</code>，如果没有，我们就会前进。 如果我们确实看到一个等号，那么我们会看前三个字符是否是 <code>s</code>、<code>r</code> 和 <code>c</code>。 如果全都匹配了，就调用函数 <code>imagefound</code>：</p>
<pre><code class="hljs haxe">def imagefound(all_text, imagelist, index):<span class="hljs-type"></span>
    end = <span class="hljs-number">0</span>
    index += <span class="hljs-number">2</span>
    <span class="hljs-keyword">new</span><span class="hljs-type">image</span> = <span class="hljs-string">''</span>
    <span class="hljs-keyword">while</span> end == <span class="hljs-number">0</span>:<span class="hljs-type"></span>
        <span class="hljs-keyword">if</span> (all_text[index] != <span class="hljs-string">'"'</span>):<span class="hljs-type"></span>
            <span class="hljs-keyword">new</span><span class="hljs-type">image</span> = <span class="hljs-keyword">new</span><span class="hljs-type">image</span> + all_text[index]
            index += <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:<span class="hljs-type"></span>
            <span class="hljs-keyword">new</span><span class="hljs-type">image</span> = <span class="hljs-keyword">new</span><span class="hljs-type">image</span> + <span class="hljs-string">'\n'</span>
            imagelist.append(<span class="hljs-keyword">new</span><span class="hljs-type">image</span>)
            end = <span class="hljs-number">1</span>
            <span class="hljs-keyword">return</span>

</code></pre><p>我们给函数发送当前索引，它代表着 <code>=</code>。 我们知道下一个字符将会是 <code>"</code>，所以我们跳过两个字符，并开始向名为 <code>newimage</code> 的控制字符串添加字符，直到我们发现下一个 <code>"</code>，此时我们完成了一次匹配。 我们将字符串加一个换行符（<code>\n</code>）添加到列表 <code>imagelist</code> 中并返回（<code>return</code>），请记住，在剩余的这个 HTML 字符串中可能会有更多图片标签，所以我们马上回到搜索循环中。</p>
<p>以下是我们的输出现在的样子：</p>
<pre><code class="hljs applescript">images/<span class="hljs-built_in">text</span>-frame-link.png
images/<span class="hljs-built_in">text</span>-frame-unlink.png
images/gimpoptions1.png
images/gimpoptions3.png
images/gimpoptions2.png
images/fontpref3.png
images/font-subst.png
images/fontpref2.png
images/fontpref1.png
images/dtp-studio.png

</code></pre><p>啊，干净多了，而这只花费几秒钟的时间。 我本可以将索引前移 7 步来剪切 <code>images/</code> 部分，但我更愿意把这个部分保存下来，以确保我没有剪切掉图像文件名的第一个字母，这很容易用 KWrite 编辑成功 —— 你甚至不需要正则表达式。 做完这些并保存文件后，下一步就是运行我编写的另一个脚本 <code>sortlist.py</code>：</p>
<pre><code class="hljs livecodeserver"><span class="hljs-comment">#!/usr/bin/env python</span>
<span class="hljs-comment"># -*- coding: utf-8  -*-</span>
<span class="hljs-comment"># sortlist.py</span>

import os

imagelist = []
<span class="hljs-keyword">for</span> <span class="hljs-built_in">line</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">'/tmp/imagelist_parse4.txt'</span>).xreadlines():
    imagelist.append(<span class="hljs-built_in">line</span>)

imagelist.<span class="hljs-built_in">sort</span>()

outfile = <span class="hljs-built_in">open</span>(<span class="hljs-string">'/tmp/imagelist_parse4_sorted.txt'</span>, <span class="hljs-string">'w'</span>)
outfile.writelines(imagelist)
outfile.<span class="hljs-built_in">close</span>()

</code></pre><p>这会读取文件内容，并存储为列表，对其排序，然后另存为另一个文件。 之后，我可以做到以下几点：</p>
<pre><code class="hljs awk">ls <span class="hljs-regexp">/home/g</span>regp<span class="hljs-regexp">/development/</span>Scribus15x<span class="hljs-regexp">/doc/</span>en<span class="hljs-regexp">/images/</span>*.png &gt; <span class="hljs-string">'/tmp/actual_images.txt'</span>

</code></pre><p>然后我需要在该文件上运行 <code>sortlist.py</code>，因为 <code>ls</code> 方法的排序与 Python 不同。 我原本可以在这些文件上运行比较脚本，但我更愿意以可视方式进行操作。 最后，我成功找到了 42 个图像，这些图像没有来自文档的 HTML 引用。</p>
<p>这是我的完整解析脚本：</p>
<pre><code class="hljs vim">#!/usr/bin/env <span class="hljs-keyword">python</span>
# -*- codin<span class="hljs-variable">g:</span> utf-<span class="hljs-number">8</span>  -*-
# parseimg4.<span class="hljs-keyword">py</span>

import os

def imagefound(all_text, imagelist, <span class="hljs-built_in">index</span>):
    end = <span class="hljs-number">0</span>
    <span class="hljs-built_in">index</span> += <span class="hljs-number">2</span>
    newimage = <span class="hljs-string">''</span>
    <span class="hljs-keyword">while</span> end == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">if</span> (all_text[<span class="hljs-built_in">index</span>] != <span class="hljs-string">'"'</span>):
            newimage = newimage + all_text[<span class="hljs-built_in">index</span>]
            <span class="hljs-built_in">index</span> += <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            newimage = newimage + <span class="hljs-string">'\n'</span>
            imagelist.<span class="hljs-keyword">append</span>(newimage)
            end = <span class="hljs-number">1</span>
            <span class="hljs-keyword">return</span>

htmlnames = []
imagelist = []
tempstring = <span class="hljs-string">''</span>
filenames = os.listdir(<span class="hljs-string">'/home/gregp/development/Scribus15x/doc/en/'</span>)
<span class="hljs-keyword">for</span> name in filename<span class="hljs-variable">s:</span>
    <span class="hljs-keyword">if</span> name.endswith(<span class="hljs-string">'.html'</span>):
        htmlnames.<span class="hljs-keyword">append</span>(name)
#print htmlnames
<span class="hljs-keyword">for</span> htmlfile in htmlname<span class="hljs-variable">s:</span>
    all_text = <span class="hljs-keyword">open</span>(<span class="hljs-string">'/home/gregp/development/Scribus15x/doc/en/'</span> + htmlfile).<span class="hljs-keyword">read</span>()
    linelength = <span class="hljs-built_in">len</span>(all_text)
    <span class="hljs-built_in">index</span> = <span class="hljs-number">3</span>
    <span class="hljs-keyword">while</span> <span class="hljs-built_in">index</span> &lt; linelength:
        <span class="hljs-keyword">if</span> (all_text[<span class="hljs-built_in">index</span>] == <span class="hljs-string">'='</span>):
            <span class="hljs-keyword">if</span> (all_text[<span class="hljs-built_in">index</span>-<span class="hljs-number">3</span>] == <span class="hljs-string">'s'</span>) <span class="hljs-built_in">and</span> (all_text[<span class="hljs-built_in">index</span>-<span class="hljs-number">2</span>] == <span class="hljs-string">'r'</span>) <span class="hljs-built_in">and</span>
(all_text[<span class="hljs-built_in">index</span>-<span class="hljs-number">1</span>] == <span class="hljs-string">'c'</span>):
                imagefound(all_text, imagelist, <span class="hljs-built_in">index</span>)
                <span class="hljs-built_in">index</span> += <span class="hljs-number">1</span>
            <span class="hljs-keyword">else</span>:
                <span class="hljs-built_in">index</span> += <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-built_in">index</span> += <span class="hljs-number">1</span>

outfile = <span class="hljs-keyword">open</span>(<span class="hljs-string">'/tmp/imagelist_parse4.txt'</span>, <span class="hljs-string">'w'</span>)
outfile.writelines(imagelist)
outfile.<span class="hljs-keyword">close</span>()
imageno = <span class="hljs-built_in">len</span>(imagelist)
<span class="hljs-keyword">print</span> str(imageno) + <span class="hljs-string">" images were found and saved"</span>

</code></pre><p>脚本名称为 <code>parseimg4.py</code>，这并不能真实反映我陆续编写的脚本数量（包括微调的和大改的以及丢弃并重新开始写的）。 请注意，我已经对这些目录和文件名进行了硬编码，但是很容易变得通用化，让用户输入这些信息。 同样，因为它们是工作脚本，所以我将输出发送到 <code>/tmp</code> 目录，所以一旦重新启动系统，它们就会消失。</p>
<p>这不是故事的结尾，因为下一个问题是：僵尸 HTML 文件怎么办？ 任何未使用的文件都可能会引用图像，不能被前面的方法所找出。 我们有一个 <code>menu.xml</code> 文件作为联机手册的目录，但我还需要考虑 TOC（LCTT 译注：TOC 是 table of contents 的缩写）中列出的某些文件可能引用了不在 TOC 中的文件，是的，我确实找到了一些这样的文件。</p>
<p>最后我可以说，这是一个比图像搜索更简单的任务，而且开发的过程对我有很大的帮助。</p>
<h3><a href="#关于作者"></a>关于作者</h3>
<p><a href="https://opensource.com/users/greg-p"><img src="http://p0.qhimg.com/t01007793b01aa52878.png" alt=""></a></p>
<p>Greg Pittman 是 Kentucky 州 Louisville 市的一名退休的神经学家，从二十世纪六十年代的 Fortran IV 语言开始长期以来对计算机和编程有着浓厚的兴趣。 当 Linux 和开源软件出现的时候，Greg 深受启发，去学习更多知识，并实现最终贡献的承诺。 他是 Scribus 团队的成员。<a href="https://opensource.com/users/greg-p">更多关于我</a></p>
<hr>
<p>via: <a href="https://opensource.com/article/18/1/parsing-html-python">https://opensource.com/article/18/1/parsing-html-python</a></p>
<p>作者：<a href="https://opensource.com/users/greg-p">Greg Pittman</a> 译者：<a href="https://github.com/Flowsnow">Flowsnow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用 Python 解析 HTML

## 原文链接
[https://www.zcfy.cc/article/parsing-html-with-python](https://www.zcfy.cc/article/parsing-html-with-python)

