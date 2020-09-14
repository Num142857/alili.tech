---
title: 'web缓存机制' 
date: 2019-02-04 2:30:58
hidden: true
slug: h6dj9mrc7r
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是web缓存</h2>
<blockquote><p>Web缓存是指一个Web资源（如html页面，图片，js，数据等）存在于Web服务器和客户端（浏览器）之间的副本。缓存会根据进来的请求保存输出内容的副本；当下一个请求来到的时候，如果是相同的URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求。比较常见的就是浏览器会缓存访问过网站的网页，当再次访问这个URL地址的时候，如果网页没有更新，就不会再次下载网页，而是直接使用本地缓存的网页。只有当网站明确标识资源已经更新，浏览器才会再次下载网页</p></blockquote>
<h2 id="articleHeader1">web缓存类型</h2>
<h3 id="articleHeader2">数据库数据缓存</h3>
<p>Web应用，特别是SNS类型的应用，往往关系比较复杂，数据库表繁多，如果频繁进行数据库查询，很容易导致数据库不堪重荷。为了提供查询的性能，会将查询后的数据放到内存中进行缓存，下次查询时，直接从内存缓存直接返回，提供响应效率。比如常用的缓存方案有memcached等。</p>
<h3 id="articleHeader3">服务器端缓存</h3>
<ul>
<li><p>代理服务器缓存<br>代理服务器是浏览器和源服务器之间的中间服务器，浏览器先向这个中间服务器发起Web请求，经过处理后（比如权限验证，缓存匹配等），再将请求转发到源服务器。代理服务器缓存的运作原理跟浏览器的运作原理差不多，只是规模更大。可以把它理解为一个共享缓存，不只为一个用户服务，一般为大量用户提供服务，因此在减少相应时间和带宽使用方面很有效，同一个副本会被重用多次。常见代理服务器缓存解决方案有Squid等</p></li>
<li><p><code>CDN</code>缓存<br><code>CDN</code>（Content delivery networks）缓存，也叫网关缓存、反向代理缓存。<code>CDN</code>缓存一般是由网站管理员自己部署，为了让他们的网站更容易扩展并获得更好的性能。浏览器先向<code>CDN</code>网关发起Web请求，网关服务器后面对应着一台或多台负载均衡源服务器，会根据它们的负载请求，动态将请求转发到合适的源服务器上。虽然这种架构负载均衡源服务器之间的缓存没法共享，但却拥有更好的处扩展性。</p></li>
</ul>
<h3 id="articleHeader4">浏览器端缓存</h3>
<p>浏览器缓存根据一套与服务器约定的规则进行工作，在同一个会话过程中会检查一次并确定缓存的副本足够新。如果你浏览过程中，比如前进或后退，访问到同一个图片，这些图片可以从浏览器缓存中调出而即时显现。</p>
<h3 id="articleHeader5">Web应用层缓存</h3>
<p>应用层缓存指的是从代码层面上，通过代码逻辑和缓存策略，实现对数据，页面，图片等资源的缓存，可以根据实际情况选择将数据存在文件系统或者内存中，减少数据库查询或者读写瓶颈，提高响应效率。</p>
<h2 id="articleHeader6">web缓存工作原理</h2>
<p>所有的缓存都是基于一套规则来帮助他们决定什么时候使用缓存中的副本提供服务（假设有副本可用的情况下，未被销毁回收或者未被删除修改）。这些规则有的在协议中有定义（如HTTP协议1.0和2.0），有的则是由缓存的管理员设置（如DBA、浏览器的用户、代理服务器管理员或者应用开发者）</p>
<h3 id="articleHeader7">浏览器端的缓存规则</h3>
<p>对于浏览器端的缓存来讲，这些规则是在HTTP协议头和HTML页面的Meta标签中定义的。他们分别从新鲜度和校验值两个维度来规定浏览器是否可以直接使用缓存中的副本，还是需要去源服务器获取更新的版本。</p>
<p>新鲜度（过期机制）：也就是缓存副本有效期。一个缓存副本必须满足以下条件，浏览器会认为它是有效的，足够新的：</p>
<ul>
<li><p>含有完整的过期时间控制头信息（<code>HTTP</code>协议报头<code>Cache-Control</code>与<code>Expires</code>），并且仍在有效期内；</p></li>
<li><p>如果已经超过有效期，发起请求到服务器验证Etag,如果没有更新，还是使用浏览器缓存</p></li>
</ul>
<p>满足以上两个情况的一种，浏览器会直接从缓存中获取副本并渲染。<br>校验值（验证机制）：</p>
<ul>
<li><p><code>Cache-Control</code>与<code>Expires</code>的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过<code>Cache-Control</code>的选择更多，设置更细致，如果同时设置的话，其优先级高于<code>Expires</code>。</p></li>
<li><p>服务器返回资源的时候有时在控制头信息带上这个资源的实体标签<code>Etag</code>（Entity Tag），它可以用来作为浏览器再次请求过程的校验标识。如过发现校验标识不匹配，说明资源已经被修改或过期，浏览器需求重新获取资源内容。</p></li>
<li><p>如果检测到本地的缓存还是有效的时间范围内，浏览器直接使用本地副本，不会发送任何请求。两者一起使用时，<code>Cache-Control/Expires</code>的优先级要高于<code>Last-Modified/ETag</code>。即当本地副本根据<code>Cache-Control/Expires</code>发现还在有效期内时，则不会再次发送请求去服务器询问修改时间（Last-Modified）或实体标识（Etag）了。</p></li>
</ul>
<h2 id="articleHeader8">缓存有关的HTTP消息报头</h2>
<p><span class="img-wrap"><img data-src="/img/bVCMeq" src="https://static.alili.tech/img/bVCMeq" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVCMeI" src="https://static.alili.tech/img/bVCMeI" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>一般情况下，使用<code>Cache-Control/Expires</code>会配合<code>Last-Modified/ETag</code>一起使用，因为即使服务器设置缓存时间, 当用户点击“刷新”按钮时，浏览器会忽略缓存继续向服务器发送请求，这时<code>Last-Modified/ETag</code>将能够很好利用304，从而减少响应开销。</p>
<h3 id="articleHeader9"><code>Last-Modified/ETag</code></h3>
<p>你可能会觉得使用<code>Last-Modified</code>已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个<code>Last-Modified</code>比较难解决的问题：<br><code>Last-Modified</code>标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的新鲜度<br>如果某些文件会被定期生成，当有时内容并没有任何变化，但<code>Last-Modified</code>却改变了，导致文件没法使用缓存<br>有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形<br><code>Etag</code>是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。<code>Last-Modified</code>与<code>Etag</code>是可以一起使用的，服务器会优先验证<code>Etag</code>，一致的情况下，才会继续比对<code>Last-Modified</code>，最后才决定是否返回304</p>
<h3 id="articleHeader10">用户操作行为与缓存</h3>
<p>用户在使用浏览器的时候，会有各种操作，比如输入地址后回车，按F5刷新等，这些行为会对缓存有什么影响呢？<br><span class="img-wrap"><img data-src="/img/bVCMkD" src="https://static.alili.tech/img/bVCMkD" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>通过上表我们可以看到，当用户在按F5进行刷新的时候，会忽略<code>Cache-Control/Expires</code>的设置，会再次发送请求去服务器请求，而<code>Last-Modified/ETag</code>还是有效的，服务器会根据情况判断返回304还是200；而当用户使用Ctrl+F5进行强制刷新的时候，只是所有的缓存机制都将失效，重新从服务器拉去资源。</p>
<h2 id="articleHeader11">参考资料</h2>
<p><a href="http://www.alloyteam.com/2013/12/web-cache-6-hybrid-app-tailored-cache/" rel="nofollow noreferrer" target="_blank">Web缓存机制系列</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web缓存机制

## 原文链接
[https://segmentfault.com/a/1190000006820010](https://segmentfault.com/a/1190000006820010)

