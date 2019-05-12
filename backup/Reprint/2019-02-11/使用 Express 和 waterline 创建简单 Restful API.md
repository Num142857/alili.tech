---
title: '使用 Express 和 waterline 创建简单 Restful API' 
date: 2019-02-11 2:30:49
hidden: true
slug: 1v80puj9ado
categories: [reprint]
---

{{< raw >}}

                    
<p>最近想重写一下网站的Restful API，原来是用PHP写的，看到现在nodejs这么火也想试一下，虽然了解过nodejs但真正动手写还是头一次，找了好多教程来看然后试着敲下一代码，这篇文件主要参考了</p>
<blockquote><p>Build a RESTful API Using Node and Express 4<br><a href="https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4" rel="nofollow noreferrer" target="_blank">https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4</a></p></blockquote>
<p>原文里用的是MongoDB,考虑到我用的数据库是Mysql,所以我把CRUD部分的操作改成了MySql的，</p>
<h2 id="articleHeader0">1. 环境的搭建</h2>
<p>nodejs的安装我就是不说了，我主要采用了以下Node package</p>
<ul>
<li><p>Express 4.0<br>nodejs下最出名的web 框架了</p></li>
<li><p>waterline<br>ORM数据操作中间件，官方团队提供的适配器：提供了对 MySQL / MongoDB / Redis 的支持，也有很多第三方开发的适配器。</p></li>
<li><p>sails-mysql<br>这个是waterline 官方提供的对MySQL的adapter</p></li>
</ul>
<p>package.json 内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;node-api&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;node api learn&quot;,
  &quot;main&quot;: &quot;server.js&quot;,
  &quot;dependencies&quot;: {
    &quot;body-parser&quot;: &quot;^1.15.0&quot;,
    &quot;express&quot;: &quot;^4.13.4&quot;,
    &quot;sails-mysql&quot;: &quot;^0.12.1&quot;,
    &quot;waterline&quot;: &quot;^0.12.1&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;nodemon&quot;: &quot;^1.9.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"node-api"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"node api learn"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"server.js"</span>,
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"body-parser"</span>: <span class="hljs-string">"^1.15.0"</span>,
    <span class="hljs-string">"express"</span>: <span class="hljs-string">"^4.13.4"</span>,
    <span class="hljs-string">"sails-mysql"</span>: <span class="hljs-string">"^0.12.1"</span>,
    <span class="hljs-string">"waterline"</span>: <span class="hljs-string">"^0.12.1"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"nodemon"</span>: <span class="hljs-string">"^1.9.1"</span>
  }
}</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p>安装所需要的所有package</p>
<p>首先让 express 先跑起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server.js


var express    = require('express');     
var app        = express();                 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        

var router = express.Router();             

router.get('/', function(req, res) {
    res.json({ message: 'hello! welcome to our api!' });   
});

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server.js</span>


<span class="hljs-keyword">var</span> express    = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);     
<span class="hljs-keyword">var</span> app        = express();                 
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);

app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">true</span> }));
app.use(bodyParser.json());

<span class="hljs-keyword">var</span> port = process.env.PORT || <span class="hljs-number">8080</span>;        

<span class="hljs-keyword">var</span> router = express.Router();             

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.json({ <span class="hljs-attr">message</span>: <span class="hljs-string">'hello! welcome to our api!'</span> });   
});

app.use(<span class="hljs-string">'/api'</span>, router);


app.listen(port);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Magic happens on port '</span> + port);</code></pre>
<p>在控制台运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js</code></pre>
<h2 id="articleHeader1">测试一下程序的运行效果</h2>
<p>因为要调试restful API 所以推荐使用POSTMAN 一款chrome下专门用来调试restful api的工具</p>
<p><span class="img-wrap"><img data-src="/img/bVu7W4" src="https://static.alili.tech/img/bVu7W4" alt="POSTMAN界面" title="POSTMAN界面" style="cursor: pointer; display: inline;"></span></p>
<p>在地址栏里输入 <strong><code>http://localhost:8080/api/</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bVu7Xc" src="https://static.alili.tech/img/bVu7Xc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，服务器已经正常启用了。接下来就是要做一些CRUD,的操作了.</p>
<h2 id="articleHeader2">2. 数据库的创建</h2>
<p>为了保持代码的清析和可理解，所以为测试代码创建的数据库很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CREATE TABLE `bear` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="sql hljs"><code class="sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-string">`bear`</span> (
  <span class="hljs-string">`id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">10</span>) <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT,
  <span class="hljs-string">`name`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-literal">NULL</span>
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
) <span class="hljs-keyword">ENGINE</span>=MyISAM AUTO_INCREMENT=<span class="hljs-number">9</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=latin1;</code></pre>
<p>就一个int id 自增型主键字段 和一个 varchar(255) 的name字段，方便编码。</p>
<p>定义一个的model在主目录下创建一个<strong>app/models/bear.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app/models/bear.js

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity:'bear',  //模型名，默认对应表名，你也可以通过tableName 属性来配置对应的表名
    connection:'myLocalMysql',//所采有的数据库连接
    schema: true,
    attributes:{
        name:'string'
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//app/models/bear.js</span>

<span class="hljs-keyword">var</span> Waterline = <span class="hljs-built_in">require</span>(<span class="hljs-string">'waterline'</span>);

<span class="hljs-built_in">module</span>.exports = Waterline.Collection.extend({
    <span class="hljs-attr">identity</span>:<span class="hljs-string">'bear'</span>,  <span class="hljs-comment">//模型名，默认对应表名，你也可以通过tableName 属性来配置对应的表名</span>
    connection:<span class="hljs-string">'myLocalMysql'</span>,<span class="hljs-comment">//所采有的数据库连接</span>
    schema: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">attributes</span>:{
        <span class="hljs-attr">name</span>:<span class="hljs-string">'string'</span>
    }
});</code></pre>
<blockquote><p>更详细的models说明，清参见：<a href="https://github.com/balderdashy/waterline-docs/blob/master/models/models.md" rel="nofollow noreferrer" target="_blank">https://github.com/balderdashy/waterline-docs/blob/master/models/models.md</a></p></blockquote>
<p>在创建一个数据库链接配置文件 <strong>app/config/waterline.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app/config/waterline.js
var mysqlAdapter = require('sails-mysql');

var wlconfig = {
    adapters: {
        'default':mysqlAdapter,
        mysql: mysqlAdapter
    },

    connections: {
        myLocalMysql: { //对应models中的connection
            adapter : 'mysql',
            host : 'localhost',
            port : 3306,
            user : 'root',
            password : '',
            database : 'test'
        }
    },

    defaults: {
        migrate: 'safe' //这个注意啊，如果是争对已经有的数据库一定要注意，小心把表全删除了
    }
};

exports.config = wlconfig;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//app/config/waterline.js</span>
<span class="hljs-keyword">var</span> mysqlAdapter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'sails-mysql'</span>);

<span class="hljs-keyword">var</span> wlconfig = {
    <span class="hljs-attr">adapters</span>: {
        <span class="hljs-string">'default'</span>:mysqlAdapter,
        <span class="hljs-attr">mysql</span>: mysqlAdapter
    },

    <span class="hljs-attr">connections</span>: {
        <span class="hljs-attr">myLocalMysql</span>: { <span class="hljs-comment">//对应models中的connection</span>
            adapter : <span class="hljs-string">'mysql'</span>,
            <span class="hljs-attr">host</span> : <span class="hljs-string">'localhost'</span>,
            <span class="hljs-attr">port</span> : <span class="hljs-number">3306</span>,
            <span class="hljs-attr">user</span> : <span class="hljs-string">'root'</span>,
            <span class="hljs-attr">password</span> : <span class="hljs-string">''</span>,
            <span class="hljs-attr">database</span> : <span class="hljs-string">'test'</span>
        }
    },

    <span class="hljs-attr">defaults</span>: {
        <span class="hljs-attr">migrate</span>: <span class="hljs-string">'safe'</span> <span class="hljs-comment">//这个注意啊，如果是争对已经有的数据库一定要注意，小心把表全删除了</span>
    }
};

exports.config = wlconfig;
</code></pre>
<p>然后回到server.js引入相关文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js

var Waterline    = require('waterline');

var Bear         = require('./app/models/bear');
var WConfig = require('./app/config/waterline');

var orm = new Waterline();
orm.loadCollection(Bear);

........
........

//把start server的代码改为

orm.initialize(WConfig.config,function(err,models){
    if(err) throw err;
    app.models = models.collections;
    //app.set('models',models.collections);
    app.connections = models.connections;

    app.listen(port);

    console.log('Magic happens on port ' + port);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//server.js</span>

<span class="hljs-keyword">var</span> Waterline    = <span class="hljs-built_in">require</span>(<span class="hljs-string">'waterline'</span>);

<span class="hljs-keyword">var</span> Bear         = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app/models/bear'</span>);
<span class="hljs-keyword">var</span> WConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app/config/waterline'</span>);

<span class="hljs-keyword">var</span> orm = <span class="hljs-keyword">new</span> Waterline();
orm.loadCollection(Bear);

........
........

<span class="hljs-comment">//把start server的代码改为</span>

orm.initialize(WConfig.config,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,models</span>)</span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> err;
    app.models = models.collections;
    <span class="hljs-comment">//app.set('models',models.collections);</span>
    app.connections = models.connections;

    app.listen(port);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Magic happens on port '</span> + port);
});</code></pre>
<h2 id="articleHeader3">3. 定义路由</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js

...

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req,res,next) {
    console.log('Something is happening.');
    next();
}); 

router.get('/', function(req,res) {
    res.json({ message: 'Hello! welcome to our api! '});
});

...

app.use('/api',router);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//server.js</span>

...

var port = process.env.PORT || <span class="hljs-number">8080</span>;

<span class="hljs-keyword">var</span> router = express.Router();

router.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res,next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Something is happening.'</span>);
    next();
}); 

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
    res.json({ <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello! welcome to our api! '</span>});
});

...

app.use(<span class="hljs-string">'/api'</span>,router);</code></pre>
<p>使用 express.Router() 来创建路由并增加一个中间件，这里我们只是让它简单的在控制台输出一句<strong> Something is happening.' </strong></p>
<h3 id="articleHeader4">POST /API/BEARS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.route('/bears')
    .post(function(req,res) {
        app.models.bear.create(req.body,function(err,model) {
            if(err) return res.json({ err,err }, 500);
            res.json(model);
        });
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.route(<span class="hljs-string">'/bears'</span>)
    .post(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
        app.models.bear.create(req.body,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>) </span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({ err,err }, <span class="hljs-number">500</span>);
            res.json(model);
        });
    });
</code></pre>
<p>用POSTMAN测试一下</p>
<p><span class="img-wrap"><img data-src="/img/bVu70X" src="https://static.alili.tech/img/bVu70X" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>完美，不过怎么多了两个字段 createAt 和 updateAt查了文档才知道，这就是一开始的时候我没有把<br>migrate:设为 'safe'， 不过也可以在models里关闭 autoCreatedAt：false 就可以了</p>
<h3 id="articleHeader5">GET　/API/BEARS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js
.post(function(req,res) {
        app.models.bear.create(req.body,function(err,model) {
            if(err) return res.json({ err,err }, 500);
            res.json(model);
        });
    })
.get(function(req,res) {
        app.models.bear.find().exec(function(err,model){
            if(err) return res.json({ err: err },500);
            res.json(model);
        });
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//server.js</span>
.post(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
        app.models.bear.create(req.body,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>) </span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({ err,err }, <span class="hljs-number">500</span>);
            res.json(model);
        });
    })
.get(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
        app.models.bear.find().exec(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>)</span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({ <span class="hljs-attr">err</span>: err },<span class="hljs-number">500</span>);
            res.json(model);
        });
    });</code></pre>
<h3 id="articleHeader6">通过id进行查改删</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.route('/bears/:bear_id')
    .get(function(req,res) {
        app.models.bear.findOne({ id: req.params.bear_id},function(err,model) {
            if(err) return res.json({ err:err },500);
            res.json(model);
        });
    })

    .put(function(req,res) {

        delete req.body.id;
        app.models.bear.update({ id: req.params.bear_id},req.body, function(err,model) {
            if(err) return res.json({ err: err},500);
            res.json(model);
        });
    })

    .delete(function(req,res) {
        app.models.bear.destroy({ id: req.params.bear_id},function(err,model) {
            if(err) return res.json({err: err},500);
            res.json({ status:'ok'});
        });
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.route(<span class="hljs-string">'/bears/:bear_id'</span>)
    .get(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
        app.models.bear.findOne({ <span class="hljs-attr">id</span>: req.params.bear_id},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>) </span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({ <span class="hljs-attr">err</span>:err },<span class="hljs-number">500</span>);
            res.json(model);
        });
    })

    .put(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{

        <span class="hljs-keyword">delete</span> req.body.id;
        app.models.bear.update({ <span class="hljs-attr">id</span>: req.params.bear_id},req.body, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>) </span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({ <span class="hljs-attr">err</span>: err},<span class="hljs-number">500</span>);
            res.json(model);
        });
    })

    .delete(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>) </span>{
        app.models.bear.destroy({ <span class="hljs-attr">id</span>: req.params.bear_id},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,model</span>) </span>{
            <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">return</span> res.json({<span class="hljs-attr">err</span>: err},<span class="hljs-number">500</span>);
            res.json({ <span class="hljs-attr">status</span>:<span class="hljs-string">'ok'</span>});
        });
    });
</code></pre>
<h2 id="articleHeader7">总结</h2>
<p>整个过程应该是比较简单的，由于没有涉及业务逻辑部分，所以也没有碰到什么坑，但作为一个基本入门还是比较简洁清晰的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Express 和 waterline 创建简单 Restful API

## 原文链接
[https://segmentfault.com/a/1190000004996659](https://segmentfault.com/a/1190000004996659)

