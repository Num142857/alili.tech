---
title: '【Node Hero】1. 开始使用 Node.js' 
date: 2019-01-02 2:30:09
hidden: true
slug: ivyyayzpgw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@bigshaw" rel="nofollow noreferrer" target="_blank">网络埋伏纪事</a><br>链接：<a href="http://www.zcfy.cc/article/1748" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/1748</a><br>原文：<a href="https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/" rel="nofollow noreferrer" target="_blank">https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/</a></p></blockquote>
<p>这是 Node.js 系列教程 <strong>Node Hero</strong> 的第一篇文章。在这些章节中，将学习如何上手 Node.js 以及如何使用它交付软件产品。</p>
<p>本教程从基础开始 - 不需要以前有 Node.js 知识。本教程的目标是让你入门 Node.js，确保你可以理解如何用它来编写应用程序，所以如果有不清楚的，请马上问我们。</p>
<p><strong>目录</strong></p>
<ol>
<li><p><a>开始使用 Node.js</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-npm-tutorial/" rel="nofollow noreferrer" target="_blank">使用 NPM</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-async-programming-in-node-js/" rel="nofollow noreferrer" target="_blank">理解异步编程</a></p></li>
<li><p><a href="https://blog.risingstack.com//your-first-node-js-http-server/" rel="nofollow noreferrer" target="_blank">第一个 Node.js 服务器</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-js-database-tutorial" rel="nofollow noreferrer" target="_blank">Node.js 数据库教程</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-request-module-tutorial" rel="nofollow noreferrer" target="_blank">Node.js request 模块教程</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-project-structure-tutorial" rel="nofollow noreferrer" target="_blank">Node.js 项目结构教程</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-authentication-passport-js/" rel="nofollow noreferrer" target="_blank">Node.js 身份验证 - 使用 Passport.js</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-unit-testing-tutorial" rel="nofollow noreferrer" target="_blank">Node.js 单元测试教程</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-debugging-tutorial/" rel="nofollow noreferrer" target="_blank">调试 Node.js 应用程序</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-node-js-security-tutorial/" rel="nofollow noreferrer" target="_blank">Node.js 安全教程</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-deploy-node-js-heroku-docker/" rel="nofollow noreferrer" target="_blank">如何部署 Node.js 应用程序</a></p></li>
<li><p><a href="https://blog.risingstack.com//node-hero-monitoring-node-js-applications/" rel="nofollow noreferrer" target="_blank">监控 Node.js 应用程序</a></p></li>
</ol>
<p>在第一篇教程中，将学习什么是 Node.js，如何在电脑上安装它，如何开始使用它 - 这样在下一章我们就可以做实际开发。我们开始吧！</p>
<h2 id="articleHeader0">Node.js 概述</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010885659" src="https://static.alili.tech/img/remote/1460000010885659" alt="node.js logo in node hero getting started tutorial" title="node.js logo in node hero getting started tutorial" style="cursor: pointer; display: inline;"></span></p>
<p><em>官方 Node.js logo</em></p>
<blockquote><p>Node.js 是一个建立在 Chrome 的 JavaScript 引擎 V8 之上的 JavaScript 运行时。Node.js 使用一个<strong>事件驱动的</strong>、<strong>非阻塞式的 I/O</strong> 模型，让它轻量而高效。</p></blockquote>
<p>也就是说：Node.js 提供了用 JavaScript 编写服务器的可能性，这种服务器具有令人难以置信的性能。正如官方声明所说：Node.js 是一个使用与 Google Chrome 浏览器相同  JavaScript 引擎 V8 的运行时。但是这还不足以支撑 Node.js 的成功 - Node.js 还使用了专注于异步 I/O 的多平台支持库 <a href="https://github.com/libuv/libuv" rel="nofollow noreferrer" target="_blank">libuv</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010885660" src="https://static.alili.tech/img/remote/1460000010885660" alt="libuv logo in node hero getting started tutorial" title="libuv logo in node hero getting started tutorial" style="cursor: pointer; display: inline;"></span></p>
<p><em>官方 libuv logo</em></p>
<p>从开发者的观点来看，NodeJS 是单线程的 - 但是在幕后，<strong>它是用 libuv 来处理线程、文件系统事件、实现事件循环、使 Node.js 具有线程池特征</strong> 等等。大多数情况下，我们不会直接与它交互。</p>
<h2 id="articleHeader1">安装 Node.js</h2>
<p>要得到最新的 Node.js 执行文件，可以访问 Node.js 官网：<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/download/</a>。</p>
<p>用这种方法，很容易开始 - 但是如果以后要添加更多 Node.js 版本，最好是从使用 Node   的版本管理器 <a href="https://github.com/creationix/nvm" rel="nofollow noreferrer" target="_blank">nvm</a> 开始。</p>
<p>一旦安装了 NVM，就可以使用很简单的 CLI API 来与 Node.js 交互了。</p>
<h4>安装 Node.js 版本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm install 4.4  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">nvm <span class="hljs-keyword">install</span> <span class="hljs-number">4.4</span>  </code></pre>
<p>然后，如果想看看试验性版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm install 5  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">nvm <span class="hljs-keyword">install</span> <span class="hljs-number">5</span>  </code></pre>
<p>要校验 Node.js 的启动和运行，请执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --version  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">--version</span>  </code></pre>
<p>如果一切顺利，就会返回当前活动的 Node.js 执行文件的版本号。</p>
<h4>使用 Node.js 版本</h4>
<p>如果正在开发一个支持 Node.js v4 的项目，可以用如下命令开始使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm use 4  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">nvm <span class="hljs-keyword">use</span> <span class="hljs-number">4</span>  </code></pre>
<p>然后可以用如下命令切换到 Node.js v5：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm use 5  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">nvm <span class="hljs-keyword">use</span> <span class="hljs-number">5</span>  </code></pre>
<p><strong>好了，现在我们知道了如何安装和在 Node.js 版本之间切换 - 但是这有何意义？</strong></p>
<p>自从 Node.js 基金会成立，Node.js 就有一个发布计划。这与 Linux 基金会的其它项目很相似。这意味着有两个发布版本：稳定版和试验版。在 Node.js 中，带有长期支持（LTS）的稳定版是以偶数开始（4,6,8...），而试验版是从奇数开始（5, 7...）。我们推荐在生产环境中用 LTS 版本，而用试验版尝试新东西。</p>
<blockquote><p>如果你的操作系统是 Windows，请使用 <a href="https://github.com/coreybutler/nvm-windows" rel="nofollow noreferrer" target="_blank">nvm-windows</a>。</p></blockquote>
<h2 id="articleHeader2">Hello World</h2>
<p>要开始使用 Node.js，先在终端中试试！只需要键入 <code>node</code>，就可以启动 Node.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node
>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span>
<span class="hljs-title">&gt;</span></code></pre>
<p>好了，下面我们试着打印点什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node
> console.log('hello from Node.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span>
<span class="hljs-title">&gt; console</span>.log('hello from <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>')</code></pre>
<p>一旦敲了回车，就会得到下面这样的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> console.log('hello from Node.js')
hello from Node.js  
undefined  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>&gt; console.log('hello from <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>')
hello from <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>  
undefined  </code></pre>
<p>用这个界面随便玩玩 Node.js - 通常会在这里尝试点小代码片段，因为我不想把它们放到一个文件中。</p>
<ul><li><ul><li><p>*</p></li></ul></li></ul>
<p>是时候创建我们的 Hello Node.js 应用了！</p>
<p>首先创建一个 <code>index.js</code> 文件。打开 IDE（Atom、Sublime、Code 都行），创建一个新文件，然后存为 <code>index.js</code>。完成后，复制如下代码片段到该文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
console.log('hello from Node.js')  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>// index.js
console.log('hello from <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>')  </code></pre>
<p>要运行该文件，只需再次打开终端，转到你存放 index.js 文件的目录，然后执行 <code>node index.js</code> 命令。你会看到它会生成与前面一样的输出 - 在终端上直接打印字符串。</p>
<h2 id="articleHeader3">模块化你的应用程序</h2>
<p>现在你已经有了 <code>index.js</code> 文件，该升级一下游戏了！下面我们创建更复杂的应用，基于可读性和可维护性的目的，将源代码分成多个 JavaScript 文件。打开 IDE（Atom、Sublime、Code 都可以），创建如下目录结构（带有空文件），但是暂时忽略 <code>package.json</code>，我们将在下一步自动生成它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app
|   ├── calc.js
|   └── index.js
├── index.js
└── package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├── app
<span class="hljs-string">|   ├── calc.js</span>
<span class="hljs-string">|   └── index.js</span>
├── index.js
└── package.json
</code></pre>
<p>每个 Node.js 项目都是从创建一个 <code>package.json</code> 文件开始 - 可以把它当作是应用程序及其依赖的 JSON 表示。它包含了应用程序的名称、作者，以及运行应用程序所需的所有依赖。<em>我们打算在后面<strong>使用 NPM</strong> 一章中再讲解依赖。</em></p>
<p>可以在终端中使用 <code>npm init</code> 命令，以交互式的方式生成 <code>package.json</code> 文件。</p>
<p>键入回车后，会被要求给几个输入，比如应用程序的名称、版本、描述等等。不要担心，只管敲回车，直到得到了 JSON 片段，以及提问 <code>is it ok?</code>。最后一次敲回车，<code>package.json</code> 就被自动生成了，放在应用程序的文件夹中。如果在 IDE 中打开该文件，就会看到跟如下代码片段很相似的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;@risingstack/node-hero&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;node index.js&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"@risingstack/node-hero"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node index.js"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<p>给 <code>package.json</code> 添加一个 <code>start</code> 脚本是一个好实践 - 一旦你像上例一样这样做了，就可以用 <code>npm start</code> 启动应用。如果要把应用程序部署给 PaaS 提供者，那么就很方便了 - 它们会识别它，然后用它启动你的应用程序。</p>
<p>现在回到我们创建的第一个文件 <code>index.js</code>。我建议让这个文件保持很瘦 - 只请求应用程序本身（来自你之前创建的 <code>/app</code> 子目录下的 index.js 文件）。复制如下脚本到 <code>index.js</code> 文件，然后存盘：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
require('./app/index')  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./app/index'</span>)</span></span>  </code></pre>
<p>现在到了开始创建实际应用程序的时候了。打开 <code>/app</code> 文件夹下的 index.js 文件，创建一个很简单的示例：数字数组相加。在本例中，<code>index.js</code> 会只包含我们要加的数字，执行计算的逻辑需要放在另一个模块中。</p>
<p>将如下脚本粘贴到 <code>/app</code> 目录下的 <code>index.js</code> 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/index.js
const calc = require('./calc')

const numbersToAdd = [  
  3,
  4,
  10,
  2
]

const result = calc.sum(numbersToAdd)  
console.log(`The result is: ${result}`)  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app/index.js</span>
<span class="hljs-keyword">const</span> calc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./calc'</span>)

<span class="hljs-keyword">const</span> numbersToAdd = [  
  <span class="hljs-number">3</span>,
  <span class="hljs-number">4</span>,
  <span class="hljs-number">10</span>,
  <span class="hljs-number">2</span>
]

<span class="hljs-keyword">const</span> result = calc.sum(numbersToAdd)  
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The result is: <span class="hljs-subst">${result}</span>`</span>)  </code></pre>
<p>现在将实际的业务逻辑粘贴到同一文件夹下的 <code>calc.js</code> 文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/calc.js
function sum (arr) {  
  return arr.reduce(function(a, b) { 
    return a + b
  }, 0)
}

module.exports.sum = sum  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>// app/calc.js
<span class="hljs-function"><span class="hljs-keyword">function</span></span> <span class="hljs-built_in">sum</span> (arr) {  
  <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span></span> { 
    <span class="hljs-keyword">return</span> a + b
  }, <span class="hljs-number">0</span>)
}

<span class="hljs-keyword">module</span>.exports.<span class="hljs-built_in">sum</span> = <span class="hljs-built_in">sum</span>  </code></pre>
<p>要检查你是否成功，就保存这些文件，打开终端，键入 <code>npm start</code> 或者 <code>node index.js</code>。如果你所有东西都做对了，会得到答案：<code>19</code>。如果出错了，就仔细检查一下控制台日志，根据日志找到问题所在。</p>
<h2 id="articleHeader4">接下来</h2>
<p>在下一章<a href="https://blog.risingstack.com//node-hero-npm-tutorial/" rel="nofollow noreferrer" target="_blank">使用 NPM</a> 中，我们会看看如何使用 JavaScript 的包管理器 NPM。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node Hero】1. 开始使用 Node.js

## 原文链接
[https://segmentfault.com/a/1190000010885654](https://segmentfault.com/a/1190000010885654)

