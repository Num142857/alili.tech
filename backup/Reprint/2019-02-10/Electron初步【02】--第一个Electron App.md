---
title: 'Electron初步【02】--第一个Electron App' 
date: 2019-02-10 2:30:42
hidden: true
slug: vzxilhofb3
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">目录结构与文件</h3>
<p>Electron App的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="your-app/
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">your-app/
├── package<span class="hljs-selector-class">.json</span>
├── main<span class="hljs-selector-class">.js</span>
└── index.html</code></pre>
<p>其中的<code>package.json</code>和Node Modules里表现的一样，而<code>main.js</code>则是启动你App的脚本，它将会开启主进程。<code>package.json</code>的一个例子：</p>
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
<p>注：当<code>package.json</code>里不存在<code>main</code>时，Electron将会默认使用<code>index.js</code></p>
<p><code>main.js</code>应当创建一个窗口并处理系统事件。一个典型的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

const electron = require('electron');
const app = electron.app;  // 控制App生命周期的模块
const BrowserWindow = electron.BrowserWindow;  // 创建原生窗口的模块

// 保持对窗口对象的全局引用。如果不这么做的话，JavaScript垃圾回收的时候窗口会自动关闭
var mainWindow = null;

// 当所有的窗口关闭的时候退出应用
app.on('window-all-closed', function() {
  // 在 OS X 系统里，除非用户按下Cmd + Q，否则应用和它们的menu bar会保持运行
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当应用初始化结束后调用这个方法，并渲染浏览器窗口
app.on('ready', function() {
  // 创建一个窗口
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载index.js
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开 DevTools
  mainWindow.webContents.openDevTools();

  // 窗口关闭时触发
  mainWindow.on('closed', function() {
    // 如果你的应用允许多个屏幕，那么可以把它存在Array里。
    // 因此删除的时候可以在这里删掉相应的元素
    mainWindow = null;
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-keyword">const</span> app = electron.app;  <span class="hljs-comment">// 控制App生命周期的模块</span>
<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow;  <span class="hljs-comment">// 创建原生窗口的模块</span>

<span class="hljs-comment">// 保持对窗口对象的全局引用。如果不这么做的话，JavaScript垃圾回收的时候窗口会自动关闭</span>
<span class="hljs-keyword">var</span> mainWindow = <span class="hljs-literal">null</span>;

<span class="hljs-comment">// 当所有的窗口关闭的时候退出应用</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 在 OS X 系统里，除非用户按下Cmd + Q，否则应用和它们的menu bar会保持运行</span>
  <span class="hljs-keyword">if</span> (process.platform != <span class="hljs-string">'darwin'</span>) {
    app.quit();
  }
});

<span class="hljs-comment">// 当应用初始化结束后调用这个方法，并渲染浏览器窗口</span>
app.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建一个窗口</span>
  mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});

  <span class="hljs-comment">// 加载index.js</span>
  mainWindow.loadURL(<span class="hljs-string">'file://'</span> + __dirname + <span class="hljs-string">'/index.html'</span>);

  <span class="hljs-comment">// 打开 DevTools</span>
  mainWindow.webContents.openDevTools();

  <span class="hljs-comment">// 窗口关闭时触发</span>
  mainWindow.on(<span class="hljs-string">'closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 如果你的应用允许多个屏幕，那么可以把它存在Array里。</span>
    <span class="hljs-comment">// 因此删除的时候可以在这里删掉相应的元素</span>
    mainWindow = <span class="hljs-literal">null</span>;
  });
});</code></pre>
<p>最后，<code>index.html</code>是你最终要展示的页面</p>
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
<h3 id="articleHeader1">运行&amp;生成应用</h3>
<h4>通过<code>electron-prebuilt</code>运行</h4>
<p>如果你通过<code>npm</code>全局安装了<code>electron-prebuilt</code>，那么在App文件目录下跑这句就可以运行它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">electron .</code></pre>
<p>如果只是在当前项目下安装了，则要跑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/electron ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">./node_modules/.bin/electron .</code></pre>
<h4>通过Electron Binary运行</h4>
<p>在这儿下载<a href="https://github.com/electron/electron/releases" rel="nofollow noreferrer" target="_blank">Electron二进制文件</a></p>
<p>打开包内的App按照提示操作，或者在该文件夹下运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./Electron.app/Contents/MacOS/Electron your-app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ ./Electron.app/Contents/MacOS/Electron your-app/</code></pre>
<p>就可以通过这个包来运行自己的应用了。</p>
<h4>生成应用</h4>
<p>应用写完以后，可以参照<a href="https://github.com/electron/electron/blob/v0.37.8/docs/tutorial/application-distribution.md" rel="nofollow noreferrer" target="_blank">Application Distribution</a>里的指导进行打包：</p>
<ol>
<li><p>项目文件名应该命名为<code>app</code></p></li>
<li><p>下载Electron资源文件。就是上一步里面的<a href="https://github.com/electron/electron/releases" rel="nofollow noreferrer" target="_blank">Electron二进制文件</a></p></li>
<li><p>把项目目录放在Electron资源文件夹下</p></li>
</ol>
<p>Mac OS X:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">electron/Electron.app/Contents/Resources/app/
├── package<span class="hljs-selector-class">.json</span>
├── main<span class="hljs-selector-class">.js</span>
└── index.html</code></pre>
<p>Windows &amp; Linux:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron/resources/app
├── package.json
├── main.js
└── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">electron/resources/app
├── package<span class="hljs-selector-class">.json</span>
├── main<span class="hljs-selector-class">.js</span>
└── index.html</code></pre>
<p>之后运行<code>Electron.app</code>就能启动应用</p>
<p>现在，你的应用名称为默认的<code>Electron.app</code>（或<code>Electron.exe</code>），可以通过如下方式修改名称：</p>
<p><strong>Windows</strong></p>
<p>直接修改<code>Electron.exe</code>的名称</p>
<p><strong>OS X</strong></p>
<ol>
<li><p>修改应用<code>Electron.app</code>的名称</p></li>
<li><p>修改文件中的<code>CFBundleDisplayName</code>，<code>CFBundleIdentifier</code>，以及<code>CFBundleName</code>字段。它们的所在位置：</p></li>
</ol>
<ul>
<li><p><code>Electron.app/Contents/Info.plist</code></p></li>
<li><p>`Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist<br>`</p></li>
</ul>
<h3 id="articleHeader2">应用打包</h3>
<p>使用<code>asar</code>库来替代你的<code>app</code>文件夹，这样可以避免暴露你的源码。</p>
<h4>生成<code>asar</code>包</h4>
<p><code>asar</code>可以把多个文件合并成一个类似于tar的归档文件。</p>
<ol><li><p>install</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g asar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install -g asar</code></pre>
<ol><li><p>打包</p></li></ol>
<p>切换到含有你项目文件夹的父级文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# dev/your-app
$ cd dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># dev/your-app</span>
$ <span class="hljs-built_in">cd</span> dev</code></pre>
<p>打包项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ asar pack your-app/ app.asar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ asar pack your-app/ app.asar</code></pre>
<p>将生成的<code>app.asar</code>放在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// OS X
electron/Electron.app/Contents/Resources/
└── app.asar

// Windows &amp; Linux
electron/resources/
└── app.asar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="text"><span class="hljs-regexp">//</span> OS X
electron<span class="hljs-regexp">/Electron.app/</span>Contents<span class="hljs-regexp">/Resources/</span>
└── app.asar

<span class="hljs-regexp">//</span> Windows &amp; Linux
electron<span class="hljs-regexp">/resources/</span>
└── app.asar</code></pre>
<p>这样你就可以不必放入<code>app</code>文件夹，而且你的代码都是封装压缩过的。</p>
<h3 id="articleHeader3">例子</h3>
<p>按照下面步骤来运行官方案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Clone the repository
$ git clone https://github.com/atom/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies and run the app
$ npm install &amp;&amp; npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># Clone the repository</span>
$ git <span class="hljs-built_in">clone</span> https://github.com/atom/electron-quick-start
<span class="hljs-comment"># Go into the repository</span>
$ <span class="hljs-built_in">cd</span> electron-quick-start
<span class="hljs-comment"># Install dependencies and run the app</span>
$ npm install &amp;&amp; npm start</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron初步【02】--第一个Electron App

## 原文链接
[https://segmentfault.com/a/1190000005126759](https://segmentfault.com/a/1190000005126759)

