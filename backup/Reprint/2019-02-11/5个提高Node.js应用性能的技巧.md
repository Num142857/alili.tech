---
title: '5个提高Node.js应用性能的技巧' 
date: 2019-02-11 2:30:49
hidden: true
slug: nx65tlitjjh
categories: [reprint]
---

{{< raw >}}

                    
<p>“如果你的 node 服务器前面没有 nginx, 那么你可能做错了。”— Bryan Hughes</p>
<p>Node.js 是使用 最流行的语言— JavaScript 构建服务器端应用的领先工具 。由于可以同时提供 web 服务器和应用服务器的功能，Node.js 被认为是以微服务为基础的开发和部署的关键工具。</p>
<p>在后端开发中，Node.js 可以替换或者扩展 Java 和 .NET。</p>
<p>Node.js 是单线程非阻塞 I/O, 使其可以支持成千上万的并发操作。这和 NGINX 解决 C10K 问题的方式如出一辙。Node.js 以高效的性能和开发效率著称。</p>
<p><strong>所以，到底哪里做错了？</strong></p>
<p>Node.js 的一些缺陷使得以 Node.js 为基础的系统面临潜在的性能问题甚至崩溃，这在系统流量迅速增长时表现的尤其明显。虽然 Node.js 是处理 web 应用逻辑的很好工具，但它并不擅长处理静态文件，比如图片和 JavaScript 文件，同样不擅长多个服务器间的负载均衡。</p>
<p>为了更好的使用  Node.js, 你需要把缓存静态文件、代理、负载均衡、客户端连接管理等功能交给 NGINX 去做。</p>
<p><strong>下面是一些提高 Node.js 性能的建议：</strong></p>
<p>实现一个反向代理服务器<br> 缓存静态文件<br> 多服务器负载均衡<br> 代理 WebSocket 连接<br> 实现 SSL/TLS 和 HTTP/2<br>注：提升 Node.js 应用性能的最快方法是修改你的 Node.js 文件来利用多核处理器，查看这篇文章来学习如何充分利用服务器上的多核CPU。</p>
<h1 id="articleHeader0">一、实现一个反向代理服务器</h1>
<p>相比大多数应用服务器，Node.js 可以很轻松的处理大量的网络流量，但这并不是 Node.js 的设计初衷。</p>
<p>如果你有一个高流量的站点，提高性能的第一步是在你的 Node.js 前面放一个反向代理服务器。这可以保护你的 Node.js 服务器免于直接暴露在网络中，而且可以允许你灵活的使用多个应用服务器做负载均衡和静态文件缓存。</p>
<p><span class="img-wrap"><img data-src="/img/bVuNbF" src="https://static.alili.tech/img/bVuNbF" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>使用 NGINX 在一个已经存在的服务器前做反向代理，作为 NGINX 的一个核心应用，已经被用于全世界成千上万的站点中。</p>
<p>下面是使用 NGINX 作为反向代理服务器的优点：</p>
<ul>
<li><p>简化了权限处理和端口分配</p></li>
<li><p>更高效的处理静态资源</p></li>
<li><p>更好的处理 Node.js 崩溃情况</p></li>
<li><p>缓解 DoS 攻击的影响</p></li>
</ul>
<p>注：这篇文章解释如何在 Ubuntu 14.04 或者 CentOS 环境中使用 NGINX 做反向代理服务器，而且使用 NGINX 在 Node.js 前做反向代理服务器是有效的。</p>
<h1 id="articleHeader1">二、缓存静态文件</h1>
<p>随着流量的增长，以 Node 为基础的服务器开始显现压力。这时，你可能想做两件事：</p>
<ol>
<li><p>使用更多的 Node.js 服务器。</p></li>
<li><p>在多个服务器间做负载均衡</p></li>
</ol>
<p>这其实很简单，NGINX 一开始就是作为反向代理服务器来实现的，这使其很容易做缓存和负载均衡等。</p>
<p>Modulus 的网站有一篇有用的文章，介绍了使用 NGINX 做 Node.js 反向代理服务器的性能提升。只使用 Node.js 时，作者的网站每秒能处理 900 个请求。 使用 NGINX 作为反向代理服务器来处理静态文件后，该网站每秒可处理超过 1600 个请求，接近两倍的性能提升。</p>
<p>下面是该网站做上述性能提升的配置代码：</p>
<p>nginx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
  listen 80;
  server_name static-test-47242.onmodulus.net;
  root /mnt/app;
  index index.html index.htm;
  location /static/ {
       try_files $uri $uri/ =404;
  }
  location /api/ {
       proxy_pass http://node-test-45750.onmodulus.net;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
  <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
  <span class="hljs-attribute">server_name</span> static-test-<span class="hljs-number">47242</span>.onmodulus.net;
  <span class="hljs-attribute">root</span> /mnt/app;
  <span class="hljs-attribute">index</span> index.html index.htm;
  <span class="hljs-attribute">location</span> /static/ {
       <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ =<span class="hljs-number">404</span>;
  }
  <span class="hljs-attribute">location</span> /api/ {
       <span class="hljs-attribute">proxy_pass</span> http://node-test-45750.onmodulus.net;
  }
}
</code></pre>
<h1 id="articleHeader2">三、实现 Node.js 负载均衡</h1>
<p>最终目标— Node.js 运行多个应用服务器，并在这些服务器之间均衡负载。</p>
<p>Node.js 实现负载均衡是比较困难的，因为 Node.js 允许浏览器端 JavaScript 和 服务器端 Node.js 通过 json 做数据交互，这就意味着同一个客户端可以反复的访问一个特定的应用服务器，而且多个应用服务器之间共享 session也是比较困难的。</p>
<p>NGINX 实现无状态负载均衡的方式：</p>
<p>Round Robin. 新的请求去列表中的下一个服务器<br> Least Connections. 新的请求去连接数最少的服务器<br> IP Hash. 根据客户端 IP 的 hash 值指定服务器<br>只有 IP Hash 这一种能够可靠的把客户端请求代理到同一台服务器的方式才能使 Node.js 应用服务器受益。</p>
<h1 id="articleHeader3">四、代理 WebSocket 连接</h1>
<p>所有版本的 HTTP 都是为客户端主动请求服务器来设计的，而 WebSocket 可以实现服务器主动向客户端的消息推送。</p>
<p>WebSocket 协议使客户端和服务器端的稳定交互更加简单，同时也提供更小的交互延迟。当你需要一个全双工的通讯，即客户端和服务器都可以在需要时主动发起消息请求，那么使用 WebSocket 就对了。</p>
<p>WebSocket 协议有健全的 JavaScript 接口，因此也原生适合用 Node.js 作为应用服务器。当连接数上升，使用 NGINX 在客户端和 Node.js 服务器端做代理来缓存静态文件和负载均衡就变得非常有意义。</p>
<h1 id="articleHeader4">五、实现 SSL/TLS 和 HTTP/2</h1>
<p>越来越多的网站使用 SSL/TLS 来保证信息交互的安全性，你也可以考虑是否要把它加入到你的网站中，但如果你决定要做，那么 NGINX 有两种方式来支持它：</p>
<ol>
<li><p>你可以使用 NGINX 做 SSL/TLS 反向代理，Node.js 服务器使用解密后的请求然后返回未加密的内容给 NGINX。</p></li>
<li><p>使用 HTTP/2 可以抵消 SSL/TLS 带来的性能开销，NGINX 支持 HTTP/2, 所以你可以同时使用 HTTP/2 和 SSL 代理请求，而你的 Node.js 服务器不需要做任何更改。</p></li>
</ol>
<p>在实现阶段你需要更新 Node.js 配置文件中的 URL, 在你的 NGINX 配置文件中使用 SPDY 或者 HTTP/2 优化连接。添加 HTTP/2 支持意味着支持 HTTP/2 的浏览器可以使用新的协议和你的应用交互，而老的浏览器继续使用 HTTP/1.x。 </p>
<p><span class="img-wrap"><img data-src="/img/bVuNbW" src="https://static.alili.tech/img/bVuNbW" alt="2" title="2" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader5">总结</h1>
<p>这篇博客描述了一些 Node.js 应用程序提升性能的主要方式，主要讲述了 NGINX 和 Node.js 混合使用的方式。通过 NGINX 作为反向代理, 你可以缓存静态文件、负载均衡、代理 WebSocket 连接、配置 SSL/TLS 和 HTTP/2 协议。</p>
<p>NGINX 和 Node.js 混合是公认的创建微型应用服务器的友好方式，也可以灵活的扩展现存的以 SOA 为基础的项目，比如 Java 或者 microsoft.NET 项目。这遍文章帮你优化你的 Node.js 应用程序，如果你使用 Node.js, 那么最好和 NGINX 搭配使用。</p>
<p>原文作者：Floyd Smith<br>翻译自 MaxLeap 团队_前端研发人员： Henry Bai<br>欢迎关注微信订阅号：从移动到云端<br><a href="https://www.nginx.com/blog/5-performance-tips-for-node-js-applications/" rel="nofollow noreferrer" target="_blank">原文链接</a><br><a href="https://blog.maxleap.cn/zh/archives/512" rel="nofollow noreferrer" target="_blank">译文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
5个提高Node.js应用性能的技巧

## 原文链接
[https://segmentfault.com/a/1190000004916646](https://segmentfault.com/a/1190000004916646)

