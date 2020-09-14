---
title: '可以运行在 Windows 10 中的最实用的 Linux 命令' 
date: 2019-01-20 2:30:11
hidden: true
slug: v7udicf0lyb
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#可以运行在-windows-10-中的最实用的-linux-命令"></a>可以运行在 Windows 10 中的最实用的 Linux 命令</h1>
<p>在本系列早先的文章中，我们讨论了关于如何在 <a href="https://www.linux.com/blog/learn/2018/2/how-get-started-using-wsl-windows-10">Windows 10 上开启 WSL 之旅</a> 的内容。作为本系列的最后一篇文章，我们准备探讨一些能在 Windows 10 上广泛使用的 Linux 命令。</p>
<p>话题深入之前，请先让我们明确本教程所适用的人群。本文适用于使用 Windows 10 系统，但是又想在 Azure、AWS 或是私有云平台上学习 Linux 的初级开发者。换句话说，就是为了帮助初次接触 Linux 系统的 Windows 10 用户。</p>
<p>您的工作任务决定了您所需要的命令，而我的需求可能和您的不一样。本文旨在帮助您在 Windwos 10 上舒服的使用 Linux。不过请牢记，WSL 并不提供硬件访问的功能，比如声卡、GPU，至少官方是这么描述的。但是这可能并不能阻止 Linux 用户的折腾精神。很多用户不仅完成了硬件访问，甚至已经在 Windows 10 上安装上了 Linux 桌面程序。但是本文并不会涉及这些内容，我们可能会讨论这些，但不是现在。</p>
<p>下面是我们需要着手的任务。</p>
<h3><a href="#如何让您的-linux-系统保持到最新的版本"></a>如何让您的 Linux 系统保持到最新的版本</h3>
<p>因为 Linux 运行在了 Windows 系统中，所以您将被剥夺 Linux 系统所提供的所有安全特性。另外，如果不及时给 Linux 系统打补丁，你的 Windows 设备将被迫暴露在外界威胁中，所以还请保持您的 Linux 为最新版本。</p>
<p>WSL 官方支持 openSUSE/SUSE Linux Enterprise 和 Ubuntu。您也可以安装其他发行版，但是我只需要它们当中的二者之一就可以完成我的所有工作，毕竟，我只需要访问一些 Linux 基础程序。</p>
<p><strong>更新 openSUSE Leap：</strong></p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo zypper up</span>

</code></pre><p>如果您想升级系统，您可以运行下面的命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo zypper dup</span>

</code></pre><p><strong>更新 Ubuntu：</strong></p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> update
sudo apt-<span class="hljs-builtin-name">get</span> dist-upgrade

</code></pre><p>这样你就安全了，由于 Linux 系统的更新是渐进式的，所以更新系统成为了我的日常。不像 Windows 10 的更新通常需要重启系统，而 Linux 不同，一般只有 KB 或是 MB 级的更新，无需重启。</p>
<h3><a href="#管理文件目录"></a>管理文件目录</h3>
<p>系统更新之后，我们来看看一些或普通或不太普通的任务。</p>
<p>系统更新之外的第二重要的任务是使用 Linux 管理本地和远程文件。我承认我更青睐图形界面程序，但是终端能提供更可靠、更有价值的服务。要不你使用资源管理器移动 1 TB 的文件试试？我通常使用 <code>rsync</code> 命令来移动大量文件。如果中断任务，<code>rsync</code> 可以在上次停止的位置继续工作。</p>
<p>虽然您可能更习惯使用 <code>cp</code> 或是 <code>mv</code> 命令复制、移动文件，但是我还是喜欢灵活的 <code>rsync</code> 命令，了解 <code>rsync</code> 对远程文件传输也有帮助。使用 <code>rsync</code> 大半为了完成下面三个任务：</p>
<p><strong>使用 rsync 复制整个目录：</strong></p>
<pre><code class="hljs jboss-cli">rsync -avzP <span class="hljs-string">/source-directory</span> <span class="hljs-string">/destination</span> directory

</code></pre><p><strong>使用 rsync 移动文件：</strong></p>
<pre><code class="hljs vim">rsync --<span class="hljs-built_in">remove</span>-<span class="hljs-keyword">source</span>-<span class="hljs-keyword">files</span> -avzP /<span class="hljs-keyword">source</span>-directory /destination-directory

</code></pre><p>在成功复制目标目录之后，此命令将删除源文件。</p>
<p><strong>使用 rsync 同步文件：</strong></p>
<p>我的文件可能在多处存储。但是，我只会在主要位置中增加或是删除。如果不使用专业的软件，同步文件可能会给用户带来挑战，而 <code>rsync</code> 刚好可以简化这个过程。这个命令可以让两个目录文件内容同步。不过要注意，这是一个单向同步，即从源位置同步到目标位置。</p>
<pre><code class="hljs jboss-cli">rsync <span class="hljs-params">--delete</span> -avzP <span class="hljs-string">/source-directory</span> <span class="hljs-string">/destination-directory</span>

</code></pre><p>如果源目录中没有找到文件，上述命令将删除目标目录中的文件。换言之，它创建了源目录的一个镜像。</p>
<h3><a href="#文件自动备份"></a>文件自动备份</h3>
<p>保持文件备份是一项乏味的工作。为了保持我的设备的完全同步，我运行了一个 cron 作业在夜间保持我的所有目录同步。不过我会留一个外部驱动器，基本上每周我都会手动同步一次。由于可能删掉我不想删除的文件，所以我并没有使用 <code>--delete</code> 选项。我会根据情况手动决定是否使用这个选项。</p>
<p><strong>创建 cron 作业，打开 crontab：</strong></p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">crontab -e</span>

</code></pre><p>移动大文件时，我会选择在系统空闲的深夜执行该命令。此命令将在每天早上 1 点运行，您大概可以这样修改它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> 0 1 * * * rsync -avzP /<span class="hljs-built_in">source</span>-directory /destination-directory</span>

</code></pre><p>这是使用 crontab 的定时作业的命令结构：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> m h dom mon dow <span class="hljs-built_in">command</span></span>

</code></pre><p>在此，<code>m</code> = 分钟，<code>h</code> = 小时，<code>dom</code> = 本月的某天，<code>mon</code> = 月，<code>dow</code> = 本周的某天。</p>
<p>我们将在每天早上 1 点运行这条命令。您可以选择 <code>dow</code> 或是 <code>dom</code>（比如，每月 5 号）等。您可以在 <a href="http://www.adminschoice.com/crontab-quick-reference">这里</a> 阅读更多相关内容。</p>
<h3><a href="#管理远程服务器"></a>管理远程服务器</h3>
<p>在 Windows 系统上使用 WSL 的优势之一就是能方便管理云上的 Linux 服务器，WSL 能提供原生的 Linux 工具给您。首先，您需要使用 <code>ssh</code> 命令登录远程 Linux 服务器。</p>
<p>比如，我的服务器 ip 是 192.168.0.112；端口为 2018（不是默认的 22 端口）；Linux 用户名是 swapnil，密码是 “就不告诉你”。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">ssh</span> <span class="hljs-selector-tag">-p2018</span> <span class="hljs-selector-tag">swapnil</span>@<span class="hljs-keyword">192</span>.<span class="hljs-keyword">168</span>.<span class="hljs-keyword">0</span>.<span class="hljs-keyword">112</span>

</code></pre><p>它会向您询问用户密码，然后您就可以登录到 Linux 服务器了。现在您可以在 Linux 服务器上执行任意您想执行的所有操作了。不需使用 PuTTY 程序了。</p>
<p>使用 <code>rsync</code> ，您可以很轻易的在本地机器和远程机器之间传输文件。源目录还是目标目录取决于您是上传文件到服务器，还是下载文件到本地目录，您可以使用 <code>username@IP-address-of-server:/path-of-directory</code> 来指定目录。</p>
<p>如果我想复制一些文本内容到服务器的 home 目录，命令如下：</p>
<pre><code class="hljs elixir">rsync -avzP /source-directory-on-local-machine ‘ssh -p2018’ swapnil<span class="hljs-variable">@192</span>.<span class="hljs-number">168.0</span>.<span class="hljs-number">112</span><span class="hljs-symbol">:/home/swapnil/Documents/</span>

</code></pre><p>这将会复制这些文件到远程服务器中 <code>Documents</code> 目录。</p>
<h3><a href="#总结"></a>总结</h3>
<p>本教程主要是为了证明您可以在 Windows 10 系统上通过 WSL 完成 Linux 方面的很大一部分的任务。通常来说，它提高了生产效率。现在，Linux 的世界已经向 Windwos 10 系统张开怀抱了，尽情探索吧。如果您有任何疑问，或是想了解 WSL 涉及到的其他层面，欢迎在下方的评论区分享您的想法。</p>
<p>在 <a href="https://training.linuxfoundation.org/linux-courses/system-administration-training/administering-linux-on-azure">Administering Linux on Azure (LFS205)</a> 课程中了解更多，可以在 <a href="http://bit.ly/2FpFtPg">这里</a> 注册。</p>
<hr>
<p>via: <a href="https://www.linux.com/blog/learn/2018/3/most-useful-linux-commands-you-can-run-windows-10">https://www.linux.com/blog/learn/2018/3/most-useful-linux-commands-you-can-run-windows-10</a></p>
<p>作者：<a href="https://www.linux.com/users/arnieswap">SAPNIL BHARTIYA</a> 译者：<a href="https://github.com/CYLeft">CYLeft</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可以运行在 Windows 10 中的最实用的 Linux 命令

## 原文链接
[https://www.zcfy.cc/article/most-useful-linux-commands-you-can-run-in-windows-10](https://www.zcfy.cc/article/most-useful-linux-commands-you-can-run-in-windows-10)

