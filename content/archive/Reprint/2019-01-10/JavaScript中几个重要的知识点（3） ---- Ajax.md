---
title: 'JavaScript中几个重要的知识点（3） ---- Ajax' 
date: 2019-01-10 2:30:08
hidden: true
slug: d2zlavi8x98
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">JavaScript中几个最重要的大知识点</h3>
<ol>
<li><p>面向对象</p></li>
<li><p>DOM事件</p></li>
<li><p>异步交互ajax</p></li>
</ol>
<h4>AJAX</h4>
<blockquote><p>AJAX是异步的javascript和xml（Asynchronous Javascript And XML）的缩写，用于网页局部刷新，提升用户浏览体验</p></blockquote>
<p>通常前端程序员关于AJAX的掌握仅仅停留在会用AJAX发送请求，将得到的数据渲染到DOM中即可，如果看这篇文章的你是出于这个目的，那么下面的两个代码示例就可以解决你的问题了。</p>
<ul><li><p>原生JS写法：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr=new XMLHttpRequest();
xhr.open(&quot;[method]&quot;,&quot;[url]&quot;,[true/false]);    //true为异步，false为同步
xhr.onreadystatechange=function(){
    if(xhr.readystate===4 &amp;&amp; xhr.status==200){
        var result=xhr.responseText;    //这里是服务器端返回的数据
    }
}
xhr.send(null);    //如果需要向服务器发送数据，则写入key=value&amp;key=value形式的字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"[method]"</span>,<span class="hljs-string">"[url]"</span>,[<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>]);    <span class="hljs-comment">//true为异步，false为同步</span>
xhr.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(xhr.readystate===<span class="hljs-number">4</span> &amp;&amp; xhr.status==<span class="hljs-number">200</span>){
        <span class="hljs-keyword">var</span> result=xhr.responseText;    <span class="hljs-comment">//这里是服务器端返回的数据</span>
    }
}
xhr.send(<span class="hljs-literal">null</span>);    <span class="hljs-comment">//如果需要向服务器发送数据，则写入key=value&amp;key=value形式的字符串</span></code></pre>
<ul><li><p>jQuery写法：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url:&quot;&quot;,
    method:&quot;&quot;,
    dataType:&quot;json&quot;,
    async:true,
    data:null,    //需要向服务器发送的数据，可以是对象形式
    success:function(data){}    //data为服务器返回的数据
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">$.ajax({
    <span class="hljs-attr">url</span>:<span class="hljs-string">""</span>,
    <span class="hljs-attr">method</span>:<span class="hljs-string">""</span>,
    <span class="hljs-attr">dataType</span>:<span class="hljs-string">"json"</span>,
    <span class="hljs-attr">async</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">data</span>:<span class="hljs-literal">null</span>,    <span class="hljs-comment">//需要向服务器发送的数据，可以是对象形式</span>
    success:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{}    <span class="hljs-comment">//data为服务器返回的数据</span>
})</code></pre>
<p>本文的重点不在于介绍AJAX写法，而是AJAX所造成的前后端交互，下面将介绍完整的前后端交互过程以及其中的一些细节东西。</p>
<h4>客户端和服务器端的交互</h4>
<blockquote><p>面试题：当你在浏览器的地址栏中输入一个网址，到浏览器呈现这个网页中的内容，中间都经历了哪些事情？</p></blockquote>
<p>这个面试题粗略地考察了一下前后端交互的知识点，即客户端和服务器端的交互模型“HTTP事务”，这个交互主要包含了以下几个阶段：</p>
<ul>
<li>
<p>Request请求阶段</p>
<ol>
<li><p>客户端首先通过域名，到DNS服务器上，找到服务器对应的外网IP地址</p></li>
<li><p>通过外网IP地址，找到对应的项目服务器</p></li>
<li><p>通过端口号，在服务上找到对应的项目资源文件目录（因为发布项目的时候,已经把项目目录和项目端口号对应了）</p></li>
</ol>
</li>
<li>
<p>Response响应阶段</p>
<ol>
<li><p>服务器端会把客户端需要请求的资源文件的源代码，返回给客户端的浏览器</p></li>
<li><p>客户端浏览器接收到返回内容后，使用不同的代码解析引擎进行渲染和解析</p></li>
</ol>
</li>
</ul>
<p>看到这里，你或许会对上面一些名词有疑惑，下面对一些细节进行详细地描述，以帮助你理解以上的交互。</p>
<blockquote><p>一个完整的URI：<a href="https://www.baidu.com:443/xxx/xxx.html?name=zf&amp;age=8#video" rel="nofollow noreferrer" target="_blank">https://www.baidu.com:443/xxx...</a></p></blockquote>
<ul>
<li><p>URI：统一资源标识符</p></li>
<li><p>URL：统一资源定位符</p></li>
<li><p>URN：统一资源名称</p></li>
<li><p>URI=URL+URN</p></li>
</ul>
<p>上述的一个完整的URI可以分6部分，前3部分为URL，后3部分为URN</p>
<ol>
<li>
<p>HTTP / HTTPS / FTP：传输协议</p>
<ul>
<li><p>浏览器默认使用HTTP，但网站可以进行重定向使用HTTPS</p></li>
<li><p>HTTP：超文本传输协议，客户端和服务器端除了传输文本以外，还可以传输图片，音视频等富媒体资源（二进制文件流/BASE64……）</p></li>
<li><p>HTTPS：传输通道经过SSL加密HTTP，和支付有关的网站基本都是HTTPS传输协议</p></li>
<li><p>FTP：资源文件传输协议，经常应用于对服务器资源文件的管理（上传和下载）</p></li>
</ul>
</li>
<li>
<p>域名</p>
<ul>
<li><p>一级域名：www.qq.com</p></li>
<li><p>二级域名：sport.qq.com</p></li>
<li><p>三级域名：kbs.sport.qq.com</p></li>
</ul>
</li>
<li>
<p>端口号</p>
<ul>
<li><p>80：HTTP默认</p></li>
<li><p>443：HTTPS默认</p></li>
<li><p>21：FTP默认</p></li>
<li><p>端口号的取值范围:0-65535之间,端口号被一个项目或程序占用,其它的程序就不能再使用这个端口号了</p></li>
</ul>
</li>
<li>
<p>请求资源文件的路径和名称</p>
<ul>
<li><p>/student/index.html 请求的是当前项目student文件夹下的index.html文件</p></li>
<li><p>/index.html 请求的是当前项目根目录下的index.html文件，在不指定请求文件的时候，默认请求的资源文件一般都是/index.html或者/default.html（可以在服务器中配置默认的请求文件）</p></li>
</ul>
</li>
<li>
<p>问号传参</p>
<ul>
<li><p>?key=value&amp;key=value...</p></li>
<li><p>客户端可以通过问号传递参数的方式,把一些信息传递给服务器端</p></li>
</ul>
</li>
<li>
<p>哈希值（HASH）</p>
<ul>
<li><p>#video</p></li>
<li><p>一般用于锚点定位或者实现页面的路由切换</p></li>
</ul>
</li>
</ol>
<blockquote><p>HTTP报文：客户端传递给服务器端的内容以及服务器返回给客户端的内容统称为报文</p></blockquote>
<ul>
<li><p>起始行：请求起始行、响应起始行</p></li>
<li><p>首部（头）：通用头、请求头、响应头、自定义（请求/响应）头</p></li>
<li><p>主体：请求主体、响应主体</p></li>
</ul>
<ol>
<li>
<p>客户端都可以通过哪些方式把内容传递给服务器呢？</p>
<ul>
<li><p>请求URL地址后面的问号传参（很常用）</p></li>
<li><p>通过设置请求头信息，把内容传递给服务器（请求头：客户端设置/服务器端获取）</p></li>
<li><p>通过请求主体把信息传递给服务器（请求主体：客户端设置/服务器端获取）</p></li>
</ul>
</li>
<li>
<p>服务器端如何把内容返回给客户端？</p>
<ul>
<li><p>通过响应头把信息返回给客户端（响应头：服务器端设置/客户端获取）</p></li>
<li><p>通过响应主体把信息返回给客户端（响应主体：服务器端设置/客户端获取）</p></li>
</ul>
</li>
</ol>
<p>实际上关于网络协议的知识点远不止这些，但是用于理解AJAX以及前后端交互已经足够了，下面便可以对AJAX进行深入地理解了。</p>
<h4>分解AJAX步骤</h4>
<p>1.创建一个对象（在IE6以及更低版本的浏览器中，不支持XMLHttpRequest这个类，我们需要使用ActiveXObject来处理）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr=new XMLHttpRequest;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest;</code></pre>
<p>2.打开一个URL请求地址（发送请求前的一些配置）</p>
<ul>
<li><p>请求方式：GET系列（GET/DELETE/HEAD）；POST系列（POST/PUT）</p></li>
<li><p>请求地址：通过这个地址向服务器发送数据请求，请求的地址一般都是后台提供的（API接口文档）</p></li>
<li>
<p>设置同步异步：默认TRUE异步，设置为FALSE为同步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open(&quot;GET&quot;,&quot;URL&quot;,true);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.open(<span class="hljs-string">"GET"</span>,<span class="hljs-string">"URL"</span>,<span class="hljs-literal">true</span>);
</code></pre>
</li>
</ul>
<p>3.监听AJAX状态的改变，实现不同的业务操作</p>
<ul>
<li><p>0：UNSENT  未发送</p></li>
<li><p>1：OPENED  已打开，就是已经执行完成第二步操作了</p></li>
<li><p>2：HEADERS_RECEIVED  客户端已经接收到服务器返回的响应头信息</p></li>
<li><p>3：LOADING  服务器返回的主体内容正在传输中</p></li>
<li>
<p>4：DONE  响应主体内容已经被客户端接收</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange=function(){
    if(xhr.readyState===4 &amp;&amp; xhr.status===200){
var result=xhr.responseText;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(xhr.readyState===<span class="hljs-number">4</span> &amp;&amp; xhr.status===<span class="hljs-number">200</span>){
<span class="hljs-keyword">var</span> result=xhr.responseText;
    }
}</code></pre>
</li>
</ul>
<blockquote><p>xhr.status：HTTP状态码，通过状态码可以知道当前HTTP事务是否成功，以及失败的原因</p></blockquote>
<ul>
<li>
<p>2开头：代表成功</p>
<ul><li><p>200：OK  请求已成功</p></li></ul>
</li>
<li>
<p>3开头：也代表成功，但是这个成功经历了一些特殊的处理</p>
<ul>
<li><p>301：Moved Permanently  在新版本HTTP协议中，它代表永久转移（在之前的版本中它代表永久重定向）</p></li>
<li><p>302：Move temporarily  在新版本HTTP协议中，它代表临时转移（在之前的版本中代表临时重定向，新版本中307代表临时重定向） =&gt; "服务器负载均衡"</p></li>
<li><p>304：Not Modified  读取的是缓存中的数据（网站性能优化的一个特别重要的手段：我们一般会把静态的资源文件CSS/JS/IMG做304缓存）</p></li>
</ul>
</li>
<li>
<p>4开头：代表错误，而且一般都是客户端的错误</p>
<ul>
<li><p>400：Bad Request  请求参数错误</p></li>
<li><p>401：Unauthorized  无权访问</p></li>
<li><p>403：Forbidden  服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。如果这不是一个 HEAD 请求，而且服务器希望能够讲清楚为何请求不能被执行，那么就应该在实体内描述拒绝的原因。当然服务器也可以返回一个404响应，假如它不希望让客户端获得任何信息</p></li>
<li><p>404：Not Found  请求的地址不存在</p></li>
<li><p>413：Request Entity Too Large  客户端传递给服务器的内容超过了服务器愿意接收的范围</p></li>
</ul>
</li>
<li>
<p>5开头：代表错误，而且一般都是服务器端错误</p>
<ul>
<li><p>500：Internal Server Error  服务器的未知错误</p></li>
<li><p>503：Service Unavailable  服务器超负荷</p></li>
</ul>
</li>
</ul>
<blockquote><p>xhr对象中的一些属性和方法</p></blockquote>
<ul>
<li><p>xhr.response：获取响应主体内容（一般不用）</p></li>
<li><p>xhr.responseText：获取响应主体内容，而且获取的内容是文本格式（字符串）</p></li>
<li><p>xhr.responseXML：获取响应主体内容是XML格式（XML文档）</p></li>
<li><p>xhr.getResponseHeader([key])：获取响应头信息</p></li>
<li><p>xhr.timeout：设置AJAX请求的超时时间，如果当前请求超过这个时间，代表超时，AJAX请求结束，并且会触发ontimeout事件</p></li>
<li><p>xhr.abort()：中断当前AJAX请求，xhr.onabort就是当请求被中断时触发的事件</p></li>
<li><p>xhr.setRequestHeader([key],[value])：设置请求头信息，[value]不能是中文汉字，如果需要传递中文汉字，需要先把传递的内容进行编码由服务器进行解码，例如：xhr.setRequestHeader("ajax",encodeURIComponent("前后端交互"));</p></li>
</ul>
<blockquote><p>编码解码方式：</p></blockquote>
<ul>
<li><p>escape / unescape：这种方式经常应用于客户端对中文汉字进行编码（不常用，因为服务器端大部分语言，除了NODE，其它都不支持这个编码方式）</p></li>
<li><p>encodeURI / decodeURI：按照UNICODE编码解码</p></li>
<li><p>encodeURIComponent / decodeURIComponent：相对于上面的方法来说可以把特殊字符也进行编码，而encodeURI只能编码中文汉字</p></li>
</ul>
<p>4.发送AJAX请求，AJAX请求这件事从执行SEND后才开始（之前都是在做准备），当readState===4的时候这件事结束；<br>SEND方法中写的内容就是客户端通过请求主体传递给服务器的内容，不想通过请求主体传递内容写null</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<p>至此，整个AJAX请求完成，估计你对前后端交互也有一个大致的了解了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中几个重要的知识点（3） ---- Ajax

## 原文链接
[https://segmentfault.com/a/1190000009954542](https://segmentfault.com/a/1190000009954542)

