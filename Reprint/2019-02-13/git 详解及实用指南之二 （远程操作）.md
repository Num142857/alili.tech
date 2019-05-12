---
title: 'git 详解及实用指南之二 （远程操作）' 
date: 2019-02-13 2:31:23
hidden: true
slug: 6t794n2jfad
categories: [reprint]
---

{{< raw >}}

                    
<p>继上一篇</p>
<h4><a href="https://segmentfault.com/a/1190000016720411">1. git 详解及实用指南之一 （本地操作）</a></h4>
<p>今天说下，git 远程操作。</p>
<h2 id="articleHeader0">1.生成 SSH key</h2>
<p>这里是用 github 来做演示的，如果没有 github 帐号，请自注册</p>
<p>1）生成一个 ssh key ,在 windows 平台上可以直接使用 'git bash' 工具来创建<br>2）生成一个 RSA 编码的 KEY</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh-keygen -t rsa -C “你设置过得邮箱”

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>ssh-keygen -<span class="hljs-built_in">t</span> rsa -C “你设置过得邮箱”

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinoh?w=500&amp;h=333" src="https://static.alili.tech/img/bVbinoh?w=500&amp;h=333" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3) 生成的key配置到服务端 </p>
<p><span class="img-wrap"><img data-src="/img/bVbinoH?w=404&amp;h=250" src="https://static.alili.tech/img/bVbinoH?w=404&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>4）查看 key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" cat < ~/.ssh/id_rsa.pub
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> cat &lt; ~/.ssh/id_rsa<span class="hljs-selector-class">.pub</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbintK?w=578&amp;h=118" src="https://static.alili.tech/img/bVbintK?w=578&amp;h=118" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5) 将 key 添加到 github 上</p>
<p><span class="img-wrap"><img data-src="/img/bVbinuL?w=1128&amp;h=379" src="https://static.alili.tech/img/bVbinuL?w=1128&amp;h=379" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5) 添加完测试是否正确</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh -T git@github.com
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ssh</span> <span class="hljs-selector-tag">-T</span> <span class="hljs-selector-tag">git</span>@<span class="hljs-keyword">github</span>.<span class="hljs-keyword">com</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinz5?w=569&amp;h=69" src="https://static.alili.tech/img/bVbinz5?w=569&amp;h=69" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果报错可以查看这篇<a href="https://blog.csdn.net/samxx8/article/details/51497004" rel="nofollow noreferrer" target="_blank">文章</a>    </p>
<p>那么此时主就表示已经让客户端和 github 之间建立好了一个安全的链接，由于 ssh 的存在，github 才可以进行用户的识别，以保证操作是最安全的。</p>
<h2 id="articleHeader1">2.添加远程仓库</h2>
<p>只有存在仓库，才可以表示用户可以进行开发。但是在 d:mypro 目录下已经存在了一个本地仓库，所以下面希望可以将本地仓库发布到服务器上。</p>
<p><strong>1）在 GITHUB 上创建新的仓库</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbin3P?w=798&amp;h=542" src="https://static.alili.tech/img/bVbin3P?w=798&amp;h=542" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在设置的仓库名称为“HelloGitHub”，随后选择创建仓库。而仓库创建完成之后会给出两种连接方式:</p>
<ul>
<li>SSH 链接地址: git@github.com:qq449245884/HelloGitHub.git</li>
<li>HTTPS 链接地址: <a href="https://github.com/qq449245884/HelloGitHub.git" rel="nofollow noreferrer" target="_blank">https://github.com/qq44924588...</a>
</li>
</ul>
<p>本地仓库必须使用以上的地址才可以发布到服务器上。</p>
<p><strong>2）把 GITHUB 与本地仓库相关联</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git remote add origin git@github.com:qq449245884/HelloGitHub.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git remote add origin git@github<span class="hljs-selector-class">.com</span>:qq449245884/HelloGitHub<span class="hljs-selector-class">.git</span>
</code></pre>
<p>此时已经和远程仓库之间建立了连接但是远程仓库里面并没有本地仓库的内容。</p>
<p><strong>3）将所有的内容推送到 GITHUB 上</strong></p>
<p><strong>git push -u origin master</strong></p>
<p>如果你远程有 readme.md 文件存在，可能就会报错：</p>
<p><span class="img-wrap"><img data-src="/img/bVbin8C?w=555&amp;h=122" src="https://static.alili.tech/img/bVbin8C?w=555&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>解决方法请看<a href="https://jingyan.baidu.com/article/f3e34a12a25bc8f5ea65354a.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p><strong>由于现在远程仓库里面并没有任何的文件存在，所以以上是将所有文件进行推送。但是由于是第一次推送，而且推送的为 master 分支，那么使用了一个“-u”的参数将远程的 master 和本地的 master 进行关联。</strong></p>
<p><strong>4）切回 https </strong></p>
<p>有时我们需要用到 https 方式连接会更方便，所以我们需要重新设置 url:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git remote set-url origin https://github.com/qq449245884/HelloGitHub.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code> <span class="hljs-string">git </span><span class="hljs-string">remote </span><span class="hljs-built_in">set-url</span> <span class="hljs-string">origin </span><span class="hljs-string">https:</span>//<span class="hljs-string">github.</span><span class="hljs-string">com/</span><span class="hljs-string">qq449245884/</span><span class="hljs-string">HelloGitHub.</span><span class="hljs-string">git
</span></code></pre>
<p>这个就是用 https 方式连接了。</p>
<p><strong>5）察看现在远程服务器端已经存在的仓库信息 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git remote -v
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">git remote -v</span>
</code></pre>
<p><strong>6）删除掉不需要的仓库 </strong></p>
<p>比如我有新增的仓库中有些不是我们需要的，我们就可以用以下命令来删除仓库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git remote rm '仓库名字'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> remote rm <span class="hljs-string">'仓库名字'</span>
</code></pre>
<p><strong>7）修改 hello.js  </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.click = function() {
   console.log('git 远程测试！')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.click = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 远程测试！'</span>)
}
</code></pre>
<p>此时所做出的所有修改都属于本地的修改，下面需要将其提交到服务器上去:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;远程测试 git &quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"远程测试 git "</span>
</code></pre>
<p>这个时候只是将其增加到了本地的 master 分支上。但是远程的 master 分支依然没有发生改变。所以下面需要进行客<br>户端向服务器端的代码推送。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin master
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git push origin <span class="hljs-keyword">master</span>
</code><span class="hljs-title"></span></pre>
<p>那么此时就完成了本地代码与服务器端代码的同步。</p>
<h2 id="articleHeader2">3.克隆仓库</h2>
<p>上面做法实际是先有了本地仓库，而后将本地仓库提交到远程仓库上进行管理，但这是一个错误的做法，正确的做法应该先有远程仓库，而后根据此远程仓库克隆出一个新的仓库来。</p>
<p><strong>1）在 GITHUB 上初始化一个新的仓库：HelloGit2 </strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbioh3?w=774&amp;h=534" src="https://static.alili.tech/img/bVbioh3?w=774&amp;h=534" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此处选中了“Initialize this repository with a README”表示自动为用户进行仓库的初始化，并且会自动存在有一个<br>“README”的文件存在。仓库创建完成之后下面来观察一下此时仓库的内容。</p>
<p><strong>2）在本地磁盘上进行仓库的克隆操作</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/qq449245884/HelloGit2.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/qq449245884/HelloGit2.git
</code></pre>
<p>不要在原来目录下完成，而直接换一个新目录，在实际开发之中最好的做法是所有的开发者直接克隆远程仓库进行操作。</p>
<p>好了，git远程操作主要就这些了，下篇讲 git 讲 git 核心<strong>分支管理</strong>， 有兴趣的可以关注哦。</p>
<p><strong>一个笨笨的码农，我的世界只能终身学习！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbiojg?w=258&amp;h=258" src="https://static.alili.tech/img/bVbiojg?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
git 详解及实用指南之二 （远程操作）

## 原文链接
[https://segmentfault.com/a/1190000016737370](https://segmentfault.com/a/1190000016737370)

