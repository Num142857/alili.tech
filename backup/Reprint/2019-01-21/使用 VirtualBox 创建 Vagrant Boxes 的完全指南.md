---
title: '使用 VirtualBox 创建 Vagrant Boxes 的完全指南' 
date: 2019-01-21 2:30:06
hidden: true
slug: sdsufmaz19c
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-virtualbox-创建-vagrant-boxes-的完全指南"></a>使用 VirtualBox 创建 Vagrant Boxes 的完全指南</h1>
<p>Vagrant 是一个用来创建和管理虚拟机环境的工具，常用于建设开发环境。 它在 Docker、VirtualBox、Hyper-V、Vmware、AWS 等技术的基础上构建了一个易于使用且易于复制、重建的环境。</p>
<p>Vagrant Boxes 简化了软件配置部分的工作，并且完全解决了软件开发项目中经常遇到的“它能在我机器上工作”的问题，从而提高开发效率。</p>
<p>在本文中，我们会在 Linux 机器上学习使用 VirtualBox 来配置 Vagrant Boxes。</p>
<h3><a href="#前置条件"></a>前置条件</h3>
<p>Vagrant 是基于虚拟化环境运行的，这里我们使用 VirtualBox 来提供虚拟化环境。 关于如何安装 VirutalBox 我们在“<a href="http://linuxtechlab.com/installing-virtualbox-on-linux-centos-ubuntu/">在 Linux 上安装 VirtualBox</a>” 中有详细描述，请阅读该文并安装 VirtualBox。</p>
<p>安装好 VirtualBox 后，下一步就是配置 Vagrant 了。</p>
<ul>
<li>推荐阅读：<a href="http://linuxtechlab.com/create-first-docker-container-beginners-guide/">创建你的 Docker 容器</a></li>
</ul>
<h3><a href="#安装"></a>安装</h3>
<p>VirtualBox 准备好后，我们来安装最新的 vagrant 包。 在写本文的时刻， Vagrant 的最新版本为 2.0.0。 使用下面命令下载最新的 rpm 文件：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>wget <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/releases.hashicorp.com/vagrant</span><span class="hljs-regexp">/2.0.0/vagrant</span>_2.<span class="hljs-number">0</span>.<span class="hljs-number">0_</span>x86_64.rpm

</code></pre><p>然后安装这个包:</p>
<pre><code class="hljs lsl">$ sudo yum install vagrant_2<span class="hljs-number">.0</span><span class="hljs-number">.0</span>_x86_64.rpm

</code></pre><p>如果是 Ubuntu，用下面这个命令来下载最新的 vagrant 包：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>wget <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/releases.hashicorp.com/vagrant</span><span class="hljs-regexp">/2.0.0/vagrant</span>_2.<span class="hljs-number">0</span>.<span class="hljs-number">0_</span>x86_64.deb

</code></pre><p>然后安装它，</p>
<pre><code class="hljs stylus">$ sudo dpkg -<span class="hljs-selector-tag">i</span> vagrant_2.<span class="hljs-number">0.0</span>_x86_64<span class="hljs-selector-class">.deb</span>

</code></pre><p>安装结束后，就该进入配置环节了。</p>
<h3><a href="#配置"></a>配置</h3>
<p>首先，我们需要创建一个目录给 vagrant 来安装我们需要的操作系统，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkdir /home/dan</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> /home/dan/vagrant</span>

</code></pre><p><strong>注意：</strong> 推荐在你的用户主目录下创建 vagrant，否则你可能会遇到本地用户相关的权限问题。</p>
<p>现在执行下面命令来安装操作系统，比如 CentOS：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant init centos/7</span>

</code></pre><p>如果要安装 Ubuntu 则运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant init ubuntu/trusty64</span>

</code></pre><p><a href="https://camo.githubusercontent.com/864a5b718ccf6f8e64d469254ef12c8bda6aac13/68747470733a2f2f69322e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f76616772616e742d312e706e673f726573697a653d3732312532433837"><img src="https://p0.ssl.qhimg.com/t01ee8ad773932daf21.png" alt="vagrant boxes"></a></p>
<p>这还会在存放 vagrant OS 的目录中创建一个叫做 <code>Vagrantfile</code> 的配置文件。它包含了一些关于操作系统、私有 IP 网络、转发端口、主机名等信息。 若我们需要创建一个新的操作系统， 也可以编辑这个问题。</p>
<p>一旦我们用 vagrant 创建/修改了操作系统，我们可以用下面命令启动它:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant up</span>

</code></pre><p>这可能要花一些时间，因为这条命令要构建操作系统，它需要从网络上下载所需的文件。 因此根据互联网的速度， 这个过程可能会比较耗时。</p>
<p><a href="https://camo.githubusercontent.com/05b8c611b21b78ba4661c56b337294b3258829ca/68747470733a2f2f69322e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f76616772616e742d322d65313531303535373536353738302e706e673f726573697a653d393830253243343134"><img src="https://p0.ssl.qhimg.com/t01a5f53e3ac4ff37db.png" alt="vagrant boxes"></a></p>
<p>这个过程完成后，你就可以使用下面这些命令来管理 vagrant 实例了。</p>
<p>启动 vagrant 服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant up</span>

</code></pre><p>关闭服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant halt</span>

</code></pre><p>完全删除服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant destroy</span>

</code></pre><p>使用 ssh 访问服务器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo vagrant ssh</span>

</code></pre><p>我们可以从 Vagrant Box 的启动过程中得到 ssh 的详细信息（参见上面的截屏）。</p>
<p>如果想看创建的 vagrant OS，可以打开 VirtualBox，然后你就能在 VirtualBox 创建的虚拟机中找到它了。 如果在 VirtualBox 中没有找到， 使用 <code>sudo</code> 权限打开 virtualbox， 然后应该就能看到了。</p>
<p><a href="https://camo.githubusercontent.com/51b6a902caebbe5a769ddeba8ff0fe89ac537d56/68747470733a2f2f69312e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f31302f76616772616e742d332e706e673f726573697a653d373639253243353832"><img src="https://p0.ssl.qhimg.com/t0188ef12e6e8533bbb.png" alt="vagrant boxes"></a></p>
<p><strong>注意：</strong> 在 <a href="https://app.vagrantup.com/boxes/search">Vagrant 官方网站</a>上可以下载预先配置好的 Vagrant OS。</p>
<p>这就是本文的内容了。如有疑问请在下方留言，我们会尽快回复。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/creating-vagrant-virtual-boxes-virtualbox/">http://linuxtechlab.com/creating-vagrant-virtual-boxes-virtualbox/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 VirtualBox 创建 Vagrant Boxes 的完全指南

## 原文链接
[https://www.zcfy.cc/article/complete-guide-for-creating-vagrant-boxes-with-virtualbox](https://www.zcfy.cc/article/complete-guide-for-creating-vagrant-boxes-with-virtualbox)

