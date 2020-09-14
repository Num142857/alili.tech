---
title: 'SegmentFault 技术周刊 Vol.11 - React 应用与实践' 
date: 2019-02-01 2:30:10
hidden: true
slug: 34tmp4xbhq2
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVEZDU" src="https://static.alili.techhttps://segmentfault.com/img/bVEZDU" alt="weekly-vol011" title="weekly-vol011" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前情提要</h2>
<p>前面三期的社区周刊，我们从一个最简单的 To-do List 应用入手，完成了 React.js 学习三部曲的前两部分</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007135115">Vol.8 - React，“5 分钟快速入门”</a><em>（什么是 React、它的基本特性和源码的解析）</em></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007205944" target="_blank">Vol.9 - 进阶吧！React</a><em>（深入了解各类组件、Redux、性能优化，通过简单的项目对每个部分逐一深入实践）</em></p></li>
</ul>
<p>以及一个番外篇 React Native</p>
<ul><li><p><a href="https://segmentfault.com/a/1190000007275896">Vol.10 - React Native丨Learn Once, Write Anywhere</a></p></li></ul>
<p>结束了学习阶段，意味着只剩最后的“大怪”——React 的具体应用和实践，现在，我们将结合 Webpack、Node.js、ES6 甚至 Vue.js，完成对学习成果的手动操作和加强。这就是本期周刊的内容。</p>
<h2 id="articleHeader1">应用与实践</h2>
<blockquote><p><strong>hantingting - <a href="https://segmentfault.com/a/1190000005899934" target="_blank">从零开始：使用 React+Webpack+Nodejs+Express 快速构建项目</a></strong></p></blockquote>
<p>React 官方文档中，只有一个 TodoMVC 的范例，里面上百行的代码以及过多的新概念，对于很多初学者来说依然很复杂。所以作者以一个简单的例子，讲解如何使用 React、Webpack、Node.js、Express 来快速构建项目，将前端各类技术知识系统地引入实践，为后期的深入学习铺好道路。</p>
<blockquote><p><strong>二哲 - <a href="https://segmentfault.com/a/1190000006789546">Vue 或 React 多页应用脚手架</a></strong></p></blockquote>
<p>让多页应用如何能有一套像 SPA 一样优雅的开发模式，很多人都在思考，不妨来看看作者是怎么做的：<a href="https://github.com/MeCKodo/react-multipage" rel="nofollow noreferrer" target="_blank">MeCKodo / react-multipage</a>，这是一篇使用 ES6 (7) + 组件化（.vue | .jsx）开发多页应用的范文。</p>
<blockquote><p><strong>lhc - <a href="https://segmentfault.com/a/1190000005037309">手把手教你基于 ES6 架构自己的 React Boilerplate 项目</a></strong></p></blockquote>
<p>结束上篇 ES6 + 组件化的应用，再来看看如何加入 Webpack。作者从项目开发的蛮荒阶段，搭建开发环境、配置和使用 webpack、搭建测试环境，一步一步构建适合自己的 React + Webpack 起始项目。非常详尽，推荐阅读。</p>
<blockquote><p><strong>xiaoyann - <a href="https://segmentfault.com/a/1190000005969488" target="_blank">使用 Webpack + React + Redux + ES6 开发组件化前端项目</a></strong></p></blockquote>
<p>文如其题，前端开发者自己常备一个 boilerplate 项目的重要性不言而喻，作者这个项目在 Webpack 配置上做了不少优化和总结。这是复杂性 React 项目实践必看的一篇。</p>
<blockquote><p><strong>supnate - <a href="https://segmentfault.com/a/1190000007265799">使用 React + Redux + React-router 构建可扩展的前端应用</a></strong></p></blockquote>
<p>无论使用什么样的技术，一个理想中的 Web 项目大概都需要考虑这么几个方面：易于开发、易于扩展、易于维护、易于测试和易于构建。这些方面并不是互相独立，而是互相依赖互相制约，当某个方面做到极致，其它点就会受到影响。本文这个点出发，讲述如何利用 React + Redux + React-router 来构建可扩展的前端应用，其核心思路就是</p>
<ul>
<li><p>以功能（feature）为单位组件文件夹结构</p></li>
<li><p>采用每个 action 单独文件的模式</p></li>
</ul>
<p>这样能够让代码更加模块化，增加和删除功能都不会对其它模块产生太大影响。同时使用 React-router 来帮助实现页面的概念，让单页应用（SPA）也拥有传统 Web 应用的 URL 导航功能，进一步降低了功能模块间的耦合行，让应用结构更加清晰直观。</p>
<blockquote><p><strong>kenberkeley - <a href="https://segmentfault.com/a/1190000006737924" target="_blank">可能是东半球最好的 React + Redux 启动器，基于 Vue Cli 二次开发</a></strong></p></blockquote>
<p>这是一个基于 Vue Cli 开发的 React 简易留言板 + 待办事项，项目架构优雅，且可以快速上手 React 开发 SPA。项目地址：<a href="https://github.com/kenberkeley/react-demo" rel="nofollow noreferrer" target="_blank">kenberkeley / react-demo</a></p>
<blockquote><p><strong>whatif - <a href="https://segmentfault.com/a/1190000005879164">feWorkflow - 使用 electron, react, redux, immutable 构建桌面 App</a></strong></p></blockquote>
<p>feWorkflow 是一套完整的 Gulp 工作流，以 electron 为基础将 gulpfile.js 以及所依赖的 node_modules 封装在一起的一个图形界面，可以进行一键式的开发和压缩。作者在这里就项目的开发框架及其技术，做了一个总结，包括基本的操作流程和一些心得体会。</p>
<p>项目地址：<a href="https://github.com/whatifhappen/feWorkflow" rel="nofollow noreferrer" target="_blank">whatifhappen / feWorkflow</a></p>
<p>还有几个 React 做成的项目，我们已经在第八期周刊（<a href="https://segmentfault.com/a/1190000007135115#articleHeader4">Part.4 - 简单的应用</a>）中做了简单介绍，现在，你可以去深入的研究下他们具体是怎么做了。</p>
<h2 id="articleHeader2">系列的结束</h2>
<p>本期周刊只有 7 篇内容，但这些内容所包含的实践例子，已完全可以让你对如何在实际中使用 React 有一个非常明确的了解。随之，React 系列的周刊也将告一段落。</p>
<p>一个题外话，突然想起来，前段时间很火的《在 2016 年学 JavaScript 是一种什么样的体验？》，各类前端技术层出不穷、更新不断的情况，着实被热辣地调侃了一番。其实每三四年做一个阶段来看，产量与质量都是在指数型的增长，所以，与其说是乱革命，不如看作这是技术还在不断成熟。因为无论规范程度怎样，站在不断累积的前辈们的肩上，自然就会跑得越来越快。</p>
<p>当然，贵圈华丽也是需要克制的。<br><br></p>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly" target="_blank">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.11 - React 应用与实践

## 原文链接
[https://segmentfault.com/a/1190000007345731](https://segmentfault.com/a/1190000007345731)

