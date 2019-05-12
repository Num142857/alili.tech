---
title: 'react开发教程（十）redux结合react' 
date: 2018-12-23 2:30:07
hidden: true
slug: ket155ekvkb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">描述</h2>
<p>Redux 和 React 之间没有关系。Redux 可以搭配 React、Angular 甚至纯 JS。但是 Redux 还是比较适合和 React 搭配的，因为 React 允许你以 state 的形式来描述界面，而 Redux 非常擅长控制 state 的变化。</p>
<p>Redux 和 React 的结合需要用到 redux-react 这个库</p>
<h2 id="articleHeader1">案例说明</h2>
<h3 id="articleHeader2">目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── README.md
├── index.js
├── action
│   └── home.js
│   └── about.js
├── actionType
│   ├── index.js
├── reducer
│   └── home.js
│   └── about.js
│   └── index.js
└── view
    └── Home.jsx
    └── About.jsx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── README<span class="hljs-selector-class">.md</span>
├── index<span class="hljs-selector-class">.js</span>
├── action
│   └── home<span class="hljs-selector-class">.js</span>
│   └── about<span class="hljs-selector-class">.js</span>
├── actionType
│   ├── index<span class="hljs-selector-class">.js</span>
├── reducer
│   └── home<span class="hljs-selector-class">.js</span>
│   └── about<span class="hljs-selector-class">.js</span>
│   └── index<span class="hljs-selector-class">.js</span>
└── view
    └── Home<span class="hljs-selector-class">.jsx</span>
    └── About.jsx</code></pre>
<h2 id="articleHeader3">ActionType</h2>
<p>抛出两个type常量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const SET_AGE = 'SET_AGE'
export const SET_NAME = 'SET_NAME'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_AGE = <span class="hljs-string">'SET_AGE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_NAME = <span class="hljs-string">'SET_NAME'</span></code></pre>
<h2 id="articleHeader4">Action</h2>
<p>创建动作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//home.js
import {SET_NAME, SET_AGE} from '../actionType'

export function set_age (age) {
  return {
    type: SET_AGE,
    age
  }
}

export function set_name (name) {
  return {
    type: SET_AGE,
    name
  }
}

//about.js同上，就是一个模拟，可以写不同的数据
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//home.js</span>
<span class="hljs-keyword">import</span> {SET_NAME, SET_AGE} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actionType'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set_age</span> (<span class="hljs-params">age</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: SET_AGE,
    age
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set_name</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: SET_AGE,
    name
  }
}

<span class="hljs-comment">//about.js同上，就是一个模拟，可以写不同的数据</span>
</code></pre>
<h2 id="articleHeader5">reducer规则</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//reducer/home.js

import {SET_NAME, SET_AGE} from '../ActionType'

const initialState = {
  name: '刘宇',
  age: 100
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    case SET_AGE:
      return Object.assign({}, state, {
        age: action.age
      })
    default:
      return state
  }
}

//reducer/about.js   同上写法可自定义

//reducer/index.js
import {combineReducers} from 'redux'
import home from './home'
import about from './about'

export default combineReducers(
  {
    home,
    about
  }
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//reducer/home.js</span>

<span class="hljs-keyword">import</span> {SET_NAME, SET_AGE} <span class="hljs-keyword">from</span> <span class="hljs-string">'../ActionType'</span>

<span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'刘宇'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">100</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (state = initialState, action) =&gt; {
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> SET_NAME:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
        <span class="hljs-attr">name</span>: action.name
      })
    <span class="hljs-keyword">case</span> SET_AGE:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
        <span class="hljs-attr">age</span>: action.age
      })
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">//reducer/about.js   同上写法可自定义</span>

<span class="hljs-comment">//reducer/index.js</span>
<span class="hljs-keyword">import</span> {combineReducers} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'./home'</span>
<span class="hljs-keyword">import</span> about <span class="hljs-keyword">from</span> <span class="hljs-string">'./about'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers(
  {
    home,
    about
  }
)
</code></pre>
<h2 id="articleHeader6">view</h2>
<p><strong>bindActionCreators</strong>：把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。<br><strong>connect</strong>：连接 React 组件与 Redux store。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import * as pageActions from '../../action'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Inbox extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <div className=&quot;Inbox&quot;>
        index
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      pageState: state.home
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox)

// export default Inbox;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> pageActions <span class="hljs-keyword">from</span> <span class="hljs-string">'../../action'</span>
<span class="hljs-keyword">import</span> {bindActionCreators} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Inbox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.props)
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Inbox"</span>&gt;</span>
        index
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">pageState</span>: state.home
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapDispatchToProps</span>(<span class="hljs-params">dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">pageActions</span>: bindActionCreators(pageActions, dispatch)
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox)

<span class="hljs-comment">// export default Inbox;</span>
</code></pre>
<h2 id="articleHeader7">index.js</h2>
<blockquote>
<p><strong>将react和redux结合</strong></p>
<p><strong>createStore：</strong>创建一个 Redux store 来以存放应用中所有的 state。应用中应有且仅有一个 store。 <br><strong>&lt;Provider /&gt;</strong> ：是由 React Redux 提供的高阶组件，用来让你将 Redux 绑定到 React，让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {Provider} from 'react-redux'

import Home from './view/Inbox'
import About from './view/About'
import rootReducer from './Reducer'

//创建store
const store = createStore(rootReducer)

const BasicExample = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path=&quot;/home&quot; component={Home}/>
        <Route path=&quot;/about&quot; component={About}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <BasicExample />
  </Provider>,
  document.getElementById('root')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">import</span> {
  BrowserRouter <span class="hljs-keyword">as</span> Router,
  Route,
  Link,
  Switch,
  Redirect
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./view/Inbox'</span>
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'./view/About'</span>
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./Reducer'</span>

<span class="hljs-regexp">//</span>创建store
const store = createStore(rootReducer)

const BasicExample = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;Router&gt;
    &lt;div&gt;
      &lt;Switch&gt;
        &lt;Route exact path=<span class="hljs-string">"/home"</span> component={Home}/&gt;
        &lt;Route path=<span class="hljs-string">"/about"</span> component={About}/&gt;
      &lt;/Switch&gt;
    &lt;/div&gt;
  &lt;/Router&gt;
)

ReactDOM.render(
  &lt;Provider store={store}&gt;
    &lt;BasicExample /&gt;
  &lt;/Provider&gt;,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);
</code></pre>
<p>上一篇：<a href="https://segmentfault.com/a/1190000012263943">react开发教程（九）redux基础</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（十）redux结合react

## 原文链接
[https://segmentfault.com/a/1190000012264454](https://segmentfault.com/a/1190000012264454)

