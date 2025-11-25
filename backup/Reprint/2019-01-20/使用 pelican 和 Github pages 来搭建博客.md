---
title: '使用 pelican 和 Github pages 来搭建博客' 
date: 2019-01-20 2:30:11
hidden: true
slug: uvrsodmd8k
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-pelican-和-github-pages-来搭建博客"></a>使用 pelican 和 Github pages 来搭建博客</h1>
<p>今天我将谈一下<a href="https://rsip22.github.io">我这个博客</a>是如何搭建的。在我们开始之前，我希望你熟悉使用 Github 并且可以搭建一个 Python 虚拟环境来进行开发。如果你不能做到这些，我推荐你去学习一下 <a href="https://tutorial.djangogirls.org">Django Girls 教程</a>，它包含以上和更多的内容。</p>
<p>这是一篇帮助你发布由 Github 托管的个人博客的教程。为此，你需要一个正常的 Github 用户账户 (而不是一个工程账户)。</p>
<p>你要做的第一件事是创建一个放置代码的 Github 仓库。如果你想要你的博客仅仅指向你的用户名 (比如 rsip22.github.io) 而不是一个子文件夹 (比如 rsip22.github.io/blog)，你必须创建一个带有全名的仓库。</p>
<p><a href="https://camo.githubusercontent.com/803b081c16d9b0bf228810b2fb236fda2dfd5720/68747470733a2f2f7273697032322e6769746875622e696f2f626c6f672f696d672f6372656174655f6769746875625f7265706f7369746f72792e706e67"><img src="http://p0.qhimg.com/t016bb9bb44dfa46dae.png" alt=""></a></p>
<p><em>Github 截图，打开了创建新仓库的菜单，正在以 'rsip22.github.io' 名字创建一个新的仓库</em></p>
<p>我推荐你使用 <code>README</code>、用于 Python 的 <code>.gitignore</code> 和 <a href="https://www.gnu.org/licenses/license-list.html">一个自由软件许可证</a> 初始化你的仓库。如果你使用自由软件许可证，你仍然拥有这些代码，但是你使得其他人能从中受益，允许他们学习和复用它，并且更重要的是允许他们享有这些代码。</p>
<p>既然仓库已经创建好了，那我们就克隆到本机中将用来保存代码的文件夹下：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

</code></pre><p>并且切换到新的目录：</p>
<pre><code class="hljs shell"><span class="hljs-meta"> $</span><span class="bash"> <span class="hljs-built_in">cd</span> YOUR_USERNAME.github.io</span>

</code></pre><p>因为 Github Pages 偏好运行的方式是从 master 分支提供文件，你必须将你的源代码放到新的分支，防止 Pelican 产生的静态文件输出到 master 分支。为此，你必须创建一个名为 source 的分支。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git checkout -b <span class="hljs-built_in">source</span></span>

</code></pre><p>用你的系统所安装的 Pyhton 3 创建该虚拟环境（virtualenv）。</p>
<p>在 GNU/Linux 系统中，命令可能如下:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> python3 -m venv venv</span>

</code></pre><p>或者像这样：</p>
<pre><code class="hljs routeros">$ virtualenv <span class="hljs-attribute">--python</span>=python3.5 venv

</code></pre><p>并且激活它:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">source</span> venv/bin/activate</span>

</code></pre><p>在虚拟环境里，你需要安装 pelican 和它的依赖包。你也应该安装 ghp-import （来帮助我们发布到 Github 上）和 Markdown （为了使用 markdown 语法来写文章）。运行如下命令：</p>
<pre><code class="hljs armasm">(venv)$ pip install pelican <span class="hljs-keyword">markdown </span>ghp-<span class="hljs-meta">import</span>

</code></pre><p>一旦完成，你就可以使用 <code>pelican-quickstart</code> 开始创建你的博客了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">(venv)$</span><span class="bash"> pelican-quickstart</span>

</code></pre><p>这将会提示我们一系列的问题。在回答它们之前，请看一下如下我的答案：</p>
<pre><code class="hljs shell"><span class="hljs-meta">&gt;</span><span class="bash"> Where <span class="hljs-keyword">do</span> you want to create your new web site? [.] ./</span>
<span class="hljs-meta">&gt;</span><span class="bash"> What will be the title of this web site? Renata<span class="hljs-string">'s blog</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Who will be the author of this web site? Renata</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> What will be the default language of this web site? [pt] en</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to specify a URL prefix? e.g., http://example.com (Y/n) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to enable article pagination? (Y/n) y</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> How many articles per page do you want? [10] 10</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> What is your time zone? [Europe/Paris] America/Sao_Paulo</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to generate a Fabfile/Makefile to automate generation and publishing? (Y/n) Y **# PAY ATTENTION TO THIS!**</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want an auto-reload &amp; simpleHTTP script to assist with theme and site development? (Y/n) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using FTP? (y/N) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using SSH? (y/N) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using Dropbox? (y/N) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using S3? (y/N) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using Rackspace Cloud Files? (y/N) n</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Do you want to upload your website using GitHub Pages? (y/N) y</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"><span class="hljs-string"> Is this your personal page (username.github.io)? (y/N) y</span></span>
 Done. Your new project is available at /home/username/YOUR_USERNAME.github.io

</code></pre><p>关于时区，应该指定为 TZ 时区（这里是全部列表： <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">tz 数据库时区列表</a>）。</p>
<p>现在，继续往下走并开始创建你的第一篇博文！你可能想在你喜爱的代码编辑器里打开工程目录并且找到里面的 <code>content</code> 文件夹。然后创建一个新文件，它可以被命名为 <code>my-first-post.md</code> （别担心，这只是为了测试，以后你可以改变它）。在文章内容之前，应该以元数据开始，这些元数据标识标题、日期、目录及更多，像下面这样:</p>
<pre><code class="hljs applescript">.lang=<span class="hljs-string">"markdown"</span> <span class="hljs-comment"># DON'T COPY this line, it exists just for highlighting purposes</span>

Title: My <span class="hljs-keyword">first</span> post
Date: <span class="hljs-number">2017</span><span class="hljs-number">-11</span><span class="hljs-number">-26</span> <span class="hljs-number">10</span>:<span class="hljs-number">01</span>
Modified: <span class="hljs-number">2017</span><span class="hljs-number">-11</span><span class="hljs-number">-27</span> <span class="hljs-number">12</span>:<span class="hljs-number">30</span>
Category: misc
Tags: <span class="hljs-keyword">first</span>, misc
Slug: My-<span class="hljs-keyword">first</span>-post
Authors: Your <span class="hljs-built_in">name</span>
Summary: What <span class="hljs-keyword">does</span> your post talk <span class="hljs-keyword">about</span>? Write here.

This <span class="hljs-keyword">is</span> <span class="hljs-keyword">the</span> *<span class="hljs-keyword">first</span> post* <span class="hljs-keyword">from</span> <span class="hljs-keyword">my</span> Pelican blog. **YAY!**

</code></pre><p>让我们看看它长什么样?</p>
<p>进入终端，产生静态文件并且启动服务器。要这么做，使用下面命令：</p>
<pre><code class="hljs gauss">(venv)$ <span class="hljs-built_in">make</span> html &amp;&amp; <span class="hljs-built_in">make</span> serve

</code></pre><p>当这条命令正在运行，你应该可以在你喜爱的 web 浏览器地址栏中键入 <code>localhost:8000</code> 来访问它。</p>
<p><a href="https://camo.githubusercontent.com/a1433d2ba1e1ee90ee6c71ea4a943e6e757c4c77/68747470733a2f2f7273697032322e6769746875622e696f2f626c6f672f696d672f626c6f675f73637265656e73686f742e706e67"><img src="http://p0.qhimg.com/t0117c5dbed648e5d97.png" alt=""></a></p>
<p><em>博客主页的截图。它有一个带有 Renata's blog 标题的头部，第一篇博文在左边，文章的信息在右边，链接和社交在底部</em></p>
<p>相当简洁，对吧?</p>
<p>现在，如果你想在文章中放一张图片，该怎么做呢？好，首先你在放置文章的内容目录里创建一个目录。为了引用简单，我们将这个目录命名为 <code>image</code>。现在你必须让 Pelican 使用它。找到 <code>pelicanconf.py</code> 文件，这个文件是你配置系统的地方，并且添加一个包含你的图片目录的变量：</p>
<pre><code class="hljs makefile">.lang=<span class="hljs-string">"python"</span> <span class="hljs-comment"># DON'T COPY this line, it exists just for highlighting purposes</span>

STATIC_PATHS = ['images']

</code></pre><p>保存它。打开文章并且以如下方式添加图片：</p>
<pre><code class="hljs markdown">.lang="markdown" # DON'T COPY this line, it exists just for highlighting purposes

![<span class="hljs-string">Write here a good description for people who can't see the image</span>](<span class="hljs-link">{filename}/images/IMAGE_NAME.jpg</span>)

</code></pre><p>你可以在终端中随时按下 <code>CTRL+C</code> 来中断服务器。但是你应该再次启动它并检查图片是否正确。你能记住怎么样做吗？</p>
<pre><code class="hljs gauss">(venv)$ <span class="hljs-built_in">make</span> html &amp;&amp; <span class="hljs-built_in">make</span> serve

</code></pre><p>在你代码完工之前的最后一步：你应该确保任何人都可以使用 ATOM 或 RSS 流来读你的文章。找到 <code>pelicanconf.py</code> 文件，这个文件是你配置系统的地方，并且编辑关于 RSS 流产生的部分:</p>
<pre><code class="hljs makefile">.lang=<span class="hljs-string">"python"</span> <span class="hljs-comment"># DON'T COPY this line, it exists just for highlighting purposes</span>

FEED_ALL_ATOM = 'feeds/all.atom.xml'
FEED_ALL_RSS = 'feeds/all.rss.xml'
AUTHOR_FEED_RSS = 'feeds/%s.rss.xml'
RSS_FEED_SUMMARY_ONLY = False

</code></pre><p>保存所有，这样你才可以将代码上传到 Github 上。你可以通过添加所有文件，使用一个信息（“first commit”）来提交它，并且使用 <code>git push</code>。你将会被问起你的 Github 登录名和密码。</p>
<pre><code class="hljs dockerfile">$ git <span class="hljs-keyword">add</span><span class="bash"> -A &amp;&amp; git commit -a -m <span class="hljs-string">'first commit'</span> &amp;&amp; git push --all
</span>
</code></pre><p>还有...记住在最开始的时候，我给你说的怎样防止 Pelican 产生的静态文件输出 master 分支吗。现在对你来说是时候产生它们了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> make github</span>

</code></pre><p>你将会被再次问及 Github 登录名和密码。好了！你的新博客应该创建在 <code>https://YOUR_USERNAME.github.io</code>。</p>
<p>如果你在过程中任何一步遇到一个错误，请重新读一下这篇手册，尝试并看看你是否能发现错误发生的部分，因为这是调试的第一步。有时甚至一些简单的东西比如一个错字或者 Python 中错误的缩进都可以给我们带来麻烦。说出来并向网上或你的社区求助。</p>
<p>对于如何使用 Markdown 来写文章，你可以读一下 <a href="https://daringfireball.net/projects/markdown/syntax">Daring Fireball Markdown 指南</a>。</p>
<p>为了获取其它主题，我建议你访问 <a href="http://www.pelicanthemes.com/">Pelican 主题</a>。</p>
<p>这篇文章改编自 <a href="https://a-slide.github.io/blog/github-pelican">Adrien Leger 的使用一个 Bottstrap3 主题来搭建由 Github 托管的 Pelican 博客</a>。</p>
<hr>
<p>via: <a href="https://rsip22.github.io/blog/create-a-blog-with-pelican-and-github-pages.html">https://rsip22.github.io/blog/create-a-blog-with-pelican-and-github-pages.html</a></p>
<p>作者：<a href="https://rsip22.github.io">rsip22</a> 译者：<a href="https://github.com/liuxinyu123">liuxinyu123</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 pelican 和 Github pages 来搭建博客

## 原文链接
[https://www.zcfy.cc/article/creating-a-blog-with-pelican-and-github-pages](https://www.zcfy.cc/article/creating-a-blog-with-pelican-and-github-pages)

