---
title: '高级 Vue 组件模式 (3)' 
date: 2019-02-13 2:31:22
hidden: true
slug: ejxrxrpysgn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">03 使用 mixin 来增强 Vue 组件</h2>
<h3 id="articleHeader1">目标</h3>
<p>之前一篇文章中，我们虽然将 <code>toggle</code> 组件划分为了 <code>toggle-button</code>、<code>toggle-on</code> 和 <code>toggle-off</code> 三个子组件，且一切运行良好，但是这里面其实是存在一些问题的：</p>
<ul>
<li>
<code>toggle</code> 组件的内部状态和方法只能和这三个子组件共享，我们期望第三方的组件也可以共享这些状态和方法</li>
<li>inject 的注入逻辑我们重复编写了三次，如果可以的话，我们更希望只声明一次（DRY原则）</li>
<li>inject 的注入逻辑当前为硬编码，某些情况下，我们可能期望进行动态地配置</li>
</ul>
<p>如果熟悉 react 的读者这里可能马上就会想到 HOC（高阶组件） 的概念，而且这也是 react 中一个很常见的模式，该模式能够提高 react 组件的复用程度和灵活性。在 vue 中，我们是否也有一些手段或特性来提高组件的复用程度和灵活性呢？答案当然是有的，那就是 mixin。</p>
<h3 id="articleHeader2">实现</h3>
<p>关于 mixin 本身的知识，这里就不做过多赘述了，不熟悉的读者可以去官方文档了解。我们通过声明一个叫作 toggleMixin 的 mixin 来抽离公共的注入逻辑，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const withToggleMixin = {
  inject: {
    toggleComp: &quot;toggleComp&quot;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> withToggleMixin = {
  inject: {
    toggleComp: <span class="hljs-string">"toggleComp"</span>
  }
};</code></pre>
<p>之后，每当需要注入 <code>toggle</code> 组件提供的依赖项时，就混入当前 mixin，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mixins: [withToggleMixin]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">mixins: <span class="hljs-string">[withToggleMixin]</span></code></pre>
<p>如果关于注入的逻辑，我们增加一些灵活性，比如期望自由地声明注入依赖项的 key 时，我们可以借由 HOC 的概念，声明一个高阶 mixin（可以简称 HOM ?? 皮一下，很开心），如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function withToggle(parentCompName = &quot;toggleComp&quot;) {
  return {
    inject: {
      [parentCompName]: &quot;toggleComp&quot;
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withToggle</span>(<span class="hljs-params">parentCompName = <span class="hljs-string">"toggleComp"</span></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">inject</span>: {
      [parentCompName]: <span class="hljs-string">"toggleComp"</span>
    }
  };
}</code></pre>
<p>这个 HOC mixin 可以按如下的方式使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mixins: [withToggle(&quot;toggle&quot;)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">mixins:</span> [withToggle(<span class="hljs-string">"toggle"</span>)]</code></pre>
<p>这样在当前的组件中，调用 toggle 组件相关状态和方法时，就不再是 <code>this.toggleComp</code>，而是 <code>this.toggle</code>。</p>
<h3 id="articleHeader3">成果</h3>
<p>通过实现 toggleMixin，我们成功将注入的逻辑抽离了出来，这样每次需要共享 <code>toggle</code> 组件的状态和方法时，混入该 mixin 即可。这样就解决了第三方组件无法共享其状态和方法的问题，在在线实例代码中，我实现了两个第三方组件，分别是 <code>custom-button</code> 和 <code>custom-status-indicator</code>，前者是自定义开关，使用 withToggleMixin 来混入注入逻辑，后者是自定义的状态指示器，使用 withToggle 高阶函数来混入注入逻辑。</p>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/myvynok37x" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-3" rel="nofollow noreferrer" target="_blank">part-3</a>
</li>
</ul>
<h3 id="articleHeader4">总结</h3>
<p>mixin 作为一种分发 Vue 组件中可复用功能的非常灵活的方式，可以在很多场景下大展身手，尤其在一些处理公共逻辑的组件，比如通知、表单错误提示等，使用这种模式尤其有用。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (3)

## 原文链接
[https://segmentfault.com/a/1190000016748517](https://segmentfault.com/a/1190000016748517)

