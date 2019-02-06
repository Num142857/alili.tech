---
title: 'Redux 入门' 
date: 2019-02-07 2:30:15
hidden: true
slug: 56s39pc6n5u
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>系列文章:</p>
<ol>
<li><p>Redux 入门(本文)</p></li>
<li><p><a href="https://segmentfault.com/a/1190000006056167">Redux 进阶</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006673171" target="_blank">番外篇: Vuex — The core of Vue application</a></p></li>
</ol>
</blockquote>
<p>状态管理，第一次听到这个词要追溯到去年年底。那时，<a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a> 红透半边天，而 <a href="https://github.com/reflux/refluxjs" rel="nofollow noreferrer" target="_blank">Reflux</a> 也是风华正茂。然而，前一阵一直在忙其他的事，一直没时间学学这两个库，到现在 <a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a> 似乎又有一统天下的趋势。</p>
<p>那就来看看，Redux 是凭借什么做到异军突起的。</p>
<h3 id="articleHeader0">What's Redux</h3>
<p>Redux 是一个 JavaScript 应用状态管理的库，它帮助你编写行为一致，并易于测试的代码，而且它非常迷你，只有 2KB。</p>
<p>Redux 有一点和别的前端库或框架不同，它不单单是一套类库，它更是一套方法论，告诉你如何去构建一个状态可预测的应用。</p>
<h3 id="articleHeader1">Why using Redux</h3>
<p>随着单页应用变得越来越复杂，前端代码需要管理各种各样的状态，它可以是服务器的响应，也可能是前端界面的状态。当这个状态变得任意可变，那么你就可能在某个时间点失去对整个应用状态的控制。</p>
<p>Redux 就是为了解决这个问题而诞生的。</p>
<p>简短地说，Redux 为整个应用创建并管理一棵状态树，并通过限制更新发生的时间和方式，而使得整个应用状态的变化变得可以被预测。</p>
<p>除此之外，Redux 有着一整套丰富的生态圈，包括教程、中间件、开发者工具及文档，这些都可以在<a href="http://redux.js.org/docs/introduction/Ecosystem.html" rel="nofollow noreferrer" target="_blank">官方文档</a>中找到。</p>
<h3 id="articleHeader2">How to use Redux</h3>
<h4>三大原则</h4>
<p>在使用 Redux 之前，你必须要谨记它的三大原则：单一数据源、<code>state</code> 是只读的和使用纯函数执行修改。</p>
<ul>
<li>
<p>单一数据源</p>
<blockquote><p>整个应用的 <code>state</code> 都被储存在一棵树中，并且这棵状态树只存在于<strong>唯一</strong>一个 <code>store</code> 中。</p></blockquote>
<p>这使得来自服务端的 <code>state</code> 可以轻易地注入到客户端中；并且，由于是单一的 <code>state</code> 树，代码调试、以及“撤销/重做”这类功能的实现也变得轻而易举。</p>
</li>
<li>
<p>只读的 <code>state</code></p>
<blockquote><p>唯一改变 <code>state</code> 的方法就是触发 <code>action</code>，<code>action</code> 是一个用于描述已发生事件的普通对象。</p></blockquote>
<p>这就表示无论是用户操作或是请求数据都不能直接修改 <code>state</code>，相反它们只能通过触发 <code>action</code> 来变更当前应用状态。其次，<code>action</code> 就是普通对象，因此它们可以被日志打印、序列化、储存，以及用于调试或测试的后期回放。</p>
</li>
<li>
<p>使用纯函数执行修改</p>
<blockquote><p>为每个 <code>action</code> 用<strong>纯函数</strong>编写 <code>reducer</code> 来描述如何修改 <code>state</code> 树</p></blockquote>
<p>或许你是第一次听到纯函数这个概念，但它是函数话编程的基础。</p>
<p>纯函数在<a href="https://en.wikipedia.org/wiki/Pure_function" rel="nofollow noreferrer" target="_blank">维基百科</a>上的解释简单来说是满足以下两项：</p>
<ol>
<li><p>函数在有相同的输入值时，产生相同的输出</p></li>
<li><p>函数中不包含任何会产生副作用的语句</p></li>
</ol>
<p>在这里，<code>reducer</code> 要做到<strong>只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，只进行单纯执行计算。</strong></p>
<p>知道了三大原则之后，那就可以开始了解如何创建一个基于 Redux 的应用。</p>
</li>
</ul>
<h4>Action</h4>
<p>就如之前提到的，<code>action</code> 是一个描述事件的简单对象，它是改变 <code>store</code> 中 <code>state</code> 的唯一方法，它通过 <code>store.dispatch()</code> 方法来将 <code>action</code> 传到 <code>store</code> 中。</p>
<p>下面就是一个 <code>action</code> 的例子，它表示添加一个新的 todo 项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ADD_TODO = 'ADD_TODO'
// action
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> ADD_TODO = <span class="hljs-string">'ADD_TODO'</span>
<span class="hljs-comment">// action</span>
{
  <span class="hljs-attr">type</span>: ADD_TODO,
  <span class="hljs-attr">text</span>: <span class="hljs-string">'Build my first Redux app'</span>
}</code></pre>
<p>可以看到 <code>action</code> 就是一个简单的 JavaScript 对象。</p>
<p>用一个字符串类型的 <code>type</code> 字段来表示将要执行的动作，<code>type</code> 最好用常量来定义，当应用扩大时，可以使用单独的模块来存放 <code>action</code>。</p>
<p>除了 <code>type</code> 字段外，<code>action</code> 对象的结构完全由你自己决定（也可以借鉴 <a href="https://github.com/acdlite/flux-standard-action" rel="nofollow noreferrer" target="_blank">flux-standard-action</a> 来构建你的 <code>action</code>）。</p>
<p>在现实场景中，<code>action</code> 所传递的值很少会是一个固定的值，都是动态产生的。所以，要为每个 <code>action</code> 创建它的工厂方法，工厂方法返回一个 <code>action</code> 对象。</p>
<p>上面的那个例子就会变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: ADD_TODO,
    text
  }
}</code></pre>
<p><code>Action</code> 的创建工厂可以是异步非纯函数。牵扯到异步的问题内容就比较多，放到下一篇再分享了。</p>
<h4>Reducer</h4>
<p><code>Action</code> 只是一个描述事件的简单对象，并没有告诉应用该如何更新 <code>state</code>，而这正是 <code>reducer</code> 的工作。</p>
<p>在 Redux 应用中，所有的 <code>state</code> 都被保存在一个单一对象中。所以，建议在写代码前先确定这个对象的结构。如何才能以最简的形式把应用的 <code>state</code> 用对象描述出来？</p>
<p>在设计过程中，你会发现你有时需要在 <code>state</code> 中存储一些如 UI 的 <code>state</code>，尽量将应用数据和 UI <code>state</code> 分开存放。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">{
  <span class="hljs-attr">todos</span>: [
    {
      <span class="hljs-attr">text</span>: <span class="hljs-string">'Consider using Redux'</span>,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">text</span>: <span class="hljs-string">'Keep all state in a single tree'</span>,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
    }
  ]
}</code></pre>
<p><strong>注意：</strong>在处理复杂应用时，建议尽可能地把 <code>state</code> 范式化，把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据，这种方法在 <a href="https://github.com/paularmstrong/normalizr" rel="nofollow noreferrer" target="_blank">normalizr</a> 文档里有详细阐述。</p>
<p>现在我们已经确定了 <code>state</code> 对象的结构，就可以开始开发 <code>reducer</code>。<code>reducer</code> 是一个纯函数，它接收旧的 <code>state</code> 和 <code>action</code>，返回新的 <code>state</code>，就像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(previousState, action) => newState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">(previousState, action) =&gt; newState</code></pre>
<p>还记不记得<strong>三大原则</strong>？</p>
<p>没错，最后一点<strong>使用纯函数进行修改</strong>，所以，<strong>永远不要</strong>在 <code>reducer</code> 里做这些操作：</p>
<ul>
<li><p>修改传入的参数（即之前的 <code>state</code> 或 <code>action</code> 对象）</p></li>
<li><p>执行有副作用的操作，如 API 请求或路由跳转</p></li>
<li><p>调用非纯函数，如 <code>Date.now()</code> 或 <code>Math.random()</code> 等</p></li>
</ul>
<p>将这些铭记于心后，就能创建对应之前 <code>action</code> 的 <code>reducer</code> 了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initialState = {
  todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      }
    default:
      return state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">todos</span>: []
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> ADD_TODO:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">todos</span>: [
          ...state.todos,
          {
            <span class="hljs-attr">text</span>: action.text,
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
          }
        ]
      }
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<p><strong>注意：</strong></p>
<ol>
<li><p>不要修改传入的 <code>state</code>，否则它就不是个纯函数</p></li>
<li><p>在遇到未知 <code>action</code> type 的时候，默认返回之前的 <code>state</code></p></li>
</ol>
<p>这样一个 <code>reducer</code> 就创建好了，是不是很简单？多个 <code>action</code> 也是如此，我们再来添加一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case TOGGLE_TODO:
  return {
    ...state,
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return {
          ...todo,
          completed: !todo.completed
        } // 时刻谨记不要修改 state，保证 reducer 是纯函数
      }
      return todo
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">case</span> TOGGLE_TODO:
  <span class="hljs-keyword">return</span> {
    ...state,
    <span class="hljs-attr">todos</span>: state.todos.map(<span class="hljs-function">(<span class="hljs-params">todo, index</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (index === action.index) {
        <span class="hljs-keyword">return</span> {
          ...todo,
          <span class="hljs-attr">completed</span>: !todo.completed
        } <span class="hljs-comment">// 时刻谨记不要修改 state，保证 reducer 是纯函数</span>
      }
      <span class="hljs-keyword">return</span> todo
    })
  }</code></pre>
<p>从例子中可以发现，当对 <code>state</code> 的一部分进行操作时，不会影响 <code>state</code> 的其他部分，但仍需复制 <code>state</code> 树的其他部分。当项目的规模成长时，<code>state</code> 树的层次也会随之增长，对树深层节点的操作将会带来大量的复制。</p>
<p>此时，我们就可以将这些相互独立的 <code>reducer</code> 拆分开来，我们之前的例子就可以改成这样(官网的例子更能体现这一点，为了缩减篇幅我这里省略了另一个 <code>reducer</code>)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// todos reducer
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            completed: !todo.completed
          } // 时刻谨记不要修改 state，保证 reducer 是纯函数
        }
        return todo
      })
    default:
      return state
  }
}

// main reducer
function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        todos: todos(state.todos, action)
      }
   default:
      return state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// todos reducer</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todos</span>(<span class="hljs-params">state = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> ADD_TODO:
      <span class="hljs-keyword">return</span> [
        ...state,
        {
          <span class="hljs-attr">text</span>: action.text,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
        }
      ]
    <span class="hljs-keyword">case</span> TOGGLE_TODO:
      <span class="hljs-keyword">return</span> state.map(<span class="hljs-function">(<span class="hljs-params">todo, index</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (index === action.index) {
          <span class="hljs-keyword">return</span> {
            ...todo,
            <span class="hljs-attr">completed</span>: !todo.completed
          } <span class="hljs-comment">// 时刻谨记不要修改 state，保证 reducer 是纯函数</span>
        }
        <span class="hljs-keyword">return</span> todo
      })
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">// main reducer</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> ADD_TODO:
    <span class="hljs-keyword">case</span> TOGGLE_TODO:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">todos</span>: todos(state.todos, action)
      }
   <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<p>这就是所谓的 <code>reducer</code> 合成，它是开发 Redux 应用的基础。</p>
<p><strong>注意：</strong>每个 <code>reducer</code> 应当只负责管理全局 <code>state</code> 中它负责的一部分；并且，每个 <code>reducer</code> 的 <code>state</code> 参数分别对应它管理的那部分 <code>state</code>。</p>
<p>由于，每个 <code>reducer</code> 应当只负责管理全局 <code>state</code> 中它负责的一部分，那么上面的 main <code>reducer</code> 就能改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main reducer
function todoApp(state = initialState, action) {
  return {
    todos: todos(state.todos, action)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// main reducer</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoApp</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">todos</span>: todos(state.todos, action)
  }
}</code></pre>
<p>最后，Redux 提供了 <code>combineReducers()</code> 工具类，它能帮我们减少很多重复的模板代码。</p>
<p><code>combineReducers()</code> 就像一个工厂，它根据传入对象的 key 来筛选出 <code>state</code> 中 key 所对应的值传给对应的 <code>reducer</code>，最终它返回一个符合规范的 reducer 函数。 </p>
<p>最终，我们的 main <code>reducer</code> 就变为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main reducer
const todoApp = combineReducers({
  todos // 等价于 todos: todos(state.todos, action)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// main reducer</span>
<span class="hljs-keyword">const</span> todoApp = combineReducers({
  todos <span class="hljs-comment">// 等价于 todos: todos(state.todos, action)</span>
})</code></pre>
<p>随着应用的膨胀，你可以将拆分后的 <code>reducer</code> 放到不同的文件中, 以保持其独立性。然后，你的代码就可以变成这样...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers)

export default todoApp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>

<span class="hljs-keyword">const</span> todoApp = combineReducers(reducers)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> todoApp</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760718" src="https://static.alili.tech/img/remote/1460000006760718" alt="" title="" style="cursor: pointer;"></span></p>
<h4>Store</h4>
<p><code>Store</code> 用来存放整个应用的 <code>state</code>，并将 <code>action</code> 和 <code>reducer</code> 联系起来。它主要有以下几个职能：</p>
<ul>
<li><p>存储整个应用的 <code>state</code></p></li>
<li><p>提供 <code>getState()</code> 方法获取 <code>state</code></p></li>
<li><p>提供 <code>dispatch(action)</code> 方法更新 <code>state</code></p></li>
<li><p>提供 <code>subscribe(listener)</code> 来注册、取消监听器</p></li>
</ul>
<p>根据已有的 <code>reducer</code> 来创建 <code>store</code> 非常容易，只需将 <code>reducer</code> 作为参数传递给 <code>createStore()</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> todoApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">let</span> store = createStore(todoApp)</code></pre>
<p>这样，整个应用的 <code>store</code> 就创建完成了。虽然还没有界面，但我们已经可以测试数据处理逻辑了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { addTodo, toggleTodo } from './actions'

// 打印初始状态
console.log(store.getState())

// 注册监听器，在每次 state 更新时，打印日志
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起 actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(actions.toggleTodo(0))
store.dispatch(actions.toggleTodo(1))

// 停止监听
unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> { addTodo, toggleTodo } <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>

<span class="hljs-comment">// 打印初始状态</span>
<span class="hljs-built_in">console</span>.log(store.getState())

<span class="hljs-comment">// 注册监听器，在每次 state 更新时，打印日志</span>
<span class="hljs-keyword">const</span> unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  <span class="hljs-built_in">console</span>.log(store.getState())
)

<span class="hljs-comment">// 发起 actions</span>
store.dispatch(addTodo(<span class="hljs-string">'Learn about actions'</span>))
store.dispatch(addTodo(<span class="hljs-string">'Learn about reducers'</span>))
store.dispatch(addTodo(<span class="hljs-string">'Learn about store'</span>))
store.dispatch(actions.toggleTodo(<span class="hljs-number">0</span>))
store.dispatch(actions.toggleTodo(<span class="hljs-number">1</span>))

<span class="hljs-comment">// 停止监听</span>
unsubscribe();</code></pre>
<p>运行代码，控制台中就能看到下面的输出。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760719" src="https://static.alili.tech/img/remote/1460000006760719" alt="控制台输出" title="控制台输出" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">Data flow</h3>
<p>时刻谨记一点：<strong>严格的单向数据流是 Redux 架构的设计核心</strong>。</p>
<p>也就是说，对 <code>state</code> 树的任何修改都该通过 <code>action</code> 发起，然后经过一系列 <code>reducer</code> 组合的处理，最后返回一个新的 <code>state</code> 对象。</p>
<h3 id="articleHeader4">Take a try with Angular</h3>
<p>之前的举例已经将 redux 最基本的一套生命周期处理展示完毕了，但没有个界面显示总是不那么令人信服。Redux 官网的例子是将 Redux 同 React 一起使用，但如同一开始说的，Redux 更是一套方法论，它不单可以和 React 一同使用，也可以和 Angular 等其他框架一同使用。</p>
<p>虽然，同官网用的是不同的框架，但概念是相通的。</p>
<p>首先，页面都是由组件构成，组件又分为两大类：<strong>容器组件（Smart/Container Components）</strong>和<strong>展示组件（Dumb/Presentational Components）</strong>。</p>
<table>
<thead><tr>
<th> </th>
<th align="center">容器组件</th>
<th align="center">展示组件</th>
</tr></thead>
<tbody>
<tr>
<td>目的</td>
<td align="center">数据处理，state 更新</td>
<td align="center">界面展示</td>
</tr>
<tr>
<td>受 redux 影响</td>
<td align="center">是</td>
<td align="center">否</td>
</tr>
<tr>
<td>数据来源</td>
<td align="center"><code>store.subscribe()</code></td>
<td align="center">组件属性传递</td>
</tr>
<tr>
<td>修改数据</td>
<td align="center"><code>store.dispatch()</code></td>
<td align="center">调用通过组件属性传递的方法</td>
</tr>
</tbody>
</table>
<p>简单来说，容器组件就是通过 <code>store.subscribe()</code> 这个方法监听 <code>store</code> 中 <code>state</code> 的变化，而展示组件，就是平常使用的普通的组件，只有一点需要注意的是，所有数据修改都是通过父组件中传递下来的 <code>store.dispatch()</code> 方法来修改。</p>
<p>可以说，容器组件是整个界面显示的核心。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// todos/index.js
import angular from 'angular'
import template from './todos.html'
import controller from './todos'

const todoContainer = {
    controller,
    template
}

export default angular.module('todoContainer', [])
    .component('todoContainer', todoContainer)
    .name
    
// todos/todos.js
import store from '../../store'
import actions from '../../actions'

export default class TodosContainController {

    $onInit() {
        // 注册监听器，在每次 state 更新时，更新页面绑定内容
        this.unsubscribe = store.subscribe(() => {
                console.log(store.getState())
                this.todos = store.getState().todos
        })
    }

    addTodoItem(text) {
        store.dispatch(actions.addTodo(text))
    }

    toggleTodoItem(index) {
        store.dispatch(actions.toggleTodo(index))
    }

    $onDistory() {
        // 销毁监听器
        this.unsubscribe()
    }
}    

// todos/todos.html
<div>
    <add-todo add-todo-fn=&quot;$ctrl.addTodoItem(text)&quot;></add-todo>
    <todo-list todo-list=&quot;$ctrl.todos&quot; toggle-todo-fn=&quot;$ctrl.toggleTodoItem(index)&quot;></todo-list>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// todos/index.js</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">'angular'</span>
<span class="hljs-keyword">import</span> template <span class="hljs-keyword">from</span> <span class="hljs-string">'./todos.html'</span>
<span class="hljs-keyword">import</span> controller <span class="hljs-keyword">from</span> <span class="hljs-string">'./todos'</span>

<span class="hljs-keyword">const</span> todoContainer = {
    controller,
    template
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> angular.module(<span class="hljs-string">'todoContainer'</span>, [])
    .component(<span class="hljs-string">'todoContainer'</span>, todoContainer)
    .name
    
<span class="hljs-comment">// todos/todos.js</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../../store'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'../../actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodosContainController</span> </span>{

    $onInit() {
        <span class="hljs-comment">// 注册监听器，在每次 state 更新时，更新页面绑定内容</span>
        <span class="hljs-keyword">this</span>.unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(store.getState())
                <span class="hljs-keyword">this</span>.todos = store.getState().todos
        })
    }

    addTodoItem(text) {
        store.dispatch(actions.addTodo(text))
    }

    toggleTodoItem(index) {
        store.dispatch(actions.toggleTodo(index))
    }

    $onDistory() {
        <span class="hljs-comment">// 销毁监听器</span>
        <span class="hljs-keyword">this</span>.unsubscribe()
    }
}    

<span class="hljs-comment">// todos/todos.html</span>
&lt;div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">add-todo</span> <span class="hljs-attr">add-todo-fn</span>=<span class="hljs-string">"$ctrl.addTodoItem(text)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">add-todo</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">todo-list</span> <span class="hljs-attr">todo-list</span>=<span class="hljs-string">"$ctrl.todos"</span> <span class="hljs-attr">toggle-todo-fn</span>=<span class="hljs-string">"$ctrl.toggleTodoItem(index)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>Redux 官网并不建议直接这样使用 <code>store.subscribe()</code> 来监听数据的变化，而是调用 React Redux 库的 <code>connect()</code> 方法，因为 <code>connect</code> 方法做了许多性能上的优化。相对于 Angular，也有 <a href="https://github.com/angular-redux/ng-redux" rel="nofollow noreferrer" target="_blank">ng-redux</a> 和 <a href="https://github.com/angular-redux/ng2-redux" rel="nofollow noreferrer" target="_blank">ng2-redux</a> 提供了相同的方法。</p>
<p>鉴于展示组件与 redux 并没有太大的相关，就不在这里赘述了，有兴趣可以去 <a href="https://github.com/DiscipleD/Redux-demo/tree/master/src/todoMVC" rel="nofollow noreferrer" target="_blank">github</a> 上查看。</p>
<p>至此，一个简单的基于 Angular 并运用 Redux 的 todo MVC 应用就完成了。</p>
<h3 id="articleHeader5">最后</h3>
<p>如果你熟悉 Flux，那么这篇图文并茂的<a href="https://github.com/jasonslyvia/a-cartoon-intro-to-redux-cn" rel="nofollow noreferrer" target="_blank">文章</a>获取会对你有很大的帮助。</p>
<p>如果你是和我一样直接接触 Redux，那<a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a>是你的首选。</p>
<p>当然，你一定得看看 Redux 作者 Dan Abramov 自己录制的<a href="https://egghead.io/courses/getting-started-with-redux" rel="nofollow noreferrer" target="_blank">视频</a>，它会对你理解 Redux 有极大的帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 入门

## 原文链接
[https://segmentfault.com/a/1190000005925630](https://segmentfault.com/a/1190000005925630)

