---
title: 'Rize - 一个可以让你简单、优雅的使用 puppeteer 的 Node.js 库' 
date: 2018-12-11 2:30:10
hidden: true
slug: fbx4urfzive
categories: [reprint]
---

{{< raw >}}

                    
<p>目前 puppeteer 已经成为了非常流行的 Node.js 的库，被广泛用于爬虫或 UI 测试。</p>
<p>我也很欢喜 puppeteer 这个库。然而，puppeteer 的几乎所有的 API 都是异步的，它返回的是一个 <code>Promise</code>。</p>
<p>这就导致整个代码有点啰嗦，下面是官方的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer')

void (async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://example.com')
  await page.screenshot({ path: 'example.png' })
  await browser.close()
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>)

<span class="hljs-keyword">void</span> (<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch()
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage()
  <span class="hljs-keyword">await</span> page.goto(<span class="hljs-string">'http://example.com'</span>)
  <span class="hljs-keyword">await</span> page.screenshot({ <span class="hljs-attr">path</span>: <span class="hljs-string">'example.png'</span> })
  <span class="hljs-keyword">await</span> browser.close()
})()</code></pre>
<p>如您所见，一堆的 <code>await</code> 关键字使得代码不太优雅。为了要使用 <code>async/await</code>，您必须将代码放入一个立即执行函数（IIFE）里。</p>
<p>为此，我受到了 Laravel Dusk 的启发，写了 <code>Rize</code> 这个库。</p>
<p>上面的例子如果用 Rize 重写，将会是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Rize = require('rize')

const rize = new Rize()
rize
  .goto('http://example.com')
  .saveScreenshot('example.png')
  .end()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Rize = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rize'</span>)

<span class="hljs-keyword">const</span> rize = <span class="hljs-keyword">new</span> Rize()
rize
  .goto(<span class="hljs-string">'http://example.com'</span>)
  .saveScreenshot(<span class="hljs-string">'example.png'</span>)
  .end()</code></pre>
<p>代码简单得多了。另外，链式的 API 调用也是代码变得优雅。</p>
<p>除了提供基本的操作（如页面导航、对 DOM 操作、与表单进行交互），Rize 这个库还提供了一些断言方法。</p>
<p>为什么呢？因为我们经常利用 puppeteer 来进行 UI 测试。而 Rize 提供了一系列的 assertions，使得 UI 测试变得简单、方便，E2E 测试同样没有问题。</p>
<p>例如，您可以断言当前页面的 URL：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rize = new Rize()
rize.assertUrlIs('http://example.com')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> rize = <span class="hljs-keyword">new</span> Rize()
rize.assertUrlIs(<span class="hljs-string">'http://example.com'</span>)</code></pre>
<p>又或者断言指定的文本是否存在于页面上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rize = new Rize()
rize.assertSee('Some text')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> rize = <span class="hljs-keyword">new</span> Rize()
rize.assertSee(<span class="hljs-string">'Some text'</span>)</code></pre>
<p>还可以为 DOM 断言：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rize = new Rize()
rize.assertClassHas('div', 'my-class')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> rize = <span class="hljs-keyword">new</span> Rize()
rize.assertClassHas(<span class="hljs-string">'div'</span>, <span class="hljs-string">'my-class'</span>)</code></pre>
<p>上面这个函数可以断言指定的元素上是否存在指定的类名。更多的 API 可以参考 Rize 的文档（链接在下方）。</p>
<p>Rize 库的 GitHub 仓库：<a href="https://github.com/g-plane/rize" rel="nofollow noreferrer" target="_blank">https://github.com/g-plane/rize</a> （欢迎 star）</p>
<p>Rize 库的文档教程：<a href="https://rize.js.org/" rel="nofollow noreferrer" target="_blank">https://rize.js.org/</a></p>
<p>Rize 库所有的 API 参考：<a href="https://rize.js.org/api/classes/_index_.rize.html" rel="nofollow noreferrer" target="_blank">https://rize.js.org/api/classes/_index_.rize.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Rize - 一个可以让你简单、优雅的使用 puppeteer 的 Node.js 库

## 原文链接
[https://segmentfault.com/a/1190000013536345](https://segmentfault.com/a/1190000013536345)

