---
title: 'vue 2 使用Bus.js实现非父子组件通信' 
date: 2019-01-03 2:30:10
hidden: true
slug: nbh4wedcjan
categories: [reprint]
---

{{< raw >}}

                    
<p>vue2中废弃了$dispatch和$broadcast广播和分发事件的方法。父子组件中可以用props和$emit()。如何实现非父子组件间的通信，可以通过实例一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，然后通过分别调用Bus事件触发和监听来实现通信和参数传递。<br>Bus.js可以是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
export default new Vue()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue()
</code></pre>
<p>在需要通信的组件都引入Bus.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Bus from '../common/js/bus.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../common/js/bus.js'</span></code></pre>
<p>添加一个button，点击后$emit一个事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button @click=&quot;toBus&quot;>子组件传给兄弟组件</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toBus"</span>&gt;</span>子组件传给兄弟组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>methods</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    toBus () {
        Bus.$emit('on', '来自兄弟组件')
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>methods: {
    toBus () {
        Bus.$emit(<span class="hljs-string">'on'</span>, <span class="hljs-string">'来自兄弟组件'</span>)
    }
  }</code></pre>
<p>另一个组件也import Bus.js 在钩子函数中监听on事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Bus from '../common/js/bus.js'
export default {
    data() {
      return {
        message: ''
      }
    },
    mounted() {
       Bus.$on('on', (msg) => {
         this.message = msg
       })
     }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../common/js/bus.js'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        message: <span class="hljs-string">''</span>
      }
    },
    mounted() {
       Bus.$<span class="hljs-literal">on</span>(<span class="hljs-string">'on'</span>, <span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
         <span class="hljs-keyword">this</span>.message = msg
       })
     }
   }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 2 使用Bus.js实现非父子组件通信

## 原文链接
[https://segmentfault.com/a/1190000010845885](https://segmentfault.com/a/1190000010845885)

