---
title: '什么是 Linux “oops”？' 
date: 2019-01-20 2:30:11
hidden: true
slug: 9ywienopgw
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#什么是-linux-oops"></a>什么是 Linux “oops”？</h1>
<blockquote>
<p>Linux 内核正在盯着你，当它检测到系统上运行的某些东西违反了正常内核行为时，它会关闭系统并发出一个“oops”！</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/d36d8209d8e9ebf70d2982849eae0ed447fb287c/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30322f62726f6b656e2d77696e652d676c6173732d3130303734393430342d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t010f094f42dfc39338.jpg" alt=""></a></p>
<p>如果你检查你的 Linux 系统上运行的进程，你可能会对一个叫做 “kerneloops” 的进程感到好奇。提示一下，它是 “kernel oops”，而不是 “kerne loops”。</p>
<p>坦率地说，“oops” 是 Linux 内核的一部分出现了偏差行为。你有做错了什么吗？可能没有。但有一些不对劲。而那个做了错事的进程可能已经被 CPU 结束。最糟糕的是，内核可能会报错并突然关闭系统。</p>
<p>请注意，“oops” 不是首字母缩略词。它不代表像“面向对象的编程和系统object-oriented programming and systems” 或“超出程序规范out of procedural specs” 之类的东西。它实际上就是“哎呀” （oops），就像你刚掉下一杯酒或踩在你的猫身上。哎呀！ “oops” 的复数是 “oopses”。</p>
<p>oops 意味着系统上运行的某些东西违反了内核有关正确行为的规则。也许代码尝试采取不允许的代码路径或使用无效指针。不管它是什么，内核 —— 总是在监测进程的错误行为 —— 很可能会阻止特定进程，并将它做了什么的消息写入控制台、 <code>/var/log/dmesg</code> 或 <code>/var/log/kern.log</code> 中。</p>
<p>oops 可能是由内核本身引起的，也可能是某些进程试图让内核违反在系统上能做的事以及它们被允许做的事。</p>
<p>oops 将生成一个崩溃签名crash signature，这可以帮助内核开发人员找出错误并提高代码质量。</p>
<p>系统上运行的 kerneloops 进程可能如下所示：</p>
<pre><code class="hljs groovy">kernoops <span class="hljs-number">881</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span> Feb11 ? 00:<span class="hljs-number">00</span>:<span class="hljs-number">01</span> <span class="hljs-regexp">/usr/</span>sbin/kerneloops

</code></pre><p>你可能会注意到该进程不是由 root 运行的，而是由名为 “kernoops” 的用户运行的，并且它的运行时间极少。实际上，分配给这个特定用户的唯一任务是运行 kerneloops。</p>
<pre><code class="hljs routeros">$ sudo grep kernoops /etc/passwd
kernoops:x:113:65534:Kernel Oops<span class="hljs-built_in"> Tracking </span>Daemon,,,:/:/bin/<span class="hljs-literal">false</span>

</code></pre><p>如果你的 Linux 系统不带有 kerneloops（比如 Debian），你可以考虑添加它。查看这个 <a href="https://packages.debian.org/stretch/kerneloops">Debian 页面</a>了解更多信息。</p>
<h3><a href="#什么时候应该关注-oops"></a>什么时候应该关注 oops？</h3>
<p>一般 oops 没什么大不了的。它在一定程度上取决于特定进程所扮演的角色。它也取决于 oops 的类别。</p>
<p>有些 oops 很严重，会导致系统恐慌system panic。从技术上讲，系统恐慌是 oops 的一个子集（即更严重的 oops）。当内核检测到的问题足够严重以至于内核认为它（内核）必须立即停止运行以防止数据丢失或对系统造成其他损害时会出现。因此，系统需要暂停并重新启动，以防止任何不一致导致不可用或不可靠。所以系统恐慌实际上是为了保护自己免受不可挽回的损害。</p>
<p>总之，所有的内核恐慌都是 oops，但并不是所有的 oops 都是内核恐慌。</p>
<p><code>/var/log/kern.log</code> 和相关的轮转日志（<code>/var/log/kern.log.1</code>、<code>/var/log/kern.log.2</code> 等）包含由内核生成并由 syslog 处理的日志。</p>
<p>kerneloops 程序收集并默认将错误信息提交到 <a href="http://oops.kernel.org/">http://oops.kernel.org/</a>，在那里它会被分析并呈现给内核开发者。此进程的配置详细信息在 <code>/etc/kerneloops.conf</code> 文件中指定。你可以使用下面的命令轻松查看设置：</p>
<pre><code class="hljs vim">$ sudo <span class="hljs-keyword">cat</span> /etc/kerneloops.<span class="hljs-keyword">conf</span> | <span class="hljs-keyword">grep</span> -v ^# | <span class="hljs-keyword">grep</span> -v ^$
[sudo] password <span class="hljs-keyword">for</span> <span class="hljs-keyword">sh</span><span class="hljs-variable">s:</span>
allow-submit = ask
allow-pass-<span class="hljs-keyword">on</span> = yes
submit-url = http://oops.kernel.org/submitoops.php
<span class="hljs-built_in">log</span>-<span class="hljs-keyword">file</span> = /var/<span class="hljs-built_in">log</span>/kern.<span class="hljs-built_in">log</span>
submit-pipe = /usr/share/apport/kernel_oops

</code></pre><p>在上面的（默认）设置中，内核问题可以被提交，但要求用户获得许可。如果设置为 <code>allow-submit = always</code>，则不会询问用户。</p>
<p>调试内核问题是使用 Linux 系统的更高级技巧之一。幸运的是，大多数 Linux 用户很少或从没有经历过 oops 或内核恐慌。不过，知道 kerneloops 这样的进程在系统中执行什么操作，了解可能会报告什么以及系统何时遇到严重的内核冲突也是很好的。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3254778/linux/what-is-a-linux-oops.html">https://www.networkworld.com/article/3254778/linux/what-is-a-linux-oops.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
什么是 Linux “oops”？

## 原文链接
[https://www.zcfy.cc/article/what-is-a-linux-oops](https://www.zcfy.cc/article/what-is-a-linux-oops)

