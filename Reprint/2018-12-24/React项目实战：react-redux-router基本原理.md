---
title: 'React项目实战：react-redux-router基本原理' 
date: 2018-12-24 2:30:07
hidden: true
slug: kvbqzkrms2
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React相关</h1>
<p>React 是一个采用声明式，高效而且灵活的用来构建用户界面的框架。</p>
<h2 id="articleHeader1">JSX</h2>
<p>本质上来讲，JSX 只是为<code>React.createElement(component, props, ...children)</code>方法提供的语法糖。比如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
  <h1 className=&quot;greeting&quot;>
    Hello, world!
  </h1>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
    Hello, world!
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);</code></pre>
<p>编译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const element</span> = React.createElement(
  <span class="hljs-string">'h1'</span>,
  {className: <span class="hljs-string">'greeting'</span>},
  <span class="hljs-string">'Hello, world!'</span>
);</code></pre>
<p><code>React.createElement()</code>这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>const <span class="hljs-literal">element</span> = {
  type: <span class="hljs-string">'h1'</span>,
  props: {
    className: <span class="hljs-string">'greeting'</span>,
    children: <span class="hljs-string">'Hello, world'</span>
  }
};</code></pre>
<p>这样的对象被称为<code>React元素</code>，它代表所有你在屏幕上看到的东西。<br>我们用 React 开发应用时一般只会定义一个根节点。要将 React 元素渲染到根DOM节点中，我们通过把它们都传递给<code>ReactDOM.render()</code>的方法来将其渲染到页面上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  element,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ReactDOM.render(
  element,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>每当 React 元素发生变化时，<code>ReactDOM</code>首先会比较元素内容先后的不同，然后操作浏览器DOM更新改变了的部分。</p>
<h2 id="articleHeader2">组件 &amp; Props</h2>
<p>当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件,这个对象称之为<code>props</code>。无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props 。<br>例如,这段代码会在页面上渲染出<code>Hello,Sara</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用 ES6 class 来定义一个组件，组件名称必须以大写字母开头。
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const element = <Welcome name=&quot;Sara&quot; />;
ReactDOM.render(
  element,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">//使用 ES6 class 来定义一个组件，组件名称必须以大写字母开头。</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}

const element = &lt;<span class="hljs-type">Welcome</span> name=<span class="hljs-string">"Sara"</span> /&gt;;
<span class="hljs-type">ReactDOM</span>.render(
  element,
  document.getElementById(<span class="hljs-symbol">'roo</span>t')
);</code></pre>
<p>我们来回顾一下在这个例子中发生了什么：</p>
<ol>
<li>我们对<code>&lt;Welcome name="Sara" /&gt;</code>元素调用了<code>ReactDOM.render()</code>方法。</li>
<li>React 将<code>{name: 'Sara'}</code>作为<code>props</code>传入并调用 Welcome 组件。</li>
<li>Welcome 组件将<code>&lt;h1&gt;Hello, Sara&lt;/h1&gt;</code>元素作为结果返回。</li>
<li>ReactDOM 将DOM更新为<code>&lt;h1&gt;Hello, Sara&lt;/h1&gt;</code>。</li>
</ol>
<h2 id="articleHeader3">State &amp; 生命周期</h2>
<p>组件的通过<code>props</code>获取属性，且其不能修改；当我们需要修改当前组件的状态时，要用到<code>state</code>来设置局部状态，需要通过<code>this.setState()</code>来更新组件局部状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Toggle extends React.Component {
  constructor(props) {
    super(props);    //初始化this，并赋值this.props
    this.state = {isToggleOn: true};    //初始化this.state
    this.handleClick = this.handleClick.bind(this);    //为this.handleClick绑定this对象
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));    //用this.setState()更新this.state
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Toggle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);    <span class="hljs-comment">//初始化this，并赋值this.props</span>
    <span class="hljs-keyword">this</span>.state = {isToggleOn: <span class="hljs-literal">true</span>};    <span class="hljs-comment">//初始化this.state</span>
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);    <span class="hljs-comment">//为this.handleClick绑定this对象</span>
  }

  handleClick() {
    <span class="hljs-keyword">this</span>.setState(prevState =&gt; ({
      isToggleOn: !prevState.isToggleOn
    }));    <span class="hljs-comment">//用this.setState()更新this.state</span>
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
        {<span class="hljs-keyword">this</span>.state.isToggleOn ? <span class="hljs-symbol">'O</span>N' : <span class="hljs-symbol">'OF</span>F'}
      &lt;/button&gt;
    );
  }
}

<span class="hljs-type">ReactDOM</span>.render(
  &lt;<span class="hljs-type">Toggle</span> /&gt;,
  document.getElementById(<span class="hljs-symbol">'roo</span>t')
);</code></pre>
<p>每一个组件都有几个你可以重写以让代码在处理环节的特定时期运行的“生命周期方法”。方法中带有前缀<code>will</code>的在特定环节之前被调用，而带有前缀<code>did</code>的方法则会在特定环节之后被调用。</p>
<ul>
<li>
<p><strong>装配</strong>：这些方法会在组件实例被创建和插入DOM中时被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- constructor(`props`)
- componentWillMount()
- render()
- componentDidMount()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>- <span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(`props`)</span>
- <span class="hljs-title">componentWillMount</span><span class="hljs-params">()</span>
- <span class="hljs-title">render</span><span class="hljs-params">()</span>
- <span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span></span></code></pre>
</li>
<li>
<p><strong>更新</strong>：属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- componentWillReceiveProps(`nextProps`)
- shouldComponentUpdate(`nextProps`, `nextState`)
- componentWillUpdate(`nextProps`, `nextState`)
- render()
- componentDidUpdate(`prevProps`, `prevState`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> componentWillReceiveProps(<span class="hljs-string">`nextProps`</span>)
</span>-<span class="ruby"> shouldComponentUpdate(<span class="hljs-string">`nextProps`</span>, <span class="hljs-string">`nextState`</span>)
</span>-<span class="ruby"> componentWillUpdate(<span class="hljs-string">`nextProps`</span>, <span class="hljs-string">`nextState`</span>)
</span>-<span class="ruby"> render()
</span>-<span class="ruby"> componentDidUpdate(<span class="hljs-string">`prevProps`</span>, <span class="hljs-string">`prevState`</span>)</span></code></pre>
</li>
<li>
<p><strong>卸载</strong>：当一个组件被从DOM中移除时，该方法被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- componentWillUnmount()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> componentWillUnmount()
</span></code></pre>
</li>
</ul>
<p>当项目视图交互复杂且频繁的时候，依旧采用 state 进行状态更改会显得异常繁琐和不可预测。<br>这时我们就需要借助 Redux 框架，将状态数据全部转交给 Redux 处理，React 专一负责视图显示，这样会让项目逻辑变得简单而清晰。</p>
<h1 id="articleHeader4">Redux相关</h1>
<p>三大原则：</p>
<ul>
<li>整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个<code>store</code>中。</li>
<li>惟一改变 state 的方法就是触发<code>action</code>，action 是一个用于描述事件的普通对象。</li>
<li>为了描述 action 如何改变 state tree ，你需要编写<code>reducers</code>。</li>
</ul>
<h2 id="articleHeader5">Action</h2>
<p>Action 是把数据从项目传到 store 的有效载荷。它是 store 数据的唯一来源。通常你会通过<code>store.dispatch()</code>将 action 传到 store。</p>
<p>Action 本质上是 JavaScript 普通对象，添加新 todo 任务的 action 是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">'Build my first Redux app'</span>
}</code></pre>
<p><code>Action 创建函数</code>就是生成 action 的方法。在 Redux 中的 action 创建函数只是简单的返回一个 action:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text: text
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
    <span class="hljs-attr">text</span>: text
  }
}</code></pre>
<p>这样做将使 action 创建函数更容易被移植和测试。只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(addTodo(text));

//或者创建一个 被绑定的 action 创建函数 来自动 dispatch：
const boundAddTodo = (text) => dispatch(addTodo(text));
boundAddTodo(text);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>dispatch(addTodo(<span class="hljs-built_in">text</span>));

<span class="hljs-comment">//或者创建一个 被绑定的 action 创建函数 来自动 dispatch：</span>
<span class="hljs-keyword">const</span> boundAddTodo = (<span class="hljs-built_in">text</span>) =&gt; dispatch(addTodo(<span class="hljs-built_in">text</span>));
boundAddTodo(<span class="hljs-built_in">text</span>);</code></pre>
<p>store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会使用 react-redux 提供的<code>connect()</code>帮助器来调用。</p>
<h2 id="articleHeader6">Reducer</h2>
<p>Action 只是描述了有事情发生了这一事实，而<code>reducer</code>要做的事情正是指明应用如何更新 state 。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(previousState, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">(previousState, action) =&gt; newState</code></pre>
<p>保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：</p>
<ul>
<li>修改传入参数；</li>
<li>执行有副作用的操作，如 API 请求和路由跳转；</li>
<li>调用非纯函数，如 Date.now() 或 Math.random()。</li>
</ul>
<p>我们将以指定 state 的初始状态作为开始。Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initialState = {};    //初始化state

function todoApp(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        text: action.text
      })
    default:
      return state    //在 default 情况下返回旧的 state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> initialState = {};    <span class="hljs-comment">//初始化state</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
        <span class="hljs-attr">text</span>: action.text
      })
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state    <span class="hljs-comment">//在 default 情况下返回旧的 state</span>
  }
}</code></pre>
<p>每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。</p>
<p><code>combineReducers()</code>所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-keyword">const</span> todoApp = combineReducers({
  visibilityFilter,
  todos
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> todoApp;</code></pre>
<p>注意上面的写法和下面完全等价：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = {}, action</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">visibilityFilter</span>: visibilityFilter(state.visibilityFilter, action),
    <span class="hljs-attr">todos</span>: todos(state.todos, action)
  }
}</code></pre>
<blockquote>
<p>combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import * as reducers 得到一个以它们名字作为 key 的 object：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>

<span class="hljs-keyword">const</span> todoApp = combineReducers(reducers)</code></pre>
</blockquote>
<h2 id="articleHeader7">Store</h2>
<p>action 描述发生了什么，reducers 根据 action 更新 state，<code>Store</code>就是把它们联系到一起的对象。Store 有以下职责：</p>
<ul>
<li>维持应用的 state；</li>
<li>提供<code>getState()</code>方法获取 state；</li>
<li>提供<code>dispatch(action)</code>方法更新state；</li>
<li>通过<code>subscribe(listener)</code>注册监听器;</li>
<li>通过<code>subscribe(listener)</code>返回的函数注销监听器。</li>
</ul>
<p>我们使用 combineReducers() 将多个 reducer 合并成为一个。现在我们将其导入，并传递 <code>createStore()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> todoApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">let</span> store = createStore(todoApp)</code></pre>
<p>createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = createStore(todoApp, window.STATE_FROM_SERVER);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> store = createStore(todoApp, <span class="hljs-built_in">window</span>.STATE_FROM_SERVER);</code></pre>
<h2 id="articleHeader8">数据流</h2>
<p>Redux 应用中数据的生命周期遵循下面 4 个步骤：</p>
<ol>
<li>调用 store.dispatch(action)。</li>
<li>Redux store 调用传入的 reducer 函数。</li>
<li>根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。</li>
<li>Redux store 保存了根 reducer 返回的完整 state 树。</li>
</ol>
<h1 id="articleHeader9">Router相关</h1>
<p>直接使用整合后的<code>react-router-redux</code>，后面抽时间再详细讲一下，具体使用的话模仿官方案例吧，<a href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux#readme" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h1 id="articleHeader10">容器组件 和 展示组件</h1>
<p>Redux 的 React 绑定库包含了 容器组件和展示组件相分离 的开发思想。</p>
<p>明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入。</p>
<p><span class="img-wrap"><img data-src="/img/bVZefu?w=964&amp;h=297" src="https://static.alili.tech/img/bVZefu?w=964&amp;h=297" alt="组件分离" title="组件分离" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader11">系列目录</h1>
<ol>
<li><a href="http://sfau.lt/b5Y87d" rel="nofollow noreferrer" target="_blank">前端大统一时代即将来临？</a></li>
<li><a href="http://sfau.lt/b5ZcHH" rel="nofollow noreferrer" target="_blank">React项目实战：环境搭建</a></li>
<li><a href="http://sfau.lt/b5Zefv" rel="nofollow noreferrer" target="_blank">React项目实战：react-redux-router基本原理</a></li>
<li>React项目实战：登录页面（编辑中）</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React项目实战：react-redux-router基本原理

## 原文链接
[https://segmentfault.com/a/1190000012170435](https://segmentfault.com/a/1190000012170435)

