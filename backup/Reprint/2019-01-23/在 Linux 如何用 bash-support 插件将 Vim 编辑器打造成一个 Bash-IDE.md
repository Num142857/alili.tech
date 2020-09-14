---
title: '在 Linux 如何用 bash-support 插件将 Vim 编辑器打造成一个 Bash-IDE' 
date: 2019-01-23 2:30:08
hidden: true
slug: pffy78lc53
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-如何用-bash-support-插件将-vim-编辑器打造成一个-bash-ide"></a>在 Linux 如何用 bash-support 插件将 Vim 编辑器打造成一个 Bash-IDE</h1>
<p>IDE（<a href="http://www.tecmint.com/best-linux-ide-editors-source-code-editors/">集成开发环境</a>）就是这样一个软件，它为了最大化程序员生产效率，提供了很多编程所需的设施和组件。 IDE 将所有开发工作集中到一个程序中，使得程序员可以编写、修改、编译、部署以及调试程序。</p>
<p>在这篇文章中，我们会介绍如何通过使用 bash-support vim 插件将 <a href="http://www.tecmint.com/vi-editor-usage/">Vim 编辑器安装和配置</a> 为一个 Bash-IDE。</p>
<h4><a href="#什么是-bash-supportvim-插件"></a>什么是 bash-support.vim 插件？</h4>
<p>bash-support 是一个高度定制化的 vim 插件，它允许你插入：文件头、补全语句、注释、函数、以及代码块。它也使你可以进行语法检查、使脚本可执行、一键启动调试器；而完成所有的这些而不需要关闭编辑器。</p>
<p>它使用快捷键（映射），通过有组织地、一致的文件内容编写/插入，使得 bash 脚本变得有趣和愉快。</p>
<p>插件当前版本是 4.3，4.0 版本 重写了之前的 3.12.1 版本，4.0 及之后的版本基于一个全新的、更强大的、和之前版本模板语法不同的模板系统。</p>
<h3><a href="#如何在-linux-中安装-bash-support-插件"></a>如何在 Linux 中安装 Bash-support 插件</h3>
<p>用下面的命令下载最新版本的 bash-support 插件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> Downloads</span>
<span class="hljs-meta">$</span><span class="bash"> curl http://www.vim.org/scripts/download_script.php?src_id=24452 &gt;bash-support.zip</span>

</code></pre><p>按照如下步骤安装；在你的主目录创建 <code>.vim</code> 目录（如果它不存在的话），进入该目录并提取 bash-support.zip 内容：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkdir ~/.vim</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> .vim</span>
<span class="hljs-meta">$</span><span class="bash"> unzip ~/Downloads/bash-support.zip</span>

</code></pre><p>下一步，在 <code>.vimrc</code> 文件中激活它：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi ~/.vimrc</span>

</code></pre><p>并插入下面一行：</p>
<pre><code class="hljs applescript">filetype plug-<span class="hljs-keyword">in</span> <span class="hljs-keyword">on</span>   
<span class="hljs-keyword">set</span> <span class="hljs-built_in">number</span>   <span class="hljs-comment"># 可选，增加这行以在 vim 中显示行号</span>

</code></pre><h3><a href="#如何在-vim-编辑器中使用-bash-support-插件"></a>如何在 Vim 编辑器中使用 Bash-support 插件</h3>
<p>为了简化使用，通常使用的结构和特定操作可以分别通过键映射来插入/执行。 <code>~/.vim/doc/bashsupport.txt</code> 和 <code>~/.vim/bash-support/doc/bash-hotkeys.pdf</code> 或者 <code>~/.vim/bash-support/doc/bash-hotkeys.tex</code> 文件中介绍了映射。</p>
<p><strong>重要：</strong></p>
<ol>
<li>所有映射（<code>(\)+charater(s)</code> 组合）都是针对特定文件类型的：为了避免和其它插件的映射冲突，它们只适用于 <code>sh</code> 文件。</li>
<li>使用键映射的时候打字速度也有关系，引导符 <code>('\')</code> 和后面字符的组合要在特定短时间内才能识别出来（很可能少于 3 秒 - 基于假设）。</li>
</ol>
<p>下面我们会介绍和学习使用这个插件一些显著的功能：</p>
<h4><a href="#如何为新脚本自动生成文件头"></a>如何为新脚本自动生成文件头</h4>
<p>看下面的示例文件头，为了要在你所有的新脚本中自动创建该文件头，请按照以下步骤操作。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Script-Header-Options.png"><img src="https://p0.ssl.qhimg.com/t015fa65bd0dd44b47c.png" alt="脚本示例文件头选项"></a></p>
<p><em>脚本示例文件头选项</em></p>
<p>首先设置你的个人信息（作者名称、作者参考、组织、公司等）。在一个 Bash 缓冲区（像下面这样打开一个测试脚本）中使用映射 <code>\ntw</code> 启动模板设置向导。</p>
<p>选中选项 1 设置个性化文件，然后按回车键。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi test.sh</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Set-Personalization-in-Scripts.png"><img src="https://p0.ssl.qhimg.com/t01b8483801924ea998.png" alt="在脚本文件中设置个性化信息"></a></p>
<p><em>在脚本文件中设置个性化信息</em></p>
<p>之后，再次输入回车键。然后再一次选中选项 1 设置个性化文件的路径并输入回车。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Set-Personalization-File-Location.png"><img src="https://p0.ssl.qhimg.com/t01e0f7291d883586ba.png" alt="设置个性化文件路径"></a></p>
<p><em>设置个性化文件路径</em></p>
<p>设置向导会把目标文件 <code>.vim/bash-support/rc/personal.templates</code> 拷贝到 <code>.vim/templates/personal.templates</code>，打开并编辑它，在这里你可以输入你的信息。</p>
<p>按 <code>i</code> 键像截图那样在单引号中插入合适的值。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-Info-in-Script-Header.png"><img src="https://p0.ssl.qhimg.com/t012ef823ca6fe4de47.png" alt="在脚本文件头添加信息"></a></p>
<p><em>在脚本文件头添加信息</em></p>
<p>一旦你设置了正确的值，输入 <code>:wq</code> 保存并退出文件。关闭 Bash 测试脚本，打开另一个脚本来测试新的配置。现在文件头中应该有和下面截图类似的你的个人信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> test2.sh</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Auto-Adds-Header-to-Script.png"><img src="https://p0.ssl.qhimg.com/t01c1ef3ef40acf60eb.png" alt="自动添加文件头到脚本"></a></p>
<p><em>自动添加文件头到脚本</em></p>
<h4><a href="#添加-bash-support-插件帮助信息"></a>添加 Bash-support 插件帮助信息</h4>
<p>为此，在 Vim 命令行输入下面的命令并按回车键，它会创建 <code>.vim/doc/tags</code> 文件：</p>
<pre><code class="hljs elixir"><span class="hljs-symbol">:helptags</span> <span class="hljs-variable">$HOME</span>/.vim/doc/

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-Plugin-Help-in-Vi-Editor.png"><img src="" alt="在 Vi 编辑器添加插件帮助"></a></p>
<p><em>在 Vi 编辑器添加插件帮助</em></p>
<h4><a href="#如何在-shell-脚本中插入注释"></a>如何在 Shell 脚本中插入注释</h4>
<p>要插入一个块注释，在普通模式下输入 <code>\cfr</code>：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-Comments-to-Scripts.png"><img src="https://p0.ssl.qhimg.com/t01c1c81b2c331e554d.png" alt="添加注释到脚本"></a></p>
<p><em>添加注释到脚本</em></p>
<h4><a href="#如何在-shell-脚本中插入语句"></a>如何在 Shell 脚本中插入语句</h4>
<p>下面是一些用于插入语句的键映射（<code>n</code> – 普通模式, <code>i</code> – 插入模式，<code>v</code> 可视模式）：</p>
<ol>
<li><code>\sc</code> – <code>case in … esac</code> （n, i）</li>
<li><code>\sei</code> – <code>elif then</code> （n, i）</li>
<li><code>\sf</code> – <code>for in do done</code> （n, i, v）</li>
<li><code>\sfo</code> – <code>for ((…)) do done</code> （n, i, v）</li>
<li><code>\si</code> – <code>if then fi</code> （n, i, v）</li>
<li><code>\sie</code> – <code>if then else fi</code> （n, i, v）</li>
<li><code>\ss</code> – <code>select in do done</code> （n, i, v）</li>
<li><code>\su</code> – <code>until do done</code> （n, i, v）</li>
<li><code>\sw</code> – <code>while do done</code> （n, i, v）</li>
<li><code>\sfu</code> – <code>function</code> （n, i, v）</li>
<li><code>\se</code> – <code>echo -e "…"</code> （n, i, v）</li>
<li><code>\sp</code> – <code>printf "…"</code> （n, i, v）</li>
<li><code>\sa</code> – 数组元素, <code>${.[.]}</code> （n, i, v） 和其它更多的数组功能。</li>
</ol>
<h4><a href="#插入一个函数和函数头"></a>插入一个函数和函数头</h4>
<p>输入 <code>\sfu</code> 添加一个新的空函数，然后添加函数名并按回车键创建它。之后，添加你的函数代码。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Insert-New-Function-in-Script.png"><img src="https://p0.ssl.qhimg.com/t019706f8e168097d18.png" alt="在脚本中插入新函数"></a></p>
<p><em>在脚本中插入新函数</em></p>
<p>为了给上面的函数创建函数头，输入 <code>\cfu</code>，输入函数名称，按回车键并填入合适的值（名称、介绍、参数、返回值）：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Create-Header-Function-in-Script.png"><img src="https://p0.ssl.qhimg.com/t019706f8e168097d18.png" alt="在脚本中创建函数头"></a></p>
<p><em>在脚本中创建函数头</em></p>
<h4><a href="#更多关于添加-bash-语句的例子"></a>更多关于添加 Bash 语句的例子</h4>
<p>下面是一个使用 <code>\si</code> 插入一条 <code>if</code> 语句的例子：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-Insert-Statement-to-Script.png"><img src="https://p0.ssl.qhimg.com/t0189e3d02cc0aa4ad5.png" alt="在脚本中插入语句"></a></p>
<p><em>在脚本中插入语句</em></p>
<p>下面的例子显示使用 <code>\se</code> 添加一条 <code>echo</code> 语句：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-echo-Statement-to-Script.png"><img src="https://p0.ssl.qhimg.com/t01b4b6fdd2083e26a8.png" alt="在脚本中添加 echo 语句"></a></p>
<p><em>在脚本中添加 echo 语句</em></p>
<h4><a href="#如何在-vi-编辑器中使用运行操作"></a>如何在 Vi 编辑器中使用运行操作</h4>
<p>下面是一些运行操作键映射的列表：</p>
<ol>
<li><code>\rr</code> – 更新文件，运行脚本（n, i）</li>
<li><code>\ra</code> – 设置脚本命令行参数 （n, i）</li>
<li><code>\rc</code> – 更新文件，检查语法 （n, i）</li>
<li><code>\rco</code> – 语法检查选项 （n, i）</li>
<li><code>\rd</code> – 启动调试器（n, i）</li>
<li><code>\re</code> – 使脚本可/不可执行(*) （n, i）</li>
</ol>
<h4><a href="#使脚本可执行"></a>使脚本可执行</h4>
<p>编写完脚本后，保存它然后输入 <code>\re</code> 和回车键使它可执行。</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/make-script-executable.png"><img src="https://p0.ssl.qhimg.com/t012a99a726f795f08e.png" alt="使脚本可执行"></a></p>
<p><em>使脚本可执行</em></p>
<h4><a href="#如何在-bash-脚本中使用预定义代码片段"></a>如何在 Bash 脚本中使用预定义代码片段</h4>
<p>预定义代码片段是为了特定目的包含了已写好代码的文件。为了添加代码段，输入 <code>\nr</code> 和 <code>\nw</code> 读/写预定义代码段。输入下面的命令列出默认的代码段：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> .vim/bash-support/codesnippets/</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/list-of-code-snippets.png"><img src="https://p0.ssl.qhimg.com/t014855de908271767c.png" alt="代码段列表"></a></p>
<p><em>代码段列表</em></p>
<p>为了使用代码段，例如 free-software-comment，输入 <code>\nr</code> 并使用自动补全功能选择它的名称，然后输入回车键：</p>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/Add-Code-Snippet-to-Script.png"><img src="https://p0.ssl.qhimg.com/t017abf6dc7f40c7b76.png" alt="添加代码段到脚本"></a></p>
<p><em>添加代码段到脚本</em></p>
<h4><a href="#创建自定义预定义代码段"></a>创建自定义预定义代码段</h4>
<p>可以在  <code>~/.vim/bash-support/codesnippets/</code> 目录下编写你自己的代码段。另外，你还可以从你正常的脚本代码中创建你自己的代码段：</p>
<ol>
<li>选择你想作为代码段的部分代码，然后输入  <code>\nw</code> 并给它一个相近的文件名。</li>
<li>要读入它，只需要输入  <code>\nr</code> 然后使用文件名就可以添加你自定义的代码段。</li>
</ol>
<h4><a href="#在当前光标处查看内建和命令帮助"></a>在当前光标处查看内建和命令帮助</h4>
<p>要显示帮助，在普通模式下输入：</p>
<ol>
<li><code>\hh</code> – 内建帮助</li>
<li><code>\hm</code> – 命令帮助</li>
</ol>
<p><a href="http://www.tecmint.com/wp-content/uploads/2017/02/View-Built-in-Command-Help.png"><img src="https://p0.ssl.qhimg.com/t01ea6a9f17cbec8410.png" alt="查看内建命令帮助"></a></p>
<p><em>查看内建命令帮助</em></p>
<p>更多参考资料，可以查看文件：</p>
<pre><code class="hljs dts">~/.vim<span class="hljs-meta-keyword">/doc/</span>bashsupport.txt  <span class="hljs-meta">#在线文档的副本</span>
~/.vim<span class="hljs-meta-keyword">/doc/</span>tags

</code></pre><ul>
<li>访问 Bash-support 插件 GitHub 仓库：<a href="https://github.com/WolfgangMehner/bash-support">https://github.com/WolfgangMehner/bash-support</a></li>
<li>在 Vim 网站访问 Bash-support 插件：<a href="http://www.vim.org/scripts/script.php?script_id=365">http://www.vim.org/scripts/script.php?script_id=365</a></li>
</ul>
<p>就是这些啦，在这篇文章中，我们介绍了在 Linux 中使用 Bash-support 插件安装和配置 Vim 为一个 Bash-IDE 的步骤。快去发现这个插件其它令人兴奋的功能吧，一定要在评论中和我们分享哦。</p>
<hr>
<p>作者简介：</p>
<p>Aaron Kili 是一个 Linux 和 F.O.S.S 爱好者、Linux 系统管理员、网络开发人员，现在也是 TecMint 的内容创作者，她喜欢和电脑一起工作，坚信共享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/use-vim-as-bash-ide-using-bash-support-in-linux/">http://www.tecmint.com/use-vim-as-bash-ide-using-bash-support-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/ictlyh">ictlyh</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 如何用 bash-support 插件将 Vim 编辑器打造成一个 Bash-IDE

## 原文链接
[https://www.zcfy.cc/article/how-to-make-vim-editor-as-bash-ide-using-bash-support-plugin-in-linux](https://www.zcfy.cc/article/how-to-make-vim-editor-as-bash-ide-using-bash-support-plugin-in-linux)

