---
title: '【译】JavaScript 框架的探索与变迁（下）' 
date: 2018-12-23 2:30:07
hidden: true
slug: 6e8qe3yjnt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">AngularJS：脏检查</h2>
<blockquote><p>我不知道什么更新了，所以当更新的时候，我只能检查所有的东西。</p></blockquote>
<p>AngularJS 类似于 Ember，当状态改变的时候，必须人工去处理。但不同的是，AngularJS 从不同的角度来解决问题。</p>
<p>当你在 Angular 模板中引用你的数据，例如这样的语句 <code>"{{"foo.x"}}"</code> ，Angular 不仅仅只是渲染数据，而且会这个特定的数据创建一个观察者。如此，只要你的应用中发生任何变化，Angular 都会检查这个观察者检视着的数据是否发生了改变。如果发生了改变，就会重新渲染这个数据对应的用户界面。这个过程称作脏检查（Dirty Checking）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012265399" src="https://static.alili.tech/img/remote/1460000012265399" alt="onchange_watch.svg" title="onchange_watch.svg" style="cursor: pointer; display: inline;"></span></p>
<p>这种监听改变的风格最大的好处就是，你可以在你的数据模型中使用任何姿势。Angular 对此没有任何限制，它不关心这个。没有基础的对象需要扩展，也没有 API 需要调用。</p>
<p>但坏处就是现在数据模型没有任何内建的检测手段告诉告诉框架哪些东西发生了改变，框架对是否或者哪里发生了改变没有任何洞察力。这意味着数据模型需要通过外部来监听改变，而 Angular 就是这样子做的：所有观察者在任何时间发生的任何改变，都需要被执行一次。点击事件，HTTP 响应，timeout 方法的触发，对于这些，观察者都需要执行一遍。</p>
<p>经常去执行所有观察者，这听起来像是性能的噩梦，但是它令人惊讶的快。这主要是因为在检查到任何改变之前，没有 DOM 的操作过程，而原生的 JavaScript 引用对象的检查平均消耗的性能是廉价的。但是当你要处理大量的 UI 或者经常性触发重新渲染，那么额外的性能优化手段就变得很有必要了。</p>
<p>Ember 和 Angular 都即将得益于即将到来的标准：ECMAScript7 的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe" rel="nofollow noreferrer" target="_blank">Object.observe</a> 功能，很适合 Angular。它提供了原生的 API 给你用来监听对象属性的变化。尽管这样，Angular 不需要支持所有的用例，因为 Angular 的观察者相对于简单的监听对象属性，可以做到的更好。</p>
<p>即将到来的 Angular 2 在检测改变这件事上带来了很多有趣的更新，最近 <a href="http://victorsavkin.com/post/110170125256/change-detection-in-angular-2" rel="nofollow noreferrer" target="_blank">Victor Savkin 的一篇文章</a>有介绍到。</p>
<p>关于这个主题，也可以看：<a href="https://www.youtube.com/watch?v=jvKGQSFQf10&amp;feature=youtu.be" rel="nofollow noreferrer" target="_blank">Victor's ng-conf talk</a></p>
<h2 id="articleHeader1">React: 虚拟 DOM</h2>
<blockquote><p>我不知道到底哪些发生了变化，所以我只能重新渲染所有东西，然后看一下有哪些不同。</p></blockquote>
<p>React 有很多有趣的特性，但是我们讨论的最有趣的特性是虚拟 DOM。</p>
<p>像 Angular 一样，React 不会对数据模型进行限制，而是让你使用你认为合适的任何对象和数据结构。那么，它是如何在存在改变的情况下使 UI 保持最新呢？</p>
<p>React 所做的是有效的把我们带回服务器渲染时代，当时我们还不关心状态变化：每当某处发生改变的时候，它会从头重新渲染整个 UI。这可以显著的简化 UI 的代码。大部分情况，你不会关心如何在 React 中维护状态。就像服务器渲染一样，渲染一次就算了。当组件需要变更时，它只能再次重新渲染。组价的初始化渲染和更细它的数据之间，没有任何区别。</p>
<p>如果故事就这么结束的话，它看起来的确非常低效。然而，React 在重新渲染方面，有点特殊。</p>
<p>当 React 进行重新渲染时，它首先会渲染到虚拟 DOM 中，这不是一个实际的 DOM 对象的图。而是一个轻量级的，有纯粹的 object 和 array 组成的纯 JavaScript 的数据结构，它代表着一个真实的 DOM 对象的图。</p>
<p>然后，一个独立的进程会根据虚拟 DOM 的结构来创建那些在屏幕上显示的真实的 DOM 元素。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012265400" src="https://static.alili.tech/img/remote/1460000012265400" alt="onchange_vdom_initial.svg" title="onchange_vdom_initial.svg" style="cursor: pointer; display: inline;"></span></p>
<p>之后，当变化发生的时候，一个新的虚拟 DOM 会被从头到尾创建出来。这个新的虚拟 DOM 将映射出数据模型的新的状态。现在 React 在手上有两个虚拟 DOM：一个新的，一个旧的。然后会对两个虚拟 DOM 进行一个对比算法，得出它们之间的一组变化。有且只有这些更改会被应用到真实 DOM 中：此元素已添加，此属性以改变，等等。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012265401" src="https://static.alili.tech/img/remote/1460000012265401" alt="onchange_vdom_change.svg" title="onchange_vdom_change.svg" style="cursor: pointer; display: inline;"></span></p>
<p>所以 React 起码至少有一个好处，就是你不用追踪变化了。你只需要每次重新渲染整个 UI ，然后无论改变了什么最终都会得到相应的结果。React 的虚拟 DOM 对比算法，能让你做到这一点，并且最大限度的节省昂贵的 DOM 操作。</p>
<h2 id="articleHeader2">Om: 不可改变的数据结构</h2>
<blockquote><p>我确切的知道哪些没有改变。</p></blockquote>
<p>虽然 React 的虚拟 DOM 相当的块，但是当你的 UI 非常庞大或者经常性渲染的时候（例如：每秒高达 60 次），它依然会面临瓶颈。</p>
<p>问题在于，真的没办法每次都渲染出整个虚拟 DOM，除非你引入一些方法来控制数据模型的改变，就像 Ember 做的一样。</p>
<p>一种控制变化的办法是 <a href="http://en.wikipedia.org/wiki/Persistent_data_structure" rel="nofollow noreferrer" target="_blank">不可改变的，持久化的数据结构</a>。这些看起来似乎很适合使用在 React 的虚拟 DOM 中，正如 David Nolen 在 <a href="https://github.com/omcljs/om" rel="nofollow noreferrer" target="_blank">Om</a> 库中所做的 <a href="http://swannodette.github.io/2013/12/17/the-future-of-javascript-mvcs/" rel="nofollow noreferrer" target="_blank">工作</a> 那样，一个构建于 React 和 <a href="https://github.com/clojure/clojurescript" rel="nofollow noreferrer" target="_blank">ClojureScript</a> 之上的库。</p>
<p>有一点关于不可改变数据结构的是，顾名思义，你永远不能改变它，只能产生新的版本。如果你想改变一个对象的属性，你只能新建一个对象和属性，因为你不能改变已经存在的那一个。由于持久化数据结构的工作方式，这比听起来更加有效率。</p>
<p>这意味着在检测变化方面，当 React 组件都只由不可变数据组成的时候，只有一个逃生窗口：当你重新渲染一个组件时，组件的状态仍然指向上次渲染时的相同数据结构，你就可以跳过这次重新渲染。你可以使用该组件的先前的虚拟 DOM 以及源自该组件的整个组件树。没有必要进一步挖掘，因为在这个状态中所有东西都不可能改变。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012265402" src="https://static.alili.tech/img/remote/1460000012265402" alt="onchange_immutable.svg" title="onchange_immutable.svg" style="cursor: pointer; display: inline;"></span></p>
<p>就像 Ember 一样，像 Om 的这种库不允许在你的数据中使用旧的 JavaScript 对象图。你必须在不可变数据结构中构建你的数据模型，从而才能在其中得到好处。我会赞同这样的做法，因为这一次你这样做并不是为了取悦框架本身。你这样做只是因为这是一个又简单又好的方式去管理你的应用状态。使用不可变数据结构的主要好处，并不是提升渲染性能，而是简化你的应用结构。</p>
<p>虽然 Om 和 ClojureScript 已经讲 React 和不可变数据结构融合起来，但是他们并不是圈子里面的唯一组合。而仅仅使用 React 和 Facebook 的 <a href="http://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable-js</a> 是完全可能的。这个库的作者 Lee Byron 在最近的一次 React.js 为主题的会议中进行了一个 <a href="https://www.youtube.com/embed/I7IdS-PbEgI" rel="nofollow noreferrer" target="_blank">精彩的介绍</a>。</p>
<p>同时我建议看一下 Rich Hickey's 的 <a href="http://www.infoq.com/presentations/Value-Identity-State-Rich-Hickey" rel="nofollow noreferrer" target="_blank">Persistent Data Structures And Managed References</a>, 去了解状态管理的方法。</p>
<p>我自己现在一直在为不可变数据数据结构 <a href="http://blog.deveo.com/immutability-in-ruby-part-1-data-structures/" rel="nofollow noreferrer" target="_blank">写诗</a>，但我绝对没有预见到它会进入前端 UI 框架行列。它看起来似乎不遗余力的发生着，而 Angular 的人 <a href="http://victorsavkin.com/post/110170125256/change-detection-in-angular-2" rel="nofollow noreferrer" target="_blank">正在为支持这个而努力着</a>。</p>
<h2 id="articleHeader3">总结</h2>
<p>检测变化时 UI 开发中的核心问题，而 JavaScript 框架们以各种方式解决这个问题。</p>
<p>EmberJS 能在它们发生变化的时候检测到，因为它控制着你的数据模型 API，并且可以在你调用它的时候触发事件。</p>
<p>Angular.js 是事后进行检测， 它通过重新运行你已经在 UI 中注册的所有数据绑定，来检测它们的值是否已经发生变化。</p>
<p>React 的检测方法是通过把整个 UI 重新渲染成一个虚拟 DOM，然后和旧的版本进行对比。无论改变了什么，都可以给真实 DOM 打上个补丁。</p>
<p>React 和 不可变数据结构的组合，对比纯粹的 React 有所增强，通过快速的在组件树中标记不可变的节点。因为组件内的变化是不被允许的。但是，这不是主要出于性能的原因，而是由于它对整个应用程序体系结构有积极的影响。</p>
<h2 id="articleHeader4">原文链接</h2>
<p><a href="http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html" rel="nofollow noreferrer" target="_blank">Changes and Its detection of JavaScript Framework</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript 框架的探索与变迁（下）

## 原文链接
[https://segmentfault.com/a/1190000012265394](https://segmentfault.com/a/1190000012265394)

