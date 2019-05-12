---
title: 'Hugo 对比 Jekyll ：两大领先的静态页面生成器之间的比较' 
date: 2019-01-22 2:30:08
hidden: true
slug: 75x501zuqhj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#hugo-对比-jekyll-两大领先的静态页面生成器之间的比较"></a>Hugo 对比 Jekyll ：两大领先的静态页面生成器之间的比较</h1>
<blockquote>
<p>如果你正在建一个新的网站，静态页面生成器或许是个正确的选择。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/6c63c54a4634dd750e494102ec3d5aed39c31d3c/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f72685f3030333738345f30325f6f732e636f6d636172656572735f6f735f726832782e706e673f69746f6b3d3477586a594d4277"><img src="" alt="Hugo vs. Jekyll: Comparing the leading static website generators" title="Hugo vs. Jekyll: Comparing the leading static website generators"></a></p>
<p>除非你是像艾米莉·狄金森那样深居简出的人，否则，当做了点事情后，你就会想要与这个世界分享。分享你的作品意味着需要一个网站。当然，你可以只是享受数字时代的便利，使用任何不同的社交网站来将你的作品呈现在观众面前。还有很多选择，不仅仅是传统的社交网站，例如 Artstation、Flickr、Soundcloud、Wattpad，不管你的媒介是什么，总有一款属于你的网站。</p>
<p>实际上，你_应该_使用这些网站，毕竟，人们都在这些网站上。然而，没有一个地方是真正属于你的。没有一个网站是你能保证不管社交趋势如何，人们都能在该网站上找到你的作品的。</p>
<p>控制权，这是拥有一个在网上属于自己的地方的意义。</p>
<p>但是这篇文章不打算介绍注册域名和托管你的网站。要介绍的是_后续_的步骤，真正地制作网页。对于很多人来说，典型的选择是使用像 <a href="http://wordpress.org/">WordPress</a> 那一类的软件。在大多数主机托管商上，只需一次点击即可安装，然后就会有海量的插件和主题可供选择。插件和主题的选择取决于你想要制作的网页的类型。但是 WordPress 不仅对于大部分网站来说有点过犹不及，还给了你一个有许多活动部件的动态页面。如果你没有保持这些部件最新，这些部件可能造成重大安全隐患，你的页面因此被劫持。</p>
<p>替代方法是拥有一个静态网页，在服务端没有任何动态内容生成。只有一些原先的 HTML 和 CSS （或许还有点 Javascript 也挺好）。这种选择的不好的一面是以后你要亲自动手编写所有的代码。虽然可行，但你只是想要个地方来展示你的作品而已，你并不想知道底层网页设计的特性（和重要的但却令人头疼的跨浏览器兼容性）。</p>
<p>使用静态页面生成器。你得到了静态 HTML 页面的速度与安全，但是是以有着接近于动态页面的便利性的工作流程完成的。在静态页面生成器世界的两大先驱是 <a href="http://gohugo.io/">Hugo</a> 和 <a href="https://jekyllrb.com/">Jekyll</a> ，（顺道说下，Paolo Bonzini 的文章 《<a href="https://opensource.com/article/17/4/getting-started-jekyll">Jekyll 起步</a>》 写得不错）但是哪一个才是你的正确选择？希望阅读完这篇文章，你会更加了解。我们将基于易上手性、主题可用性、编辑方式和拓展性这几点评估这两个静态页面生成器。</p>
<h3><a href="#开始"></a>开始</h3>
<p>公平地提醒一下，这两个都需要你在命令行下使用他们。大部分命令都很直接和易于记忆，但是让我们相应地调整下我们的期望吧，这不是点击几下鼠标就能做事的界面。</p>
<p>Jekyll 和 Hugo 的安装都相当的简单。 Jekyll 以 RubyGem 的方式安装，Hugo 提供了一个方便的集成的二进制文件让你迅速上手。因为安装包单一，Hugo 以微弱优势领先。虽然 Jekyll 的 RubyGems 安装方式本身就很简单，但是它_确实_需要你已经在你的电脑上正确安装并且配置好 Ruby 环境。除了社区设计者和网页开发者，大部分的使用者并没有提前安装好。</p>
<p>虽说是这样，但是一旦安装好，Hugo 和 Jekyll 都很好用。它们都有良好的文档和快速开始指南。你用一个简单命令新建一个页面（在 Jekyll 里是 <code>jekyll new &lt;your_site&gt;</code> ，在 Hugo 里是 <code>hugo new site &lt;your_site&gt;</code>，译者注：<code>&lt;your_site&gt;</code> 指代你网页的名称）。这一步新建了一个通用目录结构和你网站的大致内容。目录结构和基本的配置都十分相似。Jekyll 使用一个 <code>_config.yml</code> 文件，Hugo 使用 <code>config.toml</code>（虽然你_能_在 Hugo 的配置里使用 YMAL 或者 JSON 语法，如果觉得其中一个使用起来更舒服的话）。每个内容文件的前置配置（front matter）元数据使用相同的配置语法。然后，所有的内容都是用 Markdown 写的。</p>
<p>我想说就帮助你开始第一个静态网页这一点来说，Jekyll 稍微领先于 Hugo ，因为它能以一些基本的内容和一个默认主题开始着手使用。当在建设网页时，你能使用这些内容作为一个样板。Hugo 没有样例内容，甚至没有一个默认主题。即便如此，样例内容和默认主题是我在用任何工具建设网站时第一个删除的内容，因此 Hugo 事实上帮我节省了这一步。</p>
<h3><a href="#主题"></a>主题</h3>
<p>正如我所提到的，Hugo 根本没有默认主题，所以主题可能是你打算最先设置的。Jekyll 有一个得体的默认主题，虽然它只是个骨架。你或许也会想去为你的 Jekyll 页面找一个主题。</p>
<p>Hugo 和 Jekyll 都有多种多样的各类主题，网页样式从单页面的主题到带有博客和评论的完善的多页面主题都有，一应俱全。尽管如此，想找到满足你需求的主题事实上并不简单。无论使用哪个，主题网站——Hugo 的 <a href="https://themes.gohugo.io/">themes.gohugo.io</a> 和 Jekyll 的 <a href="http://jekyllthemes.org/">jekyllthemes.org</a> ，基本上都是一个充满主题截图的巨大页面。一旦你点击主题，你能得到关于该主题的一些十分详细的信息，但是对于初步搜索相当困难。Hugo 的主题站有一些基本的标签分类，但是大体上在我看来，主题搜索和展示都是这两个项目需要继续努力的。</p>
<p>主题管理也是一个有趣的主题。在两个项目中，几乎每一个主题都是一个 Git 仓库（经常是托管在 Github 上），你需要克隆（clone）下来到你的网页建设地。在 Jekyll 里，有额外的使用 RubyGems 的 bundle 的步骤来确保主题是由网站管理的。大部分主题都有一个 Gemfile，使得这一步骤轻松不少。如果主题没有一个 Gemfile，添加也相当简单。在 Hugo 里没有捆绑这一操作，只要在 <code>config.toml</code> 指向你的主题即可。</p>
<p>我发现我偏爱 Hugo 的主题处理。你可以克隆（clone）（或者新建）主题到 <code>themes</code> 里它们自己的子文件夹里。这不仅使得当你开始时能轻松地切换主题，而且也能让你用自己的文件替换主题里的任何组件。这意味着你能根据自己的品味自定义主题，而不用弄乱原始主题，使得这主题也可以通用于其他人。当然如果有一个你觉得其他用户会觉得值得的改变，你仍然可以编辑源文件，提交一个 PR（拉取请求，pull request）给主题维护者。</p>
<h3><a href="#工作流程"></a>工作流程</h3>
<p>一旦你设置好初始的配置，Jekyll 和 Hugo 的网站建设流程都很相似。两者都有一个实时的 <code>serve</code> 命令，能在你的电脑上运行一个小型、轻量级的网页服务器，所以你能在在本地测试你的网站而不用上传到哪里。很棒的是无论你是运行着 <code>jekyll serve</code> 还是 <code>hugo serve</code>，都默认配置为当你为之开发时，监视你对网站的任何修改。当你在浏览器里看本地版的网站时，它会根据你的修改自动更新，不管你改的是内容、配置、主题、还仅仅是一张图片。这确实很方便和节约时间。</p>
<p>在两个系统中都是用 <a href="https://daringfireball.net/projects/markdown/">Markdown</a> 写你的网站内容。如果碰巧你不熟悉 Markdown，（我来解释下，）它是种很简单的纯文本编写方式，还能有一些很好用的格式化符号。它很容易使用而且可阅读。而且因为是纯文本，你的内容（其实是你的网站）很容易进行版本控制。这是我最近写几乎所有东西的主要方式。</p>
<p>新内容能通过在正确的地方手动创建文件添加到网站里。新的文件只需要是有恰当的前置配置（front matter）元数据的 Markdown 文件即可。至于配置文件，Jekyll 对于前置配置使用 YAML 语法，Hugo 接受 TOML、YAML 或者 JSON（默认是 TOML）。新文件需要放置在正确的文件夹内，在 Jekyll 里你需要把你编写中的文件和已经完成了的内容页分别放在 <code>_drafts</code> 和 <code>_posts</code> 目录中。在 Hugo 中只有单独一个 <code>content</code> 目录。你可以根据文件的前置配置判断这是否是一个草稿。</p>
<p>现在，虽然可以手动完成所有这些事情，但是 Hugo 提供了一些方便的功能确保你的新文件创建在正确的文件里，那些文件也用恰当的前置配置预先配置好了。简单地在终端中进入你网站的目录，输入 <code>hugo new content/&lt;page.md&gt;</code> ， <code>&lt;page.md&gt;</code> 代表着你想新建的新页面。你甚至可以设置些包含为不同页面自定义的前置配置、叫<strong>原型</strong>的模版（例如在你的网页上同时有博客和播客）。</p>
<p>当你的网页弄好后，你能关闭你的预览服务器，并用一个命令来建立你网站的真正页面。在 Jekyll 里是 <code>jekyll build</code>，Hugo 就仅仅是 <code>hugo</code>，Jekyll 把完成好的页面放在 <code>_site</code> 的子目录中。然而 Hugo 把这些文件放在名为 <code>public</code> 的子目录中。不管哪种情况，一旦你完成后，你就有了一个完整的静态网站，你能上传并把它托管在几乎任何地方。</p>
<h3><a href="#可拓展性"></a>可拓展性</h3>
<p>Hugo 和 Jekyll 都能让你自定义你自己的网站上哪怕最小的一个点。然而就可拓展性而言，现在 Jekyll 因其插件 API 而远远领先。因为这种插件结构，很容易为你用 Jekyll 生成的网站添加功能，通过 Jekyll 社区或者你自己写的相当短的代码片段就能完成。</p>
<p>Hugo 现在根本没有插件 API，所以添加功能有点难。希望以后支持编写并包含插件。但是现在看不出有人在做这一点。</p>
<h3><a href="#结论"></a>结论</h3>
<p>大体上讲，Hugo 和 Jekyll 十分相似。归根结底由你工作体验和你的网站需求决定。如果你已经设置好了 RubyGems 环境而且你需要插件的可拓展性，Jekyll 是你的选择。然而，如果你看重一个简单的工作流程，一个直接自定义网站的方式，那你首选 Hugo。</p>
<p>我发现我更喜欢 Hugo 的方法，而且在建设一个小型网站，我不需要任何插件。当然，每个人的需求都不同。你会为你的网站选择哪一个静态页面生成器？</p>
<p>（题图：opensource.com）</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/5/hugo-vs-jekyll">https://opensource.com/article/17/5/hugo-vs-jekyll</a></p>
<p>作者：<a href="https://opensource.com/users/jason-van-gumster">Jason van Gumster</a> 译者：<a href="https://ypingcn.github.io/wiki/lctt">ypingcn</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Hugo 对比 Jekyll ：两大领先的静态页面生成器之间的比较

## 原文链接
[https://www.zcfy.cc/article/hugo-vs-jekyll-comparing-the-leading-static-website-generators](https://www.zcfy.cc/article/hugo-vs-jekyll-comparing-the-leading-static-website-generators)

