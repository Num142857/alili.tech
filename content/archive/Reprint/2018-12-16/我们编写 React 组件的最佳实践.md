---
title: '我们编写 React 组件的最佳实践' 
date: 2018-12-16 2:30:10
hidden: true
slug: cl99p62jnmq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012933403?w=1024&amp;h=512" src="https://static.alili.tech/img/remote/1460000012933403?w=1024&amp;h=512" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>刚接触 <code>React</code> 的时候，在一个又一个的教程上面看到很多种编写组件的函数，尽管那时候 <code>React</code> 框架已经相当成熟，但是并没有一个固定的规则去规范我们去写代码。</p>
<p>在过去的一年里，我们在不断的完善我们的做法，直到满意为止。</p>
<p>本文会列出我们自己在使用的最佳实践，不管你是刚入门的新手还是很有经验的开发者，我们都希望本文对你有所帮助。</p>
<p>开始之前，先列几条：</p>
<ul>
<li>我们使用ES6/ES7</li>
<li>如果你无法区分页面组件和容器组件，推荐阅读 <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.kuvqndiqq" rel="nofollow noreferrer" target="_blank">这篇文章</a>
</li>
<li>如果有更好的意见或建议，请在评论区告诉我，谢谢</li>
</ul>
<h1 id="articleHeader0">基于 Class 的组件</h1>
<p>基于 Class 的组件是有状态的，不管它包不包含函数，我们都会尽量少用。但是它也有它的用处。</p>
<p>现在来一行一行的编写我们的组件：</p>
<h2 id="articleHeader1">导入 CSS</h2>
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
<p>我喜欢 <code>CSS in Javascript</code>，但是这个概念还比较新，现在也并没有成熟的解决方案，所以我们在每个组件里面去引用 CSS</p>
<h2 id="articleHeader2">初始化 State</h2>
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
<p>当然你也可以选择在构造函数里面去初始化，但是我们觉得这种方式更加清晰。</p>
<p>当然也会保证 Class 是默认导出的。</p>
<h2 id="articleHeader3">propTypes 和 defaultProps</h2>
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
<p>propTypes 和 defaultProps 是静态属性，尽可能的把它们写在组件的最上方，以便其他开发者阅读。</p>
<p>如果使用 <code>React 15.3.0</code> 或更高的版本，使用 <a href="https://github.com/facebook/prop-types" rel="nofollow noreferrer" target="_blank">prop-types</a> 代替 <code>React.PropTypes</code></p>
<p>所有的组件都必须声明 propTypes</p>
<h2 id="articleHeader4">函数</h2>
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
<p>使用基于 Class 的组件时，当你传递函数给子组件的时候，要确保他们有正确的 <code>this</code>，通常用这种形式实现 <code>this.handleSubmit.bind(this)</code></p>
<p>但是如果你使用箭头函数，就不需要 <code>bind(this)</code></p>
<h2 id="articleHeader5">为 setState 传递函数</h2>
<p>上面的例子中我们是这么做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ expanded: !this.state.expanded })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">expanded</span>: !<span class="hljs-keyword">this</span>.state.expanded })</code></pre>
<p>这里有个 setState 的小知识 —— 它是异步的，为了保证性能，<code>React</code> 会分批修改 state，所以 state 不会在调用 setState 之后立即改变</p>
<p>这意味着你不能依赖当前的状态，因为你不知道当前的状态是什么状态</p>
<p>这里有个解决方案 —— 传递函数给 setState，<code>React</code> 会把上一个状态 <code>prevState</code> 传递给你</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState(prevState => ({ expanded: !prevState.expanded }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({ <span class="hljs-attr">expanded</span>: !prevState.expanded }))</code></pre>
<h2 id="articleHeader6">解构 Props</h2>
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
}</span></code></pre>
<p>像上面的例子一样，每个 prop 都独占一行</p>
<h2 id="articleHeader7">装饰器(Decorators)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
export default class ProfileContainer extends Component {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@observer
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProfileContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{</code></pre>
<p>如果你使用了类似 <a href="https://github.com/mobxjs/mobx" rel="nofollow noreferrer" target="_blank">mobx</a> 的库，你可以这样去装饰你的 Class 组件</p>
<p>修改函数式组件使用 <a href="http://javascript.info/tutorial/decorators" rel="nofollow noreferrer" target="_blank">decorators</a> 很灵活并且可读</p>
<p>如果你不想使用装饰器，可以这么做：</p>
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
<h2 id="articleHeader8">闭包</h2>
<p>避免像下面注释的地方一样传递新的闭包给子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <input
      type=&quot;text&quot;
      value={model.name}
      // onChange={(e) => { model.name = e.target.value "}}"
      // ^ Not this. Use the below:
      onChange={this.handleChange}
      placeholder=&quot;Your Name&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    &lt;input
      type=<span class="hljs-string">"text"</span>
      value={model.name}
      <span class="hljs-comment">// onChange={(e) =&gt; { model.name = e.target.value "}}"</span>
      <span class="hljs-comment">// ^ Not this. Use the below:</span>
      onChange={<span class="hljs-keyword">this</span>.handleChange}
      placeholder=<span class="hljs-string">"Your Name"</span>/&gt;</code></pre>
<p>这种方式的好处是每次render，不会重新创建一个函数，没有额外的性能损失。</p>
<p>这里是完整的组件：</p>
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
<h1 id="articleHeader9">函数式组件</h1>
<p>这些组件没有状态和函数，他们很纯，非常容易阅读，尽量多的使用他们。</p>
<h2 id="articleHeader10">propTypes</h2>
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
<p>这里我们把 propTypes 写在最前面，他会被组件立即可见，这要归功于JavaScript的 <code>函数提升</code></p>
<h2 id="articleHeader11">解构 Props 和 defaultProps</h2>
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
<p>我们的组件是一个函数，我们获取他的 props 就是在获取函数的参数值，我们可以直接用 <code>ES6</code> 的解构：</p>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
<p>我们也可以使用默认参数值去设置 <code>defaultProps</code>，就像上面的 <code>expanded = false</code></p>
<p>避免使用下面的 ES6 语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExpandableForm = ({ onExpand, expanded, children }) => {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> ExpandableForm = <span class="hljs-function">(<span class="hljs-params">{ onExpand, expanded, children }</span>) =&gt;</span> {</code></pre>
<p>看起来很先（逼）进（格），但这个函数是匿名的。</p>
<p>如果你的Babel设置正确，这个匿名函数不会成为一个问题 —— 但是如果不是的话，任何错误都会显示在 <code>&lt;&lt; anonymous &gt;&gt;</code> 中，这对于调试来说是非常糟糕的。</p>
<h2 id="articleHeader12">Wrapping</h2>
<p>函数式组件中不能使用 <code>decorators</code>，你只需把它作为参数传递给过去</p>
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
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
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
<p>这里是完整的组件：</p>
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
<h2 id="articleHeader13">JSX 中的条件判断</h2>
<p>你可能会有很复杂的条件判断语句，但是你要避免下面的写法：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012933404?w=1000&amp;h=321" src="https://static.alili.tech/img/remote/1460000012933404?w=1000&amp;h=321" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>嵌套的三元表达式不是一个好的方法，太难阅读了</p>
<p>有一些库可以解决这个问题(<a href="https://github.com/AlexGilleran/jsx-control-statements" rel="nofollow noreferrer" target="_blank">jsx-control-statements</a>)，但是我们没有引入其他的库，我们是这么解决的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012933405?w=825&amp;h=352" src="https://static.alili.tech/img/remote/1460000012933405?w=825&amp;h=352" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>我们使用了 <a href="https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript" rel="nofollow noreferrer" target="_blank">立即执行函数</a> 把条件语句写在里面，虽然这样可能会导致性能下降，但是在大多数情况下，它带来的负面影响还是小于糟糕的可读性。</p>
<p>当然如果组件分的足够细，你可能不会用到这么复杂的条件判断。</p>
<p>此外，如果你只在一个表达式里面去渲染组件，避免这么做：</p>
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
<p>你可以使用短路语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  isTrue &amp;&amp; 
    <p>True!</p>
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  isTrue &amp;&amp; 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>True!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}
</code></pre>
<h1 id="articleHeader14">总结</h1>
<p>这篇文章对你有帮助吗？请在评论区给出你的意见和建议，感谢阅读！</p>
<p>本文首发于我的 <a href="https://blog.catwen.cn" rel="nofollow noreferrer" target="_blank">个人博客</a>，另外推荐一个我前阵子写的一个脚手架 <a href="https://github.com/wenpengfei/parcel-typescript-react-boilerplate" rel="nofollow noreferrer" target="_blank">parcel-typescript-react-boilerplate</a>，请给出意见和建议，相互学习。无耻的求个星，谢谢~~！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我们编写 React 组件的最佳实践

## 原文链接
[https://segmentfault.com/a/1190000012933398](https://segmentfault.com/a/1190000012933398)

