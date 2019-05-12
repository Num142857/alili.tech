---
title: '如何在 Docker 中设置 Go 并部署应用' 
date: 2019-01-24 2:30:11
hidden: true
slug: qvn6r2cn1pe
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-docker-中设置-go-并部署应用"></a>如何在 Docker 中设置 Go 并部署应用</h1>
<p>嗨，在本教程中，我们将学习如何使用 docker 部署 golang web 应用程序。 你可能已经知道，由于 golang 的高性能和可靠性，docker 是完全是用 golang 写的。在我们详细介绍之前，请确保你已经安装了 docker 以及 golang 并对它们有基本了解。</p>
<h3><a href="#关于-docker"></a>关于 docker</h3>
<p>Docker 是一个开源程序，它可以将应用及其完整的依赖包捆绑到一起，并打包为容器，与宿主机共享相同的 Linux 内核。另一方面，像 VMware 这样的基于 hypervisor 的虚拟化操作系统容器提供了高级别的隔离和安全性，这是由于客户机和主机之间的通信是通过 hypervisor 来实现的，它们不共享内核空间。但是硬件仿真也导致了性能的开销，所以容器虚拟化诞生了，以提供一个轻量级的虚拟环境，它将一组进程和资源与主机以及其它容器分组及隔离，因此，容器内部的进程无法看到容器外部的进程或资源。</p>
<h3><a href="#用-go-语言创建一个-hello-world-web-应用"></a>用 Go 语言创建一个 “Hello World” web 应用</h3>
<p>首先我们为 Go 应用创建一个目录，它会在浏览器中显示 “Hello World”。创建一个 <code>web-app</code> 目录并使它成为当前目录。进入 <code>web-app</code> 应用目录并编辑一个名为 <code>main.go</code> 的文件。</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~</span><span class="hljs-comment"># mkdir web-app</span>
root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~</span><span class="hljs-comment"># cd web-app/</span>
root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/web-app</span><span class="hljs-comment"># vim.tiny main.go</span>

package main
import (
    <span class="hljs-string">"fmt"</span>
    <span class="hljs-string">"net/http"</span>
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, <span class="hljs-string">"Hello %s"</span>, r.URL.Path[<span class="hljs-number">1</span><span class="hljs-symbol">:</span>])
}

func main() {
    http.HandleFunc(<span class="hljs-string">"/World"</span>, handler)
    http.ListenAndServe(<span class="hljs-string">":8080"</span>, <span class="hljs-keyword">nil</span>)
}

</code></pre><p>使用下面的命令运行上面的 “Hello World” Go 程序。在浏览器中输入 <code>http://127.0.0.1:8080/World</code> 测试，你会在浏览器中看到 “Hello World”。</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/web-app</span><span class="hljs-comment"># PORT=8080 go run main.go</span>

</code></pre><p>下一步是将上面的应用在 docker 中容器化。因此我们会创建一个 dockerfile 文件，它会告诉 docker 如何容器化我们的 web 应用。</p>
<pre><code class="hljs dockerfile">root@demohost:~/web-app<span class="hljs-comment"># vim.tiny Dockerfile</span>

<span class="hljs-comment"># 得到最新的 golang docker 镜像</span>
<span class="hljs-keyword">FROM</span> golang:latest

<span class="hljs-comment"># 在容器内部创建一个目录来存储我们的 web 应用，接着使它成为工作目录。</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir -p /go/src/web-app
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /go/src/web-app
</span>
<span class="hljs-comment"># 复制 web-app 目录到容器中</span>
<span class="hljs-keyword">COPY</span><span class="bash"> . /go/src/web-app
</span>
<span class="hljs-comment"># 下载并安装第三方依赖到容器中</span>
<span class="hljs-keyword">RUN</span><span class="bash"> go-wrapper download
</span><span class="hljs-keyword">RUN</span><span class="bash"> go-wrapper install
</span>
<span class="hljs-comment"># 设置 PORT 环境变量</span>
<span class="hljs-keyword">ENV</span> PORT <span class="hljs-number">8080</span>

<span class="hljs-comment"># 给主机暴露 8080 端口，这样外部网络可以访问你的应用</span>
<span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">8080</span>

<span class="hljs-comment"># 告诉 Docker 启动容器运行的命令</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"go-wrapper"</span>, <span class="hljs-string">"run"</span>]
</span>
</code></pre><h3><a href="#构建运行容器"></a>构建/运行容器</h3>
<p>使用下面的命令构建你的 Go web-app，你会在成功构建后获得确认。</p>
<pre><code class="hljs routeros">root@demohost:~/web-app# docker build --rm -t web-app .
Sending build context <span class="hljs-keyword">to</span> Docker daemon 3.584 kB
<span class="hljs-keyword">Step</span> 1 : <span class="hljs-keyword">FROM</span> golang:latest
latest: Pulling <span class="hljs-keyword">from</span> library/golang
386a066cd84a: Already exists
75ea84187083: Pull complete
88b459c9f665: Pull complete
a31e17eb9485: Pull complete
1b272d7ab8a4: Pull complete
eca636a985c1: Pull complete
08158782d330: Pull complete
Digest: sha256:02718aef869a8b00d4a36883c82782b47fc01e774d0ac1afd434934d8ccfee8c
Status: Downloaded newer image <span class="hljs-keyword">for</span> golang:latest
---&gt; 9752d71739d2
<span class="hljs-keyword">Step</span> 2 : <span class="hljs-builtin-name">RUN</span> mkdir -p /go/src/web-app
---&gt; Running <span class="hljs-keyword">in</span> 9aef92fff9e8
---&gt; 49936ff4f50c
Removing intermediate container 9aef92fff9e8
<span class="hljs-keyword">Step</span> 3 : WORKDIR /go/src/web-app
---&gt; Running <span class="hljs-keyword">in</span> 58440a93534c
---&gt; 0703574296dd
Removing intermediate container 58440a93534c
<span class="hljs-keyword">Step</span> 4 : COPY . /go/src/web-app
---&gt; 82be55bc8e9f
Removing intermediate container cae309ac7757
<span class="hljs-keyword">Step</span> 5 : <span class="hljs-builtin-name">RUN</span> go-wrapper download
---&gt; Running <span class="hljs-keyword">in</span> 6168e4e96ab1
+ exec go <span class="hljs-builtin-name">get</span> -v -d
---&gt; 59664b190fee
Removing intermediate container 6168e4e96ab1
<span class="hljs-keyword">Step</span> 6 : <span class="hljs-builtin-name">RUN</span> go-wrapper install
---&gt; Running <span class="hljs-keyword">in</span> e56f093b6f03
+ exec go install -v
web-app
---&gt; 584cd410fdcd
Removing intermediate container e56f093b6f03
<span class="hljs-keyword">Step</span> 7 : ENV<span class="hljs-built_in"> PORT </span>8080
---&gt; Running <span class="hljs-keyword">in</span> 298e2a415819
---&gt; c87fd2b43977
Removing intermediate container 298e2a415819
<span class="hljs-keyword">Step</span> 8 : EXPOSE 8080
---&gt; Running <span class="hljs-keyword">in</span> 4f639a3790a7
---&gt; 291167229d6f
Removing intermediate container 4f639a3790a7
<span class="hljs-keyword">Step</span> 9 : CMD go-wrapper <span class="hljs-builtin-name">run</span>
---&gt; Running <span class="hljs-keyword">in</span> 6cb6bc28e406
---&gt; b32ca91bdfe0
Removing intermediate container 6cb6bc28e406
Successfully built b32ca91bdfe0

</code></pre><p>现在可以运行我们的 web-app 了，可以执行下面的命令。</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/web-app</span><span class="hljs-comment"># docker run -p 8080:8080 --name="test" -d web-app</span>
<span class="hljs-number">7644606</span>b9af28a3ef1befd926f216f3058f500ffad44522c1d4756c576cfa85b

</code></pre><p>进入 <code>http://localhost:8080/World</code> 浏览你的 web 应用。你已经成功容器化了一个可重复的/确定性的 Go web 应用。使用下面的命令来启动、停止并检查容器的状态。</p>
<pre><code class="hljs elixir"><span class="hljs-comment">### 列出所有容器</span>
root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/</span> docker ps -a

<span class="hljs-comment">### 使用 id 启动容器</span>
root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/</span> docker start CONTAINER_ID_OF_WEB_APP

<span class="hljs-comment">### 使用 id 停止容器</span>
root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/</span> docker stop CONTAINER_ID_OF_WEB_APP

</code></pre><h3><a href="#重新构建镜像"></a>重新构建镜像</h3>
<p>假设你正在开发 web 应用程序并在更改代码。现在要在更新代码后查看结果，你需要重新生成 docker 镜像、停止旧镜像并运行新镜像，并且每次更改代码时都要这样做。为了使这个过程自动化，我们将使用 docker 卷在主机和容器之间共享一个目录。这意味着你不必为在容器内进行更改而重新构建镜像。容器如何检测你是否对 web 程序的源码进行了更改？答案是有一个名为 “Gin” 的好工具 <a href="https://github.com/codegangsta/gin">https://github.com/codegangsta/gin</a>，它能检测是否对源码进行了任何更改，然后重建镜像/二进制文件并在容器内运行更新过代码的进程。</p>
<p>要使这个过程自动化，我们将编辑 Dockerfile 并安装 Gin 将其作为入口命令来执行。我们将开放 <code>3030</code> 端口（Gin 代理），而不是 <code>8080</code>。 Gin 代理将转发流量到 web 程序的 <code>8080</code> 端口。</p>
<pre><code class="hljs dockerfile">root@demohost:~/web-app<span class="hljs-comment"># vim.tiny Dockerfile</span>

<span class="hljs-comment"># 得到最新的 golang docker 镜像</span>
<span class="hljs-keyword">FROM</span> golang:latest

<span class="hljs-comment"># 在容器内部创建一个目录来存储我们的 web 应用，接着使它称为工作目录。</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir -p /go/src/web-app
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /go/src/web-app
</span>
<span class="hljs-comment"># 复制 web 程序到容器中</span>
<span class="hljs-keyword">COPY</span><span class="bash"> . /go/src/web-app
</span>
<span class="hljs-comment"># 下载并安装第三方依赖到容器中</span>
<span class="hljs-keyword">RUN</span><span class="bash"> go get github.com/codegangsta/gin
</span><span class="hljs-keyword">RUN</span><span class="bash"> go-wrapper download
</span><span class="hljs-keyword">RUN</span><span class="bash"> go-wrapper install
</span>
<span class="hljs-comment"># 设置 PORT 环境变量</span>
<span class="hljs-keyword">ENV</span> PORT <span class="hljs-number">8080</span>

<span class="hljs-comment"># 给主机暴露 8080 端口，这样外部网络可以访问你的应用</span>
<span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">3030</span>

<span class="hljs-comment"># 启动容器时运行 Gin</span>
<span class="hljs-keyword">CMD</span><span class="bash"> gin run
</span>
<span class="hljs-comment"># 告诉 Docker 启动容器运行的命令</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"go-wrapper"</span>, <span class="hljs-string">"run"</span>]
</span>
</code></pre><p>现在构建镜像并启动容器：</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/web-app</span><span class="hljs-comment"># docker build --rm -t web-app .</span>

</code></pre><p>我们会在当前 web 程序的根目录下运行 docker，并通过暴露的 <code>3030</code> 端口链接 CWD （当前工作目录）到容器中的应用目录下。</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@demohost</span><span class="hljs-symbol">:~/web-app</span><span class="hljs-comment"># docker run -p 3030:3030 -v `pwd`:/go/src/web-app --name="test" -d web-app</span>

</code></pre><p>打开 <code>http://localhost:3030/World</code>， 你就能看到你的 web 程序了。现在如果你改变了任何代码，会在浏览器刷新后反映在你的浏览器中。</p>
<h3><a href="#总结"></a>总结</h3>
<p>就是这样，我们的 Go web 应用已经运行在 Ubuntu 16.04 Docker 容器中运行了！你可以通过使用 Go 框架来快速开发 API、网络应用和后端服务，从而扩展当前的网络应用。</p>
<hr>
<p>via: <a href="http://linoxide.com/containers/setup-go-docker-deploy-application/">http://linoxide.com/containers/setup-go-docker-deploy-application/</a></p>
<p>作者：<a href="http://linoxide.com/author/dwijadasd/">Dwijadas Dey</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Docker 中设置 Go 并部署应用

## 原文链接
[https://www.zcfy.cc/article/how-setup-go-in-docker-and-deploy-an-application](https://www.zcfy.cc/article/how-setup-go-in-docker-and-deploy-an-application)

