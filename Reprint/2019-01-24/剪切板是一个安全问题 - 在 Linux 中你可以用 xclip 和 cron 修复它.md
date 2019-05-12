---
title: '剪切板是一个安全问题 - 在 Linux 中你可以用 xclip 和 cron 修复它' 
date: 2019-01-24 2:30:11
hidden: true
slug: sulna3u7o4
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#剪切板是一个安全问题---在-linux-中你可以用-xclip-和-cron-修复它"></a>剪切板是一个安全问题 - 在 Linux 中你可以用 xclip 和 cron 修复它</h1>
<p><strong>更新：我原文推荐的是 xsel，但几个用户报告说它禁用了他们的声音。这对我来说不是问题，但我发现了另一种方式（使用 <a href="https://github.com/astrand/xclip">xclip</a> ）来实现同样的目标，这样应该就能回避这个问题。文章已更新，切换到了 xclip。</strong></p>
<p>在你的操作系统上复制/粘贴的能力是必不可少的。无论你写的是代码还是剧本，这两个功能是在计算机上处理文本的核心。当你复制文本时，它会进入内存驻留的剪贴板。除非安装了可以容纳多个条目的剪贴板管理器，否则剪贴板默认情况下只会处理一个_复制<em>事件，当你</em>复制_其他东西的时候，它之前的条目才会消失。在标准 Linux 设置中，剪贴板内容存储在控制它的程序的内存中（通常是 Xorg）。</p>
<p>剪贴板应该有所限制，因为任何程序都可以读取其内容，如果放任它，它保存的东西就会一直呆在那里。此外，现代浏览器允许恶意网站以多种方式从剪贴板读取（和写入）。</p>
<p>虽然不是默认设置，但浏览器可以设置为禁止访问剪贴板。虽然也有用于浏览器和操作系统管理剪贴板的附加组件，但是，在此链条的源头解决问题更容易、更可靠，并使系统范围内的剪贴板安全。有很多理由使用一个剪贴板，但没有足够的理由让内容在那里保留一两分钟以上。</p>
<p>密码管理器最近变得很受欢迎，如果你使用过的话，你已经了解了它们如何将密码复制到剪贴板，以便你可以将其粘贴到浏览器中，并登录到你的帐户。接下来会发生什么？你的密码会保留在剪贴板上，直到另一个复制事件或重新启动。</p>
<p>即使你使用单独的浏览器来处理银行等事务，复制密码时，通过剪贴板会将其带回其他浏览器，并将其暴露在基于 web 的剪贴板收集技术中。</p>
<p>我的解决方案是在后台进行处理，每分钟自动清除剪贴板的内容。它使用 xclip 这个命令行工具、一个小脚本和 <a href="https://en.wikipedia.org/wiki/Cron">cron</a>。cron 的一分钟间隔给你足够的时间来复制密码，然后它会清空剪贴板。此动作会每分钟执行一次，保证复制无忧。</p>
<p>我们需要使用 <a href="https://github.com/astrand/xclip">xclip</a> 工具清除终端中的剪贴板。在基于 apt 的发行版中，输入：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install xclip

</code></pre><p>我们在终端中测试一下程序。首先从某处复制一些文字，复制到其他地方，并输入这两条命令：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">touch</span> <span class="hljs-keyword">blank
</span><span class="hljs-symbol">xclip</span> -<span class="hljs-keyword">selection </span>clipboard <span class="hljs-keyword">blank
</span>
</code></pre><p>接着再次尝试复制文本 - 它应该就会消失了。现在把这个命令放在脚本中。创建一个脚本（用你的文本编辑器代替 leafpad）：</p>
<pre><code class="hljs stylus">leafpad nukeclipboard<span class="hljs-selector-class">.sh</span>

</code></pre><p>并在新文件中输入下面的内容：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh</span>
touch blank &amp;&amp; xclip -selection clipboard blank

</code></pre><p>保存并关闭文件，接着加上可执行权限：</p>
<pre><code class="hljs stylus">chmod +x nukeclipboard<span class="hljs-selector-class">.sh</span>

</code></pre><p>现在让 cron 任务每分钟运行一次。首先要小心，不同的发行版有不同的 cron 选项。以下设置适用于 Ubuntu（基于）的发行版，并且在你的发行版中过程可能不同，因此<a href="https://en.wikipedia.org/wiki/Cron">请阅读手册</a>。</p>
<p>要设置 cron 任务，请在终端输入：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">crontab -e</span>

</code></pre><p>在最后被注释掉的行后，输入下面的行（将 <code>/home/user/</code> 替换为你的脚本位置）：</p>
<pre><code class="hljs routeros">* * * * * <span class="hljs-builtin-name">export</span> <span class="hljs-attribute">DISPLAY</span>=:0 &amp;&amp; /home/user/nukeclipboard.sh

</code></pre><p>现在按下 <code>ctrl-o</code> 保存（使用你的 cron 任务编辑器的保存快捷键），然后点击回车保存你的 crontab。最后，按下 <code>ctrl-x</code> 退出程序。从现在起，你的剪贴板的使用寿命为一分钟。</p>
<p>关于上面的 cron 条目的解释： cron 有环境变量的限制，当它失败时，你可能要花一整天试着一百种方法来解决它。在我找到了一个建议设置 DISPLAY 的<a href="https://stackoverflow.com/questions/14296911/when-linux-system-calls-scripts-some-commands-dont-work-cron-if-up-d/24070707#24070707">快速修复</a> 后，就解决了。感谢 <a href="https://stackoverflow.com/users/1618630/mike-q">Mike Q</a> 的贡献。</p>
<p>现在，可能会发生当你要粘贴复制的东西时，正好剪贴板被清空，从而无法粘贴，但它只是安全的一个小的代价。 如果这是一个问题，您可以配置 cron 以任何适合您的间隔运行任务（比如 2 分钟）。 Ubuntu 的说明在[此] <a href="https://help.ubuntu.com/community/CronHowto">7</a>页。</p>
<p>我希望这个教程能帮助你把剪贴板锁定下来 - 如果你有可以工作的脚本或者更好的方法，欢迎来做评论。</p>
<hr>
<p>via: <a href="https://www.darrentoback.com/your-computer-s-clipboard-is-a-security-problem-fix-it-in-linux-with-xsel-and-cron">https://www.darrentoback.com/your-computer-s-clipboard-is-a-security-problem-fix-it-in-linux-with-xsel-and-cron</a></p>
<p>作者：<a href="https://www.darrentoback.com/about-me">dmt</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
剪切板是一个安全问题 - 在 Linux 中你可以用 xclip 和 cron 修复它

## 原文链接
[https://www.zcfy.cc/article/your-computers-clipboard-is-a-security-problem-fix-it-in-linux-with-xsel-and-cron](https://www.zcfy.cc/article/your-computers-clipboard-is-a-security-problem-fix-it-in-linux-with-xsel-and-cron)

