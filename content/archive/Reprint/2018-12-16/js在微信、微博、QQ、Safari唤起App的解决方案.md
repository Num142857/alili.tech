---
title: 'js在微信、微博、QQ、Safari唤起App的解决方案' 
date: 2018-12-16 2:30:10
hidden: true
slug: 8do23nye48i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">背景</h3>
<p>最近在做微信、QQ、微博中使用js唤起App，之前也做过类似的功能，不过比较粗糙，考虑的情况不太全，而且那已经是很久之前的事情了，很多技术都已过时，现在有体验更好，功能更加完善的唤起技术，之前的很多的方案，到了现在都已是不太必要了，现在通过这篇文章分享给大家一个全面的、最新的唤起方案，希望对大家有帮忙。</p>
<h3 id="articleHeader1">最终实现的效果</h3>
<p>用户点击H5页面的打开App或者下载按钮（这个按钮可能在一个下载入口页、各种分享页面的吸顶或吸底的banner），如果用户已经安装了App，则根据业务跳转到相应的Native页面；如果用户没有安装该应用，则跳到AppStore或者应用市场去下载我们的App。</p>
<h3 id="articleHeader2">应用流程</h3>
<p><span class="img-wrap"><img data-src="/img/bV2slX?w=938&amp;h=268" src="https://static.alili.tech/img/bV2slX?w=938&amp;h=268" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>首先所有的下载/唤起入口都是一个直接跳转，应该是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;https://applink-party.mtime.cn/mtlf&quot;>下载</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://applink-party.mtime.cn/mtlf"</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>或者这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.location.href = 'https://applink-party.mtime.cn/mtlf'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.href</span> = <span class="hljs-string">'https://applink-party.mtime.cn/mtlf'</span></code></pre>
<p>所有的业务判断都是<code>mtlf</code>这个页面里面来做，这样有两个好处：</p>
<ul>
<li>多业务共用代码。在一个团队中，每个人的业务都可能有一个banner下载，没有比location到一个url更简单的调用方式了</li>
<li>能够利用<code>universal link</code>
</li>
</ul>
<h3 id="articleHeader3">简单说下<code>universal link</code>
</h3>
<h4>
<code>universal link</code>的优势</h4>
<p>在iOS9之前，唤起方式和现在安卓是一个的，都是使用<code>scheme</code>进行唤起，这种方式有个小问题，每次唤起，都会给个提示：是否打开xx应用，这样从体验上来讲，又让用户多一步操作。<code>universal link</code>会直接跳转，不会在页面做停留，条件就是在我们项目的根目录，增一个<code>apple-app-site-association.json</code>文件，里面的内容大致是这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV2rx8?w=1116&amp;h=520" src="https://static.alili.tech/img/bV2rx8?w=1116&amp;h=520" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后iOS的App后台再配置一下，就可以实现直接唤起了！</p>
<h4>
<code>universal link</code>配置</h4>
<p>在H5端怎么才算配置成功了呢？只要我们某一个url在浏览器打开（不管是cdn地址，还是路由转发），看到json文件的内容，H5这边就算配置成功。然后把这个地址，给<code>iOS</code>老司机，和他们一说什么事，他们立刻就知道做什么，就这么简单！</p>
<h3 id="articleHeader4">微信、微博、QQ、Safari在各平台的唤起方案</h3>
<h4>唤起流程图</h4>
<p><span class="img-wrap"><img data-src="/img/bV2p56?w=907&amp;h=688" src="https://static.alili.tech/img/bV2p56?w=907&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>经过长时间的实验，总结了这张在各种情况下，唤起成功/唤起失败的解决方案，我们接下来一个一个的说。</p>
<h4>微信</h4>
<p>微信是最重要的一种分享渠道，但是我们能够做的，却不多。之前，<code>iOS</code>下的微信支持<code>universal link</code>这种唤起方式，但是从2018年1月8日之后，<strong>微信把这个给屏蔽了</strong>！！！不管微信基于什么原因，把<code>iOS</code>下这种最便捷的唤起方式屏蔽，我们能做的只能是适应了。so，现在不管是iOS还是android，我们的处理方式是一样的：<strong>都是直接跳到应用宝</strong>。iOS的应用宝会引导找开<code>AppStore</code>，android的应用宝会直接打开App（前提是你已经下载）<br><strong>注</strong>：微信把<code>itunes</code>链接也屏蔽了，所以也没办法直接跳转<code>AppStore</code>，只能借助应用宝来搭这个桥。</p>
<h4>微博</h4>
<p>微博目前还支持<code>universal link</code>唤起，我们只需要考虑未下载的情况。</p>
<ul><li>在<code>iOS</code>下，微博是不支持打开应用宝的链接，所以我们需要引导用户使用<code>Safari</code>打开，像这样：</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV2sbA?w=692&amp;h=1202" src="https://static.alili.tech/img/bV2sbA?w=692&amp;h=1202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>在<code>android</code>平台下，<strong>使用<code>scheme</code>这种方式是唤不起App的</strong>，但是有特例，同样是<code>scheme</code>，大人点评和网易云音乐就可以唤起，有空大家可以自己试试，所以我们可以推断出，安卓平台下的微博，也有类似微信一样的白名单，在白名单内的，就可以使用<code>scheme</code>唤起，就像微信之于京东，京东在微信里面就是通过<code>scheme</code>方式唤起的。</li></ul>
<p>so，不管是<code>iOS</code>还是<code>android</code>，我们的方案是：<strong>直接引导用户使用本地浏览器打开</strong>。</p>
<h4>QQ</h4>
<ul>
<li>
<code>iOS</code>平台下，QQ目前还支持<code>universal link</code>唤起，要是没有安装，QQ下也支持直接打开<code>itunes</code>链接，比较其他应用，QQ支持是最好的。</li>
<li>
<code>android</code>平台下，QQ也支持<code>scheme</code>方式唤起，但是<strong>在一些老机型下，QQ会有一定的概率唤起失败</strong>，具体的现象是：第一次打开页面，唤起失败，再次打开，唤起成功。根据现象，我们可以推测出，在QQ的<code>webview</code>中，会对<code>scheme</code>的唤起方式做一些加载时间上的限制，经测试，大约在500ms，超过这个时间值，就会出现唤起失败的情况。为什么第二次打开，唤起成功的概率会大，是因为第一次加载时，已缓存了文件，第二次打开直接加载，这样时间在限制之内。</li>
</ul>
<h4>Safari</h4>
<p>Safari这种情况比较简单，支持<code>universal link</code>，也支持直接打开<code>itunes</code>，so，如图处理就可以了。</p>
<h4>踩坑</h4>
<li><ul>
<li>在<code>iOS9</code>中，<code>Safari</code>不支持直接跳转<code>itunes</code>，so，这种情况需要做兼容处理，可以直接跳到应用宝</li>
<li>之前看唤起是不是成功了，需要自己来计算时间，因为要是唤起成功了，<code>setInterval</code>的时间就会变慢，经我测试，已经用不到这种方法了，只需要使用<code>document.hidden || document.webkitHidden</code>就可以，兼容性还不错</li>
<li>判断是不是<code>Safari</code>浏览器时，一般判断都是UA中有没有这个字符串，经测试发现，安卓的UA中，也包含<code>Safari</code>这个字符串（如下UA展示），所以需要加上操作系统的判断</li>
</ul></li>
<ul><li>关于<code>Scheme</code>唤起，之前有很多方案，比如：使用<code>iframe</code>、<code>&lt;a&gt;标签点击</code>、<code>window.location</code>...经测试，只要使用a标签点击，这样兼容性最好，代码大约长这样：</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV2syU?w=626&amp;h=232" src="https://static.alili.tech/img/bV2syU?w=626&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">关于测试</h3>
<p>两个平台，这么多情况，要一个一个测试吗？当然要一个一个的验证，但是在开发期间，没有必要改一行，在手机上测试一下，这样效率太低了，尤其是像一样，选了一个安卓4.4的手机，绝对可以磨练你的耐心。为了提高效率，我把我常用到的UA分享给大家，这样在<code>Chrome</code>模拟器里配置一下，就可以本地调试了，常用UA如下：</p>
<ul><li><h4>iOS-微信</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 MicroMessenger/6.6.1 NetType/WIFI Language/zh_CN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (iPhone; CPU iPhone OS <span class="hljs-number">11</span>_2_2 like Mac OS X) AppleWebKit/<span class="hljs-number">604.4</span><span class="hljs-number">.7</span> (KHTML, like Gecko) Mobile/<span class="hljs-number">15</span>C202 MicroMessenger/<span class="hljs-number">6.6</span><span class="hljs-number">.1</span> NetType/WIFI Language/zh_CN</code></pre>
<ul><li><h4>iOS-QQ</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 QQ/7.3.5.473 V1_IPH_SQ_7.3.5_1_APP_A Pixel/1125 Core/UIWebView Device/Apple(iPhone X) NetType/WIFI QBWebViewType/1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (iPhone; CPU iPhone OS <span class="hljs-number">11</span>_2_2 like Mac OS X) AppleWebKit/<span class="hljs-number">604.4</span><span class="hljs-number">.7</span> (KHTML, like Gecko) Mobile/<span class="hljs-number">15</span>C202 QQ/<span class="hljs-number">7.3</span><span class="hljs-number">.5</span><span class="hljs-number">.473</span> V1_IPH_SQ_7<span class="hljs-number">.3</span><span class="hljs-number">.5</span>_1_APP_A Pixel/<span class="hljs-number">1125</span> Core/UIWebView Device/Apple(iPhone X) NetType/WIFI QBWebViewType/<span class="hljs-number">1</span></code></pre>
<ul><li><h4>iOS-微博</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Weibo (iPhone10,3__weibo__8.1.0__iphone__os11.2.2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (iPhone; CPU iPhone OS <span class="hljs-number">11</span>_2_2 like Mac OS X) AppleWebKit/<span class="hljs-number">604.4</span><span class="hljs-number">.7</span> (KHTML, like Gecko) Mobile/<span class="hljs-number">15</span>C202 Weibo (iPhone10,<span class="hljs-number">3</span>__weibo__8<span class="hljs-number">.1</span><span class="hljs-number">.0</span>__iphone__os11<span class="hljs-number">.2</span><span class="hljs-number">.2</span>)</code></pre>
<ul><li><h4>iOS-safari</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0 Mobile/15C202 Safari/604.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (iPhone; CPU iPhone OS <span class="hljs-number">11</span>_2_2 like Mac OS X) AppleWebKit/<span class="hljs-number">604.4</span><span class="hljs-number">.7</span> (KHTML, like Gecko) Version/<span class="hljs-number">11.0</span> Mobile/<span class="hljs-number">15</span>C202 Safari/<span class="hljs-number">604.1</span></code></pre>
<ul><li><h4>Android-微信</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (Linux; Android 4.4.2; PE-TL20 Build/HuaweiPE-TL20; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043807 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/WIFI Language/zh_CN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (Linux; Android <span class="hljs-number">4.4</span><span class="hljs-number">.2</span>; PE-TL20 Build/HuaweiPE-TL20; wv) AppleWebKit/<span class="hljs-number">537.36</span> (KHTML, like Gecko) Version/<span class="hljs-number">4.0</span> Chrome/<span class="hljs-number">57.0</span><span class="hljs-number">.2987</span><span class="hljs-number">.132</span> MQQBrowser/<span class="hljs-number">6.2</span> TBS/<span class="hljs-number">043807</span> Mobile Safari/<span class="hljs-number">537.36</span> MicroMessenger/<span class="hljs-number">6.6</span><span class="hljs-number">.1</span><span class="hljs-number">.1220</span>(<span class="hljs-number">0x26060135</span>) NetType/WIFI Language/zh_CN</code></pre>
<ul><li><h4>Android-QQ</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (Linux; Android 4.4.2; PE-TL20 Build/HuaweiPE-TL20; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043807 Mobile Safari/537.36 V1_AND_SQ_7.3.2_762_YYB_D QQ/7.3.2.3350 NetType/WIFI WebP/0.3.0 Pixel/1080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (Linux; Android <span class="hljs-number">4.4</span><span class="hljs-number">.2</span>; PE-TL20 Build/HuaweiPE-TL20; wv) AppleWebKit/<span class="hljs-number">537.36</span> (KHTML, like Gecko) Version/<span class="hljs-number">4.0</span> Chrome/<span class="hljs-number">57.0</span><span class="hljs-number">.2987</span><span class="hljs-number">.132</span> MQQBrowser/<span class="hljs-number">6.2</span> TBS/<span class="hljs-number">043807</span> Mobile Safari/<span class="hljs-number">537.36</span> V1_AND_SQ_7<span class="hljs-number">.3</span><span class="hljs-number">.2</span>_762_YYB_D QQ/<span class="hljs-number">7.3</span><span class="hljs-number">.2</span><span class="hljs-number">.3350</span> NetType/WIFI WebP/<span class="hljs-number">0.3</span><span class="hljs-number">.0</span> Pixel/<span class="hljs-number">1080</span></code></pre>
<ul><li><h4>Android-微博</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (Linux; Android 4.4.2; PE-TL20 Build/HuaweiPE-TL20) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 Weibo (HUAWEI-PE-TL20__weibo__8.0.2__android__android4.4.2)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Mozilla/<span class="hljs-number">5.0</span> (Linux; Android <span class="hljs-number">4.4</span><span class="hljs-number">.2</span>; PE-TL20 Build/HuaweiPE-TL20) AppleWebKit/<span class="hljs-number">537.36</span> (KHTML, like Gecko) Version/<span class="hljs-number">4.0</span> Chrome/<span class="hljs-number">30.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> Mobile Safari/<span class="hljs-number">537.36</span> Weibo (HUAWEI-PE-TL20__weibo__8<span class="hljs-number">.0</span><span class="hljs-number">.2</span>__android__android4<span class="hljs-number">.4</span><span class="hljs-number">.2</span>)
</code></pre>
<p>配置完成之后，就可以像我一样，在电脑上切换环境啦：</p>
<p><span class="img-wrap"><img data-src="/img/bV2suw?w=198&amp;h=401" src="https://static.alili.tech/img/bV2suw?w=198&amp;h=401" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">源代码以及库文件使用，请参见：<a href="https://github.com/sunhaikuo/js-arouse-app" rel="nofollow noreferrer" target="_blank">Github，用力点我</a>
</h3>
<h3 id="articleHeader7">扫码验证</h3>
<p>整个唤起流程，可以访问这个下载入口：<a href="https://party.mtime.cn/download" rel="nofollow noreferrer" target="_blank"></a><a href="https://party.mtime.cn/download" rel="nofollow noreferrer" target="_blank">https://party.mtime.cn/download</a><br>也可以扫码：</p>
<p><span class="img-wrap"><img data-src="/img/bV2srd?w=376&amp;h=380" src="https://static.alili.tech/img/bV2srd?w=376&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js在微信、微博、QQ、Safari唤起App的解决方案

## 原文链接
[https://segmentfault.com/a/1190000012940046](https://segmentfault.com/a/1190000012940046)

