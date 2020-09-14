---
title: '怎么使用 Diff 和 Meld 工具发现两个目录间的不同之处' 
date: 2019-01-22 2:30:08
hidden: true
slug: uve8csz5yro
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#怎么使用-diff-和-meld-工具发现两个目录间的不同之处"></a>怎么使用 Diff 和 Meld 工具发现两个目录间的不同之处</h1>
<p>在之前的一篇文章里，我们回顾了 <a href="http://www.tecmint.com/best-linux-file-diff-tools-comparison/">Linux 下 9 个最好的文件比较工具</a>，本篇文章中，我们将会描述在 Linux 下怎样找到两个目录之间的不同。</p>
<p>一般情况下，要在 Linux 下比较两个文件，我们会使用 <code>diff</code> （一个简单的源自 Unix 的命令行工具）来显示两个计算机文件的不同；它一行一行的去比较文件，而且很方便使用，在几乎全部的 Linux 发行版都预装了。</p>
<p>问题是在 Linux 下我们怎么才能比较两个目录？现在，我们想知道两个目录中哪些文件/子目录是共有的，哪些只存在一个于目录。</p>
<p>运行 diff 常规的语法如下：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> diff [<span class="hljs-keyword">OPTION</span>]… <span class="hljs-keyword">FILES</span>
<span class="hljs-symbol">$</span> diff <span class="hljs-keyword">options</span> dir1 dir2 

</code></pre><p>默认情况下，输出是按文件/子文件夹的文件名的字母排序的，如下面截图所示，在命令中， <code>-q</code> 开关是告诉 <code>diif</code> 只有在文件有差异时报告。</p>
<pre><code class="hljs maxima">$ <span class="hljs-built_in">diff</span> -q <span class="hljs-built_in">directory</span>-<span class="hljs-number">1</span>/ <span class="hljs-built_in">directory</span>-<span class="hljs-number">2</span>/

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/05/Difference-Between-Two-Directories.png"><img src="" alt="Difference Between Two Directories"></a></p>
<p><em>两个文件夹之间的差异</em></p>
<p>再次运行 <code>diff</code> 并不能进入子文件夹，但是我们可以使用 <code>-r</code> 开关来读子文件夹，如下所示。</p>
<pre><code class="hljs maxima">$ <span class="hljs-built_in">diff</span> -qr <span class="hljs-built_in">directory</span>-<span class="hljs-number">1</span>/ <span class="hljs-built_in">directory</span>-<span class="hljs-number">2</span>/ 

</code></pre><h3><a href="#使用-meld-可视化比较和合并工具"></a>使用 Meld 可视化比较和合并工具</h3>
<p><code>meld</code> 是一个很酷的图形化工具（一个 GNOME 桌面下的可视化的比较和合并工具），可供那些喜欢使用鼠标的人使用，可按如下来安装。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install meld  [Debian/Ubuntu systems]</span>
<span class="hljs-meta">$</span><span class="bash"> sudo yum install meld  [RHEL/CentOS systems]</span>
<span class="hljs-meta">$</span><span class="bash"> sudo dnf install meld  [Fedora 22+]</span>

</code></pre><p>一旦你安装了它之后，在 <strong>Ubuntu Dash</strong> 或者 <strong>Linux Mint</strong> 菜单搜索 “<strong>meld</strong>” ，或者 Fedora 或 CentOS 桌面的 Activities Overview，然后启动它。</p>
<p>你可以看到如下的 Meld 界面，可以选择文件或者文件夹来比较，此外还有版本控制视图。点击目录比较并移动到下个界面。 <a href="http://www.tecmint.com/wp-content/uploads/2017/05/Meld-Comparison-Tool.png"><img src="https://p0.ssl.qhimg.com/t0139bc299611783d30.png" alt="Meld Comparison Tool"></a></p>
<p><em>Meld 比较工具</em></p>
<p>选择你想要比较的文件夹，注意你可以勾选 “<strong>3-way Comparison</strong>” 选项，添加第三个文件夹。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/05/Select-Comparison-Directories.png"><img src="https://p0.ssl.qhimg.com/t0167dcacf0035a37dc.png" alt="Select Comparison Directories"></a></p>
<p><em>选择比较的文件夹</em></p>
<p>选择好要比较的文件夹后，点击 “Compare”。 <a href="http://www.tecmint.com/wp-content/uploads/2017/05/Listing-Difference-Between-Directories.png"><img src="https://p0.ssl.qhimg.com/t0169d9fd5fc990c4e5.png" alt="Listing Difference Between +"></a></p>
<p><em>文件夹不同列表</em></p>
<p>在这篇文章中，我们描述了怎么在 Linux 下找到两个文件夹的不同。如果你知道其他的命令或者图形界面工具，不要忘记在下方评论分享你们的想法。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一个 Linux 和 F.O.S.S 爱好者，即将成为 Linux 系统管理员，Web 开发者，目前是 TecMint 的内容创建者，他喜欢使用电脑工作，并且非常相信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/compare-find-difference-between-two-directories-in-linux/">http://www.tecmint.com/compare-find-difference-between-two-directories-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/hkurj">hkurj</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎么使用 Diff 和 Meld 工具发现两个目录间的不同之处

## 原文链接
[https://www.zcfy.cc/article/how-to-find-difference-between-two-directories-using-diff-and-meld-tools](https://www.zcfy.cc/article/how-to-find-difference-between-two-directories-using-diff-and-meld-tools)

