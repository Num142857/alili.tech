---
title: 'vue-router 实现分析' 
date: 2019-01-17 2:30:25
hidden: true
slug: v435voaplgi
categories: [reprint]
---

{{< raw >}}

                    
<p>vue-router 是 Vue.js 官方的路由库，本着学习的目的，我对 vue-router 的源码进行了阅读和分析，分享出来给其他感兴趣的同学做个参考吧。</p>
<h2 id="articleHeader0">参考</h2>
<ul>
<li><p>源码：<a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vuejs/vue-router v2.2.1 - github</a></p></li>
<li><p>文档：<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router 官方中文教程</a></p></li>
</ul>
<h2 id="articleHeader1">初步</h2>
<p>我们分别从不同的视角来看 vue-router。</p>
<ul><li><p>从开发者角度来看，是这样的：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
  routes: [
   {path: '/foo', component: {template: '<div>FOO</div>'"}}",
   {path: '/bar', component: {template: '<div>BAR</div>'"}}"
  ]
})

var vm = new Vue({
  el: '#app',
  router: router
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
   {<span class="hljs-attr">path</span>: <span class="hljs-string">'/foo'</span>, <span class="hljs-attr">component</span>: {<span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;FOO&lt;/div&gt;'</span>"}}",
   {<span class="hljs-attr">path</span>: <span class="hljs-string">'/bar'</span>, <span class="hljs-attr">component</span>: {<span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;BAR&lt;/div&gt;'</span>"}}"
  ]
})

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">router</span>: router
})</code></pre>
<p>我们创建一个 <code>router</code>，传入的 <code>routes</code> 中的每一项即为一条路由（route）配置，表示在匹配给定的地址时，应该使用什么组件渲染视图。</p>
<p>将 <code>router</code> 传入 <code>new Vue()</code> 用于创建根组件，这样根组件中对应的视图区域，可以基于 <code>router</code> 中的配置，根据页面地址显示不同的内容。当然，这还需要在组件模板中使用 <code>&lt;router-view&gt;</code> 来定义区域。</p>
<ul><li><p>从视图角度来看，是这样的：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  ...
  <router-view></router-view>
  ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>页面地址变更后，<code>&lt;router-view&gt;</code> 对应的区域会更新为地址匹配的组件。例如，路径是 <code>/foo</code> 则对应区域显示 FOO，路径是 <code>/bar</code> 则显示 BAR，路径没有匹配的组件时，则不显示内容。</p>
<ul><li><p>从数据角度来看，是这样的：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm
+ _router | $router
  - history
  - matcher
+ _route | $route
  - matched" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>vm
+ _router | $router
  -<span class="ruby"> history
</span>  -<span class="ruby"> matcher
</span>+ _route | $route
  -<span class="ruby"> matched</span></code></pre>
<p><code>vm.$router</code> 引用当前组件对应的 <code>router</code> 对象，该对象在初始化时（在 <code>vm</code> 创建过程中执行初始化），会启动对页面地址变更的监听，从而在变更时更新 <code>vm</code> 的数据（<code>$route</code>），进而触发视图的更新。</p>
<h2 id="articleHeader2">深入</h2>
<p><strong>如何实现对地址变更的监听？</strong></p>
<p>对于缺省的 <code>HashHistory</code> 模式（也就是基于页面地址的 hash 部分来实现路由功能，如 <code>http://example.com/path#/foo</code>、<code>http://example.com/path#/bar</code>），是通过监听 <code>hashChange</code> 事件来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('hashchange', () => {
  // this.transitionTo(...)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, () =&gt; {
  <span class="hljs-comment">// this.transitionTo(...)</span>
})</code></pre>
<p><a href="https://github.com/vuejs/vue-router/blob/v2.2.1/src/history/hash.js#L21" rel="nofollow noreferrer" target="_blank">源码</a></p>
<p>这个动作是什么时候执行的呢？</p>
<p>是在 <code>router.init()</code>（<a href="https://github.com/vuejs/vue-router/blob/v2.2.1/src/index.js#L103" rel="nofollow noreferrer" target="_blank">源码</a>）中调用的，而 <code>router.init()</code> 则是在根组件创建时（<a href="https://github.com/vuejs/vue-router/blob/v2.2.1/src/install.js#L24" rel="nofollow noreferrer" target="_blank">源码</a>）调用的。</p>
<p>而 Vue 组件在创建时，又怎么会去调用 <code>router.init()</code> 呢？</p>
<p>这是由于 vue-router 将自身作为一个插件安装到了 Vue，通过 <code>Vue.mixin()</code> 注册了一个 <code>beforeCreate()</code> 钩子函数，从而在之后所有的 Vue 组件创建时都会调用该钩子函数，给了检查是否有 <code>router</code> 参数，从而进行初始化的机会。进而通过层层调用执行了监听 <code>hashchange</code> 事件的动作。</p>
<p>整理一下：</p>
<ul>
<li><p><code>new Vue()</code></p></li>
<li><p>执行 vue-router 注入的 <code>beforeCreate</code> 钩子函数</p></li>
<li><p>执行 <code>router.init(vm)</code></p></li>
<li><p>执行 <code>history.setupListeners()</code>，注册事件监听</p></li>
</ul>
<p><strong>地址变更如何通知到 <code>vm</code>？</strong></p>
<p>这个过程比较简单，<code>hashchange</code> 时，执行 <code>history.transitionTo(...)</code>，在这个过程中，会进行地址匹配，得到一个对应当前地址的 <code>route</code>，然后将其设置到对应的 <code>vm._route</code> 上。</p>
<p>只是进行了赋值，为什么 <code>vm</code> 就可以感知到路由的改变了呢？</p>
<p>答案在 vue-router 注入 Vue 的 <code>beforeCreate</code> 钩子函数中（<a href="https://github.com/vuejs/vue-router/blob/v2.2.1/src/install.js#L25" rel="nofollow noreferrer" target="_blank">源码</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.util.defineReactive(this, '_route', this._router.history.current)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Vue.util.defineReactive(<span class="hljs-keyword">this</span>, <span class="hljs-string">'_route'</span>, <span class="hljs-keyword">this</span>._router.history.current)</code></pre>
<p>采用与 Vue 本身数据相同的“数据劫持”方式，这样对 <code>vm._route</code> 的赋值会被 Vue 拦截到，并且触发 Vue 组件的更新渲染流程。</p>
<p><strong>地址变更如果同步视图更新？</strong></p>
<p>接上一步，<code>vm._route</code> 已经接收到路由的变更，从而触发视图更新。而当视图更新进一步调用到 <code>&lt;router-view&gt;</code> 的 <code>render()</code> 时，即进入了 <code>&lt;router-view&gt;</code> 的处理（<a href="https://github.com/vuejs/vue-router/blob/v2.2.1/src/components/view.js#L12" rel="nofollow noreferrer" target="_blank">源码</a>）。</p>
<p><code>&lt;router-view&gt;</code> 的 <code>render()</code> 采用函数调用（<code>h()</code>）模式，而非通过模板生成。这也是 Vue2 支持的定义组件渲染逻辑的方式，类似 React 的 <code>render()</code>。采用这种模式的好处是可以完全利用 JavaScript 的能力来编写逻辑，不必受制于 Vue 的类 HTML 模板语法。</p>
<p>这里的主要处理逻辑是从根组件中取出当前的路由对象（<code>parent.$route</code>），然后取得该路由下对应的组件，然后交由该组件进行渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return h(component, data, children)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> h(component, data, children)</code></pre>
<p>这其中还涉及 <code>&lt;router-view&gt;</code> 嵌套的处理，不过主要逻辑就是这样了。</p>
<h2 id="articleHeader3">小结</h2>
<p>其实 vue-router 从 <code>&lt;router-view&gt;</code> 的实现来看，就是一个具有特定功能的 Vue 组件而已，不过要配合根组件的 router 发挥作用。但整体还是很“响应式”的，也是蛮“Vue风格”的。</p>
<p>vue-router 以插件方式“侵入”Vue，从而支持一个额外的 <code>router</code> 属性，以提供监听并改变组件路由数据的能力。这样每次路由发生改变后，可以同步到数据，进而“响应式”地触发组件的更新。</p>
<p><code>&lt;router-view&gt;</code> 作为根组件下的子组件，从根组件那里可以获取到当前的路由对象，进而根据路由对象的组件配置，取出组件并用其替换当前位置的内容。这样，也就完成整个路由变更到视图变更的过程。</p>
<p>路由变更到视图变更的过程整理为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hashchange
-->
match route
-->
set vm._route
-->
<router-view> render()
-->
render matched component" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>hashchange
-<span class="ruby">-&gt;
</span>match route
-<span class="ruby">-&gt;
</span>set vm._route
-<span class="ruby">-&gt;
</span>&lt;router-view&gt; render()
-<span class="ruby">-&gt;
</span>render matched component</code></pre>
<p>实现过程中的技术点包括：</p>
<ul>
<li><p>Vue 插件机制</p></li>
<li><p>响应式数据机制</p></li>
<li><p>Vue 渲染机制</p></li>
<li><p>地址变更监听</p></li>
</ul>
<h2 id="articleHeader4">最后</h2>
<p>我写了一个应用 Vue.js、vue-router 以及其他 Vue 相关工具（Vuex、vue-loader）的示例，感兴趣可以看下：<a href="https://github.com/luobotang/vue-demo" rel="nofollow noreferrer" target="_blank">luobotang/vue-demo - github</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-router 实现分析

## 原文链接
[https://segmentfault.com/a/1190000008831927](https://segmentfault.com/a/1190000008831927)

