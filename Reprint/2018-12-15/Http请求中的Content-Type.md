---
title: 'Http请求中的Content-Type' 
date: 2018-12-15 2:30:11
hidden: true
slug: vt7m705dqch
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 前言</h1>
<p>----现在搞前端的不学好http有关的知识已经不行啦～笔者也是后知后觉，在搞node的时候意识到网络方面的薄弱，开始学起http相关知识。这一篇是非常基础的讲解，适合入门人员掌握content-type的知识和有经验的人员查阅。可以说，弄懂了content-type，你才能在学习http的道路上走的更加顺畅，让我们满怀激情的开始吧～～</p>
<h1 id="articleHeader1">二 正文</h1>
<h2 id="articleHeader2">1.认识content-type</h2>
<p>要学习content-type,必须事先知道它到底是什么，是干什么用的。 </p>
<p>HTTP协议（RFC2616）采用了请求/响应模型。客户端向服务器发送一个请求，请求头包含请求的方法、URI、协议版本、以及包含请求修饰符、客户信息和内容的类似于MIME的消息结构。服务器以一个状态行作为响应，相应的内容包括消息协议的版本，成功或者错误编码加上包含服务器信息、实体元信息以 及可能的实体内容。 </p>
<p>通常HTTP消息由一个起始行，一个或者多个头域，一个只是头域结束的空行和可选的消息体组成。<br>HTTP的头域包括通用头，请求头，响应头和实体头四个部分。每个头域由一个域名，冒号（:）和域值三部分组成。域名是大小写无关的，域值前可以添加任何数量的空格符，头域可以被扩展为多行，在每行开始处，使用至少一个空格或制表符。 </p>
<p>请求消息和响应消息都可以包含实体信息，实体信息一般由实体头域和实体组成。实体头域包含关于实体的原信息，实体头包括Allow、Content- Base、Content-Encoding、Content-Language、 Content-Length、Content-Location、Content-MD5、Content-Range、Content-Type、 Etag、Expires、Last-Modified、extension-header。</p>
<p>Content-Type是返回消息中非常重要的内容，表示后面的文档属于什么MIME类型。Content-Type: [type]/[subtype]; parameter。例如最常见的就是text/html，它的意思是说返回的内容是文本类型，这个文本又是HTML格式的。原则上浏览器会根据Content-Type来决定如何显示返回的消息体内容。</p>
<h2 id="articleHeader3">2.Content-type与Accept</h2>
<p>（1）Accept属于请求头， Content-Type属于实体头。 <br>Http报头分为通用报头，请求报头，响应报头和实体报头。 <br>请求方的http报头结构：通用报头|请求报头|实体报头 <br>响应方的http报头结构：通用报头|响应报头|实体报头</p>
<p>（2）Accept代表发送端（客户端）希望接受的数据类型。 <br>比如：Accept：text/xml; <br>代表客户端希望接受的数据类型是xml类型</p>
<p>Content-Type代表发送端（客户端|服务器）发送的实体数据的数据类型。 <br>比如：Content-Type：text/html; <br>代表发送端发送的数据格式是html。</p>
<p>二者合起来， <br>Accept:text/xml； <br>Content-Type:text/html <br>即代表希望接受的数据类型是xml格式，本次请求发送的数据的数据格式是html。</p>
<h2 id="articleHeader4">3.content-type速查</h2>
<p>更全面的请访问：<a href="http://www.runoob.com/http/http-content-type.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/http/ht...</a></p>
<p>常见的媒体格式类型如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="text/html ： HTML格式
text/plain ：纯文本格式      
text/xml ：  XML格式
image/gif ：gif图片格式    
image/jpeg ：jpg图片格式 
image/png：png图片格式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-built_in">text</span>/html ： HTML格式
<span class="hljs-built_in">text</span>/plain ：纯文本格式      
<span class="hljs-built_in">text</span>/xml ：  <span class="hljs-keyword">XML</span>格式
<span class="hljs-built_in">image</span>/gif ：gif图片格式    
<span class="hljs-built_in">image</span>/jpeg ：jpg图片格式 
<span class="hljs-built_in">image</span>/png：png图片格式
</code></pre>
<p>以application开头的媒体格式类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" application/xhtml+xml ：XHTML格式
 application/xml     ： XML数据格式
 application/atom+xml  ：Atom XML聚合格式    
 application/json    ： JSON数据格式
 application/pdf       ：pdf格式  
 application/msword  ： Word文档格式
 application/octet-stream ： 二进制流数据（如常见的文件下载）
 application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code> application/xhtml+<span class="hljs-keyword">xml</span> <span class="hljs-title">：XHTML</span>格式
 application/<span class="hljs-keyword">xml</span>     <span class="hljs-title">： XML</span>数据格式
 application/atom+<span class="hljs-keyword">xml</span>  <span class="hljs-title">：Atom</span> XML聚合格式    
 application/json    ： JSON数据格式
 application/pdf       ：pdf格式  
 application/msword  ： Word文档格式
 application/octet-stream ： 二进制流数据（如常见的文件下载）
 application/x-www-form-urlencoded ： <span class="hljs-tag">&lt;form encType=””&gt;</span>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
</code></pre>
<p>另外一种常见的媒体格式是上传文件之时使用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>multipart/<span class="hljs-keyword">form</span>-<span class="hljs-keyword">data</span> ： 需要在表单中进行文件上传时，就需要使用该格式

</code></pre>
<h2 id="articleHeader5">4.常见的content-type讲解</h2>
<p><strong>（1）application/x-www-form-urlencoded</strong></p>
<p>这应该是最常见的 POST 提交数据的方式了。浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求类似于下面这样（无关的请求头在本文中都省略掉了）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8
title=test&amp;sub%5B%5D=1&amp;sub%5B%5D=2&amp;sub%5B%5D=3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>POST http://www.example.com HTTP/<span class="hljs-number">1.1</span>
Content-Type: application/<span class="hljs-keyword">x</span>-www-form-urlencoded<span class="hljs-comment">;charset=utf-8
</span>title=test&amp;<span class="hljs-keyword">sub</span><span class="hljs-symbol">%5</span>B<span class="hljs-symbol">%5</span>D=<span class="hljs-number">1</span>&amp;<span class="hljs-keyword">sub</span><span class="hljs-symbol">%5</span>B<span class="hljs-symbol">%5</span>D=<span class="hljs-number">2</span>&amp;<span class="hljs-keyword">sub</span><span class="hljs-symbol">%5</span>B<span class="hljs-symbol">%5</span>D=<span class="hljs-number">3</span>
</code></pre>
<p>首先，Content-Type 被指定为 application/x-www-form-urlencoded；<br>其次，<strong>提交的数据按照 key1=val1&amp;key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。</strong>大部分服务端语言都对这种方式有很好的支持。例如 PHP 中，$_POST[‘title’] 可以获取到 title 的值，$_POST[‘sub’] 可以得到 sub 数组。</p>
<p>很多时候，我们用 Ajax 提交数据时，也是使用这种方式。例如 JQuery 和 QWrap 的 Ajax，Content-Type 默认值都是「application/x-www-form-urlencoded;charset=utf-8」。</p>
<p><strong>（2）multipart/form-data</strong></p>
<p>这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctyped 等于这个值。</p>
<p>客户端form标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;url&quot; enctype=&quot;multipart/form-data&quot; method=&quot;post&quot;></form>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"url"</span> <span class="hljs-attr">enctype</span>=<span class="hljs-string">"multipart/form-data"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p>直接来看一个生成的请求示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name=&quot;text&quot;
title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;chrome.png&quot;
Content-Type: image/png
PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-type">POST</span> http://www.example.com <span class="hljs-type">HTTP</span>/<span class="hljs-number">1.1</span>
<span class="hljs-type">Content</span>-<span class="hljs-type">Type</span>:multipart/form-<span class="hljs-class"><span class="hljs-keyword">data</span>; boundary=<span class="hljs-comment">----WebKitFormBoundaryrGKCBY7qhFd3TrwA</span></span>
<span class="hljs-comment">------WebKitFormBoundaryrGKCBY7qhFd3TrwA</span>
<span class="hljs-type">Content</span>-<span class="hljs-type">Disposition</span>: form-<span class="hljs-class"><span class="hljs-keyword">data</span>; name="text"</span>
<span class="hljs-title">title</span>
<span class="hljs-comment">------WebKitFormBoundaryrGKCBY7qhFd3TrwA</span>
<span class="hljs-type">Content</span>-<span class="hljs-type">Disposition</span>: form-<span class="hljs-class"><span class="hljs-keyword">data</span>; name="file"; filename="chrome.png"</span>
<span class="hljs-type">Content</span>-<span class="hljs-type">Type</span>: image/png
<span class="hljs-type">PNG</span> ... content <span class="hljs-keyword">of</span> chrome.png ...
<span class="hljs-comment">------WebKitFormBoundaryrGKCBY7qhFd3TrwA--</span>

</code></pre>
<p>首先<strong>生成了一个 boundary 用于分割不同的字段</strong>，为了避免与正文内容重复，boundary 很长很复杂。<br>然后 Content-Type 里指明了数据是以 mutipart/form-data 来编码，本次请求的 boundary 是什么内容。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 –boundary 开始，紧接着内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 –boundary– 标示结束。关于 mutipart/form-data 的详细定义，请前往 rfc1867 查看。</p>
<p>这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。</p>
<p>上面提到的这两种 POST 数据的方式，都是浏览器原生支持的，而且现阶段原生 form 表单也只支持这两种方式。但是随着越来越多的 Web 站点，尤其是 WebApp，全部使用 Ajax 进行数据交互之后，我们完全可以定义新的数据提交方式，给开发带来更多便利。</p>
<p><strong>（3）application/json</strong></p>
<p>application/json 这个 Content-Type 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。</p>
<p>JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。记得我几年前做一个项目时，需要提交的数据层次非常深，我就是把数据 JSON 序列化之后来提交的。不过当时我是把 JSON 字符串作为 val，仍然放在键值对里，以 x-www-form-urlencoded 方式提交。</p>
<p>Google 的 AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串。例如下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {'title':'test', 'sub' : [1,2,3]};
$http.post(url, data).success(function(result) {
    ...
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> data = {<span class="hljs-string">'title'</span>:<span class="hljs-string">'test'</span>, <span class="hljs-string">'sub'</span> : [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]};
$http.post(url, data).success(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result)</span> </span>{
    ...
});
</code></pre>
<p>最终发送的请求是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8
{&quot;title&quot;:&quot;test&quot;,&quot;sub&quot;:[1,2,3]}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>POST <span class="hljs-string">http:</span><span class="hljs-comment">//www.example.com HTTP/1.1</span>
Content-<span class="hljs-string">Type:</span> application/json;charset=utf<span class="hljs-number">-8</span>
{<span class="hljs-string">"title"</span>:<span class="hljs-string">"test"</span>,<span class="hljs-string">"sub"</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]}
</code></pre>
<p>这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。但也有些服务端语言还没有支持这种方式，例如 php 就无法通过 $_POST 对象从上面的请求中获得内容。这时候，需要自己动手处理下：在请求头中 Content-Type 为 application/json 时，从 php://input 里获得原始输入流，再 json_decode 成对象。一些 php 框架已经开始这么做了。</p>
<p><strong>（4）text/xml</strong></p>
<p>它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。典型的 XML-RPC 请求是这样的：</p>
<p>POST <a href="http://www.example.com" rel="nofollow noreferrer" target="_blank">http://www.example.com</a> HTTP/1.1<br>Content-Type: text/xml<br>&lt;?xml version="1.0"?&gt;<br>&lt;methodCall&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<methodName>examples.getStateName</methodName>
<params>
    <param>
        <value><i4>41</i4></value>
    </param>
</params>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">methodName</span>&gt;</span>examples.getStateName<span class="hljs-tag">&lt;/<span class="hljs-name">methodName</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">params</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">param</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">value</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i4</span>&gt;</span>41<span class="hljs-tag">&lt;/<span class="hljs-name">i4</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">param</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">params</span>&gt;</span></code></pre>
<p>&lt;/methodCall&gt;<br>XML-RPC 协议简单、功能够用，各种语言的实现都有。它的使用也很广泛，如 WordPress 的 XML-RPC Api，搜索引擎的 ping 服务等等。JavaScript 中，也有现成的库支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。不过，我个人觉得 XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。</p>
<h1 id="articleHeader6">三 后记</h1>
<p>RFC2616：<a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html" rel="nofollow noreferrer" target="_blank">https://www.w3.org/Protocols/...</a><br>内容参考：<br>（1）<a href="http://blog.csdn.net/blueheart20/article/details/45174399" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/bluehear...</a><br>（2）<a href="https://www.topjishu.com/6324.html" rel="nofollow noreferrer" target="_blank">https://www.topjishu.com/6324...</a><br>（3）<a href="http://blog.csdn.net/muzizongheng/article/details/46795243" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/muzizong...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Http请求中的Content-Type

## 原文链接
[https://segmentfault.com/a/1190000013056786](https://segmentfault.com/a/1190000013056786)

