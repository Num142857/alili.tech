---
title: '修复 Linux / Unix / OS X / BSD 系统控制台上的显示乱码' 
date: 2019-01-21 2:30:06
hidden: true
slug: ts1n6vf9kwf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#修复-linux--unix--os-x--bsd-系统控制台上的显示乱码"></a>修复 Linux / Unix / OS X / BSD 系统控制台上的显示乱码</h1>
<p>有时我的探索会在屏幕上输出一些奇怪的东西。比如，有一次我不小心用 <code>cat</code> 命令查看了一下二进制文件的内容 —— <code>cat /sbin/*</code>。这种情况下你将无法再访问终端里的 bash/ksh/zsh 了。大量的奇怪字符充斥了你的终端。这些字符会隐藏你输入的内容和要显示的字符，取而代之的是一些奇怪的符号。要清理掉这些屏幕上的垃圾可以使用以下方法。本文就将向你描述在 Linux/ 类 Unix 系统中如何真正清理终端屏幕或者重置终端。</p>
<h3><a href="#clear-命令"></a>clear 命令</h3>
<p><code>clear</code> 命令会清理掉屏幕内容，连带它的回滚缓存区一起也会被清理掉。（LCTT 译注：这种情况下你输入的字符回显也是乱码，不必担心，正确输入后回车即可生效。）</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> clear</span>

</code></pre><p>你也可以按下 <code>CTRL+L</code> 来清理屏幕。然而，<code>clear</code> 命令并不会清理掉终端屏幕（LCTT 译注：这句话比较难理解，应该是指的运行 <code>clear</code> 命令并不是真正的把以前显示的内容删掉，你还是可以通过向上翻页看到之前显示的内容）。使用下面的方法才可以真正地清空终端，使你的终端恢复正常。</p>
<h3><a href="#使用-reset-命令修复显示"></a>使用 reset 命令修复显示</h3>
<p>下面图片中，控制台的屏幕上充满了垃圾信息：</p>
<p><a href="https://www.cyberciti.biz/media/uploads/tips/2006/08/bash-fix-terminal.png"><img src="https://p0.ssl.qhimg.com/t01a093e965db6b896b.png" alt="Fig.01：Bash fix the display"></a></p>
<p>要修复正常显示，只需要输入 <code>reset</code> 命令。它会为你再初始化一次终端：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> reset</span>

</code></pre><p>或者：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tput reset</span>

</code></pre><p>如果 <code>reset</code> 命令还不行，那么输入下面命令来让绘画回复到正常状态：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> stty sane</span>

</code></pre><p>按下 <code>CTRL + L</code> 来清理屏幕（或者输入 <code>clear</code> 命令）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> clear</span>

</code></pre><h3><a href="#使用-ansi-转义序列来真正地清空-bash-终端"></a>使用 ANSI 转义序列来真正地清空 bash 终端</h3>
<p>另一种选择是输入下面的 ANSI 转义序列：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">clear</span>
<span class="hljs-keyword">echo</span> -e <span class="hljs-string">"\033c"</span>

</code></pre><p>下面是这两个命令的输出示例：</p>
<p><a href="https://www.cyberciti.biz/tips/bash-fix-the-display.html/unix-linux-console-gibberish"><img src="https://p0.ssl.qhimg.com/t014e408c085c451688.gif" alt="Animated gif 01：Fix Unix Console Gibberish Command Demo"></a></p>
<p>更多信息请阅读 <code>stty</code> 和 <code>reset</code> 的 man 页： stty(1)，reset(1)，bash(1)。</p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/tips/bash-fix-the-display.html">https://www.cyberciti.biz/tips/bash-fix-the-display.html</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
修复 Linux / Unix / OS X / BSD 系统控制台上的显示乱码

## 原文链接
[https://www.zcfy.cc/article/fix-the-display-and-console-gibberish-on-a-linux-unix-os-x-bsd-systems](https://www.zcfy.cc/article/fix-the-display-and-console-gibberish-on-a-linux-unix-os-x-bsd-systems)

