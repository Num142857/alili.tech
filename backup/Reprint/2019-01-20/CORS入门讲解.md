---
title: 'CORS入门讲解' 
date: 2019-01-20 2:30:11
hidden: true
slug: 2swlj7tipi4
categories: [reprint]
---

{{< raw >}}

            <p><img src="http://50linesofco.de/images/avatar.jpg" alt=""></p>
<h1><a href="http://50linesofco.de/">50 lines of code</a></h1>
<p>The /var/log of <a href="http://geekonaut.de">Martin Splitt</a></p>
<ul>
<li><a href="http://50linesofco.de/#one">About</a></li>
<li><a href="http://50linesofco.de/#top">The greatest</a></li>
<li><a href="http://50linesofco.de/#latest">The latest</a></li>
<li><p><a href="http://50linesofco.de/articles">All articles</a></p>
</li>
<li><p><a href="https://twitter.com/g33konaut">Twitter</a></p>
</li>
<li><a href="https://github.com/avgp">Github</a></li>
<li><a href="https://50linesofco.de/rss.xml">RSS</a></li>
</ul>
<h2>CORS - 目录</h2>
<h1>CORS - 目录</h1>
<h2>总结</h2>
<ul>
<li>浏览器为了避免从别的不同源的网站获得资源，会强制执行<a href="https://en.wikipedia.org/wiki/Same-origin_policy">同源策略</a></li>
<li>同源策略不会阻止不同源的请求，除了请求javascript</li>
<li>带有<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a>头的请求允许跨域请求</li>
<li>带有证书跨域请求（CORS）的注意事项</li>
<li>CORS是一个浏览器强制策略，其他不在浏览器上的应用不会受它影响</li>
</ul>
<h2>其他例子</h2>
<p>这里我会展示一部分代码，更全的代码在这 <a href="https://github.com/avgp/cors-demo-app">full example is available on Github</a>.</p>
<p>让我们开始吧，我们做了一个网站接口， 在<code>http://good.com:8000/public</code>上做了一个公共的API接口</p>
<pre><code class="hljs javascript">app.get(<span class="hljs-string">'/public'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-built_in">JSON</span>.stringify({
    <span class="hljs-attr">message</span>: <span class="hljs-string">'This is public'</span>
  }));
})

</code></pre><p>同时我们有一个简单的登陆接口，用户需要输入密码并且设置cookie，从而认证用户身份</p>
<pre><code class="hljs actionscript">app.post(<span class="hljs-string">'/login'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">if</span>(req.body.password === <span class="hljs-string">'secret'</span>) {
    req.session.loggedIn = <span class="hljs-literal">true</span>
    res.send(<span class="hljs-string">'You are now logged in!'</span>)
  } <span class="hljs-keyword">else</span> {
    res.send(<span class="hljs-string">'Wrong password.'</span>)
  }
})

</code></pre><p>我们设置了一些私有数据仅仅为我们的用户服务
We use this to protect some private data we made available to our users at <code>/private</code>.</p>
<pre><code class="hljs javascript">app.get(<span class="hljs-string">'/private'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">if</span>(req.session.loggedIn === <span class="hljs-literal">true</span>) {
    res.send(<span class="hljs-built_in">JSON</span>.stringify({
      <span class="hljs-attr">message</span>: <span class="hljs-string">'THIS IS PRIVATE'</span>
    }))
  } <span class="hljs-keyword">else</span> {
    res.send(<span class="hljs-built_in">JSON</span>.stringify({
      <span class="hljs-attr">message</span>: <span class="hljs-string">'Please login first'</span>
    }))
  }
})

</code></pre><h2>在其他域通过AJAX访问我们的API</h2>
<p>现在我们的API设计的并不是很精妙，但是我们可以从/public这个URL请求到一些数据。
我们的服务端在<code>good.com:300/public</code>上，客户端在 <code>thirdparty.com</code>这个上，客户端请求可能是这样的：</p>
<pre><code class="hljs coffeescript">fetch(<span class="hljs-string">'http://good.com:3000/public'</span>)
  .<span class="hljs-keyword">then</span>(response =&gt; response.text())
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(result)</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.body.textContent = result
  })

</code></pre><p>但是这段代码不能工作！</p>
<p>让我们看一下在<code>http://thirdparty.com</code>（客户端）上的network 标签</p>
<p><img src="http://50linesofco.de/images/post-images/cors/network-before-cors.png" alt="The network request was successful"></p>
<p>可以看到请求失败了，原因在如下的打印中可以找到：  </p>
<p><img src="http://50linesofco.de/images/post-images/cors/js-errors-without-cors.png" alt="The console shows that a missing CORS header causes the problem"></p>
<p>奥！我们没有带<code>Access-Control-Allow-Origin</code>请求头，但是我们为什么需要它并且它有什么好处呢？</p>
<h2>同源策略</h2>
<p>我们不能得到数据的原因是因为 _同源策略 _，这个策略目的在于确保网站不会得到其他网站的数据，并且在浏览器上强制执行</p>
<p>例如：如果你正在浏览<code>example.org</code> 这个网站，你不会希望这个网站去请求你的银行所在的站点并且得到你的账户信息</p>
<p>同源策略正是为了阻止这样的事情发生</p>
<p>这里的‘同源’由三部分组成：</p>
<ul>
<li>同协议（例如：<code>http</code>）</li>
<li>同域名（例如：<code>exam</code>）</li>
<li>通端口（例如：<code>8000</code>）</li>
</ul>
<p>所以 <code>http://example.org</code> ， <code>http://www.example.org</code> ， <code>https://example.org</code> 是三个不同源的站点</p>
<h2>小心CSRF攻击</h2>
<p>注意有一种叫做<em>跨站请求伪造</em>（下文称CSRF）的攻击，并不会受同源策略限制
在CSRF攻击中，攻击者通过在网站中制造一个请求，例如向你的银行发送一个请求，如果此时你在你的银行里的session仍可用，那么任何网站都可以悄悄制造一个攻击，除非你的银行采取针对CSRF攻击的保护措施</p>
<p>注意尽管受到同源政策的影响，我们在例子中从<code>thirdparty.com</code>向<code>good.com</code>发起的请求还是被执行了，对于CSRF攻击来说并不需要获得响应...</p>
<p>例如，一个通过发起POST请求就可以发送email的接口，攻击者并不在乎我们是否给它一个正确的数据，他们在乎的是邮件是否会发送而不是API是否会返回一个正确的回应。</p>
<h2>改造公共API用于跨域请求（CORS）</h2>
<p>现在我们确实想让第三方网站去访问我们的公共API（例如<code>thirdparty.com</code>），我们按报错提示去添加CORS响应头</p>
<pre><code class="hljs vim">app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/public'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>)
  <span class="hljs-keyword">res</span>.send(...)
})

</code></pre><p>这里我们设置了<code>Access-Control-Allow-Origin</code>头为<code>*</code>，意味着所有的域都可以访问这个URL资源并且浏览器的回复如下：</p>
<p><img src="http://50linesofco.de/images/post-images/cors/basic-cors.png" alt="The response is available once we set the CORS header"></p>
<h2>非简单请求和预请求</h2>
<p>之前的例子我们称之为<em>简单请求</em>，简单请求是<code>GET</code>或者<code>POST</code>并且只允许一部分请求头和值</p>
<p>现在<code>thirdparty.com</code>改变了接受内容为JSON格式</p>
<pre><code class="hljs coffeescript">fetch(<span class="hljs-string">'http://good.com:3000/public'</span>, {
  headers: {
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
  }
})
  .<span class="hljs-keyword">then</span>(response =&gt; response.json())
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(result)</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.body.textContent = result.message
  })

</code></pre><p>但是这使我们的请求再次失效，network面板给出了解释：</p>
<p><img src="http://50linesofco.de/images/post-images/cors/cors-preflight.png" alt="The request has been preflighted with an OPTIONS request"></p>
<p>任何不使用<code>GET</code>或者<code>POST</code>方法或者请求头Content-type包括如下</p>
<ul>
<li><code>text/plain</code></li>
<li><code>application/x-www-form-urlencoded</code></li>
<li><code>multipart/form-data</code></li>
</ul>
<p>这些都不是<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests">简单请求</a>  ，我们称之为<em>预请求</em>.</p>
<p>预请求这个机制意味着服务器能决定是否给我们服务，服务器设置 <code>Access-Control-Request-Headers</code>和<code>Access-Control-Request-Method</code>两个请求头告诉服务器请求内容，服务器会给我们相应的响应头</p>
<p>现在我们的服务器还不支持预请求，我们需要增加如下：</p>
<pre><code class="hljs vim">app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/public'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>)
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'GET, OPTIONS'</span>)
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Headers'</span>, <span class="hljs-string">'Content-Type'</span>)
  <span class="hljs-keyword">res</span>.send(JSON.stringify({
    message: <span class="hljs-string">'This is public info'</span>
  }))
})

</code></pre><p>现在 <code>thirdparty.com</code>又可以得到响应了</p>
<h2>证书和CORS</h2>
<p>现在让我们设置让good.com上的/private敏感资源可以被访问</p>
<p>设置了这么多CORS选项，其他网站例如<code>evil.com</code>能得到这个敏感资源么</p>
<p>例如：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">fetch</span><span class="hljs-params">(<span class="hljs-string">'http://good.com:3000/private'</span>)</span></span>
  .then(response =&gt; response.text())
  .then((result) =&gt; {
    let output = document.createElement(<span class="hljs-string">'div'</span>)
    output<span class="hljs-selector-class">.textContent</span> = result
    document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.appendChild</span>(output)
  })

</code></pre><p>显然无论我们是否登陆good.com，我们都会看到 "Please login first"</p>
<p>原因是在good.com上的cookie不会被其他不同源的页面发送。例如evil.com。我们可以告诉客户端发送cookie，即使它是跨域的。</p>
<pre><code class="hljs coffeescript">fetch(<span class="hljs-string">'http://good.com:3000/private'</span>, {
  credentials: <span class="hljs-string">'include'</span>
})
  .<span class="hljs-keyword">then</span>(response =&gt; response.text())
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(result)</span> =&gt;</span> {
    let output = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
    output.textContent = result
    <span class="hljs-built_in">document</span>.body.appendChild(output)
  })

</code></pre><p>但是它仍然不工作</p>
<p>想象任何站点都可以制造这样一个带有认证的请求，但是并不会发送正确的cookie，并且得到的响应也不会是正确的</p>
<p>所以，我们不想让evil.com去得到我们的敏感信息,但是如果我们想让thirdparty.com得到
<code>/private</code>这个敏感信息呢？我们需要设置请求头<code>Access-Control-Allow-Credentials</code>为<code>true</code></p>
<pre><code class="hljs vim">app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/private'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>)
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, <span class="hljs-string">'true'</span>)
  <span class="hljs-keyword">if</span>(req.session.loggedIn === true) {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'THIS IS THE SECRET'</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'Please login first'</span>)
  }
})

</code></pre><p>仍不工作。让所有的认证的请求都可以跨域是非常危险的行为</p>
<p>客户端不会让人们这么容易犯错</p>
<p>当我们想让thirdparty.com得到 <code>/private</code>的内容时我们可以在响应头中这样声明：</p>
<pre><code class="hljs vim">app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/private'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'http://thirdparty.com:8000'</span>)
  <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, <span class="hljs-string">'true'</span>)
  <span class="hljs-keyword">if</span>(req.session.loggedIn === true) {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'THIS IS THE SECRET'</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'Please login first'</span>)
  }
})

</code></pre><p>现在<code>http://thirdparty:8000</code>有权利去得到敏感数据了，而evil.com是被禁止的</p>
<h2>白名单</h2>
<p>现在我们允许了一个源的请求可以跨域，但是如果我们需要设置多个呢？
Now we have allowed one origin to do cross origin requests with authentication data. But what if we have multiple third parties?
在这里，我们可能需要用到白名单
In this case, we probably want to use a whitelist:</p>
<pre><code class="hljs vim">const ALLOWED_ORIGINS = [
  <span class="hljs-string">'http://anotherthirdparty.com:8000'</span>,
  <span class="hljs-string">'http://thirdparty.com:8000'</span>
]

app.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/private'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
  <span class="hljs-keyword">if</span>(ALLOWED_ORIGINS.indexOf(req.headers.origin) &gt; -<span class="hljs-number">1</span>) {
    <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, <span class="hljs-string">'true'</span>)
    <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, req.headers.origin)
  } <span class="hljs-keyword">else</span> { // allow other origins <span class="hljs-keyword">to</span> <span class="hljs-keyword">make</span> unauthenticated CORS requests
    <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>)        
  }

  <span class="hljs-keyword">if</span>(req.session.loggedIn === true) {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'THIS IS THE SECRET'</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">res</span>.send(<span class="hljs-string">'Please login first'</span>)
  }
})

</code></pre><p><strong>提醒: 不要直接设置`req.headers.origin为你的CORS值，这会让所有网站都可以跨域请求你的站点资源.</strong> 可能会有例外，但当设置所有站点都为CORS值的时候请慎重考虑</p>
<h2>总结</h2>
<p>在这篇文章中我们学习了 <a href="https://en.wikipedia.org/wiki/Same-origin_policy">同源策略</a>并且我们学会了使用<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a>去应对跨域请求</p>
<p>这需要客户端和服务端的支持，并且可能会需要预请求</p>
<p>另外需要注意的是当处理认证的跨域请求时，设置一个白名单可以防止我们泄露隐私数据</p>
<ul>
<li>© Geekonaut. All rights reserved.</li>
<li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CORS入门讲解

## 原文链接
[https://www.zcfy.cc/article/a-href-50-lines-of-code-a](https://www.zcfy.cc/article/a-href-50-lines-of-code-a)

