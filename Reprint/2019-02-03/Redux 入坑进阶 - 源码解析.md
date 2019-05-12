---
title: 'Redux 入坑进阶 - 源码解析' 
date: 2019-02-03 2:30:40
hidden: true
slug: 7bk7u30qncb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原文链接：<a href="https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/Redux/Redux%E5%85%A5%E5%9D%91%E8%BF%9B%E9%98%B6-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md" rel="nofollow noreferrer" target="_blank">https://github.com/ecmadao/Co...</a><br>转载请注明出处</p>
<p>本文不涉及redux的使用方法，因此可能更适合使用过redux的玩家翻阅?</p>
</blockquote>
<h2 id="articleHeader0">预热</h2>
<blockquote><p>redux 函数内部包含了大量<a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html" rel="nofollow noreferrer" target="_blank">柯里化函数</a>以及<a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html" rel="nofollow noreferrer" target="_blank">代码组合</a>思想</p></blockquote>
<h4>柯里化函数（<code>curry</code>）</h4>
<p>通俗的来讲，可以用一句话概括柯里化函数：返回函数的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example
const funcA = (a) => {
  return const funcB = (b) => {
    return a + b
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// example</span>
<span class="hljs-keyword">const</span> funcA = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">const</span> funcB = <span class="hljs-function">(<span class="hljs-params">b</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> a + b
  }
};</code></pre>
<p>上述的<code>funcA</code>函数接收一个参数，并返回同样接收一个参数的<code>funcB</code>函数。</p>
<p>柯里化函数有什么好处呢？</p>
<ul>
<li><p>避免了给一个函数传入大量的参数--我们可以通过柯里化来构建类似上例的函数嵌套，将参数的代入分离开，更有利于调试</p></li>
<li><p>降低耦合度和代码冗余，便于复用</p></li>
</ul>
<p>举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 已知listA, listB两个Array，都由int组成，需要筛选出两个Array的交集
const listA = [1, 2, 3, 4, 5];
const listB = [2, 3, 4];

const checkIfDataExist = (list) => {
  return (target) => {
    return list.some(value => value === target)
  };
};
// 调用一次checkIfDataExist函数，并将listA作为参数传入，来构建一个新的函数。
// 而新函数的作用则是：检查传入的参数是否存在于listA里
const ifDataExist = checkIfDataExist(listA);

// 使用新函数来对listB里的每一个元素进行筛选
const intersectionList = listB.filter(value => ifDataExist(value));
console.log(intersectionList); // [2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 已知listA, listB两个Array，都由int组成，需要筛选出两个Array的交集</span>
<span class="hljs-keyword">const</span> listA = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> listB = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];

<span class="hljs-keyword">const</span> checkIfDataExist = <span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">target</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> list.some(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value === target)
  };
};
<span class="hljs-comment">// 调用一次checkIfDataExist函数，并将listA作为参数传入，来构建一个新的函数。</span>
<span class="hljs-comment">// 而新函数的作用则是：检查传入的参数是否存在于listA里</span>
<span class="hljs-keyword">const</span> ifDataExist = checkIfDataExist(listA);

<span class="hljs-comment">// 使用新函数来对listB里的每一个元素进行筛选</span>
<span class="hljs-keyword">const</span> intersectionList = listB.filter(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> ifDataExist(value));
<span class="hljs-built_in">console</span>.log(intersectionList); <span class="hljs-comment">// [2, 3, 4]</span></code></pre>
<h4>代码组合（<code>compose</code>）</h4>
<p>代码组合就像是数学中的结合律：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = (f, g) => {
  return (x) => {
    return f(g(x));
  };
};
// 还可以再简洁点
const compose = (f, g) => (x) => f(g(x));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">f, g</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> f(g(x));
  };
};
<span class="hljs-comment">// 还可以再简洁点</span>
<span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">f, g</span>) =&gt;</span> (x) =&gt; f(g(x));</code></pre>
<p>通过这样函数之间的组合，可以大大增加可读性，效果远大于嵌套一大堆的函数调用，并且我们可以随意更改函数的调用顺序</p>
<h2 id="articleHeader1">Redux</h2>
<h4><code>combineReducers</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 回顾一下combineReducers的使用格式

// 两个reducer
const todos = (state = INIT.todos, action) => {
  // ....
};
const filterStatus = (state = INIT.filterStatus, action) => {
  // ...
};

const appReducer = combineReducers({
  todos,
  filterStatus
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 回顾一下combineReducers的使用格式</span>

<span class="hljs-comment">// 两个reducer</span>
<span class="hljs-keyword">const</span> todos = <span class="hljs-function">(<span class="hljs-params">state = INIT.todos, action</span>) =&gt;</span> {
  <span class="hljs-comment">// ....</span>
};
<span class="hljs-keyword">const</span> filterStatus = <span class="hljs-function">(<span class="hljs-params">state = INIT.filterStatus, action</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-keyword">const</span> appReducer = combineReducers({
  todos,
  filterStatus
});</code></pre>
<blockquote>
<p>还记得<code>combineReducers</code>的黑魔法吗？即：</p>
<ol>
<li><p>传入的Object参数中，对象的<code>key</code>与<code>value</code>所代表的<code>reducer function</code>同名</p></li>
<li><p>各个<code>reducer function</code>的名称和需要传入该reducer的<code>state</code>参数同名</p></li>
</ol>
</blockquote>
<p>源码标注解读（省略部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function combineReducers(reducers) {
  // 第一次筛选，参数reducers为Object
  // 筛选掉reducers中不是function的键值对
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  var finalReducerKeys = Object.keys(finalReducers)

  // 二次筛选，判断reducer中传入的值是否合法（!== undefined）
  // 获取筛选完之后的所有key
  var sanityError
  try {
    // assertReducerSanity函数用于遍历finalReducers中的reducer，检查传入reducer的state是否合法
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }
  
  // 返回一个function。该方法接收state和action作为参数
  return function combination(state = {}, action) {
    // 如果之前的判断reducers中有不法值，则抛出错误
    if (sanityError) {
      throw sanityError
    }
    // 如果不是production环境则抛出warning
    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    var hasChanged = false
    var nextState = {}
    // 遍历所有的key和reducer，分别将reducer对应的key所代表的state，代入到reducer中进行函数调用
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      // 这也就是为什么说combineReducers黑魔法--要求传入的Object参数中，reducer function的名称和要和state同名的原因
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      // 如果reducer返回undefined则抛出错误
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 将reducer返回的值填入nextState
      nextState[key] = nextStateForKey
      // 如果任一state有更新则hasChanged为true
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}

// 检查传入reducer的state是否合法
function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(key => {
    var reducer = reducers[key]
    // 遍历全部reducer，并给它传入(undefined, action)
    // 当第一个参数传入undefined时，则为各个reducer定义的默认参数
    var initialState = reducer(undefined, { type: ActionTypes.INIT })
    
    // ActionTypes.INIT几乎不会被定义，所以会通过switch的default返回reducer的默认参数。如果没有指定默认参数，则返回undefined，抛出错误
    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer &quot;${key}&quot; returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined.`
      )
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer &quot;${key}&quot; returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in &quot;redux/*&quot; ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined.`
      )
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-comment">// 第一次筛选，参数reducers为Object</span>
  <span class="hljs-comment">// 筛选掉reducers中不是function的键值对</span>
  <span class="hljs-keyword">var</span> reducerKeys = <span class="hljs-built_in">Object</span>.keys(reducers);
  <span class="hljs-keyword">var</span> finalReducers = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; reducerKeys.length; i++) {
    <span class="hljs-keyword">var</span> key = reducerKeys[i];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">'function'</span>) {
      finalReducers[key] = reducers[key]
    }
  }

  <span class="hljs-keyword">var</span> finalReducerKeys = <span class="hljs-built_in">Object</span>.keys(finalReducers)

  <span class="hljs-comment">// 二次筛选，判断reducer中传入的值是否合法（!== undefined）</span>
  <span class="hljs-comment">// 获取筛选完之后的所有key</span>
  <span class="hljs-keyword">var</span> sanityError
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// assertReducerSanity函数用于遍历finalReducers中的reducer，检查传入reducer的state是否合法</span>
    assertReducerSanity(finalReducers)
  } <span class="hljs-keyword">catch</span> (e) {
    sanityError = e
  }
  
  <span class="hljs-comment">// 返回一个function。该方法接收state和action作为参数</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combination</span>(<span class="hljs-params">state = {}, action</span>) </span>{
    <span class="hljs-comment">// 如果之前的判断reducers中有不法值，则抛出错误</span>
    <span class="hljs-keyword">if</span> (sanityError) {
      <span class="hljs-keyword">throw</span> sanityError
    }
    <span class="hljs-comment">// 如果不是production环境则抛出warning</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      <span class="hljs-keyword">var</span> warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action)
      <span class="hljs-keyword">if</span> (warningMessage) {
        warning(warningMessage)
      }
    }

    <span class="hljs-keyword">var</span> hasChanged = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">var</span> nextState = {}
    <span class="hljs-comment">// 遍历所有的key和reducer，分别将reducer对应的key所代表的state，代入到reducer中进行函数调用</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; finalReducerKeys.length; i++) {
      <span class="hljs-keyword">var</span> key = finalReducerKeys[i]
      <span class="hljs-keyword">var</span> reducer = finalReducers[key]
      <span class="hljs-comment">// 这也就是为什么说combineReducers黑魔法--要求传入的Object参数中，reducer function的名称和要和state同名的原因</span>
      <span class="hljs-keyword">var</span> previousStateForKey = state[key]
      <span class="hljs-keyword">var</span> nextStateForKey = reducer(previousStateForKey, action)
      <span class="hljs-comment">// 如果reducer返回undefined则抛出错误</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextStateForKey === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-keyword">var</span> errorMessage = getUndefinedStateErrorMessage(key, action)
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(errorMessage)
      }
      <span class="hljs-comment">// 将reducer返回的值填入nextState</span>
      nextState[key] = nextStateForKey
      <span class="hljs-comment">// 如果任一state有更新则hasChanged为true</span>
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    <span class="hljs-keyword">return</span> hasChanged ? nextState : state
  }
}

<span class="hljs-comment">// 检查传入reducer的state是否合法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assertReducerSanity</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(reducers).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> reducer = reducers[key]
    <span class="hljs-comment">// 遍历全部reducer，并给它传入(undefined, action)</span>
    <span class="hljs-comment">// 当第一个参数传入undefined时，则为各个reducer定义的默认参数</span>
    <span class="hljs-keyword">var</span> initialState = reducer(<span class="hljs-literal">undefined</span>, { <span class="hljs-attr">type</span>: ActionTypes.INIT })
    
    <span class="hljs-comment">// ActionTypes.INIT几乎不会被定义，所以会通过switch的default返回reducer的默认参数。如果没有指定默认参数，则返回undefined，抛出错误</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> initialState === <span class="hljs-string">'undefined'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">`Reducer "<span class="hljs-subst">${key}</span>" returned undefined during initialization. `</span> +
        <span class="hljs-string">`If the state passed to the reducer is undefined, you must `</span> +
        <span class="hljs-string">`explicitly return the initial state. The initial state may `</span> +
        <span class="hljs-string">`not be undefined.`</span>
      )
    }

    <span class="hljs-keyword">var</span> type = <span class="hljs-string">'@@redux/PROBE_UNKNOWN_ACTION_'</span> + <span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substring(<span class="hljs-number">7</span>).split(<span class="hljs-string">''</span>).join(<span class="hljs-string">'.'</span>)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducer(<span class="hljs-literal">undefined</span>, { type }) === <span class="hljs-string">'undefined'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">`Reducer "<span class="hljs-subst">${key}</span>" returned undefined when probed with a random type. `</span> +
        <span class="hljs-string">`Don't try to handle <span class="hljs-subst">${ActionTypes.INIT}</span> or other actions in "redux/*" `</span> +
        <span class="hljs-string">`namespace. They are considered private. Instead, you must return the `</span> +
        <span class="hljs-string">`current state for any unknown actions, unless it is undefined, `</span> +
        <span class="hljs-string">`in which case you must return the initial state, regardless of the `</span> +
        <span class="hljs-string">`action type. The initial state may not be undefined.`</span>
      )
    }
  })
}</code></pre>
<h4><code>createStore</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 回顾下使用方法
const store = createStore(reducers, state, enhance);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 回顾下使用方法</span>
<span class="hljs-keyword">const</span> store = createStore(reducers, state, enhance);</code></pre>
<p>源码标注解读（省略部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对于未知的action.type，reducer必须返回默认的参数state。这个ActionTypes.INIT就可以用来监测当reducer传入未知type的action时，返回的state是否合法
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

export default function createStore(reducer, initialState, enhancer) {
  // 检查你的state和enhance参数有没有传反
  if (typeof initialState === 'function' &amp;&amp; typeof enhancer === 'undefined') {
    enhancer = initialState
    initialState = undefined
  }
  // 如果有传入合法的enhance，则通过enhancer再调用一次createStore
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, initialState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  var currentReducer = reducer
  var currentState = initialState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false // 是否正在分发事件

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  // 我们在action middleware中经常使用的getState()方法，返回当前state
  function getState() {
    return currentState
  }

  // 注册listener，同时返回一个取消事件注册的方法。当调用store.dispatch的时候调用listener
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false
      // 从nextListeners中去除掉当前listener
      ensureCanMutateNextListeners()
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // dispatch方法接收的action是个对象，而不是方法。
  // 这个对象实际上就是我们自定义action的返回值，因为dispatch的时候，已经调用过我们的自定义action了，比如 dispatch(addTodo())
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
    // 调用dispatch的时候只能一个个调用，通过dispatch判断调用的状态
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    // 遍历调用各个linster
    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }
  // Replaces the reducer currently used by the store to calculate the state.
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
  // 当create store的时候，reducer会接受一个type为ActionTypes.INIT的action，使reducer返回他们默认的state，这样可以快速的形成默认的state的结构
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 对于未知的action.type，reducer必须返回默认的参数state。这个ActionTypes.INIT就可以用来监测当reducer传入未知type的action时，返回的state是否合法</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> ActionTypes = {
  <span class="hljs-attr">INIT</span>: <span class="hljs-string">'@@redux/INIT'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">reducer, initialState, enhancer</span>) </span>{
  <span class="hljs-comment">// 检查你的state和enhance参数有没有传反</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> initialState === <span class="hljs-string">'function'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> enhancer === <span class="hljs-string">'undefined'</span>) {
    enhancer = initialState
    initialState = <span class="hljs-literal">undefined</span>
  }
  <span class="hljs-comment">// 如果有传入合法的enhance，则通过enhancer再调用一次createStore</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'undefined'</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the enhancer to be a function.'</span>)
    }
    <span class="hljs-keyword">return</span> enhancer(createStore)(reducer, initialState)
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducer !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the reducer to be a function.'</span>)
  }

  <span class="hljs-keyword">var</span> currentReducer = reducer
  <span class="hljs-keyword">var</span> currentState = initialState
  <span class="hljs-keyword">var</span> currentListeners = []
  <span class="hljs-keyword">var</span> nextListeners = currentListeners
  <span class="hljs-keyword">var</span> isDispatching = <span class="hljs-literal">false</span> <span class="hljs-comment">// 是否正在分发事件</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ensureCanMutateNextListeners</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  <span class="hljs-comment">// 我们在action middleware中经常使用的getState()方法，返回当前state</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getState</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> currentState
  }

  <span class="hljs-comment">// 注册listener，同时返回一个取消事件注册的方法。当调用store.dispatch的时候调用listener</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">listener</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> listener !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected listener to be a function.'</span>)
    }

    <span class="hljs-keyword">var</span> isSubscribed = <span class="hljs-literal">true</span>

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (!isSubscribed) {
        <span class="hljs-keyword">return</span>
      }

      isSubscribed = <span class="hljs-literal">false</span>
      <span class="hljs-comment">// 从nextListeners中去除掉当前listener</span>
      ensureCanMutateNextListeners()
      <span class="hljs-keyword">var</span> index = nextListeners.indexOf(listener)
      nextListeners.splice(index, <span class="hljs-number">1</span>)
    }
  }

  <span class="hljs-comment">// dispatch方法接收的action是个对象，而不是方法。</span>
  <span class="hljs-comment">// 这个对象实际上就是我们自定义action的返回值，因为dispatch的时候，已经调用过我们的自定义action了，比如 dispatch(addTodo())</span>
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
    <span class="hljs-comment">// 调用dispatch的时候只能一个个调用，通过dispatch判断调用的状态</span>
    <span class="hljs-keyword">if</span> (isDispatching) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Reducers may not dispatch actions.'</span>)
    }

    <span class="hljs-keyword">try</span> {
      isDispatching = <span class="hljs-literal">true</span>
      currentState = currentReducer(currentState, action)
    } <span class="hljs-keyword">finally</span> {
      isDispatching = <span class="hljs-literal">false</span>
    }
    <span class="hljs-comment">// 遍历调用各个linster</span>
    <span class="hljs-keyword">var</span> listeners = currentListeners = nextListeners
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
      listeners[i]()
    }

    <span class="hljs-keyword">return</span> action
  }
  <span class="hljs-comment">// Replaces the reducer currently used by the store to calculate the state.</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceReducer</span>(<span class="hljs-params">nextReducer</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextReducer !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the nextReducer to be a function.'</span>)
    }

    currentReducer = nextReducer
    dispatch({ <span class="hljs-attr">type</span>: ActionTypes.INIT })
  }
  <span class="hljs-comment">// 当create store的时候，reducer会接受一个type为ActionTypes.INIT的action，使reducer返回他们默认的state，这样可以快速的形成默认的state的结构</span>
  dispatch({ <span class="hljs-attr">type</span>: ActionTypes.INIT })

  <span class="hljs-keyword">return</span> {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}</code></pre>
<h4><code>thunkMiddleware</code></h4>
<p>源码及其简单简直给跪...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 返回以 dispatch 和 getState 作为参数的action
export default function thunkMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 返回以 dispatch 和 getState 作为参数的action</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkMiddleware</span>(<span class="hljs-params">{ dispatch, getState }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}</code></pre>
<h4><code>applyMiddleware</code></h4>
<p>先复习下用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// usage
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
      reducers,
      state,
      applyMiddleware(thunkMiddleware)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// usage</span>
<span class="hljs-keyword">import</span> {createStore, applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;

<span class="hljs-keyword">const</span> store = createStore(
      reducers,
      state,
      applyMiddleware(thunkMiddleware)
);</code></pre>
<p><code>applyMiddleware</code>首先接收<code>thunkMiddleware</code>作为参数，两者组合成为一个新的函数（<code>enhance</code>），之后在<code>createStore</code>内部，因为<code>enhance</code>的存在，将会变成返回<code>enhancer(createStore)(reducer, initialState)</code></p>
<p>源码标注解读（省略部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个代码组合的方法
// 传入一些function作为参数，返回其链式调用的形态。例如，
// compose(f, g, h) 最终返回 (...args) => f(g(h(...args)))
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}

export default function applyMiddleware(...middlewares) {
  // 最终返回一个以createStore为参数的匿名函数
  // 这个函数返回另一个以reducer, initialState, enhancer为参数的匿名函数
  return (createStore) => (reducer, initialState, enhancer) => {
    var store = createStore(reducer, initialState, enhancer)
    var dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // 每个 middleware 都以 middlewareAPI 作为参数进行注入，返回一个新的链。此时的返回值相当于调用 thunkMiddleware 返回的函数： (next) => (action) => {} ，接收一个next作为其参数
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 并将链代入进 compose 组成一个函数的调用链
    // compose(...chain) 返回形如(...args) => f(g(h(...args)))，f/g/h都是chain中的函数对象。
    // 在目前只有 thunkMiddleware 作为 middlewares 参数的情况下，将返回 (next) => (action) => {}
    // 之后以 store.dispatch 作为参数进行注入
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义一个代码组合的方法</span>
<span class="hljs-comment">// 传入一些function作为参数，返回其链式调用的形态。例如，</span>
<span class="hljs-comment">// compose(f, g, h) 最终返回 (...args) =&gt; f(g(h(...args)))</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> arg
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">const</span> last = funcs[funcs.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">const</span> rest = funcs.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> rest.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), last(...args))
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
  <span class="hljs-comment">// 最终返回一个以createStore为参数的匿名函数</span>
  <span class="hljs-comment">// 这个函数返回另一个以reducer, initialState, enhancer为参数的匿名函数</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">createStore</span>) =&gt;</span> (reducer, initialState, enhancer) =&gt; {
    <span class="hljs-keyword">var</span> store = createStore(reducer, initialState, enhancer)
    <span class="hljs-keyword">var</span> dispatch
    <span class="hljs-keyword">var</span> chain = []

    <span class="hljs-keyword">var</span> middlewareAPI = {
      <span class="hljs-attr">getState</span>: store.getState,
      <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
    }
    <span class="hljs-comment">// 每个 middleware 都以 middlewareAPI 作为参数进行注入，返回一个新的链。此时的返回值相当于调用 thunkMiddleware 返回的函数： (next) =&gt; (action) =&gt; {} ，接收一个next作为其参数</span>
    chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI))
    <span class="hljs-comment">// 并将链代入进 compose 组成一个函数的调用链</span>
    <span class="hljs-comment">// compose(...chain) 返回形如(...args) =&gt; f(g(h(...args)))，f/g/h都是chain中的函数对象。</span>
    <span class="hljs-comment">// 在目前只有 thunkMiddleware 作为 middlewares 参数的情况下，将返回 (next) =&gt; (action) =&gt; {}</span>
    <span class="hljs-comment">// 之后以 store.dispatch 作为参数进行注入</span>
    dispatch = compose(...chain)(store.dispatch)

    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    }
  }
}</code></pre>
<p>一脸懵逼？没关系，来结合实际使用总结一下：</p>
<p>当我们搭配<code>redux-thunk</code>这个库的时候，在<code>redux</code>配合<code>components</code>时，通常这么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducer } from 'redux';
import * as reducers from './reducers.js';

const appReducer = combineReducer(reducers);
const store = createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> { createStore, applyMiddleware, combineReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers.js'</span>;

<span class="hljs-keyword">const</span> appReducer = combineReducer(reducers);
<span class="hljs-keyword">const</span> store = createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));</code></pre>
<p>还记得当<code>createStore</code>收到的参数中有<code>enhance</code>时会怎么做吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// createStore.js
if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.')
  }
  return enhancer(createStore)(reducer, initialState)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// createStore.js</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'undefined'</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected the enhancer to be a function.'</span>)
  }
  <span class="hljs-keyword">return</span> enhancer(createStore)(reducer, initialState)
}</code></pre>
<p>也就是说，会变成下面的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState)</code></pre>
<ul><li><p><code>applyMiddleware(thunkMiddleware)</code><br><code>applyMiddleware</code>接收<code>thunkMiddleware</code>作为参数，返回形如<code>(createStore) =&gt; (reducer, initialState, enhancer) =&gt; {}</code>的函数。</p></li></ul>
<ul><li><p><code>applyMiddleware(thunkMiddleware)(createStore)</code><br>  以 createStore 作为参数，调用上一步返回的函数<code>(reducer, initialState, enhancer) =&gt; {}</code></p></li></ul>
<ul><li><p><code>applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState)</code><br>  以（reducer, initialState）为参数进行调用。</p></li></ul>
<p>在这个函数内部，<code>thunkMiddleware</code>被调用，其作用是监测<code>type</code>是<code>function</code>的<code>action</code></p>
<p>因此，如果<code>dispatch</code>的<code>action</code>返回的是一个<code>function</code>，则证明是中间件，则将<code>(dispatch, getState)</code>作为参数代入其中，进行<code>action</code> 内部下一步的操作。否则的话，认为只是一个普通的<code>action</code>，将通过<code>next</code>(也就是<code>dispatch</code>)进一步分发。</p>
<p>也就是说，<code>applyMiddleware(thunkMiddleware)</code>作为<code>enhance</code>，最终起了这样的作用：</p>
<p>对<code>dispatch</code>调用的<code>action</code>(例如，<code>dispatch(addNewTodo(todo)))</code>进行检查，如果<code>action</code>在第一次调用之后返回的是<code>function</code>，则将<code>(dispatch, getState)</code>作为参数注入到<code>action</code>返回的方法中，否则就正常对<code>action</code>进行分发，这样一来我们的中间件就完成喽~</p>
<p>因此，当<code>action</code>内部需要获取<code>state</code>，或者需要进行异步操作，在操作完成之后进行事件调用分发的话，我们就可以让<code>action</code> 返回一个以<code>(dispatch, getState)</code>为参数的<code>function</code>而不是通常的<code>Object</code>，<code>enhance</code>就会对其进行检测以便正确的处理。</p>
<h4><code>bindActionCreator</code></h4>
<blockquote><p>这个方法感觉比较少见，我个人也很少用到</p></blockquote>
<p>在传统写法下，当我们要把 state 和 action 注入到子组件中时，一般会这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'react-redux';
import {addTodo, deleteTodo} from './action.js';

class TodoComponect extends Component {
  render() {
    return (
      <ChildComponent 
        deleteTodo={this.props.deleteTodo}
        addTodo={this.props.addTodo}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteTodo: (id) => {
      dispatch(deleteTodo(id));
    },
    addTodo: (todo) => {
      dispatch(addTodo(todo));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoComponect);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> {addTodo, deleteTodo} <span class="hljs-keyword">from</span> <span class="hljs-string">'./action.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoComponect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> 
        <span class="hljs-attr">deleteTodo</span>=<span class="hljs-string">{this.props.deleteTodo}</span>
        <span class="hljs-attr">addTodo</span>=<span class="hljs-string">{this.props.addTodo}</span>
      /&gt;</span>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteTodo: (id) =&gt; {
      dispatch(deleteTodo(id));
    },
    addTodo: (todo) =&gt; {
      dispatch(addTodo(todo));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoComponect);</span></code></pre>
<p>使用<code>bindActionCreators</code>可以把 action 转为同名 key 的对象，但使用 dispatch 把每个 action 包围起来调用</p>
<p><em>惟一使用 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 Redux store 或 dispatch 传给它。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addTodo, deleteTodo} as TodoActions from './action.js';

class TodoComponect extends React.Component {
  
  // 在本组件内的应用
  addTodo(todo) {
    let action = TodoActions.addTodo(todo);
    this.props.dispatch(action);
  }
  
  deleteTodo(id) {
    let action = TodoActions.deleteTodo(id);
    this.props.dispatch(action);
  }
  
  render() {
    let dispatch = this.props.dispatch;
    // 传递给子组件
    let boundActionCreators = bindActionCreators(TodoActions, dispatch);
    return (
      <ChildComponent 
        {...boundActionCreators}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(TodoComponect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> {addTodo, deleteTodo} <span class="hljs-keyword">as</span> TodoActions <span class="hljs-keyword">from</span> <span class="hljs-string">'./action.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoComponect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  
  <span class="hljs-comment">// 在本组件内的应用</span>
  addTodo(todo) {
    <span class="hljs-keyword">let</span> action = TodoActions.addTodo(todo);
    <span class="hljs-keyword">this</span>.props.dispatch(action);
  }
  
  deleteTodo(id) {
    <span class="hljs-keyword">let</span> action = TodoActions.deleteTodo(id);
    <span class="hljs-keyword">this</span>.props.dispatch(action);
  }
  
  render() {
    <span class="hljs-keyword">let</span> dispatch = <span class="hljs-keyword">this</span>.props.dispatch;
    <span class="hljs-comment">// 传递给子组件</span>
    <span class="hljs-keyword">let</span> boundActionCreators = bindActionCreators(TodoActions, dispatch);
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> 
        {<span class="hljs-attr">...boundActionCreators</span>}
      /&gt;</span>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(TodoComponect)</span></code></pre>
<h4>
<code>bindActionCreator</code>源码解析</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

// bindActionCreators期待一个Object作为actionCreators传入，里面是 key: action
export default function bindActionCreators(actionCreators, dispatch) {
  // 如果只是传入一个action，则通过bindActionCreator返回被绑定到dispatch的函数
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write &quot;import ActionCreators from&quot; instead of &quot;import * as ActionCreators from&quot;?`
    )
  }

  // 遍历并通过bindActionCreator分发绑定至dispatch
  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> dispatch(actionCreator(...args))
}

<span class="hljs-comment">// bindActionCreators期待一个Object作为actionCreators传入，里面是 key: action</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreators</span>(<span class="hljs-params">actionCreators, dispatch</span>) </span>{
  <span class="hljs-comment">// 如果只是传入一个action，则通过bindActionCreator返回被绑定到dispatch的函数</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">return</span> bindActionCreator(actionCreators, dispatch)
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators !== <span class="hljs-string">'object'</span> || actionCreators === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
      <span class="hljs-string">`bindActionCreators expected an object or a function, instead received <span class="hljs-subst">${actionCreators === <span class="hljs-literal">null</span> ? <span class="hljs-string">'null'</span> : <span class="hljs-keyword">typeof</span> actionCreators}</span>. `</span> +
      <span class="hljs-string">`Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`</span>
    )
  }

  <span class="hljs-comment">// 遍历并通过bindActionCreator分发绑定至dispatch</span>
  <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(actionCreators)
  <span class="hljs-keyword">var</span> boundActionCreators = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-keyword">var</span> key = keys[i]
    <span class="hljs-keyword">var</span> actionCreator = actionCreators[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreator === <span class="hljs-string">'function'</span>) {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  <span class="hljs-keyword">return</span> boundActionCreators
}</code></pre>
<h2 id="articleHeader2">react-redux</h2>
<h4><code>Provider</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Provider extends Component {
  getChildContext() {
    // 将其声明为 context 的属性之一
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    // 接收 redux 的 store 作为 props
    this.store = props.store
  }

  render() {
    return Children.only(this.props.children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { store } = this
    const { store: nextStore } = nextProps

    if (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  store: storeShape.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Provider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  getChildContext() {
    <span class="hljs-comment">// 将其声明为 context 的属性之一</span>
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">store</span>: <span class="hljs-keyword">this</span>.store }
  }

  <span class="hljs-keyword">constructor</span>(props, context) {
    <span class="hljs-keyword">super</span>(props, context)
    <span class="hljs-comment">// 接收 redux 的 store 作为 props</span>
    <span class="hljs-keyword">this</span>.store = props.store
  }

  render() {
    <span class="hljs-keyword">return</span> Children.only(<span class="hljs-keyword">this</span>.props.children)
  }
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
  Provider.prototype.componentWillReceiveProps = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nextProps</span>) </span>{
    <span class="hljs-keyword">const</span> { store } = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">const</span> { <span class="hljs-attr">store</span>: nextStore } = nextProps

    <span class="hljs-keyword">if</span> (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
}

Provider.propTypes = {
  <span class="hljs-attr">store</span>: storeShape.isRequired,
  <span class="hljs-attr">children</span>: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  <span class="hljs-attr">store</span>: storeShape.isRequired
}</code></pre>
<h4><code>connect</code></h4>
<p>传入<code>mapStateToProps</code>,<code>mapDispatchToProps</code>,<code>mergeProps</code>,<code>options</code>。<br>首先获取传入的参数，如果没有则以默认值代替</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const { pure = true, withRef = false } = options" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> defaultMapStateToProps = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({}) <span class="hljs-comment">// eslint-disable-line no-unused-vars</span>
<span class="hljs-keyword">const</span> defaultMapDispatchToProps = <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> ({ dispatch })
<span class="hljs-keyword">const</span> { pure = <span class="hljs-literal">true</span>, withRef = <span class="hljs-literal">false</span> } = options</code></pre>
<p>之后，通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const finalMergeProps = mergeProps || defaultMergeProps" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> finalMergeProps = mergeProps || defaultMergeProps</code></pre>
<p>选择合并<code>stateProps</code>,<code>dispatchProps</code>,<code>parentProps</code>的方式，默认的合并方式 <code>defaultMergeProps</code> 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> defaultMergeProps = <span class="hljs-function">(<span class="hljs-params">stateProps, dispatchProps, parentProps</span>) =&gt;</span> ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})</code></pre>
<p>返回一个以 Component 作为参数的函数。在这个函数内部，生成了一个叫做<code>Connect</code>的 Component</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`
    // 检查参数合法性
    function checkStateShape(props, methodName) {}
    // 合并props
    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps')
      }
      return mergedProps
    }
    
    // start of Connect
    class Connect extends Component {
      constructor(props, context) {
        super(props, context);
        this.store = props.store || context.store
        
        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }
      
      computeStateProps(store, props) {
        // 调用configureFinalMapState，使用传入的mapStateToProps方法（或默认方法），将state map进props
      }
      configureFinalMapState(store, props) {}
      
      computeDispatchProps(store, props) {
        // 调用configureFinalMapDispatch，使用传入的mapDispatchToProps方法（或默认方法），将action使用dispatch封装map进props
      }
      configureFinalMapDispatch(store, props) {}
      
      // 判断是否更新props
      updateStatePropsIfNeeded() {}
      updateDispatchPropsIfNeeded() {}
      updateMergedPropsIfNeeded() {}
      
      componentDidMount() {
        // 内部调用this.store.subscribe(this.handleChange.bind(this))
        this.trySubscribe()
      }
      handleChange() {
        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        // 对数据进行监听，发送改变时调用
        this.setState({ storeState })
      }
      
      // 取消监听，清除缓存
      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }
      
      render() {
        this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
        )
        return this.renderedElement
      }
    }
    // end of Connect
    
    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: storeShape
    }
    Connect.propTypes = {
      store: storeShape
    }
    
    return hoistStatics(Connect, WrappedComponent)
  }
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapWithConnect</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
    <span class="hljs-keyword">const</span> connectDisplayName = <span class="hljs-string">`Connect(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>
    <span class="hljs-comment">// 检查参数合法性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStateShape</span>(<span class="hljs-params">props, methodName</span>) </span>{}
    <span class="hljs-comment">// 合并props</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computeMergedProps</span>(<span class="hljs-params">stateProps, dispatchProps, parentProps</span>) </span>{
      <span class="hljs-keyword">const</span> mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        checkStateShape(mergedProps, <span class="hljs-string">'mergeProps'</span>)
      }
      <span class="hljs-keyword">return</span> mergedProps
    }
    
    <span class="hljs-comment">// start of Connect</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      <span class="hljs-keyword">constructor</span>(props, context) {
        <span class="hljs-keyword">super</span>(props, context);
        <span class="hljs-keyword">this</span>.store = props.store || context.store
        
        <span class="hljs-keyword">const</span> storeState = <span class="hljs-keyword">this</span>.store.getState()
        <span class="hljs-keyword">this</span>.state = { storeState }
        <span class="hljs-keyword">this</span>.clearCache()
      }
      
      computeStateProps(store, props) {
        <span class="hljs-comment">// 调用configureFinalMapState，使用传入的mapStateToProps方法（或默认方法），将state map进props</span>
      }
      configureFinalMapState(store, props) {}
      
      computeDispatchProps(store, props) {
        <span class="hljs-comment">// 调用configureFinalMapDispatch，使用传入的mapDispatchToProps方法（或默认方法），将action使用dispatch封装map进props</span>
      }
      configureFinalMapDispatch(store, props) {}
      
      <span class="hljs-comment">// 判断是否更新props</span>
      updateStatePropsIfNeeded() {}
      updateDispatchPropsIfNeeded() {}
      updateMergedPropsIfNeeded() {}
      
      componentDidMount() {
        <span class="hljs-comment">// 内部调用this.store.subscribe(this.handleChange.bind(this))</span>
        <span class="hljs-keyword">this</span>.trySubscribe()
      }
      handleChange() {
        <span class="hljs-keyword">const</span> storeState = <span class="hljs-keyword">this</span>.store.getState()
        <span class="hljs-keyword">const</span> prevStoreState = <span class="hljs-keyword">this</span>.state.storeState
        <span class="hljs-comment">// 对数据进行监听，发送改变时调用</span>
        <span class="hljs-keyword">this</span>.setState({ storeState })
      }
      
      <span class="hljs-comment">// 取消监听，清除缓存</span>
      componentWillUnmount() {
        <span class="hljs-keyword">this</span>.tryUnsubscribe()
        <span class="hljs-keyword">this</span>.clearCache()
      }
      
      render() {
        <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent,
            <span class="hljs-keyword">this</span>.mergedProps
        )
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.renderedElement
      }
    }
    <span class="hljs-comment">// end of Connect</span>
    
    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      <span class="hljs-attr">store</span>: storeShape
    }
    Connect.propTypes = {
      <span class="hljs-attr">store</span>: storeShape
    }
    
    <span class="hljs-keyword">return</span> hoistStatics(Connect, WrappedComponent)
  }
<span class="hljs-comment">// ...</span></code></pre>
<p>我们看见，在connect的最后，返回了使用<code>hoistStatics</code>包装的<code>Connect</code>和<code>WrappedComponent</code></p>
<p><a href="https://github.com/mridgway/hoist-non-react-statics" rel="nofollow noreferrer" target="_blank">hoistStatics</a>是什么鬼？<a href="https://github.com/reactjs/react-redux/issues/276" rel="nofollow noreferrer" target="_blank">为什么使用它?</a></p>
<blockquote><p>Copies non-react specific statics from a child component to a parent component. Similar to Object.assign, but with React static keywords blacklisted from being overridden.</p></blockquote>
<p>也就是说，它类似于<code>Object.assign</code>，作用是将子组件中的 static 方法复制进父组件，但不会覆盖组件中的关键字方法(如 componentDidMount)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import hoistNonReactStatic from 'hoist-non-react-statics';

hoistNonReactStatic(targetComponent, sourceComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> hoistNonReactStatic <span class="hljs-keyword">from</span> <span class="hljs-string">'hoist-non-react-statics'</span>;

hoistNonReactStatic(targetComponent, sourceComponent);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 入坑进阶 - 源码解析

## 原文链接
[https://segmentfault.com/a/1190000006947061](https://segmentfault.com/a/1190000006947061)

