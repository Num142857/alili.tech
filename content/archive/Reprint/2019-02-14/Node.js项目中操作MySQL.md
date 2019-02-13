---
title: 'Node.js项目中操作MySQL' 
date: 2019-02-14 2:30:37
hidden: true
slug: uly0bmoktqk
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835739?w=1053&amp;h=586" src="https://static.alili.tech/img/remote/1460000016835739?w=1053&amp;h=586" alt="node+mysql" title="node+mysql" style="cursor: pointer; display: inline;"></span></p>
<p>本文是一篇使用<code>mysql</code>这个npm模块操作MySQL数据库的基础教程。 不涉及MySQL的安装和配置，如果电脑中还未安装MySQL, 推荐安装<a href="http://www.wampserver.com/en/" rel="nofollow noreferrer" target="_blank">WAMP</a>、<a href="https://www.apachefriends.org/index.html" rel="nofollow noreferrer" target="_blank">XAMPP</a>等集成环境。本文中还使用到了轻量级的Node.js框架<a href="https://koa.bootcss.com/" rel="nofollow noreferrer" target="_blank">Koa</a>搭建web程序，为的是通过前端浏览器请求的方式来模拟项目场景，你无需掌握Koa框架的语法也是可以轻松阅读本文的。</p>
<h3 id="articleHeader0">初始化项目</h3>
<p>创建项目目录，并使用<code>npm init</code>初始化项目后，执行下面操作：</p>
<h4>安装依赖</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mysql koa koa-router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> mysql koa koa-router</code></pre>
<h4>创建index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');

const app = new Koa();
const router = new Router();

const connection = mysql.createConnection({
  host: 'localhost', // 填写你的mysql host
  user: 'root', // 填写你的mysql用户名
  password: '123456' // 填写你的mysql密码
})

connection.connect(err => {
  if(err) throw err;
  console.log('mysql connncted success!');
})

router.get('/', ctx => {
  ctx.body = 'Visit index';
})
app.use(router.routes());

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>

<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>);
<span class="hljs-keyword">const</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router();

<span class="hljs-keyword">const</span> connection = mysql.createConnection({
  <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>, <span class="hljs-comment">// 填写你的mysql host</span>
  user: <span class="hljs-string">'root'</span>, <span class="hljs-comment">// 填写你的mysql用户名</span>
  password: <span class="hljs-string">'123456'</span> <span class="hljs-comment">// 填写你的mysql密码</span>
})

connection.connect(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> err;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mysql connncted success!'</span>);
})

router.get(<span class="hljs-string">'/'</span>, ctx =&gt; {
  ctx.body = <span class="hljs-string">'Visit index'</span>;
})
app.use(router.routes());

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>在shell中执行<code>node index.js</code>，当看到shell中打印出<code>mysql connected success!</code>，表明MySQL数据库连接成功。<br><span class="img-wrap"><img data-src="/img/remote/1460000016835740?w=566&amp;h=360" src="https://static.alili.tech/img/remote/1460000016835740?w=566&amp;h=360" alt="" title="" style="cursor: pointer;"></span></p>
<p>打开浏览器, 访问<code>localhost:3000</code>，当看到屏幕显示<code>Visit index</code>时，表名项目初始化成功。<br><span class="img-wrap"><img data-src="/img/remote/1460000016835741?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835741?w=616&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">数据库操作</h3>
<h4>创建数据库</h4>
<p>当访问<code>/createdb</code>时，创建一个<code>mysqlkoa</code>的数据库，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/createdb', ctx => {
  return new Promise(resolve => {
    const sql = `CREATE DATABASE mysqlkoa`;

    connection.query(sql, (err) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `create database mysqlkoa success!`
      }
      resolve();
    });
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/createdb'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`CREATE DATABASE mysqlkoa`</span>;

    connection.query(sql, (err) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`create database mysqlkoa success!`</span>
      }
      resolve();
    });
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>localhost:3000/createdb</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835742" src="https://static.alili.tech/img/remote/1460000016835742" alt="" title="" style="cursor: pointer;"></span></p>
<h4>创建数据表</h4>
<p>为了方便，我们直接在连接时使用刚才创建的数据库，需要在<code>mysql.createConnection</code>中添加<code>database:mysqlkoa</code>的配置项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mysqlkoa' // 添加该列
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> connection = mysql.createConnection({
  <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
  <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">'123456'</span>,
  <span class="hljs-attr">database</span>: <span class="hljs-string">'mysqlkoa'</span> <span class="hljs-comment">// 添加该列</span>
})</code></pre>
<p>当访问<code>/createtable</code>时，我们创建一个数据表<code>fe_frame</code>，该表用来保存前端框架的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/createtable', ctx => {
  return new Promise(resolve => {
    const sql = `CREATE TABLE fe_frame(
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      author VARCHAR(255)
    )`;
    connection.query(sql, (err ,results, filelds) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `create table of fe_frame success!`
      }
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/createtable'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`CREATE TABLE fe_frame(
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      author VARCHAR(255)
    )`</span>;
    connection.query(sql, (err ,results, filelds) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`create table of fe_frame success!`</span>
      }
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>localhost:3000/createtable</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835743?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835743?w=616&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h4>插入数据</h4>
<h5>插入单条数据</h5>
<p>当访问<code>/insert</code>时，用来插入单条数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/insert', ctx => {
  return new Promise(resolve => {
    const sql = `INSERT INTO fe_frame(name, author)
    VALUES('vue', 'Evan')`;
    connection.query(sql, (err) => {
      if (err) throw err;
      ctx.body = {
        cde: 200,
        msg: `insert data to fe_frame success!`
      }
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/insert'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`INSERT INTO fe_frame(name, author)
    VALUES('vue', 'Evan')`</span>;
    connection.query(sql, (err) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">cde</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`insert data to fe_frame success!`</span>
      }
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>localhost:3000/insert</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835744?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835744?w=616&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h4>插入多条数据</h4>
<p>当访问<code>/insertmulti</code>时，用来插入多条数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/insertmulti', ctx => {
  return new Promise(resolve => {
    const sql = `INSERT INTO fe_frame(name, author)
    VALUES ?`;
    const values = [
      ['React', 'Facebook'],
      ['Angular', 'Google'],
      ['jQuery', 'John Resig']
    ];
    connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `insert ${result.affectedRows} data to fe_frame success!`        
      }
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/insertmulti'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`INSERT INTO fe_frame(name, author)
    VALUES ?`</span>;
    <span class="hljs-keyword">const</span> values = [
      [<span class="hljs-string">'React'</span>, <span class="hljs-string">'Facebook'</span>],
      [<span class="hljs-string">'Angular'</span>, <span class="hljs-string">'Google'</span>],
      [<span class="hljs-string">'jQuery'</span>, <span class="hljs-string">'John Resig'</span>]
    ];
    connection.query(sql, [values], (err, result) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`insert <span class="hljs-subst">${result.affectedRows}</span> data to fe_frame success!`</span>        
      }
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>localhost:3000/insertmulti</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835745?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835745?w=616&amp;h=386" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>使用phpMyAdmin访问，可以看到此时<code>mysqlkoa</code>表如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835746?w=739&amp;h=471" src="https://static.alili.tech/img/remote/1460000016835746?w=739&amp;h=471" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>删除数据</h4>
<p>当访问<code>/delete</code>时，删除相应行。我们使用请求参数<code>name</code>来指定删除哪个框架，在服务器端使用<code>ctx.query.name</code>获取，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/delete', ctx => {
  return new Promise(resolve => {
    const name = ctx.query.name;
    const sql = `DELETE FROM fe_frame WHERE name = '${name}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `delete ${result.affectedRows} data from fe_frame success!`
      };
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/delete'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> name = ctx.query.name;
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`DELETE FROM fe_frame WHERE name = '<span class="hljs-subst">${name}</span>'`</span>;
    connection.query(sql, (err, result) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`delete <span class="hljs-subst">${result.affectedRows}</span> data from fe_frame success!`</span>
      };
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>http://localhost:3000/delete?name=jQuery</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835747?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835747?w=616&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h4>修改数据</h4>
<p>当访问<code>/update</code>时，更新<code>vue</code>框架的作者名为<code>Evan You</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/update', ctx => {
  return new Promise(resolve => {
    const sql =  `UPDATE fe_frame SET author = 'Evan You' WHERE NAME = 'vue'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `update ${result.affectedRows} data from fe_frame success!`
      };
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/update'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> sql =  <span class="hljs-string">`UPDATE fe_frame SET author = 'Evan You' WHERE NAME = 'vue'`</span>;
    connection.query(sql, (err, result) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">`update <span class="hljs-subst">${result.affectedRows}</span> data from fe_frame success!`</span>
      };
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>http://localhost:3000/update</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835748?w=616&amp;h=386" src="https://static.alili.tech/img/remote/1460000016835748?w=616&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h4>查找数据</h4>
<p>当访问<code>/select</code>时，获取满足请求参数中框架名条件的项，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/select', ctx => {
  return new Promise(resolve => {
    let name = ctx.query.name;
    const sql = `SELECT * FROM fe_frame WHERE name = '${name}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">'/select'</span>, ctx =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> name = ctx.query.name;
    <span class="hljs-keyword">const</span> sql = <span class="hljs-string">`SELECT * FROM fe_frame WHERE name = '<span class="hljs-subst">${name}</span>'`</span>;
    connection.query(sql, (err, result) =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      ctx.body = {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">data</span>: result
      }
      resolve();
    })
  })
})</code></pre>
<p>重新执行<code>node index.js</code>，并使用浏览器访问<code>http://localhost:3000/select?name=vue</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016835749" src="https://static.alili.tech/img/remote/1460000016835749" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<blockquote>mysql文档地址： <a href="https://www.npmjs.com/package/mysql" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js项目中操作MySQL

## 原文链接
[https://segmentfault.com/a/1190000016835736](https://segmentfault.com/a/1190000016835736)

