---
title: '深究WeixinJSBridge未定义之因' 
date: 2019-01-26 2:30:18
hidden: true
slug: wa35461wvq
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://wwww.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>并没有使用<a href="http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html" rel="nofollow noreferrer" target="_blank">微信JS-SDK</a>，然而却收到了<code>WeixinJSBridge is not defined</code>的报错： </p>
<p><span class="img-wrap"><img data-src="/img/bVJ301?w=516&amp;h=211" src="https://static.alili.tech/img/bVJ301?w=516&amp;h=211" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们的用户也收到了类似的错误报警，并且很多开发者都遇到类似的问题:</p>
<ul>
<li>我的微信项目，没有用到微信JS-SDK，但iphone部分手机点击某些功能无效，后来加了window.onerror监控，发现有Uncaught ReferenceError: WeixinJSBridge is not defined报错;</li>
<li>从微信进入支付中心直接唤起微信支付时有时会抛出ReferenceError：weixinJSBridge is not defined的异常;</li>
<li>使用AppCan生成Web/微信App版，调用微信JSAPI支付方式，提示WeixinJSBridge内置对象undefined;</li>
<li>......</li>
</ul>
<p>由此可见，这是一个非常普遍的问题。但是如果没有在测试阶段没有遇到过，然后又没有做线上错误监控的话，就很难发现这个问题。我们在这里将这个错误进行一些分析，让大家少走弯路。</p>
<h3 id="articleHeader0">什么是微信JS-SDK?</h3>
<p>这里引用<a href="http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html" rel="nofollow noreferrer" target="_blank">官方文档</a>:</p>
<blockquote>微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。</blockquote>
<h3 id="articleHeader1">Q&amp;A</h3>
<h4>我没有使用微信JS-SDK, 为什么会报错呢？</h4>
<p>微信内置浏览器会有WeixinJSBridge，但是需要一定的加载时间。</p>
<h4>我使用了微信JS-SDK, 为什么会报错呢？</h4>
<p>微信webview注入钩子有时序问题：在<code>WeixinJSBridge</code>还未注入之前，就已经成功注入其它依赖于<code>WeixinJSBridge</code>的其它XX模块。在XX模块中调用<code>WeixinJSBridge</code>就会失败。</p>
<h3 id="articleHeader2">如何解决？</h3>
<p>如果你开发一款移动应用，必不可少要考虑分享到微信的功能；如果你开发网页，那么用户之间的分享更多的也是通过微信。那么这个问题到底有多严重，如何解决也变得至关重要。</p>
<h4>未使用微信JS-SDK</h4>
<p>如果网页中未使用微信JS-SDK, 用户在微信中打开网站可能会触发这个错误，目前看来只有忽略。因为是微信JS-SDK自身的问题，我们也无法控制。</p>
<h4>关于微信支付</h4>
<p><strong>方法1</strong> </p>
<p>监听ready事件之后再进行下一步操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (typeof window.WeixinJSBridge == &quot;undefined&quot;) {
     $(document).on('WeixinJSBridgeReady', function() {
         $('#weiXinPay').click();
     });
 } else {
     $('#weiXinPay').click();
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.WeixinJSBridge == <span class="hljs-string">"undefined"</span>) {
     $(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'WeixinJSBridgeReady'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
         $(<span class="hljs-string">'#weiXinPay'</span>).click();
     });
 } <span class="hljs-keyword">else</span> {
     $(<span class="hljs-string">'#weiXinPay'</span>).click();
 }</code></pre>
<p><strong>方法2</strong> </p>
<p>直接使用JS-SDK文档中的支付代码，不要使用公众号支付文档里面的代码。具体请参考<a href="https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E5.8F.91.E8.B5.B7.E4.B8.80.E4.B8.AA.E5.BE.AE.E4.BF.A1.E6.94.AF.E4.BB.98.E8.AF.B7.E6.B1.82" rel="nofollow noreferrer" target="_blank">微信JS-SDK说明文档 - 微信支付</a></p>
<p>PS: 关于这个问题的帖子从2014年开始就有了，然而问题依然存在，希望微信的同学能够给出官方的解决方案。</p>
<h3 id="articleHeader3">参考链接</h3>
<ul>
<li><a href="http://www.henkuai.com/forum.php?mod=viewthread&amp;tid=7450" rel="nofollow noreferrer" target="_blank">Uncaught ReferenceError: WeixinJSBridge is not defined</a></li>
<li><a href="http://www.henkuai.com/thread-8365-1-1.html" rel="nofollow noreferrer" target="_blank">Uncaught ReferenceError: WeixinJSBridge is not defined问题</a></li>
<li><a href="http://www.java-bbs.com/thread-14-1-1.html" rel="nofollow noreferrer" target="_blank">微信支付问题：Uncaught ReferenceError: WeixinJSBridge is not defined </a></li>
<li><a href="http://bbs.blueidea.com/thread-3103040-1-1.html" rel="nofollow noreferrer" target="_blank">传说中的WeixinJSBridge和微信rest接口</a></li>
<li><a href="https://github.com/whq731/mobile-problems/blob/master/%E7%9B%91%E5%90%ACwxbridge%E5%8A%A0%E8%BD%BD%E5%90%8E%E5%86%8D%E5%94%A4%E8%B5%B7%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.md" rel="nofollow noreferrer" target="_blank">监听wxbridge加载后再唤起微信支付</a></li>
</ul>
<h3 id="articleHeader4">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了7亿+错误事件，得到了Google、360、金山软件、百姓网等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016656970?w=400&amp;h=225" src="https://static.alili.tech/img/remote/1460000016656970?w=400&amp;h=225" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">版权声明</h3>
<p>转载时请注明作者<a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>以及本文地址：<br><a href="https://blog.fundebug.com/2017/02/18/weixinjsbridge-is-not-defined/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/02/18/weixinjsbridge-is-not-defined/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深究WeixinJSBridge未定义之因

## 原文链接
[https://segmentfault.com/a/1190000008408110](https://segmentfault.com/a/1190000008408110)

