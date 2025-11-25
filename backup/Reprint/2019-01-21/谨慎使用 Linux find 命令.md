---
title: '谨慎使用 Linux find 命令' 
date: 2019-01-21 2:30:06
hidden: true
slug: dohrzqvt4je
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#谨慎使用-linux-find-命令"></a>谨慎使用 Linux find 命令</h1>
<blockquote>
<p>当使用 Linux 下的 find 命令时，请使用 -ok 选项来避免文件被意外删除，这个选项会在移除任何文件之前都会请求你的许可。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/94b6502543ba7c45429a1f868f04e4d6d8c57e46/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031372f31302f63617574696f6e2d7369676e2d3130303733383838342d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01dd52a8ef652e82c3.jpg" alt=""></a></p>
<p>最近有朋友提醒我有一个有用的选项来更加谨慎地运行 <code>find</code> 命令，它就是 <code>-ok</code>。除了一个重要的区别之外，它的工作方式与 <code>-exec</code> 相似，它使 <code>find</code> 命令在执行指定的操作之前请求权限。</p>
<p>这有一个例子。如果你使用 <code>find</code> 命令查找文件并删除它们，你可能使用的是下面的命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> find . -name runme -<span class="hljs-built_in">exec</span> rm {} \;</span>

</code></pre><p>在当前目录及其子目录中中任何名为 “runme” 的文件都将被立即删除 —— 当然，你要有权限删除它们。改用 <code>-ok</code> 选项，你会看到类似这样的东西，但 <code>find</code> 命令将在删除文件之前会请求权限。回答 <code>y</code> 代表 “yes” 将允许 <code>find</code> 命令继续并逐个删除文件。</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">find</span> . -name runme -ok rm {} \;
&lt; rm <span class="hljs-built_in">..</span>. ./bin/runme &gt; ?

</code></pre><h3><a href="#-execdir-命令也是一个选择"></a>-execdir 命令也是一个选择</h3>
<p>另一个可以用来修改 <code>find</code> 命令行为，并可能使其更可控的选项是 <code>-execdir</code> 。<code>-exec</code> 会运行指定的任何命令，而 <code>-execdir 则从文件所在的目录运行指定的命令，而不是在运行</code>find` 命令的目录运行指定的命令。这是两个它的例子：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">pwd</span></span>
/home/shs
<span class="hljs-meta">$</span><span class="bash"> find . -name runme -execdir <span class="hljs-built_in">pwd</span> \;</span>
/home/shs/bin

</code></pre><pre><code class="hljs stata">$ find . -name runme -execdir <span class="hljs-keyword">ls</span> \;
<span class="hljs-keyword">ls</span> <span class="hljs-keyword">rm</span> runme

</code></pre><p>到现在为止还挺好。但要记住的是，<code>-execdir</code> 也会在匹配文件的目录中执行该命令。如果运行下面的命令，并且目录包含一个名为 “ls” 的文件，那么即使该文件_没有_执行权限，它也将运行该文件。使用 <code>-exec</code> 或 <code>-execdir</code> 类似于通过 <code>source</code> 来运行命令。</p>
<pre><code class="hljs gradle">$ <span class="hljs-keyword">find</span> . -name runme -execdir ls \;
Running the <span class="hljs-regexp">/home/</span>shs<span class="hljs-regexp">/bin/</span>ls <span class="hljs-keyword">file</span>

</code></pre><pre><code class="hljs stata">$ find . -name runme -execdir <span class="hljs-keyword">rm</span> {} \;
This is <span class="hljs-keyword">an</span> imposter <span class="hljs-keyword">rm</span> command

</code></pre><pre><code class="hljs tap">$ ls -l bin
total 12
-r-x------<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 25 </span>Oct<span class="hljs-number"> 13 </span>18:12 ls
-rwxr-x---<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 36 </span>Oct<span class="hljs-number"> 13 </span>18:29 rm
-rw-rw-r--<span class="hljs-number"> 1 </span>shs shs<span class="hljs-number"> 28 </span>Oct<span class="hljs-number"> 13 </span>18:55 runme

</code></pre><pre><code class="hljs stata">$ <span class="hljs-keyword">cat</span> bin/<span class="hljs-keyword">ls</span>
echo Running the <span class="hljs-variable">$0</span> <span class="hljs-keyword">file</span>
$ <span class="hljs-keyword">cat</span> bin/<span class="hljs-keyword">rm</span>
echo This is <span class="hljs-keyword">an</span> imposter <span class="hljs-keyword">rm</span> command

</code></pre><h3><a href="#-okdir-选项也会请求权限"></a>-okdir 选项也会请求权限</h3>
<p>要更谨慎，可以使用 <code>-okdir</code> 选项。类似 <code>-ok</code>，该选项将请求权限来运行该命令。</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">find</span> . -name runme -okdir rm {} \;
&lt; rm <span class="hljs-built_in">..</span>. ./bin/runme &gt; ?

</code></pre><p>你也可以小心地指定你想用的命令的完整路径，以避免像上面那样的冒牌命令出现的任何问题。</p>
<pre><code class="hljs dts">$ find . -name runme -execdir <span class="hljs-meta-keyword">/bin/</span><span class="hljs-class">rm </span>{} \;

</code></pre><p><code>find</code> 命令除了默认打印之外还有很多选项，有些可以使你的文件搜索更精确，但谨慎一点总是好的。</p>
<p>在 <a href="https://www.facebook.com/NetworkWorld/">Facebook</a> 和 <a href="https://www.linkedin.com/company/network-world">LinkedIn</a> 上加入 Network World 社区来进行评论。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3233305/linux/using-the-linux-find-command-with-caution.html">https://www.networkworld.com/article/3233305/linux/using-the-linux-find-command-with-caution.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/locez">Locez</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谨慎使用 Linux find 命令

## 原文链接
[https://www.zcfy.cc/article/using-the-linux-find-command-with-caution](https://www.zcfy.cc/article/using-the-linux-find-command-with-caution)

