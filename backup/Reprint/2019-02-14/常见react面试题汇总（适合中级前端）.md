---
title: '常见react面试题汇总（适合中级前端）' 
date: 2019-02-14 2:30:37
hidden: true
slug: a78jvd7d5b7
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">已经开源</h3>
<p>地址：<a href="https://github.com/nanhupatar/FEGuide" rel="nofollow noreferrer" target="_blank">https://github.com/nanhupatar...</a><br>关注我们团队：<br><span class="img-wrap"><img data-src="/img/bVbi0VU?w=2800&amp;h=800" src="https://static.alili.tech/img/bVbi0VU?w=2800&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">React 中 keys 的作用是什么？</h3>
<p>Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  return (
    <ul>
      {this.state.todoItems.map(({item, key}) => {
        return <li key={key}>{item}</li>
      })}
    </ul>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>render () {
  <span class="hljs-built_in">return</span> (
    &lt;ul&gt;
      {this.state.todoItems.<span class="hljs-built_in">map</span>(({item, <span class="hljs-built_in">key</span>}) =&gt; {
        <span class="hljs-built_in">return</span> &lt;<span class="hljs-built_in">li</span> <span class="hljs-built_in">key</span>={<span class="hljs-built_in">key</span>}&gt;{item}&lt;/<span class="hljs-built_in">li</span>&gt;
      })}
    &lt;/ul&gt;
  )
}</code></pre>
<p>在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。</p>
<h3 id="articleHeader2">调用 setState 之后发生了什么？</h3>
<p>在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。</p>
<h3 id="articleHeader3">react 生命周期函数</h3>
<ul>
<li>
<p>初始化阶段：</p>
<ul>
<li>getDefaultProps:获取实例的默认属性</li>
<li>getInitialState:获取每个实例的初始化状态</li>
<li>componentWillMount：组件即将被装载、渲染到页面上</li>
<li>render:组件在这里生成虚拟的 DOM 节点</li>
<li>componentDidMount:组件真正在被装载之后</li>
</ul>
</li>
<li>
<p>运行中状态：</p>
<ul>
<li>componentWillReceiveProps:组件将要接收到属性的时候调用</li>
<li>shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）</li>
<li>componentWillUpdate:组件即将更新不能修改属性和状态</li>
<li>render:组件重新描绘</li>
<li>componentDidUpdate:组件已经更新</li>
</ul>
</li>
<li>
<p>销毁阶段：</p>
<ul><li>componentWillUnmount:组件即将销毁</li></ul>
</li>
</ul>
<h3 id="articleHeader4">shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）</h3>
<p>shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。</p>
<p>参考<a>react 性能优化-sf</a></p>
<h3 id="articleHeader5">为什么虚拟 dom 会提高性能?(必考)</h3>
<p>虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。</p>
<p>用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。</p>
<p>参考 <a href="https://www.zhihu.com/question/29504639?sort=created" rel="nofollow noreferrer" target="_blank">如何理解虚拟 DOM?-zhihu</a></p>
<h3 id="articleHeader6">react diff 原理（常考，大厂必考）</h3>
<ul>
<li>把树形结构按照层级分解，只比较同级元素。</li>
<li>给列表结构的每个单元添加唯一的 key 属性，方便比较。</li>
<li>React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）</li>
<li>合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.</li>
<li>选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。</li>
</ul>
<p>参考：<a>React 的 diff 算法</a></p>
<h3 id="articleHeader7">React 中 refs 的作用是什么？</h3>
<p>Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CustomForm extends Component {
  handleSubmit = () => {
    console.log(&quot;Input Value: &quot;, this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleSubmit = () =&gt; {
    console.log(<span class="hljs-string">"Input Value: "</span>, <span class="hljs-keyword">this</span>.input.value)
  }
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;form onSubmit={<span class="hljs-keyword">this</span>.handleSubmit}&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'tex</span>t'
          ref={(input) =&gt; <span class="hljs-keyword">this</span>.input = input} /&gt;
        &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'submi</span>t'&gt;<span class="hljs-type">Submit</span>&lt;/button&gt;
      &lt;/form&gt;
    )
  }
}</code></pre>
<p>上述代码中的 input 域包含了一个 ref 属性，该属性声明的回调函数会接收 input 对应的 DOM 元素，我们将其绑定到 this 指针以便在其他的类函数中使用。另外值得一提的是，refs 并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CustomForm</span> (<span class="hljs-params">{handleSubmit}</span>) </span>{
  <span class="hljs-keyword">let</span> inputElement
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{()</span> =&gt;</span> handleSubmit(inputElement.value)}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{(input)</span> =&gt;</span> inputElement = input} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
  )
}</span></code></pre>
<h3 id="articleHeader8">如果你创建了类似于下面的 Twitter 元素，那么它相关的类定义是啥样子的？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Twitter</span> <span class="hljs-attr">username</span>=<span class="hljs-string">'tylermcginnis33'</span>&gt;</span>
  {(user) =&gt; user === null
    ? <span class="hljs-tag">&lt;<span class="hljs-name">Loading</span> /&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">Badge</span> <span class="hljs-attr">info</span>=<span class="hljs-string">{user}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Twitter</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.
class Twitter extends Component {
  // finish this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span>, <span class="hljs-type">PropTypes</span> } from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> fetchUser from <span class="hljs-symbol">'twitte</span>r'
<span class="hljs-comment">// fetchUser take in a username returns a promise</span>
<span class="hljs-comment">// which will resolve with that username's data.</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Twitter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// finish this</span>
}</code></pre>
<p>如果你还不熟悉回调渲染模式（Render Callback Pattern），这个代码可能看起来有点怪。这种模式中，组件会接收某个函数作为其子组件，然后在渲染函数中以 props.children 进行调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
class Twitter extends Component {
  state = {
    user: null,
  }
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  componentDidMount () {
    fetchUser(this.props.username)
      .then((user) => this.setState({user}))
  }
  render () {
    return this.props.children(this.state.user)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span>, <span class="hljs-type">PropTypes</span> } from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> fetchUser from <span class="hljs-symbol">'twitte</span>r'
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Twitter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    user: <span class="hljs-literal">null</span>,
  }
  static propTypes = {
    username: <span class="hljs-type">PropTypes</span>.string.isRequired,
  }
  componentDidMount () {
    fetchUser(<span class="hljs-keyword">this</span>.props.username)
      .then((user) =&gt; <span class="hljs-keyword">this</span>.setState({user}))
  }
  render () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.user)
  }
}</code></pre>
<p>这种模式的优势在于将父组件与子组件解耦和，父组件可以直接访问子组件的内部状态而不需要再通过 Props 传递，这样父组件能够更为方便地控制子组件展示的 UI 界面。譬如产品经理让我们将原本展示的 Badge 替换为 Profile，我们可以轻易地修改下回调函数即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Profile info={user} />}
</Twitter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Twitter</span> <span class="hljs-attr">username</span>=<span class="hljs-string">'tylermcginnis33'</span>&gt;</span>
  {(user) =&gt; user === null
    ? <span class="hljs-tag">&lt;<span class="hljs-name">Loading</span> /&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">Profile</span> <span class="hljs-attr">info</span>=<span class="hljs-string">{user}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Twitter</span>&gt;</span></code></pre>
<h3 id="articleHeader9">展示组件(Presentational component)和容器组件(Container component)之间有何不同</h3>
<ul>
<li>展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。</li>
<li>容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。</li>
</ul>
<h3 id="articleHeader10">类组件(Class component)和函数式组件(Functional component)之间有何不同</h3>
<ul>
<li>类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态</li>
<li>当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件</li>
</ul>
<h3 id="articleHeader11">(组件的)状态(state)和属性(props)之间有何不同</h3>
<ul>
<li>State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。</li>
<li>Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。</li>
</ul>
<h3 id="articleHeader12">何为受控组件(controlled component)</h3>
<p>在 HTML 中，类似 <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code> 和 <code>&lt;select&gt;</code> 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。</p>
<h3 id="articleHeader13">何为高阶组件(higher order component)</h3>
<p>高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。</p>
<h3 id="articleHeader14">为什么建议传递给 setState 的参数是一个 callback 而不是一个对象</h3>
<p>因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。</p>
<h3 id="articleHeader15">除了在构造函数中绑定 this，还有其它方式吗</h3>
<p>你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。</p>
<h3 id="articleHeader16">(在构造函数中)调用 super(props) 的目的是什么</h3>
<p>在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。</p>
<h3 id="articleHeader17">应该在 React 组件的何处发起 Ajax 请求</h3>
<p>在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。</p>
<h3 id="articleHeader18">描述事件在 React 中的处理方式。</h3>
<p>为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。</p>
<p>这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新 DOM 时，React 不需要担心跟踪事件监听器。</p>
<h3 id="articleHeader19">createElement 和 cloneElement 有什么区别？</h3>
<p>React.createElement():JSX 语法就是用 React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如 div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
    type,
    [props],
    [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">React</span><span class="hljs-selector-class">.createElement</span>(
    <span class="hljs-selector-tag">type</span>,
    <span class="hljs-selector-attr">[props]</span>,
    <span class="hljs-selector-attr">[...children]</span>
)</code></pre>
<p>React.cloneElement()与 React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而就的子元素奖杯替换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.cloneElement(
  element,
  [props],
  [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">React</span><span class="hljs-selector-class">.cloneElement</span>(
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-attr">[props]</span>,
  <span class="hljs-selector-attr">[...children]</span>
)</code></pre>
<h3 id="articleHeader20">React 中有三种构建组件的方式</h3>
<p>React.createClass()、ES6 class 和无状态函数。</p>
<h3 id="articleHeader21">react 组件的划分业务组件技术组件？</h3>
<ul>
<li>根据组件的职责通常把组件分为 UI 组件和容器组件。</li>
<li>UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。</li>
<li>两者通过 React-Redux 提供 connect 方法联系起来。</li>
</ul>
<h3 id="articleHeader22">简述 flux 思想</h3>
<p>Flux 的最大特点，就是数据的"单向流动"。</p>
<ol>
<li>用户访问 View</li>
<li>View 发出用户的 Action</li>
<li>Dispatcher 收到 Action，要求 Store 进行相应的更新</li>
<li>Store 更新后，发出一个"change"事件</li>
<li>View 收到"change"事件后，更新页面</li>
</ol>
<h3 id="articleHeader23">React 项目用过什么脚手架（本题是开放性题目）</h3>
<p>creat-react-app Yeoman 等</p>
<h3 id="articleHeader24">了解 redux 么，说一下 redux 把</h3>
<ul>
<li>redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是 view 调用 store 的 dispatch 接收 action 传入 store，reducer 进行 state 操作，view 通过 store 提供的 getState 获取最新的数据，flux 也是用来进行数据操作的，有四个组成部分 action，dispatch，view，store，工作流程是 view 发出一个 action，派发器接收 action，让 store 进行数据更新，更新完成以后 store 发出 change，view 接受 change 更新视图。Redux 和 Flux 很像。主要区别在于 Flux 有多个可以改变应用状态的 store，在 Flux 中 dispatcher 被用来传递数据到注册的回调事件，但是在 redux 中只能定义一个可更新状态的 store，redux 把 store 和 Dispatcher 合并,结构更加简单清晰</li>
<li>新增 state,对状态的管理更加明确，通过 redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点时当数据更新时有时候组件不需要，但是也要重新绘制，有些影响效率。一般情况下，我们在构建多交互，多数据流的复杂项目应用时才会使用它们</li>
</ul>
<h3 id="articleHeader25">redux 有什么缺点</h3>
<ul>
<li>一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。</li>
<li>当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见react面试题汇总（适合中级前端）

## 原文链接
[https://segmentfault.com/a/1190000016885832](https://segmentfault.com/a/1190000016885832)

