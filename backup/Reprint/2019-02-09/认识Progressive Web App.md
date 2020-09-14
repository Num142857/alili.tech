---
title: '认识Progressive Web App' 
date: 2019-02-09 2:30:59
hidden: true
slug: v8tqaky8zd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>个人很少看视频学习新技术，觉得和读文档比起来看视频太浪费时间了。但是最近在看google I/O 2016的时候，发现介绍Progressive Web Apps的一段<a href="https://www.youtube.com/watch?v=cmGr0RszHc8" rel="nofollow noreferrer" target="_blank">视频</a>很不错。近50分钟的内容，深入浅出，为了方便分享和以后回顾，决定将其内容整理成文章。</p></blockquote>
<h2 id="articleHeader0">什么是Progressive Web App(PWA)</h2>
<p>字面上就是先进的web app。下面是官方<a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer" target="_blank">解释</a>：</p>
<blockquote><p>Progressive Web Applications take advantage of new technologies to bring the best of mobile sites and native applications to users. They're reliable, fast, and engaging.</p></blockquote>
<p>Chrome在PC上有Chrome App，感觉PWA和这个有些类似：在桌面上的，能独立运行的web app。但PWA不仅如此，先看看效果对比图：</p>
<p><span class="img-wrap"><img data-src="/img/bVxONb" src="https://static.alili.tech/img/bVxONb" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到，显著的不一样，在offline情况下，PWA依然能够渲染界面，读取历史数据。另外，和目前的add to home screen不一样的是，这里已经不是简单的在桌面上添加一个网页的快捷方式，而更像一个webview包装的app，提供了加载过场页面，并且地址栏也没有了。</p>
<p>那它到底提供些什么样的新技术让PWA和原生的媲美呢？答案是使用Offline First开发模式和Service Worker技术，优化了web app的体验。</p>
<h2 id="articleHeader1">Service Worker</h2>
<p>就像曾经的Web Worker一样，这是一个新的浏览器特性，它的解释如下：</p>
<blockquote><p>Service workers essentially act as proxy servers that sit between web applications, and the browser and network (when available). They are intended to (amongst other things) enable the creation of effective offline experiences, intercepting network requests and taking appropriate action based on whether the network is available and updated assets reside on the server. They will also allow access to push notifications and background sync APIs.</p></blockquote>
<p>简单来说它就是个代理，在网络和浏览器之间，以事件的方式让开发者介入，来实现资源和数据的控制。</p>
<h3 id="articleHeader2">开始使用</h3>
<p>和Web Worker类似的，Service Worker中的逻辑需要单独放在一个JS文件中，然后在当前页面通过其URL进行创建。<br><span class="img-wrap"><img data-src="/img/bVxOJb" src="https://static.alili.tech/img/bVxOJb" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当register之后，你的service worker脚本将经历download, install and activate过程，接着就进入和它的事件驱动阶段。</p>
<p>Chrome调试工具中也添加有Service Worker相关的选项：<br><span class="img-wrap"><img data-src="/img/bVxOOA" src="https://static.alili.tech/img/bVxOOA" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">事件驱动</h3>
<p>在视频中简单涉及到了以下事件：</p>
<ul>
<li><p>install: 当被下载的worker文件是新的时候（第一次下载，或者和老的worker内容不一样），会进行安装，触发install事件</p></li>
<li><p>activate: 在worker安装之后，并且如果没有老的worker，或者老的worker已经没有页面在使用它的时候，就会激活新的worker</p></li>
<li><p>fetch: 任何浏览器发送请求时都是触发fetch事件，例如下载html页面，js文件，css或者font等，当然还有ajax请求</p></li>
</ul>
<p>更多事件请参考<a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p>例如，在fetch事件中拦截所有的请求，设置response为Hello：<br><span class="img-wrap"><img data-src="/img/bVxOJf" src="https://static.alili.tech/img/bVxOJf" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVxOPf" src="https://static.alili.tech/img/bVxOPf" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>或者说是，拦截404，显示为一个特定的画面：<br><span class="img-wrap"><img data-src="/img/bVxOPn" src="https://static.alili.tech/img/bVxOPn" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVxOPp" src="https://static.alili.tech/img/bVxOPp" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>再看下面这个更有意义一点的例子：<br><span class="img-wrap"><img data-src="/img/bVxOPU" src="https://static.alili.tech/img/bVxOPU" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000006784836" src="https://static.alili.tech/img/remote/1460000006784836" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里在install的时候，将offline的提示页面和它的css文件缓存在cache中（如果缓存满了或者其他原因导致放入缓存失败，那么这个worker将不会被install，之后也就不会控制页面）。然后在之后的fetch中，进行请求拦截：</p>
<ol>
<li><p>如果请求在cache中，返回cache中的response，否则通过网络去fetch这个request的response</p></li>
<li><p>如果一个navigate类型的request（HTML跳转的请求）fetch失败，即offline，那么去缓存中读取我们的offline提示页面作为response</p></li>
</ol>
<p>类似的，我们可以将app的页面做成一个壳，数据去由javascript去填充，这样的话，我们就可以通过service worker将页面缓存起来，打开app的时候从本地缓存中读取渲染页面，然后通过网络去请求数据。这个过程，基本就和native app一直了。（这里太适合那些MVVM的框架了！）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005641761" src="https://static.alili.tech/img/remote/1460000005641761" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">后台同步</h3>
<p>在视频的最后，还展示了一个background sync的功能，这个功能很强大（sync也是Service Worker的一个事件）。其展示的例子效果类似于，在微信上发送信息，就算没有网络，发送信息在页面上的操作都能完成，但由于网络原因不能够真正的发送出去。那这时候如果网络信号恢复了，就算页面关掉，这些被信息会在后台被发送出去。</p>
<p><span class="img-wrap"><img data-src="/img/bVxPO6" src="https://static.alili.tech/img/bVxPO6" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">其他</h2>
<h3 id="articleHeader6">添加到桌面</h3>
<p>有了上面的页面离线机制，我们像native靠近了一步，但是还不够。下面的内容则针对app打开的过程，进行优化和靠近native。</p>
<p>通过manifest文件进行配置，能配置：</p>
<ol>
<li><p>桌面图片，桌面显示名称</p></li>
<li><p>打开app时的过场页面中的的图标，名称，背景色</p></li>
<li><p>打开app后的初始化URL（这里的URL和在你add to home screen时的URL可以不一样）</p></li>
<li><p>等等</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVxO35" src="https://static.alili.tech/img/bVxO35" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVxO4a" src="https://static.alili.tech/img/bVxO4a" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>通过上面的配置，我们的PWA就能想native app一样打开，并且在无论有网络，没有网络或者网络环境很差的情况下，都再也看不到那让人厌烦的，只能看着地址栏不断加载的空白页面。</p>
<h3 id="articleHeader7">前端存储</h3>
<p>可以通过浏览器端的DB存储app的一些历史数据，比如聊天记录，然后在Service Worker中给对应的数据请求进行来接，那么在下次打开时，就算没有网络，在页面从缓冲中渲染之后，也能够从DB中读取一部分历史数据。这样一来，这真的native app就没有区别了。</p>
<h3 id="articleHeader8">兼容性</h3>
<p>目前基本只有chrome支持。<br><span class="img-wrap"><img data-src="/img/bVxO34" src="https://static.alili.tech/img/bVxO34" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
认识Progressive Web App

## 原文链接
[https://segmentfault.com/a/1190000005641692](https://segmentfault.com/a/1190000005641692)

