---
title: '前端每周清单第 45 期: Safari 支持 Service Worker, Parcel 完整教程, 2017 前端大事件' 
date: 2018-12-20 2:30:10
hidden: true
slug: dj94wys0y0a
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID: frontshow），及时获取前端每周清单。</p>
<p>本期是 2017 年的最后一期，不知不觉陪伴大家已经一年了；非常感谢所有阅读过清单的同学的支持，山高水远，来年再见~</p>
<h2 id="articleHeader0">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li>
<a href="https://mp.weixin.qq.com/s/gqNjFzRhurLLYTdWjIKpXg" rel="nofollow noreferrer" target="_blank">Safari 支持 Service Worker 了！</a>: 在昨天发布的 Safari 46 技术预览版里，发布了一个重大更新，在新的桌面版 Safari 里将默认打开 Service Worker，这意味着苹果正在逐步接受 PWA，我们将进入 PWA 的时代。早在今年 7 月份，就有人问过 WebKit 团队是否将支持 Service Worker，当时他们的回答是正在考虑，后来在 8 月份变成“In development”，现在终于正式发布了。PWA 的另一个核心特性 Web App Manifest，苹果表示也正在开发中，按开发进度可能几个月后就能与我们见面。</li>
<li>
<a href="https://parg.co/UCw" rel="nofollow noreferrer" target="_blank">GraphQL.js 0.12.0 发布</a>: 该版本包含了很多的新特性与提升，将之前部分实验特性进行了规范化适应，显著地提升了 Flow 类型的质量。开发者在升级到该版本时需要仔细评估其对于现有系统的影响，特别是对于那些依赖 GraphQL.js 的构建工具等，更多详细的版本特性介绍请查看原文。</li>
<li>
<a href="https://parg.co/UhB" rel="nofollow noreferrer" target="_blank">Webpack Cli 2.0.0 发布</a>: Webpack CLI 是 Webpack 辅助构建工具，能够将应用构建所需要的配置代码交由命令行工具去创建，尽量减少开发者所需要的操作。在 2.0 版本中 Webpack CLI 进一步优化了易用性，允许在配置中使用 ES6 等语法，添加了 v8 编译缓存，同时允许开发者更方便地反馈问题与启动本地服务器。</li>
</ul>
<h2 id="articleHeader1">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li>
<a href="https://parg.co/UsO" rel="nofollow noreferrer" target="_blank">你需要了解的关于 Parcel 的一切</a>: Parcel 是新近开源的零配置、高性能的 Web 构建工具，其相较于 Webpack 更为简单易用；Parcel 内置了开箱即用的开发服务器，其会自动分析依赖、监测文件变化，并且完成线上热替换。本文即是对于 Parcel 用法的介绍，首先分析了 Parcel 的优势，然后具体讨论了现代 Web 开发中常见的技术栈的集成方式，包括 React、Vue、TypeScript 等等；更多 Parcel 相关资料参考<a href="https://github.com/wxyyxc1992/iReactPack" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
<li>
<a href="https://auth0.com/blog/typescript-practical-introduction/" rel="nofollow noreferrer" target="_blank">TypeScript 实战教程</a>: 本文通过实例来学习 TypeScript 的基础特性，首先介绍了如何搭建配置 TypeScript 开发环境，以及主要的编译选项的含义；然后依次讨论了 TypeScript 的语言特性，包括变量、模块、类与对象、接口、装饰器、迭代器等等。更多 TypeScript 教程参考<a href="https://parg.co/bxN" rel="nofollow noreferrer" target="_blank">现代 JavaScript 开发：语法基础与工程实践</a>。</li>
<li>
<a href="https://parg.co/UCB" rel="nofollow noreferrer" target="_blank">基于 Mobx-state-tree 的应用状态管理</a>: 本课程是 Mobx 的作者 Michel Westrate 发布在 egghead 上的，详细介绍 Mobx-state-tree 基本使用的系列视频课程。开发者能够在该课程中学习到如何声明数据模型、如何管理数据模型的生命周期等等，并最终能够使用 MST 中开箱即用的异步 Action、Patch、Snapshot、Middleware 等特性来编写健壮可扩展的现代应用。更多 MobX 相关教程参考<a href="https://parg.co/UGZ" rel="nofollow noreferrer" target="_blank">现代 Web 应用架构与性能调优</a>。</li>
<li>
<a href="https://parg.co/U47" rel="nofollow noreferrer" target="_blank">浏览器 user-agent 简史</a>: 很多人都知道浏览器的 user-agent 字符串，服务器端通过这个字符串进行客户端的浏览器、操作系统、加密等级、浏览器语言、渲染引擎和版本信息的识别。从 1993 年 NCSA 发布首款浏览器 Mosaic 以来，这个字符串经历了纷繁复杂的变化，本文即是介绍 user-agent 字符串的演变简史。更多 DOM 相关教程参考<a href="https://parg.co/UHU" rel="nofollow noreferrer" target="_blank">现代 Web 开发基础</a>。</li>
</ul>
<h2 id="articleHeader2">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li>
<a href="https://sqlwiki.netspi.com/" rel="nofollow noreferrer" target="_blank">NetSPI SQL 注入指南</a>: 本 Wiki 致力于提供针对数据库管理系统（DBMS）的， SQL 注入攻击的识别、漏洞利用、提权等全流程的完整教程。本教程主要分为五大步骤，依次介绍了注入点分析、DBMS 识别、注入类型、注入技巧、攻击型查询载荷等内容；更多 Web 安全相关资料参考<a href="https://parg.co/U4w" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
<li>
<a href="https://parg.co/UC1" rel="nofollow noreferrer" target="_blank">Node.js 中的 CPU 密集操作</a>: Node.js 是典型的基于事件循环的单线程架构，其在处理 CPU 密集型任务的时候不可避免地会碰到瓶颈；本系列文章即是探讨如何在 Node.js 中处理 CPU 密集型代码。首篇文章模拟了密集型处理环境，使用 fork 来创建子进程处理任务，不过这种方式效率较低，并且会带来较大的资源占用；第二篇文章则介绍了基于 Redis 的 Kue 消息队列，如何利用 Kue 来异步多节点地处理任务等。更多 Node.js 教程参考<a href="https://parg.co/UKQ" rel="nofollow noreferrer" target="_blank">深入浅出 Node.js 全栈架构</a>。</li>
<li>
<a href="https://parg.co/UCD" rel="nofollow noreferrer" target="_blank">React Native 事件机制探究</a>: React Native 在某种程度上可以简单看做 Javascript-Java-Xcode 转换器，因此 Raect 代码与原生代码之间的事件交互无疑是非常重要的部分；本文即是详细分析了 React Native 中的事件机制。本文首先介绍了 Device Event Emitter 的设计与单例模式，然后讨论了 RCTDeviceEventEmitter, RCTEventEmitter 等 JavaScript 与原生代码之间的桥梁；接下来本文以简单的原生组件为例介绍了如何完成原生与 JavaScript 之间的事件传递，最后还分析了为何 RN 中没有冒泡机制。更多 React Native 相关资料参考<a href="https://parg.co/URb" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
<li>
<a href="https://parg.co/Uhn" rel="nofollow noreferrer" target="_blank">使用 Apollo Client 进行状态管理的未来</a>: 随着应用体积的增加，其状态管理的复杂性也会大幅度提升；而目前 Apollo Client 已经能够帮助开发者处理远程数据交互，本地的状态数据则依然由 Redux、MobX 这样的状态管理工具负责。本文则是介绍如何利用 Apollo Link 来实现一致性的本地状态管理，统一了远程数据查询与本地状态操作；更多 GraphQL 相关资料参考<a href="https://parg.co/URH" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
</ul>
<h2 id="articleHeader3">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li>
<a href="https://parg.co/Usv" rel="nofollow noreferrer" target="_blank">React 与 Vue.js 的异同</a>: 一年来 React 与 Vue.js 都发生了巨大的变化，取得了长足的发展；本文则是在年末的时候对二者进行了一次深度盘点。本文依次从性能、模板与 JSX 的语法、CSS、生态系统、状态管理等多个角度进行了分析；更多 React 相关资料参考<a href="https://parg.co/URb" rel="nofollow noreferrer" target="_blank">这里</a>。</li>
<li>
<a href="https://parg.co/Us9" rel="nofollow noreferrer" target="_blank">对于 REST is the new SOAP 的回应</a>: <a href="https://parg.co/U4B" rel="nofollow noreferrer" target="_blank">上周的清单</a>中，我们推荐了 Rest is the new SOAP 这篇文章，其列举了诸多 REST 的不足；而本文即是 Phil Sturgeon 的辩驳回应。本文对于 Rest is the new SOAP 几乎是逐字逐句地进行了反驳，对比着看也是能够加深对于 REST 的理解；更多 REST 的讨论参考这里<a href="https://parg.co/UdT" rel="nofollow noreferrer" target="_blank">服务端应用程序开发基础</a>。</li>
<li>
<a href="https://parg.co/UCa" rel="nofollow noreferrer" target="_blank">2017 前端领域发生的重大事件盘点</a>: 年末多盘点，本文则是根据 Github, Google Trends, Stack Overflow, NPM 等站点的统计数据，对 2017 年前端领域发生的重大事件进行了盘点。包括了前端框架、ECMAScript、WebAssembly、包管理器、样式、TypeScript、状态管理、GraphQL、NapaJS 等方面；此外，在<a href="https://parg.co/U4B" rel="nofollow noreferrer" target="_blank">上周的清单</a>中我们推荐了 2017 JavaScript Survey，本周作者则从统计的数据中提取出了<a href="https://parg.co/UhD" rel="nofollow noreferrer" target="_blank">十条要点</a>。</li>
</ul>
<h2 id="articleHeader4">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li>
<a href="https://google.github.io/boardgame.io/#/" rel="nofollow noreferrer" target="_blank">Boardgame.io</a>: Boardgame.io 是基于 React 的游戏框架，该框架允许游戏开发者将游戏的规则转化为一系列的简单函数，在用户执行某个操作之后，能够通过这些函数的组合来改变游戏的状态。该框架使得开发者专注于设计游戏逻辑本身，而不需要考虑或者编写任何的网络或者服务端代码。</li>
<li>
<a href="https://github.com/typicode/lowdb" rel="nofollow noreferrer" target="_blank">lowdb</a>: Lowdb 是基于 Lodash 的本地 JSON 化数据库，支持 Node、Electron 以及浏览器环境。Lowdb 提供了与 Lodash 一致的接口，方便开发者快速上手使用；同时 Lowdb 编写不同的 Adapters 来适应不同的存储环境。</li>
<li>
<a href="https://github.com/danilowoz/react-content-loader" rel="nofollow noreferrer" target="_blank">react-content-loader</a>: react-content-loader 允许开发者利用 SVG，来创建模拟即将加载的内容块结构的提示条，其有点类似于 Facebook 的卡片加载样式。</li>
<li>
<a href="https://github.com/koute/stdweb" rel="nofollow noreferrer" target="_blank">stdweb</a>: stdweb 致力于构建 Web APIs 与 Rust 之间的绑定，从而允许 Rust 与 JavaScript 之间的高可交互性。stdweb 允许在 Rust 中直接插入 JavaScript 代码，其可被编译为 WebAssembly，并且提供了在 Rust 与 JavaScript 之间进行值传递的机制。</li>
<li>
<a href="https://boat.alibaba.com/" rel="nofollow noreferrer" target="_blank">轻舟</a>: 轻舟是手淘团队提供的，基于云端一体化体验一站式开发和运维 APP 的产品。它在体验方面实现了全流程支持、一站式开发环境，无缝整合端上能力与云上服务；依托手机淘宝多年技术积累强力赋能，底层的 WEEX 架构让混合式 APP 在拥有动态性的同时毫不丢失原生体验。</li>
</ul>
<h2 id="articleHeader5">巅峰人生</h2>
<ul><li>
<a href="https://parg.co/U4x" rel="nofollow noreferrer" target="_blank">18 年互联网老兵童剑：我与技术的爱情长跑</a>: 童剑，白山联合创始人兼首席技术官，EGO 北京分会会员。前新浪研发中心总经理，2016 年 5 月加盟白山，迅速搭建和完善各产品线技术梯队，构筑云链产品技术体系，带领团队推出云存储、云聚合产品，助力白山抢先布局云后市场。本文即是童剑对于自己十八年技术之路的心得分享，包括了自己从出入职场、转型管理到创业新征程中的经验与感悟等。</li></ul>
<h2 id="articleHeader6">前端之巅</h2>
<p>「前端之巅」是 InfoQ 旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复 “ 加群 ”。投稿请发邮件到 editors@cn.infoq.com，注明 “ 前端之巅投稿 ”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 45 期: Safari 支持 Service Worker, Parcel 完整教程, 2017 前端大事件

## 原文链接
[https://segmentfault.com/a/1190000012578470](https://segmentfault.com/a/1190000012578470)

