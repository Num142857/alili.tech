---
title: 'SegmentFault 技术周刊 Vol.14 - 进阶 Vue 2.0' 
date: 2019-01-30 2:30:23
hidden: true
slug: 84zzlljmes4
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVGdgh" src="https://static.alili.techhttps://segmentfault.com/img/bVGdgh" alt="weekly-vol014" title="weekly-vol014" style="cursor: pointer; display: inline;"></span></p>
<p>在今年 8 月刚开始制作周刊时，我们选择了 Vue.js 作为第一期的主题（<a href="https://segmentfault.com/a/1190000006579616">技术周刊 Vol.1 - Vue.js 起手式</a>），是因为注意到了它飞速的发展，当时做了这样的统计</p>
<blockquote>
<p>2014 年 3 月，Vue.js 0.10 发布，10 月开始逐渐被大范围发现使用，12 月 SegmentFault 社区内出现第一篇关于 Vue.js 的文章，2015 年 1 月首次有人就 Vue 相关的使用开始提问。</p>
<p>至今，社区内已有 900 多个 vue.js 相关的问题，300 多篇相关的文章。</p>
</blockquote>
<p>而到现在，距离上次统计过去仅三个半月，我们得到的新数据是</p>
<blockquote><p>截至今天，SegmentFault 社区内已有 1700 多个 <a href="https://segmentfault.com/t/vue.js" target="_blank"><code>vue.js</code></a> 相关的问题，500 多篇相关的文章。</p></blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVGdwD" src="https://static.alili.techhttps://segmentfault.com/img/bVGdwD" alt="vuejs-growth" title="vuejs-growth" style="cursor: pointer; display: inline;"></span></p>
<p>单从数据就可以看出 Vue.js 火热的增长趋势，所以，我们今天给大家带来 Vue 的内容特辑第二期 - 《进阶 Vue 2.0》，作为 SegmentFault 技术周刊的第 14 期主题。本期，将重点放在 Vuex、Vue.js 2.0 以及相关的应用实践。</p>
<h3 id="articleHeader0">进阶 2.0</h3>
<p><strong><a href="https://segmentfault.com/a/1190000007297553">Vue 作者尤雨溪：以匠人的态度不断打磨完善 Vue  // 图灵访谈</a></strong></p>
<p>正如作者尤雨溪所说：Vue 的设计本身很强调实用主义（Pragmatism）。所以 2.0 在 API 上的大量精简、多功能之间的平衡，或许可以从作者的访谈中，探究到背后的开发思路。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007012940" target="_blank">Vue 2.0 的变化：（一）基本 API 变化</a></strong> 丨 <strong><a href="https://segmentfault.com/a/1190000007018605">（二）其他重大更改  // 白小爱</a></strong></p>
<p>结合第一期《Vue.js 起手式》中的<a href="https://segmentfault.com/a/1190000006579616#articleHeader2" target="_blank">「发展史」</a>这一节，来看 2.0 的变化，再好不过了：各种鸡肋的 API 和指令有删有改，有用的组件和服务渲染等功能加强或者直接增加。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006623100">vue-router 2.0 改变的内容  // nicedoc</a></strong></p>
<p>2.x 版本的 vue-router 相比之前的 0.7.x 版本，有很多破坏性改变：通用 API 的修改、路由配置、导航钩子函数、链接（Links）、命名视图 (Named Views)、滚动行为（Scroll Behavior）…</p>
<p><strong><a href="https://segmentfault.com/a/1190000007484936" target="_blank">Vue 2.0 源码学习  // chenhao_ch</a></strong></p>
<p>重点是对 2.0 新特性的学习：1. 体量更小，性能更优；2. 实现了 Virtual DOM，自动监测依赖、自动重新渲染，并且将静态子树进行了提取，减少界面重绘时的对比；3. 对 Template 和 JSX 写法都做了支持，同时也支持了 Server Render。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007334535">Vue 2.0 源码分析之理解响应式架构  // 杨川宝</a></strong></p>
<p>这篇也是一样，搭配作者前序系列《Vue 源码分析之如何实现 observer 和 watcher》和《解析神奇的 Object.defineProperty》，读起来更精彩。本文使用尽量精简的代码，来还原  Vue 2.0 响应式架构的实现。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007244289" target="_blank">无痛学会各种 2 的 Vue2 + Vuex2 + Webpack2 前后端同构渲染  // 斑驳光影</a></strong></p>
<p>结合实际项目，从 Vue.js 1.x 升级到 2.0，对比升级前后的不同之处，然后教学「使用 Vue2 + Vuex2 + Webpack2 搭建一个简单的 ssr 项目」，能够直出页面，还能够保存成静态文件。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007124470">Vue 2.0 新手完全填坑攻略—从环境搭建到发布  // Jinkey</a></strong></p>
<p>Vue 2.0 开发环境的推荐搭配，项目的开发依赖，一路到到发布一个单页面应用，手把手教学。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007630677" target="_blank">Vue 2.0 构建单页应用最佳实战  // 二哲</a></strong></p>
<p>你没看错，「最佳实践」都有了，使用 vue-cli 创建项目、vue-router 实现单页路由、vuex 管理数据流、vue-resource 请求 node 服务端、.vue 文件进行组件化的开发……不废话，直接看项目地址：<a href="https://github.com/MeCKodo/vue-tutorial" rel="nofollow noreferrer" target="_blank">MeCKodo / vue-tutorial</a>。</p>
<h3 id="articleHeader1">Vuex - The Core of Vue Application</h3>
<p><strong><a href="https://segmentfault.com/a/1190000007516967">到底 Vuex 是什么？  // 1000copy</a></strong></p>
<p>作者以一个最简单的 demo，演示「a. 单纯依赖于 Vue.js」「b. 依赖 Vue.js，也使用 Vuex 技术」这两种情况下的代码开发情况，通过对比引出 Vuex 的概念、优势和劣势，非常接地气的方式。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006673171" target="_blank">Vuex — The Core of Vue Application  // DiscipleD</a></strong></p>
<p>「在 Vue 应用中，Vuex 就充当了数据提供者的角色，Vue 则只需要关注页面的展示与交互。」随着 Vue 2.0 的发布，Vuex 在近期也随之推出 2.0 版，本文将介绍 Vuex 2.0 的使用，Store、连接组件、容器组件和展示组件、管理路由（全家桶标配）。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007168699">译 丨 Vue 和 Vuex 中的数据流  // llp要变身</a></strong></p>
<p>Vue 组件之间共享状态，可以通过使用一个简单的 JavaScript 对象，在每个新组件当中引用来实现，也可以通过标配的 Vuex 来实现。两者虽然没有多大区别，但 Vuex 形式化了集中处理数据存储的过程，并提供了所有功能方法去处理那些数据，这就足以让它优而胜出。</p>
<p><strong><a href="https://segmentfault.com/a/1190000007108052" target="_blank">Vuex 2.0 源码解读（一）  // 499311496</a></strong></p>
<p>Vuex 2.0 和 1.x 相比，API 改变的还是很多的，但基本思想没什么改变，本篇就是主要讲解 Vuex 暴露出的几种方法：<code>Store</code>, <code>install</code>, <code>mapState</code>, <code>mapMutations</code>, <code>mapGetters</code>, <code>mapActions</code>，是 Vuex 里使用的最多的一些方法。</p>
<h3 id="articleHeader2">Vue 实战宝典</h3>
<p>Vue.js 实践和应用相关的内容太丰富了，整理成这个目录和分类，想研究哪方面的，随便自取，玩得开心~</p>
<p>实践：</p>
<ul>
<li>
<p>Vue.js 开发实践系列 by <a href="/u/aryu">@aryu</a></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005351971">（1）实现精巧的无限加载与分页功能</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005631012" target="_blank">（2）实现多条件筛选、搜索、排序及分页的表格功能</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005932457">（3）实现一个漂亮、灵活、可复用的提示组件</a></p></li>
</ul>
</li>
<li>
<p>使用 Vue.js 快速开发单页应用系列 by <a href="/u/hiluluke">@hiluluke</a></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006711743">（1）主体结构</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712234" target="_blank">（2）vue-router</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712278">（3）登录页面</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006713809" target="_blank">（4）功能组件与路由组件通信</a></p></li>
</ul>
</li>
</ul>
<p>应用：</p>
<ul>
<li>
<p>Vue + Vuex + Webpack 应用</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005891026">使用 Vuex + Vue.js 构建单页应用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006747096" target="_blank">Vue 项目实践（vuex + vue-router + vue-resource）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006931367">Vue 开发波纹点击特效组件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006194285" target="_blank">使用 Vue 写一个 datepicker</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005783325">Vue 實作簡易驗證機制 App</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007474673" target="_blank">基于 Vue 的直播播放器实战</a></p></li>
</ul>
</li>
<li>
<p>做个游戏</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006137236">利用 Vue.js 实现拼图游戏</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005804860" target="_blank">Vue + WebSocket + ES6 + Canvas 制作「你画我猜」小游戏</a></p></li>
</ul>
</li>
<li>
<p>实现个 UI 库</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007403277">Vue 高效 UI 组件库 - iView 开发实践</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007085126" target="_blank">N3-components - 强劲的 Vue UI 组件库</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007026819">Element - 一套优雅的 Vue 2.0 组件库是如何开发的</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007471546" target="_blank">Muse UI - 基于 Vue 2.0 的 Material Design UI 库</a></p></li>
</ul>
</li>
<li>
<p>搞个小项目</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006940358">用 Vue.js 实现了一个 V2EX 克隆项目</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005651367" target="_blank">使用 Vue.js 从零构建 GitHub 项目浏览器</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005780326">使用 Vue.js 和 Vuex 实现购物车场景</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003630417" target="_blank">基于 Vue.js 和 Webpack 的 Chat 示例</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005844155">一步一步教你用 Vue.js + Vuex 制作专门收藏微信公众号的 app</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007062371" target="_blank">Markcook 2.0 - 使用 Vue 2.0 和 Vuex 2.0 进行完全重构升级</a></p></li>
</ul>
</li>
<li>
<p>搭个博客</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007004199">用 Vue、Koa 和 Mongo 撸了个人博客和博客管理网站</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006939687" target="_blank">Vue.js 实践：一个 Node.js + MongoDB + Vue.js 的博客内容管理系统</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005968616">Vue.js + LeanCloud 单页面博客</a></p></li>
</ul>
</li>
<li>
<p>做个笔记应用</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005787179" target="_blank">Vue + Vuex + vue-router 强撸一发暗黑风 Markdown 日记应用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005015164">用 Vuex 构建一个笔记应用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005038509" target="_blank">Vuex + Firebase 构建 Notes App</a></p></li>
</ul>
</li>
</ul>
<p><em>（本期完）</em><br><br></p>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly" target="_blank">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.14 - 进阶 Vue 2.0

## 原文链接
[https://segmentfault.com/a/1190000007638646](https://segmentfault.com/a/1190000007638646)

