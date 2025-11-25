---
title: 'express web的一款mvc框架' 
date: 2018-12-28 2:30:11
hidden: true
slug: hu1vc05ffyk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">express</h1>
<p>express相关的网站<br>*<a href="http://expressjs.com/" rel="nofollow noreferrer" target="_blank">http://expressjs.com/</a><br>*<a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">http://www.expressjs.com.cn/</a><br>*<a href="https://github.com/pugjs/pug" rel="nofollow noreferrer" target="_blank">https://github.com/pugjs/pug</a><br>*<a href="https://pug.bootcss.com/api/getting-started.html" rel="nofollow noreferrer" target="_blank">https://pug.bootcss.com/api/g...</a></p>
<h2 id="articleHeader1">web开发有这么常用的四款mvc (model(数据层) view(视图层) controller(控制层))框架，我们今天说一下express</h2>
<p>*express<br>*koa<br>*阿里的egg框架<br>*thinkjs</p>
<h2 id="articleHeader2">express()</h2>
<p>Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架</p>
<h2 id="articleHeader3">安装</h2>
<p>创建一个目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir myapp
$ cd myapp  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ mkdir myapp
$ cd myapp  </code></pre>
<p>通过 npm init 命令为你的应用创建一个 package.json 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ npm init  </code></pre>
<p>然后需要我们自己在目录下创建一个app.js 文件  <br>接下来安装 Express 并将其保存到依赖列表中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install express --save  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ npm install express --save  </code></pre>
<h2 id="articleHeader4">Hello world 实例</h2>
<h4>app.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');//引入模块
var app = express();//调用函数

app.get('/', function (req, res) {
  res.send('Hello World!');
});//请求Hello World!

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});  //启动" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);<span class="hljs-comment">//引入模块</span>
<span class="hljs-keyword">var</span> app = express();<span class="hljs-comment">//调用函数</span>

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>);
});<span class="hljs-comment">//请求Hello World!</span>

<span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> host = server.address().address;
  <span class="hljs-keyword">var</span> port = server.address().port;

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening at http://%s:%s'</span>, host, port);
});  <span class="hljs-comment">//启动</span></code></pre>
<p>运行下面命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node app.js  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ node app.js  </code></pre>
<p>然后在浏览器中打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/ 并查看输出结果。</p>
<h2 id="articleHeader5">express 应用生成器</h2>
<p>通过应用生成器工具 express 可以快速创建一个应用的脚手架。<br>命令行安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install express-generator -g  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ npm install express-generator -g  </code></pre>
<p>在当前工作目录下创建一个命名为 myapp1 的应用。(和myapp同级)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ express myapp  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ express myapp  </code></pre>
<p>安装依赖包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd myapp 
$ npm install  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ cd myapp 
$ npm install  </code></pre>
<p>启动这个应用（MacOS 或 Linux 平台）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ DEBUG=myapp npm start  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ DEBUG=myapp npm start  </code></pre>
<p>Windows 平台使用如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set DEBUG=myapp &amp; npm start  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">set DEBUG=myapp &amp; npm start  </code></pre>
<p>然后在浏览器中打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/ 网址就可以看到这个应用了</p>
<h2 id="articleHeader6">express路由</h2>
<p>路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求</p>
<p>我们可以在routes这个文件夹下创建一个文件order.js来详细的说一下路由的用法。<br> order.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('order',{msg:'我的订单'});
});
router.get('/list', function(req, res, next) {
  res.send('订单列表');
});


module.exports = router;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  res.render(<span class="hljs-string">'order'</span>,{<span class="hljs-attr">msg</span>:<span class="hljs-string">'我的订单'</span>});
});
router.get(<span class="hljs-string">'/list'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  res.send(<span class="hljs-string">'订单列表'</span>);
});


<span class="hljs-built_in">module</span>.exports = router;
</code></pre>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var order = require('./routes/order');//引入roder.js
app.use('/order', order);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> order = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/order'</span>);<span class="hljs-comment">//引入roder.js</span>
app.use(<span class="hljs-string">'/order'</span>, order);</code></pre>
<h2 id="articleHeader7">Express 模板引擎(本博客开头有网址关于 pug(jade)的)</h2>
<p>模板引擎有这么几类pug(jade) ejs handlerbars(扩展模块)<br>需要在应用中进行如下设置才能让 Express 渲染模板文件：<br>*views, 放模板文件的目录，比如： app.set('views', './views')<br>*view engine, 模板引擎，比如： app.set('view engine', 'jade')</p>
<p>然后安装相应的模板引擎 npm 软件包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install jade --save
$ npm install ejs --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ npm install jade --save
$ npm install ejs --save</code></pre>
<p>需要那种就在app.set('view engine', 'jade')里将'jade'改成那种。<br>在 views 目录下生成名为 order.jade 的 Jade 模板文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doctype html
html
  head
    title 订单
  body
    h1 #{msg}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">doctype html
html
  head
    title 订单
  body
    h1 #{msg}
</code></pre>
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
<h2 id="articleHeader8">Express 托管静态文件</h2>
<p>通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。</p>
<p>将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(express.static('public'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">app.use(express.static(<span class="hljs-string">'public'</span>));</code></pre>
<p>如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(express.static('public'));
app.use(express.static('files'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(express.static(<span class="hljs-string">'public'</span>));
app.use(express.static(<span class="hljs-string">'files'</span>));</code></pre>
<p>你就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">http:<span class="hljs-comment">//localhost:3000/static/images/kitten.jpg</span>
http:<span class="hljs-comment">//localhost:3000/static/css/style.css</span>
http:<span class="hljs-comment">//localhost:3000/static/js/app.js</span>
http:<span class="hljs-comment">//localhost:3000/static/images/bg.png</span>
http:<span class="hljs-comment">//localhost:3000/static/hello.html</span></code></pre>
<h2 id="articleHeader9">中间件</h2>
<p>中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。</p>
<h4>中间件的功能包括：</h4>
<p>*执行任何代码。<br>*修改请求和响应对象。<br>*终结请求-响应循环。<br>*调</p>
<h4>中间件种类:</h4>
<p>*应用级中间件<br>*路由级中间件<br>*错误处理中间件<br>*内置中间件<br>*第三方中间件</p>
<h5>应用级中间件</h5>
<p>应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：</p>
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
<p>在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 一个中间件栈，处理指向 /user/:id 的 GET 请求</span>
app.get(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ID:'</span>, req.params.id);
  next();
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.send(<span class="hljs-string">'User Info'</span>);
});

<span class="hljs-comment">// 处理 /user/:id， 打印出用户 id</span>
app.get(<span class="hljs-string">'/user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.end(req.params.id);
});</code></pre>
<p>如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。</p>
<h5>路由级中间件</h5>
<p>路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = express.Router();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> router = express.Router();</code></pre>
<p>路由级使用 router.use() 或 router.VERB() 加载。</p>
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
<h5>错误处理中间件</h5>
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
<h5>内置中间件</h5>
<p>express.static(root, [options])</p>
<p>express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。</p>
<p>参数 root 指提供静态资源的根目录。<br>下面的例子使用了 express.static 中间件，其中的 options 对象经过了精心的设计。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> options = {
  <span class="hljs-attr">dotfiles</span>: <span class="hljs-string">'ignore'</span>,
  <span class="hljs-attr">etag</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'htm'</span>, <span class="hljs-string">'html'</span>],
  <span class="hljs-attr">index</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">maxAge</span>: <span class="hljs-string">'1d'</span>,
  <span class="hljs-attr">redirect</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">setHeaders</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res, path, stat</span>) </span>{
    res.set(<span class="hljs-string">'x-timestamp'</span>, <span class="hljs-built_in">Date</span>.now());
  }
}

app.use(express.static(<span class="hljs-string">'public'</span>, options));</code></pre>
<h5>第三方中间件</h5>
<p>通过使用第三方中间件从而为 Express 应用增加更多功能。</p>
<p>安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。</p>
<h2 id="articleHeader10">进程管理器</h2>
<p>在编写程序时，我们发现，每次更改文件之后，都需要在命令行内停止当前的服务，然后输入 npm start ，很麻烦。我们需要一款自动刷新的工具</p>
<p>pm2</p>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install pm2 -gd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install pm2 -gd</code></pre>
<p>启动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start ./bin/www --watch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">pm2 start ./bin/www --watch
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PS D:\node.js\code\0505\myapp2> pm2 start ./bin/www --watch
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user   │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼────────┼──────────┤
│ www      │ 0  │ fork │ 17480 │ online │ 0       │ 0s     │ 0%  │ 24.1 MB   │ lenovo │ enabled  │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">PS D:\node.js\code\<span class="hljs-number">0505</span>\myapp2&gt; pm2 start ./bin/www --watch
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user   │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼────────┼──────────┤
│ www      │ <span class="hljs-number">0</span>  │ fork │ <span class="hljs-number">17480</span> │ online │ <span class="hljs-number">0</span>       │ <span class="hljs-number">0</span>s     │ <span class="hljs-number">0</span>%  │ <span class="hljs-number">24.1</span> MB   │ lenovo │ enabled  │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴────────┴──────────┘
 Use <span class="hljs-string">`pm2 show &lt;id|name&gt;`</span> to get more details about an app</code></pre>
<p>当显示 status 为 online 时，说明程序启动成功</p>
<p>现在可以打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 就可以看到运行的程序了</p>
<p>停止应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 stop 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">pm2 stop <span class="hljs-number">0</span></code></pre>
<p>重启</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 restart 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">pm2 restart <span class="hljs-number">0</span></code></pre>
<p>显示程序信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 show 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">pm2 show <span class="hljs-number">0</span></code></pre>
<p>删除程序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 delete 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-keyword">delete</span> <span class="hljs-number">0</span></code></pre>
<p>查看程序列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">pm2 list</code></pre>
<p>这就是一些express的基本内容，喜欢的点个赞再走呗。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
express web的一款mvc框架

## 原文链接
[https://segmentfault.com/a/1190000011653589](https://segmentfault.com/a/1190000011653589)

