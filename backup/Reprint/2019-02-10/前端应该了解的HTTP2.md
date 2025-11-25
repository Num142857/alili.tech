---
title: '前端应该了解的HTTP2' 
date: 2019-02-10 2:30:42
hidden: true
slug: dzv2y8axm2a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">欢迎一起交流</h2>
<p>欢迎关注我的个人公众号，不定期更新自己的工作心得。<br><span class="img-wrap"><img data-src="/img/bVEk23" src="https://static.alili.tech/img/bVEk23" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">Why HTTP2</h2>
<h4>慢</h4>
<p>影响一个网络请求的因素主要有两个，带宽和延迟。今天的网络基础建设已经使得带宽得到极大的提升，大部分时候都是延迟在影响响应速度。</p>
<h4>连接无法复用</h4>
<p>连接无法复用会导致每次请求都经历三次握手和慢启动。三次握手在高延迟的场景下影响较明显，慢启动则对文件类大请求影响较大。</p>
<h4>head of line blocking</h4>
<p>head of line blocking会导致带宽无法被充分利用，以及后续健康请求被阻塞。</p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/blog/http_pipelining_performance.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/blog/http_pipelining_performance.png" alt="http_pipelining_performance" title="http_pipelining_performance" style="cursor: pointer;"></span><br><em>HTTP1.0 -&gt; HTTP1.1</em></p>
<p>不过pipelining并不是救世主，它也存在不少缺陷：</p>
<ul>
<li><p>pipelining只能适用于http1.1，一般来说，支持http1.1的server都要求支持pipelining</p></li>
<li><p>只有幂等的请求（GET，HEAD）能使用pipelining，非幂等请求比如POST不能使用，因为请求之间可能会存在先后依赖关系。</p></li>
<li><p>head of line blocking并没有完全得到解决，server的response还是要求依次返回，遵循FIFO(first in first out)原则。也就是说如果请求1的response没有回来，2，3，4，5的response也不会被送回来。</p></li>
<li><p>绝大部分的http代理服务器不支持pipelining。</p></li>
<li><p>和不支持pipelining的老服务器协商有问题。</p></li>
<li><p>可能会导致新的Front of queue blocking问题。</p></li>
</ul>
<h2 id="articleHeader2">HTTP2 VS HTTP1.1</h2>
<h3 id="articleHeader3">多路复用</h3>
<p>多路复用通过多个请求stream共享一个tcp连接的方式，解决了http1.x holb（head of line blocking）的问题，降低了延迟同时提高了带宽的利用率。</p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/blog/http-6.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/blog/http-6.png" alt="http-6" title="http-6" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">压缩头部</h3>
<p>HTTP/2.0规定了在客户端和服务器端会使用并且维护「首部表」来跟踪和存储之前发送的键值对，对于相同的头部，不必再通过请求发送，只需发送一次。</p>
<p>事实上,如果请求中不包含首部（例如对同一资源的轮询请求），那么首部开销就是零字节。此时所有首部都自动使用之前请求发送的首部。</p>
<p>如果首部发生变化了，那么只需要发送变化了数据在Headers帧里面，新增或修改的首部帧会被追加到“首部表”。首部表在 HTTP2.0的连接存续期内始终存在,由客户端和服务器共同渐进地更新。</p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/blog/Header%E5%A4%8D%E7%94%A8.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/blog/Header%E5%A4%8D%E7%94%A8.png" alt="Header复用" title="Header复用" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">二进制分帧</h3>
<p>在应用层与传输层之间增加一个二进制分帧层，以此达到“在不改动HTTP的语义，HTTP 方法、状态码、URI及首部字段的情况下，突破HTTP1.1的性能限制，改进传输性能，实现低延迟和高吞吐量。”</p>
<p>在二进制分帧层上，HTTP2.0会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码，其中HTTP1.x的首部信息会被封装到Headers帧，而我们的request body则封装到Data帧里面。</p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/blog/%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%88%86%E5%B8%A7.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/blog/%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%88%86%E5%B8%A7.png" alt="二进制分帧" title="二进制分帧" style="cursor: pointer;"></span></p>
<p>客户端和服务器可以把HTTP消息分解为互不依赖的帧，然后乱序发送，最后再在另一端把它们重新组合起来。注意，同一链接上有多个不同方向的数据流在传输。客户端可以一边乱序发送stream，也可以一边接收者服务器的响应，而服务器那端同理。</p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/blog/%E5%85%B1%E4%BA%AB%E8%BF%9E%E6%8E%A5.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/blog/%E5%85%B1%E4%BA%AB%E8%BF%9E%E6%8E%A5.png" alt="共享连接" title="共享连接" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">请求优先级</h3>
<p>多路复用导致所有资源都是并行发送，那么就需要「优先级」的概念了，这样就可以对重要的文件进行先传输，加速页面的渲染。</p>
<h3 id="articleHeader7">服务器推送</h3>
<p>服务器推送是指在客户端请求之前发送数据的机制。</p>
<p>另外有一点值得注意的是，客户端如果退出某个业务场景，出于流量或者其它因素需要取消server push，也可以通过发送RST_STREAM类型的frame来做到。</p>
<h2 id="articleHeader8">HTTP2 实践</h2>
<p>这里使用 Node.js 作为服务器端语言。</p>
<h3 id="articleHeader9">1. 生成<strong>TLS</strong>证书</h3>
<p>如果想要在生产环境中使用HTTP2，那么你可以去<a href="https://letsencrypt.org/" rel="nofollow noreferrer" target="_blank">这里</a>生成一个证书。</p>
<p>如果你仅仅开发环境使用，那么我们可以自己生成一个自签名的TSL证书。</p>
<ol>
<li><p>安装OpenSSH</p></li>
<li>
<p>使用OpenSSH生成私钥</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl genrsa -des3 -passout pass:1234 -out server.pass.key 2048`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">openssl</span> <span class="hljs-selector-tag">genrsa</span> <span class="hljs-selector-tag">-des3</span> <span class="hljs-selector-tag">-passout</span> <span class="hljs-selector-tag">pass</span><span class="hljs-selector-pseudo">:1234</span> <span class="hljs-selector-tag">-out</span> <span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.pass</span><span class="hljs-selector-class">.key</span> 2048`</code></pre>
<p>这里 <code>1234</code> 为私钥密码，如果你不想使用密码，则可以去除私钥密码，敲入如下密令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl rsa -passin pass:x -in server.pass.key -out server.key" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">openssl</span> <span class="hljs-selector-tag">rsa</span> <span class="hljs-selector-tag">-passin</span> <span class="hljs-selector-tag">pass</span><span class="hljs-selector-pseudo">:x</span> <span class="hljs-selector-tag">-in</span> <span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.pass</span><span class="hljs-selector-class">.key</span> <span class="hljs-selector-tag">-out</span> <span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.key</span></code></pre>
</li>
<li>
<p>创建 证书签名请求<br>  这里使用无密码私钥，如果使用带密码私钥，只需将<code>server.key</code>更换为<code>server.pass.key</code>即可，密令如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl req -new -key server.key -out server.csr" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">openssl req -<span class="hljs-keyword">new</span> -key <span class="hljs-keyword">server</span>.key -out <span class="hljs-keyword">server</span>.csr</code></pre>
</li>
<li>
<p>创建证书</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">openssl x509 -req -days <span class="hljs-number">365</span> -<span class="hljs-keyword">in</span> server<span class="hljs-selector-class">.csr</span> -signkey server<span class="hljs-selector-class">.key</span> -out server.crt</code></pre>
</li>
</ol>
<p>通过以上四个步骤，我们得到了三个文件</p>
<ol>
<li><p><strong>server.key</strong> 你的TSL证书私钥</p></li>
<li><p><strong>server.csr</strong> 你的TSL证书签名请求</p></li>
<li><p><strong>server.crt</strong> 你的TSL证书</p></li>
</ol>
<h3 id="articleHeader10">2. 使用Node.js 创建服务器</h3>
<p>安装 <a href="https://github.com/molnarg/node-http2" rel="nofollow noreferrer" target="_blank">node-http2</a> 模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install http2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> http2</code></pre>
<p>创建服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

require('http2').createServer(options, function(request, response) {
  response.end('Hello world!');
}).listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> options = {
  <span class="hljs-attr">key</span>: fs.readFileSync(<span class="hljs-string">'./server.key'</span>),
  <span class="hljs-attr">cert</span>: fs.readFileSync(<span class="hljs-string">'./server.crt'</span>)
};

<span class="hljs-built_in">require</span>(<span class="hljs-string">'http2'</span>).createServer(options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">'Hello world!'</span>);
}).listen(<span class="hljs-number">8080</span>);</code></pre>
<p>启动服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>使用浏览器访问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:8080</span></code></pre>
<p>到此，一个简单的Demo就完成了。</p>
<h3 id="articleHeader11">Demo源码下载</h3>
<p><a href="https://github.com/zhanyouwei/HTTP2-NodeJS-Demo" rel="nofollow noreferrer" target="_blank">点击这里</a>访问完整Demo</p>
<p><a href="https://github.com/zhanyouwei/HTTP2-NodeJS-Demo" rel="nofollow noreferrer" target="_blank">https://github.com/zhanyouwei...</a></p>
<h3 id="articleHeader12">测试结果对比</h3>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/http2test.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/http2test.png" alt="http2test" title="http2test" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://7xs2h9.com1.z0.glb.clouddn.com/http1test.png" src="https://static.alili.techhttp://7xs2h9.com1.z0.glb.clouddn.com/http1test.png" alt="http1test" title="http1test" style="cursor: pointer;"></span></p>
<p>通过上面两张截图可以发现，使用了HTTP2后，同样的请求，在数据传输大小与速度上都有非常大的提升，几乎可以预见，不久的将来，HTTP2将会大放异彩。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端应该了解的HTTP2

## 原文链接
[https://segmentfault.com/a/1190000005085636](https://segmentfault.com/a/1190000005085636)

