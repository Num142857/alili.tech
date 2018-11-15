---
title: 在 Linux 上复制和重命名文件
hidden: true
categories: reprint
slug: 9789051a
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#在-linux-上复制和重命名文件"></a>在 Linux 上复制和重命名文件</h1>
<blockquote>
<p>cp 和 mv 之外，在 Linux 上有更多的复制和重命名文件的命令。试试这些命令或许会惊艳到你，并能节省一些时间。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/afe018523f7a501e21ab056c82671a29fe7ed4ae/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30352f74726565732d3130303735393431352d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t0126c18690638d3f6b.jpg" alt=""></a></p>
<p>Linux 用户数十年来一直在使用简单的 <code>cp</code> 和 <code>mv</code> 命令来复制和重命名文件。这些命令是我们大多数人首先学到的，每天可能有数百万人在使用它们。但是还有其他技术、方便的方法和另外的命令，这些提供了一些独特的选项。</p>
<p>首先，我们来思考为什么你想要复制一个文件。你可能需要在另一个位置使用同一个文件，或者因为你要编辑该文件而需要一个副本，并且希望确保备有便利的备份以防万一需要恢复原始文件。这样做的显而易见的方式是使用像 <code>cp myfile myfile-orig</code> 这样的命令。</p>
<p>但是，如果你想复制大量的文件，那么这个策略可能就会变得很老。更好的选择是：</p>
<ul>
<li>在开始编辑之前，使用 <code>tar</code> 创建所有要备份的文件的存档。</li>
<li>使用 <code>for</code> 循环来使备份副本更容易。</li>
</ul>
<p>使用 <code>tar</code> 的方式很简单。对于当前目录中的所有文件，你可以使用如下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> tar cf myfiles.tar *</span>

</code></pre><p>对于一组可以用模式标识的文件，可以使用如下命令：</p>
<pre><code class="hljs stylus">$ tar cf myfiles<span class="hljs-selector-class">.tar</span> *<span class="hljs-selector-class">.txt</span>

</code></pre><p>在每种情况下，最终都会生成一个 <code>myfiles.tar</code> 文件，其中包含目录中的所有文件或扩展名为 .txt 的所有文件。</p>
<p>一个简单的循环将允许你使用修改后的名称来制作备份副本：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-keyword">for</span> file <span class="hljs-keyword">in</span> *</span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-keyword">do</span></span>
<span class="hljs-meta">&gt;</span><span class="bash"> cp <span class="hljs-variable">$file</span> <span class="hljs-variable">$file</span>-orig</span>
<span class="hljs-meta">&gt;</span><span class="bash"> <span class="hljs-keyword">done</span></span>

</code></pre><p>当你备份单个文件并且该文件恰好有一个长名称时，可以依靠使用 <code>tab</code> 来补全文件名（在输入足够的字母以便唯一标识该文件后点击 <code>Tab</code> 键）并使用像这样的语法将 <code>-orig</code> 附加到副本的名字后。</p>
<pre><code class="hljs applescript">$ cp <span class="hljs-built_in">file</span>-<span class="hljs-keyword">with</span>-a-very-long-<span class="hljs-built_in">name</span>{,-orig}

</code></pre><p>然后你有一个 <code>file-with-a-very-long-name</code> 和一个 <code>file-with-a-very-long-name-orig</code>。</p>
<h3><a href="#在-linux-上重命名文件"></a>在 Linux 上重命名文件</h3>
<p>重命名文件的传统方法是使用 <code>mv</code> 命令。该命令将文件移动到不同的目录，或原地更改其名称，或者同时执行这两个操作。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mv myfile /tmp</span>
<span class="hljs-meta">$</span><span class="bash"> mv myfile notmyfile</span>
<span class="hljs-meta">$</span><span class="bash"> mv myfile /tmp/notmyfile</span>

</code></pre><p>但我们也有 <code>rename</code> 命令来做重命名。使用 <code>rename</code> 命令的窍门是习惯它的语法，但是如果你了解一些 Perl，你可能发现它并不棘手。</p>
<p>有个非常有用的例子。假设你想重新命名一个目录中的文件，将所有的大写字母替换为小写字母。一般来说，你在 Unix 或 Linux 系统上找不到大量大写字母的文件，但你可以有。这里有一个简单的方法来重命名它们，而不必为它们中的每一个使用 <code>mv</code> 命令。 <code>/A-Z/a-z/</code> 告诉 <code>rename</code> 命令将范围 <code>A-Z</code> 中的任何字母更改为 <code>a-z</code> 中的相应字母。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ls</span>
Agenda Group.JPG MyFile
<span class="hljs-meta">$</span><span class="bash"> rename <span class="hljs-string">'y/A-Z/a-z/'</span> *</span>
<span class="hljs-meta">$</span><span class="bash"> ls</span>
agenda group.jpg myfile

</code></pre><p>你也可以使用 <code>rename</code> 来删除文件扩展名。也许你厌倦了看到带有 .txt 扩展名的文本文件。简单删除这些扩展名 —— 用一个命令。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ls</span>
agenda.txt notes.txt weekly.txt
<span class="hljs-meta">$</span><span class="bash"> rename <span class="hljs-string">'s/.txt//'</span> *</span>
<span class="hljs-meta">$</span><span class="bash"> ls</span>
agenda notes weekly

</code></pre><p>现在让我们想象一下，你改变了心意，并希望把这些扩展名改回来。没问题。只需修改命令。窍门是理解第一个斜杠前的 <code>s</code> 意味着“替代”。前两个斜线之间的内容是我们想要改变的东西，第二个斜线和第三个斜线之间是改变后的东西。所以，<code>$</code> 表示文件名的结尾，我们将它改为 <code>.txt</code>。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ls</span>
agenda notes weekly
<span class="hljs-meta">$</span><span class="bash"> rename <span class="hljs-string">'s/$/.txt/'</span> *</span>
<span class="hljs-meta">$</span><span class="bash"> ls</span>
agenda.txt notes.txt weekly.txt

</code></pre><p>你也可以更改文件名的其他部分。牢记 <code>s/旧内容/新内容/</code> 规则。</p>
<pre><code class="hljs lsl">$ ls
draft-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-03</span> draft-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-04</span> draft-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-05</span>
$ rename 's/draft/approved/' *minutes*
$ ls
approved-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-03</span> approved-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-04</span> approved-minutes<span class="hljs-number">-2018</span><span class="hljs-number">-05</span>

</code></pre><p>在上面的例子中注意到，当我们在 <code>s/old/new/</code> 中使用 <code>s</code> 时，我们用另一个名称替换名称的一部分。当我们使用 <code>y</code> 时，我们就是直译（将字符从一个范围替换为另一个范围）。</p>
<h3><a href="#总结"></a>总结</h3>
<p>现在有很多复制和重命名文件的方法。我希望其中的一些会让你在使用命令行时更愉快。</p>
<p>在 <a href="https://www.facebook.com/NetworkWorld/">Facebook</a> 和 <a href="https://www.linkedin.com/company/network-world">LinkedIn</a> 上加入 Network World 社区来对热门主题评论。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3276349/linux/copying-and-renaming-files-on-linux.html">https://www.networkworld.com/article/3276349/linux/copying-and-renaming-files-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [在 Linux 上复制和重命名文件](https://www.zcfy.cc/article/copying-and-renaming-files-on-linux)
原文标题: 在 Linux 上复制和重命名文件
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
