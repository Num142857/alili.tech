---
title: '高级 Vue 组件模式 (9)' 
date: 2019-02-14 2:30:37
hidden: true
slug: mipeqyqfi2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">09 使用 Functional 组件</h2>
<h3 id="articleHeader1">目标</h3>
<p>到此为止，我们的 <code>toggle</code> 组件已经足够强大以及好用了，因此这篇文章不会再为它增加新的特性。如果你是从第一篇文章一直读到这里的读者，你一定会发现，整篇文章中，我几乎没有对 <code>toggle-on</code> 和 <code>toggle-off</code> 做出任何更改和重构，因此这篇文章着重来重构一下它们。</p>
<p>之前一直没有对它们进行任何更改，一个很重要的原因是因为它们足够简单，组件内部没有任何 data 状态，仅靠外部传入的 prop 属性 on 来决定内部渲染逻辑。这听起来似乎有些耳熟啊，没错，它们就是在上一篇文章中所提及的木偶组件（Dump Component）。在 Vue 中，这种类型的组件也可以叫做函数式组件（Functional Component）。</p>
<p>仔细观察 app 组件的模板代码，会发现存在一定的冗余性的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<toggle-on :on=&quot;status.on&quot;>"{{"firstTimes"}}"</toggle-on>
<toggle-off :on=&quot;status.on&quot;>"{{"firstTimes"}}"</toggle-off>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;toggle-<span class="hljs-keyword">on</span> :<span class="hljs-keyword">on</span>=<span class="hljs-string">"status.on"</span>&gt;"{{"firstTimes"}}"&lt;/toggle-<span class="hljs-keyword">on</span>&gt;
&lt;toggle-off :<span class="hljs-keyword">on</span>=<span class="hljs-string">"status.on"</span>&gt;"{{"firstTimes"}}"&lt;/toggle-off&gt;</code></pre>
<p>这里两行代码的逻辑几乎一模一样，但我们却要写两次。同时你还会发现一个问题，由于其内部的渲染逻辑是通过 <code>v-if</code> 来描述的，实际上在 Vue 渲染完成后，会渲染两个 <code>dom</code> 节点，在切换时的状态从 devtool 中观察的效果大概是这样子的：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiO8B?w=254&amp;h=73" src="https://static.alili.tech/img/bVbiO8B?w=254&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>未显示的节点是一个注释节点，而显示的节点是一个 div 节点。</p>
<p>这篇文章将着重解决这两个问题：</p>
<ul>
<li>将 <code>toggle-on</code> 和 <code>toggle-off</code> 合二为一，减少代码冗余性</li>
<li>重构以 <code>v-if</code> 实现的渲染逻辑，改为更好的动态渲染逻辑（仅使用一个 dom 节点）</li>
</ul>
<h3 id="articleHeader2">实现</h3>
<h4>转化为函数式组件</h4>
<p>首先，先将已经存在的 <code>toggle-on</code> 和 <code>toggle-off</code> 组件转化为函数式组件，很简单，只需保留 template 代码块即可，同时在左边的标签上声明 <code>functional</code> 属性，或者在 script 代码块中声明 <code>functional: true</code> 也是可以的。唯一要注意的是，由于函数式组件没有 data 也没有 <code>this</code>，因此所有模板中用到的与 prop 相关的渲染逻辑，都要作出相应更改，比如原先的 <code>on</code> 要改为 <code>props.on</code>的形式，由于这里我们要移除 <code>v-if</code> 的渲染逻辑，因此直接移除即可，详细代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ToggleOn.vue
<template functional>
  <div class=&quot;toggle-on&quot;><slot></slot></div>
</template>

<style>
.toggle-on {
  color: #86d993;
}
</style>

// ToggleOff.vue
<template functional>
  <div class=&quot;toggle-off&quot;><slot></slot></div>
</template>

<style>
.toggle-off {
  color: red;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// ToggleOn.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">functional</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toggle-on"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.toggle-on</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#86d993</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

// ToggleOff.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">functional</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toggle-off"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.toggle-off</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>除此之外，还可以发现，我为两个组件增加不同的颜色样式以便于区分当前的开关状态。</p>
<h4>实现 ToggleStatus 组件</h4>
<p>接下来实现今天的主角，<code>ToggleStatus</code> 组件，由于我们的目标是将原先的二个函数式组件合二为一，因此这个组件本身应当也是一个函数式组件，不过我们需要使用另外一种写法，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
import ToggleOn from './ToggleOn'
import ToggleOff from './ToggleOff'

export default {
  functional: true,
  render(createElement, {props, data, children}) {
    let Comp = ToggleOff
    
    if(props.on) Comp = ToggleOn

    return createElement(Comp, data, children)
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> ToggleOn <span class="hljs-keyword">from</span> <span class="hljs-string">'./ToggleOn'</span>
<span class="hljs-keyword">import</span> ToggleOff <span class="hljs-keyword">from</span> <span class="hljs-string">'./ToggleOff'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">functional</span>: <span class="hljs-literal">true</span>,
  render(createElement, {props, data, children}) {
    <span class="hljs-keyword">let</span> Comp = ToggleOff
    
    <span class="hljs-keyword">if</span>(props.on) Comp = ToggleOn

    <span class="hljs-keyword">return</span> createElement(Comp, data, children)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>关于这种写法中，<code>render</code> 和 <code>createElement</code> 方法的参数就不赘述了，不熟悉的读者请参考官方文档。可以发现，这里将 <code>toggle-on</code> 和 <code>toggle-off</code> 以模块的形式导入，之后由 <code>props.on</code> 的值进行判定，从而决定哪一个被作为 <code>createElement</code> 方法的第一个参数进行渲染。</p>
<p>诸如 <code>data</code> 和 <code>children</code> 参数我们原封不动的传入 <code>createElement</code> 即可，因为这里对于 <code>toggle-status</code> 组件的定位是一个代理组件，对于其他参数以及子元素应当原封不动的传递给被代理的组件中。</p>
<p>之后在 app 组件中更改响应的渲染逻辑即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// controlled toggle
<toggle-status :on=&quot;status.on&quot;>"{{"firstTimes"}}"</toggle-status>

// uncontrolled toggle
<toggle-status :on=&quot;status.on&quot;>"{{"secondTimes"}}"</toggle-status>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// controlled toggle
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-status</span> <span class="hljs-attr">:on</span>=<span class="hljs-string">"status.on"</span>&gt;</span></span><span class="hljs-template-variable">"{{"firstTimes"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-status</span>&gt;</span>

// uncontrolled toggle
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-status</span> <span class="hljs-attr">:on</span>=<span class="hljs-string">"status.on"</span>&gt;</span></span><span class="hljs-template-variable">"{{"secondTimes"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-status</span>&gt;</span></span></code></pre>
<h3 id="articleHeader3">成果</h3>
<p>一切如原先一样，只不过这次我们可以少写一行冗余的代码了。同时打开 devtool 可以发现，两种状态的组件会复用同一个 dom 节点，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiO8E?w=254&amp;h=73" src="https://static.alili.tech/img/bVbiO8E?w=254&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你可以通过下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/nr040rvzjm" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-9" rel="nofollow noreferrer" target="_blank">part-9</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>关于函数式组件，我是在 React 中第一次接触，其形式和它的名字一样，就是一个函数。这种组件和普通组件相比的优势主要在于，它是无状态的，这意味着它的可测试性和可读性更好，同时一些情况下，渲染开销也更小。</p>
<p>我们在日常工作中，可能会经常遇到动态渲染的需求，一般情况下，我们均会通过 <code>v-if</code> 来解决，在比较简单的情况下，<code>v-if</code> 确实一种很简单且高效的方式，但是随着组件复杂度的上升，很可能会出现面条式的代码，可读性和可测试性都大打折扣，这是不妨换一个角度从渲染机制本身将组件重构为更小的颗粒，并用一个函数式组件动态的代理它们，可能会得到更好的效果，举一个比较常见的例子，比如表单系统中的表单项，一般都具有多种渲染状态，如编辑状态、浏览状态、禁用状态等等，这时利用该模式来抽离不同状态的渲染逻辑就非常不错。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (9)

## 原文链接
[https://segmentfault.com/a/1190000016840482](https://segmentfault.com/a/1190000016840482)

