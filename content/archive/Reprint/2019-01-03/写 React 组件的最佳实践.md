---
title: '写 React 组件的最佳实践' 
date: 2019-01-03 2:30:11
hidden: true
slug: 0xpivi1l217p
categories: [reprint]
---

{{< raw >}}

                    
<p>本文为译文，已获得原作者允许，原文地址：<a href="http://scottdomes.com/blog/our-best-practices-for-writing-react-components/" rel="nofollow noreferrer" target="_blank">http://scottdomes.com/blog/ou...</a></p>
<p>当我第一次开始写 React 时，我发现多少个 React 教程，就有多少种写 React 组件方法。虽然如今，框架已经成熟，但是并没有一个 “正确” 写组件的方法。</p>
<p>在 MuseFind 的一年以来，我们的团队写了大量的 React 组件。我们精益求精，不断完善写 React 组件的方法。</p>
<p>本文介绍了，我们团队写 React 组件的最佳实践。<br>我们希望，无论你是初学者，还是经验丰富的人，这篇文章都会对你有用的。</p>
<p>在开始介绍之前，先说几个点：</p>
<ul>
<li><p>我们团队使用 ES6 和 ES7 的语法。</p></li>
<li><p>如果不清楚表现组件（presentational components）和容器组件（container components）之间的区别，我们建议先阅读 <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.kuvqndiqq" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</p></li>
<li><p>如果有任何建议，问题或反馈意见，请在评论中通知我们。</p></li>
</ul>
<h2 id="articleHeader0">基于类的组件</h2>
<p>基于类的组件（Class based components）是包含状态和方法的。<br>我们应该尽可能地使用基于函数的组件（Functional Components<br>）来代替它们。但是，现在让我们先来讲讲怎么写基于类的组件。</p>
<p>让我们逐行地构建我们的组件。</p>
<h3 id="articleHeader1">引入 CSS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span></code></pre>
<p>我认为最理想的 CSS 应该是 <a href="https://medium.freecodecamp.com/a-5-minute-intro-to-styled-components-41f40eb7cd55" rel="nofollow noreferrer" target="_blank"> CSS in JavaScript</a>。但是，这仍然是一个新的想法，还没有一个成熟的解决方案出现。<br>所以，现在我们还是使用将 CSS 文件引入到每个 React 组件中的方法。</p>
<p>我们团队会先引入依赖文件（node_modules 中的文件），然后空一行，再引入本地文件。</p>
<h3 id="articleHeader2">初始化状态</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

export default class ProfileContainer extends Component {
  state = { expanded: false }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">expanded</span>: <span class="hljs-literal">false</span> }</code></pre>
<p>可以使用在 <code>constructor</code> 中初始化状态的老方法。<br>也可以使用 ES7 这种简单的初始化状态的新方法。<br>更多，请阅读 <a href="https://stackoverflow.com/questions/35662932/react-constructor-es6-vs-es7" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader3">propTypes and defaultProps</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: object.isRequired,
    title: string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { string, object } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">expanded</span>: <span class="hljs-literal">false</span> }
 
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">model</span>: object.isRequired,
    <span class="hljs-attr">title</span>: string
  }
 
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">model</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Your Name'</span>
  }</code></pre>
<p><code>propTypes</code> 和 <code>defaultProps</code> 是静态属性（static properties），在组件代码中，最好把它们写在组件靠前的位置。当其他开发人员查看这个组件的代码时，应该立即看到 <code>propTypes</code> 和 <code>defaultProps</code>，因为它们就好像这个组件的文档一样。（译注：关于组件书写的顺序，参考 <a href="https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md" rel="nofollow noreferrer" target="_blank">这篇文章</a>）</p>
<p>如果使用 React 15.3.0 或更高版本，请使用 <a href="https://github.com/facebook/prop-types" rel="nofollow noreferrer" target="_blank">prop-types</a> 代替 React.PropTypes。使用 <code>prop-types</code> 时，应当将其解构。</p>
<p>所有组件都应该有 <code>propTypes</code>。</p>
<h3 id="articleHeader4">Methods</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: object.isRequired,
    title: string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { string, object } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">expanded</span>: <span class="hljs-literal">false</span> }
 
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">model</span>: object.isRequired,
    <span class="hljs-attr">title</span>: string
  }
 
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">model</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Your Name'</span>
  }
  
  handleSubmit = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.props.model.save()
  }
  
  handleNameChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.props.model.changeName(e.target.value)
  }
  
  handleExpand = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">expanded</span>: !<span class="hljs-keyword">this</span>.state.expanded })
  }</code></pre>
<p>使用基于类的组件时，当你将方法传递给组件时，你必须保证方法在调用时具有正确的上下文 <code>this</code>。常见的方法是，通过将 <code>this.handleSubmit.bind（this）</code> 传递给子组件来实现。</p>
<p>我们认为，上述方法更简单，更直接。通过 ES6 箭头功能自动 <code>bind</code> 正确的上下文。</p>
<h3 id="articleHeader5">给 <code>setState</code> 传递一个函数</h3>
<p>在上面的例子中，我们这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ expanded: !this.state.expanded })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">expanded</span>: !<span class="hljs-keyword">this</span>.state.expanded })</code></pre>
<p>因为 <code>setState</code> 它实际上是异步的。<br>由于性能原因，所以 React 会批量的更新状态，因此调用 <code>setState</code> 后状态可能不会立即更改。</p>
<p>这意味着在调用 <code>setState</code> 时，不应该依赖当前状态，因为你不能确定该状态是什么！</p>
<p>解决方案是：给 <code>setState</code> 传递函数，而不是一个普通对象。函数的第一个参数是前一个状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(prevState => ({ expanded: !prevState.expanded }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({ <span class="hljs-attr">expanded</span>: !prevState.expanded }))</code></pre>
<h3 id="articleHeader6">解构 Props</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: object.isRequired,
    title: string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }
  
  render() {
    const {
      model,
      title
    } = this.props
    return ( 
      <ExpandableForm 
        onSubmit={this.handleSubmit} 
        expanded={this.state.expanded} 
        onExpand={this.handleExpand}>
        <div>
          <h1>{title}</h1>
          <input
            type=&quot;text&quot;
            value={model.name}
            onChange={this.handleNameChange}
            placeholder=&quot;Your Name&quot;/>
        </div>
      </ExpandableForm>
    )
  }
}           " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { string, object } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>
<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">expanded</span>: <span class="hljs-literal">false</span> }
 
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">model</span>: object.isRequired,
    <span class="hljs-attr">title</span>: string
  }
 
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">model</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Your Name'</span>
  }
handleSubmit = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.props.model.save()
  }
  
  handleNameChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.props.model.changeName(e.target.value)
  }
  
  handleExpand = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({ <span class="hljs-attr">expanded</span>: !prevState.expanded }))
  }
  
  render() {
    <span class="hljs-keyword">const</span> {
      model,
      title
    } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> ( 
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpandableForm</span> 
        <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.handleSubmit}</span> 
        <span class="hljs-attr">expanded</span>=<span class="hljs-string">{this.state.expanded}</span> 
        <span class="hljs-attr">onExpand</span>=<span class="hljs-string">{this.handleExpand}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{model.name}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleNameChange}</span>
            <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Your Name"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ExpandableForm</span>&gt;</span>
    )
  }
}           </span></code></pre>
<p>如上，当组件具有多个 <code>props</code> 值时，每个 <code>prop</code> 应当单独占据一行。</p>
<h3 id="articleHeader7">装饰器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
export default class ProfileContainer extends Component {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@observer
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{</code></pre>
<p>如果使用 <code>mobx</code>，那么应当是用装饰器（decorators）。其本质是将装饰器的组件传递到一个函数。</p>
<p>使用装饰器一种更加灵活和更加可读的方式。<br>我们团队在使用 <code>mobx</code> 和我们自己的 <code> mobx-models</code> 库时，使用了大量的装饰器。</p>
<p>如果您不想使用装饰器，也可以按照下面的方式做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ProfileContainer extends Component {
  // Component code
}
export default observer(ProfileContainer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// Component code</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> observer(ProfileContainer)</code></pre>
<h3 id="articleHeader8">闭包</h3>
<p>避免传递一个新闭包（Closures）给子组件，像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
type=&quot;text&quot;
value={model.name}
// onChange={(e) => { model.name = e.target.value "}}"
// ^ 上面是错误的. 使用下面的方法：
onChange={this.handleChange}
placeholder=&quot;Your Name&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;input
type=<span class="hljs-string">"text"</span>
value={model.name}
<span class="hljs-comment">// onChange={(e) =&gt; { model.name = e.target.value "}}"</span>
<span class="hljs-comment">// ^ 上面是错误的. 使用下面的方法：</span>
onChange={<span class="hljs-keyword">this</span>.handleChange}
placeholder=<span class="hljs-string">"Your Name"</span>/&gt;</code></pre>
<p>为什么呢？因为每次父组件 <code>render</code> 时，都会创建一个新的函数（译注：通过 <code>(e) =&gt; { model.name = e.target.value }</code> 创建的新的函数也叫 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">闭包</a>）。 </p>
<p>如果将这个新函数传给一个 React 组件，无论这个组件的其他 <code>props</code> 有没有真正的改变，都就会导致它重新渲染。</p>
<p>调和（Reconciliation）是 React 中最耗费性能的一部分。因此，要避免传递新闭包的写法，不要让调和更加消耗性能！另外，传递类的方法的之中形式更容易阅读，调试和更改。</p>
<p>下面是我们整个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'
// Separate local imports from dependencies
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

// Use decorators if needed
@observer
export default class ProfileContainer extends Component {
  state = { expanded: false }
  // Initialize state here (ES7) or in a constructor method (ES6)
 
  // Declare propTypes as static properties as early as possible
  static propTypes = {
    model: object.isRequired,
    title: string
  }

  // Default props below propTypes
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }

  // Use fat arrow functions for methods to preserve context (this will thus be the component instance)
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.name = e.target.value
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }
  
  render() {
    // Destructure props for readability
    const {
      model,
      title
    } = this.props
    return ( 
      <ExpandableForm 
        onSubmit={this.handleSubmit} 
        expanded={this.state.expanded} 
        onExpand={this.handleExpand}>
        // Newline props if there are more than two
        <div>
          <h1>{title}</h1>
          <input
            type=&quot;text&quot;
            value={model.name}
            // onChange={(e) => { model.name = e.target.value "}}"
            // Avoid creating new closures in the render method- use methods like below
            onChange={this.handleNameChange}
            placeholder=&quot;Your Name&quot;/>
        </div>
      </ExpandableForm>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { string, object } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>
<span class="hljs-comment">// Separate local imports from dependencies</span>
<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>

<span class="hljs-comment">// Use decorators if needed</span>
@observer
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">expanded</span>: <span class="hljs-literal">false</span> }
  <span class="hljs-comment">// Initialize state here (ES7) or in a constructor method (ES6)</span>
 
  <span class="hljs-comment">// Declare propTypes as static properties as early as possible</span>
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">model</span>: object.isRequired,
    <span class="hljs-attr">title</span>: string
  }

  <span class="hljs-comment">// Default props below propTypes</span>
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">model</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Your Name'</span>
  }

  <span class="hljs-comment">// Use fat arrow functions for methods to preserve context (this will thus be the component instance)</span>
  handleSubmit = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.props.model.save()
  }
  
  handleNameChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.props.model.name = e.target.value
  }
  
  handleExpand = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({ <span class="hljs-attr">expanded</span>: !prevState.expanded }))
  }
  
  render() {
    <span class="hljs-comment">// Destructure props for readability</span>
    <span class="hljs-keyword">const</span> {
      model,
      title
    } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> ( 
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpandableForm</span> 
        <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.handleSubmit}</span> 
        <span class="hljs-attr">expanded</span>=<span class="hljs-string">{this.state.expanded}</span> 
        <span class="hljs-attr">onExpand</span>=<span class="hljs-string">{this.handleExpand}</span>&gt;</span>
        // Newline props if there are more than two
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{model.name}</span>
            // <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> { model.name = e.target.value "}}"
            // Avoid creating new closures in the render method- use methods like below
            onChange={this.handleNameChange}
            placeholder="Your Name"/&gt;
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ExpandableForm</span>&gt;</span>
    )
  }
}</span></code></pre>
<h2 id="articleHeader9">基于函数的组件</h2>
<p>基于函数的组件（Functional Components）是没有状态和方法的。它们是纯粹的、易读的。尽可能的使用它们。</p>
<h3 id="articleHeader10">propTypes</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'

import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool
}
// Component declaration" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>

ExpandableForm.propTypes = {
  <span class="hljs-attr">onSubmit</span>: func.isRequired,
  <span class="hljs-attr">expanded</span>: bool
}
<span class="hljs-comment">// Component declaration</span></code></pre>
<p>在声明组件之前，给组件定义 <code>propTypes</code>，因为这样它们可以立即被看见。<br>我们可以这样做，因为 JavaScript 有函数提升（function hoisting）。</p>
<h3 id="articleHeader11">解构 Props 和 defaultProps</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'

import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool,
  onExpand: func.isRequired
}

function ExpandableForm(props) {
  const formStyle = props.expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={props.onSubmit}>
      {props.children}
      <button onClick={props.onExpand}>Expand</button>
    </form>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>

ExpandableForm.propTypes = {
  <span class="hljs-attr">onSubmit</span>: func.isRequired,
  <span class="hljs-attr">expanded</span>: bool,
  <span class="hljs-attr">onExpand</span>: func.isRequired
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExpandableForm</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> formStyle = props.expanded ? {<span class="hljs-attr">height</span>: <span class="hljs-string">'auto'</span>} : {<span class="hljs-attr">height</span>: <span class="hljs-number">0</span>}
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{formStyle}</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{props.onSubmit}</span>&gt;</span>
      {props.children}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onExpand}</span>&gt;</span>Expand<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  )
}</code></pre>
<p>我们的组件是一个函数，函数的参数就是组件的 <code>props</code>。我们可以使用解构参数的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { observer } from 'mobx-react'

import { func, bool } from 'prop-types'
import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool,
  onExpand: func.isRequired
}

function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>

<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>

ExpandableForm.propTypes = {
  <span class="hljs-attr">onSubmit</span>: func.isRequired,
  <span class="hljs-attr">expanded</span>: bool,
  <span class="hljs-attr">onExpand</span>: func.isRequired
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExpandableForm</span>(<span class="hljs-params">{ onExpand, expanded = false, children, onSubmit }</span>) </span>{
  <span class="hljs-keyword">const</span> formStyle = expanded ? {<span class="hljs-attr">height</span>: <span class="hljs-string">'auto'</span>} : {<span class="hljs-attr">height</span>: <span class="hljs-number">0</span>}
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{formStyle}</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{onSubmit}</span>&gt;</span>
      {children}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onExpand}</span>&gt;</span>Expand<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  )
}</code></pre>
<p>注意，我们还可以使用默认参数作为 <code>defaultProps</code>，这种方式可读性更强。<br>如果 <code>expanded</code> 未定义，则将其设置为false。(这样可以避免类似 ‘Cannot read &lt;property&gt; of undefined’ 之类的错误)</p>
<p>避免使用函数表达式的方式来定义组件，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExpandableForm = ({ onExpand, expanded, children }) => {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">const ExpandableForm = <span class="hljs-function"><span class="hljs-params">({ onExpand, expanded, children })</span> =&gt;</span> {</code></pre>
<p>这看起来非常酷，但是在这里，通过函数表达式定义的函数却是匿名函数。</p>
<p>如果 Bable 没有做相关的命名配置，那么报错时，错误堆栈中不会告诉具体是哪个组件出错了，只会显示 &lt;&lt;anonymous&gt;&gt; 。这使得调试变得非常糟糕。</p>
<p>匿名函数也可能会导致 React 测试库 Jest 出问题。由于这些潜在的隐患，我们推荐使用函数声明，而不是函数表达式。</p>
<h3 id="articleHeader12">包裹函数</h3>
<p>因为基于函数的组件不能使用修饰器，所以你应当将基于函数的组件当做参数，传给修饰器对应的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'

import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool,
  onExpand: func.isRequired
}

function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

export default observer(ExpandableForm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>

ExpandableForm.propTypes = {
  <span class="hljs-attr">onSubmit</span>: func.isRequired,
  <span class="hljs-attr">expanded</span>: bool,
  <span class="hljs-attr">onExpand</span>: func.isRequired
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExpandableForm</span>(<span class="hljs-params">{ onExpand, expanded = false, children, onSubmit }</span>) </span>{
  <span class="hljs-keyword">const</span> formStyle = expanded ? {<span class="hljs-attr">height</span>: <span class="hljs-string">'auto'</span>} : {<span class="hljs-attr">height</span>: <span class="hljs-number">0</span>}
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{formStyle}</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{onSubmit}</span>&gt;</span>
      {children}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onExpand}</span>&gt;</span>Expand<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  )
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> observer(ExpandableForm)</code></pre>
<p>全部的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'
// Separate local imports from dependencies
import './styles/Form.css'

// Declare propTypes here, before the component (taking advantage of JS function hoisting)
// You want these to be as visible as possible
ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool,
  onExpand: func.isRequired
}

// Destructure props like so, and use default arguments as a way of setting defaultProps
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? { height: 'auto' } : { height: 0 }
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

// Wrap the component instead of decorating it
export default observer(ExpandableForm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>
<span class="hljs-comment">// Separate local imports from dependencies</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>

<span class="hljs-comment">// Declare propTypes here, before the component (taking advantage of JS function hoisting)</span>
<span class="hljs-comment">// You want these to be as visible as possible</span>
ExpandableForm.propTypes = {
  <span class="hljs-attr">onSubmit</span>: func.isRequired,
  <span class="hljs-attr">expanded</span>: bool,
  <span class="hljs-attr">onExpand</span>: func.isRequired
}

<span class="hljs-comment">// Destructure props like so, and use default arguments as a way of setting defaultProps</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExpandableForm</span>(<span class="hljs-params">{ onExpand, expanded = false, children, onSubmit }</span>) </span>{
  <span class="hljs-keyword">const</span> formStyle = expanded ? { <span class="hljs-attr">height</span>: <span class="hljs-string">'auto'</span> } : { <span class="hljs-attr">height</span>: <span class="hljs-number">0</span> }
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{formStyle}</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{onSubmit}</span>&gt;</span>
      {children}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onExpand}</span>&gt;</span>Expand<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  )
}

<span class="hljs-comment">// Wrap the component instead of decorating it</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> observer(ExpandableForm)</code></pre>
<h2 id="articleHeader13">JSX 中的条件表达式</h2>
<p>很可能你会做很多条件渲染。这是你想避免的：</p>
<p><span class="img-wrap"><img data-src="/img/bVTCRo?w=1513&amp;h=487" src="https://static.alili.tech/img/bVTCRo?w=1513&amp;h=487" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>不，三目嵌套不是一个好主意。</p>
<p>有一些库解决了这个问题（JSX-Control Statementments），但是为了引入另一个依赖库，我们使用复杂的条件表达式，解决了这个问题：</p>
<p><span class="img-wrap"><img data-src="/img/bVTCRw?w=825&amp;h=352" src="https://static.alili.tech/img/bVTCRw?w=825&amp;h=352" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>使用大括号包裹一个立即执行函数（IIFE），然后把你的 <code>if</code> 语句放在里面，返回你想要渲染的任何东西。<br>请注意，像这样的 IIFE 可能会导致一些性能消耗，但在大多数情况下，可读性更加重要。</p>
<p>更新：许多评论者建议将此逻辑提取到子组件，由这些子组件返回的不同 <code>button</code>。这是对的，尽可能地拆分组件。</p>
<p>另外，当你有布尔判断渲染元素时，不应该这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  isTrue
   ? <p>True!</p>
   : <none/>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  isTrue
   ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>True!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
   : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">none</span>/&gt;</span></span>
}</code></pre>
<p>应该使用短路运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  isTrue &amp;&amp; 
    <p>True!</p>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  isTrue &amp;&amp; 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>True!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
写 React 组件的最佳实践

## 原文链接
[https://segmentfault.com/a/1190000010835260](https://segmentfault.com/a/1190000010835260)

