---
title: 'vue2.0源码分析之理解响应式架构' 
date: 2019-02-01 2:30:10
hidden: true
slug: o0md76h6d5b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">分享前啰嗦</h2>
<p>我之前介绍过vue1.0如何实现<code>observer</code>和<code>watcher</code>。本想继续写下去，可是vue2.0横空出世..所以<br>  直接看vue2.0吧。这篇文章在公司分享过，终于写出来了。我们采用用最精简的代码，还原vue2.0响应式架构实现<br>  以前写的那篇 <a href="https://segmentfault.com/a/1190000004384515">vue 源码分析之如何实现 observer 和 watcher</a>可以作为本次分享的参考。<br>  不过不看也没关系，但是最好了解下<a href="https://segmentfault.com/a/1190000004346467" target="_blank">Object.defineProperty</a></p>
<h2 id="articleHeader1">本文分享什么</h2>
<p>理解vue2.0的响应式架构，就是下面这张图<br><span class="img-wrap"><img data-src="https://odqs6mk2t.qnssl.com/vuedeptrace.jpg" src="https://static.alili.techhttps://odqs6mk2t.qnssl.com/vuedeptrace.jpg" alt="vuedeptrace.jpg" title="vuedeptrace.jpg" style="cursor: pointer;"></span></p>
<p>顺带介绍他比react快的其中一个原因</p>
<h2 id="articleHeader2">本分实现什么</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = new Vue({
  data: {
    text: &quot;before&quot;,
  },
  //对应的template 为 <div><span>"{{"text"}}"</span></div>
  render(h){
    return h('div', {}, [
      h('span', {}, [this.__toString__(this.text)])
    ])
  }
})
 setTimeout(function(){
   demo.text = &quot;after&quot;
 }, 3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">text</span>: <span class="hljs-string">"before"</span>,
  },
  <span class="hljs-comment">//对应的template 为 &lt;div&gt;&lt;span&gt;"{{"text"}}"&lt;/span&gt;&lt;/div&gt;</span>
  render(h){
    <span class="hljs-keyword">return</span> h(<span class="hljs-string">'div'</span>, {}, [
      h(<span class="hljs-string">'span'</span>, {}, [<span class="hljs-keyword">this</span>.__toString__(<span class="hljs-keyword">this</span>.text)])
    ])
  }
})
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   demo.text = <span class="hljs-string">"after"</span>
 }, <span class="hljs-number">3000</span>)</code></pre>
<p>对应的虚拟dom会从<br><code>&lt;div&gt;&lt;span&gt;before&lt;/span&gt;&lt;/div&gt;</code> 变为 <code>&lt;div&gt;&lt;span&gt;after&lt;/span&gt;&lt;/div&gt;</code><br>好，开始吧！！！</p>
<h2 id="articleHeader3">第一步， 讲data 下面所有属性变为observable</h2>
<p>来来来先看代码吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Vue {
      constructor(options) {
        this.$options = options
        this._data = options.data
        observer(options.data, this._update)
        this._update()
      }
      _update(){
        this.$options.render()
      }
    }


    function observer(value, cb){
      Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
    }

    function defineReactive(obj, key, val, cb) {
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{},
        set:newVal=> {
          cb()
        }
      })
    }

    var demo = new Vue({
      el: '#demo',
      data: {
        text: 123,
      },
      render(){
        console.log(&quot;我要render了&quot;)
      }
    })

     setTimeout(function(){
       demo._data.text = 444
     }, 3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span> </span>{
      <span class="hljs-keyword">constructor</span>(options) {
        <span class="hljs-keyword">this</span>.$options = options
        <span class="hljs-keyword">this</span>._data = options.data
        observer(options.data, <span class="hljs-keyword">this</span>._update)
        <span class="hljs-keyword">this</span>._update()
      }
      _update(){
        <span class="hljs-keyword">this</span>.$options.render()
      }
    }


    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observer</span>(<span class="hljs-params">value, cb</span>)</span>{
      <span class="hljs-built_in">Object</span>.keys(value).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> defineReactive(value, key, value[key] , cb))
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">obj, key, val, cb</span>) </span>{
      <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{},
        <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-params">newVal</span>=&gt;</span> {
          cb()
        }
      })
    }

    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#demo'</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-number">123</span>,
      },
      render(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我要render了"</span>)
      }
    })

     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       demo._data.text = <span class="hljs-number">444</span>
     }, <span class="hljs-number">3000</span>)</code></pre>
<p>为了好演示我们只考虑最简单的情况，如果看了<a href="https://segmentfault.com/a/1190000004384515">vue 源码分析之如何实现 observer 和 watcher</a>可能就会很好理解，不过没关系，我们三言两语再说说，这段代码要实现的功能就是将</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var demo = new Vue({
      el: '#demo',
      data: {
        text: 123,
      },
      render(){
        console.log(&quot;我要render了&quot;)
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#demo'</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-number">123</span>,
      },
      render(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我要render了"</span>)
      }
    })</code></pre>
<p>中<code>data</code> 里面所有的属性置于 observer，然后<code>data</code>里面的属性，比如 <code>text</code> 以改变，就引起<code>_update()</code>函数调用进而重新渲染，是怎样做到的呢，我们知道其实就是赋值的时候就要改变对吧，当我给<code>data</code>下面的<code>text</code> 赋值的时候 <code>set</code> 函数就会触发，这个时候 调用 <code>_update</code> 就ok了，但是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     setTimeout(function(){
       demo._data.text = 444
     }, 3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       demo._data.text = <span class="hljs-number">444</span>
     }, <span class="hljs-number">3000</span>)</code></pre>
<p><code>demo._data.text</code>没有<code>demo.text</code>用着爽，没关系，我们加一个代理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      _proxy(key) {
        const self = this
        Object.defineProperty(self, key, {
          configurable: true,
          enumerable: true,
          get: function proxyGetter () {
            return self._data[key]
          },
          set: function proxySetter (val) {
            self._data[key] = val
          }
        })
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">      _proxy(key) {
        <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
        <span class="hljs-built_in">Object</span>.defineProperty(self, key, {
          <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> self._data[key]
          },
          <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span> (<span class="hljs-params">val</span>) </span>{
            self._data[key] = val
          }
        })
      }</code></pre>
<p>然后在<code>Vue</code>的<code>constructor</code>加上下面这句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Object.keys(options.data).forEach(key => this._proxy(key))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">Object</span>.keys(options.data).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-keyword">this</span>._proxy(key))</code></pre>
<p>第一步先说到这里，我们会发现一个问题，<code>data</code>中任何一个属性的值改变，都会引起<br><code>_update</code>的触发进而重新渲染，属性这显然不够精准啊</p>
<h2 id="articleHeader4">第二步，详细阐述第一步为什么不够精准</h2>
<p>比如考虑下面代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new Vue({
      template: `
        <div>
          <section>
            <span>name:</span> "{{"name"}}"
          </section>
          <section>
            <span>age:</span> "{{"age"}}"
          </section>
        <div>`,
      data: {
        name: 'js',
        age: 24,
        height: 180
      }
    })

    setTimeout(function(){
      demo.height = 181
    }, 3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div&gt;
          &lt;section&gt;
            &lt;span&gt;name:&lt;/span&gt; "{{"name"}}"
          &lt;/section&gt;
          &lt;section&gt;
            &lt;span&gt;age:&lt;/span&gt; "{{"age"}}"
          &lt;/section&gt;
        &lt;div&gt;`</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'js'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">180</span>
      }
    })

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      demo.height = <span class="hljs-number">181</span>
    }, <span class="hljs-number">3000</span>)</code></pre>
<p><code>template</code>里面只用到了<code>data</code>上的两个属性<code>name</code>和<code>age</code>，但是当我改变<code>height</code>的时候，用第一步的代码，会不会触发重新渲染？会！，但其实不需要触发重新渲染，这就是问题所在！！</p>
<h2 id="articleHeader5">第三步，上述问题怎么解决</h2>
<h3 id="articleHeader6">简单说说虚拟 DOM</h3>
<p>首先，template最后都是编译成render函数的(具体怎么做，就不展开说了，以后我会说的)，然后render 函数执行完就会得到一个虚拟DOM，为了好理解我们写写最简单的虚拟DOM</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function VNode(tag, data, children, text) {
      return {
        tag: tag,
        data: data,
        children: children,
        text: text
      }
    }

    class Vue {
      constructor(options) {
        this.$options = options
        const vdom = this._update()
        console.log(vdom)
      }
      _update() {
        return this._render.call(this)
      }
      _render() {
        const vnode = this.$options.render.call(this)
        return vnode
      }
      __h__(tag, attr, children) {
        return VNode(tag, attr, children.map((child)=>{
          if(typeof child === 'string'){
            return VNode(undefined, undefined, undefined, child)
          }else{
            return child
          }
        }))
      }
      __toString__(val) {
        return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
      }
    }


    var demo = new Vue({
      el: '#demo',
      data: {
        text: &quot;before&quot;,
      },
      render(){
        return this.__h__('div', {}, [
          this.__h__('span', {}, [this.__toString__(this.text)])
        ])
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">VNode</span>(<span class="hljs-params">tag, data, children, text</span>) </span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">tag</span>: tag,
        <span class="hljs-attr">data</span>: data,
        <span class="hljs-attr">children</span>: children,
        <span class="hljs-attr">text</span>: text
      }
    }

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span> </span>{
      <span class="hljs-keyword">constructor</span>(options) {
        <span class="hljs-keyword">this</span>.$options = options
        <span class="hljs-keyword">const</span> vdom = <span class="hljs-keyword">this</span>._update()
        <span class="hljs-built_in">console</span>.log(vdom)
      }
      _update() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._render.call(<span class="hljs-keyword">this</span>)
      }
      _render() {
        <span class="hljs-keyword">const</span> vnode = <span class="hljs-keyword">this</span>.$options.render.call(<span class="hljs-keyword">this</span>)
        <span class="hljs-keyword">return</span> vnode
      }
      __h__(tag, attr, children) {
        <span class="hljs-keyword">return</span> VNode(tag, attr, children.map(<span class="hljs-function">(<span class="hljs-params">child</span>)=&gt;</span>{
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> child === <span class="hljs-string">'string'</span>){
            <span class="hljs-keyword">return</span> VNode(<span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, child)
          }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> child
          }
        }))
      }
      __toString__(val) {
        <span class="hljs-keyword">return</span> val == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'object'</span> ? <span class="hljs-built_in">JSON</span>.stringify(val, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>) : <span class="hljs-built_in">String</span>(val);
      }
    }


    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#demo'</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">"before"</span>,
      },
      render(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'div'</span>, {}, [
          <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'span'</span>, {}, [<span class="hljs-keyword">this</span>.__toString__(<span class="hljs-keyword">this</span>.text)])
        ])
      }
    })</code></pre>
<p>我们运行一下，他会输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     {
       tag: 'div',
       data: {},
       children:[
         {
           tag: 'span',
           data: {},
           children: [
             {
               children: undefined,
               data: undefined,
               tag: undefined,
               text: '' // 正常情况为 字符串 before，因为我们为了演示就不写代理的代码，所以这里为空
             }
           ]
         }
       ]
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     {
       <span class="hljs-attr">tag</span>: <span class="hljs-string">'div'</span>,
       <span class="hljs-attr">data</span>: {},
       <span class="hljs-attr">children</span>:[
         {
           <span class="hljs-attr">tag</span>: <span class="hljs-string">'span'</span>,
           <span class="hljs-attr">data</span>: {},
           <span class="hljs-attr">children</span>: [
             {
               <span class="hljs-attr">children</span>: <span class="hljs-literal">undefined</span>,
               <span class="hljs-attr">data</span>: <span class="hljs-literal">undefined</span>,
               <span class="hljs-attr">tag</span>: <span class="hljs-literal">undefined</span>,
               <span class="hljs-attr">text</span>: <span class="hljs-string">''</span> <span class="hljs-comment">// 正常情况为 字符串 before，因为我们为了演示就不写代理的代码，所以这里为空</span>
             }
           ]
         }
       ]
     }</code></pre>
<p>这就是 虚拟最简单虚拟<code>DOM</code>,<code>tag</code>是<code>html</code> 标签名，<code>data</code> 是包含诸如 <code>class</code> 和 <code>style</code> 这些标签上的属性，<code>childen</code>就是子节点，关于虚拟DOM就不展开说了。<br>回到开始的问题，也就是说，我得知道，<code>render</code> 函数里面依赖了vue实例里面哪些变量（只考虑render 就可以，因为template 也会是帮你编译成render）。叙述有点拗口，还是看代码吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var demo = new Vue({
      el: '#demo',
      data: {
        text: &quot;before&quot;,
        name: &quot;123&quot;,
        age: 23
      },
      render(){
        return this.__h__('div', {}, [
          this.__h__('span', {}, [this.__toString__(this.text)])
        ])
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#demo'</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">"before"</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">"123"</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">23</span>
      },
      render(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'div'</span>, {}, [
          <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'span'</span>, {}, [<span class="hljs-keyword">this</span>.__toString__(<span class="hljs-keyword">this</span>.text)])
        ])
      }
    })</code></pre>
<p>就像这段代码，<code>render</code> 函数里其实只依赖<code>text</code>，并没有依赖 <code>name</code>和 <code>age</code>,所以，我们只要<code>text</code>改变的时候<br>我们自动触发 <code>render</code> 函数 让它生成一个虚拟<code>DOM</code>就ok了（剩下的就是这个虚拟DOM和上个虚拟<code>DOM</code>做比对，然后操作真实<code>DOM</code>，只能以后再说了），那么我们正式考虑一下怎么做</p>
<h2 id="articleHeader7">第三步，'touch' 拿到依赖</h2>
<p>回到最上面那张图，我们知道<code>data</code>上的属性设置<code>defineReactive</code>后，修改data 上的值会触发 <code>set</code>。<br>那么我们取<code>data</code>上值是会触发 <code>get</code>了。<br>对，我们可以在上面做做手脚，我们先执行一下<code>render</code>，我们看看<code>data</code>上哪些属性触发了<code>get</code>，我们岂不是就可以知道 <code>render</code> 会依赖<code>data</code> 上哪些变量了。<br>然后我么把这些变量做些手脚，每次这些变量变的时候，我们就触发<code>render</code>。<br>上面这些步骤简单用四个子概括就是 计算依赖。<br>（其实不仅是<code>render</code>，任何一个变量的改别，是因为别的变量改变引起，都可以用上述方法，也就是<code>computed</code> 和 <code>watch</code> 的原理，也是mobx的核心）</p>
<h3 id="articleHeader8">第一步，</h3>
<p>我们写一个依赖收集的类，每一个<code>data</code> 上的对象都有可能被<code>render</code>函数依赖，所以每个属性在<code>defineReactive</code><br>时候就初始化它，简单来说就是这个样子的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Dep {
      constructor() {
        this.subs = []
      }
      add(cb) {
        this.subs.push(cb)
      }
      notify() {
        console.log(this.subs);
        this.subs.forEach((cb) => cb())
      }
    }
    function defineReactive(obj, key, val, cb) {
      const dep = new Dep()
      Object.defineProperty(obj, key, {
        // 省略
      })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
      <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.subs = []
      }
      add(cb) {
        <span class="hljs-keyword">this</span>.subs.push(cb)
      }
      notify() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.subs);
        <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function">(<span class="hljs-params">cb</span>) =&gt;</span> cb())
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">obj, key, val, cb</span>) </span>{
      <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()
      <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        <span class="hljs-comment">// 省略</span>
      })
    }</code></pre>
<p>然后，当执行<code>render</code> 函数去'touch'依赖的时候，依赖到的变量get就会被执行，然后我们就可以把这个 <code>render</code> 函数加到 <code>subs</code> 里面去了。<br>当我们，<code>set</code> 的时候 我们就执行 <code>notify</code> 将所有的subs数组里的函数执行，其中就包含<code>render</code> 的执行。<br>至此就完成了整个图，好我们将所有的代码展示出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function VNode(tag, data, children, text) {
      return {
        tag: tag,
        data: data,
        children: children,
        text: text
      }
    }

    class Vue {
      constructor(options) {
        this.$options = options
        this._data = options.data
        Object.keys(options.data).forEach(key => this._proxy(key))
        observer(options.data)
        const vdom = watch(this, this._render.bind(this), this._update.bind(this))
        console.log(vdom)
      }
      _proxy(key) {
        const self = this
        Object.defineProperty(self, key, {
          configurable: true,
          enumerable: true,
          get: function proxyGetter () {
            return self._data[key]
          },
          set: function proxySetter (val) {
            self._data.text = val
          }
        })
      }
      _update() {
        console.log(&quot;我需要更新&quot;);
        const vdom = this._render.call(this)
        console.log(vdom);
      }
      _render() {
        return this.$options.render.call(this)
      }
      __h__(tag, attr, children) {
        return VNode(tag, attr, children.map((child)=>{
          if(typeof child === 'string'){
            return VNode(undefined, undefined, undefined, child)
          }else{
            return child
          }
        }))
      }
      __toString__(val) {
        return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
      }
    }

    function observer(value, cb){
      Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
    }

    function defineReactive(obj, key, val, cb) {
      const dep = new Dep()
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
          if(Dep.target){
            dep.add(Dep.target)
          }
          return val
        },
        set: newVal => {
          if(newVal === val)
            return
          val = newVal
          dep.notify()
        }
      })
    }
    function watch(vm, exp, cb){
      Dep.target = cb
      return exp()
    }

    class Dep {
      constructor() {
        this.subs = []
      }
      add(cb) {
        this.subs.push(cb)
      }
      notify() {
        this.subs.forEach((cb) => cb())
      }
    }
    Dep.target = null


    var demo = new Vue({
      el: '#demo',
      data: {
        text: &quot;before&quot;,
      },
      render(){
        return this.__h__('div', {}, [
          this.__h__('span', {}, [this.__toString__(this.text)])
        ])
      }
    })


     setTimeout(function(){
       demo.text = &quot;after&quot;
     }, 3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">VNode</span>(<span class="hljs-params">tag, data, children, text</span>) </span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">tag</span>: tag,
        <span class="hljs-attr">data</span>: data,
        <span class="hljs-attr">children</span>: children,
        <span class="hljs-attr">text</span>: text
      }
    }

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span> </span>{
      <span class="hljs-keyword">constructor</span>(options) {
        <span class="hljs-keyword">this</span>.$options = options
        <span class="hljs-keyword">this</span>._data = options.data
        <span class="hljs-built_in">Object</span>.keys(options.data).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-keyword">this</span>._proxy(key))
        observer(options.data)
        <span class="hljs-keyword">const</span> vdom = watch(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>._render.bind(<span class="hljs-keyword">this</span>), <span class="hljs-keyword">this</span>._update.bind(<span class="hljs-keyword">this</span>))
        <span class="hljs-built_in">console</span>.log(vdom)
      }
      _proxy(key) {
        <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
        <span class="hljs-built_in">Object</span>.defineProperty(self, key, {
          <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> self._data[key]
          },
          <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span> (<span class="hljs-params">val</span>) </span>{
            self._data.text = val
          }
        })
      }
      _update() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我需要更新"</span>);
        <span class="hljs-keyword">const</span> vdom = <span class="hljs-keyword">this</span>._render.call(<span class="hljs-keyword">this</span>)
        <span class="hljs-built_in">console</span>.log(vdom);
      }
      _render() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$options.render.call(<span class="hljs-keyword">this</span>)
      }
      __h__(tag, attr, children) {
        <span class="hljs-keyword">return</span> VNode(tag, attr, children.map(<span class="hljs-function">(<span class="hljs-params">child</span>)=&gt;</span>{
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> child === <span class="hljs-string">'string'</span>){
            <span class="hljs-keyword">return</span> VNode(<span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, child)
          }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> child
          }
        }))
      }
      __toString__(val) {
        <span class="hljs-keyword">return</span> val == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'object'</span> ? <span class="hljs-built_in">JSON</span>.stringify(val, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>) : <span class="hljs-built_in">String</span>(val);
      }
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observer</span>(<span class="hljs-params">value, cb</span>)</span>{
      <span class="hljs-built_in">Object</span>.keys(value).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> defineReactive(value, key, value[key] , cb))
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">obj, key, val, cb</span>) </span>{
      <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()
      <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-keyword">if</span>(Dep.target){
            dep.add(Dep.target)
          }
          <span class="hljs-keyword">return</span> val
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-params">newVal</span> =&gt;</span> {
          <span class="hljs-keyword">if</span>(newVal === val)
            <span class="hljs-keyword">return</span>
          val = newVal
          dep.notify()
        }
      })
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">vm, exp, cb</span>)</span>{
      Dep.target = cb
      <span class="hljs-keyword">return</span> exp()
    }

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
      <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.subs = []
      }
      add(cb) {
        <span class="hljs-keyword">this</span>.subs.push(cb)
      }
      notify() {
        <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function">(<span class="hljs-params">cb</span>) =&gt;</span> cb())
      }
    }
    Dep.target = <span class="hljs-literal">null</span>


    <span class="hljs-keyword">var</span> demo = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#demo'</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">"before"</span>,
      },
      render(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'div'</span>, {}, [
          <span class="hljs-keyword">this</span>.__h__(<span class="hljs-string">'span'</span>, {}, [<span class="hljs-keyword">this</span>.__toString__(<span class="hljs-keyword">this</span>.text)])
        ])
      }
    })


     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       demo.text = <span class="hljs-string">"after"</span>
     }, <span class="hljs-number">3000</span>)</code></pre>
<p>我们看一下运行结果<br><span class="img-wrap"><img data-src="https://odqs6mk2t.qnssl.com/D4A9A9B8-03CA-4A73-A12F-30409E08D99D.png" src="https://static.alili.techhttps://odqs6mk2t.qnssl.com/D4A9A9B8-03CA-4A73-A12F-30409E08D99D.png" alt="D4A9A9B8-03CA-4A73-A12F-30409E08D99D.png" title="D4A9A9B8-03CA-4A73-A12F-30409E08D99D.png" style="cursor: pointer;"></span></p>
<p>好我们解释一下 <code>Dep.target</code> 因为我们得区分是，普通的<code>get</code>，还是在查找依赖的时候的<code>get</code>，<br>所有我们在查找依赖时候，我们将</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function watch(vm, exp, cb){
      Dep.target = cb
      return exp()
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">watch</span>(<span class="hljs-params">vm, exp, cb</span>)</span>{
      Dep.target = cb
      <span class="hljs-keyword">return</span> exp()
    }</code></pre>
<p><code>Dep.target</code> 赋值，相当于 flag 一下，然后  <code>get</code> 的时候</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       get: () => {
          if (Dep.target) {
            dep.add(Dep.target)
          }
          return val
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">       get: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (Dep.target) {
            dep.add(Dep.target)
          }
          <span class="hljs-keyword">return</span> val
        },</code></pre>
<p>判断一下，就好了。<br>到现在为止，我们再看那张图是不是就清楚很多了？</p>
<h2 id="articleHeader9">总结</h2>
<p>我非常喜欢，vue2.0 以上代码为了好展示，都采用最简单的方式呈现。<br>  不过整个代码执行过程，甚至是命名方式都和vue2.0一样<br>  对比react，vue2.0 自动帮你监测依赖，自动帮你重新渲染，而<br>  react 要实现性能最大化，要做大量工作，比如我以前分享的<br><a href="https://segmentfault.com/a/1190000004290333" target="_blank">react如何性能达到最大化(前传)，暨react为啥非得使用immutable.js</a><br><a href="https://segmentfault.com/a/1190000004295639">react 实现pure render的时候，bind(this)隐患</a>。<br>  而 vue2.0 天然帮你做到了最优,而且对于像万年不变的 如标签上静态的<code>class</code>属性，<br>  vue2.0 在重新渲染后做diff 的时候是不比较的，vue2.0比 达到性能最大化的react 还要快的一个原因<br>  然后源码<a href="https://github.com/georgebbbb/fakeVue/blob/master/vue2.0/index.js" rel="nofollow noreferrer" target="_blank">在此</a>，喜欢的记得给个 star 哦?<br>  后续，我会简单聊聊，vue2.0的diff。<br>  如果有疑问，可以在评论区留言哈</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0源码分析之理解响应式架构

## 原文链接
[https://segmentfault.com/a/1190000007334535](https://segmentfault.com/a/1190000007334535)

