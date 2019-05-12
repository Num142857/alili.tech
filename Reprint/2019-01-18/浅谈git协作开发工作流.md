---
title: '浅谈git协作开发工作流' 
date: 2019-01-18 2:30:35
hidden: true
slug: 3imfkn9gw2h
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">写在前面</h3>
<p>在我第一次接触编程的时候，学的是Pascal，在那个叫做Turbo的蓝屏编辑器里写下一些简单的流程控制去解一些简单的算法题。那时候，天还很蓝，我的代码还保存在自己电脑的文件夹里。  <br>上了大学以后知道了github这个东西（aka: <strong>gayhub</strong>），而后又去了解了git的概念，也从字面上明白了对于一个项目的开发人员而言，版本控制是一件很重要的事情。  <br>当有了项目经验以后，不再是自己一个人coding了，由于责任的划分、产品的迭代等方面都出现过一些小范围内毁灭性的“失误”，所以终于深刻意识到了<strong>版本控制是一件重要的事情</strong>。  <br>目前最流行的版本控制工具有两种：<code>svn</code>和<code>git</code>。  <br>因为一些开源社区和自身特点的原因，<code>git</code>似乎更受广大开发者的青睐。  <br><em>（本文所介绍的工作流是借鉴livoras大神的相关<a href="https://github.com/livoras/blog/issues/7" rel="nofollow noreferrer" target="_blank">issue</a>）</em></p>
<h3 id="articleHeader1">什么是<code>git</code>？</h3>
<p>关于<code>git</code>的概念，大概分为以下三点：</p>
<ol>
<li><p>打开浏览器</p></li>
<li><p>在地址栏输入“baidu.com”</p></li>
<li><p>搜索：“什么是<code>git</code>”</p></li>
</ol>
<h3 id="articleHeader2">一些概念的正确打开方式</h3>
<h4>仓库</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008657140?w=762&amp;h=559" src="https://static.alili.tech/img/remote/1460000008657140?w=762&amp;h=559" alt="github的仓库" title="github的仓库" style="cursor: pointer; display: inline;"></span><br>就像图中所示，仓库有两大类：源仓库（最中间的）和开发者仓库（四周的）。  <br><strong>源仓库</strong>就是项目发起人所建立的仓库，其他开发者只能基于这个仓库对项目进行开发。  <br><strong>开发者仓库</strong>则是众多开发者们从项目发起这那里<code>fork</code>来的，可以在自己的主页看到这个“转发”来的仓库，相应的，开发者的<code>commit</code>和<code>push</code>操作都是基于这个克隆体来进行的。</p>
<h4>分支</h4>
<p>分支在<code>git</code>中是一个很重要的概念（当然了，<code>svn</code>中也有）。  <br>在<code>git</code>中，分支主要分为两种：永久性分支和临时性分支。</p>
<h5>永久性分支</h5>
<p>一般情况下就是指<code>master</code>和<code>develop</code>这两个分支，前者用于保存产品每个版本的代码，通常由<code>develop</code>分支合并而来；后者则是开发者的主要战场。</p>
<h5>临时性分支</h5>
<p>根据不同的用途，可将临时性分支分为以下三种：</p>
<ul>
<li><p>功能分支</p></li>
<li><p>预发布分支</p></li>
<li><p>bug修复分支</p></li>
</ul>
<p>我喜欢把临时性分支成为<strong>备胎分支</strong>，因为她们的设定非常符合<strong>用完即走</strong>的产品理念（备胎们哭晕在仓库）。  <br>可能你会有点不理解为什么这些分支的命运如此悲凉，那我来<strong>举个栗子</strong>  <br>有一天，产品要求小明给主页增加一个点赞的功能，说时迟那时快，小明撸起袖子就是干</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git checkout -b feature-thumbsUp
//新建一个功能分支

$ vi thumbsUp.js
//进行开发

$ git add thumbsUp.js
$ git commit -m 'add feature-thumbsUp'
//将当前分支的的修改保存到本地

$ git checkout develop
$ git merge --no-ff feature-thumbsUp
$ git branch -d feature-thumbsUp
//切换到develop分支并且合并刚才功能分支的修改
//并且删除那个功能分支（虐不虐！你就说虐不虐！用完即走啊！）

$ git push origin develop
//push到自己的远程仓库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git checkout -b feature-thumbsUp
//新建一个功能分支

$ vi thumbsUp.js
//进行开发

$ git add thumbsUp.js
$ git commit -m <span class="hljs-string">'add feature-thumbsUp'</span>
//将当前分支的的修改保存到本地

$ git checkout develop
$ git merge --no-ff feature-thumbsUp
$ git branch <span class="hljs-_">-d</span> feature-thumbsUp
//切换到develop分支并且合并刚才功能分支的修改
//并且删除那个功能分支（虐不虐！你就说虐不虐！用完即走啊！）

$ git push origin develop
//push到自己的远程仓库</code></pre>
<p>看到了吧，这就是临时性分支的悲惨命运。不过话说回来，为了整个项目的推进而牺牲不失为一件光荣的事情。</p>
<h3 id="articleHeader3">Workflow</h3>
<p>ok，接下来就到本文的<code>Highlight</code>了，一种可靠的工作流——使用<code>git</code>和<code>github</code>进行协同开发（<em>livoras大神的    那篇文章也叫这个名字，大家可以去看看</em>）</p>
<h4>step 1</h4>
<p>找到源仓库并<code>fork</code>之，<code>clone</code>这个“转发”来的副本（开发者仓库）。</p>
<h4>step 2</h4>
<p>在本地就可以进行开发啦，进入<code>develop</code>分支（你的主战场），并根据需求创建临时分支进行开发，最终合并到<code>develop</code>分支。  <br>自己搞好以后就可以<code>push</code>了，但这并不是上传到源仓库，而是你的开发者仓库。</p>
<h4>step 3</h4>
<p>此时对于 自己刚才上传的代码，你肯定满满的自信，大概是：“卧槽我怎么这么帅真是写得一手好代码”，肯定是希望项目的发起者（管理员）将你的贡献“收录”了，这时，就需要你去提交一个<code>pull request</code>（江湖人称<code>PR</code>）。  <br>提交之后，剩下的工作就交给管理员了。</p>
<h4>step 4</h4>
<p>管理员看到了你的PR，可以在github上面直接review你提交的更改，下一步，他会在本地仓库输入以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git checkout develop
$ git checkout -b kyrieliu-develop
$ git pull https://github.com/kkkyrie/project.git develop
//将你的代码pull到本地的测试分支中进行测试" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git checkout develop
$ git checkout -b kyrieliu-develop
$ git pull https://github.com/kkkyrie/project.git develop
//将你的代码pull到本地的测试分支中进行测试</code></pre>
<p>如果管理员确定没问题，一般情况下就会接受你的PR了。  <br>当然，可以通过两种方法接受一个PR：</p>
<ol>
<li><p>直接在github上接受</p></li>
<li><p>命令行：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git checkout develop
$ git merge --no-ff kyrieliu-develop
$ git branch -d kyrieliu-develop
$ git push origin develop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git checkout develop
$ git merge --no-ff kyrieliu-develop
$ git branch <span class="hljs-_">-d</span> kyrieliu-develop
$ git push origin develop</code></pre>
<p>通过上述的步骤，由你新加的<code>thumbsUp.js</code>就从你本地经历了万水千山最终到达了源仓库。</p>
<h3 id="articleHeader4">有冲突了？莫慌！</h3>
<p>在实际操作中，经常会出现有冲突的情况，作为一个同样遇到过冲突并且最终解决了的人，我由衷的告诉你：不要慌，出现冲突也是一件很平常的事情，实在解决不了那就无脑回滚吧！（噗哈哈哈）  <br>如果其他开发者在你开发的过程中有上传新的代码，在你<code>pull</code>之前一定要先<code>commit</code>你本地的修改，不然可能等你<code>pull</code>下来以后会发现：卧槽我刚写的代码呢？  <br>另外，个人觉得<code>git</code>的提示还是很友好的，有冲突我们<code>diff</code>一下，去解决不久好了嘛。</p>
<blockquote><p>我们的口号是：  <br>有冲突解决冲突，没有冲突就制造冲突也要去解决冲突！</p></blockquote>
<h3 id="articleHeader5">最后</h3>
<p><strong>感谢Gayhub的吉祥物愿意出现在标题中。</strong><br>向livoras大神学习，祭上一张神图供大家理解。  <br><span class="img-wrap"><img data-src="/img/remote/1460000008657141" src="https://static.alili.tech/img/remote/1460000008657141" alt="git协同开发" title="git协同开发" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVKuhf?w=186&amp;h=179" src="https://static.alili.tech/img/bVKuhf?w=186&amp;h=179" alt="一个还算有趣的前端er" title="一个还算有趣的前端er" style="cursor: pointer; display: inline;"></span><br>一个还算有趣的前端er</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈git协作开发工作流

## 原文链接
[https://segmentfault.com/a/1190000008657137](https://segmentfault.com/a/1190000008657137)

