---
title: 用这样的 Vi 配置来保存和组织你的笔记
reprint: true
categories: reprint
abbrlink: bcdc328b
date: 2018-10-21 00:00:00
---

{{% raw %}}

            <h1><a href="#用这样的-vi-配置来保存和组织你的笔记"></a>用这样的 Vi 配置来保存和组织你的笔记</h1>
<blockquote>
<p>Vimwiki 和 GitLab 是记录笔记的强大组合。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/9901c750dce2008ea7a459201121077c355fc257/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f636865636b6c6973745f68616e64735f7465616d5f636f6c6c61626f726174696f6e2e706e673f69746f6b3d753832516570506b"><img src="https://p0.ssl.qhimg.com/t014210e6adafef716e.png" alt="1"></a></p>
<p>用 vi 来管理 wiki 来记录你的笔记，这听起来不像是一个符合常规的主意，但当你的日常工作都会用到 vi , 那它是有意义的。</p>
<p>作为一个软件开发人员，使用同编码一样的工具来写笔记会更加简单。我想将我的笔记变成一种编辑器命令，无论我在哪里，都能够用管理我代码的方法来管理我的笔记。这便是我创建一个基于 vi 的环境来搭建我自己的知识库的原因。简单概括起来，我在笔记本电脑上用 vi 插件 <a href="https://vimwiki.github.io/">Viwiki</a> 来本地管理我的 wiki。用 Git 来进行版本控制（以保留一个中心化的更新版本），并用 GitLab 来进行在线修改（例如在我的手机上）。</p>
<h3><a href="#为什么用-wiki-来进行笔记保存是有意义"></a>为什么用 wiki 来进行笔记保存是有意义</h3>
<p>我尝试过许多不同的工具来持续的记录我的笔记，笔记里保存着我的灵感以及需要记住的任务安排。这包括线下的笔记本 （没错，纸质的）、特殊的记录笔记的软件，以及思维导图软件。</p>
<p>但每种方案都有不好一面，没有一个能够满足我所有的需求。例如<a href="https://opensource.com/article/17/8/mind-maps-creative-dashboard">思维导图</a>，能够很好的形象化你的想法（因而得名），但是这种工具的搜索功能很差（和纸质笔记本一样）。此外，当一段时间过去，思维导图会变得很难阅读，所以思维导图不适合长时间保存的笔记。</p>
<p>我为一个合作项目配置了 <a href="https://vimwiki.github.io/">DokuWiki</a>，我发现这个 wiki 模型符合了我大多数的需求。在 wiki 上，你能够创建一个笔记（和你在文本编辑器中所作的一样），并在笔记间创建链接。如果一个链接指向一个不存在的页面（你想让本页面添加一条还没有创建的信息）， wiki 会为你建立这个页面。这个特性使得 wiki 很好的适应了那些需要快速写下心中所想的人的需求，而仍将你的笔记保持在能够容易浏览和搜索关键字的页面结构中。</p>
<p>这看起来很有希望，并且配置 DokuWiki 也很容易，但我发现只是为了记个笔记而配置整个 wiki 需要花费太多工作。在一番搜索后，我发现了 Vimwiki，这是一个我想要的 vi 插件。因为我每天使用 vi，记录笔记就行编辑代码一样。甚至在 vimwiki 创建一个页面比 Dokuwiki 更简单。你只需要对光标下的单词按下回车键就行。如果没有文件是这个名字，vimwiki 会为你创建一个。</p>
<p>为了更一步的实现用每天都会使用的工具来做笔记的计划，我不仅用这个我最爱的 IDE 来写笔记，而且用 Git 和 GitLab —— 我最爱的代码管理工具 —— 在我的各个机器间分发我的笔记，以便我可以在线访问它们。我也是在 Gitlab 的在线 markdown 工具上用 markdown 语法来写的这篇文章。</p>
<h3><a href="#配置-vimwiki"></a>配置 vimwiki</h3>
<p>用你已有的插件管理工具来安装 vimwiki 很简单，只需要添加 vimwiki/vimwiki 到你的插件。对于我的喜爱的插件管理器 Vundle 来说，你只需要在 <code>/.vimrc</code> 中添加 <code>plugin vimwiki/vimwiki</code> 这一行，然后执行 <code>:source ~/.vimrc | PluginInstall</code> 就行。</p>
<p>下面是我的文件 <code>.vimrc</code> 的一部分，展示了一些 vimwiki 配置。你能在 <a href="https://vimwiki.github.io/">vimwiki</a> 页面学到更多的配置和使用的的信息。</p>
<pre><code class="hljs vim"><span class="hljs-keyword">let</span> wiki_1 = {}
<span class="hljs-keyword">let</span> wiki_1.path = <span class="hljs-string">'~/vimwiki_work_md/'</span>
<span class="hljs-keyword">let</span> wiki_1.<span class="hljs-keyword">syntax</span> = <span class="hljs-string">'markdown'</span>
<span class="hljs-keyword">let</span> wiki_1.ext = <span class="hljs-string">'.md'</span>

<span class="hljs-keyword">let</span> wiki_2 = {}
<span class="hljs-keyword">let</span> wiki_2.path = <span class="hljs-string">'~/vimwiki_personal_md/'</span>
<span class="hljs-keyword">let</span> wiki_2.<span class="hljs-keyword">syntax</span> = <span class="hljs-string">'markdown'</span>
<span class="hljs-keyword">let</span> wiki_2.ext = <span class="hljs-string">'.md'</span>

<span class="hljs-keyword">let</span> <span class="hljs-variable">g:vimwiki_list</span> = [wiki_1, wiki_2]
<span class="hljs-keyword">let</span> <span class="hljs-variable">g:vimwiki_ext2syntax</span> = {<span class="hljs-string">'.md'</span>: <span class="hljs-string">'markdown'</span>, <span class="hljs-string">'.markdown'</span>: <span class="hljs-string">'markdown'</span>, <span class="hljs-string">'.mdown'</span>: <span class="hljs-string">'markdown'</span>}

</code></pre><p>如你在上述配置中所见，我的配置还有一个优点。你能简单的区分个人和工作相关的笔记，而不用切换笔记软件。我想让我的个人笔记可以随时随地访问，而不想我的工作笔记同步到我私人的 GitLab 和计算机中。在 vimwiki 这样配置要比我试过的其他软件都要简单。</p>
<p>这个配置告诉 vimwiki 有两个不同 Wiki，都使用 markdown 语法（再一次，因为我的日常工作中天天都在用 markdown 语法）。我也告诉 Vimwiki 在哪个文件夹存储 wiki 页面。</p>
<p>如果你进入存储 wiki 页面的文件夹，你会找到你的 wiki 的普通的 markdown 页面文件，而没有其他特殊的 Vimwiki 相关内容，这使得很容易的初始化 Git 仓库和同步你的 wiki 到中心仓库。</p>
<h3><a href="#同步你的-wiki-到-gitlab"></a>同步你的 wiki 到 GitLab</h3>
<p>这一步检出一个 GitLab 项目到本地的 VimWiki 文件夹，这步操作和你操作任何 GitHub 的仓库相同，只不过因为我更喜欢保存我的笔记到我的私人 GitLab 仓库，所以我运行了一个 GitLab 实例用于我个人的项目。</p>
<p>GitLab 的 wiki 功能可以用来为你的项目创建 wiki 页面。这些 wiki 就是 Git 仓库本身。它们使用 markdown 语法，你懂得。</p>
<p>只需要初始化你需要的 wiki ，让它与你为笔记而创建的项目的 wiki 同步即可。</p>
<pre><code class="hljs dockerfile">cd ~/vimwiki_personal_md/
git init
git remote <span class="hljs-keyword">add</span><span class="bash"> origin git@your.gitlab.com:your_user/vimwiki_personal_md.wiki
</span>git <span class="hljs-keyword">add</span><span class="bash"> .
</span>git commit -m <span class="hljs-string">"Initial commit"</span>
git push -u origin master

</code></pre><p>在 GitLab 创建一个新的项目后，你就可以从页面上复制这些步骤的代码。唯一的改变是仓库地址结尾是 .wiki（而不是 .git）。 这会告诉 Git 克隆 wiki 仓库而不是项目本身。</p>
<p>就是这样！现在你能够通过 Git 来管理你的笔记，通过 GitLab wiki 用户界面来修改笔记。</p>
<p>你可能（像我一样）不想手动的为每个添加到笔记本的笔记创建一个提交。为了解决这个问题，我使用了 Vim 插件 <a href="https://github.com/chazy/dirsettings">chazy/dirsetting</a>。我添加一个 <code>.vimaddr</code> 文件，已经下面的内容：</p>
<pre><code class="hljs asciidoc"><span class="hljs-meta">:cd %:p:h</span>
silent! !git pull &gt; /dev/null
:e!
autocmd! BufWritePost * silent! !git add .;git commit -m "vim autocommit" &gt; /dev/null; git push &gt; /dev/null&amp;

</code></pre><p>每当我打开 Wiki 文件按下 <code>:w</code> 发布我的修改时，它就会更新到最新的版本。这样做会使你的本地文件与中心仓库保持同步。如果你有合并冲突，通常你需要解决它们。</p>
<p>目前，这就是以我的知识来互动的方法，我很喜欢这方法；请告诉我你对于这个方法的想法，可以在评论区分享你如何追踪笔记的方法。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/6/vimwiki-gitlab-notes">https://opensource.com/article/18/6/vimwiki-gitlab-notes</a></p>
<p>作者：<a href="https://opensource.com/users/ntlx">Manuel Dewald</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/singledo">octopus</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [用这样的 Vi 配置来保存和组织你的笔记](https://www.zcfy.cc/article/use-this-vi-setup-to-keep-and-organize-your-notes)
原文标题: 用这样的 Vi 配置来保存和组织你的笔记
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
