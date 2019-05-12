---
title: 'Vue.js组件中v-model的使用' 
date: 2019-01-14 2:30:07
hidden: true
slug: pqk3gjjqxn
categories: [reprint]
---

{{< raw >}}

                    
<p>在 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js</a> 中，经常会使用 <a href="https://cn.vuejs.org/v2/guide/forms.html" rel="nofollow noreferrer" target="_blank">v-model</a> 实现表单的双向数据绑定功能。</p>
<p>使用 <a href="http://element.eleme.io/#/zh-CN" rel="nofollow noreferrer" target="_blank">Element</a> 组件时，组件库中的含有输出类型的自定义组件，都会使用v-model指令，该指令绑定的元素就是组件的输出结果。比如 <a href="http://element.eleme.io/#/zh-CN/component/select" rel="nofollow noreferrer" target="_blank">select选择器</a></p>
<p><span class="img-wrap"><img data-src="/img/bVNZvP?w=1182&amp;h=368" src="https://static.alili.tech/img/bVNZvP?w=1182&amp;h=368" alt="Element的select组件使用说明" title="Element的select组件使用说明" style="cursor: pointer; display: inline;"></span></p>
<p>平常只使用v-model做表单元素的数据绑定，没有仔细研究过这背后的原理，不是很理解自定义组件是怎么实现这个功能的。</p>
<p>查找了一下相关资料，其实 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js</a> 的官网上有教程有相关的资料。</p>
<p><a href="https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6%E7%9A%84%E8%A1%A8%E5%8D%95%E8%BE%93%E5%85%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">使用自定义事件的表单输入组件</a></p>
<p>v-model 其实是一个语法糖，这背后其实做了两个操作</p>
<ol>
<li><p>v-bind 绑定一个 value 属性</p></li>
<li><p>v-on 指令给当前元素绑定 input 事件</p></li>
</ol>
<h3 id="articleHeader0">在原生表单元素中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model='something'>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> v-model=<span class="hljs-string">'something'</span>&gt;</code></pre>
<p>就相当于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-bind:value=&quot;something&quot; v-on:input=&quot;something = $event.target.value&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">input</span> v-bind:value=<span class="hljs-string">"something"</span> v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">input</span>=<span class="hljs-string">"something = $event.target.value"</span>&gt;</code></pre>
<p>当input接收到新的输入，就会触发input事件，将事件目标的value 值赋给绑定的元素</p>
<h3 id="articleHeader1">在自定义组件中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-model='something'></my-componment>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">'something'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-componment</span>&gt;</span></code></pre>
<p>相当于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-bind:value='something' v-on:input='something = arguments[0]'></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;my-component v-bind:<span class="hljs-built_in">value</span>=<span class="hljs-string">'something'</span> v-<span class="hljs-keyword">on</span>:<span class="hljs-title">input</span>=<span class="hljs-string">'something = arguments[0]'</span>&gt;&lt;/<span class="hljs-title">my-component</span>&gt;</code></pre>
<p>这时候，something接受的值就是input是事件的回掉函数的第一个参数<br>所以在自定义的组件当中，要实现数据绑定，还需要使用[$emit]去触发input的事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$emit('input', value)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">value</span>)</code></pre>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js组件中v-model的使用

## 原文链接
[https://segmentfault.com/a/1190000009492595](https://segmentfault.com/a/1190000009492595)

