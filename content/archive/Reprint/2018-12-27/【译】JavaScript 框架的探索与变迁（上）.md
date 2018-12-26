---
title: '【译】JavaScript 框架的探索与变迁（上）' 
date: 2018-12-27 2:30:12
hidden: true
slug: mmoxfsz03tc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">译者言</h2>
<p>近几年可谓是 JavaScript 的大爆炸纪元，各种框架类库层出不穷，它们给前端带来一个又一个的新思想。从以前我们用的 jQuery 直接操作 DOM，到 BackboneJS、Dojo 提供监听器的形式，在到 Ember.js、AngularJS 数据绑定的理念，再到现在的 React、Vue 虚拟 DOM 的思想。都是在当前 Web 应用日益复杂的时代，对于如何处理「应用状态」与「用户界面」之间如何更新的问题，带来更先进的解决方案。</p>
<p>本文是一篇从技术上，以数据变更和UI同步为方向，循序渐进的讲述 JavaScript 框架如何演进过来的。</p>
<p>本篇文章，给了我一个更加高纬度的视角，来看待 JavaScript 这些个框架。</p>
<h2 id="articleHeader1">正文</h2>
<p>在 2015 年，JavaScript 框架的选择并不少。在 Angular，Ember，React，Backbone 以及它们众多的竞争者中，有足够多的选择。</p>
<p>虽然可以通过不少方面来对比这些框架的不同，但是最让人感兴趣的是它们分别如何管理状态（state）的。特别的，通过思考这些框架分别如何处理状态变化是很有用的。它们都提供了什么样的工具让你把这些变化呈现给用户？ </p>
<p>如何处理应用状态（app state）与用户界面（user interface）之间的同步，长期以来都是用户界面开发如此复杂的主要原因。现在，我们有几个不同的处理方案。本文探索以下：Ember 的数据绑定，Angular 的脏检查、React 的虚拟DOM以及它与不可变数据结构（immutable data structures）之间的联系。</p>
<h2 id="articleHeader2">数据映射 Projecting Data</h2>
<p>我们首先讨论程序内部的状态与屏幕所看到的内容之间的映射。你把各种诸如 object，arrays，strings，以及 numbers 转换成一颗由诸如 texts、forms、links、buttons 和 images 组成的树状结构。在 Web 中，前者通常指 JavaScript 中的数据结构，而后者指的是 <a href="https://www.w3.org/DOM/" rel="nofollow noreferrer" target="_blank">DOM （Document Object Model）</a></p>
<p>我们经常称这个过程为渲染（rendering），你可以想象这个过程是从数据模型到用户界面的一个映射。当你把数据渲染成一个模板，你得到的是一个 DOM（或者说 HTML）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011802942" src="https://static.alili.tech/img/remote/1460000011802942" alt="onchange_base.svg" title="onchange_base.svg" style="cursor: pointer; display: inline;"></span></p>
<p>这个过程本身已经足够简单了，数据模型到用户界面之间的映射，并不总是那么的琐碎。它基本只是一个接受输入然后直接输出的函数。</p>
<p>在我们需要考虑数据开始随着时间而变化的时候，这件事就变得更有挑战性了。当用户进行操作或者其它某些操作导致数据产生变化的时候，用户界面需要呈现出这些变化。而且，由于重新构建 DOM 树的代价是极其昂贵的，我们要尽可能产生小的影响。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011802943" src="https://static.alili.tech/img/remote/1460000011802943" alt="onchange_change.svg" title="onchange_change.svg" style="cursor: pointer; display: inline;"></span></p>
<p>因为状态产生了变化，这比只是一次性渲染用户界面变得更加难。这就到了以下解决方案开始表演的时候了。</p>
<h2 id="articleHeader3">服务器渲染 Server-Side Rendering</h2>
<blockquote><p>宇宙是永恒不变的，没有任何变化</p></blockquote>
<p>在 JavaScript 新纪元之前，你的 Web 应用的任何交互都会触发一趟服务器的环绕旅行。每一个点击和每一个表单提交都会卸载当前页面，一个请求发送到服务器，服务器响应一个新的页面，然后浏览器重新渲染。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011802944" src="https://static.alili.tech/img/remote/1460000011802944" alt="onchange_reload.svg" title="onchange_reload.svg" style="cursor: pointer; display: inline;"></span></p>
<p>这种方式不需要前端管理任何的状态（state）。就前端范畴而言，当一些事情发生了(后端返回的数据)，整个过程就结束了。就算有状态，那也只是后端的范畴。前端只是由 HTML 和 CSS 构成，也许有时候会有些 JavaScript 撒在表面调味。</p>
<p>从前端来说，这是一个很简单的实现方式，但也是一个很慢的方式。每一个交互并不仅仅触发UI的重渲染，还涉及服务器的数据查询以及服务端渲染。</p>
<p>大多数人已经不再这样做了，我们可以在服务器端初始化我们的应用，然后转移到前端来做状态的管理（这也是 <a href="http://isomorphic.net/" rel="nofollow noreferrer" target="_blank">isomorphic JavaScript</a> 致力于的。）。已经有人在类似的<a href="https://signalvnoise.com/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui" rel="nofollow noreferrer" target="_blank">更复杂的设计思想</a>中取得成功。</p>
<h2 id="articleHeader4">JS第一代革命：手动重渲染</h2>
<blockquote><p>我不知道哪些需要渲染的，你来告诉我。</p></blockquote>
<p>第一代革命的 JavaScript 框架，如：Backbone.js, Ext JS 以及 Dojo。第一次在浏览器端引入了数据模型（Data Model）的概念，代替了以前那些直接操作 DOM 的轻量级的脚本代码。这意味着你终于可以在浏览器端管理状态了。当数据模型的上下文改变时，你需要做一些工作，让改变呈现在用户界面中。</p>
<p>这些框架的体系能分离你的模型和界面代码，但同时也留下了一大部分同步的工作给你。你可以监听某类事件的发生，但是你有义务去计算如何重新渲染以及如何落实到用户界面中。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011802945" src="https://static.alili.tech/img/remote/1460000011802945" alt="onchange_manual.svg" title="onchange_manual.svg" style="cursor: pointer; display: inline;"></span></p>
<p>基于这种模型，作为开发者，你需要考虑大量的性能问题。由于你能控制什么时候和怎么处理更新，你可以从中做任意的做一些调整。这经常会面临一些权衡：简单的处理导致大面积的页面更新，或者强性能的处理来更新一小块页面。</p>
<h2 id="articleHeader5">Ember.js: 数据绑定</h2>
<blockquote><p>由于我在控制你的模型和试图，我会确切知道如何重新渲染。</p></blockquote>
<p>当应用状态改变的时候，手动处理渲染工作，无可避免的增加了复杂度。很多框架旨在解决这个问题，<a href="https://emberjs.com" rel="nofollow noreferrer" target="_blank">Ember.js</a> 就是其中之一。</p>
<p>Ember，像 Backbone 一样，当数据模型改变的时候会触发某个事件。不同之处在于 Ember 同时提供了一些方法来接收这些事件。你可以把 UI 绑定到数据模型中，这意味着有一个监听器绑定到了 UI 上。该监听器当收到事件的时候，知道如何更新 UI。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011802946" src="https://static.alili.tech/img/remote/1460000011802946" alt="onchange_kvo.svg" title="onchange_kvo.svg" style="cursor: pointer; display: inline;"></span></p>
<p>这是一个高效率的机制。尽管设置全部的监听器需要在初始化时多出一些工作，但是之后就能保证同步状态时的最小影响。当状态产生变化时， 只有真正需要更新的部分才会发生改变。</p>
<p>这种方式最大的牺牲是 Ember 需要时刻盯着数据模型。这意味着你需要通过 Ember 的 API 封装你的数据，以及你要更新数据的时候是使用 <code>foo.set('x',42)</code> 而不是 <code>foo.x = 42</code>，以此类推。</p>
<p>在未来 ES6 的 Proxies 可能会对这种模式产生一定的帮助。它让 Ember 可以通过装饰 object 来绑定那些监听器的代码。这就不用像传统方式那样重写 object 的 setter 方法了。</p>
<h2 id="articleHeader6">原文链接</h2>
<p><a href="http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html" rel="nofollow noreferrer" target="_blank">Changes and Its detection of JavaScript Framework</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript 框架的探索与变迁（上）

## 原文链接
[https://segmentfault.com/a/1190000011802939](https://segmentfault.com/a/1190000011802939)

