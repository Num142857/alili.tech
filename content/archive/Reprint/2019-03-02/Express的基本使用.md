---
title: 'Express的基本使用' 
date: 2019-03-02 2:30:07
hidden: true
slug: 0dlsi4qmvsvf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<ul><li>列表项目Express是一个简介而灵活的node.js Web应用框架提供的一系列强大特性帮助你创建各种 Web 应用，和丰富的HTTP工具。</li></ul>
<h2 id="articleHeader1"><strong>正文</strong></h2>
<ul>
<li>
<p><strong>一个简单的express框架实例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 下载express       
    cnpm install express --save 
    // 引用          
    import express from 'express';
    const app = express();
    // 使用express监听端口号，
    app.listen(8080, function() {
        console.log('listen to 8080......'}
    )
    cnpm install nodemon --save // 代替 node 来启动应用
    // 在package.json的scripts中写入下面这句代码，用来启动应用
    ‘dev’: 'nodemon node build/app.js' /*标注： app.js是你入口文件的名称*/
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 下载express       </span>
    cnpm install express --save 
    <span class="hljs-comment">// 引用          </span>
    <span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>;
    <span class="hljs-keyword">const</span> app = express();
    <span class="hljs-comment">// 使用express监听端口号，</span>
    app.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listen to 8080......'</span>}
    )
    cnpm install nodemon --save <span class="hljs-comment">// 代替 node 来启动应用</span>
    <span class="hljs-comment">// 在package.json的scripts中写入下面这句代码，用来启动应用</span>
    ‘dev’: <span class="hljs-string">'nodemon node build/app.js'</span> <span class="hljs-comment">/*标注： app.js是你入口文件的名称*/</span>
    </code></pre>
<p>通过express常用的中间件‘body-parser’来实现解析JSON、Raw、文本、URL-encoded格式的请求体。‘bodyParser.urlencoded’返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。以上两行代码已经覆盖了大部分的使用场景。如果需要深入探究body-parser的朋友请参考<a href="https://github.com/expressjs/body-parser" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    cnpm install body-parser --save;
    import bodyParser from 'body-parser';
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>    cnpm <span class="hljs-keyword">install </span><span class="hljs-keyword">body-parser </span>--save<span class="hljs-comment">;</span>
    import <span class="hljs-keyword">bodyParser </span>from <span class="hljs-string">'body-parser'</span><span class="hljs-comment">;</span>
    app.use(<span class="hljs-keyword">bodyParser.json());
</span>    app.use(<span class="hljs-keyword">bodyParser.urlencoded({ </span><span class="hljs-keyword">extended: </span>false }))<span class="hljs-comment">;</span>
</code></pre>
</li>
<li>
<p><strong>处理不同的请求体</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    app.use('*', (request, respose, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // 指定允许其他域名访问  
        res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-Type,Accept,token,sysCode'); // 响应头设置  
        res.header('Access-Control-Allow-Methods', 'POST,GET'); // 响应类型  
        res.header('X-Powered-By', '3.2.1'); // 隐藏响应
        res.header('Content-Type', 'application/plain;charset=utf-8'); // 映射请求信息
        next();
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.use</span>(<span class="hljs-string">'*'</span>, (request, respose, next) =&gt; {
        <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.header</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>); <span class="hljs-comment">// 指定允许其他域名访问  </span>
        <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.header</span>(<span class="hljs-string">'Access-Control-Allow-Headers'</span>, <span class="hljs-string">'Origin,X-Requested-With,content-Type,Accept,token,sysCode'</span>); <span class="hljs-comment">// 响应头设置  </span>
        <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.header</span>(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'POST,GET'</span>); <span class="hljs-comment">// 响应类型  </span>
        <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.header</span>(<span class="hljs-string">'X-Powered-By'</span>, <span class="hljs-string">'3.2.1'</span>); <span class="hljs-comment">// 隐藏响应</span>
        <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.header</span>(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/plain;charset=utf-8'</span>); <span class="hljs-comment">// 映射请求信息</span>
        <span class="hljs-selector-tag">next</span>();
    })</code></pre>
</li>
<li>
<p><strong>express 路由</strong><br>   路由是指应用程序的端点如何响应客户端的请求，有关路由的详解请参阅<a href="http://www.expressjs.com.cn/en/starter/basic-routing.html" rel="nofollow noreferrer" target="_blank">基本路由</a>;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   const router = express.Router();
   router.get('/api/addcart', (req, res) => {  
       res.send('hello world')
   })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   const router = express.Router();
   router.get(<span class="hljs-string">'/api/addcart'</span>, <span class="hljs-function"><span class="hljs-params">(req, res)</span> =&gt;</span> {  
       res.send(<span class="hljs-string">'hello world'</span>)
   })</code></pre>
</li>
<li>
<p><strong>连接mysql</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下载mysql 
cnpm install mysql --save;
// 引入mysql
import mysql from 'mysql';
// 准备工作已经完成，下面这段代码是连接你的mysql库。
const connection = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'root',
       port: '****', // 你数据库设置的端口
       database: &quot;****&quot; // 你数据库的名称
   })
   connection.connect();

   // 然后将你写入的名称抛出，以便后续使用
   export default connection;
   // 使用sql语句的增删改查，来完成你所需要的所有效果！！！
   connection.query('select * from checkuser', function (req, result) {
       ck(result)
   })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 下载mysql </span>
cnpm install mysql --save;
<span class="hljs-comment">// 引入mysql</span>
<span class="hljs-keyword">import</span> mysql <span class="hljs-keyword">from</span> <span class="hljs-string">'mysql'</span>;
<span class="hljs-comment">// 准备工作已经完成，下面这段代码是连接你的mysql库。</span>
<span class="hljs-keyword">const</span> connection = mysql.createConnection({
       <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
       <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
       <span class="hljs-attr">password</span>: <span class="hljs-string">'root'</span>,
       <span class="hljs-attr">port</span>: <span class="hljs-string">'****'</span>, <span class="hljs-comment">// 你数据库设置的端口</span>
       database: <span class="hljs-string">"****"</span> <span class="hljs-comment">// 你数据库的名称</span>
   })
   connection.connect();

   <span class="hljs-comment">// 然后将你写入的名称抛出，以便后续使用</span>
   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connection;
   <span class="hljs-comment">// 使用sql语句的增删改查，来完成你所需要的所有效果！！！</span>
   connection.query(<span class="hljs-string">'select * from checkuser'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, result</span>) </span>{
       ck(result)
   })
</code></pre>
</li>
</ul>
<h2 id="articleHeader2"><strong>最后</strong></h2>
<p>本人第一次写文章，写的有所不周到的地方还请各位谅解，最后附上本人的<a href="https://github.com/lzloglee/server" rel="nofollow noreferrer" target="_blank">github地址</a>，上面有本文所涉及到的所有代码，以及一些简单的登录，图片上传，sql语句的增删改查。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express的基本使用

## 原文链接
[https://segmentfault.com/a/1190000016951276](https://segmentfault.com/a/1190000016951276)

