---
title: Cron 任务入门指南
reprint: true
categories: reprint
abbrlink: d0879e5
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <h1><a href="#cron-任务入门指南"></a>Cron 任务入门指南</h1>
<p><strong>Cron</strong> 是您可以在任何类 Unix 操作系统中找到的最有用的实用程序之一。它用于安排命令在特定时间执行。这些预定的命令或任务被称为 “Cron 任务”。Cron 通常用于运行计划备份、监视磁盘空间、定期删除不再需要的文件（例如日志文件）、运行系统维护任务等等。在本简要指南中，我们将看到 Linux 中 Cron 任务的基本用法。</p>
<h3><a href="#cron-任务入门指南-1"></a>Cron 任务入门指南</h3>
<p>cron 任务的典型格式是：</p>
<pre><code class="hljs lsl">分钟(<span class="hljs-number">0</span><span class="hljs-number">-59</span>) 小时(<span class="hljs-number">0</span><span class="hljs-number">-24</span>) 日(<span class="hljs-number">1</span><span class="hljs-number">-31</span>) 月(<span class="hljs-number">1</span><span class="hljs-number">-12</span>) 星期(<span class="hljs-number">0</span><span class="hljs-number">-6</span>) 要执行的命令

</code></pre><p>只需记住 cron 任务的格式或打印下面的插图并将其放在你桌面上即可。</p>
<p><a href="https://camo.githubusercontent.com/793bf0d4e6813f3c7d131e6b05a4619c840c76c6/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f63726f6e2d6a6f622d666f726d61742d312e706e67"><img src="https://p0.ssl.qhimg.com/t01f500f34de815983a.png" alt=""></a></p>
<p>在上图中，星号表示特定的时间块。</p>
<p>要显示当前登录用户的 crontab 文件的内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -l</span>

</code></pre><p>要编辑当前用户的 cron 任务，请执行以下操作：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -e</span>

</code></pre><p>如果这是第一次编辑此文件，会询问你使用哪个编辑器来编辑此文件。</p>
<pre><code class="hljs sql">no crontab for sk - using an empty one

<span class="hljs-keyword">Select</span> an editor. <span class="hljs-keyword">To</span> <span class="hljs-keyword">change</span> later, run <span class="hljs-string">'select-editor'</span>.
<span class="hljs-number">1.</span> /<span class="hljs-keyword">bin</span>/nano &lt;<span class="hljs-comment">---- easiest</span>
<span class="hljs-number">2.</span> /usr/<span class="hljs-keyword">bin</span>/vim.basic
<span class="hljs-number">3.</span> /usr/<span class="hljs-keyword">bin</span>/vim.tiny
<span class="hljs-number">4.</span> /<span class="hljs-keyword">bin</span>/ed

<span class="hljs-keyword">Choose</span> <span class="hljs-number">1</span><span class="hljs-number">-4</span> [<span class="hljs-number">1</span>]:

</code></pre><p>选择适合你的编辑器。这里是一个示例 crontab 文件的样子。</p>
<p><a href="https://camo.githubusercontent.com/2113cb042022b9088cc119714263b9beb4e729dc/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f63726f6e2d6a6f62732d312e706e67"><img src="https://p0.ssl.qhimg.com/t0137f3e85d70fe09f1.png" alt=""></a></p>
<p>在这个文件中，你需要添加你的 cron 任务。</p>
<p>要编辑其他用户的 crontab，例如 ostechnix，请执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -u ostechnix -e</span>

</code></pre><p>让我们看看一些例子。</p>
<p>要 <strong>每分钟</strong> 执行一次 cron 任务，需使用如下格式。</p>
<pre><code class="hljs markdown"><span class="hljs-bullet">* </span><span class="hljs-bullet">* *</span> <span class="hljs-bullet">* *</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">command-to-execute</span>&gt;</span></span>

</code></pre><p>要每 5 分钟运行一次 cron 任务，请在 crontab 文件中添加以下内容。</p>
<pre><code class="hljs autoit">*/<span class="hljs-number">5</span> * * * * &lt;command-<span class="hljs-keyword">to</span>-<span class="hljs-built_in">execute</span>&gt;

</code></pre><p>要在每 1/4 个小时（每 15 分钟）运行一次 cron 任务，请添加以下内容：</p>
<pre><code class="hljs autoit">*/<span class="hljs-number">15</span> * * * * &lt;command-<span class="hljs-keyword">to</span>-<span class="hljs-built_in">execute</span>&gt;

</code></pre><p>要每小时的第 30 分钟运行一次 cron 任务，请运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">30 </span>* * * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>您还可以使用逗号定义多个时间间隔。例如，以下 cron 任务每小时运行三次，分别在第 0、 5 和 10 分钟运行：</p>
<pre><code class="hljs lsl"><span class="hljs-number">0</span>,<span class="hljs-number">5</span>,<span class="hljs-number">10</span> * * * * &lt;command-to-execute&gt;

</code></pre><p>每半小时运行一次 cron 任务：</p>
<pre><code class="hljs autoit">*/<span class="hljs-number">30</span> * * * * &lt;command-<span class="hljs-keyword">to</span>-<span class="hljs-built_in">execute</span>&gt;

</code></pre><p>每小时运行一次：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span>* * * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每 2 小时运行一次：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span>*/<span class="hljs-number">2</span> * * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每天运行一项（在 00:00 运行）：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> * * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每天凌晨 3 点运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">3</span> * * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每周日运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> * * SUN &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>或使用，</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> * * <span class="hljs-number">0</span> &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>它将在每周日的午夜 00:00 运行。</p>
<p>星期一至星期五每天运行一次，亦即每个工作日运行一次：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> * * <span class="hljs-number">1</span>-<span class="hljs-number">5</span> &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>这项工作将于 00:00 开始。</p>
<p>每个月运行一次：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> <span class="hljs-number">1</span> * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>于每月第 1 天的 16:15 运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">15 </span><span class="hljs-number">16</span> <span class="hljs-number">1</span> * * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每季度运行一次，亦即每隔 3 个月的第 1 天运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> <span class="hljs-number">1</span> */<span class="hljs-number">3</span> * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>在特定月份的特定时间运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">5 </span><span class="hljs-number">0</span> * <span class="hljs-number">4</span> * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>每个四月的 00:05 运行。</p>
<p>每 6 个月运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> <span class="hljs-number">1</span> */<span class="hljs-number">6</span> * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>这个定时任务将在每六个月的第一天的 00:00 运行。</p>
<p>每年运行：</p>
<pre><code class="hljs basic"><span class="hljs-symbol">0 </span><span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> * &lt;command-<span class="hljs-keyword">to</span>-execute&gt;

</code></pre><p>这项 cron 任务将于 1 月份的第一天的 00:00 运行。</p>
<p>我们也可以使用以下字符串来定义任务。</p>
<p><code>@reboot</code> 在每次启动时运行一次。 <code>@yearly</code> 每年运行一次。 <code>@annually</code>（和 <code>@yearly</code> 一样）。 <code>@monthly</code> 每月运行一次。 <code>@weekly</code> 每周运行一次。 <code>@daily</code> 每天运行一次。 <code>@midnight</code> （和 <code>@daily</code> 一样）。 <code>@hourly</code> 每小时运行一次。</p>
<p>例如，要在每次重新启动服务器时运行任务，请将此行添加到您的 crontab 文件中。</p>
<pre><code class="hljs autoit"><span class="hljs-symbol">@reboot</span> &lt;command-<span class="hljs-keyword">to</span>-<span class="hljs-built_in">execute</span>&gt;

</code></pre><p>要删除当前用户的所有 cron 任务：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -r</span>

</code></pre><p>还有一个名为 [crontab.guru] <a href="https://crontab.guru/">4</a> 的专业网站，用于学习 cron 任务示例。这个网站提供了很多 cron 任务的例子。</p>
<p>有关更多详细信息，请查看手册页。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> man crontab</span>

</code></pre><p>那么，就是这样。到此为止，您应该对 cron 任务以及如何在世使用它们有了一个基本的了解。后续还会介绍更多的优秀工具。敬请关注！！</p>
<p>干杯!</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/">https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/KevinSJ">KevinSJ</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/a-beginners-guide-to-cron-jobs](https://www.zcfy.cc/article/a-beginners-guide-to-cron-jobs)
原文标题: Cron 任务入门指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
