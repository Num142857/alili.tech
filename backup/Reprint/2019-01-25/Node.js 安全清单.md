---
title: 'Node.js 安全清单' 
date: 2019-01-25 2:30:23
hidden: true
slug: 1sya4pbk1j5
categories: [reprint]
---

{{< raw >}}

            <p>by <a href="https://blog.risingstack.com/author/gergely"><strong>Gergely Nemeth</strong></a>(<a href="https://twitter.com/@nthgergo">@nthgergo</a>)，RisingStack联合创始人。</p>
<p><strong>安全是不容忽视的，</strong>每个开发者都知道它非常重要，真正严肃对待它的却没有几人。我们 <a href="https://risingstack.com/#">RisingStack</a> 希望你能认真对待这一问题——这就是我们整理这份清单来帮助你的原因，你的应用在被成千上万用户使用前必须要做安全检查。</p>
<p>这份清单大部分内容是通用的，不仅适用于Node.js，同样适用于其他语言和框架，只是一些明确给出了在Node.js中使用的方法。同时推荐你去阅读我们的引导文章 <a href="https://blog.risingstack.com/node-js-security-tips">Node.js security</a>，如果你刚开始使用Node.js，推荐你看这篇文章 <a href="https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/">first chapter of Node Hero</a>。</p>
<h2>配置管理</h2>
<h3>HTTP 安全头部</h3>
<p>有些关于安全的HTTP头部是你的网站必须要有的：</p>
<ul>
<li><p><strong>Strict-Transport-Security</strong> 强制将HTTP请求替换为HTTPS请求</p>
</li>
<li><p><strong>X-Frame-Options</strong> 防止<a href="https://www.owasp.org/index.php/Clickjacking">点击劫持</a></p>
</li>
<li><p><strong>X-XSS-Protection</strong> 开启跨站脚本攻击（XSS）的过滤，大多数现代浏览器支持这个设置</p>
</li>
<li><p><strong>X-Content-Type-Options</strong> 禁用浏览器对响应内容MIME类型的嗅探，严格使用响应的Content-Type的值</p>
</li>
<li><p><strong>Content-Security-Policy</strong> 能有效防止多种攻击，包括跨站脚本和跨站注入</p>
</li>
</ul>
<p>Node.js开发者可以使用<a href="https://www.npmjs.com/package/helmet">Helmet</a>模块置这些头部，代码如下：</p>
<pre><code class="hljs php"><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> helmet = <span class="hljs-keyword">require</span>(<span class="hljs-string">'helmet'</span>);

<span class="hljs-keyword">var</span> app = express();

app.<span class="hljs-keyword">use</span>(helmet());

</code></pre>
<p><a href="http://koajs.com">Koa</a>和<a href="https://thinkjs.org/">ThinkJS</a>框架中可以使用<a href="https://www.npmjs.com/package/koa-helmet">koa-helmet</a>来设置这些头部，当然有关安全的头部不止这些，更多请看<a href="">Helmet</a>和<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers">MDN HTTP Headers</a>。</p>
<p>在大多数架构里这些头部可以设置在web服务器的配置中（Apache、Nginx），不需要对应用代码进行改动。在Nginx中的配置：</p>
<pre><code class="hljs mipsasm"><span class="hljs-comment"># nginx.conf</span>

<span class="hljs-keyword">add_header </span>X-Frame-Options SAMEORIGIN<span class="hljs-comment">;</span>
<span class="hljs-keyword">add_header </span>X-Content-Type-Options nosniff<span class="hljs-comment">;</span>
<span class="hljs-keyword">add_header </span>X-XSS-Protection <span class="hljs-string">"1; mode=block"</span><span class="hljs-comment">;</span>
<span class="hljs-keyword">add_header </span>Content-Security-Policy <span class="hljs-string">"default-src 'self'"</span><span class="hljs-comment">;</span>

</code></pre><p>有一个完整的Nginx配置文件，<a href="https://gist.github.com/plentz/6737338">帅气的传送门</a>在此。</p>
<p>如果你想快速检查你的网站是否有了所有的必须头部，请使用这个<a href="http://cyh.herokuapp.com/cyh">在线检查器</a>。</p>
<h3>客户端的敏感数据</h3>
<p>当发布前端应用时，确保你的代码里永远不会包含API密码和证书，因为它可以被任何人看到。</p>
<p>没有自动化的方法去检查你在代码里写了敏感数据，但是有两个可以降低向客户端暴露敏感数据风险的方法：</p>
<ul>
<li><p>使用 pull requests 提交代码</p>
</li>
<li><p>定期 code review</p>
</li>
</ul>
<h2>认证</h2>
<h3>暴力攻击保护</h3>
<p>穷举法是系统地枚举所有可能的候选者的一种解决方案，并检查每个候选是否满足陈述的问题。在Web应用程序中，登录端点可能是这方面的最佳候选者。</p>
<p>为了保护你的应用面免受这些攻击，你必须实现某种限速策略。在Node.js中你可以使用 <a href="https://www.npmjs.com/package/ratelimiter">ratelimiter</a>  模块。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">var</span> email = req.body.email;
<span class="hljs-keyword">var</span> limit = <span class="hljs-keyword">new</span> Limiter({ <span class="hljs-attribute">id:</span><span class="hljs-string"> email</span>, <span class="hljs-attribute">db</span>: db });

limit.get(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, limit</span>) </span>{

});

</code></pre>
<p>你可以将它封装成一个中间件，然后在不同应用中使用它。Express和Koa都有这样的中间件，代码如下：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> ratelimit = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-ratelimit'</span>);
<span class="hljs-keyword">var</span> redis = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redis'</span>);
<span class="hljs-keyword">var</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">var</span> app = koa();

<span class="hljs-keyword">var</span> emailBasedRatelimit = ratelimit({
  <span class="hljs-attr">db</span>: redis.createClient(),
  <span class="hljs-attr">duration</span>: <span class="hljs-number">60000</span>,
  <span class="hljs-attr">max</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> context.body.email;
  }
});

<span class="hljs-keyword">var</span> ipBasedRatelimit = ratelimit({
  <span class="hljs-attr">db</span>: redis.createClient(),
  <span class="hljs-attr">duration</span>: <span class="hljs-number">60000</span>,
  <span class="hljs-attr">max</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> context.ip;
  }
});

app.post(<span class="hljs-string">'/login'</span>, ipBasedRatelimit, emailBasedRatelimit, handleLogin);

</code></pre>
<p>在这段代码中限制了一个用户在给定时间窗口内可以尝试登录的次数，通过这样的方式我们可以降低暴力攻击的风险。<strong>注意：这些配置需要根据应用进行调整，千万不要复制粘贴。</strong></p>
<p>想要测试你的服务在这种情况下的表现，你可以使用这个工具 <a href="https://github.com/vanhauser-thc/thc-hydra">hydra</a>。</p>
<h2>Session 管理</h2>
<p><strong>安全使用cookie的重要性千万不能忘：尤其是动态web应用，需要在无状态的HTTP协议中通过cookie维护状态。</strong></p>
<h3>Cookie 标志位</h3>
<p>下面这些属性可以设置在任何cookie上：</p>
<ul>
<li><p><strong>secure</strong> - 这个属性告诉浏览器只有在使用HTTPS通信的时候才发送cookie。</p>
</li>
<li><p><strong>HttpOnly</strong> - 这个属性用来防止例如跨站脚本等攻击，设置它的cookie不允许通过JavaScript来访问。</p>
</li>
</ul>
<h4>Cookie 作用域</h4>
<ul>
<li><p><strong>domain</strong> - 这个属性用来和请求的URL指向服务端的域名进行比较，如果域名或者子域名匹配，接下来检查path属性。</p>
</li>
<li><p><strong>path</strong> - 除了域名之外，还可以指定cookie有效的URL路径。如果域名和路径匹配，发送请求时将会携带此cookie。</p>
</li>
<li><p><strong>expires</strong> - 这个属性用来设置持久cookie，在这个时间之前cookie不会过期。</p>
</li>
</ul>
<p>在Node.js中你可以使用<a href="https://www.npmjs.com/package/cookies">cookies</a>模块来设置cookie，这个模块比较基础，你有可能会使用封装过的模块，例如<a href="https://www.npmjs.com/package/cookie-session">cookie-session</a>。</p>
<pre><code class="hljs php"><span class="hljs-keyword">var</span> cookieSession = <span class="hljs-keyword">require</span>(<span class="hljs-string">'cookie-session'</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);

<span class="hljs-keyword">var</span> app = express();

app.<span class="hljs-keyword">use</span>(cookieSession({
  name: <span class="hljs-string">'session'</span>,
  keys: [
    process.env.COOKIE_KEY1,
    process.env.COOKIE_KEY2
  ]
}));

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res, next)</span> </span>{
  <span class="hljs-keyword">var</span> n = req.session.views || <span class="hljs-number">0</span>;
  req.session.views = n++;
  res.end(n + <span class="hljs-string">' views'</span>);
});

app.listen(<span class="hljs-number">3000</span>);

</code></pre>
<p>示例来源于<a href="https://www.npmjs.com/package/cookie-session">cookie-session</a> 模块的文档。</p>
<h3>CSRF</h3>
<p>跨站请求伪造是一种强制用户在已经登录的网站上执行非自愿操作的攻击。这些攻击特别针对状态变更请求，而不是窃取数据，因为攻击者无法看到对伪造请求的响应。</p>
<p>在Node.js中你可以使用 <a href="https://www.npmjs.com/package/csrf">csrf</a> 模块来减轻这类攻击，这个模块比较基础，有一些针对不同框架进行包装的模块，其中一个是<a href="https://www.npmjs.com/package/csurf">csurf</a>，express框架中用来防止CSRF攻击的中间件。</p>
<p>在路由层可以这样编码：</p>
<pre><code class="hljs php"><span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">'cookie-parser'</span>);
<span class="hljs-keyword">var</span> csrf = <span class="hljs-keyword">require</span>(<span class="hljs-string">'csurf'</span>);
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">'body-parser'</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);

<span class="hljs-comment">// setup route middlewares </span>
<span class="hljs-keyword">var</span> csrfProtection = csrf({ cookie: <span class="hljs-keyword">true</span> });
<span class="hljs-keyword">var</span> parseForm = bodyParser.urlencoded({ extended: <span class="hljs-keyword">false</span> });

<span class="hljs-comment">// create express app </span>
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// we need this because "cookie" is true in csrfProtection </span>
app.<span class="hljs-keyword">use</span>(cookieParser());

app.get(<span class="hljs-string">'/form'</span>, csrfProtection, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-comment">// pass the csrfToken to the view </span>
  res.render(<span class="hljs-string">'send'</span>, { csrfToken: req.csrfToken() });
});

app.post(<span class="hljs-string">'/process'</span>, parseForm, csrfProtection, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">'data is being processed'</span>);
});

</code></pre>
<p>在视图层可以这样使用CSRF的token：</p>
<pre><code class="hljs accesslog">&lt;form action=<span class="hljs-string">"/process"</span> method=<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>&gt;
  &lt;input type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"_csrf"</span> value=<span class="hljs-string">""{{"csrfToken"}}""</span>&gt;

  Favorite color: &lt;input type=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"favoriteColor"</span>&gt;
  &lt;button type=<span class="hljs-string">"submit"</span>&gt;Submit&lt;/button&gt;
&lt;/form&gt;

</code></pre>
<p>示例来源于 <a href="https://www.npmjs.com/package/csurf">csurf</a> 模块的文档。</p>
<h2>数据验证</h2>
<h3>XSS</h3>
<p>有两种相似但是不同类型的攻击需要防御，一种是反射型XSS，另一种是存储型XSS。</p>
<p><strong>反射性XSS</strong> 当攻击者用特制的链接将可执行JavaScript代码注入到HTML响应中时发生。</p>
<p><strong>存储型XSS</strong> 当存储了未经严格过滤的用户输入时发生，它会在在Web应用程序的权限下在用户的浏览器中运行。</p>
<p><strong>为了抵御这些攻击，你需要严格过滤用户输入。</strong></p>
<h3>SQL 注入</h3>
<p>SQL注入通过用户输入注入部分或完整的SQL查询，它能读取敏感信息或者具有破坏性。</p>
<p>下面是一些例子：</p>
<pre><code class="hljs sql">`<span class="hljs-keyword">select</span> title, author <span class="hljs-keyword">from</span> books <span class="hljs-keyword">where</span> <span class="hljs-keyword">id</span>=$<span class="hljs-keyword">id</span><span class="hljs-string">`

</span></code></pre>
<p>如果<code>$id</code>来源于用户的输入，如果用户输入了<code>2 or 1=1</code>会怎么样？查询语句会变成这样：</p>
<pre><code class="hljs routeros">`select title, author <span class="hljs-keyword">from</span> books where <span class="hljs-attribute">id</span>=2 <span class="hljs-keyword">or</span> <span class="hljs-attribute">1</span>=1`

</code></pre>
<p>抵御这类攻击的最简单方式就是使用参数化查询或者提前写好SQL语句。</p>
<p>如果你在Node.js中使用PostgerSQL，你可以使用 <a href="https://www.npmjs.com/package/pg">node-postgres</a> 模块。创建一个参数化查询只需要这样写代码：</p>
<pre><code class="hljs oxygene"><span class="hljs-keyword">var</span> q = <span class="hljs-string">'SELECT name FROM books WHERE id = $1'</span>;
client.query(q, [<span class="hljs-string">'3'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, <span class="hljs-keyword">result</span>)</span> <span class="hljs-comment">{}</span>);</span>

</code></pre>
<p><a href="http://sqlmap.org/">sqlmap</a> 是一个开源的渗透测试工具，自动化<strong>检测利用SQL注入漏洞并接管数据库</strong>的过程。</p>
<h3>命令行注入</h3>
<p>命令注入是攻击者在远程Web服务器上运行OS命令所使用的技术。通过这种方法，攻击者甚至可以从系统获得到密码。</p>
<p>在实践中，如果你有这样的链接：</p>
<pre><code class="hljs vim">`http<span class="hljs-variable">s:</span>//example.<span class="hljs-keyword">com</span>/downloads?<span class="hljs-keyword">file</span>=user1.txt`

</code></pre><p>它可以变成：</p>
<pre><code class="hljs vim">`http<span class="hljs-variable">s:</span>//example.<span class="hljs-keyword">com</span>/downloads?<span class="hljs-keyword">file</span>=%<span class="hljs-number">3</span>Bcat%<span class="hljs-number">20</span>/etc/passwd`

</code></pre><p>在示例中<code>%3B</code>是标点符号点的转码，通过这种方式可以运行多个操作系统命令。</p>
<p><strong>为了抵御这类攻击，你必须确保严格过滤用户的输入。</strong></p>
<p>仍然用Node.js来做例子：</p>
<pre><code class="hljs scilab">child_process.<span class="hljs-built_in">exec</span>(<span class="hljs-string">'ls'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err, data)</span> {  </span>
    console.<span class="hljs-built_in">log</span>(data);
});

</code></pre>
<p>在底层<code>child_process.exec</code>调用<code>/bin/sh</code>，所以它是一个bash解释器并不是程序启动。</p>
<p>当用户的输入传到这个地方，就会产生问题，任意一个反撇号或者<code>$()</code>，就会有一个新的命令被攻击者注入。反引号的作用就是将反引号内的Linux命令先执行，然后将执行结果赋予变量。</p>
<p>可以简单使用<code>child_process.execFile</code>解决这个问题。</p>
<h2>安全传输</h2>
<h3>SSL Version, Algorithms, Key length</h3>
<p>HTTP是一个明文协议，它必须通过SSL / TLS隧道进行安全保护，我们熟知的HTTPS就是这样。现在高等级的密码被广泛使用，如果在服务器配置错误，会使用一个弱密码来替代，或没有加密。</p>
<p>你需要去测试：</p>
<ul>
<li><p>密码、钥匙和协议协商配置正确</p>
</li>
<li><p>证书有效性</p>
</li>
</ul>
<p>使用 <a href="https://nmap.org/">nmap</a>和<a href="https://github.com/iSECPartners/sslyze">sslyze</a> 工具可以将这件事变得简单。</p>
<p><strong>检查证书信息</strong></p>
<pre><code class="hljs stylus">`nmap --script ssl-cert,ssl-enum-ciphers -<span class="hljs-selector-tag">p</span> <span class="hljs-number">443</span>,<span class="hljs-number">465</span>,<span class="hljs-number">993</span>,<span class="hljs-number">995</span> www<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span>`

</code></pre><p><strong>使用sslyze测试SSL/TLS漏洞</strong></p>
<pre><code class="hljs stylus">`./sslyze<span class="hljs-selector-class">.py</span> --regular example<span class="hljs-selector-class">.com</span>:<span class="hljs-number">443</span>`

</code></pre><h3>HSTS</h3>
<p>在配置管理部分，我们简要的谈到了它 。 <strong>Strict-Transport-Security</strong> 头部强制浏览器和服务器使用安全连接（HTTP over SSL/TLS），下面的配置来自Twitter：</p>
<pre><code class="hljs autohotkey">`strict-transport-security:max-age=<span class="hljs-number">631138519</span>`

</code></pre><p>这里的<code>max-age</code>，指定了浏览器应该自动将HTTP请求转换为HTTPS的有效时间。</p>
<p>可以通过下面的命令简单的测试：</p>
<pre><code class="hljs vim">`curl -s -D- http<span class="hljs-variable">s:</span>//twitter.<span class="hljs-keyword">com</span>/ | <span class="hljs-keyword">grep</span> -i Strict`

</code></pre><h2>拒绝服务</h2>
<h3>账号锁定</h3>
<p>帐户锁定是一种减轻暴力猜测攻击的技术，在尝试登录失败几次之后，在给定时间内系统禁止其登录，最初只限制几分钟，以后成倍的增加限制时间。</p>
<p>你可以使用上面我们讨论过的限速模式来抵御这种攻击。</p>
<h3>正则表达式</h3>
<p>这种攻击利用了大多数正则表达式实现的极端情况，导致它们工作非常缓慢。这种正则表达式被称为<code>Evil Regexpes</code>：</p>
<ul>
<li><p>使用重复分组</p>
</li>
<li><p>重复组中出现：</p>
<ul>
<li><p>重复</p>
</li>
<li><p>交替重叠</p>
</li>
</ul>
</li>
</ul>
<p><code>([a-zA-Z]+)*</code>、<code>(a+)+</code> 或者 <code>(a|a?)+</code> 都是有漏洞的正则表达式，像<code>aaaaaaaaaaaaaaaaaaaaaaaa!</code>这样简单的输入就可以产生很大的计算量。更多信息请看<a href="https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS">正则表达式DOS</a>.</p>
<p>你可以使用工具 <a href="https://www.npmjs.com/package/safe-regex">safe-regex</a>检查你的正则表达式，它可能会误报，所以小心使用。</p>
<pre><code class="hljs crmsh">$ <span class="hljs-keyword">node</span> <span class="hljs-title">safe</span>.js '(beep|boop)*'
<span class="hljs-literal">true</span>
$ <span class="hljs-keyword">node</span> <span class="hljs-title">safe</span>.js '(a+){<span class="hljs-number">10</span>}'
<span class="hljs-literal">false</span>

</code></pre>
<h2>异常处理</h2>
<h3>异常代码、错误跟踪栈</h3>
<p>在不同的错误场景中，应用程序可能泄漏有关底层基础设施的敏感细节， 比如：<code>X-Powered-By:Express</code>。</p>
<p>错误跟踪栈本身不是错误，但是它经常泄露让攻击者感兴趣的信息。提供debug信息作为操作产生错误的结果是一种糟糕的做法，你应该打印而不是向用户输出这些信息。</p>
<h2>NPM</h2>
<p>能力越大责任越大，NPM有大量可以方便使用的模块，相应的你需要检查你的应用用到了哪些，它们可能包含了至关重要的安全问题。</p>
<h3>Node 安全项目</h3>
<p>幸运的是Node安全项目有一个非常棒的工具，你可以检查你使用的模块的已知漏洞。</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">npm</span> i nsp -g
<span class="hljs-comment"># either audit the shrinkwrap</span>
nsp audit-shrinkwrap
<span class="hljs-comment"># or the package.json</span>
nsp audit-package

</code></pre>
<p>你还可以使用 <a href="https://www.npmjs.com/package/requiresafe">requireSafe</a> 来帮你做这件事。</p>
<h3>Snyk</h3>
<p>Snyk和Node安全项目相似，但是它的目标不仅是提供工具发现漏洞，还能在你的项目仓库中解决相关安全问题。</p>
<p>可以尝试一下<a href="https://snyk.io">snyk.io</a>。</p>
<h2>Final</h2>
<p>这个清单基于 <a href="https://www.owasp.org/index.php/Web_Application_Security_Testing_Cheat_Sheet">Web Application Security Testing Cheat Sheet</a>（<a href="https://www.owasp.org/index.php/Main_Page">OWASP</a>维护）并且很大程度受它影响。</p>
<blockquote>
<p>开放Web应用安全项目（OWASP）是一个全球性的非盈利慈善组织，致力于提高软件的安全性</p>
</blockquote>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js 安全清单

## 原文链接
[https://www.zcfy.cc/article/node-js-security-checklist-risingstack](https://www.zcfy.cc/article/node-js-security-checklist-risingstack)

