---
title: '前端每周清单第 47 期：NPM 年度报告与 2018 展望，Airbnb React Router 实践' 
date: 2018-12-17 2:30:07
hidden: true
slug: q77e6mbwjic
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012846628" src="https://static.alili.tech/img/remote/1460000012846628" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID: frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader0">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li>
<a href="https://parg.co/UVE" rel="nofollow noreferrer" target="_blank">NPM 发布 2017 JavaScript 框架增长度报告</a>: 作者使用某个包的下载占全部下载量的百分比，作为衡量某个框架是否持续性增长的指标，并以此发布了 2017 JavaScript 框架使用报告；该报告主要着眼于前端框架，React 生态圈以及后端框架这三个部分。根据该报告，前端框架中的 Preact 与 Vue 都是增长迅速，不过 React 在总体量与增长速度上还是占据优势；而在 React 生态圈内，Apollo 则是飞速崛起，MobX 也是增长迅速但还难以匹敌 Redux。</li>
<li>
<a href="https://parg.co/UtZ" rel="nofollow noreferrer" target="_blank">Nuxt.js 1.0 发布</a>: Nuxt.js 是基于 Vue.js, vue-router, vuex 以及 vue-meta 的，快速创建 Web 应用的零配置工具。本周发布的 Nuxt 1.0.0 版本，将各项依赖更新到了最新版本，同时提升了整体的稳定性与性能表现，也意味着其能够用于生产环境；更多特性变化描述请查看原文。</li>
<li>
<a href="https://parg.co/UV5" rel="nofollow noreferrer" target="_blank">Node v9.4.0 发布</a>: 该版本中的重要变化包括了废弃 AsyncHooks Sensitive API 与 runInAsyncIdScope，从 _events 内部实现中移除 reaches，在 clientError 中添加 rawPacket 属性等等；可以查看原文了解更多变化。</li>
<li>
<a href="https://parg.co/UVh" rel="nofollow noreferrer" target="_blank">NPM 确定新的包命名规则</a>: 为了尽可能避免包的误植域名现象，NPM Registry 将不会再允许使用相似的包命名；不过会进一步鼓励开发者使用自己的命名空间来发布包。譬如，因为 react-native 已经存在，将不会再允许类似于 reactnative 这样的包发布，不过推荐使用 @ceejbot/reactnative 这样的方式。</li>
</ul>
<h2 id="articleHeader1">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li>
<a href="https://bitsofco.de/whats-new-in-html-5-2/" rel="nofollow noreferrer" target="_blank">HTML 5.2 新特性与实践盘点</a>: 不到一个月之前，HTML 5.2 成为了 W3C 的官方推荐版本，这也就意味着 W3C 官方建议开发者应该遵循与实现该版本。本文则是对于 HTML 5.2 中提出的影响较大的，新特性与实践模式进行了概述，譬如原生弹窗组件、iFrames 中的 Payment Request API 以及部分元素实践的变化等；更多 HTML 学习参考<a href="https://parg.co/UHU" rel="nofollow noreferrer" target="_blank">现代 Web 开发基础</a>。</li>
<li>
<a href="https://parg.co/UVr" rel="nofollow noreferrer" target="_blank">基于 TypeScript 的实时聊天应用</a>: 作者在本文中介绍了如何仅使用 TypeScript，来整合 Web Sockets，Node 与 Angular 去实现某个实时聊天应用。本文首先介绍了 WebSocket 的定义与规范，然后使用 Express，Socket.io 去实现服务端应用，最后使用 Angular 来构建客户端应用；更多 TypeScript 学习资料参阅<a href="https://parg.co/bxN" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发基础</a>。</li>
<li>
<a href="https://parg.co/UVP" rel="nofollow noreferrer" target="_blank">基于 Node.js 实现的深度学习面部识别库</a>: 本文中，作者介绍了如何使用新近开源的 <a href="https://github.com/justadudewhohacks/face-recognition.js" rel="nofollow noreferrer" target="_blank">face-recognition.js</a> 库，去构建高可用的面部识别与检测应用。该库底层使用了 dlib，然后使用 Node.js 绑定来暴露上层接口；而 dlib 则使用了深度学习算法，并且内置了部分预训练的模型，其在 LFW 面部识别评测中能够获得 99.38% 的准确率。更多 Node.js 学习参考 <a href="https://parg.co/b2s" rel="nofollow noreferrer" target="_blank">深入浅出 Node.js 全栈架构</a>。</li>
</ul>
<h2 id="articleHeader2">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li>
<a href="https://parg.co/UVJ" rel="nofollow noreferrer" target="_blank">基于 React Router v4 的服务端渲染，代码分割与懒加载实践</a>: 本文中，来自 Airbnb 的工程师分享的了，他们基于 React Router V4 进行服务端渲染，代码分割与懒加载的实践。在 RRV4 中，路由即组件的方案替代了原本的集中式配置，但是这导致了无法根据路径进行合适的服务端渲染；针对这个问题，作者首先讨论了如何在现有框架上进行路由管理，然后讨论了异步组件与代码分割的技巧。更多 React 学习参考 <a href="https://parg.co/U0I" rel="nofollow noreferrer" target="_blank">React 与前端工程化实践</a>。</li>
<li>
<a href="https://parg.co/Uti" rel="nofollow noreferrer" target="_blank">2018 Web 开发者学习路线图</a>: 本仓库包含了一系列成为前端工程师、服务端工程师或者运维工程师的学习路线图，前端工程师路线图包括了基础、深入 JavaScript 中的测试、框架、模块打包、包管理、响应式开发等，后端则包括了开发框架、包管理、数据库、缓存、消息中间件、搜索引擎等，DevOps 则包括了操作系统、云计算、持续集成、自动化、监控告警、Web 服务器、集群管理等等。更多图谱参考 <a href="https://parg.co/UHY" rel="nofollow noreferrer" target="_blank">IT 知识图谱与技术路线</a>。</li>
<li>
<a href="https://parg.co/UV8" rel="nofollow noreferrer" target="_blank">8 个 2018 构建 Node.js 应用的建议</a>: 本文是来自 RisingStack 的工程师分享的，他们关于 2018 年构建 Node.js 应用的建议。这些建议包括使用 async-await, 尝试 import 与 import(), 尝试 HTTP/2，加固你的 Node.js 应用等等。更多 Node.js 学习参考 <a href="https://parg.co/b2s" rel="nofollow noreferrer" target="_blank">深入浅出 Node.js 全栈架构</a>。</li>
</ul>
<h2 id="articleHeader3">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li>
<a href="http://t.cn/RQAfr5x" rel="nofollow noreferrer" target="_blank">现代网络负载均衡与代理综述</a>: 负载均衡是构建现代分布式应用系统的重要组成部分，本文即是对现代负载均衡与代理技术进行了综述与盘点。本文依次讨论了什么是负载均衡，其和代理的异同，负载均衡的特点，现代常用 L4 与 L7 的不同层负载均衡的实现拓扑与应用案例等；更多微服务相关参考<a href="https://parg.co/bvT" rel="nofollow noreferrer" target="_blank">服务端应用程序开发与系统架构</a>。</li>
<li>
<a href="https://parg.co/UVV" rel="nofollow noreferrer" target="_blank">操作系统工作原理：开发者应该掌握的十个概念</a>: 操作系统是软件开发中必备的基础知识之一，而作者在本文中总结了十个操作系统相关的关键概念，来帮助开发者更深入地掌握编程理念。这些概念包括进程与进程管理、线程与并发、调度、内存管理、输入与输出管理、可视化、分布式文件系统、分布式共享内存、云计算等等；更多操作学习参考 <a href="https://parg.co/UMI" rel="nofollow noreferrer" target="_blank">Linux 配置使用、内部原理与 Shell 编程</a>。</li>
<li>
<a href="https://parg.co/UVk" rel="nofollow noreferrer" target="_blank">2018 年前端展望：合久必分，分久必合</a>: 这几年来前端领域风起云涌，百花齐放，本文在简要总结 2017 前端各个框架领域的变化之后，对 2018 年可能的发展进行了展望。React 可能在渲染函数参数、setState 返回 Promise、异步友好地生命周期回调等方面做出改进，初次之外，作者还对 Angular、Vue、Webpack、Parcel 等框架或工具进行了点评；更多前端学习参考 <a href="https://parg.co/bMe" rel="nofollow noreferrer" target="_blank">Web 开发基础与工程实践</a>。</li>
</ul>
<h2 id="articleHeader4">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li>
<a href="https://github.com/gaojiuli/toapi" rel="nofollow noreferrer" target="_blank">toapi</a>: Toapi 是基于 Flask 开发的，能够将任何网站转化为 API 服务的框架。Toapi 实际上也包含了爬虫抓取、接口服务等部分，不过其简化了整个流程；使用者仅需要定义数据的输入输出，Toapi 会帮助自动化整个流程。</li>
<li>
<a href="https://parg.co/UVY" rel="nofollow noreferrer" target="_blank">TOAST UI Editor</a>: TOAST UI Editor 是面向生产环境的，可扩展的，支持 MarkDown 语法的 WYSIWYG 编辑器；它提供了 MarkDown 与 WYSIWYG 两种模式。TOAST UI Editor 实现了 CommonMark 与 GFM 两个标准，同时提供了强大的 API 来方便开发者自定义扩展。</li>
<li>
<a href="https://github.com/NervJS/nerv" rel="nofollow noreferrer" target="_blank">Nerv</a>: Nerv 是基于 Virtual-DOM 的 JavaScript（TypeScript）框架，其能够兼容 React 16 API；不过提供了更加高性能、小尺寸与更好浏览器兼容性等特性。</li>
<li>
<a href="https://github.com/developit/workerize" rel="nofollow noreferrer" target="_blank">workerize</a>: workerize 能够方便地将某个模块移入 Web Worker，自动反射提供出接口函数；workerize 会注入某个轻量级的 RPC 实现到应用中，支持同步或者异步地 Worker 函数调用，并且能够顺滑支持 async/await。</li>
<li>
<a href="https://github.com/emilwallner/Screenshot-to-code-in-Keras" rel="nofollow noreferrer" target="_blank">Screenshot-to-code-in-Keras</a>: 近年来深度学习技术飞速发展，或可以在某些方面改变前端开发；而该仓库提供了某个神经网络，来将设计稿的截图直接转化为静态网页，它能够加速原型实现地速度，并且降低软件构建的成本。</li>
</ul>
<h2 id="articleHeader5">巅峰人生</h2>
<ul><li>
<a href="https://mp.weixin.qq.com/s/nzZGByazWK0IuRkPMia5Ew" rel="nofollow noreferrer" target="_blank">老炮程序员响马：年轻时我想写代码到 60 岁，现在我想写到 65 岁</a>: 响马（Xicilion），本名刘琥，70 后程序员，南京第三极软件科技有限公司创始人。1992 年毕业于南京动力高等专科学校后留校教授计算机课程，1998 年创办西祠胡同，2012 年创办孢子社区，目前专注于 fibjs 项目的开发。本文是对其几十年来技术之路的回顾与展望，也是一代技术人的青春回忆。</li></ul>
<h2 id="articleHeader6">前端之巅</h2>
<p>「前端之巅」是 InfoQ 旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复 “ 加群 ”。投稿请发邮件到 editors@cn.infoq.com，注明 “ 前端之巅投稿 ”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 47 期：NPM 年度报告与 2018 展望，Airbnb React Router 实践

## 原文链接
[https://segmentfault.com/a/1190000012846623](https://segmentfault.com/a/1190000012846623)

