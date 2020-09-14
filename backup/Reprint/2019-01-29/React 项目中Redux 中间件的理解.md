---
title: 'React 项目中Redux 中间件的理解' 
date: 2019-01-29 2:30:10
hidden: true
slug: jgugdyg50l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>React/Redux项目结束后，当我在研究react-router源码的时候发现当中有一部分含中间件的思想，所以才想把中间件重新梳理一遍；在之前看redux了解到中间件，redux层面中间件的理解对项目前期比较有帮助，虽然项目中后期基本可以忽略这层概念；现在对这部分的笔记重新梳理，这里只针对这个中间件做一个理解。</p>
<blockquote><p>如果想学习项目的底层建设，建议先去学习官网<a href="https://github.com/reactjs/redux/tree/master/examples" rel="nofollow noreferrer" target="_blank">redux案例</a>，之后在学习<a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">react-router</a>的使用</p></blockquote>
<h2 id="articleHeader1">Redux 中间件介绍</h2>
<p><code>Redux</code> 目的是提供第三方插件的模式，改变<code>action -&gt; reducer</code> 的过程。变为 <code>action -&gt; middlewares -&gt; reducer</code> 。自己在项目中使用它改变数据流，实现异步 <code>action</code> ；下面会对日志输出做一个开场。</p>
<h2 id="articleHeader2">使用 Redux 中间件</h2>
<p>Redux 中 <code>applyMiddleware</code> 的方法，可以应用多个中间件，这里先只写一个中间件，以日志输出中间件为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//利用中间件做打印log
import {createStore,applyMiddleware} from 'redux';
import logger from '../api/logger';
import rootReducer from '../reducer/rootReducer';


let createStoreWithMiddleware = applyMiddleware(logger)(createStore);
let store = createStoreWithMiddleware(rootReducer);
// 也可以直接这样，可以参考createStore
// createStore(
//     rootReducer,
//     applyMiddleware(logger)
// )
export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//利用中间件做打印log</span>
<span class="hljs-keyword">import</span> {createStore,applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> logger <span class="hljs-keyword">from</span> <span class="hljs-string">'../api/logger'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../reducer/rootReducer'</span>;


<span class="hljs-keyword">let</span> createStoreWithMiddleware = applyMiddleware(logger)(createStore);
<span class="hljs-keyword">let</span> store = createStoreWithMiddleware(rootReducer);
<span class="hljs-comment">// 也可以直接这样，可以参考createStore</span>
<span class="hljs-comment">// createStore(</span>
<span class="hljs-comment">//     rootReducer,</span>
<span class="hljs-comment">//     applyMiddleware(logger)</span>
<span class="hljs-comment">// )</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<h4>logger 中间件结构分析</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const logger = store => next => action => {
    let result = next(action); // 返回的也是同样的action值
    console.log('dispatch', action);
    console.log('nextState', store.getState());
    return result;
};

export default logger;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> logger = <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> result = next(action); <span class="hljs-comment">// 返回的也是同样的action值</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch'</span>, action);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextState'</span>, store.getState());
    <span class="hljs-keyword">return</span> result;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> logger;</code></pre>
<p><code>store =&gt; next =&gt; action =&gt;{}</code> 实现了三层函数嵌套,最后返回 <code>next</code> ，给下一个中间件使用,接下来把三层函数拆解；</p>
<h4>从applyMiddleware源码开始分析</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="///redux/src/applyMiddleware.js
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, initialState, enhancer) => {
        var store = createStore(reducer, initialState, enhancer)
        var dispatch = store.dispatch
        var chain = []
        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">///redux/src/applyMiddleware.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">createStore</span>) =&gt;</span> (reducer, initialState, enhancer) =&gt; {
        <span class="hljs-keyword">var</span> store = createStore(reducer, initialState, enhancer)
        <span class="hljs-keyword">var</span> dispatch = store.dispatch
        <span class="hljs-keyword">var</span> chain = []
        <span class="hljs-keyword">var</span> middlewareAPI = {
            <span class="hljs-attr">getState</span>: store.getState,
            <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
        }
        chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        <span class="hljs-keyword">return</span> {
            ...store,
            dispatch
        }
    }
}</code></pre>
<h5>最外层store</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//源码分析
chain = middlewares.map(middleware => middleware(middlewareAPI));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//源码分析</span>
chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));</code></pre>
<p>我们发现store是middlewareAPI,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//store
var middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//store</span>
<span class="hljs-keyword">var</span> middlewareAPI = {
    <span class="hljs-attr">getState</span>: store.getState,
    <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
}</code></pre>
<p>然后就剩下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="next => action => {
    let result = next(action); // 返回的也是同样的action值
    console.log('dispatch', action);
    console.log('nextState', store.getState());
    return result;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> result = next(action); <span class="hljs-comment">// 返回的也是同样的action值</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch'</span>, action);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextState'</span>, store.getState());
    <span class="hljs-keyword">return</span> result;
};</code></pre>
<h5>中间层next</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//源码分析
dispatch = compose(...chain)(store.dispatch)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//源码分析</span>
dispatch = compose(...chain)(store.dispatch)</code></pre>
<p>先来分析compose(...chain)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//compose源码
export default function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//compose源码</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
    <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> arg
    }

    <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> funcs[<span class="hljs-number">0</span>]
    }

    <span class="hljs-keyword">const</span> last = funcs[funcs.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">const</span> rest = funcs.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> rest.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), last(...args))
}</code></pre>
<p>compose利用<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight" rel="nofollow noreferrer" target="_blank">Array.prototype.reduceRight</a>的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//reduceRight遍历介绍
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}, 10);

//结果 10+4+3+2+1+0 = 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//reduceRight遍历介绍</span>
[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].reduceRight(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">previousValue, currentValue, index, array</span>) </span>{
    <span class="hljs-keyword">return</span> previousValue + currentValue;
}, <span class="hljs-number">10</span>);

<span class="hljs-comment">//结果 10+4+3+2+1+0 = 20</span></code></pre>
<p>因为我们这里的中间件就只有一个，所以没有使用到reduceRight直接返回，直接返回<code>func[0]</code>（本身）;再由<code>compose(...chain)(store.dispatch)</code>,我们可以知道next就是store.dispatch</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(action) => {
    let result = store.dispatch(action); // 这里的next就是store.dispatch
    console.log('dispatch', action);
    console.log('nextState', store.getState());
    return result;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(action) =&gt; {
    <span class="hljs-keyword">let</span> result = store.dispatch(action); <span class="hljs-comment">// 这里的next就是store.dispatch</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch'</span>, action);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextState'</span>, store.getState());
    <span class="hljs-keyword">return</span> result;
};</code></pre>
<p>我们之后调用的<code>dispath</code>就是触发的是上面这个函数（这里就单个中间件）；</p>
<h2 id="articleHeader3">多个中间件</h2>
<ul>
<li><p>通过上面的 <code>applyMiddleware</code> , <code>compose</code> 和中间件的结构，</p></li>
<li><p>假设应用了如下的中间件: [A, B, C]，这里我们使用es5的结构做分析</p></li>
<li><p>分析action触发的完整流程</p></li>
</ul>
<p>三个中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//A
function A(store) {
    return function A(next) {
        return function A(action) {
            /*...*/;
            next(action);
            /*...*/;
            return /*...*/;
        }
    }
}
//B
function B(store) {
    return function B(next) {
        return function B(action) {
            /*...*/;
            next(action);
            /*...*/;
            return /*...*/;
        }
    }
}
//C
function C(store) {
    return function C(next) {
        return function C(action) {
            /*...*/;
            next(action);
            /*...*/;
            return /*...*/;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//A</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">store</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">next</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">action</span>) </span>{
            <span class="hljs-comment">/*...*/</span>;
            next(action);
            <span class="hljs-comment">/*...*/</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
        }
    }
}
<span class="hljs-comment">//B</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">store</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">next</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">action</span>) </span>{
            <span class="hljs-comment">/*...*/</span>;
            next(action);
            <span class="hljs-comment">/*...*/</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
        }
    }
}
<span class="hljs-comment">//C</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">store</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">next</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">action</span>) </span>{
            <span class="hljs-comment">/*...*/</span>;
            next(action);
            <span class="hljs-comment">/*...*/</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
        }
    }
}</code></pre>
<p>通过<code>chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))</code>，三个中间件的状态变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//A
function A(next) {
    return function A(action) {
        /*...*/;
        next(action);
        /*...*/;
        return /*...*/;
    }
}
//B
function B(next) {
    return function B(action) {
        /*...*/;
        next(action);
        /*...*/;
        return /*...*/;
    }
}
//C
function C(next) {
    return function C(action) {
        /*...*/;
        next(action);
        /*...*/;
        return /*...*/;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//A</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">action</span>) </span>{
        <span class="hljs-comment">/*...*/</span>;
        next(action);
        <span class="hljs-comment">/*...*/</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
    }
}
<span class="hljs-comment">//B</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">action</span>) </span>{
        <span class="hljs-comment">/*...*/</span>;
        next(action);
        <span class="hljs-comment">/*...*/</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
    }
}
<span class="hljs-comment">//C</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">action</span>) </span>{
        <span class="hljs-comment">/*...*/</span>;
        next(action);
        <span class="hljs-comment">/*...*/</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;
    }
}</code></pre>
<p>再由<code>dispatch = compose(...chain)(store.dispatch)</code>，我们转化下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const last = C;
const rest = [A,B]
dispatch = rest.reduceRight(
    (composed, f) =>{
        return f(composed)
    }, 
    last(store.dispatch)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> last = C;
<span class="hljs-keyword">const</span> rest = [A,B]
dispatch = rest.reduceRight(
    <span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span>{
        <span class="hljs-keyword">return</span> f(composed)
    }, 
    last(store.dispatch)
)</code></pre>
<p>我们得到的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = A(B(C(store.dispatch)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">dispatch = A(B(C(store.dispatch)));</code></pre>
<p>进一步分析，我们得到的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = A(B(C(store.dispatch)));

//执行C(next)，得到结果

A(B(function C(action) {/*...*/;next(action);/*...*/;return /*...*/;})); 
//此时的next = store.dispatch

//继续执行B(next)
A(function B(action) {/*...*/;next(action);/*...*/;return /*...*/;});    
//此时的next = function C(action) {/*...*/;next(action);/*...*/;return /*...*/;}

//继续执行A(next)
function A(action) {/*...*/;next(action);/*...*/;return /*...*/;};
//此时的next = function B(action) {/*...*/;next(action);/*...*/;return /*...*/;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">dispatch = A(B(C(store.dispatch)));

<span class="hljs-comment">//执行C(next)，得到结果</span>

A(B(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">action</span>) </span>{<span class="hljs-comment">/*...*/</span>;next(action);<span class="hljs-comment">/*...*/</span>;<span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;})); 
<span class="hljs-comment">//此时的next = store.dispatch</span>

<span class="hljs-comment">//继续执行B(next)</span>
A(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">action</span>) </span>{<span class="hljs-comment">/*...*/</span>;next(action);<span class="hljs-comment">/*...*/</span>;<span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;});    
<span class="hljs-comment">//此时的next = function C(action) {/*...*/;next(action);/*...*/;return /*...*/;}</span>

<span class="hljs-comment">//继续执行A(next)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">action</span>) </span>{<span class="hljs-comment">/*...*/</span>;next(action);<span class="hljs-comment">/*...*/</span>;<span class="hljs-keyword">return</span> <span class="hljs-comment">/*...*/</span>;};
<span class="hljs-comment">//此时的next = function B(action) {/*...*/;next(action);/*...*/;return /*...*/;}</span></code></pre>
<p>一个action触发执行顺序，<code>A(action) -&gt; B(action) -&gt; C(action) -&gt; store.dispatch(action)</code>(生产最新的 store 数据);</p>
<p>如果<code>next(action)</code>下面还有需要执行的代码，继续执行 <code>C(next 后的代码)-&gt;B(next 后的代码)-&gt;A(next 后的代码)</code></p>
<p>总结：先从内到外生成新的func，然后由外向内执行。本来我们可以直接使用<code>store.dispatch(action)</code>,但是我们可以通过中间件对action做一些处理或转换，比如异步操作，异步回调后再执行next；这样的设计很巧妙，只有等待next，才可以继续做操作，和平时直接异步回调又有些不一样</p>
<h2 id="articleHeader4">项目实践 -&gt;异步</h2>
<p>我们知道redux中actions分为actionType，actionCreator，然后在由reducer进行修改数据；</p>
<p>官方例子中async直接在actionCreator做了ajax请求；</p>
<p>我们把ajax放入中间件触发下面要讲的与官方real-world类似</p>
<p>我这边使用<a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="applyMiddleware(reduxThunk, api)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">applyMiddleware(reduxThunk, api)</code></pre>
<p>先来看看redux-thunk的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {//重新分发
            return action(dispatch, getState, extraArgument);
        }
        return next(action);//传递给下一个中间件
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {<span class="hljs-comment">//重新分发</span>
            <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
        }
        <span class="hljs-keyword">return</span> next(action);<span class="hljs-comment">//传递给下一个中间件</span>
    };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;</code></pre>
<p>这样一来我们可以把异步写成一个复用的actionCreator；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from '../../constants/actions/common';

export function request(apiName, params, opts = {}) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                apiName: apiName,
                params: params,
                opts: opts
            },
            type: types.API_REQUEST
        };
        return dispatch(action);
    };
}


//其他地方调用复用的方法如下：
export { request } from './request';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../../constants/actions/common'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">apiName, params, opts = {}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> action = {
            <span class="hljs-string">'API'</span>: {
                <span class="hljs-attr">apiName</span>: apiName,
                <span class="hljs-attr">params</span>: params,
                <span class="hljs-attr">opts</span>: opts
            },
            <span class="hljs-attr">type</span>: types.API_REQUEST
        };
        <span class="hljs-keyword">return</span> dispatch(action);
    };
}


<span class="hljs-comment">//其他地方调用复用的方法如下：</span>
<span class="hljs-keyword">export</span> { request } <span class="hljs-keyword">from</span> <span class="hljs-string">'./request'</span>;</code></pre>
<p>正常的写法，不是异步的，就是之前的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function cartSelect(id) {
    return { 
        type: types.CART_MAIN_SELECT, 
        id
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cartSelect</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> { 
        <span class="hljs-attr">type</span>: types.CART_MAIN_SELECT, 
        id
    };
}</code></pre>
<p>然后就是下一个中间件的处理 api.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//自己封装的ajax，可以使用别的，比如isomorphic-fetch
import net from 'net';
//项目中全部的接口，相当于一个关于异步的actionType有一个对应的后端接口
import API_ROOT from 'apiRoot';

export default store => next => action => {
    let API_OPT = action['API'];

    if (!API_OPT) {
        //我们约定这个没声明，就不是我们设计的异步action，执行下一个中间件
        return next(action);
    }

    let ACTION_TYPE = action['type'];
    let { apiName, params = {} , opts = {} } = API_OPT;
    /**
     * 如果有传递localData，就不会触发ajax了，直接触发_success
     * 当前也可以传其他参数
     */
    let { localData } = opts;
    let {
        onSuccess,
        onError,
        onProgress,
        ajaxType = 'GET',
        param
    } = params;
    // 触发下一个action
    let nextAction = function(type, param, opts) {
        action['type'] = type;
        action['opts'] = opts;
        delete param['onSuccess'];
        delete param['onError'];
        const nextRequestAction = {...action,...param}
        return nextRequestAction;
    };

    params={
        ...params,
        data: null
    };
    // 触发正在请求的action
    let result = next(nextAction(apiName + '_ON', params, opts));
    net.ajax({
        url: API_ROOT[apiName],
        type: ajaxType,
        param,
        localData,
        success: data => {
            onSuccess &amp;&amp; onSuccess(data);
            params={
                ...params,
                data
            };
            //触发请求成功的action
            return next(nextAction(apiName + '_SUCCESS', params, opts));
        },
        error: data => {
            onError &amp;&amp; onError(data);
            //触发请求失败的action
            return next(nextAction(apiName + '_ERROR', params, opts));
        }
    });

    return result;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//自己封装的ajax，可以使用别的，比如isomorphic-fetch</span>
<span class="hljs-keyword">import</span> net <span class="hljs-keyword">from</span> <span class="hljs-string">'net'</span>;
<span class="hljs-comment">//项目中全部的接口，相当于一个关于异步的actionType有一个对应的后端接口</span>
<span class="hljs-keyword">import</span> API_ROOT <span class="hljs-keyword">from</span> <span class="hljs-string">'apiRoot'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store =&gt; <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">let</span> API_OPT = action[<span class="hljs-string">'API'</span>];

    <span class="hljs-keyword">if</span> (!API_OPT) {
        <span class="hljs-comment">//我们约定这个没声明，就不是我们设计的异步action，执行下一个中间件</span>
        <span class="hljs-keyword">return</span> next(action);
    }

    <span class="hljs-keyword">let</span> ACTION_TYPE = action[<span class="hljs-string">'type'</span>];
    <span class="hljs-keyword">let</span> { apiName, params = {} , opts = {} } = API_OPT;
    <span class="hljs-comment">/**
     * 如果有传递localData，就不会触发ajax了，直接触发_success
     * 当前也可以传其他参数
     */</span>
    <span class="hljs-keyword">let</span> { localData } = opts;
    <span class="hljs-keyword">let</span> {
        onSuccess,
        onError,
        onProgress,
        ajaxType = <span class="hljs-string">'GET'</span>,
        param
    } = params;
    <span class="hljs-comment">// 触发下一个action</span>
    <span class="hljs-keyword">let</span> nextAction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, param, opts</span>) </span>{
        action[<span class="hljs-string">'type'</span>] = type;
        action[<span class="hljs-string">'opts'</span>] = opts;
        <span class="hljs-keyword">delete</span> param[<span class="hljs-string">'onSuccess'</span>];
        <span class="hljs-keyword">delete</span> param[<span class="hljs-string">'onError'</span>];
        <span class="hljs-keyword">const</span> nextRequestAction = {...action,...param}
        <span class="hljs-keyword">return</span> nextRequestAction;
    };

    params={
        ...params,
        <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>
    };
    <span class="hljs-comment">// 触发正在请求的action</span>
    <span class="hljs-keyword">let</span> result = next(nextAction(apiName + <span class="hljs-string">'_ON'</span>, params, opts));
    net.ajax({
        <span class="hljs-attr">url</span>: API_ROOT[apiName],
        <span class="hljs-attr">type</span>: ajaxType,
        param,
        localData,
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
            onSuccess &amp;&amp; onSuccess(data);
            params={
                ...params,
                data
            };
            <span class="hljs-comment">//触发请求成功的action</span>
            <span class="hljs-keyword">return</span> next(nextAction(apiName + <span class="hljs-string">'_SUCCESS'</span>, params, opts));
        },
        <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
            onError &amp;&amp; onError(data);
            <span class="hljs-comment">//触发请求失败的action</span>
            <span class="hljs-keyword">return</span> next(nextAction(apiName + <span class="hljs-string">'_ERROR'</span>, params, opts));
        }
    });

    <span class="hljs-keyword">return</span> result;
};</code></pre>
<p>强调一点：项目中全部的接口，相当于一个关于异步的actionType有一个对应的后端接口，所以我们才可以通过API_ROOT[apiName]找到这个接口</p>
<p>以cart为列子(下面是对应的每个文件)：</p>
<p>actionType：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//异步
export const CART_MAIN_GET = 'CART_MAIN_GET';
//非异步
export const CART_MAIN_SELECT = 'CART_MAIN_SELECT';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//异步</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CART_MAIN_GET = <span class="hljs-string">'CART_MAIN_GET'</span>;
<span class="hljs-comment">//非异步</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CART_MAIN_SELECT = <span class="hljs-string">'CART_MAIN_SELECT'</span>;</code></pre>
<p>api:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const api = {
    'CART_MAIN_GET':'/shopping-cart/show-shopping-cart'
};
export default api;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> api = {
    <span class="hljs-string">'CART_MAIN_GET'</span>:<span class="hljs-string">'/shopping-cart/show-shopping-cart'</span>
};
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> api;</code></pre>
<p>APIROOT修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import cart from './api/cart';
const APIROOT = {
    ...cart
};
export default API;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> cart <span class="hljs-keyword">from</span> <span class="hljs-string">'./api/cart'</span>;
<span class="hljs-keyword">const</span> APIROOT = {
    ...cart
};
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> API;</code></pre>
<p>actionCreator:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//项目中使用redux的bindActionCreators做一个统一的绑定，所以在这里单独引入
export { request } from './request';
//下面是非异步的方法
export function cartSelect(id) {
    return { 
        type: types.CART_MAIN_SELECT, 
        id
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//项目中使用redux的bindActionCreators做一个统一的绑定，所以在这里单独引入</span>
<span class="hljs-keyword">export</span> { request } <span class="hljs-keyword">from</span> <span class="hljs-string">'./request'</span>;
<span class="hljs-comment">//下面是非异步的方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cartSelect</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> { 
        <span class="hljs-attr">type</span>: types.CART_MAIN_SELECT, 
        id
    };
}</code></pre>
<p>项目中发起结构是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url = types.CART_MAIN_GET;
let param = {};
let params = {
    param: param,
    ajaxType: 'GET',
    onSuccess: (res) => {
        /*...*/
    },
    onError: (res) => {
        /*...*/
    }
};
request(url, params, {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> url = types.CART_MAIN_GET;
<span class="hljs-keyword">let</span> param = {};
<span class="hljs-keyword">let</span> params = {
    <span class="hljs-attr">param</span>: param,
    <span class="hljs-attr">ajaxType</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-comment">/*...*/</span>
    },
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-comment">/*...*/</span>
    }
};
request(url, params, {});</code></pre>
<p>其对应的reducers就是下面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from '../constants/actions/cart';
const initialState = {
    main:{
        isFetching: 0,//是否已经获取 
        didInvalidate:1,//是否失效
        itemArr:[],//自定义模版
        itemObj:{},//自定义模版数据
        header:{}//头部导航
    }
};
export default function(state = initialState, action) {
    let newState;
    switch (action.type) {
        case types.HOME_MAIN_GET + '_ON'://可以不写
            /*...*/
            return newState;
        case types.HOME_MAIN_GET + '_SUCCESS':
            /*...*/
            return newState;
        case types.HOME_MAIN_GET + '_ERROR'://可以不写
            /*...*/
            return newState;
        default:
            return state;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">import</span> * as types from <span class="hljs-string">'../constants/actions/cart'</span>;
const initialState = {
    main:<span class="hljs-type"></span>{
        isFetching: <span class="hljs-type">0</span>,<span class="hljs-comment">//是否已经获取 </span>
        didInvalidate:<span class="hljs-type">1</span>,<span class="hljs-comment">//是否失效</span>
        itemArr:<span class="hljs-type"></span>[],<span class="hljs-comment">//自定义模版</span>
        itemObj:<span class="hljs-type"></span>{},<span class="hljs-comment">//自定义模版数据</span>
        header:<span class="hljs-type"></span>{}<span class="hljs-comment">//头部导航</span>
    }
};
export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span></span>(state = initialState, action) {
    let <span class="hljs-keyword">new</span><span class="hljs-type">State</span>;
    <span class="hljs-keyword">switch</span> (action.type) {
        <span class="hljs-keyword">case</span> types.HOME_MAIN_GET + <span class="hljs-string">'_ON'</span>:<span class="hljs-type"></span>//可以不写
            <span class="hljs-comment">/*...*/</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">State</span>;
        <span class="hljs-keyword">case</span> types.HOME_MAIN_GET + <span class="hljs-string">'_SUCCESS'</span>:<span class="hljs-type"></span>
            <span class="hljs-comment">/*...*/</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">State</span>;
        <span class="hljs-keyword">case</span> types.HOME_MAIN_GET + <span class="hljs-string">'_ERROR'</span>:<span class="hljs-type"></span>//可以不写
            <span class="hljs-comment">/*...*/</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">State</span>;
        <span class="hljs-keyword">default</span>:<span class="hljs-type"></span>
            <span class="hljs-keyword">return</span> state;
    }
};</code></pre>
<p>异步，数据验证都可以通过中间件做处理；引用Generator，Async/Await，Promise处理，可以参考社区中的一些其他方式，比如：</p>
<ul>
<li><p><a href="http://github.com/acdlite/redux-promise" rel="nofollow noreferrer" target="_blank">redux-promise</a></p></li>
<li><p><a href="https://github.com/yelouafi/redux-saga" rel="nofollow noreferrer" target="_blank">redux-saga</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 项目中Redux 中间件的理解

## 原文链接
[https://segmentfault.com/a/1190000007843340](https://segmentfault.com/a/1190000007843340)

