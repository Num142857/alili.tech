---
title: 'vue2.0 下对网页标题(document.title)更新的一种实现思路' 
date: 2019-02-01 2:30:10
hidden: true
slug: bs8f946sf9h
categories: [reprint]
---

{{< raw >}}

                    
<p>2017-05-22 更新：更优雅的实现方式 <a href="https://segmentfault.com/a/1190000009504472">组件化的思想实现 vue2.0 下对网页标题(document.title)的更新</a></p>
<p>在这个mvvm流行的今天，大家为了体验也是很拼的。</p>
<p>大部分mvvm都是单页面应用，在路由切换时不像传统页面一样重新下载整个html文件，这样就无法对页面标题进行更新。造成整个应用内页面标题和实际内容不相符，虽说不影响使用，但强迫症患者还是忍受不了。</p>
<p>因为用到vue-router之前一直想通过路由切换实现，但是搜索很久也没找到合适的方法。</p>
<p>今天再次查看vue的文档，突然想到可以通过自定义指令来实现。</p>
<p>具体思路如下，很简单只需要两步就可实现：</p>
<p>1.首页我们注册一个全局指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.directive(<span class="hljs-string">'title'</span>, {
  inserted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, binding)</span> {</span>
    document.title = <span class="hljs-keyword">el</span>.innerText
    <span class="hljs-keyword">el</span>.<span class="hljs-built_in">remove</span>()
  }
})</code></pre>
<p>2.在需要更改页面标题的组件内调用我们刚注册的指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-title>标题内容</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> v-title&gt;标题内容&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>当当当，就这样喽。</p>
<p>这里是用innerText来实现标题更新，如果你嫌弃这里多了一个无用div，还可以通过指令绑定值的方式实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

<div v-title=&quot;'标题内容'&quot;>
……组件内的内容
这里的div可以是你组件内的任何标签
</div>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vue.directive(<span class="hljs-string">'title'</span>, {
  inserted: function (el, binding) {
    document<span class="hljs-selector-class">.title</span> = binding<span class="hljs-selector-class">.value</span>
  }
})

&lt;<span class="hljs-selector-tag">div</span> v-title=<span class="hljs-string">"'标题内容'"</span>&gt;
……组件内的内容
这里的div可以是你组件内的任何标签
&lt;/div&gt;

</code></pre>
<p>因为指令函数能够接受所有合法类型的 Javascript 表达式，所以这里你要注意一下要对绑定的值加上引号。</p>
<p>什么？不想多一个无用的div，又看不惯多出的引号，稍稍变通一下就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

<div v-title data-title=&quot;标题内容&quot;>
……组件内的内容
这里的div可以是你组件内的任何标签
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vue.directive(<span class="hljs-string">'title'</span>, {
  inserted: function (el, binding) {
    document<span class="hljs-selector-class">.title</span> = el<span class="hljs-selector-class">.dataset</span><span class="hljs-selector-class">.title</span>
  }
})

&lt;<span class="hljs-selector-tag">div</span> v-title data-title=<span class="hljs-string">"标题内容"</span>&gt;
……组件内的内容
这里的div可以是你组件内的任何标签
&lt;/div&gt;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0 下对网页标题(document.title)更新的一种实现思路

## 原文链接
[https://segmentfault.com/a/1190000007387556](https://segmentfault.com/a/1190000007387556)

