---
title: '前端每周清单第 28 期：JS 运行原理与优化，高性能 CSS 引擎，Coursera GraphQL 实践' 
date: 2019-01-02 2:30:09
hidden: true
slug: aykt5yjb0qc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010890043" src="https://static.alili.tech/img/remote/1460000010890043" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader0">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li><p><a href="https://parg.co/bTj" rel="nofollow noreferrer" target="_blank">Ayo.js: Node.js 内部的又一次分裂</a>：Node.js 正逐步成为主流的服务端语言之一，其驱动着 Microsoft 等许多公司的业务流程；与此同时，Node.js 社区也逐步在扩大。 然而在上周一 TSC（技术指导委员会）上有关是否保留 Rod Vagg 职位的投票中，成员对于所谓的行为准则遵循度发生了较大分歧，并且导致了数位 TSC 成员的退出、以及新的命名为 Ayo.js 的 Node.js Fork 项目创建。这件事也反映了开源社区内部的自我调节能力，希望能有妥善的解决。</p></li>
<li><p><a href="https://www.polymer-project.org/blog/2017-08-22-npm-modules" rel="nofollow noreferrer" target="_blank">Polymer 3.0 预览</a>：在 2017 Polymer Summit 上，开发团队发布了有史以来最大的变革路线之一，其核心特性在于从 HTML Imports 切换到了 ES6 Modules，以及从 Bower 迁移到了 npm。这种变革保证了 Polymer 能够与大部分现代 JavaScript 开发者习惯的工作流相适应，除以之外，本文还详细比较了 HTML Imports 与 ES6 Modules 各自的优劣，以及未来的详细版本更新计划。</p></li>
</ul>
<h2 id="articleHeader1">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li><p><a href="https://parg.co/bTi" rel="nofollow noreferrer" target="_blank">React Native 中气泡效果实践</a>：本文记述了作者在学习使用 Animated 与 PanResponder，构建页面切换时动画效果的实践心得；本文首先介绍了 Animated 的基础用法，然后讨论了如何用 Animated.timing 添加变换，最后介绍了如何实现气泡效果并且集成 PanResponder 实现页面滑动切换的效果。更多 React Native 相关资料参考 <a href="https://parg.co/bV4" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTL" rel="nofollow noreferrer" target="_blank">Angular 中组件间的三种通信方式</a>：本文是基于 Angular 2 编写的讨论 Angular 中组件间通信方式的文章，其同样适合于现在主流的 Angular 4 版本。本文依次介绍了在组件之间传递组件句柄以读取数据、同级组件利用父组件作为中转完成数据传递、利用自动注入的单例 Service 来传递数据等。更多 Angular 相关资料参考<a href="https://parg.co/bT2" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTy" rel="nofollow noreferrer" target="_blank">Node.js 应用的测试教程</a>：JavaScript 是典型的弱类型解释型语言，而添加合适的测试用例则是保证代码的鲁棒性与稳定性的有效方式。本文首先介绍了测试的概念以及基础的单元测试用例的逻辑，然后介绍了如何使用 Mocha 与 Chai 编写并运行测试用例；更多 Node.js 相关资料参考<a href="https://parg.co/be0" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://blog.angular.io/the-state-of-css-in-angular-4a52d4bd2700" rel="nofollow noreferrer" target="_blank">Angular 中 CSS 样式使用</a>：为应用添加合适的样式是提升整体用户体验与感染力的重要手段，而 CSS 则是通用的 Web 样式定义标准。本文主要讨论如何在 Angular 应用中使用 CSS 来为组件添加样式，首先介绍了全局 CSS 与组件隔离的 CSS 这两种不同的定义范式，然后介绍了三种组件封装的方式；更多 Angular 相关资料参考<a href="https://parg.co/bT2" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTF" rel="nofollow noreferrer" target="_blank">使用 Flow 为 React 应用添加类型检测</a>：与 Flow 相比，TypeScript 是更为流行的 JavaScript 静态类型检测工具；不过近年来 Flow 社区也一直在不断增长，特别是其在 React 方面的天生优势为其增添了不少优势。本文首先对比了 Flow 与 TypeScript 各自的优劣，然后细致介绍了如何使用 Flow 为 React 与 Redux 等添加类型检测；更多 Flow 相关资料参考<a href="https://parg.co/bzM" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
</ul>
<h2 id="articleHeader2">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li><p><a href="https://parg.co/bTJ" rel="nofollow noreferrer" target="_blank">为什么在 React Render 函数中使用箭头函数或者 bind 绑定是有问题的？</a>：我们常常会在 Render 函数中使用 bind 或者 Arrow Function 来绑定回调函数的 this 指针，本文则以实际的案例分析了这种方式存在怎样的问题。更多 React 相关资料参考<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTX" rel="nofollow noreferrer" target="_blank">Coursera 应用 GraphQL 实践</a>：在过去的数年中，Coursera 通过编写动态工具以逐步将它们的所有 REST API 迁移到了 GraphQL 接口；这种方式即允许服务端开发者在以他们熟悉的方式编写 RESTful 接口，也允许客户端开发者通过 GraphQL 灵活地访问数据。本文则是 Coursera 开发者分享的他们应用 GraphQL 的实践经验，包括在这个过程中感受到的优势与碰到的坑。更多 GraphQL 相关资料参考<a href="https://parg.co/b1e" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTe" rel="nofollow noreferrer" target="_blank">Font-size: 比想象中还要复杂点的属性</a>: Font-size 算是最常用而又复杂的属性之一，本文则是从构建样式系统的角度出发，讨论 Font-size 属性处理的复杂性。本文首先讨论了 Font-size 常用的单位，尺寸、百分比、计算值、绝对关键字、相对关键字等；然后介绍了样式系统的工作原理以及对于不同的属性值的工作原理与默认设置。更多 CSS/SCSS 相关资料参考<a href="https://parg.co/baH" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTI" rel="nofollow noreferrer" target="_blank">深入浅出 Angular.js 动画</a>：合理的变换动画是构建现代 Web 应用的重要元素，能够方便用户更好地理解产品的设计理念，提升用户体验。本文则是着眼于讨论基于 Angular.js 构建现代 Web 应用中的动画的不同方式，从 CSS 与 JavaScript 动画基础开始讨论，到复杂的 Angular 应用动画组成。本文依次介绍了状态转化基础、如何添加 UI 变换动画、使用 GreenSock 编写命令式动画、使用 Angular Animations 添加声明式动画等内容；更多 Angular 相关资料参考<a href="https://parg.co/bT2" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
</ul>
<h2 id="articleHeader3">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li><p><a href="https://parg.co/bTv" rel="nofollow noreferrer" target="_blank">使用 JavaScript 扩展低延迟内存中键值存储</a>：RAMCloud 是典型的整合了 DRAM 与 RDMA 的超低延迟键值存储，本文则是讨论了使用 SQL、C++/Native Code 以及 JavaScript 这三种不同的方式实现服务端逻辑计算的性能与可用性对比。原论文是使用了 asm.js 来加速 JavaScript 运算，本文作者还扩展讨论了 WebAssembly 在高性能计算方面的应用；更多 JavaScript 相关参考<a href="https://parg.co/b2O" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bT9" rel="nofollow noreferrer" target="_blank">十个可编译为 JavaScript 的语言对比</a>：随着现代 Web 应用复杂度的增加，其相较于简单的网站有了更多的特殊需求；然而浏览器本身只是提供了固定的统一的功能接口，并且目前浏览器仅支持 JavaScript 这一门脚本语言。在这种背景下，出现了很多的 JavaScript 的方言或者超集，这些能够编译为 JavaScript 的语义以其各自的语言特性吸引了很多的关注；本文则对比讨论了 Dart、TypeScript、Elm、PureScript、CoffeeScript、ClojureScript、Scala.js、Reason、Haxe、Nim 等常见的可编译为 JavaScript 的语言。更多 JavaScript 相关参考<a href="https://parg.co/b2O" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTa" rel="nofollow noreferrer" target="_blank">深入解析高性能 CSS 引擎：Quantum CSS（Stylo）</a>：Qutantum 项目旨在利用 Rust 重写 Firefox 内核来提升其运行性能，该项目将会替换现存的 Jet 引擎，主要由 Flow、CSS、Render、DOM、Compositor 这几个部分组成。本文则是对于 Quantum CSS（又名 Stylo）进行深度解析，其能有效利用现代计算机上搭配的硬件设备，利用所有的计算单元来并行化所有的操作。本文依次介绍了 CSS 引擎的工作原理、Stylo 的优化之道等内容；更多浏览器相关资料参考<a href="https://parg.co/btv" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
<li><p><a href="https://parg.co/bTg" rel="nofollow noreferrer" target="_blank">JavaScript 工作原理与优化建议</a>：本系列文章着眼于深入讨论 JavaScript 及其内部工作原理，从而帮助开发者编写出更加稳定高性能的 JavaScript 代码。首篇文章会对于 JavaScript 引擎、运行时与调用栈进行简要的介绍，第二篇会专注于 Google V8 引擎的内部原理介绍，与此同时文中还会给出数个 JavaScript 代码优化的建议；更多 JavaScript 相关参考<a href="https://parg.co/b2O" rel="nofollow noreferrer" target="_blank">这里</a>。</p></li>
</ul>
<h2 id="articleHeader4">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li><p><a href="https://github.com/extr0py/oni" rel="nofollow noreferrer" target="_blank">Oni</a>：Oni 是基于 Neovim、React 与 Electro 的 IDE，其受到了 VSCode、Atom 以及 LightTable 的启发。Oni 提供了语法提示、自动补全、错误提示、模糊搜索、状态栏等功能，希望为开发者提供跨平台、丰富插件、优良界面、高性能、易用易上手的编辑器。</p></li>
<li><p><a href="https://vuejsfeed.com/blog/extension-for-visual-code-to-generate-vue-file-components" rel="nofollow noreferrer" target="_blank">generate-vue-file-components</a>: generate-vue-file-components 是基于 Visual Studio Code 的自动生成 Vue.js 单文件组件的插件，它支持多种灵活地创建方式，允许指定组件模板或者默认的文件路径。</p></li>
<li><p><a href="https://github.com/GoogleChrome/rendertron" rel="nofollow noreferrer" target="_blank">Rendertron</a>: Rendertron 是可使用 Docker 进行容器化打包的，基于 Headless Chrome 的渲染解决方案；Rendertron 可用于渲染动态网页，也可以用于增强 PWA 对于不同的 Bot 的响应内容。Rendertron 能够以独立的 HTTP 服务器的方式运行，也可以以中间件形式嵌入到现有的 Web 服务端应用中。</p></li>
<li><p><a href="https://github.com/RocketChat/Rocket.Chat" rel="nofollow noreferrer" target="_blank">Rocket.Chat</a>：Rocket.Chat 是基于 Meteor 开发的，类 Slack 功能丰富的开源 Web 聊天通信平台。Rocket.Chat 为我们提供了服务端、桌面应用、移动应用、Web 应用等涵盖全流程的模块，同时支持 Docker、Ansible、Heroku 等多种不同的部署方式。</p></li>
</ul>
<h2 id="articleHeader5">巅峰人生</h2>
<ul><li><p><a href="https://parg.co/bTk" rel="nofollow noreferrer" target="_blank">在 CTO 眼里，什么样的程序员是更值得信赖的？</a>：本文是轻松筹 CTO，EGO 会员李汐在大咖说上的分享，主要从公司的层面来聊聊程序员的发展之路。本文依次讨论了如何平衡个人成长与公司效率、90 后程序员的特点以及公司在技术选型上的考量、如何进行有效地个人转型以及优秀程序的特质、如何和产品经理等小伙伴高效合作打造产品等内容。</p></li></ul>
<h2 id="articleHeader6">前端之巅</h2>
<p>「前端之巅」是InfoQ旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复“加群”。投稿请发邮件到editors@cn.infoq.com，注明“前端之巅投稿”；或者可以阅读往期文章：</p>
<ul><li><p><a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>的<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单</a>列表。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 28 期：JS 运行原理与优化，高性能 CSS 引擎，Coursera GraphQL 实践

## 原文链接
[https://segmentfault.com/a/1190000010890038](https://segmentfault.com/a/1190000010890038)

