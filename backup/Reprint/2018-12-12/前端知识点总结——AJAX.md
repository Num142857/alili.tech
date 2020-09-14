---
title: '前端知识点总结——AJAX' 
date: 2018-12-12 2:30:10
hidden: true
slug: mflq6cez84d
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——Ajax</strong></h1>
<h2 id="articleHeader1">1.ajax</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.URL的作用
  用于表示任意一个资源的位置（互联网上）

2.详解
  格式：
  <scheme>://<user>:<pwd>@<host>:<port>/<path>;<params>?<query>#<frag>
  scheme:方案\协议，以哪种方式到服务获取资源，协议不区分大小写，
  常见的协议：http,https,ftp
  ssh:安全的远程登录
  SMTP:邮件传输
  POP3：邮件接收
  DNS：域名解析
  TELNET:远程登录
  host:主机名，服务器主机名或IP地址或域名（由DNS转换为IP地址） 127.0.0.1=localhost 
  port:端口号 80 443
  user:用户名，访问某些特定资源时需要用到的信息
  pwd:密码，访问某些特定资源时需要用到的密码
  path:路径，资源在服务器上具体存放位置
  params:参数（跟服务器有关）
  query:查询字符串，要传递给服务器的数据
  http://127.0.0.1/login.php?uname=dangdang&amp;upwd=12345
  frag:锚点
  http://127.0.0.1/a.html#NO1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-number">1.U</span>RL的作用
  用于表示任意一个资源的位置（互联网上）

<span class="hljs-number">2.</span>详解
  格式：
  <span class="hljs-params">&lt;scheme&gt;</span>:<span class="hljs-comment">//&lt;user&gt;:&lt;pwd&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;;&lt;params&gt;?&lt;query&gt;#&lt;frag&gt;</span>
<span class="hljs-symbol">  scheme:</span>方案\协议，以哪种方式到服务获取资源，协议不区分大小写，
  常见的协议：http,https,ftp
<span class="hljs-symbol">  ssh:</span>安全的远程登录
<span class="hljs-symbol">  SMTP:</span>邮件传输
  POP3：邮件接收
  DNS：域名解析
<span class="hljs-symbol">  TELNET:</span>远程登录
<span class="hljs-symbol">  host:</span>主机名，服务器主机名或IP地址或域名（由DNS转换为IP地址） <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>=localhost 
<span class="hljs-symbol">  port:</span>端口号 <span class="hljs-number">80</span> <span class="hljs-number">443</span>
<span class="hljs-symbol">  user:</span>用户名，访问某些特定资源时需要用到的信息
<span class="hljs-symbol">  pwd:</span>密码，访问某些特定资源时需要用到的密码
<span class="hljs-symbol">  path:</span>路径，资源在服务器上具体存放位置
<span class="hljs-symbol">  params:</span>参数（跟服务器有关）
<span class="hljs-symbol">  query:</span>查询字符串，要传递给服务器的数据
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//127.0.0.1/login.php?uname=dangdang&amp;upwd=12345</span>
<span class="hljs-symbol">  frag:</span>锚点
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//127.0.0.1/a.html#NO1</span>
</code></pre>
<h2 id="articleHeader2">2.HTTP协议</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是HTTP 
  Hyper Text Transfer Protocol:超文本传输协议
  规范了数据如何打包以及传递

2.详解
  1.请求（request）消息
    客户端带给服务器的数据都有哪些，由三部分组成
  1.请求的起始行
    1.请求方法
      1.GET
        表示客户端向服务器获取资源时使用
        特点：
       1.无请求主体
       2.靠地址栏传递查询字符串
      2.POST
        表示想传递数据给服务器时使用
    特点：
       1.有请求主体
      3.PUT
        表示客户端想放置文件到服务器（禁用）
      4.DELETE
        表示客户端要删除服务器端的数据（禁用）
      5.HEAD
        表示客户端只想获取指定的响应头
      6.CONNECT
        测试连接
      7.TRACE
        追踪请求路径
      8.OPTIONS
        选项，保留以后使用
    2.请求URL
    3.协议版本：HTTP/1.1
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.什么是HTTP 
  Hyper Text Transfer Protocol:超文本传输协议
  规范了数据如何打包以及传递

<span class="hljs-number">2</span>.详解
  <span class="hljs-number">1</span>.请求（request）消息
    客户端带给服务器的数据都有哪些，由三部分组成
  <span class="hljs-number">1</span>.请求的起始行
    <span class="hljs-number">1</span>.请求方法
      <span class="hljs-number">1</span><span class="hljs-selector-class">.GET</span>
        表示客户端向服务器获取资源时使用
        特点：
       <span class="hljs-number">1</span>.无请求主体
       <span class="hljs-number">2</span>.靠地址栏传递查询字符串
      <span class="hljs-number">2</span><span class="hljs-selector-class">.POST</span>
        表示想传递数据给服务器时使用
    特点：
       <span class="hljs-number">1</span>.有请求主体
      <span class="hljs-number">3</span><span class="hljs-selector-class">.PUT</span>
        表示客户端想放置文件到服务器（禁用）
      <span class="hljs-number">4</span><span class="hljs-selector-class">.DELETE</span>
        表示客户端要删除服务器端的数据（禁用）
      <span class="hljs-number">5</span><span class="hljs-selector-class">.HEAD</span>
        表示客户端只想获取指定的响应头
      <span class="hljs-number">6</span><span class="hljs-selector-class">.CONNECT</span>
        测试连接
      <span class="hljs-number">7</span><span class="hljs-selector-class">.TRACE</span>
        追踪请求路径
      <span class="hljs-number">8</span><span class="hljs-selector-class">.OPTIONS</span>
        选项，保留以后使用
    <span class="hljs-number">2</span>.请求URL
    <span class="hljs-number">3</span>.协议版本：HTTP/<span class="hljs-number">1.1</span>
 
</code></pre>
<h2 id="articleHeader3">2.1请求头</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.Host:localhost/127.0.0.1
      作用：告诉浏览器请求哪一个主机
    2.Connection:keep-alive
      作用：告诉服务器要进行持久连接
    3.User-Agent:
      作用：告诉服务器自己（浏览器）的类型
    4.Accept-Language:zh-cn
      作用：告诉服务器自己能接纳的自然语言
    5.Accept-Encoding:gzip
      作用：告诉服务器自己能接收的数据压缩类型是什么
    6.Referer:http:localhost/Day01/login.html
      作用：告诉服务器请求来自哪个页面
      3.请求主体
    Form  Data
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-number">1</span><span class="hljs-selector-class">.Host</span>:localhost/<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>
      作用：告诉浏览器请求哪一个主机
    <span class="hljs-number">2</span><span class="hljs-selector-class">.Connection</span>:keep-alive
      作用：告诉服务器要进行持久连接
    <span class="hljs-number">3</span><span class="hljs-selector-class">.User-Agent</span>:
      作用：告诉服务器自己（浏览器）的类型
    <span class="hljs-number">4</span><span class="hljs-selector-class">.Accept-Language</span>:zh-cn
      作用：告诉服务器自己能接纳的自然语言
    <span class="hljs-number">5</span><span class="hljs-selector-class">.Accept-Encoding</span>:gzip
      作用：告诉服务器自己能接收的数据压缩类型是什么
    <span class="hljs-number">6</span><span class="hljs-selector-class">.Referer</span>:http:localhost/Day01/login<span class="hljs-selector-class">.html</span>
      作用：告诉服务器请求来自哪个页面
      <span class="hljs-number">3</span>.请求主体
    Form  Data
 
</code></pre>
<h2 id="articleHeader4">2.2响应（response）消息</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.响应起始行
  1.协议版本号：HTTP/1.1
  2.响应状态码
    作用：告诉浏览器，服务器的响应状态是什么问题（有问题，没有问题，有问题\问题大概是什么）
    1xx:100-199 提示信息
    2xx:成功响应
        200:ok
    3xx：需要进行重定向
        301：永久性重定向
    302：临时重定向
    304：Not Modified
    4xx:客户端请求错误
        404：Not Found 请求资源不存在
    403：Forbidden 权限不够
    405：Method Not Allowed 请求方法不被允许
    5xx:服务器运行错误
        500：服务器内部错误
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>    <span class="hljs-number">1</span>.响应起始行
  <span class="hljs-number">1</span>.协议版本号：HTTP/<span class="hljs-number">1.1</span>
  <span class="hljs-number">2</span>.响应状态码
    作用：告诉浏览器，服务器的响应状态是什么问题（有问题，没有问题，有问题\问题大概是什么）
    <span class="hljs-number">1</span>xx:<span class="hljs-number">100</span>-<span class="hljs-number">199</span> 提示信息
    <span class="hljs-number">2</span>xx:成功响应
        <span class="hljs-number">200</span>:ok
    <span class="hljs-number">3</span>xx：需要进行重定向
        <span class="hljs-number">301</span>：永久性重定向
    <span class="hljs-number">302</span>：临时重定向
    <span class="hljs-number">304</span>：<span class="hljs-keyword">Not</span> Modified
    <span class="hljs-number">4</span>xx:客户端请求错误
        <span class="hljs-number">404</span>：<span class="hljs-keyword">Not</span> Found 请求资源不存在
    <span class="hljs-number">403</span>：Forbidden 权限不够
    <span class="hljs-number">405</span>：<span class="hljs-function"><span class="hljs-keyword">Method</span> <span class="hljs-title">Not</span> <span class="hljs-title">Allowed</span> 请求方法不被允许
    5<span class="hljs-title">xx</span>:</span>服务器运行错误
        <span class="hljs-number">500</span>：服务器内部错误
  
</code></pre>
<h2 id="articleHeader5">2.3原因短句</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    对状态码的简单解释
    2.响应头
 
     1.Date
    作用：告诉浏览器，服务器的响应时间
          格林尼治时间（+8h）
          
  2.Connection
    作用：告诉浏览器已经启动持久连接
    
  3.Content-Type
    作用：响应主体的类型是什么，告诉浏览器，用什么样的方式解析响应主体
       1.text/html:响应回来的数据是html文本
       2.text/plain:响应回来的数据是普通文本
       3.text/css:响应回来的数据是css样式
       4.application/xml:响应回来的数据是xml格式
       5.application/javascript:响应回来的数据是js脚本代码
       6.application/json:响应回来的数据是json格式的字符串
       7.images/jegp:响应回来的数据是图片
    
    3.响应主体
  Response

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    对状态码的简单解释
    <span class="hljs-number">2</span>.响应头
 
     <span class="hljs-number">1</span><span class="hljs-selector-class">.Date</span>
    作用：告诉浏览器，服务器的响应时间
          格林尼治时间（+<span class="hljs-number">8</span>h）
          
  <span class="hljs-number">2</span><span class="hljs-selector-class">.Connection</span>
    作用：告诉浏览器已经启动持久连接
    
  <span class="hljs-number">3</span><span class="hljs-selector-class">.Content-Type</span>
    作用：响应主体的类型是什么，告诉浏览器，用什么样的方式解析响应主体
       <span class="hljs-number">1</span>.text/<span class="hljs-selector-tag">html</span>:响应回来的数据是html文本
       <span class="hljs-number">2</span>.text/plain:响应回来的数据是普通文本
       <span class="hljs-number">3</span>.text/css:响应回来的数据是css样式
       <span class="hljs-number">4</span>.application/xml:响应回来的数据是xml格式
       <span class="hljs-number">5</span>.application/javascript:响应回来的数据是js脚本代码
       <span class="hljs-number">6</span>.application/json:响应回来的数据是json格式的字符串
       <span class="hljs-number">7</span>.images/jegp:响应回来的数据是图片
    
    <span class="hljs-number">3</span>.响应主体
  Response

</code></pre>
<h2 id="articleHeader6">3.缓存</h2>
<p>1.什么是缓存 &amp; 工作原理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  客户端将服务器响应回来的数据进行自动保存，当再次访问时，直接使用保存的数据。

2.缓存的优点
  1.减少了冗余数据的传输，节省客户端流量
  2.可以节省服务器带宽
  3.降低对服务器资源的消耗和运行要求
  4.降低了由于远距离而造成的延时加载

3.与缓存相关的消息头
  1.Cache-Control消息头
    作用：从服务器将文档传到客户端时起，可以认为此文档处于新鲜的秒数
语法：
   Cache-Control:max-age=处于新鲜的秒数
   ex:
     Cache-Control:max-age=3600;
     Cache-Control:max-age=0;每次都从服务器下载新资源
  2.Expires消息头
    作用：指定缓存过期的确切时间（格林尼治时间）
语法：Expires:Thu,23 Nov 2017    GMT
如果希望客户端不缓存，可以给一个过期的时间
Expires:Wed,22 Nov 2017 00:00:00 GMT
Expires:0;---此方法不标准，执行性不是特别好
4.在网页上设置消息头
  1.更改服务器配置
  2.网页上增加消息
  <meta http-equiv=&quot;消息头&quot; content=&quot;值&quot;>
    ex:
  <meta http-equiv=&quot;Cache-Control&quot; content=&quot;max-age=3600&quot;>
或
  <meta http-equiv=&quot;Expires&quot; content=&quot;0&quot;>
  php:
    header(&quot;Expires:0&quot;);
  Response.AddHeader(&quot;Expires&quot;,&quot;0&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>  客户端将服务器响应回来的数据进行自动保存，当再次访问时，直接使用保存的数据。

<span class="hljs-number">2.</span>缓存的优点
  <span class="hljs-number">1.</span>减少了冗余数据的传输，节省客户端流量
  <span class="hljs-number">2.</span>可以节省服务器带宽
  <span class="hljs-number">3.</span>降低对服务器资源的消耗和运行要求
  <span class="hljs-number">4.</span>降低了由于远距离而造成的延时加载

<span class="hljs-number">3.</span>与缓存相关的消息头
  <span class="hljs-number">1.</span><span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>消息头
    作用：从服务器将文档传到客户端时起，可以认为此文档处于新鲜的秒数
语法：
   <span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>:<span class="hljs-keyword">max</span><span class="hljs-params">-age</span>=处于新鲜的秒数
   ex:
     <span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>:<span class="hljs-keyword">max</span><span class="hljs-params">-age</span>=<span class="hljs-number">3600</span>;
     <span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>:<span class="hljs-keyword">max</span><span class="hljs-params">-age</span>=<span class="hljs-number">0</span>;每次都从服务器下载新资源
  <span class="hljs-number">2.</span>Expires消息头
    作用：指定缓存过期的确切时间（格林尼治时间）
语法：Expires:Thu,<span class="hljs-number">23</span> Nov <span class="hljs-number">2017</span>    GMT
如果希望客户端不缓存，可以给一个过期的时间
Expires:Wed,<span class="hljs-number">22</span> Nov <span class="hljs-number">2017</span> <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span> GMT
Expires:<span class="hljs-number">0</span>;---此方法不标准，执行性不是特别好
<span class="hljs-number">4.</span>在网页上设置消息头
  <span class="hljs-number">1.</span>更改服务器配置
  <span class="hljs-number">2.</span>网页上增加消息
  &lt;meta http<span class="hljs-params">-equiv</span>=<span class="hljs-string">"消息头"</span> content=<span class="hljs-string">"值"</span>&gt;
    ex:
  &lt;meta http<span class="hljs-params">-equiv</span>=<span class="hljs-string">"Cache-Control"</span> content=<span class="hljs-string">"max-age=3600"</span>&gt;
或
  &lt;meta http<span class="hljs-params">-equiv</span>=<span class="hljs-string">"Expires"</span> content=<span class="hljs-string">"0"</span>&gt;
  php:
    <span class="hljs-keyword">header</span>(<span class="hljs-string">"Expires:0"</span>);
  Response.AddHeader(<span class="hljs-string">"Expires"</span>,<span class="hljs-string">"0"</span>);
</code></pre>
<h2 id="articleHeader7">4.AJAX</h2>
<p>1.名词解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.同步（Synchronous）
  在一个任务进行中时，不能开启其它的任务
  同步访问：浏览器在向服务器发送请求的时候，浏览器只能等待服务器的响应，不能做其它的事情。
  出现场合：
     1.地址栏输入网址访问页面（www.baidu.com）
 2.a标记默认跳转
 3.submit按钮的表单提交

2.异步（Asynchronous）
  在一个任务进行中时，可以开启其它的任务
  异步访问：浏览器在向服务器发送请求时，不耽误用户在网页上做其它的操作
  使用场合：
     1.用户名的重复验证
     2.聊天室
 3.股票走势图
 4.搜索框建议（百度，京东）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>同步（Synchronous）
  在一个任务进行中时，不能开启其它的任务
  同步访问：浏览器在向服务器发送请求的时候，浏览器只能等待服务器的响应，不能做其它的事情。
  出现场合：
     <span class="hljs-number">1.</span>地址栏输入网址访问页面（www.baidu.com）
 <span class="hljs-number">2.</span>a标记默认跳转
 <span class="hljs-number">3.</span>submit按钮的表单提交

<span class="hljs-number">2.</span>异步（Asynchronous）
  在一个任务进行中时，可以开启其它的任务
  异步访问：浏览器在向服务器发送请求时，不耽误用户在网页上做其它的操作
  使用场合：
     <span class="hljs-number">1.</span>用户名的重复验证
     <span class="hljs-number">2.</span>聊天室
 <span class="hljs-number">3.</span>股票走势图
 <span class="hljs-number">4.</span>搜索框建议（百度，京东）</code></pre>
<p>2.AJAX</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.Asynchronous Javascript And Xml
  异步的      js         和 xml
2.本质:
   使用js提供的异步对象（XMLHttpRequest）,异步的向服务器发送请求，
   并接受响应数据（数据格式是Xml）
   AJAX请求中，服务器响应回来的数据部分数据而不是完整的页面，
   并且可以以无刷新的效果来更改页面的局部内容。
3.创建XMLHttpRequest对象-异步对象（xhr）
  标准创建：
      var xhr=new XMLHttpRequest();
  IE8以下：
      var xhr=new ActiveXObject(&quot;Microsoft.XMLHttp&quot;);
  允许通过window.XMLHttpRequest 来判断浏览器是否支持标准创建，
  如果浏览器不支持标准创建，那么window.XMLHttpRequest的值就是null
      if(window.XMLHttpRequest){
     var xhr=new XMLHttpRequest();
  }else{
     var xhr=new ActiveXObject(&quot;Microsoft.XMLHttp&quot;);
  }
   
4.XHR常用方法和属性（重点）
  1.open()
    作用：创建请求
语法：xhr.open(method,url,isAsyn);
   1.method
     string类型
     请求方式：get/post
   2.url
     string类型
     请求地址
   3.isAsyn
     boolean类型
     指定采用同步（false）还是异步(true)的方式发送请求

  2.readyState 属性
    作用：表示xhr对象的请求状态
值：0-4表示5个状态
   0：请求尚未初始化
   1：已经打开到服务器的链接，正在发送请求中
   2：请求完成
   3.正在接收服务器端的响应
   4.接收响应数据成功
 注意：当readyState的值为4的时候，才表示所有的响应都已经接收完毕。
  3.status 属性
    作用：表示的是服务器的响应状态码
值：
  记住一个值 ：200
  当status的值是200的时候，表示服务器已经正确的处理请求以及给出响应。
  4.onreadystatechange事件
    作用：当xhr的readyState属性值发生改变的时候，要自动激发的操作
(xhr对象的状态在做一些改变时，这个事件会一直监视着它)
语法：
   onreadystatechange=function(){
//判断xhr的readyState为4并且xhr的status值为200，就可以获取/响应数据了
  if(xhr.readyState==4&amp;&amp;xhr.status==200){
      //接收响应回来的结果
      var resText=xhr.responseText;  
      console.log(resText);
  }

   }
  5.send()
    作用：发送请求
语法：xhr.send(body)
 body:请求主体
 如果没有请求主体，body位置处为null(get)
 如果有请求主体，则放请求主体数据到body位置(post)

 5.发送异步请求的步骤
   1.创建xhr对象
   2.创建请求
   3.设置xhr的onreadystatechange(回调函数)
      判断状态，并接收响应回来的数据
   4.发送请求


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-number">1.</span>Asynchronous Javascript And Xml
  异步的      js         和 xml
<span class="hljs-number">2.</span>本质:
   使用js提供的异步对象（XMLHttpRequest）,异步的向服务器发送请求，
   并接受响应数据（数据格式是Xml）
   AJAX请求中，服务器响应回来的数据部分数据而不是完整的页面，
   并且可以以无刷新的效果来更改页面的局部内容。
<span class="hljs-number">3.</span>创建XMLHttpRequest对象-异步对象（xhr）
  标准创建：
      <span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest();
  IE8以下：
      <span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHttp"</span>);
  允许通过<span class="hljs-built_in">window</span>.XMLHttpRequest 来判断浏览器是否支持标准创建，
  如果浏览器不支持标准创建，那么<span class="hljs-built_in">window</span>.XMLHttpRequest的值就是<span class="hljs-literal">null</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.XMLHttpRequest){
     <span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest();
  }<span class="hljs-keyword">else</span>{
     <span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHttp"</span>);
  }
   
<span class="hljs-number">4.</span>XHR常用方法和属性（重点）
  <span class="hljs-number">1.</span>open()
    作用：创建请求
语法：xhr.open(method,url,isAsyn);
   <span class="hljs-number">1.</span>method
     <span class="hljs-built_in">string</span>类型
     请求方式：<span class="hljs-keyword">get</span>/post
   <span class="hljs-number">2.</span>url
     <span class="hljs-built_in">string</span>类型
     请求地址
   <span class="hljs-number">3.</span>isAsyn
     <span class="hljs-built_in">boolean</span>类型
     指定采用同步（<span class="hljs-literal">false</span>）还是异步(<span class="hljs-literal">true</span>)的方式发送请求

  <span class="hljs-number">2.</span>readyState 属性
    作用：表示xhr对象的请求状态
值：<span class="hljs-number">0</span><span class="hljs-number">-4</span>表示<span class="hljs-number">5</span>个状态
   <span class="hljs-number">0</span>：请求尚未初始化
   <span class="hljs-number">1</span>：已经打开到服务器的链接，正在发送请求中
   <span class="hljs-number">2</span>：请求完成
   <span class="hljs-number">3.</span>正在接收服务器端的响应
   <span class="hljs-number">4.</span>接收响应数据成功
 注意：当readyState的值为<span class="hljs-number">4</span>的时候，才表示所有的响应都已经接收完毕。
  <span class="hljs-number">3.</span>status 属性
    作用：表示的是服务器的响应状态码
值：
  记住一个值 ：<span class="hljs-number">200</span>
  当status的值是<span class="hljs-number">200</span>的时候，表示服务器已经正确的处理请求以及给出响应。
  <span class="hljs-number">4.</span>onreadystatechange事件
    作用：当xhr的readyState属性值发生改变的时候，要自动激发的操作
(xhr对象的状态在做一些改变时，这个事件会一直监视着它)
语法：
   onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-comment">//判断xhr的readyState为4并且xhr的status值为200，就可以获取/响应数据了</span>
  <span class="hljs-keyword">if</span>(xhr.readyState==<span class="hljs-number">4</span>&amp;&amp;xhr.status==<span class="hljs-number">200</span>){
      <span class="hljs-comment">//接收响应回来的结果</span>
      <span class="hljs-keyword">var</span> resText=xhr.responseText;  
      <span class="hljs-built_in">console</span>.log(resText);
  }

   }
  <span class="hljs-number">5.</span>send()
    作用：发送请求
语法：xhr.send(body)
 body:请求主体
 如果没有请求主体，body位置处为<span class="hljs-literal">null</span>(<span class="hljs-keyword">get</span>)
 如果有请求主体，则放请求主体数据到body位置(post)

 <span class="hljs-number">5.</span>发送异步请求的步骤
   <span class="hljs-number">1.</span>创建xhr对象
   <span class="hljs-number">2.</span>创建请求
   <span class="hljs-number">3.</span>设置xhr的onreadystatechange(回调函数)
      判断状态，并接收响应回来的数据
   <span class="hljs-number">4.</span>发送请求


</code></pre>
<h2 id="articleHeader8">5.使用ajax发送post请求</h2>
<p>注意两点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.post的请求将数据放在请求主体中
   xhr.send(body);
   ex:
   xhr.send(&quot;uname=value1&amp;upwd=value2&quot;);
 2.在发送请求之前，需要手动修改请求消息头
   xhr.setRequestHeader(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-selector-tag">1</span><span class="hljs-selector-class">.post</span>的请求将数据放在请求主体中
   <span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.send</span>(body);
   <span class="hljs-selector-tag">ex</span>:
   <span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">"uname=value1&amp;upwd=value2"</span>);
 <span class="hljs-selector-tag">2</span>.在发送请求之前，需要手动修改请求消息头
   <span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);
</code></pre>
<h2 id="articleHeader9">6.js对象数据格式</h2>
<p>1.js对象的数据格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lindaiyu=[];
    lindaiyu[0]=&quot;林黛玉&quot;;
lindaiyu[1]=&quot;1990&quot;;
lindaiyu[2]=&quot;160cm&quot;;
lindaiyu[3]=&quot;50kg&quot;;
改版：
var lindaiyu=[];
    lindaiyu[&quot;name&quot;]=&quot;林黛玉&quot;;
lindaiyu[&quot;birth&quot;]=&quot;1990&quot;;
lindaiyu[&quot;height&quot;]=&quot;160cm&quot;;
lindaiyu[&quot;weight&quot;]=&quot;50kg&quot;;
ex:取值
  lindaiyu[&quot;name&quot;]
数组描述的是林黛玉的个人信息，如果你把林黛玉看成是一个对象，" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var lindaiyu=[];
    lindaiyu[<span class="hljs-number">0</span>]=<span class="hljs-string">"林黛玉"</span>;
lindaiyu[<span class="hljs-number">1</span>]=<span class="hljs-string">"1990"</span>;
lindaiyu[<span class="hljs-number">2</span>]=<span class="hljs-string">"160cm"</span>;
lindaiyu[<span class="hljs-number">3</span>]=<span class="hljs-string">"50kg"</span>;
改版：
var lindaiyu=[];
    lindaiyu[<span class="hljs-string">"name"</span>]=<span class="hljs-string">"林黛玉"</span>;
lindaiyu[<span class="hljs-string">"birth"</span>]=<span class="hljs-string">"1990"</span>;
lindaiyu[<span class="hljs-string">"height"</span>]=<span class="hljs-string">"160cm"</span>;
lindaiyu[<span class="hljs-string">"weight"</span>]=<span class="hljs-string">"50kg"</span>;
ex:取值
  lindaiyu[<span class="hljs-string">"name"</span>]
数组描述的是林黛玉的个人信息，如果你把林黛玉看成是一个对象，</code></pre>
<p>那么她的个人信息就是她这个对象的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="js对象的语法：
    var 对象名={
   属性：值,
   属性：值,
   属性：值,
   属性：值
};
ex:林黛玉这个对象所对应的属性如下
var lindaiyu={
   name:&quot;林黛玉&quot;,
   birth:&quot;1990&quot;,
   height:&quot;160cm&quot;,
   weight:&quot;50kg&quot;,
}
  如果对象取值的时候，直接对象.属性 名称就可以
   ex:lindaiyu.name --->林黛玉

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>js对象的语法：
    var 对象名={
   属性：值,
   属性：值,
   属性：值,
   属性：值
};
<span class="hljs-symbol">ex:</span>林黛玉这个对象所对应的属性如下
var lindaiyu={
<span class="hljs-symbol">   name:</span><span class="hljs-string">"林黛玉"</span>,
<span class="hljs-symbol">   birth:</span><span class="hljs-string">"1990"</span>,
<span class="hljs-symbol">   height:</span><span class="hljs-string">"160cm"</span>,
<span class="hljs-symbol">   weight:</span><span class="hljs-string">"50kg"</span>,
}
  如果对象取值的时候，直接对象.属性 名称就可以
<span class="hljs-symbol">   ex:</span>lindaiyu.name ---&gt;林黛玉

</code></pre>
<h2 id="articleHeader10">7.JSON</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是JSON
  JavaScript  Object Notation
     js         对象 表现方式
  js对象表示法，即以js对象的格式表现出来的字符串。
2.JSON语法
  1.JSON对象
    1.用一对{}来表示一个对象
2.对象的属性名称，必须用&quot;&quot;引起来（单引号不可以），值如果是字符串的话，必须也用&quot;&quot;引起来。
ex:
var computer='{
    &quot;name&quot;:&quot;电脑&quot;,
    &quot;price&quot;:5600
    }'
  2.JSON数组
    1.普通数组
   '[&quot;小乔&quot;,&quot;大乔&quot;,&quot;貂蝉&quot;]'
2.对象数组
  '[
      {
        &quot;name&quot;:&quot;小乔&quot;,
    &quot;height&quot;:&quot;160cm&quot;,
    &quot;age&quot;:18
      },
       {
        &quot;name&quot;:&quot;大乔&quot;,
    &quot;height&quot;:&quot;163cm&quot;,
    &quot;age&quot;:20
      },
      {
        &quot;name&quot;:&quot;貂蝉&quot;,
    &quot;height&quot;:&quot;165cm&quot;,
    &quot;age&quot;:21
      }
  ]'
3.JSON文件创建
  以.json为后缀的文件，里面包含的是符合json格式的数据

4.将JSON字符串，转换成js对象/数组
  var mperson='{&quot;name&quot;:&quot;TOM&quot;,&quot;age&quot;:18}';
  //json对象

   var arr='[&quot;小乔&quot;,&quot;大乔&quot;,&quot;貂蝉&quot;]';
   //json数组

   var arr1='[
       {&quot;name&quot;:&quot;Lucy&quot;,&quot;age&quot;:19},
   {&quot;name&quot;:&quot;Lily&quot;,&quot;age&quot;:19}
   ]';  //json数组

如何把上面的数据转换成js对象/数组格式
   1.使用eval()将数据转换成js对象数组（不推荐）
   2.使用JSON.parse()来将JSON字符串解析为js对象
     var obj=JSON.parse(mperson); //js对象
 var obj=JSON.parse(arr);//js数组
 var obj=JSON.parse(arr1);//js数组
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-number">1.</span>什么是JSON
  JavaScript  Object Notation
     js         对象 表现方式
  js对象表示法，即以js对象的格式表现出来的字符串。
<span class="hljs-number">2.</span>JSON语法
  <span class="hljs-number">1.</span>JSON对象
    <span class="hljs-number">1.</span>用一对{}来表示一个对象
<span class="hljs-number">2.</span>对象的属性名称，必须用<span class="hljs-string">""</span>引起来（单引号不可以），值如果是字符串的话，必须也用<span class="hljs-string">""</span>引起来。
ex:
<span class="hljs-built_in">var</span> computer='{
    <span class="hljs-string">"name"</span>:<span class="hljs-string">"电脑"</span>,
    <span class="hljs-string">"price"</span>:<span class="hljs-number">5600</span>
    }'
  <span class="hljs-number">2.</span>JSON数组
    <span class="hljs-number">1.</span>普通数组
   '[<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"貂蝉"</span>]'
<span class="hljs-number">2.</span>对象数组
  '[
      {
        <span class="hljs-string">"name"</span>:<span class="hljs-string">"小乔"</span>,
    <span class="hljs-string">"height"</span>:<span class="hljs-string">"160cm"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>
      },
       {
        <span class="hljs-string">"name"</span>:<span class="hljs-string">"大乔"</span>,
    <span class="hljs-string">"height"</span>:<span class="hljs-string">"163cm"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">20</span>
      },
      {
        <span class="hljs-string">"name"</span>:<span class="hljs-string">"貂蝉"</span>,
    <span class="hljs-string">"height"</span>:<span class="hljs-string">"165cm"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">21</span>
      }
  ]'
<span class="hljs-number">3.</span>JSON文件创建
  以.json为后缀的文件，里面包含的是符合json格式的数据

<span class="hljs-number">4.</span>将JSON字符串，转换成js对象/数组
  <span class="hljs-built_in">var</span> mperson='{<span class="hljs-string">"name"</span>:<span class="hljs-string">"TOM"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>}';
  <span class="hljs-comment">//json对象</span>

   <span class="hljs-built_in">var</span> arr='[<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"貂蝉"</span>]';
   <span class="hljs-comment">//json数组</span>

   <span class="hljs-built_in">var</span> arr1='[
       {<span class="hljs-string">"name"</span>:<span class="hljs-string">"Lucy"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-number">19</span>},
   {<span class="hljs-string">"name"</span>:<span class="hljs-string">"Lily"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-number">19</span>}
   ]';  <span class="hljs-comment">//json数组</span>

如何把上面的数据转换成js对象/数组格式
   <span class="hljs-number">1.</span>使用<span class="hljs-built_in">eval</span>()将数据转换成js对象数组（不推荐）
   <span class="hljs-number">2.</span>使用JSON.<span class="hljs-built_in">parse</span>()来将JSON字符串解析为js对象
     <span class="hljs-built_in">var</span> obj=JSON.<span class="hljs-built_in">parse</span>(mperson); <span class="hljs-comment">//js对象</span>
 <span class="hljs-built_in">var</span> obj=JSON.<span class="hljs-built_in">parse</span>(arr);<span class="hljs-comment">//js数组</span>
 <span class="hljs-built_in">var</span> obj=JSON.<span class="hljs-built_in">parse</span>(arr1);<span class="hljs-comment">//js数组</span>
 
</code></pre>
<p>2.JS对象数据格式<br>  var 对象名={</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 属性：值,
 属性：值,
 属性：值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code> 属性：值,
 属性：值,
 属性：值</code></pre>
<p>}<br>  取值：对象名称.属性<br>3.JSON数据格式<br>  var person='{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;name&quot;:&quot;TOM&quot;,
 &quot;age&quot;:12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code> <span class="hljs-string">"name"</span>:<span class="hljs-string">"TOM"</span>,
 <span class="hljs-string">"age"</span>:<span class="hljs-number">12</span></code></pre>
<p>}'</p>
<p>4.将JSON格式的数据转换js对象/数组<br>  1.eval()<br>  2.JSON.parse</p>
<p>4.1在php中，可以直接将数组转换成json格式的字符串<br>   语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 通过json_encode()将数组转换为JSON字符串，并返回转换后的结果
 ex:
   在php中
   $array=[&quot;钉钉&quot;,&quot;当当&quot;,&quot;冰冰&quot;];
   $str=json_encode($array);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> 通过json_encode()将数组转换为JSON字符串，并返回转换后的结果
 <span class="hljs-keyword">ex</span>:
   在php中
   <span class="hljs-variable">$array</span>=[<span class="hljs-string">"钉钉"</span>,<span class="hljs-string">"当当"</span>,<span class="hljs-string">"冰冰"</span>];
   <span class="hljs-variable">$str</span>=json_encode(<span class="hljs-variable">$array</span>);

</code></pre>
<h2 id="articleHeader11">8.XML</h2>
<p>AJAX:Asynchronous Javascript And Xml<br>   1.什么是XML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" eXtensible Markup Language
  可扩展的  标记    语言
 XML的标记没有被预定义过，需要自定义
 XML的宗旨是做数据传递的，而非显示数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code> eXtensible Markup Language
  可扩展的  标记    语言
 <span class="hljs-built_in">XML</span>的标记没有被预定义过，需要自定义
 <span class="hljs-built_in">XML</span>的宗旨是做数据传递的，而非显示数据</code></pre>
<p>2.XML的语法结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" XML可以独立保存为***.xml的文件，也可以以字符串的形式出现
   1.XML的最顶端是XML的声明
     <?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?>
   2.XML标记的语法
     1.XML标记必须成对出现
   <person> 错误
 2.XML严格区分大小写，开始和结束必须一致
   <person></person> 正确
   <Person></person> 错误
 3.XML的标记允许被嵌套，注意嵌套顺序
   <person>
      <name>
         <FirstName></FirstName>
     <LastName></LastName>
      </name>
   </person>
  4.每个标记都允许自定义属性，格式与html一致，但属性值，必须用&quot;&quot;括起来
    <person no=&quot;1001&quot;></person>
  5.每个XML文档，必须有一个根元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> XML可以独立保存为***.xml的文件，也可以以字符串的形式出现
   1.XML的最顶端是XML的声明
     <span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"utf-8"</span><span class="hljs-meta">?&gt;</span></span>
   2.XML标记的语法
     1.XML标记必须成对出现
   <span class="hljs-tag">&lt;<span class="hljs-name">person</span>&gt;</span> 错误
 2.XML严格区分大小写，开始和结束必须一致
   <span class="hljs-tag">&lt;<span class="hljs-name">person</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">person</span>&gt;</span> 正确
   <span class="hljs-tag">&lt;<span class="hljs-name">Person</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">person</span>&gt;</span> 错误
 3.XML的标记允许被嵌套，注意嵌套顺序
   <span class="hljs-tag">&lt;<span class="hljs-name">person</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">FirstName</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">FirstName</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">LastName</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">LastName</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">person</span>&gt;</span>
  4.每个标记都允许自定义属性，格式与html一致，但属性值，必须用""括起来
    <span class="hljs-tag">&lt;<span class="hljs-name">person</span> <span class="hljs-attr">no</span>=<span class="hljs-string">"1001"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">person</span>&gt;</span>
  5.每个XML文档，必须有一个根元素</code></pre>
<p>3.解析XML文档对象的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.核心方法
   elem.getElementsByTagName(&quot;标签名称&quot;);
   返回值：返回一个包含指定元素们的“类数组” （用for循环遍历）
   ex:var xmlDoc=xhr.responseXML;
     xmlDoc.getElementsByTagName(&quot;Student&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> <span class="hljs-number">1</span>.核心方法
   <span class="hljs-built_in">elem</span>.getElementsByTagName(<span class="hljs-string">"标签名称"</span>);
   返回值：返回一个包含指定元素们的“类数组” （用<span class="hljs-keyword">for</span>循环遍历）
   ex:<span class="hljs-built_in">var</span> xmlDoc=xhr.responseXML;
     xmlDoc.getElementsByTagName(<span class="hljs-string">"Student"</span>);</code></pre>
<p>4.在PHP中返回XML格式的字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.必须增加响应消息头
   header(&quot;Content-Type:application/xml&quot;);
 2.按照XML的语法结构，拼xml字符串，再响应给前端" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code> <span class="hljs-number">1.</span>必须增加响应消息头
   <span class="hljs-keyword">header</span>(<span class="hljs-string">"Content-Type:application/xml"</span>);
 <span class="hljs-number">2.</span>按照<span class="hljs-built_in">XML</span>的语法结构，拼<span class="hljs-built_in">xml</span>字符串，再响应给前端</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $xml=&quot;<?xml version='1.0' encoding='utf-8'?>&quot;;
  $xml.=&quot;<StudentList>&quot;;
  ...
  $xml.=&quot;</StudentList>&quot;;
  echo $xml;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code> <span class="hljs-variable">$xml</span>=<span class="hljs-string">"&lt;?xml version='1.0' encoding='utf-8'?&gt;"</span>;
  <span class="hljs-variable">$xml</span>.=<span class="hljs-string">"&lt;StudentList&gt;"</span>;
  ...
  <span class="hljs-variable">$xml</span>.=<span class="hljs-string">"&lt;/StudentList&gt;"</span>;
  <span class="hljs-built_in">echo</span> <span class="hljs-variable">$xml</span>;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——AJAX

## 原文链接
[https://segmentfault.com/a/1190000013371557](https://segmentfault.com/a/1190000013371557)

