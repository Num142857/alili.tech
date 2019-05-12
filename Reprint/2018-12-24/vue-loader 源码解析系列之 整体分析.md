---
title: 'vue-loader 源码解析系列之 整体分析' 
date: 2018-12-24 2:30:07
hidden: true
slug: dege4m6osn9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>笔者系 vue-loader 贡献者（#16）之一</p></blockquote>
<h1 id="articleHeader0">官方说明</h1>
<blockquote><p>vue-loader is a loader for Webpack that can transform Vue components written in the following format into a plain JavaScript module</p></blockquote>
<p>简单来说就是：将 <em>.vue 文件变成 </em>.bundle.js，然后放入浏览器运行。</p>
<h1 id="articleHeader1">观察输入输出</h1>
<h2 id="articleHeader2">输入</h2>
<p>测试是最好的文档，所以我们从测试用例开始分析，找到test/fixture/basic.vue，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <h2 class=&quot;red&quot;>"{{"msg"}}"</h2>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from Component A!'
    }
  }
}
</script>

<style>
comp-a h2 {
  color: #f00;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"red"</span>&gt;</span>"{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello from Component A!'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">comp-a</span> <span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#f00</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader3">输出</h2>
<p>通过运行测试之后，可以得到以下输出，但是由于文件巨大，笔者只抽出部分开始分析，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./lib/selector.js?type=script&amp;index=0&amp;bustCache!./test/fixtures/basic.vue

/* harmony default export */ 
var basic = ({
  data() {
    return {
      msg: 'Hello from Component A!'
    };
  }
});
// CONCATENATED MODULE: ./lib/template-compiler?{&quot;id&quot;:&quot;data-v-b647d0ce&quot;,&quot;hasScoped&quot;:false,&quot;buble&quot;:{&quot;transforms&quot;:{"}}"}!./lib/selector.js?type=template&amp;index=0&amp;bustCache!./test/fixtures/basic.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(&quot;h2&quot;, { staticClass: &quot;red&quot; }, [_vm._v(_vm._s(_vm.msg))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var fixtures_basic = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require(&quot;vue-hot-reload-api&quot;)      .rerender(&quot;data-v-b647d0ce&quot;, esExports)
  }
}
// CONCATENATED MODULE: .!./test/fixtures/basic.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(3)
}
var normalizeComponent = __webpack_require__(8)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  basic,
  fixtures_basic,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = &quot;test/fixtures/basic.vue&quot;
if (Component.esModule &amp;&amp; Object.keys(Component.esModule).some(function (key) {  return key !== &quot;default&quot; &amp;&amp; key.substr(0, 2) !== &quot;__&quot;})) {  console.error(&quot;named exports are not supported in *.vue files.&quot;)}

})()}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
"use strict"</span>;
<span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });

<span class="hljs-comment">// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./lib/selector.js?type=script&amp;index=0&amp;bustCache!./test/fixtures/basic.vue</span>

<span class="hljs-comment">/* harmony default export */</span> 
<span class="hljs-keyword">var</span> basic = ({
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello from Component A!'</span>
    };
  }
});
<span class="hljs-comment">// CONCATENATED MODULE: ./lib/template-compiler?{"id":"data-v-b647d0ce","hasScoped":false,"buble":{"transforms":{"}}"}!./lib/selector.js?type=template&amp;index=0&amp;bustCache!./test/fixtures/basic.vue</span>
<span class="hljs-keyword">var</span> render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _vm = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> _h = _vm.$createElement
  <span class="hljs-keyword">var</span> _c = _vm._self._c || _h
  <span class="hljs-keyword">return</span> _c(<span class="hljs-string">"h2"</span>, { <span class="hljs-attr">staticClass</span>: <span class="hljs-string">"red"</span> }, [_vm._v(_vm._s(_vm.msg))])
}
<span class="hljs-keyword">var</span> staticRenderFns = []
render._withStripped = <span class="hljs-literal">true</span>
<span class="hljs-keyword">var</span> esExports = { <span class="hljs-attr">render</span>: render, <span class="hljs-attr">staticRenderFns</span>: staticRenderFns }
<span class="hljs-comment">/* harmony default export */</span> <span class="hljs-keyword">var</span> fixtures_basic = (esExports);
<span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {
  <span class="hljs-built_in">module</span>.hot.accept()
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot.data) {
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"vue-hot-reload-api"</span>)      .rerender(<span class="hljs-string">"data-v-b647d0ce"</span>, esExports)
  }
}
<span class="hljs-comment">// CONCATENATED MODULE: .!./test/fixtures/basic.vue</span>
<span class="hljs-keyword">var</span> disposed = <span class="hljs-literal">false</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">injectStyle</span> (<span class="hljs-params">ssrContext</span>) </span>{
  <span class="hljs-keyword">if</span> (disposed) <span class="hljs-keyword">return</span>
  __webpack_require__(<span class="hljs-number">3</span>)
}
<span class="hljs-keyword">var</span> normalizeComponent = __webpack_require__(<span class="hljs-number">8</span>)
<span class="hljs-comment">/* script */</span>

<span class="hljs-comment">/* template */</span>

<span class="hljs-comment">/* template functional */</span>
<span class="hljs-keyword">var</span> __vue_template_functional__ = <span class="hljs-literal">false</span>
<span class="hljs-comment">/* styles */</span>
<span class="hljs-keyword">var</span> __vue_styles__ = injectStyle
<span class="hljs-comment">/* scopeId */</span>
<span class="hljs-keyword">var</span> __vue_scopeId__ = <span class="hljs-literal">null</span>
<span class="hljs-comment">/* moduleIdentifier (server only) */</span>
<span class="hljs-keyword">var</span> __vue_module_identifier__ = <span class="hljs-literal">null</span>
<span class="hljs-keyword">var</span> Component = normalizeComponent(
  basic,
  fixtures_basic,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = <span class="hljs-string">"test/fixtures/basic.vue"</span>
<span class="hljs-keyword">if</span> (Component.esModule &amp;&amp; <span class="hljs-built_in">Object</span>.keys(Component.esModule).some(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{  <span class="hljs-keyword">return</span> key !== <span class="hljs-string">"default"</span> &amp;&amp; key.substr(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>) !== <span class="hljs-string">"__"</span>})) {  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"named exports are not supported in *.vue files."</span>)}

})()}

</code></pre>
<h1 id="articleHeader4">分析输出</h1>
<p>以上的输出就是最终可以拿到浏览器上运行的 javaScript，尽管笔者已经删除了一些会影响理解的部分代码，但是这么直接观察这个文件，难免还是无从下手。</p>
<p>那么我们继续细化分析步骤，vue-loader 将 basic.vue 编译到最终输出的 bundle.js 的过程中，其实调用了四个小的 loader。它们分别是：</p>
<ul>
<li>selector</li>
<li>style-compiler</li>
<li>template-compiler</li>
<li>babel-loader</li>
</ul>
<p>以上四个 loader ，除了 babel-loader 是外部的package，其他三个都存在于 vue-loader 的内部（lib/style-compiler 和 lib/template-compiler 和 lib/selector）。</p>
<p>首先 vue-loader 将 basic.vue 编译成以下内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* script */
import __vue_script__ from &quot;!!babel-loader!../../lib/selector?type=script&amp;index=0&amp;bustCache!./basic.vue&quot;
/* template */
import __vue_template__ from &quot;!!../../lib/template-compiler/index?{\&quot;id\&quot;:\&quot;data-v-793be54c\&quot;,\&quot;hasScoped\&quot;:false,\&quot;buble\&quot;:{\&quot;transforms\&quot;:{"}}"}!../../lib/selector?type=template&amp;index=0&amp;bustCache!./basic.vue&quot;
/* styles */
import __vue_styles__ from &quot;!!vue-style-loader!css-loader!../../lib/style-compiler/index?{\&quot;vue\&quot;:true,\&quot;id\&quot;:\&quot;data-v-793be54c\&quot;,\&quot;scoped\&quot;:false,\&quot;hasInlineConfig\&quot;:false}!../../lib/selector?type=styles&amp;index=0&amp;bustCache!./basic.vue&quot;
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* script */</span>
<span class="hljs-keyword">import</span> __vue_script__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!babel-loader!../../lib/selector?type=script&amp;index=0&amp;bustCache!./basic.vue"</span>
<span class="hljs-comment">/* template */</span>
<span class="hljs-keyword">import</span> __vue_template__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!../../lib/template-compiler/index?{\"id\":\"data-v-793be54c\",\"hasScoped\":false,\"buble\":{\"transforms\":{"}}"}!../../lib/selector?type=template&amp;index=0&amp;bustCache!./basic.vue"</span>
<span class="hljs-comment">/* styles */</span>
<span class="hljs-keyword">import</span> __vue_styles__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!vue-style-loader!css-loader!../../lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-793be54c\",\"scoped\":false,\"hasInlineConfig\":false}!../../lib/selector?type=styles&amp;index=0&amp;bustCache!./basic.vue"</span>
<span class="hljs-keyword">var</span> Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)</code></pre>
<p>为了方便理解，笔者删除修改了一些内容。</p>
<p>在三个 import 语句中，不管它们用了多少个不同的 loader 去加载，loader chain 的源头都是 basic.vue。</p>
<h2 id="articleHeader5">JavaScript 部分</h2>
<p>首先分析 script 部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* script */
import __vue_script__ from &quot;!!babel-loader!../../lib/selector?type=script&amp;index=0&amp;bustCache!./basic.vue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* script */</span>
<span class="hljs-keyword">import</span> __vue_script__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!babel-loader!../../lib/selector?type=script&amp;index=0&amp;bustCache!./basic.vue"</span></code></pre>
<p>从做右到左，也就是 basic.vue 被先后被 selector 和 babel-loader 处理过了。</p>
<p>selector（参数type=script） 的处理结果是将 basic.vue 中的 javaScript 抽出来之后交给babel-loader去处理，最后生成可用的 javaScript</p>
<h2 id="articleHeader6">Template 部分</h2>
<p>再来分析 template 部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* template */
import __vue_template__ from &quot;!!../../lib/template-compiler/index?{\&quot;id\&quot;:\&quot;data-v-793be54c\&quot;,\&quot;hasScoped\&quot;:false,\&quot;buble\&quot;:{\&quot;transforms\&quot;:{"}}"}!../../lib/selector?type=template&amp;index=0&amp;bustCache!./basic.vue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* template */</span>
<span class="hljs-keyword">import</span> __vue_template__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!../../lib/template-compiler/index?{\"id\":\"data-v-793be54c\",\"hasScoped\":false,\"buble\":{\"transforms\":{"}}"}!../../lib/selector?type=template&amp;index=0&amp;bustCache!./basic.vue"</span></code></pre>
<p>同样的，从左到右，basic.vue 先后被 selector 和 template-compiler 处理过了。</p>
<p>selector (参数type=template) 的处理结果是将 basic.vue 中的 template 抽出来之后交给 template-compiler 处理，最终输出成可用的 HTML。</p>
<h2 id="articleHeader7">Style 部分</h2>
<p>最后分析 style 部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* styles */
import __vue_styles__ from &quot;!!vue-style-loader!css-loader!../../lib/style-compiler/index?{\&quot;vue\&quot;:true,\&quot;id\&quot;:\&quot;data-v-793be54c\&quot;,\&quot;scoped\&quot;:false,\&quot;hasInlineConfig\&quot;:false}!../../lib/selector?type=styles&amp;index=0&amp;bustCache!./basic.vue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* styles */</span>
<span class="hljs-keyword">import</span> __vue_styles__ <span class="hljs-keyword">from</span> <span class="hljs-string">"!!vue-style-loader!css-loader!../../lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-793be54c\",\"scoped\":false,\"hasInlineConfig\":false}!../../lib/selector?type=styles&amp;index=0&amp;bustCache!./basic.vue"</span></code></pre>
<p>style 涉及的 loader 较多，一个一个来分析， 从上代码可知，basic.vue 先后要被 selector, style-compiler, css-loader 以及 vue-style-loader 处理。</p>
<p>selector (参数type=style) 的处理结果是将 basic.vue 中的 css 抽出来之后交给 style-compiler 处理成 css, 然后交给 css-loader 处理生成 module, 最后通过 vue-style-loader 将 css 放在 <code>&lt;style&gt;</code> 里面，然后注入到 HTML 里。</p>
<p>注意，这里之所以没有用 style-loader 是因为 vue-style-loader 是在 fork 了 style-loader 的基础上，增加了后端绘制 (SSR) 的支持。具体的不同，读者可以查看官方文档，笔者这里不再累述。</p>
<h1 id="articleHeader8">后续</h1>
<p>通过上面的介绍，想必读者已经对 vue-loader 以及它涉及的几个 loader 的作用有了一个大概的了解。</p>
<p>那么接下来，在后续文章中我们来开始一个个分析这几个 loader 的源码。</p>
<ul>
<li><a href="https://nicholaslee119.github.io/2017/12/01/vueLoader%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E7%B3%BB%E5%88%97%E4%B9%8Bselector/" rel="nofollow noreferrer" target="_blank">vue-loader 源码解析之二 selector</a></li>
<li>vue-loader 源码解析之三 style-compiler (写作中)</li>
<li>vue-loader 源码解析之四 template-compiler (写作中)</li>
</ul>
<p><a href="https://nicholaslee119.github.io/" rel="nofollow noreferrer" target="_blank">作者博客</a></p>
<p><a href="https://weibo.com/u/5890721762/" rel="nofollow noreferrer" target="_blank">作者微博</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-loader 源码解析系列之 整体分析

## 原文链接
[https://segmentfault.com/a/1190000012207211](https://segmentfault.com/a/1190000012207211)

