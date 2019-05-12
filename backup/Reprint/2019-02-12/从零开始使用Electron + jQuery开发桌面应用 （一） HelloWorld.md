---
title: '从零开始使用Electron + jQuery开发桌面应用 （一） HelloWorld' 
date: 2019-02-12 2:30:12
hidden: true
slug: 26hoe91sisv
categories: [reprint]
---

{{< raw >}}

                    
<p>写在前面：本人技术一般，此文章为本人边学边写而成，难免出现差错与技术方面不完美的情况，仅供参考。如有错误，欢迎指正。<br>能翻墙就尽量翻墙，国内网络你懂的<br>本文以Windows开发平台为基础写的，MAC用户仅供参考<br>（<a href="http://download.csdn.net/detail/lvyuanpeng/9487115" rel="nofollow noreferrer" target="_blank">electron中文API下载</a>）</p>
<h2 id="articleHeader0">1.首先安装<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node</a>
</h2>
<p>安装完成以后在cmd里运行 <code>node -v</code>检测安装是否成功。<br><span class="img-wrap"><img data-src="/img/bVusvQ" src="https://static.alili.tech/img/bVusvQ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.安装<a href="http://electron.atom.io/" rel="nofollow noreferrer" target="_blank">Electron</a>
</h2>
<p>使用npm 安装 Electron:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --g electron-prebuilt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--g electron-prebuilt</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVusDC" src="https://static.alili.tech/img/bVusDC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>安装完成后运行 <code>electron -v</code> 检查是否安装成功<br><span class="img-wrap"><img data-src="/img/bVusIz" src="https://static.alili.tech/img/bVusIz" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3.一个简单的Electron程序</h2>
<p>首先，切换到应用开发根目录，我的在<code>D:\LvAllCode\electron\MC</code><br><span class="img-wrap"><img data-src="/img/bVusBH" src="https://static.alili.tech/img/bVusBH" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>然后创建Electron简单文件结构<br>在根目录下使用<code>npm init</code>命令创建<code>package.json</code>文件，根据提示填写就行，<br>执行一次<code>npm install --save-dev electron-prebuilt</code><br>最后差不多是这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
  &quot;name&quot;: &quot;mclans&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;mc_login_app&quot;,
  &quot;main&quot;: &quot;app/main.js&quot;,
  &quot;dependencies&quot;: {
    &quot;electron-prebuilt&quot;: &quot;^0.37.3&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;electron-prebuilt&quot;: &quot;^0.37.3&quot;
  },
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;hello&quot;,
    &quot;start&quot;: &quot;electron .&quot;
  },
  &quot;author&quot;: &quot;yupeglv&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code> {
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"mclans"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"mc_login_app"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"app/main.js"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"electron-prebuilt"</span>: <span class="hljs-string">"^0.37.3"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"electron-prebuilt"</span>: <span class="hljs-string">"^0.37.3"</span>
  },
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"electron ."</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"yupeglv"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}
</code></pre>
<p>然后在根目录下创建<code>app</code>文件夹，在<code>app/</code>下创建main.js,内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 应用控制模块
var app = require(&quot;app&quot;)

// 创建窗口模块
var BrowserWindow = require('browser-window'),

// 主窗口
var mainWindow = null;

// 初始化并准备创建主窗口
app.on('ready', function () {
    // 创建一个宽800px 高700px的窗口
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
    });
    // 载入应用的inde.html
    mainWindow.loadUrl('file://' + __dirname + '/html/index.html');
    // 打开开发工具界面
    mainWindow.openDevTools();
    // 窗口关闭时触发
    mainWindow.on('closed', function(){
        // 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除想对应的元素
        mainWindow = null            
    });    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 应用控制模块</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">"app"</span>)

<span class="hljs-comment">// 创建窗口模块</span>
<span class="hljs-keyword">var</span> BrowserWindow = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-window'</span>),

<span class="hljs-comment">// 主窗口</span>
<span class="hljs-keyword">var</span> mainWindow = <span class="hljs-literal">null</span>;

<span class="hljs-comment">// 初始化并准备创建主窗口</span>
app.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 创建一个宽800px 高700px的窗口</span>
    mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({
        <span class="hljs-attr">width</span>: <span class="hljs-number">800</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">700</span>,
    });
    <span class="hljs-comment">// 载入应用的inde.html</span>
    mainWindow.loadUrl(<span class="hljs-string">'file://'</span> + __dirname + <span class="hljs-string">'/html/index.html'</span>);
    <span class="hljs-comment">// 打开开发工具界面</span>
    mainWindow.openDevTools();
    <span class="hljs-comment">// 窗口关闭时触发</span>
    mainWindow.on(<span class="hljs-string">'closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除想对应的元素</span>
        mainWindow = <span class="hljs-literal">null</span>            
    });    
});</code></pre>
<p>然后在<code>app/html</code>下创建index.html文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
    <meta charset=&quot;utf-8&quot; /> 
    <title>我的世界</title>
</head>
<body>
    <span style=&quot;color:#fff;&quot;>Hello World</span>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>我的世界<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:#fff;"</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>最后，项目整体文件目录大概是这个样子的：</p>
<p><span class="img-wrap"><img data-src="/img/bVutZ8" src="https://static.alili.tech/img/bVutZ8" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">4.启动你的项目</h2>
<p>在根目录下，命令行输入 <code>npm start</code>(需要在<code>package.json</code>中配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {&quot;start&quot;: &quot;electron .&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"scripts"</span>: {<span class="hljs-string">"start"</span>: <span class="hljs-string">"electron ."</span>}</code></pre>
<p>)或者输入 <code>electron .</code>(注意有个点，并且electron装的是全局的) <br><span class="img-wrap"><img data-src="/img/bVut2D" src="https://static.alili.tech/img/bVut2D" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">5.配置<a href="https://www.visualstudio.com/en-us/products/code-vs.aspx" rel="nofollow noreferrer" target="_blank">VS Code</a>开发环境</h2>
<p>先装全局<code>glup</code>：<code>npm install gulp -g</code><br>再装本地：<code>npm install --save-dev gulp</code><br>至于为啥<a href="https://www.zhihu.com/question/36023122/answer/65611814" rel="nofollow noreferrer" target="_blank">看这</a><br><span class="img-wrap"><img data-src="/img/bVuubf" src="https://static.alili.tech/img/bVuubf" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>根目录下创建<code>gulpfile.js</code>配置文件,内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取依赖
var gulp = require('gulp'),
    childProcess = require('child_process'),
    electron = require('electron-prebuilt');
    
// 创建 gulp 任务
gulp.task('run', function () {
    childProcess.spawn(electron, ['.'], {stdio:'inherit'});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 获取依赖</span>
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>),
    childProcess = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>),
    electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron-prebuilt'</span>);
    
<span class="hljs-comment">// 创建 gulp 任务</span>
gulp.task(<span class="hljs-string">'run'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    childProcess.spawn(electron, [<span class="hljs-string">'.'</span>], {<span class="hljs-attr">stdio</span>:<span class="hljs-string">'inherit'</span>});
});</code></pre>
<p>运行<code>gulp</code>任务：<code>gulp run</code></p>
<p><span class="img-wrap"><img data-src="/img/bVuua2" src="https://static.alili.tech/img/bVuua2" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>又看到了熟悉的界面了！！</p>
<p>在VS Code里打开你的工程：</p>
<p><span class="img-wrap"><img data-src="/img/bVuubO" src="https://static.alili.tech/img/bVuubO" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>摁下快捷键<code>ctrl+shift+b</code>,第一次启动的时候会提示你配置<code>task</code>文件，点击<code>Configure Task Runner</code></p>
<p><span class="img-wrap"><img data-src="/img/bVuucS" src="https://static.alili.tech/img/bVuucS" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>之后VS Code会自动在<code>./.vscode</code>目录下创建一个<code>tasks.json</code>配置文件，我们来编辑一下这个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.1.0&quot;,
    &quot;command&quot;: &quot;gulp&quot;,
    &quot;isShellCommand&quot;: true,
    &quot;args&quot;: [
        &quot;--no-color&quot;
    ],
    &quot;tasks&quot;: [ { 
      &quot;taskName&quot;: &quot;run&quot;, 
      &quot;args&quot;: [], 
      &quot;isBuildCommand&quot;: true 
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
    <span class="hljs-attr">"command"</span>: <span class="hljs-string">"gulp"</span>,
    <span class="hljs-attr">"isShellCommand"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"args"</span>: [
        <span class="hljs-string">"--no-color"</span>
    ],
    <span class="hljs-attr">"tasks"</span>: [ { 
      <span class="hljs-attr">"taskName"</span>: <span class="hljs-string">"run"</span>, 
      <span class="hljs-attr">"args"</span>: [], 
      <span class="hljs-attr">"isBuildCommand"</span>: <span class="hljs-literal">true</span> 
    }]
}</code></pre>
<p>保存，之后再摁下<code>ctrl+shift+b</code>就可以直接运行我们的程序了。</p>
<h2 id="articleHeader5">6.使用VS Code调试</h2>
<p>（此部分仅供参考，因为我自己没跑成功o(&gt;﹏&lt;)o，如有知道为什么的还请大神告知）<br>点击<code>DEBUG</code>界面的设置按钮<br><span class="img-wrap"><img data-src="/img/bVuuhw" src="https://static.alili.tech/img/bVuuhw" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>VS Code自动在<code>./.vscode</code>目录下创建了<code>launch.json</code> <br>我们不需要启动 <code>main.js</code> 的配置 所以移除它，现在<code>launch.json</code> 应该如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;name&quot;: &quot;Attach&quot;,
            &quot;type&quot;: &quot;node&quot;,
            &quot;request&quot;: &quot;attach&quot;,
            &quot;port&quot;: 5858,
            &quot;address&quot;: &quot;localhost&quot;,
            &quot;restart&quot;: false,
            &quot;sourceMaps&quot;: false,
            &quot;outDir&quot;: null,
            &quot;localRoot&quot;: &quot;${workspaceRoot}&quot;,
            &quot;remoteRoot&quot;: null
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
    <span class="hljs-attr">"configurations"</span>: [
        {
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Attach"</span>,
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-attr">"request"</span>: <span class="hljs-string">"attach"</span>,
            <span class="hljs-attr">"port"</span>: <span class="hljs-number">5858</span>,
            <span class="hljs-attr">"address"</span>: <span class="hljs-string">"localhost"</span>,
            <span class="hljs-attr">"restart"</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">"sourceMaps"</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">"outDir"</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">"localRoot"</span>: <span class="hljs-string">"${workspaceRoot}"</span>,
            <span class="hljs-attr">"remoteRoot"</span>: <span class="hljs-literal">null</span>
        }
    ]
}</code></pre>
<p>更改之前创建的 <code>gulpfile.js</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('run', function () {
    childProcess.spawn(electron, ['--debug=5858','.'], {stdio:'inherit'});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'run'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    childProcess.spawn(electron, [<span class="hljs-string">'--debug=5858'</span>,<span class="hljs-string">'.'</span>], {stdio:<span class="hljs-string">'inherit'</span>});
});</code></pre>
<p>在调试面板中选择<code>Attach</code> 然后点击<code>RUN</code>按钮即可开始调试。</p>
<p><strong>至此我们的第一个Electron程序就开发完成了，<a href="https://segmentfault.com/a/1190000004863646">下一节</a>我们看如何打包成执行程序</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始使用Electron + jQuery开发桌面应用 （一） HelloWorld

## 原文链接
[https://segmentfault.com/a/1190000004843033](https://segmentfault.com/a/1190000004843033)

