---
title: '为您的 Node 性能选择最佳的 JS 引擎' 
date: 2019-01-12 2:30:24
hidden: true
slug: w27wdcw6779
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文翻译自 <a href="https://blog.sqreen.io/javascript-engine-performance/" rel="nofollow noreferrer" target="_blank">Picking the best JS engine for your Node app’s performance</a>，中文版首发在我的知乎专栏 <a href="https://zhuanlan.zhihu.com/v8core" rel="nofollow noreferrer" target="_blank">V8 源码及周边</a>。</p></blockquote>
<h2 id="articleHeader0">tl;dr</h2>
<p>Node.js 正在飞速的发展。目前 <a href="https://nodejs.org/en/blog/release/v8.0.0/" rel="nofollow noreferrer" target="_blank">Node.js 8 已经发布</a>。同时，基于 ChakraCore 的 Node.js 版本也正在积极开发中。</p>
<p>原文是：The recent Node.js v8 version (not to be mistaken with V8, the JavaScript engine) <a href="https://nodejs.org/en/blog/release/v8.0.0/" rel="nofollow noreferrer" target="_blank">has just been published</a>.</p>
<p>原作者使用了 <strong>Node.js v8 version</strong> 这个词，为此作者专门在括号中解释了这里的 V8 不是 javascript 引擎 V8，而是 Node.js 的版本。但是在 Node.js 官方博文 <a href="https://nodejs.org/en/blog/release/v8.0.0/" rel="nofollow noreferrer" target="_blank">Node v8.0.0 (Current)</a> 中有一段注释：</p>
<blockquote><p>Note that, when referring to Node.js release versions, we have dropped the "v" in Node.js 8. Previous versions were commonly referred to as v0.10, v0.12, v4, v6, etc. In order to avoid confusion with V8, the underlying JavaScript engine, we've dropped the "v" and call it Node.js 8.</p></blockquote>
<p>请注意，当引用 Node.js 发布版本时，我们已经在 Node.js 8 中删除了 “v”。以前的版本通常被称为 v0.10，v0.12，v4，v6 等。为了避免与 V8 JavaScript 引擎混淆，我们放弃了 “v” 并将其称为 Node.js 8。<br>所以，Node.js v8 版本应该直接称为 Node.js 8。</p>
<p>由于 Node.js 使用的 JavaScript引擎不知道什么时候会引入新功能，开发者们都像明确的知道不同引擎在性能方面的性能优劣。</p>
<p>我们对以下几个 Node.js 版本做了性能评估：</p>
<ul>
<li>Node.js 6.10.1 (V8 5.1.281.95)* Node.js 7.10 (V8 5.5.372.43)</li>
<li>Node.js 7.10 使用 --turbo --ignition 参数 (V8 5.5.372.43)</li>
<li>Node.js 8.0 (V8 5.8.283.41)</li>
<li>Node.js 8.0 使用 --turbo --ignition 参数 (V8 5.8.283.41)</li>
<li>Node.js 8.0 (ChaKraCore 2.0.0.0) (使用 2 种不同的构建版本)</li>
</ul>
<p>你可以通过这个简单的 <a href="https://sqreen.github.io/node_engine_bench/" rel="nofollow noreferrer" target="_blank">可视化工具</a> 查看不同版本对于不同特性的性能。</p>
<p>在这些结果中，如果你使用的是 Node.js 8，你还可以查看开启 <code>--turbo --ignition</code> 参数后的 javascript 性能。</p>
<h2 id="articleHeader1">Context</h2>
<p>虽然 V8 是 Node.js 使用的默认 JavaScript 引擎，但是 Node.js 提供了一个通用的平台，允许开发者选择不同的 JavaScript 引擎。</p>
<p>Node.js 8 的发布非常令人兴奋，并且是社区内的一件大事。该平台已附带一套全新功能。此外，开发者最关注的就是性能。</p>
<p>了解哪种 JavaScript 引擎最适合运行应用程序将成为一项非常有用的技能。 在本文中，我们将看到 V8 和 ChakraCore 的不同版本在性能方面的优劣。</p>
<h2 id="articleHeader2">方式</h2>
<p>要比较不同 Node.js 版本之间的基准测试，我选择了有代表意义的 35 种 JavaScript 代码模式。他们中的大多数都是从 <a href="https://github.com/cjihrig/will-it-optimize" rel="nofollow noreferrer" target="_blank">Colin Ihrig’s ‘will it optimize’</a> 的 repo 中获取的。这些模式已经在前面的文章(<a href="https://blog.sqreen.io/optimize-your-node-app-by-simply-upgrading-node-js/" rel="nofollow noreferrer" target="_blank">Optimize your Node app by simply upgrading Node.js</a>)中讨论过了。</p>
<p>对于每个模式，分别使用了每个不同版本的 Node.js 运行 10 次、100 次、1000 次、10000次和 10000 次。 通过允许这些代码，我们呢可以了解每个引擎如何进行运行时常规优化和热函数(hot function)优化。</p>
<p>基准测试没有考虑垃圾收集(GC)事件的数量。 这意味着如果修改分配给每个进程的内存，则实验的结果可能会不同。</p>
<h2 id="articleHeader3">结果</h2>
<p><span class="img-wrap"><img data-src="/img/bVPmIF?w=1024&amp;h=439" src="https://static.alili.tech/img/bVPmIF?w=1024&amp;h=439" alt="V8 justjavac" title="V8 justjavac" style="cursor: pointer;"></span></p>
<p>在 <a href="https://sqreen.github.io/node_engine_bench/" rel="nofollow noreferrer" target="_blank">这个页面</a> 可以查看完整的测试结果。通过分析这个结果，我们可以发现 ChakraCore 的 Node.js 版本比基于 V8 的版本慢。</p>
<p>此外，在大多数情况下，随着时间的迁移 V8 变得越来越高效。Ignition 和 Turbofan 优化架构很显著地提升了性能。 Node.js 8 随 V8 5.8 发布，但是 <a href="https://nodejs.org/en/blog/release/v8.0.0/#say-hello-to-v8-5-8" rel="nofollow noreferrer" target="_blank">默认并没有启用</a>。 Node.js 的未来版本将随着启用了 Ignition 和 Turbofan 的 V8 5.9（也可能是 5.6）一起提供。</p>
<h2 id="articleHeader4">结论</h2>
<p>这个基准测试非常有趣，我计划在将来增加更多的 Node.js 版本和更多的代码模式。作为Sqreen 的 Node.js 工程师，我非常关心性能。</p>
<p>(译注：后面还有 4 端内容，大部分都是原作者的广告，就不翻译了)</p>
<p>最后推荐作者开发的这个强大的性能可视化对比工具：<a href="https://sqreen.github.io/node_engine_bench/" rel="nofollow noreferrer" target="_blank">Picking the best JS engine for your Node app’s performance</a> 还有我的讲座：<a href="https://segmentfault.com/l/1500000008618265?c=64deba64f0220e260765046a447668bf">前端程序员应该懂点 V8 知识</a>。</p>
<hr>
<p>欢迎关注我的公众号，关注前端文章：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004841853" src="https://static.alili.tech/img/remote/1460000004841853" alt="justjavac微信公众号" title="justjavac微信公众号" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为您的 Node 性能选择最佳的 JS 引擎

## 原文链接
[https://segmentfault.com/a/1190000009819740](https://segmentfault.com/a/1190000009819740)

