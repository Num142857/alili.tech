---
title: '为什么要在 Docker 中使用 R？ 一位 DevOps 的看法' 
date: 2019-01-22 2:30:07
hidden: true
slug: yfhgsn93j5a
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为什么要在-docker-中使用-r-一位-devops-的看法"></a>为什么要在 Docker 中使用 R？ 一位 DevOps 的看法</h1>
<blockquote>
<p>R 语言，一种自由软件编程语言与操作环境，主要用于统计分析、绘图、数据挖掘。R 内置多种统计学及数字分析功能。R 的另一强项是绘图功能，制图具有印刷的素质，也可加入数学符号。——引自维基百科。</p>
</blockquote>
<p>已经有几篇关于为什么要在 Docker 中使用 R 的文章。在这篇文章中，我将尝试加入一个 DevOps 的观点，并解释在 OpenCPU 系统的环境中如何使用容器化 R 来构建和部署 R 服务器。</p>
<blockquote>
<p>有在 <a href="https://twitter.com/hashtag/rstats?src=hash&amp;ref_src=twsrc%5Etfw">#rstats</a> 世界的人真正地写过<em>为什么</em>他们使用 Docker，而不是_如何_么？</p>
<p>— Jenny Bryan (@JennyBryan) <a href="https://twitter.com/JennyBryan/status/913785731998289920?ref_src=twsrc%5Etfw">September 29, 2017</a></p>
</blockquote>
<h3><a href="#1轻松开发"></a>1：轻松开发</h3>
<p>OpenCPU 系统的旗舰是 <a href="https://www.opencpu.org/download.html">OpenCPU 服务器</a>：它是一个成熟且强大的 Linux 栈，用于在系统和应用程序中嵌入 R。因为 OpenCPU 是完全开源的，我们可以在 DockerHub 上构建和发布。可以使用以下命令启动一个可以立即使用的 OpenCPU 和 RStudio 的 Linux 服务器（使用端口 8004 或 80）：</p>
<pre><code class="hljs dockerfile">docker <span class="hljs-keyword">run</span><span class="bash"> -t -p 8004:8004 opencpu/rstudio
</span>
</code></pre><p>现在只需在你的浏览器打开 <a href="http://localhost:8004/ocpu/">http://localhost:8004/ocpu/</a> 和 <a href="http://localhost:8004/rstudio/">http://localhost:8004/rstudio/</a> 即可！在 rstudio 中用用户 <code>opencpu</code>（密码：<code>opencpu</code>）登录来构建或安装应用程序。有关详细信息，请参阅<a href="https://hub.docker.com/r/opencpu/rstudio/">自述文件</a>。</p>
<p>Docker 让开始使用 OpenCPU 变得简单。容器给你一个充分灵活的 Linux 机器，而无需在系统上安装任何东西。你可以通过 rstudio 服务器安装软件包或应用程序，也可以使用 <code>docker exec</code> 进入到正在运行的服务器的 root shell 中：</p>
<pre><code class="hljs awk"><span class="hljs-comment"># Lookup the container ID</span>
docker ps

<span class="hljs-comment"># Drop a shell</span>
docker exec -i -t eec1cdae3228 <span class="hljs-regexp">/bin/</span>bash

</code></pre><p>你可以在服务器的 shell 中安装其他软件，自定义 apache2 的 httpd 配置（auth，代理等），调整 R 选项，通过预加载数据或包等来优化性能。</p>
<h3><a href="#2-通过-dockerhub-发布和部署"></a>2： 通过 DockerHub 发布和部署</h3>
<p>最强大的是，Docker 可以通过 DockerHub 发布和部署。要创建一个完全独立的应用程序容器，只需使用标准的 <a href="https://hub.docker.com/u/opencpu/">opencpu 镜像</a>并添加你的程序。</p>
<p>出于本文的目的，我通过在每个仓库中添加一个非常简单的 “Dockerfile”，将一些<a href="https://www.opencpu.org/apps.html">示例程序</a>打包为 docker 容器。例如：<a href="https://rwebapps.ocpu.io/nabel/www/">nabel</a> 的 <a href="https://github.com/rwebapps/nabel/blob/master/Dockerfile">Dockerfile</a> 包含以下内容：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">FROM</span> opencpu/base

<span class="hljs-keyword">RUN</span><span class="bash"> R -e <span class="hljs-string">'devtools::install_github("rwebapps/nabel")'</span>
</span>
</code></pre><p>它采用标准的 <a href="https://hub.docker.com/r/opencpu/base/">opencpu/base</a> 镜像，并从 Github <a href="https://github.com/rwebapps">仓库</a>安装 nabel。最终得到一个完全隔离、独立的程序。任何人可以使用下面这样的命令启动程序：</p>
<pre><code class="hljs dockerfile">docker <span class="hljs-keyword">run</span><span class="bash"> -d 8004:8004 rwebapps/nabel
</span>
</code></pre><p><code>-d</code> 代表守护进程监听 8004 端口。很显然，你可以调整 <code>Dockerfile</code> 来安装任何其它的软件或设置你需要的程序。</p>
<p>容器化部署展示了 Docker 的真正能力：它可以发布可以开箱即用的独立软件，而无需安装任何软件或依赖付费托管的服务。如果你更喜欢专业的托管，那会有许多公司乐意在可扩展的基础设施上为你托管 docker 程序。</p>
<h3><a href="#3-跨平台构建"></a>3： 跨平台构建</h3>
<p>还有 Docker 用于 OpenCPU 的第三种方式。每次发布，我们都构建 6 个操作系统的 <code>opencpu-server</code> 安装包，它们在 <a href="https://archive.opencpu.org/">https://archive.opencpu.org</a> 上公布。这个过程已经使用 DockerHub 完全自动化了。以下镜像从源代码自动构建所有栈：</p>
<ul>
<li><a href="https://hub.docker.com/r/opencpu/ubuntu-16.04/">opencpu/ubuntu-16.04</a></li>
<li><a href="https://hub.docker.com/r/opencpu/debian-9/">opencpu/debian-9</a></li>
<li><a href="https://hub.docker.com/r/opencpu/fedora-25/">opencpu/fedora-25</a></li>
<li><a href="https://hub.docker.com/r/opencpu/fedora-26/">opencpu/fedora-26</a></li>
<li><a href="https://hub.docker.com/r/opencpu/centos-6/">opencpu/centos-6</a></li>
<li><a href="https://hub.docker.com/r/opencpu/centos-7/">opencpu/centos-7</a></li>
</ul>
<p>当 GitHub 上发布新版本时，DockerHub 会自动重建此镜像。要做的就是运行一个<a href="https://github.com/opencpu/archive/blob/gh-pages/update.sh">脚本</a>，它会取回镜像并将 <code>opencpu-server</code> 二进制复制到<a href="https://archive.opencpu.org/">归档服务器上</a>。</p>
<hr>
<p>via: <a href="https://www.r-bloggers.com/why-use-docker-with-r-a-devops-perspective/">https://www.r-bloggers.com/why-use-docker-with-r-a-devops-perspective/</a></p>
<p>作者：<a href="https://www.r-bloggers.com/author/jeroen-ooms/">Jeroen Ooms</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么要在 Docker 中使用 R？ 一位 DevOps 的看法

## 原文链接
[https://www.zcfy.cc/article/why-use-docker-with-r-a-devops-perspective](https://www.zcfy.cc/article/why-use-docker-with-r-a-devops-perspective)

