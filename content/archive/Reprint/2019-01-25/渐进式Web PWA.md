---
title: '渐进式Web PWA' 
date: 2019-01-25 2:30:23
hidden: true
slug: wa8a3i7gv6
categories: [reprint]
---

{{< raw >}}

            <p>如果你一直在关注最近几个月的web开发大会，你应该有机会了解到<a href="https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/">渐进式web app</a>(PWA)。总的来说，web体验得到极大提升。他们还推出了丰富的原生应用：<a href="https://www.smashingmagazine.com/2016/02/making-a-service-worker/">支持完全离线</a>,<a href="https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/?hl=en">安装简单</a>,"Retina",图片还原度100%，个性化登录支持，超快速度，app内流畅的浏览体验,推送通知以及非常棒的用户界面。
<a href="http://p0.qhimg.com/t013f8d9e468f4db4bc.png"><img src="http://p0.qhimg.com/t013f8d9e468f4db4bc.png" alt="从谷歌的AMP到PWA"></a></p>
<p>一些谷歌的PWA示例</p>
<p>即使新版本的<a href="https://developers.google.com/web/fundamentals/primers/service-worker/">Service Worker API</a>允许你使用即时_延迟_加载来缓存你的网站的所有资源，就像和陌生的人第一次见面，第一印象很重要。如果首次加载时间超过3秒，最新的<a href="https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/">DoubleClick调查报告</a>显示超过53%的用户会退出。</p>
<p>3秒钟已经是一个残酷的指标。移动连接平均有300ms的潜在延迟，另外还有诸如带宽限制和偶发的信号连接等问题，你可能只剩下小于1秒的总负载性能预算，以便执行初始化应用程序所需的操作。</p>
<p><a href="http://p0.qhimg.com/t018a329e815b23fd18.png"><img src="http://p0.qhimg.com/t018a329e815b23fd18.png" alt="从谷歌的AMP到PWA"></a></p>
<p>你的用户和请求内容间存在的延迟</p>
<p>的确，有不少方法可以<a href="https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4">缓解</a>首次加载缓慢这个问题—在服务器上提前渲染出页面基本布局，延迟加载函数功能模块等等—但你使用这个策略只能将速度有限地提高，因此你必须招聘一个前端性能优化人员，当然也可以是你本人。</p>
<p>所以，如果首屏加载体验与原生app完全，我们要如何实现？</p>
<h3>AMP,快速加载的移动网页</h3>
<p>网站最重要的优点之一是访问便捷—不需安装，几乎立即加载。用户从头至尾只需要点击一下。</p>
<p>为了让网站浏览变得毫不费力，你需要加载速度很快的网站。要做什么才能让你的网站变得很快呢？惯例是：拒绝高像素的图片，拒绝阻塞渲染的广告，拒绝很大的JS文件，我们需要的只是内容。</p>
<p><a href="https://www.ampproject.org/">AMPs</a>,即快速加载的移动网页，<a href="https://www.ampproject.org/docs/get_started/technical_overview.html">拥有快速加载优势</a>.事实上，这正是它们的增长策略。它就像汽车行驶时要注意交通规则一样，通过制定一系列规定来快速加载页面内容。由于规则很严格，并且很清晰，它允许谷歌搜索来提前一步<a href="https://www.ampproject.org/docs/get_started/technical_overview.html#load-pages-in-an-instant">预先加载页面视图</a>.</p>
<p><a href="http://p0.qhimg.com/t012924440770305a77.png"><img src="http://p0.qhimg.com/t012924440770305a77.png" alt="从谷歌的AMP到PWA"></a></p>
<p>首屏图片和页面标题会被预先渲染，所以浏览者可以直接看到页面内容。</p>
<h3>AMP 还是 PWA？</h3>
<p>为了使加载过程更加真实可信，你需要在加载AMP页面时使用一些限制措施。当你需要高度动态的函数处理时，比如推送通知和网络支付，甚至是任何需要额外引入JS文件的操作，AMP并不有效。除此之外，由于AMP页面常常来自于AMP缓存，你在第一次点击时不会得到更大的PWA，因为你自己的Service Worker无法运行。另一方面，在首次点击时PWA的加载速度要慢于AMP。因为AMP页面能更安全便捷地预先渲染—这个特性也让嵌入更加简单(比如导入行内查看)。</p>
<p><a href="http://p0.qhimg.com/t01ce061a82b03c2457.png"><img src="http://p0.qhimg.com/t01ce061a82b03c2457.png" alt="从谷歌的AMP到PWA"></a></p>
<p>一旦用户点击一个内置链接，他就离开了AMP缓存，你可以增加网站的功能，比如安装service worker让网站可以离线使用(当然还有更多)。</p>
<p>所以，是AMP还是PWA?即时交付和优化后交付，或者是最新的高级平台功能和灵活的应用代码？如果有一种方法能综合两者的优点呢？</p>
<h3>完美的用户体验之旅</h3>
<p>最后，起决定性作用的是你所在乎的<strong>用户体验</strong>。就像下面说的一样：</p>
<ol>
<li><p>一个用户发现了一个你的内容链接并点击了它。</p>
</li>
<li><p>内容几乎是立即加载的，这很棒。</p>
</li>
<li><p>用户被提醒并自动更新到新版本，和app一样的体验，推送通知和离线支持。</p>
</li>
<li><p>用户可以拥有接近于app的使用体验,他们可以把网站添加到主屏幕上。</p>
</li>
</ol>
<p>跳转到你的网站首先要快速，浏览过程应该更能让人更多地参与进来。</p>
<p>听着有点不太现实？好吧，如果我们能<strong>合并这两种技术</strong>—尽管第一眼看起来他们不太相关并且满足的需求不同？</p>
<h3>PWAMP 合并示例</h3>
<p>为了实现j即时加载，自动更新的功能，你需要做的就是通过以下方式将AMP的优点和PWA的丰富功能合为一体：</p>
<ul>
<li><strong>和PWA类似的AMP</strong></li>
</ul>
<p>当你可以忍受AMP的局限性。</p>
<ul>
<li><strong>从AMP到PWA</strong></li>
</ul>
<p>当你想要在两者间平稳的转换。</p>
<ul>
<li><strong>PWA中的AMP</strong></li>
</ul>
<p>当你想要复用多个AMP作为PWA的数据源。</p>
<p>我们会一一为大家介绍。</p>
<h3>和PWA类似的AMP</h3>
<p>许多网站不需要措施来克服AMP的界限。<a href="https://ampbyexample.com/">AMP示例</a>就是一个AMP和PWA的综合体。</p>
<ul>
<li><p>它有service worker，所以允许离线访问。</p>
</li>
<li><p>它有一个清单，提醒人们“添加程序到主屏幕”</p>
</li>
</ul>
<p>当一个用户用谷歌搜索浏览<a href="https://ampbyexample.com/">AMP示例</a>，在示例网站点击了一个链接，他们就会离开AMP缓存回到原始状态。网站仍然使用AMP库，但因为是原始状态，它可以使用service worker，可以提示添加程序到主屏。</p>
<p>你可以使用这个技巧来实现离线访问你的AMP站点,在它们的服务还是原生情况下扩展你的页面，因为你可以通过service worker的<code>fetch</code>事件修改响应，并返回一个你想要的响应。</p>
<pre><code class="hljs ada"><span class="hljs-keyword">function</span> <span class="hljs-title">createCompleteResponse</span> (header, body) {

  <span class="hljs-keyword">return</span> <span class="hljs-type">Promise.all([</span>
    header.text(),
    getTemplate(RANDOM STUFF AMP DOESN’T LIKE),
    <span class="hljs-keyword">body</span>.text()
  ]).<span class="hljs-keyword">then</span>(html =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Response(html[<span class="hljs-number">0</span>] + html[<span class="hljs-number">1</span>] + html[<span class="hljs-number">2</span>], {
      headers: {
        <span class="hljs-symbol">'Content</span>-<span class="hljs-keyword">Type</span>': <span class="hljs-symbol">'text</span>/html'
      }
    });
  });

} 
</code></pre><p>这个技术允许你在AMPs范围之外，在随后的点击中加入脚本和更多高级功能。</p>
<h4>从AMP到PWA</h4>
<p>当以上的一切还不够时，你想要完全不同的PWA体验，是时候尝试下更先进的模式了：</p>
<ul>
<li><p>所有的内容类页面（即那些有特别内容的页面而不是概览页面）以AMP形式发布，这样可以更快地加载内容。</p>
</li>
<li><p>These AMPs use AMP’s special element <a href="https://www.ampproject.org/docs/reference/extended/amp-install-serviceworker.html"><code></code></a> to warm up a cache and the PWA shell <strong>while the user is enjoying</strong> your content.</p>
</li>
<li><p>这些AMP使用AMP的<a href="https://www.ampproject.org/docs/reference/extended/amp-install-serviceworker.html">特殊元素</a>来警告会使用缓存和<strong>当用户正在浏览</strong>内容时使用PWA的“壳子”。</p>
</li>
<li><p>当用户在你的网站点击另外一个链接（比如，为了获得接近于app的使用体验在页面底部进行更多操作），service worker会拦截请求，接管页面并加载PWA外壳。</p>
</li>
</ul>
<p>你可以分为简单的三步来完成以上操作，假设你已经了解service work是如何工作的。（如果你不了解。我推荐我的大学同学 <a href="https://www.udacity.com/course/offline-web-applications--ud899">杰克的优达课程</a>）。首先，在你所有的AMP页面安装service worker。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">amp-install-serviceworker</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.your-domain.com/serviceworker.js"</span>
      <span class="hljs-attr">layout</span>=<span class="hljs-string">"nodisplay"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">amp-install-serviceworker</span>&gt;</span> 
</code></pre><p>第二步，在service worker的安装过程中，缓存PWA需要的任何资源。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> CACHE_NAME = <span class="hljs-string">'my-site-cache-v1'</span>;
<span class="hljs-keyword">var</span> urlsToCache = [
  <span class="hljs-string">'/'</span>,
  <span class="hljs-string">'/styles/main.css'</span>,
  <span class="hljs-string">'/script/main.js'</span>
];

self.addEventListener(<span class="hljs-string">'install'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-comment">// Perform install steps</span>
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cache</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Opened cache'</span>);
        <span class="hljs-keyword">return</span> cache.addAll(urlsToCache);
      })
  );
}); 
</code></pre><p>最后，在service worker中对于导航部分的请求用PWA响应而不是AMP。（接下来的代码，仅仅是很简洁的一个函数。文章最后会有一个稍微复杂的例子）</p>
<pre><code class="hljs cs">self.addEventListener(<span class="hljs-string">'fetch'</span>, <span class="hljs-keyword">event</span> =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">event</span>.request.mode === <span class="hljs-string">'navigate'</span>) {
      <span class="hljs-keyword">event</span>.respondWith(fetch(<span class="hljs-string">'/pwa'</span>));

      <span class="hljs-comment">// Immediately start downloading the actual resource.</span>
      fetch(<span class="hljs-keyword">event</span>.request.url);
    }

}); 
</code></pre><p>现在，无论用户何时点击你从AMP缓存得到的页面中的链接，service worker都会注册<code>导航</code>模式并接管服务，然后返回已经缓存的PWA。</p>
<p><a href="http://p0.qhimg.com/t011fbe6c206d70b3a3.png"><img src="http://p0.qhimg.com/t011fbe6c206d70b3a3.png" alt="从谷歌的AMP到PWA"></a></p>
<p>你可以通过安装service worker 来显著提升网站的性能。对于那些不支持service worker的浏览器，它们会跳转到无AMP缓存的另外一个页面。</p>
<p>让人感兴趣的是你现在使用了渐进增强的方法从AMP过渡到PWA。然而，这也意味着还未支持service worker的浏览器可以从AMP升级到PWA，而且不会动态地跳转到PWA。</p>
<p>AMP用 <a href="https://www.ampproject.org/docs/reference/components/amp-install-serviceworker#shell-url-rewrite">重写shell URL</a>解决了这个问题。通过为<code>标签</code>增加一个回退URL模式，用构造的AMP来重写给定页面中所有匹配的跳转到另外一个私有shell URL的链接，当然，是在检测到没有service worker支持的情况下才这样做。</p>
<pre><code class="hljs vim">&lt;amp-install-serviceworker
      src=<span class="hljs-string">"https://www.your-domain.com/serviceworker.js"</span>
      layout=<span class="hljs-string">"nodisplay"</span>
      data-<span class="hljs-keyword">no</span>-service-worker-fallback-url-<span class="hljs-keyword">match</span>=<span class="hljs-string">".*"</span>
      data-<span class="hljs-keyword">no</span>-service-worker-fallback-<span class="hljs-keyword">shell</span>-url=<span class="hljs-string">"https://www.your-domain.com/pwa"</span>&gt;
&lt;/amp-install-serviceworker&gt; 
</code></pre><p>当这些特性设置完毕，所有AMP上的导航链接都会跳转到你的PWA，无论有没有service worker。代码整洁了不少是吧？</p>
<h4>PWA里的AMP</h4>
<p>所以，现在用户使用的是PWA，你正在使用一些AJAX驱动的导航来获取JSON格式的内容。你可以这么做，但现在你需要两个完全不同的内容后端—一个生成AMP页面，另一个为你的PWA提供基于JSON的API。</p>
<p>但是仔细想想AMP到底是什么。它不仅仅是一个网站。它被设计为一个便捷内容单元。一个AMP设计为自包含并可以安全地嵌入另一个网站。如果我们可以通过增加额外的JSON API并且复用AMP作为我们PWA的数据格式来简化后端的复杂度呢？</p>
<p><a href="http://p0.qhimg.com/t015f274f0436e49bb6.png"><img src="http://p0.qhimg.com/t015f274f0436e49bb6.png" alt="从谷歌的AMP到PWA"></a></p>
<p>AMP页面可以安全地嵌入其他网站—PWA中AMP库仅被编译和加载一次。</p>
<p>当然，一个简单的方法是在框架中加载AMP页面。但iframes很慢，你需要反复重新编译并重新初始化AMP库。如今的前沿技术提供了一个更好的办法：Shadow DOM。</p>
<p>过程如下：</p>
<ol>
<li><p>PWA劫持所有的导航点击。</p>
</li>
<li><p>接下来，发出XMLHttpRequest来获取请求的AMP页面。</p>
</li>
<li><p>它把内容放进一个新的shadow root下。</p>
</li>
<li><p>最后告诉主AMP库，“你好，这有一个新文档给你。检查下吧。”（在运行时调用<code>attachShadowDoc</code>）</p>
</li>
</ol>
<p>使用这项技术，对于整个PWA而言AMP库仅执行一次编译和加载，然后每一个你给它绑定的shadow文档都是可请求的。因为你是用XMLHttpRequest来请求页面，你可以在将它插入一个新的shadow文档之前修改AMP源。你可以这样做：</p>
<ul>
<li><p>剥离不必要的东西，比如标题和页脚；</p>
</li>
<li><p>插入额外的内容，比如广告和工具提示；</p>
</li>
<li><p>用动态内容来替代静态内容。</p>
</li>
</ul>
<p>现在，你已经简化了你的PWA，并且降低了后端复杂度。</p>
<h3>准备，设置，开始！</h3>
<p>为了演示Shadow DOM操作（一个不附带PWA的AMP），AMP团队开发了一个基于React的demo<a href="https://choumx.github.io/amp-pwa/">The Scenic</a>,虚构了一个旅游杂志。</p>
<p><a href="https://choumx.github.io/amp-pwa/"><img src="http://p0.qhimg.com/t0187193e851dba142b.png" alt="从谷歌的AMP到PWA"></a></p>
<p>整个 <a href="https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa">demo</a>都能在Github上访问，但还有更奇妙的<a href="https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L92"><code>amp-document.js</code>’ React组件</a>。</p>
<h4>展示实例</h4>
<p>如果你想看真实的产品，请移步<a href="https://beta.mic.com">Mic的新版PWA</a> （测试版）：如果你使用shift键重新加载<a href="https://beta.mic.com/articles/161568/arrow-season-5-episode-9-a-major-character-returns-in-midseason-finale-maybe">随机文章</a>（它通常会忽略Service Worker）并查看源代码，你就会知道它是一个AMP页面。现在尝试点击汉堡菜单：它会重新加载最近访问的页面，但自从_使用_了PWA app的壳，看起来没有重新加载。但你确实是在PWA里（嵌入了AMP页面），还有一些花里胡哨的东西。有点偷偷摸摸，但效果很好。</p>
<h3>最后的话</h3>
<p>不得不说，我对将二者合并起来很激动。这是最佳方案。</p>
<p>请重温这些要点：</p>
<ul>
<li><p>一定要快；</p>
</li>
<li><p>对于內建部分要花功夫（通过AMP的版本协同）；</p>
</li>
<li><p>渐进增强；</p>
</li>
<li><p>一个后端负责全部；</p>
</li>
<li><p>更低的客户端复杂度；</p>
</li>
<li><p>更少的整体耗时</p>
</li>
</ul>
<p>但我们刚开始探索这种模式的演化，这是一个全新的模式。</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM">Shadow DOM参考链接</a>
<a href="https://aotu.io/notes/2016/06/24/Shadow-DOM/index.html">Shadow DOM参考文章</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
渐进式Web PWA

## 原文链接
[https://www.zcfy.cc/article/progressive-web-amps-ndash-smashing-magazine](https://www.zcfy.cc/article/progressive-web-amps-ndash-smashing-magazine)

