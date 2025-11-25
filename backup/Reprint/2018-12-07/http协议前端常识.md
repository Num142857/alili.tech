---
title: 'http协议前端常识' 
date: 2018-12-07 2:30:10
hidden: true
slug: d96eottr8y
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">http</h1>
<p><span class="img-wrap"><img data-src="/img/bV7kr7?w=645&amp;h=306" src="https://static.alili.tech/img/bV7kr7?w=645&amp;h=306" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>介绍</strong>：http基于tcp/ip通信来传递数据</p>
<h2 id="articleHeader1">注意事项</h2>
<ul>
<li>http是无连接：每次连接只处理一个请求，服务器处理完请求后，并收到客户端的应答后，即断开连接；</li>
<li>http媒体是独立的：只要客户端和服务器端知道如何处理数据类型，任何数据都可以用http传送；</li>
<li>http无状态：无状态是指协议对于事物处理没得记忆能力；</li>
</ul>
<h2 id="articleHeader2">消息结构</h2>
<p>1.http客服端请求包括：请求行、请求头部、空行和请求数据</p>
<p><span class="img-wrap"><img data-src="/img/bVGuNT?w=466&amp;h=165" src="https://static.alili.tech/img/bVGuNT?w=466&amp;h=165" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.http响应：状态行、消息报头、空行、响应正文</p>
<h2 id="articleHeader3">http请求方法</h2>
<ul>
<li>http1.0：get、post和head</li>
<li>http1.1新增五种请求方式: delete、put、connect、 tarce和options</li>
</ul>
<table>
<thead><tr>
<th align="left">方法</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">get</td>
<td align="left">向特定资源发起请求</td>
</tr>
<tr>
<td align="left">post</td>
<td align="left">向指定资源提交数据进行数据处理。数据包含在请求体中，post请求可能用于新的资源的创建以及已有资源的修改</td>
</tr>
<tr>
<td align="left">head</td>
<td align="left">类似与get请求，只不过没有返回体，用于获取包含在响应消息头中的元信息</td>
</tr>
<tr>
<td align="left">put</td>
<td align="left">向指定资源上传最新内容</td>
</tr>
<tr>
<td align="left">delete</td>
<td align="left">请求服务器删除指定资源</td>
</tr>
<tr>
<td align="left">trace</td>
<td align="left">回显服务器收到的请求，主要用于测试或诊断</td>
</tr>
<tr>
<td align="left">connect</td>
<td align="left">http1.1中预留给能够将连接改为管道方式的代理服务器</td>
</tr>
<tr>
<td align="left">options</td>
<td align="left">返回服务器对特定资源支持的http方法，用来向服务器发送‘*’的请求来测试服务器的功能性</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader4">常见首部字段含义介绍</h2>
<p>首部和方法配合工作，共同决定客户端和服务端能做什么事情</p>
<h3 id="articleHeader5">通用首部</h3>
<p><em>客户端和服务端都可以使用的首部</em></p>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Connection</td>
<td align="left">允许客户端与服务端指定与请求/响应相连接有关的选项</td>
</tr>
<tr>
<td align="left">Date</td>
<td align="left">提供日期和时间标志，说明报文是什么时间创建的</td>
</tr>
<tr>
<td align="left">MIME-Version</td>
<td align="left">给出发送给端MIME版本</td>
</tr>
<tr>
<td align="left">Trailer</td>
<td align="left">如果报文传输采用分块传输（chunked transfer encoding）方式，就可以用这个首部列出位于报文拖挂部分的首部集合</td>
</tr>
<tr>
<td align="left">Transfer-Encoding</td>
<td align="left">告诉接受端为了保证报文的可靠传输，对报文采用了什么编码方式</td>
</tr>
<tr>
<td align="left">Update</td>
<td align="left">给出了发送端可能想要“升级”使用新版或协议</td>
</tr>
<tr>
<td align="left">Via</td>
<td align="left">显示报文经过的中间节点（代理、网关）</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader6">请求首部</h3>
<p><em>请求报文特有的，为服务器提供一些额外的信息，比如客户端希望接收到什么样的数据类型</em></p>
<h4>请求的信息性首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Client-Ip</td>
<td align="left">提供运行客户端机器的IP地址</td>
</tr>
<tr>
<td align="left">From</td>
<td align="left">提供客户端用户的E-mail地址</td>
</tr>
<tr>
<td align="left">Host</td>
<td align="left">给出接收请求服务器的地址和端口号</td>
</tr>
<tr>
<td align="left">Referer</td>
<td align="left">提供包含当前请求URL的文档的URL</td>
</tr>
<tr>
<td align="left">UA-color</td>
<td align="left">提供客户端显示器的显示颜色有关的信息</td>
</tr>
<tr>
<td align="left">UA-CPU</td>
<td align="left">给出客户端CPU类型和制造商</td>
</tr>
<tr>
<td align="left">UA-Disp</td>
<td align="left">提供了客户端显示器能力有关的信息</td>
</tr>
<tr>
<td align="left">UA-OS</td>
<td align="left">提供客客户机器上运行的操作系统和版本</td>
</tr>
<tr>
<td align="left">UA-Pixels</td>
<td align="left">提供了客户端显示器的像素信息</td>
</tr>
<tr>
<td align="left">User-Agent</td>
<td align="left">将发送请求的应用程序名称告知服务器</td>
</tr>
</tbody>
</table>
<h4>Accept首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Accept</td>
<td align="left">告诉服务器能够发送哪些媒体类型</td>
</tr>
<tr>
<td align="left">Accept-Charset</td>
<td align="left">告诉服务器能够发送哪些字符集</td>
</tr>
<tr>
<td align="left">Accept-Encoding</td>
<td align="left">告诉服务器能够发送哪些编码方式</td>
</tr>
<tr>
<td align="left">Accept-Language</td>
<td align="left">告诉服务器能够发送哪些语言</td>
</tr>
<tr>
<td align="left">TE</td>
<td align="left">告诉服务器可以使用哪些扩展传输编码</td>
</tr>
</tbody>
</table>
<h4>条件请求首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Expect</td>
<td align="left">允许客户端列出请求所要求的服务器行为</td>
</tr>
<tr>
<td align="left">If-Match</td>
<td align="left">如果实体标记与文档当前的实体标记相匹配，就获取这份文档</td>
</tr>
<tr>
<td align="left">If-Modify-Since</td>
<td align="left">除非在某个指定的日期之后资源被修改过，否则就限制这个请求</td>
</tr>
<tr>
<td align="left">If-None-Match</td>
<td align="left">如果实体标记与文档当前的实体不相符，就获取文档</td>
</tr>
<tr>
<td align="left">If-Range</td>
<td align="left">允许对文档的某个范围就行条件请求</td>
</tr>
<tr>
<td align="left">If-Unmodified-Since</td>
<td align="left">除非在某个指定日期之后资源没有被修改过，否则就限制这个请求</td>
</tr>
<tr>
<td align="left">Range</td>
<td align="left">如果服务器支持范围请求，就请求资源的指定范围</td>
</tr>
</tbody>
</table>
<h4>安全请求受首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Authorization</td>
<td align="left">包含了客户端提供给服务器，以便对其自身进行数据验证</td>
</tr>
<tr>
<td align="left">Cookie</td>
<td align="left">客户端用它想服务端发送一个令牌————它并不是真正的安全首部，确实隐含了安全功能</td>
</tr>
<tr>
<td align="left">Cookie2</td>
<td align="left">用来说明请求端支持的Cookie版本</td>
</tr>
</tbody>
</table>
<h4>代理请求首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Max-Forward</td>
<td align="left">在通往服务器的的路径上，将请求转给其他代理或网关的最大次数————与TARCE方法一起使用</td>
</tr>
<tr>
<td align="left">Proxy-Authorization</td>
<td align="left">与Authorization首部相同，但这个首部是在与代理进行认证时使用的</td>
</tr>
<tr>
<td align="left">Proxy-Connection</td>
<td align="left">与Connection首部相同，但这个首部是在与代理建立连接时使用的</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader7">响应首部</h3>
<p><em>响应报文有自己的首部集，以遍为客服端提供信息</em></p>
<h4>响应的信息性首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Age</td>
<td align="left">(从最初创建开始)响应持续时间</td>
</tr>
<tr>
<td align="left">Publick</td>
<td align="left">服务器为其资源支持的请求方法列表</td>
</tr>
<tr>
<td align="left">Retry-After</td>
<td align="left">如果资源不可用的话，在此日期或时间重试</td>
</tr>
<tr>
<td align="left">Server</td>
<td align="left">服务器应用程序软件的名称和版本</td>
</tr>
<tr>
<td align="left">Title</td>
<td align="left">对于html文档来说，就是HTML文档的源端给出的标题</td>
</tr>
<tr>
<td align="left">Wraning</td>
<td align="left">比原因短语中，更详细的警告报文</td>
</tr>
</tbody>
</table>
<h4>协商首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Accept-Ranges</td>
<td align="left">对此资源来说，服务器可接受的数据类型</td>
</tr>
<tr>
<td align="left">Vary</td>
<td align="left">服务器查看其他首部 列表，可能会使响应发生变化；也就是说，这是一个首部列表，服务器会根据这些首部的内容挑选出最合适的资源版本发送给客户端</td>
</tr>
</tbody>
</table>
<h4>安全响应首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Proxy-Authenticate</td>
<td align="left">来自代理对客户端的质询列表</td>
</tr>
<tr>
<td align="left">Set-Cookie</td>
<td align="left">不是真正的安全首部，但隐含安全功能；可以在客户端设置一个安全令牌，以遍服务端对客户端进行标志</td>
</tr>
<tr>
<td align="left">Set-Cookie2</td>
<td align="left">与Set-Cookie类似</td>
</tr>
<tr>
<td align="left">WWW-Authenticate</td>
<td align="left">来自服务器对客户端的质询列表</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader8">实体首部</h3>
<p><em>实体首部用于实体主体部分的首部</em></p>
<h4>内容首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Content-Base</td>
<td align="left">解析主体中相对URL时使用的基础URL</td>
</tr>
<tr>
<td align="left">Content-Enconding</td>
<td align="left">对主题执行的任意编码方式</td>
</tr>
<tr>
<td align="left">Content-Language</td>
<td align="left">理解主体时最适宜使用的自然语言</td>
</tr>
<tr>
<td align="left">Content-Length</td>
<td align="left">主体的长度或者尺寸</td>
</tr>
<tr>
<td align="left">Content-Location</td>
<td align="left">资源实体所处的位置</td>
</tr>
<tr>
<td align="left">Content-MD5</td>
<td align="left">主体的MD5校验和</td>
</tr>
<tr>
<td align="left">Content-Range</td>
<td align="left">在整个资源中此实体表示的资源范围</td>
</tr>
<tr>
<td align="left">Content-Type</td>
<td align="left">这个主题的对象类型</td>
</tr>
</tbody>
</table>
<h4>实体缓存首部</h4>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">ETag</td>
<td align="left">与此实体相关的实体标记</td>
</tr>
<tr>
<td align="left">Expires</td>
<td align="left">实体不在有效，要从原始的源端再次获取此实体的日期和时间</td>
</tr>
<tr>
<td align="left">Last-Modified</td>
<td align="left">这个实体最后一次被修改的日期和时间</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader9">状态吗</h2>
<p><em>状态码为客户端提供一种理解事务处理结果的快捷方式</em></p>
<ul><li>
<code>100-199</code>: 信息性状态码</li></ul>
<table>
<thead><tr>
<th align="left">状态码</th>
<th align="left">原因短语</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">100</td>
<td align="left">Continue</td>
<td align="left">说明收到了客户端的请求初始部分，请客户端继续。发送这个状态码后，服务端在收到请求后必须进行响应</td>
</tr>
<tr>
<td align="left">101</td>
<td align="left">Switching Protocols</td>
<td align="left">说明服务器端正在根据客户端的指定，将协议切换为Update首部所列的协议</td>
</tr>
</tbody>
</table>
<ul><li>
<code>200-299</code>: 成功状态码</li></ul>
<p><em>客户端发送请求时，这些请求通常都是成功的</em></p>
<table>
<thead><tr>
<th align="left">状态码</th>
<th align="left">原因短语</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">200</td>
<td align="left">OK</td>
<td align="left">请求没有问题，实体的主体部分包含请求的资源</td>
</tr>
<tr>
<td align="left">201</td>
<td align="left">Created</td>
<td align="left">用于创建服务器的对象请求(比如 PUT)，响应的实体部分中应该包含各种引用了以创建的资源的URL,Location首部包含的则是最具体的引用，服务器必须在发送这个状态之前创建好对象</td>
</tr>
<tr>
<td align="left">202</td>
<td align="left">Accepted</td>
<td align="left">请求已接受，但服务器还未对其执行任何操作。不能保证服务器会完成这个请求，只是意味着接受请求时，它看起来是有效的。服务器应该在实体的主体部分包含对请求状态的描述，或许还应该对请求完成时间的估计（或者包含一个指针，指向可以获取此信息的位置）</td>
</tr>
<tr>
<td align="left">203</td>
<td align="left">Non-Authoritative Information</td>
<td align="left">实体首部包含的信息不是来自于源服务器，而是来自资源的一份副本。如果中间节点上有一份资源副本，但无法或者没有对它所发送的资源有关的元信息（首部）进行验证，就会出现这种情况</td>
</tr>
<tr>
<td align="left">204</td>
<td align="left">No Content</td>
<td align="left">响应报文中包含若干首部和一个状态行，但没有实体的主体部分。主要用于浏览器不转为新文档的情况下，对其进行更新（比如刷新一个表达页面）</td>
</tr>
<tr>
<td align="left">205</td>
<td align="left">Reset Content</td>
<td align="left">另一个主要用于浏览器的代码。负责告诉浏览器清除当前页面中的所有html标签</td>
</tr>
<tr>
<td align="left">206</td>
<td align="left">Partail Content</td>
<td align="left">成功执行一个部分或者Range请求。稍后我们会看到，客户端可以通过一些特殊的首部来获取部分或范围内的文档————这个状态码就说明范围请求成功<em>响应中必须包括Content-Range、Date和ETag或者Content-Location首部</em>
</td>
</tr>
<tr>
<td align="left"> </td>
<td align="left"> </td>
<td align="left"> </td>
</tr>
</tbody>
</table>
<ul><li>
<code>300-399</code>: 重定向状态码</li></ul>
<p><em>重定向状态码要么告知客户端使用替代位置来访问它们感兴趣的资源，要么提供一个可替代的响应而不是资源的内容。如果资源已被移动，可发送一个重定向状态码和一个可选的Location首部来告知客户端资源已被移走，以及现在在哪里可以找到它</em></p>
<table>
<thead><tr>
<th align="left">状态码</th>
<th align="left">原因短语</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">300</td>
<td align="left">Multiple Choices</td>
<td align="left">客户端请求实际是一个指向多个资源的URL时会返回这个状态码，比如服务器上某个HTML文档有中文和英文版。返回这个代码时会有一个选项列；这样用户就可以选择他希望使用的一项</td>
</tr>
<tr>
<td align="left">301</td>
<td align="left">Moved Permanently</td>
<td align="left">在请求URL已被移出时。响应的Loaction首部中包含资源所处在的URL</td>
</tr>
<tr>
<td align="left">302</td>
<td align="left">Found</td>
<td align="left">与301类似；但是客户端应该使用Location首部给出的URL获取临时定位资源。将来的请求任使用老资源</td>
</tr>
<tr>
<td align="left">303</td>
<td align="left">Set Ohter</td>
<td align="left">告诉客户端应该使用另外一个URL来获取资源。新的URL资源位于响应报文Location首部。其主要目的是允许POST请求的响应将客户端定向到某个资源上去</td>
</tr>
<tr>
<td align="left">304</td>
<td align="left">Not Modify</td>
<td align="left">客户端可以通过所包含的请求首部，使其请求变成有条件的。如果客户端发送一个GET请求，而最近资源未改变的话，就可以用这个状态码来说明资源未被修改。带有这个状态码的响应不应该包含实体部分</td>
</tr>
<tr>
<td align="left">305</td>
<td align="left">Use Proxy</td>
<td align="left">用来说明必须通过一个代理来访问资源。代理的位置由Location来给出。很重要的一点，客户端是相对某个特定资源来解析这条响应的，不能假定所有请求，甚至所有对持有所请求的服务器请求都通过这个代理进行。如果客户端错误的让代理介入某个请求，可能引发破坏性的行为，照成安全漏铜问题</td>
</tr>
<tr>
<td align="left">306</td>
<td align="left">未使用</td>
<td align="left">未使用</td>
</tr>
<tr>
<td align="left">307</td>
<td align="left">Temporary Redirect</td>
<td align="left">与301状态码类似;但客户端应该使用Location首部给出的URL来临时定位资源。将来的资源应该用老的URL</td>
</tr>
</tbody>
</table>
<ul><li>
<code>400-499</code>: 客户端错误状态码</li></ul>
<p><em>有时候客户端会发送一个服务器无法处理的东西，比如格式错误的请求报文，或者最常见的时候一个不存在的URL</em></p>
<table>
<thead><tr>
<th align="left">状态码</th>
<th align="left">原因短语</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">400</td>
<td align="left">Bad Request</td>
<td align="left">用于告诉客户端发送了一个错误的请求</td>
</tr>
<tr>
<td align="left">401</td>
<td align="left">Unauthorized</td>
<td align="left">与适当的首部一起返回，在这个首部中请求客户端在获取资源的访问权之前，对自己进行认证</td>
</tr>
<tr>
<td align="left">402</td>
<td align="left">Payment Required</td>
<td align="left">状态码未使用</td>
</tr>
<tr>
<td align="left">403</td>
<td align="left">Forbidden</td>
<td align="left">用于说明请求被服务器拒绝。如果服务器说明为什么拒绝请求，可以包含实体的主体部分进行描述。但这个状态码通常是服务器不想说明原因的时候使用</td>
</tr>
<tr>
<td align="left">404</td>
<td align="left">Not Found</td>
<td align="left">用于说明服务器说明无法找到请求的URL。通常会包含一个实体，以便于客户端应用程序给用户看</td>
</tr>
<tr>
<td align="left">405</td>
<td align="left">Method Not Allowed</td>
<td align="left">发送的请求中带有所请求的URL不支持的方法时，会使用此状态码。因该在响应中包含Allow首部，以告诉客户端对所请求的资源可以使用哪些方法</td>
</tr>
<tr>
<td align="left">406</td>
<td align="left">Not Acceptable</td>
<td align="left">客户端可以指定参数来说明它愿意接受什么类型的实体。服务器没有与客户端接受的URL相匹配的资源的时，使用此代码。通常服务器会包含一些首部，以便客户端弄清除为什么请求无法满足</td>
</tr>
<tr>
<td align="left">407</td>
<td align="left">Proxy Authentication Required</td>
<td align="left">与401相似，但用于要求对资源进行认证的代理服务器</td>
</tr>
<tr>
<td align="left">408</td>
<td align="left">Request Timeout</td>
<td align="left">如果客户端请求的时间太长，服务器可以返回此状态码，并关闭连接。超时时常随服务器不同而不同，但通常对所有合法服务器来说，都是够长的</td>
</tr>
<tr>
<td align="left">409</td>
<td align="left">Conflict</td>
<td align="left">用于说明请求可能在资源上引发了一些冲突。服务器担心会引发冲突，可以发送此状态码。响应中应该包含描述冲突的主体</td>
</tr>
<tr>
<td align="left">410</td>
<td align="left">Gone</td>
<td align="left">与404类似，只是服务器曾经拥有过此资源。主要用于Web站点的维护，这样服务器管理者就可以在资源被移除的情况下通知客户端</td>
</tr>
<tr>
<td align="left">411</td>
<td align="left">Length Required</td>
<td align="left">服务器要求请求报文中包含Content-length时使用</td>
</tr>
<tr>
<td align="left">412</td>
<td align="left">Precondition Falied</td>
<td align="left">客户端发送请求条件，且其中一个条件失败的时候使用。客户端包含了Expect首部时发送的就是条件请求</td>
</tr>
<tr>
<td align="left">413</td>
<td align="left">Request Entiny Too large</td>
<td align="left">客户端发送的实体主体部分比服务器能够或者希望处理的要大时，使用此状态码</td>
</tr>
<tr>
<td align="left">414</td>
<td align="left">Request Url Too Long</td>
<td align="left">客户端发送的请求中的请求URL比服务器能够或者希望处理的要长时，使用此状态码</td>
</tr>
<tr>
<td align="left">415</td>
<td align="left">Unsupported Media Type</td>
<td align="left">服务端无法理解或支持客户端发送实体的内容类型时，使用此状态码</td>
</tr>
<tr>
<td align="left">416</td>
<td align="left">Request Range Not Satisfiable</td>
<td align="left">请求报文是请求资源的某个范围，而此范围无效或无法满足时，使用此状态码</td>
</tr>
<tr>
<td align="left">417</td>
<td align="left">Expection Failed</td>
<td align="left">请求的Expect请求包含了一个期望，但服务器无法满足此期望时，使用此状态码。如果代理或其他中间程序有确切证据说明源服务区器端会为请求产生一个失败期望，就可以发送这个状态码</td>
</tr>
</tbody>
</table>
<ul><li>
<code>500-599</code>: 服务端错误状态码</li></ul>
<p><em>有时候客户端发送一个请求，服务器自身发生错误时</em></p>
<table>
<thead><tr>
<th align="left">状态码</th>
<th align="left">原因短语</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">500</td>
<td align="left">Internal Server Error</td>
<td align="left">服务器遇到一个妨碍它为请求提供服务的错误时，使用此状态码</td>
</tr>
<tr>
<td align="left">501</td>
<td align="left">Not Inplemented</td>
<td align="left">客户端发送请求时超出服务器的能力范围，使用此状态码</td>
</tr>
<tr>
<td align="left">502</td>
<td align="left">Bad Gateway</td>
<td align="left">作为代理或网关使用服务器从响应链的下一条链路上收到一条伪响应时，使用此状态码</td>
</tr>
<tr>
<td align="left">503</td>
<td align="left">Service Unavailable</td>
<td align="left">用来说明服务器现在无法为请求提供服务，但将来可以。如果服务器知道资源什么时候可用，可以在响应中包含一个Retry-after首部</td>
</tr>
<tr>
<td align="left">504</td>
<td align="left">Gateway Timeout</td>
<td align="left">与状态码408类似，只是这里的响应来自一个网关或代理，他们在等待另一服务器对其请求进行响应时超时了</td>
</tr>
<tr>
<td align="left">505</td>
<td align="left">HTTP Version Not Supported</td>
<td align="left">服务器收到的请求使用了它无法或不愿支持的协议版本，使用此状态码。有些服务器应用程序选择不支持协议的早早期版本</td>
</tr>
</tbody>
</table>
<p><a href="https://github.com/Iwouldliketobeapig/hexo-dt/blob/master/source/_posts/project/http.md" rel="nofollow noreferrer" target="_blank">在github上编辑此页</a><br><a href="http://www.hidutao.com/2018/03/19/project/http/" rel="nofollow noreferrer" target="_blank">博主个人博客</a><br><a href="http://www.runoob.com/http/http-tutorial.html" rel="nofollow noreferrer" target="_blank">参考:http协议</a><br>[http权威指南]</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
http协议前端常识

## 原文链接
[https://segmentfault.com/a/1190000014100927](https://segmentfault.com/a/1190000014100927)

