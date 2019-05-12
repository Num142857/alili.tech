---
title: 'vue从入门到进阶：组件Component详解（六）' 
date: 2018-12-18 2:30:10
hidden: true
slug: g3goxk53o88
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一.什么是组件？</h1>
<p>组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用<code> is </code>特性进行了扩展的原生 HTML 元素。</p>
<blockquote>所有的<code> Vue 组件</code>同时也都是 <code>Vue 的实例</code>，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。</blockquote>
<h1 id="articleHeader1">二.注册组件</h1>
<h2 id="articleHeader2">全局注册</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
  <my-component></my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"example"</span>&gt;
  &lt;<span class="hljs-keyword">my</span>-component&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
var vm = new Vue({
  el: '#example',
  data: {
       
  } 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 注册</span>
Vue.component(<span class="hljs-string">'my-component'</span>, {
  template: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
})
<span class="hljs-built_in">var</span> vm = <span class="hljs-literal">new</span> Vue({
  el: <span class="hljs-string">'#example'</span>,
  <span class="hljs-built_in">data</span>: {
       
  } 
})</code></pre>
<p>渲染结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
  <div>A custom component!</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"example"</span>&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;A custom component!&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>或者另外一种注册方式，通过 全局API：<code>Vue.extend()</code><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册
var MyComponent = Vue.extend({
  template: '<div>A custom component!</div>'
});

// 注册
Vue.component('my-component', MyComponent);
var vm = new Vue({
  el: '#example',
  data: {
       
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 注册</span>
<span class="hljs-built_in">var</span> MyComponent = Vue.extend({
  template: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
});

<span class="hljs-comment">// 注册</span>
Vue.component(<span class="hljs-string">'my-component'</span>, MyComponent);
<span class="hljs-built_in">var</span> vm = <span class="hljs-literal">new</span> Vue({
  el: <span class="hljs-string">'#example'</span>,
  <span class="hljs-built_in">data</span>: {
       
  }
})</code></pre>
<h3 id="articleHeader3">Vue.extend()使用说明</h3>
<p>下面说明下<code>Vue.extend( options )</code>的使用。<br>参数：<code>{Object} options</code><br>用法：使用基础 Vue 构造器，创建一个“子类”。参数是一个<code>包含组件选项的对象</code>。<br><code>data</code> 选项是特例，需要注意 - 在 <code>Vue.extend() </code>中它必须是<code>函数</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;mount-point&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"mount-point"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建构造器
var Profile = Vue.extend({
  template: '<p>"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 创建构造器</span>
<span class="hljs-keyword">var</span> Profile = Vue.extend({
  template: <span class="hljs-string">'&lt;p&gt;"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"&lt;/p&gt;'</span>,
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> {
      firstName: <span class="hljs-string">'Walter'</span>,
      lastName: <span class="hljs-string">'White'</span>,
      alias: <span class="hljs-string">'Heisenberg'</span>
    }
  }
})
<span class="hljs-comment">// 创建 Profile 实例，并挂载到一个元素上。</span>
<span class="hljs-keyword">new</span> Profile().$mount(<span class="hljs-string">'#mount-point'</span>)</code></pre>
<p>结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>Walter White aka Heisenberg</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Walter White aka Heisenberg<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>上面又用到了实例方法<code>vm.$mount()</code>，下面说明下它的使用方式。</p>
<h3 id="articleHeader4">vm.$mount( [elementOrSelector] )使用说明</h3>
<p>参数：</p>
<ul>
<li><code>{Element | string} [elementOrSelector]</code></li>
<li><code>{boolean} [hydrating]</code></li>
</ul>
<p>返回值：<code>vm</code> - 实例自身<br>用法：<br>如果 <code>Vue</code> 实例在实例化时没有收到<code> el </code>选项，则它处于“<code>未挂载</code>”状态，没有关联的<code> DOM </code>元素。可以使用<code> vm.$mount() </code>手动地挂载一个未挂载的实例。</p>
<p>如果没有提供 <code>elementOrSelector </code>参数，模板将被渲染为文档之外的的元素，并且你必须使用<code>原生 DOM API </code>把它插入文档中。</p>
<p>这个方法返回实例自身，因而可以链式调用其它实例方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> MyComponent = Vue.extend({
  template: <span class="hljs-string">'&lt;div&gt;Hello!&lt;/div&gt;'</span>
})

<span class="hljs-comment">// 创建并挂载到 #app (会替换 #app)</span>
<span class="hljs-literal">new</span> MyComponent().$mount(<span class="hljs-string">'#app'</span>)

<span class="hljs-comment">// 同上</span>
<span class="hljs-literal">new</span> MyComponent({ el: <span class="hljs-string">'#app'</span> })

<span class="hljs-comment">// 或者，在文档之外渲染并且随后挂载</span>
<span class="hljs-built_in">var</span> component = <span class="hljs-literal">new</span> MyComponent().$mount()
document.getElementById(<span class="hljs-string">'app'</span>).appendChild(component.$el)</code></pre>
<h2 id="articleHeader5">局部注册</h2>
<p>你不必把每个组件都注册到全局。你可以通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Child = {
  template: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
}

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">// ...</span>
  components: {
    <span class="hljs-comment">// &lt;my-component&gt; 将只在父组件模板中可用</span>
    <span class="hljs-string">'my-component'</span>: Child
  }
})</code></pre>
<p>这种封装也适用于其它可注册的 Vue 功能，比如<code>指令</code>。</p>
<h3 id="articleHeader6">DOM 模板解析注意事项</h3>
<p>像 <code>&lt;ul&gt;、&lt;ol&gt;、&lt;table&gt;、&lt;select&gt;</code> 这样的元素里允许包含的元素有限制，而另一些像 <code>&lt;option&gt;</code> 这样的元素只能出现在某些特定元素的内部。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="table>
  <my-row>...</my-row>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>table&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-row</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">my-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></span></code></pre>
<p>自定义组件<code> &lt;my-row&gt;</code> 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的<code> is </code>特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
  <tr is=&quot;my-row&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-row"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><strong>应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：</strong></p>
<ul>
<li><code>&lt;script type="text/x-template"&gt;</code></li>
<li>
<code>JavaScript</code> 内联模板字符串</li>
<li>
<code>.vue</code> 组件</li>
</ul>
<p>因此，请尽可能使用字符串模板。</p>
<h3 id="articleHeader7">data 必须是函数</h3>
<p>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component', {
  template: '<span>"{{" message "}}"</span>',
  data: {
    message: 'hello'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" message "}}"&lt;/span&gt;'</span>,
  <span class="hljs-attribute">data</span>: {
    <span class="hljs-attribute">message</span>: <span class="hljs-string">'hello'</span>
  }
})</code></pre>
<p>那么 Vue 会停止运行，并在控制台发出警告，告诉你在组件实例中 <code>data</code> 必须是一个函数。<br>我们来理解下，看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-2&quot;>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click=&quot;counter += 1&quot;>"{{" counter "}}"</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们却给每个组件实例返回了同一个对象的引用
  data: function () {
    return data
  }
})

new Vue({
  el: '#example-2'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> data = { counter: <span class="hljs-number">0</span> }

Vue.component(<span class="hljs-string">'simple-counter'</span>, {
  template: <span class="hljs-string">'&lt;button v-on:click="counter += 1"&gt;"{{" counter "}}"&lt;/button&gt;'</span>,
  <span class="hljs-comment">// 技术上 data 的确是一个函数了，因此 Vue 不会警告，</span>
  <span class="hljs-comment">// 但是我们却给每个组件实例返回了同一个对象的引用</span>
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> data
  }
})

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#example-2'</span>
})</code></pre>
<p>由于这三个组件实例<code>共享</code>了同一个<code> data </code>对象，因此递增一个 <code>counter </code>会影响所有组件！这就错了。我们可以通过为每个组件返回全新的数据对象来修复这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: function () {
  return {
    counter: 0
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>data: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">{</span>
    counter: <span class="hljs-number">0</span>
  }
}</code></pre>
<p>现在每个 counter 都有它自己内部的状态了,不会相互影响。</p>
<h1 id="articleHeader8">三.Prop</h1>
<p>最常见的应用就是：组件 A 在它的模板中使用了组件 B。它们之间必然需要相互通信：父组件可能要给子组件下发数据，子组件则可能要将它内部发生的事情告知父组件。</p>
<p>在 Vue 中，父子组件的关系可以总结为 <code>prop</code> 向下传递，<code>事件</code>向上传递。父组件通过 <code>prop</code> 给子组件下发数据，子组件通过<code>事件</code>给父组件发送消息。</p>
<h2 id="articleHeader9">使用 Prop 传递数据</h2>
<p>实例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>"{{" message "}}"</span>'
})

<child message=&quot;hello!&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.component(<span class="hljs-string">'child'</span>, {
  <span class="hljs-comment">// 声明 props</span>
  props: [<span class="hljs-string">'message'</span>],
  <span class="hljs-comment">// 就像 data 一样，prop 也可以在模板中使用</span>
  <span class="hljs-comment">// 同样也可以在 vm 实例中通过 this.message 来使用</span>
  template: <span class="hljs-string">'&lt;span&gt;"{{" message "}}"&lt;/span&gt;'</span>
})

&lt;child message=<span class="hljs-string">"hello!"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span></code></pre>
<p>结果：<code>hello!</code></p>
<p>实例2：<br>HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>"{{" myMessage "}}"</span>'
})

<!-- 在 HTML 中使用 kebab-case -->
<child my-message=&quot;hello!&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" myMessage "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>'
})

<span class="hljs-comment">&lt;!-- 在 HTML 中使用 kebab-case --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span></code></pre>
<p>如果你使用字符串模板，则没有这些限制。</p>
<h2 id="articleHeader10">动态 Prop</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <input v-model=&quot;parentMsg&quot;>
  <br>
  <child v-bind:my-message=&quot;parentMsg&quot;></child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">v-bind:my-message</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>你也可以使用 v-bind 的缩写语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<child :my-message=&quot;parentMsg&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;child <span class="hljs-symbol">:my-message=<span class="hljs-string">"parentMsg"</span>&gt;&lt;/child&gt;</span></code></pre>
<p><strong><code>（重要）</code></strong>如果你想把一个<code>对象</code>的所有<code>属性</code>作为 prop 进行传递，可以使用不带任何参数的 <code>v-bind </code>(即用 v-bind 而不是 v-bind:prop-name)。例如，已知一个<code> todo</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="todo: {
  text: 'Learn Vue',
  isComplete: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">todo</span>: {
  <span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Vue'</span>,
  isComplete: false
}</code></pre>
<p>然后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<todo-item v-bind=&quot;todo&quot;></todo-item>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;todo-<span class="hljs-built_in">item</span> v-bind=<span class="hljs-string">"todo"</span>&gt;&lt;/todo-<span class="hljs-built_in">item</span>&gt;</code></pre>
<p>将等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<todo-item
  v-bind:text=&quot;todo.text&quot;
  v-bind:is-complete=&quot;todo.isComplete&quot;
></todo-item>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;todo-<span class="hljs-built_in">item</span>
  v-bind:<span class="hljs-built_in">text</span>=<span class="hljs-string">"todo.text"</span>
  v-bind:<span class="hljs-keyword">is</span>-complete=<span class="hljs-string">"todo.isComplete"</span>
&gt;&lt;/todo-<span class="hljs-built_in">item</span>&gt;</code></pre>
<h2 id="articleHeader11">字面量语法 vs 动态语法</h2>
<p>初学者常犯的一个错误是使用字面量语法传递数值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递了一个字符串 &quot;1&quot; -->
<comp some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 传递了一个字符串 "1" --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<p>因为它是一个字面量 <code>prop</code>，它的值是字符串 "1" 而不是一个数值。如果想传递一个真正的 JavaScript 数值，则需要使用 <code>v-bind</code>，从而让它的值被当作 <code>JavaScript 表达式</code>计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递真正的数值 -->
<comp v-bind:some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 传递真正的数值 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-bind:some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<h2 id="articleHeader12">单向数据流</h2>
<p>Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。</p>
<p>另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你<code>不应该</code>在子组件内部改变<code> prop</code>。如果你这么做了，Vue 会在控制台给出警告。</p>
<p>在两种情况下，我们很容易忍不住想去修改 prop 中数据：</p>
<ul>
<li>Prop 作为初始值传入后，子组件想把它当作局部数据来用；</li>
<li>Prop 作为原始数据传入，由子组件处理成其它数据输出。</li>
</ul>
<p>对这两种情况，正确的应对方式是：<br>1.定义一个局部变量，并用 prop 的值初始化它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>props: [<span class="hljs-string">'initialCounter'</span>],
data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> { counter: <span class="hljs-keyword">this</span>.initialCounter }
}</code></pre>
<p>2.定义一个计算属性，处理 prop 的值并返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">props</span>: <span class="hljs-selector-attr">['size']</span>,
<span class="hljs-selector-tag">computed</span>: {
  <span class="hljs-attribute">normalizedSize</span>: function () {
    return this.size.<span class="hljs-built_in">trim</span>().<span class="hljs-built_in">toLowerCase</span>()
  }
}</code></pre>
<blockquote>注意在 JavaScript 中<code>对象</code>和<code>数组</code>是引用类型，指向<code>同一个内存空间</code>，如果 prop 是一个对象或数组，在子组件内部改变它<code>会影响</code>父组件的状态。</blockquote>
<h2 id="articleHeader13">Prop 验证</h2>
<p>我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。<br>要指定验证规则，需要用<code>对象的形式</code>来定义 prop，而<code>不能用字符串数组</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'example'</span>, {
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-comment">// 基础类型检测 (`null` 指允许任何类型)</span>
    <span class="hljs-attribute">propA</span>: Number,
    <span class="hljs-comment">// 可能是多种类型</span>
    <span class="hljs-attribute">propB</span>: [String, Number],
    <span class="hljs-comment">// 必传且是字符串</span>
    <span class="hljs-attribute">propC</span>: {
      <span class="hljs-attribute">type</span>: String,
      <span class="hljs-attribute">required</span>: true
    },
    <span class="hljs-comment">// 数值且有默认值</span>
    <span class="hljs-attribute">propD</span>: {
      <span class="hljs-attribute">type</span>: Number,
      <span class="hljs-attribute">default</span>: <span class="hljs-number">100</span>
    },
    <span class="hljs-comment">// 数组/对象的默认值应当由一个工厂函数返回</span>
    <span class="hljs-attribute">propE</span>: {
      <span class="hljs-attribute">type</span>: Object,
      <span class="hljs-attribute">default</span>: function () {
        return { <span class="hljs-attribute">message</span>: <span class="hljs-string">'hello'</span> }
      }
    },
    <span class="hljs-comment">// 自定义验证函数</span>
    <span class="hljs-attribute">propF</span>: {
      <span class="hljs-attribute">validator</span>: function (value) {
        return value &gt; <span class="hljs-number">10</span>
      }
    }
  }
})</code></pre>
<p><code>type</code> 可以是下面原生构造器：String ，Number，Boolean，Function，Object，Array，Symbol。</p>
<p><code>type</code> 也可以是一个自定义构造器函数，使用 <code>instanceof</code> 检测。</p>
<p>当<code> prop </code>验证失败，Vue 会抛出警告 (如果使用的是开发版本)。注意 prop 会在组件实例创建之前进行校验，所以在<code> default</code> 或 <code>validator</code> 函数里，诸如 <code>data</code>、<code>computed</code> 或 <code>methods</code> 等实例属性还无法使用。</p>
<p>其它实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('modal', {
  template: '#modal-template',
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true    
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'modal'</span>, {
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'#modal-template'</span>,
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">show</span>: {
      <span class="hljs-attribute">type</span>: Boolean,
      <span class="hljs-attribute">required</span>: true,
      <span class="hljs-attribute">twoWay</span>: true    
    }
  }
});</code></pre>
<p><code>twoWay Prop</code> 的参数 <code>移除</code>。Props 现在只能单向传递。为了对父组件产生反向影响，子组件需要显式地传递一个事件而不是依赖于隐式地双向绑定。所以上面的的最后一个实例只是贴出来代码而已，最新版本已经移除了。</p>
<h1 id="articleHeader14">四.非Prop特性</h1>
<p>所谓非 prop 特性，就是指它可以直接传入组件，而不需要定义相应的 prop。</p>
<p>尽管为组件定义明确的 prop 是推荐的传参方式，组件的作者却并不总能预见到组件被使用的场景。所以，<code>组件可以接收任意传入的特性</code>，这些特性都会被添加到组件的<code>根元素上</code>。</p>
<p>例如，假设我们使用了第三方组件 bs-date-input，它包含一个 Bootstrap 插件，该插件需要在 input 上添加 data-3d-date-picker 这个特性。这时可以把特性直接添加到组件上 (不需要事先定义 prop)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<bs-date-input data-3d-date-picker=&quot;true&quot;></bs-date-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">bs</span>-date-<span class="hljs-keyword">input</span> data-3d-date-picker=<span class="hljs-string">"true"</span>&gt;&lt;/<span class="hljs-keyword">bs</span>-date-<span class="hljs-keyword">input</span>&gt;</code></pre>
<p>添加属性 <code>data-3d-date-picker="true"</code> 之后，它会被自动添加到<code> bs-date-input</code> 的根元素上。</p>
<p>假设这是 bs-date-input 的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;date&quot; class=&quot;form-control&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"date"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"form-control"</span>&gt;</code></pre>
<p>为了给该日期选择器插件增加一个特殊的主题，我们可能需要增加一个特殊的 class，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<bs-date-input
  data-3d-date-picker=&quot;true&quot;
  class=&quot;date-picker-theme-dark&quot;
></bs-date-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">bs</span>-date-<span class="hljs-keyword">input</span>
  data-3d-date-picker=<span class="hljs-string">"true"</span>
  <span class="hljs-keyword">class</span>=<span class="hljs-string">"date-picker-theme-dark"</span>
&gt;&lt;/<span class="hljs-keyword">bs</span>-date-<span class="hljs-keyword">input</span>&gt;</code></pre>
<p>最终在根元素上生成的class值为：form-control date-picker-theme-dark。</p>
<h1 id="articleHeader15">五.自定义事件</h1>
<p>我们知道，父组件使用 prop 传递数据给子组件。但子组件怎么跟父组件通信呢？这个时候 Vue 的自定义事件系统就派得上用场了。</p>
<h2 id="articleHeader16">使用 v-on 绑定自定义事件</h2>
<p>每个 Vue 实例都实现了事件接口，即：</p>
<ul>
<li>使用 $on(eventName) 监听事件</li>
<li>使用 $emit(eventName) 触发事件</li>
</ul>
<blockquote>Vue 的事件系统与浏览器的 <code>EventTarget API</code> 有所不同。尽管它们的运行起来类似，但是 <code>$on </code>和 <code>$emit</code> 并不是<code>addEventListener</code> 和<code> dispatchEvent</code> 的别名。</blockquote>
<p>另外，父组件可以在使用子组件的地方直接用 <code>v-on</code> 来监听子组件触发的事件。</p>
<blockquote>不能用 $on 侦听子组件释放的事件，而必须在模板里直接用 v-on 绑定，参见下面的例子。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;counter-event-example&quot;>
  <p>"{{" total "}}"</p>
  <button-counter v-on:increment=&quot;incrementTotal&quot;></button-counter>
  <button-counter v-on:increment=&quot;incrementTotal&quot;></button-counter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter-event-example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" total "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span> <span class="hljs-attr">v-on:increment</span>=<span class="hljs-string">"incrementTotal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span> <span class="hljs-attr">v-on:increment</span>=<span class="hljs-string">"incrementTotal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('button-counter', {
  template: '<button v-on:click=&quot;incrementCounter&quot;>"{{" counter "}}"</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.component(<span class="hljs-string">'button-counter'</span>, {
  template: <span class="hljs-string">'&lt;button v-on:click="incrementCounter"&gt;"{{" counter "}}"&lt;/button&gt;'</span>,
  dat<span class="hljs-variable">a:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> {
      counter: <span class="hljs-number">0</span>
    }
  },
  method<span class="hljs-variable">s:</span> {
    incrementCounter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      this.counter += <span class="hljs-number">1</span>
      this.$emit(<span class="hljs-string">'increment'</span>)
    }
  },
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#counter-event-example'</span>,
  dat<span class="hljs-variable">a:</span> {
    tota<span class="hljs-variable">l:</span> <span class="hljs-number">0</span>
  },
  method<span class="hljs-variable">s:</span> {
    incrementTota<span class="hljs-variable">l:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      this.total += <span class="hljs-number">1</span>
    }
  }
})</code></pre>
<h2 id="articleHeader17">给组件绑定原生事件.native</h2>
<p>有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 <code>.native</code>。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-on:click.native=&quot;doTheThing&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">my</span>-component v-<span class="hljs-keyword">on</span>:click.native=<span class="hljs-string">"doTheThing"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;</code></pre>
<h2 id="articleHeader18">.sync 修饰符(2.3.0+)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<comp :foo.sync=&quot;bar&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">comp</span> :foo.<span class="hljs-keyword">sync</span>=<span class="hljs-string">"bar"</span>&gt;&lt;/<span class="hljs-keyword">comp</span>&gt;</code></pre>
<p>会被扩展为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<comp :foo=&quot;bar&quot; @update:foo=&quot;val => bar = val&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;comp <span class="hljs-symbol">:foo=<span class="hljs-string">"bar"</span></span> <span class="hljs-variable">@update</span><span class="hljs-symbol">:foo=<span class="hljs-string">"val =&gt; bar = val"</span>&gt;&lt;/comp&gt;</span></code></pre>
<p>当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$emit('update:foo', newValue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">this</span>.$emit(<span class="hljs-string">'update:foo'</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>)</code></pre>
<h2 id="articleHeader19">使用自定义事件的表单输入组件</h2>
<p>自定义事件可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。要牢记：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;something&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> v-model=<span class="hljs-string">"something"</span>&gt;</code></pre>
<p>这不过是以下示例的语法糖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
  v-bind:value=&quot;something&quot;
  v-on:input=&quot;something = $event.target.value&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>&lt;<span class="hljs-keyword">input</span>
  v-bind:value=<span class="hljs-string">"something"</span>
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">input</span>=<span class="hljs-string">"something = $event.target.value"</span>&gt;</code></pre>
<p>所以在组件中使用时，它相当于下面的简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<custom-input
  v-bind:value=&quot;something&quot;
  v-on:input=&quot;something = arguments[0]&quot;>
</custom-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>&lt;custom-<span class="hljs-keyword">input</span>
  v-bind:value=<span class="hljs-string">"something"</span>
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">input</span>=<span class="hljs-string">"something = arguments[0]"</span>&gt;
&lt;/custom-<span class="hljs-keyword">input</span>&gt;</code></pre>
<p>所以要让组件的 v-model 生效，它应该 (从 2.2.0 起是可配置的)：</p>
<ul>
<li>接受一个 <code>value prop</code>
</li>
<li>在有新的值时触发 <code>input</code> 事件并将新值作为参数</li>
</ul>
<p>例子1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
      <custom-input v-model=&quot;something&quot;></custom-input>
    <br/>
    "{{"something"}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">custom-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"something"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custom-input</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    </span><span class="hljs-template-variable">"{{"something"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册
Vue.component('custom-input', {
  props:['something'],
  template: '<input type=&quot;text&quot;  v-bind:value=&quot;something&quot; v-on:input=&quot;updateValue($event.target.value)&quot;/>',
  methods:{
      updateValue:function(value){
           this.$emit('input', value)
      }
  }
})
var vm = new Vue({
  el: '#app',
  data: {
       something:''
  }
  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// 注册
Vue.component(<span class="hljs-string">'custom-input'</span>, {
  prop<span class="hljs-variable">s:</span>[<span class="hljs-string">'something'</span>],
  template: <span class="hljs-string">'&lt;input type="text"  v-bind:value="something" v-on:input="updateValue($event.target.value)"/&gt;'</span>,
  method<span class="hljs-variable">s:</span>{
      updateValue:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span>{</span>
           this.$emit(<span class="hljs-string">'input'</span>, value)
      }
  }
})
var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
  dat<span class="hljs-variable">a:</span> {
       somethin<span class="hljs-variable">g:</span><span class="hljs-string">''</span>
  }
  
})</code></pre>
<p>例子2：货币输入的自定义控件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<currency-input v-model=&quot;price&quot;></currency-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"price"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref=&quot;input&quot;\
        v-bind:value=&quot;value&quot;\
        v-on:input=&quot;updateValue($event.target.value)&quot;\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 位小数
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果值尚不合规，则手动覆盖为合规的值
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件带出数值
      this.$emit('input', Number(formattedValue))
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>Vue.component(<span class="hljs-string">'currency-input'</span>, {
  template: <span class="hljs-string">'\
    &lt;span&gt;\
      $\
      &lt;input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      &gt;\
    &lt;/span&gt;\
  '</span>,
  props: [<span class="hljs-string">'value'</span>],
  methods: {
    <span class="hljs-comment">// 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制</span>
    updateValue: function (<span class="hljs-keyword">value</span>) {
      <span class="hljs-keyword">var</span> formattedValue = <span class="hljs-keyword">value</span>
        <span class="hljs-comment">// 删除两侧的空格符</span>
        .trim()
        <span class="hljs-comment">// 保留 2 位小数</span>
        .slice(
          <span class="hljs-number">0</span>,
          <span class="hljs-keyword">value</span>.indexOf(<span class="hljs-string">'.'</span>) === <span class="hljs-number">-1</span>
            ? <span class="hljs-keyword">value</span>.length
            : <span class="hljs-keyword">value</span>.indexOf(<span class="hljs-string">'.'</span>) + <span class="hljs-number">3</span>
        )
      <span class="hljs-comment">// 如果值尚不合规，则手动覆盖为合规的值</span>
      <span class="hljs-keyword">if</span> (formattedValue !== <span class="hljs-keyword">value</span>) {
        <span class="hljs-keyword">this</span>.$refs.input.<span class="hljs-keyword">value</span> = formattedValue
      }
      <span class="hljs-comment">// 通过 input 事件带出数值</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, Number(formattedValue))
    }
  }
})</code></pre>
<p>实例3：更加完善的货币过滤器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <currency-input 
    label=&quot;Price&quot; 
    v-model=&quot;price&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Shipping&quot; 
    v-model=&quot;shipping&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Handling&quot; 
    v-model=&quot;handling&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Discount&quot; 
    v-model=&quot;discount&quot;
  ></currency-input>
  
  <p>Total: $"{{" total "}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;div id=<span class="hljs-string">"app"</span>&gt;
  &lt;currency-<span class="hljs-keyword">input</span> 
    <span class="hljs-keyword">label</span>=<span class="hljs-string">"Price"</span> 
    v-model=<span class="hljs-string">"price"</span>
  &gt;&lt;/currency-<span class="hljs-keyword">input</span>&gt;
  &lt;currency-<span class="hljs-keyword">input</span> 
    <span class="hljs-keyword">label</span>=<span class="hljs-string">"Shipping"</span> 
    v-model=<span class="hljs-string">"shipping"</span>
  &gt;&lt;/currency-<span class="hljs-keyword">input</span>&gt;
  &lt;currency-<span class="hljs-keyword">input</span> 
    <span class="hljs-keyword">label</span>=<span class="hljs-string">"Handling"</span> 
    v-model=<span class="hljs-string">"handling"</span>
  &gt;&lt;/currency-<span class="hljs-keyword">input</span>&gt;
  &lt;currency-<span class="hljs-keyword">input</span> 
    <span class="hljs-keyword">label</span>=<span class="hljs-string">"Discount"</span> 
    v-model=<span class="hljs-string">"discount"</span>
  &gt;&lt;/currency-<span class="hljs-keyword">input</span>&gt;
  
  &lt;p&gt;<span class="hljs-keyword">Total</span>: $"{{" <span class="hljs-keyword">total</span> "}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('currency-input', {
  template: '\
    <div>\
      <label v-if=&quot;label&quot;>"{{" label "}}"</label>\
      $\
      <input\
        ref=&quot;input&quot;\
        v-bind:value=&quot;value&quot;\
        v-on:input=&quot;updateValue($event.target.value)&quot;\
        v-on:focus=&quot;selectAll&quot;\
        v-on:blur=&quot;formatValue&quot;\
      >\
    </div>\
  ',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    this.formatValue()
  },
  methods: {
    updateValue: function (value) {
      var result = currencyValidator.parse(value, this.value)
      if (result.warning) {
        this.$refs.input.value = result.value
      }
      this.$emit('input', result.value)
    },
    formatValue: function () {
      this.$refs.input.value = currencyValidator.format(this.value)
    },
    selectAll: function (event) {
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
          event.target.select()
      }, 0)
    }
  }
})

new Vue({
  el: '#app',
  data: {
    price: 0,
    shipping: 0,
    handling: 0,
    discount: 0
  },
  computed: {
    total: function () {
      return ((
        this.price * 100 + 
        this.shipping * 100 + 
        this.handling * 100 - 
        this.discount * 100
      ) / 100).toFixed(2)
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.component(<span class="hljs-string">'currency-input'</span>, {
  template: <span class="hljs-string">'\
    &lt;div&gt;\
      &lt;label v-if="label"&gt;"{{" label "}}"&lt;/label&gt;\
      $\
      &lt;input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
        v-on:focus="selectAll"\
        v-on:blur="formatValue"\
      &gt;\
    &lt;/div&gt;\
  '</span>,
  props: {
    value: {
      type: Number,
      <span class="hljs-keyword">default</span>: <span class="hljs-number">0</span>
    },
    label: {
      type: String,
      <span class="hljs-keyword">default</span>: <span class="hljs-string">''</span>
    }
  },
  mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.formatValue()
  },
  methods: {
    updateValue: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
      <span class="hljs-keyword">var</span> result = currencyValidator.parse(value, <span class="hljs-keyword">this</span>.value)
      <span class="hljs-keyword">if</span> (result.warning) {
        <span class="hljs-keyword">this</span>.$refs.input.value = result.value
      }
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, result.value)
    },
    formatValue: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">this</span>.$refs.input.value = currencyValidator.format(<span class="hljs-keyword">this</span>.value)
    },
    selectAll: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> </span>{
      <span class="hljs-comment">// Workaround for Safari bug</span>
      <span class="hljs-comment">// http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome</span>
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
          event.target.select()
      }, <span class="hljs-number">0</span>)
    }
  }
})

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  data: {
    price: <span class="hljs-number">0</span>,
    shipping: <span class="hljs-number">0</span>,
    handling: <span class="hljs-number">0</span>,
    discount: <span class="hljs-number">0</span>
  },
  computed: {
    total: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> ((
        <span class="hljs-keyword">this</span>.price * <span class="hljs-number">100</span> + 
        <span class="hljs-keyword">this</span>.shipping * <span class="hljs-number">100</span> + 
        <span class="hljs-keyword">this</span>.handling * <span class="hljs-number">100</span> - 
        <span class="hljs-keyword">this</span>.discount * <span class="hljs-number">100</span>
      ) / <span class="hljs-number">100</span>).toFixed(<span class="hljs-number">2</span>)
    }
  }
})</code></pre>
<h2 id="articleHeader20">自定义组件的 v-model（2.2.0 新增）</h2>
<p>默认情况下，一个组件的 v-model 会使用 value prop 和 input 事件。但是诸如单选框、复选框之类的输入类型可能把 value 用作了别的目的。model 选项可以避免这样的冲突：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    // 这样就允许拿 `value` 这个 prop 做其它事了
    value: String
  },
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'my-checkbox'</span>, {
  <span class="hljs-attribute">model</span>: {
    <span class="hljs-attribute">prop</span>: <span class="hljs-string">'checked'</span>,
    <span class="hljs-attribute">event</span>: <span class="hljs-string">'change'</span>
  },
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">checked</span>: Boolean,
    <span class="hljs-comment">// 这样就允许拿 `value` 这个 prop 做其它事了</span>
    <span class="hljs-attribute">value</span>: String
  },
  <span class="hljs-comment">// ...</span>
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-checkbox v-model=&quot;foo&quot; value=&quot;some value&quot;></my-checkbox>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">my</span>-checkbox v-model=<span class="hljs-string">"foo"</span> value=<span class="hljs-string">"some value"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-checkbox&gt;</code></pre>
<p>上述代码等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-checkbox
  :checked=&quot;foo&quot;
  @change=&quot;val => { foo = val }&quot;
  value=&quot;some value&quot;>
</my-checkbox>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-checkbox</span>
  <span class="hljs-attr">:checked</span>=<span class="hljs-string">"foo"</span>
  @<span class="hljs-attr">change</span>=<span class="hljs-string">"val =&gt; </span></span></span><span class="hljs-template-variable">{ foo = val }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
  <span class="hljs-attr">value</span>=<span class="hljs-string">"some value"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">my-checkbox</span>&gt;</span></span></code></pre>
<blockquote>注意你仍然需要显式声明 <code>checked</code> 这个<code> prop</code>。</blockquote>
<p>完整的代码：<br>html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
      <my-checkbox v-model=&quot;foo&quot; value=&quot;some value&quot;></my-checkbox>
    "{{"foo"}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
      &lt;<span class="hljs-keyword">my</span>-checkbox v-model=<span class="hljs-string">"foo"</span> value=<span class="hljs-string">"some value"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-checkbox&gt;
    "{{"foo"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    // 这样就允许拿 `value` 这个 prop 做其它事了
    value: String
  },
  template:'<input type=&quot;checkbox&quot; @change=&quot;changefun(ischecked)&quot;/>',
  data:function(){
      return {
          ischecked:this.checked
      }
  },
  methods:{
      changefun(state){
          this.ischecked = !state;
          this.$emit('change', this.ischecked);
      }
  }
})
var vm = new Vue({
  el: '#app',
  data: {
       foo:false
  }
  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Vue.component(<span class="hljs-string">'my-checkbox'</span>, {
  model: {
    prop: <span class="hljs-string">'checked'</span>,
    event: <span class="hljs-string">'change'</span>
  },
  props: {
    checked: <span class="hljs-built_in">Boolean</span>,
    <span class="hljs-comment">// 这样就允许拿 `value` 这个 prop 做其它事了</span>
    value: String
  },
  template:<span class="hljs-string">'&lt;input type="checkbox" @change="changefun(ischecked)"/&gt;'</span>,
  <span class="hljs-keyword">data</span>:function(){
      <span class="hljs-keyword">return</span> {
          ischecked:<span class="hljs-keyword">this</span>.checked
      }
  },
  methods:{
      changefun(state){
          <span class="hljs-keyword">this</span>.ischecked = !state;
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, <span class="hljs-keyword">this</span>.ischecked);
      }
  }
})
<span class="hljs-keyword">var</span> vm = new Vue({
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-keyword">data</span>: {
       foo:<span class="hljs-literal">false</span>
  }
  
})</code></pre>
<h2 id="articleHeader21">非父子组件的通信</h2>
<p>有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 触发组件 A 中的事件
bus.$emit('id-selected', 1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 触发组件 A 中的事件</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 在组件 B 创建的钩子中监听事件</span>
bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(id)</span> </span>{
  <span class="hljs-comment">// ...</span>
})</code></pre>
<p>在复杂的情况下，我们应该考虑使用专门的状态管理模式<code>Vuex</code>。</p>
<p>来看一个完整的例子：<br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
     <comp-a v-on:id-selected=&quot;getdate&quot;></comp-a>
     <comp-b></comp-b>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
     &lt;comp-a v-<span class="hljs-keyword">on</span>:<span class="hljs-built_in">id</span>-selected=<span class="hljs-string">"getdate"</span>&gt;&lt;/comp-a&gt;
     &lt;comp-b&gt;&lt;/comp-b&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue();

Vue.component('comp-a', {
  template:'<button class=&quot;compa&quot; @click=&quot;comfuna&quot;>组件A</button>',
  data:function(){
      return {
          
      }
  },
  methods:{
      comfuna(){
          bus.$emit('id-selected', 1);
          this.$emit('id-selected', 1);
      }
  }
})
Vue.component('comp-b', {
  template:'<div class=&quot;compb&quot;>组件B</div>',
  data:function(){
      return {
          
      }
  },
  mounted(){
      // 在组件 B 创建的钩子中监听事件
    bus.$on('id-selected', function (id) {
         console.log('在B组件中得到的值：'+id);
    })
  }
 
})
var vm = new Vue({
  el: '#app',
  data: {},
  methods:{
      getdate(value){
          console.log('得到当前的值：'+value);
      }
  }
  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();

Vue.component(<span class="hljs-string">'comp-a'</span>, {
  <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;button class="compa" @click="comfuna"&gt;组件A&lt;/button&gt;'</span>,
  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {
          
      }
  },
  <span class="hljs-attr">methods</span>:{
      comfuna(){
          bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>);
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>);
      }
  }
})
Vue.component(<span class="hljs-string">'comp-b'</span>, {
  <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;div class="compb"&gt;组件B&lt;/div&gt;'</span>,
  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {
          
      }
  },
  mounted(){
      <span class="hljs-comment">// 在组件 B 创建的钩子中监听事件</span>
    bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'在B组件中得到的值：'</span>+id);
    })
  }
 
})
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: {},
  <span class="hljs-attr">methods</span>:{
      getdate(value){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'得到当前的值：'</span>+value);
      }
  }
  
})</code></pre>
<h1 id="articleHeader22">六.使用插槽slot分发内容</h1>
<p>在使用组件时，我们常常要像这样组合它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;app&gt;</span>
  <span class="hljs-section">&lt;app-header&gt;</span><span class="hljs-section">&lt;/app-header&gt;</span>
  <span class="hljs-section">&lt;app-footer&gt;</span><span class="hljs-section">&lt;/app-footer&gt;</span>
<span class="hljs-section">&lt;/app&gt;</span></code></pre>
<p>注意两点：</p>
<ul>
<li>
<code>&lt;app&gt;</code> 组件不知道它会收到什么内容。这是由使用 <code>&lt;app&gt;</code> 的父组件决定的。</li>
<li>
<code>&lt;app&gt;</code> 组件很可能有它自己的模板。</li>
</ul>
<p>为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。使用特殊的 <code>&lt;slot&gt;</code> 元素作为原始内容的插槽。</p>
<p>一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 无效 -->
<child-component v-show=&quot;someChildProperty&quot;></child-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 无效 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"someChildProperty"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span></code></pre>
<p>正确做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show=&quot;someChildProperty&quot;>Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.component(<span class="hljs-string">'child-component'</span>, {
  <span class="hljs-comment">// 有效，因为是在正确的作用域内</span>
  template: <span class="hljs-string">'&lt;div v-show="someChildProperty"&gt;Child&lt;/div&gt;'</span>,
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> {
      someChildProperty: <span class="hljs-literal">true</span>
    }
  }
})</code></pre>
<h2 id="articleHeader23">单个插槽</h2>
<p>假定 my-component 组件有如下模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
    只有在没有要分发的内容时才会显示。
  <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>父组件模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>渲染结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader24">具名插槽</h2>
<p><code>&lt;slot&gt;</code> 元素可以用一个特殊的特性 <code>name</code> 来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中有对应 <code>slot</code> 特性的元素。</p>
<p>仍然可以有一个<strong>匿名插槽</strong>，它是<strong>默认插槽</strong>，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃。</p>
<p>例如，假定我们有一个 app-layout 组件，它的模板为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <slot name=&quot;header&quot;></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name=&quot;footer&quot;></slot>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>父组件模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-layout>
  <h1 slot=&quot;header&quot;>这里可能是一个页面标题</h1>

  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>

  <p slot=&quot;footer&quot;>这里有一些联系信息</p>
</app-layout>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">app-layout</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个主要段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app-layout</span>&gt;</span></code></pre>
<p>渲染结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个主要段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader25">作用域插槽(2.1.0 新增)</h2>
<p>作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素。</p>
<p>在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;child&quot;>
  <slot text=&quot;hello from child&quot;></slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"child"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"hello from child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>在父级中，具有特殊特性 <code>slot-scope </code>的<code> &lt;template&gt;</code> 元素必须存在，表示它是作用域插槽的模板。<code>slot-scope </code>的值将被用作一个临时变量名，此变量接收从子组件传递过来的 <code>prop</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <child>
    <template slot-scope=&quot;props&quot;>
      <span>hello from parent</span>
      <span>"{{" props.text "}}"</span>
    </template>
  </child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from parent<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" props.text "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>如果我们渲染上述模板，得到的输出会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from parent<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from child<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<blockquote>在 <code>2.5.0+</code>，<code>slot-scope</code> 能被用在任意元素或组件中而<code>不再局限于 &lt;template&gt;</code>
</blockquote>
<p>作用域插槽更典型的用例是在列表组件中，允许使用者自定义如何渲染列表的每一项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-awesome-list :items=&quot;items&quot;>
  <!-- 作用域插槽也可以是具名的 -->
  <li
    slot=&quot;item&quot;
    slot-scope=&quot;props&quot;
    class=&quot;my-fancy-item&quot;>
    "{{" props.text "}}"
  </li>
</my-awesome-list>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-awesome-list</span> <span class="hljs-attr">:items</span>=<span class="hljs-string">"items"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 作用域插槽也可以是具名的 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
    <span class="hljs-attr">slot</span>=<span class="hljs-string">"item"</span>
    <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"props"</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">"my-fancy-item"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" props.text "}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">my-awesome-list</span>&gt;</span></span></code></pre>
<p>列表组件的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <slot name=&quot;item&quot;
    v-for=&quot;item in items&quot;
    :text=&quot;item.text&quot;>
    <!-- 这里写入备用内容 -->
  </slot>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"item"</span>
    <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>
    <span class="hljs-attr">:text</span>=<span class="hljs-string">"item.text"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 这里写入备用内容 --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p><strong>解构</strong></p>
<p><code>slot-scope </code>的值实际上是一个可以出现在函数签名参数位置的合法的 JavaScript 表达式。这意味着在受支持的环境 (单文件组件或现代浏览器) 中，您还可以在表达式中使用 ES2015 解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<child>
  <span slot-scope=&quot;{ text }&quot;>"{{" text "}}"</span>
</child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{ text }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{" text }</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span></code></pre>
<h1 id="articleHeader26">七.动态组件</h1>
<p>通过使用保留的<code> &lt;component&gt; </code>元素，并对其<code> is </code>特性进行动态绑定，你可以在同一个挂载点动态切换多个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#example'</span>,
  dat<span class="hljs-variable">a:</span> {
    currentVie<span class="hljs-variable">w:</span> <span class="hljs-string">'home'</span>
  },
  component<span class="hljs-variable">s:</span> {
    home: { /* ... */ },
    post<span class="hljs-variable">s:</span> { /* ... */ },
    archive: { /* ... */ }
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component v-bind:is=&quot;currentView&quot;>
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">v-bind:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 组件在 vm.currentview 变化时改变！ --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre>
<p>也可以直接绑定到组件对象上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Home = {
  template: '<p>Welcome home!</p>'
}

var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var Home = {
  template: <span class="hljs-string">'&lt;p&gt;Welcome home!&lt;/p&gt;'</span>
}

var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#example'</span>,
  dat<span class="hljs-variable">a:</span> {
    currentVie<span class="hljs-variable">w:</span> Home
  }
})</code></pre>
<h2 id="articleHeader27">keep-alive</h2>
<p>如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 <code>keep-alive</code> 指令参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
  <component :is=&quot;currentView&quot;>
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 非活动组件将被缓存！ --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<h1 id="articleHeader28">八.杂项</h1>
<h2 id="articleHeader29">编写可复用组件</h2>
<p>Vue 组件的 API 来自三部分——prop、事件和插槽：</p>
<ul>
<li>
<code>Prop</code> 允许外部环境传递数据给组件；</li>
<li>
<code>事件</code>允许从组件内触发外部环境的副作用；</li>
<li>
<code>插槽</code>允许外部环境将额外的内容组合在组件中。</li>
</ul>
<p>使用 v-bind 和 v-on 的简写语法，模板的意图会更清楚且简洁：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component
  :foo=&quot;baz&quot;
  :bar=&quot;qux&quot;
  @event-a=&quot;doThis&quot;
  @event-b=&quot;doThat&quot;
>
  <img slot=&quot;icon&quot; src=&quot;...&quot;>
  <p slot=&quot;main-text&quot;>Hello!</p>
</my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>
  <span class="hljs-attr">:foo</span>=<span class="hljs-string">"baz"</span>
  <span class="hljs-attr">:bar</span>=<span class="hljs-string">"qux"</span>
  @<span class="hljs-attr">event-a</span>=<span class="hljs-string">"doThis"</span>
  @<span class="hljs-attr">event-b</span>=<span class="hljs-string">"doThat"</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"..."</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"main-text"</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></code></pre>
<h2 id="articleHeader30">子组件引用</h2>
<p>尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 <code>ref </code>为子组件指定一个引用 ID。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot;>
  <user-profile ref=&quot;profile&quot;></user-profile>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"parent"</span>&gt;
  &lt;user-profile <span class="hljs-keyword">ref</span>=<span class="hljs-string">"profile"</span>&gt;&lt;/user-profile&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = new Vue({ el: '#parent' })
// 访问子组件实例
var child = parent.$refs.profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-keyword">parent</span> = <span class="hljs-literal">new</span> Vue({ el: <span class="hljs-string">'#parent'</span> })
<span class="hljs-comment">// 访问子组件实例</span>
<span class="hljs-built_in">var</span> child = <span class="hljs-keyword">parent</span>.$refs.profile</code></pre>
<p>当 <code>ref </code>和<code> v-for</code> 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。</p>
<blockquote>
<code>$refs </code>只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 <code>$refs</code>。</blockquote>
<h2 id="articleHeader31">异步组件</h2>
<p>在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了进一步简化，Vue.js 允许将组件定义为一个工厂函数，异步地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 将组件定义传入 resolve 回调函数
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.component(<span class="hljs-string">'async-example'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(resolve, reject)</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 将组件定义传入 resolve 回调函数</span>
    resolve({
      template: <span class="hljs-string">'&lt;div&gt;I am async!&lt;/div&gt;'</span>
    })
  }, <span class="hljs-number">1000</span>)
})</code></pre>
<p>工厂函数接收一个 <code>resolve</code> 回调，在收到从服务器下载的组件定义时调用。也可以调用 <code>reject(reason) </code>指示加载失败。这里使用 setTimeout 只是为了演示，实际上如何获取组件完全由你决定。</p>
<p>推荐配合 webpack 的代码分割功能 来使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.component(<span class="hljs-string">'async-webpack-example'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-comment">// 这个特殊的 require 语法告诉 webpack</span>
  <span class="hljs-comment">// 自动将编译后的代码分割成不同的块，</span>
  <span class="hljs-comment">// 这些块将通过 Ajax 请求自动下载。</span>
  <span class="hljs-built_in">require</span>([<span class="hljs-string">'./my-async-component'</span>], resolve)
})</code></pre>
<p>你可以在工厂函数中返回一个 Promise，所以当使用 webpack 2 + ES2015 的语法时可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(
  'async-webpack-example',
  // 该 `import` 函数返回一个 `Promise` 对象。
  () => import('./my-async-component')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>Vue.component(
  <span class="hljs-string">'async-webpack-example'</span>,
  <span class="hljs-regexp">//</span> 该 `<span class="javascript"><span class="hljs-keyword">import</span></span>` 函数返回一个 `<span class="javascript"><span class="hljs-built_in">Promise</span></span>` 对象。
  () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'./my-async-component'</span>)
)</code></pre>
<p>当使用局部注册时，也可以直接提供一个返回 Promise 的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-regexp">//</span> ...
  components: {
    <span class="hljs-string">'my-component'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./my-async-component'</span>)
  }
})</code></pre>
<h2 id="articleHeader32">高级异步组件(2.3.0 新增)</h2>
<p>自 2.3.0 起，异步组件的工厂函数也可以返回一个如下的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AsyncComp = () => ({
  // 需要加载的组件。应当是一个 Promise
  component: import('./MyComp.vue'),
  // 加载中应当渲染的组件
  loading: LoadingComp,
  // 出错时渲染的组件
  error: ErrorComp,
  // 渲染加载中组件前的等待时间。默认：200ms。
  delay: 200,
  // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
  timeout: 3000
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> AsyncComp = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-comment">// 需要加载的组件。应当是一个 Promise</span>
  component: <span class="hljs-keyword">import</span>(<span class="hljs-string">'./MyComp.vue'</span>),
  <span class="hljs-comment">// 加载中应当渲染的组件</span>
  loading: LoadingComp,
  <span class="hljs-comment">// 出错时渲染的组件</span>
  error: ErrorComp,
  <span class="hljs-comment">// 渲染加载中组件前的等待时间。默认：200ms。</span>
  delay: <span class="hljs-number">200</span>,
  <span class="hljs-comment">// 最长等待时间。超出此时间则渲染错误组件。默认：Infinity</span>
  timeout: <span class="hljs-number">3000</span>
})</code></pre>
<blockquote>注意，当一个异步组件被作为<code> vue-router </code>的路由组件使用时，这些高级选项都是无效的，因为在路由切换前就会提前加载所需要的异步组件。另外，如果你要在路由组件中使用上述写法，需要使用 <code>vue-router 2.4.0 以上</code>的版本。</blockquote>
<h2 id="articleHeader33">组件命名约定</h2>
<p>当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在组件定义中
components: {
  // 使用 kebab-case 注册
  'kebab-cased-component': { /* ... */ },
  // 使用 camelCase 注册
  'camelCasedComponent': { /* ... */ },
  // 使用 PascalCase 注册
  'PascalCasedComponent': { /* ... */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 在组件定义中</span>
<span class="hljs-string">components:</span> {
  <span class="hljs-comment">// 使用 kebab-case 注册</span>
  <span class="hljs-string">'kebab-cased-component'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// 使用 camelCase 注册</span>
  <span class="hljs-string">'camelCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// 使用 PascalCase 注册</span>
  <span class="hljs-string">'PascalCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> }
}</code></pre>
<p>在 HTML 模板中，请使用 kebab-case：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在 HTML 模板中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 在 HTML 模板中始终使用 kebab-case --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">kebab-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">kebab-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">camel-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">camel-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">pascal-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pascal-cased-component</span>&gt;</span></code></pre>
<p>当使用字符串模式时，可以不受 HTML 大小写不敏感的限制。这意味实际上在模板中，你可以使用下面的方式来引用你的组件：</p>
<ul>
<li>kebab-case</li>
<li>camelCase 或 kebab-case (如果组件已经被定义为 camelCase)</li>
<li>kebab-case、camelCase 或 PascalCase (如果组件已经被定义为 PascalCase)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components: {
  'kebab-cased-component': { /* ... */ },
  camelCasedComponent: { /* ... */ },
  PascalCasedComponent: { /* ... */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">components</span>: {
  <span class="hljs-string">'kebab-cased-component'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-attribute">camelCasedComponent</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-attribute">PascalCasedComponent</span>: { <span class="hljs-comment">/* ... */</span> }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<kebab-cased-component></kebab-cased-component>

<camel-cased-component></camel-cased-component>
<camelCasedComponent></camelCasedComponent>

<pascal-cased-component></pascal-cased-component>
<pascalCasedComponent></pascalCasedComponent>
<PascalCasedComponent></PascalCasedComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;kebab-cased-component&gt;</span><span class="hljs-section">&lt;/kebab-cased-component&gt;</span>

<span class="hljs-section">&lt;camel-cased-component&gt;</span><span class="hljs-section">&lt;/camel-cased-component&gt;</span>
<span class="hljs-section">&lt;camelCasedComponent&gt;</span><span class="hljs-section">&lt;/camelCasedComponent&gt;</span>

<span class="hljs-section">&lt;pascal-cased-component&gt;</span><span class="hljs-section">&lt;/pascal-cased-component&gt;</span>
<span class="hljs-section">&lt;pascalCasedComponent&gt;</span><span class="hljs-section">&lt;/pascalCasedComponent&gt;</span>
<span class="hljs-section">&lt;PascalCasedComponent&gt;</span><span class="hljs-section">&lt;/PascalCasedComponent&gt;</span></code></pre>
<p>这意味着 PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。</p>
<h2 id="articleHeader34">递归组件</h2>
<p>组件在它的模板内可以递归地调用自己。不过，只有当它有<code> name</code> 选项时才可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name: 'unique-name-of-my-component'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">name</span>: 'unique-<span class="hljs-built_in">name</span>-<span class="hljs-keyword">of</span>-<span class="hljs-keyword">my</span>-component'</code></pre>
<p>当你利用 <code>Vue.component</code> 全局注册了一个组件，全局的 <code>ID </code>会被自动设置为组件的 <code>name</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('unique-name-of-my-component', {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'unique-name-of-my-component'</span>, {
  <span class="hljs-comment">// ...</span>
})</code></pre>
<p>如果稍有不慎，递归组件可能导致死循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>name: <span class="hljs-comment">'stack-overflow',</span>
template: <span class="hljs-comment">'<span class="hljs-doctag">&lt;div&gt;</span><span class="hljs-doctag">&lt;stack-overflow&gt;</span><span class="hljs-doctag">&lt;/stack-overflow&gt;</span><span class="hljs-doctag">&lt;/div&gt;</span>'</span></code></pre>
<p>上面组件会导致一个“max stack size exceeded”错误，所以要确保递归调用有终止条件 (比如递归调用时使用 <code>v-if </code>并最终解析为 <code>false</code>)。</p>
<h2 id="articleHeader35">组件间的循环引用</h2>
<p>假设你正在构建一个文件目录树，像在 Finder 或资源管理器中。你可能有一个 <code>tree-folder </code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>
  <span>"{{" folder.name "}}"</span>
  <tree-folder-contents :children=&quot;folder.children&quot;/>
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" folder.name "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tree-folder-contents</span> <span class="hljs-attr">:children</span>=<span class="hljs-string">"folder.children"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>以及一个 tree-folder-contents 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li v-for=&quot;child in children&quot;>
    <tree-folder v-if=&quot;child.children&quot; :folder=&quot;child&quot;/>
    <span v-else>"{{" child.name "}}"</span>
  </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;ul&gt;
  &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"child in children"</span>&gt;
    &lt;tree-folder v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"child.children"</span> :folder=<span class="hljs-string">"child"</span>/&gt;
    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">else</span>&gt;"{{" child<span class="hljs-selector-class">.name</span> "}}"&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>当你仔细看时，会发现在渲染树上这两个组件同时为对方的父节点和子节点——这是矛盾的！当使用 Vue.component 将这两个组件注册为全局组件的时候，框架会自动为你解决这个矛盾。</p>
<p>然而，如果你使用诸如 webpack 或者 Browserify 之类的模块化管理工具来 require/import 组件的话，就会报错了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Failed to mount component: template or render function not defined." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;">Failed <span class="hljs-keyword">to</span> mount <span class="hljs-keyword">component</span>: template <span class="hljs-keyword">or</span> render <span class="hljs-keyword">function</span> <span class="hljs-keyword">not</span> defined.</code></pre>
<p>在我们的例子中，可以选择让 tree-folder 组件中来做这件事。我们知道引起矛盾的子组件是 tree-folder-contents，所以我们要等到 beforeCreate 生命周期钩子中才去注册它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>beforeCreate: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.$options.components.TreeFolderContents = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./tree-folder-contents.vue'</span>)
}</code></pre>
<h2 id="articleHeader36">X-Template</h2>
<p>另一种定义模板的方式是在 JavaScript 标签里使用 <code>text/x-template </code>类型，并且指定一个 id。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-template&quot; id=&quot;hello-world-template&quot;>
  <p>Hello hello hello</p>
</script>

Vue.component('hello-world', {
  template: '#hello-world-template'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"hello-world-template"</span>&gt;</span><span class="handlebars"><span class="xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello hello hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

Vue.component('hello-world', </span><span class="hljs-template-variable">{
  template: '#hello-world-template'
}</span><span class="xml">)</span></code></pre>
<p>这在有很多大模板的演示应用或者特别小的应用中可能有用，其它场合应该避免使用，因为这将模板和组件的其它定义分离了。</p>
<h2 id="articleHeader37">对低开销的静态组件使用 <code>v-once</code>
</h2>
<p>尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ...很多静态内容...\
    </div>\
  '
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-type">Vue</span>.component('terms-<span class="hljs-keyword">of</span>-service', {
  <span class="hljs-keyword">template</span>: '\
    &lt;<span class="hljs-keyword">div</span> v-once&gt;\
      &lt;h1&gt;<span class="hljs-type">Terms</span> <span class="hljs-keyword">of</span> <span class="hljs-type">Service</span>&lt;/h1&gt;\
      ...很多静态内容...\
    &lt;/<span class="hljs-keyword">div</span>&gt;\
  '
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从入门到进阶：组件Component详解（六）

## 原文链接
[https://segmentfault.com/a/1190000012826671](https://segmentfault.com/a/1190000012826671)

