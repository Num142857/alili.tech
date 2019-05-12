---
title: '使用 Showterm 录制和分享终端会话' 
date: 2019-01-21 2:30:06
hidden: true
slug: ooa3jpnf0gp
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-showterm-录制和分享终端会话"></a>使用 Showterm 录制和分享终端会话</h1>
<p>你可以使用几乎所有的屏幕录制程序轻松录制终端会话。但是，你很可能会得到超大的视频文件。Linux 中有几种终端录制程序，每种录制程序都有自己的优点和缺点。Showterm 是一个可以非常容易地记录终端会话、上传、分享，并将它们嵌入到任何网页中的工具。一个优点是，你不会有巨大的文件来处理。</p>
<p>Showterm 是开源的，该项目可以在这个 <a href="https://github.com/ConradIrwin/showterm">GitHub 页面</a>上找到。</p>
<p><strong>相关</strong>：<a href="https://www.maketecheasier.com/record-terminal-session-as-video/" title="2 Simple Applications That Record Your Terminal Session as Video [Linux]">2 个简单的将你的终端会话录制为视频的 Linux 程序</a></p>
<h3><a href="#在-linux-中安装-showterm"></a>在 Linux 中安装 Showterm</h3>
<p>Showterm 要求你在计算机上安装了 Ruby。以下是如何安装该程序。</p>
<pre><code class="hljs mipsasm">gem <span class="hljs-keyword">install </span><span class="hljs-keyword">showterm
</span>
</code></pre><p>如果你没有在 Linux 上安装 Ruby，可以这样：</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">sudo</span> curl showterm.io/showterm &gt; ~/<span class="hljs-keyword">bin/showterm
</span><span class="hljs-symbol">sudo</span> chmod +x ~/<span class="hljs-keyword">bin/showterm
</span>
</code></pre><p>如果你只是想运行程序而不是安装：</p>
<pre><code class="hljs stylus">bash &lt;(curl record<span class="hljs-selector-class">.showterm</span><span class="hljs-selector-class">.io</span>)

</code></pre><p>你可以在终端输入 <code>showterm --help</code> 得到帮助页面。如果没有出现帮助页面，那么可能是未安装 <code>showterm</code>。现在你已安装了 Showterm（或正在运行独立版本），让我们开始使用该工具进行录制。</p>
<p><strong>相关</strong>：<a href="https://www.maketecheasier.com/record-terminal-session-in-ubuntu/" title="How to Record Terminal Session in Ubuntu">如何在 Ubuntu 中录制终端会话</a></p>
<h3><a href="#录制终端会话"></a>录制终端会话</h3>
<p><a href="https://camo.githubusercontent.com/21e9350a8a31a134488ed642dda1f75c0dcb0a7e/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f31312f73686f777465726d2d696e746572666163652e706e67"><img src="https://p0.ssl.qhimg.com/t019b019da233eb91ef.png" alt="showterm terminal" title="showterm terminal"></a></p>
<p>录制终端会话非常简单。从命令行运行 <code>showterm</code>。这会在后台启动终端录制。所有从命令行输入的命令都由 Showterm 记录。完成录制后，请按 <code>Ctrl + D</code> 或在命令行中输入<code>exit</code> 停止录制。</p>
<p>Showterm 会上传你的视频并输出一个看起来像 <code>http://showterm.io/&lt;一长串字符&gt;</code> 的链接的视频。不幸的是，终端会话会立即上传，而没有任何提示。请不要惊慌！你可以通过输入 <code>showterm --delete &lt;recording URL&gt;</code> 删除任何已上传的视频。在上传视频之前，你可以通过在 <code>showterm</code> 命令中添加 <code>-e</code> 选项来改变计时。如果视频无法上传，你可以使用 <code>showterm --retry &lt;script&gt; &lt;times&gt;</code> 强制重试。</p>
<p>在查看录制内容时，还可以通过在 URL 中添加 <code>#slow</code>、<code>#fast</code> 或 <code>#stop</code> 来控制视频的计时。<code>#slow</code> 让视频以正常速度播放、<code>#fast</code> 是速度加倍、<code>#stop</code>，如名称所示，停止播放视频。</p>
<p>Showterm 终端录制视频可以通过 iframe 轻松嵌入到网页中。这可以通过将 iframe 源添加到 showterm 视频地址来实现，如下所示。</p>
<p><a href="https://camo.githubusercontent.com/84cdd44932b977f90db9f8a897b2f05dad85218f/68747470733a2f2f7777772e6d616b65746563686561736965722e636f6d2f6173736574732f75706c6f6164732f323031372f31312f73686f777465726d2d736974652e706e67"><img src="https://p0.ssl.qhimg.com/t015c29757d4e66eeb4.png" alt="showtermio" title="showtermio"></a></p>
<p>作为开源工具，Showterm 允许进一步定制。例如，要运行你自己的 Showterm 服务器，你需要运行以下命令：</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span> <span class="hljs-attribute">SHOWTERM_SERVER</span>=https://showterm.myorg.local/

</code></pre><p>这样你的客户端可以和它通信。还有额外的功能只需很少的编程知识就可添加。Showterm 服务器项目可在此 <a href="https://github.com/ConradIrwin/showterm">GitHub 页面</a>获得。</p>
<h3><a href="#结论"></a>结论</h3>
<p>如果你想与同事分享一些命令行教程，请务必记得 Showterm。Showterm 是基于文本的。因此，与其他屏幕录制机相比，它将产生相对较小的视频。该工具本身尺寸相当小 —— 只有几千字节。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/record-terminal-session-showterm/">https://www.maketecheasier.com/record-terminal-session-showterm/</a></p>
<p>作者：<a href="https://www.maketecheasier.com/author/brunoedoh/">Bruno Edoh</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Showterm 录制和分享终端会话

## 原文链接
[https://www.zcfy.cc/article/record-and-share-terminal-session-with-showterm](https://www.zcfy.cc/article/record-and-share-terminal-session-with-showterm)

