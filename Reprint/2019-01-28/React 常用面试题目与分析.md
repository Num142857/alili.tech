---
title: 'React 常用面试题目与分析' 
date: 2019-01-28 2:30:09
hidden: true
slug: o5lq03qaivb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/24856035" rel="nofollow noreferrer" target="_blank">React 常用面试题目与分析</a>翻译自<a href="https://medium.com/@tylermcginnis/react-interview-questions-c8a319ed02bd" rel="nofollow noreferrer" target="_blank">React Interview Questions</a>，从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与工程实践</a>，更多前端思考借鉴<a href="https://zhuanlan.zhihu.com/p/24575395" rel="nofollow noreferrer" target="_blank">2016-我的前端之路:工具化与工程化</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008102873?w=800&amp;h=800" src="https://static.alili.tech/img/remote/1460000008102873?w=800&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">调用 setState 之后发生了什么？</h1>
<p>在代码中调用<code>setState</code>函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。</p>
<h1 id="articleHeader1">React 中 Element 与 Component 的区别是？</h1>
<p>简单而言，React Element 是描述屏幕上所见内容的数据结构，是对于 UI 的对象表述。典型的 React Element 就是利用 JSX 构建的声明式代码片然后被转化为<code>createElement</code>的调用组合。而 React Component 则是可以接收参数输入并且返回某个 React Element 的函数或者类。更多介绍可以参考<a href="https://tylermcginnis.com/react-elements-vs-react-components/" rel="nofollow noreferrer" target="_blank">React Elements vs React Components</a>。</p>
<h1 id="articleHeader2">在什么情况下你会优先选择使用 Class Component 而不是 Functional Component？</h1>
<p>在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。</p>
<h1 id="articleHeader3">React 中 refs 的作用是什么？</h1>
<p>Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加<code>ref</code>属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：</p>
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
<p>上述代码中的<code>input</code>域包含了一个<code>ref</code>属性，该属性声明的回调函数会接收<code>input</code>对应的 DOM 元素，我们将其绑定到<code>this</code>指针以便在其他的类函数中使用。另外值得一提的是，refs 并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：</p>
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
<h1 id="articleHeader4">React 中 keys 的作用是什么？</h1>
<p>Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  return (
    <ul>
      {this.state.todoItems.map(({task, uid}) => {
        return <li key={uid}>{task}</li>
      })}
    </ul>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render () {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {this.state.todoItems.map(({task, uid}) =&gt; {
        return <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{uid}</span>&gt;</span>{task}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  )
}</code></pre>
<p>在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。</p>
<h1 id="articleHeader5">如果你创建了类似于下面的<code>Twitter</code>元素，那么它相关的类定义是啥样子的？</h1>
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
<p>如果你还不熟悉回调渲染模式（Render Callback Pattern），这个代码可能看起来有点怪。这种模式中，组件会接收某个函数作为其子组件，然后在渲染函数中以<code>props.children</code>进行调用：</p>
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
<p>这种模式的优势在于将父组件与子组件解耦和，父组件可以直接访问子组件的内部状态而不需要再通过Props传递，这样父组件能够更为方便地控制子组件展示的UI界面。譬如产品经理让我们将原本展示的<code>Badge</code>替换为<code>Profile</code>，我们可以轻易地修改下回调函数即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Profile info={user} />}
</Twitter>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Twitter</span> <span class="hljs-attr">username</span>=<span class="hljs-string">'tylermcginnis33'</span>&gt;</span>
  {(user) =&gt; user === null
    ? <span class="hljs-tag">&lt;<span class="hljs-name">Loading</span> /&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">Profile</span> <span class="hljs-attr">info</span>=<span class="hljs-string">{user}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Twitter</span>&gt;</span>
</code></pre>
<h1 id="articleHeader6">Controlled Component 与 Uncontrolled Component 之间的区别是什么？</h1>
<p>React 的核心组成之一就是能够维持内部状态的自治组件，不过当我们引入原生的HTML表单元素时（input,select,textarea 等），我们是否应该将所有的数据托管到 React 组件中还是将其仍然保留在 DOM 元素中呢？这个问题的答案就是受控组件与非受控组件的定义分割。受控组件（Controlled Component）代指那些交由 React 控制并且所有的表单数据统一存放的组件。譬如下面这段代码中<code>username</code>变量值并没有存放到DOM元素中，而是存放在组件状态数据中。任何时候我们需要改变<code>username</code>变量值时，我们应当调用<code>setState</code>函数进行修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ControlledForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    username: ''
  }
  updateUsername = (e) =&gt; {
    <span class="hljs-keyword">this</span>.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () =&gt; {}
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;form onSubmit={<span class="hljs-keyword">this</span>.handleSubmit}&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'tex</span>t'
          value={<span class="hljs-keyword">this</span>.state.username}
          onChange={<span class="hljs-keyword">this</span>.updateUsername} /&gt;
        &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'submi</span>t'&gt;<span class="hljs-type">Submit</span>&lt;/button&gt;
      &lt;/form&gt;
    )
  }
}</code></pre>
<p>而非受控组件（Uncontrolled Component）则是由DOM存放表单数据，并非存放在 React 组件中。我们可以使用 refs 来操控DOM元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UnControlledForm extends Component {
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
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnControlledForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
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
<p>竟然非受控组件看上去更好实现，我们可以直接从 DOM 中抓取数据，而不需要添加额外的代码。不过实际开发中我们并不提倡使用非受控组件，因为实际情况下我们需要更多的考虑表单验证、选择性的开启或者关闭按钮点击、强制输入格式等功能支持，而此时我们将数据托管到 React 中有助于我们更好地以声明式的方式完成这些功能。引入 React 或者其他 MVVM 框架最初的原因就是为了将我们从繁重的直接操作 DOM 中解放出来。</p>
<h1 id="articleHeader7">在生命周期中的哪一步你应该发起 AJAX 请求？</h1>
<p>我们应当将AJAX 请求放到 componentDidMount 函数中执行，主要原因有下：</p>
<ul>
<li><p>React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。</p></li>
<li><p>如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了<code>setState</code>函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。</p></li>
</ul>
<h1 id="articleHeader8">shouldComponentUpdate 的作用是啥以及为何它这么重要？</h1>
<p>shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。</p>
<h1 id="articleHeader9">如何告诉 React 它应该编译生产环境版本？</h1>
<p>通常情况下我们会使用 Webpack 的 DefinePlugin 方法来将 NODE_ENV 变量值设置为 production。编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息。</p>
<h1 id="articleHeader10">为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？</h1>
<p><code>props.children</code>并不一定是数组类型，譬如下面这个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Parent>
  <h1>Welcome.</h1>
</Parent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Parent</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Parent</span>&gt;</span></code></pre>
<p>如果我们使用<code>props.children.map</code>函数来遍历时会受到异常提示，因为在这种情况下<code>props.children</code>是对象（object）而不是数组（array）。React 当且仅当超过一个子元素的情况下会将<code>props.children</code>设置为数组，就像下面这个代码片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Parent</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>props.children will now be an array<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Parent</span>&gt;</span></code></pre>
<p>这也就是我们优先选择使用<code>React.Children.map</code>函数的原因，其已经将<code>props.children</code>不同类型的情况考虑在内了。</p>
<h1 id="articleHeader11">概述下 React 中的事件处理逻辑</h1>
<p>为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。</p>
<h1 id="articleHeader12">createElement 与 cloneElement 的区别是什么？</h1>
<p>createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，而 cloneElement 则是用于复制某个元素并传入新的 Props。</p>
<h1 id="articleHeader13">传入 setState 函数的第二个参数的作用是什么？</h1>
<p>该函数会在<code>setState</code>函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.setState(
  { username: <span class="hljs-string">'tylermcginnis33'</span> },
  <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setState has finished and the component has re-rendered.'</span>)
)</code></pre>
<h1 id="articleHeader14">下述代码有错吗？</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">(prevState, props)</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    streak: prevState.streak + props.count
  }
})</code></pre>
<p>这段代码没啥问题，不过只是不太常用罢了，详细可以参考<a href="https://zhuanlan.zhihu.com/p/24781259?refer=wxyyxc1992" rel="nofollow noreferrer" target="_blank">React中setState同步更新策略</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 常用面试题目与分析

## 原文链接
[https://segmentfault.com/a/1190000008102870](https://segmentfault.com/a/1190000008102870)

