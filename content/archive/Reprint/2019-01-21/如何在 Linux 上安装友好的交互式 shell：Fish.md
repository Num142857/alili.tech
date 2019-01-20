---
title: '如何在 Linux 上安装友好的交互式 shell：Fish' 
date: 2019-01-21 2:30:06
hidden: true
slug: e7ac2ct29mu
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-上安装友好的交互式-shellfish"></a>如何在 Linux 上安装友好的交互式 shell：Fish</h1>
<p>Fish，友好的交互式 shellFriendly Interactive SHell 的缩写，它是一个适于装备于类 Unix 系统的智能而用户友好的 shell。Fish 有着很多重要的功能，比如自动建议、语法高亮、可搜索的历史记录（像在 bash 中 <code>CTRL+r</code>）、智能搜索功能、极好的 VGA 颜色支持、基于 web 的设置方式、完善的手册页和许多开箱即用的功能。尽管安装并立即使用它吧。无需更多其他配置，你也不需要安装任何额外的附加组件/插件!</p>
<p>在这篇教程中，我们讨论如何在 Linux 中安装和使用 fish shell。</p>
<h4><a href="#安装-fish"></a>安装 Fish</h4>
<p>尽管 fish 是一个非常用户友好的并且功能丰富的 shell，但并没有包括在大多数 Linux 发行版的默认仓库中。它只能在少数 Linux 发行版中的官方仓库中找到，如 Arch Linux，Gentoo，NixOS，和 Ubuntu 等。然而，安装 fish 并不难。</p>
<p>在 Arch Linux 和它的衍生版上，运行以下命令来安装它。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">sudo pacman -S fish</span>

</code></pre><p>在 CentOS 7 上以 root 运行以下命令：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /etc/yum.repos.d/
wget http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/CentOS_7/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
yum install fish

</code></pre><p>在 CentOS 6 上以 root 运行以下命令：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /etc/yum.repos.d/
wget http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/CentOS_6/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
yum install fish

</code></pre><p>在 Debian 9 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">wget -nv http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Debian_9.<span class="hljs-number">0</span>/Release.key -O Release.key
apt-key <span class="hljs-built_in">add</span> - &lt; Release.key
<span class="hljs-keyword">echo</span> <span class="hljs-string">'deb http://download.opensuse.org/repositories/shells:/fish:/release:/2/Debian_9.0/ /'</span> &gt; /etc/apt/sources.<span class="hljs-keyword">list</span>.d/fish.<span class="hljs-keyword">list</span>
apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>
apt-<span class="hljs-built_in">get</span> install fish

</code></pre><p>在 Debian 8 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">wget -nv http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Debian_8.<span class="hljs-number">0</span>/Release.key -O Release.key
apt-key <span class="hljs-built_in">add</span> - &lt; Release.key
<span class="hljs-keyword">echo</span> <span class="hljs-string">'deb http://download.opensuse.org/repositories/shells:/fish:/release:/2/Debian_8.0/ /'</span> &gt; /etc/apt/sources.<span class="hljs-keyword">list</span>.d/fish.<span class="hljs-keyword">list</span>
apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span>
apt-<span class="hljs-built_in">get</span> install fish

</code></pre><p>在 Fedora 26 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">dnf config-manager --<span class="hljs-built_in">add</span>-repo http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Fedora_26/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
dnf install fish

</code></pre><p>在 Fedora 25 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">dnf config-manager --<span class="hljs-built_in">add</span>-repo http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Fedora_25/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
dnf install fish

</code></pre><p>在 Fedora 24 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">dnf config-manager --<span class="hljs-built_in">add</span>-repo http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Fedora_24/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
dnf install fish

</code></pre><p>在 Fedora 23 上以 root 运行以下命令：</p>
<pre><code class="hljs vim">dnf config-manager --<span class="hljs-built_in">add</span>-repo http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/Fedora_23/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
dnf install fish

</code></pre><p>在 openSUSE 上以 root 运行以下命令：</p>
<pre><code class="hljs cmake">zypper <span class="hljs-keyword">install</span> fish

</code></pre><p>在 RHEL 7 上以 root 运行以下命令：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /etc/yum.repos.d/
wget http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/RHEL_7/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
yum install fish

</code></pre><p>在 RHEL-6 上以 root 运行以下命令：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">cd</span> /etc/yum.repos.d/
wget http<span class="hljs-variable">s:</span>//download.opensuse.org/repositories/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>/RedHat_RHEL-<span class="hljs-number">6</span>/<span class="hljs-keyword">shell</span><span class="hljs-variable">s:fish</span>:release:<span class="hljs-number">2</span>.repo
yum install fish

</code></pre><p>在 Ubuntu 和它的衍生版上：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> update
sudo apt-<span class="hljs-builtin-name">get</span> install fish

</code></pre><p>就这样了。是时候探索 fish shell 了。</p>
<h3><a href="#用法"></a>用法</h3>
<p>要从你默认的 shell 切换到 fish,请执行以下操作：</p>
<pre><code class="hljs dockerfile">$ fish
Welcome to fish, the friendly interactive <span class="hljs-keyword">shell</span><span class="bash">

</span></code></pre><p>你可以在 <code>~/.config/fish/config.fish</code> 上找到默认的 fish 配置（类似于 <code>.bashrc</code>）。如果它不存在，就创建它吧。</p>
<h4><a href="#自动建议"></a>自动建议</h4>
<p>当我输入一个命令，它以浅灰色自动建议一个命令。所以，我需要输入一个 Linux 命令的前几个字母，然后按下 <code>tab</code> 键来完成这个命令。</p>
<p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-1.png"><img src="https://p0.ssl.qhimg.com/t012c6ce4c7ec93f9d3.png" alt=""></a></p>
<p>如果有更多的可能性，它将会列出它们。你可以使用上/下箭头键从列表中选择列出的命令。在选择你想运行的命令后，只需按下右箭头键，然后按下 <code>ENTER</code> 运行它。</p>
<p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-2.png"><img src="https://p0.ssl.qhimg.com/t01a7e42cfa7219454f.png" alt=""></a></p>
<p>无需 <code>CTRL+r</code> 了！正如你已知道的，我们通过按 <code>CTRL+r</code> 来反向搜索 Bash shell 中的历史命令。但在 fish shell 中是没有必要的。由于它有自动建议功能，只需输入命令的前几个字母，然后从历史记录中选择已经执行的命令。很酷，是吧。</p>
<h4><a href="#智能搜索"></a>智能搜索</h4>
<p>我们也可以使用智能搜索来查找一个特定的命令、文件或者目录。例如，我输入一个命令的一部分，然后按向下箭头键进行智能搜索，再次输入一个字母来从列表中选择所需的命令。</p>
<p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-6.png"><img src="https://p0.ssl.qhimg.com/t01b49fae93b374be4e.png" alt=""></a></p>
<h4><a href="#语法高亮"></a>语法高亮</h4>
<p>当你输入一个命令时，你将注意到语法高亮。请看下面当我在 Bash shell 和 fish shell 中输入相同的命令时截图的区别。</p>
<p>Bash：</p>
<p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-3.png"><img src="https://p0.ssl.qhimg.com/t0174ebbf517352a79c.png" alt=""></a></p>
<p>Fish：</p>
<p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-4.png"><img src="https://p0.ssl.qhimg.com/t01a38113c18ad0301b.png" alt=""></a></p>
<p>正如你所看到的，<code>sudo</code> 在 fish shell 中已经被高亮显示。此外，默认情况下它将以红色显示无效命令。</p>
<h4><a href="#基于-web-的配置方式"></a>基于 web 的配置方式</h4>
<p>这是 fish shell 另一个很酷的功能。我们可以设置我们的颜色、更改 fish 提示符，并从网页上查看所有功能、变量、历史记录、键绑定。</p>
<p>启动 web 配置接口，只需输入：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">fish_config</span>

</code></pre><p><a href="http://www.ostechnix.com/wp-content/uploads/2017/12/fish-5.png"><img src="https://p0.ssl.qhimg.com/t013178f496348db492.png" alt=""></a></p>
<h4><a href="#手册页补完"></a>手册页补完</h4>
<p>Bash 和 其它 shells 支持可编程的补完，但只有 fish 可以通过解析已安装的手册来自动生成它们。</p>
<p>为此，请运行：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">fish_update_completions</span>

</code></pre><p>实例输出将是：</p>
<pre><code class="hljs livescript">Parsing man pages <span class="hljs-keyword">and</span> writing completions <span class="hljs-keyword">to</span> <span class="hljs-regexp">/home/sk/</span>.local<span class="hljs-regexp">/share/fish/generated_completions/</span>
 <span class="hljs-number">3435</span> / <span class="hljs-number">3435</span> : zramctl.<span class="hljs-number">8.gz</span>

</code></pre><h4><a href="#禁用问候语"></a>禁用问候语</h4>
<p>默认情况下，fish 在启动时问候你（“Welcome to fish, the friendly interactive shell”）。如果你不想要这个问候消息，可以禁用它。为此，编辑 fish 配置文件：</p>
<pre><code class="hljs arduino">vi ~/.<span class="hljs-built_in">config</span>/fish/<span class="hljs-built_in">config</span>.fish

</code></pre><p>添加以下行：</p>
<pre><code class="hljs gams"><span class="hljs-keyword">set</span> -g <span class="hljs-comment">-x fish_greeting</span> <span class="hljs-comment">''</span>

</code></pre><p>你也可以设置任意自定义的问候语，而不是禁用 fish 问候。</p>
<pre><code class="hljs gams"><span class="hljs-keyword">set</span> -g <span class="hljs-comment">-x fish_greeting</span> <span class="hljs-comment">'Welcome to OSTechNix'</span>

</code></pre><h4><a href="#获得帮助"></a>获得帮助</h4>
<p>这是另一个吸引我的令人印象深刻的功能。要在终端的默认 web 浏览器中打开 fish 文档页面，只需输入：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">help</span>

</code></pre><p>官方文档将会在你的默认浏览器中打开。另外，你可以使用手册页来显示任何命令的帮助部分。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">man fish</span>

</code></pre><h4><a href="#设置-fish-为默认-shell"></a>设置 fish 为默认 shell</h4>
<p>非常喜欢它？太好了！设置它作为默认 shell 吧。为此，请使用命令 <code>chsh</code>：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">chsh</span> -s /usr/<span class="hljs-keyword">bin/fish
</span>
</code></pre><p>在这里，<code>/usr/bin/fish</code> 是 fish shell 的路径。如果你不知道正确的路径，以下命令将会帮助你：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">which</span> fish

</code></pre><p>注销并且重新登录以使用新的默认 shell。</p>
<p>请记住，为 Bash 编写的许多 shell 脚本可能不完全兼容 fish。</p>
<p>要切换回 Bash，只需运行：</p>
<pre><code class="hljs armasm"><span class="hljs-keyword">bash
</span>
</code></pre><p>如果你想 Bash 作为你的永久默认 shell，运行：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">chsh</span> -s /<span class="hljs-keyword">bin/bash
</span>
</code></pre><p>各位，这就是全部了。在这个阶段，你可能会得到一个有关 fish shell 使用的基本概念。 如果你正在寻找一个Bash的替代品，fish 可能是一个不错的选择。</p>
<p>Cheers!</p>
<p>资源:</p>
<ul>
<li><a href="https://fishshell.com/">fish shell 官网</a></li>
</ul>
<hr>
<p>via: <a href="https://www.ostechnix.com/install-fish-friendly-interactive-shell-linux/">https://www.ostechnix.com/install-fish-friendly-interactive-shell-linux/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 译者：<a href="https://github.com/kimii">kimii</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 上安装友好的交互式 shell：Fish

## 原文链接
[https://www.zcfy.cc/article/how-to-install-fish-the-friendly-interactive-shell-in-linux](https://www.zcfy.cc/article/how-to-install-fish-the-friendly-interactive-shell-in-linux)

