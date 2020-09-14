---
title: '编写react组件最佳实践' 
date: 2019-01-14 2:30:07
hidden: true
slug: rcxmrgqzzwb
categories: [reprint]
---

{{< raw >}}

                    
<p>本文已同步发表在<a href="http://hualuyao.com/2017/05/14/%E7%BC%96%E5%86%99react%E7%BB%84%E4%BB%B6%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/" rel="nofollow noreferrer" target="_blank">我的博客</a></p>
<p><strong>本文译自：<a href="https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8" rel="nofollow noreferrer" target="_blank"></a><a href="https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8" rel="nofollow noreferrer" target="_blank">https://engineering.musefind....</a></strong></p>
<p><span class="img-wrap"><img data-src="/img/bVNEeg?w=800&amp;h=400" src="https://static.alili.tech/img/bVNEeg?w=800&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我最开始学习react的时候，看到过各种各样编写组件的方式，不同教程中提出的方法往往有很大不同。当时虽说react这个框架已经十分成熟，但是似乎还没有一种公认正确的使用方法。过去几年中，我们团队编写了很多react组件，我们对实现方法进行了不断的优化，直到满意。</p>
<p>本文介绍了我们在实践中的最佳实践方式，希望能对无论是初学者还是有经验的开发者来说都有一定的帮助。</p>
<p>在我们开始之前，有几点需要说明：</p>
<ul>
<li>我们是用es6和es7语法</li>
<li>如果你不了解展示组件和容器组件的区别，可以先阅读<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" rel="nofollow noreferrer" target="_blank">这篇文章</a>
</li>
<li>如果你有任何建议、问题或者反馈，可以给我们留言</li>
</ul>
<h2 id="articleHeader0">Class Based Components (基于类的组件)</h2>
<p>Class based components 有自己的state和方法。我们会尽可能谨慎的使用这些组件，但是他们有自己的使用场景。</p>
<p>接下来我们就一行一行来编写组件。</p>
<h3 id="articleHeader1">导入CSS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { observer } from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span></code></pre>
<p>我很喜欢CSS in JS，但是它目前还是一种新的思想，成熟的解决方案还未产生。我们在每个组件中都导入了它的css文件。</p>
<blockquote>
<strong>译者注</strong>：目前CSS in JS可以使用css modules方案来解决，webpack的css-loader已经提供了该功能</blockquote>
<p>我们还用一个空行来区分自己的依赖。</p>
<blockquote>
<strong>译者注</strong>：即第4、5行和第1、2行中间会单独加行空行。</blockquote>
<h3 id="articleHeader2">初始化state</h3>
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
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> { observer } from <span class="hljs-symbol">'mobx</span>-react'

<span class="hljs-keyword">import</span> <span class="hljs-type">ExpandableForm</span> from './<span class="hljs-type">ExpandableForm</span>'
<span class="hljs-keyword">import</span> './styles/<span class="hljs-type">ProfileContainer</span>.css'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { expanded: <span class="hljs-literal">false</span> }</code></pre>
<p>你也可以在constructor中初始化state，不过我们更喜欢这种简洁的方式。我们还会确保默认导出组件的class。</p>
<h3 id="articleHeader3">propTypes 和 defaultProps</h3>
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
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> { observer } from <span class="hljs-symbol">'mobx</span>-react'
<span class="hljs-keyword">import</span> { string, <span class="hljs-class"><span class="hljs-keyword">object</span> } <span class="hljs-title">from</span> '<span class="hljs-title">prop-types</span>'</span>

<span class="hljs-keyword">import</span> <span class="hljs-type">ExpandableForm</span> from './<span class="hljs-type">ExpandableForm</span>'
<span class="hljs-keyword">import</span> './styles/<span class="hljs-type">ProfileContainer</span>.css'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { expanded: <span class="hljs-literal">false</span> }
 
  static propTypes = {
    model: <span class="hljs-class"><span class="hljs-keyword">object</span>.<span class="hljs-title">isRequired</span>,</span>
    title: string
  }
 
  static defaultProps = {
    model: {
      id: <span class="hljs-number">0</span>
    },
    title: <span class="hljs-symbol">'Your</span> <span class="hljs-type">Name</span>'
  }</code></pre>
<p>propTypes和defaultProps是静态属性，应该尽可能在代码的顶部声明。这两个属性起着文档的作用，应该能够使阅读代码的开发者一眼就能够看到。如果你正在使用react 15.3.0或者更高的版本，使用prop-types，而不是React.PropTypes。你的所有组件，都应该有propTypes属性。</p>
<h3 id="articleHeader4">方法</h3>
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
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { string, object } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> ExpandableForm <span class="hljs-keyword">from</span> <span class="hljs-string">'./ExpandableForm'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/ProfileContainer.css'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>
  state = { expanded: <span class="hljs-literal">false</span> }
 
  static propTypes = {
    model: object.isRequired,
    title: string
  }
 
  static defaultProps = {
    model: {
      id: <span class="hljs-number">0</span>
    },
    title: <span class="hljs-string">'Your Name'</span>
  }
<span class="hljs-function">  <span class="hljs-title">handleSubmit</span> = <span class="hljs-params">(e)</span> =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.props.model.save()
  }
<span class="hljs-function">  
  <span class="hljs-title">handleNameChange</span> = <span class="hljs-params">(e)</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.props.model.changeName(e.target.value)
  }
<span class="hljs-function">  
  <span class="hljs-title">handleExpand</span> = <span class="hljs-params">(e)</span> =&gt;</span> {
    e.preventDefault()
    <span class="hljs-keyword">this</span>.setState({ expanded: !<span class="hljs-keyword">this</span>.state.expanded })
  }</code></pre>
<p>使用class components,当你向子组件传递方法的时候，需要确保这些方法被调用时有正确的this值。通常会在向子组件传递时使用this.handleSubmit.bind(this)来实现。当然，使用es6的箭头函数写法更加简洁。</p>
<blockquote>
<p><strong>译者注</strong>：也可以在constructor中完成方法的上下文的绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() {
    this.handleSubmit = this.handleSubmit.bind(this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    this.handleSubmit = this.handleSubmit.bind(this);
}</span></span></code></pre>
</blockquote>
<h3 id="articleHeader5">给setState传入一个函数作为参数(passing setState a Function)</h3>
<p>在上文的例子中，我们是这么做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ expanded: !this.state.expanded })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-built_in">set</span>State({ expanded: !this.<span class="hljs-keyword">state</span>.expanded })</code></pre>
<p>setState实际是异步执行的，react因为性能原因会将state的变化整合，再一起处理，因此当setState被调用的时候，state并不一定会立即变化。</p>
<p>这意味着在调用setState的时候你不能依赖当前的state值——因为你不能确保setState真正被调用的时候state究竟是什么。</p>
<p>解决方案就是给setState传入一个方法，该方法接收上一次的state作为参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(prevState => ({ expanded: !prevState.expanded })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({ <span class="hljs-attr">expanded</span>: !prevState.expanded })</code></pre>
<h3 id="articleHeader6">解构props</h3>
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
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
}</span></code></pre>
<p>对于有很多props的组件来说，应当像上述写法一样，将每个属性解构出来，且每个属性单独一行。</p>
<h3 id="articleHeader7">装饰器(Decorators)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
export default class ProfileContainer extends Component {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-meta">@observer</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{</code></pre>
<p>如果你正在使用类似于mobx的状态管理器，你可以按照上述方式描述你的组件。这种写法与将组件作为参数传递给一个函数效果是一样的。装饰器(decorators)是一种非常灵活和易读的定义组件功能的方式。我们使用mobx和mobx-models来结合装饰器进行使用。</p>
<p>如果你不想使用装饰器，可以按照如下方式来做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ProfileContainer extends Component {
  // Component code
}
export default observer(ProfileContainer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// Component code</span>
}
export <span class="hljs-keyword">default</span> observer(<span class="hljs-type">ProfileContainer</span>)</code></pre>
<h3 id="articleHeader8">闭包</h3>
<p>避免向子组件传入闭包，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <input
            type=&quot;text&quot;
            value={model.name}
            // onChange={(e) => { model.name = e.target.value "}}"
            // ^ 不要这样写，按如下写法：
            onChange={this.handleChange}
            placeholder=&quot;Your Name&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>        &lt;input
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
            value={model.name}
            <span class="hljs-comment">// onChange={(e) =&gt; { model.name = e.target.value "}}"</span>
            <span class="hljs-comment">// ^ 不要这样写，按如下写法：</span>
            onChange={<span class="hljs-keyword">this</span>.handleChange}
            placeholder=<span class="hljs-string">"Your Name"</span>/&gt;</code></pre>
<p>原因在于：每次父组件重新渲染时，都会创建一个新的函数，并传给input。</p>
<p>如果这个input是个react组件的话，这会导致无论该组件的其他属性是否变化，该组件都会重新render。</p>
<p>而且，采用将父组件的方法传入的方式也会使得代码更易读，方便调试，同时也容易修改。</p>
<p>完整代码如下：</p>
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
<h2 id="articleHeader9">函数组件(Functional Components)</h2>
<p>这些组件没有state和方法。它们是纯净的，非常容易定位问题，可以尽可能多的使用这些组件。</p>
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
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> { func, bool } <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./styles/Form.css'</span>
ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool
}
<span class="hljs-comment">// Component declaration</span></code></pre>
<p>这里我们在组件声明之前就定义了propTypes，非常直观。我们可以这么做是因为js的函数名提升机制。</p>
<h3 id="articleHeader11">Destructuring Props and defaultProps(解构props和defaultProps)</h3>
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
<p>我们的组件是一个函数，props作为函数的入参被传递进来。我们可以按照如下方式对组件进行扩展：</p>
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
<p>我们可以给参数设置默认值，作为defaultProps。如果expanded是undefined,就将其设置为false。（这种设置默认值的方式，对于对象类的入参非常有用，可以避免`can't read property XXXX of undefined的错误）</p>
<p><strong>不要使用es6箭头函数的写法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExpandableForm = ({ onExpand, expanded, children }) => {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">const ExpandableForm = <span class="hljs-function"><span class="hljs-params">({ onExpand, expanded, children })</span> =&gt;</span> {</code></pre>
<p>这种写法中，函数实际是匿名函数。如果正确地使用了babel则不成问题，但是如果没有，运行时就会导致一些错误，非常不方便调试。</p>
<p>另外，在Jest，一个react的测试库，中使用匿名函数也会导致一些问题。由于使用匿名函数可能会出现一些潜在的问题，我们推荐使用function，而不是const。</p>
<h3 id="articleHeader12">Wrapping</h3>
<p>在函数组件中不能使用装饰器，我们可以将其作为入参传给observer函数</p>
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
<p>完整组件如下所示：</p>
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
<h2 id="articleHeader13">在JSX中使用条件判断（Conditionals in JSX）</h2>
<p>有时候我们需要在render中写很多的判断逻辑，以下这种写法是我们应该要避免的：<br><span class="img-wrap"><img data-src="/img/bVNEMK?w=800&amp;h=257" src="https://static.alili.tech/img/bVNEMK?w=800&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>目前有一些库来解决这个问题，但是我们没有引入其他依赖，而是采用了如下方式来解决：<br><span class="img-wrap"><img data-src="/img/bVNENi?w=800&amp;h=341" src="https://static.alili.tech/img/bVNENi?w=800&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>这里我们采用立即执行函数的方式来解决问题，将if语句放到立即执行函数中，返回任何你想返回的。需要注意的是，立即执行函数会带来一定的性能问题，但是对于代码的可读性来说，这个影响可以忽略。</p>
<p>同样的，当你只希望在某种情况下渲染时，不要这么做：</p>
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
      </div><pre class="hljs javascript"><code>{
  isTrue
   ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>True!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
   : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">none</span>/&gt;</span></span>
}</code></pre>
<p>而应当这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  isTrue &amp;&amp; 
    <p>True!</p>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>{
  isTrue &amp;&amp; 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>True!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}</code></pre>
<p>（全文完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写react组件最佳实践

## 原文链接
[https://segmentfault.com/a/1190000009412641](https://segmentfault.com/a/1190000009412641)

