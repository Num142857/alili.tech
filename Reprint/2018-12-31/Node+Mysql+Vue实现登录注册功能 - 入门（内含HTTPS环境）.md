---
title: 'Node+Mysql+Vue实现登录注册功能 - 入门（内含HTTPS环境）' 
date: 2018-12-31 2:30:29
hidden: true
slug: n61c3wcn5wo
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><strong>写在前面</strong></h3>
<p>很多前端小伙伴都尝试着使用<code>vue</code>构建前端项目时，使用的数据都是<code>假数据</code>，但是注册登录功能很难使用假数据进行测试，这篇文章就手把手教你如何使用<code>node</code>做后端，<code>mysql</code>做数据库实现登录注册功能。本文基于<a href="http://blog.csdn.net/yuanyuanispeak/article/details/73530628" rel="nofollow noreferrer" target="_blank">vue-cli入门(四)——vue-resource登录注册实现</a>和<a href="https://segmentfault.com/a/1190000008176208">Vue+MySQL+Express小试牛刀</a>进行拓展。</p>
<h3 id="articleHeader1"><strong> Mysql配置</strong></h3>
<p><span class="img-wrap"><img data-src="/img/bVVwqF?w=681&amp;h=437" src="https://static.alili.tech/img/bVVwqF?w=681&amp;h=437" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>对于没有接触过数据库的小伙伴，我推荐下载<code>XAMPP</code><br>这个比较轻量级，简单易用。具体步骤如下</p>
<ol>
<li>列表项目</li>
<li>创建数据库</li>
<li>进入xampp - mysql - bin - mysql.exe</li>
<li>
<p>输入以下命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use test;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">use</span> <span class="hljs-keyword">test</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create table user(  
id int not null primary key auto_increment,  
username varchar(100) not null,  
password varchar(100) not null   
)ENGINE=InnoDB DEFAULT CHARSET=utf8;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">create</span> <span class="hljs-keyword">table</span> <span class="hljs-keyword">user</span>(  
<span class="hljs-keyword">id</span> <span class="hljs-built_in">int</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">null</span> primary <span class="hljs-keyword">key</span> auto_increment,  
username <span class="hljs-built_in">varchar</span>(<span class="hljs-number">100</span>) <span class="hljs-keyword">not</span> <span class="hljs-literal">null</span>,  
<span class="hljs-keyword">password</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">100</span>) <span class="hljs-keyword">not</span> <span class="hljs-literal">null</span>   
)<span class="hljs-keyword">ENGINE</span>=<span class="hljs-keyword">InnoDB</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=utf8;  </code></pre>
</li>
<li>之后点击xampp的<code>Admin</code>，你会发现在test下有个user表，这样你就已经建好数据库了</li>
</ol>
<h3 id="articleHeader2"><strong> Node 文件</strong></h3>
<p>在根文件夹下新建一个server文件，<br>文件结构如图</p>
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
<span class="hljs-string">|-- static</span>
<span class="hljs-string">|-- .babelrc</span>
<span class="hljs-string">|-- .editorconfig</span>
<span class="hljs-string">|-- .gitignore</span>
<span class="hljs-string">|-- index.html</span>
<span class="hljs-string">|-- package.json</span>
<span class="hljs-string">|-- README.md</span></code></pre>
<p><code>db.js</code>----用来添加mysql配置和<code>index.js</code>----Express服务器入口文件都不需要更改<br><a href="https://segmentfault.com/a/1190000008176208#articleHeader1" target="_blank">原代码</a></p>
<p>sqlMap.js----SQL语句映射文件，以供api逻辑调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sqlMap = {
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        select_name: 'SELECT * from user where username = ?',    //查询 username
        select_password: 'SELECT * from user where password = ?'      //查询 password
    }
}
module.exports = sqlMap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sqlMap = {
    <span class="hljs-attr">user</span>: {
        <span class="hljs-attr">add</span>: <span class="hljs-string">'insert into user( username, password) values ( ?, ?)'</span>,
        <span class="hljs-attr">select_name</span>: <span class="hljs-string">'SELECT * from user where username = ?'</span>,    <span class="hljs-comment">//查询 username</span>
        select_password: <span class="hljs-string">'SELECT * from user where password = ?'</span>      <span class="hljs-comment">//查询 password</span>
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
        res.send('err')
    } else {
        //res.json(ret);
        res.send('ok')
    }
};
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql_name = $sql.user.select_name
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql_name,params.username,function(err,result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            conn.query(sql,[params.username,params.password], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    jsonWrite(res, result)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
    
});

//查找用户接口
router.post('/selectUser', (req,res) => {
    var sql_name = $sql.user.select_name;
    var sql_password = $sql.user.select_password;
    var params = req.body;
    conn.query(sql_name,params.username,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            res.send('-1')    //查询不出username，data返回-1
        }else {
            conn.query(sql_password,params.password, function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result[0]===undefined) {
                    res.send('0')    //username正确后，password错误，data返回 0
                }else {
                    jsonWrite(res, result);
                }
            })
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
        res.send(<span class="hljs-string">'err'</span>)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//res.json(ret);</span>
        res.send(<span class="hljs-string">'ok'</span>)
    }
};
<span class="hljs-comment">// 增加用户接口</span>
router.post(<span class="hljs-string">'/addUser'</span>, (req, res) =&gt; {
    <span class="hljs-keyword">var</span> sql_name = $sql.user.select_name
    <span class="hljs-keyword">var</span> sql = $sql.user.add;
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    conn.query(sql_name,params.username,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,result</span>) </span>{
        <span class="hljs-keyword">if</span>(err) {
            <span class="hljs-built_in">console</span>.log(err)
        }
        <span class="hljs-keyword">if</span>(result[<span class="hljs-number">0</span>]===<span class="hljs-literal">undefined</span>) {
            conn.query(sql,[params.username,params.password], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
                <span class="hljs-keyword">if</span>(err) {
                    <span class="hljs-built_in">console</span>.log(err)
                }
                <span class="hljs-keyword">if</span>(result) {
                    jsonWrite(res, result)
                }
            })
        }<span class="hljs-keyword">else</span> {
            res.send(<span class="hljs-string">'-1'</span>)    <span class="hljs-comment">//当前注册username与数据库重复时，data返回-1</span>
        }
    })
    
});

<span class="hljs-comment">//查找用户接口</span>
router.post(<span class="hljs-string">'/selectUser'</span>, (req,res) =&gt; {
    <span class="hljs-keyword">var</span> sql_name = $sql.user.select_name;
    <span class="hljs-keyword">var</span> sql_password = $sql.user.select_password;
    <span class="hljs-keyword">var</span> params = req.body;
    conn.query(sql_name,params.username,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span>(err) {
            <span class="hljs-built_in">console</span>.log(err)
        }
        <span class="hljs-keyword">if</span>(result[<span class="hljs-number">0</span>]===<span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">'-1'</span>)    <span class="hljs-comment">//查询不出username，data返回-1</span>
        }<span class="hljs-keyword">else</span> {
            conn.query(sql_password,params.password, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
                <span class="hljs-keyword">if</span>(err) {
                    <span class="hljs-built_in">console</span>.log(err)
                }
                <span class="hljs-keyword">if</span>(result[<span class="hljs-number">0</span>]===<span class="hljs-literal">undefined</span>) {
                    res.send(<span class="hljs-string">'0'</span>)    <span class="hljs-comment">//username正确后，password错误，data返回 0</span>
                }<span class="hljs-keyword">else</span> {
                    jsonWrite(res, result);
                }
            })
        }
    })
});
<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<h3 id="articleHeader3"><strong> 注册功能 </strong></h3>
<p>Vue-cli login-vue注册功能修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="register(){
            if(this.newUsername == &quot;&quot; || this.newage == &quot;&quot;){
                alert(&quot;请输入用户名或密码&quot;)
            }else{
                let data = {'username':this.newUsername,'age':this.newage}
                this.$http.post('/api/user/addUser',data).then((res)=>{
                    console.log(res)
                    /*接口的传值是(-1,该用户已存在)*/
                    if(res.data == -1) {
                        this.tishi = &quot;该账号已存在&quot;
                        this.showTishi = true
                        this.username = ''
                        this.age = ''
                    }
                    else if(res.status == 200){
                        this.tishi = &quot;注册成功&quot;
                        this.showTishi = true
                        this.username = ''
                        this.age = ''
                         /*注册成功之后再跳回登录页*/
                        setTimeout(function(){
                            this.showRegister = false
                            this.showLogin = true
                            this.showTishi = false
                        }.bind(this),2000)
                    }
                })
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>register(){
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.newUsername == <span class="hljs-string">""</span> || <span class="hljs-keyword">this</span>.newage == <span class="hljs-string">""</span>){
                alert(<span class="hljs-string">"请输入用户名或密码"</span>)
            }<span class="hljs-keyword">else</span>{
                let <span class="hljs-keyword">data</span> = {<span class="hljs-string">'username'</span>:<span class="hljs-keyword">this</span>.newUsername,<span class="hljs-string">'age'</span>:<span class="hljs-keyword">this</span>.newage}
                <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/api/user/addUser'</span>,<span class="hljs-keyword">data</span>).then((res)=&gt;{
                    console.log(res)
                    <span class="hljs-comment">/*接口的传值是(-1,该用户已存在)*/</span>
                    <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span> == <span class="hljs-number">-1</span>) {
                        <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"该账号已存在"</span>
                        <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
                        <span class="hljs-keyword">this</span>.username = <span class="hljs-string">''</span>
                        <span class="hljs-keyword">this</span>.age = <span class="hljs-string">''</span>
                    }
                    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(res.status == <span class="hljs-number">200</span>){
                        <span class="hljs-keyword">this</span>.tishi = <span class="hljs-string">"注册成功"</span>
                        <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">true</span>
                        <span class="hljs-keyword">this</span>.username = <span class="hljs-string">''</span>
                        <span class="hljs-keyword">this</span>.age = <span class="hljs-string">''</span>
                         <span class="hljs-comment">/*注册成功之后再跳回登录页*/</span>
                        setTimeout(function(){
                            <span class="hljs-keyword">this</span>.showRegister = <span class="hljs-literal">false</span>
                            <span class="hljs-keyword">this</span>.showLogin = <span class="hljs-literal">true</span>
                            <span class="hljs-keyword">this</span>.showTishi = <span class="hljs-literal">false</span>
                        }.bind(<span class="hljs-keyword">this</span>),<span class="hljs-number">2000</span>)
                    }
                })
            }
        }</code></pre>
<h3 id="articleHeader4"><strong> 其他</strong></h3>
<h4>设置代理与跨域</h4>
<p><a href="https://segmentfault.com/a/1190000008176208#articleHeader3">原代码</a>是正确的。<br>但是我自己就是代理不成功，google了一下也没有解决办法，<br>返回看评论可以发现他们也一样，但是如果你仔细读评论，就可以找到解决办法：<strong>需要启动express服务器</strong></p>
<blockquote>2017/10/31补充： <br>使用第三方接口时，别人设置跨域限制时，需要利用<strong>反向代理</strong><br>推荐 npm http-proxy-middleware<br>在工作场景中，一般是<a href="https://segmentfault.com/a/1190000011796322" target="_blank">前后端分离</a>，后端给接口完成注册登录功能</blockquote>
<ol>
<li>在server文件夹下shift+右键 ，选择在此打开命令窗口</li>
<li>输入 npm install -g nodemon 回车</li>
<li>下载完成后输出 nodemon index</li>
<li>启动服务器后，才能访问</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVVwFz?w=672&amp;h=439" src="https://static.alili.tech/img/bVVwFz?w=672&amp;h=439" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>我的一个完整项目,欢迎Watch和start!</h4>
<p><a href="https://github.com/1uokun/vue-node-mysql" rel="nofollow noreferrer" target="_blank">仿拉勾网移动端页面</a><br>所以得坑都填完了，本文仅适用于前端没有接触后端的小伙伴。<br>当你读到这里的时候并且自己尝试着做了之后，恭喜你已经入门全栈了。<br>最后，再次感谢<strong><code>海岛心hey</code></strong>和<strong><code>yuanyuanispeak</code></strong></p>
<h4>HTTPS</h4>
<p>代码库更新：添加HTTPS环境支持<br><a href="https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec" rel="nofollow noreferrer" target="_blank">如何在5分钟内让HTTPS在本地开发环境中运行</a><br>具体代码参见<a href="https://github.com/1uokun/vue-node-mysql/commit/295c87f5d121f4c3d6dc4745878d1607ea332516" rel="nofollow noreferrer" target="_blank">commit</a><br>⚠️如果不想搭建https环境请删除指定commit代码</p>
<hr>
<h3 id="articleHeader5">参考</h3>
<ul>
<li>[1] vue-cli入门(四)——vue-resource登录注册实现 <a href="http://blog.csdn.net/yuanyuanispeak/article/details/73530628" rel="nofollow noreferrer" target="_blank">链接1</a>
</li>
<li>[2] Vue+MySQL+Express小试牛刀 <a href="https://segmentfault.com/a/1190000008176208">链接2</a>
</li>
<li>[3] <a href="https://github.com/1uokun/vue-node-mysql/blob/master/server/api/userApi.js" rel="nofollow noreferrer" target="_blank">接口完整代码</a>
</li>
<li>[4] 如何在5分钟内让HTTPS在本地开发环境中运行 <a href="https://juejin.im/post/5a6db896518825732d7fd8e0" rel="nofollow noreferrer" target="_blank">1.中文译文地址</a> <a href="https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec" rel="nofollow noreferrer" target="_blank">2.原地址medium.com</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node+Mysql+Vue实现登录注册功能 - 入门（内含HTTPS环境）

## 原文链接
[https://segmentfault.com/a/1190000011288053](https://segmentfault.com/a/1190000011288053)

