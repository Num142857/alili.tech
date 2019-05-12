---
title: 'Vue主要原理最简实现与逻辑梳理' 
date: 2018-12-07 2:30:09
hidden: true
slug: crelrix10wu
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue的主要原理中主要用到了定义的这么几个函数Dep，Watcher，observer。<br>我们来使用这几个函数简单的实现一下vue构造函数数据绑定和相互依赖部分，梳理一下它们之间的关系。<br>省略了编译部分和proxy代理与其他的一些复杂逻辑。</p>
<h1 id="articleHeader0">Dep</h1>
<p>Dep是依赖类，简要实现为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dep {
  constructor () {
    // 放当时属性的观察者
    this.subs = []
  }
}
// target 用来挂载当时的watcher观察者
Dep.target = null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-comment">// 放当时属性的观察者</span>
    <span class="hljs-keyword">this</span>.subs = []
  }
}
<span class="hljs-comment">// target 用来挂载当时的watcher观察者</span>
Dep.target = <span class="hljs-literal">null</span></code></pre>
<h1 id="articleHeader1">observer</h1>
<p>做属性劫持，并做点其他事情</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function observer (vm, key, val) {
  let dep = new Dep()
  Object.defineProperty(vm, key, {
    /**
     * get主要做两个事情
     * 1. 收集观察当前key的wathcer(即依赖当前key的操作)
     * 2. 获取值
     */
    get () {
      // 这是作用1
      if (Dep.target) {
        dep.subs.push(Dep.target)
      }
      // 这是作用2
      return val
    },
    /**
     * set也是两个事情
     * 1. 修改目标值
     * 2. 执行依赖当前key的watcher
     */
    set (newVal) {
      // 这是作用1
      val = newVal
      // 这是作用2
      for(cb of dep.subs) {
        cb.call(vm)
      }
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observer</span> (<span class="hljs-params">vm, key, val</span>) </span>{
  <span class="hljs-keyword">let</span> dep = <span class="hljs-keyword">new</span> Dep()
  <span class="hljs-built_in">Object</span>.defineProperty(vm, key, {
    <span class="hljs-comment">/**
     * get主要做两个事情
     * 1. 收集观察当前key的wathcer(即依赖当前key的操作)
     * 2. 获取值
     */</span>
    get () {
      <span class="hljs-comment">// 这是作用1</span>
      <span class="hljs-keyword">if</span> (Dep.target) {
        dep.subs.push(Dep.target)
      }
      <span class="hljs-comment">// 这是作用2</span>
      <span class="hljs-keyword">return</span> val
    },
    <span class="hljs-comment">/**
     * set也是两个事情
     * 1. 修改目标值
     * 2. 执行依赖当前key的watcher
     */</span>
    set (newVal) {
      <span class="hljs-comment">// 这是作用1</span>
      val = newVal
      <span class="hljs-comment">// 这是作用2</span>
      <span class="hljs-keyword">for</span>(cb <span class="hljs-keyword">of</span> dep.subs) {
        cb.call(vm)
      }
    }
  })
}</code></pre>
<h1 id="articleHeader2">Watcher</h1>
<p>Watcher是观察者类，用来创建依赖某属性的操作（如指令，渲染，计算属性等）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Watcher {
  /**
   * vm: 实例
   * cb: 依赖某属性的操作函数
   */
  constructor (vm, cb) {
    // 把当前的操作挂载到Dep上
    Dep.target = cb
    /**
     * 执行操作，两个作用
     * 1. 进行操作的初始化
     * 2. 触发属性的get方法，使当前cb被收集
     */
    cb.call(vm)
    Dep.target = null
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  <span class="hljs-comment">/**
   * vm: 实例
   * cb: 依赖某属性的操作函数
   */</span>
  <span class="hljs-keyword">constructor</span> (vm, cb) {
    <span class="hljs-comment">// 把当前的操作挂载到Dep上</span>
    Dep.target = cb
    <span class="hljs-comment">/**
     * 执行操作，两个作用
     * 1. 进行操作的初始化
     * 2. 触发属性的get方法，使当前cb被收集
     */</span>
    cb.call(vm)
    Dep.target = <span class="hljs-literal">null</span>
  }
}</code></pre>
<h1 id="articleHeader3">demo</h1>
<ul>
<li><a href="https://jsfiddle.net/Lmrgg5s6/1/" rel="nofollow noreferrer" target="_blank">jsfiddle在线代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="Lmrgg5s6/1/" data-typeid="0">点击预览</button></li>
<li><a href="https://github.com/toBeTheLight/every-code/blob/master/vue/Vue/demo.html" rel="nofollow noreferrer" target="_blank">另一个是GitHub代码</a></li>
</ul>
<p>那么我们就使用上面定义好的函数写个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <p class=&quot;text&quot;></p>
<div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let vm = new Vue({
  // 假设有data
  data: {msg: 1},
  // 有某个v-text操作，我们抽象为vText函数，依赖属性msg(代表所有依赖其他属性的操作)
  renderFun: {
    vText () {
      document.querySelector('.text').innerText = this.msg
    }
  }
})
// 修改vue实例的值，观察变化
vm.msg = 333" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">// 假设有data</span>
  data: {<span class="hljs-attr">msg</span>: <span class="hljs-number">1</span>},
  <span class="hljs-comment">// 有某个v-text操作，我们抽象为vText函数，依赖属性msg(代表所有依赖其他属性的操作)</span>
  renderFun: {
    vText () {
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.text'</span>).innerText = <span class="hljs-keyword">this</span>.msg
    }
  }
})
<span class="hljs-comment">// 修改vue实例的值，观察变化</span>
vm.msg = <span class="hljs-number">333</span></code></pre>
<p>那么我们也写一个vue的简易构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Vue {
  constructor (options) {
    let data = options.data
    let renderFun = options.renderFun
    // initData
    Object.keys(data).forEach(key => {
      observer(this, key, data[key])
    })
    // 模拟计算属性，watcher，指令等依赖属性的操作
    Object.keys(renderFun).forEach(key => {
      new Watcher(this, renderFun[key])
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span> </span>{
  <span class="hljs-keyword">constructor</span> (options) {
    <span class="hljs-keyword">let</span> data = options.data
    <span class="hljs-keyword">let</span> renderFun = options.renderFun
    <span class="hljs-comment">// initData</span>
    <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      observer(<span class="hljs-keyword">this</span>, key, data[key])
    })
    <span class="hljs-comment">// 模拟计算属性，watcher，指令等依赖属性的操作</span>
    <span class="hljs-built_in">Object</span>.keys(renderFun).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      <span class="hljs-keyword">new</span> Watcher(<span class="hljs-keyword">this</span>, renderFun[key])
    })
  }
}</code></pre>
<h1 id="articleHeader4">执行过程</h1>
<p>完整的代码可以看demo部分的两个链接</p>
<ol>
<li>创建vue实例，执行<code>new Vue()</code>
</li>
<li>
<p>对data进行初始化，对<code>data</code>中属性进行属性劫持</p>
<ul><li>劫持过程中，在闭包内创建对当前属性的依赖队列（dep.subs）和值（val）。<code>get</code>进行观察者<code>watcher</code>的收集和值得获取；<code>set</code>进行值的更新和依赖队列中<code>watcher</code>的执行</li></ul>
</li>
<li>对编译过程中如<code>computed\watcher</code>或<code>模板编译</code>过程中的<code>指令</code>函数进行初始化，我们以<code>renderFun</code>代替</li>
<li>针对<code>renderFun</code>中的每个功能函数进行<code>new Watcher()</code>工作</li>
<li>
<p>以<code>vText</code>为例子，在<code>new Wathcer()</code>过程中</p>
<ol>
<li>将<code>vText</code>挂载到全局通用的<code>Dep.target</code>上</li>
<li>执行<code>vText</code>，其中有读<code>vm.msg</code>的操作，则触发msg属性的get，进入<code>Dep.target</code>判断，将<code>Dep.target</code>即<code>vText</code>收集进<code>msg</code>的<code>subs</code>依赖队列中，此时<code>vText</code>执行完毕，页面<code>innetText</code>被修改</li>
<li>将<code>Dep.target</code>置空</li>
</ol>
</li>
<li>
<p>执行<code>vm.msg = 333</code>，则触发<code>msg</code>的<code>set</code></p>
<ol>
<li>
<code>set</code>先修改<code>msg</code>的值</li>
<li>再执行<code>msg</code>依赖队列中的所有<code>watcher</code>的函数，即<code>vText</code>，页面的<code>innerText</code>被同步更新</li>
</ol>
</li>
</ol>
<h1 id="articleHeader5">总结</h1>
<p>总之几者的关系就是在<code>observer</code>的<code>get</code>中将对当前属性的<code>watcher</code>收集进<code>dep</code>，在<code>observer</code>的<code>set</code>中执行收集到的<code>watcher</code>。</p>
<p>而vue的真正的执行过程绝不是上面写的这么简单，比如watcher的执行就绝不是简单的遍历执行，而且还对observer进行了很大程度的简化。我们还省略了诸如<code>_proxy</code>、<code>defineReactive</code>等出现频率较高的函数。写这样一个最简实现主要是为了梳理一下主干，降低阅读源码的难度。</p>
<p>??????????????????????????????????</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue主要原理最简实现与逻辑梳理

## 原文链接
[https://segmentfault.com/a/1190000014195710](https://segmentfault.com/a/1190000014195710)

