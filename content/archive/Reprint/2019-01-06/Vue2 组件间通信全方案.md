---
title: 'Vue2 组件间通信全方案' 
date: 2019-01-06 2:30:10
hidden: true
slug: bn1a6uxez4k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>说的不对的，敬请谅解，大家共同讨论进步</p></blockquote>
<p>组件通讯包括：父子组件间的通信和兄弟组件间的通信。在组件化系统构建中，组件间通信必不可少的。</p>
<h2 id="articleHeader0">父组件--&gt; 子组件</h2>
<h3 id="articleHeader1">1. 属性设置</h3>
<p>父组件关键代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <Child :child-msg=&quot;msg&quot;></Child>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">:child-msg</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>子组件关键代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: 'child',
  props: {
    child-msg: String
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'child'</span>,
  props: {
    child-msg: String
  }
};</code></pre>
<p>child-msg 为父组件给子组件设置的额外属性值，属性值需在子组件中设置props，子组件中可直接使用child-msg变量。</p>
<h3 id="articleHeader2">2. 子组件调用父组件</h3>
<p>子组件通过 $parent 获得父组件，通过 $root 获得最上层的组件。</p>
<h2 id="articleHeader3">子组件--&gt; 父组件</h2>
<h3 id="articleHeader4">1. 发送事件/监听事件</h3>
<p>子组件中某函数内发送事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$emit('toparentevent', 'data');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'toparentevent'</span>, <span class="hljs-string">'data'</span>);</code></pre>
<p>父组件监听事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Child :msg=&quot;msg&quot; @toparentevent=&quot;todo()&quot;></Child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"msg"</span> @<span class="hljs-attr">toparentevent</span>=<span class="hljs-string">"todo()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Child</span>&gt;</span></code></pre>
<p>toparentevent 为子组件自定义发送事件名称，父组件中@toparentevent为监听事件，todo为父组件处理方法。</p>
<h3 id="articleHeader5">2. 父组件直接获取子组件属性或方法</h3>
<p>给要调用的子组件起个名字。将名字设置为子组件 ref 属性的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 子组件。 ref的值是组件引用的名称 -->
<child-component ref=&quot;aName&quot;></child-component>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 子组件。 ref的值是组件引用的名称 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"aName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
</code></pre>
<p>父组件中通过 $refs.组件名 来获得子组件，也就可以调用子组件的属性和方法了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = this.$refs.aName
child.属性
child.方法()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> child = this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.aName</span>
child.属性
child.方法()
</code></pre>
<p>父组件通过 $children 可以获得所有直接子组件（父组件的子组件的子组件不是直接子组件）。需要注意 $children 并不保证顺序，也不是响应式的。</p>
<h2 id="articleHeader6">Bus中央通信</h2>
<p>目前中央通信是解决兄弟间通信，祖父祖孙间通信的最佳方法，不仅限于此，也可以解决父组件子组件间的相互通信。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVRJMZ?w=587&amp;h=466" src="https://static.alili.tech/img/bVRJMZ?w=587&amp;h=466" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>各组件可自己定义好组件内接收外部组件的消息事件即可，不用理会是哪个组件发过来；而对于发送事件的组件，亦不用理会这个事件到底怎么发送给我需要发送的组件。</p>
<p>先设置Bus</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//bus.js 
import Vue from 'vue'
export default new Vue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//bus.js </span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue();</code></pre>
<p>组件内监听事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bus from '@/bus';

export default {
  name: 'childa',
  methods: {
  },
  created() {
    bus.$on('childa-message', function(data) {
      console.log('I get it');
    });
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">'@/bus'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'childa'</span>,
  <span class="hljs-attr">methods</span>: {
  },
  created() {
    bus.$on(<span class="hljs-string">'childa-message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I get it'</span>);
    });
  }
};</code></pre>
<p>发送事件的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bus from '@/bus';
//方法内执行下面动作
bus.$emit('childa-message', this.data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> bus from <span class="hljs-string">'@/bus'</span>;
<span class="hljs-comment">//方法内执行下面动作</span>
bus.$emit(<span class="hljs-string">'childa-message'</span>, <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>);</code></pre>
<p>Bus中央通信的方案各种情况下都可用，比较方便，具体内在原理后续更新说明。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 组件间通信全方案

## 原文链接
[https://segmentfault.com/a/1190000010385155](https://segmentfault.com/a/1190000010385155)

