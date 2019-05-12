---
title: '在 Linux 上用火狐浏览器保护你的隐私' 
date: 2019-01-23 2:30:08
hidden: true
slug: rkzvw8iilz
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-上用火狐浏览器保护你的隐私"></a>在 Linux 上用火狐浏览器保护你的隐私</h1>
<h3><a href="#介绍"></a>介绍</h3>
<p>隐私和安全正在逐渐成为一个重要的话题。虽然不可能做到 100% 安全，但是，还是能采取一些措施，特别是在 Linux 上，在你浏览网页的时候保护你的在线隐私安全。</p>
<p>基于这些目的选择浏览器的时候，火狐或许是你的最佳选择。谷歌 Chrome 不能信任。它是属于谷歌的，一个众所周知的数据收集公司，而且它是闭源的。 Chromium 或许还可以，但并不能保证。只有火狐保持了一定程度的用户权利承诺。</p>
<h3><a href="#火狐设置"></a>火狐设置</h3>
<p>火狐里有几个你能设定的设置，能更好地保护你的隐私。这些设置唾手可得，能帮你控制那些在你浏览的时候分享的数据。</p>
<h4><a href="#健康报告"></a>健康报告</h4>
<p>你首先可以设置的是对火狐健康报告发送的限制，以限制数据发送量。当然，这些数据只是被发送到 Mozilla，但这也是传输数据。</p>
<p>打开火狐的菜单，点击“选项”Preferences。来到侧边栏里的“高级”Advanced选项卡，点击“数据选项”Data Choices。这里你能禁用任意数据的报告。</p>
<h4><a href="#搜索"></a>搜索</h4>
<p>新版的火狐浏览器默认使用雅虎搜索引擎。一些发行版会更改设置，替代使用的是谷歌。两个方法都不理想。火狐可以使用 DuckDuckGo 作为默认选项。</p>
<p><a href="https://camo.githubusercontent.com/e88e075f67d18259d7744e503d6cfc2046b0c175/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d6464672e6a70673f3538636631386664"><img src="https://p4.ssl.qhimg.com/t01e71dd1251351f979.jpg" alt="在火狐中使用 DuckDuckGo"></a></p>
<p>为了启用 DuckDuckGo，你得打开火狐菜单点击“选项”Preferences。直接来到侧边栏的“搜索”Search选项卡。然后，在“默认搜索引擎”Default Search Engine的下拉菜单中选择 DuckDuckGo 。</p>
<h4><a href="#请勿跟踪do-not-track"></a>请勿跟踪Do Not Track</h4>
<p>这个功能并不完美，但它确实向站点发送了一个信号，告诉它们不要使用分析工具来记录你的活动。这些网页或许会遵从，会许不会。但是，最好启用请勿跟踪，也许它们会遵从呢。</p>
<p><a href="https://camo.githubusercontent.com/4aab23996dcc8326dea03b32d993eabe98b0b1ed/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d747261636b696e672e6a70673f3538636631386663"><img src="https://p1.ssl.qhimg.com/t01c01a405e424e88f9.jpg" alt="启用火狐中的请勿跟踪"></a></p>
<p>再次打开火狐的菜单，点击“选项”Preferences，然后是“隐私”Privacy。页面的最上面有一个“跟踪”Tracking部分。点击那一行写着“您还可以管理您的‘请勿跟踪’设置”You can also manage your Do Not Track settings的链接。会出现一个有复选框的弹出窗口，那里允许你启用“请勿跟踪”设置。</p>
<h4><a href="#禁用-pocket"></a>禁用 Pocket</h4>
<p>没有任何证据显示 Pocket 正在做一些不好的事情，但是禁用它或许更好，因为它确实连接了一个专有的应用。</p>
<p>禁用 Pocket 不是太难，但是你得注意只改变 Pocket 相关设置。要访问你所需的配置页面，在火狐的地址栏里输入<code>about:config</code>。</p>
<p>页面会加载一个设置表格，在表格的最上面是搜索栏，在那儿搜索 Pocket 。</p>
<p>你将会看到一个包含结果的新表格。找一下名为 <code>extensions.pocket.enabled</code> 的设置。当你找到它的时候，双击使其转变为“否”。你也能在这儿编辑 Pocket 的其他相关设置。不过没什么必要。注意不要编辑那些跟 Pocket 扩展不直接相关的任何东西。</p>
<p><a href="https://camo.githubusercontent.com/27f6d373a8aafbe13f982bd3f13362edafbb1363/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d706f636b65742e6a70673f3538636631386664"><img src="https://p4.ssl.qhimg.com/t010bfb71a5b9b5fe03.jpg" alt="禁用火狐的 Pocket"></a></p>
<h3><a href="#附加组件add-ons"></a>附加组件Add-ons</h3>
<p><a href="https://camo.githubusercontent.com/062a179d88c45055229d958bd7bedfb021ef4097/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d6164646f6e732e6a70673f3538636631386664"><img src="https://p5.ssl.qhimg.com/t01bbf5f98c93d45414.jpg" alt="安全化火狐的附加组件"></a></p>
<p>火狐最有效地保护你隐私和安全的方式来自附加组件。火狐有大量的附加组件库，其中很多是免费、开源的。在这篇指导中着重提到的附加组件，在使浏览器更安全方面是名列前茅的。</p>
<h4><a href="#https-everywhere"></a>HTTPS Everywhere</h4>
<p>针对大量没有使用 SSL 证书的网页、许多不使用 <code>https</code> 协议的链接、指引用户前往不安全版本的网页等现状，电子前线基金会Electronic Frontier Foundation开发了 HTTPS Everywhere。HTTPS Everywhere 确保了如果该链接存在有一个加密的版本，用户将会使用它。</p>
<p>给火狐设计的 <a href="https://addons.mozilla.org/en-us/firefox/addon/https-everywhere/">HTTPS Everywhere</a> 已经可以使用，在火狐的附加组件搜索网页上。（LCTT 译注：对应的<a href="https://addons.mozilla.org/zh-CN/firefox/addon/https-everywhere/">中文页面</a>。）</p>
<h4><a href="#privacy-badger"></a>Privacy Badger</h4>
<p>电子前线基金会同样开发了 Privacy Badger。 <a href="https://addons.mozilla.org/en-us/firefox/addon/privacy-badger17">Privacy Badger</a> 旨在通过阻止不想要的网页跟踪，弥补“请勿跟踪”功能的不足之处。它同样能通过火狐附加组件仓库安装。。（LCTT 译注：对应的<a href="https://addons.mozilla.org/zh-CN/firefox/addon/privacy-badger17/">中文页面</a>。）</p>
<h4><a href="#ublock-origin"></a>uBlock Origin</h4>
<p>现在有一类更通用的的隐私附加组件，屏蔽广告。这里的选择是 uBlock Origin，uBlock Origin 是个更轻量级的广告屏蔽插件，几乎不遗漏所有它会屏蔽的广告。 <a href="https://addons.mozilla.org/en-us/firefox/addon/ublock-origin/">uBlock Origin</a> 将主要屏蔽各种广告，特别是侵入性的广告。你能在这儿找到它。。（LCTT 译注：对应的<a href="https://addons.mozilla.org/zh-CN/firefox/addon/ublock-origin/">中文页面</a>。）</p>
<h4><a href="#noscript"></a>NoScript</h4>
<p>阻止 JavaScript 是有点争议， JavaScript 虽说支撑了那么多的网站，但还是臭名昭著，因为 JavaScript 成为侵略隐私和攻击的媒介。NoScript 是应对 JavaScript 的绝佳方案。</p>
<p><a href="https://camo.githubusercontent.com/38ecdfd4a3209590d49d0a4bb5c6467ed4bf8a8e/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d6e6f7363726970742e6a70673f3538636631386663"><img src="https://p5.ssl.qhimg.com/t013ddf622210e79c19.jpg" alt="向 NoScript 的白名单添加网页"></a></p>
<p>NoScript 是一个 JavaScript 的白名单，它会屏蔽所有 JavaScript，除非该站点被添加进白名单中。可以通过插件的“选项”菜单，事先将一个站点加入白名单，或者通过在页面上点击 NoScript 图标的方式添加。</p>
<p><a href="https://camo.githubusercontent.com/777c44f2d5febd65ca2c1e4700d6dffdbb6ebb9e/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d6e6f736372697074322e6a70673f3538636631386664"><img src="https://p2.ssl.qhimg.com/t01d61d812df7aad396.jpg" alt="添加你所在的网页到 NoScript 的白名单中"></a></p>
<p>通过火狐附加组件仓库可以安装 <a href="https://addons.mozilla.org/en-US/firefox/addon/noscript/">NoScript</a> 如果网页提示不支持你使用的火狐版本，点“无论如何下载”Download Anyway。这已经在 Firefox 51 上测试有效。</p>
<h4><a href="#disconnect"></a>Disconnect</h4>
<p><a href="https://addons.mozilla.org/en-US/firefox/addon/disconnect/">Disconnect</a> 做的事情很多跟 Privacy Badger 一样，它只是提供了另一个保护的方法。你能在附加组件仓库中找到它 （LCTT 译注：对应的<a href="https://addons.mozilla.org/zh-CN/firefox/addon/disconnect/">中文页面</a>）。如果网页提示不支持你使用的火狐版本，点“无论如何下载”Download Anyway。这已经在 Firefox 51 上测试有效。</p>
<h4><a href="#random-agent-spoofer"></a>Random Agent Spoofer</h4>
<p>Random Agent Spoofer 能改变火狐浏览器的签名，让浏览器看起来像是在其他任意平台上的其他任意浏览器。虽然有许多其他的用途，但是它也能用于预防浏览器指纹侦查。</p>
<p>浏览器指纹侦查Browser Fingerprinting是网站基于所使用的浏览器和操作系统来跟踪用户的另一个方式。相比于 Windows 用户，浏览器指纹侦查更多影响到 Linux 和其他替代性操作系统用户，因为他们的浏览器特征更独特。</p>
<p>你能通过火狐附加插件仓库添加 <a href="https://addons.mozilla.org/en-us/firefox/addon/random-agent-spoofer/">Random Agent Spoofer</a>。（LCTT 译注：对应的<a href="https://addons.mozilla.org/zh-CN/firefox/addon/random-agent-spoofer/">中文页面</a>）。像其他附加组件那样，页面或许会提示它不兼容最新版的火狐。再说一次，那并不是真的。</p>
<p><a href="https://camo.githubusercontent.com/d6470f23ef16b4a16a1e22d92af2827b3165638a/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f66662d72616e646f6d2d6167656e742e6a70673f3538636631386663"><img src="https://p2.ssl.qhimg.com/t01a67459c9065395cb.jpg" alt="在火狐上使用Random Agent Spoofer"></a></p>
<p>你可以通过点击火狐菜单栏上的图标来使用 Random Agent Spoofer。点开后将会出现一个下拉菜单，有不同模拟的浏览器选项。最好的选项之一是选择"Random Desktop" 和任意的切换时间。这样，就绝对没有办法来跟踪你了，也保证了你只能获得网页的桌面版本。</p>
<h3><a href="#系统设置"></a>系统设置</h3>
<h4><a href="#私人-dns"></a>私人 DNS</h4>
<p>请避免使用公共或者 ISP 的 DNS 服务器！即使你配置你的浏览器满足绝对的隐私标准，你向公共 DNS 服务器发出的 DNS 请求却暴露了所有你访问过的网页。诸如谷歌公共 DNS（IP：8.8.8.8 、8.8.4.4）这类的服务将会记录你的 IP 地址、你的 ISP 和地理位置信息。这些信息或许会被任何合法程序或者强制性的政府请求所分享。</p>
<blockquote>
<p><strong>当我在使用谷歌公共 DNS 服务时，谷歌会记录什么信息？</strong></p>
<p>谷歌公共 DNS 隐私页面有一个完整的收集信息列表。谷歌公共 DNS 遵循谷歌的主隐私政策，在“隐私中心”Privacy Center可以看到。 用户的客户端 IP 地址是唯一会被临时记录的（一到两天后删除），但是为了让我们的服务更快、更好、更安全，关于 ISP 和城市/都市级别的信息将会被保存更长的时间。 参考资料： <code>https://developers.google.com/speed/public-dns/faq#privacy</code></p>
</blockquote>
<p>由于以上原因，如果可能的话，配置并使用你私人的非转发 DNS 服务器。现在，这项任务或许跟在本地部署一些预先配置好的 DNS 服务器的 Docker 容器一样简单。例如，假设 Docker 服务已经在你的系统安装完成，下列命令将会部署你的私人本地 DNS 服务器：</p>
<pre><code class="hljs armasm"># docker run -d --name <span class="hljs-keyword">bind9 </span>-p <span class="hljs-number">53</span>:<span class="hljs-number">53</span>/udp -p <span class="hljs-number">53</span>:<span class="hljs-number">53</span> fike/<span class="hljs-keyword">bind9
</span>
</code></pre><p>DNS 服务器现在已经启动并正在运行：</p>
<pre><code class="hljs yaml"><span class="hljs-comment"># dig @localhost google.com</span>
<span class="hljs-string">;</span> <span class="hljs-string">&lt;&lt;&gt;&gt;</span> <span class="hljs-string">DiG</span> <span class="hljs-number">9.9</span><span class="hljs-number">.5</span><span class="hljs-bullet">-9</span><span class="hljs-string">+deb8u6-Debian</span> <span class="hljs-string">&lt;&lt;&gt;&gt;</span> <span class="hljs-string">@localhost</span> <span class="hljs-string">google.com</span>                                                                                   
<span class="hljs-string">;</span> <span class="hljs-string">(2</span> <span class="hljs-string">servers</span> <span class="hljs-string">found)</span>                                                                                                                           
<span class="hljs-string">;;</span> <span class="hljs-string">global</span> <span class="hljs-attr">options:</span> <span class="hljs-string">+cmd</span>                                                                                                                       
<span class="hljs-string">;;</span> <span class="hljs-string">Got</span> <span class="hljs-attr">answer:</span>                                                                                                                                
<span class="hljs-string">;;</span> <span class="hljs-bullet">-&gt;&gt;HEADER&lt;&lt;-</span> <span class="hljs-attr">opcode:</span> <span class="hljs-string">QUERY,</span> <span class="hljs-attr">status:</span> <span class="hljs-string">NOERROR,</span> <span class="hljs-attr">id:</span> <span class="hljs-number">51110</span>                                                                                     
<span class="hljs-string">;;</span> <span class="hljs-attr">flags:</span> <span class="hljs-string">qr</span> <span class="hljs-string">rd</span> <span class="hljs-string">ra;</span> <span class="hljs-attr">QUERY:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">ANSWER:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">AUTHORITY:</span> <span class="hljs-number">4</span><span class="hljs-string">,</span> <span class="hljs-attr">ADDITIONAL:</span> <span class="hljs-number">5</span>

<span class="hljs-string">;;</span> <span class="hljs-string">OPT</span> <span class="hljs-attr">PSEUDOSECTION:</span>
<span class="hljs-string">;</span> <span class="hljs-attr">EDNS:</span> <span class="hljs-attr">version:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">flags:;</span> <span class="hljs-attr">udp:</span> <span class="hljs-number">4096</span>
<span class="hljs-string">;;</span> <span class="hljs-string">QUESTION</span> <span class="hljs-attr">SECTION:</span>
<span class="hljs-string">;google.com.</span>                    <span class="hljs-string">IN</span>      <span class="hljs-string">A</span>

<span class="hljs-string">;;</span> <span class="hljs-string">ANSWER</span> <span class="hljs-attr">SECTION:</span>
<span class="hljs-string">google.com.</span>             <span class="hljs-number">242</span>     <span class="hljs-string">IN</span>      <span class="hljs-string">A</span>       <span class="hljs-number">216.58</span><span class="hljs-number">.199</span><span class="hljs-number">.46</span>

</code></pre><p>现在，在 <code>/etc/resolv.conf</code> 里设置你的域名服务器：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">nameserver</span> 127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>

</code></pre><h3><a href="#结束语"></a>结束语</h3>
<p>没有完美的安全隐私解决方案。虽然本篇指导里的步骤可以明显改进它们。如果你真的很在乎隐私，<a href="https://www.torproject.org/projects/torbrowser.html.en">Tor 浏览器</a> 是最佳选择。Tor 对于日常使用有点过犹不及，但是它的确使用了这篇指导里列出的一些措施。</p>
<hr>
<p>via: <a href="https://linuxconfig.org/protecting-your-privacy-with-firefox-on-linux">https://linuxconfig.org/protecting-your-privacy-with-firefox-on-linux</a></p>
<p>作者：<a href="https://linuxconfig.org/protecting-your-privacy-with-firefox-on-linux">Nick Congleton</a> 译者：<a href="https://ypingcn.github.io/wiki/lctt">ypingcn</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 上用火狐浏览器保护你的隐私

## 原文链接
[https://www.zcfy.cc/article/protecting-your-privacy-with-firefox-on-linux](https://www.zcfy.cc/article/protecting-your-privacy-with-firefox-on-linux)

