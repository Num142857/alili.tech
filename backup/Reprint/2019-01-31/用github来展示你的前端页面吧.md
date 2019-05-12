---
title: '用github来展示你的前端页面吧' 
date: 2019-01-31 2:31:16
hidden: true
slug: v3rwff199
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>经常会有人问我如何才能将自己做的静态页面放到网上供他人欣赏，是不是需要自己有一个服务器，是不是还要搞个域名才能访问？对于以上问题我都会回答：用github来展示你的前端页面吧。</p>
<p>工欲善其事，必先利其器。github是一个很好的代码管理与协同开发平台，在程序界又被称为最大的“同性交友网站”。如果你不懂git，没有自己的github账户，那你就丢失了一把能够很好的展示自我，储存知识的利器。</p>
<p>当然知道github的人不在少数，但是大部分人可能仅知道它可以用于管理我们的项目代码，而不知道其还可以用于展示我们前端的静态页面。比如：</p>
<blockquote><p><a href="https://github.com/luozhihao/demo" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/...</a></p></blockquote>
<p>了解github的人都知道上方的地址指向的是一个github项目目录，同时你可能还会发现这样的一个地址：</p>
<blockquote><p><a href="https://luozhihao.github.io/demo" rel="nofollow noreferrer" target="_blank">https://luozhihao.github.io/demo</a></p></blockquote>
<p>上方的地址就是对应demo项目的展示页面了。</p>
<h2 id="articleHeader1">步骤</h2>
<p>其实利用github来展示前端静态页面的例子很多，比如各种插件、框架的demo演示地址都会这样做，那么下面我们就来实际操作一下，体验一把展示自己前端项目成果的乐趣。</p>
<h4>1.安装git</h4>
<p>如果你是mac用户，那么恭喜你mac自带git命令功能，你无须安装git。如果你是windows用户，你可以前往<a href="https://git-for-windows.github.io/index.html" rel="nofollow noreferrer" target="_blank">windows地址</a>下载并安装。</p>
<h4>2.建立仓库</h4>
<p>在你的github主页，我们可以点击右上角的加号按钮下的“New repository”来新建一个项目仓库，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007544339?w=300&amp;h=192" src="https://static.alili.tech/img/remote/1460000007544339?w=300&amp;h=192" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>点击之后我们给仓库取一个名字并进行相应的描述和配置后点击“Create repository”就ok了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007544340?w=746&amp;h=616" src="https://static.alili.tech/img/remote/1460000007544340?w=746&amp;h=616" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>3.上传代码</h4>
<p>仓库建立完毕后，这时候就需要用我们之前安装的git命令来将本地的代码推送到github上了。如果你仅为了展示自己的前端页面，那么只要掌握如下命令即可（不熟悉git命令的可以参考<a href="http://www.bootcss.com/p/git-guide/" rel="nofollow noreferrer" target="_blank">git - 简易指南</a>）：</p>
<p>（1）打开你的目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> demo</code></pre>
<p>（2）初始化版本库，用于生成.git文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">git init</span></code></pre>
<p>（3）将所有文件添加到缓存区</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">add</span><span class="bash"> *</span></code></pre>
<p>（4）提交当前工作空间的修改内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -m &quot;first commit&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">"first commit"</span></code></pre>
<p>（5）将仓库连接到远程服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git remote add origin <server>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">git remote <span class="hljs-keyword">add</span><span class="bash"> origin &lt;server&gt;</span></code></pre>
<p>（6）将改动推送到所添加的服务器上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push -u origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-built_in">push</span> -u <span class="hljs-built_in">origin</span> master</code></pre>
<p>上方server中的地址在github上创建仓库后可以找到，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007544341?w=645&amp;h=132" src="https://static.alili.tech/img/remote/1460000007544341?w=645&amp;h=132" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>4.创建gh-pages分支</h4>
<p>之前的工作只是将我们的代码发布到了github上demo仓库的master分支上，当然你也可以不发布，而我们的展示页面代码必须发布到名为“gh-pages”的分支上。方法很简单，我们只需要在github的demo项目页面手动创建gh-pages分支即可。如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007544342?w=525&amp;h=420" src="https://static.alili.tech/img/remote/1460000007544342?w=525&amp;h=420" alt="" title="" style="cursor: pointer;"></span></p>
<p>输入gh-pages后创建即可，这样的方式会直接拷贝master分支的所有文件到gh-pages分支，而你也可以用命令行的形式创建并重新上传一份新的代码：</p>
<p>（1）新建并切换到gh-pages分支</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout --orphan gh-pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">git checkout <span class="hljs-comment">--orphan gh-pages</span></code></pre>
<p>（2）之后的操作和之前一样，只是push的时候是gh-pages</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add *
git commit -m &quot;update&quot;
git push -u origin gh-pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> *
</span>git commit -m <span class="hljs-string">"update"</span>
git push -u origin gh-pages</code></pre>
<p>如此，我们的demo项目就多了一个gh-pages分支，里面的代码文件就可以用来展示页面了。</p>
<h4>5.访问页面</h4>
<p>创建并上传文件至gh-pages之后，我们就可以访问如下url来查看自己的demo了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://(user_name|org_name).github.io/repo_name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="git" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//(user_name|org_name).github.io/repo_name</span></code></pre>
<p>这里我们的demo地址为：<a href="https://luozhihao.github.io/demo/," rel="nofollow noreferrer" target="_blank">https://luozhihao.github.io/d...</a> 最终页面如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007544343?w=767&amp;h=422" src="https://static.alili.tech/img/remote/1460000007544343?w=767&amp;h=422" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这样我们便实现了利用github来展示前端静态页面的目标。</p>
<h2 id="articleHeader2">结语</h2>
<p>很多时候方法就摆在眼前，就看你会不会捅破那层隔膜，敢不敢进行钻研与尝试。github之所以经久不衰是因为其不仅解决了我们代码提交、版本管理的问题，还提供了其他实用而独特的功能。</p>
<p>本文只针对Github Pages提供给我们展示静态页面（不支持服务端语言）的功能做了基础的介绍，至于想真正掌握并了解更加深入内容的同学还请付诸于实践，比如利用gihub搭建博客等。</p>
<p>补充：根据读者反馈，现在github有一种更加简便的方式来实现上述功能，将代码上传至仓库后在settings里配置下GitHub Pages为你想展示的分支就行了。</p>
<p>本文为劳卜原创文章，首发于微信公众号：<strong>前端呼啦圈（Love-FED）</strong> <br>转载请注明来自——微信公众号：前端呼啦圈（Love-FED）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用github来展示你的前端页面吧

## 原文链接
[https://segmentfault.com/a/1190000007544336](https://segmentfault.com/a/1190000007544336)

