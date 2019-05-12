---
title: '创建局域网内的离线 Yum 仓库' 
date: 2019-01-20 2:30:11
hidden: true
slug: 38z8ht5t4op
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#创建局域网内的离线-yum-仓库"></a>创建局域网内的离线 Yum 仓库</h1>
<p>在早先的教程中，我们讨论了<a href="https://linux.cn/article-9296-1.html">如何使用 ISO 镜像和在线 Yum 仓库的方式来创建自己的 Yum 仓库</a> 。创建自己的 Yum 仓库是一个不错的想法，但若网络中只有 2-3 台 Linux 机器那就没啥必要了。不过若你的网络中有大量的 Linux 服务器，而且这些服务器还需要定时进行升级，或者你有大量服务器无法直接访问互联网，那么创建自己的 Yum 仓库就很有必要了。</p>
<p>当我们有大量的 Linux 服务器，而每个服务器都直接从互联网上升级系统时，数据消耗会很可观。为了节省数据量，我们可以创建个离线 Yum 源并将之分享到本地网络中。网络中的其他 Linux 机器就可以直接从本地 Yum 上获取系统更新，从而节省数据量，而且传输速度也会很好。</p>
<p>我们可以使用下面两种方法来分享 Yum 仓库：</p>
<ul>
<li>使用 Web 服务器（Apache）</li>
<li>使用 FTP 服务器（VSFTPD）</li>
</ul>
<p>在开始讲解这两个方法之前，我们需要先根据<a href="https://linux.cn/article-9296-1.html">之前的教程</a>创建一个 Yum 仓库。</p>
<h3><a href="#使用-web-服务器"></a>使用 Web 服务器</h3>
<p>首先在 Yum 服务器上安装 Web 服务器（Apache），我们假设服务器 IP 是 <code>192.168.1.100</code>。我们已经在这台系统上配置好了 Yum 仓库，现在我们来使用 <code>yum</code> 命令安装 Apache Web 服务器，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yum install httpd</span>

</code></pre><p>下一步，拷贝所有的 rpm 包到默认的 Apache 根目录下，即 <code>/var/www/html</code>，由于我们已经将包都拷贝到了 <code>/YUM</code> 下，我们也可以创建一个软连接来从 <code>/var/www/html</code> 指向 <code>/YUM</code>。</p>
<pre><code class="hljs dts">$ ln -s <span class="hljs-meta-keyword">/var/</span>www<span class="hljs-meta-keyword">/html/</span>Centos /YUM

</code></pre><p>重启 Web 服务器应用改变：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> systemctl restart httpd</span>

</code></pre><h4><a href="#配置客户端机器"></a>配置客户端机器</h4>
<p>服务端的配置就完成了，现在需要配置下客户端来从我们创建的离线 Yum 中获取升级包，这里假设客户端 IP 为 <code>192.168.1.101</code>。</p>
<p>在 <code>/etc/yum.repos.d</code> 目录中创建 <code>offline-yum.repo</code> 文件，输入如下信息，</p>
<pre><code class="hljs stylus">$ vi /etc/yum<span class="hljs-selector-class">.repos</span><span class="hljs-selector-class">.d</span>/offline-yum<span class="hljs-selector-class">.repo</span>

</code></pre><pre><code class="hljs ini"><span class="hljs-attr">name</span>=Local YUM
<span class="hljs-attr">baseurl</span>=http://<span class="hljs-number">192.168</span>.<span class="hljs-number">1.100</span>/CentOS/<span class="hljs-number">7</span>
<span class="hljs-attr">gpgcheck</span>=<span class="hljs-number">0</span>
<span class="hljs-attr">enabled</span>=<span class="hljs-number">1</span>

</code></pre><p>客户端也配置完了。试一下用 <code>yum</code> 来安装/升级软件包来确认仓库是正常工作的。</p>
<h3><a href="#使用-ftp-服务器"></a>使用 FTP 服务器</h3>
<p>在 FTP 上分享 Yum，首先需要安装所需要的软件包，即 vsftpd。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> yum install vsftpd</span>

</code></pre><p>vsftp 的默认根目录为 <code>/var/ftp/pub</code>，因此你可以拷贝 rpm 包到这个目录，或者为它创建一个软连接：</p>
<pre><code class="hljs awk">$ ln -s <span class="hljs-regexp">/var/</span>ftp<span class="hljs-regexp">/pub /</span>YUM

</code></pre><p>重启服务应用改变：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> systemctl restart vsftpd</span>

</code></pre><h4><a href="#配置客户端机器-1"></a>配置客户端机器</h4>
<p>像上面一样，在 <code>/etc/yum.repos.d</code> 中创建 <code>offline-yum.repo</code> 文件，并输入下面信息，</p>
<pre><code class="hljs stylus">$ vi /etc/yum<span class="hljs-selector-class">.repos</span><span class="hljs-selector-class">.d</span>/offline-yum<span class="hljs-selector-class">.repo</span>

</code></pre><pre><code class="hljs ini"><span class="hljs-section">[Offline YUM]</span>
<span class="hljs-attr">name</span>=Local YUM
<span class="hljs-attr">baseurl</span>=ftp://<span class="hljs-number">192.168</span>.<span class="hljs-number">1.100</span>/pub/CentOS/<span class="hljs-number">7</span>
<span class="hljs-attr">gpgcheck</span>=<span class="hljs-number">0</span>
<span class="hljs-attr">enabled</span>=<span class="hljs-number">1</span>

</code></pre><p>现在客户机可以通过 ftp 接收升级了。要配置 vsftpd 服务器为其他 Linux 系统分享文件，请<a href="http://linuxtechlab.com/ftp-secure-installation-configuration/">阅读这篇指南</a>。</p>
<p>这两种方法都很不错，你可以任意选择其中一种方法。有任何疑问或这想说的话，欢迎在下面留言框中留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/offline-yum-repository-for-lan/">http://linuxtechlab.com/offline-yum-repository-for-lan/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
创建局域网内的离线 Yum 仓库

## 原文链接
[https://www.zcfy.cc/article/creating-an-offline-yum-repository-for-lan](https://www.zcfy.cc/article/creating-an-offline-yum-repository-for-lan)

