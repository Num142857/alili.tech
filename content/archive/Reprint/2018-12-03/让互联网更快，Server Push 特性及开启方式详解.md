---
title: '让互联网更快，Server Push 特性及开启方式详解' 
date: 2018-12-03 2:30:08
hidden: true
slug: 60c3f5ggmgp
categories: [reprint]
---

{{< raw >}}

                    
<p>过去 Nginx 并不支持 HTTP/2 的 Server Push 特性，幸运的是 Nginx 1.13.9 已支持该特性，详情介绍请移步 <a href="https://link.zhihu.com/?target=https%3A//www.nginx.com/blog/nginx-1-13-9-http2-server-push/" rel="nofollow noreferrer">Nginx 官方博客</a>。</p>
<p><strong>Server Push 这个特性是让服务端将部分资源主动推送给客户端（浏览器），节约了客户端需要使用这些资源再次发送请求所消耗的时间</strong>。</p>
<p>又拍云在 Nginx 基础上，其全网 CDN 已支持 HTTP/2 的 Server Push 特性，成为国内首家推出 Server Push 功能的 CDN 厂商。这也是自又拍云 CDN 全网支持 TLS 1.3 以来，又一重要特性的更新。将来，我们会一如既往、不遗余力地保持新特性的更新迭代，为全网用户带来更加快速的访问体验。</p>
<p>本文将围绕以下 3 个方面来介绍 Server Push 特性：</p>
<ol>
<li>什么是 Server Push ？</li>
<li>如何使用 Server Push ？</li>
<li>如何验证 Server Push 是否生效？</li>
</ol>
<h2>什么是 Server Push</h2>
<p>Server Push 是 HTTP/2 规范中引入的一种新技术，即服务端在没有被客户端明确的询问下，抢先地 “推送” 一些网站资源给客户端（浏览器），该特性可以极大的改善页面访问效果。</p>
<p>为了更方便的理解，下文将进行对比分析：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014635025" src="https://static.alili.tech/img/remote/1460000014635025" alt="△ 未开启 HTTP/2 Server Push （图片来源：www.smashingmagazine.com）" title="△ 未开启 HTTP/2 Server Push （图片来源：www.smashingmagazine.com）"></span></p>
<p>WEB 浏览器访问 WEB 服务端遵循着请求--响应模式。也即 WEB 浏览器请求一个资源，WEB 服务器响应一个资源。以常规的网页为例，当请求一个 /index.html 后，WEB 服务端响应一个 /index.html 页面给 WEB 浏览器，此时 WEB 浏览器会去解析该 /index.html 页面，发现还需要去加载 JS、CSS、图片等资源，此时客户端会依次去请求这些资源。这无形当中影响了首屏渲染的时间，不利于页面快速加载和渲染。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014635026" src="https://static.alili.tech/img/remote/1460000014635026" alt="△ 开启 HTTP/2 Server Push （图片来源：www.smashingmagazine.com）" title="△ 开启 HTTP/2 Server Push （图片来源：www.smashingmagazine.com）"></span></p>
<p>使用 Server Push 技术之后，当 WEB 浏览器请求 /index.html 之后，WEB 服务端会直接将需要推送的资源一并发给 WEB 浏览器，而不需要 WEB 浏览器依次进行请求，这减少了 WEB 浏览器进行请求所消耗的时间。</p>
<h2>如何使用 Server Push</h2>
<p>又拍云 CDN 支持 Server Push 特性可以通过如下两种方式来实现：</p>
<p><strong>1.利用 HTTP Link 首部</strong></p>
<p>该方式在 W3C <a href="https://link.zhihu.com/?target=https%3A//www.w3.org/TR/preload/%23server-push-http-2" rel="nofollow noreferrer">Preload</a> 工作草案中有详细描述。示例为：</p>
<pre><code>Link: &lt;/static/css/style.css&gt;; rel=preload; as=style; </code></pre>
<p>其中，Link 首部中 as 是必选的，它告诉了浏览器推送的资源类型，例如 as=style 表明了推送的资源是一个样式表，除了样式表，您还可以推送其他的内容类型，详情参见<a href="https://link.zhihu.com/?target=https%3A//w3c.github.io/preload/%23link-element-interface-extensions" rel="nofollow noreferrer">支持的内容类型</a>。</p>
<p>如果需要进行多资源推送，可以进行如下设置：</p>
<pre><code>Link: &lt;/static/css/styles.css&gt;; rel=preload; as=style, &lt;/js/scripts.js&gt;; rel=preload; as=script, &lt;/img/logo.png&gt;; rel=preload; as=image</code></pre>
<p><strong>2. CDN 控制台自定义 Server Push 配置</strong></p>
<p>登陆 <a href="https://link.zhihu.com/?target=https%3A//console.upyun.com/login/" rel="nofollow noreferrer">CDN 控制台</a>，依次进入：服务管理 &gt; 功能配置 &gt; HTTPS &gt; HTTP/2 ，点击【管理】按钮即可开始配置，例如：</p>
<p>匹配路径为：</p>
<pre><code>/index.html
</code></pre>
<p>推送资源为：</p>
<pre><code>/static/123.css 
/static/456.js
</code></pre>
<p>在 CDN 控制台的配置如截图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014635027" src="https://static.alili.tech/img/remote/1460000014635027" alt="" title=""></span></p>
<p>其中【匹配路径】为必填项，【推送资源】为非必填项。</p>
<p>以上两种方式，需要注意如下事项：</p>
<ul>
<li>如果源站已经通过 Link 首部来实现服务推送，在 CDN 端的配置只需要配置【匹配路径】即可，无需配置【推送资源】选项；其中通过 Link 首部推送资源 CDN 已经默认开启。</li>
<li>如果在 CDN 端进行自定义 Server Push 推送资源配置，则优先级会高于源站设置的 Link 头部。</li>
<li>无论何种实现方式，总的（包括 Link 首部和 CDN 自定义的方式）推送资源数量不超过 8 个。</li>
</ul>
<h2>如何验证 Server Push 是否生效</h2>
<p><strong>1. 通过 Google Chrome 浏览器进行测试</strong></p>
<p>在 CDN 控制台进行了如下配置：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014635028" src="https://static.alili.tech/img/remote/1460000014635028" alt="" title=""></span></p>
<p>通过 Google Chrome 开发者工具进行抓包查看，推送的资源都被 Push 了，如截图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014635029" src="https://static.alili.tech/img/remote/1460000014635029" alt="" title=""></span></p>
<p>查看资源 /index.html 的资源响应头信息，并查看 x-upyun-h2-pushed 字段：</p>
<pre><code>age: 501691
cache-control: max-age=691200 
content-encoding: br 
content-type: text/html 
date: Thu, 19 Apr 2018 05:32:26 GMT 
etag: W/"86ef9cae8d9f9e1205b25357e78a149b" 
expires: Sat, 21 Apr 2018 10:10:55 GMT 
last-modified: Fri, 13 Apr 2018 10:10:45 GMT 
server: marco/2.1 
set-cookie: UPYUNPUSH=582825323-1696419771-1484613131-3932011035; Max-Age=7200 
status: 200 
vary: Accept-Encoding 
via: T.205.M, V.403-zj-fud-207, S.mix-sd-dst-035, T.40.M, V.mix-sd-dst-044, T.136.H, M.cun-sd-lyi1-136 
x-content-type: text/html 
x-request-id: 04dc2c7db2c509af1efc7d7252f0c2ce; 319efa6d981c0cb8dfb2b389368284f4 
x-source: U/200 
x-upyun-h2-pushed: /image/meinv1.jpg; /image/meinv2.jpg; /image/meinv3.jpg; /image/meinv4.jpg 
</code></pre>
<p>其中，x-upyun-h2-pushed 字段内容为：</p>
<pre><code>x-upyun-h2-pushed: /image/meinv1.jpg; /image/meinv2.jpg; /image/meinv3.jpg; /image/meinv4.jpg
</code></pre>
<p>也可以说明所配置的推送资源被成功 Push 了。</p>
<p><strong>2. 通过 &lt;u style="text-decoration: none; border-bottom: 1px solid rgba(68, 68, 68, 0.72);"&gt;<a href="https://link.zhihu.com/?target=http%3A//www.nghttp2.org/" rel="nofollow noreferrer">nghttp</a>&lt;/u&gt; 工具进行测试</strong></p>
<p>测试命令为：</p>
<pre><code>nghttp -ans https://server-push.upyun.club/index.html
</code></pre>
<p>测试结果如下：</p>
<pre><code>id  responseEnd requestStart  process code size request path
13   +112.01ms     +69us 111.94ms  200  167 /index.html
 8   +1.31s *   +56.96ms 1.25s  200 314K /image/meinv4.jpg
 6   +2.17s *   +56.95ms 2.11s  200 628K /image/meinv3.jpg
 4   +2.34s *   +56.94ms 2.28s  200 717K /image/meinv2.jpg
 2   +2.42s *   +56.91ms 2.36s  200 726K /image/meinv1.jpg
</code></pre>
<p>从测试结果中可以看出，被推推送的资源在 requestStart 栏左侧以星号标记了出来。</p>
<p><strong>推荐阅读：</strong></p>
<p><a href="https://link.zhihu.com/?target=https%3A//tech.upyun.com/article/227/%25E4%25B8%2580%25E6%2596%2587%25E8%25AF%25BB%25E6%2587%2582%2520HTTP%252F2%2520%25E7%2589%25B9%25E6%2580%25A7.html" rel="nofollow noreferrer">一文读懂 HTTP/2 特性</a><br><a href="https://link.zhihu.com/?target=https%3A//tech.upyun.com/article/228/%25E4%25BB%258E%25E5%25BA%2594%25E7%2594%25A8%25E5%25B1%2582%25E5%258D%258F%25E8%25AE%25AE%25E5%258D%258F%25E5%2595%2586%25E6%259C%25BA%25E5%2588%25B6%25E7%259C%258B%25EF%25BC%258C%25E6%2598%25AF%25E5%2590%25A6%25E5%25BA%2594%25E8%25AF%25A5%25E9%2580%2589%25E6%258B%25A9%25E6%2594%25AF%25E6%258C%2581%2520HTTP%252F2%2520%25E7%259A%2584%2520CDN.html" rel="nofollow noreferrer">从应用层协议协商机制看，是否应该选择支持 HTTP/2 的 CDN​</a></p>
<p><strong>参考文档：</strong></p>
<p><a href="https://link.zhihu.com/?target=https%3A//www.cloudflare.com/website-optimization/http2/serverpush/" rel="nofollow noreferrer">HTTP/2 Server Push Service | Cloudflare</a> <br><a href="https://link.zhihu.com/?target=https%3A//www.smashingmagazine.com/2017/04/guide-http2-server-push/" rel="nofollow noreferrer">A Comprehensive Guide To HTTP/2 Server Push​</a><br><a href="https://link.zhihu.com/?target=https%3A//www.nginx.com/blog/nginx-1-13-9-http2-server-push/" rel="nofollow noreferrer">Introducing HTTP/2 Server Push with NGINX 1.13.9 | NGINX​</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让互联网更快，Server Push 特性及开启方式详解

## 原文链接
[https://segmentfault.com/a/1190000014635020](https://segmentfault.com/a/1190000014635020)

