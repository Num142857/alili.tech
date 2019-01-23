---
title: '怎样在 Linux 命令行下杀死一个进程' 
date: 2019-01-23 2:30:08
hidden: true
slug: xin046e993
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#怎样在-linux-命令行下杀死一个进程"></a>怎样在 Linux 命令行下杀死一个进程</h1>
<blockquote>
<p>Linux 的命令行里面有用来停止正在运行的进程的所有所需工具。Jack Wallen 将为您讲述细节。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/52a605cb5d1740063113f3b1259d4c0c924592c9/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f73746f702d70726f6365737365732e6a70673f69746f6b3d76664e783856527a"><img src="https://p0.ssl.qhimg.com/t016e51a151e83b098a.jpg" alt="stop processes" title="stop processes"></a></p>
<p>想像一下：你打开了一个程序（可能来自于你的桌面菜单或者命令行），然后开始使用这个程序，没想到程序会锁死、停止运行、或者意外死机。你尝试再次运行该程序，但是它反馈说原来的进程没有完全关闭。</p>
<p>你该怎么办？你要结束进程。但该如何做？不管你信与不信，最好的解决方法大都在命令行里。值得庆幸的是， Linux 有供用户杀死错误的进程的每个必要的工具，然而，你在执行杀死进程的命令之前，你首先需要知道进程是什么。该如何处理这一类的任务。一旦你能够掌握这种工具，它实际是十分简单的……</p>
<p>让我来介绍给你这些工具。</p>
<p>我来概述的步骤是每个 Linux 发行版都能用的，不论是桌面版还是服务器版。我将限定只使用命令行，请打开你的终端开始输入命令吧。</p>
<h3><a href="#定位进程"></a>定位进程</h3>
<p>杀死一个没有响应的进程的第一个步骤是定位这个进程。我用来定位进程的命令有两个：<code>top</code> 和 <code>ps</code> 命令。<code>top</code> 是每个系统管理员都知道的工具，用 <code>top</code> 命令，你能够知道到所有当前正在运行的进程有哪些。在命令行里，输入 <code>top</code> 命令能够就看到你正在运行的程序进程（图1）</p>
<p><a href="https://camo.githubusercontent.com/198d8814dfbac5fbd92289cb47a309f819848efc/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f6b696c6c612e6a70673f69746f6b3d3935635549394c68"><img src="https://p0.ssl.qhimg.com/t01d5e9a5dc3c3414e5.jpg" alt="top" title="top"></a></p>
<p><em>图 1： top 命令给出你许多的信息。</em></p>
<p>从显示的列表中你能够看到相当重要的信息，举个例子，Chrome 浏览器反映迟钝，依据我们的 <code>top</code> 命令显示，我们能够辨别的有四个 Chrome 浏览器的进程在运行，进程的 pid 号分别是 3827、3919、10764 和 11679。这个信息是重要的，可以用一个特殊的方法来结束进程。</p>
<p>尽管 <code>top</code> 命令很是方便，但也不是得到你所要信息最有效的方法。 你知道你要杀死的 Chrome 进程是那个，并且你也不想看 <code>top</code> 命令所显示的实时信息。 鉴于此，你能够使用 <code>ps</code> 命令然后用 <code>grep</code> 命令来过滤出输出结果。这个 <code>ps</code> 命令能够显示出当前进程列表的快照，然后用 <code>grep</code> 命令输出匹配的样式。我们通过 <code>grep</code> 命令过滤 <code>ps</code> 命令的输出的理由很简单：如果你只输入 <code>ps</code> 命令，你将会得到当前所有进程的列表快照，而我们需要的是列出 Chrome 浏览器进程相关的。所以这个命令是这个样子：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">ps</span> aux | <span class="hljs-keyword">grep</span> chrome

</code></pre><p>这里 <code>aux</code> 选项如下所示：</p>
<ul>
<li>a = 显示所有用户的进程</li>
<li>u = 显示进程的用户和拥有者</li>
<li>x = 也显示不依附于终端的进程</li>
</ul>
<p>当你搜索图形化程序的信息时，这个 <code>x</code> 参数是很重要的。</p>
<p>当你输入以上命令的时候，你将会得到比图 2 更多的信息，而且它有时用起来比 <code>top</code> 命令更有效。</p>
<p><a href="https://camo.githubusercontent.com/6620c9031605c4f6631825bf4e20d8614b3a60b7/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f6b696c6c622e6a70673f69746f6b3d7679574975547661"><img src="https://p0.ssl.qhimg.com/t01ca3ae6510a9365fb.jpg" alt="ps command" title="ps command"></a></p>
<p><em>图 2：用 ps 命令来定位所需的内容信息。</em></p>
<h3><a href="#结束进程"></a>结束进程</h3>
<p>现在我们开始结束进程的任务。我们有两种可以帮我们杀死错误的进程的信息。</p>
<ul>
<li>进程的名字</li>
<li>进程的 ID （PID）</li>
</ul>
<p>你用哪一个将会决定终端命令如何使用，通常有两个命令来结束进程：</p>
<ul>
<li><code>kill</code> - 通过进程 ID 来结束进程</li>
<li><code>killall</code> - 通过进程名字来结束进程</li>
</ul>
<p>有两个不同的信号能够发送给这两个结束进程的命令。你发送的信号决定着你想要从结束进程命令中得到的结果。举个例子，你可以发送 <code>HUP</code>（挂起）信号给结束进程的命令，命令实际上将会重启这个进程。当你需要立即重启一个进程（比如就守护进程来说），这是一个明智的选择。你通过输入 <code>kill -l</code> 可以得到所有信号的列表，你将会发现大量的信号。</p>
<p><a href="https://camo.githubusercontent.com/e97775d329c5164a4a43dc9f21d93e75fa03081b/68747470733a2f2f7777772e6c696e75782e636f6d2f73697465732f6c636f6d2f66696c65732f7374796c65732f72656e64657265645f66696c652f7075626c69632f6b696c6c632e6a70673f69746f6b3d3965775248465732"><img src="https://p0.ssl.qhimg.com/t017f63b408c84f7fac.jpg" alt=""></a></p>
<p><em>图 3： 可用的结束进程信号。</em></p>
<p>最经常使用的结束进程的信号是：</p>
<p>Signal Name</p>
<p>Single Value</p>
<p>Effect</p>
<p>SIGHUP</p>
<p>1</p>
<p>挂起</p>
<p>SIGINT</p>
<p>2</p>
<p>键盘的中断信号</p>
<p>SIGKILL</p>
<p>9</p>
<p>发出杀死信号</p>
<p>SIGTERM</p>
<p>15</p>
<p>发出终止信号</p>
<p>SIGSTOP</p>
<p>17, 19, 23</p>
<p>停止进程</p>
<p>好的是，你能用信号值来代替信号名字。所以你没有必要来记住所有各种各样的信号名字。</p>
<p>所以，让我们现在用 <code>kill</code> 命令来杀死 Chrome 浏览器的进程。这个命令的结构是：</p>
<pre><code class="hljs bash"><span class="hljs-built_in">kill</span> SIGNAL PID

</code></pre><p>这里 SIGNAL 是要发送的信号，PID 是被杀死的进程的 ID。我们已经知道，来自我们的 <code>ps</code> 命令显示我们想要结束的进程 ID 号是 3827、3919、10764 和 11679。所以要发送结束进程信号，我们输入以下命令：</p>
<pre><code class="hljs lsl">kill <span class="hljs-number">-9</span> <span class="hljs-number">3827</span>
kill <span class="hljs-number">-9</span> <span class="hljs-number">3919</span>
kill <span class="hljs-number">-9</span> <span class="hljs-number">10764</span>
kill <span class="hljs-number">-9</span> <span class="hljs-number">11679</span>

</code></pre><p>一旦我们输入了以上命令，Chrome 浏览器的所有进程将会成功被杀死。</p>
<p>我们有更简单的方法！如果我们已经知道我们想要杀死的那个进程的名字，我们能够利用 <code>killall</code> 命令发送同样的信号，像这样：</p>
<pre><code class="hljs lsl">killall <span class="hljs-number">-9</span> chrome

</code></pre><p>附带说明的是，上边这个命令可能不能捕捉到所有正在运行的 Chrome 进程。如果，运行了上边这个命令之后，你输入 <code>ps aux | grep chrome</code> 命令过滤一下，看到剩下正在运行的 Chrome 进程有那些，最好的办法还是回到 <code>kIll</code> 命令通过进程 ID 来发送信号值 <code>9</code> 来结束这个进程。</p>
<h3><a href="#结束进程很容易"></a>结束进程很容易</h3>
<p>正如你看到的，杀死错误的进程并没有你原本想的那样有挑战性。当我让一个顽固的进程结束的时候，我趋向于用 <code>killall</code>命令来作为有效的方法来终止，然而，当我让一个真正的活跃的进程结束的时候，<code>kill</code>命令是一个好的方法。</p>
<hr>
<p>via: <a href="https://www.linux.com/learn/intro-to-linux/2017/5/how-kill-process-command-line">https://www.linux.com/learn/intro-to-linux/2017/5/how-kill-process-command-line</a></p>
<p>作者：<a href="https://www.linux.com/users/jlwallen">JACK WALLEN</a> 译者：<a href="https://github.com/hwlog">hwlog</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎样在 Linux 命令行下杀死一个进程

## 原文链接
[https://www.zcfy.cc/article/how-to-kill-a-process-from-the-command-line](https://www.zcfy.cc/article/how-to-kill-a-process-from-the-command-line)

