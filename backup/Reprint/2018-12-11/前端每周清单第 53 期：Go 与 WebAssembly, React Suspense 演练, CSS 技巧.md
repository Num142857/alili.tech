---
title: '前端每周清单第 53 期：Go 与 WebAssembly, React Suspense 演练, CSS 技巧' 
date: 2018-12-11 2:30:10
hidden: true
slug: whsgqo75tz
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013586587" src="https://static.alili.tech/img/remote/1460000013586587" alt="周报封面53.jpg" title="周报封面53.jpg" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID: frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader0">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li>
<a href="https://parg.co/UWu" rel="nofollow noreferrer" target="_blank">Go 语言的 WebAssembly 架构</a>: 本文档描述了 Go 编译器中即将加入的 WebAssembly 架构设计方案，该方案会被合入目前的 Go 1.11 版本。这也意味着我们可以使用 Go 来编写 WebAssembly 模块代码，从而也为 Go 提供了类似于 JavaScript 这样能够编写 Web 端应用的能力。可预见该架构会对软件工程生态体系有一定积极的影响。</li>
<li>
<a href="https://parg.co/Ua1" rel="nofollow noreferrer" target="_blank">Flutter beta 1 发布</a>: 作为 Mobile Word Congress 2018 的一部分，近日 Flutter 正式发布了其首个 Beta 版本。Flutter 是 Google 新的移动端界面框架，用来帮助开发者快速构建高质量的跨平台原生界面。Flutter 致力于实现以下目标：原生的无缝集成与性能保障，高效率的开发以及大量跨平台的 UI 工具/组件库。</li>
<li>
<a href="https://github.com/ariya/phantomjs/issues/15344" rel="nofollow noreferrer" target="_blank">再见，PhantomJS</a>: 随着 Chrome 与 Firefox 纷纷推出了 Headless 模式，原本许多的 PhantomJS 开发活动都逐渐停滞。近日，PhantomJS 宣布将会归档其项目，并且停止开发操作；PhantomJS 2.1.1 将会是最后一个稳定版本。感谢 PhantomJS 这些年来带给我们的功能特性，它已经很好地完成了最初的目标与历史使命，感谢 &amp; 再见。</li>
</ul>
<h2 id="articleHeader1">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li>
<a href="https://developers.google.com/machine-learning/crash-course/" rel="nofollow noreferrer" target="_blank">Google 发布机器学习速成课程</a>: 为了帮助更多的人了解与学习机器学习相关的知识技能，Google 发布了人工智能学习网站 Learn with Google AI。本次课程，一共是 15 小时，其中包括 25 节课程以及 40 多项练习，该课程并不要求任何前置的学习内容，非常适合于各个层次的初学者。非常值得一提的是，本次课程提供了非常完美的中文支持，包括中文配音，中文课程材料以及中文概念讲解。更多相关内容参考 <a href="https://github.com/wxyyxc1992/AIDL-Series" rel="nofollow noreferrer" target="_blank">数据科学与机器学习实战手册</a>。</li>
<li>
<a href="http://exploringjs.com/es2018-es2019/toc.html" rel="nofollow noreferrer" target="_blank">深入探究 ES2018 与 ES2019</a>: 本小册是对于 ES2018 与 ES2019 的特性进行全面的介绍与讲解，目前涵盖了 ES2018 中的 Asynchronous iteration, Rest/Spread Properties, RegExp named capture groups, RegExp Unicode property escapes, RegExp lookbehind assertions, s (dotAll) flag for regular expressions, Promise.prototype.finally(), Template Literal Revision 等特性。更多相关内容参考 <a href="https://parg.co/UIj" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与工程实践</a>。</li>
<li>
<a href="https://parg.co/UWr" rel="nofollow noreferrer" target="_blank">React Suspense 演练</a>: Dan 在 JSConf Iceland 上演示的 Async React Demo 吸引了大量的关注，并为我们介绍了 Time Slicing 与 React Suspense 这两个特性。本文即是对于 Movie Search 案例的分析与实践，从而了解 React Suspense API 的相关特性，包括了 simple-cache-provider.SimpleCache, simple-cache-provider.createResource, ReactDOM.unstable_deferredUpdates 等。更多相关内容参考<a href="https://parg.co/UaY" rel="nofollow noreferrer" target="_blank">现代 Web 开发基础与工程实践--React 篇</a>。</li>
</ul>
<h2 id="articleHeader2">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li>
<a href="https://parg.co/UW4" rel="nofollow noreferrer" target="_blank">你或许不知道的 CSS 技巧</a>: 本文是对于 CSS 中的一些特性用法进行介绍，有点类似于 <a href="https://atomiks.github.io/30-seconds-of-css" rel="nofollow noreferrer" target="_blank">30 Seconds of CSS</a> 这样的 CSS 实用代码片。本文涉及到的技巧譬如基于宽度的垂直排版，多背景动画，字体简写等等。更多相关内容参考 <a href="https://github.com/wxyyxc1992/Awesome-CheatSheet" rel="nofollow noreferrer" target="_blank">CSS CheatSheet</a>。</li>
<li>
<a href="https://mp.weixin.qq.com/s/tJQ3M0zy53LnuPOYudL0Uw" rel="nofollow noreferrer" target="_blank">Electron 应用自动更新方案设计</a>: 在发布一个桌面应用之前，必须要考虑的一个问题是：怎么更新（迭代）？作者设计和实现了 Electron 应用的一整套自动更新方案，并且已应用于产品上，所以写下这篇文章和大家分享，可以怎么设计和实现一个 Electron 应用的自动更新，我们对于自动更新需求的考虑可能比你想得稍微复杂一些。本文将首先从需不需要更新开始谈起，接着谈怎么从人肉更新一步步进化到无痛的自动更新。然后，我会向你介绍，一个完善后的自动更新需求可以是怎样的。最后，也是最关键的一部分 —— 我们该采取怎样的更新思路，又该如何设计我们的产品逻辑。更多相关内容参考<a href="https://parg.co/UWD" rel="nofollow noreferrer" target="_blank">现代 Web 应用架构与性能调优</a>。</li>
<li>
<a href="https://github.com/andrew--r/frontend-case-studies" rel="nofollow noreferrer" target="_blank">前端案例分析</a>: 在前端学习实践的过程中，我们可能会阅读很多类似于构建 Todo List 的文章，他们是不错的入门文章，却无法告诉你如何来解决真实的，大规模应用中的问题。本文则是列举了一系列企业级应用的实践案例，包括了来自 Facebook, Twitter, Google, Airbnb 等公司的演讲或者文章。更多相关内容参考 <a href="https://github.com/wxyyxc1992/Awesome-Reference#web" rel="nofollow noreferrer" target="_blank">Awesome Web Reference</a>。</li>
</ul>
<h2 id="articleHeader3">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li>
<a href="https://parg.co/UW5" rel="nofollow noreferrer" target="_blank">Didact Fiber: Incremental reconciliation</a>: 这是一篇非常不错的深入讲解 Fiber 实现的文章。Didact 是作者实现的类 React 教学型框架，而本文则瞩目于如何将 didact 中的部分代码重写以使其适配于最新的 React 16 架构；作者直接使用了来自 React 代码库中的结构、变量以及函数名，从而方便理解。本文依次介绍了为何需要 Fiber，如何调度 MicroTasks，Fiber 的数据结构、流程与实现等内容。更多相关内容参考<a href="https://parg.co/UaY" rel="nofollow noreferrer" target="_blank">现代 Web 开发基础与工程实践--React 篇</a>。</li>
<li>
<a href="https://hackernoon.com/redesigning-redux-b2baee8b8a38" rel="nofollow noreferrer" target="_blank">重构 Redux</a>: 随着 React 发布新的 Context API，又有了许多关于 Redux 的讨论：状态管理是否依然解决？众所周知，状态管理一直是应用开发中的难点之一，本文即是对于状态管理中常见的问题进行重新考量：我们是否需要额外的状态管理库，Redux 是否值得使用，是否有更好地状态管理方案等。更多相关内容参考<a href="https://parg.co/UWD" rel="nofollow noreferrer" target="_blank">现代 Web 应用架构与性能调优</a>。</li>
<li>
<a href="https://v8project.blogspot.sg/2018/03/tracing-js-dom.html" rel="nofollow noreferrer" target="_blank">从 JS 到 DOM 的双向追踪</a>: Chrome 66 中针对内存泄漏分析进行了优化，从而方便开发者调试内存泄漏相关的问题。现在 Chrome DevTools 能够追踪并且快照 C++ DOM 对象，然后从 JavaScript 对象开始列举出所有的可达对象。该特性是 V8 垃圾收集器中提供的新 C++ 追踪机制的应用之一，更多相关内容参考<a href="https://parg.co/UIj" rel="nofollow noreferrer" target="_blank">Web 内存泄漏分析</a>。</li>
</ul>
<h2 id="articleHeader4">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li>
<a href="https://github.com/midwayjs/pandora" rel="nofollow noreferrer" target="_blank">Pandora.js</a>: Pandora.js 是阿里开源的 Node.js 应用管理工具，其基于 TypeScript 开发，提供了管理、衡量、追踪等一系列的特性。Pandora.js 源于多年企业级 Node.js 应用管理实践，致力于提供从管理监控，到调试部署等全流程的支持。</li>
<li>
<a href="https://github.com/pqina/filepond" rel="nofollow noreferrer" target="_blank">filepond</a>: filepond 是灵活有趣的 JavaScript 文件上传控件，它提供了漂亮的过场交互动画以及良好的用户体验，并且利用客户端图片优化技术来保证高性能的上传。</li>
<li>
<a href="https://github.com/kantord/just-dashboard" rel="nofollow noreferrer" target="_blank">just-dashboard</a>: just-dashboard 能够基于 YAML 或者 JSON 配置文件生成数据面板，从而避免了开发者或者数据工程师重复的劳动。just-dashboard 还允许使用 jq 查询，或者指定某个组件的数据抓取地址，just-dashboard 会在运行时动态抓取数据并且渲染为图表。</li>
<li>
<a href="https://github.com/terkelg/prompts" rel="nofollow noreferrer" target="_blank">prompts</a>: prompts 是可以在命令行中使用的，轻量级、美观大方、用户友好的交互式提示。与其他框架相比，prompts 没有过多的外部依赖，尽可能地简化内部复杂度。</li>
</ul>
<h2 id="articleHeader5">巅峰人生</h2>
<ul><li>
<a href="https://parg.co/UWB" rel="nofollow noreferrer" target="_blank">过完年跳槽，要考虑哪些要素？</a>: 发完奖金了，过完年了，又到了人心躁动的时节。不少 IT 圈的小伙伴可能在思考，要不要换工作。今天和大家聊聊 IT 人换工作这个话题，楼主也面试过的不少候选人，站在面试官的角度，谈谈什么样的 IT 人会在面试中加分。</li></ul>
<h2 id="articleHeader6">前端之巅</h2>
<p>「前端之巅」是 InfoQ 旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复 “ 加群 ”。投稿请发邮件到 editors@cn.infoq.com，注明 “ 前端之巅投稿 ”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 53 期：Go 与 WebAssembly, React Suspense 演练, CSS 技巧

## 原文链接
[https://segmentfault.com/a/1190000013586582](https://segmentfault.com/a/1190000013586582)

