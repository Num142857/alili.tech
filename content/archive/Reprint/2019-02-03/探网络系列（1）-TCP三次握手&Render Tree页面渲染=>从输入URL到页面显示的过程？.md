---
title: '探网络系列（1）-TCP三次握手&Render Tree页面渲染=>从输入URL到页面显示的过程？' 
date: 2019-02-03 2:30:40
hidden: true
slug: c8k8bsi368w
categories: [reprint]
---

{{< raw >}}

                    
<p>最近工作之余一直在<a href="https://xiaohuazheng.github.io/tags/#" rel="nofollow noreferrer" target="_blank">温故js系列</a>，想知新，想提升，以小技术点为节奏去回顾。今天突然想到回顾一下这个http知识，http知识有太多深层次需要学习，今天简要回顾，浅析下这个技术点。<br>主要通过五个步骤浅析这个过程，有错误的地方，烦请斧正，互相学习。</p>
<h3 id="articleHeader0">1、发送URL，请求IP地址</h3>
<p>当发送一个URL请求时，不管这个URL是Web页面的URL还是Web页面上每个资源的URL，浏览器都会开启一个线程来处理这个请求，同时在远程DNS服务器上启动一个DNS查询，让浏览器获得请求对应的IP地址。<br>（这儿涉及的“DNS 查询和通过 Socket 发送数据”知识点见链接文章）</p>
<h3 id="articleHeader1">2、TCP三次握手</h3>
<p>浏览器与远程 Web 服务器通过 TCP 三次握手协商来建立一个 TCP/IP 连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这三个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，而后服务器应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。<br><span class="img-wrap"><img data-src="/img/bVDcBf?w=719&amp;h=800" src="https://static.alili.tech/img/bVDcBf?w=719&amp;h=800" alt="握手挥手图解" title="握手挥手图解" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ACK: ACK=1表示该报文段中有确认号需要处理。
SYN: SYN=1 ACK=0表明是建立连接请求报文段，SYN=1 ACK=1表明同意建立连接报文。
FIN: FIN=1表示对端的数据已经发送完毕，要求释放连接。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>ACK: <span class="hljs-attr">ACK=1表示该报文段中有确认号需要处理。</span>
SYN: <span class="hljs-attr">SYN=1</span> <span class="hljs-attr">ACK=0表明是建立连接请求报文段，SYN=1</span> <span class="hljs-attr">ACK=1表明同意建立连接报文。</span>
FIN: <span class="hljs-attr">FIN=1表示对端的数据已经发送完毕，要求释放连接。</span>
</code></pre>
<h4>第一次握手：建立连接</h4>
<p>客户端发送连接请求报文段，将SYN值设为1，<code>Sequence Number</code>为x。客户端进入<code>SYN_SEND</code>状态，等待服务器的确认。</p>
<h4>第二次握手：服务器收到SYN报文段</h4>
<p>服务器收到客户端SYN报文段，需要对这个SYN报文段进行确认，设置<code>Acknowledgment Number</code>为x+1(<code>Sequence Number+1</code>)。同时，自己自己还要发送SYN请求信息，将SYN值设为1，<code>Sequence Number</code>设为y。服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，服务器进入<code>SYN_RECV</code>状态。</p>
<h4>第三次握手：客户端收到SYN+ACK报文段</h4>
<p>客户端收到服务器的SYN+ACK报文段后将<code>Acknowledgment Number</code>设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入<code>ESTABLISHED</code>状态，完成TCP三次握手。</p>
<p>完成三次握手，客户端与服务器开始传送数据，在上述过程中，还有一些重要的概念： </p>
<p>未连接队列：在三次握手协议中，服务器维护一个未连接队列，该队列为每个客户端的SYN包（<code>syn=j</code>）开设一个条目，该条目表明服务器已收到SYN包，并向客户发出确认，正在等待客户的确认包。这些条目所标识的连接在服务器处于<code>Syn_RECV</code>状态，当服务器收到客户的确认包时，删除该条目，服务器进入<code>ESTABLISHED</code>状态。 <code>Backlog参数</code>：表示未连接队列的最大容纳数目。 </p>
<p>SYN-ACK 重传次数：服务器发送完<code>SYN－ACK</code>包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传，如果重传次数超过系统规定的最大重传次数，系统将该连接信息从未连接队列中删除。注意，每次重传等待的时间不一定相同。 </p>
<p>未连接存活时间：是指未连接队列的条目存活的最长时间，也即服务从收到SYN包到确认这个报文无效的最长时间，该时间值是所有重传请求包的最长等待时间总和。有时我们也称未连接存活时间为Timeout时间、<code>SYN_RECV</code>存活时间。</p>
<h4>为什么是3次握手？</h4>
<p>图片及问题转自jimmy_thr的<a href="https://segmentfault.com/a/1190000004569460#articleHeader1"></a><a href="https://segmentfault.com/a/1190000004569460" target="_blank">https://segmentfault.com/a/11...</a></p>
<p>很简单呀，因为3次就够了,干嘛用4次。23333. 举个例子吧，假如是2次的话， 可能会出现这样一个情况。</p>
<p>当客户端发送一次请求A后，但是A在网络延迟了很久， 接着客户端又发送了一次B，但是此时A已经无效了。 接着服务器相应了B，并返回TCP连接头，建立连接(这里就2次哈)。 然后，A 历经千山万水终于到服务器了， 服务器一看有请求来了，则接受，由于一开始A带着的TCP格式都是正确的，那么服务器，理所应当的也返回成功连接的flag，但是，此时客户端已经判断该次请求无效，废弃了。 然后服务器，就这么一直挂着(浪费资源)，造成的一个问题是，md, 这个锅是谁的？ 所以，为了保险起见，再补充一次连接就可以了。所以3次是最合适的。在Chinese中，以3为起称为多，如果你用4，5，6，7，8...次的话，这不更浪费吗？</p>
<h3 id="articleHeader2">3、服务器响应200</h3>
<p>TCP/IP 连接建立后，浏览器会通过该连接向远程服务器发送 HTTP 的 GET 请求。远程服务器找到资源并使用 HTTP 响应返回该资源，值为200的 HTTP 响应状态表示一个正确的响应。</p>
<h3 id="articleHeader3">4、生成Render Tree</h3>
<p>客户端开始下载资源。请求返回后，便进入了我们关注的前端模块。浏览器会解析 HTML 成树形的数据结构DOM，生成 <code>DOM Tree</code>，浏览器将CSS代码解析成树形的数据结构CSSOM，生成 <code>CSS Rule Tree</code>。<br>DOM 和 CSSOM 都是以 <code>Bytes → characters → tokens → nodes → object model</code> 这样的方式生成最终的数据。DOM树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。<br><span class="img-wrap"><img data-src="/img/bVsaO8" src="https://static.alili.tech/img/bVsaO8" alt="tree" title="tree" style="cursor: pointer; display: inline;"></span></p>
<p><code>DOM Tree</code>和<code>CSS Rule Tree</code>结合生成<code>Render Tree</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVsaPc" src="https://static.alili.tech/img/bVsaPc" alt="tree" title="tree" style="cursor: pointer; display: inline;"></span></p>
<p>display:none 的节点不会被加入Render Tree，而visibility: hidden 则会。<br>•    display : 隐藏对应的元素但不挤占该元素原来的空间。<br>•    visibility: 隐藏对应的元素并且挤占该元素原来的空间<br>所以，如果某个节点最开始是不显示的，设为display:none是更优的。</p>
<h3 id="articleHeader4">5、渲染页面</h3>
<h4>布局</h4>
<p>有了Render Tree，浏览器知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系。接着就开始布局，计算出每个节点在屏幕中的位置。</p>
<h4>渲染</h4>
<p>浏览器已经知道了哪些节点要显示、每个节点的CSS属性是什么、每个节点在屏幕中的位置是哪里。就进入了最后一步，按照算出来的规则，通过显卡，把内容画到屏幕上。</p>
<p>而 javascript 又可以根据 DOM API 操作DOM。比如JS修改了DOM或者CSS属性，也会重新触发布局和渲染的执行过程。</p>
<p>关于这个问题到这儿就可以结束了......图已放，情未了，那顺便把TCP四次挥手也写这，结合图去分析。</p>
<h3 id="articleHeader5">遗留：TCP四次挥手</h3>
<h4>第一次挥手：客户端想分手</h4>
<p>假设客户端想要关闭连接，客户端发送一个 FIN 标志位置为1的包<code>(FIN=1，seq=x)</code>，表示自己已经没有数据可以发送了，但是仍然可以接受数据。<br>发送完毕后，客户端进入 FIN_WAIT_1 状态。</p>
<h4>第二次挥手：服务端也想分手</h4>
<p>服务器端确认客户端的 FIN包，发送一个确认包<code>(ACK=1，ACKnum=x+1)</code>，表明自己接受到了客户端关闭连接的请求，但还没有准备好关闭连接。<br>发送完毕后，服务器端进入 CLOSE_WAIT 状态，客户端接收到这个确认包之后，进入FIN_WAIT_2 状态，等待服务器端关闭连接。</p>
<h4>第三次挥手：服务端准备好分手</h4>
<p>服务器端准备好关闭连接时，向客户端发送结束连接请求，FIN置为1<code>(FIN=1，seq=y)</code>。<br>发送完毕后，服务器端进入 LAST_ACK 状态，等待来自客户端的最后一个ACK。</p>
<h4>第四次挥手：分手</h4>
<p>客户端接收到来自服务器端的关闭请求，发送一个确认包<code>(ACK=1，ACKnum=y+1)</code>，并进入 TIME_WAIT状态，等待可能出现的要求重传的 ACK包。<br>服务器端接收到这个确认包之后，关闭连接，进入 CLOSED 状态。<br>客户端等待2MSL（2MSL，2 Maximum Segment Lifetime）之后，没有收到回复，确保服务器端确实是关闭了，客户端也关闭连接，进入 CLOSED状态。</p>
<p>学知识不会是为了面试，因为面试会一层层的深入，不知道的就是不知道，不能逞强，最后坑了自己。多研究研究，才是真理。<code>come on , basketball.</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
探网络系列（1）-TCP三次握手&Render Tree页面渲染=>从输入URL到页面显示的过程？

## 原文链接
[https://segmentfault.com/a/1190000006921322](https://segmentfault.com/a/1190000006921322)

