---
title: '在 Git 中怎样克隆、修改、添加和删除文件？' 
date: 2019-01-20 2:30:11
hidden: true
slug: 7quywzjqnoj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-git-中怎样克隆修改添加和删除文件"></a>在 Git 中怎样克隆、修改、添加和删除文件？</h1>
<p>在 <a href="https://linux.cn/article-9319-1.html">本系列的第一篇文章</a> 开始使用 Git 时，我们创建了一个简单的 Git 仓库，并用我们的计算机连接到它，向其中添加一个文件。在本文中，我们将学习一些关于 Git 的其他内容，即如何克隆（下载）、修改、添加和删除 Git 仓库中的文件。</p>
<h3><a href="#让我们来克隆一下"></a>让我们来克隆一下</h3>
<p>假设你在 GitHub 上已经有一个 Git 仓库，并且想从它那里获取你的文件——也许你在你的计算机上丢失了本地副本，或者你正在另一台计算机上工作，但是想访问仓库中的文件，你该怎么办？从 GitHub 下载你的文件？没错！在 Git 术语中我们称之为“克隆clone”。（你也可以将仓库作为 ZIP 文件下载，但我们将在本文中探讨克隆方式。）</p>
<p>让我们克隆在上一篇文章中创建的名为 Demo 的仓库。（如果你还没有创建 Demo 仓库，请跳回到<a href="https://linux.cn/article-9319-1.html">那篇文章</a>并在继续之前执行那些步骤）要克隆文件，只需打开浏览器并导航到 <code>https://github.com/&lt;your_username&gt;/Demo</code> (其中 <code>&lt;your_username&gt;</code> 是你仓库的名称。例如，我的仓库是 <code>https://github.com/kedark3/Demo</code>)。一旦你导航到该 URL，点击“克隆或下载Clone or download”按钮，你的浏览器看起来应该是这样的：</p>
<p><a href="https://camo.githubusercontent.com/97991fe8f237deaa36f5010fd746d27488483117/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531312e706e673f69746f6b3d774a59715a794258"><img src="https://p0.ssl.qhimg.com/t018ff1b501b9edcda4.png" alt=""></a></p>
<p>正如你在上面看到的，“使用 HTTPS 克隆Clone with HTTPS”选项已打开。从该下拉框中复制你的仓库地址（<code>https://github.com/&lt;your_username&gt;/Demo.git</code>），打开终端并输入以下命令将 GitHub 仓库克隆到你的计算机：</p>
<pre><code class="hljs crmsh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/<span class="hljs-tag">&lt;your_username&gt;</span>/Demo.git

</code></pre><p>然后，要查看 <code>Demo</code> 目录中的文件列表，请输入以下命令：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">ls</span> Demo/

</code></pre><p>终端看起来应该是这样的：</p>
<p><a href="https://camo.githubusercontent.com/cc5c1bcbabcac90f08e77641250396b17aaaedcf/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531322e706e673f69746f6b3d45375a4739742d38"><img src="https://p0.ssl.qhimg.com/t01aa1af3029f72c0c9.png" alt=""></a></p>
<h3><a href="#修改文件"></a>修改文件</h3>
<p>现在我们已经克隆了仓库，让我们修改文件并在 GitHub 上更新它们。首先，逐个输入下面的命令，将目录更改为 <code>Demo/</code>，检查 <code>README.md</code> 中的内容，添加新的（附加的）内容到 <code>README.md</code>，然后使用 <code>git status</code> 检查状态:</p>
<pre><code class="hljs stylus">cd Demo/
ls
cat README<span class="hljs-selector-class">.md</span>
echo <span class="hljs-string">"Added another line to REAMD.md"</span> &gt;&gt; README<span class="hljs-selector-class">.md</span>
cat README<span class="hljs-selector-class">.md</span>
git status

</code></pre><p>如果你逐一运行这些命令，终端看起开将会是这样：</p>
<p><a href="https://camo.githubusercontent.com/ffcbcc8418bcf5df94ed2e7c3d1342d94dadde25/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531322e352e706e673f69746f6b3d6a68622d45504831"><img src="https://p0.ssl.qhimg.com/t01083bddc932d14886.png" alt=""></a></p>
<p>让我们看一下 <code>git status</code> 的输出，并了解它的意思。不要担心这样的语句：</p>
<pre><code class="hljs vbnet"><span class="hljs-keyword">On</span> branch master
Your branch <span class="hljs-keyword">is</span> up-<span class="hljs-keyword">to</span>-<span class="hljs-built_in">date</span> <span class="hljs-keyword">with</span> <span class="hljs-comment">'origin/master'.".</span>

</code></pre><p>因为我们还没有学习这些。（LCTT 译注：学了你就知道了）下一行说：<code>Changes not staged for commit</code>（变化未筹划提交）；这是告诉你，它下面列出的文件没有被标记准备（“筹划stage”）提交。如果你运行 <code>git add</code>，Git 会把这些文件标记为 <code>Ready for commit</code>（准备提交）；换句话说就是 <code>Changes staged for commit</code>（变化筹划提交）。在我们这样做之前，让我们用 <code>git diff</code> 命令来检查我们添加了什么到 Git 中，然后运行 <code>git add</code>。</p>
<p>这里是终端输出：</p>
<p><a href="https://camo.githubusercontent.com/2148c6baad92d746326229c45c80f6057d861fda/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531332e706e673f69746f6b3d393833705f764e77"><img src="https://p0.ssl.qhimg.com/t01a273cd30ad96ddca.png" alt=""></a></p>
<p>我们来分析一下：</p>
<ul>
<li><code>diff --git a/README.md b/README.md</code> 是 Git 比较的内容（在这个例子中是 <code>README.md</code>）。</li>
<li><code>--- a/README.md</code> 会显示从文件中删除的任何东西。</li>
<li><code>+++ b/README.md</code> 会显示从文件中添加的任何东西。</li>
<li>任何添加到文件中的内容都以绿色文本打印，并在该行的开头加上 <code>+</code> 号。</li>
<li>如果我们删除了任何内容，它将以红色文本打印，并在该行的开头加上 <code>-</code> 号。</li>
<li>现在 <code>git status</code> 显示 <code>Changes to be committed:</code>（变化将被提交），并列出文件名（即 <code>README.md</code>）以及该文件发生了什么（即它已经被 <code>modified</code> 并准备提交）。</li>
</ul>
<p>提示：如果你已经运行了 <code>git add</code>，现在你想看看文件有什么不同，通常 <code>git diff</code> 不会输出任何东西，因为你已经添加了文件。相反，你必须使用 <code>git diff --cached</code>。它会告诉你 Git 添加的当前版本和以前版本文件之间的差别。你的终端输出看起来会是这样：</p>
<p><a href="https://camo.githubusercontent.com/37e183a51b580b4540c4141027fc3881c98a1a65/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531342e706e673f69746f6b3d6276613966484a6a"><img src="https://p0.ssl.qhimg.com/t0173c5155af25d3058.png" alt=""></a></p>
<h3><a href="#上传文件到你的仓库"></a>上传文件到你的仓库</h3>
<p>我们用一些新内容修改了 <code>README.md</code> 文件，现在是时候将它上传到 GitHub。</p>
<p>让我们提交更改并将其推送到 GitHub。运行：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">"Updated Readme file"</span>

</code></pre><p>这告诉 Git 你正在“提交”已经“添加”的更改，你可能还记得，从本系列的第一部分中，添加一条消息来解释你在提交中所做的操作是非常重要的，以便你在稍后回顾 Git 日志时了解当时的目的。（我们将在下一篇文章中更多地关注这个话题。）<code>Updated Readme file</code> 是这个提交的消息——如果你认为这没有合理解释你所做的事情，那么请根据需要写下你的提交消息。</p>
<p>运行 <code>git push -u origin master</code>，这会提示你输入用户名和密码，然后将文件上传到你的 GitHub 仓库。刷新你的 GitHub 页面，你应该会看到刚刚对 <code>README.md</code> 所做的更改。</p>
<p><a href="https://camo.githubusercontent.com/77bede6cdf3c48c8315bf48a8734caf73e7c2d39/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531352e706e673f69746f6b3d5161337370793133"><img src="https://p0.ssl.qhimg.com/t01ea5108d3e95d794e.png" alt=""></a></p>
<p>终端的右下角显示我提交了更改，检查了 Git 状态，并将更改推送到了 GitHub。<code>git status</code> 显示：</p>
<pre><code class="hljs applescript">Your branch <span class="hljs-keyword">is</span> ahead <span class="hljs-keyword">of</span> 'origin/master' <span class="hljs-keyword">by</span> <span class="hljs-number">1</span> commit
  (use <span class="hljs-string">"git push"</span> <span class="hljs-keyword">to</span> publish your <span class="hljs-keyword">local</span> commits)

</code></pre><p>第一行表示在本地仓库中有一个提交，但不在 <code>origin/master</code> 中（即在 GitHub 上）。下一行指示我们将这些更改推送到 <code>origin/master</code> 中，这就是我们所做的。（在本例中，请参阅本系列的第一篇文章，以唤醒你对 <code>origin</code> 含义的记忆。我将在下一篇文章中讨论分支的时候，解释 <code>master</code> 的含义。）</p>
<h3><a href="#添加新文件到-git"></a>添加新文件到 Git</h3>
<p>现在我们修改了一个文件并在 GitHub 上更新了它，让我们创建一个新文件，将它添加到 Git，然后将其上传到 GitHub。 运行：</p>
<pre><code class="hljs ruby">echo <span class="hljs-string">"This is a new file"</span> <span class="hljs-meta">&gt;&gt; </span>file.txt

</code></pre><p>这将会创建一个名为 <code>file.txt</code> 的新文件。</p>
<p>如果使用 <code>cat</code> 查看它：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">cat</span> <span class="hljs-keyword">file</span>.txt

</code></pre><p>你将看到文件的内容。现在继续运行：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">git status</span>

</code></pre><p>Git 报告说你的仓库中有一个未跟踪的文件（名为 <code>file.txt</code>）。这是 Git 告诉你说在你的计算机中的仓库目录下有一个新文件，然而你并没有告诉 Git，Git 也没有跟踪你所做的任何修改。</p>
<p><a href="https://camo.githubusercontent.com/9d67a09c128a0e22950c9a8bf407defdc8c32cb2/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531362e706e673f69746f6b3d555a70534b4c3133"><img src="https://p0.ssl.qhimg.com/t013cd7b28816b9f388.png" alt=""></a></p>
<p>我们需要告诉 Git 跟踪这个文件，以便我们可以提交并上传文件到我们的仓库。以下是执行该操作的命令：</p>
<pre><code class="hljs dockerfile">git <span class="hljs-keyword">add</span><span class="bash"> file.txt
</span>git status

</code></pre><p>终端输出如下：</p>
<p><a href="https://camo.githubusercontent.com/532a8c73d4f0af1757190730ec41d0ac0c896113/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531372e706e673f69746f6b3d7175562d37354e61"><img src="https://p0.ssl.qhimg.com/t013a08c3b7f5128e6e.png" alt=""></a></p>
<p><code>git status</code> 告诉你有 <code>file.txt</code> 被修改，对于 Git 来说它是一个 <code>new file</code>，Git 在此之前并不知道。现在我们已经为 Git 添加了 <code>file.txt</code>，我们可以提交更改并将其推送到 <code>origin/master</code>。</p>
<p><a href="https://camo.githubusercontent.com/1b6bab2e8c5966e3f887747c6c634f97e39ec2e3/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531382e706e673f69746f6b3d653044372d656f6c"><img src="https://p0.ssl.qhimg.com/t01e772240ae260bbcf.png" alt=""></a></p>
<p>Git 现在已经将这个新文件上传到 GitHub；如果刷新 GitHub 页面，则应该在 GitHub 上的仓库中看到新文件 <code>file.txt</code>。</p>
<p><a href="https://camo.githubusercontent.com/abab8812ce11221cfd82e2e32088d90798a75f81/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646531392e706e673f69746f6b3d4663755373485136"><img src="https://p0.ssl.qhimg.com/t019b5421494772f1d1.png" alt=""></a></p>
<p>通过这些步骤，你可以创建尽可能多的文件，将它们添加到 Git 中，然后提交并将它们推送到 GitHub。</p>
<h3><a href="#从-git-中删除文件"></a>从 Git 中删除文件</h3>
<p>如果我们发现我们犯了一个错误，并且需要从我们的仓库中删除 <code>file.txt</code>，该怎么办？一种方法是使用以下命令从本地副本中删除文件：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">rm</span> <span class="hljs-keyword">file</span>.txt

</code></pre><p>如果你现在做 <code>git status</code>，Git 就会说有一个文件 <code>not staged for commit</code>（未筹划提交），并且它已经从仓库的本地拷贝中删除了。如果我们现在运行：</p>
<pre><code class="hljs dockerfile">git <span class="hljs-keyword">add</span><span class="bash"> file.txt
</span>git status

</code></pre><p>我知道我们正在删除这个文件，但是我们仍然运行 <code>git add</code>，因为我们需要告诉 Git 我们正在做的<strong>更改</strong>，<code>git add</code> 可以用于我们添加新文件、修改一个已存在文件的内容、或者从仓库中删除文件时。实际上，<code>git add</code> 将所有更改考虑在内，并将这些筹划提交这些更改。如果有疑问，请仔细查看下面终端屏幕截图中每个命令的输出。</p>
<p>Git 会告诉我们已删除的文件正在进行提交。只要你提交此更改并将其推送到 GitHub，该文件也将从 GitHub 的仓库中删除。运行以下命令：</p>
<pre><code class="hljs crmsh">git commit -m <span class="hljs-string">"Delete file.txt"</span>
git push -u origin <span class="hljs-keyword">master</span>

<span class="hljs-title"></span></code></pre><p>现在你的终端看起来像这样：</p>
<p><a href="https://camo.githubusercontent.com/2aa130777408a51227b102f14f16953679482063/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646532302e706e673f69746f6b3d53724a4d714e5843"><img src="https://p0.ssl.qhimg.com/t012f89217758af482a.png" alt=""></a></p>
<p>你的 GitHub 看起来像这样：</p>
<p><a href="https://camo.githubusercontent.com/375a3ce9df90aa3592f2d9cecca2af3753223d9e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f753132383635312f6769745f677569646532312e706e673f69746f6b3d5268584d34477561"><img src="https://p0.ssl.qhimg.com/t01cd95b8077959ecb5.png" alt=""></a></p>
<p>现在你知道如何从你的仓库克隆、添加、修改和删除 Git 文件。本系列的下一篇文章将检查 Git 分支。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/2/how-clone-modify-add-delete-git-files">https://opensource.com/article/18/2/how-clone-modify-add-delete-git-files</a></p>
<p>作者：<a href="https://opensource.com/users/kkulkarn">Kedar Vijay Kulkarni</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Git 中怎样克隆、修改、添加和删除文件？

## 原文链接
[https://www.zcfy.cc/article/how-to-clone-modify-add-and-delete-files-in-git](https://www.zcfy.cc/article/how-to-clone-modify-add-and-delete-files-in-git)

