---
title: '小哥哥,小姐姐,我有一份tcp、http面试指南你要吗？'
reprint: true
categories: reprint
abbrlink: 1d8dd1aa
date: 2018-10-23 00:00:00
---

{{% raw %}}

                    
<h2 id="articleHeader0">来来来</h2>
<p>对，我就是骗你进来的。嘿嘿嘿... 既然来了就看看再走嘛</p>
<p>作为一个学通信出身的前端，说道http、tcp什么的，算是到了我的领域了。（我会告诉你我上课净睡觉了，啥也没学到吗？）这次给大家讲讲http，提高水平、丰富知识。（要不是为了面试，谁会管什么ttp呀，对我是就这么肤浅）</p>
<h2 id="articleHeader1">TCP</h2>
<p>要说http就绕不开tcp，TCP协议对应于传输层，而HTTP协议对应于应用层，从本质上来说，二者没有可比性。但是，http是基于tcp协议的。</p>
<h3 id="articleHeader2">TCP/IP 协议分层模型</h3>
<ul>
<li>物理层将二进制的0和1和电压高低，光的闪灭和电波的强弱信号进行转换</li>
<li>链路层代表驱动</li>
<li>
<p>网络层</p>
<ul>
<li>使用 IP 协议，IP 协议基于 IP 转发分包数据</li>
<li>IP 协议是个不可靠协议，不会重发</li>
<li>IP 协议发送失败会使用ICMP 协议通知失败</li>
<li>
<p>ARP 解析 IP 中的 MAC 地址，MAC 地址由网卡出厂提供</p>
<ul><li>IP 还隐含链路层的功能，不管双方底层的链路层是啥，都能通信</li></ul>
</li>
</ul>
</li>
<li><p>传输层</p></li>
<li><ul><li>
<p>通用的 TCP 和 UDP 协议</p>
<ul>
<li>TCP 协议面向有连接，能正确处理丢包，传输顺序错乱的问题，但是为了建立与断开连接，需要至少7次的发包收包，资源浪费</li>
<li>UDP 面向无连接，不管对方有没有收到，如果要得到通知，需要通过应用层</li>
</ul>
</li></ul></li>
<ul><li>
<p>会话层以上分层</p>
<ul>
<li>TCP/IP 分层中，会话层，表示层，应用层集中在一起</li>
<li>网络管理通过 SNMP 协议</li>
</ul>
</li></ul>
</ul>
<h3 id="articleHeader3">划重点了啊（面试最常问的啊）</h3>
<p><strong>TCP三次握手和四次挥手？</strong></p>
<p>被问烂了的问题了，这里不详细讲了，三次握手：</p>
<ul>
<li>客户端–发送带有SYN标志的数据包–一次握手–服务端</li>
<li>服务端–发送带有SYN/ACK标志的数据包–二次握手–客户端</li>
<li>客户端–发送带有带有ACK标志的数据包–三次握手–服务端</li>
</ul>
<p>四次挥手：</p>
<ul>
<li>客户端-发送一个FIN，用来关闭客户端到服务器的数据传送</li>
<li>服务器-收到这个FIN，它发回一个ACK，确认序号为收到的序号加1 。和SYN一样，一个FIN将占用一个序号</li>
<li>服务器-关闭与客户端的连接，发送一个FIN给客户端</li>
<li>客户端-发回ACK报文确认，并将确认序号设置为收到序号加1</li>
</ul>
<p>还不懂的童鞋，去找别人的文章好好看看！</p>
<p><strong>TCP和UDP的区别？</strong></p>
<p>仔细阅读上面传输层里写的内容，懂了吗？（不懂？不懂背下来啊，混蛋！）<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014434214?w=255&amp;h=255" src="https://static.alili.tech/img/remote/1460000014434214?w=255&amp;h=255" alt="举个例子" title="举个例子" style="cursor: pointer; display: inline;"></span></p>
<p>我们微信聊天时候经常会有这种情况。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014434215?w=500&amp;h=820" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>是不是感同身受，这种情况就是对方用了TCP协议来聊天，要经过--在吗？--在--巴拉巴拉，才能成功的传递信息。<br>而如果对方使用UDP，则会有事直接说，不管我收没收到。（以后找我请用UDP协议，着急直接打电话！）</p>
<h2 id="articleHeader4">HTTP</h2>
<p>Http协议是建立在TCP协议基础之上的，当浏览器需要从服务器获取网页数据的时候，会发出一次Http请求。Http会通过TCP建立起一个到服务器的连接通道，当本次请求需要的数据完毕后，Http会立即将TCP连接断开，这个过程是很短的。所以Http连接是一种短连接，是一种无状态的连接。</p>
<p>所谓的无状态，是指浏览器每次向服务器发起请求的时候，不是通过一个连接，而是每次都建立一个新的连接。如果是一个连接的话，服务器进程中就能保持住这个连接并且在内存中记住一些信息状态。而每次请求结束后，连接就关闭，相关的内容就释放了，所以记不住任何状态，成为无状态连接。</p>
<h3 id="articleHeader5">http传输流</h3>
<p>无耻盗图</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014434216" src="https://static.alili.tech/img/remote/1460000014434216" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>发送端在层与层间传输数据时，没经过一层都会被加上首部信息，接收端每经过一层都会删除一条首部</p>
<h3 id="articleHeader6">又来划重点了啊</h3>
<p><strong>HTTP的英文全称？</strong></p>
<p>开玩笑的，这个显然不是重点，但是不排除有人会去问，还是要知道的：<br>超文本传输协议（HyperText Transfer Protocol）</p>
<p><strong>状态码？</strong></p>
<p>状态码就那些，常用的记住就行了：</p>
<p>2XX 成功</p>
<ul>
<li>200 OK，表示从客户端发来的请求在服务器端被正确处理</li>
<li>204 No content，表示请求成功，但响应报文不含实体的主体部分</li>
<li>206 Partial Content，进行范围请求</li>
</ul>
<p>3XX 重定向</p>
<ul>
<li>301 moved permanently，永久性重定向，表示资源已被分配了新的 URL</li>
<li>302 found，临时性重定向，表示资源临时被分配了新的 URL</li>
<li>303 see other，表示资源存在着另一个 URL，应使用 GET 方法丁香获取资源</li>
<li>304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况</li>
<li>307 temporary redirect，临时重定向，和302含义相同</li>
</ul>
<p>4XX 客户端错误</p>
<ul>
<li>400 bad request，请求报文存在语法错误</li>
<li>401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息</li>
<li>403 forbidden，表示对请求资源的访问被服务器拒绝</li>
<li>404 not found，表示在服务器上没有找到请求的资源</li>
</ul>
<p>5XX 服务器错误</p>
<ul>
<li>500 internal sever error，表示服务器端在执行请求时发生了错误</li>
<li>503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求</li>
</ul>
<p><strong>HTTP协议格式？</strong></p>
<p>HTTP的请求和响应的消息协议是一样的，分为三个部分，起始行、消息头和消息体。这三个部分以CRLF作为分隔符。最后一个消息头有两个CRLF，用来表示消息头部的结束。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014434217" src="https://static.alili.tech/img/remote/1460000014434217" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>HTTP请求的起始行称为请求行，形如GET /index.html HTTP/1.1</p>
<p>HTTP响应的起始行称为状态行，形如200 ok</p>
<p>消息头部有很多键值对组成，多个键值对之间使用CRLF作为分隔符，也可以完全没有键值对。形如Content-Encoding: gzip<br>消息体是一个字符串，字符串的长度是由消息头部的Content-Length键指定的。如果没有Content-Length字段说明没有消息体，譬如GET请求就是没有消息体的，POST请求的消息体一般用来放置表单数据。GET请求的响应返回的页面内容也是放在消息体里面的。我们平时调用API返回的JSON内容都是放在消息体里面的。</p>
<p><strong>HTTP的无状态性？</strong></p>
<p>所谓HTTP协议的无状态性是指服务器的协议层无需为不同的请求之间建立任何相关关系，它特指的是协议层的无状态性。但是这并不代表建立在HTTP协议之上的应用程序就无法维持状态。应用层可以通过会话Session来跟踪用户请求之间的相关性，服务器会为每个会话对象绑定一个唯一的会话ID，浏览器可以将会话ID记录在本地缓存LocalStorage或者Cookie，在后续的请求都带上这个会话ID，服务器就可以为每个请求找到相应的会话状态。</p>
<p><strong>输入url到页面加载都发生了什么事情？（最最常问的来了）</strong></p>
<ul>
<li>输入地址</li>
<li>浏览器查找域名的 IP 地址</li>
</ul>
<p>这一步包括 DNS 具体的查找过程，包括：浏览器缓存-&gt;系统缓存-&gt;路由器缓存...</p>
<li><ul>
<li>浏览器向 web 服务器发送一个 HTTP 请求</li>
<li>服务器的永久重定向响应（从 <a href="http://example.com" rel="nofollow noreferrer" target="_blank">http://example.com</a> 到 <a href="http://www.example.com" rel="nofollow noreferrer" target="_blank">http://www.example.com</a>）</li>
</ul></li>
<ul>
<li>
<p>浏览器跟踪重定向地址</p>
<ul><li>服务器处理请求</li></ul>
</li>
<li>服务器返回一个 HTTP 响应</li>
<li>
<p>浏览器显示 HTML</p>
<ul>
<li>浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）</li>
<li>. 浏览器发送异步请求</li>
</ul>
</li>
</ul>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014434218?w=500&amp;h=500" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000014434209](https://segmentfault.com/a/1190000014434209)

## 原文标题
小哥哥,小姐姐,我有一份tcp、http面试指南你要吗？
