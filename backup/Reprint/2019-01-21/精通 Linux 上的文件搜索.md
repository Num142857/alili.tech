---
title: '精通 Linux 上的文件搜索' 
date: 2019-01-21 2:30:06
hidden: true
slug: 1lry4trea1d
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#精通-linux-上的文件搜索"></a>精通 Linux 上的文件搜索</h1>
<p>在 Linux 系统上搜索文件的方法有很多，有的命令很简单，有的很详细。我们的目标是：缩小搜索范围，找到您正在寻找的文件，又不受其他文件的干扰。在今天的文章中，我们将研究一些对文件搜索最有用的命令和选项。我们将涉及：</p>
<ul>
<li>快速搜索</li>
<li>更复杂的搜索条件</li>
<li>组合条件</li>
<li>反转条件</li>
<li>简单和详细的回应</li>
<li>寻找重复的文件</li>
</ul>
<p>有很多有用的命令可以搜索文件，<code>find</code> 命令可能是其中最有名的，但它不是唯一的命令，也不一定总是找到目标文件的最快方法。</p>
<h3><a href="#快速搜索命令which-和-locate"></a>快速搜索命令：which 和 locate</h3>
<p>搜索文件的最简单的命令可能就是 <code>which</code> 和 <code>locate</code> 了，但二者都有一些局限性。<code>which</code> 命令只会在系统定义的搜索路径中，查找可执行的文件，通常用于识别命令。如果您对输入 <code>which</code> 时会运行哪个命令感到好奇，您可以使用命令 <code>which which</code>，它会指出对应的可执行文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">which</span> <span class="hljs-built_in">which</span></span>
/usr/bin/which

</code></pre><p><code>which</code> 命令会显示它找到的第一个以相应名称命名的可执行文件（也就是使用该命令时将运行的那个文件），然后停止。</p>
<p><code>locate</code> 命令更大方一点，它可以查找任意数量的文件，但它也有一个限制：仅当文件名被包含在由 <code>updatedb</code> 命令构建的数据库时才有效。该文件可能会存储在某个位置，如 <code>/var/lib/mlocate/mlocate.db</code>，但不能用 <code>locate</code> 以外的任何命令读取。这个文件的更新通常是通过每天通过 cron 运行的 <code>updatedb</code> 进行的。</p>
<p>简单的 <code>find</code> 命令没有太多限制，不过它需要指定搜索的起点和搜索条件。最简单的 <code>find</code> 命令：按文件名搜索文件。如下所示：</p>
<pre><code class="hljs gradle">$ <span class="hljs-keyword">find</span> . -name runme
.<span class="hljs-regexp">/bin/</span>runme

</code></pre><p>如上所示，通过文件名搜索文件系统的当前位置将会搜索所有子目录，除非您指定了搜索深度。</p>
<h3><a href="#不仅仅是文件名"></a>不仅仅是文件名</h3>
<p><code>find</code> 命令允许您搜索除文件名以外的多种条件，包括文件所有者、组、权限、大小、修改时间、缺少所有者或组，和文件类型等。除了查找文件外，您还可以删除文件、对其进行重命名、更改所有者、更改权限和对找到的文件运行几乎任何命令。</p>
<p>下面两条命令会查找：在当前目录中 root 用户拥有的文件，以及不被指定用户（在本例中为 shs）所拥有的文件。在这个例子中，两个输出是一样的，但并不总是如此。</p>
<pre><code class="hljs tap">$ find . -user root -ls
<span class="hljs-number"> 396926 </span>0 lrwxrwxrwx<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 21 </span>Sep<span class="hljs-number"> 21 </span>09:03 ./xyz -&gt; /home/peanut/xyz
$ find . ! -user shs -ls
<span class="hljs-number"> 396926 </span>0 lrwxrwxrwx<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 21 </span>Sep<span class="hljs-number"> 21 </span>09:03 ./xyz -&gt; /home/peanut/xyz

</code></pre><p>感叹号 <code>!</code> 字符代表“非”：反转跟随其后的条件。</p>
<p>下面的命令将查找具有特定权限的文件：</p>
<pre><code class="hljs tap">$ find . -perm<span class="hljs-number"> 750 </span>-ls
<span class="hljs-number"> 397176 </span>4 -rwxr-x---<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 115 </span>Sep<span class="hljs-number"> 14 </span>13:52 ./ll
<span class="hljs-number"> 398209 </span>4 -rwxr-x---<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 117 </span>Sep<span class="hljs-number"> 21 </span>08:55 ./get-updates
<span class="hljs-number"> 397145 </span>4 drwxr-x---<span class="hljs-number"> 2 </span>shs shs<span class="hljs-number"> 4096 </span>Sep<span class="hljs-number"> 14 </span>15:42 ./newdir

</code></pre><p>接下来的命令显示具有 777 权限的非符号链接文件：</p>
<pre><code class="hljs tap">$ sudo find /home -perm<span class="hljs-number"> 777 </span>! -type l -ls
<span class="hljs-number"> 397132 </span>4 -rwxrwxrwx<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 18 </span>Sep<span class="hljs-number"> 15 </span>16:06 /home/shs/bin/runme
<span class="hljs-number"> 396949 </span>4 -rwxrwxrwx<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 558 </span>Sep<span class="hljs-number"> 21 </span>11:21 /home/oops

</code></pre><p>以下命令将查找大小超过千兆字节的文件。请注意，我们找到了一个非常有趣的文件。它以 ELF core 文件格式表示了该系统的物理内存。</p>
<pre><code class="hljs tap">$ sudo find / -size +1G -ls
<span class="hljs-number"> 4026531994 </span>0 -r--------<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 140737477881856 </span>Sep<span class="hljs-number"> 21 </span>11:23 /proc/kcore
<span class="hljs-number"> 1444722 </span>15332 -rw-rw-r--<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 1609039872 </span>Sep<span class="hljs-number"> 13 </span>15:55 /home/shs/Downloads/ubuntu-17.04-desktop-amd64.iso

</code></pre><p>只要您知道 <code>find</code> 命令是如何描述文件类型的，就可以通过文件类型来查找文件。</p>
<pre><code class="hljs ini"><span class="hljs-attr">b</span> = 块设备文件
<span class="hljs-attr">c</span> = 字符设备文件
<span class="hljs-attr">d</span> = 目录
<span class="hljs-attr">p</span> = 命名管道
<span class="hljs-attr">f</span> = 常规文件
<span class="hljs-attr">l</span> = 符号链接
<span class="hljs-attr">s</span> = 套接字
<span class="hljs-attr">D</span> = 门（仅限 Solaris）

</code></pre><p>在下面的命令中，我们要寻找符号链接和套接字：</p>
<pre><code class="hljs tap">$ find . -type l -ls
<span class="hljs-number"> 396926 </span>0 lrwxrwxrwx<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 21 </span>Sep<span class="hljs-number"> 21 </span>09:03 ./whatever -&gt; /home/peanut/whatever
$ find . -type s -ls
<span class="hljs-number"> 395256 </span>0 srwxrwxr-x<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 0 </span>Sep<span class="hljs-number"> 21 </span>08:50 ./.gnupg/S.gpg-agent

</code></pre><p>您还可以根据 inode 号来搜索文件：</p>
<pre><code class="hljs tap">$ find . -inum<span class="hljs-number"> 397132 </span>-ls
<span class="hljs-number"> 397132 </span>4 -rwx------<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 18 </span>Sep<span class="hljs-number"> 15 </span>16:06 ./bin/runme

</code></pre><p>另一种通过 inode 搜索文件的方法是使用 <code>debugfs</code> 命令。在大的文件系统上，这个命令可能比 <code>find</code> 快得多，您可能需要安装 icheck。</p>
<pre><code class="hljs lsl">$ sudo debugfs -R 'ncheck <span class="hljs-number">397132</span>' /dev/sda1
debugfs <span class="hljs-number">1.42</span><span class="hljs-number">.13</span> (<span class="hljs-number">17</span>-May<span class="hljs-number">-2015</span>)
Inode Pathname
<span class="hljs-number">397132</span> /home/shs/bin/runme

</code></pre><p>在下面的命令中，我们从主目录（<code>~</code>）开始，限制搜索的深度（即我们将搜索子目录的层数），并只查看在最近一天内创建或修改的文件（<code>mtime</code> 设置）。</p>
<pre><code class="hljs tap">$ find ~ -maxdepth<span class="hljs-number"> 2 </span>-mtime -1 -ls
<span class="hljs-number"> 407928 </span>4 drwxr-xr-x<span class="hljs-number"> 21 </span>shs shs<span class="hljs-number"> 4096 </span>Sep<span class="hljs-number"> 21 </span>12:03 /home/shs
<span class="hljs-number"> 394006 </span>8 -rw-------<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 5909 </span>Sep<span class="hljs-number"> 21 </span>08:18 /home/shs/.bash_history
<span class="hljs-number"> 399612 </span>4 -rw-------<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 53 </span>Sep<span class="hljs-number"> 21 </span>08:50 /home/shs/.Xauthority
<span class="hljs-number"> 399615 </span>4 drwxr-xr-x<span class="hljs-number"> 2 </span>shs shs<span class="hljs-number"> 4096 </span>Sep<span class="hljs-number"> 21 </span>09:32 /home/shs/Downloads

</code></pre><h3><a href="#不仅仅是列出文件"></a>不仅仅是列出文件</h3>
<p>使用 <code>-exec</code> 选项，在您使用 <code>find</code> 命令找到文件后可以以某种方式更改文件。您只需参照 <code>-exec</code> 选项即可运行相应的命令。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> find . -name runme -<span class="hljs-built_in">exec</span> chmod 700 {} \;</span>
<span class="hljs-meta">$</span><span class="bash"> find . -name runme -ls</span>
 397132 4 -rwx------ 1 shs shs 18 Sep 15 16:06 ./bin/runme

</code></pre><p>在这条命令中，<code>{}</code> 代表文件名。此命令将更改当前目录和子目录中任何名为 <code>runme</code> 的文件的权限。</p>
<p>把您想运行的任何命令放在 <code>-exec</code> 选项之后，并使用类似于上面命令的语法即可。</p>
<h3><a href="#其他搜索条件"></a>其他搜索条件</h3>
<p>如上面的例子所示，您还可以通过其他条件进行搜索：文件的修改时间、所有者、权限等。以下是一些示例。</p>
<h4><a href="#根据用户查找文件"></a>根据用户查找文件</h4>
<pre><code class="hljs stylus">$ sudo find /home -user peanut
/home/peanut
/home/peanut/<span class="hljs-selector-class">.bashrc</span>
/home/peanut/<span class="hljs-selector-class">.bash_logout</span>
/home/peanut/<span class="hljs-selector-class">.profile</span>
/home/peanut/examples<span class="hljs-selector-class">.desktop</span>

</code></pre><h4><a href="#根据权限查找文件"></a>根据权限查找文件</h4>
<pre><code class="hljs arduino">$ sudo <span class="hljs-built_in">find</span> /<span class="hljs-built_in">home</span> -perm <span class="hljs-number">777</span>
/<span class="hljs-built_in">home</span>/shs/whatever
/<span class="hljs-built_in">home</span>/oops

</code></pre><h4><a href="#根据修改时间查找文件"></a>根据修改时间查找文件</h4>
<pre><code class="hljs groovy">$ sudo find /home -mtime +<span class="hljs-number">100</span>
<span class="hljs-regexp">/home/</span>shs<span class="hljs-regexp">/.mozilla/</span>firefox<span class="hljs-regexp">/krsw3giq.default/</span>gmp-gmpopenh264<span class="hljs-regexp">/1.6/</span>gmpopenh264.info
<span class="hljs-regexp">/home/</span>shs<span class="hljs-regexp">/.mozilla/</span>firefox<span class="hljs-regexp">/krsw3giq.default/</span>gmp-gmpopenh264<span class="hljs-regexp">/1.6/</span>libgmpopenh264.so

</code></pre><h4><a href="#通过比较修改时间查找文件"></a>通过比较修改时间查找文件</h4>
<p>像这样的命令可以让您找到修改时间较近的文件。</p>
<pre><code class="hljs excel">$ sudo <span class="hljs-built_in">find</span> /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span> -newer /<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/syslog
/<span class="hljs-built_in">var</span>/<span class="hljs-built_in">log</span>/auth.log

</code></pre><h3><a href="#寻找重复的文件"></a>寻找重复的文件</h3>
<p>如果您正在清理磁盘空间，则可能需要删除较大的重复文件。确定文件是否真正重复的最好方法是使用 <code>fdupes</code> 命令。此命令使用 md5 校验和来确定文件是否具有相同的内容。使用 <code>-r</code>（递归）选项，<code>fdupes</code> 将在一个目录下并查找具有相同校验和而被确定为内容相同的文件。</p>
<p>如果以 root 身份运行这样的命令，您可能会发现很多重复的文件，但是很多文件都是创建时被添加到主目录的启动文件。</p>
<pre><code class="hljs coffeescript"><span class="hljs-comment"># fdupes -rn /home &gt; /tmp/dups.txt</span>
<span class="hljs-comment"># more /tmp/dups.txt</span>
<span class="hljs-regexp">/home/jdoe/</span>.profile
<span class="hljs-regexp">/home/tsmith/</span>.profile
<span class="hljs-regexp">/home/peanut/</span>.profile
<span class="hljs-regexp">/home/rocket/</span>.profile

<span class="hljs-regexp">/home/jdoe/</span>.bashrc
<span class="hljs-regexp">/home/tsmith/</span>.bashrc
<span class="hljs-regexp">/home/peanut/</span>.bashrc
<span class="hljs-regexp">/home/rocket/</span>.bashrc

</code></pre><p>同样，您可能会在 <code>/usr</code> 中发现很多重复的但不该删除的配置文件。所以，请谨慎利用 <code>fdupes</code> 的输出。</p>
<p><code>fdupes</code> 命令并不总是很快，但是要记住，它正在对许多文件运行校验和来做比较，你可能会意识到它是多么有效。</p>
<h3><a href="#总结"></a>总结</h3>
<p>有很多方法可以在 Linux 系统上查找文件。如果您可以描述清楚您正在寻找什么，上面的命令将帮助您找到目标。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3227075/linux/mastering-file-searches-on-linux.html">https://www.networkworld.com/article/3227075/linux/mastering-file-searches-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/jessie-pang">jessie-pang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精通 Linux 上的文件搜索

## 原文链接
[https://www.zcfy.cc/article/mastering-file-searches-on-linux](https://www.zcfy.cc/article/mastering-file-searches-on-linux)

