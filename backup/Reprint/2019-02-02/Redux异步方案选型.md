---
title: 'Redux异步方案选型' 
date: 2019-02-02 2:30:10
hidden: true
slug: bluiayoadcn
categories: [reprint]
---

{{< raw >}}

                    
<p>作为react社区最热门的状态管理框架，相信很多人都准备甚至正在使用Redux。</p>
<p>由于Redux的理念非常精简，没有追求大而全，这份架构上的优雅却在某种程度上伤害了使用体验：不能开箱即用，甚至是异步这种最常见的场景也要借助社区方案。</p>
<p>如果你已经挑花了眼，或者正在挑但不知道是否适合，或者已经挑了但不知道会不会有坑，这篇文章应该适合你。</p>
<p>本文会从一些常见的Redux异步方案出发，介绍它们的优缺点，进而讨论一些与异步相伴的常见场景，帮助你在选型时更好地权衡利弊。</p>
<h2 id="articleHeader0">简单方案</h2>
<h3 id="articleHeader1">redux-thunk：指路先驱</h3>
<p>Github：<a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">https://github.com/gaearon/redux-thunk</a></p>
<p>Redux作者Dan写的中间件，因官方文档出镜而广为人知。</p>
<p>它向我们展示了Redux处理异步的原理，即:</p>
<blockquote><p>Redux本身只能处理同步的Action，但可以通过中间件来拦截处理其它类型的action，比如函数(Thunk)，再用回调触发普通Action，从而实现异步处理，<strong>在这点上所有Redux的异步方案都是类似的</strong>。</p></blockquote>
<p>而它使用起来最大的问题，就是重复的模板代码太多：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//action types
const GET_DATA = 'GET_DATA',
    GET_DATA_SUCCESS = 'GET_DATA_SUCCESS',
    GET_DATA_FAILED = 'GET_DATA_FAILED';
    
//action creator
const getDataAction = function(id) {
    return function(dispatch, getState) {
        dispatch({
            type: GET_DATA, 
            payload: id
        })
        api.getData(id) //注：本文所有示例的api.getData都返回promise对象
            .then(response => {
                dispatch({
                    type: GET_DATA_SUCCESS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_DATA_FAILED,
                    payload: error
                })
            }) 
    }
}

//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case GET_DATA : 
        return oldState;
    case GET_DATA_SUCCESS : 
        return successState;
    case GET_DATA_FAILED : 
        return errorState;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//action types</span>
<span class="hljs-keyword">const</span> GET_DATA = <span class="hljs-string">'GET_DATA'</span>,
    GET_DATA_SUCCESS = <span class="hljs-string">'GET_DATA_SUCCESS'</span>,
    GET_DATA_FAILED = <span class="hljs-string">'GET_DATA_FAILED'</span>;
    
<span class="hljs-comment">//action creator</span>
<span class="hljs-keyword">const</span> getDataAction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch, getState</span>) </span>{
        dispatch({
            <span class="hljs-attr">type</span>: GET_DATA, 
            <span class="hljs-attr">payload</span>: id
        })
        api.getData(id) <span class="hljs-comment">//注：本文所有示例的api.getData都返回promise对象</span>
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                dispatch({
                    <span class="hljs-attr">type</span>: GET_DATA_SUCCESS,
                    <span class="hljs-attr">payload</span>: response
                })
            })
            .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                dispatch({
                    <span class="hljs-attr">type</span>: GET_DATA_FAILED,
                    <span class="hljs-attr">payload</span>: error
                })
            }) 
    }
}

<span class="hljs-comment">//reducer</span>
<span class="hljs-keyword">const</span> reducer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">oldState, action</span>) </span>{
    <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> GET_DATA : 
        <span class="hljs-keyword">return</span> oldState;
    <span class="hljs-keyword">case</span> GET_DATA_SUCCESS : 
        <span class="hljs-keyword">return</span> successState;
    <span class="hljs-keyword">case</span> GET_DATA_FAILED : 
        <span class="hljs-keyword">return</span> errorState;
    }
}</code></pre>
<p>这已经是最简单的场景了，请注意：我们<strong>甚至还没写一行业务逻辑</strong>，如果每个异步处理都像这样，重复且无意义的工作会变成明显的阻碍。</p>
<p>另一方面，像<code>GET_DATA_SUCCESS</code>、<code>GET_DATA_FAILED</code>这样的字符串声明也非常无趣且易错。</p>
<p>上例中，<code>GET_DATA</code>这个action并不是多数场景需要的，它涉及我们将会提到的<code>乐观更新</code>，保留这些代码是为了和下面的方案做对比</p>
<h3 id="articleHeader2">redux-promise：瘦身过头</h3>
<p>由于<code>redux-thunk</code>写起来实在是太麻烦了，社区当然会有其它轮子出现。<a href="https://github.com/acdlite/redux-promise" rel="nofollow noreferrer" target="_blank">redux-promise</a>则是其中比较知名的，同样也享受了官网<a href="http://redux.js.org/docs/advanced/#connecting-to-ui" rel="nofollow noreferrer" target="_blank">出镜</a>的待遇。</p>
<p>它自定义了一个middleware，当检测到有action的payload属性是Promise对象时，就会：</p>
<ul>
<li><p>若resolve，触发一个此action的拷贝，但payload为promise的value，并设status属性为"success"</p></li>
<li><p>若reject，触发一个此action的拷贝，但payload为promise的reason，并设status属性为"error"</p></li>
</ul>
<p>说起来可能有点不好理解，用代码感受下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//action types
const GET_DATA = 'GET_DATA';

//action creator
const getData = function(id) {
    return {
        type: GET_DATA,
        payload: api.getData(id) //payload为promise对象
    }
}

//reducer
function reducer(oldState, action) {
    switch(action.type) {
    case GET_DATA: 
        if (action.status === 'success') {
            return successState
        } else {
               return errorState
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//action types</span>
<span class="hljs-keyword">const</span> GET_DATA = <span class="hljs-string">'GET_DATA'</span>;

<span class="hljs-comment">//action creator</span>
<span class="hljs-keyword">const</span> getData = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_DATA,
        <span class="hljs-attr">payload</span>: api.getData(id) <span class="hljs-comment">//payload为promise对象</span>
    }
}

<span class="hljs-comment">//reducer</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">oldState, action</span>) </span>{
    <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> GET_DATA: 
        <span class="hljs-keyword">if</span> (action.status === <span class="hljs-string">'success'</span>) {
            <span class="hljs-keyword">return</span> successState
        } <span class="hljs-keyword">else</span> {
               <span class="hljs-keyword">return</span> errorState
        }
    }
}</code></pre>
<p>进步巨大! 代码量明显减少! 就用它了! ？</p>
<p>请等等，<strong>任何能明显减少代码量的方案，都应该小心它是否过度省略了什么东西</strong>，减肥是好事，减到骨头就残了。</p>
<p>redux-promise为了精简而做出的妥协非常明显：<a href="https://github.com/acdlite/flux-standard-action/issues/7" rel="nofollow noreferrer" target="_blank">无法处理乐观更新</a></p>
<h4>场景解析之：乐观更新</h4>
<p>多数异步场景都是<code>悲观更新</code>(求更好的翻译)的，即等到请求成功才渲染数据。而与之相对的<code>乐观更新</code>，则是<strong>不等待请求成功，在发送请求的同时立即渲染数据</strong>。</p>
<p>最常见的例子就是微信等聊天工具，发送消息时消息<strong>立即</strong>进入了对话窗，如果发送失败的话，在消息旁边再作补充提示即可。这种交互"乐观"地相信请求会成功，因此称作<code>乐观更新</code>。</p>
<p>由于<code>乐观更新</code>发生在用户操作时，要处理它，意味着<strong>必须有action表示用户的初始动作</strong></p>
<p>在上面redux-thunk的例子中，我们看到了<code>GET_DATA</code>, <code>GET_DATA_SUCCESS</code>、<code>GET_DATA_FAILED</code>三个action，分别表示<code>初始动作</code>、<code>异步成功</code>和<code>异步失败</code>，其中第一个action使得redux-thunk具备乐观更新的能力。</p>
<p>而在redux-promise中，最初触发的action被中间件拦截然后过滤掉了。原因很简单，redux认可的<a href="http://redux.js.org/docs/basics/Actions.html" rel="nofollow noreferrer" target="_blank">action</a>对象是 <em>plain JavaScript objects</em>，即简单对象，而在redux-promise中，初始action的payload是个Promise。</p>
<p>另一方面，使用<code>status</code>而不是<code>type</code>来区分两个异步action也非常值得商榷，按照redux对action的定义以及社区的普遍实践，个人还是倾向于使用不同的type，用同一type下的不同status区分action额外增加了一套隐形的<code>约定</code>，甚至不符合该redux-promise作者自己所提倡的<code>FSA</code>，体现在代码上则是在switch-case内再增加一层判断。</p>
<h3 id="articleHeader3">redux-promise-middleware：拔乱反正</h3>
<p><a href="https://github.com/pburtchaell/redux-promise-middleware" rel="nofollow noreferrer" target="_blank">redux-promise-middleware</a>相比redux-promise，采取了更为温和和渐进式的思路，保留了和redux-thunk类似的三个action。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//action types
const GET_DATA = 'GET_DATA',
    GET_DATA_PENDING = 'GET_DATA_PENDING',
    GET_DATA_FULFILLED = 'GET_DATA_FULFILLED',
    GET_DATA_REJECTED = 'GET_DATA_REJECTED';
    
//action creator
const getData = function(id) {
    return {
        type: GET_DATA,
        payload: {
            promise: api.getData(id),
            data: id
        }
    }
}

//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case GET_DATA_PENDING :
        return oldState; // 可通过action.payload.data获取id
    case GET_DATA_FULFILLED : 
        return successState;
    case GET_DATA_REJECTED : 
        return errorState;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//action types</span>
<span class="hljs-keyword">const</span> GET_DATA = <span class="hljs-string">'GET_DATA'</span>,
    GET_DATA_PENDING = <span class="hljs-string">'GET_DATA_PENDING'</span>,
    GET_DATA_FULFILLED = <span class="hljs-string">'GET_DATA_FULFILLED'</span>,
    GET_DATA_REJECTED = <span class="hljs-string">'GET_DATA_REJECTED'</span>;
    
<span class="hljs-comment">//action creator</span>
<span class="hljs-keyword">const</span> getData = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_DATA,
        <span class="hljs-attr">payload</span>: {
            <span class="hljs-attr">promise</span>: api.getData(id),
            <span class="hljs-attr">data</span>: id
        }
    }
}

<span class="hljs-comment">//reducer</span>
<span class="hljs-keyword">const</span> reducer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">oldState, action</span>) </span>{
    <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> GET_DATA_PENDING :
        <span class="hljs-keyword">return</span> oldState; <span class="hljs-comment">// 可通过action.payload.data获取id</span>
    <span class="hljs-keyword">case</span> GET_DATA_FULFILLED : 
        <span class="hljs-keyword">return</span> successState;
    <span class="hljs-keyword">case</span> GET_DATA_REJECTED : 
        <span class="hljs-keyword">return</span> errorState;
    }
}
</code></pre>
<p>如果不需要乐观更新，action creator可以使用和redux-promise完全一样的，更简洁的写法，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getData = function(id) {
    return {
        type: GET_DATA,
        payload: api.getData(id) //等价于 {promise: api.getData(id)}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getData = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: GET_DATA,
        <span class="hljs-attr">payload</span>: api.getData(id) <span class="hljs-comment">//等价于 {promise: api.getData(id)}</span>
    }
}</code></pre>
<p>此时初始action<code>GET_DATA_PENDING</code>仍然会触发，但是payload为空。</p>
<p>相对redux-promise于粗暴地过滤掉整个初始action，redux-promise-middleware选择创建一个<strong>只过滤payload中的promise属性</strong>的<code>XXX_PENDING</code>作为初始action，以此保留乐观更新的能力。</p>
<p>同时在action的区分上，它选择了回归<code>type</code>的"正途"，<code>_PENDING</code>、<code>_FULFILLED </code>、<code>_REJECTED</code>等后缀借用了promise规范 (当然它们是可配置的) 。</p>
<p>它的遗憾则是只在action层实现了简化，对reducer层则束手无策。另外，相比redux-thunk，它还多出了一个<code>_PENDING</code>的字符串模板代码(三个action却需要四个type)。</p>
<blockquote><p>社区有类似<a href="https://github.com/tomatau/type-to-reducer" rel="nofollow noreferrer" target="_blank">type-to-reducer</a>这样试图简化reducer的库。但由于reducer和异步action通常是两套独立的方案，reducer相关的库无法去猜测异步action的后缀是什么(甚至有没有后缀)，社区也没有相关标准，也就很难对异步做出精简和抽象了。</p></blockquote>
<h3 id="articleHeader4">redux-action-tools：软文预警</h3>
<p>无论是<code>redux-thunk</code>还是<code>redux-promise-middleware</code>，模板代码都是显而易见的，每次写<code>XXX_COMPLETED</code>这样的代码都觉得是在浪费生命——你得先在常量中声明它们，再在action中引用，然后是reducer，假设像<code>redux-thunk</code>一样每个异步action有三个type，三个文件加起来你就得写九次! </p>
<p>国外开发者也有相同的报怨：</p>
<p><span class="img-wrap"><img data-src="/img/bVEzOz" src="https://static.alili.tech/img/bVEzOz" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>有没有办法让代码既像redux-promise一样简洁，又能保持乐观更新的能力呢？</p>
<p><a href="https://github.com/kpaxqin/redux-action-tools" rel="nofollow noreferrer" target="_blank">redux-action-tools</a>是我给出的答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GET_DATA = 'GET_DATA';

//action creator
const getData = createAsyncAction(GET_DATA, function(id) {
    return api.getData(id)
})

//reducer
const reducer = createReducer()
    .when(getData, (oldState, action) => oldState)
    .done((oldState, action) => successState)
    .failed((oldState, action) => errorState)
    .build()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> GET_DATA = <span class="hljs-string">'GET_DATA'</span>;

<span class="hljs-comment">//action creator</span>
<span class="hljs-keyword">const</span> getData = createAsyncAction(GET_DATA, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> api.getData(id)
})

<span class="hljs-comment">//reducer</span>
<span class="hljs-keyword">const</span> reducer = createReducer()
    .when(getData, (oldState, action) =&gt; oldState)
    .done(<span class="hljs-function">(<span class="hljs-params">oldState, action</span>) =&gt;</span> successState)
    .failed(<span class="hljs-function">(<span class="hljs-params">oldState, action</span>) =&gt;</span> errorState)
    .build()</code></pre>
<p>redux-action-tools在action层面做的事情与前面几个库大同小异：同样是派发了三个action：<code>GET_DATA</code>/<code>GET_DATA_SUCCESS</code>/<code>GET_DATA_FAILED</code>。这三个action的描述见下表：</p>
<table>
<thead><tr>
<th>type</th>
<th>When</th>
<th align="center">payload</th>
<th align="center">meta.asyncPhase</th>
</tr></thead>
<tbody>
<tr>
<td><code>${actionName}</code></td>
<td>异步开始前</td>
<td align="center">同步调用参数</td>
<td align="center">'START'</td>
</tr>
<tr>
<td><code>${actionName}_COMPLETED</code></td>
<td>异步成功</td>
<td align="center">value of promise</td>
<td align="center">'COMPLETED'</td>
</tr>
<tr>
<td><code>${actionName}_FAILED</code></td>
<td>异步失败</td>
<td align="center">reason of promise</td>
<td align="center">'FAILED'</td>
</tr>
</tbody>
</table>
<p><code>createAsyncAction</code>参考了redux-promise作者写的<a href="https://github.com/acdlite/redux-actions" rel="nofollow noreferrer" target="_blank">redux-actions</a> ，它接收三个参数，分别是：</p>
<ol>
<li><p>actionName <em>字符串</em>，所有派生action的名字都以它为基础，初始action则与它同名</p></li>
<li><p>promiseCreator <em>函数</em>，必须返回一个promise对象</p></li>
<li><p>metaCreator <em>函数</em>，<strong>可选</strong>，作用后面会演示到</p></li>
</ol>
<p>目前看来，其实和redux-promise/redux-promise-middleware大同小异。而真正不同的，是它同时简化了reducer层! 这种简化来自于对异步行为从语义角度的抽象：</p>
<blockquote><p>当(<strong>when</strong>)初始action发生时处理同步更新，若异步成功(<strong>done</strong>)则处理成功逻辑，若异步失败(<strong>failed</strong>)则处理失败逻辑</p></blockquote>
<p>抽离出<code>when</code>/<code>done</code>/<code>failed</code>三个关键词作为api，并使用链式调用将他们串联起来：<code>when</code>函数接收两个参数：actionName和handler，其中handler是可选的，<code>done</code>和<code>failed</code>则只接收一个handler参数，并且只能在<code>when</code>之后调用——他们分别处理`${actionName}_SUCCESS` 和 `${actionName}_FAILED`.</p>
<p>无论是action还是reducer层，<code>XX_SUCCESS</code>/<code>XX_FAILED</code>相关的代码都被封装了起来，正如在例子中看到的——你甚至不需要声明它们! <strong>创建一个异步action，然后处理它的成功和失败情况，事情本该这么简单。</strong></p>
<p>更进一步的，这三个action默认都根据当前所处的异步阶段，设置了不同的meta(见上表中的meta.asyncPhase)，它有什么用呢？用场景说话：</p>
<h4>场景解析：失败处理与Loading</h4>
<p>它们是异步不可回避的两个场景，几乎每个项目会遇到。</p>
<p>以异步请求的失败处理为例，每个项目通常都有一套比较通用的，适合多数场景的处理逻辑，比如弹窗提示。同时在一些特定场景下，又需要绕过通用逻辑进行单独处理，比如表单的异步校验。</p>
<p>而在实现通用处理逻辑时，常见的问题有以下几种：</p>
<ol>
<li>
<p>底层处理，扩展性不足</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchWrapper(args) {
    return fetch.apply(fetch, args)
        .catch(commonErrorHandler)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchWrapper</span>(<span class="hljs-params">args</span>) </span>{
    <span class="hljs-keyword">return</span> fetch.apply(fetch, args)
        .catch(commonErrorHandler)
}</code></pre>
<p>在较底层封装ajax库可以轻松实现全局处理，但问题也非常明显：</p>
<p>一是<strong>扩展性不足</strong>，比如少数场景想要绕过通用处理逻辑，还有一些场景错误是前端生成而非直接来自于请求；</p>
<p>二是<strong>不易组合</strong>，比如有的场景一个action需要多个异步请求，但异常处理和loading是不需要重复的，因为用户不需要知道一个动作有多少个请求。</p>
</li>
<li>
<p>不够内聚，侵入业务代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//action creator
const getData = createAsyncAction(GET_DATA, function(id) {
    return api.getData(id)
        .catch(commonErrorHandler) //调用错误处理函数
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//action creator</span>
<span class="hljs-keyword">const</span> getData = createAsyncAction(GET_DATA, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> api.getData(id)
        .catch(commonErrorHandler) <span class="hljs-comment">//调用错误处理函数</span>
})</code></pre>
<p>在有业务意义的action层调用通用处理逻辑，既能按需调用，又不妨碍异步请求的组合。但由于通用处理往往适用于<strong>多数</strong>场景，这样写会导致业务代码变得冗余，因为几乎每个action都得这么写。</p>
</li>
<li>
<p>高耦合，高风险</p>
<p>也有人把上面的方案做个依赖反转，改为在通用逻辑里监听业务action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function commonErrorReducer(oldState, action) {
    switch(action.type) {
    case GET_DATA_FAILED:
    case PUT_DATA_FAILED:
    //... tons of action type
        return commonErrorHandler(action)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commonErrorReducer</span>(<span class="hljs-params">oldState, action</span>) </span>{
    <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> GET_DATA_FAILED:
    <span class="hljs-keyword">case</span> PUT_DATA_FAILED:
    <span class="hljs-comment">//... tons of action type</span>
        <span class="hljs-keyword">return</span> commonErrorHandler(action)
    }
}</code></pre>
<p>这样做的本质是把冗余从业务代码中拿出来集中管理。</p>
<p>问题在于<strong>每添加一个请求，都需要修改公共代码</strong>，把对应的action type加进来。且不说并行开发时merge冲突，如果加了一个异步action，但忘了往公共处理文件中添加——这是很可能会发生的——而异常是分支流程不容易被测试发现，等到发现，很可能就是事故而不是bug了。</p>
</li>
</ol>
<p>通过以上几种常见方案的分析，我认为比较完善的错误处理(Loading同理)需要具备如下特点：</p>
<ul>
<li><p>面向异步动作(action)，而非直接面向请求</p></li>
<li><p>不侵入业务代码</p></li>
<li><p>默认使用通用处理逻辑，无需额外代码</p></li>
<li><p>可以绕过通用逻辑</p></li>
</ul>
<p>而借助<code>redux-action-tools</code>提供的<em>meta.asyncPhase</em>，可以轻易用middleware实现以上全部需求!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash'
import { ASYNC_PHASES } from 'redux-action-tools'

function errorMiddleWare({dispatch}) {
  return next => action => {
    const asyncStep = _.get(action, 'meta.asyncStep');

    if (asyncStep === ASYNC_PHASES.FAILED) {
      dispatch({
        type: 'COMMON_ERROR',
        payload: {
          action
        }
      })
    }
    
    next(action);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>
<span class="hljs-keyword">import</span> { ASYNC_PHASES } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-action-tools'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">errorMiddleWare</span>(<span class="hljs-params">{dispatch}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">const</span> asyncStep = _.get(action, <span class="hljs-string">'meta.asyncStep'</span>);

    <span class="hljs-keyword">if</span> (asyncStep === ASYNC_PHASES.FAILED) {
      dispatch({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'COMMON_ERROR'</span>,
        <span class="hljs-attr">payload</span>: {
          action
        }
      })
    }
    
    next(action);
  }
}</code></pre>
<p>以上中间件一旦检测到<code>meta.asyncStep</code>字段为<em>FAILED</em>的action便触发新的action去调用通用处理逻辑。面向action、不侵入业务、默认工作 (只要是用createAsyncAction声明的异步) ! 轻松实现了理想需求中的前三点，那如何定制呢？既然拦截是面向meta的，只要在创建action时支持对meta的自定义就行了，而<code>createAsyncAction</code>的第三个参数就是为此准备的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash'
import { ASYNC_PHASES } from 'redux-action-tools'

const customizedAction = createAsyncAction(
  type, 
  promiseCreator, //type 和 promiseCreator此处无不同故省略
  (payload, defaultMeta) => {
    return { ...defaultMeta, omitError: true }; //向meta中添加配置参数
  }
)

function errorMiddleWare({dispatch}) {
  return next => action => {
    const asyncStep = _.get(action, 'meta.asyncStep');
    const omitError = _.get(action, 'meta.omitError'); //获取配置参数

    if (!omitError &amp;&amp; asyncStep === ASYNC_PHASES.FAILED) {
      dispatch({
        type: 'COMMON_ERROR',
        payload: {
          action
        }
      })
    }
    
    next(action);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>
<span class="hljs-keyword">import</span> { ASYNC_PHASES } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-action-tools'</span>

<span class="hljs-keyword">const</span> customizedAction = createAsyncAction(
  type, 
  promiseCreator, <span class="hljs-comment">//type 和 promiseCreator此处无不同故省略</span>
  (payload, defaultMeta) =&gt; {
    <span class="hljs-keyword">return</span> { ...defaultMeta, <span class="hljs-attr">omitError</span>: <span class="hljs-literal">true</span> }; <span class="hljs-comment">//向meta中添加配置参数</span>
  }
)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">errorMiddleWare</span>(<span class="hljs-params">{dispatch}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">const</span> asyncStep = _.get(action, <span class="hljs-string">'meta.asyncStep'</span>);
    <span class="hljs-keyword">const</span> omitError = _.get(action, <span class="hljs-string">'meta.omitError'</span>); <span class="hljs-comment">//获取配置参数</span>

    <span class="hljs-keyword">if</span> (!omitError &amp;&amp; asyncStep === ASYNC_PHASES.FAILED) {
      dispatch({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'COMMON_ERROR'</span>,
        <span class="hljs-attr">payload</span>: {
          action
        }
      })
    }
    
    next(action);
  }
}</code></pre>
<p>类似的，你可以想想如何处理Loading，需要强调的是建议尽量用增量配置的方式进行扩展，而<strong>不要轻易删除和修改meta.asyncPhase</strong>。</p>
<p>比如上例可以通过删除<code>meta.asyncPhase</code>实现同样功能，但如果同时还有其它地方也依赖<code>meta.asyncPhase</code>(比如loadingMiddleware)，就可能导致本意是定制错误处理，却改变了Loading的行为，客观来讲<strong>这层风险是基于meta拦截方案的最大缺点</strong>，然而相比多数场景的便利、健壮，个人认为特殊场景的风险是可以接受的，毕竟这些场景在整个开发测试流程容易获得更多关注。</p>
<h2 id="articleHeader5">进阶方案</h2>
<p>上面所有的方案，都把异步请求这一动作放在了action creator中，这样做的好处是简单直观，且和Flux社区一脉相承(见下图)。因此个人将它们归为相对简单的一类。</p>
<p><span class="img-wrap"><img data-src="https://facebook.github.io/react/img/blog/flux-diagram.png" src="https://static.alili.techhttps://facebook.github.io/react/img/blog/flux-diagram.png" alt="action_creator" title="action_creator" style="cursor: pointer;"></span></p>
<p>下面将要介绍的，是相对复杂一类，它们都采用了与上图不同的思路，去追求更优雅的架构、解决更复杂的问题</p>
<h3 id="articleHeader6">redux-loop：分形! 组合!</h3>
<p>众所周知，Redux是借鉴自<a href="http://elm-lang.org" rel="nofollow noreferrer" target="_blank">Elm</a>的，然而在Elm中，异步的处理却并不是在action creator层，而是在reducer(Elm中称update)层：</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/655fdfe6e77bf59fde4623dc77a0e8962f6effa5/687474703a2f2f692e696d6775722e636f6d2f4e4a574c58487a2e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/655fdfe6e77bf59fde4623dc77a0e8962f6effa5/687474703a2f2f692e696d6775722e636f6d2f4e4a574c58487a2e706e67" alt="elm_arch" title="elm_arch" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>图片来源于： <a href="https://github.com/jarvisaoieong/redux-architecture" rel="nofollow noreferrer" target="_blank">https://github.com/jarvisaoie...</a></p></blockquote>
<p>这样做的目的是为了实现彻底的可组合性(composable)。在redux中，reducer作为函数是可组合的，action正常情况下作为纯对象也是可组合的，然而一旦涉及异步，当action嵌套组合的时候，中间件就无法正常识别，这个问题让redux作者Dan也发出感叹 <a href="https://productpains.com/post/redux/there-is-no-easy-way-to-compose-redux-applications" rel="nofollow noreferrer" target="_blank">There is no easy way to compose Redux applications</a>并且开了一个至今仍然open的<a href="https://github.com/reactjs/redux/issues/1528" rel="nofollow noreferrer" target="_blank">issue</a>，对组合、分形与redux的故事，有兴趣的朋友可以观摩以上链接，甚至了解一下Elm，篇幅所限，本文难以尽述。</p>
<p>而redux-loop，则是在这方面的一个尝试，它更彻底的模仿了Elm的模式：引入Effects的概念并将其置入reducer，官方示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Effects, loop } from 'redux-loop';
import { loadingStart, loadingSuccess, loadingFailure } from './actions';

export function fetchDetails(id) {
  return fetch(`/api/details/${id}`)
    .then((r) => r.json())
    .then(loadingSuccess)
    .catch(loadingFailure);
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'LOADING_START':
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchDetails, action.payload.id)
      ); // 同时返回状态与副作用

    case 'LOADING_SUCCESS':
      return {
        ...state,
        loading: false,
        details: action.payload
      };

    case 'LOADING_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };

    default:
      return state;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { Effects, loop } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-loop'</span>;
<span class="hljs-keyword">import</span> { loadingStart, loadingSuccess, loadingFailure } <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchDetails</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`/api/details/<span class="hljs-subst">${id}</span>`</span>)
    .then(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.json())
    .then(loadingSuccess)
    .catch(loadingFailure);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'LOADING_START'</span>:
      <span class="hljs-keyword">return</span> loop(
        { ...state, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span> },
        Effects.promise(fetchDetails, action.payload.id)
      ); <span class="hljs-comment">// 同时返回状态与副作用</span>

    <span class="hljs-keyword">case</span> <span class="hljs-string">'LOADING_SUCCESS'</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">details</span>: action.payload
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">'LOADING_FAILURE'</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">error</span>: action.payload.message
      };

    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}</code></pre>
<p>注意在reducer中，当处理<code>LOADING_START</code>时，并没有直接返回state对象，而是用<code>loop</code>函数将state和Effect"打包"返回(实际上这个返回值是数组<code>[State, Effect]</code>，和Elm的方式非常接近)。</p>
<p>然而修改reducer的返回类型显然是比较暴力的做法，除非Redux官方出面，否则很难获得社区的广泛认同。更复杂的返回类型会让很多已有的API，三方库面临危险，甚至<code>combineReducer</code>都需要用redux-loop提供的定制<a href="https://github.com/redux-loop/redux-loop#use-the-custom-combinereducers-if-you-need-it" rel="nofollow noreferrer" target="_blank">版本</a>，这种"破坏性"也是Redux作者Dan没有采纳redux-loop进入Redux核心代码的原因："If a solution doesn’t work with vanilla combineReducers(), it won’t get into Redux core"。</p>
<p>对Elm的分形架构有了解，想在Redux上继续实践的人来说，redux-loop是很好的参考素材，但对多数人和项目而言，最好还是更谨慎地看待。</p>
<h3 id="articleHeader7">redux-saga：难、而美</h3>
<p>Github:  <a href="https://github.com/yelouafi/redux-saga" rel="nofollow noreferrer" target="_blank">https://github.com/yelouafi/r...</a></p>
<p>另一个著名的库，它让异步行为成为架构中独立的一层(称为saga)，既不在action creator中，也不和reducer沾边。</p>
<p>它的出发点是把副作用 (Side effect，异步行为就是典型的副作用) 看成"线程"，可以通过普通的action去触发它，当副作用完成时也会触发action作为输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Api from '...'

function* getData(action) {
   try {
      const response = yield call(api.getData, action.payload.id);
      yield put({type: &quot;GET_DATA_SUCCEEDED&quot;, payload: response});
   } catch (e) {
      yield put({type: &quot;GET_DATA_FAILED&quot;, payload: error});
   }
}

function* mySaga() {
  yield* takeEvery(&quot;GET_DATA&quot;, getData);
}

export default mySaga;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { takeEvery } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga'</span>
<span class="hljs-keyword">import</span> { call, put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>
<span class="hljs-keyword">import</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">'...'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getData</span>(<span class="hljs-params">action</span>) </span>{
   <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">yield</span> call(api.getData, action.payload.id);
      <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">"GET_DATA_SUCCEEDED"</span>, <span class="hljs-attr">payload</span>: response});
   } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">"GET_DATA_FAILED"</span>, <span class="hljs-attr">payload</span>: error});
   }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">mySaga</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span>* takeEvery(<span class="hljs-string">"GET_DATA"</span>, getData);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mySaga;</code></pre>
<p>相比action creator的方案，它可以保证组件触发的action是纯对象，因此至少在项目范围内(middleware和saga都是项目的顶层依赖，跨项目无法保证)，action的组合性明显更加优秀。</p>
<p>而它最为主打的，则是<strong>可测试性</strong>和强大的异步<strong>流程控制</strong>。</p>
<p>由于强制所有saga都必须是generator函数，借助generator的next接口，异步行为的每个中间步骤都被暴露给了开发者，从而实现对异步逻辑"step by step"的测试。这在其它方案中是很少看到的 (当然也可以借鉴generator这一点，但缺少约束)。</p>
<p>而强大得有点眼花缭乱的<a href="http://yelouafi.github.io/redux-saga/docs/api/index.html" rel="nofollow noreferrer" target="_blank">API</a>，特别是channel的引入，则提供了武装到牙齿级的异步流程控制能力。</p>
<p>然而，回顾我们在讨论简单方案时提到的各种场景与问题，redux-saga并没有去尝试回答和解决它们，这意味着你需要自行寻找解决方案。而generator、相对复杂的API和单独的一层抽象也让不少人望而却步。</p>
<p>包括我在内，很多人非常欣赏redux-saga。它的架构和思路毫无疑问是优秀甚至优雅的，但使用它之前，最好想清楚它带来的优点(可测试性、流程控制、高度解耦)与付出的成本是否匹配，特别是异步方面复杂度并不高的项目，比如多数以CRUD为主的管理系统。</p>
<h4>场景解析：竞态</h4>
<p>说到异步流程控制很多人可能觉得太抽象，这里举个简单的例子：竞态。这个问题并不罕见，知乎也有见到<a href="https://www.zhihu.com/question/51944726" rel="nofollow noreferrer" target="_blank">类似问题</a>。</p>
<p>简单描述为：</p>
<blockquote><p>由于异步返回时间的不确定性，后发出的请求可能先返回，如何确保异步结果的渲染是按照请求发生顺序，而不是返回顺序？</p></blockquote>
<p>这在redux-thunk为代表的简单方案中是要费点功夫的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchFriend(id){
    return (dispatch, getState) => {
        //步骤1：在reducer中 set state.currentFriend = id;
        dispatch({type: 'FETCH_FIREND', payload: id}); 

        return fetch(`http://localhost/api/firend/${id}`)
            .then(response => response.json())
            .then(json => { 
                //步骤2：只处理currentFriend的对应response
                const { currentFriend } = getState();
                (currentFriend === id) &amp;&amp; dispatch({type: 'RECEIVE_FIRENDS', playload: json})
            });
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchFriend</span>(<span class="hljs-params">id</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> {
        <span class="hljs-comment">//步骤1：在reducer中 set state.currentFriend = id;</span>
        dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'FETCH_FIREND'</span>, <span class="hljs-attr">payload</span>: id}); 

        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`http://localhost/api/firend/<span class="hljs-subst">${id}</span>`</span>)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
            .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> { 
                <span class="hljs-comment">//步骤2：只处理currentFriend的对应response</span>
                <span class="hljs-keyword">const</span> { currentFriend } = getState();
                (currentFriend === id) &amp;&amp; dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'RECEIVE_FIRENDS'</span>, <span class="hljs-attr">playload</span>: json})
            });
    }
}
</code></pre>
<p>以上只是示例，实际中不一定需要依赖业务id，也不一定要把id存到store里，只要为每个请求生成key，以便处理请求时能够对应起来即可。</p>
<p>而在redux-saga中，一切非常地简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { takeLatest } from `redux-saga`

function* fetchFriend(action) {
  ...
}

function* watchLastFetchUser() {
  yield takeLatest('FETCH_FIREND', fetchFriend)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { takeLatest } <span class="hljs-keyword">from</span> <span class="hljs-string">`redux-saga`</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchFriend</span>(<span class="hljs-params">action</span>) </span>{
  ...
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchLastFetchUser</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> takeLatest(<span class="hljs-string">'FETCH_FIREND'</span>, fetchFriend)
}</code></pre>
<p>这里的重点是<a href="http://yelouafi.github.io/redux-saga/docs/api/#saga-helpers" rel="nofollow noreferrer" target="_blank">takeLatest</a>，它限制了同步事件与异步返回事件的顺序关系。</p>
<p>另外还有一些基于响应式编程(Reactive Programming)的异步方案(如redux-observable)也能非常好地处理竞态场景，因为<strong>描述事件流之间的关系，正是整个响应式编程的抽象基石</strong>，而竞态在本质上就是如何保证同步事件与异步返回事件的关系，正是响应式编程的用武之地。</p>
<h2 id="articleHeader8">小结</h2>
<p>本文包含了一些redux社区著名、非著名 (恩，我的redux-action-tools) 的异步方案，这些其实并不重要。</p>
<p>因为方案是一家之作，结论也是一家之言，不可能放之四海皆准。个人更希望文中探讨过的常见问题和场景，比如模板代码、乐观更新、错误处理、竞态等，能够成为你选型时的尺子，为你的权衡提供更好的参考，而不是等到项目热火朝天的时候，才发现当初选型的硬伤。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux异步方案选型

## 原文链接
[https://segmentfault.com/a/1190000007248878](https://segmentfault.com/a/1190000007248878)

