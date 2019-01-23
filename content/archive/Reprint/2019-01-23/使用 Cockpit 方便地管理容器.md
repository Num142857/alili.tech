---
title: '使用 Cockpit 方便地管理容器' 
date: 2019-01-23 2:30:08
hidden: true
slug: fahyds1afau
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-cockpit-方便地管理容器"></a>使用 Cockpit 方便地管理容器</h1>
<blockquote>
<p>如果你正在寻找一种管理运行容器的 Linux 服务器的简单方法，那么你应该看看 Cockpit。</p>
</blockquote>
<p>如果你管理着一台 Linux 服务器，那么你可能正在寻找一个可靠的管理工具。为了这个你可能已经看了 <a href="http://www.webmin.com/">Webmin</a> 和 <a href="http://cpanel.com/">cPanel</a> 这类软件。但是，如果你正在寻找一种简单的方法来管理还包括了 Docker 的 Linux 服务器，那么有一个工具可以用于这个需求：<a href="http://cockpit-project.org/">Cockpit</a>。</p>
<p>为什么使用 Cockpit？因为它可以处理这些管理任务：</p>
<ul>
<li>连接并管理多台机器</li>
<li>通过 Docker 管理容器</li>
<li>与 Kubernetes 或 Openshift 集群进行交互</li>
<li>修改网络设置</li>
<li>管理用户帐号</li>
<li>通过基于 Web 的 shell 访问</li>
<li>通过图表查看系统性能信息</li>
<li>查看系统服务和日志文件</li>
</ul>
<p>Cockpit 可以安装在 <a href="https://www.debian.org/">Debian</a>、<a href="https://www.redhat.com/en">Red Hat</a>、<a href="https://www.centos.org/">CentOS</a>、<a href="https://www.archlinux.org/">Arch Linux</a> 和 <a href="https://www.ubuntu.com/">Ubuntu</a> 之上。在这里，我将使用一台已经安装了 Docker 的 Ubuntu 16.04 服务器来安装系统。</p>
<p>在上面的功能列表中，其中最突出的是容器管理。为什么？因为它使安装和管理容器变得非常简单。事实上，你可能很难找到更好的容器管理解决方案。</p>
<p>因此，让我们来安装这个方案并看看它的使用是多么简单。</p>
<h3><a href="#安装"></a>安装</h3>
<p>正如我前面提到的，我将在一台运行着 Docker 的 Ubuntu 16.04 实例上安装 Cockpit。安装步骤很简单。你要做的第一件事是登录你的 Ubuntu 服务器。接下来，你必须使用下面的命令添加必要的仓库：</p>
<pre><code class="hljs smali">sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:cockpit-project/cockpit

</code></pre><p>出现提示时，按下键盘上的回车键，等待提示返回。一旦返回到 bash 提示符，使用下面的命令来更新 apt：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> <span class="hljs-builtin-name">get</span> update

</code></pre><p>使用下面的命令安装 Cockpit：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> -y install cockpit cockpit-docker

</code></pre><p>安装完成后，需要启动 Cockpit 服务并使它开机自动启动。要做到这个，使用下面的两个命令：</p>
<pre><code class="hljs routeros">sudo systemctl start cockpit
sudo systemctl <span class="hljs-builtin-name">enable</span> cockpit

</code></pre><p>安装就到这里了。</p>
<h3><a href="#登录到-cockpit"></a>登录到 Cockpit</h3>
<p>要访问 Cockpit 的 web 界面，打开浏览器（与 Cockpit 服务器在同一个网络内），输入 <code>http://IP_OF_SERVER:9090</code>，你就会看到登录页面（图 1）。</p>
<p><a href="https://camo.githubusercontent.com/53adae44cdaf2712bb3e9ccfe788ade023c55412/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f636f636b7069745f612e6a70673f69746f6b3d5256694f73743256"><img src="https://p0.ssl.qhimg.com/t01fa51653cb8f941d6.jpg" alt="login" title="login"></a></p>
<p><em>图 1：Cockpit 登录页面。</em></p>
<p>在 Ubuntu 中使用 Cockpit 有个警告。Cockpit 中的很多任务需要管理员权限。如果你使用普通用户登录，则无法使用 Docker 等一些工具。 要解决这个问题，你可以在 Ubuntu 上启用 root 用户。但这并不总是一个好主意。通过启用 root 帐户，你将绕过已经建立多年的安全系统。但是，在本文的用途中，我将使用以下两个命令启用 root 用户：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo passwd root
sudo passwd -u root</span> 

</code></pre><p>注意，请确保给 root 帐户一个强壮的密码。</p>
<p>你想恢复这个修改的话，你只需输入下面的命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo passwd -l root</span>

</code></pre><p>在其他发行版（如 CentOS 和 Red Hat）中，你可以使用用户名 <code>root</code> 及其密码登录 Cockpit，而无需像上面那样需要额外的步骤。</p>
<p>如果你对启用 root 用户感到担心，则可以在服务器的终端窗口拉取镜像（使用命令 <code>docker pull IMAGE_NAME</code>， 这里的 <code>IMAGE_NAME</code> 是你要拉取的镜像）。这会将镜像添加到你的 docker 服务器中，然后可以通过普通用户进行管理。唯一需要注意的是，普通用户必须使用以下命令将自己添加到 Docker 组：</p>
<pre><code class="hljs routeros">sudo usermod -aG docker<span class="hljs-built_in"> USER
</span>
</code></pre><p>其中，<code>USER</code> 是实际添加到组的用户名。在你完成后，重新登出并登入，接着使用下面的命令重启 Docker：</p>
<pre><code class="hljs routeros">sudo<span class="hljs-built_in"> service </span>docker restart

</code></pre><p>现在常规用户可以启动并停止 Docker 镜像/容器而无需启用 root 用户了。唯一一点是用户不能通过 Cockpit 界面添加新的镜像。</p>
<h3><a href="#使用-cockpit"></a>使用 Cockpit</h3>
<p>一旦你登录后，你可以看到 Cockpit 的主界面（图 2）。</p>
<p><a href="https://camo.githubusercontent.com/f8dec8c56869f273f9e72e4427c094fffb9fdbc7/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f636f636b7069745f622e6a70673f69746f6b3d745a434863712d59"><img src="https://p0.ssl.qhimg.com/t019b2a0ce9155daff9.jpg" alt="main window" title="main window"></a></p>
<p><em>图 2：Cockpit 主界面。</em></p>
<p>你可以通过每个栏目来检查服务器的状态等，但是我们想要直接进入容器。单击 “Containers” 那栏以显示当前运行的以及可用的镜像（图3）。</p>
<p><a href="https://camo.githubusercontent.com/41c974bb96fb52369b23c1dbff959c9754c61366/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f636f636b7069745f632e6a70673f69746f6b3d4f4f594a74327976"><img src="https://p0.ssl.qhimg.com/t019f5bb0753012f513.jpg" alt="Cockpit" title="Cockpit"></a></p>
<p><em>图 3：使用 Cockpit 管理容器难以置信地简单。</em></p>
<p>要启动一个镜像，只要找到镜像并点击关联的启动按钮。在弹出的窗口中（图 4），你可以在点击运行之前查看所有镜像的信息（并根据需要调整）。</p>
<p><a href="https://camo.githubusercontent.com/08b8f709863543a7bf52dc55ed220c5e4dcd1e6f/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f636f636b7069745f642e6a70673f69746f6b3d38756c6445715f72"><img src="https://p0.ssl.qhimg.com/t015600fad2f8ce74a6.jpg" alt="Running Docker image" title="Running Docker image"></a></p>
<p><em>图 4： 使用 Cockpit 运行 Docker 镜像。</em></p>
<p>镜像运行后，你可以点击它查看状态，并可以停止、重启、删除实例。你也可以点击修改资源限制并接着调整内存限制还有（或者）CPU 优先级。</p>
<h3><a href="#添加新的镜像"></a>添加新的镜像</h3>
<p>假设你以 root 用户身份登录。如果是这样，那么你可以在 Cockpit GUI 的帮助下添加新的镜像。在“ Container” 栏目下，点击获取新的镜像按钮，然后在新的窗口中搜索要添加的镜像。假设你要添加 CentOS 的最新官方版本。在搜索栏中输入 centos，在得到搜索结果后，选择官方列表，然后单击下载（图5）。</p>
<p><a href="https://camo.githubusercontent.com/599a68d344642bd4390e7882316a36dba82e44ee/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f636f636b7069745f662e6a70673f69746f6b3d5f53356738446132"><img src="https://p0.ssl.qhimg.com/t0167c89450f899806a.jpg" alt="Adding image" title="Adding image"></a></p>
<p><em>图 5：使用 Cockpit 添加最新的官方构建 CentOS 镜像到 Docker 中。</em></p>
<p>镜像下载完后，那它就在 Docker 中可用了，并可以通过 Cockpit 运行。</p>
<h3><a href="#如获取它那样简单"></a>如获取它那样简单</h3>
<p>管理 Docker 并不容易。是的，在 Ubuntu 上运行 Cockpit 会有一个警告，但如果这是你唯一的选择，那么也有办法让它工作。在 Cockpit 的帮助下，你不仅可以轻松管理 Docker 镜像，也可以在任何可以访问 Linux 服务器的 web 浏览器上这样做。请享受这个新发现的让 Docker 易用的方法。</p>
<p><em>在 Linux Foundation 以及 edX 中通过免费的 <a href="https://training.linuxfoundation.org/linux-courses/system-administration-training/introduction-to-linux">"Introduction to Linux"</a> 课程学习 Linux。</em></p>
<hr>
<p>via: <a href="https://www.linux.com/learn/intro-to-linux/2017/3/make-container-management-easy-cockpit">https://www.linux.com/learn/intro-to-linux/2017/3/make-container-management-easy-cockpit</a></p>
<p>作者：<a href="https://www.linux.com/users/jlwallen">JACK WALLEN</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Cockpit 方便地管理容器

## 原文链接
[https://www.zcfy.cc/article/make-container-management-easy-with-cockpit](https://www.zcfy.cc/article/make-container-management-easy-with-cockpit)

