---
title: 'du 及 df 命令的使用（附带示例）' 
date: 2019-01-20 2:30:11
hidden: true
slug: nkobvkswoji
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#du-及-df-命令的使用附带示例"></a>du 及 df 命令的使用（附带示例）</h1>
<p>在本文中，我将讨论 <code>du</code> 和 <code>df</code> 命令。<code>du</code> 和 <code>df</code> 命令都是 Linux 系统的重要工具，来显示 Linux 文件系统的磁盘使用情况。这里我们将通过一些例子来分享这两个命令的用法。</p>
<ul>
<li><strong>（推荐阅读：<a href="http://linuxtechlab.com/files-transfer-scp-rsync-commands/">使用 scp 和 rsync 命令传输文件</a>）</strong></li>
<li><strong>（另请阅读：<a href="http://linuxtechlab.com/linux-cloning-disks-using-dd-cat-commands/">使用 dd 和 cat 命令为 Linux 系统克隆磁盘</a>）</strong></li>
</ul>
<h3><a href="#du-命令"></a>du 命令</h3>
<p><code>du</code>（disk usage 的简称）是用于查找文件和目录的磁盘使用情况的命令。<code>du</code> 命令在与各种选项一起使用时能以多种格式提供结果。</p>
<p>下面是一些例子：</p>
<h4><a href="#1-得到一个目录下所有子目录的磁盘使用概况"></a>1、 得到一个目录下所有子目录的磁盘使用概况</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> du /home</span>

</code></pre><p><a href="https://camo.githubusercontent.com/94a1e378ed09f7b4b3740af7b4197a0815ef311c/68747470733a2f2f69322e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6475312e6a70673f726573697a653d343533253243313632"><img src="http://p0.qhimg.com/t01e91926956e899db0.jpg" alt="du command"></a></p>
<p>该命令的输出将显示 <code>/home</code> 中的所有文件和目录以及显示块大小。</p>
<h4><a href="#2-以人类可读格式也就是-kbmb-等显示文件目录大小"></a>2、 以人类可读格式也就是 kb、mb 等显示文件/目录大小</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> du -h /home</span>

</code></pre><p><a href="https://camo.githubusercontent.com/5e4e32e17abe6c1abbcddd396c3c9b93cc9041b7/68747470733a2f2f69312e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6475322e6a70673f726573697a653d343931253243313633"><img src="http://p0.qhimg.com/t01680d624209a85902.jpg" alt="du command"></a></p>
<h4><a href="#3-目录的总磁盘大小"></a>3、 目录的总磁盘大小</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> du -s /home</span>

</code></pre><p><a href="https://camo.githubusercontent.com/a74818385e39db2f5636ff8eb5328e8d4d7bd62f/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6475332e6a70673f726573697a653d3538342532433631"><img src="http://p0.qhimg.com/t019972e3e3470ece44.jpg" alt="du command"></a></p>
<p>它是 <code>/home</code> 目录的总大小</p>
<h3><a href="#df-命令"></a>df 命令</h3>
<p>df（disk filesystem 的简称）用于显示 Linux 系统的磁盘利用率。（LCTT 译注：<code>df</code> 可能应该是 disk free 的简称。）</p>
<p>下面是一些例子。</p>
<h4><a href="#1-显示设备名称总块数总磁盘空间已用磁盘空间可用磁盘空间和文件系统上的挂载点"></a>1、 显示设备名称、总块数、总磁盘空间、已用磁盘空间、可用磁盘空间和文件系统上的挂载点。</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> df</span>

</code></pre><p><a href="https://camo.githubusercontent.com/b4844eedbe78d47b1ee0c1b6bbd8685e3e371a2f/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6466312e6a70673f726573697a653d363338253243313537"><img src="http://p0.qhimg.com/t01afae119d34978997.jpg" alt="df command"></a></p>
<h4><a href="#2-人类可读格式的信息"></a>2、 人类可读格式的信息</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> df -h</span>

</code></pre><p><a href="https://camo.githubusercontent.com/8bd00572c0f54b474bfdb202659e2a5619382240/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6466322e6a70673f726573697a653d363431253243313439"><img src="http://p0.qhimg.com/t0126fd1ab87d62f1b5.jpg" alt="df command"></a></p>
<p>上面的命令以人类可读格式显示信息。</p>
<h4><a href="#3-显示特定分区的信息"></a>3、 显示特定分区的信息</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> df -hT /etc</span>

</code></pre><p><a href="https://camo.githubusercontent.com/edfcbb9e7bb466624bdb57e233b471f598039d8a/68747470733a2f2f69302e77702e636f6d2f6c696e7578746563686c61622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30322f6466332d312e6a70673f726573697a653d3633382532433632"><img src="http://p0.qhimg.com/t0190a87dcc51bd27ec.jpg" alt="df command"></a></p>
<p><code>-hT</code> 加上目标目录将以可读格式显示 <code>/etc</code> 的信息。</p>
<p>虽然 <code>du</code> 和 <code>df</code> 命令有更多选项，但是这些例子可以让你初步了解。如果在这里找不到你要找的东西，那么你可以参考有关命令的 man 页面。</p>
<p>另外，<a href="http://linuxtechlab.com/tips-tricks/"><strong>在这</strong></a>阅读我的其他帖子，在那里我分享了一些其他重要和经常使用的 Linux 命令。</p>
<p>如往常一样，欢迎你留下评论和疑问，因此在下面留下你的评论和疑问，我会回复你。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/du-df-commands-examples/">http://linuxtechlab.com/du-df-commands-examples/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">SHUSAIN</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
du 及 df 命令的使用（附带示例）

## 原文链接
[https://www.zcfy.cc/article/use-of-du-df-commands-with-examples](https://www.zcfy.cc/article/use-of-du-df-commands-with-examples)

