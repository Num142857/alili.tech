---
title: 'AJAX原理与CORS跨域' 
date: 2018-12-29 2:30:10
hidden: true
slug: rmfl78ohmm
categories: [reprint]
---

{{< raw >}}

                    
<p>ajax作为前端开发必需的基础能力之一，你可能会使用它，但并不一定懂得其原理，以及更深入的服务器通信相关的知识。在最近两天的整理过程中，看了大量的文章，发现自己的后端能力已经限制自己在网络通信相关的知识领域的探索，还是应该尽快补齐短板。</p>
<p>下面我们来聊一聊<code>ajax</code>相关的东西，包括<code>xhr/xdr/ajax/cors/http</code>的一部分内容，其中会抛弃一些被弃用的历史包袱，如IE6/7等。</p>
<h2 id="articleHeader0">Ajax的出现</h2>
<p>2005年，<code>Jesse James Garrett</code>提出了Ajax的技术，其全称为<code>Asynchronous Javascript and XML</code>，Ajax的核心是<code>XMLHttpRequest</code>对象，简称<code>XHR</code>，它用于使浏览器向服务器请求额外的数据而不卸载页面，极大的提高了用户体验。在此之前，其实这种技术已经存在并被一些人实现，但并没有流行也没有被浏览器支持。不过在此之后，IE5第一次引入<code>XHR</code>对象，并支持<code>ajax</code>技术，后续被所有浏览器支持。</p>
<h2 id="articleHeader1">
<code>XMLHttpRequest</code>对象和请求</h2>
<p><code>XHR</code>是一个API，为客户端提供服务端和客户端之间通信的功能，并且不会刷新页面。它并不仅仅能取回XML类型的数据，而能取回所有类型的数据，除了http协议，还支持file和ftp协议。我们可以通过其构造函数来创建一个新的<code>XHR</code>对象，这个操作需要在其它所有操作之前完成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();</code></pre>
<p>通过控制台我们可以很方便看到<code>XHR</code>的原型链：<code>Object -&gt; EventTarget -&gt; XMLHttpRequestEventTarget -&gt; XMLHttpRequest</code>。它拥有原型链上和本身的方法和属性，现在看下我们常用的方法：<br><span class="img-wrap"><img data-src="/img/bVWx8o?w=815&amp;h=608" src="https://static.alili.tech/img/bVWx8o?w=815&amp;h=608" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们解释下它的几个主要方法，我们在创建了新的xhr对象之后，首先要调用它的<code>open()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一个参数可以为get/post等，表示该请求的类型
// 第二个参数是请求的url，可以为相对路径或绝对路径
// 第三个参数代表是否异步，为true时异步，为false时同步
// 第四五个参数为可选的授权使用的参数，因为安全性不推荐明文使用
xhr.open('get', 'example.php', true, username, password);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 第一个参数可以为get/post等，表示该请求的类型</span>
<span class="hljs-comment">// 第二个参数是请求的url，可以为相对路径或绝对路径</span>
<span class="hljs-comment">// 第三个参数代表是否异步，为true时异步，为false时同步</span>
<span class="hljs-comment">// 第四五个参数为可选的授权使用的参数，因为安全性不推荐明文使用</span>
xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">'get'</span>, <span class="hljs-string">'example.php'</span>, <span class="hljs-literal">true</span>, username, password);</code></pre>
<p>在这里受同源策略的影响，当第二个参数url跨域的时候会被浏览器报安全错误。同源策略指的是当前页面和目标url协议、域名和端口均相同。后面也会讲到，除IE之外的浏览器通过XHR对象实现跨域请求，只需将url设置为绝对url即可。</p>
<p>当初始化请求完成后，我们调用<code>send()</code>方法发送请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new FormData();
data.append('name', 'Nicholas');
// 接受一个请求主体发送的数据，如果不需要，传入null
xhr.send(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = new <span class="hljs-type">FormData</span>();</span>
<span class="hljs-class"><span class="hljs-keyword">data</span>.append('<span class="hljs-title">name'</span>, '<span class="hljs-type">Nicholas</span>');</span>
// 接受一个请求主体发送的数据，如果不需要，传入null
<span class="hljs-title">xhr</span>.send(<span class="hljs-class"><span class="hljs-keyword">data</span>);</span></code></pre>
<p>当请求的类型为<code>get/head</code>时，send()的参数会被忽略并置为null，send()传递的参数会影响到我们请求的头部<code>content-type</code>的默认值，该字段代表返回的资源内容的类型，用于浏览器处理，如果没有设置或在一些场景下，浏览器会进行MIME嗅探来确定怎么处理返回的资源。</p>
<p>在<code>XHR2级</code>中定义了<code>FormData</code>数据，用于常见的类表单数据序列化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 直接传入表单id
var data = new FormData(document.getElementById('user-form'));

// 创建类表单数据
var data = new FormData();
data.append('name', 'Nicholas');

// `FormData`可以直接被send()调用，会自动修改xhr的content-type头部
xhr.send(data);

// 请求头部的content-type: multipart/form-data; boundary=----WebKitFormBoundaryjn3q2KKRYrEH55Vz

// 请求的上传数据 Request Payload:
------WebKitFormBoundaryjn3q2KKRYrEH55Vz
Content-Disposition: form-data; name=&quot;name&quot;

Nicholas
------WebKitFormBoundaryjn3q2KKRYrEH55Vz--" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>// 直接传入表单id
<span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = new <span class="hljs-type">FormData</span>(<span class="hljs-title">document</span>.<span class="hljs-title">getElementById</span>('<span class="hljs-title">user</span>-<span class="hljs-title">form'</span>));</span>

// 创建类表单数据
<span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = new <span class="hljs-type">FormData</span>();</span>
<span class="hljs-class"><span class="hljs-keyword">data</span>.append('<span class="hljs-title">name'</span>, '<span class="hljs-type">Nicholas</span>');</span>

// `<span class="hljs-type">FormData</span>`可以直接被send()调用，会自动修改xhr的content-<span class="hljs-class"><span class="hljs-keyword">type</span>头部</span>
<span class="hljs-title">xhr</span>.send(<span class="hljs-class"><span class="hljs-keyword">data</span>);</span>

// 请求头部的content-<span class="hljs-class"><span class="hljs-keyword">type</span>: multipart/form-<span class="hljs-keyword">data</span>; boundary=<span class="hljs-comment">----WebKitFormBoundaryjn3q2KKRYrEH55Vz</span></span>

// 请求的上传数据 <span class="hljs-type">Request</span> <span class="hljs-type">Payload</span>:
<span class="hljs-comment">------WebKitFormBoundaryjn3q2KKRYrEH55Vz</span>
<span class="hljs-type">Content</span>-<span class="hljs-type">Disposition</span>: form-<span class="hljs-class"><span class="hljs-keyword">data</span>; name="name"</span>

<span class="hljs-type">Nicholas</span>
<span class="hljs-comment">------WebKitFormBoundaryjn3q2KKRYrEH55Vz--</span></code></pre>
<p><code>FormData</code>常用的方法有<code>append/delete/entries/forEach/get/getAll/has/keys/set/values</code>，都是常用的跟数组类似的方法，不再解释。</p>
<h3 id="articleHeader2">请求方法</h3>
<p><code>GET</code>是最常见的请求类型，可以将查询字符串参数添加到URL尾部，对XHR而言，该查询字符串必须经过正确编码，每个键值对必须使用<code>encodeURIComponent()</code>进行编码，键值对之间由<code>&amp;</code>分割：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装序列化键值对
function addURLParam(url, name, value) {
    url += (url.indexOf('?') === -1 ? '?' : '&amp;';
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 封装序列化键值对</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addURLParam</span>(<span class="hljs-params">url, name, value</span>) </span>{
    <span class="hljs-built_in">url</span> += (<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">'?'</span>) === <span class="hljs-number">-1</span> ? <span class="hljs-string">'?'</span> : <span class="hljs-string">'&amp;'</span>;
    <span class="hljs-built_in">url</span> += <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(value);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">url</span>;
}</code></pre>
<p><code>POST</code>请求使用频率仅次于<code>GET</code>请求，通常发送较多数据，且格式不限，数据传递给<code>send()</code>作为参数。</p>
<p>HTTP一共规定了九种请求方法，每一个动词代表不同的语义，但是常用的只有上面两种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" - OPTIONS：返回服务器针对特定资源所支持的HTTP请求方法。也可以利用向Web服务器发送'*'的请求来测试服务器的功能性。 
 - HEAD：向服务器索要与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。 
 - GET：向特定的资源发出请求。 
 - POST：向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的创建和/或已有资源的修改。 
 - PUT：向指定资源位置上传其最新内容。 
 - DELETE：请求服务器删除Request-URI所标识的资源。 
 - TRACE：回显服务器收到的请求，主要用于测试或诊断。 
 - CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
 - PATCH: 用于对资源进行部分修改" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code> -<span class="ruby"> OPTIONS：返回服务器针对特定资源所支持的HTTP请求方法。也可以利用向Web服务器发送<span class="hljs-string">'*'</span>的请求来测试服务器的功能性。 
</span> -<span class="ruby"> HEAD：向服务器索要与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。 
</span> -<span class="ruby"> GET：向特定的资源发出请求。 
</span> -<span class="ruby"> POST：向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的创建和/或已有资源的修改。 
</span> -<span class="ruby"> PUT：向指定资源位置上传其最新内容。 
</span> -<span class="ruby"> DELETE：请求服务器删除Request-URI所标识的资源。 
</span> -<span class="ruby"> TRACE：回显服务器收到的请求，主要用于测试或诊断。 
</span> -<span class="ruby"> CONNECT：HTTP/<span class="hljs-number">1.1</span>协议中预留给能够将连接改为管道方式的代理服务器。
</span> -<span class="ruby"> <span class="hljs-symbol">PATCH:</span> 用于对资源进行部分修改</span></code></pre>
<h3 id="articleHeader3">HTTP头部信息</h3>
<p>每个HTTP请求和响应都带有头部信息，xhr对象允许我们操作部分头部信息。我们可以通过<code>xhr.setRequestHeader()</code>方法来设置自定义的头部信息或者修改浏览器默认的正常头部信息。常用的请求头部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下面的实例是从我本地的一次请求取出的

Accept: 浏览器能够处理的内容类型。// */*
Accept-Charset: 浏览器能够显示的字符集。// 未取到
Accept-Encoding: 浏览器能够处理的压缩编码。// gzip,deflate
Accept-Language: 浏览器当前设置的语言。// zh-CN,zh;q=0.8,en;q=0.6
Connection: 浏览器与服务器之间连接的类型。// keep-alive
Cookie: 当前页面设置的任意Cookie。// JlogDataSource=jomodb
Host: 发出请求的页面所在域。// gzhxy-cdn-oss-06.gzhxy.baidu.com:8090
Referer: 发出请求的页面URI。// http://gzhxy-cdn-oss-06.gzhxy.baidu.com:8090/jomocha/index.php?r=tools/offline/index
User-Agent: 浏览器的用户代理字符串。// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 下面的实例是从我本地的一次请求取出的</span>

<span class="hljs-attribute">Accept</span>: 浏览器能够处理的内容类型。<span class="hljs-comment">// */*</span>
<span class="hljs-attribute">Accept-Charset</span>: 浏览器能够显示的字符集。<span class="hljs-comment">// 未取到</span>
<span class="hljs-attribute">Accept-Encoding</span>: 浏览器能够处理的压缩编码。<span class="hljs-comment">// gzip,deflate</span>
<span class="hljs-attribute">Accept-Language</span>: 浏览器当前设置的语言。<span class="hljs-comment">// zh-CN,zh;q=0.8,en;q=0.6</span>
<span class="hljs-attribute">Connection</span>: 浏览器与服务器之间连接的类型。<span class="hljs-comment">// keep-alive</span>
<span class="hljs-attribute">Cookie</span>: 当前页面设置的任意Cookie。<span class="hljs-comment">// JlogDataSource=jomodb</span>
<span class="hljs-attribute">Host</span>: 发出请求的页面所在域。<span class="hljs-comment">// gzhxy-cdn-oss-06.gzhxy.baidu.com:8090</span>
<span class="hljs-attribute">Referer</span>: 发出请求的页面URI。<span class="hljs-comment">// http://gzhxy-cdn-oss-06.gzhxy.baidu.com:8090/jomocha/index.php?r=tools/offline/index</span>
<span class="hljs-attribute">User-Agent</span>: 浏览器的用户代理字符串。<span class="hljs-comment">// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36</span></code></pre>
<p>我们一般不修改浏览器正常的头部信息，可能会影响到服务器响应。如果需要可以通过<code>xhr.setRequestHeader()</code>进行修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 传入头部键值对，键值不区分大小写，如果多次设置，则追加
// 此时请求头部的content-type: application/json, text/html
xhr.setRequestHeader('content-type', 'application/json');
xhr.setRequestHeader('content-type', 'application/json');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 传入头部键值对，键值不区分大小写，如果多次设置，则追加</span>
<span class="hljs-comment">// 此时请求头部的content-type: application/json, text/html</span>
<span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">'content-type'</span>, <span class="hljs-string">'application/json'</span>);
<span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">'content-type'</span>, <span class="hljs-string">'application/json'</span>);</code></pre>
<p>设置头部信息需要在<code>open()</code>之后，<code>send()</code>之前进行调用。响应的头部信息在后端处理，不在此处讲解。有一部分请求头部信息<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%A6%81%E6%AD%A2%E4%BF%AE%E6%94%B9%E7%9A%84%E6%B6%88%E6%81%AF%E9%A6%96%E9%83%A8" rel="nofollow noreferrer" target="_blank">不允许设置</a>，如<code>Accept-Encoding, Cookie</code>等。</p>
<p>在请求返回后，我们可以获取到响应头部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取指定项的响应头
xhr.getResponseHeader('content-type'); // application/json;charset=utf-8
// 获取所有的响应头部信息
xhr.getAllResponseHeaders();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 获取指定项的响应头</span>
<span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.getResponseHeader</span>(<span class="hljs-string">'content-type'</span>); <span class="hljs-comment">// application/json;charset=utf-8</span>
<span class="hljs-comment">// 获取所有的响应头部信息</span>
<span class="hljs-selector-tag">xhr</span><span class="hljs-selector-class">.getAllResponseHeaders</span>();</code></pre>
<p>这里简单说下<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank">content-type</a>值，指的是请求和响应的HTTP内容类型，影响到服务器和浏览器对数据的处理方式，默认为<code>text/html</code>，常用的如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 包含资源类型，字符编码， 边界字符串三个参数，可选填

text/html;charset=utf-8    // html标签文本
text/plain    // 纯文本
text/css    // css文件
text/javascript    // js文件
// 普通的表单数据，可以通过表单标签的enctype属性指定
application/x-www-form-urlencode
// 发送文件的POST包，包过大需要分片时使用`boundary`属性分割数据作边界
multipart/form-data; boundary=something
// json数据格式
application/json
// xml类型的标记语言
application/xml" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// 包含资源类型，字符编码， 边界字符串三个参数，可选填</span>

<span class="hljs-keyword">text</span>/html;charset=utf<span class="hljs-number">-8</span>    <span class="hljs-comment">// html标签文本</span>
<span class="hljs-keyword">text</span>/plain    <span class="hljs-comment">// 纯文本</span>
<span class="hljs-keyword">text</span>/css    <span class="hljs-comment">// css文件</span>
<span class="hljs-keyword">text</span>/javascript    <span class="hljs-comment">// js文件</span>
<span class="hljs-comment">// 普通的表单数据，可以通过表单标签的enctype属性指定</span>
application/x-www-form-urlencode
<span class="hljs-comment">// 发送文件的POST包，包过大需要分片时使用`boundary`属性分割数据作边界</span>
multipart/form-data; <span class="hljs-keyword">boundary</span>=something
<span class="hljs-comment">// json数据格式</span>
application/json
<span class="hljs-comment">// xml类型的标记语言</span>
application/xml</code></pre>
<h2 id="articleHeader4">
<code>XHR</code>对象的响应</h2>
<p>我们现在对请求的发起很了解了，接着看下如何拿到响应数据。如果我们给<code>open()</code>传递的第三个参数是<code>true</code>，则代表为同步请求，那么js会被阻塞直到拿到响应，而如果为<code>false</code>则是异步请求，我们只需要绑定<code>xhr.onreadystatechange()</code>事件监听响应即可。最上面的图已经说明了<code>readystate</code>的值含义，所以我们可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// xhr v1 的写法，检测readystate的值，为4则说明数据准备完毕，需要在open()前定义
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4） {
        if (xhr.status === 200 || xhr.status === 304) {
            console.log(xhr.responseText);
        } else {
            console.log(xhr.statusText);
        }
    }   
}

// xhr v2 的写法，onload()事件说明数据准备完毕
xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 304) {
        console.log(xhr.responseText);
    } else {
        console.log(xhr.statusText);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>// xhr v1 的写法，检测readystate的值，为<span class="hljs-number">4</span>则说明数据准备完毕，需要在open()前定义
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span></span> () {
    <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>） {
        <span class="hljs-keyword">if</span> (xhr.<span class="hljs-keyword">status</span> === <span class="hljs-number">200</span> || xhr.<span class="hljs-keyword">status</span> === <span class="hljs-number">304</span>) {
            console.<span class="hljs-built_in">log</span>(xhr.responseText);
        } <span class="hljs-keyword">else</span> {
            console.<span class="hljs-built_in">log</span>(xhr.statusText);
        }
    }   
}

// xhr v2 的写法，onload()事件说明数据准备完毕
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span></span> () {
    <span class="hljs-keyword">if</span> (xhr.<span class="hljs-keyword">status</span> === <span class="hljs-number">200</span> || xhr.<span class="hljs-keyword">status</span> === <span class="hljs-number">304</span>) {
        console.<span class="hljs-built_in">log</span>(xhr.responseText);
    } <span class="hljs-keyword">else</span> {
        console.<span class="hljs-built_in">log</span>(xhr.statusText);
    }
}</code></pre>
<p><code>xhr</code>对象的响应数据中包含几个属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response    // 响应的数据
responseURL    // 发起响应的URL
responseType    // 响应的类型，用于浏览器强行重置响应数据的类型
responseText    // 如果为普通文本，则在这显示
responseXML    // 如果为xml类型文本，在这里显示" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>response    <span class="hljs-comment">// 响应的数据</span>
responseURL    <span class="hljs-comment">// 发起响应的URL</span>
responseType    <span class="hljs-comment">// 响应的类型，用于浏览器强行重置响应数据的类型</span>
responseText    <span class="hljs-comment">// 如果为普通文本，则在这显示</span>
responseXML    <span class="hljs-comment">// 如果为xml类型文本，在这里显示</span></code></pre>
<p>数据会出现在<code>responseText/responseXML</code>中的哪一个，取决于服务器返回的<code>MIME</code>类型，当然我们也有一些方式在浏览器端设置如何处理这些数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// xhr v1 的写法，设置响应资源的处理类型
xhr.overrideMimeType('text/xml');

// xhr v2 的写法， 可用值为 arraybuffer/blob/document/json/text
xhr.responseType = 'document';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> xhr v1 的写法，设置响应资源的处理类型
xhr.overrideMimeType(<span class="hljs-string">'text/xml'</span>);

<span class="hljs-regexp">//</span> xhr v2 的写法， 可用值为 arraybuffer<span class="hljs-regexp">/blob/</span>document<span class="hljs-regexp">/json/</span>text
xhr.responseType = <span class="hljs-string">'document'</span>;</code></pre>
<p>响应数据相关的属性默认为<code>null / ''</code>，只有当请求完成并被正确解析的时候才会有值，取决于responseType的值，来确定<code>response/responseText/responseXML</code>谁最终具有值。</p>
<h2 id="articleHeader5">
<code>XHR</code>的高级功能</h2>
<p>在<code>xhr v2</code>里提供了超时和进度事件。</p>
<h3 id="articleHeader6">超时</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.timeout = 1000;    // 1分钟，单位为ms
xhr.ontimeout = function () {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>xhr.timeout = <span class="hljs-number">1000</span>;    <span class="hljs-comment">// 1分钟，单位为ms</span>
xhr.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};</code></pre>
<p>在请求<code>send()</code>之后开始计时，等待<code>timeout</code>时长后，如果没有收到响应，则触发<code>ontimeout()</code>事件，超时会将<code>readystate=4</code>，直接触发<code>onreadystatechange()</code>事件。</p>
<h3 id="articleHeader7">请求进度</h3>
<p>像上图所示，<code>xhr v2</code>定义了不同的进度事件：<code>loadstart/progress/error/abort/load/loadend</code>，这其中我们已经说过了<code>onload()</code>事件为内容加载完成可用。现在说一下<code>onprogress()</code>进度事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onprogress = function (event) {
    if (event.lengthComputable) {
        console.log(event.loaded / event.total);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>xhr.onprogress = function (<span class="hljs-keyword">event</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">event</span>.lengthComputable) {
        console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">event</span>.loaded / <span class="hljs-keyword">event</span>.total);
    }
}</code></pre>
<p>该事件会接收一个<code>event</code>对象，其<code>target</code>属性为该xhr对象，<code>lengthComputable</code>属性为<code>total size</code>是否已知，即是否可用进度信息，<code>loaded</code>属性为已经接收的字节数，<code>total</code>为总字节数。该事件会在数据接收期间不断触发，但间隔不确定。</p>
<h2 id="articleHeader8">跨域<code>CORS</code>
</h2>
<p>提到<code>XHR</code>对象，我们就会讲到跨域问题，它是为了预防某些恶意行为的安全策略，但有时候我们需要跨域来实现某些功能。需要注意的是跨域并不仅仅是前端单方面的事情，它需要后端代码进行配合，我们只是通过一些方式跳过了浏览器的阻拦。</p>
<p>对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">预检请求</a>（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。</p>
<p><code>CORS(Cross-Origin Resource Sharing, 跨域资源共享)</code>的思想是浏览器和服务端通过头部信息来进行沟通确认是否给予响应。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Origin: http://www.baidu.com    // 浏览器的头部信息

// 如果服务端认可这个域名的跨域请求，如下设置就可跨域访问资源
Access-Control-Allow-Origin: http://www.baidu.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//www.baidu.com    // 浏览器的头部信息</span>

<span class="hljs-comment">// 如果服务端认可这个域名的跨域请求，如下设置就可跨域访问资源</span>
Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//www.baidu.com</span></code></pre>
<p>如上就可以实现最简单的跨域访问，但是此时不能携带任何的<code>cookie</code>，如果我们需要传递<code>cookie</code>进行身份认证，需要设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.withCredentials = true;    // 浏览器端
Access-Control-Allow-Credentials: true;    // 服务端" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>xhr.withCredentials = <span class="hljs-literal">true</span>;    <span class="hljs-comment">// 浏览器端</span>
Access-Control-Allow-<span class="hljs-string">Credentials:</span> <span class="hljs-literal">true</span>;    <span class="hljs-comment">// 服务端</span></code></pre>
<p>这样我们就可以传递认证信息了，但如果允许认证，<code>Access-Control-Allow-Origin</code>不能设置为<code>*</code>，而一定是具体的域名信息。</p>
<p>现在的浏览器都对CORS有了实现，如IE使用<code>XDomainRequest</code>对象，其它浏览器使用<code>XMLHttpRequest</code>对象。所以在此之前有很多奇技淫巧，如通过<code>jsonp/图像 Ping</code>方法都不再详述，而且其都需要服务端配合并且有很多局限性。</p>
<h3 id="articleHeader9">IE实现： <code>XDomainRequest</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xdr = new XDomainRequest();
xdr.open('get', 'http://www.site.com/page');
xdr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xdr = <span class="hljs-keyword">new</span> <span class="hljs-type">XDomainRequest</span>();
xdr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'http://www.site.com/page'</span>);
xdr.send(<span class="hljs-literal">null</span>);</code></pre>
<p>XDR区别于普通XHR：</p>
<ul>
<li>不能传输cookie</li>
<li>只能设置请求头部的content-type</li>
<li>不能访问响应头部信息</li>
<li>只支持get/post方法</li>
</ul>
<p>通过这些区别可以阻止一部分的<code>CSRF(Cross-Site Request Forgery，跨站点请求伪造)</code>和<code>XSS(Cross-Site Scripting，跨站点脚本)</code>。</p>
<p>XDR与XHR的使用上非常相似，区别有几点：</p>
<ul>
<li>open()方法只接受两个参数，请求类型和URL</li>
<li>只允许异步请求</li>
<li>响应完成触发onload()事件，但我们只能访问responseText原始文本，并且无法获取响应的status.</li>
<li>异常事件都会触发error事件，并且无错误信息可用。</li>
</ul>
<h3 id="articleHeader10">其余浏览器实现： <code>XMLHttpRequest</code>
</h3>
<p>其余浏览器通过XHR对象直接实现了CORS，你只需要做的就是<code>open()</code>方法中传入一个绝对URL。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('get', 'http://www.site.com/page', true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">'get'</span>, <span class="hljs-string">'http://www.site.com/page'</span>, <span class="hljs-literal">true</span>);</code></pre>
<p>相对于普通的XHR对象，<code>CORS-XHR</code>依然有部分限制：</p>
<ul>
<li>不能使用setRequestHeader()定义头部</li>
<li>不能传递cookie</li>
<li>调用getAllResponseHeaders()，结果为空</li>
</ul>
<h3 id="articleHeader11">其余跨域方法</h3>
<p>上面的两种方法已经很成熟了，但是仍然有一部分方法可以跨域，比如<code>图像Ping</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img = new Image();
img.onload = img.onerror = function () {
    console.log('done');
}
img.src = 'http://www.site.com/test?name=Nicholas';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
img.onload = img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done'</span>);
}
img.src = <span class="hljs-string">'http://www.site.com/test?name=Nicholas'</span>;</code></pre>
<p>这种方式常用于服务端统计广告的点击次数，其缺陷为：</p>
<ul>
<li>只能是GET请求</li>
<li>单向通信，无法获取响应文本</li>
</ul>
<p>另外还有<code>JSONP</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handleResponse(response) {
    console.log(response.ip, response.city);
}

var script = document.createElement('script');
script.src = 'http://freegeoip.net/json?callback=handleResponse';
document.body.insertBefore(script, document.body.firstChild);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleResponse</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(response.ip, response.city);
}

<span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
script.src = <span class="hljs-string">'http://freegeoip.net/json?callback=handleResponse'</span>;
<span class="hljs-built_in">document</span>.body.insertBefore(script, <span class="hljs-built_in">document</span>.body.firstChild);</code></pre>
<p>这种方式通过和服务器配合，跨域请求一个js文件并被服务器处理后传回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleResponse({'name': 'Nicholas'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">handleResponse({'name': 'Nicholas'})<span class="hljs-comment">;</span></code></pre>
<p>然后直接在浏览器调用了该函数，传回的数据被当做response形参进行处理。但它也有一些缺陷：</p>
<ul>
<li>访问的方式是请求js，所以如果域名不安全，则很容易被恶意代码直接执行并攻击</li>
<li>无法检测是否错误，因为js不支持这样的接口事件，只能超时判断</li>
</ul>
<p>上面两种方式很容易看出，我们在支持CORS之前，使用的方法只不过是采用<code>img/css/js</code>等不受跨域访问限制的对象，变相拿到了响应数据，但都有缺陷，所以如果没有历史包袱，建议采用XDR或XHR对象来实现跨域访问。</p>
<h2 id="articleHeader12">XHR的兼容性</h2>
<p>我们可以直接到<code>Can I use</code>这个<a href="http://caniuse.com/#search=XMLHttpRequest" rel="nofollow noreferrer" target="_blank">网站</a>上查询兼容性问题：<br><span class="img-wrap"><img data-src="/img/bVWCA7?w=2314&amp;h=860" src="https://static.alili.tech/img/bVWCA7?w=2314&amp;h=860" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">参考资料</h2>
<ol>
<li>MDN - 禁止修改的消息首部：<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%A6%81%E6%AD%A2%E4%BF%AE%E6%94%B9%E7%9A%84%E6%B6%88%E6%81%AF%E9%A6%96%E9%83%A8" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>
</li>
<li>理解HTTP之Content-Type：<a href="http://homeway.me/2015/07/19/understand-http-about-content-type/" rel="nofollow noreferrer" target="_blank">http://homeway.me/2015/07/19/...</a>
</li>
<li>MDN - Content-Type：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>
</li>
<li>HTTP请求方法：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>
</li>
<li>Javascript高级程序设计 第21章（Ajax与Comet）</li>
<li>你真的会使用XHR吗？ <a href="https://segmentfault.com/a/1190000004322487">https://segmentfault.com/a/11...</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AJAX原理与CORS跨域

## 原文链接
[https://segmentfault.com/a/1190000011549088](https://segmentfault.com/a/1190000011549088)

