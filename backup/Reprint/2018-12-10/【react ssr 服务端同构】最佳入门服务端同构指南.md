---
title: '【react ssr 服务端同构】最佳入门服务端同构指南' 
date: 2018-12-10 2:30:07
hidden: true
slug: fkmbngg5o8w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">【react ssr 服务端同构】最佳入门服务端同构指南</h2>
<blockquote>这个是针对小白入门的文章，大神请绕过。<br>本文首发： <a href="http://shudong.wang/article/101" rel="nofollow noreferrer" target="_blank">http://shudong.wang/article/101</a>
</blockquote>
<h2 id="articleHeader1">什么是服务端同构 ssr</h2>
<p>一套代码既可以在服务端运行又可以在客户端运行，这就是同构应用。简而言之, 就是服务端直出和客户端渲染的组合, 能够充分结合两者的优势，并有效避免两者的不足。</p>
<p>概括地说，同构就是服务端（Node）替客户端请求接口，获取到数据后，将有数据和结构的页面渲染好之后返回给客户端，这样避免了客户端页面首次渲染，同时服务端RPC比客户端请求要快。</p>
<p>可以看看这个文章 <a href="https://www.zhihu.com/question/52235652/answer/186088553" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>
<h2 id="articleHeader2">为什么要用服务端渲染</h2>
<p>性能: 降低首屏渲染时间<br>SEO: seo友好</p>
<h2 id="articleHeader3">代码表现没有同构之前</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013853622?w=397&amp;h=148" src="https://static.alili.tech/img/remote/1460000013853622?w=397&amp;h=148" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">同构之后</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013853623?w=925&amp;h=360" src="https://static.alili.tech/img/remote/1460000013853623?w=925&amp;h=360" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013853624?w=2184&amp;h=954" src="https://static.alili.tech/img/remote/1460000013853624?w=2184&amp;h=954" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>如果搜索引擎蜘蛛来到你的网站，网站返回的的内容几乎没有，这就不太友好了，它就无功而返，相对你的网站就很难被搜索引擎收入。</blockquote>
<h2 id="articleHeader5">来看看一般实现方案</h2>
<blockquote>一般配合后端框架 如： koa  express 用什么自己选择</blockquote>
<h2 id="articleHeader6">来来来，直接体验一把 最简单的react ssr 配置</h2>
<blockquote>如果你想体验 ssr 渲染，最好理解请看这个分支<br>分支 simple-ssr</blockquote>
<p><a href="https://github.com/wsdo/react-ssr-kit/tree/simple-ssr" rel="nofollow noreferrer" target="_blank">demo 地址</a></p>
<h2 id="articleHeader7">聊聊思路</h2>
<blockquote>这个demo 采用的express react webpack 最基础的同构，后续会慢慢增加功能<br>每个功能尽量在一个分支，方便大家查看<br>react 有个成熟的解决方案 next ，一般这种方案，不适合迁移，灵活度不高 和 vue 的ssr nuxt 类似</blockquote>
<h2 id="articleHeader8">首先配置webpack</h2>
<p>这个配置主要把文件打包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const path = require('path')

module.exports = {
    target: &quot;node&quot;,
    entry: {
        app: path.join(__dirname, '主要程序入口文件') //server-entry.js
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="webpack.config.server">
const path = require(<span class="hljs-string">'path'</span>)

module.exports = {
    targe<span class="hljs-variable">t:</span> <span class="hljs-string">"node"</span>,
    entry: {
        app: path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'主要程序入口文件'</span>) //server-entry.js
    },
    outpu<span class="hljs-variable">t:</span> {
        filename: <span class="hljs-string">'server-entry.js'</span>,
        path: path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'../dist'</span>),
        publicPath: <span class="hljs-string">'/public'</span>,
        libraryTarge<span class="hljs-variable">t:</span> <span class="hljs-string">'commonjs2'</span>
    },
    module: {
        rule<span class="hljs-variable">s:</span> [
            {
                tes<span class="hljs-variable">t:</span> /.jsx$/,
                loader: <span class="hljs-string">'babel-loader'</span>
            },
            {
                tes<span class="hljs-variable">t:</span> /.js$/,
                loader: <span class="hljs-string">'babel-loader'</span>,
                exclude: [
                    path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'../node_modules'</span>)
                ]
            }
        ]
    }
}</code></pre>
<blockquote>这个主要把react 导出</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import App from './App.js'

export default <App />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="server-entry.js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> &lt;App /&gt;</code></pre>
<h2 id="articleHeader9">重点来了，主要是server.js</h2>
<h3 id="articleHeader10">使用 react-dom/server  把导出的文件编译成字符串,替换到我们使用的模板</h3>
<p>当我们访问url 的时候，让express去接管</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('*', function (req, res) {
  const reactTpl = ReactSSR.renderToString(serverEntry)
  res.send(template.replace('<!-- stark -->', reactTpl))
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>app.get('*', function (req, res) {
  const reactTpl = ReactSSR.renderToString(serverEntry)
  res.send(template.replace('<span class="hljs-comment">&lt;!-- stark --&gt;</span>', reactTpl))
})</code></pre>
<h3 id="articleHeader11">全部文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const app = express()

const serverEntry = require('../dist/server-entry').default
// 里面读取的是编译后的文件
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
// 设置public加在的静态目录
app.use('/public', express.static(path.join(__dirname, '../dist')))


app.get('*', function (req, res) {
  const reactTpl = ReactSSR.renderToString(serverEntry)
  res.send(template.replace('<!-- stark -->', reactTpl))
})

app.listen(3006, function () {
  console.log('====================================')
  console.log('open url view website')
  console.log('====================================')
  console.log(&quot;http://localhost:3006&quot;)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="server.js"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> ReactSSR = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom/server'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> app = express()

<span class="hljs-keyword">const</span> serverEntry = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../dist/server-entry'</span>).default
<span class="hljs-comment">// 里面读取的是编译后的文件</span>
<span class="hljs-keyword">const</span> template = fs.readFileSync(path.join(__dirname, <span class="hljs-string">'../dist/index.html'</span>), <span class="hljs-string">'utf8'</span>)
<span class="hljs-comment">// 设置public加在的静态目录</span>
app.use(<span class="hljs-string">'/public'</span>, express.static(path.join(__dirname, <span class="hljs-string">'../dist'</span>)))


app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> reactTpl = ReactSSR.renderToString(serverEntry)
  res.send(template.replace(<span class="hljs-string">'&lt;!-- stark --&gt;'</span>, reactTpl))
})

app.listen(<span class="hljs-number">3006</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'===================================='</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'open url view website'</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'===================================='</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"http://localhost:3006"</span>)
})
</code></pre>
<h2 id="articleHeader12">使用node 启动这个express 服务就会把项目提前渲染到页面上</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013853625?w=734&amp;h=198" src="https://static.alili.tech/img/remote/1460000013853625?w=734&amp;h=198" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">理解了后，去下载demo吧，嘿嘿，顺便点个star，然后尝试体验一把，顺便尝试把自己的项目改装一下吧</h2>
<h2 id="articleHeader14">如果感兴趣持续关注，后续进阶</h2>
<p>[*] 本地开发服务端重构<br>[*] 本地开发热更新同步到服务端渲染<br>[*] 项目目录架构</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【react ssr 服务端同构】最佳入门服务端同构指南

## 原文链接
[https://segmentfault.com/a/1190000013853617](https://segmentfault.com/a/1190000013853617)

