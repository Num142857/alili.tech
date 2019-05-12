---
title: '前端分享之cookie的使用及单点登录' 
date: 2018-12-30 2:30:10
hidden: true
slug: melolf7q3xi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">cookie是什么</h2>
<p>cookie的英文意思是饼干。在计算机术语中指服务端存放在客户端的一段数据。这段数据在客户端每次进行http请求时会自动加在http请求报文中的header上；服务端在响应时，可以对cookie进行设置，并将cookie加入到http响应报文header中。<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie" rel="nofollow noreferrer" target="_blank">MDN</a>中对cookie的解释为：cookie 是一个请求首部，其中含有先前由服务器通过 Set-Cookie  首部投放并存储到客户端的 HTTP cookies。<br>cookie一般存放在对应的域名下，各个浏览器对中一个域名下存放的cookie的个数与大小规定不一样。下表是不同浏览器对cookie存放的规定：</p>
<table>
<thead><tr>
<th>浏览器</th>
<th>chrome</th>
<th>Safari</th>
<th>Firefox</th>
<th>ie</th>
</tr></thead>
<tbody>
<tr>
<td>个数</td>
<td>53</td>
<td>无限制</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>大小</td>
<td>4097字节</td>
<td>4097字节</td>
<td>4097字节</td>
<td>4095字节</td>
</tr>
<tr>
<td>超额处理</td>
<td>剔除最老的cookie</td>
<td>剔除最老的cookie</td>
<td>随机消除除最新的其他cookie</td>
<td>剔除最老的cookie</td>
</tr>
</tbody>
</table>
<p>所有浏览器都支持cookie功能，我们可以直接在浏览器中移除cookie与禁用cookie存储。chrome中的设置为：设置-高级-隐私设置和安全性-内容设置-cookie。<br>如果我们在创建cookie时没有设置过期时间，即没有设置expires或者max-age值，则该cookie只存在与会话中，此时，cookie存储在浏览器的内存中，关闭浏览器时cookie自动消失。如果设置了过期时间，则cookie存储在用户的硬盘上。<br>在windows OS下chrome存放cookie的路径是C:Documents and SettingsAdministratorLocal SettingsApplication DataGoogleChromeUser Data，firefox的存放路径是：C:Documents and SettingsAdministratorLocal SettingsApplication DataMozillaFirefoxProfilesznyzv8y6.defaultOfflineCache<br>在mac下chrome的存储路径为：~/library/application support/google/chrome；<br>Safari的存储路径为：~/library/cookies；</p>
<h2 id="articleHeader1">cookie的工作原理</h2>
<p>我们知道http协议是一种无状态的协议，在web应用程序中，通过http协议进行数据交互，交互完毕后，客户端与服务端的连接就断开。再次交互需要建立新的连接。这种连接无法记录用户的状态，cookie可以弥补HTTP协议无状态的不足。服务器给客户端们颁发一个通行证，无论谁访问都必须携带自己通行证，这样服务器就能从通行证上确认客户身份了。这就是Cookie的工作原理。</p>
<p><span class="img-wrap"><img data-src="/img/bVVw3y?w=770&amp;h=401" src="https://static.alili.tech/img/bVVw3y?w=770&amp;h=401" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图展示了cookie的工作原理：<br>（1）第一次用户登录的时候，输入用户名和密码信息，服务端接收后进行用户认证。<br>（2）服务端通过验证后，生成一个token以cookie的形式放在http的response header中一起返回给客户端。<br>（3）浏览器根据是否设置cookie的过期时间判断该cookie是会话cookie还是永久cookie，并将cookie存储在不同的位置。<br>（4）下次进行http请求时，请求头中会自动携带存储的cookie。<br>（5）服务端根据请求头中的cookie里面的token确认该用户的身份信息。</p>
<h2 id="articleHeader2">常见问题</h2>
<h4>前端主动向后端跨域发送cookie</h4>
<p>在解释这个问题之前先了解一下什么是跨域。两个域之间是不是存在跨域问题，主要是根据协议、域名、端口号这三个点进行判断，只要有一个不一样就是跨域。例如：<br>（1）协议不同：<a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a> 与<a href="https://www.baidu.com" rel="nofollow noreferrer" target="_blank">https://www.baidu.com</a><br>（2）域名不同：<a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a> 与<a href="http://www.google.com" rel="nofollow noreferrer" target="_blank">http://www.google.com</a><br>（3）端口号不同： <a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a>:8080 与<a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a>:8000<br>浏览器默认情况下无法主动跨域向后端发送cookie，需要在前端请求时加入配置项{withCredentials:true}。<br>jquery: <br><code>$.ajax({url:'myurl',method:'GET', xhrFields:{withCredentials:true},success:function(){"}}")</code>;<br>angular: <br><code>$http.get(url, {withCredentials: true})</code><br>axios: <br><code>axios.defaults.withCredentials = true</code></p>
<p>前端配置好后还需要在后端进行相关配置：<br>在response header里面添加配置项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Access-Control-Allow-Credentials“, “true” 
&quot;Access-Control-Allow-Origin&quot;, ”yourdomain“
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"Access-Control-Allow-Credentials“, “true” </span>
<span class="hljs-string">"Access-Control-Allow-Origin"</span>, ”yourdomain“
</code></pre>
<p>也有一些中间件帮我们解决跨域问题。例如express中的express-cors，或者koa中的koa-cors</p>
<h2 id="articleHeader3">方法属性</h2>
<h4>前端cookie</h4>
<p>设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = 'company=eoitek;max-age=10000;domain=eoitek.com;path=/;secure'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">document<span class="hljs-selector-class">.cookie</span> = <span class="hljs-string">'company=eoitek;max-age=10000;domain=eoitek.com;path=/;secure'</span></code></pre>
<p>其中max-age是cookie的过期时间,是一个相对时间，值的单位是秒，是相对于cookie创建后多少秒才过期。与max-age相似的配置属性是expires，值为日期对象的toUTCString()格式，即Thu, 21 Sep 2018 06:10:38 GMT，是指cookie过期的绝对时间。如果max-age和expires都存在，则max-age的优先级更高。domain是我们设置cookie存放的域，如果没有设置则为当前主机的域。path是指cookie存储的目录，默认为当前文件的存储目录。secure，加入此配置项，则指定该cookie只能通过https协议进行传输。<br>读取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie</code></pre>
<p>读取所有该域能获取到的cookie；格式为‘&lt;key1&gt;=&lt;value1&gt;;&lt;key2&gt;=&lt;value2&gt;;’</p>
<h4>后端cookie</h4>
<p>设置（以node为例）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
http.createServer(
  function(req, res) {
    res.setHeader('status', '200 OK');
    res.setHeader('Set-Cookie', 'name=binbinfang;path=/;
    max-age=1000;domain=eoitek.com');
    res.setHeader('Access-Control-Allow-Origin', 'eoitek.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.write('Hello World');
    res.end();
}).listen(8888);

console.log('running localhost:8888');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>var http = require(<span class="hljs-string">'http'</span>);
http.createServer(
  <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> {</span>
    res.setHeader(<span class="hljs-string">'status'</span>, <span class="hljs-string">'200 OK'</span>);
    res.setHeader(<span class="hljs-string">'Set-Cookie'</span>, <span class="hljs-string">'name=binbinfang;path=/;
    max-age=1000;domain=eoitek.com'</span>);
    res.setHeader(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'eoitek.com'</span>);
    res.setHeader(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, <span class="hljs-string">'true'</span>);
    res.write(<span class="hljs-string">'Hello World'</span>);
    res.<span class="hljs-keyword">end</span>();
}).listen(<span class="hljs-number">8888</span>);

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'running localhost:8888'</span>);</code></pre>
<p>后端cookie比前端cookie多两个配置项：<br>httpOnly：设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 经由  Document.cookie 属性、XMLHttpRequest 和  Request APIs 进行访问，以防范跨站脚本攻击（XSS）；<br>SameSite=Strict<br>SameSite=Lax <br>允许服务器设定一则 cookie 不随着跨域请求一起发送，这样可以在一定程度上防范跨站请求伪造攻击（CSRF）。</p>
<h2 id="articleHeader4">注意事项</h2>
<p>（1）保存中文cookie<br>如果需要保存中文cookie，则需要对中文进行UTF-8编解码，即通过encodeUriComponent（）和decodeUriComponent（）方。<br>（2）保存图片和安全证书<br>cookie中也可以保存二进制图片和安全证书，需要对文件进行base64编码才能保存。不过建议最好不要将这类文件保存在cookie中。<br>（3）cookie的更新<br>只要将key；path；domain一致，则可以通过改变key对应的value来更新cookie的值。<br>（4）cookie的删除<br>cookie只能更新不能删除，如果想要删除一个cookie，则通过更新设置该cookie的max-age=0即可。<br>（5）cookie的安全性<br>设置cookie时添加secure。</p>
<p>cookie由于其设置和取值都是通过字符串的形式进行的。因此，在原生cookie的操作比较麻烦，可通过一些js库来方便我们的操作，包括cookies.js和js-cookie</p>
<h2 id="articleHeader5">cookie的跨域获取与单点登录问题</h2>
<p>默认情况下，cookie是不能跨域访问的，如在www.google.com域无法操作和获取www.baidu.com里面的cookie，因为他们的一级域不同。但是在二级域里面可以共享和修改cookie的。即www.baidu.com和baike.baidu.com之间是可以共享cookie的。据此，可以实现单点登录。<br>单点登录：多个不同系统整合到统一加载个平台，用户在任何一个系统登录后，可以访问这个统一加载上的所有系统。登录之后，用户的权限和信息不再受某个系统的限制，即使某个系统出现故障(包括统一加载平台)，其他系统还是能正常使用的。这就需要用户权限等信息保存到客户端，不受服务器的限制。<br>例如，我们有两个站点，都需要用户身份认证，要实现单点登录的话，可以将他们的一级域名设置为相同的，如主站点设置为eoitek.test,子站点设置为sharplook.eoitek.test。在创建cookie的时候，通过设置domain=.eoitek.test;path=/；即可实现两个域名之间的cookie共享，如果将认证信息的token放在cookie中则可以实现单点登录了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//eoitek.test站点

import cookies from 'cookiesjs';
export default {
  name: 'agent',
  mounted() {
    cookies({'fullname': null, 'company': null});
    if (!cookies('fullname')) {
      cookies({fullname: 'binbin', company: 'eoitek'}, 
      {expires: 100 * 24 * 3600,
       domain: '.eoitek.test', path: '/'});
    }
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//eoitek.test站点</span>

<span class="hljs-keyword">import</span> cookies from <span class="hljs-string">'cookiesjs'</span>;
export <span class="hljs-keyword">default</span> {
<span class="hljs-symbol">  name:</span> <span class="hljs-string">'agent'</span>,
  mounted() {
    cookies({<span class="hljs-string">'fullname'</span>: <span class="hljs-literal">null</span>, <span class="hljs-string">'company'</span>: <span class="hljs-literal">null</span>});
    <span class="hljs-keyword">if</span> (!cookies(<span class="hljs-string">'fullname'</span>)) {
      cookies({<span class="hljs-string">fullname:</span> <span class="hljs-string">'binbin'</span>, <span class="hljs-string">company:</span> <span class="hljs-string">'eoitek'</span>}, 
      {<span class="hljs-string">expires:</span> <span class="hljs-number">100</span> * <span class="hljs-number">24</span> * <span class="hljs-number">3600</span>,
<span class="hljs-symbol">       domain:</span> <span class="hljs-string">'.eoitek.test'</span>, <span class="hljs-string">path:</span> <span class="hljs-string">'/'</span>});
    }
   }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVyD3?w=2554&amp;h=254" src="https://static.alili.tech/img/bVVyD3?w=2554&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVyEb?w=2558&amp;h=258" src="https://static.alili.tech/img/bVVyEb?w=2558&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看出在两个站点中都能访问到我们设置的两个cookie，这样实现了跨域访问cookie和单点登录。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端分享之cookie的使用及单点登录

## 原文链接
[https://segmentfault.com/a/1190000011295587](https://segmentfault.com/a/1190000011295587)

