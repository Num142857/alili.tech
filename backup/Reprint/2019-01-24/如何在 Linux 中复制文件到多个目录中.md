---
title: '如何在 Linux 中复制文件到多个目录中' 
date: 2019-01-24 2:30:11
hidden: true
slug: zx011c6v3w
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中复制文件到多个目录中"></a>如何在 Linux 中复制文件到多个目录中</h1>
<p><a href="http://www.tecmint.com/free-online-linux-learning-guide-for-beginners/">在学习 Linux 的过程中</a>，对于新手而言总是会使用几个命令来完成一个简单的任务。对正在熟悉使用终端的人这是很容易理解的行为。然而，如果你想要成为一个老手，学习我说的“快捷命令”会显著减少时间浪费。</p>
<p>在本篇中，我们会用一个简单的方法在 Linux 中用一个命令来将目录复制到多个文件夹中。</p>
<p>在 Linux 中，<a href="http://www.tecmint.com/advanced-copy-command-shows-progress-bar-while-copying-files/">cp 命令</a>常被用于从一个文件夹中复制文件到另一个中，最简单的语法如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> cp [options….] <span class="hljs-built_in">source</span>(s) destination</span>

</code></pre><p>另外，你也可以使用<a href="http://www.tecmint.com/advanced-copy-command-shows-progress-bar-while-copying-files/">高级复制命令</a>，它可以在复制<a href="http://www.tecmint.com/find-top-large-directories-and-files-sizes-in-linux/">大的文件或文件夹</a>时显示进度条。</p>
<p>看下下面的命令，通常你会使用两个不同的命令来将相同的文件复制到不同的文件夹中：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> cp -v /home/aaronkilik/bin/sys_info.sh /home/aaronkilik/<span class="hljs-built_in">test</span></span>
<span class="hljs-meta">#</span><span class="bash"> cp -v /home/aaronkilik/bin/sys_info.sh /home/aaronkilik/tmp</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Copy-Files-to-Multiple-Directories.png"><img src="https://p4.ssl.qhimg.com/t01d6939343daf36151.png" alt="Copy Files to Multiple Directories"></a></p>
<p><em>复制文件到多个文件夹中</em></p>
<p>假设你想要复制一个特定文件到 5 个或者更多的文件夹中，这意味着你需要输入 5 次或者更多的cp命令么？</p>
<p>要摆脱这个问题，你可以用 cp 命令与 <a href="http://www.tecmint.com/echo-command-in-linux/">echo命令</a>、管道、xargs 命令一起使用：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> /home/aaronkilik/<span class="hljs-built_in">test</span>/ /home/aaronkilik/tmp | xargs -n 1 cp -v /home/aaronkilik/bin/sys_info.sh</span>

</code></pre><p>上面的命令中，目录的路径（dir1、dir2、dir3...dirN）被管道作为输入到 xargs 命令中，含义是：</p>
<ol>
<li><code>-n 1</code> - 告诉 xargs 命令每个命令行最多使用一个参数，并发送到 cp 命令中。</li>
<li><code>cp</code> – 用于复制文件。</li>
<li><code>-v</code> – 启用详细模式来显示更多复制细节。</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Copy-Files-to-Multiple-Directories-in-Linux.png"><img src="https://p1.ssl.qhimg.com/t01e901a670c35f0f6f.png" alt="Copy File to Multiple Locations in Linux"></a></p>
<p><em>在 Linux 中复制文件到多个位置中</em></p>
<p>试试阅读 <code>cp</code>、 <code>echo</code> 和 <code>xargs</code> 的 man 页面来找出所有有用和高级的用法信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man cp</span>
<span class="hljs-meta">$</span><span class="bash"> man <span class="hljs-built_in">echo</span></span>
<span class="hljs-meta">$</span><span class="bash"> man xargs</span>

</code></pre><p>就是这样了，你可以在下面的评论区给我们发送主题相关的问题或者反馈。你也可以阅读有关 <a href="http://www.tecmint.com/progress-monitor-check-progress-of-linux-commands/">progress 命令</a>来帮助监控运行中的（cp、mv、dd、<a href="http://www.tecmint.com/18-tar-command-examples-in-linux/">tar</a> 等等）的进度。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是一个 Linux 及 F.O.S.S 热衷者，即将成为 Linux 系统管理员、web 开发者，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/copy-file-to-multiple-directories-in-linux/">http://www.tecmint.com/copy-file-to-multiple-directories-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中复制文件到多个目录中

## 原文链接
[https://www.zcfy.cc/article/how-to-copy-a-file-to-multiple-directories-in-linux](https://www.zcfy.cc/article/how-to-copy-a-file-to-multiple-directories-in-linux)

