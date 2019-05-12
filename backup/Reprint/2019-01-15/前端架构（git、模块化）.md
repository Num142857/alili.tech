---
title: '前端架构（git、模块化）' 
date: 2019-01-15 2:30:12
hidden: true
slug: agza1p2np1f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">协作流程</h1>
<h2 id="articleHeader1">1.职责</h2>
<h3 id="articleHeader2">页面工程师</h3>
<p><span class="img-wrap"><img data-src="/img/bVM3pR?w=382&amp;h=96" src="https://static.alili.tech/img/bVM3pR?w=382&amp;h=96" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">前端工程师</h3>
<p><span class="img-wrap"><img data-src="/img/bVM3pM?w=533&amp;h=192" src="https://static.alili.tech/img/bVM3pM?w=533&amp;h=192" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">接口设计</h1>
<p><span class="img-wrap"><img data-src="/img/bVNhwa?w=855&amp;h=274" src="https://static.alili.tech/img/bVNhwa?w=855&amp;h=274" alt="三种接口" title="三种接口" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">1.页面入口规范</h2>
<p><span class="img-wrap"><img data-src="/img/bVM3B5?w=853&amp;h=407" src="https://static.alili.tech/img/bVM3B5?w=853&amp;h=407" alt="页面入口规范" title="页面入口规范" style="cursor: pointer; display: inline;"></span></p>
<p>基本信息</p>
<h3 id="articleHeader6">输入参数</h3>
<p>模板列表<br>接口列表</p>
<h2 id="articleHeader7">2.同步数据规范</h2>
<p><span class="img-wrap"><img data-src="/img/bVM3B7?w=861&amp;h=384" src="https://static.alili.tech/img/bVM3B7?w=861&amp;h=384" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>基本信息</p>
<p>预填数据</p>
<p>注入接口</p>
<h2 id="articleHeader8">3.异步接口规范</h2>
<p><span class="img-wrap"><img data-src="/img/bVM3B7?w=861&amp;h=384" src="https://static.alili.tech/img/bVM3B7?w=861&amp;h=384" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>基本信息</p>
<p>输入数据</p>
<p>输出结果</p>
<h2 id="articleHeader9">同步请求，异步请求？</h2>
<h1 id="articleHeader10">版本管理</h1>
<p>版本控制系统<code>VCS</code> （Version control system）</p>
<h2 id="articleHeader11">1.分支模型</h2>
<p>产品级的分支模型：</p>
<p><span class="img-wrap"><img data-src="/img/bVM3Dh?w=823&amp;h=351" src="https://static.alili.tech/img/bVM3Dh?w=823&amp;h=351" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">2.git</h2>
<p>git是一个<strong>基于内容寻址</strong>的存储系统。基于<strong>文件内容</strong>，而不是基于文件。</p>
<p>安装</p>
<blockquote>
<p>Windows: msysgit <a href="http://msysgit.github.io" rel="nofollow noreferrer" target="_blank">http://msysgit.github.io</a></p>
<p>Mac: brew install git</p>
<p>Ubuntu: apt-get install git</p>
</blockquote>
<h3 id="articleHeader13">git基础操作</h3>
<h4>1.<code>git config</code>
</h4>
<p>用户配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git config --global user.name &quot;Darcy&quot;
git config --global user.name text.example.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git config --global user<span class="hljs-selector-class">.name</span> <span class="hljs-string">"Darcy"</span>
git config --global user<span class="hljs-selector-class">.name</span> text<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span></code></pre>
<p>配置级别：</p>
<p><span class="img-wrap"><img data-src="/img/bVM3Ej?w=840&amp;h=145" src="https://static.alili.tech/img/bVM3Ej?w=840&amp;h=145" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>2.<code>git init</code>
</h4>
<p>初始化之后会出现一个.git/目录，下面存储着包括config文件在内的几乎所有git相关文件。</p>
<h4>3.<code>git status</code>
</h4>
<p><span class="img-wrap"><img data-src="/img/bVM3EF?w=323&amp;h=150" src="https://static.alili.tech/img/bVM3EF?w=323&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVM3ES?w=870&amp;h=413" src="https://static.alili.tech/img/bVM3ES?w=870&amp;h=413" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>跟踪：track</p>
<h4>4.<code>git add</code>
</h4>
<p>添加文件内容到<code>暂存区</code>，同时文件被<code>跟踪</code>。</p>
<p>批量添加： <code>git add .</code> 添加当前目录所有文件</p>
<h4>5.<code>.gitignore</code>
</h4>
<p>如果有不希望跟踪的文件，那么需要配置忽略文件。</p>
<p>仅作用于未跟踪的文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVM3Fm?w=435&amp;h=409" src="https://static.alili.tech/img/bVM3Fm?w=435&amp;h=409" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>gitignore常见配置：<a href="https://github.com/github/gitignore" rel="nofollow noreferrer" target="_blank">github中的示例</a></p>
<h4>6.<code>git rm</code>
</h4>
<p>从<code>暂存区</code>删除文件。</p>
<ul>
<li><p><code>git rm --cached</code> 仅仅从暂存区删除</p></li>
<li><p><code>git rm</code> 同时从暂存区和工作目录删除</p></li>
<li><p><code>git rm $(git ls-files --deleted)</code> 删除所有被跟踪，但是在工作目录被删除的文件</p></li>
</ul>
<h4>7.<code>git commit</code>
</h4>
<p>提交。</p>
<ul>
<li><p><code>git commit -m "initial commit"</code></p></li>
<li><p><code>git commit -a -m "initial commit"</code> 直接提交</p></li>
</ul>
<h4>8.<code>git log</code>
</h4>
<p>提交历史记录。</p>
<ul>
<li><p><code>git log</code></p></li>
<li><p><code>git log --oneline</code> 只有7位hash和提交时输入的commit message</p></li>
<li><p><code>git log --color --graph --pretty=format:(此处省略2行)</code> 更美观，且有分支链</p></li>
</ul>
<p>上面的命令太长了，不可能每次都这样输入，因此需要配置别名<code>alias</code>。</p>
<ul>
<li><p>语法：<code>git config --global alias.shortname &lt;full command&gt; </code></p></li>
<li><p>例子：<code>git config --global alias.lg "log --color --graph --pretty=format:(此处省略2行)" </code><br>  这样就可以用 <code>git lg</code> 来表示上面那行命令了。</p></li>
</ul>
<p>别名其实也存储在gitcofig文件中</p>
<h4>9.<code>git diff</code>
</h4>
<p>显示版本差异。</p>
<ul>
<li><p><code>git diff</code> 工作目录与暂存区的差异</p></li>
<li><p><code>git diff -cached[&lt;reference&gt;]</code> 暂存区与某次提交的差异，默认是&lt;HEAD&gt;，&lt;HEAD&gt;指向当前的提交</p></li>
<li><p><code>git diff [&lt;reference&gt;]</code> 工作目录与某次提交的差异</p></li>
</ul>
<h4>10.<code>git checkout --&lt;file&gt;</code>
</h4>
<p><strong>撤销本地修改。</strong></p>
<p>即：将工作内容从暂存区复制到工作目录。</p>
<h4>11.<code>git reset HEAD &lt;file&gt;</code>
</h4>
<p><strong>取消暂存。</strong></p>
<p>即：将文件内容从上次提交复制到暂存区。</p>
<h4>12.<code>git checkout HEAD --&lt;file&gt;</code>
</h4>
<p><strong>撤销全部改动</strong>：取消暂存 + 撤销本地修改。</p>
<p><span class="img-wrap"><img data-src="/img/bVM3Jk?w=912&amp;h=451" src="https://static.alili.tech/img/bVM3Jk?w=912&amp;h=451" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">git分支操作</h3>
<h4>13.<code>git branch</code>
</h4>
<ul>
<li><p><code>git branch &lt;branch-name&gt;</code> 新建分支</p></li>
<li><p><code>git branch -d &lt;branch-name&gt;</code> 删除指定分支</p></li>
<li><p><code>git branch -v</code> 显示所有分支信息</p></li>
</ul>
<h4>14.<code>git checkout</code>
</h4>
<p>通过移动HEAD检出版本，可用于分支切换。</p>
<ul>
<li><p><code>git checkout &lt;branch-name&gt;</code> 切换分支</p></li>
<li><p><code>git checkout -b &lt;branch-name&gt;</code> 新建一个分支并切换到新分支</p></li>
<li><p><code>git checkout -b &lt;reference&gt;</code> 切换到其他引用对象，比如 <code>commit id</code> 或 标签</p></li>
<li><p><code>git checkout -</code> 回到上一个分支（把HEAD移动到上一个分支）</p></li>
</ul>
<h4>15.<code>git reset</code>
</h4>
<p>将当前分支恢复到某个历史版本。以下三种模式的主要区别是内容是否会恢复到工作目录和暂存区。</p>
<ul>
<li><p><code>git reset --mixed e33e42</code> --mixed是默认参数，不写也行，当前内容（即原来的提交）会被复制到暂存区</p></li>
<li><p><code>git reset --hard e33e42</code> --hard 时，当前内容（即原来的提交）会被复制到暂存区和工作目录</p></li>
<li><p><code>git reset --soft e33e42</code> --soft时，暂存区和工作目录都不会有任何改变，原来的提交变成了一个无索引的提交，有可能会被回收，可以用 <code>git reflog</code> 找回来</p></li>
<li><p>捷径：<code>git reset HEAD^/HEAD~1/HEAD~n</code> HEAD的上一次提交，前第n次提交</p></li>
</ul>
<h4>区分<code>reset</code> 与 <code>checkout</code> 在操作<strong>分支</strong>与操作<strong>文件</strong>时的不同</h4>
<p><span class="img-wrap"><img data-src="/img/bVM7ps?w=885&amp;h=375" src="https://static.alili.tech/img/bVM7ps?w=885&amp;h=375" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>16.<code>git stash</code>
</h4>
<p>我们在<code>git checkout</code>切换分支的时候，经常会被提示“当前有未提交的内容，请<code>commit</code>或<code>stash</code>”，而我们通常是写到一半不希望commit的，所以这时就需要<code>git stash</code>。</p>
<p>作用是：保存目前的工作目录和暂存区状态，返回一个干净的工作空间。</p>
<ul>
<li><p><code>git stash save 'push to stash area'</code> 第一步：保存</p></li>
<li><p><code>git stash list </code> 第二步：查看已有列表 会显示：<code>stash@{0}: On master: push to stash area</code></p></li>
<li><p><code>git stash apply stash@{0}</code> 第三步：把保存的内容恢复到工作目录</p></li>
<li><p><code>git stash drop stash@{0}</code> 第四步：把对应的stash命令删除掉</p></li>
<li><p><code>git stash pop stash@{0}</code> 捷径：第三步+第四步</p></li>
</ul>
<h4>17.<code>git merge</code>
</h4>
<p>假定当前在<code>master</code>分支。</p>
<ul><li><p><code>git merge next</code> 合并 next 分支的内容到master分支</p></li></ul>
<p>如有冲突，会是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<<<<<<< HEAD

next 

=======

origin/master

>>>>>>> origin/master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD

<span class="hljs-keyword">next</span> 

=======

origin/master

<span class="hljs-meta">&gt;&gt;</span>&gt;&gt;&gt;&gt;&gt; origin/master</code></pre>
<p>====上面指当前分支的提交，下面是要merge过来的分支的提交内容。</p>
<h4>18.<code>git rebase</code>
</h4>
<p>修剪提交历史的基线，俗称“变基”。</p>
<ul><li><p><code>git rebase master</code></p></li></ul>
<p>不要在共有分支使用rebase。</p>
<h4>19.<code>git tag</code>
</h4>
<p>标签，一个不变的别名。用于标记某次发布。指向一个commit对象。</p>
<ul><li><p><code>git tag v0.1 e39d0b2</code></p></li></ul>
<p>打完标签之后，可以直接使用标签名切换分支： <code>git checkout v0.1</code></p>
<h3 id="articleHeader15">git远程操作</h3>
<h4>20.<code>git push</code>
</h4>
<p>提交本地历史到远程。</p>
<h4>21.<code>git remote</code>
</h4>
<ul>
<li><p><code>git remote add origin ~/git-server</code> 添加一个远程仓库别名origin</p></li>
<li><p><code>git remote -v</code> 查看远程仓库信息</p></li>
</ul>
<h4>22.<code>git fetch</code>
</h4>
<p>获取远程仓库的提交历史。</p>
<ul>
<li><p><code>git fetch origin/master</code></p></li>
<li><p><code>git merge origin/master</code></p></li>
</ul>
<h4>23.<code>git pull</code>
</h4>
<ul>
<li><p><code>git pull &lt;remote&gt; &lt;branch&gt;</code></p></li>
<li><p>=<code>git fetch + git merge</code></p></li>
</ul>
<h4>23.<code>git clone</code>
</h4>
<p>获取一个远程仓库作为本地仓库。</p>
<ul><li><p><code>git clone ~/git-server test2</code> 会克隆远程仓库到 test2目录下</p></li></ul>
<h1 id="articleHeader16">技术选型</h1>
<h2 id="articleHeader17">模块化（JS）</h2>
<h3 id="articleHeader18">一、模块</h3>
<h3 id="articleHeader19">1.模块的职责：</h3>
<ul>
<li><p>封装实现</p></li>
<li><p>暴露接口</p></li>
<li><p>声明依赖</p></li>
</ul>
<h3 id="articleHeader20">2.第一步：没有应用任何模块系统（反模式 Anti-Pattern）</h3>
<p>math模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//math.js
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//math.js
<span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(a, b) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> + b;
}
<span class="hljs-keyword">function</span> <span class="hljs-title">sub</span>(a, b) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> - b;
}
</code></pre>
<p>caculator模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
var action = &quot;add&quot;;

function compute(a, b){
  switch(action){
    case &quot;add&quot;: return add(a, b);
    case &quot;sub&quot;: return sub(a, b);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">var</span> action = <span class="hljs-string">"add"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compute</span><span class="hljs-params">(a, b)</span></span>{
  <span class="hljs-keyword">switch</span>(action){
    <span class="hljs-keyword">case</span> <span class="hljs-string">"add"</span>: <span class="hljs-keyword">return</span> add(a, b);
    <span class="hljs-keyword">case</span> <span class="hljs-string">"sub"</span>: <span class="hljs-keyword">return</span> sub(a, b);
  }
}</code></pre>
<p>可以看出 <code>caculator</code>模块是依赖<code>math</code>模块的。</p>
<h4>
<code>math</code>模块特点：</h4>
<ol>
<li><p><strong>无封装性</strong>：变量全部散落在全局里。</p></li>
<li><p><strong>接口结构不明显</strong>：如果我们没有简化代码，那么<strong>并不能清楚的知道<code>math</code>到底输出了哪些接口</strong>。</p></li>
</ol>
<h4>
<code>caculator</code>模块特点：</h4>
<ol>
<li><p><strong>没有依赖声明</strong>：依赖了math模块但是却没有声明。</p></li>
<li><p><strong>使用全局状态</strong>：使用了action这个全局状态，应该尽量避免。</p></li>
</ol>
<h3 id="articleHeader21">3.第二步：使用字面量（Object Literal）优化</h3>
<p>math模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//math.js
var math = {
  add: function add(a, b) {
    return a + b;
  }
  sub: function sub(a, b) {
    return a - b;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//math.js</span>
<span class="hljs-keyword">var</span> math = {
  add: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a + b;
  }
  sub: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a - b;
  }
}</code></pre>
<p>caculator模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
var caculator = {
  action: &quot;add&quot;,
  compute: function compute(a, b){
    switch(action){
      case &quot;add&quot;: return add(a, b);
      case &quot;sub&quot;: return sub(a, b);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">var</span> caculator = {
  action: <span class="hljs-string">"add"</span>,
  compute: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compute</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">switch</span>(action){
      <span class="hljs-keyword">case</span> <span class="hljs-string">"add"</span>: <span class="hljs-keyword">return</span> add(a, b);
      <span class="hljs-keyword">case</span> <span class="hljs-string">"sub"</span>: <span class="hljs-keyword">return</span> sub(a, b);
    }
  }
}</code></pre>
<h4>
<code>math</code>模块特点：</h4>
<ol>
<li><p><strong>结构性好</strong>：用字面量把接口进行了结构化。</p></li>
<li><p><strong>访问控制差</strong>：依然没有进行控制。</p></li>
</ol>
<h4>
<code>caculator</code>模块特点：</h4>
<ol>
<li><p><strong>依然没有依赖声明</strong>：依赖了math模块但是却没有声明。</p></li>
<li><p><strong>无法设置私有属性</strong>：<code>action</code>虽然是成员属性，但在外部依然可以访问到。</p></li>
</ol>
<h3 id="articleHeader22">4.第三步：使用立即执行的函数表达式<code>IIFE</code>（Immediately-invoked Function Expression）解决<code>无法设置私有属性</code>的问题。</h3>
<p>caculator模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
var caculator = (function(){
  var action = &quot;add&quot;;
  return {
    compute: function compute(a, b){
      switch(action){
        case &quot;add&quot;: 
          return math.add(a, b);
        case &quot;sub&quot;: 
          return math.sub(a, b);
      }
    }
  }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">var</span> caculator = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> action = <span class="hljs-string">"add"</span>;
  <span class="hljs-keyword">return</span> {
    compute: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compute</span><span class="hljs-params">(a, b)</span></span>{
      <span class="hljs-keyword">switch</span>(action){
        <span class="hljs-keyword">case</span> <span class="hljs-string">"add"</span>: 
          <span class="hljs-keyword">return</span> math.add(a, b);
        <span class="hljs-keyword">case</span> <span class="hljs-string">"sub"</span>: 
          <span class="hljs-keyword">return</span> math.sub(a, b);
      }
    }
  }
})();</code></pre>
<h4>
<code>caculator</code>模块特点：</h4>
<ol>
<li><p><strong>依然依然没有依赖声明</strong>：依赖了math模块但是却没有声明。</p></li>
<li><p><strong>有了私有属性</strong>：<code>action</code>是我们要的私有属性，<code>compute</code>函数可以访问到，而且在<code>caculator</code>外面无法访问到。</p></li>
</ol>
<h3 id="articleHeader23">5.第四步：增加依赖声明</h3>
<p>caculator模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
var caculator = (function(m){
  var action = &quot;add&quot;;
  function compute(a, b){
    switch(action){
      case &quot;add&quot;: 
        return m.add(a, b);
      case &quot;sub&quot;: 
        return m.sub(a, b);
    }
  }
  return {
    compute: conpute
  }
})(math);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">var</span> caculator = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(m)</span></span>{
  <span class="hljs-keyword">var</span> action = <span class="hljs-string">"add"</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compute</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">switch</span>(action){
      <span class="hljs-keyword">case</span> <span class="hljs-string">"add"</span>: 
        <span class="hljs-keyword">return</span> m.add(a, b);
      <span class="hljs-keyword">case</span> <span class="hljs-string">"sub"</span>: 
        <span class="hljs-keyword">return</span> m.sub(a, b);
    }
  }
  <span class="hljs-keyword">return</span> {
    compute: conpute
  }
})(math);</code></pre>
<h4>
<code>caculator</code>模块特点：</h4>
<ol>
<li><p><strong>显示了依赖声明</strong>：把math模块作为参数传了进去，并且可以对形参进行命名，这里命名为<code>m</code>。</p></li>
<li><p><strong>math模块仍然污染了全局变量</strong>。</p></li>
<li><p><strong>必须手动进行依赖管理</strong>：math模块是手动传进去的，必须手动保证math是在这之前就被加载了。</p></li>
<li><p>注意<code>return</code>的部分与原来不一样了：学名叫 <strong>揭露模块模式</strong><code>review module pattern</code>，优点是<strong>在暴露的模块进行增删查改的时候会非常方便</strong>。</p></li>
</ol>
<h3 id="articleHeader24">6.第五步：使用命名空间（name space）解决污染全局空间的问题</h3>
<p>帮助我们只暴露一个类似于<code>namespace</code>的全局变量。而不是将<code>math</code>这样的模块都注册在全局作用域中。</p>
<p>math模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//math.js
namespace(&quot;math&quot;, [], function(){
  function add(a, b) {
    return a + b;
  }
  function sub(a, b) {
    return a - b;
  }
  return {
    add: add,
    sub: sub
  }
})
//第一个参数为模块声明，第二个参数为依赖的模块，第三个参数为模块的构成" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//math.js</span>
<span class="hljs-keyword">namespace</span>(<span class="hljs-string">"math"</span>, [], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a + b;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub</span><span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a - b;
  }
  <span class="hljs-keyword">return</span> {
    add: add,
    sub: sub
  }
})
<span class="hljs-comment">//第一个参数为模块声明，第二个参数为依赖的模块，第三个参数为模块的构成</span></code></pre>
<p>caculator模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
namespace(&quot;caculator&quot;, [&quot;math&quot;], function(m){
  var action = &quot;add&quot;;
  function compute(a, b){
    return m[action](a, b);
  }
  return {
    compute: compute
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">namespace</span>(<span class="hljs-string">"caculator"</span>, [<span class="hljs-string">"math"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(m)</span></span>{
  <span class="hljs-keyword">var</span> action = <span class="hljs-string">"add"</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compute</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">return</span> m[action](a, b);
  }
  <span class="hljs-keyword">return</span> {
    compute: compute
  }
}</code></pre>
<p>依赖是统一注册在某个地方，而不是全局中的一个变量。</p>
<p>namespace的实现：</p>
<p><span class="img-wrap"><img data-src="/img/bVNfC6?w=493&amp;h=409" src="https://static.alili.tech/img/bVNfC6?w=493&amp;h=409" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>cache</code>中缓存了所有的模块。<br>实际返回的是<code>createModule</code>这个函数，参数包括：模块名，依赖的模块，当前模块的实现。<br>如果只传入了一个参数，就返回这个模块<code>cache[name]</code>。<br>取得所有依赖的模块<code>deps</code>，即保证前面的模块都已经被定义好了，这样当前模块（这里为<code>caculator</code>模块）才能运行。<br>最后初始化模并返回定义的模块<code>cache[name]</code>。</p>
<h4>该方法特点：</h4>
<ol>
<li><p><strong>不再污染全局环境</strong>：把模块都定义在一个<code>namespace</code>变量中。</p></li>
<li><p><strong>没有依赖管理</strong>：依然是我们手动进行依赖管理。</p></li>
</ol>
<h4>依赖管理（dependency manage）</h4>
<p>如果这些模块分散在不同的文件中，我们在用的时候就要对引入的脚本顺序进行手动排序。<br>比如 module2.js中依赖了module1.js，那么写的时候就要先写module.js，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <script src=&quot;module1.js&quot;></script>
  <script src=&quot;module2.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>但是我们在实际开发过程中的依赖总是很复杂。那是一条又长又复杂的依赖链。非要人肉分析是会抓狂的。而这其实是<strong>模块系统</strong>的工作。</p>
<h3 id="articleHeader25">二、模块系统</h3>
<h3 id="articleHeader26">1.模块系统的职责</h3>
<ul>
<li><p>依赖管理（加载 / 注入 / 分析 / 初始化）</p></li>
<li><p>决定模块写法</p></li>
</ul>
<h3 id="articleHeader27">2.CommonJS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
function add(a, b){
  return a + b;
}
function sub(a, b){
  return a - b;
}
exports.add = add
exports.sub = sub" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//main.js
<span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(a, b){
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> + b;
}
<span class="hljs-keyword">function</span> <span class="hljs-title">sub</span>(a, b){
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> - b;
}
exports.add = add
exports.sub = sub</code></pre>
<p>比原来的写法多了接口暴露：<code>exports.add = add</code> <code>exports.sub = sub</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
var math = require(&quot;./math&quot;);

function Caculator(container){
  //...
}

exports.Caculator = Caculator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">var</span> math = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./math"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Caculator</span>(<span class="hljs-params">container</span>)</span>{
  <span class="hljs-comment">//...</span>
}

exports.Caculator = Caculator</code></pre>
<p>比原来的写法多了依赖声明： <code>var math = require("./math");</code> 和 接口暴露：<code>exports.Caculator = Caculator</code>。</p>
<p>优点：</p>
<ul>
<li><p>运行时支持，模块定义非常简单：只是利用了几个全局变量<code>exports, module, require</code>。</p></li>
<li><p>文件级别的模块作用域隔离：这几个全局变量的作用域都是文件级别的，虽然JS没有文件级别的作用域，但我们对它进行了封装，使得使用时一个文件有一个作用域，它们使用起来非常安全。</p></li>
<li><p>可以处理循环依赖。</p></li>
</ul>
<p>缺点：</p>
<ul>
<li><p>不是标准组织的规范。</p></li>
<li><p>同步的require，没有考虑浏览器环境。而我们的浏览器文件加载是一个异步的过程，这是最大的问题，这是否就意味着我们的浏览器没办法使用了呢？当然不是。现在有很多工具比如<code>browserify</code>，比如<code>webpack</code>，可以帮助我们把多个文件级别的模块打包成一个文件，这样我们引入单个文件就可以在浏览器里使用了。</p></li>
</ul>
<p>因为CommonJS天然的不适合异步环境，所以出现了天然异步的AMD（Asynchronous Module Definition）</p>
<h3 id="articleHeader28">3.AMD</h3>
<p>与我们前面的namespace非常像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
define([], function(){
  function add(a, b){
    return a + b;
  }
  function sub(a, b){
    return a - b;
  }
  return {
    add: add,
    sub: sub
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//main.js</span>
define([], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">return</span> a + b;
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">return</span> a - b;
  }
  <span class="hljs-keyword">return</span> {
    add: add,
    sub: sub
  }
})</code></pre>
<p>比原来的写法多了包裹函数：<code>define</code>，第一个参数为依赖的模块列表，第二个参数为当前模块的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
define([&quot;./math&quot;], function(math){
  function Caculator(container){
    //...
  }
  return {
    Caculator: Caculator
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//caculator.js</span>
define([<span class="hljs-string">"./math"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(math)</span></span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Caculator</span><span class="hljs-params">(container)</span></span>{
    <span class="hljs-comment">//...</span>
  }
  <span class="hljs-keyword">return</span> {
    Caculator: Caculator
  }
}</code></pre>
<p>同时AMD还支持一个简单的CommonJS写法，只不过要用一层函数包裹起来<code>define(function(require, exports){ ... })</code>。</p>
<p>优点：</p>
<ul>
<li><p>专为异步I/O环境打造，适合浏览器环境。</p></li>
<li><p>支持类似CommonJS的书写方式。</p></li>
<li><p>通过插件支持可以加载非JS资源。</p></li>
<li><p>成熟的打包构建工具，并可结合插件实现一些预处理的工作。</p></li>
</ul>
<p>缺点：</p>
<ul>
<li><p>模块定义繁琐，需要额外的函数嵌套。</p></li>
<li><p>只是库级别的支持，需要引入额外的库，比如requireJS。</p></li>
<li><p>无法处理循环依赖。</p></li>
<li><p>无法实现条件加载，因为只是库级别的。</p></li>
</ul>
<h3 id="articleHeader29">4.原生JS语言级别支持的模块化标准ES6 Module（Javascript module definition for future）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
function add(a, b){
  return a + b;
}
function sub(a, b){
  return a - b;
}
export { add, sub }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//main.js
<span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(a, b){
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> + b;
}
<span class="hljs-keyword">function</span> <span class="hljs-title">sub</span>(a, b){
  <span class="hljs-keyword">return</span> <span class="hljs-type">a</span> - b;
}
export { add, sub }</code></pre>
<p>比原来的写法多了接口暴露：<code>export {add, sub}</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//caculator.js
import { math } from './math';

function Caculator(container){
  //...
}

export { Caculator }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//caculator.js</span>
<span class="hljs-keyword">import</span> { math } <span class="hljs-keyword">from</span> <span class="hljs-string">'./math'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Caculator</span>(<span class="hljs-params">container</span>)</span>{
  <span class="hljs-comment">//...</span>
}

<span class="hljs-keyword">export</span> { Caculator }</code></pre>
<p>比原来的写法多了依赖声明： <code>import { math } from './math';</code> 和 接口暴露：<code>export { Caculator }</code>。</p>
<p>优点：</p>
<ul>
<li><p>真正官方的规范，未来的趋势。</p></li>
<li><p>语言级别的支持。</p></li>
<li><p>适应所有的JavaScript运行时环境，包括浏览器。</p></li>
<li><p>可以处理循环依赖。</p></li>
</ul>
<h2 id="articleHeader30">框架（JS框架）</h2>
<h3 id="articleHeader31">什么是库和框架</h3>
<h4>库</h4>
<ul>
<li><p>针对特定问题的解答，就有专业性</p></li>
<li><p>不控制应用程序的流程</p></li>
<li><p>被动的被调用</p></li>
</ul>
<p>比如，一个DatePicker时间选择器是一个库，一个Backbone.view是一个框架。</p>
<h4>框架</h4>
<ul>
<li><p><strong>控制反转 Inverse of control</strong> &lt;···主要区别</p></li>
<li><p>决定应用程序生命周期</p></li>
<li><p>一般会集成大量的库</p></li>
</ul>
<p>下面这个图很好的解释了<strong>控制反转</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/bVNfST?w=641&amp;h=278" src="https://static.alili.tech/img/bVNfST?w=641&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>框架决定了什么时候调用库，什么时候要求你的代码去实现某些功能。</p>
<p>框架和库，他们都是解决方案。关于解决方案，分为7各方面：</p>
<ul>
<li><p>DOM</p></li>
<li><p>communication 通信</p></li>
<li><p>Utility 工具库</p></li>
<li><p>Template 模板技术</p></li>
<li><p>Component 组件</p></li>
<li><p>Route 路由</p></li>
<li><p>Architecture MV*架构</p></li>
</ul>
<h3 id="articleHeader32">1.DOM解决方案</h3>
<h4>重点：Selector / Manipulation(<em>操作</em>) / Event(dom) / Animation</h4>
<ol>
<li><p>jQuery</p></li>
<li><p>zepto.JS</p></li>
<li><p>Mootools</p></li>
<li><p>手势支持：Hammer.js</p></li>
<li><p>局部滚动：iScroll.js</p></li>
<li><p>高级动画：Velocity.js</p></li>
<li><p>视频播放：video.js</p></li>
</ol>
<h3 id="articleHeader33">2.Communication(通信)解决方案</h3>
<h4>重点：XMLHttpRequest / Form / JSONP / Socket</h4>
<h4>作用：</h4>
<ul>
<li><p>处理与服务器的请求与响应</p></li>
<li><p>预处理请求数据/响应数据 &amp; Error/Success的判断封装</p></li>
<li><p>多种类型请求，统一接口</p></li>
<li><p>处理浏览器兼容性</p></li>
</ul>
<ol>
<li><p>jQuery</p></li>
<li><p>zepto.JS</p></li>
<li><p>Reqwest</p></li>
<li><p>qwest</p></li>
</ol>
<p>以上都是异步的请求，但对于实时性要求非常高的产品比如im聊天工具，就需要立即响应。这时需要用websocket。推荐下面的库：</p>
<ol><li><p>socket.io</p></li></ol>
<h3 id="articleHeader34">3.Utility(工具包)解决方案</h3>
<h4>重点：函数增强 &amp; shim / Flow Control</h4>
<h4>职责：</h4>
<ul>
<li><p>提供JS原生不提供的功能</p></li>
<li><p>方法门面包装，使其易于使用。即shim（语言垫片），保证实现与规范一致。</p></li>
<li><p>异步队列 / 流程控制 比如promise</p></li>
</ul>
<h3 id="articleHeader35">3.Template</h3>
<h4>三种类型：String-based / Dom-based / Living Template</h4>
<p><span class="img-wrap"><img data-src="/img/bVNfZ1?w=918&amp;h=432" src="https://static.alili.tech/img/bVNfZ1?w=918&amp;h=432" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader36">4.Component组件</h3>
<h4>常用组件： Modal / Slider / DatePicker / Tabs / Editor</h4>
<ol>
<li><p>Bootstrap</p></li>
<li><p>Foundation</p></li>
</ol>
<h3 id="articleHeader37">5.Routing路由</h3>
<h4>分类：Client Side / Server Side</h4>
<h4>职责：</h4>
<ul>
<li><p>监听url变化，并通知注册的模块，进行页面切换</p></li>
<li><p>通过Javascript进行主动跳转</p></li>
<li><p>历史管理</p></li>
<li><p>对目标浏览器的兼容性的支持</p></li>
</ul>
<h4>route库</h4>
<p><span class="img-wrap"><img data-src="/img/bVNf3J?w=737&amp;h=405" src="https://static.alili.tech/img/bVNf3J?w=737&amp;h=405" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader38">6.Architecture架构（目的：解耦）</h3>
<h4>分类：MVC / MVVM / MV*</h4>
<h4>职责：</h4>
<ul>
<li><p>提供一种范式帮助（强制）开发者进行模块解耦</p></li>
<li><p>试图与模型分离</p></li>
<li><p>更容易进行单元测试</p></li>
<li><p>更容易实现应用程序的扩展</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNf4l?w=903&amp;h=449" src="https://static.alili.tech/img/bVNf4l?w=903&amp;h=449" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>各种框架比较的参考网站：<br><a href="http://todomvc.com/" rel="nofollow noreferrer" target="_blank">http://todomvc.com/</a><br><a href="https://www.javascripting.com/" rel="nofollow noreferrer" target="_blank">https://www.javascripting.com/</a><br><a href="https://www.javascriptoo.com/" rel="nofollow noreferrer" target="_blank">https://www.javascriptoo.com/</a><br><a href="http://microjs.com/#" rel="nofollow noreferrer" target="_blank">http://microjs.com/#</a></p>
<h3 id="articleHeader39">7.Component组件</h3>
<h1 id="articleHeader40">开发实践</h1>
<h2 id="articleHeader41">系统设计</h2>
<h3 id="articleHeader42">1.系统说明</h3>
<h3 id="articleHeader43">2.系统分解</h3>
<h3 id="articleHeader44">3.接口设计</h3>
<ul>
<li><p>数据类型（每个页面的每个模块都要单独定义包含的数据类型列表）</p></li>
<li><p>模板资源</p></li>
<li><p>异步接口（请求方式，请求地址，输入参数，输出结果）</p></li>
<li><p>页面摘要</p></li>
</ul>
<h3 id="articleHeader45">4.工程构建</h3>
<ul>
<li><p>项目结构</p></li>
<li><p>初始代码</p></li>
<li><p>模拟数据</p></li>
</ul>
<h2 id="articleHeader46">系统实现</h2>
<h3 id="articleHeader47">1.组件封装</h3>
<ul>
<li><p>通用原件（logo，输入框，图标，按钮，翻页，复选框列表，loading）</p></li>
<li><p>通用列表（歌单。歌手，收藏的节目）</p></li>
<li><p>复合组件（比如评论）</p></li>
<li><p>浮层弹窗</p></li>
</ul>
<p>一个组件（BannerSlifer）的栗子：</p>
<p><span class="img-wrap"><img data-src="/img/bVNgud?w=367&amp;h=407" src="https://static.alili.tech/img/bVNgud?w=367&amp;h=407" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader48">2.逻辑实现</h3>
<h2 id="articleHeader49">测试发布</h2>
<h3 id="articleHeader50">1.测试联调</h3>
<ol>
<li><p>本地测试</p></li>
<li><p>异步测试</p></li>
<li><p>对接联调</p></li>
</ol>
<h3 id="articleHeader51">2.发布上线</h3>
<ol>
<li><p>打包发布</p></li>
<li><p>优化配置</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端架构（git、模块化）

## 原文链接
[https://segmentfault.com/a/1190000009341189](https://segmentfault.com/a/1190000009341189)

