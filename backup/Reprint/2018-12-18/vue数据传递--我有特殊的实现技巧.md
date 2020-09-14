---
title: 'vue数据传递--我有特殊的实现技巧' 
date: 2018-12-18 2:30:10
hidden: true
slug: mudh5dadbeg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>最近碰到了比较多的关于vue的eventBus的问题，之前定技术选型的时候也被问到了，vuex和eventBus的使用范围。所以简单的写一下。同时有一种特殊的实现方案。</p>
<p>组件之间传值有这么几种数据传递方式，vuex、props、eventBus和<strong>特殊的eventBus</strong>。</p>
<h1 id="articleHeader1">vuex</h1>
<p>我就传两个数据，vuex真是太麻烦了。用是不可能用的，理解又理解不了。</p>
<h1 id="articleHeader2">props</h1>
<h4>demo</h4>
<p>父子组件传值，官方api，只写个demo。</p>
<ol>
<li>
<p>父组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将事件绑定至子组件
<son :info=&quot;info&quot; @update=&quot;updateHandler&quot;/>
// data
info: 'sendToSon'
// methods
updateHandler (newVal) {
  this.info = newVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 将事件绑定至子组件</span>
&lt;<span class="hljs-string">son :</span>info=<span class="hljs-string">"info"</span> <span class="hljs-meta">@update</span>=<span class="hljs-string">"updateHandler"</span>/&gt;
<span class="hljs-comment">// data</span>
<span class="hljs-string">info:</span> <span class="hljs-string">'sendToSon'</span>
<span class="hljs-comment">// methods</span>
updateHandler (newVal) {
  <span class="hljs-keyword">this</span>.info = newVal
}</code></pre>
</li>
<li>
<p>子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// props
props: ['info']
// 触发绑定在组件上的事件，向上传值，在父组件某个方法中使用
this.$emit('update', 'got')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// props</span>
<span class="hljs-string">props:</span> [<span class="hljs-string">'info'</span>]
<span class="hljs-comment">// 触发绑定在组件上的事件，向上传值，在父组件某个方法中使用</span>
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update'</span>, <span class="hljs-string">'got'</span>)</code></pre>
</li>
</ol>
<p>父向子传值--&gt;props  <br>子向父传值--&gt;子组件绑定事件回调定义在父组件，子组件触发此事件。<br>因不推荐子组件内直接修改父组件传入的props，需使用自定义事件。</p>
<h2 id="articleHeader3">限制</h2>
<p>父子组件。</p>
<h1 id="articleHeader4">eventBus</h1>
<h2 id="articleHeader5">demo</h2>
<p><em>bus皆为导入的bus实例</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bus
const bus = new Vue()
// 数据接收组件
// 当前组件接收值则
bus.$on('event1', (val)=>{})
// 数据发出组件
// 当前组件发出值则
bus.$emit('event1', val)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// bus</span>
<span class="hljs-keyword">const</span> bus = <span class="hljs-keyword">new</span> Vue()
<span class="hljs-comment">// 数据接收组件</span>
<span class="hljs-comment">// 当前组件接收值则</span>
bus.$on(<span class="hljs-string">'event1'</span>, (val)=&gt;{})
<span class="hljs-comment">// 数据发出组件</span>
<span class="hljs-comment">// 当前组件发出值则</span>
bus.$emit(<span class="hljs-string">'event1'</span>, val)</code></pre>
<p>可以看出本质是一个vue实例充当事件绑定的媒介。<br>在所有实例中使用其进行数据的通信。</p>
<p>双(多)方使用同名事件进行沟通。</p>
<h2 id="articleHeader6">问题</h2>
<ol>
<li>
<code>$emit</code>时，必须已经<code>$on</code>，否则将无法监听到事件，也就是说对组件是有一定的同时存在的要求的。(注：路由切换时，新路由组件先<code>created</code>，旧路由组件再<code>destoryed</code>，部分情况可以分别写入这两个生命周期，见此<a href="https://segmentfault.com/q/1010000007879907/a-1020000007886896">问题</a>)。</li>
<li>
<code>$on</code>在组件销毁后不会自动解除绑定，若同一组件多次生成则会多次绑定事件，则会一次<code>$emit</code>，多次响应，需额外处理。</li>
<li>数据非“长效”数据，无法保存，只在<code>$emit</code>后生效。</li>
</ol>
<p>所以是否有一种更适用的方案呢？</p>
<h1 id="articleHeader7">特殊的eventBus？</h1>
<h2 id="articleHeader8">demo</h2>
<p>我们先来看个代码，<a href="https://jsfiddle.net/xgrjzsup/4780/" rel="nofollow noreferrer" target="_blank">线上代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="xgrjzsup/4780/" data-typeid="0">点击预览</button>。  <br><em>bus皆为导入的bus实例</em>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bus
const bus = new Vue({
  data () {
    return {
      // 定义数据
      val1: ''
    }
  },
  created () {
    // 绑定监听
    this.$on('updateData1', (val)=>{
      this.val1 = val
    })
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// bus</span>
const bus = new Vue({
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// 定义数据</span>
      val1: <span class="hljs-string">''</span>
    }
  },
  created () {
    <span class="hljs-comment">// 绑定监听</span>
    <span class="hljs-keyword">this</span>.$on(<span class="hljs-string">'updateData1'</span>, (<span class="hljs-keyword">val</span>)=&gt;{
      <span class="hljs-keyword">this</span>.val1 = <span class="hljs-keyword">val</span>
    })
  }
})</code></pre>
<p>// 数据发出组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bus from 'xx/bus'
// 触发在bus中已经绑定好的事件
bus.$emit('update1', '123')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">'xx/bus'</span>
<span class="hljs-comment">// 触发在bus中已经绑定好的事件</span>
bus.$emit(<span class="hljs-string">'update1'</span>, <span class="hljs-string">'123'</span>)</code></pre>
<p>// 数据接收组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
"{{"val1"}}"
// 使用computed接收数据
computed {
  val1 () {
    // 依赖并返回bus中的val1
    return bus.val1
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
"{{"val1"}}"
<span class="hljs-comment">// 使用computed接收数据</span>
computed {
  val1 () {
    <span class="hljs-comment">// 依赖并返回bus中的val1</span>
    <span class="hljs-keyword">return</span> bus.val1
  }
}</code></pre>
<h2 id="articleHeader9">不同</h2>
<ol>
<li>正统的eventBus<strong>只是</strong>用来<strong>绑定</strong>和<strong>触发</strong>事件，并不关心数据，不与数据发生交集。而这个方案多一步将数据直接添加在bus实例上。且事件监听与数据添加需提前定义好。</li>
<li>数据接收方不再使用$on来得知数据变化，而是通过计算属性的特征被动接收。</li>
</ol>
<h2 id="articleHeader10">解决的问题</h2>
<ol>
<li>通信组件需同时存在？数据在bus上存储，所以没有要求。</li>
<li>多次绑定？绑定监听都在bus上，不会重复绑定。</li>
<li>数据只在$emit后可用？使用计算属性直接读取存在bus上的值，不需要再次触发事件。</li>
</ol>
<h1 id="articleHeader11">探讨</h1>
<h2 id="articleHeader12">为什么使用计算属性</h2>
<p>其实应该是为什么不能直接添加到data上，如<code>data1: bus.data1</code>？我们可以再看一段代码，<a href="https://jsfiddle.net/xgrjzsup/4783/" rel="nofollow noreferrer" target="_blank">线上代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="xgrjzsup/4783/" data-typeid="0">点击预览</button>。    <br>将bus修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    // 多一层结构
    val: {
      result: 0
    }
  }
},
created () {
  this.$on('update1', val => {
    console.log('触发1', i1++)
    this.val.result = val
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span> () {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-comment">// 多一层结构</span>
    <span class="hljs-keyword">val</span>: {
      result: <span class="hljs-number">0</span>
    }
  }
},
created () {
  <span class="hljs-keyword">this</span>.$on(<span class="hljs-string">'update1'</span>, <span class="hljs-keyword">val</span> =&gt; {
    console.log(<span class="hljs-string">'触发1'</span>, i1++)
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">val</span>.result = <span class="hljs-keyword">val</span>
  })
}</code></pre>
<p>数据接收组件改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// template
data中获取直接修改值："{{"dataResult"}}"
data中获取直接修改值的父层："{{"dataVal"}}"
computed中依赖直接修改值："{{"computedResult"}}"
// js
data () {
    return {
      // 获取直接修改值
      dataResult: bus.val.result,
      // 获取直接修改值的父层
      dataVal: bus.val
    }
  },
  computed: {
    computedResult () {
      // 依赖直接修改值
      return bus.val.result
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// template</span>
<span class="hljs-keyword">data</span>中获取直接修改值："{{"dataResult"}}"
<span class="hljs-keyword">data</span>中获取直接修改值的父层："{{"dataVal"}}"
computed中依赖直接修改值："{{"computedResult"}}"
<span class="hljs-comment">// js</span>
<span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// 获取直接修改值</span>
      dataResult: bus.<span class="hljs-keyword">val</span>.result,
      <span class="hljs-comment">// 获取直接修改值的父层</span>
      dataVal: bus.<span class="hljs-keyword">val</span>
    }
  },
  computed: {
    computedResult () {
      <span class="hljs-comment">// 依赖直接修改值</span>
      <span class="hljs-keyword">return</span> bus.<span class="hljs-keyword">val</span>.result
    }
  }</code></pre>
<p>可以看到，data中获取直接修改值时值的数据是无法动态响应的。</p>
<h2 id="articleHeader13">为什么要用事件</h2>
<p>其实不用<code>$emit</code>触发，使用<code>bus.val = 1</code>直接赋值也是可以的，那么为什么不这么做呢？</p>
<h1 id="articleHeader14">简化版的vuex</h1>
<p>其实这种<strong>eventBus</strong>就是简化版的vuex。  <br><a href="https://cn.vuejs.org/v2/guide/state-management.html#" rel="nofollow noreferrer" target="_blank">vue文档</a>中有这样一段话：</p>
<blockquote>组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，我们最终达成了 <strong>Flux</strong> 架构。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变。</blockquote>
<p>那么可以用vuex中<code>store</code>对应<code>bus</code>实例，<code>state</code>对应<code>data</code>，<code>action</code>对应<code>事件</code>，<code>dispatch</code>对应<code>$emit</code>。<br>同时<a href="https://vuex.vuejs.org/zh-cn/state.html" rel="nofollow noreferrer" target="_blank">vuex</a>中组件获取数据的方式正是通过计算属性，那么其实<strong>vuex</strong>和<strong>Flux架构</strong>的理解和使用也没有那么难。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue数据传递--我有特殊的实现技巧

## 原文链接
[https://segmentfault.com/a/1190000012808179](https://segmentfault.com/a/1190000012808179)

