---
title: '前端每周清单第 22 期：ES8 正式发布、React 与 GraphQL 开发指南和性能优化，Vue.js 2.4.0 发布' 
date: 2019-01-08 2:30:11
hidden: true
slug: iza3ho5n2q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单第 22 期：ES8 正式发布、React 与 GraphQL 开发指南和性能优化，Vue.js 2.4.0 发布以及使用 TypeScript 开发 Vue.js 应用</a> 为InfoQ中文站特供稿件，首发地址为<a href="https://parg.co/bhI" rel="nofollow noreferrer" target="_blank">前端之巅公众号</a>；如需转载，请与InfoQ中文站联系。从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>的<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单系列</a>系列；部分文章需要自备梯子。</p></blockquote>
<h1 id="articleHeader0">前端每周清单第 22 期：ES8 正式发布、React 与 GraphQL 开发指南和性能优化，Vue.js 2.4.0 发布以及使用 TypeScript 开发 Vue.js 应用</h1>
<p><code>前端</code> <code>前端每周清单</code></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader1">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li><p><a href="https://parg.co/b10" rel="nofollow noreferrer" target="_blank">ECMAScript 2017（ES8）正式发布</a>：ECMAScript 2017 或 ES8 于 2017 年六月底由 TC39 正式发布，可以在<a href="https://www.ecma-international.org/ecma-262/8.0/index.html" rel="nofollow noreferrer" target="_blank">这里</a>浏览完整的版本；ES8 中代表性的特征包括了 String padding、Object.values、Object.entries、Object.getOwnPropertyDescriptors、 函数参数列表与调用中的尾部逗号、异步函数、共享内存与原子操作等。</p></li>
<li><p><a href="https://github.com/vuejs/vue/releases/tag/v2.4.0" rel="nofollow noreferrer" target="_blank">Vue.js 2.4.0 发布</a>：Vue.js 2.4.0 版本提供了内置的服务端渲染与异步组件支持，从而保证了在服务端渲染中也能使用异步组件，而不再是局限于路由中使用。此外该版本还简化了包装组件的写法、提供了 v-on 等一系列新的指令或者 API 特性，并且修复了老版本中存在的错误；更多详细内容可参考原文，或者阅读 <a href="https://parg.co/b17" rel="nofollow noreferrer" target="_blank"> Vue.js 2.4.0 中的 4 个重大变化</a>一文。</p></li>
<li><p><a href="https://parg.co/bIw" rel="nofollow noreferrer" target="_blank">npm 5.2.0 内置 npx 包执行器</a>：近日发布的 npm 5.2.0 版本中内置了伴生命令：npx，类似于 npm 简化了项目开发中的依赖安装与管理，该工具致力于提升开发者使用包提供的命令行的体验。npx 允许我们使用本地安装的命令行工具而不需要再定义 npm run-script，并且允许我们仅执行一次脚本而不需要再将其实际安装到本地；同时 npx 还允许我们以不同的 node 版本来运行指定命令、允许我们交互式地开发 node 命令行工具以及便捷地安装来自于 gist 的脚本。</p></li>
<li><p><a href="https://parg.co/b1C" rel="nofollow noreferrer" target="_blank">Babylon.js 3.0 发布</a>：Babylon.js 是基于 HTML5 与 WebGL 的创建 3D 交互应用的开源框架，它提供了易用的 API 与开箱即用的性能优化。近日发布的 3.0 版本是 Babylon 重要的里程碑之一，该版本包含了大量的新特性与错误修复，支持 WebGL 2、WebVR 1.1、gITF 2.0、PBR 等多个特性。</p></li>
<li><p><a href="https://parg.co/b1a" rel="nofollow noreferrer" target="_blank">Node.js 发布重大安全更新</a>：近日 Node.js 发布重大安全更新，主要针对固定哈希表种子值（Constant HashTable Seeds）等多个 Bug。目前流行中几个版本的 Node.js（8.x，7.x，V6 LTS，V4 LTS）中都使用了固定的哈希表种子值，这有可能会导致 Node.js 应用受到基于哈希洪水的 DoS 攻击；暂时的修复方式是默认关闭 V8 的快照功能，导致依赖于 <code>vm.runInNewContext</code> 的代码会有所性能损耗，不过未来会选择合适的方案重新实现该部分代码。</p></li>
</ul>
<h2 id="articleHeader2">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li><p><a href="https://parg.co/b1n" rel="nofollow noreferrer" target="_blank">Progressive Web Apps 入门教程</a>：或许你已经对 PWA 有所耳闻，或者已经真实使用过某个 PWA 应用；本文并不着眼于详细介绍 PWA 的内部原理与工作机制，而是希望以简明扼要的语义引导读者构建 PWA 应用 。本文依次介绍了如何测试自身应用的 PWA 评分、构建图标与说明、添加 Service Worker、发布到 Github Pages 等；更多 PWA 相关资料参考 <a href="https://parg.co/bVh" rel="nofollow noreferrer" target="_blank"> https://parg.co/bVh  </a>。</p></li>
<li><p><a href="https://github.com/howtographql/howtographql" rel="nofollow noreferrer" target="_blank">GraphQL 全栈教程</a>：HowToGraphQL 是介绍 GraphQL 的全栈教程，由 Graphcool 以及很多其他优秀的贡献者协作而成。该教程首先是对于 GraphQL 设计理念、基础概念以及先进特性的介绍，然后介绍了在 React、Vue、Expo 等前端项目中如何使用 GraphQL，以及如何使用 Graphcool、JavaScript、Java 等语言快速搭建 GraphQL 服务端；更多 GraphQL 相关资料参考 <a href="https://parg.co/b1e" rel="nofollow noreferrer" target="_blank"> https://parg.co/b1e </a>。</p></li>
<li><p><a href="https://parg.co/b1j" rel="nofollow noreferrer" target="_blank">Vue.js 项目中使用 TypeScript</a>：Vue.js 是优秀的渐进式前端框架，而 TypeScript 则可以为项目添加静态类型检测的特性，本文即是介绍如何在 Vue.js 项目中使用 TypeScript。本文以 Vue.js 中的单文件组件为例，首先讨论了 tsconfig.json 的基本配置以及如何引入 Webpack 并配置合适的 loader；然后介绍了 TypeScript 的基础用法，更多 Vue.js 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。</p></li>
<li><p><a href="https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5" rel="nofollow noreferrer" target="_blank">NgRx 的设计模式与技巧分享</a>：状态管理一直是构建前端应用过程中的难点之一， Angular 也为我们提供了多种不同的设计模式来进行状态管理；而本文即是介绍如何使用 NgRx 这个库进行状态管理。NgRx 是非常简单易用，没有太多限制条件的状态管理库；本文首先概述了 NgRx 的核心概念与设计原则，然后以实际的项目为例介绍了如何使用 NgRx 处理 Action 以及副作用。</p></li>
<li><p><a href="https://parg.co/b1i" rel="nofollow noreferrer" target="_blank">从零到一学习如何用 Babylon.js 创建跨平台的 WebVR 体验</a>：WebVR 允许我们跨平台地在多设备上发布应用与内容，而本文即介绍如何利用 Babylon.js 创建跨平台地 WebVR 应用。本文首先介绍了可供开发者使用的 VR 设备与扩展，然后介绍如何搭建基础的开发环境、如何开发 WebVR 的基本帧动画、如何响应用户交互并且添加第三方控制器等内容。</p></li>
</ul>
<h2 id="articleHeader3">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li><p><a href="https://parg.co/b1X" rel="nofollow noreferrer" target="_blank">用强类型语言 GraphQL 增强 React</a>：GraphQL、React 这两项技术都来自 Facebook，它们共同成长。在本文中，Shane Stillwell 展示了 GraphQL 作为一种强类型的基于 JavaScript 的语言，如何帮助开发者与他们的数据建立联系并改善跨服务边界的封送处理。GraphQL 是可扩展的，并可与 REST 共存，可以在任意后端软件中实现；更多 GraphQL 相关资料参考 <a href="https://parg.co/b1e" rel="nofollow noreferrer" target="_blank"> https://parg.co/b1e </a>。</p></li>
<li><p><a href="https://parg.co/b1v" rel="nofollow noreferrer" target="_blank">高性能 React 开发：3 个常用的辅助工具</a>：我们可以使用 React 开发高性能的应用，不过有时候一些小的错误却会导致严重的性能错误。缓慢的组件挂载、过深的组件树以及不必要的渲染都有可能会削弱应用用户体验。幸而现在有很多优秀的工具能够帮助我们应对这些性能问题，而作者在本文中即是详细地介绍了三个辅助工具及相关技术以提升应用性能；更多 React 相关资料参考<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> https://parg.co/bM1 </a>。</p></li>
<li><p><a href="https://gist.github.com/jareware/4738651" rel="nofollow noreferrer" target="_blank">你可能并不知道的 16 个 SCSS 特性</a><button class="btn btn-xs btn-default ml10 preview" data-url="jareware/4738651" data-typeid="1">点击预览</button>：作者自 2009 年以来一直使用 SCSS/SASS 来进行大部分的样式工作，而本文即是对于某些有用但是并不一定为人所知的 SCSS 特性进行介绍。本文介绍的特性包括了父选择器的灵活用法、控制流指令、默认函数参数、扩展操作符等等；更多 CSS/SCSS 相关资料参考<a href="https://parg.co/baH" rel="nofollow noreferrer" target="_blank"> https://parg.co/baH  </a>。</p></li>
<li><p><a href="https://parg.co/b19" rel="nofollow noreferrer" target="_blank">大幅度减少 CSS 包体大小</a>：本文作者介绍了自己在构建某个在线售票的网站过程中，如何利用样式类名分割与作用域隔离来大幅度减少 CSS 打包文件体积的实践技巧。作者主要使用 CSS Modules，然后自定义了其样式类名生成规则来保证生成较短的样式类名并且使用作用域隔离来保证样式隔离。</p></li>
<li><p><a href="https://parg.co/b1y" rel="nofollow noreferrer" target="_blank">扩展 Node.js 应用</a>：Node.js 设计的初衷之一即是保证其可扩展性，本文则详细介绍了开发者应该了解的可用于扩展 Node.js 应用的内建工具。本文首先介绍了复制、分解、分割等常用的设计思想，然后讨论了如何利用 Node.js 内置的 Cluster 模块来保证应用的可扩展性与如何提供零停机重启的特性。</p></li>
</ul>
<h2 id="articleHeader4">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li><p><a href="https://parg.co/b1Q" rel="nofollow noreferrer" target="_blank">常见 Web 框架的内部技术纵览</a>：该系列文章从用户界面开发、用户体验设计以及内部技术纵览等多个角度讨论了现代 Web 框架的设计理念与思路；而本文着重于讨论不同的 Web 框架，对于某些共通的基本需求的不同实现方式，包括了它们支持的运行环境、如何与现有的规范保持一致、如何提供函数式支持、如何保证前向兼容性、如何进行国际化等多个方面。</p></li>
<li><p><a href="https://github.com/azat-co/practicalnode" rel="nofollow noreferrer" target="_blank">Node.js 实战第二版</a>：该仓库是 Azat Mardan 的著作 Practical Node.js 第二版参考的开源发布地址，包含了十二个章节与相关的示范代码，非常值得一读。该书依次介绍了 Node.js 环境搭建与 Express.js 初探、基于 Mocha 的单元测试、模板引擎、数据持久化与性能优化、项目调试、部署与发布等章节；更多 Node.js 相关资料参考 <a href="https://parg.co/be0" rel="nofollow noreferrer" target="_blank"> https://parg.co/be0 </a>。</p></li>
<li><p><a href="http://makersden.io/blog/look-inside-fiber/" rel="nofollow noreferrer" target="_blank">解构 React Fiber，了解其工作流程</a>：调和算法是 React 的核心机制之一，而在即将发布的 16.0.0 版本中 React 会引入 Fiber 替代现有的 Stack Reconciler。本文则是深入浅出地介绍 Fiber 工作流程与代码逻辑，首先从客户端渲染的入口函数 <code>render</code> 开始，然后介绍在状态变化之后一系列地响应步骤；更多相关资料参考 <a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> https://parg.co/bM1  </a>。</p></li>
<li><p><a href="https://github.com/Kristories/awesome-guidelines" rel="nofollow noreferrer" target="_blank">代码风格约定与标准</a>：本仓库提供了一系列的各个语言的常用代码风格约定与标准，与 JavaScript 相关的包含了来自 Google、Airbnb 等多个公司或者社区的样式规范，还有包括 HTML、CSS、SCSS 等一系列 Web 相关的规范。</p></li>
<li><p><a href="https://parg.co/b1w" rel="nofollow noreferrer" target="_blank">ES2015 中集合迭代器的优化</a>：ECMAScript 2015 中引入了 Map 与 Set 等常用的集合；这些集合同样实现了迭代器的特性，因此也就允许我们使用 <code>for-of</code> 或者扩展操作符来迭代操作这些集合。不过在很多的评测中这些新引入的集合的迭代遍历性能并不是很好，本文则详细介绍了引擎中导致 Set 等集合迭代性能较差的原因，并且给出了解决方案与未来的实现规划。</p></li>
</ul>
<h2 id="articleHeader5">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li><p><a href="https://github.com/jaredreich/pell" rel="nofollow noreferrer" target="_blank">Pell</a>：Pell 是仅有 1KB 的所谓所见即所得的富文本编辑器，其不需要依赖于 jQuery、BootStrap 等第三方库。Pell 主要以 ES6 语法开发，并且支持自定义的 SCSS 文件或者复写 CSS 样式来自定义风格，也是非常不错的值得借鉴的编辑器开发示例。</p></li>
<li><p><a href="https://github.com/plasma-umass/doppio" rel="nofollow noreferrer" target="_blank">doppio</a>: doppio 是基于 TypeScript 0.5.0 版本编写的 Java 虚拟机（JVM），其支持 Node.js 6.0 以上版本，并且内置了 Java 8 JDK 环境；doppio 是个有趣的尝试打破浏览器语言栅栏的尝试，浏览其源代码也可以学习如何编写 Java 虚拟机。</p></li>
<li><p><a href="https://github.com/samccone/bundle-buddy" rel="nofollow noreferrer" target="_blank">Bundle Buddy</a>：Bundle Buddy 能够通过分析编译生成的 SourceMap 来寻找 JavaScript 代码块之间的源代码冗余情况。该工具能够帮助开发者寻找合适的代码分割点以降低最终发布应用的不稳定性，同时还能提升页面加载性能。</p></li>
<li><p><a href="https://github.com/gpujs/gpu.js" rel="nofollow noreferrer" target="_blank">gpu.js</a>：在<a href="https://zhuanlan.zhihu.com/p/27815800" rel="nofollow noreferrer" target="_blank">上周的前端每周清单</a>中我们介绍过 GPGPU（General Purpose Computing on GPUs）的概念与基于 WebGL 的实现方式，而 gpu.js 就是提供了浏览器中快速实现 GPGPU 的单文件 JavaScript 库。gpu.js 能够自动地将某些特定的 JavaScript 函数编译为中间语言，然后利用 WebGLS API 使其运行在 GPU 中；而在某些无法使用 GPU 的环境下，仍然会将这些函数以正常的 JavaScript 执行流运行。</p></li>
<li><p><a href="https://github.com/tebelorg/TagUI" rel="nofollow noreferrer" target="_blank">TagUI</a>: TagUI 是通用的 Web 自动化交互，提供了开箱即用的声明式流程配置使用特性，支持 Chrome、Firefox、PhantomJS、Headless Chrome 等多个运行环境；同时 TagUI 还提供了 Chrome 插件以记录具体步骤以及对象存储和灵活的数据库存储支持。</p></li>
</ul>
<h2 id="articleHeader6">前端之巅</h2>
<p>「前端之巅」是InfoQ旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复“加群”。投稿请发邮件到editors@cn.infoq.com，注明“前端之巅投稿”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 22 期：ES8 正式发布、React 与 GraphQL 开发指南和性能优化，Vue.js 2.4.0 发布

## 原文链接
[https://segmentfault.com/a/1190000010220435](https://segmentfault.com/a/1190000010220435)

