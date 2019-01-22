---
title: '如何在 Linux 启动时自动执行命令或脚本' 
date: 2019-01-23 2:30:08
hidden: true
slug: zszjhdgdy8l
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-linux-启动时自动执行命令或脚本"></a>如何在 Linux 启动时自动执行命令或脚本</h1>
<p>我一直很好奇，在<a href="http://www.tecmint.com/linux-boot-process/">启动 Linux 系统并登录</a>的过程中到底发生了什么事情。按下开机键或启动一个虚拟机，你就启动了一系列事件，之后会进入到一个功能完备的系统中，有时，这个过程不到一分钟。当你注销或者关机时，也是这样。</p>
<p>更有意思的是，在系统启动以及用户登录或注销时，还可以让系统执行特定的操作。</p>
<p>本文，我们将探讨一下在 Linux 操作系统中实现这些目标的传统方法。</p>
<p><strong>注意</strong>：我们假定使用的是 <strong>Bash</strong> 作为登录及注销的主 Shell。如果你使用的是其他 Shell，那么有些方法可能会无效。如果有其他的疑问，请参考对应的 Shell 文档。</p>
<h3><a href="#在启动时执行-linux-脚本"></a>在启动时执行 Linux 脚本</h3>
<p>有两种传统的方法可以实现在启动时执行命令或脚本：</p>
<h4><a href="#方法-1---使用-cron-任务"></a>方法 #1 - 使用 cron 任务</h4>
<p>除了常用格式（分 / 时 / 日 / 月 / 周）外，<a href="http://www.tecmint.com/11-cron-scheduling-task-examples-in-linux/">cron 调度器</a>还支持 <code>@reboot</code> 指令。这个指令后面的参数是脚本（启动时要执行的那个脚本）的绝对路径。</p>
<p>然而，这种方法需要注意两点：</p>
<ul>
<li>a) cron 守护进程必须处于运行状态（通常情况下都会运行），同时</li>
<li>b) 脚本或 crontab 文件必须包含需要的环境变量（如果有的话，参考 StackOverflow 获取更多详细内容）。</li>
</ul>
<h4><a href="#方法-2---使用-etcrcdrclocal"></a>方法 #2 - 使用 /etc/rc.d/rc.local</h4>
<p>这个方法对于 systemd-based 发行版 Linux 同样有效。不过，使用这个方法，需要授予 <code>/etc/rc.d/rc.local</code> 文件执行权限：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> chmod +x /etc/rc.d/rc.local</span>

</code></pre><p>然后在这个文件底部添加脚本。</p>
<p>下图说明如何分别使用 cron 任务和 rc.local 运行两个示例脚本（<code>/home/gacanepa/script1.sh</code> 和 <code>/home/gacanepa/script2.sh</code>）。</p>
<p>script1.sh：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
DATE=$(date +<span class="hljs-string">'%F %H:%M:%S'</span>)
DIR=/home/gacanepa
<span class="hljs-built_in">echo</span> <span class="hljs-string">"Current date and time: <span class="hljs-variable">$DATE</span>"</span> &gt; <span class="hljs-variable">$DIR</span>/file1.txt

</code></pre><p>script2.sh：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
SITE=<span class="hljs-string">"Tecmint.com"</span>
DIR=/home/gacanepa
<span class="hljs-built_in">echo</span> <span class="hljs-string">"<span class="hljs-variable">$SITE</span> rocks... add us to your bookmarks."</span> &gt; <span class="hljs-variable">$DIR</span>/file2.txt

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Run-Linux-Commands-at-Startup.png"><img src="https://p0.ssl.qhimg.com/t01364e3af0d6f10328.png" alt="启动时执行 Linux 脚本"></a></p>
<p><em>启动时执行 Linux 脚本 </em></p>
<p>记住，一定要提前给两个示例脚本授予执行权限：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x /home/gacanepa/script1.sh</span>
<span class="hljs-meta">$</span><span class="bash"> chmod +x /home/gacanepa/script2.sh</span>

</code></pre><h3><a href="#在登录或注销时执行-linux-脚本"></a>在登录或注销时执行 Linux 脚本</h3>
<p>要在登录或注销时执行脚本，分别需要使用 <code>~.bash_profile</code> 和 <code>~.bash_logout</code> 文件。多数情况下，后者需要手动创建。在每个文件的底部，添加调用脚本代码，如前面例中所示，就可以实现这个功能。</p>
<h3><a href="#总结"></a>总结</h3>
<p>本文主要介绍如何在启动、登录以及注销系统时执行脚本。如果你有其他的方法可以补充，请使用下面的评论表给我们指出，我们期待您的回应！</p>
<hr>
<p>作者简介：</p>
<p>Gabriel Cánepa 是 GNU/Linux 系统管理员， 阿根廷圣路易斯 Villa Mercedes 的 web 开发人员。他为一家国际大型消费品公司工作，在日常工作中使用 FOSS 工具以提高生产力，并从中获得极大乐趣。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/auto-execute-linux-scripts-during-reboot-or-startup/">http://www.tecmint.com/auto-execute-linux-scripts-during-reboot-or-startup/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/gacanepa/">Gabriel Cánepa</a> 译者：<a href="https://github.com/zhb127">zhb127</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Linux 启动时自动执行命令或脚本

## 原文链接
[https://www.zcfy.cc/article/how-to-auto-execute-commandsscripts-during-reboot-or-startup](https://www.zcfy.cc/article/how-to-auto-execute-commandsscripts-during-reboot-or-startup)

