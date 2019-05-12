---
title: 'feWorkflow - 使用 electron, react, redux, immutable 构建桌面 App' 
date: 2019-02-07 2:30:16
hidden: true
slug: umq6lnpt4jl
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章主要是项目中用到的开发框架功能点上的一个总结，包括基本的操作流程和一些心得体会。</p>
<h2 id="articleHeader0">前言</h2>
<p>15年初创建了适用于目前团队的gulp工作流，旨在以一个gulpfile来操作和执行所有文件结构。随着项目依赖滚雪球式的增长，拉取npm包成了配置中最麻烦而极容易出错的一项。为了解决配置过程中遇到的种种问题，15年底草草实现了一个方案，用nw.js（基于Chromium和node.js的app执行工具）框架来编写了一个简单的桌面应用<a href="http://whatifhappen.github.io/GulpUI-WX/" rel="nofollow noreferrer" target="_blank">gulp-ui</a>, 所做的操作是打包gulpfile和所依赖的所有node_modules在一起，然后简单粗暴的在app内部执行gulpfile。</p>
<p><a href="http://whatifhappen.github.io/GulpUI-WX/" rel="nofollow noreferrer" target="_blank">gulp-ui</a> 做出来后再团队中使用了一段时间，以单个项目来执行的方式确实在经常多项目开发的使用环境中多有不便。于是在这个基础上，重写了整个代码结构，开发了现在的版本feWorkflow.</p>
<p><a href="http://whatifhappen.github.io/GulpUI-WX/" rel="nofollow noreferrer" target="_blank">feWorkflow</a> 改用了electron做为底层，使用react, redux, immutable框架做ui开发，仍然基于运行gulpfile的方案，这样可以使每个使用自己团队的gulp工作流快速接入和自由调整。</p>
<p><span class="img-wrap"><img data-src="/img/bVyPy1?w=2178&amp;h=1702" src="https://static.alili.tech/img/bVyPy1?w=2178&amp;h=1702" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>功能：一键式开发/压缩</p>
<ul>
<li><p>less实时监听编译css</p></li>
<li><p>css前缀自动补全</p></li>
<li><p>格式化html，并自动替换src源码路径为tc_idc发布路径</p></li>
<li><p>压缩图片(png|jpg|gif|svg)</p></li>
<li><p>压缩或格式化js，并自动替换src源码路径为tc_idc发布路径</p></li>
<li><p>同步刷新浏览器browserSync</p></li>
</ul>
<h2 id="articleHeader1">框架选型</h2>
<h3 id="articleHeader2">electron</h3>
<p>与 NW.js 相似，Electron 提供了一个能通过 JavaScript 和 HTML 创建桌面应用的平台，同时集成 Node 来授予网页访问底层系统的权限。</p>
<p>使用nw.js时遇到了很多问题，设置和api比较繁琐，于是改版过程用再开发便利性上的考虑转用了electron。</p>
<p>electron应用布署非常简单，存放应用程序的文件夹需要叫做&nbsp;<code>app</code>&nbsp;并且需要放在 Electron 的 资源文件夹下（在 macOS 中是指&nbsp;<code>Electron.app/Contents/Resources/</code>，在 Linux 和 Windows 中是指&nbsp;<code>resources/</code>） 就像这样：</p>
<p>macOS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html</code></pre>
<p>在 Windows 和 Linux 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron/resources/app
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">electron/resources/app
├── package.json
├── main.js
└── index.html</code></pre>
<p>然后运行&nbsp;<code>Electron.app</code>&nbsp;（或者 Linux 中的&nbsp;<code>electron</code>，Windows 中的&nbsp;<code>electron.exe</code>）, 接着 Electron 就会以你的应用程序的方式启动。</p>
<h4>目录释义</h4>
<p><code>package.json</code>主要用来指定app的名称，版本，入口文件，依赖文件等。</p>
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
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>    : <span class="hljs-string">"your-app"</span>,
  <span class="hljs-attr">"version"</span> : <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"main"</span>    : <span class="hljs-string">"main.js"</span>
}</code></pre>
<p><code>main.js</code>&nbsp;应该用于创建窗口和处理系统事件，官方也是推荐使用<code>es6</code>来开发，典型的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');
//引入app模块
const {app} = electron;
// 引入窗口视图
const {BrowserWindow} = electron;
//设置一个变量
let mainWindow;

function createWindow() {
  //实例化一个新的窗口
  mainWindow = new BrowserWindow({width: 800, height: 600});

  //加载electron主页面
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  //打开chrome开发者工具
  mainWindow.webContents.openDevTools();

  //监听窗口关闭状态
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
//当app初始化完毕，开始创建一个新窗口
app.on('ready', createWindow);

//监听app窗口关闭状态
app.on('window-all-closed', () => {
  //mac osx中只有执行command+Q才会退出app，否则保持活动状态
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  //mac osx中再dock图标点击时重新创建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-comment">//引入app模块</span>
<span class="hljs-keyword">const</span> {app} = electron;
<span class="hljs-comment">// 引入窗口视图</span>
<span class="hljs-keyword">const</span> {BrowserWindow} = electron;
<span class="hljs-comment">//设置一个变量</span>
<span class="hljs-keyword">let</span> mainWindow;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">//实例化一个新的窗口</span>
  mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});

  <span class="hljs-comment">//加载electron主页面</span>
  mainWindow.loadURL(<span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html`</span>);

  <span class="hljs-comment">//打开chrome开发者工具</span>
  mainWindow.webContents.openDevTools();

  <span class="hljs-comment">//监听窗口关闭状态</span>
  mainWindow.on(<span class="hljs-string">'closed'</span>, () =&gt; {
    mainWindow = <span class="hljs-literal">null</span>;
  });
}
<span class="hljs-comment">//当app初始化完毕，开始创建一个新窗口</span>
app.on(<span class="hljs-string">'ready'</span>, createWindow);

<span class="hljs-comment">//监听app窗口关闭状态</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
  <span class="hljs-comment">//mac osx中只有执行command+Q才会退出app，否则保持活动状态</span>
  <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
    app.quit();
  }
});

app.on(<span class="hljs-string">'activate'</span>, () =&gt; {
  <span class="hljs-comment">//mac osx中再dock图标点击时重新创建一个窗口</span>
  <span class="hljs-keyword">if</span> (mainWindow === <span class="hljs-literal">null</span>) {
    createWindow();
  }
});</code></pre>
<p><code>index.html</code>则用来输出你的html：</p>
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
<p>electron官方提供了一个快速开始的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Clone the Quick Start repository
$ git clone https://github.com/electron/electron-quick-start

# Go into the repository
$ cd electron-quick-start

# Install the dependencies and run
$ npm install &amp;&amp; npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"># Clone the Quick Start repository
$ git clone https:<span class="hljs-comment">//github.com/electron/electron-quick-start</span>

# Go into the repository
$ cd electron-quick-start

# Install the dependencies and run
$ npm install &amp;&amp; npm start</code></pre>
<p>更多入门介绍可以查看这里<a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/tutorial/quick-start.md" rel="nofollow noreferrer" target="_blank">Electron快速入门</a>.</p>
<h4>添加开发者工具</h4>
<p>因为项目中用到了<code>react</code>以及<code>redux</code>，为了方便开发，将<code>chrome</code>的这两项插件引入到项目中。以<code>redux</code>为例：</p>
<ol>
<li><p>安装<a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd" rel="nofollow noreferrer" target="_blank">redux-devtools-extension</a>的<code>chrome扩展</code>；</p></li>
<li><p>地址栏输入<code>chrome://extensions/</code>打开扩展程序面板，找到<code>redux-devtools-extension</code>的ID, 这串ID是类似于<code>lmhkpmbekcpmknklioeibfkpmmfibljd</code>的字符串；</p></li>
<li>
<p>找到系统chrome存储扩展的目录：</p>
<ul>
<li><p>windows地址: <code>%LOCALAPPDATA%GoogleChromeUser DataDefaultExtensions;</code></p></li>
<li><p>linux可能在：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~/.config/google-chrome/Default/Extensions/
~/.config/google-chrome-beta/Default/Extensions/
~/.config/google-chrome-canary/Default/Extensions/
~/.config/chromium/Default/Extensions/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-regexp">~/.config/</span>google-chrome<span class="hljs-regexp">/Default/</span>Extensions/
<span class="hljs-regexp">~/.config/</span>google-chrome-beta<span class="hljs-regexp">/Default/</span>Extensions/
<span class="hljs-regexp">~/.config/</span>google-chrome-canary<span class="hljs-regexp">/Default/</span>Extensions/
<span class="hljs-regexp">~/.config/</span>chromium<span class="hljs-regexp">/Default/</span>Extensions/</code></pre>
<ul><li><p>macOS目录地址：<code>~/Library/Application Support/Google/Chrome/Default/Extensions</code>;</p></li></ul>
</li>
<li><p>调用<code>BrowserWindow.addDevToolsExtension</code>的API, 把这串地址传递进去，对于redux-devtools-extensions，大概会是<code>~/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.2.1.1_0/'</code>。在electron表现为：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  BrowserWindow.addDevToolsExtension('~/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.2.1.1_0/');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">  BrowserWindow.addDevToolsExtension('~/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/<span class="hljs-number">2.2</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>_0/');</code></pre>
<p>这样，在electron的控制台就可以看到对应的devtools标签了。<br>如果用的是<strong>react-devtools</strong>在这一步已经可以使用，需要注意的是对于<strong>redux-devtools-extensions</strong>还有一个步骤，<code>store</code>在<code>createStore</code>时需要增加一行判断<code>window.devToolsExtension &amp;&amp; window.devToolsExtension()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = createStore(reducer, window.devToolsExtension &amp;&amp; window.devToolsExtension());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">const store = createStore(<span class="hljs-name">reducer</span>, window.devToolsExtension <span class="hljs-symbol">&amp;&amp;</span> window.devToolsExtension())<span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVzbRX?w=2214&amp;h=720" src="https://static.alili.tech/img/bVzbRX?w=2214&amp;h=720" alt="redux-devtools" title="redux-devtools" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">React + ES6</h3>
<p>React做为一个用来构建UI的JS库开辟了一个相当另类的途径，实现了前端界面的高效率高性能开发。React的虚拟DOM不仅带来了简单的UI开发逻辑，同时也带来了组件化开发的思想。</p>
<p>ES6做为js的新规范带来了许多新的变化，从代码的编写上也带来了许多的便利性。</p>
<p>一个简单的<code>react</code>模块示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jsx
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name=&quot;John&quot; />, document.getElementById('root')));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//jsx</span>
<span class="hljs-keyword">var</span> HelloMessage = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
});

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"John"</span> /&gt;</span>, document.getElementById('root')));</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Document</title>
</head>
<body>
  <div id=&quot;root&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//实际输出
<div id=&quot;root&quot;>Hello John</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//实际输出
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>Hello John<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>通过<code>React.createClass</code>创建一个<code>react</code>模块，使用<code>render</code>函数返回这个模块中的实际html模板，然后引用<code>ReactDOM</code>的<code>render</code>函数生成到指定的html模块中。调用<code>HelloMessage</code>的方法，则是写成一个<code>xhtml</code>的形式<code>&lt;HelloMessage name="John" /&gt;</code>，将<code>name</code>里面的"John"做为一个属性值传到<code>HelloMessage</code>中，通过<code>this.props.name</code>来调用。</p>
<p>当然，这个是未经编译的<code>jsx</code>文件，不能实际输出到html中，如果想要未经编译使用<code>jsx</code>文件，可以在<code>html</code>中引用<code>babel</code>的组件，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot; />
    <title>Hello React!</title>
    <script src=&quot;build/react.js&quot;></script>
    <script src=&quot;build/react-dom.js&quot;></script>
    <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js&quot;></script>
  </head>
  <body>
    <div id=&quot;example&quot;></div>
    <script type=&quot;text/babel&quot;>
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"build/react.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"build/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
      ReactDOM.render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'example'</span>)
      );
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>自从<code>es6</code>正式发布后，<code>react</code>也改用了<code>babel</code>做为编译工具，也因此许多开发者开始将代码开发风格项<code>es6</code>转变。</p>
<p>于是<code>React.createClass</code>的方法被取代为es6中的扩展类写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloWorld extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}</code></pre>
<p>我们可以看到这些语法有了细微的不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5的写法
var HelloWorld = React.createClass({
  handleClick: function(e) {...},
  render: function() {...},
});

//ES6及以上写法
class HelloWorld extends React.Component {
  handleClick(e) {...}
  render() {...}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//ES5的写法</span>
<span class="hljs-keyword">var</span> HelloWorld = React.createClass({
  <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{...},
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{...},
});

<span class="hljs-comment">//ES6及以上写法</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick(e) {...}
  render() {...}
}</code></pre>
<p>在feWorkflow中基本都是使用ES6的写法做为开发, 例如最终输出的container模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ListFolder from './list/list';
import Dropzone from './layout/dropzone';
import ContainerEmpty from './container-empty';
import ContainerFt from './layout/container-ft';
import Aside from './layout/aside';
import { connect } from 'react-redux';

const Container = ({ lists }) => (
  <div className=&quot;container&quot;>
    <div className=&quot;container-bd&quot;>
      {lists.size ? <ListFolder /> : <ContainerEmpty />}
      <Dropzone />
    </div>
    <ContainerFt />
    <Aside />
  </div>
);

const mapStateToProps = (states) => ({
  lists: states.lists
});

export default connect(mapStateToProps)(Container);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> ListFolder <span class="hljs-keyword">from</span> <span class="hljs-string">'./list/list'</span>;
<span class="hljs-keyword">import</span> Dropzone <span class="hljs-keyword">from</span> <span class="hljs-string">'./layout/dropzone'</span>;
<span class="hljs-keyword">import</span> ContainerEmpty <span class="hljs-keyword">from</span> <span class="hljs-string">'./container-empty'</span>;
<span class="hljs-keyword">import</span> ContainerFt <span class="hljs-keyword">from</span> <span class="hljs-string">'./layout/container-ft'</span>;
<span class="hljs-keyword">import</span> Aside <span class="hljs-keyword">from</span> <span class="hljs-string">'./layout/aside'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-keyword">const</span> Container = <span class="hljs-function">(<span class="hljs-params">{ lists }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container-bd"</span>&gt;</span>
      {lists.size ? <span class="hljs-tag">&lt;<span class="hljs-name">ListFolder</span> /&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">ContainerEmpty</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">Dropzone</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ContainerFt</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Aside</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">states</span>) =&gt;</span> ({
  <span class="hljs-attr">lists</span>: states.lists
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(Container);</code></pre>
<p>import做为ES6的引入方式，来取代commonJS的require模式，等同于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ListFoder = require('./list/list');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> ListFoder = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./list/list'</span>);</code></pre>
<p>输出从<code>module.export = Container;</code> 替换成<code>export default Container;</code>，这种写法其实等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5写法
var Container = React.createClass({
  render: function() { 
      ...
      {this.props.lists.size ? <ListFolder /> : <ContainerEmpty />}
    ...
  },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5写法</span>
<span class="hljs-keyword">var</span> Container = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
      ...
      {<span class="hljs-keyword">this</span>.props.lists.size ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ListFolder</span> /&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">ContainerEmpty</span> /&gt;</span>}
    ...
  },
});</span></code></pre>
<p><code>{ lists }</code>的写法编译成ES5的写法等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Container = function Container(_ref) {
  var lists = _ref.lists;
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Container = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Container</span>(<span class="hljs-params">_ref</span>) </span>{
  <span class="hljs-keyword">var</span> lists = _ref.lists;
  ...
}</code></pre>
<p>相当于减少了非常多的赋值操作，极大了减少了开发的工作量。</p>
<h3 id="articleHeader4">Webpack</h3>
<p>ES6中介绍了一下编译之后的代码，而每个文件里其实也并没有import必须的react模块，其实都是通过Webpack这个工具来执行了编译和打包。在webpack中引入了<code>babel-loader</code>来编译<code>react</code>和<code>es6</code>的代码，并将css通过<code>less-loader</code>, <code>css-loader</code>, <code>style-loader</code>自动编译到html的style标签中，再通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  React: 'react'
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  <span class="hljs-attr">React</span>: <span class="hljs-string">'react'</span>
}),</code></pre>
<p>的形式，将react组件注册到每个js文件中，不需再重复引用，最后把所有的js模块编译打包输出到 <code>dist/bundle.js</code>，再html中引入即可。</p>
<p>流程图：</p>
<p><span class="img-wrap"><img data-src="/img/bVyPyt?w=633&amp;h=289" src="https://static.alili.tech/img/bVyPyt?w=633&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>webpack部分设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  target: 'atom',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: require.resolve('babel-loader'),
        ...
      },
     ...
    ]
  },
  ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'source-map'</span>,
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'./src/index'</span>
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>
  },
  <span class="hljs-attr">target</span>: <span class="hljs-string">'atom'</span>,
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>),
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-loader'</span>),
        ...
      },
     ...
    ]
  },
  ...
};</code></pre>
<p>webpack需要设置入口文件<code>entry</code>，在此是引入了源码文件夹src中的<code>index.js</code>，和一个或多个出口文件<code>output</code>，输出devtool<code>source-map</code>使得源代码可见，而非编译后的代码，然后制定所需要的<code>loader</code>来做模块的编译。</p>
<p>与<code>electron</code>相关的一个比较重要的点是，必须指定<code>target: atom</code>，否则会出现无法resolve electron modules的报错提示。</p>
<p>更多介绍可以参考<a href="https://segmentfault.com/a/1190000002551952">Webpack 入门指迷</a></p>
<p>feWorkflow项目中选用了<a href="https://github.com/gaearon/react-transform-hmr" rel="nofollow noreferrer" target="_blank">react-transform-hmr</a>做为模板，已经写好了基础的<code>webpack</code>文件，支持<code>react</code>热加载，不再需要经常去刷新electron，不过该作者已经停止维护这个项目，而是恢复维护<code>react-hot-reload</code>，现在重新开发<a href="https://github.com/gaearon/react-hot-loader/pull/240" rel="nofollow noreferrer" target="_blank">React Hot Loader 3</a>, 有兴趣可以去了解一下。</p>
<h3 id="articleHeader5">Redux</h3>
<p>Redux是针对JavaScript apps的一个可预见的state容器。它可以帮助我们写一个行为保持一致性的应用，可以运行再不同的环境中（client，server，和原生），并非常容易测试。</p>
<p>Redux 可以用这三个基本原则来描述：</p>
<p><strong>1. 单一数据源</strong></p>
<p>整个应用的&nbsp;state&nbsp;被储存在一个 object tree 中，并且这个 object tree 只存在于唯一一个&nbsp;store&nbsp;中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = createStore(counter) //创建一个redux store来保存你的app中所有state

//当state更新时，可以使用 subscribe()来绑定监听更新UI，通常情况下不会直接使用这个方法，而是会用view层绑定库（类似react-redux等)。
store.subscribe(() =>
  console.log(store.getState()) //抛出所有数据
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> store = createStore(counter) <span class="hljs-comment">//创建一个redux store来保存你的app中所有state</span>

<span class="hljs-comment">//当state更新时，可以使用 subscribe()来绑定监听更新UI，通常情况下不会直接使用这个方法，而是会用view层绑定库（类似react-redux等)。</span>
store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  <span class="hljs-built_in">console</span>.log(store.getState()) <span class="hljs-comment">//抛出所有数据</span>
)</code></pre>
<p><strong>2. State是只读的</strong></p>
<p>惟一改变 state 的方法就是触发&nbsp;action，action 是一个用于描述已发生事件的普通对象。</p>
<p>所有的修改都被集中化处理，且严格按照一个接一个的顺序执行. 而执行的方法是调用<code>dispatch</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store.dispatch({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'COMPLETE_TODO'</span>,
  <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>
});</code></pre>
<p><strong>3. 使用纯函数来执行修改</strong></p>
<p>为了描述 action 如何改变 state tree ，你需要编写&nbsp;<code>reducers</code>。</p>
<p><code>Reducer</code> 只是一些纯函数，它接收先前的 <code>state</code> 和 <code>action</code>，并返回新的 <code>state</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params">state = <span class="hljs-number">0</span>, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
  <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
    <span class="hljs-keyword">return</span> state + <span class="hljs-number">1</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">'DECREMENT'</span>:
    <span class="hljs-keyword">return</span> state - <span class="hljs-number">1</span>
  <span class="hljs-keyword">default</span>:
    <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<p>redux流程图：</p>
<p><span class="img-wrap"><img data-src="/img/bVyPyi?w=800&amp;h=600" src="https://static.alili.tech/img/bVyPyi?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>React-Redux</h4>
<p>redux在react中应用还需要加载<code>react-redux</code>模块，因为<code>store</code>为单一state结构头，我们仅需要在入口处调用react-redux的<code>Provider</code>方法抛出<code>store</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Container</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>这样，在container的内部都能接收到<code>store</code>。</p>
<p>我们需要一个操作store的<code>reducer</code>. 当我们的reducer拆分好对应给不同的子组件之后，redux提供了一个<code>combineReducers</code>的方法，把所有的<code>reducers</code>合并起来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux';
import lists from './list';
import snackbar from './snackbar';
import dropzone from './dropzone';

export default combineReducers({
  lists,
  snackbar,
  dropzone,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> lists <span class="hljs-keyword">from</span> <span class="hljs-string">'./list'</span>;
<span class="hljs-keyword">import</span> snackbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./snackbar'</span>;
<span class="hljs-keyword">import</span> dropzone <span class="hljs-keyword">from</span> <span class="hljs-string">'./dropzone'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
  lists,
  snackbar,
  dropzone,
});</code></pre>
<p>然后通过<code>createStore</code>的方式链接<code>store</code>与<code>reducer</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
import reducer from '../reducer/reducer';

export default createStore(reducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../reducer/reducer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createStore(reducer);</code></pre>
<p>上文介绍<code>redux</code>的时候也说过，<strong>state</strong>是只读的，只能通过action来操作，同样我们也可以把<code>dispatch</code>映射成为一个props传入Container中。</p>
<p>在子模块中, 则把这个store映射成react的props，再用<code>connect</code>方法，把store和component链接起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'react-redux'; //引入connect方法
import { addList } from '../../action/addList'; //从action中引入addList方法

const AddListBtn = ({ lists, addList }) => (
  <FloatingActionButton
    onClick={(event) => {
        addList('do something here');
          return false;
      });
    "}}"
  >;
);
const mapStateToProps = (states) => ({
  //从state.lists获取数据存储到lists中，做为属性传递给AddListBtn
  lists: states.lists
});

const mapDispatchToProps = (dispatch) => ({
  //将addList函数做为属性传递给AddListBtn
  addList: (name, location) => dispatch(addList(name, location));
});

//lists, addList做为属性链接到Conta
export default connect(mapStateToProps, mapDispatchToProps)(AddListBtn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>; <span class="hljs-comment">//引入connect方法</span>
<span class="hljs-keyword">import</span> { addList } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../action/addList'</span>; <span class="hljs-comment">//从action中引入addList方法</span>

<span class="hljs-keyword">const</span> AddListBtn = <span class="hljs-function">(<span class="hljs-params">{ lists, addList }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FloatingActionButton</span>
    <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(event)</span> =&gt;</span> {
        addList('do something here');
          return false;
      });
    "}}"
  &gt;;
);
const mapStateToProps = (states) =&gt; ({
  //从state.lists获取数据存储到lists中，做为属性传递给AddListBtn
  lists: states.lists
});

const mapDispatchToProps = (dispatch) =&gt; ({
  //将addList函数做为属性传递给AddListBtn
  addList: (name, location) =&gt; dispatch(addList(name, location));
});

//lists, addList做为属性链接到Conta
export default connect(mapStateToProps, mapDispatchToProps)(AddListBtn);</span></code></pre>
<p>这样，就完成了redux与react的交互，很便捷的从上而下操作数据。</p>
<h3 id="articleHeader6">immutable.js</h3>
<p>Immutable Data是指一旦被创造后，就不可以被改变的数据。</p>
<p>通过使用Immutable Data，可以让我们更容易的去处理缓存、回退、数据变化检测等问题，简化我们的开发。</p>
<p>所以当对象的内容没有发生变化时，或者有一个新的对象进来时，我们倾向于保持对象引用的不变。这个工作正是我们需要借助Facebook的&nbsp;<a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">Immutable.js</a>来完成的。</p>
<blockquote><p>不变性意味着数据一旦创建就不能被改变，这使得应用开发更为简单，避免保护性拷贝（defensive copy），并且使得在简单的应用 逻辑中实现变化检查机制等。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stateV1 = Immutable.fromJS({  
users: [
    { name: 'Foo' },
    { name: 'Bar' }
]
});
 
var stateV2 = stateV1.updateIn(['users', 1], function () {  
    return Immutable.fromJS({
        name: 'Barbar'
    });
});
 
stateV1 === stateV2; // false  
stateV1.getIn(['users', 0]) === stateV2.getIn(['users', 0]); // true  
stateV1.getIn(['users', 1]) === stateV2.getIn(['users', 1]); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> stateV1 = Immutable.fromJS({  
<span class="hljs-attr">users</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">'Foo'</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">'Bar'</span> }
]
});
 
<span class="hljs-keyword">var</span> stateV2 = stateV1.updateIn([<span class="hljs-string">'users'</span>, <span class="hljs-number">1</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
    <span class="hljs-keyword">return</span> Immutable.fromJS({
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Barbar'</span>
    });
});
 
stateV1 === stateV2; <span class="hljs-comment">// false  </span>
stateV1.getIn([<span class="hljs-string">'users'</span>, <span class="hljs-number">0</span>]) === stateV2.getIn([<span class="hljs-string">'users'</span>, <span class="hljs-number">0</span>]); <span class="hljs-comment">// true  </span>
stateV1.getIn([<span class="hljs-string">'users'</span>, <span class="hljs-number">1</span>]) === stateV2.getIn([<span class="hljs-string">'users'</span>, <span class="hljs-number">1</span>]); <span class="hljs-comment">// false</span></code></pre>
<p>feWorkflow项目中使用最多的是<code>List</code>来创建一个数组，<code>Map()</code>来创建一个对象，再通过<code>set</code>的方法来更新数组，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { List, Map } from 'immutable';

export const syncFolder = List([
  Map({
    name: 'syncFromFolder',
    label: '从目录复制',
    location: ''
  }),
  Map({
    name: 'syncToFolder',
    label: '复制到目录',
    location: ''
  })
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { List, <span class="hljs-built_in">Map</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> syncFolder = List([
  <span class="hljs-built_in">Map</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'syncFromFolder'</span>,
    <span class="hljs-attr">label</span>: <span class="hljs-string">'从目录复制'</span>,
    <span class="hljs-attr">location</span>: <span class="hljs-string">''</span>
  }),
  <span class="hljs-built_in">Map</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'syncToFolder'</span>,
    <span class="hljs-attr">label</span>: <span class="hljs-string">'复制到目录'</span>,
    <span class="hljs-attr">location</span>: <span class="hljs-string">''</span>
  })
]);</code></pre>
<p>更新的时候使用<code>setIn</code>方法，传递<code>Map</code>对象的序号，选中<code>location</code>这个属性，通过<code>action</code>传递过来的新值<code>action.location</code>更新值，并返回一个全新的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case 'SET_SYNC_FOLDER':
      return state.setIn(['syncFolder', action.index, 'location'], action.location);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">case</span> <span class="hljs-string">'SET_SYNC_FOLDER'</span>:
      <span class="hljs-keyword">return</span> state.setIn([<span class="hljs-string">'syncFolder'</span>, action.index, <span class="hljs-string">'location'</span>], action.location);</code></pre>
<h4>数据存储</h4>
<p><strong>存：</strong>immutable的数据已经不是单纯的json数据格式，当我们要做json格式的数据存储的时候，可以使用<code>toJS()</code>方法抛出js对象，并通过<code>JSON.stringnify()</code>将js数据转换成json字符串，存入localstorage中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const saveState = (name = 'state', state = 'state') => {
  try {
    const data = JSON.stringify(state.toJS());
    localStorage.setItem(name, data);
  } catch(err) {
    console.log('err', err);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> saveState = <span class="hljs-function">(<span class="hljs-params">name = <span class="hljs-string">'state'</span>, state = <span class="hljs-string">'state'</span></span>) =&gt;</span> {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.stringify(state.toJS());
    localStorage.setItem(name, data);
  } <span class="hljs-keyword">catch</span>(err) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err'</span>, err);
  }
}</code></pre>
<p><strong>取：</strong>读取本地的json格式数据后，当需要加载进页面，首先需要把这段json数据转换会immutable.js数据格式，<code>immutable</code>提供了<code>fromJS()</code>方法，将js对象和数组转换成immtable的<code>Maps</code>和<code>Lists</code>格式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fromJS, Iterable } from 'immutable';

export const loadState = (name = 'setting') => {
  try {
    const data = localStorage.getItem(name);

    if (data === null) {
      return undefined;
    }

    return fromJS(JSON.parse(data), (key, value) => {
      const isIndexed = Iterable.isIndexed(value);
      return isIndexed ? value.toList() : value.toMap();
    });

  } catch(err) {
    return undefined;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { fromJS, Iterable } <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loadState = <span class="hljs-function">(<span class="hljs-params">name = <span class="hljs-string">'setting'</span></span>) =&gt;</span> {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = localStorage.getItem(name);

    <span class="hljs-keyword">if</span> (data === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    }

    <span class="hljs-keyword">return</span> fromJS(<span class="hljs-built_in">JSON</span>.parse(data), (key, value) =&gt; {
      <span class="hljs-keyword">const</span> isIndexed = Iterable.isIndexed(value);
      <span class="hljs-keyword">return</span> isIndexed ? value.toList() : value.toMap();
    });

  } <span class="hljs-keyword">catch</span>(err) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
  }
};</code></pre>
<h2 id="articleHeader7">应用示例</h2>
<p>上文介绍了整个feWorkflow的UI技术实现方案，现在来介绍下实际上gulp在这里是如何工作的。</p>
<p><strong>思路</strong></p>
<p>我们知道<code>node</code>中调用<code>child_process</code>的<code>exec</code>可以执行系统命令，gulpfile.js本身会调用离自身最近的node_modules，而gulp提供了API可以通过flag的形式(—cwd)来执行不同的路径。以此为思路，以最简单的方式，在按钮上绑定执行状态（dev或者build，包括flag等），通过<code>exec</code>直接运行gulp file.js.</p>
<p><strong>实现</strong></p>
<p>当按钮点击的时候，判断是否在执行中，如果在执行中则杀掉进程，如果不在执行中则通过<code>exec</code>执行当前按钮状态的命令。然后扭转按钮的状态，等待下一次按钮点击。</p>
<p>命令模式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ListBtns = ({btns, listId, listLocation, onProcess, cancelBuild, setSnackbar}) => (
  <div className=&quot;btn-group btn-group__right&quot;>
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          className=&quot;btn&quot;
          style={style}
          label={btn.get('name')}
          labelPosition=&quot;after&quot;
          primary={btn.get('process')}
          secondary={btn.get('fail')}
          pid={btn.get('pid')}
          onClick={() => {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`,  {
                cwd
              });

              child.stderr.on('data', function (data) {
                let str = data.toString();

                console.error('exec error: ' + str);
                kill(btn.get('pid'));
                cancelBuild(listId, i, btn.get('name'), child.pid, str, true);
                dialog.showErrorBox('Oops， 出错了', str);
              });

              child.stdout.on('data', function (data) {
                console.log(data.toString())
                onProcess(listId, i, btn.get('text'), child.pid, data.toString())
              });

              //关闭
              child.stdout.on('close', function () {
                cancelBuild(listId, i, btn.get('name'), child.pid, '编译结束', false);
                setSnackbar('编译结束');

                console.info('编译结束');
              });
            }
          "}}"
        />
      ))
    }
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ListBtns = <span class="hljs-function">(<span class="hljs-params">{btns, listId, listLocation, onProcess, cancelBuild, setSnackbar}</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-group btn-group__right"</span>&gt;</span>
    {
      btns.map((btn, i) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">RaisedButton</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"btn"</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>
          <span class="hljs-attr">label</span>=<span class="hljs-string">{btn.get(</span>'<span class="hljs-attr">name</span>')}
          <span class="hljs-attr">labelPosition</span>=<span class="hljs-string">"after"</span>
          <span class="hljs-attr">primary</span>=<span class="hljs-string">{btn.get(</span>'<span class="hljs-attr">process</span>')}
          <span class="hljs-attr">secondary</span>=<span class="hljs-string">{btn.get(</span>'<span class="hljs-attr">fail</span>')}
          <span class="hljs-attr">pid</span>=<span class="hljs-string">{btn.get(</span>'<span class="hljs-attr">pid</span>')}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`,  {
                cwd
              });

              child.stderr.on('data', function (data) {
                let str = data.toString();

                console.error('exec error: ' + str);
                kill(btn.get('pid'));
                cancelBuild(listId, i, btn.get('name'), child.pid, str, true);
                dialog.showErrorBox('Oops， 出错了', str);
              });

              child.stdout.on('data', function (data) {
                console.log(data.toString())
                onProcess(listId, i, btn.get('text'), child.pid, data.toString())
              });

              //关闭
              child.stdout.on('close', function () {
                cancelBuild(listId, i, btn.get('name'), child.pid, '编译结束', false);
                setSnackbar('编译结束');

                console.info('编译结束');
              });
            }
          "}}"
        /&gt;
      ))
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<p><code>—cwd</code>把gulp的操作路径指向了我们定义的src路径，<code>—gulpfile</code>则强行使用feWorkflow中封装的gulp file.js。我在js中对路径做了处理，以<code>src</code>做为截断点，拼接命令行，假设拖放了一个位于<code>D:Codeworkvdlotteryv3src</code>下的路径，那么输出的命令格式为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//执行命令
let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`)

//编译输出命令：
gulp dev --cwd D:\Code\work\vd\lottery\v3\src --development" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//执行命令</span>
<span class="hljs-keyword">let</span> child = exec(<span class="hljs-string">`gulp <span class="hljs-subst">${btn.get(<span class="hljs-string">'cmd'</span>)}</span> --cwd <span class="hljs-subst">${listLocation}</span> <span class="hljs-subst">${btn.get(<span class="hljs-string">'flag'</span>)}</span> --gulpfile <span class="hljs-subst">${cwd}</span>/gulpfile.js`</span>)

<span class="hljs-comment">//编译输出命令：</span>
gulp dev --cwd D:\Code\work\vd\lottery\v3\src --development</code></pre>
<p>同时，通过<code>action</code>扭转了按钮状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function processing(id, index, name, pid, data) {
  return {
    id,
    type: 'PROCESSING',
    btns: {
      index,
      name,
      pid,
      data,
      process: true,
      cmd: name
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processing</span>(<span class="hljs-params">id, index, name, pid, data</span>) </span>{
  <span class="hljs-keyword">return</span> {
    id,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'PROCESSING'</span>,
    <span class="hljs-attr">btns</span>: {
      index,
      name,
      pid,
      data,
      <span class="hljs-attr">process</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">cmd</span>: name
    }
  };
}</code></pre>
<p>调用<code>dispatch</code>发送给<code>reducer</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initState = List([]);

export default (state = initState, action) => {
  switch (action.type) {
      ...
        case 'PROCESSING':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.withMutations(i => {
            i
              .set('status', action.btns.cmd)
              .set('snackbar', action.snackbar)
              .setIn(['btns', action.btns.index, 'text'], action.btns.name)
              .setIn(['btns', action.btns.index, 'name'], '编译中...')
              .setIn(['btns', action.btns.index, 'process'], action.btns.process)
              .setIn(['btns', action.btns.index, 'pid'], action.btns.pid);
          });

        } else {
          return item;
        }
      });
     ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> initState = List([]);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (state = initState, action) =&gt; {
  <span class="hljs-keyword">switch</span> (action.type) {
      ...
        case <span class="hljs-string">'PROCESSING'</span>:
      <span class="hljs-keyword">return</span> state.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (item.get(<span class="hljs-string">'id'</span>) == action.id) {
          <span class="hljs-keyword">return</span> item.withMutations(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> {
            i
              .set(<span class="hljs-string">'status'</span>, action.btns.cmd)
              .set(<span class="hljs-string">'snackbar'</span>, action.snackbar)
              .setIn([<span class="hljs-string">'btns'</span>, action.btns.index, <span class="hljs-string">'text'</span>], action.btns.name)
              .setIn([<span class="hljs-string">'btns'</span>, action.btns.index, <span class="hljs-string">'name'</span>], <span class="hljs-string">'编译中...'</span>)
              .setIn([<span class="hljs-string">'btns'</span>, action.btns.index, <span class="hljs-string">'process'</span>], action.btns.process)
              .setIn([<span class="hljs-string">'btns'</span>, action.btns.index, <span class="hljs-string">'pid'</span>], action.btns.pid);
          });

        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> item;
        }
      });
     ...</code></pre>
<p>这样，就是整个文件执行的过程。</p>
<h2 id="articleHeader8">写在最后</h2>
<p>这次的改版做了很多新的尝试，断断续续的花了不少时间，还没有达到最初的设想，也还缺失了一些重要的功能。后续还需要补充不少东西。成品确实还比较简单，代码也许也比较杂乱，所有代码开源在<a href="https://github.com/whatifhappen/feWorkflow" rel="nofollow noreferrer" target="_blank">github</a>上，欢迎斧正。</p>
<p>参考资料：</p>
<ol>
<li><p><a href="https://github.com/electron/electron/tree/master/docs-translations/zh-CN" rel="nofollow noreferrer" target="_blank">electron docs</a></p></li>
<li><p><a href="https://babeljs.io/blog/2015/06/07/react-on-es6-plus" rel="nofollow noreferrer" target="_blank">babel react-on-es6-plus</a></p></li>
<li><p><a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a></p></li>
<li><p><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">redux</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
feWorkflow - 使用 electron, react, redux, immutable 构建桌面 App

## 原文链接
[https://segmentfault.com/a/1190000005879164](https://segmentfault.com/a/1190000005879164)

