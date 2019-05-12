---
title: '使用 Hexo 创建项目文档网站' 
date: 2019-01-10 2:30:08
hidden: true
slug: 7ri877uye8o
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们发布一个开源项目的时候，最重要的事情之一就是要创建项目文档。对使用项目的用户来说，文档是非常有必要的，通常我们可以使用下面这些方式来创建文档：</p>
<ul>
<li><p><a href="https://help.github.com/articles/about-github-wikis/" rel="nofollow noreferrer" target="_blank">GitHub Wiki</a>：在 Github 上我们可以为每个项目都创建一个 wiki。Wiki 是由一系列的 Markdown 文件组成，所以我们可以用 wiki 来做项目文档。但这种方案也有一些缺点：wiki 的贡献者不会出现在项目贡献者列表中；文档的结构和布局都是有限制的，只能是 Github Wikis 的样式；文档存储在第三方平台上。</p></li>
<li><p>README：我们可以为项目创建一个 README.md 文件，它会直接展示在 Github（或 Gitlab、Coding 等 git 仓库）的项目页面。如果文档非常少，这中方案是非常适合的。但如果文档非常多，这个 README.md 文件就会非常大了。而且通常来说，README.md 是用来介绍项目，而不是展示文档。</p></li>
<li><p>自建网站：当然，我们也可以创建一个文档网站，然后放在自己的服务器上。这样我们就可以随意编辑文档。但这种方案的缺点是不便于追踪文档的变化、开发网站和文档维护相比前两种方案麻烦非常多、而且还需要自建主机。</p></li>
<li><p><a href="https://pages.github.com/" rel="nofollow noreferrer" target="_blank">Github Pages</a>：Github 也提供了一个托管项目中静态文件的功能。我们可以为项目创建一个 <code>gh-pages</code> 分支，Github 就会将分支中的内容当做静态站点。这种方案好的一方面是文档维护是在一个单独的分支，虽然可能寻找起来比较麻烦。不好的一方面是文档编写是编写成静态文件（html/css/js），修改和维护起来比较麻烦。</p></li>
</ul>
<p>以上方案都不完美，所以需要一种综合以上所有优点的方案，简单来说就是：</p>
<ul>
<li><p>文档以 MarkDown 文件编写</p></li>
<li><p>使用 hexo 将 MarkDown 文件生成成静态文件</p></li>
<li><p>将静态文件发布到 github pages</p></li>
</ul>
<h2 id="articleHeader0">Hexo 简介</h2>
<p><a href="https://hexo.io" rel="nofollow noreferrer" target="_blank">Hexo</a> 是一个 Node.js 编写的静态网站生成器。Hexo 主要用来做博客框架，同时 Hexo 也整合了将静态网站部署到 Github 的功能，所以也很适合用来做 Github 项目的文档。</p>
<p>我们可以使用 Hexo，根据写好的 HTML 布局（既 Hexo 的主题），将 MarkDown 文件生成成主题对应的静态 html/css/js 文件。Hexo 提供了将静态文件部署到 Github 分支上的配置。也就是说，我们可以使用 MarkDown 来维护文档，当写好部署配置之后，使用一个命令就可以将文档生成并发布到 Github 的 gh-pages 分支上。</p>
<h2 id="articleHeader1">安装 Hexo</h2>
<p>Hexo 是通过 Node.js 编译的，所以需要安装 Node.js。Hexo 使用 Git 将文件部署到 Github，所以也需要安装 Git。</p>
<h3 id="articleHeader2">安装 Node.js</h3>
<p>推荐使用 Node.js 的版本管理器来安装，比如 <a href="http://nvm.sh/" rel="nofollow noreferrer" target="_blank">nvm</a>。当然，也有很多其他的 Node.js 版本管理工具，使用这些工具，我们能很方便地安装 Node.js，以及在不同的 Node.js 的版本中切换。</p>
<p>目前 Node.js 最新的版本是 8.1.3，使用 nvm 来安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ nvm install v8.1.3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="sh" style="word-break: break-word; white-space: initial;">$ nvm install v8<span class="hljs-number">.1</span><span class="hljs-number">.3</span></code></pre>
<p>安装完 Node.js 的同时也会安装对应的 <a href="https://github.com/npm/npm" rel="nofollow noreferrer" target="_blank">npm</a>。</p>
<h3 id="articleHeader3">安装 Git</h3>
<p>我们还需要在系统上安装 Git。如果不确定系统中是否已经安装了 Git，使用下面的命令检查：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="sh" style="word-break: break-word; white-space: initial;">$ git <span class="hljs-comment">--version</span></code></pre>
<p>如果出现了 Git 的版本号，则不需要再安装了。如果没有，则需要安装 Git。</p>
<h4>Windows</h4>
<p>Windows 系统直接点此连接 <a href="https://git-scm.com/download/win" rel="nofollow noreferrer" target="_blank">https://git-scm.com/download/win</a> 下载 Git 软件，然后运行即可。</p>
<h4>macOS</h4>
<p>在 macOS 上安装 Git 有多种不同的方式：</p>
<ul>
<li><p><a href="https://sourceforge.net/projects/git-osx-installer/" rel="nofollow noreferrer" target="_blank">Git installer</a></p></li>
<li><p><a href="http://brew.sh/" rel="nofollow noreferrer" target="_blank">Homebrew</a>：运行 <code>brew install git</code></p></li>
<li><p><a href="https://www.macports.org/" rel="nofollow noreferrer" target="_blank">MacPorts</a>：运行 <code>sudo port install git +doc +bash_completion +gitweb</code></p></li>
</ul>
<p>我个人推荐使用 Homebrew 来安装软件。当然如果你更喜欢 MacPorts，也没有任何问题。</p>
<h4>Linux – Ubuntu or Debian</h4>
<p>在 Ubuntu 或 Debian 上，我们可以使用 apt 来安装软件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo apt-get install git-core" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="sh" style="word-break: break-word; white-space: initial;">$ sudo apt-<span class="hljs-keyword">get</span> install git-core</code></pre>
<h4>Linux – Fedora, Red Hat or CentOS</h4>
<p>在 Fedora、Red Hat 或 CentOS 上，我们可以使用 yum 来安装软件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo yum install git-core" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="sh" style="word-break: break-word; white-space: initial;">$ sudo yum <span class="hljs-keyword">install</span> git-core</code></pre>
<h3 id="articleHeader4">安装 Hexo CLI</h3>
<p>在安装完 Node.js 和 Git 之后，我们最后需要安装 Hexo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g hexo-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="sh" style="word-break: break-word; white-space: initial;">$ npm install -g hexo-<span class="hljs-keyword">cli</span></code></pre>
<p>通过下面的命令来检查 hexo 是否正确安装上了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="sh" style="word-break: break-word; white-space: initial;">$ hexo <span class="hljs-comment">--version</span></code></pre>
<p>如果输出了一系列的版本号，说明所有安装工作都以完成，可以正式使用 hexo 了。</p>
<h2 id="articleHeader5">配置</h2>
<p>安装好 hexo 之后，现在我们就可以在 Github 的主分支上来创建我们的文档了。根据该文章，你可以：</p>
<ul>
<li><p>在一个已存在的项目中创建文档</p></li>
<li><p>创建一个新的项目 <a href="https://github.com/new" rel="nofollow noreferrer" target="_blank">Create a new repository</a></p></li>
</ul>
<p>简单起见，假设你是新创建了一个名为 <code>hexo-documentation</code> 的项目，当然你也可以用一个已经存在的项目继续下面的操作。</p>
<p>接下来使用下面的名令在本地 clone 项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/USERNAME/REPOSITORY.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="sh" style="word-break: break-word; white-space: initial;">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/USERNAME/REPOSITORY.git</code></pre>
<p>将 <code>USERNAME</code> 替换为你的用户名，<code>REPOSITORY</code> 替换为你的项目名称。例如我执行的命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/nodejh/hexo-documentation" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="sh" style="word-break: break-word; white-space: initial;">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/nodejh/hexo-documentation</code></pre>
<p>然后使用 <code>cd</code> 进入项目目录，并创建一个名为 <code>docs</code> 的目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd hexo-documentation
$ mkdir docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code class="sh">$ <span class="hljs-built_in">cd</span> hexo-documentation
$ <span class="hljs-built_in">mkdir</span> docs</code></pre>
<p>docs 目录将存放我们的文档。使用 hexo 初始化 docs 目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo init docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="sh" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>hexo init docs</code></pre>
<p>上面的命令将生成 hexo 的一些配置并安装相关依赖。安装完成之后，docs 的目录结构如下：</p>
<ul>
<li><p><code>_config.yml</code> 站点配置文件</p></li>
<li><p><code>package.json</code> Node.js 的依赖文化</p></li>
<li><p><code>scaffolds</code> hexo 发布文章的时候使用（本文暂不介绍 hexo 的特性）</p></li>
<li><p><code>source</code> MarkDown 和各种资源文件</p></li>
<li><p><code>themes</code> hexo 的主题</p></li>
</ul>
<p>我们可以通过下面的命令来检查网站是否能够正常运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo generate
$ hexo server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="sh">$ hexo <span class="hljs-keyword">generate</span>
$ hexo server</code></pre>
<p>第一个命令将根据选用的主题，将 sources 目录中的文件转换成静态网站文件。第二个命令将启动一个 Web 服务器，提供这些静态网站文件，我们可以通过 <code>http://localhost:4000</code> 来访问：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010065951?w=1440&amp;h=900" src="https://static.alili.tech/img/remote/1460000010065951?w=1440&amp;h=900" alt="Project-Documentation-with-Hexo-Static-Site-Generator-01" title="Project-Documentation-with-Hexo-Static-Site-Generator-01" style="cursor: pointer;"></span></p>
<p>目前我们的网站看起来还是一个博客而不是文档，不过我们将要将其改成文档的样子。</p>
<h2 id="articleHeader6">创建一个主题</h2>
<p>要改变网站的外观，我们需要创建一个 hexo 的主题。主题确定了 hexo 生成的网站的样式和布局。<a href="https://hexo.io/themes/" rel="nofollow noreferrer" target="_blank">https://hexo.io/themes/</a> 这个网站有很多免费的 hexo 主题可以使用。但在这篇文章里，我们要从零开始创建一个 hexo 主题。</p>
<p>Hexo 有一个名为 landscape 的默认主题，在 <code>docs/themes</code> 这个目录里面。你可以在 <code>themes</code> 目录存放多个主题，但每次只能有一个主题被使用。接下来让我们创建自己的主题。在 themes 目录下创建一个名为 <code>documentation</code> 的目录。</p>
<p>Hexo 的主题包含以下文件和目录：</p>
<ul>
<li><p><code>_config.yml</code> 主题配置文件</p></li>
<li><p><code>languages</code> 国际化的语言包</p></li>
<li><p><code>layout</code> 主题布局，即页面结构等</p></li>
<li><p><code>scripts</code> 一些 Hexo 插件脚本</p></li>
<li><p><code>source</code> 资源文件夹，里面的文件名以 <code>_</code> 开头外的所有文件都会被当作网站的静态资源</p></li>
</ul>
<p>我们将创建一个简单的静态主题，所以我们不需要 <code>scripts</code> 目录。然后目前仅以中文展示，所以也不需要 <code>languages</code> 目录。</p>
<p>我们需要做的就是编写网站的布局，以及一些 CSS 代码。在本文中我将使<a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">Sass</a> 来生成 CSS，但 hexo 并不能直接处理 Sass，但幸运的是有 <a href="https://github.com/knksmith57/hexo-renderer-sass" rel="nofollow noreferrer" target="_blank">hexo-renderer-sass</a> 这个插件来帮助 hexo 处理 Sass。</p>
<p>使用 npm 来安装 hexo-renderer-sass，在 <code>./docs</code>（注意不是在 themes 目录里面）运行下面的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save hexo-renderer-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="sh" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save hexo-renderer-sass</span></code></pre>
<p>然后回到 themes 目录里面，配置 Sass，不然 hexo-renderer-sass 插件不会被加载。在 <code>docs/themes/documentation/_config.yml</code> 文件中加入下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_sass:
  outputStyle: nested
  precision: 4
  sourceComments: false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="coffee"><span class="hljs-attr">node_sass:</span>
<span class="hljs-attr">  outputStyle:</span> <span class="hljs-string">nested</span>
<span class="hljs-attr">  precision:</span> <span class="hljs-number">4</span>
<span class="hljs-attr">  sourceComments:</span> <span class="hljs-literal">false</span></code></pre>
<p>Sass 的所有可配置在 <a href="https://github.com/sass/node-sass#options" rel="nofollow noreferrer" target="_blank">node-sass</a></p>
<p>接下来就可以编写 Sass 代码了。不过在本文中我不会详细介绍怎么写 Sass 样式，因为它和本文内容无关，而且范围太大，一时半会儿写不完。你可以在这里 <a href="https://github.com/nodejh/hexo-documentation" rel="nofollow noreferrer" target="_blank">https://github.com/nodejh/hexo-documentation</a> 找到这些文件，然后把他们复制到你的项目中，或者你也可以创建自己的样式。</p>
<p>让我们继续回到布局，开始编写代码之前，还有一个重要的事情就是选择模板引擎，如 swig、ejs 等。Hexo 默认使用的模版引擎是 swig，这也是我们将要使用的。</p>
<p>接下来创建文件 <code>docs/themes/documentation/layout/post.swig</code>，并写入下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charSet='utf-8' />
  <title>"{{"config.title + ' - ' + page.title"}}"</title>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
  <link href='"{{" url_for(&quot;css/docs.css&quot;) "}}"' rel='stylesheet'>
</head>
<body>
  <div class='menu'>
    <div class='logo'>
      Documentation
    </div>
    <nav class='menu-nav'>
      {% for section in site.data.nav %}
        <ul class='nav'>
          <span>"{{" section.title "}}"</span>
          <ul class='nav'>
            {% for item in section.items %}
              <li>
                <a href='"{{"item.href || url_for(item.id + &quot;.html&quot;) "}}"'{% if item.id == page.id %} class='active'{% endif %}>"{{"item.title"}}"</a>
              </li>
            {% endfor %}
          </ul>
        </ul>
      {% endfor %}
    </nav>
    <a class='footer' href='https://github.com/sitepoint-editors/hexo-documentation'>
      Project on github
    </a>
  </div>
  <div class='page'>
    <div class='page-content'>
      <h1>"{{"page.title"}}"</h1>
      "{{"page.content"}}"
    </div>
  </div>
  <div class='switch-page'>
    {% if page.prev %}
      <a class='previous' href='"{{" url_for(page.prev) "}}"'>Previous</a>
    {% endif %}
    {% if page.next %}
      <a class='next' href='"{{" url_for(page.next) "}}"'>Next</a>
    {% endif %}
  </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charSet</span>=<span class="hljs-string">'utf-8'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>"{{"config.title + ' - ' + page.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" url_for("css/docs.css") "}}"'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'menu'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'logo'</span>&gt;</span>
      Documentation
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'menu-nav'</span>&gt;</span>
      {% for section in site.data.nav %}
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'nav'</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" section.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'nav'</span>&gt;</span>
            {% for item in section.items %}
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{"item.href || url_for(item.id + ".html") "}}"'</span>{% <span class="hljs-attr">if</span> <span class="hljs-attr">item.id</span> == <span class="hljs-string">page.id</span> %} <span class="hljs-attr">class</span>=<span class="hljs-string">'active'</span>{% <span class="hljs-attr">endif</span> %}&gt;</span>"{{"item.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            {% endfor %}
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      {% endfor %}
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'footer'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://github.com/sitepoint-editors/hexo-documentation'</span>&gt;</span>
      Project on github
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'page'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'page-content'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{"page.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      "{{"page.content"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'switch-page'</span>&gt;</span>
    {% if page.prev %}
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'previous'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" url_for(page.prev) "}}"'</span>&gt;</span>Previous<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    {% endif %}
    {% if page.next %}
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'next'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" url_for(page.next) "}}"'</span>&gt;</span>Next<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    {% endif %}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>简单分析一下代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <meta charSet='utf-8' />
  <title>"{{"config.title + ' - ' + page.title"}}"</title>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
  <link href='"{{" url_for(&quot;css/docs.css&quot;) "}}"' rel='stylesheet'>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charSet</span>=<span class="hljs-string">'utf-8'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>"{{"config.title + ' - ' + page.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" url_for("css/docs.css") "}}"'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>头部主要包括两部分：</p>
<ul>
<li><p><code>title</code> Hexo 提供了一些列的<a href="https://hexo.io/zh-cn/docs/variables.html" rel="nofollow noreferrer" target="_blank">变量</a>，我们可以使用其中的 <code>config.title</code> 和 <code>page.title</code> 来组成我们的 title</p></li>
<li><p><code>links</code> 链接里面包括 normalize CSS，使默认的样式保持跨浏览器的一致性；Google Fonts，使文本显示更友好；url_for，这是 Hexo 的一个<a href="https://hexo.io/zh-cn/docs/helpers.html" rel="nofollow noreferrer" target="_blank">辅助函数</a>，可以在路径前加上根路径</p></li>
</ul>
<p>接下来看 body 部分，大体上还是 HTML。一些重点部分稍后会详细介绍。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav class='menu-nav'>
  {% for section in site.data.nav %}
  <ul class='nav'>
    <span>"{{" section.title "}}"</span>
    <ul class='nav'>
      {% for item in section.items %}
        <li>
          <a
            href='"{{" item.href || url_for(item.id + &quot;.html&quot;) "}}"'
            {% if item.id == page.id %}
              class='active'
            {% endif %}
          >
            "{{" item.title "}}"
          </a>
        </li>
      {% endfor %}
    </ul>
  </ul>
  {% endfor %}
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'menu-nav'</span>&gt;</span>
  {% for section in site.data.nav %}
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'nav'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" section.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'nav'</span>&gt;</span>
      {% for item in section.items %}
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
            <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" item.href || url_for(item.id + ".html") "}}"'</span>
            {% <span class="hljs-attr">if</span> <span class="hljs-attr">item.id</span> == <span class="hljs-string">page.id</span> %}
              <span class="hljs-attr">class</span>=<span class="hljs-string">'active'</span>
            {% <span class="hljs-attr">endif</span> %}
          &gt;</span>
            "{{" item.title "}}"
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      {% endfor %}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  {% endfor %}
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>上面的代码会生成网站的菜单部分，菜单项来自于 <code>site.data.nav</code> 这个对象，稍后我们会在 <code>docs/source/_data/nav.yml</code> 中创建。<code>source/_data</code> 是 Hexo 的<a href="https://hexo.io/zh-cn/docs/data-files.html" rel="nofollow noreferrer" target="_blank">数据文件</a>。<code>site.data.nav</code> 即 <code>_data</code> 目录中的 <code>nav.yml</code> 文件。<code>nav.yml</code> 中是一个包含 <code> title</code> 和 <code>items</code> 对象的数组。</p>
<p>接下来比较重要的是文章内容这部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;page-content&quot;>
  <h1>"{{" page.title "}}"</h1>
  "{{" page.content "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" page.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  "{{" page.content "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这里面包括了文章标题和内容两部分。文章内容是根据 MarkDown 文件生成的 HTML。</p>
<p>最后还包括 “上一页” 和 “下一页” 按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{% if page.prev %}
  <a class='previous' href=&quot;"{{" url_for(page.prev) "}}"&quot;>上一页</a>
{% endif %}
{% if page.next %}
  <a class='next' href=&quot;"{{" url_for(page.next) "}}"&quot;>下一页</a>
{% endif %}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">{% if page.prev %}
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'previous'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""{{" url_for(page.prev) "}}""</span>&gt;</span>上一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
{% endif %}
{% if page.next %}
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'next'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""{{" url_for(page.next) "}}""</span>&gt;</span>下一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
{% endif %}</code></pre>
<p>上面的代码中，我们假设每个页面都有 “上一页” 和 “下一页” 按钮。</p>
<p>然后创建一个首页 <code>documentation/layout/index.swig</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charSet='utf-8' />
  <title>"{{"config.title + ' - ' + page.title"}}"</title>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
  <link href='"{{" url_for(&quot;css/docs.css&quot;) "}}"' rel='stylesheet'>
</head>
<body>
  <div class='index'>
    <a href=&quot;/what-is-it.html&quot;>
      Get Start
    </a>
  </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charSet</span>=<span class="hljs-string">'utf-8'</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>"{{"config.title + ' - ' + page.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/css'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{" url_for("css/docs.css") "}}"'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'index'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/what-is-it.html"</span>&gt;</span>
      Get Start
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>现在差不多就完成了！不仅是布局文件完成了，我们的主题也制作好了。最后一件事情就是修改 Hexo 生成静态文件的时候使用的主题。修改 <code>docs/_config.yml</code> 文件中的 <code>theme</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="theme: documentation" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="coffee" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">theme:</span> documentation</code></pre>
<p>所有事情都做完了！接下来我们就可以创建文档了。</p>
<h2 id="articleHeader7">编写文档</h2>
<p>接下来就到了整篇文章最重要的部分了，为我们的项目编写文档。我们将在 <code>docs/source/</code> 目录完成这些事情。这里的文档是网站内容的来源，以及网站的菜单。</p>
<p>首先创建菜单。Hexo 提供了让我们定义一些数据文件，并通过 <code>site.data</code> 来访问。首先在 <code>source</code> 目录里面创建 <code>_data</code> 目录，然后创建名为 <code>nav.yml</code> 的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- title: Introduction
  items:
  - id: what-is-it
    title: What is it?
  - id: how-it-works
    title: How it works
- title: Usage
  items:
  - id: installation
    title: Installation
  - id: using
    title: Using It" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code class="coffee">-<span class="ruby"> <span class="hljs-symbol">title:</span> Introduction
</span>  items:
  -<span class="ruby"> <span class="hljs-symbol">id:</span> what-is-it
</span>    title: What is it?
  -<span class="ruby"> <span class="hljs-symbol">id:</span> how-it-works
</span>    title: How it works
-<span class="ruby"> <span class="hljs-symbol">title:</span> Usage
</span>  items:
  -<span class="ruby"> <span class="hljs-symbol">id:</span> installation
</span>    title: Installation
  -<span class="ruby"> <span class="hljs-symbol">id:</span> using
</span>    title: Using It</code></pre>
<p>这样我们就可以通过 <code>site.data.nav</code> 来访问 <code>nav.yml</code> 中的文件。</p>
<p>在上面创建的菜单中，我们创建了两篇文章，每篇文章有两个部分。最后我们就只需要创建页面了。在编写 MarkDown 之前，先创建以下文件，与菜单对应：</p>
<ul>
<li><p>what-is-it.md</p></li>
<li><p>how-it-works.md</p></li>
<li><p>installation.md</p></li>
<li><p>using.md</p></li>
</ul>
<p>接下来就要往文件中写入内容。文件的开头部分是 <a href="https://hexo.io/zh-cn/docs/front-matter.html" rel="nofollow noreferrer" target="_blank">Front-matter</a>，里面是页面的一些设置，Front-matter 是包含在两个 <code>---</code> 之间的 <a href="http://yaml.org/" rel="nofollow noreferrer" target="_blank">YAML</a> 格式的。</p>
<p>如 <code>what-is-it.md</code> 所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="---
layout: default
id: what-is-it
title: What is it?
next: how-it-works.html
---

This is our what it is markdown file

- one
- two
- three" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown">---
layout: default
id: what-is-it
title: What is it?
<span class="hljs-section">next: how-it-works.html
---</span>

This is our what it is markdown file

<span class="hljs-bullet">- </span>one
<span class="hljs-bullet">- </span>two
<span class="hljs-bullet">- </span>three</code></pre>
<p>在 front-matter 中有下面这些设置：</p>
<ul>
<li><p><code>layout</code> 页面的布局</p></li>
<li><p><code>id</code> 页面的唯一标识</p></li>
<li><p><code>title</code> 页面标题</p></li>
<li><p><code>next</code> 下一页链接</p></li>
</ul>
<p>按照类似的方法编写其他几个 MarkDown 文件。当网站创建好之后，这些 MarkDown 内容会被转换为 HTML。</p>
<p>编辑好了之后，就可以生成静态网站了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo generate
$ hexo server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="sh">$ hexo <span class="hljs-keyword">generate</span>
$ hexo server</code></pre>
<p>然后通过 <code>http://localhost:4000</code> 就可以看到如下页面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010065952?w=1439&amp;h=858" src="https://static.alili.tech/img/remote/1460000010065952?w=1439&amp;h=858" alt="Project-Documentation-with-Hexo-Static-Site-Generator-02" title="Project-Documentation-with-Hexo-Static-Site-Generator-02" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">部署到 GitHub Pages</h2>
<p>现在我们的文档网站就全部做好了，接下来需要做的就是将其部署到 Github Pages 上。如果我们手动来实现，就需要创建 gh-pages 分支，生成静态网站，复制网站文件到 gp-pages 分支，commit 并且 push 代码到 GitHub。当修改文档之后，又得重复这些工作。</p>
<p>幸运的是，Hexo 提供了一个很方便地将站点部署到 gh-pages 的方法。首先安装 <a href="https://github.com/hexojs/hexo-deployer-git" rel="nofollow noreferrer" target="_blank">hexo-deployer-git</a> 这个包，在 <code>docs/</code> 目录下运行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save hexo-deployer-git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="sh" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save hexo-deployer-git</span></code></pre>
<p>然后打开 <code>docs/_config.yml</code>，在文档的最后面，修改部署配置信息，注意将其中的用户名（nodejh）修改为你的用户名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deploy:
  type: git
  repo: https://github.com/nodejh/hexo-documentation
  branch: gh-pages
  message: &quot;Docs updated: "{{" now('YYYY-MM-DD HH:mm:ss') "}}")&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="coffee"><span class="hljs-attribute">deploy</span>:
  <span class="hljs-attribute">type</span>: git
  <span class="hljs-attribute">repo</span>: <span class="hljs-attribute">https</span>:<span class="hljs-comment">//github.com/nodejh/hexo-documentation</span>
  <span class="hljs-attribute">branch</span>: gh-pages
  <span class="hljs-attribute">message</span>: <span class="hljs-string">"Docs updated: "{{" now('YYYY-MM-DD HH:mm:ss') "}}")"</span>
</code></pre>
<p>最后再修改一些其他配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Site
title: Hexo documentation
subtitle: Hexo documentation article
description: Hexo documentation article
author: nodejh
language: zh-cn
timezone: GMT

# URL
url: https://nodejh.github.io/hexo-documentation
root: /hexo-documentation/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="coffee"><span class="hljs-meta"># Site</span>
<span class="hljs-symbol">title:</span> Hexo documentation
<span class="hljs-symbol">subtitle:</span> Hexo documentation article
<span class="hljs-symbol">description:</span> Hexo documentation article
<span class="hljs-symbol">author:</span> nodejh
<span class="hljs-symbol">language:</span> zh-cn
<span class="hljs-symbol">timezone:</span> GMT

<span class="hljs-meta"># URL</span>
<span class="hljs-symbol">url:</span> https:<span class="hljs-comment">//nodejh.github.io/hexo-documentation</span>
<span class="hljs-symbol">root:</span> <span class="hljs-meta-keyword">/hexo-documentation/</span></code></pre>
<p>OK！现在就只剩下一件事情了，就是将网站部署到 Github 上，在终端上运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo generate
$ hexo deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="sh">$ hexo <span class="hljs-keyword">generate</span>
$ hexo deploy</code></pre>
<p>Hexo 将生成静态文件，并将其自动部署到 gh-pages 分支上。部署完成之后，我们就可以通过 <a href="https://nodejh.github.io/hexo-documentation" rel="nofollow noreferrer" target="_blank">https://nodejh.github.io/hexo-documentation</a> 来访问了。</p>
<h2 id="articleHeader9">总结</h2>
<p>如果你想要的项目被被人使用，文档是非常必要的。在 GitHub 上也有很多创建项目文档的方法。对于中大型项目来说，维护一个文档网站也是很有必要的。Hexo 不仅能生成静态网站，同时也提供了部署网站的方案，非常方便我们使用。</p>
<hr>
<ul><li><p><a href="https://github.com/nodejh/nodejh.github.io/issues/37/" rel="nofollow noreferrer" target="_blank">使用 Hexo 创建项目文档网站</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Hexo 创建项目文档网站

## 原文链接
[https://segmentfault.com/a/1190000010065946](https://segmentfault.com/a/1190000010065946)

