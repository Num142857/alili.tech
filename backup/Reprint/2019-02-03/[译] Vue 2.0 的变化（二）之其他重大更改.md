---
title: '[译] Vue 2.0 的变化（二）之其他重大更改' 
date: 2019-02-03 2:30:39
hidden: true
slug: q8bje9wauqa
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">
<code>v-for</code>迭代语法变化</h3>
<ul>
<li><p>丢弃<del><code>$index</code></del>和<del><code>$key</code></del></p></li>
<li>
<p>新数组语法</p>
<ul>
<li><p>value in arr</p></li>
<li><p>(value, index) in arr</p></li>
</ul>
</li>
<li>
<p>新对象语法</p>
<ul>
<li><p>value in obj</p></li>
<li><p>(value, key) in obj</p></li>
<li><p>(value, key, index) in obj</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">指令接口的改变</h3>
<p>大体来说，2.0版本中指令大范围的降低功能，它们仅用于低层次的直接dom操作。在多数情况下，你更应该使用组件作为主要的代码重构抽象。</p>
<p>指令不再有实例，这意味着指令中将不存在<code>this</code>，并且<code>bind</code>, <code>update</code>和<code>unbind</code>目前将接受任何数据作为参数。</p>
<p>请注意，绑定对象是不可变的。设置<code>binding.value</code>没有任何效果。并且在它上面添加属性不会持久，如果你真的非常需要可以在<code>el</code>配置上添加指令状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-example:arg.modifier=&quot;a.b&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-example:arg.modifier</span>=<span class="hljs-string">"a.b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example directive
export default {
  bind (el, binding, vnode) {
    // the binding object exposes value, oldValue, expression, arg and modifiers.
    binding.expression // &quot;a.b&quot;
    binding.arg // &quot;arg&quot;
    binding.modifiers // { modifier: true }
    // the context Vue instance can be accessed as vnode.context.
  },

  // update has a few changes, see below
  update (el, binding, vnode, oldVnode) { ... },

  // componentUpdated is a new hook that is called AFTER the entire component
  // has completed the current update cycle. This means all the DOM would
  // be in updated state when this hook is called. Also, this hook is always
  // called regardless of whether this directive's value has changed or not.
  componentUpdated (el, binding, vnode, oldVNode) { ... },

  unbind (el, binding, vnode) { ... }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// example directive</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  bind (el, binding, vnode) {
    <span class="hljs-comment">// the binding object exposes value, oldValue, expression, arg and modifiers.</span>
    binding.expression <span class="hljs-comment">// "a.b"</span>
    binding.arg <span class="hljs-comment">// "arg"</span>
    binding.modifiers <span class="hljs-comment">// { modifier: true }</span>
    <span class="hljs-comment">// the context Vue instance can be accessed as vnode.context.</span>
  },

  <span class="hljs-comment">// update has a few changes, see below</span>
  update (el, binding, vnode, oldVnode) { ... },

  <span class="hljs-comment">// componentUpdated is a new hook that is called AFTER the entire component</span>
  <span class="hljs-comment">// has completed the current update cycle. This means all the DOM would</span>
  <span class="hljs-comment">// be in updated state when this hook is called. Also, this hook is always</span>
  <span class="hljs-comment">// called regardless of whether this directive's value has changed or not.</span>
  componentUpdated (el, binding, vnode, oldVNode) { ... },

  unbind (el, binding, vnode) { ... }
}</code></pre>
<p>如果你只关心值可以使用解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  bind (el, { value }) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  bind (el, { value }) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>除此之外，<code>update</code>钩子有一些变化：</p>
<ul>
<li><p>在<code>bind</code>之后将不再自动调用</p></li>
<li><p>当组件重新渲染时总能响应，无论被绑定的值是否发生改变。你可以通过<code>binding.value === binding.oldValue</code>比较跳过不必要的更新，但也会有情况下，你希望应用始终更新。例如，当指令绑定到对象那可能希望是变化而不是替代。</p></li>
</ul>
<p><code>elementDirective</code>, 指令参数和指令配置，例如<code>acceptStatement</code>, <code>deep</code>等等<br>均被删除。</p>
<h3 id="articleHeader2">过滤器用法和语法变化</h3>
<p>在vue 2.0，filter有了一系列的变化：</p>
<ul>
<li><p>filter现在只能用于文本插入（<code>"{{""}}"</code>标签）。在之前我们在指令中使用filter，例如<code>v-model</code>，<code>v-on</code>等等，导致使用的复杂性，并且在<code>v-for</code>上的列表过滤，它更适合迁移到计算性能的js中。</p></li>
<li><p>vue 2.0不提供任何内置过滤器。建议使用独立的方法解决特定域的问题，例如<a href="http://momentjs.com/" rel="nofollow noreferrer" target="_blank">moment.js</a>用于格式化时间，<a href="http://openexchangerates.github.io/accounting.js/" rel="nofollow noreferrer" target="_blank">accounting.js</a>用于格式化金融货币。也欢迎你来创建自己的过滤器，并与社区分享吧！</p></li>
<li>
<p>filter语法更改为内嵌的js函数调用，而不是采取空格分割的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" date | formatDate('YY-MM-DD') "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">"{{" date | formatDate(<span class="hljs-string">'YY-MM-DD'</span>) "}}"</code></pre>
</li>
</ul>
<h3 id="articleHeader3">过渡组件</h3>
<h4>过渡CSS的变化</h4>
<ul>
<li><p><code>v-enter</code>：在元素插入前应用，1秒后删除。（开始于进入状态）</p></li>
<li><p><code>v-enter-active</code>：在元素插入前应用，当<code>transition</code>/<code>animation</code>结束时移除。</p></li>
<li><p><code>v-leave</code>：当离开的<code>transition</code>触发时正确应用，一秒后删除。（开始于离开状态）</p></li>
<li><p><code>v-leave-active</code>：当离开的<code>transition</code>触发时正确应用，当<code>transition</code>/<code>animation</code>结束时移除。</p></li>
</ul>
<p><code>v-enter-active</code>和<code>v-leave-active</code>帮助你指定不同的曲线用于进入/离开动画。在多数情况下，升级只需将当前的<code>v-leave</code>替换为<code>v-leave-active</code>。（对于css动画，使用<code>v-enter-active</code>和<code>v-leave-active</code>）</p>
<h4>过渡API的变化</h4>
<ul><li><p><code>&lt;transition&gt;</code>组件</p></li></ul>
<p>所有单元素的过度效果通过使用<code>&lt;transition&gt;</code>这个内置组件包装目标元素或组件得到相应的效果。这是一个抽象组件，意味着它不会渲染额外的DOM元素，也不会在组件层次结构中展示。它仅仅用于过渡行为里面的包裹内容。</p>
<p>最简单的用法示例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition>
  <div v-if=&quot;ok&quot;>toggled content</div>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span>toggled content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<p>该组件定义了一些属性和事件，直接映射到旧版的过渡定义选项。</p>
<h5>属性</h5>
<ul>
<li>
<p>name: String</p>
<ul><li><p>用于自动生成过渡CSS类名。例如，<code>name: 'fade'</code>将会自动生成 <code>.fade-enter</code>、<code>.fade-enter-active</code>等等。默认是<code>v</code>。</p></li></ul>
</li>
<li>
<p>appear: Boolean</p>
<ul><li><p>是否在最初的渲染应用的过渡。（默认值<code>false</code>）</p></li></ul>
</li>
<li>
<p>css: Boolean</p>
<ul><li><p>是否应用css过度类，默认值<code>true</code>。如果设置为<code>false</code>，只能通过触发组件事件注册的JavaScript钩子。</p></li></ul>
</li>
<li>
<p>type: String</p>
<ul><li><p>指定等待确定过渡结束时转变的事件类型。可用的值是<code>transition</code>和<code>animation</code>。默认情况下，它会自动检测一个持续时间较长的类型。</p></li></ul>
</li>
<li>
<p>mode: String</p>
<ul><li><p>控制离开/进入转换的时序。可用的模式是<code>in-out</code>和<code>out-in</code>，默认为同步。</p></li></ul>
</li>
<li>
<p>enterClass, leaveClass, enterActiveClass, leaveActiveClass, appearClass, appearActiveClass: String</p>
<ul><li><p>单独配置的过渡css类</p></li></ul>
</li>
</ul>
<p>过渡到动态组件的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;fade&quot; mode=&quot;out-in&quot; appear>
  <component :is=&quot;view&quot;></component>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"out-in"</span> <span class="hljs-attr">appear</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<h5>事件</h5>
<p>对应的在1.x API中可用的js钩子：</p>
<ul>
<li><p>before-enter</p></li>
<li><p>enter</p></li>
<li><p>after-enter</p></li>
<li><p>before-leave</p></li>
<li><p>leave</p></li>
<li><p>after-leave</p></li>
<li><p>before-appear</p></li>
<li><p>appear</p></li>
<li><p>after-appear</p></li>
</ul>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition @after-enter=&quot;transitionComplete&quot;>
  <div v-show=&quot;ok&quot;>toggled content</div>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> @<span class="hljs-attr">after-enter</span>=<span class="hljs-string">"transitionComplete"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"ok"</span>&gt;</span>toggled content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<p>当进入的过渡效果完成时，组件的<code>transitionComplete</code>方法将会在过渡DOM元素作为参数被调用。</p>
<p>一些注意事项：</p>
<ul>
<li><p><code>leave-cancelled</code>在插入删除中不可用。一旦离开的过渡效果开始，将不能被取消。但是仍然可用于<code>v-show</code>。</p></li>
<li><p>和1.0类似，对于<code>enter</code>和<code>leave</code>钩子，在<code>cb</code>作为第二个参数的存在下表示使用者想要过渡结束时间的明确控制。</p></li>
</ul>
<h5>
<code>&lt;transition-group&gt;</code>组件</h5>
<p>所有的多元素过渡效果通过使用<code>&lt;transition-group&gt;</code>内置组件包装元素应用。它暴露了和<code>&lt;transition&gt;</code>一样的属性和事件。不同之处在于：</p>
<ol>
<li><p>不同于<code>&lt;transition&gt;</code>,<code>&lt;transition-group&gt;</code>渲染一个真实的DOM元素。默认是渲染一个<code>&lt;span&gt;</code>标签，并且你可以配置哪些元素应该通过标记的属性呈现。你也可以使用<code>is</code>特性，例如<code>&lt;ul is="transition-group"&gt;</code>。</p></li>
<li><p><code>&lt;transition-group&gt;</code>不支持<code>mode</code>属性。</p></li>
<li><p><code>&lt;transition-group&gt;</code>下的子组件必须有唯一的key。</p></li>
</ol>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition-group tag=&quot;ul&quot; name=&quot;slide&quot;>
  <li v-for=&quot;item in items&quot; :key=&quot;item.id&quot;>
    "{{" item.text "}}"
  </li>
</transition-group>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition-group</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"ul"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"slide"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
    "{{" item.text "}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition-group</span>&gt;</span></code></pre>
<h4>创建可重用的转换</h4>
<p>现在<code>transitions</code>能够通过组件应用，它们补在被视为一种单独类型，因此全局的<code>Vue.transition()</code>方法和<code>transition</code>配置都被丢弃。你可以通过组件的属性和方法配置内嵌的过渡。但是，我们现在怎么创建可重复使用的过渡效果，尤其是那些自定义的js钩子？答案是创建自己的过渡组件（它们特别适合作为功能组件）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('fade', {
  functional: true,
  render (createElement, { children }) {
    const data = {
      props: {
        name: 'fade'
      },
      on: {
        beforeEnter () { /* ... */ }, // <-- Note hooks use camelCase in JavaScript (same as 1.x)
        afterEnter () { /* ... */ }
      }
    }
    return createElement('transition', data, children)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'fade'</span>, {
  <span class="hljs-attr">functional</span>: <span class="hljs-literal">true</span>,
  render (createElement, { children }) {
    <span class="hljs-keyword">const</span> data = {
      <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'fade'</span>
      },
      <span class="hljs-attr">on</span>: {
        beforeEnter () { <span class="hljs-comment">/* ... */</span> }, <span class="hljs-comment">// &lt;-- Note hooks use camelCase in JavaScript (same as 1.x)</span>
        afterEnter () { <span class="hljs-comment">/* ... */</span> }
      }
    }
    <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'transition'</span>, data, children)
  }
})</code></pre>
<p>你可以这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<fade>
  <div v-if=&quot;ok&quot;>toggled content</div>
</fade>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">fade</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span>toggled content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">fade</span>&gt;</span></code></pre>
<h3 id="articleHeader4">
<code>v-model</code>的变化</h3>
<ul>
<li>
<p><code>lazy</code>和<code>number</code>参数现在是修饰符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model.lazy=&quot;text&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model.lazy</span>=<span class="hljs-string">"text"</span>&gt;</span></code></pre>
</li>
<li><p>新的修饰符：<code>.trim</code>-修整输入，顾名思义</p></li>
<li><p><code>debounce</code>参数被丢弃</p></li>
<li>
<p><code>v-model</code>不再关心初始值。它始终将data的数据作为资源。这意味着数据将是以1呈现而不是2.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
val: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data: {
<span class="hljs-attr">val</span>: <span class="hljs-number">1</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;val&quot; value=&quot;2&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"val"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span>&gt;</span></code></pre>
</li>
<li>
<p>当使用<code>v-for</code>时，<code>v-model</code>不再生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-for=&quot;str in strings&quot; v-model=&quot;str&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"str in strings"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"str"</span>&gt;</span></code></pre>
</li>
</ul>
<h3 id="articleHeader5">Refs</h3>
<ul>
<li>
<p><code>v-ref</code>现在不再是一个指令，而是一个类似于<code>key</code>的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- before -->
<comp v-ref:foo></comp>

<!-- after -->
<comp ref=&quot;foo&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- before --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-ref:foo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>

<span class="hljs-comment">&lt;!-- after --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"foo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<p>依然支持动态绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<comp :ref=&quot;dynamicRef&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">:ref</span>=<span class="hljs-string">"dynamicRef"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
</li>
<li><p><code>vm.$els</code>和<code>vm.$refs</code>合并了。在正常元素上使用是DOM元素，在组件上使用是组件实例。</p></li>
</ul>
<h3 id="articleHeader6">杂项</h3>
<ul>
<li>
<p><code>track-by</code>已经被<code>key</code>替代。对于绑定属性它遵守相同的规则，没有<code>v-bind:</code>或者<code>:</code>字头，它被视为普通字符串。大多数情况下需要动态绑定，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 1.x -->
<div v-for=&quot;item in items&quot; track-by=&quot;id&quot;>

<!-- 2.0 -->
<div v-for=&quot;item in items&quot; :key=&quot;item.id&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 1.x --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"id"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 2.0 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span></code></pre>
</li>
<li>
<p>内插值属性已被弃用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 1.x -->
<div id=&quot;"{{" id "}}"&quot;>

<!-- 2.0 -->
<div :id=&quot;id&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 1.x --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""{{" id "}}""</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 2.0 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"id"</span>&gt;</span></code></pre>
</li>
<li><p>属性绑定行为变化：当绑定属性时，只有<code>null</code>、<code>undefine</code>和<code>false</code>被认为是<code>false</code>。这意味着0和空字符串依旧呈现出原来的样子。对于枚举属性，<code>:draggable="''"</code>将被渲染为<code>draggable="true"</code>。<br>另外，对于枚举属性，除了上述<code>false</code>的值，<code>false</code>字符串也会被渲染为<code>attr="false"</code>。</p></li>
<li><p>当使用一个自定义组件，<code>v-on</code>只听自定义事件<code>$emitted</code>挂载在组件上。（不再监听DOM事件）</p></li>
<li><p><code>v-else</code>不再适用于<code>v-show</code>，请使用其他的否定表达式。</p></li>
<li><p>单次绑定（<code>"{{"* foo "}}"</code>）被移除，请使用<code>v-once</code>。</p></li>
<li><p><code>Array.prototype.$set</code>/<code>$remove</code>被丢弃（使用<code>Vue.set</code>或者<code>Array.prototype.splice</code>）。</p></li>
<li><p><code>:style</code>不再支持<code>!import</code>。</p></li>
<li><p><code>root</code>实例不能使用<code>props</code>（请使用<code>propsData</code>）</p></li>
<li><p>在<code>Vue.extend</code>中<code>el</code>配置项不能被使用,它现在只能被用作一个实例创建选项。</p></li>
<li><p>在vue的实例中不能使用<code>Vue.set</code>和<code>Vue.delete</code></p></li>
</ul>
<h3 id="articleHeader7">升级小提示</h3>
<h4>如何处理丢弃的<code>$dispatch</code>和<code>$broadcast</code>？</h4>
<p>我们弃用<code>$dispatch</code>和<code>$broadcast</code>的原因在于依赖组件树结构的事件流，当组件树变得很大时很难推理（简单地说：它不能在大型应用很好地扩展，我们不希望以后给你设置痛点）。<code>$dispatch</code>和<code>$broadcast</code>不能解决同级组件之间的通信。从而，你可以使用和node中的<code>EventEmitter</code>类似的模式：一个允许组件通信的集中事件枢纽，无论他们在组件树的任何地方。因为vue的实例实现了事件发射接口，你可以使用空的vue实例达到目的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in component A's method
bus.$emit('id-selected', 1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// in component A's method</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in component B's created hook
bus.$on('id-selected', this.someMethod)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// in component B's created hook</span>
bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-keyword">this</span>.someMethod)</code></pre>
<p>并且不要忘记使用<code>$off</code>解绑事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in component B's destroyed hook
bus.$off('id-selected', this.someMethod)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// in component B's destroyed hook</span>
bus.$off(<span class="hljs-string">'id-selected'</span>, <span class="hljs-keyword">this</span>.someMethod)</code></pre>
<p>这种模式在简单的场景中可以作为<code>$dispatch</code>和<code>$broadcast</code>的替代。但是在复杂的场景中，建议使用<code>vuex</code>建立一个专门的状态管理层。</p>
<h4>如何处理数组中filter的弃用？</h4>
<p>对于使用<code>v-for</code>进行列表过滤-过滤器常见用法之一-现在建议使用<code>computed</code>属性返回原始数组的一个副本（查阅<a href="https://github.com/vuejs/vue/blob/next/examples/grid/grid.js#L21-L41" rel="nofollow noreferrer" target="_blank">更新数据例子</a>）。好处在于你不再受到<code>filter</code>语法的限制，现在它只是普通的javascript，并且你可以正常访问过滤结果，因为它只是一个计算的属性。</p>
<h4>如何处理在<code>v-model</code>中<code>debounce</code>的丢弃？</h4>
<p><code>debounce</code>用于我们多久执行异步请求和其他操作，在<code>v-model</code>中使用十分容易，但这样也延迟了状态更新带来了限制。<br>当在设计一个搜索功能时这个限制变得很明显，看看这个<a href="https://jsbin.com/zefawu/3/edit?html,output" rel="nofollow noreferrer" target="_blank">例子</a>，使用<code>debounce</code>属性，在搜索之前没法检测脏数据，因为我们不能访问输入的实时状态。</p>
<blockquote><p>未完待续....</p></blockquote>
<hr>
<blockquote><p>翻译自<a href="https://github.com/vuejs/vue/issues/2873" rel="nofollow noreferrer" target="_blank">2.0 Changes</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Vue 2.0 的变化（二）之其他重大更改

## 原文链接
[https://segmentfault.com/a/1190000007018605](https://segmentfault.com/a/1190000007018605)

