---
title: 'Vuex之理解Getters' 
date: 2019-01-16 2:30:08
hidden: true
slug: 96bpqcrq6tw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">理解Getters</h2>
<blockquote><p>1.什么是<code>getters</code></p></blockquote>
<ul><li><p>在介绍<a href="https://segmentfault.com/a/1190000009102710">state</a>中我们了解到，在<code>Store</code>仓库里，<code>state</code>就是用来存放数据，若是对数据进行处理输出，比如数据要过滤，一般我们可以写到<code>computed</code>中。但是如果很多组件都使用这个过滤后的数据，比如饼状图组件和曲线图组件，我们是否可以把这个数据抽提出来共享？这就是<code>getters</code>存在的意义。我们可以认为，【getters】是store的计算属性。</p></li></ul>
<hr>
<blockquote><p>　２.如何使用</p></blockquote>
<ul>
<li>
<p><strong>定义</strong>：我们可以在<code>store</code>中定义<code>getters</code>，第一个参数是state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getters = {style:state => state.style}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">const getters = {style:<span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.style}</code></pre>
</li>
<li><p><strong>传参</strong>：定义的<code>Getters</code>会暴露为<code>store.getters</code>对象，也可以接受其他的<code>getters</code>作为第二个参数；</p></li>
<li>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
doneTodosCount () {
    return this.$store.getters.doneTodosCount}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed: {
doneTodosCount () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.doneTodosCount}</code></pre>
</li>
</ul>
<hr>
<blockquote><p>3.mapGetters</p></blockquote>
<ul><li>
<p><code>mapGetters</code>辅助函数仅仅是将<code>store</code>中的<code>getters</code>映射到局部计算属性中，用法和<code>mapState</code>类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapGetters } from 'vuex'
computed: {
   // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
    'doneTodosCount',
    'anotherGetter',])}
 //给getter属性换名字
  mapGetters({
 // 映射 this.doneCount 为 store.getters.doneTodosCount
  doneCount: 'doneTodosCount'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
computed: {
   <span class="hljs-comment">// 使用对象展开运算符将 getters 混入 computed 对象中</span>
    ...mapGetters([
    <span class="hljs-string">'doneTodosCount'</span>,
    <span class="hljs-string">'anotherGetter'</span>,])}
 <span class="hljs-comment">//给getter属性换名字</span>
  mapGetters({
 <span class="hljs-comment">// 映射 this.doneCount 为 store.getters.doneTodosCount</span>
  doneCount: <span class="hljs-string">'doneTodosCount'</span>
})</code></pre>
</li></ul>
<hr>
<blockquote><p>4.源码分析</p></blockquote>
<ul><li><p><code>wrapGetters</code>初始化<code>getters</code>，接受3个参数，<code>store</code>表示当前的<code>Store</code>实例，<code>moduleGetters</code>当前模块下所有的<code>getters</code>，<code>modulePath</code>对应模块的路径</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function `wrapGetters` (store, moduleGetters, modulePath) {
     Object.keys(moduleGetters).forEach(getterKey => {
            // 遍历先所有的getters
       const rawGetter = moduleGetters[getterKey]
       if (store._wrappedGetters[getterKey]) {
         console.error(`[vuex] duplicate getter key: ${getterKey}`)
           // getter的key不允许重复，否则会报错
         return
       }
       store._wrappedGetters[getterKey] = function `wrappedGetter` (store{
            // 将每一个getter包装成一个方法，并且添加到store._wrappedGetters对象中，
           return rawGetter(
              //执行getter的回调函数，传入三个参数，(local state,store getters,rootState)
           getNestedState(store.state, modulePath), // local state
              //根据path查找state上嵌套的state 
           store.getters, 
                // store上所有的getters
           store.state 
                 // root state)"}}") 
      }
      
     //根据path查找state上嵌套的state 
   function `getNestedState` (state, path) {
          return path.length
            ? path.reduce((state, key) => state[key], state): state}   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>   function `wrapGetters` (store, moduleGetters, modulePath) {
     Object.keys(moduleGetters).<span class="hljs-keyword">for</span>Each(getterKey =&gt; {
            // 遍历先所有的getters
       const rawGetter = moduleGetters[getterKey]
       if (store._wrappedGetters[getterKey]) {
         console.error(`[vuex] duplicate getter key: ${getterKey}`)
           // getter的key不允许重复，否则会报错
         return
       }
       store._wrappedGetters[getterKey] = function `wrappedGetter` (store{
            // 将每一个getter包装成一个方法，并且添加到store._wrappedGetters对象中，
           return rawGetter(
              //执行getter的回调函数，传入三个参数，(local <span class="hljs-keyword">state</span>,store getters,rootState)
           getNestedState(store.<span class="hljs-keyword">state</span>, modulePath), // local <span class="hljs-keyword">state</span>
              //根据path查找<span class="hljs-keyword">state</span>上嵌套的<span class="hljs-keyword">state</span> 
           store.getters, 
                // store上所有的getters
           store.<span class="hljs-keyword">state</span> 
                 // root <span class="hljs-keyword">state</span>)"}}") 
      }
      
     //根据path查找<span class="hljs-keyword">state</span>上嵌套的<span class="hljs-keyword">state</span> 
   function `getNestedState` (<span class="hljs-keyword">state</span>, path) {
          return path.length
            ? path.reduce((<span class="hljs-keyword">state</span>, key) =&gt; <span class="hljs-keyword">state</span>[key], <span class="hljs-keyword">state</span>): <span class="hljs-keyword">state</span>}   </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex之理解Getters

## 原文链接
[https://segmentfault.com/a/1190000009105708](https://segmentfault.com/a/1190000009105708)

