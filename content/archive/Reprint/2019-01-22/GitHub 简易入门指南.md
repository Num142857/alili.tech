---
title: 'GitHub 简易入门指南' 
date: 2019-01-22 2:30:08
hidden: true
slug: ae08rwisfdu
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#github-简易入门指南"></a>GitHub 简易入门指南</h1>
<p><a href="https://github.com/">GitHub</a> 是一个在线平台，旨在促进在一个共同项目上工作的个人之间的代码托管、版本控制和协作。通过该平台，无论何时何地，都可以对项目进行操作（托管和审查代码，管理项目和与世界各地的其他开发者共同开发软件）。<strong>GitHub 平台</strong>为开源项目和私人项目都提供了项目处理功能。</p>
<p>关于团队项目处理的功能包括：GitHub 流Flow&gt;和 GitHub 页Pages。这些功能可以让需要定期部署的团队轻松处理工作流程。另一方面，GitHub 页提供了页面用于展示开源项目、展示简历、托管博客等。</p>
<p>GitHub 也为个人项目提供了必要的工具，使得个人项目可以轻松地处理。它也使得个人可以更轻松地与世界分享他们的项目。</p>
<h3><a href="#注册-github-并启动一个项目"></a>注册 GitHub 并启动一个项目</h3>
<p>在 GitHub 上启动新项目时，您必须先使用您的电子邮件地址创建一个帐户。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/github-homepage_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01d0f802eb069de5a1.jpg" alt="github homepage"></a></p>
<p>然后，在验证邮箱的时候，用户将自动登录到他们的 GitHub 帐户。</p>
<h4><a href="#1-创建仓库"></a>1、 创建仓库</h4>
<p>之后，我们会被带到一个用于创建仓库repository的页面。​仓库存储着包括修订历史记录在内的所有项目文件。仓库可以是公开的或者是私有的。公开的仓库可以被任何人查看，但是，只有项目所有者授予权限的人才可以提交修改到这个仓库。另一方面，私有仓库提供了额外的控制，可以将项目设置为对谁可见。因此，公开仓库适用于开源软件项目，而私有仓库主要适用于私有或闭源项目。</p>
<ul>
<li>填写 “仓库名称Repository Name” 和 “简短描述Short Description”。</li>
<li>选中 “以一个 README 文件初始化Initialize this repository with a README”。</li>
<li>最后，点击底部的 “创建仓库Create Repository” 按钮。</li>
</ul>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/create-a-github-repository_orig.jpg"><img src="https://p0.ssl.qhimg.com/t010395597f04501a2c.jpg" alt="create a github repository"></a></p>
<h4><a href="#2-添加分支"></a>2、 添加分支</h4>
<p>在 GitHub 中，分支branch是一种同时操作单个仓库的各种版本的方式。默认情况下，任何创建的单个仓库都会被分配一个名为 “MASTER” 的分支，它被认为是最后一个分支。在 GitHub 中，分支在被合并到主干master（最后的分支）之前，可以在对仓库进行实验和编辑中发挥作用。</p>
<p>为了使项目适合每一个人的需求，通常情况下，总是需要添加几个格外的分支来匹配不同的项目。在主分支上创建一个分支和复制主分支时的当前状态是一样的。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/add-a-branch-to-github-repository_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01518ba54d443e42f4.jpg" alt="add a branch to github repository"></a></p>
<p>创建分支与在不同版本中保存单个文件是类似的。它通过在特定仓库上执行的任务重命名来实现。</p>
<p>分支在保持错误修复和功能添加工作中同样被证明是有效。在进行必要的修改后，这些分支会被合并到主分支中。</p>
<p>在创建仓库后创建一个分支：</p>
<ul>
<li>在这个例子中，点击仓库名称 “Hello-World” 跳转到你的新仓库。</li>
<li>点击顶部的 “Branch:Master” 按钮，会看到一个下拉菜单，菜单里有填写分支名称的空白字段。</li>
<li>输入分支名称，在这个例子中我们输入 “readme-edits“。</li>
<li>按下回车键或者点击蓝色的 “创建分支create branch” 框。</li>
</ul>
<p>这样就成功创建了两个分支：master 和 readme-edits。</p>
<h4><a href="#3-修改项目文件并提交"></a>3、 修改项目文件并提交</h4>
<p>此步骤提供了关于如何更改仓库并保存修改的指导。在 GitHub 上，提交commit被定义为保存的修改的意思。每一次提交都与一个提交信息commit message相关联，该提交信息包含了保存的修改的历史记录，以及为何进行这些更改。这使得其他贡献者可以很轻松地知道你做出的更改以及更改的原因。</p>
<p>要对仓库进行更改和提交更改，请执行以下步骤：</p>
<ul>
<li>点击仓库名称 “Hello-World”。</li>
<li>点击右上角的铅笔图标查看和编辑文件。 <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/commit-changes-to-github-repository_orig.jpg"><img src="" alt="commit changes to github repository"></a></li>
<li>在编辑器中，写一些东西来确定你可以进行更改。</li>
<li>在提交消息commit message字段中做简要的总结，以解释为什么以及如何进行更改。</li>
<li>点击提交更改 commit changes按钮保存更改。</li>
</ul>
<p>请注意，这些更改仅仅影响到 readme-edits 分支，而不影响主分支。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/commit-branch-to-master_orig.jpg"><img src="https://p0.ssl.qhimg.com/t010de5356390ea37f9.jpg" alt="commit branch to master"></a></p>
<h4><a href="#4-开启一个拉取请求"></a>4、 开启一个拉取请求</h4>
<p>​拉取请求pull request是一个允许贡献者提出并请求某人审查和合并某些更改到他们的分支的功能。​拉取请求还显示了几个分支的差异（diffs）。更改、添加和删减通常以红色和绿色来表示。一旦提交完成就可以开启​拉取请求，即使代码还未完成。</p>
<p>开启一个​拉取请求：</p>
<ul>
<li>点击​​拉取请求pull requests选项卡。 <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/github-pull-request_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01d3c59bd6a75ea2e3.jpg" alt="github pull request"></a></li>
<li><pre><code class="hljs xml"> 点击<span class="hljs-tag">&lt;<span class="hljs-name">ruby</span>&gt;</span>新建拉取请求<span class="hljs-tag">&lt;<span class="hljs-name">rt</span>&gt;</span>new pull requests<span class="hljs-tag">&lt;/<span class="hljs-name">rt</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ruby</span>&gt;</span>按钮。

</code></pre></li>
<li><p>选择 readme-edits 分支与 master 分支进行比较。 <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/compare-commit-changes-github_orig.jpg"><img src="https://p0.ssl.qhimg.com/t0185e8baaddcdc0578.jpg" alt="compare commit changes github"></a></p>
</li>
<li>确定请求，并确定这是您要提交的内容。</li>
<li>点击创建​拉取请求绿色按钮并输入一个标题。 <a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/open-a-pull-request-in-github-repository_orig.jpg"><img src="https://p0.ssl.qhimg.com/t01883f3ee0db94db0a.jpg" alt="open a pull request in github repository"></a></li>
<li>按下回车键。</li>
</ul>
<p>用户可以通过尝试创建并保存拉取请求来证实这些操作。</p>
<h4><a href="#5-合并拉取请求"></a>5、 合并拉取请求</h4>
<p>最后一步是将 readme-edits 分支和 master 分支合并到一起。如果 readme-edits 分支和 master 分支不会产生冲突，则会显示merge pull request合并拉取请求的按钮。</p>
<p><a href="http://www.linuxandubuntu.com/uploads/2/1/1/5/21152474/merge-the-pull-request-github_orig.jpg"><img src="" alt="merge the pull request github"></a></p>
<p>当合并拉取时，有必要确保评论comment和其他字段被正确填写。合并拉取：</p>
<ul>
<li>点击merge pull request合并拉取请求的按钮。</li>
<li>确认合并。</li>
<li>按下紫色的删除分支按钮，删除 readme-edits 分支，因为它已经被包含在 master 分支中。（LCTT 译注：如果是合并他人提交的拉取请求，则无需也无法删除合并过来的他人的分支。）</li>
</ul>
<p>本文提供了 GitHub 平台从注册到使用的基本操作，接下来由大家尽情探索吧。</p>
<hr>
<p>via: <a href="http://www.linuxandubuntu.com/home/getting-started-with-github">http://www.linuxandubuntu.com/home/getting-started-with-github</a></p>
<p>作者：<a href="http://www.linuxandubuntu.com">LinuxAndUbuntu</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GitHub 简易入门指南

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-github](https://www.zcfy.cc/article/getting-started-with-github)

