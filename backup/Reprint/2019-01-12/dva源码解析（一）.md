---
title: 'dva源码解析（一）' 
date: 2019-01-12 2:30:24
hidden: true
slug: cj2admd85n5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p><code>dva</code>是蚂蚁金服推出的一个单页应用框架，对<code>redux</code>，<code>react-router</code>，<code>redux-saga</code>进行了上层封装，没有引入新的概念，但是极大的程度上提升了开发效率；下面内容为本人理解，如有错误，还请指出，不胜感激。</p>
<h2 id="articleHeader1">redux的痛苦</h2>
<p><code>redux</code>的优点很多，痛点也有，比如异步控制，<code>redux-saga</code>的出现使得异步操作变得优雅，但是基于<code>redux-saga</code>不得不承认的一点就是开发过程实在是太麻烦了，假若增加一个操作，不得不操作<code>actions</code>，<code>reducers</code>，<code>sagas</code>，对于<code>sagas</code>可以还需要进行<code>watch</code>，而后还要进行<code>fork</code>；（PS: 本来就够麻烦了，再加上一个<code>sagas</code>）；在添加一个操作时，不得不操作这么多的文件，实在是麻烦，而<code>dva</code>的出现在一定程度上解决了这个问题。</p>
<h2 id="articleHeader2">dva基本概念</h2>
<p>未使用<code>dva</code>下的目录经常是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="actions
   --/ user.js
   --/ team.js
reducers
   --/ user.js
   --/ team.js
sagas/
   --/ user.js
   --/ team.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>actions
   -<span class="ruby">-<span class="hljs-regexp">/ user.js
</span></span>   -<span class="ruby"><span class="hljs-regexp">-/</span> team.js
</span>reducers
   -<span class="ruby">-<span class="hljs-regexp">/ user.js
</span></span>   -<span class="ruby"><span class="hljs-regexp">-/</span> team.js
</span>sagas/
   -<span class="ruby">-<span class="hljs-regexp">/ user.js
</span></span>   -<span class="ruby"><span class="hljs-regexp">-/</span> team.js</span></code></pre>
<p><code>dva</code>将其合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="models
   --/ user.js
   --/ team.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>models
   -<span class="ruby">-<span class="hljs-regexp">/ user.js
</span></span>   -<span class="ruby"><span class="hljs-regexp">-/</span> team.js</span></code></pre>
<p><code>dva</code>中有着几个概念：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="namespace       =>  combineReducers中对应的key值
state           =>  对应初始的state,也就是initialState
effects         =>  saga的处理函数
reducers        =>  对应reducers,不同的是,写法上将switch...case转化为对象  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>namespace       =&gt;  combineReducers中对应的key值
<span class="hljs-keyword">state</span>           =&gt;  对应初始的<span class="hljs-keyword">state</span>,也就是initialState
effects         =&gt;  saga的处理函数
reducers        =&gt;  对应reducers,不同的是,写法上将switch...case转化为对象  </code></pre>
<p>除了这些以外，<code>dva</code>中还有<code>subscriptions</code>，这一概念来源于<code>elm</code>，</p>
<h2 id="articleHeader3">dva的实现</h2>
<h3 id="articleHeader4">初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = dva({
    history: browserHistory
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const app</span> = dva({
    history: browserHistory
});</code></pre>
<p>上面的过程发生了什么？<br><code>dva</code>本质上调用了下面函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dva(hooks = {}) {
    const history = hooks.history || defaultHistory;
    const initialState = hooks.initialState || {};
    delete hooks.history;
    delete hooks.initialState;

    const plugin = new Plugin();
    plugin.use(hooks);

    const app = {
      // properties
      _models: [],
      _router: null,
      _store: null,
      _history: null,
      _plugin: plugin,
      _getProvider: null,
      // methods
      use,
      model,
      router,
      start,
    };
    return app;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dva</span><span class="hljs-params">(hooks = {})</span> </span>{
    <span class="hljs-keyword">const</span> history = hooks.history || defaultHistory;
    <span class="hljs-keyword">const</span> initialState = hooks.initialState || {};
    <span class="hljs-keyword">delete</span> hooks.history;
    <span class="hljs-keyword">delete</span> hooks.initialState;

    <span class="hljs-keyword">const</span> plugin = <span class="hljs-keyword">new</span> Plugin();
    plugin.use(hooks);

    <span class="hljs-keyword">const</span> app = {
      <span class="hljs-comment">// properties</span>
      _models: [],
      _router: <span class="hljs-literal">null</span>,
      _store: <span class="hljs-literal">null</span>,
      _history: <span class="hljs-literal">null</span>,
      _plugin: plugin,
      _getProvider: <span class="hljs-literal">null</span>,
      <span class="hljs-comment">// methods</span>
      <span class="hljs-keyword">use</span>,
      model,
      router,
      start,
    };
    <span class="hljs-keyword">return</span> app;
}</code></pre>
<p><code>hooks</code>为传入的一些配置，例如可以通过传入<code>history</code>来改变路由的实现，<code>dva</code>默认采用的是<code>hashHistory</code>；从这里可以看出<code>dva</code>暴露出来的方法：</p>
<ul>
<li><p><code>app.router()</code>：指定路由，需要传入一个函数，一般类似于<code>({ history }) =&gt; (&lt;Router&gt;...&lt;/Router&gt;)</code></p></li>
<li><p><code>app.use()</code>：添加插件，这个稍后来看~</p></li>
<li>
<p><code>app.model()</code>：添加<code>model</code>，也就是对应的添加一个<code>store</code>下的数据，该方法做的就是对传入的<code>model</code>进行检查，对<code>reducers</code>添加命名空间，而后将其<code>push</code>到<code>_models</code>中。</p>
<ul>
<li><p><code>namespace</code>必须且唯一，因为内置了<code>react-redux-router</code>，所以<code>namespace</code>也不能为<code>routing</code></p></li>
<li><p><code>subscriptions</code>与<code>effects</code>均为可选参数，传入的话必须为对象</p></li>
<li><p><code>reducers</code>为可选，支持对象和数组两种传入方式（传入数组的方式，往往伴随着高阶<code>reducer</code>的应用，具体稍后再看~）</p></li>
</ul>
</li>
<li><p><code>app.start()</code>：初始化应用，接受参数为选择器或者<code>DOM</code>节点</p></li>
</ul>
<p>需要注意的是：</p>
<ul>
<li><p><strong><code>reducers</code>和<code>effects</code>的<code>key</code>不需要用<code>namespace/action</code>的形式了，因为<code>dva</code>会自动将其加上，<code>dispatch</code>的时候，<code>saga</code>需要加上<code>namespace</code>，而<code>saga</code>中的<code>put</code>不需要加入<code>namespace</code>，原因是<code>dva</code>对<code>put进行了重载</code></strong></p></li>
<li><p><strong><code>dva</code>同时支持rn应用，引入<code>dva/mobile</code>即可，这时<code>react-router</code>不在需要，利用rn中的<code>Navigator</code>即可，不会引用<code>react-router</code>与<code>react-redux-router</code>，<code>namespace</code>可以命名为<code>routing</code>；正是由于这点差异，作者将路由相关的内容作为参数传入了进去，具体可以参见这个文件。</strong></p></li>
</ul>
<h3 id="articleHeader5">创建</h3>
<p>将一些配置项初始化好后，就可以<code>app.start</code>就是来创建一个应用，下面就一点点的看看<code>start</code>的过程（以下基于默认情况，也就是使用了<code>react-router</code>)：</p>
<ul>
<li><p>参数校验，是否为<code>DOM</code>元素或者检查是否可以根据传入的选择器字符串找到对应的<code>DOM</code>，这个<code>DOM</code>对应的就是<code>ReactDOM.render</code>的第二个参数。</p></li>
<li><p>错误处理，使得发生错误时，不至于应用奔溃，当然需要传入自定义<code>hooks.onError</code>来处理：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 传入hooks.onError则调用，反之调用默认函数处理，抛出异常即可
  const onError = plugin.apply('onError', (err) => {
    throw new Error(err.stack || err);
  });
  // 目的是出现错误时，也可以进行dispatch操作
  const onErrorWrapper = (err) => {
    if (err) {
      if (typeof err === 'string') err = new Error(err);
      onError(err, app._store.dispatch);
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  <span class="hljs-comment">// 传入hooks.onError则调用，反之调用默认函数处理，抛出异常即可</span>
  <span class="hljs-keyword">const</span> onError = <span class="hljs-keyword">plugin</span>.apply('onError', (<span class="hljs-keyword">err</span>) =&gt; {
    throw new <span class="hljs-keyword">Error</span>(<span class="hljs-keyword">err</span>.<span class="hljs-keyword">stack</span> || <span class="hljs-keyword">err</span>);
  });
  <span class="hljs-comment">// 目的是出现错误时，也可以进行dispatch操作</span>
  <span class="hljs-keyword">const</span> onErrorWrapper = (<span class="hljs-keyword">err</span>) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">err</span> === 'string') <span class="hljs-keyword">err</span> = new <span class="hljs-keyword">Error</span>(<span class="hljs-keyword">err</span>);
      onError(<span class="hljs-keyword">err</span>, <span class="hljs-keyword">app</span>._store.dispatch);
    }
  };</code></pre>
<ul><li><p>遍历<code>_models</code>，初始化<code>reducers,sagas</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sagas = [];
// initalReducer为{ routing: routerReducer }
const reducers = { ...initialReducer };  // 为rootReducer
for (const m of this._models) {
    // 得到默认的state
    reducers[m.namespace] = getReducer(m.reducers, m.state);
    if (m.effects) sagas.push(getSaga(m.effects, m, onErrorWrapper));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const sagas = [];
// initalReducer为{ routing: routerReducer }
const reducers = { ...initialReducer };  // 为rootReducer
<span class="hljs-keyword">for</span> (const m of this._models) {
    // 得到默认的<span class="hljs-keyword">state</span>
    reducers[m.namespace] = getReducer(m.reducers, m.<span class="hljs-keyword">state</span>);
    if (m.effects) sagas.push(getSaga(m.effects, m, <span class="hljs-keyword">on</span>ErrorWrapper));
}</code></pre>
<h3 id="articleHeader6">处理reducers</h3>
<p>对于<code>redux</code>的<code>reducers</code>最常见的是基于<code>switch..case</code>的，而<code>dva</code>做出了一些改变，将每一个<code>case</code>分支变作了一个函数：</p>
<p><span class="img-wrap"><img data-src="/img/bVOFye?w=772&amp;h=147" src="https://static.alili.tech/img/bVOFye?w=772&amp;h=147" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>（PS: 本人认为，这个可以块可以更改，利用<code>some</code>操作来尽可能少的调用无意义的<code>reducer</code>，于是我提了一个pr）</p>
<p>每一个<code>reducer</code>的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// actionType对应的是dva的reducers中的key值
(state, action) => {
    const { type } = action;
    if (type &amp;&amp; actionType !== type) {
        return state;
    }
    return reducer(state, action);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// actionType对应的是dva的reducers中的key值
(<span class="hljs-keyword">state</span>, action) =&gt; {
    const { type } = action;
    if (type &amp;&amp; actionType !== type) {
        return <span class="hljs-keyword">state</span>;
    }
    return reducer(<span class="hljs-keyword">state</span>, action);
};</code></pre>
<h3 id="articleHeader7">处理sagas</h3>
<p>看完了对于<code>reducers</code>的处理，下面来看一下对于<code>sagas</code>的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSaga(effects, model, onError) {
  return function *() {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(key, effects[key], model, onError);
        const task = yield sagaEffects.fork(watcher);
        // 为了移除时可以将saga任务注销
        yield sagaEffects.fork(function *() {
          yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSaga</span>(<span class="hljs-params">effects, model, onError</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> effects) {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(effects, key)) {
        <span class="hljs-keyword">const</span> watcher = getWatcher(key, effects[key], model, onError);
        <span class="hljs-keyword">const</span> task = <span class="hljs-keyword">yield</span> sagaEffects.fork(watcher);
        <span class="hljs-comment">// 为了移除时可以将saga任务注销</span>
        <span class="hljs-keyword">yield</span> sagaEffects.fork(<span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">yield</span> sagaEffects.take(<span class="hljs-string">`<span class="hljs-subst">${model.namespace}</span>/@@CANCEL_EFFECTS`</span>);
          <span class="hljs-keyword">yield</span> sagaEffects.cancel(task);
        });
      }
    }
  };
}</code></pre>
<p><code>getWatcher</code>返回一个<code>saga</code>监听函数，也就是通常写的<code>watchXXX</code>，<code>model.effects[key]</code>可以是一个任务函数；也可以是个数组，第一个参数为任务函数，第二为配置对象，可以传入<code>type</code>，<code>type</code>有4个可选值，<code>takeEvery</code>（默认），<code>takeLatest</code>，<code>throttle</code>，<code>watcher</code>四种，<code>dva</code>对<code>effects</code>做了一个错误处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="effect => function *(...args) {
  try {
    yield effect(...args.concat(createEffects(model)));
  } catch (e) {
    onError(e);   // 为之前的onErrorWrapper
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>effect =&gt; <span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-params">(...args)</span> </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">yield</span> effect(...args.concat(createEffects(model)));
  } <span class="hljs-keyword">catch</span> (e) {
    onError(e);   <span class="hljs-comment">// 为之前的onErrorWrapper</span>
  }
}</code></pre>
<p>注意：</p>
<ul>
<li><p><code>watcher</code>是指传入的任务函数就是一个<code>watcher</code>直接<code>fork</code>就好</p></li>
<li><p><code>throttle</code>还要传入一个<code>ms</code>配置，这个<code>ms</code>代表着在多少毫秒内只触发一次同一类型<code>saga</code>任务，而<code>takeEvery</code>是不会限制同一类型执行次数，<code>takeLatest</code>只能执行一个同一类型任务，有执行中的再次执行就会取消</p></li>
<li><p>由<code>getSaga</code>可以看出，<code>${namespace}/@@CANCEL_EFFECTS</code>可以取消对应的任务监听</p></li>
<li><p>可以通过配置<code>hooks.onEffect</code>来增加<code>saga</code>的<code>watcher</code></p></li>
</ul>
<h3 id="articleHeader8">增强<code>redux</code>
</h3>
<ul>
<li><p><code>redux</code>中间件，由<code>sagaMiddware</code>，<code>routerMiddware</code>（启用<code>react-router</code>时），<code>hooks.onAction</code>传入的其它中间件，如<code>redux-logger</code>等</p></li>
<li><p>其它增强，如<code>redux-devtools</code>，内置了<code>redux-devtools</code>，另需的话在<code>hooks.extraReducers</code>传入</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
    ...extraEnhancers,
  ];
  const store = this._store = createStore(  // eslint-disable-line
    createReducer(),
    initialState,
    compose(...enhancers),
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-keyword">const</span> enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
    ...extraEnhancers,
  ];
  <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">this</span>._store = createStore(  <span class="hljs-comment">// eslint-disable-line</span>
    createReducer(),
    initialState,
    compose(...enhancers),
  );</code></pre>
<h3 id="articleHeader9">设置redux的回调函数</h3>
<p>通过配置<code>hooks.onStateChange</code>可以指定<code>redux</code>的<code>state</code>改变后所触发的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const listeners = plugin.get('onStateChange');
  for (const listener of listeners) {
    store.subscribe(() => {
      listener(store.getState());
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> listeners = plugin.get(<span class="hljs-string">'onStateChange'</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> listener <span class="hljs-keyword">of</span> listeners) {
    store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      listener(store.getState());
    });
  }
}</code></pre>
<h3 id="articleHeader10">新概念subscriptions</h3>
<p><code>subscriptions</code>是一个新概念，会在<code>dom ready</code>之后执行，在这里面可以做一些基础数据的获取：<br>一般会将初始数据的获取放在<code>react</code>的生命周期中，比如<code>componentWillMount</code>，但是假设我们做了代码分割，实现了按需加载，那么我们开始获取数据的时间为：获取相应的<code>js</code>+解析<code>js</code>+执行<code>react</code>生命周期，但是<code>redux</code>的数据加载和<code>ui</code>组件没有太大关系，可以将数据获取的时间点提前，<code>subscriptions</code>提供了解决方法，其意义为订阅，对于上面的场景，我们可以订阅路由，到了执行的路由执行相应的<code>dispatch()</code>，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setup({ dispatch, history }) {
  return history.listen(({ pathname, query }) => {
    if (pathname === '/users') {
      dispatch({ type: 'fetch', payload: query });
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>setup({ dispatch, history }) {
  return history.listen(({ pathname, query }) =&gt; {
    if (pathname === <span class="hljs-string">'/users'</span>) {
      dispatch({ type: <span class="hljs-string">'fetch'</span>, payload: query });
    }
  });
}</code></pre>
<p>（PS: 对于这个新概念，我也不是很清楚，后面的文章会有专门的描述，大家先有一个概念就好）</p>
<h3 id="articleHeader11">挂载</h3>
<p>上述过程均为初始化的过程，就是获取到需要的<code>reducers</code>，<code>sagas</code>以及对于一些中间件和插件的配置，下面要进行的就是挂载了，也就熟悉的<code>render(&lt;Provider&gt;, container)</code>。</p>
<h3 id="articleHeader12">动态处理model</h3>
<p><code>dva.model</code>与<code>dva.unmodel</code>，封装了在运行时的<code>store</code>进行一类增加和删除的操作，例如可以再切换到某一路由时动态的加入一个<code>model</code>(个人猜测，热更新很有可能也利用了这个两个<code>api</code>与<code>hooks.onHmr</code>)。</p>
<h2 id="articleHeader13">未完结</h2>
<p>关于<code>redux</code>还有一个利器，那就是高阶<code>reduce</code>，当然在<code>dva</code>中也有体现，这篇文章已经很长了，这些内容留在下一篇中介绍。以上是本人对于<code>dva</code>的粗略的理解，内容如有错误，还请大家指出。<code>dva</code>的确简化了开发的流程，而且在蚂蚁金服的很多业务线也有着应用，是一个很值得大家一试！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
dva源码解析（一）

## 原文链接
[https://segmentfault.com/a/1190000009800398](https://segmentfault.com/a/1190000009800398)

