---
title: '2016 我的心路历程：从 Vue 到 Webpack 到 iView' 
date: 2019-01-28 2:30:09
hidden: true
slug: v0qfg8c6imn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><h3 id="articleHeader0">Vue.js 实战系列讲座</h3></blockquote>
<ul>
<li><p><a href="https://segmentfault.com/l/1500000009448056">Vue.js 实战之组件篇</a></p></li>
<li><p><a href="https://segmentfault.com/l/1500000009448189" target="_blank">Vue.js 实战之工程篇</a></p></li>
<li><p><a href="https://segmentfault.com/l/1500000010070434">Vue.js 实战之插件篇</a></p></li>
<li><p><a href="https://segmentfault.com/l/1500000008892728" target="_blank">Vue.js 实战之 Render 函数</a></p></li>
<li><p><a href="https://segmentfault.com/l/1500000008614960">基于 Vue.js 2.x 的 iView 组件开发实践</a></p></li>
</ul>
<hr>
<blockquote>
<p>2016年工作中做过最自豪的两件事情：</p>
<ul>
<li><p>把 Vue.js 和 Webpack 技术栈引进公司并逐步成为前端规范；</p></li>
<li><p>开源 <a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">iView</a> 项目。</p></li>
</ul>
</blockquote>
<h1 id="articleHeader1">初识 Vue</h1>
<h2 id="articleHeader2">第一次接触</h2>
<p>使用 Vue.js 已经有一年半时间了，在接触 Vue 之前，有写过半年多的 Angular，所以刚了解 Vue 时，与很多开发者一样，认为 Vue 是一个轻量级的或是移动端的 ng，就好比 zepto 之于 jQuery。直到 15 年 10 月，打算用 Vue 开发一个个人项目时，才开始认真地学习它，发现 Vue 的使用方法和 API 设计如此优美简洁，而且中文文档甚是详细，我觉得这也是 Vue 受很多中国开发者喜爱的原因，许多初中级开发者、英文不好的、jQ导向的，在刚接触 MVVM 时，这点很有价值，再者 Vue 的使用和学习门槛相比 ng 和 React 的要求都要低，概念理解起来也容易。</p>
<p>比起 Angular，Vue 最大的特点就是对数据双向绑定这件事处理的很优雅。ng 中你需要注入依赖服务，比如 $scope 和 $rootScope，变量写起来也散落在各处，而且有时候还得用 $apply 来告知，这对于很多初学者来说是很麻烦的事情。我以前是写 jQuery 的，所以还是喜欢用 jQ 的很多东西，比如 ajax，而 Vue 在数据使用上很灵活，可以引用外部变量，可以在各种情况下直接修改，不需要额外的工作，所以当看到 Vue 双向绑定这一特性时，就决定尝试用它了。</p>
<h2 id="articleHeader3">一个人搞了一个产品</h2>
<p>从 14 年毕业到 15 年底，就一直在两个规模不大的创业团队工作，先后做了 5 款产品，都是 App，涉及的面也很广，比如 Canvas、Hybrid 什么的。在初创团队工作就像打了鸡血一样，每天早上起床都迫不及待地开始写代码，对工作的热爱绝对不是只把它当做一件赚钱的事情，所有人都是有理想和技术追求的，所以那段时间我做的东西都很用心、精致。</p>
<p>两年的创业经历也把我锻炼成了一个对产品有理解、追求细节、美观的一个人。</p>
<p>从 15 年中旬开始，由于项目需要，我开始接触 Python，这也是我第一次接触后端语言，以前对服务端的开发是一点不懂的。不知道是 Python 本身的原因，还是我理解的快，上手其实并不难，而且没多久就已经可以熟练的写起来了（现在接触的东西多了，觉得那时学习的快，是有一套很好的架构和有人带，先能写，然后慢慢了解其中奥妙，这种办法对于程序员掌握一门新技术还是很有效的）。</p>
<p>我相信但凡写过 Python 的人，都会用优雅来形容它，比如一行代码带有循环的赋值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="user_hash = dict((str(user.id), user.to_base_dict()) for user in users)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python" style="word-break: break-word; white-space: initial;">user_hash = dict((str(user.id), user.to_base_dict()) <span class="hljs-keyword">for</span> user <span class="hljs-keyword">in</span> users)</code></pre>
<p>其实写后端和写前端，很多地方是想通的，只是概念上有区别。只不过后端专注在数据的获取、缓存和整理上，加以各种服务，前端则在获取数据、整理数据、可视化数据。</p>
<p>学会了 Python，发现这个时候可以自己独立做一点东西了，于是就有了 <strong>一个人搞了一个产品</strong> 。不卖关子了，这个产品就是 <a href="https://www.talkingcoder.com/" rel="nofollow noreferrer" target="_blank">TalkingCoder</a>，从产品、设计、前端、后端、运维、iOS &amp; Android 客户端，几乎都是我一人撸的了，只不过在写移动 App 时，有两位兄弟帮忙写了个壳。</p>
<p>从产品和技术复杂度上，TalkingCoder 很接近 知乎 和 Segmentfault，基于关注内容推荐的 Feed 流、文章、提问（最佳实践）。看一下用到的技术栈：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008168187?w=1830&amp;h=818" src="https://static.alili.tech/img/remote/1460000008168187?w=1830&amp;h=818" alt="" title="" style="cursor: pointer;"></span></p>
<p>后端当然是基于 Python 了，主要用 <strong>Tornado</strong> 框架提供 Framework 和 WebService 及 APIService（也巧，貌似 知乎 和 Segmentfault 也用的Tornado）。Tornado 是一个单线程、单进程、非阻塞式的 Web框架，性能很不错。<strong>Sqlalchemy</strong> 提供 ORM（Model层），这东西很好，尤其是对于我这样不太擅长写 sql 的人。<strong>Celery</strong> 提供了 worker ，完成一些不影响用户使用的定时任务（统计）、耗时任务（发邮件）等，通过异步，不阻塞主线程。<strong>Redis</strong> 主要用于存储用户的 token，数据库用的是 MySQL（阿里云RDS），同时还用了下阿里云的 SLB 负载均衡（其实没有什么好均衡的，量又到不了知乎那级别，主要还是做https的支持和域名绑定，对Nginx不是很熟，17年要学一下了，毕竟 SLB 的费用一年也好几百呢?）。</p>
<p>前端相对还是比较传统，没有完全使用 前后端分离 ，Vue 也没有用到组件和组件化，主要原因还是刚学 Vue，没有深入到组件，所以路由和页面渲染，甚至html模块都是 Tornado 完成的。任何技术都需要循序渐进，如果现在再写一遍，肯定不是这套架构，但在当时，这的确是最好的技术方案。但是服务端渲染也是有好处的，比如 SEO、页面打开速度，前端再怎么优化，也没有直接服务端渲染好 HTML 来得快。</p>
<p>iOS 和 Android App 是在 web 版全部完成后开发的，当时找了两个对技术有追求的 iOS 和 Android 的小伙伴帮忙搭了壳，定制了一些 UI 和 Bridge 接口，iOS 用的 UIwebview，本打算用 WKwebview，但测试下来很多地方效果不是很理想，最终还是选择了较为成熟的 UIwebview。整个移动端开发过程大概2个多月吧，也是基于 Vue + Gulp + Swiper 的，体验还算不错，尤其在 iOS 上。</p>
<p>运维是我的短板，Linux 不怎么熟，所以很尴尬的就是一开始只能在自己电脑上玩，到了 ECS 上就蒙了。好在 TalkingData 大牛有的是，折腾了一周，所有的环境和库都装好了，找人帮忙写了个 shell，就这样上线了，上线后，就再没断过。</p>
<p>前前后后开发了有近半年，服务上线也快一年了，这套架构从没出现过故障和报警，唯独一次重启机器把 Redis 数据丢失了。这个项目让我对 全栈 有了更深的理解，但凡是后端的会点 Angular，前端的会写写 Node.js ，都不完全是全栈，全栈应该是能理解整个产品的命脉，并把它最终实现出来，安全运行。</p>
<h2 id="articleHeader4">推广 Vue</h2>
<p>我是 15 年双十一那天加入 <strong>TalkingData</strong> 的。TalkingData 仍然还是创业公司，但规模和影响力要比我之前的两家大很多，在大数据领域，更是领先者。</p>
<p>在这里，前端团队都统称为可视化，因为我们是跟数据打交道。其实 TD 几年前是没有专门的前端团队的，由于历史问题，很多产品线都还是较老的技术，公司的核心技术在大数据处理能力上，前端页面很多都是写 Java 的同事做的，用的最多的自然是 Angular（知道 ng 背景的肯定了解其中的原因?）。</p>
<p>我刚来时，做的是一个基于百度地图 overlay 的大数据地理可视化框架 TDMap（各种原因尚未开源），贴几张图感受下吧：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008168188?w=1200&amp;h=767" src="https://static.alili.tech/img/remote/1460000008168188?w=1200&amp;h=767" alt="" title="" style="cursor: pointer;"></span><br>之后就是我的第一个业务类项目了，也是全面运用 TDMap。当时用的是 TD 自研的一套组件引擎和 jQuery。这个项目到最后做权限系统时，才开始接入 Vue.js ，这应该是 TD 首次使用 Vue，不过当时也有限制，只用它做简单的双向绑定，但仅此一点，开发效率已经提高很多了。</p>
<p>在一个公司推广一项技术栈也是有难度和技巧的，因为不同的人思考问题的角度可能会不同。新的东西一方面会增加学习成本，一方面对它潜在的问题是未知的，如果暴露出了问题或性能瓶颈，是否能够处理或应急方案，尤其是选择开源框架时，社区影响力、维护和持续开发都是考虑的因素。好在 Vue.js 给我们带来了很多惊喜，社区反响也不错，一句话就是用着放心。</p>
<p>既然尝到了 Vue.js 带来的甜头，就要把它推广起来，提高整个前端团队的开发效率。</p>
<h1 id="articleHeader5">Webpack，又一前端神器</h1>
<p>如果只是用 Vue.js 的基本功能，那其实只利用了20%的特性。<br>推广 webpack 这一过程是缓慢的，因为开始和很多人一样，以为又是个和 Gulp 类似的工具，所以有段时间仍然是使用 Vue + Gulp + jQuery 的技术栈，已经开始使用 Vue 的组件，但还没有组件化。这样写的多了，问题就暴露了：</p>
<ul>
<li><p>每个组件需要手动拆分html 、 js、 css 部分，维护成本高；</p></li>
<li><p>html 需预先加载，所以会看到一个页面有一大坨的html</p></li>
</ul>
<p>业务第一，一开始也就没有在意工作流，虽然麻烦，但也撑了几个小项目。直到一个机会开始做 <a href="https://www.talkingdata.com/product-MarketingCloud.jsp?languagetype=zh_cn" rel="nofollow noreferrer" target="_blank">MarketingCloud营销云</a>，才开始彻底学习 webpack，好在项目初期不太紧张，有了一周多过渡时间来搭建。</p>
<p>我觉得 webpack 的难点在于概念，因为你在开发时写的代码，并不是最终呈现的代码。这对于传统技术栈来说思维切换还是需要成本的，因此有了一个概念：编译。<br>说到底，webpack 就是一个 .js 配置文件，你的架构或好或差，都体现在这一个配置里，随着需求的不断出现，工程也是逐渐完善的，一口吃不成胖子。这里也分享一下 TalkingData 用到的工程配置：<br><a href="https://github.com/icarusion/vue-vueRouter-webpack" rel="nofollow noreferrer" target="_blank">https://github.com/icarusion/vue-vueRouter-webpack</a><br>关于 webpack 的技术介绍就不多扯了，掘金上有很多不错的文章，不过也推荐我之前写的几篇：</p>
<ul>
<li><p><a href="https://www.talkingcoder.com/article/6310080842228107877" rel="nofollow noreferrer" target="_blank">Vue+Webpack开发可复用的单页面富应用教程（配置篇）</a></p></li>
<li><p><a href="https://www.talkingcoder.com/article/6310724958473489215" rel="nofollow noreferrer" target="_blank">Vue+Webpack开发可复用的单页面富应用教程（组件篇）</a></p></li>
<li><p><a href="https://www.talkingcoder.com/article/6310756346094488391" rel="nofollow noreferrer" target="_blank">Vue+Webpack开发可复用的单页面富应用教程（技巧篇）</a></p></li>
</ul>
<p>这一年下来，这套架构在多个项目中得到了验证，工作效率自然是提升了不少，也奠定了我们前端团队的开发规范，Vue 的推广，至此算是非常成功了。</p>
<h1 id="articleHeader6">iView，把开发效率再提高50%</h1>
<p>经常混掘金的小伙伴，应该对 iView 不陌生吧！再贴一下地址：<br><strong><a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">https://github.com/iview/iview</a></strong><br>也感谢大家的关注与支持，iView 的 1.0 工作马上就结束了，计划的 43 个组件，现在已经完成 41 个了，我们也承诺过，在 1.0 发布后，会在 17 年初支持到 Vue2.x。<br>关于 iView 的介绍和使用，这里就不多说了，可以看看下面三篇文章，这里主要还是想说说关于它的一些故事和开源的经历。</p>
<ul>
<li><p><a href="https://gold.xitu.io/post/581ee7de128fe1005a06dd34" rel="nofollow noreferrer" target="_blank">Vue高效UI组件库—iView开发实践</a></p></li>
<li><p><a href="https://gold.xitu.io/post/5843dcad128fe100577876e1" rel="nofollow noreferrer" target="_blank">Vue中你不知道但却很实用的黑科技</a></p></li>
<li><p><a href="https://gold.xitu.io/post/5859c5fab123db0065926723" rel="nofollow noreferrer" target="_blank">项目进展快，全靠 iView 带 | 掘金技术征文</a></p></li>
</ul>
<p>发起这个项目的初衷，是公司举办的一次创新项目活动，当时团队正好也需要一套自己的 UI 组件库，于是就申请了，从此就信心满满地开始了来源之旅，那时是 16 年 7月。</p>
<p>时间过得真是快，都开发 半年 了，也收获了近 3000 ★。因为是第一次做开源项目，对 Github、npm 的很多东西还不了解，虽然平时都在用，但却没发布过。慢慢地知道了什么是 <code>.gitattributes</code>、<code>.npmignore</code>、<code>.travis.yml</code>、<code>.eslintrc.json</code>，也了解了 MIT、Apache Licence 2.0 开源协议，涨了不少姿势。</p>
<p>iView 在一开始时，还是暴露了很多问题，比如必须通过 webpack 才可以使用，而且还得配置 babel，否则无法编译 <code>node_modules/iview</code> 下的文件，就这一个简单的配置，折腾了很久，因为不同平台不同版本，写法不一样。后来在 <a href="https://github.com/jingsam" rel="nofollow noreferrer" target="_blank">@jingsam</a> 的 contribution 下，优化了 iView 编译过程，最终不再依赖 webpack，也不需要配置 babel，在此特别感谢下 jingsam，虽从未见面，却对技术有着同样的追求。</p>
<p>iView 基本是我一个人在开发和维护，不过有一位在美国上大学的同学也多次贡献代码，我们的沟通似乎并没有时差的概念，因为他基本很晚才睡，夜猫子类型的 <a href="https://github.com/rijn" rel="nofollow noreferrer" target="_blank">@rijn</a>，在此也特别感谢。</p>
<p>iView 的 contributors 并不多，也借此机会，希望更多对技术有追求的朋友能参与到 iView 2.0 的开发中，把它一起做好。</p>
<p>因为太想把 iView 做好，所以在写每个组件前，都看了很多别人的实现，比如 Element UI、vue-antd、AntDesign、vue-beauty 等，这个过程学到了很多东西，看别人代码的确是最快最有效的学习方法，因为有时候思路会被限制，看看别人的实现，才能打开思路，多加对比，也能知道几者之间的差距。</p>
<p>现在公司最核心的服务 — 应用统计分析已经开始用 iView 重构了，相信在 2017 年，iView 也会像 Vue 和 Webpack 一样，被很多项目验证。</p>
<h1 id="articleHeader7">后记</h1>
<p>16 年可以说是工作以来进步最大的一年了，学习了很多前沿的技术，也做了不少东西，但做技术的就是这样，接触的越多，越能感到自己的渺小，17 年继续加油吧！</p>
<p><strong>作者：梁灏</strong><br><strong>文章首发于掘金，未经许可，禁止转载</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2016 我的心路历程：从 Vue 到 Webpack 到 iView

## 原文链接
[https://segmentfault.com/a/1190000008168184](https://segmentfault.com/a/1190000008168184)

