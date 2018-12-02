---
title: 'PWA介绍及快速上手搭建一个PWA应用' 
date: 2018-12-03 2:30:08
hidden: true
slug: 9roazjmgg1b
categories: [reprint]
---

{{< raw >}}

                    
<h1>PWA初次体验</h1>
<blockquote>​    前言：本示例不用安装任何东西<p>部分资源来自网络资源及PWA官网，不要把PWA想象的太复杂，跟着示例走一下，你行的。</p>
</blockquote>
<h2>PWA介绍</h2>
<p>一个新的前端技术，PWA（ 全称：Progressive Web App ）也就是说这是个渐进式的网页应用程序。</p>
<p>官网：<a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer">https://developers.google.com...</a> </p>
<p>是 Google 在 2015 年提出，2016年6月才推广的项目。是结合了一系列现代Web技术的组合，在网页应用中实现和原生应用相近的用户体验。</p>
<p>官网上给出 PWA 的宣传是 ： <strong>Reliable</strong> （ 可靠的 ）、<strong>Fast</strong>（ 快速的 ）、<strong>Engaging</strong>（ 可参与的 ）</p>
<p><strong>Reliable</strong> ：当用户从手机主屏幕启动时，不用考虑网络的状态是如何，都可以立刻加载出 PWA。</p>
<p><strong>Fast</strong>：这一点应该都很熟悉了吧，站在用户的角度来考虑，如果一个网页加载速度有点长的话，那么我们会放弃浏览该网站，所以 PWA 在这一点上做的很好，他的加载速度是很快的。</p>
<p><strong>Engaging</strong> ： PWA 可以添加在用户的主屏幕上，不用从应用商店进行下载，他们通过网络应用程序 Manifest file 提供类似于 APP 的使用体验（ 在 Android 上可以设置全屏显示哦，由于 Safari 支持度的问题，所以在 IOS 上并不可以 ），并且还能进行 ”推送通知” 。</p>
<h2>PWA关键技术</h2>
<ul>
<li>
<strong>Service Worker</strong> （可以理解为服务工厂）</li>
<li>
<strong>Manifest</strong> （应用清单）</li>
<li>
<strong>Push Notification</strong>（推送通知）</li>
</ul>
<h3>Service Worker</h3>
<p>以下用SW来表示</p>
<p>SW 是什么呢？这个是离线缓存文件。我们 PWA 技术使用的就是它！SW 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门，因为使用了它，才会有的那个 Reliable 特性吧，SW 作用于 浏览器于服务器之间，相当于一个代理服务器。</p>
<p><strong>浏览器支持</strong></p>
<p>顺便带一句：目前只能在 HTTPS 环境下才能使用SW，因为SW 的权利比较大，能够直接截取和返回用户的请求，所以要考虑一下安全性问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639478?w=2048&amp;h=498" src="https://static.alili.tech/img/remote/1460000014639478?w=2048&amp;h=498" alt="" title=""></span></p>
<p><strong>事件机制</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639479?w=598&amp;h=164" src="https://static.alili.tech/img/remote/1460000014639479?w=598&amp;h=164" alt="" title=""></span></p>
<p><strong>功能</strong>(还是比较逆天的)</p>
<ul>
<li>后台数据的同步</li>
<li>从其他域获取资源请求</li>
<li>接受计算密集型数据的更新，多页面共享该数据</li>
<li>客户端编译与依赖管理</li>
<li>后端服务的hook机制</li>
<li>根据URL模式，自定义模板</li>
<li>性能优化</li>
<li>消息推送</li>
<li>定时默认更新</li>
<li>地理围栏</li>
</ul>
<p><strong>生命周期</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639480?w=772&amp;h=232" src="https://static.alili.tech/img/remote/1460000014639480?w=772&amp;h=232" alt="" title=""></span></p>
<ul>
<li>Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。</li>
<li>Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。</li>
<li>Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。</li>
<li>Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：<p>当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker</p>
</li>
<li>Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。</li>
<li>Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看</li>
</ul>
<p>一个很不错的全面介绍sw的教程：<a href="https://www.villainhr.com/page/2017/01/08/Service%20Worker%20%E5%85%A8%E9%9D%A2%E8%BF%9B%E9%98%B6" rel="nofollow noreferrer">https://www.villainhr.com/page/2017/01/08/Service%20Worker%20%E5%85%A8%E9%9D%A2%E8%BF%9B%E9%98%B6</a></p>
<h3>Manifest</h3>
<p>Web App Manifest 是一个 W3C 规范，它定义了一个基于 JSON 的 List 。Manifest 在 PWA 中的作用有：</p>
<p>​                  能够将你浏览的网页添加到你的手机屏幕上</p>
<p>​                  在 Android 上能够全屏启动，不显示地址栏 （ 由于 Iphone 手机的浏览器是 Safari ，所以不支持哦）</p>
<p>​                  控制屏幕 横屏 / 竖屏 展示</p>
<p>​                  定义启动画面</p>
<p>​                  可以设置你的应用启动是从主屏幕启动还是从 URL 启动</p>
<p>​                  可以设置你添加屏幕上的应用程序图标、名字、图标大小</p>
<h3>Push Notification</h3>
<p>Push 和 Notification 是两个不同的功能，涉及到两个 API 。</p>
<p>​    Notification 是浏览器发出的通知消息。</p>
<p>​    Push 和 Notification 的关系，Push：服务器端将更新的信息传递给 SW ，Notification： SW 将更新的信息推送给用户。</p>
<h2>PWA示例</h2>
<p><strong>准备</strong></p>
<p>我们先创建一个关于 PWA 的项目文件夹，</p>
<p>进入文件夹下我们准备一张 120x120的图片一张，作为我们的应用程序图标。</p>
<p>创建一个 index.html  文件</p>
<p>创建一个 main.css 文件</p>
<p>创建一个 manifest.json 文件</p>
<p>创建一个 sw.js 文件</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639481?w=340&amp;h=143" src="https://static.alili.tech/img/remote/1460000014639481?w=340&amp;h=143" alt="" title=""></span></p>
<p><strong>index.html</strong></p>
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Hello PWA&lt;/title&gt;
  &lt;meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"&gt;
  &lt;link rel="stylesheet" href="main.css"&gt;
  &lt;link rel="manifest" href="manifest.json"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h3&gt;Hello PWA&lt;/h3&gt;
&lt;/body&gt;
&lt;script&gt;
  // 检测浏览器是否支持SW
  if(navigator.serviceWorker != null){
    navigator.serviceWorker.register('sw.js')
    .then(function(registartion){
      console.log('支持sw:',registartion.scope)
    })
  }
&lt;/script&gt;
&lt;/html&gt;</code></pre>
<p><strong>main.css</strong></p>
<pre><code class="css">h3{
  color: #f00;
}</code></pre>
<p><strong>manifest.json</strong></p>
<p>short_name: “ " 用户主屏幕上的应用名字</p>
<p>display : “standalone"  设置启动样式，让您的网络应用隐藏浏览器的 URL 地址栏</p>
<p>start_url : “/“ 设置启动网址，如果不提供的话，默认是使用当前页面</p>
<p>theme_color : “ “  用来告知浏览器用什么颜色来为地址栏等 UI 元素着色</p>
<p>background_color: “ ” 设置启动页面的背景颜色</p>
<p>icons：””  就是添加到主屏幕之后的图标</p>
<pre><code class="json">{
  "name": "一个PWA示例",
  "short_name": "PWA示例",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "#3eaf7c",
  "icons": [
    {
      "src": "/youhun.jpg",
      "sizes": "120x120",
      "type": "image/png"
    }
  ],
}
</code></pre>
<p><strong>sw.js</strong></p>
<p>看网上很多人都安装的hs和ngrok去调试，在这里为了照顾新手我是直接引用的sw</p>
<p>处理静态缓存，首先定义需要缓存的路径，以及需要缓存的静态文件的列表。</p>
<p>借助 SW 注册完成安装 SW 时，抓取资源写入缓存中。使用了一个方法那就是 self.skipWaiting( ) ，为了在页面更新的过程当中，新的 SW 脚本能够立刻激活和生效。</p>
<pre><code class="javascript">importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-1'
var cacheList=[
  '/',
  'index.html',
  'main.css',
  'youhun.jpg'
]
self.addEventListener('install',e =&gt;{
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache =&gt; cache.addAll(cacheList))
    .then(() =&gt; self.skipWaiting())
  )
})</code></pre>
<p>处理动态缓存，我们监听 fetch 事件，在 caches 中去 match 事件的 request ，如果 response 不为空的话就返回 response ，最后返回 fetch 请求，在 fetch 事件中我们可以手动生成 response 返回给页面。</p>
<p>更新静态资源，缓存的资源会跟随着版本的更新会过期的，所以会根据缓存的字符串名称清除旧缓存。在新安装的 SW 中通过调用 self.clients.claim( ) 取得页面的控制权，这样之后打开页面都会使用版本更新的缓存。旧的 SW 脚本不在控制着页面之后会被停止，也就是会进入 Redundant 期。</p>
<pre><code class="javascript">self.addEventListener('fetch',function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      if(response != null){
        return response
      }
      return fetch(e.request.url)
    })
  )
})
self.addEventListener('activate',function(e){
  e.waitUntil(
    //获取所有cache名称
    caches.keys().then(cacheNames =&gt; {
      return Promise.all(
        // 获取所有不同于当前版本名称cache下的内容
        cacheNames.filter(cacheNames =&gt; {
          return cacheNames !== cacheStorageKey
        }).map(cacheNames =&gt; {
          return caches.delete(cacheNames)
        })
      )
    }).then(() =&gt; {
      return self.clients.claim()
    })
  )
})</code></pre>
<p><strong>部署</strong></p>
<p>我们可以把当前pwa目录的所有内容都扔进服务器中，或者coding Pages和gitHub Pages也是可以的，当然，记得开启https。在上变介绍过SW的权利比较大，为了安全性，我们使用https协议来访问。</p>
<p>试着访问一下，我们这里用的coding Pages并且绑定了自己的域名</p>
<p>打开 chrom 的调试工具，打开 application ，点击 service workers 之后我们会发现 sw.js 脚本已经存到了 SW 中 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639482?w=1617&amp;h=863" src="https://static.alili.tech/img/remote/1460000014639482?w=1617&amp;h=863" alt="" title=""></span></p>
<p>我们打开 Network 刷新页面一下，看看，我们的页面资源来自 SW 而不是其他的地方，在 Console 中也打印出了我们在 index.html 中判断的语句，浏览器支持就会打印出这一句话。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639483?w=1032&amp;h=368" src="https://static.alili.tech/img/remote/1460000014639483?w=1032&amp;h=368" alt="" title=""></span></p>
<p>接下来我们断网操作，在 Application 中给 Offline 打上对勾就行啦。然后刷新页面，我们仍然能看到之前的页面，原因就是我们在上图看到，他的资源是从 SW 上获得到的。当我们第一次打开这个页面的时候，Resopnse 对象被存到了 Cache Storage （ 定义在 SW 规范中 ，相关资料请同学们自行查询啦 ）中，我们看下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639484?w=827&amp;h=461" src="https://static.alili.tech/img/remote/1460000014639484?w=827&amp;h=461" alt="" title=""></span></p>
<p>通过存放到 Cache Storage 中，我们下次访问的时候如果是弱网或者断网的情况下，就可以不走网络请求，而直接就能将本地缓存的内容展示给用户，优化用户的弱网及断网体验。</p>
<p>这个时候肯定会有同学在想，如果内容更新了，那么页面展示的内容是新内容呢还是旧内容呢？下面我们操作一下，打开 index.html 文件，我们在 body 中添加一个 p 标签 ，然后回到页面刷新。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639485?w=713&amp;h=258" src="https://static.alili.tech/img/remote/1460000014639485?w=713&amp;h=258" alt="" title=""></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639486?w=1731&amp;h=715" src="https://static.alili.tech/img/remote/1460000014639486?w=1731&amp;h=715" alt="" title=""></span></p>
<p>我们看到，页面上的内容并没有显示出我刚刚添加的那个 p 标签。这说明了，我们拿到的数据还是从 Cache Storage 中获取到的，Cache Storage中的内容并没有更新，强制刷新也不行哦，那么我们怎么才能让我刚刚添加的那个 p 标签显示出来呢。</p>
<p>我们打开 sw.js 脚本文件，我们修改一下 cacheStorageKey。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639487?w=765&amp;h=330" src="https://static.alili.tech/img/remote/1460000014639487?w=765&amp;h=330" alt="" title=""></span></p>
<p>修改后，我们再次打开该网址，强制刷新下或者关掉浏览器重新打开。</p>
<p>页面中出现了刚刚添加的P标签，我们再看一下 Cache Storage 中的缓存名字，已经被修改。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014639488?w=1473&amp;h=548" src="https://static.alili.tech/img/remote/1460000014639488?w=1473&amp;h=548" alt="" title=""></span></p>
<h2>总结</h2>
<p>如果是使用coding或者gitHub提供的pages服务，则需要注意最好绑定下独立域名。如果不绑定则注意下文件请求路径即可。</p>
<p>研究PWA门槛不低，部署的服务器要求HTTPS，ServiceWorker涉及API众多，需要单独学习，另外npm中也已经有这个包了<a href="https://www.npmjs.com/package/web-pwa" rel="nofollow noreferrer">https://www.npmjs.com/package...</a> ，玩玩可以，真正部署到项目生产环境可能坑很多，但有坑填坑，不折腾还叫前端么。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PWA介绍及快速上手搭建一个PWA应用

## 原文链接
[https://segmentfault.com/a/1190000014639473](https://segmentfault.com/a/1190000014639473)

