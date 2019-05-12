---
title: 'Electron 实战桌面计算器应用' 
date: 2019-01-02 2:30:08
hidden: true
slug: sh9j5xeum38
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>Electron 是一个搭建跨平台桌面应用的框架，仅仅使用 JavaScript、HTML 以及 CSS，即可快速而容易地搭建一个原生应用。这对于想要涉及其他领域的开发者来说是一个非常大的福利。</p>
<h2 id="articleHeader1">项目介绍</h2>
<p>仓库地址：<a href="https://github.com/lin-xin/calculator" rel="nofollow noreferrer" target="_blank">lin-xin/calculator</a></p>
<p>我这里通过 Electron 实现了仿 iPhone 的计算器，通过菜单可以切换横屏和竖屏，横屏有更多的运算。而对于 JavaScript 进行浮点数计算来说，精度丢失是个很大问题，所以我这里使用了第三方库 math.js 来解决这个精度的问题。<br>尽可能的实现了跟 iPhone 一样的运算：</p>
<ul>
<li><p>1 + 2 × 3 = 7</p></li>
<li><p>3 += 6 (再按 = 等于 9)</p></li>
<li><p>0.1 + 0.2 = 0.3 (浮点数精度处理)</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010994892" src="https://static.alili.tech/img/remote/1460000010994892" alt="Image text" title="Image text" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010994893" src="https://static.alili.tech/img/remote/1460000010994893" alt="Image text" title="Image text" style="cursor: pointer; display: inline;"></span></p>
<p>不过我下面并不是要讲计算器，而是用到的 Electron 的知识点。</p>
<h2 id="articleHeader2">生命周期</h2>
<p>在主进程中通过 app 模块控制整个应用的生命周期。</p>
<p>当 Electron 完成初始化时触发 ready 事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.on('ready', () => {
    // 创建窗口、加载页面等操作
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.on(<span class="hljs-string">'ready'</span>, () =&gt; {
    <span class="hljs-comment">// 创建窗口、加载页面等操作</span>
})</code></pre>
<p>当所有的窗口都被关闭时会触发 window-all-closed 事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();     // 退出应用
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.on(<span class="hljs-string">'window-all-closed'</span>, () =&gt; {
    <span class="hljs-keyword">if</span>(process.platform !== <span class="hljs-string">'darwin'</span>){
        app.quit();     <span class="hljs-comment">// 退出应用</span>
    }
})</code></pre>
<p>在开发中发现，没有监听该事件，打包后的应用关闭后，进程还保留着，会占用系统的内存。</p>
<h2 id="articleHeader3">窗口</h2>
<p>本来我们的 html 只显示在浏览器中，而 electron 提供了一个 BrowserWindow 模块用于创建和控制浏览器窗口，我们的页面就是显示在这样的窗口中。</p>
<h3 id="articleHeader4">创建窗口</h3>
<p>通过关键字 new 实例化返回 win 对象，该对象有丰富的方法对窗口进行控制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="win = new BrowserWindow({
    width: 390,         // 窗口宽度
    height: 670,        // 窗口高度
    fullscreen: false,  // 不允许全屏
    resizable: false    // 不允许改变窗口size，不然布局就乱了啊
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">win = <span class="hljs-keyword">new</span> BrowserWindow({
    <span class="hljs-attr">width</span>: <span class="hljs-number">390</span>,         <span class="hljs-comment">// 窗口宽度</span>
    height: <span class="hljs-number">670</span>,        <span class="hljs-comment">// 窗口高度</span>
    fullscreen: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 不允许全屏</span>
    resizable: <span class="hljs-literal">false</span>    <span class="hljs-comment">// 不允许改变窗口size，不然布局就乱了啊</span>
});</code></pre>
<h3 id="articleHeader5">加载页面</h3>
<p>窗口创建完是一片空白的，可以通过 win.loadURL() 来加载要显示的页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const url = require('url');

win.loadURL(url.format({    // 加载本地的文件
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

win.loadURL(url.format({    <span class="hljs-comment">// 加载本地的文件</span>
    pathname: path.join(__dirname, <span class="hljs-string">'index.html'</span>),
    <span class="hljs-attr">protocol</span>: <span class="hljs-string">'file'</span>,
    <span class="hljs-attr">slashes</span>: <span class="hljs-literal">true</span>
}))</code></pre>
<p>也可以直接加载远程链接 win.loadURL('<a href="http://blog.gdfengshuo.com" rel="nofollow noreferrer" target="_blank">http://blog.gdfengshuo.com</a>');</p>
<h2 id="articleHeader6">菜单</h2>
<p>桌面应用菜单栏是最常见的功能。Electron 提供了 Menu 模块来创建原生的应用菜单和 context 菜单，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = [                              // 创建菜单模板
    {
        label: '查看',
        submenu: [
            {label: '竖屏', type: 'radio', checked: true},      // type 属性让菜单为 radio 可选
            {label: '横屏', type: 'radio', checked: false},
            {label: '重载',role:'reload'},
            {label: '退出',role:'quit'},
        ]
    }
]

const menu = Menu.buildFromTemplate(template);  // 通过模板返回菜单的数组
Menu.setApplicationMenu(menu);                  // 将该数组设置为菜单" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> template = [                              <span class="hljs-comment">// 创建菜单模板</span>
    {
        <span class="hljs-attr">label</span>: <span class="hljs-string">'查看'</span>,
        <span class="hljs-attr">submenu</span>: [
            {<span class="hljs-attr">label</span>: <span class="hljs-string">'竖屏'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'radio'</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">true</span>},      <span class="hljs-comment">// type 属性让菜单为 radio 可选</span>
            {<span class="hljs-attr">label</span>: <span class="hljs-string">'横屏'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'radio'</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">false</span>},
            {<span class="hljs-attr">label</span>: <span class="hljs-string">'重载'</span>,<span class="hljs-attr">role</span>:<span class="hljs-string">'reload'</span>},
            {<span class="hljs-attr">label</span>: <span class="hljs-string">'退出'</span>,<span class="hljs-attr">role</span>:<span class="hljs-string">'quit'</span>},
        ]
    }
]

<span class="hljs-keyword">const</span> menu = Menu.buildFromTemplate(template);  <span class="hljs-comment">// 通过模板返回菜单的数组</span>
Menu.setApplicationMenu(menu);                  <span class="hljs-comment">// 将该数组设置为菜单</span></code></pre>
<p>在子菜单中，通过点击竖屏或横屏来进行一些操作，那就可以给 submenu 监听 click 事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = [
    {
        label: '查看',
        submenu: [
            {
                label: '横屏'
                click: () => {              // 监听横屏的点击事件
                    win.setSize(670,460);   // 设置窗口的宽高
                }
            }
        ]
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> template = [
    {
        <span class="hljs-attr">label</span>: <span class="hljs-string">'查看'</span>,
        <span class="hljs-attr">submenu</span>: [
            {
                <span class="hljs-attr">label</span>: <span class="hljs-string">'横屏'</span>
                click: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {              <span class="hljs-comment">// 监听横屏的点击事件</span>
                    win.setSize(<span class="hljs-number">670</span>,<span class="hljs-number">460</span>);   <span class="hljs-comment">// 设置窗口的宽高</span>
                }
            }
        ]
    }
]</code></pre>
<h2 id="articleHeader7">主进程和渲染进程通信</h2>
<p>虽然点击横屏的时候，可以设置窗口的宽高，但是要如何去触发页面里的方法，这里就需要主进程跟渲染进程之间进行通信。</p>
<p>主进程，可以理解为 main.js 用来写 electron api 的就是主进程，渲染进程就是渲染出来的页面。</p>
<h3 id="articleHeader8">ipcMain</h3>
<p>在主进程中可以使用 ipcMain 模块，它控制着由渲染进程(web page)发送过来的异步或同步消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {ipcMain} = require('electron')
ipcMain.on('send-message', (event, arg) => {
    event.sender.send('reply-message', 'hello world')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {ipcMain} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
ipcMain.on(<span class="hljs-string">'send-message'</span>, (event, arg) =&gt; {
    event.sender.send(<span class="hljs-string">'reply-message'</span>, <span class="hljs-string">'hello world'</span>)
})</code></pre>
<p>ipcMain 监听 send-message 事件，当消息到达时可以调用 event.sender.send 来回复异步消息，向渲染进程发送 reply-message 事件，也可以带着参数发送过去。</p>
<h3 id="articleHeader9">ipcRenderer</h3>
<p>在渲染进程可以调用 ipcRenderer 模块向主进程发送同步或异步消息，也可以收到主进程的相应。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {ipcRenderer} = require('electron')
ipcRenderer.on('reply-message', (event, arg) => {
    console.log(arg);       // hello world
})

ipcRenderer.send('anything', 'hello everyone');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {ipcRenderer} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
ipcRenderer.on(<span class="hljs-string">'reply-message'</span>, (event, arg) =&gt; {
    <span class="hljs-built_in">console</span>.log(arg);       <span class="hljs-comment">// hello world</span>
})

ipcRenderer.send(<span class="hljs-string">'anything'</span>, <span class="hljs-string">'hello everyone'</span>);</code></pre>
<p>ipcRenderer 可以监听到来自主进程的 reply-message 事件并拿到参数进行操作，也可以使用 send() 方法向主进程发送消息。</p>
<h3 id="articleHeader10">webContents</h3>
<p>webContents 是一个事件发出者，它负责渲染并控制网页，也是 BrowserWindow 对象的属性。在 ipcMain 中的 event.sender，返回发送消息的 webContents 对象，所以包含着 send() 方法用于发送消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const win = BrowserWindow.fromId(1);        // fromId() 方法找到ID为1的窗口
win.webContents.on('todo', () => {
    win.webContents.send('done', 'well done!')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> win = BrowserWindow.fromId(<span class="hljs-number">1</span>);        <span class="hljs-comment">// fromId() 方法找到ID为1的窗口</span>
win.webContents.on(<span class="hljs-string">'todo'</span>, () =&gt; {
    win.webContents.send(<span class="hljs-string">'done'</span>, <span class="hljs-string">'well done!'</span>)
})</code></pre>
<h3 id="articleHeader11">remote</h3>
<p>remote 模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途径。在 Electron 中，有许多模块只存在主进程中，想要调用这些模块的方法需要通过 ipc 模块向主进程发送消息，让主进程调用这些方法。而使用 remote 模块，则可以在渲染进程中调用这些只存在于主进程对象的方法了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {remote} = require('electron')
const BrowserWindow = remote.BrowserWindow      // 访问主进程中的BrowserWindow模块

let win = new BrowserWindow();                  // 其他的跟主进程的操作都一样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {remote} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-keyword">const</span> BrowserWindow = remote.BrowserWindow      <span class="hljs-comment">// 访问主进程中的BrowserWindow模块</span>

<span class="hljs-keyword">let</span> win = <span class="hljs-keyword">new</span> BrowserWindow();                  <span class="hljs-comment">// 其他的跟主进程的操作都一样</span></code></pre>
<p>remote 模块除了可以访问主进程的内置模块，自身还有一些方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="remote.require(module)          // 返回在主进程中执行 require(module) 所返回的对象
remote.getCurrentWindow()       // 返回该网页所属的 BrowserWindow 对象
remote.getCurrentWebContents()  // 返回该网页的 WebContents 对象
remote.getGlobal(name)          // 返回在主进程中名为 name 的全局变量(即 global[name])
remote.process                  // 返回主进程中的 process 对象，等同于 remote.getGlobal('process') 但是有缓存" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">remote.require(<span class="hljs-built_in">module</span>)          <span class="hljs-comment">// 返回在主进程中执行 require(module) 所返回的对象</span>
remote.getCurrentWindow()       <span class="hljs-comment">// 返回该网页所属的 BrowserWindow 对象</span>
remote.getCurrentWebContents()  <span class="hljs-comment">// 返回该网页的 WebContents 对象</span>
remote.getGlobal(name)          <span class="hljs-comment">// 返回在主进程中名为 name 的全局变量(即 global[name])</span>
remote.process                  <span class="hljs-comment">// 返回主进程中的 process 对象，等同于 remote.getGlobal('process') 但是有缓存</span></code></pre>
<h2 id="articleHeader12">shell 模块</h2>
<p>使用系统默认应用管理文件和 URL，而且在主进程和渲染进程中都可以用到该模块。在菜单中，我想点击子菜单打开一个网站，那么就可以用到 shell.openExternal() 方法，则会在默认浏览器中打开 URL</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {shell} = require('electron');
shell.openExternal('https://github.com/lin-xin/calculator');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> {shell} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
shell.openExternal(<span class="hljs-string">'https://github.com/lin-xin/calculator'</span>);</code></pre>
<h2 id="articleHeader13">打包应用</h2>
<p>其实将程序打包成桌面应用才是比较麻烦的事。我这里尝试了 electron-packager 和 electron-builder。</p>
<h3 id="articleHeader14">electron-packager</h3>
<p>electron-packager 可以将项目打包成各平台可直接运行的程序，而不是安装包。</p>
<p>先使用 npm 安装： npm install electron-packager -S</p>
<p>运行打包命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron-packager ./ 计算器 --platform=win32 --overwrite --icon=./icon.ico" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">electron</span><span class="hljs-literal">-</span><span class="hljs-comment">packager</span> <span class="hljs-string">.</span><span class="hljs-comment">/</span> <span class="hljs-comment">计算器</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">platform=win32</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">overwrite</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">icon=</span><span class="hljs-string">.</span><span class="hljs-comment">/icon</span><span class="hljs-string">.</span><span class="hljs-comment">ico</span></code></pre>
<p>打包会把项目文件包括 node_modules 也一起打包进去，当然可以通过 --ignore=node_modules 来忽略文件，但是如果项目中有用到第三方库，忽略的话则找不到文件报错了。</p>
<p>正确的做法就是严格区分 dependencies 和 devDependencies，打包的时候只会把 dependencies 的库打包，而使用 cnpm 安装的会有一大堆 .0.xx@xxx 的文件，也会被打包，所以最好不要用 cnpm</p>
<h3 id="articleHeader15">electron-builder</h3>
<p>electron-builder 是基于 electron-packager 打包出来的程序再做安装处理，将项目打包成安装文件。</p>
<p>安装：npm install electron-builder -S</p>
<p>打包：electron-builder --win</p>
<p>打包过程中，第一次下载 electron 可能会出现连接超时，可以使用 yarn 试试。还有 winCodeSign 和 nsis-resources 也可能会失败，可以参考 <a href="https://github.com/electron-userland/electron-builder/issues/1859" rel="nofollow noreferrer" target="_blank">electron-builder/issues</a> 解决。</p>
<h2 id="articleHeader16">总结</h2>
<p>Electron 用起来还是相对容易的，可以创建个简单的桌面应用，只是打包的过程比较容易遇到问题，网上好像也有一键打包的工具，没尝试过。以上也都是基于 windows 7 的实践，毕竟没有 Mac 搞不了。</p>
<h3 id="articleHeader17">更多文章：<a href="http://blog.gdfengshuo.com" rel="nofollow noreferrer" target="_blank">linxin/blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron 实战桌面计算器应用

## 原文链接
[https://segmentfault.com/a/1190000010994887](https://segmentfault.com/a/1190000010994887)

