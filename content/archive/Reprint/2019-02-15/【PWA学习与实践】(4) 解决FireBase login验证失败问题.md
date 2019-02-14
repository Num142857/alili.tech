---
title: '【PWA学习与实践】(4) 解决FireBase login验证失败问题' 
date: 2019-02-15 2:30:44
hidden: true
slug: c4c6s3beftb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>《PWA学习与实践》系列文章已整理至<a href="https://alienzhou.gitbook.io/learning-pwa/" rel="nofollow noreferrer" target="_blank">gitbook - PWA学习手册</a>，文字内容已同步至<a href="https://github.com/alienzhou/learning-pwa-ebook" rel="nofollow noreferrer" target="_blank">learning-pwa-ebook</a>。转载请注明作者与出处。</blockquote>
<p>本文是<a href="https://juejin.im/user/59ad5377518825244d206d2d/posts" rel="nofollow noreferrer" target="_blank">《PWA学习与实践》</a>系列的第四篇。是我在测试其他demo时遇到的一个问题，算是一篇TroubleShooting。</p>
<p>PWA作为时下最火热的技术概念之一，对提升Web应用的安全、性能和体验有着很大的意义，非常值得我们去了解与学习。对PWA感兴趣的朋友欢迎关注《PWA学习与实践》系列文章。</p>
<h2 id="articleHeader0">引言</h2>
<p>在前一篇文章<a href="https://juejin.im/post/5aca14b6f265da237c692e6f" rel="nofollow noreferrer" target="_blank">《让你的WebApp离线可用》</a>中，我们使用Service Worker来做缓存与离线支持。是有一个重要的问题：<strong>Service Worker必须要在HTTPS协议下才能运行（或者localhost）</strong>。当然，对于一些只有前端资源（不涉及后端服务）的demo，我们完全可以将这些前端（静态资源）托管在一个HTTPS服务下，使得Service Worker可以使用。我选择了google的<a href="https://firebase.google.com/" rel="nofollow noreferrer" target="_blank">FireBase</a>来托管demo（其实github page也是个不错的选择）。</p>
<p>使用FireBase非常简单，只需要<code>firebase login</code> --&gt;<code>firebase init</code>--&gt;<code>firebase deploy</code>即可。但是在<code>firebase login</code>的过程中，遇到了一些问题。这篇文章主要总结了我在<code>firebase login</code>遇到的问题及解决方式：</p>
<ol>
<li>无法获取authorization code</li>
<li><code> Authentication Error: Your credentials are no longer valid.</code></li>
</ol>
<p>有需要的朋友可以继续看。</p>
<p>首先，如果你对firebase完全不了解，下面会有一段非常简短的介绍。</p>
<h2 id="articleHeader1">什么是FireBase</h2>
<p>前段时间学习PWA，在跟着官方教程完成demo后，想要在手机上测试一下效果。然而，遇到的一个问题就是：PWA需要HTTPS协议（或者使用localhost）。</p>
<p>这就需要我们有一个HTTPS的服务，并在其上面部署我们本地写好的demo。而官方demo的最后，推荐使用firebase来托管你的代码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916593?w=700&amp;h=394" src="https://static.alili.tech/img/remote/1460000016916593?w=700&amp;h=394" alt="FireBase的各种功能与服务" title="FireBase的各种功能与服务" style="cursor: pointer; display: inline;"></span></p>
<p>在FireBase的众多使用场景中，Develop -&gt; Hosting（托管）就是我需要用到的了。然而，在执行<code>firebase login</code>（账号登录）过程中，却遇到了一些问题。</p>
<h2 id="articleHeader2">问题一：在浏览器登录账号后，无反应（无法获取authorization code）</h2>
<p>最开始，我在CLI中输入<code>firebase login</code>，选择<code>y</code>后，CLI会需要一个authorization code；而浏览器会打开并提示你进行登录。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916594?w=1171&amp;h=158" src="https://static.alili.tech/img/remote/1460000016916594?w=1171&amp;h=158" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里我用google账户进行授权登录。然而，在授权之后，却迟迟没有响应（无法得到authorization code）。这时候，我发现浏览器显示，似乎是在等待<code>localhost</code>进行响应。</p>
<p>解决这个问题的方法就是：在登录时，使用<code>firebase login --no-localhost</code>进行登录。</p>
<p>重新使用<code>firebase login --no-localhost</code>登录。这里我选择了google账号进行登录，重复上面的过程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916594?w=1171&amp;h=158" src="https://static.alili.tech/img/remote/1460000016916594?w=1171&amp;h=158" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916595?w=508&amp;h=563" src="https://static.alili.tech/img/remote/1460000016916595?w=508&amp;h=563" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916596?w=484&amp;h=685" src="https://static.alili.tech/img/remote/1460000016916596?w=484&amp;h=685" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这次，你就会在浏览器中获得一串authorization code值：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916597?w=1240&amp;h=178" src="https://static.alili.tech/img/remote/1460000016916597?w=1240&amp;h=178" alt="authorization code" title="authorization code" style="cursor: pointer; display: inline;"></span></p>
<p>将它粘贴到CLI中即可。【问题一】解决！</p>
<h2 id="articleHeader3">问题二：Error: Authentication Error: Your credentials are no longer valid.</h2>
<p>然而，在CLI中输入authorization code之后，在等待了较长时间的验证后，CLI中报出了如下错误：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916598?w=1240&amp;h=165" src="https://static.alili.tech/img/remote/1460000016916598?w=1240&amp;h=165" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这是怎么回事呢？通过查阅一些资料发现，这很可能是你在电脑上使用“翻墙”工具所导致的。firebase-tool依赖的npm包（faye-websocket）中，未开启代理的相关设置，因此无法进行验证。</p>
<p>解决这个问题的方法有两种：</p>
<h3 id="articleHeader4">方法一：在路由器上设置代理，而非本机</h3>
<p>有些文章指出，通过在路由器上设置代理，而非在本机开启代理，可以避免这个问题。不过由于一些原因，暂时还没有尝试这种方式，不过通过一些反馈来看，应该是一个有效的方法。</p>
<h3 id="articleHeader5">方法二：(hack) 修改代码与相关环境变量</h3>
<p>该方法较第一种方法来看，会稍微“硬”那么一些。具体的操作方式如下：</p>
<ol>
<li>设置环境变量<code>http_proxy</code>，我本机的代理使用的是1087端口。<code>export http_proxy=http://localhost:1087</code>
</li>
<li>修改faye-websocket，开启代理配置。faye-websocket是firebase依赖的一个WebSocket库，需要为其client.js添加如下配置：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Client = function(_url, protocols, options) {
    options = options || {};
    // 添加proxy配置
    options.proxy = {
        origin:  'http://localhost:1087',
    };
    …
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Client = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_url, protocols, options</span>) </span>{
    options = options || {};
    <span class="hljs-comment">// 添加proxy配置</span>
    options.proxy = {
        <span class="hljs-attr">origin</span>:  <span class="hljs-string">'http://localhost:1087'</span>,
    };
    …
}</code></pre>
<p>如果你是全局安装的firebase-tools，你可以通过如下方法找到client.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_PATH=`npm prefix -g`
// client.js的位置
$NODE_PATH/lib/node_modules/firebase-tools/node_modules/firebase/node_modules/faye-websocket/lib/faye/websocket/client.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>NODE_PATH=<span class="hljs-string">`npm prefix -g`</span>
/<span class="hljs-regexp">/ client.js的位置
$NODE_PATH/lib</span><span class="hljs-regexp">/node_modules/firebase</span>-tools/node_modules/firebase/node_modules/faye-websocket/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">faye</span>/<span class="hljs-title">websocket</span>/<span class="hljs-title">client</span>.<span class="hljs-title">js</span></span></code></pre>
<ol>
<li>设置环境变量NODE_TLS_REJECT_UNAUTHORIZED。<code>export NODE_TLS_REJECT_UNAUTHORIZED=0</code>
</li>
<li>重新登录，<code>firebase login --no-localhost</code>，重复之前的操作。你会发现，登录成功！</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016916599?w=1177&amp;h=219" src="https://static.alili.tech/img/remote/1460000016916599?w=1177&amp;h=219" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<p>【问题二】解决！</p>
<p>p.s. 针对这个问题，github上也有一个issue：<a href="https://github.com/firebase/firebase-tools/issues/155" rel="nofollow noreferrer" target="_blank">Unable to deploy behind a proxy</a>。</p>
<p>此外，如果你使用了代理，推荐使用全局代理的方式，使你的CLI也使用代理。</p>
<h2 id="articleHeader6">写在最后</h2>
<p>最后，还是回到我开发PWA时的需求。文章最开始提到了，我是为了在移动端测试PWA demo的效果，所以使用FireBase来托管资源。当然，除了FireBase，还有下面两个办法：</p>
<ol>
<li>使用github page。由于github全站都是运行在HTTPS下，因此在github page上托管的静态站点可以使用Service Worker；</li>
<li>使用localhost/127.0.0.1。了解PWA的话，你会知道除了HTTPS之外，也可以使用localhost（这一设计是为了方便本机调试）。</li>
</ol>
<p>本文是<a href="https://juejin.im/user/59ad5377518825244d206d2d/posts" rel="nofollow noreferrer" target="_blank">《PWA学习与实践》</a>系列中的第四篇。这篇文章并没有探讨PWA中实际的技术，而是记录了我在开发、调试P过程与遇到的问题。可能有朋友也会遇到类似问题，因此记录下来和大家分享。</p>
<p>在下一篇文章中，我们还是会回到PWA背后的技术，来了解一下，<strong>如何使用Push API来实现后端服务向客户端进行消息推送</strong>。</p>
<h2 id="articleHeader7">《PWA学习与实践》系列文章</h2>
<ul>
<li><a href="https://juejin.im/post/5ac8a89ef265da238440d60a" rel="nofollow noreferrer" target="_blank">第一篇：2018，开始你的PWA学习之旅</a></li>
<li><a href="https://juejin.im/post/5ac8a67c5188255c5668b0b8" rel="nofollow noreferrer" target="_blank">第二篇：10分钟学会使用Manifest，让你的WebApp更“Native”</a></li>
<li><a href="https://juejin.im/post/5aca14b6f265da237c692e6f" rel="nofollow noreferrer" target="_blank">第三篇：从今天开始，让你的WebApp离线可用</a></li>
<li>第四篇：TroubleShooting: 解决FireBase login验证失败问题（本文）</li>
<li><a href="https://juejin.im/post/5accd1355188252b0b201fb9" rel="nofollow noreferrer" target="_blank">第五篇：与你的用户保持联系: Web Push功能</a></li>
<li><a href="https://juejin.im/post/5ae56f926fb9a07aca79edf6" rel="nofollow noreferrer" target="_blank">第六篇：How to Debug? 在chrome中调试你的PWA</a></li>
<li><a href="https://juejin.im/post/5ae7f7fd518825670960fe96" rel="nofollow noreferrer" target="_blank">第七篇：增强交互：使用Notification API来进行提醒</a></li>
<li><a href="https://juejin.im/post/5af80c336fb9a07aab29f19c" rel="nofollow noreferrer" target="_blank">第八篇：使用Service Worker进行后台数据同步</a></li>
<li><a href="https://juejin.im/post/5b02e5f1f265da0b767dc81d" rel="nofollow noreferrer" target="_blank">第九篇：PWA实践中的问题与解决方案</a></li>
<li><a href="https://juejin.im/post/5b4b66f0f265da0f9155feb6" rel="nofollow noreferrer" target="_blank">第十篇：Resource Hint - 提升页面加载性能与体验</a></li>
<li>第十一篇：从PWA离线工具集workbox中学习各类离线策略（写作中…）</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【PWA学习与实践】(4) 解决FireBase login验证失败问题

## 原文链接
[https://segmentfault.com/a/1190000016916590](https://segmentfault.com/a/1190000016916590)

