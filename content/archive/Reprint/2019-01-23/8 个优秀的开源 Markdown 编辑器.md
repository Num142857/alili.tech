---
title: '8 个优秀的开源 Markdown 编辑器' 
date: 2019-01-23 2:30:08
hidden: true
slug: ks3de5pudec
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#8-个优秀的开源-markdown-编辑器"></a>8 个优秀的开源 Markdown 编辑器</h1>
<h3><a href="#markdown"></a>Markdown</h3>
<p>首先，对 Markdown 进行一个简单的介绍。Markdown 是由 John Gruber 和 Aaron Swartz 共同创建的一种轻量级纯文本格式语法。Markdown 可以让用户“以易读、易写的纯文本格式来进行写作，然后可以将其转换为有效格式的 XHTML（或 HTML）“。Markdown 语法只包含一些非常容易记住的符号。其学习曲线平缓；你可以在炒蘑菇的同时一点点学习 Markdown 语法（大约 10 分钟）。通过使用尽可能简单的语法，错误率达到了最小化。除了拥有友好的语法，它还具有直接输出干净、有效的（X）HTML 文件的强大功能。如果你看过我的 HTML 文件，你就会知道这个功能是多么的重要。</p>
<p>Markdown 格式语法的主要目标是实现最大的可读性。用户能够以纯文本的形式发布一份 Markdown 格式的文件。用 Markdown 进行文本写作的一个优点是易于在计算机、智能手机和个人之间共享。几乎所有的内容管理系统都支持 Markdown 。它作为一种网络写作格式流行起来，其产生一些被许多服务采用的变种，比如 GitHub 和 Stack Exchange 。</p>
<p>你可以使用任何文本编辑器来写 Markdown 文件。但我建议使用一个专门为这种语法设计的编辑器。这篇文章中所讨论的软件允许你使用 Markdown 语法来写各种格式的专业文档，包括博客文章、演示文稿、报告、电子邮件以及幻灯片等。另外，所有的应用都是在开源许可证下发布的，在 Linux、OS X 和 Windows 操作系统下均可用。</p>
<h3><a href="#remarkable"></a>Remarkable</h3>
<p><a href="https://camo.githubusercontent.com/eaefb0af0bef327cd6d56dd88d35f6bfebb7f226/68747470733a2f2f69322e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f52656d61726b61626c652e706e673f726573697a653d3830302532433331392673736c3d31"><img src="https://p0.ssl.qhimg.com/t01d2e9939631556e75.png" alt="Remarkable - cross-platform Markdown editor"></a></p>
<p>让我们从 Remarkable 开始。Remarkable 是一个 apt 软件包的名字，它是一个相当有特色的 Markdown 编辑器 — 它并不支持 Markdown 的全部功能特性，但该有的功能特性都有。它使用和 GitHub Markdown 类似的语法。</p>
<p>你可以使用 Remarkable 来写 Markdown 文档，并在实时预览窗口查看更改。你可以把你的文件导出为 PDF 格式（带有目录）和 HTML 格式文件。它有强大的配置选项，从而具有许多样式，因此，你可以把它配置成你最满意的 Markdown 编辑器。</p>
<p>其他一些特性：</p>
<ul>
<li>语法高亮</li>
<li>支持 <a href="https://linux.cn/article-8399-1.html">GitHub 风味的 Markdown</a></li>
<li>支持 MathJax - 通过高级格式呈现丰富文档</li>
<li>键盘快捷键</li>
</ul>
<p>在 Debian、Ubuntu、Fedora、SUSE 和 Arch 系统上均有 Remarkable 的可用的简易安装程序。</p>
<p>主页： <a href="https://remarkableapp.github.io/">https://remarkableapp.github.io/</a> 许可证： MIT 许可</p>
<h3><a href="#atom"></a>Atom</h3>
<p><a href="https://camo.githubusercontent.com/f4fdddffd4fd8d3ab7a4d94f2e55bac79715cba9/68747470733a2f2f69322e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f41746f6d2d4d61726b646f776e2e706e673f726573697a653d3830302532433332382673736c3d31"><img src="https://p0.ssl.qhimg.com/t0160dd3688d44110f2.png" alt="Atom - cross-platform Markdown editor"></a></p>
<p>毫无疑问， Atom 是一个神话般的文本编辑器。超过 50 个开源包集合在一个微小的内核上，从而构成 Atom 。伴有 Node.js 的支持，以及全套功能特性，Atom 是我最喜欢用来写代码的编辑器。Atom 的特性在<a href="https://www.ossblog.org/top-software/2/">杀手级开源应用</a>的文章中有更详细介绍，它是如此的强大。但是作为一个 Markdown 编辑器，Atom 还有许多不足之处，它的默认包不支持 Markdown 的特性。例如，正如上图所展示的，它不支持等价渲染。</p>
<p>但是，开源拥有强大的力量，这是我强烈提倡开源的一个重要原因。Atom 上有许多包以及一些复刻，从而添加了缺失的功能特性。比如，Markdown Preview Plus 提供了 Markdown 文件的实时预览，并伴有数学公式渲染和实时重加载。另外，你也可以尝试一下 <a href="https://atom.io/packages/markdown-preview-enhanced">Markdown Preview Enhanced</a>。如果你需要自动滚动特性，那么 <a href="https://atom.io/packages/markdown-scroll-sync">markdown-scroll-sync</a> 可以满足你的需求。我是 <a href="https://atom.io/packages/markdown-writer">Markdown-Writer</a>和 <a href="https://atom.io/packages/markdown-pdf">Markdown-pdf</a>的忠实拥趸，后者支持将 Markdown 快速转换为 PDF、PNG 以及 JPEG 文件。</p>
<p>这个方式体现了开源的理念：允许用户通过添加扩展来提供所需的特性。这让我想起了 Woolworths 的 n 种杂拌糖果的故事。虽然需要多付出一些努力，但能收获最好的回报。</p>
<p>主页： <a href="https://atom.io/">https://atom.io/</a> 许可证： MIT 许可</p>
<h3><a href="#haroopad"></a>Haroopad</h3>
<p><a href="https://camo.githubusercontent.com/2870854533a6bae5bda544f6b589f20909df29d3/68747470733a2f2f69322e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f4861726f6f7061642d312e706e673f726573697a653d3830302532433333322673736c3d31"><img src="https://p0.ssl.qhimg.com/t0114d94ecfbf61028b.png" alt="Haroopad - - cross-platform Markdown editor"></a></p>
<p>Haroopad 是一个优秀的 Markdown 编辑器，是一个用于创建适宜 Web 的文档的处理器。使用 Haroopad 可以创作各种格式的文档，比如博客文章、幻灯片、演示文稿、报告和电子邮件等。Haroopad 在 Windows、Mac OS X 和 Linux 上均可用。它有 Debian/Ubuntu 的软件包，也有 Windows 和 Mac 的二进制文件。该应用程序使用 node-webkit、CodeMirror，marked，以及 Twitter 的 Bootstrap 。</p>
<p>Haroo 在韩语中的意思是“一天”。</p>
<p>它的功能列表非常可观。请看下面：</p>
<ul>
<li>主题、皮肤和 UI 组件<ul>
<li>超过 30 种不同的编辑主题 - tomorrow-night-bright 和 zenburn 是近期刚添加的</li>
<li>编辑器中的代码块的语法高亮</li>
<li>Ruby、Python、PHP、Javascript、C、HTML 和 CSS 的语法高亮支持</li>
<li>基于 CodeMirror，这是一个在浏览器中使用 JavaScript 实现的通用文本编辑器</li>
</ul>
</li>
<li>实时预览主题<ul>
<li>基于 markdown-css 的 7 个主题</li>
</ul>
</li>
<li>语法高亮<ul>
<li>基于 hightlight.js 的 112 种语言以及 49 种样式</li>
</ul>
</li>
<li>定制主题<ul>
<li>基于 CSS （层叠样式表）的样式</li>
</ul>
</li>
<li>演示模式 - 对于现场演示非常有用</li>
<li>绘图 - 流程图和序列图</li>
<li>任务列表</li>
<li>扩展 Markdown 语法，支持 TOC（目录）、 GitHub 风味 Markdown 以及数学表达式、脚注和任务列表等</li>
<li>字体大小<ul>
<li>使用首选窗口和快捷键来设置编辑器和预览字体大小</li>
</ul>
</li>
<li>嵌入富媒体内容<ul>
<li>视频、音频、3D、文本、开放图形以及 oEmbed</li>
<li>支持大约 100 种主要的网络服务（YouTude、SoundCloud、Flickr 等）</li>
<li>支持拖放</li>
</ul>
</li>
<li>显示模式<ul>
<li>默认：编辑器｜预览器，倒置：预览器｜编辑器，仅编辑器，仅预览器（View -&gt; Mode）</li>
</ul>
</li>
<li>插入当前日期和时间<ul>
<li>多种格式支持（Insert -&gt; Data &amp; Time）</li>
</ul>
</li>
<li>HtML 到 Markdown<ul>
<li>拖放你在 Web 浏览器中选择好的文本</li>
</ul>
</li>
<li>Markdown 解析选项</li>
<li>大纲预览</li>
<li>纯粹主义者的 Vim 键位绑定</li>
<li>Markdown 自动补全</li>
<li>导出为 PDF 和 HTML</li>
<li>带有样式的 HTML 复制到剪切板可用于所见即所得编辑器</li>
<li>自动保存和恢复</li>
<li>文件状态信息</li>
<li>换行符或空格缩进</li>
<li>（一、二、三）列布局视图</li>
<li>Markdown 语法帮助对话框</li>
<li>导入和导出设置</li>
<li>通过 MathJax 支持 LaTex 数学表达式</li>
<li>导出文件为 HTML 和 PDF</li>
<li>创建扩展来构建自己的功能</li>
<li>高效地将文件转换进博客系统：WordPress、Evernote 和 Tumblr 等</li>
<li>全屏模式－尽管该模式不能隐藏顶部菜单栏和顶部工具栏</li>
<li>国际化支持：英文、韩文、西班牙文、简体中文、德文、越南文、俄文、希腊文、葡萄牙文、日文、意大利文、印度尼西亚文土耳其文和法文</li>
</ul>
<p>主页 <a href="http://pad.haroopress.com/">http://pad.haroopress.com/</a> 许可证： GNU GPL v3 许可</p>
<h3><a href="#stackedit"></a>StackEdit</h3>
<p><a href="https://camo.githubusercontent.com/6a308a8e9cb1054cd51dd52ccbd4a09c507422a5/68747470733a2f2f69322e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f537461636b456469742e706e673f726573697a653d3830302532433331312673736c3d31"><img src="https://p0.ssl.qhimg.com/t012670cf97055c3a91.png" alt="StackEdit - a web based Markdown editor"></a></p>
<p>StackEdit 是一个功能齐全的 Markdown 编辑器，基于 PageDown（该 Markdown 库被 Stack Overflow 和其他一些 Stack 交流网站使用）。不同于在这个列表中的其他编辑器，StackEdit 是一个基于 Web 的编辑器。在 Chrome 浏览器上即可使用 StackEdit 。</p>
<p>特性包括：</p>
<ul>
<li>实时预览 HTML，并通过绑定滚动连接特性来将编辑器和预览的滚动条相绑定</li>
<li>支持 Markdown Extra 和 GitHub 风味 Markdown，Prettify/Highlight.js 语法高亮</li>
<li>通过 MathJax 支持 LaTex 数学表达式</li>
<li>所见即所得的控制按键</li>
<li>布局配置</li>
<li>不同风格的主题支持</li>
<li>la carte 扩展</li>
<li>离线编辑</li>
<li>可以与 Google 云端硬盘（多帐户）和 Dropbox 在线同步</li>
<li>一键发布到 Blogger、Dropbox、Gist、GitHub、Google Drive、SSH 服务器、Tumblr 和 WordPress</li>
</ul>
<p>主页： <a href="https://stackedit.io/">https://stackedit.io/</a> 许可证： Apache 许可</p>
<h3><a href="#macdown"></a>MacDown</h3>
<p><a href="https://camo.githubusercontent.com/032db8578219adc9a1fbd9538922fd44eddde761/68747470733a2f2f69302e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f4d6163446f776e2e706e673f726573697a653d3830302532433432322673736c3d31"><img src="https://p0.ssl.qhimg.com/t0102aeb9c2c76ab462.png" alt="MacDown - OS X Markdown editor"></a></p>
<p>MacDown 是在这个列表中唯一一个只运行在 macOS 上的全特性编辑器。具体来说，它需要在 OX S 10.8 或更高的版本上才能使用。它在内部使用 Hoedown 将 Markdown 渲染成 HTML，这使得它的特性更加强大。Heodown 是 Sundown 的一个复活复刻。它完全符合标准，无依赖，具有良好的扩展支持和 UTF-8 感知。</p>
<p>MacDown 基于 Mou，这是专为 Web 开发人员设计的专用解决方案。</p>
<p>它提供了良好的 Markdown 渲染，通过 Prism 提供的语言识别渲染实现代码块级的语法高亮，MathML 和 LaTex 渲染，GTM 任务列表，Jekyll 前端以及可选的高级自动补全。更重要的是，它占用资源很少。想在 OS X 上写 Markdown？MacDown 是我针对 Web 开发者的开源推荐。</p>
<p>主页： <a href="https://macdown.uranusjr.com/">https://macdown.uranusjr.com/</a> 许可证： MIT 许可</p>
<h3><a href="#ghostwriter"></a>ghostwriter</h3>
<p><a href="https://camo.githubusercontent.com/727eccf2d73d57ac34c018e390c9105d3d594a9e/68747470733a2f2f69302e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f67686f73747772697465722e706e673f726573697a653d3830302532433331302673736c3d31"><img src="https://p0.ssl.qhimg.com/t0111640ca12b3781a2.png" alt="ghostwriter - cross-platform Markdown editor"></a></p>
<p>ghostwriter 是一个跨平台的、具有美感的、无干扰的 Markdown 编辑器。它内建了 Sundown 处理器支持，还可以自动检测 pandoc、MultiMarkdown、Discount 和 cmark 处理器。它试图成为一个朴实的编辑器。</p>
<p>ghostwriter 有许多很好的功能设置，包括语法高亮、全屏模式、聚焦模式、主题、通过 Hunspell 进行拼写检查、实时字数统计、实时 HTML 预览、HTML 预览自定义 CSS 样式表、图片拖放支持以及国际化支持。Hemingway 模式按钮可以禁用退格键和删除键。一个新的 “Markdown cheat sheet” HUD 窗口是一个有用的新增功能。主题支持很基本，但在 <a href="https://github.com/jggouvea/ghostwriter-themes">GitHub 仓库上</a>也有一些可用的试验性主题。</p>
<p>ghostwriter 的功能有限。我越来越欣赏这个应用的通用性，部分原因是其简洁的界面能够让写作者完全集中在策划内容上。这一应用非常值得推荐。</p>
<p>ghostwirter 在 Linux 和 Windows 系统上均可用。在 Windows 系统上还有一个便携式的版本可用。</p>
<p>主页： <a href="https://github.com/wereturtle/ghostwriter">https://github.com/wereturtle/ghostwriter</a> 许可证： GNU GPL v3 许可</p>
<h3><a href="#abricotine"></a>Abricotine</h3>
<p><a href="https://camo.githubusercontent.com/8a499682e7a9ccfe252630ce2bb2890faf1332db/68747470733a2f2f69322e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f41627269636f74696e652e706e673f726573697a653d3830302532433331362673736c3d31"><img src="https://p0.ssl.qhimg.com/t0192135713b31261e7.png" alt="Abricotine - cross-platform Markdown editor"></a></p>
<p>Abricotine 是一个为桌面构建的、旨在跨平台且开源的 Markdown 编辑器。它在 Linux、OS X 和 Windows 上均可用。</p>
<p>该应用支持 Markdown 语法以及一些 GitHub 风味的 Markdown 增强（比如表格）。它允许用户直接在文本编辑器中预览文档，而不是在侧窗栏。</p>
<p>该应用有一系列有用的特性，包括拼写检查、以 HTML 格式保存文件或把富文本复制粘贴到邮件客户端。你也可以在侧窗中显示文档目录，展示语法高亮代码、以及助手、锚点和隐藏字符等。它目前正处于早期的开发阶段，因此还有一些很基本的 bug 需要修复，但它值得关注。它有两个主题可用，如果有能力，你也可以添加你自己的主题。</p>
<p>主页： <a href="http://abricotine.brrd.fr/">http://abricotine.brrd.fr/</a> 许可证： GNU 通用公共许可证 v3 或更高许可</p>
<h3><a href="#retext"></a>ReText</h3>
<p><a href="https://camo.githubusercontent.com/59d37bc92190deb2da7acb354fa1de714aac4677/68747470733a2f2f69312e77702e636f6d2f7777772e6f7373626c6f672e6f72672f77702d636f6e74656e742f75706c6f6164732f323031372f30322f5265546578742e706e673f726573697a653d3830302532433237302673736c3d31"><img src="https://p0.ssl.qhimg.com/t01a9fb531dca634230.png" alt="ReText - Linux Markdown editor"></a></p>
<p>ReText 是一个简单而强大的 Markdown 和 reStructureText 文本编辑器。用户可以控制所有输出的格式。它编辑的文件是纯文本文件，但可以导出为 PDF、HTML 和其他格式的文件。ReText 官方仅支持 Linux 系统。</p>
<p>特性包括：</p>
<ul>
<li>全屏模式</li>
<li>实时预览</li>
<li>同步滚动（针对 Markdown）</li>
<li>支持数学公式</li>
<li>拼写检查</li>
<li>分页符</li>
<li>导出为 HTML、ODT 和 PDF 格式</li>
<li>使用其他标记语言</li>
</ul>
<p>主页： <a href="https://github.com/retext-project/retext">https://github.com/retext-project/retext</a> 许可证： GNU GPL v2 或更高许可</p>
<hr>
<p>via: <a href="https://www.ossblog.org/markdown-editors/">https://www.ossblog.org/markdown-editors/</a></p>
<p>作者：<a href="https://www.ossblog.org/author/steve/">Steve Emms</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
8 个优秀的开源 Markdown 编辑器

## 原文链接
[https://www.zcfy.cc/article/write-markdown-with-8-exceptional-open-source-editors](https://www.zcfy.cc/article/write-markdown-with-8-exceptional-open-source-editors)

