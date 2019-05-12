---
title: '如何更改 Linux 的 I/O 调度器' 
date: 2019-01-23 2:30:08
hidden: true
slug: ad4vdiawsus
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何更改-linux-的-io-调度器"></a>如何更改 Linux 的 I/O 调度器</h1>
<p>Linux 的 I/O 调度器是一个从存储卷以块式 I/O 访问的进程，有时也叫磁盘调度器。Linux I/O 调度器的工作机制是控制块设备的请求队列：确定队列中哪些 I/O 的优先级更高以及何时下发 I/O 到块设备，以此来减少磁盘寻道时间，从而提高系统的吞吐量。</p>
<p>目前 Linux 上有如下几种 I/O 调度算法：</p>
<ol>
<li>noop - 通常用于内存存储的设备。</li>
<li>cfq - 绝对公平调度器。进程平均使用IO带宽。</li>
<li>Deadline - 针对延迟的调度器，每一个 I/O，都有一个最晚执行时间。</li>
<li>Anticipatory - 启发式调度，类似 Deadline 算法，但是引入预测机制提高性能。</li>
</ol>
<p>查看设备当前的 I/O 调度器：</p>
<pre><code class="hljs cpp"><span class="hljs-meta"># cat /sys/block/<span class="hljs-meta-string">&lt;Disk_Name&gt;/queue/scheduler</span></span>

</code></pre><p>假设磁盘名称是 <code>/dev/sdc</code>：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># cat /sys/block/sdc/queue/scheduler</span>
<span class="hljs-attribute">noop</span> anticipatory deadline<span class="hljs-meta"> [cfq]</span>

</code></pre><h3><a href="#如何改变硬盘设备-io-调度器"></a>如何改变硬盘设备 I/O 调度器</h3>
<p>使用如下指令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> {SCHEDULER-NAME} &gt; /sys/block/&lt;Disk_Name&gt;/queue/scheduler</span>

</code></pre><p>比如设置 noop 调度器:</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">echo</span> noop &gt; /sys/block/sdc/queue/scheduler</span>

</code></pre><p>以上设置重启后会失效，要想重启后配置仍生效，需要在内核启动参数中将 <code>elevator=noop</code> 写入 <code>/boot/grub/menu.lst</code>：</p>
<h4><a href="#1-备份-menulst-文件"></a>1. 备份 menu.lst 文件</h4>
<pre><code class="hljs stylus">cp -<span class="hljs-selector-tag">p</span> /boot/grub/<span class="hljs-selector-tag">menu</span><span class="hljs-selector-class">.lst</span> /boot/grub/<span class="hljs-selector-tag">menu</span><span class="hljs-selector-class">.lst-backup</span>

</code></pre><h4><a href="#2-更新-bootgrubmenulst"></a>2. 更新 /boot/grub/menu.lst</h4>
<p>将 <code>elevator=noop</code> 添加到文件末尾，比如：</p>
<pre><code class="hljs routeros">kernel /vmlinuz-2.6.16.60-0.91.1-smp <span class="hljs-attribute">root</span>=/dev/sysvg/root <span class="hljs-attribute">splash</span>=silent <span class="hljs-attribute">splash</span>=off showopts <span class="hljs-attribute">elevator</span>=noop

</code></pre><hr>
<p>via: <a href="http://linuxroutes.com/change-io-scheduler-linux/">http://linuxroutes.com/change-io-scheduler-linux/</a></p>
<p>作者：<a href="http://linuxroutes.com/change-io-scheduler-linux/">UX Techno</a> 译者：<a href="https://github.com/honpey">honpey</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何更改 Linux 的 I/O 调度器

## 原文链接
[https://www.zcfy.cc/article/how-to-change-linux-io-scheduler](https://www.zcfy.cc/article/how-to-change-linux-io-scheduler)

