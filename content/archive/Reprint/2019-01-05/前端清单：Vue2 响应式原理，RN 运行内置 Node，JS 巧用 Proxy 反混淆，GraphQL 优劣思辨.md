---
title: '前端清单：Vue2 响应式原理，RN 运行内置 Node，JS 巧用 Proxy 反混淆，GraphQL 优劣思辨' 
date: 2019-01-05 2:30:10
hidden: true
slug: xhu6gng0e9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前端每周清单第 25 期：Vue2 响应式原理，RN 运行内置 Node，JS 巧用 Proxy 反混淆，GraphQL 优劣思辨，深入 React 动画</h1>
<p><code>作者：王下邀月熊</code> <code>编辑：徐川</code></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader1">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li>
<a href="https://parg.co/bgy" rel="nofollow noreferrer" target="_blank">Storybook 3.2 发布</a>：Storybook 允许我们在现代组件化开发中快速地浏览独立组件；在近日发布的 Storybook 3.2 版本中，添加了对于 Vue.js 的支持。除此之外，本版本还引入了层次化的 Story 布局，允许开发者更加灵活地定义组件的展现层次；同时还允许在移动设备中直接浏览 React Native 组件，还修复了之前的部分错误。</li>
<li>
<a href="https://parg.co/bge" rel="nofollow noreferrer" target="_blank">Webpack 着手为 WebAssembly 添加头等支持</a>：目前 Webpack 中仅将 JavaScript 作为头等公民看待，其他的资源（HTML、CSS 等）都需要转化为 JavaScript 表达式进行处理；而近日 Webpack 渲染与 Mozilla 基金会达成合作，获得了来自 MOSS 项目的 $125,000 资金支持。Webpack 着手为 WebAssembly 添加头等支持，我们也可以在 <a href="https://parg.co/bgI" rel="nofollow noreferrer" target="_blank">Issue Tracker</a> 中了解最新的进展。</li>
<li>
<a href="https://parg.co/bFU" rel="nofollow noreferrer" target="_blank">Webkit 着手开发 PWA 特性支持</a>：Progressive Web Applications（PWAs）通过创建 Service Worker 来使 Web 用户能享受到推送、离线支持等原生应用的特性，是现代 Web 开发中重要的组成。不过令人遗憾的是 Safari 一直未表态支持 PWAs 相关特性，这一点让很多开发者也颇为不满，在 <a href="https://parg.co/bFY" rel="nofollow noreferrer" target="_blank">Apple’s refusal to support Progressive Web Apps is a detriment to future of the web</a> 此文中就进行了许多的讨论；不过近日有开发者发现，在 Webkit 的 BugList 与 Changelog 上出现了有关 PWA 的内容，尽管可能还需要数月乃至于更长的时间，我们相信未来 Safari 会给予 PWA 更好的支持。</li>
<li>
<a href="https://parg.co/bFp" rel="nofollow noreferrer" target="_blank">TensorFire：基于 WebGL 的浏览器端高性能神经网络框架</a>：深度学习与人工智能技术正在逐步地改变人们的生活，以 TensoFlow 为代表的一系列深度学习与神经网络框架也是如日中天，迅猛发展。 TensorFire 是基于 WebGL 的，运行在浏览器中的神经网络框架。使用 TensorFire 编写的应用能够在实现前沿深度学习算法的同时，不需要任何的安装或者配置就直接运行在现代浏览器中。</li>
</ul>
<h2 id="articleHeader2">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li>
<a href="https://www.nativescript.org/blog/vue-and-nativescript-in-one-minute" rel="nofollow noreferrer" target="_blank">Vue.js 与 NativeScript 初窥</a>：NativeScript 框架最值得称道的即是其扩展性，它目前已经支持原生 JavaScript、Angular、Vue.js 等多种框架或者编码方式，同时未来还计划支持 Preact 等框架。本文即是介绍如何使用 NativeScript 与 Vue.js 协同开发，首先介绍了如何使用 NativeScript 命令行工具创建项目，然后引入 Vue.js 插件以及如何运行该项目；更多 Vue.js 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。</li>
<li>
<a href="https://github.com/ElemeFE/node-practice" rel="nofollow noreferrer" target="_blank">Node.js 实践教程</a>：本教程是希望以一些有名的模块/功能为基础, 在实现的过程中讲解各项知识点，主要分为控制流、Web、存储等几个部分。目前完成的模块包括 async 介绍、Promise 实现、coroutine 实现、co 模块介绍、HTTP Client 实现、HTTP Server 实现等；更多 Node.js 相关资料参考 <a href="https://parg.co/be0" rel="nofollow noreferrer" target="_blank"> https://parg.co/be0 </a>。</li>
<li>
<a href="https://parg.co/bFC" rel="nofollow noreferrer" target="_blank">Airbnb React VR 实践</a>：Airbnb 自 2014 年以来一直使用 React 构建用户交互界面，并且为社区贡献了很多优秀的开源项目；而随着 React VR 的发布，Airbnb 也利用其来快速原型化与测试 VR 相关的创意。本文即是介绍 Airbnb 在 React VR 实践方面的一些经验总结，本文首先阐述了 React、React Native 与 React VR 三者之间的关系与差异，然后介绍了 React VR 在布局、基础组件方面的语法，最后还讨论了 React VR、WebVR 以及 VR 技术本身的发展可能性。更多 WebVR 相关资料参考 <a href="https://parg.co/bFR" rel="nofollow noreferrer" target="_blank">https://parg.co/bFR</a>。</li>
<li>
<a href="https://parg.co/bFO" rel="nofollow noreferrer" target="_blank">突破 CSS 前端面试</a>：不同于传统的软件工程师面试比较注重算法，前端面试可能更多的注重综合能力以及领域语言的掌握；本文即着眼于对于面试中常见的 CSS 问题的总结与介绍。本文列举的问题譬如 Resetting 与 Normalizing 区别、floats 工作机制阐述、z-index 与 stacking context 比较、BFC 描述等等；更多 CSS/SCSS 相关资料参考<a href="https://parg.co/baH" rel="nofollow noreferrer" target="_blank"> https://parg.co/baH </a>。</li>
</ul>
<h2 id="articleHeader3">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li>
<a href="https://parg.co/bFs" rel="nofollow noreferrer" target="_blank">Angular 性能优化</a>：本文介绍了些常见的 Angular 开发中可用的性能优化建议，包括了利用 ChangeDetectionStrategy.OnPush 来显式声明组件间依赖、利用 trackBy 来追踪唯一标识符和避免冗余的增删、避免模板中的计算推导、禁用变化监测、使用懒加载等。</li>
<li>
<a href="https://morningstar.engineering/vue-2-unit-testing-primer-48d1d616a981" rel="nofollow noreferrer" target="_blank">Vue.js 2 单元测试指南</a>：本文主要介绍如何利用 Jasmine 为 Vue.js 2 应用搭建完整的单元测试；这里选用 Jasmine 的原因是它本身的性能较好，并且 Vue.js 本身也是使用该测试框架。本文首先介绍了环境搭建与待测试的组件构成，然后依次介绍了配置测试环境、如何根据组件的业务功能逻辑选定测试点、如何编写不同目标的测试用例等内容；更多 Vue.js 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。</li>
<li>
<a href="https://parg.co/bFh" rel="nofollow noreferrer" target="_blank">深入 React 动画实践</a>：本文介绍了在 React 开发中多种创建动画效果的途径，包括了基于 React 组件状态的 CSS 动画、基于 React 组件状态的 JavaScript 样式动画以及第三方依赖的 React Motion、Animated、Velocity-React 等库。本文最后还讨论了如何用 GreenSock 等经典强大的动画库来辅助 React 组件动画开发；更多 React 相关资料参考<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> https://parg.co/bM1 </a>。</li>
<li>
<a href="https://parg.co/bF3" rel="nofollow noreferrer" target="_blank">Node.js 如何解析 Form 上传？</a>：NPM 和 GitHub 里的开源组件帮我们解决了很多繁琐的工作，但是也让我们失去了很多深入技术细节的机会。在现有组件无法满足我们需求的时候，就需要我们来自己动手丰衣足食了。 作者前段时间遇到了一个需要手动解析 Form 表单上传的机会，也借此为各位解析一下 Node.js 解析 Form 上传的实现细节。更多 Node.js 相关资料参考 <a href="https://parg.co/be0" rel="nofollow noreferrer" target="_blank"> https://parg.co/be0 </a>。</li>
</ul>
<h2 id="articleHeader4">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li>
<a href="https://github.com/denysdovhan/wtfjs" rel="nofollow noreferrer" target="_blank">JavaScript 中有趣而又无语的例子</a>：JavaScript 是一门有趣的语言，它有着简单的语法、庞大的生态系统与社区，不过 JavaScript 中也有着很多令人无语的地方。本文即是对 JavaScript 中一些有趣的、出乎意料的用法收集，对于初学者是个不错的深入教程，而对于资深开发者也可以拿来作为面试题目。本文中包含的例子譬如 <code>[] == ![]</code>、NaN 的用法注意、try-finally 等等；更多 JavaScript 相关资料参考<a href="https://parg.co/bMI" rel="nofollow noreferrer" target="_blank"> https://parg.co/bMI </a>。</li>
<li>
<a href="https://parg.co/bFm" rel="nofollow noreferrer" target="_blank">安息吧 REST APIs，GraphQL 长存</a>：GraphQL 是 Facebook 针对复杂关系的数据获取与操作开源的数据查询语言，本文则是对比了传统的 REST APIs 与 GraphQL 各自的优劣，讨论了 GraphQL 相较于 REST APIs 更适合应用的场景；不过本文并非提倡使用 GraphQL 完全替代 REST APIs，也陈述了 GraphQL 存在的不足与缺陷。本文首先概括性地总结了 GraphQL 解决地三个问题，然后介绍了 GraphQL 的由来和其内部原理，最后讨论了 GraphQL 这种灵活性本身的代价。更多 GraphQL 相关资料参考 <a href="https://parg.co/b1e" rel="nofollow noreferrer" target="_blank"> https://parg.co/b1e </a>。</li>
<li>
<a href="https://www.youtube.com/watch?v=8UqHCrGdxOM" rel="nofollow noreferrer" target="_blank">基于 Proxy 的 PopUnder 库反混淆</a>：本视频通过对某个商用的 Chrome 59 中 PopUnder 库，的执行过程解析，来介绍如何利用 ES6 的 Proxy 进行，简单的 JavaScript 混淆代码逆向破解。视频还是挺有意思的，作者首先分析了经过混淆的源代码，发现无法下手；然后利用 Proxy 监听常见的 Windows 中 createElement 等函数的调用来了解该库的执行流程，最后再根据 API 的调用顺序复现出该库。更多 JavaScript 设计模式相关参考<a href="https://parg.co/bIO" rel="nofollow noreferrer" target="_blank"> https://parg.co/bIO </a>。</li>
<li>
<a href="https://parg.co/bF4" rel="nofollow noreferrer" target="_blank">深入 Vue.js 响应式原理</a>：本文作者从 Java 与 C# 中经典的 Getters/Setters 引入，讨论了 Vue.js 中从组件渲染函数、数据的 Getter、Setter 劫持、监听器的控制以及重渲染触发整个生命流程。更多 Vue.js 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。</li>
</ul>
<h2 id="articleHeader5">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li>
<a href="https://github.com/zeit/hazel" rel="nofollow noreferrer" target="_blank">Hazel</a>: Hazel 是 Zeit 开源的轻量级 Electron 应用更新服务器，它支持 macOS 与 Windows 应用的同步更新。Hazel 基于 micro 库构建，能够自动地从 Github Releases 抓取数据并且缓存在内存中，并且没十五分钟自动刷新下数据。</li>
<li>
<a href="https://github.com/staltz/react-native-node" rel="nofollow noreferrer" target="_blank">React Native Node</a>: React Native Node 能够在基于 React Native 开发的 Android 应用中启动后台 Node.js 进程，从而可以利用 Node.js 中的流、文件系统接口等特性来进行功能操作；React Native Node 主要依靠 Node.js 7.1.0 版本能够被独立编译为 bin_node_v710 可执行文件。另一方面，尽管 iOS 并不支持直接运行 V8，但是<a href="http://www.janeasystems.com/blog/node-js-meets-ios/" rel="nofollow noreferrer" target="_blank">该项目</a>正在致力于为 ChakraCore 打造类 V8 特性支持。</li>
<li>
<a href="https://www.react-simple-maps.io" rel="nofollow noreferrer" target="_blank">react-simple-maps</a>: react-simple-maps 是基于 d3-geo 与 topojson 的 React 地图组件库，允许开发者快捷方便地构建自定义的 SVG 地图；目前的特性包括了缩放、标记、自定义 SVG 标记、自定义着色、气泡图、动画支持等等。</li>
<li>
<a href="https://github.com/epicmaxco/vuestic-admin" rel="nofollow noreferrer" target="_blank">Vuestic Admin Dashboard</a>: 基于 Vue.js 与 BootStrap 4 的响应式管理控制台，包含了 36 个元素、18 个页面、18 个自定义图标等内容；其使用 Chart.js 构建了响应式图标、利用 Leaflet 与 amMap 构建可视化地图组件等内容。</li>
</ul>
<h2 id="articleHeader6">巅峰人生</h2>
<ul><li>
<a href="https://parg.co/bFf" rel="nofollow noreferrer" target="_blank">股权、期权有哪些坑？从技术创业的角度说开去</a>：本文整理自知道创宇 CTO 兼 COO 杨冀龙在 GTLC 全球领导力峰会上的演讲，原题为《技术创业那些事儿》。本文从依赖独特技术领先与依赖业务领先等不同类型的创业公司的股权分配、期权分配、投融资以及创业人自己的坚持等方面分享创业经历过哪些坑、该怎么处理。</li></ul>
<h2 id="articleHeader7">前端之巅</h2>
<p>「前端之巅」是InfoQ旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复“加群”。投稿请发邮件到editors@cn.infoq.com，注明“前端之巅投稿”；或者可以阅读往期文章：</p>
<ul>
<li>
<a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>的<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单</a>列表。</li>
<li><a href="https://zhuanlan.zhihu.com/p/28225477" rel="nofollow noreferrer" target="_blank">前端每周清单第 24 期：React 16 中异常处理与 Fiber 实战、Vue 图表与 jQuery 插件、V8 Turbofan 性能优化</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/27932159" rel="nofollow noreferrer" target="_blank">前端每周清单第 22 期：ES8 正式发布、React 与 GraphQL 开发指南和性能优化，Vue.js 2.4.0 发布</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端清单：Vue2 响应式原理，RN 运行内置 Node，JS 巧用 Proxy 反混淆，GraphQL 优劣思辨

## 原文链接
[https://segmentfault.com/a/1190000010541905](https://segmentfault.com/a/1190000010541905)

