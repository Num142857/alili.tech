---
title: '通过 React + Mobx 实现简单的 TodoList' 
date: 2019-01-13 2:30:11
hidden: true
slug: jleqnxtuhvb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Todo-list</h1>
<p>这是一个用来初步了解如何通过 React + Mobx 构建应用的 DEMO，通过 Webpack 进行打包。<br>技术栈： React + Mobx + React-Mobx + SCSS。<br>由于刚接触 React 不久，写的不好或者有误还请指出，万分感谢。</p>
<h2 id="articleHeader1">React</h2>
<p>React 是一个用于构建用户界面的 JavaScript 框架，也就是说 React 是一个 UI 框架，他把重点放在了 MVC 中的 V(View) 层上。</p>
<h3 id="articleHeader2">声明组件</h3>
<p>React 可以通过 ES6 的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">class</a> 来声明一个自定义组件，该组件继承基类 React.Component 的所有属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
  render () {
    return (
      // jsx
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">// jsx</span>
    )
  }
}</code></pre>
<p>这里有几点要强调的地方：</p>
<ul>
<li><p>1.原生 HTML 标签以小写开头，自定义 React 组件的首字母要大写。</p></li>
<li><p>2.JSX 语法很类似 XML，它不是必须的，但我觉得用它来编程很方便。</p></li>
<li><p>3.组件内的 render 函数是必须的，它返回一颗组件树，最终会被渲染成 HTML。</p></li>
</ul>
<h3 id="articleHeader3">挂载虚拟 DOM</h3>
<p>实例化根组件，启动框架，将虚拟的 DOM 节点挂载到真实的 DOM 节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(jsx, DOM)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">ReactDOM</span><span class="hljs-selector-class">.render</span>(<span class="hljs-selector-tag">jsx</span>, <span class="hljs-selector-tag">DOM</span>)</code></pre>
<h3 id="articleHeader4">React 组件的状态</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
  constructor (...arg) {
    super(...arg)
    // 定义组件的初始状态
    this.state = {
      //...
      name: 'Couzin'
    }
  }
  handlerClick () {
    // 调用后触发重新渲染
    this.setState = {
      name: 'HUnter'
    }
  }
  render () {
    return (
      <div>
        <button
          onClick=&quot;this.handlerClick.bind(this)
        >click</button>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span> (...arg) {
    <span class="hljs-keyword">super</span>(...arg)
    <span class="hljs-comment">// 定义组件的初始状态</span>
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-comment">//...</span>
      name: <span class="hljs-string">'Couzin'</span>
    }
  }
  handlerClick () {
    <span class="hljs-comment">// 调用后触发重新渲染</span>
    <span class="hljs-keyword">this</span>.setState = {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'HUnter'</span>
    }
  }
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">"this.handlerClick.bind(this)
        &gt;click&lt;/button&gt;
      &lt;/div&gt;</span></span></span>
    )
  }
}</code></pre>
<p>state 是组件私有的，可以通过 setState 来修改 state，并且触发 View 的重新渲染。</p>
<h3 id="articleHeader5">传递 props</h3>
<p>当一个组件依赖父组件中的数据时，就需要用 props 来传递数据了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Father extends React.Component {
  render () {
    return (
      <div>
        {/* ... */}
        <Child author=&quot;HUnter&quot; />
      </div>
    )
  }
}
class Child extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.author}</p>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Father</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-comment">/* ... */</span>}
        &lt;<span class="hljs-type">Child</span> author=<span class="hljs-string">"HUnter"</span> /&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;p&gt;{<span class="hljs-keyword">this</span>.props.author}&lt;/p&gt;
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>子组件中通过 this.props 就可以拿到 props 上的数据了，实现了从 父组件 ------&gt; 子组件的数据传递。<br>另外再提及一下 this.props.children：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Father extends React.Component {
  render () {
    return (
      <div>
        {/* ... */}
        <Child author=&quot;HUnter&quot;>
          <h1>hello world</h1>
        </Child>
      </div>
    )
  }
}
class Child extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.author}</p>
        {this.props.children}
        {/* 相当于<h1>hello world</h1> */}
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Father</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {<span class="hljs-comment">/* ... */</span>}
        &lt;<span class="hljs-type">Child</span> author=<span class="hljs-string">"HUnter"</span>&gt;
          &lt;h1&gt;hello world&lt;/h1&gt;
        &lt;/<span class="hljs-type">Child</span>&gt;
      &lt;/div&gt;
    )
  }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;p&gt;{<span class="hljs-keyword">this</span>.props.author}&lt;/p&gt;
        {<span class="hljs-keyword">this</span>.props.children}
        {<span class="hljs-comment">/* 相当于&lt;h1&gt;hello world&lt;/h1&gt; */</span>}
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>也就是说 this.props.children 就是组件内嵌套的元素。</p>
<p>了解了上面的这些使用方法，差不多就可以开始简单的使用 React 了。</p>
<h2 id="articleHeader6">Mobx</h2>
<p>Mobx 是一个状态管理工具，它可以把你的应用变为响应式。<br>Mobx 提供状态给 React 使用，下面有一些概念</p>
<h3 id="articleHeader7">observable state （可观察状态）</h3>
<p>Mobx 为现有数据结构添加了可观察的功能，只需要通过 @observable 这个装饰器就可以使你的属性变为可观察的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyStore {
  @observable myName = 'hunter'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyStore</span> {</span>
  @observable myName = <span class="hljs-string">'hunter'</span>
}</code></pre>
<h3 id="articleHeader8">derivation （衍生）</h3>
<p>任何源自 state 并且不会再有进一步相互作用的东西就是衍生。Mobx 有两种类型的衍生：</p>
<ul>
<li><p>computed values 从当前可观察状态中衍生出的值。</p></li>
<li><p>reactions 当前状态改变时要发生的副作用。</p></li>
</ul>
<h4>computed values</h4>
<p>当相关数据变化时会自动更新。通过 @computed 装饰器调用的 setter／getter 函数进行使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyStore {
  @observable myName = 'HUnter'

  @computed get getNameLength () {
    return this.myName.length
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">MyStore</span> {
  <span class="hljs-variable">@observable</span> myName = <span class="hljs-string">'HUnter'</span>

  <span class="hljs-variable">@computed</span> get getNameLength () {
    <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.myName</span><span class="hljs-selector-class">.length</span>
  }
}</code></pre>
<h4>reactions</h4>
<p>reactions 与 computed values 相比起来使用较少，它是当前状态改变所触发的副作用。</p>
<h3 id="articleHeader9">actions （动作）</h3>
<p>只有在 actions 中，才可以修改 Mobx 中 state 的值。注意当你使用装饰器模式时，@action 中的 this 没有绑定在当前这个实例上，要用过 @action.bound 来绑定 使得 this 绑定在实例对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@action.bound setName () {
  this.myName = 'HUnter'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>@action<span class="hljs-selector-class">.bound</span> setName () {
  this<span class="hljs-selector-class">.myName</span> = <span class="hljs-string">'HUnter'</span>
}</code></pre>
<p>actions ------&gt; state ------&gt; view</p>
<h2 id="articleHeader10">Mobx-React</h2>
<p>上面简单介绍了 Mobx 的使用，我们知道当 React 组件中 state 变化后，要通过 setState 来触发视图的更新，Mobx 中定义了 React 组件中的 state 以及如何修改 state，那么怎么在 state 改变后触发视图的更新呢？Mobx-React 提供了 observer 将 React 组件的转变为响应式组件，确保 state 改变时可以强制刷新组件。做法很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
class MyComponent extends React.Component {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-meta">@observer</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h2 id="articleHeader11">React + Mobx 使用的步骤</h2>
<ul><li><p>1.定义 observable state</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Store {
  @observable data = []

  // @computed ...

  // @action ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  <span class="hljs-meta">@observable</span> <span class="hljs-keyword">data</span> = []

  <span class="hljs-comment">// @computed ...</span>

  <span class="hljs-comment">// @action ...</span>
}</code></pre>
<ul><li><p>2.创建视图<br>通过 React 创建视图时，推荐创建无状态组件，即组件内没有内部的 state 和 生命周期函数。理想情况下，大部分组件都应该是无状态组件，仅通过 props 获得数据。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
class MyComponent extends React.Component {

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-meta">@observer</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

}</code></pre>
<ul><li><p>3.通过调用 Mobx 中的 actions 改变状态。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
class MyComponent extends React.Component {
  render () {
    let store = { this.props }
    return (
      <div>
        <input onChange={store.setName} /> 
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-meta">@observer</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    let store = { <span class="hljs-keyword">this</span>.props }
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;input onChange={store.setName} /&gt; 
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>上面大致讲了如何简单使用 React + Mobx 来实现一个简单的应用，描述的比较浅显。具体源码请见 <a href="https://github.com/Hunter-Gu/TodoList/tree/master/demos/todo-mobx" rel="nofollow noreferrer" target="_blank">github</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过 React + Mobx 实现简单的 TodoList

## 原文链接
[https://segmentfault.com/a/1190000009547437](https://segmentfault.com/a/1190000009547437)

