---
title: '不会写shell的程序员照样是好前端——用Node.JS实现git hooks' 
date: 2019-02-11 2:30:49
hidden: true
slug: 8h6yy84myj8
categories: [reprint]
---

{{< raw >}}

                    
<p>git hooks想必很多攻城狮都不陌生，官方对于hooks有详细的<a href="https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks" rel="nofollow noreferrer" target="_blank">文档</a>，也有站内网友的文章<a href="https://segmentfault.com/a/1190000000356485">Git Hooks (1)：介绍</a>,<a href="https://segmentfault.com/a/1190000000356487" target="_blank">GIt Hooks (2)：脚本分类</a>，说的非常详细了，这里就不多做介绍，这里主要介绍一下如何写一个hook。</p>
<h2 id="articleHeader0">一个基本的git hook长什么样？</h2>
<p>对git-hooks有一个入门认识的朋友都知道，hooks存放在git仓库的<code>.git/hooks</code>目录下，其中包括很多hooks，这些是在git 仓库创建的时候自动生成的，后缀名统一都是<code>.sample</code>，表示这些hooks都是默认不启用的，当把后缀名去掉之后，就变成了可以使用的hook。</p>
<h3 id="articleHeader1">举个栗子</h3>
<p><span class="img-wrap"><img data-src="/img/bVuNGr" src="https://static.alili.tech/img/bVuNGr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>pre-commit这个hook是在<code>git commit</code>的时候触发的hook，这个hook里面写了什么呢？代码我就不贴了，没啥劲，主要的几点就是：</p>
<ol>
<li><p>这是一个shell脚本</p></li>
<li><p>这个脚本运行了一些东西然后退出了</p></li>
<li><p>退出的时候退出的错误码不是确定的</p></li>
</ol>
<p>这就是一个hook的最基本的组成：在命令行执行git操作的时候，自动执行hooks目录下相应的可执行脚本，然后根据脚本的退出状态决定此次操作是否成功。当退出的错误码不为0的时候，表示失败，操作终止，否则操作继续。</p>
<h3 id="articleHeader2">模拟场景</h3>
<p>如果现在有这样一个场景，在你的git仓库里，要求不允许提交<code>dist</code>目录，并且通过<code>mocha</code>的测试，否则不允许提交，用git hook 怎么做呢？</p>
<p>首先，这是在提交的时候的一个限制，所以应该考虑使用<code>pre-commit</code>这个hook，代码就不写了（不会写shell... Orz），整个过程如下：</p>
<ol>
<li><p>检查是否有<code>dist</code>目录，如果没有的话下一步，否则退出，错误码置为1。</p></li>
<li><p>执行mocha命令进行测试，如果测试全部通过的话，退出，错误码为0，否则错误码为1，同样退出。</p></li>
</ol>
<p>这样，当上述任何一步没有通过的时候，这个hook就会被终止，git-commit就无法通过，也就达到了限制提交的目的。</p>
<h2 id="articleHeader3">shell脚本的局限性——不会写</h2>
<p>作为一名普通的前端，兼，一名不太合格的工程师，我对于shell脚本实在是不熟悉，连Linux命令都玩不转，别说写出666的shell脚本了，囧~ 所以要另辟巧径做这件事。</p>
<p>前端仔们对js应该是非常熟练的，所以如果能用js写hooks，那不就爽了？而Node.JS正好给了我们希望，感激涕零的话就不多说了，绝对感动到哭！</p>
<p><span class="img-wrap"><img data-src="/img/bVuNJ5" src="https://static.alili.tech/img/bVuNJ5" alt="20151004154819_vcYJV.thumb.224_0.jpeg" title="20151004154819_vcYJV.thumb.224_0.jpeg" style="cursor: pointer; display: inline;"></span></p>
<p>Node.js写起脚本来也非常简单，比如一个最简单的脚本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

console.log('Hello World!');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-meta">#!/usr/bin/env node</span>

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Hello World!'</span>)<span class="hljs-comment">;</span></code></pre>
<p>给脚本赋予可执行权限之后就完全可以当做shell脚本来跑了，麻麻再也不用担心我不会shell了。同样的，在hooks中我们也可以这样用。再举个栗子</p>
<p><span class="img-wrap"><img data-src="/img/bVuNKy" src="https://static.alili.tech/img/bVuNKy" alt="060cc75c10385343024d82b79513b07ecb808848.jpg" title="060cc75c10385343024d82b79513b07ecb808848.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>还是刚才的场景，不允许有<code>dist</code>目录，同时通过所有mocha测试，用Node就可以这样写（这次我能show出代码了）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
var fs = require('fs'),
    spawnSync = require('child_process').spawnSync;
if(fs.existsSync('./dist')){
    console.log('Commit Abort!Please remove dist directory.');
    process.exit(1);
}
// 使用同步方法spawnSync执行mocha，测试的结果在result.status中，通过为0，不通过为1
var result = spawnSync('./node_modules/.bin/mocha',['test']); 
if(result.status){
    console.log('Commit Abort!Test failure.');
}
process.exit(result.status);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>),
    spawnSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawnSync;
<span class="hljs-keyword">if</span>(fs.existsSync(<span class="hljs-string">'./dist'</span>)){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Commit Abort!Please remove dist directory.'</span>);
    process.exit(<span class="hljs-number">1</span>);
}
<span class="hljs-comment">// 使用同步方法spawnSync执行mocha，测试的结果在result.status中，通过为0，不通过为1</span>
<span class="hljs-keyword">var</span> result = spawnSync(<span class="hljs-string">'./node_modules/.bin/mocha'</span>,[<span class="hljs-string">'test'</span>]); 
<span class="hljs-keyword">if</span>(result.status){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Commit Abort!Test failure.'</span>);
}
process.exit(result.status);</code></pre>
<p>这就是一个用Node.JS实现的基本的git-hook。</p>
<h2 id="articleHeader4">Node.JS的局限性——不能动</h2>
<p>client-side hook的一个问题就是没法在随着仓库变动，如果项目成员多的话，每个人都需要在自己本地添加一次，hooks有变动了更新也比较麻烦。</p>
<h4>解决方案</h4>
<p>我个人对这个问题有一个简单解决方案，我做了一个仓库<a href="https://github.com/y8n/git-hooks-node" rel="nofollow noreferrer" target="_blank">git-hooks-node</a>，每次写好git hooks之后通过自己写的工具进行build，生成一个类似于安装器的文件，然后提交到远程仓库，如<a href="https://github.com/y8n/git-hooks-node/blob/master/xgfe-ma/pre-commit.js" rel="nofollow noreferrer" target="_blank">pre-commit.js</a>是hook具体的内容，<a href="https://github.com/y8n/git-hooks-node/blob/master/xgfe-ma/pre-commit.installer.js" rel="nofollow noreferrer" target="_blank">pre-commit.installer.js</a>是生成的安装文件，也是一个脚本，github上的每一个文件都有相应的raw地址，如这个安装文件的地址为<a href="https://raw.githubusercontent.com/y8n/git-hooks-node/master/xgfe-ma/pre-commit.installer.js" rel="nofollow noreferrer" target="_blank">raw pre-commit.installer.js</a>，然后mac OS下的用户就可以使用<code>curl</code>获取脚本并运行，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl https://raw.githubusercontent.com/y8n/git-hooks-node/master/xgfe-ma/pre-commit.installer.js | node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">curl https://raw.githubusercontent.com/y8n/git-hooks-<span class="hljs-keyword">node</span><span class="hljs-title">/master</span>/xgfe-ma/pre-commit.installer.js | <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>安装效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVuNNb" src="https://static.alili.tech/img/bVuNNb" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样只要写好一个hook并发布，项目成员只要知道地址就可以一键安转（想想还有点小激动呢）。这样虽然没有解决hook不会随着仓库移动的问题，但也提供了一种在项目组里通用一套hook的方案。</p>
<h4>其他解决方法</h4>
<p><a href="https://github.com/typicode/husky" rel="nofollow noreferrer" target="_blank">husky</a>是GitHub上一个开源项目，它的做法是在<code>npm install</code>这个模块的时候自动在<code>.git/hooks</code>目录下创建很多hooks，然后再在package.json中指定每一个hook的执行脚本，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;npm test&quot;,
    &quot;prepush&quot;: &quot;npm test&quot;,
    &quot;commit-msg&quot;: &quot;./validate-commit-msg.js&quot;,
    &quot;...&quot;: &quot;...&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"npm test"</span>,
    <span class="hljs-string">"prepush"</span>: <span class="hljs-string">"npm test"</span>,
    <span class="hljs-string">"commit-msg"</span>: <span class="hljs-string">"./validate-commit-msg.js"</span>,
    <span class="hljs-string">"..."</span>: <span class="hljs-string">"..."</span>
  }</code></pre>
<p>这样就可以把hooks随着项目变动，真正做到项目成员共用一个git hook，但问题就是必须在项目中依赖husky，不过想想这样的方法也比上面我的方法高明许多 -.-!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不会写shell的程序员照样是好前端——用Node.JS实现git hooks

## 原文链接
[https://segmentfault.com/a/1190000004918996](https://segmentfault.com/a/1190000004918996)

