---
title: '用 vue2 和 webpack 快速建构 NW.js 项目(3)' 
date: 2019-01-17 2:30:25
hidden: true
slug: pvp1m0q8mc
categories: [reprint]
---

{{< raw >}}

                    
<p>阅读本文需要一点 JS 基础和阅读的耐心，我特么自己写完后发现这文章咋这么长啊。。。如果你认真看完算我输！  </p>
<p>另我专门做了个 <a href="https://github.com/anchengjian/vue-nw-seed" rel="nofollow noreferrer" target="_blank">vue-nw-seed</a> 项目，里面包含了我这篇文章里的所有的点和一些别的优化，方便大家快速开发。</p>
<h2 id="articleHeader0">一、最小侵入性使用  <code>vuejs-templates</code> 建构 <code>NW.js</code> 应用</h2>
<p>在 Vue 圈里，最方便的项目建构方式应该是 <code>vue-cli</code> ，这整个生态里面最便捷的又应该是 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> 这个模板。再对这个模板比较熟悉了后，就开始想能不能根据这个模板快速构建我们需要的 NW.js 项目呢？</p>
<p>蛤蛤，答案当然是可以的。</p>
<p>最开始的思路比较笨重，如果你时间多，可以去看看我以前的思路 <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs.md" rel="nofollow noreferrer" target="_blank">用 vue2 和 webpack 快速建构 NW.js 项目(1)</a> 2333。在我连续加班一个月后整出了我们 <code>豆豆数学</code> 第一版后，稍微有了点空闲时间，就重新翻看了一下 NW.js 的文档，有点小发现啊。</p>
<p><code>Manifest Format</code> 清单文件中的小发现</p>
<blockquote>
<p><strong>main</strong><br>{String} which HTML page should be opened or which JavaScript file should be executed when NW.js starts.<br>You can specify a URL here. You can also specify just a filename (such as index.html or script.js) or a path (relative to the directory where your package.json resides).</p>
<p><strong>node-remote</strong><br>{Array} or {String} Enable calling Node in remote pages. The value controls for which sites this feature should be turned on. Each item in the array follows the match patterns used in Chrome extension.</p>
</blockquote>
<p>这个意思是说中说 <code>main</code> 字段可以写一个 <code>URL</code> ，也能写 <code>index.html</code> 或者 <code>script.js</code> 文件， <code>node-remote</code> 字段说允许哪些远程页面调用 Node 方法。</p>
<p>这组合起来就可以完全无侵入的使用 <code>vuejs-templates</code> 建构 <code>NW.js</code> 应用！</p>
<p><strong>整体思路</strong>就是设置 <code>package.json</code> 的 main 字段为 vue 项目的起始地址，然后把 node-remote 设置为 <code>&lt;all_urls&gt;</code> 允许全部的 JS 调用 Node 。</p>
<p>先上个效果<br><span class="img-wrap"><img data-src="/img/bVLEeW?w=1112&amp;h=766" src="https://static.alili.tech/img/bVLEeW?w=1112&amp;h=766" alt="seed-npm-run-dev" title="seed-npm-run-dev" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">1、先安装 NW 的开发依赖</h3>
<p>依然推荐 <a href="https://github.com/nwjs/npm-installer" rel="nofollow noreferrer" target="_blank">nwjs/npm-installer</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install nw --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install nw --save-dev</code></pre>
<p>网络不要的情况下，请参考之前写的文章中关于 <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs.md#2-" rel="nofollow noreferrer" target="_blank">用 npm 安装 NW.js</a> 部分。</p>
<h3 id="articleHeader2">2、配置 webpack</h3>
<p>相对于第一版，这次对于模板标配的建构配置改动相当小。  </p>
<p>把 build/webpack.base.conf.js 中新加个 <code>target</code> 字段就搞定。大概就是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: { ... },
  output: { ... },
  target: 'node-webkit',
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: { ... },
  <span class="hljs-attr">output</span>: { ... },
  <span class="hljs-attr">target</span>: <span class="hljs-string">'node-webkit'</span>,
  ...
}</code></pre>
<p>简单吧。</p>
<h3 id="articleHeader3">3、修改 <code>package.json</code>
</h3>
<p>添加或者修改 <code>main</code> 字段为你的 vue 项目启动地址，再添加 <code>node-remote</code> 为 <code>&lt;all_urls&gt;</code> 在配置下 NW.js 的 window 或者其他配置就行，大概就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vue-nw-seed&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  // ...
  &quot;main&quot;: &quot;http://localhost:8080&quot;,
  &quot;window&quot;: {
    &quot;title&quot;: &quot;vue-nw-seed&quot;,
    &quot;toolbar&quot;: true,
    &quot;width&quot;: 800,
    &quot;height&quot;: 500,
    &quot;min_width&quot;: 800,
    &quot;min_height&quot;: 500,
    &quot;resizable&quot;: true,
    &quot;frame&quot;: true,
    &quot;kiosk&quot;: false,
    &quot;icon&quot;: &quot;/static/logo.png&quot;,
    &quot;show_in_taskbar&quot;: true
  },
  &quot;nodejs&quot;: true,
  &quot;js-flags&quot;: &quot;--harmony&quot;,
  &quot;node-remote&quot;: &quot;<all_urls>&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"vue-nw-seed"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"http://localhost:8080"</span>,
  <span class="hljs-string">"window"</span>: {
    <span class="hljs-string">"title"</span>: <span class="hljs-string">"vue-nw-seed"</span>,
    <span class="hljs-string">"toolbar"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"width"</span>: <span class="hljs-number">800</span>,
    <span class="hljs-string">"height"</span>: <span class="hljs-number">500</span>,
    <span class="hljs-string">"min_width"</span>: <span class="hljs-number">800</span>,
    <span class="hljs-string">"min_height"</span>: <span class="hljs-number">500</span>,
    <span class="hljs-string">"resizable"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"frame"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"kiosk"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"icon"</span>: <span class="hljs-string">"/static/logo.png"</span>,
    <span class="hljs-string">"show_in_taskbar"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-string">"nodejs"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"js-flags"</span>: <span class="hljs-string">"--harmony"</span>,
  <span class="hljs-string">"node-remote"</span>: <span class="hljs-string">"&lt;all_urls&gt;"</span>
}</code></pre>
<h3 id="articleHeader4">4、修改 <code>npm run dev</code> 打开浏览器为打开 NW.js</h3>
<p>这一部应该是最复杂的一步，但实际上，相当简单。<br>增加 <code>build/dev-nw.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')
var nwPath = require('nw').findpath()
var rootPath = path.resolve(__dirname, '../')
var packageJsonPath = path.resolve(rootPath, './package.json')

module.exports = runNwDev

function runNwDev(uri = '') {
  if (uri &amp;&amp; (uri + '').trim()) {
    tmpJson = require(packageJsonPath)
    tmpJson.main = uri
    fs.writeFileSync(packageJsonPath, JSON.stringify(tmpJson, null, '  '), 'utf-8')
  }

  var closed
  var nwDev = exec(nwPath + ' ' + rootPath, { cwd: rootPath }, function(err, stdout, stderr) {
    process.exit(0)
    closed = true
  })

  nwDev.stdout.on('data', console.log)
  nwDev.stdout.on('error', console.error)

  // 退出时也关闭 NW 进程
  process.on('exit', exitHandle)
  process.on('uncaughtException', exitHandle)

  function exitHandle(e) {
    if (!closed) nwDev.kill()
    console.log(e || '233333, bye~~~')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">var</span> nwPath = <span class="hljs-built_in">require</span>(<span class="hljs-string">'nw'</span>).findpath()
<span class="hljs-keyword">var</span> rootPath = path.resolve(__dirname, <span class="hljs-string">'../'</span>)
<span class="hljs-keyword">var</span> packageJsonPath = path.resolve(rootPath, <span class="hljs-string">'./package.json'</span>)

<span class="hljs-built_in">module</span>.exports = runNwDev

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runNwDev</span>(<span class="hljs-params">uri = <span class="hljs-string">''</span></span>) </span>{
  <span class="hljs-keyword">if</span> (uri &amp;&amp; (uri + <span class="hljs-string">''</span>).trim()) {
    tmpJson = <span class="hljs-built_in">require</span>(packageJsonPath)
    tmpJson.main = uri
    fs.writeFileSync(packageJsonPath, <span class="hljs-built_in">JSON</span>.stringify(tmpJson, <span class="hljs-literal">null</span>, <span class="hljs-string">'  '</span>), <span class="hljs-string">'utf-8'</span>)
  }

  <span class="hljs-keyword">var</span> closed
  <span class="hljs-keyword">var</span> nwDev = exec(nwPath + <span class="hljs-string">' '</span> + rootPath, { <span class="hljs-attr">cwd</span>: rootPath }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stdout, stderr</span>) </span>{
    process.exit(<span class="hljs-number">0</span>)
    closed = <span class="hljs-literal">true</span>
  })

  nwDev.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-built_in">console</span>.log)
  nwDev.stdout.on(<span class="hljs-string">'error'</span>, <span class="hljs-built_in">console</span>.error)

  <span class="hljs-comment">// 退出时也关闭 NW 进程</span>
  process.on(<span class="hljs-string">'exit'</span>, exitHandle)
  process.on(<span class="hljs-string">'uncaughtException'</span>, exitHandle)

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exitHandle</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (!closed) nwDev.kill()
    <span class="hljs-built_in">console</span>.log(e || <span class="hljs-string">'233333, bye~~~'</span>)
  }
}</code></pre>
<p>并修改 <code>build/dev-server.js</code> 文件中打开浏览器的那部分代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // when env is testing, don't need open it
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== 'testing') {
    require('./dev-nw')(uri)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-comment">// when env is testing, don't need open it</span>
  <span class="hljs-keyword">if</span> (autoOpenBrowser &amp;&amp; process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> !== <span class="hljs-string">'testing'</span>) {
    require(<span class="hljs-string">'./dev-nw'</span>)(uri)
  }</code></pre>
<p>至此，整个开发建构就完成了，是不是几乎无侵入性。</p>
<h2 id="articleHeader5">二、打包 NW.js 应用</h2>
<p>推荐使用官方的包 <a href="https://github.com/nwjs/nw-builder" rel="nofollow noreferrer" target="_blank">nw-builder</a> ，虽然好久都没咋更新过了。。。</p>
<p><strong>整体思路</strong> ：先打包 vue 项目，再用 Node.js 整理形成一个 <code>package.json</code> 文件到 dist 目录中去。再用 nw-builder 打包出 NW 应用。</p>
<p>先看效果，增加信心。<br><span class="img-wrap"><img data-src="/img/bVLEe5?w=1112&amp;h=766" src="https://static.alili.tech/img/bVLEe5?w=1112&amp;h=766" alt="seed-npm-run-build" title="seed-npm-run-build" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">1、安装 nw-builder</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install nw-builder --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install nw-builder --save-dev</code></pre>
<p>这个过程仅仅是安装了打包 NW 的包装器，其要用到的 runtime 要在使用的时候才下载。</p>
<p><strong>如果网络不好</strong>。。。可以自己先想个办法直接复制一份 runtime 到 cacheDir 目录中。</p>
<h3 id="articleHeader7">2、增加 config</h3>
<p>配置大于约定，2333。  <br>增加 manifest 要被整理的字段，最终从 <code>./package.json</code> 整理到 <code>./dist/package.json</code> 中。<br>增加 builder 字段，可以参照 <a href="https://github.com/nwjs/nw-builder" rel="nofollow noreferrer" target="_blank">nw-builder</a> 文档来配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  build: {
    // ...
    nw: {
      // manifest for nw
      // the fileds will merge with `./package.json` and build to `./dist/package.json` for NW.js
      // Manifest Format: http://docs.nwjs.io/en/latest/References/Manifest%20Format/
      manifest: ['name', 'appName', 'version', 'description', 'author', { main: './index.html' }, 'window', 'nodejs', 'js-flags', 'node-remote'],
      // see document: https://github.com/nwjs/nw-builder
      builder: {
        files: [resolve('./dist/**')],
        platforms: ['win32'],
        version: '0.14.7',
        flavor: 'normal',
        cacheDir: resolve('./node_modules/_nw-builder-cache/'),
        buildDir: resolve('./output'),
        zip: true,
        winIco: resolve('./static/favicon.ico'),
        buildType: 'versioned'
      }
    }
  },
  dev: {
    //...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// see http://vuejs-templates.github.io/webpack for documentation.</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">build</span>: {
    <span class="hljs-comment">// ...</span>
    nw: {
      <span class="hljs-comment">// manifest for nw</span>
      <span class="hljs-comment">// the fileds will merge with `./package.json` and build to `./dist/package.json` for NW.js</span>
      <span class="hljs-comment">// Manifest Format: http://docs.nwjs.io/en/latest/References/Manifest%20Format/</span>
      manifest: [<span class="hljs-string">'name'</span>, <span class="hljs-string">'appName'</span>, <span class="hljs-string">'version'</span>, <span class="hljs-string">'description'</span>, <span class="hljs-string">'author'</span>, { <span class="hljs-attr">main</span>: <span class="hljs-string">'./index.html'</span> }, <span class="hljs-string">'window'</span>, <span class="hljs-string">'nodejs'</span>, <span class="hljs-string">'js-flags'</span>, <span class="hljs-string">'node-remote'</span>],
      <span class="hljs-comment">// see document: https://github.com/nwjs/nw-builder</span>
      builder: {
        <span class="hljs-attr">files</span>: [resolve(<span class="hljs-string">'./dist/**'</span>)],
        <span class="hljs-attr">platforms</span>: [<span class="hljs-string">'win32'</span>],
        <span class="hljs-attr">version</span>: <span class="hljs-string">'0.14.7'</span>,
        <span class="hljs-attr">flavor</span>: <span class="hljs-string">'normal'</span>,
        <span class="hljs-attr">cacheDir</span>: resolve(<span class="hljs-string">'./node_modules/_nw-builder-cache/'</span>),
        <span class="hljs-attr">buildDir</span>: resolve(<span class="hljs-string">'./output'</span>),
        <span class="hljs-attr">zip</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">winIco</span>: resolve(<span class="hljs-string">'./static/favicon.ico'</span>),
        <span class="hljs-attr">buildType</span>: <span class="hljs-string">'versioned'</span>
      }
    }
  },
  <span class="hljs-attr">dev</span>: {
    <span class="hljs-comment">//...</span>
  }
}</code></pre>
<h3 id="articleHeader8">3、增加 <code>./build/build-nw.js</code> 文件</h3>
<p>这个文件主要做的事情就是整理出 NW.js 用的 package.json，然后再调用 nw-builder 进行打包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')
var util = require('util')

var rootPath = path.resolve(__dirname, '../')

// get config
var config = require(path.resolve(rootPath, 'config'))

// `./package.json`
var tmpJson = require(path.resolve(rootPath, './package.json'))
var manifestPath = path.resolve(config.build.assetsRoot, './package.json')

// manifest for `./dist/package.json`
var manifest = {}
config.build.nw.manifest.forEach(function(v, i) {
  if (util.isString(v)) manifest[v] = tmpJson[v]
  else if (util.isObject(v)) manifest = util._extend(manifest, v)
})

fs.writeFile(manifestPath, JSON.stringify(manifest, null, '  '), 'utf-8', function(err, data) {
  if (err) throw err

  // start build app
  if (!config.build.nw.builder) return
  var NwBuilder = require('nw-builder')
  var nw = new NwBuilder(config.build.nw.builder)
  nw.build(function(err, data) {
    if (err) console.log(err)
    console.log('build nw done!')
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">var</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)

<span class="hljs-keyword">var</span> rootPath = path.resolve(__dirname, <span class="hljs-string">'../'</span>)

<span class="hljs-comment">// get config</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(path.resolve(rootPath, <span class="hljs-string">'config'</span>))

<span class="hljs-comment">// `./package.json`</span>
<span class="hljs-keyword">var</span> tmpJson = <span class="hljs-built_in">require</span>(path.resolve(rootPath, <span class="hljs-string">'./package.json'</span>))
<span class="hljs-keyword">var</span> manifestPath = path.resolve(config.build.assetsRoot, <span class="hljs-string">'./package.json'</span>)

<span class="hljs-comment">// manifest for `./dist/package.json`</span>
<span class="hljs-keyword">var</span> manifest = {}
config.build.nw.manifest.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v, i</span>) </span>{
  <span class="hljs-keyword">if</span> (util.isString(v)) manifest[v] = tmpJson[v]
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (util.isObject(v)) manifest = util._extend(manifest, v)
})

fs.writeFile(manifestPath, <span class="hljs-built_in">JSON</span>.stringify(manifest, <span class="hljs-literal">null</span>, <span class="hljs-string">'  '</span>), <span class="hljs-string">'utf-8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err

  <span class="hljs-comment">// start build app</span>
  <span class="hljs-keyword">if</span> (!config.build.nw.builder) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">var</span> NwBuilder = <span class="hljs-built_in">require</span>(<span class="hljs-string">'nw-builder'</span>)
  <span class="hljs-keyword">var</span> nw = <span class="hljs-keyword">new</span> NwBuilder(config.build.nw.builder)
  nw.build(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-built_in">console</span>.log(err)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'build nw done!'</span>)
  })
})</code></pre>
<h3 id="articleHeader9">4、在 <code>./build/build.js</code> 中增加打包入口</h3>
<p>增加下面这一行代码在 webpack 打包完成的回调中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // start build nw.js app
    require('./build-nw.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// start build nw.js app</span>
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./build-nw.js'</span>)</code></pre>
<p>简单 4 部就完成了打包，是不是异常清晰和简单。蛤</p>
<h2 id="articleHeader10">三、打包 windows 下的 setup.exe 文件</h2>
<p>这个部分，我之前也写了一篇文章 <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/pack-your-nw-app-and-setup-files.md" rel="nofollow noreferrer" target="_blank">打包NW.js应用和制作windows安装文件</a> 里面有比较详细的打包介绍。</p>
<p>但，在我们借助了 nw-builder 做了 NW 的打包后，仅仅打安装包就比较简单了，所以今天我就<strong>简写</strong>，节约大家的时间和生命。</p>
<p><strong>主要思路</strong>：用 Node.js 操作 iss 文件，再借助官方推荐的 innosetup 进行打包。</p>
<p>继续录一个 打包 exe 文件的 demo<br><span class="img-wrap"><img data-src="/img/bVLEe0?w=1112&amp;h=766" src="https://static.alili.tech/img/bVLEe0?w=1112&amp;h=766" alt="seed-npm-run-build" title="seed-npm-run-build" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">1、安装相关依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install iconv-lite innosetup-compiler --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install iconv-lite innosetup-compiler --save-dev</code></pre>
<h3 id="articleHeader12">2、创建 <code>./config/setup.iss</code> 打包配置文件</h3>
<p>踩坑注意，不要用 utf8 存这个文件，<strong>用 ansi 格式存这个配置文件</strong>， 不然打出来的安装包是乱码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; This CWD is the directory where the `setup.iss`, pay attention to join the relative directory!
; 该执行目录为 `setup.iss` 所在的目录，请注意拼接相对目录

#define MyAppName &quot;_name_&quot;
#define MyAppAliasName &quot;_appName_&quot;
#define MyAppVersion &quot;_version_&quot;
#define MyAppPublisher &quot;_appPublisher_&quot;
#define MyAppURL &quot;_appURL_&quot;
#define MyAppExeName &quot;_name_.exe&quot;
#define OutputPath &quot;_outputPath_&quot;
#define OutputFileName &quot;_outputFileName_&quot;
#define SourceMain &quot;_filesPath_\_name_.exe&quot;
#define SourceFolder &quot;_filesPath_\*&quot;
#define LicenseFilePath &quot;_resourcesPath_\license.txt&quot;
#define SetupIconFilePath &quot;_resourcesPath_\logo.ico&quot;
#define MyAppId &quot;_appId_&quot;

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppAliasName}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
LicenseFile={#LicenseFilePath}
OutputDir={#OutputPath}
OutputBaseFilename={#OutputFileName}
SetupIconFile={#SetupIconFilePath}
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
Uninstallable=yes
UninstallDisplayName={#MyAppAliasName}
DefaultGroupName={#MyAppAliasName}

[Tasks]
Name: &quot;desktopicon&quot;; Description: &quot;{cm:CreateDesktopIcon}&quot;; GroupDescription: &quot;{cm:AdditionalIcons}&quot;; Flags: checkedonce

[Files]
Source: {#SourceMain}; DestDir: &quot;{app}&quot;; Flags: ignoreversion
Source: {#SourceFolder}; DestDir: &quot;{app}&quot;; Flags: ignoreversion recursesubdirs createallsubdirs

[Messages]
SetupAppTitle={#MyAppAliasName} setup wizard
SetupWindowTitle={#MyAppAliasName} setup wizard

[Icons]
Name: &quot;{commondesktop}\{#MyAppAliasName}&quot;; Filename: &quot;{app}\{#MyAppExeName}&quot;; Tasks: desktopicon
Name: &quot;{group}\{#MyAppAliasName}&quot;; Filename: &quot;{app}\{#MyAppExeName}&quot;
Name: &quot;{group}\uninstall {#MyAppAliasName}&quot;; Filename: &quot;{uninstallexe}&quot;

[Run]
Filename: &quot;{app}\{#MyAppExeName}&quot;; Description: &quot;{cm:LaunchProgram,{#StringChange(MyAppName, '&amp;', '&amp;&amp;')"}}"&quot;; Flags: nowait postinstall skipifsilent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="iss">; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; This CWD is the directory where the `setup.iss`, pay attention to join the relative directory!
; 该执行目录为 `setup.iss` 所在的目录，请注意拼接相对目录

<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppName <span class="hljs-string">"_name_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppAliasName <span class="hljs-string">"_appName_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppVersion <span class="hljs-string">"_version_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppPublisher <span class="hljs-string">"_appPublisher_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppURL <span class="hljs-string">"_appURL_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppExeName <span class="hljs-string">"_name_.exe"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> OutputPath <span class="hljs-string">"_outputPath_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> OutputFileName <span class="hljs-string">"_outputFileName_"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SourceMain <span class="hljs-string">"_filesPath_\_name_.exe"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SourceFolder <span class="hljs-string">"_filesPath_\*"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> LicenseFilePath <span class="hljs-string">"_resourcesPath_\license.txt"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SetupIconFilePath <span class="hljs-string">"_resourcesPath_\logo.ico"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppId <span class="hljs-string">"_appId_"</span></span>

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={<span class="hljs-meta">#MyAppId}</span>
AppName={<span class="hljs-meta">#MyAppName}</span>
AppVersion={<span class="hljs-meta">#MyAppVersion}</span>
AppVerName={<span class="hljs-meta">#MyAppAliasName}</span>
AppPublisher={<span class="hljs-meta">#MyAppPublisher}</span>
AppPublisherURL={<span class="hljs-meta">#MyAppURL}</span>
AppSupportURL={<span class="hljs-meta">#MyAppURL}</span>
AppUpdatesURL={<span class="hljs-meta">#MyAppURL}</span>
DefaultDirName={pf}\{<span class="hljs-meta">#MyAppName}</span>
LicenseFile={<span class="hljs-meta">#LicenseFilePath}</span>
OutputDir={<span class="hljs-meta">#OutputPath}</span>
OutputBaseFilename={<span class="hljs-meta">#OutputFileName}</span>
SetupIconFile={<span class="hljs-meta">#SetupIconFilePath}</span>
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
Uninstallable=yes
UninstallDisplayName={<span class="hljs-meta">#MyAppAliasName}</span>
DefaultGroupName={<span class="hljs-meta">#MyAppAliasName}</span>

[Tasks]
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"desktopicon"</span>; Description: <span class="hljs-string">"{cm:CreateDesktopIcon}"</span>; GroupDescription: <span class="hljs-string">"{cm:AdditionalIcons}"</span>; Flags: checkedonce

[Files]
<span class="hljs-symbol">Source:</span> {<span class="hljs-meta">#SourceMain}; DestDir: <span class="hljs-string">"{app}"</span>; Flags: ignoreversion</span>
<span class="hljs-symbol">Source:</span> {<span class="hljs-meta">#SourceFolder}; DestDir: <span class="hljs-string">"{app}"</span>; Flags: ignoreversion recursesubdirs createallsubdirs</span>

[Messages]
SetupAppTitle={<span class="hljs-meta">#MyAppAliasName} setup wizard</span>
SetupWindowTitle={<span class="hljs-meta">#MyAppAliasName} setup wizard</span>

[Icons]
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{commondesktop}\{#MyAppAliasName}"</span>; Filename: <span class="hljs-string">"{app}\{#MyAppExeName}"</span>; Tasks: desktopicon
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{group}\{#MyAppAliasName}"</span>; Filename: <span class="hljs-string">"{app}\{#MyAppExeName}"</span>
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{group}\uninstall {#MyAppAliasName}"</span>; Filename: <span class="hljs-string">"{uninstallexe}"</span>

[Run]
<span class="hljs-symbol">Filename:</span> <span class="hljs-string">"{app}\{#MyAppExeName}"</span>; Description: <span class="hljs-string">"{cm:LaunchProgram,{#StringChange(MyAppName, '&amp;', '&amp;&amp;')"}}""</span>; Flags: nowait postinstall skipifsilent</code></pre>
<p>细心的你可能已经发现了这里面好多 <code>_name_</code> 之类的东西，这玩意将要被 Node.js 替换成项目配置的信息，不需要每次手动改写这个复杂的 iss 文件。</p>
<h3 id="articleHeader13">2、继续加配置</h3>
<p>那句话咋说的来着，配置大于约定。23333333<br>在 <code>./config/index.js</code> 文件中加上 <code>build.nw.setup</code> 字段，来配置要打包出来的应用的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    nw: {
      // ...
      setup: {
        issPath: resolve('./config/setup.iss'),  // 就是上面那个 iss
        files: path.resolve('./output', tmpJson.name + ' - v' + tmpJson.version),  // 要打包的文件目录
        outputPath: resolve('./output/setup/'),
        outputFileName: '${name}-${version}-${platform}-setup',  // 提供 name、version、platform 三个字段进行自定义输出文件名配置
        resourcesPath: resolve('./build/setup_resources'),  // 上面没说的打包用的 license 和 logo。参见 https://github.com/anchengjian/vue-nw-seed/tree/master/build/setup_resources
        appPublisher: 'vue-nw-seed, Inc.',
        appURL: 'https://github.com/anchengjian/vue-nw-seed',
        appId: '"{{"A448363D-3A2F-4800-B62D-8A1C4D8F1115}'  // 如果有就写上
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    nw: {
      <span class="hljs-comment">// ...</span>
      setup: {
        <span class="hljs-attr">issPath</span>: resolve(<span class="hljs-string">'./config/setup.iss'</span>),  <span class="hljs-comment">// 就是上面那个 iss</span>
        files: path.resolve(<span class="hljs-string">'./output'</span>, tmpJson.name + <span class="hljs-string">' - v'</span> + tmpJson.version),  <span class="hljs-comment">// 要打包的文件目录</span>
        outputPath: resolve(<span class="hljs-string">'./output/setup/'</span>),
        <span class="hljs-attr">outputFileName</span>: <span class="hljs-string">'${name}-${version}-${platform}-setup'</span>,  <span class="hljs-comment">// 提供 name、version、platform 三个字段进行自定义输出文件名配置</span>
        resourcesPath: resolve(<span class="hljs-string">'./build/setup_resources'</span>),  <span class="hljs-comment">// 上面没说的打包用的 license 和 logo。参见 https://github.com/anchengjian/vue-nw-seed/tree/master/build/setup_resources</span>
        appPublisher: <span class="hljs-string">'vue-nw-seed, Inc.'</span>,
        <span class="hljs-attr">appURL</span>: <span class="hljs-string">'https://github.com/anchengjian/vue-nw-seed'</span>,
        <span class="hljs-attr">appId</span>: <span class="hljs-string">'"{{"A448363D-3A2F-4800-B62D-8A1C4D8F1115}'</span>  <span class="hljs-comment">// 如果有就写上</span>
      }
    }</code></pre>
<h3 id="articleHeader14">3、新增 <code>./build/build-win-setup.js</code>
</h3>
<p>这个文件就是用来打包 windows 下安装包的。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var innosetupCompiler = require('innosetup-compiler')
var path = require('path')
var fs = require('fs')
var iconv = require('iconv-lite')

var rootPath = path.resolve(__dirname, '../')

// `./package.json`
var tmpJson = require(path.resolve(rootPath, './package.json'))

// get config
var config = require(path.resolve(rootPath, 'config'))
var setupOptions = config.build.nw.setup

fs.readdir(setupOptions.files, function(err, files) {
  if (err) throw err

  files.forEach(function(fileName) {
    if (!~fileName.indexOf('win')) return

    const curPath = path.resolve(setupOptions.files, fileName)
    fs.stat(curPath, function(err, stats) {
      if (err || stats.isFile()) return
      if (stats.isDirectory()) {
        makeExeSetup(Object.assign({}, setupOptions, { files: curPath, platform: fileName }))
      }
    })
  })
})

function makeExeSetup(opt) {
  const { issPath, files, outputPath, outputFileName, resourcesPath, appPublisher, appURL, appId, platform } = opt
  const { name, appName, version } = tmpJson
  const tmpIssPath = path.resolve(path.parse(issPath).dir, '_tmp.iss')

  return new Promise(function(resolve, reject) {
    // rewrite name, version to iss
    fs.readFile(issPath, null, function(err, text) {
      if (err) return reject(err)

      let str = iconv.decode(text, 'gbk')
        .replace(/_name_/g, name)
        .replace(/_appName_/g, appName)
        .replace(/_version_/g, version)
        .replace(/_outputPath_/g, outputPath)
        .replace(/_outputFileName_/g, getOutputName(outputFileName, { name, version, platform }))
        .replace(/_filesPath_/g, files)
        .replace(/_resourcesPath_/g, resourcesPath)
        .replace(/_appPublisher_/g, appPublisher)
        .replace(/_appURL_/g, appURL)
        .replace(/_appId_/g, appId)


      fs.writeFile(tmpIssPath, iconv.encode(str, 'gbk'), null, function(err) {
        if (err) return reject(err)

        // inno setup start
        innosetupCompiler(tmpIssPath, { gui: false, verbose: true }, function(err) {
          fs.unlinkSync(tmpIssPath)
          if (err) return reject(err)
          resolve(opt)
        })
      })
    })
  })
}

function getOutputName(str, data) {
  return str.replace(/\$\{(.*?)\}/g, function(a, b) {
    return data[b] || b
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> innosetupCompiler = <span class="hljs-built_in">require</span>(<span class="hljs-string">'innosetup-compiler'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">var</span> iconv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'iconv-lite'</span>)

<span class="hljs-keyword">var</span> rootPath = path.resolve(__dirname, <span class="hljs-string">'../'</span>)

<span class="hljs-comment">// `./package.json`</span>
<span class="hljs-keyword">var</span> tmpJson = <span class="hljs-built_in">require</span>(path.resolve(rootPath, <span class="hljs-string">'./package.json'</span>))

<span class="hljs-comment">// get config</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(path.resolve(rootPath, <span class="hljs-string">'config'</span>))
<span class="hljs-keyword">var</span> setupOptions = config.build.nw.setup

fs.readdir(setupOptions.files, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, files</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err

  files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName</span>) </span>{
    <span class="hljs-keyword">if</span> (!~fileName.indexOf(<span class="hljs-string">'win'</span>)) <span class="hljs-keyword">return</span>

    <span class="hljs-keyword">const</span> curPath = path.resolve(setupOptions.files, fileName)
    fs.stat(curPath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
      <span class="hljs-keyword">if</span> (err || stats.isFile()) <span class="hljs-keyword">return</span>
      <span class="hljs-keyword">if</span> (stats.isDirectory()) {
        makeExeSetup(<span class="hljs-built_in">Object</span>.assign({}, setupOptions, { <span class="hljs-attr">files</span>: curPath, <span class="hljs-attr">platform</span>: fileName }))
      }
    })
  })
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeExeSetup</span>(<span class="hljs-params">opt</span>) </span>{
  <span class="hljs-keyword">const</span> { issPath, files, outputPath, outputFileName, resourcesPath, appPublisher, appURL, appId, platform } = opt
  <span class="hljs-keyword">const</span> { name, appName, version } = tmpJson
  <span class="hljs-keyword">const</span> tmpIssPath = path.resolve(path.parse(issPath).dir, <span class="hljs-string">'_tmp.iss'</span>)

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// rewrite name, version to iss</span>
    fs.readFile(issPath, <span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, text</span>) </span>{
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)

      <span class="hljs-keyword">let</span> str = iconv.decode(text, <span class="hljs-string">'gbk'</span>)
        .replace(<span class="hljs-regexp">/_name_/g</span>, name)
        .replace(<span class="hljs-regexp">/_appName_/g</span>, appName)
        .replace(<span class="hljs-regexp">/_version_/g</span>, version)
        .replace(<span class="hljs-regexp">/_outputPath_/g</span>, outputPath)
        .replace(<span class="hljs-regexp">/_outputFileName_/g</span>, getOutputName(outputFileName, { name, version, platform }))
        .replace(<span class="hljs-regexp">/_filesPath_/g</span>, files)
        .replace(<span class="hljs-regexp">/_resourcesPath_/g</span>, resourcesPath)
        .replace(<span class="hljs-regexp">/_appPublisher_/g</span>, appPublisher)
        .replace(<span class="hljs-regexp">/_appURL_/g</span>, appURL)
        .replace(<span class="hljs-regexp">/_appId_/g</span>, appId)


      fs.writeFile(tmpIssPath, iconv.encode(str, <span class="hljs-string">'gbk'</span>), <span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)

        <span class="hljs-comment">// inno setup start</span>
        innosetupCompiler(tmpIssPath, { <span class="hljs-attr">gui</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
          fs.unlinkSync(tmpIssPath)
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)
          resolve(opt)
        })
      })
    })
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOutputName</span>(<span class="hljs-params">str, data</span>) </span>{
  <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/\$\{(.*?)\}/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> data[b] || b
  })
}</code></pre>
<h3 id="articleHeader15">4、再配置这个打包的入口</h3>
<p>在我们上文提到的打包 NW 应用的那个文件中 <code>./build/build-nw.js</code> 中的最后打包完成的回调里加个调用入口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // build windows setup
    if (config.build.noSetup) return
    if (~config.build.nw.builder.platforms.toString().indexOf('win')) require('./build-win-setup.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// build windows setup</span>
    <span class="hljs-keyword">if</span> (config.build.noSetup) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> (~config.build.nw.builder.platforms.toString().indexOf(<span class="hljs-string">'win'</span>)) <span class="hljs-built_in">require</span>(<span class="hljs-string">'./build-win-setup.js'</span>)</code></pre>
<p>这次简洁吧，4 部就完成了打包。<br>来看效果。</p>
<p>原文持续更新: <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs-2.md" rel="nofollow noreferrer" target="_blank">https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs-2.md</a>，同时，如果对您有用，帮我点个 star 吧，写这玩意不容易啊。  </p>
<p>如果你真的看到这儿了，我也就输了。。。<br>那就顺便看看 <a href="https://github.com/anchengjian/vue-nw-seed" rel="nofollow noreferrer" target="_blank">vue-nw-seed</a> 这个项目吧，里面包含了我这篇文章里的所有的点和一些别的优化。  <br>希望还有其他需求的朋友可以提 issue 或者私信讨论   </p>
<p>谢谢！您的支持是我继续更新下去的动力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 vue2 和 webpack 快速建构 NW.js 项目(3)

## 原文链接
[https://segmentfault.com/a/1190000008933762](https://segmentfault.com/a/1190000008933762)

