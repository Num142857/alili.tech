---
title: 'vue音乐APP使用jsonp和反向代理抓取QQ音乐歌单列表数据的区别' 
date: 2018-12-15 2:30:11
hidden: true
slug: esr1zkdyukj
categories: [reprint]
---

{{< raw >}}

                    
<p>我是初学者，有什么错误的请大家指教！<br>最近在看vue音乐APP视频学习的时候发现老师文件目录结构和我不一样，因为webpack版本更新了可能，老师配置跨域接口的文件我没有，后来我用以前搭建的一个项目里反向代理的方法实现了跨域。我的build目录结构如下</p>
<p><span class="img-wrap"><img data-src="/img/bV21as?w=196&amp;h=318" src="https://static.alili.tech/img/bV21as?w=196&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个index.js文件里面找到ProxyTable配置</p>
<p><span class="img-wrap"><img data-src="/img/bV21aB?w=698&amp;h=387" src="https://static.alili.tech/img/bV21aB?w=698&amp;h=387" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再回到这个文件</p>
<p><span class="img-wrap"><img data-src="/img/bV21aP?w=202&amp;h=119" src="https://static.alili.tech/img/bV21aP?w=202&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>配置如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV21aV?w=469&amp;h=466" src="https://static.alili.tech/img/bV21aV?w=469&amp;h=466" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>记住params这个名字千万不能写错，我因为把它写成了param，导致请求参数都没有传过去，找问题的能力太差，最终在header里面发现了，回想起教程视频里老师提醒过这个。</p>
<p>（大家很容易查到：json和jsonp的区别，json是一种格式，jsonp是一种请求跨域资源的方式。这里就不做详细解释了。）</p>
<p>跨域：是指浏览器不能执行其他网站的脚本，它是由浏览器的同源策略造成的，是浏览器施加的安全限制。在跨域情况下，XMLHTTPRequest是不能发送异步请求的。<br>所谓同源是指域名、协议、端口均相同。</p>
<p>那么，同是跨域方法，为什么轮播图的请求可以用jsonp的方式，而歌单的请求要使用反向代理，两个都是跨域方法。</p>
<p>比较两个请求jsonp和proxyTable反向代理的异同：</p>
<p>jsonp原理：&lt;script&gt;标签里的src是没有跨域限制的，&lt;img&gt;标签里的src也是没有限制的，我们书写网页的过程中不难发现这一点。jsonp就是通过在本站脚本创建一个&lt;script&gt;便签，将地址指向第三方的API地址来达到第三方通讯的目的，并提供一个回调函数来接收数据，第三方响应为json数据的包装，这个是jsonp名字的由来（json padding）<br>jsonp的局限性：只支持GET方式的HTTP请求，不能解决不同域的两个页面之间如何进行JavaScript调用的问题</p>
<p>反向代理：本方法是在自己的浏览器创建一个服务器，然后让自己的服务器去请求目标服务器。而且跨域是针对JavaScript来说的，JavaScript 是插入HTML页面后在浏览器上执行的脚本。服务器之间是可以随便请求数据而不受限制的。我们通过自己创建的服务器去请求目标服务器，然后在从我们客户端去请求我们自己创建的服务器，这就不存在跨域了。</p>
<p>歌单URL：<a href="https://y.qq.com/portal/playlist.html" rel="nofollow noreferrer" target="_blank">https://y.qq.com/portal/playl...</a><br>请求头</p>
<p><span class="img-wrap"><img data-src="/img/bV28cu?w=717&amp;h=258" src="https://static.alili.tech/img/bV28cu?w=717&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>轮播图URL：<a href="https://m.y.qq.com/" rel="nofollow noreferrer" target="_blank">https://m.y.qq.com/</a><br>请求头</p>
<p><span class="img-wrap"><img data-src="/img/bV28fm?w=654&amp;h=310" src="https://static.alili.tech/img/bV28fm?w=654&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在HTTP请求头里referer是代表这个请求是请哪个URL过来的<br>origin是在HTML5中跨域操作所引入的，当一个链接或者XMLHttpRequest去请求跨域操作，浏览器事实上的确向目标服务器发起了连接请求，并且携带这origin<br>host在视频里存在歌单的请求头里，但是现在发现没出现，可能隐藏了，但是我在反向代理ProxyTable里设置了这个参数是同样可以请求成功的。这个参数表示了客户端指定了自己想访问的服务器地址，只要我们使用反向代理向改服务器发送相同的请求头，就可以成功抓取数据到数据，因为目标服务器无法区分是否来自它本身服务器发送的请求。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue音乐APP使用jsonp和反向代理抓取QQ音乐歌单列表数据的区别

## 原文链接
[https://segmentfault.com/a/1190000013073545](https://segmentfault.com/a/1190000013073545)

