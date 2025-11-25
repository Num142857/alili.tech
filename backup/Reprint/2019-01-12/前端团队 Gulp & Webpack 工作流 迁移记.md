---
title: '前端团队 Gulp & Webpack 工作流 迁移记' 
date: 2019-01-12 2:30:24
hidden: true
slug: h62eulo2o1j
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">折腾</h1>
<p>从 2015 到现在，短短的三年内，几乎每年折腾一下工作流的 “ 更新换代 ”。从最早开始使用 Grunt 到 Gulp 再到 Webpack，再到 Rollup，再到 Webpack@2.x ......&nbsp;</p>
<p>在这个前端工具变化如此之快的浪潮里，在前端团队中，并发合作开发多个项目，前后端分离等等情况下，配置 或者 升级 或者 迁移 这样的工作流 基本生产工具，往往造成耗费的就不是仅仅一个人的时间成本，而是十人，数十人的量级。</p>
<p>所以 一个靠谱、稳定、有效的工作流方案就显得特别重要。</p>
<h1 id="articleHeader1">Gulp</h1>
<p>14 年 15 年初，因为构建性能等问题，已经从 Grunt 迁移到 Gulp 了 （&nbsp;<a href="https://github.com/duowan/generator-lego" rel="nofollow noreferrer" target="_blank">duowan/generator-lego</a>&nbsp;）。从开源的 Github 仓库上不难看出，主要 工作流 是基于命令行的形式，配合 yeoman 脚手架工具，以 Gulp 任务为核心的。</p>
<p>对于 Gulp 定义，官方的说法是&nbsp;</p>
<blockquote><p>gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.&nbsp;</p></blockquote>
<p>表明着，Gulp 是一个专门帮你处理一些痛苦耗时的自动化任务工具。</p>
<p>在这个表述中，Gulp 倾向的是于对 “任务” 这个概念的处理，而这个 “任务”，其实如果我们都尝试配置过 Gulp 的话，也就大概明白是怎样的一回事。</p>
<p>在这段时间期间，团队面向的业务，主要分类占比最大的是 专题类，运营类。</p>
<p>在这类专题基本入口都是从 HTML 开始，写 HTML Dom 结构，写样式，再后可能就写一些 JS 动效或者 AJAX 。几乎 JS 占比分量是超级少的，个别页甚至没有脚本，单纯给到 HTML &amp; CSS 给到后端同事直出数据。</p>
<p>那时候 Gulp 所配置的任务</p>
<ul>
<li><p>监听匹配文件的变化自动刷新浏览器</p></li>
<li><p>自动编译 SASS</p></li>
<li><p>自动补全 CSS3 前缀</p></li>
<li><p>多雪碧图合并、2x、3x 拼图</p></li>
<li><p>等等</p></li>
</ul>
<p>基于编译 HTML / SASS / 图片的任务，已经是完全满足我们的需求了。</p>
<h1 id="articleHeader2">Webpack</h1>
<p>在 15 年末开始，渐渐接入的业务方向改变，需要接触到 Vue，也就渐渐发现 Gulp 对于 JS 模块处理的局限性。也在这时候，开始衡量是否需要迁移到 Webpack。</p>
<p>对于 Webpack 定义，官方的说法是</p>
<blockquote><p>webpack, the production / unbiased / flexible / extensible / open source module bundler.</p></blockquote>
<p>表明着，Webpack 是一个 xxx 的打包器。</p>
<p>而在这个表述中，Webpack 更多的偏向于资源的整理打包。而这个打包的开始，就是 定义在配置上的 entry。</p>
<p>对于 Vue 或 React 这类型的项目，Webpack 无疑是最最最适合不过了，以 JS 模块为编写入口，生成依赖链，整理打包出 HTML / JS / CSS / 图片。</p>
<p>开始本来也就以为 单单工作流核心 将 Gulp 迁移到 Webpack，这样就可以轻松解决。</p>
<p>直至到后来在 雪碧图的合并，2x / 3x 多倍图的输出上，在 Webpack 上苦苦找寻不了比较完美的解决方案等等。</p>
<p>另外团队还存有一些 专题业务类 的需求，也需要兼容旧有项目，团队成员开发时候，切换前端生产工具的适应性等，带来了一系列的问题。</p>
<p>这时迫切希望有 更加简便、有效的工作流方案。</p>
<h1 id="articleHeader3">Gulp + Webpack</h1>
<p>既然 Gulp 对任务处理的强大，而 Webpack 对 JS 模块处理的专业，也就衡量着这两者的混合。</p>
<p>由 Gulp 基于处理 HTML / SASS / 图片等部分，Webpack 主要对 JS 模块进行编译。<br>带着这样的想法，也有网上挺多的思路，例如&nbsp;<a href="https://github.com/fwon/blog/issues/17" rel="nofollow noreferrer" target="_blank">gulp + webpack 构建多页面前端项目</a>&nbsp;。</p>
<p>但是都忽略了较根本上的问题 :</p>
<ul>
<li><p>每次 JS 改变都重新通过 Webpack 完整打包输出，效率没有保证</p></li>
<li><p>Webpack 下 JS 热刷新应该怎么联动 Gulp 的热刷新</p></li>
</ul>
<p>基于解决根本痛点的，平衡功能，使用了另外一套方案 :</p>
<ol>
<li><p>Webpack 基于 webpack-dev-server 启动热刷新 服务 A</p></li>
<li><p>browser-sync 使用 proxy 代理 服务 A 启动 服务 B</p></li>
<li><p>Gulp watch HTML / SASS / 图片 变动</p></li>
<li><p>Gulp watch 变动后触发 browser-sync reload</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009781976?w=600&amp;h=390" src="https://static.alili.tech/img/remote/1460000009781976?w=600&amp;h=390" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>通过 webpack-dev-server 热刷新等方式，优化 开发中 JS 构建效率</p></li>
<li><p>通过 proxy 代理 让 webpack-dev-server 热刷新同步刷新 浏览器</p></li>
</ul>
<p>Gulp 负责部分的 HTML / SASS / 图片等任务基本没有太大的变动，因而可以兼容到过往的旧项目需求，另外团队成员额外需要了解的是 JS 模块 Webpack 部分的构建，学习成本相对降低，在 2015 年末正式作为工作流解决方案加入在团队脚手架工具。</p>
<h1 id="articleHeader4">走多一步</h1>
<p>2016 年初开始，因组内成员的增加，或者工作流功能版本的更新， 都伴随着维护工作流的各种问题 ( 即便写了不能再详细的文档 )，大致回归到 Node 版本的兼容性，node_modules 的版本功能兼容，Windows / macOS 带来的兼容性等等问题。<br>这时在思考着，能否有包装多一层去让这些兼容性问题都 避免开呢 ？</p>
<p>其实对于这样的整体封装，无疑有两条路可以走&nbsp;</p>
<ul>
<li><p>类似于 NW 那样构建出 平台应用</p></li>
<li><p>类似于 PKG 那样构建出 执行程序</p></li>
</ul>
<p>在寻找解决方案的时候，发现了&nbsp;<a href="https://github.com/weixin/WeFlow" rel="nofollow noreferrer" target="_blank">weixin/WeFlow</a>&nbsp;，但深入发现 WeFlow 仅基于 Gulp 任务，功能远远满足不了需求。</p>
<p>于是便开始了轮子的重构，首先遇到问题是 node-sass 的编译依赖问题，感谢 WeFlow 开发者分享踩过的坑（&nbsp;<a href="https://github.com/weixin/WeFlow/issues/28" rel="nofollow noreferrer" target="_blank">node-sass 依赖环境问题 · Issue</a>&nbsp;），如果团队是使用 less 或者 stylus 都无需重置那些依赖。</p>
<p>另外遇到了最麻烦的问题就是把 webpack 生态 迁移到应用上去，babel 依赖 / vue-loader 依赖 / ..... 其中遇到过各种依赖被重置到全局的问题，都在 babel 或者 vue-loader 的源码上进行 切面置换依赖。</p>
<p>经过几个内测版本的开发下，造出了&nbsp;<a href="https://github.com/legoflow/legoflow" rel="nofollow noreferrer" target="_blank">legoflow/legoflow</a></p>
<p>组内推行使用后也得到了 赞同的反馈，经过了几个大项目的洗礼后，从功能性变得更加丰富，兼容性上更加稳定。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009781977?w=600&amp;h=336" src="https://static.alili.tech/img/remote/1460000009781977?w=600&amp;h=336" alt="" title="" style="cursor: pointer;"></span></p>
<p>而在今年 6 月也对外兼容版本&nbsp;<a href="https://legoflow.com/" rel="nofollow noreferrer" target="_blank">LegoFlow</a></p>
<h1 id="articleHeader5">走得更远</h1>
<p>现在工作流中内置的 Webpack 还是基于 1.x 版本，其实在年初的时候是有想法把 整个 Webpack 生态升级为 2.x，因为在 webpack 2.x RC 期间，对 Rollup tree-shaking 已经很垂涎了。</p>
<p>但是 Webpack 正式到 2.x，却发现无法兼容到 IE8 (&nbsp;<a href="https://github.com/webpack/webpack/issues/3070" rel="nofollow noreferrer" target="_blank">webpack2 doesn't support IE8 · Issue #3070 · webpack/webpack</a>&nbsp;)，部分业务也脱离不了 IE8 的行列。</p>
<p>但计划在更远一点的时间下，看看如何能否到实现 Webpack 1.x &amp; 2.x 的无缝切换。</p>
<h1 id="articleHeader6">最后</h1>
<p>前端团队几次的生产力工作流工具的迁移，只是前端这个大浪潮中最小最小的 缩影。</p>
<p>每次改变像是意味着 进化，在如今 这个前端浮躁的年代，希望 做着相同事情的我们 有着一如既往的 初心 上下求索。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端团队 Gulp & Webpack 工作流 迁移记

## 原文链接
[https://segmentfault.com/a/1190000009781971](https://segmentfault.com/a/1190000009781971)

