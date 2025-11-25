---
title: 'http,ajax,$.ajax,vue-resource,axios的知识大串联' 
date: 2018-12-10 2:30:07
hidden: true
slug: xguyruf1y4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>前端越来越工程化,而ajax是整个前端的核心,所以ES规则和各种封装的工具类越来越多;<br>借此机会我把http,XMLHttpRequest,ajax,$.ajax,vue-resource,axios做了一个知识大串联,本文主要是侧重将知识串成一条线,自己也复习下,希望也能帮到你们</blockquote>
<h2 id="articleHeader1">1.http请求</h2>
<h3 id="articleHeader2">1.1 什么是http</h3>
<p>http是超文本传输协议英文简称,是基于TCP/IP通信协议来传递数据。</p>
<h3 id="articleHeader3">1.2三个特点</h3>
<p>1.HTTP是无连接：每次只处理一个请求,处理完毕断开再处理下一个请求;<br>2.HTTP是媒体独立的：可以处理知道的能处理的数据类型,就是我们在请求的时候需要设置的请求头的内容,<a href="http://www.runoob.com/http/http-content-type.html" rel="nofollow noreferrer" target="_blank">HTTP content-type内容</a><br>3.HTTP是无状态：就是没有办法记住上一次请求的状态;</p>
<h3 id="articleHeader4">1.3怎么解决无状态</h3>
<p>1.由于很多需求是要记住上一次请求的状态信息，如登录状态的保持，所以要有对应的解决方案，那就是cookie和session<br>2.cookie简单的实现过程：后台通过req.header获取请求头的内容===&gt;调用res处理===&gt;cookie写入响应头===&gt;返回数据写入响应体===&gt;结束响应===&gt;响应头响应体；<br>3.session实现过程:后台调用HttpServletRequest的getSession方法===&gt;生成并发送给客户端session id,调用session相关方法增加内容===&gt;客户端请求携带seession id===&gt;服务端对应session id相应的Session,并重新创建session</p>
<h3 id="articleHeader5">1.4请求过程</h3>
<p>域名解析 --&gt; 发起TCP的3次握手(试探并建立TCP/IP连接) --&gt; 建立TCP连接后发起http请求(请求行,请求头,请求主体) --&gt; 服务器响应http请求(响应行,响应头,响应主体)--&gt;四次挥手(中断这次TCP连接)</p>
<h2 id="articleHeader6">2 XMLHttpRequest</h2>
<h3 id="articleHeader7">2.1定义:</h3>
<p>是ajax的核心,提供了对 HTTP 协议的完全的访问,包括用get,post或head请求的能力,也就是可以理解为XMLHttpRequest对象里面对http协议请求进行了封装,并暴露一些属性和方法。</p>
<h3 id="articleHeader8">2.2属性：</h3>
<p>1.readyState：XMLHttpRequest创建后方法调用的每个阶段对应的状态值,值为0-4,0--&gt;创建对象，1--&gt;请求行执行,2--&gt;请求主体执行,3--&gt;响应头已经接收完,响应主体正在接收,4--&gt;请求完成<br>2.responseText：响应主体内容<br>3.responseXML：对请求的响应，解析为 XML 并作为 Document 对象返回。如果响应体不是“text/xml”返回null。<br>4.status：状态值<br>5.withCredentials:是一个布尔值, 默认为false, 表示跨域请求中不发送cookies等信息. 当它设置为true时, cookies , authorization headers 或者TLS客户端证书 都可以正常发送和接收. 显然它的值对同域请求没有影响.IE10才支持</p>
<h3 id="articleHeader9">2.3事件</h3>
<p>onreadystatechange:readyState值改变会触发的事件句柄函数,主要就是监听该对象的每个阶段变化</p>
<h3 id="articleHeader10">2.4方法</h3>
<p>1.abort():取消响应,如ajax中需要终止请求就是调用该方法,原理就是把 XMLHttpRequest 对象重置为 readyState 为 0 的状态<br>2.getAllResponseHeaders()/getResponseHeader():返回所有或单个的响应头</p>
<p>3.open(method,url,async,username,password):请求行。<br>  method可以是get,post,head,put和delete,url一般是同源的(不同源就是常说的跨域)；<br>  async值默认是true(表示异步的),可以设置为false,表示同步；<br>  username 和 password 参数是可选的，为 url 所需的授权提供认证资格</p>
<p>4.setRequestHeader("Content-type",format):设置请求头,如果请求行的方法是get可不设置<br>  format值一般有四种(主要针对post提交):<br>  默认纯文本:"text/plain; charset=utf-8",其中charset=utf-8可省略<br>  json格式:"application/json"<br>  表单默认:application/x-www-form-urlencoded,浏览器的原生 form 表单，如果不设置 enctype 属性就会以该格式提交,如果是form表单可设置enctype属性为multipart/form-data上传文件<br>  html:text/html</p>
<p>4.send(data):请求主体,发送请求，如果请求行是get时data默认为空</p>
<h3 id="articleHeader11">2.5 版本</h3>
<p>分为XMLHttpRequest Level 1和XMLHttpRequest Level 2<br>两者的不同看阮大哥的:<a href="http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html" rel="nofollow noreferrer" target="_blank">XMLHttpRequest Level 2 使用指南</a></p>
<h2 id="articleHeader12">3.ajax</h2>
<h3 id="articleHeader13">3.1 定义</h3>
<p>全称Asynchronous Javascript And XML，实际上就是利用XMLHttpRequest 对象或者ActiveXObject（兼容IE）实现页面的局部请求数据功能。</p>
<h3 id="articleHeader14">3.2 请求实现</h3>
<p>1.创建异步对象<br>let xhr = new XMLHttpRequest();//IE5和6是new ActiveXObject(),IE8,9是XDomainRequest()<br>2.请求行<br>xhr.open('get', url);//可以是get,post,head,put和delete<br>3.请求头(get可省略)<br>xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//格式见上面XMLHttpRequest请求头方法格式<br>4.监听响应头和主体<br>通过onreadystatechange 监听返回状态,通过XMLHttpRequest的getResponseHeader()判断响应头信息,得到对应的响应内容responseText或responseXML,代码如下</p>
<h3 id="articleHeader15">3.3 封装一个原生的ajax请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  type：请求方法
  data: 发送的数据
  url: 请求的url
  success:回掉函数
*/
ajax: function (option) {
  //1.创建异步对象
  var xhr = new XMLHttpRequest();
  //2.请求行
  if (option.type == 'get' &amp;&amp; option.data) {
    option.url += '?';
    option.url += option.data;
    // 如果是get请求 那么 把data 设置为null 发送的时候 就相当于 发送null
    option.data = null;
  }
  xhr.open(option.type, option.url);
  //3.请求头(get请求可以省略)
  if (option.type == 'post' &amp;&amp; option.data) {
    xhr.setRequestHeader(&quot;Content-type&quot;,&quot;application/x-www-form-urlencoded&quot;);
  }
  //4.注册状态改变事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 &amp;&amp; xhr.status == 200){
      let type = xhr.getResponseHeader('content-type');
      if (type.indexOf('json') != -1) {
       option.success(JSON.parse(xhr.responseText));
         return;
      }
      if (type.indexOf('xml') != -1) {
        option.success(xhr.responseXML);
        return;
      }
      option.success(xhr.responseText);
    }
  }

  //5.发送请求
  xhr.send(option.data);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">/*
  type：请求方法
  data: 发送的数据
  url: 请求的url
  success:回掉函数
*/</span>
ajax: function (option) {
  <span class="hljs-comment">//1.创建异步对象</span>
  <span class="hljs-built_in">var</span> xhr = <span class="hljs-literal">new</span> XMLHttpRequest();
  <span class="hljs-comment">//2.请求行</span>
  <span class="hljs-keyword">if</span> (option.<span class="hljs-keyword">type</span> == <span class="hljs-string">'get'</span> &amp;&amp; option.<span class="hljs-built_in">data</span>) {
    option.url += <span class="hljs-string">'?'</span>;
    option.url += option.<span class="hljs-built_in">data</span>;
    <span class="hljs-comment">// 如果是get请求 那么 把data 设置为null 发送的时候 就相当于 发送null</span>
    option.<span class="hljs-built_in">data</span> = <span class="hljs-built_in">null</span>;
  }
  xhr.open(option.<span class="hljs-keyword">type</span>, option.url);
  <span class="hljs-comment">//3.请求头(get请求可以省略)</span>
  <span class="hljs-keyword">if</span> (option.<span class="hljs-keyword">type</span> == <span class="hljs-string">'post'</span> &amp;&amp; option.<span class="hljs-built_in">data</span>) {
    xhr.setRequestHeader(<span class="hljs-string">"Content-type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);
  }
  <span class="hljs-comment">//4.注册状态改变事件</span>
  xhr.onreadystatechange = function () {
    <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>){
      <span class="hljs-keyword">let</span> <span class="hljs-keyword">type</span> = xhr.getResponseHeader(<span class="hljs-string">'content-type'</span>);
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span>.indexOf(<span class="hljs-string">'json'</span>) != <span class="hljs-number">-1</span>) {
       option.success(JSON.parse(xhr.responseText));
         <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span>.indexOf(<span class="hljs-string">'xml'</span>) != <span class="hljs-number">-1</span>) {
        option.success(xhr.responseXML);
        <span class="hljs-keyword">return</span>;
      }
      option.success(xhr.responseText);
    }
  }

  <span class="hljs-comment">//5.发送请求</span>
  xhr.send(option.<span class="hljs-built_in">data</span>);
}</code></pre>
<h3 id="articleHeader16">3.4 get和post对比</h3>
<p>1.发送数据形式不同:<br>get是拼接到URL后面,默认形式是QueryString,<br>post默认是Request Payload(因为XMLHttpRequest默认的请求头格式是text/plain),一般设置请求头设置了application/x-www-form-urlencoded就转化为From Data格式,<br>为什么要设置转化?Request Payload后台通过request.getParameter(name)无法获取数据<br>2.发送数据大小:<br>get是拼接到URl上的,IE对URL长度的限制是2083字节(2K+35字节),火狐和谷歌无限制,服务器可限制<br>post前端无限定大小,服务器可限制<br>3.安全性:<br>post比get安全,因为get是在URL中,所以数据暴露在外面,而且一般浏览器会缓存浏览的URL<br>如果要绝对的安全可以使用https传输</p>
<h2 id="articleHeader17">4. 跨域</h2>
<h3 id="articleHeader18">4.1 什么叫跨域</h3>
<p>就是不同源,同源指的是URL(统一资源定位符)的协议名,域名和端口名相同</p>
<h3 id="articleHeader19">4.2 同源限制的内容</h3>
<p>Cookie、LocalStorage和IndexDB(浏览器自带的一个数据库)无法获取;<br>DOM无法获得;<br>AJAX请求不能发送;<br>所以同源策略设置的目的就是为了保证用户信息的安全,防止浏览器受到XSS、CSFR等攻击。</p>
<h3 id="articleHeader20">4.3 跨域常见的8种方式</h3>
<p>一看8种，其实常用的只有三种，前面三种是比较常用的：</p>
<p>1.JSONP:就是利用&lt;script&gt;的src属性不受同源的限制,对应的用callback接收返回值;</p>
<p>2.CORS(跨域资源共享):<br>  &lt;1&gt;简单请求:<br><span class="img-wrap"><img data-src="/img/bV52Af?w=744&amp;h=354" src="https://static.alili.tech/img/bV52Af?w=744&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>服务器设置:前端设置XMLHttpRequest的withCredentials为true,服务器设置Access-Control-<br>  Allow-Credentials: true</p>
<p>&lt;2&gt;非简单请求:除了简单请求之外的,请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json<br>  跨域方法:浏览器先预检,服务器回应<br>更多详情参照阮老师的<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解</a></p>
<p>&lt;3&gt;反向代理:<br>   原理:而nginx通过检测url前缀，把http请求转发到后面真实的物理服务器。并通过rewrite命令把前缀再去掉。这样真实的服务器就可以正确处理请求，并且并不知道这个请求是来自代理服务器的</p>
<p>&lt;4&gt;WebSockets<br>WebSocket是HTML5新出的一种通信协议，是http协议支持长连接的一个优化,使用ws://（非加密）和wss://（加密）作为协议前缀。主要是该协议不实行同源政策，只要服务器支持<br>详情参照:<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket" rel="nofollow noreferrer" target="_blank">WebSocket - Web API 接口 | MDN</a><br>大家有没想一个问题,WebScoket无同源限制难道不会有攻击吗?<br>其实那些跨域的URL是需要服务器授权的,没有授权的则无法访问.<br>详情参照:<a href="http://www.techweb.com.cn/network/system/2017-08-17/2575047.shtml" rel="nofollow noreferrer" target="_blank">WebSocket通信协议应用安全问题分析</a></p>
<blockquote>前面5种都是支持ajax请求的跨域方法 <br>  JSONP只适用于get方法做跨域,CORS和反向代理适用于所有请求方法;<br>JSONP适合所有浏览器,CORS只支持IE10及以上<br>   WebSocket只能发送纯文本数据，所以如果发送复杂的格式的数据可以用JSON.STRINGFY来把数据序列化一下,而且有IE10及以上才支持</blockquote>
<p>&lt;5&gt;document.domain + iframe 跨域:<br> 只可以非同源共享cookie,DOM</p>
<p>&lt;6&gt;window.name + iframe 跨域</p>
<p>&lt;7&gt;跨文档通信API(Cross-document messaging)之window.postMessage<br>HTML5新引入的,可以跨域LocalStorage</p>
<p>&lt;8&gt;片段识别符<br>片段识别符指的是，URL的#号后面的部分，如果只是改变片段标识符，页面将不会重新刷新,父子窗口可以相互改变该标识符<br>详情参照:<a href="http://blog.csdn.net/u013084331/article/details/51114288" rel="nofollow noreferrer" target="_blank">浏览器的跨域问题以及解决方案</a></p>
<h2 id="articleHeader21">5. ajax的几种封装类</h2>
<h3 id="articleHeader22">5.1 $.ajax</h3>
<p>常见的三种用法:<br> 1.$.get</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $.get(url,data,success(response,status,xhr),dataType)
    //data为传入的数据
    //&quot;xml&quot;,&quot;html&quot;,&quot;text&quot;,&quot;script&quot;,&quot;json&quot;,&quot;jsonp&quot;,
    eg:
    $.get(&quot;test.cgi&quot;, { name: &quot;John&quot;, time: &quot;2pm&quot; },
      function(data){
        alert(&quot;Data Loaded: &quot; + data);
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>    $.get(url,<span class="hljs-class"><span class="hljs-keyword">data</span>,success(<span class="hljs-title">response</span>,<span class="hljs-title">status</span>,<span class="hljs-title">xhr</span>),dataType)</span>
    //<span class="hljs-class"><span class="hljs-keyword">data</span>为传入的数据</span>
    //<span class="hljs-string">"xml"</span>,<span class="hljs-string">"html"</span>,<span class="hljs-string">"text"</span>,<span class="hljs-string">"script"</span>,<span class="hljs-string">"json"</span>,<span class="hljs-string">"jsonp"</span>,
    eg:
    $.get(<span class="hljs-string">"test.cgi"</span>, { name: <span class="hljs-string">"John"</span>, time: <span class="hljs-string">"2pm"</span> },
      function(<span class="hljs-class"><span class="hljs-keyword">data</span>){
        <span class="hljs-title">alert</span>("<span class="hljs-type">Data</span> <span class="hljs-type">Loaded</span>: " + <span class="hljs-title">data</span>);
    });</span>
    </code></pre>
<p>2.$.post</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post(url,data,success(data, textStatus, jqXHR),dataType)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>$.post(url,<span class="hljs-class"><span class="hljs-keyword">data</span>,success(<span class="hljs-title">data</span>, <span class="hljs-title">textStatus</span>, <span class="hljs-title">jqXHR</span>),dataType)</span>
</code></pre>
<p>3.$.ajax</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
//常四个参数和一个回调函数
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>$.ajax({
<span class="hljs-comment">//常四个参数和一个回调函数</span>
<span class="hljs-symbol">  url:</span> url,
<span class="hljs-symbol">  data:</span> data,
<span class="hljs-symbol">  success:</span> success,
<span class="hljs-symbol">  dataType:</span> dataType
});
</code></pre>
<p>更多参数和回调函数见:<a href="http://www.w3school.com.cn/jquery/ajax_ajax.asp" rel="nofollow noreferrer" target="_blank">jQuery ajax - ajax() 方法</a><br>4.三种对比<br>$.get和$post是$.ajax的简写形式,三种方法跨域的方法都是jsonp</p>
<h3 id="articleHeader23">5.2 fetch</h3>
<p>1.语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" fetch(url, {
  method: &quot;POST&quot;,//请求方法
  body: JSON.stringify(data),//请求主体
  headers: {
    &quot;Content-Type&quot;: &quot;application/json&quot;//请求头
  },
  mode:cors,//请求的模式，值还可为no-cors 或者 same-origin
  credentials: &quot;same-origin&quot;//请求权限
}).then(function(response) {
  response.status     //=> 请求结果参数number 100–599
  response.statusText //=> 请求结果状态String
  response.headers    //=> 返回头部信息Headers
  response.url        //=> String

response.text()//方法还有json(),blob(),arrayBuffer(),formData()
.then(function(responseText) { ... })
}, function(error) {
  error.message //=> String
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> fetch(url, {
  method: <span class="hljs-string">"POST"</span>,<span class="hljs-comment">//请求方法</span>
  <span class="hljs-selector-tag">body</span>: JSON.stringify(data),<span class="hljs-comment">//请求主体</span>
  headers: {
    <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/json"</span><span class="hljs-comment">//请求头</span>
  },
  mode:cors,<span class="hljs-comment">//请求的模式，值还可为no-cors 或者 same-origin</span>
  credentials: <span class="hljs-string">"same-origin"</span><span class="hljs-comment">//请求权限</span>
}).then(function(response) {
  response<span class="hljs-selector-class">.status</span>     <span class="hljs-comment">//=&gt; 请求结果参数number 100–599</span>
  response<span class="hljs-selector-class">.statusText</span> <span class="hljs-comment">//=&gt; 请求结果状态String</span>
  response<span class="hljs-selector-class">.headers</span>    <span class="hljs-comment">//=&gt; 返回头部信息Headers</span>
  response<span class="hljs-selector-class">.url</span>        <span class="hljs-comment">//=&gt; String</span>

response.text()<span class="hljs-comment">//方法还有json(),blob(),arrayBuffer(),formData()</span>
.then(function(responseText) { ... })
}, function(error) {
  error<span class="hljs-selector-class">.message</span> <span class="hljs-comment">//=&gt; String</span>
})
</code></pre>
<p>2.fetch的get使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url)//options省略表示get
  .then(function(response) {
    return response.json();//生成json,
  }).then(function(data) {
    console.log(data);
  }).catch(function(e) {
    console.log(&quot;Oops, error&quot;);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>fetch(url)<span class="hljs-comment">//options省略表示get</span>
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> {</span>
    <span class="hljs-keyword">return</span> response.json();<span class="hljs-comment">//生成json,</span>
  }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span> {</span>
    console.<span class="hljs-built_in">log</span>(data);
  }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"Oops, error"</span>);
  });</code></pre>
<p>3.fetch的post使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">fetch</span>(<span class="hljs-string">'/users'</span>, {
  <span class="hljs-attribute">method</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attribute">headers</span>: {
    <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
  },
  <span class="hljs-attribute">body</span>: JSON.stringify({
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'Hubot'</span>,
    <span class="hljs-attribute">login</span>: <span class="hljs-string">'hubot'</span>,
  })
})
</code></pre>
<p>fetch的详细使用:<a href="https://segmentfault.com/a/1190000007019545">【译】fetch用法说明</a><br>4.fetch怎么实现跨域</p>
<p>mode的三个值的含义<br>same-origin：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为basic。<br>cors: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response-type为cors。<br>no-cors: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response-type为opaque<br>所以服务器支持则可以设置CORS,不支持可以设置no-cors</p>
<h3 id="articleHeader24">5.3 vue-resource</h3>
<p>1.使用过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*安装*/
npm install vue-resource --save
/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-comment">/*安装*/</span>
npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">resource</span> <span class="hljs-comment">--save</span>
<span class="hljs-comment">/*引入Vue框架*/</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">/*引入资源请求插件*/</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-comment">/*使用VueResource插件*/</span>
Vue.use(VueResource)</code></pre>
<p>2.$http.get</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.get('/someUrl', [options]).then((response) => {
    // 响应成功回调
}, (response) => {
    // 响应错误回调
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/someUrl'</span>, [options]).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
    <span class="hljs-regexp">//</span> 响应成功回调
}, <span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
    <span class="hljs-regexp">//</span> 响应错误回调
});</code></pre>
<p>3.options参数值<br><span class="img-wrap"><img data-src="/img/bV53ko?w=645&amp;h=587" src="https://static.alili.tech/img/bV53ko?w=645&amp;h=587" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如果Web服务器无法处理PUT,PATCH和DELETE这种REST风格的请求，可以启用enulateHTTP现象。启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法</p>
<p>3.$http.post<br>post请求默认的请求类型是request payload,根据上面get和post对比中提到request payload形式对后台获取数据不友好,所以需要将emulateJSON设置为true</p>
<p>4.拦截器(inteceptor)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.interceptors.push({
request: function ( request ) {
    // 更改请求类型为POST
    request.method = 'POST';
    return request;
},
response: function ( response ) {
    // 修改返回数据
    response.data = [{
        custom: 'custom'
    }];
    return response;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.http.interceptors.push({
request: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( request )</span> </span>{
    <span class="hljs-comment">// 更改请求类型为POST</span>
    request.method = <span class="hljs-string">'POST'</span>;
    <span class="hljs-keyword">return</span> request;
},
response: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span> </span>{
    <span class="hljs-comment">// 修改返回数据</span>
    response.data = [{
        custom: <span class="hljs-string">'custom'</span>
    }];
    <span class="hljs-keyword">return</span> response;
}</code></pre>
<p>});</p>
<p>5.跨域</p>
<p>JSONP:</p>
<p>Vue.http.jsonp(url,{params: {name='张三'},jsonp:"_callback"})<br>params是要发送的数据对象，jsonp是设置回调的名称，也就是上面的callback名称；（不设置默认为callback），后台获取发送过去的”_callpack”的值，将这个值拼接到返回的json数据上<br>CORS:<br>如果浏览器支持XMLHttpRequest Level 2在Broswer就可以设置<br>Vue.http.options.xhr = { withCredentials: true }<br>服务端启用支持<br>反向代理:在vue项目下的 config/index.js 文件里面配置代理proxyTable</p>
<h3 id="articleHeader25">5.4 axios</h3>
<p>1.使用过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*安装*/
npm install axios --save
/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import axios from 'axios'
/*使用VueResource插件*/
Vue.use(axios)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-comment">/*安装*/</span>
npm <span class="hljs-keyword">install</span> axios <span class="hljs-comment">--save</span>
<span class="hljs-comment">/*引入Vue框架*/</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">/*引入资源请求插件*/</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-comment">/*使用VueResource插件*/</span>
Vue.use(axios)</code></pre>
<p>2.axios.get</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios#get(url[,config])
axios.get(getUrl, {
    params: {
      'getAjaxDataObj1': getAjaxData.obj1,//obj1为getAjaxData的一个属性
      'getAjaxDataObj2': getAjaxData.obj2
    }
  }).then(data=>{
      //成功返回
  }).catch(err=>{
      //错误返回
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">axios</span><span class="hljs-selector-id">#get</span>(url[,config])
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(getUrl, {
    <span class="hljs-attribute">params</span>: {
      <span class="hljs-string">'getAjaxDataObj1'</span>: getAjaxData.obj1,<span class="hljs-comment">//obj1为getAjaxData的一个属性</span>
      <span class="hljs-string">'getAjaxDataObj2'</span>: getAjaxData.obj2
    }
  })<span class="hljs-selector-class">.then</span>(data=&gt;{
      <span class="hljs-comment">//成功返回</span>
  })<span class="hljs-selector-class">.catch</span>(err=&gt;{
      <span class="hljs-comment">//错误返回</span>
  })</code></pre>
<p>3.axios.post</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios#post(url[,config])
axios.post(postUrl, {
      'postAjaxDataObj1': postAjaxData.obj1,//obj1为postAjaxData的一个属性
      'postAjaxDataObj2': postAjaxData.obj2
  }).then(data=>{
      //成功返回
  }).catch(err=>{
      //错误返回
  })
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>axios<span class="hljs-comment">#post(url[,config])</span>
axios.post(postUrl, {
      <span class="hljs-string">'postAjaxDataObj1'</span>: postAjaxData.obj1,<span class="hljs-comment">//obj1为postAjaxData的一个属性</span>
      <span class="hljs-string">'postAjaxDataObj2'</span>: postAjaxData.obj2
  }).then(data=&gt;{
      <span class="hljs-comment">//成功返回</span>
  }).<span class="hljs-keyword">catch</span>(err=&gt;{
      <span class="hljs-comment">//错误返回</span>
  })
 </code></pre>
<p>4.axios.post请求的问题<br>默认请求数据格式是application/json,如果后台不支持这种form Data形式,则需要:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在Browser中
<1.>设置请求头格式
在config配置headers: {'X-Requested-With':'XMLHttpRequest'},
<2.>格式化数据
方法一:
并引入axios里面内置的qs,不需要重新下载
import qs from 'qs'
axios.post('/foo', qs.stringify({ 'bar': 123 }));
方法二:
let params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);

在node中
let querystring = require('querystring');//直接引入node的querystring模块
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>在Browser中
&lt;<span class="hljs-number">1.</span>&gt;设置请求头格式
在config配置headers: {<span class="hljs-string">'X-Requested-With'</span>:<span class="hljs-string">'XMLHttpRequest'</span>},
&lt;<span class="hljs-number">2.</span>&gt;格式化数据
方法一:
并引入axios里面内置的qs,不需要重新下载
<span class="hljs-keyword">import</span> qs from <span class="hljs-string">'qs'</span>
axios.post(<span class="hljs-string">'/foo'</span>, qs.stringify({ <span class="hljs-string">'bar'</span>: <span class="hljs-number">123</span> }));
方法二:
<span class="hljs-keyword">let</span> <span class="hljs-keyword">params</span> = <span class="hljs-literal">new</span> URLSearchParams();
<span class="hljs-keyword">params</span>.append(<span class="hljs-string">'param1'</span>, <span class="hljs-string">'value1'</span>);
<span class="hljs-keyword">params</span>.append(<span class="hljs-string">'param2'</span>, <span class="hljs-string">'value2'</span>);
axios.post(<span class="hljs-string">'/foo'</span>, <span class="hljs-keyword">params</span>);

在node中
<span class="hljs-keyword">let</span> querystring = <span class="hljs-keyword">require</span>(<span class="hljs-string">'querystring'</span>);<span class="hljs-comment">//直接引入node的querystring模块</span>
axios.post(<span class="hljs-string">'http://something.com/'</span>, querystring.stringify({ foo: <span class="hljs-string">'bar'</span> }));
</code></pre>
<p>4.config的常见参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//`url`是请求的服务器地址
  url:'/user',
  //`method`是请求资源的方式
  method:'get'//default
//如果`url`不是绝对地址，那么`baseURL`将会加到`url`的前面
  //当`url`是相对地址的时候，设置`baseURL`会非常的方便
  baseURL:'https://some-domain.com/api/',
//`headers`选项是需要被发送的自定义请求头信息
  headers: {'X-Requested-With':'XMLHttpRequest'},
//`withCredentails`选项表明了是否是跨域请求
  withCredentials:false,//default
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">//`url`是请求的服务器地址</span>
  url:<span class="hljs-string">'/user'</span>,
  <span class="hljs-comment">//`method`是请求资源的方式</span>
  <span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-string">'get'</span><span class="hljs-comment">//default</span>
<span class="hljs-comment">//如果`url`不是绝对地址，那么`baseURL`将会加到`url`的前面</span>
  <span class="hljs-comment">//当`url`是相对地址的时候，设置`baseURL`会非常的方便</span>
  baseURL:<span class="hljs-string">'https://some-domain.com/api/'</span>,
<span class="hljs-comment">//`headers`选项是需要被发送的自定义请求头信息</span>
  headers: <span class="hljs-comment">{'X-Requested-With':'XMLHttpRequest'}</span>,
<span class="hljs-comment">//`withCredentails`选项表明了是否是跨域请求</span>
  withCredentials:<span class="hljs-keyword">false</span>,<span class="hljs-comment">//default</span>
</code></pre>
<p>详情请见:<a href="https://www.jianshu.com/p/df464b26ae58" rel="nofollow noreferrer" target="_blank">axios</a><br>4.axios的inteceptor(拦截器)</p>
<p>主要分为请求和响应两种拦截器,请求拦截一般就是配置对应的请求头信息(适用与常见请求方法,虽然ajax的get方法没有请求头,但是axios里面进行啦封装),响应一般就是对reponse进行拦截处理,如果返回结果为[]可以转化为0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.request.use(config => {
  config.headers.cityCode = window.sessionStorage.cityCode //jsCookie.get('cityCode')
  return config
},
axios.interceptors.response.use((response) =>{
  let data = response.data
  if(response.request.responseType === 'arraybuffer'&amp;&amp;!data.length){
    reponse.date=0
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  config.headers.cityCode = <span class="hljs-built_in">window</span>.sessionStorage.cityCode <span class="hljs-comment">//jsCookie.get('cityCode')</span>
  <span class="hljs-keyword">return</span> config
},
axios.interceptors.response.use(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span>{
  <span class="hljs-keyword">let</span> data = response.data
  <span class="hljs-keyword">if</span>(response.request.responseType === <span class="hljs-string">'arraybuffer'</span>&amp;&amp;!data.length){
    reponse.date=<span class="hljs-number">0</span>
  }
})</code></pre>
<p>5.跨域<br>CORS:设置config里面的withCredentails为true<br>反向代理:和vue-resource一样<br>JSONP:axios里没有进行封装,但是github推荐了一种方法:<br><span class="img-wrap"><img data-src="/img/bV53wV?w=579&amp;h=272" src="https://static.alili.tech/img/bV53wV?w=579&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>详情请见:<a href="https://github.com/axios/axios/blob/master/COOKBOOK.md#jsonp" rel="nofollow noreferrer" target="_blank">github中JSONP的实现</a></p>
<h3 id="articleHeader26">5.5为什么尤大大放弃维护vue-resource</h3>
<p>我看了一下他的博客,大概意思是vue-resource之前是官方维护的,但是不同的路由和状态管理,ajax并不是一个问题域,需要与Vue核心深度整合,一个纯粹的第三方库能很好解决这个问题<br>原文链接(需要翻墙):<a href="https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4" rel="nofollow noreferrer" target="_blank">Retiring vue-resource</a></p>
<h3 id="articleHeader27">5.6 ajax,$.ajax,vue-resource和axios对比</h3>
<p><span class="img-wrap"><img data-src="/img/bV53Rt?w=561&amp;h=386" src="https://static.alili.tech/img/bV53Rt?w=561&amp;h=386" alt="ajax对比" title="ajax对比" style="cursor: pointer;"></span></p>
<h2 id="articleHeader28">结语</h2>
<blockquote>很开心你还能看到这里,整个文章概念还是挺多的,<br>希望这次梳理对你串联http,ajax,XMLHttpRequest,$ajax,vue-resource和axios有帮助。如果文章内容有错误欢迎指出交流！<br>可以先收藏着,想看的时候再慢慢体会。</blockquote>
<h2 id="articleHeader29">参考文章：</h2>
<p><a href="http://www.runoob.com/http/http-content-type.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/http/ht...</a><br><a href="http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="http://www.techweb.com.cn/network/system/2017-08-17/2575047.shtml" rel="nofollow noreferrer" target="_blank">http://www.techweb.com.cn/net...</a><br><a href="http://blog.csdn.net/u013084331/article/details/51114288" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u0130843...</a><br><a href="http://www.w3school.com.cn/jquery/ajax_ajax.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/jq...</a><br><a href="https://segmentfault.com/a/1190000007019545">https://segmentfault.com/a/11...</a><br><a href="https://www.jianshu.com/p/df464b26ae58" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/df4...</a><br><a href="https://github.com/axios/axios/blob/master/COOKBOOK.md#jsonp" rel="nofollow noreferrer" target="_blank">https://github.com/axios/axio...</a><br><a href="https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4" rel="nofollow noreferrer" target="_blank">https://medium.com/the-vue-po...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
http,ajax,$.ajax,vue-resource,axios的知识大串联

## 原文链接
[https://segmentfault.com/a/1190000013820162](https://segmentfault.com/a/1190000013820162)

