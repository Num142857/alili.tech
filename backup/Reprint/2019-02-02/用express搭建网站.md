---
title: '用express搭建网站' 
date: 2019-02-02 2:30:11
hidden: true
slug: g056edo5uur
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">先建个简单的服务器</h3>
<ul><li><p>当然你先得安装express npm install express</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用express，如果这里的代码复制后运行不了请移步我的github下载源码,顺手star给我个小星星鼓励哈
//http://github.com/sally2015/express-project
// npm install  运行node main 后访问loaclhost:3000
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/',function(req, res){
    res.send('home');
    
});
app.use('/about',function(req, res){
    res.send('about');
    
});
app.use(function(req, res){


    res.send('404');
    
});

app.use(function(req, res, next){

    res.send('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http:localhost'+app.get('port'));
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//使用express，如果这里的代码复制后运行不了请移步我的github下载源码,顺手star给我个小星星鼓励哈</span>
<span class="hljs-comment">//http://github.com/sally2015/express-project</span>
<span class="hljs-comment">// npm install  运行node main 后访问loaclhost:3000</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> app = express();
app.set(<span class="hljs-string">'port'</span>, process.env.PORT || <span class="hljs-number">3000</span>);

app.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
    res.send(<span class="hljs-string">'home'</span>);
    
});
app.use(<span class="hljs-string">'/about'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
    res.send(<span class="hljs-string">'about'</span>);
    
});
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{


    res.send(<span class="hljs-string">'404'</span>);
    
});

app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{

    res.send(<span class="hljs-string">'500'</span>);
});

app.listen(app.get(<span class="hljs-string">'port'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Express started on http:localhost'</span>+app.get(<span class="hljs-string">'port'</span>));
});

</code></pre>
<ul>
<li><p>app.use(function(req,res,next){})默认匹配的路由是‘/’，多个use要使用next()方法，但是使用了，res.end()或者res.send()就不能使用next到达下一个use了</p></li>
<li><p>app.get()是添加路由的方法，忽略大小写，反斜杠，进行匹配时不考虑查询字符串</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//不使用express你可能要这么写
/*
* var http = require('http');
* var server =  http.createServer(function(req, res){
*    if(req.url === '/'){
        res.setHeader('Content-type','text-plain');
        res.write('……');&amp;&amp;res.end();
*   }
*}).listen(3000,'localhost');
*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//不使用express你可能要这么写</span>
<span class="hljs-comment">/*
* var http = require('http');
* var server =  http.createServer(function(req, res){
*    if(req.url === '/'){
        res.setHeader('Content-type','text-plain');
        res.write('……');&amp;&amp;res.end();
*   }
*}).listen(3000,'localhost');
*/</span>
</code></pre>
<ul>
<li><p>对定制的404页面和500页面的处理与对普通页面的处理有所区别，用的不是app.get,而是app.use。app.use是express添加中间件的一种方法</p></li>
<li><p>express中路由和中间件的添加顺序至关重要，如果把404处理器放在所有的路由上面，普通页面的路由就不能用了</p></li>
<li><p>express能根据回调函数中的参数区分404和500处理器</p></li>
</ul>
<h3 id="articleHeader1">使用handlebars</h3>
<ul><li><p>(defaultLayout:'main')意味着除非你特别指明否则所有的视图都是这个布局</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var handlebars = require('express3-handlebars') //现在已经重命名为express-handlebar了，由于牵一发可能要动全身，我这里就不改了
.create({ 
    defaultLayout: 'main', // 设置默认布局为
});

app.engine('handlebars', handlebars.engine); // 将express模板引擎配置成handlebars 
app.set('view engine', 'handlebars');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> handlebars = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express3-handlebars'</span>) <span class="hljs-comment">//现在已经重命名为express-handlebar了，由于牵一发可能要动全身，我这里就不改了</span>
.create({ 
    <span class="hljs-attr">defaultLayout</span>: <span class="hljs-string">'main'</span>, <span class="hljs-comment">// 设置默认布局为</span>
});

app.engine(<span class="hljs-string">'handlebars'</span>, handlebars.engine); <span class="hljs-comment">// 将express模板引擎配置成handlebars </span>
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'handlebars'</span>);
</code></pre>
<ul><li>
<p>创建一个views/layouts/main.handlebars文件</p>
<ul><li></li></ul>
</li></ul>
<p>&lt;html lang="en"&gt;<br>&lt;head&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta charset=&quot;UTF-8&quot;>
<title>Document</title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span></code></pre>
<p>&lt;/head&gt;<br>&lt;body&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"{body"}}"}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">"{{"{body"}}"}</code></pre>
<p>&lt;/body&gt;<br>&lt;html&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- "{{"{body"}}"}注意这里是三个大括号，这个表达式会被每个视图自己的html取代
- 分别创建首页、关于、404、500页面，后缀名都是handlebars
  - ```html
views/home.handlebars
=> <h1>welcome to home</h1>
views/about.handlebars
 =><h1>welcome to about</h1>
views/404.handlebars
 =><h1>not found - 404</h1>
views/500.handlebars
 =><h1>500 server error</h1>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> "{{"{body"}}"}注意这里是三个大括号，这个表达式会被每个视图自己的html取代
</span>-<span class="ruby"> 分别创建首页、关于、<span class="hljs-number">404</span>、<span class="hljs-number">500</span>页面，后缀名都是handlebars
</span>  -<span class="ruby"> <span class="hljs-string">``</span><span class="hljs-string">`html
</span></span>views/home.handlebars
=<span class="ruby"><span class="hljs-string">&gt; &lt;h1&gt;welcome to home&lt;/h1&gt;
</span></span>views/about.handlebars
 =<span class="ruby"><span class="hljs-string">&gt;&lt;h1&gt;welcome to about&lt;/h1&gt;
</span></span>views/404.handlebars
 =<span class="ruby"><span class="hljs-string">&gt;&lt;h1&gt;not found - 404&lt;/h1&gt;
</span></span>views/500.handlebars
 =<span class="ruby"><span class="hljs-string">&gt;&lt;h1&gt;500 server error&lt;/h1&gt;
</span></span></code></pre>
<h3 id="articleHeader2">视图和静态文件</h3>
<ul>
<li><p>express靠中间件处理静态文件和视图，中间件是一种模块化手段，使请求处理更加容易</p></li>
<li><p>static中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过特殊处理直接发送到客户端</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(express.static(__dirname+'/public'));
//现在所有文件都可以相对public直接进行访问，例如public下面有一个img文
//件夹，那么在handlebars中(不需要理会在handlebars的目录结构)直接访问
//路径/img/logo.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(express.static(__dirname+<span class="hljs-string">'/public'</span>));
<span class="hljs-comment">//现在所有文件都可以相对public直接进行访问，例如public下面有一个img文</span>
<span class="hljs-comment">//件夹，那么在handlebars中(不需要理会在handlebars的目录结构)直接访问</span>
<span class="hljs-comment">//路径/img/logo.png</span></code></pre>
<ul>
<li><p>视图和静态资源的区别是它不一定是静态的，html可以动态构建</p></li>
<li><p>在项目下建一个public的子目录，应该把static中间件加载所有路由之前</p></li>
</ul>
<h3 id="articleHeader3">向handlebars里传递参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = 'its a arguments';//虚拟一个参数
//修改此时的about路由
app.get('/about', function(req,res){
    
    res.render('about', {args:args});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> args = <span class="hljs-string">'its a arguments'</span>;<span class="hljs-comment">//虚拟一个参数</span>
<span class="hljs-comment">//修改此时的about路由</span>
app.get(<span class="hljs-string">'/about'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    
    res.render(<span class="hljs-string">'about'</span>, {<span class="hljs-attr">args</span>:args});
});</code></pre>
<ul><li><p>修改about文件</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124167" src="https://static.alili.tech/img/remote/1460000007124167" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>此时访问就会得到下面的结果</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124168" src="https://static.alili.tech/img/remote/1460000007124168" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上代码在<a href="https://github.com/sally2015/express-project" rel="nofollow noreferrer" target="_blank">https://github.com/sally2015/...</a> ch1<br>---------------------------------------------分割线----------------------------------------------</p>
<p><em>ch2讲讲怎么快速、可维护的开发</em></p>
<h3 id="articleHeader4">使用自定义模块</h3>
<ul><li><p>ch1为了传递参数在main.js里面定义了一个虚拟数据，为了将数据分离出来，在根目录下定义一个lib目录，放置一个数据模块m_data.js</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = 'its a arguments';//虚拟一个参数

exports.getData = function(){
    return args;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> args = <span class="hljs-string">'its a arguments'</span>;<span class="hljs-comment">//虚拟一个参数</span>

exports.getData = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> args;
}</code></pre>
<ul><li><p>main.js</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var m_data = require('./lib/m_data.js');
app.get('/about', function(req,res){
    
    res.render('about', {args:m_data.getData()});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> m_data = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/m_data.js'</span>);
app.get(<span class="hljs-string">'/about'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    
    res.render(<span class="hljs-string">'about'</span>, {<span class="hljs-attr">args</span>:m_data.getData()});
});</code></pre>
<h3 id="articleHeader5">使用nodemon自动重启服务器</h3>
<ul>
<li><p>每次修改main文件都要ctrl+c停止再运行很累，使用nodeman每次修改都会帮我们重启服务器</p></li>
<li><p>使用也非常简单，npm install nodemon -g，运行nodemon main</p></li>
</ul>
<h3 id="articleHeader6">页面测试</h3>
<ul>
<li><p>需要一个测试框架Mocha ---- npm install mocha --save-dev 这里dev的意思是只在开发时依赖</p></li>
<li>
<p>mocha是要运行在客户端的所以把mocha资源放在public目录下</p>
<ul>
<li><p>public/vendor</p></li>
<li><p>=&gt; node_modules/mocha/mocha.js</p></li>
<li><p>=&gt; node_modules/mocha/mocha.css</p></li>
</ul>
</li>
<li>
<p>测试通常需要一个assert函数</p>
<ul>
<li><p>npm install chai --save-dev</p></li>
<li><p>node_modules/chai/chai.js =&gt; public/vendor</p></li>
</ul>
</li>
<li>
<p>不让测试一直运行</p>
<ul>
<li><p>因为拖慢网站的速度，用户也不需要看到测试结果</p></li>
<li><p>期望的情况是在url后面加上?test=1才加载测试页面</p></li>
</ul>
</li>
<li><p>定义中间件来检测查询字符串中的test=1,放在所有路由之前</p></li>
<li><p>如果test=1出现在任何页面的字符串查询中，属性res.locals.showTests就会被设为true</p></li>
<li><p>res.locals对象是要传给视图上下文的一部分</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' 
          &amp;&amp; req.query.test === '1';
    next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{
    res.locals.showTests = app.get(<span class="hljs-string">'env'</span>) !== <span class="hljs-string">'production'</span> 
          &amp;&amp; req.query.test === <span class="hljs-string">'1'</span>;
    next();
});</code></pre>
<h3 id="articleHeader7">引入测试框架</h3>
<ul><li><p>修改main.handlebars（以后简写main），修改head</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <title>Meadowlark Travel</title>
    "{{"#if showTests"}}"
        <link rel=&quot;stylesheet&quot; href=&quot;/vendor/mocha.css&quot;>
    "{{"/if"}}"
    <script src='//code.jquery.com/jquery-2.0.2.min.js'></script>
</head>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Meadowlark Travel<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    "{{"#if showTests"}}"
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/vendor/mocha.css"</span>&gt;</span>
    "{{"/if"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'//code.jquery.com/jquery-2.0.2.min.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
</code></pre>
<ul>
<li><p>这里在head引入jquery是为了方便测试</p></li>
<li><p>在&lt;/body&gt;之前引入mocha和chai，还需引入一个qa/global-test.js脚本</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"#if showTests"}}"
        <div id=&quot;mocha&quot;></div>
        <script src='/vendor/mocha.js'></script>
        <script src='/vendor/chai.js'></script>
        <script>
            mocha.ui('tdd');
            var assert = chai.assert;
        </script>
        <script src='/qa/tests-global.js'></script>
        "{{"#if pageTestScript"}}"
            <script src='"{{"pageTestScript"}}"'></script>
        "{{"/if"}}"
          <script>mocha.run()</script>
    "{{"/if"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"#if showTests"}}"
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mocha"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'/vendor/mocha.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'/vendor/chai.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
            mocha.ui(<span class="hljs-string">'tdd'</span>);
            <span class="hljs-keyword">var</span> assert = chai.assert;
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'/qa/tests-global.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        "{{"#if pageTestScript"}}"
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'"{{"pageTestScript"}}"'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        "{{"/if"}}"
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">mocha.run()</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    "{{"/if"}}"</code></pre>
<ul><li><p>创建public/qa/tests-global.js全局测试脚本</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title &amp;&amp; document.title.match(/\S/) &amp;&amp; 
          document.title.toUpperCase() !== 'TODO');
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">suite(<span class="hljs-string">'Global Tests'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    test(<span class="hljs-string">'page has a valid title'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        assert(<span class="hljs-built_in">document</span>.title &amp;&amp; <span class="hljs-built_in">document</span>.title.match(<span class="hljs-regexp">/\S/</span>) &amp;&amp; 
          <span class="hljs-built_in">document</span>.title.toUpperCase() !== <span class="hljs-string">'TODO'</span>);
    });
});
</code></pre>
<ul><li><p>访问localhost：3000没有任何变化，但是访问localhost:3000?test=1,你会发现加载了测试的文件帮你做的这些东西</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124169" src="https://static.alili.tech/img/remote/1460000007124169" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<ul><li>
<p>针对about页面进行测试</p>
<ul><li><p>这里假设测试确保有总有一个指向联系我们页面的链接，创建一个public/qa/tests-about.js</p></li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="suite('&quot;About&quot; Page Tests', function(){
  test('page should contain link to contact page', function(){
      assert($('a[href=&quot;/contact&quot;]').length);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">suite(<span class="hljs-string">'"About" Page Tests'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  test(<span class="hljs-string">'page should contain link to contact page'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      assert($(<span class="hljs-string">'a[href="/contact"]'</span>).length);
  });
});</code></pre>
<ul>
<li>
<p>在main.js上改变路由/about的参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/about', function(req,res){
  
  res.render('about', {
      args:m_data.getData(),
      pageTestScript:'/qa/tests-about.js'
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.get(<span class="hljs-string">'/about'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
  
  res.render(<span class="hljs-string">'about'</span>, {
      <span class="hljs-attr">args</span>:m_data.getData(),
      <span class="hljs-attr">pageTestScript</span>:<span class="hljs-string">'/qa/tests-about.js'</span>
  });
});</code></pre>
</li>
<li><p>现在刷新页面about会有一个错误的断言</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124204" src="https://static.alili.tech/img/remote/1460000007124204" alt="-" title="-" style="cursor: pointer;"></span></p>
<ul>
<li><p>只要about模板中有一个链接，这个错误测试断言就会消失</p></li>
<li><p>例如<a href="/contact">contact us</a></p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124205" src="https://static.alili.tech/img/remote/1460000007124205" alt="测试通过" title="测试通过" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">使用局部组件</h3>
<ul><li>
<p>场景定义一个天气组件，在任何页面都可以调用，这样的需要重复调用的可以用局部文件实现</p>
<ul><li><p>新建一个views/partials/weather.handlebard</p></li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;weatherWeight&quot;>
    "{{"#each weather.locations"}}"
        <div class=&quot;location&quot;>
            <h3>"{{"name"}}"</h3>
            <a href=&quot;"{{"forecastUrl"}}"&quot;>
                "{{"weather"}}","{{"temp"}}"
            </a>
        </div>
    "{{"/each"}}"
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"weatherWeight"</span>&gt;
    "{{"#each weather.locations"}}"
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"location"</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>"{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
            &lt;a href=<span class="hljs-string">""{{"forecastUrl"}}""</span>&gt;
                "{{"weather"}}","{{"temp"}}"
            &lt;<span class="hljs-regexp">/a&gt;
        &lt;/</span>div&gt;
    "{{"/each"}}"
&lt;<span class="hljs-regexp">/div&gt;
</span></code></pre>
<ul><li><p>在weatherData.js中放入虚拟数据</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getWeatherData(){

    return {
        locations:[
            {
                name:'广州',
                forecastUrl:'https://github.com/sally2015',
                weather:'广州的温度情况',
                temp:'温度'
            },
            {
                name:'深圳',
                forecastUrl:'https://github.com/sally2015',
                weather:'深圳的温度情况',
                temp:'温度'
            },
            {
                name:'珠海',
                forecastUrl:'https://github.com/sally2015',
                weather:'珠海的温度情况',
                temp:'温度'
            }
        ]
    }
}
exports.getWeatherData = getWeatherData
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWeatherData</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">locations</span>:[
            {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'广州'</span>,
                <span class="hljs-attr">forecastUrl</span>:<span class="hljs-string">'https://github.com/sally2015'</span>,
                <span class="hljs-attr">weather</span>:<span class="hljs-string">'广州的温度情况'</span>,
                <span class="hljs-attr">temp</span>:<span class="hljs-string">'温度'</span>
            },
            {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'深圳'</span>,
                <span class="hljs-attr">forecastUrl</span>:<span class="hljs-string">'https://github.com/sally2015'</span>,
                <span class="hljs-attr">weather</span>:<span class="hljs-string">'深圳的温度情况'</span>,
                <span class="hljs-attr">temp</span>:<span class="hljs-string">'温度'</span>
            },
            {
                <span class="hljs-attr">name</span>:<span class="hljs-string">'珠海'</span>,
                <span class="hljs-attr">forecastUrl</span>:<span class="hljs-string">'https://github.com/sally2015'</span>,
                <span class="hljs-attr">weather</span>:<span class="hljs-string">'珠海的温度情况'</span>,
                <span class="hljs-attr">temp</span>:<span class="hljs-string">'温度'</span>
            }
        ]
    }
}
exports.getWeatherData = getWeatherData
</code></pre>
<ul><li><p>创建一个中间件给res.locals.weather添加数据</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//给res.locals.weather添加数据
app.use(function(req, res, next){
    if(!res.locals.weather){
        res.locals.weather = {};

    }
    res.locals.weather = m_weatherData.getWeatherData();
    next();
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">//给res.locals.weather添加数据</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{
    <span class="hljs-keyword">if</span>(!res.locals.weather){
        res.locals.weather = {};

    }
    res.locals.weather = m_weatherData.getWeatherData();
    next();
});

</code></pre>
<ul><li><p>将组件放在主页home上</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>welcome to home</h1>
"{{">weather"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>welcome to home<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
"{{"&gt;weather"}}"
</code></pre>
<ul>
<li><p>语法{&gt; partialname}可以让你在视图中包含一个局部文件，express-handlebars会在views/partials寻找</p></li>
<li><p>你可以将这个语法放在任何你需要的页面上</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124206" src="https://static.alili.tech/img/remote/1460000007124206" alt="现在的home效果" title="现在的home效果" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">客户端使用模板和动态获取数据</h3>
<ul>
<li><p>客户端使用handlebars需要加载handlebars文件，你可以从node_moudles里面找，像正常文件一样引入即可</p></li>
<li><p>定义一个view/partials/ajaxtest.handlebars文件</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id='ajaxtest' type='text/x-handlebars-template'>
    Marry hadd a little <b>\"{{"animal"}}"</b>
    its<b>\"{{"bodyPart"}}"</b>
    was <b>\"{{"adjective"}}"</b>as <b>\"{{"noun"}}"</b>
</script>
<button id='btn'>动态获取数据<tton>
<div id=&quot;content&quot;>
    
</div>
<script>
    $(document).ready(function(){
        var template = Handlebars.compile($('#ajaxtest').html());
        
        $('#btn').click(function(){
            $.ajax('/data/ajaxtest',{
                success:function(data){
                    $('#content').html(template(data));
                }
            });
        });
    });
    
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'ajaxtest'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/x-handlebars-template'</span>&gt;</span><span class="handlebars"><span class="xml">
    Marry hadd a little <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>\</span><span class="hljs-template-variable">"{{"animal"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
    its<span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>\</span><span class="hljs-template-variable">"{{"bodyPart"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
    was <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>\</span><span class="hljs-template-variable">"{{"adjective"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>as <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>\</span><span class="hljs-template-variable">"{{"noun"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'btn'</span>&gt;</span>动态获取数据<span class="hljs-tag">&lt;<span class="hljs-name">tton</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> template = Handlebars.compile($(<span class="hljs-string">'#ajaxtest'</span>).html());
        
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $.ajax(<span class="hljs-string">'/data/ajaxtest'</span>,{
                <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                    $(<span class="hljs-string">'#content'</span>).html(template(data));
                }
            });
        });
    });
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<ul><li><p>在main.js中设定接口</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/data/ajaxtest', function(req, res) {
    res.json({
            animal:'dog',
            bodyPart:'tail',
            adjective : 'sharp',
            noun : 'run'
        });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.get(<span class="hljs-string">'/data/ajaxtest'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.json({
            <span class="hljs-attr">animal</span>:<span class="hljs-string">'dog'</span>,
            <span class="hljs-attr">bodyPart</span>:<span class="hljs-string">'tail'</span>,
            <span class="hljs-attr">adjective</span> : <span class="hljs-string">'sharp'</span>,
            <span class="hljs-attr">noun</span> : <span class="hljs-string">'run'</span>
        });
});
</code></pre>
<ul>
<li><p>在你想要的视图里面加入"{{"&gt;ajaxtest"}}"</p></li>
<li><p>这时候当你点击按钮就会请求到数据，注意接口使用的方法是json</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007124207" src="https://static.alili.tech/img/remote/1460000007124207" alt="返回数据" title="返回数据" style="cursor: pointer;"></span><br>--------------------分割线------------------------------------ch2 <a href="https://github.com/sally2015/express-project" rel="nofollow noreferrer" target="_blank">https://github.com/sally2015/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用express搭建网站

## 原文链接
[https://segmentfault.com/a/1190000007124164](https://segmentfault.com/a/1190000007124164)

