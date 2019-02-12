---
title: '【react面试题】不可错过的react 面试题 「务必收藏」' 
date: 2019-02-13 2:31:23
hidden: true
slug: kv97atae3n
categories: [reprint]
---

{{< raw >}}

                    
<p>下面是一个常用的关于 React 的面试问题列表：</p>
<blockquote>无论作为一个面试者，或者招聘官，下面这些问题都可以去参考<p><strong>务必收藏</strong></p>
</blockquote>
<h4>React 的工作原理</h4>
<p>React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。</p>
<h4>使用 React 有何优点</h4>
<ul>
<li>只需查看 <code>render</code> 函数就会很容易知道一个组件是如何被渲染的</li>
<li>JSX 的引入，使得组件的代码更加可读，也更容易看懂组件的布局，或者组件之间是如何互相引用的</li>
<li>支持服务端渲染，这可以改进 SEO 和性能</li>
<li>易于测试</li>
<li>React 只关注 View 层，所以可以和其它任何框架(如Backbone.js, Angular.js)一起使用</li>
</ul>
<h4>展示组件(Presentational component)和容器组件(Container component)之间有何不同</h4>
<p>展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。</p>
<p>容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 <code>Flux actions</code>，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。</p>
<h4>类组件(Class component)和函数式组件(Functional component)之间有何不同</h4>
<ul>
<li>类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 <code>store</code> 并维持状态</li>
<li>当组件仅是接收 <code>props</code>，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件</li>
</ul>
<h4>(组件的)状态(state)和属性(props)之间有何不同</h4>
<p><code>State</code> 是一种数据结构，用于组件挂载时所需数据的默认值。<code>State</code> 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。</p>
<p><code>Props</code>(properties 的简写)则是组件的配置。<code>props</code> 由父组件传递给子组件，并且就子组件而言，<code>props</code> 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。</p>
<h4>指出(组件)生命周期方法的不同</h4>
<ul>
<li>
<code>componentWillMount</code> -- 多用于根组件中的应用程序配置</li>
<li>
<code>componentDidMount</code> -- 在这可以完成所有没有 DOM 就不能做的所有配置，并开始获取所有你需要的数据；如果需要设置事件监听，也可以在这完成</li>
<li>
<code>componentWillReceiveProps</code> -- 这个周期函数作用于特定的 prop 改变导致的 state 转换</li>
<li>
<code>shouldComponentUpdate</code> -- 如果你担心组件过度渲染，<code>shouldComponentUpdate</code> 是一个改善性能的地方，因为如果组件接收了新的 <code>prop</code>， 它可以阻止(组件)重新渲染。shouldComponentUpdate 应该返回一个布尔值来决定组件是否要重新渲染</li>
<li>
<code>componentWillUpdate</code> -- 很少使用。它可以用于代替组件的 <code>componentWillReceiveProps</code> 和 <code>shouldComponentUpdate</code>(但不能访问之前的 props)</li>
<li>
<code>componentDidUpdate</code> -- 常用于更新 DOM，响应 prop 或 state 的改变</li>
<li>
<code>componentWillUnmount</code> -- 在这你可以取消网络请求，或者移除所有与组件相关的事件监听器</li>
</ul>
<h4>应该在 React 组件的何处发起 Ajax 请求</h4>
<p>在 React 组件中，应该在 <code>componentDidMount</code> 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 <code>componentDidMount</code> 中发起网络请求将保证这有一个组件可以更新了。</p>
<h4>何为受控组件(controlled component)</h4>
<p>在 HTML 中，类似 <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code> 和 <code>&lt;select&gt;</code> 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 <code>onChange</code> 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。</p>
<h4>在 React 中，refs 的作用是什么</h4>
<p>Refs 可以用于获取一个 DOM 节点或者 React 组件的引用。何时使用 refs 的好的示例有管理焦点/文本选择，触发命令动画，或者和第三方 DOM 库集成。你应该避免使用 String 类型的 Refs 和内联的 ref 回调。Refs 回调是 React 所推荐的。</p>
<h4>何为高阶组件(higher order component)</h4>
<p>高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 <code>connect</code> 函数。除了简单分享工具库和简单的组合，HOC最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。</p>
<p>练习</p>
<hr>
<ul>
<li>写一个反转其输入的 HOC</li>
<li>写一个从 API 提供数据给传入的组件的 HOC</li>
<li>写一个实现 shouldComponentUpdate 来避免 reconciliation 的 HOC</li>
<li>写一个通过 <code>React.Children.toArray</code> 对传入组件的子组件进行排序的 HOC</li>
</ul>
<h4>使用箭头函数(arrow functions)的优点是什么</h4>
<ul>
<li>作用域安全：在箭头函数之前，每一个新创建的函数都有定义自身的 <code>this</code> 值(在构造函数中是新对象；在严格模式下，函数调用中的 <code>this</code> 是未定义的；如果函数被称为“对象方法”，则为基础对象等)，但箭头函数不会，它会使用封闭执行上下文的 <code>this</code> 值。</li>
<li>简单：箭头函数易于阅读和书写</li>
<li>清晰：当一切都是一个箭头函数，任何常规函数都可以立即用于定义作用域。开发者总是可以查找 next-higher 函数语句，以查看 <code>this</code> 的值</li>
</ul>
<h4>为什么建议传递给 setState 的参数是一个 callback 而不是一个对象</h4>
<p>因为 <code>this.props</code> 和 <code>this.state</code> 的更新可能是异步的，不能依赖它们的值去计算下一个 state。</p>
<h4>除了在构造函数中绑定 <code>this</code>，还有其它方式吗</h4>
<p>你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。</p>
<h4>怎么阻止组件的渲染</h4>
<p>在组件的 <code>render</code> 方法中返回 <code>null</code> 并不会影响触发组件的生命周期方法</p>
<h4>当渲染一个列表时，何为 key？设置 key 的目的是什么</h4>
<p>Keys 会有助于 React 识别哪些 <code>items</code> 改变了，被添加了或者被移除了。Keys 应该被赋予数组内的元素以赋予(DOM)元素一个稳定的标识，选择一个 key 的最佳方法是使用一个字符串，该字符串能惟一地标识一个列表项。很多时候你会使用数据中的 IDs 作为 keys，当你没有稳定的 IDs 用于被渲染的 <code>items</code> 时，可以使用项目索引作为渲染项的 key，但这种方式并不推荐，如果 <code>items</code> 可以重新排序，就会导致 <code>re-render</code> 变慢。</p>
<h4>(在构造函数中)调用 super(props) 的目的是什么</h4>
<p>在 <code>super()</code> 被调用之前，子类是不能使用 <code>this</code> 的，在 ES2015 中，子类必须在 <code>constructor</code> 中调用 <code>super()</code>。传递 <code>props</code> 给 <code>super()</code> 的原因则是便于(在子类中)能在 <code>constructor</code> 访问 <code>this.props</code>。</p>
<h4>何为 JSX</h4>
<p>JSX 是 JavaScript 语法的一种语法扩展，并拥有 JavaScript 的全部功能。JSX 生产 React "元素"，你可以将任何的 JavaScript 表达式封装在花括号里，然后将其嵌入到 JSX 中。在编译完成之后，JSX 表达式就变成了常规的 JavaScript 对象，这意味着你可以在 <code>if</code> 语句和 <code>for</code> 循环内部使用 JSX，将它赋值给变量，接受它作为参数，并从函数中返回它。</p>
<h4>怎么用 React.createElement 重写下面的代码</h4>
<p>Question：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
  <h1 className=&quot;greeting&quot;>
    Hello, rdhub.cn!
  </h1>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
    Hello, rdhub.cn!
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);</code></pre>
<p>Answer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, rdhub.cn!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> element = React.createElement(
  <span class="hljs-string">'h1'</span>,
  {<span class="hljs-attr">className</span>: <span class="hljs-string">'greeting'</span>},
  <span class="hljs-string">'Hello, rdhub.cn!'</span>
);</code></pre>
<h4>何为 <code>Children</code>
</h4>
<p>在JSX表达式中，一个开始标签(比如<code>&lt;a&gt;</code>)和一个关闭标签(比如<code>&lt;/a&gt;</code>)之间的内容会作为一个特殊的属性<code>props.children</code>被自动传递给包含着它的组件。</p>
<p>这个属性有许多可用的方法，包括 <code>React.Children.map</code>，<code>React.Children.forEach</code>， <code>React.Children.count</code>， <code>React.Children.only</code>，<code>React.Children.toArray</code>。</p>
<h4>在 React 中，何为 state</h4>
<p>State 和 props 类似，但它是私有的，并且完全由组件自身控制。State 本质上是一个持有数据，并决定组件如何渲染的对象。</p>
<h4>什么原因会促使你脱离 create-react-app 的依赖</h4>
<p>当你想去配置 webpack 或 babel presets。</p>
<h4>何为 redux</h4>
<p>Redux 的基本思想是整个应用的 state 保持在一个单一的 store 中。store 就是一个简单的 javascript 对象，而改变应用 state 的唯一方式是在应用中触发 actions，然后为这些 actions 编写 reducers 来修改 state。整个 state 转化是在 reducers 中完成，并且不应该有任何副作用。</p>
<h4>在 Redux 中，何为 store</h4>
<p>Store 是一个 javascript 对象，它保存了整个应用的 state。与此同时，Store 也承担以下职责：</p>
<ul>
<li>允许通过 <code>getState()</code> 访问 state</li>
<li>运行通过 <code>dispatch(action)</code> 改变 state</li>
<li>通过 <code>subscribe(listener)</code> 注册 listeners</li>
<li>通过 <code>subscribe(listener)</code> 返回的函数处理 listeners 的注销</li>
</ul>
<h4>何为 action</h4>
<p>Actions 是一个纯 javascript 对象，它们必须有一个 type 属性表明正在执行的 action 的类型。实质上，action 是将数据从应用程序发送到 store 的有效载荷。</p>
<h4>何为 reducer</h4>
<p>一个 reducer 是一个纯函数，该函数以先前的 state 和一个 action 作为参数，并返回下一个 state。</p>
<h4>Redux Thunk 的作用是什么</h4>
<p>Redux thunk 是一个允许你编写返回一个函数而不是一个 action 的 actions creators 的中间件。如果满足某个条件，thunk 则可以用来延迟 action 的派发(dispatch)，这可以处理异步 action 的派发(dispatch)。</p>
<h4>何为纯函数(pure function)</h4>
<p>一个纯函数是一个不依赖于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果。</p>
<h2 id="articleHeader0">关于</h2>
<p>语雀地址：<a href="https://www.yuque.com/rdhub/react/tgmqqt" rel="nofollow noreferrer" target="_blank">https://www.yuque.com/rdhub/react/tgmqqt</a> 欢迎点赞（给个稻谷）</p>
<p><span class="img-wrap"><img data-src="https://cdn.nlark.com/yuque/0/2018/png/188623/1540188878281-278902d3-3a45-4197-a70c-730aa4f31d0d.png" src="https://static.alili.techhttps://cdn.nlark.com/yuque/0/2018/png/188623/1540188878281-278902d3-3a45-4197-a70c-730aa4f31d0d.png" alt="image.png | left | 300x390" title="image.png | left | 300x390" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【react面试题】不可错过的react 面试题 「务必收藏」

## 原文链接
[https://segmentfault.com/a/1190000016761186](https://segmentfault.com/a/1190000016761186)

