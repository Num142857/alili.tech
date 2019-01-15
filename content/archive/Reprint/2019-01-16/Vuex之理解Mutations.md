---
title: 'Vuex之理解Mutations' 
date: 2019-01-16 2:30:08
hidden: true
slug: tl6u9oxifyp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">理解<code>Mutations</code>
</h2>
<blockquote><p>1.什么是<code>mutations</code>？</p></blockquote>
<ul>
<li><p>上一篇文章说的<code>getters</code>是为了初步获取和简单处理<code>state</code>里面的数据(这里的简单处理不能<code>改变</code> <code>state</code>里面的数据)，<code>Vue</code>的视图是由数据驱动的，也就是说<code>state</code>里面的数据是动态变化的，那么怎么改变呢，切记在<code>Vuex</code>中<code>store</code>数据改变的唯一方法就是<code>mutation</code>！</p></li>
<li><p>通俗的理解<code>mutations</code>,里面装着一些改变数据方法的集合，这是<code>Veux</code>设计很重要的一点，就是把处理数据逻辑方法全部放在<code>mutations</code>里面，使得数据和视图分离。</p></li>
</ul>
<hr>
<blockquote><p>2.怎么用<code>mutations</code>？</p></blockquote>
<ul>
<li>
<p><strong>mutation结构：</strong>每一个<code>mutation</code>都有一个字符串类型的事件类型(<code>type</code>)和回调函数(<code>handler</code>)，也可以理解为<code>{type:handler()}</code>,这和订阅发布有点类似。先注册事件，当触发响应类型的时候调用<code>handker()</code>，调用<code>type</code>的时候需要用到<code>store.commit</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const store = new Vuex.Store({
    state: {
        count: 1
        },
    mutations: {
    increment (state) {      //注册事件，type:increment，handler第一个参数是state；
         // 变更状态
       state.count++"}}"})
       
    store.commit('increment')   //调用type，触发handler（state）     
       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> const store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        count: <span class="hljs-number">1</span>
        },
    mutations: {
    increment (<span class="hljs-keyword">state</span>) {      //注册事件，type:increment，handler第一个参数是<span class="hljs-keyword">state</span>；
         // 变更状态
       <span class="hljs-keyword">state</span>.count++"}}"})
       
    store.commit('increment')   //调用type，触发handler（<span class="hljs-keyword">state</span>）     
       </code></pre>
</li>
<li>
<p><strong>载荷（payload）:</strong>简单的理解就是往<code>handler(stage)</code>中传参<code>handler(stage,pryload)</code>；一般是个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mutations: {
 increment (state, n) {
     state.count += n"}}"
 store.commit('increment', 10)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>  mutations: {
 increment (<span class="hljs-keyword">state</span>, n) {
     <span class="hljs-keyword">state</span>.count += n"}}"
 store.commit('increment', <span class="hljs-number">10</span>)</code></pre>
</li>
<li>
<p><strong>mutation-types</strong>：将常量放在单独的文件中，方便协作开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // mutation-types.js
 export const SOME_MUTATION = 'SOME_MUTATION'
    // store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

  const store = new Vuex.Store({
    state: { ... },
    mutations: {
     // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
    // mutate state
  }
}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    // mutation-types.js
 export const SOME_MUTATION = 'SOME_MUTATION'
    // store.js
import Vuex <span class="hljs-keyword">from</span> 'vuex'
import { SOME_MUTATION } <span class="hljs-keyword">from</span> './mutation-types'

  const store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: { ... },
    mutations: {
     // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (<span class="hljs-keyword">state</span>) {
    // mutate <span class="hljs-keyword">state</span>
  }
}
})</code></pre>
</li>
<li>
<p><strong>commit：</strong>提交可以在组件中使用 <code>this.$store.commit('xxx')</code> 提交 <code>mutation</code>，或者使用 <code>mapMutations</code> 辅助函数将组件中的 <code>methods</code> 映射为 <code>store.commit</code> 调用（需要在根节点注入 <code>store</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapMutations } from 'vuex'

export default {

methods: {
  ...mapMutations([
    'increment' // 映射 this.increment() 为 
this.$store.commit('increment')]),
  ...mapMutations({
    add: 'increment' // 映射 this.add() 为 
this.$store.commit('increment')
  })"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

methods: {
  ...mapMutations([
    <span class="hljs-string">'increment'</span> <span class="hljs-regexp">//</span> 映射 <span class="hljs-keyword">this</span>.increment() 为 
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)]),
  ...mapMutations({
    add: <span class="hljs-string">'increment'</span> <span class="hljs-regexp">//</span> 映射 <span class="hljs-keyword">this</span>.add() 为 
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)
  })"}}"</code></pre>
</li>
</ul>
<hr>
<blockquote><p>3.源码分析</p></blockquote>
<li><ul>
<li>
<p><code>registerMutation</code>:初始化<code>mutation</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerMutation (store, type, handler, path = []) {
 //4个参数，store是Store实例，type为mutation的type，handler，path为当前模块路径
    const entry = store._mutations[type] || (store._mutations[type] = 
[])  //通过type拿到对应的mutation对象数组
     entry.push(function wrappedMutationHandler (payload) {
     //将mutation包装成函数push到数组中，同时添加载荷payload参数    
     handler(getNestedState(store.state, path), payload)
     //通过getNestedState()得到当前的state，同时添加载荷payload参数
   })
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>function registerMutation (store, type, <span class="hljs-keyword">handler</span>, <span class="hljs-keyword">path</span> = []) {
 //<span class="hljs-number">4</span>个参数，<span class="hljs-keyword">store</span>是<span class="hljs-keyword">Store</span>实例，<span class="hljs-keyword">type</span>为mutation的<span class="hljs-keyword">type</span>，<span class="hljs-keyword">handler</span>，<span class="hljs-keyword">path</span>为当前模块路径
    const entry = store._mutations[<span class="hljs-keyword">type</span>] || (store._mutations[<span class="hljs-keyword">type</span>] = 
[])  //通过<span class="hljs-keyword">type</span>拿到对应的mutation对象数组
     entry.push(<span class="hljs-keyword">function</span> wrappedMutationHandler (payload) {
     //将mutation包装成函数push到数组中，同时添加载荷payload参数    
     <span class="hljs-keyword">handler</span>(getNestedState(store.state, <span class="hljs-keyword">path</span>), payload)
     //通过getNestedState()得到当前的state，同时添加载荷payload参数
   })
 }</code></pre>
</li>
<li>
<p><code>commit</code>:调用<code>mutation</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commit (type, payload, options) {
  // 3个参数，type是mutation类型，payload载荷，options配置
    if (isObject(type) &amp;&amp; type.type) {
       // 当type为object类型，
      options = payload
      payload = type
      type = type.type
  }
 const mutation = { type, payload }
 const entry = this._mutations[type]
   // 通过type查找对应的mutation
 if (!entry) {
  //找不到报错
   console.error(`[vuex] unknown mutation type: ${type}`)
   return
 }
 this._withCommit(() => {
   entry.forEach(function commitIterator (handler) {
   // 遍历type对应的mutation对象数组，执行handle（payload）方法
   //也就是开始执行wrappedMutationHandler(handler)
     handler(payload)
   })
 })
 if (!options || !options.silent) {
   this._subscribers.forEach(sub => sub(mutation, this.state))
    //把mutation和根state作为参数传入
 }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>commit (<span class="hljs-keyword">type</span>, payload, options) {
  <span class="hljs-comment">// 3个参数，type是mutation类型，payload载荷，options配置</span>
    <span class="hljs-keyword">if</span> (isObject(<span class="hljs-keyword">type</span>) &amp;&amp; <span class="hljs-keyword">type</span>.type) {
       <span class="hljs-comment">// 当type为object类型，</span>
      options = payload
      payload = <span class="hljs-keyword">type</span>
      <span class="hljs-keyword">type</span> = <span class="hljs-keyword">type</span>.type
  }
 <span class="hljs-keyword">const</span> mutation = { <span class="hljs-keyword">type</span>, payload }
 <span class="hljs-keyword">const</span> entry = <span class="hljs-keyword">this</span>._mutations[<span class="hljs-keyword">type</span>]
   <span class="hljs-comment">// 通过type查找对应的mutation</span>
 <span class="hljs-keyword">if</span> (!entry) {
  <span class="hljs-comment">//找不到报错</span>
   <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] unknown mutation type: <span class="hljs-subst">${type}</span>`</span>)
   <span class="hljs-keyword">return</span>
 }
 <span class="hljs-keyword">this</span>._withCommit(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
   entry.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commitIterator</span> (<span class="hljs-params">handler</span>) </span>{
   <span class="hljs-comment">// 遍历type对应的mutation对象数组，执行handle（payload）方法</span>
   <span class="hljs-comment">//也就是开始执行wrappedMutationHandler(handler)</span>
     handler(payload)
   })
 })
 <span class="hljs-keyword">if</span> (!options || !options.silent) {
   <span class="hljs-keyword">this</span>._subscribers.forEach(<span class="hljs-function"><span class="hljs-params">sub</span> =&gt;</span> sub(mutation, <span class="hljs-keyword">this</span>.state))
    <span class="hljs-comment">//把mutation和根state作为参数传入</span>
 }
}
</code></pre>
</li>
</ul></li>
<ul><li>
<p><code>subscribers</code>:订阅<code>store</code>的<code>mutation</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscribe (fn) {
const subs = this._subscribers
if (subs.indexOf(fn) < 0) {
  subs.push(fn)
  }
return () => {
  const i = subs.indexOf(fn)
  if (i > -1) {
    subs.splice(i, 1)
    }
  }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code>subscribe (<span class="hljs-function"><span class="hljs-keyword">fn</span>) {
<span class="hljs-title">const</span> <span class="hljs-title">subs</span> = <span class="hljs-title">this</span>.<span class="hljs-title">_subscribers</span>
<span class="hljs-title">if</span> </span>(subs.indexOf(<span class="hljs-function"><span class="hljs-keyword">fn</span>) </span>&lt; <span class="hljs-number">0</span>) {
  subs.push(<span class="hljs-function"><span class="hljs-keyword">fn</span>)
  }
<span class="hljs-title">return</span> </span>() =&gt; {
  <span class="hljs-keyword">const</span> i = subs.indexOf(<span class="hljs-function"><span class="hljs-keyword">fn</span>)
  <span class="hljs-title">if</span> </span>(i &gt; -<span class="hljs-number">1</span>) {
    subs.splice(i, <span class="hljs-number">1</span>)
    }
  }
 }</code></pre>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex之理解Mutations

## 原文链接
[https://segmentfault.com/a/1190000009119500](https://segmentfault.com/a/1190000009119500)

