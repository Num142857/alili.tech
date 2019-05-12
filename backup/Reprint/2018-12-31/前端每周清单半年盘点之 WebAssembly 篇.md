---
title: '前端每周清单半年盘点之 WebAssembly 篇' 
date: 2018-12-31 2:30:30
hidden: true
slug: fnprsbc0e7j
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单；本文则是对于半年来发布的前端每周清单中的 WebAssembly 相关的教程实践与开源项目的盘点，可以查看<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">这里</a>获得往期清单或者其他盘点篇。</p>
<h1 id="articleHeader0">教程实践</h1>
<ul>
<li>
<a href="https://hacks.mozilla.org/2017/02/what-makes-webassembly-fast/" rel="nofollow noreferrer" target="_blank">《对比探秘 WebAssembly 性能优越之谜》</a>: 本系列文章通过有趣的漫画介绍了 WebAssembly 的前世今生，并且与 JavaScript 就加载、解析、编译、执行等浏览进行了详细对比，从而介绍 WebAssembly 的性能缘何相较于 JavaScript 会好上很多。同时作者也强调，WebAssembly 与 JavaScript 各有所长，未来并不会存在太多的竞争，更多的是相辅相成，各司其职。( <a href="http://suo.im/3jsTUH" rel="nofollow noreferrer" target="_blank">http://suo.im/3jsTUH</a> )</li>
<li>
<a href="https://parg.co/bsv" rel="nofollow noreferrer" target="_blank">《浅析 WebAssembly 缘何优于 Asm.js》</a>：WebAssembly 是新的 Web 中可执行格式，逐现代浏览器纷纷地提供了对于 WebAssembly 的原生支持；本文则是对于 WebAssembly 相较于 asm.js 带来的性能提升背后的原理进行简要介绍。(<a href="https://parg.co/bsv)" rel="nofollow noreferrer" target="_blank">https://parg.co/bsv)</a>
</li>
<li>
<a href="https://parg.co/bVa" rel="nofollow noreferrer" target="_blank">《简短的 WebAssembly 卡通指南》</a>：现在有很多关于 WebAssembly 与 JavaScript 生态圈的讨论，人们往往关注于 WebAssembly 带来的巨大的性能提升以及它会如何颠覆现代 Web 开发。不过很多的介绍中并没有详细阐述隐藏在速度提升之后的具体细节，本文则是从整个 JavaScript 的演化史来介绍 WebAssembly 巨大性能提升的原因。( <a href="https://parg.co/bVa" rel="nofollow noreferrer" target="_blank">https://parg.co/bVa</a> )</li>
<li>
<a href="https://parg.co/bk6" rel="nofollow noreferrer" target="_blank">《理解 WebAssembly 的文件格式》</a>：为了保证 WebAssembly 能够被人们阅读与理解，需要提供对于 wasm 二进制格式的文本表示。该特性着眼于能够在文本编辑器、浏览器开发者工具等开发工具中浏览 WebAssembly 文件，而本文则介绍了这种文件格式的规范与工作原理，以及底层的字节码与上层的 JavaScript 对象之间的关联关系。( <a href="https://parg.co/bk6" rel="nofollow noreferrer" target="_blank">https://parg.co/bk6</a> )</li>
<li>
<a href="http://robert.ocallahan.org/2017/06/webassembly-mozilla-won.html" rel="nofollow noreferrer" target="_blank">《这 WebAssembly，是 Mozilla 赢了》</a>：Mozilla 提出1 asm.js 与 Google Chrome 提出的 PNaCI 是都是致力于在浏览器中运行原生代码的技术方案。不过 PNaCI 却存在着自绝于 JavaScript 以及 HTML 等问题，并且其他的浏览器厂商很难去支持 PNaCI 标准。而 asm.js 则以轻量级的对于标准 Web 平台扩展的方式实现了这一目标，也就导致了最终 WebAssembly 决定靠近 asm.js 而不是 PNaCI。( <a href="http://robert.ocallahan.org/2017/06/webassembly-mozilla-won.html" rel="nofollow noreferrer" target="_blank">http://robert.ocallahan.org/2...</a> )</li>
<li>
<a href="http://blog.openbloc.fr/webassembly-first-steps/" rel="nofollow noreferrer" target="_blank">《WebAssembly 初体验：重构简单游戏引擎》</a>：WebAssembly 为我们提供了构建高性能的前端应用的途径，而本文则从零开始介绍如何使用 C 来覆写简单的 JavaScript 游戏引擎并且将其编译为 WebAssembly。本文依次介绍了如何搭建基础的 Emscription 工具链、使用 JavaScript 引入 wasm 模块、覆写并且优化某个小型游戏引擎、两个引擎的性能评测等等部分。( <a href="http://blog.openbloc.fr/webassembly-first-steps/" rel="nofollow noreferrer" target="_blank">http://blog.openbloc.fr/webas...</a> )</li>
<li>
<a href="https://parg.co/biB" rel="nofollow noreferrer" target="_blank">《Figma 利用 WebAssembly 降低三倍加载速度》</a>：自 WebAssembly 推出之后，很多开发者都开始尝试在小型项目中实践 WebAssembly，不过尚缺大型真实案例比较。而 Figma 因为其产品主要基于 C++ 实现，可以方便地编译到 WebAssembly 中并且与原方案进行性能比较。本文中 Figma 介绍了它们在 Firefox 中使用 WebAssembly 之后带来的加载性能提升以及下载尺寸的优化，同时还提及了目前 WebAssembly 在实际项目使用中存在的一些问题与风险。( <a href="https://parg.co/biB" rel="nofollow noreferrer" target="_blank">https://parg.co/biB</a> )</li>
<li>
<a href="https://parg.co/byh" rel="nofollow noreferrer" target="_blank">Rust、WebAssembly 与 Webpack</a>：WebAssembly 是新的运行于 Web 平台的二进制格式，我们能够将 C、C++、Rust 这些语言编译到 .wasm 文件格式中然后在浏览器环境下运行他们；通常这些编译后的代码在包体体积与运行速度上都会比 JavaScript 有明显提升。而本文则着眼于介绍如何在浏览器中执行底层的 Rust 代码，也可以参考<a href="https://parg.co/by4" rel="nofollow noreferrer" target="_blank">这篇文章</a>( <a href="https://parg.co/by4" rel="nofollow noreferrer" target="_blank">https://parg.co/by4</a> )来了解更多的关于 WebAssembly 快速实践的知识。( <a href="https://parg.co/byh" rel="nofollow noreferrer" target="_blank">https://parg.co/byh</a> )</li>
<li>
<a href="https://pspdfkit.com/blog/2017/webassembly-a-new-hope/" rel="nofollow noreferrer" target="_blank">WebAssembly 在 PSPDFKIT 的实践</a>：随着今年三月份 WebAssembly Community Group 就标准达成一致，越来越多的主流浏览器开始支持 WebAssembly，本文即是 PDF 工具开发者 PSPDFKIT 介绍它们利用 WebAssembly 开发浏览器端渲染的 PDS 预览工具的实践经验。本文首先介绍了 asm.js 的工作原理与编译机制，然后阐述了 WebAssembly 的概念与组成，最后介绍了 WebAssembly 在 PSPDFKit 的实践经验以及他们在将原本大型 C++ 代码库转化为 WebAssembly 格式时的体验；更多 WebAssembly 相关资料参考<a href="https://parg.co/b2S" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
</ul>
<h1 id="articleHeader1">开源项目</h1>
<ul><li>
<a href="https://github.com/mbasso/asm-dom" rel="nofollow noreferrer" target="_blank">asm-dom</a>: asm-dom 是轻量级的基于 WebAssembly 的 Virtual DOM 框架，其允许开发者使用 C++ 来构建 Web 单页应用。开发者可以仅使用 C++ 来编写 Web 应用，然后通过 Emscripten 来将其转化为 WebAssembly；其能允许开发者直接使用现有的 C++ 标准库代码，从而保证代码复用与性能提升。</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单半年盘点之 WebAssembly 篇

## 原文链接
[https://segmentfault.com/a/1190000011173190](https://segmentfault.com/a/1190000011173190)

