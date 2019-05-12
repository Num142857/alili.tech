---
title: 'git常用操作' 
date: 2019-02-14 2:30:37
hidden: true
slug: woxi4d4tspg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>git常用操作总结</blockquote>
<h2 id="articleHeader0">仓库</h2>
<ul>
<li>
<strong>在当前目录新建一个Git代码库</strong><br><code>git init</code>
</li>
<li>
<strong>新建一个目录，将其初始化为Git代码库</strong><br><code>git init [project]</code>
</li>
<li>
<strong>下载一个项目</strong><br><code>git clone [url]</code>
</li>
</ul>
<h2 id="articleHeader1">配置</h2>
<ul>
<li>
<strong>显示当前的Git配置</strong><br><code>git config --list</code>
</li>
<li>
<strong>设置提交代码时的用户信息</strong><br><code>git config [--global] user.name "[name]"</code><br><code>git config [--global] user.email "[email address]"</code>
</li>
</ul>
<h2 id="articleHeader2">文件操作</h2>
<ul>
<li>
<strong>添加指定文件到暂存区</strong><br><code>git add [file]</code>
</li>
<li>
<strong>添加指定目录到暂存区，包括子目录</strong><br><code>git add [dir]</code>
</li>
<li>
<strong>添加当前目录的所有文件到暂存区</strong><br><code>git add .</code>
</li>
<li>
<strong>删除工作区文件，并且将这次删除放入暂存区</strong><br><code>git rm [file]</code>
</li>
</ul>
<h2 id="articleHeader3">代码提交</h2>
<ul>
<li>
<strong>提交暂存区到仓库区</strong><br><code>git commit -m [message]</code>
</li>
<li>
<strong>提交暂存区的指定文件到仓库区</strong><br><code>git commit [file] -m [message]</code>
</li>
</ul>
<h2 id="articleHeader4">分支</h2>
<ul>
<li>
<strong>本地所有分支</strong><br><code>git branch</code>
</li>
<li>
<strong>远程所有分支</strong><br><code>git branch -r</code>
</li>
<li>
<strong>本地所有分支和远程所有分支</strong><br><code>git branch -a</code>
</li>
<li>
<strong>新建一个分支</strong><br><code>git branch [branch]</code>
</li>
<li>
<strong>新建一个分支，并且换到该分支</strong><br><code>git checkout -b [branch]</code>
</li>
<li>
<strong>切换回主分支</strong><br><code>git checkout master</code>
</li>
<li>
<strong>删除分支</strong><br><code>git branch -d [branch]</code>
</li>
<li>
<strong>删除远程分支</strong><br><code>push origin --delete [branch]</code><br><code>git branch -dr [remote/branch]</code>
</li>
<li>
<strong>合并指定分支到当前分支</strong><br><code>git merge [branch]</code>
</li>
</ul>
<h2 id="articleHeader5">更新与合并</h2>
<ul>
<li>
<strong>更新本地仓库至最新</strong><br><code>git pull</code>
</li>
<li>
<strong>提交本地所有改动到远程仓库(默认master分支)</strong><br><code>git push</code>
</li>
<li>
<strong>提交到远程指定分支</strong><br><code>git push origin [branch]</code>
</li>
<li>
<strong>本地已有项目与远程仓库连接</strong><br><code>git remote add origin [远程仓库地址]</code>
</li>
<li>
<strong>首次将本地代码提交到远程</strong><br><code>git push -u origin master</code>
</li>
</ul>
<h2 id="articleHeader6">撤销</h2>
<ul>
<li>
<strong>恢复暂存区的指定文件到工作区</strong><br><code>git checkout [file]</code>
</li>
<li>
<strong>恢复暂存区的所有文件到工作区</strong><br><code>git checkout .</code>
</li>
<li>
<strong>重置暂存区与工作区，与上一次commit保持一致</strong><br><code>git reset --hard</code>
</li>
</ul>
<h2 id="articleHeader7">查看信息</h2>
<ul>
<li>
<strong>查看有变更的文件</strong><br><code>git status</code>
</li>
<li>
<strong>查看当前分支的版本历史</strong><br><code>git log</code>
</li>
<li>
<strong>查看暂存区和工作区的差异</strong><br><code>git diff</code>
</li>
</ul>
<blockquote>以上主要是总结git常用的操作，更多git操作请看<a href="https://gitee.com/all-about-git" rel="nofollow noreferrer" target="_blank">git</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
git常用操作

## 原文链接
[https://segmentfault.com/a/1190000016848840](https://segmentfault.com/a/1190000016848840)

