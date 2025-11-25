---
title: '前端每周清单第 55 期: MobX 4 特性概览，iOS Hacks 分享, 分布式事务详解' 
date: 2018-12-10 2:30:07
hidden: true
slug: 54hqb3f2hcb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013854167" src="https://static.alili.tech/img/remote/1460000013854167" alt="周报封面55.jpg" title="周报封面55.jpg" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">前端每周清单第 55 期: MobX 4 特性概览，iOS Hacks 分享, 分布式事务详解</h1>
<p><code>作者：王下邀月熊</code> <code>编辑：徐川</code></p>
<p><a href="http://www.infoq.com/cn/FE-Weekly" rel="nofollow noreferrer" target="_blank">前端每周清单</a>专注大前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID: frontshow），及时获取前端每周清单。</p>
<h2 id="articleHeader1">新闻热点</h2>
<p><code>国内国外，前端最新动态</code></p>
<ul>
<li>
<a href="https://www.mozilla.org/en-US/firefox/59.0/releasenotes/" rel="nofollow noreferrer" target="_blank">Firefox 59.0 发布</a>: 近日，Firefox 发布了从桌面端到移动端的各平台更新版本；特别是对于桌面端的 Firefox，我们优化了页面加载时间，增加了能够编辑与裁剪 Firefox 截图的工具，并且提升了 Firefox 首页的站点排布体验。值得一提的是，对应的 MAC 版本中引入了 Off-Main-Thread Painting (OMTP) 技术，从而提高图形化渲染的效率；而在 Android 版本中则增加了对于 HLS 协议的支持。</li>
<li>
<a href="https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579" rel="nofollow noreferrer" target="_blank">Let's Encrypt 宣布支持 ACME v2 与通配符证书</a>: 近日 Let's Encrypt 正式宣布支持 ACME v2 与通配符证书。ACME v2 是 ACME 协议的更新版本，接收了来自 IETF 标准以及行业组织的建议；而通配符协议则允许用户使用单一证书对于所有的子域名开启 HTTPS 功能，其大大简化了证书管理的复杂度，推进了 Web HTTPS 化的进程。同时，Let's Encrypt 获得了 IdenTrust 交叉签名，这意味着只需要在服务器的证书链中配置好交叉签名，各浏览器客户端会自动处理其他任务。</li>
<li>
<a href="https://insights.stackoverflow.com/survey/2018" rel="nofollow noreferrer" target="_blank">2018 Stack Overflow 开发者调查报告</a>: 今年，超过十万名开发者参与到了调查之中，为我们提供了充足的数据源。今年的报告中，值得注意的点包括：DevOps 与机器学习已然成为了现今软件行业最重要的趋势，开发者们大都乐观于人工智能带来的变革与可能性，而不同意其潜在的威胁。去年 Python 的流行程度已经超过了 C#，成为了增长最快的语言，就像前些年它超越 PHP 那样；另外值得一提的是，Rust 成为了去年最受欢迎的语言，Kotlin 紧随其后。</li>
</ul>
<h2 id="articleHeader2">开发教程</h2>
<p><code>步步为营，掌握基础技能</code></p>
<ul>
<li>
<a href="https://parg.co/UzS" rel="nofollow noreferrer" target="_blank">MobX 4: 更好，更小，更快</a>:近日 MobX 发布了 4.0 大版本更新，本文则是对于该版本的那些引人入胜的特性进行介绍。这些特性包括了：不使用装饰器语法的装饰器，Observable 对象的动态扩展，内置的用于简化异步流程的 await when 以及 flow 函数，用于自动化进行数据抓取的 onBecome(Un)Observed，生产环境构建优化等。更多相关内容参考 <a href="https://github.com/wxyyxc1992/Web-Series/tree/master/%E6%9E%B6%E6%9E%84%E4%BC%98%E5%8C%96" rel="nofollow noreferrer" target="_blank">现代 Web 开发--架构优化篇</a>。</li>
<li>
<a href="https://developers.google.com/web/updates/2018/03/clipboardapi" rel="nofollow noreferrer" target="_blank">异步剪贴板操作</a>: 过去的数年中，各浏览器基本上都在使用 document.execCommand 来进行剪贴板交互。这种方式虽然提供了简单而且广泛接受的复制与粘贴操作，但是也带来了一定的缺陷：只能同步访问剪贴板，并且只能直接读写 DOM 元素。而 Chrome 66 提供了新的 Clipboard API，则为我们提供了另一种异步式的剪贴板操作方式，本文即是对该机制与接口规范的详细介绍。更多相关内容参考 <a href="https://github.com/wxyyxc1992/Web-Series/tree/master/%E5%9F%BA%E7%A1%80" rel="nofollow noreferrer" target="_blank">现代 Web 开发--基础篇</a>
</li>
<li>
<a href="https://android.jlelse.eu/comparing-apk-sizes-a0eb37bb36f" rel="nofollow noreferrer" target="_blank">不同方案的 APK 尺寸对比</a>: 现在已经有了很多种不同的开发应用的方式，从传统的原生开发到花式跨平台解决方案；或许很多人会好奇不同开发方案对于最终包体的大小影响几何，本文即是尝试用不同的方式实现相同功能的应用，并且比较他们的大小。文中给出的对比数据如下：Java 约 539KB，Kotlin 约 550KB，React Native 约 7MB，Flutter 约 7.5MB；更多相关内容参考 <a href="https://github.com/wxyyxc1992/FrontendTechnology-Series" rel="nofollow noreferrer" target="_blank">大前端的工程实践--Android 篇</a>。</li>
</ul>
<h2 id="articleHeader3">工程实践</h2>
<p><code>立足实践，提示实际水平</code></p>
<ul>
<li>
<a href="https://hackernoon.com/how-graphql-replaces-redux-3fff8289221d" rel="nofollow noreferrer" target="_blank">使用 GraphQL 替代 Redux</a>: GraphQL 是著名的服务端查询语言，Redux 则是客户端状态管理框架，二者貌似风马牛不相及，本文却讨论如何使用 GraphQL 替代 Redux 在项目中的角色。实际上，大部分状态管理相关代码都是用来合并与操作多个 REST 端口的代码，或者通过 sagas, middleware, thunks 等方式来顺序获取数据，这些也正是 GraphQL 闪耀的地方，本文即是讨论了这种可能性；更多相关内容参考<a href="https://github.com/wxyyxc1992/ServerSideApplication-Series/tree/master/Node" rel="nofollow noreferrer" target="_blank">微服务架构与实践--Node.js 篇</a>。</li>
<li>
<a href="https://parg.co/U2c" rel="nofollow noreferrer" target="_blank">整合自 Twitter 的 iOS Hacks</a>: 本系列文章着眼于定期整理分享来自 Twitter 的 iOS 开发调试技巧、Xcode 性能优化技巧以及 Swift 最佳实践等内容；本周提供了譬如如何提升 Xcode 编译性能，如何提高代码的可读性与可维护性等内容。更多相关内容参考<a href="https://github.com/wxyyxc1992/FrontendTechnology-Series/tree/master/iOS" rel="nofollow noreferrer" target="_blank">大前端的实践--iOS 篇</a>。</li>
<li>
<a href="https://parg.co/UTU" rel="nofollow noreferrer" target="_blank">加载第三方 JavaScript 代码</a>: Addy Osmani 近日编写了一篇关于 JavaScript 中加载第三方库的文章，讨论了如何正确的使用第三方库。第三方库为我们提供了可被集成的灵活功能，促进了 Web 的动态性、交互性以及连接性。本文，则是讨论在加载第三方库过程中可能遇到的问题：如何保证关键路径加载的性能，隐私性，安全性，避免不可预测或者不可控的结果。更多相关内容参考 <a href="https://parg.co/UTT" rel="nofollow noreferrer" target="_blank">Web Performance Optimization MindMap</a>。</li>
</ul>
<h2 id="articleHeader4">深度阅读</h2>
<p><code>深度思考，升华开发智慧</code></p>
<ul>
<li>
<a href="https://parg.co/U2E" rel="nofollow noreferrer" target="_blank">Clean 架构代码导读</a>: 作者近来开源了名为 MovieNight 的示例项目，本文则是其过去几周应用架构方面的相关思考的分享。本文首先介绍了 Clean Architecture 的基本元素，分析了各个组件间的层级关系，然后以具体的代码进行实践介绍。更多相关内容参考<a href="https://github.com/wxyyxc1992/SoftwareEngineering-Series" rel="nofollow noreferrer" target="_blank">软件工程基础-软件架构篇</a>
</li>
<li>
<a href="https://parg.co/Uz5" rel="nofollow noreferrer" target="_blank">How JavaScript works 系列：渲染引擎与优化技巧</a>: 当我们在构建大型的 Web 应用时，需要提醒自己我们并不仅仅写好代码就万事大吉了，还需要考虑到代码与运行环境之间的交互。理解 JavaScript 的运行环境，了解它的工作原理与组件构成，能够让我们编写出更好的，更稳健的应用。本文即是对于浏览器的内部原理进行分析介绍，并且分享了一些性能优化的技巧；更多相关内容查看<a href="https://github.com/wxyyxc1992/Web-Series/tree/master/%E5%AF%BC%E8%AE%BA" rel="nofollow noreferrer" target="_blank">现代 Web 开发导论</a>。</li>
<li>
<a href="https://parg.co/U2q" rel="nofollow noreferrer" target="_blank">分布式事务概述</a>: 本文是对于分布式系统以及分布式事务的概述，包含了以下内容：分布式数据模型，乐观模型与悲观模型；原子性，多版本并发控制与基于网络的锁同步；一致性，两阶段提交协议，Paxos，Raft；隔离性，镜像隔离，序列隔离；持久性等。更多相关内容参考 <a href="https://parg.co/Uxo" rel="nofollow noreferrer" target="_blank">Distributed System CheatSheet</a>。</li>
</ul>
<h2 id="articleHeader5">开源项目</h2>
<p><code>乐于分享，共推前端发展</code></p>
<ul>
<li>
<a href="http://roughjs.com/" rel="nofollow noreferrer" target="_blank">Rough.js</a>: Rough.js 是轻量级的（约 8KB），基于 Canvas 的手绘样式的绘图库。Rough.js 为我们提供了多种不同的图形单元，来绘制直线，曲线，弧线，多边形，圆形以及椭圆形等，同时其还支持根据路径绘制 SVG。</li>
<li>
<a href="https://github.com/nhnent/tui.chart" rel="nofollow noreferrer" target="_blank">TOAST UI Chart</a>: TOAST UI Chart 是新近开源的，能够运行在包括 IE8 在内的各种浏览器中。TOAST UI Chart 提供了直方图、折线图、散点图、饼图、热力图等多种类型格式的图表，可以直接查看原文了解安装与使用的细节。</li>
<li>
<a href="https://github.com/sindresorhus/fkill-cli" rel="nofollow noreferrer" target="_blank">fkill-cli</a>: fkill-cli 是非常好用的跨平台进程关闭工具，它能够运行在 macOS，Linux 以及 Windows 操作系统上。我们可以直接通过冒号来指定需要关闭的占用该端口的进程，也可以无参数方式进入到交互选择界面，通过进程名进行快速筛选。</li>
</ul>
<h2 id="articleHeader6">巅峰人生</h2>
<ul><li>
<a href="https://parg.co/UTz" rel="nofollow noreferrer" target="_blank">霍金：手握日月摘星辰，世间无我这般人</a>: 3 月 14 日消息，物理学家霍金去世，享年 76 岁。这位英国科学家因黑洞和相对性的开创性著作而闻名，并撰写过几本科普著作，包括《时间简史》。55 年来，病魔逐渐占据了他的躯体，但他的思想却蔓延到了整个宇宙。仰望星辰的人，现在成了星辰。</li></ul>
<h2 id="articleHeader7">前端之巅</h2>
<p>「前端之巅」是 InfoQ 旗下关注前端技术的垂直社群，加入前端之巅学习群请关注「前端之巅」公众号后回复 “ 加群 ”。投稿请发邮件到 editors@cn.infoq.com，注明 “ 前端之巅投稿 ”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008850035" src="https://static.alili.tech/img/remote/1460000008850035" alt="前端之巅微信底图－5.jpg" title="前端之巅微信底图－5.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端每周清单第 55 期: MobX 4 特性概览，iOS Hacks 分享, 分布式事务详解

## 原文链接
[https://segmentfault.com/a/1190000013854162](https://segmentfault.com/a/1190000013854162)

