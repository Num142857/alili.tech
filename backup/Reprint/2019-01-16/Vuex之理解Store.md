---
title: 'Vuex之理解Store' 
date: 2019-01-16 2:30:08
hidden: true
slug: 6aq5oxo9mn3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">理解<code>Store</code>
</h2>
<blockquote><p>1.什么是<code>Store</code>？</p></blockquote>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009096457">上一篇文章</a>说了，<code>Vuex</code>就是提供一个仓库，<code>Store</code>仓库里面放了很多对象。其中<code>state</code>就是<strong>数据源存放地</strong>，对应于与一般<code>Vue</code>对象里面的<code>data</code>（后面讲到的<code>actions</code>和<code>mutations</code>对应于<code>methods</code>）。</p></li>
<li><p>在使用<code>Vuex</code>的时候通常会创建<code>Store</code>实例<code>new Vuex.store({state,getters,mutations,actions})</code>有很多子模块的时候还会使用到<code>modules</code>。</p></li>
<li><p><span class="img-wrap"><img data-src="/img/bVMlY5?w=478&amp;h=304" src="https://static.alili.tech/img/bVMlY5?w=478&amp;h=304" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>总结，<code>Store</code>类就是存储数据和管理数据方法的仓库，实现方式是将数据和方法已对象形式传入其实例中。要注意一个应用或是项目中只能存在<strong>一个<code>Store</code>实例</strong>！！</p></li>
</ul>
<hr>
<blockquote><p>2.<code>Store</code>源码分析</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Store{
     constructor (options = {}) {
     1.部分2个‘断言函数’判断条件
     assert(Vue, `must call Vue.use(Vuex) before creating a store 
     instance.`)  // 在Store实例化之前一定要确保Vue的存在
     assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
     //确保promise存在
     
     2.结构赋值拿到options里面的state，plugins和strict
     const {
        state = {},   //rootState
        plugins = [], // 插件
        strict = false //是否严格模式
            } = options
            
     3.Store internal state创建store内部属性
     this._options = options //存储参数
     this._committing = false //标识提交状态，保证修改state只能在mutation里面，不能在外部随意修改
     this._actions = Object.create(null)  //存储用户定义的actions
     this._mutations = Object.create(null) //存储用户定义的mutations
     this._wrappedGetters = Object.create(null) //存储用户定义的getters
     this._runtimeModules = Object.create(null) //存储运行时的modules
     this._subscribers = []   //存储所有堵mutation变化的订阅者
     this._watcherVM = new Vue() //借用Vue实例的方法，$watch来观测变化
     
     4.将dispatch和commit的this指向当前store实例
     const store = this
     const { dispatch, commit } = this
     this.dispatch = function boundDispatch (type, payload) {
     return dispatch.call(store, type, payload)}
     this.commit = function boundCommit (type, payload, options) {
     return commit.call(store, type, payload, options)"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">class</span> Store{
     <span class="hljs-keyword">constructor</span> (<span class="hljs-params">options = {}</span>) {
     <span class="hljs-number">1.</span>部分<span class="hljs-number">2</span>个‘断言函数’判断条件
     assert(Vue, <span class="hljs-string">`must call Vue.use(Vuex) before creating a store 
     instance.`</span>)  <span class="hljs-comment">// 在Store实例化之前一定要确保Vue的存在</span>
     assert(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>, <span class="hljs-string">`vuex requires a Promise polyfill in this browser.`</span>)
     <span class="hljs-comment">//确保promise存在</span>
     
     <span class="hljs-number">2.</span>结构赋值拿到options里面的state，plugins和strict
     <span class="hljs-keyword">const</span> {
        state = {},   <span class="hljs-comment">//rootState</span>
        plugins = [], <span class="hljs-comment">// 插件</span>
        strict = <span class="hljs-literal">false</span> <span class="hljs-comment">//是否严格模式</span>
            } = options
            
     <span class="hljs-number">3.</span>Store internal state创建store内部属性
     <span class="hljs-keyword">this</span>._options = options <span class="hljs-comment">//存储参数</span>
     <span class="hljs-keyword">this</span>._committing = <span class="hljs-literal">false</span> <span class="hljs-comment">//标识提交状态，保证修改state只能在mutation里面，不能在外部随意修改</span>
     <span class="hljs-keyword">this</span>._actions = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)  <span class="hljs-comment">//存储用户定义的actions</span>
     <span class="hljs-keyword">this</span>._mutations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) <span class="hljs-comment">//存储用户定义的mutations</span>
     <span class="hljs-keyword">this</span>._wrappedGetters = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) <span class="hljs-comment">//存储用户定义的getters</span>
     <span class="hljs-keyword">this</span>._runtimeModules = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) <span class="hljs-comment">//存储运行时的modules</span>
     <span class="hljs-keyword">this</span>._subscribers = []   <span class="hljs-comment">//存储所有堵mutation变化的订阅者</span>
     <span class="hljs-keyword">this</span>._watcherVM = <span class="hljs-keyword">new</span> Vue() <span class="hljs-comment">//借用Vue实例的方法，$watch来观测变化</span>
     
     <span class="hljs-number">4.</span>将dispatch和commit的<span class="hljs-keyword">this</span>指向当前store实例
     <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">this</span>
     <span class="hljs-keyword">const</span> { dispatch, commit } = <span class="hljs-keyword">this</span>
     <span class="hljs-keyword">this</span>.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundDispatch</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>, payload</span>) </span>{
     <span class="hljs-keyword">return</span> dispatch.call(store, <span class="hljs-keyword">type</span>, payload)}
     <span class="hljs-keyword">this</span>.commit = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundCommit</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>, payload, options</span>) </span>{
     <span class="hljs-keyword">return</span> commit.call(store, <span class="hljs-keyword">type</span>, payload, options)"}}"</code></pre>
<hr>
<blockquote><p><a href="https://segmentfault.com/a/1190000009102710" target="_blank">后面文章</a>逐步分析每一个模块。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex之理解Store

## 原文链接
[https://segmentfault.com/a/1190000009101751](https://segmentfault.com/a/1190000009101751)

