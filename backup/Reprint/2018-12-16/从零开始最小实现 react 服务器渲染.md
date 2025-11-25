---
title: '从零开始最小实现 react 服务器渲染' 
date: 2018-12-16 2:30:10
hidden: true
slug: 1c1ud1p632rh
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVMbjB?w=1794&amp;h=648" src="https://static.alili.tech/img/bVMbjB?w=1794&amp;h=648" alt="require" title="require" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">从零开始最小实现 react 服务器渲染</h1>
<h2 id="articleHeader1">前言</h2>
<blockquote>最近在写 koa 的时候想到，如果我部分代码提供api，部分代码支持ssr，那我应该如何写呢？（不想拆成 2个服务的情况下）<p>而且最近写的项目里面也用过一些服务端渲染，如<code>nuxt</code>，自己也搭过<code>next</code>的项目，确实开发体验都非常友好，但是友好归友好，具体又是如何实现的呢，诸位有没有考虑过？</p>
<p>本着求真务实的折腾态度，选了<code>react</code>作为研究对象（主要是<code>vue</code>写的有点多，恶心了），那下面就简单就以最小成本写一个<code>react</code>的服务端渲染 demo</p>
</blockquote>
<h2 id="articleHeader2">用到的技术栈</h2>
<p><code>react 16</code>  + <code>webpack3</code> + <code>koa2</code></p>
<p>看看它是如何实现服务端渲染的，here we go！</p>
<hr>
<h2 id="articleHeader3">为什么要用服务端渲染</h2>
<h3 id="articleHeader4">优点</h3>
<p>无非就是两点</p>
<ol>
<li>SEO 友好</li>
<li>加快首屏渲染，减少白屏时间</li>
</ol>
<h3 id="articleHeader5">那么问题来了什么是SEO</h3>
<p>直接放文章不做赘述，<a href="https://www.zhihu.com/question/52235652/answer/186088553" rel="nofollow noreferrer" target="_blank">前端后端分离，怎么解决SEO优化的问题呢？ - 知乎</a>，<br>一句话介绍就是，现在我们做的大多是SPA网站，所有页面啊数据啊都是ajax来的，搜索引擎的spider来收录网页的时候，发现全空？那么你觉得你的网站收录的权重跟效果是好还是不好？</p>
<p>而我们对SEO优化，也是下面内容所描述的核心就是：</p>
<p><strong>下面是重点！</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="让服务器把有内容的HTML返回给我们，事件的话浏览器再渲染一次来进行挂载" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">让服务器把有内容的HTML返回给我们，事件的话浏览器再渲染一次来进行挂载</code></pre>
<hr>
<h2 id="articleHeader6">搭建 koa 环境</h2>
<p>新建一个 ssr 项目，并在项目中初始化 npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir ssr &amp;&amp; cd ssr
npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">mkdir</span> ssr &amp;&amp; <span class="hljs-built_in">cd</span> ssr
npm init</code></pre>
<p>下面的代码我们用到了 <code>import</code>  <code>jsx</code> 等语法，node环境是不支持的，所以需要配置babel</p>
<p>在当前项目中新建文件 <code>server.js</code>跟<code>index.js</code>，然后</p>
<p>babel的入口， index.js代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('babel-core/register')()

require('babel-polyfill')
require('./server')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'babel-core/register'</span>)</span><span class="hljs-params">()</span></span>

<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'babel-polyfill'</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./server'</span>)</span></span>
</code></pre>
<p>我们项目的入口， server.js代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Koa from 'koa'
const app = new Koa()

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
console.log(&quot;系统启动，端口：3000&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">'koa'</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

<span class="hljs-comment">// response</span>
app.use(<span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>
})

app.listen(<span class="hljs-number">3000</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"系统启动，端口：3000"</span>)
</code></pre>
<p>根目录下新建一个.babelrc文件<br>内容是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;react&quot;, &quot;env&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"env"</span>]
}</code></pre>
<p>安装上面所需要的依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-core babel-polyfill babel-preset-env babel-preset-react nodemon --save-dev

npm i koa --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-polyfill </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babel-preset-react </span>nodemon --save-dev

npm i koa --save</code></pre>
<p>配置启动脚本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package.json

&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;nodemon index.js&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>package<span class="hljs-selector-class">.json</span>

<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"nodemon index.js"</span>,
}</code></pre>
<p>到这里你运行 <code>npm run dev</code> 打开<code>localhost:3000</code></p>
<p>你就会看到 <code>hello Koa</code>了</p>
<p>是不是很简单就起了一个服务</p>
<hr>
<h2 id="articleHeader7">安装React</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-keyword">install</span> react react-dom <span class="hljs-comment">--save</span></code></pre>
<p>在根目录下新建一个app文件夹，并在文件夹中个新建一个<code>main.js</code></p>
<p>main.js代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

export default class Home extends React.Component {
  render () {
    return <div>hello world</div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}</code></pre>
<p>修改之前server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app/main'

const app = new Koa()

// response
app.use(ctx => {
  let str = renderToString(<App />)

  ctx.body = str
})

app.listen(3000)

console.log('系统启动，端口：8080')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">'koa'</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/main'</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

<span class="hljs-comment">// response</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> str = renderToString(&lt;App /&gt;)

  ctx.body = str
})

app.listen(<span class="hljs-number">3000</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'系统启动，端口：8080'</span>)
</code></pre>
<p>这个时候再 <code>npm run dev</code><br>你就会看到屏幕上出现<code>hello world</code></p>
<p>再打开chrome 开发者工具查看我们的请求：<br><span class="img-wrap"><img data-src="/img/bV2HKn?w=686&amp;h=392" src="https://static.alili.tech/img/bV2HKn?w=686&amp;h=392" alt="请求" title="请求" style="cursor: pointer;"></span></p>
<p>我们的最简单的react组件变成str传了进来</p>
<p>这里我们用到了一个方法：<br><a href="https://reactjs.org/docs/react-dom-server.html#rendertostring" rel="nofollow noreferrer" target="_blank">renderToString</a> – 其实就是将组件渲染成字符串</p>
<p>目前为止，我们都还没有给组件加上事件等交互行为，下面那让我们来试一下</p>
<p>修改main.js的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

export default class Home extends React.Component {
  render () {
    return <div onClick={() => window.alert(123)}>hello world</div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> window.alert(123)}&gt;hello world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}</code></pre>
<p>再刷新一下我们的页面，，咦，是不是没有什么卵用</p>
<blockquote>那是因为后端只能讲组件渲染成一串html的字符串，事件绑定等事情都是需要在浏览器端执行的</blockquote>
<p>那事件我们改怎么绑定上去呢？</p>
<p>那你肯定就会猜到，既然服务器渲染出来的是一串html，挂载事件的方式是不是在浏览器重新渲染一次就好了呢</p>
<p>说干就干</p>
<hr>
<h2 id="articleHeader8">配制webpack</h2>
<p>在根目录下面新建一个 webpack.config.js<br>下面是webpack.config.js的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    main: './app/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx?$/,
        loaders: ['babel-loader'],
      }
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">main</span>: <span class="hljs-string">'./app/index.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'public'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>]
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'babel-loader'</span>],
      }
    ]
  }
}
</code></pre>
<p>上面的配置将entry设置成了app/index.js文件</p>
<p>那我们就创建一个</p>
<p>下面是app/index.js的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Demo from './main'
import ReactDOM from 'react-dom'
import React from 'react'
ReactDOM.render(<Demo />, document.getElementById('root'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Demo <span class="hljs-keyword">from</span> <span class="hljs-string">'./main'</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Demo</span> /&gt;</span>, document.getElementById('root'))</span></code></pre>
<p>因为浏览器渲染需要将根组件挂载到某个dom节点上，所以给我们的react代码设置一个入口</p>
<p>这个时候就有一个问题，就是，document对象node环境下并不存在，那怎么解决的呢？</p>
<p>不存在？不存在那我就不用就好了，SSR核心就是让请求的url里面返回具体HTML内容，事件什么的并不care，那么我就把根组件直接<code>renderToString</code><br>返回出来就好了呗</p>
<p>下面修改我们的服务代码，让代码支持服务器渲染</p>
<p>新增一点依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i --save koa-static koa-views ejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">cnpm i --<span class="hljs-built_in">save</span> koa-<span class="hljs-keyword">static</span> koa-views ejs</code></pre>
<ul>
<li>koa-static： 处理静态文件的中间件</li>
<li>koa-views： 配置模板的中间件</li>
<li>ejs：一个模板引擎</li>
</ul>
<p>修改<code>server.js</code>的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import views from 'koa-views'
import path from 'path'

import Demo from './app/main'
const app = new Koa()
// 将/public文件夹设置为静态路径
app.use(require('koa-static')(__dirname + '/public'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve(__dirname, './views'), { map: { html: 'ejs' } }))

// response
app.use(async ctx => {
  let str = renderToString(<Demo />)
  await ctx.render('index', {
    root: str
  })
})

app.listen(3000)

console.log('系统启动，端口：8080')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">'koa'</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>
<span class="hljs-keyword">import</span> views <span class="hljs-keyword">from</span> <span class="hljs-string">'koa-views'</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>

<span class="hljs-keyword">import</span> Demo <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/main'</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-comment">// 将/public文件夹设置为静态路径</span>
app.use(<span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-static'</span>)(__dirname + <span class="hljs-string">'/public'</span>))
<span class="hljs-comment">// 将ejs设置为我们的模板引擎</span>
app.use(views(path.resolve(__dirname, <span class="hljs-string">'./views'</span>), { <span class="hljs-attr">map</span>: { <span class="hljs-attr">html</span>: <span class="hljs-string">'ejs'</span> } }))

<span class="hljs-comment">// response</span>
app.use(<span class="hljs-keyword">async</span> ctx =&gt; {
  <span class="hljs-keyword">let</span> str = renderToString(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Demo</span> /&gt;</span>)
  await ctx.render('index', {
    root: str
  })
})

app.listen(3000)

console.log('系统启动，端口：8080')
</span></code></pre>
<p>下面新建我们的渲染模板<br>新建一个views文件夹</p>
<p>里面新建一个index.html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <base href=&quot;/client&quot;>
</head>
<body>
    <div id=&quot;root&quot;><%- root %></div>
    <script src=&quot;/main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/client"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%-</span></span></span><span class="ruby"> root </span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>这个 <code>html</code> 里面可以放一些变量，比如这个<code>&lt;%- root %&gt;</code>，就是等下要放renderToString结果的地方<br><code>/main.js</code>则是react构建出来的代码</p>
<p>下面直接来测试一下我们的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 在 package.json里面
新增：
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;nodemon index.js&quot;,
    &quot;build&quot;: &quot;webpack&quot;
  },

2. 运行 npm run build， 构建出我们的react代码

3. npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">1</span>. 在 package.json里面
新增：
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"nodemon index.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>
  },

<span class="hljs-number">2</span>. 运行 npm <span class="hljs-keyword">run</span><span class="bash"> build， 构建出我们的react代码
</span>
<span class="hljs-number">3</span>. npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>点击一下代码，是不是会 <code>alert(123)</code></p>
<blockquote>
<img src="https://static.alili.techundefined" class="emoji" alt="tada" title="tada"> 撒花，恭喜你，一个最简单服务器渲染就已经完成</blockquote>
<p>到这里核心的思想就都已经讲完了，总结来说就下面三点：</p>
<ol>
<li>起一个node服务</li>
<li>把<code>react</code> 根组件 <code>renderToString</code>渲染成字符串一起返回前端</li>
<li>前端再重新<code>render</code>一次</li>
</ol>
<p><strong>原理就是这么简单</strong></p>
<p>但是具体开发的时候还会有各种各样的需求，比如：</p>
<ol>
<li>不可能我每次改完代码都重新构建看效果吧 =&gt; <code>需要 实时构建</code>
</li>
<li>create-react-app 都是热更新，你还要刷新是不是太蠢了 =&gt; <code>需要支持热更新</code>
</li>
<li>其他一些配套的周边，如： <code>react-router</code>, <code>redux</code> 或者<code>mobx</code>怎么支持呢 =&gt; <code>需要完善的生态</code>
</li>
</ol>
<p>.etc</p>
<p>这些问题都是用完 官方脚手架之后就回不去了的，所以更多的配置可以参考下面的repo（是一个工具链完善的最小实现），欢迎提PR</p>
<p><a href="https://github.com/ws456999/koa-react-ssr-starter" rel="nofollow noreferrer" target="_blank">GitHub - ws456999/koa-react-ssr-starter: to understand &amp;&amp; to explain how react ssr works</a></p>
<p>目前你可以在里面找到 <code>react + react-router + mobx + postcss + 热更新</code>的配置，除了<code>react-router</code>的配置有些差别，其他都跟<code>client端</code>差别不大</p>
<p>That’s all.</p>
<h2 id="articleHeader9">参考链接</h2>
<p><a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-17%E9%80%9A%E8%BF%87Node.jsAPI%E5%90%AF%E5%8A%A8Webpack.html" rel="nofollow noreferrer" target="_blank">3-17 通过 Node.js API 启动 Webpack · 深入浅出 Webpack</a><br><a href="http://nekomiao.me/2017/05/23/koa2-react-webpack-deployment/" rel="nofollow noreferrer" target="_blank">Koa2 + React + Webpack热加载部署方案 | Nekoの喵窝</a><br><a href="https://segmentfault.com/q/1010000012738312">webpack - koa服务端热更新问题 - SegmentFault</a><br><a href="https://www.cnblogs.com/chris-oil/p/6239097.html" rel="nofollow noreferrer" target="_blank">转 nodemon 基本配置与使用 - {前端开发} - 博客园</a><br><a href="https://segmentfault.com/a/1190000008258779">React 服务端渲染缓慢原因浅析 - 某熊的全栈之路 - SegmentFault</a><br><a href="https://reactjs.org/docs/react-dom-server.html#rendertostring" rel="nofollow noreferrer" target="_blank">ReactDOMServer - React</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始最小实现 react 服务器渲染

## 原文链接
[https://segmentfault.com/a/1190000012998848](https://segmentfault.com/a/1190000012998848)

