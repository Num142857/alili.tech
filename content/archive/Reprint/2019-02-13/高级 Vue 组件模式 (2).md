---
title: '高级 Vue 组件模式 (2)' 
date: 2019-02-13 2:31:22
hidden: true
slug: f7ao2m9q4bf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">02 编写复合组件</h2>
<h3 id="articleHeader1">目标</h3>
<p>我们需要实现的需求是能够使使用者通过 <code>&lt;toggle&gt;</code> 组件动态地改变包含在它内部的内容。</p>
<p>熟悉 vue 的童鞋可能马上会想到不同的解决方案，比如使用 <code>slot</code> 并配合 <code>v-if</code>，我们这里采用另外一种方法，利用 vue 提供的 <code>provide/inject</code> 属性按照复合组件的思想来实现。</p>
<p>这里简单介绍下 <code>provide/inject</code> 的功能，它允许某个父组件向子组件注入一个依赖项（这里的父子关系可以跨域多个层级，也就是祖先与后代），如果我们在其他 mvvm 框架对比来看的话，你可以发现其他框架也具有相同的特性，比如：</p>
<ul>
<li>angularjs: directive 中的 <code>require</code> 属性来声明注入逻辑</li>
<li>Angular: 依赖注入中组件级别的注入器</li>
<li>React: context 上下文对象</li>
</ul>
<p>想进一步了解的话，可以参考<a href="https://cn.vuejs.org/v2/api/#provide-inject" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h3 id="articleHeader2">实现</h3>
<p>在 vue 中，这里我们会分别实现三个组件，依次为：</p>
<ul>
<li>
<code>toggle-button</code>: 代表开关，用来渲染父组件的开关状态</li>
<li>
<code>toggle-on</code>: 根据父组件 toggle 的开关状态，渲染当状态为<strong>开</strong>时的内容</li>
<li>
<code>toggle-off</code>: 根据父组件 toggle 的开关状态，渲染当状态为<strong>关</strong>时的内容</li>
</ul>
<p>在上一篇文章中，我们已经实现了 toggle 组件，这里我们要做一些更改。首先，需要使用 provide 属性增加一个提供依赖的逻辑，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="provide() {
    return {
      toggleComp: {
        status: this.status,
        toggle: this.toggle
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">provide</span><span class="hljs-params">()</span></span> {
    return {
      toggleComp: {
        status: this<span class="hljs-selector-class">.status</span>,
        toggle: this<span class="hljs-selector-class">.toggle</span>
      }
    }
}</code></pre>
<p>这里的 status 是该组件 data 中的声明的一个可监听对象，这个对象包含一个 on 属性来代表组件的开关状态，而 toggle 则是 methods 中的一个组件方法。</p>
<p>关于为什么这里不直接使用 on 属性来代表开关状态，而使用一个可监听对象，是因为 <code>provide</code> 和 <code>inject</code> 绑定并不是可响应的，同时官方文档也指出，这是刻意而为，所以为了享受到 vue 响应性带来的便利性，我们这里传入 status 这个可监听对象。</p>
<p>对于其他三个组件，其内部实现逻辑十分简单，相信读者通过参考在线代码实例马上就能看懂，这里只提一下关于 <code>inject</code> 声明注入依赖的逻辑，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inject: { toggleComp: &quot;toggleComp&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">inject</span>: { <span class="hljs-attribute">toggleComp</span>: <span class="hljs-string">"toggleComp"</span> }</code></pre>
<p>这里的 <code>"toggleComp"</code> 与之前的 provide 对象中声明的 key 值所对应，而 inject 对象的 key 值当前组件注入依赖项的变量名称，之后，子组件即可以通过 <code>this.toggleComp</code> 来访问父组件的属性与方法。</p>
<h2 id="articleHeader3">成果</h2>
<p>通过复合组件的方式，我们将 <code>toggle</code> 组件划分为了三个更小的、职责更加单一的子组件。同时由于 <code>toggle-on</code> 和 <code>toggle-off</code> 都使用 slot 来动态地注入组件调用者在其内部包含的自定义渲染逻辑，其灵活性得到了进一步的提升，只要这三个组件是作为 <code>toggle</code> 组件的子组件来调用，一切都将正常运行。</p>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/n021zrjy6j" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-2" rel="nofollow noreferrer" target="_blank">part-2</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>通常情况下，在设计和实现职能分明的组件时，可以使用这种模式，比如 <code>tabs</code> 与 <code>tab</code> 组件，<code>tabs</code> 只负责 <code>tab</code> 的滚动、导航等逻辑，而 <code>tab</code> 本身仅负责内容的渲染，就如同这里的 <code>toggle</code> 和 <code>toggle-button</code>、<code>`toggle-on</code>、<code>toggle-off</code> 一样。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (2)

## 原文链接
[https://segmentfault.com/a/1190000016747611](https://segmentfault.com/a/1190000016747611)

