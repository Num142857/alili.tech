---
title: '初尝node.js + Express + MongoDB + Vue.js 项目构建(2)' 
date: 2019-01-15 2:30:12
hidden: true
slug: t29f7wohlc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>经过上一篇<a href="https://segmentfault.com/a/1190000009272078">经济基础构建</a>的完成，那么现在正式开始码代码吧！</p>
<h3 id="articleHeader1">项目架构</h3>
<p><span class="img-wrap"><img data-src="/img/bVNkQM?w=322&amp;h=581" src="https://static.alili.tech/img/bVNkQM?w=322&amp;h=581" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">起HTTP服务</h3>
<p>首先建立/server/app.js文件，先把起服务所需的模块引入进来，以下介绍两种起HTTP服务的方法。</p>
<p>1.使用Node.js 内在模块http</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
http.createServer(function (request, response) {
    // 发送响应数据 &quot;Hello Node.js&quot;
    response.end('Hello Node.js');
}).listen(8888); // 监听8888端口
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-comment">// 发送响应数据 "Hello Node.js"</span>
    response.end(<span class="hljs-string">'Hello Node.js'</span>);
}).listen(<span class="hljs-number">8888</span>); <span class="hljs-comment">// 监听8888端口</span>
<span class="hljs-comment">// 终端打印如下信息</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server running at http://127.0.0.1:8888/'</span>);</code></pre>
<p>2.使用express框架<br>本项目使用node.js的express框架来起HTTP服务器。<a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">express官网</a>，内有对应的简单教程、API等，可自行查阅</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const express = require('express'), //加载express模块
          app = express(); //启动一个web服务器
    
    app.get('/',function(req,res){
        res.send('Hello Node.js');
    })
    
    const server = app.listen(3000,function(){
        let port = server.address().port;
        console.log('app listening at http://%s:%s','localhost',port);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>), <span class="hljs-comment">//加载express模块</span>
          app = express(); <span class="hljs-comment">//启动一个web服务器</span>
    
    app.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
        res.send(<span class="hljs-string">'Hello Node.js'</span>);
    })
    
    <span class="hljs-keyword">const</span> server = app.listen(<span class="hljs-number">3000</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> port = server.address().port;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listening at http://%s:%s'</span>,<span class="hljs-string">'localhost'</span>,port);
    });</code></pre>
<p>保存后，命令行进入app.js文件所在文件夹，运行命令<code>node app.js</code>，然后浏览器访问<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，即会查看到返回'Hello Node.js'。</p>
<p><span class="img-wrap"><img data-src="/img/bVNkSj?w=387&amp;h=72" src="https://static.alili.tech/img/bVNkSj?w=387&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVNkSh?w=345&amp;h=134" src="https://static.alili.tech/img/bVNkSh?w=345&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">MongoDB可视化工具Robomongo</h3>
<p>为了测试方便，我们首先要往我们本地的MongoDB数据库中插入一些数据。为了方便使用，MongoDB也有类似mysql navicat的图形化管理工具Robomongo 1.0.0，下载地址：<a href="https://robomongo.org/download" rel="nofollow noreferrer" target="_blank">https://robomongo.org/download</a>，下载安装即可。</p>
<p>1.打开Robomongo，点击左上角file-&gt;connect(快捷键ctrl+N)，在弹出来的框中点击create来创建连接。</p>
<p><span class="img-wrap"><img data-src="/img/bVNkYs?w=644&amp;h=416" src="https://static.alili.tech/img/bVNkYs?w=644&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.输入连接名字，以及地址名，端口默认为27017，地址address和端口一般不用更改。</p>
<p><span class="img-wrap"><img data-src="/img/bVNkYz?w=542&amp;h=435" src="https://static.alili.tech/img/bVNkYz?w=542&amp;h=435" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这样test为名字的MongoDB连接就创建了。</p>
<p>3.MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。MongoDB和平常使用的MySQL是有比较大的区别的：</p>
<p><span class="img-wrap"><img data-src="/img/bVNkZ2?w=913&amp;h=372" src="https://static.alili.tech/img/bVNkZ2?w=913&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>4.我们首先点击左侧刚刚创建的test连接，鼠标右键单击 create database，输入是数据库名testDb点击create创建即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVNk0t?w=298&amp;h=182" src="https://static.alili.tech/img/bVNk0t?w=298&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5.鼠标左键单击刚刚创建的testDb数据库，创建collection(即为平常使用的数据库中所说的table表)，点击create即可创建user 集合成功。</p>
<p><span class="img-wrap"><img data-src="/img/bVNk0C?w=1072&amp;h=562" src="https://static.alili.tech/img/bVNk0C?w=1072&amp;h=562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>6.下面我们开始往user collection集合中插入数据：鼠标右键单击user collection -&gt; insert documet(插入文档，即我们平常使用的sql数据库中的行)。</p>
<p>7.MongoDB数据库中文档(每一行的数据)的数据结构和JSON基本一样，所有存储在集合中的数据都是BSON格式，BSON是一种类JSON的一种二进制形式的存储格式，简称Binary JSON。因此，我们在插入数据时，只要像JSON格式那样输入我们想要插入的数据。点击save保存即可成功插入数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    userName:'dodo',
    sex:18,
    sex:'女',
    job:'font-end Engineer'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">userName</span>:<span class="hljs-string">'dodo'</span>,
    sex:<span class="hljs-number">18</span>,
    sex:<span class="hljs-string">'女'</span>,
    job:<span class="hljs-string">'font-end Engineer'</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNk3e?w=405&amp;h=240" src="https://static.alili.tech/img/bVNk3e?w=405&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>8.双击user collection即可看到我们刚刚插入的那条数据，MongoDB的主键自动将_id字段设置为主键。</p>
<p><span class="img-wrap"><img data-src="/img/bVNk3w?w=1033&amp;h=374" src="https://static.alili.tech/img/bVNk3w?w=1033&amp;h=374" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">开始连接数据库</h3>
<p>1.使用MongoDB原生自带的API来创建连接，直接在/server/app.js输入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MongoClient = require('mongodb').MongoClient,
    DB_CONN_STR = 'mongodb://localhost:27017/testDb'; # 数据库为 testDb
var selectData = function(db, callback) {  
  //连接到user表  
  var collection = db.collection('user');
  //查询数据
  var whereStr = {&quot;userName&quot;:'dodo'};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log(&quot;连接成功！&quot;);
  selectData(db, function(result) {
    console.log(result);
    db.close();
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> MongoClient = <span class="hljs-keyword">require</span>(<span class="hljs-string">'mongodb'</span>).MongoClient,
    DB_CONN_STR = <span class="hljs-string">'mongodb://localhost:27017/testDb'</span>; <span class="hljs-comment"># 数据库为 testDb</span>
<span class="hljs-keyword">var</span> selectData = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(db, callback)</span> </span>{  
  <span class="hljs-comment">//连接到user表  </span>
  <span class="hljs-keyword">var</span> collection = db.collection(<span class="hljs-string">'user'</span>);
  <span class="hljs-comment">//查询数据</span>
  <span class="hljs-keyword">var</span> whereStr = {<span class="hljs-string">"userName"</span>:<span class="hljs-string">'dodo'</span>};
  collection.find(whereStr).toArray(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, result)</span> </span>{
    <span class="hljs-keyword">if</span>(err)
    {
      console.log(<span class="hljs-string">'Error:'</span>+ err);
      <span class="hljs-keyword">return</span>;
    }     
    callback(result);
  });
}
 
MongoClient.connect(DB_CONN_STR, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, db)</span> </span>{
  console.log(<span class="hljs-string">"连接成功！"</span>);
  selectData(db, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result)</span> </span>{
    console.log(result);
    db.close();
  });
});
</code></pre>
<p>2.本项目使用Mongoose来配合MongoDB操作数据库<br>mongoose是mongoDB的一个对象模型工具，是基于node-mongodb-native开发的mongoDB的nodejs驱动，可以在异步的环境下执行。同时它也是针对mongoDB操作的一个对象模型库，封装了mongoDB对文档的一些增删改查等常用方法，让nodejs操作mongoDB数据库变得更加容易。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载所需要的模块
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: String,//用户名
    sex: String,// 性别
    age: Number, // 年龄
},{collection:'user'}) 
// 注意这里一定要带有collection，否则mongoose会在下面model时对user添加后缀s.

const Models = {
    User : mongoose.model('user', UserSchema)
};

/**
 * 创建数据库名称并连接
 * Connecting to Mongod instance.
 */
const dbHost = 'mongodb://localhost/testDb';
mongoose.connect(dbHost);
const db = mongoose.connection;
db.on('error', function () {
    console.log('Database connection error.');
});
db.once('open', function () {
    console.log('The Database has connected.')
});

module.exports = Models;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 加载所需要的模块</span>
<span class="hljs-keyword">const</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
mongoose.Promise = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bluebird'</span>);
<span class="hljs-keyword">const</span> Schema = mongoose.Schema;

<span class="hljs-keyword">const</span> UserSchema = <span class="hljs-keyword">new</span> mongoose.Schema({
    <span class="hljs-attr">username</span>: <span class="hljs-built_in">String</span>,<span class="hljs-comment">//用户名</span>
    sex: <span class="hljs-built_in">String</span>,<span class="hljs-comment">// 性别</span>
    age: <span class="hljs-built_in">Number</span>, <span class="hljs-comment">// 年龄</span>
},{<span class="hljs-attr">collection</span>:<span class="hljs-string">'user'</span>}) 
<span class="hljs-comment">// 注意这里一定要带有collection，否则mongoose会在下面model时对user添加后缀s.</span>

<span class="hljs-keyword">const</span> Models = {
    <span class="hljs-attr">User</span> : mongoose.model(<span class="hljs-string">'user'</span>, UserSchema)
};

<span class="hljs-comment">/**
 * 创建数据库名称并连接
 * Connecting to Mongod instance.
 */</span>
<span class="hljs-keyword">const</span> dbHost = <span class="hljs-string">'mongodb://localhost/testDb'</span>;
mongoose.connect(dbHost);
<span class="hljs-keyword">const</span> db = mongoose.connection;
db.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Database connection error.'</span>);
});
db.once(<span class="hljs-string">'open'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The Database has connected.'</span>)
});

<span class="hljs-built_in">module</span>.exports = Models;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初尝node.js + Express + MongoDB + Vue.js 项目构建(2)

## 原文链接
[https://segmentfault.com/a/1190000009336888](https://segmentfault.com/a/1190000009336888)

