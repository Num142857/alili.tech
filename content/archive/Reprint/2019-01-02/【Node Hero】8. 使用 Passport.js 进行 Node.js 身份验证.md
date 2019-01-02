---
title: '【Node Hero】8. 使用 Passport.js 进行 Node.js 身份验证' 
date: 2019-01-02 2:30:09
hidden: true
slug: jfberymexvk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@bigshaw" rel="nofollow noreferrer" target="_blank">网络埋伏纪事</a><br>链接：<a href="http://www.zcfy.cc/article/1755" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/1755</a><br>原文：<a href="https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/" rel="nofollow noreferrer" target="_blank">https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/</a></p></blockquote>
<p>本教程中将学习如何使用 Passport.js 和 Redis 实现一个本地 Node.js 身份验证策略。</p>
<h2 id="articleHeader0">要使用的技术</h2>
<p>在一头扎进实际代码之前，我们先看看本章中要用到的新技术。</p>
<h4>Passport.js 是什么？</h4>
<blockquote><p>简单、 不花哨的 Node.js 身份验证 - <a href="http://passportjs.org/" rel="nofollow noreferrer" target="_blank">passportjs.org</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010964450" src="https://static.alili.tech/img/remote/1460000010964450" alt="Passport.js is an authentication middleware for Node.js" title="Passport.js is an authentication middleware for Node.js" style="cursor: pointer; display: inline;"></span></p>
<p>Passport 是一个 Node.js 身份认证中间件，我们将把它用于会话管理。</p>
<h4>Redis 是什么？</h4>
<blockquote><p>Redis 是一个开源的（BSD 许可）、内存中的数据结构仓库，被用作数据库、缓存和消息代理中间件 - <a href="http://redis.io/" rel="nofollow noreferrer" target="_blank">redis.io</a>。</p></blockquote>
<p>我们打算把用户的会话信息存到 Redis 中，而不是在会话过程的内存中。通过这种方式，我们的应用程序会更容易扩展一些。</p>
<h2 id="articleHeader1">演示应用</h2>
<p>出于演示目的，下面我们创建一个只做如下事情的应用程序：</p>
<ul>
<li><p>显示一个登录表单，</p></li>
<li>
<p>显示两个受保护页面：</p>
<ul>
<li><p>概述（profile）页面，</p></li>
<li><p>secured notes</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader2">项目结构</h3>
<p>在前一章你已经学习了<a href="https://blog.risingstack.com//node-hero-node-js-project-structure-tutorial/" rel="nofollow noreferrer" target="_blank">如何组织 Node.js 项目的结构</a>，所以下面我们就开始用所学的知识！</p>
<p>我们打算采用如下结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app
|   ├── authentication
|   ├── note
|   ├── user
|   ├── index.js
|   └── layout.hbs
├── config
|   └── index.js
├── index.js
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├── app
<span class="hljs-string">|   ├── authentication</span>
<span class="hljs-string">|   ├── note</span>
<span class="hljs-string">|   ├── user</span>
<span class="hljs-string">|   ├── index.js</span>
<span class="hljs-string">|   └── layout.hbs</span>
├── config
<span class="hljs-string">|   └── index.js</span>
├── index.js
└── package.json</code></pre>
<p>正如你所见，我们会围绕着功能来组织文件和目录。我们将有一个用户页，一个备注页，和一些与身份验证相关的功能。</p>
<blockquote><p>完整的代码下载在 <a href="https://github.com/RisingStack/nodehero-authentication" rel="nofollow noreferrer" target="_blank">https://github.com/RisingStack/nodehero-authentication</a>。*</p></blockquote>
<h3 id="articleHeader3">Node.js 身份验证流程</h3>
<p>我们的目标是实现如下的身份验证流程到我们的应用程序中：</p>
<ol>
<li><p>用户输入姓名和密码</p></li>
<li><p>应用程序检查是否匹配</p></li>
<li><p>如果匹配，就发送一个 <code>Set-Cookie</code> 响应头，用它来验证之后的页面</p></li>
<li><p>当用户从同一域访问页面时，之前设置的 cookie 会被添加到所有的请求中</p></li>
<li><p>用这个 cookie 验证受限制的页面</p></li>
</ol>
<p>为设置像这样的身份验证策略，请遵循如下三个步骤：</p>
<h4>第一步：设置 Express</h4>
<p>我们打算用 Express 作为服务器框架 - 可以通过阅读我们的 <a href="https://blog.risingstack.com//your-first-node-js-http-server" rel="nofollow noreferrer" target="_blank">Express 教程</a>，来学习更多关于此主题的知识。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file:app/index.js
const express = require('express')  
const passport = require('passport')  
const session = require('express-session')  
const RedisStore = require('connect-redis')(session)

const app = express()  
app.use(session({  
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())  
app.use(passport.session())  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// file:app/index.js</span>
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)  
<span class="hljs-keyword">const</span> passport = <span class="hljs-keyword">require</span>(<span class="hljs-string">'passport'</span>)  
<span class="hljs-keyword">const</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express-session'</span>)  
<span class="hljs-keyword">const</span> RedisStore = <span class="hljs-keyword">require</span>(<span class="hljs-string">'connect-redis'</span>)(session)

<span class="hljs-keyword">const</span> app = express()  
app.<span class="hljs-keyword">use</span>(session({  
  store: <span class="hljs-keyword">new</span> RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: <span class="hljs-keyword">false</span>,
  saveUninitialized: <span class="hljs-keyword">false</span>
}))
app.<span class="hljs-keyword">use</span>(passport.initialize())  
app.<span class="hljs-keyword">use</span>(passport.session())  </code></pre>
<p>在这里我们做了什么？</p>
<p>首先，我们 require 了所有会话管理所需的依赖。之后，我们从 <code>express-session</code> 模块创建了一个新的实例，用它来存储会话。</p>
<p>为后备存储，我们用了 Redis。但是，你可以使用任何其它数据库，比如 MySQL 或者 MongoDB。</p>
<h4>第二步：设置 Node.js Passport</h4>
<p>Passport 是使用插件的一个很好的示例库。对于本教程，我们添加 <code>passport-local</code> 模块，该模块让我们可以很容易集成使用用户名和密码的简单本地身份验证策略。</p>
<p>为简单起见，在本例中，我们没有使用第二个后备存储，只用了一个内存中的 user 实例。在真实应用程序中，<code>findUser</code> 会在数据库中查找一个用户。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file:app/authenticate/init.js
const passport = require('passport')  
const LocalStrategy = require('passport-local').Strategy

const user = {  
  username: 'test-user',
  password: 'test-password',
  id: 1
}

passport.use(new LocalStrategy(  
  function(username, password, done) {
    findUser(username, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (password !== user.password  ) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// file:app/authenticate/init.js</span>
<span class="hljs-keyword">const</span> passport = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport'</span>)  
<span class="hljs-keyword">const</span> LocalStrategy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport-local'</span>).Strategy

<span class="hljs-keyword">const</span> user = {  
  <span class="hljs-attribute">username</span>: <span class="hljs-string">'test-user'</span>,
  <span class="hljs-attribute">password</span>: <span class="hljs-string">'test-password'</span>,
  <span class="hljs-attribute">id:</span><span class="hljs-string"> 1
}

passport.use</span>(<span class="hljs-keyword">new</span> LocalStrategy(  
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">username, password, done</span>) </span>{
    findUser(username, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, user</span>) </span>{
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">return</span> done(err)
      }
      <span class="hljs-keyword">if</span> (!user) {
        <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>)
      }
      <span class="hljs-keyword">if</span> (password !== user.password  ) {
        <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>)
      }
      <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>, user)
    })
  }
))</code></pre>
<p>一旦 <code>findUser</code> 返回 user 对象，剩下的唯一的事情是比较提供的用户以及真实密码，看看是否匹配。</p>
<p>如果匹配，就让用户进入（通过将用户返回给 passport - <code>return done(null, user)</code>）；如果不匹配，就返回一个未授权错误（通过什么都不返回给 passport -  <code>return done(null)</code>）。</p>
<h4>第三步：添加受保护的端点</h4>
<p>要添加受保护的端点，就得利用 Express 所用的中间件模式。为此，先创建身份验证中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file:app/authentication/middleware.js
function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// file:app/authentication/middleware.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">authenticationMiddleware</span> <span class="hljs-params">()</span> </span>{  
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res, next)</span> </span>{
    <span class="hljs-keyword">if</span> (req.isAuthenticated()) {
      <span class="hljs-keyword">return</span> next()
    }
    res.redirect(<span class="hljs-string">'/'</span>)
  }
}</code></pre>
<p>这段代码有一个作用，就是如果用户被验证（有正确的 cookies），就调用下一个中间件；否则就重定向到用户登录页面。</p>
<p>用这种方式与把新中间件添加到路由定义一样简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file:app/user/init.js
const passport = require('passport')

app.get('/profile', passport.authenticationMiddleware(), renderProfile)  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// file:app/user/init.js</span>
<span class="hljs-keyword">const</span> passport = require(<span class="hljs-string">'passport'</span>)

app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/profile'</span>, passport.authenticationMiddleware(), renderProfile)  </code></pre>
<h2 id="articleHeader4">总结</h2>
<p>在本教程中，你已经学习了如何给应用程序添加基础的身份验证。之后，就可以用不同的身份验证策略扩展它，比如 Facebook 或 Twitter。在 <a href="http://passportjs.org/" rel="nofollow noreferrer" target="_blank">http://passportjs.org/</a> 上可以找到更多策略。</p>
<p>完整的示例代码放在 GitHub 上，你可以看看这里：<a href="https://github.com/RisingStack/nodehero-authentication" rel="nofollow noreferrer" target="_blank">https://github.com/RisingStack/nodehero-authentication</a>。</p>
<h2 id="articleHeader5">下一步</h2>
<p>下一章主要涉及 <a href="https://blog.risingstack.com//node-hero-node-js-unit-testing-tutorial" rel="nofollow noreferrer" target="_blank">Node.js 应用程序的单元测试</a>。你会学习单元测试、测试金字塔、测试替代等概念。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node Hero】8. 使用 Passport.js 进行 Node.js 身份验证

## 原文链接
[https://segmentfault.com/a/1190000010964445](https://segmentfault.com/a/1190000010964445)

