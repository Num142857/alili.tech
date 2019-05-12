---
title: 'Redux 莞式教程 之 简明篇' 
date: 2019-02-05 2:30:09
hidden: true
slug: gothdirviz6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Redux 简明教程</h1>
<blockquote>
<p>原文链接（保持更新）：<a href="https://github.com/kenberkeley/redux-simple-tutorial" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/kenberkeley/redux-simple-tutorial" rel="nofollow noreferrer" target="_blank">https://github.com/kenberkele...</a></p>
<h3 id="articleHeader1">写在前面</h3>
<p>本教程深入浅出，配套 简明教程、<a href="https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md" rel="nofollow noreferrer" target="_blank">进阶教程</a>（源码精读）以及文档注释丰满的 <a href="https://github.com/kenberkeley/react-demo" rel="nofollow noreferrer" target="_blank">Demo</a> 等一条龙服务</p>
</blockquote>
<h2 id="articleHeader2">§ 为什么要用 Redux</h2>
<blockquote><p>当然还有 <a href="https://github.com/facebook/flux" rel="nofollow noreferrer" target="_blank">Flux</a>、<a href="https://github.com/reflux/refluxjs" rel="nofollow noreferrer" target="_blank">Reflux</a>、<a href="https://github.com/mobxjs/mobx" rel="nofollow noreferrer" target="_blank">Mobx</a> 等状态管理库可供选择</p></blockquote>
<p>抛开需求讲实用性都是耍流氓，因此下面由我扮演您那可亲可爱的产品经理</p>
<h3 id="articleHeader3">⊙ 需求 1：在控制台上记录用户的每个动作</h3>
<p>不知道您是否有后端的开发经验，后端一般会有记录访问日志的<strong>中间件</strong>  <br>例如，在 Express 中实现一个简单的 Logger 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loggerMiddleware = function(req, res, next) {
  console.log('[Logger]', req.method, req.originalUrl)
  next()
}
...
app.use(loggerMiddleware)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> loggerMiddleware = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger]'</span>, req.method, req.originalUrl)
  next()
}
...
app.use(loggerMiddleware)</code></pre>
<p>每次访问的时候，都会在控制台中留下类似下面的日志便于追踪调试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Logger] GET  /
[Logger] POST /login
[Logger] GET  /user?uid=10086
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>[<span class="hljs-symbol">Logger</span>] <span class="hljs-symbol">GET</span>  /
[<span class="hljs-symbol">Logger</span>] <span class="hljs-symbol">POST</span> /login
[<span class="hljs-symbol">Logger</span>] <span class="hljs-symbol">GET</span>  /user?uid=<span class="hljs-number">10086</span>
...</code></pre>
<p>如果我们把场景转移到前端，请问该如何实现用户的动作跟踪记录？  <br>我们可能会这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** jQuery **/
$('#loginBtn').on('click', function(e) {
  console.log('[Logger] 用户登录')
  ...
})
$('#logoutBtn').on('click', function() {
  console.log('[Logger] 用户退出登录')
  ...
})

/** MVC / MVVM 框架（这里以纯 Vue 举例） **/
methods: {
  handleLogin () {
    console.log('[Logger] 用户登录')
    ...
  },
  handleLogout () {
    console.log('[Logger] 用户退出登录')
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** jQuery **/</span>
$(<span class="hljs-string">'#loginBtn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户登录'</span>)
  ...
})
$(<span class="hljs-string">'#logoutBtn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户退出登录'</span>)
  ...
})

<span class="hljs-comment">/** MVC / MVVM 框架（这里以纯 Vue 举例） **/</span>
methods: {
  handleLogin () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户登录'</span>)
    ...
  },
  handleLogout () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户退出登录'</span>)
    ...
  }
}</code></pre>
<p>上述 jQuery 与 MV* 的写法并没有本质上的区别  <br>记录用户行为代码的侵入性极强，可维护性与扩展性堪忧</p>
<h3 id="articleHeader4">⊙ 需求 2：在上述需求的基础上，记录用户的操作时间</h3>
<blockquote><p>哼！最讨厌就是改需求了，这种简单的需求难道不是应该一开始就想好的吗？  <br>呵呵，如果每位产品经理都能一开始就把需求完善好，我们就不用加班了好伐</p></blockquote>
<p>显然地，前端的童鞋又得一个一个去改（当然 编辑器 / IDE 都支持全局替换）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** jQuery **/
$('#loginBtn').on('click', function(e) {
  console.log('[Logger] 用户登录', new Date())
  ...
})
$('#logoutBtn').on('click', function() {
  console.log('[Logger] 用户退出登录', new Date())
  ...
})

/** MVC / MVVM 框架（这里以 Vue 举例） **/
methods: {
  handleLogin () {
    console.log('[Logger] 用户登录', new Date())
    ...
  },
  handleLogout () {
    console.log('[Logger] 用户退出登录', new Date())
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** jQuery **/</span>
$(<span class="hljs-string">'#loginBtn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户登录'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())
  ...
})
$(<span class="hljs-string">'#logoutBtn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户退出登录'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())
  ...
})

<span class="hljs-comment">/** MVC / MVVM 框架（这里以 Vue 举例） **/</span>
methods: {
  handleLogin () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户登录'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())
    ...
  },
  handleLogout () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger] 用户退出登录'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())
    ...
  }
}</code></pre>
<p>而后端的童鞋只需要稍微修改一下原来的中间件即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loggerMiddleware = function(req, res, next) {
  console.log('[Logger]', new Date(), req.method, req.originalUrl)
  next()
}
...
app.use(loggerMiddleware)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> loggerMiddleware = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Logger]'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), req.method, req.originalUrl)
  next()
}
...
app.use(loggerMiddleware)</code></pre>
<h3 id="articleHeader5">⊙ 需求 3：正式上线的时候，把控制台中有关 Logger 的输出全部去掉</h3>
<p>难道您以为有了 UglifyJS，配置一个 <code>drop_console: true</code> 就好了吗？图样图森破，拿衣服！  <br>请看清楚了，仅仅是去掉有关 Logger 的 <code>console.log</code>，其他的要保留哦亲~~~  <br>于是前端的童鞋又不得不乖乖地一个一个注释掉（当然也可以设置一个环境变量判断是否输出，甚至可以重写 <code>console.log</code>）</p>
<p>而我们后端的童鞋呢？只需要注释掉一行代码即可：<code>// app.use(loggerMiddleware)</code>，真可谓是不费吹灰之力</p>
<h3 id="articleHeader6">⊙ 需求 4：正式上线后，自动收集 bug，并还原出当时的场景</h3>
<p>收集用户报错还是比较简单的，<a href="http://stackoverflow.com/questions/5328154/#5328206" rel="nofollow noreferrer" target="_blank">利用 <code>window.error</code> 事件</a>，然后根据 Source Map 定位到源码（但一般查不出什么）</p>
<p>但要完全还原出当时的使用场景，几乎是不可能的。因为您不知道这个报错，用户是怎么一步一步操作得来的  <br>就算知道用户是如何操作得来的，但在您的电脑上，测试永远都是通过的（不是我写的程序有问题，是用户用的方式有问题）</p>
<p>相对地，后端的报错的收集、定位以及还原却是相当简单。只要一个 API 有 bug，那无论用什么设备访问，都会得到这个 bug  <br>还原 bug 也是相当简单：把数据库备份导入到另一台机器，部署同样的运行环境与代码。如无意外，bug 肯定可以完美重现</p>
<blockquote>
<p>在这个问题上拿后端跟前端对比，确实有失公允。但为了鼓吹 Redux 的优越，只能勉为其难了  </p>
<p>实际上 jQuery / MV* 中也能实现用户动作的跟踪，用一个数组往里面 <code>push</code> 用户动作即可  <br>但这样操作的意义不大，因为仅仅只有动作，无法反映动作前后，应用状态的变动情况</p>
</blockquote>
<h3 id="articleHeader7">※ 小结</h3>
<p>为何前后端对于这类需求的处理竟然大相径庭？后端为何可以如此优雅？  <br>原因在于，后端具有<strong>统一的入口</strong>与<strong>统一的状态管理（数据库）</strong>，因此可以引入<strong>中间件机制</strong>来<strong>统一</strong>实现某些功能  </p>
<p>多年来，前端工程师忍辱负重，操着卖白粉的心，赚着买白菜的钱，一直处于程序员鄙视链的底层  <br>于是有大牛就把后端 MVC 的开发思维搬到前端，<strong>将应用中所有的动作与状态都统一管理</strong>，让一切<strong>有据可循</strong></p>
<p>使用 Redux，借助 <a href="https://github.com/gaearon/redux-devtools" rel="nofollow noreferrer" target="_blank">Redux DevTools</a> 可以实现出“华丽如时光旅行一般的调试效果”  <br>实际上就是开发调试过程中可以<strong>撤销与重做</strong>，并且支持应用状态的导入和导出（就像是数据库的备份）  <br>而且，由于可以使用日志完整记录下每个动作，因此做到像 Git 般，随时随地恢复到之前的状态</p>
<blockquote><p>由于可以导出和导入应用的状态（包括路由状态），因此还可以实现前后端同构（服务端渲染）  <br>当然，既然有了动作日志以及动作前后的状态备份，那么还原用户报错场景还会是一个难题吗？</p></blockquote>
<h2 id="articleHeader8">§ Store</h2>
<p>首先要区分 <code>store</code> 和 <code>state</code></p>
<p><code>state</code> 是应用的状态，一般本质上是一个普通<strong>对象</strong>  <br>例如，我们有一个 Web APP，包含 计数器 和 待办事项 两大功能  <br>那么我们可以为该应用设计出对应的存储数据结构（应用初始状态）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 应用初始 state，本代码块记为 code-1 **/
{
  counter: 0,
  todos: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 应用初始 state，本代码块记为 code-1 **/</span>
{
  <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">todos</span>: []
}</code></pre>
<p><code>store</code> 是应用状态 <code>state</code> 的管理者，包含下列四个函数：</p>
<ul>
<li><p><code>getState()                  # 获取整个 state</code></p></li>
<li><p><code>dispatch(action)            # ※ 触发 state 改变的【唯一途径】※</code></p></li>
<li><p><code>subscribe(listener)         # 您可以理解成是 DOM 中的 addEventListener</code></p></li>
<li><p><code>replaceReducer(nextReducer) # 一般在 Webpack Code-Splitting 按需加载的时候用</code></p></li>
</ul>
<p>二者的关系是：<code>state = store.getState()</code></p>
<p>Redux 规定，一个应用只应有一个单一的 <code>store</code>，其管理着唯一的应用状态 <code>state</code>  <br>Redux 还规定，不能直接修改应用的状态 <code>state</code>，也就是说，下面的行为是不允许的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var state = store.getState()
state.counter = state.counter + 1 // 禁止在业务逻辑中直接修改 state" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> state = store.getState()
state.counter = state.counter + <span class="hljs-number">1</span> <span class="hljs-comment">// 禁止在业务逻辑中直接修改 state</span></code></pre>
<p><strong>若要改变 <code>state</code>，必须 <code>dispatch</code> 一个 <code>action</code>，这是修改应用状态的不二法门</strong></p>
<blockquote><p>现在您只需要记住 <code>action</code> 只是一个包含 <strong><code>type</code></strong> 属性的普通<strong>对象</strong>即可  <br>例如 <code>{ type: 'INCREMENT' }</code></p></blockquote>
<p>上面提到，<code>state</code> 是通过 <code>store.getState()</code> 获取，那么 <code>store</code> 又是怎么来的呢？  <br>想生成一个 <code>store</code>，我们需要调用 Redux 的 <code>createStore</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux'
...
const store = createStore(reducer, initialState) // store 是靠传入 reducer 生成的哦！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
...
const store = createStore(reducer, initialState) <span class="hljs-comment">// store 是靠传入 reducer 生成的哦！</span></code></pre>
<blockquote><p>现在您只需要记住 <code>reducer</code> 是一个 <strong>函数</strong>，负责<strong>更新</strong>并返回一个<strong>新的</strong> <code>state</code>  <br>而 <code>initialState</code> 主要用于前后端同构的数据同步（详情请关注 React 服务端渲染）</p></blockquote>
<h2 id="articleHeader9">§ Action</h2>
<p>上面提到，<code>action</code>（动作）实质上是包含 <code>type</code> 属性的普通对象，这个 <code>type</code> 是我们实现用户行为追踪的关键  <br>例如，增加一个待办事项 的 <code>action</code> 可能是像下面一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-2 **/
{
  type: 'ADD_TODO',
  payload: {
    id: 1,
    content: '待办事项1',
    completed: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-2 **/</span>
{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
  <span class="hljs-attr">payload</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项1'</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p>当然，<code>action</code> 的形式是多种多样的，唯一的约束仅仅就是包含一个 <code>type</code> 属性罢了  <br>也就是说，下面这些 <code>action</code> 都是合法的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 如下都是合法的，但就是不够规范 **/
{
  type: 'ADD_TODO',
  id: 1,
  content: '待办事项1',
  completed: false
}

{
  type: 'ADD_TODO',
  abcdefg: {
    id: 1,
    content: '待办事项1',
    completed: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 如下都是合法的，但就是不够规范 **/</span>
{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项1'</span>,
  <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
}

{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
  <span class="hljs-attr">abcdefg</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项1'</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
<blockquote><p>虽说没有约束，但最好还是遵循<a href="https://github.com/acdlite/flux-standard-action" rel="nofollow noreferrer" target="_blank">规范</a></p></blockquote>
<p>如果需要新增一个代办事项，实际上就是将 <code>code-2</code> 中的 <code>payload</code> <strong>“写入”</strong> 到 <code>state.todos</code> 数组中（如何“写入”？在此留个悬念）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-3 **/
{
  counter: 0,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-3 **/</span>
{
  <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">todos</span>: [{
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项1'</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
  }]
}</code></pre>
<p>刨根问底，<code>action</code> 是谁生成的呢？</p>
<h3 id="articleHeader10">⊙ Action Creator</h3>
<blockquote><p>Action Creator 可以是同步的，也可以是异步的</p></blockquote>
<p>顾名思义，Action Creator 是 <code>action</code> 的创造者，本质上就是一个<strong>函数</strong>，返回值是一个 <code>action</code>（<strong>对象</strong>）  <br>例如下面就是一个 “新增一个待办事项” 的 Action Creator：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-4 **/
var id = 1
function addTodo(content) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: id++,
      content: content, // 待办事项内容
      completed: false  // 是否完成的标识
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-4 **/</span>
<span class="hljs-keyword">var</span> id = <span class="hljs-number">1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">content</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
    <span class="hljs-attr">payload</span>: {
      <span class="hljs-attr">id</span>: id++,
      <span class="hljs-attr">content</span>: content, <span class="hljs-comment">// 待办事项内容</span>
      completed: <span class="hljs-literal">false</span>  <span class="hljs-comment">// 是否完成的标识</span>
    }
  }
}</code></pre>
<p>将该函数应用到一个表单（假设 <code>store</code> 为全局变量，并引入了 jQuery ）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<--! 本代码块记为 code-5 -->
<input type=&quot;text&quot; id=&quot;todoInput&quot; />
<button id=&quot;btn&quot;>提交</button>

<script>
$('#btn').on('click', function() {
  var content = $('#todoInput').val() // 获取输入框的值
  var action = addTodo(content) // 执行 Action Creator 获得 action
  store.dispatch(action) // 改变 state 的不二法门：dispatch 一个 action！！！
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">--!</span> 本代码块记为 <span class="hljs-attr">code-5</span> <span class="hljs-attr">--</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"todoInput"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-string">'#btn'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> content = $(<span class="hljs-string">'#todoInput'</span>).val() <span class="hljs-comment">// 获取输入框的值</span>
  <span class="hljs-keyword">var</span> action = addTodo(content) <span class="hljs-comment">// 执行 Action Creator 获得 action</span>
  store.dispatch(action) <span class="hljs-comment">// 改变 state 的不二法门：dispatch 一个 action！！！</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在输入框中输入 “待办事项2” 后，点击一下提交按钮，我们的 <code>state</code> 就变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-6 **/
{
  counter: 0,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }, {
    id: 2,
    content: '待办事项2',
    completed: false
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/** 本代码块记为 code-6 **/</span>
{
  <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">todos</span>: [{
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项1'</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
  }, {
    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">'待办事项2'</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>
  }]
}</code></pre>
<blockquote><p>通俗点讲，Action Creator 用于绑定到用户的操作（点击按钮等），其返回值 <code>action</code> 用于之后的 <code>dispatch(action)</code></p></blockquote>
<p>刚刚提到过，<code>action</code> 明明就没有强制的规范，为什么 <code>store.dispatch(action)</code> 之后，  <br>Redux 会明确知道是提取 <code>action.payload</code>，并且是对应写入到 <code>state.todos</code> 数组中？  <br>又是谁负责“写入”的呢？悬念即将揭晓...</p>
<h2 id="articleHeader11">§ Reducer</h2>
<blockquote><p>Reducer 必须是同步的纯函数</p></blockquote>
<p>用户每次 <code>dispatch(action)</code> 后，都会触发 <code>reducer</code>  的执行  <br><code>reducer</code> 的实质是一个<strong>函数</strong>，根据 <code>action.type</code> 来<strong>更新</strong> <code>state</code> 并返回 <code>nextState</code>  <br>最后会用 <code>reducer</code> 的返回值 <code>nextState</code> <strong>完全替换掉</strong>原来的 <code>state</code></p>
<blockquote><p>注意：上面的这个 “更新” 并不是指 <code>reducer</code> 可以直接对 <code>state</code> 进行修改  <br>Redux 规定，须先复制一份 <code>state</code>，在副本 <code>nextState</code> 上进行修改操作  <br>例如，可以使用 lodash 的 <code>deepClone</code>，也可以使用 <code>Object.assign / map / filter/ ...</code> 等返回副本的函数</p></blockquote>
<p>在上面 Action Creator 中提到的 待办事项的 <code>reducer</code> 大概是长这个样子 (为了容易理解，在此不使用 ES6 / <a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">Immutable.js</a>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 本代码块记为 code-7 **/
var initState = {
  counter: 0,
  todos: []
}

function reducer(state, action) {
  // ※ 应用的初始状态是在第一次执行 reducer 时设置的（除非是服务端渲染） ※
  if (!state) state = initState
  
  switch (action.type) {
    case 'ADD_TODO':
      var nextState = _.deepClone(state) // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload) 
      return nextState

    default:
    // 由于 nextState 会把原 state 整个替换掉
    // 若无修改，必须返回原 state（否则就是 undefined）
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
  <span class="hljs-comment">// ※ 应用的初始状态是在第一次执行 reducer 时设置的（除非是服务端渲染） ※</span>
  <span class="hljs-keyword">if</span> (!state) state = initState
  
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
      <span class="hljs-keyword">var</span> nextState = _.deepClone(state) <span class="hljs-comment">// 用到了 lodash 的深克隆</span>
      nextState.todos.push(action.payload) 
      <span class="hljs-keyword">return</span> nextState

    <span class="hljs-keyword">default</span>:
    <span class="hljs-comment">// 由于 nextState 会把原 state 整个替换掉</span>
    <span class="hljs-comment">// 若无修改，必须返回原 state（否则就是 undefined）</span>
      <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<blockquote><p>通俗点讲，就是 <code>reducer</code> 返回啥，<code>state</code> 就被替换成啥</p></blockquote>
<h2 id="articleHeader12">§ 总结</h2>
<ul>
<li><p><code>store</code> 由 Redux 的 <code>createStore(reducer)</code> 生成</p></li>
<li><p><code>state</code> 通过 <code>store.getState()</code> 获取，本质上一般是一个存储着整个应用状态的<strong>对象</strong></p></li>
<li><p><code>action</code> 本质上是一个包含 <code>type</code> 属性的普通<strong>对象</strong>，由 Action Creator (<strong>函数</strong>) 产生</p></li>
<li><p>改变 <code>state</code> 必须 <code>dispatch</code> 一个 <code>action</code></p></li>
<li><p><code>reducer</code> 本质上是根据 <code>action.type</code> 来更新 <code>state</code> 并返回 <code>nextState</code> 的<strong>函数</strong></p></li>
<li><p><code>reducer</code> 必须返回值，否则 <code>nextState</code> 即为 <code>undefined</code></p></li>
<li><p>实际上，<strong><code>state</code> 就是所有 <code>reducer</code> 返回值的汇总</strong>（本教程只有一个 <code>reducer</code>，主要是应用场景比较简单）</p></li>
</ul>
<blockquote><p>Action Creator =&gt; <code>action</code> =&gt; <code>store.dispatch(action)</code> =&gt; <code>reducer(state, action)</code> =&gt; <del><code>原 state</code></del> <code>state = nextState</code></p></blockquote>
<h3 id="articleHeader13">⊙ Redux 与传统后端 MVC 的对照</h3>
<table>
<thead><tr>
<th>Redux</th>
<th>传统后端 MVC</th>
</tr></thead>
<tbody>
<tr>
<td><code>store</code></td>
<td>数据库实例</td>
</tr>
<tr>
<td><code>state</code></td>
<td>数据库中存储的数据</td>
</tr>
<tr>
<td><code>dispatch(action)</code></td>
<td>用户发起请求</td>
</tr>
<tr>
<td><code>action: { type, payload }</code></td>
<td>
<code>type</code> 表示请求的 URL，<code>payload</code> 表示请求的数据</td>
</tr>
<tr>
<td><code>reducer</code></td>
<td>路由 + 控制器（handler）</td>
</tr>
<tr>
<td>
<code>reducer</code> 中的 <code>switch-case</code> 分支</td>
<td>路由，根据 <code>action.type</code> 路由到对应的控制器</td>
</tr>
<tr>
<td>
<code>reducer</code> 内部对 <code>state</code> 的处理</td>
<td>控制器对数据库进行增删改操作</td>
</tr>
<tr>
<td>
<code>reducer</code> 返回 <code>nextState</code>
</td>
<td>将修改后的记录写回数据库</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader14">§ 最简单的例子 ( <a href="http://jsbin.com/zivare/edit?html,console" rel="nofollow noreferrer" target="_blank">在线演示</a> )</h2>
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
  // 首次调用本函数时设置初始 state
  state = state || { counter: 0 };

  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state; // 无论如何都返回一个 state
  }
}

var store = Redux.createStore(reducer);

console.log( store.getState() ); // { counter: 0 }

store.dispatch(inc());
console.log( store.getState() ); // { counter: 1 }

store.dispatch(inc());
console.log( store.getState() ); // { counter: 2 }

store.dispatch(dec());
console.log( store.getState() ); // { counter: 1 }
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
  <span class="hljs-comment">// 首次调用本函数时设置初始 state</span>
  state = state || { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> };

  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INCREMENT'</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter + <span class="hljs-number">1</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">'DECREMENT'</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: state.counter - <span class="hljs-number">1</span> };
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state; <span class="hljs-comment">// 无论如何都返回一个 state</span>
  }
}

<span class="hljs-keyword">var</span> store = Redux.createStore(reducer);

<span class="hljs-built_in">console</span>.log( store.getState() ); <span class="hljs-comment">// { counter: 0 }</span>

store.dispatch(inc());
<span class="hljs-built_in">console</span>.log( store.getState() ); <span class="hljs-comment">// { counter: 1 }</span>

store.dispatch(inc());
<span class="hljs-built_in">console</span>.log( store.getState() ); <span class="hljs-comment">// { counter: 2 }</span>

store.dispatch(dec());
<span class="hljs-built_in">console</span>.log( store.getState() ); <span class="hljs-comment">// { counter: 1 }</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<blockquote><p>由上可知，Redux 并不一定要搭配 React 使用。Redux 纯粹只是一个状态管理库，几乎可以搭配任何框架使用  <br>（上述例子连 jQuery 都没用哦亲）</p></blockquote>
<h2 id="articleHeader15"><a href="https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md" rel="nofollow noreferrer" target="_blank">§ 下一章：Redux 进阶教程</a></h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 莞式教程 之 简明篇

## 原文链接
[https://segmentfault.com/a/1190000006701765](https://segmentfault.com/a/1190000006701765)

