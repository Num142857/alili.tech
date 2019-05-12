---
title: 'jsonp-反向代理-CORS解决JS跨域问题的个人总结' 
date: 2018-12-16 2:30:10
hidden: true
slug: do07xw20cru
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">jsonp-反向代理-CORS解决JS跨域问题的个人总结</h1>
<blockquote>网上说了很多很多，但是看完之后还是很混乱，所以我自己重新总结一下。</blockquote>
<p>解决 js 跨域问题一共有8种方法，</p>
<ol>
<li>jsonp（只支持 get）</li>
<li>反向代理</li>
<li>CORS</li>
<li>document.domain + iframe 跨域</li>
<li>window.name + iframe 跨域</li>
<li>window.postMessage</li>
<li>location.hash + iframe</li>
<li>web sockets</li>
</ol>
<p>各个方法都有各自的优缺点，但是目前前端开发方面比较常用的是 jsonp，反向代理，CORS：</p>
<ul>
<li>
<p>CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。优点是正统，符合标准，缺点是：</p>
<ul><li>但是需要服务器端配合，比较麻烦。</li></ul>
</li>
<li>
<p>JSONP 优点是对旧式浏览器支持较好，缺点是：</p>
<ul>
<li>但是只支持 get 请求。</li>
<li>有安全问题(请求代码中可能存在安全隐患)。</li>
<li>要确定jsonp请求是否失败并不容易</li>
</ul>
</li>
<li>
<p>反向代理都能够兼容以上的确定，但是仅仅作为前端开发模式的时候使用，在正式上线环境较少用到。</p>
<ul>
<li>因为开发环境的域名跟线上环境不一样才需要这样处理。</li>
<li>如果线上环境太复杂，本身也是多域（后面说到的同源策略问题，多子域，或者多端口问题），那么需要采用 jsonp 或者 CORS 来处理。</li>
</ul>
</li>
</ul>
<blockquote>这里主要说明这三种方式。其他方式暂不说明。</blockquote>
<h2 id="articleHeader1">一、什么是跨域问题</h2>
<p>跨域问题一般只出现在前端开发中使用 javascript 进行网络请求的时候，浏览器为了安全访问网络请求的数据而进行的限制。</p>
<p>提示的错误大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://XXXXXX' is therefore not allowed access." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">No <span class="hljs-string">'Access-Control-Allow-Origin'</span> header is present on the requested resource. Origin <span class="hljs-string">'http://XXXXXX'</span> is therefore not allowed access.</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2zyk?w=979&amp;h=528" src="https://static.alili.tech/img/bV2zyk?w=979&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">二、为什么会出现跨域问题</h2>
<p>因为浏览器收到同源策略的限制，当前域名的js只能读取同域下的窗口属性。</p>
<h3 id="articleHeader3">2.1 同源策略</h3>
<p>同源指的是三个源头同时相同：</p>
<ul>
<li>协议相同</li>
<li>域名相同</li>
<li>端口相同</li>
</ul>
<p>举例来说，<code>http://www.example.com/dir/page.html</code>这个网址，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="协议是 http://
域名是 www.example.com
端口是80 

//它的同源情况如下：
http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">协议是 http:<span class="hljs-comment">//</span>
域名是 www.example.com
端口是<span class="hljs-number">80</span> 

<span class="hljs-comment">//它的同源情况如下：</span>
http:<span class="hljs-comment">//www.example.com/dir2/other.html：同源</span>
http:<span class="hljs-comment">//example.com/dir/other.html：不同源（域名不同）</span>
http:<span class="hljs-comment">//v2.www.example.com/dir/other.html：不同源（域名不同）</span>
http:<span class="hljs-comment">//www.example.com:81/dir/other.html：不同源（端口不同）</span></code></pre>
<p>同源策略限制了以下行为：</p>
<ul>
<li>Cookie、LocalStorage 和 IndexDB 无法读取</li>
<li>DOM 和 JS 对象无法获取</li>
<li>Ajax请求发送不出去</li>
</ul>
<blockquote>大概可以知道跨域其实就是同源策略导致的，并且知道同源策略的原理。</blockquote>
<p>详细的同源策略相关，可以参考<a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html</a></p>
<h2 id="articleHeader4">三、解决跨域问题</h2>
<h3 id="articleHeader5">3.1 反向代理方式</h3>
<p>反向代理和正向代理的区别：</p>
<ul>
<li>正向代理（Forward Proxy），通常都被简称为代理，就是在用户无法正常访问外部资源，比方说受到GFW的影响无法访问twitter的时候，我们可以通过代理的方式，让用户绕过防火墙，从而连接到目标网络或者服务。</li>
<li>反向代理（Reverse Proxy）是指以代理服务器来接受 Internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 Internet 请求连接的客户端，此时，代理服务器对外就表现为一个服务器。</li>
</ul>
<p>那么我们可以理解为反向代理</p>
<p>如何使用反向代理服务器来达到跨域问题解决：</p>
<ul>
<li>前端ajax请求的是本地反向代理服务器</li>
<li>
<p>本地反向代理服务器接收到后：</p>
<ul>
<li>修改请求的 http-header 信息，例如 referer，host，端口等</li>
<li>修改后将请求发送到实际的服务器</li>
</ul>
</li>
<li>实际的服务器会以为是同源（参考同源策略）的请求而作出处理</li>
</ul>
<p>现在前端开发一般使用 nodejs来做本地反向代理服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在 express 之后引入路由
var app = express();

var apiRoutes = express.Router();

app.use(bodyParser.urlencoded({extended:false}))

// 自定义 api 路由
apiRoutes.get(&quot;/lyric&quot;, function (req, res) {
  var url = &quot;https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg&quot;;

  axios.get(url, {
    headers: { // 修改 header
      referer: &quot;https://c.y.qq.com/&quot;,
      host: &quot;c.y.qq.com&quot;
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === &quot;string&quot;) {
      var reg = /^\w+\(({[^()]+})\)$/;
      var matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
});

// 使用这个路由
app.use(&quot;/api&quot;, apiRoutes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在 express 之后引入路由</span>
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-keyword">var</span> apiRoutes = express.Router();

app.use(bodyParser.urlencoded({<span class="hljs-attr">extended</span>:<span class="hljs-literal">false</span>}))

<span class="hljs-comment">// 自定义 api 路由</span>
apiRoutes.get(<span class="hljs-string">"/lyric"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> url = <span class="hljs-string">"https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg"</span>;

  axios.get(url, {
    <span class="hljs-attr">headers</span>: { <span class="hljs-comment">// 修改 header</span>
      referer: <span class="hljs-string">"https://c.y.qq.com/"</span>,
      <span class="hljs-attr">host</span>: <span class="hljs-string">"c.y.qq.com"</span>
    },
    <span class="hljs-attr">params</span>: req.query
  }).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> ret = response.data
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">"string"</span>) {
      <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/^\w+\(({[^()]+})\)$/</span>;
      <span class="hljs-keyword">var</span> matches = ret.match(reg);
      <span class="hljs-keyword">if</span> (matches) {
        ret = <span class="hljs-built_in">JSON</span>.parse(matches[<span class="hljs-number">1</span>])
      }
    }
    res.json(ret)
  }).catch(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(e)
  })
});

<span class="hljs-comment">// 使用这个路由</span>
app.use(<span class="hljs-string">"/api"</span>, apiRoutes);</code></pre>
<h3 id="articleHeader6">3.2 JSONP 方式</h3>
<p>JSONP有些文章会叫动态创建script，因为他确实是动态写入 script 标签的内容从而达到跨域的效果：</p>
<ul>
<li>AJAX 无法跨域是受到“同源政策”的限制，但是带有src属性的标签（例如<code>&lt;script&gt;、&lt;img&gt;、&lt;iframe&gt;</code>）是不受该政策限制的，因此我们可以通过向页面中动态添加<code>&lt;script&gt;</code>标签来完成对跨域资源的访问，这也是 JSONP 方案最核心的原理，换句话理解，就是利用了【前端请求静态资源的时候不存在跨域问题】这个思路。</li>
<li>JSONP（JSON with Padding）是数据格式JSON的一种“使用模式”。</li>
<li>JSONP 只能用 get 方式。</li>
</ul>
<p>实现 jsonp 的方式：</p>
<p><span class="img-wrap"><img data-src="/img/bV2zyp?w=800&amp;h=622" src="https://static.alili.tech/img/bV2zyp?w=800&amp;h=622" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>引用来自<a href="https://segmentfault.com/a/1190000012469713">https://segmentfault.com/a/1190000012469713</a>的图</p>
<ul>
<li>客户端和服务器端约定一个参数名是代表 jsonp 请求的，例如约定 callback 这个参数名。</li>
<li>然后服务器端准备好针对之前约定的 callback 参数请求的 javascript 文件，这个文件里面要有一个函数名，要跟客户端请求的时候的函数名要保持一致。（如下面例子：<code>ip.js</code>）</li>
<li>然后客户端注册一个本地运行的函数,并且函数的名字要跟去请求服务器进行 callback 回调的函数的名字要一致。（如下面例子：foo 函数跟请求时候<code>callback=foo</code>的名字是一致的）</li>
<li>然后客户端对服务器端进行 <code>jsonp 的方式</code>请求。</li>
<li>服务器端返回刚才配置好的js 文件（<code>ip.js</code>）到客户端</li>
<li>
<p>客户端浏览器，解析script标签，并执行返回的javascript文件，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里。</p>
<ul><li>相当于本地执行注册好foo 函数，然后获取了一个foo 函数，并且这个获取的 foo 函数里面包含了传入的参数（例如 <code>foo({XXXXX})</code>）</li></ul>
</li>
</ul>
<p>这是一个实例 demo：</p>
<p>服务器端文件<code>ip.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo({
  &quot;ip&quot;: &quot;8.8.8.8&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo({
  <span class="hljs-string">"ip"</span>: <span class="hljs-string">"8.8.8.8"</span>
});</code></pre>
<p>客户端文件 <code>jsonp.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <title></title>
    <script>
        // 动态插入 script 标签到 html 中
        function addScriptTag(src) {
          var script = document.createElement('script');
          script.setAttribute(&quot;type&quot;,&quot;text/javascript&quot;);
          script.src = src;
          document.body.appendChild(script);
        }
        // 获取 jsonp 文件
        window.onload = function () {
          addScriptTag('http://example.com/ip?callback=foo');
        }
        // 执行本地的 js 逻辑，这个要跟获取到的 jsonp 文件的函数要一致
        function foo(data) {
          console.log('Your public IP address is: ' + data.ip);
        };
    </script>
</head>
<body>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html PUBLIC <span class="hljs-string">"-//W3C//DTD XHTML 1.0 Transitional//EN"</span> <span class="hljs-string">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// 动态插入 script 标签到 html 中</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addScriptTag</span>(<span class="hljs-params">src</span>) </span>{
          <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
          script.setAttribute(<span class="hljs-string">"type"</span>,<span class="hljs-string">"text/javascript"</span>);
          script.src = src;
          <span class="hljs-built_in">document</span>.body.appendChild(script);
        }
        <span class="hljs-comment">// 获取 jsonp 文件</span>
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          addScriptTag(<span class="hljs-string">'http://example.com/ip?callback=foo'</span>);
        }
        <span class="hljs-comment">// 执行本地的 js 逻辑，这个要跟获取到的 jsonp 文件的函数要一致</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">data</span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Your public IP address is: '</span> + data.ip);
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h3 id="articleHeader7">3.3 CORS 方式</h3>
<p>CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出<code>XMLHttpRequest</code>请求，从而克服了AJAX只能同源使用的限制。</p>
<ul>
<li>CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。</li>
<li>整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。<strong>浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。</strong>
</li>
</ul>
<blockquote>因此，实现CORS通信的关键是服务器端。只要服务器端实现了CORS接口，就可以跨源通信。</blockquote>
<h4>3.3.1 CORS的请求分为两类：</h4>
<ul>
<li>简单请求</li>
<li>非简单请求</li>
</ul>
<p>只要同时满足以下两大条件，就属于简单请求。</p>
<p>（1) 请求方法是以下三种方法之一：</p>
<ul>
<li>HEAD</li>
<li>GET</li>
<li>POST</li>
</ul>
<p>（2）HTTP的头信息不超出以下几种字段：</p>
<ul>
<li>Accept</li>
<li>Accept-Language</li>
<li>Content-Language</li>
<li>Last-Event-ID</li>
<li>Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain</li>
</ul>
<p>凡是不同时满足上面两个条件，就属于非简单请求。</p>
<h4>3.3.2 简单请求</h4>
<p>如果是简单请求的话，会自动在头信息之中，添加一个Origin字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /cors HTTP/1.1
Origin: http://api.bob.com 
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">GET /cors HTTP/<span class="hljs-number">1.1</span>
Origin: http:<span class="hljs-comment">//api.bob.com </span>
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/<span class="hljs-number">5.0</span>...</code></pre>
<p>这个Origin对应服务器端的<code>Access-Control-Allow-Origin</code>设置，所以一般来说需要在服务器端加上这个<code>Access-Control-Allow-Origin 指定域名|*</code></p>
<h4>3.3.3 非简单请求</h4>
<p>如果是非简单请求的话，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。</p>
<p>浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。</p>
<blockquote>需要注意这里是会发送2次请求，第一次是预检请求，第二次才是真正的请求！</blockquote>
<p><strong>首先发出预检请求：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 预检请求
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0.." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 预检请求</span>
OPTIONS /cors HTTP/<span class="hljs-number">1.1</span>
Origin: http:<span class="hljs-comment">//api.bob.com</span>
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/<span class="hljs-number">5.0</span>..</code></pre>
<p>除了Origin字段，"预检"请求的头信息包括两个特殊字段。</p>
<p>（1）<code>Access-Control-Request-Method</code></p>
<p>该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。</p>
<p>（2）<code>Access-Control-Request-Headers</code></p>
<p>该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。</p>
<p><strong>然后服务器收到"预检"请求以后：</strong></p>
<p>检查了<code>Origin</code>、<code>Access-Control-Request-Method</code>和<code>Access-Control-Request-Headers</code>字段以后，确认允许跨源请求，就可以做出回应。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 预检请求的回应
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 预检请求的回应</span>
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
<span class="hljs-built_in">Date</span>: Mon, <span class="hljs-number">01</span> Dec <span class="hljs-number">2008</span> <span class="hljs-number">01</span>:<span class="hljs-number">15</span>:<span class="hljs-number">39</span> GMT
Server: Apache/<span class="hljs-number">2.0</span><span class="hljs-number">.61</span> (Unix)
Access-Control-Allow-Origin: http:<span class="hljs-comment">//api.bob.com</span>
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf<span class="hljs-number">-8</span>
Content-Encoding: gzip
Content-Length: <span class="hljs-number">0</span>
Keep-Alive: timeout=<span class="hljs-number">2</span>, max=<span class="hljs-number">100</span>
Connection: Keep-Alive
Content-Type: text/plain</code></pre>
<p><strong>最后一旦服务器通过了"预检"请求：</strong></p>
<p>以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以后的请求，就像拿到了通行证之后，就不需要再做预检请求了。
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 以后的请求，就像拿到了通行证之后，就不需要再做预检请求了。</span>
PUT /cors HTTP/<span class="hljs-number">1.1</span>
Origin: http:<span class="hljs-comment">//api.bob.com</span>
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/<span class="hljs-number">5.0</span>...</code></pre>
<p>详情参考这里<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2016/04/cors.html</a></p>
<hr>
<p>参考文档：</p>
<ul>
<li><a href="http://web.jobbole.com/88524/" rel="nofollow noreferrer" target="_blank">前端解决跨域问题的8种方案</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html" rel="nofollow noreferrer" target="_blank">浏览器同源政策及其规避方法</a></li>
<li><a href="https://tonghuashuo.github.io/blog/jsonp.html" rel="nofollow noreferrer" target="_blank">https://tonghuashuo.github.io/blog/jsonp.html</a></li>
<li><a href="http://www.cnblogs.com/yuzhongwusan/archive/2012/12/11/2812849.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/yuzhongwusan/archive/2012/12/11/2812849.html</a></li>
<li><a href="http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html</a></li>
<li><a href="https://segmentfault.com/a/1190000002438126">https://segmentfault.com/a/1190000002438126</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsonp-反向代理-CORS解决JS跨域问题的个人总结

## 原文链接
[https://segmentfault.com/a/1190000012967320](https://segmentfault.com/a/1190000012967320)

