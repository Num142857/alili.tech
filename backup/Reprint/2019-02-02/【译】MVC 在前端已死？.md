---
title: '【译】MVC 在前端已死？' 
date: 2019-02-02 2:30:10
hidden: true
slug: zarn26zhewa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="https://medium.com/@alexnm/is-mvc-dead-for-the-frontend-35b4d1fe39ec#.z4by3i9o4" rel="nofollow noreferrer" target="_blank">https://medium.com/@alexnm/is...</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVEi4C?w=600&amp;h=400" src="https://static.alili.tech/img/bVEi4C?w=600&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>随着越来越多的前端开发开勇单项数据流架构，有些人就开始考虑传统的 MVC 是否还有未来？为了便于理解，我们首先分析一下前端架构的发展史。</p>
<p>在过去的 4 年里，我看过许多 web 项目并花了大量的时间在前端架构或是为它整合一些框架。在 2010 年前，JavaScript（实现 jQuery 的语言）在传统 web 应用中被广泛用于 DOM 操作以及添加一些简单的东西。人们并不关心架构方面的东西，一些 <a href="https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern" rel="nofollow noreferrer" target="_blank">简单的模块化方式</a> 似乎已经足够用于设计我们的代码了。</p>
<p>前端架构 vs 后端架构的讨论随着单页应用这个概念的出现而爆发了，随之出现的框架有比如：<a href="http://backbonejs.org/" rel="nofollow noreferrer" target="_blank">backbone</a> 和 <a href="http://knockoutjs.com/" rel="nofollow noreferrer" target="_blank">knockout</a>。由于当时感念也都比较新，所以框架的设计者们不得不去其他地方获取灵感，所以他们借鉴了一些来自后端架构中的实践，而几乎所有的知名后端框架都是传统 MVC 的实现，由于其中的 <a href="https://www.quora.com/What-are-the-main-differences-between-MVC-MVP-and-MVVM-design-patterns-for-the-JavaScript-developer" rel="nofollow noreferrer" target="_blank">一些小差异</a>，也可以被叫做 MV*。</p>
<p>当 React.js 第一次以一个 View 层渲染库出现在人们眼前时，它由于将 HTML 和 JavaScript 写到一起的这种非直观方式而被嘲讽。但人们忽视了 React 带来的重要贡献 —— <strong>基于组件架构</strong>。React 并没有发明组件的概念，但它让组件开发更进一步。当 Facebook 在介绍 React 时将其称为 “V in the MVC” 时，这一架构上的重大突破甚至连 Facebook 也忽视了。顺便说一句，在 review 完一份 <a href="https://github.com/ngReact/ngReact" rel="nofollow noreferrer" target="_blank">同时使用了 Angular 1.x 和 React 的代码库</a> 后，我直到现在还在做恶梦。</p>
<p>不过在 2015 年，随着 <a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">Redux</a> 和 <a href="https://github.com/Reactive-Extensions/RxJS" rel="nofollow noreferrer" target="_blank">RxJS</a> 的使用，Flux 和函数式响应式编程（FRP）将我们从习惯上的传统 MVC 的思维模式转变到 <strong>单项数据流架构</strong>。</p>
<blockquote><p>那 MVC 到底问题在哪里？</p></blockquote>
<p>当然，MVC 作为一个架构模式已经被开发使用了相当长的时间，同时也可以被使用与 web 开发。不要误会，MVC 现在依然是后端开发中最好的模式，像 Rails 和 Django 等框架都很乐意使用这种模式。</p>
<p>但问题在于，MVC 在后端的使用的原则与分层方法与前端是不同的。</p>
<h2 id="articleHeader0">控制器与视图耦合（Controller-View coupling）</h2>
<p>从下图可以看到视图层和控制器在服务器端是如何交互的，它们仅有两个接触点，都跨越了客户端和服务器端的边界。</p>
<p><span class="img-wrap"><img data-src="/img/bVEi4D?w=800&amp;h=667" src="https://static.alili.tech/img/bVEi4D?w=800&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当我们将 MVC 放到客户端，这就有问题了。控制器类似与我们所知的 code-behind。控制器是高度依赖视图的（见下图），在一些框架的实现中，它甚至是被视图创建的（比如：ng-controller）。</p>
<p><span class="img-wrap"><img data-src="/img/bVEi4G?w=800&amp;h=587" src="https://static.alili.tech/img/bVEi4G?w=800&amp;h=587" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外，当你从单一职责原则（SRP）的角度考虑，这显然不满足。客户端的控制器代码同时进行了 <strong>事件响应</strong> 和 <strong>业务逻辑</strong>。</p>
<h2 id="articleHeader1">胖模型（The fat Model）</h2>
<p>考虑一下你在客户端存储的是何种模型。一方面我们有一些数据类似于 <em>users</em> 或 <em>products</em> 代表我们的<strong>应用状态（Application State）</strong>。另一方面，我们需要存储一些 <strong>UI 状态</strong>，比如 Tab 是否显示（_showTab_）或者当前选中的值（_selectedValue_）。</p>
<p>类似于控制器，模型也在违反单一职责原则（SRP），因为我们没有一个好的办法将 UI 状态和应用状态分开管理。</p>
<blockquote><p>那什么是适合组件的模型呢？</p></blockquote>
<p>一个组件就是：视图 + 事件响应 + UI 状态。</p>
<p>下图展示了我们如何真正的将 MVC 的模型分离成组件。然而红线上方的部分，正是 Flux 尝试去解决的：管理 <strong>应用状态</strong> 和 <strong>业务逻辑</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVEi4H?w=800&amp;h=490" src="https://static.alili.tech/img/bVEi4H?w=800&amp;h=490" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>随着 React 以及基于组件的架构的流行，我们看到单项数据流在管理应用状态方面的崛起。这两者可以如此方便的配合在一起使用是因为它们完全覆盖了原先的 MVC 的方式，并提供了一个对前端架构而言更好的关注点分离的方案。</p>
<p>不过不久后这就不止 React 了。如果你看过 <a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">Angular 2</a>，你会发现它采取了完全相同的模式，不过你也可以用不同的方案来管理应用状态，比如 <a href="https://github.com/ngrx/store" rel="nofollow noreferrer" target="_blank">ngrx/store</a>。</p>
<p>现在真的没有能做的更好的了，MVC 在起初就注定失败。我们需要时间来探索，这是一个 5 年的发展过程才将前端架构发展到今天。想想看，5 年其实对一个最佳实践的建立来说不算很长。</p>
<p>MVC 在起初是必要的，因为我们那时不知道在应用越来越庞大和复杂的时候，要如何组织我们的前端应用。我觉得它已经达到了起初的目的，而且也可以学习到，如果是从一个上下文（服务器端）应用到另一个（客户端）的时候，MVC 会是一个最佳实践。</p>
<blockquote><p>所以,未来将会是什么？</p></blockquote>
<p>对我们的前端应用来说，我不认为我们会很快回到传统的 MVC 架构。随着也来越多的开发者开始发现组件和单项数据流架构的优势时，关注点会被放在如何基于这条道路建设更好的工具和三方库。</p>
<p>那这类架构回事未来 5 年最好的解决方案吗？很有可能是这样，但是未来没有东西是确定的。5 年前，没有人能预测现在我们是如何写应用的，所以现在我们也不敢这么说。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】MVC 在前端已死？

## 原文链接
[https://segmentfault.com/a/1190000007184062](https://segmentfault.com/a/1190000007184062)

