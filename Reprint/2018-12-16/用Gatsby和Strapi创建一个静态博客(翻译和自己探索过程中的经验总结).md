---
title: '用Gatsby和Strapi创建一个静态博客(翻译和自己探索过程中的经验总结)' 
date: 2018-12-16 2:30:10
hidden: true
slug: 7a1w8m11fnp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">用Gatsby和Strapi创建一个静态博客(翻译和自己探索过程中的经验总结)</h1>
<blockquote>原文参阅: <a href="https://hackernoon.com/building-a-static-blog-using-gatsby-and-strapi-8b5acfc82ad8" rel="nofollow noreferrer" target="_blank">Building a static blog using Gatsby and Strapi</a>或<a href="https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/" rel="nofollow noreferrer" target="_blank">https://blog.strapi.io/buildi...</a>. 本篇主要是对其精华内容进行翻译, 以及实操过程中遇到的问题解决和探索. 一些具体的操作步骤和细节, 我将忽略, 结合原文一起阅读效果更佳!<p>注: 本文操作环境是Linux VPS, CentOS 6 64bit</p>
</blockquote>
<h2 id="articleHeader1">介绍</h2>
<p>这是一个包含很多静态内容页面的站点, 从技术上来说就如同一系列HTML文件, 展示给访问者. 与动态网站不同的是, 他不需要后端开发或者数据库支撑. 发布静态站点之所以容易, 是因为文件只需要上传到服务器或者存储器. 没有额外的渲染页面的请求, 也没有数据库被黑的风险, 所以它既安全也快速.</p>
<p>为了快速建站, 其实很多开源的静态页面生成框架可用, 比如前阵子我搞的Jekyll, Hugo, 好似国人偏爱的Hexo等等, 他们的工作原理相似, 内容都是通过静态文件(比如Markdown)或者带有内容的API, 通过获取这些内容, 注入到开发者做好的模板, 最后生成一大堆HTML文件.</p>
<p>Progressive Web Apps (PWA)实际上是网页应用, 几乎基于Javascript, 并且可靠, 快速, 有吸引力的. 这几年比较火的Angular, Vue, React都是类似的前端框架.</p>
<blockquote>静态站点遇见了PWA就产生了Gatsby</blockquote>
<p>将这两点组合起来的最佳选择看起来就是Gatsby了, 但是同样需要一个内容接口, 这就是我将要展示的, 通过Strapi创建一个内容API提供给Gatsby, 然后打包发布出一个静态站点.</p>
<h3 id="articleHeader2">Gatsby是什么</h3>
<p>这个并不是型男熟知的杰士派, 虽然我也用过这个发泥, 好像不是很好用. <strong><a href="https://www.gatsbyjs.org/" rel="nofollow noreferrer" target="_blank">Gatsby</a>是基于React的快速静态网站框架</strong>, 有了它, 你就可以感觉飘飘然的开发React网站了.</p>
<h3 id="articleHeader3">Strapi是什么</h3>
<p><a href="https://strapi.io/" rel="nofollow noreferrer" target="_blank">Strapi</a>是一个基于高级的Nodejs API内容管理框架. 听起来有点绕口, 通俗来说就是<strong>让你能简单, 安全, 高效的开发出强大API的开源的内容管理框架</strong>. 它是免费的, 人们都爱免费的, 可以随意在你的服务器上使用, 也非常具有可个性化, 可扩展性的玩意.</p>
<blockquote>我真想不到国内几乎没有人用Gatsby和Strapi, 百度上查不到任何资料...</blockquote>
<h2 id="articleHeader4">创建API</h2>
<p>见证奇迹的时刻即将到来, 我们快创建个Strapi API, 添加点内容吧!</p>
<h3 id="articleHeader5">创建Strapi项目</h3>
<blockquote>Requirements: please make sure <strong>Node 8</strong> (or higher) and <strong>MongoDB</strong> are installed and running on your machine.</blockquote>
<p>此时, 暗喜前阵子已经琢磨出来了并装好了<code>Node 8</code>, 不过装MongoDB就没有了. 因此这里就要插入一段关于MongoDB的内容了. 如果已经有了请自动跳过此内容.</p>
<h4>MongoDB安装及相关问题</h4>
<p>果断找到文档<a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/" rel="nofollow noreferrer" target="_blank">Install MongoDB Community Edition on Red Hat Enterprise or CentOS Linux</a>, 这个redhat和centOS应该是通用的吧- -! 看到<a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/#configure-the-package-management-system-yum" rel="nofollow noreferrer" target="_blank">Configure the package management system (yum).</a>, 发现原来还有这种操作, 创建repo文件, 来安装对应版本的软件. 闲话少说, 直接上代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# cd /etc/yum.repos.d/
# touch mongodb-org-3.6.repo
# vi mongodb-org-3.6.repo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># cd /etc/yum.repos.d/</span>
<span class="hljs-comment"># touch mongodb-org-3.6.repo</span>
<span class="hljs-comment"># vi mongodb-org-3.6.repo</span></code></pre>
<p>将以下内容copy进去保存</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code class="text"><span class="hljs-section">[mongodb-org-3.6]</span>
<span class="hljs-attr">name</span>=MongoDB Repository
<span class="hljs-attr">baseurl</span>=https://repo.mongodb.org/yum/redhat/<span class="hljs-variable">$releasever</span>/mongodb-org/<span class="hljs-number">3.6</span>/x<span class="hljs-number">86_64</span>/
<span class="hljs-attr">gpgcheck</span>=<span class="hljs-number">1</span>
<span class="hljs-attr">enabled</span>=<span class="hljs-number">1</span>
<span class="hljs-attr">gpgkey</span>=https://www.mongodb.org/static/pgp/server-<span class="hljs-number">3.6</span>.asc</code></pre>
<p>再进行安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# sudo yum install -y mongodb-org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># sudo yum install -y mongodb-org</span></code></pre>
<blockquote>如果有特殊需求, 请参阅上文提到的官方文档, 我这里装的是MongoDB Community Edition</blockquote>
<p>按以上步骤很快就装好了. 接下来启动mongod(如果没有启动的话), 如下命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# service mongod start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># service mongod start</span></code></pre>
<p>完成后, 我们接着<strong>创建Strapi项目</strong>的主题, 推荐安装<code>strapi@alpha</code>版本:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# npm i strapi@alpha -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># npm i strapi@alpha -g</span></code></pre>
<p>完成后, 去到你要创建本文项目的目录, 比如我这里的路径是<code>/home/web/</code>, 我在这里创建一个<code>gatsby-strapi-tutorial</code>目录:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# mkdir gatsby-strapi-tutorial" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># mkdir gatsby-strapi-tutorial</span></code></pre>
<p>在这里面搭一个API脚手架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# cd gatsby-strapi-tutorial
# strapi new api" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># cd gatsby-strapi-tutorial</span>
<span class="hljs-comment"># strapi new api</span></code></pre>
<p>进入项目目录, 并运行Node.js服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# cd api
# strapi start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># cd api</span>
<span class="hljs-comment"># strapi start</span></code></pre>
<h4>遇到了一些小问题</h4>
<p>这里突然时不时卡住了, 如果你很顺利, 那么可以跳过此内容, 频繁报错如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@whidy api]# strapi start
DEBUG (24910 on whidy): Server wasn't able to start properly.
ERROR (24910 on whidy): (hook:mongoose) takes too long to load" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">[root@whidy api]<span class="hljs-comment"># strapi start</span>
DEBUG (24910 on whidy): Server wasn<span class="hljs-string">'t able to start properly.
ERROR (24910 on whidy): (hook:mongoose) takes too long to load</span></code></pre>
<p>大概是网络原因, 我联通网络出问题, 换了电信几番尝试就好了.</p>
<blockquote>操作过程中频繁出现刚才的问题, 我觉得不是网络问题那么简单, 我打算从数据库方面着手完善一下试试, 当然后来证明, <strong>一切问题都与MongoDB无关</strong>, 所以下面缩进内容可以选择性阅读<p>大多数情况下我是不愿意理睬WARNING信息的, 只要不是ERROR就好, 但是这次我有点不爽, 后来折腾了半天发现有的很难处理, 好吧我错了, 我想我还是不死磕了吧?.</p>
</blockquote>
<ul>
<li>
<p>soft rlimits too low</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WARNING: soft rlimits too low. rlimits set to 1024 processes, 64000 files. Number of processes should be at least 32000 : 0.5 times number of files." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">WARNING: soft rlimits too low. rlimits <span class="hljs-built_in">set</span> to 1024 processes, 64000 files. Number of processes should be at least 32000 : 0.5 <span class="hljs-built_in">times</span> number of files.</code></pre>
<p>参阅:</p>
<ul>
<li><a href="http://blog.csdn.net/kk185800961/article/details/45613267" rel="nofollow noreferrer" target="_blank">MongDB 启动警告 WARNING: soft rlimits too low</a></li>
<li><a href="https://serverfault.com/questions/591812/how-to-set-ulimits-for-mongod" rel="nofollow noreferrer" target="_blank">How to set ulimits for mongod?</a></li>
</ul>
</li>
<li>
<p>versions of RHEL older than RHEL6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WARNING: You are running in OpenVZ which can cause issues on versions of RHEL older than RHEL6." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">WARNING: You are running <span class="hljs-keyword">in</span> OpenVZ <span class="hljs-built_in">which</span> can cause issues on versions of RHEL older than RHEL6.</code></pre>
<p>服务器硬件限制? 可以安全忽略.</p>
<p>参阅: <a href="https://groups.google.com/forum/#!msg/mongodb-user/61NFaGlyxcs/YGkIGv5RDgAJ" rel="nofollow noreferrer" target="_blank">WARNING: You are running in OpenVZ which can cause issues on versions of RHEL older than RHEL6.</a></p>
</li>
<li>
<p>Access Control<br>以为要搞账户什么的, 然后运行<code>mongo</code>命令, 创建了一个admin账户:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# mango
> use admin
> db.createUser(
    {
      user: &quot;username&quot;,
      pwd: &quot;userpassword&quot;,
      roles: [ { role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; } ]
    }
  )
# mongo --port 27017 -u &quot;username&quot; -p &quot;userpassword&quot; --authenticationDatabase &quot;admin&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># mango</span>
&gt; use admin
&gt; db.createUser(
    {
      user: <span class="hljs-string">"username"</span>,
      <span class="hljs-built_in">pwd</span>: <span class="hljs-string">"userpassword"</span>,
      roles: [ { role: <span class="hljs-string">"userAdminAnyDatabase"</span>, db: <span class="hljs-string">"admin"</span> } ]
    }
  )
<span class="hljs-comment"># mongo --port 27017 -u "username" -p "userpassword" --authenticationDatabase "admin"</span></code></pre>
<p>其实我自己当时也不知道是搞啥, 其实完全没关系的操作. 很多人甚至官方文档<a href="https://docs.mongodb.com/master/tutorial/enable-authentication/#start-mongodb-without-access-control" rel="nofollow noreferrer" target="_blank">Start MongoDB without access control.</a>也提到:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongod --port 27017 --dbpath /data/db1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">mongod --port 27017 --dbpath /data/db1</code></pre>
<p>可是我一直报错, 要么说不存在, 搞半天才明白, <strong>要手动创建</strong>, 创建好了, 又说服务被占用, <code>service mongod stop</code>停了服务, 连上去了, <code>show dbs</code>发现跟之前的又不一样, 没有找到我之前看到的<code>strapi</code>库, 才恍然大悟, 原来其实我创建了一个跟之前无关的库...</p>
<p>事实上, 启动mongod服务的时候, 它连接了一个默认配置库, 这个库的路径时早就创建好的, 通过查看<code>/etc/mongod.conf</code>这个文件就知道了. 因此删了那个没用的db目录. 接着操作.</p>
<p>后来第二天早上, 再次执行<code>strapi start</code>很顺利. 我也没办法再研究昨天究竟是为什么总是连不上了. 反正就是渣渣网络经常会带来各种坑!?, 这段没什么作用的内容就过去了.</p>
</li>
</ul>
<p>回到刚才<code>strapi start</code>, 成功之后, 我们如果是本地操作的, 带有界面的操作系统的话就可以直接访问<a href="http://localhost:1337/admin" rel="nofollow noreferrer" target="_blank">http://localhost:1337/admin</a>了, 如果也是远程操作, 就改成IP就好了.</p>
<blockquote>接下来的操作是创建用户, 原文已经图文并茂, 傻子都能看懂的步骤了, 由于篇幅过大, 我就简单翻译一下, 不详细复述了嘿嘿~</blockquote>
<p>按照原文操作:</p>
<ol>
<li>创建管理员账号(Create your first User)</li>
<li>创建内容类型(Create a Content Type)<br>名为<code>article</code>的内容类型有三个字段: <code>title</code>(字符串), <code>content</code>(文本), <code>author</code>(关系, 多文章对应一个用户).</li>
<li>
<p>添加几项内容到数据库</p>
<ol>
<li>访问文章列表页</li>
<li>点击<code>Add New Article</code>
</li>
<li>插入值, 连接对应的作者并保存</li>
<li>重复以上操作, 创建额外两篇文章</li>
</ol>
</li>
<li>允许API权限, 依原文对应勾选保存</li>
</ol>
<p>完成后, 就可以访问<a href="http://localhost:1337/article" rel="nofollow noreferrer" target="_blank">http://localhost:1337/article</a>了.</p>
<h2 id="articleHeader6">创建静态站</h2>
<blockquote>到目前, 你的API搞定了, 我们要搞静态网站啦</blockquote>
<h3 id="articleHeader7">安装Gatsby</h3>
<p>首先, 全局安装Gatsby CLI:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# npm install --global gatsby-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># npm install --global gatsby-cli</span></code></pre>
<h3 id="articleHeader8">生成Gatsby项目</h3>
<p>回到之前提到的<code>gatsby-strapi-tutorial</code>目录, 创建一个新博客:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# gatsby new blog" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># gatsby new blog</span></code></pre>
<blockquote>事情总是不是那么顺利.</blockquote>
<p>报错, 需要<code>git</code>. 然而我的这台崭新的服务器还没装, 那就装一个吧.</p>
<blockquote>如果你的git已经部署OK, 并且上面这个操作没有问题, 以下内容可忽略:</blockquote>
<p>参考<a href="https://git-scm.com/download/linux" rel="nofollow noreferrer" target="_blank">Download for Linux and Unix</a>执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# yum install git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># yum install git</span></code></pre>
<p>再次执行后依旧报错(当前git版本<code>1.7.1</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="error Command failed: git clone git://github.com/gatsbyjs/gatsby-starter-default.git blog --single-branch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">error Command failed: git <span class="hljs-built_in">clone</span> git://github.com/gatsbyjs/gatsby-starter-default.git blog --single-branch</code></pre>
<p>推测是版本问题. 只好手动安装了. 于是又找到这个<a href="https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git" rel="nofollow noreferrer" target="_blank">安装 Git</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
# wget https://www.kernel.org/pub/software/scm/git/git-2.16.1.tar.gz
# tar -zxf git-2.16.1.tar.gz
# cd git-2.16.1
# make prefix=/usr/local all
# sudo make prefix=/usr/local install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel</span>
<span class="hljs-comment"># wget https://www.kernel.org/pub/software/scm/git/git-2.16.1.tar.gz</span>
<span class="hljs-comment"># tar -zxf git-2.16.1.tar.gz</span>
<span class="hljs-comment"># cd git-2.16.1</span>
<span class="hljs-comment"># make prefix=/usr/local all</span>
<span class="hljs-comment"># sudo make prefix=/usr/local install</span></code></pre>
<p>漫长的<code>make prefix=/usr/local all</code>之后, 提示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    SUBDIR perl
/usr/bin/perl Makefile.PL PREFIX=\'/usr/local\' INSTALL_BASE=\'\' --localedir=\'/usr/local/share/locale\'
Can\'t locate ExtUtils/MakeMaker.pm in @INC (@INC contains: /usr/local/lib64/perl5 /usr/local/share/perl5 /usr/lib64/perl5/vendor_perl /usr/share/perl5/vendor_perl /usr/lib64/perl5 /usr/share/perl5 .) at Makefile.PL line 3.
BEGIN failed--compilation aborted at Makefile.PL line 3.
make[1]: *** [perl.mak] Error 2
make: *** [perl/perl.mak] Error 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    SUBDIR perl
/usr/bin/perl Makefile.PL PREFIX=\<span class="hljs-string">'/usr/local\'</span> INSTALL_BASE=\<span class="hljs-string">'\'</span> --localedir=\<span class="hljs-string">'/usr/local/share/locale\'</span>
Can\<span class="hljs-string">'t locate ExtUtils/MakeMaker.pm in @INC (@INC contains: /usr/local/lib64/perl5 /usr/local/share/perl5 /usr/lib64/perl5/vendor_perl /usr/share/perl5/vendor_perl /usr/lib64/perl5 /usr/share/perl5 .) at Makefile.PL line 3.
BEGIN failed--compilation aborted at Makefile.PL line 3.
make[1]: *** [perl.mak] Error 2
make: *** [perl/perl.mak] Error 2</span></code></pre>
<p>蛋疼, 等了半天, 又要解决这个问题, 好在看起来比较容易处理, 参考<a href="https://github.com/qsnake/qsnake/issues/12" rel="nofollow noreferrer" target="_blank">git fails to build in Fedora 14</a>, 然后继续执行最后两条<code>make</code>命令, 虽然最后出来很多看起来很奇怪的内容, 不过似乎是成功了. 执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# git --version
git version 2.16.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># git --version</span>
git version 2.16.1</code></pre>
<p>接下来我们再一次执行<code>gatsby new blog</code>, 我擦还提示刚才的<code>...single-branch</code>的error, 这就坑爹了- -. 经过简短的排查. 原来似乎他还是跑的旧版git, 需要删掉之前yum自动安装的<code>git 1.7.1</code>, 我单纯的以为直接自动升级了. 于是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# yum remove git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># yum remove git</span></code></pre>
<p>按照提示删除成功后, 再次检测git还是ok的, 这次我第三次执行<code>gatsby new blog</code>, 终于成功了!</p>
<blockquote>我这小白也不知道linux软件管理是咋整的. 反正能继续执行卡了我半天的gatsby就好了吧...<p>每次创建速度很慢, 执行<code>gatsby new blog</code>完成的时候提示<code>added 1398 packages in 137.652s</code>, 大概就是2分钟多, 可能是安装依赖包费时吧</p>
</blockquote>
<h3 id="articleHeader9">启动开发模式</h3>
<p>创建成功后, 接着操作, 进入博客目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# cd blog" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># cd blog</span></code></pre>
<p>启动服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# gatsby develop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># gatsby develop</span></code></pre>
<p>理论上你就可以通过<a href="http://localhost:8000" rel="nofollow noreferrer" target="_blank">http://localhost:8000</a>访问到默认的效果博客站点了.</p>
<blockquote>
<p>然而又一次出现小插曲, 如果你是和我一样<strong>远程访问</strong>, 也许以下内容对你有用</p>
<p>每次执行<code>gatsby develop</code>的时间甚至更长, 完成时提示如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="info bootstrap finished - 334.876 s

DONE  Compiled successfully in 90373ms 21:15:06


You can now view gatsby-starter-default in the browser.

http://localhost:8000/

View GraphiQL, an in-browser IDE, to explore your site's data and schema

http://localhost:8000/___graphql

Note that the development build is not optimized.
To create a production build, use gatsby build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">info bootstrap finished - 334.876 s

DONE  Compiled successfully <span class="hljs-keyword">in</span> 90373ms 21:15:06


You can now view gatsby-starter-default <span class="hljs-keyword">in</span> the browser.

http://localhost:8000/

View GraphiQL, an <span class="hljs-keyword">in</span>-browser IDE, to explore your site<span class="hljs-string">'s data and schema

http://localhost:8000/___graphql

Note that the development build is not optimized.
To create a production build, use gatsby build</span></code></pre>
<p>大概用了6分钟左右, 糟糕的是并不能通过远程<strong>IP</strong>来访问! 查看了目录下的配置文件和官方文档, 也没查到. 绝望之时, 突然在大量资料中看到webpack也有这样的问题, 想起来之前webpack的server默认配置也是无法通过ip访问, 但是webpack的<code>devServer</code>配置<code>host: "0.0.0.0"</code>即可, 试了下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# gatsby develop --host 0.0.0.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># gatsby develop --host 0.0.0.0</span></code></pre>
<p>又经过4分钟左右漫长等待, 这次成功了! 不过我尝试搜索Gatsby究竟用的什么服务器启动, 为何不能像webpack那样加一段配置呢, 却没有找到. 后来凑巧找到了一篇webpack下的issue, <a href="https://github.com/webpack/webpack-dev-server/issues/147" rel="nofollow noreferrer" target="_blank">Server can't be accessed via IP</a>, 有人提到过这条命令.</p>
</blockquote>
<p>因此, 从小插曲中来看, 远程访问控制的开发者, 需要加个参数, 具体命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# gatsby develop --host 0.0.0.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># gatsby develop --host 0.0.0.0</span></code></pre>
<p>这样, 至此开发模式服务器搞定.</p>
<h2 id="articleHeader10">安装Strapi插件(Install the Strapi source plugin)</h2>
<blockquote>Gatsby understands this pretty well. So its creators decided to build a specific and independent layer: the data layer. This entire system is strongly powered by GraphQL.</blockquote>
<p>前面有一些插件介绍不多说了, 执行安装:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# npm install --save gatsby-source-strapi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"><span class="hljs-comment"># npm install --save gatsby-source-strapi</span></code></pre>
<p>完成后, 需要做些配置, 修改<code>gatsby-config.js</code>文件, 替换成以下内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          `article`,
          `user`
        ]
      },
    },
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">siteMetadata</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">`Gatsby Default Starter`</span>,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-string">`gatsby-plugin-react-helmet`</span>,
    {
      <span class="hljs-attr">resolve</span>: <span class="hljs-string">`gatsby-source-strapi`</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">apiURL</span>: <span class="hljs-string">`http://localhost:1337`</span>,
        <span class="hljs-attr">contentTypes</span>: [ <span class="hljs-comment">// List of the Content Types you want to be able to request from Gatsby.</span>
          <span class="hljs-string">`article`</span>,
          <span class="hljs-string">`user`</span>
        ]
      },
    },
  ],
}</code></pre>
<p>保存后, 重启Gatsby服务器</p>
<h3 id="articleHeader11">文章列表</h3>
<p>为了在首页显示文章列表, 我们需要修改首页代码如下:</p>
<p>路径: <code>src/pages/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import Link from 'gatsby-link'
const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
    <Link to=&quot;/page-2/&quot;>Go to page 2</Link>
  </div>
)
export default IndexPage
export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'gatsby-link'</span>
<span class="hljs-keyword">const</span> IndexPage = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hi people<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome to your new Gatsby site.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Now go build something great.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {data.allStrapiArticle.edges.map(document =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{document.node.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/${<span class="hljs-attr">document.node.id</span>}`}&gt;</span>{document.node.title}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{document.node.content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/page-2/"</span>&gt;</span>Go to page 2<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> IndexPage
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> pageQuery = graphql<span class="hljs-string">`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`</span></code></pre>
<p>这里就应用到了GraphQL啦, 好激动呢. 我们导出<code>pageQuery</code>, 一个GraphQL查询会请求文章列表, 我们只需要将需要查询的字段添加进去就好了~</p>
<p>然后我们传递<code>{ data }</code>这个结构对象作为<code>IndexPage</code>参数, 遍历它的<code>allStrapiArticles</code>对象, 来展示数据.</p>
<blockquote>GraphQL查询可以快速生成, 你可以尝试在<a href="http://localhost:8000/___graphql" rel="nofollow noreferrer" target="_blank">http://localhost:8000/___graphql</a>修改, 并测试.</blockquote>
<h3 id="articleHeader12">文章页</h3>
<p>首页有了列表之后, 我们还要访问文章页面呢, 接下来写一个模板:</p>
<p>路径: <code>src/templates/article.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import Link from 'gatsby-link'
const ArticleTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    <p>{data.strapiArticle.content}</p>
  </div>
)
export default ArticleTemplate
export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      author {
        id
        username
      }
    }
  }
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'gatsby-link'</span>
<span class="hljs-keyword">const</span> ArticleTemplate = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{data.strapiArticle.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>by <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">authors</span>/${<span class="hljs-attr">data.strapiArticle.author.id</span>}`}&gt;</span>{data.strapiArticle.author.username}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{data.strapiArticle.content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ArticleTemplate
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> query = graphql<span class="hljs-string">`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      author {
        id
        username
      }
    }
  }
`</span></code></pre>
<p>你需要手动创建这个目录和文件, 当然Gatsby并不知道模板何时展示. 每篇文章都需要一个特别的URL, 感谢Gatsby提供的<a href="https://www.gatsbyjs.org/docs/creating-and-modifying-pages" rel="nofollow noreferrer" target="_blank"><code>createPage</code></a>函数.</p>
<p>首先, 我们写个<code>makeRequest</code>函数来处理GraphQL请求. 然后通过<code>createPage</code>函数使我们在获取的文章列表后为它们创建一个页面, 路径为文章id的URL, 回到<code>blog</code>目录, 修改<code>gatsby-node.js</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(`path`);
const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  // Query for articles nodes to use in creating pages.
  return getArticles;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">`path`</span>);
<span class="hljs-keyword">const</span> makeRequest = <span class="hljs-function">(<span class="hljs-params">graphql, request</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-comment">// Query for nodes to use in creating pages.</span>
  resolve(
    graphql(request).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (result.errors) {
        reject(result.errors)
      }
      <span class="hljs-keyword">return</span> result;
    })
  )
});
<span class="hljs-comment">// Implement the Gatsby API “createPages”. This is called once the</span>
<span class="hljs-comment">// data layer is bootstrapped to let plugins create pages from data.</span>
exports.createPages = <span class="hljs-function">(<span class="hljs-params">{ boundActionCreators, graphql }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { createPage } = boundActionCreators;
  <span class="hljs-keyword">const</span> getArticles = makeRequest(graphql, <span class="hljs-string">`
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Create pages for each article.</span>
    result.data.allStrapiArticle.edges.forEach(<span class="hljs-function">(<span class="hljs-params">{ node }</span>) =&gt;</span> {
      createPage({
        <span class="hljs-attr">path</span>: <span class="hljs-string">`/<span class="hljs-subst">${node.id}</span>`</span>,
        <span class="hljs-attr">component</span>: path.resolve(<span class="hljs-string">`src/templates/article.js`</span>),
        <span class="hljs-attr">context</span>: {
          <span class="hljs-attr">id</span>: node.id,
        },
      })
    })
  });
  <span class="hljs-comment">// Query for articles nodes to use in creating pages.</span>
  <span class="hljs-keyword">return</span> getArticles;
};</code></pre>
<p>再次重启Gatsby服务器.</p>
<p>现在你就能通过点击首页的文章进入到文章内容页面了.</p>
<h3 id="articleHeader13">作者页</h3>
<p>虽然这个似乎并不重要, 不过还是加上学习一下吧?</p>
<p>添加作者页和创建文章页很相似, 我们还是先创建个模板:</p>
<p>路径: <code>src/templates/user.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import Link from 'gatsby-link'
const UserTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiUser.username}</h1>
    <ul>
      {data.strapiUser.articles.map(article => (
        <li key={article.id}>
          <h2>
            <Link to={`/${article.id}`}>{article.title}</Link>
          </h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  </div>
)
export default UserTemplate
export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">'gatsby-link'</span>
<span class="hljs-keyword">const</span> UserTemplate = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{data.strapiUser.username}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {data.strapiUser.articles.map(article =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{article.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/${<span class="hljs-attr">article.id</span>}`}&gt;</span>{article.title}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{article.content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> UserTemplate
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> query = graphql<span class="hljs-string">`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
`</span></code></pre>
<p>然后再次修改<code>gatsby-node.js</code>来创建作者URLs:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(`path`);
const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  const getAuthors = makeRequest(graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getAuthors,
  ])
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">`path`</span>);
<span class="hljs-keyword">const</span> makeRequest = <span class="hljs-function">(<span class="hljs-params">graphql, request</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-comment">// Query for article nodes to use in creating pages.</span>
  resolve(
    graphql(request).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (result.errors) {
        reject(result.errors)
      }
      <span class="hljs-keyword">return</span> result;
    })
  )
});

<span class="hljs-comment">// Implement the Gatsby API “createPages”. This is called once the</span>
<span class="hljs-comment">// data layer is bootstrapped to let plugins create pages from data.</span>
exports.createPages = <span class="hljs-function">(<span class="hljs-params">{ boundActionCreators, graphql }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { createPage } = boundActionCreators;
  <span class="hljs-keyword">const</span> getArticles = makeRequest(graphql, <span class="hljs-string">`
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Create pages for each article.</span>
    result.data.allStrapiArticle.edges.forEach(<span class="hljs-function">(<span class="hljs-params">{ node }</span>) =&gt;</span> {
      createPage({
        <span class="hljs-attr">path</span>: <span class="hljs-string">`/<span class="hljs-subst">${node.id}</span>`</span>,
        <span class="hljs-attr">component</span>: path.resolve(<span class="hljs-string">`src/templates/article.js`</span>),
        <span class="hljs-attr">context</span>: {
          <span class="hljs-attr">id</span>: node.id,
        },
      })
    })
  });
  <span class="hljs-keyword">const</span> getAuthors = makeRequest(graphql, <span class="hljs-string">`
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `</span>).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// Create pages for each user.</span>
    result.data.allStrapiUser.edges.forEach(<span class="hljs-function">(<span class="hljs-params">{ node }</span>) =&gt;</span> {
      createPage({
        <span class="hljs-attr">path</span>: <span class="hljs-string">`/authors/<span class="hljs-subst">${node.id}</span>`</span>,
        <span class="hljs-attr">component</span>: path.resolve(<span class="hljs-string">`src/templates/user.js`</span>),
        <span class="hljs-attr">context</span>: {
          <span class="hljs-attr">id</span>: node.id,
        },
      })
    })
  });
  <span class="hljs-comment">// Queries for articles and authors nodes to use in creating pages.</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([
    getArticles,
    getAuthors,
  ])
};</code></pre>
<p>重启服务器, 刷新页面, Wow! 大功告成! 时不时很酷!!!</p>
<h2 id="articleHeader14">原文总结</h2>
<p>恭喜, 你成功的创建了一个超快的很好维护的博客! 然后各种夸奖Blabla</p>
<p>接下来做什么呢? 你可以去更多的挖掘Gatsby和Strapi的各种优点, 你可以试着增加这些功能:</p>
<ul>
<li>作者列表</li>
<li>文章分类</li>
<li>用Strapi API创建评论系统, 或者直接用Disqus</li>
<li>当然你也可以试着搞其他站点, 例如电商站, 企业站等等</li>
</ul>
<p>当然为了进一步方便开发, 你可能需要一个方便的发布在网上的存储载体, Blablabla...</p>
<p>本教程<a href="https://github.com/strapi/strapi-examples/tree/master/gatsby-strapi-tutorial" rel="nofollow noreferrer" target="_blank">GitHub源码地址</a>, 你可以clone下来, 运行<code>npm run setup</code>, blablabla... 我是个爱研究的人, 我要一步步操作, 才不要clone.</p>
<h2 id="articleHeader15">个人总结</h2>
<p>这次通过Gatsby和Strapi搭建一个简单的博客站点, 还是挺不容易的, 总共花了将近两天的时间. 不过个人感觉还是值得的! 其中有很多地方是可以更加深入的学习和了解的, 这也算初步接触了react, mongodb, graphQL等相关知识实操, 同时也可以在后期完善更多的功能, 了解并学习一些ES6, 模板的写法技巧等等. 也希望通过此次研究以后能更进一步熟悉其他框架, 数据库, 后端等思想~</p>
<blockquote>
<p>相关参阅汇总</p>
<ul>
<li>本文操作参考<a href="https://hackernoon.com/building-a-static-blog-using-gatsby-and-strapi-8b5acfc82ad8" rel="nofollow noreferrer" target="_blank">Building a static blog using Gatsby and Strapi</a>或<a href="https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/" rel="nofollow noreferrer" target="_blank">https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/</a>(如果前面的那个无法访问)</li>
<li>Gatsby官方<a href="https://www.gatsbyjs.org/docs/" rel="nofollow noreferrer" target="_blank">使用手册</a>和<a href="https://www.gatsbyjs.org/tutorial/" rel="nofollow noreferrer" target="_blank">开发教程</a>
</li>
<li><a href="https://strapi.io/documentation/" rel="nofollow noreferrer" target="_blank">Strapi文档</a></li>
<li>
<a href="https://docs.mongodb.com/" rel="nofollow noreferrer" target="_blank">MongoDB 3.6官方手册</a>和runoob上的<a href="http://www.runoob.com/mongodb/mongodb-tutorial.html" rel="nofollow noreferrer" target="_blank">MongoDB 教程</a>
</li>
</ul>
<p>最后打个小广告, 我有个GitHub项目, 用于记录我每天学习或者瞎折腾的技术, 范围不限, 有兴趣可以star我的<a href="https://github.com/whidy/daily" rel="nofollow noreferrer" target="_blank">whidy daily</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Gatsby和Strapi创建一个静态博客(翻译和自己探索过程中的经验总结)

## 原文链接
[https://segmentfault.com/a/1190000012993582](https://segmentfault.com/a/1190000012993582)

