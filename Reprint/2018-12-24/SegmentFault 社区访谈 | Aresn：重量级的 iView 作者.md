---
title: 'SegmentFault 社区访谈 | Aresn：重量级的 iView 作者' 
date: 2018-12-24 2:30:07
hidden: true
slug: fz1du8oyqs5
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVY8rM?w=900&amp;h=385" src="https://static.alili.tech/img/bVY8rM?w=900&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上期专访说到，Felix 是<a href="https://segmentfault.com/a/1190000011595368">一个如同空气般存在的人</a> ,本期的专访嘉宾恰恰相反，是一个存在感爆棚（<del>绝对不是说体重</del>）的重量级用户，使用过 Vue 以及其相关 UI 组件库的小伙伴，对他的名字肯定不陌生，那就是 Aresn -- iView 的作者。</p>
<p>下面递 ?️ 给 Aresn，开始本期的专访~</p>
<h2 id="articleHeader0">Aresn 个人</h2>
<blockquote><p>Hello，Aresn，和大家打声招呼，介绍下自己吧</p></blockquote>
<p>Hi，大家好，我是 Aresn，中文名叫梁灏，91 年金牛座。现在在大数据公司 TalkingData 担任可视化架构师。</p>
<p>更多关于我的内容可以阅读这篇文章<a href="https://segmentfault.com/a/1190000008168184" target="_blank">【2016 我的心路历程：从 Vue 到 Webpack 到 iView】</a> （文章挺长的，还是先看这篇吧）。你还可以通过一个 5 分钟的小短片，来了解我和我团队正在做的事情，<div class="video-prev vp_XMzEyODExNzg3Ng=="><div class="clearfix video-header"><img class="pull-left" src="https://static.alili.techundefined"><div class="pull-left"><h5>TalkingData可视化介绍</h5><span class="text-muted">http://v.youku.com/v_show/id_XMzEyODExNzg3Ng==.html</span></div></div></div>（这个还是可以先看看的，只有5分钟）</p>
<blockquote><p>清蒸混迹于你的交流群，发现小伙伴都喊你教主，可以说下这个昵称的由来吗？</p></blockquote>
<p>这个嘛，作为一枚非知名技术网红，在 SegmentFault 开了5 场直播，因此得名。</p>
<h2 id="articleHeader1">iView 和 Vue</h2>
<blockquote><p>作为高质量开源 UI 组件库--  <a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">iView</a> 的作者，可以简单谈谈这个组件库在你眼中是怎么样的吗？</p></blockquote>
<p>它就像我亲儿子一样，因为过去的一年多里，我的工作主要都在它上边。每个 API，每个细节都仔细打量，逐步的推广和宣传在 GitHub 积累了 1 万多 Star。</p>
<p>虽然是基于 Vue，但很多地方还是玩的 JavaScript，尤其是 Table、Select 组件，内部实现是很复杂的，所以 iView 基本代表了我目前的最高开发水平了，也是我最满意的一项工作。</p>
<blockquote><p>为什么想做开发、开源这么一个项目呢？当中有什么趣事可以和大家分享下的吗？</p></blockquote>
<p>我们公司是 16 年初引入 Vue 的，当时还没有用 Webpack，大概 5 月份左右在第一个项目中开始使用 Webpack。因为我们公司主要是做 to B 的业务，对中后台有过很多年的设计和技术沉淀，而 Vue 的引入的确提高了开发效率。当初市面上没有一款适合我们公司的组件库，而且那时候正赶上公司鼓励做创新，于是就申请了名额，从此踏上开源的路程。</p>
<p>最有意思的还是跟世界各地的 contributors 一起协作，时间差使得我很多时候要工作到很晚，往往我吃中饭时，人家刚睡醒，我吃晚饭时，人家正吃午饭，我要睡了，结果人家聊的正 high 呢，结果我就得熬夜了。不过不得不承认，有些国外的开发者真的很厉害，情商也很高。很欣慰的是，不同语言的人，能在一起共同做一件事情。</p>
<blockquote><p>iView 都有哪些公司在使用，其中有哪些最佳实践呢？</p></blockquote>
<p>使用最多的当然还是我本家 TalkingData 啦，然后像阿里巴巴、京东、滴滴、新浪、联想等大公司也都在用。之前在社区做过一个调研：<a href="https://github.com/iview/iview/issues/2143" rel="nofollow noreferrer" target="_blank">阅读传送</a> </p>
<p>很多公司使用 iView 主要还是做后端管理系统，也就是不对外的。目前能看得到的产品比如我司的<a href="http://www.talkingdata.com/products.jsp" rel="nofollow noreferrer" target="_blank">应用统计分析</a> ，还有像大搜车开发的 <a href="https://www.easy-mock.com" rel="nofollow noreferrer" target="_blank">easy-mock</a> ，使用了服务端渲染技术（SSR）。</p>
<blockquote><p>iView 刚发了 <a href="https://www.iviewui.com/docs/guide/update" rel="nofollow noreferrer" target="_blank">2.7.0 版</a> ，不知道教主对下一个版本有什么计划，希望给开发者提供怎么样的服务呢？</p></blockquote>
<p>iView 更新还是比较勤的，基本上2周左右会发布一个大版本（版本帝也因此而来），我们不是为了发版而发布，确实是因为这个版本有很多 new features，比如 <strong>2.7.0 开始对 i18n 的更好支持</strong>。</p>
<p>下个版本（2.8.0）重点会放在响应式上，通过很多国外开发者的反馈，它们有时并不需要那么强大的功能，反而对响应式很注重，这也是为什么 iView 有 1 万多 Star，而很多国外开发者仍然选择使用 quasar-framework、vue-material、vuetify 的原因。</p>
<blockquote><p>教主最近也出版了自己的书籍--<a href="https://detail.tmall.com/item.htm?id=559480603657" rel="nofollow noreferrer" target="_blank">《Vue.js 实战》</a>  ，清蒸也有小伙伴购买本书，评价是前几章稍显简单，整体非常棒，教主写这本书的的初衷是什么呢？</p></blockquote>
<p>我自己是没有写书的念头的，一年前清华大学出版社联系到了我，一番沟通后，决定花点时间来写。市面上关于 Vue2 的书，当时还没有，正好结合 iView 的经验，想写一本偏入门的 Vue.js 书籍。这本书分3部分，第一部分是基础篇，覆盖了 Vue.js 核心的 API，第二篇是进阶，主要讲工程、插件，第三部分是实战篇，着重讲解了2个完整的实战案例（知乎日报和电商）。</p>
<blockquote><p>Vue.js 的作者尤雨溪--尤大为你的书做了序，写道：本书的优点，正是对重要的知识点结合了一些实战范例来帮助读者更好地理解 API 设计的初衷和使用场景，教主可以为此举个简单书中例子吗？</p></blockquote>
<p>哈哈，说道尤大大作序，当初联系到他也是费了一番功夫呢。其实除了尤大，也邀请了大漠、justjavac 等前端大牛写推荐语（在书的背面）。</p>
<p>读者反馈比较直观的一个案例是第8章自定义指令的实战项目：开发一个可从外部关闭的下拉菜单。很多人在业务中都做过这个效果，只是万万没有想到，能用一个自定义指令来实现，而且很优雅。其实这些都是 iView 中用过的源码，类似的实战案例还有很多啦。</p>
<blockquote><p>教主对 Vue 深有心得，在 SF 发起了自己的<a href="https://segmentfault.com/ls/1650000011074057"> Vue 系列讲座</a> ，可以简单谈一谈，你这个讲座各个章节的内容安排吗？以后，后续新的讲座的一个安排计划吗？</p></blockquote>
<p>这套 Vue.js 系列讲座内容跟我出版的《Vue.js实战》是相辅相成的，主要讲解了 Vue 的组件、插件，Webpack，Render 函数等内容，每节课都结合了具体的实例。</p>
<p>接下来，我会准备一个新的系列，关于 iView 的实战及剖析，相比上个系列更针对，会深入讲解在业务中使用 iView 的最佳实践和技巧，以及对 iView 组件的开发思路、模块设计，当然也会专门有一节来分析源代码。</p>
<h2 id="articleHeader2">Aresn 对技术问题的看法</h2>
<blockquote><p>作为一个有着丰富 Vue 实战经验的开发者，可以简要地从性能、业务使用场景等角度，比较下 Angular，Vue 和 React 吗？</p></blockquote>
<p>React 我没有在实际业务中使用过，Angular 在几年前用过 1.x 的版本。这三者的最新版目前从性能上看差距不是很大了。我重点说说我对 React 和 Vue 的理解吧（如果不正确还请指正）：</p>
<ul>
<li>Vue 使用起来比 React 简单、快，尤其是快速做业务时，可以清楚看到 DOM 结构及关系；</li>
<li>Vue2 和 React 在思想上很像，都是基于 Virtual DOM，只不过 Vue 顺便支持了 template 的写法，事实上，大家写的 &lt;template&gt; 内的 html，都会被预编译为 Render 函数。同理，Vue 也支持 JSX。</li>
<li>React 在使用上更接近 JavaScript，所以很方便和各类三方工具结合使用，Vue 可以理解本身提供了一套编程思路，就这这个思路开发会快，但也牺牲了灵活性，除非也用 Render 函数来充分发挥 JavaScript 编程能力。</li>
<li>React 和 Vue 最大的思想都是组件，而开发一个复杂通用组件时，拼的还是 JavaScript 能力。不过在一些特殊场景，不得不使用 Vue 的 Render 函数，比如一个 slot 在组件内用两遍（Vue 本身没有提供 API，iView 的一些组件中是通过深度克隆一个 vnode 来实现的，在我的书中也有介绍）。</li>
</ul>
<blockquote><p>最后，教主你对现在自学 Vue 或者前端知识的小伙伴有什么学习建议吗？有人说自学看文档，你对此怎么看呢？</p></blockquote>
<p>其实上手 Vue 还是很容易的，只要理解它的思想，从 jQ 的思想中脱离。Vue 的核心思想是数据的双向绑定，精髓是组件和组件化。一个 Vue 组件的 API 来自三部分：<code>props</code>、<code>events</code>、<code>slots</code>，所以就从这三点出发认真学习和练习，看懂了组件，也就懂了整个 Vue。</p>
<p>其实不论是学习 Vue 还是其它框架，思路都一样，文档主要是对框架 API 的阐述，书籍更多的是作者亲身经历的一些实战经验，两者并不矛盾，只是书籍较多，需要寻找一本合适自己的好书。如果你觉得看书很简单，那其实是件好事，说明你已经会了。</p>
<h2 id="articleHeader3">文末福利--送《Vue.js 实战》书籍</h2>
<p>Aresn 教主的访谈到此为止了，文末送福利啦，各位小伙伴可以在文章的评论区向教主提问，仅限于以下几个方面：</p>
<ul>
<li>Vue.js 的核心功能</li>
<li>Vue.js 的性能表现</li>
<li>Vue.js 的使用经验、技巧分享</li>
<li>Vue.js 前端工程化之组件化和插件的使用</li>
<li>基于 Vue.js 开发 iView 的心得和经验分享</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVZn2r?w=900&amp;h=350" src="https://static.alili.tech/img/bVZn2r?w=900&amp;h=350" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>教主会在未来的 1 个星期（11.27 至 12.04 ）内回复大家的提问，以及问题获得其他小伙伴点赞，点赞数排前五的小伙伴可以获得 Aresn 赠送的《Vue.js 实战》书籍一本哟~</strong> </p>
<p><code>Attentions</code>：统计提问获赞数时间为 2017.12.20 12:00，统计结果将会补充在本文章下方</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 社区访谈 | Aresn：重量级的 iView 作者

## 原文链接
[https://segmentfault.com/a/1190000012147624](https://segmentfault.com/a/1190000012147624)

