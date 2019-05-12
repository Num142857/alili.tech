---
title: 'React 常见的面试题（在 React 里面，你可以知道也可以不知道的事, 但是你会发现他们确实很有用）' 
date: 2019-01-17 2:30:25
hidden: true
slug: 1v2q4wpit89
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React 常见的面试题</h2>
<blockquote>（在 React 里面，你可以知道也可以不知道的事, 但是你会发现他们确实很有用）</blockquote>
<hr>
<p>根据记录，问这些问题可能不是深入了解他们在使用 React 方面的经验的最佳方式。<br>之所以标题是《 React 常见的面试题》，其实只是想起一个比《在 React 里面，你可以知道也可以不知道的事, 但是你会发现他们确实很有用》要简单明了的标题而已。</p>
<p><span class="img-wrap"><img data-src="/img/bVLVYg?w=800&amp;h=800" src="https://static.alili.tech/img/bVLVYg?w=800&amp;h=800" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>原文链接：<a href="https://tylermcginnis.com/react-interview-questions/" rel="nofollow noreferrer" target="_blank">React Interview Questions</a></p>
<p>作者： Tyler.Google Developer Expert and a partner at React Training where we teach React online</p>
<p>翻译：<a href="http://johannlai.com" rel="nofollow noreferrer" target="_blank">Johann Lai</a></p>
<h2 id="articleHeader1">当你调用 <strong>setState</strong> 的时候，发生了什么事？</h2>
<p>当调用 <code>setState</code> 时，React会做的第一件事情是将传递给 <code>setState</code> 的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 <code>React</code> 元素树（您可以将其视为 UI 的对象表示）。<br>一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（<strong>diff</strong>）。   </p>
<p>通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。</p>
<hr>
<h2 id="articleHeader2">在 React 当中  Element 和  Component 有何区别？</h2>
<p>简单地说，一个 <strong>React  element</strong> 描述了你想在屏幕上看到什么。换个说法就是，一个 <strong>React  element</strong>  是一些 UI 的对象表示。</p>
<p>一个 <strong>React Component</strong> 是一个函数或一个类，它可以接受输入并返回一个 <strong>React  element</strong> t（通常是通过 JSX ，它被转化成一个 createElement 调用）。</p>
<p>有关更多信息，请查看 <a href="https://tylermcginnis.com/react-elements-vs-react-components/" rel="nofollow noreferrer" target="_blank">React Elements vs React Components</a></p>
<hr>
<h2 id="articleHeader3">什么时候在功能组件( Class Component  )上使用类组件(  Functional Component )？</h2>
<p>如果您的组件具有状态( state )或生命周期方法，请使用 Class 组件。否则，使用功能组件</p>
<hr>
<h2 id="articleHeader4">什么是 React 的 refs ，为什么它们很重要？</h2>
<p><strong>refs</strong> 就像是一个逃生舱口，允许您直接访问DOM元素或组件实例。为了使用它们，您可以向组件添加一个 <strong>ref</strong> 属性，该属性的值是一个回调函数，它将接收底层的 DOM 元素或组件的已挂接实例，作为其第一个参数。</p>
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
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnControlledForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleSubmit = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Input Value: "</span>, <span class="hljs-keyword">this</span>.input.value)
  }
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.handleSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{(input)</span> =&gt;</span> this.input = input} /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>以上注意到我们的输入字段有一个 <strong>ref</strong> 属性，其值是一个函数。该函数接收我们然后放在实例上的实际的 DOM 元素，以便在 <em>handleSubmit</em> 函数内部访问它。经常误解的是，您需要使用类组件才能使用<strong>ref</strong> ，但 <strong>ref</strong> 也可以通过利用 <code>JavaScript</code> 中的<strong>闭包</strong>与 功能组件( functional components )一起使用。</p>
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
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CustomForm</span> (<span class="hljs-params">{handleSubmit}</span>) </span>{
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
<hr>
<h2 id="articleHeader5">React 中的 <strong>keys</strong> 是什么，为什么它们很重要？</h2>
<p><strong>keys</strong> 是什么帮助 React 跟踪哪些项目已更改、添加或从列表中删除。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  return (
    <ul>
      {this.state.todoItems.map(({task, uid}) => {
        return <li key={uid}>{task}</li>
      })}
    </ul>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {this.state.todoItems.map(({task, uid}) =&gt; {
        return <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{uid}</span>&gt;</span>{task}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  )
}</code></pre>
<p>每个<strong>keys</strong> 在兄弟元素之间是独一无二的。我们已经谈过几次关于和解（reconciliation）的过程，而且这个和解过程（reconciliation）中的一部分正在执行一个新的元素树与最前一个的差异。<strong>keys</strong> 使处理列表时更加高效，因为 React 可以使用子元素上的 <strong>keys</strong> 快速知道元素是新的还是在比较树时才被移动。</p>
<p>而且 <strong>keys</strong> 不仅使这个过程更有效率，而且没有<strong>keys</strong>，React 不知道哪个本地状态对应于移动中的哪个项目。所以当你 map 的时候，不要忽略了 <strong>keys</strong> 。</p>
<h2 id="articleHeader6">看下面的代码: 如果您在 &lt;Twitter /&gt; 下创建了一个 React 元素，&lt;Twitter /&gt;的组件定义将如何？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;Twitter username=<span class="hljs-string">'tylermcginnis33'</span>&gt;
  {(user) =&gt; user === <span class="hljs-literal">null</span>
    ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Loading</span> /&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">Badge</span> <span class="hljs-attr">info</span>=<span class="hljs-string">{user}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Twitter</span>&gt;</span>
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser接收用户名返回 promise
// 当得到 用户的数据的时候 ，返回resolve 状态

class Twitter extends Component {
  // 在这里写下你的代码
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> React, { Component, PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> fetchUser <span class="hljs-keyword">from</span> <span class="hljs-string">'twitter'</span>
<span class="hljs-comment">// fetchUser接收用户名返回 promise</span>
<span class="hljs-comment">// 当得到 用户的数据的时候 ，返回resolve 状态</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Twitter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 在这里写下你的代码</span>
}</code></pre>
<p>如果你不熟悉渲染回调模式（render callback pattern），这将看起来有点奇怪。在这种模式中，一个组件接收一个函数作为它的 child。注意上面包含在 &lt;Twitter&gt;标签内的内容。<em>Twitter</em> 组件的 child 是一个函数，而不是你曾经习以为常的一个组件。 这意味着在实现 <em>Twitter</em> 组件时，我们需要将 <em>props.children</em> 作为一个函数来处理。 </p>
<p>以下是我的答案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    import React, { Component, PropTypes } from 'react'
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
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
    <span class="hljs-keyword">import</span> React, { Component, PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
    <span class="hljs-keyword">import</span> fetchUser <span class="hljs-keyword">from</span> <span class="hljs-string">'twitter'</span>
    
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Twitter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      state = {
        <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
      }
      <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">username</span>: PropTypes.string.isRequired,
      }
      componentDidMount () {
        fetchUser(<span class="hljs-keyword">this</span>.props.username)
          .then(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> <span class="hljs-keyword">this</span>.setState({user}))
      }
      render () {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.user)
      }
    }
</code></pre>
<p><strong>值得注意的是</strong>，正如我上面提到的，我通过调用它并传递给 user 来把 props.children 处理为为一个函数。</p>
<p>这种模式的好处是我们已经将我们的父组件与我们的子组件分离了。父组件管理状态，父组件的消费者可以决定以何种方式将从父级接收的参数应用于他们的 UI。</p>
<p>为了演示这一点，我们假设在另一个文件中，我们要渲染一个 <em>Profile</em> 而不是一个 <em>Badge,</em>，因为我们使用渲染回调模式，所以我们可以轻松地交换 UI ，而不用改变我们对父（Twitter）组件的实现。</p>
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
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;Twitter username=<span class="hljs-string">'tylermcginnis33'</span>&gt;
  {(user) =&gt; user === <span class="hljs-literal">null</span>
    ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Loading</span> /&gt;</span>
    : <span class="hljs-tag">&lt;<span class="hljs-name">Profile</span> <span class="hljs-attr">info</span>=<span class="hljs-string">{user}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Twitter</span>&gt;</span></span></code></pre>
<h2 id="articleHeader7">受控组件( controlled component )与不受控制的组件( uncontrolled component )有什么区别？</h2>
<p>React 的很大一部分是这样的想法，即组件负责控制和管理自己的状态。</p>
<p>当我们将 native HTML 表单元素（ input, select, textarea 等）投入到组合中时会发生什么？我们是否应该使用 React 作为“单一的真理来源”，就像我们习惯使用React一样？ 或者我们是否允许表单数据存在 DOM 中，就像我们习惯使用HTML表单元素一样？ 这两个问题是受控（controlled） VS 不受控制（uncontrolled）组件的核心。</p>
<p><strong>受控</strong>组件是React控制的组件，也是表单数据的唯一真理来源。</p>
<p>如下所示，<em>username</em> 不存在于 DOM 中，而是以我们的组件状态存在。每当我们想要更新 <em>username</em> 时，我们就像以前一样调用setState。</p>
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ControlledForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>
  }
  updateUsername = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">username</span>: e.target.value,
    })
  }
  handleSubmit = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.handleSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.username}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.updateUsername}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>不受控制( uncontrolled component )的组件是您的表单数据由 DOM 处理，而不是您的 React 组件。</p>
<p>我们使用 <strong>refs</strong> 来完成这个。</p>
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
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnControlledForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleSubmit = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Input Value: "</span>, <span class="hljs-keyword">this</span>.input.value)
  }
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.handleSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{(input)</span> =&gt;</span> this.input = input} /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>虽然不受控制的组件通常更容易实现，因为您只需使用引用从DOM获取值，但是通常建议您通过不受控制的组件来支持受控组件。</p>
<p>主要原因是受控组件<strong>支持即时字段验证</strong>，允许您有条件地禁用/启用按钮，强制输入格式，并且更多的是 『the React way』。</p>
<h2 id="articleHeader8">在哪个生命周期事件中你会发出 AJAX 请求，为什么？</h2>
<p>AJAX 请求应该在 <code>componentDidMount</code> 生命周期事件中。 有几个原因:</p>
<ul><li>Fiber，是下一次实施React的和解算法，将有能力根据需要启动和停止渲染，以获得性能优势。其中一个取舍之一是 <code>componentWillMount</code>，而在其他的生命周期事件中出发 AJAX 请求，将是具有 “非确定性的”。 这意味着 React 可以在需要时感觉到不同的时间开始调用 componentWillMount。这显然是AJAX请求的不好的方式。</li></ul>
<p>-您不能保证在组件挂载之前，AJAX请求将无法 resolve。如果这样做，那意味着你会尝试在一个未挂载的组件上设置 StState，这不仅不会起作用，反而会对你大喊大叫。 在 <code>componentDidMount</code> 中执行 AJAX 将保证至少有一个要更新的组件。</p>
<h2 id="articleHeader9">shouldComponentUpdate 应该做什么，为什么它很重要？</h2>
<p>上面我们讨论了 reconciliation ，什么是 React 在 setState 被调用时所做的。在生命周期方法 shouldComponentUpdate 中，允许我们选择退出某些组件（和他们的子组件）的 reconciliation  过程。</p>
<p>我们为什么要这样做？</p>
<p>如上所述，“和解（ reconciliation ）的最终目标是以最有效的方式，根据新的状态更新用户界面”。如果我们知道我们的用户界面（UI）的某一部分不会改变，那么没有理由让 React 很麻烦地试图去弄清楚它是否应该渲染。通过从 shouldComponentUpdate 返回 false，React 将假定当前组件及其所有子组件将保持与当前组件相同。</p>
<h2 id="articleHeader10">您如何告诉React 构建（build）生产模式，该做什么？</h2>
<p>通常，您将使用Webpack的 <em>DefinePlugin</em> 方法将 <strong>NODE_ENV</strong> 设置为 production。这将剥离像 propType 验证和额外的警告。除此之外，还有一个好主意，可以减少你的代码，因为React使用 Uglify 的 dead-code 来消除开发代码和注释，这将大大减少你的包的大小。</p>
<h2 id="articleHeader11">为什么要使用 React.Children.map（props.children，（）=&gt;） 而不是 props.children.map（（）=&gt;）</h2>
<p>因为不能保证props.children将是一个数组。 </p>
<p>以此代码为例，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Parent>
  <h1>Welcome.</h1>
</Parent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;Parent&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/Parent&gt;</span></code></pre>
<p>在父组件内部，如果我们尝试使用 props.children.map 映射孩子，则会抛出错误，因为 props.children 是一个对象，而不是一个数组。</p>
<p>如果有多个子元素，React 只会使props.children成为一个数组。就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">&lt;Parent&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  &lt;h2&gt;props.children will now be an array&lt;<span class="hljs-regexp">/h2&gt;
&lt;/</span>Parent&gt;</code></pre>
<p>这就是为什么你喜欢 <code>React.Children.map</code>，因为它的实现考虑到 <code>props.children</code> 可能是一个数组或一个对象。</p>
<h2 id="articleHeader12">描述事件在React中的处理方式。</h2>
<p>为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递<code>SyntheticEvent</code> 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。</p>
<p>这些 <code>SyntheticEvent</code> 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新DOM时，React 不需要担心跟踪事件监听器。</p>
<h2 id="articleHeader13">createElement 和 cloneElement 有什么区别？</h2>
<p>createElement 是 JSX 被转载到的，是 React 用来创建 React Elements 的内容(一些 UI 的对象表示)cloneElement用于克隆元素并传递新的 props。他们钉住了这两个?的命名。</p>
<h2 id="articleHeader14">可以选择性地传递给 setState 的第二个参数是什么，它的目的是什么？</h2>
<p>一个回调函数，当setState结束并<code>re-rendered</code>该组件时将被调用。一些没有说出来的东西是 setState 是<strong>异步</strong>的，这就是为什么它需要一个第二个回调函数。通常最好使用另一个生命周期方法，而不是依赖这个回调函数，但是很高兴知道它存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">this</span>.setState(
  { <span class="hljs-attr">username</span>: <span class="hljs-string">'tylermcginnis33'</span> },
  () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setState has finished and the component has re-rendered.'</span>)
)</code></pre>
<h2 id="articleHeader15">这段代码有什么问题？</h2>
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
<p>没毛病。但是这种写法很少被使用，并不是众所周知的，就是你也可以传递一个函数给setState，它接收到先前的状态和道具并返回一个新的状态，正如我们在上面所做的那样。它不仅没有什么问题，而且如果您根据以前的状态（state）设置状态，推荐使用这种写法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 常见的面试题（在 React 里面，你可以知道也可以不知道的事, 但是你会发现他们确实很有用）

## 原文链接
[https://segmentfault.com/a/1190000009001924](https://segmentfault.com/a/1190000009001924)

