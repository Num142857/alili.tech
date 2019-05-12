---
title: '4 个用于托管开源库的顶级 CDN 服务' 
date: 2019-01-22 2:30:08
hidden: true
slug: m8crfx21j6j
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#4-个用于托管开源库的顶级-cdn-服务"></a>4 个用于托管开源库的顶级 CDN 服务</h1>
<blockquote>
<p>内容分发网络可以加速你的网站图片、CSS、JS、以及其他静态内容。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/50bee2ed33e0e94e9659f5f32e4677b00f04bfa6/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f66696c655f73797374656d2e6a70673f69746f6b3d73326236306f4942"><img src="https://p0.ssl.qhimg.com/t017bcae8e695d5d004.jpg" alt="Top 4 CDN services for hosting open source libraries" title="Top 4 CDN services for hosting open source libraries"></a></p>
<blockquote>
<p>图片版权：<a href="https://en.wikipedia.org/wiki/Open_Clip_Art_Library">Open Clip Art Library</a>，它明确将其公开于<strong><a href="https://en.wikipedia.org/wiki/public_domain">公共领域</a></strong>（<a href="https://openclipart.org/share">见此处</a>）。由 Jen Wike Huger 修改。</p>
</blockquote>
<p>CDN 或称内容分发网络是位于世界各地的策略性放置的服务器网络，用于更快地向用户传输文件。传统 CDN 能够加速你的网站的图像、CSS、JS 和任何其他静态内容的访问。它允许网站所有者加速自己的所有内容，并为他们提供额外的功能和配置选项，而这些高级服务通常需要根据项目使用的带宽量进行支付。</p>
<p>但是，如果你的项目无法证明值得实施传统 CDN ，那么使用开源 CDN 可能更合适。通常这些类型的 CDN 能让你链接到流行的 Web 库（例如 CSS/JS 框架），可以让你从免费的 CDN 服务器上传输给你的访问者。虽然开源库的 CDN 服务不允许你将自己的内容上传到服务器，但它们可以帮助你加速全局库并提高网站的冗余性。</p>
<p>CDN 在庞大的服务器网络上托管项目，因此网站维护者需要修改网站 HTML 代码中的资源链接来反映开源 CDN 的URL，后面跟上资源路径。根据你是否链接到 JavaScript 或 CSS 库，链接将包含在 <code>&lt;script&gt;</code> 或 <code>&lt;link&gt;</code> 标签中。</p>
<p>我们来探讨开源库的四大流行 CDN 服务。</p>
<h3><a href="#jsdelivr"></a>JsDelivr</h3>
<p><a href="http://www.jsdelivr.com/">JsDelivr</a> 是一个使用高级 CDN 提供商（KeyCDN、Stackpath、Cloudflare）的开源 CDN 提供者来分发开源项目资源。jsDelivr 的一些亮点包括：</p>
<ul>
<li>支持 2100 多个库</li>
<li>110 个接入点</li>
<li>CDN 可在亚洲和中国使用</li>
<li>支持 API</li>
<li>没有流量限制</li>
<li>完整的 HTTPS 支持</li>
</ul>
<p>所有片段都以自定义 jsDelivr URL <a href="https://cdn.jsdelivr.net/">https://cdn.jsdelivr.net/</a> 开始，然后是项目名称、版本号等。你还可以配置 jsDelivr 生成带脚本标签的 URL 并启用 SRI（子资源完整性）以增加安全性。</p>
<h3><a href="#cdnjs"></a>Cdnjs</h3>
<p><a href="https://cdnjs.com/">Cdnjs</a> 是另一个流行的开源 CDN 提供者，类似于 jsDelivr。此服务还提供了一系列流行的 JavaScript 和 CSS 库，你可以在 Web 项目中进行链接。 该服务由 CDN 提供商 Cloudflare 和 <a href="https://www.keycdn.com/">KeyCDN</a> 赞助。cdnjs 的一些亮点包括：</p>
<ul>
<li>支持 2900 多个库</li>
<li>超过一百万个网站使用</li>
<li>支持 HTTP/2</li>
<li>支持 HTTPS</li>
</ul>
<p>与 jsDelivr 类似，使用 cdnjs，你也可以选择使用或者不使用脚本标签和 SRI 来复制资源 URL。</p>
<h3><a href="#google托管库"></a>Google 托管库</h3>
<p><a href="https://developers.google.com/speed/libraries/">Google 托管库</a>网站允许你链接到托管在 Google 强大的开源 CDN 网络上的流行 JavaScript 库。这个开源的 CDN 解决方案不提供像 jsDelivr 或 cdnjs 一样多的库或者功能。然而，当连接到 Google 托管库时，你可以期待高度的可靠性和信任。Google 开源 CDN 的几个亮点包括：</p>
<ul>
<li>HTTPS 支持</li>
<li>文件提供 CORS 和 Timing-Allow 头</li>
<li>提供每个库的最新版本</li>
</ul>
<p>所有 Google 的托管库文件都以URL <a href="https://ajax.googleapis.com/">https://ajax.googleapis.com/</a> 开头，后跟项目的名称、版本号和文件名。</p>
<h3><a href="#microsoft-ajax-cdn"></a>Microsoft Ajax CDN</h3>
<p><a href="https://www.asp.net/ajax/cdn">Microsoft Ajax CDN</a>与 Google 托管库非常类似，因为它只托管流行的库。但是，将 Microsoft Ajax CDN 与 Google 托管库区分开的两个主要区别是 Microsoft 提供了 CSS 和 JS 库，并且还提供了各种库的各种版本。Microsoft Ajax CDN 的几个亮点包括：</p>
<ul>
<li>HTTPS 支持</li>
<li>每个库的以前版本通常都可用</li>
</ul>
<p>所有的 Microsoft Ajax 文件都以 URL <a href="http://ajax.aspnetcdn.com/ajax/">http://ajax.aspnetcdn.com/ajax/</a> 开头，并且和其它文件一样，后面是库的名字，版本号等。</p>
<p>如果你的项目或网站尚未准备好利用优质的 CDN 服务，但你仍然希望加速网站的重要方面，那么使用开源 CDN 是一个很好的解决方案。它能够加速第三方库的传输，否则它们将从原始服务器发送，从而导致远方用户不必要的加载以及更慢的速度。</p>
<p> <em>你喜欢使用哪个开源 CDN 提供商？为什么？</em></p>
<hr>
<p>作者简介：</p>
<p>Cody Arsenault - Cody 热衷于网络性能，SEO 以及创业活动。他是 KeyCDN 的网络性能倡导者，致力于使网络更快。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/4/top-cdn-services">https://opensource.com/article/17/4/top-cdn-services</a></p>
<p>作者：<a href="https://opensource.com/users/codya">Cody Arsenault</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
4 个用于托管开源库的顶级 CDN 服务

## 原文链接
[https://www.zcfy.cc/article/top-4-cdn-services-for-hosting-open-source-libraries](https://www.zcfy.cc/article/top-4-cdn-services-for-hosting-open-source-libraries)

