---
title: '从零搭建Koa2 Server' 
date: 2019-01-14 2:30:07
hidden: true
slug: vlyeml49hxl
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天想写个小爬虫程序，准备后端就用koa2。于是翻遍github与各大网站，都没找到一个好用的、轻一点的koa2脚手架，也找不到一个清晰些的搭建介绍。github上的脚手架要么是1.x版的koa，要么一堆复杂的依赖。</p>
<p>当然可能还是有写的比较好的吧，只是我没找到。不管怎样吧，我只能亲自上了，就当是学习了。</p>
<p>现在把搭建过程介绍下，看能不能方便下入门的同学。</p>
<h2 id="articleHeader0">第一步：初始项目，引入 <a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">Koa2</a>
</h2>
<p>官方的介绍，是很简单的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install koa" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">$ npm install koa</code></pre>
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

<span class="hljs-comment">// response</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>
})

app.listen(<span class="hljs-number">3000</span>)</code></pre>
<p>好，那我们就先从这开始。创建一个文件夹，命名koa2。（记得先装好node v7.6.0 以上版本）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd koa2

npm init // 一路回车，根据提示输入信息。

npm install koa --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> koa2

npm init // 一路回车，根据提示输入信息。

npm install koa --save</code></pre>
<p>然后在文件下根目录下创建程序入口文件：index.js，并把官网介绍那段代码贴进去。之后在命令行中执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node index.js</code></pre>
<p>打开浏览器，访问 <code>http://localhost:3000/</code> ，可以看到页面输出了 <code>hello world</code>。</p>
<p>很好，第一步已经踏出去了。相信到这里大部分小白都没问题，之后就开始懵逼了。就这个玩意，我该怎么写接口？怎么连接数据库？</p>
<h2 id="articleHeader1">第二步：搭建路由与Controller</h2>
<p>Koa本质上是调用一系列的中间件，来处理对应的请求，并决定是否传递到下一个中间件去处理。我们来写一个最简单的中间件试试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 刚才index.js 中的这段代码，我们改写一下。
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

// 改成如下

app.use(ctx => {
  ctx.body = `您的网址路径为:${ctx.request.url}`
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 刚才index.js 中的这段代码，我们改写一下。</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>
})

<span class="hljs-comment">// 改成如下</span>

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">`您的网址路径为:<span class="hljs-subst">${ctx.request.url}</span>`</span>
})</code></pre>
<p>这段代码中，<code>app.use</code> 的 <code>function</code> 就是最简单的一个中间件，接受了请求，读出请求路径，并返回到客户端。重新执行下<code>node index.js</code>，打开浏览器，输入<code>http://localhost:3000/hhhhh</code>，页面输出了<code>您的网址路径为:hhhhh</code>。</p>
<p>所以，接口的本质，就是判断不同的请求链接，干不同的事情，返回相应的结果。那么我们得需要一个路由中间件来处理分发请求。开源的时代，当然是拿来主义了。github搜下<a href="https://github.com/alexmingoia/koa-router" rel="nofollow noreferrer" target="_blank">koa-router</a>，成功找到。根据它的介绍，我们先在项目根目录执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install koa-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install koa-router --save</code></pre>
<p>然后把<code>index.js</code>文件再改造下。变成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// 先注释了，后面再解释
// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = `这是主页`
})

router.get('/user', ctx => {
  ctx.body = `这是user页`
})

router.get('/post', ctx => {
  ctx.body = ctx.request.body
})

router.get('/async', async ctx => {
  const sleep = async (ms) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  }
  await sleep(1000)
  ctx.body = `这是异步处理页`
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

<span class="hljs-comment">// 先注释了，后面再解释</span>
<span class="hljs-comment">// const bodyParser = require('koa-bodyparser')</span>
<span class="hljs-comment">// app.use(bodyParser())</span>

router.get(<span class="hljs-string">'/'</span>, ctx =&gt; {
  ctx.body = <span class="hljs-string">`这是主页`</span>
})

router.get(<span class="hljs-string">'/user'</span>, ctx =&gt; {
  ctx.body = <span class="hljs-string">`这是user页`</span>
})

router.get(<span class="hljs-string">'/post'</span>, ctx =&gt; {
  ctx.body = ctx.request.body
})

router.get(<span class="hljs-string">'/async'</span>, <span class="hljs-keyword">async</span> ctx =&gt; {
  <span class="hljs-keyword">const</span> sleep = <span class="hljs-keyword">async</span> (ms) =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-literal">true</span>)
      }, ms)
    })
  }
  <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>)
  ctx.body = <span class="hljs-string">`这是异步处理页`</span>
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(<span class="hljs-number">3000</span>)</code></pre>
<p>重新执行 <code>node index.js</code>。我们可以看到访问 <code>/</code>, <code>/user</code>，<code>/async</code>，都能得到相应的结果了。</p>
<p>除了那个post的方法，压根得不到自己post的数据。</p>
<p>因为koa是很纯粹的，你提交的数据，它并不会帮你处理。所以这里我们又必须引用一个中间件来处理提交的数据--<a href="https://github.com/koajs/bodyparser" rel="nofollow noreferrer" target="_blank">bodyparser</a>。把上面那两行注释代码解注，就能处理请求数据了。记得要先</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install koa-bodyparser --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install koa-bodyparser --save</code></pre>
<p>另外关于<code>async/await</code>不明白的同学，可以先去看下阮老师的介绍，点击<a href="http://es6.ruanyifeng.com/#docs/async" rel="nofollow noreferrer" target="_blank">传送门</a>。</p>
<p>不过我们不能把所有的接口都写在这一个文件呀，所以我们得改造下。理一下思路，路由的配置文件应该单独一份，接口的方法应该按业务模块分成一个个controller。说干就干！</p>
<p>先看改造后的目录结构，不想截图，大家将就看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-koa2
  -node_modules
  -controller
    user.js
  -index.js
  -router.js
  -package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">koa2
</span>  -<span class="ruby">node_modules
</span>  -<span class="ruby">controller
</span>    user.js
  -<span class="ruby">index.js
</span>  -<span class="ruby">router.js
</span>  -<span class="ruby">package.json</span></code></pre>
<p>再来看文件变成怎么样了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>

<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./router'</span>)
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-bodyparser'</span>)

app.use(bodyParser())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(<span class="hljs-number">3000</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js

const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')

router.post('/user/login', user.login)
router.get('/user/profile', user.profile)

module.exports = router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// router.js</span>

<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()
<span class="hljs-keyword">const</span> user = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./controller/user'</span>)

router.post(<span class="hljs-string">'/user/login'</span>, user.login)
router.get(<span class="hljs-string">'/user/profile'</span>, user.profile)

<span class="hljs-built_in">module</span>.exports = router</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// controller/user.js

const sleep = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
module.exports = {
  login (ctx) {
    ctx.body = {
      username: ctx.request.body.username
    }
  },
  async profile (ctx) {
    await sleep(1000)
    ctx.body = {
      username: '相学长',
      sex: 'man',
      age: '999'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// controller/user.js</span>

<span class="hljs-keyword">const</span> sleep = <span class="hljs-keyword">async</span> (ms) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(<span class="hljs-literal">true</span>)
    }, ms)
  })
}
<span class="hljs-built_in">module</span>.exports = {
  login (ctx) {
    ctx.body = {
      <span class="hljs-attr">username</span>: ctx.request.body.username
    }
  },
  <span class="hljs-keyword">async</span> profile (ctx) {
    <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>)
    ctx.body = {
      <span class="hljs-attr">username</span>: <span class="hljs-string">'相学长'</span>,
      <span class="hljs-attr">sex</span>: <span class="hljs-string">'man'</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-string">'999'</span>
    }
  }
}</code></pre>
<p>再重新执行 <code>node index.js</code>。访问相应路由，应该能得到对应的结果了。</p>
<h2 id="articleHeader2">其他工程化配置</h2>
<p>好，到此为止，我们的server已经大致完成了，但是我们发现一个很烦的问题就是，每次修改代码都得重新<code>node index.js</code>，这也太烦了。我希望的是，每次更新代码都能重新执行，并且帮我执行ESlint。其他前端项目webpack那一套，不是webpack配置工程师的话，自己挪过来又改不来。</p>
<p>这里我介绍个简单的方案，<code>nodemon + gulp</code>。具体呢就不一步步来了，这种东西，不用太了解，能run起来满足自己需求就好。如果不需要eslint的话，只要安装<a href="https://github.com/remy/nodemon" rel="nofollow noreferrer" target="_blank">nodemon</a>就好。</p>
<p>package.json scripts部分 修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;nodemon&quot;: &quot;nodemon index.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"nodemon"</span>: <span class="hljs-string">"nodemon index.js"</span>
}</code></pre>
<p>然后命令行执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install nodemon --save-dev

npm run nodemon" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install nodemon --save-dev

npm run nodemon</code></pre>
<p>如果有eslint的需求的话，就稍微麻烦些了，eslint的init我就不贴教程了，我贴上我的gulp配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// gulpfile.js
const gulp = require('gulp')
const lint = require('gulp-eslint')
const nodemon = require('gulp-nodemon')

function lintFiles (files) {
  return gulp.src(files)
    .pipe(lint())
    .pipe(lint.format())
    // .pipe(lint.failAfterError())
}

gulp.task('eslint', () => lintFiles(['**/*.js', '!node_modules/**']))

gulp.task('eslint_nodemon', ['eslint'], () => {
  return nodemon({
    script: './app/server.js', // 项目入口文件
    tasks (changedFiles) {
      lintFiles(changedFiles)
      return []
    },
    ignore: ['build/**', 'dist/**', '.git', 'node_modules/**']
  })
})

gulp.task('default', ['eslint_nodemon'])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// gulpfile.js</span>
<span class="hljs-keyword">const</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>)
<span class="hljs-keyword">const</span> lint = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-eslint'</span>)
<span class="hljs-keyword">const</span> nodemon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-nodemon'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lintFiles</span> (<span class="hljs-params">files</span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(files)
    .pipe(lint())
    .pipe(lint.format())
    <span class="hljs-comment">// .pipe(lint.failAfterError())</span>
}

gulp.task(<span class="hljs-string">'eslint'</span>, () =&gt; lintFiles([<span class="hljs-string">'**/*.js'</span>, <span class="hljs-string">'!node_modules/**'</span>]))

gulp.task(<span class="hljs-string">'eslint_nodemon'</span>, [<span class="hljs-string">'eslint'</span>], () =&gt; {
  <span class="hljs-keyword">return</span> nodemon({
    <span class="hljs-attr">script</span>: <span class="hljs-string">'./app/server.js'</span>, <span class="hljs-comment">// 项目入口文件</span>
    tasks (changedFiles) {
      lintFiles(changedFiles)
      <span class="hljs-keyword">return</span> []
    },
    <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'build/**'</span>, <span class="hljs-string">'dist/**'</span>, <span class="hljs-string">'.git'</span>, <span class="hljs-string">'node_modules/**'</span>]
  })
})

gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'eslint_nodemon'</span>])
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json scripts
&quot;scripts&quot;: {
  &quot;start&quot;: &quot;pm2 start index.js --watch&quot;, // 这里用pm2 作为线上run，有兴趣的同学可以自己去看看
  &quot;dev&quot;: &quot;gulp&quot;,
  &quot;lint&quot;: &quot;eslint .&quot;,
  &quot;fix&quot;: &quot;eslint --fix .&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// package.json scripts</span>
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"pm2 start index.js --watch"</span>, <span class="hljs-comment">// 这里用pm2 作为线上run，有兴趣的同学可以自己去看看</span>
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"gulp"</span>,
  <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint ."</span>,
  <span class="hljs-string">"fix"</span>: <span class="hljs-string">"eslint --fix ."</span>
},</code></pre>
<h2 id="articleHeader3">写在最后</h2>
<p>到这里，我想应该能让一部分同学上手了。</p>
<p>但这只是初步的搭建了下koa。真的想投入使用，根据业务需求，可能还需要安装数据库驱动等中间件。对于复杂业务场景的server，还需要更加合理的设计controller，service，在这里就不多阐述了。</p>
<p>如果这篇文章，能够帮助到一些同学，下次有空再写写这方面相关的。</p>
<p>ps: 文章介绍的所有代码都传了一份到github，有需要的同学请自行去看。</p>
<p>地址：<a href="https://github.com/wuomzfx/koa2" rel="nofollow noreferrer" target="_blank">https://github.com/wuomzfx/koa2</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零搭建Koa2 Server

## 原文链接
[https://segmentfault.com/a/1190000009494041](https://segmentfault.com/a/1190000009494041)

