---
title: 'git 详解及实用指南之一 （本地操作）' 
date: 2019-02-13 2:31:23
hidden: true
slug: 5onhrlhtb3s
categories: [reprint]
---

{{< raw >}}

                    
<p>后续会持续更新</p>
<h2 id="articleHeader0">1.设置开发者的个人信息</h2>
<p>在任何一个系统之中都会存在有多个开发者(多人协作开发)，而在 GIT 之中，对于每一个开发者(电脑)，都需要 开发者自己定义自己的名字与 email 地址，以便进行方便的联系，此时需要配置全局信息。</p>
<p><strong>配置全局用户名及 email 地址</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git config --global user.name 'wzy'
git config --global user.email '449245884@.com'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git config --global user<span class="hljs-selector-class">.name</span> <span class="hljs-string">'wzy'</span>
git config --global user<span class="hljs-selector-class">.email</span> <span class="hljs-string">'449245884@.com'</span>
</code></pre>
<p>设置完成之后如果成功不会任何提示信息，可以通过如下命令查看全局配置信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git config -l
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>git <span class="hljs-built_in">config</span> -l
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijFX?w=812&amp;h=288" src="https://static.alili.tech/img/bVbijFX?w=812&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以发现除了之前配置的用户名和 email 地址之外，还存在有其它的内容。</p>
<h2 id="articleHeader1">2.创建仓库</h2>
<ul>
<li>版本库 = 仓库；</li>
<li>在此仓库中的所有内容都会被git 管理；</li>
<li>在仓库中的所有文件修改、删除、更新都会被纪录下来；</li>
<li>可以随时恢复到某一特定状态；</li>
<li>初始化仓库： git init</li>
</ul>
<p>如果要开发项目，那么首先必须有一个仓库(可以简单的理解为是一个磁盘上的文件夹)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir myrpo
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">mkdir</span> myrpo
</code></pre>
<p>此时 mypro 文件夹是一个空的文件夹，没有任何的内容，只是一个纯粹的目录。</p>
<p>将 mypro 文件夹定义为仓库, 进入文件夹, 初始化仓库(将此目录变为可以被GIT管理的仓库)  </p>
<p><span class="img-wrap"><img data-src="/img/bVbijGS?w=1044&amp;h=102" src="https://static.alili.tech/img/bVbijGS?w=1044&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>而且此时会提示，在 mypro 文件夹之中创建了一个“.git”的目录，这个目录就是仓库信息，死都不能改。</p>
<h3 id="articleHeader2">3.添加文件</h3>
<p>现在仓库创建完成之后，下面就要进行文件的基本管理了。首先在编写之前有一个说明:所有的文件一定要使用 UTF-8 编码，否则有可能会出现问题。</p>
<p><strong>建立一个 Hello.js文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('每一次新增！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'每一次新增！'</span>);
}
</code></pre>
<p><strong>察看当前仓库的状态</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git status
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">git status</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijHw?w=1108&amp;h=432" src="https://static.alili.tech/img/bVbijHw?w=1108&amp;h=432" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>在 "git status" 状态查询操作上可以发展有如下的几个提示信息：</strong></p>
<ul>
<li>现在开发的属于主分支：On branch master</li>
<li>初始化仓库的提交：No commits yet</li>
<li>未标记的文件：Untracked files:</li>
<li>随后给出的一些操作的命令：(use "git add &lt;file&gt;..." to include in what will be committed)</li>
<li>未标记文件的列表，现在只有一个： hello.js</li>
</ul>
<p><strong>添加文件到仓库</strong></p>
<ul>
<li>增加文件到暂存区： git add 文件名称</li>
<li>提交文件： git commit -m "注释"</li>
</ul>
<p><strong>将文件加入到暂存库之中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add hello.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> hello.js 
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijH9?w=806&amp;h=108" src="https://static.alili.tech/img/bVbijH9?w=806&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>继续查询状态</p>
<p><span class="img-wrap"><img data-src="/img/bVbijIe?w=840&amp;h=340" src="https://static.alili.tech/img/bVbijIe?w=840&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时有了一个最重要的信息:</p>
<p><span class="img-wrap"><img data-src="/img/bVbijIi?w=694&amp;h=142" src="https://static.alili.tech/img/bVbijIi?w=694&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在的文件并没有真正的提交到主分支上(主分支就是我们真正要运行的程序的所有的代码)。</p>
<blockquote>注意:所有修改的代码都会被 GIT 自动的监测到，所有的代码在使用 commit 提交之前一定要先使用 add 增加进来，否则不会有任何的提交。<br>如果现在不希望分两步进行则可以在运行以下程序时增加一个“-a”的参数，表示先 add 而后 commit(git commit -a -m "注释")。</blockquote>
<p><strong>提交文件信息</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -m &quot;New Js file - Hello.js Create&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">"New Js file - Hello.js Create"</span>
</code></pre>
<p>在进行每次更新提交的时候一般都会为其增加上一些注释数据，所以使用“-m”参数来进行注释的编写。 </p>
<p><span class="img-wrap"><img data-src="/img/bVbijIX?w=1074&amp;h=196" src="https://static.alili.tech/img/bVbijIX?w=1074&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时这个“Hello.js”文件就被真正的提交到了主分支上，也就是意味着程序发布成功了。</p>
<p><strong>查询状态</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijI2?w=648&amp;h=162" src="https://static.alili.tech/img/bVbijI2?w=648&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时的状态会提示:没有任何的信息需要被提交，工作目录很干净。而在 git 工具下用户每一次进行的提交实际上都 会被日志纪录下来。    </p>
<p><strong>察看针对于“hello.js”文件的日志信息</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijJg?w=974&amp;h=234" src="https://static.alili.tech/img/bVbijJg?w=974&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>首先会出现一个提交的信息号 “2e3e7018a965673a4154c84105b5d1a23f13167a”，可以理解为是每一次提交的 id 号。如果有多次提交，那么这个日志信息也会越来越多。</p>
<h2 id="articleHeader3">4.修改仓库文件</h2>
<p>上面代码已经可以成功的进行了发布，但是代码出现就是为了修改。于是现在来观察对于 git 工具如何去控制修改。</p>
<p><strong>修改 hello.js 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('每一次新增！');
   console.log('第一次修改·！');
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'每一次新增！'</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一次修改·！'</span>);
}

</code></pre>
<p>此时发现文件增加了一行的修改。</p>
<p><strong>查询一下当前的仓库状态</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijJX?w=1096&amp;h=284" src="https://static.alili.tech/img/bVbijJX?w=1096&amp;h=284" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在 GIT 直接提示用户，文件没有保存到暂存区之中，而且提示有:要么你选择文件暂存，要么你直接进行文件的 恢复，同时给出了已经修改的文件“hello.js”。</p>
<p><strong>察看文件的前后区别</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git diff hello.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>git <span class="hljs-keyword">diff </span>hello.<span class="hljs-keyword">js </span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijJ9?w=716&amp;h=394" src="https://static.alili.tech/img/bVbijJ9?w=716&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在可以发现所有增加的内容都会使用“+”表示，而被删除的信息都会使用“-”表示。</p>
<p><strong>将修改后的代码加入到暂存区后进行提交</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;Update hello.js file. Add one lines&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"Update hello.js file. Add one lines"</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijKC?w=1136&amp;h=166" src="https://static.alili.tech/img/bVbijKC?w=1136&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>察看修改日志</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git log hello.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git log hello<span class="hljs-selector-class">.js</span> 
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijKH?w=930&amp;h=414" src="https://static.alili.tech/img/bVbijKH?w=930&amp;h=414" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>通过以上的代码演示，现在可以清楚的发现，只要是修改的操作 GIT 都可以进行及时的跟踪。</p>
<h2 id="articleHeader4">5. 工作区与暂存区</h2>
<h4>工作区与仓库</h4>
<p>工作区： 就是当前电脑的操作目录(包含 .git);<br>仓库：工作区有一个隐藏目录 .git,这个不算工作区，而是 git 的仓库,git 版本库里保存了很多东西，其中最重要的就是称为 stage 的暂存区，还有 git 为用户自动创建的主程序分支 master ，以及指向 master 的 head 指针。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijLm?w=1074&amp;h=488" src="https://static.alili.tech/img/bVbijLm?w=1074&amp;h=488" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>概念解释:</strong></p>
<ul>
<li>在之前所编写的“hello.js”文件保存在用户工作区之中;</li>
<li>当使用 add 命令之后，实际上就是将所有的文件提交到暂存区（state） 之中；</li>
<li>使用 commit 命令之后，才表示真正的发出了修改，而真正可以运行的程序都保存在 master 分支上;</li>
</ul>
<h2 id="articleHeader5">6. 工作区上的操作</h2>
<p><span class="img-wrap"><img data-src="/img/bVbijNb?w=1450&amp;h=794" src="https://static.alili.tech/img/bVbijNb?w=1450&amp;h=794" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>修改 Hello.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('第二次修改·！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二次修改·！'</span>);
}
</code></pre>
<p><strong>增加一个 demo.js 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn2.onclick = function() {
  console.log('demo click');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'demo click'</span>);
}
</code></pre>
<p>现在的工作区中的代码已经发生了变化。</p>
<p><strong>用 status 跟踪</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijM8?w=1082&amp;h=450" src="https://static.alili.tech/img/bVbijM8?w=1082&amp;h=450" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在会提示有以下信息:</p>
<ul>
<li>修改了 Hello.js 文件，而这个文件给出了处理方式;</li>
<li>出现了一个未标记的文件(Demo.js)，询问用户是否将其加入到暂存区之中。</li>
</ul>
<h2 id="articleHeader6">7. 缓存区上的操作</h2>
<p><span class="img-wrap"><img data-src="/img/bVbijNg?w=1406&amp;h=786" src="https://static.alili.tech/img/bVbijNg?w=1406&amp;h=786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>使用“git add”将代码添加到暂存区之中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> .
</span></code></pre>
<p>本次操作使用了一个“.”，那么就表示全部加入。修改之后再次观察状态。</p>
<p><strong>观察状态</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVbijOc?w=674&amp;h=302" src="https://static.alili.tech/img/bVbijOc?w=674&amp;h=302" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">8. 提交修改</h2>
<p>数据保存在暂存区之后，下面就要进行代码的提交，将代码提交到主分支上。     </p>
<p><span class="img-wrap"><img data-src="/img/bVbijOH?w=1374&amp;h=744" src="https://static.alili.tech/img/bVbijOH?w=1374&amp;h=744" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当把暂存区的代码提交到主分支上之后，会自动的清空暂存区之中的内容。</p>
<p><strong>提交修改代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -m 'add demo.js file'

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">'add demo.js file'</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijOX?w=910&amp;h=164" src="https://static.alili.tech/img/bVbijOX?w=910&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么此时再次查询状态。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijOY?w=662&amp;h=128" src="https://static.alili.tech/img/bVbijOY?w=662&amp;h=128" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么会直接发现没有任何的文件修改的提示。</p>
<h2 id="articleHeader8">9. 版本回退</h2>
<p>每当用户进行代码提交的时候都会自动的生成一个 commit id，而这个 commit id 就是进行代码回退的主要操作方式。</p>
<p><strong>查询当前修改后的日志信息</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git log --pretty=oneline
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>git <span class="hljs-built_in">log</span> <span class="hljs-comment">--pretty=oneline</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijPy?w=1122&amp;h=190" src="https://static.alili.tech/img/bVbijPy?w=1122&amp;h=190" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>大家可以发现所有的 commit id 并不是顺序的 1、2、3 编号，而是由系统生成一个十六进制数据，这一概念就跟 Session ID 类似，由 GIT 自己控制，主要是为了防止版本号的冲突。</p>
<p>在 master 分之上会有一个 HEAD 指针存在，而这个指针默认情况下永远指向最后一次提交的位置。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijPC?w=1036&amp;h=426" src="https://static.alili.tech/img/bVbijPC?w=1036&amp;h=426" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当使用回退之后发现 HEAD 指针出现了改变，如果回退一步，那么之前的操作不会被删除，但是所有的代码将回归到指定位置的状态。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijPR?w=1066&amp;h=456" src="https://static.alili.tech/img/bVbijPR?w=1066&amp;h=456" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>**回退一步</p>
<p>git reset --hard HEAD~1</p>
<p><span class="img-wrap"><img data-src="/img/bVbijP6?w=920&amp;h=72" src="https://static.alili.tech/img/bVbijP6?w=920&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么如果说现在还想恢复最新的状态呢?那么就必须找到回退的 commit id。</p>
<p><strong>找到所有的已经删除的信息 commitid</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git reflog
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">git reflog</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbijQb?w=1126&amp;h=258" src="https://static.alili.tech/img/bVbijQb?w=1126&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>恢复最后一次提交</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git reset --hard cc54c43
 
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code> git reset --hard <span class="hljs-keyword">cc</span><span class="hljs-number">54</span><span class="hljs-keyword">c</span><span class="hljs-number">43</span>
 
 </code></pre>
<h2 id="articleHeader9">10.提示:文件修改问题</h2>
<p>在有了暂存区和 master 主分支概念之后，就需要回避一个问题:只有保存在暂存区之中的内容才可以被真正的修改， 而不是针对于文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijQG?w=1408&amp;h=800" src="https://static.alili.tech/img/bVbijQG?w=1408&amp;h=800" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>编写 hello.js 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('我的小智');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我的小智'</span>);
}
</code></pre>
<p>以上是 =hello.js 文件的第一次修改。   </p>
<p><strong>将修改的文件增加到暂存区之中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span>.<span class="bash">
</span></code></pre>
<p>此时并没有提交，而后再次修改 hello.js 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   btn.onclick = function() {
     console.log('我的王大冶');
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我的王大冶'</span>);
   }
</code></pre>
<p>但是这个时候此文件并没有使用 add 进行加入。</p>
<p><strong>进行提交(提交的时候只提交暂存区的内容)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -m &quot;change print&quot;   

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">"change print"</span>   

</code></pre>
<p>可是这个时候只是提交了第一次修改，而第二次修改并没有提交。</p>
<p><strong>查询状态</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijRj?w=1090&amp;h=336" src="https://static.alili.tech/img/bVbijRj?w=1090&amp;h=336" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>进行对比</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git diff HEAD hello.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>git <span class="hljs-keyword">diff </span>HEAD hello.<span class="hljs-keyword">js </span>
</code></pre>
<p>HEAD 是指向最后一次提交的指针，现在的含义是将 HEAD 中的 Hello.java 文件与工作区的 Hello.java 文件进行对比。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijSe?w=780&amp;h=372" src="https://static.alili.tech/img/bVbijSe?w=780&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><strong>总结:如果一个文件修改多次了，那么就需要执行多次的 add 后才可以提交，否则在 add 前的修改是不会被提交的。</strong></blockquote>
<h2 id="articleHeader10">11. 撤消修改</h2>
<ul>
<li>
<p>情况一：在未增加(git add) 与提交前(git commit) 用户可以直接撤消对文件做出的修改操作。</p>
<ul><li>撤消所做出的修改操作： git checkout -- 文件名</li></ul>
</li>
<li>
<p>情况二：在已增加（git add）与未提交前(git commit) 用户可以直接撤消对文件所做出的修改操作。</p>
<ul>
<li>撤消暂存区的修改操作：git reset HEAD 文件名称；</li>
<li>丢掉已经修改的文件内容： git checkout -- 文件名称；</li>
</ul>
</li>
</ul>
<h4>情况一:未增加(git add)&amp;提交(git commit)</h4>
<p>如果在工作区之中的代码并没有增加到暂存区之中，那么如果要恢复到原始状态是很容易的。</p>
<p><strong>现在假设修改了 hello.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('我的王大冶');
}

就是要改代码，不干走人了，老子不吃你这套
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我的王大冶'</span>);
}

就是要改代码，不干走人了，老子不吃你这套
</code></pre>
<p>但是只要是文件一修改，那么 git 就可以立即跟踪到状态。</p>
<p><span class="img-wrap"><img data-src="/img/bVbijTn?w=1110&amp;h=354" src="https://static.alili.tech/img/bVbijTn?w=1110&amp;h=354" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是后来发现，此种修改实在是不应该进行，如果进行了，只能有一个结论:此人脑袋有问题。但是写代码的时候 可能不知道上一次修改状态。</p>
<p><strong>恢复</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
git checkout -- hello.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
git checkout -- hello<span class="hljs-selector-class">.js</span>
</code></pre>
<p>执行之后发现 Hello.java 文件就恢复到了一个原始的状态(上一次的提交状态)。</p>
<h4>情况二:已增加（ git add ）&amp; 未提交（ git commit ）</h4>
<p>现在假设要修改的文件已经提交到了暂存区之中。</p>
<p><strong>将 Hello.java 代码提交到暂存区中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span>.<span class="bash">
</span></code></pre>
<p><strong>当查询状态时:</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbijTN?w=702&amp;h=252" src="https://static.alili.tech/img/bVbijTN?w=702&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在状态查询的时候已经给出了用户的提示，即:你可以根据 HEAD 指针来恢复文件。</p>
<p><strong>从暂存区之中退出</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git reset HEAD hello.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>git <span class="hljs-keyword">reset</span> <span class="hljs-keyword">HEAD</span> hello.js 
</code></pre>
<p>于是再次查询状态</p>
<p><span class="img-wrap"><img data-src="/img/bVbijTR?w=1094&amp;h=256" src="https://static.alili.tech/img/bVbijTR?w=1094&amp;h=256" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>相当于现在已经由暂存区中保存的内容恢复到了工作区，那么既然在工作区了，就可以直接恢复原始状态。</p>
<p>恢复原始</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -- hello.js 


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git checkout -- hello<span class="hljs-selector-class">.js</span> 


</code></pre>
<blockquote>个人建议:养成良好的开发习惯，别像演示那样这么对待代码。</blockquote>
<h2 id="articleHeader11">12. 删除文件</h2>
<p>现在在仓库之中存在有 Demo.js 文件，但是假设这个文件从此之后不再使用了呢?只有一个解决方案:删除。但是 在 GIT 里面对于删除文件这一功能严格来讲也属于一个修改操作。</p>
<p><strong>从磁盘上删除 Demo.js 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" rm demo.js 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> rm demo<span class="hljs-selector-class">.js</span> 
</code></pre>
<p><strong>当文件删除之后下面查询状态;</strong>     </p>
<p><span class="img-wrap"><img data-src="/img/bVbijT0?w=1098&amp;h=372" src="https://static.alili.tech/img/bVbijT0?w=1098&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个时候文件是从当前工作区的磁盘中删除了，同时也提示文件被删除。</p>
<p><strong>提交更新</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;Delete Demo.java File&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"Delete Demo.java File"</span>
</code></pre>
<p>但是如果说发现文件被删除错误了呢?则应该进行恢复。</p>
<p><strong>恢复文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git reset --hard bc8e842247b3d78  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>git <span class="hljs-keyword">reset</span> <span class="hljs-comment">--hard bc8e842247b3d78  </span>
</code></pre>
<p>如果文件被删除，则只能够利用版本控制的方式进行恢复。</p>
<blockquote>以上主要对总结于李兴华老师的课程，大家有兴趣可以去网易去上观看</blockquote>
<p><strong>一个笨笨的码农，我的世界只能终身学习！</strong><br><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
git 详解及实用指南之一 （本地操作）

## 原文链接
[https://segmentfault.com/a/1190000016720411](https://segmentfault.com/a/1190000016720411)

