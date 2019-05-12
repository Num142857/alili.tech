---
title: 'Vue全家桶+Socket.io+Express/Koa2打造网页版手机QQ' 
date: 2019-01-06 2:30:10
hidden: true
slug: pqcvzrawkwk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>介绍</strong></h2>
<p>Vue全家桶+Socket.io+Express/Koa2打造的网页版手机QQ(web app),高仿手机QQ7.1.0版本</p>
<h2 id="articleHeader1"><strong>预览</strong></h2>
<p>在线预览地址：<a href="https://qq.lenshen.com" rel="nofollow noreferrer" target="_blank">https://qq.lenshen.com</a> （为了体验到最佳的效果，提供了3个测试账号，需要账号才能登陆哦，具体账号和密码下面有讲）<br>现在项目已开源，源码：<a href="https://github.com/lensh/vue-qq" rel="nofollow noreferrer" target="_blank">https://github.com/lensh/vue-qq</a>。</p>
<p>目前已经实现了QQ的核心功能，如消息列表、好友列表、新朋友、好友申请、实时群聊、实时私聊、聊天设置、屏蔽对方聊天、特别关心、会员等级、个性名片、添加好友、删除好友、好友分组、查找用户、登录、注销、切换用户、右滑显示侧栏等等。后期会考虑增加更多功能。</p>
<h2 id="articleHeader2"><strong>技术栈</strong></h2>
<p>Vue2.0：实现前端页面构建<br>Vuex：实现不同组件间的状态共享<br>Vue-router：页面路由切换,实现单页的核心<br>vueg：页面复杂场景切换效果<br>Socket.io：实现实时消息推送<br>axios：一个基于 Promise 的 HTTP 库，向后端发起请求<br>Express、Koa2：开发环境使用Express，生产环境使用Koa2<br>ES6、ES7、ES8：服务端和客户端均使用ES6语法，promise/async/await 处理异步<br>localStorage：本地保存用户信息<br>Webpack：模块打包，前端项目构建工具首选<br>SASS(SCSS)：CSS预处理语言<br>Flex：flex弹性布局，简单适配手机、PC端<br>CSS3：CSS3过渡动画及样式<br>IScroll：模拟原生app的列表滚动效果(ListView)<br>MySQL：MySQL关系型数据库持久化数据（考虑到表与表之间关系复杂，需要多表查询，最复杂的时候是六张表联查，用MySQL会比Mongodb好得多）<br>jsonp：跨域请求数据<br>pm2：服务端使用pm2部署，常驻进程，比forever好用得多（<a href="https://github.com/Unitech/pm2" rel="nofollow noreferrer" target="_blank">https://github.com/Unitech/pm2</a>）<br>nginx：nginx代理端口转发，三级域名配置</p>
<h2 id="articleHeader3"><strong>使用方式</strong></h2>
<p>先将根目录下的qq.sql导入到你的MySQL数据库里(可以使用Navicat)，用户名为root，登录密码为空。启动MySQL服务。然后使用cnpm install 安装所有依赖(最好用cnpm安装，因为项目依赖很多，npm用的是国外的镜像，在网络不稳定的情况下很有可能会导致安装失败，而且下载速度远远慢于国内的cnpm)，最后运行npm run dev。服务器部署运行项目只需要npm run pm2，这样就可以常驻进程，不过前提是得先全局安装pm2。</p>
<p>尽量使用Chrome浏览器体验最佳效果。另外提供了三个测试账号，默认用户的密码都是6个1:</p>
<p>qq:986992484 密码:111111</p>
<p>qq:986992483 密码:111111</p>
<p>qq:986992482 密码:111111</p>
<p>如果你想体验实时聊天的酷炫效果，那么你可以打开两个浏览器，用上面不同的账号登录即可。</p>
<h2 id="articleHeader4"><strong>截图</strong></h2>
<p>消息页面</p>
<p><span class="img-wrap"><img data-src="/img/bVRSQM?w=530&amp;h=642" src="https://static.alili.tech/img/bVRSQM?w=530&amp;h=642" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>联系人页面</p>
<p><span class="img-wrap"><img data-src="/img/bVRSQV?w=497&amp;h=641" src="https://static.alili.tech/img/bVRSQV?w=497&amp;h=641" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>群聊</p>
<p><span class="img-wrap"><img data-src="/img/bVRSQ9?w=488&amp;h=641" src="https://static.alili.tech/img/bVRSQ9?w=488&amp;h=641" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>私聊</p>
<p><span class="img-wrap"><img data-src="/img/bVRSRe?w=489&amp;h=640" src="https://static.alili.tech/img/bVRSRe?w=489&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5"><strong>分析</strong></h2>
<p><strong>1. 服务端使用ES6语法</strong></p>
<p>不需要使用babel转码以及一系列的配置，只需要将node升级到V8版本，V8已经很好地支持了ES6/ES7/ES8等最新特性，这是目前最好的办法。升级到V8版本，可以直接到nodejs中文网(<a href="http://nodejs.cn/download/)" rel="nofollow noreferrer" target="_blank">http://nodejs.cn/download/)</a> 下载即可，也可以使用NVM切换node版本。</p>
<p>升级到V8后，还不支持通过import/export关键字来导入导出模块(因为服务端已经有了CommonJS规范，如果再使用import/export的话就有点冲突了)，如果一定要使用import/export关键字，这时可以在服务端的入口文件首行添加以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-core/register&quot;)({
    presets: ['es2015', 'stage-0']
})
require(&quot;babel-polyfill&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"babel-core/register"</span>)</span><span class="hljs-params">({
    presets: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>]
})</span></span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"babel-polyfill"</span>)</span></span></code></pre>
<p>上面的代码不可以使用import来导入，必须使用require，同时需要通过npm安装babel-core、babel-preset-es2015、babel-preset-stage-0、babel-polyfill等依赖。这样就可以愉快地使用import/export了。</p>
<p>服务端代码片段如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6 import/export
import express from 'express'
import loginRouter from './router/login'
import registerRouter from './router/register'
import friendRouter from './router/friend'
import messageRouter from './router/message'
import userRouter from './router/user'

const apiRouter = express.Router()

apiRouter
    .use('/login', loginRouter)
    .use('/register', registerRouter)
    .use('/friend', friendRouter)
    .use('/message', messageRouter)
    .use('/user', userRouter)

export default apiRouter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> ES6 <span class="hljs-keyword">import</span>/<span class="hljs-keyword">export</span>
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>
<span class="hljs-keyword">import</span> loginRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/login'</span>
<span class="hljs-keyword">import</span> registerRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/register'</span>
<span class="hljs-keyword">import</span> friendRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/friend'</span>
<span class="hljs-keyword">import</span> messageRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/message'</span>
<span class="hljs-keyword">import</span> userRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/user'</span>

const apiRouter = express.Router()

apiRouter
    .use(<span class="hljs-string">'/login'</span>, loginRouter)
    .use(<span class="hljs-string">'/register'</span>, registerRouter)
    .use(<span class="hljs-string">'/friend'</span>, friendRouter)
    .use(<span class="hljs-string">'/message'</span>, messageRouter)
    .use(<span class="hljs-string">'/user'</span>, userRouter)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> apiRouter</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES8 async/await
import express from 'express'
import login from '../../controller/login'

const loginRouter = express.Router()

loginRouter
    .get('/:user/:pwd', async(req, res) => { // 登录
        const result = await login.login(req, res)
        res.json(result)
    })

export default loginRouter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// ES8 async/await</span>
<span class="hljs-keyword">import</span> express from <span class="hljs-string">'express'</span>
<span class="hljs-keyword">import</span> login from <span class="hljs-string">'../../controller/login'</span>

<span class="hljs-keyword">const</span> loginRouter = express.Router()

loginRouter
    .<span class="hljs-keyword">get</span>(<span class="hljs-string">'/:user/:pwd'</span>, <span class="hljs-keyword">async</span>(req, res) =&gt; { <span class="hljs-comment">// 登录</span>
        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> login.login(req, res)
        res.json(result)
    })

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> loginRouter</code></pre>
<p><strong>2.Socket.io</strong></p>
<p>服务端(结合Express/Koa):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Server
import express from 'express'
import http from 'http'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
server.listen(3000)

io.on('connection', (socket)=>{
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
     console.log(data)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// Server</span>
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>
<span class="hljs-keyword">import</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">'http'</span>
<span class="hljs-keyword">import</span> socketio <span class="hljs-keyword">from</span> <span class="hljs-string">'socket.io'</span>

<span class="hljs-keyword">const</span> app = express()
<span class="hljs-keyword">const</span> server = http.createServer(app)
<span class="hljs-keyword">const</span> io = socketio(server)
server.listen(<span class="hljs-number">3000</span>)

io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function">(<span class="hljs-params">socket</span>)=&gt;</span>{
  socket.emit(<span class="hljs-string">'news'</span>, { hello: <span class="hljs-string">'world'</span> })
  socket.on(<span class="hljs-string">'my other event'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
     <span class="hljs-built_in">console</span>.log(data)
  })
})</code></pre>
<p>客户端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Client

<script src=&quot;http://localhost:3000/socket.io/socket.io.js&quot;></script>
<script>
  const socket = io.connect('http://localhost:3000')
  socket.on('news', (data)=>{
    socket.emit('my other event', { my: 'data' })
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// Client

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://localhost:3000/socket.io/socket.io.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">const</span> socket = io.connect(<span class="hljs-string">'http://localhost:3000'</span>)
  socket.on(<span class="hljs-string">'news'</span>, (data)=&gt;{
    socket.emit(<span class="hljs-string">'my other event'</span>, { my: <span class="hljs-string">'data'</span> })
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>socket.io最核心的两个api就是emit 和 on了 ，服务端和客户端都有这两个api。通过 emit 和 on可以实现服务器与客户端之间的双向通信。</p>
<p>emit ：发射一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（如需对方接受到信息后立即得到确认时，则需要用到回调函数）。</p>
<p>on ：监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为回调函数，用来接收对方发来的数据，该函数的第一个参数为接收的数据。</p>
<p>服务端常用API：</p>
<p>socket.emit()：向建立该连接的客户端发送消息</p>
<p>socket.on()：监听客户端发送信息</p>
<p>io.to(socketid).emit()：向指定客户端发送消息</p>
<p>io.sockets.socket(socketid).emit()：向指定客户端发送消息，新版本用io.sockets.socket[socketid].emit() ，数组访问</p>
<p>socket.broadcast.emit()：向除去建立该连接的客户端的所有客户端广播</p>
<p>io.sockets.emit()：向所有客户端广播</p>
<p>客户端常用API：</p>
<p>socket.emit()：向服务端发送消息</p>
<p>socket.on()：监听服务端发来的信息</p>
<h2 id="articleHeader6"><strong>最后</strong></h2>
<p>源码地址：<a href="https://github.com/lensh/vue-qq" rel="nofollow noreferrer" target="_blank">https://github.com/lensh/vue-qq</a>，如果觉得不错，就毫不吝啬地给个star吧。后期项目还会继续更新和完善。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶+Socket.io+Express/Koa2打造网页版手机QQ

## 原文链接
[https://segmentfault.com/a/1190000010451790](https://segmentfault.com/a/1190000010451790)

