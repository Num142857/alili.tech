---
title: '可怕的万圣节 Linux 命令' 
date: 2019-01-20 2:30:11
hidden: true
slug: stc56x7t1ts
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#可怕的万圣节-linux-命令"></a>可怕的万圣节 Linux 命令</h1>
<p>虽然现在不是万圣节，也可以关注一下 Linux 可怕的一面。什么命令可能会显示鬼、巫婆和僵尸的图像？哪个会鼓励“不给糖果就捣蛋”的精神？</p>
<h3><a href="#crypt"></a>crypt</h3>
<p>好吧，我们一直看到 <code>crypt</code>。尽管名称不同，crypt 不是一个地窖，也不是垃圾文件的埋葬坑，而是一个加密文件内容的命令。现在，<code>crypt</code> 通常用一个脚本实现，通过调用一个名为 <code>mcrypt</code> 的二进制文件来模拟以前的 <code>crypt</code> 命令来完成它的工作。直接使用 <code>mycrypt</code> 命令是更好的选择。</p>
<pre><code class="hljs livecodeserver">$ mcrypt x
Enter <span class="hljs-keyword">the</span> passphrase (maximum <span class="hljs-keyword">of</span> <span class="hljs-number">512</span> <span class="hljs-keyword">characters</span>)
Please use <span class="hljs-keyword">a</span> combination <span class="hljs-keyword">of</span> <span class="hljs-built_in">upper</span> <span class="hljs-keyword">and</span> <span class="hljs-built_in">lower</span> <span class="hljs-keyword">case</span> letters <span class="hljs-keyword">and</span> numbers.
Enter passphrase:
Enter passphrase:

File x was encrypted.

</code></pre><p>请注意，<code>mcrypt</code> 命令会创建第二个扩展名为 <code>.nc</code> 的文件。它不会覆盖你正在加密的文件。</p>
<p><code>mcrypt</code> 命令有密钥大小和加密算法的选项。你也可以再选项中指定密钥，但 <code>mcrypt</code> 命令不鼓励这样做。</p>
<h3><a href="#kill"></a>kill</h3>
<p>还有 <code>kill</code> 命令 - 当然并不是指谋杀，而是用来强制和非强制地结束进程，这取决于正确终止它们的要求。当然，Linux 并不止于此。相反，它有各种 <code>kill</code> 命令来终止进程。我们有 <code>kill</code>、<code>pkill</code>、<code>killall</code>、<code>killpg</code>、<code>rfkill</code>、<code>skill</code>（）读作 es-kill）、<code>tgkill</code>、<code>tkill</code> 和 <code>xkill</code>。</p>
<pre><code class="hljs accesslog">$ killall runme
<span class="hljs-string">[1]</span> Terminated ./runme
<span class="hljs-string">[2]</span> Terminated ./runme
<span class="hljs-string">[3]</span>- Terminated ./runme
<span class="hljs-string">[4]</span>+ Terminated ./runme

</code></pre><h3><a href="#shred"></a>shred</h3>
<p>Linux 系统也支持一个名为 <code>shred</code> 的命令。<code>shred</code> 命令会覆盖文件以隐藏其以前的内容，并确保使用硬盘恢复工具无法恢复它们。请记住，<code>rm</code> 命令基本上只是删除文件在目录文件中的引用，但不一定会从磁盘上删除内容或覆盖它。<code>shred</code> 命令覆盖文件的内容。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> shred dupes.txt</span>
<span class="hljs-meta">$</span><span class="bash"> more dupes.txt</span>
▒oΛ▒▒9▒lm▒▒▒▒▒o▒1־▒▒f▒f▒▒▒i▒▒h^}&amp;▒▒▒{▒▒

</code></pre><h3><a href="#僵尸"></a>僵尸</h3>
<p>虽然不是命令，但僵尸在 Linux 系统上是很顽固的存在。僵尸基本上是没有完全清理掉的死亡进程的遗骸。进程<em>不应该</em>这样工作 —— 让死亡进程四处游荡，而不是简单地让它们死亡并进入数字天堂，所以僵尸的存在表明了让他们遗留于此的进程有一些缺陷。</p>
<p>一个简单的方法来检查你的系统是否有僵尸进程遗留，看看 <code>top</code> 命令的标题行。</p>
<pre><code class="hljs tap">$ top
top - 18:50:38 up<span class="hljs-number"> 6 </span>days, 6:36,<span class="hljs-number"> 2 </span>users, load average: 0.00, 0.00, 0.00
Tasks:<span class="hljs-number"> 171 </span>total,<span class="hljs-number"> 1 </span>running,<span class="hljs-number"> 167 </span>sleeping,<span class="hljs-number"> 0 </span>stopped,<span class="hljs-number"> 3 </span>zombie    `&lt; ==`
%Cpu(s): 0.0 us, 0.0 sy, 0.0 ni, 99.9 id, 0.1 wa, 0.0 hi, 0.0 si, 0.0 st
KiB Mem :<span class="hljs-number"> 2003388 </span>total,<span class="hljs-number"> 250840 </span>free,<span class="hljs-number"> 545832 </span>used,<span class="hljs-number"> 1206716 </span>buff/cache
KiB Swap:<span class="hljs-number"> 9765884 </span>total,<span class="hljs-number"> 9765764 </span>free,<span class="hljs-number"> 120 </span>used.<span class="hljs-number"> 1156536 </span>avail Mem

</code></pre><p>可怕！上面显示有三个僵尸进程。</p>
<h3><a href="#at-midnight"></a>at midnight</h3>
<p>有时会在万圣节这么说，死者的灵魂从日落开始游荡直到午夜。Linux 可以通过 <code>at midnight</code> 命令跟踪它们的离开。用于安排在下次到达指定时间时运行的作业，<code>at</code> 的作用类似于一次性的 cron。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> at midnight</span>
warning: commands will be executed using /bin/sh
<span class="hljs-meta">at&gt;</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">'the spirits of the dead have left'</span></span>
<span class="hljs-meta">at&gt;</span><span class="bash"> &lt;EOT&gt;</span>
job 3 at Thu Oct 31 00:00:00 2017

</code></pre><h3><a href="#守护进程"></a>守护进程</h3>
<p>Linux 系统也高度依赖守护进程 —— 在后台运行的进程，并提供系统的许多功能。许多守护进程的名称以 “d” 结尾。这个 “d” 代表守护进程daemon，表明这个进程一直运行并支持一些重要功能。有的会用单词 “daemon” 。</p>
<pre><code class="hljs crystal">$ ps -ef | grep sshd
root <span class="hljs-number">1142</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> Oct19 ? <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span> /usr/sbin/sshd -D
root <span class="hljs-number">25342</span> <span class="hljs-number">1142</span> <span class="hljs-number">0</span> <span class="hljs-number">18</span>:<span class="hljs-number">34</span> ? <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span> <span class="hljs-symbol">sshd:</span> shs [priv]
$ ps -ef | grep daemon | grep -v grep
message+ <span class="hljs-number">790</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> Oct19 ? <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">01</span> /usr/bin/dbus-daemon --system --address=<span class="hljs-symbol">systemd:</span> --nofork --nopidfile --systemd-activation
root <span class="hljs-number">836</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> Oct19 ? <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">02</span> /usr/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">accountsservice</span>/<span class="hljs-title">accounts</span>-<span class="hljs-title">daemon</span></span>

</code></pre><h3><a href="#万圣节快乐"></a>万圣节快乐！</h3>
<p>在 <a href="https://www.facebook.com/NetworkWorld/">Facebook</a> 和 <a href="https://www.linkedin.com/company/network-world">LinkedIn</a> 上加入 Network World 社区来对主题进行评论。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3235219/linux/scary-linux-commands-for-halloween.html">https://www.networkworld.com/article/3235219/linux/scary-linux-commands-for-halloween.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可怕的万圣节 Linux 命令

## 原文链接
[https://www.zcfy.cc/article/scary-linux-commands-for-halloween](https://www.zcfy.cc/article/scary-linux-commands-for-halloween)

