---
title: '初步整理的关于 Progressive Web Apps 的资料' 
date: 2019-02-09 2:30:59
hidden: true
slug: rj5s4pit1d
categories: [reprint]
---

{{< raw >}}

                    
<p>在 Twitter 上看到 Addy Osmani 发的视频被狂转, 开始注意<br><a href="https://twitter.com/addyosmani/status/734753297274306561" rel="nofollow noreferrer" target="_blank">https://twitter.com/addyosmani/status/734753297274306561</a><br><a href="https://speakerdeck.com/addyosmani/progressive-web-apps-across-all-frameworks" rel="nofollow noreferrer" target="_blank">https://speakerdeck.com/addyosmani/progressive-web-apps-across-all-frameworks</a><br>之前几乎对这个词语没有印象, 看到是在 IO 的演讲还以为是新技术<br>在 Youtube 上找一下, 这次好多个视频是关于 Progressive Web Apps 的<br>视频的内容主要是讲网站优化, 分别用 React, Angular, Ember 做例子<br>可惜没有 Vue, 大概要等小右补... 方案应该没有问题<br>从视频看, 优化的效果非常显著, 本来好几秒的应用能优化到一秒内.. 很夸张<br>所以仔细了解了一下怎么回事, 现在大概了解</p>
<p>视频里给的优化方案大概分成几个步骤(细节还要看视频确认):</p>
<ul>
<li><p>添加 <code>manifest.json</code> 文件, 生成 Android 主屏打开的网页加载页面</p></li>
<li><p>编写 Service Worker 脚本处理缓存, 更快读取缓存</p></li>
<li><p>服务端渲染, 用 App Shell 带来效果, 然后动态加载</p></li>
<li><p>启动过程 JavaScript 代码的性能优化</p></li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww4.sinaimg.cn/mw1024/62752320jw1f45ptnt4krj20i008wwew.jpg" src="https://static.alili.techhttp://ww4.sinaimg.cn/mw1024/62752320jw1f45ptnt4krj20i008wwew.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>虽然是新技术, 但文档可以追溯到一年前甚至一年半以前<br>Service Worker 在 2014 年底就在 HTML5 Rocks 上介绍了<br><code>manifest.json</code> 的识别功能在 Chrome 39 已经加入<br>App Shell 仅仅是模板渲染略过动态内容的一个优化<br>前两个 API 整体上是 Chrome 支持, 所以兼容性问题较大<br>那么 Google 既然在大会上推, 说明方案已经比较成熟值得深入了</p>
<h3 id="articleHeader0">Progressive Web Apps(PWA)</h3>
<p>简称 PWA 吧, 名字是从 Android Chrome 的"添加到主屏幕"开始的</p>
<p><span class="img-wrap"><img data-src="https://developers.google.com/web/updates/images/2015-03-03/add-to-home-screen.gif" src="https://static.alili.techhttps://developers.google.com/web/updates/images/2015-03-03/add-to-home-screen.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>Progressive Web Apps: Escaping Tabs Without Losing Our Soul <a href="https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/" rel="nofollow noreferrer" target="_blank">https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/</a></p></li></ul>
<p>2015 年六月份的文章, 第一次有了这个提法, 针对这类应用<br>网页应用在这样的场景下和移动应用很相似了, 可以从主屏打开<br>而且, 能快速地加载, 可以跑后台进程, 加密的连接, 离线使用等等</p>
<p><span class="img-wrap"><img data-src="https://cdn-images-1.medium.com/max/2000/1*6BUS9ahijjPrr4BfV0Oq8g.jpeg" src="https://static.alili.techhttps://cdn-images-1.medium.com/max/2000/1*6BUS9ahijjPrr4BfV0Oq8g.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>Instant Loading Web Apps With An Application Shell Architecture <a href="https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73" rel="nofollow noreferrer" target="_blank">https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73</a></p></li></ul>
<p>到了年底的时候 Addy Osmani 发了文章, 大致上已经是前面演讲的内容了<br>首先是渲染 App Shell 也就是页面的框架, 给用户更好的加载体验<br>而且可以通过 Service Worker 来做 App Shell 渲染, 去掉网络请求的时间<br>然后再动态地请求更多内容, 填充数据. 整体上看的加载速度会变快</p>
<p>2015 年底还有个 Google Developer Summit, 我以前都没注意到<br>据说大会上 PWA 已经名声很大了, Medium 上专门介绍了一下</p>
<ul>
<li><p>Chrome Developer Summit Recap <a href="https://medium.com/@davideast/chrome-developer-summit-recap-1137b022b2dc" rel="nofollow noreferrer" target="_blank">https://medium.com/@davideast/chrome-developer-summit-recap-1137b022b2dc</a></p></li>
<li><p>Getting started with Progressive Web Apps <a href="https://addyosmani.com/blog/getting-started-with-progressive-web-apps/" rel="nofollow noreferrer" target="_blank">https://addyosmani.com/blog/getting-started-with-progressive-web-apps/</a></p></li>
</ul>
<p>演讲视频的话, YouTube 上几个大会录的演讲都挺丰富的:<br><a href="https://www.youtube.com/results?search_query=progressive+web+apps" rel="nofollow noreferrer" target="_blank">https://www.youtube.com/results?search_query=progressive+web+apps</a></p>
<p>现在已经有做了不少的 PWA 的 Demo 了, 比如第一个 washingtonpost</p>
<ul>
<li><p>Washington Post <a href="https://washingtonpost.com/pwa" rel="nofollow noreferrer" target="_blank">https://washingtonpost.com/pwa</a></p></li>
<li><p>List of Progressive Web Apps Build status <a href="https://github.com/operasoftware/pwa-list" rel="nofollow noreferrer" target="_blank">https://github.com/operasoftware/pwa-list</a></p></li>
<li><p>Progressive Web Apps collection <a href="https://github.com/ljinkai/pwa-collection" rel="nofollow noreferrer" target="_blank">https://github.com/ljinkai/pwa-collection</a></p></li>
<li><p>Hacker news demo <a href="https://progressive-web-application.herokuapp.com/" rel="nofollow noreferrer" target="_blank">https://progressive-web-application.herokuapp.com/</a></p></li>
</ul>
<h3 id="articleHeader1">Web App Manifest</h3>
<p><code>manifest.json</code> 前面说了, 加进来挺久了, 主要是为了添加 Splash Screen</p>
<p><span class="img-wrap"><img data-src="https://developers.google.com/web/updates/images/2015/10/splashscreen.gif" src="https://static.alili.techhttps://developers.google.com/web/updates/images/2015/10/splashscreen.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>根据 <code>manifest.json</code> 可以自动生成一个网页(主屏幕按钮打开)的启动界面<br>这样看上去就很像一个 Native App 了, 包含图片, 文字, 背景</p>
<ul>
<li><p>Splashscreen <a href="https://developers.google.com/web/updates/2015/10/splashscreen" rel="nofollow noreferrer" target="_blank">https://developers.google.com/web/updates/2015/10/splashscreen</a></p></li>
<li><p>Add to Homescreen <a href="https://developer.chrome.com/multidevice/android/installtohomescreen" rel="nofollow noreferrer" target="_blank">https://developer.chrome.com/multidevice/android/installtohomescreen</a></p></li>
</ul>
<p>我尝试的时候主要是图片遇到了问题, <code>128dp</code> 对应最小要求 <code>192px</code><br>我当时图片太小了结果很久没显示出来, 到文档上才发现<br>详细的 <code>manifest.json</code> 内容可以在下面一些界面找到</p>
<ul>
<li><p>The W3C App Manifest specification <a href="http://html5doctor.com/web-manifest-specification/" rel="nofollow noreferrer" target="_blank">http://html5doctor.com/web-manifest-specification/</a></p></li>
<li><p>Web app manifest <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Manifest</a></p></li>
<li><p>Web App Manifest, Living Document <a href="http://manifest.sysapps.org/" rel="nofollow noreferrer" target="_blank">http://manifest.sysapps.org/</a></p></li>
<li><p>Manifest Generator <a href="http://brucelawson.github.io/manifest/" rel="nofollow noreferrer" target="_blank">http://brucelawson.github.io/manifest/</a></p></li>
<li><p>Web Manifest Validator <a href="https://manifest-validator.appspot.com/" rel="nofollow noreferrer" target="_blank">https://manifest-validator.appspot.com/</a></p></li>
</ul>
<h3 id="articleHeader2">Service Worker</h3>
<p>Service Worker 可以简单理解成跑在网络请求的拦截器<br>或者当做是 Nginx, 它可以监听页面的请求, 判断返回什么内容<br>它可以通过 <code>Cache</code> 处理本地的缓存, 也可以用 <code>fetch</code> 抓线上的资源</p>
<p><span class="img-wrap"><img data-src="http://ww3.sinaimg.cn/mw1024/62752320jw1f45s6ixcomj20zy0kan3l.jpg" src="https://static.alili.techhttp://ww3.sinaimg.cn/mw1024/62752320jw1f45s6ixcomj20zy0kan3l.jpg" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="http://image.slidesharecdn.com/devoxxfr16-progressive-web-apps-forpeliere-cbalit-160421091441/95/devoxx-fr-2016-progressive-web-apps-par-florian-orpelire-cyril-balit-47-638.jpg?cb=1461245212" src="https://static.alili.techhttp://image.slidesharecdn.com/devoxxfr16-progressive-web-apps-forpeliere-cbalit-160421091441/95/devoxx-fr-2016-progressive-web-apps-par-florian-orpelire-cyril-balit-47-638.jpg?cb=1461245212" alt="" title="" style="cursor: pointer;"></span></p>
<p>另外演讲视频还有介绍处理消息推送功能, 类似离线收发消息, 还没细看.<br>关于 API 使用需要深入看文档, 已经有很详细的介绍了:</p>
<ul>
<li><p>[译]我的第一个 Service Worker <a href="http://www.w3ctech.com/topic/1593" rel="nofollow noreferrer" target="_blank">http://www.w3ctech.com/topic/1593</a></p></li>
<li><p>Introduction to Service Worker <a href="http://www.html5rocks.com/en/tutorials/service-worker/introduction/" rel="nofollow noreferrer" target="_blank">http://www.html5rocks.com/en/tutorials/service-worker/introduction/</a></p></li>
<li><p>The offline cookbook <a href="https://jakearchibald.com/2014/offline-cookbook/" rel="nofollow noreferrer" target="_blank">https://jakearchibald.com/2014/offline-cookbook/</a></p></li>
</ul>
<p>Google 提供了一些类库, 能实现 Express.js 风格的简化写法:</p>
<ul>
<li><p>sw-precache <a href="https://github.com/GoogleChrome/sw-precache/" rel="nofollow noreferrer" target="_blank">https://github.com/GoogleChrome/sw-precache/</a></p></li>
<li><p>sw-toolbox <a href="https://github.com/GoogleChrome/sw-toolbox" rel="nofollow noreferrer" target="_blank">https://github.com/GoogleChrome/sw-toolbox</a></p></li>
</ul>
<p>具体的浏览器兼容性可以看:</p>
<ul>
<li><p>is service worker ready? <a href="https://jakearchibald.github.io/isserviceworkerready/" rel="nofollow noreferrer" target="_blank">https://jakearchibald.github.io/isserviceworkerready/</a></p></li>
<li><p>can I use <a href="http://caniuse.com/#feat=serviceworkers" rel="nofollow noreferrer" target="_blank">http://caniuse.com/#feat=serviceworkers</a></p></li>
</ul>
<p><span class="img-wrap"><img data-src="http://ww4.sinaimg.cn/mw1024/62752320gw1f45rdb99vij20qn0iq79i.jpg" src="https://static.alili.techhttp://ww4.sinaimg.cn/mw1024/62752320gw1f45rdb99vij20qn0iq79i.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>关于调试, Google Chrome 试验版本已经更新了 Application Tab<br>其中 Service Worker 被放到了显眼的位置, 不过, 功能多了还是挺复杂的<br>另外下面这些链接会有帮助:</p>
<ul>
<li><p>Service Worker Debugging <a href="https://www.chromium.org/blink/serviceworker/service-worker-faq" rel="nofollow noreferrer" target="_blank">https://www.chromium.org/blink/serviceworker/service-worker-faq</a></p></li>
<li><p>chrome://inspect/#service-workers</p></li>
<li><p>chrome://serviceworker-internals</p></li>
</ul>
<h3 id="articleHeader3">其他</h3>
<p>另外了解和尝试 Demo 的时候我也想到一些跟自己项目比较相关的内容</p>
<h5>React Native 对比</h5>
<p>很 RN 一样这套方案能让网页应用在效果上更接近原生应用<br>PWA 主要是处理应用加载部分, 让应用能离线打开, 启动过程跟 App 一样变快<br>因此原来寄托在 RN 的功能已经能做到了, 离线, App 启动界面<br>我正在考虑把我以前某个 Demo 重写, 看下能有多像 App 的体验</p>
<h5>React 相关的尝试</h5>
<p>从前简聊优化应用启动用过本地存储整个 Store 数据的办法<br>普通页面 App Shell 不错了, 而 React 应该能做整个页面放 Service Worker<br>或者说, Store 放进 Service Worker 里, Virtual DOM 也放进去<br>那么网页主线程其实只有 DOM 操作部分的代码, 可能启动速度能提升非常大<br>而且 React 已经有把 DOM Diff 放进 Worker 的尝试, 还可以延伸下</p>
<p>整个这样想, 对 React 应用的整体架构改变将会挺大的<br>而 Angular, Vue 之类的框架应该也会做类似的架构调整</p>
<h5>Service Worker 代码打包问题</h5>
<p>文档里的 Demo 对应的 <code>sw.js</code> 代码都是的直接用链接加载的<br>我们搭配 CDN 使用当有打包以及 revision 方便的考虑<br>这就要求打包工具要对 service worker 的语法做良好的支持<br>Webpack 有看到相关的 PR 提交对应的功能, 其他工具不了解:<br><a href="https://github.com/webpack/worker-loader/pull/14" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/worker-loader/pull/14</a></p>
<p>项目代码引用<code> sw.js</code> 的写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.serviceWorker.register('/sw.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">navigator.serviceWorker.register(<span class="hljs-string">'/sw.js'</span>)</code></pre>
<p><code>sw.js</code> 内部再引入其他代码的写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="importScripts('serviceworker-cache-polyfill.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">importScripts(<span class="hljs-string">'serviceworker-cache-polyfill.js'</span>);</code></pre>
<p>可能的话还需要把 CommonJS ES6 模块打包进去, 会挺复杂的<br>以及局部更新, 热替换之类的开发环境的打包方案改进等等</p>
<h5>HTTPS</h5>
<p>有点意外, 似乎之前 iOS 有做过强制 HTTPS? 我第一次遇到<br>Service Worker 运行要求网站是 HTTPS 或者 localhost<br>这样的话本地开发, Android 上做 remote debugging 会有些不便<br>我找的办法是直接在本地 Nginx 配置不安全的证书来方便开发的:<br><a href="https://serversforhackers.com/video/self-signed-ssl-certificates-for-development" rel="nofollow noreferrer" target="_blank">https://serversforhackers.com/video/self-signed-ssl-certificates-for-development</a><br>比较直接的办法当然是找个有域名的服务器然后用 HTTPS 开发</p>
<p><a href="https://twitter.com/fraserxu" rel="nofollow noreferrer" target="_blank">fraserxu</a>教了我一招, 回头试试, 可以用 <a href="https://ngrok.com/" rel="nofollow noreferrer" target="_blank">https://ngrok.com/</a><br>把本地的端口监听转化成一个在线的 HTTPS 地址...</p>
<h3 id="articleHeader4">小结</h3>
<p>考虑缓存处理上带来的速度提升, 我对 PWA 整套方案很看好<br>而且之前的 HTML5 应用缓存来说, PWA 的自由度和体验都改进了很多<br>所以会逐渐开始考虑现实往这方面做迁移的思路:</p>
<ul>
<li><p>兼容性: 目前主要 Safari 不支持, 而 Chrome 方面已经比较成熟, 国产浏览器就...</p></li>
<li><p>工具链: 调试工具已经不错, 打包和局部更新还要等待技术支持</p></li>
<li><p>缓存方案: API 和语法糖都有了, 虽然代码比较啰嗦但是抄代码可以比较快</p></li>
<li><p>动态数据方案: 动态的数据怎么抓取和推送, 还不大了解, 不过 Google 有演示过一些</p></li>
</ul>
<p>做到这些基本上已经可以对页面的加载过程做不小的优化了<br>等待出更多的 Demo 以及大网站公布试验的数据如何...</p>
<p>未来的更多代码被放进 Service Worker 之后, 带来的改变会更大一些<br>最后贴一张图片膜拜一下前端的复杂度:</p>
<p><span class="img-wrap"><img data-src="http://ww2.sinaimg.cn/mw1024/62752320jw1f3qq6aw9bkj20sg0e80tv.jpg" src="https://static.alili.techhttp://ww2.sinaimg.cn/mw1024/62752320jw1f3qq6aw9bkj20sg0e80tv.jpg" alt="" title="" style="cursor: pointer;"></span><br><a href="https://twitter.com/sstephenson/status/730039913052176384" rel="nofollow noreferrer" target="_blank">https://twitter.com/sstephenson/status/730039913052176384</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初步整理的关于 Progressive Web Apps 的资料

## 原文链接
[https://segmentfault.com/a/1190000005346689](https://segmentfault.com/a/1190000005346689)

