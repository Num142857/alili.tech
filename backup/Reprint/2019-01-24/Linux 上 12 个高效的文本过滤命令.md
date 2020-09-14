---
title: 'Linux 上 12 个高效的文本过滤命令' 
date: 2019-01-24 2:30:11
hidden: true
slug: 74x3v1e9zdo
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-上-12-个高效的文本过滤命令"></a>Linux 上 12 个高效的文本过滤命令</h1>
<p>在这篇文章中，我们将会看一些 Linux 中的过滤器命令行工具。过滤器是一个程序，它从标准输入读取数据，在数据上执行操作，然后把结果写到标准输出。</p>
<p>因此，它可以用来以强大的方式处理信息，例如重新结构化输出以生成有用的报告，修改文件里面的文本，以及其他很多系统管理任务。</p>
<p>下面是 Linux 上的一些有用的文件或者文本过滤器。</p>
<h3><a href="#1-awk-命令"></a>1、 awk 命令</h3>
<p><strong>awk</strong> 是一个卓越的模式扫描和处理语言，它可被用于在 Linux 下构造有用的过滤器。你可以通过阅读我们的 <a href="https://linux.cn/article-7586-1.html">awk 系列 1 到 13 部分</a> 来开始使用它。</p>
<p>另外，也可以通过阅读 <strong>awk</strong> 的 man 手册来获取更多的信息和使用选项。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man awk</span>

</code></pre><h3><a href="#2-sed-命令"></a>2、 sed 命令</h3>
<p><strong>sed</strong> 是一款过滤和转换文本的强大的流编辑器。我们已经写了两篇关于 sed 的有用的文章，你可以通过这儿来了解：</p>
<ul>
<li><a href="https://linux.cn/article-7161-1.html">如何使用 GNU sed 命令在 Linux 下创建、编辑和处理文件</a></li>
<li><a href="http://www.tecmint.com/linux-sed-command-tips-tricks/">日常 Linux 系统管理员任务使用的 15 个有用的 sed 命令小贴士和技巧</a></li>
</ul>
<p>sed 的 man 手册已经添加控制选项和说明：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man sed</span>

</code></pre><h3><a href="#3-grep-egrep-fgrep-rgrep-命令行"></a>3、 grep、 egrep、 fgrep、 rgrep 命令行</h3>
<p>这些过滤器输出匹配指定模式的行。它们从一个文件或者标准输入读取行，并且输出所有匹配的行，默认输出到标准输出。</p>
<p><strong>注意</strong>：主程序是 <a href="http://www.tecmint.com/12-practical-examples-of-linux-grep-command/">grep</a>，这些变体与<a href="http://www.tecmint.com/linux-grep-commands-character-classes-bracket-expressions/">使用特定的选项的 grep</a> 相同，如下所示（为了向后兼容性，它们依旧在使用）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> egrep = grep -E</span>
<span class="hljs-meta">$</span><span class="bash"> fgrep = grep -F</span>
<span class="hljs-meta">$</span><span class="bash"> rgrep = grep -r  </span>

</code></pre><p>下面是一些基本的 grep 命令：</p>
<pre><code class="hljs elixir">tecmint<span class="hljs-variable">@TecMint</span> ~ <span class="hljs-variable">$ </span>grep <span class="hljs-string">"aaronkilik"</span> /etc/passwd
<span class="hljs-symbol">aaronkilik:</span><span class="hljs-symbol">x:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:/home/aaronkilik</span>:
tecmint<span class="hljs-variable">@TecMint</span> ~ <span class="hljs-variable">$ </span>cat /etc/passwd | grep <span class="hljs-string">"aronkilik"</span>
<span class="hljs-symbol">aaronkilik:</span><span class="hljs-symbol">x:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-number">1001</span><span class="hljs-symbol">:</span><span class="hljs-symbol">:/home/aaronkilik</span>:

</code></pre><p>在 <a href="http://www.tecmint.com/difference-between-grep-egrep-and-fgrep-in-linux/">Linux 下的 grep、 egrep 和 fgrep 的差异？</a>中，你可以了解更多。</p>
<h3><a href="#4-head-命令"></a>4、 head 命令</h3>
<p><strong>head</strong> 用于显示文件前面的部分，默认情况下它输出前 <strong>10</strong> 行。你可以使用 <code>-n</code> 标志来指定显示的行数：</p>
<pre><code class="hljs routeros">tecmint@TecMint ~ $ head /var/log/auth.log  
Jan  2 10:45:01 TecMint CRON[3383]: pam_unix(cron:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 10:45:01 TecMint CRON[3383]: pam_unix(cron:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root
Jan  2 10:51:34 TecMint sudo:  tecmint : <span class="hljs-attribute">TTY</span>=unknown ; <span class="hljs-attribute">PWD</span>=/home/tecmint ; <span class="hljs-attribute">USER</span>=root ; <span class="hljs-attribute">COMMAND</span>=/usr/lib/linuxmint/mintUpdate/checkAPT.py
Jan  2 10:51:34 TecMint sudo: pam_unix(sudo:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 10:51:39 TecMint sudo: pam_unix(sudo:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root
Jan  2 10:55:01 TecMint CRON[4099]: pam_unix(cron:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 10:55:01 TecMint CRON[4099]: pam_unix(cron:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root
Jan  2 11:05:01 TecMint CRON[4138]: pam_unix(cron:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 11:05:01 TecMint CRON[4138]: pam_unix(cron:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root
Jan  2 11:09:01 TecMint CRON[4146]: pam_unix(cron:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
tecmint@TecMint ~ $ head  -n 5 /var/log/auth.log  
Jan  2 10:45:01 TecMint CRON[3383]: pam_unix(cron:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 10:45:01 TecMint CRON[3383]: pam_unix(cron:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root
Jan  2 10:51:34 TecMint sudo:  tecmint : <span class="hljs-attribute">TTY</span>=unknown ; <span class="hljs-attribute">PWD</span>=/home/tecmint ; <span class="hljs-attribute">USER</span>=root ; <span class="hljs-attribute">COMMAND</span>=/usr/lib/linuxmint/mintUpdate/checkAPT.py
Jan  2 10:51:34 TecMint sudo: pam_unix(sudo:session): session opened <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root by (<span class="hljs-attribute">uid</span>=0)
Jan  2 10:51:39 TecMint sudo: pam_unix(sudo:session): session closed <span class="hljs-keyword">for</span><span class="hljs-built_in"> user </span>root

</code></pre><p>学习如何 <a href="http://www.tecmint.com/view-contents-of-file-in-linux/">使用带有 tail 和 cat 命令的 head 命令</a>，以便在 Linux 下更有效的使用。</p>
<h3><a href="#5-tail-命令"></a>5、 tail 命令</h3>
<p><strong>tail</strong> 输出一个文件的后面的部分（默认 <strong>10</strong> 行）。使用 <code>-n</code> 选项来指定显示的行数。</p>
<p>下面的命令将会输出指定文件的最后 5 行：</p>
<pre><code class="hljs routeros">tecmint@TecMint ~ $ tail -n 5 /var/log/auth.log
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on 0.0.0.0<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]: Received SIGHUP; restarting.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on 0.0.0.0<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.

</code></pre><p>另外，<strong>tail</strong> 有一个特殊的选项 <code>-f</code> ，可以 <a href="http://www.tecmint.com/fswatch-monitors-files-and-directory-changes-modifications-in-linux/">实时查看一个文件的变化</a> （尤其是日志文件）。</p>
<p>下面的命令将会使你能够监控指定文件的变化：</p>
<pre><code class="hljs routeros">tecmint@TecMint ~ $ tail -f /var/log/auth.log
Jan  6 12:58:01 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.
Jan  6 12:58:11 TecMint sshd[1269]: Received SIGHUP; restarting.
Jan  6 12:58:12 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on 0.0.0.0<span class="hljs-built_in"> port </span>22.
Jan  6 12:58:12 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]: Received SIGHUP; restarting.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on 0.0.0.0<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]: Received SIGHUP; restarting.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on 0.0.0.0<span class="hljs-built_in"> port </span>22.
Jan  6 13:01:27 TecMint sshd[1269]:<span class="hljs-built_in"> Server </span>listening on ::<span class="hljs-built_in"> port </span>22.

</code></pre><p>阅读 tail 的 man 手册，获取使用选项和说明的完整内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man tail</span>

</code></pre><h3><a href="#6-sort-命令"></a>6、 sort 命令</h3>
<p><strong>sort</strong> 用于将文本文件或标准输入的行进行排序。</p>
<p>下面是一个名为 domain.list 的文件的内容：</p>
<pre><code class="hljs stylus">tecmint@TecMint ~ $ cat domains<span class="hljs-selector-class">.list</span>
tecmint<span class="hljs-selector-class">.com</span>
tecmint<span class="hljs-selector-class">.com</span>
news<span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span>
news<span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span>
linuxsay<span class="hljs-selector-class">.com</span>
linuxsay<span class="hljs-selector-class">.com</span>
windowsmint<span class="hljs-selector-class">.com</span>
windowsmint<span class="hljs-selector-class">.com</span>

</code></pre><p>你可以像这样运行一个简单的 <a href="http://www.tecmint.com/sort-command-linux/">sort 命令</a> 来排序文件内容：</p>
<pre><code class="hljs stylus">tecmint@TecMint ~ $ sort domains<span class="hljs-selector-class">.list</span>
linuxsay<span class="hljs-selector-class">.com</span>
linuxsay<span class="hljs-selector-class">.com</span>
news<span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span>
news<span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span>
tecmint<span class="hljs-selector-class">.com</span>
tecmint<span class="hljs-selector-class">.com</span>
windowsmint<span class="hljs-selector-class">.com</span>
windowsmint<span class="hljs-selector-class">.com</span>

</code></pre><p>你可以有多种方式来使用 sort 命令，请参阅以下一些关于 sort 命令的有用的文章。</p>
<ul>
<li><a href="https://linux.cn/article-5372-1.html">Linux 的 ‘sort’命令的14个有用的范例（一）</a></li>
<li><a href="https://linux.cn/article-5373-1.html">Linux 的 'sort'命令的七个有趣实例（二）</a></li>
<li><a href="http://www.tecmint.com/find-and-sort-files-modification-date-and-time-in-linux/">如何基于修改日期和时间来查找和排序文件</a></li>
</ul>
<h3><a href="#7-uniq-命令"></a>7、 uniq 命令</h3>
<p><strong>uniq</strong> 命令用于报告或者忽略重复行，它从标准输入过滤行，并且把结果写到标准输出。</p>
<p>在对一个输入流运行 <code>sort</code> 之后，你可以使用 <code>uniq</code> 删除重复行，如下例所示。</p>
<p>为了显示行出现的数目，使用 <code>-c</code> 选项，要在对比时忽略大小写的差异，使用 <code>-i</code> 选项：</p>
<pre><code class="hljs vim">tecmint@TecMint ~ $ <span class="hljs-keyword">cat</span> domains.<span class="hljs-keyword">list</span>
tecmint.<span class="hljs-keyword">com</span>
tecmint.<span class="hljs-keyword">com</span>
news.tecmint.<span class="hljs-keyword">com</span>
news.tecmint.<span class="hljs-keyword">com</span>
linuxsay.<span class="hljs-keyword">com</span>
linuxsay.<span class="hljs-keyword">com</span>
windowsmint.<span class="hljs-keyword">com</span>
tecmint@TecMint ~ $ <span class="hljs-keyword">sort</span> domains.<span class="hljs-keyword">list</span> | uniq -<span class="hljs-keyword">c</span> 
<span class="hljs-number">2</span> linuxsay.<span class="hljs-keyword">com</span>
<span class="hljs-number">2</span> news.tecmint.<span class="hljs-keyword">com</span>
<span class="hljs-number">2</span> tecmint.<span class="hljs-keyword">com</span>
<span class="hljs-number">1</span> windowsmint.<span class="hljs-keyword">com</span> 

</code></pre><p>通过阅读 <code>uniq</code> 的 man 手册来获取进一步的使用信息和选项：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man uniq</span>

</code></pre><h3><a href="#8-fmt-命令行"></a>8、 fmt 命令行</h3>
<p><strong>fmt</strong> 是一款简单的优化的文本格式化器，它重新格式化指定文件的段落，并且打印结果到标准输出。</p>
<p>以下是从文件 domain-list.txt 提取的内容：</p>
<pre><code class="hljs stylus"><span class="hljs-number">1</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">2</span><span class="hljs-selector-class">.news</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">3</span><span class="hljs-selector-class">.linuxsay</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">4</span><span class="hljs-selector-class">.windowsmint</span><span class="hljs-selector-class">.com</span>

</code></pre><p>为了把上面的内容重新格式化成一个标准的清单，运行下面的命令，使用 <code>-w</code> 选项定义最大行宽度：</p>
<pre><code class="hljs stylus">tecmint@TecMint ~ $ cat domain-list<span class="hljs-selector-class">.txt</span> 
<span class="hljs-number">1</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">2</span><span class="hljs-selector-class">.news</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">3</span><span class="hljs-selector-class">.linuxsay</span><span class="hljs-selector-class">.com</span> <span class="hljs-number">4</span><span class="hljs-selector-class">.windowsmint</span><span class="hljs-selector-class">.com</span>
tecmint@TecMint ~ $ fmt -w <span class="hljs-number">1</span> domain-list<span class="hljs-selector-class">.txt</span>
<span class="hljs-number">1</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> 
<span class="hljs-number">2</span><span class="hljs-selector-class">.news</span><span class="hljs-selector-class">.tecmint</span><span class="hljs-selector-class">.com</span> 
<span class="hljs-number">3</span><span class="hljs-selector-class">.linuxsay</span><span class="hljs-selector-class">.com</span> 
<span class="hljs-number">4</span><span class="hljs-selector-class">.windowsmint</span><span class="hljs-selector-class">.com</span>

</code></pre><h3><a href="#9-pr-命令"></a>9、 pr 命令</h3>
<p><strong>pr</strong> 命令转换文本文件或者标准输入之后打印出来。例如在 <strong>Debian</strong> 系统上，你可以像下面这样显示所有的安装包：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> dpkg -l</span>

</code></pre><p>为了将要打印的列表在页面和列中组织好，使用以下命令。</p>
<pre><code class="hljs routeros">tecmint@TecMint ~ $ dpkg -l | pr --columns 3 -l 20  
2017-01-06 13:19                                                 <span class="hljs-built_in"> Page </span>1
<span class="hljs-attribute">Desired</span>=Unknown/Install ii  adduser                  ii  apg
| <span class="hljs-attribute">Status</span>=Not/Inst/Conf- ii  adwaita-icon-theme    ii  app-install-data
|/ Err?=(none)/Reinst-r ii  adwaita-icon-theme- ii  apparmor
||/ Name                ii  alsa-base                ii  apt
+++<span class="hljs-attribute">-</span>=================== ii  alsa-utils              ii  apt-clone
ii  accountsservice        ii  anacron                  ii  apt-transport-https
ii  acl                 ii  apache2                  ii  apt-utils
ii  acpi-support        ii  apache2-bin              ii  apt-xapian-index
ii  acpid               ii  apache2-data          ii  aptdaemon
ii  add-apt-key         ii  apache2-utils          ii  aptdaemon-data
2017-01-06 13:19                                                 <span class="hljs-built_in"> Page </span>2
ii  aptitude            ii  avahi-daemon          ii  bind9-host
ii  aptitude-common     ii  avahi-utils              ii  binfmt-support
ii  apturl              ii  aview                    ii  binutils
ii  apturl-common       ii  banshee                  ii  bison
ii  archdetect-deb      ii  baobab                  ii  blt
ii  aspell              ii  base-files              ii  blueberry
ii  aspell-en           ii  base-passwd              ii  bluetooth
ii  at-spi2-core        ii  bash                    ii  bluez
ii  attr                ii  bash-completion        ii  bluez-cups
ii  avahi-autoipd       ii  bc                        ii  bluez-obexd
<span class="hljs-built_in">..</span><span class="hljs-built_in">..</span>.

</code></pre><p>其中，使用的标志如下：</p>
<ul>
<li><code>--column</code> 定义在输出中创建的列数。</li>
<li><code>-l</code> 指定页面的长度（默认是 66 行）。</li>
</ul>
<h3><a href="#10-tr-命令行"></a>10、 tr 命令行</h3>
<p>这个命令从标准输入转换或者删除字符，然后输出结果到标准输出。</p>
<p>使用 <code>tr</code> 的语法如下：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> tr <span class="hljs-keyword">options</span> set1 set2

</code></pre><p>看一下下面的例子，在第一个命令，<code>set1( [:upper:] )</code> 代表指定输入字符的大小写（都是大写字符）。 <code>set2([:lower:])</code> 代表期望结果字符的大小写。第二个例子意思相似，转义字符 <code>\n</code> 表示在新的一行打印输出：</p>
<pre><code class="hljs elixir">tecmint<span class="hljs-variable">@TecMint</span> ~ <span class="hljs-variable">$ </span>echo <span class="hljs-string">"WWW.TECMINT.COM"</span> | tr [<span class="hljs-symbol">:upper</span><span class="hljs-symbol">:</span>] [<span class="hljs-symbol">:lower</span><span class="hljs-symbol">:</span>]
www.tecmint.com
tecmint<span class="hljs-variable">@TecMint</span> ~ <span class="hljs-variable">$ </span>echo <span class="hljs-string">"news.tecmint.com"</span> | tr [<span class="hljs-symbol">:lower</span><span class="hljs-symbol">:</span>] [<span class="hljs-symbol">:upper</span><span class="hljs-symbol">:</span>]
NEWS.TECMINT.COM

</code></pre><h3><a href="#11-more-命令"></a>11、 more 命令</h3>
<p><strong>more</strong> 命令是一个有用的文件过滤器，最初为查看证书而建。它一页页显示文件内容，用户可以通过按回车来显示更多的信息。</p>
<p>你可以像这样使用它来显示大文件：</p>
<pre><code class="hljs prolog">tecmint@<span class="hljs-symbol">TecMint</span> ~ $ dmesg | more
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpuset
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpu
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpuacct
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Linux</span> version <span class="hljs-number">4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic (buildd@lgw01<span class="hljs-number">-21</span>) (gcc version <span class="hljs-number">5.3</span><span class="hljs-number">.1</span> <span class="hljs-number">20160413</span> (<span class="hljs-symbol">Ubuntu</span> <span class="hljs-number">5.3</span><span class="hljs-number">.1</span><span class="hljs-number">-14</span>ubuntu2) ) #<span class="hljs-number">37</span>-<span class="hljs-symbol">Ubuntu</span> <span class="hljs-symbol">SMP</span> <span class="hljs-symbol">Mon</span> <span class="hljs-symbol">Apr</span> <span class="hljs-number">18</span> <span class="hljs-number">18</span>:<span class="hljs-number">33</span>:<span class="hljs-number">37</span> <span class="hljs-symbol">UTC</span> <span class="hljs-number">2016</span> (<span class="hljs-symbol">Ubuntu</span> <span class="hljs-number">4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21.37</span>-generic
<span class="hljs-number">4.4</span><span class="hljs-number">.6</span>)
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Command</span> line: <span class="hljs-symbol">BOOT_IMAGE</span>=/boot/vmlinuz<span class="hljs-number">-4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic root=<span class="hljs-symbol">UUID</span>=bb29dda3-bdaa<span class="hljs-number">-4</span>b39<span class="hljs-number">-86</span>cf<span class="hljs-number">-4</span>a6dc9634a1b ro quiet splash vt.handoff=<span class="hljs-number">7</span>
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">KERNEL</span> supported cpus:
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">Intel</span> <span class="hljs-symbol">GenuineIntel</span>
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">AMD</span> <span class="hljs-symbol">AuthenticAMD</span>
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">Centaur</span> <span class="hljs-symbol">CentaurHauls</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: xstate_offset[<span class="hljs-number">2</span>]:  <span class="hljs-number">576</span>, xstate_sizes[<span class="hljs-number">2</span>]:  <span class="hljs-number">256</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x01</span>: <span class="hljs-string">'x87 floating point registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x02</span>: <span class="hljs-string">'SSE registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x04</span>: <span class="hljs-string">'AVX registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Enabled</span> xstate features <span class="hljs-number">0x7</span>, context size is <span class="hljs-number">832</span> bytes, using <span class="hljs-string">'standard'</span> format.
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Using</span> <span class="hljs-string">'eager'</span> <span class="hljs-symbol">FPU</span> context switches.
[    <span class="hljs-number">0.000000</span>] e820: <span class="hljs-symbol">BIOS</span>-provided physical <span class="hljs-symbol">RAM</span> map:
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x0000000000000000</span><span class="hljs-number">-0x000000000009d3ff</span>] usable
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x000000000009d400</span><span class="hljs-number">-0x000000000009ffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000000e0000</span><span class="hljs-number">-0x00000000000fffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x0000000000100000</span><span class="hljs-number">-0x00000000a56affff</span>] usable
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000a56b0000</span><span class="hljs-number">-0x00000000a5eaffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000a5eb0000</span><span class="hljs-number">-0x00000000aaabefff</span>] usable
--<span class="hljs-symbol">More</span>--

</code></pre><h3><a href="#12-less-命令"></a>12、 less 命令</h3>
<p><strong>less</strong> 是和上面的 <strong>more</strong> 命令相反的一个命令，但是它提供了额外的特性，而且对于大文件，它会更快些。</p>
<p>按照 <code>more</code> 命令相同的方式使用它：</p>
<pre><code class="hljs prolog">tecmint@<span class="hljs-symbol">TecMint</span> ~ $ dmesg | less
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpuset
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpu
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Initializing</span> cgroup subsys cpuacct
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Linux</span> version <span class="hljs-number">4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic (buildd@lgw01<span class="hljs-number">-21</span>) (gcc version <span class="hljs-number">5.3</span><span class="hljs-number">.1</span> <span class="hljs-number">20160413</span> (<span class="hljs-symbol">Ubuntu</span> <span class="hljs-number">5.3</span><span class="hljs-number">.1</span><span class="hljs-number">-14</span>ubuntu2) ) #<span class="hljs-number">37</span>-<span class="hljs-symbol">Ubuntu</span> <span class="hljs-symbol">SMP</span> <span class="hljs-symbol">Mon</span> <span class="hljs-symbol">Apr</span> <span class="hljs-number">18</span> <span class="hljs-number">18</span>:<span class="hljs-number">33</span>:<span class="hljs-number">37</span> <span class="hljs-symbol">UTC</span> <span class="hljs-number">2016</span> (<span class="hljs-symbol">Ubuntu</span> <span class="hljs-number">4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21.37</span>-generic
<span class="hljs-number">4.4</span><span class="hljs-number">.6</span>)
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">Command</span> line: <span class="hljs-symbol">BOOT_IMAGE</span>=/boot/vmlinuz<span class="hljs-number">-4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic root=<span class="hljs-symbol">UUID</span>=bb29dda3-bdaa<span class="hljs-number">-4</span>b39<span class="hljs-number">-86</span>cf<span class="hljs-number">-4</span>a6dc9634a1b ro quiet splash vt.handoff=<span class="hljs-number">7</span>
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">KERNEL</span> supported cpus:
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">Intel</span> <span class="hljs-symbol">GenuineIntel</span>
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">AMD</span> <span class="hljs-symbol">AuthenticAMD</span>
[    <span class="hljs-number">0.000000</span>]   <span class="hljs-symbol">Centaur</span> <span class="hljs-symbol">CentaurHauls</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: xstate_offset[<span class="hljs-number">2</span>]:  <span class="hljs-number">576</span>, xstate_sizes[<span class="hljs-number">2</span>]:  <span class="hljs-number">256</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x01</span>: <span class="hljs-string">'x87 floating point registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x02</span>: <span class="hljs-string">'SSE registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Supporting</span> <span class="hljs-symbol">XSAVE</span> feature <span class="hljs-number">0x04</span>: <span class="hljs-string">'AVX registers'</span>
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Enabled</span> xstate features <span class="hljs-number">0x7</span>, context size is <span class="hljs-number">832</span> bytes, using <span class="hljs-string">'standard'</span> format.
[    <span class="hljs-number">0.000000</span>] x86/fpu: <span class="hljs-symbol">Using</span> <span class="hljs-string">'eager'</span> <span class="hljs-symbol">FPU</span> context switches.
[    <span class="hljs-number">0.000000</span>] e820: <span class="hljs-symbol">BIOS</span>-provided physical <span class="hljs-symbol">RAM</span> map:
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x0000000000000000</span><span class="hljs-number">-0x000000000009d3ff</span>] usable
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x000000000009d400</span><span class="hljs-number">-0x000000000009ffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000000e0000</span><span class="hljs-number">-0x00000000000fffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x0000000000100000</span><span class="hljs-number">-0x00000000a56affff</span>] usable
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000a56b0000</span><span class="hljs-number">-0x00000000a5eaffff</span>] reserved
[    <span class="hljs-number">0.000000</span>] <span class="hljs-symbol">BIOS</span>-e820: [mem <span class="hljs-number">0x00000000a5eb0000</span><span class="hljs-number">-0x00000000aaabefff</span>] usable
:

</code></pre><p>学习为什么 Linux 下进行有效的文件浏览， <a href="http://www.tecmint.com/linux-more-command-and-less-command-examples/">‘less’ 比 ‘more’ 命令更快</a>。</p>
<p>基本上就这些了，如果你还知道其他本文没有提供的 Linux 下<a href="http://www.tecmint.com/tag/linux-tricks/">有用的文本过滤命令行工具</a>，可以在下面的评论部分通知我们。</p>
<hr>
<p>作者简介：Aaron Kili 是一名 Linux 和 F.O.S.S 爱好者、一名未来的 Linux 系统管理员、web 开发者，并且目前是一名 TecMint 上的内容创造者，他喜欢计算机相关的工作，并且坚信知识的分享。</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<hr>
<p>via: <a href="http://www.tecmint.com/linux-file-operations-commands/">http://www.tecmint.com/linux-file-operations-commands/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/yangmingming">yangmingming</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux 上 12 个高效的文本过滤命令

## 原文链接
[https://www.zcfy.cc/article/12-useful-commands-for-filtering-text-for-effective-file-operations-in-linux](https://www.zcfy.cc/article/12-useful-commands-for-filtering-text-for-effective-file-operations-in-linux)

