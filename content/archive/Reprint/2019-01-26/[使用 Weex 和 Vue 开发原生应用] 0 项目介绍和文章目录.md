---
title: '[使用 Weex 和 Vue 开发原生应用] 0 项目介绍和文章目录' 
date: 2019-01-26 2:30:18
hidden: true
slug: y9u8alkp4k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景介绍</h2>
<p><a href="https://weex-project.io/cn/" rel="nofollow noreferrer" target="_blank">Weex</a> 和 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 已经互相支持，这也不是新闻了（如果你觉得是新闻，自行在网上搜相关信息……），Vue.js 也因此具备了开发原生应用的能力。</p>
<p>Vue 官方仓库中包含了<a href="https://github.com/vuejs/vue/tree/dev/src/platforms/weex" rel="nofollow noreferrer" target="_blank">适配 Weex 平台的代码</a>，Weex 也<a href="https://github.com/alibaba/weex/blob/v0.9.5/package.json#L83" rel="nofollow noreferrer" target="_blank">引入了 Vue Runtime</a> 并集成进了 SDK 中，第一个支持 Vue 的 WeexSDK 版本是 <a href="https://github.com/alibaba/weex/releases/tag/v0.9.5" rel="nofollow noreferrer" target="_blank">v0.9.5</a>，后续版本也都将会支持，建议保持更新。</p>
<p>两个框架之所以能互相适配，是因为两个框架在最初设计时就充分考虑到了扩展性，眼光深远！框架合作减少了开发者的学习负担，是个好事情，可喜可贺???。</p>
<h2 id="articleHeader1">全球首个使用 Weex 和 Vue 开发的原生应用</h2>
<p><strong>那就是 <a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weex-hackernews</a> ！</strong></p>
<p>Vue 官方出了一个 <a href="https://github.com/vuejs/vue-hackernews-2.0" rel="nofollow noreferrer" target="_blank">vue-hackernews</a>，是一个完整的使用 Vue 2.0 的例子，并且用到了 Vuex 、 vue-router 和服务端渲染。仿照这个思路，我们也写了一个 weex-hackernews ，不仅用到了 Vue 框架的各种特性，也用到了 Vuex 和 vue-router ，在 Web 、 Android 、 iOS 上都能正常工作，一个完整的三端都有的 App ！可以作为一个范例供大家参考。</p>
<p><span class="img-wrap"><img data-src="/img/bVJaqq?w=2712&amp;h=1628" src="https://static.alili.tech/img/bVJaqq?w=2712&amp;h=1628" alt="weex-hackernews screen shot" title="weex-hackernews screen shot" style="cursor: pointer; display: inline;"></span></p>
<p>这个项目实际证明了 Weex + Vue 在 Web 、Android 和 iOS 上都是完全可以运行的，Vuex 和 vue-router 也可以运行在移动端上。我是验证过的，所以我可以有底气地说：<strong>Weex + Vue 可以开发原生应用！Weex + Vue 可以开发原生应用！！Weex + Vue 可以开发原生应用！！！</strong></p>
<blockquote><p>为什么确认是“全球首个”，因为在写这个项目的时候，还没对外发布过支持 Vue 的 WeexSDK，没有使用 Vue 的文档，甚至还没有 Web 端的渲染器（weex-vue-render）。我当时是一边写项目，一边写 Web 渲染器，一边适配 Vue 在 Native 上运行有没有问题，最后才补的文档。。。</p></blockquote>
<p>我是一个前端，略懂一些 Andorid 和 iOS ，可能客户端上的代码质量并不高，如果大家看哪里不顺眼，欢迎给我提 PR ~</p>
<h2 id="articleHeader2">阅读官方文档</h2>
<ul>
<li><a href="https://weex-project.io/cn/guide/index.html" rel="nofollow noreferrer" target="_blank">《Weex 快速上手》</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">《Vue.js 介绍》</a></li>
<li><a href="https://weex-project.io/cn/references/platform-difference.html" rel="nofollow noreferrer" target="_blank">《Weex 和 Web 平台的差异》</a></li>
<li><a href="https://weex-project.io/cn/guide/intro/using-vue.html" rel="nofollow noreferrer" target="_blank">《使用 Vue 开发 Weex 页面》</a></li>
<li><a href="https://weex-project.io/cn/references/vue/difference-with-web.html" rel="nofollow noreferrer" target="_blank">《Vue.js 在 Weex 和 Web 中的差异》</a></li>
<li><a href="https://weex-project.io/cn/references/vue/difference-of-vuex.html" rel="nofollow noreferrer" target="_blank">《在 Weex 中使用 Vuex 和 vue-router》</a></li>
</ul>
<h2 id="articleHeader3">系列文章目录</h2>
<p>因为这跨框架甚至跨端的技术，放在谁那里都不合适，所以官方文档都写得中立一些；这个系列的文章会比官方文档更详细一些，而且会以 weex-hackernews 为实例讲代码，讲细节。</p>
<p>每个人对 Weex 和 Vue 的了解程度不一样，对原生开发和前端开发的了解程度也不一样，所以没有最佳学习顺序，建议【看文档】【看代码】【写例子】交叉循环。</p>
<ul>
<li>0 《项目介绍和文章目录》</li>
<li>1 <a href="https://segmentfault.com/a/1190000008344148">《配置开发环境》</a>
</li>
<li>2 <a href="https://segmentfault.com/a/1190000008366358" target="_blank">《编写独立页面》</a>
</li>
<li>3 <a href="https://segmentfault.com/a/1190000008432907">《使用 Vue 框架的特性》</a>
</li>
<li>4 <a href="https://segmentfault.com/a/1190000008464683" target="_blank">《使用 Weex 平台的功能》</a>
</li>
<li>5 <a href="https://segmentfault.com/a/1190000008520677">《使用 Vuex》</a>
</li>
<li>6 <a href="https://segmentfault.com/a/1190000009101411" target="_blank">《使用 vue-router》</a>
</li>
<li>7 <a href="https://segmentfault.com/a/1190000009101907">《完整项目目录详解》</a>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[使用 Weex 和 Vue 开发原生应用] 0 项目介绍和文章目录

## 原文链接
[https://segmentfault.com/a/1190000008342533](https://segmentfault.com/a/1190000008342533)

