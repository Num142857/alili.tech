---
title: '如何在 Vim 中使用模式行进行文件特定的设置' 
date: 2019-01-23 2:30:08
hidden: true
slug: dz8ud34am6k
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-vim-中使用模式行进行文件特定的设置"></a>如何在 Vim 中使用模式行进行文件特定的设置</h1>
<p>虽然<a href="https://linux.cn/article-7901-1.html">插件</a>毫无疑问是 Vim 最大的优势，然而，还有其它一些功能，使得它成为当今 Linux 用户中最强大、功能最丰富的文本编辑器/IDE 之一。其中一个功能就是可以根据文件做特定的设置。我们可以使用该编辑器的模式行（Modeline）特性来实现该功能。</p>
<p>在这篇文章中，我将讨论如何使用 Vim 的<a href="http://vim.wikia.com/wiki/Modeline_magic">模式行（Modeline）</a>特性来简单的理解一些例子。</p>
<p>在开始之前，值得提醒一下，这篇教程中提及的所有例子、命令和指令都已经在 Ubuntu 16.04 中使用 Vim 7.4 版本测试过。</p>
<h3><a href="#vim-模式行"></a>VIM 模式行</h3>
<h4><a href="#用法"></a>用法</h4>
<p>正如上面已经提到的， Vim 的模式行特性让你能够进行特定于文件的更改。比如，假设你想把项目中的一个特定文件中的所有制表符用空格替换，并且确保这个更改不会影响到其它所有文件。这是模式行帮助你完成你想做的事情的一个理想情况。</p>
<p>因此，你可以考虑将下面这一行加入文件的开头或结尾来完成这件事。</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> vim: <span class="hljs-built_in">set</span> expandtab:</span>

</code></pre><p>（LCTT 译注：模式行就是一行以注释符，如 <code>#</code>、<code>//</code>、<code>/*</code> 开头，间隔一个空格，以 <code>vim:</code> 关键字触发的设置命令。可参看：<a href="http://vim.wikia.com/wiki/Modeline_magic">http://vim.wikia.com/wiki/Modeline_magic</a> ）</p>
<p>如果你是在 Linux 系统上尝试上面的练习来测试用例，很有可能它将不会像你所期望的那样工作。如果是这样，也不必担心，因为某些情况下，模式行特性需要先激活才能起作用（出于安全原因，在一些系统比如 Debian、Ubuntu、GGentoo 和 OSX 上默认情况下禁用）。</p>
<p>为了启用该特性，打开 <code>.vimrc</code> 文件（位于 <code>home</code> 目录），然后加入下面一行内容：</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">set</span> modeline

</code></pre><p>现在，无论何时你在该文件输入一个制表符然后保存时（文件中已输入 <code>expandtab</code> 模式行命令的前提下），都会被自动转换为空格。</p>
<p>让我们考虑另一个用例。假设在 Vim 中， 制表符默认设置为 4 个空格，但对于某个特殊的文件，你想把它增加到 8 个。对于这种情况，你需要在文件的开头或末尾加上下面这行内容：</p>
<pre><code class="hljs yaml"><span class="hljs-string">//</span> <span class="hljs-attr">vim:</span> <span class="hljs-attr">noai:ts=8:</span>

</code></pre><p>现在，输入一个制表符，你会看到，空格的数量为 8 个。</p>
<p>你可能已经注意到我刚才说的，这些模式行命令需要加在靠近文件的顶部或底部。如果你好奇为什么是这样，那么理由是该特性以这种方式设计的。下面这一行（来自 Vim 官方文件）将会解释清楚：</p>
<blockquote>
<p>“模式行不能随意放在文件中的任何位置：它需要放在文件中的前几行或最后几行。<code>modelines</code> 变量控制 Vim 检查模式行在文件中的确切位置。请查看 <code>:help modelines</code> 。默认情况下，设置为 5 行。”</p>
</blockquote>
<p>下面是 <code>:help modelines</code> 命令（上面提到的）输出的内容：</p>
<blockquote>
<p>如果 <code>modeline</code> 已启用并且 <code>modelines</code> 给出了行数，那么便在相应位置查找 <code>set</code> 命令。如果 <code>modeline</code> 禁用或 <code>modelines</code> 设置的行数为 0 则不查找。</p>
</blockquote>
<p>尝试把模式行命令置于超出 5 行的范围（距离文件底部和顶部的距离均超过 5 行），你会发现， 制表符将会恢复为 Vim 默认数目的空格 —　在我的情况里是 4 个空格。</p>
<p>然而，你可以按照自己的意愿改变默认行数，只需在你的 <code>.vimrc</code> 文件中加入下面一行命令</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">set</span> modelines=[新值]

</code></pre><p>比如，我把值从 5 增加到了 10 。</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">set</span> <span class="hljs-attribute">modelines</span>=10

</code></pre><p>这意味着，现在我可以把模式行命令置于文件前 10 行或最后 10 行的任意位置。</p>
<p>继续，无论何时，当你在编辑一个文件的时候，你可以输入下面的命令（在 Vim 编辑器的命令模式下输入）来查看当前与命令行相关的设置以及它们最新的设置。</p>
<pre><code class="hljs routeros">:verbose <span class="hljs-builtin-name">set</span> modeline? modelines?

</code></pre><p>比如，在我的例子中，上面的命令产生了如下所示的输出：</p>
<pre><code class="hljs routeros"> modeline
      Last <span class="hljs-builtin-name">set</span> <span class="hljs-keyword">from</span> ~/.vimrc
 <span class="hljs-attribute">modelines</span>=10
      Last <span class="hljs-builtin-name">set</span> <span class="hljs-keyword">from</span> ~/.vimrc

</code></pre><p>关于 Vim 的模式行特性，你还需要知道一些重要的点：</p>
<ul>
<li>默认情况下，当 Vim 以非兼容（<code>nocompatible</code>）模式运行时该特性是启用的，但需要注意的是，在一些发行版中，出于安全考虑，系统的 <code>vimrc</code> 文件禁用了该选项。</li>
<li>默认情况下，当以 root 权限编辑文件时，该特性被禁用（如果你是使用 <code>sudo</code> 方式打开该文件，那么该特性依旧能够正常工作）。</li>
<li>通过 <code>set</code> 来设置模式行，其结束于第一个冒号，而非反斜杠。不使用 <code>set</code>，则后面的文本都是选项。比如，<code>/* vim: noai:ts=4:sw=4 */</code> 是一个无效的模式行。</li>
</ul>
<p>（LCTT 译注：关于模式行中的 <code>set</code>，上述描述指的是：如果用 <code>set</code> 来设置，那么当发现第一个 <code>:</code> 时，表明选项结束，后面的 <code>*/</code> 之类的为了闭合注释而出现的文本均无关；而如果不用 <code>set</code> 来设置，那么以 <code>vim:</code> 起头的该行所有内容均视作选项。 ）</p>
<h4><a href="#安全考虑"></a>安全考虑</h4>
<p>令人沮丧的是， Vim 的模式行特性可能会造成安全性问题。事实上，在过去，已经报道过多个和模式行相关的问题，包括 <a href="https://tools.cisco.com/security/center/viewAlert.x?alertId=13223">shell 命令注入</a>，<a href="http://usevim.com/2012/03/28/modelines/">任意命令执行</a>和<a href="https://tools.cisco.com/security/center/viewAlert.x?alertId=5169">无授权访问</a>等。我知道，这些问题发生在很早的一些时候，现在应该已经修复好了，但是，这提醒了我们，模式行特性有可能会被黑客滥用。</p>
<h3><a href="#结论"></a>结论</h3>
<p>模式行可能是 Vim 编辑器的一个高级命令，但是它并不难理解。毫无疑问，它的学习曲线会有一些复杂，但是不需多问也知道，该特性是多么的有用。当然，出于安全考虑，在启用并使用该选项前，你需要对自己的选择进行权衡。</p>
<p>你有使用过模式行特性吗？你的体验是什么样的？记得在下面的评论中分享给我们。</p>
<hr>
<p>via: <a href="https://www.howtoforge.com/tutorial/vim-modeline-settings/">https://www.howtoforge.com/tutorial/vim-modeline-settings/</a></p>
<p>作者：<a href="https://www.howtoforge.com/tutorial/vim-modeline-settings/">Ansh</a> 译者：<a href="https://github.com/ucasFL">ucasFL</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Vim 中使用模式行进行文件特定的设置

## 原文链接
[https://www.zcfy.cc/article/how-to-make-file-specific-setting-changes-in-vim-using-modeline](https://www.zcfy.cc/article/how-to-make-file-specific-setting-changes-in-vim-using-modeline)

