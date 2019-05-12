---
title: '如何在 Linux 系统查询机器最近重启时间' 
date: 2019-01-21 2:30:06
hidden: true
slug: 2dzdbrnmh2v
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-系统查询机器最近重启时间"></a>如何在 Linux 系统查询机器最近重启时间</h1>
<p>在你的 Linux 或类 UNIX 系统中，你是如何查询系统上次重新启动的日期和时间？怎样显示系统关机的日期和时间？ <code>last</code> 命令不仅可以按照时间从近到远的顺序列出该会话的特定用户、终端和主机名，而且还可以列出指定日期和时间登录的用户。输出到终端的每一行都包括用户名、会话终端、主机名、会话开始和结束的时间、会话持续的时间。要查看 Linux 或类 UNIX 系统重启和关机的时间和日期，可以使用下面的命令。</p>
<ul>
<li><code>last</code> 命令</li>
<li><code>who</code> 命令</li>
</ul>
<h3><a href="#使用-who-命令来查看系统重新启动的时间日期"></a>使用 who 命令来查看系统重新启动的时间/日期</h3>
<p>你需要在终端使用 <a href="https://www.cyberciti.biz/faq/unix-linux-who-command-examples-syntax-usage/" title="See Linux/Unix who command examples for more info">who</a> 命令来打印有哪些人登录了系统，<code>who</code> 命令同时也会显示上次系统启动的时间。使用 <code>last</code> 命令来查看系统重启和关机的日期和时间，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> who -b</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs subunit">system boot 2017<span class="hljs-string">-06</span><span class="hljs-string">-20</span> 17:41

</code></pre><p>使用 <code>last</code> 命令来查询最近登录到系统的用户和系统重启的时间和日期。输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> last reboot | less</span>

</code></pre><p>示例输出：</p>
<p><a href="https://www.cyberciti.biz/tips/wp-content/uploads/2006/04/last-reboot.jpg"><img src="https://p0.ssl.qhimg.com/t01d78188bb8469abcb.jpg" alt="Fig.01: last command in action"></a></p>
<p>或者，尝试输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> last reboot | head -1</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs routeros">reboot<span class="hljs-built_in"> system </span>boot 4.9.0-3-amd64 Sat Jul 15 19:19 still running

</code></pre><p><code>last</code> 命令通过查看文件 <code>/var/log/wtmp</code> 来显示自 wtmp 文件被创建时的所有登录（和登出）的用户。每当系统重新启动时，这个伪用户 <code>reboot</code> 就会登录。因此，<code>last reboot</code> 命令将会显示自该日志文件被创建以来的所有重启信息。</p>
<h3><a href="#查看系统上次关机的时间和日期"></a>查看系统上次关机的时间和日期</h3>
<p>可以使用下面的命令来显示上次关机的日期和时间：</p>
<pre><code class="hljs perl">$ <span class="hljs-keyword">last</span> -<span class="hljs-keyword">x</span>|<span class="hljs-keyword">grep</span> <span class="hljs-keyword">shutdown</span> | head -<span class="hljs-number">1</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs routeros">shutdown<span class="hljs-built_in"> system </span>down 2.6.15.4 Sun Apr 30 13:31 - 15:08 (01:37)

</code></pre><p>命令中，</p>
<ul>
<li><code>-x</code>：显示系统关机和运行等级改变信息</li>
</ul>
<p>这里是 <code>last</code> 命令的其它的一些选项：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> last</span>
<span class="hljs-meta">$</span><span class="bash"> last -x</span>
<span class="hljs-meta">$</span><span class="bash"> last -x reboot</span>
<span class="hljs-meta">$</span><span class="bash"> last -x shutdown</span>

</code></pre><p>示例输出：</p>
<p><a href="https://camo.githubusercontent.com/406c6a477f0f6334aa99b3e17bd5c16d1bcbaf01/68747470733a2f2f7777772e6379626572636974692e62697a2f6d656469612f6e65772f746970732f323030362f30342f636865636b2d6c6173742d74696d652d73797374656d2d7761732d7265626f6f7465642e6a7067"><img src="https://p0.ssl.qhimg.com/t012fde6b74c395d6f3.jpg" alt="Fig.01: How to view last Linux System Reboot Date/Time"></a></p>
<h3><a href="#查看系统正常的运行时间"></a>查看系统正常的运行时间</h3>
<p>评论区的读者建议的另一个命令如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> uptime -s</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs css">2017<span class="hljs-selector-tag">-06-20</span> 17<span class="hljs-selector-pseudo">:41</span><span class="hljs-selector-pseudo">:51</span>

</code></pre><h3><a href="#os-xunixfreebsd-查看最近重启和关机时间的命令示例"></a>OS X/Unix/FreeBSD 查看最近重启和关机时间的命令示例</h3>
<p>在终端输入下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> last reboot</span>

</code></pre><p>在 OS X 示例输出结果如下：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Fri</span> <span class="hljs-selector-tag">Dec</span> 18 23<span class="hljs-selector-pseudo">:58</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Mon</span> <span class="hljs-selector-tag">Dec</span> 14 09<span class="hljs-selector-pseudo">:54</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Wed</span> <span class="hljs-selector-tag">Dec</span> 9 23<span class="hljs-selector-pseudo">:21</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Tue</span> <span class="hljs-selector-tag">Nov</span> 17 21<span class="hljs-selector-pseudo">:52</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Tue</span> <span class="hljs-selector-tag">Nov</span> 17 06<span class="hljs-selector-pseudo">:01</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Wed</span> <span class="hljs-selector-tag">Nov</span> 11 12<span class="hljs-selector-pseudo">:14</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Sat</span> <span class="hljs-selector-tag">Oct</span> 31 13<span class="hljs-selector-pseudo">:40</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Wed</span> <span class="hljs-selector-tag">Oct</span> 28 15<span class="hljs-selector-pseudo">:56</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Wed</span> <span class="hljs-selector-tag">Oct</span> 28 11<span class="hljs-selector-pseudo">:35</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Tue</span> <span class="hljs-selector-tag">Oct</span> 27 00<span class="hljs-selector-pseudo">:00</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Sun</span> <span class="hljs-selector-tag">Oct</span> 18 17<span class="hljs-selector-pseudo">:28</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Sun</span> <span class="hljs-selector-tag">Oct</span> 18 17<span class="hljs-selector-pseudo">:11</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Mon</span> <span class="hljs-selector-tag">Oct</span> 5 09<span class="hljs-selector-pseudo">:35</span>
<span class="hljs-selector-tag">reboot</span> ~ <span class="hljs-selector-tag">Sat</span> <span class="hljs-selector-tag">Oct</span> 3 18<span class="hljs-selector-pseudo">:57</span>


<span class="hljs-selector-tag">wtmp</span> <span class="hljs-selector-tag">begins</span> <span class="hljs-selector-tag">Sat</span> <span class="hljs-selector-tag">Oct</span> 3 18<span class="hljs-selector-pseudo">:57</span>

</code></pre><p>查看关机日期和时间，输入：</p>
<pre><code class="hljs perl">$ <span class="hljs-keyword">last</span> <span class="hljs-keyword">shutdown</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs autoit"><span class="hljs-built_in">shutdown</span> ~ Fri <span class="hljs-built_in">Dec</span> <span class="hljs-number">18</span> <span class="hljs-number">23</span>:<span class="hljs-number">57</span>
<span class="hljs-built_in">shutdown</span> ~ Mon <span class="hljs-built_in">Dec</span> <span class="hljs-number">14</span> <span class="hljs-number">09</span>:<span class="hljs-number">53</span>
<span class="hljs-built_in">shutdown</span> ~ Wed <span class="hljs-built_in">Dec</span> <span class="hljs-number">9</span> <span class="hljs-number">23</span>:<span class="hljs-number">20</span>
<span class="hljs-built_in">shutdown</span> ~ Tue Nov <span class="hljs-number">17</span> <span class="hljs-number">14</span>:<span class="hljs-number">24</span>
<span class="hljs-built_in">shutdown</span> ~ Mon Nov <span class="hljs-number">16</span> <span class="hljs-number">21</span>:<span class="hljs-number">15</span>
<span class="hljs-built_in">shutdown</span> ~ Tue Nov <span class="hljs-number">10</span> <span class="hljs-number">13</span>:<span class="hljs-number">15</span>
<span class="hljs-built_in">shutdown</span> ~ Sat Oct <span class="hljs-number">31</span> <span class="hljs-number">13</span>:<span class="hljs-number">40</span>
<span class="hljs-built_in">shutdown</span> ~ Wed Oct <span class="hljs-number">28</span> <span class="hljs-number">03</span>:<span class="hljs-number">10</span>
<span class="hljs-built_in">shutdown</span> ~ Sun Oct <span class="hljs-number">18</span> <span class="hljs-number">17</span>:<span class="hljs-number">27</span>
<span class="hljs-built_in">shutdown</span> ~ Mon Oct <span class="hljs-number">5</span> <span class="hljs-number">09</span>:<span class="hljs-number">23</span>


wtmp begins Sat Oct <span class="hljs-number">3</span> <span class="hljs-number">18</span>:<span class="hljs-number">57</span>

</code></pre><h3><a href="#如何查看是谁重启和关闭机器"></a>如何查看是谁重启和关闭机器？</h3>
<p>你需要<a href="https://www.cyberciti.biz/tips/howto-log-user-activity-using-process-accounting.html">启用 psacct 服务然后运行下面的命令</a>来查看执行过的命令（包括用户名），在终端输入 <a href="https://www.cyberciti.biz/faq/linux-unix-lastcomm-command-examples-usage-syntax/" title="See Linux/Unix lastcomm command examples for more info">lastcomm</a> 命令查看信息</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> lastcomm userNameHere</span>
<span class="hljs-meta">#</span><span class="bash"> lastcomm commandNameHere</span>
<span class="hljs-meta">#</span><span class="bash"> lastcomm | more</span>
<span class="hljs-meta">#</span><span class="bash"> lastcomm reboot</span>
<span class="hljs-meta">#</span><span class="bash"> lastcomm shutdown</span>
<span class="hljs-meta">#</span><span class="bash"><span class="hljs-comment">## 或者查看重启和关机时间</span></span>
<span class="hljs-meta">#</span><span class="bash"> lastcomm | egrep <span class="hljs-string">'reboot|shutdown'</span></span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs autoit">reboot S X root pts/<span class="hljs-number">0</span> <span class="hljs-number">0.00</span> secs Sun <span class="hljs-built_in">Dec</span> <span class="hljs-number">27</span> <span class="hljs-number">23</span>:<span class="hljs-number">49</span>
<span class="hljs-built_in">shutdown</span> S root pts/<span class="hljs-number">1</span> <span class="hljs-number">0.00</span> secs Sun <span class="hljs-built_in">Dec</span> <span class="hljs-number">27</span> <span class="hljs-number">23</span>:<span class="hljs-number">45</span>

</code></pre><p>我们可以看到 root 用户在当地时间 12 月 27 日星期二 23:49 在 pts/0 重新启动了机器。</p>
<h3><a href="#参见"></a>参见</h3>
<ul>
<li>更多信息可以查看 man 手册（<code>man last</code>）和参考文章 <a href="https://www.cyberciti.biz/hardware/howto-see-historical-statistical-uptime-on-linux-server/">如何在 Linux 服务器上使用 tuptime 命令查看历史和统计的正常的运行时间</a>。</li>
</ul>
<h3><a href="#关于作者"></a>关于作者</h3>
<p>作者是 nixCraft 的创立者，同时也是一名经验丰富的系统管理员，也是 Linux，类 Unix 操作系统 shell 脚本的培训师。他曾与全球各行各业的客户工作过，包括 IT，教育，国防和空间研究以及非营利部门等等。你可以在 <a href="https://twitter.com/nixcraft">Twitter</a>、<a href="https://facebook.com/nixcraft">Facebook</a>、<a href="https://plus.google.com/+CybercitiBiz">Google+</a> 关注他。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/linux-last-reboot-time-and-date-find-out.html">https://www.cyberciti.biz/tips/linux-last-reboot-time-and-date-find-out.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz/">Vivek Gite</a> 译者：<a href="https://github.com/amwps290">amwps290</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 系统查询机器最近重启时间

## 原文链接
[https://www.zcfy.cc/article/linux-find-out-last-system-reboot-time-and-date-command](https://www.zcfy.cc/article/linux-find-out-last-system-reboot-time-and-date-command)

