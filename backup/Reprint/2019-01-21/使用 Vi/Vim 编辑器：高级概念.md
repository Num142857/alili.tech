---
title: '使用 Vi/Vim 编辑器：高级概念' 
date: 2019-01-21 2:30:06
hidden: true
slug: 5j6dnp8ps4u
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-vivim-编辑器高级概念"></a>使用 Vi/Vim 编辑器：高级概念</h1>
<p>早些时候我们已经讨论了一些关于 VI/VIM 编辑器的基础知识，但是 VI 和 VIM 都是非常强大的编辑器，还有很多其他的功能可以和编辑器一起使用。在本教程中，我们将学习 VI/VIM 编辑器的一些高级用法。</p>
<p>（<strong>推荐阅读</strong>：[使用 VI 编辑器：基础知识] <a href="http://linuxtechlab.com/working-vi-editor-basics/">1</a>）</p>
<h3><a href="#使用-vivim-编辑器打开多个文件"></a>使用 VI/VIM 编辑器打开多个文件</h3>
<p>要打开多个文件，命令将与打开单个文件相同。我们只要添加第二个文件的名称。</p>
<pre><code class="hljs gams"> <span class="hljs-symbol">$</span> vi file1 file2 <span class="hljs-keyword">file</span> <span class="hljs-number">3</span>

</code></pre><p>要浏览到下一个文件，我们可以（在 vim 命令模式中）使用：</p>
<pre><code class="hljs clojure"><span class="hljs-symbol">:n</span>

</code></pre><p>或者我们也可以使用</p>
<pre><code class="hljs css"><span class="hljs-selector-pseudo">:e</span> <span class="hljs-selector-tag">filename</span>

</code></pre><h3><a href="#在编辑器中运行外部命令"></a>在编辑器中运行外部命令</h3>
<p>我们可以在 vi 编辑器内部运行外部的 Linux/Unix 命令，也就是说不需要退出编辑器。要在编辑器中运行命令，如果在插入模式下，先返回到命令模式，我们使用 BANG 也就是 <code>!</code> 接着是需要使用的命令。运行命令的语法是：</p>
<pre><code class="hljs livecodeserver">:! <span class="hljs-keyword">command</span>

</code></pre><p>这是一个例子：</p>
<pre><code class="hljs erlang-repl">:! df -H

</code></pre><h3><a href="#根据模板搜索"></a>根据模板搜索</h3>
<p>要在文本文件中搜索一个单词或模板，我们在命令模式下使用以下两个命令：</p>
<ul>
<li>命令 <code>/</code> 代表正向搜索模板</li>
<li>命令 <code>?</code> 代表正向搜索模板</li>
</ul>
<p>这两个命令都用于相同的目的，唯一不同的是它们搜索的方向。一个例子是：</p>
<p>如果在文件的开头向前搜索，</p>
<pre><code class="hljs coq">:/ search <span class="hljs-built_in">pattern</span> 

</code></pre><p>如果在文件末尾向后搜索，</p>
<pre><code class="hljs coq">:? search <span class="hljs-built_in">pattern</span>

</code></pre><h3><a href="#搜索并替换一个模式"></a>搜索并替换一个模式</h3>
<p>我们可能需要搜索和替换我们的文本中的单词或模式。我们不是从整个文本中找到单词的出现的地方并替换它，我们可以在命令模式中使用命令来自动替换单词。使用搜索和替换的语法是：</p>
<pre><code class="hljs perl">:<span class="hljs-regexp">s/pattern_to_be_found/New_pattern/g</span>

</code></pre><p>假设我们想要将单词 “alpha” 用单词 “beta” 代替，命令就是这样：</p>
<pre><code class="hljs perl">:<span class="hljs-regexp">s/alpha/beta/g</span>

</code></pre><p>如果我们只想替换第一个出现的 “alpha”，那么命令就是：</p>
<pre><code class="hljs perl">$ :<span class="hljs-regexp">s/alpha/beta/</span>

</code></pre><h3><a href="#使用-set-命令"></a>使用 set 命令</h3>
<p>我们也可以使用 set 命令自定义 vi/vim 编辑器的行为和外观。下面是一些可以使用 set 命令修改 vi/vim 编辑器行为的选项列表：</p>
<pre><code class="hljs vbnet">:<span class="hljs-keyword">set</span> ic  <span class="hljs-comment">' 在搜索时忽略大小写</span>

:<span class="hljs-keyword">set</span> smartcase <span class="hljs-comment">' 搜索强制区分大小写</span>

:<span class="hljs-keyword">set</span> nu <span class="hljs-comment">' 在每行开始显示行号</span>

:<span class="hljs-keyword">set</span> hlsearch <span class="hljs-comment">' 高亮显示匹配的单词</span>

:<span class="hljs-keyword">set</span> ro <span class="hljs-comment">' 将文件类型更改为只读</span>

:<span class="hljs-keyword">set</span> term <span class="hljs-comment">' 打印终端类型</span>

:<span class="hljs-keyword">set</span> ai <span class="hljs-comment">' 设置自动缩进</span>

:<span class="hljs-keyword">set</span> noai <span class="hljs-comment">' 取消自动缩进</span>

</code></pre><p>其他一些修改 vi 编辑器的命令是：</p>
<pre><code class="hljs vbnet">:colorscheme <span class="hljs-comment">' 用来改变编辑器的配色方案 。（仅适用于 VIM 编辑器）</span>

:syntax <span class="hljs-keyword">on</span> <span class="hljs-comment">' 为 .xml、.html 等文件打开颜色方案。（仅适用于VIM编辑器）</span>

</code></pre><p>这篇结束了本系列教程，请在下面的评论栏中提出你的疑问/问题或建议。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/working-vivim-editor-advanced-concepts/">http://linuxtechlab.com/working-vivim-editor-advanced-concepts/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vi/Vim 编辑器：高级概念

## 原文链接
[https://www.zcfy.cc/article/working-with-vi-vim-editor-advanced-concepts](https://www.zcfy.cc/article/working-with-vi-vim-editor-advanced-concepts)

