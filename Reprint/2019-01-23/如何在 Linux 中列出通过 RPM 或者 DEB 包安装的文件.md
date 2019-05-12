---
title: '如何在 Linux 中列出通过 RPM 或者 DEB 包安装的文件' 
date: 2019-01-23 2:30:08
hidden: true
slug: fe4nufdp0v
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中列出通过-rpm-或者-deb-包安装的文件"></a>如何在 Linux 中列出通过 RPM 或者 DEB 包安装的文件</h1>
<p>你是否想要了解安装包中各个文件在 Linux 系统中安装（位于）的位置？我们将在本文介绍如何列出文件的来源，或存在于某个特定包或者一组软件包中的文件。</p>
<p>这篇文章可以帮你轻松地找到重要的软件包文件，如配置文件、帮助文档等。我们来看看找出文件在哪个包中或者从哪个包中安装的几个方法：</p>
<h3><a href="#如何列出-linux-中全部已安装软件包的文件"></a>如何列出 Linux 中全部已安装软件包的文件</h3>
<p>你可以使用 <a href="http://www.tecmint.com/list-installed-packages-in-rhel-centos-fedora/">repoquery 命令</a>，它是 <a href="http://www.tecmint.com/linux-yum-package-management-with-yum-utils/">yum-utils</a> 的一部分，用来列出给定的软件包在 CentOS/RHEL 系统上安装的文件。</p>
<p>要安装并使用 yum-utils，运行下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum update </span>
<span class="hljs-meta">#</span><span class="bash"> yum install yum-utils</span>

</code></pre><p>现在你可以列出一个已安装包的文件了，比如 httpd 服务器 （注意包名是大小写敏感的）。<code>--installed</code> 表示已经安装的包，<code>-l</code> 列出所有的文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> repoquery --installed -l httpd</span>
<span class="hljs-meta">#</span><span class="bash"> dnf repoquery --installed -l httpd  [On Fedora 22+ versions]</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/Repoquery-List-Installed-Files-of-Httpd.png"><img src="https://p0.ssl.qhimg.com/t015c58d4c405c8b18d.png" alt="Repoquery List Installed Files of Httpd"></a></p>
<p><em>repoquery 列出 httpd 安装的文件</em></p>
<p>重要：在 Fedora 22 以上的版本中，<code>repoquery</code> 命令在基于 RPM 的发行版中已经与 <a href="http://www.tecmint.com/dnf-commands-for-fedora-rpm-package-management/">dnf 包管理器</a>整合，可以用上面的方法列出安装的文件。</p>
<p>除此之外，你也可以使用下面的 <a href="http://www.tecmint.com/20-practical-examples-of-rpm-commands-in-linux/">rpm 命令</a>列出 .rpm 包中或已经安装的 .rpm 包的文件，下面的 <code>-q</code> 和 <code>-l</code> 表示列出其后跟着的包中的文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> rpm -ql httpd</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/rpm-ql-httpd.png"><img src="https://p2.ssl.qhimg.com/t0149fedbc48012a83f.png" alt="RPM Query Package for Installed Files"></a></p>
<p><em>rpm 查询已安装程序的安装包</em></p>
<p>另外一个有用的建议是使用 <code>-p</code> 在安装之前列出 <code>.rpm</code> 中的文件。</p>
<pre><code class="hljs css"># <span class="hljs-selector-tag">rpm</span> <span class="hljs-selector-tag">-qlp</span> <span class="hljs-selector-tag">telnet-server-1</span><span class="hljs-selector-class">.2-137</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.i586</span><span class="hljs-selector-class">.rpm</span>

</code></pre><p>在 Debian/Ubuntu 发行版中，你可以使用 <a href="http://www.tecmint.com/dpkg-command-examples/">dpkg 命令</a>带上 <code>-L</code> 标志在 Debian 系统或其衍生版本中列出给定 .deb 包的安装的文件。</p>
<p>在这个例子中，我们会列出 apache2 Web 服务器安装的文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> dpkg -L apache2</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/03/dpkg-List-Installed-Packages.png"><img src="https://p3.ssl.qhimg.com/t0122d9e2bf4dfa6ca6.png" alt="dpkg List Installed Packages"></a></p>
<p><em>dpkg 列出安装的包</em></p>
<p>不要忘记查看其它有关在 Linux 中软件包管理的文章。</p>
<ol>
<li><a href="http://www.tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement/">20 个有用的 yum 包管理命令</a></li>
<li>[20 个有用的 rpm 包管理命令] <a href="http://www.tecmint.com/20-practical-examples-of-rpm-commands-in-linux/">2</a></li>
<li>[15 个 Ubuntu 中有用的 apt 包管理命令] <a href="http://www.tecmint.com/apt-advanced-package-command-examples-in-ubuntu/">3</a></li>
<li><a href="http://www.tecmint.com/dpkg-command-examples/">15 个 Ubuntu 中有用的 dpkg命令</a></li>
<li><a href="http://www.tecmint.com/linux-package-managers/">5 个最佳的对 Linux 新手的包管理器</a></li>
</ol>
<p>就是这样了！在本文中，我们向你展示了如何在 Linux 中列出/找到给定的软件包或软件包组安装的所有文件。在下面的评论栏中分享你的想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 的爱好者，目前任 TecMint 的作者，志向是一名 Linux 系统管理员、web 开发者。他喜欢用电脑工作，并热衷于分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/list-files-installed-from-rpm-deb-package-in-linux/">http://www.tecmint.com/list-files-installed-from-rpm-deb-package-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/oska874">ezio</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中列出通过 RPM 或者 DEB 包安装的文件

## 原文链接
[https://www.zcfy.cc/article/how-to-list-files-installed-from-a-rpm-or-deb-package-in-linux](https://www.zcfy.cc/article/how-to-list-files-installed-from-a-rpm-or-deb-package-in-linux)

