---
title: 'Redux:Middleware你咋就这么难' 
date: 2019-01-26 2:30:18
hidden: true
slug: e6c9gymqoz7
categories: [reprint]
---

{{< raw >}}

                    
<p>　　这段时间都在学习Redux，感觉对我来说初学难度很大，中文官方文档读了好多遍才大概有点入门的感觉，小小地总结一下,首先可以看一下Redux的基本流程:<br><span class="img-wrap"><img data-src="/img/remote/1460000008322586?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000008322586?w=800&amp;h=600" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<p>　　从上面的图可以看出，简单来说，单一的<code>state</code>是存储在<code>store</code>中，当要对<code>state</code>进行更新的时候，首先要发起一个<code>action</code>(通过<code>dispatch</code>函数),<code>action</code>的作用就是相当于一个消息通知，用来描述发生了什么(比如:增加一个Todo)，然后<code>reducer</code>会根据<code>action</code>来进行对<code>state</code>更新，这样就可以根据新的<code>state</code>去渲染View。<br>　　<br>　　当然上面仅仅是发生同步Action的情况下，如果是Action是异步的(例如从服务器获取数据)，那么情况就有所不同了，必须要借助Redux的中间件Middleware。<br>　　</p>
<blockquote><p>Redux moddleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer</p></blockquote>
<p>　　根据官方的解释，Redux中间件在发起一个<code>action</code>至<code>action</code>到达<code>reducer</code>的之间，提供了一个第三方的扩展。本质上通过插件的形式，将原本的<code>action</code>-&gt;<code>redux</code>的流程改变为<code>action</code>-&gt;<code>middleware1</code>-&gt;<code>middleware2</code>-&gt; ... -&gt;<code>reducer</code>，通过改变数据流，从而实现例如异步Action、日志输入的功能。<br>　　首先我们举例不使用中间件Middleware创建store:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import rootReducer from './reducers'
import {createStore} from 'redux'

let store =  createStore(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">let</span> store =  createStore(rootReducer);</code></pre>
<p>　　那么使用中间件的情况下(以<code>redux-logger</code>举例),创建过程如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import rootReducer from './reducers'
import {createStore,applyMiddleware} from 'redux'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger();
let store = applyMiddleware(loggerMiddleware)(createStore)(rootReducer);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">import</span> {createStore,applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-logger'</span>

<span class="hljs-keyword">const</span> loggerMiddleware = createLogger();
<span class="hljs-keyword">let</span> store = applyMiddleware(loggerMiddleware)(createStore)(rootReducer);
</code></pre>
<p>　　<br>　　那么我们不经要问了，为什么采用了上面的代码就可以实现打印日志的中间件呢？<br>　　首先给出applyMiddleware的源码(Redux1.0.1版本):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {            return (next)  => 
        (reducer, initialState) => {

              var store = next(reducer, initialState);
              var dispatch = store.dispatch;
              var chain = [];

              var middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
              };

              chain = middlewares.map(middleware =>
                            middleware(middlewareAPI));
              dispatch = compose(...chain, store.dispatch);
              return {
                ...store,
                dispatch
              };
           };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{            <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>)  =&gt;</span> 
        (reducer, initialState) =&gt; {

              <span class="hljs-keyword">var</span> store = next(reducer, initialState);
              <span class="hljs-keyword">var</span> dispatch = store.dispatch;
              <span class="hljs-keyword">var</span> chain = [];

              <span class="hljs-keyword">var</span> middlewareAPI = {
                <span class="hljs-attr">getState</span>: store.getState,
                <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
              };

              chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span>
                            middleware(middlewareAPI));
              dispatch = compose(...chain, store.dispatch);
              <span class="hljs-keyword">return</span> {
                ...store,
                dispatch
              };
           };
}</code></pre>
<p>　　上面的代码虽然只有不到20行，但看懂确实是不太容易，实际上包含了函数式编程各种技术，首先最明显的使用到了柯里化(Currying),在我理解中柯里化(Currying)实际就是将多参数函数转化为单参数函数并延迟执行函数，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x){
    return function(y){
        return x + y;
    }
}
var add5 = add(5);
console.log(add5(10)); // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
        <span class="hljs-keyword">return</span> x + y;
    }
}
<span class="hljs-keyword">var</span> add5 = add(<span class="hljs-number">5</span>);
<span class="hljs-built_in">console</span>.log(add5(<span class="hljs-number">10</span>)); <span class="hljs-comment">// 10</span></code></pre>
<p>　　关于柯里化(Currying)更详细的介绍可以看我之前的一篇文章<a href="https://segmentfault.com/a/1190000008193605">从一道面试题谈谈函数柯里化(Currying)</a>。<br>　　首先我们看applyMiddleware的总体结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {            return (next)  => 
        (reducer, initialState) => {
        };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{            <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>)  =&gt;</span> 
        (reducer, initialState) =&gt; {
        };
}</code></pre>
<p>　　哈哈，典型的柯里化(Currying)，其中<code>(...middlewares)</code>用到了ES6中的新特性，用于将任意个中间件参数转化为中间件数组，因此很容易看出来在该函数的调用方法就是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = applyMiddleware(middleware1,middleware2)(createStore)(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> store = applyMiddleware(middleware1,middleware2)(createStore)(rootReducer);</code></pre>
<p>　　其中applyMiddleware形参和实参的对应关系是:</p>
<table>
<thead><tr>
<th align="center">形参</th>
<th align="center">实参</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><code>middlewares</code></td>
<td align="center"><code>[middleware1,middleware2]</code></td>
</tr>
<tr>
<td align="center"><code>createStore</code></td>
<td align="center">Redux原生<code>createStore</code>
</td>
</tr>
<tr>
<td align="center"><code>reducer, preloadedState, enhancer</code></td>
<td align="center">原生<code>createStore</code>需要填入的参数</td>
</tr>
</tbody>
</table>
<p>　　再看函数体:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var store = next(reducer, initialState);
var dispatch = store.dispatch;
var chain = [];
var middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> store = next(reducer, initialState);
<span class="hljs-keyword">var</span> dispatch = store.dispatch;
<span class="hljs-keyword">var</span> chain = [];
<span class="hljs-keyword">var</span> middlewareAPI = {
    <span class="hljs-attr">getState</span>: store.getState,
    <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
};</code></pre>
<p>　　上面代码非常简单，首先得到store,并将之前的<code>store.dispatch</code>存储在变量<code>dispatch</code>中，声明<code>chain</code>,以及将<code>middleware</code>需要的参数存储到变量<code>middlewareAPI</code>中。接下来的函数就有点难度了，让我们一行一行来看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain = middlewares.map(middleware => middleware(middlewareAPI))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI))</code></pre>
<p>　 上面实际的含义就是将middleware数组每一个<code>middleware</code>执行<br><code>middleware(middlewareAPI)</code>的返回值保存的chain数组中。那么我们不经要问了，中间件函数到底是怎样的？我们提供一个精简版的createLogger函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function createLogger({ getState }) {
      return (next) => 
        (action) => {
              const console = window.console;
              const prevState = getState();
              const returnValue = next(action);
              const nextState = getState();
              const actionType = String(action.type);
              const message = `action ${actionType}`;

              console.log(`%c prev state`, `color: #9E9E9E`, prevState);
              console.log(`%c action`, `color: #03A9F4`, action);
              console.log(`%c next state`, `color: #4CAF50`, nextState);
              return returnValue;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLogger</span>(<span class="hljs-params">{ getState }</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> 
        (action) =&gt; {
              <span class="hljs-keyword">const</span> <span class="hljs-built_in">console</span> = <span class="hljs-built_in">window</span>.console;
              <span class="hljs-keyword">const</span> prevState = getState();
              <span class="hljs-keyword">const</span> returnValue = next(action);
              <span class="hljs-keyword">const</span> nextState = getState();
              <span class="hljs-keyword">const</span> actionType = <span class="hljs-built_in">String</span>(action.type);
              <span class="hljs-keyword">const</span> message = <span class="hljs-string">`action <span class="hljs-subst">${actionType}</span>`</span>;

              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c prev state`</span>, <span class="hljs-string">`color: #9E9E9E`</span>, prevState);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c action`</span>, <span class="hljs-string">`color: #03A9F4`</span>, action);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c next state`</span>, <span class="hljs-string">`color: #4CAF50`</span>, nextState);
              <span class="hljs-keyword">return</span> returnValue;
    };
}</code></pre>
<p>　　可见中间件<code>createLogger</code>也是典型的柯里化(Currying)函数。<code>{getState}</code>使用了ES6的解构赋值,<code>createLogger(middlewareAPI))</code>返回的(也就是数组<code>chain</code>存储的是)函数的结构是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(next) => (action) => {
//包含getState、dispatch函数的闭包
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(next) =&gt; <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> {
<span class="hljs-comment">//包含getState、dispatch函数的闭包</span>
};</code></pre>
<p>　　我们接着看我们的<code>applyMiddleware</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = compose(...chain,store.dispatch)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dispatch = compose(...chain,store.dispatch)</code></pre>
<p>　　这句是最精妙也是最有难度的地方,注意一下，这里的<code>...</code>操作符是数组展开，下面我们先给出Redux中复合函数<code>compose</code>函数的实现(Redux1.0.1版本):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function compose(...funcs) {
     return funcs.reduceRight((composed, f) => f(composed));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
     <span class="hljs-keyword">return</span> funcs.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed));
}</code></pre>
<p>　　首先先明确一下<code>reduceRight</code>(我用过的次数区区可数，所以介绍一下<code>reduce</code>和<code>reduceRight</code>)<br>　　</p>
<blockquote><p>Array.prototype.reduce.reduce(callback, [initialValue])</p></blockquote>
<p>reduce方法有两个参数，第一个参数是一个callback，用于针对数组项的操作；第二个参数则是传入的初始值，这个初始值用于单个数组项的操作。需要注意的是，reduce方法返回值并不是数组，而是形如初始值的经过叠加处理后的操作。<br>callback分别有四个参数:</p>
<ol>
<li><p>accumulator:上一次callback返回的累积值</p></li>
<li><p>currentValue: 当前值</p></li>
<li><p>currentIndex: 当前值索引</p></li>
<li><p>array: 数组<br>例如:</p></li>
</ol>
<p>var sum = [0, 1, 2, 3].reduce(function(a, b) {<br>  return a + b;<br>}, 0);<br>// sum is 6</p>
<p>　　<code>reduce</code>和<code>reduceRight</code>的区别就是从左到右和从右到左的区别。所以如果我们调用<code>compose([func1,func2],store.dispatch)</code>的话，实际返回的函数是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//也就是当前dispatch的值
func1(func2(store.dispatch))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//也就是当前dispatch的值</span>
func1(func2(store.dispatch))</code></pre>
<p>　　胜利在望，看最后一句:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    ...store,
    dispatch
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> {
    ...store,
    dispatch
};</code></pre>
<p>　　这里其实是ES7的用法,相当于ES6中的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Object.assign({},store,{dispatch:dispatch});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({},store,{<span class="hljs-attr">dispatch</span>:dispatch});</code></pre>
<p>　　或者是Underscore.js中的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return _.extends({}, store, { dispatch: dispatch });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> _.extends({}, store, { <span class="hljs-attr">dispatch</span>: dispatch });</code></pre>
<p>　　懂了吧，就是新创建的一个对象，将store中的所有可枚举属性复制进去(浅复制),并用当前的<code>dispatch</code>覆盖store中的<code>dispatch</code>属性。所以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = applyMiddleware(loggerMiddleware)(createStore)(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> store = applyMiddleware(loggerMiddleware)(createStore)(rootReducer);</code></pre>
<p>中的<code>store</code>中的<code>dispatch</code>属性已经不是之前的Redux原生的<code>dispatch</code>而是类似于<code>func1(func2(store.dispatch))</code>这种形式的函数了，但是我们不禁又要问了，那么中间件Midddleware又是怎么做的呢，我们看一下之前我们提供的建议的打印日志的函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function createLogger({ getState }) {
      return (next) => 
        (action) => {
              const console = window.console;
              const prevState = getState();
              const returnValue = next(action);
              const nextState = getState();
              const actionType = String(action.type);
              const message = `action ${actionType}`;

              console.log(`%c prev state`, `color: #9E9E9E`, prevState);
              console.log(`%c action`, `color: #03A9F4`, action);
              console.log(`%c next state`, `color: #4CAF50`, nextState);
              return returnValue;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLogger</span>(<span class="hljs-params">{ getState }</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> 
        (action) =&gt; {
              <span class="hljs-keyword">const</span> <span class="hljs-built_in">console</span> = <span class="hljs-built_in">window</span>.console;
              <span class="hljs-keyword">const</span> prevState = getState();
              <span class="hljs-keyword">const</span> returnValue = next(action);
              <span class="hljs-keyword">const</span> nextState = getState();
              <span class="hljs-keyword">const</span> actionType = <span class="hljs-built_in">String</span>(action.type);
              <span class="hljs-keyword">const</span> message = <span class="hljs-string">`action <span class="hljs-subst">${actionType}</span>`</span>;

              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c prev state`</span>, <span class="hljs-string">`color: #9E9E9E`</span>, prevState);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c action`</span>, <span class="hljs-string">`color: #03A9F4`</span>, action);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c next state`</span>, <span class="hljs-string">`color: #4CAF50`</span>, nextState);
              <span class="hljs-keyword">return</span> returnValue;
    };
}</code></pre>
<p>　　假设一下，我们现在使用两个中间件,<code>createLogger</code>和<code>createMiddleware</code>,其中<code>createMiddleware</code>的函数为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function createMiddleware({ getState }) {
      return (next) => 
        (action) => {
        return next(action)
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createMiddleware</span>(<span class="hljs-params">{ getState }</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> 
        (action) =&gt; {
        <span class="hljs-keyword">return</span> next(action)
    };
}</code></pre>
<p>调用形式为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = applyMiddleware(createLogger,createMiddleware)(createStore)(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> store = applyMiddleware(createLogger,createMiddleware)(createStore)(rootReducer);</code></pre>
<p>如果调用了<code>store.dispatch(action)</code>,<code>chain</code>中的两个函数分别是<br><code>createLogger</code>和<code>createMiddleware</code>中的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(next) => (action) => {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">(next) =&gt; <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> {}</code></pre>
<p>部分。我们姑且命名一下<code>chain</code>中关于<code>createLogger</code>的函数叫做<br><code>func1</code>,关于<code>createMiddleware</code>的函数叫做func2。那么现在调用<br><code>store.dispatch(action)</code>,实际就调用了(注意顺序)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里的store.dispatch是原始Redux提供的dispatch函数
func1(func2(store.dispatch))(action)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这里的store.dispatch是原始Redux提供的dispatch函数</span>
func1(func2(store.dispatch))(action)</code></pre>
<p>　　上面的函数大家注意之前执行次序，首先<code>func2(store.dispatch</code>再是<code>func1(args)(action)</code>。对于func1获得的next的实参是参数是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(action)=>{
    //func2中的next是store.dispatch
    next(action);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(action)=&gt;{
    <span class="hljs-comment">//func2中的next是store.dispatch</span>
    next(action);
}</code></pre>
<p>　　那么实际上<code>func1(...)(action)</code>执行的时候，也就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const console = window.console;
const prevState = getState();
const returnValue = next(action);
const nextState = getState();
const actionType = String(action.type);
const message = `action ${actionType}`;

console.log(`%c prev state`, `color: #9E9E9E`, prevState);
console.log(`%c action`, `color: #03A9F4`, action);
console.log(`%c next state`, `color: #4CAF50`, nextState);
return returnValue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> <span class="hljs-built_in">console</span> = <span class="hljs-built_in">window</span>.console;
<span class="hljs-keyword">const</span> prevState = getState();
<span class="hljs-keyword">const</span> returnValue = next(action);
<span class="hljs-keyword">const</span> nextState = getState();
<span class="hljs-keyword">const</span> actionType = <span class="hljs-built_in">String</span>(action.type);
<span class="hljs-keyword">const</span> message = <span class="hljs-string">`action <span class="hljs-subst">${actionType}</span>`</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c prev state`</span>, <span class="hljs-string">`color: #9E9E9E`</span>, prevState);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c action`</span>, <span class="hljs-string">`color: #03A9F4`</span>, action);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`%c next state`</span>, <span class="hljs-string">`color: #4CAF50`</span>, nextState);
<span class="hljs-keyword">return</span> returnValue;</code></pre>
<p>的时候，getState调用的闭包MiddlewareAPI中的Redux的getState函数，调用next(action)的时候，会回调<code>createMiddleware</code>函数，然后<code>createMiddleware</code>中<code>next</code>函数会回调真正的store.dispatch(action)。因此我们可以看出来实际的调用顺序是和传入中间件顺序相反的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = applyMiddleware(Middleware1,Middleware2,Middleware3)(createStore)(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> store = applyMiddleware(Middleware1,Middleware2,Middleware3)(createStore)(rootReducer);</code></pre>
<p>实际的执行是次序是<code>store.dispatch</code>-&gt;<code>Middleware3</code>-&gt;<code>Middleware2</code>-&gt;<code>Middleware1</code>。<br>　　不知道大家有没有注意到一点，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var middlewareAPI = {
    getState: store.getState,
    dispatch: <span class="hljs-function"><span class="hljs-params">(action)</span> =&gt;</span> dispatch(action)
};</code></pre>
<p>并没有直接使用<code>dispatch:dispatch</code>，而是使用了<code>dispatch:(action) =&gt; dispatch(action)</code>，其目的是如果使用了<code>dispatch:dispatch</code>，那么在所有的Middleware中实际都引用的同一个<code>dispatch</code>(闭包)，如果存在一个中间件修改了<code>dispatch</code>，就会导致后面一下一系列的问题，但是如果使用<code>dispatch:(action) =&gt; dispatch(action)</code>就可以避免这个问题。<br>　　接下来我们看看异步的action如何实现，我们先演示一个异步action creater函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const FETCHING_DATA = 'FETCHING_DATA'; // 拉取状态
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'; //接收到拉取的状态
export function fetchingData(flag) {
    return {
        type: FETCHING_DATA,
        isFetchingData: flag
    };
}

export function receiveUserData(json) {
    return {
        type: RECEIVE_USER_DATA,
        profile: json
    }
}
export function fetchUserInfo(username) {
    return function (dispatch) {
        dispatch(fetchingData(true));
        return fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(json => {
                console.log(json);
                return json;
            })
            .then((json) => {
                dispatch(receiveUserData(json))
            })
            .then(() => dispatch(fetchingData(false)));
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> FETCHING_DATA = <span class="hljs-string">'FETCHING_DATA'</span>; <span class="hljs-comment">// 拉取状态</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> RECEIVE_USER_DATA = <span class="hljs-string">'RECEIVE_USER_DATA'</span>; <span class="hljs-comment">//接收到拉取的状态</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchingData</span>(<span class="hljs-params">flag</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: FETCHING_DATA,
        <span class="hljs-attr">isFetchingData</span>: flag
    };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">receiveUserData</span>(<span class="hljs-params">json</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: RECEIVE_USER_DATA,
        <span class="hljs-attr">profile</span>: json
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchUserInfo</span>(<span class="hljs-params">username</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        dispatch(fetchingData(<span class="hljs-literal">true</span>));
        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`https://api.github.com/users/<span class="hljs-subst">${username}</span>`</span>)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(response);
                <span class="hljs-keyword">return</span> response.json();
            })
            .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(json);
                <span class="hljs-keyword">return</span> json;
            })
            .then(<span class="hljs-function">(<span class="hljs-params">json</span>) =&gt;</span> {
                dispatch(receiveUserData(json))
            })
            .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> dispatch(fetchingData(<span class="hljs-literal">false</span>)));
    };
}</code></pre>
<p>　　上面的代码用来从Github API中拉取名为username的用户信息，可见首先<code>fetchUserInfo</code>函数会<code>dispatch</code>一个表示开始拉取的<code>action</code>，然后使用<code>fetch</code>函数访问Github的API,并返回一个Promise,等到获取到数据的时候，<code>dispatch</code>一个收到数据的<code>action</code>，最后<code>dispatch</code>一个拉取结束的<code>action</code>。因为普通的<code>action</code>都是一个纯JavaScript Object对象，但是异步的Action却返回的是一个function，这是我们就要使用的一个中间件:redux-thunk。<br>　　我们给出一个类似redux-thunk的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function thunkMiddleware({ dispatch, getState }) {
      return next => 
             action => 
                   typeof action === ‘function’ ? 
                     action(dispatch, getState) : 
                     next(action);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkMiddleware</span>(<span class="hljs-params">{ dispatch, getState }</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> 
             action =&gt; 
                   <span class="hljs-keyword">typeof</span> action === ‘<span class="hljs-function"><span class="hljs-keyword">function</span>’ ? 
                     <span class="hljs-title">action</span>(<span class="hljs-params">dispatch, getState</span>) : 
                     <span class="hljs-title">next</span>(<span class="hljs-params">action</span>);
}</span></code></pre>
<p>这个和你之前看到的中间件很类似。如果得到的action是个函数，就用dispatch和getState当作参数来调用它，否则就直接分派给store。从而实现异步的Action。<br>　　Redux入门学习，如果有写的不对的地方，希望大家指正，欢迎大家围观我的博客:<br>　　<br>　　<a href="https://mrerhu.github.io" rel="nofollow noreferrer" target="_blank">MrErHu</a><br>　　<a href="https://segmentfault.com/u/qingjiaowowangleitongxue">SegmentFault</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux:Middleware你咋就这么难

## 原文链接
[https://segmentfault.com/a/1190000008322583](https://segmentfault.com/a/1190000008322583)

