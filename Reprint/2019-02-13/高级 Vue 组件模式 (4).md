---
title: '高级 Vue 组件模式 (4)' 
date: 2019-02-13 2:31:22
hidden: true
slug: 3dm39vlzzfl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">04 使用 slot 替换 mixin</h2>
<h3 id="articleHeader1">目标</h3>
<p>在第三篇文章中，我们使用 mixin 来抽离了注入 <code>toggle</code> 依赖项的公共逻辑。在 react 中，类似的需求是通过 HOC 的方式来解决的，但是仔细想想的话，react 在早些的版本也是支持 mixin 特性的，只不过后来将它标注为了 deprecated。</p>
<p>mixin 虽然作为分发可复用功能的常用手段，但是它是一把双刃剑，除了它所带来的便利性之外，它还有以下缺点：</p>
<ul>
<li>混入的 mixin 可能包含隐式的依赖项，这在某些情况下可能不是调用者所期望的</li>
<li>多个 mixin 可能会造成命名冲突问题，且混入结果取决于混入顺序</li>
<li>使用不当容易使项目的复杂度呈现滚雪球式的增长</li>
</ul>
<p>所以是否有除了 mixin 以外的替代方案呢？答案当时也是有的，那就是使用 vue 中提供的作用域插槽特性。</p>
<h3 id="articleHeader2">实现</h3>
<p>这里关于作用域插槽的知识同样不赘述了，不熟悉的读者可以去官方文档了解。我们可以在 <code>toggle</code> 组件模板中的 <code>slot</code> 标签上将所有与其上下文相关的方法及属性传递给它，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;toggle&quot;>
  <slot :status=&quot;status&quot; :toggle=&quot;toggle&quot;></slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;div class=<span class="hljs-string">"toggle"</span>&gt;
  &lt;slot <span class="hljs-symbol">:status=<span class="hljs-string">"status"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span>&gt;&lt;/slot&gt;</span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>这样，我们可以通过 slot-scope 特性将这些方法和属性取出来，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template slot-scope=&quot;{status, toggle}&quot;>
  <custom-button :on=&quot;status.on&quot; :toggle=&quot;toggle&quot;></custom-button>
  <custom-status-indicator :on=&quot;status.on&quot;></custom-status-indicator>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;template slot-scope=<span class="hljs-string">"{status, toggle}"</span>&gt;
  &lt;custom-button <span class="hljs-symbol">:on=<span class="hljs-string">"status.on"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span>&gt;&lt;/custom-button&gt;</span>
  &lt;custom-status-indicator <span class="hljs-symbol">:on=<span class="hljs-string">"status.on"</span>&gt;&lt;/custom-status-indicator&gt;</span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p>当然，相比上一篇文章，我们需要对 <code>custom-button</code> 和 <code>custom-status-indicator</code> 组件做一些简单的更改，只需要将混入 mixin 的逻辑去掉，并分别声明相应的 props 属性即可。</p>
<h3 id="articleHeader3">成果</h3>
<p>通过作用域插槽，我们有效地避免了第三方组件由于混入 toggleMixin 而可能造成的命名冲突以及隐式依赖等问题。</p>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/4379n8v96w" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-4" rel="nofollow noreferrer" target="_blank">part-4</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>mixin 虽好，但是一定不要滥用，作为组件开发者，可以享受它带来的便利性，但是它对于组件调用者来说，可能会造成一些不可预料的问题，通过作用域插槽，我们可以将这种问题发生的程度降到最小，同时解决 mixin 需要解决的问题。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (4)

## 原文链接
[https://segmentfault.com/a/1190000016752269](https://segmentfault.com/a/1190000016752269)

