---
title: '借助node.js + mysql 学习基础ajax~' 
date: 2019-02-15 2:30:44
hidden: true
slug: mv8nyxmomno
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">很多小白不知道ajax怎么学，所以就弄了个node后台模拟下基本的ajax请求。</h2>
<p>环境要求是安装node~</p>
<p>先上linkMysql.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //自己数据库的密码
  database: ''//自己数据库的名称
})

function LinkMysql(tableName, key, value) {
  connection.connect()
  var data = ''
  var sql = 'SELECT * FROM ' + tableName +' where ' + key + '=' + value
  console.log(sql)
  return new Promise(function(resolve,reject) {
    connection.query(sql, function(err, result) {
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');  
      resolve(result)
    })
  })
}

function cutMysql() {
  connection.end();
}

module.exports = {
  cutMysql,
  LinkMysql
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>)
<span class="hljs-keyword">var</span> connection = mysql.createConnection({
  <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
  <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">//自己数据库的密码</span>
  database: <span class="hljs-string">''</span><span class="hljs-comment">//自己数据库的名称</span>
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LinkMysql</span>(<span class="hljs-params">tableName, key, value</span>) </span>{
  connection.connect()
  <span class="hljs-keyword">var</span> data = <span class="hljs-string">''</span>
  <span class="hljs-keyword">var</span> sql = <span class="hljs-string">'SELECT * FROM '</span> + tableName +<span class="hljs-string">' where '</span> + key + <span class="hljs-string">'='</span> + value
  <span class="hljs-built_in">console</span>.log(sql)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>) </span>{
    connection.query(sql, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'--------------------------SELECT----------------------------'</span>);
      <span class="hljs-built_in">console</span>.log(result);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------------------------------------------------------------\n\n'</span>);  
      resolve(result)
    })
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cutMysql</span>(<span class="hljs-params"></span>) </span>{
  connection.end();
}

<span class="hljs-built_in">module</span>.exports = {
  cutMysql,
  LinkMysql
}</code></pre>
<p>主JS server.js,提供连接maysql和不连接mysql两种版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http')
var url = require('url');
var util = require('util');
var sqlFunc = require('./linkMysql.js');

// 不连接数据库操作
// var tempJson = [{
//   name: '巧克力',
//   price: 10
// },{
//   name: '薯条',
//   price: 20
// }]

http.createServer(function(req, res) {
  // 跨域处理
  res.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;); 
  res.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;X-Requested-With&quot;);
  res.setHeader(&quot;Access-Control-Allow-Methods&quot;,&quot;PUT,POST,GET,DELETE,OPTIONS&quot;);
  res.setHeader(&quot;X-Powered-By&quot;,' 3.2.1');
  res.setHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);

  var reqUrl = req.url
  var mainPath = reqUrl.split('?')[0]
  var reqData = reqUrl.split('?')[1].split('=')

  if (mainPath == '/test') {
    sqlFunc.LinkMysql('goods_info', reqData[0], JSON.stringify(decodeURIComponent(reqData[1]))).then(function(val) {
      console.log('从数据库获取数据' + val)
      sqlFunc.cutMysql();

      res.writeHead(200, {'content-Type': 'text/plain; charset=utf-8'});
      res.end(JSON.stringify(val));
    })
    // 不连接数据库操作
    // res.writeHead(200, {'content-Type': 'text/plain; charset=utf-8'});
    // res.end(JSON.stringify(tempJson));
  } else {
    res.writeHead(404, {'content-Type': 'text/plain; charset=utf-8'});
  }
  

}).listen(3000);

console.log('Server running at http://localhost:3000');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-keyword">var</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);
<span class="hljs-keyword">var</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>);
<span class="hljs-keyword">var</span> sqlFunc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./linkMysql.js'</span>);

<span class="hljs-comment">// 不连接数据库操作</span>
<span class="hljs-comment">// var tempJson = [{</span>
<span class="hljs-comment">//   name: '巧克力',</span>
<span class="hljs-comment">//   price: 10</span>
<span class="hljs-comment">// },{</span>
<span class="hljs-comment">//   name: '薯条',</span>
<span class="hljs-comment">//   price: 20</span>
<span class="hljs-comment">// }]</span>

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-comment">// 跨域处理</span>
  res.setHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>); 
  res.setHeader(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"X-Requested-With"</span>);
  res.setHeader(<span class="hljs-string">"Access-Control-Allow-Methods"</span>,<span class="hljs-string">"PUT,POST,GET,DELETE,OPTIONS"</span>);
  res.setHeader(<span class="hljs-string">"X-Powered-By"</span>,<span class="hljs-string">' 3.2.1'</span>);
  res.setHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json"</span>);

  <span class="hljs-keyword">var</span> reqUrl = req.url
  <span class="hljs-keyword">var</span> mainPath = reqUrl.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">var</span> reqData = reqUrl.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>].split(<span class="hljs-string">'='</span>)

  <span class="hljs-keyword">if</span> (mainPath == <span class="hljs-string">'/test'</span>) {
    sqlFunc.LinkMysql(<span class="hljs-string">'goods_info'</span>, reqData[<span class="hljs-number">0</span>], <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">decodeURIComponent</span>(reqData[<span class="hljs-number">1</span>]))).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'从数据库获取数据'</span> + val)
      sqlFunc.cutMysql();

      res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'content-Type'</span>: <span class="hljs-string">'text/plain; charset=utf-8'</span>});
      res.end(<span class="hljs-built_in">JSON</span>.stringify(val));
    })
    <span class="hljs-comment">// 不连接数据库操作</span>
    <span class="hljs-comment">// res.writeHead(200, {'content-Type': 'text/plain; charset=utf-8'});</span>
    <span class="hljs-comment">// res.end(JSON.stringify(tempJson));</span>
  } <span class="hljs-keyword">else</span> {
    res.writeHead(<span class="hljs-number">404</span>, {<span class="hljs-string">'content-Type'</span>: <span class="hljs-string">'text/plain; charset=utf-8'</span>});
  }
  

}).listen(<span class="hljs-number">3000</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server running at http://localhost:3000'</span>);</code></pre>
<p>最后就是前端html页面了~test.html,用了原生写法，具体的就不讲了百度一大堆~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Document</title>
</head>
<body>
  <div>数据请求</div>
  <div class=&quot;box&quot;>

  </div>
  <script>
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status == 304) {
          console.log(xhr.responseText)
          var data = JSON.parse(xhr.responseText)
          var str = ''
          for(var i = 0; i < data.length; i ++) {
            str += &quot;<div>name: &quot; + data[i].name + &quot;</div><div>price: &quot; + data[i].price + &quot;</div>&quot;
          }
          document.querySelector('.box').innerHTML = str
        } else {
          console.log(&quot;Request was unsuccessful: &quot; + xhr.status)
        }
      }
    }

    xhr.open('get', 'http://localhost:3000/test?name=巧克力', true)
    xhr.send(null)
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>数据请求<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()

    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span>) {
          <span class="hljs-built_in">console</span>.log(xhr.responseText)
          <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText)
          <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i ++) {
            str += <span class="hljs-string">"&lt;div&gt;name: "</span> + data[i].name + <span class="hljs-string">"&lt;/div&gt;&lt;div&gt;price: "</span> + data[i].price + <span class="hljs-string">"&lt;/div&gt;"</span>
          }
          <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>).innerHTML = str
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Request was unsuccessful: "</span> + xhr.status)
        }
      }
    }

    xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'http://localhost:3000/test?name=巧克力'</span>, <span class="hljs-literal">true</span>)
    xhr.send(<span class="hljs-literal">null</span>)
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>命令行输入<br>node server.js 启动服务  刷新test.html页面就能拿到数据了~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
借助node.js + mysql 学习基础ajax~

## 原文链接
[https://segmentfault.com/a/1190000016700988](https://segmentfault.com/a/1190000016700988)

