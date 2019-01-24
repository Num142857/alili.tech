---
title: '使用create-react-app构建Electron应用' 
date: 2019-01-25 2:30:23
hidden: true
slug: lftzksxt537
categories: [reprint]
---

{{< raw >}}

            <p><a href="https://medium.freecodecamp.org/@csepulv?source=post_header_lockup"><img src="http://p0.qhimg.com/t01c483569343e2b96b.png" alt="转到Christian Sepulveda的简介"></a></p>
<p><a href="https://medium.freecodecamp.org/@csepulv?source=post_header_lockup">Christian Sepulveda</a>浓咖啡狂热爱好者，程序员，Bastille Network 首席技术执行官，前Pivotal实验室主管。 justideas.io 1月11</p>
<hr>
<h1>如何使用create-react-app构建Electron应用程序 无需webpack配置或“ejecting”</h1>
<p><img src="http://p0.qhimg.com/t0113507067562aea67.jpg" alt=""></p>
<p>我最近使用<a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>创建了一个<a href="http://electron.atom.io/">Electron</a>应用程序_。_无需使用Webpack，或者“eject”我的应用程序。接下来我将告诉你我是如何做到的</p>
<p>我之前就有过使用<a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>的想法，因为它隐藏了webpack的配置细节。但是目前我搜不到Electron搭配create-react-app使用的教程，所以我只好自己动手弄明白了。</p>
<p>如果你已经饥渴难耐了，你可以直接看我的代码。这是我的app的<a href="https://github.com/csepulv/electron-with-create-react-app">GitHub地址</a>。</p>
<p>在我们开始之前，我先介绍下Electron和React，以及为什么create-react-app这么吊。</p>
<h3>Electron 与 React</h3>
<p>React是Facebook出品的JavaScript视图框架。</p>
<p><a href="https://facebook.github.io/react/&quot;https://facebook.github.io /react/&quot;"><strong> <em>用于构建用户界面的JavaScript库</em>  -  React </strong>
用于构建用户界面的JavaScript库. facebook.github.io</a><a href="https://facebook.github.io/react/"></a></p>
<p>Electron是GitHub的框架，能通过JavaScript构建跨平台桌面应用程序。</p>
<p><a href="http://electron.atom.io/" title="http://electron.atom.io/"><strong>Electron</strong>
_Build cross platform desktop apps with JavaScript, HTML, and CSS._electron.atom.io</a><a href="http://electron.atom.io/"></a></p>
<p>大多数使用<a href="https://webpack.github.io/">webpack</a>来进行React开发所需的配置。 webpack是一个配置和构建工具，而之前大多数React社区采用了诸如<a href="http://gulpjs.com/">Gulp</a>和<a href="http://gruntjs.com">Grunt</a>等方案。</p>
<p>不同的配置的开销有所不同（稍后会有更多介绍），并且有许多样板和应用程序生成器可用，但2016年7月<a href="https://github.com/facebookincubator">Facebook Incubator</a>发布了一个工具<a href="https://github.com/facebookincubator/create-react-app">create-react-app </a>_._它隐藏了大部分的配置细节，并让开发者使用简单的命令，比如<code>npm start</code>或<code>npm run build</code>来运行或建立他们的应用。</p>
<h4>什么是ejecting，你为什么要避免它？</h4>
<p>create-react-app对一个典型的React项目配置做了一些假设。如果这些假设不适合你，可以选择 <a href="https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup"><strong>eject</strong></a>你的应用(<code>npm run eject</code>)。这样它会复制所有的create-react-app封装好的配置到你的项目中，提供可以随意更改的样板配置。</p>
<p>但是这是<em>单程旅途</em>。您无法撤消ejecting并返回。截至这篇文章发布(2017.1.11)create-react-app，已经有49个realease，每一个版本都有所改进。但是对于ejected的应用程序，您将不得不放弃这些改进或自己想办法解决。</p>
<p>ejected的配置超过550行跨越7个文件（截至本文发布）。我完全看不懂这些配置（额，应该是大部分看不懂），我也不想弄懂。</p>
<h4>目标</h4>
<p>我的目标很简单：</p>
<ul>
<li><p>避免ejecting  React应用程序</p>
</li>
<li><p>用最简单的手段，使React和Electron一起工作</p>
</li>
<li><p>保留Electron和create-react-app/React的默认配置，假设和约定（这可以很简单地使用其他需要这种环境的工具）。</p>
</li>
</ul>
<h4>基本步骤</h4>
<ol>
<li><p>运行<code>create-react-app</code>来生成一个基本的React应用程序</p>
</li>
<li><p>运行<code>npm install --save-dev electron</code></p>
</li>
<li><p>将<code>[electron-quick-start](https://github.com/electron/electron-quick-start)</code>中的<code>main.js</code>复制过来（为了清晰起见，我们将其重命名为<code>electron-starter.js</code> ）</p>
</li>
<li><p>修改<code>mainWindow.loadURL</code>的参数（在<code>electron-starter.js</code>）改为<code>localhost:3000</code>（webpack-dev-server）</p>
</li>
<li><p>将<code>package.json</code>的main改为<code>electron-starter.js</code></p>
</li>
<li><p>添加一个用于启动Electron的run target到 <code>package.json</code></p>
</li>
<li><p>分别运行<code>npm run electron</code>和<code>npm start</code></p>
</li>
</ol>
<p>步骤1和2非常简单。以下是步骤3和4的代码：</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-comment">// Module to control application life.</span>
<span class="hljs-keyword">const</span> app = electron.app;
<span class="hljs-comment">// Module to create native browser window.</span>
<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow;

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

<span class="hljs-comment">// Keep a global reference of the window object, if you don't, the window will</span>
<span class="hljs-comment">// be closed automatically when the JavaScript object is garbage collected.</span>
<span class="hljs-keyword">let</span> mainWindow;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWindow</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Create the browser window.</span>
    mainWindow = <span class="hljs-keyword">new</span> BrowserWindow({<span class="hljs-attribute">width</span>: <span class="hljs-number">800</span>, <span class="hljs-attribute">height</span>: <span class="hljs-number">600</span>});

    <span class="hljs-comment">// and load the index.html of the app.</span>
    mainWindow.loadURL(<span class="hljs-string">'http://localhost:3000'</span>);

    <span class="hljs-comment">// Open the DevTools.</span>
    mainWindow.webContents.openDevTools();

    <span class="hljs-comment">// Emitted when the window is closed.</span>
    mainWindow.on(<span class="hljs-string">'closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// Dereference the window object, usually you would store windows</span>
        <span class="hljs-comment">// in an array if your app supports multi windows, this is the time</span>
        <span class="hljs-comment">// when you should delete the corresponding element.</span>
        mainWindow = <span class="hljs-literal">null</span>
    })
}

<span class="hljs-comment">// This method will be called when Electron has finished</span>
<span class="hljs-comment">// initialization and is ready to create browser windows.</span>
<span class="hljs-comment">// Some APIs can only be used after this event occurs.</span>
app.on(<span class="hljs-string">'ready'</span>, createWindow);

<span class="hljs-comment">// Quit when all windows are closed.</span>
app.on(<span class="hljs-string">'window-all-closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// On OS X it is common for applications and their menu bar</span>
    <span class="hljs-comment">// to stay active until the user quits explicitly with Cmd + Q</span>
    <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'darwin'</span>) {
        app.quit()
    }
});

app.on(<span class="hljs-string">'activate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// On OS X it's common to re-create a window in the app when the</span>
    <span class="hljs-comment">// dock icon is clicked and there are no other windows open.</span>
    <span class="hljs-keyword">if</span> (mainWindow === <span class="hljs-literal">null</span>) {
        createWindow()
    }
});

<span class="hljs-comment">// In this file you can include the rest of your app's specific main process</span>
<span class="hljs-comment">// code. You can also put them in separate files and require them here.</span>

</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-electron-starter-js">Gist</a>)</p>
<p>第五步和第六步</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"electron-with-create-react-app"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"electron"</span>: <span class="hljs-string">"^1.4.14"</span>,
    <span class="hljs-attr">"react-scripts"</span>: <span class="hljs-string">"0.8.5"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"react"</span>: <span class="hljs-string">"^15.4.2"</span>,
    <span class="hljs-attr">"react-dom"</span>: <span class="hljs-string">"^15.4.2"</span>
  },
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"src/electron-starter.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"react-scripts start"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"react-scripts build"</span>,
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"react-scripts test --env=jsdom"</span>,
    <span class="hljs-attr">"eject"</span>: <span class="hljs-string">"react-scripts eject"</span>,
    <span class="hljs-attr">"electron"</span>: <span class="hljs-string">"electron ."</span>
  }
}

</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-package-json">Gist</a>)</p>
<p>当你在步骤7中运行npm命令时，你应该看到：</p>
<p><img src="http://p0.qhimg.com/t01719eec81ff269f50.jpg" alt=""></p>
<p>您可以对React代码进行实时更改，并且可以在运行的Electron应用程序中看到结果。</p>
<p><img src="http://p0.qhimg.com/t018ae17a761a692e65.jpg" alt=""></p>
<p>这对于开发模式没问题，但有两个缺点：</p>
<ul>
<li><p>生成模式中不会使用<code>webpack-dev-server</code>。它需要使用构建好的React项目的静态文件</p>
</li>
<li><p>（笑）要用两个npm命令,真麻烦</p>
</li>
</ul>
<h4>在生成模式和开发模式中指定loadURL</h4>
<p>在开发模式，我们可以通过一个环境变量指定<code>mainWindow.loadURL</code>（在<code>electron-starter.js</code>中）。如果这个变量被设置了，我们将使用它;否则我们将使用生产静态HTML文件。</p>
<p>我们将添加一个npm run target（到<code>package.json</code>），如下所示：</p>
<pre><code class="hljs 1c"><span class="hljs-string">"electron-dev"</span>: <span class="hljs-string">"ELECTRON_START_URL=http://localhost:3000 electron ."</span>

</code></pre><p>更新：Windows用户将需要执行以下操作: (thanks to <a href="http://twitter.com/bfarmilo" title="Twitter profile for @bfarmilo">@bfarmilo</a>)</p>
<pre><code class="hljs 1c"><span class="hljs-string">"electron-dev"</span>: <span class="hljs-string">"set ELECTRON_START_URL=http://localhost:3000 &amp;&amp; electron ."</span>

</code></pre><p>下面是我们将要修改的<code>mainWindow.loadURL</code>(在<code>electron-starter.js</code>中)：</p>
<pre><code class="hljs sqf">const startUrl = process.env.ELECTRON_START_URL || url.<span class="hljs-built_in">format</span>({
            pathname: path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">'/../build/index.html'</span>),
            protocol: <span class="hljs-string">'file:'</span>,
            slashes: <span class="hljs-literal">true</span>
        });
    mainWindow.loadURL(startUrl);

</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-electron-starter-use-env-var-js">Gist</a>)</p>
<p>有一个问题：<code>create-react-app</code>（默认）构建一个使用绝对路径的<code>index.html</code>。在Electron中加载时会失败。谢天谢地，有一个配置选项可以解决这个问题：在<code>package.json</code>中设置一个<code>homepage</code>属性。 （有关该属性的Facebook文档是<a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md">here</a>.）</p>
<p>所以我们可以把这个属性设置为当前目录，<code>npm run build</code>将把它用作相对路径。</p>
<pre><code class="hljs 1c"><span class="hljs-string">"homepage"</span>: <span class="hljs-string">"./"</span>,

</code></pre><h4>用Foreman管理React和Electron进程</h4>
<p>为了方便起见，我不想</p>
<ol>
<li><p>同时启动/管理React devserver和Electron进程（我只想处理一个）</p>
</li>
<li><p>等待React devserver启动，然后启动Electron</p>
</li>
</ol>
<p><a href="https://github.com/strongloop/node-foreman">Foremen</a>是一个很好的进程管理工具。我们可以利用它，</p>
<pre><code class="hljs q">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> foreman

</code></pre><p>并添加以下<code>Procfile</code></p>
<pre><code class="hljs dockerfile">react: npm start
electron: npm <span class="hljs-keyword">run</span><span class="bash"> electron
</span>
</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-procfile-initial-js">Gist</a>)</p>
<p>现在第一步搞定了。对于第二步，我们可以添加一个简单的节点node脚本（<code>electron-wait-react.js</code>）它可以在React devserver启动后启动Electron。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
<span class="hljs-keyword">const</span> port = process.env.PORT ? (process.env.PORT - <span class="hljs-number">100</span>) : <span class="hljs-number">3000</span>;

process.env.ELECTRON_START_URL = <span class="hljs-string">`http://localhost:<span class="hljs-subst">${port}</span>`</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> net.Socket();

<span class="hljs-keyword">let</span> startedElectron = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> tryConnection = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> client.connect({port: port}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        client.end();
        <span class="hljs-keyword">if</span>(!startedElectron) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'starting electron'</span>);
            startedElectron = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">const</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec;
            exec(<span class="hljs-string">'npm run electron'</span>);
        }
    }
);

tryConnection();

client.on(<span class="hljs-string">'error'</span>, <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    setTimeout(tryConnection, <span class="hljs-number">1000</span>);
});

</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-electron-wait-react-js">Gist</a>)</p>
<blockquote>
<p>注意：Foreman会将端口号偏移100。  (See <a href="https://github.com/strongloop/node-foreman#advanced-usage">here</a>.) ,因此，<code>electron-wait-react.js</code>减去100，以正确设置 React devserver的端口号。</p>
</blockquote>
<p>现在修改<code>Procfile</code></p>
<pre><code class="hljs crmsh">react: npm <span class="hljs-literal">start</span>
electron: <span class="hljs-keyword">node</span> <span class="hljs-title">src</span>/electron-wait-react

</code></pre><p>(<a href="https://gist.github.com/csepulv/d4a97eaf9438cb4f7f102a1b2d075b93#file-profile-final-js">Gist</a>)</p>
<p>最后，我们将改变<code>package.json</code>中的run targets来替换<code>electron-dev</code>：</p>
<pre><code class="hljs 1c"><span class="hljs-string">"dev"</span> : <span class="hljs-string">"nf start"</span>

</code></pre><p>而现在，我们可以执行：</p>
<pre><code class="hljs dockerfile">npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
</code></pre><blockquote>
<p>更新（1/25/17）：我已经添加了以下部分以回应用户的一些评论(<a href="https://medium.com/@luke_schmuke/hey-there-a84bcaf41f17#.szbo7b33n">here</a> and <a href="https://medium.com/@bfarmilo/hi-again-christian-f2601fb40e03#.5sj6cpnih">here</a>). 他们需要从应用程序内部访问 Electron ，而简单的require 或 import则会引发错误。下面是我发现的一个解决方案</p>
</blockquote>
<h4>从React App访问Electron</h4>
<p>一个Electron应用程序有两个主要的进程： Electron host/wrapper和你的应用程序。在某些情况下，您希望从您的应用程序中访问Electron。例如，您可能想访问本地文件系统或使用Electron的<a href="http://electron.atom.io/docs/api/ipc-renderer/">ipcRenderer</a>。但是，如果你这样做，你会得到一个错误</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-comment">//or</span>
<span class="hljs-keyword">import</span> electron <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>;

</code></pre><p>在各种GitHub和Stack Overflow问题中，有一些关于这个错误的讨论，例如<a href="https://github.com/electron/electron/issues/7300">one</a>。大多数解决方案都会提出webpack配置更改，但这需要eject应用程序。</p>
<p>但是，有一个简单的解决方法/破解。</p>
<pre><code class="hljs livescript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">window</span>.<span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);

</code></pre><pre><code class="hljs ebnf"><span class="hljs-attribute">const fs</span> = electron.remote.require(<span class="hljs-string">'fs'</span>);
<span class="hljs-attribute">const ipcRenderer</span>  = electron.ipcRenderer;

</code></pre><h4>总结</h4>
<p>为了方便起见，下面是一个<a href="https://github.com/csepulv/electron-with-create-react-app">GitHub 仓库</a>，其中包含上述所有更改，每个步骤都有标签。但是，在那里使用create-react-app引导一个Electron应用程序没有太多的工作。 （这篇文章比代码长得多，你需要将这两篇文章进行整合。）</p>
<p>如果你正在使用create-react-app，你可能想看看我的文章，<a href="https://medium.com/justideas-io/debugging-tests-in-webstorm-and-create-react-app-b38f389ae7c8#.4qb90t1f1">在WebStorm中调试测试和create-react-app</a>.</p>
<p>谢谢阅读。您可以在<a href="https://justideas.io">justideas.io</a>查看更多我的帖子。</p>
<blockquote>
<p>更新（2/2/17）。一位读者<a href="https://github.com/vcarl">Carl Vitullo</a>建议使用<code>npm start</code>而不是<code>npm run dev</code>，并在GitHub上提交一个包含更改的pull请求。这些调整在这<a href="https://github.com/csepulv/electron-with-create-react-app/tree/npm-start">branch</a>。</p>
</blockquote>
<ul>
<li><p><a href="https://medium.freecodecamp.org/tagged/javascript?source=post">JavaScript</a></p>
</li>
<li><p><a href="https://medium.freecodecamp.org/tagged/react?source=post">React</a></p>
</li>
<li><p><a href="https://medium.freecodecamp.org/tagged/electron?source=post">Electron</a></p>
</li>
<li><p><a href="https://medium.freecodecamp.org/tagged/software-development?source=post">Software Development</a></p>
</li>
<li><p><a href="https://medium.freecodecamp.org/tagged/programming?source=post">Programming</a></p>
</li>
</ul>
<p>Show your support</p>
<p>Clapping shows how much you appreciated Christian Sepulveda’s story.</p>
<p>64422*   BlockedUnblockFollowFollowing</p>
<p><a href="https://medium.freecodecamp.org/@csepulv?source=footer_card" title="Go to the profile of Christian Sepulveda"><img src="http://p0.qhimg.com/t01c483569343e2b96b.png" alt="转到Christian Sepulveda的简介"></a></p>
<h3><a href="https://medium.freecodecamp.org/@csepulv" title="Go to the profile of Christian Sepulveda">Christian Sepulveda</a></h3>
<p>espresso fanatic, coder (still), VP Engineering Bastille, former Pivotal Labs exec. justideas.io</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用create-react-app构建Electron应用

## 原文链接
[https://www.zcfy.cc/article/building-an-electron-application-with-create-react-app](https://www.zcfy.cc/article/building-an-electron-application-with-create-react-app)

