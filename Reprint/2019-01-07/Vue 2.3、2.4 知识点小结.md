---
title: 'Vue 2.3、2.4 知识点小结' 
date: 2019-01-07 2:30:11
hidden: true
slug: l0fst8j664
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文连接 <a href="https://github.com/jkchao/blog/issues/15" rel="nofollow noreferrer" target="_blank">blog</a> ， 本文不涉及 SSR.</p></blockquote>
<p>2.3 参考 <a href="https://github.com/vuejs/vue/releases/tag/v2.3.0" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a><br>2.4 参考 <a href="https://github.com/vuejs/vue/releases/tag/v2.4.0" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a><br>实例 demo 地址：<a href="https://github.com/jkchao/vue-demo" rel="nofollow noreferrer" target="_blank">https://github.com/jkchao/vue...</a></p>
<hr>
<h1 id="articleHeader0">2.3</h1>
<ul>
<li>
<p><code>style</code> 多重值；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div :style=&quot;{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  &lt;div :style=<span class="hljs-string">"{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这会渲染数组中最后一个被浏览器支持的值。</p>
</li>
<li><p>新增<code>.passive</code> 修饰符 (<a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo1.vue" rel="nofollow noreferrer" target="_blank">demo1</a>) ； .passive 修饰符表示事件永远不会调用 preventDefault() ，主要为解决滚动和触摸事件的卡顿而出现，关于 passive 更多信息请移步 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer" target="_blank">MDN</a> 。</p></li>
<li>
<p>重新引入 <code>.sync</code> 修饰符  (<a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo2.vue" rel="nofollow noreferrer" target="_blank">demo2</a>)；提供对于 prop 的双向绑定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <child :bar.sync=&quot;foo&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  &lt;child :bar.sync=<span class="hljs-string">"foo"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span></code></pre>
<p>其实是个语法糖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <child :bar=&quot;foo&quot; @update:bar=&quot;e => foo = e&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  &lt;child :bar=<span class="hljs-string">"foo"</span> @update:bar=<span class="hljs-string">"e =&gt; foo = e"</span>&gt;</code></pre>
<p>此时需要在子组件中显示触发事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.$emit('update:bar', newValue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update:bar'</span>, newValue)</code></pre>
</li>
<li>
<p>Async Component  Improvements (<a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo3.vue" rel="nofollow noreferrer" target="_blank">demo3</a>);</p>
<p>在 2.3 之前，可以使用异步组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// some.vue
export default {
  // ...
  components: {
    'asyncCom': () => import('./asyncCøm')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// some.vue</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// ...</span>
  components: {
    <span class="hljs-string">'asyncCom'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./asyncCøm'</span>)
  }
}</code></pre>
<p>2.3 新增高级异步组件</p>
<p>官网上比较清楚：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010297938" src="https://static.alili.tech/img/remote/1460000010297938" alt="" title="" style="cursor: pointer;"></span></p>
</li>
</ul>
<p>为了便于演示，使用延迟加载异步组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 import loadingCom from '../components/loadingCom.vue'
 import errCom from '../components/errCom.vue'
 const asyncCom = () => ({
   component: new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve(import('../components/asyncCom.vue'))
     }, 2000)
   }),
   loading: loadingCom,
   error: errCom,
   delay: 200,
   timeout: 3000
 })
 
 export default {
   // ...
   components: { asyncCom }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
 <span class="hljs-keyword">import</span> loadingCom <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/loadingCom.vue'</span>
 <span class="hljs-keyword">import</span> errCom <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/errCom.vue'</span>
 <span class="hljs-keyword">const</span> asyncCom = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
   <span class="hljs-attr">component</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
     setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       resolve(<span class="hljs-keyword">import</span>(<span class="hljs-string">'../components/asyncCom.vue'</span>))
     }, <span class="hljs-number">2000</span>)
   }),
   <span class="hljs-attr">loading</span>: loadingCom,
   <span class="hljs-attr">error</span>: errCom,
   <span class="hljs-attr">delay</span>: <span class="hljs-number">200</span>,
   <span class="hljs-attr">timeout</span>: <span class="hljs-number">3000</span>
 })
 
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
   <span class="hljs-comment">// ...</span>
   components: { asyncCom }
 }
</code></pre>
<p>效果如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010297939" src="https://static.alili.tech/img/remote/1460000010297939" alt="" title="" style="cursor: pointer;"></span></p>
<p>或者，你也可以点击后加载 (<a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo4.vue" rel="nofollow noreferrer" target="_blank">demo4</a>)：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010297940" src="https://static.alili.tech/img/remote/1460000010297940" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然，也可以用于 <code>vue-router</code> ( 2.40+ ) <a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo5.vue" rel="nofollow noreferrer" target="_blank">demo5</a>。</p>
<ul><li><p>Functional Component Improvements；</p></li></ul>
<p>在2.3 + 版本，函数式组件可以省略 <code>props</code> 选项，所有组件上的属性会被自动解析 成<code>props</code>，更多内容，请参考 <a href="https://cn.vuejs.org/v2/guide/render-function.html#" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a>函数化组件 。</p>
<h1 id="articleHeader1">2.4</h1>
<ul><li><p><code>v-on</code> 支持绑定一个事件／监听器键值对的对象，此时不支持任何修饰器；</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <button v-on=&quot;{ mousedown: some, mouseup: other }&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  &lt;button v-on=<span class="hljs-string">"{ mousedown: some, mouseup: other }"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></code></pre>
<ul><li><p>新增 <code>comments</code> 选项，当设为 <code>true</code> 时，将会保留且渲染模板中的 HTML 注释；<br>  该选项暂时无法在构建工具中使用 <a href="https://github.com/vuejs/vue/issues/6177" rel="nofollow noreferrer" target="_blank"> issues</a>。</p></li></ul>
<ul>
<li>
<p>新增 <code>interitAttrs</code> 选项；</p>
<p>在版本 2.4 之前，默认情况下父作用域的不被作为<code>props</code>特性绑定的属性，将会作为普通的 HTML 属性，应用在跟元素上。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parent.vue
<template>
  <child-commpent :foo=&quot;f&quot; :boo=&quot;b&quot;></child-comment>
</template>

<script>
const childComment = () => import('./childCom.vue')
export default {
  data () {
    return {
      f: 'Hello world!'
      b: 'Hello Vue!'
    }  
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// parent.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">child-commpent</span> <span class="hljs-attr">:foo</span>=<span class="hljs-string">"f"</span> <span class="hljs-attr">:boo</span>=<span class="hljs-string">"b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-comment</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">const</span> childComment = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./childCom.vue'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">f</span>: <span class="hljs-string">'Hello world!'</span>
      b: <span class="hljs-string">'Hello Vue!'</span>
    }  
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// childComment.vue
<template>
  <div>"{{" foo "}}"<div>
</template>

<script>
export default {
  props: ['foo']
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// childComment.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" foo "}}"<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'foo'</span>]
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>最后会被渲染为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div boo=&quot;Hello Vue!&quot;>Hello world!</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;div boo=<span class="hljs-string">"Hello Vue!"</span>&gt;Hello world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>设置 <code>interitAttrs</code> 为 <code>false</code>，之后，不会应用到跟元素上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// childCom.vue
<template>
  <div>"{{" foo "}}"</div>
</template>

<script>
export default {
  props: ['foo'],
  inheritAttrs: false
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// childCom.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" foo "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  props: ['foo'],
  inheritAttrs: false
}
&lt;/</span>script&gt;
</code></pre>
<p>渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div>Hello world!</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
&lt;div&gt;Hello world!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre>
</li>
<li>
<p>新增 <code>$attrs, $listeners</code> 选项；</p>
<p>多级组件嵌套需要传递数据时，通常使用的方法是通过 <code>vuex</code> 。如果仅仅是传递数据，而不做中间处理，使用 <code>vuex</code> 处理，未免有点杀鸡用牛刀，Vue 2.4 版本提供了另一种方法，使用 <code> v-bind="$attrs" </code>, 将父组件中不被认为 <code>props</code>特性绑定的属性传入子组件中，通常配合 <code>interitAttrs</code> 选项一起使用，具体请看 demo 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo.vue
<template>
  <div>
    <child-com :foo=&quot;foo&quot; :boo=&quot;boo&quot; :coo=&quot;coo&quot; :doo=&quot;doo&quot;></child-com>
  </div>
</tempalte>
<script>
const childCom = () => import('./childCom1.vue')
export default {
  data () {
    return {
      foo: 'Hello World!',
      boo: 'Hello Javascript!',
      coo: 'Hello Vue',
      doo: 'Last'
    }
  },
  components: { childCom }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-com</span> <span class="hljs-attr">:foo</span>=<span class="hljs-string">"foo"</span> <span class="hljs-attr">:boo</span>=<span class="hljs-string">"boo"</span> <span class="hljs-attr">:coo</span>=<span class="hljs-string">"coo"</span> <span class="hljs-attr">:doo</span>=<span class="hljs-string">"doo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-com</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tempalte</span>&gt;</span></span>
&lt;script&gt;
<span class="hljs-keyword">const</span> childCom = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./childCom1.vue'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">foo</span>: <span class="hljs-string">'Hello World!'</span>,
      <span class="hljs-attr">boo</span>: <span class="hljs-string">'Hello Javascript!'</span>,
      <span class="hljs-attr">coo</span>: <span class="hljs-string">'Hello Vue'</span>,
      <span class="hljs-attr">doo</span>: <span class="hljs-string">'Last'</span>
    }
  },
  <span class="hljs-attr">components</span>: { childCom }
}
&lt;<span class="hljs-regexp">/script&gt;
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// childCom1.vue
<template>
  <div>
    <p>foo: "{{" foo "}}"</p>
    <p>attrs: "{{" $attrs "}}"</p>
    <child-com2 v-bind=&quot;$attrs&quot;></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import('./childCom2.vue')
export default {
  props: ['foo'],
  inheritAttrs: false,
  created () {
    console.log(this.$attrs) // { boo: 'Hello Javascript!', coo: 'Hello Vue', doo: 'Last' }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// childCom1.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>foo: "{{" foo "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>attrs: "{{" $attrs "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child-com2</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"$attrs"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-com2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
<span class="hljs-keyword">const</span> childCom2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./childCom2.vue'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'foo'</span>],
  <span class="hljs-attr">inheritAttrs</span>: <span class="hljs-literal">false</span>,
  created () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$attrs) <span class="hljs-comment">// { boo: 'Hello Javascript!', coo: 'Hello Vue', doo: 'Last' }</span>
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// childCom2.vue
<template>
  <div>
   <p>boo: "{{" boo "}}"</p>
   <p>attrs: "{{" $attrs "}}"</p>
   <child-com3 v-bind=&quot;$attrs&quot;></child-com3>
  </div>
</template>

<script>
const childCom3 = () => import('./childCom3.vue')
export default {
  props: ['boo']
  inheritAttrs: false,
  created () {
    console.log(this.$attrs) // { coo: 'Hello Vue', doo: 'Last' }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// childCom2.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>boo: "{{" boo "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>attrs: "{{" $attrs "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">child-com3</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"$attrs"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-com3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">const</span> childCom3 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./childCom3.vue'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'boo'</span>]
  inheritAttrs: <span class="hljs-literal">false</span>,
  created () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$attrs) <span class="hljs-comment">// { coo: 'Hello Vue', doo: 'Last' }</span>
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// childCom3.vue
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// childCom3.vue</span>
<span class="hljs-comment">// ...</span></code></pre>
<p>最后被渲染为</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010297941" src="https://static.alili.tech/img/remote/1460000010297941" alt="" title="" style="cursor: pointer;"></span></p>
<p>具体请看 <a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo6.vue" rel="nofollow noreferrer" target="_blank">demo6</a> 。</p>
<p><code>$listeners</code> 的用法和 <code>$attrs</code> 类似，<a href="https://github.com/jkchao/vue-demo/blob/master/src/views/demo6.vue" rel="nofollow noreferrer" target="_blank">demo6</a> 。</p>
</li>
</ul>
<hr>
<p>完。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.3、2.4 知识点小结

## 原文链接
[https://segmentfault.com/a/1190000010297933](https://segmentfault.com/a/1190000010297933)

