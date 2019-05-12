---
title: 'Puppeteer初探--爬取并生成《ES6标准入门》PDF' 
date: 2019-01-04 2:30:10
hidden: true
slug: 0mvaxgxyj4ve
categories: [reprint]
---

{{< raw >}}

                    
<p>首先介绍<strong>Puppeteer</strong></p>
<blockquote>
<p>Puppeteer是一个node库，他提供了一组用来操纵Chrome的API（默认headless也就是无UI的chrome，也可以配置为有UI）</p>
<p>有点类似于PhantomJS，但Puppeteer是Chrome官方团队进行维护的，前景更好。</p>
<p>使用Puppeteer，相当于同时具有Linux和Chrome的能力，应用场景会非常多。就爬虫领域来说，远比一般的爬虫工具功能更丰富，性能分析、自动化测试也不在话下，今天先探讨爬虫相关</p>
</blockquote>
<p><a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions" rel="nofollow noreferrer" target="_blank">Puppeteer官方文档请猛戳这里</a></p>
<h2 id="articleHeader0">Puppeteer 核心功能</h2>
<ol>
<li>利用网页生成PDF、图片</li>
<li>爬取SPA应用，并生成预渲染内容（即“SSR” 服务端渲染）</li>
<li>可以从网站抓取内容</li>
<li>自动化表单提交、UI测试、键盘输入等</li>
<li>帮你创建一个最新的自动化测试环境（chrome），可以直接在此运行测试用例</li>
<li>捕获站点的时间线，以便追踪你的网站，帮助分析网站性能问题</li>
</ol>
<h2 id="articleHeader1">OK，基本熟悉之后，接下来进行爬虫教学：</h2>
<ol>
<li>使用<code>puppeteer.launch()</code>运行puppeteer，他会return一个promise，使用then方法获取browser实例，<a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser" rel="nofollow noreferrer" target="_blank">Browser API猛击这里</a>
</li>
<li>拿到browser实例后，通过<code>browser.newPage()</code>方法，可以得到一个page实例， <a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page" rel="nofollow noreferrer" target="_blank">猛戳 Page API</a>
</li>
<li>使用<code>page.goto()</code>方法，跳转至<a href="http://es6.ruanyifeng.com/#README" rel="nofollow noreferrer" target="_blank">ES6标准入门</a>
</li>
<li>在<code>page.evaluate()</code>方法中注册回调函数，并分析dom结构，从下图可以进行详细分析，并通过<code>document.querySelectorAll('ol li a')</code>拿到文章的所有链接<span class="img-wrap"><img data-src="/img/bVTnGO?w=891&amp;h=372" src="https://static.alili.tech/img/bVTnGO?w=891&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>拿到所有链接之后，依次爬取各个页面（也可以promise all同时抓取多个页面），使用<code>page.pdf()</code>方法打印当前页面</li>
<li>
<p>核心代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="puppeteer.launch().then(async browser => {
    let page = await browser.newPage();

    await page.goto('http://es6.ruanyifeng.com/#README');
    await timeout(2000);

    let aTags = await page.evaluate(() => {
      let as = [...document.querySelectorAll('ol li a')];
      return as.map((a) =>{
          return {
            href: a.href.trim(),
            name: a.text
          }
      });
    });

    await page.pdf({path: `./es6-pdf/${aTags[0].name}.pdf`});
    page.close()

    // 这里也可以使用promise all，但cpu可能吃紧，谨慎操作
    for (var i = 1; i < aTags.length; i++) {
      page = await browser.newPage()
      var a = aTags[i];
      await page.goto(a.href);
      await timeout(2000);
      await page.pdf({path: `./es6-pdf/${a.name}.pdf`});
      page.close();
    }

    browser.close();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">puppeteer.launch().then(<span class="hljs-keyword">async</span> browser =&gt; {
    <span class="hljs-keyword">let</span> page = <span class="hljs-keyword">await</span> browser.newPage();

    <span class="hljs-keyword">await</span> page.goto(<span class="hljs-string">'http://es6.ruanyifeng.com/#README'</span>);
    <span class="hljs-keyword">await</span> timeout(<span class="hljs-number">2000</span>);

    <span class="hljs-keyword">let</span> aTags = <span class="hljs-keyword">await</span> page.evaluate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> <span class="hljs-keyword">as</span> = [...document.querySelectorAll(<span class="hljs-string">'ol li a'</span>)];
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">as</span>.map(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span>{
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">href</span>: a.href.trim(),
            <span class="hljs-attr">name</span>: a.text
          }
      });
    });

    <span class="hljs-keyword">await</span> page.pdf({<span class="hljs-attr">path</span>: <span class="hljs-string">`./es6-pdf/<span class="hljs-subst">${aTags[<span class="hljs-number">0</span>].name}</span>.pdf`</span>});
    page.close()

    <span class="hljs-comment">// 这里也可以使用promise all，但cpu可能吃紧，谨慎操作</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; aTags.length; i++) {
      page = <span class="hljs-keyword">await</span> browser.newPage()
      <span class="hljs-keyword">var</span> a = aTags[i];
      <span class="hljs-keyword">await</span> page.goto(a.href);
      <span class="hljs-keyword">await</span> timeout(<span class="hljs-number">2000</span>);
      <span class="hljs-keyword">await</span> page.pdf({<span class="hljs-attr">path</span>: <span class="hljs-string">`./es6-pdf/<span class="hljs-subst">${a.name}</span>.pdf`</span>});
      page.close();
    }

    browser.close();
});</code></pre>
</li>
</ol>
<h2 id="articleHeader2">完整代码访问 Github</h2>
<p><a href="https://github.com/zhentaoo/puppeteer-deep" rel="nofollow noreferrer" target="_blank">https://github.com/zhentaoo/p...</a></p>
<h2 id="articleHeader3">效果如下，这里简述几个需要注意的问题：</h2>
<blockquote><p>如果在page go之后马上进行pdf抓取，此时页面还未完成渲染，只能抓到loading图（如下），所以用timeout做了简单点处理<br><span class="img-wrap"><img data-src="/img/bVTdh8?w=599&amp;h=293" src="https://static.alili.tech/img/bVTdh8?w=599&amp;h=293" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></blockquote>
<blockquote>
<p>最终爬取效果如下，PDF的尺寸、预览效果、首页重复就不做过多整理， 预览效果如下,如果想要自己处理，可以设置一下chrome尺寸，打印页数<br><span class="img-wrap"><img data-src="/img/bVTnIC?w=1228&amp;h=485" src="https://static.alili.tech/img/bVTnIC?w=1228&amp;h=485" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVTdgY?w=705&amp;h=612" src="https://static.alili.tech/img/bVTdgY?w=705&amp;h=612" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>最后声明，生成的PDF很粗糙，应该不会对阮老师产生什么影响，如有问题可以第一时间联系我....</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Puppeteer初探--爬取并生成《ES6标准入门》PDF

## 原文链接
[https://segmentfault.com/a/1190000010736797](https://segmentfault.com/a/1190000010736797)

