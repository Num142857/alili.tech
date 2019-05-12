---
title: '配置 logrotate 的终极指导' 
date: 2019-01-24 2:30:11
hidden: true
slug: otlwlaaki2a
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#配置-logrotate-的终极指导"></a>配置 logrotate 的终极指导</h1>
<p>一般来说，日志是任何故障排除过程中非常重要的一部分，但这些日志会随着时间增长。在这种情况下，我们需要手动执行日志清理以回收空间，这是一件繁琐的管理任务。为了解决这个问题，我们可以在 Linux 中配置 logrotate 程序，它可以自动执行日志文件的轮换、压缩、删除和用邮件发出。</p>
<p>我们可以配置 logrotate 程序，以便每个日志文件可以在每天、每周、每月或当它变得太大时处理。</p>
<h3><a href="#logrotate-是如何工作的"></a>logrotate 是如何工作的</h3>
<p>默认情况下，logrotate 命令作为放在 <code>/etc/cron.daily</code> 中的 cron 任务，每天运行一次，它会帮助你设置一个策略，其中超过某个时间或大小的日志文件被轮换。</p>
<p>命令： <code>/usr/sbin/logrotate</code></p>
<p>配置文件： <code>/etc/logrotate.conf</code></p>
<p>这是 logrotate 的主配置文件。logrotate 还在 <code>/etc/logrotate.d/</code> 中存储了特定服务的配置。确保下面的那行包含在 <code>/etc/logrotate.conf</code> 中，以读取特定服务日志配置。</p>
<pre><code class="hljs gradle"><span class="hljs-keyword">include</span>  <span class="hljs-regexp">/etc/</span>logrotate.d`

</code></pre><p>logrotate 历史： <code>/var/lib/logrotate.status</code></p>
<p>重要的 logrotate 选项：</p>
<pre><code class="hljs xl"><span class="hljs-function"><span class="hljs-title">compress</span>             --&gt;</span> 压缩日志文件的所有非当前版本
<span class="hljs-function"><span class="hljs-title">daily</span>,weekly,monthly --&gt;</span> 按指定计划轮换日志文件
<span class="hljs-function"><span class="hljs-title">delaycompress</span>        --&gt;</span> 压缩所有版本，除了当前和下一个最近的
<span class="hljs-function"><span class="hljs-title">endscript</span>            --&gt;</span> 标记 prerotate 或 postrotate 脚本的结束
<span class="hljs-function"><span class="hljs-title">errors</span> "emailid"     --&gt;</span> 给指定邮箱发送错误通知
<span class="hljs-function"><span class="hljs-title">missingok</span>            --&gt;</span> 如果日志文件丢失，不要显示错误
<span class="hljs-function"><span class="hljs-title">notifempty</span>           --&gt;</span> 如果日志文件为空，则不轮换日志文件
<span class="hljs-function"><span class="hljs-title">olddir</span> "dir"         --&gt;</span> 指定日志文件的旧版本放在 “dir” 中
<span class="hljs-function"><span class="hljs-title">postrotate</span>           --&gt;</span> 引入一个在日志被轮换后执行的脚本
<span class="hljs-function"><span class="hljs-title">prerotate</span>            --&gt;</span> 引入一个在日志被轮换前执行的脚本
<span class="hljs-function"><span class="hljs-title">rotate</span> 'n'           --&gt;</span> 在轮换方案中包含日志的 n 个版本
<span class="hljs-function"><span class="hljs-title">sharedscripts</span>        --&gt;</span> 对于整个日志组只运行一次脚本
<span class="hljs-function"><span class="hljs-title">size</span>='logsize'       --&gt;</span> 在日志大小大于 logsize（例如 <span class="hljs-number">100</span>K，<span class="hljs-number">4</span>M）时轮换

</code></pre><h3><a href="#配置"></a>配置</h3>
<p>让我们为我们自己的示例日志文件 <code>/tmp/sample_output.log</code> 配置 logrotate。</p>
<p>第一步：在 <code>/etc/logrotate.conf</code> 中添加以下行。</p>
<pre><code class="hljs lsl">/tmp/sample_output.log {
  size <span class="hljs-number">1</span>k
  create <span class="hljs-number">700</span> root root
  rotate <span class="hljs-number">4</span>
  compress
}

</code></pre><p>在上面的配置文件中：</p>
<ul>
<li>size 1k - logrotate 仅在文件大小等于（或大于）此大小时运行。</li>
<li>create - 轮换原始文件并创建具有指定权限、用户和组的新文件。</li>
<li>rotate - 限制日志文件轮转的数量。因此，这将只保留最近的 4 个轮转的日志文件。</li>
<li>compress - 这将压缩文件。</li>
</ul>
<p>第二步：通常，你需要等待一天才能等到 logrotate 由 <code>/etc/cron.daily</code> 执行。除此之外，你可以用下面的命令在命令行中运行：</p>
<pre><code class="hljs dts"><span class="hljs-meta-keyword">/usr/</span>sbin/logrotate  <span class="hljs-meta-keyword">/etc/</span>logrotate.conf

</code></pre><p>在执行 logrotate 命令之前的输出：</p>
<pre><code class="hljs tap">[root@rhel1 tmp]<span class="hljs-comment"># ls -l /tmp/</span>
total 28
-rw-------.<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 20000 </span>Jan<span class="hljs-number"> 1 </span>05:23 sample_output.log

</code></pre><p>在执行 logrotate 之后的输出：</p>
<pre><code class="hljs tap">[root@rhel1 tmp]<span class="hljs-comment"># ls -l /tmp</span>
total 12
-rwx------.<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 0 </span>Jan<span class="hljs-number"> 1 </span>05:24 sample_output.log
-rw-------.<span class="hljs-number"> 1 </span>root root<span class="hljs-number"> 599 </span>Jan<span class="hljs-number"> 1 </span>05:24 sample_output.log-20170101.gz
[root@rhel1 tmp]<span class="hljs-comment">#</span>

</code></pre><p>这样就能确认 logrotate 成功实现了。</p>
<hr>
<p>作者简介：</p>
<p>大家好！我是 Manmohan Mirkar。我很高兴见到你们！我在 10 多年前开始使用 Linux，我从来没有想过我会到今天这个地步。我的激情是帮助你们获取 Linux 知识。谢谢你们在这！</p>
<hr>
<p>via: <a href="http://www.linuxroutes.com/configure-logrotate/">http://www.linuxroutes.com/configure-logrotate/</a></p>
<p>作者：<a href="http://www.linuxroutes.com/author/admin/">Manmohan Mirkar</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
配置 logrotate 的终极指导

## 原文链接
[https://www.zcfy.cc/article/ultimate-guide-to-configure-logrotate-utility](https://www.zcfy.cc/article/ultimate-guide-to-configure-logrotate-utility)

