---
title: '前端每周清单第 21 期：JS 项目开发样式指南；基于 Vue 的分角色权限验证；深入 React.js 内部原理' 
date: 2019-01-09 2:30:11
hidden: true
slug: vvuuo35lgyf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/27815800" rel="nofollow noreferrer" target="_blank">前端每周清单第 21 期：JS 项目开发样式指南；基于 Vue 的分角色权限验证；深入 React.js 内部原理</a> 为InfoQ中文站特供稿件，首发地址为<a href="https://parg.co/bI2" rel="nofollow noreferrer" target="_blank">前端之巅公众号</a>；如需转载，请与InfoQ中文站联系。从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>的<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单系列</a>系列；部分文章需要自备梯子。</p></blockquote>
<h1 id="articleHeader0">前端每周清单第 21 期：JS 项目开发样式指南；基于 Vue 的分角色权限验证；深入 React.js 内部原理</h1>
<p><code>前端</code> <code>前端每周清单</code></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注前端领域内容，分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader1">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li><p><a href="https://parg.co/bIp" rel="nofollow noreferrer" target="_blank">Let's Encrypt 宣布将在 2018 年一月提供通配符证书服务</a>：自从 2015 年上线以来，Let's Encrypt 已经服务于数百万的在线站点，并且大幅度提升了整个 Web 的加密流量占比。近日 Let's Encrypt 宣布将会在来年一月份提供通配符证书服务；某个通配符证书能够应用于某个根站点下的任意数目的子站点，从而帮助网站管理者更加方便地使用单证书来为多个子站点添加 HTTPS 部署支持。( <a href="https://parg.co/bIp" rel="nofollow noreferrer" target="_blank">https://parg.co/bIp</a> )</p></li>
<li><p><a href="https://parg.co/bIZ" rel="nofollow noreferrer" target="_blank">百度 Web 生态构建：发布基于 Vue 的 PWA 解决方案 LAVAS；将全面支持 Web AR </a>：在 Baidu Create 2017 Web 生态分论坛上，百度搜索正式对外发布基于 Vue 的 PWA 解决方案 LAVAS，同时宣布将全面支持 Web AR，此外，百度还对 MIP 的架构与原理、HTTPS 等技术进行了深度解析。( <a href="https://parg.co/bIZ" rel="nofollow noreferrer" target="_blank">https://parg.co/bIZ</a> )</p></li>
<li><p><a href="https://parg.co/bI8" rel="nofollow noreferrer" target="_blank">Webpack import 即将支持异步导入 CSS</a>：一个月前 Tobias Koppers 撰文讨论了 Webpack 对于 CSS 处理的考虑，计划将 CSS 代码与 JS 同等考虑；即开发者可以利用代码分割插件构建的动态代码块来异步加载 CSS 代码。而本文则是详细讨论了该方案以及对于未来代码分割、首屏加载可能造成的影响，并且提出了目前状态下基于 React Universal Component 与 Webpack Flush Chunks 可以实现的异步 CSS 加载方案。( <a href="https://parg.co/bI8" rel="nofollow noreferrer" target="_blank">https://parg.co/bI8</a> )</p></li>
<li><p><a href="https://parg.co/bIk" rel="nofollow noreferrer" target="_blank">MobX 3.2.0 版本发布</a>：MobX 内置了一些全局状态来辅助追踪与调度 Observable 或者 Reaction，在近日发布的 3.2.0 版本中，MobX 能够自动监测应用内是否存在多个 MobX 实例，并且给出响应的告警；更多 MobX 相关资料参考 <a href="https://parg.co/bVC" rel="nofollow noreferrer" target="_blank"> https://parg.co/bVC  </a>。( <a href="https://parg.co/bIk" rel="nofollow noreferrer" target="_blank">https://parg.co/bIk</a> )</p></li>
</ul>
<h2 id="articleHeader2">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li><p><a href="https://parg.co/bev" rel="nofollow noreferrer" target="_blank">Styled-Components 实战</a>：Styled-Components 是由 Max Stoiber 与 Glen Maddern 创建的新的 CSS-in-JS 工具库，能够帮你组织 React 或者 React Native 项目中的样式声明。本文则着眼于介绍 Styled-Components 的设计理念与基本用法，首先介绍了 Styled-Components 的设计目标，然后介绍了如何使用 Styled-Components 来创建可复用的组件或者创建全局样式声明。( <a href="https://parg.co/bev" rel="nofollow noreferrer" target="_blank">https://parg.co/bev</a> )</p></li>
<li><p><a href="https://parg.co/bej" rel="nofollow noreferrer" target="_blank">React Redux 概念与工作流清单</a>：本文包含了一张关于 Redux 概念与工作流的清单图解以及较为详细地渐进式 Redux 基础概念介绍。本文首先概述了项目开发中使用 Redux 的意义以及 Redux 相关的技术栈，然后介绍了 Reudx 中 Store 的含义与如何与 Immutable 协同使用；接下来本文介绍了 React Redux 应用中组件的层次划分，如何定义使用 Action、ActionCreator、Reducer 等等；更多 Redux 相关资料参考<a href="https://parg.co/bVQ" rel="nofollow noreferrer" target="_blank"> https://parg.co/bVQ </a>。（ <a href="https://parg.co/bej" rel="nofollow noreferrer" target="_blank">https://parg.co/bej</a> ）</p></li>
<li><p><a href="https://parg.co/bIs" rel="nofollow noreferrer" target="_blank">基于 Vue.js 2 的分角色权限验证</a>：本文作者因为 Vue.js 平滑的学习曲线与易于理解的官方文档而倾向于使用 Vue.js 进行前端开发工作，本文即是作者介绍如何利用 Vue.js 2 来为项目添加基于角色的权限控制功能。作者在本文中首先介绍了基于角色的权限控制的概念与设计，然后讨论了如何使用 vue-cli 来构建基础项目架构并且按特征划定目录层次，最后介绍了关键部分的代码实现以及如何使用 Vuex 来管理应用状态；更多 Vue 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。( <a href="https://parg.co/bIs" rel="nofollow noreferrer" target="_blank">https://parg.co/bIs</a> )</p></li>
<li><p><a href="https://parg.co/bIV" rel="nofollow noreferrer" target="_blank">试用新的 Angular HTTP Client</a>：在 Angular 4.3.0-rc.0 版本在，HTTP Client API 得到了极大的改造与提升，本文即是介绍新版本的 Angular HTTP Client 的用法。在新版本的 HTTP Client 中，其默认假设以 JSON 格式进行返回值解析，并且引入了灵活的 Interceptor 以动态操作请求头或者响应体；同时新版本的 HTTP Client API 为上传与下载这些耗时操作提供了实时进度反馈回调，以方便开发者进行调试或者反馈给用户。( <a href="https://parg.co/bIV" rel="nofollow noreferrer" target="_blank">https://parg.co/bIV</a>  )</p></li>
<li><p><a href="https://parg.co/bIJ" rel="nofollow noreferrer" target="_blank">基于 Vue.js 与 Laravel 构建实时仪表盘</a>：本文是来自 Spatie 的工程师，介绍基于 Laravel 与 Vue.js 构建，实时的队伍与事件信息展示面板的实践总结。本文首先介绍了历史项目的不足以及目前项目的设计考量，然后讨论了前端网格布局的解决方案。接下来作者分别介绍了服务端基于 Laravel 与客户端基于 Vue.js 的关键代码的实现；更多 Vue 相关资料参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank"> https://parg.co/byL </a>。( <a href="https://parg.co/bIJ" rel="nofollow noreferrer" target="_blank">https://parg.co/bIJ</a>  )</p></li>
</ul>
<h2 id="articleHeader3">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li><p><a href="https://github.com/shieldfy/API-Security-Checklist" rel="nofollow noreferrer" target="_blank">接口安全自检清单</a>：本文涵盖了项目接口在设计、测试与发布阶段应该注意的安全事项。本清单首先阐述了应该使用标准的权限控制方式 JWT 或者 OAuth 来替代基础的 Basic Auth，然后分别讨论了 JWT 与 OAuth 的设计要点。接下来本清单还列举了对于接入过滤与防 DDoS 攻击、使用合适的 HTTP 方法并且对用户输入进行有效校验、避免关键资源外泄、设置合理的响应头等等内容。( <a href="https://github.com/shieldfy/API-Security-Checklist" rel="nofollow noreferrer" target="_blank">https://github.com/shieldfy/A...</a> )</p></li>
<li><p><a href="https://github.com/wearehive/project-guidelines" rel="nofollow noreferrer" target="_blank">JavaScript 项目开发样式指南</a>：开启新的项目就好像在绿地上肆意撒欢，此时的开发者拥有极大的自由；不过如果缺乏良好的基石，未来的项目维护可能会成为你的梦魇。本文即搜集了来自 <a href="http://wearehive.co.uk/" rel="nofollow noreferrer" target="_blank">Hive</a> 研发团队的 JavaScript 项目开发指南，涵盖了 Git、文档规范、环境变量控制、依赖管理、测试、文件结构与命名、代码样式、日志、API 设计等多个方面；更多 JavaScript 工程实践资料参考<a href="https://parg.co/bIO" rel="nofollow noreferrer" target="_blank"> https://parg.co/bIO  </a>。( <a href="https://github.com/wearehive/project-guidelines" rel="nofollow noreferrer" target="_blank">https://github.com/wearehive/...</a>  )</p></li>
<li><p><a href="https://parg.co/bIi" rel="nofollow noreferrer" target="_blank">大型应用开发中使用 Redux 的五个建议</a>：Redux 是非常优秀的应用状态管理工具，单向数据流结构允许开发者专注于业务逻辑的开发。本文作者从自身实践出发总结出了大型项目中 Redux 的使用建议，包括建立数据索引并且使用选择器来访问数据、将标准状态独立于可变的界面状态与用户编辑状态、在界面之间合理地共享数据、提取公共地 Reducer 函数以及如何较好地连接 React 组件与 Redux 状态树等等；更多 Redux 相关资料参考 <a href="https://parg.co/bVQ" rel="nofollow noreferrer" target="_blank"> https://parg.co/bVQ  </a>。( <a href="https://parg.co/bIi" rel="nofollow noreferrer" target="_blank">https://parg.co/bIi</a>  )</p></li>
<li><p><a href="https://parg.co/bIL" rel="nofollow noreferrer" target="_blank">前端 JavaScript 面试问题总结</a>：本文作者发现目前并没有太多令人满意的前端 JavaScript 面试问题列表，因此他基于自己的面试经历与实践总结出了本文。本文主要包含以下部分，首先是基础概念的认知，譬如对于闭包、EventLoop、REST 等概念的介绍；然后是对于编码能力的考量，譬如对于常见的数据结构与算法的实现、代码调试能力与错误定位的评测等等；最后是对于整体系统设计能力的考量，譬如如何设计全栈的 Twitter 实现架构等等。( <a href="https://parg.co/bIL" rel="nofollow noreferrer" target="_blank">https://parg.co/bIL</a> )</p></li>
</ul>
<h2 id="articleHeader4">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li><p><a href="https://parg.co/be2" rel="nofollow noreferrer" target="_blank">深入 React.js 内部原理</a>：本系列文章详细介绍了 React.js 内部工作原理，作者通过调试整个代码库，分析代码执行调用顺序将整个逻辑以流程图方式清晰地展示出来，并且详细介绍了内部实现中使用到的关键概念与方法。本系列文章会包含 Stack Reconciler 与 Fiber 两个部分，目前完成的 Stack Reconciler 部分分为十五个小节，包含了从渲染函数调用开始介绍 JSX 转化为 DOM 的流程、内部事务处理到组件挂载于与更新流程等等内容；更多 React 相关资料参考<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> https://parg.co/bM1 </a>。 ( <a href="https://parg.co/be2" rel="nofollow noreferrer" target="_blank">https://parg.co/be2</a> )</p></li>
<li><p><a href="https://parg.co/bIQ" rel="nofollow noreferrer" target="_blank">利用 WebGL 释放 GPU 的计算潜力</a>：随着大数据时代的到来，计算能力日渐成为性能的关键瓶颈之一；而众所周知 GPU 相较于 CPU 有着更为强大的计算能力，本系列文章即是介绍如何利用 WebGL 实现 GPGPU（General Purpose Computing on Graphics Processing Units）高性能计算。本系列文章首先讨论了利用 WebGL 进行 GPGPU 计算的可行性，然后介绍了具体的实施步骤；主要步骤包括矩阵初始化、矩阵计算、结果回传、条件控制、不稳定性处理、样例实践等几个部分。( <a href="https://parg.co/bIQ" rel="nofollow noreferrer" target="_blank">https://parg.co/bIQ</a>  )</p></li>
<li><p><a href="https://parg.co/bIN" rel="nofollow noreferrer" target="_blank">Vue 直出内存泄露问题的追查实践</a>：近期，作者遇到了 Vue 直出内存泄露问题，并进行了追查。其项目背景是，作者在一次规模较大的运营活动中正好碰到了内存泄漏的问题，技术背景和业务背景分别如下：技术背景：node直出项目，直出用到了 Vue 的直出方案；业务背景：一次 PV 最高达到 1400W 的运营活动 qps 的压力下，后期使得服务出现一定错误率。本文将回顾整个追查的实践过程。( <a href="https://parg.co/bIN" rel="nofollow noreferrer" target="_blank">https://parg.co/bIN</a> )</p></li>
<li><p><a href="https://parg.co/bIC" rel="nofollow noreferrer" target="_blank">JavaScript 开发中常用的十大数据结构详解</a>：数据结构是软件开发的重要组成部分之一，也是求职面试中常见的主题之一；本文将回顾介绍 JavaScript 中常用的十大数据结构，并且给出详细的教程与在线实践链接。本文涉及到的数据结构包括链表、栈、队列、集合、映射、哈希表、二叉搜索树、Trie 树、二叉堆、图等；更多数据结构与算法相关资料参考 <a href="https://parg.co/bIt" rel="nofollow noreferrer" target="_blank"> https://parg.co/bIt  </a>。( <a href="https://parg.co/bIC" rel="nofollow noreferrer" target="_blank">https://parg.co/bIC</a>  )</p></li>
</ul>
<h2 id="articleHeader5">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li><p><a href="https://github.com/vadimdemedes/ink" rel="nofollow noreferrer" target="_blank">Ink</a>：Ink 允许我们以类似于编写 React 组件的方式编写命令行交互界面，最大的区别在于 Ink 会将组件渲染为输出到标准控制台的字符串。笔者觉得阅读 Ink 的源代码也是不错地了解简化版的 React 内部运行机制的方式，可以了解基本的 JSX 转换、虚拟 DOM 渲染与比较、批次更新等内容。( <a href="https://github.com/vadimdemedes/ink" rel="nofollow noreferrer" target="_blank">https://github.com/vadimdemed...</a> )</p></li>
<li><p><a href="https://github.com/jeromedalbert/real-world-react" rel="nofollow noreferrer" target="_blank">real-world-react</a>：本仓库搜集了一系列基于 React 开发的真实环境下的开源应用代码库，能够帮助初学者从资深开发者的代码中逐步学习了解 React；应用涵盖了基于 Redux 的各种资讯类应用、常见的音乐播放器等等多个方面。( <a href="https://github.com/jeromedalbert/real-world-react" rel="nofollow noreferrer" target="_blank">https://github.com/jeromedalb...</a> )</p></li>
<li><p><a href="https://github.com/GianlucaGuarini/icaro" rel="nofollow noreferrer" target="_blank">icaro</a>：icaro 是轻量、高效地 JavaScript 对象观察者实现，能够自动监测 JavaScript 中对象的变化并且进行相应地譬如 DOM 更新等操作。icaro 使用了大量的 ES6 的特性，譬如 Proxies、WeakMaps、Maps 以及 Symbols，是非常不错的可以用来学习利用最新的语言特性实现 JavaScript 响应式框架的开源库。( <a href="https://github.com/GianlucaGuarini/icaro" rel="nofollow noreferrer" target="_blank">https://github.com/GianlucaGu...</a> )</p></li>
<li><p><a href="https://github.com/icons8/titanic" rel="nofollow noreferrer" target="_blank">titanic</a>：titanic 为我们提供了一系列有趣的可变的 SVG 图标，这些图标能随着用户的点击或者其他操作做出相应地动画反馈。titanic 提供的动画图标包括了单选框、邮箱、笑脸等等。( <a href="https://github.com/icons8/titanic" rel="nofollow noreferrer" target="_blank">https://github.com/icons8/tit...</a>  )</p></li>
<li><p><a href="https://github.com/jaredpalmer/formik" rel="nofollow noreferrer" target="_blank">formik</a>：React 中的表单处理一直是痛点所在，而目前很多的表单处理库添加了太多的抽象，不仅不易于理解而且会造成许多额外的性能损耗。而 Formik 则提供了简便易用的高阶组件来帮你处理将 Props 转化为扁平的 React 状态、自动化字段验证并且进行错误提示、将扁平地 React 状态转化为接口可用的对象这三个任务。( <a href="https://github.com/jaredpalmer/formik" rel="nofollow noreferrer" target="_blank">https://github.com/jaredpalme...</a> )</p></li>
</ul>
<h2 id="articleHeader6">巅峰人生</h2>
<h2 id="articleHeader7">前端之巅</h2>
<p>「前端之巅」是InfoQ旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复“加群”。投稿请发邮件到editors@cn.infoq.com，注明“前端之巅投稿”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 21 期：JS 项目开发样式指南；基于 Vue 的分角色权限验证；深入 React.js 内部原理

## 原文链接
[https://segmentfault.com/a/1190000010136751](https://segmentfault.com/a/1190000010136751)

