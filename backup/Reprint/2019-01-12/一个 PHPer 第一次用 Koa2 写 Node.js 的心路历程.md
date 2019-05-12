---
title: '一个 PHPer 第一次用 Koa2 写 Node.js 的心路历程' 
date: 2019-01-12 2:30:25
hidden: true
slug: qouq2lehwb
categories: [reprint]
---

{{< raw >}}

                    
<p>学了一段时间的 js 了，突然想实践一下。正好公司有个小的项目要做，就顺手拿 Koa2 来做了。真是不做不知道，做了想不到。踩了一堆新手坑。</p>
<h2 id="articleHeader0">初次接触 Koa2</h2>
<p>在知道 Koa2 之前，我也了解过 Express，可惜并没有实战用过。后来大家都说 Koa 是一个比 Express 更牛X的东西，于是在好（作）奇（死）心作祟下，直接去用 Koa2 了。后来证明的确是作死，原本用 PHP 一天就能写完东西，愣是让我搞了三天。</p>
<h3 id="articleHeader1">安装</h3>
<p>最近 Node.js V8 发布了，原生支持 <code>async</code> 和 <code>await</code> 调用了，所以直接把 Node.js 升级了一下。</p>
<p>根据 Koa2 的教程，安装很简单，我是使用的 yarn 的（还真是比 npm 快）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add koa" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add koa</code></pre>
<p>默认就装了 Koa 2.2。然后装完了，其实我是一脸懵逼的，文档上说这样用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()
 
// response 
app.use(ctx => {
  ctx.body = 'Hello Koa'
})
 
app.listen(3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
 
<span class="hljs-comment">// response </span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>
})
 
app.listen(<span class="hljs-number">3000</span>)</code></pre>
<p>我照着代码写了下来，的确成功了。可是，难不成我要把所有的逻辑写在 <code>app.use</code> 里？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009733613?w=521&amp;h=534" src="https://static.alili.tech/img/remote/1460000009733613?w=521&amp;h=534" alt="a" title="a" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">中间件</h3>
<p>我感觉我受到了惊吓，吓得我赶紧往下看文档。原来 Koa2 是一个中间件模型。<code>app.use</code> 可以有很多，每一个 <code>app.use</code> 会注册一个中间件，这个中间件是具体做事情的。每个中间件是依次执行的。一个经典的洋葱图可以解释这一切。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009733614?w=478&amp;h=435" src="https://static.alili.tech/img/remote/1460000009733614?w=478&amp;h=435" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>那么，上面的实例就可以改造成这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) => {
  await next()
  ctx.body = 'Hello Koa'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">await</span> next()
  ctx.body = <span class="hljs-string">'Hello Koa'</span>
})</code></pre>
<p>按照上面的洋葱头，以心为单位，next的两侧的语句分别在洋葱的左侧和右侧进行执行，颇像 <code>Laravel</code> 的中间件。</p>
<p>就这样，我知道了，所有的操作不必写在同一个 <code>app.use</code> 里。可是，下一个问题来了，我要把所有的逻辑都写再一个文件里？说好的 MVC 呢？没有 MVC 也叫做框架？Are you kidding me?（好吧后来发现原来 Koa2 并不是一个装置做网站的框架）</p>
<p>既然没有 MVC，那就自己动手丰衣足食吧。</p>
<h3 id="articleHeader3">路由</h3>
<p>首先要处理的就是路由的问题。不过，由于是第一次用这货写项目，时间紧，（伪）任务重，看了文档后发现，原来还有一个中间件列表的链接，里面有各种开源的中间件。我想你们一定隔着屏幕都能听到我发出杠铃般的笑声了。有一个中间件非常棒，叫做 <a href="https://www.npmjs.com/package/koa-router" rel="nofollow noreferrer" target="_blank">koa-router</a>。这货是这么用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Koa = require('koa')
var Router = require('koa-router')
 
var app = new Koa()
var router = new Router()
 
router.get('/', function (ctx, next) {
  // ctx.router available
});
 
app.use(router.routes())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">var</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
 
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> Router()
 
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
  <span class="hljs-comment">// ctx.router available</span>
});
 
app.use(router.routes())</code></pre>
<p>虽然是把逻辑和 <code>app.use</code> 分开了，但是，好像还是没有解决刚才的问题。说好的 MVC 也没有出现。于是我再去找了找，居然没有 <code>Controller</code> 的中间件。我一下就懵逼了，玩脱了？还有一天啊我的宝贝儿。经过我半秒钟的慎重思考，我还是用 <code>koa-router</code> 自己实现一个控制器吧。</p>
<h3 id="articleHeader4">Controller</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')

function addRoutes(router, routes) {
  for (let route in routes) {
    switch (route.method) {
      case: 'post':
        router.post(route.uri, route.fn)
        console.log(`Register post url: ${route.uri}`)
        break
      case: 'get':
        router.get(route.uri, route.fn)
        console.log(`Register get url: ${route.uri}`)
        break
      default: 
        console.log(`Invalid url: ${route}`)
    }
  }
}

function addControllers(router) {
  let files = fs.readdirSync(__dirname + '/controllers')

  let controllerFiles = files.filter(f => {
    return f.endsWith('.js')
  })

  for (let controllerFile in controllerFiles) {
    console.log(`process controller: ${controllerFile}...`)
    let routes = require(__dirname + '/controllers')
    addRoutes(router, routes)
  }
}

module.exports = () => {
  let router = require('koa-router')()
  addControllers(router)
  return router.routes()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addRoutes</span>(<span class="hljs-params">router, routes</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> route <span class="hljs-keyword">in</span> routes) {
    <span class="hljs-keyword">switch</span> (route.method) {
      <span class="hljs-attr">case</span>: <span class="hljs-string">'post'</span>:
        router.post(route.uri, route.fn)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register post url: <span class="hljs-subst">${route.uri}</span>`</span>)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span>: <span class="hljs-string">'get'</span>:
        router.get(route.uri, route.fn)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register get url: <span class="hljs-subst">${route.uri}</span>`</span>)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">default</span>: 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Invalid url: <span class="hljs-subst">${route}</span>`</span>)
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addControllers</span>(<span class="hljs-params">router</span>) </span>{
  <span class="hljs-keyword">let</span> files = fs.readdirSync(__dirname + <span class="hljs-string">'/controllers'</span>)

  <span class="hljs-keyword">let</span> controllerFiles = files.filter(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> f.endsWith(<span class="hljs-string">'.js'</span>)
  })

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> controllerFile <span class="hljs-keyword">in</span> controllerFiles) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`process controller: <span class="hljs-subst">${controllerFile}</span>...`</span>)
    <span class="hljs-keyword">let</span> routes = <span class="hljs-built_in">require</span>(__dirname + <span class="hljs-string">'/controllers'</span>)
    addRoutes(router, routes)
  }
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)()
  addControllers(router)
  <span class="hljs-keyword">return</span> router.routes()
}</code></pre>
<p>我通过在 <code>controllers</code> 文件夹中，创建若干 <code>js</code> 文件来作为 <code>Controller</code> 来使用。这里稍微参考了下 <a href="http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471133885340dad9058705804899b1cc2d0a10e7dc80000" rel="nofollow noreferrer" target="_blank">廖雪峰的文章</a>。</p>
<p>然后，我们只需要在 <code>controllers</code> 文件夹中添加合适的文件就可以了。例如我们添加一个文件叫做 <code>chart.js</code> ，然后这样写代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let hello = async (ctx, next) => {
  ctx.body = 'Hello the fucking world!'
}

module.exports = [
  {
    method: 'get',
    uri: 'hello',
    fn: hello,
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> hello = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'Hello the fucking world!'</span>
}

<span class="hljs-built_in">module</span>.exports = [
  {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
    <span class="hljs-attr">uri</span>: <span class="hljs-string">'hello'</span>,
    <span class="hljs-attr">fn</span>: hello,
  }
]</code></pre>
<p>最后再在 <code>app.js</code> 注册中间件即可。</p>
<p>除此之外，我们还需要能够处理 <code>ctx</code> 里的内容，因为它里面存储的是原始的内容。还是由于时间紧，任（填）务（坑）重（急），我用了 <a href="https://www.npmjs.com/package/koa-bodyparser" rel="nofollow noreferrer" target="_blank">koa-bodyparser</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bodyParser = require('koa-bodyparser')

app.use(bodyParser())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-bodyparser'</span>)

app.use(bodyParser())</code></pre>
<p>这里要提醒的是，这货一定要放在处理路由中间件的前面。</p>
<h3 id="articleHeader5">Model</h3>
<p><code>MVC</code> 的 <code>C</code> 已经解决了，接下来就要解决 <code>M</code> 的问题了。这里我用的是 <a href="https://www.npmjs.com/package/sequelize" rel="nofollow noreferrer" target="_blank">Sequelize</a>。这个 <code>ORM</code> 和大多数的 <code>ORM</code> 都差不多，所以在这里这次没有踩到什么坑。我在根目录下新建了一个 <code>config.js</code> 的配置文件，然后新建了 <code>model.js</code> 用来定义模型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Sequelize = require('sequelize')
const config = require('./config').databases

...

module.exports = {
  //models
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Sequelize = <span class="hljs-built_in">require</span>(<span class="hljs-string">'sequelize'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>).databases

...

module.exports = {
  <span class="hljs-comment">//models</span>
}</code></pre>
<h3 id="articleHeader6">View</h3>
<p>视图，我是使用了一个中间件叫做 <a href="https://www.npmjs.com/package/koa-views" rel="nofollow noreferrer" target="_blank">koa-view</a>。由于它使用的是 <a href="https://mozilla.github.io/nunjucks/" rel="nofollow noreferrer" target="_blank">Nunjucks</a> 模板引擎，对于写 <code>PHP</code> 的我相对熟悉一点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const view = require('koa-view')

const app = Koa()

app.use(view(__dirname + '/views'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> view = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-view'</span>)

<span class="hljs-keyword">const</span> app = Koa()

app.use(view(__dirname + <span class="hljs-string">'/views'</span>))</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//controller

let Hello = (ctx, next) => {
  ctx.render('hello', datas)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//controller</span>

<span class="hljs-keyword">let</span> Hello = <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  ctx.render(<span class="hljs-string">'hello'</span>, datas)
}</code></pre>
<p>只要在 'views' 文件夹中定义相对应的 html 文件即可。</p>
<h2 id="articleHeader7">后记</h2>
<p>这次的尝试，终于在我的修修补补中，搞出了一个简陋的 <code>MVC</code> 模型。赶在了 deadline 前完成，真是一波三折啊。学习新技术，就是这样，要实践嘛= =下面给出我的项目目录作参考</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="koa2/
|
+- controllers/
|  |
|  +- chart.js
|  ...
|
+- static/
|  |
|  +- js/
|     ...
|  |
|  +- style/
|     |
|     +- img
|     ...
|
+- views/
|  |
|  +- game.html
|  ...
|
+- app.js
|
+- config.js
|
+- controller.js
|
+- model.js
|
+- package.json
|
+- yarn.lock
|
+- node_modules/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>koa2/
|<span class="hljs-string">
+- controllers/
</span>|<span class="hljs-string">  </span>|
|<span class="hljs-string">  +- chart.js
</span>|<span class="hljs-string">  ...
</span>|
+- static/
|<span class="hljs-string">  </span>|
|<span class="hljs-string">  +- js/
</span>|<span class="hljs-string">     ...
</span>|<span class="hljs-string">  </span>|
|<span class="hljs-string">  +- style/
</span>|<span class="hljs-string">     </span>|
|<span class="hljs-string">     +- img
</span>|<span class="hljs-string">     ...
</span>|
+- views/
|<span class="hljs-string">  </span>|
|<span class="hljs-string">  +- game.html
</span>|<span class="hljs-string">  ...
</span>|
+- app.js
|<span class="hljs-string">
+- config.js
</span>|
+- controller.js
|<span class="hljs-string">
+- model.js
</span>|
+- package.json
|<span class="hljs-string">
+- yarn.lock
</span>|
+- node_modules/</code></pre>
<p>菜鸟作品，如有错误请指正，不胜感激。</p>
<p>如果你喜欢我的文章，那就请我喝杯奶茶吧~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009733699?w=266&amp;h=377" src="https://static.alili.tech/img/remote/1460000009733699?w=266&amp;h=377" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个 PHPer 第一次用 Koa2 写 Node.js 的心路历程

## 原文链接
[https://segmentfault.com/a/1190000009733610](https://segmentfault.com/a/1190000009733610)

