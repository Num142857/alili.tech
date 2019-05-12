---
title: 'Electron 快速入门' 
date: 2019-01-09 2:30:12
hidden: true
slug: g3c9oft2bqb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>Electron 是一个可以使用 Web 技术如 JavaScript、HTML 和 CSS 来创建跨平台原生桌面应用的框架。借助 Electron，我们可以使用纯 JavaScript 来调用丰富的原生 APIs。</p>
<p>Electron用 web 页面作为它的 GUI，而不是绑定了 GUI 库的 JavaScript。它结合了 Chromium、Node.js 和用于调用操作系统本地功能的 APIs（如打开文件窗口、通知、图标等）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010081446" src="https://static.alili.tech/img/remote/1460000010081446" alt="Electron-Quick-Start-00" title="Electron-Quick-Start-00" style="cursor: pointer; display: inline;"></span></p>
<p>现在已经有很多由 Electron 开发应用，比如 <a href="https://atom.io/" rel="nofollow noreferrer" target="_blank">Atom</a>、<a href="https://insomnia.rest/" rel="nofollow noreferrer" target="_blank">Insomnia</a>、<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">Visual Studio Code</a> 等。查看更多使用 Electron 构建的项目可以访问 [Apps Built on Electron<br>](<a href="https://electron.atom.io/apps/)" rel="nofollow noreferrer" target="_blank">https://electron.atom.io/apps/)</a></p>
<h2 id="articleHeader1">安装</h2>
<p>安装 electron 之前，需要安装 Node.js。如果没有安装，推荐使用 <a href="https://github.com/creationix/nvm/blob/master/README.md" rel="nofollow noreferrer" target="_blank">nvm</a> 等 Node.js 版本管理工具进行安装／</p>
<p>然后建议修改 electron 的源为国内源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ export ELECTRON_MIRROR=&quot;https://npm.taobao.org/mirrors/electron/&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">export</span> ELECTRON_MIRROR=<span class="hljs-string">"https://npm.taobao.org/mirrors/electron/"</span></code></pre>
<p>不然会出现如下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: connect ETIMEDOUT 54.231.50.42:443
    at Object.exports._errnoException (util.js:1016:11)
    at exports._exceptionWithHostPort (util.js:1039:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1138:14)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">Error: connect ETIMEDOUT 54.231.50.42:443
    at Object.exports._errnoException (util.js:1016:11)
    at exports._exceptionWithHostPort (util.js:1039:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1138:14)</code></pre>
<p>安装 electron：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install electron -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install electron -g</code></pre>
<h2 id="articleHeader2">进程</h2>
<p>Electron 的进程分为主进程和渲染进程。</p>
<h3 id="articleHeader3">主进程</h3>
<p>在 electron 里面，运行 <code>package.json</code> 里面 <code>main</code> 脚本的进程成为主进程。主进程控制整个应用的生命周期，在主进程中可以创建 Web 形式的 GUI，而且整个 Node API 是内置其中。</p>
<h3 id="articleHeader4">渲染进程</h3>
<p>每个 electron 的页面都运行着自己的进程，称为渲染进程。</p>
<h3 id="articleHeader5">主进程与渲染进程的联系及区别</h3>
<p>主进程使用 <code>BrowserWindow</code> 实例创建页面。每个 <code>BrowserWindow</code> 实例都在自己的渲染进程里运行页面。当一个 <code>BrowserWindow</code> 实例被销毁后，相应的渲染进程也会被终止。</p>
<p>主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的页面。</p>
<p>在 electron 中，页面不直接调用底层 APIs，而是通过主进程进行调用。所以如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。</p>
<p>在 electron 中，主进程和渲染进程的通信主要有以下几种方式：</p>
<ul>
<li><p>ipcMain、ipcRender</p></li>
<li><p>Remote 模块</p></li>
</ul>
<p>进程通信将稍后详细介绍。</p>
<h2 id="articleHeader6">打造第一个 Electron 应用</h2>
<blockquote><p>以下所有代码可以在 <a href="https://github.com/nodejh/electron-quick-start" rel="nofollow noreferrer" target="_blank">https://github.com/nodejh/electron-quick-start</a> 找到。</p></blockquote>
<p>一个最简单的 electron 应用目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron-demo/
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">electron-demo/
├── package.json
├── main.js
└── index.html</code></pre>
<p><code>package.json</code> 与 Node.js 的完全一致，所以我们可以使用 <code>npm init</code> 来生成。然后将 <code>"main": "index.js"</code> 修改为 <code>"main": "main.js"</code>。之所以命名为 <code>main.js</code>，主要是为了与主进程这个概念对应。</p>
<h3 id="articleHeader7">main.js</h3>
<p>创建 <code>main.js</code> 文件并添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');

const {
  app, // 控制应用生命周期的模块
  BrowserWindow, // 创建原生浏览器窗口的模块
} = electron;

// 保持一个对于 window 对象的全局引用，如果不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let mainWindow;

function createWindow() {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载应用的 index.html。
  // 这里使用的是 file 协议，加载当前目录下的 index.html 文件。
  // 也可以使用 http 协议，如 mainWindow.loadURL('http://nodejh.com')。
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // 启用开发工具。
  mainWindow.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  mainWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWindow = null;
  });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，
  // 绝大部分应用会重新创建一个窗口。
  if (mainWindow === null) {
    createWindow();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);

<span class="hljs-keyword">const</span> {
  app, <span class="hljs-comment">// 控制应用生命周期的模块</span>
  BrowserWindow, <span class="hljs-comment">// 创建原生浏览器窗口的模块</span>
} = electron;

<span class="hljs-comment">// 保持一个对于 window 对象的全局引用，如果不这样做，</span>
<span class="hljs-comment">// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭</span>
<span class="hljs-keyword">let</span> mainWindow;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建浏览器窗口。</span>
  mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});

  <span class="hljs-comment">// 加载应用的 index.html。</span>
  <span class="hljs-comment">// 这里使用的是 file 协议，加载当前目录下的 index.html 文件。</span>
  <span class="hljs-comment">// 也可以使用 http 协议，如 mainWindow.loadURL('http://nodejh.com')。</span>
  mainWindow.loadURL(<span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html`</span>);

  <span class="hljs-comment">// 启用开发工具。</span>
  mainWindow.webContents.openDevTools();

  <span class="hljs-comment">// 当 window 被关闭，这个事件会被触发。</span>
  mainWindow.on(<span class="hljs-string">'closed'</span>, () =&gt; {
    <span class="hljs-comment">// 取消引用 window 对象，如果你的应用支持多窗口的话，</span>
    <span class="hljs-comment">// 通常会把多个 window 对象存放在一个数组里面，</span>
    <span class="hljs-comment">// 与此同时，你应该删除相应的元素。</span>
    mainWindow = <span class="hljs-literal">null</span>;
  });
}

<span class="hljs-comment">// Electron 会在初始化后并准备</span>
<span class="hljs-comment">// 创建浏览器窗口时，调用这个函数。</span>
<span class="hljs-comment">// 部分 API 在 ready 事件触发后才能使用。</span>
app.on(<span class="hljs-string">'ready'</span>, createWindow);

<span class="hljs-comment">// 当全部窗口关闭时退出。</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
  <span class="hljs-comment">// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，</span>
  <span class="hljs-comment">// 否则绝大部分应用及其菜单栏会保持激活。</span>
  <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
    app.quit();
  }
});

app.on(<span class="hljs-string">'activate'</span>, () =&gt; {
  <span class="hljs-comment">// 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，</span>
  <span class="hljs-comment">// 绝大部分应用会重新创建一个窗口。</span>
  <span class="hljs-keyword">if</span> (mainWindow === <span class="hljs-literal">null</span>) {
    createWindow();
  }
});</code></pre>
<p>关于 <code>app</code> 和 <code>BrowserWindow</code> 对象和实例的更多用法可参考 electron 的文档：</p>
<ul>
<li><p><a href="https://github.com/electron/electron/blob/master/docs/api/app.md" rel="nofollow noreferrer" target="_blank">app</a></p></li>
<li><p><a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md" rel="nofollow noreferrer" target="_blank">BrowserWindow</a></p></li>
</ul>
<h3 id="articleHeader8">index.html</h3>
<p>然后编辑需要展示的 <code>index.html</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>Hello World!</title>
    <style media=&quot;screen&quot;>
      .version {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js
    <span id=&quot;version-node&quot; class=&quot;version&quot;></span>
    and Electron
    <span id=&quot;version-electron&quot; class=&quot;version&quot;></span>
    <script type=&quot;text/javascript&quot;>
      console.log('process: ', process);
      var versionNode = process.version;
      var versionElectron = process.versions['electron'];
      document.getElementById('version-node').innerText = versionNode
      document.getElementById('version-electron').innerText = versionElectron
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"screen"</span>&gt;</span><span class="css">
      <span class="hljs-selector-class">.version</span> {
        <span class="hljs-attribute">color</span>: red;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    We are using Node.js
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"version-node"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"version"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    and Electron
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"version-electron"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"version"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'process: '</span>, process);
      <span class="hljs-keyword">var</span> versionNode = process.version;
      <span class="hljs-keyword">var</span> versionElectron = process.versions[<span class="hljs-string">'electron'</span>];
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'version-node'</span>).innerText = versionNode
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'version-electron'</span>).innerText = versionElectron
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在这个例子中，我们显示出了 electron 使用的 Node.js 版本和 electron 的版本。<code>index.html</code> 跟网页的 HTML 一摸一样，只是多了一些 electron 的全局对象。</p>
<h2 id="articleHeader9">运行</h2>
<p>因为前面已经全局安装了 electron，所以我们可以使用 electron 命令来运行项目。在 <code>electron-demo/</code> 目录里面运行下面的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ electron .</code></pre>
<p>然后会弹出一个 electron 应用客户端，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010081447" src="https://static.alili.tech/img/remote/1460000010081447" alt="Electron-Quick-Start-01" title="Electron-Quick-Start-01" style="cursor: pointer; display: inline;"></span></p>
<p>因为在主进程中启用了开发模式 <code>mainWindow.webContents.openDevTools()</code>，所以默认启动开发者工具。</p>
<p>如果是局部安装的 electron，即 <code>npm install --save electron</code>，则可以运行下面的命令来启动应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ ./node_modules/.bin/electron .</code></pre>
<h2 id="articleHeader10">进行通信</h2>
<p>对于 electron 来说，主进程和渲染进程直接的通信是必不可少的。</p>
<p>前面提到过 electron 进程间的通信的方式主要有两种，一种是用于发送消息的 <a href="https://github.com/electron/electron/blob/master/docs/api/ipc-main.md" rel="nofollow noreferrer" target="_blank">ipcMain</a> 和 <a href="https://github.com/electron/electron/blob/master/docs/api/ipc-renderer.md" rel="nofollow noreferrer" target="_blank">ipcRenderer</a> 模块，一种用于 RPC 的 <a href="https://github.com/electron/electron/blob/master/docs/api/remote.md" rel="nofollow noreferrer" target="_blank">remote</a> 模块。</p>
<p>现在假设一个业务场景，用户在页面中输入文本消息，渲染进程将消息发送给主进程，主进程处理后将处理结果返回给页面。为了方便起见，主进程的处理就假设为翻转文本。当然，这个功能在前端完全可以实现，这里只是为了演示进程通信。</p>
<h3 id="articleHeader11">ipcMain 和 ipcRenderer</h3>
<p>首先在渲染进程中添加一个输入框和一个按钮，并实现点击按钮获取输入框的内容。然后使用 ipcRenderer 发送消息。主进程接收到消息并处理之后，会返回处理结果。所以渲染进程中还需要接收主进程的消息。</p>
<p>修改 <code>index.html</code>，添加下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在 body 部分添加一个输入框和按钮 -->
<div>
  <input type=&quot;text&quot; id=&quot;message&quot; name=&quot;&quot; value=&quot;&quot;>
  <br/>
  <button type=&quot;button&quot; id=&quot;button&quot; name=&quot;button&quot;>click me</button>
</div>

<script type=&quot;text/javascript&quot;>
  // ...

  // 添加下面的代码。
  // 引入 ipcRenderer 模块。
  var ipcRenderer = require('electron').ipcRenderer;
  document.getElementById('button').onclick = function () {
    var message = document.getElementById('message').value;
    // 使用 ipcRenderer.send 向主进程发送消息。
    ipcRenderer.send('asynchronous-message', message);
  }

  // 监听主进程返回的消息
  ipcRenderer.on('asynchronous-reply', function (event, arg) {
    alert(arg);
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 在 body 部分添加一个输入框和按钮 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"message"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"button"</span>&gt;</span>click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// ...</span>

  <span class="hljs-comment">// 添加下面的代码。</span>
  <span class="hljs-comment">// 引入 ipcRenderer 模块。</span>
  <span class="hljs-keyword">var</span> ipcRenderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).ipcRenderer;
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> message = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'message'</span>).value;
    <span class="hljs-comment">// 使用 ipcRenderer.send 向主进程发送消息。</span>
    ipcRenderer.send(<span class="hljs-string">'asynchronous-message'</span>, message);
  }

  <span class="hljs-comment">// 监听主进程返回的消息</span>
  ipcRenderer.on(<span class="hljs-string">'asynchronous-reply'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, arg</span>) </span>{
    alert(arg);
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>接下来在主进程中接收渲染进程的消息，并进行处理（翻转字符串），然后将处理结果发送给主进程。修改 <code>main.js</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//...

// 监听渲染进程发送的消息
ipcMain.on('asynchronous-message', (event, arg) => {
  const reply = arg.split('').reverse().join('');
  console.log('reply: ', reply);
  // 发送消息到主进程
  event.sender.send('asynchronous-reply', reply);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//...</span>

<span class="hljs-comment">// 监听渲染进程发送的消息</span>
ipcMain.on(<span class="hljs-string">'asynchronous-message'</span>, (event, arg) =&gt; {
  <span class="hljs-keyword">const</span> reply = arg.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'reply: '</span>, reply);
  <span class="hljs-comment">// 发送消息到主进程</span>
  event.sender.send(<span class="hljs-string">'asynchronous-reply'</span>, reply);
});</code></pre>
<p>然后重新运行项目。在页面的输入框内输入字符，点击按钮，就能弹出如下的弹出框，说明渲染进程与主进程通信成功：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010081448" src="https://static.alili.tech/img/remote/1460000010081448" alt="http://oh1ywjyqf.bkt.clouddn.com/Electron-Quick-Start-02.png" title="http://oh1ywjyqf.bkt.clouddn.com/Electron-Quick-Start-02.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">remote</h3>
<p><a href="https://github.com/electron/electron/blob/master/docs/api/remote.md" rel="nofollow noreferrer" target="_blank">remote</a> 模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途径。</p>
<p>使用 remote 模块，我们可以很方便地调用主进程对象的方法，而不需要发送消息。</p>
<p>在 <code>index.html</code> 的 <code>&lt;script&gt;</code> 标签中添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 remote 模块
var remote = require('electron').remote;
// 获取主进程中的 BrowserWindow 对象
var BrowserWindow = remote.BrowserWindow;
// 创建一个渲染进程
var win = new BrowserWindow({ width: 200, height: 150 });
win.loadURL('http://nodejh.com');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入 remote 模块</span>
<span class="hljs-keyword">var</span> remote = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).remote;
<span class="hljs-comment">// 获取主进程中的 BrowserWindow 对象</span>
<span class="hljs-keyword">var</span> BrowserWindow = remote.BrowserWindow;
<span class="hljs-comment">// 创建一个渲染进程</span>
<span class="hljs-keyword">var</span> win = <span class="hljs-keyword">new</span> BrowserWindow({ <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">150</span> });
win.loadURL(<span class="hljs-string">'http://nodejh.com'</span>);</code></pre>
<p>然后使用 <code>ctr + r</code> 组合键刷新应用，就会看到创建出的一个新窗口。</p>
<h2 id="articleHeader13">打包</h2>
<p>Electron 应用开发完成之后，还需要将其打包成对应平台的客户端。常用的打包工具有 <a href="https://github.com/electron-userland/electron-packager" rel="nofollow noreferrer" target="_blank">electron-packager</a> 和 <a href="https://github.com/electron/asar" rel="nofollow noreferrer" target="_blank">asar</a>。</p>
<p>这里以 electron-packager 为例。首先全局安装 electron-packager：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install electron-packager -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install electron-packager -g</code></pre>
<p>然后在项目中安装 electron：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install electron --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install electron --save-dev</code></pre>
<p>然后打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ electron-packager . electron-demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ electron-packager . electron-demo</code></pre>
<h2 id="articleHeader14">总结</h2>
<p>本文首先对 electron 做了简单的介绍，然后讲解了 electron 进程的概念，其进程包括主进程和渲染进程。然后创建了一个简单的 electron 应用，并通过实现一个简单的应用场景，对 electron 进程间的通信做了实践。总体来说，使用 electron 创建桌面客户端的开发体验跟写 Node.js 和网页差不多。但本文对内置模块比如 app、ipcMain、ipcRender、remote 等的介绍比较粗浅，涉及到一些内置模块的使用，还需要继续查询 electron 的<a href="https://github.com/electron/electron/blob/master/docs/README.md" rel="nofollow noreferrer" target="_blank">官方文档</a>，只有实践越多，才能越熟悉。</p>
<blockquote><p><a href="https://github.com/nodejh/nodejh.github.io/issues/39" rel="nofollow noreferrer" target="_blank">https://github.com/nodejh/nodejh.github.io/issues/39</a></p></blockquote>
<p>--</p>
<ul>
<li><p><a href="https://github.com/nodejh/electron-quick-start" rel="nofollow noreferrer" target="_blank">https://github.com/nodejh/electron-quick-start</a></p></li>
<li><p><a href="https://github.com/electron/electron" rel="nofollow noreferrer" target="_blank">electron/electron</a></p></li>
<li><p><a href="https://weishuai.gitbooks.io/electron-/content/" rel="nofollow noreferrer" target="_blank">electron中文教程</a></p></li>
<li><p><a href="https://wizardforcel.gitbooks.io/electron-doc/content/" rel="nofollow noreferrer" target="_blank">Electron 中文文档</a></p></li>
<li><p><a href="https://github.com/pfan123/electron-docs" rel="nofollow noreferrer" target="_blank">Electron开发桌面应用</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron 快速入门

## 原文链接
[https://segmentfault.com/a/1190000010081441](https://segmentfault.com/a/1190000010081441)

