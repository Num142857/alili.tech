---
title: '【单页面博客从前端到后端】基于 Passport 和 Koa@2 的权限验证与 DVA 的 Model 设计' 
date: 2019-01-12 2:30:25
hidden: true
slug: i010qmbp6i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">基于 JWT 的权限验证</h3>
<p>这里有一篇文章描述的已经非常详尽，阐述了 <code>JWT</code> 验证相比较传统的持久化 <code>session</code> 验证的优势，以及基于 <code>angular</code> 和 <code>express</code> 验证的简单流程。</p>
<blockquote><p><a href="https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/" rel="nofollow noreferrer" target="_blank">基于Json WebToken的权限验证</a></p></blockquote>
<h3 id="articleHeader1">Passport 专注于用户验证 Nodejs 库</h3>
<p><a href="https://github.com/jaredhanson/passport" rel="nofollow noreferrer" target="_blank">Passport</a> 提供了多种的验证策略，如：</p>
<ul>
<li><p><a href="https://github.com/jaredhanson/passport-http-bearer" rel="nofollow noreferrer" target="_blank">passport-http-bearer</a>  - 使用 <code>Bearer tokens</code> 对 <code>HTTP</code> 请求做权限验证。这个最适合我们的项目不过了。</p></li>
<li><p><a href="https://github.com/jaredhanson/passport-local" rel="nofollow noreferrer" target="_blank">passport-local</a> - 本地验证，普通的登陆验证，数据库密码验证成功即可。</p></li>
</ul>
<p>此外还有 <code>passport-github</code> , <code>passport-weixin</code> , <code>passport-qq</code> , <code>passport-weibo</code> … ，这些你都可以在 <a href="http://passportjs.org/" rel="nofollow noreferrer" target="_blank">官网</a> 上找到。 </p>
<p>我们就采用这种方式来进行权限验证。</p>
<h3 id="articleHeader2">Koa@2 基本环境</h3>
<blockquote><p>首先需要注意的是使用 Koa@2，Node的版本需要 7.X的版本以上，而且启动时需要加上 <code>--harmony</code> 或者 <code>—harmony-async-await</code> <br>最近 <code>Node 8.0</code> 已经上线，我直接采用的是 <code>Node v8.0.0</code> <br><code>nvm install 8.0.0</code><br><code>nvm alias default 8.0.0</code></p></blockquote>
<p><code>blog/server</code>基本的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server
├─ bin / www      # 入口文件
├─ config         # server配置文件
├─ controller     # 控制器文件夹
|  └─ user.js     
├─ lib            
|  ├─ auth.js     # 认证逻辑
|  └─ db.js       # 数据库 连接等
├─ models         # Mongoose Models
├─ routes         # Koa router
├─ utils          # 工具方法
├─ index.js       
└─ package.json  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="sh">server
├─ bin / www      <span class="hljs-comment"># 入口文件</span>
├─ config         <span class="hljs-comment"># server配置文件</span>
├─ controller     <span class="hljs-comment"># 控制器文件夹</span>
|  └─ user.js     
├─ <span class="hljs-class"><span class="hljs-keyword">lib</span>            </span>
|  ├─ auth.js     <span class="hljs-comment"># 认证逻辑</span>
|  └─ db.js       <span class="hljs-comment"># 数据库 连接等</span>
├─ models         <span class="hljs-comment"># Mongoose Models</span>
├─ routes         <span class="hljs-comment"># Koa router</span>
├─ utils          <span class="hljs-comment"># 工具方法</span>
├─ index.js       
└─ package.json  </code></pre>
<p>我们在入口文件处 <code>server/bin/www</code> 来连接 <code>MongoDB</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
    // 测试连接 MongoDB
    try {
        const info = await connect(dbConfig)
        console.log(`Success to connect to MongoDB at ${info.host}:${info.port}/${info.name}`)
    } catch (err) {
        console.error(err)
        process.exit()
    }
    // 开启服务进程
    try {
        app.listen(port)
        console.log(`Server is running at http://localhost:${port}`)
    } catch (err) {
        console.error(err)
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-comment">// 测试连接 MongoDB</span>
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> info = <span class="hljs-keyword">await</span> connect(dbConfig)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Success to connect to MongoDB at <span class="hljs-subst">${info.host}</span>:<span class="hljs-subst">${info.port}</span>/<span class="hljs-subst">${info.name}</span>`</span>)
    } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-built_in">console</span>.error(err)
        process.exit()
    }
    <span class="hljs-comment">// 开启服务进程</span>
    <span class="hljs-keyword">try</span> {
        app.listen(port)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Server is running at http://localhost:<span class="hljs-subst">${port}</span>`</span>)
    } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-built_in">console</span>.error(err)
    }
})()</code></pre>
<p><code>server/lib/db.js</code> 下对应的 <code>connect</code> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.connect = function (config) {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .on('error', err => reject(err))
            .on('close', () => console.log('MongoDB connection closed! '))
            .on('open', () => resolve(mongoose.connections[0]))
        mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, config.options)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">exports.connect = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        mongoose.connection
            .on(<span class="hljs-string">'error'</span>, err =&gt; reject(err))
            .on(<span class="hljs-string">'close'</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'MongoDB connection closed! '</span>))
            .on(<span class="hljs-string">'open'</span>, () =&gt; resolve(mongoose.connections[<span class="hljs-number">0</span>]))
        mongoose.connect(<span class="hljs-string">`mongodb://<span class="hljs-subst">${config.host}</span>:<span class="hljs-subst">${config.port}</span>/<span class="hljs-subst">${config.database}</span>`</span>, config.options)
    })
}</code></pre>
<p>在 <code>server/config/index.js</code> 增加 <code>MongoDB</code> 的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const base = {
    admin: {
        username: 'whistleyz',
        password: 'admin123',
        email: 'whistleyz@163.com',
        level: 51  // >50 超管
    }
}
const dev = Object.assign(base, {
    db: {
        host: '127.0.0.1',
        port: 27017,
        database: 'fullblog',
        options: {
            user: '',
            pass: ''
        }
    }
})
const prod = Object.assign(base, {})
const env = process.env.NODE_ENV || 'development'
const _config = {
    development: dev,
    production: prod
}
// 数据库配置
module.exports = _config[env]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> base = {
    <span class="hljs-attr">admin</span>: {
        <span class="hljs-attr">username</span>: <span class="hljs-string">'whistleyz'</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">'admin123'</span>,
        <span class="hljs-attr">email</span>: <span class="hljs-string">'whistleyz@163.com'</span>,
        <span class="hljs-attr">level</span>: <span class="hljs-number">51</span>  <span class="hljs-comment">// &gt;50 超管</span>
    }
}
<span class="hljs-keyword">const</span> dev = <span class="hljs-built_in">Object</span>.assign(base, {
    <span class="hljs-attr">db</span>: {
        <span class="hljs-attr">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-number">27017</span>,
        <span class="hljs-attr">database</span>: <span class="hljs-string">'fullblog'</span>,
        <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">user</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attr">pass</span>: <span class="hljs-string">''</span>
        }
    }
})
<span class="hljs-keyword">const</span> prod = <span class="hljs-built_in">Object</span>.assign(base, {})
<span class="hljs-keyword">const</span> env = process.env.NODE_ENV || <span class="hljs-string">'development'</span>
<span class="hljs-keyword">const</span> _config = {
    <span class="hljs-attr">development</span>: dev,
    <span class="hljs-attr">production</span>: prod
}
<span class="hljs-comment">// 数据库配置</span>
<span class="hljs-built_in">module</span>.exports = _config[env]</code></pre>
<blockquote><p>由于线上和我们开发甚至是测试环境，配置都会有些许不同，我们可以用 <code>process.env.NODE_ENV</code> 来区分这些配置</p></blockquote>
<h3 id="articleHeader3">实现后端验证逻辑</h3>
<p>新建 <code>server/lib/auth.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// serialize deserialize user objects into the session
passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser(async (username, done) => {
    const user = await UserModel.findOne({username})
    done(null, user)
})
/**
 * 基于 Bearer、Local 的认证方式 
 * 下面导出的路由中间件走的就是这里的逻辑 
 * passport-http-bearer 会自动解析出 headers 中的 token
 * https://github.com/jaredhanson/passport-http-bearer/blob/master/lib/strategy.js#L89
 */
passport.use(new BearerStrategy(async (token, done) => {
    try {
        console.log(token)
        const accessToken = await AccessToken.findOne({token}).populate('user')
        accessToken ? done(null, accessToken.user) : done(null, false, {type: 'error', message: '授权失败！'})
    } catch (err) {
        done(err)
    }
}))

/**
 * 默认从 req.body 或者 req.query 中取出 username, password 字段
 * https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L49
 */
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({username})
        if (user &amp;&amp; user.validPassword(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    } catch (err) {
        done(err)
    }
}))
// 导出中间件 
exports.isBearerAuthenticated = function () {
    return passport.authenticate('bearer', {session: false})
}
exports.isLocalAuthenticated = function () {
    return passport.authenticate('local', {session: false})
}
exports.passport = passport" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// serialize deserialize user objects into the session</span>
passport.serializeUser(<span class="hljs-function">(<span class="hljs-params">user, done</span>) =&gt;</span> done(<span class="hljs-literal">null</span>, user.username))
passport.deserializeUser(<span class="hljs-keyword">async</span> (username, done) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findOne({username})
    done(<span class="hljs-literal">null</span>, user)
})
<span class="hljs-comment">/**
 * 基于 Bearer、Local 的认证方式 
 * 下面导出的路由中间件走的就是这里的逻辑 
 * passport-http-bearer 会自动解析出 headers 中的 token
 * https://github.com/jaredhanson/passport-http-bearer/blob/master/lib/strategy.js#L89
 */</span>
passport.use(<span class="hljs-keyword">new</span> BearerStrategy(<span class="hljs-keyword">async</span> (token, done) =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(token)
        <span class="hljs-keyword">const</span> accessToken = <span class="hljs-keyword">await</span> AccessToken.findOne({token}).populate(<span class="hljs-string">'user'</span>)
        accessToken ? done(<span class="hljs-literal">null</span>, accessToken.user) : done(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'授权失败！'</span>})
    } <span class="hljs-keyword">catch</span> (err) {
        done(err)
    }
}))

<span class="hljs-comment">/**
 * 默认从 req.body 或者 req.query 中取出 username, password 字段
 * https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L49
 */</span>
passport.use(<span class="hljs-keyword">new</span> LocalStrategy(<span class="hljs-keyword">async</span> (username, password, done) =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findOne({username})
        <span class="hljs-keyword">if</span> (user &amp;&amp; user.validPassword(password)) {
            done(<span class="hljs-literal">null</span>, user)
        } <span class="hljs-keyword">else</span> {
            done(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>)
        }
    } <span class="hljs-keyword">catch</span> (err) {
        done(err)
    }
}))
<span class="hljs-comment">// 导出中间件 </span>
exports.isBearerAuthenticated = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> passport.authenticate(<span class="hljs-string">'bearer'</span>, {<span class="hljs-attr">session</span>: <span class="hljs-literal">false</span>})
}
exports.isLocalAuthenticated = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> passport.authenticate(<span class="hljs-string">'local'</span>, {<span class="hljs-attr">session</span>: <span class="hljs-literal">false</span>})
}
exports.passport = passport</code></pre>
<p>新建 <code>server/routes/api.js</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Router = require('koa-router')
const User = require('../controllers/user')
const { isBearerAuthenticated, isLocalAuthenticated } = require('../lib/auth')
const router = new Router()
router.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.error(error)
        ctx.status = 400
        ctx.body = {
            code: error.code,
            message: error.message || error.errmsg || error.msg || 'unknown_error',
            error
        }
    }
})
// 初始化用户数据
User.seed()
// Auth 认证
router.post('/auth', isLocalAuthenticated(), User.signToken)
router.get('/auth', isBearerAuthenticated(), User.getUserByToken)
module.exports = router.routes()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
<span class="hljs-keyword">const</span> User = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../controllers/user'</span>)
<span class="hljs-keyword">const</span> { isBearerAuthenticated, isLocalAuthenticated } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/auth'</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()
router.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> next()
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.error(error)
        ctx.status = <span class="hljs-number">400</span>
        ctx.body = {
            <span class="hljs-attr">code</span>: error.code,
            <span class="hljs-attr">message</span>: error.message || error.errmsg || error.msg || <span class="hljs-string">'unknown_error'</span>,
            error
        }
    }
})
<span class="hljs-comment">// 初始化用户数据</span>
User.seed()
<span class="hljs-comment">// Auth 认证</span>
router.post(<span class="hljs-string">'/auth'</span>, isLocalAuthenticated(), User.signToken)
router.get(<span class="hljs-string">'/auth'</span>, isBearerAuthenticated(), User.getUserByToken)
<span class="hljs-built_in">module</span>.exports = router.routes()</code></pre>
<p>那么我们在 <code>server/controller/user.js</code> 下的处理逻辑久变得简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// LocalStrategy 的中间件验证通过，会把 user 储存在 req 中
exports.signToken = async function (ctx, next) {
    const { user } = ctx.req
    // 重新请求 token 需要删除上一次生成的 token
    await TokenModel.findOneAndRemove({user: user._id})
    const result = await TokenModel.create({
        // md5加密
        token: genHash(user.username + Date.now()),
        user: user._id
    })
    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}
// LocalStrategy 的中间件验证Token有效，会把 user 储存在 req 中
exports.getUserByToken = async function (ctx, next) {
    ctx.status = 200
    ctx.body = {
        success: true,
        data: ctx.req.user
    }
}
// 当数据库中user表示空的时候，创建超级管理员
exports.seed = async function (ctx, next) {
    const users = await UserModel.find({})
    const adminInfo = config.admin
    if (users.length === 0) {
        const _admin = new UserModel(adminInfo)
        const adminUser = await _admin.save()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// LocalStrategy 的中间件验证通过，会把 user 储存在 req 中</span>
exports.signToken = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">const</span> { user } = ctx.req
    <span class="hljs-comment">// 重新请求 token 需要删除上一次生成的 token</span>
    <span class="hljs-keyword">await</span> TokenModel.findOneAndRemove({<span class="hljs-attr">user</span>: user._id})
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> TokenModel.create({
        <span class="hljs-comment">// md5加密</span>
        token: genHash(user.username + <span class="hljs-built_in">Date</span>.now()),
        <span class="hljs-attr">user</span>: user._id
    })
    ctx.status = <span class="hljs-number">200</span>
    ctx.body = {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: result
    }
}
<span class="hljs-comment">// LocalStrategy 的中间件验证Token有效，会把 user 储存在 req 中</span>
exports.getUserByToken = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    ctx.status = <span class="hljs-number">200</span>
    ctx.body = {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: ctx.req.user
    }
}
<span class="hljs-comment">// 当数据库中user表示空的时候，创建超级管理员</span>
exports.seed = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> UserModel.find({})
    <span class="hljs-keyword">const</span> adminInfo = config.admin
    <span class="hljs-keyword">if</span> (users.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">const</span> _admin = <span class="hljs-keyword">new</span> UserModel(adminInfo)
        <span class="hljs-keyword">const</span> adminUser = <span class="hljs-keyword">await</span> _admin.save()
    }
}</code></pre>
<blockquote><p>我们可以借助 <code>mongoose</code> 还控制 <code>Token</code> 的寿命<br>比如设置 7 天后过期，<code>expires: 60 * 60 * 24 * 7</code></p></blockquote>
<p>到这里我们的后端逻辑基本实现，为了和前端 <code>webpack-dev-server</code> 本地服务器进行数据模拟，我们可以开启 <code>devServer</code> 的 <code>proyx</code> ，以及开启 <code>koa</code> 的跨域支持</p>
<p><code>task/config</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.devServer = {
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    proxy: {
        &quot;/api/v1&quot;: &quot;http://localhost:8082&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config.devServer = {
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">contentBase</span>: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">proxy</span>: {
        <span class="hljs-string">"/api/v1"</span>: <span class="hljs-string">"http://localhost:8082"</span>
    }
}</code></pre>
<p>这样，前端的任何 <code>/api/v1</code> 下的请求，都会被代理到 <code>http://localhost:8082</code> 而 <code>8082</code> 就是 <code>koa</code> 服务器的监听端口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// koa 跨域
const logger = require('koa-logger')
const app = new koa()
app.use(kcors())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// koa 跨域</span>
<span class="hljs-keyword">const</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-logger'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> koa()
app.use(kcors())</code></pre>
<h3 id="articleHeader4">前端的登陆逻辑实现</h3>
<h4>实现一个 dva model</h4>
<p>在下一篇文章中，我们会深入 <code>dva</code> 的框架核心实现。我们先来看看 <code>dav</code> 的基本使用</p>
<p>新建 <code>src/model/app.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { doLogin, getUserByToken } from '../service/app'
import { LocalStorage } from '../utils'
import { message } from 'antd'
export default {
    namespace: 'app',
    state: {
        isLogin: false,
        user: null
    },
    subscriptions: {},
    effects: {
        *checkToken({next}, {call, put}){
            const Token = LocalStorage.getItem('token')
            if (Token) {
                yield put({type: 'loginSuccess'})
            } else {
                message.error('你还没有登陆哦！')
            }
        },
        *doLogin({payload}, {call, put}){
            try {
                const { success, data } = yield call(doLogin, payload)
                if (success) {
                    LocalStorage.setItem('token', data.token)
                    yield put({type: 'requireAuth'})
                }
            } catch (err) {
                message.error('授权失败！')
                yield put({type: 'authErr'})
            }
        },
        *getUserByToken({}, {call, put}){
            try {
                const { success, data } = yield call(getUserByToken)
                if (success) {
                    yield put({type: 'authSuccess', payload: data})
                }
            } catch (err) {
                message.error(err.message)
                yield put({type: 'authErr'})
            }
        }
    },
    reducers: {
        loginSuccess(state){
            return {
                ...state, isLogin: true
            }
        },
        authErr(state){
            return {
                ...state, isLogin: false, user: null
            }
        },
        authSuccess(state, {payload}){
            return {
                ...state, user: payload
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { doLogin, getUserByToken } <span class="hljs-keyword">from</span> <span class="hljs-string">'../service/app'</span>
<span class="hljs-keyword">import</span> { LocalStorage } <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils'</span>
<span class="hljs-keyword">import</span> { message } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">namespace</span>: <span class="hljs-string">'app'</span>,
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">isLogin</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>
    },
    <span class="hljs-attr">subscriptions</span>: {},
    <span class="hljs-attr">effects</span>: {
        *checkToken({next}, {call, put}){
            <span class="hljs-keyword">const</span> Token = LocalStorage.getItem(<span class="hljs-string">'token'</span>)
            <span class="hljs-keyword">if</span> (Token) {
                <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'loginSuccess'</span>})
            } <span class="hljs-keyword">else</span> {
                message.error(<span class="hljs-string">'你还没有登陆哦！'</span>)
            }
        },
        *doLogin({payload}, {call, put}){
            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">const</span> { success, data } = <span class="hljs-keyword">yield</span> call(doLogin, payload)
                <span class="hljs-keyword">if</span> (success) {
                    LocalStorage.setItem(<span class="hljs-string">'token'</span>, data.token)
                    <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'requireAuth'</span>})
                }
            } <span class="hljs-keyword">catch</span> (err) {
                message.error(<span class="hljs-string">'授权失败！'</span>)
                <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'authErr'</span>})
            }
        },
        *getUserByToken({}, {call, put}){
            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">const</span> { success, data } = <span class="hljs-keyword">yield</span> call(getUserByToken)
                <span class="hljs-keyword">if</span> (success) {
                    <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'authSuccess'</span>, <span class="hljs-attr">payload</span>: data})
                }
            } <span class="hljs-keyword">catch</span> (err) {
                message.error(err.message)
                <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'authErr'</span>})
            }
        }
    },
    <span class="hljs-attr">reducers</span>: {
        loginSuccess(state){
            <span class="hljs-keyword">return</span> {
                ...state, <span class="hljs-attr">isLogin</span>: <span class="hljs-literal">true</span>
            }
        },
        authErr(state){
            <span class="hljs-keyword">return</span> {
                ...state, <span class="hljs-attr">isLogin</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>
            }
        },
        authSuccess(state, {payload}){
            <span class="hljs-keyword">return</span> {
                ...state, <span class="hljs-attr">user</span>: payload
            }
        }
    }
}</code></pre>
<blockquote><p>对于 <code>redux-saga</code> 的 <code>effect</code> 等的用法，可以参考 <a href="https://redux-saga.js.org/" rel="nofollow noreferrer" target="_blank">文档</a></p></blockquote>
<p>这里我们对 <code>localStorage</code> 做了一次封装，看了源码相信你就知道目的是什么了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * src/utils/localStorage.js
 * Custom window.localStorage
 */
const STORE_PREFIX = 'blog'
export function getItem (key) {
    return window.localStorage.getItem(STORE_PREFIX + '-' + key)
}
export function setItem (key, value) {
    window.localStorage.setItem(STORE_PREFIX + '-' + key, value)
}
export function removeItem (key) {
    window.localStorage.removeItem(STORE_PREFIX + '-' + key)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * src/utils/localStorage.js
 * Custom window.localStorage
 */</span>
<span class="hljs-keyword">const</span> STORE_PREFIX = <span class="hljs-string">'blog'</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getItem</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.localStorage.getItem(STORE_PREFIX + <span class="hljs-string">'-'</span> + key)
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setItem</span> (<span class="hljs-params">key, value</span>) </span>{
    <span class="hljs-built_in">window</span>.localStorage.setItem(STORE_PREFIX + <span class="hljs-string">'-'</span> + key, value)
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeItem</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-built_in">window</span>.localStorage.removeItem(STORE_PREFIX + <span class="hljs-string">'-'</span> + key)
}</code></pre>
<p>封装 <code>src/utils/request.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from 'dva/fetch'
import * as LocalStorage from './localStorage'
const URL_PREFIX = '/api/v1'
const TOKEN_NAME = 'token'
function checkStatus(response) {
    if (response.status >= 200 &amp;&amp; response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to &quot;fetch&quot;
 * @return {object}           An object containing either &quot;data&quot; or &quot;err&quot;
 */
export default function request(url, options) {
    options = Object.assign({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }, options)
    return fetch(URL_PREFIX + url, options)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => data)
}
/**
 * Request width token
 * @param  {[type]} url    
 * @param  {[type]} options
 * @return {[type]}        
 */
export function requestWidthToken (url, options) {
        const TOKEN = LocalStorage.getItem(TOKEN_NAME)
        options = Object.assign({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            })
        }, options)
        return request(url, options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">'dva/fetch'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> LocalStorage <span class="hljs-keyword">from</span> <span class="hljs-string">'./localStorage'</span>
<span class="hljs-keyword">const</span> URL_PREFIX = <span class="hljs-string">'/api/v1'</span>
<span class="hljs-keyword">const</span> TOKEN_NAME = <span class="hljs-string">'token'</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">if</span> (response.status &gt;= <span class="hljs-number">200</span> &amp;&amp; response.status &lt; <span class="hljs-number">300</span>) {
        <span class="hljs-keyword">return</span> response;
    }
    <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(response.statusText);
    error.response = response;
    <span class="hljs-keyword">throw</span> error;
}
<span class="hljs-comment">/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url, options</span>) </span>{
    options = <span class="hljs-built_in">Object</span>.assign({
        <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers({
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
        })
    }, options)
    <span class="hljs-keyword">return</span> fetch(URL_PREFIX + url, options)
        .then(checkStatus)
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> data)
}
<span class="hljs-comment">/**
 * Request width token
 * @param  {[type]} url    
 * @param  {[type]} options
 * @return {[type]}        
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestWidthToken</span> (<span class="hljs-params">url, options</span>) </span>{
        <span class="hljs-keyword">const</span> TOKEN = LocalStorage.getItem(TOKEN_NAME)
        options = <span class="hljs-built_in">Object</span>.assign({
            <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers({
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
                <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">`Bearer <span class="hljs-subst">${TOKEN}</span>`</span>
            })
        }, options)
        <span class="hljs-keyword">return</span> request(url, options)
}</code></pre>
<blockquote><p><code>dva/fetch</code> 直接导出了 <code>fetch</code><br><code>fetch</code> 的用法很简单，参考 <a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">github地址</a></p></blockquote>
<p>这里我们把 url 的 prefix、token name 提取出来用作常量保存，以便于我们修改，最好的方法是提取出来用一个文件保存</p>
<h4>组件与model的通信</h4>
<p>还记得我们的展示组件吗，现在我们让它 <code>connect</code> 到我们的 <code>model</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'dva'
const { Header, Content, Footer } = Layout
const { HeaderRight } = HeaderComponent
const App = ({children, routes, app, doLogin}) => {
    const { isLogin, user } = app
    return (
        <Layout>
            <Header>
                <HeaderComponent routes={routes}>
                    {isLogin ? <HeaderRight user={user} /> : <LoginComponent doLogin={doLogin} app={app} /> }
                </HeaderComponent>
            </Header>
           ...
    )
}
function mapStateToProps ({app}, ownProps) {
    return {
        app
    }
}
function mapDispatchToProps (dispatch) {
    return {
        doLogin({username, password}){
            dispatch({type: 'app/doLogin', payload: {username, password"}}")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'dva'</span>
<span class="hljs-keyword">const</span> { Header, Content, Footer } = Layout
<span class="hljs-keyword">const</span> { HeaderRight } = HeaderComponent
<span class="hljs-keyword">const</span> App = <span class="hljs-function">(<span class="hljs-params">{children, routes, app, doLogin}</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { isLogin, user } = app
    <span class="hljs-keyword">return</span> (
        &lt;Layout&gt;
            &lt;Header&gt;
                &lt;HeaderComponent routes={routes}&gt;
                    {isLogin ? &lt;HeaderRight user={user} /&gt; : &lt;LoginComponent doLogin={doLogin} app={app} /&gt; }
                &lt;/HeaderComponent&gt;
            &lt;/Header&gt;
           ...
    )
}
function mapStateToProps ({app}, ownProps) {
    return {
        app
    }
}
function mapDispatchToProps (dispatch) {
    return {
        doLogin({username, password}){
            dispatch({type: 'app/doLogin', payload: {username, password"}}")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)</code></pre>
<p>唯一需要注意的就是<code>action</code> 的 <code>type</code> 属性了，如 <code>app/doLogin</code> 前缀 <code>app</code> 就是 <code>dva.model</code> 的 <code>namespace</code></p>
<blockquote><p>从 <a href="https://github.com/dvajs/dva/blob/master/src/createDva.js#L461" rel="nofollow noreferrer" target="_blank">dva/createDva.js at master · dvajs/dva · GitHub</a> 中可以看到，<code>dva</code> 会把 <code>model.namespace</code> 最为 <code>reducer</code> , <code>effects </code> 的 <code>prefix</code> 拼接</p></blockquote>
<p>然后我们就可以在 <code>LoginComponent</code> 中，监听登陆的相应事件来调用对应的方法了。</p>
<h3 id="articleHeader5">小结</h3>
<p>在写后端的时，难免遇到很多错误，我们可以使用 <code>supervisor</code> 、<code>pm2</code> 来监听文件变动来自动重启 <code>nodejs</code> 。鉴于后期我们会使用 <code>pm2</code> 部署项目。这里我还是使用 pm2 </p>
<p>在 <code>server/package.json</code> 中的 <code>scripts</code> 下新增：<br><code>"start": "pm2 start bin/www --watch --name blog &amp;&amp; pm2 log blog",</code></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009676087">【单页面博客从前端到后端】环境搭建</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009712370" target="_blank">【单页面博客从前端到后端】基于 DVA+ANTD 搭建博客前后台界面</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009749208">【单页面博客从前端到后端】基于 Passport 和 Koa@2 的权限验证与 DVA 的 Model 设计</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【单页面博客从前端到后端】基于 Passport 和 Koa@2 的权限验证与 DVA 的 Model 设计

## 原文链接
[https://segmentfault.com/a/1190000009749208](https://segmentfault.com/a/1190000009749208)

