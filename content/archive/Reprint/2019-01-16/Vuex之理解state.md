---
title: 'Vuex之理解state' 
date: 2019-01-16 2:30:08
hidden: true
slug: 5329eg4jmrm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">理解<code>state</code>
</h2>
<blockquote><p>1.什么是<code>state</code>？</p></blockquote>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009096457">上一篇</a>文章说了，<code>Vuex</code>就是提供一个仓库，仓库里面放了很多对象。其中<code>state</code>就是<strong>数据源存放地</strong>，对应于与一般<code>Vue</code>对象里面的<code>data</code>（后面讲到的<code>actions</code>和<code>mutations</code>对应于<code>methods</code>）。</p></li>
<li><p><strong>响应书存储</strong>：<code>state</code>里面存放的数据是响应式的，<code>Vue</code>组件从<code>store</code>中读取数据，若是<code>store</code>中的数据发生改变，依赖这个数据的组件也会发生更新。（这里“<strong>状态</strong>”=“<strong>数据</strong>”），也就是是说数据和视图是同步的。</p></li>
</ul>
<hr>
<blockquote><p>2.局部状态</p></blockquote>
<ul>
<li><p>获取：在<code>Vue</code>组件中获取数据，最直接的可以通过计算属性中获取；</p></li>
<li><p>组件仍然可以保存<strong>局部状态</strong>：虽然说<code>Vuex</code>的<code>Store</code>仓库让我们同一管理数据变得更加方便，但是代码一多也会变得冗长，有些组件的数据是自己严格自用，我们可以将<code>state</code>放在组件自身，作为局部数据，专供此组件使用，其他的组件不能用。</p></li>
</ul>
<hr>
<blockquote><p>3.<code>mapState</code></p></blockquote>
<ul>
<li><p><code>mapState</code>的作用是把全局的 <code>state</code> 和 <code>getters</code> 映射到当前组件的 <code>computed</code> 计算属性中，<code>this.$store.state</code>。</p></li>
<li>
<p>使用示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import {mapState} from 'vuex' 
 export default {
  computer :
  mapState({
   count: state => state.count,
    'count' // 映射 this.count 为 store.state.count
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> import {mapState} <span class="hljs-keyword">from</span> 'vuex' 
 export <span class="hljs-keyword">default</span> {
  computer :
  mapState({
   count: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count,
    'count' // 映射 this.count 为 store.<span class="hljs-keyword">state</span>.count
  })
}</code></pre>
</li>
<li>
<p>看看源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function mapState (states) {
   const res = {}   //定义一个对象
   normalizeMap(states).forEach(({ key, val }) => {
    // normalizeMap（）函数初始化states数据
         res[key] = function mappedState () {
           return typeof val === 'function'
           // 判断val是否是函数
           ? val.call(this, this.$store.state, this.$store.getters)
           // 若val是函数，将store的state和getters作为参数，返回值作为mapped State的返回值
           : this.$store.state[val]"}}")
       return res // 返回的是一个函数
    }
//初始化方法
-------------------------------------------------------------------------    
 function normalizeMap (map) {
        return Array.isArray(map) //判断state是否是数组
        ? map.map(key => ({ key, val: key }))
       // 是数组的话，调用map方法，将每一个数组元素转换成{key,val:key}
       : Object.keys(map).map(key => ({ key, val: map[key] }))
       // 否则就是对象，遍历对象，将每一个val变成val:key
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapState</span> (<span class="hljs-params">states</span>) </span>{
   <span class="hljs-keyword">const</span> res = {}   <span class="hljs-comment">//定义一个对象</span>
   normalizeMap(states).forEach(<span class="hljs-function">(<span class="hljs-params">{ key, val }</span>) =&gt;</span> {
    <span class="hljs-comment">// normalizeMap（）函数初始化states数据</span>
         res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedState</span> (<span class="hljs-params"></span>) </span>{
           <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span>
           <span class="hljs-comment">// 判断val是否是函数</span>
           ? val.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.$store.state, <span class="hljs-keyword">this</span>.$store.getters)
           <span class="hljs-comment">// 若val是函数，将store的state和getters作为参数，返回值作为mapped State的返回值</span>
           : <span class="hljs-keyword">this</span>.$store.state[val]"}}")
       <span class="hljs-keyword">return</span> res <span class="hljs-comment">// 返回的是一个函数</span>
    }
<span class="hljs-comment">//初始化方法</span>
-------------------------------------------------------------------------    
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalizeMap</span> (<span class="hljs-params">map</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.isArray(map) <span class="hljs-comment">//判断state是否是数组</span>
        ? map.map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> ({ key, <span class="hljs-attr">val</span>: key }))
       <span class="hljs-comment">// 是数组的话，调用map方法，将每一个数组元素转换成{key,val:key}</span>
       : <span class="hljs-built_in">Object</span>.keys(map).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> ({ key, <span class="hljs-attr">val</span>: map[key] }))
       <span class="hljs-comment">// 否则就是对象，遍历对象，将每一个val变成val:key</span>
   }</code></pre>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex之理解state

## 原文链接
[https://segmentfault.com/a/1190000009102710](https://segmentfault.com/a/1190000009102710)

