---
title: 'Redux 莞式教程 之 进阶篇' 
date: 2019-02-05 2:30:09
hidden: true
slug: fftzu3xv0qk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Redux 进阶教程</h1>
<blockquote>
<p>原文（保持更新）：<a href="https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md" rel="nofollow noreferrer" target="_blank">https://github.com/kenberkele...</a></p>
<h3 id="articleHeader1">写在前面</h3>
<p>相信您已经看过 <a href="https://github.com/kenberkeley/redux-simple-tutorial" rel="nofollow noreferrer" target="_blank">Redux 简明教程</a>，本教程是简明教程的实战化版本，伴随源码分析  <br>Redux 用的是 ES6 编写，看到有疑惑的地方的，可以复制粘贴到<a href="http://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">这里</a>在线编译 ES5</p>
</blockquote>
<h2 id="articleHeader2">§ Redux API 总览</h2>
<p>在 Redux 的<a href="https://github.com/reactjs/redux/tree/master/src" rel="nofollow noreferrer" target="_blank">源码目录</a> <code>src/</code>，我们可以看到如下文件结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── utils/
│     ├── warning.js # 打酱油的，负责在控制台显示警告信息
├── applyMiddleware.js
├── bindActionCreators.js
├── combineReducers.js
├── compose.js
├── createStore.js
├── index.js # 入口文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>├── utils/
│     ├── warning.js <span class="hljs-meta"># 打酱油的，负责在控制台显示警告信息</span>
├── applyMiddleware.js
├── bindActionCreators.js
├── combineReducers.js
├── compose.js
├── createStore.js
├── <span class="hljs-keyword">index</span>.js <span class="hljs-meta"># 入口文件</span></code></pre>
<p>除去打酱油的 <code>utils/warning.js</code> 以及入口文件 <code>index.js</code>，剩下那 5 个就是 Redux 的 API</p>
<h2 id="articleHeader3">§ <a href="http://cn.redux.js.org/docs/api/compose.html" rel="nofollow noreferrer" target="_blank">compose(...functions)</a>
</h2>
<blockquote><p>先说这个 API 的原因是它没有依赖，是一个纯函数</p></blockquote>
<h3 id="articleHeader4">⊙ 源码分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 看起来逼格很高，实际运用其实是这样子的：
 * compose(f, g, h)(...arg) => f(g(h(...args)))
 *
 * 值得注意的是，它用到了 reduceRight，因此执行顺序是从右到左
 *
 * @param  {多个函数，用逗号隔开}
 * @return {函数}
 */

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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 看起来逼格很高，实际运用其实是这样子的：
 * compose(f, g, h)(...arg) =&gt; f(g(h(...args)))
 *
 * 值得注意的是，它用到了 reduceRight，因此执行顺序是从右到左
 *
 * @param  {多个函数，用逗号隔开}
 * @return {函数}
 */</span>

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
<p>这里的关键点在于，<code>reduceRight</code> 可传入初始值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 由于 reduce / reduceRight 仅仅是方向的不同，因此下面用 reduce 说明即可
var arr = [1, 2, 3, 4, 5]

var re1 = arr.reduce(function(total, i) {
  return total + i
})
console.log(re1) // 15

var re2 = arr.reduce(function(total, i) {
  return total + i
}, 100) // <---------------传入一个初始值
console.log(re2) // 115" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 由于 reduce / reduceRight 仅仅是方向的不同，因此下面用 reduce 说明即可</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]

<span class="hljs-keyword">var</span> re1 = arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">total, i</span>) </span>{
  <span class="hljs-keyword">return</span> total + i
})
<span class="hljs-built_in">console</span>.log(re1) <span class="hljs-comment">// 15</span>

<span class="hljs-keyword">var</span> re2 = arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">total, i</span>) </span>{
  <span class="hljs-keyword">return</span> total + i
}, <span class="hljs-number">100</span>) <span class="hljs-comment">// &lt;---------------传入一个初始值</span>
<span class="hljs-built_in">console</span>.log(re2) <span class="hljs-comment">// 115</span></code></pre>
<p>下面是 <code>compose</code> 的实例（<a href="http://jsbin.com/gavomes/edit?html,console" rel="nofollow noreferrer" target="_blank">在线演示</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <script src=&quot;//cdn.bootcss.com/redux/3.5.2/redux.min.js&quot;></script>
</head>
<body>
<script>
function func1(num) {
  console.log('func1 获得参数 ' + num);
  return num + 1;
}

function func2(num) {
  console.log('func2 获得参数 ' + num);
  return num + 2;
}
  
function func3(num) {
  console.log('func3 获得参数 ' + num);
  return num + 3;
}

// 有点难看（如果函数名再长一点，那屏幕就不够宽了）
var re1 = func3(func2(func1(0)));
console.log('re1：' + re1);

console.log('===============');

// 很优雅
var re2 = Redux.compose(func3, func2, func1)(0);
console.log('re2：' + re2);
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/redux/3.5.2/redux.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func1 获得参数 '</span> + num);
  <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func2 获得参数 '</span> + num);
  <span class="hljs-keyword">return</span> num + <span class="hljs-number">2</span>;
}
  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func3</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'func3 获得参数 '</span> + num);
  <span class="hljs-keyword">return</span> num + <span class="hljs-number">3</span>;
}

<span class="hljs-comment">// 有点难看（如果函数名再长一点，那屏幕就不够宽了）</span>
<span class="hljs-keyword">var</span> re1 = func3(func2(func1(<span class="hljs-number">0</span>)));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'re1：'</span> + re1);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'==============='</span>);

<span class="hljs-comment">// 很优雅</span>
<span class="hljs-keyword">var</span> re2 = Redux.compose(func3, func2, func1)(<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'re2：'</span> + re2);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
re1：6
===============
func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
re2：6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
<span class="hljs-section">re1：6
===============</span>
func1 获得参数 0
func2 获得参数 1
func3 获得参数 3
re2：6</code></pre>
<h2 id="articleHeader5">§ <a href="http://cn.redux.js.org/docs/api/createStore.html" rel="nofollow noreferrer" target="_blank">createStore(reducer, initialState, enhancer)</a>
</h2>
<h3 id="articleHeader6">⊙ 源码分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

/**
 * 这是 Redux 的私有 action 常量
 * 长得太丑了，你不要鸟就行了
 */
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

/**
 * @param  {函数}  reducer 不多解释了
 * @param  {对象}  preloadedState 主要用于前后端同构时的数据同步
 * @param  {函数}  enhancer 很牛逼，可以实现中间件、时间旅行，持久化等
 * ※ Redux 仅提供 appleMiddleware 这个 Store Enhancer ※
 * @return {Store}
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // 这里省略的代码，到本文的最后再讲述（用于压轴你懂的）
  
  var currentReducer = reducer
  var currentState = preloadedState //     这就是整个应用的 state
  var currentListeners = [] //             用于存储订阅的回调函数，dispatch 后逐个执行
  var nextListeners = currentListeners // 【悬念1：为什么需要两个 存放回调函数 的变量？】
  var isDispatching = false

  /**
   * 【悬念1·解疑】
   * 试想，dispatch 后，回调函数正在乖乖地被逐个执行（for 循环进行时）
   * 假设回调函数队列原本是这样的 [a, b, c, d]
   *
   * 现在 for 循环执行到第 3 步，亦即 a、b 已经被执行，准备执行 c
   * 但在这电光火石的瞬间，a 被取消订阅！！！
   *
   * 那么此时回调函数队列就变成了 [b, c, d]
   * 那么第 3 步就对应换成了 d！！！
   * c 被跳过了！！！这就是躺枪。。。
   * 
   * 作为一个回调函数，最大的耻辱就是得不到执行
   * 因此为了避免这个问题，本函数会在上述场景中把
   * currentListeners 复制给 nextListeners
   *
   * 这样的话，dispatch 后，在逐个执行回调函数的过程中
   * 如果有新增订阅或取消订阅，都在 nextListeners 中操作
   * 让 currentListeners 中的回调函数得以完整地执行
   *
   * 既然新增是在 nextListeners 中 push，因此毫无疑问
   * 新的回调函数不会在本次 currentListeners 的循环体中被触发
   *
   * （上述事件发生的几率虽然很低，但还是严谨点比较好）
   */
  function ensureCanMutateNextListeners() { // <-------这货就叫做【ensure 哥】吧
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * 返回 state
   */
  function getState() {
    return currentState
  }

  /**
   * 负责注册回调函数的老司机
   * 
   * 这里需要注意的就是，回调函数中如果需要获取 state
   * 那每次获取都请使用 getState()，而不是开头用一个变量缓存住它
   * 因为回调函数执行期间，有可能有连续几个 dispatch 让 state 改得物是人非
   * 而且别忘了，dispatch 之后，整个 state 是被完全替换掉的
   * 你缓存的 state 指向的可能已经是老掉牙的 state 了！！！
   *
   * @param  {函数} 想要订阅的回调函数
   * @return {函数} 取消订阅的函数
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners() // 调用 ensure 哥保平安
    nextListeners.push(listener)   // 新增订阅在 nextListeners 中操作

    // 返回一个取消订阅的函数
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners() // 调用 ensure 哥保平安
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1) // 取消订阅还是在 nextListeners 中操作
    }
  }

  /**
   * 改变应用状态 state 的不二法门：dispatch 一个 action
   * 内部的实现是：往 reducer 中传入 currentState 以及 action
   * 用其返回值替换 currentState，最后逐个触发回调函数
   *
   * 如果 dispatch 的不是一个对象类型的 action（同步的），而是 Promise / thunk（异步的）
   * 则需引入 redux-thunk 等中间件来反转控制权【悬念2：什么是反转控制权？】
   * 
   * @param &amp; @return {对象} action
   */
  function dispatch(action) {
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
      // 关键点：currentState 与 action 会流通到所有的 reducer
      // 所有 reducer 的返回值整合后，替换掉当前的 currentState
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // 令 currentListeners 等于 nextListeners，表示正在逐个执行回调函数（这就是上面 ensure 哥的判定条件）
    var listeners = currentListeners = nextListeners

    // 逐个触发回调函数。这里不缓存数组长度是明智的，原因见【悬念1·解疑】
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action // 为了方便链式调用，dispatch 执行完毕后，返回 action（下文会提到的，稍微记住就好了）
  }

  /**
   * 替换当前 reducer 的老司机
   * 主要用于代码分离按需加载、热替换等情况
   *
   * @param {函数} nextReducer
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer //         就是这么简单粗暴！
    dispatch({ type: ActionTypes.INIT }) // 触发生成新的 state 树
  }

  /**
   * 这是留给 可观察/响应式库 的接口（详情 https://github.com/zenparsing/es-observable）
   * 如果您了解 RxJS 等响应式编程库，那可能会用到这个接口，否则请略过
   * @return {observable}
   */
  function observable() {略}

  // 这里 dispatch 只是为了生成 应用初始状态
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> isPlainObject <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/isPlainObject'</span>
<span class="hljs-keyword">import</span> $$observable <span class="hljs-keyword">from</span> <span class="hljs-string">'symbol-observable'</span>

<span class="hljs-comment">/**
 * 这是 Redux 的私有 action 常量
 * 长得太丑了，你不要鸟就行了
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> ActionTypes = {
  <span class="hljs-attr">INIT</span>: <span class="hljs-string">'@@redux/INIT'</span>
}

<span class="hljs-comment">/**
 * @param  {函数}  reducer 不多解释了
 * @param  {对象}  preloadedState 主要用于前后端同构时的数据同步
 * @param  {函数}  enhancer 很牛逼，可以实现中间件、时间旅行，持久化等
 * ※ Redux 仅提供 appleMiddleware 这个 Store Enhancer ※
 * @return {Store}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">reducer, preloadedState, enhancer</span>) </span>{
  <span class="hljs-comment">// 这里省略的代码，到本文的最后再讲述（用于压轴你懂的）</span>
  
  <span class="hljs-keyword">var</span> currentReducer = reducer
  <span class="hljs-keyword">var</span> currentState = preloadedState <span class="hljs-comment">//     这就是整个应用的 state</span>
  <span class="hljs-keyword">var</span> currentListeners = [] <span class="hljs-comment">//             用于存储订阅的回调函数，dispatch 后逐个执行</span>
  <span class="hljs-keyword">var</span> nextListeners = currentListeners <span class="hljs-comment">// 【悬念1：为什么需要两个 存放回调函数 的变量？】</span>
  <span class="hljs-keyword">var</span> isDispatching = <span class="hljs-literal">false</span>

  <span class="hljs-comment">/**
   * 【悬念1·解疑】
   * 试想，dispatch 后，回调函数正在乖乖地被逐个执行（for 循环进行时）
   * 假设回调函数队列原本是这样的 [a, b, c, d]
   *
   * 现在 for 循环执行到第 3 步，亦即 a、b 已经被执行，准备执行 c
   * 但在这电光火石的瞬间，a 被取消订阅！！！
   *
   * 那么此时回调函数队列就变成了 [b, c, d]
   * 那么第 3 步就对应换成了 d！！！
   * c 被跳过了！！！这就是躺枪。。。
   * 
   * 作为一个回调函数，最大的耻辱就是得不到执行
   * 因此为了避免这个问题，本函数会在上述场景中把
   * currentListeners 复制给 nextListeners
   *
   * 这样的话，dispatch 后，在逐个执行回调函数的过程中
   * 如果有新增订阅或取消订阅，都在 nextListeners 中操作
   * 让 currentListeners 中的回调函数得以完整地执行
   *
   * 既然新增是在 nextListeners 中 push，因此毫无疑问
   * 新的回调函数不会在本次 currentListeners 的循环体中被触发
   *
   * （上述事件发生的几率虽然很低，但还是严谨点比较好）
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ensureCanMutateNextListeners</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &lt;-------这货就叫做【ensure 哥】吧</span>
    <span class="hljs-keyword">if</span> (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  <span class="hljs-comment">/**
   * 返回 state
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getState</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> currentState
  }

  <span class="hljs-comment">/**
   * 负责注册回调函数的老司机
   * 
   * 这里需要注意的就是，回调函数中如果需要获取 state
   * 那每次获取都请使用 getState()，而不是开头用一个变量缓存住它
   * 因为回调函数执行期间，有可能有连续几个 dispatch 让 state 改得物是人非
   * 而且别忘了，dispatch 之后，整个 state 是被完全替换掉的
   * 你缓存的 state 指向的可能已经是老掉牙的 state 了！！！
   *
   * @param  {函数} 想要订阅的回调函数
   * @return {函数} 取消订阅的函数
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">listener</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> listener !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected listener to be a function.'</span>)
    }

    <span class="hljs-keyword">var</span> isSubscribed = <span class="hljs-literal">true</span>

    ensureCanMutateNextListeners() <span class="hljs-comment">// 调用 ensure 哥保平安</span>
    nextListeners.push(listener)   <span class="hljs-comment">// 新增订阅在 nextListeners 中操作</span>

    <span class="hljs-comment">// 返回一个取消订阅的函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (!isSubscribed) {
        <span class="hljs-keyword">return</span>
      }

      isSubscribed = <span class="hljs-literal">false</span>

      ensureCanMutateNextListeners() <span class="hljs-comment">// 调用 ensure 哥保平安</span>
      <span class="hljs-keyword">var</span> index = nextListeners.indexOf(listener)
      nextListeners.splice(index, <span class="hljs-number">1</span>) <span class="hljs-comment">// 取消订阅还是在 nextListeners 中操作</span>
    }
  }

  <span class="hljs-comment">/**
   * 改变应用状态 state 的不二法门：dispatch 一个 action
   * 内部的实现是：往 reducer 中传入 currentState 以及 action
   * 用其返回值替换 currentState，最后逐个触发回调函数
   *
   * 如果 dispatch 的不是一个对象类型的 action（同步的），而是 Promise / thunk（异步的）
   * 则需引入 redux-thunk 等中间件来反转控制权【悬念2：什么是反转控制权？】
   * 
   * @param &amp; @return {对象} action
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
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
      <span class="hljs-comment">// 关键点：currentState 与 action 会流通到所有的 reducer</span>
      <span class="hljs-comment">// 所有 reducer 的返回值整合后，替换掉当前的 currentState</span>
      currentState = currentReducer(currentState, action)
    } <span class="hljs-keyword">finally</span> {
      isDispatching = <span class="hljs-literal">false</span>
    }

    <span class="hljs-comment">// 令 currentListeners 等于 nextListeners，表示正在逐个执行回调函数（这就是上面 ensure 哥的判定条件）</span>
    <span class="hljs-keyword">var</span> listeners = currentListeners = nextListeners

    <span class="hljs-comment">// 逐个触发回调函数。这里不缓存数组长度是明智的，原因见【悬念1·解疑】</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
      listeners[i]()
    }

    <span class="hljs-keyword">return</span> action <span class="hljs-comment">// 为了方便链式调用，dispatch 执行完毕后，返回 action（下文会提到的，稍微记住就好了）</span>
  }

  <span class="hljs-comment">/**
   * 替换当前 reducer 的老司机
   * 主要用于代码分离按需加载、热替换等情况
   *
   * @param {函数} nextReducer
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceReducer</span>(<span class="hljs-params">nextReducer</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextReducer !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the nextReducer to be a function.'</span>)
    }

    currentReducer = nextReducer <span class="hljs-comment">//         就是这么简单粗暴！</span>
    dispatch({ <span class="hljs-attr">type</span>: ActionTypes.INIT }) <span class="hljs-comment">// 触发生成新的 state 树</span>
  }

  <span class="hljs-comment">/**
   * 这是留给 可观察/响应式库 的接口（详情 https://github.com/zenparsing/es-observable）
   * 如果您了解 RxJS 等响应式编程库，那可能会用到这个接口，否则请略过
   * @return {observable}
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observable</span>(<span class="hljs-params"></span>) </span>{略}

  <span class="hljs-comment">// 这里 dispatch 只是为了生成 应用初始状态</span>
  dispatch({ <span class="hljs-attr">type</span>: ActionTypes.INIT })

  <span class="hljs-keyword">return</span> {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
</code></pre>
<p>【悬念2：什么是反转控制权？ · 解疑】  <br>在同步场景下，<code>dispatch(action)</code> 的这个 <code>action</code> 中的数据是同步获取的，并没有控制权的切换问题  <br>但异步场景下，则需要将 <code>dispatch</code> 传入到回调函数。待异步操作完成后，回调函数<strong>自行</strong>调用 <code>dispatch(action)</code>  </p>
<p>说白了：在异步 Action Creator 中<strong>自行</strong>调用 <code>dispatch</code> 就相当于反转控制权  <br>您完全可以自己实现，也可以借助 <a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a> / <a href="https://github.com/acdlite/redux-promise" rel="nofollow noreferrer" target="_blank">redux-promise</a> 等中间件统一实现  <br>（它们的作用也仅仅就是把 <code>dispatch</code> 等传入异步 Action Creator 罢了）</p>
<blockquote><p>拓展阅读：阮老师的 <a href="http://www.ruanyifeng.com/blog/2015/05/thunk.html" rel="nofollow noreferrer" target="_blank">Thunk 函数的含义与用法</a>  <br>题外话：您不觉得 JavaScript 的回调函数，就是反转控制权最普遍的体现吗？</p></blockquote>
<h2 id="articleHeader7">§ <a href="http://cn.redux.js.org/docs/api/combineReducers.html" rel="nofollow noreferrer" target="_blank">combineReducers(reducers)</a>
</h2>
<h3 id="articleHeader8">⊙ 应用场景</h3>
<p>简明教程中的 <code>code-7</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-7 **/
var initState = {
  counter: 0,
  todos: []
}

function reducer(state, action) {
  if (!state) state = initState
  
  switch (action.type) {
    case 'ADD_TODO':
      var nextState = _.deepClone(state) // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload) 
      return nextState

    default:
      return state
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-7 **/</span>
<span class="hljs-keyword">var</span> initState = {
  <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">todos</span>: []
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">if</span> (!state) state = initState
  
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">var</span> nextState = _.deepClone(state) <span class="hljs-comment">// 用到了 lodash 的深克隆</span>
      nextState.todos.push(action.payload) 
      <span class="hljs-keyword">return</span> nextState

    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<p>上面的 <code>reducer</code> 仅仅是实现了 “新增待办事项” 的 <code>state</code> 的处理  <br>我们还有计数器的功能，下面我们继续增加计数器 “增加 1” 的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-8 **/
var initState = { counter: 0, todos: [] }

function reducer(state, action) {
  if (!state) return initState // 若是初始化可立即返回应用初始状态
  var nextState = _.deepClone(state) // 否则二话不说先克隆
  
  switch (action.type) {
    case 'ADD_TODO': // 新增待办事项
      nextState.todos.push(action.payload) 
      break   
    case 'INCREMENT': // 计数器加 1
      nextState.counter = nextState.counter + 1
      break
  }
  return nextState
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-8 **/</span>
<span class="hljs-keyword">var</span> initState = { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">todos</span>: [] }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">if</span> (!state) <span class="hljs-keyword">return</span> initState <span class="hljs-comment">// 若是初始化可立即返回应用初始状态</span>
  <span class="hljs-keyword">var</span> nextState = _.deepClone(state) <span class="hljs-comment">// 否则二话不说先克隆</span>
  
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>: <span class="hljs-comment">// 新增待办事项</span>
      nextState.todos.push(action.payload) 
      <span class="hljs-keyword">break</span>   
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>: <span class="hljs-comment">// 计数器加 1</span>
      nextState.counter = nextState.counter + <span class="hljs-number">1</span>
      <span class="hljs-keyword">break</span>
  }
  <span class="hljs-keyword">return</span> nextState
}</code></pre>
<p>如果说还有其他的动作，都需要在 <code>code-8</code> 这个 <code>reducer</code> 中继续堆砌处理逻辑  <br>但我们知道，计数器 与 待办事项 属于两个不同的模块，不应该都堆在一起写  <br>如果之后又要引入新的模块（例如留言板），该 <code>reducer</code> 会越来越臃肿  <br>此时就是 <code>combineReducers</code> 大显身手的时刻：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="目录结构如下
reducers/
   ├── index.js
   ├── counterReducer.js
   ├── todosReducer.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>目录结构如下
reducers/
   ├── index<span class="hljs-selector-class">.js</span>
   ├── counterReducer<span class="hljs-selector-class">.js</span>
   ├── todosReducer.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-9 **/
/* reducers/index.js */
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
  counter: counterReducer, // <-------- 键名就是该 reducer 对应管理的 state
  todos: todosReducer
})

export default rootReducer

-------------------------------------------------

/* reducers/counterReducer.js */
export default function counterReducer(counter = 0, action) { // 传入的 state 其实是 state.counter
  switch (action.type) {
    case 'INCREMENT':
      return counter + 1 // counter 是值传递，因此可以直接返回一个值
    default:
      return counter
  }
}

-------------------------------------------------

/* reducers/todosReducers */
export default function todosReducer(todos = [], action) { // 传入的 state 其实是 state.todos
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...todos, action.payload ]
    default:
      return todos
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-9 **/</span>
<span class="hljs-comment">/* reducers/index.js */</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> counterReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./counterReducer'</span>
<span class="hljs-keyword">import</span> todosReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./todosReducer'</span>

<span class="hljs-keyword">const</span> rootReducer = combineReducers({
  <span class="hljs-attr">counter</span>: counterReducer, <span class="hljs-comment">// &lt;-------- 键名就是该 reducer 对应管理的 state</span>
  todos: todosReducer
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> rootReducer

-------------------------------------------------

<span class="hljs-comment">/* reducers/counterReducer.js */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counterReducer</span>(<span class="hljs-params">counter = <span class="hljs-number">0</span>, action</span>) </span>{ <span class="hljs-comment">// 传入的 state 其实是 state.counter</span>
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
      <span class="hljs-keyword">return</span> counter + <span class="hljs-number">1</span> <span class="hljs-comment">// counter 是值传递，因此可以直接返回一个值</span>
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> counter
  }
}

-------------------------------------------------

<span class="hljs-comment">/* reducers/todosReducers */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todosReducer</span>(<span class="hljs-params">todos = [], action</span>) </span>{ <span class="hljs-comment">// 传入的 state 其实是 state.todos</span>
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">return</span> [ ...todos, action.payload ]
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> todos
  }
}</code></pre>
<p><code>code-8 reducer</code> 与 <code>code-9 rootReducer</code> 的功能是一样的，但后者的各个子 <code>reducer</code> 仅维护对应的那部分 <code>state</code>  <br>其可操作性、可维护性、可扩展性大大增强</p>
<blockquote><p>Flux 中是根据不同的功能拆分出多个 <code>store</code> 分而治之  <br>而 Redux 只允许应用中有唯一的 <code>store</code>，通过拆分出多个 <code>reducer</code> 分别管理对应的 <code>state</code></p></blockquote>
<hr>
<p>下面继续来深入使用 <code>combineReducers</code>。一直以来我们的应用状态都是只有两层，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state
  ├── counter: 0
  ├── todos: []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-keyword">state</span>
  ├── counter: <span class="hljs-number">0</span>
  ├── todos: []</code></pre>
<p>如果说现在又有一个需求：在待办事项模块中，存储用户每次操作（增删改）的时间，那么此时应用初始状态树应为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state
  ├── counter: 0
  ├── todo
        ├── optTime: []
        ├── todoList: [] # 这其实就是原来的 todos！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-keyword">state</span>
  ├── counter: <span class="hljs-number">0</span>
  ├── todo
        ├── optTime: []
        ├── todoList: [] <span class="hljs-comment"># 这其实就是原来的 todos！</span></code></pre>
<p>那么对应的 <code>reducer</code> 就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="目录结构如下
reducers/
   ├── index.js <-------------- combineReducers (生成 rootReducer)
   ├── counterReducer.js
   ├── todoReducers/ <--------- combineReducers
           ├── index.js
           ├── optTimeReducer.js
           ├── todoListReducer.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>目录结构如下
reducers/
   ├── index<span class="hljs-selector-class">.js</span> &lt;-------------- combineReducers (生成 rootReducer)
   ├── counterReducer<span class="hljs-selector-class">.js</span>
   ├── todoReducers/ &lt;--------- combineReducers
           ├── index<span class="hljs-selector-class">.js</span>
           ├── optTimeReducer<span class="hljs-selector-class">.js</span>
           ├── todoListReducer.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* reducers/index.js */
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import todoReducers from './todoReducers/'

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducers
})

export default rootReducer

=================================================

/* reducers/todoReducers/index.js */
import { combineReducers } from 'redux'
import optTimeReducer from './optTimeReducer'
import todoListReducer from './todoListReducer'

const todoReducers = combineReducers({
  optTime: optTimeReducer,
  todoList: todoListReducer
})

export default todoReducers

-------------------------------------------------

/* reducers/todosReducers/optTimeReducer.js */
export default function optTimeReducer(optTime = [], action) {
  // 咦？这里怎么没有 switch-case 分支？谁说 reducer 就一定包含 switch-case 分支的？
  return action.type.includes('TODO') ? [ ...optTime, new Date() ] : optTime
}

-------------------------------------------------

/* reducers/todosReducers/todoListReducer.js */
export default function todoListReducer(todoList = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...todoList, action.payload ]
    default:
      return todoList
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* reducers/index.js */</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> counterReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./counterReducer'</span>
<span class="hljs-keyword">import</span> todoReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./todoReducers/'</span>

<span class="hljs-keyword">const</span> rootReducer = combineReducers({
  <span class="hljs-attr">counter</span>: counterReducer,
  <span class="hljs-attr">todo</span>: todoReducers
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> rootReducer

=================================================

<span class="hljs-comment">/* reducers/todoReducers/index.js */</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> optTimeReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./optTimeReducer'</span>
<span class="hljs-keyword">import</span> todoListReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./todoListReducer'</span>

<span class="hljs-keyword">const</span> todoReducers = combineReducers({
  <span class="hljs-attr">optTime</span>: optTimeReducer,
  <span class="hljs-attr">todoList</span>: todoListReducer
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> todoReducers

-------------------------------------------------

<span class="hljs-comment">/* reducers/todosReducers/optTimeReducer.js */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">optTimeReducer</span>(<span class="hljs-params">optTime = [], action</span>) </span>{
  <span class="hljs-comment">// 咦？这里怎么没有 switch-case 分支？谁说 reducer 就一定包含 switch-case 分支的？</span>
  <span class="hljs-keyword">return</span> action.type.includes(<span class="hljs-string">'TODO'</span>) ? [ ...optTime, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() ] : optTime
}

-------------------------------------------------

<span class="hljs-comment">/* reducers/todosReducers/todoListReducer.js */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todoListReducer</span>(<span class="hljs-params">todoList = [], action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">return</span> [ ...todoList, action.payload ]
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> todoList
  }
}</code></pre>
<p>无论您的应用状态树有多么的复杂，都可以通过逐层下分管理对应部分的 <code>state</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                 counterReducer(counter, action) -------------------- counter
                              ↗                                                              ↘
rootReducer(state, action) —→∑     ↗ optTimeReducer(optTime, action) ------ optTime ↘         nextState
                              ↘—→∑                                                    todo  ↗
                                   ↘ todoListReducer(todoList,action) ----- todoList ↗


注：左侧表示 dispatch 分发流，∑ 表示 combineReducers；右侧表示各实体 reducer 的返回值，最后汇总整合成 nextState" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>                                 counterReducer(counter, action) -------------------- counter
                              ↗                                                              ↘
rootReducer(<span class="hljs-keyword">state</span>, action) —→∑     ↗ optTimeReducer(optTime, action) ------ optTime ↘         nextState
                              ↘—→∑                                                    todo  ↗
                                   ↘ todoListReducer(todoList,action) ----- todoList ↗


注：左侧表示 dispatch 分发流，∑ 表示 combineReducers；右侧表示各实体 reducer 的返回值，最后汇总整合成 nextState</code></pre>
<p>看了上图，您应该能直观感受到为何取名为 <code>reducer</code> 了吧？把 <code>state</code> 分而治之，极大减轻开发与维护的难度</p>
<blockquote><p>无论是 <code>dispatch</code> 哪个 <code>action</code>，都会流通<strong>所有的</strong> <code>reducer</code>  <br>表面上看来，这样子很浪费性能，但 JavaScript 对于这种<strong>纯函数</strong>的调用是很高效率的，因此请尽管放心  <br>这也是为何 <code>reducer</code> 必须返回其对应的 <code>state</code> 的原因。否则整合状态树时，该 <code>reducer</code> 对应的键名就是 <code>undefined</code></p></blockquote>
<h3 id="articleHeader9">⊙ 源码分析</h3>
<blockquote><p>仅截取关键部分，毕竟有很大一部分都是类型检测警告</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  var finalReducerKeys = Object.keys(finalReducers)

  // 返回合成后的 reducer
  return function combination(state = {}, action) {
    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]                       // 获取当前子 state
      var nextStateForKey = reducer(previousStateForKey, action) // 执行各子 reducer 中获取子 nextState
      nextState[key] = nextStateForKey                           // 将子 nextState 挂载到对应的键名
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-keyword">var</span> reducerKeys = <span class="hljs-built_in">Object</span>.keys(reducers)
  <span class="hljs-keyword">var</span> finalReducers = {}
  
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; reducerKeys.length; i++) {
    <span class="hljs-keyword">var</span> key = reducerKeys[i]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">'function'</span>) {
      finalReducers[key] = reducers[key]
    }
  }

  <span class="hljs-keyword">var</span> finalReducerKeys = <span class="hljs-built_in">Object</span>.keys(finalReducers)

  <span class="hljs-comment">// 返回合成后的 reducer</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combination</span>(<span class="hljs-params">state = {}, action</span>) </span>{
    <span class="hljs-keyword">var</span> hasChanged = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">var</span> nextState = {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; finalReducerKeys.length; i++) {
      <span class="hljs-keyword">var</span> key = finalReducerKeys[i]
      <span class="hljs-keyword">var</span> reducer = finalReducers[key]
      <span class="hljs-keyword">var</span> previousStateForKey = state[key]                       <span class="hljs-comment">// 获取当前子 state</span>
      <span class="hljs-keyword">var</span> nextStateForKey = reducer(previousStateForKey, action) <span class="hljs-comment">// 执行各子 reducer 中获取子 nextState</span>
      nextState[key] = nextStateForKey                           <span class="hljs-comment">// 将子 nextState 挂载到对应的键名</span>
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    <span class="hljs-keyword">return</span> hasChanged ? nextState : state
  }
}
</code></pre>
<blockquote><p>在此我的注释很少，因为代码写得实在是太过明了了，注释反而影响阅读  <br>作者 Dan 用了大量的 <code>for</code> 循环，的确有点不够优雅</p></blockquote>
<h2 id="articleHeader10">§ <a href="http://cn.redux.js.org/docs/api/bindActionCreators.html" rel="nofollow noreferrer" target="_blank">bindActionCreators(actionCreators, dispatch)</a>
</h2>
<blockquote><p>这个 API 有点鸡肋，它无非就是做了这件事情：<code>dispatch(ActionCreator(XXX))</code></p></blockquote>
<h3 id="articleHeader11">⊙ 源码分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 为 Action Creator 加装上自动 dispatch 技能 */
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

export default function bindActionCreators(actionCreators, dispatch) {
  // 省去一大坨类型判断
  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      // 逐个装上自动 dispatch 技能
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 为 Action Creator 加装上自动 dispatch 技能 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> dispatch(actionCreator(...args))
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreators</span>(<span class="hljs-params">actionCreators, dispatch</span>) </span>{
  <span class="hljs-comment">// 省去一大坨类型判断</span>
  <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(actionCreators)
  <span class="hljs-keyword">var</span> boundActionCreators = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-keyword">var</span> key = keys[i]
    <span class="hljs-keyword">var</span> actionCreator = actionCreators[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreator === <span class="hljs-string">'function'</span>) {
      <span class="hljs-comment">// 逐个装上自动 dispatch 技能</span>
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  <span class="hljs-keyword">return</span> boundActionCreators
}</code></pre>
<h3 id="articleHeader12">⊙ 应用场景</h3>
<p>简明教程中的 <code>code-5</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<--! 本代码块记为 code-5 -->
<input id=&quot;todoInput&quot; type=&quot;text&quot; />
<button id=&quot;btn&quot;>提交</button>

<script>
$('#btn').on('click', function() {
  var content = $('#todoInput').val() // 获取输入框的值
  var action = addTodo(content) // 执行 Action Creator 获得 action
  store.dispatch(action) // 手动显式 dispatch 一个 action
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">--!</span> 本代码块记为 <span class="hljs-attr">code-5</span> <span class="hljs-attr">--</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"todoInput"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-string">'#btn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> content = $(<span class="hljs-string">'#todoInput'</span>).val() <span class="hljs-comment">// 获取输入框的值</span>
  <span class="hljs-keyword">var</span> action = addTodo(content) <span class="hljs-comment">// 执行 Action Creator 获得 action</span>
  store.dispatch(action) <span class="hljs-comment">// 手动显式 dispatch 一个 action</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们看到，调用 <code>addTodo</code> 这个 Action Creator 后得到一个 <code>action</code>，之后又要手动 <code>dispatch(action)</code>  <br>如果是只有一个两个 Action Creator 还是可以接受，但如果有很多个那就显得有点重复了（其实我觉得不重复哈哈哈）  <br>这个时候我们就可以利用 <code>bindActionCreators</code> 实现自动 <code>dispatch</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;todoInput&quot; type=&quot;text&quot; />
<button id=&quot;btn&quot;>提交</button>

<script>
// 全局引入 Redux、jQuery，同时 store 是全局变量
var actionsCreators = Redux.bindActionCreators(
  { addTodo: addTodo },
  store.dispatch // 传入 dispatch 函数
)

$('#btn').on('click', function() {
  var content = $('#todoInput').val()
  actionCreators.addTodo(content) // 它会自动 dispatch
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"todoInput"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 全局引入 Redux、jQuery，同时 store 是全局变量</span>
<span class="hljs-keyword">var</span> actionsCreators = Redux.bindActionCreators(
  { <span class="hljs-attr">addTodo</span>: addTodo },
  store.dispatch <span class="hljs-comment">// 传入 dispatch 函数</span>
)

$(<span class="hljs-string">'#btn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> content = $(<span class="hljs-string">'#todoInput'</span>).val()
  actionCreators.addTodo(content) <span class="hljs-comment">// 它会自动 dispatch</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>综上，这个 API 没啥卵用，尤其是异步场景下，基本用不上</p></blockquote>
<h2 id="articleHeader13">§ <a href="http://cn.redux.js.org/docs/api/applyMiddleware.html" rel="nofollow noreferrer" target="_blank">applyMiddleware(...middlewares)</a>
</h2>
<blockquote><p>Redux 中文文档 <a href="http://cn.redux.js.org/docs/advanced/Middleware.html" rel="nofollow noreferrer" target="_blank">高级 · Middleware</a> 有提到中间件的演化由来</p></blockquote>
<p>首先要理解何谓 <code>Middleware</code>，何谓 <code>Enhancer</code></p>
<h3 id="articleHeader14">⊙ Middleware</h3>
<p>说白了，Redux 引入中间件机制，其实就是为了在 <code>dispatch</code> 前后，<strong>统一</strong>“做爱做的事”。。。  <br>诸如统一的日志记录、引入 thunk 统一处理异步 Action Creator 等都属于中间件  <br>下面是一个简单的打印动作前后 <code>state</code> 的中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 装逼写法 */
const printStateMiddleware = ({ getState }) => next => action => {
  console.log('state before dispatch', getState())
  
  let returnValue = next(action)

  console.log('state after dispatch', getState())

  return returnValue
}

-------------------------------------------------

/* 降低逼格写法 */
function printStateMiddleware(middlewareAPI) { // 记为【锚点-1】，中间件内可用的 API
  return function (dispatch) {                 // 记为【锚点-2】，传入原 dispatch 的引用
    return function (action) {
      console.log('state before dispatch', middlewareAPI.getState())
  
      var returnValue = dispatch(action) // 还记得吗，dispatch 的返回值其实还是 action
  
      console.log('state after dispatch', middlewareAPI.getState())

      return returnValue // 继续传给下一个中间件作为参数 action
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 装逼写法 */</span>
<span class="hljs-keyword">const</span> printStateMiddleware = <span class="hljs-function">(<span class="hljs-params">{ getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state before dispatch'</span>, getState())
  
  <span class="hljs-keyword">let</span> returnValue = next(action)

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state after dispatch'</span>, getState())

  <span class="hljs-keyword">return</span> returnValue
}

-------------------------------------------------

<span class="hljs-comment">/* 降低逼格写法 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printStateMiddleware</span>(<span class="hljs-params">middlewareAPI</span>) </span>{ <span class="hljs-comment">// 记为【锚点-1】，中间件内可用的 API</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{                 <span class="hljs-comment">// 记为【锚点-2】，传入原 dispatch 的引用</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state before dispatch'</span>, middlewareAPI.getState())
  
      <span class="hljs-keyword">var</span> returnValue = dispatch(action) <span class="hljs-comment">// 还记得吗，dispatch 的返回值其实还是 action</span>
  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state after dispatch'</span>, middlewareAPI.getState())

      <span class="hljs-keyword">return</span> returnValue <span class="hljs-comment">// 继续传给下一个中间件作为参数 action</span>
    }
  }
}</code></pre>
<h3 id="articleHeader15">⊙ Store Enhancer</h3>
<p>说白了，Store 增强器就是对生成的 <code>store</code> API 进行改造，这是它与中间件最大的区别（中间件不修改 <code>store</code> 的 API）  <br>而改造 <code>store</code> 的 API 就要从它的缔造者 <code>createStore</code> 入手。例如，Redux 的 API <code>applyMiddleware</code> 就是一个 Store 增强器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import compose from './compose' // 这货的作用其实就是 compose(f, g, h)(action) => f(g(h(action)))

/* 传入一坨中间件 */
export default function applyMiddleware(...middlewares) {

  /* 传入 createStore */
  return function(createStore) {
  
    /* 返回一个函数签名跟 createStore 一模一样的函数，亦即返回的是一个增强版的 createStore */
    return function(reducer, preloadedState, enhancer) {
    
      // 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API
      var store = createStore(reducer, preloadedState, enhancer)
      
      var dispatch = store.dispatch // 指向原 dispatch
      var chain = [] // 存储中间件的数组
  
      // 提供给中间件的 API（其实都是 store 的 API）
      var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }
      
      // 给中间件“装上” API，见上面 ⊙Middleware【降低逼格写法】的【锚点-1】 
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      
      // 串联各个中间件，为各个中间件传入原 store.dispatch，见【降低逼格写法】的【锚点-2】
      dispatch = compose(...chain)(store.dispatch)
  
      return {
        ...store, // store 的 API 中保留 getState / subsribe / replaceReducer
        dispatch  // 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行
      }
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> compose <span class="hljs-keyword">from</span> <span class="hljs-string">'./compose'</span> <span class="hljs-comment">// 这货的作用其实就是 compose(f, g, h)(action) =&gt; f(g(h(action)))</span>

<span class="hljs-comment">/* 传入一坨中间件 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{

  <span class="hljs-comment">/* 传入 createStore */</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">createStore</span>) </span>{
  
    <span class="hljs-comment">/* 返回一个函数签名跟 createStore 一模一样的函数，亦即返回的是一个增强版的 createStore */</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reducer, preloadedState, enhancer</span>) </span>{
    
      <span class="hljs-comment">// 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API</span>
      <span class="hljs-keyword">var</span> store = createStore(reducer, preloadedState, enhancer)
      
      <span class="hljs-keyword">var</span> dispatch = store.dispatch <span class="hljs-comment">// 指向原 dispatch</span>
      <span class="hljs-keyword">var</span> chain = [] <span class="hljs-comment">// 存储中间件的数组</span>
  
      <span class="hljs-comment">// 提供给中间件的 API（其实都是 store 的 API）</span>
      <span class="hljs-keyword">var</span> middlewareAPI = {
        <span class="hljs-attr">getState</span>: store.getState,
        <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
      }
      
      <span class="hljs-comment">// 给中间件“装上” API，见上面 ⊙Middleware【降低逼格写法】的【锚点-1】 </span>
      chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI))
      
      <span class="hljs-comment">// 串联各个中间件，为各个中间件传入原 store.dispatch，见【降低逼格写法】的【锚点-2】</span>
      dispatch = compose(...chain)(store.dispatch)
  
      <span class="hljs-keyword">return</span> {
        ...store, <span class="hljs-comment">// store 的 API 中保留 getState / subsribe / replaceReducer</span>
        dispatch  <span class="hljs-comment">// 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行</span>
      }
    }
  }
}
</code></pre>
<p>最终返回的虽然还是 <code>store</code> 的那四个 API，但其中的 <code>dispatch</code> 函数的功能被增强了，这就是所谓的 Store Enhancer</p>
<h3 id="articleHeader16">⊙ 综合应用 ( <a href="http://jsbin.com/luhira/edit?html,console" rel="nofollow noreferrer" target="_blank">在线演示</a> )</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <script src=&quot;//cdn.bootcss.com/redux/3.5.2/redux.min.js&quot;></script>
</head>
<body>
<script>
/** Action Creators */
function inc() {
  return { type: 'INCREMENT' };
}
function dec() {
  return { type: 'DECREMENT' };
}

function reducer(state, action) {
  state = state || { counter: 0 };

  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
}

function printStateMiddleware(middlewareAPI) {
  return function (dispatch) {
    return function (action) {
      console.log('dispatch 前：', middlewareAPI.getState());
      var returnValue = dispatch(action);
      console.log('dispatch 后：', middlewareAPI.getState(), '\n');
      return returnValue;
    };
  };
}

var enhancedCreateStore = Redux.applyMiddleware(printStateMiddleware)(Redux.createStore);
var store = enhancedCreateStore(reducer);

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(dec());
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/redux/3.5.2/redux.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/** Action Creators */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inc</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT'</span> };
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dec</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'DECREMENT'</span> };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state, action</span>) </span>{
  state = state || { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> };

  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter + <span class="hljs-number">1</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">'DECREMENT'</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter - <span class="hljs-number">1</span> };
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printStateMiddleware</span>(<span class="hljs-params">middlewareAPI</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch 前：'</span>, middlewareAPI.getState());
      <span class="hljs-keyword">var</span> returnValue = dispatch(action);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dispatch 后：'</span>, middlewareAPI.getState(), <span class="hljs-string">'\n'</span>);
      <span class="hljs-keyword">return</span> returnValue;
    };
  };
}

<span class="hljs-keyword">var</span> enhancedCreateStore = Redux.applyMiddleware(printStateMiddleware)(Redux.createStore);
<span class="hljs-keyword">var</span> store = enhancedCreateStore(reducer);

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(dec());
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch 前：{ counter: 0 }
dispatch 后：{ counter: 1 }

dispatch 前：{ counter: 1 }
dispatch 后：{ counter: 2 }

dispatch 前：{ counter: 2 }
dispatch 后：{ counter: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">dispatch</span> 前：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">0</span> }
<span class="hljs-selector-tag">dispatch</span> 后：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">1</span> }

<span class="hljs-selector-tag">dispatch</span> 前：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">1</span> }
<span class="hljs-selector-tag">dispatch</span> 后：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">2</span> }

<span class="hljs-selector-tag">dispatch</span> 前：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">2</span> }
<span class="hljs-selector-tag">dispatch</span> 后：{ <span class="hljs-attribute">counter</span>: <span class="hljs-number">1</span> }</code></pre>
<hr>
<p>实际上，上面生成 <code>store</code> 的代码可以更加优雅：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-10 **/
var store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(printStateMiddleware)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-10 **/</span>
<span class="hljs-keyword">var</span> store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(printStateMiddleware)
)</code></pre>
<p>如果有多个中间件以及多个增强器，还可以这样写（请留意序号顺序）：</p>
<blockquote><p>重温一下 <code>createStore</code> 完整的函数签名：<code>function createStore(reducer, preloadedState, enhancer)</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-11 **/
import { createStore, applyMiddleware, compose } from 'redux'

const store = createStore(
  reducer,
  preloadedState, // <----- 可选，前后端同构的数据同步
  compose( // <------------ 还记得吗？compose 是从右到左的哦！
    applyMiddleware( // <-- 这货也是 Store Enhancer 哦！但这是关乎中间件的增强器，必须置于 compose 执行链的最后
      middleware1,
      middleware2,
      middleware3
    ),
    enhancer3,
    enhancer2,
    enhancer1
  )
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-11 **/</span>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware, compose } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">const</span> store = createStore(
  reducer,
  preloadedState, <span class="hljs-comment">// &lt;----- 可选，前后端同构的数据同步</span>
  compose( <span class="hljs-comment">// &lt;------------ 还记得吗？compose 是从右到左的哦！</span>
    applyMiddleware( <span class="hljs-comment">// &lt;-- 这货也是 Store Enhancer 哦！但这是关乎中间件的增强器，必须置于 compose 执行链的最后</span>
      middleware1,
      middleware2,
      middleware3
    ),
    enhancer3,
    enhancer2,
    enhancer1
  )
)</code></pre>
<p>为什么会支持那么多种写法呢？在 <code>createStore</code> 的源码分析的开头部分，我省略了一些代码，现在奉上该压轴部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-12 **/
if (typeof preloadedState === 'function' &amp;&amp; typeof enhancer === 'undefined') {
  // 这里就是上面 code-10 的情况，只传入 reducer 和 Store Enhancer 这两个参数
  enhancer = preloadedState
  preloadedState = undefined
}

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.')
  }
  // 存在 enhancer 就立即执行，返回增强版的 createStore <--------- 记为【锚点 12-1】
  return enhancer(createStore)(reducer, preloadedState)
}

if (typeof reducer !== 'function') {
  throw new Error('Expected the reducer to be a function.')
}

// 除 compose 外，createStore 竟然也在此为我们提供了书写的便利与自由度，实在是太体贴了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-12 **/</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> preloadedState === <span class="hljs-string">'function'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> enhancer === <span class="hljs-string">'undefined'</span>) {
  <span class="hljs-comment">// 这里就是上面 code-10 的情况，只传入 reducer 和 Store Enhancer 这两个参数</span>
  enhancer = preloadedState
  preloadedState = <span class="hljs-literal">undefined</span>
}

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'undefined'</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the enhancer to be a function.'</span>)
  }
  <span class="hljs-comment">// 存在 enhancer 就立即执行，返回增强版的 createStore &lt;--------- 记为【锚点 12-1】</span>
  <span class="hljs-keyword">return</span> enhancer(createStore)(reducer, preloadedState)
}

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducer !== <span class="hljs-string">'function'</span>) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the reducer to be a function.'</span>)
}

<span class="hljs-comment">// 除 compose 外，createStore 竟然也在此为我们提供了书写的便利与自由度，实在是太体贴了</span></code></pre>
<p>如果像 <code>code-11</code> 那样有多个 <code>enhancer</code>，则 <code>code-12 【锚点 12-1】</code> 中的代码会执行多次  <br>生成最终的超级增强版 <code>store</code>。最后，奉上 <code>code-11</code> 中 <code>compose</code> 内部的执行顺序示意图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原 createStore ————
                  │
                  ↓
return enhancer1(createStore)(reducer, preloadedState, enhancer2)
   |
   ├———————→ createStore 增强版 1
                    │
                    ↓
return enhancer2(createStore1)(reducer, preloadedState, enhancer3)
   |
   ├———————————→ createStore 增强版 1+2
                        │
                        ↓
return enhancer3(createStore1+2)(reducer, preloadedState, applyMiddleware(m1,m2,m3))
   |
   ├————————————————————→ createStore 增强版 1+2+3
                                     │
                                     ↓
return appleMiddleware(m1,m2,m3)(createStore1+2+3)(reducer, preloadedState)
   |
   ├——————————————————————————————————→ 生成最终增强版 store" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>原 <span class="hljs-selector-tag">createStore</span> ————
                  │
                  ↓
<span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">enhancer1</span>(createStore)(reducer, preloadedState, enhancer2)
   |
   ├———————→ <span class="hljs-selector-tag">createStore</span> 增强版 <span class="hljs-selector-tag">1</span>
                    │
                    ↓
<span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">enhancer2</span>(createStore1)(reducer, preloadedState, enhancer3)
   |
   ├———————————→ <span class="hljs-selector-tag">createStore</span> 增强版 <span class="hljs-selector-tag">1</span>+<span class="hljs-selector-tag">2</span>
                        │
                        ↓
<span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">enhancer3</span>(createStore1+<span class="hljs-number">2</span>)(reducer, preloadedState, applyMiddleware(m1,m2,m3))
   |
   ├————————————————————→ <span class="hljs-selector-tag">createStore</span> 增强版 <span class="hljs-selector-tag">1</span>+<span class="hljs-selector-tag">2</span>+<span class="hljs-selector-tag">3</span>
                                     │
                                     ↓
<span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">appleMiddleware</span>(m1,m2,m3)(createStore1+<span class="hljs-number">2</span>+<span class="hljs-number">3</span>)(reducer, preloadedState)
   |
   ├——————————————————————————————————→ 生成最终增强版 <span class="hljs-selector-tag">store</span></code></pre>
<hr>
<h2 id="articleHeader17">§ 总结</h2>
<p>Redux 有五个 API，分别是：</p>
<ul>
<li><p><code>createStore(reducer, [initialState])</code></p></li>
<li><p><code>combineReducers(reducers)</code></p></li>
<li><p><code>applyMiddleware(...middlewares)</code></p></li>
<li><p><code>bindActionCreators(actionCreators, dispatch)</code></p></li>
<li><p><code>compose(...functions)</code></p></li>
</ul>
<p><code>createStore</code> 生成的 <code>store</code> 有四个 API，分别是：</p>
<ul>
<li><p><code>getState()</code></p></li>
<li><p><code>dispatch(action)</code></p></li>
<li><p><code>subscribe(listener)</code></p></li>
<li><p><code>replaceReducer(nextReducer)</code></p></li>
</ul>
<p>至此，若您已经理解上述 API 的作用机理，以及中间件与增强器的概念/区别  <br>本人将不胜荣幸，不妨点个 <a href="https://github.com/kenberkeley/redux-simple-tutorial" rel="nofollow noreferrer" target="_blank">star</a> 算是对我的赞赏  <br>如您对本教程有任何意见或改进的建议，欢迎 <a href="https://github.com/kenberkeley/redux-simple-tutorial/issues" rel="nofollow noreferrer" target="_blank">issue</a>，我会尽快予您答复</p>
<p>最后奉上 React + Redux + React Router 的简易留言板实例：<a href="https://github.com/kenberkeley/react-demo" rel="nofollow noreferrer" target="_blank">react-demo</a></p>
<blockquote><p>拓展阅读：<a href="https://github.com/kenberkeley/redux-simple-tutorial/blob/master/middleware-onion-model.md" rel="nofollow noreferrer" target="_blank">中间件的洋葱模型</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 莞式教程 之 进阶篇

## 原文链接
[https://segmentfault.com/a/1190000006701801](https://segmentfault.com/a/1190000006701801)

