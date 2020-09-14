---
title: 'express简单总结' 
date: 2018-12-17 2:30:07
hidden: true
slug: d9a7smtos8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">express介绍</h2>
<p>如有不详细或者不正确的地方多多指正。</p>
<p>我们可以拿js与jquery关系来类比一下：</p>
<p>jQuery是JS在浏览器环境下的封装库，把DOM操作，ajax等封装成了兼容性好，方便使用的方法<br>node是JS的一个非浏览器运行平台，里面提供API进行web服务器开发，封装了node关于web的一些API</p>
<p>两者有相同之处，express和jQuery都是对自己平台（node，DOM API）进行了封装<br>两者有不同之处，功能范畴完全不一样。express开发服务器，jquery做浏览器端操作。</p>
<p>express可以通过官方提供的命令行进行安装，官方目前默认的界面文件用jade格式，建议修改为pug格式的文件（<a href="https://www.zhihu.com/question/46418330" rel="nofollow noreferrer" target="_blank">jade版权问题</a>） ，同时要在package.json中安装对应的npm包和app.js <code>app.set('view engine', 'pug')</code>设置对应的界面引擎解释器。</p>
<h2 id="articleHeader1">路由</h2>
<h4>get请求</h4>
<p>路由的使用首先要引入express的路由模块，express官网的一个简单的get请求路由示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var app = express();

// respond with &quot;hello world&quot; when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// respond with "hello world" when a GET request is made to the homepage</span>
app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'hello world'</span>);
});</code></pre>
<h4>post请求</h4>
<p>post请求首先要引入bodyparse中间件，它用于解析客户端请求中的body中的内容,<br>使用express应用生成器生成一个网站，它默认已经使用了 bodyParser.json 与 bodyParser.urlencoded 的解析功能，除了这两个，bodyParser还支持对text、raw的解析。</p>
<p><code>app.use(bodyParser.json())</code>bodyParser.json是用来解析json数据格式的<br><code>app.use(bodyParser.urlencoded({ extended: false }))</code>bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded;</p>
<p>extended:如果设置为false，那么对URL-encoded的数据的解析采用querystring库，如果设置为true那么采用qs库(（<a href="https://segmentfault.com/q/1010000012370558/">querystring和qs的不同</a>）)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// home.pug
$.ajax({
    url:userPath+&quot;/userinfo-company&quot;,
    data:{
        module:'user',
        userId:userId
    },
    type:&quot;POST&quot;,
    success:function(res){
        alert(res);
    },
    error:function(error){
        console.log(error);
    }
});

// index.js

var bodyParser = require('body-parser');  // bodyparser中间件
<!--app.use(bodyParser.json());-->   // bodyParser.json是用来解析json数据格式的
<!--app.use(bodyParser.urlencoded({ extended: false })); -->   // bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
router.post('/userinfo-company', function(req, res, next) {
    var module = req.body.module;
    var userid = req.body.userId;
    request(
        { 
            url: nodeApi + '/menu/getInfo',
            method: 'POST',
            form: {
                module: module,
                userId: userid
            }
        },
        function(error,response,body) {
            if( response.statusCode == 200 ) {
                var tempArr = JSON.parse(body);
            }
        }
    );
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// home.pug</span>
$.ajax({
    <span class="hljs-attr">url</span>:userPath+<span class="hljs-string">"/userinfo-company"</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">module</span>:<span class="hljs-string">'user'</span>,
        <span class="hljs-attr">userId</span>:userId
    },
    <span class="hljs-attr">type</span>:<span class="hljs-string">"POST"</span>,
    <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
        alert(res);
    },
    <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
        <span class="hljs-built_in">console</span>.log(error);
    }
});

<span class="hljs-comment">// index.js</span>

<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);  <span class="hljs-comment">// bodyparser中间件</span>
&lt;!--app.use(bodyParser.json());--&gt;   <span class="hljs-comment">// bodyParser.json是用来解析json数据格式的</span>
&lt;!--app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> })); --&gt;   <span class="hljs-comment">// bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded</span>
router.post(<span class="hljs-string">'/userinfo-company'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = req.body.module;
    <span class="hljs-keyword">var</span> userid = req.body.userId;
    request(
        { 
            <span class="hljs-attr">url</span>: nodeApi + <span class="hljs-string">'/menu/getInfo'</span>,
            <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">form</span>: {
                <span class="hljs-attr">module</span>: <span class="hljs-built_in">module</span>,
                <span class="hljs-attr">userId</span>: userid
            }
        },
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error,response,body</span>) </span>{
            <span class="hljs-keyword">if</span>( response.statusCode == <span class="hljs-number">200</span> ) {
                <span class="hljs-keyword">var</span> tempArr = <span class="hljs-built_in">JSON</span>.parse(body);
            }
        }
    );
})</code></pre>
<p>安全性问题后台无法读取到cookie，后面将请求菜单的方法放在了js中，然后在将菜单传到路由中，通过res.render进行动态渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.post('/menu', function(req, res, next) {
    menuArr = JSON.parse(req.body.menuArr);
    res.send('OK');
    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.post(<span class="hljs-string">'/menu'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    menuArr = <span class="hljs-built_in">JSON</span>.parse(req.body.menuArr);
    res.send(<span class="hljs-string">'OK'</span>);
    
});</code></pre>
<p>后面发现可以传递cookie，但未在项目中使用</p>
<p>默认情况下，cookies是禁用的。在defaults或options将jar设为true，使后续的请求都使用cookie.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = request.defaults({jar: true})
request('http://www.google.com', function () {
    request('http://images.google.com')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> request = request.defaults({jar: <span class="hljs-literal">true</span>})
request(<span class="hljs-string">'http://www.google.com'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    request(<span class="hljs-string">'http://images.google.com'</span>)
})</code></pre>
<p>通过创建request.jar()的新实例，可以使用定制的cookie，而不是request全局的cookie jar。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var j = request.jar()
var request = request.defaults({jar:j})
request('http://www.google.com', function () {
    request('http://images.google.com')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> j = request.jar()
<span class="hljs-selector-tag">var</span> request = request.defaults({jar:j})
<span class="hljs-function"><span class="hljs-title">request</span><span class="hljs-params">(<span class="hljs-string">'http://www.google.com'</span>, function ()</span></span> {
    request(<span class="hljs-string">'http://images.google.com'</span>)
})</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var j = request.jar()
var cookie = request.cookie('your_cookie_here')
j.setCookie(cookie, uri, function (err, cookie){})
request({url: 'http://www.google.com', jar: j}, function () {
    request('http://images.google.com')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> j = request.jar()
<span class="hljs-keyword">var</span> cookie = request.cookie(<span class="hljs-string">'your_cookie_here'</span>)
j.setCookie(cookie, uri, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err, cookie)</span></span>{})
request({url: <span class="hljs-string">'http://www.google.com'</span>, jar: j}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    request(<span class="hljs-string">'http://images.google.com'</span>)
})</code></pre>
<p>注意，setCookie至少需要三个参数，最后一个是回调函数。</p>
<h2 id="articleHeader2">中间件</h2>
<p>Express 是一个自身功能极简，完全是由路由和中间件构成一个的web开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。中间件（Middleware）是一个函数，如果当前中间件没有终结请求-响应循环，则必须调用next()方法将控制权交给下一个中间件，否则请求就会挂起。</p>
<p>中间件分为：应用级中间件，路由级中间件，错误处理中间件，内置中间件，第三方中间件。</p>
<p>上面用的bodyParser是应用级的中间件，router是路由级的中间件，有关中间件更详细的内容参见express官网（<a href="http://www.expressjs.com.cn/guide/using-middleware.html" rel="nofollow noreferrer" target="_blank">express中间件</a>）</p>
<h2 id="articleHeader3">一些小的注意点</h2>
<p>模板引擎前面的缩进要么是空格或者是tab，如果两者混用会报错。</p>
<p>express更改路由中的内容的时候必须要重启本地服务器。只需要全局安装supervisor，然后命令行supervisor app.js就可以自动重启。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
express简单总结

## 原文链接
[https://segmentfault.com/a/1190000012875705](https://segmentfault.com/a/1190000012875705)

