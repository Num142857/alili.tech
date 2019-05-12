---
title: 'node学习之路（一）—— 网络请求' 
date: 2019-01-06 2:30:10
hidden: true
slug: ndpkulqa9x
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>文章来源：小青年原创</strong><br><strong>发布时间：2016-09-29</strong><br><strong>关键词：JavaScript，nodejs，http，url ，Query String，爬虫</strong><br><strong>转载需标注本文原始地址: <a href="http://zhaomenghuan.github.io/#!/blog/20160929" rel="nofollow noreferrer" target="_blank">http://zhaomenghuan.github.io...</a></strong></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>一直以来想学习一下node，一来是自己目前也没有什么时间去学习服务器端语言，但是有时候又想自己撸一下服务器端，本着爱折腾的精神开始写一写关于node的文章记录学习心得。本系列文章不会过多去讲解node安装、基本API等内容，而是通过一些实例去总结常用用法。本文主要讲解node网络操作的相关内容，node中的网络操作依赖于http模块，http模块提供了两种使用方式：</p>
<ul>
<li>作为服务器端使用，创建一个http服务器，监听http客户端请求并返回响应；</li>
<li>作为客户端使用，发起一个http客户端请求，获取服务器端响应。</li>
</ul>
<h2 id="articleHeader1">node http模块创建服务器</h2>
<h3 id="articleHeader2">node 处理 get 请求实例</h3>
<p>毕竟作为一个前端，我们经常需要自己搭建一个服务器做测试，这里我们先来讲一下node http模块作为服务器端使用。首先我们需要，使用createServer创建一个服务，然后通过listen监听客服端http请求。</p>
<p>我们可以创建一个最简单的服务器，在页面输出<code>hello world</code>，我们可以创建helloworld.js，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('hello world!')
}).listen(8888);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>)</span>{
    response.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text-plain'</span> });
    response.end(<span class="hljs-string">'hello world!'</span>)
}).listen(<span class="hljs-number">8888</span>);</code></pre>
<p>在命令行输入node helloworld.js即可，我们打开在浏览器打开<a href="http://127.0.0.1:8888/" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8888/</a>就可以看到页面输出hello world!。</p>
<p>下面我们在本地写一个页面，通过jsonp访问我们创建的node服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <title></title>
    </head>
    <body>
        <div id=&quot;output&quot;></div>
        
        <script type=&quot;text/javascript&quot;>
            // 创建script标签
            function importScript(src){
                var el = document.createElement('script');
                el.src = src;
                el.async = true;
                el.defer = true;
                document.body.appendChild(el);
            }
            
            // 响应的方法
            function jsonpcallback(rs) {
                console.log(JSON.stringify(rs));
                document.getElementById(&quot;output&quot;).innerHTML = JSON.stringify(rs);
            }
            
            // 发起get请求
            importScript('http://127.0.0.1:8888?userid=xiaoqingnian&amp;callback=jsonpcallback');
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"output"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            <span class="hljs-comment">// 创建script标签</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">importScript</span>(<span class="hljs-params">src</span>)</span>{
                <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
                el.src = src;
                el.async = <span class="hljs-literal">true</span>;
                el.defer = <span class="hljs-literal">true</span>;
                <span class="hljs-built_in">document</span>.body.appendChild(el);
            }
            
            <span class="hljs-comment">// 响应的方法</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonpcallback</span>(<span class="hljs-params">rs</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(rs));
                <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"output"</span>).innerHTML = <span class="hljs-built_in">JSON</span>.stringify(rs);
            }
            
            <span class="hljs-comment">// 发起get请求</span>
            importScript(<span class="hljs-string">'http://127.0.0.1:8888?userid=xiaoqingnian&amp;callback=jsonpcallback'</span>);
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>我们当然需要将上述node服务器中的代码稍作修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http'); // 提供web服务
var url = require('url');    // 解析GET请求
  
var data = {
    'name': 'zhaomenghuan', 
    'age': '22'
};
  
http.createServer(function(req, res){  
    // 将url字符串转换成Url对象
    var params = url.parse(req.url, true);  
    console.log(params);
    // 查询参数
    if(params.query){
        // 根据附件条件查询
        if(params.query.userid === 'xiaoqingnian'){
            // 判断是否为jsonp方式请求，若是则使用jsonp方式，否则为普通web方式
            if (params.query.callback) {  
                var resurlt =  params.query.callback + '(' + JSON.stringify(data) + ')';
                res.end(resurlt);  
            } else {  
                res.end(JSON.stringify(data));
            }
        } 
    }      
}).listen(8888);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>); <span class="hljs-comment">// 提供web服务</span>
<span class="hljs-keyword">var</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);    <span class="hljs-comment">// 解析GET请求</span>
  
<span class="hljs-keyword">var</span> data = {
    <span class="hljs-string">'name'</span>: <span class="hljs-string">'zhaomenghuan'</span>, 
    <span class="hljs-string">'age'</span>: <span class="hljs-string">'22'</span>
};
  
http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{  
    <span class="hljs-comment">// 将url字符串转换成Url对象</span>
    <span class="hljs-keyword">var</span> params = url.parse(req.url, <span class="hljs-literal">true</span>);  
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-comment">// 查询参数</span>
    <span class="hljs-keyword">if</span>(params.query){
        <span class="hljs-comment">// 根据附件条件查询</span>
        <span class="hljs-keyword">if</span>(params.query.userid === <span class="hljs-string">'xiaoqingnian'</span>){
            <span class="hljs-comment">// 判断是否为jsonp方式请求，若是则使用jsonp方式，否则为普通web方式</span>
            <span class="hljs-keyword">if</span> (params.query.callback) {  
                <span class="hljs-keyword">var</span> resurlt =  params.query.callback + <span class="hljs-string">'('</span> + <span class="hljs-built_in">JSON</span>.stringify(data) + <span class="hljs-string">')'</span>;
                res.end(resurlt);  
            } <span class="hljs-keyword">else</span> {  
                res.end(<span class="hljs-built_in">JSON</span>.stringify(data));
            }
        } 
    }      
}).listen(<span class="hljs-number">8888</span>);</code></pre>
<p>我们在命令行可以看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?userid=xiaoqingnian&amp;callback=jsonpcallback',
  query: { userid: 'xiaoqingnian', callback: 'jsonpcallback' },
  pathname: '/',
  path: '/?userid=xiaoqingnian&amp;callback=jsonpcallback',
  href: '/?userid=xiaoqingnian&amp;callback=jsonpcallback' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Url {
  <span class="hljs-attr">protocol</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">slashes</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">auth</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">hostname</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">'?userid=xiaoqingnian&amp;callback=jsonpcallback'</span>,
  <span class="hljs-attr">query</span>: { <span class="hljs-attr">userid</span>: <span class="hljs-string">'xiaoqingnian'</span>, <span class="hljs-attr">callback</span>: <span class="hljs-string">'jsonpcallback'</span> },
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/?userid=xiaoqingnian&amp;callback=jsonpcallback'</span>,
  <span class="hljs-attr">href</span>: <span class="hljs-string">'/?userid=xiaoqingnian&amp;callback=jsonpcallback'</span> }</code></pre>
<p>经过服务器端jsonp处理，然后返回一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonpcallback({&quot;name&quot;:&quot;zhaomenghuan&quot;,&quot;age&quot;:&quot;22&quot;})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">jsonpcallback({<span class="hljs-string">"name"</span>:<span class="hljs-string">"zhaomenghuan"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-string">"22"</span>})</code></pre>
<p>而我们在页面中定义了一个jsonpcallback()的方法，所以当我们在请求页面动态生成script调用服务器地址，这样相当于在页面执行了下我们定义的函数。jsonp的实现原理主要是script标签src可以跨域执行代码，类似于你引用js库，然后调用这个js库里面的方法；这是这里我们可以认为反过来了，你是在本地定义函数，调用的逻辑通过服务器返回的一个函数执行了，所以jsonp并没有什么神奇的，和XMLHttpRequest、ajax半毛钱关系都没有，而且JSONP需要服务器端支持，始终是无状态连接，不能获悉连接状态和错误事件，而且只能走GET的形式。</p>
<h3 id="articleHeader3">node 处理 post 请求实例</h3>
<p>当然这里我们可以直接在后台设置响应头进行跨域（CORS），如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require(&quot;http&quot;);    // 提供web服务
var query = require(&quot;querystring&quot;);    // 解析POST请求

http.createServer(function(req,res){
      // 报头添加Access-Control-Allow-Origin标签，值为特定的URL或&quot;*&quot;(表示允许所有域访问当前域)
      res.setHeader(&quot;Access-Control-Allow-Origin&quot;,&quot;*&quot;);
      
      var postdata = '';
      // 一旦监听器被添加，可读流会触发 'data' 事件
    req.addListener(&quot;data&quot;,function(chunk){
        postdata += chunk;
    })
    // 'end' 事件表明已经得到了完整的 body
    req.addListener(&quot;end&quot;,function(){
        console.log(postdata);     // 'appid=xiaoqingnian'
        // 将接收到参数串转换位为json对象
        var params = query.parse(postdata);
        if(params.userid == 'xiaoqingnian'){
            res.end('{&quot;name&quot;:&quot;zhaomenghuan&quot;,&quot;age&quot;:&quot;22&quot;}');
        }
    })
    
}).listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);    <span class="hljs-comment">// 提供web服务</span>
<span class="hljs-keyword">var</span> query = <span class="hljs-built_in">require</span>(<span class="hljs-string">"querystring"</span>);    <span class="hljs-comment">// 解析POST请求</span>

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
      <span class="hljs-comment">// 报头添加Access-Control-Allow-Origin标签，值为特定的URL或"*"(表示允许所有域访问当前域)</span>
      res.setHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>,<span class="hljs-string">"*"</span>);
      
      <span class="hljs-keyword">var</span> postdata = <span class="hljs-string">''</span>;
      <span class="hljs-comment">// 一旦监听器被添加，可读流会触发 'data' 事件</span>
    req.addListener(<span class="hljs-string">"data"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>)</span>{
        postdata += chunk;
    })
    <span class="hljs-comment">// 'end' 事件表明已经得到了完整的 body</span>
    req.addListener(<span class="hljs-string">"end"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(postdata);     <span class="hljs-comment">// 'appid=xiaoqingnian'</span>
        <span class="hljs-comment">// 将接收到参数串转换位为json对象</span>
        <span class="hljs-keyword">var</span> params = query.parse(postdata);
        <span class="hljs-keyword">if</span>(params.userid == <span class="hljs-string">'xiaoqingnian'</span>){
            res.end(<span class="hljs-string">'{"name":"zhaomenghuan","age":"22"}'</span>);
        }
    })
    
}).listen(<span class="hljs-number">8080</span>);</code></pre>
<blockquote><p>我们通过流的形式接收前端post传递的参数，通过监听data和end事件，后面在讲解event模块的时候再深入探究。</p></blockquote>
<p>CORS默认只支持GET/POST这两种http请求类型，如果要开启PUT/DELETE之类的方式，需要在服务端在添加一个"Access-Control-Allow-Methods"报头标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.setHeader(
      &quot;Access-Control-Allow-Methods&quot;,
      &quot;PUT, GET, POST, DELETE, HEAD, PATCH&quot;
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">res.setHeader(
      <span class="hljs-string">"Access-Control-Allow-Methods"</span>,
      <span class="hljs-string">"PUT, GET, POST, DELETE, HEAD, PATCH"</span>
);</code></pre>
<p>前端访问代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.onload = function () {
    console.log(this.responseText);
};
xhr.onreadystatechange = function() {
    console.log(this.readyState);
};

xhr.open(&quot;post&quot;, &quot;http://127.0.0.1:8080&quot;, true);
xhr.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded&quot;);
xhr.send(&quot;userid=xiaoqingnian&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.responseText);
};
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.readyState);
};

xhr.open(<span class="hljs-string">"post"</span>, <span class="hljs-string">"http://127.0.0.1:8080"</span>, <span class="hljs-literal">true</span>);
xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/x-www-form-urlencoded"</span>);
xhr.send(<span class="hljs-string">"userid=xiaoqingnian"</span>);</code></pre>
<h3 id="articleHeader4">url 模块API详解</h3>
<h4>url.parse——解析url字符串</h4>
<p>上述代码中比较关键的是我们通过url.parse方法将url字符串转成Url对象，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url.parse(urlStr, [parseQueryString], [slashesDenoteHost])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">url.parse(urlStr, [parseQueryString], [slashesDenoteHost])</code></pre>
<p><strong>接收参数：</strong></p>
<ul>
<li>
<strong>urlStr</strong>：url字符串</li>
<li>
<p><strong>parseQueryString</strong>：参数为true时，query会被解析为JSON格式，否则为普通字符串格式，默认为false；如：</p>
<ul>
<li>参数为true：<code>query: { userid: 'xiaoqingnian', callback: 'jsonpcallback' }</code>
</li>
<li>参数为false：<code>query: 'userid=xiaoqingnian&amp;callback=jsonpcallback'</code>
</li>
</ul>
</li>
<li>
<strong>slashesDenoteHost</strong>：默认为false，当url是 ‘<a>http://</a>’ 或 ‘ftp://’ 等标志的协议前缀打头的，或直接以地址打头，如 ‘127.0.0.1’ 或 ‘localhost’ 时候是没有区别的；当且仅当以2个斜杠打头的时候，比如 ‘//127.0.0.1’ 才有区别。这时候，如果其值为true，则第一个单个 ‘/’ 之前的部分被解析为 ‘host’ 和 ‘hostname’，如 ” host : ‘127.0.0.1’ “，如果为false，包括2个反斜杠在内的所有字符串被解析为pathname。如：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> url.parse('//www.foo/bar',true,true)
Url {
  protocol: null,
  slashes: true,
  auth: null,
  host: 'www.foo',
  port: null,
  hostname: 'www.foo',
  hash: null,
  search: '',
  query: {},
  pathname: '/bar',
  path: '/bar',
  href: '//www.foo/bar' }
> url.parse('//www.foo/bar',true,false)
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '//www.foo/bar',
  path: '//www.foo/bar',
  href: '//www.foo/bar' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&gt; url.parse(<span class="hljs-string">'//www.foo/bar'</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>)
Url {
  <span class="hljs-attr">protocol</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">slashes</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">auth</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">'www.foo'</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">hostname</span>: <span class="hljs-string">'www.foo'</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">query</span>: {},
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/bar'</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/bar'</span>,
  <span class="hljs-attr">href</span>: <span class="hljs-string">'//www.foo/bar'</span> }
&gt; url.parse(<span class="hljs-string">'//www.foo/bar'</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">false</span>)
Url {
  <span class="hljs-attr">protocol</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">slashes</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">auth</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">hostname</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">query</span>: {},
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'//www.foo/bar'</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">'//www.foo/bar'</span>,
  <span class="hljs-attr">href</span>: <span class="hljs-string">'//www.foo/bar'</span> }</code></pre>
<p>这里的URL对象和浏览器中的location对象类似，location中如果我们需要使用类似的方法，我们需要自己构造。</p>
<h4>url.format——格式化URL对象</h4>
<p>我们可以通过url.format方法将一个解析后的URL对象格式化成url字符串，用法为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url.format(urlObj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">url.format(urlObj)</code></pre>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url.format({
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
})

结果为：
'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">url.format({
  <span class="hljs-attr">protocol</span>: <span class="hljs-string">'http:'</span>,
  <span class="hljs-attr">slashes</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">auth</span>: <span class="hljs-string">'user:pass'</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">'host.com:8080'</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-string">'8080'</span>,
  <span class="hljs-attr">hostname</span>: <span class="hljs-string">'host.com'</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-string">'#hash'</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">'?query=string'</span>,
  <span class="hljs-attr">query</span>: <span class="hljs-string">'query=string'</span>,
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/p/a/t/h'</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/p/a/t/h?query=string'</span>,
  <span class="hljs-attr">href</span>: <span class="hljs-string">'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'</span> 
})

结果为：
<span class="hljs-string">'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'</span></code></pre>
<h4>url.resolve——拼接url字符串</h4>
<p>我们可以通过url.resolve为URL或 href 插入 或 替换原有的标签，接收参数：<br>from源地址，to需要添加或替换的标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url.resolve(from, to)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">url.resolve(<span class="hljs-keyword">from</span>, to)</code></pre>
<p>例子为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url.resolve('/one/two/three', 'four')
=> '/one/two/four'
url.resolve('http://example.com/', '/one')    
=> 'http://example.com/one'
url.resolve('http://example.com/one', '/two') 
=> 'http://example.com/two'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">url.resolve(<span class="hljs-string">'/one/two/three'</span>, <span class="hljs-string">'four'</span>)
=&gt; <span class="hljs-string">'/one/two/four'</span>
url.resolve(<span class="hljs-string">'http://example.com/'</span>, <span class="hljs-string">'/one'</span>)    
=&gt; <span class="hljs-string">'http://example.com/one'</span>
url.resolve(<span class="hljs-string">'http://example.com/one'</span>, <span class="hljs-string">'/two'</span>) 
=&gt; <span class="hljs-string">'http://example.com/two'</span></code></pre>
<h3 id="articleHeader5">Query String 模块Query String</h3>
<h4>querystring.escape——字符串编码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.escape('appkey=123&amp;version=1.0.0+')
// 'appkey%3D123%26version%3D1.0.0%2B'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.escape(<span class="hljs-string">'appkey=123&amp;version=1.0.0+'</span>)
<span class="hljs-comment">// 'appkey%3D123%26version%3D1.0.0%2B'</span></code></pre>
<h4>querystring.unescape——字符串解码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.unescape('appkey%3D123%26version%3D1.0.0%2B')
// 'appkey=123&amp;version=1.0.0+'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.unescape(<span class="hljs-string">'appkey%3D123%26version%3D1.0.0%2B'</span>)
<span class="hljs-comment">// 'appkey=123&amp;version=1.0.0+'</span></code></pre>
<h4>querystring.stringify(querystring.encode)——序列化对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.stringify(obj[, sep][, eq][, options])
querystring.encode(obj[, sep][, eq][, options])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.stringify(obj[, sep][, eq][, options])
querystring.encode(obj[, sep][, eq][, options])</code></pre>
<p><strong>接收参数</strong>：</p>
<ul>
<li>
<strong>obj</strong>： 欲转换的对象</li>
<li>
<strong>sep</strong>：设置分隔符，默认为 ‘&amp;'</li>
<li>
<strong>eq</strong>：设置赋值符，默认为 ‘='</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.stringify({foo: 'bar', baz: ['qux', 'quux'], corge: ''})
// 'foo=bar&amp;baz=qux&amp;baz=quux&amp;corge='

querystring.stringify({foo: 'bar', baz: ['qux', 'quux'], corge: ''},',',':')
// 'foo:bar,baz:qux,baz:quux,corge:'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.stringify({<span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-attr">baz</span>: [<span class="hljs-string">'qux'</span>, <span class="hljs-string">'quux'</span>], <span class="hljs-attr">corge</span>: <span class="hljs-string">''</span>})
<span class="hljs-comment">// 'foo=bar&amp;baz=qux&amp;baz=quux&amp;corge='</span>

querystring.stringify({<span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-attr">baz</span>: [<span class="hljs-string">'qux'</span>, <span class="hljs-string">'quux'</span>], <span class="hljs-attr">corge</span>: <span class="hljs-string">''</span>},<span class="hljs-string">','</span>,<span class="hljs-string">':'</span>)
<span class="hljs-comment">// 'foo:bar,baz:qux,baz:quux,corge:'</span></code></pre>
<h4>querystring.parse(querystring.decode)——解析query字符串</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.parse(str[, sep][, eq][, options])
querystring.decode(str[, sep][, eq][, options])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.parse(str[, sep][, eq][, options])
querystring.decode(str[, sep][, eq][, options])</code></pre>
<p><strong>接收参数</strong>：</p>
<ul>
<li>
<strong>str</strong>：欲转换的字符串</li>
<li>
<strong>sep</strong>：设置分隔符，默认为 ‘&amp;'</li>
<li>
<strong>eq</strong>：设置赋值符，默认为 ‘='</li>
<li>
<strong>[options]</strong> maxKeys 可接受字符串的最大长度，默认为1000</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="querystring.parse('foo=bar&amp;baz=qux&amp;baz=quux&amp;corge=')
// { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }

querystring.parse('foo:bar,baz:qux,baz:quux,corge:',',',':')
{ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">querystring.parse(<span class="hljs-string">'foo=bar&amp;baz=qux&amp;baz=quux&amp;corge='</span>)
<span class="hljs-comment">// { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }</span>

querystring.parse(<span class="hljs-string">'foo:bar,baz:qux,baz:quux,corge:'</span>,<span class="hljs-string">','</span>,<span class="hljs-string">':'</span>)
{ <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-attr">baz</span>: [ <span class="hljs-string">'qux'</span>, <span class="hljs-string">'quux'</span> ], <span class="hljs-attr">corge</span>: <span class="hljs-string">''</span> }</code></pre>
<h2 id="articleHeader6">node http模块发起请求</h2>
<p>平时喜欢看博客，毕竟买书要钱而且有时候没有耐心读完整本书，所以很喜欢逛一些网站，但是很多时候把所有的站逛一下又没有那么多时间，哈哈，所以就准备把常去的网站的文章爬出来做一个文章列表，一来省去收集的时间，二来借此熟悉熟悉node相关的东西。这里我们首先看一个爬虫的小例子，下面以SF为例加以说明（希望不要被封号）。</p>
<h3 id="articleHeader7">http.request与http.get的区别</h3>
<h4>http.request(options, callback)</h4>
<p>options可以是一个对象或一个字符串。如果options是一个字符串, 它将自动使用url.parse()解析。http.request() 返回一个 http.ClientRequest类的实例。ClientRequest实例是一个可写流对象。如果需要用POST请求上传一个文件的话，就将其写入到ClientRequest对象。使用http.request()方法时都必须总是调用req.end()以表明这个请求已经完成，即使响应body里没有任何数据。如果在请求期间发生错误（DNS解析、TCP级别的错误或实际HTTP解析错误），在返回的请求对象会触发一个'error'事件。</p>
<p><strong>Options配置说明：</strong></p>
<ul>
<li>host：请求发送到的服务器的域名或IP地址。默认为'localhost'。</li>
<li>hostname：用于支持url.parse()。hostname比host更好一些</li>
<li>port：远程服务器的端口。默认值为80。</li>
<li>localAddress：用于绑定网络连接的本地接口。</li>
<li>socketPath：Unix域套接字（使用host:port或socketPath）</li>
<li>method：指定HTTP请求方法的字符串。默认为'GET'。</li>
<li>path：请求路径。默认为'/'。如果有查询字符串，则需要包含。例如'/index.html?page=12'。请求路径包含非法字符时抛出异常。目前，只否决空格，不过在未来可能改变。</li>
<li>headers：包含请求头的对象。</li>
<li>auth：用于计算认证头的基本认证，即'user:password'</li>
<li>
<p>agent：控制Agent的行为。当使用了一个Agent的时候，请求将默认为Connection: keep-alive。可能的值为：</p>
<ul>
<li>undefined（默认）：在这个主机和端口上使用[全局Agent][]。</li>
<li>Agent对象：在Agent中显式使用passed。</li>
<li>false：在对Agent进行资源池的时候，选择停用连接，默认请求为：Connection: close。</li>
</ul>
</li>
<li>keepAlive：{Boolean} 保持资源池周围的套接字在未来被用于其它请求。默认值为false</li>
<li>keepAliveMsecs：{Integer} 当使用HTTP KeepAlive的时候，通过正在保持活动的套接字发送TCP KeepAlive包的频繁程度。默认值为1000。仅当keepAlive被设置为true时才相关。</li>
</ul>
<h4>http.get(options, callback)</h4>
<p>因为大部分的请求是没有报文体的GET请求，所以Node提供了这种便捷的方法。该方法与http.request()的唯一区别是它设置的是GET方法并自动调用req.end()。</p>
<h3 id="articleHeader8">爬虫实例</h3>
<p>这里我们使用es6的新特性写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const https = require('https');
https.get('https://segmentfault.com/blogs', (res) => {
    console.log('statusCode: ', res.statusCode);
      console.log('headers: ', res.headers);
      var data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
          console.log(data);
      })
}).on('error', (e) => {
      console.error(e);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> https = <span class="hljs-built_in">require</span>(<span class="hljs-string">'https'</span>);
https.get(<span class="hljs-string">'https://segmentfault.com/blogs'</span>, (res) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'statusCode: '</span>, res.statusCode);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'headers: '</span>, res.headers);
      <span class="hljs-keyword">var</span> data = <span class="hljs-string">''</span>;
      res.on(<span class="hljs-string">'data'</span>, (chunk) =&gt; {
        data += chunk;
      });
      res.on(<span class="hljs-string">'end'</span>, () =&gt; {
          <span class="hljs-built_in">console</span>.log(data);
      })
}).on(<span class="hljs-string">'error'</span>, (e) =&gt; {
      <span class="hljs-built_in">console</span>.error(e);
});</code></pre>
<p>这样一小段代码我们就可以拿到segmentfault的博客页面的源码，需要说明的是因为这里请求的网站是https协议，所以我们需要引入https模块，用法同http一致。下面需要做的是解析html代码，下面我们需要做的就是解析源码，这里我们可以引入cheerio，一个node版的类jQuery模块，npm地址：<a href="https://www.npmjs.com/package/cheerio" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a>。</p>
<p>首先第一步安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cheerio" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install cheerio</code></pre>
<p>然后就是将html代码load进来，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cheerio = require('cheerio'),
var $ = cheerio.load(html);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>),
<span class="hljs-keyword">var</span> $ = cheerio.load(html);</code></pre>
<p>最后我们就是分析dom结构咯，通过类似于jQuery的方法获取DOM元素的内容，然后就将数据重新组装成json结构的数据。这里就是分析源码然后，这里我就不详细分析了，直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function htmlparser(html){
    var baseUrl = 'https://segmentfault.com';
    
    var $ = cheerio.load(html);
    var bloglist = $('.stream-list__item');
    
    var data = [];
    
    bloglist.each(function(item){
        var page = $(this);
        var summary = page.find('.summary');
        var blogrank = page.find('.blog-rank');
        
        var title = summary.find('.title a').text();
        var href = baseUrl + summary.find('.title a').attr('href');
        var author = summary.find('.author li a').first().text().trim();
        var origin = summary.find('.author li a').last().text().trim();
        var time = summary.find('.author li span')[0].nextSibling.data.trim();
        var excerpt = summary.find('p.excerpt').text().trim();
        var votes = blogrank.find('.votes').text().trim();
        var views = blogrank.find('.views').text().trim();
        
        data.push({
            title: title,
            href: href,
            author: author,
            origin: origin,
            time: time,
            votes: votes,
            views: views,
            excerpt: excerpt
        })
    })
    
    return data;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">htmlparser</span>(<span class="hljs-params">html</span>)</span>{
    <span class="hljs-keyword">var</span> baseUrl = <span class="hljs-string">'https://segmentfault.com'</span>;
    
    <span class="hljs-keyword">var</span> $ = cheerio.load(html);
    <span class="hljs-keyword">var</span> bloglist = $(<span class="hljs-string">'.stream-list__item'</span>);
    
    <span class="hljs-keyword">var</span> data = [];
    
    bloglist.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">var</span> page = $(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">var</span> summary = page.find(<span class="hljs-string">'.summary'</span>);
        <span class="hljs-keyword">var</span> blogrank = page.find(<span class="hljs-string">'.blog-rank'</span>);
        
        <span class="hljs-keyword">var</span> title = summary.find(<span class="hljs-string">'.title a'</span>).text();
        <span class="hljs-keyword">var</span> href = baseUrl + summary.find(<span class="hljs-string">'.title a'</span>).attr(<span class="hljs-string">'href'</span>);
        <span class="hljs-keyword">var</span> author = summary.find(<span class="hljs-string">'.author li a'</span>).first().text().trim();
        <span class="hljs-keyword">var</span> origin = summary.find(<span class="hljs-string">'.author li a'</span>).last().text().trim();
        <span class="hljs-keyword">var</span> time = summary.find(<span class="hljs-string">'.author li span'</span>)[<span class="hljs-number">0</span>].nextSibling.data.trim();
        <span class="hljs-keyword">var</span> excerpt = summary.find(<span class="hljs-string">'p.excerpt'</span>).text().trim();
        <span class="hljs-keyword">var</span> votes = blogrank.find(<span class="hljs-string">'.votes'</span>).text().trim();
        <span class="hljs-keyword">var</span> views = blogrank.find(<span class="hljs-string">'.views'</span>).text().trim();
        
        data.push({
            <span class="hljs-attr">title</span>: title,
            <span class="hljs-attr">href</span>: href,
            <span class="hljs-attr">author</span>: author,
            <span class="hljs-attr">origin</span>: origin,
            <span class="hljs-attr">time</span>: time,
            <span class="hljs-attr">votes</span>: votes,
            <span class="hljs-attr">views</span>: views,
            <span class="hljs-attr">excerpt</span>: excerpt
        })
    })
    
    <span class="hljs-keyword">return</span> data;
}</code></pre>
<p>结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{ title: '转换流',
    href: 'https://segmentfault.com/a/1190000007036273',
    author: 'SwiftGG翻译组',
    origin: 'SwiftGG翻译组',
    time: '1 小时前',
    votes: '0推荐',
    views: '14浏览',
    excerpt: '作者：Erica Sadun，原文链接，原文日期：2016-08-29译者：Darren；校对：shank
s；定稿：千叶知风 我在很多地方都表达了我对流的喜爱。我在 Swift Cookbook 中介绍了一些。现
在，我将通过 Pearson 的内容更新计划...' },
......
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[{ <span class="hljs-attr">title</span>: <span class="hljs-string">'转换流'</span>,
    <span class="hljs-attr">href</span>: <span class="hljs-string">'https://segmentfault.com/a/1190000007036273'</span>,
    <span class="hljs-attr">author</span>: <span class="hljs-string">'SwiftGG翻译组'</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-string">'SwiftGG翻译组'</span>,
    <span class="hljs-attr">time</span>: <span class="hljs-string">'1 小时前'</span>,
    <span class="hljs-attr">votes</span>: <span class="hljs-string">'0推荐'</span>,
    <span class="hljs-attr">views</span>: <span class="hljs-string">'14浏览'</span>,
    <span class="hljs-attr">excerpt</span>: <span class="hljs-string">'作者：Erica Sadun，原文链接，原文日期：2016-08-29译者：Darren；校对：shank
s；定稿：千叶知风 我在很多地方都表达了我对流的喜爱。我在 Swift Cookbook 中介绍了一些。现
在，我将通过 Pearson 的内容更新计划...'</span> },
......
]</code></pre>
<p>这里我们只是抓取了文章列表的一页，如果需要抓取多页，只需要将内容再次封装一下，传入一个地址参数?page=2，如：<a href="https://segmentfault.com/blogs?page=2">https://segmentfault.com/blog...</a><br>另外我们也没有将详情页进一步爬虫，毕竟文章的目的只是学习，同时方便自己查看列表，这里保留原始地址。</p>
<p>温馨提示：大家不要都拿sf做测试哦，不然玩坏了就不好。</p>
<h3 id="articleHeader9">模拟登陆</h3>
<p>哈哈，写到这里已经很晚了，用node试了试模拟登陆SF，结果404，暂时没有什么思路，等有时间再试试专门开篇讲解咯。这里推荐一篇之前看到的文章：<a href="https://segmentfault.com/a/1190000003851057" target="_blank">记一次用 NodeJs 实现模拟登录的思路</a>。</p>
<h2 id="articleHeader10">参考</h2>
<ul>
<li><a href="https://nodejs.org/docs/latest-v5.x/api/" rel="nofollow noreferrer" target="_blank">nodejs官网API文档</a></li>
<li><a href="http://www.imooc.com/learn/348" rel="nofollow noreferrer" target="_blank">进击Node.js基础（一）</a></li>
<li><a href="http://nodeapi.ucdok.com/#/api/" rel="nofollow noreferrer" target="_blank">Node.js v4.2.4 文档 中文版</a></li>
</ul>
<blockquote><p>文章代码源码下载：<a href="https://github.com/zhaomenghuan/learn-javascript" rel="nofollow noreferrer" target="_blank">https://github.com/zhaomenghu...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node学习之路（一）—— 网络请求

## 原文链接
[https://segmentfault.com/a/1190000010455932](https://segmentfault.com/a/1190000010455932)

