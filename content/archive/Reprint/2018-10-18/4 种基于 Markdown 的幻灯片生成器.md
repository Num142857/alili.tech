---
title: 4 种基于 Markdown 的幻灯片生成器
hidden: true
categories: reprint
slug: 248f9ce2
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h1><a href="#4-种基于-markdown-的幻灯片生成器"></a>4 种基于 Markdown 的幻灯片生成器</h1>
<blockquote>
<p>这些简单的幻灯片创建工具可以无缝地使用 Markdown，可以让你的演示添加魅力。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/3e186eee92e0558d5b8aad81256f661e9d69cb56/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6275735f70726573656e746174696f6e2e706e673f69746f6b3d435165794f363162"><img src="https://p0.ssl.qhimg.com/t018757d27becfffdc5.png" alt=""></a></p>
<p>假设你需要做一个演示presentation。在准备的过程中，你想到“我需要写几张幻灯片”。</p>
<p>你可能倾向于简洁的<a href="https://plaintextproject.online/">纯文本</a>，认为 LibreOffice Writer 这样的软件对你要做的事情而言像是杀鸡用牛刀。或者你只是遵从你内心深处的极客意识。</p>
<p>将 <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a> 格式的文件转换为优雅的演示幻灯片并不困难。下面介绍可以完成这项工作的四种工具。</p>
<h3><a href="#landslide"></a>Landslide</h3>
<p>在这些工具中，<a href="https://github.com/adamzap/landslide">Landslide</a> 具有更高的灵活性。它是一个命令行工具，可以将 Markdown、<a href="https://en.wikipedia.org/wiki/ReStructuredText">reStructuredText</a> 或 <a href="https://en.wikipedia.org/wiki/Textile_(markup_language">Textile</a>) 格式的文件转换为基于 <a href="https://github.com/skaegi/html5slides">Google HTML5 幻灯片模板</a>的 HTML 文件。</p>
<p>你要做的不过是编写 Markdown 格式的幻灯片源文件，打开一个终端窗口并运行 <code>landslide</code> 命令即可，其中命令参数为 Markdown 文件的文件名。Landslide 会生成 <code>presentation.html</code>，可以在任何 Web 浏览器中打开。简单吧？</p>
<p>但不要被简易的操作误导你。Landslide 提供了不少有用的特性，例如增加注记以及为幻灯片增加配置文件。为何要使用这些特性呢？按照 Landslide 开发者的说法，这样可以汇聚不同演示中的源文件目录并重用。</p>
<p><a href="https://camo.githubusercontent.com/8feeeec409af112271cc1aee329a49aaaaf103be/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f6c616e64736c6964652e706e67"><img src="https://p0.ssl.qhimg.com/t0167c4f474a0cce941.png" alt="landslide.png" title="landslide.png"></a></p>
<p><em>在 Landslide 演示中查看演示者注记</em></p>
<h3><a href="#marp"></a>Marp</h3>
<p><a href="https://yhatt.github.io/marp/">Marp</a> 仍处于开发中，但值得期待。它是 “Markdown Presentation Writer” 的简写。Marp 是一个基于 <a href="https://en.wikipedia.org/wiki/Electron_(software_framework">Electron</a>) 的工具，让你在一个简单的双栏编辑器中编写幻灯片：在左栏编写 Markdown，在右栏中预览效果。</p>
<p>Marp 支持 <a href="https://guides.github.com/features/mastering-markdown/">GitHub 风格 Markdown</a>。如果你需要一个使用 GitHub 风格 Markdown 编写幻灯片的快速教程，可以参考 <a href="https://raw.githubusercontent.com/yhatt/marp/master/example.md">示例项目</a>。GitHub 风格 Markdown 比基础 Markdown 更加灵活。</p>
<p>Marp 只自带两个基础主题，但你可以为幻灯片增加背景图片、调整图片大小以及增加数学表达式。不足之处，目前只支持 PDF 格式导出。老实说，我很好奇为何不一开始就提供 HTML 格式导出。</p>
<p><a href="https://camo.githubusercontent.com/3ed680f45ed03799937b0711d436347cae383e88/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f6d6172702e706e67"><img src="https://p0.ssl.qhimg.com/t01a9b31bbc76a6c4d5.png" alt="marp.png" title="marp.png"></a></p>
<p><em>使用 Marp 编辑简单的幻灯片</em></p>
<h3><a href="#pandoc"></a>Pandoc</h3>
<p>你可能已经知道 <a href="https://pandoc.org/">pandoc</a> 是一种支持多种标记语言markup languages相互转换的神奇工具。但你可能不知道，pandoc 可以将 Markdown 格式文件转换为 <a href="https://www.w3.org/Talks/Tools/Slidy2/Overview.html#(1">Slidy</a>)、<a href="http://goessner.net/articles/slideous/">Slideous</a>、<a href="http://paulrouget.com/dzslides/">DZSlides</a> 和 <a href="https://revealjs.com/#/">Reveal.js</a> 等演示框架支持的优雅 HTML 幻灯片。如果你使用 <a href="https://www.latex-project.org/">LaTeX</a>，可以使用 <a href="https://en.wikipedia.org/wiki/Beamer_(LaTeX">Beamer 软件包</a>)输出 PDF 格式的幻灯片。</p>
<p>你需要在幻灯片中<a href="https://pandoc.org/MANUAL.html#producing-slide-shows-with-pandoc">使用特定格式</a>，但可以通过<a href="https://pandoc.org/MANUAL.html#variables-for-slides">变量</a>控制其效果。你也可以更改幻灯片的外观与风格，增加幻灯片之间的暂停，添加演示者注记等。</p>
<p>当然，你需要在你的主机上安装你喜欢的演示框架，因为 Pandoc 只生成原始幻灯片文件。</p>
<p><a href="https://camo.githubusercontent.com/ddfa91f4a58eaaa514bf8fb2ceba4827cf7fb25c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f70616e646f632e706e67"><img src="https://p0.ssl.qhimg.com/t0133486e0fcfee921e.png" alt="pandoc.png" title="pandoc.png"></a></p>
<p><em>查看使用 Pandoc 和 DZSlides 创建的幻灯片</em></p>
<h3><a href="#hacker-slides"></a>Hacker Slides</h3>
<p><a href="https://github.com/jacksingleton/hacker-slides">Hacker Slides</a> 是一个 <a href="https://sandstorm.io/">Sandstorm</a> 和 <a href="https://oasis.sandstorm.io/">Sandstorm Oasis</a> 平台上的应用，基于 Markdown 和 <a href="https://revealjs.com/#/">Reveal.js</a> 幻灯片框架。生成的幻灯片可以比较朴素，也可以很炫。</p>
<p>在浏览器的两栏界面中编写幻灯片，左栏输入 Markdown 文本，右栏渲染效果。当你制作完成后，可以在 Sandstorm 中演示，也可以生成分享链接让其它人演示。</p>
<p>你可能会说，你不使用 Sandstorm 或 Sandstorm Oasis 怎么办？不要担心，Hacker Slides 提供了可以在桌面或服务器上运行的<a href="https://github.com/msoedov/hacker-slides">版本</a>。</p>
<p><a href="https://camo.githubusercontent.com/1e1fe53cca709e5eec6587c60f1237eac63edd0a/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f6861636b65722d736c696465732e706e67"><img src="https://p0.ssl.qhimg.com/t010c20dc5b4b16f648.png" alt="hacker-slides.png" title="hacker-slides.png"></a></p>
<p><em>在 Hacker Slides 中编辑幻灯片</em></p>
<h3><a href="#两点特别补充"></a>两点特别补充</h3>
<p>如果你使用 <a href="http://jupyter.org/">Jupyter 笔记本Notebooks</a> （参考社区版主 Don Watkins 的<a href="https://linux.cn/article-9664-1.html">文章</a>）发布数据或指令文本，你可以使用 <a href="https://github.com/datitran/jupyter2slides">Jupyter2slides</a>。该工具基于 Reveal.js，可以将笔记本转换为一系列精美的 HTML 幻灯片。</p>
<p>如果你倾向于托管应用，试试 <a href="https://gitpitch.com/">GitPitch</a>，支持 GitHub、GitLab 和 Bitbucket。只需在将幻灯片源文件推送到支持的代码仓库中，在 GitPitch 中指向该仓库，这样你就可以在 GitPitch 网站上看到你的幻灯片了。</p>
<p>你有最喜欢的基于 Markdown 的幻灯片生成器吗？留下评论分享吧。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/5/markdown-slide-generators">https://opensource.com/article/18/5/markdown-slide-generators</a></p>
<p>作者：<a href="https://opensource.com/users/scottnesbitt">Scott Nesbitt</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/4-markdown-powered-slide-generators](https://www.zcfy.cc/article/4-markdown-powered-slide-generators)
原文标题: 4 种基于 Markdown 的幻灯片生成器
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
