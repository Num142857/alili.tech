---
title: '使用 Yum 历史查找已安装或已删除的软件包信息' 
date: 2019-01-23 2:30:08
hidden: true
slug: wblbqe927yn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-yum-历史查找已安装或已删除的软件包信息"></a>使用 Yum 历史查找已安装或已删除的软件包信息</h1>
<p><a href="http://www.tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement/">Yum</a> 是 RHEL/CentOS 的一个基于 rpm 的交互式高级包管理器，用户可以用它来安装新的软件包、卸载或清除旧的/不需要的软件包。它可以<a href="http://www.tecmint.com/auto-install-security-patches-updates-on-centos-rhel/">自动运行系统更新</a>，并执行依赖分析，对已安装的或可用的软件包进行查询等等。</p>
<p>在本文中，我们将解释如何查看 Yum 事务的历史记录，以便于了解有关安装的软件包以及从系统中所卸载/清除软件包的信息。</p>
<p><strong>推荐阅读：</strong> <a href="http://www.tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement/">20 条关于 Linux 软件包管理的 Yum 命令</a></p>
<p>以下是一些如何使用 Yum 历史命令的示例。</p>
<h3><a href="#查看完整的-yum-历史"></a>查看完整的 Yum 历史</h3>
<p>要查看 Yum 事务完整的历史记录，我们可以运行以下命令，然后将显示：事务 ID、执行特定操作的用户、操作发生的日期和时间、实际操作以及任何错误的附加信息与操作：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/View-Yum-History.png"><img src="https://p0.ssl.qhimg.com/t01638e5e55b8db235f.png" alt="查看 Yum 历史"></a></p>
<h3><a href="#使用-yum-查找软件包信息"></a>使用 Yum 查找软件包信息</h3>
<p><code>history</code> 的子命令：<code>info</code>/<code>list</code>/<code>summary</code> 可以将事务 ID 或包名作为参数。此外，<code>list</code> 子命令可以加上特殊的参数，<code>all</code> 表示所有的事务。</p>
<p>运行以下命令查看先前的历史：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> list all</span>

</code></pre><p>并且，你可以使用下面的 <code>info</code> 命令查看涉及指定软件包的事务详情，例如 <code>httpd</code>：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> info httpd</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Yum-Find-Package-Info.png"><img src="https://p1.ssl.qhimg.com/t014fc6c4d4ae41d16c.png" alt="Yum - 查找软件包信息"></a></p>
<p>发出以下命令可以获得包含 <code>httpd</code> 软件包的事务的摘要：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> summary httpd</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Yum-Find-Summary-of-Package.png"><img src="https://p3.ssl.qhimg.com/t017ed65a6f69b06e36.png" alt="Yum - 查找软件包的摘要"></a></p>
<p>还可以使用事务的 ID 来查找，以下命令会显示 ID 为 <code>15</code> 的事务的详情。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> info 15</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Find-Package-Info-Using-ID.png"><img src="https://p2.ssl.qhimg.com/t01d97e16e0ad1df64a.png" alt="Yum - 使用 ID 查找软件包信息"></a></p>
<h3><a href="#使用-yum-history-查找软件包事务信息"></a>使用 yum history 查找软件包事务信息</h3>
<p>有一些用于打印某个或多个软件包事务详情的子命令。我们可以使用 <code>package-list</code> 或 <code>package_info</code> 查看关于 <code>httpd</code> 的更多信息，例如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> package-list httpd</span>
或
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> package-info httpd</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Find-Package-Transaction-Info.png"><img src="https://p3.ssl.qhimg.com/t01b1c3486da327be86.png" alt="Yum - 查找软件包事务信息"></a></p>
<p>要得到多个软件包的记录，我们可以运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> package-list httpd epel-release</span>
或
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> packages-list httpd epel-release</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Find-Multiple-Package-Info.png"><img src="https://p1.ssl.qhimg.com/t0104080954ba820af9.png" alt="Yum - 查找多个软件包的信息"></a></p>
<h3><a href="#使用-yum-回滚软件包"></a>使用 Yum 回滚软件包</h3>
<p>此外，还有一些 <code>history</code> 的子命令可以让我们撤销/重做/回滚事务。</p>
<ol>
<li><code>undo</code> - 会撤销一个指定的事务。</li>
<li><code>redo</code> - 重复一次指定的事务。</li>
<li><code>rollback</code> - 撤销指定事务之后的所有事务。</li>
</ol>
<p>它们采用单个事务 id 或关键字 <code>last</code> 和从最后一个事务开始的偏移量。</p>
<p>例如，假设我们已经做了 60 个事务，<code>last</code> 是指事务 60，<code>last-4</code> 指向事务 56。</p>
<p><strong>推荐阅读：</strong> <a href="http://www.tecmint.com/linux-yum-package-management-with-yum-utils/">怎样使用 <code>yum-utils</code> 来维护以及加速 Yum</a></p>
<p>以上子命令是如下工作的：如果我们有 5 个事务——V，W，X，Y 和 Z，其中分别是安装各个软件包的。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> undo 2    <span class="hljs-comment">#将删除软件包 W</span></span>
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> redo 2    <span class="hljs-comment">#将重新安装软件包 W</span></span>
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> rollback 2    <span class="hljs-comment">#将删除软件包 X、 Y 和 Z</span></span>

</code></pre><p>在下面的示例中，事务 2 是一个更新操作，如下所示，以下 <code>redo</code> 命令将重复事务 2 直到所有软件包到更新到当前时间的最新版本：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> | grep -w <span class="hljs-string">"2"</span></span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Find-Yum-Package-Transaction-ID.png"><img src="https://p5.ssl.qhimg.com/t01c934122ef2bbd532.png" alt="Yum - 查找软件包事务的 ID"></a></p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> redo 2</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Yum-Redo-Package-Update.png"><img src="https://p2.ssl.qhimg.com/t0161eb54bd09b62562.png" alt="用 Yum 重新更新软件包"></a></p>
<p><code>redo</code> 子命令同样可以在我们指定事务之前加上一些可选的参数：</p>
<ol>
<li><code>force-reinstall</code> - 重新安装所有在此事务中安装的软件包（通过 <code>yum install</code>、<code>upgrade</code> 或 <code>downgrade</code>）。</li>
<li><code>force-remove</code> - 移除所有已经更新或回滚的软件包。</li>
</ol>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> redo force-reinstall 16</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Yum-Force-Install-Package.png"><img src="https://p1.ssl.qhimg.com/t015d28bfc533001996.png" alt="Yum - 强制安装软件包"></a></p>
<h3><a href="#查找-yum-历史数据库和来源信息"></a>查找 Yum 历史数据库和来源信息</h3>
<p>这些子命令为我们提供有关历史记录数据库和其它信息来源的信息：</p>
<ol>
<li><code>addon-info</code> - 提供更多的信息来源。</li>
<li><code>stats</code> - 显示当前历史数据库的统计信息。</li>
<li><code>sync</code> - 使我们能够更改为所有已安装软件包存储的 <code>rpmdb</code>/<code>yumdb</code> 数据。</li>
</ol>
<p>看一下以下的命令的子命令实际上是怎样工作的：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> addon-info</span>
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> stats</span>
<span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> sync</span>

</code></pre><p>使用 <code>new</code> 子命令设置新的历史文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> yum <span class="hljs-built_in">history</span> new</span>

</code></pre><p>我们可以在 yum 手册页找到关于 Yum <code>history</code> 命令和其它几个命令的完整信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> man yum</span>

</code></pre><p><strong>推荐阅读：</strong> <a href="http://www.tecmint.com/yum-lock-disable-blacklist-certain-package-update-version/">4 个使用 Yum 禁用/锁定某些软件包更新的方法</a></p>
<p>就是这么多了。在本篇指南中，我们介绍了各种 Yum <code>history</code> 命令，以查看 Yum 事务的详细信息。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 的爱好者，目前任 TecMint 的作者，志向是一名 Linux 系统管理员、web 开发者。他喜欢用电脑工作，并热衷于分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/view-yum-history-to-find-packages-info/">http://www.tecmint.com/view-yum-history-to-find-packages-info/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/OneNewLife">OneNewLife</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Yum 历史查找已安装或已删除的软件包信息

## 原文链接
[https://www.zcfy.cc/article/how-to-use-yum-history-to-find-out-installed-or-removed-packages-info](https://www.zcfy.cc/article/how-to-use-yum-history-to-find-out-installed-or-removed-packages-info)

