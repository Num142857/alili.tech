---
title: '如何使用 Buildah 构建容器镜像' 
date: 2019-01-19 2:30:10
hidden: true
slug: 24ltn0rs7qv
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-buildah-构建容器镜像"></a>如何使用 Buildah 构建容器镜像</h1>
<p>Project Atomic 通过他们在 Open Container Initiative（OCI）上的努力创造了一个名为 <a href="https://github.com/projectatomic/buildah">Buildah</a> 的伟大工具。Buildah 能帮助创建、构建和更新，它支持 Docker 容器镜像以及 OCI 兼容镜像。</p>
<p>Buildah 处理构建容器镜像时无需安装完整的容器运行时或守护进程。这对建立容器的持续集成和持续交付管道尤其有用。</p>
<p>Buildah 使容器的文件系统可以直接供构建主机使用。这意味着构建工具在主机上可用就行，而不需要在容器镜像中可用，从而使构建更快速，镜像更小，更安全。Buildah 有 CentOS、Fedora 和 Debian 的软件包。</p>
<h3><a href="#安装-buildah"></a>安装 Buildah</h3>
<p>从 Fedora 26 开始 Buildah 可以使用 <code>dnf</code> 进行安装。</p>
<pre><code class="hljs mipsasm">$ sudo dnf <span class="hljs-keyword">install </span><span class="hljs-keyword">buildah </span>-y

</code></pre><p><code>buildah</code> 的当前版本为 0.16，可以通过以下命令显示。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> buildah --version</span>

</code></pre><h3><a href="#基本命令"></a>基本命令</h3>
<p>构建容器镜像的第一步是获取基础镜像，这是通过 Dockerfile 中的 <code>FROM</code> 语句完成的。Buildah 以类似的方式处理这个。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo buildah from fedora</span>

</code></pre><p>该命令将拉取 Fedora 的基础镜像并存储在主机上。通过执行以下操作可以检查主机上可用的镜像。</p>
<pre><code class="hljs sqf">$ sudo buildah images
<span class="hljs-built_in">IMAGE</span> ID <span class="hljs-built_in">IMAGE</span> <span class="hljs-built_in">NAME</span> CREATED AT <span class="hljs-built_in">SIZE</span>
<span class="hljs-number">9110</span>ae7f579f docker.io/library/fedora:latest Mar <span class="hljs-number">7</span>, <span class="hljs-number">2018</span> <span class="hljs-number">20</span>:<span class="hljs-number">51</span> <span class="hljs-number">234.7</span> MB

</code></pre><p>在拉取基础镜像后，有一个该镜像的运行容器实例，这是一个“工作容器”。</p>
<p>以下命令显示正在运行的容器。</p>
<pre><code class="hljs sqf">$ sudo buildah containers
CONTAINER ID BUILDER <span class="hljs-built_in">IMAGE</span> ID <span class="hljs-built_in">IMAGE</span> <span class="hljs-built_in">NAME</span>
CONTAINER <span class="hljs-built_in">NAME</span>
<span class="hljs-number">6112</span>db586ab9 * <span class="hljs-number">9110</span>ae7f579f docker.io/library/fedora:latest fedora-working-container

</code></pre><p>Buildah 还提供了一个非常有用的命令来停止和删除当前正在运行的所有容器。</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> sudo buildah rm --<span class="hljs-keyword">all</span>

</code></pre><p>完整的命令列表可以使用 <code>--help</code> 选项。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> buildah --<span class="hljs-built_in">help</span></span>

</code></pre><h3><a href="#构建一个-apache-web-服务器容器镜像"></a>构建一个 Apache Web 服务器容器镜像</h3>
<p>让我们看看如何使用 Buildah 在 Fedora 基础镜像上安装 Apache Web 服务器，然后复制一个可供服务的自定义 <code>index.html</code>。</p>
<p>首先让我们创建自定义的 <code>index.html</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"Hello Fedora Magazine !!!"</span> &gt; index.html</span>

</code></pre><p>然后在正在运行的容器中安装 httpd 包。</p>
<pre><code class="hljs dockerfile">$ sudo buildah <span class="hljs-keyword">from</span> fedora
$ sudo buildah <span class="hljs-keyword">run</span><span class="bash"> fedora-working-container dnf install httpd -y
</span>
</code></pre><p>让我们将 <code>index.html</code> 复制到 <code>/var/www/html/</code>。</p>
<pre><code class="hljs oxygene">$ sudo buildah <span class="hljs-keyword">copy</span> fedora-working-container <span class="hljs-keyword">index</span>.html /<span class="hljs-keyword">var</span>/www/html/<span class="hljs-keyword">index</span>.html

</code></pre><p>然后配置容器入口点以启动 httpd。</p>
<pre><code class="hljs routeros">$ sudo buildah<span class="hljs-built_in"> config </span>--entrypoint <span class="hljs-string">"/usr/sbin/httpd -DFOREGROUND"</span> fedora-working-container

</code></pre><p>现在为了使“工作容器”可用，<code>commit</code> 命令将容器保存到镜像。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo buildah commit fedora-working-container hello-fedora-magazine</span>

</code></pre><p>hello-fedora-magazine 镜像现在可用，并且可以推送到仓库以供使用。</p>
<pre><code class="hljs groovy">$ sudo buildah images
IMAGE ID IMAGE NAME CREATED
AT SIZE
<span class="hljs-number">9110</span>ae7f579f docker.io<span class="hljs-regexp">/library/</span><span class="hljs-string">fedora:</span>latest
Mar <span class="hljs-number">7</span>, <span class="hljs-number">2018</span> <span class="hljs-number">22</span>:<span class="hljs-number">51</span> <span class="hljs-number">234.7</span> MB
<span class="hljs-number">49</span>bd5ec5be71 docker.io<span class="hljs-regexp">/library/</span>hello-fedora-<span class="hljs-string">magazine:</span>latest
Apr <span class="hljs-number">27</span>, <span class="hljs-number">2018</span> <span class="hljs-number">11</span>:<span class="hljs-number">01</span> <span class="hljs-number">427.7</span> MB

</code></pre><p>通过运行以下步骤，还可以使用 Buildah 来测试此镜像。</p>
<pre><code class="hljs routeros">$ sudo buildah <span class="hljs-keyword">from</span> <span class="hljs-attribute">--name</span>=hello-magazine docker.io/library/hello-fedora-magazine
$ sudo buildah <span class="hljs-builtin-name">run</span> hello-magazine

</code></pre><p>访问 <a href="http://localhost">http://localhost</a> 将显示 “Hello Fedora Magazine !!!”</p>
<hr>
<p>via: <a href="https://fedoramagazine.org/daemon-less-container-management-buildah/">https://fedoramagazine.org/daemon-less-container-management-buildah/</a></p>
<p>作者：<a href="https://fedoramagazine.org/author/ashutoshbhakare/">Ashutosh Sudhakar Bhakare</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 Buildah 构建容器镜像

## 原文链接
[https://www.zcfy.cc/article/how-to-build-container-images-with-buildah](https://www.zcfy.cc/article/how-to-build-container-images-with-buildah)

