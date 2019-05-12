---
title: '[译] HTML5 媒体源扩展（MSE）：把影视制作级别的视频格式带入 Web' 
date: 2019-01-29 2:30:10
hidden: true
slug: 9afqailsan6
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>英文原文：<a href="https://www.smashingmagazine.com/2016/04/html5-media-source-extensions-bringing-production-video-web/" rel="nofollow noreferrer" target="_blank">HTML5 Media Source Extensions: Bringing Production Video To The Web</a></strong></p></blockquote>
<p>在过去的十几年，像Flash和Silverlight这样的插件为浏览器开启了丰富的视频功能，壮大了一批视频服务商，如Youtube、Netflix。但是，最近几年的风向却开始转向了HTML5.</p>
<p>大概2年前，W3C组织发布了最终的<a href="https://www.w3.org/TR/html5/" rel="nofollow noreferrer" target="_blank">HTML5标准</a>,其中提供了一组新的HTML元素和APIs,特别是video方面。其中一些旨在为网页增加更多的语义，但不引入新的功能。还有一些扩展了web的可能性，并提高了开发者开发原生web应用可能性，<strong>不使用plugins，如Adobe Flash, Microsoft Silverlight 或者 Java</strong>。</p>
<p>这对前端开发来说非常重要，因为<a href="http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html" rel="nofollow noreferrer" target="_blank">Google已经宣布废除NPAPI（一种plugins使用的API）</a>，同时<a href="https://blog.mozilla.org/futurereleases/2015/10/08/npapi-plugins-in-firefox/" rel="nofollow noreferrer" target="_blank">Firefox</a>和<a href="http://msdn.microsoft.com/en-us/library/ie/hh968248.aspx" rel="nofollow noreferrer" target="_blank">Microsoft</a>方面都号召要无插件浏览web。虽然这些厂商都还支持<code>Flash player</code>,但淘汰掉它看上去只是时间的问题。此外，对于移动端的浏览器来说，他们已经跨过了这一步，因为他们本来就不支持插件方式，根本就没有<code>Flash player</code>。</p>
<p>让我们看一下这些新的HTML5元素以及他们对video方面的影响：</p>
<ul>
<li><p><code>&lt;canvas&gt;</code>提供了脚本渲染图形，游戏图形等功能。这也叫做<code>Canvas JavaScript API</code>。cancas元素也可以与WebGL结合通过显卡的GPU，来渲染2D和3D图形。</p></li>
<li><p><code>&lt;video&gt;</code>实现了即开即用的视屏播放，很牛叉是吧。这也让在Web上实现无插件媒体播放变得可行。实际上，各家浏览器厂商好像都同意用使用一种视频格式-<a href="http://caniuse.com/#search=mp4" rel="nofollow noreferrer" target="_blank">MPEG-4/H.264</a>，这在所有浏览器中已经普遍支持了。不过Opera Mini是一个例外。</p></li>
<li><p><code>&lt;audio&gt;</code>实现了在Web网页上即开即用的音频播放。与视频播放一样，支持什么样的格式和编码要看不同的浏览器厂商。</p></li>
<li><p><code>&lt;track&gt;</code>用于定时文本内容显示，例如视频中的字幕和提示。WebVTT文件是开箱即用的。</p></li>
</ul>
<p>其实大多数新的元素已经很熟悉了，而且使用了一些日子了。这时因为所有的主流浏览器早就开始支持了。虽然现在规范已经稳定，但W3C还是有很多工作要做。</p>
<p>对于我来说，最重要的标准就是W3C还在制定中的<a href="http://www.w3.org/TR/media-source/" rel="nofollow noreferrer" target="_blank">媒体源扩展标准（MSEs）</a>，该标准现在已经进入了“备选推荐”状态。这些JavaScript API将允许我们为<code>&lt;video&gt;</code>、<code>&lt;audio&gt;</code>或其他元素解析媒体流，从而实现自适应码率的标准，比如只靠HTML5和JavaScript开发的MPEG-DASH。</p>
<p>还有一个值得关注的是<a href="http://www.w3.org/TR/encrypted-media/" rel="nofollow noreferrer" target="_blank">加密媒体扩展标准</a>,其支持用原生HTML5和JavaScript开发播放加密视频。不过，目前这还仅仅是个研究草案，还需要一点时间才能发布。</p>
<p>我们非常欢迎新的标准，期待着再也不用安装各色Flash播放器或者插件，只开发一个Web版本的就可以在任何设备上享受多媒体内容的一天。</p>
<h3 id="articleHeader0">为什么是 MPEG-DASH?</h3>
<p>让我先简单的介绍以下 <a href="https://www.bitcodin.com/blog/2015/04/mpeg-dash/" rel="nofollow noreferrer" target="_blank">MPEG-DASH格式</a>以及为什么会被用在HTML5中。MPEG-DASH（DASH是通过HTTP的动态自适应流的缩写）是由MPEG和ISO（ISO / IEC 23009-1）批准的国际，浏览器厂商独立标准。早先的自适应流技术（例如Apple HLS，Microsoft Smooth Streaming和Adobe HDS）由软件公司独立发布，仅支持自身的流媒体服务标准或者播放客户端。基于某一家公司标准来推广显然是不可取的，因此标准化组织推动各家厂商进行协调，这才有了在2012年推出的MPEG-DASH。</p>
<p>再看一下MPEG-DASH的目标和优点：</p>
<ul>
<li><p>在视频播放期间减少启动延迟以及缓冲和停顿。</p></li>
<li><p>持续适应客户端的带宽情况。</p></li>
<li><p>通过客户端开发的流处理逻辑，来达到最好的扩展性和灵活性。</p></li>
<li><p>可以配合CDN降低成本，并使用代理以及缓存服务。</p></li>
<li><p>通过使用HTTP有效地绕过NAT和防火墙。</p></li>
<li><p>通过信令、分发以及同源多并发的DRM方案来实现一种通用加密方法。</p></li>
<li><p>实现流媒体简单的拼接，以及广告内容在指定位置插入功能。</p></li>
<li><p>更好的支持“特效模式”</p></li>
<li><p><a href="https://www.bitcodin.com/blog/2015/03/mpeg-dash-vs-apple-hls-vs-microsoft-smooth-streaming-vs-adobe-hds/" rel="nofollow noreferrer" target="_blank">其他</a></p></li>
</ul>
<p>近几年，MPEG-DASH已经集成到新的标准化工作中，比如HTML5的MSE，MSE可以通过HTML5的<code>video</code>和<code>audio</code>标签实现DASH播放，以及HTML5加密多媒体格式扩展，即在浏览器中播放用DRM加密的多媒体内容。此外，MPEG-DASH中的DRM加密方式可以很好的协调其他的通用加密系统，如MPEG-CENC。并且MPEG-DASH还可以很容易的通过Hybrid方式的广播宽带电视集成到不同的只能电视平台上，如<a href="http://www.etsi.org/deliver/etsi_ts/102700_102799/102796/01.02.01_60/ts_102796v010201p.pdf" rel="nofollow noreferrer" target="_blank">HbbTV 1.5</a> 和 <a href="https://www.hbbtv.org" rel="nofollow noreferrer" target="_blank">HbbTV 2.0</a>。</p>
<p>此外，MPEG-DASH标准的使用方法已经被DASH行业社区以及DASH-AVC/264组织所推荐，同时，像DASH-HEVC/265这样前瞻性的计划，也已经推荐使用MPEG-DASH结合H.265/HEVC这样的方式。</p>
<p><a href="https://www.smashingmagazine.com/wp-content/uploads/2016/04/ecosystem_standards_opt.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000007900898?w=500&amp;h=259" src="https://static.alili.tech/img/remote/1460000007900898?w=500&amp;h=259" alt="视频流标准的生态圈" title="视频流标准的生态圈" style="cursor: pointer;"></span></a></p>
<p>视频流标准的生态圈 (Image: <a href="https://www.bitcodin.com/blog/2015/04/mpeg-dash/" rel="nofollow noreferrer" target="_blank">Bitcodin</a>) (<a href="https://www.smashingmagazine.com/wp-content/uploads/2016/04/ecosystem_standards_opt.png" rel="nofollow noreferrer" target="_blank">大图点击</a>)</p>
<p>今天，MPEG-DASH已经越来越多的被部署，并且随着Netflix以及Google这样的服务商的不断升级，他们都已经开始转向MPEG-DASH这一标准。依靠这两个主要的流量来源，MPEG-DASH先进已占整个互联网总流量的50%。</p>
<h3 id="articleHeader1">MSEs是如何工作的?</h3>
<p>现在，让我们深入的去了解一下MSEs，以及开发者如何使用他们。MSEs是HTMLMediaElement元素的扩展规范，通过它可以让JavaScript有能力去动态处理<code>video</code>和<code>audio</code> 这样的媒体流。这种功能在过去是不可能的，因为以前这些媒体标签只能加载MP4这样的完整文件。这种方法也被称为渐进式流处理，或者渐进式下载，因为媒体文件的下载和播放并行工作，开启了pseudo-streaming模式。</p>
<p>可是，这只带来了<strong>很差的搜索能力</strong>，并且根本没有办法来实现根据用户的带宽状况调整视频音频的清晰度。通过由JavaScript处理过的媒体数据，再输入给<code>video</code>和<code>audio</code>标签，这样开发者动态适应视频数据对应上用户的环境，从而提升媒体播放的体验。</p>
<p>如上所述，MPEG-DASH是MSEs的一种媒体传输格式的实现。那让我们了解一下基于HTML5 MSE的视频播放器的工作步骤：</p>
<ol>
<li><p>下载并解析配置文件，MPEG-DASH中使用MPD文件（HLS中使用m3u8文件），配置文件中提供了视频流的详细信息，诸如视频流的码率质量种类，分辨率数量，音频数据数量，字幕数量等，以及媒体文件数据块的名字，源服务器或者CDN的信息。</p></li>
<li><p>评估客户端设备上的可用带宽，选择适当的视频质量以实现无缓冲流，截止在用JavaScript来下载后续的媒体片段。</p></li>
<li><p>JavaScript代码将下载的媒体片段移交到MSE的缓存中处理。</p></li>
<li><p>底层硬件拿到了这部分缓存，就开始进行解码以及渲染视频，把结果返回给video标签。</p></li>
</ol>
<p>这就是一种Netflix和Youtube都在使用的基于HTML5的自适应媒体播放。像<a href="https://github.com/Dash-Industry-Forum/dash.js/wiki" rel="nofollow noreferrer" target="_blank">dash.js</a> 和 <a href="http://www.dash-player.com/" rel="nofollow noreferrer" target="_blank">Bitdash HTML5 player</a>都是现今相当成熟的解决方案，这就让开发者和视频内容商很轻松的切换到HTML5的自适应码率播放方案，同时DASH-IF项目是开源的。</p>
<p>MPEG-DASH的支持的格式全部都来自如<a href="http://www.dash-player.com/blog/2014/11/mpeg-dash-content-generation-using-mp4box-and-x264/" rel="nofollow noreferrer" target="_blank">x264 和 MP4Box</a>这样的开源工具，也有部分来自一些商业编码服务，如 <a href="http://www.bitcodin.com/" rel="nofollow noreferrer" target="_blank">Bitcodin</a>。</p>
<p>不过这样，MSEs并不仅限支持MPEG-DASH。有越来越多的项目（如<a href="https://github.com/dailymotion/hls.js/tree/master" rel="nofollow noreferrer" target="_blank">hls.js</a>）和播放器（如<a href="http://www.dash-player.com/" rel="nofollow noreferrer" target="_blank">Bitdash</a>）都已经实现了通过H5的MSEs方式来支持Apple的HLS格式。他们通过多路转换方式把HLS媒体片段（即MPEG2-TS内容）转成HTML5 和 MPEG-DASH可以处理的符合ISO的媒体文件格式。</p>
<h3 id="articleHeader2">DRM加密媒体扩展</h3>
<p>主要变化发生在DRM市场，由于Chrome 和 Firefox中NPAPI插件的减少，导致向Silverlight这种，DRM系统的领先者开始失去优势。这使得大多数的专业内容供应商处境变得十分困难，因为他们必须转换新技术，找到一个面向未来的新解决方案。</p>
<p><strong>专业流媒体发布商</strong>将无法依靠微软的PlayReady DRM技术在PC和安卓设备上的Chrome、火狐来加密自己的内容。他们必须重新评估他们的内容保护和流平台战略，并且找到一种新的解决方案，快速切换过去。</p>
<p>对许多视频服务商来说，MPEG-DASH已经是最好的技术选型。DASH项目以越来越快的速度推出，使用Widevine DRM的MES和EME看起来是最可行的替代方案。此外，MPEG-CENC可以支持不同的DRM系统都只支持同一版本的加密内容，并且，EME的内容是基于MSE的MPEG-DASH内容格式。</p>
<p>因此，不同的DRM系统组合，如用于Chrome和安卓的Widevine Modular，用于IE和Edge的Microsoft PlayReady，还有用于Firefox的Adobe Primetime。由于每一个平台都要有一个版本，这使得内容供应商有了更多的动机去转向MPEG-DASH作为国际标准，因为它对流媒体、DRM以及CDN都具有更好的灵活性。</p>
<h3 id="articleHeader3">浏览器对于MSEs和EMEs的支持情况</h3>
<p>浏览器厂家在经历了很多年对HTML5以及MSE的缓慢适配之后，我们很高兴的看到如今大多数的主流浏览器都已经支持了。这样的过程，也同样会发生在EME身上，虽然目前各家厂商都有自己的DRM系统，这让目前的DRM的生态系统变得有点复杂。</p>
<p>尽管如此，要覆盖99%的用户，我们需要做一个视频流兼容设置，这样也可以让那些不支持MSE的浏览器也能顺利播放，比如一些旧版本的浏览器，和iOS上的Safari。老的浏览器可以使用Flash播放器来提供服务，Flash播放器是可以直接播放MSE的MPEG-DASH格式内容的，如<a href="http://developer.dash-player.com/supported-formats-devices" rel="nofollow noreferrer" target="_blank">Bitdash player</a>播放器。为了支持iOS设备，我们必须要使用Apple的HLS流媒体格式，这是苹果在HTML5中强推的另一种方式。Apple并不喜欢支持开放标准（如MSE），不过Mac OSX上的Safari还是支持MSE的。</p>
<p>下面的列表介绍了现在主流的浏览器对MSE和EME支持的现状，由<a href="http://www.dash-player.com/browser-capabilities/" rel="nofollow noreferrer" target="_blank">Bitmovin提供</a>:</p>
<table>
<thead><tr>
<th>Environment</th>
<th>Player Technology</th>
<th>Media</th>
<th colspan="2">DRM</th>
</tr></thead>
<tbody>
<tr>
<td>Chrome</td>
<td>HTML5 MSE</td>
<td>MPEG-DASH</td>
<td>Widevine Modular</td>
</tr>
<tr>
<td>Internet Explorer 11 Windows 8.1</td>
<td>HTML5 MSE</td>
<td>MPEG-DASH</td>
<td>PlayReady</td>
</tr>
<tr>
<td>Internet Explorer (other)</td>
<td>Flash, Silverlight</td>
<td>MPEG-DASH</td>
<td>ClearKey, PlayReady</td>
</tr>
<tr>
<td>Edge</td>
<td>HTML5 MSE, HTML5 HLS</td>
<td>MPEG-DASH, HLS</td>
<td>PlayReady, AES HLS</td>
</tr>
<tr>
<td>Firefox</td>
<td>HTML5 MSE</td>
<td>MPEG-DASH</td>
<td>Adobe</td>
</tr>
<tr>
<td>Safari</td>
<td>HTML5 MSE, HTML5 HLS</td>
<td>MPEG-DASH, HLS</td>
<td>Fairplay, AES</td>
</tr>
<tr>
<td>Android: Web &gt; v4.1</td>
<td>HTML5 MSE, HTML5 HLS</td>
<td>MPEG-DASH, HLS</td>
<td>Widevine Modular</td>
</tr>
<tr>
<td>Android: app</td>
<td>Google’s Exoplayer</td>
<td>MPEG-DASH, HLS</td>
<td>Widevine Modular</td>
</tr>
<tr>
<td>iOS: web</td>
<td>HTML5 HLS</td>
<td>HLS</td>
<td>AES</td>
</tr>
<tr>
<td>iOS: app</td>
<td>native HLS support</td>
<td>HLS</td>
<td>Fairplay, AES</td>
</tr>
<tr>
<td>smart TV</td>
<td>Native MPEG-DASH support or HTML5 MSE (e.g. Tizen)</td>
<td>MPEG-DASH or HLS</td>
<td>Device-dependent</td>
</tr>
<tr>
<td>HbbTV (1.5)</td>
<td>native MPEG-DASH support</td>
<td>MPEG-DASH</td>
<td>device-dependent</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader4">HTML5 Video的未来</h3>
<p>新的媒体解码器正在进入市场，这使得视频压缩效率变得更高，这对于那些高质量的格式（如4K和UHD）以及那些移动端设备的流媒体尤为重要。最常见的编解码器是<strong>HEVC/h.265</strong>，它是十几年至今一直选用的默认编解码格式（当然如果他的专利肯定不发生变化）。同时他还可以利用浏览器内置的MSEs进行播放，并使用MPEG-DASH作为流格式，这表明了这种开发标准的灵活性。</p>
<p>视频播放器的开发者值需要启动一种简单的适配，比如在创建SourceBuffer时改变编解码器的属性。并且，浏览器底层已经集成了HEVC解码（最有可能是硬件解码器），那么你就可以在HTML5中观看基于HEVC MPEG-DASH的流媒体。我们已经成功在在一些浏览器中测试过了，比如<a href="http://www.windowscentral.com/microsoft-windows-10-will-support-hevc-video-standard" rel="nofollow noreferrer" target="_blank">Microsoft Edge</a>，其已经支持了HEVC；而且Google<a href="https://code.google.com/p/chromium/issues/detail?id=454948#c14" rel="nofollow noreferrer" target="_blank">最近声称</a>它的Chromium browser也会支持。</p>
<p>然而，HEVC还不能为绝大多数互联网视频资源所用，而且也只有不多的一部分设备能支出对其的硬解码。当然，它并不是世界上唯一的一种编解码器。VP9，一种开放的免版税的视频编码格式（VP8的继任者），它旨在提供更好的编码效率，现在诸如Google Chrome和Microsoft Edge这些主流浏览器已经支持VP9，并且VP9可以很好的与MSE兼容。不过，我们并不能预见未来那些编解码器会成为我们的主流。但不管是VP8/9, AVC 还是 HEVC，MSEs和MPEG-DASH都已经准备好了！</p>
<p>现在，360度视频即将普及，这可以非常直观的通过HTML5来观看。开发者可以利用MSE的流自适应功能来实现360度视频的体验，只需要结合一些JavaScript代码或WebGL渲染层。最近，我做了一个<a href="http://www.slideshare.net/bitmovin/build-a-netflix-for-360-vr-video-using-html5-dash-javascript-webgl" rel="nofollow noreferrer" target="_blank">小演讲</a>,是关于如何用HTML5，JavaScript，DASH以及WebGL实现一套跟Netflix服务类似的虚拟现实系统。</p>
<h3 id="articleHeader5">小结</h3>
<p>我希望这篇文章可以让你大概的了解一下网络视频的现状和未来。MSE跟EME是网络视频迈向开放生态系统的重要一步，他们取代了Flash和Silverlight。此外，HTML5技术已经被现如今各种平台所选用，包括桌面端，移动端，还有智能电视平台。</p>
<p>结合像MPEG-DASH这样的流媒体标准，视频内容供应商还可以在不同平台和设备之间拥有<strong>统一的视频解决方案</strong>。他们可以通过自适应流媒体格式来防止发生缓冲，减少视频加载时间，提高用户观看体验，并根据每一个用户自身的带宽和设备情况提供最匹配的视频画质。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] HTML5 媒体源扩展（MSE）：把影视制作级别的视频格式带入 Web

## 原文链接
[https://segmentfault.com/a/1190000007900895](https://segmentfault.com/a/1190000007900895)

