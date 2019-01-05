---
title: '基于vue的移动web app页面缓存解决方案' 
date: 2019-01-06 2:30:10
hidden: true
slug: ahvddn6yp8
categories: [reprint]
---

{{< raw >}}

                    
<p>现在移动web app越来越热门了，许多公司开始尝试使用angular、react、vue等MVVM框架来开发单页架构的web app。但在开发web app时，如果希望页面的导航体验也接近原生应用，那一般都会遇到这两个问题：</p>
<ul>
<li>识别前进后退行为</li>
<li>后退时恢复之前的页面</li>
</ul>
<p>笔者开发了一个基于vue与vue-router的导航库<a href="https://github.com/zack24q/vue-navigation" rel="nofollow noreferrer" target="_blank">vue-navigation</a>，来帮助开发者来解决这些问题，下面是问题的解决思路。</p>
<h2 id="articleHeader0">识别前进后退</h2>
<p>先说第一个问题。和原生app不一样，浏览器中主要有这几个限制：</p>
<ul>
<li>没有提供前进后退的事件</li>
<li>不允许开发者读取浏览记录</li>
<li>用户可以手动输入地址，或使用浏览器提供的前进后退来改变url</li>
</ul>
<p>解决方案是自己维护一份浏览记录，每次url改变时，通过与记录的浏览记录作对比，从而判断出前进后退行为：</p>
<ul>
<li>url存在于浏览记录中即为后退</li>
<li>url不存在于浏览记录中即为前进</li>
<li>url在浏览记录的末端即为刷新</li>
</ul>
<p>另外，应用的路由路径中可能允许相同的路由出现多次（例如A-&gt;B-&gt;A），所以给每个路由添加一个key值来区分相同路由的不同实例。</p>
<p>这个浏览记录需要存储在<code>sessionStorage</code>中，这样用户刷新后浏览记录也可以恢复。</p>
<h2 id="articleHeader1">后退时恢复之前的页面</h2>
<p>识别出后退行为后，下一步就是像原生一样恢复之前的页面了。</p>
<p>一种方案是页面继续存储在DOM中，添加样式<code>display: none</code>来告诉浏览器不渲染该元素，但是缓存的页面多了DOM就会变得很大，会影响页面的性能，本文不讨论这个方案。</p>
<p>另一种方案是将数据缓存到内存中，开发者需要将页面的数据存储起来，当返回到该页面时，再根据数据将页面恢复。但是这样每个页面存储的数据不通，一般需要进行额外的编码，如果有一种更底层的方案能解决这个问题，并且对开发者是透明的，就最好了，所以尝试并开发了<a href="https://github.com/zack24q/vue-navigation" rel="nofollow noreferrer" target="_blank">vue-navigation</a>。</p>
<p>在<a href="https://github.com/zack24q/vue-navigation" rel="nofollow noreferrer" target="_blank">vue-navigation</a> 0.x版本的时候，借助了vue的<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">keep-alive</a>来缓存页面，但是<code>keep-alive</code>是根据组件的name或tag来决定缓存的，所以带来了很多限制。</p>
<p>通过拜读<code>keep-alive</code>的源码，了解到它的缓存机制后，就自己实现了一个管理缓存的组件，来灵活地缓存子组件，实现思路如下：</p>
<ul>
<li>每次<code>render</code>时，先取到子组件的<code>vnode</code>（vue的虚拟dom）</li>
<li>计算出<code>vnode</code>的key，把key值赋给<code>vnode</code>避免vue-router<a href="https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html" rel="nofollow noreferrer" target="_blank">复用组件实例</a>
</li>
<li>
<p>根据key值判断该节点是否已缓存</p>
<ul>
<li>已缓存：将缓存的实例赋给<code>componentInstance</code>，这样vue就会根据这个实例来恢复组件</li>
<li>未缓存：将<code>vnode</code>存储到内存中，下次返回到该页面时可以从内存中恢复</li>
</ul>
</li>
</ul>
<p>另外还需要添加一个清除缓存的逻辑，当自己维护的浏览记录变化时，根据浏览记录清除不需要的缓存（例如当前的路由是：A-&gt;B-&gt;C，用户从C直接返回到了A，那么B和C都需要从缓存中删除）。</p>
<h2 id="articleHeader2">最后</h2>
<p>虽然是基于vue来开发的，但是思路是不变的，使用其他框架也可以做到同样的事情。</p>
<p>还是安利一下<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue</a>和<a href="https://github.com/zack24q/vue-navigation" rel="nofollow noreferrer" target="_blank">vue-navigation</a>。使用插件后，再将<code>router-view</code>放在<code>navigation</code>下就有缓存功能了。</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import router from './router' // vue-router 实例
import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})
// 启动你的应用..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span> <span class="hljs-comment">// vue-router 实例</span>
<span class="hljs-keyword">import</span> Navigation <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-navigation'</span>
Vue.use(Navigation, {router})
<span class="hljs-comment">// 启动你的应用...</span></code></pre>
<p>App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <navigation>
    <router-view></router-view>
  </navigation>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code class="vue"><span class="hljs-section">&lt;template&gt;</span>
  <span class="hljs-section">&lt;navigation&gt;</span>
    <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
  <span class="hljs-section">&lt;/navigation&gt;</span>
<span class="hljs-section">&lt;/template&gt;</span></code></pre>
<p>最后欢迎大家讨论或提供更好的解决方案。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue的移动web app页面缓存解决方案

## 原文链接
[https://segmentfault.com/a/1190000010428654](https://segmentfault.com/a/1190000010428654)

