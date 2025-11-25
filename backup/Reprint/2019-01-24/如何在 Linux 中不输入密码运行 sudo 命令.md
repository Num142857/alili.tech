---
title: '如何在 Linux 中不输入密码运行 sudo 命令' 
date: 2019-01-24 2:30:11
hidden: true
slug: y4oaq8zgi4l
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-中不输入密码运行-sudo-命令"></a>如何在 Linux 中不输入密码运行 sudo 命令</h1>
<p>假设你在只有自己使用的计算机上运行 Linux 系统，比如在笔记本电脑上，在每次调用 <strong>sudo</strong> 时需要输入密码，长期下来就会觉得很乏味。因此，在本指南中，我们将描述<a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">如何配置 sudo 命令</a>在运行时而不输入密码。</p>
<p>此设置在 <code>/etc/sudoers</code> 文件中完成，这是使用 <a href="http://www.tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux/">sudo 命令</a>的默认安全策略；在用户权限指定部分。</p>
<p><strong>重要</strong>：在 <code>sudeors</code> 文件中，默认打开的 <code>authenticate</code> 参数用于验证目的。如果设置了它，用户必须通过密码（或其他身份验证方法）进行身份验证，然后才能使用 <code>sudo</code> 运行命令。</p>
<p>但是，可以使用 <code>NOPASSWD</code>（当用户调用 <code>sudo</code> 命令时不需要密码）标记来覆盖此默认值。</p>
<p>配置用户权限的语法如下：</p>
<pre><code class="hljs routeros">user_list <span class="hljs-attribute">host_list</span>=effective_user_list tag_list command_list

</code></pre><p>其中：</p>
<ol>
<li><code>user_list</code> - 用户列表或已经设置的用户别名。</li>
<li><code>host_list</code> - 主机列表或用户可以在其上运行 sudo 的主机别名。</li>
<li><code>effective_user_list</code> - 以该用户或别名运行的用户列表</li>
<li><code>tag_list</code> - 标签列表，如 <code>NOPASSWD</code>。</li>
<li><code>command_list</code> - 用户使用 <code>sudo</code> 运行的命令或命令别名列表。</li>
</ol>
<p>要允许用户（下面的示例中的 <code>aaronkilik</code>）使用 <code>sudo</code> 不输入密码即可运行所有命令，请打开 <code>sudoers</code> 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo visudo</span>

</code></pre><p>添加下面的行：</p>
<pre><code class="hljs ada">aaronkilik <span class="hljs-keyword">ALL</span>=(<span class="hljs-keyword">ALL</span>) NOPASSWD: <span class="hljs-keyword">ALL</span>

</code></pre><p>对于组而言，在组名前面使用 <code>%</code> 字符；这意味着 <code>sys</code> 组的所有成员都可以不用密码使用 <code>sudo</code>。</p>
<pre><code class="hljs ada">%sys <span class="hljs-keyword">ALL</span>=(<span class="hljs-keyword">ALL</span>) NOPASSWD: <span class="hljs-keyword">ALL</span>

</code></pre><p>要允许用户不用密码使用 <code>sudo</code> 运行指定命令（<code>/bin/kill</code>），添加下面的行：</p>
<pre><code class="hljs ada">aaronkilik <span class="hljs-keyword">ALL</span>=(<span class="hljs-keyword">ALL</span>) NOPASSWD: /bin/kill

</code></pre><p>下面的行会让 <code>sys</code> 组成员在使用 <code>sudo</code> 运行命令：<code>/bin/kill</code>、<code>/bin/rm</code> 时不用输入密码：</p>
<pre><code class="hljs armasm">%sys ALL=(ALL) <span class="hljs-keyword">NOPASSWD: </span>/<span class="hljs-keyword">bin/kill, </span>/<span class="hljs-keyword">bin/rm
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Run-sudo-Without-Password.png"><img src="https://p0.ssl.qhimg.com/t0137c3294cfdaaac5d.png" alt="Run sudo Without Password"></a></p>
<p><em>不用密码运行 sudo</em></p>
<p>对于更多的 <code>sudo</code> 配置和其他使用选项，请阅读我们有更多例子描述的文章，：</p>
<ul>
<li><a href="https://linux.cn/article-8145-1.html">在 Linux 中设置 sudo 的十条 sudoers 实用配置</a></li>
<li><a href="https://linux.cn/article-8128-1.html">让 sudo 在你输入错误的密码时“嘲讽”你</a></li>
<li><a href="https://linux.cn/article-8151-1.html">如何在 Linux 中让 sudo 密码会话的超时更长些</a></li>
</ul>
<p>在本篇中，我们讨论了如何配置 sudo 命令来不用输入密码运行。不要忘记在评论栏中给我们提供你关于这份指导的想法和其他对于 Linux 系统管理员有用的 sudoers 配置。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin 及 web 开发者，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/run-sudo-command-without-password-linux/">http://www.tecmint.com/run-sudo-command-without-password-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 中不输入密码运行 sudo 命令

## 原文链接
[https://www.zcfy.cc/article/how-to-run-sudo-command-without-entering-a-password-in-linux](https://www.zcfy.cc/article/how-to-run-sudo-command-without-entering-a-password-in-linux)

