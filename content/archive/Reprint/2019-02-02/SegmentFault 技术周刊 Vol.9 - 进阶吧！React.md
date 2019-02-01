---
title: 'SegmentFault 技术周刊 Vol.9 - 进阶吧！React' 
date: 2019-02-02 2:30:10
hidden: true
slug: w8evjllqor
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVEoKA?w=900&amp;h=385" src="https://static.alili.tech/img/bVEoKA?w=900&amp;h=385" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上期周刊时，我们提到接下来的几期都将以 React 为主题，层层引入，通过一个月的时间，完成对 React 的学习、升级、打怪直到自己成为 boss 的所有过程。</p>
<p>这一期，结束了入门（ <a href="https://segmentfault.com/a/1190000007135115"> Vol.8 - React，“5 分钟快速入门”</a>）之后，我们从“一个简单的组件”开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>
  }
})
React.render(<HelloMessage name=&quot;John&quot; />, mountNode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="react.js"><span class="hljs-keyword">var</span> HelloMessage = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
})
React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"John"</span> /&gt;</span>, mountNode)</span></code></pre>
<p><strong>将进阶 React 之旅，分为组件、进阶思考、性能优化、Redux 及更具有实践性的应用五个部分。</strong></p>
<h2 id="articleHeader0">深入了解组件</h2>
<blockquote><p><strong>leozdgao - <a href="https://segmentfault.com/a/1190000003645189" target="_blank">了解一个 React 组件</a></strong></p></blockquote>
<p>先通过一个名为 A Simple Component 的例子让你初步接触下 React 组件，从了解组件、创建组件到弄明白组件的生命周期，希望这能快速开启你对组件的感知。</p>
<blockquote><p><strong>dmyang - <a href="https://segmentfault.com/a/1190000006807631">译丨React 组件的生命周期</a></strong></p></blockquote>
<p>基本上所有的 React 组件的生命周期方法都可以被分割成四个阶段：初始化、挂载阶段（mounting）、更新阶段、卸载阶段（unmounting）。这一次，让我们来近距离研究下各个阶段，并找出开发过程中容易被忽视的细节。</p>
<blockquote><p><strong>nanges - <a href="https://segmentfault.com/a/1190000006831820" target="_blank">React 组件数据流 &amp;&amp; 组件间沟通</a></strong></p></blockquote>
<p>使用 React，只有先知道如何传递数据，组件如何沟通，才能展示我们想要的数据。本文列举了组件交流过程中使用到的几种方式，希望能帮到你。</p>
<blockquote><p><strong>kpaxqin - <a href="https://segmentfault.com/a/1190000004598113">React 进阶 —— 使用高阶组件（Higher-order Components）优化你的代码</a></strong></p></blockquote>
<p>通过函数向现有组件类添加逻辑，就是高阶组件。借助函数的逻辑表现力，高阶组件的用途几乎是无穷无尽的。下次当你想写 <code>mixin</code> 或 <code>class extends</code> 的时候，不妨也考虑下高阶组件。</p>
<p><strong>拓展阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006133727" target="_blank">译丨React 组件中绑定回调</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003032506">如何科学的组织 React 组件样式</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003821401" target="_blank">React 中的 Portal 组件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003782410">从 auto-ellipsis 看 React 组件开发</a></p></li>
</ul>
<h2 id="articleHeader1">进阶吧</h2>
<blockquote><p><strong>戴嘉华 - <a href="https://segmentfault.com/a/1190000004029168" target="_blank">深度剖析：如何实现一个 Virtual DOM 算法</a></strong></p></blockquote>
<p>用 300~400 行代码实现一个基本的 Virtual DOM 算法，这就是本文想要让你学会的。此外，希望在阅读本文之后，你不仅对 Virtual DOM 的算法思路有一个清楚了解，还能够对现有的前端编程产生新的思考。</p>
<blockquote><p><strong>淡苍 - <a href="https://segmentfault.com/a/1190000006617381">基于 Decorator 的组件扩展实践</a></strong></p></blockquote>
<p>组件配置式的方法在业务变化的过程中容易出现配置泛滥问题，从而使组件可维护性降低。近期项目，作者尝试用<strong>组件组合式开发</strong>思想，有效地解决了配置式存在的问题，一起来看看其思想的详细阐释和具体实践过程吧。</p>
<blockquote><p><strong>Cam - <a href="https://segmentfault.com/a/1190000003910357" target="_blank">Immutable 详解及 React 中实践</a></strong></p></blockquote>
<p>有人说 Immutable 可以给 React 应用带来数十倍的提升，也有人说 Immutable 的引入是近期 JavaScript 中伟大的事，但因为同期 React 太火，它的光芒被掩盖了。无论哪种评价，这至少说明 Immutable 是很有价值的。让我们来一探究竟。</p>
<blockquote><p><strong>xile611 - <a href="https://segmentfault.com/a/1190000005064474">React 实现 Table 的思考</a></strong></p></blockquote>
<p>Table 是最常用展示数据的方式之一，可是一个产品往往有很多非常类似的 Table，但是我们碰到的情况往往是 Table A 要排序，Table B 不需要……等这种看起来非常类似，但是又不完全相同的表格。本文将会详细的讲述这种 Table 组件解决方案产出的过程和一些思考。</p>
<p><strong>拓展阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000004300065" target="_blank">CSS Modules 详解及 React 中实践</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006729489">React 数据为什么要使用 immutable 方式？浅复制与深复制思考</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004671209" target="_blank">React 同构实践与思考</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007141049">react-router 按需加载</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004530909" target="_blank">译丨react-css-modules</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005761442">React实践 - Component Generator</a></p></li>
</ul>
<h2 id="articleHeader2">性能优化</h2>
<p>当你开始接触到一些比较复杂的应用，比如构建一个图片分析器或者富文本编辑器，性能的瓶颈就是一个绕不过的坎。</p>
<blockquote><p><strong>grace_xhw  - <a href="https://segmentfault.com/a/1190000006846314" target="_blank">译丨React 性能工程（上）</a>、<a href="https://segmentfault.com/a/1190000006911917">（下） - 深入研究 React 性能调试</a></strong></p></blockquote>
<p>这个系列译文，将会讲述使用 React 性能工具的一些基础知识、一些会导致 React 渲染瓶颈的常见问题，以及一些需要谨记的调试方法。然后通过实现一个简单版的 todo list，深入研究调试的工作流，来一步步完成性能调优。</p>
<blockquote><p><strong>hepeguo - <a href="https://segmentfault.com/a/1190000006254212" target="_blank">React 高级性能优化</a></strong></p></blockquote>
<p>官方文档中译版：通过减少 UI 更新需要的花费较大的 DOM 操作，来更进一步地优化响应和速度</p>
<ul>
<li><p>使用 production 版本</p></li>
<li><p>避免更新 DOM</p></li>
<li><p>shouldComponentUpdate 实战</p></li>
<li><p>Immutable-js 和 Flux</p></li>
</ul>
<blockquote><p><strong>lcxfs1991 - <a href="https://segmentfault.com/a/1190000005599249">React 移动 web 极致优化</a> 、 <a href="https://segmentfault.com/a/1190000005809109" target="_blank">腾讯新闻 React 同构直出优化实践</a></strong></p></blockquote>
<p>手机 QQ 团队使用 React 重构家校群和腾讯新闻，通过项目实战展示全面的性能优化策略、实践方案和开发工具。非常值得拜读。</p>
<h2 id="articleHeader3">Redux / Flux</h2>
<h3 id="articleHeader4">Redux</h3>
<p>Redux 是一个 JavaScript 应用状态管理的库，有一点和别的前端库或框架不同，它不单单是一套类库，它更是一套方法论，告诉你如何去构建一个状态可预测的应用。这部分，来进一步了解 Rudux。</p>
<blockquote><p><strong>ustccjw - <a href="https://segmentfault.com/a/1190000003503338">Redux 介绍</a></strong></p></blockquote>
<p>单页面应用的痛点、Actions、Reducers 和 Store、Middleware、异步 Actions……本文主要是对 Redux 官方文档的梳理，当然，也有不少作者自身对 Redux 的理解。</p>
<blockquote><p><strong>andyyu0920 - <a href="https://segmentfault.com/a/1190000004257207" target="_blank">從&lt;琅琊榜&gt;學 Redux</a></strong></p></blockquote>
<p>一篇很有意思的文章，如圣旨般存在的 action、形似内阁的 action creator、有点像梁帝身边的太监总管高湛的 store……本文根据电视剧《琅琊榜》的角色呈现，从另一个角度来 Redux 的机制与运用。</p>
<blockquote><p><strong>程序猿小卡_casper - <a href="https://segmentfault.com/a/1190000004208610">Redux 系列 01：从一个简单例子了解 action、store、reducer </a> 丨 <a href="https://segmentfault.com/a/1190000004215810" target="_blank">02：一个炒鸡简单的 React+Redux 例子 </a></strong></p></blockquote>
<p>01 部分，一个极简单的俩字，让你对 redux 产生感性的认识。02 部分，就会通过一个例子，理性地帮助你掌握如何将 redux 跟 react 应用结合起来。</p>
<h3 id="articleHeader5">Flux</h3>
<p>Flux 是 Facebook 用来构建用户端的 Web 应用程序的体系架构，与其它形式化的框架相比，它更像是一个架构思想，用于管理和控制应用中数据的流向。本模块，一起来熟悉 Flux。</p>
<blockquote><p><strong>meikidd - <a href="https://segmentfault.com/a/1190000002777101">译丨Flux 入门</a></strong></p></blockquote>
<p>本文概括性的介绍了如何使用 Flux 架构开发 JavaScript 应用，希望能用尽可能少的篇幅让你尽可能多的熟悉 Flux 核心概念。</p>
<blockquote><p><strong>Jiavan - <a href="https://segmentfault.com/a/1190000006742449" target="_blank">浅谈 Flux 架构及 Redux 实践</a></strong></p></blockquote>
<p>看了 Flux 的定义，想必你和作者一样，不是一脸懵逼，而是 N 脸懵逼。不过不慌，此类懵逼属于 Taylor 展开懵逼，细看展开式就可以。MVC、Flux 数据流框架……本文都介绍的很详细。</p>
<blockquote><p><strong>kuitos - <a href="https://segmentfault.com/a/1190000003795248">我对 React Flux 架构的理解</a></strong></p></blockquote>
<p>Flux 是什么？它的核心部分是什么？改如何 Fulx？相比于 MVVM，Flux 又存在哪些优势劣势，一篇作者对于 Flux 架构的理解，可拍砖可 star~</p>
<h3 id="articleHeader6">深入学习</h3>
<blockquote><p><strong>阿城 - <a href="https://segmentfault.com/a/1190000007092130" target="_blank">解析 Redux 源码</a></strong></p></blockquote>
<p>作为 React 全家桶的一份子，Redux 可谓说也是名声响响，本文不说如何使用 Redux 的 API，而是通过阅读 Redux 的源码来学习它的使用以及思想。</p>
<blockquote><p><strong>shelbeniskb - <a href="https://segmentfault.com/a/1190000004485808">Redux middleware 详解</a></strong></p></blockquote>
<p>Redux 作者 Dan 对 middleware 的描述：“It provides a third-party extension point between dispatching anaction, and the moment it reaches the reducer.”</p>
<p>middleware 提供了一个分类处理 action 的机会，在 middleware 中你可以检阅每一个流过的 action，挑选出特定类型的 action 进行相应操作，给你一次改变 action 的机会。</p>
<blockquote><p><strong>jafeney - <a href="https://segmentfault.com/a/1190000006067018" target="_blank">基于 Redux 架构的单页应用开发总结</a></strong></p></blockquote>
<p>一个基于 React + Redux + React-Route 框架，利用 webpack 进行模块化构建，前端编写语言是 JavaScript ES6，利用 babel 进行转换的项目开发及总结，希望通过这样一个比较完善的项目，检测你学习 Redux 过程中的细节。</p>
<blockquote><p><strong>劳卜 - <a href="https://segmentfault.com/a/1190000005933397">Redux 状态管理方法与实例</a></strong></p></blockquote>
<p>如何利用 Redux 来管理你的 React 项目？在这里，作者会和你介绍一下官方文档中比较少出现，但是项目中却必备的知识点，一个基于 React + Redux + React-Router 的方法。</p>
<p><strong>拓展阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005925630" target="_blank">Redux 入门</a>、<a href="https://segmentfault.com/a/1190000006056167">Redux 进阶</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006701765" target="_blank">Redux 莞式教程之简明篇</a>、<a href="https://segmentfault.com/a/1190000006701801">进阶篇</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006723527" target="_blank">关于 Redux 的一些总结(一)：Action &amp; 中间件 &amp; 异步</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007130506">Redux、Flux、Vuex</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003982553" target="_blank">React 为什么需要 Flux-like 的库</a></p></li>
</ul>
<h2 id="articleHeader7">项目与实践</h2>
<blockquote><p><strong>李伟鹏 - <a href="https://segmentfault.com/a/1190000005356568">实例讲解基于 React+Redux 的前端开发流程</a></strong></p></blockquote>
<p>通过一个 “苹果篮子” 实例，讲解作者所定义的 React+Redux 开发流程：布局组，静态和动态，对专注于写样式布局，大多是基本的 HTML+CSS 工作；逻辑组，action 和 reducer，专注于开发应用逻辑，基本都是 JS 工作。分工得到非常明确的规划，各个部件的耦合性很低，任务安排灵活性比较大。</p>
<blockquote><p><strong>charleyw - <a href="https://segmentfault.com/a/1190000007107646" target="_blank">微信小程序集成 Redux</a></strong></p></blockquote>
<p>微信的文档并没有指出如何使用第三方库，作者通过引入 Redux 管理小程序的模块化内容，在微信小程序中使用 Redux 实现 todo list，同时集成了 redux-devtools。</p>
<p>项目地址：<a href="https://github.com/charleyw/wechat-weapp-redux-todos" rel="nofollow noreferrer" target="_blank">charleyw / wechat-weapp-redux-todos</a> | 演示地址：<a href="http://remotedev.io/local/" rel="nofollow noreferrer" target="_blank">http://remotedev.io/local</a></p>
<blockquote><p><strong>kenberkeley - <a href="https://segmentfault.com/a/1190000006737924">可能是东半球最好的 React + Redux 启动器，基于 Vue Cli 二次开发</a></strong></p></blockquote>
<p>这是一个基于 Vue Cli 开发的 React 简易留言板 + 待办事项，项目架构优雅，且可以快速上手。项目地址：<a href="https://github.com/kenberkeley/react-demo" rel="nofollow noreferrer" target="_blank">kenberkeley / react-demo</a></p>
<blockquote><p><strong>xiaoyann - <a href="https://segmentfault.com/a/1190000005969488">使用 Webpack + React + Redux + ES6 开发组件化前端项目</a></strong></p></blockquote>
<p>文如其题，这是复杂性 React 项目实践必看的一篇。项目地址：<a href="https://github.com/xiaoyann/webpack-react-redux-es6-boilerplate" rel="nofollow noreferrer" target="_blank">xiaoyann / webpack-react-redux-es6-boilerplate</a></p>
<p><em>（本期完）</em><br><br></p>
<hr>
<p>往期周刊传送门：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006579616">Vol.1 - Vue.js 起手式</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006690217" target="_blank">Vol.2 - 666，ES6</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006751300">Vol.3 - 前后端分离与前端工程化</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006827148" target="_blank">Vol.4 - 这份 Android 有点甜</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006893394">Vol.5 - Build, Ship, Run, and Monitor with Docker</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006950447" target="_blank">Vol.6 - 面试那些事儿</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007021303">Vol.7 - iOS丨好好学习，从娃抓起~</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007135115" target="_blank">Vol.8 - React，“5 分钟快速入门”</a></p></li>
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
SegmentFault 技术周刊 Vol.9 - 进阶吧！React

## 原文链接
[https://segmentfault.com/a/1190000007205944](https://segmentfault.com/a/1190000007205944)

