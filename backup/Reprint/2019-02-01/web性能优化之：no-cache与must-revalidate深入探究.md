---
title: 'web性能优化之：no-cache与must-revalidate深入探究' 
date: 2019-02-01 2:30:10
hidden: true
slug: 0dlm1ud0kewq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<p>稍微了解HTTP协议的前端同学，想必对<code>Cache-Control</code>不会感到陌生，性能优化时经常都会跟它打交道。</p>
<p>常见的值有有<code>private</code>、<code>public</code>、<code>no-store</code>、<code>no-cache</code>、<code>must-revalidate</code>、<code>max-age</code>等。</p>
<p>各个取值所代表的含义，网上总结挺多的，这里就不打算再进行逐一介绍，感兴趣的可以一起探讨交流。</p>
<p>本文仅挑<code>no-cache</code>、<code>must-revalidate</code> 这两个进行值进行探究对比。在项目实践中，这两个值用的比较多，也比较容易搞混。</p>
<blockquote><p>Cache-Control: no-cache<br>Cache-Control: max-age=60, must-revalidate</p></blockquote>
<p>传送门：<a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9" rel="nofollow noreferrer" target="_blank">RFC2616关于Cache-Control首部的介绍</a>。</p>
<h2 id="articleHeader1">no-cache、must-revalidate简介</h2>
<ul>
<li>
<code>no-cache</code>: 告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，一定要到源服务器进行副本有效性校验。</li>
<li>
<code>must-revalidate</code>：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验。</li>
</ul>
<p>上面的介绍涉及三个主体：<strong>浏览器</strong>、<strong>缓存服务器</strong>、<strong>源服务器</strong>。下面小节会简单进行介绍。</p>
<h2 id="articleHeader2">浏览器、缓存服务器、源服务器</h2>
<ul>
<li>浏览器：资源请求直接发起方。</li>
<li>源服务器：资源实际提供方。</li>
<li>缓存服务器：在浏览器、源服务器之间架设的中间服务器，由它代替浏览器，向源服务器发起资源请求；</li>
</ul>
<p>缓存服务器作用如下。缓存服务器不是必须的，浏览器可也可与源服务器直接通信。</p>
<blockquote><p>加速资源访问速度，降低源服务器的负载。缓存服务器从源服务器获取资源，并返回给浏览器。此外，缓存服务器一般还会在本地保存资源的副本，当有相同的资源请求到来，缓存服务器可返回资源副本，以此提高资源访问速度。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVERLo?w=1460&amp;h=280" src="https://static.alili.tech/img/bVERLo?w=1460&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">对比测试场景、环境准备</h2>
<h3 id="articleHeader4">对比测试场景</h3>
<p>下文会通过以下两种场景的对比测试，来探究<code>no-cache</code>、<code>must-revalidate</code>的区别。</p>
<ol>
<li>浏览器 直接访问 源服务器。</li>
<li>浏览器 通过 缓存服务器，间接访问 源服务器。</li>
</ol>
<h3 id="articleHeader5">环境准备</h3>
<ul>
<li>操作系统：OSX 10.11.4</li>
<li>浏览器：Chrome 52.0.2743.116 (64-bit)、Firefox 49.0.2</li>
<li>缓存服务器：Squid 3.6</li>
<li>源服务器：Express 4.14.0</li>
</ul>
<p>1、下载实验代码：可以访问<a href="https://github.com/chyingp/tech-experiment" rel="nofollow noreferrer" target="_blank">github主页</a>获取，也可通过<code>git clone</code>下载到本地。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/chyingp/tech-experiment.git
cd tech-experiment/2016.10.25-cache-control/
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">git clone https://github.com/chyingp/tech-experiment.git
cd tech-experiment/<span class="hljs-number">2016.10</span>.<span class="hljs-number">25</span>-cache-control/
npm install</code></pre>
<p>2、安装Squid，步骤略，<a href="http://www.squid-cache.org/Versions/" rel="nofollow noreferrer" target="_blank">下载地址</a>。</p>
<p>3、可选：启动Squid，并将本地http代理设置为Squid的ip和端口。</p>
<blockquote><p>备注：测试场景“通过缓存服务器，间接访问源服务器资源”时，才需要这一步。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVERLt?w=1370&amp;h=1080" src="https://static.alili.tech/img/bVERLt?w=1370&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4、可选：将本地代理设置为Charles的地址，然后将Charles的代理地址设置为squid的代理地址。（避免浏览器开发者工具对request header的修改，干扰实验结果）</p>
<h2 id="articleHeader6">场景一：浏览器-&gt;源服务器</h2>
<p>首先，通过以下脚本启动本地服务器（源服务器）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd connect-directly 
node server.js " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">cd connect-directly 
node server.js </code></pre>
<h3 id="articleHeader7">Cache-Control: no-cache</h3>
<p><strong>用例1：二次访问，源服务器 上 资源 未发生变化</strong></p>
<p>访问地址为：<a href="http://127.0.0.1:3000/no-cache" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/no-cache</a></p>
<p>步骤一：第一次访问，返回内容如下。可以看到，返回了<code>Cache-Control: no-cache</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLx?w=1380&amp;h=118" src="https://static.alili.tech/img/bVERLx?w=1380&amp;h=118" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
X-Powered-By: Express
Cache-Control: no-cache
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/&quot;b-s0vwqaICscfrawwztfPIiA&quot;
Date: Wed, 26 Oct 2016 07:46:28 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: no-cache
<span class="hljs-attribute">Content-Type</span>: text/html; charset=utf-8
<span class="hljs-attribute">Content-Length</span>: 11
<span class="hljs-attribute">ETag</span>: W/"b-s0vwqaICscfrawwztfPIiA"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 07:46:28 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<p>步骤二：第二次访问，返回内容如下。返回状态码为<code>304 Not Modified</code>，表示经过校验，源服务器上的资源没有变化，浏览器可以采用本地副本。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLE?w=1222&amp;h=180" src="https://static.alili.tech/img/bVERLE?w=1222&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 304 Not Modified
X-Powered-By: Express
Cache-Control: no-cache
ETag: W/&quot;b-s0vwqaICscfrawwztfPIiA&quot;
Date: Wed, 26 Oct 2016 07:47:31 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">304</span> Not Modified
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: no-cache
<span class="hljs-attribute">ETag</span>: W/"b-s0vwqaICscfrawwztfPIiA"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 07:47:31 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<p><strong>用例2：二次访问，源服务器 上 资源 发生变化</strong></p>
<p>步骤一：访问地址为：<a href="http://127.0.0.1:3000/no-cache?change=1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/no-cach...</a> <br>备注：<code>change=1</code>告诉源服务器，每次访问都返回不同内容</p>
<p>步骤一：第一次访问，内容如下，不赘述。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLG?w=1392&amp;h=120" src="https://static.alili.tech/img/bVERLG?w=1392&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
X-Powered-By: Express
Cache-Control: no-cache
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/&quot;b-8n8r0vUN+mIIQCegzmqpuQ&quot;
Date: Wed, 26 Oct 2016 07:48:01 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: no-cache
<span class="hljs-attribute">Content-Type</span>: text/html; charset=utf-8
<span class="hljs-attribute">Content-Length</span>: 11
<span class="hljs-attribute">ETag</span>: W/"b-8n8r0vUN+mIIQCegzmqpuQ"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 07:48:01 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<p>步骤二：第二次访问，返回内容如下。注意Etag变化了，表示源服务器资源已发生变化。于是状态码为<code>200 OK</code>，源服务器返回新版本的资源给浏览器。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLK?w=1394&amp;h=120" src="https://static.alili.tech/img/bVERLK?w=1394&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
X-Powered-By: Express
Cache-Control: no-cache
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/&quot;b-0DK7Mx61dfZc1vIPJDSNSQ&quot;
Date: Wed, 26 Oct 2016 07:48:38 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: no-cache
<span class="hljs-attribute">Content-Type</span>: text/html; charset=utf-8
<span class="hljs-attribute">Content-Length</span>: 11
<span class="hljs-attribute">ETag</span>: W/"b-0DK7Mx61dfZc1vIPJDSNSQ"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 07:48:38 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<h3 id="articleHeader8">Cache-Control: must-revalidate</h3>
<p>访问地址：<a href="http://127.0.0.1:3000/must-revalidate" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a><br>可选参数说明：</p>
<ul>
<li>
<code>max-age</code>：源站返回的内容，<code>max-age</code>是多少（单位是s）。</li>
<li>
<code>change</code>：源站返回的内容，是否变化，如果是<code>1</code>，则变化。</li>
</ul>
<p><strong>用例1：二次访问，浏览器缓存未过期</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/must-revalidate?max-age=10" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a> <br>备注：<code>max-age=10</code>表示，希望资源缓存10s</p>
<p>步骤一：第一次访问，返回内容如下。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLL?w=1382&amp;h=120" src="https://static.alili.tech/img/bVERLL?w=1382&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
X-Powered-By: Express
Cache-Control: max-age=10, must-revalidate
Content-Type: text/html; charset=utf-8
Content-Length: 16
ETag: W/&quot;10-dK948plT5cojN3y7Cy717w&quot;
Date: Wed, 26 Oct 2016 08:06:16 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">200</span> OK
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: max-age=10, must-revalidate
<span class="hljs-attribute">Content-Type</span>: text/html; charset=utf-8
<span class="hljs-attribute">Content-Length</span>: 16
<span class="hljs-attribute">ETag</span>: W/"10-dK948plT5cojN3y7Cy717w"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 08:06:16 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<p>步骤二：第二次访问（在10s内），如下截图所示，浏览器直接从本地缓存里读取资源副本，并没有重新发起HTTP请求。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLO?w=1394&amp;h=128" src="https://static.alili.tech/img/bVERLO?w=1394&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>用例2：二次访问，浏览器缓存已过期，源服务器 资源未变化</strong></p>
<p>步骤一：第一次访问略过。第二次访问如下截图所示（10s后），返回<code>304 Not Modified</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLP?w=1392&amp;h=118" src="https://static.alili.tech/img/bVERLP?w=1392&amp;h=118" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 304 Not Modified
X-Powered-By: Express
Cache-Control: max-age=10, must-revalidate
ETag: W/&quot;10-dK948plT5cojN3y7Cy717w&quot;
Date: Wed, 26 Oct 2016 08:09:22 GMT
Connection: keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">304</span> Not Modified
<span class="hljs-attribute">X-Powered-By</span>: Express
<span class="hljs-attribute">Cache-Control</span>: max-age=10, must-revalidate
<span class="hljs-attribute">ETag</span>: W/"10-dK948plT5cojN3y7Cy717w"
<span class="hljs-attribute">Date</span>: Wed, 26 Oct 2016 08:09:22 GMT
<span class="hljs-attribute">Connection</span>: keep-alive</code></pre>
<p><strong>用例3：浏览器缓存已过期，源服务器 资源 已变化</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/must-revalidate?max-age=10&amp;change=1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a></p>
<p>步骤一：第一次访问，截图如下。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLR?w=1546&amp;h=118" src="https://static.alili.tech/img/bVERLR?w=1546&amp;h=118" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>步骤二：第二次访问（10s后），返回截图如下，可以看到返回了<code>200</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLW?w=1376&amp;h=120" src="https://static.alili.tech/img/bVERLW?w=1376&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">场景2：浏览器-&gt;缓存服务器-&gt;源服务器</h2>
<p>从上面的对比实验已经知道，在不经过缓存服务器的情况下，<code>no-cache</code>、<code>must-revalidate</code>在缓存校验方面的差别。</p>
<p>接下来，我们再看下，引入缓存服务器后，二者表现的差异点。</p>
<p>备注：下文我们会通过查看<code>Squid</code>的访问日志，来确认缓存服务器的行为。这里对日志中的几个关键字先粗略解释下：</p>
<ul>
<li>TCP_MISS：没有命中缓存。有可能是缓存服务器不存在资源的副本，也有可能资源副本已过期。</li>
<li>TCP_MEM_HIT：命中了缓存。缓存服务器存在资源的副本，并且副本未过期。</li>
</ul>
<p>再次贴上之前的图。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLo?w=1460&amp;h=280" src="https://static.alili.tech/img/bVERLo?w=1460&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">Cache-Control: no-cache</h3>
<p><strong>用例1：chrome第一次访问资源</strong></p>
<p>chrome访问截图如下：<code>200 ok</code></p>
<p><span class="img-wrap"><img data-src="/img/bVERLX?w=1382&amp;h=124" src="https://static.alili.tech/img/bVERLX?w=1382&amp;h=124" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>squid日志：TCP_MISS，表示没有命中本地资源副本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477501799.573     17 127.0.0.1 TCP_MISS/200 299 GET http://127.0.0.1:3000/no-cache - HIER_DIRECT/127.0.0.1 text/html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1477501799</span>.<span class="hljs-number">573</span>     <span class="hljs-number">17</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">200</span> <span class="hljs-number">299</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/no-cache - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> text/html</code></pre>
<p><strong>用例2：chrome再次访问该资源。且源服务器上，该资源未变化</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/no-cache" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/no-cache</a></p>
<p>第一次访问略。第二次访问，chrome访问截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVERLY?w=1394&amp;h=116" src="https://static.alili.tech/img/bVERLY?w=1394&amp;h=116" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>squid访问日志如下：TCP_MISS/304 。表示缓存服务器 联系了 源服务器，发现内容没变化，于是返回304。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477501987.785      1 127.0.0.1 TCP_MISS/304 238 GET http://127.0.0.1:3000/no-cache - HIER_DIRECT/127.0.0.1 -" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1477501987</span>.<span class="hljs-number">785</span>      <span class="hljs-number">1</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">304</span> <span class="hljs-number">238</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/no-cache - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> -</code></pre>
<p><strong>用例3：chrome再次访问该资源。且源服务器上，该资源已变化</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/no-cache?change=1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/no-cach...</a> <br>备注：<code>change=1</code> 表示强制每次访问源服务器，返回的资源都是新的。</p>
<p>第一次访问略。第二次访问，chrome截图如下，状态码为<code>200</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVERLZ?w=1390&amp;h=122" src="https://static.alili.tech/img/bVERLZ?w=1390&amp;h=122" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从squid日志来看，缓存服务器 访问 源服务器，并返回<code>200</code>给浏览器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477647837.216      1 127.0.0.1 TCP_MISS/200 299 GET http://127.0.0.1:3000/no-cache? - HIER_DIRECT/127.0.0.1 text/html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1477647837</span>.<span class="hljs-number">216</span>      <span class="hljs-number">1</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">200</span> <span class="hljs-number">299</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/no-cache? - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> text/html</code></pre>
<h3 id="articleHeader11">Cache-Control: must-revalidate</h3>
<p><strong>用例1：缓存服务器 已存在 资源副本，且该资源副本 未过期</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/must-revalidate?max-age=900" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a><br>备注：<code>max-age=900</code>表示资源有效期是900s</p>
<p>步骤一：</p>
<p>chrome第一次访问 该资源，缓存服务器上没有该资源副本，于是访问源服务器。最终，缓存服务器给浏览器返回200。此时，缓存服务器squid上有了资源的副本。</p>
<p>步骤二：</p>
<p>firefox第一次访问 该资源（900s内）。缓存服务器上已有该资源副本，且该副本未过期。于是，缓存服务器给firefox返回该资源副本，且状态码为200。（缓存命中）</p>
<p>为了验证步骤二中，缓存服务器 返回的是本地资源的副本，查看squid日志。其中，第二条就是firefox的访问记录，<code>TCP_MEM_HIT/200</code>表示命中本地缓存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477648947.594      5 127.0.0.1 TCP_MISS/200 325 GET http://127.0.0.1:3000/must-revalidate? - HIER_DIRECT/127.0.0.1 text/html
1477649012.625      0 127.0.0.1 TCP_MEM_HIT/200 333 GET http://127.0.0.1:3000/must-revalidate? - HIER_NONE/- text/html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog"><span class="hljs-number">1477648947</span>.<span class="hljs-number">594</span>      <span class="hljs-number">5</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">200</span> <span class="hljs-number">325</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/must-revalidate? - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> text/html
<span class="hljs-number">1477649012</span>.<span class="hljs-number">625</span>      <span class="hljs-number">0</span> <span class="hljs-number">127.0.0.1</span> TCP_MEM_HIT/<span class="hljs-number">200</span> <span class="hljs-number">333</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/must-revalidate? - HIER_NONE/- text/html</code></pre>
<p><strong>用例2：缓存服务器 已存在 资源副本，该资源副本已过期，但源服务器上 资源未改变</strong></p>
<p>访问链接：<a href="http://127.0.0.1:3000/must-revalidate?max-age=10" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a></p>
<p>用chrome先后访问该资源，其间间隔超过10s。第二次访问时，chrome收到响应如下。</p>
<p><span class="img-wrap"><img data-src="/img/bVERL1?w=1218&amp;h=118" src="https://static.alili.tech/img/bVERL1?w=1218&amp;h=118" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>查看squid日志。可以看到，状态为<code>TCP_MISS/304</code>，表示本地副本已过期，跟源服务器进行校验，发现源服务器上资源未改变。于是，给浏览器返回304。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477649429.105     11 127.0.0.1 TCP_MISS/304 258 GET http://127.0.0.1:3000/must-revalidate? - HIER_DIRECT/127.0.0.1 -" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1477649429</span>.<span class="hljs-number">105</span>     <span class="hljs-number">11</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">304</span> <span class="hljs-number">258</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/must-revalidate? - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> -</code></pre>
<p><strong>用例3：缓存服务器 已存在 资源副本，该资源副本 已过期，但源服务器上 资源已改变</strong></p>
<p>访问地址：<a href="http://127.0.0.1:3000/must-revalidate?max-age=10&amp;change=1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:3000/must-re...</a></p>
<p>用chrome先后访问该资源，其间间隔超过10s。第二次访问时，chrome收到响应如下</p>
<p><span class="img-wrap"><img data-src="/img/bVERL2?w=1392&amp;h=122" src="https://static.alili.tech/img/bVERL2?w=1392&amp;h=122" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>squid日志如下，状态都是<code>TCP_MISS/200</code>，表示没有命中缓存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1477650702.807      8 127.0.0.1 TCP_MISS/200 325 GET http://127.0.0.1:3000/must-revalidate? - HIER_DIRECT/127.0.0.1 text/html

1477651020.516      4 127.0.0.1 TCP_MISS/200 325 GET http://127.0.0.1:3000/must-revalidate? - HIER_DIRECT/127.0.0.1 text/html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="accesslog hljs"><code class="accesslog"><span class="hljs-number">1477650702</span>.<span class="hljs-number">807</span>      <span class="hljs-number">8</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">200</span> <span class="hljs-number">325</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/must-revalidate? - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> text/html

<span class="hljs-number">1477651020</span>.<span class="hljs-number">516</span>      <span class="hljs-number">4</span> <span class="hljs-number">127.0.0.1</span> TCP_MISS/<span class="hljs-number">200</span> <span class="hljs-number">325</span> GET http://<span class="hljs-number">127.0.0.1:3000</span>/must-revalidate? - HIER_DIRECT/<span class="hljs-number">127.0.0.1</span> text/html</code></pre>
<h2 id="articleHeader12">对比结论</h2>
<p>以下针对的都是浏览器第n次访问资源。（n&gt;1）</p>
<h3 id="articleHeader13">不考虑缓存服务器</h3>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="center">本地缓存是否过期</th>
<th align="center">源服务器资源是否改变</th>
<th align="center">是否重新校验</th>
<th align="center">状态码</th>
</tr></thead>
<tbody>
<tr>
<td align="left">no-cache</td>
<td align="center">不确定</td>
<td align="center">否</td>
<td align="center">是</td>
<td align="center">304</td>
</tr>
<tr>
<td align="left">no-cache</td>
<td align="center">不确定</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">200</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">否</td>
<td align="center">是/否</td>
<td align="center">否</td>
<td align="center">200(来自浏览器缓存)</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">是</td>
<td align="center">否</td>
<td align="center">是</td>
<td align="center">304</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">200</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader14">考虑缓存服务器</h3>
<table>
<thead><tr>
<th align="left">首部</th>
<th align="center">本地缓存是否过期</th>
<th align="center">缓存服务器副本是否过期</th>
<th align="center">源服务器资源是否改变</th>
<th align="center">是否重新校验</th>
<th>状态码</th>
</tr></thead>
<tbody>
<tr>
<td align="left">no-cache</td>
<td align="center">不确定</td>
<td align="center">不确定</td>
<td align="center">否</td>
<td align="center">是</td>
<td>304</td>
</tr>
<tr>
<td align="left">no-cache</td>
<td align="center">不确定</td>
<td align="center">不确定</td>
<td align="center">是</td>
<td align="center">是</td>
<td>200</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">否</td>
<td align="center">是/否</td>
<td align="center">是/否</td>
<td align="center">否</td>
<td>200(来自浏览器缓存)</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">是</td>
<td align="center">否</td>
<td align="center">是/否</td>
<td align="center">是</td>
<td>304(来自缓存服务器)</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">否</td>
<td align="center">是</td>
<td>304</td>
</tr>
<tr>
<td align="left">must-revalidate</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">是</td>
<td align="center">是</td>
<td>200</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader15">写在后面</h2>
<p>经过一轮对比测试，发现<code>no-cache</code>、<code>must-revalidate</code>这两个值还是蛮有意思的。实际上，由于篇幅原因，这里还有一些内容尚未进行对比实验。比如：</p>
<ul>
<li>当<code>must-revalidate</code>或<code>no-cache</code>跟<code>max-stale</code>一起使用时的表现。</li>
<li>
<code>no-cache</code>跟<code>max-age=0, mustvalidate</code>的区别。</li>
<li>
<code>no-chche</code>制定具体的字段名时，跟不指明具体字段名时，缓存校验行为上的区别。</li>
<li>
<code>proxy-revalidate</code>跟<code>must-revalidate</code>的区别。</li>
<li>缓存服务器本身优化算法对实验结果的影响。</li>
</ul>
<p>对比实验过程比较枯燥繁琐，如有不严谨或错漏的地方，敬请指出 :)</p>
<p>这里留个经常会碰到的问题，供读者探讨：<code>no-cache</code>跟<code>max-age=0, mustvalidate</code>的区别。</p>
<h2 id="articleHeader16">相关链接</h2>
<p>RFC2616 14.9： Cache-Control<br><a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9" rel="nofollow noreferrer" target="_blank">https://www.w3.org/Protocols/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web性能优化之：no-cache与must-revalidate深入探究

## 原文链接
[https://segmentfault.com/a/1190000007317481](https://segmentfault.com/a/1190000007317481)

