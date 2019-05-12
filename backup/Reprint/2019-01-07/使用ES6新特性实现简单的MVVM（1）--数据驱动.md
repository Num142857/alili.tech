---
title: '使用ES6新特性实现简单的MVVM（1）--数据驱动' 
date: 2019-01-07 2:30:11
hidden: true
slug: xn1fqi6tdm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>尝试使用es6新特性，自己来实现一个mvvm及vue的各种特性。<br>相关代码放在<a href="https://github.com/callmedadaxin/proxy-vue" rel="nofollow noreferrer" target="_blank">github</a>，会持续更新，欢迎赏个star。<br>本篇文章为系列文章的第一篇，会比较容易理解，后续会持续更新后面的记录。<br>文章首发于<a href="http://callmedadaxin.github.io/2017/07/25/%E4%BD%BF%E7%94%A8ES6%E6%96%B0%E7%89%B9%E6%80%A7%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E7%9A%84MVVM%EF%BC%881%EF%BC%89-%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/" rel="nofollow noreferrer" target="_blank">本人博客</a></p></blockquote>
<h2 id="articleHeader0">最简单的watcher</h2>
<p>从开始接触Vue开始，我们便对它的“数据响应”赞叹不绝，那么我们首先，来实现一个最简单的watcher，来监听数据，以进行对应的操作，类似后续会涉及的dom操作等。</p>
<h3 id="articleHeader1">Proxy</h3>
<p>我们都知道，Vue使用Object.defineProperty来进行数据监听，监听obj的get和set方法。在ES6中，Proxy可以拦截某些操作的默认行为，也就是对目标对象的访问进行拦截，过滤和改写。我们可以利用这个特性来实现对数据的监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const watcher = (obj, fn) => {
  return new Proxy(obj, {
    get (target, prop, receiver) {
      return Reflect.get(target, prop, receiver)
    },

    set (target, prop, value) {
      const oldValue = Reflect.get(target, prop, receiver)
      const result = Reflect.set(target, prop, value)

      fn(value, oldValue)

      return result
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> watcher = (obj, fn) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Proxy(obj, {
    <span class="hljs-keyword">get</span> (target, prop, receiver) {
      <span class="hljs-keyword">return</span> Reflect.<span class="hljs-keyword">get</span>(target, prop, receiver)
    },

    <span class="hljs-keyword">set</span> (target, prop, <span class="hljs-keyword">value</span>) {
      <span class="hljs-keyword">const</span> oldValue = Reflect.<span class="hljs-keyword">get</span>(target, prop, receiver)
      <span class="hljs-keyword">const</span> result = Reflect.<span class="hljs-keyword">set</span>(target, prop, <span class="hljs-keyword">value</span>)

      fn(<span class="hljs-keyword">value</span>, oldValue)

      <span class="hljs-keyword">return</span> result
    }
  })
}</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = watcher({ a: 1 }, (val, oldVal) => {
  console.log('old =>> ', oldVal)
  console.log('new =>> ', val)
})

obj.a = 2
// old =>> , 1
// new =>> , 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> obj = watcher({ a: <span class="hljs-number">1</span> }, <span class="hljs-function">(<span class="hljs-params">val, oldVal</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'old =&gt;&gt; '</span>, oldVal)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new =&gt;&gt; '</span>, val)
})

obj.a = <span class="hljs-number">2</span>
<span class="hljs-comment">// old =&gt;&gt; , 1</span>
<span class="hljs-comment">// new =&gt;&gt; , 2</span></code></pre>
<h2 id="articleHeader2">简单的Dom操作</h2>
<p>我们已经可以对简单的数据操作进行监听（虽然还有各种问题），接下来，我们只要在监听到dom后进行数据操作即可。解析模板什么的我们就先不做了，我们可以继续利用Proxy实现一个dom辅助函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dom = new Proxy({}, {
  get (target, tagName) {
    return (attrs = {}, ...childrens) => {
      // 创建节点
      const elem = document.createElement(tagName)

      // 添加attribute
      attrs.forEach(attr => elem.addAttribute(attr, attrs[attr])

      // 添加子元素
      childrens.forEach(child => {
        const child = typeof child === 'string'
          ? document.createTextNode(child) 
          : child

        elem.appendChild(child)
      })

      return elem
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> dom = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, {
  get (target, tagName) {
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">attrs = {}, ...childrens</span>) =&gt;</span> {
      <span class="hljs-comment">// 创建节点</span>
      <span class="hljs-keyword">const</span> elem = <span class="hljs-built_in">document</span>.createElement(tagName)

      <span class="hljs-comment">// 添加attribute</span>
      attrs.forEach(<span class="hljs-function"><span class="hljs-params">attr</span> =&gt;</span> elem.addAttribute(attr, attrs[attr])

      <span class="hljs-comment">// 添加子元素</span>
      childrens.forEach(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> child = <span class="hljs-keyword">typeof</span> child === <span class="hljs-string">'string'</span>
          ? <span class="hljs-built_in">document</span>.createTextNode(child) 
          : child

        elem.appendChild(child)
      })

      <span class="hljs-keyword">return</span> elem
    }
  }
})</code></pre>
<p>也就是说，我们为dom的各属性进行监听，当访问对应的节点时，我们创建并且为他添加各种属性等：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dom.div(
  {class: 'wrap'}, 
  'helloworld',
  dom.a({
    href: 'https://www.360.cn'
  }, 'welcome to 360')
)

// 输出
<div class=&quot;wrap&quot;>
  helloworld
  <a href=&quot;https://www.360.cn&quot;>welcome to 360</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>dom.div(
  {<span class="hljs-class"><span class="hljs-keyword">class</span></span>: <span class="hljs-symbol">'wra</span>p'}, 
  <span class="hljs-symbol">'helloworl</span>d',
  dom.a({
    href: <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//www.360.cn'</span>
  }, <span class="hljs-symbol">'welcome</span> to <span class="hljs-number">360</span>')
)

<span class="hljs-comment">// 输出</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"wrap"</span>&gt;
  helloworld
  &lt;a href=<span class="hljs-string">"https://www.360.cn"</span>&gt;welcome to <span class="hljs-number">360</span>&lt;/a&gt;
&lt;/div&gt;</code></pre>
<h2 id="articleHeader3">拼接基础框架</h2>
<p>我们在这里给我们的这个小架子起名为'W'，让它可以真正的运行起来。类似Vue的语法，我们需要在进行实例化的时候，watch我们的data,并且更新dom。类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vm = new W({
  el: 'body',
  data () {
    return {
      msg: 'hello world'
    }
  },
  render () {
    return dom.div({
      class: 'wrap'
    },
      dom.a({
        href: 'http://www.360.cn'
      }, this.msg)
    )
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const vm = new W({
  el: <span class="hljs-string">'body'</span>,
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      msg: <span class="hljs-string">'hello world'</span>
    }
  },
  render () {
    <span class="hljs-keyword">return</span> dom.div({
      <span class="hljs-class"><span class="hljs-keyword">class</span>: <span class="hljs-type">'wrap'</span></span>
    },
      dom.a({
        href: <span class="hljs-string">'http://www.360.cn'</span>
      }, <span class="hljs-keyword">this</span>.msg)
    )
  }
})</code></pre>
<p>因此，我们需要实现这样一个类，来处理我们的参数，并进行实例的初始化，监听，以及渲染控制等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class W {
  constructor (config) {}

  /**
   * observe data
   */
  _initData () {}

  /**
   * 渲染节点
   */
  _renderDom () {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">W</span> </span>{
  <span class="hljs-keyword">constructor</span> (config) {}

  <span class="hljs-comment">/**
   * observe data
   */</span>
  _initData () {}

  <span class="hljs-comment">/**
   * 渲染节点
   */</span>
  _renderDom () {}
}</code></pre>
<h3 id="articleHeader4">初始化数据</h3>
<p>首先，我们进行数据初始化，将数据置为observable,在对其修改的时候进行监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import watcher from './data.js'

class W {
  constructor (config) {
    const { data = () => {} } = config

    this._config = config
    this._initData(data)

    return this._vm
  }
}

_initData (data) {
  this._vm = watcher(Object.assign({}, this, data()), this._renderDom.bind(this))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> watcher from <span class="hljs-string">'./data.js'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">W</span> </span>{
  <span class="hljs-keyword">constructor</span> (config) {
    const { <span class="hljs-keyword">data</span> = () =&gt; {} } = config

    <span class="hljs-keyword">this</span>._config = config
    <span class="hljs-keyword">this</span>._initData(<span class="hljs-keyword">data</span>)

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
  }
}

_initData (<span class="hljs-keyword">data</span>) {
  <span class="hljs-keyword">this</span>._vm = watcher(Object.assign({}, <span class="hljs-keyword">this</span>, <span class="hljs-keyword">data</span>()), <span class="hljs-keyword">this</span>._renderDom.bind(<span class="hljs-keyword">this</span>))
}</code></pre>
<p>在这里我们需要注意两点：</p>
<ol>
<li><p>我们的data参数为一个function<br>这个原因在vue官方文档已经说过，当我们直接使用对象的时候，不同的实例间会共享同一个对象，导致出现对一个组件进行修改，另一个组件也进行修改的问题。具体可以查看<a href="https://cn.vuejs.org/v2/guide/components.html#data-" rel="nofollow noreferrer" target="_blank">data-必须是函数</a></p></li>
<li><p>我们返回的是this._vm而不是this<br>我们这里做了两步操作，首先将this与data进行合并，再将整个对象进行监听,并赋值到_vm属性上。</p></li>
</ol>
<p>这样，我们通过new W()初始化的实例，则可以访问到我们的data属性及方法，并且具有数据驱动的特性了。</p>
<h3 id="articleHeader5">更新DOM</h3>
<p>我们已经为watcher的回调添加了dom更新的事件，我们只要在这里执行render函数，并挂载到对应的el上即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { render, el } = this._config
const targetEl = document.querySelector(el)
const renderDom = render()

targetEl.innerHTML = ''
targetEl.appendChild(renderDom)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> { render, el } = <span class="hljs-keyword">this</span>._config
<span class="hljs-keyword">const</span> targetEl = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(el)
<span class="hljs-keyword">const</span> renderDom = render()

targetEl.innerHTML = <span class="hljs-string">''</span>
targetEl.appendChild(renderDom)</code></pre>
<h3 id="articleHeader6">绑定this</h3>
<p>我们会发现，我们在config的render函数中，使用了this.msg来访问data的msg属性，因此我们需要实现在各组件中，通过this可以访问到本实例的特性。我猜你已经想到了，我们可以使用bind,call和apply来实现它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 为所有的函数绑定this
 */
bindVM () {
  const { _config } = this

  for(let key of Object.keys(_config)) {
    const val = _config[key]
    if (typeof(val) === 'function') {
      _config[key] = val.bind(this._vm)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-comment">/**
 * 为所有的函数绑定this
 */</span>
bindVM () {
  <span class="hljs-keyword">const</span> { <span class="hljs-number">_</span><span class="hljs-keyword">config</span> } = <span class="hljs-keyword">this</span>

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key of Object<span class="hljs-variable">.keys</span>(<span class="hljs-number">_</span><span class="hljs-keyword">config</span>)) {
    <span class="hljs-keyword">const</span> val = <span class="hljs-number">_</span><span class="hljs-keyword">config</span>[key]
    <span class="hljs-keyword">if</span> (typeof(val) === '<span class="hljs-keyword">function</span>') {
      <span class="hljs-number">_</span><span class="hljs-keyword">config</span>[key] = val<span class="hljs-variable">.bind</span>(<span class="hljs-keyword">this</span><span class="hljs-variable">._vm</span>)
    }
  }
}</code></pre>
<h2 id="articleHeader7">测试</h2>
<p>简单的架子拼接完成，我们来进行测试下我们的成果，我们需要实现两点功能：</p>
<ol>
<li><p>可以按照我们的render函数正常挂载，并可访问到data上的数据</p></li>
<li><p>通过对实例进行修改，修改会自动更新到节点上</p></li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vm = new W({
  el: 'body',
  data () {
    return {
      msg: 'hello world'
    }
  },
  render () {
    return dom.div({
      class: 'wrap'
    },
      dom.a({
        href: 'http://www.360.cn'
      }, this.msg)
    )
  }
})

// 测试修改vm
setInterval(_ => {
  vm.msg = 'hello world =>>>' + new Date()
}, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> W({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'body'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'hello world'</span>
    }
  },
  render () {
    <span class="hljs-keyword">return</span> dom.div({
      <span class="hljs-attr">class</span>: <span class="hljs-string">'wrap'</span>
    },
      dom.a({
        <span class="hljs-attr">href</span>: <span class="hljs-string">'http://www.360.cn'</span>
      }, <span class="hljs-keyword">this</span>.msg)
    )
  }
})

<span class="hljs-comment">// 测试修改vm</span>
setInterval(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  vm.msg = <span class="hljs-string">'hello world =&gt;&gt;&gt;'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
}, <span class="hljs-number">1000</span>)</code></pre>
<p>结果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010345391" src="https://static.alili.tech/img/remote/1460000010345391" alt="结果" title="结果" style="cursor: pointer;"></span></p>
<p>最基本的功能已经实现啦！</p>
<h2 id="articleHeader8">结语</h2>
<p>本次我们只实现了最最最简单的数据驱动功能，后续还有很多需要进行处理，我们也会对其一一进行梳理和实现，大家可以持续关注下，例如：</p>
<ul>
<li><p>数组变动监听</p></li>
<li><p>object深度监听</p></li>
<li><p>更新队列</p></li>
<li><p>render过程中记录仅相关的属性</p></li>
<li><p>模板渲染</p></li>
<li><p>v-model</p></li>
<li><p>...等等</p></li>
</ul>
<p>相关代码放在<a href="https://github.com/callmedadaxin/proxy-vue" rel="nofollow noreferrer" target="_blank">github</a>，会持续更新，欢迎赏个star。</p>
<p>敬请期待！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用ES6新特性实现简单的MVVM（1）--数据驱动

## 原文链接
[https://segmentfault.com/a/1190000010345388](https://segmentfault.com/a/1190000010345388)

