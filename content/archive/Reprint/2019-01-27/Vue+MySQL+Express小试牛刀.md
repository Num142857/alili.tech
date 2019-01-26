---
title: 'Vue+MySQL+Express小试牛刀' 
date: 2019-01-27 2:31:00
hidden: true
slug: 62hk7sdq93k
categories: [reprint]
---

{{< raw >}}

                    
<p>眼睛一闭一睁，到年底了。早就想尝试用js玩儿全栈，最近正好做毕设了，是一个关于资金的管理系统，于是乎，正好用来练练手。一咬牙一跺脚----嗯，就用Vue+MySQL+Express吧。前端用Vue，后端用Express做服务端提供数据接口，数据库用MySQL（由于毕设就要求的是基于SQL数据库）。</p>
<p>说时易，做时难。以前都是单写Vue，数据请求是请求的假数据，而且没有搭建过环境，所以单独用Express的话，也只是用<code>express-generator</code>生成expreess项目，而且前端是基于<code>jade</code>或<code>ejs</code>模板的。思来想去不知道如何将Vue加进去，如果要用Vue并且以组件式开发，则必然要用到<code>webpack</code>编译打包，于是...</p>
<h2 id="articleHeader0">1.用<code>vue-cli</code>脚手架工具创建一个基于webpack的Vue项目</h2>
<p>前提：安装node环境</p>
<p>首先全局安装： <code>npm install -g vue-cli</code>,然后创建一个项目文件夹，进入项目目录执行：<code>vue init webpack my-project</code>(my-project是项目名)。安装完成之后可以执行 <code>npm install</code> 安装依赖，执行 <code>npm run dev</code>进行开发时调试。</p>
<p>安装 <code>vue-resource</code>依赖,一种安装方式先在package.json中对应地方添加，然后执行<code>npm install</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.1.0&quot;,
    &quot;vue-router&quot;: &quot;^2.0.3&quot;,
    &quot;vue-resource&quot;: &quot;^1.0.3&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.1.0"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.0.3"</span>,
    <span class="hljs-attr">"vue-resource"</span>: <span class="hljs-string">"^1.0.3"</span>
  },</code></pre>
<h2 id="articleHeader1">2.添加Express服务端目录。</h2>
<p>前提：电脑安装mysql数据库</p>
<p>在项目根文件夹下创建一个server文件夹。然后里面创建下面三个文件：</p>
<p>db.js----用来添加mysql配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数据库连接配置
module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        port: '3306'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 数据库连接配置</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">mysql</span>: {
        <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
        <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">database</span>: <span class="hljs-string">'test'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-string">'3306'</span>
    }
}</code></pre>
<p>index.js----Express服务器入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node 后端服务器

const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// node 后端服务器</span>

<span class="hljs-keyword">const</span> userApi = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./api/userApi'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({<span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span>}));

<span class="hljs-comment">// 后端api路由</span>
app.use(<span class="hljs-string">'/api/user'</span>, userApi);

<span class="hljs-comment">// 监听端口</span>
app.listen(<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success listen at port:3000......'</span>);</code></pre>
<p>sqlMap.js----SQL语句映射文件，以供api逻辑调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)'
    }
}

module.exports = sqlMap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// sql语句</span>
<span class="hljs-keyword">var</span> sqlMap = {
    <span class="hljs-comment">// 用户</span>
    user: {
        <span class="hljs-attr">add</span>: <span class="hljs-string">'insert into user(id, name, age) values (0, ?, ?)'</span>
    }
}

<span class="hljs-built_in">module</span>.exports = sqlMap;</code></pre>
<p>api/userApi.js ---- 测试用api示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> models = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../db'</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();
<span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);
<span class="hljs-keyword">var</span> $sql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../sqlMap'</span>);

<span class="hljs-comment">// 连接数据库</span>
<span class="hljs-keyword">var</span> conn = mysql.createConnection(models.mysql);

conn.connect();
<span class="hljs-keyword">var</span> jsonWrite = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res, ret</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">'undefined'</span>) {
        res.json({
            <span class="hljs-attr">code</span>: <span class="hljs-string">'1'</span>,
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'操作失败'</span>
        });
    } <span class="hljs-keyword">else</span> {
        res.json(ret);
    }
};

<span class="hljs-comment">// 增加用户接口</span>
router.post(<span class="hljs-string">'/addUser'</span>, (req, res) =&gt; {
    <span class="hljs-keyword">var</span> sql = $sql.user.add;
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    conn.query(sql, [params.username, params.age], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-keyword">if</span> (result) {
            jsonWrite(res, result);
        }
    })
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<p>编写完成之后，就可以在项目根目录下安装依赖<code>npm install express mysql body-parser</code>;</p>
<p>此时在server文件夹下执行<code>node index</code>（这里也可以加载package.json中，然后使用npm执行）看到success listen at port:3000......即服务端启动成功。</p>
<h2 id="articleHeader2">3.编写vue测试文件</h2>
<p>由于这里只是为了测试，所以直接在vue-cli生成的Hello.vue中编写即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <form>
      <input type=&quot;text&quot; name=&quot;username&quot; v-model=&quot;userName&quot;> <br>
      <input type=&quot;text&quot; name=&quot;age&quot; v-model=&quot;age&quot;> <br>
      <a href=&quot;javascript:;&quot; @click=&quot;addUser&quot;>提交</a>
    </form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      age: ''
    }
  },
  methods: {
    addUser() {
      var name = this.userName;
      var age = this.age;
      this.$http.post('/api/user/addUser', {
        username: name,
        age: age
      },{}).then((response) => {
        console.log(response);
      })
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"userName"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"age"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"age"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addUser"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>,
      <span class="hljs-attr">userName</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    addUser() {
      <span class="hljs-keyword">var</span> name = <span class="hljs-keyword">this</span>.userName;
      <span class="hljs-keyword">var</span> age = <span class="hljs-keyword">this</span>.age;
      <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/api/user/addUser'</span>, {
        <span class="hljs-attr">username</span>: name,
        <span class="hljs-attr">age</span>: age
      },{}).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">4.设置代理与跨域</h2>
<p>完成上面3步之后，执行<code>npm run dev</code>，然后输入一组数据，点击保存，你会发现会报一个错误：vue-resource.common.js?e289:1071 POST <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/api/user/addUser 404 (Not Found).<br>这是由于直接访问8080端口，是访问不到的，所以这里需要设置一下代理转发映射.</p>
<p>vue-cli的config文件中有一个<code>proxyTable</code>参数，用来设置地址映射表，可以添加到开发时配置（dev）中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
    // ...
    proxyTable: {
        '/api': {
            target: 'http://127.0.0.1:3000/api/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dev: {
    <span class="hljs-comment">// ...</span>
    proxyTable: {
        <span class="hljs-string">'/api'</span>: {
            <span class="hljs-attr">target</span>: <span class="hljs-string">'http://127.0.0.1:3000/api/'</span>,
            <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">pathRewrite</span>: {
                <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
            }
        }
    },
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>即请求<code>/api</code>时就代表<code>http://127.0.0.1:3000/api/</code>(这里要写ip，不要写localhost)，<br><code>changeOrigin</code>参数接收一个布尔值，如果为<code>true</code>，这样就不会有跨域问题了。</p>
<p>好了，到这里，基本上完成了，可以去添加一个数据试试了。</p>
<p>最终项目目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- build
|-- config
|-- node_modules
|-- server
  |-- api
    |-- userApi.js
  |-- db.js
  |-- index.js
  |-- sqlMap.js
|-- src
  |-- assets
  |-- components
    |-- Hello.vue
  |-- App.vue
|-- static
|-- .babelrc
|-- .editorconfig
|-- .gitignore
|-- index.html
|-- package.json
|-- README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- build</span>
<span class="hljs-string">|-- config</span>
<span class="hljs-string">|-- node_modules</span>
<span class="hljs-string">|-- server</span>
  <span class="hljs-string">|-- api</span>
    <span class="hljs-string">|-- userApi.js</span>
  <span class="hljs-string">|-- db.js</span>
  <span class="hljs-string">|-- index.js</span>
  <span class="hljs-string">|-- sqlMap.js</span>
<span class="hljs-string">|-- src</span>
  <span class="hljs-string">|-- assets</span>
  <span class="hljs-string">|-- components</span>
    <span class="hljs-string">|-- Hello.vue</span>
  <span class="hljs-string">|-- App.vue</span>
<span class="hljs-string">|-- static</span>
<span class="hljs-string">|-- .babelrc</span>
<span class="hljs-string">|-- .editorconfig</span>
<span class="hljs-string">|-- .gitignore</span>
<span class="hljs-string">|-- index.html</span>
<span class="hljs-string">|-- package.json</span>
<span class="hljs-string">|-- README.md</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVItas?w=1181&amp;h=586" src="https://static.alili.tech/img/bVItas?w=1181&amp;h=586" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>终于调通了，这里的项目目录还可以根据项目的实际情况进行模块划分等等。如有问题或其他建议，欢迎交流~<br>博客原文：<a href="http://fehey.com/2017/01/20/vue-mysql-express/" rel="nofollow noreferrer" target="_blank">http://fehey.com/2017/01/20/v...</a></p>
<p>注：建议换用 axios</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue+MySQL+Express小试牛刀

## 原文链接
[https://segmentfault.com/a/1190000008176208](https://segmentfault.com/a/1190000008176208)

