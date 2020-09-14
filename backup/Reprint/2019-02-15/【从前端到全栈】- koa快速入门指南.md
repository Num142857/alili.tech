---
title: '【从前端到全栈】- koa快速入门指南' 
date: 2019-02-15 2:30:44
hidden: true
slug: frpbprojqz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>随着技术的不断发展，前端工程师也被赋予了越来越多的职责。不再是从前只需要切个图，加个css样式就能完成任务的切图仔了。接下来这篇文章，完成一个简单的登录注册，能让你快速上手，成为一个‘小全栈工程师’，here we go ！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726034?w=300&amp;h=300" src="https://static.alili.tech/img/remote/1460000016726034?w=300&amp;h=300" alt="15371488705139" title="15371488705139" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">koa快速开始</h2>
<h3 id="articleHeader2">安装</h3>
<ul>
<li>因为node.js v7.6.x已经完全支持async/await语法，所以请保证node的版本在7.6以上</li>
<li>
<p>推荐一个node的多版本管理工具：nvm。如何安装这里不再赘述，网上的教程有很多</p>
<ul><li><a href="https://github.com/creationix/nvm" rel="nofollow noreferrer" target="_blank">https://github.com/creationix...</a></li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 初始化package.json
npm init

// 安装koa2 
npm install koa
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// 初始化package.json</span>
npm init

<span class="hljs-comment">// 安装koa2 </span>
npm install koa
</code></pre>
<h3 id="articleHeader3">一个hello world</h3>
<p>新建一个index.js，敲上以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//index.js

const Koa = require('koa')
const app = new Koa()

app.use( async (ctx, next) => {
  ctx.response.body = '你好，我是内地吴彦祖'
})

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

app.use( <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.response.body = <span class="hljs-string">'你好，我是内地吴彦祖'</span>
})

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3333'</span>)
})
</code></pre>
<p>在我们的命令行敲上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>就可以看到运行结果啦:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726035?w=331&amp;h=161" src="https://static.alili.tech/img/remote/1460000016726035?w=331&amp;h=161" alt="15371507388772" title="15371507388772" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">几个核心概念</h2>
<h3 id="articleHeader5">中间件好基友ctx和next</h3>
<p>在上面的代码中，我们可以看到app.use后面使用了2个参数，<strong>ctx</strong>和<strong>next</strong>，下面我们介绍一个这哥俩到底干嘛的</p>
<h4>ctx</h4>
<p>ctx作为上下文使用，Koa将 node 的 <strong>request</strong>, <strong>response</strong> 对象封装进一个单独对象。即<strong>ctx.request</strong> 、 <strong>ctx.response</strong>。Koa 内部又对一些常用的属性或者方法做了代理操作，使得我们可以直接通过 ctx 获取。比如，<strong>ctx.request.url</strong> 可以写成 <strong>ctx.url</strong>。</p>
<h4>next</h4>
<p>next 参数的作用是将处理的控制权转交给下一个中间件</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726036?w=478&amp;h=435" src="https://static.alili.tech/img/remote/1460000016726036?w=478&amp;h=435" alt="15371520197565" title="15371520197565" style="cursor: pointer;"></span></p>
<p>经典的洋葱图概念能很好的解释next的执行，请求从最外层进去，又从最里层出来。我们看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next)=>{
  let startTime = new Date().getTime()
  await next()
  let endTime = new Date().getTime()
  console.log(`此次的响应时间为：${endTime - startTime}ms`)
})

app.use(async (ctx, next) => {
  console.log('111, 然后doSomething')
  await next()
  console.log('111 end')
})

app.use(async (ctx, next) => {
  console.log('222, 然后doSomething')
  await next()
  console.log('222 end')
})

app.use(async (ctx, next) => {
  console.log('333, 然后doSomething')
  await next()
  console.log('333 end')
})

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

app.use(<span class="hljs-keyword">async</span> (ctx, next)=&gt;{
  <span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-keyword">let</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`此次的响应时间为：<span class="hljs-subst">${endTime - startTime}</span>ms`</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'111, 然后doSomething'</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'111 end'</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'222, 然后doSomething'</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'222 end'</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'333, 然后doSomething'</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'333 end'</span>)
})

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3333'</span>)
})</code></pre>
<p>看一下运行结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726037?w=432&amp;h=342" src="https://static.alili.tech/img/remote/1460000016726037?w=432&amp;h=342" alt="15371528106452" title="15371528106452" style="cursor: pointer; display: inline;"></span></p>
<p>如果将<strong>‘222’</strong>函数的next()去掉的话，会发生什么呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726038?w=660&amp;h=280" src="https://static.alili.tech/img/remote/1460000016726038?w=660&amp;h=280" alt="15371529369320" title="15371529369320" style="cursor: pointer;"></span></p>
<p>可以看到，后面的<strong>‘333’</strong>中间件直接不执行了。所以中间件的顺序对next的执行有很大的影响</p>
<h3 id="articleHeader6">路由 koa-router</h3>
<p>我们常用koa-router来处理URL</p>
<p>安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm i koa-router --save</code></pre>
<p>看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = '你好，我这里是index页'
})

router.get('/user', async (ctx, next) => {
  ctx.body = '你好，我这里是user页'
})

router.get('/error', async (ctx, next) => {
  ctx.body = '你好，我这里是error页'
})

app.use(router.routes())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'你好，我这里是index页'</span>
})

router.get(<span class="hljs-string">'/user'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'你好，我这里是user页'</span>
})

router.get(<span class="hljs-string">'/error'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'你好，我这里是error页'</span>
})

app.use(router.routes())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3333'</span>)
})
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726039?w=300&amp;h=158" src="https://static.alili.tech/img/remote/1460000016726039?w=300&amp;h=158" alt="15371540305250" title="15371540305250" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726040?w=344&amp;h=174" src="https://static.alili.tech/img/remote/1460000016726040?w=344&amp;h=174" alt="15371540448439" title="15371540448439" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726041?w=353&amp;h=164" src="https://static.alili.tech/img/remote/1460000016726041?w=353&amp;h=164" alt="15371540585094" title="15371540585094" style="cursor: pointer; display: inline;"></span></p>
<p>koa-router也支持嵌套写法，通过一个总路由装载所有子路由，也非常的方便。看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

// 子路由1
let oneRouter = new Router()

oneRouter.get('/', async (ctx, next) => {
  ctx.body = '你好，我这里是oneRouter页'
})

// 子路由2
let twoRouter = new Router()

twoRouter.get('/', async (ctx, next) => {
  ctx.body = '你好, 我这里是twoRouter页'
}).get('/home', async (ctx , next) => {
  ctx.body = '你好, 我这里是home页'
})

// 装载所有子路由
let indexRouter = new Router()

indexRouter.use('/one',oneRouter.routes(), oneRouter.allowedMethods())
indexRouter.use('/two',twoRouter.routes(), twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)

<span class="hljs-comment">// 子路由1</span>
<span class="hljs-keyword">let</span> oneRouter = <span class="hljs-keyword">new</span> Router()

oneRouter.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'你好，我这里是oneRouter页'</span>
})

<span class="hljs-comment">// 子路由2</span>
<span class="hljs-keyword">let</span> twoRouter = <span class="hljs-keyword">new</span> Router()

twoRouter.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'你好, 我这里是twoRouter页'</span>
}).get(<span class="hljs-string">'/home'</span>, <span class="hljs-keyword">async</span> (ctx , next) =&gt; {
  ctx.body = <span class="hljs-string">'你好, 我这里是home页'</span>
})

<span class="hljs-comment">// 装载所有子路由</span>
<span class="hljs-keyword">let</span> indexRouter = <span class="hljs-keyword">new</span> Router()

indexRouter.use(<span class="hljs-string">'/one'</span>,oneRouter.routes(), oneRouter.allowedMethods())
indexRouter.use(<span class="hljs-string">'/two'</span>,twoRouter.routes(), twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3333'</span>)
})</code></pre>
<p>看一下运行结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726042?w=317&amp;h=150" src="https://static.alili.tech/img/remote/1460000016726042?w=317&amp;h=150" alt="15371560100616" title="15371560100616" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726043?w=315&amp;h=159" src="https://static.alili.tech/img/remote/1460000016726043?w=315&amp;h=159" alt="15371560354693" title="15371560354693" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726044?w=351&amp;h=164" src="https://static.alili.tech/img/remote/1460000016726044?w=351&amp;h=164" alt="15371560521654" title="15371560521654" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">获取请求数据</h3>
<p>koa-router提供了常见的 .get .put .post .del 接口来处理各种需求。实际开发中我们用的比较多的是get和post，我们来看看<strong>get</strong>例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

router.get('/data', async (ctx , next)=> {
  let url = ctx.url

  // 从ctx的request中拿到我们想要的数据
  let data = ctx.request.query
  let dataQueryString = ctx.request.querystring

  ctx.body = {
    url,
    data,
    dataQueryString
  }
})

app.use(router.routes())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.get(<span class="hljs-string">'/data'</span>, <span class="hljs-keyword">async</span> (ctx , next)=&gt; {
  <span class="hljs-keyword">let</span> url = ctx.url

  <span class="hljs-comment">// 从ctx的request中拿到我们想要的数据</span>
  <span class="hljs-keyword">let</span> data = ctx.request.query
  <span class="hljs-keyword">let</span> dataQueryString = ctx.request.querystring

  ctx.body = {
    url,
    data,
    dataQueryString
  }
})

app.use(router.routes())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3333'</span>)
})</code></pre>
<p>在浏览器里输入<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333/data?user=wuyanzu&amp;id=123456 ,可以看到运行结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726045?w=545&amp;h=304" src="https://static.alili.tech/img/remote/1460000016726045?w=545&amp;h=304" alt="15371636443212" title="15371636443212" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到区别，<code>.query</code>返回的结果是对象，而<code>.querystring</code>返回的是字符串，这个很好理解。（chrome插件显示成json格式）</p>
<p>如果遵从 RESTful 规范,比如请求要以 '/user/:id'的方式发出的话，我们可以用下面的例子来获取到想要的数据</p>
<p>添加代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/data/:id', async (ctx, next) => {

  // 也从ctx中拿到我们想要的数据，不过使用的是params对象
  let data = ctx.params

  ctx.body = data
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/data/:id'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {

  <span class="hljs-comment">// 也从ctx中拿到我们想要的数据，不过使用的是params对象</span>
  <span class="hljs-keyword">let</span> data = ctx.params

  ctx.body = data
})</code></pre>
<p>浏览器运行 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333/data/4396 看到结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726046?w=376&amp;h=193" src="https://static.alili.tech/img/remote/1460000016726046?w=376&amp;h=193" alt="15371643392037" title="15371643392037" style="cursor: pointer;"></span></p>
<p>接下来我们看看<strong>post</strong>的例子</p>
<p>我们常用的请求post，它的数据是放在body当中的。这个时候就推荐一个非常常用且好用的中间件-<code>koa-bodyparser</code></p>
<p>首先安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa-bodyparser --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm i koa-bodyparser --save</code></pre>
<p>然后我们在刚才的代码里添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/post', async (ctx, next) => {
    // 模拟一段提交页面
  let html = `    
    <form action=&quot;/post/result&quot; method=&quot;post&quot;>
        <p>你长的最像哪位明星</p>
        <input name=&quot;name&quot; type=&quot;text&quot; placeholder=&quot;请输入名字：&quot;/> 
        <br/>
        <p>输入一段你知道的车牌号</p>
        <input name=&quot;num&quot; type=&quot;text&quot; placeholder=&quot;请输入车牌号：&quot;/>
        <br/> 
        <button>确定不改了哦</button>
     </form> `
  ctx.body = html
})

router.post('/post/result', async (ctx, next) => {
  // 我们可以从ctx的request.body拿到提交上来的数据
  let {name, num} = ctx.request.body

  if (name &amp;&amp; num) {
    ctx.body = `hello，你最像的明星是:${name},ch你知道的车牌号是:${num}`
  } else {
    ctx.body = '啊哦~你填写的信息有误'
  }

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/post'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
    <span class="hljs-comment">// 模拟一段提交页面</span>
  <span class="hljs-keyword">let</span> html = <span class="hljs-string">`    
    &lt;form action="/post/result" method="post"&gt;
        &lt;p&gt;你长的最像哪位明星&lt;/p&gt;
        &lt;input name="name" type="text" placeholder="请输入名字："/&gt; 
        &lt;br/&gt;
        &lt;p&gt;输入一段你知道的车牌号&lt;/p&gt;
        &lt;input name="num" type="text" placeholder="请输入车牌号："/&gt;
        &lt;br/&gt; 
        &lt;button&gt;确定不改了哦&lt;/button&gt;
     &lt;/form&gt; `</span>
  ctx.body = html
})

router.post(<span class="hljs-string">'/post/result'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// 我们可以从ctx的request.body拿到提交上来的数据</span>
  <span class="hljs-keyword">let</span> {name, num} = ctx.request.body

  <span class="hljs-keyword">if</span> (name &amp;&amp; num) {
    ctx.body = <span class="hljs-string">`hello，你最像的明星是:<span class="hljs-subst">${name}</span>,ch你知道的车牌号是:<span class="hljs-subst">${num}</span>`</span>
  } <span class="hljs-keyword">else</span> {
    ctx.body = <span class="hljs-string">'啊哦~你填写的信息有误'</span>
  }

})</code></pre>
<p>看一下运行结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016726047?w=380&amp;h=297" src="https://static.alili.tech/img/remote/1460000016726047?w=380&amp;h=297" alt="2018-09-17 14 26 24" title="2018-09-17 14 26 24" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">cache</h3>
<p>koa操作cookie是非常方便的，也是从上下文ctx中获取。</p>
<ul>
<li>ctx.cookies.get(name, [options]) 读取上下文请求中的cookie</li>
<li>ctx.cookies.set(name, value, [options]) 在上下文中写入cookie</li>
</ul>
<p>在我们刚才的post请求的代码中加入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.post('/post/result', async (ctx, next) => {
  // 我们可以从ctx的request.body拿到提交上来的数据
  let {name, num} = ctx.request.body

  if (name &amp;&amp; num) {
    ctx.body = `hello，你最像的明星是:${name},ch你知道的车牌号是:${num}`
    ctx.cookies.set(
      'xunleiCode',num,
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/post/result',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2018-09-17'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
  } else {
    ctx.body = '啊哦~你填写的信息有误'
  }

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.post(<span class="hljs-string">'/post/result'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// 我们可以从ctx的request.body拿到提交上来的数据</span>
  <span class="hljs-keyword">let</span> {name, num} = ctx.request.body

  <span class="hljs-keyword">if</span> (name &amp;&amp; num) {
    ctx.body = <span class="hljs-string">`hello，你最像的明星是:<span class="hljs-subst">${name}</span>,ch你知道的车牌号是:<span class="hljs-subst">${num}</span>`</span>
    ctx.cookies.set(
      <span class="hljs-string">'xunleiCode'</span>,num,
      {
        <span class="hljs-attr">domain</span>: <span class="hljs-string">'localhost'</span>,  <span class="hljs-comment">// 写cookie所在的域名</span>
        path: <span class="hljs-string">'/post/result'</span>,       <span class="hljs-comment">// 写cookie所在的路径</span>
        maxAge: <span class="hljs-number">10</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// cookie有效时长</span>
        expires: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">'2018-09-17'</span>),  <span class="hljs-comment">// cookie失效时间</span>
        httpOnly: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 是否只用于http请求中获取</span>
        overwrite: <span class="hljs-literal">false</span>  <span class="hljs-comment">// 是否允许重写</span>
      }
    )
  } <span class="hljs-keyword">else</span> {
    ctx.body = <span class="hljs-string">'啊哦~你填写的信息有误'</span>
  }

})</code></pre>
<p>看一下运行结果：<br><span class="img-wrap"><img data-src="/img/remote/1460000016726048?w=529&amp;h=143" src="https://static.alili.tech/img/remote/1460000016726048?w=529&amp;h=143" alt="15371681204265" title="15371681204265" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726049?w=552&amp;h=340" src="https://static.alili.tech/img/remote/1460000016726049?w=552&amp;h=340" alt="15371681313023" title="15371681313023" style="cursor: pointer;"></span></p>
<p>koa操作session的话，需要用到koa-session，🌰：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const session = require('koa-session')

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> session = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-session'</span>)

app.keys = [<span class="hljs-string">'some secret hurr'</span>];
<span class="hljs-keyword">const</span> CONFIG = {
  <span class="hljs-attr">key</span>: <span class="hljs-string">'koa:sess'</span>,   <span class="hljs-comment">//cookie key (default is koa:sess)</span>
  maxAge: <span class="hljs-number">86400000</span>,  <span class="hljs-comment">// cookie的过期时间 maxAge in ms (default is 1 days)</span>
  overwrite: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//是否可以overwrite    (默认default true)</span>
  httpOnly: <span class="hljs-literal">true</span>, <span class="hljs-comment">//cookie是否只有服务器端可以访问 httpOnly or not (default true)</span>
  signed: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//签名默认true</span>
  rolling: <span class="hljs-literal">false</span>,  <span class="hljs-comment">//在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）</span>
  renew: <span class="hljs-literal">false</span>,  <span class="hljs-comment">//(boolean) renew session when session is nearly expired,</span>
};
app.use(session(CONFIG, app));
</code></pre>
<h3 id="articleHeader9">小结</h3>
<p>在涉及到自己没有接触过的领域时，我一直推崇先看看要怎么玩，等自己会玩了以后，再看看“究竟”怎么玩。我们通过上面的代码和描述，已经对koa及node有一个初步的印象和概念。下篇文章我们会有中间件的拆分，单元测试，记录日志，管理规范等。让我们共同成长！</p>
<h2 id="articleHeader10">广而告之</h2>
<p>本文发布于<a href="https://github.com/BooheeFE/weekly" rel="nofollow noreferrer" target="_blank">薄荷前端周刊</a>，欢迎Watch &amp; Star ★，转载请注明出处。</p>
<h3 id="articleHeader11">欢迎讨论，点个赞再走吧  ｡◕‿◕｡ ～</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【从前端到全栈】- koa快速入门指南

## 原文链接
[https://segmentfault.com/a/1190000016726031](https://segmentfault.com/a/1190000016726031)

