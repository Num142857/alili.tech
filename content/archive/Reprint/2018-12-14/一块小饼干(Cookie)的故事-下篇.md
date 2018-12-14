---
title: '一块小饼干(Cookie)的故事-下篇' 
date: 2018-12-14 2:30:10
hidden: true
slug: 01f99uqnk2g4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>上篇介绍了注册的基本流程，下篇简单的讲讲登录的流程以及Cookie的出现</blockquote>
<h2 id="articleHeader0">实现登录的小功能</h2>
<p>当你在浏览器的输入框里输入<code>localhost:8080/sign_in</code>的时候，会发起<code>GET</code>请求，去访问<code>sign_in.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (path === '/sign_up' &amp;&amp; method === 'GET') {
  let string = fs.readFileSync('./sign_up.html', 'utf8')
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/html;charset=utf-8')
  response.write(string)
  response.end()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (path === <span class="hljs-string">'/sign_up'</span> &amp;&amp; method === <span class="hljs-string">'GET'</span>) {
  <span class="hljs-keyword">let</span> string = fs.readFileSync(<span class="hljs-string">'./sign_up.html'</span>, <span class="hljs-string">'utf8'</span>)
  response.statusCode = <span class="hljs-number">200</span>
  response.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/html;charset=utf-8'</span>)
  response.write(string)
  response.end()
}</code></pre>
<p>CSS布局与上篇的布局基本一样，略去不表～</p>
<h3 id="articleHeader1">比对用户的信息与数据库里面的信息是否匹配</h3>
<p>依然是上篇的套路，获得用户formdata后，分析数据，和数据库里面的比对</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var users = fs.readFileSync('./db/users', 'utf8')
try {
    users = JSON.parse(users) //[] JSON也支持数组
} catch (exception) {
    users = []
}

let found 
for (let i = 0; i < users.length; i++) {
if (users[i].email === email &amp;&amp; users[i].password === password) {
  found = true
  break
  }
}
if (found) {
  response.setHeader('Set-Cookie', `sign_in_email=${email};HTTPOnly`)
  response.statusCode = 200
} else {
  response.statusCode = 401
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> users = fs.readFileSync(<span class="hljs-string">'./db/users'</span>, <span class="hljs-string">'utf8'</span>)
<span class="hljs-keyword">try</span> {
    users = <span class="hljs-built_in">JSON</span>.parse(users) <span class="hljs-comment">//[] JSON也支持数组</span>
} <span class="hljs-keyword">catch</span> (exception) {
    users = []
}

<span class="hljs-keyword">let</span> found 
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++) {
<span class="hljs-keyword">if</span> (users[i].email === email &amp;&amp; users[i].password === password) {
  found = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">break</span>
  }
}
<span class="hljs-keyword">if</span> (found) {
  response.setHeader(<span class="hljs-string">'Set-Cookie'</span>, <span class="hljs-string">`sign_in_email=<span class="hljs-subst">${email}</span>;HTTPOnly`</span>)
  response.statusCode = <span class="hljs-number">200</span>
} <span class="hljs-keyword">else</span> {
  response.statusCode = <span class="hljs-number">401</span>
}</code></pre>
<p>不同的是引入了一个<code>header</code>，也就是今天的主角--<strong>Cookie</strong></p>
<p>其实这和平常上网的情形类似的，有时候我们访问一些购物网站，并没有登录，但是你在购物车里面添加东西了，当你逛了以后再回来的时候，发现购物车里面有你的记录，帮你做这个事的也是cookie。</p>
<blockquote>因为<a href="https://zh.wikipedia.org/wiki/HTTP" rel="nofollow noreferrer" target="_blank">HTTP协议</a>是无状态的，即<a href="https://zh.wikipedia.org/wiki/%E6%9C%8D%E5%8A%A1%E5%99%A8" rel="nofollow noreferrer" target="_blank">服务器</a>不知道用户上一次做了什么，这严重阻碍了<a href="https://zh.wikipedia.org/w/index.php?title=%E4%BA%A4%E4%BA%92%E5%BC%8FWeb%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F&amp;action=edit&amp;redlink=1" rel="nofollow noreferrer" target="_blank">交互式Web应用程序</a>的实现。在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两瓶饮料。最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么，所以Cookie就是用来绕开HTTP的无状态性的“额外手段”之一。服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器<a href="https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6" rel="nofollow noreferrer" target="_blank">会话</a>)中的状态。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249517" src="https://static.alili.tech/img/remote/1460000013249517" alt="设置头" title="设置头" style="cursor: pointer; display: inline;"></span></p>
<p>可以看出，当你在sign_in发起<code>GET</code>请求并设置了<code>Set-Cookie</code>之后，其他的同源的页面，又都会带上<code>Cookie</code>，也就能保证同源的网页向服务器发起请求的时候，服务器能够明白，你己经是登录的用户了，与那些没有拿到cookie的页面区别开来。</p>
<h2 id="articleHeader2">Cookie的入门</h2>
<p>为什么要在cookie里面写上<code>HttpOnly</code>呢，因为这个可以防止有些牛人使用<code>JS</code>修改Cookie的内容。</p>
<ul><li>如果不写这个的话，可以使用<code>js</code>修改的</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249518" src="https://static.alili.tech/img/remote/1460000013249518" alt="js修改cookie" title="js修改cookie" style="cursor: pointer; display: inline;"></span></p>
<p>写了<code>HttpOnly</code>之后将无法修改</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249519?w=739&amp;h=190" src="https://static.alili.tech/img/remote/1460000013249519?w=739&amp;h=190" alt="无法修改" title="无法修改" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">_ga是啥</h3>
<p>这个是Chrome的功能，用于分析cookie的</p>
<p>每一部分的作用详见<a href="https://stackoverflow.com/questions/16102436/what-are-the-values-in-ga-cookie" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h3 id="articleHeader4">Cookie的特点</h3>
<p>通过上述的例子，可以总结几点重要的特点</p>
<ol>
<li>服务器通过 Set-Cookie 响应头设置 Cookie</li>
<li>浏览器得到 Cookie 之后，每次请求都要带上 Cookie</li>
<li>服务器读取 Cookie 就知道登录用户的信息（email）</li>
</ol>
<p>当然了，还有几个问题需要解答一下。</p>
<ol>
<li>Cookie 存在哪<br>存在硬盘的一个文件里面</li>
<li>Cookie会被用户篡改吗？<br>可以，也就是说它并不安全的。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249520?w=1052&amp;h=664" src="https://static.alili.tech/img/remote/1460000013249520?w=1052&amp;h=664" alt="不安全" title="不安全" style="cursor: pointer;"></span></p>
<ol><li>Cookie 有效期吗？</li></ol>
<p>默认有效期20分钟左右，不同浏览器策略不同<br>后端可以强制设置有效期</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Set</span>-Cookie: &lt;cookie-name&gt;=&lt;cookie-value&gt;; Expires=&lt;date&gt;
Set-Cookie: &lt;cookie-name&gt;=&lt;cookie-value&gt;; Max-Age=&lt;non-zero-digit&gt;</code></pre>
<p>具体语法看 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie" rel="nofollow noreferrer" target="_blank">Set-Cookie</a></p>
<h3 id="articleHeader5">用户登录后，首页显示不同</h3>
<p>既然你成功登录，理应跳转到首页，并显示相应的界面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post('/sign_in', hash)
.then((response) => {
  window.location.href = '/'
}, 
(request) => {
  alert('邮箱与密码不匹配')
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.post(<span class="hljs-string">'/sign_in'</span>, hash)
.then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">'/'</span>
}, 
(request) =&gt; {
  alert(<span class="hljs-string">'邮箱与密码不匹配'</span>)
  }
)</code></pre>
<p>然后首页的信息应该根据用户信息做出相应的变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cookies = request.headers.cookie.split('; ') //['email=..@..', 'a=1']
let hash = {}
cookies.forEach((cookie) => {
  let parts = cookie.split('=')
  let key = parts[0]
  let value = parts[1]
  hash[key] = value
})
let email = hash.sign_in_email
let users = fs.readFileSync('./db/users', 'utf8')
users = JSON.parse(users)
let foundUser
for (let i = 0; i < users.length; i++) {
  if (users[i].email === email) {
    foundUser = users[i]
    break
  }
}
if (foundUser) {
  string = string.replace('email', foundUser.email)
} else {
  string = string.replace('恭喜，email你已成功登录', '没有该用户')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> cookies = request.headers.cookie.split(<span class="hljs-string">'; '</span>) <span class="hljs-comment">//['email=..@..', 'a=1']</span>
<span class="hljs-keyword">let</span> hash = {}
cookies.forEach(<span class="hljs-function">(<span class="hljs-params">cookie</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> parts = cookie.split(<span class="hljs-string">'='</span>)
  <span class="hljs-keyword">let</span> key = parts[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">let</span> value = parts[<span class="hljs-number">1</span>]
  hash[key] = value
})
<span class="hljs-keyword">let</span> email = hash.sign_in_email
<span class="hljs-keyword">let</span> users = fs.readFileSync(<span class="hljs-string">'./db/users'</span>, <span class="hljs-string">'utf8'</span>)
users = <span class="hljs-built_in">JSON</span>.parse(users)
<span class="hljs-keyword">let</span> foundUser
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++) {
  <span class="hljs-keyword">if</span> (users[i].email === email) {
    foundUser = users[i]
    <span class="hljs-keyword">break</span>
  }
}
<span class="hljs-keyword">if</span> (foundUser) {
  string = string.replace(<span class="hljs-string">'email'</span>, foundUser.email)
} <span class="hljs-keyword">else</span> {
  string = string.replace(<span class="hljs-string">'恭喜，email你已成功登录'</span>, <span class="hljs-string">'没有该用户'</span>)
}</code></pre>
<p>这里的代码逻辑与上篇的基本一致，唯一的不同在于第一行代码</p>
<p><code>let cookies = request.headers.cookie.split('; ') //['email=..@..', 'a=1']</code></p>
<p>为什么用<code>； </code>字符来分割呢，这是因为可以有多个cookie</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249521?w=807&amp;h=214" src="https://static.alili.tech/img/remote/1460000013249521?w=807&amp;h=214" alt="多个cookie" title="多个cookie" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">Cookie的两个作用</h3>
<p>一般来说常见的作用有如下两个：</p>
<ol>
<li>识别用户的身份。当用户A去访问<code>localhost:8080</code>的时候，服务器会给A一个独一无二的<code>id=00A</code>(这就是cookie)，当用户A访问<code>localhost:8080</code>的其他网页的时候，都会带着那个独一无二的id。当B用户来访问<code>localhost:8080</code>的时候，服务器发现他没有任何标识，也会给他一个独一无二的<code>id=00B</code>，所以借助cookie服务器端就能够分清楚谁是谁了。</li>
<li>记录你的浏览历史。最常见的需求就是你去逛购物网站，你添加到购物车里面的东西过几天一定会在，而不会凭空消失了。例如A用户去<code>taobao.com</code>去买点东西，添加了一个热水壶、一部小米手机到购物车里面，那么服务器端可以改写你上面的cookie使之具体化「id=00A; cart=A1,A2」，表示你购物车里面买了俩东西。你过几天想起来了，去购物车里面看，热水壶、小米手机还在里面。浏览器并不会删除你存到硬盘上的cookie。</li>
</ol>
<h3 id="articleHeader7">一张图总结注册登录的过程</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013249522?w=997&amp;h=740" src="https://static.alili.tech/img/remote/1460000013249522?w=997&amp;h=740" alt="登录注册的过程" title="登录注册的过程" style="cursor: pointer; display: inline;"></span></p>
<p>接下来可以去搞一搞其他的，像什么<code>session</code> <code>LocalStorage</code>……(<em>@ο@</em>) 哇～</p>
<p>代码链接<a href="https://github.com/codevvvv9/AJAXDemo_nodeJsServer/blob/master/sign_in.html" rel="nofollow noreferrer" target="_blank">sign_in.html</a></p>
<p><a href="https://github.com/codevvvv9/AJAXDemo_nodeJsServer/blob/master/server.js" rel="nofollow noreferrer" target="_blank">server.js</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一块小饼干(Cookie)的故事-下篇

## 原文链接
[https://segmentfault.com/a/1190000013249512](https://segmentfault.com/a/1190000013249512)

