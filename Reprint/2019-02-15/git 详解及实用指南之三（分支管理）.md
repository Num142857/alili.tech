---
title: 'git 详解及实用指南之三（分支管理）' 
date: 2019-02-15 2:30:44
hidden: true
slug: lespgiqz4th
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000016720411">1. git 详解及实用指南之一 （本地操作）</a></p>
<p><a href="https://segmentfault.com/a/1190000016737370" target="_blank">2. git 详解及实用指南之二 （远程操作）</a></p>
<h2 id="articleHeader0">1.创建与合并分支</h2>
<p>利用分支就可以实现多人开发的伟大模式，从而提高生产效率。在整个 GIT 之中，主分支(master)主要是作为程序 的发布使用，一般而言很少会在主分支上进行代码的开发，都会在各自的子分支上进行。</p>
<p><strong>1）mastr 分支</strong></p>
<p>默认情况下，mastr是一条线，git 利用 master 指向最新的提交，再用 "HEAD" 批向 "master",就能确定当前分支以及当前分支的提交点。</p>
<p><span class="img-wrap"><img data-src="/img/bVbirlS?w=792&amp;h=254" src="https://static.alili.tech/img/bVbirlS?w=792&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上操作属于项目发布版本的执行顺序，因为最终发布就是 master 分支。但是对于其它的开发者，不应该应该在mastr 分支上进行。所以应该建立分支，而子分支最起码建立的时候应该是当前的 master 分支的状态。而分支的一但创建之后， HEAD 指针就会发生变化。</p>
<p><strong>2）分支提交 </strong></p>
<p>如果有新的提交，则 master 分支不会改变，只有 brh 分支会发生变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVbirlZ?w=864&amp;h=294" src="https://static.alili.tech/img/bVbirlZ?w=864&amp;h=294" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么此时 master 分支的版本号就落后于子分支了。但是不管子分支再怎么开发，也不是最新发布版本，所有的发布版本都保存在 master 分支上，那么就必须将分支与 master 的分支进行合并。</p>
<p><strong>3）分支提交 </strong></p>
<p>如果有新的提交，刚 master 分支不会改变，只有 bth 分支会发生改变。</p>
<p><span class="img-wrap"><img data-src="/img/bVbirmj?w=1010&amp;h=312" src="https://static.alili.tech/img/bVbirmj?w=1010&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当分支合并之后，实际上就相当于 master 的分支的提交点修改为子分支的提交点，而后这个合并应该在 master 分支上完成，而后 HEAD 需要修改指针，断开 brh 分支，而指向原本的 master 分支。</p>
<p><strong>4）删除子分支 </strong></p>
<p>如果有新的提交，刚 master 分支不会改变，只有 brh 分支会发生改变。</p>
<p><span class="img-wrap"><img data-src="/img/bVbirmz?w=1048&amp;h=328" src="https://static.alili.tech/img/bVbirmz?w=1048&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>分支删除掉之后所有的内容也就都取消了。</p>
<p><strong>5）创建一个分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong>6）当分支创建完成之后可以通过如下命令进行察看 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch
</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbirty?w=626&amp;h=88" src="https://static.alili.tech/img/bVbirty?w=626&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以发现现在提示当前工作区中有两个分支:一个是 brh 分支，另外一个是 master 分支，而现在的分支指向的 是 master 分支。</p>
<p><strong>7）切换到brh分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout <span class="hljs-keyword">brh
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbirte?w=616&amp;h=90" src="https://static.alili.tech/img/bVbirte?w=616&amp;h=90" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是很多时候我们创建分支的最终目的就是为了切换到此分支上进行开发，所以为了方便操作，在 git 之中提供了一 个更加简单的功能。</p>
<p><strong>创建并切换分支</strong></p>
<p>如果想要删除子分支，那么不能在当前分支上，所以切换回了 master 分支</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkgout master  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git checkgout <span class="hljs-keyword">master</span>  
</code><span class="hljs-title"></span></pre>
<p>删除子分支</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -d brh    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d <span class="hljs-keyword">brh </span>   
</code></pre>
<p>建立分支的同时可以自动的切换到子分支</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh       
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh </span>      
</code></pre>
<p><strong>8）切换到brh分支 </strong></p>
<p>现在已经成功的在brh分支上了，那么下面进行代码的修改;</p>
<p>修改 hello.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支管理练习！'</span>);
}
</code></pre>
<p>这个时候的 Hello.java 文件是属于子分支上的，而现在也在子分支上，那么下面查询一下子分支的状态。</p>
<p><span class="img-wrap"><img data-src="/img/bVbirt4?w=1098&amp;h=262" src="https://static.alili.tech/img/bVbirt4?w=1098&amp;h=262" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时更新的是子分支的内容，但是主分支上的数据呢?</p>
<p><strong>9）在子分支上将修改进行提交 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;modified hello.js file&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"modified hello.js file"</span>
</code></pre>
<p>当子分支的数据提交之后实际上并不会去修改 master 分支的内容。这就证明了，两个分支上的内容是彼此独立的。</p>
<p><strong>10）么既然分支都已经存在了，那么现在为了更加清楚，将master和brh两个分支都提交到远程服务器上(GITHUB) </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git remote set-url origin https://github.com/yootk/mldn.git 
git push origin master
git push origin brh

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">git </span><span class="hljs-string">remote </span><span class="hljs-built_in">set-url</span> <span class="hljs-string">origin </span><span class="hljs-string">https:</span>//<span class="hljs-string">github.</span><span class="hljs-string">com/</span><span class="hljs-string">yootk/</span><span class="hljs-string">mldn.</span><span class="hljs-string">git </span>
<span class="hljs-string">git </span><span class="hljs-string">push </span><span class="hljs-string">origin </span><span class="hljs-string">master
</span><span class="hljs-string">git </span><span class="hljs-string">push </span><span class="hljs-string">origin </span><span class="hljs-string">brh
</span>
</code></pre>
<p><strong>11）最终发布的版本一定是在master分支上，所以下面需要将brh分支与master分支进行合并(在主分支上)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git merge brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> merge <span class="hljs-keyword">brh
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbirva?w=692&amp;h=154" src="https://static.alili.tech/img/bVbirva?w=692&amp;h=154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在之前讲解的时候说过实际上是修改了 master 指针为 brh 分支的指针信息。所以此时的合并方式为“Fast-forward”,表示是快速合并方式，快速的合并方式并不会产生任何的 commit id。 它只是利用了合并子分支的 commit id 继续操作。</p>
<p><strong>12）此时的brh分支没有任何的用处了，那么就可以执行删除操作</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -d brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d <span class="hljs-keyword">brh
</span></code></pre>
<p><strong>13）提交 master 分支</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin master
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git push origin <span class="hljs-keyword">master</span>
</code><span class="hljs-title"></span></pre>
<p>现在在本地上已经没有了子分支，但是在远程服务器上依然会存在子分支。那么下面要删除远程分支。   </p>
<p><strong>14）删除远程分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin --delete brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> --<span class="hljs-built_in">delete</span> brh
</code></pre>
<p>那么此时远程分支就已经被成功的删除掉了。</p>
<h2 id="articleHeader1">2.分支的操作管理</h2>
<p>上面演示了分支的各个操作，包括使用分支、以及合并分支，同时也清楚了对于分支有两种方式一种 是本地分支，另外一种是远程分支，但是对于分支在 GIT 使用之中依然会有一些小小的问题，所以下面进行集中式的说明：</p>
<p><strong>1）为了方便还是建立一个新的分支 —— brh</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong>2）在此分支上建立一些文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class HelloWorld() {
  console.log('Hello World');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span>() </span>{
  console.log(<span class="hljs-string">'Hello World'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    git add .
    git commit -a -m &quot;Add Emp.java File&quot;   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>    git <span class="hljs-keyword">add</span><span class="bash"> .
</span>    git commit -a -m <span class="hljs-string">"Add Emp.java File"</span>   </code></pre>
<p>以上的代码是在子分支(brh)上建立的。</p>
<p><strong>3）此时并没有进行分支数据的提交，但是有人觉得这个brh分支名称不好，应该使用自己的姓名简写完成“wzy”</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -m brh wzy
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-m <span class="hljs-keyword">brh </span>wzy
</code></pre>
<p>现在相当于分支名称进行了重新的命名。</p>
<p><strong>4）将分支推送到远程服务器端</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin wzy
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> wzy
</code></pre>
<p><strong>5）在本地察看远程的分支</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 察看全部的分支，包括远程和本地的分支
git branch -a 

// 只察看远程的分支
git branch -r

// 只察看本地分支
git branch -l

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 察看全部的分支，包括远程和本地的分支</span>
git branch -<span class="hljs-selector-tag">a</span> 

<span class="hljs-comment">// 只察看远程的分支</span>
git branch -r

<span class="hljs-comment">// 只察看本地分支</span>
git branch -l

</code></pre>
<p><strong>6）此时“wzt”分支上已经做出了修改，但是并没有与master分支进行合并，因为现在所开发的功能开发到一半发现不再需要了，所以就要废除掉所作出的修改。于是发出了删除 wzy 分支的命令</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -d wzy  

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d wzy  

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisi7?w=928&amp;h=100" src="https://static.alili.tech/img/bVbisi7?w=928&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时直接提示，分支并不能够被删除掉，因为这个分支所做出的修改还没有进行合并。如果要想强制删除此分支， 则可以使用“-D”的参数完成。</p>
<p><span class="img-wrap"><img data-src="/img/bVbisja?w=704&amp;h=58" src="https://static.alili.tech/img/bVbisja?w=704&amp;h=58" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可是现在在远程服务器上依然会存在此分支，那么就必须也一起删除掉，但是对于删除操作，除了之前使用过的方 式之外，也可以推送一个空的分支，这样也表示删除。</p>
<p><strong>删除方式一</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin --delete wzy
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> --<span class="hljs-built_in">delete</span> wzy
</code></pre>
<p><strong>删除方式二</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin :wzy

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> :wzy

</code></pre>
<h2 id="articleHeader2">3.冲突解决</h2>
<p>分支可以很好的实现多人开发的互操作，但是有可能出现这样种情况:</p>
<ul>
<li>现在建立了一个新的分支 brh，并且有一位开发者在此分支上修改了 hello.js 文件。</li>
<li>但是这个开发者由于不小心的失误，又将分支切换回了 master 分支上，并且在 master 分支上也对 hello.js文件进行修改。</li>
</ul>
<p>等于现在有两个分支对同一个文件进行了修改，那么在进行提交的时候一定会出现一个冲突。因为系统不知道到底 提交那一个分支的文件。   </p>
<p>master 和 brh 两个分支上都有各自的信息提交，那么此时就形成了冲突：</p>
<p><span class="img-wrap"><img data-src="/img/bVbisx4?w=848&amp;h=264" src="https://static.alili.tech/img/bVbisx4?w=848&amp;h=264" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么很明显，此时有两个提交点，那么会出现怎样的冲突警告呢?为了更好的说明问题，下面通过代码进行验证:</p>
<p><strong>1）建立并切换到 brh 分支上</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong>2）在此分支上修改hello.js文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
   console.log('git 分支冲突练习！')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支管理练习！'</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支冲突练习！'</span>)
}</code></pre>
<p><strong>3）在brh分支上提交此文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;add static attribute&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"add static attribute"</span>
</code></pre>
<p><strong>4）切换回 master 分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout master 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git checkout <span class="hljs-keyword">master</span> 
</code><span class="hljs-title"></span></pre>
<p><strong>5）在 master 分支上也修改 Hello.js 文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
   console.log('git Mast 分支修改测试！ ')
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支管理练习！'</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git Mast 分支修改测试！ '</span>)
} 
</code></pre>
<p><strong>6）在master分支上进行修改的提交 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;add master change file&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"add master change file"</span>
</code></pre>
<p>现在在两个分支上都存在了代码的修改，而且很明显，修改的是同一个文件，那么自然进行分支合并的时候是无法 合并的。</p>
<p><strong>7）合并分支(此时已经存在于master分支上) </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git merge brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> merge <span class="hljs-keyword">brh
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisAl?w=938&amp;h=116" src="https://static.alili.tech/img/bVbisAl?w=938&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时会直接提示出现了冲突。</p>
<p><strong>8）察看冲突的内容 </strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVbisAL?w=1088&amp;h=392" src="https://static.alili.tech/img/bVbisAL?w=1088&amp;h=392" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>直接提示用户，两次修改了 Hello.java 文件。</p>
<p><strong>9） 察看 Hello.js 文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
<<<<<<< HEAD
   console.log('git Mast 分支修改测试！ ')
=======
   console.log('git 分支冲突练习！')
>>>>>>> brh
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>btn.onclick = function() {
<span class="hljs-code">   console.log('git 分支管理练习！');</span>
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
<span class="hljs-section">   console.log('git Mast 分支修改测试！ ')
=======</span>
<span class="hljs-code">   console.log('git 分支冲突练习！')</span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; brh
}

</code></pre>
<p>它现在把冲突的代码进行了标记，那么现在就必须人为手工修改发生冲突的文件。</p>
<p><strong>10）手工修改 Hello.js 文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
   console.log('git Mast 分支修改测试！ ')
   console.log('git 分支冲突练习！')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支管理练习！'</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git Mast 分支修改测试！ '</span>)
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支冲突练习！'</span>)
}
</code></pre>
<p>现在是希望这几个输出的内容都同时进行保留。</p>
<p><strong>11）此时已经手工解决了冲突，而后继续进行提交 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

git commit -a -m &quot;conflict print&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="stylus">git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"conflict print"</span>
</span></code></pre>
<p>那么现在的冲突问题就解决了。</p>
<p><strong>12）向服务器端提交信息 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin master
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git push origin <span class="hljs-keyword">master</span>
</code><span class="hljs-title"></span></pre>
<p>那么在实际的开发之中，一定会存在有许多的分支合并的情况，那么我怎么知道分支合并的历史呢?</p>
<p><strong> 13） 察看合并的情况 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git log --graph --pretty=oneline

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>git <span class="hljs-built_in">log</span> <span class="hljs-comment">--graph --pretty=oneline</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisBG?w=1132&amp;h=408" src="https://static.alili.tech/img/bVbisBG?w=1132&amp;h=408" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>“-graph”指的是采用绘图的方式进行现实。</p>
<p><strong> 14）  删除掉 brh 分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -d brh  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d <span class="hljs-keyword">brh </span> 
</code></pre>
<p>那么此时的代码就可以回归正常的开发模式。</p>
<h2 id="articleHeader3">4.分支管理策略</h2>
<p>在之前进行分支合并的时候使用的全部都是“Fast forward”方式完成的，而此种方式只是改变了master指针，可是 在分支的时候也可以不使用这种快合并，即:增加上一个“--no-ff”参数，这样就表示在合并之后会自动的再生成一个新 的 commit id，从而保证合并数据的完整性。</p>
<p>"-no-ff": 合并后动创建一个新的 commit</p>
<p><span class="img-wrap"><img data-src="/img/bVbisCt?w=918&amp;h=318" src="https://static.alili.tech/img/bVbisCt?w=918&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong> 1）创建一个新的分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong> 2）建立一个新的 empty.js 文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Empty() {
  console.log('empty file');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Empty</span>() </span>{
  console.log(<span class="hljs-string">'empty file'</span>);
}
</code></pre>
<p><strong> 3） 提交修改 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add.
git commit -m &quot;add empty.js file&quot;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span>.<span class="bash">
git commit -m <span class="hljs-string">"add empty.js file"</span>
</span>
</code></pre>
<p><strong> 4） 切换回master分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout master  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git checkout <span class="hljs-keyword">master</span>  
</code><span class="hljs-title"></span></pre>
<p><strong> 5） 使用非快速合并的方式进行代码合并 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git merge --no-ff -m &quot;no ff commit&quot; brh   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> merge --<span class="hljs-literal">no</span>-ff -m <span class="hljs-string">"no ff commit"</span> brh   
</code></pre>
<p>“--no-ff”方式会带有一个新的提交，所以需要为提交设置一个提交的注释。  </p>
<p><strong> 6）  察看一下提交的日志信息 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git log --graph --pretty=oneline --abbrev-commit 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> git <span class="hljs-built_in">log</span> <span class="hljs-comment">--graph --pretty=oneline --abbrev-commit </span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisDB?w=800&amp;h=252" src="https://static.alili.tech/img/bVbisDB?w=800&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>分支策略</h4>
<ul>
<li>master 分支应该是非常稳定的，也就是仅用来发布新的版本，不要在此分支上开发；</li>
<li>在各个子分支上进行开发工作；</li>
<li>团队中的每个成员都在各个分支上工作；</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbisDL?w=790&amp;h=170" src="https://static.alili.tech/img/bVbisDL?w=790&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">5.分支暂存</h2>
<p>譬如说同在你正在一个分支上进行代码的开发，但是突然你的领导给了你一个新的任务，并且告诉你在半个小时内 完成，那么怎么办? </p>
<p>难道那开发一半的分支要提交吗?不可能的，因为对于版本控制的基本的道德方式:你不能把有问题的代码提交上 去，你所提交的代码一定都是正确的代码，那么为了这样的问题，在 GIT 中提供了一个分支暂存的机制，可以将开发一半 的分支进行保存，而后在适当的时候进行代码的恢复。</p>
<p>那么下面首先创建一个基本的开发场景。</p>
<p><strong> 1）创建并切换到一个新的分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong> 2）下面在分支上编写empty.js 类的文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Empty() {
  console.log('empty file');
  console.log('我正在开发一半中。。。。。。')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Empty</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'empty file'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我正在开发一半中。。。。。。'</span>)
}
</code></pre>
<p><strong> 3）将此文件保存在暂存区之中 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> .
</span></code></pre>
<p>这个时候由于代码还没有开发完成，所以不能够进行代码的提交。但是你的老板给了你一个新的任务，那么你就不得不去停止当前的开发任务，所以就需要将当前的开发进度进行“暂存”，等日后有时间了继续进行恢复开发。</p>
<p><strong> 4）将工作暂存 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git stash

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">git stash</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisEP?w=1110&amp;h=82" src="https://static.alili.tech/img/bVbisEP?w=1110&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong> 5）察看一下当前的工作区中的内容 </strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVbisE6?w=774&amp;h=172" src="https://static.alili.tech/img/bVbisE6?w=774&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此处会直接告诉用户当前的工作区之中没有任何的修改。  </p>
<p><strong> 6）察看一下当前的工作区中的内容 </strong> </p>
<p>而后现在假设要修改的代码还处于master分支上，所以下面切换到master分支。</p>
<p>那么现在假设说创建一个新的分支，用于完成老板的需求，假设分支的名称为“dev”(也有可能是一个 bug 调试)。</p>
<p><strong> 7）创建并切换分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git checkout -<span class="hljs-selector-tag">b</span> dev
</code></pre>
<p><strong> 8） 在新的分支中修改Hello.js文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function() {
   console.log('git 分支管理练习！');
   console.log('git Mast 分支修改测试！ ')
   console.log('git 分支冲突练习！')
   console.log('临时任务 dev 上的修改')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支管理练习！'</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git Mast 分支修改测试！ '</span>)
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git 分支冲突练习！'</span>)
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'临时任务 dev 上的修改'</span>)
}
</code></pre>
<p><strong> 9） 提交修改的操作 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;dev change&quot;  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"dev change"</span>  
</code></pre>
<p><strong> 10） 提交修改的操作 </strong></p>
<p>合并 deve 分支，使用 no fast forward</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git merge --no-ff-m &quot;merge dev branch&quot; dev
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">git</span> merge --<span class="hljs-literal">no</span>-ff-m <span class="hljs-string">"merge dev branch"</span> dev
 </code></pre>
<p><strong> 11） 那么现在突发的问题已经被解决了，被解决之后对于 dev 的分支将没有任何的存在意义，可以直接删除; </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -d dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d dev
</code></pre>
<p><strong> 12） 那么需要回归到已有的工作状态，但是有可能会存在有许多的暂存的状态，可以直接使用如下命令进行列出。 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git stash list    

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>git stash <span class="hljs-built_in">list</span>    

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisGY?w=688&amp;h=60" src="https://static.alili.tech/img/bVbisGY?w=688&amp;h=60" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong> 13）从暂存区之中进行恢复</strong>       </p>
<p>暂存区恢复之后那么所暂停的操作将没有存在的意义，但是也有人会认为它有意义，所以对于恢复有两种形式:</p>
<p><strong>形式一:先恢复，而后再手工删除暂存</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git stash apply
git stash drop
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>git stash <span class="hljs-built_in">apply</span>
git stash <span class="hljs-built_in">drop</span>
</code></pre>
<p><strong>形式二:恢复的同时也将 stash 内容删除</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git stash pop  

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> stash <span class="hljs-keyword">pop </span> 

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisHz?w=1086&amp;h=454" src="https://static.alili.tech/img/bVbisHz?w=1086&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么下面的任务就可以像之前那样进行代码的提交，而后删除掉 brh 分支:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;change empty.js&quot;
git branch -d brh 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> commit -a -m <span class="hljs-string">"change empty.js"</span>
<span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-d <span class="hljs-keyword">brh </span>
</code></pre>
<p>使用暂存策略可以很方便的解决代码突然暂停修改的操作，是非常方便。</p>
<h2 id="articleHeader5">6.补丁: patch</h2>
<p>补丁并不是针对于所有代码的修改，只是针对于局部的修改。在很多的代码维护之中，如果按照最早克隆的方式将 代码整体克隆下来实际上所花费的资源是非常庞大的，但是修改的时候可能只修改很小的一部分代码，所以在这种情况下 就希望可以将一些代码的补丁信息发送给开发者。而发给开发者之后他需要知道那些代码被修改了，这样的话就可以使用 一个极低的开销实现代码的修改操作，而在 GIT 之中也提供了两种简单的补丁方案:</p>
<ul>
<li>使用 git diff 生成标准的 patch</li>
<li>使用 git format-patch 声称 git 专用的 patch</li>
</ul>
<p><strong> 1） 利用 git diff 生成标准的 patch </strong> </p>
<p><strong>当前的empty.js文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Empty() {
  console.log('empty file');
  console.log('我正在开发一半中。。。。。。')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Empty</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'empty file'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我正在开发一半中。。。。。。'</span>)
}
</code></pre>
<p><strong> 2） 建立一个新的分支 —— cbrh </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b cbrh    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git checkout -<span class="hljs-selector-tag">b</span> cbrh    
</code></pre>
<p><strong> 3） 修改 empty.js文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
public class Empty() {
  console.log('empty file');
  console.log('我正在开发一半中。。。。。。')

  console.log('补丁修改1');
  console.log('补丁修改2');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Empty</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'empty file'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我正在开发一半中。。。。。。'</span>)

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'补丁修改1'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'补丁修改2'</span>);
}
</code></pre>
<p><strong> 4） 而后察看前后代码的不同 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git diff empth.js  

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>git <span class="hljs-keyword">diff </span>empth.<span class="hljs-keyword">js </span> 

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisJe?w=704&amp;h=370" src="https://static.alili.tech/img/bVbisJe?w=704&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时可以发现 Emp.java 文件修改前后的对比情况。</p>
<p><strong> 5） 在cbrh上进行代码的提交 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
git commit -a -m &quot;add 2 line empty.js &quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"add 2 line empty.js "</span>
</code></pre>
<p>此时并没有和主分支进行提交，但是代码已经改变了，需要的是将代码的变化提交给开发者。</p>
<p><strong> 6） 生成补丁文件 —— mypatch </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git diff master > mypatch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git diff <span class="hljs-keyword">master</span> <span class="hljs-title">&gt; mypatch</span>
</code></pre>
<p><strong> 7）切换回master分支 </strong>   </p>
<p>此时会自动在项目目录中生成一个 mypat 的补丁文件信息。这个文件是可以由 git 读懂的信息文件，那么完成之后现在需要模拟另外一个开发者，另外一个开发者假设是专门进行补丁合并的开发者。    </p>
<p><strong> 8）创建并切换一个新的分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git checkout -b patchbrh  
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> git checkout -<span class="hljs-selector-tag">b</span> patchbrh  
 </code></pre>
<p><strong> 9）应用补丁信息 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
git apply mypatch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code> 
git <span class="hljs-built_in">apply</span> mypatch
</code></pre>
<p>此时补丁可以成功的使用了。</p>
<p><strong> 10）提交补丁的操作 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;patch apply&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"patch apply"</span>
</code></pre>
<p><strong> 11）切换回 master 分支之中进行分支合并 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout master
git merge --no-ff -m &quot;Merge Patch&quot; patchbrh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git checkout <span class="hljs-keyword">master</span>
<span class="hljs-title">git</span> merge --no-ff -m <span class="hljs-string">"Merge Patch"</span> patchbrh
</code></pre>
<p>这样如果只是将补丁数据的文件发送给开发者，那么就没有必要进行大量代码的传输，并且在创建补丁的时候也可以针对于多个文件进行补丁的创建。</p>
<h2 id="articleHeader6">7. 利用 git format-patch 生成 GIT 专用补丁</h2>
<p><strong> 1）创建并切换到cbrh分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -D cbrh
git branch -D patchbrh 
git checkout -b cbrh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-D cbrh
<span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>-D patchbrh 
<span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span>cbrh
</code></pre>
<p><strong> 2）创建并切换到cbrh分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Empty() {
  console.log('empty file');
  console.log('git format-patch 测试')
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Empty</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'empty file'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'git format-patch 测试'</span>)
} 
</code></pre>
<p><strong> 3）创建并切换到cbrh分支 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git commit -a -m &quot;add formatch test&quot;  
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"add formatch test"</span>  
 </code></pre>
<p><strong> 4）下面需要与原始代码做一个比较，而且比较后会自动的生成补丁文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git format-patch -M master
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code> git format-patch -M <span class="hljs-keyword">master</span>
</code><span class="hljs-title"></span></pre>
<p>现在表示要与 master 分支进行比较(而-M 参数就是指定分支)。</p>
<p><span class="img-wrap"><img data-src="/img/bVbisMk?w=800&amp;h=64" src="https://static.alili.tech/img/bVbisMk?w=800&amp;h=64" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时已经生成了一个补丁文件，因为只修改了一次的内容。这个补丁文件严格来将就是一个 email 数据，需要将此数据发送给开发者，而后开发者可以进行补丁的应用。</p>
<p><strong> 5）创建并切换到patchbrh分支上 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout master
git checkout -b patchbrh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git checkout <span class="hljs-keyword">master</span>
<span class="hljs-title">git</span> checkout -b patchbrh
</code></pre>
<p><strong> 6） 应用补丁的信息，利用“git am”完成 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git am 0001-add-formatch-test.patch 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git am <span class="hljs-number">0001</span>-<span class="hljs-keyword">add</span><span class="bash">-formatch-test.patch 
</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisNO?w=970&amp;h=62" src="https://static.alili.tech/img/bVbisNO?w=970&amp;h=62" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在是将发送过来的，带有 email 格式的补丁文件进行了应用。</p>
<p><strong> 7） 提交应用的更新</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 git commit -a -m &quot;method patch apply&quot;
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
 git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"method patch apply"</span>
 </code></pre>
<p>那么此时就可以成功的应用补丁进行代码的更正。</p>
<h4>关于两种补丁方式的说明</h4>
<ul>
<li>使用git diff生成补丁兼容性是比较好的，如果你是在不是git管理的仓库上，此类方式生成的补丁是非常容易接受的;</li>
<li>但是如果你是向公共的开发社区进行代码的补丁更正，那么建议使用git format-patch，这样不仅标准，而且也可以将更正人的信息进行公布。</li>
</ul>
<h2 id="articleHeader7">8. 多人协作开发</h2>
<p>分支的处理实际上是为了更好的多人开发做出的准备，那么下面就将利用两个命令行方式(模拟其他的开发者)进行项目代码的编写。首先说明一下:</p>
<ul>
<li>一般而言，master 分支项目的核心分支，只要进行代码的克隆，那么此分支一定会被保存下来;</li>
<li>开发者往往会建立一系列的分支，譬如，本次练习建立了一个 brh 的分支进行代码的编写;</li>
<li>如果要进行调试可以建立一个 bug 分支;</li>
<li>如果要增加某些新的功能则可以建立 feature 分支。</li>
</ul>
<p><strong> 1） 创建并切换到一个新的分支:brh </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong>2) 在新的分支上建立一个新的文件 —— Dept.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Dept() {
  console.log('多人协作开发!');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dept</span>() </span>{
  console.log(<span class="hljs-string">'多人协作开发!'</span>);
}</code></pre>
<p><strong>3) 将此代码进行提交 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m 'add dept.js files'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">'add dept.js files'</span>
</code></pre>
<p><strong>4) 将两个分支提交到服务器上去 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin master    
git push origin brh  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> master    
git <span class="hljs-built_in">push</span> <span class="hljs-built_in">origin</span> brh  
</code></pre>
<p><strong>5） [二号]为了模拟第二个开发者，所以建立一个新的命令行窗口，并且将代码复制下来(d:proclone) </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/qq449245884/HelloGitHub.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/qq449245884/HelloGitHub.git
</code></pre>
<p><strong>6)  [二号] 察看分支信息 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch -a

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git branch -<span class="hljs-selector-tag">a</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbisYr?w=706&amp;h=176" src="https://static.alili.tech/img/bVbisYr?w=706&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>发现现在只是将 master 分支拷贝下来了，但是 brh 分支并没有存在。</p>
<p><strong>7) [二号]建立并切换到brh分支上 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git checkout -b brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> checkout -<span class="hljs-keyword">b </span><span class="hljs-keyword">brh
</span></code></pre>
<p><strong>8) [二号]将远程服务器端上的brh分支的内容拷贝到本地的brh分支上 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git merge origin/brh
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code> git merge origin/<span class="hljs-keyword">brh
</span>   </code></pre>
<p><strong>9) [二号]现在开发者增加了一个Admin.js文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Admin() {
  console.log('多人协作测试!:')
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Admin</span>() </span>{
  console.log(<span class="hljs-string">'多人协作测试!:'</span>)
} 
</code></pre>
<p><strong>10)  [二号]将新的代码进行提交  </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add .
git commit -m 'add admin.js files'   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> .
</span>git commit -m <span class="hljs-string">'add admin.js files'</span>   
</code></pre>
<p><strong>11)   [二号]现在本地的 brh 分支代码发生了变化，那么应该将此变化提交到远程的 brh 分支上 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 git push origin brh
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>
 git <span class="hljs-keyword">push </span>origin <span class="hljs-keyword">brh
</span> </code></pre>
<p>现在代码已经发送到了服务器上了，并且在 brh 分支上增加了新的 Admin.java 文件。  </p>
<p><strong>12) [一号]这个时候最原始的开发者目录下还只是上一次提交的内容。那么需要取得最新的数据才可以  </strong> </p>
<p>对于取得最新的分支数据有两种方式:</p>
<ul>
<li>git fetch: 此操作只是取得最新的分支数据，但是不会发生 merge 合并操作</li>
<li>git pull: 此操作取出最新分支数据，并且同时发生 merge 合并操作<p>git pull</p>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbisZJ?w=1086&amp;h=570" src="https://static.alili.tech/img/bVbisZJ?w=1086&amp;h=570" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>实际上错误信息也很简单，指的是，当前的 brh 分支和服务器上的分支没有关系，所以如果要想读取代码，必须让两 个分支产生关联关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git branch --set-upstream-to=origin/brh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">branch </span>--set-upstream-to<span class="hljs-symbol">=origin</span>/<span class="hljs-keyword">brh
</span></code></pre>
<p>随后再次读取所有的代码。    </p>
<p><strong>13)  [二号]修改 Admin.js 类文件  </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Admin() {
  console.log('多人协作测试!:')
  console.log('二号我来个性了！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Admin</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'多人协作测试!:'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'二号我来个性了！'</span>);
}
</code></pre>
<p><strong>14)   [二号]将以上的代码进行提交  </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git commit -a -m 'update admin.js file'
 
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">'update admin.js file'</span>
 
 </code></pre>
<p><strong>15) [二号]向服务器端提交代码的修改</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git push origin brh   

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">git</span> <span class="hljs-keyword">push </span>origin <span class="hljs-keyword">brh </span>  

</code></pre>
<p><strong>16) [一号]开发者也进行 Admin.js 文件的修改</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Admin() {
  console.log('多人协作测试!:')
  console.log('一号也进行修改了!')
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Admin</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'多人协作测试!:'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'一号也进行修改了!'</span>)
}

</code></pre>
<p><strong>17) [一号]将代码提交</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -a -m &quot;1 update admin.js file&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git commit -<span class="hljs-selector-tag">a</span> -m <span class="hljs-string">"1 update admin.js file"</span>
</code></pre>
<p>但是这个时候很明显，两个用户一起修改了同一个文件。</p>
<p><strong>18) [一号]抓取最新的更新数据</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git pull

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">git pull</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbis08?w=930&amp;h=338" src="https://static.alili.tech/img/bVbis08?w=930&amp;h=338" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在可以发现，此时的程序，是两位开发者修改了同一个代码，所以产生了冲突。同时一号开发者之中的 Admin.js 文件的内容已经变更为如下情:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Admin() {
  console.log('多人协作测试!:')
<<<<<<< HEAD
  console.log('一号也进行修改了!')
=======
  console.log('二号我来个性了！');
>>>>>>> a600e113d2d139efc73eee2052ad509fa95d16e3
}


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>public class Admin() {
<span class="hljs-code">  console.log('多人协作测试!:')</span>
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
<span class="hljs-section">  console.log('一号也进行修改了!')
=======</span>
<span class="hljs-code">  console.log('二号我来个性了！');</span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; a600e113d2d139efc73eee2052ad509fa95d16e3
}


</code></pre>
<p><strong>19) [一号]手工解决冲突文件内容</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Admin() {
  console.log('多人协作测试!:')
  console.log('一号也进行修改了!')
  console.log('二号我来个性了！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Admin</span>() {</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'多人协作测试!:'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'一号也进行修改了!'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'二号我来个性了！'</span>);
}
</code></pre>
<p><strong>20) 再次执行提交和服务器推送</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" git commit -a -m &quot;3 Update Admin.js File&quot; 
 git push origin brh

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code> git commit -a -m <span class="hljs-string">"3 Update Admin.js File"</span> 
 git <span class="hljs-keyword">push </span>origin <span class="hljs-keyword">brh
</span>
</code></pre>
<p>现在已经成功的由本地的冲突扩充到了远程的冲突，相信通过一系列的代码大家也可以更好的理解分支的操作问题。</p>
<p><strong>你一笨笨的码农，我的世界只能终身学习！</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
git 详解及实用指南之三（分支管理）

## 原文链接
[https://segmentfault.com/a/1190000016755475](https://segmentfault.com/a/1190000016755475)

