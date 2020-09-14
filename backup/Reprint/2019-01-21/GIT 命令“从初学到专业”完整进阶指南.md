---
title: 'GIT 命令“从初学到专业”完整进阶指南' 
date: 2019-01-21 2:30:06
hidden: true
slug: 7armht6r6ju
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#git-命令从初学到专业完整进阶指南"></a>GIT 命令“从初学到专业”完整进阶指南</h1>
<p>在<a href="http://linuxtechlab.com/install-git-linux-ubuntu-centos/">之前的教程</a>中，我们已经学习了在机器上安装 git。本教程，我们将讨论如何使用 git，比如与 git 一起使用的各种命令。所以我们开始吧，</p>
<ul>
<li>推荐阅读：<a href="http://linuxtechlab.com/install-git-linux-ubuntu-centos/">如何在 Linux 上安装 GIT (Ubuntu 和 CentOS)</a></li>
</ul>
<h3><a href="#设置用户信息"></a>设置用户信息</h3>
<p>这应该是安装完 git 的第一步。我们将添加用户信息 (用户名和邮箱)，所以当我们提交代码时，会产生带有用户信息的提交信息，这使得跟踪提交过程变得更容易。要添加用户信息，命令是 <code>git config</code>：</p>
<pre><code class="hljs routeros">$ git<span class="hljs-built_in"> config </span>--global user.name <span class="hljs-string">"Daniel"</span>
$ git<span class="hljs-built_in"> config </span>--global user.email <span class="hljs-string">"dan.mike@xyz.com"</span>

</code></pre><p>添加完用户信息之后，通过运行下面命令，我们将检查这些信息是否成功更新。</p>
<pre><code class="hljs routeros">$ git<span class="hljs-built_in"> config </span>--list

</code></pre><p>我们应该能够看到输出的用户信息。</p>
<h3><a href="#git-命令"></a>GIT 命令</h3>
<h4><a href="#新建一个仓库"></a>新建一个仓库</h4>
<p>为了建立一个新仓库，运行如下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git init</span>

</code></pre><h4><a href="#查找一个仓库"></a>查找一个仓库</h4>
<p>为了查找一个仓库，命令如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git grep <span class="hljs-string">"repository"</span></span>

</code></pre><h4><a href="#与远程仓库连接"></a>与远程仓库连接</h4>
<p>为了与远程仓库连接，运行如下命令：</p>
<pre><code class="hljs dockerfile">$ git remote <span class="hljs-keyword">add</span><span class="bash"> origin remote_server
</span>
</code></pre><p>然后检查所有配置的远程服务器，运行如下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git remote -v</span>

</code></pre><h4><a href="#克隆一个仓库"></a>克隆一个仓库</h4>
<p>为了从本地服务器克隆一个仓库，运行如下代码：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">repository_path</span>

</code></pre><p>如果我们想克隆远程服务器上的一个仓库，那克隆这个仓库的命令是：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">repository_path</span>

</code></pre><h4><a href="#在仓库中列出分支"></a>在仓库中列出分支</h4>
<p>为了检查所有可用的和当前工作的分支列表，执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git branch</span>

</code></pre><h4><a href="#创建新分支"></a>创建新分支</h4>
<p>创建并使用一个新分支，命令是：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git checkout -b <span class="hljs-string">'branchname'</span></span>

</code></pre><h4><a href="#删除一个分支"></a>删除一个分支</h4>
<p>为了删除一个分支，执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git branch -d <span class="hljs-string">'branchname'</span></span>

</code></pre><p>为了删除远程仓库的一个分支，执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git push origin:<span class="hljs-string">'branchname'</span></span>

</code></pre><h4><a href="#切换到另一个分支"></a>切换到另一个分支</h4>
<p>从当前分支切换到另一个分支，使用</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git checkout <span class="hljs-string">'branchname'</span></span>

</code></pre><h4><a href="#添加文件"></a>添加文件</h4>
<p>添加文件到仓库，执行：</p>
<pre><code class="hljs dockerfile">$ git <span class="hljs-keyword">add</span><span class="bash"> filename
</span>
</code></pre><h4><a href="#文件状态"></a>文件状态</h4>
<p>检查文件状态 (那些将要提交或者添加的文件)，执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git status</span>

</code></pre><h4><a href="#提交变更"></a>提交变更</h4>
<p>在我们添加一个文件或者对一个文件作出变更之后，我们通过运行下面命令来提交代码：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git commit -a</span>

</code></pre><p>提交变更到 head 但不提交到远程仓库，命令是：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git commit -m <span class="hljs-string">"message"</span></span>

</code></pre><h4><a href="#推送变更"></a>推送变更</h4>
<p>推送对该仓库 master 分支所做的变更，运行：</p>
<pre><code class="hljs crmsh">$ git push origin <span class="hljs-keyword">master</span>

<span class="hljs-title"></span></code></pre><h4><a href="#推送分支到仓库"></a>推送分支到仓库</h4>
<p>推送对单一分支做出的变更到远程仓库，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git push origin <span class="hljs-string">'branchname'</span></span>

</code></pre><p>推送所有分支到远程仓库，运行：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> git push -<span class="hljs-keyword">all</span> origin

</code></pre><h4><a href="#合并两个分支"></a>合并两个分支</h4>
<p>合并另一个分支到当前活动分支，使用命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git merge <span class="hljs-string">'branchname'</span></span>

</code></pre><h4><a href="#从远端服务器合并到本地服务器"></a>从远端服务器合并到本地服务器</h4>
<p>从远端服务器下载/拉取变更到到本地服务器的工作目录，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git pull </span>

</code></pre><h4><a href="#检查合并冲突"></a>检查合并冲突</h4>
<p>查看对库文件的合并冲突，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git diff -base <span class="hljs-string">'filename'</span></span>

</code></pre><p>查看所有冲突，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git diff</span>

</code></pre><p>如果我们在合并之前想预览所有变更，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git diff <span class="hljs-string">'source-branch'</span> <span class="hljs-string">'target-branch'</span> </span>

</code></pre><h4><a href="#创建标记"></a>创建标记</h4>
<p>创建标记来标志任一重要的变更，运行：</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">tag</span> <span class="hljs-title">'tag</span> <span class="hljs-keyword">number</span>' 'commit id' 

</code></pre><p>通过运行以下命令，我们可以查找 commit id ：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git <span class="hljs-built_in">log</span></span>

</code></pre><h4><a href="#推送标记"></a>推送标记</h4>
<p>推送所有创建的标记到远端服务器，运行：</p>
<pre><code class="hljs maxima">$ git <span class="hljs-built_in">push</span> -tags <span class="hljs-built_in">origin</span>

</code></pre><h4><a href="#回复做出的变更"></a>回复做出的变更</h4>
<p>如果我们想用 head 中最后一次变更来替换对当前工作树的变更，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git checkout -<span class="hljs-string">'filename'</span></span>

</code></pre><p>我们也可以从远端服务器获取最新的历史，并且将它指向本地仓库的 master 分支,而不是丢弃掉所有本地所做所有变更。为了这么做，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git fetch origin</span>
<span class="hljs-meta">$</span><span class="bash"> git reset -hard master</span>

</code></pre><p>好了，伙计们。这些就是我们使用 git 服务器的命令。我们将会很快为大家带来更有趣的教程。如果你希望我们对某个特定话题写一个教程，请通过下面的评论箱告诉我们。像往常一样， 欢迎您的各种意见和建议。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/beginners-to-pro-guide-for-git-commands/">http://linuxtechlab.com/beginners-to-pro-guide-for-git-commands/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/liuxinyu123">liuxinyu123</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GIT 命令“从初学到专业”完整进阶指南

## 原文链接
[https://www.zcfy.cc/article/complete-beginners-to-pro-guide-for-git-commands](https://www.zcfy.cc/article/complete-beginners-to-pro-guide-for-git-commands)

