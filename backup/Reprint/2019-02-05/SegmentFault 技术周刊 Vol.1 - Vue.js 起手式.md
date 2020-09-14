---
title: 'SegmentFault 技术周刊 Vol.1 - Vue.js 起手式' 
date: 2019-02-05 2:30:09
hidden: true
slug: 9b97vklvudf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVBLHL?w=900&amp;h=385" src="https://static.alili.tech/img/bVBLHL?w=900&amp;h=385" alt="weekly-vol001.ipg" title="weekly-vol001.ipg" style="cursor: pointer; display: inline;"></span></p>
<p>2014 年 3 月，Vue.js 0.10 发布，10 月开始逐渐被大范围发现使用，12 月 SegmentFault 社区内出现第一篇关于  Vue.js 的文章，2015 年 1 月首次有人就 Vue 相关的使用开始提问。</p>
<p>至今，SegmentFault 社区内已有 900 多个 <a href="https://segmentfault.com/t/vue.js"><code>vue.js</code></a> 相关的问题，300 多篇相关的文章。</p>
<p>Vuex、vue-router、vue-loader、vue-cli……现在，我们给大家带来 Vue 的内容特辑 - 《Vue.js 起手式》，作为 SegmentFault 技术周刊的第一期主题。</p>
<h3 id="articleHeader0">什么是 Vue.js？</h3>
<blockquote><p>Reactive Components for Modern Web Interfaces.</p></blockquote>
<p>根据官网 <a href="https://vuejs.org" rel="nofollow noreferrer" target="_blank">https://vuejs.org</a> 的介绍，可简述为一句话。（具体要了解它可以跳到下文第三节阅读《Vue.js: a (re)introduction》）</p>
<p>其特点是</p>
<ul>
<li><p><strong>简洁</strong> HTML 模板 + JSON 数据，再创建一个 Vue 实例，就这么简单</p></li>
<li><p><strong>数据驱动</strong> 自动追踪依赖的模板表达式和计算属性</p></li>
<li><p><strong>组件化</strong> 用解耦、可复用的组件来构造界面</p></li>
<li><p><strong>轻量</strong> ~24kb min+gzip，无依赖</p></li>
<li><p><strong>快速</strong> 精确有效的异步批量 DOM 更新</p></li>
<li><p><strong>模块友好</strong> 通过 NPM 或 Bower 安装，无缝融入你的工作流</p></li>
</ul>
<p>相关项目地址：</p>
<ul>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-router</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-loader" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-loader</a></p></li>
<li><p><a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vuex</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-cli</a></p></li>
</ul>
<h3 id="articleHeader1">起手式</h3>
<p><strong><a href="https://segmentfault.com/a/1190000005363030">vue + webpack 起手式 // </a><a href="/u/andyyu0920">@andyyu0920</a> </strong></p>
<p>前端的世界變化之快速，從 2010 開始小弟經歷了 jQuery, Backbone, Angular, 到 React。這一路走來雖然學習到了許多高明開發者融合於框架或函式庫中的智慧，卻也因為不斷快速變化感到疲憊。時至 2016 小弟認為在實務與理想之間取得一個完美平衡的前端框架大概就屬 vue.js 了…</p>
<p><strong><a href="https://segmentfault.com/a/1190000003968020">Vue.js 快速入门 // </a><a href="/u/reeco">@FullStackDeveloper</a> </strong></p>
<p>Vue.js 是一个轻巧、高性能、可组件化的 MVVM 库，同时拥有非常容易上手的 API。作者是尤雨溪，写下这篇文章时 vue.js 版本为 1.0.7 …</p>
<p><strong><a href="https://segmentfault.com/a/1190000005041030">从零开始学 Vue // </a><a href="/u/appian">@嘉宝Appian</a> </strong></p>
<p>一直让 Vue 引以为豪的是它的便捷性、执行力、灵活性，这篇教程的目的就是通过一些例子，让你能够概览一些基本的概念和特性。在接下来的其他教程里，你会学到 Vue 更多的有用的特性，从而用 Vue 搭建一个可扩展的项目。</p>
<p><strong><a href="https://segmentfault.com/a/1190000004108445">vue 自定义指令实现 v-tap 插件 // </a><a href="/u/kodo">@二哲</a> </strong></p>
<p>vue-touch 基于 hammer，对于普通简单手势的页面来说过于庞大！于是想自己实现一个最常用的手势 tap。顺着自定义指令和插件文档，昨晚实现了一个 v-tap 指令，丢出这篇干货。</p>
<p><strong><a href="https://segmentfault.com/a/1190000004670036">Vue 源码解析之一：transition // </a><a href="/u/jokcy">@一拳超人</a> </strong></p>
<p>最近公司的项目选型使用了 vue，所以用 vue 开发了一个项目，期间在处理一些动画的时候，发现 vue-transition 虽然用起来简单，但是局限性很大，比如无法处理一个组件中父子元素的联动动画。所以打算研读一下源码，然后研究一下如何解决这个问题。</p>
<p><strong><a href="https://segmentfault.com/a/1190000005059686">Vue 源码分析之二：Vue Class</a></strong></p>
<p>这段时间折腾了一个 vue 的日期选择的组件，为了达成我一贯的使用舒服优先原则，我决定使用 directive 来实现，但是通过这个实现有一个难点就是我如何把时间选择的组件插入到 dom 中，所以问题来了，我是不是又要看 Vue 的源码…</p>
<p><strong><a href="https://segmentfault.com/a/1190000005009052" target="_blank">(1/2) Vue 构建单页应用最佳实战 // </a><a href="/u/kodo">@二哲</a> </strong></p>
<p>我们将会选择使用一些 vue 周边的库 {1. 使用 node.js 后台，了解到如何获取数据 2. 实现单页路由 3. 实现 HTTP 请求我们的 node 4. 单项数据流 5. 使用 .vue 文件进行开发} 最终我们将会构建出一个小 demo…</p>
<p><strong><a href="https://segmentfault.com/a/1190000005268225">(2/2) Vue 构建单页应用最佳实战</a></strong></p>
<p>本章节，将会把所有的请求全写为跨域请求。不知道为什么，很多人一用了框架就会不知所措。给大家一个忠告，享受框架带来的便利，别忘了时刻提醒自己学好基础知识。</p>
<h3 id="articleHeader2">发展史</h3>
<p><strong><a href="http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/" rel="nofollow noreferrer" target="_blank">Vue.js: a (re)introduction  // </a><a href="/u/evanyou">@尤雨溪</a> </strong></p>
<p>作者 <a href="https://segmentfault.com/u/evanyou"></a><a href="/u/evanyou">@尤雨溪</a>  亲作撰文，让你了解 Vue.js 到底提供了什么，和其他框架有何不同，在已经有了 Angular、React、Ember 的情况下为什么还值得关注。“我个人倾向于把它看做是一套可以灵活选择的工具组合”。</p>
<p><strong><a href="https://segmentfault.com/a/1190000004200486">vue.js 2015 回顾（译） // </a><a href="/u/limichange">@limichange</a> </strong></p>
<p>2015 年对 Vue.js 来说是高速发展的一年。这个项目的发展已经超出了我的预期，所以我打算做一个回顾并阐述一些观点…</p>
<p><strong><a href="https://segmentfault.com/a/1190000004219090">vue-cli 发布（译） // </a><a href="/u/limichange">@limichange</a> </strong></p>
<p>当我们真正开发一个应用的时候，我们不可避免的会用到一大堆的工具，模块化、预处理器、热模块加载、代码校验和测试。这些工具对于一个需要长期维护的大型应用是必须的，但是项目初始化将会是让人痛苦的事情。这就是为什么我们做了 vue-cli，让一个简单的命令行工具来帮助你快速的构建一个拥有强大构建能力的 Vue.js 项目。</p>
<p><strong><a href="https://segmentfault.com/a/1190000005027001">纪念即将逝去的 Vue 过滤器  // </a><a href="/u/appian">@嘉宝Appian</a> </strong></p>
<p>Vue 2.0 想要把 filter 去掉。不过我想，如果是用 1.0 的朋友还是很需要用到过滤器的……在这个教程中，我们将会通过几个例子，了解和学习 Vue.js 的过滤器。</p>
<p><strong><a href="https://segmentfault.com/a/1190000006435886">Vue 2.0 升（cai）级（keng）之旅  // </a><a href="/u/discipled">@DiscipleD</a> </strong></p>
<p>用 Vue 1.10+ 搭建了新博客，并渐渐地往里添加一些新学到的东西 ES6, webpack, docker 等，在不久之前，Vue 如约发布了 2.0 版本，正如计划之初，博客 Vue 的版本也将升级到 2.0。</p>
<p><strong><a href="https://medium.com/the-vue-point/the-state-of-vue-1655e10a340a#.bwovtzr3i" rel="nofollow noreferrer" target="_blank">The State of Vue  // </a><a href="/u/evanyou">@尤雨溪</a> </strong></p>
<p>Vue 2.0 RC1 发布，API 不再会有大的变动。</p>
<p>「 We announced Vue 2.0 back in April, and today I am very excited to release the first release candidate for Vue 2.0! From this stage on we will be in API freeze and there will be no more breaking changes before official release. 」</p>
<h3 id="articleHeader3">深阅读</h3>
<p><strong><a href="https://segmentfault.com/a/1190000005168085">单文件组件下的 vue，可以擦出怎样的火花  // </a><a href="/u/leftstick">@leftstick</a> </strong></p>
<p>2016 注定不是个平凡年，无论是即将问世的 Angular2（虽然到目前为止 2016-05-20 仍没有 release date），还是全面走向稳定的 React，都免不了面对另一个竞争对手 Vue。</p>
<p><strong><a href="https://segmentfault.com/a/1190000004346467">解析神奇的 Object.defineProperty  //</a><a href="/u/jarvan">@杨川宝</a> </strong></p>
<p>这个方法了不起啊，vue.js 是通过它实现双向绑定的，而且 Object.observe，也被草案发起人撤回了。。所以 defineProperty 更有必要了解一下了…</p>
<p><strong><a href="https://segmentfault.com/a/1190000004384515">vue 源码分析之如何实现 observer 和 watcher  //@杨川宝</a></strong></p>
<p>本文能帮你做什么？好奇 vue 双向绑定的同学，可以部分缓解好奇心，还可以帮你了解如何实现 <code>$watch</code>…</p>
<p><strong><a href="https://segmentfault.com/a/1190000005045219" target="_blank">组件改变生活_揭开Vue组件的神秘面纱 // @嘉宝Appian</a></strong></p>
<p>在这一节里，我们将会了解到 Vue 的组件，理解组件是如何工作的，并利用一系列的例子证明，用组件化的思想开发项目，会给你带来不一样感受。如果我们理解了 Vue 的组件化思想，我们就可以利用这个思想构造一个简化的评论投票系统，一个用户可以发布评论，其他用户可以在任意的评论上面投“赞成票”或者投“反对票”。</p>
<p><em>（本期完）</em><br><br></p>
<p>这期关于 Vue.js 的内容就先到这里，之后我们会将 Vue 的实践应用再单独做一期特辑。也欢迎大家「<a href="https://segmentfault.com/blog/weekly">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly" target="_blank">订阅</a>」本专栏，你将收到每周一期的主题内容推荐。</p>
<p>下周二见~</p>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，敬请关注。同时，欢迎大家在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.1 - Vue.js 起手式

## 原文链接
[https://segmentfault.com/a/1190000006579616](https://segmentfault.com/a/1190000006579616)

