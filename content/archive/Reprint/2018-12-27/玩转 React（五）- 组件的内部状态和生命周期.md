---
title: '玩转 React（五）- 组件的内部状态和生命周期' 
date: 2018-12-27 2:30:12
hidden: true
slug: nuae8gc8ve
categories: [reprint]
---

{{< raw >}}

                    
<p>文章标题总算是可以正常一点了……</p>
<p>通过之前的文章我们已经知道：在 React 体系中所谓的 "在 JavaScript 中编写 HTML 代码" 指的是 React 扩展了 JavaScript 的语法，也就是 JSX。JSX 语法中可以以类似 HTML 语法的方式使用 React 组件，从而编写 React 组件就有一种创造一个新的 HTML 标签的体验。</p>
<p>上一篇文章<a href="https://segmentfault.com/a/1190000011502742">《玩转 React（四）- 创造一个新的 HTML 标签》</a>介绍了如何来创建一个 React 组件，以及组件的属性。了解到组件的视图是属性的映射，通过改变组件属性可以触发组件重新渲染，从而改变组件的视图。其实组件的视图并不仅仅是由属性映射来的，本篇将介绍另一种可以触发组件重新渲染的方式，即组件的内部状态（state），严格来说组件的视图是由属性和内部状态映射而来的，即：<code>view = f(props, state)</code>，跟属性类似，状态的改变也会触发组件重新渲染，只不过状态是组件内部基于自身逻辑或者用户事件自己维护的，而不是由外部输入的。</p>
<p>另外本文中会介绍一个通过类继承方式定义的组件的生命周期，以及在各个生命周期函数中能做什么，不能或尽量不要做什么。</p>
<h2 id="articleHeader0">内容摘要</h2>
<ul>
<li><p><code>ReactDOM.render</code> 在一个单页面 web 应用中通常只调用一次。</p></li>
<li><p>组件可以通过 <code>setState</code> 改变内部状态 <code>state</code> 来更新视图。</p></li>
<li><p><code>setState</code> <strong>多数情况下</strong>是异步的。</p></li>
<li><p>不要直接使用当前 <code>state</code> 的值生成下一个 <code>state</code>。</p></li>
<li><p>不要直接通过 <code>this.state</code> 修改 <code>state</code>。</p></li>
<li><p>组件生命周期流程图。</p></li>
<li><p>各个生命周期函数介绍及使用经验。</p></li>
</ul>
<p>以上是本文的内容摘要，如果你已经知道我要说的是什么，那么就没有必要继续看下去了，节约时间。</p>
<h2 id="articleHeader1">组件的内部状态</h2>
<p>此前，我们已经了解到可以通过 <code>ReactDOM.render(&lt;HelloMessage name="Lucy" /&gt;, container)</code> 的方式，将带有特定属性的组件渲染到页面的某个 DOM 节点中（container），这样页面上会展示出 “Hello Lucy”，当我们希望页面上展示 “Hello Tom” 的时候，我们可以将组件的 name 属性改为 Tom 后再次调用 <code>ReactDOM.render</code> 方法，这样组件就会以新的属性重新渲染，从而更新组件的视图。</p>
<p>下面是官方文档中一个展示时钟的例子，我简单改造了下：</p>
<p><a href="https://codepen.io/Sarike/pen/Lzvzgv" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/Lzvzgv" data-typeid="3">点击预览</button></p>
<p>例子中定义了一个 <code>Clock</code> 组件，组件接收一个 <code>time</code> 属性，在组件外部通过 <code>setInterval</code> 周期性地调用 <code>ReactDOM.render</code> 不断更新 <code>Clock</code> 的属性并重新渲染。</p>
<p>然而在很多实际场景中，对于一个时钟组件，我们希望它有更好的封装性和复用性，也就是说我们希望只调用一次 <code>ReactDOM.render(&lt;Clock /&gt;, container)</code> 然后它可以自己更新自己的视图，这样我们就更容易在页面上放置多个时钟了，即复用性更好了。</p>
<p>要达到这个目的，就需要组件的内部状态来支持。组件有一个特殊的属性 <code>state</code> 用来保存组件的内部状态。用户可以通过 <code>this.setState(statePatch)</code> 来更新组件的状态，组件的状态更新后会重新执行 <code>render</code> 方法来更新视图，上面的例子使用内部状态改造后：</p>
<p><a href="https://codepen.io/Sarike/pen/oGOVRz" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/oGOVRz" data-typeid="3">点击预览</button></p>
<p>这样 <code>Clock</code> 作为一个完整的时钟组件就可以自己来更新自己了，上篇文中也有提到过，如果想要使用组件的内部状态，那组件必须以类继承的方式来定义，而不能使用函数式组件。所以说，函数式组件经常也被称作是无状态组件（stateless）。</p>
<p>上面例子中有用到 <code>componentDidMount</code> 和 <code>componentWillUnmount</code> 两个函数，它们是组件的生命周期函数，本文的后半部分将会介绍，这俩函数分别在组件挂载到页面上和组件将要从页面上移除时调用。</p>
<p>改造后的例子，我们只需要调用一次 <code>ReactDOM.render</code> 即可，在实际的项目中，一个完整的单页面 web 应用，也只需要调用一次 <code>ReactDOM.render</code> 方法把根组件挂载到页面中即可，剩下的工作就都放心地交给 React 就行了。</p>
<h3 id="articleHeader2">初始化组件内部状态</h3>
<p>在创建一个拥有内部状态的组件时，我们需要对内部状态进行初始化，即设置组件最初的状态是什么。做法很简单，就是在构造函数 <code>constructor</code> 中设置 <code>state</code> 属性就可以了。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
    constructor(props) {
        super(props); // 这行代码不能少哦
        this.state = {
            name: &quot;Lucy&quot;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props); <span class="hljs-comment">// 这行代码不能少哦</span>
        <span class="hljs-keyword">this</span>.state = {
            name: <span class="hljs-string">"Lucy"</span>
        }
    }
}</code></pre>
<h3 id="articleHeader3">setState 大多数情况下是异步的</h3>
<p><code>setState</code> 多数情况下是异步的，异步意味着通过 <code>setState</code> 更新组件状态后，不能立刻通过 <code>this.state</code> 来获取到更新之后的值，另外当连续多次调用 <code>setState</code> 来更新同一个字段时，只有最后一次更新才会生效。如下示例：</p>
<p><a href="https://codepen.io/Sarike/pen/QqPPdP" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/QqPPdP" data-typeid="3">点击预览</button></p>
<p>如果希望上面示例代码正常工作，你需要通过回调函数的方式来生成下一个 state，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(preState => ({value: preState.value + 1}));
this.setState(preState => ({value: preState.value + 2}));
this.setState(preState => ({value: preState.value + 3}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">this</span>.setState(preState =&gt; ({<span class="hljs-keyword">value</span>: preState.<span class="hljs-keyword">value</span> + <span class="hljs-number">1</span>}));
<span class="hljs-keyword">this</span>.setState(preState =&gt; ({<span class="hljs-keyword">value</span>: preState.<span class="hljs-keyword">value</span> + <span class="hljs-number">2</span>}));
<span class="hljs-keyword">this</span>.setState(preState =&gt; ({<span class="hljs-keyword">value</span>: preState.<span class="hljs-keyword">value</span> + <span class="hljs-number">3</span>}));</code></pre>
<p>所以，直接基于当前 <code>state</code> 的值，生成一下个 <code>state</code> 是不靠谱的，但是很多不清楚这一点的同学基本上都是这么做的，因为写起来简单嘛，而且貌似也没有什么问题。这是因为很多情况下，业务逻辑没有那么复杂，基本不会频繁调用 <code>setState</code> 。但是这确实是一个隐患，如果在项目初期不注意规避，等项目复杂到一定程度以后，可能会出现难以排查的BUG。</p>
<p>那为什么说多数情况下是异步的呢？难道有些情况下不是异步的吗？是的，实际上只有在 React 能控制的事件处理过程中调用的 <code>setState</code> 才是异步的，如：生命周期函数，React 内置的如 button，input 等组件的事件处理函数。在多数的情况下我们只需要在这些地方控制我们的组件就够了，所以说大多数情况下 <code>setState</code> 是异步的。</p>
<p>在某些特殊的组件中，可能需要通过 <code>addEventListener</code> 来设置某些 DOM 的事件处理函数，在这种通过原生的 JS API 来设置的事件处理过程调用 <code>setState</code> 就是同步的，会立即更新 <code>this.state</code>。另外还有 <code>setInterval</code>、<code>setTimeout</code> 等原生 API 的回调函数也是如此。</p>
<p>参考：<a href="https://www.zhihu.com/question/66749082/answer/246217812" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>
<h3 id="articleHeader4">不要直接通过 this.state 来更新组件状态</h3>
<p>这一点跟属性类似，直接通过 <code>this.state</code> 修改组件状态，组件状态被修改了，但并不会触发组件的重新渲染。这样就会导致组件视图与状态不一致。</p>
<h2 id="articleHeader5">生命周期函数</h2>
<p>一个组件被我们创造到这个世界上之后，在使用它时，它的每个实例都是有一定生命周期的，下面这张图说明了一个组件实例的生命周期：</p>
<p><span class="img-wrap"><img data-src="/img/bVXwnT?w=1558&amp;h=1270" src="https://static.alili.tech/img/bVXwnT?w=1558&amp;h=1270" alt="生命周期" title="生命周期" style="cursor: pointer; display: inline;"></span></p>
<p>图片来源：<a href="https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/" rel="nofollow noreferrer" target="_blank">https://tylermcginnis.com/an-...</a>，这张图略微有点老，不过结合下文来看也没什么问题。</p>
<p>下面我们来解释一下上面这张图。</p>
<h3 id="articleHeader6">组件初始化：constructor</h3>
<p>我们定义的每一个组件，都是一个类（class），这些类被实例化后才能作为 React DOM 中的一个节点渲染到页面上。所以，当我们通过 <code>ReactDOM.render</code> 或者在某个组件中通过 JSX 表达式将一个组件<strong>第一次</strong>渲染到页面上时，组件首先要做的就是对组件进行实例化。</p>
<p>实例化主要做的事情：</p>
<ul>
<li><p>创建一个组件的实例对象（也就是 Element，通常对应一个JSX表达式，如：<code>&lt;MyComponent /&gt;</code>）。</p></li>
<li><p>获取组件的默认属性。</p></li>
<li><p>获取组件的初始内部状态（在 <code>constructor</code> 中 <code>this.state = xxxx;</code>）。</p></li>
</ul>
<h3 id="articleHeader7">componentWillMount</h3>
<p>在组件被渲染到页面上之前执行，在组件的整个生命周期内只执行一次。在这里可以调用 <code>setState</code> 更新内部状态，但是更推荐将这里的状态更新操作放到 <code>constructor</code> 中。</p>
<p>该函数执行完后会立马执行 <code>render</code> 方法并将组件渲染到页面上。所以，在这里执行 setState 不会触发额外的渲染过程，因为这是没有必要的。</p>
<h3 id="articleHeader8">componentDidMount</h3>
<p>组件被渲染到页面上后立马执行，在组件的整个生命周期内只执行一次。这个时候是做如下操作的好时机：</p>
<ul>
<li><p>某些依赖组件 DOM 节点的操作。</p></li>
<li><p>发起网络请求。</p></li>
<li><p>设置 <code>setInterval</code>、<code>setTimeout</code> 等计时器操作。</p></li>
</ul>
<p>在这里可以调用 <code>setState</code> 更新组件内部状态，且会触发一个重新渲染的过程，即会重新执行 <code>render</code> 方法并更新视图。</p>
<h3 id="articleHeader9">componentWillReceiveProps</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">componentWillReceiveProps</span><span class="hljs-params">(nextProps)</span></span></code></pre>
<p>该声明周期函数可能在两种情况下被调用：</p>
<ol>
<li><p>组件接收到了新的属性。新的属性会通过 <code>nextProps</code> 获取到。</p></li>
<li><p>组件没有收到新的属性，但是由于父组件重新渲染导致当前组件也被重新渲染。</p></li>
</ol>
<p>你只要知道，<strong>当该函数被调用时，并不一定是因为属性发生了变化</strong>。</p>
<p>在这里也可以调用 <code>setState</code> 更新组件的内部状态，同样也不会触发额外的重新渲染操作，React 会聪明地用更新后的属性和内部状态进行一次重新渲染。</p>
<h3 id="articleHeader10">shouldComponentUpdate</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nextProps, nextState)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">shouldComponentUpdate</span><span class="hljs-params">(nextProps, nextState)</span></span></code></pre>
<p>这是一个询问式的生命周期函数，所以该函数需要一个返回值 <code>true/false</code>，如果为 <code>true</code>，组件将触发重新渲染过程，如果为 <code>false</code> 组件将不会触发重新渲染。因此，合理地利用该函数可以一定程度节省开销，提高系统的性能。</p>
<p>此处不能调用 <code>setState</code> 更新组件的状态。</p>
<p>由于组件属性或者内部状态被改变时都触发组件重新渲染，所以该函数接受两个参数：新的属性（nextProps）、新的状态（nextState）。</p>
<p>在处理该声明周期函数时，切记要兼顾属性和状态，不能只顾其一，不然很容易踩坑。例如：某位同学只依据属性来判断是否触发重新渲染，而忽略了内部状态，这样就导致你无论如何 <code>setState</code>，组件视图都不能正常更新。</p>
<p>在上篇文章中我们提到类继承方式定义组件时说到，React 提供了两个基类，一个是 <code>Component</code>，另一个是 <code>PureComponent</code>，两者的差别就在于后者已经帮我们简单实现了一下 <code>shouldComponentUpdate</code> 函数，当属性和状态都没有发生变化时返回 <code>false</code> 以避免额外的开销。</p>
<p>但是比对过程出于性能考虑，只是进行浅比对，也就是只比对对象的第一级字段，而且是否发生变化是通过 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is" rel="nofollow noreferrer" target="_blank">Object.is</a> 方法类判断的。所以会导致有时候发生变化了组件没有更新，没有变化却触发了重新渲染过程。这个在这里不再赘述，想深入探讨可以扫描问候的二维码加我微信好友（我的微信：leobaba88）。</p>
<h3 id="articleHeader11">componentWillUpdate</h3>
<p>当组件 <code>shouldComponentUpdate</code> 返回 <code>true</code> 或者调用 <code>forceUpdate</code> 时将触发此函数。</p>
<p>该函数中不能调用 <code>setState</code> 更新组件状态，当你想这么做的时候，你可以考虑将它移到 <code>componentWillReceiveProps</code> 函数里。</p>
<p>该函数在函数第一次渲染的时候不会执行。</p>
<h3 id="articleHeader12">componentDidUpdate</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(prevProps, prevState)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">componentDidUpdate</span><span class="hljs-params">(prevProps, prevState)</span></span></code></pre>
<p>在组件重新渲染过程中，重新执行 <code>render</code> 方法并更新组件视图后立即执行该函数。类似组件第一次渲染过程中的 <code>componentDidMount</code>，该函数在第一次渲染时不会执行。</p>
<p>在此处是做这些事情的好时机：</p>
<ul>
<li><p>执行依赖新 DOM 节点的操作。</p></li>
<li><p>依据新的属性发起新的网络请求。（但是此处一定要格外谨慎，一定要在确认属性变化后再发起网络请求，不然极有可能进入死循环：didUpdate -&gt; ajax -&gt; changeProps -&gt; didUpdate -&gt; ...）。</p></li>
</ul>
<h3 id="articleHeader13">componentWillUnmount</h3>
<p>当组件被从页面中移除之前调用，此时是清理战场的好时机，如清理定时器、终止网络请求等。</p>
<h3 id="articleHeader14">componentDidCatch</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidCatch(error, info)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">componentDidCatch</span><span class="hljs-params">(error, info)</span></span></code></pre>
<p>这是 React 16 新加入的一个生命周期函数。定义该生命周期函数的组件将会成为一个<strong>错误边界</strong>，错误边界这个词非常形象，它可以有效地将错误限制在一个有限的范围内，而不会导致整个应用崩溃，防止一颗耗子屎坏了一锅汤。</p>
<p>错误边界组件，可以捕获其整个子组件树内发生的任何异常，但是却不能捕获自身的异常。</p>
<p>下面是官方的一个示例，大家感受下：</p>
<p><a href="https://codepen.io/gaearon/pen/wqvxGa" rel="nofollow noreferrer" target="_blank">https://codepen.io/gaearon/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="gaearon/pen/wqvxGa" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader15">最后（微信群）</h2>
<p>这篇文章来的有点慢，非常抱歉。</p>
<p>另外为了方便大家阅读，我将所有文章的链接更新到第一篇文章 <a href="https://segmentfault.com/a/1190000011336838">《玩转React（一）- 前言》</a> 中。</p>
<p>文字的表现范围毕竟有限，为了方便大家交流，我建了一个微信群，对 React 感兴趣的同学可以进群一起交流、学习，由于微信群邀请的时间限制，大家可以先扫描下面二维码，加我好友，我拉大家进群：</p>
<p><span class="img-wrap"><img data-src="/img/bVXzqs?w=430&amp;h=430" src="https://static.alili.tech/img/bVXzqs?w=430&amp;h=430" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我的微信：<code>leobaba88</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（五）- 组件的内部状态和生命周期

## 原文链接
[https://segmentfault.com/a/1190000011776013](https://segmentfault.com/a/1190000011776013)

