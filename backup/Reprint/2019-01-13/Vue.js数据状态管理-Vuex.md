---
title: 'Vue.js数据状态管理-Vuex' 
date: 2019-01-13 2:30:11
hidden: true
slug: 03j1nwwg35sx
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue.js数据状态管理-Vuex</h1>
<p>[TOC]</p>
<h2 id="articleHeader1">上次分享回顾</h2>
<blockquote><p>父子组件的通信</p></blockquote>
<ul>
<li><p>父 -&gt; 子： props</p></li>
<li><p>子 -&gt; 父： 自定义event</p></li>
<li><p>组件文档化</p></li>
</ul>
<h2 id="articleHeader2">Vuex起步</h2>
<blockquote><p>Vuex主要应用于中、大型单页应用的数据状态管理架构。</p></blockquote>
<h4>为什么要数据状态管理？</h4>
<ul><li><p>组件数据共享</p></li></ul>
<h4>组件之间如何数据共享（组件通信）</h4>
<ul>
<li><p>父 -&gt; 子：props</p></li>
<li><p>子 -&gt; 父：自定义event</p></li>
<li><p>兄弟之间？其他非父子? ：自定义event？</p></li>
</ul>
<h4>可能的解法</h4>
<ol>
<li>
<p>自定义event</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()
// in component A's method
bus.$emit('id-selected', 1)

// in component B's created hook

bus.$on('id-selected', function(id){
  //...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()
<span class="hljs-comment">// in component A's method</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)

<span class="hljs-comment">// in component B's created hook</span>

bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>)</span>{
  <span class="hljs-comment">//...</span>
})</code></pre>
</li>
<li>
<p>共享数据源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const srcData = {
  count: 0
}

const vmA = new Vue({
  data: srcData
})

const vmB = new Vue({
  data: srcData
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> srcData = {
  <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
}

<span class="hljs-keyword">const</span> vmA = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: srcData
})

<span class="hljs-keyword">const</span> vmB = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: srcData
})</code></pre>
</li>
</ol>
<h4>存在的问题</h4>
<ul>
<li><p>谁在emit事件？谁在on事件？父组件和子组件强耦合</p></li>
<li><p>如何追踪数据的状态变化？</p></li>
<li><p>业务逻辑遍布各个组件，导致各种意想不到的问题</p></li>
</ul>
<h4>Vuex基本概念</h4>
<ul>
<li>
<p>state</p>
<ul><li><p>状态的容器</p></li></ul>
</li>
<li>
<p>getters</p>
<ul><li><p>状态的获取函数</p></li></ul>
</li>
<li>
<p>mutations</p>
<ul><li><p>修改状态的事件回调函数</p></li></ul>
</li>
<li>
<p>actions</p>
<ul><li><p>分发修改状态的事件</p></li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  //state
  state: {
    count: 0
  },
  //mutations
  mutations: {
    INIT (state, data) {
      state.count = data.count
    },
    INCREASE (state) {
      state.count++
    },
    DECREASE (state) {
      state.count--
    }
  },
  //getters
  getters: {
    getCount (state) {
      return state.count
    }
  },
  //actions
  actions: {
    init(context){
      context.commit('INIT', {
        count: 10
      })
    },
    inc(context){
      context.commit('INCREASE')
    },
    dec(context){
      context.commit('DECREASE')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">//state</span>
  state: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-comment">//mutations</span>
  mutations: {
    INIT (state, data) {
      state.count = data.count
    },
    INCREASE (state) {
      state.count++
    },
    DECREASE (state) {
      state.count--
    }
  },
  <span class="hljs-comment">//getters</span>
  getters: {
    getCount (state) {
      <span class="hljs-keyword">return</span> state.count
    }
  },
  <span class="hljs-comment">//actions</span>
  actions: {
    init(context){
      context.commit(<span class="hljs-string">'INIT'</span>, {
        <span class="hljs-attr">count</span>: <span class="hljs-number">10</span>
      })
    },
    inc(context){
      context.commit(<span class="hljs-string">'INCREASE'</span>)
    },
    dec(context){
      context.commit(<span class="hljs-string">'DECREASE'</span>)
    }
  }
})</code></pre>
<h4>Vuex基本理解</h4>
<ul>
<li><p>数据的集合其中处理（DB）</p></li>
<li><p>数据的操作集中处理 （CRUD）</p></li>
<li><p>所有对数据的操作（CRUD）以请求（commit）的方式提交处理 （DAO）</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js数据状态管理-Vuex

## 原文链接
[https://segmentfault.com/a/1190000009647277](https://segmentfault.com/a/1190000009647277)

