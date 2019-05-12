---
title: '从 ISO 和在线仓库创建一个 Yum 仓库' 
date: 2019-01-21 2:30:06
hidden: true
slug: 92j4g61g2z
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#从-iso-和在线仓库创建一个-yum-仓库"></a>从 ISO 和在线仓库创建一个 Yum 仓库</h1>
<p>Yum 是 Centos/RHEL/Fedora 中最重要的工具之一。尽管在 Fedora 的最新版本中，它已经被 DNF 所取代，但这并不意味着它自生自灭了。它仍然被广泛用于安装 rpm 包，我们已经在前面的教程（[<strong>在这里阅读</strong>] <a href="http://linuxtechlab.com/using-yum-command-examples/">1</a>）中用示例讨论了 Yum。</p>
<p>在本教程中，我们将学习创建一个本地 Yum 仓库，首先使用系统的 ISO 镜像，然后创建一个在线 Yum 仓库的镜像。</p>
<h3><a href="#用-dvd-iso-创建-yum"></a>用 DVD ISO 创建 Yum</h3>
<p>我们在本教程中使用 Centos 7 dvd，同样的过程也应该可以用在 RHEL 7 上。</p>
<p>首先在根文件夹中创建一个名为 Yum 的目录</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkdir /YUM</span>

</code></pre><p>然后挂载 Centos 7 ISO：</p>
<pre><code class="hljs awk">$ mount -t iso9660 -o loop <span class="hljs-regexp">/home/</span>dan<span class="hljs-regexp">/Centos-7-x86_x64-DVD.iso /m</span>nt<span class="hljs-regexp">/iso/</span>

</code></pre><p>接下来，从挂载的 ISO 中复制软件包到 <code>/YUM</code> 中。当所有的软件包都被复制到系统中后，我们将安装创建 Yum 所需的软件包。打开 <code>/YUM</code> 并安装以下 RPM 包：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> rpm -ivh deltarpm</span>
<span class="hljs-meta">$</span><span class="bash"> rpm -ivh python-deltarpm</span>
<span class="hljs-meta">$</span><span class="bash"> rpm -ivh createrepo</span>

</code></pre><p>安装完成后，我们将在 <code>/etc/yum.repos.d</code> 中创建一个名 为 <code>local.repo</code> 的文件，其中包含所有的 Yum 信息。</p>
<pre><code class="hljs stylus">$ vi /etc/yum<span class="hljs-selector-class">.repos</span><span class="hljs-selector-class">.d</span>/local<span class="hljs-selector-class">.repo</span>

</code></pre><pre><code class="hljs makefile">LOCAL REPO]
Name=Local YUM
baseurl=file:///YUM
gpgcheck=0
enabled=1

</code></pre><p>保存并退出文件。接下来，我们将通过运行以下命令来创建仓库数据。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> createrepo -v /YUM</span>

</code></pre><p>创建仓库数据需要一些时间。一切完成后，请运行：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> yum clean <span class="hljs-keyword">all</span>

</code></pre><p>清理缓存，然后运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yum repolist</span>

</code></pre><p>检查所有仓库列表。你应该在列表中看到 <code>local.repo</code>。</p>
<h3><a href="#使用在线仓库创建镜像-yum-仓库"></a>使用在线仓库创建镜像 Yum 仓库</h3>
<p>创建在线 Yum 的过程与使用 ISO 镜像创建 Yum 类似，只是我们将从在线仓库而不是 ISO 中获取 rpm 软件包。</p>
<p>首先，我们需要找到一个在线仓库来获取最新的软件包。建议你找一个离你位置最近的在线 Yum 仓库，以优化下载速度。我们将使用下面的镜像，你可以从 <a href="http://mirror.centos.org/centos/">CENTOS 镜像列表</a>中选择一个离你最近的镜像。</p>
<p>选择镜像之后，我们将使用 <code>rsync</code> 将该镜像与我们的系统同步，但在此之前，请确保你服务器上有足够的空间。</p>
<pre><code class="hljs awk">$ rsync -avz rsync:<span class="hljs-regexp">//mi</span>rror.fibergrid.<span class="hljs-keyword">in</span><span class="hljs-regexp">/centos/</span><span class="hljs-number">7.2</span><span class="hljs-regexp">/os/</span>x86_64<span class="hljs-regexp">/Packages/</span>s<span class="hljs-regexp">/ /</span>YUM

</code></pre><p>同步将需要相当长一段时间（也许一个小时），这取决于你互联网的速度。同步完成后，我们将更新我们的仓库数据。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> createrepo - v /YUM</span>

</code></pre><p>我们的 Yum 已经可以使用了。我们可以创建一个 cron 任务来根据你的需求每天或每周定时地自动更新仓库数据。</p>
<p>要创建一个用于同步仓库的 cron 任务，请运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -e</span>

</code></pre><p>并添加以下行</p>
<pre><code class="hljs basic"><span class="hljs-symbol">30 </span><span class="hljs-number">12</span> * * * rsync -avz http://mirror.centos.org/centos/<span class="hljs-number">7</span>/os/x86_64/Packages/ /YUM

</code></pre><p>这会在每晚 12:30 同步 Yum。还请记住在 <code>/etc/yum.repos.d</code> 中创建仓库配置文件，就像我们上面所做的一样。</p>
<p>就是这样，你现在使用你自己的 Yum 仓库了。如果你喜欢它，请分享这篇文章，并在下面的评论栏留下你的意见/疑问。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/creating-yum-repository-iso-online-repo/">http://linuxtechlab.com/creating-yum-repository-iso-online-repo/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 ISO 和在线仓库创建一个 Yum 仓库

## 原文链接
[https://www.zcfy.cc/article/creating-a-yum-repository-from-iso-online-repo](https://www.zcfy.cc/article/creating-a-yum-repository-from-iso-online-repo)

