---
title: 'Taro集成Redux快速上手' 
date: 2018-11-27 2:30:12
hidden: true
slug: 677grfsul7u
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x672C;&#x6587;&#x9002;&#x5408;&#x6709;&#x4E00;&#x5B9A;React&#x548C;Redux&#x57FA;&#x7840;&#x7684;&#x7528;&#x6237;&#x9605;&#x8BFB;&#x3002;</blockquote><h2 id="articleHeader0">&#x524D;&#x8A00;&#x7684;&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x88AB;&#x4E00;&#x6B3E;&#x6765;&#x81EA;&#x4EAC;&#x4E1C;&#x51F9;&#x51F8;&#x5B9E;&#x9A8C;&#x5BA4;&#x7684;&#x591A;&#x7EC8;&#x7AEF;&#x5F00;&#x53D1;&#x6846;&#x67B6;<strong><em>Taro</em></strong>&#x5438;&#x7C89;&#x4E86;&#xFF0C;&#x5B98;&#x65B9;&#x5BF9; Taro &#x7684;&#x7B80;&#x4ECB;&#x662F;<strong><em>&#x4F7F;&#x7528;React&#x8BED;&#x6CD5;&#xFF0C;&#x4E00;&#x952E;&#x751F;&#x6210;&#x591A;&#x7EC8;&#x7AEF;&#x5E94;&#x7528;</em></strong>&#xFF08;&#x5305;&#x62EC;&#x5C0F;&#x7A0B;&#x5E8F; / H5 / &#x5FEB;&#x5E94;&#x7528; / RN &#x7B49;&#xFF09;&#xFF0C;&#x800C;&#x76EE;&#x524D; Github &#x7684; Star &#x4E5F;&#x8FBE;&#x5230;&#x4E86;&#x975E;&#x5E38;&#x53EF;&#x89C2;&#x7684;&#x6570;&#x91CF;&#xFF1A;<strong>4k+</strong>&#x3002;&#x5BF9;&#x6B64;&#xFF0C;&#x7B14;&#x8005;&#x4E5F;&#x5C1D;&#x4E86;&#x628A;&#x9C9C;&#xFF0C;&#x4F53;&#x9A8C;&#x4E86;&#x4E0B;&#x5982;&#x4F55;&#x4F7F;&#x7528;Taro&#x5199;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x3002;&#x611F;&#x89C9;&#x8FD8;&#x662F;&#x5341;&#x5206;&#x7075;&#x6D3B;&#x6613;&#x7528;&#xFF08;&#x4E00;&#x6C14;&#x5475;&#x6210;&#xFF0C;&#x90FD;&#x6CA1;&#x9047;&#x5230;bug&#xFF01;&#xFF09;&#xFF0C;&#x5E76;&#x4E14; Taro &#x8FD8;&#x96C6;&#x6210;&#x4E86; Redux&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x5C0F;&#x7A0B;&#x5E8F;&#x6CA1;&#x6709;&#x6570;&#x636E;&#x6D41;&#x6846;&#x67B6;&#x7684;&#x75DB;&#x70B9;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x8D34;&#x4E00;&#x4E2A; Taro &#x7684;<a href="https://nervjs.github.io/taro/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x884C;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x4E0B;&#xFF5E;&#x4E5F;&#x53EF;&#x4EE5;&#x548C;&#x6211;&#x4EA4;&#x6D41;&#xFF5E;&#x563F;&#x563F;</p><p><span class="img-wrap"><img data-src="/img/bVbcvYp?w=60&amp;h=74" src="https://static.alili.tech/img/bVbcvYp?w=60&amp;h=74" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x524D;&#x8A00;</h2><p>Redux&#x662F;JavaScript &#x72B6;&#x6001;&#x5BB9;&#x5668;&#xFF0C;&#x63D0;&#x4F9B;&#x53EF;&#x9884;&#x6D4B;&#x5316;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x89C4;&#x6A21;&#x6BD4;&#x8F83;&#x5927;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#xFF0C;&#x9875;&#x9762;&#x72B6;&#x6001;&#xFF0C;&#x6570;&#x636E;&#x7F13;&#x5B58;&#xFF0C;&#x9700;&#x8981;&#x7BA1;&#x7406;&#x7684;&#x4E1C;&#x897F;&#x592A;&#x591A;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5F15;&#x5165;Redux&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x7BA1;&#x7406;&#x8FD9;&#x4E9B;&#x72B6;&#x6001;&#xFF0C;<strong>&#x540C;&#x4E00;&#x6570;&#x636E;&#xFF0C;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#xFF0C;&#x5E94;&#x7528;&#x5168;&#x5C40;&#x5171;&#x4EAB;</strong>&#x3002;</p><p>&#x800C;Taro&#x4E5F;&#x975E;&#x5E38;&#x53CB;&#x597D;&#x5730;&#x4E3A;&#x5F00;&#x53D1;&#x8005;&#x63D0;&#x4F9B;&#x4E86;&#x79FB;&#x690D;&#x7684;Redux&#x3002;</p><h2 id="articleHeader2">&#x4F9D;&#x8D56;</h2><p>&#x4E3A;&#x4E86;&#x66F4;&#x65B9;&#x4FBF;&#x5730;&#x4F7F;&#x7528;<code>Redux</code>&#xFF0C;Taro&#x63D0;&#x4F9B;&#x4E86;&#x4E0E;<code>react-redux</code> API &#x51E0;&#x4E4E;&#x4E00;&#x81F4;&#x7684;&#x5305; <code>@tarojs/redux</code> &#x6765;&#x8BA9;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x83B7;&#x5F97;&#x66F4;&#x52A0;&#x826F;&#x597D;&#x7684;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x3002;</p><p>&#x5F00;&#x53D1;&#x524D;&#x9700;&#x8981;&#x5B89;&#x88C5;<code>redux</code>&#x548C;<code>@tarojs/redux</code>&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</p><blockquote>ps&#xFF1A;&#x5982;&#x679C;&#x5728;h5&#x8981;&#x4F7F;&#x7528;redux&#x7684;&#x8BDD;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5F15;&#x5165;<code>nerv-redux</code>&#x8FD9;&#x4E2A;&#x5E93;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn add redux @tarojs/redux redux-action redux-logger
# &#x6216;&#x8005;&#x4F7F;&#x7528; npm
$ npm install --save redux @tarojs/redux redux-action redux-logger" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>yarn add redux <span class="hljs-variable">@tarojs</span>/redux redux-action redux-logger
<span class="hljs-comment"># &#x6216;&#x8005;&#x4F7F;&#x7528; npm</span>
<span class="hljs-variable">$ </span>npm install --save redux <span class="hljs-variable">@tarojs</span>/redux redux-action redux-logger</code></pre><h2 id="articleHeader3">&#x793A;&#x4F8B;</h2><p>&#x4E0B;&#x9762;&#x901A;&#x8FC7;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Todolist&#x5FEB;&#x901F;&#x4E0A;&#x624B;Redux&#x3002;</p><h3 id="articleHeader4">1. &#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><p>&#x9996;&#x5148;&#x901A;&#x8FC7;&#x76EE;&#x5F55;&#x5212;&#x5206;&#x6211;&#x4EEC;&#x7684;<code>store</code>/<code>reducers</code>/<code>actions</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015336961?w=348&amp;h=360" src="https://static.alili.tech/img/remote/1460000015336961?w=348&amp;h=360" alt="2018-06-12-15-37-12" title="2018-06-12-15-37-12" style="cursor:pointer;display:inline"></span></p><p>&#x5206;&#x522B;&#x5728;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x521B;&#x5EFA;<code>index.js</code>&#xFF0C;&#x4F5C;&#x4E3A;&#x4E09;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x4E3B;&#x6587;&#x4EF6;&#x3002;<code>reducers</code>&#x548C;<code>actions</code>&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x89C4;&#x5212;&#x597D;&#x529F;&#x80FD;&#x4E4B;&#x540E;&#x518D;&#x6765;&#x5904;&#x7406;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store/index.js

import { createStore, applyMiddleware } from &apos;redux&apos;

// &#x5F15;&#x5165;&#x9700;&#x8981;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;
import thunkMiddleware from &apos;redux-thunk&apos;
import { createLogger } from &apos;redux-logger&apos;

// &#x5F15;&#x5165;&#x6839;reducers
import rootReducer from &apos;../reducers&apos;

const middlewares = [
  thunkMiddleware,
  createLogger()
]

// &#x521B;&#x5EFA;store
export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// store/index.js</span>

<span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>

<span class="hljs-comment">// &#x5F15;&#x5165;&#x9700;&#x8981;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</span>
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-thunk&apos;</span>
<span class="hljs-keyword">import</span> { createLogger } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-logger&apos;</span>

<span class="hljs-comment">// &#x5F15;&#x5165;&#x6839;reducers</span>
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../reducers&apos;</span>

<span class="hljs-keyword">const</span> middlewares = [
  thunkMiddleware,
  createLogger()
]

<span class="hljs-comment">// &#x521B;&#x5EFA;store</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">configStore</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> store = createStore(rootReducer, applyMiddleware(...middlewares))
  <span class="hljs-keyword">return</span> store
}
</code></pre><h3 id="articleHeader5">2. &#x7F16;&#x5199;Todos</h3><p>&#x9996;&#x5148;&#x5728;<code>app.js</code>&#x4E2D;&#x5F15;&#x5165;&#x4E00;&#x5F00;&#x59CB;&#x5B9A;&#x4E49;&#x597D;&#x7684;<code>store</code>&#xFF0C;&#x4F7F;&#x7528;<code>@tarojs/redux</code>&#x4E2D;&#x63D0;&#x4F9B;&#x7684;<code>Provider</code>&#x7EC4;&#x4EF6;&#x5C06;&#x524D;&#x9762;&#x5199;&#x597D;&#x7684;<code>store</code>&#x63A5;&#x5165;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x88AB;<code>Provider</code>&#x5305;&#x88F9;&#x7684;&#x9875;&#x9762;&#x90FD;&#x80FD;&#x5171;&#x4EAB;&#x5230;&#x5E94;&#x7528;&#x7684;<code>store</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Taro, { Component } from &apos;@tarojs/taro&apos;
import { Provider } from &apos;@tarojs/redux&apos;

import configStore from &apos;./store&apos;
import Index from &apos;./pages/index&apos;

import &apos;./app.scss&apos;

const store = configStore()

class App extends Component {
  ...
  render () {
    return (
      &lt;Provider store={store}&gt;
        &lt;Index /&gt;
      &lt;/Provider&gt;  
    )
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Taro, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/taro&apos;</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/redux&apos;</span>

<span class="hljs-keyword">import</span> configStore <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./pages/index&apos;</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./app.scss&apos;</span>

<span class="hljs-keyword">const</span> store = configStore()

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Index</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>  
    )
  }
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x5F0F;&#x5F00;&#x59CB;&#x89C4;&#x5212;Todos&#x5E94;&#x7528;&#x7684;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x4E86;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x65B0;&#x5EFA;<code>constants</code>&#x6587;&#x4EF6;&#x5939;&#x6765;&#x5B9A;&#x4E49;&#x4E00;&#x7CFB;&#x5217;&#x6240;&#x9700;&#x7684;<code>action type</code>&#x5E38;&#x91CF;&#x3002;&#x4F8B;&#x5982;Todos&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x65B0;&#x589E;<code>ADD</code>&#x548C;<code>DELETE</code>&#x4E24;&#x4E2A;<code>action type</code>&#x6765;&#x533A;&#x5206;&#x65B0;&#x589E;&#x548C;&#x5220;&#x9664;Todo&#x6307;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/constants/todos.js

export const ADD = &apos;ADD&apos;
export const DELETE = &apos;DELETE&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">// src/constants/todos.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD = <span class="hljs-string">&apos;ADD&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELETE = <span class="hljs-string">&apos;DELETE&apos;</span></code></pre><p>&#x7136;&#x540E;&#x5F00;&#x59CB;&#x521B;&#x5EFA;&#x5904;&#x7406;&#x8FD9;&#x4E24;&#x4E2A;&#x6307;&#x4EE4;&#x7684;<code>reducer</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/reducers/index.js

import { combineReducers } from &apos;redux&apos;
import { ADD, DELETE } from &apos;../constants/todos&apos;

// &#x5B9A;&#x4E49;&#x521D;&#x59CB;&#x72B6;&#x6001;
const INITIAL_STATE = {
  todos: [
    {id: 0, text: &apos;&#x7B2C;&#x4E00;&#x6761;todo&apos;}
  ]
}

function todos (state = INITIAL_STATE, action) {
  // &#x83B7;&#x53D6;&#x5F53;&#x524D;todos&#x6761;&#x6570;&#xFF0C;&#x7528;&#x4EE5;id&#x81EA;&#x589E;
  let todoNum = state.todos.length
  
  switch (action.type) {  
    // &#x6839;&#x636E;&#x6307;&#x4EE4;&#x5904;&#x7406;todos
    case ADD:      
      return {
        ...state,
        todos: state.todos.concat({
          id: todoNum,
          text: action.data
        })
      }
    case DELETE:
      let newTodos = state.todos.filter(item =&gt; {
        return item.id !== action.id
      })
      
      return {
        ...state,
        todos: newTodos
      }
    default:
      return state
  }
}

export default combineReducers({
  todos
})

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>// src/reducers/index.js

import { combineReducers } <span class="hljs-keyword">from</span> &apos;redux&apos;
import { ADD, DELETE } <span class="hljs-keyword">from</span> &apos;../constants/todos&apos;

// &#x5B9A;&#x4E49;&#x521D;&#x59CB;&#x72B6;&#x6001;
const INITIAL_STATE = {
  todos: [
    {id: <span class="hljs-number">0</span>, text: &apos;&#x7B2C;&#x4E00;&#x6761;todo&apos;}
  ]
}

function todos (<span class="hljs-keyword">state</span> = INITIAL_STATE, action) {
  // &#x83B7;&#x53D6;&#x5F53;&#x524D;todos&#x6761;&#x6570;&#xFF0C;&#x7528;&#x4EE5;id&#x81EA;&#x589E;
  let todoNum = <span class="hljs-keyword">state</span>.todos.length
  
  switch (action.type) {  
    // &#x6839;&#x636E;&#x6307;&#x4EE4;&#x5904;&#x7406;todos
    case ADD:      
      return {
        ...<span class="hljs-keyword">state</span>,
        todos: <span class="hljs-keyword">state</span>.todos.concat({
          id: todoNum,
          text: action.data
        })
      }
    case DELETE:
      let newTodos = <span class="hljs-keyword">state</span>.todos.filter(item =&gt; {
        return item.id !== action.id
      })
      
      return {
        ...<span class="hljs-keyword">state</span>,
        todos: newTodos
      }
    <span class="hljs-keyword">default</span>:
      return <span class="hljs-keyword">state</span>
  }
}

export <span class="hljs-keyword">default</span> combineReducers({
  todos
})

</code></pre><p>&#x63A5;&#x7740;&#x5728;<code>action</code>&#x4E2D;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x6307;&#x4EE4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/actions/index.js

import { ADD, DELETE } from &apos;../constants/todos&apos;

export const add = (data) =&gt; {
  return {
    data,
    type: ADD
  }
}

export const del = (id) =&gt; {
  return {
    id,
    type: DELETE
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// src/actions/index.js</span>

<span class="hljs-keyword">import</span> { ADD, DELETE } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../constants/todos&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> add = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    data,
    <span class="hljs-keyword">type</span>: ADD
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> del = <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    id,
    <span class="hljs-keyword">type</span>: DELETE
  }
}
</code></pre><p>&#x5B8C;&#x6210;&#x4E0A;&#x8FF0;&#x4E09;&#x6B65;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;Todos&#x5E94;&#x7528;&#x7684;&#x4E3B;&#x9875;&#x4F7F;&#x7528;&#x76F8;&#x5E94;<code>action</code>&#x4FEE;&#x6539;&#x5E76;&#x53D6;&#x5F97;&#x65B0;&#x7684;<code>store</code>&#x6570;&#x636E;&#x4E86;&#x3002;&#x6765;&#x770B;&#x4E00;&#x773C;Todos&#x7684;<code>index.js</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/pages/index/index.js

import Taro, { Component } from &apos;@tarojs/taro&apos;
import { View, Input, Text } from &apos;@tarojs/components&apos;
import { connect } from &apos;@tarojs/redux&apos;
import &apos;./index.scss&apos;

import { add, del } from &apos;../../actions/index&apos;

class Index extends Component {
  config = {
    navigationBarTitleText: &apos;&#x9996;&#x9875;&apos;
  }

  constructor () {
    super ()

    this.state = {
      newTodo: &apos;&apos;
    }
  }

  saveNewTodo (e) {
    let { newTodo } = this.state
    if (!e.detail.value || e.detail.value === newTodo) return

    this.setState({
      newTodo: e.detail.value
    })
  }

  addTodo () {
    let { newTodo } = this.state
    let { add } = this.props
    
    if (!newTodo) return

    add(newTodo)
    this.setState({
      newTodo: &apos;&apos;
    })
  }

  delTodo (id) {
    let { del } = this.props
    del(id)
  }

  render () {
    // &#x83B7;&#x53D6;&#x672A;&#x7ECF;&#x5904;&#x7406;&#x7684;todos&#x5E76;&#x5C55;&#x793A;
    let { newTodo } = this.state
    let { todos, add, del } = this.props  

    const todosJsx = todos.map(todo =&gt; {
      return (
        &lt;View className=&apos;todos_item&apos;&gt;&lt;Text&gt;{todo.text}&lt;/Text&gt;&lt;View className=&apos;del&apos; onClick={this.delTodo.bind(this, todo.id)}&gt;-&lt;/View&gt;&lt;/View&gt;
      )
    })

    return (
      &lt;View className=&apos;index todos&apos;&gt;
        &lt;View className=&apos;add_wrap&apos;&gt;
          &lt;Input placeholder=&quot;&#x586B;&#x5199;&#x65B0;&#x7684;todo&quot; onBlur={this.saveNewTodo.bind(this)} value={newTodo} /&gt;
          &lt;View className=&apos;add&apos; onClick={this.addTodo.bind(this)}&gt;+&lt;/View&gt;
        &lt;/View&gt;
        &lt;View&gt;{ todosJsx }&lt;/View&gt;  
      &lt;/View&gt;
    )
  }
}

export default connect (({ todos }) =&gt; ({
  todos: todos.todos
}), (dispatch) =&gt; ({
  add (data) {
    dispatch(add(data))
  },
  del (id) {
    dispatch(del(id))
  }
}))(Index)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// src/pages/index/index.js</span>

<span class="hljs-keyword">import</span> Taro, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/taro&apos;</span>
<span class="hljs-keyword">import</span> { View, Input, Text } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/components&apos;</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/redux&apos;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./index.scss&apos;</span>

<span class="hljs-keyword">import</span> { add, del } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../actions/index&apos;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  config = {
    <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>
  }

  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">super</span> ()

    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">newTodo</span>: <span class="hljs-string">&apos;&apos;</span>
    }
  }

  saveNewTodo (e) {
    <span class="hljs-keyword">let</span> { newTodo } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">if</span> (!e.detail.value || e.detail.value === newTodo) <span class="hljs-keyword">return</span>

    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">newTodo</span>: e.detail.value
    })
  }

  addTodo () {
    <span class="hljs-keyword">let</span> { newTodo } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">let</span> { add } = <span class="hljs-keyword">this</span>.props
    
    <span class="hljs-keyword">if</span> (!newTodo) <span class="hljs-keyword">return</span>

    add(newTodo)
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">newTodo</span>: <span class="hljs-string">&apos;&apos;</span>
    })
  }

  delTodo (id) {
    <span class="hljs-keyword">let</span> { del } = <span class="hljs-keyword">this</span>.props
    del(id)
  }

  render () {
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x672A;&#x7ECF;&#x5904;&#x7406;&#x7684;todos&#x5E76;&#x5C55;&#x793A;</span>
    <span class="hljs-keyword">let</span> { newTodo } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">let</span> { todos, add, del } = <span class="hljs-keyword">this</span>.props  

    <span class="hljs-keyword">const</span> todosJsx = todos.map(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;todos_item&apos;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;del&apos;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.delTodo.bind(this,</span> <span class="hljs-attr">todo.id</span>)}&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
      )
    })

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;index todos&apos;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;add_wrap&apos;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Input</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x586B;&#x5199;&#x65B0;&#x7684;todo&quot;</span> <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{this.saveNewTodo.bind(this)}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{newTodo}</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;add&apos;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addTodo.bind(this)}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>{ todosJsx }<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>  
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
    )
  }
}

export default connect (({ todos }) =&gt; ({
  todos: todos.todos
}), (dispatch) =&gt; ({
  add (data) {
    dispatch(add(data))
  },
  del (id) {
    dispatch(del(id))
  }
}))(Index)
</span></code></pre><p>&#x6700;&#x540E;&#x6765;&#x770B;&#x4E00;&#x773C;&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#xFF5E;&#xFF5E;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015336962?w=316&amp;h=560" src="https://static.alili.tech/img/remote/1460000015336962?w=316&amp;h=560" alt="todos" title="todos" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Taro集成Redux快速上手

## 原文链接
[https://segmentfault.com/a/1190000015336958](https://segmentfault.com/a/1190000015336958)

