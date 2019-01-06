---
title: 'Docker部署基于Nodejs的Web应用-实战篇' 
date: 2019-01-05 2:30:10
hidden: true
slug: g10wper34i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Docker</h3>
<p><a href="https://www.docker.com/" rel="nofollow noreferrer" target="_blank">docker</a>是一个开源的应用容器引擎，可以为我们提供安全、可移植、可重复的自动化部署的方式。docker采用虚拟化的技术来虚拟化出应用程序的运行环境。此种方式具有以下优势：</p>
<ul>
<li><p>每个部署的应用程序都是一个容器，彼此隔离，互不影响；</p></li>
<li><p>服务器只需要安装docker即可运行构建好的应用程序镜像，不会涉及复杂的服务器环境配置，因为配置都在特定的应用程序所在的镜像中去配置即可；</p></li>
<li><p>简化了自动化部署和运维的繁琐流程，只需将构建好的镜像load到服务器的docker中即可运行我们的应用程序；</p></li>
<li><p>可以充分利用服务器的系统资源，一台服务器上可以同时运行多个容器；</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010541795" src="https://static.alili.tech/img/remote/1460000010541795" alt="architecture" title="architecture" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>docker采用的是c/s架构，Client通过接口与Server进程通信实现容器的构建，运行和发布。docker比较重要的三个核心概念如下：</p>
<ul>
<li><p>镜像（images）：一个只读的模板，可以理解为应用程序的运行环境，包含了程序运行所依赖的环境和基本配置，镜像可以按照层级（从基础镜像开始）来构建，每一层包含特定的环境。</p></li>
<li><p>仓库（repository）：一个用于存放镜像文件的仓库，如果你对git的仓库熟悉，应该很容易理解，对，就是那个。有私有仓库和公有仓库之分。</p></li>
<li><p>容器（container）：一个运行应用程序的虚拟容器，在我们运行镜像时产生。容器包含自己的文件系统+隔离的进程空间和包含其中的进程。</p></li>
</ul>
</blockquote>
<h3 id="articleHeader1">前言</h3>
<p>sharplook是一款通过大数据分析来解决客户在监控系统中存在的数据采集难、解析难、处理难的IT运维产品。在给客户部署产品的过程中涉及到比较多的环境配置和组件安装以及复杂的依赖项，这些繁琐的流程降低了安装部署的效率和产品质量。基于此，我们开发了一款可以快速便捷的安装部署套件，提供一种漂亮的安装部署流程。产品采用 <a href="https://zh.nuxtjs.org/" rel="nofollow noreferrer" target="_blank">Nuxt</a> + <a href="http://koa.bootcss.com/" rel="nofollow noreferrer" target="_blank">Koa</a> 的基础架构进行开发，其中采用nuxt来提供SSR（服务端渲染）功能，Nuxt.js是基于Vue.js的通用架构，其中集成了以下组件：</p>
<ul>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue2</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">Vue-Router</a></p></li>
<li><p><a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">Vuex</a></p></li>
<li><p><a href="https://github.com/declandewet/vue-meta" rel="nofollow noreferrer" target="_blank">Vue-Meta</a></p></li>
</ul>
<p>另外，Nuxt.js 使用 Webpack 和 vue-loader 、 babel-loader 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。</p>
<p>我们项目使用Nuxt.js作为中间件来进行UI渲染，使用Koa启动我们自己的服务器，koa2 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。</p>
<p>关于如何快速搭建这样一个项目，小生之前在<a href="https://segmentfault.com/a/1190000010460705?_ea=2317938">《vue-cli “从入门到放弃”》</a>中介绍过vue-cli的使用，这个项目我们通过vue-cli工具，使用 <code>nuxt-community/koa-template</code> 模板，<code>vue init nuxt-community/koa-template</code>快速构建出来。具体的代码逻辑，在此不做赘述。</p>
<p>关于为什么选择docker来部署我们的node服务，前面已经介绍了，我们基于node的web应用涉及到的部署环境并不复杂，仅仅需要Node.js作为平台即可，由于依赖的包文件太多，而且比较大，业界还没有特别好用的开源node打包工具。做前端的同学都知道，<a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a>是一个功能强大的资源加载构建的打包工具，只需要将项目文件打包到一个dist文件下，打包后的文件体量小，解决了文件之间的依赖问题，提取出公共代码库，生产环境只需要部署dist文件夹即可。然而，Nodejs程序涉及到的依赖包，和资源却没法进行打包，node服务开启后仅仅是一个node进程而已。那么我们如何部署node程序呢？既然没法打包，只能将其全部文件进行部署（虽然可能存在别的问题，小生也在研究中，大神可以给点建议），于是小生就希望将其放入docker中去部署，免去生产环境node版本不一致等问题。下面小生就将如何用docker来部署Node项目的过程分享给诸位。</p>
<h3 id="articleHeader2">实战</h3>
<p>以下将进入战备状态，请同志们准备好大脑和电脑，跟着我左手、右手一个慢动作。</p>
<h4>环境准备</h4>
<ul>
<li><p>安装docker，未安装的同学，请根据自己的开发环境采用不同的安装方式去安装，具体操作参考<a href="https://docs.docker.com/engine/installation/" rel="nofollow noreferrer" target="_blank">教程</a>，不做赘述。</p></li>
<li><p>安装成功后，可以通过<code>docker -v</code>查看版本号（尽量使用最新的稳定版本）。</p></li>
</ul>
<h4>项目准备</h4>
<ul>
<li>
<p>在你的项目根目录下，添加Dockerfile文件，此文件用来配置我们自定义一个镜像所需要指定的依赖项、环境以及执行的命令等。内容格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" # 指定我们的基础镜像是node，版本是v8.0.0
 FROM node:8.0.0
 # 指定制作我们的镜像的联系人信息（镜像创建者）
 MAINTAINER EOI
 
 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 ADD . /app/
 # cd到app文件夹下
 WORKDIR /app
 
 # 安装项目依赖包
 RUN npm install
 RUN npm rebuild node-sass --force
 
 # 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 8000
 
 # 容器对外暴露的端口号
 EXPOSE 8000
 
 # 容器启动时执行的命令，类似npm run start
 CMD [&quot;npm&quot;, &quot;start&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell"> <span class="hljs-comment"># 指定我们的基础镜像是node，版本是v8.0.0</span>
 <span class="hljs-keyword">FROM</span> node:<span class="hljs-number">8.0</span>.<span class="hljs-number">0</span>
 <span class="hljs-comment"># 指定制作我们的镜像的联系人信息（镜像创建者）</span>
 <span class="hljs-keyword">MAINTAINER</span> EOI
 
 <span class="hljs-comment"># 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下</span>
 <span class="hljs-keyword">ADD</span><span class="bash"> . /app/
</span> <span class="hljs-comment"># cd到app文件夹下</span>
 <span class="hljs-keyword">WORKDIR</span><span class="bash"> /app
</span> 
 <span class="hljs-comment"># 安装项目依赖包</span>
 <span class="hljs-keyword">RUN</span><span class="bash"> npm install
</span> <span class="hljs-keyword">RUN</span><span class="bash"> npm rebuild node-sass --force
</span> 
 <span class="hljs-comment"># 配置环境变量</span>
 <span class="hljs-keyword">ENV</span> HOST <span class="hljs-number">0.0</span>.<span class="hljs-number">0.0</span>
 <span class="hljs-keyword">ENV</span> PORT <span class="hljs-number">8000</span>
 
 <span class="hljs-comment"># 容器对外暴露的端口号</span>
 <span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">8000</span>
 
 <span class="hljs-comment"># 容器启动时执行的命令，类似npm run start</span>
 <span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"npm"</span>, <span class="hljs-string">"start"</span>]
</span></code></pre>
</li>
<li>
<p>关于<code>Dockerfile</code>文件中的关键字，解释如下：</p>
<ul>
<li>
<p>FROM</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：FROM <image>[:<tag>]
解释：设置要制作的镜像基于哪个镜像，FROM指令必须是整个Dockerfile的第一个指令，如果指定的镜像不存在默认会自动从Docker Hub上下载。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>语法：FROM &lt;image&gt;[<span class="hljs-symbol">:&lt;tag&gt;</span>]
解释：设置要制作的镜像基于哪个镜像，FROM指令必须是整个Dockerfile的第一个指令，如果指定的镜像不存在默认会自动从Docker Hub上下载。</code></pre>
</li>
<li>
<p>MAINTAINER</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：MAINTAINER <name>
解释：MAINTAINER指令允许你给将要制作的镜像设置作者信息。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>语法：<span class="hljs-keyword">MAINTAINER</span> &lt;name&gt;
解释：<span class="hljs-keyword">MAINTAINER</span>指令允许你给将要制作的镜像设置作者信息。</code></pre>
</li>
<li>
<p>ADD</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：ADD <src> <dest>
解释：ADD指令用于从指定路径拷贝一个文件或目录到容器的指定路径中，<src>是一个文件或目录的路径，也可以是一个url，路径是相对于该Dockerfile文件所在位置的相对路径，<dest>是目标容器的一个绝对路径。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>语法：<span class="hljs-keyword">ADD</span><span class="bash"> &lt;src&gt; &lt;dest&gt;
</span>解释：<span class="hljs-keyword">ADD</span><span class="bash">指令用于从指定路径拷贝一个文件或目录到容器的指定路径中，&lt;src&gt;是一个文件或目录的路径，也可以是一个url，路径是相对于该Dockerfile文件所在位置的相对路径，&lt;dest&gt;是目标容器的一个绝对路径。</span></code></pre>
</li>
<li>
<p>WORKDIR</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 语法：WORKDIR /path/to/workdir
 解释：WORKDIR指令用于设置Dockerfile中的RUN、CMD和ENTRYPOINT指令执行命令的工作目录(默认为/目录)，该指令在Dockerfile文件中可以出现多次，如果使用相对路径则为相对于WORKDIR上一次的值，例如WORKDIR /data，WORKDIR logs，RUN pwd最终输出的当前目录是/data/logs。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code> 语法：<span class="hljs-keyword">WORKDIR</span><span class="bash"> /path/to/workdir
</span> 解释：<span class="hljs-keyword">WORKDIR</span><span class="bash">指令用于设置Dockerfile中的RUN、CMD和ENTRYPOINT指令执行命令的工作目录(默认为/目录)，该指令在Dockerfile文件中可以出现多次，如果使用相对路径则为相对于WORKDIR上一次的值，例如WORKDIR /data，WORKDIR logs，RUN <span class="hljs-built_in">pwd</span>最终输出的当前目录是/data/logs。</span></code></pre>
</li>
<li>
<p>RUN</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 语法：① RUN <command>   #将会调用/bin/sh -c <command>
      ② RUN [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;] #将会调用exec执行，以避免有些时候shell方式执行时的传递参数问题，而且有些基础镜像可能不包含/bin/sh
 解释：RUN指令会在一个新的容器中执行任何命令，然后把执行后的改变提交到当前镜像，提交后的镜像会被用于Dockerfile中定义的下一步操作，RUN中定义的命令会按顺序执行并提交，这正是Docker廉价的提交和可以基于镜像的任何一个历史点创建容器的好处，就像版本控制工具一样。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code> 语法：① <span class="hljs-keyword">RUN</span><span class="bash"> &lt;<span class="hljs-built_in">command</span>&gt;   <span class="hljs-comment">#将会调用/bin/sh -c &lt;command&gt;</span>
</span>      ② <span class="hljs-keyword">RUN</span><span class="bash"> [<span class="hljs-string">"executable"</span>, <span class="hljs-string">"param1"</span>, <span class="hljs-string">"param2"</span>] <span class="hljs-comment">#将会调用exec执行，以避免有些时候shell方式执行时的传递参数问题，而且有些基础镜像可能不包含/bin/sh</span>
</span> 解释：<span class="hljs-keyword">RUN</span><span class="bash">指令会在一个新的容器中执行任何命令，然后把执行后的改变提交到当前镜像，提交后的镜像会被用于Dockerfile中定义的下一步操作，RUN中定义的命令会按顺序执行并提交，这正是Docker廉价的提交和可以基于镜像的任何一个历史点创建容器的好处，就像版本控制工具一样。</span></code></pre>
</li>
<li>
<p>ENV</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 语法：ENV <key> <value>
 解释：ENV指令用于设置环境变量，在Dockerfile中这些设置的环境变量也会影响到RUN指令，当运行生成的镜像时这些环境变量依然有效，如果需要在运行时更改这些环境变量可以在运行docker run时添加–env <key>=<value>参数来修改。
 注意：最好不要定义那些可能和系统预定义的环境变量冲突的名字，否则可能会产生意想不到的结果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code> 语法：<span class="hljs-keyword">ENV</span> &lt;key&gt; &lt;value&gt;
 解释：<span class="hljs-keyword">ENV</span>指令用于设置环境变量，在Dockerfile中这些设置的环境变量也会影响到<span class="hljs-keyword">RUN</span><span class="bash">指令，当运行生成的镜像时这些环境变量依然有效，如果需要在运行时更改这些环境变量可以在运行docker run时添加–env &lt;key&gt;=&lt;value&gt;参数来修改。
</span> 注意：最好不要定义那些可能和系统预定义的环境变量冲突的名字，否则可能会产生意想不到的结果。</code></pre>
</li>
<li>
<p>EXPOSE</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：EXPOSE <port> [ ...]
解释：EXPOSE指令用来告诉Docker这个容器在运行时会监听哪些端口，Docker在连接不同的容器(使用–link参数)时使用这些信息。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>语法：<span class="hljs-keyword">EXPOSE</span> &lt;port&gt; [ ...]
解释：<span class="hljs-keyword">EXPOSE</span>指令用来告诉Docker这个容器在运行时会监听哪些端口，Docker在连接不同的容器(使用–link参数)时使用这些信息。</code></pre>
</li>
<li>
<p>CMD</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法： ① CMD [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;]    #将会调用exec执行，首选方式
      ② CMD [&quot;param1&quot;, &quot;param2&quot;]        #当使用ENTRYPOINT指令时，为该指令传递默认参数
      ③ CMD <command> [ <param1>|<param2> ]        #将会调用/bin/sh -c执行
解释：CMD指令中指定的命令会在镜像运行时执行，在Dockerfile中只能存在一个，如果使用了多个CMD指令，则只有最后一个CMD指令有效。当出现ENTRYPOINT指令时，CMD中定义的内容会作为ENTRYPOINT指令的默认参数，也就是说可以使用CMD指令给ENTRYPOINT传递参数。
注意：RUN和CMD都是执行命令，他们的差异在于RUN中定义的命令会在执行docker build命令创建镜像时执行，而CMD中定义的命令会在执行docker run命令运行镜像时执行，另外使用第一种语法也就是调用exec执行时，命令必须为绝对路径。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>语法： ① <span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"executable"</span>, <span class="hljs-string">"param1"</span>, <span class="hljs-string">"param2"</span>]    <span class="hljs-comment">#将会调用exec执行，首选方式</span>
</span>      ② <span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"param1"</span>, <span class="hljs-string">"param2"</span>]        <span class="hljs-comment">#当使用ENTRYPOINT指令时，为该指令传递默认参数</span>
</span>      ③ <span class="hljs-keyword">CMD</span><span class="bash"> &lt;<span class="hljs-built_in">command</span>&gt; [ &lt;param1&gt;|&lt;param2&gt; ]        <span class="hljs-comment">#将会调用/bin/sh -c执行</span>
</span>解释：<span class="hljs-keyword">CMD</span><span class="bash">指令中指定的命令会在镜像运行时执行，在Dockerfile中只能存在一个，如果使用了多个CMD指令，则只有最后一个CMD指令有效。当出现ENTRYPOINT指令时，CMD中定义的内容会作为ENTRYPOINT指令的默认参数，也就是说可以使用CMD指令给ENTRYPOINT传递参数。
</span>注意：<span class="hljs-keyword">RUN</span><span class="bash">和CMD都是执行命令，他们的差异在于RUN中定义的命令会在执行docker build命令创建镜像时执行，而CMD中定义的命令会在执行docker run命令运行镜像时执行，另外使用第一种语法也就是调用<span class="hljs-built_in">exec</span>执行时，命令必须为绝对路径。</span></code></pre>
</li>
</ul>
<p>其中还有其他的一些关键字：USER、ENTRYPOINT、VOLUME、ONBUILD等，如果你有兴趣可以自行研究。</p>
</li>
<li>
<p>在项目根目录下添加<code>.dockerignore</code>文件，此文件的作用类似<code>.gitignore</code>文件，可以忽略掉添加进镜像中的文件，写法、格式和<code>.gitignore</code>一样，一行代表一个忽略。本项目添加的忽略如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .DS_Store
  npm-debug.log*
  selenium-debug.log
  .nuxt/
  /package-lock.json
  *.tar
  *.md

  # Editor directories and files
  .idea
  *.suo
  *.ntvs*
  *.njsproj
  *.sln" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  .DS_Store
  npm-debug.<span class="hljs-keyword">log</span>*
  selenium-debug.<span class="hljs-built_in">log</span>
  .nuxt/
  /package-lock.json
<span class="hljs-comment">  *.tar</span>
<span class="hljs-comment">  *.md</span>

  # Editor directories and files
  .idea
<span class="hljs-comment">  *.suo</span>
<span class="hljs-comment">  *.ntvs*</span>
<span class="hljs-comment">  *.njsproj</span>
<span class="hljs-comment">  *.sln</span></code></pre>
</li>
</ul>
<h4>构建镜像</h4>
<ul>
<li>
<p>查看目前本地docker的镜像</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">&gt; docker images

REPOSITORY          <span class="hljs-keyword">TAG</span>                 <span class="hljs-title">IMAGE</span> ID            CREATED             SIZE
  </code></pre>
</li>
<li>
<p>cd 到项目根目录下，执行以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker build -t deploy:1.0 .

    Sending build context to Docker daemon  1.436GB
  .... 此处省略1000个字符。
  Successfully built d8f0875e967b
  Successfully tagged deploy:1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell">&gt; docker <span class="hljs-keyword">build </span>-t deploy:<span class="hljs-number">1</span>.<span class="hljs-number">0</span> .

    Sending <span class="hljs-keyword">build </span><span class="hljs-built_in">context</span> to Docker daemon  <span class="hljs-number">1</span>.<span class="hljs-number">436</span>GB
  .... 此处省略<span class="hljs-number">1000</span>个字符。
  Successfully <span class="hljs-keyword">built </span>d<span class="hljs-number">8f</span>0875e<span class="hljs-number">967b</span>
  Successfully tagged deploy:<span class="hljs-number">1</span>.<span class="hljs-number">0</span></code></pre>
<p><code>deploy</code>是镜像名，<code>1.0</code>是镜像的版本号，到此你已经成功构建了一个新的镜像，你可以通过<code>docker images</code>，查看你的镜像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker images
 REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
 deploy              1.0                 d8f0875e967b        3 minutes ago        2.11GB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">&gt; docker images
 REPOSITORY          <span class="hljs-keyword">TAG</span>                 <span class="hljs-title">IMAGE</span> ID            CREATED             SIZE
 deploy              <span class="hljs-number">1.0</span>                 d8f0875e967b        <span class="hljs-number">3</span> minutes ago        <span class="hljs-number">2.11</span>GB</code></pre>
</li>
<li>
<p>启动镜像，测试是否成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker run -d -p 9000:8000 deploy:1.0
8aec5ee037bb253901d2c2e02c7be546580546c493576139f3789fb660f3401d

> docker ps -a
CONTAINER ID    IMAGE        COMMAND          CREATED           STATUS         PORTS                  NAMES
8aec5ee037bb    deploy:1.0   &quot;npm start&quot;     57 seconds ago    Up 56 seconds  0.0.0.0:9000->8000/tcp amazing_bassi
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">&gt; docker <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-_">-d</span> -p 9000:8000 deploy:1.0
</span><span class="hljs-number">8</span>aec5ee037bb253901d2c2e02c7be546580546c493576139f3789fb660f3401d

&gt; docker ps -a
CONTAINER ID    IMAGE        COMMAND          CREATED           STATUS         PORTS                  NAMES
<span class="hljs-number">8</span>aec5ee037bb    deploy:<span class="hljs-number">1.0</span>   <span class="hljs-string">"npm start"</span>     <span class="hljs-number">57</span> seconds ago    Up <span class="hljs-number">56</span> seconds  <span class="hljs-number">0.0</span>.<span class="hljs-number">0.0</span>:<span class="hljs-number">9000</span>-&gt;<span class="hljs-number">8000</span>/tcp amazing_bassi
</code></pre>
<p><code>docker run -d -p 9000:8000 deploy:1.0</code>中<code>-d</code>表示后台运行，<code>-p 9000:8000</code>表示指定本地的9000端口隐射到容器内的8000端口。    <code>deploy:1.0</code>为我们要运行的镜像。通过<code>docker ps -a</code>查看docker的进程（容器的运行本身就是一种特殊的进程）运行情况，发现我们的容器已经在运行。本地可以访问<code>localhost:9000</code>。</p>
<p>通过<code>docker logs</code>可以查看我们容器内应用进程的运行日志。<code>docker logs &lt;CONTAINER ID&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker logs 8aec5ee037bb
  npm info it worked if it ends with ok
  npm info using npm@5.0.0
  npm info using node@v8.0.0
  npm info lifecycle newlook-deploy@1.0.0~prestart: newlook-deploy@1.0.0
  npm info lifecycle newlook-deploy@1.0.0~start: newlook-deploy@1.0.0
  
  > newlook-deploy@1.0.0 start /app
  > node ./server/index.js
  
  Server listening on 0.0.0.0:8000
   DONE  Compiled successfully in 9310ms06:55:56
  
  > Open http://0.0.0.0:8000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code class="shell">&gt; docker logs <span class="hljs-number">8</span>aec5ee037bb
  npm info <span class="hljs-keyword">it</span> worked <span class="hljs-keyword">if</span> <span class="hljs-keyword">it</span> <span class="hljs-keyword">ends</span> <span class="hljs-keyword">with</span> ok
  npm info <span class="hljs-keyword">using</span> npm@<span class="hljs-number">5.0</span><span class="hljs-number">.0</span>
  npm info <span class="hljs-keyword">using</span> node@v8<span class="hljs-number">.0</span><span class="hljs-number">.0</span>
  npm info lifecycle newlook-deploy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>~prestart: newlook-deploy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
  npm info lifecycle newlook-deploy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>~<span class="hljs-built_in">start</span>: newlook-deploy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
  
  &gt; newlook-deploy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> <span class="hljs-built_in">start</span> /app
  &gt; node ./server/index.js
  
  Server listening <span class="hljs-keyword">on</span> <span class="hljs-title">0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-title">8000</span>
   DONE  Compiled successfully <span class="hljs-keyword">in</span> <span class="hljs-number">9310</span>ms06:<span class="hljs-number">55</span>:<span class="hljs-number">56</span>
  
  &gt; Open <span class="hljs-keyword">http</span>://<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">8000</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" docker stop <CONTAINER ID>可以停止容器运行

 docker start <CONTAINER ID>可以启动容器运行

 docker restart <CONTAINER ID>可以重启容器

 docker rm <CONTAINER ID> -f可以强制删除在运行的容器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell"> docker <span class="hljs-keyword">stop</span> &lt;<span class="hljs-keyword">CONTAINER</span> <span class="hljs-keyword">ID</span>&gt;可以停止容器运行

 docker <span class="hljs-keyword">start</span> &lt;<span class="hljs-keyword">CONTAINER</span> <span class="hljs-keyword">ID</span>&gt;可以启动容器运行

 docker restart &lt;<span class="hljs-keyword">CONTAINER</span> <span class="hljs-keyword">ID</span>&gt;可以重启容器

 docker rm &lt;<span class="hljs-keyword">CONTAINER</span> <span class="hljs-keyword">ID</span>&gt; -f可以强制删除在运行的容器</code></pre>
</li>
</ul>
<h4>上传镜像（这里用上传到公共仓库来演示）</h4>
<ul>
<li><p>没注册DockerHub的同学，请注册<a href="https://hub.docker.com" rel="nofollow noreferrer" target="_blank">DockerHub</a></p></li>
<li>
<p>登录docker</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker login
Username: XXX
Password: XXX
Login Succeeded" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="shell"><span class="hljs-string">&gt; docker login
</span><span class="hljs-attr">Username:</span> <span class="hljs-string">XXX</span>
<span class="hljs-attr">Password:</span> <span class="hljs-string">XXX</span>
<span class="hljs-string">Login</span> <span class="hljs-string">Succeeded</span></code></pre>
</li>
<li>
<p><code>docker tag &lt;name:tag&gt; &lt;namespace&gt;/&lt;name:tag&gt;</code>上传之前必须给镜像打上tag，<code>namespace</code>可以指定为你的docker Id</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker tag deploy:1.0 lzqs/deploy:1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">&gt; docker <span class="hljs-keyword">tag</span> <span class="hljs-title">deploy</span>:<span class="hljs-number">1.0</span> lzqs/deploy:<span class="hljs-number">1.0</span></code></pre>
</li>
<li>
<p><code>docker push &lt;namespace&gt;/&lt;name:tag&gt;</code>将镜像上传至docker的公共仓库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker push lzqs/deploy:1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell" style="word-break: break-word; white-space: initial;">&gt; docker <span class="hljs-keyword">push </span>lzqs/deploy:<span class="hljs-number">1</span>.<span class="hljs-number">0</span></code></pre>
</li>
<li><p>上传成功后，<code>docker logout</code> 退出，登录 <code>https://hub.docker.com/</code> 查看上传的镜像。</p></li>
</ul>
<h4>下载镜像</h4>
<ul><li>
<p>通过<code>docker pull &lt;namespace&gt;/&lt;name:tag&gt;</code>下载我们的镜像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker pull lzqs/deploy:1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-quote">&gt; docker pull lzqs/deploy:1.0</span></code></pre>
</li></ul>
<h4>生产部署</h4>
<p>前面说了，我们可以将上传到仓库的镜像下载下来部署，但是如果镜像比较大或者部署环境压根无法联网，你是不是要跪了。所以我们采取另一种方法，将开发好的镜像直接打包保存到安装盘里面，到客户生产环境再将镜像包上传并加载到服务器的docker中即可。</p>
<ul>
<li>
<p>在开发环境打包，<code>docker save &lt;namespace&gt;/&lt;name:tag&gt; &lt;name&gt;.tar</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker save lzqs/deploy:1.0 > deploy.tar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-quote">&gt; docker save lzqs/deploy:1.0 &gt; deploy.tar</span></code></pre>
<p>这里<code>ls</code>会发现目录下生成了deploy.tar的文件。部署时将此文件copy到生产环境服务器上。</p>
</li>
<li>
<p>确保生产服务器上已经安装了docker，若没装，请参考相关文档，若不装，对不起小生也无力了，然后在服务器上加载上传的镜像包<code>deploy.tar</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" > docker load < deploy.tar

  007ab444b234: Loading layer [==================================================>] 129.3 MB/129.3 MB
  4902b007e6a7: Loading layer [==================================================>] 45.45 MB/45.45 MB
  bb07d0c1008d: Loading layer [==================================================>] 126.8 MB/126.8 MB
  ecf5c2e2468e: Loading layer [==================================================>] 326.6 MB/326.6 MB
  7b3b4fef39c1: Loading layer [==================================================>] 352.3 kB/352.3 kB
  677f02386f07: Loading layer [==================================================>] 137.2 kB/137.2 kB
  7333bb4665b8: Loading layer [==================================================>] 55.66 MB/55.66 MB
  e292e64ffb88: Loading layer [==================================================>] 3.757 MB/3.757 MB
  ee76d0e6f6d9: Loading layer [==================================================>] 1.436 GB/1.436 GB
  33dca533c6e5: Loading layer [==================================================>] 331.8 kB/331.8 kB
  24630015679d: Loading layer [==================================================>] 35.18 MB/35.18 MB
  Loaded image: lzqs/deploy:1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code class="shell"> &gt; docker <span class="hljs-built_in">load</span> &lt; deploy.tar

  <span class="hljs-number">007</span><span class="hljs-name">ab444b234</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">129.3</span> MB/<span class="hljs-number">129.3</span> MB
  <span class="hljs-number">4902</span><span class="hljs-name">b007e6a7</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">45.45</span> MB/<span class="hljs-number">45.45</span> MB
  <span class="hljs-name">bb07d0c1008d</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">126.8</span> MB/<span class="hljs-number">126.8</span> MB
  <span class="hljs-name">ecf5c2e2468e</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">326.6</span> MB/<span class="hljs-number">326.6</span> MB
  <span class="hljs-number">7</span><span class="hljs-name">b3b4fef39c1</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">352.3</span> kB/<span class="hljs-number">352.3</span> kB
  <span class="hljs-number">677</span><span class="hljs-name">f02386f07</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">137.2</span> kB/<span class="hljs-number">137.2</span> kB
  <span class="hljs-number">7333</span><span class="hljs-name">bb4665b8</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">55.66</span> MB/<span class="hljs-number">55.66</span> MB
  <span class="hljs-name">e292e64ffb88</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">3.757</span> MB/<span class="hljs-number">3.757</span> MB
  <span class="hljs-name">ee76d0e6f6d9</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">1.436</span> GB/<span class="hljs-number">1.436</span> GB
  <span class="hljs-number">33</span><span class="hljs-name">dca533c6e5</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">331.8</span> kB/<span class="hljs-number">331.8</span> kB
  <span class="hljs-number">24630015679</span><span class="hljs-name">d</span>: Loading layer [=================================================<span class="hljs-function">=&gt;</span>] <span class="hljs-number">35.18</span> MB/<span class="hljs-number">35.18</span> MB
  Loaded <span class="hljs-name">image</span>: lzqs/<span class="hljs-name">deploy</span>:<span class="hljs-number">1.0</span></code></pre>
<p>加载成功后，<code>docker images</code>即可看到加载的镜像</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
lzqs/deploy         1.0                 d8f0875e967b        About an hour ago   2.115 GB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">&gt; docker images

REPOSITORY          <span class="hljs-keyword">TAG</span>                 <span class="hljs-title">IMAGE</span> ID            CREATED             SIZE
lzqs/deploy         <span class="hljs-number">1.0</span>                 d8f0875e967b        About an hour ago   <span class="hljs-number">2.115</span> GB</code></pre>
</li>
<li>
<p>运行<code>lzqs/deploy</code>镜像，成功后，在外部访问服务器的9000端口， <code>&lt;服务器的IP&gt;:9000</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker run -d -p 9000:8000 lzqs/deploy
1d0db9a5d0c8826171e501b0e86afd444fca8144b1105e63dae8d621bdda7a77

> docker ps -a
CONTAINER ID  IMAGE           COMMAND      CREATED              STATUS             PORTS                    NAMES
1d0db9a5d0c8  lzqs/deploy:1.0 &quot;npm start&quot;  About a minute ago   Up About a minute  0.0.0.0:9000->8000/tcp goofy_curran" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">&gt; docker run -d -<span class="hljs-selector-tag">p</span> <span class="hljs-number">9000</span>:<span class="hljs-number">8000</span> lzqs/deploy
<span class="hljs-number">1</span>d0db9a5d0c8826171e501b0e86afd444fca8144b1105e63dae8d621bdda7a77

&gt; docker ps -<span class="hljs-selector-tag">a</span>
CONTAINER ID  IMAGE           COMMAND      CREATED              STATUS             PORTS                    NAMES
<span class="hljs-number">1</span>d0db9a5d0c8  lzqs/deploy:<span class="hljs-number">1.0</span> <span class="hljs-string">"npm start"</span>  About <span class="hljs-selector-tag">a</span> minute ago   Up About <span class="hljs-selector-tag">a</span> minute  <span class="hljs-number">0.0</span>.<span class="hljs-number">0.0</span>:<span class="hljs-number">9000</span>-&gt;<span class="hljs-number">8000</span>/tcp goofy_curran</code></pre>
</li>
<li>
<p><code>docker exec -it &lt;CONTAINER ID&gt; /bin/bash</code> 可以进入容器中执行，方便我们查看内部文件和调试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> docker exec -it 1d0db9a5d0c8 /bin/bash

root@1d0db9a5d0c8:/app#" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell">&gt; docker exec -it <span class="hljs-number">1</span>d0db9a5d0c8 /bin/bash

root<span class="hljs-variable">@1d0db9a5d0c8</span><span class="hljs-symbol">:/app</span><span class="hljs-comment">#</span></code></pre>
</li>
<li><p>战功，访问部署的docker应用，<code>&lt;服务器的IP&gt;:9000</code>，效果如下图：</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010541796" src="https://static.alili.tech/img/remote/1460000010541796" alt="deploy" title="deploy" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">小结</h3>
<p>七月流火，程序员的好日子要到了，当然也是大家的好日子快到了，适宜的温度应该更加高产。关于docker的研究还在进行中，为了前端更好的发展，让我们继续燥起来吧，毕竟没有什么是一段JS解决不了的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Docker部署基于Nodejs的Web应用-实战篇

## 原文链接
[https://segmentfault.com/a/1190000010541792](https://segmentfault.com/a/1190000010541792)

