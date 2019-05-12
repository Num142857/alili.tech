---
title: 'redux-saga 实践总结' 
date: 2019-02-01 2:30:10
hidden: true
slug: 30tak3uso6u
categories: [reprint]
---

{{< raw >}}

                    
<p>有关 redux-saga 的文章，网络上早已是汗牛充栋。因此，本篇主要谈一谈自己的理解，以及实践中的经验总结。</p>
<p>众所周知，redux 大部分的想法，都来自于 <a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">elm</a>。在 elm 和 redux 中，整个应用就是一个纯函数。elm 通过在 reducer 中返回一些声明副作用的 task 来处理异步问题，而 redux 借鉴 koa 的插件机制，用中间件改造 dispatch ，从而诞生了一批通过构造满足特殊 pattern 条件的 action 来解决副作用的问题。</p>
<p>而 redux-saga 独辟蹊径，监听 action 来执行有副作用的 task，以保持 action 的简洁性。并且引入了 <a href="http://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf" rel="nofollow noreferrer" target="_blank">sagas</a> 的机制和 generator 的特性，让redux-saga 非常方便地处理复杂异步问题。</p>
<p>有意思的是，redux 借鉴了 elm，但在处理异步问题（副作用问题在前端一般为异步问题）上，借鉴了 koa 中间件的形式，而 redux-saga 却又去从 elm 取经，借鉴了独立 task 的形式。但是说到底，redux-saga 是一个 redux 的中间件。这个故事告诉我们，有好的设计不如有强大的扩展性。</p>
<p>redux-saga 本身也有良好的扩展性。比如，易证得，但凡 redux 中间件，都可以用 redux-saga 来重写。当然了，不是说用了 redux-saga，其它异步中间件就不能用了，只是说不能保证 redux-saga 能恰好和你之前使用的中间件配合良好。</p>
<h2 id="articleHeader0">
<code>redux-saga</code> 简介</h2>
<p>redux-saga 是一个 redux 中间件，它具有如下特性：</p>
<ul>
<li><p>集中处理 redux 副作用问题。</p></li>
<li><p>被实现为 generator 。</p></li>
<li><p>类 redux-thunk 中间件。</p></li>
<li><p>watch/worker（监听-&gt;执行） 的工作形式。</p></li>
</ul>
<p>读者也可以从这里查看<a href="https://github.com/yelouafi/redux-saga" rel="nofollow noreferrer" target="_blank">官方定义</a>。</p>
<p>对于刚接触 redux-saga 的同学，可以先来一段简单的代码快速了解 redux-saga 诸多特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 类 thunk 的 worker “进程”
function* load() {
  yield put({ type: BEGIN_LOAD_DATA });
  
  try {
    const result = yield call(fetch, UrlMap.loadData);

    yield put({
      type: LOAD_DATA_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: LOAD_DATA_ERROR,
      payload: e,
      error: true,
    });
  }
}

function* saga() {
  // 创建一个监听“进程”
  yield fork(watch(CLICK_LOAD_BUTTON, load))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 类 thunk 的 worker “进程”</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">load</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: BEGIN_LOAD_DATA });
  
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> call(fetch, UrlMap.loadData);

    <span class="hljs-keyword">yield</span> put({
      <span class="hljs-attr">type</span>: LOAD_DATA_SUCCESS,
      <span class="hljs-attr">payload</span>: result,
    });
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">yield</span> put({
      <span class="hljs-attr">type</span>: LOAD_DATA_ERROR,
      <span class="hljs-attr">payload</span>: e,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">true</span>,
    });
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">saga</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建一个监听“进程”</span>
  <span class="hljs-keyword">yield</span> fork(watch(CLICK_LOAD_BUTTON, load))
}</code></pre>
<h3 id="articleHeader1">Effects</h3>
<p>Effect 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行</p>
<p>在 redux-saga 世界里，所有的 Effect 都必须被 yield 才会执行，所以有人写了 <a href="https://github.com/pke/eslint-plugin-redux-saga" rel="nofollow noreferrer" target="_blank">eslint-plugin-redux-saga</a> 来检查是否每个 Effect 都被 yield。并且原则上来说，所有的 yield 后面也只能跟Effect，以保证代码的易测性。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield fetch(UrlMap.fetchData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">yield</span> fetch(UrlMap.fetchData);</code></pre>
<p>应该用 call Effect ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield call(fetch, UrlMap.fetchData)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">yield</span> call(fetch, UrlMap.fetchData)</code></pre>
<p>从而可以使代码可测：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assert.deepEqual(iterator.next().value, call(fetch, UrlMap.fetchData))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">assert.deepEqual(iterator.next().value, call(fetch, UrlMap.fetchData))</code></pre>
<p>关于各个 Effect 的具体介绍，文档已经写得很详细了，这里只做简要介绍。</p>
<h4>1、put</h4>
<p>作用和 redux 中的 dispatch 相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield put({ type: 'CLICK_BTN' });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'CLICK_BTN'</span> });</code></pre>
<h4>2、select</h4>
<p>作用和 redux thunk 中的 getState 相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const id = yield select(state => state.id);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> id = <span class="hljs-keyword">yield</span> select(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.id);</code></pre>
<h4>3、take</h4>
<p>等待 redux dispatch 匹配某个 pattern 的 action 。</p>
<p>在这个例子中，先等待一个按钮点击的 action ，然后执行按钮点击的 saga：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (true) {
  yield take('CLICK_BUTTON');
  yield fork(clickButtonSaga);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
  <span class="hljs-keyword">yield</span> take(<span class="hljs-string">'CLICK_BUTTON'</span>);
  <span class="hljs-keyword">yield</span> fork(clickButtonSaga);
}</code></pre>
<p>再举一个利用 take 实现 logMiddleware 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (true) {
  const action = yield take('*');
  const newState = yield select();
  
  console.log('received action:', action);
  console.log('state become:', newState);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
  <span class="hljs-keyword">const</span> action = <span class="hljs-keyword">yield</span> take(<span class="hljs-string">'*'</span>);
  <span class="hljs-keyword">const</span> newState = <span class="hljs-keyword">yield</span> select();
  
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'received action:'</span>, action);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state become:'</span>, newState);
}</code></pre>
<p>这种监听一个 action ，然后执行相应任务的方式，在 redux-saga 中非常常用，因此 redux-saga 提供了一个辅助 Effect —— takeEvery ，让 watch/worker 的代码更加清晰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield takeEvery('*', function* logger(action) {
  const newState = yield select();

  console.log('received action:', action);
  console.log('state become:', newState);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">yield</span> takeEvery(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">logger</span>(<span class="hljs-params">action</span>) </span>{
  <span class="hljs-keyword">const</span> newState = <span class="hljs-keyword">yield</span> select();

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'received action:'</span>, action);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state become:'</span>, newState);
});</code></pre>
<h4>4、阻塞调用和无阻塞调用</h4>
<p>redux-saga 可以用 fork 和 call 来调用子 saga ，其中 fork 是无阻塞型调用，call 是阻塞型调用。</p>
<p>如果看过 saga 的论文，就知道 saga 是由许多子 saga （或者 subtransaction）组合起来的。fork Effect 和它的字面意思一样，即创建一个子 saga 。</p>
<h5>4.1、fork</h5>
<p>下面写一个倒数的例子，当接收到 BEGIN_COUNT 的 action，则开始倒数，而接收到 STOP_COUNT 的 action， 则停止倒数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* count(number) {
  let currNum = number;

  while (currNum >= 0) {
    console.log(currNum--);
    yield delay(1000);
  }
}

function countSaga* () {
  while (true) {
    const { payload: number } = yield take(BEGIN_COUNT);
    const countTaskId = yield fork(count, number);

    yield take(STOP_TASK);
    yield cancel(countTaskId);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">count</span>(<span class="hljs-params">number</span>) </span>{
  <span class="hljs-keyword">let</span> currNum = number;

  <span class="hljs-keyword">while</span> (currNum &gt;= <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">console</span>.log(currNum--);
    <span class="hljs-keyword">yield</span> delay(<span class="hljs-number">1000</span>);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countSaga</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> { <span class="hljs-attr">payload</span>: number } = <span class="hljs-keyword">yield</span> take(BEGIN_COUNT);
    <span class="hljs-keyword">const</span> countTaskId = <span class="hljs-keyword">yield</span> fork(count, number);

    <span class="hljs-keyword">yield</span> take(STOP_TASK);
    <span class="hljs-keyword">yield</span> cancel(countTaskId);
  }
}</code></pre>
<h5>4.2、call</h5>
<p>有阻塞地调用 saga 或者返回 promise 的函数。</p>
<p>同样写一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const project = yield call(fetch, { url: UrlMap.fetchProject });
const members = yield call(fetchMembers, project.id);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> project = <span class="hljs-keyword">yield</span> call(fetch, { <span class="hljs-attr">url</span>: UrlMap.fetchProject });
<span class="hljs-keyword">const</span> members = <span class="hljs-keyword">yield</span> call(fetchMembers, project.id);</code></pre>
<p><a href="http://yelouafi.github.io/redux-saga/docs/api/index.html#effect-creators" rel="nofollow noreferrer" target="_blank">英文文档</a></p>
<p><a href="http://leonshi.com/redux-saga-in-chinese/docs/api/index.html#effect-" rel="nofollow noreferrer" target="_blank">中文文档</a></p>
<h2 id="articleHeader2">传统异步中间件简介</h2>
<p>在介绍 redux-saga 优缺点之前，这里先简要介绍传统的 redux 异步中间件，以便和 redux-saga 做比较。对传统异步中间件已经充分了解的读者，可以直接跳到 “redux-saga 优缺点分析” 进行阅读。</p>
<h3 id="articleHeader3">1. fetch-middleware</h3>
<p>使用redux的前端技术团队或个人，大多数都有一套自己 fetch-middleware，一来可以封装异步请求的业务逻辑，避免重复代码，二来可以写一些公共的异步请求逻辑，比如异常接口数据采集、接口缓存、接口处理等等。例如 <a href="https://github.com/jasonslyvia/redux-composable-fetch" rel="nofollow noreferrer" target="_blank">redux-composable-fetch</a>，<a href="https://github.com/agraboso/redux-api-middleware" rel="nofollow noreferrer" target="_blank">redux-api-middleware</a>。</p>
<p>在当前 redux 社区中，fetch-middleware 封装结果一般如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadData(id) {
  return {
    url: '/api.json',
    types: [LOADING_ACTION_TYPE, SUCCESS_ACTION_TYPE, SUCCESS_ACTION_TYPE],
    params: {
      id,
    },
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadData</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">url</span>: <span class="hljs-string">'/api.json'</span>,
    <span class="hljs-attr">types</span>: [LOADING_ACTION_TYPE, SUCCESS_ACTION_TYPE, SUCCESS_ACTION_TYPE],
    <span class="hljs-attr">params</span>: {
      id,
    },
  };
}</code></pre>
<p>值得一提的是，大多数 fetch-middleware 都会用到一个小技巧 —— 把最终处理好的 promise 返回出来，以便在 thunk-middleware 中复用，并组织不同异步过程的先后逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadDetailThunk(id) {
  return (dispatch) => {
    // 先请求到 loadData 的结果，再请求 loadDetail
    dispatch(loadData(id)).then(result => {
      const { id: detailId } = result;
      dispatch(loadDetail(detailId));
    });
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadDetailThunk</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch</span>) =&gt;</span> {
    <span class="hljs-comment">// 先请求到 loadData 的结果，再请求 loadDetail</span>
    dispatch(loadData(id)).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> { <span class="hljs-attr">id</span>: detailId } = result;
      dispatch(loadDetail(detailId));
    });
  };
}</code></pre>
<p>这个技巧在 <code>redux-saga</code> 中也同样有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* loadDetailSaga(id) {
  const result = yield put.sync(loadData(id));
  const { id: detailId } = result;

  yield put.sync(loadDetail(detailId));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">loadDetailSaga</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> put.sync(loadData(id));
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">id</span>: detailId } = result;

  <span class="hljs-keyword">yield</span> put.sync(loadDetail(detailId));
}</code></pre>
<h3 id="articleHeader4">2. redux-thunk-middleware</h3>
<p>redux 中大量应用了 thunk 的概念，例如 getState 以延迟执行的方式可以始终获得最新值，redux-thunk 以延迟执行的方式把副作用的责任推卸到用户身上。</p>
<p>任何异步问题都能在 thunk 中解决。</p>
<h3 id="articleHeader5">3. <a href="https://github.com/jasonslyvia/redux-sequence-action" rel="nofollow noreferrer" target="_blank">sequence-middleware</a>
</h3>
<p>sequence-middleware 用于保证 action 依次执行，无论是异步 action 还是普通 aciton ，和 fetch-middleware 配合使用非常方便。</p>
<p>这里可以把每个 action 可以写成 thunk action，在 thunk 函数内从 store 拿到参数，避免 action 之间的依赖。这样不管业务逻辑有多复杂，都可以通过用 sequence action 轻易组织。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadDetailThunk() {
  return function(dispatch, getState) {
    const detailId = _.get(getState(), `${currPath}.detailId`);

    dispatch({
      url: UrlMap.getDetail,
      params: { detailId },
    });
  };
}

function loadDetail() {
  return [loadData(), loadDetailThunk()];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadDetailThunk</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch, getState</span>) </span>{
    <span class="hljs-keyword">const</span> detailId = _.get(getState(), <span class="hljs-string">`<span class="hljs-subst">${currPath}</span>.detailId`</span>);

    dispatch({
      <span class="hljs-attr">url</span>: UrlMap.getDetail,
      <span class="hljs-attr">params</span>: { detailId },
    });
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadDetail</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [loadData(), loadDetailThunk()];
}</code></pre>
<h2 id="articleHeader6">
<code>redux-saga</code> 优缺点分析</h2>
<h3 id="articleHeader7">缺点</h3>
<ul>
<li><p>redux-saga 不强迫我们捕获异常，这往往会造成异常发生时难以发现原因。因此，一个良好的习惯是，相信任何一个过程都有可能发生异常。如果出现异常但没有被捕获，redux-saga 的错误栈会给你一种一脸懵逼的感觉。</p></li>
<li><p>generator 的调试环境比较糟糕，babel 的 source-map 经常错位，经常要手动加 debugger 来调试。</p></li>
<li><p>你团队中使用的其它异步中间件，或许难以和 redux-saga 搭配良好。或许需要花费一些代价，用 redux-saga 来重构一部分中间件。</p></li>
</ul>
<h3 id="articleHeader8">优点</h3>
<ul>
<li><p>保持 action 的简单纯粹，aciton 不再像原来那样五花八门，让人眼花缭乱。task 的模式使代码更加清晰。</p></li>
<li><p>redux-saga 提供了丰富的 Effects，以及 sagas 的机制（所有的 saga 都可以被中断），在处理复杂的异步问题上十分趁手。如果你的应用属于写操作密集型或者业务逻辑复杂，快让 redux-saga 来拯救你。</p></li>
<li><p>扩展性强。</p></li>
<li><p>声明式的 Effects，使代码更易测试，<a href="http://leonshi.com/redux-saga-in-chinese/docs/basics/DeclarativeEffects.html" rel="nofollow noreferrer" target="_blank">查看详情</a>。</p></li>
</ul>
<h2 id="articleHeader9">利用 redux-saga 写 redux 中间件</h2>
<p>用 redux-saga 来写中间件，可谓事半功倍。这里举一个轮询中间件的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* pollingSaga(fetchAction) {
  const { defaultInterval, mockInterval } = fetchAction;

  while (true) {
    try {
      const result = yield put.sync(fetchAction);
      const interval = mockInterval || result.interval;

      yield delay(interval * 1000);
    } catch (e) {
      yield delay(defaultInterval * 1000);
    }
  }
}

function* beginPolling(pollingAction) {
  const { pollingUrl, defaultInterval = 300, mockInterval, types,
    params = {} } = pollingAction;

  if (!types[1]) {
    console.error('pollingAction pattern error', pollingAction);
    throw Error('pollingAction types[1] is null');
  }

  const fetchAction = {
    url: pollingUrl,
    types,
    params,
    mockInterval,
    defaultInterval,
  };

  const pollingTaskId = yield fork(pollingSaga, fetchAction);
  const pattern = action => action.type === types[1] &amp;&amp; action.stopPolling;

  yield take(pattern);
  yield cancel(pollingTaskId);
}

function* pollingSagaMiddleware() {
  yield takeEvery(action => {
    const { pollingUrl, types } = action;

    return pollingUrl &amp;&amp; types &amp;&amp; types.length;
  }, beginPolling);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">pollingSaga</span>(<span class="hljs-params">fetchAction</span>) </span>{
  <span class="hljs-keyword">const</span> { defaultInterval, mockInterval } = fetchAction;

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> put.sync(fetchAction);
      <span class="hljs-keyword">const</span> interval = mockInterval || result.interval;

      <span class="hljs-keyword">yield</span> delay(interval * <span class="hljs-number">1000</span>);
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">yield</span> delay(defaultInterval * <span class="hljs-number">1000</span>);
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">beginPolling</span>(<span class="hljs-params">pollingAction</span>) </span>{
  <span class="hljs-keyword">const</span> { pollingUrl, defaultInterval = <span class="hljs-number">300</span>, mockInterval, types,
    params = {} } = pollingAction;

  <span class="hljs-keyword">if</span> (!types[<span class="hljs-number">1</span>]) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'pollingAction pattern error'</span>, pollingAction);
    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'pollingAction types[1] is null'</span>);
  }

  <span class="hljs-keyword">const</span> fetchAction = {
    <span class="hljs-attr">url</span>: pollingUrl,
    types,
    params,
    mockInterval,
    defaultInterval,
  };

  <span class="hljs-keyword">const</span> pollingTaskId = <span class="hljs-keyword">yield</span> fork(pollingSaga, fetchAction);
  <span class="hljs-keyword">const</span> pattern = <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> action.type === types[<span class="hljs-number">1</span>] &amp;&amp; action.stopPolling;

  <span class="hljs-keyword">yield</span> take(pattern);
  <span class="hljs-keyword">yield</span> cancel(pollingTaskId);
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">pollingSagaMiddleware</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> takeEvery(<span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> { pollingUrl, types } = action;

    <span class="hljs-keyword">return</span> pollingUrl &amp;&amp; types &amp;&amp; types.length;
  }, beginPolling);
};</code></pre>
<p>最后，<code>redux-saga</code> 在实践的沉淀，我已经总结到 <a href="https://github.com/jasonHzq/redux-saga-sugar" rel="nofollow noreferrer" target="_blank">redux-saga-sugar</a>，欢迎点赞 ~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux-saga 实践总结

## 原文链接
[https://segmentfault.com/a/1190000007261052](https://segmentfault.com/a/1190000007261052)

