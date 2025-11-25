---
title: '【EASYDOM系列教程】之DOM 简介' 
date: 2019-01-09 2:30:12
hidden: true
slug: 6gpsmimxf78
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">DOM 是什么</h2>
<p>DOM 被设计用于解析 HTML 页面文档，方便 JavaScript 语言通过 DOM 访问和操作 HTML 页面中的内容。</p>
<p>DOM 是由 W3C 组织定义标准规范，并且由各大浏览器厂商支持。严格意义上来讲，DOM 并非属于 JavaScript 语言。</p>
<blockquote><p>在其他开发语言中，也支持 DOM 的标准规范，例如 PHP 语言。</p></blockquote>
<p>我们之所以可以在 JavaScript 语言中使用 DOM，是因为各大浏览器将 DOM 的标准规范内容封装成了 JavaScript 语言所支持的形式。</p>
<p>对于 DOM 中的对象，我们只有调用的权限，没有修改的权限，也说明了这个问题。</p>
<h3 id="articleHeader1">DOM 的具体含义是什么</h3>
<p>DOM 其实是个缩写，全称是 <strong>Document Object Model</strong>，被译为 <strong>文档对象模型</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVQwJj?w=916&amp;h=266" src="https://static.alili.tech/img/bVQwJj?w=916&amp;h=266" alt="DOM的具体解释" title="DOM的具体解释" style="cursor: pointer; display: inline;"></span></p>
<p>其中 <strong>D</strong> 表示 <strong>Document</strong>，就是 DOM 将 HTML 页面解析为一个 <strong>文档</strong>。同时提供了 <code>document</code> 对象。</p>
<p>其次 <strong>O</strong> 表示 <strong>Object</strong>，就是 DOM 将 HTML 页面中每个元素解析为一个 <strong>对象</strong>。例如 <code>&lt;body&gt;</code> 元素在 DOM 中对应就是 <code>HTMLBodyElement</code> 对象。</p>
<p>最后 <strong>M</strong> 表示 <strong>Model</strong>，就是 DOM 中表示各个对象之间的关系。</p>
<blockquote><p><strong>模型（Model）</strong>主要是指 DOM 树结构。</p></blockquote>
<h3 id="articleHeader2">DOM 是如何解析 HTML 页面的呢</h3>
<p>浏览器加载并运行 HTML 页面后，会创建 DOM 结构。由于 DOM 中的内容被封装成了 JavaScript 语言中的对象，所以我们可以使用 JavaScript 语言通过 DOM 结构来访问和操作 HTML 页面中的内容。</p>
<p>换句话讲，DOM 可以理解为是 HTML 页面与 JavaScript 语言之间的一个桥梁。</p>
<p><span class="img-wrap"><img data-src="/img/bVQwJF?w=899&amp;h=391" src="https://static.alili.tech/img/bVQwJF?w=899&amp;h=391" alt="DOM与JavaScript之间的关系" title="DOM与JavaScript之间的关系" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">DOM 的定义</h2>
<p>由于 DOM 的标准规范是由 W3C 组织起草并定义的，所以 W3C 对 DOM 的定义是目前最权威的解释。</p>
<p>下面这段英文描述，就是 W3C 对 DOM 的定义原文:</p>
<blockquote><p>The Document Object Model is a platform- and language-neutral interface that will allow programs and scripts to dynamically access and update the content, structure and style of documents. The document can be further processed and the results of that processing can be incorporated back into the presented page.</p></blockquote>
<p>下面这段是本人的翻译（仅供参考）:</p>
<blockquote><p>DOM 是一个独立于任何语言和平台的接口，允许任何语言或脚本动态地访问和更新 HTML 文档的内容、结构和样式。该 HTML 页面可以进一步处理，并且该处理的结果可以被合并到所呈现的 HTML 页面中。</p></blockquote>
<h3 id="articleHeader4">DOM 标准是独立的</h3>
<p>通过 W3C 的定义，我们可以知道 DOM 是不属于任何开发语言的。当然，DOM 也不会属于 JavaScript 语言。</p>
<p>任何一个开发语言，只要支持了 DOM 的标准规范，都可以通过 DOM 访问和操作 HTML 页面。</p>
<p>换句话讲，DOM 在不同开发语言中，有着不同的使用形式。但最核心的标准规范都是一样的，只是具体使用的开发语言的语法不同而已。</p>
<p>比如下面这段代码，就是 JavaScript 中的 DOM 内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('btn');
var className = btn.className;
className += ' animate';
btn.className = className;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-keyword">var</span> className = btn.className;
className += <span class="hljs-string">' animate'</span>;
btn.className = className;</code></pre>
<h3 id="articleHeader5">DOM 的作用</h3>
<p>通过 W3C 的定义，我们还可以知道 DOM 主要是用来解析 HTML 页面的。也就是只要支持 DOM 的标准规范的开发语言，都可以通过 DOM 访问和更新 HTML 页面的内容、结构和样式。</p>
<blockquote><p>早期的 DOM 除了可以访问和更新 HTML 页面外，还可以访问和更新 XML 文档。但目前 XML 文档的使用场景越来越少，再加上 Web 前端开发需求越来越多。导致 DOM 主要用来访问和更新 HTML 页面了。</p></blockquote>
<h2 id="articleHeader6">浏览器的支持</h2>
<p>目前几乎所有的浏览器都支持 DOM 的内容。但是不是支持的是 W3C 对 DOM 的标准规范呢？</p>
<h3 id="articleHeader7">浏览器和 W3C 谁更早</h3>
<p>浏览器对 DOM 的支持远早于 W3C 定义 DOM 的标准规范。也就是说，在 W3C 定义 DOM 的标准规范之前，各大浏览器就支持了 DOM。</p>
<p>最早，是 Navigator 浏览器支持 DOM。但只是提供了 <code>Document</code> 对象的一些属性和方法。</p>
<p>后期，IE 浏览器也加入了对 DOM 的支持。但 IE 浏览器与 Navigator 浏览器所支持的 DOM 是有区别的。</p>
<blockquote><p>这也是 DOM 在不同浏览器中的兼容问题。</p></blockquote>
<p>而 W3C 组织定义 DOM 的标准规范，主要也是为了解决 DOM 在不同浏览器的差异问题。</p>
<p>虽然，自从 W3C 定义了 DOM 的标准规范后，浏览器的兼容问题好了很多。但，各大浏览器都或多或少地扩展了 W3C 定义的 DOM 标准。</p>
<blockquote><p>在实际开发中，尽量使用 W3C 的 DOM 标准规范，以避免更多的浏览器兼容问题。</p></blockquote>
<hr>
<p>本教程免费开源，任何人都可以免费学习、分享，甚至可以进行修改。但需要注明作者及来源，并且不能用于商业。</p>
<p>本教程采用<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【EASYDOM系列教程】之DOM 简介

## 原文链接
[https://segmentfault.com/a/1190000010096549](https://segmentfault.com/a/1190000010096549)

