---
title: '关于Redux的一些总结(一)：Action & 中间件 & 异步' 
date: 2019-02-03 2:30:40
hidden: true
slug: e1lzyae8tkk
categories: [reprint]
---

{{< raw >}}

                    
<p>在<a href="https://github.com/dwqs/blog/issues/14" rel="nofollow noreferrer" target="_blank">浅说Flux开发</a>中，简单介绍了Flux及其开发方式。Flux可以说是一个框架，其有本身的 <code>Dispatcher</code> 接口供开发者；也可以说是一种数据流单向控制的架构设计，围绕单向数据流的核心，其定义了一套行为规范，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006762475" src="https://static.alili.tech/img/remote/1460000006762475" alt="flux" title="flux" style="cursor: pointer; display: inline;"></span></p>
<p>Redux的设计就继承了Flux的架构，并将其完善，提供了多个API供开发者调用。借着react-redux，可以很好的与React结合，开发组件化程度极高的现代Web应用。本文是笔者近半年使用react+redux组合的一些总结，不当之处，敬请谅解。</p>
<h2 id="articleHeader0">Action</h2>
<p>Action是数据从应用传递到 store/state 的载体，也是开启一次完成数据流的开始。</p>
<p>以添加一个todo的Action为例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type:'add_todo',
    data:'我要去跑步'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">type</span>:<span class="hljs-string">'add_todo'</span>,
    data:<span class="hljs-string">'我要去跑步'</span>
}</code></pre>
<p>这样就定义了一个添加一条todo的Action，然后就能通过某个行为去触发这个Action，由这个Action携带的数据(data)去更新store(state/reducer)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.dispatch({
    type:'add_todo',
    data:'your data'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">store</span><span class="hljs-selector-class">.dispatch</span>({
    <span class="hljs-attribute">type</span>:<span class="hljs-string">'add_todo'</span>,
    data:<span class="hljs-string">'your data'</span>
})</code></pre>
<p><code>type</code> 是一个常量，Action必备一个字段，用于标识该Action的类型。在项目初期，这样定义Action也能愉快的撸码，但是随着项目的复杂度增加，这种方式会让代码显得冗余，因为如果有多个行为触发同一个Action，则这个Action要写多次；同时，也会造成代码结构不清晰。因而，得更改创建Action的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ADD_TODO = 'add_todo';

let addTodo = (data='default data') => {
    return {
        type: ADD_TODO,
        data: data
    }
}

//触发action
store.dispatch(addTodo());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>const ADD_TODO = <span class="hljs-string">'add_todo'</span>;

<span class="hljs-keyword">let</span> addTodo = (<span class="hljs-built_in">data</span>=<span class="hljs-string">'default data'</span>) =&gt; {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: ADD_TODO,
        <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>
    }
}

<span class="hljs-comment">//触发action</span>
store.dispatch(addTodo());</code></pre>
<p>更改之后，代码清晰多了，如果有多个行为触发同一个Action，只要调用一下函数 <code>addTodo</code> 就行，并将Action要携带的数据传递给该函数。类似 <code>addTodo</code> 这样的函数，称之为 Action Creator。Action Creator 的唯一功能就是返回一个Action供 <code>dispatch</code> 进行调用。</p>
<p>但是，这样的Action Creator 返回的Action 并不是一个标准的Action。在Flux的架构中，一个Action要符合 FSA(Flux Standard Action) 规范，需要满足如下条件：</p>
<ul>
<li><p>是一个纯文本对象</p></li>
<li><p>只具备 <code>type</code> 、<code>payload</code>、<code>error</code> 和 <code>meta</code> 中的一个或者多个属性。<code>type</code> 字段不可缺省，其它字段可缺省</p></li>
<li><p>若 Action 报错，<code>error</code> 字段不可缺省，切必须为 true</p></li>
</ul>
<p><code>payload</code> 是一个对象，用作Action携带数据的载体。所以，上述的写法可以更改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let addTodo = (data='default data') => {
    return {
        type: ADD_TODO,
        payload: {
            data
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> addTodo = (<span class="hljs-built_in">data</span>=<span class="hljs-string">'default data'</span>) =&gt; {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: ADD_TODO,
        payload: {
            <span class="hljs-built_in">data</span>
        }
    }
}</code></pre>
<p>在 redux 全家桶中，可以利用 redux-actions 来创建符合 FSA 规范的Action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {creatAction} from 'redux-actions';

let addTodo = creatAction(ADD_TODO)
//same as
let addTodo = creatAction(ADD_TODO,data=>data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {creatAction} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;

<span class="hljs-keyword">let</span> addTodo = creatAction(ADD_TODO)
<span class="hljs-comment">//same as</span>
<span class="hljs-keyword">let</span> addTodo = creatAction(ADD_TODO,<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>data)</code></pre>
<p>可以采用如下一个简单的方式检验一个Action是否符合FSA标准：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isFSA = Object.keys(action).every((item)=>{
   return  ['payload','type','error','meta'].indexOf(item) >  -1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> isFSA = <span class="hljs-built_in">Object</span>.keys(action).every(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
   <span class="hljs-keyword">return</span>  [<span class="hljs-string">'payload'</span>,<span class="hljs-string">'type'</span>,<span class="hljs-string">'error'</span>,<span class="hljs-string">'meta'</span>].indexOf(item) &gt;  <span class="hljs-number">-1</span>
})</code></pre>
<h2 id="articleHeader1">中间件</h2>
<p>在我看来，Redux提高了两个非常重要的功能，一是 Reducer 拆分，二是中间件。Reducer 拆分可以使组件获取其最小属性(state)，而不需要整个Store。中间件则可以在 Action Creator 返回最终可供 dispatch 调用的 action 之前处理各种事情，如异步API调用、日志记录等，是扩展 Redux 功能的一种推荐方式。</p>
<p>Redux 提供了 <code>applyMiddleware(...middlewares)</code> 来将中间件应用到 createStore。applyMiddleware 会返回一个函数，该函数接收原来的 creatStore 作为参数，返回一个应用了 middlewares 的增强后的 creatStore。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    //接收createStore参数
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []
    
    //传递给中间件的参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    
    //注册中间件调用链
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    
    //返回经middlewares增强后的createStore
    return {
      ...store,
      dispatch
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span><span class="hljs-params">(<span class="hljs-rest_arg">...middlewares</span>)</span> </span>{
  <span class="hljs-keyword">return</span> (createStore) =&gt; (reducer, preloadedState, enhancer) =&gt; {
    <span class="hljs-comment">//接收createStore参数</span>
    <span class="hljs-keyword">var</span> store = createStore(reducer, preloadedState, enhancer)
    <span class="hljs-keyword">var</span> dispatch = store.dispatch
    <span class="hljs-keyword">var</span> chain = []
    
    <span class="hljs-comment">//传递给中间件的参数</span>
    <span class="hljs-keyword">var</span> middlewareAPI = {
      getState: store.getState,
      dispatch: (action) =&gt; dispatch(action)
    }
    
    <span class="hljs-comment">//注册中间件调用链</span>
    chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    
    <span class="hljs-comment">//返回经middlewares增强后的createStore</span>
    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    }
  }
}</code></pre>
<p>创建 store 的方式也会因是否使用中间件而略有区别。未应用中间价之前，创建 store 的方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore} from 'redux';
import reducers from './reducers/index';

export let store = createStore(reducers);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> store = createStore(reducers);</code></pre>
<p>应用中间价之后，创建 store 的方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore，applyMiddleware} from 'redux';
import reducers from './reducers/index';

let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
export let store = createStoreWithMiddleware(reducers);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {createStore，applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;

<span class="hljs-keyword">let</span> createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> store = createStoreWithMiddleware(reducers);</code></pre>
<p>那么怎么自定义一个中间件呢？</p>
<p>根据 <a href="http://redux.js.org/docs/api/applyMiddleware.html" rel="nofollow noreferrer" target="_blank">redux 文档</a>，中间件的签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="({ getState, dispatch }) => next => action" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">({ getState, dispatch }) =&gt; next =&gt; action</code></pre>
<p>根据上文的 <code>applyMiddleware</code> 源码，每个中间件接收 getState &amp; dispatch 作为参数，并返回一个函数，该函数会被传入下一个中间件的 dispatch 方法，并返回一个接收 action 的新函数。</p>
<p>以一个打印 dispatch action 前后的 state 为例，创建一个中间件示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function({getState,dispatch}) {
    return (next) => (action) => {
        console.log('pre state', getState());
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        next(action);
        console.log('after dispatch', getState());
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{getState,dispatch}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> (action) =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'pre state'</span>, getState());
        <span class="hljs-comment">// 调用 middleware 链中下一个 middleware 的 dispatch。</span>
        next(action);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'after dispatch'</span>, getState());
    }
}</code></pre>
<p>在创建 store 的文件中调用该中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore,applyMiddleware} from 'redux';

import reducers from './reducers/index';
import log from '../lib/log';

//export let store = createStore(reducers);

//应用中间件log
let createStoreWithLog = applyMiddleware(log)(createStore);
export let store = createStoreWithLog(reducers);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {createStore,applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-keyword">import</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;
<span class="hljs-keyword">import</span> log <span class="hljs-keyword">from</span> <span class="hljs-string">'../lib/log'</span>;

<span class="hljs-comment">//export let store = createStore(reducers);</span>

<span class="hljs-comment">//应用中间件log</span>
<span class="hljs-keyword">let</span> createStoreWithLog = applyMiddleware(log)(createStore);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> store = createStoreWithLog(reducers);</code></pre>
<p>可以在控制台看到输出：</p>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/272/306/2723068311-57bc91cc94c15_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/272/306/2723068311-57bc91cc94c15_articlex" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>可以对 store 应用多个中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import log from '../lib/log';
import log2 from '../lib/log2';

let createStoreWithLog = applyMiddleware(log,log2)(createStore);
export let store = createStoreWithLog(reducers);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> <span class="hljs-built_in">log</span> from '../lib/<span class="hljs-built_in">log</span>';
<span class="hljs-keyword">import</span> <span class="hljs-built_in">log2</span> from '../lib/<span class="hljs-built_in">log2</span>';

let createStoreWithLog = applyMiddleware(<span class="hljs-built_in">log</span>,<span class="hljs-built_in">log2</span>)(createStore);
export let store = createStoreWithLog(reducers);</code></pre>
<p>log2 也是一个简单的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function({getState,dispatch}) {
    return (next) => (action) => {
        console.log('我是第二个中间件1');
        next(action);
        console.log('我是第二个中间件2');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{getState,dispatch}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> (action) =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是第二个中间件1'</span>);
        next(action);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是第二个中间件2'</span>);
    }
}</code></pre>
<p>看控制台的输出：</p>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/550/097/550097178-57bc93deb3d9c_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/550/097/550097178-57bc93deb3d9c_articlex" alt="img2" title="img2" style="cursor: pointer; display: inline;"></span></p>
<p><strong>应用多个中间件时，中间件调用链中任何一个缺少 <code>next(action)</code> 的调用，都会导致 action 执行失败</strong></p>
<h2 id="articleHeader2">异步</h2>
<p>Redux 本身不处理异步行为，需要依赖中间件。结合 <a href="https://github.com/acdlite/redux-actions" rel="nofollow noreferrer" target="_blank">redux-actions</a> 使用，Redux 有两个推荐的异步中间件：</p>
<ul>
<li><p><a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a></p></li>
<li><p><a href="https://github.com/acdlite/redux-promise" rel="nofollow noreferrer" target="_blank">redux-promise</a></p></li>
</ul>
<p>两个中间件的源码都是非常简单的，redux-thunk 的源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;</code></pre>
<p>从源码可知，action creator 需要返回一个函数给 redux-thunk 进行调用，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export let addTodoWithThunk = (val) => async (dispatch, getState)=>{
    //请求之前的一些处理
        
    let value = await Promise.resolve(val + ' thunk');
    dispatch({
        type:CONSTANT.ADD_TO_DO_THUNK,
        payload:{
            value
        }
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> addTodoWithThunk = <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch, getState)=&gt;{
    <span class="hljs-comment">//请求之前的一些处理</span>
        
    <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(val + <span class="hljs-string">' thunk'</span>);
    dispatch({
        <span class="hljs-keyword">type</span>:CONSTANT.ADD_TO_DO_THUNK,
        payload:{
            value
        }
    });
};</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVCjJg" src="https://static.alili.techhttps://segmentfault.com/img/bVCjJg" alt="thunk" title="thunk" style="cursor: pointer;"></span></p>
<p>这里之所以不用 createAction，如前文所说，因为 createAction 会返回一个 FSA 规范的 action，该 action 会是一个对象，而不是一个 function：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type: &quot;add_to_do_thunk&quot;,
    payload: function(){}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">type</span>: <span class="hljs-string">"add_to_do_thunk"</span>,
    payload: <span class="hljs-built_in">function</span>(){}
}</code></pre>
<p>如果要使用 createAction，则要自定义一个异步中间件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export let addTodoWithCustom = createAction(CONSTANT.ADD_TO_DO_CUSTOM, (val) => async (dispatch, getState)=>{
    let value = await Promise.resolve(val + ' custom');
    return {
        value
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> addTodoWithCustom = createAction(CONSTANT.ADD_TO_DO_CUSTOM, <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch, getState)=&gt;{
    <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(val + <span class="hljs-string">' custom'</span>);
    <span class="hljs-keyword">return</span> {
        value
    };
});</code></pre>
<p>在经过中间件处理时，先判断 action.payload 是否是一个函数，是则执行函数，否则交给 next 处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(typeof action.payload === 'function'){
    let res = action.payload(dispatch, getState);
} else {
    next(action);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">if</span>(<span class="hljs-built_in">typeof</span> <span class="hljs-built_in">action</span>.payload === <span class="hljs-string">'function'</span>){
    let res = <span class="hljs-built_in">action</span>.payload(dispatch, getState);
} <span class="hljs-keyword">else</span> {
    next(<span class="hljs-built_in">action</span>);
}</code></pre>
<p>而 async 函数返回一个 Promise，因而需要作进一步处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.then(
    (result) => {
        dispatch({...action, payload: result});
    },
    (error) => {
        dispatch({...action, payload: error, error: true});
    }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>res.<span class="hljs-keyword">then</span>(
    <span class="hljs-function"><span class="hljs-params">(result)</span> =&gt;</span> {
        dispatch({...action, <span class="hljs-name">payload</span>: result});
    },
    <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>)</span> =&gt;</span> {
        dispatch({...action, <span class="hljs-name">payload</span>: <span class="hljs-built_in">error</span>, <span class="hljs-name">error</span>: <span class="hljs-literal">true</span>});
    }
);</code></pre>
<p>这样就自定义了一个异步中间件，效果如下：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVCjIP" src="https://static.alili.techhttps://segmentfault.com/img/bVCjIP" alt="custom" title="custom" style="cursor: pointer;"></span></p>
<p>当然，我们可以对函数执行后的结果是否是Promise作一个判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPromise (val) {
    return val &amp;&amp; typeof val.then === 'function';
}

//对执行结果是否是Promise
if (isPromise(res)){
    //处理
} else {
    dispatch({...action, payload: res});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">function</span> isPromise (<span class="hljs-keyword">val</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">val</span> &amp;&amp; typeof <span class="hljs-keyword">val</span>.<span class="hljs-keyword">then</span> === '<span class="hljs-keyword">function</span>';
}

<span class="hljs-comment">//对执行结果是否是Promise</span>
<span class="hljs-keyword">if</span> (isPromise(res)){
    <span class="hljs-comment">//处理</span>
} <span class="hljs-keyword">else</span> {
    dispatch({...action, payload: res});
}</code></pre>
<p>那么，怎么利用 redux-promise 呢？redux-promise 是能处理符合 FSA 规范的 action 的，其对异步处理的关键源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="action.payload.then(
    result => dispatch({ ...action, payload: result }),
    error => {
        dispatch({ ...action, payload: error, error: true });
        return Promise.reject(error);
    }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>action.payload.then(
    result =&gt; dispatch({ ...action, payload: result }),
    <span class="hljs-keyword">error</span> =&gt; {
        dispatch({ ...action, payload: <span class="hljs-keyword">error</span>, <span class="hljs-keyword">error</span>: <span class="hljs-keyword">true</span> });
        <span class="hljs-function"><span class="hljs-keyword">return</span> Promise.<span class="hljs-title">reject</span><span class="hljs-params">(<span class="hljs-keyword">error</span>)</span></span>;
    }
)</code></pre>
<p>因而，返回的 payload 不再是一个函数，而是一个 Promise。而 async 函数执行后就是返回一个 Promise，所以，让上文定义的 async 函数自执行一次就可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export let addTodoWithPromise = createAction(CONSTANT.ADD_TO_DO_PROMISE, (val) =>
    (async (dispatch, getState)=>{
        let value = await Promise.resolve(val + ' promise');
        return {
            value
        };
    })()
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>export let addTodoWithPromise = createAction(<span class="hljs-name">CONSTANT</span>.ADD_TO_DO_PROMISE, (<span class="hljs-name">val</span>) =&gt;
    (<span class="hljs-name">async</span> (<span class="hljs-name">dispatch</span>, getState)=&gt;{
        let value = await Promise.resolve(<span class="hljs-name">val</span> + ' promise')<span class="hljs-comment">;</span>
        return {
            value
        }<span class="hljs-comment">;</span>
    })()
)<span class="hljs-comment">;</span></code></pre>
<p>结果如下图：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVCjJP" src="https://static.alili.techhttps://segmentfault.com/img/bVCjJP" alt="promise" title="promise" style="cursor: pointer;"></span></p>
<p>示例源码：<a href="https://github.com/dwqs/blog/tree/master/redux-demo" rel="nofollow noreferrer" target="_blank">redux-demo</a></p>
<p><strong>原文：<a href="https://github.com/dwqs/blog/issues/35" rel="nofollow noreferrer" target="_blank">https://github.com/dwqs/blog/...</a> </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Redux的一些总结(一)：Action & 中间件 & 异步

## 原文链接
[https://segmentfault.com/a/1190000006723527](https://segmentfault.com/a/1190000006723527)

