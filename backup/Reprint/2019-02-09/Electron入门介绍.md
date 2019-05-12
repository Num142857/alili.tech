---
title: 'Electron入门介绍' 
date: 2019-02-09 2:30:58
hidden: true
slug: 8r0hkdk7qxf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/web/runtime/electron/electron.md" rel="nofollow noreferrer" target="_blank">Github 系列文章地址</a><br>笔者前两天心血来潮做了个MACOS下可以进行OCR图文识别的小工具，发现Electron 在1.x之后API发生了挺大的变化，估计也是我好久没碰了，所以打算把这些系列整理下扔出来，有兴趣的也可以关注笔者的<a href="https://github.com/wxyyxc1992/ElectronOCR" rel="nofollow noreferrer" target="_blank">ElectronOCR</a>这个实践项目，自认为还是有点用的，不过貌似没啥人喜欢。</p></blockquote>
<h1 id="articleHeader0">Introduction</h1>
<p>Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。你可以把它看作是专注于桌面应用而不是 Web 服务器的io.js 的一个变体。这不意味着 Electron 是绑定了 GUI 库的 JavaScript。相反，Electron 使用 Web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。</p>
<h2 id="articleHeader1">Process(进程)</h2>
<h3 id="articleHeader2">主进程</h3>
<p>在 Electron 里，运行 <code>package.json</code> 里 <code>main</code> 脚本的进程被称为<strong>主进程</strong>。在主进程运行的脚本可以以创建 web 页面的形式展示 GUI。</p>
<h3 id="articleHeader3">渲染进程</h3>
<p>由于 Electron 使用 Chromium 来展示页面，所以 Chromium 的多进程结构也被充分利用。每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为<strong>渲染进程</strong>。在一般浏览器中，网页通常会在沙盒环境下运行，并且不允许访问原生资源。然而，Electron 用户拥有在网页中调用 io.js 的 APIs 的能力，可以与底层操作系统直接交互。</p>
<h3 id="articleHeader4">主进程与渲染进程的区别</h3>
<p>主进程使用 BroswerWindow 实例创建网页。每个 BroswerWindow 实例都在自己的渲染进程里运行着一个网页。当一个 BroswerWindow 实例被销毁后，相应的渲染进程也会被终止。主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的网页。由于在网页里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在网页面调用 GUI 相关的 APIs 是不被允许的。如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。<br>在 Electron，我们提供用于在主进程与渲染进程之间通讯的 <a href="https://github.com/atom/electron/blob/master/docs-translations/zh-CN/api/ipc-renderer.md" rel="nofollow noreferrer" target="_blank">ipc</a> 模块。并且也有一个远程进程调用风格的通讯模块 <a href="https://github.com/atom/electron/blob/master/docs-translations/zh-CN/api/remote.md" rel="nofollow noreferrer" target="_blank">remote</a>。</p>
<h2 id="articleHeader5">Reference</h2>
<h3 id="articleHeader6">Tutorials &amp; Docs</h3>
<ul>
<li><p><a href="https://github.com/electron/electron-api-demos/releases" rel="nofollow noreferrer" target="_blank">electron-api-demos</a>:官方的Electron API示范</p></li>
<li><p><a href="https://github.com/electron/electron/tree/master/docs-translations/zh-CN" rel="nofollow noreferrer" target="_blank">官方文档的中文翻译</a>:官方的API中文翻译</p></li>
</ul>
<h4>Boilerplate</h4>
<ul>
<li><p><a href="https://github.com/chentsulin/electron-react-boilerplate" rel="nofollow noreferrer" target="_blank">electron-react-boilerplate</a></p></li>
<li><p><a href="https://github.com/szwacz/electron-boilerplate?hmsr=toutiao.io&amp;utm_medium=toutiao.io&amp;utm_source=toutiao.io" rel="nofollow noreferrer" target="_blank">electron-boilerplate</a></p></li>
</ul>
<h3 id="articleHeader7">Practice</h3>
<ul><li><p><a href="https://github.com/hokein/electron-sample-apps/blob/master/README.md" rel="nofollow noreferrer" target="_blank">Hokein编辑的Electron示范项目</a></p></li></ul>
<h1 id="articleHeader8">Quick Start</h1>
<h2 id="articleHeader9">Installation</h2>
<ul><li><p>electron-prebuild</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g electron-prebuilt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g electron-<span class="hljs-keyword">prebuilt</span></code></pre>
<p>如果你已经用 <code>npm</code> 全局安装了 <code>electron-prebuilt</code>，你只需要按照如下方式直接运行你的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>electron .
</code></pre>
<p>如果你是局部安装，那运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/electron .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>./node_modules/.<span class="hljs-keyword">bin/electron </span>.
</code></pre>
<ul><li><p>手工下载 Electron 二进制文件</p></li></ul>
<p>如果你手工下载了 Electron 的二进制文件，你也可以直接使用其中的二进制文件直接运行你的应用。</p>
<p>（1）Windows</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ .\electron\electron.exe your-app\" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;">$ .<span class="hljs-string">\electron\electron.exe</span> your-app<span class="hljs-string">\</span></code></pre>
<p>（2）Linux</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./electron/electron your-app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">$ .<span class="hljs-regexp">/electron/</span>electron your-app<span class="hljs-regexp">/</span></code></pre>
<p>（3）OS X</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./Electron.app/Contents/MacOS/Electron your-app/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">$ .<span class="hljs-regexp">/Electron.app/</span>Contents<span class="hljs-regexp">/MacOS/</span>Electron your-app<span class="hljs-regexp">/</span></code></pre>
<p><code>Electron.app</code> 里面是 Electron 发布包，你可以在<a href="https://github.com/atom/electron/releases" rel="nofollow noreferrer" target="_blank">这里</a>下载到。</p>
<h3 id="articleHeader10">Webpack</h3>
<h3 id="articleHeader11"><a href="https://github.com/electron/devtron" rel="nofollow noreferrer" target="_blank">DevTools</a></h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006767534" src="https://static.alili.tech/img/remote/1460000006767534" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
npm install --save-dev devtron
require('devtron').install()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
npm install --save-dev devtron
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'devtron'</span>)</span></span>.install()</code></pre>
<h2 id="articleHeader12">HelloWorld</h2>
<p>大体上，一个 Electron 应用的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="your-app/
├── package.json //通用的node项目的声明文件
├── main.js //主进程渲染文件

├── renderer.js //渲染进程文件

└── index.html //主入口文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>your-app/
├── package<span class="hljs-selector-class">.json</span> <span class="hljs-comment">//通用的node项目的声明文件</span>
├── main<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//主进程渲染文件</span>

├── renderer<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//渲染进程文件</span>

└── index<span class="hljs-selector-class">.html</span> <span class="hljs-comment">//主入口文件</span>
</code></pre>
<p><code>package.json</code>的格式和 Node 的完全一致，并且那个被 <code>main</code> 字段声明的脚本文件是你的应用的启动脚本，它运行在主进程上。你应用里的 <code>package.json</code> 看起来应该像：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;    : &quot;your-app&quot;,
  &quot;version&quot; : &quot;0.1.0&quot;,
  &quot;main&quot;    : &quot;main.js&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>    : <span class="hljs-string">"your-app"</span>,
  <span class="hljs-attr">"version"</span> : <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"main"</span>    : <span class="hljs-string">"main.js"</span>
}
</code></pre>
<p><strong>注意</strong>：如果 <code>main</code> 字段没有在 <code>package.json</code> 声明，Electron会优先加载 <code>index.js</code>。</p>
<h3 id="articleHeader13">主进程</h3>
<p><code>main.js</code> 应该用于创建窗口和处理系统时间，一个典型的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by apple on 16/6/3.
 */
const electron = require('electron');
// 用于控制应用生命周期
const {app} = electron;
// 用于创建本地窗口
const {BrowserWindow} = electron;

//为Window对象创建一个全局的引用,否则可能被JavaScript的垃圾回收机制自动回收
let win;

/**
 * @function 创建窗口
 */
function createWindow() {
    // 创建类似于浏览器的窗口
    win = new BrowserWindow({width: 800, height: 600});

    // 加载应用入口文件,本文件为测试文件,因此加载的是测试
    win.loadURL(`file://${__dirname}/dist/app.html`);

    // 启动调试工具,如果是开发环境下则不需要开启
    win.webContents.openDevTools();

    // 设置窗口关闭事件
    win.on('closed', () => {
        //因为上面是设置了一个全局引用,因此这里需要对该对象解除引用
        //如果你的应用支持打开多窗口,可以把所有的引用存入一个数组中,然后在这里动态删除
        win = null;
    });
}

// 在基本环境准备好之后的回调
app.on('ready', createWindow);

// 所有窗口都关闭之后的回调
app.on('window-all-closed', () => {
    //在OSX中经常是用户虽然关闭了主窗口,但是仍然希望使用Menu Bar,因此这里不进行强行关闭
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用被重新激活之后的回调
app.on('activate', () => {
    // 在Dock中的Menu Bar被点击之后重新激活应用
    if (win === null) {
        createWindow();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Created by apple on 16/6/3.
 */</span>
<span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-comment">// 用于控制应用生命周期</span>
<span class="hljs-keyword">const</span> {app} = electron;
<span class="hljs-comment">// 用于创建本地窗口</span>
<span class="hljs-keyword">const</span> {BrowserWindow} = electron;

<span class="hljs-comment">//为Window对象创建一个全局的引用,否则可能被JavaScript的垃圾回收机制自动回收</span>
<span class="hljs-keyword">let</span> win;

<span class="hljs-comment">/**
 * @function 创建窗口
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 创建类似于浏览器的窗口</span>
    win = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attr">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">600</span>});

    <span class="hljs-comment">// 加载应用入口文件,本文件为测试文件,因此加载的是测试</span>
    win.loadURL(<span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/dist/app.html`</span>);

    <span class="hljs-comment">// 启动调试工具,如果是开发环境下则不需要开启</span>
    win.webContents.openDevTools();

    <span class="hljs-comment">// 设置窗口关闭事件</span>
    win.on(<span class="hljs-string">'closed'</span>, () =&gt; {
        <span class="hljs-comment">//因为上面是设置了一个全局引用,因此这里需要对该对象解除引用</span>
        <span class="hljs-comment">//如果你的应用支持打开多窗口,可以把所有的引用存入一个数组中,然后在这里动态删除</span>
        win = <span class="hljs-literal">null</span>;
    });
}

<span class="hljs-comment">// 在基本环境准备好之后的回调</span>
app.on(<span class="hljs-string">'ready'</span>, createWindow);

<span class="hljs-comment">// 所有窗口都关闭之后的回调</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
    <span class="hljs-comment">//在OSX中经常是用户虽然关闭了主窗口,但是仍然希望使用Menu Bar,因此这里不进行强行关闭</span>
    <span class="hljs-comment">// On OS X it is common for applications and their menu bar</span>
    <span class="hljs-comment">// to stay active until the user quits explicitly with Cmd + Q</span>
    <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
        app.quit();
    }
});

<span class="hljs-comment">// 应用被重新激活之后的回调</span>
app.on(<span class="hljs-string">'activate'</span>, () =&gt; {
    <span class="hljs-comment">// 在Dock中的Menu Bar被点击之后重新激活应用</span>
    <span class="hljs-keyword">if</span> (win === <span class="hljs-literal">null</span>) {
        createWindow();
    }
});</code></pre>
<h3 id="articleHeader14">入口文件</h3>
<p>最后，你想展示的 <code>index.html</code> ：</p>
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

    <!-- All of the Node.js APIs are available in this renderer process. -->

    We are using node <script>document.write(process.versions.node)</script>,

    Chromium <script>document.write(process.versions.chrome)</script>,

    and Electron <script>document.write(process.versions.electron)</script>.

  </body>



  <script>

    // You can also require other files to run in this process

    require('./renderer.js')

  </script>

</html>
" title="" data-original-title="复制"></span>
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

    <span class="hljs-comment">&lt;!-- All of the Node.js APIs are available in this renderer process. --&gt;</span>

    We are using node <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.node)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>,

    Chromium <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.chrome)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>,

    and Electron <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(process.versions.electron)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>.

  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>



  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

    <span class="hljs-comment">// You can also require other files to run in this process</span>

    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./renderer.js'</span>)

  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="articleHeader15">渲染进程</h3>
<p>实际上，在Electron项目中，关于Hot-Reload等等配置都和笔者在<a href="https://segmentfault.com/a/1190000005122575">我的Webpack套装</a>中提及的一系列配置方案。关于这方面的具体实践可以参考笔者<a href="https://segmentfault.com/a/1190000005640243" target="_blank">ElectronOCR</a>这个实战项目。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron入门介绍

## 原文链接
[https://segmentfault.com/a/1190000005692430](https://segmentfault.com/a/1190000005692430)

