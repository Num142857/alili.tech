---
title: '在 Node.js 中引入模块：你所需要知道的一切都在这里' 
date: 2019-01-16 2:30:08
hidden: true
slug: o1pixgekc8
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009060869?w=1794&amp;h=648" src="https://static.alili.tech/img/remote/1460000009060869?w=1794&amp;h=648" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>本文作者：Jacob Beltran <br>编译：<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">胡子大哈</a> </p>
<p>翻译原文：<a href="http://huziketang.com/blog/posts/detail?postId=58eaf471a58c240ae35bb8e3" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58eaf471a58c240ae35bb8e3</a>  <br>英文连接：<a href="https://medium.freecodecamp.com/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8#.5czdrc1aa" rel="nofollow noreferrer" target="_blank">Requiring modules in Node.js: Everything you need to know</a></p>
</blockquote>
<p>Node 中有两个核心模块来对模块依赖进行管理：</p>
<ul>
<li><p><code>require</code> 模块。全局范围生效，不需要 <code>require('require')</code>。</p></li>
<li><p><code>module</code> 模块。全局范围生效，不需要 <code>require('module')</code>。</p></li>
</ul>
<p>你可以把 <code>require</code> 当做是命令行，而把 <code>module</code> 当做是所有引入模块的组织者。</p>
<p>在 Node 中引入模块并不是什么复杂的概念，见下面例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const config = require('/path/to/file');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'/path/to/file'</span>);</code></pre>
<p><code>require</code> 引入的对象主要是函数。当 Node 调用 <code>require()</code> 函数，并且传递一个文件路径给它的时候，Node 会经历如下几个步骤：</p>
<ul>
<li><p><strong>Resolving</strong>：找到文件的绝对路径；</p></li>
<li><p><strong>Loading</strong>：判断文件内容类型；</p></li>
<li><p><strong>Wrapping</strong>：打包，给这个文件赋予一个私有作用范围。这是使 <code>require</code> 和 <code>module</code> 模块在本地引用的一种方法；</p></li>
<li><p><strong>Evaluating</strong>：VM 对加载的代码进行处理的地方；</p></li>
<li><p><strong>Caching</strong>：当再次需要用这个文件的时候，不需要重复一遍上面步骤。</p></li>
</ul>
<p>本文中，我会用不同的例子来解释上面的各个步骤，并且介绍在 Node 中它们对我们写的模块有什么样的影响。</p>
<p>为了方便大家看文章和理解命令，我首先创建一个目录，后面的操作都会在这个目录中进行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    mkdir ~/learn-node &amp;&amp; cd ~/learn-node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="Linux" style="word-break: break-word; white-space: initial;">    mkdir ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; cd</span> ~/learn-<span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>文章中接下来的部分都会在 <code>~/learn-node</code> 文件夹下运行。</p>
<h2 id="articleHeader0">1. Resolving - 解析本地路径</h2>
<p>首先来为你介绍 <code>module</code> 对象，可以先在控制台中看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node
    > module
    Module {
      id: '<repl>',
      exports: {},
      parent: undefined,
      filename: null,
      loaded: false,
      children: [],
      paths: [ ... ] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">~/learn-node</span> <span class="hljs-string">$</span> <span class="hljs-string">node</span>
    <span class="hljs-string">&gt; module
    Module {
</span><span class="hljs-attr">      id:</span> <span class="hljs-string">'&lt;repl&gt;'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">      parent:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">      filename:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">      loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">      paths:</span> <span class="hljs-string">[</span> <span class="hljs-string">...</span> <span class="hljs-string">]</span> <span class="hljs-string">}</span></code></pre>
<p>每一个模块都有 <code>id</code> 属性来唯一标示它。<code>id</code> 通常是文件的完整路径，但是在控制台中一般显示成 <code>&lt;repl&gt;</code>。</p>
<p>Node 模块和文件系统中的文件通常是一一对应的，引入一个模块需要把文件内容加载到内存中。因为 Node 有很多种方法引入一个文件（例如相对路径，或者提前配置好的路径），所以首先需要找到文件的绝对路径。</p>
<p>如果我引入了一个 <code>'find-me'</code> 模块，并没有指定它的路径的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    require('find-me');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">require</span>(<span class="hljs-string">'find-me'</span>);</code></pre>
<p>Node 会按照 <code>module.paths</code> 所指定的文件目录顺序依次寻找 <code>find-me.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node
    > module.paths
    [ '/Users/samer/learn-node/repl/node_modules',
      '/Users/samer/learn-node/node_modules',
      '/Users/samer/node_modules',
      '/Users/node_modules',
      '/node_modules',
      '/Users/samer/.node_modules',
      '/Users/samer/.node_libraries',
      '/usr/local/Cellar/node/7.7.1/lib/node' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; module</span>.paths
    [ '/Users/samer/learn-<span class="hljs-keyword">node</span><span class="hljs-title">/repl</span>/node_modules',
      '/Users/samer/learn-<span class="hljs-keyword">node</span><span class="hljs-title">/node_modules</span>',
      '/Users/samer/node_modules',
      '/Users/node_modules',
      '/node_modules',
      '/Users/samer/.node_modules',
      '/Users/samer/.node_libraries',
      '/usr/local/Cellar/<span class="hljs-keyword">node</span><span class="hljs-title">/7</span>.<span class="hljs-number">7.1</span>/lib/<span class="hljs-keyword">node</span><span class="hljs-title">' ]</span></code></pre>
<p>这个路径列表基本上包含了从当前目录到根目录的所有路径中的 node_modules 目录。其中还包含了一些不建议使用的遗留目录。如果 Node 在上面所有的目录中都没有找到 <code>find-me.js</code>，会抛出一个“cannot find module error.”错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node
    > require('find-me')
    Error: Cannot find module 'find-me'
        at Function.Module._resolveFilename (module.js:470:15)
        at Function.Module._load (module.js:418:25)
        at Module.require (module.js:498:17)
        at require (internal/module.js:20:19)
        at repl:1:1
        at ContextifyScript.Script.runInThisContext (vm.js:23:33)
        at REPLServer.defaultEval (repl.js:336:29)
        at bound (domain.js:280:14)
        at REPLServer.runBound [as eval] (domain.js:293:12)
        at REPLServer.onLine (repl.js:533:10)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    ~/learn-node $ node
    &gt; require(<span class="hljs-string">'find-me'</span>)
    Error: Cannot find module <span class="hljs-string">'find-me'</span>
        at Function<span class="hljs-selector-class">.Module</span>._resolveFilename (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">470</span>:<span class="hljs-number">15</span>)
        at Function<span class="hljs-selector-class">.Module</span>._load (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">418</span>:<span class="hljs-number">25</span>)
        at Module<span class="hljs-selector-class">.require</span> (module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">498</span>:<span class="hljs-number">17</span>)
        at require (internal/module<span class="hljs-selector-class">.js</span>:<span class="hljs-number">20</span>:<span class="hljs-number">19</span>)
        at repl:<span class="hljs-number">1</span>:<span class="hljs-number">1</span>
        at ContextifyScript<span class="hljs-selector-class">.Script</span><span class="hljs-selector-class">.runInThisContext</span> (vm<span class="hljs-selector-class">.js</span>:<span class="hljs-number">23</span>:<span class="hljs-number">33</span>)
        at REPLServer<span class="hljs-selector-class">.defaultEval</span> (repl<span class="hljs-selector-class">.js</span>:<span class="hljs-number">336</span>:<span class="hljs-number">29</span>)
        at bound (domain<span class="hljs-selector-class">.js</span>:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
        at REPLServer<span class="hljs-selector-class">.runBound</span> [as eval] (domain<span class="hljs-selector-class">.js</span>:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)
        at REPLServer<span class="hljs-selector-class">.onLine</span> (repl<span class="hljs-selector-class">.js</span>:<span class="hljs-number">533</span>:<span class="hljs-number">10</span>)</code></pre>
<p>如果现在创建一个 <code>node_modules</code>，并把 <code>find-me.js</code> 放进去，那么 <code>require('find-me')</code> 就能找到了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ mkdir node_modules 
    ~/learn-node $ echo &quot;console.log('I am not lost');&quot; > node_modules/find-me.js
    ~/learn-node $ node
    > require('find-me');
    I am not lost
    {}
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> mkdir node_modules 
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo <span class="hljs-string">"console.log('I am not lost');"</span> &gt; node_modules/find-me.js
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; require</span>('find-me');
    I am not lost
    {}
    &gt;</code></pre>
<p>假设还有另一个目录中存在 <code>find-me.js</code>，例如在 home/node_modules 目录中有另一个 <code>find-me.js</code> 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $ mkdir ~/node_modules
    $ echo &quot;console.log('I am the root of all problems');&quot; > ~/node_modules/find-me.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>    $ <span class="hljs-built_in">mkdir</span> ~/node_modules
    $ <span class="hljs-keyword">echo</span> <span class="hljs-string">"console.log('I am the root of all problems');"</span> &gt; ~/node_modules/<span class="hljs-keyword">find</span>-<span class="hljs-keyword">me</span>.js</code></pre>
<p>当我们从 <code>learn-node</code> 目录中执行 <code>require('find-me')</code> 的时候，由于 <code>learn-node</code> 有自己的 <code>node_modules/find-me.js</code>，这时不会加载 home 目录下的 <code>find-me.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node
    > require('find-me')
    I am not lost
    {}
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; require</span>('find-me')
    I am not lost
    {}
    &gt;</code></pre>
<p>假设我们把 <code>learn-node</code> 目录下的 <code>node_modules</code> 移到 <code>~/learn-node</code>，再重新执行 <code>require('find-me')</code> 的话，按照上面规定的顺序查找文件，这时候 home 目录下的 <code>node_modules</code> 就会被使用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ rm -r node_modules/
    ~/learn-node $ node
    > require('find-me')
    I am the root of all problems
    {}
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> rm -r node_modules/
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; require</span>('find-me')
    I am the root of all problems
    {}
    &gt;</code></pre>
<h3 id="articleHeader1">require 一个文件夹</h3>
<p>模块不一定非要是文件，也可以是个文件夹。我们可以在 <code>node_modules</code> 中创建一个 <code>find-me</code> 文件夹，并且放一个 <code>index.js</code> 文件在其中。那么执行 <code>require('find-me')</code> 将会使用 <code>index.js</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ mkdir -p node_modules/find-me
    ~/learn-node $ echo &quot;console.log('Found again.');&quot; > node_modules/find-me/index.js
    ~/learn-node $ node
    > require('find-me');
    Found again.
    {}
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> mkdir -p node_modules/find-me
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo <span class="hljs-string">"console.log('Found again.');"</span> &gt; node_modules/find-me/index.js
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; require</span>('find-me');
    Found again.
    {}
    &gt;</code></pre>
<p>这里注意，我们本目录下创建了 <code>node_modules</code> 文件夹，就不会使用 home 目录下的 <code>node_modules</code> 了。</p>
<p>当引入一个文件夹的时候，默认会去找 <code>index.js</code> 文件，这也可以手动控制指定到其他文件，利用 <code>package.json</code> 的 <code>main</code> 属性就可以。例如，我们执行 <code>require('find-me')</code>，并且要从 <code>find-me</code> 文件夹下的 <code>start.js</code> 文件开始解析，那么用 <code>package.json</code> 的做法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ echo &quot;console.log('I rule');&quot; > node_modules/find-me/start.js
    ~/learn-node $ echo '{ &quot;name&quot;: &quot;find-me-folder&quot;, &quot;main&quot;: &quot;start.js&quot; }' > node_modules/find-me/package.json
    ~/learn-node $ node
    > require('find-me');
    I rule
    {}
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo <span class="hljs-string">"console.log('I rule');"</span> &gt; node_modules/find-me/<span class="hljs-literal">start</span>.js
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo '{ <span class="hljs-string">"name"</span>: <span class="hljs-string">"find-me-folder"</span>, <span class="hljs-string">"main"</span>: <span class="hljs-string">"start.js"</span> }' &gt; node_modules/find-me/package.json
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span>
    <span class="hljs-title">&gt; require</span>('find-me');
    I <span class="hljs-keyword">rule</span>
    {}
    &gt;</code></pre>
<h3 id="articleHeader2">require.resolve</h3>
<p>如果你只是想解析模块，而不执行的话，可以使用 <code>require.resolve</code> 函数。它和主 <code>require</code> 函数所做的事情一模一样，除了不加载文件。当没找到文件的时候也会抛出错误，如果找到会返回文件的完整路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    > require.resolve('find-me');
    '/Users/samer/learn-node/node_modules/find-me/start.js'
    > require.resolve('not-there');
    Error: Cannot find module 'not-there'
        at Function.Module._resolveFilename (module.js:470:15)
        at Function.resolve (internal/module.js:27:19)
        at repl:1:9
        at ContextifyScript.Script.runInThisContext (vm.js:23:33)
        at REPLServer.defaultEval (repl.js:336:29)
        at bound (domain.js:280:14)
        at REPLServer.runBound [as eval] (domain.js:293:12)
        at REPLServer.onLine (repl.js:533:10)
        at emitOne (events.js:101:20)
        at REPLServer.emit (events.js:191:7)
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>    &gt; require.resolve(<span class="hljs-symbol">'find</span>-me');
    '/Users/samer/learn-node/node_modules/find-me/start.js'
    &gt; require.resolve(<span class="hljs-symbol">'not</span>-there');
    Error: Cannot find module <span class="hljs-symbol">'not</span>-there'
        <span class="hljs-keyword">at</span> <span class="hljs-keyword">Function</span>.Module._resolveFilename (module.js:<span class="hljs-number">470</span>:<span class="hljs-number">15</span>)
        <span class="hljs-keyword">at</span> <span class="hljs-keyword">Function</span>.resolve (internal/module.js:<span class="hljs-number">27</span>:<span class="hljs-number">19</span>)
        <span class="hljs-keyword">at</span> repl:<span class="hljs-number">1</span>:<span class="hljs-number">9</span>
        <span class="hljs-keyword">at</span> ContextifyScript.Script.runInThisContext (vm.js:<span class="hljs-number">23</span>:<span class="hljs-number">33</span>)
        <span class="hljs-keyword">at</span> REPLServer.defaultEval (repl.js:<span class="hljs-number">336</span>:<span class="hljs-number">29</span>)
        <span class="hljs-keyword">at</span> bound (domain.js:<span class="hljs-number">280</span>:<span class="hljs-number">14</span>)
        <span class="hljs-keyword">at</span> REPLServer.runBound [as eval] (domain.js:<span class="hljs-number">293</span>:<span class="hljs-number">12</span>)
        <span class="hljs-keyword">at</span> REPLServer.onLine (repl.js:<span class="hljs-number">533</span>:<span class="hljs-number">10</span>)
        <span class="hljs-keyword">at</span> emitOne (events.js:<span class="hljs-number">101</span>:<span class="hljs-number">20</span>)
        <span class="hljs-keyword">at</span> REPLServer.emit (events.js:<span class="hljs-number">191</span>:<span class="hljs-number">7</span>)
    &gt;</code></pre>
<p>它可以用于检查一个包是否已经安装，只有当包存在的时候才使用该包。</p>
<h3 id="articleHeader3">相对路径和绝对路径</h3>
<p>除了可以把模块放在 <code>node_modules</code> 目录中，还有更自由的方法。我们可以把模块放在任何地方，然后通过相对路径（<code>./</code> 和 <code>../</code>）或者绝对路径（<code>/</code>)来指定文件路径。</p>
<p>例如 <code>find-me.js</code> 文件是在 <code>lib</code> 目录下，而不是在 <code>node_modules</code> 下，我们可以这样引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    require('./lib/find-me');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/find-me'</span>);</code></pre>
<h3 id="articleHeader4">文件的 parent-child 关系</h3>
<p>创建一个文件 <code>lib/util.js</code> 并且写一行 <code>console.log</code> 在里面来标识它，当然，这个 <code>console.log</code> 就是模块本身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ mkdir lib
    ~/learn-node $ echo &quot;console.log('In util', module);&quot; > lib/util.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>    ~<span class="hljs-regexp">/learn-node $ mkdir lib
    ~/learn</span>-node $ echo <span class="hljs-string">"console.log('In util', module);"</span> &gt; <span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">util</span>.<span class="hljs-title">js</span></span></code></pre>
<p>在 <code>index.js</code> 中写上将要执行的 node 命令，并且在 <code>index.js</code> 中引入 <code>lib/util.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ echo &quot;console.log('In index', module); require('./lib/util');&quot; > index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo <span class="hljs-string">"console.log('In index', module); require('./lib/util');"</span> &gt; index.js</code></pre>
<p>现在在 node 中执行 <code>index.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node index.js
    In index Module {
      id: '.',
      exports: {},
      parent: null,
      filename: '/Users/samer/learn-node/index.js',
      loaded: false,
      children: [],
      paths: [ ... ] }
    In util Module {
      id: '/Users/samer/learn-node/lib/util.js',
      exports: {},
      parent:
       Module {
         id: '.',
         exports: {},
         parent: null,
         filename: '/Users/samer/learn-node/index.js',
         loaded: false,
         children: [ [Circular] ],
         paths: [...] },
      filename: '/Users/samer/learn-node/lib/util.js',
      loaded: false,
      children: [],
      paths: [...] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">~/learn-node</span> <span class="hljs-string">$</span> <span class="hljs-string">node</span> <span class="hljs-string">index.js</span>
    <span class="hljs-string">In</span> <span class="hljs-string">index</span> <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">      parent:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">      filename:</span> <span class="hljs-string">'/Users/samer/learn-node/index.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">      paths:</span> <span class="hljs-string">[</span> <span class="hljs-string">...</span> <span class="hljs-string">]</span> <span class="hljs-string">}</span>
    <span class="hljs-string">In</span> <span class="hljs-string">util</span> <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      id:</span> <span class="hljs-string">'/Users/samer/learn-node/lib/util.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">      parent:</span>
       <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">         id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">         exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">         parent:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">         filename:</span> <span class="hljs-string">'/Users/samer/learn-node/index.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">         loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">         children:</span> <span class="hljs-string">[</span> <span class="hljs-string">[Circular]</span> <span class="hljs-string">],</span>
<span class="hljs-attr">         paths:</span> <span class="hljs-string">[...]</span> <span class="hljs-string">},</span>
<span class="hljs-attr">      filename:</span> <span class="hljs-string">'/Users/samer/learn-node/lib/util.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">      paths:</span> <span class="hljs-string">[...]</span> <span class="hljs-string">}</span></code></pre>
<p>注意到这里，<code>index</code> 模块（<code>id:'.'</code>）被列到了 <code>lib/util</code> 的 parent 属性中。而 <code>lib/util</code> 并没有被列到 <code>index</code> 的 children 属性，而是用一个 <code>[Circular]</code> 代替的。这是因为这是个循环引用，如果这里使用 <code>lib/util</code> 的话，那就变成一个无限循环了。这就是为什么在 <code>index</code> 中使用 <code>[Circular]</code> 来替代 <code>lib/util</code>。</p>
<p>那么重点来了，如果在 <code>lib/util</code> 中引入了 <code>index</code> 模块会怎么样？这就是我们所谓的模块循环依赖问题，在 Node 中是允许这样做的。</p>
<p>但是 Node 如何处理这种情况呢？为了更好地理解这一问题，我们先来了解一下模块对象的其他知识。</p>
<h2 id="articleHeader5">2. Loading - exports，module.exports，和模块的同步加载</h2>
<p>在所有的模块中，exports 都是一个特殊的对象。如果你有注意的话，上面我们每次打印模块信息的时候，都有一个是空值的 exports 属性。我们可以给这个 exports 对象加任何想加的属性，例如在 <code>index.js</code> 和 <code>lib/util.js</code> 中给它添加一个 <code>id</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 在 lib/util.js 的最上面添加这行
    exports.id = 'lib/util';
    // 在 index.js 的最上面添加这行
    exports.id = 'index';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>    <span class="hljs-comment">// 在 lib/util.js 的最上面添加这行</span>
    <span class="hljs-keyword">exports</span>.id = <span class="hljs-string">'lib/util'</span>;
    <span class="hljs-comment">// 在 index.js 的最上面添加这行</span>
    <span class="hljs-keyword">exports</span>.id = <span class="hljs-string">'index'</span>;</code></pre>
<p>执行 <code>index.js</code>，可以看到我们添加的属性已经存在于模块对象中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node index.js
    In index Module {
      id: '.',
      exports: { id: 'index' },
      loaded: false,
      ... }
    In util Module {
      id: '/Users/samer/learn-node/lib/util.js',
      exports: { id: 'lib/util' },
      parent:
       Module {
         id: '.',
         exports: { id: 'index' },
         loaded: false,
         ... },
      loaded: false,
      ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">~/learn-node</span> <span class="hljs-string">$</span> <span class="hljs-string">node</span> <span class="hljs-string">index.js</span>
    <span class="hljs-string">In</span> <span class="hljs-string">index</span> <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exports:</span> <span class="hljs-string">{</span> <span class="hljs-attr">id:</span> <span class="hljs-string">'index'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">      loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
      <span class="hljs-string">...</span> <span class="hljs-string">}</span>
    <span class="hljs-string">In</span> <span class="hljs-string">util</span> <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      id:</span> <span class="hljs-string">'/Users/samer/learn-node/lib/util.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exports:</span> <span class="hljs-string">{</span> <span class="hljs-attr">id:</span> <span class="hljs-string">'lib/util'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">      parent:</span>
       <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">         id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">         exports:</span> <span class="hljs-string">{</span> <span class="hljs-attr">id:</span> <span class="hljs-string">'index'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">         loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
         <span class="hljs-string">...</span> <span class="hljs-string">},</span>
<span class="hljs-attr">      loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
      <span class="hljs-string">...</span> <span class="hljs-string">}</span></code></pre>
<p>上面为了输出结果简洁，我删掉了一些属性。你可以往 exports 对象中添加任意多的属性，甚至可以把 exports 对象变成其他类型，比如把 exports 对象变成函数，做法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 在 index.js 的 console.log 前面添加这行
    module.exports = function() {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>    // 在 <span class="hljs-built_in">index</span>.js 的 console.<span class="hljs-built_in">log</span> 前面添加这行
    <span class="hljs-keyword">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {};</code></pre>
<p>当你执行 <code>index.js</code> 的时候，你会看到如下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node index.js
    In index Module {
      id: '.',
      exports: [Function],
      loaded: false,
      ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js
    <span class="hljs-keyword">In</span> index Module {
      id: '.',
      exports: [Function],
      loaded: <span class="hljs-literal">false</span>,
      ... }</code></pre>
<p>这里注意我们没有使用 <code>export = function() {}</code> 来改变 <code>exports</code> 对象。没有这样做是因为在模块中的 <code>exports</code> 变量实际上是 <code>module.exports</code> 的一个引用，而 <code>module.exports</code> 才是控制所有对外属性的。<code>exports</code> 和 <code>module.exports</code> 指向同一块内存，如果把 <code>exports</code> 指向一个函数，那么相当于改变了 <code>exports</code> 的指向，<code>exports</code> 就不再是引用了。即便你改变了 <code>exports</code>，<code>module.exports</code> 也是不变的。</p>
<p>模块的 <code>module.exports</code> 是一个模块的对外接口，就是当你使用 <code>require</code> 函数时所返回的东西。例如把 <code>index.js</code> 中的代码改一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const UTIL = require('./lib/util');
    console.log('UTIL:', UTIL);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> UTIL = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/util'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'UTIL:'</span>, UTIL);</code></pre>
<p>上面的代码将会捕获 <code>lib/util</code> 中输出的属性，赋值给 <code>UTIL</code> 常量。当执行 <code>index.js</code> 的时候，最后一行将会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    UTIL: { id: 'lib/util' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-selector-tag">UTIL</span>: { <span class="hljs-attribute">id</span>: <span class="hljs-string">'lib/util'</span> }</code></pre>
<p>接下来聊一下 <code>loaded</code> 属性。上面我们每次输出模块信息，都能看到一个 <code>loaded</code> 属性，值是 <code>false</code>。</p>
<p><code>module</code> 模块使用 <code>loaded</code> 属性来追踪哪些模块已经加载完毕，哪些模块正在加载。例如我们可以调用 <code>setImmediate</code> 来打印 <code>module</code> 对象，用它可以看到 <code>index.js</code> 的完全加载信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // In index.js
    setImmediate(() => {
      console.log('The index.js module object is now loaded!', module)
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    <span class="hljs-regexp">//</span> In index.js
    setImmediate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The index.js module object is now loaded!'</span>, <span class="hljs-built_in">module</span>)
    });</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    The index.js module object is now loaded! Module {
      id: '.',
      exports: [Function],
      parent: null,
      filename: '/Users/samer/learn-node/index.js',
      loaded: true,
      children:
       [ Module {
           id: '/Users/samer/learn-node/lib/util.js',
           exports: [Object],
           parent: [Circular],
           filename: '/Users/samer/learn-node/lib/util.js',
           loaded: true,
           children: [],
           paths: [Object] } ],
      paths:
       [ '/Users/samer/learn-node/node_modules',
         '/Users/samer/node_modules',
         '/Users/node_modules',
         '/node_modules' ] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">The</span> <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span> <span class="hljs-selector-tag">module</span> <span class="hljs-selector-tag">object</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">now</span> <span class="hljs-selector-tag">loaded</span>! <span class="hljs-selector-tag">Module</span> {
      <span class="hljs-attribute">id</span>: <span class="hljs-string">'.'</span>,
      <span class="hljs-attribute">exports</span>: [Function],
      <span class="hljs-attribute">parent</span>: null,
      <span class="hljs-attribute">filename</span>: <span class="hljs-string">'/Users/samer/learn-node/index.js'</span>,
      <span class="hljs-attribute">loaded</span>: true,
      <span class="hljs-attribute">children</span>:
       [ Module {
           <span class="hljs-attribute">id</span>: <span class="hljs-string">'/Users/samer/learn-node/lib/util.js'</span>,
           <span class="hljs-attribute">exports</span>: [Object],
           <span class="hljs-attribute">parent</span>: [Circular],
           <span class="hljs-attribute">filename</span>: <span class="hljs-string">'/Users/samer/learn-node/lib/util.js'</span>,
           <span class="hljs-attribute">loaded</span>: true,
           <span class="hljs-attribute">children</span>: [],
           <span class="hljs-attribute">paths</span>: [Object] } ],
      <span class="hljs-attribute">paths</span>:
       [ <span class="hljs-string">'/Users/samer/learn-node/node_modules'</span>,
         <span class="hljs-string">'/Users/samer/node_modules'</span>,
         <span class="hljs-string">'/Users/node_modules'</span>,
         <span class="hljs-string">'/node_modules'</span> ] }</code></pre>
<p>可以注意到 <code>lib/util.js</code> 和 <code>index.js</code> 都已经加载完毕了。</p>
<p>当一个模块加载完成的时候，<code>exports</code> 对象才完整，整个加载的过程都是同步的。这也是为什么在一个事件循环后所有的模块都处于完全加载状态的原因。</p>
<p>这也意味着不能异步改变 <code>exports</code> 对象，例如，对任何模块做下面这样的事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    fs.readFile('/etc/passwd', (err, data) => {
      if (err) throw err;
      exports.data = data; // Will not work.
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    fs.readFile(<span class="hljs-string">'/etc/passwd'</span>, <span class="hljs-function"><span class="hljs-params">(err, data)</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      exports.data = data; <span class="hljs-regexp">//</span> Will <span class="hljs-keyword">not</span> work.
    });</code></pre>
<h3 id="articleHeader6">模块循环依赖</h3>
<p>我们现在来回答上面说到的循环依赖的问题：模块 1 依赖模块 2，模块 2 也依赖模块 1，会发生什么？</p>
<p>现在来创建两个文件，<code>lib/module1.js</code> 和 <code>lib/module2.js</code>，并且让它们相互引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // lib/module1.js
    exports.a = 1;
    require('./module2');
    exports.b = 2;
    exports.c = 3;
    
    // lib/module2.js
    const Module1 = require('./module1');
    console.log('Module1 is partially loaded here', Module1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>    /<span class="hljs-regexp">/ lib/module</span>1.js
    exports.a = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">require</span>(<span class="hljs-string">'./module2'</span>);
    exports.b = <span class="hljs-number">2</span>;
    exports.c = <span class="hljs-number">3</span>;
    
    <span class="hljs-regexp">//</span> <span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">module2</span>.<span class="hljs-title">js</span></span>
    const Module1 = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./module1'</span>);
    console.log(<span class="hljs-string">'Module1 is partially loaded here'</span>, Module1);</code></pre>
<p>接下来执行 <code>module1.js</code>，可以看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node lib/module1.js
    Module1 is partially loaded here { a: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span> <span class="hljs-title">lib</span>/module1.js
    Module1 is partially loaded here { a: <span class="hljs-number">1</span> }</code></pre>
<p>在 <code>module1</code> 完全加载之前需要先加载 <code>module2</code>，而 <code>module2</code> 的加载又需要 <code>module1</code>。这种状态下，我们从 <code>exports</code> 对象中能得到的就是在发生循环依赖之前的这部分。上面代码中，只有 <code>a</code> 属性被引入，因为 <code>b</code> 和 <code>c</code> 都需要在引入 <code>module2</code> 之后才能加载进来。</p>
<p>Node 使这个问题简单化，在一个模块加载期间开始创建 <code>exports</code> 对象。如果它需要引入其他模块，并且有循环依赖，那么只能部分引入，也就是只能引入发生循环依赖之前所定义的这部分。</p>
<h3 id="articleHeader7">JSON 和 C/C++ 扩展文件</h3>
<p>我们可以使用 require 函数本地引入 JSON 文件和 C++ 扩展文件，理论上来讲，不需要指定其扩展名。</p>
<p>如果没有指定扩展名，Node 会先尝试将其按 <code>.js</code> 文件来解析，如果不是 <code>.js</code> 文件，再尝试按 <code>.json</code> 文件来解析。如果都不是，会尝试按 <code>.node</code> 二进制文件解析。但是为了使程序更清晰，当引入除了 <code>.js</code> 文件的时候，你都应该指定文件扩展名。</p>
<p>如果你要操作的文件是一些静态配置值，或者是需要定期从外部文件中读取的值，那么引入 JSON 是很好的一个选择。例如有如下的 <code>config.json</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
      &quot;host&quot;: &quot;localhost&quot;,
      &quot;port&quot;: 8080
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>    {
      <span class="hljs-attr">"host"</span>: <span class="hljs-string">"localhost"</span>,
      <span class="hljs-attr">"port"</span>: <span class="hljs-number">8080</span>
    }</code></pre>
<p>我们可以直接像这样引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const { host, port } = require('./config');
    console.log(`Server will run at http://${host}:${port}`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> { host, port } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Server will run at http://<span class="hljs-subst">${host}</span>:<span class="hljs-subst">${port}</span>`</span>);</code></pre>
<p>运行上面的代码会得到这样的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Server will run at http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">Server</span> will <span class="hljs-built_in">run</span> at http:<span class="hljs-comment">//localhost:8080</span></code></pre>
<p>如果 Node 按 <code>.js</code> 和 <code>.json</code> 解析都失败的话，它会按 <code>.node</code> 解析，把这个文件当做一个已编译的扩展模块来解析。</p>
<p>Node 文档中有一个 C++ 写的<a href="https://nodejs.org/api/addons.html#addons_hello_world" rel="nofollow noreferrer" target="_blank">示例扩展文件</a>，它只暴露出一个 <code>hello()</code> 函数，并且函数输出 “world”。</p>
<p>你可以使用 <code>node-gyp</code> 包编译 <code>.cc</code> 文件，生成 <code>.addon</code> 文件。只需要配置 <a href="https://nodejs.org/api/addons.html#addons_building" rel="nofollow noreferrer" target="_blank">binding.gyp</a> 文件来告诉 <code>node-gyp</code> 需要做什么就可以了。</p>
<p>当你有了 <code>addon.node</code> 文件（名字你可以在 <code>binding.gyp</code> 中随意配置）以后，你就可以在本地像引入其他模块一样引入它了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const addon = require('./addon');
    console.log(addon.hello());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> addon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./addon'</span>);
    <span class="hljs-built_in">console</span>.log(addon.hello());</code></pre>
<p>可以通过 <code>require.extensions</code> 来查看对三种文件的支持情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009060870?w=800&amp;h=443" src="https://static.alili.tech/img/remote/1460000009060870?w=800&amp;h=443" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以清晰地看到 Node 对每种扩展名所使用的函数及其操作：对 <code>.js</code> 文件使用 <code>module._compile</code>；对 <code>.json</code> 文件使用 <code>JSON.parse</code>；对 <code>.node</code> 文件使用 <code>process.dlopen</code>。</p>
<h2 id="articleHeader8">3. Wrapping - 你在 Node 中所写的所有代码都会被打包成函数</h2>
<p>Node 的打包模块不是很好理解，首先要先知道 <code>exports</code> / <code>module.exports</code> 的关系。</p>
<p>我们可以用 <code>exports</code> 对象来输出属性，但是不能直接对 <code>exports</code> 进行赋值（替换整个 <code>exports</code> 对象），因为它仅仅是 <code>module.exports</code> 的引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    exports.id = 42; // This is ok.
    exports = { id: 42 }; // This will not work.
    module.exports = { id: 42 }; // This is ok." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>    <span class="hljs-keyword">exports</span>.id = <span class="hljs-number">42</span>; <span class="hljs-comment">// This is ok.</span>
    <span class="hljs-keyword">exports</span> = { id: <span class="hljs-number">42</span> }; <span class="hljs-comment">// This will not work.</span>
    <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = { id: <span class="hljs-number">42</span> }; <span class="hljs-comment">// This is ok.</span></code></pre>
<p>在介绍 Node 的打包过程之前先来了解另一个问题，通常情况下，在浏览器中我们在脚本中定义一个变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var answer = 42;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">    var answer</span> = 42;</code></pre>
<p>这种方式定义以后，<code>answer</code> 变量就是一个全局变量了。其他脚本中依然可以访问。而 Node 中不是这样，你在一个模块中定义一个变量，程序的其他模块是不能访问的。Node 是如何做到的呢？</p>
<p>答案很简单，在编译成模块之前，Node 把模块代码都打包成函数，可以用 <code>module</code> 的 <code>wrapper</code> 属性来查看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~ $ node
    > require('module').wrapper
    [ '(function (exports, require, module, __filename, __dirname) { ',
      '\n});' ]
    >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>    ~ $ node
    &gt; <span class="hljs-keyword">require</span>(<span class="hljs-string">'module'</span>).wrapper
    [ <span class="hljs-string">'(function (exports, require, module, __filename, __dirname) { '</span>,
      <span class="hljs-string">'\n});'</span> ]
    &gt;</code></pre>
<p>Node 并不直接执行你所写的代码，而是把你的代码打包成函数后，执行这个函数。这就是为什么一个模块的顶层变量的作用域依然仅限于本模块的原因。</p>
<p>这个打包函数有 5 个参数：<code>exports</code>，<code>require</code>，<code>module</code>，<code>__filename</code>，<code>__dirname</code>。函数使变量看起来全局生效，但实际上只在模块内生效。所有的这些参数都在 Node 执行函数时赋值。<code>exports</code> 定义成 <code>module.exports</code> 的引用；<code>require</code> 和 <code>module</code> 都指定为将要执行的这个函数；<code>__filename</code> 和 <code>__dirname</code> 指这个打包模块的绝对路径和目录路径。</p>
<p>在脚本的第一行输入有问题的代码，就能看到 Node 打包的行为；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ echo &quot;euaohseu&quot; > bad.js
    ~/learn-node $ node bad.js
    ~/bad.js:1
    (function (exports, require, module, __filename, __dirname) { euaohseu
                                                                  ^
    ReferenceError: euaohseu is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> echo <span class="hljs-string">"euaohseu"</span> &gt; bad.js
    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span> <span class="hljs-title">bad</span>.js
    ~/bad.js:<span class="hljs-number">1</span>
    (function (exports, require, module, __filename, __dirname) { euaohseu
                                                                  ^
    ReferenceError: euaohseu is not <span class="hljs-keyword">defined</span></code></pre>
<p>注意这里报告出错误的就是打包函数。</p>
<p>另外，模块都打包成函数了，我们可以使用 <code>arguments</code> 关键字来访问函数的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ echo &quot;console.log(arguments)&quot; > index.js
    ~/learn-node $ node index.js
    { '0': {},
      '1':
       { [Function: require]
         resolve: [Function: resolve],
         main:
          Module {
            id: '.',
            exports: {},
            parent: null,
            filename: '/Users/samer/index.js',
            loaded: false,
            children: [],
            paths: [Object] },
         extensions: { ... },
         cache: { '/Users/samer/index.js': [Object] } },
      '2':
       Module {
         id: '.',
         exports: {},
         parent: null,
         filename: '/Users/samer/index.js',
         loaded: false,
         children: [],
         paths: [ ... ] },
      '3': '/Users/samer/index.js',
      '4': '/Users/samer' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">~/learn-node</span> <span class="hljs-string">$</span> <span class="hljs-string">echo</span> <span class="hljs-string">"console.log(arguments)"</span> <span class="hljs-string">&gt; index.js
    ~/learn-node $ node index.js
    { '0': {},
      '1':
       { [Function: require]
</span><span class="hljs-attr">         resolve:</span> <span class="hljs-string">[Function:</span> <span class="hljs-string">resolve],</span>
<span class="hljs-attr">         main:</span>
          <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">            parent:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">            filename:</span> <span class="hljs-string">'/Users/samer/index.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">            children:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">            paths:</span> <span class="hljs-string">[Object]</span> <span class="hljs-string">},</span>
<span class="hljs-attr">         extensions:</span> <span class="hljs-string">{</span> <span class="hljs-string">...</span> <span class="hljs-string">},</span>
<span class="hljs-attr">         cache:</span> <span class="hljs-string">{</span> <span class="hljs-string">'/Users/samer/index.js'</span><span class="hljs-string">:</span> <span class="hljs-string">[Object]</span> <span class="hljs-string">}</span> <span class="hljs-string">},</span>
      <span class="hljs-string">'2'</span><span class="hljs-string">:</span>
       <span class="hljs-string">Module</span> <span class="hljs-string">{</span>
<span class="hljs-attr">         id:</span> <span class="hljs-string">'.'</span><span class="hljs-string">,</span>
<span class="hljs-attr">         exports:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">         parent:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">         filename:</span> <span class="hljs-string">'/Users/samer/index.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">         loaded:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">         children:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">         paths:</span> <span class="hljs-string">[</span> <span class="hljs-string">...</span> <span class="hljs-string">]</span> <span class="hljs-string">},</span>
      <span class="hljs-string">'3'</span><span class="hljs-string">:</span> <span class="hljs-string">'/Users/samer/index.js'</span><span class="hljs-string">,</span>
      <span class="hljs-string">'4'</span><span class="hljs-string">:</span> <span class="hljs-string">'/Users/samer'</span> <span class="hljs-string">}</span></code></pre>
<p>第一个参数是 <code>exports</code> 对象，初始为空；<code>require</code> 和 <code>module</code> 对象都是即将执行的 <code>index.js</code> 的实例；最后两个参数是文件路径和目录路径。</p>
<p>打包函数的返回值是 <code>module.exports</code>。在模块内部，可以使用 <code>exports</code> 对象来改变 <code>module.exports</code> 属性，但是不能对 <code>exports</code> 重新赋值，因为它只是 <code>module.exports</code> 的引用。</p>
<p>相当于如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function (require, module, __filename, __dirname) {
      let exports = module.exports;
      // Your Code...
      return module.exports;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, __filename, __dirname</span>) </span>{
      <span class="hljs-keyword">let</span> exports = <span class="hljs-built_in">module</span>.exports;
      <span class="hljs-comment">// Your Code...</span>
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }</code></pre>
<p>如果对 <code>exports</code> 重新赋值（改变整个 <code>exports</code> 对象），那它就不是 <code>module.exports</code> 的引用了。这是 JavaScript 引用的工作原理，不仅仅是在这里是这样。</p>
<h2 id="articleHeader9">4. Evaluating - require 对象</h2>
<p><code>require</code> 没有什么特别的，通常作为一个函数返回 <code>module.exports</code> 对象，函数参数是一个模块名或者一个路径。如果你想的话，尽可以根据自己的逻辑重写 <code>require</code> 对象。</p>
<p>例如，为了达到测试的目的，我们希望所有的 <code>require</code> 都默认返回一个 mock 值来替代真实的模块返回值。可以简单地实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    require = function() {
      return { mocked: true };
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-built_in">require</span> = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">mocked</span>: <span class="hljs-literal">true</span> };
    }</code></pre>
<p>这样重写了 <code>require</code> 以后，每个 <code>require('something')</code> 调用都会返回一个模拟对象。</p>
<p><code>require</code> 对象也有自己的属性。上面已经见过了 <code>resolve</code> 属性，它的任务是处理引入模块过程中的解析步骤，上面还提到过 <code>require.extensions</code> 也是 <code>require</code> 的属性。还有 <code>require.main</code>，它用于判断一个脚本是否应该被引入还是直接执行。</p>
<p>例如，在 <code>print-in-frame.js</code> 中有一个 <code>printInFrame</code> 函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // In print-in-frame.js
    const printInFrame = (size, header) => {
      console.log('*'.repeat(size));
      console.log(header);
      console.log('*'.repeat(size));
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>    // <span class="hljs-keyword">In</span> <span class="hljs-built_in">print</span>-<span class="hljs-keyword">in</span>-frame.js
    const printInFrame = (<span class="hljs-built_in">size</span>, header) =&gt; {
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'*'</span>.<span class="hljs-built_in">repeat</span>(<span class="hljs-built_in">size</span>));
      console.<span class="hljs-built_in">log</span>(header);
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'*'</span>.<span class="hljs-built_in">repeat</span>(<span class="hljs-built_in">size</span>));
    };</code></pre>
<p>函数有两个参数，一个是数字类型参数 <code>size</code>，一个是字符串类型参数 <code>header</code>。函数功能很简单，这里不赘述。</p>
<p>我们想用两种方式使用这个文件：</p>
<p>1.直接使用命令行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ~/learn-node $ node print-in-frame 8 Hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">    ~/learn-<span class="hljs-keyword">node</span> <span class="hljs-title">$</span> <span class="hljs-keyword">node</span> <span class="hljs-title">print-in-frame</span> <span class="hljs-number">8</span> Hello</code></pre>
<p>传递 8 和 “Hello” 两个参数进去，打印 8 个星星包裹下的 “Hello”。</p>
<p>2.使用 <code>require</code>。假设所引入的模块对外接口是 <code>printInFrame</code> 函数，我们可以这样调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const print = require('./print-in-frame');
    print(5, 'Hey');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>    <span class="hljs-keyword">const</span> <span class="hljs-built_in">print</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./print-in-frame'</span>);
    <span class="hljs-built_in">print</span>(<span class="hljs-number">5</span>, <span class="hljs-string">'Hey'</span>);</code></pre>
<p>传递的参数是 5 和 “Hey”。</p>
<p>这是两种不同的用法，我们需要一种方法来判断这个文件是作为独立的脚本来运行，还是需要被引入到其他的脚本中才能执行。可以使用简单的 if 语句来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (require.main === module) {
      // 这个文件直接执行（不需要 require）
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">require</span>.main === <span class="hljs-keyword">module</span>) {
      <span class="hljs-comment">// 这个文件直接执行（不需要 require）</span>
    }</code></pre>
<p>继续演化，可以使用不同的调用方式来实现最初的需求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // In print-in-frame.js
    const printInFrame = (size, header) => {
      console.log('*'.repeat(size));
      console.log(header);
      console.log('*'.repeat(size));
    };
    if (require.main === module) {
      printInFrame(process.argv[2], process.argv[3]);
    } else {
      module.exports = printInFrame;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    <span class="hljs-regexp">//</span> In <span class="hljs-built_in">print</span>-<span class="hljs-keyword">in</span>-frame.js
    const printInFrame = <span class="hljs-function"><span class="hljs-params">(size, header)</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'*'</span>.repeat(size));
      <span class="hljs-built_in">console</span>.log(header);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'*'</span>.repeat(size));
    };
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">require</span>.main === <span class="hljs-built_in">module</span>) {
      printInFrame(process.argv[<span class="hljs-number">2</span>], process.argv[<span class="hljs-number">3</span>]);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">module</span>.exports = printInFrame;
    }</code></pre>
<p>当文件不需要被 require 时，直接通过 <code>process.argv</code> 调用 <code>printInFrame</code> 函数即可。否则直接把 <code>module.exports</code> 变成 <code>printInFrame</code> 就可以了，即模块接口是 <code>printInFrame</code>。</p>
<h2 id="articleHeader10">5. Caching - 所有的模块都会被缓存</h2>
<p>对缓存的理解特别重要，我用简单的例子来解释缓存。</p>
<p>假设你有一个 <code>ascii-art.js</code> 文件，打印很酷的 header:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009060871?w=1000&amp;h=275" src="https://static.alili.tech/img/remote/1460000009060871?w=1000&amp;h=275" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们想要在每次 <code>require</code> 这个文件的时候，都打印出 header。所以把这个文件引入两次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    require('./ascii-art') // 显示 header
    require('./ascii-art') // 不显示 header." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ascii-art'</span>) <span class="hljs-comment">// 显示 header</span>
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ascii-art'</span>) <span class="hljs-comment">// 不显示 header.</span></code></pre>
<p>第二个 require 不会显示 header，因为模块被缓存了。Node 把第一个调用缓存起来，第二次调用的时候就不加载文件了。</p>
<p>可以在第一次引入文件以后，使用 <code>require.cache</code> 来看一下都缓存了什么。缓存中实际上是一个对象，这个对象中包含了引入模块的属性。我们可以从 <code>require.cache</code> 中把相应的属性删掉，以使缓存失效，这样 Node 就会重新加载模块并且将其重新缓存起来。</p>
<p>对于这个问题，这并不是最有效的解决方案。最简单的解决方案是把 <code>ascii-art.js</code> 中的打印代码打包成一个函数，并且 export 这个函数。这样当我们引入 <code>ascii-art.js</code> 文件时，我们获取到的是这个函数，所以可以每次都能打印出想要的内容了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./ascii-art')() // 打印出 header.
require('./ascii-art')() // 也会打印出 header." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./ascii-art'</span>)</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// 打印出 header.</span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./ascii-art'</span>)</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// 也会打印出 header.</span></code></pre>
<h2 id="articleHeader11">总结</h2>
<p>这就是我所要介绍的内容。回顾一下通篇，分别讲述了：</p>
<ul>
<li><p><strong>Resolving</strong></p></li>
<li><p><strong>Loading</strong></p></li>
<li><p><strong>Wrapping</strong></p></li>
<li><p><strong>Evaluating</strong></p></li>
<li><p><strong>Caching</strong></p></li>
</ul>
<p>即解析、加载、打包、VM功能处理和缓存五大步骤，以及五大步骤中每个步骤都涉及到了什么内容。</p>
<p>如果本文对你有帮助，欢迎关注我的专栏-<a href="https://zhuanlan.zhihu.com/qianduandaha" rel="nofollow noreferrer" target="_blank">前端大哈</a>，定期发布高质量前端文章。</p>
<hr>
<p>我最近正在写一本<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Node.js 中引入模块：你所需要知道的一切都在这里

## 原文链接
[https://segmentfault.com/a/1190000009060866](https://segmentfault.com/a/1190000009060866)

