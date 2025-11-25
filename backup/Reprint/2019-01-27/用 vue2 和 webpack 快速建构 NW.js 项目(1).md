---
title: '用 vue2 和 webpack 快速建构 NW.js 项目(1)' 
date: 2019-01-27 2:30:59
hidden: true
slug: yulhpehs67e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>经过实践和学习，发现本篇文章部分内容<strong>已经过时</strong>，请看我的关于 Vue 和 NW.js 的 <strong> <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs-2.md" rel="nofollow noreferrer" target="_blank">最新文章</a> </strong> 和相关实践项目 <a href="https://github.com/anchengjian/vue-nw-seed" rel="nofollow noreferrer" target="_blank">vue-nw-seed</a> 。</p></blockquote>
<hr>
<h2 id="articleHeader0">使用到的技能点</h2>
<ul>
<li><p>vue2</p></li>
<li><p>webpack</p></li>
<li><p>NW.js</p></li>
<li><p>Node.js</p></li>
</ul>
<h2 id="articleHeader1">一、前言</h2>
<p>先讲一下这个项目的由来。我司要新上一个产品，是面向教育领域的一个东西，要求快速开发又必须要兼容 <code>XP</code> ，所以就选 NW.js 来做桌面客户端。同时，前端的轮子方面，开始尝试在面向用户的业务上应用 vuejs 。   <br>在这个过程中，也踩到了一些坑，也学到了一些新的小技巧，分享出来给大家参考一下。</p>
<p>有同学问，为啥不直接出一个完整项目？   <br>我想等 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> 升级完 webpack2 的时候再来一个懒人 seed 项目包吧</p>
<h2 id="articleHeader2">二、vue&amp;webpack 项目搭建</h2>
<p>首先用 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 快速的搭建一个 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> 模板项目，省心又省事儿。<br>这部分不做过多介绍，很容易的。<br>方便新人理解和学习，给个参考链接 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs-temp...</a></p>
<h2 id="articleHeader3">三、NW.js 的建构</h2>
<p>整个 nw 建构是基于 vue&amp;webpack 这个前置步骤的项目的。   <br>好了，我们开始。</p>
<h3 id="articleHeader4">1、先用 npm 安装 NW.js</h3>
<h4>1) 能顺利翻墙</h4>
<p>NW.js 开发者们提供了 <a href="https://github.com/nwjs/npm-installer" rel="nofollow noreferrer" target="_blank">nwjs/npm-installer</a>   <br>如果您的网速较好，翻墙顺利的话，可以直接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install nw --nwjs_build_type=sdk --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">npm</span> <span class="hljs-comment">install</span> <span class="hljs-comment">nw</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">nwjs_build_type=sdk</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">save</span></code></pre>
<h4>2) 网络不太好</h4>
<p>当然我的网络情况就不是很好，233333   <br>这时候可以先下载好 nw 的 sdk 包到本地，墙外地址：<a href="https://dl.nwjs.io/v0.20.1/nwjs-sdk-v0.20.1-win-x64.zip" rel="nofollow noreferrer" target="_blank">https://dl.nwjs.io/v0.20.1/nwjs-sdk-v0.20.1-win-x64.zip</a> （截至目前现在最新的sdk版本是 <code>0.20.1</code> ，系统环境是 win10 x64）当然，我作为一个老司机，也有不可推卸的责任，我把我这个包也发到了百度云上了：链接: <a href="http://pan.baidu.com/s/1i52ZO8l" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1i52ZO8l</a> 密码: 3tt2<br>做了点微小的贡献，谢谢大家。</p>
<p>我已经尝试过 <code>file://</code> 那个方法不能用了，换server模式吧</p>
<p>切换命令行目录到当前sdk包所在位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\anchengjian\Downloads> mkdir 0.20.1
C:\Users\anchengjian\Downloads> cp nwjs-sdk-v0.20.1-win-x64.zip ./0.20.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\a</span>nchengjian<span class="hljs-symbol">\D</span>ownloads&gt; mkdir 0.20.1
C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\a</span>nchengjian<span class="hljs-symbol">\D</span>ownloads&gt; cp nwjs-sdk-v0.20.1-win-x64.zip ./0.20.1</code></pre>
<p>再开启 server 服务，如果有python直接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\anchengjian\Downloads> python -m SimpleHTTPServer 9999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\a</span>nchengjian<span class="hljs-symbol">\D</span>ownloads&gt; python -m SimpleHTTPServer 9999</code></pre>
<p>或者换个姿势</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\anchengjian\Downloads> npm install http-server -g
C:\Users\anchengjian\Downloads> http-server -p 9999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\a</span>nchengjian<span class="hljs-symbol">\D</span>ownloads&gt; npm install http-server -g
C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\a</span>nchengjian<span class="hljs-symbol">\D</span>ownloads&gt; http-server -p 9999</code></pre>
<p>服务开好就可以继续下一步了，切换目录到项目代码的目录下。</p>
<p>先创建一个 <code>.npmrc</code> 文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nwjs_build_type=sdk
NWJS_URLBASE=http://localhost:9999/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">nwjs_build_type</span>=sdk
<span class="hljs-attr">NWJS_URLBASE</span>=http://localhost:<span class="hljs-number">9999</span>/</code></pre>
<p>再然后直接 npm 安装 nw</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="E:\code\vue-webpack-nw> npm i nw --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">E:\<span class="hljs-built_in">code</span>\vue-webpack-nw&gt; npm i nw --<span class="hljs-keyword">save</span></code></pre>
<p>这时，如无其他问题，已经装好了。</p>
<h3 id="articleHeader5">2、这时候开始增补nw相关的建构</h3>
<p>下文直接以文件名为小标题</p>
<h4>1) package.json</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vue-webpack-nw&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;vue-webpack-nw&quot;,
  &quot;author&quot;: &quot;anchengjian <anchengjian@gmail.com>&quot;,
  &quot;private&quot;: true,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;lint&quot;: &quot;eslint --ext .js,.vue src&quot;
  },
  &quot;dependencies&quot;: {
    // ...
  },
  &quot;devDependencies&quot;: {
    // ...
  },
  &quot;engines&quot;: {
    &quot;node&quot;: &quot;>= 7.0.0&quot;,
    &quot;npm&quot;: &quot;>= 4.0.0&quot;
  },
  // 以下为 nw 的配置新加内容
  &quot;main&quot;: &quot;./index.html&quot;,
  &quot;window&quot;: {
    &quot;title&quot;: &quot;nw-vue-webpack2&quot;,
    &quot;toolbar&quot;: true,
    &quot;frame&quot;: true,
    &quot;width&quot;: 1200,
    &quot;height&quot;: 800,
    &quot;min_width&quot;: 800,
    &quot;min_height&quot;: 500
  },
  &quot;webkit&quot;: {
    &quot;plugin&quot;: true
  },
  &quot;node-remote&quot;: &quot;http://localhost:8080&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"vue-webpack-nw"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"vue-webpack-nw"</span>,
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"anchengjian &lt;anchengjian@gmail.com&gt;"</span>,
  <span class="hljs-string">"private"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint --ext .js,.vue src"</span>
  },
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-string">"engines"</span>: {
    <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;= 7.0.0"</span>,
    <span class="hljs-string">"npm"</span>: <span class="hljs-string">"&gt;= 4.0.0"</span>
  },
  <span class="hljs-comment">// 以下为 nw 的配置新加内容</span>
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"./index.html"</span>,
  <span class="hljs-string">"window"</span>: {
    <span class="hljs-string">"title"</span>: <span class="hljs-string">"nw-vue-webpack2"</span>,
    <span class="hljs-string">"toolbar"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"frame"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"width"</span>: <span class="hljs-number">1200</span>,
    <span class="hljs-string">"height"</span>: <span class="hljs-number">800</span>,
    <span class="hljs-string">"min_width"</span>: <span class="hljs-number">800</span>,
    <span class="hljs-string">"min_height"</span>: <span class="hljs-number">500</span>
  },
  <span class="hljs-string">"webkit"</span>: {
    <span class="hljs-string">"plugin"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-string">"node-remote"</span>: <span class="hljs-string">"http://localhost:8080"</span>
}</code></pre>
<h4>2) build/webpack.base.conf.js</h4>
<p>增加基础配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // ...
  // 以下为新加内容
  target: 'node-webkit'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// 以下为新加内容</span>
  target: <span class="hljs-string">'node-webkit'</span>
}</code></pre>
<h4>3) build/dev-nw.js</h4>
<p>新建一个名为 <code>dev-nw.js</code> 的文件<br>内容如下，直接copy吧。<br>原理我就不讲了，大致实现的功能是:   <br>先用 <code>Node.js</code> 修改当前项目 <code>index.html</code> 内容为打包出来的 <code>index.html</code>，然后再用 nw 打开当前项目目录，当关闭或者报错的时候再还原 <code>index.html</code> ，当前，你直接 kill 进程，这个还原就会出问题。自己看着改吧，233333</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const url = require('url')
const fs = require('fs')
const http = require('http')
const exec = require('child_process').exec
const rootPath = path.resolve(__dirname, '../')
const nwPath = require('nw').findpath()

// 修改index.html文件中的css和js的地址
const indexHtmlPath = path.resolve(__dirname, '../index.html')
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8').toString()

// 退出时恢复原样子
process.on('exit', exitHandle)
process.on('uncaughtException', exitHandle)

function exitHandle(e) {
  fs.writeFileSync(indexHtmlPath, indexHtmlContent, 'utf-8')
  console.log('233333,bye~~~')
}

// get uri
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var port = process.env.PORT || config.dev.port
var uri = `http://localhost:${port}/`

// start lauch NW.js
requestGet(uri, htmlText => {
  htmlText = htmlText.replace('src=&quot;/', `src=&quot;${uri}`).replace('href=&quot;/', `href=&quot;${uri}`)
  fs.writeFileSync(indexHtmlPath, htmlText, 'utf-8')

  let runNwDev = exec(`${nwPath} ./`, { cwd: rootPath }, (err, stdout, stderr) => {
    if (err) process.exit(0)
  })

  runNwDev.stdout.on('data', (data) => console.log(data))
})

function requestGet(path, callback) {
  console.log('start with request: ', path)
  const options = Object.assign({ method: 'GET' }, url.parse(path))
  const req = http.request(options, res => {
    let body = []
    res.on('data', chunk => body.push(chunk))
    res.on('end', () => callback(Buffer.concat(body).toString()))
  })
  req.on('error', e => console.log('problem with request: ' + e.message))
  req.write('')
  req.end()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-keyword">const</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec
<span class="hljs-keyword">const</span> rootPath = path.resolve(__dirname, <span class="hljs-string">'../'</span>)
<span class="hljs-keyword">const</span> nwPath = <span class="hljs-built_in">require</span>(<span class="hljs-string">'nw'</span>).findpath()

<span class="hljs-comment">// 修改index.html文件中的css和js的地址</span>
<span class="hljs-keyword">const</span> indexHtmlPath = path.resolve(__dirname, <span class="hljs-string">'../index.html'</span>)
<span class="hljs-keyword">const</span> indexHtmlContent = fs.readFileSync(indexHtmlPath, <span class="hljs-string">'utf-8'</span>).toString()

<span class="hljs-comment">// 退出时恢复原样子</span>
process.on(<span class="hljs-string">'exit'</span>, exitHandle)
process.on(<span class="hljs-string">'uncaughtException'</span>, exitHandle)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exitHandle</span>(<span class="hljs-params">e</span>) </span>{
  fs.writeFileSync(indexHtmlPath, indexHtmlContent, <span class="hljs-string">'utf-8'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'233333,bye~~~'</span>)
}

<span class="hljs-comment">// get uri</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">if</span> (!process.env.NODE_ENV) process.env.NODE_ENV = <span class="hljs-built_in">JSON</span>.parse(config.dev.env.NODE_ENV)
<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port
<span class="hljs-keyword">var</span> uri = <span class="hljs-string">`http://localhost:<span class="hljs-subst">${port}</span>/`</span>

<span class="hljs-comment">// start lauch NW.js</span>
requestGet(uri, htmlText =&gt; {
  htmlText = htmlText.replace(<span class="hljs-string">'src="/'</span>, <span class="hljs-string">`src="<span class="hljs-subst">${uri}</span>`</span>).replace(<span class="hljs-string">'href="/'</span>, <span class="hljs-string">`href="<span class="hljs-subst">${uri}</span>`</span>)
  fs.writeFileSync(indexHtmlPath, htmlText, <span class="hljs-string">'utf-8'</span>)

  <span class="hljs-keyword">let</span> runNwDev = exec(<span class="hljs-string">`<span class="hljs-subst">${nwPath}</span> ./`</span>, { <span class="hljs-attr">cwd</span>: rootPath }, (err, stdout, stderr) =&gt; {
    <span class="hljs-keyword">if</span> (err) process.exit(<span class="hljs-number">0</span>)
  })

  runNwDev.stdout.on(<span class="hljs-string">'data'</span>, (data) =&gt; <span class="hljs-built_in">console</span>.log(data))
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestGet</span>(<span class="hljs-params">path, callback</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start with request: '</span>, path)
  <span class="hljs-keyword">const</span> options = <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span> }, url.parse(path))
  <span class="hljs-keyword">const</span> req = http.request(options, res =&gt; {
    <span class="hljs-keyword">let</span> body = []
    res.on(<span class="hljs-string">'data'</span>, chunk =&gt; body.push(chunk))
    res.on(<span class="hljs-string">'end'</span>, () =&gt; callback(Buffer.concat(body).toString()))
  })
  req.on(<span class="hljs-string">'error'</span>, e =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'problem with request: '</span> + e.message))
  req.write(<span class="hljs-string">''</span>)
  req.end()
}</code></pre>
<h4>4) build/dev-server.js</h4>
<p>在其最末尾修改一下，不需要打开浏览器，而是需要其代码驱动打开nw.exe</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    // opn(uri)

    // modify by anchengjian
    // 这儿不需要打开浏览器，只用打开 nw 就行
    require('./dev-nw')
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-comment">// when env is testing, don't need open it</span>
  <span class="hljs-keyword">if</span> (process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> !== <span class="hljs-string">'testing'</span>) {
    <span class="hljs-comment">// opn(uri)</span>

    <span class="hljs-comment">// modify by anchengjian</span>
    <span class="hljs-comment">// 这儿不需要打开浏览器，只用打开 nw 就行</span>
    require(<span class="hljs-string">'./dev-nw'</span>)
  }</code></pre>
<h4>5) build/dev-client.js</h4>
<p>这个时候直接在执行 <code>npm run dev</code> 正常的话是可以用 nw.exe 打开当前项目代码，但接着就可以看到有一个报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET chrome-extension://hbdgiajgpfdfalonjhdcdmbcmillcjed/__webpack_hmr net::ERR_FILE_NOT_FOUND" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">GET chrome-<span class="hljs-symbol">extension:</span>/<span class="hljs-regexp">/hbdgiajgpfdfalonjhdcdmbcmillcjed/</span>__webpack_hmr <span class="hljs-symbol">net:</span><span class="hljs-symbol">:ERR_FILE_NOT_FOUND</span></code></pre>
<p>原因也就是webpack请求的时候根据当前页面地址来的，没想到还有 nw 这么个环境   <br>处理方法也简单，更改 <code>webpack-hot-middleware</code> 的配置，让其每次发请求的时候用<code>__webpack_public_path__</code> 或者全局变量。   <br>同时请注意<code>path=__webpack_hmr</code></p>
<p>改<code>hotClient</code>这一行代码为这样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hotClient = require('webpack-hot-middleware/client?noInfo=true&amp;reload=true&amp;dynamicPublicPath=true&amp;path=__webpack_hmr')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> hotClient = require(<span class="hljs-symbol">'webpack</span>-hot-middleware/client?noInfo=<span class="hljs-literal">true</span>&amp;reload=<span class="hljs-literal">true</span>&amp;dynamicPublicPath=<span class="hljs-literal">true</span>&amp;path=__webpack_hmr')</code></pre>
<p>这样配置的文档来源： <a href="https://github.com/glenjamin/webpack-hot-middleware#documentation" rel="nofollow noreferrer" target="_blank">webpack-hot-middleware</a></p>
<h4>6) config/index.js</h4>
<p>同时需要更改开发者模式下 assetsPublicPath 的配置，不然<code>__webpack_public_path__</code>依然为<code>/</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // ...
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://localhost:8080/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...</span>
  dev: {
    <span class="hljs-attr">env</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
    <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">'http://localhost:8080/'</span>,
    <span class="hljs-attr">proxyTable</span>: {},
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p>至此，一个完整的开发建构就出来，后面慢慢更新产品模式的打包建构。   </p>
<p>原文持续更新: <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs.md" rel="nofollow noreferrer" target="_blank">https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs.md</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 vue2 和 webpack 快速建构 NW.js 项目(1)

## 原文链接
[https://segmentfault.com/a/1190000008281924](https://segmentfault.com/a/1190000008281924)

