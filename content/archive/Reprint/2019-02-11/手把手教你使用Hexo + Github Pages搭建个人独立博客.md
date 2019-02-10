---
title: '手把手教你使用Hexo + Github Pages搭建个人独立博客' 
date: 2019-02-11 2:30:49
hidden: true
slug: 4h7wt9h5x7f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">系统环境配置</h2>
<p>要使用Hexo，需要在你的系统中支持Nodejs以及Git，如果还没有，那就开始安装吧！</p>
<h3 id="articleHeader1">安装Node.js</h3>
<p><a href="https://nodejs.org/download/" rel="nofollow noreferrer" target="_blank">下载Node.js</a><br>参考地址：<a href="http://www.w3cschool.cc/nodejs/nodejs-install-setup.html" rel="nofollow noreferrer" target="_blank">安装Node.js</a></p>
<h3 id="articleHeader2">安装Git</h3>
<p>下载地址：<a href="http://git-scm.com/download/" rel="nofollow noreferrer" target="_blank">http://git-scm.com/download/</a></p>
<h3 id="articleHeader3">安装Hexo</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd d:/hexo
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo g # 或者hexo generate
$ hexo s # 或者hexo server，可以在http://localhost:4000/ 查看" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">cd</span> d:/hexo
$ npm install hexo-cli -g
$ hexo init blog
$ <span class="hljs-built_in">cd</span> blog
$ npm install
$ hexo g <span class="hljs-comment"># 或者hexo generate</span>
$ hexo s <span class="hljs-comment"># 或者hexo server，可以在http://localhost:4000/ 查看</span></code></pre>
<p>这里有必要提下Hexo常用的几个命令：</p>
<ol>
<li><p>hexo generate (hexo g) 生成静态文件，会在当前目录下生成一个新的叫做public的文件夹</p></li>
<li><p>hexo server (hexo s) 启动本地web服务，用于博客的预览</p></li>
<li><p>hexo deploy (hexo d) 部署播客到远端（比如github, heroku等平台）</p></li>
</ol>
<p>另外还有其他几个常用命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo new &quot;postName&quot; #新建文章
$ hexo new page &quot;pageName&quot; #新建页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ hexo new <span class="hljs-string">"postName"</span> <span class="hljs-comment">#新建文章</span>
$ hexo new page <span class="hljs-string">"pageName"</span> <span class="hljs-comment">#新建页面</span></code></pre>
<p>常用简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo n == hexo new
$ hexo g == hexo generate
$ hexo s == hexo server
$ hexo d == hexo deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ hexo n == hexo new
$ hexo g == hexo generate
$ hexo s == hexo server
$ hexo d == hexo deploy</code></pre>
<p>常用组合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo d -g #生成部署
$ hexo s -g #生成预览" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ hexo d -g <span class="hljs-comment">#生成部署</span>
$ hexo s -g <span class="hljs-comment">#生成预览</span></code></pre>
<p>现在我们打开<a href="http://localhost:4000/" rel="nofollow noreferrer" target="_blank">http://localhost:4000/</a> 已经可以看到一篇内置的blog了。<br><span class="img-wrap"><img data-src="/img/remote/1460000006776519" src="https://static.alili.tech/img/remote/1460000006776519" alt="" title="" style="cursor: pointer;"></span></p>
<p>目前我安装所用的本地环境如下：(可以通过hexo -v查看)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo: 3.2.0
hexo-cli: 1.0.1
os: Windows_NT 6.3.9600 win32 x64
http_parser: 2.5.2
node: 4.4.1
v8: 4.5.103.35
uv: 1.8.0
zlib: 1.2.8
ares: 1.10.1-DEV
icu: 56.1
modules: 46
openssl: 1.0.2g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">hexo</span>: 3<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">hexo-cli</span>: 1<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>
<span class="hljs-selector-tag">os</span>: <span class="hljs-selector-tag">Windows_NT</span> 6<span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.9600</span> <span class="hljs-selector-tag">win32</span> <span class="hljs-selector-tag">x64</span>
<span class="hljs-selector-tag">http_parser</span>: 2<span class="hljs-selector-class">.5</span><span class="hljs-selector-class">.2</span>
<span class="hljs-selector-tag">node</span>: 4<span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.1</span>
<span class="hljs-selector-tag">v8</span>: 4<span class="hljs-selector-class">.5</span><span class="hljs-selector-class">.103</span><span class="hljs-selector-class">.35</span>
<span class="hljs-selector-tag">uv</span>: 1<span class="hljs-selector-class">.8</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">zlib</span>: 1<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.8</span>
<span class="hljs-selector-tag">ares</span>: 1<span class="hljs-selector-class">.10</span><span class="hljs-selector-class">.1-DEV</span>
<span class="hljs-selector-tag">icu</span>: 56<span class="hljs-selector-class">.1</span>
<span class="hljs-selector-tag">modules</span>: 46
<span class="hljs-selector-tag">openssl</span>: 1<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2g</span>
</code></pre>
<h2 id="articleHeader4">Hexo主题设置</h2>
<p>这里以主题yilia为例进行说明。</p>
<h4>安装主题</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo clean
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ hexo clean
$ git <span class="hljs-built_in">clone</span> https://github.com/litten/hexo-theme-yilia.git themes/yilia</code></pre>
<h4>启用主题</h4>
<p>修改Hexo目录下的_config.yml配置文件中的theme属性，将其设置为yilia。</p>
<h4>更新主题</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd themes/yilia
$ git pull
$ hexo g # 生成
$ hexo s # 启动本地web服务器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">cd</span> themes/yilia
$ git pull
$ hexo g <span class="hljs-comment"># 生成</span>
$ hexo s <span class="hljs-comment"># 启动本地web服务器</span></code></pre>
<p>现在打开<a href="http://localhost:4000/" rel="nofollow noreferrer" target="_blank">http://localhost:4000/</a> ，会看到我们已经应用了一个新的主题。</p>
<h2 id="articleHeader5">Github Pages设置</h2>
<h3 id="articleHeader6">什么是Github Pages</h3>
<p><a href="https://pages.github.com/" rel="nofollow noreferrer" target="_blank">GitHub Pages</a> 本用于介绍托管在GitHub的项目，不过，由于他的空间免费稳定，用来做搭建一个博客再好不过了。</p>
<p>每个帐号只能有一个仓库来存放个人主页，而且仓库的名字必须是username/username.github.io，这是特殊的命名约定。你可以通过<a href="http://username.github.io" rel="nofollow noreferrer" target="_blank">http://username.github.io</a> 来访问你的个人主页。</p>
<p>这里特别提醒一下，需要注意的个人主页的网站内容是在master分支下的。</p>
<h3 id="articleHeader7">创建自己的Github Pages</h3>
<p>注册GitHub及使用Github Pages的过程已经有很多文章讲过，在此不再详述，可以参考：</p>
<p><a href="http://pchou.info/web-build/2013/01/03/build-github-blog-page-01.html" rel="nofollow noreferrer" target="_blank">一步步在GitHub上创建博客主页 全系列</a></p>
<p><a href="http://www.jianshu.com/p/05289a4bc8b2" rel="nofollow noreferrer" target="_blank">如何搭建一个独立博客——简明Github Pages与Hexo教程</a></p>
<p>在这里我创建了一个github repo叫做 <a href="https://github.com/jiji262/jiji262.github.io" rel="nofollow noreferrer" target="_blank">jiji262.github.io</a>. 创建完成之后，需要有一次提交(git commit)操作，然后就可以通过链接<a href="http://jiji262.github.io/" rel="nofollow noreferrer" target="_blank">http://jiji262.github.io/</a> 访问了。（现在还没有内容，别着急）</p>
<h2 id="articleHeader8">部署Hexo到Github Pages</h2>
<p>这一步恐怕是最关键的一步了，让我们把在本地web环境下预览到的博客部署到github上，然后就可以直接通过<a href="http://jiji262.github.io/" rel="nofollow noreferrer" target="_blank">http://jiji262.github.io/</a>访问了。不过很多教程文章对这个步骤语焉不详，这里着重说下。</p>
<p>首先需要明白所谓部署到github的原理。</p>
<ol>
<li><p>之前步骤中在Github上创建的那个特别的repo（jiji262.github.io）一个最大的特点就是其master中的html静态文件，可以通过链接<a href="http://jiji262.github.io" rel="nofollow noreferrer" target="_blank">http://jiji262.github.io</a>来直接访问。</p></li>
<li><p>Hexo -g 会生成一个静态网站（第一次会生成一个public目录），这个静态文件可以直接访问。</p></li>
<li><p>需要将hexo生成的静态网站，提交(git commit)到github上。</p></li>
</ol>
<p>明白了原理，怎么做自然就清晰了。</p>
<h3 id="articleHeader9">使用hexo deploy部署</h3>
<p>hexo deploy可以部署到很多平台，具体可以<a href="https://hexo.io/docs/deployment.html" rel="nofollow noreferrer" target="_blank">参考这个链接</a>. 如果部署到github，需要在配置文件_config.xml中作如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deploy:
  type: git
  repo: git@github.com:jiji262/jiji262.github.io.git
  branch: master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">deploy</span>:
  <span class="hljs-attribute">type</span>: git
  <span class="hljs-attribute">repo</span>: git<span class="hljs-variable">@github</span>.<span class="hljs-attribute">com</span>:jiji262/jiji262.github.io.git
  <span class="hljs-attribute">branch</span>: master</code></pre>
<p>然后在命令行中执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">hexo d</span></code></pre>
<p>即可完成部署。</p>
<p>注意需要提前安装一个扩展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install hexo-deployer-git --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> hexo-deployer-git <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader10">使用git命令行部署</h3>
<p>不幸的是，上述命令虽然简单方便，但是偶尔会有莫名其妙的问题出现，因此，我们也可以追本溯源，使用git命令来完成部署的工作。</p>
<h4>clone github repo</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd d:/hexo/blog

$ git clone https://github.com/jiji262/jiji262.github.io.git .deploy/jiji262.github.io" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$ cd <span class="hljs-string">d:</span><span class="hljs-regexp">/hexo/</span>blog

$ git clone <span class="hljs-string">https:</span><span class="hljs-comment">//github.com/jiji262/jiji262.github.io.git .deploy/jiji262.github.io</span></code></pre>
<p>将我们之前创建的repo克隆到本地，新建一个目录叫做.deploy用于存放克隆的代码。</p>
<h4>创建一个deploy脚本文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hexo generate
cp -R public/* .deploy/jiji262.github.io
cd .deploy/jiji262.github.io
git add .
git commit -m “update”
git push origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code>hexo <span class="hljs-keyword">generate</span>
cp -R public<span class="hljs-comment">/* .deploy/jiji262.github.io
cd .deploy/jiji262.github.io
git add .
git commit -m “update”
git push origin master</span></code></pre>
<p>简单解释一下，hexo generate生成public文件夹下的新内容，然后将其拷贝至jiji262.github.io的git目录下，然后使用git commit命令提交代码到jiji262.github.io这个repo的master branch上。</p>
<p>需要部署的时候，执行这段脚本就可以了（比如可以将其保存为deploy.sh）。执行过程中可能需要让你输入Github账户的用户名及密码，按照提示操作即可。</p>
<h2 id="articleHeader11">Hexo 主题配置</h2>
<p>每个不同的主题会需要不同的配置，主题配置文件在主题目录下的_config.yml。<br>以我们使用的yilia主题为例，其提供如下的配置项（themeyilia_config.yml）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Header
menu:
  主页: /
  所有文章: /archives
  # 随笔: /tags/随笔

# SubNav
subnav:
  github: &quot;#&quot;
  weibo: &quot;#&quot;
  rss: &quot;#&quot;
  zhihu: &quot;#&quot;
  #douban: &quot;#&quot;
  #mail: &quot;#&quot;
  #facebook: &quot;#&quot;
  #google: &quot;#&quot;
  #twitter: &quot;#&quot;
  #linkedin: &quot;#&quot;

rss: /atom.xml

# Content
excerpt_link: more
fancybox: true
mathjax: true

# Miscellaneous
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar: &quot;&quot;
#是否开启分享
share: true
#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: true
#是否开启云标签
tagcloud: true

#是否开启友情链接
#不开启——
#friends: false

#是否开启“关于我”。
#不开启——
#aboutme: false
#开启——
aboutme: 我是谁，我从哪里来，我到哪里去？我就是我，是颜色不一样的吃货…
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-comment"># Header</span>
<span class="hljs-attr">menu:</span>
  <span class="hljs-string">主页:</span> <span class="hljs-string">/</span>
  <span class="hljs-string">所有文章:</span> <span class="hljs-string">/archives</span>
  <span class="hljs-comment"># 随笔: /tags/随笔</span>

<span class="hljs-comment"># SubNav</span>
<span class="hljs-attr">subnav:</span>
<span class="hljs-attr">  github:</span> <span class="hljs-string">"#"</span>
<span class="hljs-attr">  weibo:</span> <span class="hljs-string">"#"</span>
<span class="hljs-attr">  rss:</span> <span class="hljs-string">"#"</span>
<span class="hljs-attr">  zhihu:</span> <span class="hljs-string">"#"</span>
  <span class="hljs-comment">#douban: "#"</span>
  <span class="hljs-comment">#mail: "#"</span>
  <span class="hljs-comment">#facebook: "#"</span>
  <span class="hljs-comment">#google: "#"</span>
  <span class="hljs-comment">#twitter: "#"</span>
  <span class="hljs-comment">#linkedin: "#"</span>

<span class="hljs-attr">rss:</span> <span class="hljs-string">/atom.xml</span>

<span class="hljs-comment"># Content</span>
<span class="hljs-attr">excerpt_link:</span> <span class="hljs-string">more</span>
<span class="hljs-attr">fancybox:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">mathjax:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Miscellaneous</span>
<span class="hljs-attr">google_analytics:</span> <span class="hljs-string">''</span>
<span class="hljs-attr">favicon:</span> <span class="hljs-string">/favicon.png</span>

<span class="hljs-comment">#你的头像url</span>
<span class="hljs-attr">avatar:</span> <span class="hljs-string">""</span>
<span class="hljs-comment">#是否开启分享</span>
<span class="hljs-attr">share:</span> <span class="hljs-literal">true</span>
<span class="hljs-comment">#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key</span>
<span class="hljs-comment">#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论</span>
<span class="hljs-attr">duoshuo:</span> <span class="hljs-literal">true</span>
<span class="hljs-comment">#是否开启云标签</span>
<span class="hljs-attr">tagcloud:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment">#是否开启友情链接</span>
<span class="hljs-comment">#不开启——</span>
<span class="hljs-comment">#friends: false</span>

<span class="hljs-comment">#是否开启“关于我”。</span>
<span class="hljs-comment">#不开启——</span>
<span class="hljs-comment">#aboutme: false</span>
<span class="hljs-comment">#开启——</span>
<span class="hljs-attr">aboutme:</span> <span class="hljs-string">我是谁，我从哪里来，我到哪里去？我就是我，是颜色不一样的吃货…</span>
</code></pre>
<h2 id="articleHeader12">其他高级使用技巧</h2>
<h4>绑定独立域名</h4>
<p><a href="http://www.net.cn/" rel="nofollow noreferrer" target="_blank">购买域名</a><br>在你的域名注册提供商那里配置DNS解析，获取GitHub的IP地址<a href="https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/" rel="nofollow noreferrer" target="_blank">点击</a>，进入source目录下，添加CNAME文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd source/
$ touch CNAME
$ vim CNAME # 输入你的域名
$ git add CNAME
$ git commit -m &quot;add CNAME&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">cd</span> <span class="hljs-built_in">source</span>/
$ touch CNAME
$ vim CNAME <span class="hljs-comment"># 输入你的域名</span>
$ git add CNAME
$ git commit -m <span class="hljs-string">"add CNAME"</span></code></pre>
<h4>使用图床</h4>
<p>使用<a href="http://www.qiniu.com/" rel="nofollow noreferrer" target="_blank">七牛云存储</a><br>自己在github上搭建的图床：<a href="http://jiji262.github.io/qiniuimgbed/" rel="nofollow noreferrer" target="_blank">http://jiji262.github.io/qiniuimgbed/</a> ，需要首先注册七牛账号使用。</p>
<h4>添加插件</h4>
<p>添加sitemap和feed插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install hexo-generator-feed
$ npm install hexo-generator-sitemap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install hexo-generator-feed
$ npm install hexo-generator-sitemap</code></pre>
<p>修改_config.yml，增加以下内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Extensions
Plugins:
- hexo-generator-feed
- hexo-generator-sitemap

#Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20

#sitemap
sitemap:
  path: sitemap.xml" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta"># Extensions</span>
<span class="hljs-symbol">Plugins:</span>
- hexo-generator-feed
- hexo-generator-sitemap

<span class="hljs-meta">#Feed Atom</span>
<span class="hljs-symbol">feed:</span>
<span class="hljs-symbol">  type:</span> atom
<span class="hljs-symbol">  path:</span> atom.xml
<span class="hljs-symbol">  limit:</span> <span class="hljs-number">20</span>

<span class="hljs-meta">#sitemap</span>
<span class="hljs-symbol">sitemap:</span>
<span class="hljs-symbol">  path:</span> sitemap.xml</code></pre>
<p>配完之后，就可以访问<code>http://jiji262.github.io/atom.xml</code>和<code>http://jiji262.github.io/sitemap.xml</code>，发现这两个文件已经成功生成了。</p>
<h4>添加404公益页面</h4>
<p>GitHub Pages有提供制作404页面的指引：<a href="https://help.github.com/articles/custom-404-pages" rel="nofollow noreferrer" target="_blank">Custom 404 Pages</a>。</p>
<p>直接在根目录下创建自己的404.html或者404.md就可以。但是自定义404页面仅对绑定顶级域名的项目才起作用，GitHub默认分配的二级域名是不起作用的，使用hexo server在本机调试也是不起作用的。</p>
<p>推荐使用<a href="http://www.qq.com/404/" rel="nofollow noreferrer" target="_blank">腾讯公益404</a>。</p>
<h4>添加about页面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ hexo new page &quot;about&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ hexo new page <span class="hljs-string">"about"</span></code></pre>
<p>之后在sourceaboutindex.md目录下会生成一个index.md文件，打开输入个人信息即可，如果想要添加版权信息，可以在文件末尾添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;font-size:12px;border-bottom: #ddd 1px solid; BORDER-LEFT: #ddd 1px solid; BACKGROUND: #f6f6f6; HEIGHT: 120px; BORDER-TOP: #ddd 1px solid; BORDER-RIGHT: #ddd 1px solid&quot;>
<div style=&quot;MARGIN-TOP: 10px; FLOAT: left; MARGIN-LEFT: 5px; MARGIN-RIGHT: 10px&quot;>
<IMG alt=&quot;&quot; src=&quot;https://avatars1.githubusercontent.com/u/168751?v=3&amp;s=140&quot; width=90 height=100>
</div>
<div style=&quot;LINE-HEIGHT: 200%; MARGIN-TOP: 10px; COLOR: #000000&quot;>
本文链接：<a href=&quot;<%= post.link %>&quot;><%= post.title %></a> <br/>
作者： 
<a href=&quot;http://jiji262.github.io/&quot;>令狐葱</a> <br/>出处： 
<a href=&quot;http://jiji262.github.io/&quot;>http://jiji262.github.io/</a>
<br/>本文基于<a target=&quot;_blank&quot; title=&quot;Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)&quot; href=&quot;http://creativecommons.org/licenses/by-sa/4.0/&quot;> 知识共享署名-相同方式共享 4.0 </a>
国际许可协议发布，欢迎转载，演绎或用于商业目的，但是必须保留本文的署名 
<a href=&quot;http://jiji262.github.io/&quot;>令狐葱</a>及链接。
</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:12px;border-bottom: #ddd 1px solid; BORDER-LEFT: #ddd 1px solid; BACKGROUND: #f6f6f6; HEIGHT: 120px; BORDER-TOP: #ddd 1px solid; BORDER-RIGHT: #ddd 1px solid"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"MARGIN-TOP: 10px; FLOAT: left; MARGIN-LEFT: 5px; MARGIN-RIGHT: 10px"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">IMG</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://avatars1.githubusercontent.com/u/168751?v=3&amp;s=140"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">90</span> <span class="hljs-attr">height</span>=<span class="hljs-string">100</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"LINE-HEIGHT: 200%; MARGIN-TOP: 10px; COLOR: #000000"</span>&gt;</span>
本文链接：<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%= post.link %&gt;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">post.title</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
作者： 
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://jiji262.github.io/"</span>&gt;</span>令狐葱<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>出处： 
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://jiji262.github.io/"</span>&gt;</span>http://jiji262.github.io/<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>本文基于<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://creativecommons.org/licenses/by-sa/4.0/"</span>&gt;</span> 知识共享署名-相同方式共享 4.0 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
国际许可协议发布，欢迎转载，演绎或用于商业目的，但是必须保留本文的署名 
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://jiji262.github.io/"</span>&gt;</span>令狐葱<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>及链接。
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>添加Fork me on Github</h4>
<p><a href="https://github.com/blog/273-github-ribbons" rel="nofollow noreferrer" target="_blank">获取代码</a>，选择你喜欢的代码添加到hexo/themes/yilia/layout/layout.ejs的末尾即可，注意要将代码里的you改成你的Github账号名。</p>
<h4>添加支付宝捐赠按钮及二维码支付</h4>
<h5>支付宝捐赠按钮</h5>
<p>在D:hexothemesyilialayout_widget目录下新建一个zhifubao.ejs文件，内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;asidetitle&quot;>打赏他</p>
<div>
<form action=&quot;https://shenghuo.alipay.com/send/payment/fill.htm&quot; method=&quot;POST&quot; target=&quot;_blank&quot; accept-charset=&quot;GBK&quot;>
    <br/>
    <input name=&quot;optEmail&quot; type=&quot;hidden&quot; value=&quot;your 支付宝账号&quot; />
    <input name=&quot;payAmount&quot; type=&quot;hidden&quot; value=&quot;默认捐赠金额(元)&quot; />
    <input id=&quot;title&quot; name=&quot;title&quot; type=&quot;hidden&quot; value=&quot;博主，打赏你的！&quot; />
    <input name=&quot;memo&quot; type=&quot;hidden&quot; value=&quot;你Y加油，继续写博客！&quot; />
    <input name=&quot;pay&quot; type=&quot;image&quot; value=&quot;转账&quot; src=&quot;http://7xig3q.com1.z0.glb.clouddn.com/alipay-donate-website.png&quot; />
</form>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"asidetitle"</span>&gt;</span>打赏他<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"https://shenghuo.alipay.com/send/payment/fill.htm"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"POST"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span> <span class="hljs-attr">accept-charset</span>=<span class="hljs-string">"GBK"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"optEmail"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"your 支付宝账号"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"payAmount"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"默认捐赠金额(元)"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"博主，打赏你的！"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"memo"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"你Y加油，继续写博客！"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pay"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"转账"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://7xig3q.com1.z0.glb.clouddn.com/alipay-donate-website.png"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>添加完该文件之后，要在D:/hexo/themes/yilia/_config.yml文件中启用，如下所示，添加zhifubao</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="widgets:
- category
- tag
- links
- tagcloud
- zhifubao
- rss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">widgets:
- category
- tag
- links
- tagcloud
- zhifubao
- rss</code></pre>
<h5>二维码捐赠</h5>
<p>首先需要到<a href="https://qr.alipay.com/paipai/open.htm" rel="nofollow noreferrer" target="_blank">这里</a>获取你的支付宝账户的二维码图片，支付宝提供了自定义功能，可以添加自定义文字。</p>
<p>我的二维码扫描捐赠添加在about页面，当然你也可以添加到其它页面，在D:hexoblogsourceabout下有index.md，打开，在适当位置添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<center>
欢迎您捐赠本站，您的支持是我最大的动力！
![][http://7xsxyo.com1.z0.glb.clouddn.com/2016/04/15/FoJ1F6Ht0CNaYuCdE2l52F-Fk9Vk202.png]
</center>
<br/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">center</span>&gt;</span>
欢迎您捐赠本站，您的支持是我最大的动力！
![][http://7xsxyo.com1.z0.glb.clouddn.com/2016/04/15/FoJ1F6Ht0CNaYuCdE2l52F-Fk9Vk202.png]
<span class="hljs-tag">&lt;/<span class="hljs-name">center</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span></code></pre>
<p><code>&lt;center&gt;</code>可以让图片居中显示，注意将图片链接地址换成你的即可。</p>
<h4>添加百度站内搜索</h4>
<p><a href="http://zhanzhang.baidu.com/guide/index" rel="nofollow noreferrer" target="_blank">点击进入</a>，点击其它工具-&gt;站内检索-&gt;现在使用-&gt;新建搜索引擎-&gt;查看代码，将代码里的id值复制，打开/d/hexo/themes/jacman/_config.xml，配置成如下即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="baidu_search:     ## http://zn.baidu.com/
  enable: true
  id: &quot;1433674487421172828&quot; ## e.g. &quot;783281470518440642&quot;  for your baidu search id
  site: http://zhannei.baidu.com/cse/search ## your can change to your site instead of the default site" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">baidu_search:</span>     <span class="hljs-comment">## http://zn.baidu.com/</span>
<span class="hljs-attr">  enable:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  id:</span> <span class="hljs-string">"1433674487421172828"</span> <span class="hljs-comment">## e.g. "783281470518440642"  for your baidu search id</span>
<span class="hljs-attr">  site:</span> <span class="hljs-attr">http://zhannei.baidu.com/cse/search</span> <span class="hljs-comment">## your can change to your site instead of the default site</span></code></pre>
<h4>使用不蒜子添加访客统计</h4>
<p>详情参考<a href="http://ibruce.info/2015/04/04/busuanzi/" rel="nofollow noreferrer" target="_blank">搞定你的网站计数</a>，具体做法很简单，就是在你的<code>themes/your themes/layout/_partial/footer.ejs</code>底部加入这段脚本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script async src=&quot;//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;script <span class="hljs-keyword">async</span> src=<span class="hljs-string">"//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>然后在<code>&lt;p class="copyright"&gt;&lt;/p&gt;</code>中间添加如下统计信息即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本站总访问量 <span id=&quot;busuanzi_value_site_pv&quot;></span> 次, 访客数 <span id=&quot;busuanzi_value_site_uv&quot;></span> 人次, 本文总阅读量 <span id=&quot;busuanzi_value_page_pv&quot;></span> 次" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">本站总访问量 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"busuanzi_value_site_pv"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 次, 访客数 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"busuanzi_value_site_uv"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 人次, 本文总阅读量 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"busuanzi_value_page_pv"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 次</code></pre>
<p>不蒜子的官方服务网站是<a href="http://service.ibruce.info/" rel="nofollow noreferrer" target="_blank">不蒜子</a>，目前最大的弊端就是不开放注册，所以对于运行了一段时间的网站，不蒜子的数据都是从1开始，没办法设置，只有等后期开放注册之后，登入网站才能对统计计数进行设置。</p>
<h2 id="articleHeader13">参考链接</h2>
<p><a href="https://hexo.io/" rel="nofollow noreferrer" target="_blank">Hexo主页</a><br><a href="http://ibruce.info/2013/11/22/hexo-your-blog/" rel="nofollow noreferrer" target="_blank">hexo你的博客</a><br><a href="http://codepub.cn/2015/04/06/Github-Pages-personal-blog-from-Octopress-to-Hexo/" rel="nofollow noreferrer" target="_blank">Github Pages个人博客，从Octopress转向Hexo</a><br><a href="http://www.jianshu.com/p/05289a4bc8b2" rel="nofollow noreferrer" target="_blank">如何搭建一个独立博客——简明Github Pages与Hexo教程</a><br><a href="https://wingjay.com/2015/12/07/%E5%A6%82%E4%BD%95%E5%9C%A8%E4%B8%80%E5%A4%A9%E4%B9%8B%E5%86%85%E6%90%AD%E5%BB%BA%E4%BB%A5%E4%BD%A0%E8%87%AA%E5%B7%B1%E5%90%8D%E5%AD%97%E4%B8%BA%E5%9F%9F%E5%90%8D%E7%9A%84%E5%BE%88cool%E7%9A%84%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/" rel="nofollow noreferrer" target="_blank">如何在一天之内搭建以你自己名字为域名又具备cool属性的个人博客</a><br><a href="http://mp.weixin.qq.com/s?__biz=MzI4MzE2MTQ5Mw==&amp;mid=401679929&amp;idx=1&amp;sn=bd752ae5ac550b4bf4dcccb1c12aa2b1&amp;scene=18#wechat_redirect" rel="nofollow noreferrer" target="_blank">手把手教你建github技术博客by hexo</a><br><a href="http://wowubuntu.com/markdown/index.html" rel="nofollow noreferrer" target="_blank">Markdown 语法说明 (简体中文版)</a></p>
<blockquote><p>本文原始链接：<a href="http://jiji262.github.io/2016/04/15/2016-04-15-hexo-github-pages-blog/" rel="nofollow noreferrer" target="_blank">手把手教你使用Hexo + Github Pages搭建个人独立博客</a>  <br>作者：<a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">令狐葱</a>  <br>本文基于 知识共享署名-相同方式共享 4.0 国际许可协议发布，欢迎转载，演绎或用于商业目的，但是必须保留本文的署名 <a href="https://github.com/jiji262" rel="nofollow noreferrer" target="_blank">令狐葱</a>及链接。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你使用Hexo + Github Pages搭建个人独立博客

## 原文链接
[https://segmentfault.com/a/1190000004947261](https://segmentfault.com/a/1190000004947261)

