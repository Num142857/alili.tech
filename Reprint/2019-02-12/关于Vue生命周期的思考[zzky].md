---
title: '关于Vue生命周期的思考[zzky]' 
date: 2019-02-12 2:30:12
hidden: true
slug: isbimzvk53f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于Vue生命周期的思考</h1>
<p>关于Vue组件生命周期，官方图示：</p>
<p><span class="img-wrap"><img data-src="http://vuejs.org.cn/images/lifecycle.png" src="https://static.alili.techhttp://vuejs.org.cn/images/lifecycle.png" alt="Vue组件生命周期" title="Vue组件生命周期" style="cursor: pointer;"></span></p>
<p>在开发过程中遇到关于生命周期的问题，整理分享下：</p>
<h2 id="articleHeader1">Vue-router跳转同名路径的问题</h2>
<p>问题来自：<a href="http://forum.vuejs.org/topic/168/vue-router-%E8%B7%B3%E8%BD%AC%E5%90%8C%E5%90%8D%E8%B7%AF%E5%BE%84%E7%9A%84%E9%97%AE%E9%A2%98" rel="nofollow noreferrer" target="_blank">vue-router 跳转同名路径的问题</a></p>
<p>在社区交流中对于新手经常遇到这个问题。为什么跳转相同路由不能跳转？对于新手来说，跳转和不跳转的区别在于数据有没有更新。</p>
<p>新手在用Vue-router 的时候，没有关注当前Vue实例(vm)中添加<code>route</code> 。回归到话题问题当访问<code>.../page/110</code>这个路由的时候，<code>&lt;router-view &gt;&lt;/router-view&gt;</code> 开始装载Vue-router 中注册page对应Vue实例。 我们先约定是 <code>page.vue</code>  ：<code>page.vue</code> 开始它的生命周期，如果没有使用过Vue-route会根据经验把数据更新写到 created 或者 ready 阶段。路由切换了，但是created ready 阶段都过了，装数据的盒子准备好了。但是数据更新的时期过了导致不能更新。</p>
<p>这时候，我们需要把数据更新的时机换到路由切换的时候。</p>
<p>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
      ...
    route: {
        data(transition) {
           //更新数据的方法    
        }       
    }
      ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      ...
    route: {
        data(transition) {
           <span class="hljs-comment">//更新数据的方法    </span>
        }       
    }
      ...
};</code></pre>
<p>这样路由切换的时候，更新数据，也就是所谓的跳转了。</p>
<p>注意：更新<strong>params</strong> <strong>query</strong>  都适用</p>
<h2 id="articleHeader2">利用v-if强制结束组件的生命周期</h2>
<p>基于上面如何更新子组件？一般情况下，同样更新数据放倒 route.data 中即可，向子组件中传递数据。随着route切换更新子组件数据。</p>
<p>开发过程中，遇到的一个特殊的例子。把轮播图做成组件，在这个组件中ready后，开始使用轮播插件。轮播插件是会破坏html结构。导致不能数据更新的时候，不能更新View。这时候解决办法是再让子组件带着新数据走一轮生命周期。</p>
<p>如何强制更新组件的生命周期？解决办法是  route.data 数据更新的时候。让子组件 <code>v-if="false"</code> ，异步获取数据之后，再 <code>v-if="true"</code>。</p>
<p>说了一堆废话，汇总下：v-if 会影响子组件的生命周期。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Vue生命周期的思考[zzky]

## 原文链接
[https://segmentfault.com/a/1190000004669403](https://segmentfault.com/a/1190000004669403)

