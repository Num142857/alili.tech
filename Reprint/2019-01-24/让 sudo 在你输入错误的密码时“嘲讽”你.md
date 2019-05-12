---
title: '让 sudo 在你输入错误的密码时“嘲讽”你' 
date: 2019-01-24 2:30:11
hidden: true
slug: 3ivg0ddae6n
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#让-sudo-在你输入错误的密码时嘲讽你"></a>让 sudo 在你输入错误的密码时“嘲讽”你</h1>
<p><strong>sudoers</strong> 是 Linux 中的默认 sudo 安全策略插件，但是经验丰富的系统管理员可以自定义安全策略以及输入输出日志记录的插件。它由 <code>/etc/sudoers</code> 这个文件驱动，或者也可在 LDAP 中。</p>
<p>你可以在上面的文件中定义 <strong>sudoers</strong> 嘲讽insults 或其他选项。它在 <code>defaults</code> 部分下设置。请阅读我们的上一篇文章<a href="http://www.tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/">在 Linux 中设置 <code>sudo</code> 时 10 个有用的 sudoers 配置</a>。</p>
<p>在本文中，我们将解释一个 sudoers 配置参数，以允许个人或系统管理员设置 <a href="http://www.tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux/">sudo 命令</a>，当系统用户输入错误密码时“嘲讽”他们。</p>
<p>首先打开文件 <code>/etc/sudoers</code>，如下所示：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo visudo</span>

</code></pre><p>进入 <code>defaults</code> 部分，并添加下面的行：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">Defaults   insults</span>

</code></pre><p>下面是我系统中 <code>/etc/sudoers</code> 默认展示的 <code>defaults</code> 部分。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Set-sudo-Insults-Parameter.png"><img src="https://p1.ssl.qhimg.com/t0199e026a8cc91d6ac.png" alt="Set sudo Insults Parameter"></a></p>
<p><em>设置 sudo insults 参数</em></p>
<p>从上面的截图中，你可以看到 <code>defaults</code> 中还有许多其他默认值定义，例如，每次用户输入错误的密码时发送邮件到 root、设置安全路径、配置自定义 sudo 日志文件等。</p>
<p>保存并关闭文件。</p>
<p>运行 <code>sudo</code> 命令并输入错误的密码，然后观察 insults 选项是如何工作的：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo visudo</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/How-sudo-Insult-Works.png"><img src="https://p4.ssl.qhimg.com/t01198981d19dd2a4a7.png" alt="sudo Insult in Action"></a></p>
<p><em>实践 sudo insult</em></p>
<p><strong>注意</strong>：当配置 insults 参数时，它会禁用 <code>badpass_message</code> 参数，该参数在用户输入错误的密码时，会在命令行中输出特定的消息（默认消息为 “<strong>sorry, try again</strong>”）。</p>
<p>要修改该消息，请将 <code>badpass_message</code> 参数添加到 <code>/etc/sudoers</code> 文件中，如下所示。</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">Defaults</span>  badpass_message=<span class="hljs-string">"Password is wrong, please try again"</span>  <span class="hljs-comment">#try to set a message of your own</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/Set-sudo-badpassword-Message.png"><img src="https://p3.ssl.qhimg.com/t01b2c56212771ff96b.png" alt="Set sudo badpassword Message"></a></p>
<p><em>设置 sudo 错误密码消息</em></p>
<p>保存并关闭文件，然后调用 <code>sudo</code> 查看它是如何工作的，你设置的 <code>badpass_message</code> 消息会在每次你或任何系统用户输入错误的密码的时候打印出来。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo visudo</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/01/sudo-badpassword-Message.png"><img src="https://p5.ssl.qhimg.com/t016d9a2af5dcc220b2.png" alt="Sudo badpassword Message"></a></p>
<p><em>sudo 密码错误消息</em></p>
<p>就是这样了，在本文中，我们回顾了如何在用户输入错误的密码时将 <code>sudo</code> 设置为显示嘲讽。请通过下面的评论栏分享你的想法。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin、web 开发人员，目前是 TecMint 的内容创建者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/sudo-insult-when-enter-wrong-password/">http://www.tecmint.com/sudo-insult-when-enter-wrong-password/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让 sudo 在你输入错误的密码时“嘲讽”你

## 原文链接
[https://www.zcfy.cc/article/let-sudo-insult-you-when-you-enter-incorrect-password](https://www.zcfy.cc/article/let-sudo-insult-you-when-you-enter-incorrect-password)

