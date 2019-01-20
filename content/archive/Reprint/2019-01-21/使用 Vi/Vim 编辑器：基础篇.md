---
title: '使用 Vi/Vim 编辑器：基础篇' 
date: 2019-01-21 2:30:06
hidden: true
slug: qxkokr6ra5h
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-vivim-编辑器基础篇"></a>使用 Vi/Vim 编辑器：基础篇</h1>
<p>VI 编辑器是一个基于命令行的、功能强大的文本编辑器，最早为 Unix 系统开发，后来也被移植到许多的 Unix 和 Linux 发行版上。</p>
<p>在 Linux 上还存在着另一个 VI 编辑器的高阶版本 —— VIM（也被称作 VI IMproved）。VIM 只是在 VI 已经很强的功能上添加了更多的功能，这些功能有：</p>
<ul>
<li>支持更多 Linux 发行版，</li>
<li>支持多种编程语言，包括 python、c++、perl 等语言的代码块折叠，语法高亮，</li>
<li>支持通过多种网络协议，包括 http、ssh 等编辑文件，</li>
<li>支持编辑压缩归档中的文件，</li>
<li>支持分屏同时编辑多个文件。</li>
</ul>
<p>接下来我们会讨论 VI/VIM 的命令以及选项。本文出于教学的目的，我们使用 VI 来举例，但所有的命令都可以被用于 VIM。首先我们先介绍 VI 编辑器的两种模式。</p>
<h3><a href="#命令模式"></a>命令模式</h3>
<p>命令模式下，我们可以执行保存文件、在 VI 内运行命令、复制/剪切/粘贴操作，以及查找/替换等任务。当我们处于插入模式时，我们可以按下 <code>Escape</code>（<code>Esc</code>）键返回命令模式</p>
<h3><a href="#插入模式"></a>插入模式</h3>
<p>在插入模式下，我们可以键入文件内容。在命令模式下按下 <code>i</code> 进入插入模式。</p>
<h3><a href="#创建文件"></a>创建文件</h3>
<p>我们可以通过下述命令建立一个文件（LCTT 译注：如果该文件存在，则编辑已有文件）：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi filename</span>

</code></pre><p>一旦该文件被创建或者打开，我们首先进入命令模式，我们需要进入输入模式以在文件中输入内容。我们通过前文已经大致上了解这两种模式。</p>
<h3><a href="#退出-vi"></a>退出 Vi</h3>
<p>如果是想从插入模式中退出，我们首先需要按下 <code>Esc</code> 键进入命令模式。接下来我们可以根据不同的需要分别使用两种命令退出 Vi。</p>
<ol>
<li>不保存退出 - 在命令模式中输入 <code>:q!</code></li>
<li>保存并退出 - 在命令模式中输入 <code>:wq</code></li>
</ol>
<h3><a href="#移动光标"></a>移动光标</h3>
<p>下面我们来讨论下那些在命令模式中移动光标的命令和选项：</p>
<ol>
<li><p><code>k</code> 将光标上移一行</p>
</li>
<li><p><code>j</code> 将光标下移一行</p>
</li>
<li><p><code>h</code> 将光标左移一个字母</p>
</li>
<li><p><code>l</code> 将光标右移一个字母</p>
<p>注意：如果你想通过一个命令上移或下移多行，或者左移、右移多个字母，你可以使用 <code>4k</code> 或者 <code>5l</code>，这两条命令会分别上移 4 行或者右移 5 个字母。</p>
</li>
<li><p><code>0</code> 将光标移动到该行行首</p>
</li>
<li><p><code>$</code> 将光标移动到该行行尾</p>
</li>
<li><p><code>nG</code> 将光标移动到第 n 行</p>
</li>
<li><p><code>G</code> 将光标移动到文件的最后一行</p>
</li>
<li><p><code>{</code> 将光标移动到上一段</p>
</li>
<li><p><code>}</code> 将光标移动到下一段</p>
</li>
</ol>
<p>除此之外还有一些命令可以用于控制光标的移动，但上述列出的这些命令应该就能应付日常工作所需。</p>
<h3><a href="#编辑文本"></a>编辑文本</h3>
<p>这部分会列出一些用于命令模式的命令，可以进入插入模式来编辑当前文件</p>
<ol>
<li><code>i</code> 在当前光标位置之前插入内容</li>
<li><code>I</code> 在光标所在行的行首插入内容</li>
<li><code>a</code> 在当前光标位置之后插入内容</li>
<li><code>A</code> 在光标所在行的行尾插入内容</li>
<li><code>o</code> 在当前光标所在行之后添加一行</li>
<li><code>O</code> 在当前光标所在行之前添加一行</li>
</ol>
<h3><a href="#删除文本"></a>删除文本</h3>
<p>以下的这些命令都只能在命令模式下使用，所以首先需要按下 <code>Esc</code> 进入命令模式，如果你正处于插入模式：</p>
<ol>
<li><code>dd</code> 删除光标所在的整行内容，可以在 <code>dd</code> 前增加数字，比如 <code>2dd</code> 可以删除从光标所在行开始的两行</li>
<li><code>d$</code> 删除从光标所在位置直到行尾</li>
<li><code>d^</code> 删除从光标所在位置直到行首</li>
<li><code>dw</code> 删除从光标所在位置直到下一个词开始的所有内容</li>
</ol>
<h3><a href="#复制与黏贴"></a>复制与黏贴</h3>
<ol>
<li><code>yy</code> 复制当前行，在 <code>yy</code> 前添加数字可以复制多行</li>
<li><code>p</code> 在光标之后粘贴复制行</li>
<li><code>P</code> 在光标之前粘贴复制行</li>
</ol>
<p>上述就是可以在 VI/VIM 编辑器上使用的一些基本命令。在未来的教程中还会继续教授一些更高级的命令。如果有任何疑问和建议，请在下方评论区留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/working-vi-editor-basics/">http://linuxtechlab.com/working-vi-editor-basics/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/ljgibbslf">ljgibbslf</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 LCTT 原创编译，Linux中国 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vi/Vim 编辑器：基础篇

## 原文链接
[https://www.zcfy.cc/article/working-with-vi-editor-the-basics](https://www.zcfy.cc/article/working-with-vi-editor-the-basics)

