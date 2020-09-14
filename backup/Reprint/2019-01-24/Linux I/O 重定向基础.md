---
title: 'Linux I/O 重定向基础' 
date: 2019-01-24 2:30:11
hidden: true
slug: bbpjkucmut
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linux-io-重定向基础"></a>Linux I/O 重定向基础</h1>
<p>Linux 管理的一个最重要并且<a href="http://www.tecmint.com/how-to-setup-and-configure-static-network-routing-in-rhel/">有趣的话题</a>是 I/O 重定向。此功能在命令行中使你能够将命令的输入输出取自或送到文件中，或者可以使用管道将多个命令连接在一起以形成所谓的“<strong>命令管道</strong>”。</p>
<p>我们运行的所有命令基本上产生两种输出：</p>
<ul>
<li>命令结果 - 程序产生的数据，以及</li>
<li>程序状态和错误消息，用来通知用户程序的执行细节。</li>
</ul>
<p>在 Linux 和其他类 Unix 系统中，有三个默认文件（名称如下），这些文件也由 shell 使用文件描述符号标识：</p>
<ul>
<li>stdin 或 0 - 它连接键盘，大多数程序从此文件读取输入。</li>
<li>stdout 或 1 - 它连接屏幕，并且所有程序将其结果发送到此文件</li>
<li>stderr 或 2 - 程序将状态/错误消息发送到此文件，它也连接到屏幕上。</li>
</ul>
<p>因此，I/O 重定向允许你更改命令的输入源以及将输出和错误消息发送到其他地方。这可以通过 <code>&lt;</code> 和 <code>&gt;</code> 重定向操作符来实现。</p>
<h3><a href="#如何在-linux-中重定向标准输出到文件中"></a>如何在 Linux 中重定向标准输出到文件中</h3>
<p>如下面的示例所示，你可以重定向标准输出，这里，我们要存储 <a href="http://www.tecmint.com/12-top-command-examples-in-linux/">top 命令</a>的输出以供以后检查：</p>
<pre><code class="hljs coq">$ <span class="hljs-built_in">top</span> -bn <span class="hljs-number">5</span> &gt;<span class="hljs-built_in">top</span>.log

</code></pre><p>其中标志的含义：</p>
<ul>
<li><code>-b</code> - 让 <code>top</code> 以批处理模式运行，以便你可以将其输出重定向到一个文件或另一个命令。</li>
<li><code>-n</code> - 指定命令终止前的迭代次数。</li>
</ul>
<p>你可以使用 <a href="http://www.tecmint.com/13-basic-cat-command-examples-in-linux/">cat 命令</a>来查看 <code>top.log</code> 文件的内容：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> cat top.<span class="hljs-built-in">log</span>

</code></pre><p>要将命令输出<strong>附加</strong>在文件后面，请使用 <code>&gt;&gt;</code> 操作符。</p>
<p>例如，要将 <a href="http://www.tecmint.com/12-top-command-examples-in-linux/">top 命令</a>的输出追加在上面的 <code>top.log</code> 文件中，特别是在脚本（或命令行）中，请输入下面的那行：</p>
<pre><code class="hljs ruby">$ top -bn <span class="hljs-number">5</span> <span class="hljs-meta">&gt;&gt;</span>top.log

</code></pre><p><strong>注意</strong>： 也可以使用文件描述符数字，上面的重定向命令等同于：</p>
<pre><code class="hljs coq">$ <span class="hljs-built_in">top</span> -bn <span class="hljs-number">5</span> <span class="hljs-number">1</span>&gt;<span class="hljs-built_in">top</span>.log

</code></pre><h3><a href="#如何在-linux-中重定向标准错误到文件中"></a>如何在 Linux 中重定向标准错误到文件中</h3>
<p>要重定向命令的标准错误，你需要明确指定文件描述符 <code>2</code>，以便让 shell 了解你正在尝试做什么。</p>
<p>例如，下面的 <a href="http://www.tecmint.com/tag/linux-ls-command/">ls 命令</a>将在没有 root 权限的普通系统用户执行时产生错误：</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> -l <span class="hljs-string">/root/</span>

</code></pre><p>你可以重定向标准错误到文件中：</p>
<pre><code class="hljs stata">$ <span class="hljs-keyword">ls</span> -<span class="hljs-keyword">l</span> /root/ 2&gt;<span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-built_in">log</span>
$ <span class="hljs-keyword">cat</span> <span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span> 

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Redirect-Standard-Error-in-Linux.png"><img src="https://p5.ssl.qhimg.com/t01cf63ef464b431761.png" alt="Redirect Standard Error to File"></a></p>
<p><em>重定向标准错误到文件中</em></p>
<p>为了将标准错误附加在文件后，使用下面的命令：</p>
<pre><code class="hljs mel">$ <span class="hljs-keyword">ls</span> -l /root/ <span class="hljs-number">2</span>&gt;&gt;<span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span>

</code></pre><h3><a href="#如何重定向标准输出及标准错误到一个文件中"></a>如何重定向标准输出及标准错误到一个文件中</h3>
<p>还可以将命令的所有输出（包括标准输出和标准错误）捕获到单个文件中。这可以用两种可能的方式，通过指定文件描述符来完成：</p>
<p>1、 第一种是相对较旧的方法，其工作方式如下：</p>
<pre><code class="hljs mel">$ <span class="hljs-keyword">ls</span> -l /root/ &gt;<span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span> <span class="hljs-number">2</span>&gt;&amp;<span class="hljs-number">1</span>

</code></pre><p>上面的命令意思是 shell 首先将 <a href="http://www.tecmint.com/15-basic-ls-command-examples-in-linux/">ls 命令</a>的输出发送到文件 <code>ls-error.log</code>（使用 <code>&gt;ls-error.log</code>），然后将所有写到文件描述符 <code>2</code>（标准错误）的错误消息重定向到文件 <code>ls-error.log</code>（使用<code>2&gt;＆1</code>）中。（LCTT 译注：此处原文有误，径改。）这表示标准错误也被发送到与标准输出相同的文件中。</p>
<p>2、 第二种并且更直接的方法是：</p>
<pre><code class="hljs mel">$ <span class="hljs-keyword">ls</span> -l /root/ &amp;&gt;<span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span>

</code></pre><p>你也可以这样将标准输出和标准错误附加到单个文件后：</p>
<pre><code class="hljs mel">$ <span class="hljs-keyword">ls</span> -l /root/ &amp;&gt;&gt;<span class="hljs-keyword">ls</span>-<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span>

</code></pre><h3><a href="#如何将标准输入重定向到文件中"></a>如何将标准输入重定向到文件中</h3>
<p>大多数（如果不是全部）命令从标准输入获得其输入，并且标准输入默认连接到键盘。</p>
<p>要从键盘以外的文件重定向标准输入，请使用 <code>&lt;</code> 操作符，如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> cat &lt;domains.list </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Redirect-Standard-Input-to-File.png"><img src="https://p1.ssl.qhimg.com/t01475744b11b5eb34e.png" alt="Redirect Standard Input to File"></a></p>
<p><em>重定向文件到标准输入中</em></p>
<h3><a href="#如何重定向标准输入输出到文件中"></a>如何重定向标准输入/输出到文件中</h3>
<p>你可以如下在 <a href="http://www.tecmint.com/sort-command-linux/">sort 命令中</a> 同时执行标准输入、标准输出的重定向：</p>
<pre><code class="hljs stylus">$ sort &lt;domains<span class="hljs-selector-class">.list</span> &gt;sort<span class="hljs-selector-class">.output</span>

</code></pre><h3><a href="#如何使用管道进行-io-重定向"></a>如何使用管道进行 I/O 重定向</h3>
<p>要将一个命令的输出重定向为另一个命令的输入，你可以使用管道，这是用于构建复杂操作命令的有力方法。</p>
<p>例如，以下命令将<a href="http://www.tecmint.com/find-recent-modified-files-in-linux/">列出最近修改的前五个文件</a>。</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> ls -<span class="hljs-keyword">lt</span> | head -n <span class="hljs-number">5</span> 

</code></pre><p>选项的意思是：</p>
<ul>
<li><code>-l</code> - 启用长列表格式</li>
<li><code>-t</code> - <a href="http://www.tecmint.com/find-and-sort-files-modification-date-and-time-in-linux/">最新修改的文件</a>首先显示</li>
<li><code>-n</code> - 指定要显示的标题行数</li>
</ul>
<h3><a href="#构建管道的重要命令"></a>构建管道的重要命令</h3>
<p>在这里，我们将简要回顾一下构建命令管道的两个重要命令，它们是：</p>
<p><code>xargs</code> 用于从标准输入构建和执行命令行。下面是使用 <code>xargs</code> 的管道示例，此命令用于<a href="http://www.tecmint.com/copy-file-to-multiple-directories-in-linux/">将文件复制到 Linux 中的多个目录</a>：</p>
<pre><code class="hljs dts">$ echo <span class="hljs-meta-keyword">/home/</span>aaronkilik<span class="hljs-meta-keyword">/test/</span> <span class="hljs-meta-keyword">/home/</span>aaronkilik/tmp | xargs -n <span class="hljs-number">1</span> cp -v <span class="hljs-meta-keyword">/home/</span>aaronkilik<span class="hljs-meta-keyword">/bin/</span>sys_info.sh

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Copy-Files-to-Multiple-Directories.png"><img src="https://p0.ssl.qhimg.com/t01ee78d30eae1230bf.png" alt="Copy Files to Multiple Directories"></a></p>
<p><em>复制文件到多个目录</em></p>
<p>选项含义：</p>
<ul>
<li><code>-n 1</code> - 让 <code>xargs</code> 对每个命令行最多使用一个参数，并发送到 <a href="http://www.tecmint.com/progress-monitor-check-progress-of-linux-commands/">cp命令</a></li>
<li><code>cp</code> - 复制文件</li>
<li><code>-v</code> - <a href="http://www.tecmint.com/monitor-copy-backup-tar-progress-in-linux-using-pv-command/">显示 <code>cp</code> 命令的进度</a>。</li>
</ul>
<p>有关更多的使用选项和信息，请阅读 <code>xargs</code> 手册页：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man xargs </span>

</code></pre><p><code>tee</code> 命令从标准输入读取，并写入到标准输出和文件中。我们可以演示 <code>tee</code> 如何工作：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">"Testing how tee command works"</span> | tee file1 </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/tee-command-example.png"><img src="https://p2.ssl.qhimg.com/t01ae238cf7461c0754.png" alt="tee Command Example"></a></p>
<p><em>tee 命令示例</em></p>
<p><a href="http://www.tecmint.com/linux-file-operations-commands/">文件或文本过滤器</a>通常与管道一起用于<a href="http://www.tecmint.com/linux-file-operations-commands/">有效地操作 Linux 文件</a>，来以强大的方式来处理信息，例如命令的重组输出（这对于<a href="http://www.tecmint.com/linux-performance-monitoring-and-file-system-statistics-reports/">生成有用的 Linux 报告</a>是必不可少的）、修改文件中的文本和其他的 <a href="http://www.tecmint.com/automating-linux-system-administration-tasks/">Linux 系统管理任务</a>。</p>
<p>要了解有关 Linux 过滤器和管道的更多信息，请阅读这篇文章<a href="http://www.tecmint.com/find-top-ip-address-accessing-apache-web-server/">查找前十个访问 Apache 服务器的 IP 地址</a>，这里展示了使用过滤器和管道的一个例子。</p>
<p>在本文中，我们解释了 Linux 中 I/O 重定向的基本原理。请通过下面的反馈栏分享你的想法。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin、web 开发人员，目前是 TecMint 的内容创建者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/linux-io-input-output-redirection-operators/">http://www.tecmint.com/linux-io-input-output-redirection-operators/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Linux I/O 重定向基础

## 原文链接
[https://www.zcfy.cc/article/learn-the-basics-of-how-linux-io-redirection-works](https://www.zcfy.cc/article/learn-the-basics-of-how-linux-io-redirection-works)

