---
title: 'Vue生命周期' 
date: 2018-12-30 2:30:10
hidden: true
slug: amzp0bvpo6u
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue生命周期</h1>
<h3 id="articleHeader1">什么是Vue?</h3>
<p>Vue框架是MVVM类型的前端框架。它为我们的开发省去操作DOM的繁琐操作，使得开发专注于前端逻辑的实现。Vue的实现使得前端工程化，组件化成为了开发常态，编写一套复用度高的组件是每个Vueer的期望</p>
<h3 id="articleHeader2">Vue生命周期</h3>
<h4>开始</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({})</code></pre>
<p>所有的Vue应用都是从这里开始的，当实例化出Vue对象时就已经进入了Vue的生命周期。</p>
<p>进入的生命周期第一个钩子函数就是<strong>beforeCreate</strong>。在这之前组件还没有真正的初始化。</p>
<p>在<strong>beforeCreate</strong>之后，Vue对data对象作了getter/setter处理，并且将对象放在一个Observe里面以便于监控对象，另外还有使用initEvents绑定事件</p>
<p>在组件初始化完成后，遇到第二个钩子函数：<strong>created</strong>。在这个阶段我们可以访问到了data的属性以及绑定的事件</p>
<p>通过了<strong>created</strong>阶段后组件的生命周期到了<strong>beforemount</strong>，在这个阶段DOM结构还没有生成，但是已经创建了el，组件挂载的根节点。在<strong>beforemount</strong>执行完成后开始渲染DOM，执行_render方法，_mount方法，然后会有new出一个watcher对象,形成VNode节点，然后会更新DOM</p>
<p>渲染完毕后组件就会到了下一个生命周期<strong>mounted</strong>，一般的异步请求都会写在这，这个阶段DOM已经渲染出来了。至此一个组件已经完整的出现在眼前了，但是生命周期却还没有停止。</p>
<p>当组件需要更新的时候生命周期会先到达<strong>beforeUpdate</strong>,在这个阶段显示数据并没有更新，但是DOM中的数据已经改变了，这是因为双向绑定的关系</p>
<p>走过<strong>beforeUpdate</strong>组件完成了更新，生命周期走到<strong>updated</strong></p>
<p>完成更新后的组件应该被销毁了，<strong>beforeDestroy</strong>，这个阶段组件还没有被销毁</p>
<p><strong>destroy</strong>这个是真正的销毁</p>
<blockquote><p>若文中有何错误欢迎留言或者到<a href="https://github.com/JameJJ/frontEnd-daily/issues" rel="nofollow noreferrer" target="_blank">这里</a>留言，蟹蟹</p></blockquote>
<p><a href="https://github.com/JameJJ" rel="nofollow noreferrer" target="_blank">@蛋蛋君</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue生命周期

## 原文链接
[https://segmentfault.com/a/1190000011396344](https://segmentfault.com/a/1190000011396344)

