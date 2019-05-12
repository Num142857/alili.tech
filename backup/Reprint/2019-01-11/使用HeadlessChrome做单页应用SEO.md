---
title: '使用HeadlessChrome做单页应用SEO' 
date: 2019-01-11 2:30:07
hidden: true
slug: hcorf22bqh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>随着react、vue、angular等前端框架的流行越来越多的web应用变成了单页应用，它们的特点是异步拉取数据在浏览器中渲染出HTML。使用这些框架极大的提升web用户体验和开发效率的同时缺带来一个新问题，那就是这样的网页无法被搜索引擎收录。虽然这些web框架支持服务端渲染，但这可能又会增加开发成本。</p></blockquote>
<p>有没有一个可用于任何单页应用的SEO解决方案，让我们不用对代码做改变保持原有的开发效率？<a href="https://github.com/gwuhaolin/chrome-render" rel="nofollow noreferrer" target="_blank">chrome-render</a>可以帮我们做到这点，它通过控制HeadlessChrome渲染出最终的HTML返回给爬虫来实现。</p>
<h1 id="articleHeader0">HeadlessChrome介绍</h1>
<p>前不久chrome团队宣布chrome<a href="https://developers.google.com/web/updates/2017/04/headless-chrome" rel="nofollow noreferrer" target="_blank">支持headless模式</a>，HeadlessChrome支持chrome所具有的所有功能只不过因为不显示界面而更快资源占用更小。相比于之前的<a href="http://phantomjs.org" rel="nofollow noreferrer" target="_blank">phantomjs</a>(作者因为HeadlessChrome的推出而宣布停止维护)chrome的优势在于它又一个很强的爹(google)会一直维护它优化它，并且chrome在用户量、体验、速度、稳定性都是第一的，所以我认为HeadlessChrome会渐渐替代之前所有的HeadlessBrowser方案。</p>
<h3 id="articleHeader1">如何操控HeadlessChrome</h3>
<p>既然HeadlessChrome是以无界面模式运行的，那要怎么控制它和它交互？<br>chrome提供了远程控制接口，目前可以通过<a href="https://github.com/cyrus-and/chrome-remote-interface" rel="nofollow noreferrer" target="_blank">chrome-remote-interface</a>来用js代码向chrome发送命令进行交互。在启动chrome的时候要开启远程控制接口，然后通过 chrome-remote-interface 连接到chrome后再通过协议控制chrome。具体操作见文档：</p>
<ul>
<li><p><a href="https://developers.google.com/web/updates/2017/04/headless-chrome" rel="nofollow noreferrer" target="_blank">以headless模式和远程控制模式启动chrome</a></p></li>
<li><p><a href="https://github.com/cyrus-and/chrome-remote-interface#sample-api-usage" rel="nofollow noreferrer" target="_blank">连接到远程chrome控制它</a></p></li>
<li><p><a href="https://chromedevtools.github.io/devtools-protocol/" rel="nofollow noreferrer" target="_blank">控制chrome时支持哪些操作具体怎么用</a></p></li>
</ul>
<h1 id="articleHeader2">chrome-render原理与实践</h1>
<h3 id="articleHeader3">原理</h3>
<p>chrome-render先会通过<a href="https://github.com/gwuhaolin/chrome-runner" rel="nofollow noreferrer" target="_blank">chrome-runner</a>以headless模式启动和守护你操作上的chrome，再通过chrome-remote-interface操控chrome去访问需要被SEO的网页让chrome运行这个网页，等到包含数据的HTML被渲染出来时读取当前网页DOM转换成字符串后返回。</p>
<p>怎么知道你的网页什么时候已经渲染出包含数据的HTML了可以返回了呢？为了提升chrome-render效率，默认会在<code>domContentEventFired</code>时返回。对于复杂的场景还可以通过开启chrome-render的<code>useReady</code>选项，等到网页里调用了<code>window.chromeRenderReady()</code>时返回。</p>
<p>只渲染出了HTML还不够我们还需要检测出来着搜索引擎爬虫的访问，如果请求来着爬虫就返回chrome-render渲染后的HTML否则返回正常的单页应用所需HTML。</p>
<p>综上，整体架构如下：<br><span class="img-wrap"><img data-src="https://github.com/gwuhaolin/koa-seo/raw/master/doc/koa-seo%20arch.png" src="https://static.alili.techhttps://github.com/gwuhaolin/koa-seo/raw/master/doc/koa-seo%20arch.png" alt="koa-seo arch" title="koa-seo arch" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">实践</h3>
<p>只需以下几行简单代码就可让chrome渲染出HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ChromeRender = require('chrome-render');
ChromeRender.new().then(async(chromeRender)=>{
    const htmlString = await chromeRender.render({
       url: 'http://qq.com',
    });
});    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ChromeRender = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chrome-render'</span>);
ChromeRender.new().then(<span class="hljs-keyword">async</span>(chromeRender)=&gt;{
    <span class="hljs-keyword">const</span> htmlString = <span class="hljs-keyword">await</span> chromeRender.render({
       <span class="hljs-attr">url</span>: <span class="hljs-string">'http://qq.com'</span>,
    });
});    </code></pre>
<p>chrome-render只是做了渲染出HTML的工作，要实现SEO还需要和web服务器集成。为了方便大家使用我做了一个koa中间件<a href="https://github.com/gwuhaolin/koa-seo" rel="nofollow noreferrer" target="_blank">koa-seo</a>，要集成到你现有的项目很简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seoMiddleware = require('koa-seo');
const app = new Koa();
app.use(seoMiddleware());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> seoMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-seo'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();
app.use(seoMiddleware());</code></pre>
<p>只需像这样接入一个中间件你的单页应用就被SEO了。</p>
<h1 id="articleHeader5">应用场景扩展</h1>
<p>chrome-render除了用于通用SEO解决方案其实可以用于通用服务端渲染，因为目的都是渲染出最终的HTML再返回。针对通用服务端渲染我也做了一个koa中间件<a href="https://github.com/gwuhaolin/koa-chrome-render" rel="nofollow noreferrer" target="_blank">koa-chrome-render</a>。使用chrome-render做服务端渲染的</p>
<p>优势在于：</p>
<ul>
<li><p>通用，适用于所有单页应用</p></li>
<li><p>对原有代码几乎无改动，最多再合适的地方加个<code>window.chromeRenderReady()</code>，保持原有开发效率</p></li>
</ul>
<p>缺点在于：</p>
<ul>
<li><p>和react、vue等只带的服务端渲染相比性能低（经我测试大约 200ms vs 60ms）</p></li>
<li><p>chrome-render渲染时占用资源高，一次渲染大约占用25Mb内存，当请求量大时服务器可能扛不住。但是可以通过缓存渲染结果优化。</p></li>
</ul>
<h1 id="articleHeader6">总结</h1>
<p>大家可能会说这个很像<a href="https://prerender.io" rel="nofollow noreferrer" target="_blank">prerender.io</a>，没错思路是一样的，chrome-render的优势在于：</p>
<ul>
<li><p>chrome-render开源可自己部署，prerender要收费是商业产品</p></li>
<li><p>prerender基于已经停止维护的phantomjs</p></li>
</ul>
<p>本文中所提到的相关项目都是开源的并且有详细的使用文档，它们的文档链接如下：</p>
<ul>
<li><p><a href="https://github.com/gwuhaolin/chrome-render" rel="nofollow noreferrer" target="_blank">chrome-render</a></p></li>
<li><p><a href="https://github.com/gwuhaolin/chrome-runner" rel="nofollow noreferrer" target="_blank">chrome-runner</a></p></li>
<li><p><a href="https://github.com/gwuhaolin/koa-seo" rel="nofollow noreferrer" target="_blank">koa-seo</a></p></li>
<li><p><a href="https://github.com/gwuhaolin/koa-chrome-render" rel="nofollow noreferrer" target="_blank">koa-chrome-render</a></p></li>
</ul>
<p>喜欢的给个star，希望大家和我一起来改进它们让它们更强大。</p>
<p><a href="https://github.com/gwuhaolin/blog/issues/8" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用HeadlessChrome做单页应用SEO

## 原文链接
[https://segmentfault.com/a/1190000009954112](https://segmentfault.com/a/1190000009954112)

