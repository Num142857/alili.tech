---
title: '一口气完成electron的入门学习' 
date: 2019-02-06 2:30:08
hidden: true
slug: bfsffledmar
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">介绍</h1>
<p>目前，使用前端技术开发桌面应用已经越来越成熟，这使得前端同学也可以参与桌面应用的开发。目前类似的工具有electron，NW.js等。这里我们着重介绍下electron。</p>
<h1 id="articleHeader1">electron开发</h1>
<p>electron是基于Node.js和Chromium做的一个工具。electron是的可以使用前端技术实现桌面开发，并且支持多平台运行。下面来讲下如何使用electron开发桌面app。</p>
<h2 id="articleHeader2">hello world</h2>
<p>一个最简单的electron项目包含三个文件, <code>package.json</code>, <code>index.html</code>, <code>main.js</code>。   <br><code>package.json</code>是Node.js项目的配置文件，<code>index.html</code>是桌面应用的界面页面，<code>main.js</code>是应用的启动入口文件。其中，核心的文件是<code>inde.html</code>和<code>main.js</code>，下面来讲下这两个文件的细节。<br><code>index.html</code>是应用的展示界面，代码如下：</p>
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
<p><code>main.js</code>是electron应用的入口文件。主要用户启动electron的界面。可以通过以下代码来启动electron界面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
let win;
function createWindow() {
  // 创建窗口并加载页面
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/index.html`);

  // 打开窗口的调试工具
  win.webContents.openDevTools();
  // 窗口关闭的监听
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-keyword">const</span> { app } = electron;
<span class="hljs-keyword">const</span> { BrowserWindow } = electron;
<span class="hljs-keyword">let</span> win;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建窗口并加载页面</span>
  win = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});
  win.loadURL(<span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html`</span>);

  <span class="hljs-comment">// 打开窗口的调试工具</span>
  win.webContents.openDevTools();
  <span class="hljs-comment">// 窗口关闭的监听</span>
  win.on(<span class="hljs-string">'closed'</span>, () =&gt; {
    win = <span class="hljs-literal">null</span>;
  });
}

app.on(<span class="hljs-string">'ready'</span>, createWindow);
app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
  <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
    app.quit();
  }
});

app.on(<span class="hljs-string">'activate'</span>, () =&gt; {
  <span class="hljs-keyword">if</span> (win === <span class="hljs-literal">null</span>) {
    createWindow();
  }
});</code></pre>
<p>上面的代码就实现了一个hello world的electron应用。代码写完后，需要运行代码看看效果，这个时候需要使用<code>electron-prubuilt</code>来运行代码。    <br>首先，我们需要安装<code>electron-prubuilt</code>包。可以通过命令<code>npm install --saved-dev electron-prebuilt</code>进行安装。安装完成后，项目本地就可以使用<code>electron</code>命令，直接运行命令<code>electron .</code>就可以看到<code>hello world</code>的效果。或者可以在<code>package.json</code>中设置scripts，方便项目的运行。   <br>具体代码可以去<a href="https://github.com/chenhao-ch/electron-demo/tree/demo01" rel="nofollow noreferrer" target="_blank">这里</a>获取。</p>
<h2 id="articleHeader3">主进程与渲染进程</h2>
<p>electron中，由<code>package.json</code>中的main.js运行出来的进程为主进程(Main Process)。主进程用于创建GUI界面以便web页面的展示。electron由Chromium负责页面的显示，所以当创建一个页面时，就会对应的创建渲染进程(Renderer Process)。     <br>主进程通过创建<code>BrowserWindow</code>对象来创建web显示页面，<code>BrowserWindow</code>运行在他自己的渲染进程中。当<code>BrowserWindow</code>被销毁时，对应的渲染进程也会终止。   </p>
<p>在渲染进程中，直接调用原生的GUI接口是十分危险的。如果你想在渲染进程中使用原生的GUI的功能，需要让渲染进程与主进程进行通信，再由主进程去调用对应接口。那么主进程和渲染进程是如何进行通信的呢？    <br>electron中，主进程与渲染进程的通信存在多种方法。这里介绍一种，通过<code>ipcMain</code>和<code>ipcRenderer</code>对象，以消息的方式进行通信。   <br>先来看下主进程如何向渲染进程发信息。   <br>首先，渲染进程通过接口<code>ipcRenderer.on()</code>来监听主进程的消息信息。主进程通过接口<code>BrowserWindow.webContents.send()</code>向所有渲染进程发送消息。相关代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// renderer.js
// 引入ipcRenderer对象
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
// 设置监听
ipcRenderer.on('main-process-messages', (event, message) => {
  console.log('message from Main Process: ' , message);  // Prints Main Process Message.
});

// main.js
// 当页面加载完成时，会触发`did-finish-load`事件。
win.webContents.on('did-finish-load', () => {
  win.webContents.send('main-process-messages', 'webContents event &quot;did-finish-load&quot; called');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// renderer.js</span>
<span class="hljs-comment">// 引入ipcRenderer对象</span>
<span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-keyword">const</span> ipcRenderer = electron.ipcRenderer;
<span class="hljs-comment">// 设置监听</span>
ipcRenderer.on(<span class="hljs-string">'main-process-messages'</span>, <span class="hljs-function">(<span class="hljs-params">event, message</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'message from Main Process: '</span> , message);  <span class="hljs-comment">// Prints Main Process Message.</span>
});

<span class="hljs-comment">// main.js</span>
<span class="hljs-comment">// 当页面加载完成时，会触发`did-finish-load`事件。</span>
win.webContents.on(<span class="hljs-string">'did-finish-load'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  win.webContents.send(<span class="hljs-string">'main-process-messages'</span>, <span class="hljs-string">'webContents event "did-finish-load" called'</span>);
});</code></pre>
<p>那么渲染进程需要给主进程发生消息该如何做呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// renderer.js
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log('asynchronous-reply: %O %O', event, arg);
});
ipcRenderer.send('asynchronous-message', 'hello');

// main.js
ipcMain.on('asynchronous-message', (event, arg) => {
  // 返回消息
  event.sender.send('asynchronous-reply', 'ok');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> renderer.js
ipcRenderer.<span class="hljs-literal">on</span>(<span class="hljs-string">'asynchronous-reply'</span>, <span class="hljs-function"><span class="hljs-params">(event, arg)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'asynchronous-reply: %O %O'</span>, event, arg);
});
ipcRenderer.send(<span class="hljs-string">'asynchronous-message'</span>, <span class="hljs-string">'hello'</span>);

<span class="hljs-regexp">//</span> main.js
ipcMain.<span class="hljs-literal">on</span>(<span class="hljs-string">'asynchronous-message'</span>, <span class="hljs-function"><span class="hljs-params">(event, arg)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> 返回消息
  event.sender.send(<span class="hljs-string">'asynchronous-reply'</span>, <span class="hljs-string">'ok'</span>);
});</code></pre>
<p>上面的代码是异步监听过程。 主进程设置好监听，渲染进程通过<code>ipcRenderer.send()</code>发送消息。主进程获得消息后，通过<code>event.sender.send()</code>返回信息。返回信息也是异步的，所以渲染进程也设置了监听。    <br>另外，electron还提供了一种同步的消息传递方式。代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// renderer.js
console.log('synchronous-message: ', ipcRenderer.sendSync('synchronous-message', 'hello'));

// main.js
ipcMain.on('synchronous-message', (event, arg) => {
  event.returnValue = 'ok';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> renderer.js
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'synchronous-message: '</span>, ipcRenderer.sendSync(<span class="hljs-string">'synchronous-message'</span>, <span class="hljs-string">'hello'</span>));

<span class="hljs-regexp">//</span> main.js
ipcMain.<span class="hljs-literal">on</span>(<span class="hljs-string">'synchronous-message'</span>, <span class="hljs-function"><span class="hljs-params">(event, arg)</span> =&gt;</span> {
  event.returnValue = <span class="hljs-string">'ok'</span>;
});</code></pre>
<p>主进程与渲染进程相互传递数据的例子可以去<a href="https://github.com/chenhao-ch/electron-demo/tree/demo03" rel="nofollow noreferrer" target="_blank">这里</a>获取。</p>
<h2 id="articleHeader4">调试</h2>
<p>一个app的开发过程，会用到代码调试，那么electron应该如何进行调试呢？   <br>electron中，渲染进程因为是Chromium的页面，所以可以使用DevTools进行调试。启动DevTools的方式是：在main.js中，创建好<code>BrowserWindow</code>后，通过接口<code>BrowserWindow.webContents.openDevTools();</code>来打开页面的DevTools调试工具，进行页面调试，具体的调试方法和使用Chrome进行调试一致。    <br>主进程是基于Node.js的，所以electron的调试和Node.js类似。这里说下在VS Code中如何进行electron主进程的调试。<br>第一步，设置VS Code的tasks，用于启动electron。相关配置如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;command&quot;: &quot;electron&quot;,
  &quot;isShellCommand&quot;: true,
  &quot;showOutput&quot;: &quot;always&quot;,
  &quot;suppressTaskName&quot;: true,
  &quot;args&quot;: [&quot;--debug=5858&quot;, &quot;.&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-comment">// See https://go.microsoft.com/fwlink/?LinkId=733558</span>
  <span class="hljs-comment">// for the documentation about the tasks.json format</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-string">"command"</span>: <span class="hljs-string">"electron"</span>,
  <span class="hljs-string">"isShellCommand"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"showOutput"</span>: <span class="hljs-string">"always"</span>,
  <span class="hljs-string">"suppressTaskName"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"args"</span>: [<span class="hljs-string">"--debug=5858"</span>, <span class="hljs-string">"."</span>]
}</code></pre>
<p>其中，<code>--debug=5858</code>是用于调试Node.js的端口。<br>第二步，设置VS Code项目的调试配置。可以生成launch.json，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;version&quot;: &quot;0.2.0&quot;,
  &quot;configurations&quot;: [ {
      &quot;name&quot;: &quot;Attach&quot;,
      &quot;type&quot;: &quot;node&quot;,
      &quot;address&quot;: &quot;localhost&quot;,
      &quot;port&quot;: 5858,
      &quot;request&quot;: &quot;attach&quot;
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
  <span class="hljs-attr">"configurations"</span>: [ {
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Attach"</span>,
      <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
      <span class="hljs-attr">"address"</span>: <span class="hljs-string">"localhost"</span>,
      <span class="hljs-attr">"port"</span>: <span class="hljs-number">5858</span>,
      <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>
    }
  ]
}</code></pre>
<p>其中的<code>port:5858</code>的端口信息需要和上面的<code>--debug=5858</code>端口保持一致。   <br>配置完成后，便可以开始调试主进程。   <br>首先启动electron项目。    <br>因为上面配置了task，所以可以使用VS Code的task进行启动。按下快捷键<code>shift + command + p</code>可以启动命令，输入<code>task electron</code>命令，回车，就可以运行<code>electron</code>的task进行项目的启动。   <br>项目启动后，再开始设置主进程代码的断点。在VS Code的调试界面中设置断点，并点击运行。这个时候，操作启动的electron应用，当运行到断点所在代码时，就可以触发断点调试。</p>
<h2 id="articleHeader5">扩展功能</h2>
<p>electron除了使用前端技术实现界面展示的功能外，还提供了大量的桌面环境接口。比如支持Notification，Jump List, dock menu等。具体支持哪些桌面接口以及如何使用，可以去<a href="http://electron.atom.io/docs/tutorial/desktop-environment-integration/" rel="nofollow noreferrer" target="_blank">http://electron.atom.io/docs/...</a> 了解。</p>
<h1 id="articleHeader6">打包</h1>
<p>完成功能代码后，我们需要将代码打成可运行的包。可以使用<code>electron-packager</code>来进行应用打包，<code>electron-packager</code>支持windows, Mac, linux等系统。具体介绍可以去<a href="https://github.com/electron-userland/electron-packager" rel="nofollow noreferrer" target="_blank">https://github.com/electron-u...</a> 了解。<br>打包的步骤很简单，只需要两步：</p>
<ol>
<li><p>全局安装Node.js模块<code>electron-packager</code>。</p></li>
<li><p>运行命令： <code>electron-packager &lt;sourcedir&gt; &lt;appname&gt; --platform=&lt;platform&gt; --arch=&lt;arch&gt; [optional flags...]</code>。 其中platform可以取<code>darwin</code>, <code>linux</code>, <code>mas</code>, <code>win32</code>4个值；arch可以取<code>ia32</code>, <code>x64</code>两个值。   <br>需要注意，打包后，代码中的所有路径都必须使用绝对路径，通过<code>${__dirname}</code>获得app的根路径，然后拼接成绝对路径。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一口气完成electron的入门学习

## 原文链接
[https://segmentfault.com/a/1190000006207600](https://segmentfault.com/a/1190000006207600)

