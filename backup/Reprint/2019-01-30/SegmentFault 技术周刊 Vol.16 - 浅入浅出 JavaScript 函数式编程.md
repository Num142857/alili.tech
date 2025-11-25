---
title: 'SegmentFault 技术周刊 Vol.16 - 浅入浅出 JavaScript 函数式编程' 
date: 2019-01-30 2:30:22
hidden: true
slug: 9efvzxyz00h
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVGQuc" src="https://static.alili.techhttps://segmentfault.com/img/bVGQuc" alt="weekly-vol016" title="weekly-vol016" style="cursor: pointer; display: inline;"></span></p>
<p>函数式编程（Functional Programming），一看这个词，简直就是学院派的典范。</p>
<p>以至于从 Lisp 的创世，到 Scheme、Haskell、Clean、Erlang、Miranda、Scala、LOGO、Clojure、Mathematica 甚至 R，它们一出生就站在了鄙视链的顶端，尤其是非纯函数式的 Lisp 老祖和纯函数式的集大成者 Haskell。就如段子里说的，一群程序员自我介绍，当听到“我是写 Lisp 的…”这一句，所有人的注意力都会被吸引。简直是众多程序员想要装逼的顶峰，可见一斑。</p>
<p>学院派的语言方法似乎只有大学研究里才会使用，但随着技术和时代的发展，JavaScript，这种典型的多范式编程语言，也由面向对象为绝对主导逐渐纳入各种函数式编程的特性，这两年的 React、TypeScript、Immutable、underscore、Elm 等等，纷纷加入了函数式编程的大潮。所以这期周刊，我们就重点引入 JavaScript 的函数式编程，浅入浅出，一窥函数式编程的思想，可能让你对编程语言的理解更加融会贯通一些。</p>
<h2 id="articleHeader0">浅入</h2>
<p><strong>1. 什么是函数式编程？</strong></p>
<p><strong><a href="https://segmentfault.com/a/1190000006046508">JavaScript 函数式编程（一）</a> 丨 <a href="https://segmentfault.com/a/1190000006219749" target="_blank">JavaScript 函数式编程（二）  // 王伟嘉</a></strong></p>
<p>这两篇将 JS 函数式编程的典型特性“1. 纯函数概念，函数柯里化和函数的组合；2. 容器和 Functor，Maybe，Monad，Either 以及 IO”由浅及深，一个个地做了介绍，非常不错的入门文章。</p>
<p>「所谓的纯函数就是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。」</p>
<p><strong>2. 函数式思想的理解</strong></p>
<p><strong><a href="https://segmentfault.com/a/1190000007185920">《JavaScript 函数式编程》读书笔记  // homker</a></strong></p>
<p>这是作者对《JavaScript 函数式编程》的理解，JS 为什么要用函数式编程（数据和行为的关系、专注于过程本身），如何使用函数式编程（一等公民、纯函数、可组合、高阶函数、基于流的编程），可以让你更深入地理解 JS 大量引入函数式方法的思想。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006225377" target="_blank">译丨JavaScript 与函数式编程  // 文蔺</a></strong></p>
<p>现在，来进行更细节的分析和理解<br>展现另一面的函数式编程思维：强调将程序状态变化（即副作用 side effect）的次数减到最小，鼓励使用不可变数据（immutable data）和纯函数（pure functions）（“纯”意味着没有副作用的），更倾向于使用声明式的风格（让代码更干净，可读性更强，推理起来更简单）。</p>
<p><strong>3. 特性各个了解</strong></p>
<p><strong><a href="https://segmentfault.com/a/1190000005898817">在下函数式编程有何贵干  // 力谱宿云</a></strong></p>
<p>示例代码清晰，简单明了，让你快速了解 FP 的诸多特性，接下来，再一一分解。</p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000004906518" target="_blank">译丨JavaScript 中的不可变性（Immutability）  // leftstick</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000004895315">译丨浅入浅出 Monads  // leftstick</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000004589338" target="_blank">JavaScript 也玩私人订制——玩转函数柯里化  // 条件状语从句</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000000765247">函数式编程中局部应用（Partial Application）和局部套用（Currying）的区别  // n͛i͛g͛h͛t͛i͛r͛e͛</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000007328944" target="_blank">函数式编程之柯里化和组合详解  // 橘子小睿</a></strong></p></li>
</ul>
<p>前面提到的纯函数、函数柯里化、函数的组合、偏函数、容器、Functor、Monad、IO 等等，这里都有分别的详细讲解。</p>
<h2 id="articleHeader1">浅出</h2>
<p><strong>4. 各 JS 方言都有了哪些实践？</strong> </p>
<p><strong><a href="https://segmentfault.com/a/1190000007038278">译丨函数式 TypeScript  // 文蔺</a></strong></p>
<p>「谈到函数式编程时，可能常被提到的是机制、方法，而不是核心原则。但从根本上来说，函数式编程就是关于如使用通用的可复用函数进行组合编程。」——作者在重构 TypeScript 代码时使用函数式的一些思考</p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000003939990" target="_blank">函数式编程——入门笔记与 React 实践  // kpaxqin</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000003910357">Immutable 详解及 React 中实践  // Cam</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000006947061" target="_blank">Redux 入坑进阶 - 源码解析  // ecmadao</a></strong></p></li>
</ul>
<p>React.js 的代码中包含了大量函数式思想，比如 Immutable，比如 Redux 的柯里化函数以及代码组合，不妨来看看。</p>
<ul>
<li><p><strong>Elm 入门实践系列 by <a href="/u/kpaxqin">@kpaxqin</a> ：<a href="https://segmentfault.com/a/1190000005701562">（一）基础篇</a> 丨 <a href="https://segmentfault.com/a/1190000005701589" target="_blank">（二）类型篇</a> 丨 <a href="https://segmentfault.com/a/1190000005808614">（三）进阶篇</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000004886629" target="_blank">笨办法学函数式编程：Elm 初体验  // Integ</a></strong></p></li>
</ul>
<p>如果你打算开始函数式编程，晦涩的 Monad/Functor 们可能也需要动手写点东西来熟悉，而随着整个 React 社区往函数式方向发展，Elm 作为前端函数式编程的先驱和风向标，毫无疑问是值得去学习和借鉴的。这两个系列，一步步地带你了解如何使用 Elm 构建应用。</p>
<p><strong>5. 函数式的思想在其他语言中的体现</strong></p>
<p>函数式编程在实际生产中发挥着巨大的作用，越来越多的语言加入闭包，匿名函数等非常典型的函数式编程的特性，从某种程度上来讲，函数式编程正在逐步“同化”命令式编程。</p>
<ul>
<li><p><strong>Swift - <a href="https://segmentfault.com/a/1190000004340919">Swift 中的柯里化 Currying</a></strong>：Swift 柯里化特性的简单了解</p></li>
<li><p><strong>Scala - <a href="https://segmentfault.com/a/1190000003502846" target="_blank">Scala 类型参数</a></strong>：多范式语言的典范</p></li>
<li><p><strong>Java - <a href="https://segmentfault.com/a/1190000004863730">Java8 Lambda 本质论</a> 丨 <a href="https://segmentfault.com/a/1190000004552525" target="_blank">正交设计</a> 丨 <a href="https://segmentfault.com/a/1190000004581460">Write Lean Programs</a></strong>：Java 的设计模式、λ 演算、设计思想</p></li>
<li><p><strong>Scheme - <a href="https://segmentfault.com/a/1190000004474526" target="_blank">如何实现一个没有名字的递归函数</a></strong>：一个递归引发的思考 - “当函数在还没有定义完整时，为什么能够直接调用的呢？”</p></li>
</ul>
<p><strong>6. 补充阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007180426">JavaScript 函数式真正的浅析</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007464770" target="_blank">JavaScript 数组分组的实现</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005920644">Immutable.js 初识</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003733107" target="_blank">js 函数式编程之函数柯里化</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007491981">合理的使用纯函数式编程</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003632186" target="_blank">浅谈函数式编程和函数响应式编程</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005775000">正交设计，OO 与 SOLID</a></p></li>
</ul>
<p><em>（本期完）</em><br><br></p>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly" target="_blank">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.16 - 浅入浅出 JavaScript 函数式编程

## 原文链接
[https://segmentfault.com/a/1190000007784565](https://segmentfault.com/a/1190000007784565)

