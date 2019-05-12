---
title: '(2/2)Vue构建单页应用最佳实战' 
date: 2019-02-09 2:30:59
hidden: true
slug: ll6wu6kojv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote><p>本章节，将会把所有的请求全写为跨域请求。不知道为什么，很多人一用了框架就会不知所措。给大家一个忠告，享受框架带来的便利，别忘了时刻提醒自己学好基础知识。</p></blockquote>
<p>先把一些不必要的代码删了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//TimeEntries.vue 的模拟数据代码
data () {
  // 模拟下初始化数据
  /*let existingEntry = {
    comment: '我的第一个任务',
    totalTime: 1.5,
    date: '2016-05-01'
  }*/
  return {
    timeEntries: []
  }
},
//头像和昵称暂时写死
<div class=&quot;col-sm-2 user-details&quot;>
  <img src=&quot;https://avatars1.githubusercontent.com/u/10184444?v=3&amp;s=460&quot; class=&quot;avatar img-circle img-responsive&quot; />
  <p class=&quot;text-center&quot;>
    <strong>
      二哲
    </strong>
  </p>
</div>


//LogTime.vue里的模拟数据代码
data () {
    return {
      timeEntry: {
        /*user: {
          name: '二哲',
          email: 'kodo@forchange.cn',
          image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        },*/
      }
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//TimeEntries.vue 的模拟数据代码</span>
data () {
  <span class="hljs-comment">// 模拟下初始化数据</span>
  <span class="hljs-comment">/*let existingEntry = {
    comment: '我的第一个任务',
    totalTime: 1.5,
    date: '2016-05-01'
  }*/</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">timeEntries</span>: []
  }
},
<span class="hljs-comment">//头像和昵称暂时写死</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"col-sm-2 user-details"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://avatars1.githubusercontent.com/u/10184444?v=3&amp;s=460"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar img-circle img-responsive"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>
      二哲
    <span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>


<span class="hljs-comment">//LogTime.vue里的模拟数据代码</span>
data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">timeEntry</span>: {
        <span class="hljs-comment">/*user: {
          name: '二哲',
          email: 'kodo@forchange.cn',
          image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        },*/</span>
      }
    }
},</code></pre>
<p>我们将专注3个字段的增删改查，任务时间，持续时间，备注。</p>
<h2 id="articleHeader1">正文</h2>
<p>我们的数据交互其实很简单，所以我在这选择使用大家最熟悉的<code>express</code>和<code>mongodb</code>，在一个<code>app.js</code> 文件里完成所有的<code>controller</code>。</p>
<p>首先，安装几个必要的包<code>npm i express mongodb morgan body-parser --save-dev;</code></p>
<p>简单解释下Morgan和body-parser，其实就是一个log美化和解析参数。具体大家可以google下。</p>
<p>在我们的根目录下，创建<code>app.js</code>初始化以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/mission';
var _db;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

MongoClient.connect(mongoUrl, function (err, db) {
  if(err) {
    console.error(err);
    return;
  }

  console.log('connected to mongo');
  _db = db;
  app.listen(8888, function () {
    console.log('server is running...');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">var</span> morgan = <span class="hljs-built_in">require</span>(<span class="hljs-string">'morgan'</span>);

<span class="hljs-keyword">var</span> MongoClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongodb'</span>).MongoClient;
<span class="hljs-keyword">var</span> mongoUrl = <span class="hljs-string">'mongodb://localhost:27017/mission'</span>;
<span class="hljs-keyword">var</span> _db;

app.use(morgan(<span class="hljs-string">'dev'</span>));
app.use(bodyParser.json());
app.use(express.static(<span class="hljs-string">'dist'</span>));

MongoClient.connect(mongoUrl, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, db</span>) </span>{
  <span class="hljs-keyword">if</span>(err) {
    <span class="hljs-built_in">console</span>.error(err);
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'connected to mongo'</span>);
  _db = db;
  app.listen(<span class="hljs-number">8888</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running...'</span>);
  });
});</code></pre>
<p>解释下mongoUrl这行<code>mongodb://localhost:27017/mission</code> 连接相应的端口，并且使用mission表。此时你是没有<code>mission</code>数据库的，这不用在意。在我们后续操作中，它将会自动创建一个mission数据库。</p>
<p>上面代码的意思是，我们创建我们的一个mongo连接，当数据库连接上了后再启动我们的服务器。</p>
<p>接着先启动我们的mongo服务。在命令行里 <code>sudo mongo</code> 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006769733" src="https://static.alili.tech/img/remote/1460000006769733" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果你用得是webstrom编辑器，可以直接运行<code>app.js</code>，如果是命令行，那就使用 <code>node app.js</code> </p>
<p>如果看见命令行输出了 <code>connected to mongo</code> <code>server is running...</code> 就可以在<code>8888</code>端口访问我们的应用了。（在这之前别忘了build你的代码）</p>
<p>由于我们讲得是跨域，所以我们讲在我们的dev环境下完成所有的请求。<code>npm run dev</code></p>
<p>关闭我们的8888端口页面，进入8080端口的开发环境。</p>
<p>写下我们第一个创建任务的请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js

//使用post方法
app.post('/create', function(req, res, next) {
    //接收前端发送的字段
  var mission = req.body;
  //选择一个表my_mission 此时没有没关系，也会自动创建
  var collection = _db.collection('my_mission');
    //如果我们需要的字段不存在，返回前端信息
  if(!mission.comment || !mission.totalTime || !mission.date) {
    res.send({errcode:-1,errmsg:&quot;params missed&quot;});
    return;
  }
    //如果存在就插入数据库，返回OK
  collection.insert({comment: mission.comment, totalTime: mission.totalTime,date:mission.date}, function (err, ret) {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.send({errcode:0,errmsg:&quot;ok&quot;});
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//app.js</span>

<span class="hljs-comment">//使用post方法</span>
app.post(<span class="hljs-string">'/create'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-comment">//接收前端发送的字段</span>
  <span class="hljs-keyword">var</span> mission = req.body;
  <span class="hljs-comment">//选择一个表my_mission 此时没有没关系，也会自动创建</span>
  <span class="hljs-keyword">var</span> collection = _db.collection(<span class="hljs-string">'my_mission'</span>);
    <span class="hljs-comment">//如果我们需要的字段不存在，返回前端信息</span>
  <span class="hljs-keyword">if</span>(!mission.comment || !mission.totalTime || !mission.date) {
    res.send({<span class="hljs-attr">errcode</span>:<span class="hljs-number">-1</span>,<span class="hljs-attr">errmsg</span>:<span class="hljs-string">"params missed"</span>});
    <span class="hljs-keyword">return</span>;
  }
    <span class="hljs-comment">//如果存在就插入数据库，返回OK</span>
  collection.insert({<span class="hljs-attr">comment</span>: mission.comment, <span class="hljs-attr">totalTime</span>: mission.totalTime,<span class="hljs-attr">date</span>:mission.date}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, ret</span>) </span>{
    <span class="hljs-keyword">if</span>(err) {
      <span class="hljs-built_in">console</span>.error(err);
      res.status(<span class="hljs-number">500</span>).end();
    } <span class="hljs-keyword">else</span> {
      res.send({<span class="hljs-attr">errcode</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">errmsg</span>:<span class="hljs-string">"ok"</span>});
    }
  });
});</code></pre>
<p>修改下我们的<code>LogTime.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//LogTime.vue
<button class=&quot;btn btn-primary&quot; @click=&quot;save()&quot;>保存</button>

methods: {
    save () {
      this.$http.post('http://localhost:8888/create',{
        comment : this.timeEntry.comment,
        totalTime : this.timeEntry.totalTime,
        date : this.timeEntry.date
      }).then(function(ret) {
        console.log(ret);
        let timeEntry = this.timeEntry
        console.log(timeEntry);
        this.$dispatch('timeUpdate', timeEntry)
        this.timeEntry = {}
      })
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//LogTime.vue</span>
&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"btn btn-primary"</span> @click=<span class="hljs-string">"save()"</span>&gt;保存&lt;<span class="hljs-regexp">/button&gt;

methods: {
    save () {
      this.$http.post('http:/</span><span class="hljs-regexp">/localhost:8888/</span>create<span class="hljs-string">',{
        comment : this.timeEntry.comment,
        totalTime : this.timeEntry.totalTime,
        date : this.timeEntry.date
      }).then(function(ret) {
        console.log(ret);
        let timeEntry = this.timeEntry
        console.log(timeEntry);
        this.$dispatch('</span>timeUpdate<span class="hljs-string">', timeEntry)
        this.timeEntry = {}
      })
    }
}
</span></code></pre>
<p>输入好内容，点击保存按钮，会发现报了个错。这其实就是最常见的跨域请求错误。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005268232" src="https://static.alili.tech/img/remote/1460000005268232" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005268234" src="https://static.alili.tech/img/remote/1460000005268234" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是我们明明写得是<code>post</code>请求为什么显示得是<code>options</code>呢？</p>
<p>这其实是跨域请求前会先发起的一个<code>options</code>请求，需要先问问服务端，我需要一些操作可以吗？如果服务端那里是允许的，才会继续让你发送<code>post</code>请求。</p>
<p>我不知道那些使用<code>vue-resource</code>各种姿势也想满足跨域请求的人是怎么想的。你想上天吗？</p>
<p>所以我们需要服务端配置，而不是前端。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
app.all(&quot;*&quot;, function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(&quot;Access-Control-Allow-Headers&quot;, &quot;Content-Type,Content-Length, Authorization, Accept,X-Requested-With&quot;);
  res.header(&quot;Access-Control-Allow-Methods&quot;,&quot;PUT,POST,GET,DELETE,OPTIONS&quot;);
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//app.js</span>
app.all(<span class="hljs-string">"*"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.header(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>);
  res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"Content-Type,Content-Length, Authorization, Accept,X-Requested-With"</span>);
  res.header(<span class="hljs-string">"Access-Control-Allow-Methods"</span>,<span class="hljs-string">"PUT,POST,GET,DELETE,OPTIONS"</span>);
  <span class="hljs-keyword">if</span> (req.method == <span class="hljs-string">'OPTIONS'</span>) {
    res.send(<span class="hljs-number">200</span>);
  } <span class="hljs-keyword">else</span> {
    next();
  }
});
</code></pre>
<p><code>Access-Control-Allow-Origin</code>是设置你的来源域名，写<code>*</code>是很危险的操作。所以我们可以直接写成我们所需的域名和端口，别人就没法请求了。</p>
<p>另外几行就不解释了，一看就懂。</p>
<p>不出意外，可以发现发送了options后，马上发送了post，然后就创建成功了。看下mongo的表，也多了一条记录。</p>
<p>接着来让我们一口气写完剩下的三个请求。列表渲染，删除计划，获取总时长。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
var ObjectID = require('mongodb').ObjectID 

//获取总时长
app.get('/time', function(req, res, next) {
    //获取数据表
  var collection = _db.collection('my_mission');
  var time = 0;
  //查询出所有计划
  collection.find({}).toArray(function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    //所有计划累加时长
    ret.forEach(function (item, index) {
      time += +item.totalTime;
    });
    //返回时长
    res.json({errcode:0,errmsg:&quot;ok&quot;,time:time});
  });
});

//获取列表
app.get('/time-entries', function(req, res, next) {
  var collection = _db.collection('my_mission');
  collection.find({}).toArray(function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    res.json(ret);
  });
});

//删除计划
app.delete('/delete/:id', function (req, res, next) {
  var _id = req.params.id;
  var collection = _db.collection('my_mission');
  console.log(_id)
  //使用mongodb的唯一ObjectId字段查找出对应id删除记录
  collection.remove({_id: new ObjectID(_id)} ,function (err, result) {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.send({errcode:0,errmsg:&quot;ok&quot;});
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">var</span> ObjectID = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongodb'</span>).ObjectID 

<span class="hljs-comment">//获取总时长</span>
app.get(<span class="hljs-string">'/time'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-comment">//获取数据表</span>
  <span class="hljs-keyword">var</span> collection = _db.collection(<span class="hljs-string">'my_mission'</span>);
  <span class="hljs-keyword">var</span> time = <span class="hljs-number">0</span>;
  <span class="hljs-comment">//查询出所有计划</span>
  collection.find({}).toArray(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, ret</span>) </span>{
    <span class="hljs-keyword">if</span>(err) {
      <span class="hljs-built_in">console</span>.error(err);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">//所有计划累加时长</span>
    ret.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, index</span>) </span>{
      time += +item.totalTime;
    });
    <span class="hljs-comment">//返回时长</span>
    res.json({<span class="hljs-attr">errcode</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">errmsg</span>:<span class="hljs-string">"ok"</span>,<span class="hljs-attr">time</span>:time});
  });
});

<span class="hljs-comment">//获取列表</span>
app.get(<span class="hljs-string">'/time-entries'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">var</span> collection = _db.collection(<span class="hljs-string">'my_mission'</span>);
  collection.find({}).toArray(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, ret</span>) </span>{
    <span class="hljs-keyword">if</span>(err) {
      <span class="hljs-built_in">console</span>.error(err);
      <span class="hljs-keyword">return</span>;
    }
    res.json(ret);
  });
});

<span class="hljs-comment">//删除计划</span>
app.delete(<span class="hljs-string">'/delete/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">var</span> _id = req.params.id;
  <span class="hljs-keyword">var</span> collection = _db.collection(<span class="hljs-string">'my_mission'</span>);
  <span class="hljs-built_in">console</span>.log(_id)
  <span class="hljs-comment">//使用mongodb的唯一ObjectId字段查找出对应id删除记录</span>
  collection.remove({<span class="hljs-attr">_id</span>: <span class="hljs-keyword">new</span> ObjectID(_id)} ,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
    <span class="hljs-keyword">if</span>(err) {
      <span class="hljs-built_in">console</span>.error(err);
      res.status(<span class="hljs-number">500</span>).end();
    } <span class="hljs-keyword">else</span> {
      res.send({<span class="hljs-attr">errcode</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">errmsg</span>:<span class="hljs-string">"ok"</span>});
    }
  });
});</code></pre>
<p>前端部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//App.vue
ready() {
    this.$http.get('http://localhost:8888/time')
      .then(function(ret) {
        this.totalTime = ret.data.time;
      })
      .then(function(err) {
        console.log(err);
      })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//App.vue</span>
ready() {
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost:8888/time'</span>)
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ret</span>) </span>{
        <span class="hljs-keyword">this</span>.totalTime = ret.data.time;
      })
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(err);
      })
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//TimeEntries.vue 
route : {
  data(){
    this.$http.get('http://localhost:8888/time-entries')
      .then(function(ret) {
        this.timeEntries = ret.data;
      })
      .then(function(err) {
        console.log(err);
      })
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//TimeEntries.vue </span>
route : {
  data(){
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost:8888/time-entries'</span>)
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ret</span>) </span>{
        <span class="hljs-keyword">this</span>.timeEntries = ret.data;
      })
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(err);
      })
  }
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//TimeEntries.vue
<div class=&quot;col-sm-1&quot;>
  <button
    class=&quot;btn btn-xs btn-danger delete-button&quot;
    @click=&quot;deleteTimeEntry(timeEntry)&quot;>
    X
  </button>
</div>

deleteTimeEntry (timeEntry) {
    // 删除
    let index = this.timeEntries.indexOf(timeEntry)
    let _id = this.timeEntries[index]._id
    if (window.confirm('确认删除?')) {
      this.$http.delete('http://localhost:8888/delete/' + _id)
        .then(function(ret) {
          console.log(ret);
        })
        .then(function(err) {
          console.log(err)
        });
      this.timeEntries.splice(index, 1)
      this.$dispatch('deleteTime', timeEntry)
    }
}
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//TimeEntries.vue</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"col-sm-1"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-xs btn-danger delete-button"</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteTimeEntry(timeEntry)"</span>&gt;</span>
    X
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;

deleteTimeEntry (timeEntry) {
    /</span><span class="hljs-regexp">/ 删除
    let index = this.timeEntries.indexOf(timeEntry)
    let _id = this.timeEntries[index]._id
    if (window.confirm('确认删除?')) {
      this.$http.delete('http:/</span><span class="hljs-regexp">/localhost:8888/</span><span class="hljs-keyword">delete</span>/<span class="hljs-string">' + _id)
        .then(function(ret) {
          console.log(ret);
        })
        .then(function(err) {
          console.log(err)
        });
      this.timeEntries.splice(index, 1)
      this.$dispatch('</span>deleteTime<span class="hljs-string">', timeEntry)
    }
}
  </span></code></pre>
<h2 id="articleHeader2">完结</h2>
<p>到此，我们就将我们整个应用完成了。新增创建删除都可用了。</p>
<p>本来还想有上传头像等，那样觉得更多的是偏后端教学。既然我们是vue的简单入门教程就不过多介绍。</p>
<p>本系列让大家轻松的了解学习了 vue, vue-router, vue-resource, express, mongodb 的运用。</p>
<p>还是那句话，享受框架带来便利的同时，别忘了加强基础的训练。基本功才是真正的王道啊。玩电竞的玩家一定深有体会。</p>
<p>最后给有兴趣的同学留下两个简单的作业</p>
<ol>
<li><p>完成头像昵称的字段</p></li>
<li><p>完成修改操作</p></li>
</ol>
<blockquote><p>源码地址：<a href="https://github.com/MeCKodo/vue-tutorial" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/vue-tutorial</a><br>(1/2)Vue构建单页应用最佳实战<a href="https://segmentfault.com/a/1190000005009052">https://segmentfault.com/a/1190000005009052</a><br>国内最优秀的vue群：364912432</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
(2/2)Vue构建单页应用最佳实战

## 原文链接
[https://segmentfault.com/a/1190000005268225](https://segmentfault.com/a/1190000005268225)

