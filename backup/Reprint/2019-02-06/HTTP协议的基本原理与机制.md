---
title: 'HTTP协议的基本原理与机制' 
date: 2019-02-06 2:30:08
hidden: true
slug: 7fkqbme5y3
categories: [reprint]
---

{{< raw >}}

                    
<p>HTTP协议，对于web相关开发者来说极为重要。本文将带您分析HTTP协议的<strong>基本原理与机制</strong></p>
<h2 id="articleHeader0"><strong>HTTP协议的用途</strong></h2>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/ClientServer.jpg" src="https://static.alili.techhttps://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/ClientServer.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>HTTP协议用于<strong>客户端与服务器</strong>之间的通信，在通信线路两端，必定一端是客户端，另一端是服务器。<br><strong>注意</strong>：客户端与服务器的角色不是固定的，<strong>一端充当客户端，也可能在某次请求中充当服务器</strong>。这取决与请求的发起端。HTTP协议属于应用层，建立在传输层协议TCP之上。客户端通过与服务器<strong>建立TCP连接</strong>，之后<strong>发送HTTP请求</strong>与<strong>接收HTTP响应</strong>都是通过访问Socket接口来调用TCP协议实现。</p>
<h2 id="articleHeader1"><strong>请求与响应</strong></h2>
<p>HTTP协议规定，由客户端发起请求，服务器响应请求并返回信息。<span class="img-wrap"><img data-src="https://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/RequestResponse.jpg" src="https://static.alili.techhttps://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/RequestResponse.jpg" alt="image" title="image" style="cursor: pointer;"></span><br>如图，反映了一次HTTP请求并接收一个HTML文件的过程与时间消耗(<strong>RTT</strong>)。客户端通过<strong>TCP连接</strong>发送<strong>请求报文</strong>，服务器收到请求后向其传输文件并返回<strong>响应报文</strong>。</p>
<p><strong>请求报文</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
        GET /index.html HTTP/1.1

        Host: www.cnblogs.com/ACFLOOD 

        Content-Length: 16
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    
        GET /index<span class="hljs-selector-class">.html</span> HTTP/<span class="hljs-number">1.1</span>

        Host: www<span class="hljs-selector-class">.cnblogs</span><span class="hljs-selector-class">.com</span>/ACFLOOD 

        Content-Length: <span class="hljs-number">16</span>
</code></pre>
<p>请求报文是由<strong>请求方法</strong>，<strong>请求URI</strong>，<strong>协议版本</strong>，<strong>可选的首部字段</strong>以及<strong>内容实体</strong>构成。</p>
<p>本例中，GET表示<strong>请求方法</strong>，/index.jsp是<strong>请求URI</strong>，HTTP/1.1是<strong>协议版本</strong>，其余的是<strong>首部字段</strong>。</p>
<p><strong>响应报文</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        HTTP/1.1 200 OK 
        
        Date: Mon, 10 May 2016 07:50:15 GMT
    
        Content-Length: 300
    
        Content-Type: text/html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>
        HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK 
        
        <span class="hljs-built_in">Date</span>: Mon, <span class="hljs-number">10</span> May <span class="hljs-number">2016</span> <span class="hljs-number">07</span>:<span class="hljs-number">50</span>:<span class="hljs-number">15</span> GMT
    
        Content-Length: <span class="hljs-number">300</span>
    
        Content-<span class="hljs-built_in">Type</span>: <span class="hljs-built_in">text</span>/html
</code></pre>
<p>响应报文基本上由<strong>协议版本</strong>，<strong>状态码</strong>(返回请求成功或失败情况)，对<strong>状态码的解释短语</strong>，<strong>可选的首部字段</strong>以及<strong>内容实体</strong>构成。</p>
<p>本例中，HTTP/1.1表示<strong>协议版本</strong>，200表示<strong>状态码</strong>，OK是<strong>对状态码的描述</strong>，Date是<strong>响应日期</strong>，与Content-Length和Content-Type一样，都属于<strong>首部字段</strong>。</p>
<h2 id="articleHeader2"><strong>HTTP是无状态协议</strong></h2>
<p>HTTP是一种<strong>无状态(stateless)</strong> 协议，HTTP协议本身<strong>不会</strong>对发送过的请求和相应的通信状态进行<strong>持久化处理</strong>。这样做的目的是为了保持HTTP协议的简单性，从而能够<strong>快速处理</strong>大量的事务，提高效率。</p>
<p>然而，在许多应用场景中，我们需要保持用户登录的状态或记录用户购物车中的商品。由于HTTP是无状态协议，所以必须引入一些技术来<strong>记录管理状态</strong>，例如<strong>Cookie</strong>。</p>
<h2 id="articleHeader3"><strong>HTTP方法</strong></h2>
<p>下图展示了基本的HTTP方法。<br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/HttpMethod.jpg" src="https://static.alili.techhttps://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/HttpMethod.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>GET</strong>：获取资源。通过URI请求访问已被识别的资源，经过服务器解析后返回相应内容。</p></li>
<li><p><strong>POST</strong>：传输实体。例如登录注册时表单的提交。</p></li>
<li><p><strong>PUT</strong>：传输文件。类似于FTP协议中的文件上传，PUT方法要求在请求报文的主体包含文件，保存到指定URI的位置。由于PUT方法没有验证机制，存在安全性问题，所以必须配合采用安全标准(如<strong>REST</strong>)。</p></li>
<li><p><strong>HEAD</strong>：获得报文首部。不返回报文主体，仅返回首部。</p></li>
<li><p><strong>DELETE</strong>：删除文件。DELELTE方法请求删除服务器上的资源，同样存在安全性问题。所以必须有验证机制与之配合。</p></li>
<li>
<p><strong>OPTIONS</strong>：询问服务器支持哪些方法。示例:</p>
<p><strong>请求报文</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    OPTIONS * HTTP/1.1
    
    Host: www.cnblogs.com
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>
    OPTIONS * HTTP/<span class="hljs-number">1.1</span>
    
    Hos<span class="hljs-variable">t:</span> www.cnblogs.<span class="hljs-keyword">com</span>
</code></pre>
<p><strong>响应报文</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    HTTP/1.1 200 OK
    
    Allow: GET, POST, HEAD, OPTIONS
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code>
    <span class="hljs-attribute">HTTP</span>/1.1 200 OK
    
    <span class="hljs-attribute"><span class="hljs-nomarkup">Allow</span></span>: GET, POST, HEAD, OPTIONS
</code></pre>
<p>本例中，客户端通过OPTIONS *询问服务器支持的方法。响应报文最后返回了支持的 方法类型。</p>
<ul>
<li><p><strong>TRACE</strong>：追踪路径。发送请求时，通过在<strong>Max-Forwards</strong>首部字段中填入数值，每经过一个服务器数值减一，当减为零之后停止传输，最后收到请求的服务器发出响应。</p></li>
<li><p><strong>CONNECT</strong>：通过与代理服务器建立隧道，使用隧道协议加密之后，与服务器进行TCP通信。常用的隧道协议有<strong>SSL(Secure Socket Layer)</strong>以及<strong>TLS(Transport Layer Security)</strong>。</p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader4"><strong>非持久连接 和 持久连接</strong></h2>
<p>在实际的应用中，客户端往往会发出一系列请求，接着服务器端对每个请求进行响应。对于这些请求|响应，如果每次都经过一个单独的TCP连接发送，称为<strong>非持久连接</strong>。反之，如果每次都经过相同的TCP连接进行发送，称为<strong>持久连接</strong>。</p>
<p>非持久连接在每次请求|响应之后都要断开连接，下次再建立新的TCP连接，这样就造成了大量的<strong>通信开销</strong>。例如前面提到的<strong>往返时间(RTT)</strong> 就是在建立TCP连接的过程中的代价。</p>
<p>非持久连接给服务器带来了沉重的负担，每台服务器可能同时面对<strong>数以百计</strong>甚至更多的请求。持久连接就是为了解决这些问题，其特点是<strong>一直保持TCP连接状态</strong>，直到遇到<strong>明确的中断要求</strong>之后再中断连接。持久连接减少了通信开销，节省了通信量。  <br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/persisitConnection.jpg" src="https://static.alili.techhttps://raw.githubusercontent.com/ACFLOOD/MarkdownPictures/master/persisitConnection.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span>图 持久化连接节省通信开销</p>
<h2 id="articleHeader5"><strong>总结</strong></h2>
<p>本文分析了基本的HTTP运行机制与原理，通过一些实例分析了HTTP请求与响应的过程，以及<strong>常见的HTTP方法</strong>。对于HTTP连接的特性与机制也进行了探讨。当然这些只是简单的建立起基础的概念。后续的系列我还会对<strong>Cookie与session</strong>的原理，请求发起的过程以及<strong>Socket(套接字)</strong>的研究，HTTP解析的过程进行深入思考和剖析。</p>
<hr>
<p><strong>作者</strong>: <a href="https://segmentfault.com/u/project_li">Project_Li </a></p>
<p><strong>专栏</strong>：<a href="https://segmentfault.com/blog/acflood" target="_blank">编程梦工厂</a></p>
<p><strong>参考资料</strong>:《图解HTTP协议》 《计算机网络：自顶向下方法》 etc</p>
<p><strong>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</strong></p>
<p><strong>如果您觉得本文对您有所帮助，就给俺点个赞吧！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTTP协议的基本原理与机制

## 原文链接
[https://segmentfault.com/a/1190000006191160](https://segmentfault.com/a/1190000006191160)

