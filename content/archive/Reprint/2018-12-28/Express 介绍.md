---
title: 'Express 介绍' 
date: 2018-12-28 2:30:11
hidden: true
slug: tpkjpv55d7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Express 框架</h1>
<p>根据官方的介绍，Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，可以轻松的创建各种 web 或者移动端应用</p>
<p>今天就来简单的了解一下 Express 框架</p>
<h2 id="articleHeader1">安装</h2>
<p>首先安装 Express ,新建一个工作文件夹，并命名为 myapp ，在此文件夹下进行环境的初始化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>官方推荐的入口文件名为 app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry point: (index.js) app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">entry</span> <span class="hljs-selector-tag">point</span>: (<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>) <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.js</span></code></pre>
<p>当然也可以使用 npm 默认的 index.js 的文件名</p>
<p>接下来安装 Express</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">express</span> --<span class="hljs-built_in">save</span></code></pre>
<p>环境准备完成，现在尝试创建一个 Express 应用</p>
<p>进入 myapp 目录，新建一个 app.js 的文件，复制如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('这是一个 Express 应用')
})；

var server=app.listen(3000,()=>{
    console.log('服务已启动 http://localhost:3000')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> express=<span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app=express();

app.get(<span class="hljs-string">'/'</span>,(req,res)=&gt;{
    res.send(<span class="hljs-string">'这是一个 Express 应用'</span>)
})；

<span class="hljs-keyword">var</span> server=app.listen(<span class="hljs-number">3000</span>,()=&gt;{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'服务已启动 http://localhost:3000'</span>)
})</code></pre>
<p>上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “这是一个 Express 应用” 字符串。对于其他所有路径全部返回 404 </p>
<p>启动这个应用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js</code></pre>
<h2 id="articleHeader2">Express 应用生成器</h2>
<p>Express 应用生成器可以快速创建一个应用的骨架</p>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express-generator -gd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code class="shell" style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">express</span>-generator -<span class="hljs-built_in">gd</span></code></pre>
<p>安装完毕，创建一个名为myapp的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express myapp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">express myapp</span></code></pre>
<p>这条命令会在当前目录下创建 myapp 文件夹，并生成应用骨架</p>
<p>安装依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd myapp
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> myapp
npm install</code></pre>
<p>依赖安装完成就可以启动此app了</p>
<p>Windows 平台在 cmd 内输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set DEBUG=myapp &amp; npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">set</span> DEBUG=myapp &amp; npm <span class="hljs-built_in">start</span></code></pre>
<p>Mac 或者 Linux 平台输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DEBUG=myapp npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">DEBUG</span>=myapp npm start</code></pre>
<p>然后在浏览器中打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/ 网址就可以看到这个应用了</p>
<p>当应用首次启动以后，下次启动只需要输入 npm start 就行了</p>
<p>打开 package.json 文件，应用程序的启动实际上是依赖于这句代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;node ./bin/www&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node ./bin/www"</span>
  }</code></pre>
<h2 id="articleHeader3">路由</h2>
<p>Express 的主要内容有两个：</p>
<ul>
<li>路由</li>
<li>中间件</li>
</ul>
<p>先来说路由</p>
<p>路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。</p>
<p>每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个或者这些函数将被执行。</p>
<p>先写一个简单的路由</p>
<p>在 routes 目录下新建一个 orders.js 的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express=require('express');
var router=express.Router();

router.get('/',function(req,res,nest){
    res.render('orders',{msg:'订单首页'})
})
router.get('/list',function(req,res,next){
    res.send('订单列表')
})

//导出
module.exports=router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express=<span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router=express.Router();

router.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,nest</span>)</span>{
    res.render(<span class="hljs-string">'orders'</span>,{<span class="hljs-attr">msg</span>:<span class="hljs-string">'订单首页'</span>})
})
router.get(<span class="hljs-string">'/list'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>)</span>{
    res.send(<span class="hljs-string">'订单列表'</span>)
})

<span class="hljs-comment">//导出</span>
<span class="hljs-built_in">module</span>.exports=router;</code></pre>
<p>页面文件写好以后需要在在app.js中进行挂载，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var orders=require('./routes/orders');
···
app.use('/orders',orders)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> orders=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/orders'</span>);
···
app.use(<span class="hljs-string">'/orders'</span>,orders)</code></pre>
<p>这两句最好和其他的路由组件写在一起</p>
<p>在地址栏输入对应的 url 即可打开响应的页面</p>
<p>路由方法实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对网站首页的访问返回 &quot;Hello World!&quot; 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 对网站首页的访问返回 "Hello World!" 字样</span>
app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>);
});

<span class="hljs-comment">// 网站首页接受 POST 请求</span>
app.post(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Got a POST request'</span>);
});

<span class="hljs-comment">// /user 节点接受 PUT 请求</span>
app.put(<span class="hljs-string">'/user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Got a PUT request at /user'</span>);
});

<span class="hljs-comment">// /user 节点接受 DELETE 请求</span>
app.delete(<span class="hljs-string">'/user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Got a DELETE request at /user'</span>);
});</code></pre>
<h2 id="articleHeader4">中间件</h2>
<p>中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。</p>
<p>中间件的分类：</p>
<ul>
<li>应用级中间件</li>
<li>路由级中间件</li>
<li>错误处理中间件</li>
<li>内置中间件</li>
<li>第三方中间件</li>
</ul>
<h3 id="articleHeader5">应用级中间件</h3>
<p>应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 get , put , post 等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 没有挂载路径的中间件，应用的每个请求都会执行该中间件</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Time:'</span>, <span class="hljs-built_in">Date</span>.now());
  next();
});

<span class="hljs-comment">// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它</span>
app.use(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request Type:'</span>, req.method);
  next();
});

<span class="hljs-comment">// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求</span>
app.get(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.send(<span class="hljs-string">'USER'</span>);
});</code></pre>
<p>在执行完一个中间件之后，next() 会使程序继续执行下一个中间件，如果没有 next()，程序则不会往下执行。</p>
<p>在向页面发送内容时，程序也不会往下执行</p>
<p>我们也可以装在一组中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use('/user/:id',function(req,res,next){
    console.log('Request URL:', req.originalUrl);
    next();
},function(req,res,next){
    console.log('Request Type:', req.method);
    next();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-string">'/user/:id'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request URL:'</span>, req.originalUrl);
    next();
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request Type:'</span>, req.method);
    next();
})</code></pre>
<h3 id="articleHeader6">路由级中间件</h3>
<p>路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。</p>
<p>在上一节中，我们自己写的 orders.js ，其内容就是一个路由级中间件</p>
<p>路由级使用 router.use() 或 router.VERB() 加载。</p>
<p>上述在应用级创建的中间件系统，可通过如下代码改写为路由级：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> app = express();
<span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-comment">// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件</span>
router.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Time:'</span>, <span class="hljs-built_in">Date</span>.now());
  next();
});

<span class="hljs-comment">// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息</span>
router.use(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request URL:'</span>, req.originalUrl);
  next();
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request Type:'</span>, req.method);
  next();
});

<span class="hljs-comment">// 一个中间件栈，处理指向 /user/:id 的 GET 请求</span>
router.get(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-comment">// 如果 user id 为 0, 跳到下一个路由</span>
  <span class="hljs-keyword">if</span> (req.params.id == <span class="hljs-number">0</span>) next(<span class="hljs-string">'route'</span>);
  <span class="hljs-comment">// 负责将控制权交给栈中下一个中间件</span>
  <span class="hljs-keyword">else</span> next(); <span class="hljs-comment">//</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-comment">// 渲染常规页面</span>
  res.render(<span class="hljs-string">'regular'</span>);
});

<span class="hljs-comment">// 处理 /user/:id， 渲染一个特殊页面</span>
router.get(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(req.params.id);
  res.render(<span class="hljs-string">'special'</span>);
});

<span class="hljs-comment">// 将路由挂载至应用</span>
app.use(<span class="hljs-string">'/'</span>, router);</code></pre>
<h3 id="articleHeader7">错误处理中间件</h3>
<p>错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.error(err.stack);
  res.status(<span class="hljs-number">500</span>).send(<span class="hljs-string">'Something broke!'</span>);
});</code></pre>
<p>在其他 app.use() 和路由调用后，最后定义错误处理中间件，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // 业务逻辑
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">var</span> methodOverride = <span class="hljs-built_in">require</span>(<span class="hljs-string">'method-override'</span>);

app.use(bodyParser());
app.use(methodOverride());
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, req, res, next</span>) </span>{
  <span class="hljs-comment">// 业务逻辑</span>
});</code></pre>
<p>在我们创建的这个app中，app.js 内的错误处理中间件是这样写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, req, res, next</span>) </span>{
  <span class="hljs-comment">// set locals, only providing error in development</span>
  res.locals.message = err.message;
  res.locals.error = req.app.get(<span class="hljs-string">'env'</span>) === <span class="hljs-string">'development'</span> ? err : {};

  <span class="hljs-comment">// render the error page</span>
  res.status(err.status || <span class="hljs-number">500</span>);
  res.render(<span class="hljs-string">'error'</span>);
});</code></pre>
<p>错误中间件执行时，会调用 views 目录下的 error.jade 文件，在页面中打印详细的错误信息</p>
<h3 id="articleHeader8">内置中间件</h3>
<blockquote><p>express.static(root,[options])</p></blockquote>
<p>express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。</p>
<p>在 app.js 文件内也可以找到这个内置中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(express.static(path.join(__dirname, 'public')));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">app.use(express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)));</code></pre>
<p>详细信息参阅官方文档：www.expressjs.com.cn/guide/using-middleware.html</p>
<h3 id="articleHeader9">第三方中间件</h3>
<p>通过使用第三方中间件从而为 Express 应用增加更多功能。</p>
<p>安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。</p>
<p>实际上，我们创建的这个应用已经引入了两个第三方的中间件，在 package.json 中就可以找到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;body-parser&quot;: &quot;~1.18.2&quot;,
    &quot;cookie-parser&quot;: &quot;~1.4.3&quot;,
    &quot;debug&quot;: &quot;~2.6.9&quot;,
    &quot;express&quot;: &quot;~4.15.5&quot;,
    &quot;jade&quot;: &quot;~1.11.0&quot;,
    &quot;morgan&quot;: &quot;~1.9.0&quot;,
    &quot;serve-favicon&quot;: &quot;~2.4.5&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"body-parser"</span>: <span class="hljs-string">"~1.18.2"</span>,
    <span class="hljs-attr">"cookie-parser"</span>: <span class="hljs-string">"~1.4.3"</span>,
    <span class="hljs-attr">"debug"</span>: <span class="hljs-string">"~2.6.9"</span>,
    <span class="hljs-attr">"express"</span>: <span class="hljs-string">"~4.15.5"</span>,
    <span class="hljs-attr">"jade"</span>: <span class="hljs-string">"~1.11.0"</span>,
    <span class="hljs-attr">"morgan"</span>: <span class="hljs-string">"~1.9.0"</span>,
    <span class="hljs-attr">"serve-favicon"</span>: <span class="hljs-string">"~2.4.5"</span>
}</code></pre>
<p>其中 body-parser 和 cookie-parser 就是两个第三方中间件</p>
<h2 id="articleHeader10">模板引擎</h2>
<p>Express 默认的模板引擎是 jade 。现在 jade 已经更名为 pug ，没错，似李，巴扎嘿！</p>
<p><span class="img-wrap"><img data-src="/img/bVW3Gl?w=276&amp;h=226" src="https://static.alili.tech/img/bVW3Gl?w=276&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>pug 的语法请参阅 pug 文档：</p>
<blockquote><p><a href="https://pug.bootcss.com/api/getting-started.html" rel="nofollow noreferrer" target="_blank">https://pug.bootcss.com/api/g...</a></p></blockquote>
<p>我们在 views 目录下创建一个 orders.jade 的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doctype html
html
  head
    title 订单
  body
    h1 #{msg}
    p before the time begian" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="pug">doctype <span class="hljs-selector-tag">html</span>
<span class="hljs-selector-tag">html</span>
  head
    title 订单
  <span class="hljs-selector-tag">body</span>
    <span class="hljs-selector-tag">h1</span> #{msg}
    <span class="hljs-selector-tag">p</span> before the <span class="hljs-selector-tag">time</span> begian</code></pre>
<p>然后使用路由渲染它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/',function(req,res,nest){
    res.render('orders',{msg:'订单首页'})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">router.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,nest</span>)</span>{
    res.render(<span class="hljs-string">'orders'</span>,{<span class="hljs-attr">msg</span>:<span class="hljs-string">'订单首页'</span>})
})</code></pre>
<p>在向主页请求时，orders.jade 会被渲染为 HTML 文档</p>
<h2 id="articleHeader11">进程管理器</h2>
<p>在编写程序时，我们发现，每次更改文件之后，都需要在命令行内停止当前的服务，然后输入 npm start ，很麻烦。我们需要一款自动刷新的工具</p>
<p>这里介绍一下 pm2 </p>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install pm2 -gd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> pm2 -gd</code></pre>
<p>安装完毕，运行我们的程序吧：</p>
<p>还记得我们之前说的 npm start 的启动路径没</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> pm2 start ./bin/www --watch

[PM2] Applying action restartProcessId on app [www](ids: 0)
[PM2] [www](0) ✓
[PM2] Process successfully started
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬──────────┬──────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem      │ user     │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼──────────┼──────────┼──────────┤
│ www      │ 0  │ fork │ 14448 │ online │ 0       │ 0s     │ 0%  │ 8.6 MB   │ pureview │ enabled  │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴──────────┴──────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">&gt; pm2 start ./bin/www --watch

[PM2] Applying action restartProcessId on app [www](ids: <span class="hljs-number">0</span>)
[PM2] [www](<span class="hljs-number">0</span>) ✓
[PM2] <span class="hljs-keyword">Process</span> successfully started
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬──────────┬──────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem      │ user     │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼──────────┼──────────┼──────────┤
│ www      │ <span class="hljs-number">0</span>  │ fork │ <span class="hljs-number">14448</span> │ online │ <span class="hljs-number">0</span>       │ <span class="hljs-number">0</span>s     │ <span class="hljs-number">0</span>%  │ <span class="hljs-number">8.6</span> MB   │ pureview │ enabled  │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴──────────┴──────────┴──────────┘
 Use `pm2 show &lt;id|name&gt;` to get more details about an app</code></pre>
<p>当显示 status 为 online 时，说明程序启动成功</p>
<p>现在可以打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 就可以看到运行的程序了</p>
<p>从命令行中我们可以看出我们的 app 名称， id ，状态，内存和 cpu 占用，监视状态等信息</p>
<p>启动完成之后我们就可以根据我们程序的id进行控制了</p>
<p>下次启动可以输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start 0 --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-built_in">start</span> <span class="hljs-number">0</span> <span class="hljs-comment">--watch</span></code></pre>
<p>别忘了 --watch ,没有它，程序是无法自动刷新的</p>
<p>停止应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 stop 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-built_in">stop</span> <span class="hljs-number">0</span></code></pre>
<p>重启</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 restart 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">p<span class="hljs-name">m2</span> restart <span class="hljs-number">0</span></code></pre>
<p>显示程序信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 show 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-keyword">show</span> <span class="hljs-number">0</span></code></pre>
<p>删除程序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 delete 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-keyword">delete</span> <span class="hljs-number">0</span></code></pre>
<p>查看程序列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-built_in">list</span></code></pre>
<h1 id="articleHeader12">好了，这次关于 Express 的介绍就到这里了，谢谢大家</h1>
<blockquote><p>官方文档地址：<a href="http://www.expressjs.com.cn" rel="nofollow noreferrer" target="_blank">http://www.expressjs.com.cn</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 介绍

## 原文链接
[https://segmentfault.com/a/1190000011653111](https://segmentfault.com/a/1190000011653111)

