---
title: '理解vue的生命周期钩子' 
date: 2019-01-10 2:30:08
hidden: true
slug: zh5nfgazf9k
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 实例有一个完整的生命周期，从开始创建到实例销毁整个过程，vue都提供了事件钩子，给我们提供了执行自定义逻辑的机会。</p>
<p>官网提供的生命周期图示：</p>
<p><span class="img-wrap"><img data-src="/img/bVP9kw?w=206&amp;h=482" src="https://static.alili.tech/img/bVP9kw?w=206&amp;h=482" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>例如，在实例挂载完成，模版中的html渲染到页面之后，可以通过mounted进行我们自定义的事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: {
    a: “实例挂载完成”
  },
  mounted: function () {
      console.log(this.a)
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">a</span>: “实例挂载完成”
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
  }
})
</code></pre>
<p>生命周期钩子的使用方法就是在vue实例化的参数中，添加上mounted，beforeMount等方法。</p>
<p><strong>那么，他们究竟是如何实现的呢？</strong></p>
<p>查看vue源码，会发现在vue实例初始化（_init）、挂载（$mount ）等过程中，都调用了一个叫callHook的方法，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVP9kF?w=482&amp;h=176" src="https://static.alili.tech/img/bVP9kF?w=482&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVP9kG?w=450&amp;h=467" src="https://static.alili.tech/img/bVP9kG?w=450&amp;h=467" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>vue在处理生命周期的lifecycle.js（src/core/instance/lifecycle.js）中定义了一个<strong>callHook</strong>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function callHook (vm: Component, hook: string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callHook</span> (<span class="hljs-params">vm: Component, hook: string</span>) </span>{
  <span class="hljs-keyword">const</span> handlers = vm.$options[hook]
  <span class="hljs-keyword">if</span> (handlers) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, j = handlers.length; i &lt; j; i++) {
      <span class="hljs-keyword">try</span> {
        handlers[i].call(vm)
      } <span class="hljs-keyword">catch</span> (e) {
        handleError(e, vm, <span class="hljs-string">`<span class="hljs-subst">${hook}</span> hook`</span>)
      }
    }
  }
  <span class="hljs-keyword">if</span> (vm._hasHookEvent) {
    vm.$emit(<span class="hljs-string">'hook:'</span> + hook)
  }
}
</code></pre>
<p>可以看出，vue实例在各个生命周期阶段，都会去调用钩子callHook，当options中有对应的内容时，就会去运行相关的方法。</p>
<p>例如上面的例子中，vue初始化的时候，会赋值给<strong>$options</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVP9kR?w=482&amp;h=215" src="https://static.alili.tech/img/bVP9kR?w=482&amp;h=215" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>vm.$options</code>如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVP9lH?w=912&amp;h=236" src="https://static.alili.tech/img/bVP9lH?w=912&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当执行callHook(vm, ‘mounted’)时，$options.mounted里边的方法就会执行</p>
<p>比如例子中的  <code>console.log(this.a)</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解vue的生命周期钩子

## 原文链接
[https://segmentfault.com/a/1190000010006604](https://segmentfault.com/a/1190000010006604)

