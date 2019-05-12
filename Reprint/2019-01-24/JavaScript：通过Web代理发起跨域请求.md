---
title: 'JavaScript：通过Web代理发起跨域请求' 
date: 2019-01-24 2:30:11
hidden: true
slug: 5g14c034ihw
categories: [reprint]
---

{{< raw >}}

            <p>XMLHttpRequest对象（IE中为XMLHTTP对象）是AJAX应用的核心。由于现代浏览器对跨域请求的限制，在使用时需多加注意。本教程尽量用简单易懂的话描述（跨域）问题，并提供一个方案：通过Web代理（Web Proxy），将网络请求从你的Web服务器转发给其他服务，如Yahoo! Web Service（译注：Yahoo! Web Service ，即雅虎Web服务，公开的接口包括天气，搜索，地图等）。</p>
<h3>为什么需要代理？</h3>
<p>现代浏览器会对网络连接加上一些安全方面的限制，其中就包括XMLHttpRequest请求。其限制了页面脚本与同源服务器之外的服务器建立连接（IE允许跨域请求,但需要在设置中开启）。如果网页与XML数据来源同源，则不会受限。</p>
<p><img src="https://developer.yahoo.com/javascript/img/proxy1.gif" alt=""></p>
<p>但若一个Web应用向另一个服务器（如雅虎服务 ）发请求，则浏览器会阻止双方建立连接，导致请求失败。</p>
<p><img src="https://developer.yahoo.com/javascript/img/proxy2.gif" alt=""></p>
<p>关于跨域，已经有很多解决方案了。最常用的方法是在你的Web服务器上安装代理。不直接向Web服务（译注：一般是非同源的后端服务）发XMLHttpRequest请求，而是向你自己的Web服务器发请求（译注：即利用你的服务器转发请求，暂且将你的服务器称为“代理服务器”）。然后代理服务器将请求转发给真正的Web服务，并将数据传回给客户端（即前端页面）。因为请求连接的双方是同源的（译注：你自己的服务器和前端页面就是同源的），并且数据是从你的服务器返回的，所以浏览器不会阻止。</p>
<p><img src="https://developer.yahoo.com/javascript/img/proxy3.gif" alt=""></p>
<p>出于安全考虑，你自己的代理服务器应该有所限制。无限制公开的代理服务器可能会被滥用（译注：因为后端发请求不会有同源策略的限制）。若只允许你自己的应用向你的代理服务器发请求有些困难（译注：意思是你没办法阻止其他人给你的代理服务器发请求），但你可以限制你的代理服务器对指定的服务器以外的服务器响应。比如将URL硬编码到代理链接中或用一些限制条件将你的代理服务器保护起来，同时也会让你的Web应用不会过于暴露。</p>
<h3>通过PHP代理雅虎服务</h3>
<p>在雅虎开发者社区的<a href="https://developer.yahoo.com/javascript/index.html">JavaScript开发者中心</a>，给出了一个简单的用PHP编写的网络代理<a href="https://developer.yahoo.com/javascript/samples/proxy/php_proxy_simple.txt">示例程序</a>，该程序代理请求了雅虎的搜索接口，你可以在你自己的Web服务器上安装此小程序，安装位置可以自定。（当然你的Web服务器必须能先运行PHP）。</p>
<p>代理程序将雅虎服务的URL硬编码在全局变量<code>HOSTNAME</code>中。你可以修改这个变量到任何你想要使用的雅虎服务。这里使用雅虎搜索的域名，雅虎服务还有其他域名，如雅虎本地（Yahoo! Local <code>http://local.yahooapis.com</code> ）和 雅虎旅游（Yahoo! Travel <code>http://api.travel.yahoo.com</code>）</p>
<pre><code class="hljs lasso"><span class="hljs-class"><span class="hljs-keyword">define</span> </span>(<span class="hljs-string">'HOSTNAME'</span>, <span class="hljs-string">'http://search.yahooapis.com/'</span>);
</code></pre><p>要在你的客户端应用中使用PHP代理，需要将JavaScript代码中向雅虎服务请求的URL中的雅虎域名删除。雅虎域名由服务器端的代理添加。下面的代码出自<a href="https://developer.yahoo.com/javascript/index.html">JavaScript开发中心</a>的<a href="https://developer.yahoo.com/javascript/samples/ajax/sample_proxy_ajax.html">一个完整的XMLHttpRequest代码示例</a>。</p>
<pre><code class="hljs qml"><span class="hljs-comment">// The web services request minus the domain name</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-string">'VideoSearchService/V1/videoSearch?appid=YahooDemo&amp;query=madonna&amp;results=2'</span>;

<span class="hljs-comment">// The full path to the PHP proxy</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://localhost/php_proxy_simple.php?yws_path='</span> + <span class="hljs-built_in">encodeURIComponent</span>(path);
... <span class="hljs-comment">// core xmlhttp code</span>
xmlhttp.open(<span class="hljs-string">'GET'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
</code></pre><p>注意: 示例中仅使用了HTTP GET请求，但也支持POST请求。</p>
<p>你可以修改代码，在服务器端处理请求中获得的数据，例如，筛选出你需要的元素，或将XML解析为更适合JavaScript格式。</p>
<h3>其他解决方案</h3>
<p>除了使用Web代理将数据转发到自己的应用（译注：此处特指后端服务器程序）之外，还有其他几种方式：</p>
<ul>
<li>通过Apache的 <code>mod_rewrite</code>或<code>mod_proxy</code>将请求转发给其他服务器。而你的客户端只与你自己的服务器通信，就像正常普通的请求一样，不会有什么浏览器跨域限制。Apache会自动为你将请求转发给其他服务器。</li>
<li>使用JSON或动态<code>&lt;script&gt;</code>标签而不是XML和XMLHttpRequest。通过<code>&lt;script&gt;</code>标签直接发请求，可绕过浏览器的跨域限制。如果你所要用的雅虎服务支持JSON（通过<code>output=json</code>和<code>callback=函数参数</code>设置），当页面加载时，雅虎服务的数据会以JavaScript对象的形式存在。具体怎么做请参阅<a href="https://developer.yahoo.com/javascript/json.html">JSON文档</a>。</li>
<li>在脚本中加上数字签名。在Firefox中，你可以将数字签名应用在脚本上，然后这些脚本将被浏览器视为“可信的”。然后，Firefox将允许你通过XMLHttpRequests向任何域名发起请求。但目前其他浏览器都不支持对脚本进行数字签名，所以此方案使用有限。</li>
</ul>
<h3>更多信息</h3>
<p>更多关于JavaScript，XMLHttpRequest，雅虎服务和其他JavaScript开发的信息，请参考雅虎开发者平台<a href="https://developer.yahoo.com/javascript/index.html">JavaScript开发者中心</a>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript：通过Web代理发起跨域请求

## 原文链接
[https://www.zcfy.cc/article/javascript-developer-center-use-a-web-proxy-for-cross-domain-xmlhttprequest-calls-ydn](https://www.zcfy.cc/article/javascript-developer-center-use-a-web-proxy-for-cross-domain-xmlhttprequest-calls-ydn)

