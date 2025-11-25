---
title: '[译] 唯快不破：Web 应用的 13 个优化步骤' 
date: 2019-02-08 2:30:41
hidden: true
slug: kqtxxkl1cq8
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎关注<a href="https://zhuanlan.zhihu.com/no-backend" rel="nofollow noreferrer" target="_blank">知乎专栏 —— 前端的逆袭</a><br>欢迎关注我的<a href="http://blog.jimmylv.info/" rel="nofollow noreferrer" target="_blank">博客</a>，<a href="https://www.zhihu.com/people/JimmyLv" rel="nofollow noreferrer" target="_blank">知乎</a>，<a href="https://github.com/JimmyLv" rel="nofollow noreferrer" target="_blank">GitHub</a>。</p>
<hr>
<blockquote><p>译文地址：<a href="https://zhuanlan.zhihu.com/p/21417465?refer=no-backend" rel="nofollow noreferrer" target="_blank">【译】唯快不破：Web 应用的 13 个优化步骤 - 前端的逆袭 - 知乎专栏</a><br>原文地址：<a href="https://auth0.com/blog/2016/02/22/12-steps-to-a-faster-web-app/" rel="nofollow noreferrer" target="_blank">12 Steps to a Faster Web App -- Auth0</a></p></blockquote>
<p>时过境迁，Web 应用比以往任何时候都更具交互性。搞定性能可以帮助你极大地改善终端用户的体验。阅读以下的技巧并学以致用，看看哪些可以用来改善延迟，渲染时间以及整体性能吧！</p>
<h2 id="articleHeader0">更快的 Web 应用</h2>
<p>优化 Web 应用是一项费劲的工作。Web 应用不仅处于客户端和服务器端的两部分组件当中，通常来说也是由多种多样的技术栈构建而成：数据库，后端组件（一般也是搭建在不同技术架构之上的），以及前端（HTML + JavaScript + CSS + 转化器）。运行时也是变化多端的：iOS，Android，Chrome，Firefox，Edge。如果你曾经工作在一个不同的单一庞大的平台之上，通常情况下性能优化只针对于单一目标（甚至只是目标的单一版本而已），但是现在的话你就可能会意识到任务复杂度要远超于此。这就对了。但这儿也有一些通用的优化指南可以大大优化一个应用。我们将会在接下来的章节中探讨这些指南的内容。</p>
<blockquote><p>一份 Bing 的研究表明，页面加载时间每增加 10ms，网站的年收入就会减少 25 万美元。 —— <strong>Rob Trace 和 David Walp，微软高级程序经理</strong></p></blockquote>
<h3 id="articleHeader1">过早优化？</h3>
<p>优化最难的地方就是如何在开发生命周期中最适当的时候去做优化。Donald Knuth 有一句名言：_「过早优化乃万恶之源」_。这句话背后的原因非常简单：因为一不小心就会浪费时间去优化某个 1% 的地方，但是结果却并不会对性能造成什么重大影响。与此同时，一些优化还妨碍了可读性或者是可维护性，甚至还会引入新的 Bug。换句话说，优化不应当被认为是「意味着得到应用程序的最佳性能」，而是「探索优化应用的_正确的方式_，并得到_最大的效益_」。再换句话说，盲目的优化可能会导致效率的丢失，而收益却很小。在你应用以下技巧的时候请将此铭记在心。你最好的朋友就是分析工具：找到你可以进行通过优化获得最大程度改善的性能点，而不用损害应用开发的进程或者可维护性。</p>
<blockquote><p>程序员们浪费了大量时间来思考，或者说是担忧，他们的程序中非关键部分的运行速度。并且他们对于性能的这些尝试，实际上却对代码的调试和维护有着非常消极的影响。我们应当忘记那些不重要的性能影响，在 97% 的时间里都可以这么说：过早优化乃万恶之源。当然我们也不应当在那关键的 3% 上放弃我们的机会。—— Donald Knuth</p></blockquote>
<h2 id="articleHeader2">1. JavaScript 压缩和模块打包</h2>
<p>JavaScript 应用是以源码形式进行分发的，而源码解析的效率是要比字节码低的。对于一小段脚本来说，区别可以忽略不计。但是对于更大型的应用，脚本的大小会对应用启动时间有着负面的影响。事实上，寄期望于使用 <a href="https://auth0.com/blog/2015/10/14/7-things-you-should-know-about-web-assembly/" rel="nofollow noreferrer" target="_blank">WebAssembly</a> 而获得最大程度的改善，其中之一就是可以得到更快的启动时间。</p>
<p>另一方面，模块打包则用于将不同脚本打包在一起并放进同一文件。更少的 HTTP 请求和单个文件解析都可以减少加载时间。通常情况下，单独一种工具就可以处理打包和压缩。<a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack</a> 就是其中之一。</p>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insert(i) {
    document.write(&quot;Sample &quot; + i);
}

for(var i = 0; i < 30; ++i) {
    insert(i);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span>(<span class="hljs-params">i</span>) </span>{
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"Sample "</span> + i);
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">30</span>; ++i) {
    insert(i);
}</code></pre>
<p>结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function(r){function t(o){if(e[o])return e[o].exports;var n=e[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=r,t.c=e,t.p=&quot;&quot;,t(0)}([function(r,t){function e(r){document.write(&quot;Sample &quot;+r)}for(var o=0;30>o;++o)e(o)}]);
//# sourceMappingURL=bundle.min.js.map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r</span>)</span>{<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">t</span>(<span class="hljs-params">o</span>)</span>{<span class="hljs-keyword">if</span>(e[o])<span class="hljs-keyword">return</span> e[o].exports;<span class="hljs-keyword">var</span> n=e[o]={<span class="hljs-attr">exports</span>:{},<span class="hljs-attr">id</span>:o,<span class="hljs-attr">loaded</span>:!<span class="hljs-number">1</span>};<span class="hljs-keyword">return</span> r[o].call(n.exports,n,n.exports,t),n.loaded=!<span class="hljs-number">0</span>,n.exports}<span class="hljs-keyword">var</span> e={};<span class="hljs-keyword">return</span> t.m=r,t.c=e,t.p=<span class="hljs-string">""</span>,t(<span class="hljs-number">0</span>)}([<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">r,t</span>)</span>{<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">e</span>(<span class="hljs-params">r</span>)</span>{<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"Sample "</span>+r)}<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> o=<span class="hljs-number">0</span>;<span class="hljs-number">30</span>&gt;o;++o)e(o)}]);
<span class="hljs-comment">//# sourceMappingURL=bundle.min.js.map</span></code></pre>
<h3 id="articleHeader3">进一步打包</h3>
<p>你也可以使用 Webpack 打包 CSS 文件以及合并图片。这些特性都可以有助于改善启动时间。研究一下 <a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">Webpack 文档</a>来做些测试吧！</p>
<h2 id="articleHeader4">2. 按需加载资源</h2>
<p>资源（特别是图片）的按需加载或者说_惰性加载_，可以有助于你的 Web 应用在整体上获得更好的性能。对于使用大量图片的页面来说惰性加载有着显著的三个好处：</p>
<ul>
<li><p>减少向服务器发出的并发请求数量（这就使得页面的其他部分获得更快的加载时间）</p></li>
<li><p>减少浏览器的内存使用率（更少的图片，更少的内存）</p></li>
<li><p>减少服务器端的负载</p></li>
</ul>
<p>大体上的理念就是只在必要的时候才去加载图片或资源（如视频），比如在第一次被显示的时候，或者是在将要显示的时候对其进行加载。由于这种方式跟你建站的方式密切相关，惰性加载的解决方案通常需要借助其他库的插件或者扩展来实现。举个例子，<a href="https://github.com/loktar00/react-lazy-load" rel="nofollow noreferrer" target="_blank">react-lazy-load</a> 就是一个用于处理 React 惰性加载图片的插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MyComponent = () => (
  <div>
    Scroll to load images.
    <div className=&quot;filler&quot; />
    <LazyLoad height={762} offsetVertical={300}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
    (...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;div&gt;
    Scroll to load images.
    &lt;div className="filler" /&gt;
    &lt;LazyLoad height={762} offsetVertical={300}&gt;
      &lt;img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' /&gt;
    &lt;/LazyLoad&gt;
    (...)</code></pre>
<p>一个非常好的实践范例就像 Goggle Images 的<a href="https://www.google.com/search?site=&amp;tbm=isch&amp;source=hp&amp;biw=1366&amp;bih=707&amp;q=parrots&amp;oq=parrots&amp;gs_l=img.12...0.0.0.4086.0.0.0.0.0.0.0.0..0.0....0...1ac..64.img..0.0.0.UJrFBFKkWMA" rel="nofollow noreferrer" target="_blank">搜索工具</a>一样。点击前面的链接并且滑动页面滚动条就可以看到效果了。</p>
<h2 id="articleHeader5">3. 在使用 DOM 操作库时用上 array-ids</h2>
<p>如果你正在使用 <a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>，<a href="http://emberjs.com/" rel="nofollow noreferrer" target="_blank">Ember</a>，<a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">Angular</a> 或者其他 DOM 操作库，使用 array-ids（或者 Angular 1.x 中的 track-by 特性）非常有助于实现高性能，对于动态网页尤其如此。我们已经在上一篇程序衡量标准的文章中看到这个特性的效果了： <a href="https://auth0.com/blog/2016/01/11/updated-and-improved-more-benchmarks-virtual-dom-vs-angular-12-vs-mithril-js-vs-the-rest/" rel="nofollow noreferrer" target="_blank">More Benchmarks: Virtual DOM vs Angular 1 &amp; 2 vs Mithril.js vs cito.js vs The Rest (Updated and Improved!)</a>。<span class="img-wrap"><img data-src="/img/remote/1460000006816764" src="https://static.alili.tech/img/remote/1460000006816764" alt="" title="" style="cursor: pointer;"></span></p>
<p>此特性背后的主要概念就是尽可能多地重用已有的节点。<strong>Array ids</strong> 使得 DOM 操作引擎可以「知道」在什么时候某个节点可以被映射到数组当中的某个元素。没有 <strong>array-ids</strong> 或者 <strong>track-by</strong> 的话，大部分库都会进行重新排序而摧毁已有的节点并重新创建新的。这就非常损耗性能了。</p>
<h2 id="articleHeader6">4. 缓存</h2>
<p><a href="https://en.wikipedia.org/wiki/Cache_%28computing%29" rel="nofollow noreferrer" target="_blank">Caches</a> 是用于存储那些被频繁存取的静态数据的组件，便于随后对于这个数据的请求可以更快地被响应，或者说请求方式更加高效。由于 Web 应用是由很多可拆卸的部件组合而成，缓存就可以存在于架构中的很多部分。举例来说，缓存可以被放在动态内容服务器和客户端之间，就可以避免公共请求以减少服务器的负载，与此同时改善响应时间。其他缓存可能被放置在代码里，以优化某些用于脚本存取的通用模式，还有些缓存可能被放置在数据库或者是长运行进程之前。</p>
<p>简而言之，在 Web 应用中使用缓存是一种改善响应时间和减少 CPU 使用的绝佳方式。难点就在于搞清楚哪里才是在架构中存放缓存的地方。再一次，答案就是性能分析：常见的瓶颈在哪里？数据或者结果可缓存吗？他们都太容易失效吗？这都是一些棘手的问题，需要从原理上来一点一点回答。</p>
<p>缓存的使用在 Web 环境中富有创造性。比如，<a href="https://addyosmani.com/basket.js/" rel="nofollow noreferrer" target="_blank">basket.js</a> 就是一个使用_Local Storage_ 来缓存应用脚本的库。所以你的 Web 应用在第二次运行脚本的时候就可以几乎瞬间加载了。</p>
<p>如今一个广受欢迎的缓存服务就是亚马逊的 <a href="https://aws.amazon.com/cloudfront/dynamic-content/" rel="nofollow noreferrer" target="_blank">CloudFront</a>。CloudFront 就跟通常的内容分发网络（CDN）用途一样，可以被设置作为动态内容的缓存。</p>
<h2 id="articleHeader7">5. 启用 HTTP/2</h2>
<p>越来越多的浏览器都开始支持 HTTP/2。这可能听起来没有必要，但是 HTTP/2 为同一服务器的并发连接问题带来了很多好处。换句话说，如果有很多小型资源需要加载（如果你打包过的话就没有必要了），在延迟和性能方面 HTTP/2 秒杀 HTTP/1。试试 <a href="https://http2.akamai.com/demo" rel="nofollow noreferrer" target="_blank">Akamai 的 HTTP/2 demo</a>，可以在最新的浏览器中看到区别。<span class="img-wrap"><img data-src="/img/remote/1460000005798309" src="https://static.alili.tech/img/remote/1460000005798309" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">6. 应用性能分析</h2>
<p>性能分析是优化任何应用程序时的重要一步。就像介绍中所提到的那样，盲目尝试优化应用经常会导致效率的浪费，微不足道的收益和更差的可维护性。执行性能分析是识别你的应用问题所在的一个重要步骤。</p>
<p>对于 Web 应用来说，延迟时间是最大的抱怨之一，所以你需要确保数据的加载和显示都尽可能得快。Chrome 提供了非常棒的性能分析工具。特别是 Chrome Dev Tools 中的时间线和网络视图都对于定位延迟问题有着很大的帮助：<span class="img-wrap"><img data-src="/img/remote/1460000005798311" src="https://static.alili.tech/img/remote/1460000005798311" alt="" title="" style="cursor: pointer;"></span></p>
<p>时间线视图可以帮忙找到运行时间较长的操作。<span class="img-wrap"><img data-src="/img/remote/1460000005798313" src="https://static.alili.tech/img/remote/1460000005798313" alt="" title="" style="cursor: pointer;"></span></p>
<p>网络视图可以帮助识别出额外的由缓慢请求导致的延迟或对于某一端点的串行访问。</p>
<p>正确分析的话，内存则是另一块可能获得收益的部分。如果你正在运行着一个拥有很多虚拟元素的页面（庞大的动态表格）或者可交互式的元素（比如游戏），内存优化可以获得更少的卡顿和更高的帧率。从我们最近的文章 <a href="https://auth0.com/blog/2016/01/26/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/" rel="nofollow noreferrer" target="_blank">4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them</a> 中，对于如何使用 Chrome 的开发工具有着进一步的深度理解。</p>
<p>CPU 性能分析也可以在 Chrome Dev Tools 中找到。看看这篇来自 Google 官方文档中的文章 <a href="https://developer.chrome.com/devtools/docs/cpu-profiling" rel="nofollow noreferrer" target="_blank">Profiling JavaScript Performance</a>。<span class="img-wrap"><img data-src="/img/remote/1460000005798315" src="https://static.alili.tech/img/remote/1460000005798315" alt="" title="" style="cursor: pointer;"></span></p>
<p>找到性能损耗的中心可以让你有效率地达到优化的目标。</p>
<p>对后端的性能分析会更加困难。通常情况下，确认一个耗费较多时间的请求可以让你明确应该优先分析哪一个服务。对于后端的分析工具来说，则取决于所构建的技术栈。</p>
<h3 id="articleHeader9">一个关于算法的注意事项</h3>
<p>在大多数情况下，选择一个更优的算法，比围绕着小成本中心所实现的具体优化策略能够获得更大的收益。在某种程度上，CPU 和内存分析应该可以帮你找到大的性能瓶颈。当这些瓶颈跟编码问题并不相关时，则是时候考虑考虑不同的算法了。</p>
<h2 id="articleHeader10">7. 使用负载均衡方案</h2>
<p>我们在之前讨论缓存的时候简要提到了内容分发网络（CDNs）。把负载分配到不同的服务器（甚至于不同的地理区域）可以给你的用户提供更好的延迟时间，但是这条路还很漫长，特别是在处理很多的并发连接的时候。</p>
<p>负载均衡就跟使用某个 round-robin（循环）解决方案一样简单，可以基于一个 <a href="http://nginx.org/en/docs/http/load_balancing.html" rel="nofollow noreferrer" target="_blank">nginx 反向代理</a> ，或者基于一个成熟的分布式网络，比如 <a href="https://www.cloudflare.com/" rel="nofollow noreferrer" target="_blank">Cloudflare</a> 或者 <a href="https://aws.amazon.com/cloudfront/" rel="nofollow noreferrer" target="_blank">Amazon CloudFront</a>。<span class="img-wrap"><img data-src="/img/remote/1460000005798317" src="https://static.alili.tech/img/remote/1460000005798317" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>以上的图来自于 <a href="http://docs.citrix.com/content/dam/docs/en-us/legacy-edocs/netscaler-traffic-management-10-5-map/LB-Round_Robin_Mechanism.PNG" rel="nofollow noreferrer" target="_blank">Citrix</a>。 为了使负载均衡真正有效，动态内容和静态内容都应该被拆分成易于并发访问的。换句话说，元素的串形访问会削弱负载均衡器以最佳形式进行分流的能力。与此同时，对于资源的并发访问可以改善启动时间。</p></blockquote>
<p>虽然负载均衡可能会很复杂。对最终一致性算法不友好的数据模型，或者缓存都会让事情更加困难。幸运的是，大多数应用对于已简化的数据集都只需要保证高层次的一致性即可。如果你的应用程序没有这样设计的话，就有必要重构一下了。</p>
<h2 id="articleHeader11">8. 为了更快的启动时间考虑一下同构 JavaScript</h2>
<p>改善 Web 应用程序观感的方式之一，就是减少启动时间或者减少首页渲染时间。这对于新兴的单页面应用尤为重要，其需要在客户端执行大量任务。在客户端做更多事情通常就意味着，在第一次渲染被执行之前就需要下载更多的信息。同构 JavaScript 可以解决这个问题：自从 JavaScript 可以同时运行在客户端和服务器端，这就让在服务器端来执行页面的首次渲染成为可能，先把已渲染的页面发送出去然后再由客户端的脚本接管。这限制了所使用的后端（必须使用支持该特性的 JavaScript 框架），但却能获得更好的用户体验。举例来说，React 就很<a href="https://github.com/DavidWells/isomorphic-react-example" rel="nofollow noreferrer" target="_blank">适合于</a>做这个，就像以下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require('react/addons');
var ReactApp = React.createFactory(require('../components/ReactApp').ReactApp);

module.exports = function(app) {

    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        var reactHtml = React.renderToString(ReactApp({}));
        // Output html rendered by react
        // console.log(myAppHtml);
        res.render('index.ejs', {reactOutput: reactHtml});
    });

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react/addons'</span>);
<span class="hljs-keyword">var</span> ReactApp = React.createFactory(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../components/ReactApp'</span>).ReactApp);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{

    app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
        <span class="hljs-comment">// React.renderToString takes your component</span>
        <span class="hljs-comment">// and generates the markup</span>
        <span class="hljs-keyword">var</span> reactHtml = React.renderToString(ReactApp({}));
        <span class="hljs-comment">// Output html rendered by react</span>
        <span class="hljs-comment">// console.log(myAppHtml);</span>
        res.render(<span class="hljs-string">'index.ejs'</span>, {<span class="hljs-attr">reactOutput</span>: reactHtml});
    });

};</code></pre>
<p><a href="https://www.meteor.com/" rel="nofollow noreferrer" target="_blank">Meteor.js</a> 对于客户端和服务器端的 JavaScript 混用有着非常棒的支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return &quot;Welcome to myapp.&quot;;
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log(&quot;You pressed the button&quot;);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (Meteor.isClient) {
  Template.hello.greeting = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Welcome to myapp."</span>;
  };

  Template.hello.events({
    <span class="hljs-string">'click input'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// template data, if any, is available in 'this'</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span> !== <span class="hljs-string">'undefined'</span>)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"You pressed the button"</span>);
    }
  });
}

<span class="hljs-keyword">if</span> (Meteor.isServer) {
  Meteor.startup(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// code to run on server at startup</span>
  });
}</code></pre>
<p>但是，为了支持服务器端渲染，需要像 <a href="https://github.com/meteorhacks/meteor-ssr" rel="nofollow noreferrer" target="_blank">meteor-ssr</a> 这样的插件。</p>
<blockquote><p>谢谢 gabrielpoca 在评论中指出这一点。如果你有复杂的或者中等大小的应用需要支持同构部署，试试这个，你可能会感到惊讶的。</p></blockquote>
<h2 id="articleHeader12">9. 使用索引加速数据库查询</h2>
<p>如果你需要解决数据库查询耗费大量时间的问题（分析你的应用看看是否是这种情况！），是时候找出加速数据库的方法了。每个数据库和数据模型都有自己的权衡。数据库优化在每一方面都是一个主题：数据模型，数据库类型，具体实现方案，等等。提速可能不是那么的简单。但是这儿有个建议，可能可以对某些数据库有所帮助：<a href="https://en.wikipedia.org/wiki/Database_index" rel="nofollow noreferrer" target="_blank">索引</a>。索引是一个过程，即数据库所创建的快速访问数据结构，从内部映射到键（在关系数据库中的列），可以提高检索相关数据的速度。大多数现代数据库都支持索引。索引并不是文档型数据库（比如 <a href="https://docs.mongodb.org/manual/indexes/" rel="nofollow noreferrer" target="_blank">MongoDB</a>）所独有的，也包括关系型数据库（比如<a href="http://www.postgresql.org/docs/9.1/static/indexes.html" rel="nofollow noreferrer" target="_blank">PostgreSQL</a>）。</p>
<p>为了使用索引来优化你的查询，你将需要研究一下应用程序的访问模式：什么是最常见的查询，在哪个键或列中执行搜索，等等。</p>
<h2 id="articleHeader13">10. 使用更快的转译方案</h2>
<p>JavaScript 软件技术栈一如既往的复杂。而改善语言本身的需求则又增加了复杂度。不幸地是，JavaScript 作为目标平台又会被用户的运行时所限制。尽管很多改进已经以 ECMAScript 2015（2016正在进行）的形式实现了，但是通常情况下，对客户端代码来说又不可能依赖于这个版本。这种趋势促使了一系列的_转译器_：用于处理 ECMAScript 2015 代码的工具和只使用 ECMAScript 5 结构实现其中所缺失的特性。与此同时，模块绑定和压缩处理也已经被集成到这个生产过程中，被称为_为发布而构建_的代码版本。这些工具可以转化代码，并且能够以有限的方式影响到最终代码的性能。Google 开发者 Paul Irish <a href="https://github.com/paulirish/The-cost-of-transpiling-es2015-in-2016" rel="nofollow noreferrer" target="_blank">花了一些时间</a>来寻找这些转译方案会如何影响性能和最终代码的大小。尽管大多数情况下收益会很小，但也值得在正式采用某个工具栈之前看看这些数据。对于大型应用程序来说，这种区别可能会影响重大。</p>
<h2 id="articleHeader14">11. 避免或最小化 JavaScript 和 CSS 的使用而阻塞渲染</h2>
<p>JavaScript 和 CSS 资源都会阻塞页面的渲染。通过采取某些的规则，你可以保证你的脚本和 CSS 被尽可能快速地处理，以便于浏览器能够显示你的网站内容。</p>
<p>在 CSS 的情况下这是非常重要的，所有的 CSS 规则都不能与特定媒体直接相关，规则只用于处理你准备在页面上所显示内容的优先级。这可以通过使用 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" rel="nofollow noreferrer" target="_blank">CSS 媒体查询</a>来实现。媒体查询告诉浏览器，哪些 CSS 样式表应用在某个特定的显示媒体上。举个例子，用于打印的某些规则可以被赋予比用于屏幕显示更低的优先级。</p>
<p>媒体查询可以被设置成 &lt;link&gt; 标签属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; media=&quot;only screen and (max-device-width: 480px)&quot; href=&quot;mobile-device.css&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"only screen and (max-device-width: 480px)"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"mobile-device.css"</span> /&gt;</span></code></pre>
<p>轮到 JavaScript 了，关键就在于遵循某些用于内联 JavaScript 的规则（比如内联在 HTML 文件当中的代码）。内联 JavaScript 应该尽可能短，并将其放在不会阻塞页面剩余部分解析的地方。换句话说，被放在 HTML 树中间的内联 JavaScript 将会在这个地方阻塞解析器，并强制其等待直到脚本被执行完毕。如果在 HTML 文件中随意放了一些大的代码块或者很多小的代码块，对于性能来说这会成为性能杀手。内联可以有效减少额外对于某些特定脚本的网络请求。但是对于重复使用的脚本或者大的代码块来说，这个好处就可以忽略不计了。</p>
<p>防止 JavaScript 阻塞解析器和渲染器的一种方法就是将 &lt;script&gt; 标签标记为_异步的_。这限制了我们对于 DOM 的访问但是可以让浏览器不管脚本的执行状态而继续解析和渲染页面。换句话说，为了获得最佳的启动时间，确保那些对于渲染不重要的脚本已经通过异步属性的方式标记成异步的了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;async.js&quot; async></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"async.js"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader15">12. 用于未来的一个建议：使用 service workers + 流</h2>
<p><a href="https://jakearchibald.com/2016/streams-ftw/#streaming-results" rel="nofollow noreferrer" target="_blank">Jake Archibald</a> 最近的一篇博文详细描述了一种有趣的技术，可以用于加速渲染时间：将 service workers 和流结合起来。结果非常令人叹服：</p>
<p>不幸的是这个技术所需要的 APIs 都还不稳定，这也是为什么这是一种有趣的概念但现在还没有真正被应用的原因。这个想法的主旨就是在网站和客户端之间放置一个 service worker。这个 service worker 可以在获取缺失信息的同时缓存某些数据（比如 header 和一些不会经常改变的东西）。缺失的内容就可以尽可能快速地流向被渲染的页面。</p>
<p><a href="https://www.youtube.com/watch?v=Cjo9iq8k-bc" rel="nofollow noreferrer" target="_blank">https://www.youtube.com/watch?v=Cjo9iq8k-bc</a></p>
<h2 id="articleHeader16">13. 更新：图片编码优化</h2>
<p>我们的<a href="https://twitter.com/dennisl/status/702123202118447105" rel="nofollow noreferrer" target="_blank">一个读者</a>指出了一个非常重要的遗漏：图片编码优化。PNGs 和 JPGs 在 Web 发布时都会使用次优的设置进行编码。通过改变编码器和它的设置，对于需要大量图片的网站来说可以获得有效的改善。流行的解决方案包括 <a href="http://optipng.sourceforge.net/" rel="nofollow noreferrer" target="_blank">OptiPNG</a> 和<a href="http://jpegclub.org/jpegtran/" rel="nofollow noreferrer" target="_blank">jpegtran</a>。</p>
<p><a href="http://optipng.sourceforge.net/pngtech/optipng.html" rel="nofollow noreferrer" target="_blank">A guide to PNG optimization</a> 详细描述了 OptiPNG 可以如何用于优化 PNGs。</p>
<p><a href="http://linux.die.net/man/1/jpegtran" rel="nofollow noreferrer" target="_blank">The man page for jpegtran</a> 对它的一些特性提供了很好的介绍。</p>
<p>如果你发现这些指南相对于你的要求来说都太复杂了的话，这儿有一些在线网站可以提供优化服务。也有一些像 <a href="http://luci.criosweb.ro/riot/" rel="nofollow noreferrer" target="_blank">RIOT</a> 一样的图形化界面，非常有助于批量操作和结果检查。</p>
<h2 id="articleHeader17">扩展阅读</h2>
<p>你可以在下面的链接中阅读更多信息，以及找到有助于优化网站的工具：</p>
<ul>
<li><p><a href="https://github.com/paulirish/The-cost-of-transpiling-es2015-in-2016" rel="nofollow noreferrer" target="_blank">Best Practices for Speeding up Your Website - Yahoo Developer Network</a></p></li>
<li><p><a href="http://yslow.org/" rel="nofollow noreferrer" target="_blank">YSlow - a tool that checks for Yahoo's recommended optimizations</a></p></li>
<li><p><a href="https://developers.google.com/speed/docs/insights/rules" rel="nofollow noreferrer" target="_blank">PageSpeed Insights - Google Developers</a></p></li>
<li><p><a href="https://developers.google.com/speed/pagespeed/" rel="nofollow noreferrer" target="_blank">PageSpeed Tools - Google Developers</a></p></li>
<li><p><a href="http://blogs.msdn.com/b/ie/archive/2014/10/08/http-2-the-long-awaited-sequel.aspx" rel="nofollow noreferrer" target="_blank">HTTP/2: The Long-Awaited Sequel</a></p></li>
</ul>
<h2 id="articleHeader18">悄悄话：Auth0 中常见的优化</h2>
<p>我们是一个 Web 公司。就以这种身份来说，我们为我们的基础设施的某些部分部署了一些特定的优化。举例来说，在登录页面你可以发现，在我们域名的 /learn 路径下（比如，<a href="https://auth0.com/learn/how-to-implement-single-sign-on/" rel="nofollow noreferrer" target="_blank">登录页面的单点登录</a>），我们采用了一种特别的优化：为了方便我们使用 CMS 来创建每篇文章。因为文章都没有中心索引，但是为了能够被搜索引擎发现，使用了 <a href="https://webtask.io/" rel="nofollow noreferrer" target="_blank">webtask</a> 的爬虫来预渲染每个页面并生成了一个静态版本然后上传到我们 CDN。这减少了我们在服务器端上的压力，因为无须为每个访客都生成动态的服务器端内容。与此同时还改善了延迟（并且隔离了我们发现与 CMS 相关的安全问题）。</p>
<p>对于<a href="https://auth0.com/docs" rel="nofollow noreferrer" target="_blank">文档部分</a>，我们正在使用_同构 JavaScript_，这让我们获得了非常棒的启动时间，并且使我们的后端和前端团队能够轻松集成。</p>
<h2 id="articleHeader19">结论</h2>
<p>由于应用程序变得越来越大和越来越复杂，性能优化对于 Web 开发来说正在变得越来越重要。在做出任何值得的时间和潜在的未来成本的优化尝试时，有针对性的改进都是必不可少的。Web 应用程序早已突破了大多数静态内容的边界，学习常见模式进行优化则是令人愉悦的应用和完全不可用的应用之间最大的区别（这是让你的访客留下来的长远之计！）。没有什么规则是绝对的，但是：性能分析和研究特定软件技术栈的错综复杂之处，是找出如何优化它的唯一方式。你曾经发现过对你的应用产生巨大影响的其他建议吗？请留言让我们知道。Hack on！</p>
<hr>
<p>欢迎关注<a href="https://zhuanlan.zhihu.com/no-backend" rel="nofollow noreferrer" target="_blank">知乎专栏 —— 前端的逆袭</a><br>欢迎关注我的<a href="http://blog.jimmylv.info/" rel="nofollow noreferrer" target="_blank">博客</a>，<a href="https://www.zhihu.com/people/JimmyLv" rel="nofollow noreferrer" target="_blank">知乎</a>，<a href="https://github.com/JimmyLv" rel="nofollow noreferrer" target="_blank">GitHub</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 唯快不破：Web 应用的 13 个优化步骤

## 原文链接
[https://segmentfault.com/a/1190000005798306](https://segmentfault.com/a/1190000005798306)

