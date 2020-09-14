---
title: '为什么说“渐进Web应用 vs. 原生应用” 是个错误的话题' 
date: 2019-01-25 2:30:23
hidden: true
slug: 39z4co4rxay
categories: [reprint]
---

{{< raw >}}

            <p><em>Updated December 2017</em></p>
<p>尽管 <a href="https://developers.google.com/web/progressive-web-apps/">PWAs</a>（Progressive-Web-Apps，渐进Web应用）问世已经两年多了, 但人们对它仍存在一些误解，比如：它们只能在Chrome中运行，不像原生应用那样流畅，没有全屏模式，它必须是SPA（单页应用），建立离线优先是不值得的，等等。</p>
<p>这些说法都不对，并且我希望媒体允许使用删除线文本，来强调我的要点。</p>
<p>PWAs是一个十分成熟的技术，像Twitter和<a href="https://developers.google.com/web/showcase/2016/alibaba">AliBaba</a>这样的大玩家已经取得了巨大的成功。</p>
<p>此外，PWAs实际上提供了比我们想象的要多的硬件访问能力。这里有一个关于截止到2016年9月（Chrome在此时间增加了蓝牙支持）“<a href="http://whatwebcando.today/">如今我们能做什么</a>”（他本身是个PWAs，快试试看吧）的截图，来自我的Android版Chrome 52稳定版。</p>
<p><img src="http://p0.qhimg.com/t0183687c7926cea93d.png" alt=""></p>
<h3>硬件访问包括：</h3>
<ul>
<li><p><a href="http://caniuse.com/#feat=geolocation">地理位置</a> —— 在绝大多数浏览器中都支持</p>
</li>
<li><p>摄像头和麦克风, 通过调用 <a href="http://caniuse.com/#feat=stream">getUserMedia/Stream</a> 和即将支持的 <a href="https://www.w3.org/TR/image-capture/">MediaStream Image Capture</a> API</p>
</li>
<li><p>蓝牙，通过调用 <a href="http://caniuse.com/#feat=web-bluetooth">Web Bluetooth</a> API</p>
</li>
<li><p>设备<a href="http://caniuse.com/#feat=vibration">震动</a></p>
</li>
<li><p>访问屏幕 <a href="http://caniuse.com/#feat=deviceorientation">方向和加速计传感器</a>, 包括 <a href="https://www.w3.org/TR/orientation-event/#introduction">指南针和陀螺仪</a></p>
</li>
<li><p><a href="http://caniuse.com/#feat=battery-status">电池状态</a></p>
</li>
</ul>
<h3>即将支持访问的硬件</h3>
<p>这些功能正在被支持或已经可以在一些浏览器中使用：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/NFC_API">NFC</a></p>
</li>
<li><p><a href="http://caniuse.com/#feat=ambient-light">环境光线传感器</a> (<a href="https://lh3.googleusercontent.com/y8B_G25tYklJPI4bq1oy9xT-ob1VXqVUCk1ldFTECofXU9ASgIvAI3yLPBLE-9l6yuVNY4kvypZ2UEBGON8CgOxFEgZPJ2MpNFpBeyW5zsouqxFDd6g0cJd8yH1v0gee9Dg3male1nsFkE-BESi1SRRPqd7hLwT6w9kXF2aoPOgvG0fuEQLBGPwetGV5gvCzoR-Zj_e9hTbxKktC6zEDY_sJsH5aPvqTGPvvKdXTs6y-en6jLR6frJNfOdQXRWkWJLC0pNg-K7gphBuGvHTGjiQgEVgq4O8lBcvo1QD6CchKr2gM05vK3KklRvt9A_IziezJEWFXbmN1yZYOrwyhzNkjSiS9hoPOaD9msBH9xyULVDr10G4HzA5R8bveEwXwb6hyn40UmjBi8JCZaMQcxeic_SEf6Ix5-f2wwHRHXJpC29qpA_f2Afw8PI2f45yNWMy-yMIfN6egAva3nUs_NBlj9nQrgyjAIIE3nMdUP-YKFUF30sshwAsGu4VecR2jqYTkRB9DJeWbaVNqymy93QZVyHwXM62wCUYEvsBrKITpNvxBSrvDZ1u9tJSxSnLZ4KkME69dLEIjpkqioTan3AIlzyjb1zM=w605-h1075-no">适用于</a> Firefox 48+)</p>
</li>
<li><p><a href="http://caniuse.com/#feat=proximity">距离传感器</a> (<a href="https://lh3.googleusercontent.com/y8B_G25tYklJPI4bq1oy9xT-ob1VXqVUCk1ldFTECofXU9ASgIvAI3yLPBLE-9l6yuVNY4kvypZ2UEBGON8CgOxFEgZPJ2MpNFpBeyW5zsouqxFDd6g0cJd8yH1v0gee9Dg3male1nsFkE-BESi1SRRPqd7hLwT6w9kXF2aoPOgvG0fuEQLBGPwetGV5gvCzoR-Zj_e9hTbxKktC6zEDY_sJsH5aPvqTGPvvKdXTs6y-en6jLR6frJNfOdQXRWkWJLC0pNg-K7gphBuGvHTGjiQgEVgq4O8lBcvo1QD6CchKr2gM05vK3KklRvt9A_IziezJEWFXbmN1yZYOrwyhzNkjSiS9hoPOaD9msBH9xyULVDr10G4HzA5R8bveEwXwb6hyn40UmjBi8JCZaMQcxeic_SEf6Ix5-f2wwHRHXJpC29qpA_f2Afw8PI2f45yNWMy-yMIfN6egAva3nUs_NBlj9nQrgyjAIIE3nMdUP-YKFUF30sshwAsGu4VecR2jqYTkRB9DJeWbaVNqymy93QZVyHwXM62wCUYEvsBrKITpNvxBSrvDZ1u9tJSxSnLZ4KkME69dLEIjpkqioTan3AIlzyjb1zM=w605-h1075-no">适用于</a> Firefox 48+)</p>
</li>
<li><p>访问<a href="https://w3c.github.io/accelerometer/">加速计</a>, <a href="https://w3c.github.io/magnetometer/">磁力计</a> and <a href="https://w3c.github.io/gyroscope/">陀螺仪</a> 传感器</p>
</li>
<li><p>硬件驱动的<a href="https://www.chromestatus.com/feature/4757990523535360">形状检测 API</a></p>
</li>
</ul>
<p>这是在Firefox 48中:</p>
<p><img src="http://p0.qhimg.com/t01f272eb2765b8007f.png" alt=""></p>
<p>另一个需要注意的重点是<a href="https://github.com/jpchase/OriginTrials">原始测试</a> 框架 (<a href="https://www.chromestatus.com/feature/6331324939894784">已在Chrome中实现</a>)， 使制造商能够公开和测试硬件（或软件）功能，而无需通过标准化过程。例如，手机制造商可能会暴露一个API来读取压力传感器的值，然后将其提交给W3C。</p>
<p>无论如何，访问硬件功能只是一个伟大的应用程序的一部分。  这里还有一些现在可以用于web应用的原生app的功能。</p>
<h3>PWAs也可以使用的传统原生功能</h3>
<ul>
<li><p><a href="https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web">消息推送</a></p>
</li>
<li><p><a href="https://jakearchibald.com/2014/offline-cookbook/">离线运行</a></p>
</li>
<li><p><a href="https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/images/add-to-home-screen.gif">在主屏幕上添加一个图标</a></p>
</li>
<li><p>被 <a href="https://blog.chromium.org/2017/02/integrating-progressive-web-apps-deeply.html">安装</a> 到Android(即在应用程序抽屉和设置中)</p>
</li>
<li><p><a href="https://developers.google.com/web/updates/2017/02/improved-add-to-home-screen#android_intent_filters">接收 intents</a></p>
</li>
<li><p>触发 <a href="https://developers.google.com/web/updates/2016/09/navigator-share">Android原生共享对话框</a></p>
</li>
<li><p><a href="https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android?hl=en">全屏</a> 启动</p>
</li>
<li><p><a href="https://github.com/zenorocha/clipboard.js/">访问剪贴板</a></p>
</li>
<li><p>使用<a href="https://developers.google.com/web/updates/2016/04/credential-management-api">Credentials Manager API</a> 实现持久自动登录</p>
</li>
<li><p>使用 <a href="https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108">CSS3</a>, HTML5 <a href="http://caniuse.com/#feat=canvas">Canvas</a> 或 <a href="http://caniuse.com/#feat=webgl">WebGL</a> 对2D / 3D图形进行硬件加速 — 查看一些 <a href="http://www.kevs3d.co.uk/dev/">HTML5 Canvas demos</a>, <a href="http://www.cssdesignawards.com/articles/30-best-webgl-sites-for-2015/263/">WebGL sites</a> 或 <a href="http://threejs.org/">three.js 库</a>. WebGL中的游戏引擎性能<a href="https://blogs.unity3d.com/2014/10/07/benchmarking-unity-performance-in-webgl/">接近原生</a>。</p>
</li>
<li><p>访问文件系统 (<a href="http://caniuse.com/#feat=filesystem">Chrome 和 Opera</a>)， 并在任何浏览器中 <a href="http://caniuse.com/#feat=fileapi">浏览</a> 用户选择的文件</p>
</li>
<li><p><a href="https://www.pokedex.org/"><strong>真的平滑、流畅的界面</strong></a> <strong>，拥有</strong> <a href="https://medium.com/engineering-housing/progressing-mobile-web-fac3efb8b454"><strong>60fps的动画</strong></a></p>
</li>
</ul>
<p>这些功能涵盖了很多用例，现在许多流行的本地应用程序可以重写为PWA。以Slack为例。它的代表性开源项目 <a href="https://github.com/RocketChat/Rocket.Chat.PWA">Rocket.Chat, 正在构建一个PWA版本</a>. 有关更多PWA演示，请参阅 <a href="https://pwa.rocks/">https://pwa.rocks</a>.</p>
<p>虽然PWA功能正在迅速发展，但有一些事情你还做不到。</p>
<h3>PWAs正在支持的原生功能</h3>
<ul>
<li>作为 <a href="https://www.chromestatus.com/feature/5662315307335680">分享目标</a> 地 <a href="http://stackoverflow.com/questions/38189160/can-a-progressive-web-app-be-registered-as-a-share-option-in-android">处理 intents</a> , 例如一个PWAs聊天应用程序，接收图像并设置为用户的头像。</li>
</ul>
<h3>PWA目前缺乏的 <a href="https://android.stackexchange.com/questions/38388/what-do-android-application-permissions-mean/38389">Android 原生功能</a></h3>
<ul>
<li><p>联系人，日历和浏览器书签的访问权限（尽管缺乏对这些内容的访问权限可能会被有隐私意识的用户视为 <a href="https://www.reddit.com/r/programming/comments/4yfpfl/when_progressive_web_apps_are_better_than_native/d6nsug9?st=is6svret&amp;sh=42d74c90">feature</a>）</p>
</li>
<li><p>警告</p>
</li>
<li><p>电话功能 - 包括拦截短信或电话，发送短信/彩信，获取用户的电话号码，阅读语音信箱，拨打电话时不需要拨号对话框</p>
</li>
<li><p>低级的访问一些硬件功能和传感器：手电筒，大气压力传感器</p>
</li>
<li><p>系统访问：任务管理，修改系统设置，日志</p>
</li>
<li><p>注册然后处理自定义URL方案和协议或文件类型</p>
</li>
</ul>
<p>对于大多数需求，PWAs都可以胜任而且还有一个最大的好处：您不必为Android，iOS和Web开发和维护三个独立的代码库。 PWA还具有原生应用缺乏的某些功能。</p>
<h3>PWAs优于原生应用的地方</h3>
<ul>
<li><strong>低阻碍的分发</strong> — 你的PWAs应用一旦上线，它就已经可以被Android（和其他移动）用户访问。 <a href="http://www.businessinsider.com/how-many-apps-people-download-per-month-2014-8">65.5％的美国智能手机用户每个月都不下载任何新的应用程序</a>。PWAs省去了去应用程序商店，搜索应用程序，单击安装，等待下载，然后打开应用程序 (直到 <a href="https://developer.android.com/topic/instant-apps/">Android即时应用</a> 启动)的过程。 <a href="https://www.youtube.com/watch?v=qmE_jpnYXFo&amp;feature=youtu.be&amp;t=96">这些步骤每个都会损失20％的潜在用户。</a></li>
</ul>
<p><img src="http://p0.qhimg.com/t012c031b69e6dedfd9.png" alt=""></p>
<p>来源: <a href="https://youtu.be/qmE_jpnYXFo?t=96">https://youtu.be/qmE_jpnYXFo?t=96</a></p>
<ul>
<li><p><strong>可发现性</strong> — PWAs中的内容可以很容易地被搜索引擎找到，但是像StackOverflow这样以内容为核心的原生应用没法在应用商店的搜索结果中显示它提供访问的内容，例如“pwa vs. native”。这对像Reddit这样的社区来说是一个问题，它不能将他们众多的子社区作为单独的“应用”展示给应用商店。</p>
</li>
<li><p><strong>可链接性</strong> — 任何页面/屏幕都可以有一个对应的链接，可以轻松共享</p>
</li>
<li><p><strong>可收藏性</strong> — 可保存该链接对应的app页面</p>
</li>
<li><p><strong>总是最新的</strong> — 无需通过应用商店审批流程来推送更新</p>
</li>
<li><p><strong>通用访问</strong> — 不受应用商店的限制， <a href="https://medium.com/@krave/apple-s-app-store-review-process-is-hurting-users-but-we-re-not-allowed-to-talk-about-it-55d791451b#.s2bse2bai">有时甚至是任意策略</a> 或 (意想不到的)<a href="http://android.stackexchange.com/questions/12538/how-can-i-circumvent-regional-restrictions-in-googles-play-store">地理限制</a></p>
</li>
<li><p><strong>节省大量的数据</strong>, 在互联网接入昂贵  和（或）  缓慢的新兴市场中非常重要。 例如，电子商务网站Konga <a href="https://developers.google.com/web/showcase/2016/konga">通过迁移到PWA，将第一次加载的数据使用率降低了92％</a>。</p>
</li>
</ul>
<h3>应用程序商店中的PWAs</h3>
<p>在2017年10月的Chrome Developer峰会上，Google发布了 <a href="https://developers.google.com/web/updates/2017/10/using-twa">Trusted Web Activities</a> — 一种将你的PWA与你的Android应用程序集成的新方法。通过这种方式你可以在Google Play商店中发布一个Android app壳来加载你的PWA，以便用户通过Google Play也能发现它。</p>
<h3>iOS</h3>
<p>虽然Opera与Chrome和Firefox大致相同，但在iOS上我们仍然在等待Safari赶上来。幸运的是， <a href="https://twitter.com/jonathandavis/status/745688244323377152">苹果确实关注PWAs</a>, 并且正在 <a href="https://twitter.com/jonathandavis/status/767856921856442370">考虑支持Service Worker</a>, 这是为PWA提供支持的核心功能。 然而，即使没有Service Worker，PWAs仍然会提供上面列出的所有其他功能，除了离线运行和Safari / iOS推送通知(<a href="https://developer.apple.com/notifications/safari-push-notifications/">Mac OS Safari推送通知功能</a>)。用户仍然可以 <a href="https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html">将你的应用程序添加到他们的iOS主屏幕并全屏启动</a>.</p>
<h3>总结</h3>
<p>“PWA vs. Native”是一个错误的问题，因为如果你已经有了一个产品，你已经有了一个应用程序，一个网站，或者两者兼而有之，你应该改善这两者。  如果你没有产品，那么如果您有足够的资源来构建原生的Android +原生iOS +网络应用程序并保持同步，那就去做吧。否则，在大多数情况下，首先选择构建PWA是不容易的：</p>
<ul>
<li><p><a href="https://developers.google.com/web/showcase/2016/aliexpress">如果你的目标是“下一个十亿用户”，那么PWA就是你的选择</a>. Android用户占绝大多数，而且数据是昂贵的。</p>
</li>
<li><p>如果你有桌面应用用户，那么建立一个PWA吧。</p>
</li>
<li><p>如果你不需要特定于Android的本机功能（请参阅上面的比较），则只需构建一个PWA（将涵盖移动Web和Android），也可以是本机iOS应用程序。  建立一个原生的Android应用程序是不值得的，因为它无论如何不会帮助你走在iOS的前端。</p>
</li>
<li><p>即使在iOS平台上构建PWA也能带来收益：<a href="https://developers.google.com/web/showcase/2016/aliexpress">AliExpress（阿里巴巴的eBay）在构建PWA后，iOS转换率提高了82％</a>。</p>
</li>
</ul>
<p>在过去，你必须开发</p>
<pre><code class="hljs armasm">桌面/移动网页+原生<span class="hljs-keyword">Android </span>+原生iOS

</code></pre><p>你现在可以<a href="https://medium.com/@owencm/the-surprising-tradeoff-at-the-center-of-question-whether-to-build-an-native-or-web-app-d2ad00c40fb2">in most cases</a>，只开发</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">PWA</span> + iOS app

</code></pre><p>并且 <a href="https://jakearchibald.github.io/isserviceworkerready/">Safari支持Service Worker</a>, 那你只需要开发</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">PWA</span>

</code></pre><p><strong>这不是“PWA vs. native”，而是“PWA vs. [web + native + native]”。</strong></p>
<p>就覆盖面而言, <a href="https://medium.com/@owencm/the-surprising-tradeoff-at-the-center-of-question-whether-to-build-an-native-or-web-app-d2ad00c40fb2">没有原生解决方案能够击败PWAs</a>。</p>
<p><em>[This article was re-posted here</em> <a href="http://stackoverflow.com/questions/35504194/what-features-do-progressive-web-apps-have-vs-native-apps-and-vice-versa-on-an/39027789#39027789"><em>from StackOverflow</em></a><em>, given the</em> <a href="http://meta.stackexchange.com/questions/124850/unofficial-stack-overflow-deleted-question-archive-now-available/222931"><em>danger of hosting valuable content there</em></a>_]_</p>
<ul>
<li><p><a href="https://medium.com/tag/web-development?source=post">Web Development</a></p>
</li>
<li><p><a href="https://medium.com/tag/mobile?source=post">Mobile</a></p>
</li>
<li><p><a href="https://medium.com/tag/progressive-web-app?source=post">Progressive Web App</a></p>
</li>
<li><p><a href="https://medium.com/tag/android-app-development?source=post">Android App Development</a></p>
</li>
<li><p><a href="https://medium.com/tag/ios-app-development?source=post">iOS App Development</a></p>
</li>
</ul>
<p>One clap, two clap, three clap, forty?</p>
<p>By clapping more or less, you can signal to us which stories really stand out.</p>
<p>1K17*   BlockedUnblockFollowFollowing</p>
<p><a href="https://medium.com/@dandv?source=footer_card" title="Go to the profile of Dan Dascalescu"><img src="http://p0.qhimg.com/t01c2fd366ffd0611d3.jpg" alt="Go to the profile of Dan Dascalescu"></a></p>
<h3><a href="https://medium.com/@dandv" title="Go to the profile of Dan Dascalescu">Dan Dascalescu</a></h3>
<p>Dev. Relations @ Google. Founded the startup ship for entrepreneurs <a href="http://twitter.com/BlueseedProject" title="Twitter profile for @BlueseedProject">@BlueseedProject</a> and the <a href="http://twitter.com/QSforum" title="Twitter profile for @QSforum">@QSforum</a>. ♥ emergent tech, healthspan extension, improv, acro yoga</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么说“渐进Web应用 vs. 原生应用” 是个错误的话题

## 原文链接
[https://www.zcfy.cc/article/why-progressive-web-apps-vs-native-is-the-wrong-question-to-ask](https://www.zcfy.cc/article/why-progressive-web-apps-vs-native-is-the-wrong-question-to-ask)

