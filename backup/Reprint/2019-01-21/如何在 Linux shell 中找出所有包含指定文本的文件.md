---
title: '如何在 Linux shell 中找出所有包含指定文本的文件' 
date: 2019-01-21 2:30:06
hidden: true
slug: 7lyvmas7pjd
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-shell-中找出所有包含指定文本的文件"></a>如何在 Linux shell 中找出所有包含指定文本的文件</h1>
<p><strong>目标：</strong>本文提供一些关于如何搜索出指定目录或整个文件系统中那些包含指定单词或字符串的文件。</p>
<p><strong>难度：</strong>容易</p>
<p><strong>约定：</strong></p>
<ul>
<li><code>#</code> - 需要使用 root 权限来执行指定命令，可以直接使用 root 用户来执行也可以使用 <code>sudo</code> 命令</li>
<li><code>$</code> - 可以使用普通用户来执行指定命令</li>
</ul>
<h3><a href="#案例"></a>案例</h3>
<h4><a href="#非递归搜索包含指定字符串的文件"></a>非递归搜索包含指定字符串的文件</h4>
<p>第一个例子让我们来搜索 <code>/etc/</code> 目录下所有包含 <code>stretch</code> 字符串的文件，但不去搜索其中的子目录:</p>
<h1>grep -s stretch /etc/*</h1>
<p>/etc/os-release:PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
/etc/os-release:VERSION="9 (stretch)"</p>
<p><code>grep</code> 的 <code>-s</code> 选项会在发现不存在或者不能读取的文件时隐藏报错信息。结果显示除了文件名之外，还有包含请求字符串的行也被一起输出了。</p>
<h4><a href="#递归地搜索包含指定字符串的文件"></a>递归地搜索包含指定字符串的文件</h4>
<p>上面案例中忽略了所有的子目录。所谓递归搜索就是指同时搜索所有的子目录。</p>
<p>下面的命令会在 <code>/etc/</code> 及其子目录中搜索包含 <code>stretch</code> 字符串的文件：</p>
<h1>grep -R stretch /etc/*</h1>
<p>/etc/apt/sources.list:# deb cdrom:[Debian GNU/Linux testing _Stretch_ - Official Snapshot amd64 NETINST Binary-1 20170109-05:56]/ stretch main
/etc/apt/sources.list:#deb cdrom:[Debian GNU/Linux testing _Stretch_ - Official Snapshot amd64 NETINST Binary-1 20170109-05:56]/ stretch main
/etc/apt/sources.list:deb <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main
/etc/apt/sources.list:deb-src <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main
/etc/apt/sources.list:deb <a href="http://security.debian.org/debian-security">http://security.debian.org/debian-security</a> stretch/updates main
/etc/apt/sources.list:deb-src <a href="http://security.debian.org/debian-security">http://security.debian.org/debian-security</a> stretch/updates main
/etc/dictionaries-common/words:backstretch
/etc/dictionaries-common/words:backstretch's
/etc/dictionaries-common/words:backstretches
/etc/dictionaries-common/words:homestretch
/etc/dictionaries-common/words:homestretch's
/etc/dictionaries-common/words:homestretches
/etc/dictionaries-common/words:outstretch
/etc/dictionaries-common/words:outstretched
/etc/dictionaries-common/words:outstretches
/etc/dictionaries-common/words:outstretching
/etc/dictionaries-common/words:stretch
/etc/dictionaries-common/words:stretch's
/etc/dictionaries-common/words:stretched
/etc/dictionaries-common/words:stretcher
/etc/dictionaries-common/words:stretcher's
/etc/dictionaries-common/words:stretchers
/etc/dictionaries-common/words:stretches
/etc/dictionaries-common/words:stretchier
/etc/dictionaries-common/words:stretchiest
/etc/dictionaries-common/words:stretching
/etc/dictionaries-common/words:stretchy
/etc/grub.d/00_header:background_image -m stretch <code>make\_system\_path\_relative\_to\_its\_root "$GRUB_BACKGROUND"</code>
/etc/os-release:PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
/etc/os-release:VERSION="9 (stretch)"</p>
<h4><a href="#搜索所有包含特定单词的文件"></a>搜索所有包含特定单词的文件</h4>
<p>上面 <code>grep</code> 命令的案例中列出的是所有包含字符串 <code>stretch</code> 的文件。也就是说包含 <code>stretches</code> ， <code>stretched</code> 等内容的行也会被显示。 使用 <code>grep</code> 的 <code>-w</code> 选项会只显示包含特定单词的行：</p>
<h1>grep -Rw stretch /etc/*</h1>
<p>/etc/apt/sources.list:# deb cdrom:[Debian GNU/Linux testing _Stretch_ - Official Snapshot amd64 NETINST Binary-1 20170109-05:56]/ stretch main
/etc/apt/sources.list:#deb cdrom:[Debian GNU/Linux testing _Stretch_ - Official Snapshot amd64 NETINST Binary-1 20170109-05:56]/ stretch main
/etc/apt/sources.list:deb <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main
/etc/apt/sources.list:deb-src <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main
/etc/apt/sources.list:deb <a href="http://security.debian.org/debian-security">http://security.debian.org/debian-security</a> stretch/updates main
/etc/apt/sources.list:deb-src <a href="http://security.debian.org/debian-security">http://security.debian.org/debian-security</a> stretch/updates main
/etc/dictionaries-common/words:stretch
/etc/dictionaries-common/words:stretch's
/etc/grub.d/00_header:background_image -m stretch `make_system_path_relative_to_its_root "$GRUB_BACKGROUND"`
/etc/os-release:PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
/etc/os-release:VERSION="9 (stretch)"</p>
<h4><a href="#显示包含特定文本的文件名"></a>显示包含特定文本的文件名</h4>
<p>上面的命令都会产生多余的输出。下一个案例则会递归地搜索 <code>etc</code> 目录中包含 <code>stretch</code> 的文件并只输出文件名：</p>
<h1>grep -Rl stretch /etc/*</h1>
<p>/etc/apt/sources.list
/etc/dictionaries-common/words
/etc/grub.d/00_header
/etc/os-release</p>
<h4><a href="#大小写不敏感的搜索"></a>大小写不敏感的搜索</h4>
<p>默认情况下搜索是大小写敏感的，也就是说当搜索字符串 <code>stretch</code> 时只会包含大小写一致内容的文件。</p>
<p>通过使用 <code>grep</code> 的 <code>-i</code> 选项，<code>grep</code> 命令还会列出所有包含 <code>Stretch</code> ， <code>STRETCH</code> ， <code>StReTcH</code> 等内容的文件，也就是说进行的是大小写不敏感的搜索。</p>
<h1>grep -Ril stretch /etc/*</h1>
<p>/etc/apt/sources.list
/etc/dictionaries-common/default.hash
/etc/dictionaries-common/words
/etc/grub.d/00_header
/etc/os-release</p>
<h4><a href="#搜索时包含排除指定文件"></a>搜索时包含/排除指定文件</h4>
<p><code>grep</code> 命令也可以只在指定文件中进行搜索。比如，我们可以只在配置文件（扩展名为<code>.conf</code>）中搜索指定的文本/字符串。 下面这个例子就会在 <code>/etc</code> 目录中搜索带字符串 <code>bash</code> 且所有扩展名为 <code>.conf</code> 的文件：</p>
<h1>grep -Ril bash /etc/*.conf</h1>
<p>OR</p>
<h1>grep -Ril --include=\<em>.conf bash /etc/</em></h1>
<p>/etc/adduser.conf</p>
<p>类似的，也可以使用 <code>--exclude</code> 来排除特定的文件：</p>
<h1>grep -Ril --exclude=\<em>.conf bash /etc/</em></h1>
<p>/etc/alternatives/view
/etc/alternatives/vim
/etc/alternatives/vi
/etc/alternatives/vimdiff
/etc/alternatives/rvim
/etc/alternatives/ex
/etc/alternatives/rview
/etc/bash.bashrc
/etc/bash_completion.d/grub
/etc/cron.daily/apt-compat
/etc/cron.daily/exim4-base
/etc/dictionaries-common/default.hash
/etc/dictionaries-common/words
/etc/inputrc
/etc/passwd
/etc/passwd-
/etc/profile
/etc/shells
/etc/skel/.profile
/etc/skel/.bashrc
/etc/skel/.bash_logout</p>
<h4><a href="#搜索时排除指定目录"></a>搜索时排除指定目录</h4>
<p>跟文件一样，<code>grep</code> 也能在搜索时排除指定目录。 使用 <code>--exclude-dir</code> 选项就行。</p>
<p>下面这个例子会搜索 <code>/etc</code> 目录中搜有包含字符串 <code>stretch</code> 的文件，但不包括 <code>/etc/grub.d</code> 目录下的文件：</p>
<h1>grep --exclude-dir=/etc/grub.d -Rwl stretch /etc/*</h1>
<p>/etc/apt/sources.list
/etc/dictionaries-common/words
/etc/os-release</p>
<h4><a href="#显示包含搜索字符串的行号"></a>显示包含搜索字符串的行号</h4>
<p><code>-n</code> 选项还会显示指定字符串所在行的行号:</p>
<h1>grep -Rni bash /etc/*.conf</h1>
<p>/etc/adduser.conf:6:DSHELL=/bin/bash</p>
<h4><a href="#寻找不包含指定字符串的文件"></a>寻找不包含指定字符串的文件</h4>
<p>最后这个例子使用 <code>-v</code> 来列出所有<strong>不</strong>包含指定字符串的文件。</p>
<p>例如下面命令会搜索 <code>/etc</code> 目录中不包含 <code>stretch</code> 的所有文件：</p>
<h1>grep -Rlv stretch /etc/*</h1>
<hr>
<p>via: <a href="https://linuxconfig.org/how-to-find-all-files-with-a-specific-text-using-linux-shell">https://linuxconfig.org/how-to-find-all-files-with-a-specific-text-using-linux-shell</a></p>
<p>作者：<a href="https://linuxconfig.org">Lubos Rendek</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux shell 中找出所有包含指定文本的文件

## 原文链接
[https://www.zcfy.cc/article/how-to-find-all-files-with-a-specific-text-using-linux-shell](https://www.zcfy.cc/article/how-to-find-all-files-with-a-specific-text-using-linux-shell)

