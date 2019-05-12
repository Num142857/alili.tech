---
title: '大型网站技术架构（3）：WEB 前端性能优化' 
date: 2019-01-31 2:31:16
hidden: true
slug: j2dh54xky1l
categories: [reprint]
---

{{< raw >}}

                    
<p>上次说到了性能优化策略，根据网站的分层架构，可以大致的分为 web 前端性能优化，应用服务器性能优化，存储服务器性能优化三大类</p>
<p>这次来说一下 web 前端性能优化，一般来说，web 前端就是应用服务器处理之前的部分，包括浏览器渲染、加载，前端视图模型，图片视频资源，<code>CDN</code> 服务等，主要优化方法就是优化浏览器访问渲染过程，使用反向代理，使用 <code>CDN</code> 服务等</p>
<hr>
<h1 id="articleHeader0">浏览器访问渲染优化</h1>
<h2 id="articleHeader1">减少 http 请求数</h2>
<p>http 协议是无状态的应用层协议，每次 http 请求都会建立新的通信链路，并且在服务端，每个 http 连接都会开启一个单独的线程去处理请求，这都会产生额外的开销</p>
<p>主要手段就是去合并压缩 css，JavaScript，图片文件，把需要的 css，JavaScript，图片资源进行合并减少建立的连接请求数</p>
<p>同时使用 http 的 <code>keep-alive</code> 来进行连接的复用，以此来减少建立的 http 连接数，提高访问性能</p>
<h2 id="articleHeader2">启用压缩</h2>
<p>在服务端进行文件的压缩，减少通信传输过程中的数据量</p>
<p>对于文本文件，压缩率能够达到 80% 以上，因此在服务端启用 gzip 压缩是一个很好的选择，但启用压缩的同时也会给服务器带来额外的开销，所以要具体情况具体分析</p>
<h2 id="articleHeader3">css，JavaScript 代码优化</h2>
<blockquote><ul>
<li>
<p><strong>css 代码优化：</strong></p>
<ul>
<li><p>尽量使用外部样式，并且放在页面顶部加载，一方面能够及时渲染，另一方面能够避免因某些样式导致阻塞渲染</p></li>
<li><p>压缩合并 css 文件，尽量精简文件，减少通信传输数据量和请求连接数</p></li>
</ul>
</li>
<li>
<p><strong>JavaScript 代码优化：</strong></p>
<ul>
<li><p>因为 JavaScript 代码边加载边解析，解析的过程会阻塞浏览器渲染，因此把 JavaScript 代码放在页面底部加载</p></li>
<li><p>同样的压缩合并 JavaScript 文件，尽量精简文件，减少通信传输数据量和请求连接数</p></li>
<li><p>写高性能的 JavaScript 代码</p></li>
</ul>
</li>
</ul></blockquote>
<h2 id="articleHeader4">使用浏览器缓存</h2>
<p>一般来说，对于网站里面不经常变化的静态资源，更新频率比较低，因此可以把这些资源缓存在浏览器中，能够很好的改善性能</p>
<p>通过设置 http 头里的 Cache-Control 和 Expires 属性来设定浏览器缓存时间</p>
<p>另外还有 Etags 和 opcode 的缓存，根据具体情况进行选择吧</p>
<hr>
<h1 id="articleHeader5">CDN 加速</h1>
<p><code>CDN</code> 的本质也属于缓存，内容分发网络，把数据缓存在里用户近的地方，使用户尽快的获取数据</p>
<p>因为 <code>CDN</code> 都是部署在网络运营商的机房，这些运营商又同时为用户提供网络服务，因此用户请求的路由会优先到达 <code>CDN</code> 服务器，如果存在请求的资源的话，就直接返回，最短路径返回响应，加速用户访问速度，同时还能够为中心机房减轻压力</p>
<p><span class="img-wrap"><img data-src="/img/bVF9KG?w=573&amp;h=428" src="https://static.alili.tech/img/bVF9KG?w=573&amp;h=428" alt="CDN 加速" title="CDN 加速" style="cursor: pointer; display: inline;"></span></p>
<p><code>CDN</code> 一般用来缓存静态资源，css，Script 脚本，静态页面，图片等，这些内容修改频率很低但是访问请求频率很高，因此放在 <code>CDN</code> 上能够很好的改善访问速度</p>
<hr>
<h1 id="articleHeader6">反向代理</h1>
<p>传统的代理服务器是当你请求不到所请求的资源时，由代理服务器帮你请求，你知道你请求的最终的服务器是谁，典型的例子就是 <code>VPN</code>，通过代理服务器来请求到墙外的世界</p>
<p>而反向代理是当你请求一个地址时，你请求的是反向代理服务器，然后由反向代理服务器去请求其他服务器来获取内容，而你不知道最终是从哪一台服务器获取到的数据</p>
<p>反向代理 web 服务器接收 http 请求，然后进行请求转发，获取到内容后返回给你，你只知道是由反向代理服务器给你的数据，而不知道数据源最终是从哪个服务器来的</p>
<p><span class="img-wrap"><img data-src="/img/bVF9KN?w=586&amp;h=338" src="https://static.alili.tech/img/bVF9KN?w=586&amp;h=338" alt="反向代理服务器" title="反向代理服务器" style="cursor: pointer; display: inline;"></span></p>
<p>反向代理服务器具有保护作用，来自互联网的请求都需要经过反向代理服务器，相当于在 web 服务器之间建立起了一道屏障</p>
<p>除了安全以外，可以在反向代理服务器上进行一些静态资源的缓存，以此来提高访问速度，减轻应用服务器的负载压力</p>
<p>当然，有些动态资源也可以缓存在代理服务器上面，比如说热门的词条，帖子，博客等，这些资源的请求量可能非常非常的大，如果每次都走一遍流程的话会造成很大的压力，同时，当这些动态内容发生改变时，会通知反向代理服务器缓存失效，代理服务器会重新缓存动态资源</p>
<p>除此之外，反向代理服务器还可以用来做负载均衡，通过负载均衡来构建服务器集群，以此来提高系统的总体处理能力，进而应用提高服务器处理高并发的能力</p>
<hr>
<p>PS：使用 <code>ajax</code> 也是提高用户体验很好的方法，不过 <code>ajax</code> 对于 <code>SEO</code> 并不友好，所以需要用到 <code>SEO</code> 的地方还是要考虑好是否要用 <code>ajax</code></p>
<hr>
<p>好了，关于 web 前端优化就写到这里，下次会继续写应用服务器性能优化，存储服务器性能优化</p>
<p><a href="https://segmentfault.com/a/1190000007390358">大型网站技术架构（1）</a><br><a href="https://segmentfault.com/a/1190000007409203" target="_blank">大型网站技术架构（2）：架构要素和高性能架构</a><br><a href="https://segmentfault.com/a/1190000007624980">大型网站技术架构（3）：WEB 前端性能优化</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
大型网站技术架构（3）：WEB 前端性能优化

## 原文链接
[https://segmentfault.com/a/1190000007624980](https://segmentfault.com/a/1190000007624980)

