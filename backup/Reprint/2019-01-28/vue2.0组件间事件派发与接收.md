---
title: 'vue2.0组件间事件派发与接收' 
date: 2019-01-28 2:30:09
hidden: true
slug: bnv2v3r0g6
categories: [reprint]
---

{{< raw >}}

                    
<p>在vue的开发中，经常会在两个组件间进行事件的通信</p>
<p>在vue1.0中我们使用$dispatch 和 $broadcast</p>
<p>child.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$dispatch('eventName',this.data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'eventName'</span>,<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>);</code></pre>
<p>parent.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event:{
    'eventName':function(data) {
        // 执行的方法
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>event:{
    <span class="hljs-string">'eventName'</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span> </span>{
        <span class="hljs-comment">// 执行的方法</span>
    }
}</code></pre>
<p>但是在vue2.0中$dispatch 和 $broadcast被弃用，因为基于组件树结构的事件流方式实在是让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱,并且这只适用于父子组件间的通信。官方给出的最简单的升级建议是使用集中的事件处理器,而且也明确说明了 一个空的vue实例就可以做到,因为Vue 实例实现了一个事件分发接口<br>在vue2.0中在初始化vue之前，给data添加一个 名字为eventhub 的空vue对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  render: h =&gt; <span class="hljs-built_in">h</span>(App),
  data: {
    eventHub: new <span class="hljs-built_in">Vue</span>()
  }
})</code></pre>
<p>某一个组件内调用事件触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$root.eventHub.$emit('eventName', event.target);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">this.$root.eventHub.$emit(<span class="hljs-string">'eventName'</span>, <span class="hljs-keyword">event</span>.target);</code></pre>
<p>另一个组件内调用事件接收, 在组件销毁时接除事件绑定,使用$off方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
    this.$root.eventHub.$on('eventName',(target) => {
    this.functionName(target)
  });
},
method:{
    functionName(target) {
    console.log(target);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>created() <span class="hljs-comment">{
    this.$root.eventHub.$on('eventName',(target) =&gt; {
    this.functionName(target)
  }</span>);
},
<span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-comment">{
    functionName(target) {
    console.log(target);
    }</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0组件间事件派发与接收

## 原文链接
[https://segmentfault.com/a/1190000008018314](https://segmentfault.com/a/1190000008018314)

