---
title: 'TCP/IP基础总结性学习（4）' 
date: 2018-12-05 2:30:09
hidden: true
slug: iyexcqwazdq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">返回结果的 HTTP 状态码</h2>
<p>一.简单介绍：</p>
<blockquote>总述：HTTP 状态码负责表示客户端 HTTP 请求的返回结果、标记服务器端的处理是否正常、通知出现的错误等工作。<p>状态码构成：以 3 位数字和原因短语组成。数字中的第一位指定了响应类别，后两位无分类。响应类别有以下 5 种。</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV8eg6?w=602&amp;h=227" src="https://static.alili.tech/img/bV8eg6?w=602&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>分别具体介绍几个常用的状态码：</blockquote>
<p>二.　2XX 成功：2XX 的响应结果表明请求被正常处理了。</p>
<p>1.200 OK</p>
<p><span class="img-wrap"><img data-src="/img/bV8ekV?w=605&amp;h=205" src="https://static.alili.tech/img/bV8ekV?w=605&amp;h=205" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>表示从客户端发来的请求在服务器端被正常处理了。<br>在响应报文内，随状态码一起返回的信息会因方法的不同而发生改变。比如，使用 GET 方法时，对应请求资源的实体会作为响应返回；而使用 HEAD 方法时，对应请求资源的实体首部不随报文主体作为响应返回（即在响应中只返回首部，不会返回实体的主体部分）。</p>
<p>2.204 No Content</p>
<p><span class="img-wrap"><img data-src="/img/bV8enk?w=544&amp;h=193" src="https://static.alili.tech/img/bV8enk?w=544&amp;h=193" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如， 当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面不发生更新。<br>一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。</p>
<p>3.206 Partial Content</p>
<p><span class="img-wrap"><img data-src="/img/bV8eoh?w=530&amp;h=190" src="https://static.alili.tech/img/bV8eoh?w=530&amp;h=190" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。</p>
<hr>
<p>三.3XX 重定向：响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。</p>
<p>1.301 Moved Permanently</p>
<p><span class="img-wrap"><img data-src="/img/bV8eqA?w=510&amp;h=195" src="https://static.alili.tech/img/bV8eqA?w=510&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。 像下方给出的请求 URI，当指定资源路径的最后忘记添加斜杠“/”，就 会产生 301 状态码。如：<a href="http://example.com/sample" rel="nofollow noreferrer" target="_blank">http://example.com/sample</a></p>
<p>2.302 Found</p>
<p><span class="img-wrap"><img data-src="/img/bV8esA?w=532&amp;h=224" src="https://static.alili.tech/img/bV8esA?w=532&amp;h=224" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望 用户（本次）能使用新的 URI 访问。 和 301 Moved Permanently 状态码相似，但 302 状态码代表的资源不是被永久移动，只是临时性质的。换句话说，已移动的资源对应的 URI 将来还有可能发生改变。比如，用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。 </p>
<p>3.303 See Other</p>
<p><span class="img-wrap"><img data-src="/img/bV8etW?w=505&amp;h=228" src="https://static.alili.tech/img/bV8etW?w=505&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。<br>303 状态码和 302 Found 状态码有着相同的功能，但 <strong>303 状态码明确表示客户端应当采用 GET 方法获取资源</strong>，这点与 302 状态码有区别。<br>比如，当使用 POST 方法访问 CGI 程序，其执行后的处理结果是希望客户端能以 GET 方法重定向到另一个 URI 上去时，返回 303 状态码。虽然 302 Found 状态码也可以实现相同的功能，但这里使用 303 状态码是最理想的。<br><em>当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成 GET，并删除请求报文内的主体，之后请求会自动再次发送。301、302 标准是禁止将 POST 方法改变成 GET 方法的，但实际使用时大家都会这么做。</em></p>
<p>4.304 Not Modified</p>
<p><span class="img-wrap"><img data-src="/img/bV8ewd?w=521&amp;h=227" src="https://static.alili.tech/img/bV8ewd?w=521&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>该状态码表示客户端发送附带条件的请求（附注） 时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。<br>（附注）附带条件的请求是指采用 GET 方法的请求报文中包含 If-Match，If-ModifiedSince，If-None-Match，If-Range，If-Unmodified-Since 中任一首部。 </p>
<p>5.307 Temporary Redirect </p>
<p>临时重定向。该状态码与 302 Found 有着相同的含义。尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。 307 会遵照浏览器标准，不会从 POST 变成 GET。但是，对于处理响应时的行为，每种浏览器有可能出现不同的情况。</p>
<hr>
<p>四. 4XX 客户端错误</p>
<p>1.400 Bad Request</p>
<p><span class="img-wrap"><img data-src="/img/bV8eHi?w=538&amp;h=200" src="https://static.alili.tech/img/bV8eHi?w=538&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。</p>
<p>2.401 Unauthorized</p>
<p><span class="img-wrap"><img data-src="/img/bV8eH2?w=523&amp;h=458" src="https://static.alili.tech/img/bV8eH2?w=523&amp;h=458" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、 DIGEST 认证）的认证信息。另外若之前已进行过 1 次请求，则表示用户认证失败。 返回含有 401 的响应必须包含一个适用于被请求资源的 WWWAuthenticate 首部用以质询（challenge）用户信息。当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。 </p>
<p>3.403 Forbidden</p>
<p><span class="img-wrap"><img data-src="/img/bV8eKb?w=522&amp;h=194" src="https://static.alili.tech/img/bV8eKb?w=522&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要 给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。<br>未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发 送源 IP 地址试图访问）等列举的情况都可能是发生 403 的原因。</p>
<p>4.404 Not Found</p>
<p><span class="img-wrap"><img data-src="/img/bV8nqu?w=638&amp;h=217" src="https://static.alili.tech/img/bV8nqu?w=638&amp;h=217" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。</p>
<hr>
<p>五.5XX 服务器错误：5XX 的响应结果表明服务器本身发生错误。</p>
<p>1.500 Internal Server Error</p>
<p><span class="img-wrap"><img data-src="/img/bV8nrq?w=541&amp;h=189" src="https://static.alili.tech/img/bV8nrq?w=541&amp;h=189" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。</p>
<p>2.503 Service Unavailable</p>
<p><span class="img-wrap"><img data-src="/img/bV8nrV?w=516&amp;h=202" src="https://static.alili.tech/img/bV8nrV?w=516&amp;h=202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。</p>
<hr>
<p>六.总结：状态码和状况的不一致。</p>
<p>不少返回的状态码响应都是错误的，但是用户可能察觉不到这点。 比如 Web 应用程序内部发生错误，状态码依然返回 200 OK，这种情况也经常遇到。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TCP/IP基础总结性学习（4）

## 原文链接
[https://segmentfault.com/a/1190000014350785](https://segmentfault.com/a/1190000014350785)

