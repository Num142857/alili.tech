---
title: 'Docker 及 GitLab CI 在前端工作流上的实践分享（一）' 
date: 2018-12-29 2:30:10
hidden: true
slug: 2st07fx7663
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553749?w=1100&amp;h=225" src="https://static.alili.tech/img/remote/1460000011553749?w=1100&amp;h=225" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如今前端工程越来越复杂，打造一个好用的工作流也显得越来越重要。<br>本文讲分成二个部分，通过简单例子，来介绍上图中那条鱼和狐狸 ：）</p>
<p>part1 : docker  <a href="https://github.com/ccfnever/docker-demo" rel="nofollow noreferrer" target="_blank">本文的项目代码</a><br>part2 : gitlab-ci <a href="https://segmentfault.com/a/1190000011553991">点我跳转</a></p>
<p>ok， 那么现在就开始第一部分</p>
<h3 id="articleHeader0">一、什么是 Docker ？</h3>
<p>Docker是一个基于轻量级虚拟化技术的容器引擎开源项目，可以轻松的为任何应用创建一个<strong>容器</strong>。<br>具体做的就是<strong>快速的帮助开发者搭建应用周期里所需的各种环境，快速地部署项目以缩短开发周期</strong>。</p>
<h5>docker 具备以下几个优势：</h5>
<p>1.配置简单<br>2.可移植<br>3.独立自给自足<br>4.轻量级</p>
<h5>Docker 的应用场景</h5>
<p>1.web应用工作流中的各种环境快速搭建</p>
<ol><li><p>自动化测试和持续集成、发布</p></li></ol>
<h3 id="articleHeader1">二、安装 docker</h3>
<h5>首先下载安装包</h5>
<p>这里以 mac 为例子</p>
<p>Mac 客户端：<a href="https://store.docker.com/editions/community/docker-ce-desktop-mac" rel="nofollow noreferrer" target="_blank">https://store.docker.com/edit...</a><br>其他版本：<a href="https://www.docker.com/get-docker" rel="nofollow noreferrer" target="_blank">https://www.docker.com/get-do...</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553750?w=1100&amp;h=564" src="https://static.alili.tech/img/remote/1460000011553750?w=1100&amp;h=564" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这时候打开终端，就可以使用docker命令了。<br><span class="img-wrap"><img data-src="/img/remote/1460000011553751?w=1100&amp;h=85" src="https://static.alili.tech/img/remote/1460000011553751?w=1100&amp;h=85" alt="" title="" style="cursor: pointer;"></span></p>
<h5>性能和网络设置</h5>
<p>安装后，最好进行一些基本的性能和网络设置（在 docker app的设置菜单里，快捷键 commond + ，）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553752?w=1100&amp;h=580" src="https://static.alili.tech/img/remote/1460000011553752?w=1100&amp;h=580" alt="" title="" style="cursor: pointer;"></span><br>设置镜像加速（很重要），这里利用阿里云的加速 <a href="https://cr.console.aliyun.com/#/accelerator" rel="nofollow noreferrer" target="_blank">https://cr.console.aliyun.com...</a><br><span class="img-wrap"><img data-src="/img/remote/1460000011553753?w=1100&amp;h=597" src="https://static.alili.tech/img/remote/1460000011553753?w=1100&amp;h=597" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">三、Docker 的几个核心概念</h3>
<p>在使用 docker 之前，有必要先了解 docker 的几个核心概念。</p>
<h5>1.镜像 images</h5>
<blockquote><p>Images 镜像是 Docker 容器的模板文件，用来创建和运行Docker容器。</p></blockquote>
<p>镜像可以从 <a href="https://hub.docker.com" rel="nofollow noreferrer" target="_blank">Docker Hub</a> 下载：<br>我们可以先用 <code>docker search</code> 命令来搜索 ubuntu 镜像<br><span class="img-wrap"><img data-src="/img/remote/1460000011553754?w=1100&amp;h=393" src="https://static.alili.tech/img/remote/1460000011553754?w=1100&amp;h=393" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后我们可以用 <code>docker pull ubuntu</code> 来获取那个 <code>images</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553755?w=1100&amp;h=257" src="https://static.alili.tech/img/remote/1460000011553755?w=1100&amp;h=257" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>各个选项说明:</p>
<ul>
<li>REPOSTITORY：表示镜像的仓库源</li>
<li>TAG：镜像的标签</li>
<li>IMAGE ID：镜像ID</li>
<li>CREATED：镜像创建时间</li>
<li>SIZE：镜像大小</li>
</ul>
<h5>2.容器 container</h5>
<p>Container 容器是 Docker 镜像的一个运行实例，一个实例相当于创建了一个独立的环境，我们可以在<br>里面运行操作系统、程序应用、修改文件数据等等。</p>
<p>当你用 <code>docker run </code>运行 <code>images</code> 的时候，就会创建对应的容器:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docker run -ti ubuntu:latest /bin/bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">docker <span class="hljs-keyword">run</span><span class="bash"> -ti ubuntu:latest /bin/bash</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553756?w=1100&amp;h=112" src="https://static.alili.tech/img/remote/1460000011553756?w=1100&amp;h=112" alt="" title="" style="cursor: pointer;"></span></p>
<p>-ti参数可以让容器保持终端交互 （ 退出在容器内输入 exit ）<br><code>ubuntu:latest</code>就是镜像名，<code>/bin/bash</code> 则是运行命令</p>
<p>想查看运行中的容器：<code>docker ps</code><br><span class="img-wrap"><img data-src="/img/remote/1460000011553757?w=1100&amp;h=71" src="https://static.alili.tech/img/remote/1460000011553757?w=1100&amp;h=71" alt="" title="" style="cursor: pointer;"></span><br>退出容器：<code>docker stop </code> 或者 <code>docker kill</code> 加上对应容器的ID (一般输入开头3~4个字母就行了)<br>重新启动容器： <code>docker start</code>加上对应容器的ID<br>更多容器相关命令，请查看<a href="https://docs.docker.com/" rel="nofollow noreferrer" target="_blank">官网文档</a>，或者--help查看命令帮助</p>
<h5>3.使用 Dockerfile 和 Docker-compose 定制镜像</h5>
<p>Dockerfile 是一个文本格式的配置文件，用于快速方便的创建自定义镜像。<br>Docker-compose 则是用于组合多个镜像，创建一个模块化的容器集合。</p>
<p>Dockerfile 常用有以下指令选项:</p>
<p><strong>- FROM</strong><br>  指定构建镜像的基础源镜像，如果本地没有指定的镜像，则会从 docker hub pull 镜像下来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FROM ubuntu" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">FROM</span> ubuntu</code></pre>
<p><strong>- RUN</strong><br>创建镜像过程中，用来执行命令，通常用于安装程序（RUN 会被缓存，可以使用docker build --no-cache 清除缓存）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RUN apt-get update &amp;&amp; apt-get install git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">RUN apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span> &amp;&amp; apt-<span class="hljs-built_in">get</span> install git</code></pre>
<p><strong>- CMD</strong><br>CMD可以让容器在启动时默认执行一个命令。如果用户启动容器时指定了运行的命令，则会覆盖掉CMD指定的命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CMD [&quot;/bin/bash&quot;,&quot;/etc/php.sh&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"/bin/bash"</span>,<span class="hljs-string">"/etc/php.sh"</span>]</span></code></pre>
<p><strong>- EXPOSE</strong><br>容器对外映射的本地端口，需要在 docker run 的时候使用-p或者-P选项生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EXPOSE 8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">8080</span></code></pre>
<p><strong>- ENV</strong><br>设置环境变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ENV <key> <value>       # 只能设置一个变量
ENV <key>=<value> ...   # 允许一次设置多个变量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>ENV <span class="hljs-params">&lt;key&gt;</span> <span class="hljs-params">&lt;value&gt;</span>       <span class="hljs-meta"># 只能设置一个变量</span>
ENV <span class="hljs-params">&lt;key&gt;</span>=<span class="hljs-params">&lt;value&gt;</span> ...   <span class="hljs-meta"># 允许一次设置多个变量</span></code></pre>
<p><strong>- ADD</strong><br><strong>- COPY</strong><br>ADD 和 COPY 都是本地主机文件、目录到容器指定路径中 。，不同的是，ADD可以复制远程文件 URL，并且支持 Go 的正则模糊匹配，具体规则可参见 <a href="https://golang.org/pkg/path/filepath/#Match" rel="nofollow noreferrer" target="_blank">Go filepath.Match</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ADD hom* /mydir/        # adds all files starting with &quot;hom&quot;
ADD hom?.txt /mydir/    # ? is replaced with any single character
COPY <src>... <dest>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-keyword">ADD</span><span class="bash"> hom* /mydir/        <span class="hljs-comment"># adds all files starting with "hom"</span>
</span><span class="hljs-keyword">ADD</span><span class="bash"> hom?.txt /mydir/    <span class="hljs-comment"># ? is replaced with any single character</span>
</span><span class="hljs-keyword">COPY</span><span class="bash"> &lt;src&gt;... &lt;dest&gt;</span></code></pre>
<p><strong>- VOLUME</strong><br>本地目录到容器的映射</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VOLUME [&quot;/src&quot;,&quot;/www&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">VOLUME</span><span class="bash"> [<span class="hljs-string">"/src"</span>,<span class="hljs-string">"/www"</span>]</span></code></pre>
<p><strong>- WORKDIR</strong><br>初始执行命令的路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WORKDIR /www/server
RUN pwd # 打印/www/server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-keyword">WORKDIR</span><span class="bash"> /www/server
</span><span class="hljs-keyword">RUN</span><span class="bash"> <span class="hljs-built_in">pwd</span> <span class="hljs-comment"># 打印/www/server</span></span></code></pre>
<p>以上配置  也可以在 Docker-compose 完成，只是关键字和值的写法不太一样，具体可以参考它们的文档：<br> Dockerfile: <a href="https://docs.docker.com/engine/reference/builder/" rel="nofollow noreferrer" target="_blank">https://docs.docker.com/engin...</a><br> Docker-compose: <a href="https://docs.docker.com/compose/compose-file/" rel="nofollow noreferrer" target="_blank">https://docs.docker.com/compo...</a></p>
<h3 id="articleHeader3">四、一个简单案例</h3>
<p>使用 docker 为一个spa应用起一个开发环境+测试环境</p>
<p>简单说要做的是：</p>
<ol>
<li>在 docker 里起一个 node 服务热加载项目源码。</li>
<li>用 docker 起一个 nginx 服务，代理项目编译后的 dist 目录。</li>
</ol>
<p>在这，我用 <a href="https://www.npmjs.com/package/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 初始化了一个项目，然后新建了个 docker-compose 文件夹（用来配置docker）如下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011553758?w=1704&amp;h=554" src="https://static.alili.tech/img/remote/1460000011553758?w=1704&amp;h=554" alt="" title="" style="cursor: pointer; display: inline;"></span><br>上图是源码目录，</p>
<p>另外，docker-compose 的目录结构如下</p>
<ul><li>
<p>docker-compose</p>
<ul>
<li>docker-compose.yml</li>
<li>
<p>nginx</p>
<ul>
<li>Dockerfile</li>
<li>nginx.conf</li>
<li>
<p>sites-enabled</p>
<ul><li>www.docker-test.com.conf</li></ul>
</li>
</ul>
</li>
<li>
<p>node</p>
<ul>
<li>Dockerfile</li>
<li>start.sh</li>
</ul>
</li>
</ul>
</li></ul>
<ol><li>、node 文件夹下各有一份 Dockerfile 文件，可以创建两个 images 镜像，docker-compose.yml 则用于将两个镜像服务整合使用。</li></ol>
<p>我们先看 node 文件夹下的 <br>Dockerfile：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# docker-compose/php/Dockerfile

#基于 node 镜像
FROM node  

# 复制宿主机的 start.sh 到 容器 /etc/start.sh
ADD start.sh /etc/start.sh

# 设置初始命令执行目录
WORKDIR /www

# 通过 RUN 可以在容器里执行自定义命令
RUN node -v
RUN pwd

CMD [&quot;/bin/bash&quot;,&quot;/etc/start.sh&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># docker-compose/php/Dockerfile</span>

<span class="hljs-comment">#基于 node 镜像</span>
<span class="hljs-keyword">FROM</span> node  

<span class="hljs-comment"># 复制宿主机的 start.sh 到 容器 /etc/start.sh</span>
<span class="hljs-keyword">ADD</span><span class="bash"> start.sh /etc/start.sh
</span>
<span class="hljs-comment"># 设置初始命令执行目录</span>
<span class="hljs-keyword">WORKDIR</span><span class="bash"> /www
</span>
<span class="hljs-comment"># 通过 RUN 可以在容器里执行自定义命令</span>
<span class="hljs-keyword">RUN</span><span class="bash"> node -v
</span><span class="hljs-keyword">RUN</span><span class="bash"> <span class="hljs-built_in">pwd</span>
</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"/bin/bash"</span>,<span class="hljs-string">"/etc/start.sh"</span>]</span></code></pre>
<p>start.sh:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/bin/bash

# 启动 php 服务
npm run dev 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-meta">#!/bin/bash
</span>
<span class="hljs-comment"># 启动 php 服务</span>
npm run dev 
</code></pre>
<p>再来看 nginx 下的<br>Dockerfile:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# docker-compose/nginx/Dockerfile

#基于 nginx 镜像
FROM nginx  

#基于 nginx 相关配置复制到容器
ADD nginx.conf /etc/nginx/nginx.conf
ADD sites-enabled/* /etc/nginx/conf.d/

#创建 nginx log 和用户相关路径
RUN mkdir /opt/htdocs &amp;&amp; mkdir /opt/log &amp;&amp; mkdir /opt/log/nginx
RUN chown -R www-data.www-data /opt/htdocs /opt/log
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># docker-compose/nginx/Dockerfile</span>

<span class="hljs-comment">#基于 nginx 镜像</span>
<span class="hljs-keyword">FROM</span> nginx  

<span class="hljs-comment">#基于 nginx 相关配置复制到容器</span>
<span class="hljs-keyword">ADD</span><span class="bash"> nginx.conf /etc/nginx/nginx.conf
</span><span class="hljs-keyword">ADD</span><span class="bash"> sites-enabled/* /etc/nginx/conf.d/
</span>
<span class="hljs-comment">#创建 nginx log 和用户相关路径</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir /opt/htdocs &amp;&amp; mkdir /opt/<span class="hljs-built_in">log</span> &amp;&amp; mkdir /opt/<span class="hljs-built_in">log</span>/nginx
</span><span class="hljs-keyword">RUN</span><span class="bash"> chown -R www-data.www-data /opt/htdocs /opt/<span class="hljs-built_in">log</span>
</span></code></pre>
<p>这样，两个服务的 Dockerfile 都创建完成了，但是我们还没暴露端口，也没配置 volumes 映射，这里我们可以在 docker-compose.yml 中设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx:
  build: ./nginx
  ports:
    - &quot;80:80&quot; #映射到本地的端口
  volumes: 
    - /Users/mr.yun/docker-test/docker-demo/dist:/www

node:
  build: ./node
  ports: 
    - &quot;8085:8080&quot;   #映射到本地的端口 本地访问8085，即访问容器内的8080
  volumes:
    - /Users/mr.yun/docker-test/docker-demo:/www
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">nginx:</span>
<span class="hljs-symbol">  build:</span> ./nginx
<span class="hljs-symbol">  ports:</span>
    - <span class="hljs-string">"80:80"</span> <span class="hljs-meta">#映射到本地的端口</span>
<span class="hljs-symbol">  volumes:</span> 
    - /Users/mr.yun<span class="hljs-meta-keyword">/docker-test/</span>docker-demo/dist:/www
<span class="hljs-symbol">
node:</span>
<span class="hljs-symbol">  build:</span> ./node
<span class="hljs-symbol">  ports:</span> 
    - <span class="hljs-string">"8085:8080"</span>   <span class="hljs-meta">#映射到本地的端口 本地访问8085，即访问容器内的8080</span>
<span class="hljs-symbol">  volumes:</span>
    - /Users/mr.yun<span class="hljs-meta-keyword">/docker-test/</span>docker-demo:/www
</code></pre>
<p>注意，上面代码中，volumes 的值，要根据你自己的实际项目目录来配置。</p>
<p>配置完以上变量后，cd 进入 docker-compose 文件目录</p>
<p>直接运行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 启动容器集合，会同时创建两个image，并启动两个容器，也可以加 -d 在后台运行
# 运行后可以通过 docker images,docker ps查看生成的镜像和容器
docker-compose up --biuld" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 启动容器集合，会同时创建两个image，并启动两个容器，也可以加 -d 在后台运行</span>
<span class="hljs-meta"># 运行后可以通过 docker images,docker ps查看生成的镜像和容器</span>
docker-compose up --biuld</code></pre>
<p>等待下载完成，并自动运行</p>
<p>然后在浏览器输入 127.0.0.1:8050 ,就能看到 vue项目,并且修改源码能热加载。<br><span class="img-wrap"><img data-src="/img/remote/1460000011553759?w=600&amp;h=579" src="https://static.alili.tech/img/remote/1460000011553759?w=600&amp;h=579" alt="" title="" style="cursor: pointer;"></span></p>
<p>输入 127.0.0.1，则可以看到静态资源 hash 过的项目。（别忘了在本地先 npm run build）<br><span class="img-wrap"><img data-src="/img/remote/1460000011553760?w=600&amp;h=399" src="https://static.alili.tech/img/remote/1460000011553760?w=600&amp;h=399" alt="" title="" style="cursor: pointer;"></span></p>
<p>哦了，以上就是 docker 的基本使用介绍，更多玩法和技巧，到实际项目中探索。<br>个人感觉在项目多、协作人数多的情况下，docker 还是很方便的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Docker 及 GitLab CI 在前端工作流上的实践分享（一）

## 原文链接
[https://segmentfault.com/a/1190000011553744](https://segmentfault.com/a/1190000011553744)

