---
title: 'vue从入门到进阶：自定义指令directive，插件的封装以及混合mixins（七）' 
date: 2018-12-17 2:30:07
hidden: true
slug: 2tn7mfbteim
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一.自定义指令directive</h1>
<p>除了核心功能默认内置的指令 (<code>v-model</code> 和<code> v-show</code>)，Vue 也允许注册自定义指令。注意，在 <code>Vue2.0</code> 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。</p>
<p>来个实例，当页面加载时，该input元素将获得焦点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 注册一个全局自定义指令 `v-focus`</span>
Vue.directive(<span class="hljs-string">'focus'</span>, {
  <span class="hljs-comment">// 当被绑定的元素插入到 DOM 中时……</span>
  inserted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{
    <span class="hljs-comment">// 聚焦元素</span>
    el.focus()
  }
})</code></pre>
<p>如果想注册局部指令，组件中也接受一个<code> directives</code> 的选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">directives</span>: {
  <span class="hljs-attribute">focus</span>: {
    // 指令的定义
    inserted: function (el) {
      el.<span class="hljs-built_in">focus</span>()
    }
  }
}</code></pre>
<p>然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-focus>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> v-focus&gt;</code></pre>
<h2 id="articleHeader1">钩子函数</h2>
<p>一个指令定义对象可以提供如下几个钩子函数 (均为可选)：</p>
<ul>
<li>
<code>bind</code>：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</li>
<li>
<code>inserted</code>：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。</li>
<li>
<code>update</code>：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。</li>
<li>
<code>componentUpdated</code>：指令所在组件的 VNode 及其子 VNode 全部更新后调用。</li>
<li>
<code>unbind</code>：只调用一次，指令与元素解绑时调用。</li>
</ul>
<p>接下来我们来看一下钩子函数的参数 (即 <code>el</code>、<code>binding</code>、<code>vnode </code>和 <code>oldVnode</code>)。</p>
<h2 id="articleHeader2">钩子函数参数</h2>
<p>指令钩子函数会被传入以下参数：</p>
<ul>
<li>
<code>el</code>：指令所绑定的元素，可以用来直接操作 DOM 。</li>
<li>
<p><code>binding</code>：一个对象，包含以下属性：</p>
<ul>
<li>
<code>name</code>：指令名，不包括 v- 前缀。</li>
<li>
<code>value</code>：指令的绑定值，例如：<code>v-my-directive="1 + 1" </code>中，绑定值为<code> 2</code>。</li>
<li>
<code>oldValue</code>：指令绑定的前一个值，仅在 <code>update</code> 和 <code>componentUpdated </code>钩子中可用。无论值是否改变都可用。</li>
<li>
<code>expression</code>：字符串形式的指令表达式。例如 <code>v-my-directive="1 + 1"</code> 中，表达式为<code> "1 + 1"</code>。</li>
<li>
<code>arg</code>：传给指令的参数，可选。例如 <code>v-my-directive:foo </code>中，参数为<code> "foo"</code>。</li>
<li>
<code>modifiers</code>：一个包含修饰符的对象。例如：<code>v-my-directive.foo.bar</code> 中，修饰符对象为 <code>{ foo: true, bar: true }</code>。</li>
</ul>
</li>
<li>
<code>vnode</code>：<code>Vue</code> 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</li>
<li>
<code>oldVnode</code>：上一个虚拟节点，仅在<code> update</code> 和 <code>componentUpdated</code> 钩子中可用。</li>
</ul>
<blockquote>除了 <code>el </code>之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset" rel="nofollow noreferrer" target="_blank">dataset</a> 来进行。</blockquote>
<p>这是一个使用了这些属性的自定义钩子样例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;hook-arguments-example&quot; v-demo:foo.a.b=&quot;message&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"hook-arguments-example"</span> v-demo:foo<span class="hljs-selector-class">.a</span><span class="hljs-selector-class">.b</span>=<span class="hljs-string">"message"</span>&gt;&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.directive(<span class="hljs-string">'demo'</span>, {
  bind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, binding, vnode)</span> {</span>
    var s = JSON.stringify
    <span class="hljs-keyword">el</span>.innerHTML =
      <span class="hljs-string">'name: '</span>       + s(binding.name) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'value: '</span>      + s(binding.value) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'expression: '</span> + s(binding.expression) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'argument: '</span>   + s(binding.arg) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'modifiers: '</span>  + s(binding.modifiers) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'vnode keys: '</span> + Object.<span class="hljs-built_in">keys</span>(vnode).<span class="hljs-keyword">join</span>(<span class="hljs-string">', '</span>)
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#hook-arguments-example'</span>,
  dat<span class="hljs-variable">a:</span> {
    message: <span class="hljs-string">'hello!'</span>
  }
})</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name: &quot;demo&quot;
value: &quot;hello!&quot;
expression: &quot;message&quot;
argument: &quot;foo&quot;
modifiers: {&quot;a&quot;:true,&quot;b&quot;:true}
vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">name:</span> <span class="hljs-string">"demo"</span>
<span class="hljs-string">value:</span> <span class="hljs-string">"hello!"</span>
<span class="hljs-string">expression:</span> <span class="hljs-string">"message"</span>
<span class="hljs-string">argument:</span> <span class="hljs-string">"foo"</span>
<span class="hljs-string">modifiers:</span> {<span class="hljs-string">"a"</span>:<span class="hljs-literal">true</span>,<span class="hljs-string">"b"</span>:<span class="hljs-literal">true</span>}
vnode <span class="hljs-string">keys:</span> tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder</code></pre>
<p>在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vue.directive(<span class="hljs-string">'color-swatch'</span>, function (el, binding) {
  el<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.backgroundColor</span> = binding<span class="hljs-selector-class">.value</span>
})</code></pre>
<h2 id="articleHeader3">对象字面量</h2>
<p>如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-demo=&quot;{ color: 'white', text: 'hello!' }&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-demo</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{ color: 'white', text: 'hello!' }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => &quot;white&quot;
  console.log(binding.value.text)  // => &quot;hello!&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Vue.directive(<span class="hljs-string">'demo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-title">el</span>, <span class="hljs-title">binding</span>) {</span>
  console.<span class="hljs-built_in">log</span>(binding.<span class="hljs-built_in">value</span>.color)<span class="hljs-comment"> // =&gt; "white"</span>
  console.<span class="hljs-built_in">log</span>(binding.<span class="hljs-built_in">value</span>.<span class="hljs-keyword">text</span>) <span class="hljs-comment"> // =&gt; "hello!"</span>
})</code></pre>
<h1 id="articleHeader4">二.插件</h1>
<p>插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：</p>
<ul>
<li>1.添加全局方法或者属性，如: <a href="https://github.com/karol-f/vue-custom-element" rel="nofollow noreferrer" target="_blank">vue-custom-element</a>
</li>
<li>2.添加全局资源：指令/过滤器/过渡等，如 <a href="https://github.com/vuejs/vue-touch" rel="nofollow noreferrer" target="_blank">vue-touch</a>
</li>
<li>3.通过全局 mixin 方法添加一些组件选项，如: <a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router</a>
</li>
<li>4.添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。</li>
<li>5.一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 <a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router</a>
</li>
</ul>
<p>Vue.js 的插件应当有一个公开方法<code> install</code> 。这个方法的第一个参数是 <code>Vue</code> 构造器，第二个参数是一个可选的选项对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }

  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })

  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })

  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(methodOptions)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<h2 id="articleHeader5">怎样使用插件</h2>
<p>通过全局方法<code> Vue.use() </code>使用插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)</code></pre>
<p>也可以传入一个选项对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(MyPlugin, { someOption: true })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(<span class="hljs-selector-tag">MyPlugin</span>, { <span class="hljs-attribute">someOption</span>: true })</code></pre>
<p><code>Vue.use</code> 会自动阻止多次注册相同插件，届时只会注册一次该插件。</p>
<p><code>Vue.js</code> 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用<code> Vue.use()</code>。然而在例如 CommonJS 的模块环境中，你应该始终显式地调用 <code>Vue.use()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时</span>
<span class="hljs-keyword">var</span> Vue = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue'</span>)
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-router'</span>)

<span class="hljs-comment">// 不要忘了调用此方法</span>
Vue.<span class="hljs-keyword">use</span>(VueRouter)</code></pre>
<h2 id="articleHeader6">简单例子</h2>
<p>封装一个全局的插件，如下：<br>在src下的components文件夹下新建一个countdown文件夹，新建一个countdown.vue文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>封装一个最简单的插件</div>
</template>
<script>
export default{
    name:'count-down'
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>封装一个最简单的插件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>:<span class="hljs-string">'count-down'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在放countdown.vue的同级目录下新建一个index.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import countDown from './countdown';

countDown.install = function(Vue){
    Vue.component(countDown.name,countDown)
};

export default countDown;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> countDown <span class="hljs-keyword">from</span> <span class="hljs-string">'./countdown'</span>;

countDown.install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>)</span>{
    Vue.component(countDown.name,countDown)
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> countDown;</code></pre>
<p>在main.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import countDown from './components/countdown/index.js' 
Vue.use(countDown)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> countDown <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/countdown/index.js'</span> 
Vue.use(countDown)</code></pre>
<p>在组件中就可以这样使用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<count-down></count-down>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;count-down&gt;</span><span class="hljs-section">&lt;/count-down&gt;</span></code></pre>
<h1 id="articleHeader7">三.混合mixins</h1>
<p>混合 (<code>mixins</code>) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。当组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个混合对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混合对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => &quot;hello from mixin!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 定义一个混合对象</span>
<span class="hljs-keyword">var</span> myMixin = {
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.hello()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello from mixin!'</span>)
    }
  }
}

<span class="hljs-comment">// 定义一个使用混合对象的组件</span>
<span class="hljs-keyword">var</span> Component = Vue.extend({
  <span class="hljs-attr">mixins</span>: [myMixin]
})

<span class="hljs-keyword">var</span> component = <span class="hljs-keyword">new</span> Component() <span class="hljs-comment">// =&gt; "hello from mixin!"</span></code></pre>
<h2 id="articleHeader8">选项合并</h2>
<p>当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，混合对象的 钩子将在组件自身钩子 之前 调用 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  created: function () {
    console.log('混合对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => &quot;混合对象的钩子被调用&quot;
// => &quot;组件钩子被调用&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mixin = {
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'混合对象的钩子被调用'</span>)
  }
}

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">mixins</span>: [mixin],
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件钩子被调用'</span>)
  }
})

<span class="hljs-comment">// =&gt; "混合对象的钩子被调用"</span>
<span class="hljs-comment">// =&gt; "组件钩子被调用"</span></code></pre>
<p>值为对象的选项，例如<code> methods</code>, <code>components</code> 和 <code>directives</code>，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => &quot;foo&quot;
vm.bar() // => &quot;bar&quot;
vm.conflicting() // => &quot;from self&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var mixin = {
  method<span class="hljs-variable">s:</span> {
    foo: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'foo'</span>)
    },
    conflictin<span class="hljs-variable">g:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'from mixin'</span>)
    }
  }
}

var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  mixin<span class="hljs-variable">s:</span> [mixin],
  method<span class="hljs-variable">s:</span> {
    bar: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'bar'</span>)
    },
    conflictin<span class="hljs-variable">g:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'from self'</span>)
    }
  }
})

<span class="hljs-keyword">vm</span>.foo() // =&gt; <span class="hljs-string">"foo"</span>
<span class="hljs-keyword">vm</span>.bar() // =&gt; <span class="hljs-string">"bar"</span>
<span class="hljs-keyword">vm</span>.conflicting() // =&gt; <span class="hljs-string">"from self"</span></code></pre>
<blockquote>注意：<code>Vue.extend() </code>也使用同样的策略进行合并。</blockquote>
<h2 id="articleHeader9">全局混合</h2>
<p>也可以全局注册混合对象。注意使用！ 一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => &quot;hello!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 为自定义的选项 'myOption' 注入一个处理器。</span>
Vue.mixin({
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myOption = <span class="hljs-keyword">this</span>.$options.myOption
    <span class="hljs-keyword">if</span> (myOption) {
      <span class="hljs-built_in">console</span>.log(myOption)
    }
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">myOption</span>: <span class="hljs-string">'hello!'</span>
})
<span class="hljs-comment">// =&gt; "hello!"</span></code></pre>
<blockquote>
<code>谨慎使用全局混合对象</code>，因为会影响到每个单独创建的 Vue 实例 (包括第三方模板)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。也可以将其用作 Plugins 以避免产生重复应用</blockquote>
<h2 id="articleHeader10">自定义选项合并策略</h2>
<p>自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 <code>Vue.config.optionMergeStrategies</code> 添加一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Vue.config.optionMergeStrategies.myOption = <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(toVal, fromVal) {
  // <span class="hljs-keyword">return</span> <span class="hljs-type">mergedVal</span>
}</code></pre>
<p>对于大多数对象选项，可以使用 methods 的合并策略：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> strategies = Vue<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.optionMergeStrategies</span>
strategies<span class="hljs-selector-class">.myOption</span> = strategies.methods</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从入门到进阶：自定义指令directive，插件的封装以及混合mixins（七）

## 原文链接
[https://segmentfault.com/a/1190000012827871](https://segmentfault.com/a/1190000012827871)

