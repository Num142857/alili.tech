---
title: '常见 HTTP/FTP/WebSocket 错误代码大全' 
date: 2019-01-31 2:31:16
hidden: true
slug: cz9zezjb4dk
categories: [reprint]
---

{{< raw >}}

                    
<p>常见HTTP/FTP/WebSocket错误代码大全<br><a href="https://github.com/jaywcjlove/handbook/blob/master/other/HTTP-Status-codes.md" rel="nofollow noreferrer" target="_blank">https://github.com/jaywcjlove...</a></p>
<h2 id="articleHeader0">HTTP</h2>
<h3 id="articleHeader1">1xx消息</h3>
<p><em>这一类型的状态码，代表请求已被接受，需要继续处理。这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束。由于HTTP/1.0协议中没有定义任何1xx状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送1xx响应。 这些状态码代表的响应都是信息性的，标示客户应该采取的其他行动。</em></p>
<ul>
<li><p>100 - 客户端应当继续发送请求</p></li>
<li><p>101 - 切换协议</p></li>
<li><p>102 - 处理将被继续执行</p></li>
</ul>
<h3 id="articleHeader2">2xx成功</h3>
<p><em>这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。</em></p>
<ul>
<li><p>200 - （成功）请求已成功，请求所希望的响应头或数据体将随此响应返回。</p></li>
<li><p>201 - （已创建）请求成功且服务器已创建了新的资源。。</p></li>
<li><p>202 - （已接受）服务器已接受了请求，但尚未对其进行处理。</p></li>
<li><p>203 - （非授权信息）服务器已成功处理了请求，但返回了可能来自另一来源的信息。</p></li>
<li><p>204 - （无内容）服务器成功处理了请求，但未返回任何内容。</p></li>
<li><p>205 - （重置内容）服务器成功处理了请求，但未返回任何内容。</p></li>
<li><p>206 - （部分内容）服务器成功处理了部分 GET 请求。</p></li>
</ul>
<h3 id="articleHeader3">3xx重定向</h3>
<p><em>这类状态码代表需要客户端采取进一步的操作才能完成请求。通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的Location域中指明。按照HTTP/1.0版规范的建议，浏览器不应自动访问超过5次的重定向。对重定向一般是由浏览器来控制重定向的次数，重定向会导致客户端不必要的资源消耗</em></p>
<ul>
<li><p>300 - 多重选择，被请求的资源有一系列可供选择的回馈信息。</p></li>
<li><p>301 - 永久移除，被请求的资源已永久移动到新位置。</p></li>
<li><p>302 - 临时移动，请求的资源现在临时从不同的URI响应请求。</p></li>
<li><p>303 - 查看其他位置，对应当前请求的响应可以在另一个URI上被找到，而且客户端应当采用GET的方式访问那个资源。</p></li>
<li><p>304 - 未修改。自从上次请求后，请求的网页未被修改过。服务器返回此响应时，不会返回网页内容。</p></li>
<li><p>305 - 使用代理，被请求的资源必须通过指定的代理才能被访问。</p></li>
<li><p><del>306</del> - 临时重定向，在最新版的规范中，306状态码已经不再被使用。</p></li>
<li><p>307 - 临时重定向。</p></li>
</ul>
<h3 id="articleHeader4">4xx客户端错误</h3>
<p><em>这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。</em></p>
<ul>
<li><p>400 - 错误的请求。</p></li>
<li><p>401 - 访问被拒绝。</p></li>
<li><p>402 - 付款要求。</p></li>
<li>
<p>403 - 禁止访问</p>
<ul>
<li><p>403.1 - 执行访问被禁止。</p></li>
<li><p>403.2 - 读访问被禁止。</p></li>
<li><p>403.3 - 写访问被禁止。</p></li>
<li><p>403.4 - 要求 SSL。</p></li>
<li><p>403.5 - 要求 SSL 128。</p></li>
<li><p>403.6 - IP 地址被拒绝。</p></li>
<li><p>403.7 - 要求客户端证书。</p></li>
<li><p>403.8 - 站点访问被拒绝。</p></li>
<li><p>403.9 - 用户数过多。</p></li>
<li><p>403.10 - 配置无效。</p></li>
<li><p>403.11 - 密码更改。</p></li>
<li><p>403.12 - 拒绝访问映射表。</p></li>
<li><p>403.13 - 客户端证书被吊销。</p></li>
<li><p>403.14 - 拒绝目录列表。</p></li>
<li><p>403.15 - 超出客户端访问许可。</p></li>
<li><p>403.16 - 客户端证书不受信任或无效。</p></li>
<li><p>403.17 - 客户端证书已过期或尚未生效。</p></li>
<li><p>403.18 - 在当前的应用程序池中不能执行所请求的 URL。</p></li>
<li><p>403.19 - 不能为这个应用程序池中的客户端执行 CGI。</p></li>
<li><p>403.20 - Passport 登录失败。</p></li>
</ul>
</li>
<li>
<p>404 - 未找到。</p>
<ul>
<li><p>404.0 -（无） – 没有找到文件或目录。</p></li>
<li><p>404.1 - 无法在所请求的端口上访问 Web 站点。</p></li>
<li><p>404.2 - Web 服务扩展锁定策略阻止本请求。</p></li>
<li><p>404.3 - MIME 映射策略阻止本请求。</p></li>
</ul>
</li>
<li><p>405 - 用来访问本页面的 HTTP 谓词不被允许（方法不被允许）</p></li>
<li><p>406 - 客户端浏览器不接受所请求页面的 MIME 类型。</p></li>
<li><p>407 - 要求进行代理身份验证。</p></li>
<li><p>408 - 请求超时。</p></li>
<li><p>409 - 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。</p></li>
<li><p>410 - 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。</p></li>
<li><p>411 - 服务器拒绝在没有定义Content-Length头的情况下接受请求。</p></li>
<li><p>412 - 前提条件失败。</p></li>
<li><p>413 – 请求实体太大。</p></li>
<li><p>414 - 请求 URI 太长。</p></li>
<li><p>415 – 不支持的媒体类型。</p></li>
<li><p>416 – 所请求的范围无法满足。</p></li>
<li><p>417 – 执行失败。</p></li>
<li><p>418 – 本操作码是在1998年作为IETF的传统<a href="http://www.baike.com/wiki/%E6%81%B6%E6%90%9ERFC" rel="nofollow noreferrer" target="_blank">愚人节笑话</a>。</p></li>
<li><p>421 – 从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围。</p></li>
<li><p>422 – 请求格式正确，但是由于含有语义错误，无法响应。</p></li>
<li><p>423 – 当前资源被锁定。</p></li>
<li><p>424 – 由于之前的某个请求发生的错误，导致当前请求失败。</p></li>
<li><p>425 – 无序的集合。</p></li>
<li><p>426 – 客户端应当切换到TLS/1.0。</p></li>
<li><p>451 – （由IETF在2015核准后新增加）该访问因法律的要求而被拒绝。</p></li>
</ul>
<h3 id="articleHeader5">5xx服务器错误</h3>
<p><em>这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。</em></p>
<ul>
<li><p>500 - 内部服务器错误。</p></li>
<li><p>501 - 尚未实施，页眉值指定了未实现的配置。</p></li>
<li><p>502 - 错误网关，Web 服务器用作网关或代理服务器时收到了无效响应。</p></li>
<li><p>503 - 服务不可用，这个错误代码为 IIS 6.0 所专用。</p></li>
<li><p>504 - 网关超时，服务器作为网关或代理，未及时从上游服务器接收请求。</p></li>
<li><p>505 - HTTP 版本不受支持，服务器不支持请求中所使用的 HTTP 协议版本。</p></li>
<li><p>506 - 服务器没有正确配置。</p></li>
<li><p>507 - 存储空间不足。服务器无法存储完成请求所必须的内容。这个状况被认为是临时的。</p></li>
<li><p>509 - 带宽超过限制。这不是一个官方的状态码，但是仍被广泛使用。</p></li>
<li><p>510 - 没有扩展，获取资源所需要的策略并没有被满足。</p></li>
</ul>
<h2 id="articleHeader6">FTP</h2>
<h3 id="articleHeader7">1xx初步</h3>
<p><em>肯定的初步答复，这些状态代码指示一项操作已经成功开始，但客户端希望在继续操作新命令前得到另一个答复。</em></p>
<ul>
<li><p>110 重新启动标记答复。</p></li>
<li><p>120 服务已就绪，在 nnn 分钟后开始。</p></li>
<li><p>125 数据连接已打开，正在开始传输。</p></li>
<li><p>150 文件状态正常，准备打开数据连接。</p></li>
</ul>
<h3 id="articleHeader8">2xx完成</h3>
<p><em>肯定的完成答复，一项操作已经成功完成。客户端可以执行新命令。</em></p>
<ul>
<li><p>200 命令确定。</p></li>
<li><p>202 未执行命令，站点上的命令过多。</p></li>
<li><p>211 系统状态，或系统帮助答复。</p></li>
<li><p>212 目录状态。</p></li>
<li><p>213 文件状态。</p></li>
<li><p>214 帮助消息。</p></li>
<li><p>215 NAME 系统类型，其中，NAME 是 Assigned Numbers 文档中所列的正式系统名称。</p></li>
<li><p>220 服务就绪，可以执行新用户的请求。</p></li>
<li><p>221 服务关闭控制连接。如果适当，请注销。</p></li>
<li><p>225 数据连接打开，没有进行中的传输。</p></li>
<li><p>226 关闭数据连接。请求的文件操作已成功（例如，传输文件或放弃文件）。</p></li>
<li><p>227 进入被动模式 (h1,h2,h3,h4,p1,p2)。</p></li>
<li><p>230 用户已登录，继续进行。</p></li>
<li><p>250 请求的文件操作正确，已完成。</p></li>
<li><p>257 已创建“PATHNAME”。</p></li>
</ul>
<h3 id="articleHeader9">3xx中间</h3>
<p><em>肯定的中间答复，该命令已成功，但服务器需要更多来自客户端的信息以完成对请求的处理。</em></p>
<ul>
<li><p>331 用户名正确，需要密码。</p></li>
<li><p>332 需要登录帐户。</p></li>
<li><p>350 请求的文件操作正在等待进一步的信息。</p></li>
</ul>
<h3 id="articleHeader10">4xx瞬态否定</h3>
<p><em>瞬态否定的完成答复，该命令不成功，但错误是暂时的。如果客户端重试命令，可能会执行成功。</em></p>
<ul>
<li><p>421 服务不可用，正在关闭控制连接。如果服务确定它必须关闭，将向任何命令发送这一应答。</p></li>
<li><p>425 无法打开数据连接。</p></li>
<li><p>426 Connection closed; transfer aborted.</p></li>
<li><p>450 未执行请求的文件操作。文件不可用（例如，文件繁忙）。</p></li>
<li><p>451 请求的操作异常终止：正在处理本地错误。</p></li>
<li><p>452 未执行请求的操作。系统存储空间不够。</p></li>
</ul>
<h2 id="articleHeader11">5xx永久性否定</h2>
<p><em>永久性否定的完成答复，该命令不成功，错误是永久性的。如果客户端重试命令，将再次出现同样的错误。</em></p>
<ul>
<li><p>500 语法错误，命令无法识别。这可能包括诸如命令行太长之类的错误。</p></li>
<li><p>501 在参数中有语法错误。</p></li>
<li><p>502 未执行命令。</p></li>
<li><p>503 错误的命令序列。</p></li>
<li><p>504 未执行该参数的命令。</p></li>
<li><p>530 未登录。</p></li>
<li><p>532 存储文件需要帐户。</p></li>
<li><p>550 未执行请求的操作。文件不可用（例如，未找到文件，没有访问权限）。</p></li>
<li><p>551 请求的操作异常终止：未知的页面类型。</p></li>
<li><p>552 请求的文件操作异常终止：超出存储分配（对于当前目录或数据集）。</p></li>
<li><p>553 未执行请求的操作。不允许的文件名。</p></li>
</ul>
<h2 id="articleHeader12">6xx受保护</h2>
<ul>
<li><p>600 Series，Replies regarding confidentiality and integrity</p></li>
<li><p>631 Integrity protected reply.</p></li>
<li><p>632 Confidentiality and integrity protected reply.</p></li>
<li><p>633 Confidentiality protected reply.</p></li>
</ul>
<h2 id="articleHeader13">WebSockets状态码</h2>
<p><em>WebSockets 的CloseEvent 会在连接关闭时发送给使用 WebSockets 的客户端。它在 WebSocket 对象的 onclose 事件监听器中使用。服务端发送的关闭码，以下为已分配的状态码。</em></p>
<table>
<thead><tr>
<th>状态码</th>
<th>名称</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>0–999</td>
<td>-</td>
<td>保留段, 未使用。</td>
</tr>
<tr>
<td>1000</td>
<td>CLOSE_NORMAL</td>
<td>正常关闭; 无论为何目的而创建, 该链接都已成功完成任务。</td>
</tr>
<tr>
<td>1001</td>
<td>CLOSE_GOING_AWAY</td>
<td>终端离开, 可能因为服务端错误, 也可能因为浏览器正从打开连接的页面跳转离开。</td>
</tr>
<tr>
<td>1002</td>
<td>CLOSE_PROTOCOL_ERROR</td>
<td>由于协议错误而中断连接。</td>
</tr>
<tr>
<td>1003</td>
<td>CLOSE_UNSUPPORTED</td>
<td>由于接收到不允许的数据类型而断开连接 (如仅接收文本数据的终端接收到了二进制数据)。</td>
</tr>
<tr>
<td>1004</td>
<td>-</td>
<td>保留。 其意义可能会在未来定义。</td>
</tr>
<tr>
<td>1005</td>
<td>CLOSE_NO_STATUS</td>
<td>保留。  表示没有收到预期的状态码。</td>
</tr>
<tr>
<td>1006</td>
<td>CLOSE_ABNORMAL</td>
<td>保留。 用于期望收到状态码时连接非正常关闭 (也就是说, 没有发送关闭帧)。</td>
</tr>
<tr>
<td>1007</td>
<td>Unsupported Data</td>
<td>由于收到了格式不符的数据而断开连接 (如文本消息中包含了非 UTF-8 数据)。</td>
</tr>
<tr>
<td>1008</td>
<td>Policy Violation</td>
<td>由于收到不符合约定的数据而断开连接。 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景。</td>
</tr>
<tr>
<td>1009</td>
<td>CLOSE_TOO_LARGE</td>
<td>由于收到过大的数据帧而断开连接。</td>
</tr>
<tr>
<td>1010</td>
<td>Missing Extension</td>
<td>客户端期望服务器商定一个或多个拓展, 但服务器没有处理, 因此客户端断开连接。</td>
</tr>
<tr>
<td>1011</td>
<td>Internal Error</td>
<td>客户端由于遇到没有预料的情况阻止其完成请求, 因此服务端断开连接。</td>
</tr>
<tr>
<td>1012</td>
<td>Service Restart</td>
<td>服务器由于重启而断开连接。 [Ref]</td>
</tr>
<tr>
<td>1013</td>
<td>Try Again Later</td>
<td>服务器由于临时原因断开连接, 如服务器过载因此断开一部分客户端连接。 [Ref]</td>
</tr>
<tr>
<td>1014</td>
<td>-</td>
<td>由 WebSocket</td>
<td>标准保留以便未来使用。</td>
</tr>
<tr>
<td>1015</td>
<td>TLS Handshake</td>
<td>保留。 表示连接由于无法完成 TLS 握手而关闭 (例如无法验证服务器证书)。</td>
</tr>
<tr>
<td>1016–1999</td>
<td>-</td>
<td>由 WebSocket 标准保留以便未来使用。</td>
</tr>
<tr>
<td>2000–2999</td>
<td>-</td>
<td>由 WebSocket 拓展保留使用。</td>
</tr>
<tr>
<td>3000–3999</td>
<td>-</td>
<td>可以由库或框架使用。 不应由应用使用。 可以在 IANA 注册, 先到先得。</td>
</tr>
<tr>
<td>4000–4999</td>
<td>-</td>
<td>可以由应用使用。</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader14">参考资料</h2>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" rel="nofollow noreferrer" target="_blank">HTTP状态码列表</a></p></li>
<li><p><a href="https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes" rel="nofollow noreferrer" target="_blank">FTP状态码列表</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent" rel="nofollow noreferrer" target="_blank">MDN CloseEvent</a></p></li>
<li><p><a href="https://en.wikipedia.org/wiki/HTTP_404#Custom_error_pages" rel="nofollow noreferrer" target="_blank">HTTP 404</a></p></li>
<li><p><a href="https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes" rel="nofollow noreferrer" target="_blank">List of FTP server return codes</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview" rel="nofollow noreferrer" target="_blank">HTTP概述</a></p></li>
<li><p><a href="http://www.getnetgoing.com/HTTP-403.html" rel="nofollow noreferrer" target="_blank">Help for HTTP error 403: “Forbidden”</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见 HTTP/FTP/WebSocket 错误代码大全

## 原文链接
[https://segmentfault.com/a/1190000007587248](https://segmentfault.com/a/1190000007587248)

