---
title: 'Vue 实例中的生命周期钩子详解' 
date: 2019-01-18 2:30:34
hidden: true
slug: 60x63vkcyvv
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue 实例中的生命周期钩子</h1>
<p>Vue 框架的入口就是 Vue 实例，其实就是框架中的 view model ，它包含页面中的业务<br>处理逻辑、数据模型等，它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的<br>过程时更容易形成好的逻辑。</p>
<h2 id="articleHeader1">Vue 实例</h2>
<p>在文档中经常会使用 vm 这个变量名表示 Vue 实例，在实例化 Vue 时，需要传入一个选<br>项对象，它可以包含数据(data)、模板(template)、挂载元素(el)、方法(methods)、生<br>命周期钩子(lifecyclehook)等选项。</p>
<h3 id="articleHeader2">Vue 实例化的选项</h3>
<p>需要注意的是含 this 的函数大多不要使用箭头函数，因为我们期望 this 指向 Vue 实例。</p>
<h3 id="articleHeader3">data</h3>
<p>Vue 实例的数据都保存在 data 对象中，Vue 将会递归将 data 的属性转换为 getter/setter，<br>从而让 data 的属性能够响应数据变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = { a: 1 }
// 直接创建一个实例
var vm = new Vue({
  data: data
})
vm.a // -> 1
vm.$data === data // -> true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span> = { a: <span class="hljs-number">1</span> }
<span class="hljs-comment">// 直接创建一个实例</span>
<span class="hljs-built_in">var</span> vm = <span class="hljs-literal">new</span> Vue({
  <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>
})
vm.a <span class="hljs-comment">// -&gt; 1</span>
vm.$data === <span class="hljs-built_in">data</span> <span class="hljs-comment">// -&gt; true</span>
</code></pre>
<p>这样数据就绑定在 HTML 中，Vue 框架监视 data 的数据变化，自动更新 HTML 内容。</p>
<h3 id="articleHeader4">computed</h3>
<blockquote><p>计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue</p></blockquote>
<p>实例。<a href="https://cn.vuejs.org/v2/api/#" rel="nofollow noreferrer" target="_blank">官方API</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取，值只须为函数
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // -> 2
vm.aPlus = 3
vm.a       // -> 2
vm.aDouble // -> 4
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  data: { a: <span class="hljs-number">1</span> },
  computed: {
    <span class="hljs-comment">// 仅读取，值只须为函数</span>
    aDouble: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a * <span class="hljs-number">2</span>
    },
    <span class="hljs-comment">// 读取和设置</span>
    aPlus: {
      <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-number">1</span>
      },
      <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">this</span>.a = v - <span class="hljs-number">1</span>
      }
    }
  }
})
vm.aPlus   <span class="hljs-comment">// -&gt; 2</span>
vm.aPlus = <span class="hljs-number">3</span>
vm.a       <span class="hljs-comment">// -&gt; 2</span>
vm.aDouble <span class="hljs-comment">// -&gt; 4</span>
</code></pre>
<p>这里可以省略setter,如果省略了setter，那么值就可以是普通函数，但是必须有返回值。</p>
<h3 id="articleHeader5">methods</h3>
<blockquote><p>methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达<br>式中使用。方法中的 this 自动绑定为 Vue 实例。<a href="https://cn.vuejs.org/v2/api/#" rel="nofollow noreferrer" target="_blank">官方API</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  dat<span class="hljs-variable">a:</span> { <span class="hljs-variable">a:</span> <span class="hljs-number">1</span> },
  method<span class="hljs-variable">s:</span> {
    plu<span class="hljs-variable">s:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      this.<span class="hljs-keyword">a</span>++
    }
  }
})
<span class="hljs-keyword">vm</span>.plus()
<span class="hljs-keyword">vm</span>.<span class="hljs-keyword">a</span> // <span class="hljs-number">2</span>
</code></pre>
<p>看下面这个例子，methods 和 computed 看起来可以做同样的事情，单纯看结果两种方式确实是相同的。<br>然而，不同的是<strong>计算属性是基于它们的依赖进行缓存的</strong>。计算属性只有在它的相关依赖发生改变<br>时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会<br>立即返回之前的计算结果，而不必再次执行函数。相比而言，只要发生重新渲染，method 调用总会执行<br>该函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#example'</span>,
  dat<span class="hljs-variable">a:</span> {
    message: <span class="hljs-string">'Hello'</span>
  },
  computed: {
    // <span class="hljs-keyword">a</span> computed getter
    reversedMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      // `this` points <span class="hljs-keyword">to</span> the <span class="hljs-keyword">vm</span> instance
      <span class="hljs-keyword">return</span> this.message.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
    }
  }
})
</code></pre>
<h3 id="articleHeader6">watch</h3>
<blockquote><p>一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue</p></blockquote>
<p>实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3
  },
  watch: {
    // 监控a变量变化的时候，自动执行此函数
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    }
  }
})
vm.a = 2 // -> new: 2, old: 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
  },
  <span class="hljs-attr">watch</span>: {
    <span class="hljs-comment">// 监控a变量变化的时候，自动执行此函数</span>
    a: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val, oldVal</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new: %s, old: %s'</span>, val, oldVal)
    },
    <span class="hljs-comment">// 深度 watcher</span>
    c: {
      <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val, oldVal</span>) </span>{ <span class="hljs-comment">/* ... */</span> },
      <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
    }
  }
})
vm.a = <span class="hljs-number">2</span> <span class="hljs-comment">// -&gt; new: 2, old: 1</span>
</code></pre>
<h2 id="articleHeader7">Vue 实例的生命周期</h2>
<p>Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列<br>过程，我们称这是 Vue 的生命周期。通俗说就是 Vue 实例从创建到销毁的过程，就是生命周期。</p>
<p>在Vue的整个生命周期中，它提供了一些<a href="https://cn.vuejs.org/v2/api/#" rel="nofollow noreferrer" target="_blank">生命周期钩子</a>，给了我们执行自定义逻辑的机会。</p>
<p>接下来我们用几个例子来看看生命周期钩子是怎么用的：</p>
<p>完整的代码托管在 <a href="http://codepen.io/koucxz/pen/vxdQrY" rel="nofollow noreferrer" target="_blank">codepen</a><button class="btn btn-xs btn-default ml10 preview" data-url="koucxz/pen/vxdQrY" data-typeid="3">点击预览</button></p>
<p>HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <p>"{{" number "}}"</p>
  <input type=&quot;text&quot; name=&quot;btnSetNumber&quot; v-model=&quot;number&quot;>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" number "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"btnSetNumber"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"number"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p>我们对 input 和 p 绑定了data 对象的 number 数据，Vue 实例构建如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({         
    el: '#app',               
    data: {                   
      number: 1
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var app = <span class="hljs-keyword">new</span> Vue({         
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,               
    dat<span class="hljs-variable">a:</span> {                   
      <span class="hljs-keyword">number</span>: <span class="hljs-number">1</span>
    }
})
</code></pre>
<p>在实例中分别在每个生命周期钩子中 <code>console.log('钩子名称',this.number)</code> 我们发现，第一次页面加载时<br>触发了 beforeCreate, created, beforeMount, mounted 这几个钩子，data 数据在 created 中可获取到。</p>
<p>再去 <code>console.log('mounted: ', document.getElementsByTagName('p')[0])</code> ，DOM 渲染在 mounted 中已经<br>完成。</p>
<p>我们再试着去更改 input 输入框中的内容，可以看到输入框上方的数据同步发生改变，这就是数据绑定的效果，在更<br>新数据时触发 beforeUpdate 和 updated 钩子，且在 beforeUpdate 触发时，数据已更新完毕。</p>
<p>而 destroy 仅在调用<code>app.$destroy();</code>时触发，对 vue 实例进行销毁。销毁完成后，我们再重新改变 number 的值，vue 不再对此动作<br>进行响应了。但是原先生成的dom元素还存在，可以这么理解，执行了destroy操作，后续就不再受vue控制了。</p>
<h3 id="articleHeader8">Vue.nextTick</h3>
<blockquote>
<p>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。<a href="https://cn.vuejs.org/v2/api/#" rel="nofollow noreferrer" target="_blank">官方API</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.nextTick(function () {
  // DOM 更新了
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// DOM 更新了</span>
})
</code></pre>
</blockquote>
<p>官方还提供了一种写法，<code>vm.$nextTick</code>，用 this 自动绑定到调用它的实例上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
    setTimeout(() => {
          this.number = 100
          this.$nextTick(() => {
            console.log('nextTick', document.getElementsByTagName('p')[0])
          })
    },100)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>created() {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.number = <span class="hljs-number">100</span>
          <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick'</span>, <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'p'</span>)[<span class="hljs-number">0</span>])
          })
    },<span class="hljs-number">100</span>)
}
</code></pre>
<blockquote>
<p>什么时候需要到<a href="https://segmentfault.com/a/1190000008570874">Vue.nextTick()</a></p>
<ol><li><p>在 Vue 生命周期的 created() 钩子函数进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中。原因是什么呢，原因是<br>在 created() 钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作</p></li></ol>
</blockquote>
<p>的 js 代码放进 Vue.nextTick() 的回调函数中。与之对应的就是 mounted 钩子函数，因为该钩子函数执行时所有的 DOM 挂载和<br>渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。</p>
<blockquote><ol><li><p>在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作都应该放</p></li></ol></blockquote>
<p>进 Vue.nextTick() 的回调函数中。</p>
<h3 id="articleHeader9">生命周期小结</h3>
<p>生命周期钩子的一些使用方法：</p>
<p>beforecreate : 可以在这加个loading事件，在加载实例时触发  <br>created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用<br>mounted : 挂载元素，获取到DOM节点<br>updated : 如果对数据统一处理，在这里写上相应函数<br>beforeDestroy : 可以做一个确认停止事件的确认框<br>nextTick : 更新数据后立即操作dom</p>
<h2 id="articleHeader10">官方示例中的生命周期钩子应用</h2>
<h3 id="articleHeader11"><a href="https://cn.vuejs.org/v2/examples/index.html" rel="nofollow noreferrer" target="_blank">一个极简的Markdown编辑器</a></h3>
<p>运行这个例子需要marked组件，通过以下方法引入：  <br>在项目目录下运行 npm i marked -S, js 文件中 <code>import marked from 'marked'</code> 即可。  <br>这个例子没有用到生命周期钩子，简单解读一下这段代码，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">methods</span>: {
    <span class="hljs-attribute">update</span>: _.<span class="hljs-built_in">debounce</span>(function (e) {
      this.input = e.target.value
    }, 300)
  }
</code></pre>
<p>html 中 textarea 绑定了 @input = "update" ，方法中用 debounce 指令设置了延时，在每次输<br>入后延时同步输入框的数据，减少了更新次数，提高性能。</p>
<h3 id="articleHeader12"><a href="https://cn.vuejs.org/v2/examples/commits.html" rel="nofollow noreferrer" target="_blank">GitHub 提交</a></h3>
<p>这个例子从 Github 的 API 中获取了最新的 Vue.js 提交数据，并且以列表形式将它们展示了出<br>来。你可以轻松地切换 master 和 dev 分支。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created: function () {
    this.fetchData()
  },
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.fetchData()
  },
  </code></pre>
<p>在 created 钩子中用声明的 fetchData 函数获取ajax异步数据并渲染到页面。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 实例中的生命周期钩子详解

## 原文链接
[https://segmentfault.com/a/1190000008771768](https://segmentfault.com/a/1190000008771768)

