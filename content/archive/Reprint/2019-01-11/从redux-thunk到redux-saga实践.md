---
title: '从redux-thunk到redux-saga实践' 
date: 2019-01-11 2:30:07
hidden: true
slug: mntkx8nlch8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文章同步于Github <a href="https://github.com/Pines-Cheng/blog/issues" rel="nofollow noreferrer" target="_blank">Pines-Cheng/blog</a>
</blockquote>
<h2 id="articleHeader0">简介</h2>
<blockquote>本质都是为了解决异步action的问题</blockquote>
<p>Redux Saga可以理解为一个和系统交互的常驻进程，其中，Saga可简单定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Saga = Worker + Watcher" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">Saga</span> = Worker + Watcher</code></pre>
<p>saga特点：</p>
<ul>
<li>saga的应用场景是复杂异步，如长时事务<code>LLT(long live transcation)</code>等业务场景。</li>
<li>方便测试，可以使用takeEvery打印logger。</li>
<li>提供<code>takeLatest/takeEvery/throttle</code>方法，可以便利的实现对事件的仅关注最近事件、关注每一次、事件限频</li>
<li>提供<code>cancel/delay</code>方法，可以便利的取消、延迟异步请求</li>
<li>提供<code>race(effects),[…effects]</code>方法来支持竞态和并行场景</li>
<li>提供channel机制支持外部事件</li>
</ul>
<p>Redux Saga适用于对事件操作有细粒度需求的场景，同时他们也提供了更好的可测试性。</p>
<h2 id="articleHeader1">thunk VS saga</h2>
<p>这里有一个简单的需求，登录页面，使用<code>redux-thunk</code>与<code>async / await</code>。组件可能看起来像这样，像平常一样分派操作。</p>
<p>组件部分二者应该是大同小异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { login } from 'redux/auth';

class LoginForm extends Component {

  onClick(e) {
    e.preventDefault();
    const { user, pass } = this.refs;
    this.props.dispatch(login(user.value, pass.value));
  }

  render() {
    return (<div>
        <input type=&quot;text&quot; ref=&quot;user&quot; />
        <input type=&quot;password&quot; ref=&quot;pass&quot; />
        <button onClick={::this.onClick}>Sign In</button>
    </div>);
  } 
}

export default connect((state) => ({}))(LoginForm);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { login } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux/auth'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  onClick(e) {
    e.preventDefault();
    <span class="hljs-keyword">const</span> { user, pass } = <span class="hljs-keyword">this</span>.refs;
    <span class="hljs-keyword">this</span>.props.dispatch(login(user.value, pass.value));
  }

  render() {
    <span class="hljs-keyword">return</span> (&lt;div&gt;
        &lt;input type="text" ref="user" /&gt;
        &lt;input type="password" ref="pass" /&gt;
        &lt;button onClick={::this.onClick}&gt;Sign In&lt;/button&gt;
    &lt;/div&gt;);
  } 
}

export default connect((state) =&gt; ({}))(LoginForm);</code></pre>
<h3 id="articleHeader2">使用redux-thunk</h3>
<p>登录的action文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// auth.js

import request from 'axios';
import { loadUserData } from './user';

// define constants
// define initial state
// export default reducer

export const login = (user, pass) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        let { data } = await request.post('/login', { user, pass });
        await dispatch(loadUserData(data.uid));
        dispatch({ type: LOGIN_SUCCESS, data });
    } catch(error) {
        dispatch({ type: LOGIN_ERROR, error });
    }
}

// more actions..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// auth.js</span>

<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> { loadUserData } <span class="hljs-keyword">from</span> <span class="hljs-string">'./user'</span>;

<span class="hljs-comment">// define constants</span>
<span class="hljs-comment">// define initial state</span>
<span class="hljs-comment">// export default reducer</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> login = <span class="hljs-function">(<span class="hljs-params">user, pass</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch) =&gt; {
    <span class="hljs-keyword">try</span> {
        dispatch({ <span class="hljs-attr">type</span>: LOGIN_REQUEST });
        <span class="hljs-keyword">let</span> { data } = <span class="hljs-keyword">await</span> request.post(<span class="hljs-string">'/login'</span>, { user, pass });
        <span class="hljs-keyword">await</span> dispatch(loadUserData(data.uid));
        dispatch({ <span class="hljs-attr">type</span>: LOGIN_SUCCESS, data });
    } <span class="hljs-keyword">catch</span>(error) {
        dispatch({ <span class="hljs-attr">type</span>: LOGIN_ERROR, error });
    }
}

<span class="hljs-comment">// more actions...</span></code></pre>
<p>更新用户数据的页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// user.js

import request from 'axios';

// define constants
// define initial state
// export default reducer

export const loadUserData = (uid) => async (dispatch) => {
    try {
        dispatch({ type: USERDATA_REQUEST });
        let { data } = await request.get(`/users/${uid}`);
        dispatch({ type: USERDATA_SUCCESS, data });
    } catch(error) {
        dispatch({ type: USERDATA_ERROR, error });
    }
}

// more actions...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// user.js</span>

<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

<span class="hljs-comment">// define constants</span>
<span class="hljs-comment">// define initial state</span>
<span class="hljs-comment">// export default reducer</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loadUserData = <span class="hljs-function">(<span class="hljs-params">uid</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch) =&gt; {
    <span class="hljs-keyword">try</span> {
        dispatch({ <span class="hljs-attr">type</span>: USERDATA_REQUEST });
        <span class="hljs-keyword">let</span> { data } = <span class="hljs-keyword">await</span> request.get(<span class="hljs-string">`/users/<span class="hljs-subst">${uid}</span>`</span>);
        dispatch({ <span class="hljs-attr">type</span>: USERDATA_SUCCESS, data });
    } <span class="hljs-keyword">catch</span>(error) {
        dispatch({ <span class="hljs-attr">type</span>: USERDATA_ERROR, error });
    }
}

<span class="hljs-comment">// more actions...</span>
</code></pre>
<h3 id="articleHeader3">使用redux-saga</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function* loginSaga() {
  while(true) {
    const { user, pass } = yield take(LOGIN_REQUEST) //等待 Store 上指定的 action LOGIN_REQUEST
    try {
      let { data } = yield call(request.post, '/login', { user, pass }); //阻塞，请求后台数据
      yield fork(loadUserData, data.uid); //非阻塞执行loadUserData
      yield put({ type: LOGIN_SUCCESS, data }); //发起一个action，类似于dispatch
    } catch(error) {
      yield put({ type: LOGIN_ERROR, error });
    }  
  }
}

export function* loadUserData(uid) {
  try {
    yield put({ type: USERDATA_REQUEST });
    let { data } = yield call(request.get, `/users/${uid}`);
    yield put({ type: USERDATA_SUCCESS, data });
  } catch(error) {
    yield put({ type: USERDATA_ERROR, error });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">loginSaga</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> { user, pass } = <span class="hljs-keyword">yield</span> take(LOGIN_REQUEST) <span class="hljs-comment">//等待 Store 上指定的 action LOGIN_REQUEST</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">let</span> { data } = <span class="hljs-keyword">yield</span> call(request.post, <span class="hljs-string">'/login'</span>, { user, pass }); <span class="hljs-comment">//阻塞，请求后台数据</span>
      <span class="hljs-keyword">yield</span> fork(loadUserData, data.uid); <span class="hljs-comment">//非阻塞执行loadUserData</span>
      <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: LOGIN_SUCCESS, data }); <span class="hljs-comment">//发起一个action，类似于dispatch</span>
    } <span class="hljs-keyword">catch</span>(error) {
      <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: LOGIN_ERROR, error });
    }  
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">loadUserData</span>(<span class="hljs-params">uid</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: USERDATA_REQUEST });
    <span class="hljs-keyword">let</span> { data } = <span class="hljs-keyword">yield</span> call(request.get, <span class="hljs-string">`/users/<span class="hljs-subst">${uid}</span>`</span>);
    <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: USERDATA_SUCCESS, data });
  } <span class="hljs-keyword">catch</span>(error) {
    <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: USERDATA_ERROR, error });
  }
}</code></pre>
<p>我们使用形式<code>yield call(func，… args)</code>调用api函数。调用不会执行效果，它只是创建一个简单的对象，如<code>{type：’CALL’，func，args}</code>。执行被委托给redux-saga中间件，该中间件负责执行函数并且用其结果恢复generatorr。</p>
<h3 id="articleHeader4">优点</h3>
<p>相比Redux Thunk，使用Redux Saga有几处明显的变化：</p>
<ul>
<li>在组件中，不再<code>dispatch(action creator)</code>，而是<code>dispatch(pure action)</code>
</li>
<li>组件中不再关注由谁来处理当前action，action经由root saga分发</li>
<li>具体业务处理方法中，通过提供的call/put等帮助方法，声明式的进行方法调用</li>
<li>使用<code>ES6 Generator</code>语法，简化异步代码语法</li>
</ul>
<p>除开上述这些不同点，Redux Saga真正的威力，在于其提供了一系列帮助方法，使得对于各类事件可以进行更细粒度的控制，从而完成更加复杂的操作。</p>
<h4>方便测试</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const iterator = loginSaga()

assert.deepEqual(iterator.next().value, take(LOGIN_REQUEST))

// resume the generator with some dummy action
const mockAction = {user: '...', pass: '...'}
assert.deepEqual(
  iterator.next(mockAction).value, 
  call(request.post, '/login', mockAction)
)

// simulate an error result
const mockError = 'invalid user/password'
assert.deepEqual(
  iterator.throw(mockError).value, 
  put({ type: LOGIN_ERROR, error: mockError })
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> iterator = loginSaga()

assert.deepEqual(iterator.next().value, take(LOGIN_REQUEST))

<span class="hljs-comment">// resume the generator with some dummy action</span>
<span class="hljs-keyword">const</span> mockAction = {<span class="hljs-attr">user</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">pass</span>: <span class="hljs-string">'...'</span>}
assert.deepEqual(
  iterator.next(mockAction).value, 
  call(request.post, <span class="hljs-string">'/login'</span>, mockAction)
)

<span class="hljs-comment">// simulate an error result</span>
<span class="hljs-keyword">const</span> mockError = <span class="hljs-string">'invalid user/password'</span>
assert.deepEqual(
  iterator.throw(mockError).value, 
  put({ <span class="hljs-attr">type</span>: LOGIN_ERROR, <span class="hljs-attr">error</span>: mockError })
)</code></pre>
<p>注意，我们通过简单地将模拟数据注入迭代器的下一个方法来检查api调用结果。模拟数据比模拟函数更简单。</p>
<h4>监听过滤action</h4>
<p>通过<code>yield take(ACTION)</code>可以方便自由的对action进行拦截和过滤。Thunks由每个新动作的动作创建者调用(例如LOGIN_REQUEST)。即动作被不断地推送到thunk，并且thunk不能控制何时停止处理那些动作。</p>
<h2 id="articleHeader5">复杂应用场景</h2>
<p>假设例如我们要添加以下要求：</p>
<ul>
<li>处理LOGOUT用户操作</li>
<li>在第一次成功登录时，服务器返回token，该token在expires_in字段中存储的一些后到期。我们必须在每隔expires_in毫秒时间后的重新向后台刷新授权</li>
<li>考虑到在等待api调用的结果(初始登录或刷新)时，用户可以在其间注销</li>
</ul>
<p>你将如何实现这一点与thunk？同时还为整个流程提供全面的测试覆盖？</p>
<p>可是如果你使用redux-saga：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* authorize(credentials) {
  const token = yield call(api.authorize, credentials)
  yield put( login.success(token) )
  return token
}

function* authAndRefreshTokenOnExpiry(name, password) {
  let token = yield call(authorize, {name, password})
  while(true) {
    yield call(delay, token.expires_in)
    token = yield call(authorize, {token})
  }
}

function* watchAuth() {
  while(true) {
    try {
      const {name, password} = yield take(LOGIN_REQUEST)

      yield race([
        take(LOGOUT),
        call(authAndRefreshTokenOnExpiry, name, password)
      ])

      // user logged out, next while iteration will wait for the
      // next LOGIN_REQUEST action

    } catch(error) {
      yield put( login.error(error) )
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">authorize</span>(<span class="hljs-params">credentials</span>) </span>{
  <span class="hljs-keyword">const</span> token = <span class="hljs-keyword">yield</span> call(api.authorize, credentials)
  <span class="hljs-keyword">yield</span> put( login.success(token) )
  <span class="hljs-keyword">return</span> token
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">authAndRefreshTokenOnExpiry</span>(<span class="hljs-params">name, password</span>) </span>{
  <span class="hljs-keyword">let</span> token = <span class="hljs-keyword">yield</span> call(authorize, {name, password})
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">yield</span> call(delay, token.expires_in)
    token = <span class="hljs-keyword">yield</span> call(authorize, {token})
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchAuth</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> {name, password} = <span class="hljs-keyword">yield</span> take(LOGIN_REQUEST)

      <span class="hljs-keyword">yield</span> race([
        take(LOGOUT),
        call(authAndRefreshTokenOnExpiry, name, password)
      ])

      <span class="hljs-comment">// user logged out, next while iteration will wait for the</span>
      <span class="hljs-comment">// next LOGIN_REQUEST action</span>

    } <span class="hljs-keyword">catch</span>(error) {
      <span class="hljs-keyword">yield</span> put( login.error(error) )
    }
  }
}</code></pre>
<p>在上面的例子中，我们使用race表示了并发要求。</p>
<ul>
<li>如果take(LOGOUT)赢得比赛(即用户点击注销按钮)。比赛将自动取消<code>authAndRefreshTokenOnExpiry</code>后台任务。</li>
<li>如果<code>authAndRefreshTokenOnExpiry</code>在调用(授权，{token})调用的中间被阻止，它也将被取消。取消自动向下传播。</li>
</ul>
<h2 id="articleHeader6">其他特殊场景</h2>
<h3 id="articleHeader7">同时执行多个任务</h3>
<p>有时候我们需要在几个ajax请求执行完之后，再执行对应的操作。redux-thunk需要借助第三方的库，而redux-saga是直接实现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call } from 'redux-saga/effects'

// 正确写法, effects 将会同步执行
const [users, repos] = yield [
  call(fetch, '/users'),
  call(fetch, '/repos')
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { call } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>

<span class="hljs-comment">// 正确写法, effects 将会同步执行</span>
<span class="hljs-keyword">const</span> [users, repos] = <span class="hljs-keyword">yield</span> [
  call(fetch, <span class="hljs-string">'/users'</span>),
  call(fetch, <span class="hljs-string">'/repos'</span>)
]</code></pre>
<p>当我们需要 yield 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 Promise.all 的行为）。</p>
<h3 id="articleHeader8">监听action</h3>
<p>在redux-saga中，我们可以使用了辅助函数 takeEvery 在每个 action 来到时派生一个新的任务。 这多少有些模仿 redux-thunk 的行为：举个例子，每次一个组件调用 <code>fetchProducts Action </code>创建器（Action Creator），Action 创建器就会发起一个 thunk 来执行控制流。</p>
<p>在现实情况中，takeEvery 只是一个在强大的低阶 API 之上构建的辅助函数。 在这一节中我们将看到一个新的 Effect，即 take。take 让我们通过全面控制 action 观察进程来构建复杂的控制流成为可能。</p>
<p>让我们开始一个简单的 Saga 例子，这个 Saga 将监听所有发起到 store 的 action，然后将它们记录到控制台。</p>
<p>使用 takeEvery('<em>')（</em> 代表通配符模式），我们就能捕获发起的所有类型的 action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { takeEvery } from 'redux-saga'

function* watchAndLog(getState) {
  yield* takeEvery('*', function* logger(action) {
    console.log('action', action)
    console.log('state after', getState())
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { takeEvery } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchAndLog</span>(<span class="hljs-params">getState</span>) </span>{
  <span class="hljs-keyword">yield</span>* takeEvery(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">logger</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'action'</span>, action)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state after'</span>, getState())
  })
}</code></pre>
<p>现在我们知道如何使用 take Effect 来实现和上面相同的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { take } from 'redux-saga/effects'

function* watchAndLog(getState) {
  while(true) {
    const action = yield take('*')
    console.log('action', action)
    console.log('state after', getState())
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { take } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchAndLog</span>(<span class="hljs-params">getState</span>) </span>{
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> action = <span class="hljs-keyword">yield</span> take(<span class="hljs-string">'*'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'action'</span>, action)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'state after'</span>, getState())
  })
}</code></pre>
<p>take 就像我们更早之前看到的 call 和 put。它创建另一个命令对象，告诉 middleware 等待一个特定的 action。 正如在 call Effect 的情况中，middleware 会暂停 Generator，直到返回的 Promise 被 resolve。 在 take 的情况中，它将会暂停 Generator 直到一个匹配的 action 被发起了。 在以上的例子中，watchAndLog 处于暂停状态，直到任意的一个 action 被发起。</p>
<p>注意，我们运行了一个无限循环的 while(true)。记住这是一个 Generator 函数，它不具备 从运行至完成 的行为<code>（run-to-completion behavior）</code>。 Generator 将在每次迭代上阻塞以等待 action 发起。</p>
<p>一个简单的例子，假设在我们的 Todo 应用中，我们希望监听用户的操作，并在用户初次创建完三条 Todo 信息时显示祝贺信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
  for(let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { take, put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchFirstThreeTodosCreation</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
    <span class="hljs-keyword">const</span> action = <span class="hljs-keyword">yield</span> take(<span class="hljs-string">'TODO_CREATED'</span>)
  }
  <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">'SHOW_CONGRATULATION'</span>})
}</code></pre>
<p>与 while(true) 不同，我们运行一个只迭代三次的 for 循环。在 take 初次的 3 个 TODO_CREATED action 之后， <code>watchFirstThreeTodosCreation Saga</code> 将会使应用显示一条祝贺信息然后中止。这意味着 Generator 会被回收并且相应的监听不会再发生。</p>
<h3 id="articleHeader9">任务取消</h3>
<p>一旦任务被 fork，可以使用 <code>yield cancel(task)</code> 来中止任务执行。取消正在运行的任务，将抛出 <code>SagaCancellationException</code> 错误。</p>
<h3 id="articleHeader10">防抖动</h3>
<p>为了对 action 队列进行防抖动，可以在被 fork 的任务里放置一个 delay。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleInput(input) {
  // 500ms 防抖动
  yield call(delay, 500)
  ...
}

function* watchInput() {
  let task
  while(true) {
    const { input } = yield take('INPUT_CHANGED')
    if(task)
      yield cancel(task)
    task = yield fork(handleInput, input)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> delay = <span class="hljs-function">(<span class="hljs-params">ms</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, ms))

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">handleInput</span>(<span class="hljs-params">input</span>) </span>{
  <span class="hljs-comment">// 500ms 防抖动</span>
  <span class="hljs-keyword">yield</span> call(delay, <span class="hljs-number">500</span>)
  ...
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchInput</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> task
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> { input } = <span class="hljs-keyword">yield</span> take(<span class="hljs-string">'INPUT_CHANGED'</span>)
    <span class="hljs-keyword">if</span>(task)
      <span class="hljs-keyword">yield</span> cancel(task)
    task = <span class="hljs-keyword">yield</span> fork(handleInput, input)
  }
}</code></pre>
<p>在上面的示例中，handleInput 在执行之前等待了 500ms。如果用户在此期间输入了更多文字，我们将收到更多的 <code>INPUT_CHANGED action</code>。 并且由于 handleInput 仍然会被 delay 阻塞，所以在执行自己的逻辑之前它会被 watchInput 取消。</p>
<h2 id="articleHeader11">常用</h2>
<h3 id="articleHeader12">Effect</h3>
<p>一个 effect 就是一个纯文本 JavaScript 对象，包含一些将被 saga middleware 执行的指令。</p>
<p>使用 redux-saga 提供的工厂函数来创建 effect。 举个例子，你可以使用 <code>call(myfunc, 'arg1', 'arg2') </code>指示 middleware 调用 <code>myfunc('arg1', 'arg2')</code> 并将结果返回给 yield 了 effect 的那个 Generator。</p>
<p>从 Saga 内触发异步操作（Side Effect）总是由 yield 一些声明式的 Effect 来完成的 （你也可以直接 yield Promise，但是这会让测试变得困难。使用 Effect 诸如 call 和 put，与高阶 API 如 takeEvery 相结合，让我们实现与 redux-thunk 同样的东西， 但又有额外的易于测试的好处。</p>
<h3 id="articleHeader13">task</h3>
<p>一个 task 就像是一个在后台运行的进程。在基于 redux-saga 的应用程序中，可以同时运行多个 task。通过 fork 函数来创建 task：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* saga() {
  ...
  const task = yield fork(otherSaga, ...args)
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">saga</span>(<span class="hljs-params"></span>) </span>{
  ...
  const task = <span class="hljs-keyword">yield</span> fork(otherSaga, ...args)
  ...
}</code></pre>
<h3 id="articleHeader14">Watcher/Worker</h3>
<p>指的是一种使用两个单独的 Saga 来组织控制流的方式。</p>
<p>Watcher: 监听发起的 action 并在每次接收到 action 时 fork 一个 worker。</p>
<p>Worker: 处理 action 并结束它。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* watcher() {
  while(true) {
    const action = yield take(ACTION)
    yield fork(worker, action.payload)
  }
}

function* worker(payload) {
  // ... do some stuff
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watcher</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> action = <span class="hljs-keyword">yield</span> take(ACTION)
    <span class="hljs-keyword">yield</span> fork(worker, action.payload)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">worker</span>(<span class="hljs-params">payload</span>) </span>{
  <span class="hljs-comment">// ... do some stuff</span>
}</code></pre>
<h3 id="articleHeader15">take(pattern)</h3>
<p>创建一条 Effect 描述信息，指示 middleware 等待 Store 上指定的 action。 Generator 会暂停，直到一个与 pattern 匹配的 action 被发起。</p>
<p>用以下规则来解释 pattern：</p>
<ul>
<li>如果调用 take 时参数为空，或者传入 '*'，那将会匹配所有发起的 action（例如，take() 会匹配所有的 action）。</li>
<li>如果是一个函数，action 会在 pattern(action) 返回为 true 时被匹配（例如，<code>take(action =&gt; action.entities</code>) 会匹配那些 entities 字段为真的 action）。</li>
<li>如果是一个字符串，action 会在 <code>action.type === pattern </code>时被匹配（例如，take(INCREMENT_ASYNC)）。</li>
<li>如果参数是一个数组，会针对数组所有项，匹配与 action.type 相等的 action（例如，<code>take([INCREMENT, DECREMENT])</code> 会匹配 INCREMENT 或 DECREMENT 类型的 action）。</li>
</ul>
<h3 id="articleHeader16">put(action)</h3>
<p>用于触发 action，功能上类似于dispatch。</p>
<p>创建一条<code>dispatch Effect</code> 描述信息，指示 middleware 发起一个 action 到 Store。</p>
<ul><li>action: Object - 完整信息可查看 <a href="http://redux.js.org/docs/api/Store.html#dispatch" rel="nofollow noreferrer" target="_blank">Redux 的 dispatch 文档</a>
</li></ul>
<p>直接使用dispatch：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//...

function* fetchProducts(dispatch)
  const products = yield call(Api.fetch, '/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchProducts</span>(<span class="hljs-params">dispatch</span>)
  <span class="hljs-title">const</span> <span class="hljs-title">products</span> = <span class="hljs-title">yield</span> <span class="hljs-title">call</span>(<span class="hljs-params">Api.fetch, <span class="hljs-string">'/products'</span></span>)
  <span class="hljs-title">dispatch</span>(<span class="hljs-params">{ type: <span class="hljs-string">'PRODUCTS_RECEIVED'</span>, products }</span>)
}</span></code></pre>
<p>该解决方案与我们在上一节中看到的从 Generator 内部直接调用函数，有着相同的缺点。如果我们想要测试 fetchProducts 接收到 AJAX 响应之后执行 dispatch， 我们还需要模拟 dispatch 函数。</p>
<p>相反，我们需要同样的声明式的解决方案。只需创建一个对象来指示 middleware 我们需要发起一些 action，然后让 middleware 执行真实的 dispatch。 这种方式我们就可以同样的方式测试 Generator 的 dispatch：只需检查 yield 后的 Effect，并确保它包含正确的指令。</p>
<p>redux-saga 为此提供了另外一个函数 put，这个函数用于创建 <code>dispatch Effect</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call, put } from 'redux-saga/effects'
//...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // 创建并 yield 一个 dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { call, put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>
<span class="hljs-comment">//...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchProducts</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">yield</span> call(Api.fetch, <span class="hljs-string">'/products'</span>)
  <span class="hljs-comment">// 创建并 yield 一个 dispatch Effect</span>
  <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'PRODUCTS_RECEIVED'</span>, products })
}</code></pre>
<p>现在，我们可以像上一节那样轻易地测试 Generator：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call, put } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// 期望一个 call 指令
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  &quot;fetchProducts should yield an Effect call(Api.fetch, './products')&quot;
)

// 创建一个假的响应对象
const products = {}

// 期望一个 dispatch 指令
assert.deepEqual(
  iterator.next(products).value,
  put({ type: 'PRODUCTS_RECEIVED', products }),
  &quot;fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })&quot;
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { call, put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>
<span class="hljs-keyword">import</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">'...'</span>

<span class="hljs-keyword">const</span> iterator = fetchProducts()

<span class="hljs-comment">// 期望一个 call 指令</span>
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, <span class="hljs-string">'/products'</span>),
  <span class="hljs-string">"fetchProducts should yield an Effect call(Api.fetch, './products')"</span>
)

<span class="hljs-comment">// 创建一个假的响应对象</span>
<span class="hljs-keyword">const</span> products = {}

<span class="hljs-comment">// 期望一个 dispatch 指令</span>
assert.deepEqual(
  iterator.next(products).value,
  put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'PRODUCTS_RECEIVED'</span>, products }),
  <span class="hljs-string">"fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })"</span>
)</code></pre>
<h3 id="articleHeader17">call(fn, ...args)</h3>
<p>用于调用异步逻辑，支持 promise 。</p>
<p>创建一条 Effect 描述信息，指示 middleware 调用 fn 函数并以 args 为参数。fn 既可以是一个普通函数，也可以是一个 Generator 函数。</p>
<p>middleware 调用这个函数并检查它的结果。</p>
<p>如果结果是一个 Generator 对象，middleware 会执行它，就像在启动 <code>Generator （startup Generators</code>，启动时被传给 middleware）时做的。 如果有子级 Generator，那么在子级 Generator 正常结束前，父级 Generator 会暂停，这种情况下，父级 Generator 将会在子级 Generator 返回后继续执行，或者直到子级 Generator 被某些错误中止， 如果是这种情况，将在父级 Generator 中抛出一个错误。</p>
<p>如果结果是一个 Promise，middleware 会暂停直到这个 Promise 被 resolve，resolve 后 Generator 会继续执行。 或者直到 Promise 被 reject 了，如果是这种情况，将在 Generator 中抛出一个错误。<br>当 Generator 中抛出了一个错误，如果有一个 try/catch 包裹当前的 yield 指令，控制权将被转交给 catch。 否则，Generator 会被错误中止，并且如果这个 Generator 被其他 Generator 调用了，错误将会传到调用的 Generator。</p>
<p>yield fork(fn ...args) 的结果是一个 Task 对象 —— 一个具备某些有用的方法和属性的对象</p>
<h3 id="articleHeader18">fork(fn, ...args)</h3>
<p>创建一条 Effect 描述信息，指示 middleware 以 无阻塞调用 方式执行 fn。</p>
<p>fork 类似于 call，可以用来调用普通函数和 Generator 函数。但 fork 的调用是无阻塞的，在等待 fn 返回结果时，middleware 不会暂停 Generator。 相反，一旦 fn 被调用，Generator 立即恢复执行。<br>fork 与 race 类似，是一个中心化的 Effect，管理 Sagas 间的并发。</p>
<h3 id="articleHeader19">race(effects)</h3>
<p>创建一条 Effect 描述信息，指示 middleware 在多个 Effect 之间执行一个 race（类似 Promise.race([...]) 的行为）。</p>
<h2 id="articleHeader20">api</h2>
<p>redux-saga的其他详细API列举如下，API详解可以查看<a href="http://leonshi.com/redux-saga-in-chinese/docs/api/index.html#forkfn-args" rel="nofollow noreferrer" target="_blank">API 参考</a></p>
<ul>
<li>
<p>Middleware API</p>
<ul>
<li>createSagaMiddleware(...sagas)</li>
<li>middleware.run(saga, ...args)</li>
</ul>
</li>
<li>
<p>Saga Helpers</p>
<ul>
<li>takeEvery(pattern, saga, ...args)</li>
<li>takeLatest(pattern, saga, ..args)</li>
</ul>
</li>
<li>
<p>Effect creators</p>
<ul>
<li>take(pattern)</li>
<li>put(action)</li>
<li>call(fn, ...args)</li>
<li>call([context, fn], ...args)</li>
<li>apply(context, fn, args)</li>
<li>cps(fn, ...args)</li>
<li>cps([context, fn], ...args)</li>
<li>fork(fn, ...args)</li>
<li>fork([context, fn], ...args)</li>
<li>join(task)</li>
<li>cancel(task)</li>
<li>select(selector, ...args)</li>
</ul>
</li>
<li>
<p>Effect combinators</p>
<ul>
<li>race(effects)</li>
<li>[...effects] (aka parallel effects)</li>
</ul>
</li>
<li>
<p>Interfaces</p>
<ul><li>Task</li></ul>
</li>
<li>
<p>External API</p>
<ul><li>runSaga(iterator, {subscribe, dispatch, getState}, [monitor])</li></ul>
</li>
</ul>
<h2 id="articleHeader21">参考</h2>
<ul>
<li><a href="http://leonshi.com/redux-saga-in-chinese/docs/introduction/BeginnerTutorial.html" rel="nofollow noreferrer" target="_blank">初级教程</a></li>
<li><a href="http://www.10tiao.com/html/184/201704/2247485137/1.html" rel="nofollow noreferrer" target="_blank">探索Redux的最佳实践</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/23012870" rel="nofollow noreferrer" target="_blank">redux-saga 实践总结</a></li>
<li><a href="http://yanqiw.github.io/react/2017/03/05/redux-saga.html" rel="nofollow noreferrer" target="_blank">Redux Saga实践</a></li>
<li><a href="http://codeday.me/bug/20170417/9310.html" rel="nofollow noreferrer" target="_blank">redux-saga vs redux-thunk的优点/缺点</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/22405838" rel="nofollow noreferrer" target="_blank">Redux的全家桶与最佳实践</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从redux-thunk到redux-saga实践

## 原文链接
[https://segmentfault.com/a/1190000009928167](https://segmentfault.com/a/1190000009928167)

