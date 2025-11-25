---
title: 'Node+Express+MySql实现简单增删改查和登录' 
date: 2019-02-14 2:30:37
hidden: true
slug: nh0vxl647ts
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
//链接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'school'
});
connection.connect();
// 创建 application/x-www-form-urlencoded 编码解析(post方法)
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
    res.header(&quot;Access-Control-Allow-Headers&quot;, &quot;X-Requested-With&quot;);
    res.header(&quot;Access-Control-Allow-Methods&quot;, &quot;PUT,POST,GET,DELETE,OPTIONS&quot;);
    res.header(&quot;Content-Type&quot;, &quot;application/json;charset=utf-8&quot;);
    next();
});
//登录
app.post('/login',urlencodedParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `select * from login where username = '${username}' and password = '${password}'`;
    connection.query(sql, function (err, result) {
        console.log(result)
        if (err || result.length == 0) {
            res.status(200),
                res.json(&quot;登陆失败&quot;)
        } else {
            res.status(200),
                res.json(&quot;登陆成功&quot;)
        }
    });
})

//查询
app.get('/query', function (req, res) {
    var sql = 'select * from student';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(result)
    });
});
//修改
app.get('/change', function (req, res) {
    var SNO = req.query.SNO;
    var SNAME = req.query.SNAME;
    var SDEPT = req.query.SDEPT;
    var sql = `update student set SNAME = '${SNAME}',SDEPT = '${SDEPT}' where SNO = '${SNO}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(&quot;修改成功&quot;)
    });
})
//添加
app.get('/add', function (req, res) {
    console.log(req.query)
    var SNO = req.query.SNO;
    var SNAME = req.query.SNAME;
    var SDEPT = req.query.SDEPT;
    var sql = `insert into student values ('${SNO}','${SNAME}','${SDEPT}')`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(&quot;添加成功&quot;)
    });
})
//删除
app.get('/delete', function (req, res) {
    console.log(req.query)
    var SNO = req.query.SNO;
    var sql = `delete from student where SNO='${SNO}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(&quot;删除成功&quot;)
    });
})

// connection.end();

//配置服务端口
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('http://', host, port);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-comment">//链接数据库</span>
<span class="hljs-keyword">var</span> connection = mysql.createConnection({
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
    <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">'123456'</span>,
    <span class="hljs-attr">database</span>: <span class="hljs-string">'school'</span>
});
connection.connect();
<span class="hljs-comment">// 创建 application/x-www-form-urlencoded 编码解析(post方法)</span>
<span class="hljs-keyword">var</span> urlencodedParser = bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> })
<span class="hljs-comment">//设置跨域访问</span>
app.all(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
    res.header(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);
    res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"X-Requested-With"</span>);
    res.header(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"PUT,POST,GET,DELETE,OPTIONS"</span>);
    res.header(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json;charset=utf-8"</span>);
    next();
});
<span class="hljs-comment">//登录</span>
app.post(<span class="hljs-string">'/login'</span>,urlencodedParser, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> username = req.body.username;
    <span class="hljs-keyword">var</span> password = req.body.password;
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">`select * from login where username = '<span class="hljs-subst">${username}</span>' and password = '<span class="hljs-subst">${password}</span>'`</span>;
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-built_in">console</span>.log(result)
        <span class="hljs-keyword">if</span> (err || result.length == <span class="hljs-number">0</span>) {
            res.status(<span class="hljs-number">200</span>),
                res.json(<span class="hljs-string">"登陆失败"</span>)
        } <span class="hljs-keyword">else</span> {
            res.status(<span class="hljs-number">200</span>),
                res.json(<span class="hljs-string">"登陆成功"</span>)
        }
    });
})

<span class="hljs-comment">//查询</span>
app.get(<span class="hljs-string">'/query'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'select * from student'</span>;
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err:'</span>, err.message);
        }
        <span class="hljs-built_in">console</span>.log(result);
        res.status(<span class="hljs-number">200</span>),
            res.json(result)
    });
});
<span class="hljs-comment">//修改</span>
app.get(<span class="hljs-string">'/change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> SNO = req.query.SNO;
    <span class="hljs-keyword">var</span> SNAME = req.query.SNAME;
    <span class="hljs-keyword">var</span> SDEPT = req.query.SDEPT;
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">`update student set SNAME = '<span class="hljs-subst">${SNAME}</span>',SDEPT = '<span class="hljs-subst">${SDEPT}</span>' where SNO = '<span class="hljs-subst">${SNO}</span>'`</span>;
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err:'</span>, err.message);
        }
        <span class="hljs-built_in">console</span>.log(result);
        res.status(<span class="hljs-number">200</span>),
            res.json(<span class="hljs-string">"修改成功"</span>)
    });
})
<span class="hljs-comment">//添加</span>
app.get(<span class="hljs-string">'/add'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(req.query)
    <span class="hljs-keyword">var</span> SNO = req.query.SNO;
    <span class="hljs-keyword">var</span> SNAME = req.query.SNAME;
    <span class="hljs-keyword">var</span> SDEPT = req.query.SDEPT;
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">`insert into student values ('<span class="hljs-subst">${SNO}</span>','<span class="hljs-subst">${SNAME}</span>','<span class="hljs-subst">${SDEPT}</span>')`</span>;
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err:'</span>, err.message);
        }
        <span class="hljs-built_in">console</span>.log(result);
        res.status(<span class="hljs-number">200</span>),
            res.json(<span class="hljs-string">"添加成功"</span>)
    });
})
<span class="hljs-comment">//删除</span>
app.get(<span class="hljs-string">'/delete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(req.query)
    <span class="hljs-keyword">var</span> SNO = req.query.SNO;
    <span class="hljs-keyword">var</span> sql = <span class="hljs-string">`delete from student where SNO='<span class="hljs-subst">${SNO}</span>'`</span>;
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err:'</span>, err.message);
        }
        <span class="hljs-built_in">console</span>.log(result);
        res.status(<span class="hljs-number">200</span>),
            res.json(<span class="hljs-string">"删除成功"</span>)
    });
})

<span class="hljs-comment">// connection.end();</span>

<span class="hljs-comment">//配置服务端口</span>
<span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> host = server.address().address;
    <span class="hljs-keyword">var</span> port = server.address().port;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'http://'</span>, host, port);
})</code></pre>
<p>github：<a href="https://github.com/Rossy11/node/blob/master/app.js" rel="nofollow noreferrer" target="_blank">https://github.com/Rossy11/no...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node+Express+MySql实现简单增删改查和登录

## 原文链接
[https://segmentfault.com/a/1190000016814579](https://segmentfault.com/a/1190000016814579)

