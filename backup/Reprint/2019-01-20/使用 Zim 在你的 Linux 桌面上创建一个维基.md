---
title: '使用 Zim 在你的 Linux 桌面上创建一个维基' 
date: 2019-01-20 2:30:11
hidden: true
slug: snf7iag3j0n
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-zim-在你的-linux-桌面上创建一个维基"></a>使用 Zim 在你的 Linux 桌面上创建一个维基</h1>
<blockquote>
<p>用强大而小巧的 Zim 在桌面上像维基一样管理信息。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/71ab89ddd6eb974fb2434aafee7d5071d8a44853/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f4f5344435f626565735f6e6574776f726b2e706e673f69746f6b3d4e464e5251704a69"><img src="http://p0.qhimg.com/t01900aa761734f1105.png" alt=""></a></p>
<p>不可否认维基wiki的用处，即使对于一个极客来说也是如此。你可以用它做很多事——写笔记和手稿，协作项目，建立完整的网站。还有更多的事。</p>
<p>这些年来，我已经使用了几个维基，要么是为了我自己的工作，要么就是为了我接到的各种合同和全职工作。虽然传统的维基很好，但我真的喜欢<a href="https://opensource.com/article/17/2/3-desktop-wikis">桌面版维基</a> 这个想法。它们体积小，易于安装和维护，甚至更容易使用。而且，正如你可能猜到的那样，有许多可以用在 Linux 中的桌面版维基。</p>
<p>让我们来看看更好的桌面版的 维基 之一： <a href="http://zim-wiki.org/">Zim</a>。</p>
<h3><a href="#开始吧"></a>开始吧</h3>
<p>你可以从 Zim 的官网<a href="http://zim-wiki.org/downloads.html">下载</a>并安装 Zim，或者通过发行版的软件包管理器轻松地安装。</p>
<p>安装好了 Zim，就启动它。</p>
<p>在 Zim 中的一个关键概念是笔记本notebook，它们就像某个单一主题的维基页面的集合。当你第一次启动 Zim 时，它要求你为你的笔记本指定一个文件夹和笔记本的名称。Zim 建议用 <code>Notes</code> 来表示文件夹的名称和指定文件夹为 <code>~/Notebooks/</code>。如果你愿意，你可以改变它。我是这么做的。</p>
<p><a href="https://camo.githubusercontent.com/ecf02fa4516633c1434dc767fc297c57b880f147/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d312e706e67"><img src="http://p0.qhimg.com/t014350c72cf66a7a13.png" alt=""></a></p>
<p>在为笔记本设置好名称和指定好文件夹后，单击 “OK” 。你得到的本质上是你的维基页面的容器。</p>
<p><a href="https://camo.githubusercontent.com/da29326e363e78cbc26ddc0a2ec2eadd88ab7066/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d322e706e67"><img src="http://p0.qhimg.com/t01235565d75fb76e1d.png" alt=""></a></p>
<h3><a href="#将页面添加到笔记本"></a>将页面添加到笔记本</h3>
<p>所以你有了一个容器。那现在怎么办？你应该开始往里面添加页面。当然，为此，选择 “File &gt; New Page”。</p>
<p><a href="https://camo.githubusercontent.com/05ac2fde6621dc59749d66c37df81d3325e8156b/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d332e706e67"><img src="http://p0.qhimg.com/t011a98aa2561668e44.png" alt=""></a></p>
<p>输入该页面的名称，然后单击 “OK”。从那里开始，你可以开始输入信息以向该页面添加信息。</p>
<p><a href="https://camo.githubusercontent.com/8fcb407f6bae31b74ef5e59d2d898f14bf9d8a60/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d342e706e67"><img src="http://p0.qhimg.com/t016811544a55c3bd81.png" alt=""></a></p>
<p>这一页可以是你想要的任何内容：你正在选修的课程的笔记、一本书或者一片文章或论文的大纲，或者是你的书的清单。这取决于你。</p>
<p>Zim 有一些格式化的选项，其中包括：</p>
<ul>
<li>标题</li>
<li>字符格式</li>
<li>圆点和编号清单</li>
<li>核对清单</li>
</ul>
<p>你可以添加图片和附加文件到你的维基页面，甚至可以从文本文件中提取文本。</p>
<h3><a href="#zim-的维基语法"></a>Zim 的维基语法</h3>
<p>你可以使用工具栏向一个页面添加格式。但这不是唯一的方法。如果你像我一样是个老派人士，你可以使用维基标记来进行格式化。</p>
<p><a href="http://zim-wiki.org/manual/Help/Wiki_Syntax.html">Zim 的标记</a> 是基于在 <a href="https://www.dokuwiki.org/wiki:syntax">DokuWiki</a> 中使用的标记。它本质上是有一些小变化的 <a href="http://en.wikipedia.org/wiki/Wikilink">WikiText</a> 。例如，要创建一个子弹列表，输入一个星号（<code>*</code>）。用两个星号包围一个单词或短语来使它加黑。</p>
<h3><a href="#添加链接"></a>添加链接</h3>
<p>如果你在笔记本上有一些页面，很容易将它们联系起来。有两种方法可以做到这一点。</p>
<p>第一种方法是使用 <a href="https://en.wikipedia.org/wiki/Camel_case">驼峰命名法</a> 来命名这些页面。假设我有个叫做 “Course Notes” 的笔记本。我可以通过输入 “AnalysisCourse” 来重命名为我正在学习的数据分析课程。 当我想从笔记本的另一个页面链接到它时，我只需要输入 “AnalysisCourse” 然后按下空格键。即时超链接。</p>
<p>第二种方法是点击工具栏上的 “Insert link” 按钮。 在 “Link to” 中输入你想要链接到的页面的名称，从显示的列表中选择它，然后点击 “Link”。</p>
<p><a href="https://camo.githubusercontent.com/e57123c69b1679617babde96c0eae7f7b5441342/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d352e706e67"><img src="http://p0.qhimg.com/t01136c5f0a042c774a.png" alt=""></a></p>
<p>我只能在同一个笔记本中的页面之间进行链接。每当我试图连接到另一个笔记本中的一个页面时，这个文件（有 .txt 的后缀名）总是在文本编辑器中被打开。</p>
<h3><a href="#输出你的维基页面"></a>输出你的维基页面</h3>
<p>也许有一天你会想在别的地方使用笔记本上的信息 —— 比如，在一份文件或网页上。你可以将笔记本页面导出到以下格式中的任何一种。而不是复制和粘贴（和丢失格式）：</p>
<ul>
<li>HTML</li>
<li>LaTeX</li>
<li>Markdown</li>
<li>ReStructuredText</li>
</ul>
<p>为此，点击你想要导出的维基页面。然后，选择 “File &gt; Export”。决定是要导出整个笔记本还是一个页面，然后点击 “Forward”。</p>
<p><a href="https://camo.githubusercontent.com/64ede9120ca8709e8c8789f26c1467a8716e0077/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d362e706e67"><img src="http://p0.qhimg.com/t016b1dbba2ba28dd0a.png" alt=""></a></p>
<p>选择要用来保存页面或笔记本的文件格式。使用 HTML 和 LaTeX，你可以选择一个模板。 随便看看什么最适合你。 例如，如果你想把你的维基页面变成 HTML 演示幻灯片，你可以在 “Template” 中选择 “SlideShow s5”。 如果你想知道，这会产生由 <a href="https://meyerweb.com/eric/tools/s5/">S5 幻灯片框架</a>驱动的幻灯片。</p>
<p><a href="https://camo.githubusercontent.com/eb45edae04c9b6b1178300f3c349aba67512e451/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d372e706e67"><img src="http://p0.qhimg.com/t0120a68a3247e76e82.png" alt=""></a></p>
<p>点击 “Forward”，如果你在导出一个笔记本，你可以选择将页面作为单个文件或一个文件导出。 你还可以指向要保存导出文件的文件夹。</p>
<p><a href="https://camo.githubusercontent.com/3d65b629ea70f20e88a35947b8fc8f621c33697a/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f7a696d382e706e67"><img src="http://p0.qhimg.com/t0137be5bb03aeb541f.png" alt=""></a></p>
<h3><a href="#zim-能做的就这些吗"></a>Zim 能做的就这些吗？</h3>
<p>远远不止这些，还有一些 <a href="http://zim-wiki.org/manual/Plugins.html">插件</a> 可以扩展它的功能。它甚至包含一个内置的 Web 服务器，可以让你将你的笔记本作为静态的 HTML 文件。这对于在内部网络上分享你的页面和笔记本是非常有用的。</p>
<p>总的来说，Zim 是一个用来管理你的信息的强大而又紧凑的工具。这是我使用过的最好的桌面版维基，而且我一直在使用它。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/2/create-wiki-your-linux-desktop-zim">https://opensource.com/article/18/2/create-wiki-your-linux-desktop-zim</a></p>
<p>作者：<a href="https://opensource.com/users/scottnesbitt">Scott Nesbitt</a> 译者：<a href="https://github.com/Auk7F7">Auk7F7</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Zim 在你的 Linux 桌面上创建一个维基

## 原文链接
[https://www.zcfy.cc/article/create-a-wiki-on-your-linux-desktop-with-zim](https://www.zcfy.cc/article/create-a-wiki-on-your-linux-desktop-with-zim)

