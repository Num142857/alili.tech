---
title: 'render: h => h(App) $mount 什么意思' 
date: 2018-12-06 2:30:09
hidden: true
slug: los1azn10rb
categories: [reprint]
---

{{< raw >}}

                    
<p>初始一个vue.js项目时，常常发现main.js里有如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  render: h => h(App)
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>这什么意思？那我自己做项目怎么改？<br>其实<code>render: h =&gt; h(App)</code>是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function (createElement) {
    return createElement(App);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>render: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(createElement) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">createElement(App)</span>;
}</code></pre>
<p>进一步缩写为(ES6 语法)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render (createElement) {
    return createElement(App);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>render (createElement) {
    <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">createElement</span><span class="hljs-params">(App)</span></span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render (h){
    return h(App);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>render (<span class="hljs-keyword">h</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">h</span>(<span class="hljs-keyword">App</span>);
}</code></pre>
<p>ES6<a href="http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">箭头函数</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: h => h(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App);</code></pre>
<p>其中 根据 Vue.js 作者 Even You 的<a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/6" rel="nofollow noreferrer" target="_blank">回复</a>，h 的含义如下：</p>
<blockquote>It comes from the term "hyperscript", which is commonly used in many virtual-dom implementations. "Hyperscript" itself stands for "script that generates HTML structures" because HTML is the acronym for "hyper-text markup language".<br>它来自术语"hyperscript"，其通常用在 virtual-dom 的实现中。Hyperscript 本身是指 <br>生成HTML 结构的 script 脚本，因为 HTML 是 hyper-text markup language 的缩写（超文本标记语言）</blockquote>
<p>在这里推荐大家看官方文档:</p>
<h3 id="articleHeader0"><a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">渲染函数RenderFunction&amp;JSX的</a></h3>
<h3 id="articleHeader1"><a href="https://cn.vuejs.org/v2/api/#vm-mount" rel="nofollow noreferrer" target="_blank">API之Mount方法</a></h3>
<blockquote>将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 h 失去作用，在应用中会触发报错。</blockquote>
<h4>虚拟DOM / VNode</h4>
<blockquote>createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。createElement更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。我们把这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。</blockquote>
<p>总体来说，我带着揣测认为，Vue 在调用 render 方法时，会传入一个 createElement 函数作为参数，也就是这里的 h 的实参是 createElement 函数，这个函数的作用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，调用了 mount 方法，渲染成真实 DOM 节点，并挂载到（通常是div app）??节点上。</p>
<p>所以有时候你可以这么写...mount在root上了，一般都是在app上<br><span class="img-wrap"><img data-src="/img/bV7Y9S?w=2560&amp;h=1440" src="https://static.alili.tech/img/bV7Y9S?w=2560&amp;h=1440" alt="mount在root上" title="mount在root上" style="cursor: pointer; display: inline;"></span></p>
<p>我粗略的看了一下，这里其实牵扯到了一堆，比如:<br>其实vue有两种渲染方法，一种是通过模板&lt;template&gt;<br>一种是render function<br><a href="https://github.com/pfan123/front-end-navigator/issues/3" rel="nofollow noreferrer" target="_blank">https://github.com/pfan123/fr...</a></p>
<p><a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-vue-jsx</a></p>
<p>没搞懂..有空再填坑..</p>
<p>参考:<br>1.<a href="https://github.com/vuejs-templates/webpack-simple/issues/29" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs-temp...</a><br>2.<a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
render: h => h(App) $mount 什么意思

## 原文链接
[https://segmentfault.com/a/1190000014254740](https://segmentfault.com/a/1190000014254740)

