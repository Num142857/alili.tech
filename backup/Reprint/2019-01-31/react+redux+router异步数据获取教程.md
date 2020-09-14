---
title: 'react+redux+router异步数据获取教程' 
date: 2019-01-31 2:31:16
hidden: true
slug: t4j60czx63
categories: [reprint]
---

{{< raw >}}

                    
<p>react的FLUX数据流一直搞不清楚，他不像<code>Angular</code>的双向数据绑定，做一个<code>model</code>获取数据，然后通过<code>controller</code>来管理<code>view上</code>的数据显示就可以了。单项数据流引入了太多的概念，<code>state</code>、<code>action</code>、<code>reducer</code>、<code>dispatch</code>。就算看的懂图，也不一定能coding出来。</p>
<p>不过我总算先搞定了<code>Redux</code>。<br><span class="img-wrap"><img data-src="/img/remote/1460000007589851?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000007589851?w=800&amp;h=600" alt="redux img" title="redux img" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">keywords</h2>
<ul>
<li><p><strong>store</strong></p></li>
<li><p><strong>reducer</strong></p></li>
<li><p><strong>action</strong></p></li>
<li><p><strong>dispatch</strong></p></li>
<li><p><strong>connect</strong></p></li>
<li><p><strong>router</strong></p></li>
<li><p><strong>middleware</strong></p></li>
<li><p><strong>thunk</strong></p></li>
</ul>
<h2 id="articleHeader1">Basic Usage</h2>
<h4>1st 实现action方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const addDeck = name => ({ type: 'ADD_DECK', data: name });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addDeck = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_DECK'</span>, <span class="hljs-attr">data</span>: name });</code></pre>
<h4>2nd 根据action方法创建reducer方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const showBack = (state, action) => {
  switch(action.type) {
    case 'SHOW_BACK':
      return action.data || false;
    default:
      return state || false;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> showBack = <span class="hljs-function">(<span class="hljs-params">state, action</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'SHOW_BACK'</span>:
      <span class="hljs-keyword">return</span> action.data || <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state || <span class="hljs-literal">false</span>;
  }
};</code></pre>
<h4>3rd 根据reducer方法创建store</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = createStore(combineReducers(reducers));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> store = createStore(combineReducers(reducers));</code></pre>
<p><code>store.subscribe()</code>方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。</p>
<p><code>store.subscribe(listener);</code><br>显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。<br>store.subscribe方法返回一个函数，调用这个函数就可以解除监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  <span class="hljs-built_in">console</span>.log(store.getState())
);

unsubscribe();</code></pre>
<h4>4th 引入react-redux的&lt;Provider&gt;，导入store</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Provider store={store}>
    {...}
</Provider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Provider store={store}&gt;
    {...}
&lt;<span class="hljs-regexp">/Provider&gt;</span></code></pre>
<h4>5th react组件中通过connect方法绑定store和dispatch。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = (newTalks) => ({
    newTalks
});

const mapDispatchToProps = dispatch => ({
    testFunc: () => dispatch(updataTalkLists(1)),
    receiveData: () => dispatch(receiveData())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">newTalks</span>) =&gt;</span> ({
    newTalks
});

<span class="hljs-keyword">const</span> mapDispatchToProps = <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> ({
    <span class="hljs-attr">testFunc</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> dispatch(updataTalkLists(<span class="hljs-number">1</span>)),
    <span class="hljs-attr">receiveData</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> dispatch(receiveData())
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(MainPage);</code></pre>
<h4>6th this.props中直接调用action方法。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.props.receiveData" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.props.receiveData</code></pre>
<h2 id="articleHeader2">With react-router</h2>
<p>结合router使用时需要有2步。</p>
<h4>1st 绑定routing到reducer上</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './redux/reducer';
reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { syncHistoryWithStore, routerReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./redux/reducer'</span>;
reducers.routing = routerReducer;

<span class="hljs-keyword">const</span> store = createStore(combineReducers(reducers));</code></pre>
<h4>2nd 使用syncHistoryWithStore绑定store和browserHistory</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const history = syncHistoryWithStore(browserHistory, store);

        <Provider store={store}>
           <Router history={history}>
               {routes}
           </Router>
        </Provider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> history = syncHistoryWithStore(browserHistory, store);

        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
               {routes}
           <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span></code></pre>
<h2 id="articleHeader3">Async</h2>
<p>类似 Express 或 Koa 框架中的中间件。它提供的是位于 action 被发起之后，到达 reducer 之前的扩展。<br>中间件的设计使用了非常多的函数式编程的思想，包括：高阶函数，复合函数，柯里化和ES6语法，源码仅仅20行左右。<br>项目中主要使用了三个中间件，分别解决不同的问题。</p>
<ul>
<li><p>thunkMiddleware：处理异步Action</p></li>
<li><p>apiMiddleware：统一处理API请求。一般情况下，每个 API 请求都至少需要 dispatch 三个不同的 action（请求前、请求成功、请求失败），通过这个中间件可以很方便处理。</p></li>
<li><p>loggerMiddleware：开发环境调试使用，控制台输出应用state日志</p></li>
</ul>
<p>实现action异步操作，必须要引入middleware。我这里用了<code>applyMiddleware(thunkMiddleware)</code>组件，也可以用其他的。</p>
<h4>1st 创建store是引入Middleware</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> { createStore, combineReducers, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-keyword">const</span> store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));</code></pre>
<h4>2nd 创建一个可以执行dispacth的action</h4>
<p>这也是中间件的作用所在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const receiveData = data => ({ type: 'RECEIVE_DATA', data: data });

export const fetchData = () => {
  return dispatch => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => dispatch(receiveData(json)));
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> receiveData = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">'RECEIVE_DATA'</span>, <span class="hljs-attr">data</span>: data });

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    fetch(<span class="hljs-string">'/api/data'</span>)
      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> dispatch(receiveData(json)));
  };
};</code></pre>
<h4>3rd 组件中对异步的store元素有相应的判断操作。</h4>
<p>React组件会在store值发生变化时自动调用render()方法，更新异步数据。但是我们同样也需要处理异步数据没有返回或者请求失败的情况。否则渲染会失败，页面卡住。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!data.newTalks) {
   return(<div/>);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(!data.newTalks) {
   <span class="hljs-keyword">return</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>/&gt;</span></span>);
}
</code></pre>
<h2 id="articleHeader4">相关知识</h2>
<h4>Store的实现</h4>
<p>Store提供了3个方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
let { 
    subscribe, //监听store变化
    dispatch,  //调用action方法
    getState  //返回当前store
} = createStore(reducer);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">let</span> { 
    subscribe, <span class="hljs-comment">//监听store变化</span>
    dispatch,  <span class="hljs-comment">//调用action方法</span>
    getState  <span class="hljs-comment">//返回当前store</span>
} = createStore(reducer);
</code></pre>
<p>下面是create方法的一个简单实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createStore = <span class="hljs-function">(<span class="hljs-params">reducer</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> state;
  <span class="hljs-keyword">let</span> listeners = [];

  <span class="hljs-keyword">const</span> getState = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> state;

  <span class="hljs-keyword">const</span> dispatch = <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> {
    state = reducer(state, action);
    listeners.forEach(<span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> listener());
  };

  <span class="hljs-keyword">const</span> subscribe = <span class="hljs-function">(<span class="hljs-params">listener</span>) =&gt;</span> {
    listeners.push(listener);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      listeners = listeners.filter(<span class="hljs-function"><span class="hljs-params">l</span> =&gt;</span> l !== listener);
    }
  };

  dispatch({});

  <span class="hljs-keyword">return</span> { getState, dispatch, subscribe };
};</code></pre>
<h4>combineReducer的简单实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {} 
    );
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> combineReducers = <span class="hljs-function"><span class="hljs-params">reducers</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">state = {}, action</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(reducers).reduce(
      <span class="hljs-function">(<span class="hljs-params">nextState, key</span>) =&gt;</span> {
        nextState[key] = reducers[key](state[key], action);
        <span class="hljs-keyword">return</span> nextState;
      },
      {} 
    );
  };
};</code></pre>
<h4>中间件</h4>
<ul>
<li><p>createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。</p></li>
<li><p>中间件的次序有讲究，logger就一定要放在最后，否则输出结果会不正确。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(thunk, promise, logger)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> store = createStore(
  reducer,
  initial_state,
  applyMiddleware(thunk, promise, logger)
);</code></pre>
<p>applyMiddlewares的实现，它是将所有中间件组成一个数组，依次执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">createStore</span>) =&gt;</span> (reducer, preloadedState, enhancer) =&gt; {
    <span class="hljs-keyword">var</span> store = createStore(reducer, preloadedState, enhancer);
    <span class="hljs-keyword">var</span> dispatch = store.dispatch;
    <span class="hljs-keyword">var</span> chain = [];

    <span class="hljs-keyword">var</span> middlewareAPI = {
      <span class="hljs-attr">getState</span>: store.getState,
      <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
    };
    chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    <span class="hljs-keyword">return</span> {...store, dispatch}
  }
}</code></pre>
<p>上面代码中，所有中间件被处理后得到一个数组保存在chain中。之后将chain传给compose，并将store.dispatch传给返回的函数。。可以看到，中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法。</p>
<p>那么在这里面做了什么呢？我们再看compose的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> arg
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">const</span> last = funcs[funcs.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">const</span> rest = funcs.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> rest.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), last(...args))
  }
}</code></pre>
<p>compose中的核心动作就是将传进来的所有函数倒序（reduceRight）进行如下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(composed, f) => f(composed)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">(composed, f) =&gt; f(composed)</code></pre>
<p>我们知道Array.prototype.reduceRight是从右向左累计计算的，会将上一次的计算结果作为本次计算的输入。再看看applyMiddleware中的调用代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = compose(...chain)(store.dispatch)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dispatch = compose(...chain)(store.dispatch)</code></pre>
<p>compose函数最终返回的函数被作为了dispatch函数，结合官方文档和代码，不难得出，中间件的定义形式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function middleware({dispatch, getState}) {
    return function (next) {
        return function (action) {
            return next(action);
        }
    }
}

或  

middleware = (dispatch, getState) => next => action => {
    next(action);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">middleware</span>(<span class="hljs-params">{dispatch, getState}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
            <span class="hljs-keyword">return</span> next(action);
        }
    }
}

或  

middleware = <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    next(action);
}</code></pre>
<p>也就是说，redux的中间件是一个函数，该函数接收dispatch和getState作为参数，返回一个以dispatch为参数的函数，这个函数的返回值是接收action为参数的函数（可以看做另一个dispatch函数）。在中间件链中，以dispatch为参数的函数的返回值将作为下一个中间件（准确的说应该是返回值）的参数，下一个中间件将它的返回值接着往下一个中间件传递，最终实现了store.dispatch在中间件间的传递。</p>
<h4>redux-promise中间件</h4>
<p>既然 Action Creator 可以返回函数，当然也可以返回其他值。另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。</p>
<ul><li><p>写法一，返回值是一个 Promise 对象。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fetchPosts = 
  <span class="hljs-function">(<span class="hljs-params">dispatch, postTitle</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
     dispatch(requestPosts(postTitle));
     <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`/some/API/<span class="hljs-subst">${postTitle}</span>.json`</span>)
       .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
         <span class="hljs-attr">type</span>: <span class="hljs-string">'FETCH_POSTS'</span>,
         <span class="hljs-attr">payload</span>: response.json()
       });
});</code></pre>
<ul><li><p>写法二，Action 对象的payload属性是一个 Promise 对象。这需要从redux-actions模块引入createAction方法，并且写法也要变成下面这样。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from 'redux-actions';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出同步 Action
    dispatch(requestPosts(selectedPost));
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_POSTS', 
      fetch(`/some/API/${postTitle}.json`)
        .then(response => response.json())
    ));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">const</span> { dispatch, selectedPost } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-comment">// 发出同步 Action</span>
    dispatch(requestPosts(selectedPost));
    <span class="hljs-comment">// 发出异步 Action</span>
    dispatch(createAction(
      <span class="hljs-string">'FETCH_POSTS'</span>, 
      fetch(<span class="hljs-string">`/some/API/<span class="hljs-subst">${postTitle}</span>.json`</span>)
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
    ));
  }</code></pre>
<p>上面代码中，第二个dispatch方法发出的是异步 Action，只有等到操作结束，这个 Action 才会实际发出。注意，createAction的第二个参数必须是一个 Promise 对象。</p>
<p>redux-promise的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseMiddleware</span>(<span class="hljs-params">{ dispatch }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">if</span> (!isFSA(action)) {
      <span class="hljs-keyword">return</span> isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    <span class="hljs-keyword">return</span> isPromise(action.payload)
      ? action.payload.then(
          <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> dispatch({ ...action, <span class="hljs-attr">payload</span>: result }),
          error =&gt; {
            dispatch({ ...action, <span class="hljs-attr">payload</span>: error, <span class="hljs-attr">error</span>: <span class="hljs-literal">true</span> });
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
          }
        )
      : next(action);
  };
}</code></pre>
<p>从上面代码可以看出，如果 Action 本身是一个 Promise，它 resolve 以后的值应该是一个 Action 对象，会被dispatch方法送出（action.then(dispatch)），但 reject 以后不会有任何动作；如果 Action 对象的payload属性是一个 Promise 对象，那么无论 resolve 和 reject，dispatch方法都会发出 Action。</p>
<h4>mapStateToProps()</h4>
<ul>
<li><p>mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系</p></li>
<li><p>mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。</p></li>
<li><p>mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。</p></li>
<li><p>使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。</p></li>
<li><p>connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 容器组件的代码
//    <FilterLink filter=&quot;SHOW_ALL&quot;>
//      All
//    </FilterLink>

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 容器组件的代码</span>
<span class="hljs-comment">//    &lt;FilterLink filter="SHOW_ALL"&gt;</span>
<span class="hljs-comment">//      All</span>
<span class="hljs-comment">//    &lt;/FilterLink&gt;</span>

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state, ownProps</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">active</span>: ownProps.filter === state.visibilityFilter
  }
}</code></pre>
<h4>mapDispatchToProps()</h4>
<p>mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。</p>
<p><code>mapDispatchToProps</code>作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapDispatchToProps = (
  dispatch,
  ownProps
) =&gt; {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">onClick</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      dispatch({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'SET_VISIBILITY_FILTER'</span>,
        <span class="hljs-attr">filter</span>: ownProps.filter
      });
    }
  };
}</code></pre>
<p>如果<code>mapDispatchToProps</code>是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 <code>Action creator</code> ，返回的 <code>Action</code> 会由 <code>Redux</code> 自动发出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapDispatchToProps = {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">(<span class="hljs-params">filter</span>) =&gt;</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'SET_VISIBILITY_FILTER'</span>,
    <span class="hljs-attr">filter</span>: filter
  };
}</code></pre>
<h4>
<code>&lt;Provider&gt;</code> 组件</h4>
<p>React-Redux 提供Provider组件，可以让容器组件拿到state，它的原理是React组件的context属性，请看源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Provider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  getChildContext() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">store</span>: <span class="hljs-keyword">this</span>.props.store
    };
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children;
  }
}

Provider.childContextTypes = {
  <span class="hljs-attr">store</span>: React.PropTypes.object
}</code></pre>
<p>上面代码中，store放在了上下文对象context上面。然后，子组件就可以从context拿到store，代码大致如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VisibleTodoList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">const</span> { store } = <span class="hljs-keyword">this</span>.context;
    <span class="hljs-keyword">this</span>.unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
      <span class="hljs-keyword">this</span>.forceUpdate()
    );
  }

  render() {
    <span class="hljs-keyword">const</span> props = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> { store } = <span class="hljs-keyword">this</span>.context;
    <span class="hljs-keyword">const</span> state = store.getState();
    <span class="hljs-comment">// ...</span>
  }
}

VisibleTodoList.contextTypes = {
  <span class="hljs-attr">store</span>: React.PropTypes.object
}</code></pre>
<h4>redux-thunk</h4>
<p>我们知道，异步调用什么时候返回前端是无法控制的。对于redux这条严密的数据流来说，如何才能做到异步呢。redux-thunk的基本思想就是通过函数来封装异步请求，也就是说在actionCreater中返回一个函数，在这个函数中进行异步调用。我们已经知道，redux中间件只关注dispatch函数的传递，而且redux也不关心dispatch函数的返回值，所以只需要让redux认识这个函数就可以了。<br>看了一下redux-thunk的源码：</p>
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
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
<p>这段代码跟上面我们看到的中间件没有太大的差别，唯一一点就是对action做了一下如下判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof action === 'function') {
   return action(dispatch, getState, extraArgument);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
   <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
}</code></pre>
<p>也就是说，如果发现actionCreater传过来的action是一个函数的话，会执行一下这个函数，并以这个函数的返回值作为返回值。前面已经说过，redux对dispatch函数的返回值不是很关心，因此此处也就无所谓了。</p>
<p>这样的话，在我们的actionCreater中，我们就可以做任何的异步调用了，并且返回任何值也无所谓，所以我们可以使用promise了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function actionCreate() {
    return function (dispatch, getState) {
        // 返回的函数体内自由实现。。。
        Ajax.fetch({xxx}).then(function (json) {
            dispatch(json);
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">actionCreate</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch, getState</span>) </span>{
        <span class="hljs-comment">// 返回的函数体内自由实现。。。</span>
        Ajax.fetch({xxx}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">json</span>) </span>{
            dispatch(json);
        })
    }
}</code></pre>
<p>最后还需要注意一点，由于中间件只关心dispatch的传递，并不限制你做其他的事情，因此我们最好将redux-thunk放到中间件列表的首位，防止其他中间件中返回异步请求。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+redux+router异步数据获取教程

## 原文链接
[https://segmentfault.com/a/1190000007589848](https://segmentfault.com/a/1190000007589848)

