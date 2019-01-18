---
title: '开发一个简单指令理解 Vue 的 v-model 语法糖' 
date: 2019-01-19 2:30:10
hidden: true
slug: af2564pj3rr
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 中有若干个“语法糖”：</p>
<ul>
<li>v-model 语法糖</li>
<li>组件注册语法糖</li>
<li>arr.$set 语法糖</li>
</ul>
<p>后两种语法糖即使不深入理解，也可以直接应用，然而如果没有充分理解第一种语法糖，那么就可能遇到一些奇怪的问题。</p>
<p>考虑如下需求：</p>
<blockquote>编写一个自定义指令，使得在文本输入框中输入的敏感词（如：f..k）自动删除，并更新通过 v-model 指令所绑定的 Vue 实例数据。</blockquote>
<p>自定义指令定义对象包含若干钩子函数，我们在 update 钩子函数里实现相关功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('exclude', {
  update: function (el, {value}) {
    try
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
    } catch (e) {
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>Vue.directive(<span class="hljs-string">'exclude'</span>, {
  update: <span class="hljs-keyword">function</span> (el, {<span class="hljs-keyword">value</span>}) {
    <span class="hljs-keyword">try</span>
      el.<span class="hljs-keyword">value</span> = el.<span class="hljs-keyword">value</span>.replace(<span class="hljs-keyword">new</span> RegExp(<span class="hljs-keyword">value</span>, <span class="hljs-string">'gi'</span>), <span class="hljs-string">''</span>)
    } <span class="hljs-keyword">catch</span> (e) {
    }
  }
})</code></pre>
<p>其中 {value} 是 ES6 的解构语法，可以在函数体内通过 value 直接获取参数对象的 value 属性。为避免修改指令参数对应的 Vue 实例数据时导致 new RegExp 出错，这里的赋值语句使用 try ... catch 进行错误捕获。</p>
<p>对应模板如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
  To be excluded: <input v-model=&quot;excluded&quot;><br>
  <textarea v-model=&quot;content&quot; v-exclude=&quot;excluded&quot;></textarea>
  <div>
    "{{"content"}}"
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
  To be excluded: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"excluded"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">v-exclude</span>=<span class="hljs-string">"excluded"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>其中的 excluded 和 content 均为 Vue 实例数据。</p>
<p>然而在实际使用时，却发现，textarea 中输入的 fork 虽然被删除了，但 Vue 实例数据中的数据仍然包含了对应的单词。</p>
<p><span class="img-wrap"><img data-src="/img/bVKe7a?w=264&amp;h=93" src="https://static.alili.tech/img/bVKe7a?w=264&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是什么原因导致的呢？这涉及到 v-model 是一个语法糖这样一个事实，<code>&lt;input v-model="something"&gt;</code> 等价于 <code>&lt;input v-bind:value="something" v-on:input="something = $event.target.value"&gt;</code>，因此在自定义指令中，通过 update 钩子函数在用户输入变化时修改 DOM 元素的 value 还不够，还需要触发 DOM 元素的 input 事件，使得通过 v-model 指令绑定的 Vue 实例数据得到更新，自定义指令修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('exclude', {
  update: function (el, {value}) {
    try
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
      el.dispatchEvent(new Event('input'))
    } catch (e) {
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.directive(<span class="hljs-string">'exclude'</span>, {
  <span class="hljs-keyword">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, {value})</span> {</span>
    <span class="hljs-keyword">try</span>
      <span class="hljs-keyword">el</span>.value = <span class="hljs-keyword">el</span>.value.replace(<span class="hljs-keyword">new</span> RegExp(value, <span class="hljs-string">'gi'</span>), <span class="hljs-string">''</span>)
      <span class="hljs-keyword">el</span>.dispatchEvent(<span class="hljs-keyword">new</span> Event(<span class="hljs-string">'input'</span>))
    } <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">e</span>) {
    }
  }
})</code></pre>
<p>考虑到 v-model 支持 lazy 修饰符，使用 lazy 修饰符时，v-model 的数据更新在 change 事件中触发，我们还需要能够针对不同的情况触发不同的事件，处理方式是在 v-exclude 指令中也增加可选的 lazy 修饰符，代码修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('exclude', {
  update: function(el, {value, modifiers}, vnode) {
    try {
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
      el.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
    } catch (e) {
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.directive(<span class="hljs-string">'exclude'</span>, {
  <span class="hljs-keyword">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, {value, modifiers}, vnode)</span> {</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">el</span>.value = <span class="hljs-keyword">el</span>.value.replace(<span class="hljs-keyword">new</span> RegExp(value, <span class="hljs-string">'gi'</span>), <span class="hljs-string">''</span>)
      <span class="hljs-keyword">el</span>.dispatchEvent(<span class="hljs-keyword">new</span> Event(modifiers.lazy ? <span class="hljs-string">'change'</span> : <span class="hljs-string">'input'</span>))
    } <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">e</span>) {
    }
  }
})</code></pre>
<p>约定若 v-model 使用了 lazy 修饰符，v-exclude 同样也要使用 lazy 修饰符。</p>
<p>基于对 v-model 语法糖的理解，在创建如 date-picker 之类的自定义组件时，在组件中添加 value 的 prop 用于数据的传入，并在用户交互时通过 $emit 方法使用新的数据为参数触发一个 input 事件，就可以在标签中通过 v-model 双向绑定数据到子组件中了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发一个简单指令理解 Vue 的 v-model 语法糖

## 原文链接
[https://segmentfault.com/a/1190000008598850](https://segmentfault.com/a/1190000008598850)

