---
title: 'Electron指南 - 快速入门' 
date: 2019-02-09 2:30:59
hidden: true
slug: pnzxcwh335m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">快速入门</h2>
<p>Electron提供了丰富的本地（操作系统）的API，使你能够使用纯JavaScript来创建桌面应用程序。与其它各种的Node.js运行时不同的是Electron专注于桌面应用程序而不是Web服务器。</p>
<p>这并不意味着Electron是一个绑定图形用户界面（GUI）的JavaScript库。取而代之的是，Electron使用Web页面作为它的图形界面，所以你也可以将它看作是一个由JavaScript控制的迷你的Chrominum浏览器。</p>
<h3 id="articleHeader1">主进程</h3>
<p>在Electron里，运行package.json里的main脚本的进程被称为 <em>主进程</em> ，运行在主进程里的脚本能够通过创建Web页面来显示GUI。</p>
<h3 id="articleHeader2">渲染进程</h3>
<p>因为Electron使用Chrominum来显示Web页面，所以Chrominum的多进程架构也同样被使用。每个页面在Electron里是运行在自己的进程里，这些进程被称为 <em>渲染进程</em> 。<br>在浏览器里，Web页面通常运行在一个沙盒环境里，它不能访问本地的资源。但在Electron里，在Web页面中通过使用Node.js API可以进行底层的操作系统交互。</p>
<h3 id="articleHeader3">主进程与渲染进程的不同</h3>
<p>主进程通过构造 <em>BrowserWindow</em> 实例来创建Web页面。每个 <em>BrowserWindow</em> 实例在自己的渲染进程里运行Web页面。当一个 <em>BrowserWindow</em> 被销毁后，相应的渲染进程也同样被终止。</p>
<p>主进程管理所有的Web页面以及相关的渲染进程。每个渲染进程都是互相隔离的，并且只知道运行在该进程里的Web页面。</p>
<p>在Web页面里，调用本地GUI是不允许的，因为在Web页面里管理本地GUI资源是非常危险的而且非常容易导致资源泄露。如果你想在Web页面进行GUI操作，该Web页面的渲染进程必须通过和主进程通信来请求主进程处理这些操作。</p>
<p>在Electron里，主进程和渲染进程有很多通信的方法。比如 <em>ipcRanderer</em> 和 <em>ipcMain</em> 模块是用来发送消息的，<em>remote</em> 模块支持RPC风格的通信。可以参考FAQ里的<a href="http://electron.atom.io/docs/faq/electron-faq#how-to-share-data-between-web-pages" rel="nofollow noreferrer" target="_blank">如何在不同的Web页面里共享数据</a></p>
<h2 id="articleHeader4">编写第一个Electron应用</h2>
<p>通常，一个Electron应用的结构类似下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="your-app/
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>your-app/
├── package<span class="hljs-selector-class">.json</span>
├── main<span class="hljs-selector-class">.js</span>
└── index.html</code></pre>
<p><em>package.json</em> 的格式与Node的模块格式是一致的，其中 <em>main</em> 字段指定的脚本就是你应用的启动脚本，该脚本将运行在主进程中。你的 <em>package.json</em> 也许看上去像下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;    : &quot;your-app&quot;,
  &quot;version&quot; : &quot;0.1.0&quot;,
  &quot;main&quot;    : &quot;main.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>    : <span class="hljs-string">"your-app"</span>,
  <span class="hljs-string">"version"</span> : <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-string">"main"</span>    : <span class="hljs-string">"main.js"</span>
}</code></pre>
<p><em>注意</em> 如果在<em>package.json</em> 中的 <em>main</em> 字段没有指定，那么Electron将尝试装载一个名为 <em>index.js</em> 的脚本。</p>
<p><em>main.js</em> 应当创建窗口并且处理系统事件，一个典型的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');
// 控制应用生命周期的模块
const {app} = electron;
// 创建本地浏览器窗口的模块
const {BrowserWindow} = electron;

// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的
// 时候该窗口将会自动关闭
let win;

function createWindow() {
  // 创建一个新的浏览器窗口
  win = new BrowserWindow({width: 800, height: 600});

  // 并且装载应用的index.html页面
  win.loadURL(`file://${__dirname}/index.html`);

  // 打开开发工具页面
  win.webContents.openDevTools();

  // 当窗口关闭时调用的方法
  win.on('closed', () => {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
    // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
    win = null;
  });
}

// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow);

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
  // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
  // 窗口打开
  if (win === null) {
    createWindow();
  }
});

// 在这个文件后面你可以直接包含你应用特定的由主进程运行的代码。
// 也可以把这些代码放在另一个文件中然后在这里导入。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-comment">// 控制应用生命周期的模块</span>
<span class="hljs-keyword">const</span> {app} = electron;
<span class="hljs-comment">// 创建本地浏览器窗口的模块</span>
<span class="hljs-keyword">const</span> {BrowserWindow} = electron;

<span class="hljs-comment">// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的</span>
<span class="hljs-comment">// 时候该窗口将会自动关闭</span>
<span class="hljs-keyword">let</span> win;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建一个新的浏览器窗口</span>
  win = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});

  <span class="hljs-comment">// 并且装载应用的index.html页面</span>
  win.loadURL(<span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html`</span>);

  <span class="hljs-comment">// 打开开发工具页面</span>
  win.webContents.openDevTools();

  <span class="hljs-comment">// 当窗口关闭时调用的方法</span>
  win.on(<span class="hljs-string">'closed'</span>, () =&gt; {
    <span class="hljs-comment">// 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里</span>
    <span class="hljs-comment">// 存放窗口对象，在窗口关闭的时候应当删除相应的元素。</span>
    win = <span class="hljs-literal">null</span>;
  });
}

<span class="hljs-comment">// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。</span>
<span class="hljs-comment">// 有些API只能在该事件发生后才能被使用。</span>
app.on(<span class="hljs-string">'ready'</span>, createWindow);

<span class="hljs-comment">// 当所有的窗口被关闭后退出应用</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
  <span class="hljs-comment">// 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出</span>
  <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
    app.quit();
  }
});

app.on(<span class="hljs-string">'activate'</span>, () =&gt; {
  <span class="hljs-comment">// 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他</span>
  <span class="hljs-comment">// 窗口打开</span>
  <span class="hljs-keyword">if</span> (win === <span class="hljs-literal">null</span>) {
    createWindow();
  }
});

<span class="hljs-comment">// 在这个文件后面你可以直接包含你应用特定的由主进程运行的代码。</span>
<span class="hljs-comment">// 也可以把这些代码放在另一个文件中然后在这里导入。</span></code></pre>
<p>最后 <em>index.html</em> 则是你想要展示在窗口中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    We are using node <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.node)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>,
    Chrome <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.chrome)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>,
    and Electron <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.electron)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>.
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader5">运行你的应用</h2>
<p>一旦你建立了你的 <em>main.js</em>, <em>index.html</em>, 以及 <em>package.json</em> 文件，你也许会想要尝试在本地运行应用来测试它，确保应用是按照你预期的方式工作。</p>
<h3 id="articleHeader6">electron-prebuilt</h3>
<p><em>electron-prebuilt</em> 是一个 <em>npm</em> 的模块，它包含了一个预编译的Electron版本。</p>
<p>如果你已经通过 <em>npm</em> 将该模块全局安装了，那么你只需要在你应用的源代码目录西下运行下面的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">electron .</code></pre>
<p>如果你只是在本地安装了该模块，那么运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">./node_modules/.bin/electron .</code></pre>
<h3 id="articleHeader7">手动下载Electron二进制包</h3>
<p>如果手动下载了Electron二进制包，你可以通过执行其中包含的二进制文件来直接执行你的应用。</p>
<h4>Windows</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ .\electron\electron.exe your-app\" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ .\electron\electron.exe your-app\</code></pre>
<p>Linux</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./electron/electron your-app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ ./electron/electron your-app/</code></pre>
<p>OS X</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./Electron.app/Contents/MacOS/Electron your-app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ ./Electron.app/Contents/MacOS/Electron your-app/</code></pre>
<p>这里的 <em>Electron.app</em> 是Electron发布包的一部分，你可以在<a href="https://github.com/electron/electron/releases" rel="nofollow noreferrer" target="_blank">这里</a>下载。</p>
<h3 id="articleHeader8">运行发布</h3>
<p>在完成应用开发之后，你可以按照<a href="http://electron.atom.io/docs/tutorial/application-distribution" rel="nofollow noreferrer" target="_blank">应用发布</a>指导创建一个发布，然后执行打包的应用。</p>
<h3 id="articleHeader9">尝试例子</h3>
<p>通过使用 <em>atom/electron-quick-start</em> 来克隆并且运行教程的代码。</p>
<p><em>注意</em> 运行该例子需要在你的系统中安装<a href="https://git-scm.com/" rel="nofollow noreferrer" target="_blank">Git</a>以及<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">Node.js</a>（它也包含了<a href="https://npmjs.org/" rel="nofollow noreferrer" target="_blank">npm</a>)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 克隆仓库
$ git clone https://github.com/electron/electron-quick-start
# 进入克隆的仓库
$ cd electron-quick-start
# 安装依赖然后运行应用
$ npm install &amp;&amp; npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 克隆仓库</span>
$ git <span class="hljs-built_in">clone</span> https://github.com/electron/electron-quick-start
<span class="hljs-comment"># 进入克隆的仓库</span>
$ <span class="hljs-built_in">cd</span> electron-quick-start
<span class="hljs-comment"># 安装依赖然后运行应用</span>
$ npm install &amp;&amp; npm start</code></pre>
<p>翻译自<a href="http://electron.atom.io/docs/tutorial/quick-start/" rel="nofollow noreferrer" target="_blank">这里</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron指南 - 快速入门

## 原文链接
[https://segmentfault.com/a/1190000005363765](https://segmentfault.com/a/1190000005363765)

