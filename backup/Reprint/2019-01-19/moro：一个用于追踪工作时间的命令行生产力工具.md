---
title: 'moro：一个用于追踪工作时间的命令行生产力工具' 
date: 2019-01-19 2:30:10
hidden: true
slug: fgdinweimp
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#moro一个用于追踪工作时间的命令行生产力工具"></a>moro：一个用于追踪工作时间的命令行生产力工具</h1>
<p>保持对你的工作小时数的追踪将让你知晓在一个特定时间区间内你所完成的工作总量。在网络上有大量的基于 GUI 的生产力工具可以用来追踪工作小时数。但我却不能找到一个基于 CLI 的工具。今天我偶然发现了一个简单而奏效的叫做 Moro 的追踪工作时间数的工具。Moro 是一个芬兰词汇，意为“Hello”。通过使用 Moro，你可以找到你在完成某项特定任务时花费了多少时间。这个工具是自由开源软件，它是通过 NodeJS 编写的。</p>
<h3><a href="#moro---一个追踪工作时间的命令行生产力工具"></a>Moro - 一个追踪工作时间的命令行生产力工具</h3>
<p>由于 Moro 是使用 NodeJS 编写的，保证你的系统上已经安装了 NodeJS。如果你没有安装好 NodeJS，跟随下面的链接在你的 Linux 中安装 NodeJS 和 NPM。</p>
<ul>
<li><a href="https://www.ostechnix.com/install-node-js-linux/">如何在 Linux 上安装 NodeJS</a></li>
</ul>
<p>NodeJS 和NPM一旦装好，运行下面的命令来安装 Moro。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm install -g moro</span>

</code></pre><h3><a href="#用法"></a>用法</h3>
<p>Moro 的工作概念非常简单。它记录了你的工作开始时间，结束时间和在你的系统上的休息时间。在每天结束时，它将会告知你已经工作了多少时间。</p>
<p>当你到达办公室时，只需键入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> moro</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs ada">♥ Moro \o/
√ You clocked <span class="hljs-keyword">in</span> <span class="hljs-keyword">at</span>: <span class="hljs-number">9</span>:<span class="hljs-number">20</span>

</code></pre><p>Moro 将会把这个时间注册为你的开始时间。</p>
<p>当你离开办公室时，再次键入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> moro</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs routeros">♥ Moro \o/
√ You clocked out at: 19:22
ℹ Today looks like this so far:
┌──────────────────┬─────────────────────────┐
│ Today you worked │ 9 Hours <span class="hljs-keyword">and</span> 72 Minutes │
├──────────────────┼─────────────────────────┤
│<span class="hljs-built_in"> Clock </span><span class="hljs-keyword">in</span> │ 9:20 │
├──────────────────┼─────────────────────────┤
│<span class="hljs-built_in"> Clock </span>out │ 19:22 │
├──────────────────┼─────────────────────────┤
│ Break duration │ 30 minutes │
├──────────────────┼─────────────────────────┤
│ Date │ 2018-03-19 │
└──────────────────┴─────────────────────────┘
ℹ <span class="hljs-builtin-name">Run</span> moro --help <span class="hljs-keyword">to</span> learn how <span class="hljs-keyword">to</span> <span class="hljs-builtin-name">edit</span> your<span class="hljs-built_in"> clock </span><span class="hljs-keyword">in</span>,<span class="hljs-built_in"> clock </span>out <span class="hljs-keyword">or</span> break duration <span class="hljs-keyword">for</span> today

</code></pre><p>Moro 将会把这个时间注册为你的结束时间。</p>
<p>现在，Moro 将会从结束时间减去开始时间，然后从总的时间减去另外的 30 分钟作为休息时间，并给你在那天总的工作时间。抱歉，我的数学计算过程解释实在糟糕。假设你在早上 10:00 来工作并在晚上 17:30 离开。所以，你总共在办公室呆了 7:30 小时（例如 17:30-10）。然后在总的时间减去休息时间（默认是 30 分钟）。因此，你的总工作时间是 7 小时。明白了？很好！</p>
<p><strong>注意：</strong>不要像我在写这个手册的时候一样把 “moro” 和 “more” 弄混了。</p>
<p>查看你注册的所有小时数，运行：</p>
<pre><code class="hljs elm">$ moro re<span class="hljs-keyword">port</span> <span class="hljs-comment">--all</span>

</code></pre><p>以防万一，如果你忘记注册开始时间或者结束时间，你一样可以在之后指定这些值。</p>
<p>例如，将上午 10 点注册为开始时间，运行：</p>
<pre><code class="hljs applescript">$ moro hi <span class="hljs-number">10</span>:<span class="hljs-number">00</span>
♥ Moro \o/
√ You clocked <span class="hljs-keyword">in</span> <span class="hljs-keyword">at</span>: <span class="hljs-number">10</span>:<span class="hljs-number">00</span>
⏰ Working <span class="hljs-keyword">until</span> <span class="hljs-number">18</span>:<span class="hljs-number">00</span> will make <span class="hljs-keyword">it</span> a full (<span class="hljs-number">7.5</span> hours) <span class="hljs-built_in">day</span>

</code></pre><p>注册 17:30 作为结束时间：</p>
<pre><code class="hljs routeros">$ moro bye 17:30
♥ Moro \o/
√ You clocked out at: 17:30
ℹ Today looks like this so far:

┌──────────────────┬───────────────────────┐
│ Today you worked │ 7 Hours <span class="hljs-keyword">and</span> 0 Minutes │
├──────────────────┼───────────────────────┤
│<span class="hljs-built_in"> Clock </span><span class="hljs-keyword">in</span> │ 10:00 │
├──────────────────┼───────────────────────┤
│<span class="hljs-built_in"> Clock </span>out │ 17:30 │
├──────────────────┼───────────────────────┤
│ Break duration │ 30 minutes │
├──────────────────┼───────────────────────┤
│ Date │ 2018-03-19 │
└──────────────────┴───────────────────────┘
ℹ <span class="hljs-builtin-name">Run</span> moro --help <span class="hljs-keyword">to</span> learn how <span class="hljs-keyword">to</span> <span class="hljs-builtin-name">edit</span> your<span class="hljs-built_in"> clock </span><span class="hljs-keyword">in</span>,<span class="hljs-built_in"> clock </span>out <span class="hljs-keyword">or</span> break duration <span class="hljs-keyword">for</span> today

</code></pre><p>你已经知道 Moro 默认将会减去 30 分钟的休息时间。如果你需要设置一个自定义的休息时间，你可以简单使用以下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> moro <span class="hljs-built_in">break</span> 45</span>

</code></pre><p>现在，休息时间是 45 分钟了。</p>
<p>若要清除所有的数据：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> moro clear --<span class="hljs-keyword">yes</span>
♥ Moro \o/
√ Database <span class="hljs-keyword">file</span> deleted successfully

</code></pre><h4><a href="#添加笔记"></a>添加笔记</h4>
<p>有时候，你想要在工作时添加笔记。不必去寻找一个独立的作笔记的应用。Moro 将会帮助你添加笔记。要添加笔记，只需运行：</p>
<pre><code class="hljs routeros">$ moro<span class="hljs-built_in"> note </span>mynotes

</code></pre><p>要在之后搜索所有已经注册的笔记，只需做：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> moro search mynotes</span>

</code></pre><h4><a href="#修改默认设置"></a>修改默认设置</h4>
<p>默认的完整工作时间是 7.5 小时。这是因为开发者来自芬兰，这是官方的工作小时数。但是你也可以修改这个设置为你的国家的工作小时数。</p>
<p>举个例子，要将其设置为 7 小时，运行：</p>
<pre><code class="hljs routeros">$ moro<span class="hljs-built_in"> config </span>--day 7

</code></pre><p>同样地，默认的休息时间也可以像下面这样从 30 分钟修改：</p>
<pre><code class="hljs routeros">$ moro<span class="hljs-built_in"> config </span>--break 45

</code></pre><h4><a href="#备份你的数据"></a>备份你的数据</h4>
<p>正如我已经说了的，Moro 将时间追踪信息存储在你的家目录，文件名是 <code>.moro-data.db</code>。</p>
<p>但是，你可以保存备份数据库到不同的位置。要这样做的话，像下面这样将 <code>.moro-data.db</code> 文件移到你选择的一个不同的位置并告知 Moro 使用那个数据库文件。</p>
<pre><code class="hljs routeros">$ moro<span class="hljs-built_in"> config </span>--database-path /home/sk/personal/moro-data.db

</code></pre><p>在上面的每一个命令，我都已经把默认的数据库文件分配到了 <code>/home/sk/personal</code> 目录。</p>
<p>需要帮助的话，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> moro --<span class="hljs-built_in">help</span></span>

</code></pre><p>正如你所见，Moro 是非常简单而又能用于追踪你完成你的工作使用了多少时间的。对于自由职业者和任何想要在一定时间范围内完成事情的人，它将会是有用的。</p>
<p>并且，这些只是今天的内容。希望这些内容能够有所帮助。更多的好东西将会出现。请保持关注！</p>
<p>干杯！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/moro-a-command-line-productivity-tool-for-tracking-work-hours/">https://www.ostechnix.com/moro-a-command-line-productivity-tool-for-tracking-work-hours/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 译者：<a href="https://github.com/leemeans">leemeans</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
moro：一个用于追踪工作时间的命令行生产力工具

## 原文链接
[https://www.zcfy.cc/article/a-command-line-productivity-tool-for-tracking-work-hours](https://www.zcfy.cc/article/a-command-line-productivity-tool-for-tracking-work-hours)

