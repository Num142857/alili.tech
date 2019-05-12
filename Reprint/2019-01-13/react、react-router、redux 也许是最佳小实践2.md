---
title: 'react、react-router、redux 也许是最佳小实践2' 
date: 2019-01-13 2:30:11
hidden: true
slug: lz1aostfuxf
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇：<a href="https://segmentfault.com/a/1190000009684957">react、react-router、redux 也许是最佳小实践1</a></p>
<h3 id="articleHeader0">加入 redux</h3>
<p>React 在组件之间流通数据.更确切的说，这被叫做“单向数据流”——数据沿着一个方向从父组件流到子组件。由于这个特性，对于没有父子关系的两个组件之间的数据交流就变得不是那么显而易见。这里 Redux 就排上用场了。Redux提供了一个解决方案，通过将应用程序所有的状态都存储在一个地方，叫做“store”。然后组件就可以“dispatch”状态的改变给这个store，而不是直接跟另外的组件交流。所有的组件都应该意识到状态的改变可以“subscribe”给store。如下图:<br><span class="img-wrap"><img data-src="/img/remote/1460000009694764?w=600&amp;h=565" src="https://static.alili.tech/img/remote/1460000009694764?w=600&amp;h=565" alt="Alt text" title="Alt text" style="cursor: pointer; display: inline;"></span></p>
<p>原理讲完，下面开始加入代码。<br>先看看一个小例子。</p>
<p>开始之前，需要先用 Redux.createStore() 创建一个store，然后将所有的reducer作为参数传递进去，让我们看一下这个只传递了一个reducer的小例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var userReducer = function(state, action) {
  if (state === undefined) {
    state = [];
  }
  if (action.type === 'ADD_USER') {
    state.push(action.user);
  }
  return state;
}

var store = Redux.createStore(userReducer);

store.dispatch({
  type: 'ADD_USER',
  user: {name: 'xiaoming'}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var <span class="hljs-keyword">user</span>Reducer = function(<span class="hljs-keyword">state</span>, action) {
  if (<span class="hljs-keyword">state</span> === undefined) {
    <span class="hljs-keyword">state</span> = [];
  }
  if (action.type === 'ADD_USER') {
    <span class="hljs-keyword">state</span>.push(action.<span class="hljs-keyword">user</span>);
  }
  return <span class="hljs-keyword">state</span>;
}

var store = Redux.createStore(<span class="hljs-keyword">user</span>Reducer);

store.dispatch({
  type: 'ADD_USER',
  <span class="hljs-keyword">user</span>: {name: 'xiaoming'}
});</code></pre>
<p>上面的程序干了些什么呢：</p>
<ol>
<li><p>这个store只由一个reducer创建。</p></li>
<li><p>这个reducer 初始化状态的时候使用了一个空数组 。*</p></li>
<li><p>在被分派的这个action里面使用了新的user对象。</p></li>
<li><p>这个reducer将这个新的user对象附加到state上，并将它返回，用来更新store。</p></li>
</ol>
<p>*在这个例子里reducer实际上被调用了两次 —— 一次是在创建store的时候，一次是在分派action之后。 </p>
<p>当store被创建之后，Redux立即调用了所有的reducer，并且将它们的返回值作为初始状态。第一次调用reducer传递了一个 undefined 给state。经过reducer内部的代码处理之后返回了一个空数组给这个store的state作为开始。</p>
<p>所有的<code>reducer</code>在每次<code>action</code>被分派之后都会被调用。因为<code>reducer</code>返回的状态将会成为新的状态存储在store中，所以 <code>Redux</code>总是希望所有的<code>reducer</code>都要返回一个状态。</p>
<p>在这个例子中，reducer第二次的调用发生在分派之后。记住，一个被分派的action描述了一个改变状态的意图，而且通常携带有数据用来更新状态。这一次，<code>Redux</code>将当前的状态（仍旧是空数组）和<code>action</code>对象一起传递给了<code>reducer</code>。这个<code>action</code>对象，现在有了一个值为1<code>ADD_USER</code>的<code>type</code>属性, 让<code>reducer</code>知道怎样改变状态。</p>
<h3 id="articleHeader1">正式redux登场</h3>
<p>在 <code>src</code> 下面创建一个 <code>redux</code>、<code>actions</code>、 <code>data</code>(存放一些初始数据)文件夹，然后在 <code>data</code>文件夹下面创建一个<code>db.js</code>，这个文件写上一些初始的数据:</p>
<blockquote><p>src/data/db.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = [
    {
        id: 1,
        title: '明天要去打酱油',
        content: '系呀系呀我们一起打酱油'
    },
    {
        id: 2,
        title: '周末去书吧读书',
        content: '书籍是人类进步的阶梯'
    },
    {
        id: 3,
        title: '备份一下数据库',
        content: '备份服务器的数据库，一般都是分开的，分布式数据库'
    },
    {
        id: 4,
        title: '周五记得把被子洗了',
        content: '洗杯子被子被子被子'
    },
    {
        id: 5,
        title: '计划五',
        content: '计划五内容'
    }
]

export default data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
        title</span>: <span class="hljs-string">'明天要去打酱油'</span>,
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'系呀系呀我们一起打酱油'</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 2,
        title</span>: <span class="hljs-string">'周末去书吧读书'</span>,
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'书籍是人类进步的阶梯'</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 3,
        title</span>: <span class="hljs-string">'备份一下数据库'</span>,
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'备份服务器的数据库，一般都是分开的，分布式数据库'</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 4,
        title</span>: <span class="hljs-string">'周五记得把被子洗了'</span>,
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'洗杯子被子被子被子'</span>
    },
    {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 5,
        title</span>: <span class="hljs-string">'计划五'</span>,
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'计划五内容'</span>
    }
]

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> data</code></pre>
<p>好了，初始的数据我们有了，下面就是创建 store 了，在<code>redux</code>文件夹下面，创建一个<code>planlist.js</code>文件，这个文件就是操作 store 的动作 <code>action</code>集合处理的数据，这时候我们会去<code>action</code>文件夹下面新建，<code>action-type.js</code> 和<code>plan.js</code>,代码如下：</p>
<blockquote><p>src/action/action-type.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const ADD = 'ADD';
export const DELECT = 'DELECT';
export const SHOW = 'SHOW';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD = <span class="hljs-string">'ADD'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELECT = <span class="hljs-string">'DELECT'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SHOW = <span class="hljs-string">'SHOW'</span>;</code></pre>
<blockquote><p>src/action/plan.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from './action-type.js';
// 添加计划
export function addPlan(item) {
  return {
    type: types.ADD,
    item
  };
}
// 删除计划
export function deletePlan(id) {
  return {
    type: types.DELECT,
    id
  };
}
// 显示隐藏弹层
export function show(show) {
  return {
    type: types.SHOW,
    show
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./action-type.js'</span>;
<span class="hljs-comment">// 添加计划</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addPlan</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: types.ADD,
    item
  };
}
<span class="hljs-comment">// 删除计划</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deletePlan</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: types.DELECT,
    id
  };
}
<span class="hljs-comment">// 显示隐藏弹层</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">show</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: types.SHOW,
    show
  };
}</code></pre>
<p><code>action</code> 我们都定义好了现在我们就可以改变 <code>store</code>了。写好我们的 reducer</p>
<blockquote><p>src/redux/planlist.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from '../actions/action-type.js';
import data from '../data/db.js'
const initialState = {
  show: false, // 是否显示弹出
  planlist: data // 初始的计划表
};

const planReducer = function(state = initialState, action) {
    let list = state.planlist;
  switch(action.type) {
    // 添加计划
    case types.ADD:
        list.push(action.item);
      return Object.assign({}, state, { planlist: list });
    // 删除计划
    case types.DELECT:
      let newstate = list.filter((item) => item.id != action.id);
      return Object.assign({}, state, { planlist: newstate });;
     // 显示、隐藏弹出层
     case types.SHOW:
         return Object.assign({}, state, { show: action.show });
  }
  return state;

}

export default planReducer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/action-type.js'</span>;
<span class="hljs-keyword">import</span> data <span class="hljs-keyword">from</span> <span class="hljs-string">'../data/db.js'</span>
<span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否显示弹出</span>
  planlist: data <span class="hljs-comment">// 初始的计划表</span>
};

<span class="hljs-keyword">const</span> planReducer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
    <span class="hljs-keyword">let</span> list = state.planlist;
  <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-comment">// 添加计划</span>
    <span class="hljs-keyword">case</span> types.ADD:
        list.push(action.item);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, { <span class="hljs-attr">planlist</span>: list });
    <span class="hljs-comment">// 删除计划</span>
    <span class="hljs-keyword">case</span> types.DELECT:
      <span class="hljs-keyword">let</span> newstate = list.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.id != action.id);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, { <span class="hljs-attr">planlist</span>: newstate });;
     <span class="hljs-comment">// 显示、隐藏弹出层</span>
     <span class="hljs-keyword">case</span> types.SHOW:
         <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, { <span class="hljs-attr">show</span>: action.show });
  }
  <span class="hljs-keyword">return</span> state;

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> planReducer;</code></pre>
<p>在redux 下面再创建<code>reducers.js</code>和<code>store.js</code>，</p>
<blockquote><p>src/redux/reducers.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux';

// Reducers
import planlist from './planlist';

// Combine Reducers
var reducers = combineReducers({
    planlist: planlist
});

export default reducers;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-comment">// Reducers</span>
<span class="hljs-keyword">import</span> planlist <span class="hljs-keyword">from</span> <span class="hljs-string">'./planlist'</span>;

<span class="hljs-comment">// Combine Reducers</span>
<span class="hljs-keyword">var</span> reducers = combineReducers({
    <span class="hljs-attr">planlist</span>: planlist
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> reducers;
</code></pre>
<blockquote><p>src/redux/store.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
import reducers from './reducers.js';

const store = createStore(reducers);
export default store;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers.js'</span>;

<span class="hljs-keyword">const</span> store = createStore(reducers);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;
</code></pre>
<p>这会我们的 store 就完全的创建好了，下面就是把 store 跟我们的组件，完全的结合起来。这就用到 react-redux  的 connect 模块。<br>这个东西 就是把组件跟 store 连接起来的模块。</p>
<p>然后在，<code>App.js</code>加入我们的。<code>store</code></p>
<blockquote><p>src/App.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// 引入 store
import { Provider, connect } from 'react-redux';
import store from './redux/store.js'
import logo from './logo.svg'
import Plan from './components/plan.js'
import Home from './components/home.js'
import Popup from './components/pupop.js'
import TestRouter from './components/testrouter.js'
import Detail from './components/detail.js'
import './App.css'
import './components/comment.css'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        // store的挂载
       <Provider store={store}>
        <div className=&quot;App&quot;>
            <div className=&quot;App-header&quot;>
              <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
              <h2 className='App-title'>Welcome to React Plan</h2>
            </div>
            <div>
              <Router history = {history}>
                 <div className=&quot;contentBox&quot;>
                    <ul className=&quot;nav&quot;>
                      <li><Link to=&quot;/&quot;>首页</Link></li>
                      <li><Link to=&quot;/plan&quot;>计划表</Link></li>
                      <li><Link to=&quot;/test&quot;>二级路由</Link></li>
                    </ul>
                    <div className=&quot;content&quot;> 
                      <Route exact path=&quot;/&quot; component={Home}/>
                      <Route path=&quot;/plan&quot; component={Plan}/>
                      <Route path=&quot;/test&quot; component={TestRouter}/>
                      <Route path=&quot;/detail/:id&quot; component={Detail}/>
                    </div>
                </div>
              </Router>
            </div>
            <Popup/>
        </div>
      </Provider>
    );
  }
}

export default App
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {
  BrowserRouter <span class="hljs-keyword">as</span> Router,
  Route,
  Link
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-regexp">//</span> 引入 store
<span class="hljs-keyword">import</span> { Provider, connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./redux/store.js'</span>
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>
<span class="hljs-keyword">import</span> Plan <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/plan.js'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home.js'</span>
<span class="hljs-keyword">import</span> Popup <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/pupop.js'</span>
<span class="hljs-keyword">import</span> TestRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/testrouter.js'</span>
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/detail.js'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./components/comment.css'</span>
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>
const history = createHistory()
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() {
    <span class="hljs-keyword">return</span> (
        <span class="hljs-regexp">//</span> store的挂载
       &lt;Provider store={store}&gt;
        &lt;div className=<span class="hljs-string">"App"</span>&gt;
            &lt;div className=<span class="hljs-string">"App-header"</span>&gt;
              &lt;img src={logo} className=<span class="hljs-string">"App-logo"</span> alt=<span class="hljs-string">"logo"</span> /&gt;
              &lt;h2 className=<span class="hljs-string">'App-title'</span>&gt;Welcome to React Plan&lt;/h2&gt;
            &lt;/div&gt;
            &lt;div&gt;
              &lt;Router history = {history}&gt;
                 &lt;div className=<span class="hljs-string">"contentBox"</span>&gt;
                    &lt;ul className=<span class="hljs-string">"nav"</span>&gt;
                      &lt;li&gt;&lt;Link to=<span class="hljs-string">"/"</span>&gt;首页&lt;/Link&gt;&lt;/li&gt;
                      &lt;li&gt;&lt;Link to=<span class="hljs-string">"/plan"</span>&gt;计划表&lt;/Link&gt;&lt;/li&gt;
                      &lt;li&gt;&lt;Link to=<span class="hljs-string">"/test"</span>&gt;二级路由&lt;/Link&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                    &lt;div className=<span class="hljs-string">"content"</span>&gt; 
                      &lt;Route exact path=<span class="hljs-string">"/"</span> component={Home}/&gt;
                      &lt;Route path=<span class="hljs-string">"/plan"</span> component={Plan}/&gt;
                      &lt;Route path=<span class="hljs-string">"/test"</span> component={TestRouter}/&gt;
                      &lt;Route path=<span class="hljs-string">"/detail/:id"</span> component={Detail}/&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
              &lt;/Router&gt;
            &lt;/div&gt;
            &lt;Popup/&gt;
        &lt;/div&gt;
      &lt;/Provider&gt;
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App
</code></pre>
<p>然后在 plan.js连接 store</p>
<blockquote><p>src/component/plant.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../redux/store.js';
// 引入 定义的 action
import {show, deletePlan} from '../actions/plan.js';

class Plan extends Component {
  constructor(props) {
      super(props);
  }
  // 显示弹出
  show () {
    let b = this.props.planlist.show;
    store.dispatch(show(!b));
  }
  // 删除计划
  delete (id) {
      store.dispatch(deletePlan(id));
  }
  // js 跳转路由
  detail (id) {
      this.props.history.push(`/detail/${id}`)
  }
    render () {
        return (
            <div>
                <div className=&quot;plant&quot;>
                    <h3>计划表</h3>
                    <p onClick={this.show.bind(this)}>添加计划</p>
                </div>
                <table className=&quot;planlist&quot;>
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.planlist.planlist.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className=&quot;plan-title&quot; onClick={this.detail.bind(this, item.id)}>{item.title}</td>
                                        <td className=&quot;plan-delect&quot; onClick={this.delete.bind(this, item.id)}>删除</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 store，作为 props
export default connect(mapStateToProps)(Plan);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../redux/store.js'</span>;
<span class="hljs-comment">// 引入 定义的 action</span>
<span class="hljs-keyword">import</span> {show, deletePlan} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/plan.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plan</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
  }
  <span class="hljs-comment">// 显示弹出</span>
  show () {
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">this</span>.props.planlist.show;
    store.dispatch(show(!b));
  }
  <span class="hljs-comment">// 删除计划</span>
  <span class="hljs-keyword">delete</span> (id) {
      store.dispatch(deletePlan(id));
  }
  <span class="hljs-comment">// js 跳转路由</span>
  detail (id) {
      <span class="hljs-keyword">this</span>.props.history.push(<span class="hljs-string">`/detail/<span class="hljs-subst">${id}</span>`</span>)
  }
    render () {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plant"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>计划表<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.show.bind(this)}</span>&gt;</span>添加计划<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"planlist"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>标题<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>操作<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                        {
                            this.props.planlist.planlist.map((item, index) =&gt; {
                                return (
                                    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plan-title"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.detail.bind(this,</span> <span class="hljs-attr">item.id</span>)}&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plan-delect"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.delete.bind(this,</span> <span class="hljs-attr">item.id</span>)}&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                                    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                                )
                            })
                        }
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">store</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">planlist</span>: store.planlist
  };
};
<span class="hljs-comment">// 连接 store，作为 props</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(Plan);
</code></pre>
<p>同理下面的 js，都是用这个模块连接</p>
<blockquote><p>src/component/detail.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../redux/store.js';


class Detail extends Component {
    constructor(props) {
        super(props);
        // 根据路由 id 跟 store 做过滤
        let item = props.planlist.planlist.filter((data) => data.id == props.match.params.id)
        console.log(item)
        this.state = {
            plan: item[0]
        }
    }
    render() {
        return (
            <div style="{{"padding: '20px'"}}">
                <h3>计划详情</h3>
                <p>id： {this.state.plan.id}</p>
                <p>标题： {this.state.plan.title}</p>
                <p>内容： {this.state.plan.content}</p>
            </div>

        )
    }
}


const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 tore 和组件
export default connect(mapStateToProps)(Detail);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../redux/store.js'</span>;


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Detail</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-comment">// 根据路由 id 跟 store 做过滤</span>
        <span class="hljs-keyword">let</span> item = props.planlist.planlist.filter(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> data.id == props.match.params.id)
        <span class="hljs-built_in">console</span>.log(item)
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">plan</span>: item[<span class="hljs-number">0</span>]
        }
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> '<span class="hljs-attr">20px</span>'"}}"&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>计划详情<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>id： {this.state.plan.id}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>标题： {this.state.plan.title}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容： {this.state.plan.content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

        )
    }
}


<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">store</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">planlist</span>: store.planlist
  };
};
<span class="hljs-comment">// 连接 tore 和组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(Detail);</code></pre>
<blockquote><p>src/component/popup.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../redux/store.js';
import {show, addPlan} from '../actions/plan.js';

class Pupop extends Component{
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '1',
      content: '1'
    }
  }
  // 取消按钮操作
  close () {
    let b = this.props.planlist.show;
    this.setState({
      id: '',
      title: '',
      content: ''
    })
    store.dispatch(show(!b));
  }
  // 输入框事件
  handleChage (str, e) {
    this.setState({
      id: Math.ceil(Math.random()*10000),
      [str]: e.target.value
    })
  }
  // 确认操作
  conform () {
    store.dispatch(addPlan(this.state));
    this.setState({
      id: '',
      title: '',
      content: ''
    })
    this.close();
  }

  render() {
    let self = this;
    return (
      <section className=&quot;popup&quot; style={this.props.planlist.show ? {} : {display: 'none'"}}">
        <div className=&quot;pbox&quot;>
          <span className=&quot;close&quot; onClick={this.close.bind(this)}>X</span>
          <div>
            <h4>计划标题</h4>
            <input onChange={this.handleChage.bind(this, 'title')} value={this.state.title} placeholder=&quot;请输入计划标题&quot;/>
          </div>
          <div>
            <h4>计划内容</h4>
            <textarea onChange={this.handleChage.bind(this, 'content')} value={this.state.content} placeholder=&quot;请输入计划内容&quot; rows=&quot;3&quot;></textarea>
          </div>
          <div className=&quot;pBtn&quot;>
            <span onClick = {this.close.bind(this)}>取消</span>
            <span onClick = {this.conform.bind(this)}>确认</span>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 store和组件
export default connect(mapStateToProps)(Pupop);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../redux/store.js'</span>;
<span class="hljs-keyword">import</span> {show, addPlan} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/plan.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pupop</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'1'</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">'1'</span>
    }
  }
  <span class="hljs-comment">// 取消按钮操作</span>
  close () {
    <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">this</span>.props.planlist.show;
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">id</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>
    })
    store.dispatch(show(!b));
  }
  <span class="hljs-comment">// 输入框事件</span>
  handleChage (str, e) {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">id</span>: <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10000</span>),
      [str]: e.target.value
    })
  }
  <span class="hljs-comment">// 确认操作</span>
  conform () {
    store.dispatch(addPlan(<span class="hljs-keyword">this</span>.state));
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">id</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>
    })
    <span class="hljs-keyword">this</span>.close();
  }

  render() {
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"popup"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.props.planlist.show</span> ? {} <span class="hljs-attr">:</span> {<span class="hljs-attr">display:</span> '<span class="hljs-attr">none</span>'"}}"&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pbox"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.close.bind(this)}</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>计划标题<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChage.bind(this,</span> '<span class="hljs-attr">title</span>')} <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.title}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入计划标题"</span>/&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>计划内容<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChage.bind(this,</span> '<span class="hljs-attr">content</span>')} <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.content}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入计划内容"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pBtn"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{this.close.bind(this)}</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{this.conform.bind(this)}</span>&gt;</span>确认<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 store和组件
export default connect(mapStateToProps)(Pupop);
</span></code></pre>
<p>完工。<a href="https://github.com/naihe138/react-plan" rel="nofollow noreferrer" target="_blank">github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react、react-router、redux 也许是最佳小实践2

## 原文链接
[https://segmentfault.com/a/1190000009694761](https://segmentfault.com/a/1190000009694761)

