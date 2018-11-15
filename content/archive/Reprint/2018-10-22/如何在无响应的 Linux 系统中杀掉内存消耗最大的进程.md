---
title: 如何在无响应的 Linux 系统中杀掉内存消耗最大的进程
reprint: true
categories: reprint
abbrlink: 961ee5ac
date: 2018-10-22 00:00:00
---

{{% raw %}}

            <h1><a href="#如何在无响应的-linux-系统中杀掉内存消耗最大的进程"></a>如何在无响应的 Linux 系统中杀掉内存消耗最大的进程</h1>
<p>作为一名博客作者，我收藏了很多博客、网站和论坛用来寻找 Linux 和 Unix 相关的内容。有时候，我在浏览器中开启了非常多的标签页，导致操作系统会无响应好几分钟。我不能移动我的鼠标，也不能杀掉一个进程或关闭任何开启的标签页。在这种情况下，我别无选择，只能强制重启系统。当然我也用了 <strong>OneTab</strong> （LCTT 译注：OneTab 是一个 Chrome 的 Extension，可以将标签页转化成一个列表保存。）和 <strong>Greate Suspender</strong> （LCTT 译注：Great Suspender 是一个 Chrome 的 Extension， 可以自动冻结标签页）这样浏览器拓展，但它们在这里也起不到太大的作用。 我经常耗尽我的内存。而这就是 <strong>Early OOM</strong> 起作用的时候了。在情况严重时，它会杀掉一个未响应系统中的内存消耗最大的进程。Early OOM 每秒会检测可用内存和空余交换区 10 次，一旦两者都低于 10%，它就会把最大的进程杀死。</p>
<h3><a href="#为什么用-early-oom为什么不用系统内置的-oom-killer"></a>为什么用 Early OOM？为什么不用系统内置的 OOM killer？</h3>
<p>在继续讨论下去之前，我想先简短的介绍下 OOM killer，也就是 <strong>O</strong>ut <strong>O</strong>f <strong>M</strong>emory killer。OOM killer 是一个由内核在可用内存非常低的时候使用的进程。它的主要任务是不断的杀死进程，直到释放出足够的内存，使内核正在运行的其它进程能顺利运行。OOM killer 会找到系统中最不重要并且能释放出最多内存的进程，然后杀掉他们。在 <code>/proc</code> 目录下的 <code>pid</code> 目录中，我们可以看到每个进程的 <code>oom_score</code>。</p>
<p>示例：</p>
<pre><code class="hljs lsl">$ cat /proc/<span class="hljs-number">10299</span>/oom_score
<span class="hljs-number">1</span>

</code></pre><p>一个进程的 <code>oom_score</code> 的值越高，这个进程越有可能在系统内存耗尽的时候被 OOM killer 杀死。</p>
<p>Early OOM 的开发者表示，相对于内置的 OOM killer，Early OOM 有一个很大的优点。就像我之前说的那样，OOM killer 会杀掉 <code>oom_score</code> 最高的进程，而这也导致 Chrome 浏览器总是会成为第一个被杀死的进程。为了避免这种情况发生，Early OOM 使用 <code>/proc/*/status</code> 而不是 <code>echo f &gt; /proc/sysrq-trigger</code>（LCTT 译注：这条命令会调用 OOM killer 杀死进程）。开发者还表示，手动触发 OOM killer 在最新版本的 Linux 内核中很可能不会起作用。</p>
<h3><a href="#安装-early-oom"></a>安装 Early OOM</h3>
<p>Early OOM 在 AUR（Arch User Repository）中可以找到，所以你可以在 Arch 和它的衍生版本中使用任何 AUR 工具安装它。</p>
<p>使用 <a href="https://www.ostechnix.com/install-pacaur-arch-linux/">Pacaur</a>：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">pacaur -S earlyoom</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-packer-arch-linux-2/">Packer</a>：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">packer -S earlyoom</span>

</code></pre><p>使用 <a href="https://www.ostechnix.com/install-yaourt-arch-linux/">Yaourt</a>：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">yaourt -S earlyoom</span>

</code></pre><p>启用并启动 Early OOM 守护进程：</p>
<pre><code class="hljs routeros">sudo systemctl <span class="hljs-builtin-name">enable</span> earlyoom
sudo systemctl start earlyoom

</code></pre><p>在其它的 Linux 发行版中，可以按如下方法编译安装它：</p>
<pre><code class="hljs vim">git clone http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/rfjakob/earlyoom.git
<span class="hljs-keyword">cd</span> earlyoom
<span class="hljs-keyword">make</span>
sudo <span class="hljs-keyword">make</span> install

</code></pre><h3><a href="#early-oom---杀掉无响应-linux-系统中的最大的进程"></a>Early OOM - 杀掉无响应 Linux 系统中的最大的进程</h3>
<p>运行如下命令启动 Early OOM：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">earlyoom</span>

</code></pre><p>如果是通过编译源代码安装的， 运行如下命令启动 Early OOM：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-string">./earlyoom</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs groovy">earlyoom <span class="hljs-number">0.12</span>
mem <span class="hljs-string">total:</span> <span class="hljs-number">3863</span> MiB, <span class="hljs-string">min:</span> <span class="hljs-number">386</span> MiB (<span class="hljs-number">10</span> %)
swap <span class="hljs-string">total:</span> <span class="hljs-number">2047</span> MiB, <span class="hljs-string">min:</span> <span class="hljs-number">204</span> MiB (<span class="hljs-number">10</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1770</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1773</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1772</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1773</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1772</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1773</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1771</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1773</span> MiB (<span class="hljs-number">45</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
mem <span class="hljs-string">avail:</span> <span class="hljs-number">1784</span> MiB (<span class="hljs-number">46</span> %), swap <span class="hljs-string">free:</span> <span class="hljs-number">2047</span> MiB (<span class="hljs-number">99</span> %)
[...]

</code></pre><p>就像你在上面的输出中可以看到的，Early OOM 将会显示你有多少内存和交换区，以及有多少可用的内存和交换区。记住它会一直保持运行，直到你按下 <code>CTRL+C</code>。</p>
<p>如果可用的内存和交换区大小都低于 10%，Early OOM 将会自动杀死最大的进程，直到系统有足够的内存可以流畅的运行。你也可以根据你的需求配置最小百分比值。</p>
<p>设置最小的可用内存百分比，运行：</p>
<pre><code class="hljs xml">earlyoom -m <span class="hljs-tag">&lt;<span class="hljs-name">PERCENT_HERE</span>&gt;</span>

</code></pre><p>设置最小可用交换区百分比, 运行：</p>
<pre><code class="hljs xml">earlyoom -s <span class="hljs-tag">&lt;<span class="hljs-name">PERCENT_HERE</span>&gt;</span>

</code></pre><p>在帮助部分，可以看到更多详细信息：</p>
<pre><code class="hljs sql">$ earlyoom -h
earlyoom 0.12
Usage: earlyoom [OPTION]...

 -m PERCENT <span class="hljs-keyword">set</span> available <span class="hljs-keyword">memory</span> <span class="hljs-keyword">minimum</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">PERCENT</span> <span class="hljs-keyword">of</span> total (<span class="hljs-keyword">default</span> <span class="hljs-number">10</span> %)
 -s <span class="hljs-keyword">PERCENT</span> <span class="hljs-keyword">set</span> free swap <span class="hljs-keyword">minimum</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">PERCENT</span> <span class="hljs-keyword">of</span> total (<span class="hljs-keyword">default</span> <span class="hljs-number">10</span> %)
 -M <span class="hljs-keyword">SIZE</span> <span class="hljs-keyword">set</span> available <span class="hljs-keyword">memory</span> <span class="hljs-keyword">minimum</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">SIZE</span> KiB
 -S <span class="hljs-keyword">SIZE</span> <span class="hljs-keyword">set</span> free swap <span class="hljs-keyword">minimum</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">SIZE</span> KiB
 -k <span class="hljs-keyword">use</span> kernel oom killer instead <span class="hljs-keyword">of</span> own <span class="hljs-keyword">user</span>-<span class="hljs-keyword">space</span> implementation
 -i <span class="hljs-keyword">user</span>-<span class="hljs-keyword">space</span> oom killer should <span class="hljs-keyword">ignore</span> positive oom_score_adj <span class="hljs-keyword">values</span>
 -d <span class="hljs-keyword">enable</span> debugging messages
 -v print <span class="hljs-keyword">version</span> information <span class="hljs-keyword">and</span> <span class="hljs-keyword">exit</span>
 -r <span class="hljs-built_in">INTERVAL</span> <span class="hljs-keyword">memory</span> report <span class="hljs-built_in">interval</span> <span class="hljs-keyword">in</span> seconds (<span class="hljs-keyword">default</span> <span class="hljs-number">1</span>), <span class="hljs-keyword">set</span> <span class="hljs-keyword">to</span> <span class="hljs-number">0</span> <span class="hljs-keyword">to</span>
 <span class="hljs-keyword">disable</span> completely
 -p <span class="hljs-keyword">set</span> niceness <span class="hljs-keyword">of</span> earlyoom <span class="hljs-keyword">to</span> <span class="hljs-number">-20</span> <span class="hljs-keyword">and</span> oom_score_adj <span class="hljs-keyword">to</span> <span class="hljs-number">-1000</span>
 -h this <span class="hljs-keyword">help</span> <span class="hljs-built_in">text</span>

</code></pre><p>现在，你再也不用担心内存消耗最高的进程了。希望这能给你帮助。更多的好内容将会到来，敬请期待。</p>
<p>谢谢！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/kill-largest-process-unresponsive-linux-system/">https://www.ostechnix.com/kill-largest-process-unresponsive-linux-system/</a></p>
<p>作者：<a href="https://www.ostechnix.com">Aditya Goturu</a> 译者：<a href="https://github.com/cizezsy">cizezsy</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/how-to-kill-the-largest-process-in-an-unresponsive-linux-system](https://www.zcfy.cc/article/how-to-kill-the-largest-process-in-an-unresponsive-linux-system)

## 原文标题
如何在无响应的 Linux 系统中杀掉内存消耗最大的进程
