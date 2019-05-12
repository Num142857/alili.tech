---
title: 'electron + vue 实践项目' 
date: 2019-01-03 2:30:11
hidden: true
slug: 876mlgqcf3g
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><a href="https://github.com/xiaobinwu/electron-vue-project" rel="nofollow noreferrer" target="_blank">github地址</a></h1>
<h4>本地安装环境准备</h4>
<ul>
<li>安装node： * <a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/download/</a>
</li>
<li>配置webpack： npm install -g webpack(sudo权限)</li>
<li>windows配置cnpm：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install -g cnpm --registry=https://registry.npm.taobao.org
    因为npm的默认仓库在国外，下载很慢，国内淘宝搞了个CNPM，每10分钟同步一次，完全够用了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    npm install -g cnpm --registry=https://registry.npm.taobao.org
    因为npm的默认仓库在国外，下载很慢，国内淘宝搞了个CNPM，每10分钟同步一次，完全够用了</code></pre>
<ul><li>当然也可以使用yarn下载</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install -g yarn
    yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    npm install -g yarn
    yarn install</code></pre>
<h4>依赖包安装</h4>
<ul>
<li>进入项目目录</li>
<li>执行cnpm install</li>
</ul>
<h4>安装问题</h4>
<blockquote><ul>
<li>cnpm install之后，可能会由于网络不好而导致一些包安装不完整，这里推荐使用yarn进行安装</li>
<li>需要额外安装vue-style-loader、vue-template-compiler，不然vue-loader会报错</li>
<li>electron配置项（config.js）为true时，运行npm run dev，浏览器访问会报错， <code>Uncaught ReferenceError: require is not defined</code>，原因可以去<a href="https://github.com/egoist/vuepack/issues/83" rel="nofollow noreferrer" target="_blank">这里</a>看，由于配置config.electron是开启状态，于是require被browserified化了，不是原先node原生require函数，所以在browser会出现此问题</li>
<li>应用打包的时候，需要注意package.json的main配置项main，必须指向electron的主线程文件，此处为app/index.js</li>
</ul></blockquote>
<h4>字体引入问题</h4>
<p>对于webpack对于引入字体文件一直都会有问题，有时候你使用了file-laoder，url-loader，但是在使用还是会存在一些问题，比如渲染进程入口文件components/App.vue希望引入<code>common.scss</code>，<code>common.scss</code>会去<code>@import iconfont.css</code>(字体样式)，这时候<code>iconfont.css</code>的字体路径就会出现问题，webpack一直提示找不到依赖路径。在开发环境下，我是将iconfont.cn获取的字体文件远程地址写进build/index.html，这样解决了问题。正式环境下，可以将字体文件代码引入到App.vue文件中去</p>
<h3 id="articleHeader1">功能列表</h3>
<ul>
<li>[ ]  mac安装包生成</li>
<li>[ ]  新增各个模块功能</li>
<li>[x] windows安装包生成 -- 完成</li>
<li>[x] 应用自动更新 -- 完成</li>
<li>[x] 中英文切换 -- 完成</li>
<li>[x] 全局快捷键绑定 -- 完成</li>
<li>[x] 即时通讯功能 -- 完成</li>
<li>[x] excel表格导入导出 -- 完成</li>
<li>[x] 登录功能 -- 完成</li>
<li>[x] mock.easy提供数据 -- 完成</li>
</ul>
<p>development:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run dev
# express开启服务，可以通过`http://localhost:port`访问（热重载）
# 原理：通过electron创建主体窗口，`mainWindow.loadURL(http://localhost:port)`，加载应用的 index.html

$ npm run app
# 运行`electron ./`,生成桌面应用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run dev
<span class="hljs-comment"># express开启服务，可以通过`http://localhost:port`访问（热重载）</span>
<span class="hljs-comment"># 原理：通过electron创建主体窗口，`mainWindow.loadURL(http://localhost:port)`，加载应用的 index.html</span>

$ npm run app
<span class="hljs-comment"># 运行`electron ./`,生成桌面应用</span>
</code></pre>
<p>socket.io:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run socket

使用express + mongoDB + socket.io引入基于node的即时通讯模块
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run socket

使用express + mongoDB + socket.io引入基于node的即时通讯模块
</code></pre>
<p>本地调试时，只需运行<code>npm run dev</code> <strong>=&gt;</strong> <code>npm run app</code>，需要开启即时通讯的功能的需要<code>npm run sock</code>，这里需要注意即时通讯模块目前没有迁移至服务器，要在本地运行，需要使用express起一个服务（<code>./socket/</code>），这里的数据库集成使用的是mongoDB，所以必须要安装<a href="https://www.mongodb.com/" rel="nofollow noreferrer" target="_blank">mongoDB</a>，然后配置环境变量（比如说我安装的目录是<code>d:</code>，我的环境变量这样配置，<code>D:\Program Files\MongoDB\Server\3.4\bin</code>），这样之后，便可以使用<code>mongod</code>、<code>mongo</code>命令了，执行<code>mongod</code>命令，一般会报错，默认存储文档的目录没有，那可以这样，新建一个文件夹，用来存储mongo产生的文档对象，执行<code>mongod --dbpath D:\mongodb\db</code>，至于mongo(models/sechemas)、socket.io、express如何搭配去实现即时通讯的的功能，具体可以看代码如何实现，对于这些新的东西，也只是了解个大概，后面准备花些时间去深入学习。</p>
<p>production:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run build
＃生成正式文件到app/dist目录（eletron应用目录）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run build
＃生成正式文件到app/dist目录（eletron应用目录）
</code></pre>
<p>package:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run package:mac
$ npm run package:win
$ npm run package:linux
$ npm run package

将上一步`npm run build`后生成的正式文件，进行打包，生成程序，打包至`./package`目录中
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run package:mac
$ npm run package:win
$ npm run package:linux
$ npm run package

将上一步`npm run build`后生成的正式文件，进行打包，生成程序，打包至`./package`目录中
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010782421" src="https://static.alili.tech/img/remote/1460000010782421" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>setup:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run setup

这里生成安装包（仅适合于window），将上一步生成的package，通过grunt和grunt-electron-installer完成打包，打包至`./package_dir`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run setup

这里生成安装包（仅适合于window），将上一步生成的package，通过grunt和grunt-electron-installer完成打包，打包至`./package_dir`
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010782422" src="https://static.alili.tech/img/remote/1460000010782422" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>生成安装包的过程：</p>
<blockquote><ul>
<li>npm run build</li>
<li>npm run package:win（目前只支持window）</li>
<li>npm run setup</li>
</ul></blockquote>
<p>对于打包工具，这里使用的是<code>electron-packager</code>，安装命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rimraf package &amp;&amp; electron-packager . TEST --platform=win32 --arch=x64 --overwrite --icon=hosts.ico --out=./package --electron-version=1.6.11 --version-string.CompanyName=TEST --version-string.ProductName=TEST --ignore=\&quot;(build|client$|static|theme|.gitignore|LICENSE|README.md|.editorconfig|.eslintrc|node_modules|gruntPackage.json|Gruntfile.js|yarn.lock|socket|package_dir|git_img)\&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">rimraf</span> <span class="hljs-comment">package</span> <span class="hljs-comment">&amp;&amp;</span> <span class="hljs-comment">electron</span><span class="hljs-literal">-</span><span class="hljs-comment">packager</span> <span class="hljs-string">.</span> <span class="hljs-comment">TEST</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">platform=win32</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">arch=x64</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">overwrite</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">icon=hosts</span><span class="hljs-string">.</span><span class="hljs-comment">ico</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">out=</span><span class="hljs-string">.</span><span class="hljs-comment">/package</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">electron</span><span class="hljs-literal">-</span><span class="hljs-comment">version=1</span><span class="hljs-string">.</span><span class="hljs-comment">6</span><span class="hljs-string">.</span><span class="hljs-comment">11</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">version</span><span class="hljs-literal">-</span><span class="hljs-comment">string</span><span class="hljs-string">.</span><span class="hljs-comment">CompanyName=TEST</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">version</span><span class="hljs-literal">-</span><span class="hljs-comment">string</span><span class="hljs-string">.</span><span class="hljs-comment">ProductName=TEST</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ignore=\"(build|client$|static|theme|</span><span class="hljs-string">.</span><span class="hljs-comment">gitignore|LICENSE|README</span><span class="hljs-string">.</span><span class="hljs-comment">md|</span><span class="hljs-string">.</span><span class="hljs-comment">editorconfig|</span><span class="hljs-string">.</span><span class="hljs-comment">eslintrc|node_modules|gruntPackage</span><span class="hljs-string">.</span><span class="hljs-comment">json|Gruntfile</span><span class="hljs-string">.</span><span class="hljs-comment">js|yarn</span><span class="hljs-string">.</span><span class="hljs-comment">lock|socket|package_dir|git_img)\"</span>
</code></pre>
<p>参数：</p>
<blockquote><ul>
<li>
<code>.</code> =&gt; 应用目录</li>
<li>
<code>TEST</code> =&gt; 应用名称</li>
<li>
<code>--platform=win32</code> =&gt; 要打包的平台</li>
<li>
<code>--overwrite</code> =&gt; 覆盖模式安装</li>
<li>
<code>--icon=hosts.ico</code> =&gt; 应用图标（window时可以是<code>.ico</code>、<code>.png</code>，mac时可以为<code>.icns</code>）</li>
<li>
<code>--out=./package</code> =&gt; 输出目录</li>
<li>
<code>--electron-version</code> =&gt; electron版本</li>
<li>
<code>--version-string.CompanyName=TEST --version-string.ProductName=TEST</code> =&gt; 为了生成安装包的时候，应用名字为<code>TEST</code>，而不是默认的<code>electron</code>
</li>
<li>
<code>--ignore=XXX</code> =&gt; 忽略打包的目录</li>
</ul></blockquote>
<p>详细可看<a href="https://github.com/electron-userland/electron-packager/blob/master/docs/api.md" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p>打包成安装程序，需要使用到<code>grunt</code>、<code>grunt-electron-installer</code>,请保证事先安装好  <br>在<code>package.json</code>设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;1.0.0&quot;, // 这个是必须的，为了后面使用electron updater实现自动更新
    &quot;productName&quot;: &quot;my-electron&quot;,
    &quot;description&quot;: &quot;My Superb Vue Project For Electron&quot;,
    ......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>{
    <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>, <span class="hljs-comment">// 这个是必须的，为了后面使用electron updater实现自动更新</span>
    <span class="hljs-string">"productName"</span>: <span class="hljs-string">"my-electron"</span>,
    <span class="hljs-string">"description"</span>: <span class="hljs-string">"My Superb Vue Project For Electron"</span>,
    ......
}</code></pre>
<p>Gruntfile.js文件如下<a href="https://www.npmjs.com/package/grunt-electron-installer" rel="nofollow noreferrer" target="_blank">详细</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var grunt = require('grunt')

// 配置
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'), // 这里会去获取版本号
    'create-windows-installer': {
        x64: {
            authors: 'xiaobinwu <xiaobin_wu@yahoo.com>', // 作者
            projectUrl: '',
            appDirectory: './package/TEST-win32-x64', // 要打包的输入目录
            outputDirectory: './package_dir', // grunt打包后的输出目录
            exe: 'TEST.exe', // 生成的exe文件
            description: 'My Superb Vue Project For Electron',
            setupIcon: './app/hots.ico', // 图标
            noMsi: true // 是否生成.msi
        }
    }
})

// 加载任务
grunt.loadNpmTasks('grunt-electron-installer')

// 设置为默认
grunt.registerTask('default', ['create-windows-installer'])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> grunt = require(<span class="hljs-string">'grunt'</span>)

<span class="hljs-comment">// 配置</span>
grunt<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.init</span>({
    pkg: grunt<span class="hljs-selector-class">.file</span><span class="hljs-selector-class">.readJSON</span>(<span class="hljs-string">'package.json'</span>), <span class="hljs-comment">// 这里会去获取版本号</span>
    <span class="hljs-string">'create-windows-installer'</span>: {
        x64: {
            authors: <span class="hljs-string">'xiaobinwu &lt;xiaobin_wu@yahoo.com&gt;'</span>, <span class="hljs-comment">// 作者</span>
            projectUrl: <span class="hljs-string">''</span>,
            appDirectory: <span class="hljs-string">'./package/TEST-win32-x64'</span>, <span class="hljs-comment">// 要打包的输入目录</span>
            outputDirectory: <span class="hljs-string">'./package_dir'</span>, <span class="hljs-comment">// grunt打包后的输出目录</span>
            exe: <span class="hljs-string">'TEST.exe'</span>, <span class="hljs-comment">// 生成的exe文件</span>
            description: <span class="hljs-string">'My Superb Vue Project For Electron'</span>,
            setupIcon: <span class="hljs-string">'./app/hots.ico'</span>, <span class="hljs-comment">// 图标</span>
            noMsi: true <span class="hljs-comment">// 是否生成.msi</span>
        }
    }
})

<span class="hljs-comment">// 加载任务</span>
grunt.loadNpmTasks(<span class="hljs-string">'grunt-electron-installer'</span>)

<span class="hljs-comment">// 设置为默认</span>
grunt.registerTask(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'create-windows-installer'</span>])
</code></pre>
<p>于是就会生成如上图所示的<code>my-electronSetup.exe</code>，点击运行，进入一个安装的过程，会有安装的小动画，如下图：  <br><span class="img-wrap"><img data-src="/img/remote/1460000010782423" src="https://static.alili.tech/img/remote/1460000010782423" alt="gif" title="gif" style="cursor: pointer; display: inline;"></span><br>而我们需要的是安装完后自动生成快捷方式，这里使用的<code>electron-squirrel-startup</code>npm包，然后在主线程文件中app/index.js中写入<code>startupEventHandle</code>方法，安装时触发squirrel.window的一些命令，将其放在创建主体窗口的回调函数中，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.on('ready', function(){
    ......
    startupEventHandle()
    ......
})
......

function startupEventHandle () {
    if (require('electron-squirrel-startup')) { return }
    // 安装和更新时添加快捷方式，删除和卸载时删除快捷方式
    var handleStartupEvent = function () {
        if (process.platform !== 'win32') {
            return false
        }
        var squirrelCommand = process.argv[1]
        switch (squirrelCommand) {
            case '--squirrel-install':
            case '--squirrel-updated':
                install()
                return true
            case '--squirrel-uninstall':
                uninstall()
                app.quit()
                return true
            case '--squirrel-obsolete':
                app.quit()
                return true
        }
        // 安装
        function install () {
            var cp = require('child_process')
            var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
            var target = path.basename(process.execPath)
            var child = cp.spawn(updateDotExe, ['--createShortcut', target], { detached: true })
            child.on('close', function (code) {
                app.quit()
            })
        }
        // 卸载
        function uninstall () {
            var cp = require('child_process')
            var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
            var target = path.basename(process.execPath)
            var child = cp.spawn(updateDotExe, ['--removeShortcut', target], { detached: true })
            child.on('close', function (code) {
                app.quit()
            })
        }
    }
    if (handleStartupEvent()) {
        return
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>app.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    ......
    startupEventHandle()
    ......
})
......

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startupEventHandle</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">require</span>(<span class="hljs-string">'electron-squirrel-startup'</span>)) { <span class="hljs-keyword">return</span> }
    <span class="hljs-comment">// 安装和更新时添加快捷方式，删除和卸载时删除快捷方式</span>
    <span class="hljs-keyword">var</span> handleStartupEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'win32'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
        }
        <span class="hljs-keyword">var</span> squirrelCommand = process.argv[<span class="hljs-number">1</span>]
        <span class="hljs-keyword">switch</span> (squirrelCommand) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-install'</span>:
            <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-updated'</span>:
                install()
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-uninstall'</span>:
                uninstall()
                app.quit()
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'--squirrel-obsolete'</span>:
                app.quit()
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
        }
        <span class="hljs-comment">// 安装</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">var</span> cp = <span class="hljs-keyword">require</span>(<span class="hljs-string">'child_process'</span>)
            <span class="hljs-keyword">var</span> updateDotExe = path.resolve(path.dirname(process.execPath), <span class="hljs-string">'..'</span>, <span class="hljs-string">'update.exe'</span>)
            <span class="hljs-keyword">var</span> target = path.basename(process.execPath)
            <span class="hljs-keyword">var</span> child = cp.spawn(updateDotExe, [<span class="hljs-string">'--createShortcut'</span>, target], { detached: <span class="hljs-keyword">true</span> })
            child.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(code)</span> </span>{
                app.quit()
            })
        }
        <span class="hljs-comment">// 卸载</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uninstall</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">var</span> cp = <span class="hljs-keyword">require</span>(<span class="hljs-string">'child_process'</span>)
            <span class="hljs-keyword">var</span> updateDotExe = path.resolve(path.dirname(process.execPath), <span class="hljs-string">'..'</span>, <span class="hljs-string">'update.exe'</span>)
            <span class="hljs-keyword">var</span> target = path.basename(process.execPath)
            <span class="hljs-keyword">var</span> child = cp.spawn(updateDotExe, [<span class="hljs-string">'--removeShortcut'</span>, target], { detached: <span class="hljs-keyword">true</span> })
            child.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(code)</span> </span>{
                app.quit()
            })
        }
    }
    <span class="hljs-keyword">if</span> (handleStartupEvent()) {
        <span class="hljs-keyword">return</span>
    }
}
</code></pre>
<p>这样便可以在安装时生成快捷方式，卸载时删除快捷方式了，在这个过程中，有可能回报<code>electron-squirrel-startup module not found</code>类似的错误，那是<code>electron-packager</code>打包时，过滤掉了<code>node_moudles</code>目录，所以需要手动添加到生成的package里面。至于网上的一些教程说，是需要安装vs2015环境，并且将msbuild程序声明成环境变量，但是我觉得应该是缺少npm包的原因，大家也可以试试，我本地是本来就安装过vs2015的,而且安装包没办法自定义安装目录，默认都是安装在<code>C:\Users\Wushaobin\AppData\Local\XXX</code>下面的。</p>
<p>lint:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ npm run lint
# lint项目（配置规则：.eslintrc）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
$ npm run lint
<span class="hljs-comment"># lint项目（配置规则：.eslintrc）</span>
</code></pre>
<blockquote><p>上面的npm run script命令可能有些多，涉及的内容也比较多，文章后面会一一讲解！下面上一波效果图：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010782424" src="https://static.alili.tech/img/remote/1460000010782424" alt="gif" title="gif" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010782425" src="https://static.alili.tech/img/remote/1460000010782425" alt="gif" title="gif" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010782426" src="https://static.alili.tech/img/remote/1460000010782426" alt="gif" title="gif" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010782427" src="https://static.alili.tech/img/remote/1460000010782427" alt="gif" title="gif" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010782428" src="https://static.alili.tech/img/remote/1460000010782428" alt="gif" title="gif" style="cursor: pointer;"></span></p>
<h4>electron自动更新</h4>
<p>前面我们也有提到过自动更新，这里使用的官方提供的<code>electron.autoUpdater</code>模块去更新，坑爹的是官方对这一功能的描述真是少之又少，autoUpdater的一些方法和事件<a href="https://www.w3cschool.cn/electronmanual/electronmanual-auto-updater.html" rel="nofollow noreferrer" target="_blank">这里</a>可以去了解清楚，<code>autoUpdater.setFeedURL(url)</code>这一方法是重中之重，<code>url</code>放着高版本的文件(.exe,.nupkg,RELEASES)，这里我是存储在阿里oss,然后<code>autoUpdater.checkForUpdates()</code>会去检查是否需要更新，它会触发<code>error、checking-for-update、update-available、update-downloaded</code>中的一些事件，而我们需要利用主进程跟渲染进程之间的通讯（ipc/remote/webContent），来触发更新，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateHandle () {
    ipcMain.on('check-for-update', function (event, arg) {
        if (process.platform !== 'win32') {
            return false
        }
        let appName = '门店系统'
        let appIcon = __dirname + '/hots.ico'
        let message = {
            error: '检查更新出错',
            checking: '正在检查更新……',
            updateAva: '下载更新成功',
            updateNotAva: '现在使用的就是最新版本，不用更新',
            downloaded: '最新版本已下载，将在重启程序后更新'
        }
        const os = require('os')
        const { dialog } = require('electron')
        // 放最新版本文件的文件夹的服务器地址
        // 阿里oss
        autoUpdater.setFeedURL('http://electron20170815.oss-cn-beijing.aliyuncs.com/electron/')
        autoUpdater.on('error', function (error) {
            return dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['OK'],
                title: appName,
                message: message.error,
                detail: '\r' + error
            })
        })
        .on('checking-for-update', function (e) {
            return dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['OK'],
                title: appName,
                message: message.checking
            })
        })
        .on('update-available', function (e) {
            var downloadConfirmation = dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['OK'],
                title: appName,
                message: message.updateAva
            })
            if (downloadConfirmation === 0) {
                return
            }
        })
        .on('update-not-available', function (e) {
            return dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['OK'],
                title: appName,
                message: message.updateNotAva
            })
        })
        .on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
            var index = dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['现在重启', '稍后重启'],
                title: appName,
                message: message.downloaded,
                detail: releaseName + '\n\n' + releaseNotes
            })
            if (index === 1) { return }
            autoUpdater.quitAndInstall()
        })
        autoUpdater.checkForUpdates()
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateHandle</span> <span class="hljs-params">()</span> {</span>
    ipcMain.<span class="hljs-keyword">on</span>(<span class="hljs-string">'check-for-update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event, arg)</span> {</span>
        <span class="hljs-keyword">if</span> (process.platform !== <span class="hljs-string">'win32'</span>) {
            <span class="hljs-keyword">return</span> false
        }
        <span class="hljs-keyword">let</span> appName = <span class="hljs-string">'门店系统'</span>
        <span class="hljs-keyword">let</span> appIcon = __dirname + <span class="hljs-string">'/hots.ico'</span>
        <span class="hljs-keyword">let</span> message = {
            error: <span class="hljs-string">'检查更新出错'</span>,
            checkin<span class="hljs-variable">g:</span> <span class="hljs-string">'正在检查更新……'</span>,
            updateAv<span class="hljs-variable">a:</span> <span class="hljs-string">'下载更新成功'</span>,
            updateNotAv<span class="hljs-variable">a:</span> <span class="hljs-string">'现在使用的就是最新版本，不用更新'</span>,
            downloaded: <span class="hljs-string">'最新版本已下载，将在重启程序后更新'</span>
        }
        const os = require(<span class="hljs-string">'os'</span>)
        const { dialog } = require(<span class="hljs-string">'electron'</span>)
        // 放最新版本文件的文件夹的服务器地址
        // 阿里oss
        autoUpdater.setFeedURL(<span class="hljs-string">'http://electron20170815.oss-cn-beijing.aliyuncs.com/electron/'</span>)
        autoUpdater.<span class="hljs-keyword">on</span>(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
            <span class="hljs-keyword">return</span> dialog.showMessageBox(mainWindow, {
                <span class="hljs-built_in">type</span>: <span class="hljs-string">'info'</span>,
                icon: appIcon,
                button<span class="hljs-variable">s:</span> [<span class="hljs-string">'OK'</span>],
                title: appName,
                message: message.error,
                detai<span class="hljs-variable">l:</span> <span class="hljs-string">'\r'</span> + error
            })
        })
        .<span class="hljs-keyword">on</span>(<span class="hljs-string">'checking-for-update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> {</span>
            <span class="hljs-keyword">return</span> dialog.showMessageBox(mainWindow, {
                <span class="hljs-built_in">type</span>: <span class="hljs-string">'info'</span>,
                icon: appIcon,
                button<span class="hljs-variable">s:</span> [<span class="hljs-string">'OK'</span>],
                title: appName,
                message: message.checking
            })
        })
        .<span class="hljs-keyword">on</span>(<span class="hljs-string">'update-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> {</span>
            var downloadConfirmation = dialog.showMessageBox(mainWindow, {
                <span class="hljs-built_in">type</span>: <span class="hljs-string">'info'</span>,
                icon: appIcon,
                button<span class="hljs-variable">s:</span> [<span class="hljs-string">'OK'</span>],
                title: appName,
                message: message.updateAva
            })
            <span class="hljs-keyword">if</span> (downloadConfirmation === <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">return</span>
            }
        })
        .<span class="hljs-keyword">on</span>(<span class="hljs-string">'update-not-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> {</span>
            <span class="hljs-keyword">return</span> dialog.showMessageBox(mainWindow, {
                <span class="hljs-built_in">type</span>: <span class="hljs-string">'info'</span>,
                icon: appIcon,
                button<span class="hljs-variable">s:</span> [<span class="hljs-string">'OK'</span>],
                title: appName,
                message: message.updateNotAva
            })
        })
        .<span class="hljs-keyword">on</span>(<span class="hljs-string">'update-downloaded'</span>,  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate)</span> {</span>
            var <span class="hljs-built_in">index</span> = dialog.showMessageBox(mainWindow, {
                <span class="hljs-built_in">type</span>: <span class="hljs-string">'info'</span>,
                icon: appIcon,
                button<span class="hljs-variable">s:</span> [<span class="hljs-string">'现在重启'</span>, <span class="hljs-string">'稍后重启'</span>],
                title: appName,
                message: message.downloaded,
                detai<span class="hljs-variable">l:</span> releaseName + <span class="hljs-string">'\n\n'</span> + releaseNotes
            })
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">index</span> === <span class="hljs-number">1</span>) { <span class="hljs-keyword">return</span> }
            autoUpdater.quitAndInstall()
        })
        autoUpdater.checkForUpdates()
    })
}
</code></pre>
<p>如果内容对你有帮助的话，可以去<a href="https://github.com/xiaobinwu/electron-vue-project" rel="nofollow noreferrer" target="_blank">github</a>给个star！！！！</p>
<p>参考资料：  <br><a href="https://segmentfault.com/a/1190000008287730">https://segmentfault.com/a/1190000008287730</a>  <br><a href="https://segmentfault.com/a/1190000007616641" target="_blank">https://segmentfault.com/a/1190000007616641</a>  <br><a href="https://juejin.im/entry/5805e39ad20309006854e58f" rel="nofollow noreferrer" target="_blank">https://juejin.im/entry/5805e39ad20309006854e58f</a>  <br><a href="https://github.com/hua1995116/webchat" rel="nofollow noreferrer" target="_blank">https://github.com/hua1995116/webchat</a></p>
<hr>
<p>Generated by <a href="https://github.com/egoist/vuepack" rel="nofollow noreferrer" target="_blank">VuePack</a>.<br>vuePack <a href="https://github.com/egoist/vuepack/issues" rel="nofollow noreferrer" target="_blank">Issue</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron + vue 实践项目

## 原文链接
[https://segmentfault.com/a/1190000010782416](https://segmentfault.com/a/1190000010782416)

