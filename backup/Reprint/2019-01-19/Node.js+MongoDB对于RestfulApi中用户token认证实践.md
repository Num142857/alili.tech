---
title: 'Node.js+MongoDB对于RestfulApi中用户token认证实践' 
date: 2019-01-19 2:30:10
hidden: true
slug: r8yve5n3vxn
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629635?w=800&amp;h=534" src="https://static.alili.tech/img/remote/1460000008629635?w=800&amp;h=534" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>最近在新的项目中开发中需要使用到RESTful API的对接IOS与Android应用开发，所以一不小心就踩进了REST的坑里面……在开发过程中还是有许多收货的。<strong>这次就来看看API设计中的token的思路与实践</strong>。</p></blockquote>
<h2 id="articleHeader0">技术栈</h2>
<p>使用Node.js上的<a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">Express</a>框架进行我们的路由设计，<a href="https://cnodejs.org/topic/504b4924e2b84515770103dd" rel="nofollow noreferrer" target="_blank">Mongoose</a>来与Mongodb数据库连接交互，使用Postman对我们设计的Api进行调试，快动起手来吧！</p>
<h2 id="articleHeader1">关于RESTful API</h2>
<p>网上已经有了很多关于RESTful的介绍，我这里也不过多重复了。想说的就是它的主要作用，就是对于现如今的网络应用程序，分为前端和后端两个部分，然而当前的发展趋势就是应用平台需求的扩大(IOS、Android、Webapp等等)</p>
<p>因此，就需要一种统一的机制，方便不同的应用平台的前端设备与后端进行通信，也就是前后端的分离。这导致了API架构的流行，甚至出现"API First"的设计思想。RESTful API则是目前比较成熟的一套互联网应用程序的API设计理论。</p>
<h2 id="articleHeader2">API设计中的token的思路</h2>
<p>在API设计中,TOKEN用来判断用户是否有权限访问API.TOKEN首先不需要编解码处理. 一般TOKEN都是一些用户名+时间等内容的MD5的不可逆加密.然后通过一个USER_TOKEN表来判断用户请求中包含的TOKEN与USER_TOKEN表中的TOKEN是否一致即可. </p>
<p>具体实践过程主要为:</p>
<ol>
<li><p>设定一个密钥比如key = ‘2323dsfadfewrasa3434'。</p></li>
<li><p>这个key 只有发送方和接收方知道。</p></li>
<li><p>调用时，发送方，组合各个参数用密钥 key按照一定的规则(各种排序，MD5，ip等)生成一个access_key。一起post提交到API接口。</p></li>
<li><p>接收方拿到post过来的参数以及这个access_key。也和发送一样，用密钥key 对各个参数进行一样的规则(各种排序，MD5，ip等)也生成一个access_key2。</p></li>
<li><p>对比 access_key 和 access_key2 。一样。则允许操作，不一样，报错返回或者加入黑名单。</p></li>
</ol>
<h2 id="articleHeader3">token设计具体实践</h2>
<blockquote><p>废话不多说，先进入看我们的干货，这次选用Node.js+experss配合Mongoose来进入REST的token实践</p></blockquote>
<p>项目地址: <a href="https://github.com/Nicksapp/nAuth-restful-api" rel="nofollow noreferrer" target="_blank">GitHub地址</a></p>
<p>或 <code>git clone https://github.com/Nicksapp/nAuth-restful-api.git</code></p>
<h3 id="articleHeader4">整体构架</h3>
<p>开发前先进行我们设计的构想</p>
<ul>
<li>
<p>路由设计</p>
<ul>
<li><p>POST /api/signup: 用户注册</p></li>
<li><p>POST /api/user/accesstoken: 账号验证,获取token</p></li>
<li><p>GET /api/users/info: 获得用户信息,需验证</p></li>
</ul>
</li>
<li>
<p>user 模型设计</p>
<ul>
<li><p>name : 用户名</p></li>
<li><p>password: 密码</p></li>
<li><p>token: 验证相关token</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader5">新建项目</h3>
<p>先看看我们的项目文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- routes/
---- index.js
---- users.js
- models/
---- user.js
- config.js
- package.json
- passport.js
- index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">- routes/
---- index.js
---- users.js
- models/
---- user.js
- config.js
- package.json
- passport.js
- index.js</code></pre>
<p><code>npm init</code>创建我们的<code>package.json</code></p>
<p>接着在项目根文件夹下安装我们所需的依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express body-parser morgan mongoose jsonwebtoken bcrypt passport passport-http-bearer --save 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>express <span class="hljs-keyword">body-parser </span>morgan mongoose <span class="hljs-keyword">jsonwebtoken </span><span class="hljs-keyword">bcrypt </span>passport passport-http-<span class="hljs-keyword">bearer </span>--save 
</code></pre>
<ul>
<li><p>express: 我们的主要开发框架</p></li>
<li><p>mongoose: 用来与MongoDB数据库进行交互的框架，请提前安装好MongoDB在PC上</p></li>
<li><p>morgan: 会将程序请求过程的信息显示在Terminal中，以便于我们调试代码</p></li>
<li><p>jsonwebtoken: 用来生成我们的token</p></li>
<li><p>passport: 非常流行的权限验证库</p></li>
<li><p>bcrypt: 对用户密码进行hash加密</p></li>
</ul>
<p>-- save会将我们安装的库文件写入<code>package.json</code>的依赖中,以便其他人打开项目是能够正确安装所需依赖.</p>
<h3 id="articleHeader6">用户模型</h3>
<p>定义我们所需用户模型，用于moogoose，新建<code>models/user.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  password: {
    type: String,
    require: true
  },
  token: {
    type: String
  }
});

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">const</span> Schema = mongoose.Schema;
<span class="hljs-keyword">const</span> bcrypt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bcrypt'</span>);

<span class="hljs-keyword">const</span> UserSchema = <span class="hljs-keyword">new</span> Schema({
  <span class="hljs-attr">name</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">unique</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 不可重复约束</span>
    <span class="hljs-built_in">require</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 不可为空约束</span>
  },
  <span class="hljs-attr">password</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">require</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">token</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
  }
});

<span class="hljs-comment">// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道</span>
UserSchema.pre(<span class="hljs-string">'save'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">var</span> user = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isModified(<span class="hljs-string">'password'</span>) || <span class="hljs-keyword">this</span>.isNew) {
        bcrypt.genSalt(<span class="hljs-number">10</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, salt</span>) </span>{
            <span class="hljs-keyword">if</span> (err) {
                <span class="hljs-keyword">return</span> next(err);
            }
            bcrypt.hash(user.password, salt, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, hash</span>) </span>{
                <span class="hljs-keyword">if</span> (err) {
                    <span class="hljs-keyword">return</span> next(err);
                }
                user.password = hash;
                next();
            });
        });
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> next();
    }
});
<span class="hljs-comment">// 校验用户输入密码是否正确</span>
UserSchema.methods.comparePassword = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">passw, cb</span>) </span>{
    bcrypt.compare(passw, <span class="hljs-keyword">this</span>.password, (err, isMatch) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-keyword">return</span> cb(err);
        }
        cb(<span class="hljs-literal">null</span>, isMatch);
    });
};

<span class="hljs-built_in">module</span>.exports = mongoose.model(<span class="hljs-string">'User'</span>, UserSchema);
</code></pre>
<h3 id="articleHeader7">配置文件</h3>
<p><code>./config.js</code> 用来配置我们的MongoDB数据库连接和token的密钥。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  'secret': 'learnRestApiwithNickjs', // used when we create and verify JSON Web Tokens
  'database': 'mongodb://localhost:27017/test' // 填写本地自己 mongodb 连接地址,xxx为数据表名
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">'secret'</span>: <span class="hljs-string">'learnRestApiwithNickjs'</span>, <span class="hljs-comment">// used when we create and verify JSON Web Tokens</span>
  <span class="hljs-string">'database'</span>: <span class="hljs-string">'mongodb://localhost:27017/test'</span> <span class="hljs-comment">// 填写本地自己 mongodb 连接地址,xxx为数据表名</span>
};
</code></pre>
<h3 id="articleHeader8">本地服务器配置</h3>
<p><code>./index.js</code> 服务器配置文件，也是程序的入口。</p>
<p>这里我们主要用来包含我们程序需要加载的库文件，调用初始化程序所需要的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const app = express();
const bodyParser = require('body-parser');// 解析body字段模块
const morgan = require('morgan'); // 命令行log显示
const mongoose = require('mongoose');
const passport = require('passport');// 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy;// token验证模块
const routes = require('./routes');
const config = require('./config');

let port = process.env.PORT || 8080;

app.use(passport.initialize());// 初始化passport模块
app.use(morgan('dev'));// 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值

routes(app); // 路由引入

mongoose.Promise = global.Promise;
mongoose.connect(config.database); // 连接数据库

app.listen(port, () => {
  console.log('listening on port : ' + port);
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);<span class="hljs-comment">// 解析body字段模块</span>
<span class="hljs-keyword">const</span> morgan = <span class="hljs-built_in">require</span>(<span class="hljs-string">'morgan'</span>); <span class="hljs-comment">// 命令行log显示</span>
<span class="hljs-keyword">const</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">const</span> passport = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport'</span>);<span class="hljs-comment">// 用户认证模块passport</span>
<span class="hljs-keyword">const</span> Strategy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport-http-bearer'</span>).Strategy;<span class="hljs-comment">// token验证模块</span>
<span class="hljs-keyword">const</span> routes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes'</span>);
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);

<span class="hljs-keyword">let</span> port = process.env.PORT || <span class="hljs-number">8080</span>;

app.use(passport.initialize());<span class="hljs-comment">// 初始化passport模块</span>
app.use(morgan(<span class="hljs-string">'dev'</span>));<span class="hljs-comment">// 命令行中显示程序运行日志,便于bug调试</span>
app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> }));
app.use(bodyParser.json()); <span class="hljs-comment">// 调用bodyParser模块以便程序正确解析body传入值</span>

routes(app); <span class="hljs-comment">// 路由引入</span>

mongoose.Promise = global.Promise;
mongoose.connect(config.database); <span class="hljs-comment">// 连接数据库</span>

app.listen(port, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on port : '</span> + port);
})
</code></pre>
<h3 id="articleHeader9">路由配置</h3>
<p><code>./routes</code> 主要存放路由相关文件</p>
<p><code>./routes/index.js</code> 路由总入口，引入所使用路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'hello index!'});
  });

  app.use('/api', require('./users')); // 在所有users路由前加/api
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {
  app.get(<span class="hljs-string">'/'</span>, (req, res) =&gt; {
    res.json({ <span class="hljs-attr">message</span>: <span class="hljs-string">'hello index!'</span>});
  });

  app.use(<span class="hljs-string">'/api'</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'./users'</span>)); <span class="hljs-comment">// 在所有users路由前加/api</span>
};</code></pre>
<p><code>./routes/users.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
const router = express.Router();

require('../passport')(passport);

// 注册账户
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, message: '请输入您的账号密码.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, message: '注册失败!'});
      }
      res.json({success: true, message: '成功创建新用户!'});
    });
  }
});

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/user/accesstoken', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success: false, message:'认证失败,用户不存在!'});
    } else if(user) {
      // 检查密码是否正确
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch &amp;&amp; !err) {
          var token = jwt.sign({name: user.name}, config.secret,{
            expiresIn: 10080
          });
          user.token = token;
          user.save(function(err){
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '验证成功!',
            token: 'Bearer ' + token,
            name: user.name
          });
        } else {
          res.send({success: false, message: '认证失败,密码错误!'});
        }
      });
    }
  });
});

// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/users/info',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json({username: req.user.name});
});

module.exports = router;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> User = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../models/user'</span>);
<span class="hljs-keyword">const</span> jwt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jsonwebtoken'</span>);
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>);
<span class="hljs-keyword">const</span> passport = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport'</span>);
<span class="hljs-keyword">const</span> router = express.Router();

<span class="hljs-built_in">require</span>(<span class="hljs-string">'../passport'</span>)(passport);

<span class="hljs-comment">// 注册账户</span>
router.post(<span class="hljs-string">'/signup'</span>, (req, res) =&gt; {
  <span class="hljs-keyword">if</span> (!req.body.name || !req.body.password) {
    res.json({<span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入您的账号密码.'</span>});
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> newUser = <span class="hljs-keyword">new</span> User({
      <span class="hljs-attr">name</span>: req.body.name,
      <span class="hljs-attr">password</span>: req.body.password
    });
    <span class="hljs-comment">// 保存用户账号</span>
    newUser.save(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">return</span> res.json({<span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'注册失败!'</span>});
      }
      res.json({<span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'成功创建新用户!'</span>});
    });
  }
});

<span class="hljs-comment">// 检查用户名与密码并生成一个accesstoken如果验证通过</span>
router.post(<span class="hljs-string">'/user/accesstoken'</span>, (req, res) =&gt; {
  User.findOne({
    <span class="hljs-attr">name</span>: req.body.name
  }, (err, user) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-keyword">if</span> (!user) {
      res.json({<span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">message</span>:<span class="hljs-string">'认证失败,用户不存在!'</span>});
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(user) {
      <span class="hljs-comment">// 检查密码是否正确</span>
      user.comparePassword(req.body.password, (err, isMatch) =&gt; {
        <span class="hljs-keyword">if</span> (isMatch &amp;&amp; !err) {
          <span class="hljs-keyword">var</span> token = jwt.sign({<span class="hljs-attr">name</span>: user.name}, config.secret,{
            <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">10080</span>
          });
          user.token = token;
          user.save(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
            <span class="hljs-keyword">if</span> (err) {
              res.send(err);
            }
          });
          res.json({
            <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'验证成功!'</span>,
            <span class="hljs-attr">token</span>: <span class="hljs-string">'Bearer '</span> + token,
            <span class="hljs-attr">name</span>: user.name
          });
        } <span class="hljs-keyword">else</span> {
          res.send({<span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'认证失败,密码错误!'</span>});
        }
      });
    }
  });
});

<span class="hljs-comment">// passport-http-bearer token 中间件验证</span>
<span class="hljs-comment">// 通过 header 发送 Authorization -&gt; Bearer  + token</span>
<span class="hljs-comment">// 或者通过 ?access_token = token</span>
router.get(<span class="hljs-string">'/users/info'</span>,
  passport.authenticate(<span class="hljs-string">'bearer'</span>, { <span class="hljs-attr">session</span>: <span class="hljs-literal">false</span> }),
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.json({<span class="hljs-attr">username</span>: req.user.name});
});

<span class="hljs-built_in">module</span>.exports = router;
</code></pre>
<h3 id="articleHeader10">passport配置</h3>
<p><code>./passport.js</code> 配置权限模块所需功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const User = require('./models/user');
const config = require('./config');

module.exports = function(passport) {
    passport.use(new Strategy(
        function(token, done) {
            User.findOne({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> passport = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport'</span>);
<span class="hljs-keyword">const</span> Strategy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'passport-http-bearer'</span>).Strategy;

<span class="hljs-keyword">const</span> User = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./models/user'</span>);
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">passport</span>) </span>{
    passport.use(<span class="hljs-keyword">new</span> Strategy(
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">token, done</span>) </span>{
            User.findOne({
                <span class="hljs-attr">token</span>: token
            }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, user</span>) </span>{
                <span class="hljs-keyword">if</span> (err) {
                    <span class="hljs-keyword">return</span> done(err);
                }
                <span class="hljs-keyword">if</span> (!user) {
                    <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>);
                }
                <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>, user);
            });
        }
    ));
};
</code></pre>
<p>主要验证发送的token值与用户服务器端token值是否匹配，进行信息验证。</p>
<h2 id="articleHeader11">具体调试</h2>
<p>现在就可以运行我们的代码看具体运作过程了！为了便于调试与参数的收发，我们使用<a href="https://www.getpostman.com/" rel="nofollow noreferrer" target="_blank">postman</a>(可在Chrome上或Mac上安装)来操作.</p>
<p><code>node index</code>运行我们的本地服务器，访问 <code>localhost:8080/</code><br>应该就可以看到我们所返回的初始json值了，然我们继续深入测试。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629636?w=1678&amp;h=1558" src="https://static.alili.tech/img/remote/1460000008629636?w=1678&amp;h=1558" alt="" title="" style="cursor: pointer;"></span></p>
<p>POST访问<code>localhost:8080/api/signup</code>,我们来注册一个新用户，注意要设置<code>body</code>的<code>Content-Type</code>为<code>x-www-form-urlencoded</code> 以便我们的<code>body-parser</code>能够正确解析,好的我们成功模拟创建了我们的新用户。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629637?w=1622&amp;h=1502" src="https://static.alili.tech/img/remote/1460000008629637?w=1622&amp;h=1502" alt="" title="" style="cursor: pointer;"></span></p>
<p>连接一下数据库看下我们的用户信息是否也被正确存储(注:我使用的是MongoChef,十分强大MongoDB数据库管理软件),我们可以看到,我的password也被正确加密保存了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629638?w=1768&amp;h=1248" src="https://static.alili.tech/img/remote/1460000008629638?w=1768&amp;h=1248" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>接着POST访问<code>localhost:8080/api/user/accesstoken</code>,来为我的用户获得专属token，POST过程与注册相关,可以看到也正确生成我们的token值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629639?w=1678&amp;h=1558" src="https://static.alili.tech/img/remote/1460000008629639?w=1678&amp;h=1558" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>再看下我们的数据库中的用户信息，token值也被存入了进来，便于我们之后进行权限验证。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629640?w=1768&amp;h=1248" src="https://static.alili.tech/img/remote/1460000008629640?w=1768&amp;h=1248" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>GET访问<code>localhost:8080/api/users/info</code>,同时将我们的token值在<code>Header</code>中以 <code>Authorization: token</code> 传入,正确获得用户名则表示我们访问请求通过了验证。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008629641?w=1678&amp;h=1558" src="https://static.alili.tech/img/remote/1460000008629641?w=1678&amp;h=1558" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果token值不正确，则返回 Unauthorized 并拒绝访问请求。到这里我们的权限验证功能也就基本实现了(喜大普奔~~~)。<br><span class="img-wrap"><img data-src="/img/remote/1460000008629642?w=1678&amp;h=1558" src="https://static.alili.tech/img/remote/1460000008629642?w=1678&amp;h=1558" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">总结</h2>
<p>希望在看完这篇教程后能够对你在RESTful Api开发上有所启发，小生才疏学浅，过程中有什么不足的地方也欢迎指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js+MongoDB对于RestfulApi中用户token认证实践

## 原文链接
[https://segmentfault.com/a/1190000008629632](https://segmentfault.com/a/1190000008629632)

