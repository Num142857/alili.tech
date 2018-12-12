---
title: '聊一聊我对 React Context 的理解以及应用' 
date: 2018-12-13 2:30:07
hidden: true
slug: 0iof83b7r1bf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><code>Context</code>被翻译为上下文，在编程领域，这是一个经常会接触到的概念，React中也有。</p>
<p>在React的官方文档中，<a href="https://reactjs.org/docs/context.html" rel="nofollow noreferrer" target="_blank"><code>Context</code></a>被归类为高级部分(Advanced)，属于React的高级API，但官方并不建议在稳定版的App中使用Context。</p>
<blockquote>The vast majority of applications do not need to use content.<p>If you want your application to be stable, don't use context. It is an experimental API and it is likely to break in future releases of React.</p>
</blockquote>
<p>不过，这并非意味着我们不需要关注<code>Context</code>。事实上，很多优秀的React组件都通过Context来完成自己的功能，比如react-redux的<code>&lt;Provider /&gt;</code>，就是通过<code>Context</code>提供一个全局态的<code>store</code>，拖拽组件react-dnd，通过<code>Context</code>在组件中分发DOM的Drag和Drop事件，路由组件react-router通过<code>Context</code>管理路由状态等等。在React组件开发中，如果用好<code>Context</code>，可以让你的组件变得强大，而且灵活。</p>
<p>今天就想跟大家聊一聊，我在开发当中，所认识到的这个<code>Context</code>，以及我是如何使用它来进行组件开发的。</p>
<blockquote>注：本文中所有提到的App皆指Web端App。</blockquote>
<h2 id="articleHeader1">初识React Context</h2>
<h3 id="articleHeader2">官方对于Context的定义</h3>
<p>React文档官网并未对<code>Context</code>给出“是什么”的定义，更多是描述使用的<code>Context</code>的场景，以及如何使用<code>Context</code>。</p>
<p>官网对于使用<code>Context</code>的场景是这样描述的：</p>
<blockquote>In Some Cases, you want to pass data through the component tree without having to pass the props down manuallys at every level. you can do this directly in React with the powerful "context" API.</blockquote>
<p>简单说就是，当你不想在组件树中通过逐层传递<code>props</code>或者<code>state</code>的方式来传递数据时，可以使用<code>Context</code>来实现<strong>跨层级</strong>的组件数据传递。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365879?w=1930&amp;h=1000" src="https://static.alili.tech/img/remote/1460000013365879?w=1930&amp;h=1000" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用props或者state传递数据，数据自顶下流。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365880?w=1626&amp;h=1000" src="https://static.alili.tech/img/remote/1460000013365880?w=1626&amp;h=1000" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用<code>Context</code>，可以跨越组件进行数据传递。</p>
<h3 id="articleHeader3">如何使用Context</h3>
<p>如果要<code>Context</code>发挥作用，需要用到两种组件，一个是<code>Context</code>生产者(Provider)，通常是一个父节点，另外是一个<code>Context</code>的消费者(Consumer)，通常是一个或者多个子节点。所以<code>Context</code>的使用基于<strong>生产者消费者模式</strong>。</p>
<p>对于父组件，也就是<code>Context</code>生产者，需要通过一个静态属性<code>childContextTypes</code>声明提供给子组件的<code>Context</code>对象的属性，并实现一个实例<code>getChildContext</code>方法，返回一个代表<code>Context</code>的纯对象 (plain object) 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import PropTypes from 'prop-types'

class MiddleComponent extends React.Component {
  render () {
    return <ChildComponent />
  }
}

class ParentComponent extends React.Component {
  // 声明Context对象属性
  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
  }
  
  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      propA: 'propA',
      methodA: () => 'methodA'
    }
  }
  
  render () {
    return <MiddleComponent />
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MiddleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> /&gt;</span>
  }
}

class ParentComponent extends React.Component {
  // 声明Context对象属性
  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
  }
  
  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      propA: 'propA',
      methodA: () =&gt; 'methodA'
    }
  }
  
  render () {
    return <span class="hljs-tag">&lt;<span class="hljs-name">MiddleComponent</span> /&gt;</span>
  }
}</span></code></pre>
<p>而对于<code>Context</code>的消费者，通过如下方式访问父组件提供的<code>Context</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import PropTypes from 'prop-types'

class ChildComponent extends React.Component {
  // 声明需要使用的Context属性
  static contextTypes = {
    propA: PropTypes.string
  }
  
  render () {
    const {
      propA,
      methodA
    } = this.context
    
    console.log(`context.propA = ${propA}`)  // context.propA = propA
    console.log(`context.methodA = ${methodA}`)  // context.methodA = undefined
    
    return ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChildComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 声明需要使用的Context属性</span>
  <span class="hljs-keyword">static</span> contextTypes = {
    <span class="hljs-attr">propA</span>: PropTypes.string
  }
  
  render () {
    <span class="hljs-keyword">const</span> {
      propA,
      methodA
    } = <span class="hljs-keyword">this</span>.context
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`context.propA = <span class="hljs-subst">${propA}</span>`</span>)  <span class="hljs-comment">// context.propA = propA</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`context.methodA = <span class="hljs-subst">${methodA}</span>`</span>)  <span class="hljs-comment">// context.methodA = undefined</span>
    
    <span class="hljs-keyword">return</span> ...
  }
}</code></pre>
<p>子组件需要通过一个静态属性<code>contextTypes</code>声明后，才能访问父组件<code>Context</code>对象的属性，否则，即使属性名没写错，拿到的对象也是<code>undefined</code>。</p>
<p>对于无状态子组件(Stateless Component)，可以通过如下方式访问父组件的<code>Context</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import PropTypes from 'prop-types'

const ChildComponent = (props, context) => {
  const {
    propA
  } = context
    
  console.log(`context.propA = ${propA}`)  // context.propA = propA
    
  return ...
}
  
ChildComponent.contextProps = {
  propA: PropTypes.string    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>

<span class="hljs-keyword">const</span> ChildComponent = <span class="hljs-function">(<span class="hljs-params">props, context</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> {
    propA
  } = context
    
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`context.propA = <span class="hljs-subst">${propA}</span>`</span>)  <span class="hljs-comment">// context.propA = propA</span>
    
  <span class="hljs-keyword">return</span> ...
}
  
ChildComponent.contextProps = {
  <span class="hljs-attr">propA</span>: PropTypes.string    
}</code></pre>
<p>而在接下来的发行版本中，React对<code>Context</code>的API做了调整，更加明确了生产者消费者模式的使用方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">const</span> ThemeContext = React.createContext({
  <span class="hljs-attr">background</span>: <span class="hljs-string">'red'</span>,
  <span class="hljs-attr">color</span>: <span class="hljs-string">'white'</span>
});</code></pre>
<p>通过静态方法<code>React.createContext()</code>创建一个<code>Context</code>对象，这个<code>Context</code>对象包含两个组件，<code>&lt;Provider /&gt;</code>和<code>&lt;Consumer /&gt;</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  render () {
    return (
      <ThemeContext.Provider value="{{"background: 'green', color: 'white'"}}">
        <Header />
      </ThemeContext.Provider>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span> value="{{"background: <span class="hljs-symbol">'gree</span>n', color: <span class="hljs-symbol">'whit</span>e'"}}"&gt;
        &lt;<span class="hljs-type">Header</span> /&gt;
      &lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Provider</span>&gt;
    );
  }
}</code></pre>
<p><code>&lt;Provider /&gt;</code>的<code>value</code>相当于现在的<code>getChildContext()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Header extends React.Component {
  render () {
    return (
      <Title>Hello React Context API</Title>
    );
  }
}
 
class Title extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {context => (
          <h1 style="{{"background: context.background, color: context.color"}}">
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Title</span>&gt;<span class="hljs-type">Hello</span> <span class="hljs-type">React</span> <span class="hljs-type">Context</span> <span class="hljs-type">API</span>&lt;/<span class="hljs-type">Title</span>&gt;
    );
  }
}
 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;
        {context =&gt; (
          &lt;h1 style="{{"background: context.background, color: context.color"}}"&gt;
            {<span class="hljs-keyword">this</span>.props.children}
          &lt;/h1&gt;
        )}
      &lt;/<span class="hljs-type">ThemeContext</span>.<span class="hljs-type">Consumer</span>&gt;
    );
  }
}</code></pre>
<p><code>&lt;Consumer /&gt;</code>的<code>children</code>必须是一个函数，通过函数的参数获取<code>&lt;Provider /&gt;</code>提供的<code>Context</code>。</p>
<p>可见，<code>Context</code>的新API更加贴近React的风格。</p>
<h3 id="articleHeader4">几个可以直接获取Context的地方</h3>
<p>实际上，除了实例的<code>context</code>属性(<code>this.context</code>)，React组件还有很多个地方可以直接访问父组件提供的<code>Context</code>。比如构造方法：</p>
<ul><li><code>constructor(props, context)</code></li></ul>
<p>比如生命周期：</p>
<ul>
<li><code>componentWillReceiveProps(nextProps, nextContext)</code></li>
<li><code>shouldComponentUpdate(nextProps, nextState, nextContext)</code></li>
<li><code>componetWillUpdate(nextProps, nextState, nextContext)</code></li>
</ul>
<p>对于面向函数的无状态组件，可以通过函数的参数直接访问组件的<code>Context</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const StatelessComponent = (props, context) => (
  ......
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> StatelessComponent = <span class="hljs-function">(<span class="hljs-params">props, context</span>) =&gt;</span> (
  ......
)</code></pre>
<p>以上是<code>Context</code>的基础，更具体的指南内容可参见<a href="https://reactjs.org/docs/context.html" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h2 id="articleHeader5">我对Context的理解</h2>
<p>OK，说完基础的东西，现在聊一聊我对React的<code>Context</code>的理解。</p>
<h3 id="articleHeader6">把Context当做组件作用域</h3>
<p>使用React的开发者都知道，一个React App本质就是一棵React组件树，每个React组件相当于这棵树上的一个节点，除了App的根节点，其他每个节点都存在一条父组件链。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365881?w=1820&amp;h=952" src="https://static.alili.tech/img/remote/1460000013365881?w=1820&amp;h=952" alt="" title="" style="cursor: pointer;"></span></p>
<p>例如上图，<code>&lt;Child /&gt;</code>的父组件链是<code>&lt;SubNode /&gt;</code> -- <code>&lt;Node /&gt;</code> -- <code>&lt;App /&gt;</code>，<code>&lt;SubNode /&gt;</code>的父组件链是<code>&lt;Node /&gt;</code> -- <code>&lt;App /&gt;</code>，<code>&lt;Node /&gt;</code>的父组件链只有一个组件节点，就是<code>&lt;App /&gt;</code>。</p>
<p>这些以树状连接的组件节点，实际上也组成了一棵<code>Context</code>树，每个节点的<code>Context</code>，来自父组件链上所有组件节点通过<code>getChildContext()</code>所提供的<code>Context</code>对象组合而成的对象。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365882?w=2098&amp;h=952" src="https://static.alili.tech/img/remote/1460000013365882?w=2098&amp;h=952" alt="" title="" style="cursor: pointer;"></span></p>
<p>有了解JS作用域链概念的开发者应该都知道，JS的代码块在执行期间，会创建一个相应的作用域链，这个作用域链记录着运行时JS代码块执行期间所能访问的活动对象，包括变量和函数，JS程序通过作用域链访问到代码块内部或者外部的变量和函数。</p>
<p>假如以JS的作用域链作为类比，React组件提供的<code>Context</code>对象其实就好比一个提供给子组件访问的作用域，而<code>Context</code>对象的属性可以看成作用域上的活动对象。由于组件的<code>Context</code>由其父节点链上所有组件通过<code>getChildContext()</code>返回的<code>Context</code>对象组合而成，所以，组件通过<code>Context</code>是可以访问到其父组件链上所有节点组件提供的<code>Context</code>的属性。</p>
<p>所以，我借鉴了JS作用域链的思路，把<code>Context</code>当成是<strong>组件的作用域</strong>来使用。</p>
<h3 id="articleHeader7">关注Context的可控性和影响范围</h3>
<p>不过，作为组件作用域来看待的<code>Context</code>与常见的作用域的概念 (就我个人目前接触到的编程语言而言) 是有所区别的。我们需要关注<code>Context</code>的可控性和影响范围。</p>
<p>在我们平时的开发中，用到作用域或者上下文的场景是很常见，很自然，甚至是无感知的，然而，在React中使用<code>Context</code>并不是那么容易。父组件提供<code>Context</code>需要通过<code>childContextTypes</code>进行“声明”，子组件使用父组件的<code>Context</code>属性需要通过<code>contextTypes</code>进行“申请”，所以，我认为React的<code>Context</code>是一种<strong>“带权限”的组件作用域</strong>。</p>
<p>这种“带权限”的方式有何好处？就我个人的理解，首先是保持框架API的一致性，和<code>propTypes</code>一样，使用声明式编码风格。另外就是，<strong>可以在一定程度上确保组件所提供的<code>Context</code>的可控性和影响范围</strong>。</p>
<p>React App的组件是树状结构，一层一层延伸，父子组件是一对多的线性依赖。随意的使用<code>Context</code>其实会破坏这种依赖关系，导致组件之间一些不必要的额外依赖，降低组件的复用性，进而可能会影响到App的可维护性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365883?w=1996&amp;h=952" src="https://static.alili.tech/img/remote/1460000013365883?w=1996&amp;h=952" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过上图可以看到，原本线性依赖的组件树，由于子组件使用了父组件的<code>Context</code>，导致<code>&lt;Child /&gt;</code>组件对<code>&lt;Node /&gt;</code>和<code>&lt;App /&gt;</code>都产生了依赖关系。一旦脱离了这两个组件，<code>&lt;Child /&gt;</code>的可用性就无法保障了，减低了<code>&lt;Child /&gt;</code>的复用性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013365884?w=1762&amp;h=956" src="https://static.alili.tech/img/remote/1460000013365884?w=1762&amp;h=956" alt="" title="" style="cursor: pointer;"></span></p>
<p>在我看来，<strong>通过<code>Context</code>暴露数据或者API不是一种优雅的实践方案</strong>，尽管react-redux是这么干的。因此需要一种机制，或者说约束，去降低不必要的影响。</p>
<p>通过<code>childContextTypes</code>和<code>contextTypes</code>这两个静态属性的约束，可以在一定程度保障，只有组件自身，或者是与组件相关的其他子组件才可以随心所欲的访问<code>Context</code>的属性，无论是数据还是函数。因为只有组件自身或者相关的子组件可以清楚它能访问<code>Context</code>哪些属性，而相对于那些与组件无关的其他组件，无论是内部或者外部的 ，由于不清楚父组件链上各父组件的<code>childContextTypes</code>“声明”了哪些<code>Context</code>属性，所以没法通过<code>contextTypes</code>“申请”相关的属性。所以我理解为，给组件的作用域<code>Context</code>“带权限”，可以在一定程度上确保<code>Context</code>的可控性和影响范围。</p>
<p>在开发组件过程中，我们应该时刻关注这一点，不要随意的使用<code>Context</code>。</p>
<h3 id="articleHeader8">不需要优先使用Context</h3>
<p>作为React的高级API，React并<a href="https://reactjs.org/docs/context.html#why-not-to-use-context" rel="nofollow noreferrer" target="_blank">不推荐我们优先考虑使用<code>Context</code></a>。我的理解是：</p>
<ul>
<li>
<code>Context</code>目前还处于实验阶段，可能会在后面的发行版本中有大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来较大影响和麻烦，不建议在App中使用<code>Context</code>。</li>
<li>尽管不建议在App中使用<code>Context</code>，但对于组件而言，由于影响范围小于App，如果可以做到高内聚，不破坏组件树的依赖关系，那么还是可以考虑使用<code>Context</code>的。</li>
<li>对于组件之间的数据通信或者状态管理，优先考虑用<code>props</code>或者<code>state</code>解决，然后再考虑用其他第三方成熟库解决的，以上方法都不是最佳选择的时候，那么再考虑使用<code>Context</code>。</li>
<li>
<code>Context</code>的更新需要通过<code>setState()</code>触发，但是这并不是可靠的。<code>Context</code>支持跨组件访问，但是，如果中间的子组件通过一些方法不响应更新，比如<code>shouldComponentUpdate()</code>返回<code>false</code>，那么不能保证<code>Context</code>的更新一定可达使用<code>Context</code>的子组件。因此，<code>Context</code>的可靠性需要关注。不过更新的问题，在新版的API中得以解决。</li>
</ul>
<p>简而言之，只要你能确保<code>Context</code>是可控的，使用<code>Context</code>并无大碍，甚至如果能够合理的应用，<code>Context</code>其实可以给React组件开发带来很强大的体验。</p>
<h3 id="articleHeader9">用Context作为共享数据的媒介</h3>
<p>官方所提到<code>Context</code>可以用来进行跨组件的数据通信。而我，把它理解为，好比一座桥，作为一种作为媒介进行<strong>数据共享</strong>。数据共享可以分两类：<strong>App级</strong>与<strong>组件级</strong>。</p>
<ul><li><strong>App级的数据共享</strong></li></ul>
<p>App根节点组件提供的<code>Context</code>对象可以看成是App级的全局作用域，所以，我们利用App根节点组件提供的<code>Context</code>对象创建一些App级的全局数据。现成的例子可以参考react-redux，以下是<code>&lt;Provider /&gt;</code>组件源码的核心实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    // ......

    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createProvider</span>(<span class="hljs-params">storeKey = <span class="hljs-string">'store'</span>, subKey</span>) </span>{
    <span class="hljs-keyword">const</span> subscriptionKey = subKey || <span class="hljs-string">`<span class="hljs-subst">${storeKey}</span>Subscription`</span>

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Provider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        getChildContext() {
          <span class="hljs-keyword">return</span> { [storeKey]: <span class="hljs-keyword">this</span>[storeKey], [subscriptionKey]: <span class="hljs-literal">null</span> }
        }

        <span class="hljs-keyword">constructor</span>(props, context) {
          <span class="hljs-keyword">super</span>(props, context)
          <span class="hljs-keyword">this</span>[storeKey] = props.store;
        }

        render() {
          <span class="hljs-keyword">return</span> Children.only(<span class="hljs-keyword">this</span>.props.children)
        }
    }

    <span class="hljs-comment">// ......</span>

    Provider.propTypes = {
        <span class="hljs-attr">store</span>: storeShape.isRequired,
        <span class="hljs-attr">children</span>: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    <span class="hljs-keyword">return</span> Provider
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createProvider()</code></pre>
<p>App的根组件用<code>&lt;Provider /&gt;</code>组件包裹后，本质上就为App提供了一个全局的属性<code>store</code>，相当于在整个App范围内，共享<code>store</code>属性。当然，<code>&lt;Provider /&gt;</code>组件也可以包裹在其他组件中，在组件级的全局范围内共享<code>store</code>。</p>
<ul><li><strong>组件级的数据共享</strong></li></ul>
<p>如果组件的功能不能单靠组件自身来完成，还需要依赖额外的子组件，那么可以利用<code>Context</code>构建一个由多个子组件组合的组件。例如，react-router。</p>
<p>react-router的<code>&lt;Router /&gt;</code>自身并不能独立完成路由的操作和管理，因为导航链接和跳转的内容通常是分离的，因此还需要依赖<code>&lt;Link /&gt;</code>和<code>&lt;Route /&gt;</code>等子组件来一同完成路由的相关工作。为了让相关的子组件一同发挥作用，react-router的实现方案是利用<code>Context</code>在<code>&lt;Router /&gt;</code>、<code>&lt;Link /&gt;</code>以及<code>&lt;Route /&gt;</code>这些相关的组件之间共享一个<code>router</code>，进而完成路由的统一操作和管理。</p>
<p>下面截取<code>&lt;Router /&gt;</code>、<code>&lt;Link /&gt;</code>以及<code>&lt;Route /&gt;</code>这些相关的组件部分源码，以便更好的理解上述所说的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Router.js

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static contextTypes = {
    router: PropTypes.object
  };

  static childContextTypes = {
    router: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      }
    };
  }
  
  // ......
  
  componentWillMount() {
    const { children, history } = this.props;
    
    // ......
    
    this.unlisten = history.listen(() => {
      this.setState({
        match: this.computeMatch(history.location.pathname)
      });
    });
  }

  // ......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">// Router.js</span>

<span class="hljs-comment">/**
 * The public API for putting history on context.
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Router</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static propTypes = {
    history: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired,
    children: <span class="hljs-type">PropTypes</span>.node
  };

  static contextTypes = {
    router: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>
  };

  static childContextTypes = {
    router: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired
  };

  getChildContext() {
    <span class="hljs-keyword">return</span> {
      router: {
        ...<span class="hljs-keyword">this</span>.context.router,
        history: <span class="hljs-keyword">this</span>.props.history,
        route: {
          location: <span class="hljs-keyword">this</span>.props.history.location,
          <span class="hljs-keyword">match</span>: <span class="hljs-keyword">this</span>.state.<span class="hljs-keyword">match</span>
        }
      }
    };
  }
  
  <span class="hljs-comment">// ......</span>
  
  componentWillMount() {
    const { children, history } = <span class="hljs-keyword">this</span>.props;
    
    <span class="hljs-comment">// ......</span>
    
    <span class="hljs-keyword">this</span>.unlisten = history.listen(() =&gt; {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-keyword">match</span>: <span class="hljs-keyword">this</span>.computeMatch(history.location.pathname)
      });
    });
  }

  <span class="hljs-comment">// ......</span>
}</code></pre>
<p>尽管源码还有其他的逻辑，但<code>&lt;Router /&gt;</code>的核心就是为子组件提供一个带有<code>router</code>属性的<code>Context</code>，同时监听<code>history</code>，一旦<code>history</code>发生变化，便通过<code>setState()</code>触发组件重新渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Link.js

/**
 * The public API for rendering a history-aware <a>.
 */
class Link extends React.Component {
  
  // ......
  
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  handleClick = event => {
    if (this.props.onClick) this.props.onClick(event);

    if (
      !event.defaultPrevented &amp;&amp;
      event.button === 0 &amp;&amp;
      !this.props.target &amp;&amp;
      !isModifiedEvent(event)
    ) {
      event.preventDefault();
      // 使用<Router />组件提供的router实例
      const { history } = this.context.router;
      const { replace, to } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };
  
  render() {
    const { replace, to, innerRef, ...props } = this.props;

    // ...

    const { history } = this.context.router;
    const location =
      typeof to === &quot;string&quot;
        ? createLocation(to, null, null, history.location)
        : to;

    const href = history.createHref(location);
    return (
      <a {...props} onClick={this.handleClick} href={href} ref={innerRef} />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-comment">// Link.js</span>

<span class="hljs-comment">/**
 * The public API for rendering a history-aware &lt;a&gt;.
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Link</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  
  <span class="hljs-comment">// ......</span>
  
  <span class="hljs-keyword">static</span> contextTypes = {
    <span class="hljs-attr">router</span>: PropTypes.shape({
      <span class="hljs-attr">history</span>: PropTypes.shape({
        <span class="hljs-attr">push</span>: PropTypes.func.isRequired,
        <span class="hljs-attr">replace</span>: PropTypes.func.isRequired,
        <span class="hljs-attr">createHref</span>: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  handleClick = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.onClick) <span class="hljs-keyword">this</span>.props.onClick(event);

    <span class="hljs-keyword">if</span> (
      !event.defaultPrevented &amp;&amp;
      event.button === <span class="hljs-number">0</span> &amp;&amp;
      !<span class="hljs-keyword">this</span>.props.target &amp;&amp;
      !isModifiedEvent(event)
    ) {
      event.preventDefault();
      <span class="hljs-comment">// 使用&lt;Router /&gt;组件提供的router实例</span>
      <span class="hljs-keyword">const</span> { history } = <span class="hljs-keyword">this</span>.context.router;
      <span class="hljs-keyword">const</span> { replace, to } = <span class="hljs-keyword">this</span>.props;

      <span class="hljs-keyword">if</span> (replace) {
        history.replace(to);
      } <span class="hljs-keyword">else</span> {
        history.push(to);
      }
    }
  };
  
  render() {
    <span class="hljs-keyword">const</span> { replace, to, innerRef, ...props } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-comment">// ...</span>

    <span class="hljs-keyword">const</span> { history } = <span class="hljs-keyword">this</span>.context.router;
    <span class="hljs-keyword">const</span> location =
      <span class="hljs-keyword">typeof</span> to === <span class="hljs-string">"string"</span>
        ? createLocation(to, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, history.location)
        : to;

    <span class="hljs-keyword">const</span> href = history.createHref(location);
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{href}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{innerRef}</span> /&gt;</span>
    );
  }
}</span></code></pre>
<p><code>&lt;Link /&gt;</code>的核心就是渲染<code>&lt;a&gt;</code>标签，拦截<code>&lt;a&gt;</code>标签的点击事件，然后通过<code>&lt;Router /&gt;</code>共享的<code>router</code>对<code>history</code>进行路由操作，进而通知<code>&lt;Router /&gt;</code>重新渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Route.js

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  
  // ......
  
  state = {
    match: this.computeMatch(this.props, this.context.router)
  };

  // 计算匹配的路径，匹配的话，会返回一个匹配对象，否则返回null
  computeMatch(
    { computedMatch, location, path, strict, exact, sensitive },
    router
  ) {
    if (computedMatch) return computedMatch;
    
    // ......

    const { route } = router;
    const pathname = (location || route.location).pathname;
    
    return matchPath(pathname, { path, strict, exact, sensitive }, route.match);
  }
 
  // ......

  render() {
    const { match } = this.state;
    const { children, component, render } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { match, location, history, staticContext };

    if (component) return match ? React.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === &quot;function&quot;) return children(props);

    if (children &amp;&amp; !isEmptyChildren(children))
      return React.Children.only(children);

    return null;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">// Route.js</span>

<span class="hljs-comment">/**
 * The public API for matching a single path and rendering.
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Route</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  
  <span class="hljs-comment">// ......</span>
  
  state = {
    <span class="hljs-keyword">match</span>: <span class="hljs-keyword">this</span>.computeMatch(<span class="hljs-keyword">this</span>.props, <span class="hljs-keyword">this</span>.context.router)
  };

  <span class="hljs-comment">// 计算匹配的路径，匹配的话，会返回一个匹配对象，否则返回null</span>
  computeMatch(
    { computedMatch, location, path, strict, exact, sensitive },
    router
  ) {
    <span class="hljs-keyword">if</span> (computedMatch) <span class="hljs-keyword">return</span> computedMatch;
    
    <span class="hljs-comment">// ......</span>

    const { route } = router;
    const pathname = (location || route.location).pathname;
    
    <span class="hljs-keyword">return</span> matchPath(pathname, { path, strict, exact, sensitive }, route.<span class="hljs-keyword">match</span>);
  }
 
  <span class="hljs-comment">// ......</span>

  render() {
    const { <span class="hljs-keyword">match</span> } = <span class="hljs-keyword">this</span>.state;
    const { children, component, render } = <span class="hljs-keyword">this</span>.props;
    const { history, route, staticContext } = <span class="hljs-keyword">this</span>.context.router;
    const location = <span class="hljs-keyword">this</span>.props.location || route.location;
    const props = { <span class="hljs-keyword">match</span>, location, history, staticContext };

    <span class="hljs-keyword">if</span> (component) <span class="hljs-keyword">return</span> <span class="hljs-keyword">match</span> ? <span class="hljs-type">React</span>.createElement(component, props) : <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (render) <span class="hljs-keyword">return</span> <span class="hljs-keyword">match</span> ? render(props) : <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (typeof children === <span class="hljs-string">"function"</span>) <span class="hljs-keyword">return</span> children(props);

    <span class="hljs-keyword">if</span> (children &amp;&amp; !isEmptyChildren(children))
      <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(children);

    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}</code></pre>
<p><code>&lt;Route /&gt;</code>有一部分源码与<code>&lt;Router /&gt;</code>相似，可以实现路由的嵌套，但其核心是通过<code>Context</code>共享的<code>router</code>，判断是否匹配当前路由的路径，然后渲染组件。</p>
<p>通过上述的分析，可以看出，整个react-router其实就是围绕着<code>&lt;Router /&gt;</code>的<code>Context</code>来构建的。</p>
<h2 id="articleHeader10">使用Context开发组件</h2>
<p>之前，通过<code>Context</code>开发过一个简单的组件，插槽分发组件。本章就借着这个插槽分发组件的开发经历，聊聊如何使用<code>Context</code>进行组件的开发。</p>
<h3 id="articleHeader11">插槽分发组件</h3>
<p>首先说说什么是插槽分发组件，这个概念最初是在Vuejs中认识的。插槽分发是一种通过组件的组合，将父组件的内容插入到子组件模板的技术，在Vuejs中叫做<code>Slot</code>。</p>
<p>为了让大家更加直观的理解这个概念，我从Vuejs搬运了一段关于插槽分发的Demo。</p>
<p>对于提供的插槽的组件<code>&lt;my-component /&gt;</code>，模板如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时显示
  </slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
    只有在没有要分发的内容时显示
  <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>对于父组件，模板如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>最终渲染的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>可以看到组件<code>&lt;my-component /&gt; </code> 的<code>&lt;slot /&gt;</code>节点最终被父组件中<code>&lt;my-component /&gt;</code>节点下的内容所替换。</p>
<p>Vuejs还支持<strong>具名插槽</strong>。</p>
<p>例如，一个布局组件<code>&lt;app-layout /&gt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <slot name=&quot;header&quot;></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name=&quot;footer&quot;></slot>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>而在父组件模板中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-layout>
  <h1 slot=&quot;header&quot;>这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个段落。</p>
  <p slot=&quot;footer&quot;>这里有一些联系信息</p>
</app-layout>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">app-layout</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app-layout</span>&gt;</span></code></pre>
<p>最终渲染的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>插槽分发的好处体现在，它可以让组件具有可抽象成模板的能力。组件自身只关心模板结构，具体的内容交给父组件去处理，同时，不打破HTML描述DOM结构的语法表达方式。我觉得这是一项很有意义的技术，可惜，React对于这项技术的支持不是那么友好。于是我便参考Vuejs的插槽分发组件，开发了一套基于React的插槽分发组件，可以让React组件也具模板化的能力。</p>
<p>对于<code>&lt;AppLayout /&gt;</code>组件，我希望可以写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AppLayout extends React.Component {
  static displayName = 'AppLayout'
  
  render () {
    return (
      <div class=&quot;container&quot;>
        <header>
          <Slot name=&quot;header&quot;></Slot>
        </header>
        <main>
          <Slot></Slot>
        </main>
        <footer>
          <Slot name=&quot;footer&quot;></Slot>
        </footer>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppLayout</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">'AppLayout'</span>
  
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>在外层使用时，可以写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<AppLayout>
  <AddOn slot=&quot;header&quot;>
    <h1>这里可能是一个页面标题</h1>
  </AddOn>
  <AddOn>
    <p>主要内容的一个段落。</p>
      <p>另一个段落。</p>
  </AddOn>
  <AddOn slot=&quot;footer&quot;>
    <p>这里有一些联系信息</p>
  </AddOn>
</AppLayout>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">AppLayout</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">AppLayout</span>&gt;</span></code></pre>
<h3 id="articleHeader12">组件的实现思路</h3>
<p>根据前面所想的，先整理一下实现思路。</p>
<p>不难看出，插槽分发组件需要依靠两个子组件——插槽组件<code>&lt;Slot /&gt;</code>和分发组件<code>&lt;AddOn /&gt;</code>。插槽组件，负责打桩，提供分发内容的坑位。分发组件，负责收集分发内容，并提供给插槽组件去渲染分发内容，相当于插槽的消费者。</p>
<p>显然，这里遇到了一个问题，<code>&lt;Slot /&gt;</code>组件与<code>&lt;AddOn /&gt;</code>组件是独立的，如何将<code>&lt;AddOn /&gt;</code>的内容填充到<code>&lt;Slot /&gt;</code>中呢？解决这个问题不难，两个独立的模块需要建立联系，就给他们建立一个桥梁。那么这个桥梁要如何搭建呢？回过头来看看之前的设想的代码。</p>
<p>对于<code>&lt;AppLayout /&gt;</code>组件，希望写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AppLayout extends React.Component {
  static displayName = 'AppLayout'
  
  render () {
    return (
      <div class=&quot;container&quot;>
        <header>
          <Slot name=&quot;header&quot;></Slot>
        </header>
        <main>
          <Slot></Slot>
        </main>
        <footer>
          <Slot name=&quot;footer&quot;></Slot>
        </footer>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppLayout</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">'AppLayout'</span>
  
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>在外层使用时，写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<AppLayout>
  <AddOn slot=&quot;header&quot;>
    <h1>这里可能是一个页面标题</h1>
  </AddOn>
  <AddOn>
    <p>主要内容的一个段落。</p>
      <p>另一个段落。</p>
  </AddOn>
  <AddOn slot=&quot;footer&quot;>
    <p>这里有一些联系信息</p>
  </AddOn>
</AppLayout>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">AppLayout</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">AddOn</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AddOn</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">AppLayout</span>&gt;</span></code></pre>
<p>无论是<code>&lt;Slot /&gt;</code>还是<code>&lt;AddOn /&gt;</code>，其实都在<code>&lt;AppLayout /&gt;</code>的作用域内。<code>&lt;Slot /&gt;</code>是<code>&lt;AppLayout /&gt;</code>组件<code>render()</code>方法返回的组件节点，而<code>&lt;AddOn /&gt;</code>则是<code>&lt;AppLayout /&gt;</code>的<code>children</code>节点，所以，可以将<code>&lt;AppLayout /&gt;</code>视为<code>&lt;Slot /&gt;</code>与<code>&lt;AddOn /&gt;</code>的桥梁的角色。那么，<code>&lt;AppLayout /&gt;</code>通过什么给<code>&lt;Slot /&gt;</code>和<code>&lt;AddOn /&gt;</code>建立联系呢？这里就用到本文的主角——<code>Context</code>。接下来的问题就是，如何使用<code>Context</code>给<code>&lt;Slot /&gt;</code>和<code>&lt;AddOn /&gt;</code>建立联系？</p>
<p>前面提到了<code>&lt;AppLayout /&gt;</code>这座桥梁。在外层组件，<code>&lt;AppLayout /&gt;</code>负责通过<code>&lt;AddOn /&gt;</code>收集为插槽填充的内容。<code>&lt;AppLayout /&gt;</code>自身借助<code>Context</code>定义一个获取填充内容的接口。在渲染的时候，因为<code>&lt;Slot /&gt;</code>是<code>&lt;AppLayout /&gt;</code>渲染的节点，所以，<code>&lt;Slot /&gt;</code>可以通过<code>Context</code>获取到<code>&lt;AppLayout /&gt;</code>定义的获取填充内容的接口，然后通过这个接口，获取到填充内容进行渲染。</p>
<h3 id="articleHeader13">按照思路实现插槽分发组件</h3>
<p>由于<code>&lt;AddOn /&gt;</code>是<code>&lt;AppLayout /&gt;</code>的<code>children</code>节点，并且<code>&lt;AddOn /&gt;</code>是特定的组件，我们可以通过<code>name</code>或者<code>displayName</code>识别出来，所以，<code>&lt;AppLayout /&gt;</code>在渲染之前，也就是<code>render()</code>的<code>return</code>之前，对<code>children</code>进行遍历，以<code>slot</code>的值作为<code>key</code>，将每一个<code>&lt;AddOn /&gt;</code>的<code>children</code>缓存下来。如果<code>&lt;AddOn /&gt;</code>没有设置<code>slot</code>，那么将其视为给非具名的<code>&lt;Slot /&gt;</code>填充内容，我们可以给这些非具名的插槽定一个<code>key</code>，比如叫<code>$$default</code>。</p>
<p>对于<code>&lt;AppLayout /&gt;</code>，代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AppLayout extends React.Component {
  
  static childContextTypes = {
    requestAddOnRenderer: PropTypes.func
  }
  
  // 用于缓存每个<AddOn />的内容
  addOnRenderers = {}
  
  // 通过Context为子节点提供接口
  getChildContext () {
    const requestAddOnRenderer = (name) => {
      if (!this.addOnRenderers[name]) {
        return undefined
      }
      return () => (
        this.addOnRenderers[name]
      )
    }
    return {
      requestAddOnRenderer
    }
  }

  render () {
    const {
      children,
      ...restProps
    } = this.props

    if (children) {
      // 以k-v的方式缓存<AddOn />的内容
      const arr = React.Children.toArray(children)
      const nameChecked = []
      this.addOnRenderers = {}
      arr.forEach(item => {
        const itemType = item.type
        if (item.type.displayName === 'AddOn') {
          const slotName = item.props.slot || '$$default'
          // 确保内容唯一性
          if (nameChecked.findIndex(item => item === stubName) !== -1) {
            throw new Error(`Slot(${slotName}) has been occupied`)
          }
          this.addOnRenderers[stubName] = item.props.children
          nameChecked.push(stubName)
        }
      })
    }

    return (
      <div class=&quot;container&quot;>
        <header>
          <Slot name=&quot;header&quot;></Slot>
        </header>
        <main>
          <Slot></Slot>
        </main>
        <footer>
          <Slot name=&quot;footer&quot;></Slot>
        </footer>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppLayout</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  
  <span class="hljs-keyword">static</span> childContextTypes = {
    <span class="hljs-attr">requestAddOnRenderer</span>: PropTypes.func
  }
  
  <span class="hljs-comment">// 用于缓存每个&lt;AddOn /&gt;的内容</span>
  addOnRenderers = {}
  
  <span class="hljs-comment">// 通过Context为子节点提供接口</span>
  getChildContext () {
    <span class="hljs-keyword">const</span> requestAddOnRenderer = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.addOnRenderers[name]) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>
      }
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
        <span class="hljs-keyword">this</span>.addOnRenderers[name]
      )
    }
    <span class="hljs-keyword">return</span> {
      requestAddOnRenderer
    }
  }

  render () {
    <span class="hljs-keyword">const</span> {
      children,
      ...restProps
    } = <span class="hljs-keyword">this</span>.props

    <span class="hljs-keyword">if</span> (children) {
      <span class="hljs-comment">// 以k-v的方式缓存&lt;AddOn /&gt;的内容</span>
      <span class="hljs-keyword">const</span> arr = React.Children.toArray(children)
      <span class="hljs-keyword">const</span> nameChecked = []
      <span class="hljs-keyword">this</span>.addOnRenderers = {}
      arr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> itemType = item.type
        <span class="hljs-keyword">if</span> (item.type.displayName === <span class="hljs-string">'AddOn'</span>) {
          <span class="hljs-keyword">const</span> slotName = item.props.slot || <span class="hljs-string">'$$default'</span>
          <span class="hljs-comment">// 确保内容唯一性</span>
          <span class="hljs-keyword">if</span> (nameChecked.findIndex(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === stubName) !== <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Slot(<span class="hljs-subst">${slotName}</span>) has been occupied`</span>)
          }
          <span class="hljs-keyword">this</span>.addOnRenderers[stubName] = item.props.children
          nameChecked.push(stubName)
        }
      })
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p><code>&lt;AppLayout /&gt;</code>定义了一个<code>Context</code>接口<code>requestAddOnRenderer()</code>，<code>requestAddOnRenderer()</code>接口根据<code>name</code>返回一个函数，这个返回的函数会根据<code>name</code>访问<code>addOnRenderers</code>的属性，<code>addOnRenderers</code>就是<code>&lt;AddOn /&gt;</code>的内容缓存对象。</p>
<p><code>&lt;Slot /&gt;</code>的实现很简单，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//            props,              context
const Slot = ({ name, children }, { requestAddOnRenderer }) => {
  const addOnRenderer = requestAddOnRenderer(name)
  return (addOnRenderer &amp;&amp; addOnRenderer()) ||
    children ||
    null
}

Slot.displayName = 'Slot'
Slot.contextTypes = { requestAddOnRenderer: PropTypes.func }
Slot.propTypes = { name: PropTypes.string }
Slot.defaultProps = { name: '$$default' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-comment">//            props,              context</span>
<span class="hljs-keyword">const</span> Slot = <span class="hljs-function">(<span class="hljs-params">{ name, children }, { requestAddOnRenderer }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> addOnRenderer = requestAddOnRenderer(name)
  <span class="hljs-keyword">return</span> (addOnRenderer &amp;&amp; addOnRenderer()) ||
    children ||
    <span class="hljs-literal">null</span>
}

Slot.displayName = <span class="hljs-string">'Slot'</span>
Slot.contextTypes = { <span class="hljs-attr">requestAddOnRenderer</span>: PropTypes.func }
Slot.propTypes = { <span class="hljs-attr">name</span>: PropTypes.string }
Slot.defaultProps = { <span class="hljs-attr">name</span>: <span class="hljs-string">'$$default'</span> }</code></pre>
<p>可以看到<code>&lt;Slot /&gt;</code>通过<code>context</code>获取到<code>&lt;AppLayout /&gt;</code>提供的接口<code>requestAddOnRenderer()</code>，最终渲染的主要对象就是缓存在<code>&lt;AppLayout /&gt;</code>中的<code>&lt;AddOn /&gt;</code>的内容。如果没有获取到指定的<code>&lt;AddOn /&gt;</code>的内容，则渲染<code>&lt;Slot /&gt;</code>自身的<code>children</code>。</p>
<p><code>&lt;AddOn /&gt;</code>更简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AddOn = () => null

AddOn.propTypes = { slot: PropTypes.string }
AddOn.defaultTypes = { slot: '$$default' }
AddOn.displayName = 'AddOn'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx">const AddOn = () =&gt; null

AddOn<span class="hljs-selector-class">.propTypes</span> = { slot: PropTypes<span class="hljs-selector-class">.string</span> }
AddOn<span class="hljs-selector-class">.defaultTypes</span> = { slot: <span class="hljs-string">'$$default'</span> }
AddOn<span class="hljs-selector-class">.displayName</span> = <span class="hljs-string">'AddOn'</span></code></pre>
<p><code>&lt;AddOn /&gt;</code>不做任何事情，仅仅返回<code>null</code>，它的作用就是让<code>&lt;AppLayout /&gt;</code>缓存分发给插槽的内容。</p>
<h3 id="articleHeader14">可以让<code>&lt;AppLayout /&gt;</code>更具通用性</h3>
<p>通过上文的代码，基本将<code>&lt;AppLayout /&gt;</code>改造成了一个具备插槽分发能力的组件，但是很明显的，<code>&lt;AppLayout /&gt;</code>并不具备通用性，我们可以将它提升成一个独立通用的组件。</p>
<p>我给这个组件命名为SlotProvider</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDisplayName (component) {
  return component.displayName || component.name || 'component'
}

const slotProviderHoC = (WrappedComponent) => {
  return class extends React.Component {
    static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`

    static childContextTypes = {
      requestAddOnRenderer: PropTypes.func
    }
  
    // 用于缓存每个<AddOn />的内容
    addOnRenderers = {}
  
    // 通过Context为子节点提供接口
    getChildContext () {
      const requestAddOnRenderer = (name) => {
        if (!this.addOnRenderers[name]) {
          return undefined
        }
        return () => (
          this.addOnRenderers[name]
        )
      }
      return {
        requestAddOnRenderer
      }
    }

    render () {
      const {
        children,
        ...restProps
      } = this.props

      if (children) {
        // 以k-v的方式缓存<AddOn />的内容
        const arr = React.Children.toArray(children)
        const nameChecked = []
        this.addOnRenderers = {}
        arr.forEach(item => {
          const itemType = item.type
          if (item.type.displayName === 'AddOn') {
            const slotName = item.props.slot || '$$default'
            // 确保内容唯一性
            if (nameChecked.findIndex(item => item === stubName) !== -1) {
              throw new Error(`Slot(${slotName}) has been occupied`)
            }
            this.addOnRenderers[stubName] = item.props.children
            nameChecked.push(stubName)
          }
        })
      }
      
      return (<WrappedComponent {...restProps} />)
    }
  }
}

export const SlotProvider = slotProviderHoC" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDisplayName</span> (<span class="hljs-params">component</span>) </span>{
  <span class="hljs-keyword">return</span> component.displayName || component.name || <span class="hljs-string">'component'</span>
}

<span class="hljs-keyword">const</span> slotProviderHoC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`SlotProvider(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>

    <span class="hljs-keyword">static</span> childContextTypes = {
      <span class="hljs-attr">requestAddOnRenderer</span>: PropTypes.func
    }
  
    <span class="hljs-comment">// 用于缓存每个&lt;AddOn /&gt;的内容</span>
    addOnRenderers = {}
  
    <span class="hljs-comment">// 通过Context为子节点提供接口</span>
    getChildContext () {
      <span class="hljs-keyword">const</span> requestAddOnRenderer = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.addOnRenderers[name]) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
          <span class="hljs-keyword">this</span>.addOnRenderers[name]
        )
      }
      <span class="hljs-keyword">return</span> {
        requestAddOnRenderer
      }
    }

    render () {
      <span class="hljs-keyword">const</span> {
        children,
        ...restProps
      } = <span class="hljs-keyword">this</span>.props

      <span class="hljs-keyword">if</span> (children) {
        <span class="hljs-comment">// 以k-v的方式缓存&lt;AddOn /&gt;的内容</span>
        <span class="hljs-keyword">const</span> arr = React.Children.toArray(children)
        <span class="hljs-keyword">const</span> nameChecked = []
        <span class="hljs-keyword">this</span>.addOnRenderers = {}
        arr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          <span class="hljs-keyword">const</span> itemType = item.type
          <span class="hljs-keyword">if</span> (item.type.displayName === <span class="hljs-string">'AddOn'</span>) {
            <span class="hljs-keyword">const</span> slotName = item.props.slot || <span class="hljs-string">'$$default'</span>
            <span class="hljs-comment">// 确保内容唯一性</span>
            <span class="hljs-keyword">if</span> (nameChecked.findIndex(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === stubName) !== <span class="hljs-number">-1</span>) {
              <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Slot(<span class="hljs-subst">${slotName}</span>) has been occupied`</span>)
            }
            <span class="hljs-keyword">this</span>.addOnRenderers[stubName] = item.props.children
            nameChecked.push(stubName)
          }
        })
      }
      
      <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...restProps</span>} /&gt;</span>)
    }
  }
}

export const SlotProvider = slotProviderHoC</span></code></pre>
<p>使用React的高阶组件对原来的<code>&lt;AppLayout /&gt;</code>进行改造，将其转变为一个独立通用的组件。对于原来的<code>&lt;AppLayout /&gt;</code>，可以使用这个<code>SlotProvider</code>高阶组件，转换成一个具备插槽分发能力的组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { SlotProvider } from './SlotProvider.js'

class AppLayout extends React.Component {
  static displayName = 'AppLayout'
  
  render () {
    return (
      <div class=&quot;container&quot;>
        <header>
          <Slot name=&quot;header&quot;></Slot>
        </header>
        <main>
          <Slot></Slot>
        </main>
        <footer>
          <Slot name=&quot;footer&quot;></Slot>
        </footer>
      </div>
    )
  }
}

export default SlotProvider(AppLayout)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> { SlotProvider } <span class="hljs-keyword">from</span> <span class="hljs-string">'./SlotProvider.js'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppLayout</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">'AppLayout'</span>
  
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> SlotProvider(AppLayout)</code></pre>
<p>通过以上的经历，可以看到，当设计开发一个组件时，</p>
<ul>
<li>
<strong>组件可能需要由一个根组件和多个子组件一起合作来完成组件功能</strong>。比如插槽分发组件实际上需要<code>SlotProvider</code>与<code>&lt;Slot /&gt;</code>和<code>&lt;AddOn /&gt;</code>一起配合使用，<code>SlotProvider</code>作为根组件，而<code>&lt;Slot /&gt;</code>和<code>&lt;AddOn /&gt;</code>都算是子组件。</li>
<li>
<strong>子组件相对于根组件的位置或者子组件之间的位置是不确定</strong>。对于<code>SlotProvider</code>而言，<code>&lt;Slot /&gt;</code>的位置是不确定的，它会处在被<code>SlotProvider</code>这个高阶组件所包裹的组件的模板的任何位置，而对于<code>&lt;Slot /&gt;</code>和<code>&lt;AddOn /&gt;</code>，他们直接的位置也不确定，一个在<code>SlotProvider</code>包装的组件的内部，另一个是<code>SlotProvider</code>的<code>children</code>。</li>
<li>
<strong>子组件之间需要依赖一些全局态的API或者数据</strong>，比如<code>&lt;Slot /&gt;</code>实际渲染的内容来自于<code>SlotProvider</code>收集到的<code>&lt;AddOn /&gt;</code>的内容。</li>
</ul>
<p>这时我们就需要借助一个中间者作为媒介来共享数据，相比额外引入redux这些第三方模块，直接使用<code>Context</code>可以更优雅。</p>
<h3 id="articleHeader15">尝试一下新版本的Context API</h3>
<p>使用新版的Context API对之前的插槽分发组件进行改造。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// SlotProvider.js

function getDisplayName (component) {
  return component.displayName || component.name || 'component'
}

export const SlotContext = React.createContext({
  requestAddOnRenderer: () => {}
})

const slotProviderHoC = (WrappedComponent) => {
  return class extends React.Component {
    static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`

    // 用于缓存每个<AddOn />的内容
    addOnRenderers = {}
  
    requestAddOnRenderer = (name) => {
      if (!this.addOnRenderers[name]) {
        return undefined
      }
      return () => (
        this.addOnRenderers[name]
      )
    }

    render () {
      const {
        children,
        ...restProps
      } = this.props

      if (children) {
        // 以k-v的方式缓存<AddOn />的内容
        const arr = React.Children.toArray(children)
        const nameChecked = []
        this.addOnRenderers = {}
        arr.forEach(item => {
          const itemType = item.type
          if (item.type.displayName === 'AddOn') {
            const slotName = item.props.slot || '$$default'
            // 确保内容唯一性
            if (nameChecked.findIndex(item => item === stubName) !== -1) {
              throw new Error(`Slot(${slotName}) has been occupied`)
            }
            this.addOnRenderers[stubName] = item.props.children
            nameChecked.push(stubName)
          }
        })
      }
      
      return (
        <SlotContext.Provider value={
            requestAddOnRenderer: this.requestAddOnRenderer
          }>
          <WrappedComponent {...restProps} />
        </SlotContext.Provider>
      )
    }
  }
}

export const SlotProvider = slotProviderHoC" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-comment">// SlotProvider.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDisplayName</span> (<span class="hljs-params">component</span>) </span>{
  <span class="hljs-keyword">return</span> component.displayName || component.name || <span class="hljs-string">'component'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SlotContext = React.createContext({
  <span class="hljs-attr">requestAddOnRenderer</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
})

<span class="hljs-keyword">const</span> slotProviderHoC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`SlotProvider(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>

    <span class="hljs-comment">// 用于缓存每个&lt;AddOn /&gt;的内容</span>
    addOnRenderers = {}
  
    requestAddOnRenderer = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.addOnRenderers[name]) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>
      }
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
        <span class="hljs-keyword">this</span>.addOnRenderers[name]
      )
    }

    render () {
      <span class="hljs-keyword">const</span> {
        children,
        ...restProps
      } = <span class="hljs-keyword">this</span>.props

      <span class="hljs-keyword">if</span> (children) {
        <span class="hljs-comment">// 以k-v的方式缓存&lt;AddOn /&gt;的内容</span>
        <span class="hljs-keyword">const</span> arr = React.Children.toArray(children)
        <span class="hljs-keyword">const</span> nameChecked = []
        <span class="hljs-keyword">this</span>.addOnRenderers = {}
        arr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          <span class="hljs-keyword">const</span> itemType = item.type
          <span class="hljs-keyword">if</span> (item.type.displayName === <span class="hljs-string">'AddOn'</span>) {
            <span class="hljs-keyword">const</span> slotName = item.props.slot || <span class="hljs-string">'$$default'</span>
            <span class="hljs-comment">// 确保内容唯一性</span>
            <span class="hljs-keyword">if</span> (nameChecked.findIndex(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === stubName) !== <span class="hljs-number">-1</span>) {
              <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Slot(<span class="hljs-subst">${slotName}</span>) has been occupied`</span>)
            }
            <span class="hljs-keyword">this</span>.addOnRenderers[stubName] = item.props.children
            nameChecked.push(stubName)
          }
        })
      }
      
      <span class="hljs-keyword">return</span> (
        &lt;SlotContext.Provider value={
            requestAddOnRenderer: this.requestAddOnRenderer
          }&gt;
          &lt;WrappedComponent {...restProps} /&gt;
        &lt;/SlotContext.Provider&gt;
      )
    }
  }
}

export const SlotProvider = slotProviderHoC</code></pre>
<p>移除了之前的<code>childContextTypes</code>和<code>getChildContext()</code>，除了局部的调整，整体核心的东西没有大变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Slot.js

import { SlotContext } from './SlotProvider.js'

const Slot = ({ name, children }) => {
  return (
    <SlotContext.Consumer>
      {(context) => {
        const addOnRenderer = requestAddOnRenderer(name)
          return (addOnRenderer &amp;&amp; addOnRenderer()) ||
            children ||
            null
      "}}"
    </SlotContext.Consumer>
  )
}

Slot.displayName = 'Slot'
Slot.propTypes = { name: PropTypes.string }
Slot.defaultProps = { name: '$$default' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code class="jsx"><span class="hljs-comment">// Slot.js</span>

<span class="hljs-keyword">import</span> { SlotContext } from <span class="hljs-string">'./SlotProvider.js'</span>

<span class="hljs-keyword">const</span> Slot = ({ name, children }) =&gt; {
  <span class="hljs-keyword">return</span> (
    &lt;SlotContext.Consumer&gt;
      {(context) =&gt; {
        <span class="hljs-keyword">const</span> addOnRenderer = requestAddOnRenderer(name)
          <span class="hljs-keyword">return</span> (addOnRenderer &amp;&amp; addOnRenderer()) ||
            children ||
            <span class="hljs-keyword">null</span>
      "}}"
    &lt;/SlotContext.Consumer&gt;
  )
}

Slot.displayName = <span class="hljs-string">'Slot'</span>
Slot.propTypes = { name: PropTypes.string }
Slot.defaultProps = { name: <span class="hljs-string">'$$default'</span> }</code></pre>
<p>由于之前就按照生产者消费者的模式来使用<code>Context</code>，加上组件自身也比较简单，因此使用新的API进行改造后，差别不大。</p>
<h2 id="articleHeader16">总结</h2>
<ul>
<li>相比<code>props</code>和<code>state</code>，React的<code>Context</code>可以实现跨层级的组件通信。</li>
<li>Context API的使用基于生产者消费者模式。生产者一方，通过组件静态属性<code>childContextTypes</code>声明，然后通过实例方法<code>getChildContext()</code>创建<code>Context</code>对象。消费者一方，通过组件静态属性<code>contextTypes</code>申请要用到的<code>Context</code>属性，然后通过实例的<code>context</code>访问<code>Context</code>的属性。</li>
<li>使用<code>Context</code>需要多一些思考，不建议在App中使用<code>Context</code>，但如果开发组件过程中可以确保组件的内聚性，可控可维护，不破坏组件树的依赖关系，影响范围小，可以考虑使用<code>Context</code>解决一些问题。</li>
<li>通过<code>Context</code>暴露API或许在一定程度上给解决一些问题带来便利，但个人认为不是一个很好的实践，需要慎重。</li>
<li>旧版本的<code>Context</code>的更新需要依赖<code>setState()</code>，是不可靠的，不过这个问题在新版的API中得以解决。</li>
<li>可以把<code>Context</code>当做组件的作用域来看待，但是需要关注<code>Context</code>的可控性和影响范围，使用之前，先分析是否真的有必要使用，避免过度使用所带来的一些副作用。</li>
<li>可以把<code>Context</code>当做媒介，进行App级或者组件级的数据共享。</li>
<li>设计开发一个组件，如果这个组件需要多个组件关联组合的，使用<code>Context</code>或许可以更加优雅。</li>
</ul>
<p>以上是我的分享内容，如有不足或者错误的地方，欢迎批评指正。</p>
<h2 id="articleHeader17">引用</h2>
<ul>
<li>Context - <a href="https://reactjs.org/docs/context.html" rel="nofollow noreferrer" target="_blank">https://reactjs.org/docs/cont...</a>
</li>
<li>React 16.3来了：带着全新的Context API - <a href="http://cnodejs.org/topic/5a7bd5c4497a08f571384f03" rel="nofollow noreferrer" target="_blank">http://cnodejs.org/topic/5a7b...</a>
</li>
<li>Content Distribution with Slots - <a href="https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots" rel="nofollow noreferrer" target="_blank">https://vuejs.org/v2/guide/co...</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊一聊我对 React Context 的理解以及应用

## 原文链接
[https://segmentfault.com/a/1190000013365874](https://segmentfault.com/a/1190000013365874)

