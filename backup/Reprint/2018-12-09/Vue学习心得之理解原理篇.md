---
title: 'Vue学习心得之理解原理篇' 
date: 2018-12-09 2:30:08
hidden: true
slug: jrz81fk5y5k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">
<strong>写这篇文章的初衷是想总结自己的学习经验，希望对看到的人有所帮助，如有错误，请您指出，以免误人子弟，十分感谢</strong>！</h2>
<hr>
<p>现在前端比较流行的框架有 Vue、React、Angular三种。个人比较看好Vue，性能强大，而且可学性很强，比较适合新手学习。</p>
<p>首先vue是一款轻量级的<strong>MVVM框架</strong>，压缩完之后只有20k+,这个是对比angular、react的明显优势，而且学习曲线平滑，不用像学react一样，还要学习react全家桶套餐。也不用像学习angular一样，要记很多概念，angular的开发思维很像后台的开发思维（例：依赖注入），也不适合前端小白。Vue还结合了<strong>angular的指令</strong>跟<strong>react的组件化思想</strong>，以上大概介绍了vue的优势，想了解vue对比其他框架的细节，可以去官网上查看<a href="https://cn.vuejs.org/v2/guide/comparison.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a>。</p>
<p>Vue的核心思想是<strong>数据驱动（DOM是数据的一种自然映射）</strong>，<em>怎么理解尼？</em>如果不用vue，那么像我们从后台接口获取数据的时候，需要手动的去修改DOM来触发视图的变化，或者前端交互需要改变数据的时候，一样需要手动去操作DOM，这样做不仅繁琐而且非常容易出错！用了vue就省去了去手动操作DOM的步骤，你只需要去修改数据，Vue会自动去触发Dom的改变，Vue会通过VM层中的Directives去对Dom做一层封装，当数据发生变化时，会通知指令去触发对应DOM的变化。<strong>数据驱动DOM的变化，DOM是数据的一种自然映射</strong>这句话是不是就懂了一些！Vue还会对视图（View）去做一些监听，当我们修改视图的时候，vue会通过VM层中的DOM Listeners监听到视图的变化，进而通知数据（Model）改变。这就形成了数据的<strong>双向绑定</strong>。具体看下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV6ycS?w=548&amp;h=286" src="https://static.alili.tech/img/bV6ycS?w=548&amp;h=286" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>那么Vue是怎么做到的尼？数据相应原理（ <strong>数据（Model）改变如何驱动视图（view）自动更新</strong> ）？</em></p>
<p>ES5的<strong>Object.definePrototype</strong>属性，这也是Vue不支持IE6-IE8的原因。(ps:具体怎么驱动改变在本章就不介绍了，后续会写一篇专门的文章来介绍)</p>
<p>Vue的另一个核心思想是<strong>组件化，目的是拓展HTML元素，封装一些可重用的代码</strong>。<em>那么什么是组件，怎么写组件？</em>我在刚学习的时候就有这个疑问，其实跟react一样，整个<strong>页面任何一个独立的可视/可交互区域都是一个组件</strong>，它们可以相互嵌套。每一个组件在创建的时候都会生成一个viewModel树（类似DOM树），它与DOM树是一一对应的关系，这个类似DOM的树就是<strong>虚拟DOM</strong>（vDOM）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="提到vDOM就不得不提vDOM的diff算法原理，本章简单提一嘴，vDOM的节点为虚拟节点（vNODE），Vue即仅在同级的vnode间做diff，递归地进行同级vnode的diff，最终实现整个DOM树的更新（ps:后续会写一篇专门关于diff算法的理解文章）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">提到vDOM就不得不提vDOM的<span class="hljs-built_in">diff</span>算法原理，本章简单提一嘴，vDOM的节点为虚拟节点（vNODE），Vue即仅在同级的vnode间做<span class="hljs-built_in">diff</span>，递归地进行同级vnode的<span class="hljs-built_in">diff</span>，最终实现整个DOM树的更新（ps:后续会写一篇专门关于<span class="hljs-built_in">diff</span>算法的理解文章）</code></pre>
<p><strong>本章主要介绍了VUE的原理和优势，下一章将介绍怎么开始一个做一个VUE项目 并且分享我在开发学习时候疑问，以及一些问题的解决方案</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习心得之理解原理篇

## 原文链接
[https://segmentfault.com/a/1190000013918774](https://segmentfault.com/a/1190000013918774)

