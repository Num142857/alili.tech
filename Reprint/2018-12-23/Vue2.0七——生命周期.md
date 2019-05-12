---
title: 'Vue2.0七——生命周期' 
date: 2018-12-23 2:30:07
hidden: true
slug: nhe4q17a03n
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">vue2.0新增的</h3>
<ul>
<li>
<p>什么是vue的生命周期</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="指的是实例从创建到销毁的过程，就是生命周期。
也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程
，我们称这是 Vue 的生命周期。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>指的是实例从创建到销毁的过程，就是生命周期。
也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程
，我们称这是 Vue 的生命周期。</code></pre>
</li>
<li>
<p>生命周期的作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="生命周期中有多个钩子函数，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">生命周期中有多个钩子函数，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。</code></pre>
</li>
<li>
<p>总共有八个阶段也就是八个钩子函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="创建前/后, 载入前/后,更新前/后,销毁前/销毁后" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">创建前<span class="hljs-regexp">/后, 载入前/</span>后,更新前<span class="hljs-regexp">/后,销毁前/</span>销毁后</code></pre>
</li>
<li>页面第一次加载的时候会触发beforeCreate, created, beforeMount, mounted 这几个钩子，DOM 渲染在 mounted 中就完成</li>
<li>
<p>每个周期的具体场景<br>  1、beforeCreate</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>   在实例初始化之后，数据观测(<span class="hljs-class"><span class="hljs-keyword">data</span> observer) 和 event/watcher 事件配置之前被调用。</span>
</code></pre>
<p>2、created</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
   数据观测(data observer)，属性和方法的运算，
   watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>   实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
   数据观测(<span class="hljs-class"><span class="hljs-keyword">data</span> observer)，属性和方法的运算，</span>
   watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
</code></pre>
<p>3、beforeMount</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   在挂载开始之前被调用：相关的 render 函数首次被调用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>   在挂载开始之前被调用：相关的 <span class="hljs-keyword">render</span> 函数首次被调用。
</code></pre>
<p>4、mounted</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   el 被新创建的 vm.$el 替换，
   并挂载到实例上去之后调用该钩子。
   如果 root 实例挂载了一个文档内元素，
   当 mounted 被调用时 vm.$el 也在文档内。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>   <span class="hljs-keyword">el</span> 被新创建的 <span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">el</span> 替换，
   并挂载到实例上去之后调用该钩子。
   如果 root 实例挂载了一个文档内元素，
   当 mounted 被调用时 <span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">el</span> 也在文档内。
</code></pre>
<p>5、beforeUpdate</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   你可以在这个钩子中进一步地更改状态，
   这不会触发附加的重渲染过程。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>   数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   你可以在这个钩子中进一步地更改状态，
   这不会触发附加的重渲染过程。
</code></pre>
<p>6、updated</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   由于数据更改导致的虚拟 DOM，
   重新渲染和打补丁，在这之后会调用该钩子。

   当这个钩子被调用时，组件 DOM 已经更新，
   所以你现在可以执行依赖于 DOM 的操作。
   然而在大多数情况下，你应该避免在此期间更改状态
   ，因为这可能会导致更新无限循环。
   
   该钩子在服务器端渲染期间不被调用。
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>   由于数据更改导致的虚拟 DOM，
   重新渲染和打补丁，在这之后会调用该钩子。

   当这个钩子被调用时，组件 DOM 已经更新，
   所以你现在可以执行依赖于 DOM 的操作。
   然而在大多数情况下，你应该避免在此期间更改状态
   ，因为这可能会导致更新无限循环。
   
   该钩子在服务器端渲染期间不被调用。
   </code></pre>
<p>7、beforeDestroy</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   实例销毁之前调用。在这一步，实例仍然完全可用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>   实例销毁之前调用。在这一步，实例仍然完全可用。
</code></pre>
<p>8、destroyed</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Vue 实例销毁后调用。
   调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，
   所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code>   <span class="hljs-attribute">Vue</span> 实例销毁后调用。
   调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，
   所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。</code></pre>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0七——生命周期

## 原文链接
[https://segmentfault.com/a/1190000012315627](https://segmentfault.com/a/1190000012315627)

