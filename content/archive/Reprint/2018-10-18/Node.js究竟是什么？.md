---
title: Node.js究竟是什么？
reprint: true
categories: reprint
abbrlink: b8f53d6
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <h1>What exactly is Node.js?</h1>
<p>Node.js是一个JavaScript运行时环境。听起来不错，但这是什么意思？这是如何运作的？</p>
<p>Node运行时环境包含执行用JavaScript编写的程序所需的一切。</p>
<p><img src="https://p0.ssl.qhimg.com/t01ee344b9b44924f86.png" alt=""></p>
<p>当JavaScript的原始开发者将它从只能在浏览器中运行的东西扩展到可以作为独立应用程序在机器上运行的东西时，Node.js就已经存在。（译者注：大意是说JavaScript不仅仅能够再浏览器中运行，还可以作为独立应用程序在机器上运行）</p>
<p>现在，您可以使用JavaScript做更多的事情，而不仅仅是让网站互动。</p>
<p>JavaScript现在有能力做Python等其他脚本语言可以做的事情。</p>
<p>浏览器JavaScript和Node.js都运行在V8 JavaScript运行时引擎上。该引擎会将您的JavaScript代码转换为更快的机器代码。机器代码是计算机无需先解释即可运行的低级别代码。</p>
<h3>为什么Node.js？</h3>
<p>这是官方Node.js上给出的一个正式定义 <a href="https://nodejs.org/en/">网站</a>:</p>
<blockquote>
<p>Node.js®是一个基于Chrome的V8 JavaScript引擎构建的JavaScript运行。</p>
</blockquote>
<blockquote>
<p>Node.js使用事件驱动的非阻塞I / O模型，使其轻量且高效。</p>
</blockquote>
<blockquote>
<p>Node.js的软件包生态系统<a href="https://www.npmjs.com/">npm</a>是全球最大的开源库生态系统。</p>
</blockquote>
<p>我们已经讨论过这个定义的第一行：“Node.js®是一个基于Chrome的V8 JavaScript引擎构建的JavaScript运行。”现在让我们来了解另外两条线，以便我们了解为什么Node.js非常流行。</p>
<p>I / O是指输入/输出。它可以是从读取/写入本地文件到发出HTTP请求到API的任何内容。</p>
<p>I / O需要时间并因此阻塞其他功能。</p>
<p>考虑一个场景，我们需要一个后台数据库来获取user1和user2的详细信息，然后将其打印在屏幕/控制台上。对此请求的响应需要时间，但两个用户数据请求可以独立并同时执行。</p>
<p><img src="https://p0.ssl.qhimg.com/t014ff7e0b853ca1b7e.png" alt=""></p>
<h3>阻塞型 I / O</h3>
<p>在阻塞方法中，用户2的数据请求不会启动，直到用户1的数据被打印到屏幕上。</p>
<p>如果这是一个Web服务器，我们将不得不为每个新用户启动一个新线程。但是JavaScript是单线程的（不是真的，但是它有一个单线程的事件循环，稍后我们会讨论它）。所以这会使JavaScript不太适合多线程任务。</p>
<p>这就是需要非阻塞部分进来的地方。</p>
<h3>非阻塞 I / O</h3>
<p>另一方面，使用非阻塞请求，您可以在不等待响应user1请求的情况下为user2启动数据请求。您可以并行发起两个请求。</p>
<p>这种非阻塞I / O消除了多线程的需要，因为服务器可以同时处理多个请求。</p>
<h3>JavaScript事件循环</h3>
<p>如果您有26分钟，请观看节点事件循环的出色视频说明：</p>
<p>如果你没时间，那么以下是关于JavaScript事件循环如何工作的快速分步说明。</p>
<p><img src="https://p0.ssl.qhimg.com/t011c772a156f772bc1.png" alt=""></p>
<ol>
<li>将main（）推入调用堆栈。</li>
<li>将console.log（）推入调用堆栈。然后马上运行，然后弹出。</li>
<li>将setTimeout（2000）推入堆栈。 setTimeout（2000）是一个Node API。当我们调用它时，我们注册事件回调对。该事件将等待2000毫秒，然后回调函数。</li>
<li>在API中注册之后，setTimeout（2000）会从调用堆栈中弹出。</li>
<li>现在第二个setTimeout（0）以相同的方式被注册。我们现在有两个Node API等待执行。</li>
<li>在等待0秒后，setTimeout（0）被移到回调队列中，setTimeout（2000）也会发生同样的情况。</li>
<li>在回调队列中，函数等待调用堆栈为空，因为只有一个语句可以执行一次。这由事件循环来处理。</li>
<li>最后一个console.log（）运行，并且main（）从调用栈中弹出。</li>
<li>事件循环看到调用堆栈是空的，并且回调队列不是空的。因此它将回调（按先入先出的顺序）移动到调用堆栈中执行。</li>
</ol>
<h3>npm</h3>
<p><img src="https://p0.ssl.qhimg.com/t018ae526239473c716.png" alt=""></p>
<p>These are libraries built by the awesome community which will solve most of your generic problems. npm (Node package manager) has packages you can use in your apps to make your development faster and efficient.</p>
<p>这些是由<em>awesome community</em>建立的库，它将解决大部分通用问题。 npm（节点包管理器）包含了可以在您的应用中使用的包，以使您的开发更快更高效。</p>
<h3>Require</h3>
<p>Require 做了以下三件事:</p>
<ul>
<li>它加载与Node.js捆绑的模块，如文件系统和来自<a href="http://nodejs.org/api/">Node.js API</a> 的HTTP。</li>
<li>它加载从npm安装的第三方库，如Express和Mongoose。</li>
<li>它可以require你自己的文件和模块化项目。</li>
</ul>
<p>Require是一个函数，它接受一个参数“path”并返回module.exports。</p>
<h3>Node Modules</h3>
<p>节点模块是可重用的代码块，其存在不会意外地影响其他代码。</p>
<p>您可以编写自己的模块并将其用于各种应用程序。 Node.js有一组内置模块，您可以使用它们而无需进一步安装。</p>
<h3>V8通过利用C ++来增强JavaScript的性能</h3>
<p>V8是一个用C ++编写的开源运行时引擎。</p>
<p>JavaScript -&gt; V8(C++) -&gt; Machine Code</p>
<p>V8按照ECMA-262的规定实现一个名为ECMAScript的脚本。 ECMAScript由Ecma International创建，用于标准化JavaScript。</p>
<p>V8可以独立运行，也可以嵌入到任何C ++应用程序中。它有一些钩子，可以让你编写自己的C ++代码，使其可以提供给JavaScript。</p>
<p>这基本上可以让您通过将V8嵌入到C ++代码中来为JavaScript添加功能，以便您的C ++代码理解的不仅仅是ECMAScript标准另有指定。</p>
<h3>Events</h3>
<p>我们的应用中发生了一些我们可以回应的事情。节点中有两种类型的事件。</p>
<ul>
<li>系统事件：来自libuv库的C ++核心。 （例如，读完一个文件）。</li>
<li>自定义事件：JavaScript核心。</li>
</ul>
<h3>在Node.js中编写Hello World</h3>
<p>我们必须这样做，不是吗？</p>
<p>制作一个文件app.js并添加以下内容。</p>
<pre><code class="hljs 1c">console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"Hello World!"</span>);
</code></pre><p>打开节点终端，将目录更改为保存文件的文件夹并运行节点app.js. Bam - 你刚刚在Node.js中编写了Hello World。</p>
<p>您可以通过<a href="https://www.freecodecamp.org/">freeCodeCamp.org</a>来获取使用大量的资源来了解关于Node.js的更多信息。</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/what-exactly-is-node-js](https://www.zcfy.cc/article/what-exactly-is-node-js)
原文标题: Node.js究竟是什么？
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
