---
title: 'Vuex之理解Actions' 
date: 2019-01-16 2:30:08
hidden: true
slug: gxiw8xlnvsm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">理解<code>Actions</code>
</h2>
<blockquote><p>1.什么是<code>actions</code>？</p></blockquote>
<ul>
<li><p><strong>背景：</strong>在<code>mutation</code>中我们讲到，<code>mutation</code>中是存放处理数据的方法的集合，我们使用的时候需要<code>commit</code>。但是<code>commit</code>是同步函数，而且只能是同步执行。那我们想一步操作怎么办？</p></li>
<li><p><strong>作用：</strong>在<code>actions</code>中提交<code>mutation</code>，并且可以包含任何的异步操作。<code>actions</code>可以理解为通过将<code>mutations</code>里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据（但是还是通过<code>mutation</code>来操作，因为只有它能操作）</p></li>
</ul>
<hr>
<blockquote><p>2.怎么用<code>actions</code>？</p></blockquote>
<ul>
<li>
<p>定义<code>actions</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({//创建store实例
      state: {
         count: 0
             },
      mutations: {                
         increment (state) {
          state.count++
         }
          },
      actions: {         //只是提交`commit`了`mutations`里面的方法。
         increment (context) {
          context.commit('increment')
   }
 }
    })
   
  一般我们会简写成这样
  actions: {
   increment ({ commit }) {
         commit('increment')
      }
         }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const store = new Vuex.Store({//创建store实例
      <span class="hljs-keyword">state</span>: {
         count: <span class="hljs-number">0</span>
             },
      mutations: {                
         increment (<span class="hljs-keyword">state</span>) {
          <span class="hljs-keyword">state</span>.count++
         }
          },
      actions: {         //只是提交`commit`了`mutations`里面的方法。
         increment (context) {
          context.commit('increment')
   }
 }
    })
   
  一般我们会简写成这样
  actions: {
   increment ({ commit }) {
         commit('increment')
      }
         }</code></pre>
</li>
<li>
<p>分发<code>actions</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" store.dispatch('increment')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">store</span><span class="hljs-selector-class">.dispatch</span>(<span class="hljs-string">'increment'</span>)</code></pre>
</li>
<li><p>MapActions和MapState一级MapMutations类似。</p></li>
</ul>
<hr>
<blockquote><p>3.源码分析</p></blockquote>
<ul>
<li>
<p><code>registerAction()</code>:初始化<code>action</code>，和<code>registerMutation</code>类似，不同的地方是<code>mutation</code>是同步的修改当前模块的<code>state</code>，<code>action</code>是可以异步的去修改。但是还是通过提交<code>mutation</code>来修改，必须明白在<code>Vuex</code>中只又<code>mutation</code>能修改<code>state</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerAction (store, type, handler, path = []) {
  const entry = store._actions[type] || (store._actions[type] = [])
  //通过types拿到action的对象数组
  const { dispatch, commit } = store
  entry.push(function wrappedActionHandler (payload, cb) {
  //包装action成一个函数，payload表示载荷，并传入一个对象，
  let res = handler({ 
   dispatch,
   commit,
   getters: store.getters,
   state: getNestedState(store.state, path),
   rootState: store.state
  }, payload, cb)
 if (!isPromise(res)) {
 //如果不是promise对象，就包装成Promise对象，这也就是前面分析store的时候，断言函数要判断是否存在promise。
   res = Promise.resolve(res)
  }
 if (store._devtoolHook) {
   return res.catch(err => {
     store._devtoolHook.emit('vuex:error', err)
     throw err
   })
 } else {
   return res
 }
  })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerAction</span> <span class="hljs-params">(store, type, handler, path = [])</span> {</span>
  const entry = store._actions[<span class="hljs-built_in">type</span>] || (store._actions[<span class="hljs-built_in">type</span>] = [])
  //通过types拿到action的对象数组
  const { dispatch, commit } = store
  entry.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrappedActionHandler</span> <span class="hljs-params">(payload, cb)</span> {</span>
  //包装action成一个函数，payload表示载荷，并传入一个对象，
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">res</span> = handler({ 
   dispatch,
   commit,
   getter<span class="hljs-variable">s:</span> store.getters,
   state: getNestedState(store.state, path),
   rootState: store.state
  }, payload, <span class="hljs-keyword">cb</span>)
 <span class="hljs-keyword">if</span> (!isPromise(<span class="hljs-keyword">res</span>)) {
 //如果不是promise对象，就包装成Promise对象，这也就是前面分析store的时候，断言函数要判断是否存在promise。
   <span class="hljs-keyword">res</span> = Promise.<span class="hljs-built_in">resolve</span>(<span class="hljs-keyword">res</span>)
  }
 <span class="hljs-keyword">if</span> (store._devtoolHook) {
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">res</span>.<span class="hljs-keyword">catch</span>(err =&gt; {
     store._devtoolHook.emit(<span class="hljs-string">'vuex:error'</span>, err)
     <span class="hljs-keyword">throw</span> err
   })
 } <span class="hljs-keyword">else</span> {
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">res</span>
 }
  })
  }</code></pre>
</li>
<li>
<p><code>dispatch()</code>:分发<code>actions</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch (type, payload) {
  //判断type是否是对象类型
if (isObject(type) &amp;&amp; type.type) {
  payload = type
  type = type.type
}
const entry = this._actions[type]
if (!entry) {
  console.error(`[vuex] unknown action type: ${type}`)
  return
}
return entry.length > 1
  ? Promise.all(entry.map(handler => handler(payload)))
  //在 action 的回调函数里，可以拿到当前模块的上下文包括 store 的 commit 和 dispatch 方法、getter、当前模块的 state 和 rootState
  : entry[0](payload)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>dispatch (<span class="hljs-keyword">type</span>, payload) {
  //判断<span class="hljs-keyword">type</span>是否是对象类型
<span class="hljs-keyword">if</span> (isObject(<span class="hljs-keyword">type</span>) &amp;&amp; <span class="hljs-keyword">type</span>.<span class="hljs-keyword">type</span>) {
  payload = <span class="hljs-keyword">type</span>
  <span class="hljs-type"><span class="hljs-keyword">type</span> </span>= <span class="hljs-keyword">type</span>.<span class="hljs-keyword">type</span>
<span class="hljs-type">}
</span>const <span class="hljs-keyword">entry</span> = this._actions[<span class="hljs-keyword">type</span>]
<span class="hljs-keyword">if</span> (!<span class="hljs-keyword">entry</span>) {
  console.error(`[vuex] unknown action <span class="hljs-keyword">type</span>: ${<span class="hljs-keyword">type</span>}`)
  <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">return</span> <span class="hljs-keyword">entry</span>.length &gt; <span class="hljs-number">1</span>
  ? Promise.<span class="hljs-keyword">all</span>(<span class="hljs-keyword">entry</span>.map(handler =&gt; handler(payload)))
  //在 action 的回调函数里，可以拿到当前模块的上下文包括 store 的 commit 和 dispatch 方法、getter、当前模块的 state 和 rootState
  : <span class="hljs-type">entry</span>[<span class="hljs-number">0</span>](payload)
  }</code></pre>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex之理解Actions

## 原文链接
[https://segmentfault.com/a/1190000009132572](https://segmentfault.com/a/1190000009132572)

