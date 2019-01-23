---
title: 'Docker 引擎的 Swarm 模式：入门教程' 
date: 2019-01-22 2:30:08
hidden: true
slug: sfo0tgkexis
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#docker-引擎的-swarm-模式入门教程"></a>Docker 引擎的 Swarm 模式：入门教程</h1>
<p>Swarm，听起来像是一个朋克摇滚乐队。但它确实是个新的编排机制，抑或者是，一个 <a href="http://www.dedoimedo.com/computers/docker-guide.html">Docker</a> 现有编排体制的改进。简单来讲，如果你在用一个旧版本的 Docker，你必须手动配置 Swarm 来创建 Docker 集群。从 <a href="https://blog.docker.com/2016/06/docker-1-12-built-in-orchestration/">1.12 版</a>开始，Docker 引擎集成了一个原生的实现（LCTT 译注：见下文）来支持无缝的集群设置。也就是为什么会有这篇文章。</p>
<p>在这篇教程中，我将带你体验一下编排后的 Docker 将能做的事情。这篇文章并不是包含所有细节（如 BnB 一般）或是让你对其全知全能，但它能带你踏上你的集群之路。在我的带领下开始吧。</p>
<p><a href="https://camo.githubusercontent.com/c9607305263cc460603eaba038ec6aae543784bb/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f646f636b65722d737761726d2d7465617365722e6a7067"><img src="https://p0.ssl.qhimg.com/t01a4456aeb7f493ffe.jpg" alt="Teaser"></a></p>
<h3><a href="#技术概要"></a>技术概要</h3>
<p>如果把 Docker 详细而又好用的文档照搬到这里那将太丢人了，所以我将简要概括下这个技术的概要。我们已经有了 Docker，对吧。现在，你想要更多的服务器作为 Docker 主机，但同时你希望它们属于同一个逻辑上的实体。也就是说，你想建立一个集群。</p>
<p>我们先从一个主机组成的集群开始。当你在一个主机上初始化一个 Swarm 集群，这台主机将成为这个集群的管理者（manager）。从技术角度来讲，它成为了共识组（consensus group）中的一个节点node。其背后的数学逻辑建立在 <a href="https://en.wikipedia.org/wiki/Raft_%28computer_science%29">Raft</a> 算法之上。管理者（manager）负责调度任务。而具体的任务则会委任给各个加入了 Swarm 集群的工作者（worker）节点。这些操作将由 Node API 所管理。虽说我讨厌 API 这个词汇，但我必须在这里用到它。</p>
<p>Service API 是这个实现中的第二个组件。它允许管理者（manager）节点在所有的 Swarm 集群节点上创建一个分布式的服务。这个服务可以被复制（replicated），也就是说它们（LCTT 译注：指这些服务）会由平衡机制被分配到集群中（LCTT 译注：指 replicated 模式，多个容器实例将会自动调度任务到集群中的一些满足条件的节点），或者可以分配给全局（LCTT 译注：指 global 模式），也就是说每个节点都会运行一个容器实例。</p>
<p>此外还有更多的功课需要做，但这些信息已经足够你上路了。现在，我们开始整些实际的。我们的目标平台是 <a href="http://www.dedoimedo.com/computers/lenovo-g50-centos-xfce.html">CentOS 7.2</a>，有趣的是在我写这篇教程的时候，它的软件仓库中只有 1.10 版的 Docker，也就是说我必须手动更新以使用 Swarm。我们将在另一篇教程中讨论这个问题。接下来我们还有一个跟进的指南，其中涵盖了如何将新的节点加入我们现有的集群（LCTT 译注：指刚刚建立的单节点集群），并且我们将使用 <a href="http://www.dedoimedo.com/computers/fedora-24-gnome.html">Fedora</a> 进行一个非对称的配置。至此，请确保正确的配置已经就位，并有一个工作的集群启动并正在运行（LCTT 译注：指第一个节点的 Docker 已经安装并已进入 Swarm 模式，但到这里笔者并没有介绍如何初始化 Swarm 集群，不过别担心下章会讲）。</p>
<h3><a href="#配置镜像和服务"></a>配置镜像和服务</h3>
<p>我将尝试配置一个负载均衡的 <a href="https://hub.docker.com/_/httpd/">Apache</a> 服务，并使用多个容器实例通过唯一的 IP 地址提供页面内容。挺标准的吧（LCTT 译注：指这个负载均衡的网页服务器）。这个例子同时也突出了你想要使用集群的大多数原因：可用性、冗余、横向扩展以及性能。当然，你同时需要考虑<a href="http://www.dedoimedo.com/computers/docker-networking.html">网络</a>和<a href="http://www.dedoimedo.com/computers/docker-data-volumes.html">储存</a>这两块，但它们超出了这篇指南所涉及的范围了。</p>
<p>这个 Dockerfile 模板其实可以在官方镜像仓库里的 httpd 下找到。你只需一个最简单的设置来起步。至于如何下载或创建自己的镜像，请参考我的入门指南，链接可以在这篇教程的顶部可以找到。</p>
<pre><code class="hljs groovy">docker build -t my-apache2 .
Sending build context to Docker daemon <span class="hljs-number">2.048</span> kB
Step <span class="hljs-number">1</span> : FROM <span class="hljs-string">httpd:</span><span class="hljs-number">2.4</span>
Trying to pull repository docker.io<span class="hljs-regexp">/library/</span>httpd ...
<span class="hljs-number">2.4</span>: Pulling from docker.io<span class="hljs-regexp">/library/</span>httpd
<span class="hljs-symbol">
8ad8b3f87b37:</span> Pull complete
<span class="hljs-string">c95e1f92326d:</span> Pull complete
<span class="hljs-number">96e8046</span><span class="hljs-string">a7a4e:</span> Pull complete
<span class="hljs-number">00</span><span class="hljs-string">a0d292c371:</span> Pull complete
<span class="hljs-number">3</span><span class="hljs-string">f7586acab34:</span> Pull complete
<span class="hljs-string">Digest:</span> <span class="hljs-string">sha256:</span><span class="hljs-number">3</span>ad4d7c4f1815bd1c16788a57f81b413...a915e50a0d3a4
<span class="hljs-string">Status:</span> Downloaded newer image <span class="hljs-keyword">for</span> docker.io/<span class="hljs-string">httpd:</span><span class="hljs-number">2.4</span>
 ---&gt; fe3336dd034d
Step <span class="hljs-number">2</span> : COPY ..<span class="hljs-regexp">/public-html/</span> <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/apache2/</span>htdocs/
...

</code></pre><p><a href="https://camo.githubusercontent.com/8aae35fd0305b7434b0bfb20718ef2f6f296beda/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f646f636b65722d737761726d2d696d6167652d637265617465642e706e67"><img src="https://p0.ssl.qhimg.com/t0168689d26aa977ecc.png" alt="Image created"></a></p>
<p>在你继续下面的步骤之前，你应该确保你能无错误的启动一个容器实例并能链接到这个网页服务器上（LCTT 译注：使用下面的命令）。一旦你确保你能连上，我们就可以开始着手创建一个分布式的服务。</p>
<pre><code class="hljs dockerfile">docker <span class="hljs-keyword">run</span><span class="bash"> -dit --name my-running-app my-apache2
</span>
</code></pre><p>将这个 IP 地址输入浏览器，看看会出现什么。</p>
<h3><a href="#swarm-初始化和配置"></a>Swarm 初始化和配置</h3>
<p>下一步就是启动 Swarm 集群了。你将需要这些最基础的命令来开始，它们与 Docker 博客中的例子非常相似：</p>
<pre><code class="hljs routeros">docker<span class="hljs-built_in"> service </span>create --name frontend --replicas 5 -p 80:80/tcp my-apache2:latest

</code></pre><p>这里我们做了什么？我们创建了一个叫做 <code>frontent</code> 的服务，它有五个容器实例。同时我们还将主机的 80 端口和这些容器的 80 端口相绑定。我们将使用刚刚新创建的 Apache 镜像来做这个测试。然而，当你在自己的电脑上直接键入上面的指令时，你将看到下面的错误：</p>
<pre><code class="hljs routeros">docker<span class="hljs-built_in"> service </span>create --name frontend --replicas 5 -p 80:80/tcp my-apache2:latest
<span class="hljs-builtin-name">Error</span> response <span class="hljs-keyword">from</span> daemon: This node is <span class="hljs-keyword">not</span> a swarm manager. Use <span class="hljs-string">"docker swarm init"</span> <span class="hljs-keyword">or</span> <span class="hljs-string">"docker swarm join"</span> <span class="hljs-keyword">to</span> connect this node <span class="hljs-keyword">to</span> swarm <span class="hljs-keyword">and</span> try again.

</code></pre><p>这意味着你没有将你的主机（节点）配置成一个 Swarm 管理者（manager）。你可以在这台主机上初始化 Swarm 集群或是让它加入一个现有的集群。由于我们目前还没有一个现成的集群，我们将初始化它（LCTT 译注：指初始化 Swarm 集群并使当前节点成为 manager）：</p>
<pre><code class="hljs crmsh">docker swarm init
Swarm initialized: current <span class="hljs-keyword">node</span> <span class="hljs-title">(dm58mmsczqemiikazbfyfwqpd</span>) is now a manager.

</code></pre><p>为了向这个 Swarm 集群添加一个工作者（worker），请执行下面的指令：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">docker</span> <span class="hljs-selector-tag">swarm</span> <span class="hljs-selector-tag">join</span> \
<span class="hljs-selector-tag">--token</span> <span class="hljs-selector-tag">SWMTKN-1-4ofd46a2nfyvrqwu8w5oeetukrbylyznxla</span>
9<span class="hljs-selector-tag">srf9vxkxysj4p8-eu5d68pu5f1ci66s7w4wjps1u</span> \
10<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.15</span><span class="hljs-selector-pseudo">:2377</span>

</code></pre><p>为了向这个 Swarm 集群添加一个管理者（manager），请执行 <code>docker swarm join-token manager</code> 并按照指示操作。</p>
<p>操作后的输出不用解释已经很清楚明了。我们成功的创建了一个 Swarm 集群。新的节点们将需要正确的令牌（token）来加入这个 Swarm 集群。如果你需要配置防火墙，你还需找到它的 IP 地址和端口（LCTT 译注：指 Docker 的 Swarm 模式通讯所需的端口，默认 2377）。此外，你还可以向 Swarm 集群中添加管理者节点。现在，重新执行刚刚的服务创建指令：</p>
<pre><code class="hljs routeros">docker<span class="hljs-built_in"> service </span>create --name frontend --replicas 5 -p 80:80/tcp my-apache2:latest
6lrx1vhxsar2i50is8arh4ud1

</code></pre><h3><a href="#测试连通性"></a>测试连通性</h3>
<p>现在，我们来验证下我们的服务是否真的工作了。从某些方面讲，这很像我们在 <a href="http://www.dedoimedo.com/computers/vagrant-intro.html">Vagrant</a> 和 <a href="http://www.dedoimedo.com/computers/vagrant-coreos.html">coreOS</a> 中做的事情那样。毕竟它们的原理几乎相同。相同指导思想的不同实现罢了（LCTT 译注：笔者观点，无法苟同）。首先需要确保 <code>docker ps</code> 能够给出正确的输出。你应该能看到所创建服务的多个容器副本。</p>
<pre><code class="hljs x86asm">docker ps
CONTAINER ID        IMAGE               COMMAND              CREATED             STATUS              PORTS              
NAMES
cda532f67d55        my-apache2:latest   <span class="hljs-string">"httpd-foreground"</span>  
<span class="hljs-number">2</span> minutes ago       <span class="hljs-meta">Up</span> <span class="hljs-number">2</span> minutes        <span class="hljs-number">80</span>/tcp              frontend<span class="hljs-meta">.1</span>.2sobjfchdyucschtu2xw6ms9a
75fe6e0aa77b        my-apache2:latest   <span class="hljs-string">"httpd-foreground"</span>  
<span class="hljs-number">2</span> minutes ago       <span class="hljs-meta">Up</span> <span class="hljs-number">2</span> minutes        <span class="hljs-number">80</span>/tcp              frontend<span class="hljs-meta">.4</span>.ag77qtdeby9fyvif5v6c4zcpc
3ce824d3151f        my-apache2:latest   <span class="hljs-string">"httpd-foreground"</span>  
<span class="hljs-number">2</span> minutes ago       <span class="hljs-meta">Up</span> <span class="hljs-number">2</span> minutes        <span class="hljs-number">80</span>/tcp              frontend<span class="hljs-meta">.2</span>.b6fqg6sf4hkeqs86ps4zjyq65
eda01569181d        my-apache2:latest   <span class="hljs-string">"httpd-foreground"</span>  
<span class="hljs-number">2</span> minutes ago       <span class="hljs-meta">Up</span> <span class="hljs-number">2</span> minutes        <span class="hljs-number">80</span>/tcp              frontend<span class="hljs-meta">.5</span>.0rmei3zeeh8usagg7fn3olsp4
497ef904e381        my-apache2:latest   <span class="hljs-string">"httpd-foreground"</span>  
<span class="hljs-number">2</span> minutes ago       <span class="hljs-meta">Up</span> <span class="hljs-number">2</span> minutes        <span class="hljs-number">80</span>/tcp              frontend<span class="hljs-meta">.3</span>.7m83qsilli5dk8rncw3u10g5a

</code></pre><p>我也测试了不同的、非常规的端口，它们都能正常工作。对于你如何连接服务器和收取请求你将会有很多可配置的余地。你可以使用 localhost 或者 Docker 网络接口（笔者注：应该是指 Docker 的默认网桥 docker0，其网关为 172.17.0.1） IP 地址的正确端口去访问。下面的例子使用了端口 1080：</p>
<p><a href="https://camo.githubusercontent.com/88b2201ab59a1c5ced4c9c80e21e7fe8d75b36bd/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f646f636b65722d737761726d2d352d7265706c696361732d7765622d776f726b732e6a7067"><img src="https://p0.ssl.qhimg.com/t0195eed3a6635b5fb9.jpg" alt="Replicated Web service works"></a></p>
<p>至此，这是一个非常粗略、简单的开始。真正的挑战是创建一个优化过的、可扩展的服务，但是它们需要一个准确的技术用例。此外，你还会用到 <code>docker info</code> 和 <code>docker service</code>（还有 <code>inspect</code> 和 <code>ps</code>）命令来详细了解你的集群是如何工作的。</p>
<h3><a href="#可能会遇到的问题"></a>可能会遇到的问题</h3>
<p>你可能会在把玩 Docker 和 Swarm 时遇到一些小的问题（也许没那么小）。比如 SELinux 也许会抱怨你正在执行一些非法的操作（LCTT 译注：指在强制访问控制策略中没有权限的操作）。然而，这些错误和警告应该不会对你造成太多阻碍。</p>
<p><a href="https://camo.githubusercontent.com/2d0031de6f29f37f3e9647386c76aa0741025216/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f646f636b65722d737761726d2d73656c696e75782d616c6572742e706e67"><img src="https://p0.ssl.qhimg.com/t012224c48ba75d9f2c.png" alt="SELinux alert"></a></p>
<ul>
<li><p><code>docker service</code> 不是一条命令（<code>docker service is not a docker command</code>）</p>
<p>当你尝试执行必须的命令去创建一个复制模式（replicated）的服务时，你可能会遇到一条错误说 <code>docker: 'service' is not a docker command</code>（LCTT 译注：见下面的例子）。这表示你的 Docker 版本不对（使用 <code>-v</code> 选项来检查）。我们将在将来的教程讨论如何修复这个问题。</p>
<pre><code class="hljs livecodeserver"> docker service <span class="hljs-built_in">create</span> <span class="hljs-comment">--name frontend --replicas 5 -p 80:80/tcp my-apache2:latest</span>
 docker: <span class="hljs-string">'service'</span> is <span class="hljs-keyword">not</span> <span class="hljs-keyword">a</span> docker <span class="hljs-keyword">command</span>.

</code></pre></li>
<li><p><code>docker tag</code> 无法识别（<code>docker tag not recognized</code>）</p>
<p>你也许会看到下面的错误：</p>
<pre><code class="hljs routeros"> docker<span class="hljs-built_in"> service </span>create -name frontend -replicas 5 -p 80:80/tcp my-apache2:latest
 <span class="hljs-builtin-name">Error</span> response <span class="hljs-keyword">from</span> daemon: rpc error: code = 3 desc = ContainerSpec: <span class="hljs-string">"-name"</span> is <span class="hljs-keyword">not</span> a valid repository/tag

</code></pre><p>关于这个错误已经有多个相关的<a href="https://github.com/docker/docker/issues/24192">讨论</a>和<a href="http://stackoverflow.com/questions/38618609/docker-swarm-1-12-name-option-not-recognized">帖子</a>了。其实这个错误也许相当无辜。你也许是从浏览器粘贴的命令，在浏览器中的横线也许没被正确解析（笔者注：应该用 <code>--name</code> 而不是 <code>-name</code>）。就是这么简单的原因所导致的。</p>
</li>
</ul>
<h3><a href="#扩展阅读"></a>扩展阅读</h3>
<p>关于这个话题还有很多可谈的，包含 1.12 版之前的 Swarm 集群实现（笔者注：旧的 Swarm 集群实现，下文亦作<code>独立版本</code>，需要 Consul 等应用提供服务发现），以及当前的 Docker 版本提供的（笔者注：新的 Swarm 集群实现，亦被称为 Docker 引擎的 Swarm 模式）。也就是说，请别偷懒花些时间阅读以下内容：</p>
<ul>
<li>Docker Swarm <a href="https://docs.docker.com/swarm/">概述</a>（独立版本的 Swarm 集群安装）</li>
<li><a href="https://docs.docker.com/swarm/install-manual/">构建</a>一个生产环境的 Swarm 集群（独立版本安装）</li>
<li><a href="https://docs.docker.com/swarm/install-w-machine/">安装并创建</a>一个 Docker Swarm 集群（独立版本安装）</li>
<li>Docker 引擎 Swarm <a href="https://docs.docker.com/engine/swarm/">概述</a>（对于 1.12 版）</li>
<li><a href="https://docs.docker.com/engine/swarm/swarm-tutorial/">Swarm</a> 模式入门（对于 1.12 版）</li>
</ul>
<h3><a href="#总结"></a>总结</h3>
<p>你总算看到这里了。到这里仍然无法保证你学到了什么，但我相信你还是会觉得这篇文章有些用的。它涵盖了一些基础的概念，以及一个 Swarm 集群模式是如何工作的以及它能做什么的概述，与此同时我们也成功的下载了并创建了我们的网页服务器的镜像，并且在之后基于它运行了多个集群式的容器实例。虽然我们目前只在单一节点做了以上实验，但是我们会在将来解释清楚（LCTT 译注：以便解释清楚多节点的 Swarm 集群操作）。并且我们解决了一些常见的问题。</p>
<p>我希望你能认为这篇指南足够有趣。结合着我过去所写的关于 Docker 的文章，这些文章应该能给你一个像样的解释，包括：怎么样操作镜像、网络栈、储存、以及现在的集群。就当热身吧。的确，请享受并期待在新的 Docker 教程中与你见面。我控几不住我记几啊。</p>
<p>祝你愉快。</p>
<hr>
<p>via: <a href="http://www.dedoimedo.com/computers/docker-swarm-intro.html">http://www.dedoimedo.com/computers/docker-swarm-intro.html</a></p>
<p>作者：<a href="http://www.dedoimedo.com/computers/docker-swarm-intro.html">Dedoimedo</a> 译者：<a href="https://github.com/vizv">Viz</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Docker 引擎的 Swarm 模式：入门教程

## 原文链接
[https://www.zcfy.cc/article/docker-engine-swarm-mode-intro-tutorial](https://www.zcfy.cc/article/docker-engine-swarm-mode-intro-tutorial)

