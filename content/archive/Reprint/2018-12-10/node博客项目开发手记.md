---
title: 'node博客项目开发手记' 
date: 2018-12-10 2:30:07
hidden: true
slug: 9875xa4ht3i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">NodeJs开发个人博客项目</h1>
<p>预览地址：<a href="http://baijiawei.top" rel="nofollow noreferrer" target="_blank">http://baijiawei.top</a></p>
<p>GitHub地址：<a href="https://github.com/bjw1234/blog" rel="nofollow noreferrer" target="_blank">https://github.com/bjw1234/blog</a></p>
<h2 id="articleHeader1">需要安装的模块</h2>
<ul>
<li>body-parser 解析post请求</li>
<li>cookies 读写cookie</li>
<li>express 搭建服务器</li>
<li>markdown Markdown语法解析生成器</li>
<li>mongoose 操作Mongodb数据库</li>
<li>swig 模板解析引擎</li>
</ul>
<h2 id="articleHeader2">目录结构</h2>
<ul>
<li>db 数据库存储目录</li>
<li>models 数据库模型文件目录</li>
<li>public 公共文件目录（css,js,img）</li>
<li>routers 路由文件目录</li>
<li>schemas 数据库结构文件</li>
<li>views 模板视图文件目录</li>
<li>app.js 启动文件</li>
<li>package.json</li>
</ul>
<h2 id="articleHeader3">app.js 文件</h2>
<p><strong> 1.创建应用、监听端口 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = express();

app.get('/',(req,res,next) => {
    res.send(&quot;Hello World !&quot;);
});
app.listen(3000,(req,res,next) => {
    console.log(&quot;app is running at port 3000&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> app = express();

app.get(<span class="hljs-string">'/'</span>,(req,res,next) =&gt; {
    res.send(<span class="hljs-string">"Hello World !"</span>);
});
app.listen(<span class="hljs-number">3000</span>,(req,res,next) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"app is running at port 3000"</span>);
});</code></pre>
<p><strong> 2.配置应用模板 </strong></p>
<ul>
<li>定义使用的模板引擎 <strong> app.engine('html',swig.renderFile) </strong> 参数1：模板引擎的名称，同时也是模板文件的后缀  参数2：表示用于解析处理模板内容的方法</li>
<li>设置模板文件存放的目录 <strong> app.set('views','./views') </strong>
</li>
<li>注册所使用的模板引擎 <strong> app.set('view engine','html') </strong>
</li>
</ul>
<p><strong> 3.用模板引擎去解析文件 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 读取views目录下的指定文件，解析并返回给客户端 
 * 参数1：模板文件
 * 参数2：给模板传递的参数 
 */
 
res.render('index',{
    title:'首页 ',
    content: 'hello swig'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 读取views目录下的指定文件，解析并返回给客户端 
 * 参数1：模板文件
 * 参数2：给模板传递的参数 
 */</span>
 
res.render(<span class="hljs-string">'index'</span>,{
    <span class="hljs-attr">title</span>:<span class="hljs-string">'首页 '</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'hello swig'</span>
});</code></pre>
<p><strong> 4.开发过程中需要取消模板缓存的限制 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="swig.setDefaults({
  cache: false
});

app.set('view cache', false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">swig.setDefaults({
  <span class="hljs-attr">cache</span>: <span class="hljs-literal">false</span>
});

app.set(<span class="hljs-string">'view cache'</span>, <span class="hljs-literal">false</span>);</code></pre>
<p><strong> 5.设置静态文件托管 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 当用户访问的是/public路径下的文件，那么直接返回
app.use('/public',express.static(__dirname + '/public'));

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code> <span class="hljs-comment">// 当用户访问的是/public路径下的文件，那么直接返回</span>
app.<span class="hljs-keyword">use</span>('/<span class="hljs-keyword">public</span>',express.<span class="hljs-keyword">static</span>(__dirname + '/<span class="hljs-keyword">public</span>'));

</code></pre>
<h2 id="articleHeader4">划分模块</h2>
<ul>
<li>前台模块</li>
<li>后台模块</li>
<li>API模块</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 根据不同的功能划分模块
app.use('/',require('./routers/main'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 根据不同的功能划分模块</span>
app.use(<span class="hljs-string">'/'</span>,<span class="hljs-built_in">require</span>(<span class="hljs-string">'./routers/main'</span>));
app.use(<span class="hljs-string">'/admin'</span>,<span class="hljs-built_in">require</span>(<span class="hljs-string">'./routers/admin'</span>));
app.use(<span class="hljs-string">'/api'</span>,<span class="hljs-built_in">require</span>(<span class="hljs-string">'./routers/api'</span>));</code></pre>
<p>对于管理员模块 <strong> admin.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var router = express.Router();

// 比如访问 /admin/user
router.get('/user',function(req,res,next) {
    res.send('User');
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-comment">// 比如访问 /admin/user</span>
router.get(<span class="hljs-string">'/user'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>) </span>{
    res.send(<span class="hljs-string">'User'</span>);
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<h2 id="articleHeader5">前台路由 + 模板</h2>
<ul>
<li>
<strong> main 模块 </strong><br> / 首页<br>/view 内容页</li>
<li>
<strong> api模块 </strong><br> / 首页<br> /register 用户注册<br>/login 用户登录<br> /comment 评论获取<br>/comment/post 评论提交</li>
</ul>
<h2 id="articleHeader6">后台(admin)路由+模板</h2>
<ul>
<li>
<strong> 首页 </strong><br> / 后台首页</li>
<li>
<strong> 用户管理 </strong><br> /user 用户列表</li>
<li>
<strong> 分类管理 </strong><br>  /category 分类列表<br> /category/add 分类添加<br> /category/edit 分类修改<br> /caterory/delete 分类删除</li>
<li>
<strong> 文章内容管理 </strong><br> /article nei内容列表<br> /article/add 内容添加<br> /article/edit 内容修改<br> /article/delete 内容删除</li>
<li>
<strong> 评论内容管理 </strong><br> /comment 评论列表<br> /comment/delete 评论删除</li>
</ul>
<h2 id="articleHeader7">功能开发顺序</h2>
<p><strong> 功能模块开发顺序 </strong></p>
<ul>
<li>用户</li>
<li>栏目</li>
<li>内容</li>
<li>评论</li>
</ul>
<p><strong>编码顺序 </strong></p>
<ul>
<li>通过Schema定义设计数据存储结构</li>
<li>功能逻辑</li>
<li>页面展示</li>
</ul>
<h2 id="articleHeader8">连接数据库(mongoDB)</h2>
<p><strong> 启动MongoDB服务端: </strong><br><strong> mongod --dbpath=G:\data\db --port=27017 </strong><br>启动服务设置数据库的存储地址以及端口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mongoose = require('mongoose');
// 数据库链接
mongoose.connect(&quot;mongodb://localhost:27017/blog&quot;,(err) => {
    if(err){
        console.log(&quot;数据库连接失败&quot;);
    }else{
        console.log(&quot;数据库连接成功&quot;);
      // 启动服务器，监听端口  
      app.listen(3000,(req,res,next) => {
            console.log(&quot;app is running at port 3000&quot;);
        });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-comment">// 数据库链接</span>
mongoose.connect(<span class="hljs-string">"mongodb://localhost:27017/blog"</span>,(err) =&gt; {
    <span class="hljs-keyword">if</span>(err){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"数据库连接失败"</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"数据库连接成功"</span>);
      <span class="hljs-comment">// 启动服务器，监听端口  </span>
      app.listen(<span class="hljs-number">3000</span>,(req,res,next) =&gt; {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"app is running at port 3000"</span>);
        });
    }
});</code></pre>
<h2 id="articleHeader9">定义数据表结构和模型</h2>
<p>对于用户数据表（users.js）在schema文件夹下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    // 用户名
   username:String,
   // 密码
   password:String
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> mongoose.Schema({
    <span class="hljs-comment">// 用户名</span>
   username:<span class="hljs-built_in">String</span>,
   <span class="hljs-comment">// 密码</span>
   password:<span class="hljs-built_in">String</span>
});</code></pre>
<p>在models目录下创建user.js模型类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

module.exports = mongoose.model('User',userSchema);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">var</span> userSchema = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../schemas/users'</span>);

<span class="hljs-built_in">module</span>.exports = mongoose.model(<span class="hljs-string">'User'</span>,userSchema);</code></pre>
<h2 id="articleHeader10">处理用户注册</h2>
<ul><li><strong> 前端通过ajax提交用户名和密码 </strong></li></ul>
<p>url: /api/register</p>
<ul><li><strong> 后端对前端提交(POST)的数据解析 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bodyParser = require('body-parser');
// bodyParser 配置
// 通过使用这一方法，可以为req对象添加一个body属性
app.use( bodyParser.urlencoded({extended:true}));

// 在api模块中：
// 1.可以定义一个中间件，来统一返回格式
var responseData;
router.use( function(req,res,next){ // path默认为'/',当访问该目录时这个中间件被调用
    responseData = {
         code:0,
       message:''
    };
    next();
});

router.post('/register',(req,res,next) => {
    console.log(req.body);
   // 去判断用户名、密码是否合法
   // 判断是否用户名已经被注册
   // 通过 res.json(responseData) 给客户端返回json数据
   
   // 查询数据库
   User.findOne({    // 返回一个promise对象
           username: username
   }).then(function( userInfo ) {
           if( userInfo ){ // 数据库中有该条记录
            ...
          res.json(responseData);
          return;
       }
       // 给数据库中添加该条信息
       var user = new User({ username:username,password:password });
       return user.save(); // 返回promise对象
   }).then(function( newUserInfo ){
            console.log(newUserInfo);
       res.json(responseData);  // 数据保存成功  
   });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-comment">// bodyParser 配置</span>
<span class="hljs-comment">// 通过使用这一方法，可以为req对象添加一个body属性</span>
app.use( bodyParser.urlencoded({<span class="hljs-attr">extended</span>:<span class="hljs-literal">true</span>}));

<span class="hljs-comment">// 在api模块中：</span>
<span class="hljs-comment">// 1.可以定义一个中间件，来统一返回格式</span>
<span class="hljs-keyword">var</span> responseData;
router.use( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>)</span>{ <span class="hljs-comment">// path默认为'/',当访问该目录时这个中间件被调用</span>
    responseData = {
         <span class="hljs-attr">code</span>:<span class="hljs-number">0</span>,
       <span class="hljs-attr">message</span>:<span class="hljs-string">''</span>
    };
    next();
});

router.post(<span class="hljs-string">'/register'</span>,(req,res,next) =&gt; {
    <span class="hljs-built_in">console</span>.log(req.body);
   <span class="hljs-comment">// 去判断用户名、密码是否合法</span>
   <span class="hljs-comment">// 判断是否用户名已经被注册</span>
   <span class="hljs-comment">// 通过 res.json(responseData) 给客户端返回json数据</span>
   
   <span class="hljs-comment">// 查询数据库</span>
   User.findOne({    <span class="hljs-comment">// 返回一个promise对象</span>
           username: username
   }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> userInfo </span>) </span>{
           <span class="hljs-keyword">if</span>( userInfo ){ <span class="hljs-comment">// 数据库中有该条记录</span>
            ...
          res.json(responseData);
          <span class="hljs-keyword">return</span>;
       }
       <span class="hljs-comment">// 给数据库中添加该条信息</span>
       <span class="hljs-keyword">var</span> user = <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">username</span>:username,<span class="hljs-attr">password</span>:password });
       <span class="hljs-keyword">return</span> user.save(); <span class="hljs-comment">// 返回promise对象</span>
   }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> newUserInfo </span>)</span>{
            <span class="hljs-built_in">console</span>.log(newUserInfo);
       res.json(responseData);  <span class="hljs-comment">// 数据保存成功  </span>
   });
});</code></pre>
<h2 id="articleHeader11">cookies 模块的使用</h2>
<ul><li>全局（app.js）注册使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置cookie
// 只要客户端发送请求就会通过这个中间件
app.use((req, res, next) => {
    req.cookies = new cookies(req, res);

    /**
     * 解析用户的cookies信息
     * 查询数据库判断是否为管理员 isAdmin
     * 注意：查询数据库是异步操作，next应该放在回调里边
     */
    req.userInfo = {};
    if (req.cookies.get(&quot;userInfo&quot;)) {
        try {
            req.userInfo = JSON.parse(req.cookies.get(&quot;userInfo&quot;));
            // 查询数据库判断是否为管理员
            User.findById(req.userInfo._id).then(function (result) {
                req.userInfo.isAdmin = Boolean(result.isAdmin);
                next();
            });
        } catch (e) {
            next();
        }
    } else {
        next();
    }
});

// 当用户登录或注册成功之后，可以为其设置cookies
req.cookies.set(&quot;userInfo&quot;,JSON.stringify({
     _id:result._id,
    username:result.username 
}));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 设置cookie</span>
<span class="hljs-comment">// 只要客户端发送请求就会通过这个中间件</span>
app.use(<span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
    req.cookies = <span class="hljs-keyword">new</span> cookies(req, res);

    <span class="hljs-comment">/**
     * 解析用户的cookies信息
     * 查询数据库判断是否为管理员 isAdmin
     * 注意：查询数据库是异步操作，next应该放在回调里边
     */</span>
    req.userInfo = {};
    <span class="hljs-keyword">if</span> (req.cookies.get(<span class="hljs-string">"userInfo"</span>)) {
        <span class="hljs-keyword">try</span> {
            req.userInfo = <span class="hljs-built_in">JSON</span>.parse(req.cookies.get(<span class="hljs-string">"userInfo"</span>));
            <span class="hljs-comment">// 查询数据库判断是否为管理员</span>
            User.findById(req.userInfo._id).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
                req.userInfo.isAdmin = <span class="hljs-built_in">Boolean</span>(result.isAdmin);
                next();
            });
        } <span class="hljs-keyword">catch</span> (e) {
            next();
        }
    } <span class="hljs-keyword">else</span> {
        next();
    }
});

<span class="hljs-comment">// 当用户登录或注册成功之后，可以为其设置cookies</span>
req.cookies.set(<span class="hljs-string">"userInfo"</span>,<span class="hljs-built_in">JSON</span>.stringify({
     <span class="hljs-attr">_id</span>:result._id,
    <span class="hljs-attr">username</span>:result.username 
}));
</code></pre>
<h2 id="articleHeader12">swig模板引擎</h2>
<p>1.变量<br><strong> "{{" name "}}" </strong></p>
<p>2.属性<br><strong> "{{" student.name "}}" </strong></p>
<p>3.if判断<br><strong> { % if name === '郭靖' % } </strong><br><strong>  hello 靖哥哥 </strong><br><strong> { % endif % } </strong></p>
<p>4.for循环<br>// arr = [1, 2, 3]<br><strong> { % for key, val in arr % } </strong><br><strong>  &lt;p&gt;{ { key } } -- { { val } }&lt;/p&gt; </strong><br><strong> { % endfor % } </strong></p>
<p>5.set命令<br>用来设置一个变量，在当前上下文中复用</p>
<p><strong> {% set foo = [0, 1, 2, 3, 4, 5] %} </strong></p>
<ul>
<li>
<strong> {% extends 'layout.html' %} </strong>  // 继承某一个HTML模板</li>
<li>
<strong> {% include 'page.html' %} </strong>  // 包含一个模板到当前位置</li>
<li>
<strong> {% block main %}  xxx  {% endblock %} </strong> //重写某一区块</li>
</ul>
<p>6.autoescape 自动编码<br>当想在某个div中显示后端生成的HTML代码，模板渲染时会自动编码，<br>以字符串的形式显示。通过以下方式，可以避免这个情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;article-content&quot; class=&quot;content&quot;>
    {% autoescape false %}
    "{{" data.article_content_html "}}"
    {% endautoescape %}
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"article-content"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    {% autoescape false %}
    "{{" data.article_content_html "}}"
    {% endautoescape %}
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader13">用户管理和分页</h2>
<ul><li><strong> CRUD用户数据 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = require('../models/user');

// 查询所有的用户数据
User.find().then(function(users){

});

// 根据某一字段查询数据
User.findOne({
    username:username
}).then(function(result){

});

// 根据用户ID查询数据
User.findById(id).then(function(user){

});

// 根据ID删除数据
User.remove({
    _id: id
}).then(function(){

});

// 修改数据
User.update({
    _id: id
},{
    username: name
}).then(function(){
    
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> User = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../models/user'</span>);

<span class="hljs-comment">// 查询所有的用户数据</span>
User.find().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">users</span>)</span>{

});

<span class="hljs-comment">// 根据某一字段查询数据</span>
User.findOne({
    <span class="hljs-attr">username</span>:username
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{

});

<span class="hljs-comment">// 根据用户ID查询数据</span>
User.findById(id).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">user</span>)</span>{

});

<span class="hljs-comment">// 根据ID删除数据</span>
User.remove({
    <span class="hljs-attr">_id</span>: id
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

});

<span class="hljs-comment">// 修改数据</span>
User.update({
    <span class="hljs-attr">_id</span>: id
},{
    <span class="hljs-attr">username</span>: name
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    
});

</code></pre>
<ul><li><strong> 数据分页管理 </strong></li></ul>
<p>两个重要方法<br>limit(Number): 限制获取的数据条数<br>skip(Number): 忽略数据的条数 前number条</p>
<p>忽略条数：（当前页 - 1） * 每页显示的条数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 接收传过来的page
let query_page = Number(req.query.page) || 1;
query_page = Math.max(query_page, 1);  // 限制最小为1
query_page = Math.min(Math.ceil(count / limit), query_page); // 限制最大值 count/limit向上取整


var cur_page = query_page;  // 当前页
var limit = 10; // 每页显示的条数
var skip = (cur_page - 1) * limit; //忽略的条数

User.find().limit(limit).skip(skip).then(function(users){
    ...
  // 将当前页 page 传给页面
  // 将最大页码 maxPage 传给页面
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// 接收传过来的page</span>
<span class="hljs-keyword">let</span> query_page = <span class="hljs-built_in">Number</span>(req.query.page) || <span class="hljs-number">1</span>;
query_page = <span class="hljs-built_in">Math</span>.max(query_page, <span class="hljs-number">1</span>);  <span class="hljs-comment">// 限制最小为1</span>
query_page = <span class="hljs-built_in">Math</span>.min(<span class="hljs-built_in">Math</span>.ceil(count / limit), query_page); <span class="hljs-comment">// 限制最大值 count/limit向上取整</span>


<span class="hljs-keyword">var</span> cur_page = query_page;  <span class="hljs-comment">// 当前页</span>
<span class="hljs-keyword">var</span> limit = <span class="hljs-number">10</span>; <span class="hljs-comment">// 每页显示的条数</span>
<span class="hljs-keyword">var</span> skip = (cur_page - <span class="hljs-number">1</span>) * limit; <span class="hljs-comment">//忽略的条数</span>

User.find().limit(limit).skip(skip).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">users</span>)</span>{
    ...
  <span class="hljs-comment">// 将当前页 page 传给页面</span>
  <span class="hljs-comment">// 将最大页码 maxPage 传给页面</span>
});
</code></pre>
<h2 id="articleHeader14">文章的表结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对于content.js
var mongoose = require('mongoose');
var contentSch = require('../schemas/contentSch');

module.exports = mongoose.model('Content',contentSch);


// contentSch.js
module.exports = new mongoose.Schema({
    
   // 关联字段 - 分类的id
   category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'Category'  
    },
    
    // 内容标题
    title: String,
    
    // 简介
    description:{
        type: String,
        default: ''  
    },
    
    // 内容
    content:{
        type:String,
        default:''
    }
});

// 文章查询时关联category字段
Content.find().populate('category').then(contents => {
    // 那么通过这样的方式，我们就可以找到Content表中的
   // 关联信息     content.category.category_name 
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 对于content.js</span>
<span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">var</span> contentSch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../schemas/contentSch'</span>);

<span class="hljs-built_in">module</span>.exports = mongoose.model(<span class="hljs-string">'Content'</span>,contentSch);


<span class="hljs-comment">// contentSch.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> mongoose.Schema({
    
   <span class="hljs-comment">// 关联字段 - 分类的id</span>
   category:{
        <span class="hljs-comment">// 类型</span>
        type:mongoose.Schema.Types.ObjectId,
        <span class="hljs-comment">// 引用</span>
        ref:<span class="hljs-string">'Category'</span>  
    },
    
    <span class="hljs-comment">// 内容标题</span>
    title: <span class="hljs-built_in">String</span>,
    
    <span class="hljs-comment">// 简介</span>
    description:{
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>  
    },
    
    <span class="hljs-comment">// 内容</span>
    content:{
        <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
        <span class="hljs-attr">default</span>:<span class="hljs-string">''</span>
    }
});

<span class="hljs-comment">// 文章查询时关联category字段</span>
Content.find().populate(<span class="hljs-string">'category'</span>).then(<span class="hljs-function"><span class="hljs-params">contents</span> =&gt;</span> {
    <span class="hljs-comment">// 那么通过这样的方式，我们就可以找到Content表中的</span>
   <span class="hljs-comment">// 关联信息     content.category.category_name </span>
});
</code></pre>
<h2 id="articleHeader15">MarkDown语法高亮</h2>
<ul><li>在HTML中直接使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css&quot;>
<script src=&quot;http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js&quot;></script>

<script src=&quot;https://cdn.bootcss.com/marked/0.3.17/marked.min.js&quot;></script>

// marked相关配置
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

// MarkDown语法解析内容预览
$('#bjw-content').on('keyup blur', function () {
    $('#bjw-previous').html(marked($('#bjw-content').val()));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;link rel=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;script src=<span class="hljs-string">"https://cdn.bootcss.com/marked/0.3.17/marked.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

<span class="hljs-comment">// marked相关配置</span>
marked.setOptions({
    <span class="hljs-attr">renderer</span>: <span class="hljs-keyword">new</span> marked.Renderer(),
    <span class="hljs-attr">gfm</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">tables</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">breaks</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">pedantic</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">sanitize</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">smartLists</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">smartypants</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">code</span>) </span>{
        <span class="hljs-keyword">return</span> hljs.highlightAuto(code).value;
    }
});

<span class="hljs-comment">// MarkDown语法解析内容预览</span>
$(<span class="hljs-string">'#bjw-content'</span>).on(<span class="hljs-string">'keyup blur'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#bjw-previous'</span>).html(marked($(<span class="hljs-string">'#bjw-content'</span>).val()));
});</code></pre>
<ul><li>node环境中使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在模板页面引入默认样式
<!--语法高亮-->
<link rel=&quot;stylesheet&quot; href=&quot;http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css&quot;>

const marked = require('marked');
const hljs = require('highlight.js');

// marked相关配置
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

// 对内容进行markdown语法转换
data.article_content_html = marked(article.content);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在模板页面引入默认样式</span>
&lt;!--语法高亮--&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"</span>&gt;</span>

const marked = require('marked');
const hljs = require('highlight.js');

// marked相关配置
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

// 对内容进行markdown语法转换
data.article_content_html = marked(article.content);
</span></code></pre>
<h2 id="articleHeader16">使文本域支持Tab缩进</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#bjw-content').on('keydown',function(e){
    if(e.keyCode === 9){ // Tab键
         var position = this.selectionStart + 2; // Tab === 俩空格
       this.value = this.value.substr(0,this.selectionStart) + &quot;  &quot; + this.value.substr(this.selectionStart);
       this.selectionStart = position;
       this.selectionEnd = position;
       this.focus();
       e.preventDefault();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#bjw-content'</span>).on(<span class="hljs-string">'keydown'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">if</span>(e.keyCode === <span class="hljs-number">9</span>){ <span class="hljs-comment">// Tab键</span>
         <span class="hljs-keyword">var</span> position = <span class="hljs-keyword">this</span>.selectionStart + <span class="hljs-number">2</span>; <span class="hljs-comment">// Tab === 俩空格</span>
       <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.value.substr(<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.selectionStart) + <span class="hljs-string">"  "</span> + <span class="hljs-keyword">this</span>.value.substr(<span class="hljs-keyword">this</span>.selectionStart);
       <span class="hljs-keyword">this</span>.selectionStart = position;
       <span class="hljs-keyword">this</span>.selectionEnd = position;
       <span class="hljs-keyword">this</span>.focus();
       e.preventDefault();
    }
});</code></pre>
<h2 id="articleHeader17">layer 弹框</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 显示弹框
function showDialog(text, icon, callback) {
    layer.open({
        time: 1500,
        anim: 4,
        offset: 't',
        icon: icon,
        content: text,
        btn: false,
        title: false,
        closeBtn: 0,
        end: function () {
            callback &amp;&amp; callback();
        }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 显示弹框</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showDialog</span>(<span class="hljs-params">text, icon, callback</span>) </span>{
    layer.open({
        <span class="hljs-attr">time</span>: <span class="hljs-number">1500</span>,
        <span class="hljs-attr">anim</span>: <span class="hljs-number">4</span>,
        <span class="hljs-attr">offset</span>: <span class="hljs-string">'t'</span>,
        <span class="hljs-attr">icon</span>: icon,
        <span class="hljs-attr">content</span>: text,
        <span class="hljs-attr">btn</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">closeBtn</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">end</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            callback &amp;&amp; callback();
        }
    });
});</code></pre>
<h2 id="articleHeader18">随机用户头像生成</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 引入对应的库
const crypto = require('crypto');
const identicon = require('identicon.js');

// 当用户注册时，根据用户的用户名生成随机头像
let hash = crypto.createHash('md5');
hash.update(username);
let imgData = new identicon(hash.digest('hex').toString());
let imgUrl = 'data:/image/png;base64,'+imgData;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// 引入对应的库</span>
<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>);
<span class="hljs-keyword">const</span> identicon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'identicon.js'</span>);

<span class="hljs-comment">// 当用户注册时，根据用户的用户名生成随机头像</span>
<span class="hljs-keyword">let</span> hash = crypto.createHash(<span class="hljs-string">'md5'</span>);
hash.update(username);
<span class="hljs-keyword">let</span> imgData = <span class="hljs-keyword">new</span> identicon(hash.digest(<span class="hljs-string">'hex'</span>).toString());
<span class="hljs-keyword">let</span> imgUrl = <span class="hljs-string">'data:/image/png;base64,'</span>+imgData;
</code></pre>
<h2 id="articleHeader19">form表单提交的小问题</h2>
<p>当使用form表单提交一些代码的时候，会出现浏览器拦截的现象，原因是：浏览器误以为客户进行xss攻击。所以呢解决这个问题也很简单，就是对提交的内容进行base64或者其他形式的编码，在服务器端进行解码，即可解决。</p>
<p>项目地址：<a href="https://github.com/bjw1234/blog" rel="nofollow noreferrer" target="_blank">https://github.com/bjw1234/blog</a></p>
<p><code>完结 撒花 ^_^ ~</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node博客项目开发手记

## 原文链接
[https://segmentfault.com/a/1190000013738908](https://segmentfault.com/a/1190000013738908)

