---
title: '如何更改 Linux I/O 调度器调整性能' 
date: 2019-01-24 2:30:11
hidden: true
slug: ccrw4i7dszb
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何更改-linux-io-调度器调整性能"></a>如何更改 Linux I/O 调度器调整性能</h1>
<p>为了从 Linux 服务器榨取尽可能多的性能，请了解如何更改 I/O 调度器以满足你的需求。</p>
<p><a href="https://camo.githubusercontent.com/ef7c70bac217dd024f244f12a727b4ff6380fc38/687474703a2f2f7472312e636273697374617469632e636f6d2f6875622f692f722f323031362f30352f30342f66373635633363372d656530382d346633612d383736612d3636313337616434653664662f726573697a652f373730782f31333163363933313338366563663337313034653861646138643031653930332f6861636b6572736865726f2e6a7067"><img src="https://p3.ssl.qhimg.com/t01a3d0b5085943652f.jpg" alt=""></a></p>
<p>Linux I/O 调度器（Linux I/O scheduler）控制内核提交读写请求给磁盘的方式。自从 2.6 内核以来，管理员已经能够更改这个调度器，所以他们可以自定义他们的平台以完全适合他们的需要。</p>
<p>有三个调度器可供选择，每个调度器都有其优点。这些调度器是：</p>
<ul>
<li><strong><a href="https://en.wikipedia.org/wiki/Completely_Fair_Scheduler">CFQ （Completely Fair Scheduler（完全公平调度器））</a>（cfq）</strong> ：它是许多 Linux 发行版的默认调度器；它将由进程提交的同步请求放到多个进程队列中，然后为每个队列分配时间片以访问磁盘。</li>
<li><strong><a href="https://en.wikipedia.org/wiki/Noop_scheduler">Noop 调度器</a>（noop）</strong> ： 基于先入先出（FIFO）队列概念的 Linux 内核里最简单的 I/O 调度器。此调度程序最适合于 SSD。</li>
<li><strong><a href="https://en.wikipedia.org/wiki/Deadline_scheduler">截止时间调度器</a>（deadline）</strong> ： 尝试保证请求的开始服务时间。</li>
</ul>
<p>当你想要让 Linux 机器发挥最佳性能时，这可能是你所要做的事情之一。幸运的是，更改 I/O 调度器非常简单。让我告诉你怎么做。</p>
<h3><a href="#找出你有的调度器"></a>找出你有的调度器</h3>
<p>你需要做的第一件事是找出哪个调度器正在处理你系统上的 I/O。这是从命令行完成的，你必须知道磁盘的名称。为简单起见，我假设磁盘是 sda。据此信息，打开终端窗口并输入以下命令：</p>
<pre><code class="hljs routeros">cat /sys/block/sda/queue<span class="hljs-built_in">/scheduler
</span>
</code></pre><p>该命令的结果将显示当前运行的调度程序（下图）。</p>
<p><a href="https://camo.githubusercontent.com/437b7afdd9e89e9e2d024ba917f81da16ce5b34d/687474703a2f2f7472332e636273697374617469632e636f6d2f6875622f692f323031372f30312f30332f61626261376632322d333235322d346237362d393163302d6262313536333066643432632f36623461366439373132303262373039323662326439393165366339616665332f7363686564756c6572612e6a7067"><img src="https://p5.ssl.qhimg.com/t01ce58d3c9072abf84.jpg" alt="Figure A"></a></p>
<p><em>Elementary OS Loki 运行 deadline 调度器。</em></p>
<h3><a href="#更改你的调度器"></a>更改你的调度器</h3>
<p>你可以通过两种方式更改你的调度器：即时或永久。如果你即时更改调度器，它会在重启后恢复到之前的默认调度器。你可能希望首先进行即时更改，以查看哪个调度器能为你的需求带来最佳性能。</p>
<p>说到你要即时改到 noop 调度器。 为此，输入以下命令：</p>
<pre><code class="hljs routeros">sudo echo noop &gt; /sys/block/hda/queue<span class="hljs-built_in">/scheduler
</span>
</code></pre><p>你可以将 <code>noop</code> 更改为 <code>cfq</code> 或 <code>deadline</code>。</p>
<p>此更改可以在不重新启动计算机的情况下生效。 一旦更改，I/O 调度器将会切换，（希望）你能看到性能提高（再说一次，根据你的需要而定）。</p>
<p>如果要将调度器更改为永久，则必须在 GRUB 配置文件中执行此操作。 为此，请输入 <code>sudo nano /etc/default/grub</code>，然后修改下面的行：</p>
<pre><code class="hljs ini"><span class="hljs-attr">GRUB_CMDLINE_LINUX_DEFAULT</span>=<span class="hljs-string">"quiet splash"</span>

</code></pre><p>到</p>
<pre><code class="hljs ini"><span class="hljs-attr">GRUB_CMDLINE_LINUX_DEFAULT</span>=<span class="hljs-string">"quiet splash elevator=noop"</span>

</code></pre><p>同样，你可以改变 <code>noop</code> 为任何你需要的调度器。如果你用的是即时修改，则不必重新启动以使新调度器生效。</p>
<p>这些就是修改调度器的方法了。</p>
<h3><a href="#做出明智的选择"></a>做出明智的选择</h3>
<p>你应该做研究，找出什么调度器最适合你的特殊情况。要了解每个调度器的更多信息，请查看这些 Wiki 页面：<a href="https://en.wikipedia.org/wiki/Completely_Fair_Scheduler">CFS</a>、<a href="https://en.wikipedia.org/wiki/Noop_scheduler">Noop</a>和 <a href="https://en.wikipedia.org/wiki/Deadline_scheduler">Deadline</a>。</p>
<hr>
<p>via: <a href="http://www.techrepublic.com/article/how-to-change-the-linux-io-scheduler-to-fit-your-needs/">http://www.techrepublic.com/article/how-to-change-the-linux-io-scheduler-to-fit-your-needs/</a></p>
<p>作者：<a href="http://www.techrepublic.com/meet-the-team/us/jack-wallen/">Jack Wallen</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何更改 Linux I/O 调度器调整性能

## 原文链接
[https://www.zcfy.cc/article/how-to-change-the-linux-io-scheduler-to-fit-your-needs](https://www.zcfy.cc/article/how-to-change-the-linux-io-scheduler-to-fit-your-needs)

