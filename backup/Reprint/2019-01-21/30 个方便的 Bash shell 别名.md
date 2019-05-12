---
title: '30 个方便的 Bash shell 别名' 
date: 2019-01-21 2:30:06
hidden: true
slug: 2jht7yu2u9e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#30-个方便的-bash-shell-别名"></a>30 个方便的 Bash shell 别名</h1>
<p>bash 别名alias只不过是指向命令的快捷方式而已。<code>alias</code> 命令允许用户只输入一个单词就运行任意一个命令或一组命令（包括命令选项和文件名）。执行 <code>alias</code> 命令会显示一个所有已定义别名的列表。你可以在 <a href="https://bash.cyberciti.biz/guide/%7E/.bashrc">~/.bashrc</a> 文件中自定义别名。使用别名可以在命令行中减少输入的时间，使工作更流畅，同时增加生产率。</p>
<p>本文通过 30 个 bash shell 别名的实际案例演示了如何创建和使用别名。</p>
<p><a href="https://camo.githubusercontent.com/1bddb24e1a52ab91bece6c1f4a6796ccccf69824/68747470733a2f2f7777772e6379626572636974692e62697a2f746970732f77702d636f6e74656e742f75706c6f6164732f323031322f30362f47657474696e672d537461727465642d576974682d426173682d5368656c6c2d416c69617365732d466f722d4c696e75782d556e69782e6a7067"><img src="https://p0.ssl.qhimg.com/t01d60e7dd0584c1dd6.jpg" alt="30 Useful Bash Shell Aliase For Linux/Unix Users"></a></p>
<h3><a href="#bash-alias-的那些事"></a>bash alias 的那些事</h3>
<p>bash shell 中的 alias 命令的语法是这样的：</p>
<pre><code class="hljs applescript"><span class="hljs-built_in">alias</span> [<span class="hljs-built_in">alias</span>-<span class="hljs-built_in">name</span>[=<span class="hljs-built_in">string</span>]...]

</code></pre><h4><a href="#如何列出-bash-别名"></a>如何列出 bash 别名</h4>
<p>输入下面的 <a href="https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html" title="See Linux/Unix alias command examples for more info">alias 命令</a>：</p>
<pre><code class="hljs applescript"><span class="hljs-built_in">alias</span>

</code></pre><p>结果为：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">alias</span> ..=<span class="hljs-string">'cd ..'</span>
<span class="hljs-keyword">alias</span> amazonbackup=<span class="hljs-string">'s3backup'</span>
<span class="hljs-keyword">alias</span> apt-<span class="hljs-keyword">get</span>=<span class="hljs-string">'sudo apt-get'</span>
...

</code></pre><p><code>alias</code> 命令默认会列出当前用户定义好的别名。</p>
<h4><a href="#如何定义或者创建一个-bash-shell-别名"></a>如何定义或者创建一个 bash shell 别名</h4>
<p>使用下面语法 <a href="https://bash.cyberciti.biz/guide/Create_and_use_aliases">创建别名</a>：</p>
<pre><code class="hljs applescript"><span class="hljs-built_in">alias</span> <span class="hljs-built_in">name</span> =value
<span class="hljs-built_in">alias</span> <span class="hljs-built_in">name</span> = 'command'
<span class="hljs-built_in">alias</span> <span class="hljs-built_in">name</span> = 'command arg1 arg2' 
<span class="hljs-built_in">alias</span> <span class="hljs-built_in">name</span> = '/path/<span class="hljs-keyword">to</span>/<span class="hljs-keyword">script</span>' 
<span class="hljs-built_in">alias</span> <span class="hljs-built_in">name</span> = '/path/<span class="hljs-keyword">to</span>/<span class="hljs-keyword">script</span>.pl arg1'

</code></pre><p>举个例子，输入下面命令并回车就会为常用的 <code>clear</code>（清除屏幕）命令创建一个别名 <code>c</code>：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> c = <span class="hljs-string">'clear'</span>

</code></pre><p>然后输入字母 <code>c</code> 而不是 <code>clear</code> 后回车就会清除屏幕了：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">c</span>

</code></pre><h4><a href="#如何临时性地禁用-bash-别名"></a>如何临时性地禁用 bash 别名</h4>
<p>下面语法可以<a href="https://www.cyberciti.biz/faq/bash-shell-temporarily-disable-an-alias/">临时性地禁用别名</a>：</p>
<pre><code class="hljs clean">## path/to/full/command
/usr/bin/clear
## call alias <span class="hljs-keyword">with</span> a backslash ##
\c
## use /bin/ls command and avoid ls alias ##
command ls

</code></pre><h4><a href="#如何删除-bash-别名"></a>如何删除 bash 别名</h4>
<p>使用 <a href="https://bash.cyberciti.biz/guide/Create_and_use_aliases#How_do_I_remove_the_alias.3F">unalias 命令来删除别名</a>。其语法为：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">unalias</span> aliasname
<span class="hljs-built_in">unalias</span> foo

</code></pre><p>例如，删除我们之前创建的别名 <code>c</code>：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">unalias</span> c

</code></pre><p>你还需要用文本编辑器删掉 <a href="https://bash.cyberciti.biz/guide/%7E/.bashrc">~/.bashrc 文件</a> 中的别名定义（参见下一部分内容）。</p>
<h4><a href="#如何让-bash-shell-别名永久生效"></a>如何让 bash shell 别名永久生效</h4>
<p>别名 <code>c</code> 在当前登录会话中依然有效。但当你登出或重启系统后，别名 <code>c</code> 就没有了。为了防止出现这个问题，将别名定义写入 <a href="https://bash.cyberciti.biz/guide/%7E/.bashrc">~/.bashrc file</a> 中，输入：</p>
<pre><code class="hljs stylus">vi ~/<span class="hljs-selector-class">.bashrc</span>

</code></pre><p>输入下行内容让别名 <code>c</code> 对当前用户永久有效：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> c = <span class="hljs-string">'clear'</span>

</code></pre><p>保存并关闭文件就行了。系统级的别名（也就是对所有用户都生效的别名）可以放在 <code>/etc/bashrc</code> 文件中。请注意，<code>alias</code> 命令内建于各种 shell 中，包括 ksh，tcsh/csh，ash，bash 以及其他 shell。</p>
<h4><a href="#关于特权权限判断"></a>关于特权权限判断</h4>
<p>可以将下面代码加入 <code>~/.bashrc</code>：</p>
<pre><code class="hljs gams"># <span class="hljs-keyword">if</span> user is <span class="hljs-keyword">not</span> root, pass <span class="hljs-keyword">all</span> commands via sudo #
<span class="hljs-keyword">if</span> [ <span class="hljs-symbol">$</span>UID -<span class="hljs-keyword">ne</span> <span class="hljs-number">0</span> ]; <span class="hljs-keyword">then</span>
    <span class="hljs-keyword">alias</span> reboot=<span class="hljs-string">'sudo reboot'</span>
    <span class="hljs-keyword">alias</span> update=<span class="hljs-string">'sudo apt-get upgrade'</span>
fi

</code></pre><h4><a href="#定义与操作系统类型相关的别名"></a>定义与操作系统类型相关的别名</h4>
<p>可以将下面代码加入 <code>~/.bashrc</code> <a href="https://bash.cyberciti.biz/guide/The_case_statement">使用 case 语句</a>：</p>
<pre><code class="hljs clean">### Get os name via uname ###
_myos=<span class="hljs-string">"$(uname)"</span>

### add alias <span class="hljs-keyword">as</span> per os using $_myos ###
<span class="hljs-keyword">case</span> $_myos <span class="hljs-keyword">in</span>
   Linux) alias foo=<span class="hljs-string">'/path/to/linux/bin/foo'</span>;;
   FreeBSD|OpenBSD) alias foo=<span class="hljs-string">'/path/to/bsd/bin/foo'</span> ;;
   SunOS) alias foo=<span class="hljs-string">'/path/to/sunos/bin/foo'</span> ;;
   *) ;;
esac

</code></pre><h3><a href="#30-个-bash-shell-别名的案例"></a>30 个 bash shell 别名的案例</h3>
<p>你可以定义各种类型的别名来节省时间并提高生产率。</p>
<h4><a href="#1控制-ls-命令的输出"></a>#1：控制 ls 命令的输出</h4>
<p><a href="https://www.cyberciti.biz/faq/ls-command-to-examining-the-filesystem/">ls 命令列出目录中的内容</a> 而你可以对输出进行着色：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-comment">## Colorize the ls output ##</span>
<span class="hljs-keyword">alias</span> <span class="hljs-keyword">ls</span> = '<span class="hljs-keyword">ls</span> <span class="hljs-params">--color=auto</span>'

<span class="hljs-comment">## Use a long listing format ##</span>
<span class="hljs-keyword">alias</span> ll = '<span class="hljs-keyword">ls</span> -la'

<span class="hljs-comment">## Show hidden files ##</span>
<span class="hljs-keyword">alias</span> l.= '<span class="hljs-keyword">ls</span> -d . <span class="hljs-string">..</span> <span class="hljs-string">.git</span> <span class="hljs-string">.gitignore</span> <span class="hljs-string">.gitmodules</span> <span class="hljs-string">.travis.yml</span> <span class="hljs-params">--color=auto</span>'

</code></pre><h4><a href="#2控制-cd-命令的行为"></a>#2：控制 cd 命令的行为</h4>
<pre><code class="hljs jboss-cli"><span class="hljs-comment">## get rid of command not found ##</span>
<span class="hljs-keyword">alias</span> <span class="hljs-keyword">cd</span>.<span class="hljs-string">.=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>'

<span class="hljs-comment">## a quick way to get out of current directory ##</span>
<span class="hljs-keyword">alias</span> <span class="hljs-string">..=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-string">...=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">../../../</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-string">....=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">../../../../</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-string">.....=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">../../../../</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-string">.4=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">../../../../</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-string">.5=</span> '<span class="hljs-keyword">cd</span> <span class="hljs-string">../../../../..</span>'

</code></pre><h4><a href="#3控制-grep-命令的输出"></a>#3：控制 grep 命令的输出</h4>
<p><a href="https://www.cyberciti.biz/faq/howto-use-grep-command-in-linux-unix/">grep 命令是一个用于在纯文本文件中搜索匹配正则表达式的行的命令行工具</a>：</p>
<pre><code class="hljs vhdl">## Colorize the grep command output <span class="hljs-keyword">for</span> ease <span class="hljs-keyword">of</span> <span class="hljs-keyword">use</span> (good <span class="hljs-keyword">for</span> log files)##
<span class="hljs-keyword">alias</span> grep = <span class="hljs-symbol">'grep</span> <span class="hljs-comment">--color=auto'</span>
<span class="hljs-keyword">alias</span> egrep = <span class="hljs-symbol">'egrep</span> <span class="hljs-comment">--color=auto'</span>
<span class="hljs-keyword">alias</span> fgrep = <span class="hljs-symbol">'fgrep</span> <span class="hljs-comment">--color=auto'</span>

</code></pre><h4><a href="#4让计算器默认开启-math-库"></a>#4：让计算器默认开启 math 库</h4>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> bc = <span class="hljs-string">'bc -l'</span>

</code></pre><h4><a href="#4生成-sha1-数字签名"></a>#4：生成 sha1 数字签名</h4>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> sha1 = <span class="hljs-string">'openssl sha1'</span>

</code></pre><h4><a href="#5自动创建父目录"></a>#5：自动创建父目录</h4>
<p><a href="https://www.cyberciti.biz/faq/linux-make-directory-command/">mkdir 命令</a> 用于创建目录：</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">alias</span> <span class="hljs-built_in">mkdir</span> = '<span class="hljs-built_in">mkdir</span> -<span class="hljs-built_in">pv</span>'

</code></pre><h4><a href="#6为-diff-输出着色"></a>#6：为 diff 输出着色</h4>
<p>你可以<a href="https://www.cyberciti.biz/faq/how-do-i-compare-two-files-under-linux-or-unix/">使用 diff 来一行行第比较文件</a> 而一个名为 <code>colordiff</code> 的工具可以为 diff 输出着色：</p>
<pre><code class="hljs ada"># install colordiff <span class="hljs-keyword">package</span> <span class="hljs-title">:)</span>
alias diff = <span class="hljs-symbol">'colordiff</span>'

</code></pre><h4><a href="#7让-mount-命令的输出更漂亮更方便人类阅读"></a>#7：让 mount 命令的输出更漂亮，更方便人类阅读</h4>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> mount = <span class="hljs-string">'mount |column -t'</span>

</code></pre><h4><a href="#8简化命令以节省时间"></a>#8：简化命令以节省时间</h4>
<pre><code class="hljs bash"><span class="hljs-comment"># handy short cuts #</span>
<span class="hljs-built_in">alias</span> h = <span class="hljs-string">'history'</span> 
<span class="hljs-built_in">alias</span> j = <span class="hljs-string">'jobs -l'</span>

</code></pre><h4><a href="#9创建一系列新命令"></a>#9：创建一系列新命令</h4>
<pre><code class="hljs verilog"><span class="hljs-keyword">alias</span> path = 'echo -e ${PATH<span class="hljs-comment">//:/\\n}'</span>
<span class="hljs-keyword">alias</span> now = <span class="hljs-number">'da</span>te +<span class="hljs-string">"%T"</span>'
<span class="hljs-keyword">alias</span> nowtime =now
<span class="hljs-keyword">alias</span> nowdate = <span class="hljs-number">'da</span>te +<span class="hljs-string">"%d-%m-%Y"</span>'

</code></pre><h4><a href="#10设置-vim-为默认编辑器"></a>#10：设置 vim 为默认编辑器</h4>
<pre><code class="hljs monkey"><span class="hljs-keyword">alias</span> <span class="hljs-title">vi</span> = vim
<span class="hljs-keyword">alias</span> <span class="hljs-title">svi</span> = <span class="hljs-comment">'sudo vi'</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">vis</span> = <span class="hljs-comment">'vim "+set si"'</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">edit</span> = <span class="hljs-comment">'vim'</span>

</code></pre><h4><a href="#11控制网络工具-ping-的输出"></a>#11：控制网络工具 ping 的输出</h4>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> Stop after sending count ECHO_REQUEST packets <span class="hljs-comment">#</span></span>
alias ping = 'ping -c 5'
<span class="hljs-meta">
#</span><span class="bash"> Do not <span class="hljs-built_in">wait</span> interval 1 second, go fast <span class="hljs-comment">#</span></span>
alias fastping = 'ping -c 100 -s.2'

</code></pre><h4><a href="#12显示打开的端口"></a>#12：显示打开的端口</h4>
<p>使用 <a href="https://www.cyberciti.biz/faq/how-do-i-find-out-what-ports-are-listeningopen-on-my-linuxfreebsd-server/">netstat 命令</a> 可以快速列出服务区中所有的 TCP/UDP 端口：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">alias</span> ports = <span class="hljs-string">'netstat -tulanp'</span>

</code></pre><h4><a href="#13唤醒休眠的服务器"></a>#13：唤醒休眠的服务器</h4>
<p><a href="https://www.cyberciti.biz/tips/linux-send-wake-on-lan-wol-magic-packets.html">Wake-on-LAN (WOL) 是一个以太网标准</a>，可以通过网络消息来开启服务器。你可以使用下面别名来<a href="https://bash.cyberciti.biz/misc-shell/simple-shell-script-to-wake-up-nas-devices-computers/">快速激活 nas 设备</a> 以及服务器：</p>
<pre><code class="hljs bash"><span class="hljs-comment">## replace mac with your actual server mac address #</span>
<span class="hljs-built_in">alias</span> wakeupnas01 = <span class="hljs-string">'/usr/bin/wakeonlan 00:11:32:11:15:FC'</span>
<span class="hljs-built_in">alias</span> wakeupnas02 = <span class="hljs-string">'/usr/bin/wakeonlan 00:11:32:11:15:FD'</span>
<span class="hljs-built_in">alias</span> wakeupnas03 = <span class="hljs-string">'/usr/bin/wakeonlan 00:11:32:11:15:FE'</span>

</code></pre><h4><a href="#14控制防火墙-iptables-的输出"></a>#14：控制防火墙 (iptables) 的输出</h4>
<p><a href="https://www.cyberciti.biz/faq/rhel-fedorta-linux-iptables-firewall-configuration-tutorial/" title="iptables CentOS/RHEL/Fedora tutorial">Netfilter 是一款 Linux 操作系统上的主机防火墙</a>。它是 Linux 发行版中的一部分，且默认情况下是激活状态。<a href="https://www.cyberciti.biz/tips/linux-iptables-examples.html">这里列出了大多数 Liux 新手防护入侵者最常用的 iptables 方法</a>。</p>
<pre><code class="hljs vhdl">## shortcut <span class="hljs-keyword">for</span> iptables <span class="hljs-keyword">and</span> pass it via sudo#
<span class="hljs-keyword">alias</span> ipt = <span class="hljs-symbol">'sudo</span> /sbin/iptables'

# display <span class="hljs-keyword">all</span> rules #
<span class="hljs-keyword">alias</span> iptlist = <span class="hljs-symbol">'sudo</span> /sbin/iptables -L -n -v <span class="hljs-comment">--line-numbers'</span>
<span class="hljs-keyword">alias</span> iptlistin = <span class="hljs-symbol">'sudo</span> /sbin/iptables -L INPUT -n -v <span class="hljs-comment">--line-numbers'</span>
<span class="hljs-keyword">alias</span> iptlistout = <span class="hljs-symbol">'sudo</span> /sbin/iptables -L OUTPUT -n -v <span class="hljs-comment">--line-numbers'</span>
<span class="hljs-keyword">alias</span> iptlistfw = <span class="hljs-symbol">'sudo</span> /sbin/iptables -L FORWARD -n -v <span class="hljs-comment">--line-numbers'</span>
<span class="hljs-keyword">alias</span> firewall =iptlist

</code></pre><h4><a href="#15使用-curl-调试-web-服务器--cdn-上的问题"></a>#15：使用 curl 调试 web 服务器 / CDN 上的问题</h4>
<pre><code class="hljs vhdl"># get web server headers #
<span class="hljs-keyword">alias</span> header = <span class="hljs-symbol">'curl</span> -I'

# find <span class="hljs-keyword">out</span> <span class="hljs-keyword">if</span> remote server supports gzip / mod_deflate <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> #
<span class="hljs-keyword">alias</span> headerc = <span class="hljs-symbol">'curl</span> -I <span class="hljs-comment">--compress'</span>

</code></pre><h4><a href="#16增加安全性"></a>#16：增加安全性</h4>
<pre><code class="hljs vhdl"># do <span class="hljs-keyword">not</span> delete / <span class="hljs-keyword">or</span> prompt <span class="hljs-keyword">if</span> deleting more than <span class="hljs-number">3</span> files at a <span class="hljs-built_in">time</span> #
<span class="hljs-keyword">alias</span> rm = <span class="hljs-symbol">'rm</span> -I <span class="hljs-comment">--preserve-root'</span>

# confirmation #
<span class="hljs-keyword">alias</span> mv = <span class="hljs-symbol">'mv</span> -i'
<span class="hljs-keyword">alias</span> cp = <span class="hljs-symbol">'cp</span> -i'
<span class="hljs-keyword">alias</span> ln = <span class="hljs-symbol">'ln</span> -i' 

# Parenting changing perms <span class="hljs-keyword">on</span> / #
<span class="hljs-keyword">alias</span> chown = <span class="hljs-symbol">'chown</span> <span class="hljs-comment">--preserve-root'</span>
<span class="hljs-keyword">alias</span> chmod = <span class="hljs-symbol">'chmod</span> <span class="hljs-comment">--preserve-root'</span>
<span class="hljs-keyword">alias</span> chgrp = <span class="hljs-symbol">'chgrp</span> <span class="hljs-comment">--preserve-root'</span>

</code></pre><h4><a href="#17更新-debian-linux-服务器"></a>#17：更新 Debian Linux 服务器</h4>
<p><a href="https://www.cyberciti.biz/tips/linux-debian-package-management-cheat-sheet.html">apt-get 命令</a> 用于通过因特网安装软件包 (ftp 或 http)。你也可以一次性升级所有软件包：</p>
<pre><code class="hljs applescript"><span class="hljs-comment"># distro specific - Debian / Ubuntu and friends #</span>
<span class="hljs-comment"># install with apt-get</span>
<span class="hljs-built_in">alias</span> apt-<span class="hljs-keyword">get</span>= <span class="hljs-string">"sudo apt-get"</span>
<span class="hljs-built_in">alias</span> updatey = <span class="hljs-string">"sudo apt-get --yes"</span>

<span class="hljs-comment"># update on one command</span>
<span class="hljs-built_in">alias</span> update = 'sudo apt-<span class="hljs-keyword">get</span> update &amp;&amp; sudo apt-<span class="hljs-keyword">get</span> upgrade'

</code></pre><h4><a href="#18更新-rhel--centos--fedora-linux-服务器"></a>#18：更新 RHEL / CentOS / Fedora Linux 服务器</h4>
<p><a href="https://www.cyberciti.biz/faq/rhel-centos-fedora-linux-yum-command-howto/">yum 命令</a> 是 RHEL / CentOS / Fedora Linux 以及其他基于这些发行版的 Linux 上的软件包管理工具：</p>
<pre><code class="hljs clean">## distrp specifc RHEL/CentOS ##
alias update = <span class="hljs-string">'yum update'</span>
alias updatey = <span class="hljs-string">'yum -y update'</span>

</code></pre><h4><a href="#19优化-sudo-和-su-命令"></a>#19：优化 sudo 和 su 命令</h4>
<pre><code class="hljs bash"><span class="hljs-comment"># become root #</span>
<span class="hljs-built_in">alias</span> root = <span class="hljs-string">'sudo -i'</span> 
<span class="hljs-built_in">alias</span> su = <span class="hljs-string">'sudo -i'</span>

</code></pre><h4><a href="#20使用-sudo-执行-haltreboot-命令"></a>#20：使用 sudo 执行 halt/reboot 命令</h4>
<p><a href="https://www.cyberciti.biz/faq/howto-shutdown-linux/">shutdown 命令</a> 会让 Linux / Unix 系统关机：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-comment"># reboot / halt / poweroff</span>
<span class="hljs-keyword">alias</span> reboot = 'sudo <span class="hljs-string">/sbin/reboot</span>'
<span class="hljs-keyword">alias</span> poweroff = 'sudo <span class="hljs-string">/sbin/poweroff</span>' 
<span class="hljs-keyword">alias</span> halt = 'sudo <span class="hljs-string">/sbin/halt</span>'
<span class="hljs-keyword">alias</span> <span class="hljs-keyword">shutdown</span> = 'sudo <span class="hljs-string">/sbin/shutdown</span>'

</code></pre><h4><a href="#21控制-web-服务器"></a>#21：控制 web 服务器</h4>
<pre><code class="hljs jboss-cli"><span class="hljs-comment"># also pass it via sudo so whoever is admin can reload it without calling you #</span>
<span class="hljs-keyword">alias</span> nginxreload = 'sudo <span class="hljs-string">/usr/local/nginx/sbin/nginx</span> -s <span class="hljs-keyword">reload</span>' 
<span class="hljs-keyword">alias</span> nginxtest = 'sudo <span class="hljs-string">/usr/local/nginx/sbin/nginx</span> -t'
<span class="hljs-keyword">alias</span> lightyload = 'sudo <span class="hljs-string">/etc/init.d/lighttpd</span> <span class="hljs-keyword">reload</span>' 
<span class="hljs-keyword">alias</span> lightytest = 'sudo <span class="hljs-string">/usr/sbin/lighttpd</span> -f <span class="hljs-string">/etc/lighttpd/lighttpd.conf</span> -t'
<span class="hljs-keyword">alias</span> httpdreload = 'sudo <span class="hljs-string">/usr/sbin/apachectl</span> -k graceful' 
<span class="hljs-keyword">alias</span> httpdtest = 'sudo <span class="hljs-string">/usr/sbin/apachectl</span> -t &amp;&amp; <span class="hljs-string">/usr/sbin/apachectl</span> -t -D DUMP_VHOSTS'

</code></pre><h4><a href="#22与备份相关的别名"></a>#22：与备份相关的别名</h4>
<pre><code class="hljs jboss-cli"><span class="hljs-comment"># if cron fails or if you want backup on demand just run these commands #</span>
<span class="hljs-comment"># again pass it via sudo so whoever is in admin group can start the job #</span>
<span class="hljs-comment"># Backup scripts #</span>
<span class="hljs-keyword">alias</span> backup = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.backup.sh</span> <span class="hljs-params">--type</span> local <span class="hljs-params">--taget</span> <span class="hljs-string">/raid1/backups</span>' 
<span class="hljs-keyword">alias</span> nasbackup = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.backup.sh</span> <span class="hljs-params">--type</span> nas <span class="hljs-params">--target</span> nas01'
<span class="hljs-keyword">alias</span> s3backup = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.backup.sh</span> <span class="hljs-params">--type</span> nas <span class="hljs-params">--target</span> nas01 <span class="hljs-params">--auth</span> <span class="hljs-string">/home/scripts/admin/.authdata/amazon.keys</span>'
<span class="hljs-keyword">alias</span> rsnapshothourly = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh</span> <span class="hljs-params">--type</span> remote <span class="hljs-params">--target</span> nas03 <span class="hljs-params">--auth</span> <span class="hljs-string">/home/scripts/admin/.authdata/ssh.keys</span> <span class="hljs-params">--config</span> <span class="hljs-string">/home/scripts/admin/scripts/backup/config/adsl.conf</span>'
<span class="hljs-keyword">alias</span> rsnapshotdaily = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh</span> <span class="hljs-params">--type</span> remote <span class="hljs-params">--target</span> nas03 <span class="hljs-params">--auth</span> <span class="hljs-string">/home/scripts/admin/.authdata/ssh.keys</span> <span class="hljs-params">--config</span> <span class="hljs-string">/home/scripts/admin/scripts/backup/config/adsl.conf</span>'
<span class="hljs-keyword">alias</span> rsnapshotweekly = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh</span> <span class="hljs-params">--type</span> remote <span class="hljs-params">--target</span> nas03 <span class="hljs-params">--auth</span> <span class="hljs-string">/home/scripts/admin/.authdata/ssh.keys</span> <span class="hljs-params">--config</span> <span class="hljs-string">/home/scripts/admin/scripts/backup/config/adsl.conf</span>' 
<span class="hljs-keyword">alias</span> rsnapshotmonthly = 'sudo <span class="hljs-string">/home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh</span> <span class="hljs-params">--type</span> remote <span class="hljs-params">--target</span> nas03 <span class="hljs-params">--auth</span> <span class="hljs-string">/home/scripts/admin/.authdata/ssh.keys</span> <span class="hljs-params">--config</span> <span class="hljs-string">/home/scripts/admin/scripts/backup/config/adsl.conf</span>' 
<span class="hljs-keyword">alias</span> amazonbackup =s3backup

</code></pre><h4><a href="#23桌面应用相关的别名---按需播放的-avimp3-文件"></a>#23：桌面应用相关的别名 - 按需播放的 avi/mp3 文件</h4>
<pre><code class="hljs applescript"><span class="hljs-comment">## play video files in a current directory ##</span>
<span class="hljs-comment"># cd ~/Download/movie-name</span>
<span class="hljs-comment"># playavi or vlc</span>
<span class="hljs-built_in">alias</span> playavi = 'mplayer *.avi' 
<span class="hljs-built_in">alias</span> vlc = 'vlc *.avi' 

<span class="hljs-comment"># play all music files from the current directory #</span>
<span class="hljs-built_in">alias</span> playwave = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> *.wav; do mplayer <span class="hljs-string">"$i"</span>; done'
<span class="hljs-built_in">alias</span> playogg = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> *.ogg; do mplayer <span class="hljs-string">"$i"</span>; done'
<span class="hljs-built_in">alias</span> playmp3 = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> *.mp3; do mplayer <span class="hljs-string">"$i"</span>; done'

<span class="hljs-comment"># play files from nas devices #</span>
<span class="hljs-built_in">alias</span> nplaywave = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> /nas/multimedia/wave/*.wav; do mplayer <span class="hljs-string">"$i"</span>; done'
<span class="hljs-built_in">alias</span> nplayogg = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> /nas/multimedia/ogg/*.ogg; do mplayer <span class="hljs-string">"$i"</span>; done' 
<span class="hljs-built_in">alias</span> nplaymp3 = '<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> /nas/multimedia/mp3/*.mp3; do mplayer <span class="hljs-string">"$i"</span>; done'

<span class="hljs-comment"># shuffle mp3/ogg etc by default # </span>
<span class="hljs-built_in">alias</span> music = 'mplayer <span class="hljs-comment">--shuffle *'</span>

</code></pre><h4><a href="#24设置系统管理相关命令的默认网卡"></a>#24：设置系统管理相关命令的默认网卡</h4>
<p><a href="https://www.cyberciti.biz/tips/keeping-a-log-of-daily-network-traffic-for-adsl-or-dedicated-remote-linux-box.html">vnstat 一款基于终端的网络流量检测器</a>。<a href="https://www.cyberciti.biz/faq/dnstop-monitor-bind-dns-server-dns-network-traffic-from-a-shell-prompt/">dnstop 是一款分析 DNS 流量的终端工具</a>。<a href="https://www.cyberciti.biz/faq/check-network-connection-linux/">tcptrack 和 iftop 命令显示</a> TCP/UDP 连接方面的信息，它监控网卡并显示其消耗的带宽。</p>
<pre><code class="hljs delphi">## All <span class="hljs-keyword">of</span> our servers eth1 <span class="hljs-keyword">is</span> connected <span class="hljs-keyword">to</span> the Internets via vlan / router etc ##
<span class="hljs-keyword">alias</span> dnstop = <span class="hljs-string">'dnstop -l 5 eth1'</span>
<span class="hljs-keyword">alias</span> vnstat = <span class="hljs-string">'vnstat -i eth1'</span>
<span class="hljs-keyword">alias</span> iftop = <span class="hljs-string">'iftop -i eth1'</span> 
<span class="hljs-keyword">alias</span> tcpdump = <span class="hljs-string">'tcpdump -i eth1'</span> 
<span class="hljs-keyword">alias</span> ethtool = <span class="hljs-string">'ethtool eth1'</span> 

# work <span class="hljs-keyword">on</span> wlan0 by <span class="hljs-keyword">default</span> #
# Only useful <span class="hljs-keyword">for</span> laptop <span class="hljs-keyword">as</span> all servers are without wireless <span class="hljs-keyword">interface</span>
<span class="hljs-keyword">alias</span> iwconfig = <span class="hljs-string">'iwconfig wlan0'</span>

</code></pre><h4><a href="#25快速获取系统内存cpu-使用和-gpu-内存相关信息"></a>#25：快速获取系统内存，cpu 使用，和 gpu 内存相关信息</h4>
<pre><code class="hljs clean">## pass options to free ##
alias meminfo = <span class="hljs-string">'free -m -l -t'</span> 

## get top process eating memory
alias psmem = <span class="hljs-string">'ps auxf | sort -nr -k 4'</span> 
alias psmem10 = <span class="hljs-string">'ps auxf | sort -nr -k 4 | head -10'</span>

## get top process eating cpu ##
alias pscpu = <span class="hljs-string">'ps auxf | sort -nr -k 3'</span>
alias pscpu10 = <span class="hljs-string">'ps auxf | sort -nr -k 3 | head -10'</span> 

## Get server cpu info ##
alias cpuinfo = <span class="hljs-string">'lscpu'</span>

## older <span class="hljs-keyword">system</span> use /proc/cpuinfo ##
##alias cpuinfo=<span class="hljs-string">'less /proc/cpuinfo'</span> ##

## get GPU ram on desktop / laptop##
alias gpumeminfo = <span class="hljs-string">'grep -i --color memory /var/log/Xorg.0.log'</span>

</code></pre><h4><a href="#26控制家用路由器"></a>#26：控制家用路由器</h4>
<p><code>curl</code> 命令可以用来 <a href="https://www.cyberciti.biz/faq/reboot-linksys-wag160n-wag54-wag320-wag120n-router-gateway/">重启 Linksys 路由器</a>。</p>
<pre><code class="hljs monkey"><span class="hljs-meta"># Reboot my home Linksys WAG160N / WAG54 / WAG320 / WAG120N Router / Gateway from *nix.</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">rebootlinksys</span> = <span class="hljs-string">"curl -u 'admin:my-super-password' 'http://192.168.1.2/setup.cgi?todo=reboot'"</span><span class="hljs-meta">

# Reboot tomato based Asus NT16 wireless bridge</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">reboottomato</span> = <span class="hljs-string">"ssh admin@192.168.1.1 /sbin/reboot"</span>

</code></pre><h4><a href="#27-wget-默认断点续传"></a>#27 wget 默认断点续传</h4>
<p><a href="https://www.cyberciti.biz/tips/wget-resume-broken-download.html">GNU wget 是一款用来从 web 下载文件的自由软件</a>。它支持 HTTP，HTTPS，以及 FTP 协议，而且它也支持断点续传：</p>
<pre><code class="hljs clean">## this one saved by butt so many times ##
alias wget = <span class="hljs-string">'wget -c'</span>

</code></pre><h4><a href="#28-使用不同浏览器来测试网站"></a>#28 使用不同浏览器来测试网站</h4>
<pre><code class="hljs monkey"><span class="hljs-meta">## this one saved by butt so many times ##</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">ff4</span> = <span class="hljs-comment">'/opt/firefox4/firefox' </span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">ff13</span> = <span class="hljs-comment">'/opt/firefox13/firefox' </span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">chrome</span> = <span class="hljs-comment">'/opt/google/chrome/chrome' </span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">opera</span> = <span class="hljs-comment">'/opt/opera/opera'</span><span class="hljs-meta">

#default ff</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">ff</span> =ff13<span class="hljs-meta">

#my default browser</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">browser</span> =chrome

</code></pre><h4><a href="#29关于-ssh-别名的注意事项"></a>#29：关于 ssh 别名的注意事项</h4>
<p>不要创建 ssh 别名，代之以 <code>~/.ssh/config</code> 这个 OpenSSH SSH 客户端配置文件。它的选项更加丰富。下面是一个例子：</p>
<pre><code class="hljs routeros">Host server10
 Hostname 1.2.3.4
 IdentityFile ~/backups/.ssh/id_dsa
<span class="hljs-built_in"> user </span>foobar
<span class="hljs-built_in"> Port </span>30000
 ForwardX11Trusted <span class="hljs-literal">yes</span>
 TCPKeepAlive <span class="hljs-literal">yes</span>

</code></pre><p>然后你就可以使用下面语句连接 server10 了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ssh server10</span>

</code></pre><h4><a href="#30现在该分享你的别名了"></a>#30：现在该分享你的别名了</h4>
<pre><code class="hljs clean">## set some other defaults ##
alias df = <span class="hljs-string">'df -H'</span>
alias du = <span class="hljs-string">'du -ch'</span>

# top is atop, just like vi is vim
alias top = <span class="hljs-string">'atop'</span>

## nfsrestart - must be root ##
## refresh nfs mount / cache etc for Apache ##
alias nfsrestart = <span class="hljs-string">'sync &amp;&amp; sleep 2 &amp;&amp; /etc/init.d/httpd stop &amp;&amp; umount netapp2:/exports/http &amp;&amp; sleep 2 &amp;&amp; mount -o rw,sync,rsize=32768,wsize=32768,intr,hard,proto=tcp,fsc natapp2:/exports /http/var/www/html &amp;&amp; /etc/init.d/httpd start'</span>

## Memcached server status ##
alias mcdstats = <span class="hljs-string">'/usr/bin/memcached-tool 10.10.27.11:11211 stats'</span>
alias mcdshow = <span class="hljs-string">'/usr/bin/memcached-tool 10.10.27.11:11211 display'</span>

## quickly flush out memcached server ##
alias flushmcd = <span class="hljs-string">'echo "flush_all" | nc 10.10.27.11 11211'</span>

## Remove assets quickly <span class="hljs-keyword">from</span> Akamai / Amazon cdn ##
alias cdndel = <span class="hljs-string">'/home/scripts/admin/cdn/purge_cdn_cache --profile akamai'</span>
alias amzcdndel = <span class="hljs-string">'/home/scripts/admin/cdn/purge_cdn_cache --profile amazon'</span>

## supply list <span class="hljs-keyword">of</span> urls via file or stdin
alias cdnmdel = <span class="hljs-string">'/home/scripts/admin/cdn/purge_cdn_cache --profile akamai --stdin'</span> 
alias amzcdnmdel = <span class="hljs-string">'/home/scripts/admin/cdn/purge_cdn_cache --profile amazon --stdin'</span>

</code></pre><h3><a href="#总结"></a>总结</h3>
<p>本文总结了 *nix bash 别名的多种用法：</p>
<ol>
<li>为命令设置默认的参数（例如通过 <code>alias ethtool='ethtool eth0'</code> 设置 ethtool 命令的默认参数为 eth0）。</li>
<li>修正错误的拼写（通过 <code>alias cd..='cd ..'</code>让 <code>cd..</code> 变成 <code>cd ..</code>）。</li>
<li>缩减输入。</li>
<li>设置系统中多版本命令的默认路径（例如 GNU/grep 位于 <code>/usr/local/bin/grep</code> 中而 Unix grep 位于 <code>/bin/grep</code> 中。若想默认使用 GNU grep 则设置别名 <code>grep='/usr/local/bin/grep'</code> )。</li>
<li>通过默认开启命令（例如 <code>rm</code>，<code>mv</code> 等其他命令）的交互参数来增加 Unix 的安全性。</li>
<li>为老旧的操作系统（比如 MS-DOS 或者其他类似 Unix 的操作系统）创建命令以增加兼容性（比如 <code>alias del=rm</code>）。</li>
</ol>
<p>我已经分享了多年来为了减少重复输入命令而使用的别名。若你知道或使用的哪些 bash/ksh/csh 别名能够减少输入，请在留言框中分享。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html">https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz">nixCraft</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30 个方便的 Bash shell 别名

## 原文链接
[https://www.zcfy.cc/article/30-handy-bash-shell-aliases-for-linux-unix-mac-os-x](https://www.zcfy.cc/article/30-handy-bash-shell-aliases-for-linux-unix-mac-os-x)

