---
title: '如何在服务器上搭建hexo博客' 
date: 2019-01-14 2:30:07
hidden: true
slug: tqhv4ojp0sc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><a href="https://www.moumaobuchiyu.com/2017/04/21/%E5%9C%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E6%90%AD%E5%BB%BAhexo%E5%8D%9A%E5%AE%A2/" rel="nofollow noreferrer" target="_blank">原文链接</a></h3>
<blockquote><p>随着<a href="https://github.com/moumao/hexo-theme-Vateral" rel="nofollow noreferrer" target="_blank">Vateral主题</a>的开发接近了尾声，在对主题速度优化的时候发现之前用的githubpage问题多多：首先就是因为在国内的原因，访问速度本身就很慢，曾经有次加载一张16kb的图标时间耗费了26s！！？&lt;!--more--&gt;其次，在对资源做CDN托管加速时，域名是需要备案的，显然githubpage也是做不了的；所以果断舍弃了这个把hexo搭建到了我的阿里云服务器上</p></blockquote>
<p>总体来说还是比把hexo搭建到github上要复杂一些的，期间遇到了不少坑，也参考了很多资料，这里详细的总结一下具体的步骤。</p>
<h2 id="articleHeader1">hexo的架构</h2>
<hr>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/remote/1460000005723405" src="https://static.alili.techhttps://segmentfault.com/img/remote/1460000005723405" alt="hexo的架构" title="hexo的架构" style="cursor: pointer; display: inline;"></span></p>
<p>首先我们要理解hexo是如何实现静态博客通过服务器访问的</p>
<blockquote><p>通过上图我们可以知道，整个流程就是在本地通过<code>hexo g</code> 渲染博客的静态文件，然后通过<code>hexo d</code> 把静态文件 push到服务器上我们自己创建的git仓库,服务器再通过 git-hooks 同步网站根目录，这样就可以访问了</p></blockquote>
<h2 id="articleHeader2">搭建流程</h2>
<hr>
<p><strong>第一步：</strong> 安装node.js以及本地Hexo初始化<br><strong>第二步：</strong> 服务器环境搭建，包括安装 Git 、Nginx配置 、创建 git 用户<br><strong>第三步：</strong> 使用Git自动化部署发布博客</p>
<h2 id="articleHeader3">本地环境</h2>
<hr>
<h3 id="articleHeader4">安装node.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ brew install node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ brew install <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<h3 id="articleHeader5">初始化Hexo博客</h3>
<p>首先创建 你的Hexo 目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir &quot;your hexo dir name&quot;//创建一个自定义的hexo目录，比如我就在用户根目录创建了一个myhexo文件夹（macOS)
$ cd &quot;your hexo dir name&quot;//进入到刚刚创建的目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code><span class="hljs-string">$ </span>mkdir <span class="hljs-comment">"your hexo dir name"</span>//创建一个自定义的hexo目录，比如我就在用户根目录创建了一个myhexo文件夹（macOS)
<span class="hljs-string">$ </span>cd <span class="hljs-comment">"your hexo dir name"</span>//进入到刚刚创建的目录</code></pre>
<p>然后安装 hexo-cli，安装hexo-cli 需要 root 权限，使用 sudo 运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo npm install -g hexo-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">sudo npm install -g hexo-<span class="hljs-keyword">cli</span></code></pre>
<p>初始化该文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">hexo init</span></code></pre>
<p>安装hexo的扩展插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p>等执行成功以后安装两个插件， hexo-deployer-git 和 hexo-server ,这俩插件的作用分别是使用Git自动部署，和本地简单的服务器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install hexo-deployer-git --save
npm install hero-server --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> hexo-deployer-git <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hero-<span class="hljs-keyword">server</span> <span class="hljs-comment">--save</span></code></pre>
<p>以及一些其他插件（<strong>*非必选</strong>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install hexo-admin --save
npm install hexo-generator-archive --save
npm install hexo-generator-feed --save
npm install hexo-generator-search --save
npm install hexo-generator-tag --save
npm install hexo-generator-sitemap --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> hexo-<span class="hljs-keyword">admin</span> <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hexo-generator-<span class="hljs-keyword">archive</span> <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hexo-generator-feed <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hexo-generator-<span class="hljs-keyword">search</span> <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hexo-generator-tag <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> hexo-generator-sitemap <span class="hljs-comment">--save</span></code></pre>
<p>到这里hexo的本地搭建已经基本结束了，快来新建一个文章并在本地启动吧~</p>
<h3 id="articleHeader6">生成自己的第一篇文章</h3>
<p>使用 hexo new &lt;文章名称&gt; 来新建文章，该命令会成成一个 .md文件放置在 sources/_posts文件夹。（<strong>*在hexo目录下执行命令</strong>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo new &quot;hello Hexo&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">hexo <span class="hljs-keyword">new</span> <span class="hljs-string">"hello Hexo"</span></code></pre>
<blockquote><p>执行该命令后在hexo目录下的 sources/_posts文件夹里生成了刚刚创建的hello<br>Hexo.md的markdown文件，然后就可以通过本地或者在线的markdown编辑器就可以创作自己的博客了~</p></blockquote>
<p>编辑完毕以后， 使用hexo g将 .md文件渲染成静态文件，然后启动hexo-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo g
hexo server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>hexo g
hexo <span class="hljs-keyword">server</span></code></pre>
<p>打开 <a href="http://localhost:4000" rel="nofollow noreferrer" target="_blank">http://localhost:4000</a> 如果看到 hexo 的初始页面证明安装成功。</p>
<h3 id="articleHeader7">生成ssh公钥密钥</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd ~/.ssh
$ ssh-keygen" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code><span class="hljs-string">$ </span>cd ~/.ssh
<span class="hljs-string">$ </span>ssh-keygen</code></pre>
<p>它先要求你确认保存公钥的位置（.ssh/id_rsa），然后它会让你重复一个密码两次，如果不想在使用公钥的时候输入密码，可以留空；具体生产方法可以<a href="https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/" rel="nofollow noreferrer" target="_blank">参考这里</a></p>
<blockquote><p>这个公钥将会复制到服务器的证书中，添加公钥之后可以防止每次 push 都输入密码。</p></blockquote>
<p>至此，本地环境的搭建已经基本结束。</p>
<h2 id="articleHeader8">服务器环境搭建</h2>
<hr>
<h3 id="articleHeader9">安装nginx</h3>
<p>因为我们是拿nginx做 Web 服务器，所以我们需要安装部署好nginx，如果没有安装，推荐使用<a href="https://lnmp.org/install.html" rel="nofollow noreferrer" target="_blank">LNMP一键安装包</a></p>
<blockquote><p>我们可以专门为hexo创建一个部署目录，比如我创建了/home/www/hexo文件夹，并把nginx的配置文件nginx.conf中的部署目录改为/home/www/hexo，配置文件一般在/usr/local/nginx/conf里；同样可以使用默认目录，nginx的默认目录为/var/www/html，如果使用LNMP一键安装包，则默认的部署目录为/home/wwwroot/default</p></blockquote>
<h3 id="articleHeader10">安装node.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ apt-get install -y nodejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$ curl -sL http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">deb</span>.nodesource.<span class="hljs-keyword">com</span>/setup_4.<span class="hljs-keyword">x</span> | sudo -E bash -
$ apt-<span class="hljs-built_in">get</span> install -<span class="hljs-keyword">y</span> nodejs</code></pre>
<blockquote><p>如果遇到问题可以参考<a href="https://www.moumaobuchiyu.com/2017/03/16/nodejs%E9%83%A8%E7%BD%B2%E5%88%B0%E9%98%BF%E9%87%8C%E4%BA%91%E5%85%A8%E8%BF%87%E7%A8%8B/" rel="nofollow noreferrer" target="_blank">Node.js部署到阿里云服务器</a>里边有更详细的关于node.js的步骤</p></blockquote>
<h3 id="articleHeader11">安装git</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ apt-get install git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">$ apt-<span class="hljs-keyword">get</span> install git</code></pre>
<h3 id="articleHeader12">创建一个git用户</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo adduser git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">$ sudo <span class="hljs-keyword">adduser </span>git</code></pre>
<blockquote><p>虽说现在的仓库只有我们自己在使用，新建一个 git 用户显得不是很有必要，但是为了安全起见，还是建议使用单独的 git 用户来专门运行<br>git 服务</p></blockquote>
<h3 id="articleHeader13">添加证书登录</h3>
<p>把刚在在本地创建或者已经拥有的公钥，也就是 ~/.ssh/id_rsa.pub 文件里的内容添加到服务器的 /home/git/.ssh/authorized_keys 文件中，如上所说，添加公钥之后可以防止每次 push 都输入密码。（*可以直接执行<code>cat ~/.ssh/id_rsa.pub | pbcopy</code> 复制）</p>
<h3 id="articleHeader14">初始化 Git 仓库</h3>
<p>可以将git仓库放到自定义位置，我是将其放在 /var/repo/blog.git 目录下的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo mkdir /var/repo
$ cd /var/repo
$ sudo git init --bare blog.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>$ sudo <span class="hljs-keyword">mkdir</span> /<span class="hljs-keyword">var</span>/repo
$ <span class="hljs-keyword">cd</span> /<span class="hljs-keyword">var</span>/repo
$ sudo git init --bare blog.git</code></pre>
<p>使用 --bare 参数，Git 就会创建一个裸仓库，裸仓库没有工作区，我们不会在裸仓库上进行操作，它只为共享而存在。</p>
<h3 id="articleHeader15">配置 git hooks</h3>
<blockquote><p>我们这里要使用的是 post-receive 的 hook，这个 hook 会在整个 git 操作过程完结以后被运行，关于 hooks<br>的详情内容可以<a href="https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90" rel="nofollow noreferrer" target="_blank">参考这里</a>。</p></blockquote>
<p>在 blog.git/hooks 目录下新建一个 post-receive 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd /var/repo/blog.git/hooks" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">$ cd <span class="hljs-regexp">/var/</span>repo<span class="hljs-regexp">/blog.git/</span>hooks</code></pre>
<p>编辑这个文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vim post-receive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>vim post-receive</code></pre>
<p>在 post-receive 文件中写入如下内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/bin/sh
git --work-tree=/home/www/hexo --git-dir=/var/repo/blog.git checkout -f" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-meta">#!/bin/sh</span>
git --work-tree=/home/www/hexo --git-dir=/var/repo/blog.git checkout <span class="hljs-_">-f</span></code></pre>
<blockquote><p>注意，/home/www/hexo 要换成你自己的部署目录，正如上文所说，我是的配置目录是/home/www/hexo。/var/repo/blog.git是git仓库的位置。上面那句 git 命令可以在我们每次 push 完之后，把部署目录更新到博客的最新生成状态。这样便可以完成达到自动部署的目的了。</p></blockquote>
<p>设置这个文件的可执行权限</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chmod +x post-receive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code style="word-break: break-word; white-space: initial;">chmod +x post-<span class="hljs-keyword">receive</span></code></pre>
<h3 id="articleHeader16">改变 blog.git 目录的拥有者为 git 用户</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo chown -R git:git blog.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>sudo chown -R <span class="hljs-symbol">git:</span>git blog.git</code></pre>
<h3 id="articleHeader17">禁用 git 用户的 shell 登录权限</h3>
<p>出于安全考虑，我们要让 git 用户不能通过 shell 登录。可以编辑 /etc/passwd 来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/passwd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">vim <span class="hljs-regexp">/etc/</span>passwd</code></pre>
<p>将</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git:x:1001:1001:,,,:/home/git:/bin/bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">git:</span><span class="hljs-symbol">x:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span>,,,<span class="hljs-symbol">:/home/git</span><span class="hljs-symbol">:/bin/bash</span></code></pre>
<p>改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">git:</span><span class="hljs-symbol">x:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span>,,,<span class="hljs-symbol">:/home/git</span><span class="hljs-symbol">:/usr/bin/git-shell</span></code></pre>
<p>这样 git 用户可以通过 ssh 正常使用 git，但是无法登录 sehll。</p>
<p>至此，服务器环境的搭建已经基本结束。</p>
<h2 id="articleHeader18">配置本地_config.yml文件,完成自动化部署</h2>
<hr>
<h3 id="articleHeader19">现在配置 hexo 的 deploy。</h3>
<p>修改 hexo 目录下的 _config.yml 找到 deploy, 修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deploy:
type: git
repo: git@www.moumaobuchiyu.com:/var/repo/blog.git
branch: master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">deploy</span>:
<span class="hljs-attribute">type</span>: git
<span class="hljs-attribute">repo</span>: git<span class="hljs-variable">@www</span>.moumaobuchiyu.<span class="hljs-attribute">com</span>:/var/repo/blog.git
<span class="hljs-attribute">branch</span>: master</code></pre>
<blockquote><p>repo 的地址为你自己的地址以及 git 仓库目录</p></blockquote>
<p>至此，我们的 hexo 自动部署已经全部配置好了</p>
<h3 id="articleHeader20">开始使用</h3>
<p>新建文章：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo new &quot;post name&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">$ hexo <span class="hljs-keyword">new</span> <span class="hljs-string">"post name"</span></code></pre>
<p>生成 &amp; 部署：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo clean &amp;&amp; hexo g &amp;&amp; hexo d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>hexo clean &amp;&amp; hexo g &amp;&amp; hexo d</code></pre>
<h2 id="articleHeader21">参考</h2>
<p><a href="https://blog.viosey.com/2016/10/05/Install-hexo-vps-git/" rel="nofollow noreferrer" target="_blank">在 VPS 上搭建 Hexo 博客，使用 Git 部署</a><br><a href="https://segmentfault.com/a/1190000005723321">阿里云VPS搭建自己的的Hexo博客</a><br><a href="http://www.swiftyper.com/2016/04/17/deploy-hexo-with-git-hook/" rel="nofollow noreferrer" target="_blank">使用 Git Hook 自动部署 Hexo 到个人 VPS</a><br><a href="http://sumyblog.me/2015/11/02/use-git-hooks-for-hexo-automatic-deployment/" rel="nofollow noreferrer" target="_blank">使用git hooks进行hexo博客自动化部署</a></p>
<h2 id="articleHeader22">最后欢迎使用我最近为hexo开发的主题Vateral<a href="https://www.moumaobuchiyu.com" rel="nofollow noreferrer" target="_blank">查看demo</a>如果喜欢各位dalao给个star支持一下~</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在服务器上搭建hexo博客

## 原文链接
[https://segmentfault.com/a/1190000009363890](https://segmentfault.com/a/1190000009363890)

