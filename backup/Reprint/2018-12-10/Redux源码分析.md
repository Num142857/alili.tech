---
title: 'Redux源码分析' 
date: 2018-12-10 2:30:07
hidden: true
slug: bvzyw5s3wdo
categories: [reprint]
---

{{< raw >}}

                    
<p>Redux使用中的几个点：</p>
<ol>
<li>Redux三大设计原则</li>
<li>Create Store</li>
<li>Redux middleware</li>
<li>combineReducer</li>
<li>Provider与Connect</li>
<li>Redux流程梳理</li>
<li>Redux设计特点</li>
</ol>
<h2 id="articleHeader0">1. Redux三大设计原则</h2>
<h4>1. 单一数据源</h4>
<p>在传统的 MVC 架构中，我们可以根据需要创建无数个 Model，而 Model 之间可以互相监听、触发事件甚至循环或嵌套触发事件，这些在 Redux 中都是不允许的。因为在 Redux 的思想里，一个应用永远只有唯一的数据源。<br>实际上，使用单一数据源的好处在于整个应用状态都保存在一个对象中，这样我们随时可以提取出整个应用的状态进行持久化（比如实现一个针对整个应用的即时保存功能）。此外，这样的设计也为服务端渲染提供了可能。</p>
<h4>2. 状态是只读的</h4>
<p>在 Redux 中，我们并不会自己用代码来定义一个 store。取而代之的是，我们定义一个 reducer，它的功能是根据当前触发的 action 对当前应用的状态（state）进行迭代，这里我们并没有直接修改应用的状态，而是返回了一份全新的状态。</p>
<p>Redux 提供的 createStore 方法会根据 reducer 生成 store。最后，我们可以利用 store. dispatch<br>方法来达到修改状态的目的。</p>
<h4>3.状态修改均由纯函数完成</h4>
<p>在 Redux 里，我们通过定义 reducer 来确定状态的修改，而每一个 reducer 都是纯函数，这意味着它没有副作用，即接受一定的输入，必定会得到一定的输出。</p>
<p>这样设计的好处不仅在于 reducer 里对状态的修改变得简单、纯粹、可测试，更有意思的是，Redux 利用每次新返回的状态生成酷炫的时间旅行（time travel）调试方式，让跟踪每一次因为触发 action 而改变状态的结果成为了可能。</p>
<h2 id="articleHeader1">2.Create Store</h2>
<p>我们从store的诞生开始说起。create store函数API文档如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createStore(reducer, [initialState], enhancer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">createStore(reducer, [initialState], enhancer)</code></pre>
<p>可以看出，它接受三个参数：reducer、initialState 和        enhancer 。Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。</p>
<p>再来看看他的返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    dispatch: f (action),
    getState: f (),
    replaceReducer: f (nextReducer),
    subscribe: f (listener),
    Symbol(observable): f ()    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">dispatch</span>: f (action),
    <span class="hljs-attr">getState</span>: f (),
    <span class="hljs-attr">replaceReducer</span>: f (nextReducer),
    <span class="hljs-attr">subscribe</span>: f (listener),
    <span class="hljs-built_in">Symbol</span>(observable): f ()    
}</code></pre>
<p>store的返回值就是一个普通对象，里面有几个常用的方法：</p>
<ul>
<li>dispatch：就是我们最常用的dispatch方法，派发action。</li>
<li>getState：通过该方法，我们可以拿到当前状态树state。</li>
<li>replaceReducer：这个方法主要用于 reducer 的热替换，下面介绍该方法。</li>
<li>subscribe：添加一个变化监听器。每当 dispatch（action）的时候就会执行，state 树中的一部分可能已经变化。</li>
<li>observable：观察者模式，用于处理订阅关系。</li>
</ul>
<p>这里挑几个方法介绍：</p>
<h3 id="articleHeader2">getState</h3>
<p>在完成基本的参数校验之后，在 createStore 中声明如下变量及 getState 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var currentReducer = reducer
var currentState = initialState
var listeners = [] // 当前监听 store 变化的监听器
var isDispatching = false // 某个 action 是否处于分发的处理过程中
/**
* Reads the state tree managed by the store.
 *
* @returns {any} The current state tree of your application.
 */
function getState() {
 return currentState
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> currentReducer = reducer
<span class="hljs-keyword">var</span> currentState = initialState
<span class="hljs-keyword">var</span> listeners = [] <span class="hljs-comment">// 当前监听 store 变化的监听器</span>
<span class="hljs-keyword">var</span> isDispatching = <span class="hljs-literal">false</span> <span class="hljs-comment">// 某个 action 是否处于分发的处理过程中</span>
<span class="hljs-comment">/**
* Reads the state tree managed by the store.
 *
* @returns {any} The current state tree of your application.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getState</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">return</span> currentState
} </code></pre>
<p>getState方法就是简单返回当前state，如果state没有被reducer处理过，他就是initialState。</p>
<h3 id="articleHeader3">subscribe</h3>
<p>在 getState 之后，定义了 store 的另一个方法 subscribe：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function subscribe(listener) {
 listeners.push(listener)
 var isSubscribed = true
 return function unsubscribe() {
 if (!isSubscribed) {
 return
 }
 isSubscribed = false
 var index = listeners.indexOf(listener)
 listeners.splice(index, 1)
 }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">listener</span>) </span>{
 listeners.push(listener)
 <span class="hljs-keyword">var</span> isSubscribed = <span class="hljs-literal">true</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">if</span> (!isSubscribed) {
 <span class="hljs-keyword">return</span>
 }
 isSubscribed = <span class="hljs-literal">false</span>
 <span class="hljs-keyword">var</span> index = listeners.indexOf(listener)
 listeners.splice(index, <span class="hljs-number">1</span>)
 }
} </code></pre>
<p>Store 允许使用<code>store.subscribe</code>方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。</p>
<p>显然，只要把 View 的更新函数（对于 React 项目，就是组件的<code>render</code>方法或<code>setState</code>方法）放入<code>listen</code>，就会实现 View 的自动渲染。你可能会感到奇怪，好像我们在 Redux 应用中并没有使用 store.subscribe 方法？事实上，</p>
<p>React Redux 中的 connect 方法隐式地帮我们完成了这个工作。</p>
<p><code>store.subscribe</code>方法返回一个函数，调用这个函数就可以解除监听。</p>
<h3 id="articleHeader4">dispatch</h3>
<p>dispatch是redux的核心方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dispatch(action) {
    if (!isPlainObject(action)) {
        throw new Error(
            'Actions must be plain objects. ' +
            'Use custom middleware for async actions.'
        )
    }
    if (typeof action.type === 'undefined') {
        throw new Error(
            'Actions may not have an undefined &quot;type&quot; property. ' +
            'Have you misspelled a constant?'
            )
        }
    if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.')
    }
    try {
        isDispatching = true
        currentState = currentReducer(currentState, action)
    } finally {
        isDispatching = false
    }
    listeners.slice().forEach(listener => listener())
    return action
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">if</span> (!isPlainObject(action)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
            <span class="hljs-string">'Actions must be plain objects. '</span> +
            <span class="hljs-string">'Use custom middleware for async actions.'</span>
        )
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action.type === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
            <span class="hljs-string">'Actions may not have an undefined "type" property. '</span> +
            <span class="hljs-string">'Have you misspelled a constant?'</span>
            )
        }
    <span class="hljs-keyword">if</span> (isDispatching) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Reducers may not dispatch actions.'</span>)
    }
    <span class="hljs-keyword">try</span> {
        isDispatching = <span class="hljs-literal">true</span>
        currentState = currentReducer(currentState, action)
    } <span class="hljs-keyword">finally</span> {
        isDispatching = <span class="hljs-literal">false</span>
    }
    listeners.slice().forEach(<span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> listener())
    <span class="hljs-keyword">return</span> action
} </code></pre>
<p>判断当前是否处于某个 action 的分发过程中，这个检查主要是为了避免在 reducer 中分发 action 的情况，因为这样做可能导致分发死循环，同时也增加了数据流动的复杂度。</p>
<p>确认当前不属于分发过程中后，先设定标志位，然后将当前的状态和 action 传给当前的reducer，用于生成最新的 state。这看起来一点都不复杂，这也是我们反复强调的 reducer 工作过程——纯函数、接受状态和 action 作为参数，返回一个新的状态。</p>
<p>在得到新的状态后，依次调用所有的监听器，通知状态的变更。需要注意的是，我们在通知监听器变更发生时，并没有将最新的状态作为参数传递给这些监听器。这是因为在监听器中，我们可以直接调用 store.getState() 方法拿到最新的状态。</p>
<p>最终，处理之后的 action 会被 dispatch 方法返回。</p>
<h3 id="articleHeader5">replaceReducer</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceReducer</span>(<span class="hljs-params">nextReducer</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextReducer !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the nextReducer to be a function.'</span>);
    }

    currentReducer = nextReducer;
    dispatch({ <span class="hljs-attr">type</span>: ActionTypes.INIT });
  }</code></pre>
<p>这是为了拿到所有 reducer 中的初始状态（你是否还记得在定义 reducer 时，第一个参数为previousState，如果该参数为空，我们提供默认的 initialState）。只有所有的初始状态都成功获取后，Redux 应用才能有条不紊地开始运作。</p>
<h2 id="articleHeader6">3.Redux middleware</h2>
<blockquote>It provides a third-party extension point between dispatching an action, and the moment it reaches<br>the reducer</blockquote>
<p>它提供了一个分类处理 action 的机会。在middleware 中，你可以检阅每一个流过的 action，挑选出特定类型的action 进行相应操作，给你一次改变 action 的机会。</p>
<p>常规的同步数据流模式的流程图如下：<br><span class="img-wrap"><img data-src="/img/bV5UL5?w=1146&amp;h=206" src="https://static.alili.tech/img/bV5UL5?w=1146&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>不同业务需求下，比如执行action之前和之后都要打log；action触发一个异步的请求，请求回来之后渲染view等。需要为这一类的action添加公共的方法或者处理，使用redux middleware流程图如下：<br><span class="img-wrap"><img data-src="/img/bV5UMt?w=1162&amp;h=260" src="https://static.alili.tech/img/bV5UMt?w=1162&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>每一个 middleware 处理一个相对独立的业务需求，通过串联不同的 middleware 实现变化多样的功能。比如上面的业务，我们把处理log的代码封装成一个middleware，处理异步的也是一个middleware，两者串联，却又相互独立。</p>
<p>使用middleware之后，action触发的dispatch并不是原来的dispatch，而是经过封装的new dispatch，在这个new dispatch中，按照顺序依次执行每个middleware，最后调用原生的dispatch。</p>
<p>我们来看下logger middleware如何实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default store => next => action => {
    console.log('dispatch:', action); 
    next(action);
    console.log('finish:', action);
 } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store =&gt; <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch:'</span>, action); 
    next(action);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finish:'</span>, action);
 } </code></pre>
<p>这里代码十分简洁，就是在next调用下一个middleware之前和之后，分别打印两次。</p>
<p>Redux 提供了 applyMiddleware 方法来加载 middleware，该方法的源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import compose from './compose';

export default function applyMiddleware(...middlewares) {
    return function (next) {
        return function (reducer, initialState) {
            let store = next(reducer, initialState);
            let dispatch = store.dispatch;
            let chain = [];
            var middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action),
            };
            chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch,
            };
        }
    }
}
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> compose <span class="hljs-keyword">from</span> <span class="hljs-string">'./compose'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reducer, initialState</span>) </span>{
            <span class="hljs-keyword">let</span> store = next(reducer, initialState);
            <span class="hljs-keyword">let</span> dispatch = store.dispatch;
            <span class="hljs-keyword">let</span> chain = [];
            <span class="hljs-keyword">var</span> middlewareAPI = {
                <span class="hljs-attr">getState</span>: store.getState,
                <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action),
            };
            chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);

            <span class="hljs-keyword">return</span> {
                ...store,
                dispatch,
            };
        }
    }
}
 </code></pre>
<p>其中compose源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose(...funcs) {
    return arg => funcs.reduceRight((composed, f) => f(composed), arg);
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> funcs.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), arg);
} </code></pre>
<p>使用的时候，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const newStore = applyMiddleware([mid1, mid2, mid3, ...])(createStore)(reducer, initialState); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> newStore = applyMiddleware([mid1, mid2, mid3, ...])(createStore)(reducer, initialState); </code></pre>
<p>ok，相关源码已就位，我们来详细解析一波。</p>
<p><strong>函数式编程思想设计 </strong>：middleware 的设计有点特殊，是一个层层包裹的匿名函数，这其实是函数式编程中的<br>currying，它是一种使用匿名单参数函数来实现多参数函数的方法。applyMiddleware 会对 logger 这个middleware 进行层层调用，动态地将 store 和 next 参数赋值。currying 的 middleware 结构的好处主要有以下两点。</p>
<ul>
<li>易串联：currying 函数具有延迟执行的特性，通过不断 currying 形成的 middleware 可以累积参数，再配合组合（compose）的方式，很容易形成 pipeline 来处理数据流。</li>
<li> 共享 store: 在 applyMiddleware 执行的过程中，store 还是旧的，但是因为闭包的存在，applyMiddleware 完成后，所有的 middleware 内部拿到的 store 是最新且相同的。</li>
</ul>
<p><strong>给 middleware 分发 store</strong>：newStore创建完成之后，applyMiddleware 方法陆续获得了3个参数，第一个是 middlewares 数组[mid1, mid2, mid3, ...]，第二个是 Redux 原生的 createStore ，最后一个是 reducer。然后，我们可以看到 applyMiddleware 利用 createStore 和 reducer 创建了一个 store。而 store 的 getState方法和 dispatch 方法又分别被直接和间接地赋值给 middlewareAPI 变量 store：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const middlewareAPI = {
 getState: store.getState,
 dispatch: (action) => dispatch(action),
};
chain = middlewares.map(middleware => middleware(middlewareAPI)); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> middlewareAPI = {
 <span class="hljs-attr">getState</span>: store.getState,
 <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action),
};
chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI)); </code></pre>
<p>然后，让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍。执行完后，获得 chain数组 [f1, f2, ... , fx, ..., fn]，它保存的对象是第二个箭头函数返回的匿名函数。因为是闭包，每个匿名函数都可以访问相同的 store，即 middlewareAPI。</p>
<blockquote>middlewareAPI 中的 dispatch 为什么要用匿名函数包裹呢？<p>我们用 applyMiddleware 是为了改造 dispatch，所以 applyMiddleware 执行完后，dispatch 是变化了的，而 middlewareAPI 是 applyMiddleware 执行中分发到各个 middleware 的，所以必须用匿名函数包裹 dispatch，这样只要 dispatch 更新了，middlewareAPI 中的 dispatch 应用也会发生变化。</p>
</blockquote>
<p><strong>组合串联 middleware</strong>：这一层只有一行代码，却是 applyMiddleware 精华之所在<code>dispatch = compose(...chain)(store.dispatch); </code>，其中 compose 是函数式编程中的组合，它将 chain 中的所有匿名函数 [f1, f2, ... , fx, ..., fn]组装成一个新的函数，即新的 dispatch。当新 dispatch 执行时，[f1, f2, ... , fx, ..., fn]，从右到左依次执行。</p>
<p>compose(...funcs) 返回的是一个匿名函数，其中 funcs 就是 chain 数组。当调用 reduceRight时，依次从 funcs 数组的右端取一个函数 fx 拿来执行，fx 的参数 composed 就是前一次 fx+1 执行的结果，而第一次执行的 fn（n 代表 chain 的长度）的参数 arg 就是 store.dispatch。所以，当 compose 执行完后，我们得到的 dispatch 是这样的，假设 n = 3：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = f1(f2(f3(store.dispatch)))); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dispatch = f1(f2(f3(store.dispatch)))); </code></pre>
<p>这时调用新 dispatch，每一个 middleware 就依次执行了。</p>
<p><strong>在 middleware 中调用 dispatch 会发生什么</strong>：经过 compose 后，所有的 middleware 算是串联起来了。可是还有一个问题，在分发 store 时，我们提到过每个 middleware 都可以访问 store，即 middlewareAPI 这个变量，也可以拿到 store 的dispatch 属性。那么，在 middleware 中调用 store.dispatch() 会发生什么，和调用 next() 有区别吗？现在我们来说明两者的不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const logger = store => next => action => {
 console.log('dispatch:', action);
 next(action);
 console.log('finish:', action);
};
const logger = store => next => action => {
 console.log('dispatch:', action);
 store.dispatch(action);
 console.log('finish:', action);
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> logger = <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch:'</span>, action);
 next(action);
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finish:'</span>, action);
};
<span class="hljs-keyword">const</span> logger = <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch:'</span>, action);
 store.dispatch(action);
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finish:'</span>, action);
}; </code></pre>
<p>在分发 store 时我们解释过，middleware 中 store 的 dispatch 通过匿名函数的方式和最终compose 结束后的新 dispatch 保持一致，所以，在 middleware 中调用 store.dispatch() 和在其他任何地方调用的效果一样。而在 middleware 中调用 next()，效果是进入下一个 middleware，下图就是redux middleware最著名的洋葱模型图。<br><span class="img-wrap"><img data-src="/img/bV5UMJ?w=1340&amp;h=594" src="https://static.alili.tech/img/bV5UMJ?w=1340&amp;h=594" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">4.combineReducer</h2>
<p>如果一个项目过大，我们通常按模块来写reducer，但是redux create store只接受一个reducer参数，所以我们需要合并reducer。这里就用到了redux提供的<code>combineReducer</code>辅助函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="combineReducers({
      layout,
      home,
      ...asyncReducers
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">combineReducers({
      layout,
      home,
      ...asyncReducers
  })</code></pre>
<p>这个函数用起来很简单，就是传入一个对象，key是模块reducer对应的名字， 值是对应reducer。值是一个function，相当于是一个新的reducer，源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key &quot;${key}&quot;`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {}
  }

  var sanityError
  try {
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }

  return function combination(state = {}, action) {
    if (sanityError) {
      throw sanityError
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-keyword">var</span> reducerKeys = <span class="hljs-built_in">Object</span>.keys(reducers)
  <span class="hljs-keyword">var</span> finalReducers = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; reducerKeys.length; i++) {
    <span class="hljs-keyword">var</span> key = reducerKeys[i]

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">'undefined'</span>) {
        warning(<span class="hljs-string">`No reducer provided for key "<span class="hljs-subst">${key}</span>"`</span>)
      }
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">'function'</span>) {
      finalReducers[key] = reducers[key]
    }
  }
  <span class="hljs-keyword">var</span> finalReducerKeys = <span class="hljs-built_in">Object</span>.keys(finalReducers)

  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
    <span class="hljs-keyword">var</span> unexpectedKeyCache = {}
  }

  <span class="hljs-keyword">var</span> sanityError
  <span class="hljs-keyword">try</span> {
    assertReducerSanity(finalReducers)
  } <span class="hljs-keyword">catch</span> (e) {
    sanityError = e
  }

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combination</span>(<span class="hljs-params">state = {}, action</span>) </span>{
    <span class="hljs-keyword">if</span> (sanityError) {
      <span class="hljs-keyword">throw</span> sanityError
    }

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      <span class="hljs-keyword">var</span> warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      <span class="hljs-keyword">if</span> (warningMessage) {
        warning(warningMessage)
      }
    }

    <span class="hljs-keyword">var</span> hasChanged = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">var</span> nextState = {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; finalReducerKeys.length; i++) {
      <span class="hljs-keyword">var</span> key = finalReducerKeys[i]
      <span class="hljs-keyword">var</span> reducer = finalReducers[key]
      <span class="hljs-keyword">var</span> previousStateForKey = state[key]
      <span class="hljs-keyword">var</span> nextStateForKey = reducer(previousStateForKey, action)
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextStateForKey === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">var</span> errorMessage = getUndefinedStateErrorMessage(key, action)
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    <span class="hljs-keyword">return</span> hasChanged ? nextState : state
  }
}</code></pre>
<p>源码不是很多，除去一些验证代码，剩下的就是说：return一个function，我们暂时称呼他combination，就相当于是与一个总的reducer，每次action都会走到combination中，combination会遍历输入的reducer，将action放到每个reducer中执行一下，计算出返回结果就是nextState，nextState于previousState如果!==说明改变了，返回nextState，否则返回执行之前的state。</p>
<p>这也解释了不同模块actionType如果相同的话，两个模块的reducer都会走一遍的问题，在actionType名称前面加上模块前缀即可解决问题。</p>
<h2 id="articleHeader8">5. Provider与Connect</h2>
<p>Provider与Connet组件都是React-Redux提供的核心组件，两者看起来功能一样，都是帮助容器组件获取store中的数据，但是原理与功能却不同。</p>
<h3 id="articleHeader9">Provider</h3>
<p>Provider组件在所有组件的最外层，其接受store作为参数，将store里的state使用context属性向下传递。部分源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Provider extends Component {
 getChildContext() {
 return { store: this.store }
 }
 constructor(props, context) {
 super(props, context)
 this.store = props.store
 }
 render() {
 const { children } = this.props
 return Children.only(children)
 }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Provider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 getChildContext() {
 <span class="hljs-keyword">return</span> { <span class="hljs-attr">store</span>: <span class="hljs-keyword">this</span>.store }
 }
 <span class="hljs-keyword">constructor</span>(props, context) {
 <span class="hljs-keyword">super</span>(props, context)
 <span class="hljs-keyword">this</span>.store = props.store
 }
 render() {
 <span class="hljs-keyword">const</span> { children } = <span class="hljs-keyword">this</span>.props
 <span class="hljs-keyword">return</span> Children.only(children)
 }
} </code></pre>
<p>利用context这个属性，Provider所有子组件均可以拿到这个属性。</p>
<h3 id="articleHeader10">Connect</h3>
<p>connect实现的功能是将需要关联store的组件和store的dispatch等数据混合到一块，这块就是一个高阶组件典型的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import hoistStatics from 'hoist-non-react-statics'
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
 // ...
 return function wrapWithConnect(WrappedComponent) {
 // ...
 class Connect extends Component {
 // ...
 render() {
 // ...
 if (withRef) {
 this.renderedElement = createElement(WrappedComponent, {
 ...this.mergedProps,
 ref: 'wrappedInstance'
 })
 } else {
 this.renderedElement = createElement(WrappedComponent,
 this.mergedProps
 )
 }
 return this.renderedElement
 }
 }
 // ...
 return hoistStatcis(Connect, WrappedComponent);
 }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> hoistStatics <span class="hljs-keyword">from</span> <span class="hljs-string">'hoist-non-react-statics'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">mapStateToProps, mapDispatchToProps, mergeProps, options = {}</span>) </span>{
 <span class="hljs-comment">// ...</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapWithConnect</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
 <span class="hljs-comment">// ...</span>
 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-comment">// ...</span>
 render() {
 <span class="hljs-comment">// ...</span>
 <span class="hljs-keyword">if</span> (withRef) {
 <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent, {
 ...this.mergedProps,
 <span class="hljs-attr">ref</span>: <span class="hljs-string">'wrappedInstance'</span>
 })
 } <span class="hljs-keyword">else</span> {
 <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent,
 <span class="hljs-keyword">this</span>.mergedProps
 )
 }
 <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.renderedElement
 }
 }
 <span class="hljs-comment">// ...</span>
 <span class="hljs-keyword">return</span> hoistStatcis(Connect, WrappedComponent);
 }
} </code></pre>
<p>还是先从他的四个参数说起：</p>
<h4>1.mapStateToProps</h4>
<p>connect 的第一个参数定义了我们需要从 Redux 状态树中提取哪些部分当作 props 传给当前组件。一般来说，这也是我们使用 connect 时经常传入的参数。事实上，如果不传入这个参数，React 组件将永远不会和 Redux 的状态树产生任何关系。具体在源代码中的表现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
 const shouldSubscribe = Boolean(mapStateToProps)
 // ...
 class Connect extends Component {
 // ...
 trySubscribe() {
 if (shouldSubscribe &amp;&amp; !this.unsubscribe) {
 this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
 this.handleChange()
 }
 }
 // ...
 }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">mapStateToProps, mapDispatchToProps, mergeProps, options = {}</span>) </span>{
 <span class="hljs-keyword">const</span> shouldSubscribe = <span class="hljs-built_in">Boolean</span>(mapStateToProps)
 <span class="hljs-comment">// ...</span>
 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-comment">// ...</span>
 trySubscribe() {
 <span class="hljs-keyword">if</span> (shouldSubscribe &amp;&amp; !<span class="hljs-keyword">this</span>.unsubscribe) {
 <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-keyword">this</span>.store.subscribe(<span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>))
 <span class="hljs-keyword">this</span>.handleChange()
 }
 }
 <span class="hljs-comment">// ...</span>
 }
} </code></pre>
<p><code>mapStateToProps</code>会订阅 Store，每当<code>state</code>更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。</p>
<p><code>mapStateToProps</code>的第一个参数总是<code>state</code>对象，还可以使用第二个参数，代表容器组件的<code>props</code>对象。</p>
<p>这块的源码相对较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapState = mapStateToProps || defaultMapStateToProps 
class Connect extends Component { 
    computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }

        const state = store.getState()
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'

        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1

        if (isFactory) {
          return this.computeStateProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapState = mapStateToProps || defaultMapStateToProps 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{ 
    computeStateProps(store, props) {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.finalMapStateToProps) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.configureFinalMapState(store, props)
        }

        <span class="hljs-keyword">const</span> state = store.getState()
        <span class="hljs-keyword">const</span> stateProps = <span class="hljs-keyword">this</span>.doStatePropsDependOnOwnProps ?
          <span class="hljs-keyword">this</span>.finalMapStateToProps(state, props) :
          <span class="hljs-keyword">this</span>.finalMapStateToProps(state)

        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
          checkStateShape(stateProps, <span class="hljs-string">'mapStateToProps'</span>)
        }
        <span class="hljs-keyword">return</span> stateProps
      }

      configureFinalMapState(store, props) {
        <span class="hljs-keyword">const</span> mappedState = mapState(store.getState(), props)
        <span class="hljs-keyword">const</span> isFactory = <span class="hljs-keyword">typeof</span> mappedState === <span class="hljs-string">'function'</span>

        <span class="hljs-keyword">this</span>.finalMapStateToProps = isFactory ? mappedState : mapState
        <span class="hljs-keyword">this</span>.doStatePropsDependOnOwnProps = <span class="hljs-keyword">this</span>.finalMapStateToProps.length !== <span class="hljs-number">1</span>

        <span class="hljs-keyword">if</span> (isFactory) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.computeStateProps(store, props)
        }

        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
          checkStateShape(mappedState, <span class="hljs-string">'mapStateToProps'</span>)
        }
        <span class="hljs-keyword">return</span> mappedState
      }
}</code></pre>
<p>这块原理很简单，进行一些参数校验，判断第一个参数mapStateToProps返回值是否为function，如果是递归调用，不是的话算出返回值。如果没传这个参数，默认给{}。</p>
<blockquote>我们可能会疑惑为什么传给 connect 的第一个参数本身是一个函数，react-redux 还允许这个函数的返回值也是一个函数呢？<br>简单地说，这样设计可以允许我们在 connect 的第一个参数里利用函数闭包进行一些复杂计算的缓存，从而实现效率优化的目的</blockquote>
<p>当我们使用的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = (state, props) => ({
    home: state.home,
    layout: state.layout
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state, props</span>) =&gt;</span> ({
    <span class="hljs-attr">home</span>: state.home,
    <span class="hljs-attr">layout</span>: state.layout
});</code></pre>
<p>使用<code>ownProps</code>作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染</p>
<h4>2.mapDispatchToProps</h4>
<p>人如其名，它接受 store 的 dispatch 作为第一个参数，同时接受 this.props 作为可选的第二个参数。利用这个方法，我们可以在 connect 中方便地将 actionCreator 与 dispatch 绑定在一起（利用 bindActionCreators 方法），最终绑定好的方法也会作为 props 传给当前组件。这块的源码与mapStateToProps一样，就不贴了。</p>
<p>bindActionCreator</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> dispatch(actionCreator(...args))
}</code></pre>
<h4>3.mergeProps</h4>
<p>前两个参数返回的对象，都要跟组件自身的props merge一下，形成一个新的对象赋值给对应组件，我们可以在这一步做一些处理，这个参数就是干这个的，该参数签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mergeProps(stateProps, dispatchProps, ownProps): props" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">mergeProps(stateProps, dispatchProps, ownProps): props</code></pre>
<p>默认情况如果没传该参数，返回<code>Object.assign(ownProps, stateProps, dispatchProps)</code>。</p>
<h4>4.options</h4>
<p>如果指定这个参数，可以定制 connector 的行为。</p>
<ul>
<li>[<code>pure = true</code>] <em>(Boolean)</em>: 如果为 true，connector 将执行 <code>shouldComponentUpdate</code> 并且浅对比 <code>mergeProps</code> 的结果，避免不必要的更新，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。<em>默认值为 true。</em>
</li>
<li>[<code>withRef = false</code>] <em>(Boolean)</em>: 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 <code>getWrappedInstance()</code> 方法获得。<em>默认值为 false。</em>
</li>
</ul>
<p>这个connect组件还干了一件事，状态缓存判断。当store变了的时候，前后状态判断，如果状态不等，更新组件，并且完成事件分发。</p>
<h2 id="articleHeader11">6. Redux流程梳理</h2>
<p>上面讲了大量的函数源码，这么些函数之间的关系：<br><span class="img-wrap"><img data-src="/img/bV5UM9?w=985&amp;h=1370" src="https://static.alili.tech/img/bV5UM9?w=985&amp;h=1370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>初始化阶段：</p>
<ol>
<li>createStore创建一个store对象</li>
<li>将store对象通过参数给Provider组件</li>
<li>Provider组件将store通过context向子组件传递</li>
<li>Connect组件通过context获取到store，存入自己的state</li>
<li>componentDidMount里面订阅store.subscribe事件</li>
</ol>
<p>更新数据阶段：</p>
<ol>
<li>用户事件触发</li>
<li>actionCreator生成action交给dispatch</li>
<li>实际上交给了封装后的中间层（compose(applyMiddleware(...))）</li>
<li>请求依次通过每个中间件，中间件通过next进行下一步</li>
<li>最后一个中间件将action交给store.dispatch</li>
<li>dispatch内部将action交给reducer执行</li>
<li>combineReducer将每个子reducer执行一遍算出新的state</li>
<li>dispatch内部调用所有订阅事件</li>
<li>Connect组件handleChange事件触发判断新state和旧state是否===</li>
<li>并且判断新的state是否与mapStateToProps shallowEqual</li>
<li>不等则setState触发更新</li>
</ol>
<h2 id="articleHeader12">7.Redux设计技巧</h2>
<ol>
<li>匿名函数&amp;&amp;闭包使用<p>redux核心函数大量使用了匿名函数和闭包来实现数据共享和状态同步。</p>
</li>
<li>函数柯里化使用<p>使用函数柯里化s实现参数复用，本质上是降低通用性，提高适用性。</p>
</li>
<li>核心状态读取是拷贝而不是地址<p>对于state这种核心状态使用getState()计算出新的state，而不是直接返回一个state对象。</p>
</li>
<li>观察者订阅者是核心实现<p>使用观察者订阅者模式实现数据响应。</p>
</li>
<li>context这个api的使用<p>平时开发不常接触的api实现Provider与Connect通信。</p>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux源码分析

## 原文链接
[https://segmentfault.com/a/1190000013763950](https://segmentfault.com/a/1190000013763950)

