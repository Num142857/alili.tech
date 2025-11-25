---
title: '在 Xfce 会话中保存窗口的位置' 
date: 2019-01-21 2:30:06
hidden: true
slug: dohtwfnxq16
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-xfce-会话中保存窗口的位置"></a>在 Xfce 会话中保存窗口的位置</h1>
<p>摘要：如果你发现 Xfce 会话不能保存窗口的位置，那么启用“登出时保存”，然后登出再重新登录一次，可能就能永久修复这个问题了（如果你想要保持相同的会话，再次登录时恢复的话）。 下面是详细内容。</p>
<p>我用 Xfce 作桌面有些年头了，但是每次重启后进入之前保存的会话时总会有问题出现。 登录后， 之前会话中保存的应用都会启动， 但是所有的工作区和窗口位置数据都会丢失， 导致所有应用都堆在默认工作区中，乱糟糟的。</p>
<p>多年来，很多人都报告过这个问题（Ubuntu、Xfce 以及 Red Hat 的 bug 追踪系统中都有登记）。 虽然 Xfce4.10 中已经修复过了一个相关 bug， 但是我用的 Xfce4.12 依然有这个问题。 如果不是我的其中一个系统能够正常的恢复各个窗口的位置，我几乎都要放弃找出问题的原因了（事实上我之前已经放弃过很多次了）。</p>
<p>今天，我深入对比了两个系统的不同点，最终解决了这个问题。 我现在就把结果写出来， 以防有人也遇到相同的问题。</p>
<p>提前的一些说明：</p>
<ol>
<li>由于这个笔记本只有我在用，因此我几乎不登出我的 Xfce 会话。 我一般只是休眠然后唤醒，除非由于要对内核打补丁才进行重启， 或者由于某些改动损毁了休眠镜像导致系统从休眠中唤醒时卡住了而不得不重启。 另外，我也很少使用 Xfce 工具栏上的重启按钮重启；一般我只是运行一下 <code>reboot</code>。</li>
<li>我会使用 xterm 和 Emacs， 这些不太复杂的 X 应用无法记住他们自己的窗口位置。</li>
</ol>
<p>Xfce 将会话信息保存到主用户目录中的 <code>.cache/sessions</code> 目录中。在经过仔细检查后发现，在正常的系统中有两类文件存储在该目录中，而在非正常的系统中，只有一类文件存在该目录下。</p>
<p>其中一类文件的名字类似 <code>xfce4-session-hostname:0</code> 这样的，其中包含的内容类似下面这样的：</p>
<pre><code class="hljs ini"><span class="hljs-attr">Client9_ClientId</span>=<span class="hljs-number">2</span>a654109b-e4d0-<span class="hljs-number">40</span>e4-a910-e58717faa80b
<span class="hljs-attr">Client9_Hostname</span>=local/hostname
<span class="hljs-attr">Client9_CloneCommand</span>=xterm
<span class="hljs-attr">Client9_RestartCommand</span>=xterm，-xtsessionID，<span class="hljs-number">2</span>a654109b-e4d0-<span class="hljs-number">40</span>e4-a910-e58717faa80b
<span class="hljs-attr">Client9_Program</span>=xterm
<span class="hljs-attr">Client9_UserId</span>=user

</code></pre><p>这个文件记录了所有正在运行的程序。如果你进入“设置 -&gt; 会话和启动”并清除会话缓存， 就会删掉这种文件。 当你保存当前会话时， 又会创建这种文件。 这就是 Xfce 知道要启动哪些应用的原因。 但是请注意，上面并没有包含任何窗口位置的信息。 （我还曾经以为可以根据会话 ID 来找到其他地方的一些相关信息，但是并没有）。</p>
<p>正常工作的系统在目录中还有另一类文件，名字类似 <code>xfwm4-2d4c9d4cb-5f6b-41b4-b9d7-5cf7ac3d7e49.state</code> 这样的。 其中文件内容类似下面这样：</p>
<pre><code class="hljs lsl">[CLIENT] <span class="hljs-number">0x200000f</span>
[CLIENT_ID] <span class="hljs-number">2</span>a9e5b8ed<span class="hljs-number">-1851</span><span class="hljs-number">-4</span>c11<span class="hljs-number">-82</span>cf-e51710dcf733
[CLIENT_LEADER] <span class="hljs-number">0x200000f</span>
[RES_NAME] xterm
[RES_CLASS] XTerm
[WM_NAME] xterm
[WM_COMMAND] (<span class="hljs-number">1</span>) <span class="hljs-string">"xterm"</span>
[GEOMETRY] (<span class="hljs-number">860</span>，<span class="hljs-number">35</span>，<span class="hljs-number">817</span>，<span class="hljs-number">1042</span>)
[GEOMETRY-MAXIMIZED] (<span class="hljs-number">860</span>，<span class="hljs-number">35</span>，<span class="hljs-number">817</span>，<span class="hljs-number">1042</span>)
[SCREEN] <span class="hljs-number">0</span>
[DESK] <span class="hljs-number">2</span>
[FLAGS] <span class="hljs-number">0x0</span>

</code></pre><p>注意这里的 <code>GEOMETRY</code> 和 <code>DESK</code> 记录的正是我们想要的窗口位置以及工作区号。因此不能保存窗口位置的原因就是因为缺少这个文件。</p>
<p>继续深入下去，我发现当你明确地手工保存会话时，之后保存第一个文件而不会保存第二个文件。 但是当登出保存会话时则会保存第二个文件。 因此， 我进入“设置 -&gt; 会话和启动”中，在“通用”标签页中启用登出时自动保存会话， 然后登出后再进来， 然后， 第二个文件就出现了。 再然后我又关闭了登出时自动保存会话。（因为我一般在排好屏幕后就保存一个会话， 但是我不希望做出的改变也会影响到这个保存的会话， 如有必要我会明确地手工进行保存），现在我的窗口位置能够正常的恢复了。</p>
<p>这也解释了为什么有的人会有问题而有的人没有问题： 有的人可能一直都是用登出按钮重启，而有些人则是手工重启（或者仅仅是由于系统崩溃了才重启）。</p>
<p>顺带一提，这类问题， 以及为解决问题而付出的努力，正是我赞同为软件存储的状态文件编写 man 页或其他类似文档的原因。 为用户编写文档，不仅能帮助别人深入挖掘产生奇怪问题的原因， 也能让软件作者注意到软件中那些奇怪的东西， 比如将会话状态存储到两个独立的文件中去。</p>
<hr>
<p>via: <a href="https://www.eyrie.org/%7Eeagle/journal/2017-12/001.html">https://www.eyrie.org/~eagle/journal/2017-12/001.html</a></p>
<p>作者：<a href="https://www.eyrie.org">J. R. R. Tolkien</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Xfce 会话中保存窗口的位置

## 原文链接
[https://www.zcfy.cc/article/saving-window-position-in-xfce-session](https://www.zcfy.cc/article/saving-window-position-in-xfce-session)

