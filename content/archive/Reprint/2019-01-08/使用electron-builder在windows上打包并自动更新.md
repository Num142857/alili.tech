---
title: '使用electron-builder在windows上打包并自动更新' 
date: 2019-01-08 2:30:10
hidden: true
slug: 68kfkipnrda
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">使用electron-builder在windows上打包并自动更新</h2>
<hr>
<blockquote>
<p>心得：从一个小白开始独自一人了解electron这个玩具，实现其打包到自动更新，查阅各种资料，做了各种尝试，现在将自己经历过的一些东西写下来，供参考！</p>
<blockquote>注意：文章适合了解electron是什么，知道如何简单打包的读者，文章中代码只是一种思路参考，并不完整，不能直接使用。</blockquote>
</blockquote>
<h3 id="articleHeader1">打包</h3>
<blockquote>尝试过用electron-packager和electron-builder打包，最终选择了electron-builder，原因后面会说；<p>关于网络，在使用electron-packager或者electron-builder打包的过程中，可能会下载electron包以及其它依赖，有些包和依赖可能服务器在国外，会很慢，所以需要设置代理，electron可以通过设置淘宝镜像快速下载<code>ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"</code>（windows下通过set设置该参数）；</p>
<p>这有个有趣的事情，我通过代理下载的时候有个叫codeSign的包怎么都下不下来，总是提示timeout，后来我用笔记本连接手机热点，手机开启shadowsocks代理，通过蜂窝网络这种方式居然下载下来了，遇到类似问题都可以尝试；</p>
</blockquote>
<h4>electron-packager</h4>
<p>简单用法：</p>
<blockquote>具体用法参考官网：<a href="https://github.com/electron-userland/electron-packager" rel="nofollow noreferrer" target="_blank">electron-packger</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;package&quot;: &quot;electron-packager ./ --overwrite -all&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"package"</span>: <span class="hljs-string">"electron-packager ./ --overwrite -all"</span>
}</code></pre>
<blockquote>
<p>注意事项：<br></p>
<ol>
<li>直接这么打包会将node_modules文件夹全部打包进去，包会很大，需要自行进行忽略某些文件或者文件夹，因为作者使用webpack将代码打包，所以我是在webpack打包好的文件夹，独立建立了一个package.json文件，将需要的包和文件放进去，在该文件夹下打包；<br>
</li>
<li>注意 package.json 的额外字段 —— productName、author 和 description，虽然这几个字段并不是打包必备的，但它们会在 Windows 的 Squirrel 安装包（用于自动更新，后面会说）中使用到。</li>
</ol>
</blockquote>
<p>特点：</p>
<ol>
<li>在macOS系统下，打的包是app文件（也就是平常通过dmg文件安装后的应用程序，拖到应用程序能直接使用），不能直接打包dmg文件；（不记得能不能打windows的包了，网上参考资料说不能打windows包）；</li>
<li>在windows系统下，能打包免安装的包，类似于我们网上下载绿色版软件，直接点击exe文件就运行软件；不能直接打包exe安装文件；（能否打app文件自行探索，蛤）</li>
<li>在自动更新的时候支持electron自带的<code>autoUpdater</code>和<code>squirrel</code>的方式（squirrel在windows下需要自己安装某些文件）；</li>
</ol>
<h4>electron-builder</h4>
<p>简单用法：</p>
<blockquote>具体用法参考官网：<a href="https://github.com/electron-userland/electron-builder" rel="nofollow noreferrer" target="_blank">electron-builder</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: {
    &quot;appId&quot;: &quot;com.xxx.app&quot;,
    &quot;mac&quot;: {
      &quot;target&quot;: [&quot;dmg&quot;,&quot;zip&quot;]
    },
    &quot;win&quot;: {
      &quot;target&quot;: [&quot;nsis&quot;,&quot;zip&quot;]
    }
},
&quot;scripts&quot;: {
    &quot;dist&quot;: &quot;electron-builder -wm&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"build"</span>: {
    <span class="hljs-string">"appId"</span>: <span class="hljs-string">"com.xxx.app"</span>,
    <span class="hljs-string">"mac"</span>: {
      <span class="hljs-string">"target"</span>: [<span class="hljs-string">"dmg"</span>,<span class="hljs-string">"zip"</span>]
    },
    <span class="hljs-string">"win"</span>: {
      <span class="hljs-string">"target"</span>: [<span class="hljs-string">"nsis"</span>,<span class="hljs-string">"zip"</span>]
    }
},
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dist"</span>: <span class="hljs-string">"electron-builder -wm"</span>
},</code></pre>
<blockquote>注意事项：参考electron-packager</blockquote>
<p>特点：</p>
<ol>
<li>在macOS系统和windows系统都可以到dmg和exe安装文件；</li>
<li>windows可以使用nsis打包安装文件，具体配置可以参考官网相关配置；</li>
<li>几乎支持了所有平台的所有格式；</li>
<li>自动更新的时候，不支持<code>squirrel.Windows</code>的方式，并且不使用electron自带的<code>autoUpdater</code>，需要使用 <code>electron-updater</code>包；</li>
</ol>
<h3 id="articleHeader2">自动更新（windows下）</h3>
<blockquote>这边不详细描述mac下的自动更新，因为mac下无论哪种方法都需要为应用执行（Code-signing）这是squirrel.Mac必要条件，由于没有mac下的需要，所以需要的自行查阅资料（我不会告诉你是因为mac的开发者账号贵，没钱，蛤蛤蛤）；自动更新这里提供两个参考，作者也是一开始参考的这两个网页（非常详细）：<br>
</blockquote>
<ol>
<li><a href="https://segmentfault.com/a/1190000007616641">Electron 自动更新的完整教程（Windows 和 OSX）</a></li>
<li><a href="https://segmentfault.com/a/1190000008287730" target="_blank">electron在windows系统下实现自动更新</a></li>
</ol>
<h4>方法一：使用electron-packager配合grunt-electron-installer</h4>
<ul>
<li>步骤一：使用electron-packager打包应用，打包出一个免安装包，确认可以执行应用；</li>
<li>步骤二：<br>
</li>
</ul>
<p>安装electron-squirrel-startup：(用于生成应用快捷方式)<br><br><code>npm install electron-squirrel-startup</code> <br><br>==========================华丽的分割线=============================<br><br>（<strong>使用grunt的作用是可以简单理解为将electron-packager打的包，再次打包生成安装文件exe，并且添加关于自动更新的文件，例如：RELEASES文件，setup程序等</strong>）<br><br>安装 grunt-electron-installer：(使用grunt打包，配合squirrel实现自动更新)<br><br><code>npm install -g grunt-cli</code> <br><br><code>npm install grunt grunt-electron-installer --save-dev</code> <br></p>
<ul><li>步骤三： <br>
</li></ul>
<p>在项目根目录下建Gruntfile.js（直接使用package.js中关于version等的配置就好了，不需要gruntPackage.json文件了）<br><br>参考：<a href="https://github.com/electron-archive/grunt-electron-installer" rel="nofollow noreferrer" target="_blank">grunt-electron-installer</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var grunt=require('grunt');

//配置
grunt.config.init({
    pkg: grunt.file.readJSON('./package.json'),
    'create-windows-installer': {
        x64:{
            authors:'xxxx',
            projectUrl:'',
            appDirectory:'./OutApp/Client-win32-x64',//要打包的输入目录
            outputDirectory:'./OutPut',//grunt打包后的输出目录
            exe:'Client.exe',
            description:'Client',
            setupIcon:&quot;xxxx.ico&quot;,
            noMsi:true
        }
    }
});

//加载任务
grunt.loadNpmTasks('grunt-electron-installer');

//设置为默认
grunt.registerTask('default', ['create-windows-installer']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var grunt=require(<span class="hljs-string">'grunt'</span>);

<span class="hljs-comment">//配置</span>
grunt.config.init({
    pkg: grunt.<span class="hljs-keyword">file</span>.readJSON(<span class="hljs-string">'./package.json'</span>),
    <span class="hljs-string">'create-windows-installer'</span>: {
        x64:{
            authors:<span class="hljs-string">'xxxx'</span>,
            projectUrl:<span class="hljs-string">''</span>,
            appDirectory:<span class="hljs-string">'./OutApp/Client-win32-x64'</span>,<span class="hljs-comment">//要打包的输入目录</span>
            outputDirectory:<span class="hljs-string">'./OutPut'</span>,<span class="hljs-comment">//grunt打包后的输出目录</span>
            exe:<span class="hljs-string">'Client.exe'</span>,
            <span class="hljs-keyword">description</span>:<span class="hljs-string">'Client'</span>,
            setupIcon:<span class="hljs-string">"xxxx.ico"</span>,
            noMsi:<span class="hljs-keyword">true</span>
        }
    }
});

<span class="hljs-comment">//加载任务</span>
grunt.loadNpmTasks(<span class="hljs-string">'grunt-electron-installer'</span>);

<span class="hljs-comment">//设置为默认</span>
grunt.registerTask(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'create-windows-installer'</span>]);
</code></pre>
<ul><li>步骤四：<br>
</li></ul>
<p>在主进程main.js中添加squirrel安装打包配置以及自动更新检测和事件监听：<br><br>参考：<br><br><a href="https://github.com/electron-archive/grunt-electron-installer#handling-squirrel-events" rel="nofollow noreferrer" target="_blank">Handling Squirrel Events</a> <br><br><a href="https://electron.atom.io/docs/api/auto-updater/" rel="nofollow noreferrer" target="_blank">auto-updater</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron')
//自动更新
const autoUpdater = electron.autoUpdater

//生成和删除应用快捷方式，用于安装和卸载，直接在app.on('ready',() => {startupEventHandle()})的时候执行；
function startupEventHandle(){
  if(require('electron-squirrel-startup')) return;
  var handleStartupEvent = function () {
    if (process.platform !== 'win32') {
      return false;
    }
    var squirrelCommand = process.argv[1];
    switch (squirrelCommand) {
      case '--squirrel-install':
      case '--squirrel-updated':
        install();
        return true;
      case '--squirrel-uninstall':
        uninstall();
        app.quit();
        return true;
      case '--squirrel-obsolete':
        app.quit();
        return true;
    }
      // 安装
    function install() {
      var cp = require('child_process');    
      var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
      var target = path.basename(process.execPath);
      var child = cp.spawn(updateDotExe, [&quot;--createShortcut&quot;, target], { detached: true });
      child.on('close', function(code) {
          app.quit();
      });
    }
    // 卸载
    function uninstall() {
      var cp = require('child_process');    
      var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
      var target = path.basename(process.execPath);
      var child = cp.spawn(updateDotExe, [&quot;--removeShortcut&quot;, target], { detached: true });
      child.on('close', function(code) {
          app.quit();
      });
    }
  };
  if (handleStartupEvent()) {
    return ;
  }
}

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle(){
    let message={
      error:'检查更新出错',
      checking:'正在检查更新……',
      updateAva:'检测到新版本，正在下载……',
      updateNotAva:'现在使用的就是最新版本，不用更新',
    };
    const os = require('os');
    autoUpdater.setFeedURL('放最新版本文件的文件夹的服务器地址');
    autoUpdater.on('error', function(error){
      sendUpdateMessage(message.error)
    })
    .on('checking-for-update', function(e) {
      sendUpdateMessage(message.checking)
    })
    .on('update-available', function(e) {
        sendUpdateMessage(message.updateAva)
    })
    .on('update-not-available', function(e) {
        sendUpdateMessage(message.updateNotAva)
    })
    .on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, arg) => {
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        mainWindow.webContents.send('isUpdateNow')
    });
    
    //执行自动更新检查
    autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
// mainWindow = new BrowserWindow()
function sendUpdateMessage(text){
    mainWindow.webContents.send('message', text)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-comment">//自动更新</span>
<span class="hljs-keyword">const</span> autoUpdater = electron.autoUpdater

<span class="hljs-comment">//生成和删除应用快捷方式，用于安装和卸载，直接在app.on('ready',() =&gt; {startupEventHandle()})的时候执行；</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startupEventHandle</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">require</span>(<span class="hljs-string">'electron-squirrel-startup'</span>)) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">var</span> handleStartupEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'win32'</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">var</span> squirrelCommand = process.argv[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">switch</span> (squirrelCommand) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-install'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-updated'</span>:
        install();
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-uninstall'</span>:
        uninstall();
        app.quit();
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-obsolete'</span>:
        app.quit();
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
      <span class="hljs-comment">// 安装</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);    
      <span class="hljs-keyword">var</span> updateDotExe = path.resolve(path.dirname(process.execPath), <span class="hljs-string">'..'</span>, <span class="hljs-string">'update.exe'</span>);
      <span class="hljs-keyword">var</span> target = path.basename(process.execPath);
      <span class="hljs-keyword">var</span> child = cp.spawn(updateDotExe, [<span class="hljs-string">"--createShortcut"</span>, target], { <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span> });
      child.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>) </span>{
          app.quit();
      });
    }
    <span class="hljs-comment">// 卸载</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uninstall</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);    
      <span class="hljs-keyword">var</span> updateDotExe = path.resolve(path.dirname(process.execPath), <span class="hljs-string">'..'</span>, <span class="hljs-string">'update.exe'</span>);
      <span class="hljs-keyword">var</span> target = path.basename(process.execPath);
      <span class="hljs-keyword">var</span> child = cp.spawn(updateDotExe, [<span class="hljs-string">"--removeShortcut"</span>, target], { <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span> });
      child.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>) </span>{
          app.quit();
      });
    }
  };
  <span class="hljs-keyword">if</span> (handleStartupEvent()) {
    <span class="hljs-keyword">return</span> ;
  }
}

<span class="hljs-comment">// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateHandle</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> message={
      <span class="hljs-attr">error</span>:<span class="hljs-string">'检查更新出错'</span>,
      <span class="hljs-attr">checking</span>:<span class="hljs-string">'正在检查更新……'</span>,
      <span class="hljs-attr">updateAva</span>:<span class="hljs-string">'检测到新版本，正在下载……'</span>,
      <span class="hljs-attr">updateNotAva</span>:<span class="hljs-string">'现在使用的就是最新版本，不用更新'</span>,
    };
    <span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);
    autoUpdater.setFeedURL(<span class="hljs-string">'放最新版本文件的文件夹的服务器地址'</span>);
    autoUpdater.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
      sendUpdateMessage(message.error)
    })
    .on(<span class="hljs-string">'checking-for-update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      sendUpdateMessage(message.checking)
    })
    .on(<span class="hljs-string">'update-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        sendUpdateMessage(message.updateAva)
    })
    .on(<span class="hljs-string">'update-not-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        sendUpdateMessage(message.updateNotAva)
    })
    .on(<span class="hljs-string">'update-downloaded'</span>,  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate</span>) </span>{
        ipcMain.on(<span class="hljs-string">'isUpdateNow'</span>, (e, arg) =&gt; {
            <span class="hljs-comment">//some code here to handle event</span>
            autoUpdater.quitAndInstall();
        })
        mainWindow.webContents.send(<span class="hljs-string">'isUpdateNow'</span>)
    });
    
    <span class="hljs-comment">//执行自动更新检查</span>
    autoUpdater.checkForUpdates();
}

<span class="hljs-comment">// 通过main进程发送事件给renderer进程，提示更新信息</span>
<span class="hljs-comment">// mainWindow = new BrowserWindow()</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendUpdateMessage</span>(<span class="hljs-params">text</span>)</span>{
    mainWindow.webContents.send(<span class="hljs-string">'message'</span>, text)
}</code></pre>
<ul><li>步骤五：<br>
</li></ul>
<p>执行grunt，在你指定的目录生成三个文件：exe 文件是安装包，RELEASES 包含安装及版本信息（自动更新就是通过对比该文件进行自动更新），nupkg 文件</p>
<p><strong>至此，完成了一个版本的打包，双击exe文件后，弹出绿色的安装动画，无法选择安装目录，会自动安装在C:UsersAdministratorAppDataLocal下，安装结束后动画消失（一定要等安装的绿色动画消失才能对应用进行操作，不然可能会报错，也不能手动关闭安装程序），并自动创建了快捷方式。</strong></p>
<p>如何进行版本更新？</p>
<ol>
<li>改变package.json中的version属性，例如：改为 version: "1.0.1" (之前为1.0.0)；</li>
<li>然后再次执行步骤一和步骤五，打包一个新的版本，多出两个文件，改变了RELEASES文件，除了上述三个文件外还有个delta文件，这个是增量包；</li>
<li>将新版本的上述文件（只需要nupkg文件和RELEASES文件）放到<code>autoUpdater.setFeedURL(url)</code>该方法中设置的url指向的文件夹下就可以了，执行更新检查的时候，autoUpdate会自动到该目录下查看 <strong>RELEASES</strong> 文件的版本信息，与安装目录下的 RELEASES 文件进行比对，进行更新下载；</li>
</ol>
<blockquote>会发现使用squirrel.Windows的时候，服务器仅仅作为文件服务器放置更新文件，不要编写其它文件，使用squirrel.Mac需要服务器编写接口文件进行检测判断，两者不太一样。</blockquote>
<p>总结：如果是简单更新大概就是 -&gt; 配置好 Gruntfile.js 和 main.js（包括与renderer的通信） 文件，electron-packager打包，grunt打包electron-packager打包生成的文件，会生成安装文件和版本信息，将grunt打包的东西放到一个文件服务器上，在本地安装的app上启动检查更新。</p>
<h4>方法二：使用electron-builder配合electron-updater实现自动更新</h4>
<p>参考：<a href="https://github.com/electron-userland/electron-builder/wiki/Auto-Update#UpdaterSignal" rel="nofollow noreferrer" target="_blank">Auto Update</a></p>
<blockquote>后来通过对比放弃了方法一，使用了方法二；主要原因有以下几点：（从我使用的情况来看，也可能是我自己没找到解决以下问题的方法，如果有欢迎告诉作者，谢谢）</blockquote>
<ol>
<li>因为方法一打包出来的安装文件 exe 比较大，原因是不是使用nsis方式压缩打包的；</li>
<li>并且electron自带的autoUpdater中事件和方法都没有electron-updater中的丰富，有不少实现不了，比如：使用原生autoUpdater下载更新时的进度条做不了，但是electron-updater提供了<code>download-progerss</code>事件，该事件提供了下载速度（bytesPerSecond）、已下载百分比（percent）、已传输（transferred）、文件大小（total）等参数，非常方便；</li>
<li>autoUpdater一旦启动checkForUpdates()，有更新时就会自动下载更新，没办法忽略版本的更新，但是electron-updater提供了 appUpdater.autoDownload = false 的属性配置，可以不自动下载更新，需要下载的时候执行 appUpdater.downloadUpdate() 方法就可以了，完美解决我的困惑。</li>
<li>并且方法二只需要执行electron-builder的打包程序就可以了，会生成一个类似方法一中的RELEASES文件的latest.yml文件，不需要执行两次打包；更新的时候和方法一同样简单，只需要把electron-builder打包出来的文件放到文件服务器就可以了。</li>
</ol>
<h6>具体步骤如下</h6>
<ul><li>步骤一：安装 <code>electron-updater</code> 包模块</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install electron-updater --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> electron-updater <span class="hljs-comment">--save</span></code></pre>
<ul><li>步骤二：<br>
</li></ul>
<p>配置package.json文件，只需要在 build 参数中添加 publish 配置就好了，具体参考<a href="https://github.com/electron-userland/electron-builder/wiki/Publishing-Artifacts#PublishConfiguration" rel="nofollow noreferrer" target="_blank">PublishConfiguratio</a></p>
<blockquote>注意：只有配置了publish才能生成latest.yml文件；</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: {
    &quot;appId&quot;: &quot;com.xxx.app&quot;,
    &quot;publish&quot;: [
        {
            &quot;provider&quot;: &quot;generic&quot;,
            
            //类似于autoUpdater.setFeedURL(url)中的url，用于自动更新的文件地址
            &quot;url&quot;: &quot;http://www.xxx.com/&quot;
        }
    ],
    &quot;mac&quot;: {
      &quot;target&quot;: [&quot;dmg&quot;,&quot;zip&quot;]
    },
    &quot;win&quot;: {
      &quot;target&quot;: [&quot;nsis&quot;,&quot;zip&quot;]
    }
},
&quot;scripts&quot;: {
    &quot;dist&quot;: &quot;electron-builder -wm&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"build"</span>: {
    <span class="hljs-string">"appId"</span>: <span class="hljs-string">"com.xxx.app"</span>,
    <span class="hljs-string">"publish"</span>: [
        {
            <span class="hljs-string">"provider"</span>: <span class="hljs-string">"generic"</span>,
            
            //类似于autoUpdater.setFeedURL(url)中的url，用于自动更新的文件地址
            <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://www.xxx.com/"</span>
        }
    ],
    <span class="hljs-string">"mac"</span>: {
      <span class="hljs-string">"target"</span>: [<span class="hljs-string">"dmg"</span>,<span class="hljs-string">"zip"</span>]
    },
    <span class="hljs-string">"win"</span>: {
      <span class="hljs-string">"target"</span>: [<span class="hljs-string">"nsis"</span>,<span class="hljs-string">"zip"</span>]
    }
},
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dist"</span>: <span class="hljs-string">"electron-builder -wm"</span>
},</code></pre>
<ul><li>步骤三： <br>
</li></ul>
<p>配置main.js文件，引入 electron-updater 文件，后面用法和electron自带的autoUpdater类似；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注意这个autoUpdater不是electron中的autoUpdater
import { autoUpdater } from &quot;electron-updater&quot;

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle(){
    let message={
      error:'检查更新出错',
      checking:'正在检查更新……',
      updateAva:'检测到新版本，正在下载……',
      updateNotAva:'现在使用的就是最新版本，不用更新',
    };
    const os = require('os');
    autoUpdater.setFeedURL('放最新版本文件的文件夹的服务器地址');
    autoUpdater.on('error', function(error){
      sendUpdateMessage(message.error)
    });
    autoUpdater.on('checking-for-update', function() {
      sendUpdateMessage(message.checking)
    });
    autoUpdater.on('update-available', function(info) {
        sendUpdateMessage(message.updateAva)
    });
    autoUpdater.on('update-not-available', function(info) {
        sendUpdateMessage(message.updateNotAva)
    });
    
    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
        mainWindow.webContents.send('downloadProgress', progressObj)
    })
    autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, arg) => {
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        mainWindow.webContents.send('isUpdateNow')
    });
    
    //执行自动更新检查
    autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
// mainWindow = new BrowserWindow()
function sendUpdateMessage(text){
    mainWindow.webContents.send('message', text)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 注意这个autoUpdater不是electron中的autoUpdater</span>
<span class="hljs-keyword">import</span> { autoUpdater } <span class="hljs-keyword">from</span> <span class="hljs-string">"electron-updater"</span>

<span class="hljs-comment">// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateHandle</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> message={
      <span class="hljs-attr">error</span>:<span class="hljs-string">'检查更新出错'</span>,
      <span class="hljs-attr">checking</span>:<span class="hljs-string">'正在检查更新……'</span>,
      <span class="hljs-attr">updateAva</span>:<span class="hljs-string">'检测到新版本，正在下载……'</span>,
      <span class="hljs-attr">updateNotAva</span>:<span class="hljs-string">'现在使用的就是最新版本，不用更新'</span>,
    };
    <span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);
    autoUpdater.setFeedURL(<span class="hljs-string">'放最新版本文件的文件夹的服务器地址'</span>);
    autoUpdater.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
      sendUpdateMessage(message.error)
    });
    autoUpdater.on(<span class="hljs-string">'checking-for-update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      sendUpdateMessage(message.checking)
    });
    autoUpdater.on(<span class="hljs-string">'update-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">info</span>) </span>{
        sendUpdateMessage(message.updateAva)
    });
    autoUpdater.on(<span class="hljs-string">'update-not-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">info</span>) </span>{
        sendUpdateMessage(message.updateNotAva)
    });
    
    <span class="hljs-comment">// 更新下载进度事件</span>
    autoUpdater.on(<span class="hljs-string">'download-progress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">progressObj</span>) </span>{
        mainWindow.webContents.send(<span class="hljs-string">'downloadProgress'</span>, progressObj)
    })
    autoUpdater.on(<span class="hljs-string">'update-downloaded'</span>,  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate</span>) </span>{
        ipcMain.on(<span class="hljs-string">'isUpdateNow'</span>, (e, arg) =&gt; {
            <span class="hljs-comment">//some code here to handle event</span>
            autoUpdater.quitAndInstall();
        })
        mainWindow.webContents.send(<span class="hljs-string">'isUpdateNow'</span>)
    });
    
    <span class="hljs-comment">//执行自动更新检查</span>
    autoUpdater.checkForUpdates();
}

<span class="hljs-comment">// 通过main进程发送事件给renderer进程，提示更新信息</span>
<span class="hljs-comment">// mainWindow = new BrowserWindow()</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendUpdateMessage</span>(<span class="hljs-params">text</span>)</span>{
    mainWindow.webContents.send(<span class="hljs-string">'message'</span>, text)
}</code></pre>
<ul><li>步骤四：<br>
</li></ul>
<p>执行electron-builder进行打包，会生成安装包<code>exe</code>和<code>latest.yml</code>等文件，执行exe安装软件；</p>
<p>如何进行更新？</p>
<ol>
<li>改变package.json中的version属性，例如：改为 version: "1.0.1" (之前为1.0.0)；</li>
<li>再次执行electron-builder打包，将新版本<code>latest.yml</code>文件和<code>exe</code>文件放到<code>package.json</code>中<code>build -&gt; publish</code>中的url对应的地址下；</li>
<li>在应用中触发更新检查，electron-updater自动会通过对应url下的yml文件检查更新；</li>
</ol>
<p><strong>总结：通过对比发现，方法二比方法一更加简单方便，并且打包生成的exe安装文件小很多（作者通过方法一生成安装文件70M，方法二仅仅 36M），唯一一个问题是，通过方法二没有产生delta文件，也就是没有增量包。</strong></p>
<p>结语：这只是一个小白的实践总结，其中有不少是自己的理解，可能不对，有许多需要改进的地方，希望通过这个总结，自己在以后回顾有机会有更多不同的收获。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用electron-builder在windows上打包并自动更新

## 原文链接
[https://segmentfault.com/a/1190000010271226](https://segmentfault.com/a/1190000010271226)

