---
title: '关于Vue实例的生命周期created和mounted的区别' 
date: 2019-01-25 2:30:23
hidden: true
slug: 4cipd2b4txm
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">关于作者</h3>
<blockquote>程序开发人员，不拘泥于语言与技术，目前主要从事PHP和前端开发，使用Laravel和VueJs，App端使用Apicloud混合式开发。合适和够用是最完美的追求。<p>个人网站：<a href="http://www.linganmin.cn" rel="nofollow noreferrer" target="_blank">http://www.linganmin.cn</a></p>
<p>最近刚写了一个手机在线播放的H5电影站：<a href="https://ifilm.linganmin.cn" rel="nofollow noreferrer" target="_blank">https://ifilm.linganmin.cn</a></p>
</blockquote>
<h3 id="articleHeader1">生命周期先上图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012509106" src="https://static.alili.tech/img/remote/1460000012509106" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">什么是生命周期</h3>
<blockquote>Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。</blockquote>
<p>在Vue的整个生命周期中，它提供了一系列的事件，可以让我们在事件触发时注册js方法，可以让我们用自己注册的js方法控制整个大局，在这些事件响应方法中的this直接指向的是vue的实例。</p>
<h3 id="articleHeader3">再上图，对生命周期图的标注</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012510450" src="https://static.alili.tech/img/remote/1460000012510450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>特别值得注意的是created钩子函数和mounted钩子函数的区别</blockquote>
<h3 id="articleHeader4">每个钩子函数都在啥时间触发</h3>
<p>beforeCreate</p>
<blockquote>在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。</blockquote>
<p>created</p>
<blockquote>实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。</blockquote>
<p>beforeMount</p>
<blockquote>在挂载开始之前被调用：相关的 render 函数首次被调用。</blockquote>
<p>mounted</p>
<blockquote>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。</blockquote>
<p>beforeUpdate</p>
<blockquote>数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。</blockquote>
<p>updated</p>
<blockquote>由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。</blockquote>
<p>当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。</p>
<p>该钩子在服务器端渲染期间不被调用。</p>
<p>beforeDestroy</p>
<blockquote>实例销毁之前调用。在这一步，实例仍然完全可用。</blockquote>
<p>destroyed</p>
<blockquote>Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。</blockquote>
<p><a href="http://www.linganmin.cn/" rel="nofollow noreferrer" target="_blank">安小下同学</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Vue实例的生命周期created和mounted的区别

## 原文链接
[https://segmentfault.com/a/1190000008570622](https://segmentfault.com/a/1190000008570622)

