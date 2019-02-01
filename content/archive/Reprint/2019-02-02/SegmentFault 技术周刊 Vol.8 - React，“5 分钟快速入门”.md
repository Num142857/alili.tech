---
title: 'SegmentFault 技术周刊 Vol.8 - React，“5 分钟快速入门”' 
date: 2019-02-02 2:30:11
hidden: true
slug: xzp69diczjq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVD6kQ" src="https://static.alili.techhttps://segmentfault.com/img/bVD6kQ" alt="weekly_vol008.jpg" title="weekly_vol008.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>前段时间开始学习 React，浏览官方文档时，被其中提及的一篇文章——<a href="https://signalvnoise.com/posts/3124-give-it-five-minutes" rel="nofollow noreferrer" target="_blank">《Give It Five Minutes》</a>给吸引了。最开始以为是“5 分钟学会 React”这种神一般存在的教程，结果不然，它只是 37 Signal 日志 SVN（Signal v.s. Noise）中的一篇文章……可这篇文章却给了我学习 React 不可或缺的一个理由。至于原因，give me five minutes，听我细细道来。</p>
<p>《Give It Five Minutes》描述了作者 Jason Fried 在一次商业创新工厂演讲活动中，遇到了“Richard Saul Wurman”，因此发生了重大人生变化的故事。</p>
<p>事情是这样的，几年前，Jason 还是个急性子，只要是不符合作者世界观的事情，作者就会极力反驳。此外，作者也热衷于第一个发表观点和想法，似乎第一个提出来就意味着一些事儿。而这一切，都在 2007 年的一天发生了变化。</p>
<p>在一次商业创新工厂的会议演讲上，作者遇到了同去演讲的 Richard Saul Wurman。Richard 在作者的演讲结束后上台发表观点，在介绍完自己，并称赞了 Jason 的演讲之后，Richard 开始了自己的演讲。演讲途中，作者打断了 Richard 的发言，并对他提到的库存的一些想法提出了反对。正因为作者性急，又恰巧碰到了自己不同意的观点，所以演讲中，只要一遇到不同意 Richard 的观点，就立刻起身反驳。</p>
<p>而此刻的 Richard 却非常淡定，并用非常简单的一句话回应作者<strong>“Man, give it five minutes.”</strong>而正是这句话，改变了作者一生。</p>
<p>Richard 说有不同观点是好事儿，对不同观点进行回应也是好事儿，有坚定的想法和自己的信念更是一件好事。但是，在你确定要反驳我的观点的时候，请给我一些时间去阐明我的观点，听完我的阐述。5 分钟意味着思考，而不是马上回应（“Five minutes” represented “think”, not react）。</p>
<p>而这一刻，也引发了作者后续的深刻思考，并时刻提醒自己将先去思考而非快速回应作为长久的追求。</p>
<p>深夜读来，文章有点像鸡汤，可是，学 React 之前，一定要干了这碗鸡汤。React 挑战了很多传统的知识，很多想法，可能第一眼看上去有点不可思议，但 give it five minutes，要知道，这些看似疯狂的想法已经帮助 Facebook 和 Instagram 从里到外创建了上千的组件。</p>
<p><strong>接下来几期周刊，都将以 React 为主题，层层引入，通过一个月的时间，完成对 React 的学习、升级、打怪直到自己成为 boss 的所有过程。本期，我们以社区诸位小伙伴一路走来的经验分享为重点，让你尽量快速学习 React。</strong></p>
<h2 id="articleHeader0">5 分钟实例</h2>
<p>首先，来看两个简单的小应用，让你预览 React 可以干嘛。</p>
<blockquote><p><strong>noiron - <a href="https://segmentfault.com/a/1190000005800129">用 React.js 写一个最简单的 To-do List 应用</a></strong></p></blockquote>
<p>通过一个简单的 To-do List 应用，让你对 React 的最基础用途——组件（component）形成基本的认识，包括组件结构、组件两种属性的传递（state 和 props）以及函数的传递，浅入浅出，对于理解 React 中的一些概念及语法很有帮助的。</p>
<blockquote><p><strong>defshine - <a href="https://segmentfault.com/a/1190000002481853" target="_blank">使用 React 和 Flask 开发一个留言板</a></strong></p></blockquote>
<p>通过这个应用，你会对“React 可以干嘛”有更多的了解：</p>
<ol>
<li><p>组件化开发，React 提倡无状态的组件，便于重用</p></li>
<li><p>专注于 View，React 不是 MVC 框架，它只是一个专注于 View 的库，所以，它也可以和很多其他框架或者库一起使用</p></li>
<li><p>提供完成的生命周期</p></li>
</ol>
<p>注：上面这两个小应用的项目分别可以在 <a href="https://github.com/noiron/simplest-react-todolist" rel="nofollow noreferrer" target="_blank">noiron / simplest-react-todolist</a> 和 <a href="https://github.com/defshine/message-board" rel="nofollow noreferrer" target="_blank">defshine / message-board</a> 查看。</p>
<h2 id="articleHeader1">快速入门</h2>
<p>通过上面的例子，可以看出，React 其实比较好上手，即使没来得及了解细节性的知识，有时也不妨碍项目的开展。不过，正统地学习，能让你更全面地理解 React，更清晰地了解它的使用逻辑。除了 <a href="http://reactjs.cn/react/index.html" rel="nofollow noreferrer" target="_blank">官方文档</a> 和阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">《React 入门实例教程》</a> ，以下精选的几篇文章还将丰富你的学习资料库。</p>
<blockquote><p><strong>布利丹牵驴子 - <a href="https://segmentfault.com/a/1190000006495917">React 入门及资源指引</a></strong></p></blockquote>
<p>Facebook 在开源项目和软件架构方面的实力让人不得不赞叹，React 中提出的一些设计思想非常新颖，极大的简化了前端开发的代码逻辑。本文介绍 React 相关的基础知识，JSX、组件、区分 props 和 state、生命周期、事件系统……通过对这些关键内容的学习，快速开始 React 的学习之路。</p>
<blockquote><p><strong>whatif - <a href="https://segmentfault.com/a/1190000003698071" target="_blank">Sublime Text 3 搭建 React.js 开发环境</a></strong></p></blockquote>
<p>利用 Sublime 很强的自定义功能和庞大的插件库，来，手把手式的强大开发环境搭建方案，不谢。</p>
<blockquote><p><strong>赖小赖小赖 - <a href="https://segmentfault.com/a/1190000002693197">React 初探</a></strong></p></blockquote>
<p>来自 AlloyTeam 的分享，一篇文章学完所有基本特性，保入门。</p>
<blockquote><p><strong>zhangwang - <a href="https://segmentfault.com/a/1190000006685370" target="_blank">是时候理清 React 开发中的一些疑惑了</a></strong></p></blockquote>
<p>这篇则让你明白为什么要使用 React，以及更重要的，它所带来的改变。你从这些改变再回去看 React 为什么要设计成这样，可能会理解得更通透。</p>
<p>「这是一个老生常谈的问题了，比如说它的虚拟 DOM 可以被高效的渲染，比如说它有完整生命周期的“活组件”，它的组件化使得项目结构非常清晰，代码复用非常容易，比如说它的数据管理机制也能让你清晰的知晓数据的状态，而 React 本身就是被这种清晰的数据所驱动的。」</p>
<p><strong>更多入门阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000003501752">译丨React.js 的介绍 - 针对了解 jQuery 的工程师</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005136764" target="_blank">精益 React 学习指南（Lean React）序</a></p></li>
</ul>
<h2 id="articleHeader2">源码阅读</h2>
<p>入门完毕，若是无法深入其内部实现机制和原理，亦会觉得不够透彻，所谓知其然更要知其所以然，接下来就从剖析 React 源码开始吧。</p>
<blockquote><p><strong>React 源码剖析系列 - <a href="https://segmentfault.com/a/1190000003940416">生命周期的管理艺术</a>、<a href="https://segmentfault.com/a/1190000003969996" target="_blank">解密 setState</a>、<a href="https://segmentfault.com/a/1190000004003055">不可思议的 React diff</a>、<a href="https://segmentfault.com/a/1190000004150178" target="_blank">玩转 React Transition</a></strong></p></blockquote>
<p>本系列文章希望通过剖析 React 源码，帮助你理解其内部的实现原理。当然，阅读这一系列的文章，你需要对 React 有一定的了解，如果你还存在疑惑，请回上部分再次巩固。</p>
<blockquote><p><strong>JasonHuang - <a href="https://segmentfault.com/a/1190000004224778">React Motion 缓动函数剖析</a></strong></p></blockquote>
<p>“不知道这个世界上有没有‘仿世学’，但既然动画要模仿现实世界，那么实现动画的根本方法就是借鉴上帝的办法——模拟自然规律”。本文以 React Motion 实现原理为背景，介绍一种通用的模拟物理规律的方法，以及如何使用这种方法实现 React Motion 的缓动函数。来跟着作者当一回上帝吧。</p>
<blockquote><p><strong>louis110 - <a href="https://segmentfault.com/a/1190000004586237" target="_blank">GraphQL and Relay 浅析</a></strong></p></blockquote>
<p>GraphQL 是在 Facebook 内部应用多年的一套数据查询语言和 runtime。包括类型系统、验证、introspection，此外，还具有语法灵活、没有冗余、强类型等特征。而 Relay 则是连接 GraphQL 和 React 的一座桥梁，除了让 React 认识 GraphQL 服务器之外，还包括把关于数据获取的事情（请求异常，loading 等）都接管过来……</p>
<blockquote><p><strong>郭林烁_joey - <a href="https://segmentfault.com/a/1190000005160459">前端路由实现与 react-router 源码分析</a></strong></p></blockquote>
<p>“从点击 Link 到 render 对应 component，路由中发生了什么？”在单页应用上，前端路由并不陌生。很多前端框架也会有独立开发或推荐配套使用的路由系统。那么，当我们在谈前端路由的时候，还可以谈些什么？本文通过简要分析并实现一个的前端路由，来对 react-router 进行分析。</p>
<h2 id="articleHeader3">基本特性</h2>
<p>JSX、Mixin、Context、Virtual DOM、react-css-modules、包react-hot-loader、react-router、Redux、Flux、relay……太多特性了，这期我们挑选其中一些基本的，分别做入门介绍。</p>
<blockquote><p><strong>MockingBird - <a href="https://segmentfault.com/a/1190000003016446" target="_blank">译丨React Mixin 的使用</a></strong></p></blockquote>
<p>在 React component 构建过程中，常常有这样的场景，有一类功能要被不同的 Component 公用，然后看得到文档经常提到 Mixin（混入）这个术语。此文就从 Mixin 的来源、含义、在 React 中的使用说起。</p>
<blockquote><p><strong>BetaRabbit - <a href="https://segmentfault.com/a/1190000004436824">React 如何和 Server 交互</a></strong></p></blockquote>
<p>这篇讲解 React ajax 的 4 种交互方式：Root Component、Container Component、Redux/Flux Async Actions 以及 Relay，清晰明了。</p>
<blockquote><p><strong>小俞 - <a href="https://segmentfault.com/a/1190000002793786" target="_blank">React Reflux</a></strong></p></blockquote>
<p>Reflux 是根据 React 的 Flux 创建的单向数据流类库，其单向数据流模式主要由 actions 和 stores 组成。本文会非常细致地说明如何创建 action 和 store，以及和组件的结合。</p>
<blockquote><p><strong>cnsnake11 - <a href="https://segmentfault.com/a/1190000004161358">React Native 的组件架构设计</a></strong></p></blockquote>
<p>篇幅较长但不冗余的一篇文章，前半部分是目前 Flux 开源框架的一些分析，后半部分是架构设计过程。此外，还有多种方案以及完整 demo 代码提供诸位学习。</p>
<blockquote><p><strong>Hongchun - <a href="https://segmentfault.com/a/1190000004075348" target="_blank">深入理解 react-router 路由系统</a></strong></p></blockquote>
<p>在 web 应用开发中，路由系统是不可或缺的一部分。当前，Backbone、Ember 等主流框架都有其自己的路由器，那 react-router 相对于其他路由系统会针对 React 做了哪些优化呢？它是如何利用了 React 的 UI 状态机特性呢？又是如何将 JSX 这种声明式的特性用在路由中？本文将很好地为你揭开这些疑惑。</p>
<blockquote><p><strong>Coding扣钉 - <a href="https://segmentfault.com/a/1190000004094442">玩转 React 服务器端渲染</a></strong></p></blockquote>
<p>React 之所以让服务器端渲染变成了一件有吸引力的事情，是因为它移除了服务器端对于浏览器环境的依赖，服务器端渲染除了要解决对浏览器环境的依赖，还要解决前后端可以共享代码和前后端路由可以统一处理这两个问题。本文选择了 Redux 和 react-router 来做说明。</p>
<p><strong>更多阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000004034031" target="_blank">React Mixin 的前世今生</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004485808">redux middleware 详解</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004238404" target="_blank">探索 React 源码的全局模块系统</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004660311">使用 react-hot-loader</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004636213" target="_blank">React 中的“虫洞”——Context</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006032223">深入理解 React 中的上下文 this</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006032997" target="_blank">译丨逐渐去掌握 React（作为一名 Angular 开发者）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006846179">译丨React.js 模式</a></p></li>
</ul>
<h2 id="articleHeader4">简单的应用</h2>
<p>React 第一阶段的学习完成，一起来看几个用 React 开发的项目。上面介绍的两个只是简单实例，而下面这三个，你可以认真研究一下，以为下期的内容做好准备。</p>
<blockquote><p><strong><a href="https://segmentfault.com/a/1190000005805135" target="_blank">UXCore：一个兼容主流浏览器的 React PC 组件库</a></strong></p></blockquote>
<p>UXCore 是一个基于 React 的 PC UI 套件库，兼容 IE8+。</p>
<p>阿里巴巴信息平台是负责整个阿里巴巴集团智能办公系统的团队，涉及非常多的企业业务系统，包括薪酬、人力、财务、行政、IT 等等，在这些系统中产生了大量的表格、表单和图表的交互场景，这里面有很多重复配置的地方，也有很多定制变化的地方，目前业界的这一方面还没有能够完全满足这一方面的解决方案，因此有了 UXCore。 </p>
<p>项目地址：<a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxcore</a></p>
<blockquote><p><strong><a href="https://segmentfault.com/a/1190000006883180">一言不合造轮子 - 撸一个 ReactTimePicker</a></strong></p></blockquote>
<p>这是一个独立 React 组件，已打包成 NPM 包，涉及到 React 开发、单页测试、Webpack 等内容。</p>
<p>项目地址：<a href="https://github.com/ecmadao/react-times" rel="nofollow noreferrer" target="_blank">ecmadao / react-times</a> | 演示地址：<a href="https://ecmadao.github.io/react-times" rel="nofollow noreferrer" target="_blank">https://ecmadao.github.io/react-times</a></p>
<blockquote><p><strong><a href="https://segmentfault.com/a/1190000004978013">组件化可视化图表 - Recharts</a></strong></p></blockquote>
<p>Recharts 是一款可视化组件库，为基础表格的绘制提供了另外一种可能。Recharts 含义是重新定义（Redefined）图表，这个名字的背后在于这个图表在设计上带给开发者的是不一样的体验，不仅是用 React 设计，也在于重新定义了组合与配置方式，代码更优雅，灵活可装卸。</p>
<p>目前版本是 0.15.1，支持 React 0.14.x 或 15.0.x 版本，现在有至少四个国外团队在产品中使用。</p>
<p>项目地址：<a href="https://github.com/recharts/recharts" rel="nofollow noreferrer" target="_blank">recharts / recharts</a> | 官网：<a href="http://recharts.org" rel="nofollow noreferrer" target="_blank">http://recharts.org</a></p>
<h2 id="articleHeader5">专栏推荐</h2>
<p>本期周刊特别增加专栏推荐，要深入学习 React，他们的专栏是“绕不过的三座大山”：</p>
<ul>
<li><p><strong><a href="https://segmentfault.com/blog/jiyinyiyong?tag=react.js">题叶, JiyinYiyong</a></strong> - 题叶是社区内最早开始传播 React 的开发者，非常多的后来学习者都受到了他的影响，他在 React 和其他前端方方面面的思考，都值得去探讨</p></li>
<li><p><strong><a href="https://segmentfault.com/blog/purerender" target="_blank">pure render</a></strong> - 由一群志同道合的开发者共同维护，分享关于 React 和 Flux 在实践中的经验与想法，篇篇精品</p></li>
<li><p><strong><a href="https://segmentfault.com/blog/hepeguo?tag=react.js">hepeguo 的专栏</a></strong> - 对于 React 和 Redux 性能优化的深入研究</p></li>
</ul>
<p><br><br><em>（本期完，接下来两期，我们将更深入 React，对 Redux/Flux、组件、Virtual DOM、React Native 以及与 webpack 等相关的所有体系，全面地整理给大家。）</em><br><br></p>
<hr>
<p>往期周刊传送门：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006579616" target="_blank">Vol.1 - Vue.js 起手式</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006690217">Vol.2 - 666，ES6</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006751300" target="_blank">Vol.3 - 前后端分离与前端工程化</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006827148">Vol.4 - 这份 Android 有点甜</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006893394" target="_blank">Vol.5 - Build, Ship, Run, and Monitor with Docker</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006950447">Vol.6 - 面试那些事儿</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007021303" target="_blank">Vol.7 - iOS丨好好学习，从娃抓起~</a></p></li>
</ul>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly" target="_blank">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.8 - React，“5 分钟快速入门”

## 原文链接
[https://segmentfault.com/a/1190000007135115](https://segmentfault.com/a/1190000007135115)

